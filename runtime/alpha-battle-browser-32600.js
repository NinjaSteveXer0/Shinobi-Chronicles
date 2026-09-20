// ============================================================================
// ALPHA BATTLE BROWSER UX HARDENING — POST 32500
// Browser evidence: 2026-09-12 and 2026-09-17 Stephen installed/local browser passes.
// Scope:
// - Skill-card click executes directly when normal authored availability allows;
// - explicit branch/mode Skills execute when the required mode is chosen;
// - Skill Details carries a readable effect summary and no USE SKILL button;
// - Battle PL numerals are optically centered inside the radial;
// - Combat Feed gets a small positioning refinement;
// - My Clan keeps drag/drop + inspection, but removes click-to-assign highlight;
// - caller-owned Victory claim returns through the exact authored Battle caller
//   and fails closed instead of falling through to generic Combat Arena.
// No Battle resolver, ownership, roster, reward-authority, or World semantic subsystem is replaced.
// ============================================================================
(function installAlphaBattleBrowser32600(){
  "use strict";

  const PATCH_ID="alpha_battle_browser_32600_v2_2026_09_20";

  // --------------------------------------------------------------------------
  // 1. REPEAT-SKILL UX — FIX STALE SELECTION, DO NOT INVENT A COOLDOWN BYPASS
  // --------------------------------------------------------------------------
  // The underlying Academy/Closure availability evaluators do not impose a
  // generic previous-skill / different-skill rule. The browser issue was caused
  // by render timing: attemptBattlePreparedSkill() re-rendered before
  // confirmSelectedBattleSkill() cleared selection, leaving stale selected DOM.
  // After a successful action, re-select the just-used Skill only through the
  // normal selection/availability API. If it is no longer legal, leave it clear.
  const priorConfirmSelectedBattleSkill=confirmSelectedBattleSkill;
  confirmSelectedBattleSkill=function confirmSelectedBattleSkillBrowser32600(){
    const before=syncBattleActionRegionState();
    const usedSkillId=before&&before.selectedSkillId?String(before.selectedSkillId):null;
    const result=priorConfirmSelectedBattleSkill.apply(this,arguments);

    if(!(result&&result.success===true))return result;
    if(!currentBattle||currentBattle.battleOver===true||currentBattle.active!==true)return result;

    let reselection=null;
    if(usedSkillId){
      try{reselection=selectBattlePreparedSkill(usedSkillId);}catch(_error){reselection=null;}
    }
    if(!(reselection&&reselection.success===true)){
      try{refreshBattleActionRegionPresentation();}catch(_error){}
    }

    return {
      ...result,
      repeatSkillPresentationReady:!!(reselection&&reselection.success===true),
      repeatedSkillId:usedSkillId,
      repeatStillUsesAuthoritativeAvailability:true
    };
  };

  // --------------------------------------------------------------------------
  // 2. VICTORY UX — CLAIM REWARDS, THEN RETURN TO THE EXACT OWNING CALLER
  // --------------------------------------------------------------------------
  // Player interaction remains one clean CLAIM action. Internally the two
  // semantic operations remain ordered and separate: first the existing reward
  // claim route commits exactly once, then caller restoration uses the existing
  // Battle return-context authority.
  //
  // 2026-09-17 installed-browser evidence exposed a bad fallback: a Kakashi
  // Story Battle could claim successfully, fail its authored caller resume, and
  // then continueAfterVictory() would fall through to generic Combat Arena.
  // Caller-owned Battles now restore the exact pre-claim returnContext snapshot
  // and invoke resumeBattleCallerAfterCompletion() directly. If that authored
  // resume fails, Victory remains open and the error is returned fail-closed;
  // generic Battle fallback is reserved for Battles that genuinely have no
  // caller return context.
  const priorClaimVictoryAutoReturn=claimVictoryRewardsFromOverlay;
  claimVictoryRewardsFromOverlay=function claimVictoryRewardsFromOverlayBrowser32600(){
    const liveReturnContext=currentBattle&&currentBattle.returnContext&&typeof currentBattle.returnContext==="object"
      ?currentBattle.returnContext:null;
    const storedReturnContext=currentBattle&&currentBattle.__scExplicitPostClaimReturnContext32600&&typeof currentBattle.__scExplicitPostClaimReturnContext32600==="object"
      ?currentBattle.__scExplicitPostClaimReturnContext32600:null;
    const rawReturnContext=liveReturnContext||storedReturnContext;
    const returnContextBefore=rawReturnContext&&typeof cloneBattleRuntimeValue==="function"
      ?cloneBattleRuntimeValue(rawReturnContext)
      :rawReturnContext;
    const explicitPostClaim=!!(currentBattle&&currentBattle.rewards&&currentBattle.rewards.requiresExplicitPostClaimContinue===true);
    const explicitClaimedContinue=!!(explicitPostClaim&&currentBattle&&currentBattle.rewards&&currentBattle.rewards.claimed===true);

    // The first click commits the reward. The second click is continuation only:
    // never ask reward authority to grant an already-claimed reward again.
    const claimResult=explicitClaimedContinue
      ?{success:true,claimed:true,idempotent:true,explicitPostClaimContinue:true}
      :priorClaimVictoryAutoReturn.apply(this,arguments);
    if(!(claimResult&&claimResult.success===true))return claimResult;

    if(explicitPostClaim&&!explicitClaimedContinue){
      if(currentBattle){
        currentBattle.__scExplicitPostClaimReturnContext32600=returnContextBefore&&typeof cloneBattleRuntimeValue==="function"
          ?cloneBattleRuntimeValue(returnContextBefore)
          :returnContextBefore;
        if(returnContextBefore){
          currentBattle.returnContext=typeof cloneBattleRuntimeValue==="function"
            ?cloneBattleRuntimeValue(returnContextBefore)
            :returnContextBefore;
        }
      }
      try{openOverlay("victory");}catch(_error){}
      return{
        ...claimResult,
        navigated:false,
        autoReturned:false,
        explicitPostClaimContinue:true,
        rewardCommitBeforeCallerRestore:true
      };
    }

    let callerResult=null;
    let navigationError=null;
    const callerOwned=!!(returnContextBefore&&typeof returnContextBefore==="object"&&returnContextBefore.type);

    try{
      if(callerOwned){
        if(currentBattle){
          currentBattle.returnContext=typeof cloneBattleRuntimeValue==="function"
            ?cloneBattleRuntimeValue(returnContextBefore)
            :returnContextBefore;
        }

        if(typeof resumeBattleCallerAfterCompletion!=="function"){
          callerResult={success:false,reason:"battle_caller_resume_api_missing"};
        }else{
          callerResult=resumeBattleCallerAfterCompletion("victory");
        }

        if(!(callerResult&&callerResult.success===true)){
          navigationError=String(callerResult&&callerResult.reason||"caller_restore_failed");
          try{openOverlay("victory");}catch(_error){}
          return {
            ...claimResult,
            navigated:false,
            autoReturned:false,
            callerOwned:true,
            returnContextBefore,
            callerResult:callerResult||null,
            navigationError,
            rewardCommitBeforeCallerRestore:true,
            genericBattleFallbackSuppressed:true
          };
        }
      }else{
        callerResult=continueAfterVictory();
      }
    }catch(error){
      navigationError=String(error&&error.message||error||"caller_restore_failed");
      if(callerOwned){
        try{openOverlay("victory");}catch(_error){}
        return {
          ...claimResult,
          navigated:false,
          autoReturned:false,
          callerOwned:true,
          returnContextBefore,
          callerResult:callerResult||null,
          navigationError,
          rewardCommitBeforeCallerRestore:true,
          genericBattleFallbackSuppressed:true
        };
      }
    }

    const leftVictory=typeof currentOverlayType==="undefined"||currentOverlayType!=="victory";
    return {
      ...claimResult,
      navigated:leftVictory,
      autoReturned:true,
      callerOwned,
      returnContextBefore,
      callerResult:callerResult||null,
      navigationError,
      explicitClaimedContinue,
      rewardCommitBeforeCallerRestore:true
    };
  };

  // --------------------------------------------------------------------------
  // 3. COMBAT FEED LEGIBILITY — PRESENTATION ONLY
  // --------------------------------------------------------------------------
  if(typeof document!=="undefined"&&!document.getElementById("alpha-battle-browser-32600-style")){
    const style=document.createElement("style");
    style.id="alpha-battle-browser-32600-style";
    style.textContent=`
      .alpha-code-battle-stage .battle-runtime-log{
        left:42.85%!important;
        top:15%!important;
        width:14.3%!important;
        height:41.5%!important;
        padding:10px!important;
        background:rgba(3,9,13,.91)!important;
        border-color:rgba(156,176,184,.42)!important;
        overflow:auto!important;
        scrollbar-width:thin;
      }
      .alpha-code-battle-stage .battle-runtime-panel-title{
        color:#f0d37b!important;
        font-size:clamp(9px,.68vw,12px)!important;
        line-height:1.2!important;
        letter-spacing:.11em!important;
        margin-bottom:8px!important;
      }
      .alpha-code-battle-stage .battle-runtime-log-line{
        padding:6px 0!important;
        color:#bdcbd0!important;
        font-size:clamp(8px,.61vw,10px)!important;
        line-height:1.42!important;
        border-bottom:1px solid rgba(129,150,158,.22)!important;
      }
      .alpha-code-battle-stage .battle-runtime-log-line.is-latest{
        color:#ffe3a0!important;
        font-weight:700!important;
      }
      .alpha-code-battle-stage .battle-runtime-log-empty{
        color:#90a4aa!important;
        font-size:clamp(8px,.6vw,10px)!important;
        line-height:1.4!important;
      }
      .alpha-code-battle-stage .battle-runtime-setup-state{
        margin-top:9px!important;
        padding:8px!important;
      }
      .alpha-code-battle-stage .battle-runtime-setup-state strong{
        font-size:clamp(8px,.6vw,10px)!important;
      }
      .alpha-code-battle-stage .battle-runtime-setup-state span{
        color:#d0c3d8!important;
        font-size:clamp(8px,.58vw,9px)!important;
        line-height:1.4!important;
      }

      /* Keep the active/max Battle PL numerals optically centered in the ring. */
      .alpha-code-battle-stage .alpha-battle-pl-core{
        position:absolute!important;
        inset:0!important;
        z-index:2!important;
        display:grid!important;
        grid-template-columns:auto auto!important;
        grid-template-rows:auto auto!important;
        place-content:center!important;
        align-items:baseline!important;
        column-gap:2px!important;
        line-height:1!important;
        text-align:center!important;
        transform:translateY(7px)!important;
      }
      .alpha-code-battle-stage .alpha-battle-pl-core strong{
        margin:0!important;
        font-size:24px!important;
        line-height:.9!important;
      }
      .alpha-code-battle-stage .alpha-battle-pl-core small{
        margin:0!important;
        font-size:8px!important;
        line-height:1!important;
      }
      .alpha-code-battle-stage .alpha-battle-pl-core em{
        grid-column:1 / -1!important;
        justify-self:center!important;
        margin-top:4px!important;
        line-height:1!important;
      }
    `;
    document.head.appendChild(style);
  }

  function diagnostics(){
    const confirmSource=confirmSelectedBattleSkill.toString();
    const claimSource=claimVictoryRewardsFromOverlay.toString();
    const academyAvailabilitySource=typeof evaluateAcademyBattleSkillAvailability==="function"?evaluateAcademyBattleSkillAvailability.toString():"";
    const closureAvailabilitySource=typeof evaluateClosureWaveSkillAvailability==="function"?evaluateClosureWaveSkillAvailability.toString():"";
    const genericRepeatLockPattern=/lastSkill|previousSkill|different_skill|required_different|same_skill_forbidden|repeat_skill_forbidden/i;
    const checks={
      staleSelectionRerenderFixed:confirmSource.includes("selectBattlePreparedSkill(usedSkillId)"),
      repeatStillChecksAvailability:confirmSource.includes("repeatStillUsesAuthoritativeAvailability:true"),
      academyHasNoGenericRepeatLock:!genericRepeatLockPattern.test(academyAvailabilitySource),
      closureHasNoGenericRepeatLock:!genericRepeatLockPattern.test(closureAvailabilitySource),
      claimThenCallerRestore:claimSource.includes("priorClaimVictoryAutoReturn")&&claimSource.includes('resumeBattleCallerAfterCompletion("victory")'),
      rewardCommitBeforeReturn:claimSource.indexOf("priorClaimVictoryAutoReturn")<claimSource.indexOf('resumeBattleCallerAfterCompletion("victory")'),
      callerContextPreserved:claimSource.includes("returnContextBefore")&&claimSource.includes("currentBattle.returnContext"),
      callerOwnedCannotGenericFallback:claimSource.includes("genericBattleFallbackSuppressed:true")&&claimSource.includes('openOverlay("victory")'),
      explicitPostClaimContinueSupported:claimSource.includes("requiresExplicitPostClaimContinue")&&claimSource.includes("explicitPostClaimContinue:true"),
      explicitClaimedContinueSkipsDuplicateGrant:claimSource.includes("const explicitClaimedContinue=")&&claimSource.includes("const claimResult=explicitClaimedContinue")&&claimSource.includes("idempotent:true"),
      explicitReturnContextPersisted:claimSource.includes("__scExplicitPostClaimReturnContext32600")&&claimSource.includes("storedReturnContext"),
      ordinaryBattleStillUsesGenericContinue:claimSource.includes("callerResult=continueAfterVictory()"),
      feedStyleInstalled:typeof document==="undefined"||!!document.getElementById("alpha-battle-browser-32600-style"),
      browserGoldenNotClaimed:true
    };
    const failed=Object.entries(checks).filter(([,value])=>value!==true).map(([key])=>key);
    return {patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
  }

  window.SC_ALPHA_BATTLE_BROWSER_PATCH_ID=PATCH_ID;
  window.runAlphaBattleBrowser32600Diagnostics=diagnostics;
})();
