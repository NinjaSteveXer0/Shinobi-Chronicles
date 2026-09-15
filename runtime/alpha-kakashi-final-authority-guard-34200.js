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
// A guarded opening choice may be released only through the proof-bearing API
// below after its successor consumer has already been installed.
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
const releasedInitialChoices={};
let guardState={applied:false,reason:"not_evaluated",sceneId:SCENE_ID,releasedInitialChoiceIds:[]};

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
    guardState={applied:false,reason:"scene_registry_unavailable",sceneId:SCENE_ID,releasedInitialChoiceIds:Object.keys(releasedInitialChoices)};
    return{success:false,...guardState};
  }
  if(!detectLegacyGraph(definition)){
    guardState={...guardState,applied:false,reason:"final_or_nonlegacy_graph_present",sceneId:SCENE_ID,releasedInitialChoiceIds:Object.keys(releasedInitialChoices)};
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
    blockedMajorChoiceIds:major.choices.map(row=>row.choiceId),
    releasedInitialChoiceIds:Object.keys(releasedInitialChoices)
  };
  rerenderActiveScene();
  return{success:true,...guardState};
}

function releaseInitialChoice(choiceId,spec={}){
  const id=String(choiceId||"");
  if(!OLD_ACTION_IDS.includes(id)||id==="observe")return{success:false,reason:"kakashi_guard_choice_not_releasable",choiceId:id||null};
  const successorProofRef=String(spec.successorProofRef||"");
  const ownerRef=String(spec.ownerRef||"");
  if(!successorProofRef||!ownerRef)return{success:false,reason:"kakashi_guard_release_proof_required",choiceId:id};

  const definition=sceneDefinition(),map=definition&&definition.beatMap instanceof Map?definition.beatMap:null;
  const action=map&&map.get("kak_original_action");
  const choice=action&&Array.isArray(action.choices)?action.choices.find(row=>row&&row.choiceId===id):null;
  if(!choice)return{success:false,reason:"kakashi_guard_choice_missing",choiceId:id};
  if(!choice.nextBeatId||choice.nextBeatId==="kak_original_transfer")return{success:false,reason:"kakashi_guard_successor_not_installed",choiceId:id};

  const requiredRequestId=String(spec.requiredConsequenceRequestId||"");
  if(requiredRequestId){
    const requests=Array.isArray(choice.consequenceRequests)?choice.consequenceRequests:[];
    if(!requests.some(row=>row&&String(row.requestId||"")===requiredRequestId)){
      return{success:false,reason:"kakashi_guard_required_consequence_missing",choiceId:id,requiredRequestId};
    }
  }

  releasedInitialChoices[id]={
    choiceId:id,
    successorProofRef,
    ownerRef,
    requiredConsequenceRequestId:requiredRequestId||null
  };
  choice.availability=()=>({available:true,knownBlocker:null});
  choice.knownBlocker=null;
  guardState={
    ...guardState,
    releasedInitialChoiceIds:Object.keys(releasedInitialChoices),
    blockedInitialChoiceIds:Array.isArray(guardState.blockedInitialChoiceIds)
      ?guardState.blockedInitialChoiceIds.filter(value=>value!==id)
      :[]
  };
  rerenderActiveScene();
  return{success:true,choiceId:id,successorProofRef,ownerRef};
}

function getGuardState(){return JSON.parse(JSON.stringify({...guardState,releasedInitialChoices}));}
function runAlphaKakashiFinalAuthorityGuard34200Diagnostics(){
  const definition=sceneDefinition();
  const legacy=detectLegacyGraph(definition);
  const releases=Object.values(releasedInitialChoices);
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_final_authority_guard_34200_2026_09_15",
    finalWritingPinned:FINAL_WRITING==="176ce76feef3e67d4c24644e3d7443a04dcf7d6b",
    finalAutonomyPinned:FINAL_AUTONOMY==="713cae26e3b3fb4a214564b497a5f30fb2f14313",
    semanticAdapterPresent:!!globalThis.SC_ALPHA_KAKASHI_FINAL_34100,
    legacyGraphEitherGuardedOrAbsent:!legacy||guardState.applied===true,
    releasedChoicesProofBearing:releases.every(row=>!!row.successorProofRef&&!!row.ownerRef),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,guardState:getGuardState(),browserGoldenClaimed:false};
}

const api=Object.freeze({
  patchId:PATCH_ID,sceneId:SCENE_ID,finalWriting:FINAL_WRITING,finalAutonomy:FINAL_AUTONOMY,
  blocker:BLOCKER,detectLegacyGraph,applyLegacyGuard,releaseInitialChoice,getGuardState,browserGoldenClaimed:false
});
globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200=api;
globalThis.runAlphaKakashiFinalAuthorityGuard34200Diagnostics=runAlphaKakashiFinalAuthorityGuard34200Diagnostics;
applyLegacyGuard();
})();
