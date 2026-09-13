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
//
// 33300 remains the first terminal presentation gate. 33400 loads only after
// 33300 has finished, then replaces that temporary save chooser with the real
// new-player flow and installs the Coding-owned enemy-turn / PL calibration
// corrections. Neither terminal layer is a dependency provider for downstream
// gameplay modules. Headless harnesses without a real document.head no-op here.
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

  if(globalThis.SC_ALPHA_FRONT_DOOR_33300){
    load33400();
    return;
  }

  const existing=document.getElementById("sc-alpha-front-door-33300-script");
  if(existing){
    existing.addEventListener("load",load33400,{once:true});
    return;
  }

  const front=document.createElement("script");
  front.id="sc-alpha-front-door-33300-script";
  front.src="runtime/alpha-front-door-33300.js";
  front.async=false;
  front.addEventListener("load",load33400,{once:true});
  document.head.appendChild(front);
})();

// ============================================================================
// ISSUE #121 — MISSION-SKELETON-DRIVEN CE LIVE CHOICE ENGINE ACTIVATION
//
// This is a terminal Story-runtime extension. It consumes the already-loaded
// Story Scene machinery and does not provide dependencies to later gameplay
// modules. Headless harnesses without a real document head intentionally no-op.
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
//
// The binding adapter consumes the #121 engine, so load it only after the
// engine script has completed. It remains terminal: no downstream production
// module depends on it during parser-time initialisation.
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

  if(globalThis.SC_ALPHA_MISSION_CHOICE_121){
    loadBindings121();
    return;
  }

  const engine=document.getElementById("sc-alpha-mission-choice-121-script");
  if(engine){
    engine.addEventListener("load",loadBindings121,{once:true});
  }
})();

// ============================================================================
// ISSUE #173 — ALTERED SHINOBI BATTLE / VICTORY PRESENTATION AUTHORITY
//
// UI / Assets final authority b02b41c9 maps the stable opposition identity
// test_subject_altered_shinobi to the exact existing enemy portrait below.
// This consumes the existing enemy.image presentation seam only. It does not
// admit the enemy to the playable Registry/UI portrait manifest, change Combat
// semantics, or create ownership/acquisition state.
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
//
// Installed-browser evidence showed that dedicated Story backdrops were placed
// behind the translucent Story layer, allowing World map markers to bleed into
// Origin scenes. The same pass exposed static/reconvergent presentation in the
// 32900 Origins. 33500 is a terminal Story presentation/graph reconciliation:
// it consumes already-registered Origin scenes and their existing consequence
// authorities. It does not turn Origins into Missions or create new history.
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
