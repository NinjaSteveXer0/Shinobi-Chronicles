// ============================================================================
// ISSUE #544 — CANONICAL BATTLE TERMINAL-RESULT PRESENTATION OWNER
// Lane E implementation.
//
// Canonical responsibility:
// - present every already-committed Battle terminal result exactly once per
//   in-memory Battle occurrence;
// - keep semantic outcome truth as `victory` / `defeat`;
// - map factual `defeat` to the approved player-facing Setback surface here;
// - own explicit terminal-result continuation chronology;
// - never let caller resume outrun the terminal result surface;
// - wait for #33000 immutable Battle-presentation receipts before replacing the
//   Battle overlay with Victory / Setback;
// - preserve reward, Story, World, PL and Battle semantic ownership.
//
// #601/#624 consolidation:
// - this module replaces the retired #33100 Battle terminal-result slice;
// - Setback render/Continue and Victory/Setback art projection live here;
// - no #33100 terminal function, selector, overlay interception or CSS is
//   required by this owner.
//
// Presentation bookkeeping is non-enumerable and never becomes Chronicle truth.
// ============================================================================
(function installBattleTerminalResultPresentation54400(){
  "use strict";

  const PATCH_ID="battle_terminal_result_presentation_54400_2026_10_08";
  const QUEUE_POLL_MS=25;
  const QUEUE_WATCHDOG_MS=12000;
  const MARKER_KEY="__battleTerminalResultPresentation54400";
  const STYLE_ID="battle-terminal-result-54400-style";
  const VALID_OUTCOMES=new Set(["victory","defeat"]);

  const PRIOR_OPEN_OVERLAY=typeof openOverlay==="function"?openOverlay:null;
  const PRIOR_COMPLETE_VICTORY=typeof completeBattleVictoryFromDamage==="function"?completeBattleVictoryFromDamage:null;
  const PRIOR_COMPLETE_DEFEAT=typeof completeBattleDefeat==="function"?completeBattleDefeat:null;
  const PRIOR_RESUME_CALLER=typeof resumeBattleCallerAfterCompletion==="function"?resumeBattleCallerAfterCompletion:null;
  const PRIOR_CONTINUE_VICTORY=typeof continueAfterVictory==="function"?continueAfterVictory:null;

  if(globalThis.__battleTerminalResultPresentation54400Installed===true)return;
  globalThis.__battleTerminalResultPresentation54400Installed=true;

  function esc54400(value){
    if(typeof escapeStorySceneHTML==="function")return escapeStorySceneHTML(String(value??""));
    return String(value??"").replace(/[&<>\"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
  }

  function clone54400(value){
    try{return typeof cloneBattleRuntimeValue==="function"?cloneBattleRuntimeValue(value):JSON.parse(JSON.stringify(value));}
    catch(_error){return value||null;}
  }

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

  function terminalSurfaceVisible54400(surface){
    if(typeof document==="undefined")return false;
    try{
      const overlay=document.getElementById("screen-overlay");
      const visible=!!(overlay&&getComputedStyle(overlay).display!=="none");
      if(!visible)return false;
      if(surface==="setback")return !!document.querySelector(".alpha544-setback,.battle-terminal-setback");
      return !!document.querySelector(".alpha-victory-code-screen,.victory-screen");
    }catch(_error){return false;}
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

  function installTerminalStyle54400(){
    if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
    const style=document.createElement("style");
    style.id=STYLE_ID;
    style.textContent=`
      .alpha-victory-code-screen,.victory-screen{
        position:relative!important;
        background-color:#050b10!important;
        background-image:linear-gradient(90deg,rgba(3,9,13,.92),rgba(3,9,13,.74)),url('UI/victory.png')!important;
        background-size:cover!important;
        background-position:center!important;
      }
      .alpha-victory-code-screen>*,.victory-screen>*{position:relative;z-index:2}
      .alpha544-setback,.battle-terminal-setback{position:relative;width:100%;height:100%;min-height:620px;overflow:hidden;display:flex;flex-direction:column;color:#e7dfcd;background:#050b10;border:1px solid rgba(214,169,58,.28)}
      .alpha544-setback .alpha544-result-art,.battle-terminal-setback .alpha544-result-art{position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,8,12,.94),rgba(3,8,12,.76)),url('UI/setback.png') center/cover no-repeat;opacity:.34;z-index:0}
      .alpha544-setback>header,.alpha544-setback>.alpha544-result-grid,.alpha544-setback>footer,.battle-terminal-setback>header,.battle-terminal-setback>.alpha544-result-grid,.battle-terminal-setback>footer{position:relative;z-index:2}
      .alpha544-setback>header,.battle-terminal-setback>header{display:flex;justify-content:space-between;gap:30px;padding:34px 40px;border-bottom:1px solid rgba(214,169,58,.22);background:rgba(3,8,12,.72)}
      .alpha544-setback header span,.battle-terminal-setback header span{color:#d9b34f;font-size:9px;font-weight:900;letter-spacing:.15em}
      .alpha544-setback h1,.battle-terminal-setback h1{margin:7px 0 8px;color:#f2dfad;font:900 42px/1 Georgia,serif}
      .alpha544-setback header p,.battle-terminal-setback header p{margin:0;max-width:760px;color:#8fa0a7;font-size:12px;line-height:1.5}
      .alpha544-setback header>b,.battle-terminal-setback header>b{align-self:start;padding:8px 10px;border:1px solid rgba(151,169,177,.22);color:#87989f;font-size:8px;letter-spacing:.12em;background:rgba(3,8,12,.72)}
      .alpha544-result-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:34px 40px;flex:1}
      .alpha544-result-grid article{padding:22px;border:1px solid rgba(255,255,255,.08);background:rgba(2,8,12,.82)}
      .alpha544-result-grid span{color:#6c8089;font-size:8px;letter-spacing:.13em}
      .alpha544-result-grid h2{margin:10px 0;color:#e8d7ad;font:800 22px/1.1 Georgia,serif}
      .alpha544-result-grid p{color:#8d9da3;font-size:11px;line-height:1.55}
      .alpha544-setback footer,.battle-terminal-setback footer{display:flex;align-items:center;justify-content:space-between;gap:26px;padding:20px 40px;border-top:1px solid rgba(214,169,58,.18);background:rgba(3,8,12,.88)}
      .alpha544-setback footer p,.battle-terminal-setback footer p{margin:0;color:#758890;font-size:10px;line-height:1.5}
      .alpha544-setback footer button,.battle-terminal-setback footer button{min-height:44px;padding:0 20px;border:1px solid rgba(214,169,58,.66);background:linear-gradient(180deg,#624814,#33250b);color:#f2d274;font-weight:900;letter-spacing:.08em;cursor:pointer}
      @media(max-width:900px){.alpha544-result-grid{grid-template-columns:1fr;overflow:auto}.alpha544-setback>header,.alpha544-setback footer,.battle-terminal-setback>header,.battle-terminal-setback footer{padding-left:22px;padding-right:22px}}
    `;
    document.head.appendChild(style);
    return true;
  }

  function setbackCaller54400(){
    const battle=activeBattle54400();
    return battle&&battle.returnContext?clone54400(battle.returnContext):null;
  }

  function renderSetback54400(){
    if(typeof document==="undefined")return{success:false,reason:"document_missing",patchId:PATCH_ID};
    installTerminalStyle54400();
    const battle=activeBattle54400();
    if(!battle||battle.battleOver!==true||committedOutcome54400(battle)!=="defeat"){
      return{success:false,reason:"committed_defeat_missing",patchId:PATCH_ID};
    }
    const overlay=document.getElementById("screen-overlay");
    const container=document.getElementById("overlay-content-container");
    if(!overlay||!container)return{success:false,reason:"terminal_overlay_host_missing",patchId:PATCH_ID};

    const caller=setbackCaller54400();
    const activeId=(()=>{try{return typeof getSavedClanStartCharacterId==="function"?getSavedClanStartCharacterId():null;}catch(_error){return null;}})();
    const actor=(()=>{try{return activeId&&typeof getPlayerCharacter==="function"?getPlayerCharacter(activeId):null;}catch(_error){return null;}})();
    const enemy=battle&&(battle.enemy||((typeof selectedEnemy!=="undefined")?selectedEnemy:null))||null;

    try{if(typeof currentOverlayType!=="undefined")currentOverlayType="setback";}catch(_error){}
    try{globalThis.currentOverlayType="setback";}catch(_error){}
    overlay.style.display="flex";
    container.innerHTML=`<section class="alpha544-setback battle-terminal-setback" aria-label="Battle setback" data-terminal-result-owner="54400">
      <div class="alpha544-result-art" aria-hidden="true"></div>
      <header><div><span>BATTLE COMPLETE · CHRONICLE RESULT</span><h1>SETBACK</h1><p>Your deployed shinobi reached 0 Battle PL. This records withdrawal from the Battle — not automatic injury or death.</p></div><b>NO REWARD CLAIM</b></header>
      <div class="alpha544-result-grid">
        <article><span>YOUR SIDE</span><h2>${esc54400(actor&&actor.name||"My Clan")}</h2><p>Deployment exhausted</p></article>
        <article><span>OPPOSITION</span><h2>${esc54400(enemy&&enemy.name||"Encounter")}</h2><p>Battle result recorded separately from Story consequences.</p></article>
        <article><span>RETURN</span><h2>${esc54400(caller&&caller.type?String(caller.type).replaceAll("_"," ").toUpperCase():"CALLER")}</h2><p>Continue returns to the exact owning caller when its return envelope is available.</p></article>
      </div>
      <footer><p>Battle PL defeat does not infer death, injury, custody, Promotion failure or Story failure unless another authorised system commits that consequence.</p><button type="button" onclick="continueAfterSetback54400()">CONTINUE</button></footer>
    </section>`;
    return{success:true,type:"setback",codeOwned:true,presentationOnly:true,semanticWrite:false,patchId:PATCH_ID};
  }

  function continueAfterSetback54400(){
    const battle=activeBattle54400();
    if(!battle||battle.battleOver!==true||committedOutcome54400(battle)!=="defeat"){
      return{success:false,reason:"committed_defeat_missing",patchId:PATCH_ID};
    }
    const marker=marker54400(battle,"defeat",false);
    if(!marker||marker.status!=="presented"){
      return{success:false,reason:"setback_not_presented",patchId:PATCH_ID};
    }
    if(!PRIOR_RESUME_CALLER){
      renderSetback54400();
      return{success:false,reason:"battle_caller_resume_api_missing",patchId:PATCH_ID};
    }
    const result=PRIOR_RESUME_CALLER.call(globalThis,"defeat");
    if(result&&result.success===true)return{...result,terminalResultOwner54400:true,terminalOutcome:"defeat"};
    renderSetback54400();
    return{success:false,reason:String(result&&result.reason||"battle_caller_resume_failed"),callerResult:result||null,patchId:PATCH_ID};
  }

  function continueAfterVictory54400(){
    const battle=activeBattle54400();
    const outcome=committedOutcome54400(battle);
    const claimed=!!(battle&&battle.rewards&&battle.rewards.claimed===true);
    const rc=battle&&battle.returnContext||null;
    if(battle&&battle.battleOver===true&&outcome==="victory"&&claimed&&rc&&PRIOR_RESUME_CALLER){
      const result=PRIOR_RESUME_CALLER.call(globalThis,"victory");
      if(result&&result.success===true)return{...result,terminalResultOwner54400:true,terminalOutcome:"victory"};
      try{if(PRIOR_OPEN_OVERLAY)PRIOR_OPEN_OVERLAY.call(globalThis,"victory");}catch(_error){}
      return{success:false,reason:String(result&&result.reason||"battle_caller_resume_failed"),callerResult:result||null,patchId:PATCH_ID};
    }
    return PRIOR_CONTINUE_VICTORY?PRIOR_CONTINUE_VICTORY.apply(this,arguments):{success:false,reason:"victory_continue_authority_missing",patchId:PATCH_ID};
  }

  globalThis.renderBattleSetback54400=renderSetback54400;
  globalThis.continueAfterSetback54400=continueAfterSetback54400;
  globalThis.continueAfterBattleSetback=continueAfterSetback54400;
  globalThis.continueAfterVictory=continueAfterVictory54400;
  try{continueAfterVictory=continueAfterVictory54400;}catch(_error){}

  function renderCommittedTerminalSurface54400(battle,outcome,marker){
    if(!battle||battle!==activeBattle54400())return{success:false,reason:"battle_changed_before_terminal_presentation",patchId:PATCH_ID};
    if(battle.battleOver!==true||committedOutcome54400(battle)!==outcome){
      return{success:false,reason:"terminal_semantic_fact_not_committed",patchId:PATCH_ID};
    }
    if(marker&&marker.status==="presented"){
      return{success:true,idempotent:true,outcome,surface:marker.surface,patchId:PATCH_ID};
    }

    installTerminalStyle54400();
    const surface=surfaceForOutcome54400(outcome);
    if(marker){marker.status="presenting";marker.surface=surface;}
    try{
      let result=null;
      if(outcome==="defeat"){
        result=renderSetback54400();
        if(!result||result.success!==true)throw new Error(String(result&&result.reason||"setback_render_failed"));
      }else{
        if(!PRIOR_OPEN_OVERLAY)throw new Error("terminal_overlay_authority_missing");
        result=PRIOR_OPEN_OVERLAY.call(globalThis,"victory");
      }
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
      if(marker){marker.status="failed";marker.error=String(error&&error.message||error);}
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
    return{success:true,presentationDeferred:true,waitingForBattlePresentationQueue:true,semanticBattleAlreadyCommitted:true,outcome,surface:surfaceForOutcome54400(outcome),patchId:PATCH_ID};
  }

  function scheduleTerminalPresentation54400(battle,outcome,marker){
    if(marker&&["scheduled","pending_queue","presenting","presented"].includes(marker.status)){
      return{success:true,idempotent:true,presentationDeferred:marker.status!=="presented",outcome,surface:marker.surface,status:marker.status,patchId:PATCH_ID};
    }
    if(marker)marker.status="scheduled";
    const run=()=>attemptTerminalPresentation54400(battle,outcome,marker);
    if(typeof queueMicrotask==="function")queueMicrotask(run);
    else Promise.resolve().then(run);
    return{success:true,presentationDeferred:true,semanticBattleAlreadyCommitted:true,outcome,surface:surfaceForOutcome54400(outcome),status:"scheduled",patchId:PATCH_ID};
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
      terminalSurfaceVisible:outcome?terminalSurfaceVisible54400(surfaceForOutcome54400(outcome)):false,
      presentationOnly:true,
      semanticWrite:false
    };
  }

  globalThis.presentCommittedBattleTerminalResult54400=presentCommittedBattleTerminalResult54400;
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
          if(!sameSurfaceActive)sameSurfaceActive=terminalSurfaceVisible54400(surface);

          if(marker&&marker.status==="presented"&&sameSurfaceActive){
            if(requestedOutcome==="defeat")return renderSetback54400();
            installTerminalStyle54400();
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
      if(battle&&battle.battleOver===true&&outcome&&requested===outcome){
        const marker=marker54400(battle,outcome,false);
        const victoryAlreadyClaimed=outcome==="victory"&&!!(battle.rewards&&battle.rewards.claimed===true);
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

  installTerminalStyle54400();
})();
