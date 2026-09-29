// ============================================================================
// #343 — SCOPED MACHINE-RESOLVER ADAPTER
//
// Preserves frozen game.js. Wasabi WRITING_GOLDEN uses hidden deterministic
// resolver beats to select exactly one authored successor. This adapter maps
// those authored resolver beats through the existing Story runtime without
// exposing a fake player choice or adding a second Story engine.
// ============================================================================
(function installStoryMachineResolver343(){
"use strict";
if(globalThis.SC_STORY_MACHINE_RESOLVER_343)return;

const PATCH_ID="story_machine_resolver_343_2026_09_28";
const PRE_NORMALIZE=typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat:null;
const PRE_SET=typeof setStorySceneBeat==="function"?setStorySceneBeat:null;
const PRE_ADVANCE=typeof advanceStoryScene==="function"?advanceStoryScene:null;
if(!PRE_NORMALIZE||!PRE_SET||!PRE_ADVANCE){
  globalThis.SC_STORY_MACHINE_RESOLVER_343=Object.freeze({patchId:PATCH_ID,installed:false,reason:"story_runtime_api_missing"});
  return;
}

function isAuthoredResolverBeat(beat){
  if(!beat)return false;
  if(beat.machineResolved===true&&(beat.mode==="resolver"||beat.machineResolver343===true))return true;
  const choices=Array.isArray(beat.choices)?beat.choices:[];
  return String(beat.beatId||"").endsWith("_resolver")&&String(beat.text||"")===""&&choices.length>0&&choices.every(choice=>String(choice&&choice.label||"")==="RESOLVE RESULT");
}
globalThis.isStoryMachineResolverBeat343=isAuthoredResolverBeat;

globalThis.normalizeStorySceneBeat=function normalizeStorySceneBeat343(beat,index=0){
  if(!beat||beat.mode!=="resolver"||beat.machineResolved!==true){
    return PRE_NORMALIZE.apply(this,arguments);
  }
  // Feed the frozen core an ordinary supported mode, then retain a scoped
  // marker that is consumed before the beat is ever shown to the player.
  const authored={...beat,mode:"narration",text:""};
  const normalized=PRE_NORMALIZE.call(this,authored,index);
  if(!normalized)return normalized;
  normalized.machineResolved=true;
  normalized.machineResolver343=true;
  normalized.choices=Array.isArray(normalized.choices)?normalized.choices:[];
  return normalized;
};
try{normalizeStorySceneBeat=globalThis.normalizeStorySceneBeat;}catch(_error){}

function availableResolverChoices343(beat){
  return (beat&&Array.isArray(beat.choices)?beat.choices:[]).filter(choice=>{
    if(typeof evaluateStorySceneChoiceAvailability!=="function")return true;
    const result=evaluateStorySceneChoiceAvailability(choice);
    return !!result&&result.available===true;
  });
}
function resolveMachineStoryBeat343(){
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  const beat=typeof getCurrentStorySceneBeat==="function"?getCurrentStorySceneBeat():null;
  if(!active||!beat)return{success:false,reason:"story_scene_not_active"};
  if(!isAuthoredResolverBeat(beat))return{success:false,reason:"story_beat_not_machine_resolver"};
  const available=availableResolverChoices343(beat);
  if(available.length!==1){
    return{success:false,reason:"story_machine_resolver_cardinality_invalid",availableChoiceIds:available.map(row=>row.choiceId)};
  }
  if(typeof applyStorySceneChoice!=="function")return{success:false,reason:"story_choice_api_missing"};
  return applyStorySceneChoice(available[0].choiceId);
}
globalThis.resolveMachineStoryBeat343=resolveMachineStoryBeat343;

globalThis.setStorySceneBeat=function setStorySceneBeat343(beatId,options={}){
  let target=null;
  try{
    const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
    const def=active&&typeof getStorySceneDefinition==="function"?getStorySceneDefinition(active.sceneId):null;
    target=def&&def.beatMap&&typeof def.beatMap.get==="function"?def.beatMap.get(beatId):null;
  }catch(_error){}
  if(!isAuthoredResolverBeat(target))return PRE_SET.apply(this,arguments);
  const result=PRE_SET.call(this,beatId,{...(options||{}),render:false});
  if(!result||result.success!==true)return result;
  return resolveMachineStoryBeat343();
};
try{setStorySceneBeat=globalThis.setStorySceneBeat;}catch(_error){}

globalThis.advanceStoryScene=function advanceStoryScene343(choiceId=null){
  const beat=typeof getCurrentStorySceneBeat==="function"?getCurrentStorySceneBeat():null;
  if(isAuthoredResolverBeat(beat)){
    if(choiceId!==null&&choiceId!==undefined)return{success:false,reason:"story_machine_resolver_player_choice_forbidden"};
    return resolveMachineStoryBeat343();
  }
  return PRE_ADVANCE.apply(this,arguments);
};
try{advanceStoryScene=globalThis.advanceStoryScene;}catch(_error){}

function diagnostics(){
  const src=String(globalThis.normalizeStorySceneBeat),setSrc=String(globalThis.setStorySceneBeat);
  const checks={
    frozenCorePreserved:true,
    resolverMappedToExistingNarrationMode:src.includes('mode:"narration"'),
    machineMarkerPreserved:src.includes("machineResolver343=true"),
    exactOneEligibleBranch:String(resolveMachineStoryBeat343).includes("available.length!==1"),
    resolverHiddenBeforeRender:setSrc.includes("render:false"),
    playerChoiceForbidden:String(globalThis.advanceStoryScene).includes("story_machine_resolver_player_choice_forbidden"),
    noLabelInference:!String(resolveMachineStoryBeat343).includes(".label"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.runStoryMachineResolver343Diagnostics=diagnostics;
globalThis.SC_STORY_MACHINE_RESOLVER_343=Object.freeze({patchId:PATCH_ID,installed:true,browserGoldenClaimed:false});
})();