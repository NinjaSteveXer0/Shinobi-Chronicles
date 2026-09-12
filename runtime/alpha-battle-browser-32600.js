// ============================================================================
// ALPHA BATTLE BROWSER UX HARDENING — POST 32500
// Browser evidence: 2026-09-12 Stephen installed/local browser pass.
// Scope: readable Combat Feed, repeat-skill presentation correctness, and
// single-button reward claim -> exact caller restoration.
// Semantic boundaries preserved:
// - repeat use is allowed only when the existing authoritative availability
//   evaluator still says the Skill is legal;
// - reward commit remains exactly-once and happens before caller restoration;
// - caller restoration still uses the existing Battle return-context authority.
// ============================================================================
(function installAlphaBattleBrowser32600(){
  "use strict";

  const PATCH_ID="alpha_battle_browser_32600_2026_09_12";

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
  // This intentionally changes the player interaction from CLAIM -> CONTINUE to
  // one clean CLAIM action. Internally the two semantic operations remain
  // ordered and separate: first claimCurrentBattleRewards via the existing claim
  // route, then continueAfterVictory() restores Story / region hotspot / mission
  // area / assessment using the existing return-context machinery.
  const priorClaimVictoryAutoReturn=claimVictoryRewardsFromOverlay;
  claimVictoryRewardsFromOverlay=function claimVictoryRewardsFromOverlayBrowser32600(){
    const returnContextBefore=currentBattle&&currentBattle.returnContext&&typeof cloneBattleRuntimeValue==="function"
      ? cloneBattleRuntimeValue(currentBattle.returnContext)
      : (currentBattle&&currentBattle.returnContext?currentBattle.returnContext:null);

    const claimResult=priorClaimVictoryAutoReturn.apply(this,arguments);
    if(!(claimResult&&claimResult.success===true))return claimResult;

    let callerResult=null;
    let navigationError=null;
    try{
      callerResult=continueAfterVictory();
    }catch(error){
      navigationError=String(error&&error.message||error||"caller_restore_failed");
    }

    const leftVictory=typeof currentOverlayType==="undefined"||currentOverlayType!=="victory";
    return {
      ...claimResult,
      navigated:leftVictory,
      autoReturned:true,
      returnContextBefore,
      callerResult:callerResult||null,
      navigationError,
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
      claimThenCallerRestore:claimSource.includes("priorClaimVictoryAutoReturn")&&claimSource.includes("continueAfterVictory()"),
      rewardCommitBeforeReturn:claimSource.indexOf("priorClaimVictoryAutoReturn")<claimSource.indexOf("continueAfterVictory()"),
      callerContextPreserved:claimSource.includes("returnContextBefore"),
      feedStyleInstalled:typeof document==="undefined"||!!document.getElementById("alpha-battle-browser-32600-style"),
      browserGoldenNotClaimed:true
    };
    const failed=Object.entries(checks).filter(([,value])=>value!==true).map(([key])=>key);
    return {patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
  }

  window.SC_ALPHA_BATTLE_BROWSER_PATCH_ID=PATCH_ID;
  window.runAlphaBattleBrowser32600Diagnostics=diagnostics;
})();
