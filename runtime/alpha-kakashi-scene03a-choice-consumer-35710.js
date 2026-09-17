// ============================================================================
// ISSUE #188 — ACADEMY KAKASHI SCENE 03A CHOICE RELEASE + OBJECTIVE PATCH — 35710
//
// Consumes the committed Scene 03A handoff / OBSERVE_ESCALATION provenance from
// 35700. This tranche is intentionally narrow:
// - update the player-facing objective once Package Smuggler takes the package;
// - release the five authored Scene 03A choices once the committed handoff and
//   semantic choice set are present;
// - do not invent downstream resolver/Battle outcomes or terminal state.
// ============================================================================
(function installAcademyKakashiScene03AChoiceConsumer35710(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_SCENE03A_CHOICES_35710)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const SCENE03A=globalThis.SC_ALPHA_KAKASHI_SCENE03A_35700;
if(!A||typeof A.findOccurrence!=="function"||!CORE||typeof CORE.getStoryUnitSnapshot!=="function"||!SCENE03A){
  throw new Error("kakashi_scene03a_choices_35710_authority_missing");
}

const PATCH_ID="alpha_kakashi_scene03a_choices_35710_2026_09_18";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const TRANSFER_BEAT="kak_original_transfer";
const MAJOR_BEAT="kak_original_major_choice";
const OBSERVE_CHOICE="observe";
const DECISION_POINT="OBSERVE_ESCALATION";
const POST_HANDOFF_OBJECTIVE="Recover the package from Package Smuggler.";
const PRE_HANDOFF_OBJECTIVE="Stop the package from falling into the wrong hands.";
const READY_BLOCKER="Scene 03A factual handoff and decision provenance are not committed yet.";

const CHOICES=Object.freeze([
  Object.freeze({choiceId:"stop_assassin",label:"STOP THE ASSASSIN",resolverBindingRef:"academy_kakashi.battle.stop_assassin",sourceAnchorRef:"AK_SA_019"}),
  Object.freeze({choiceId:"secure_package",label:"SECURE THE PACKAGE",resolverBindingRef:"academy_kakashi.battle.secure_package",sourceAnchorRef:"AK_SA_014"}),
  Object.freeze({choiceId:"secure_package_before_assassin",label:"SECURE THE PACKAGE BEFORE THE ASSASSIN",resolverBindingRef:"academy_kakashi.resolver.secure_package_before_assassin",sourceAnchorRef:"AK_SA_020"}),
  Object.freeze({choiceId:"defeat_assassin_then_secure",label:"DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE",resolverBindingRef:"academy_kakashi.battle.defeat_assassin_then_secure",sourceAnchorRef:"AK_SA_015"}),
  Object.freeze({choiceId:"go_after_original_target",label:"GO AFTER THE ORIGINAL TARGET",resolverBindingRef:"academy_kakashi.resolver.pursue_original_target",sourceAnchorRef:"AK_SA_021"})
]);

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function definition(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function performanceIndex(){try{const p=typeof globalThis.getStoryScenePerformance33900==="function"?globalThis.getStoryScenePerformance33900():null;return p&&Number.isInteger(Number(p.index))?Number(p.index):0;}catch(_error){return 0;}}
function factOf(row){return row&&(row.fact||row.data)||{};}
function exactChoiceShape(choices){
  if(!Array.isArray(choices)||choices.length!==CHOICES.length)return false;
  return CHOICES.every((spec,index)=>{
    const row=choices[index]||{};
    return String(row.choiceId||"")===spec.choiceId&&String(row.resolverBindingRef||"")===spec.resolverBindingRef;
  });
}
function readyState(rt=active()){
  if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==MAJOR_BEAT||String(rt.localContext&&rt.localContext.kakashiOriginalAction||"")!==OBSERVE_CHOICE)return{ready:false,reason:"scene03a_major_choice_not_active"};
  const occurrenceId=String(rt.localContext&&rt.localContext.kakashiObserveScene03AOccurrenceId||"");
  const choiceSetId=String(rt.localContext&&rt.localContext.kakashiObserveEscalationChoiceSetId||"");
  if(!occurrenceId||!choiceSetId)return{ready:false,reason:"scene03a_provenance_refs_missing"};
  const occurrence=A.findOccurrence(occurrenceId),fact=factOf(occurrence);
  if(!occurrence||fact.nextDecisionPointRef!==DECISION_POINT||fact.packageState&&fact.packageState.currentHolderClass!=="PACKAGE_SMUGGLER")return{ready:false,reason:"scene03a_factual_handoff_missing"};
  const snapshot=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{},set=snapshot.choiceSets&&snapshot.choiceSets[choiceSetId]||null;
  if(!set||set.decisionPointRef!==DECISION_POINT||String(set.contextStateRef||"")!==occurrenceId||set.status!=="unresolved"||!exactChoiceShape(set.choices))return{ready:false,reason:"scene03a_semantic_choice_set_missing"};
  return{ready:true,occurrenceId,choiceSetId};
}
function available35710(){const state=readyState();return state.ready?{available:true}:{available:false,knownBlocker:READY_BLOCKER};}

function objectiveForState(state={}){
  const sceneId=String(state.sceneId||""),beatId=String(state.beatId||""),action=String(state.action||"");
  const index=Number.isFinite(Number(state.cueIndex))?Number(state.cueIndex):0;
  const current=String(state.currentObjective||PRE_HANDOFF_OBJECTIVE);
  if(sceneId===SCENE_ID&&beatId===TRANSFER_BEAT&&action===OBSERVE_CHOICE&&index>=3)return POST_HANDOFF_OBJECTIVE;
  return current;
}
function desiredObjective(rt=active()){
  if(!rt)return null;
  const current=PRE_HANDOFF_OBJECTIVE;
  return objectiveForState({sceneId:rt.sceneId,beatId:rt.beatId,action:rt.localContext&&rt.localContext.kakashiOriginalAction,cueIndex:performanceIndex(),currentObjective:current});
}
function setObjectiveNodeText(node,text){
  if(!node||!text)return false;
  const label=node.querySelector&&node.querySelector("b");
  if(!label){node.textContent=text;return true;}
  let textNode=null;
  for(const child of Array.from(node.childNodes||[])){if(child&&child.nodeType===3){textNode=child;break;}}
  if(textNode)textNode.nodeValue=text;else if(typeof document!=="undefined")node.appendChild(document.createTextNode(text));
  return true;
}
function syncObjective35710(){
  if(typeof document==="undefined")return false;
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==TRANSFER_BEAT||String(rt.localContext&&rt.localContext.kakashiOriginalAction||"")!==OBSERVE_CHOICE)return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const node=layer.querySelector&&layer.querySelector(".sc-scene-board-33900__objective");if(!node)return false;
  return setObjectiveNodeText(node,desiredObjective(rt));
}

