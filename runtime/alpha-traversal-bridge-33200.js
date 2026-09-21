// ============================================================================
// ALPHA TRAVERSAL BRIDGE — 33200
// Coding-owned navigation seam for #141 / #63.
//
// Purpose:
// - preserve the #63 contract that an incomplete post-Promotion Genin team can
//   always be resumed through Arena -> Promotion -> CHOOSE YOUR TEAM;
// - after CONTINUE successfully finalises that team, return the player to the
//   existing Current Journey surface so Arc 1 M1 can become the next legitimate
//   frontier without a dead-end/reopen loop;
// - change navigation only. Candidate, ownership, reservation, assignment,
//   Promotion, Mission, Story, World and Battle authority remain untouched.
// ============================================================================
(function installAlphaTraversalBridge33200(){
  "use strict";

  const PATCH_ID="alpha_traversal_bridge_33200_2026_09_13";
  const priorPromotion33200=typeof openArenaPromotionSurface==="function"?openArenaPromotionSurface:null;
  const priorRosterOpen33200=typeof openGeninRosterTransitionUI==="function"?openGeninRosterTransitionUI:null;

  function getTransition33200(){
    try{
      return typeof getGeninRosterTransitionState==="function"?getGeninRosterTransitionState():null;
    }catch(_error){return null;}
  }

  function isIncompleteTransition33200(state){
    return !!(state&&state.unlocked===true&&state.required===true&&state.completed!==true);
  }

  function openCurrentJourney33200(reason){
    if(typeof openOverlay!=="function")return{success:false,reason:"journey_overlay_authority_missing"};
    const result=openOverlay("missions");
    return {
      success:true,
      destination:"missions",
      reason:reason||"genin_team_finalised_return_to_current_journey",
      alpha33200:true,
      overlayResult:result||null
    };
  }

  function openGeninRosterTransitionUI33200(){
    const state=getTransition33200();
    if(state&&state.completed===true){
      return openCurrentJourney33200("genin_roster_transition_already_finalised");
    }
    if(priorRosterOpen33200)return priorRosterOpen33200.apply(this,arguments);
    return{success:false,reason:"genin_roster_transition_ui_authority_missing"};
  }

  function openArenaPromotionSurface33200(subjectId){
    const state=getTransition33200();
    if(isIncompleteTransition33200(state)){
      const result=openGeninRosterTransitionUI33200();
      if(result&&typeof result==="object"){
        return {...result,alpha33200PromotionResume:true,subjectId:subjectId||state.subjectOwnedCharacterId||null};
      }
      return{success:true,alpha33200PromotionResume:true,subjectId:subjectId||state.subjectOwnedCharacterId||null};
    }
    if(priorPromotion33200)return priorPromotion33200.apply(this,arguments);
    return{success:false,reason:"promotion_surface_authority_missing"};
  }

  globalThis.openGeninRosterTransitionUI=openGeninRosterTransitionUI33200;
  globalThis.openArenaPromotionSurface=openArenaPromotionSurface33200;
  try{if(typeof openGeninRosterTransitionUI!=="undefined")openGeninRosterTransitionUI=openGeninRosterTransitionUI33200;}catch(_error){}
  try{if(typeof openArenaPromotionSurface!=="undefined")openArenaPromotionSurface=openArenaPromotionSurface33200;}catch(_error){}

  function runAlphaTraversalBridge33200Diagnostics(){
    const promotionSource=openArenaPromotionSurface33200.toString();
    const rosterSource=openGeninRosterTransitionUI33200.toString();
    const checks={
      patchId:PATCH_ID==="alpha_traversal_bridge_33200_2026_09_13",
      incompleteTransitionResumesRoster:promotionSource.includes("isIncompleteTransition33200")&&promotionSource.includes("openGeninRosterTransitionUI33200"),
      completedTransitionReturnsJourney:rosterSource.includes("state.completed===true")&&rosterSource.includes("openCurrentJourney33200"),
      currentJourneyUsesExistingMissionsRoute:openCurrentJourney33200.toString().includes('openOverlay("missions")'),
      noCandidateMutation:!promotionSource.includes("selectedTeamVariantIds=")&&!rosterSource.includes("selectedTeamVariantIds="),
      noOwnershipMutation:!promotionSource.includes("commitCharacterAcquisition")&&!rosterSource.includes("commitCharacterAcquisition"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false,patchId:PATCH_ID};
  }

  globalThis.runAlphaTraversalBridge33200Diagnostics=runAlphaTraversalBridge33200Diagnostics;
})();

// ============================================================================
// ISSUE #165 — TERMINAL FRONT-DOOR + INSTALLED-BROWSER CORRECTION ACTIVATION
// ============================================================================
(function activateAlphaBrowserTerminalChain33200(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;

  function load33400(){
    if(globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400||document.getElementById("sc-alpha-browser-onboarding-fixes-33400-script"))return;
    const fix=document.createElement("script");
    fix.id="sc-alpha-browser-onboarding-fixes-33400-script";
    fix.src="runtime/alpha-browser-onboarding-fixes-33400.js";
    fix.async=false;
    document.head.appendChild(fix);
  }

  if(globalThis.SC_ALPHA_FRONT_DOOR_33300){load33400();return;}
  const existing=document.getElementById("sc-alpha-front-door-33300-script");
  if(existing){existing.addEventListener("load",load33400,{once:true});return;}
  const front=document.createElement("script");
  front.id="sc-alpha-front-door-33300-script";
  front.src="runtime/alpha-front-door-33300.js";
  front.async=false;
  front.addEventListener("load",load33400,{once:true});
  document.head.appendChild(front);
})();

// ============================================================================
// ISSUE #121 — MISSION-SKELETON-DRIVEN CE LIVE CHOICE ENGINE ACTIVATION
// ============================================================================
(function activateMissionChoiceGeneration121From33200(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;
  if(globalThis.SC_ALPHA_MISSION_CHOICE_121||document.getElementById("sc-alpha-mission-choice-121-script"))return;
  const script=document.createElement("script");
  script.id="sc-alpha-mission-choice-121-script";
  script.src="runtime/alpha-mission-choice-generation-121.js";
  script.async=false;
  document.head.appendChild(script);
})();

// ============================================================================
// ISSUE #121 — FIRST PRODUCTION STORY BINDING ACTIVATION
// ============================================================================
(function activateMissionChoiceProductionBindings121From33200(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;

  function loadBindings121(){
    if(globalThis.SC_ALPHA_MISSION_CHOICE_BINDINGS_121||document.getElementById("sc-alpha-mission-choice-bindings-121-script"))return;
    const binding=document.createElement("script");
    binding.id="sc-alpha-mission-choice-bindings-121-script";
    binding.src="runtime/alpha-mission-choice-production-bindings-121.js";
    binding.async=false;
    document.head.appendChild(binding);
  }

  if(globalThis.SC_ALPHA_MISSION_CHOICE_121){loadBindings121();return;}
  const engine=document.getElementById("sc-alpha-mission-choice-121-script");
  if(engine)engine.addEventListener("load",loadBindings121,{once:true});
})();

// ============================================================================
// ISSUE #173 — ALTERED SHINOBI BATTLE / VICTORY PRESENTATION AUTHORITY
// ============================================================================
(function bindAlteredShinobiPresentation173(){
  "use strict";
  const ENEMY_ID="test_subject_altered_shinobi";
  const APPROVED_PATH="Enemies Portraits/test_subject_altered_shinobi.png";
  const enemy=(typeof enemyDatabase==="object"&&enemyDatabase)?enemyDatabase[ENEMY_ID]:null;

  if(enemy)enemy.image=APPROVED_PATH;

  function runIssue173AlteredShinobiPresentationDiagnostics(){
    const row=(typeof enemyDatabase==="object"&&enemyDatabase)?enemyDatabase[ENEMY_ID]:null;
    const direct=typeof resolveBattleEnemyPortraitProjection==="function"&&row?resolveBattleEnemyPortraitProjection(row):null;
    const battle=typeof getAlphaBattleActivePortraitProjection==="function"&&row?getAlphaBattleActivePortraitProjection("enemy",row):null;
    const victory=typeof getAlphaVictoryPortrait==="function"&&row?getAlphaVictoryPortrait(row,"enemy"):null;
    const checks={
      enemyExists:!!row,
      exactApprovedPath:!!row&&row.image===APPROVED_PATH,
      directEnemyAuthority:!!direct&&direct.path===APPROVED_PATH&&direct.status==="authored_enemy"&&direct.fallbackUsed===false,
      battleUsesEnemyPortrait:!!battle&&battle.path===APPROVED_PATH&&battle.authority==="enemyPortrait",
      victoryUsesSamePresentation:!!victory&&victory.path===APPROVED_PATH&&victory.authority==="enemyPortrait",
      noPlayableRegistryAdmission:typeof getCharacterRegistryEntry!="function"||!getCharacterRegistryEntry(ENEMY_ID),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{pass:failed.length===0,checks,failed,enemyId:ENEMY_ID,path:APPROVED_PATH,browserGoldenClaimed:false};
  }

  globalThis.runIssue173AlteredShinobiPresentationDiagnostics=runIssue173AlteredShinobiPresentationDiagnostics;
})();

// ============================================================================
// ISSUE #105 / #175 — ORIGIN BROWSER REALISATION + STORY BACKDROP STACKING
// ============================================================================
(function activateOriginBrowserRealisation33500From33200(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;
  if(globalThis.SC_ALPHA_ORIGIN_BROWSER_REALISATION_33500||document.getElementById("sc-alpha-origin-browser-realisation-33500-script"))return;
  const script=document.createElement("script");
  script.id="sc-alpha-origin-browser-realisation-33500-script";
  script.src="runtime/alpha-origin-browser-realisation-33500.js";
  script.async=false;
  document.head.appendChild(script);
})();

// ============================================================================
// ISSUE #105 / #175 — REMAINING 32900 ORIGIN CHOICE-REACTION ACTIVATION
//
// 33510 consumes the 33500-patched registry, so it waits on that script rather
// than racing the parser/dynamic loader. It adds no Mission or history owner.
// ============================================================================
(function activateOriginChoiceReaction33510From33200(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;

  function load33510(){
    if(globalThis.SC_ALPHA_ORIGIN_CHOICE_REACTION_33510||document.getElementById("sc-alpha-origin-choice-reaction-33510-script"))return;
    const script=document.createElement("script");
    script.id="sc-alpha-origin-choice-reaction-33510-script";
    script.src="runtime/alpha-origin-choice-reaction-33510.js";
    script.async=false;
    document.head.appendChild(script);
  }

  if(globalThis.SC_ALPHA_ORIGIN_BROWSER_REALISATION_33500){load33510();return;}
  const base=document.getElementById("sc-alpha-origin-browser-realisation-33500-script");
  if(base)base.addEventListener("load",load33510,{once:true});
})();

// ============================================================================
// ISSUE #105 / #121 / #170 — FINAL EARLY-STORY EXPRESSION CONSUMPTION
//
// 33600 must run after 33510 because it is the final Writing-owned expression
// layer over the already-reconciled Origin graphs. 33600 also activates the
// early-Arc #121 semantic-intent adapter after the generic CE engine is ready.
// ============================================================================
(function activateEarlyStoryModernization33600From33200(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;

  function load33600(){
    if(globalThis.SC_ALPHA_EARLY_STORY_MODERNIZATION_33600||document.getElementById("sc-alpha-early-story-modernization-33600-script"))return;
    const script=document.createElement("script");
    script.id="sc-alpha-early-story-modernization-33600-script";
    script.src="runtime/alpha-early-story-modernization-33600.js";
    script.async=false;
    document.head.appendChild(script);
  }

  if(globalThis.SC_ALPHA_ORIGIN_CHOICE_REACTION_33510){load33600();return;}
  const prior=document.getElementById("sc-alpha-origin-choice-reaction-33510-script");
  if(prior){prior.addEventListener("load",load33600,{once:true});return;}

  const base=document.getElementById("sc-alpha-origin-browser-realisation-33500-script");
  if(base){
    base.addEventListener("load",()=>{
      const reaction=document.getElementById("sc-alpha-origin-choice-reaction-33510-script");
      if(globalThis.SC_ALPHA_ORIGIN_CHOICE_REACTION_33510)load33600();
      else if(reaction)reaction.addEventListener("load",load33600,{once:true});
    },{once:true});
  }
})();

// ============================================================================
// ISSUE #105 / #175 / #181 — TERMINAL ORIGIN SCENE-BOARD ACTIVATION
//
// 33700 is the final screen-first expression layer. 33800 must run after it so
// accepted Kakashi authority wins over the superseded evaluator rewrite. 33800
// then activates reusable scene-board projection 33900. Keep this sequence in
// the terminal loader rather than parser-ordering these dynamic modules.
// Cache-bust these terminal dynamic modules so browser replay cannot silently
// reuse an older presentation payload after a runtime correction.
// ============================================================================
(function activateOriginSceneBoardTerminalChain33200(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;

  // const SCENE_BOARD_BUILD="scene-board-20260919-9";
// const SCENE_BOARD_BUILD="scene-board-20260919-10";
// const SCENE_BOARD_BUILD="scene-board-20260919-11";
const SCENE_BOARD_BUILD="scene-board-20260921-15";

  function load33800(){
    if(globalThis.SC_ALPHA_KAKASHI_ORIGINAL_33800||document.getElementById("sc-alpha-kakashi-original-33800-script"))return;
    const script=document.createElement("script");
    script.id="sc-alpha-kakashi-original-33800-script";
    script.src=`runtime/alpha-kakashi-original-origin-restoration-33800.js?v=${SCENE_BOARD_BUILD}`;
    script.async=false;
    document.head.appendChild(script);
  }

  function load33700(){
    if(globalThis.SC_ALPHA_ORIGIN_SCREEN_FIRST_33700){load33800();return;}
    const existing=document.getElementById("sc-alpha-origin-screen-first-33700-script");
    if(existing){existing.addEventListener("load",load33800,{once:true});return;}
    const script=document.createElement("script");
    script.id="sc-alpha-origin-screen-first-33700-script";
    script.src=`runtime/alpha-origin-screen-first-33700.js?v=${SCENE_BOARD_BUILD}`;
    script.async=false;
    script.addEventListener("load",load33800,{once:true});
    document.head.appendChild(script);
  }

  if(globalThis.SC_ALPHA_EARLY_STORY_MODERNIZATION_33600){load33700();return;}
  const prior=document.getElementById("sc-alpha-early-story-modernization-33600-script");
  if(prior){prior.addEventListener("load",load33700,{once:true});return;}

  const reaction=document.getElementById("sc-alpha-origin-choice-reaction-33510-script");
  if(reaction){
    reaction.addEventListener("load",()=>{
      const modernization=document.getElementById("sc-alpha-early-story-modernization-33600-script");
      if(globalThis.SC_ALPHA_EARLY_STORY_MODERNIZATION_33600)load33700();
      else if(modernization)modernization.addEventListener("load",load33700,{once:true});
    },{once:true});
  }
})();
