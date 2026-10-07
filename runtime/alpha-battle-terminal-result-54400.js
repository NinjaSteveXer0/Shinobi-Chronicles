// ============================================================================
// ISSUE #544 — CANONICAL BATTLE TERMINAL-RESULT PRESENTATION SEAM
// Lane E implementation.
//
// Purpose:
// - present every already-committed Battle terminal result exactly once per
//   in-memory Battle occurrence;
// - keep semantic outcome truth as `victory` / `defeat`;
// - map player-facing `defeat` to the approved Setback surface only here;
// - never let caller resume outrun the terminal result surface;
// - wait for #33000 immutable Battle-presentation receipts before replacing the
//   Battle overlay with Victory / Setback;
// - preserve all reward, Story, World, PL and Battle semantic ownership.
//
// This module is intentionally presentation/integration only. Its per-Battle
// marker is non-enumerable so save/load cannot turn presentation bookkeeping
// into Chronicle truth. Reload may therefore re-project the same committed
// terminal fact, but one live runtime cannot present it twice.
// ============================================================================
(function installBattleTerminalResultPresentation54400(){
  "use strict";

  const PATCH_ID="battle_terminal_result_presentation_54400_2026_10_07";
  const QUEUE_POLL_MS=25;
  const QUEUE_WATCHDOG_MS=12000;
  const MARKER_KEY="__battleTerminalResultPresentation54400";
  const VALID_OUTCOMES=new Set(["victory","defeat"]);
  const PRIOR_OPEN_OVERLAY=typeof openOverlay==="function"?openOverlay:null;
  const PRIOR_COMPLETE_VICTORY=typeof completeBattleVictoryFromDamage==="function"?completeBattleVictoryFromDamage:null;
  const PRIOR_COMPLETE_DEFEAT=typeof completeBattleDefeat==="function"?completeBattleDefeat:null;
  const PRIOR_RESUME_CALLER=typeof resumeBattleCallerAfterCompletion==="function"?resumeBattleCallerAfterCompletion:null;

  if(globalThis.__battleTerminalResultPresentation54400Installed===true)return;
  globalThis.__battleTerminalResultPresentation54400Installed=true;

  function activeBattle54400(){
    try{return typeof currentBattle!=="undefined"&&currentBattle?currentBattle:null;}catch(_error){}
    return globalThis.currentBattle&&typeof globalThis.currentBattle==="object"?globalThis.currentBattle:null;
  }

  function normalizeOutcome54400(value){
    const outcome=String(value||"").trim().toLowerCase();
    return VALID_OUTCOMES.has(outcome)?outcome:null;
  }

  function committedOutcome54400(battle=activeBattle54400()){
    return normalizeOutcome54400(battle&&battle.outcome&&battle.outcome.type);
  }

  function surfaceForOutcome54400(outcome){
    return outcome==="defeat"?"setback":"victory";
  }

  function marker54400(battle,outcome,create=false){
    if(!battle)return null;
    let marker=null;
    try{marker=battle[MARKER_KEY]||null;}catch(_error){marker=null;}
    const battleId=String(battle.battleId||"");
    if(marker&&(
      String(marker.battleId||"")!==battleId||
      normalizeOutcome54400(marker.outcome)!==outcome
    )){
      try{
        if(marker.timer)clearTimeout(marker.timer);
        delete battle[MARKER_KEY];
      }catch(_error){}
      marker=null;
    }
    if(!marker&&create){
      marker={
        patchId:PATCH_ID,
        battleId,
        outcome,
        surface:surfaceForOutcome54400(outcome),
        status:"new",
        requestedAt:Date.now(),
        presentedAt:null,
        source:null,
        timer:null,
        deadlineAt:null,
        lastQueuePending:null,
        error:null
      };
      try{
        Object.defineProperty(battle,MARKER_KEY,{
          value:marker,
          configurable:true,
          enumerable:false,
          writable:false
        });
      }catch(_error){
        // Fail closed rather than persisting presentation bookkeeping as a
        // normal enumerable Battle field.
        return null;
      }
    }
    return marker;
  }

  function queuePending54400(){
    try{
      return typeof globalThis.pendingBattlePresentation33000==="function"&&
        globalThis.pendingBattlePresentation33000()===true;
    }catch(_error){return false;}
  }

  function clearTimer54400(marker){
    if(marker&&marker.timer){
      try{clearTimeout(marker.timer);}catch(_error){}
      marker.timer=null;
    }
  }

  function markPresented54400(marker){
    if(!marker)return;
    clearTimer54400(marker);
    marker.status="presented";
    marker.presentedAt=Date.now();
    marker.lastQueuePending=false;
    marker.error=null;
  }

  function renderCommittedTerminalSurface54400(battle,outcome,marker){
    if(!PRIOR_OPEN_OVERLAY)return{success:false,reason:"terminal_overlay_authority_missing"};
    if(!battle||battle!==activeBattle54400())return{success:false,reason:"battle_changed_before_terminal_presentation"};
    if(battle.battleOver!==true||committedOutcome54400(battle)!==outcome){
      return{success:false,reason:"terminal_semantic_fact_not_committed"};
    }
    if(marker&&marker.status==="presented"){
      return{success:true,idempotent:true,outcome,surface:marker.surface,patchId:PATCH_ID};
    }

    const surface=surfaceForOutcome54400(outcome);
    if(marker){marker.status="presenting";marker.surface=surface;}
    try{
      // PRIOR_OPEN_OVERLAY is the already-installed #33100/#33000 chain.
      // At this point #33000's immutable receipt queue is proven empty, so
      // Victory can delegate normally while Setback reaches #33100 directly.
      const result=PRIOR_OPEN_OVERLAY.call(globalThis,surface);
      markPresented54400(marker);
      return{
        success:true,
        outcome,
        surface,
        codeOwned:true,
        presentationOnly:true,
        semanticWrite:false,
        rewardClaimed:false,
        patchId:PATCH_ID,
        priorResult:result||null
      };
    }catch(error){
      if(marker){
        marker.status="failed";
        marker.error=String(error&&error.message||error);
      }
      return{success:false,reason:"terminal_surface_render_failed",error:String(error&&error.message||error),patchId:PATCH_ID};
    }
  }

  function attemptTerminalPresentation54400(battle,outcome,marker){
    if(!battle||battle!==activeBattle54400()){
      clearTimer54400(marker);
      if(marker)marker.status="stale";
      return{success:false,reason:"battle_changed_before_terminal_presentation",patchId:PATCH_ID};
    }
    if(battle.battleOver!==true||committedOutcome54400(battle)!==outcome){
      clearTimer54400(marker);
      if(marker)marker.status="failed";
      return{success:false,reason:"terminal_semantic_fact_not_committed",patchId:PATCH_ID};
    }
    if(marker&&marker.status==="presented"){
      return{success:true,idempotent:true,outcome,surface:marker.surface,patchId:PATCH_ID};
    }

    const pending=queuePending54400();
    if(marker)marker.lastQueuePending=pending;
    if(!pending)return renderCommittedTerminalSurface54400(battle,outcome,marker);

    const now=Date.now();
    if(marker&&!marker.deadlineAt)marker.deadlineAt=now+QUEUE_WATCHDOG_MS;
    if(marker&&now>=Number(marker.deadlineAt||0)){
      try{
        if(typeof globalThis.hardSettleBattlePresentationQueue33000==="function"){
          globalThis.hardSettleBattlePresentationQueue33000("terminal_result_544_watchdog");
        }
      }catch(_error){}
      if(!queuePending54400())return renderCommittedTerminalSurface54400(battle,outcome,marker);
      clearTimer54400(marker);
      if(marker){marker.status="failed";marker.error="battle_presentation_queue_did_not_settle";}
      return{success:false,reason:"battle_presentation_queue_did_not_settle",patchId:PATCH_ID};
    }

    if(marker){
      marker.status="pending_queue";
      clearTimer54400(marker);
      marker.timer=setTimeout(()=>attemptTerminalPresentation54400(battle,outcome,marker),QUEUE_POLL_MS);
    }
    return{
      success:true,
      presentationDeferred:true,
      waitingForBattlePresentationQueue:true,
      semanticBattleAlreadyCommitted:true,
      outcome,
      surface:surfaceForOutcome54400(outcome),
      patchId:PATCH_ID
    };
  }

  function scheduleTerminalPresentation54400(battle,outcome,marker){
    if(marker&&["scheduled","pending_queue","presenting","presented"].includes(marker.status)){
      return{
        success:true,
        idempotent:true,
        presentationDeferred:marker.status!=="presented",
        outcome,
        surface:marker.surface,
        status:marker.status,
        patchId:PATCH_ID
      };
    }
    if(marker)marker.status="scheduled";
    const run=()=>attemptTerminalPresentation54400(battle,outcome,marker);
    if(typeof queueMicrotask==="function")queueMicrotask(run);
    else Promise.resolve().then(run);
    return{
      success:true,
      presentationDeferred:true,
      semanticBattleAlreadyCommitted:true,
      outcome,
      surface:surfaceForOutcome54400(outcome),
      status:"scheduled",
      patchId:PATCH_ID
    };
  }

  function presentCommittedBattleTerminalResult54400(outcome,options={}){
    const normalized=normalizeOutcome54400(outcome);
    if(!normalized)return{success:false,reason:"invalid_terminal_outcome",patchId:PATCH_ID};
    const battle=activeBattle54400();
    if(!battle)return{success:false,reason:"battle_missing",patchId:PATCH_ID};
    if(battle.battleOver!==true)return{success:false,reason:"battle_not_terminal",patchId:PATCH_ID};
    const committed=committedOutcome54400(battle);
    if(committed!==normalized){
      return{success:false,reason:"terminal_outcome_mismatch",requestedOutcome:normalized,committedOutcome:committed,patchId:PATCH_ID};
    }

    const marker=marker54400(battle,normalized,true);
    if(!marker)return{success:false,reason:"nonpersistent_presentation_marker_unavailable",patchId:PATCH_ID};
    if(options&&options.source&&!marker.source)marker.source=String(options.source);
    return scheduleTerminalPresentation54400(battle,normalized,marker);
  }

  function getBattleTerminalResultPresentation54400(){
    const battle=activeBattle54400();
    const outcome=committedOutcome54400(battle);
    const marker=outcome?marker54400(battle,outcome,false):null;
    return{
      patchId:PATCH_ID,
      battleId:battle&&battle.battleId||null,
      battleOver:!!(battle&&battle.battleOver===true),
      committedOutcome:outcome,
      surface:outcome?surfaceForOutcome54400(outcome):null,
      status:marker&&marker.status||"unrequested",
      source:marker&&marker.source||null,
      presentedAt:marker&&marker.presentedAt||null,
      queuePending:queuePending54400(),
      presentationOnly:true,
      semanticWrite:false
    };
  }

  globalThis.presentCommittedBattleTerminalResult54400=presentCommittedBattleTerminalResult54400;
  // Stable unversioned call-site name for the later bounded core integration.
  globalThis.presentCommittedBattleTerminalResult=presentCommittedBattleTerminalResult54400;
  globalThis.getBattleTerminalResultPresentation54400=getBattleTerminalResultPresentation54400;

  if(PRIOR_OPEN_OVERLAY){
    const wrappedOpenOverlay54400=function(type){
      const target=String(type||"").trim().toLowerCase();
      const battle=activeBattle54400();
      const outcome=committedOutcome54400(battle);
      if(battle&&battle.battleOver===true){
        const requestedOutcome=target==="victory"&&outcome==="victory"
          ?"victory"
          :((target==="defeat"||target==="setback")&&outcome==="defeat"?"defeat":null);
        if(requestedOutcome){
          const marker=marker54400(battle,requestedOutcome,false);
          const surface=surfaceForOutcome54400(requestedOutcome);
          let sameSurfaceActive=false;
          try{
            const activeType=typeof currentOverlayType!=="undefined"?String(currentOverlayType||"").trim().toLowerCase():"";
            sameSurfaceActive=activeType===surface;
          }catch(_error){}
          if(!sameSurfaceActive&&typeof document!=="undefined"){
            try{
              const overlay=document.getElementById("screen-overlay");
              const visible=!!(overlay&&getComputedStyle(overlay).display!=="none");
              const selector=surface==="victory"?".alpha-victory-code-screen":".alpha331-setback";
              sameSurfaceActive=visible&&!!document.querySelector(selector);
            }catch(_error){}
          }
          // Exactly-once governs terminal entry, not a legitimate refresh of
          // the already-visible result surface (for example Victory CLAIM
          // REWARDS -> CONTINUE). Presentation refresh is not semantic reroll.
          if(marker&&marker.status==="presented"&&sameSurfaceActive){
            return PRIOR_OPEN_OVERLAY.apply(this,arguments);
          }
          return presentCommittedBattleTerminalResult54400(requestedOutcome,{
            source:requestedOutcome==="victory"?"open_overlay_victory":"open_overlay_defeat"
          });
        }
      }
      return PRIOR_OPEN_OVERLAY.apply(this,arguments);
    };
    globalThis.openOverlay=wrappedOpenOverlay54400;
    try{openOverlay=wrappedOpenOverlay54400;}catch(_error){}
  }

  if(PRIOR_COMPLETE_VICTORY){
    const wrappedCompleteVictory54400=function(){
      const result=PRIOR_COMPLETE_VICTORY.apply(this,arguments);
      const battle=activeBattle54400();
      if(battle&&battle.battleOver===true&&committedOutcome54400(battle)==="victory"){
        presentCommittedBattleTerminalResult54400("victory",{source:"complete_battle_victory"});
      }
      return result;
    };
    globalThis.completeBattleVictoryFromDamage=wrappedCompleteVictory54400;
    try{completeBattleVictoryFromDamage=wrappedCompleteVictory54400;}catch(_error){}
  }

  if(PRIOR_COMPLETE_DEFEAT){
    const wrappedCompleteDefeat54400=function(){
      const result=PRIOR_COMPLETE_DEFEAT.apply(this,arguments);
      const battle=activeBattle54400();
      if(battle&&battle.battleOver===true&&committedOutcome54400(battle)==="defeat"){
        presentCommittedBattleTerminalResult54400("defeat",{source:"complete_battle_defeat"});
      }
      return result;
    };
    globalThis.completeBattleDefeat=wrappedCompleteDefeat54400;
    try{completeBattleDefeat=wrappedCompleteDefeat54400;}catch(_error){}
  }

  if(PRIOR_RESUME_CALLER){
    const wrappedResumeCaller54400=function(resultType){
      const battle=activeBattle54400();
      const outcome=committedOutcome54400(battle);
      const requested=normalizeOutcome54400(resultType);
      if(
        battle&&battle.battleOver===true&&outcome&&requested===outcome
      ){
        const marker=marker54400(battle,outcome,false);
        const victoryAlreadyClaimed=outcome==="victory"&&!!(battle.rewards&&battle.rewards.claimed===true);
        // A claimed Victory is durable post-claim continuation evidence. The
        // live presentation marker is intentionally non-persistent, so a
        // browser reload must not force a second terminal entry before the
        // player's explicit post-claim Continue restores the exact caller.
        if((!marker||marker.status!=="presented")&&!victoryAlreadyClaimed){
          const presentation=presentCommittedBattleTerminalResult54400(outcome,{source:"caller_resume_intercept"});
          return{
            success:true,
            callerResumeWithheldUntilTerminalResultContinue:true,
            presentationDeferred:!!(presentation&&presentation.presentationDeferred),
            semanticBattleAlreadyCommitted:true,
            outcome,
            surface:surfaceForOutcome54400(outcome),
            terminalPresentation:presentation||null,
            patchId:PATCH_ID
          };
        }
      }
      return PRIOR_RESUME_CALLER.apply(this,arguments);
    };
    globalThis.resumeBattleCallerAfterCompletion=wrappedResumeCaller54400;
    try{resumeBattleCallerAfterCompletion=wrappedResumeCaller54400;}catch(_error){}
  }
})();