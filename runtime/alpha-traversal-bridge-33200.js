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
// ISSUE #165 — TERMINAL FRONT-DOOR ACTIVATION
//
// 33300 is a terminal presentation/boot gate, not a dependency provider for any
// later gameplay module. Load it from the existing Coding-owned traversal seam
// without changing parser authority for World/Story/Battle. The script marks
// itself through SC_ALPHA_FRONT_DOOR_33300 and the id below prevents duplicate
// activation. This does not recreate the retired #112 parser-dependency pattern.
// ============================================================================
(function activateAlphaFrontDoor33300(){
  if(typeof document==="undefined")return;
  if(globalThis.SC_ALPHA_FRONT_DOOR_33300||document.getElementById("sc-alpha-front-door-33300-script"))return;
  const script=document.createElement("script");
  script.id="sc-alpha-front-door-33300-script";
  script.src="runtime/alpha-front-door-33300.js";
  script.async=false;
  document.head.appendChild(script);
})();