function installChoiceSurface35710(){
  const def=definition();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_scene03a_definition_missing"};
  const major=def.beatMap.get(MAJOR_BEAT);if(!major||!Array.isArray(major.choices))return{success:false,reason:"kakashi_scene03a_major_choice_missing"};
  const priorById=new Map(major.choices.map(row=>[String(row&&row.choiceId||""),row]));
  major.choices=CHOICES.map(spec=>{
    const prior=priorById.get(spec.choiceId)||{};
    return{
      ...prior,
      choiceId:spec.choiceId,
      label:spec.label,
      nextBeatId:MAJOR_BEAT,
      availability:available35710,
      knownBlocker:null,
      scene03AResolverBindingRef:spec.resolverBindingRef,
      scene03ASourceAnchorRef:spec.sourceAnchorRef
    };
  });
  return{success:true,choiceIds:major.choices.map(row=>row.choiceId)};
}

let hooksInstalled=false,hookAttempts=0;
function scheduleSync35710(){
  const run=()=>{syncObjective35710();try{const rt=active();if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===MAJOR_BEAT&&typeof globalThis.renderStoryScenePresentationLayer==="function")globalThis.renderStoryScenePresentationLayer();}catch(_error){}};
  if(typeof queueMicrotask==="function")queueMicrotask(run);else if(typeof setTimeout==="function")setTimeout(run,0);
}
function installHooks35710(){
  if(hooksInstalled)return true;
  const PRE_RENDER=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
  const PRE_BOARD=typeof globalThis.renderStorySceneBoard33900==="function"?globalThis.renderStorySceneBoard33900:null;
  const PRE_ADVANCE=typeof globalThis.advanceStoryScene==="function"?globalThis.advanceStoryScene:null;
  if(!PRE_RENDER||!PRE_ADVANCE)return false;
  globalThis.renderStoryScenePresentationLayer=function renderStoryScenePresentationLayer35710(){const result=PRE_RENDER.apply(this,arguments);if(typeof queueMicrotask==="function")queueMicrotask(syncObjective35710);else setTimeout(syncObjective35710,0);return result;};
  try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}
  if(PRE_BOARD){globalThis.renderStorySceneBoard33900=function renderStorySceneBoard35710(){const result=PRE_BOARD.apply(this,arguments);syncObjective35710();return result;};try{renderStorySceneBoard33900=globalThis.renderStorySceneBoard33900;}catch(_error){}}
  globalThis.advanceStoryScene=function advanceStoryScene35710(){const result=PRE_ADVANCE.apply(this,arguments);scheduleSync35710();return result;};
  try{advanceStoryScene=globalThis.advanceStoryScene;}catch(_error){}
  if(typeof document!=="undefined"&&typeof MutationObserver==="function"){
    const root=document.getElementById("story-scene-presentation-layer")||document.body;
    if(root){const observer=new MutationObserver(()=>syncObjective35710());observer.observe(root,{childList:true,subtree:true});}
  }
  hooksInstalled=true;syncObjective35710();return true;
}
function ensureHooks35710(){if(installHooks35710())return;if(typeof setTimeout==="function"&&hookAttempts++<80)setTimeout(ensureHooks35710,25);}

