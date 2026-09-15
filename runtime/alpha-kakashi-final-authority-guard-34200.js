// ============================================================================
// ISSUES #188 + #192 — ACADEMY KAKASHI FINAL-AUTHORITY GUARD — 34200
//
// Final Writing authority:
// - 176ce76feef3e67d4c24644e3d7443a04dcf7d6b
// - 713cae26e3b3fb4a214564b497a5f30fb2f14313
//
// 33800 still projects an older compressed Kakashi route while exact owning
// non-Battle resolver producers and final Combat deployment packages are being
// bound. This guard changes no outcome and creates no replacement Story engine.
// It only prevents that superseded graph from committing false final facts.
// Once a non-legacy final graph replaces 33800, this module becomes a no-op.
// ============================================================================
(function installAlphaKakashiFinalAuthorityGuard34200(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200)return;

const PATCH_ID="alpha_kakashi_final_authority_guard_34200_2026_09_15";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const FINAL_WRITING="176ce76feef3e67d4c24644e3d7443a04dcf7d6b";
const FINAL_AUTONOMY="713cae26e3b3fb4a214564b497a5f30fb2f14313";
const BLOCKER="This route is not available in the current Alpha build.";
const OLD_ACTION_IDS=["observe","get_closer","attack","attempt_pickpocket"];
const OLD_MAJOR_IDS=["fight_assassin","secure_package","defeat_assassin_then_recover","pursue_original_target"];
let guardState={applied:false,reason:"not_evaluated",sceneId:SCENE_ID};

function choiceIds(beat){return beat&&Array.isArray(beat.choices)?beat.choices.map(row=>String(row.choiceId||"")):[];}
function sameIds(actual,expected){return actual.length===expected.length&&actual.every((value,index)=>value===expected[index]);}
function sceneDefinition(){return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}

function detectLegacyGraph(definition){
  const map=definition&&definition.beatMap instanceof Map?definition.beatMap:null;
  if(!map)return false;
  const action=map.get("kak_original_action"),major=map.get("kak_original_major_choice");
  const secured=map.get("kak_original_secured"),pursue=map.get("kak_original_pursue");
  if(!action||!major||!secured||!pursue)return false;
  if(!sameIds(choiceIds(action),OLD_ACTION_IDS)||!sameIds(choiceIds(major),OLD_MAJOR_IDS))return false;
  if(!action.choices.every(row=>row.nextBeatId==="kak_original_transfer"))return false;
  return secured.exitScene===true&&pursue.exitScene===true;
}

function blockChoice(choice){
  choice.availability=()=>({available:false,knownBlocker:BLOCKER});
  choice.knownBlocker=BLOCKER;
}

function hardenLegacyTerminal(beat){
  beat.onEnterConsequences=[];
  beat.exitScene=false;
  beat.nextBeatId="kak_original_major_choice";
}

function rerenderActiveScene(){
  try{
    const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
    if(active&&active.sceneId===SCENE_ID&&typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();
  }catch(_error){}
}

function applyLegacyGuard(){
  const definition=sceneDefinition();
  if(!definition){
    guardState={applied:false,reason:"scene_registry_unavailable",sceneId:SCENE_ID};
    return{success:false,...guardState};
  }
  if(!detectLegacyGraph(definition)){
    guardState={applied:false,reason:"final_or_nonlegacy_graph_present",sceneId:SCENE_ID};
    return{success:true,...guardState};
  }
  const map=definition.beatMap;
  const action=map.get("kak_original_action"),major=map.get("kak_original_major_choice");
  action.choices.forEach(choice=>{if(choice.choiceId!=="observe")blockChoice(choice);});
  major.choices.forEach(blockChoice);
  hardenLegacyTerminal(map.get("kak_original_secured"));
  hardenLegacyTerminal(map.get("kak_original_pursue"));
  definition.onCompleteConsequences=[];
  guardState={
    applied:true,
    reason:"superseded_33800_completion_blocked",
    sceneId:SCENE_ID,
    blockedInitialChoiceIds:action.choices.filter(row=>row.choiceId!=="observe").map(row=>row.choiceId),
    blockedMajorChoiceIds:major.choices.map(row=>row.choiceId)
  };
  rerenderActiveScene();
  return{success:true,...guardState};
}

function getGuardState(){return JSON.parse(JSON.stringify(guardState));}
function runAlphaKakashiFinalAuthorityGuard34200Diagnostics(){
  const definition=sceneDefinition();
  const legacy=detectLegacyGraph(definition);
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_final_authority_guard_34200_2026_09_15",
    finalWritingPinned:FINAL_WRITING==="176ce76feef3e67d4c24644e3d7443a04dcf7d6b",
    finalAutonomyPinned:FINAL_AUTONOMY==="713cae26e3b3fb4a214564b497a5f30fb2f14313",
    semanticAdapterPresent:!!globalThis.SC_ALPHA_KAKASHI_FINAL_34100,
    legacyGraphEitherGuardedOrAbsent:!legacy||guardState.applied===true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,guardState:getGuardState(),browserGoldenClaimed:false};
}

const api=Object.freeze({
  patchId:PATCH_ID,sceneId:SCENE_ID,finalWriting:FINAL_WRITING,finalAutonomy:FINAL_AUTONOMY,
  blocker:BLOCKER,detectLegacyGraph,applyLegacyGuard,getGuardState,browserGoldenClaimed:false
});
globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200=api;
globalThis.runAlphaKakashiFinalAuthorityGuard34200Diagnostics=runAlphaKakashiFinalAuthorityGuard34200Diagnostics;
applyLegacyGuard();
})();