function diagnostics(){
  const def=definition(),major=def&&def.beatMap instanceof Map?def.beatMap.get(MAJOR_BEAT):null;
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_scene03a_choices_35710_2026_09_18",
    fiveChoicesReleased:!!major&&major.choices.length===5&&major.choices.every(row=>typeof row.availability==="function"),
    exactChoiceIds:!!major&&major.choices.map(row=>row.choiceId).join("|")===CHOICES.map(row=>row.choiceId).join("|"),
    exactLabels:!!major&&major.choices.map(row=>row.label).join("|")===CHOICES.map(row=>row.label).join("|"),
    exactBindings:!!major&&major.choices.every((row,index)=>row.scene03AResolverBindingRef===CHOICES[index].resolverBindingRef),
    packageObjectiveChangesAtHandoff:objectiveForState({sceneId:SCENE_ID,beatId:TRANSFER_BEAT,action:OBSERVE_CHOICE,cueIndex:2,currentObjective:PRE_HANDOFF_OBJECTIVE})===PRE_HANDOFF_OBJECTIVE&&objectiveForState({sceneId:SCENE_ID,beatId:TRANSFER_BEAT,action:OBSERVE_CHOICE,cueIndex:3,currentObjective:PRE_HANDOFF_OBJECTIVE})===POST_HANDOFF_OBJECTIVE,
    majorObjectiveUntouched:objectiveForState({sceneId:SCENE_ID,beatId:MAJOR_BEAT,action:OBSERVE_CHOICE,cueIndex:17,currentObjective:"Choose which problem Kakashi prioritizes."})==="Choose which problem Kakashi prioritizes.",
    noPakkunSurfaceInjection:!JSON.stringify(CHOICES).toLowerCase().includes("pakkun"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,patchId:PATCH_ID,postHandoffObjective:POST_HANDOFF_OBJECTIVE,browserGoldenClaimed:false};
}

const installed=installChoiceSurface35710();if(!installed||installed.success!==true)throw new Error(`kakashi_scene03a_choices_35710_install_failed:${installed&&installed.reason||"unknown"}`);
ensureHooks35710();
globalThis.runAcademyKakashiScene03AChoices35710Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_SCENE03A_CHOICES_35710=Object.freeze({
  patchId:PATCH_ID,installed,choiceIds:CHOICES.map(row=>row.choiceId),choiceSpecs:CHOICES,postHandoffObjective:POST_HANDOFF_OBJECTIVE,
  objectiveForState,readyState,browserGoldenClaimed:false
});
})();
