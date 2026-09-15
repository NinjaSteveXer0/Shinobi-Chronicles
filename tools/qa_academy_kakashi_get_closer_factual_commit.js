#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const path=require("path");
const assert=require("assert");

function load(rel){
  const abs=path.resolve(process.cwd(),rel);
  vm.runInThisContext(fs.readFileSync(abs,"utf8"),{filename:rel});
}
function choice(choiceId,nextBeatId){
  return{choiceId,label:choiceId,nextBeatId,availability:null,knownBlocker:null,consequenceRequests:[],contextPatch:null};
}
function freshDefinition(){
  const action={beatId:"kak_original_action",mode:"choice",environmentRef:{assetId:"qa_alley"},choices:[
    choice("observe","kak_original_transfer"),
    choice("get_closer","kak_original_transfer"),
    choice("attack","kak_original_transfer"),
    choice("attempt_pickpocket","kak_original_transfer")
  ]};
  const major={beatId:"kak_original_major_choice",mode:"choice",choices:[
    choice("fight_assassin","kak_original_major_choice"),
    choice("secure_package","kak_original_secured"),
    choice("defeat_assassin_then_recover","kak_original_major_choice"),
    choice("pursue_original_target","kak_original_pursue")
  ]};
  const transfer={beatId:"kak_original_transfer",mode:"narration",environmentRef:{assetId:"qa_sakura"},nextBeatId:"kak_original_major_choice"};
  const secured={beatId:"kak_original_secured",mode:"narration",onEnterConsequences:[{requestId:"legacy-secured"}],exitScene:true,nextBeatId:null};
  const pursue={beatId:"kak_original_pursue",mode:"narration",onEnterConsequences:[{requestId:"legacy-pursue"}],exitScene:true,nextBeatId:null};
  return{
    sceneId:"origin_academy_kakashi_anbu_retrieval",
    entryBeatId:"kak_original_action",
    beatMap:new Map([[action.beatId,action],[transfer.beatId,transfer],[major.beatId,major],[secured.beatId,secured],[pursue.beatId,pursue]]),
    onCompleteConsequences:[{requestId:"legacy-complete"}]
  };
}

let definition=freshDefinition();
let active={sceneId:definition.sceneId,instanceId:"qa-kakashi-get-closer-main",beatId:"kak_original_action",localContext:{},committedChoiceKeys:[]};
let saves=0;

globalThis.playerData={activityHistory:[]};
globalThis.activityHistory=globalThis.playerData.activityHistory;
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.ensurePlayerAcquisitionState=()=>({chronicleOriginVariantId:"academy_kakashi"});
globalThis.getStorySceneDefinition=sceneId=>sceneId===definition.sceneId?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.renderStoryScenePresentationLayer=()=>true;
globalThis.normalizeStorySceneBeat=(beat,index)=>({
  ...beat,
  authoredIndex:index,
  choices:Array.isArray(beat.choices)?beat.choices.map(row=>({
    ...row,
    consequenceRequests:Array.isArray(row.consequenceRequests)?row.consequenceRequests:[],
    contextPatch:row.contextPatch||null
  })):[],
  onEnterConsequences:Array.isArray(beat.onEnterConsequences)?beat.onEnterConsequences:[]
});

load("runtime/alpha-origin-scenes-32900-core.js");
load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-kakashi-final-origin-adapter-34100-core.js");
load("runtime/alpha-kakashi-final-authority-guard-34200.js");
load("runtime/alpha-story-factual-resolver-34600.js");
load("runtime/alpha-kakashi-factual-state-commit-34120.js");
load("runtime/alpha-kakashi-factual-bindings-34700.js");

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const GUARD=globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200;
const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
const STATE=globalThis.SC_ALPHA_KAKASHI_FACTUAL_STATE_34120;
const BINDINGS=globalThis.SC_ALPHA_KAKASHI_FACTUAL_BINDINGS_34700;

assert(A&&CORE&&KAK&&GUARD&&PROVIDER&&STATE&&BINDINGS,"#188 Kakashi factual route dependency missing");
assert.strictEqual(BINDINGS.factualCommitOwnerPresent,true,"34700 did not bind the canonical 34120 commit owner");
assert.strictEqual(STATE.diagnostics().pass,true,`34120 diagnostics failed: ${JSON.stringify(STATE.diagnostics().failed)}`);

function getOpeningChoice(id){
  const action=definition.beatMap.get("kak_original_action");
  return action.choices.find(row=>row.choiceId===id);
}
function resetRuntime(instanceId){
  globalThis.playerData={activityHistory:[]};
  globalThis.activityHistory=globalThis.playerData.activityHistory;
  definition=freshDefinition();
  active={sceneId:definition.sceneId,instanceId,beatId:"kak_original_action",localContext:{},committedChoiceKeys:[]};
  const guarded=GUARD.applyLegacyGuard();
  assert.strictEqual(guarded.success,true,"34200 guard reapply failed");
  const installed=STATE.installGetCloserStoryConsumer();
  assert.strictEqual(installed.success,true,`34120 consumer install failed: ${JSON.stringify(installed)}`);
  return installed;
}
function factualReceipts(){
  return Object.values((globalThis.playerData.storyFactualResolver34600||{}).receipts||{});
}
function assertGuardReleaseOnlyGetCloser(){
  assert.strictEqual(getOpeningChoice("get_closer").availability().available,true,"MOVE IN CLOSER guard not released");
  assert.strictEqual(getOpeningChoice("attack").availability().available,false,"ATTACK guard released prematurely");
  assert.strictEqual(getOpeningChoice("attempt_pickpocket").availability().available,false,"PICKPOCKET guard released prematurely");
  const state=GUARD.getGuardState();
  assert(state.releasedInitialChoiceIds.includes("get_closer"),"34200 did not record Get Closer proof release");
  assert(!state.releasedInitialChoiceIds.includes("attack"),"34200 recorded false Attack release");
  assert(!state.releasedInitialChoiceIds.includes("attempt_pickpocket"),"34200 recorded false Pickpocket release");
}
function assertSuccessorMenus(){
  const success=definition.beatMap.get("kak_get_closer_success");
  const failure=definition.beatMap.get("kak_get_closer_failure");
  assert(success&&failure,"Get Closer factual continuation beats missing");
  assert.strictEqual(success.choices.map(row=>row.label).join("|"),"LET THEM MAKE THE HANDOFF|STRIKE BEFORE THE HANDOFF|SLIP IN FOR THE PACKAGE");
  assert.strictEqual(failure.choices.map(row=>row.label).join("|"),"STAY WITH THE PACKAGE|STOP THE MAN WHO SPOTTED YOU|CUT THEM OFF AT THE SAKURA TREE");
  for(const beat of [success,failure]){
    assert(beat.choices.every(row=>row.availability().available===false),"successor guard released before full route implementation");
  }
}

resetRuntime("qa-kakashi-get-closer-main");
assertGuardReleaseOnlyGetCloser();
assertSuccessorMenus();

const opening=getOpeningChoice("get_closer");
assert.strictEqual(opening.label,"MOVE IN CLOSER");
assert.strictEqual(opening.consequenceRequests.length,1);
assert.strictEqual(opening.consequenceRequests[0].requestId,"kakashi_get_closer_factual_commit_34120");

const full=opening.consequenceRequests[0].resolve();
assert.strictEqual(full.success,true,`full Get Closer chain failed: ${JSON.stringify(full)}`);
assert(["GET_CLOSER_SUCCESS","GET_CLOSER_FAILURE"].includes(full.selectedOutcomeRef),"unexpected Get Closer factual outcome");
assert.strictEqual(globalThis.playerData.activityHistory.length,1,"full route must commit one authoritative occurrence");
const occurrence=globalThis.playerData.activityHistory[0];
assert.strictEqual(occurrence.committed,true);
assert.strictEqual(occurrence.storySceneInstanceId,active.instanceId,"factual occurrence left the exact Story instance");
assert.strictEqual(occurrence.fact.storySceneInstanceId,active.instanceId,"fact payload lost Story instance identity");
assert.strictEqual(occurrence.fact.packageState.currentHolderClass,"ANBU_MARKED_TARGET","Get Closer fabricated a custody transfer");
assert.strictEqual(occurrence.fact.packageState.handoffCompleted,false,"Get Closer incorrectly completed handoff");
assert.strictEqual(occurrence.fact.participantStateByRole.masked_interceptor.visibilityState,"UNSEEN","MI leaked into Get Closer");
assert.strictEqual(full.nextBeatId,full.selectedOutcomeRef==="GET_CLOSER_SUCCESS"?"kak_get_closer_success":"kak_get_closer_failure");

const semantic=CORE.getStoryUnitSnapshot("academy_kakashi");
const decisionReceipt=Object.values(semantic.decisionReceipts||{}).find(row=>row.selectedChoiceId==="get_closer");
assert(decisionReceipt,"semantic Get Closer intent receipt missing");
assert.strictEqual(decisionReceipt.status,"resolved","semantic intent did not close after factual commit");
assert(decisionReceipt.intentCommitRef,"intent provenance missing");
assert(decisionReceipt.resolverResultRef,"34600 factual resolver result not bridged into 34000");

const factualBefore=factualReceipts();
assert.strictEqual(factualBefore.length,1,"full route should have one 34600 receipt");
assert.strictEqual(factualBefore[0].status,"resolved","34600 receipt did not wait for/receive authoritative commit");
assert.strictEqual(factualBefore[0].committedAtOccurrenceRef,occurrence.occurrenceId);
assert.deepStrictEqual(factualBefore[0].objectCustodyDeltaRefs,[],"Get Closer fabricated a custody delta");

const serialized=JSON.stringify(globalThis.playerData);
globalThis.playerData=JSON.parse(serialized);
globalThis.activityHistory=globalThis.playerData.activityHistory;
const replay=opening.consequenceRequests[0].resolve();
assert.strictEqual(replay.success,true,"save/load replay failed");
assert.strictEqual(replay.selectedOutcomeRef,full.selectedOutcomeRef,"save/load rerolled Get Closer outcome");
assert.strictEqual(globalThis.playerData.activityHistory.length,1,"save/load replay duplicated occurrence");
assert.strictEqual(factualReceipts().length,1,"save/load replay duplicated 34600 receipt");
assert.strictEqual(factualReceipts()[0].selectedOutcomeRef,full.selectedOutcomeRef,"34600 replay outcome drifted");

function forceOutcome(outcomeRef,instanceId,key){
  resetRuntime(instanceId);
  const occurrenceId=PROVIDER.stableRef("qa-get-closer-occurrence",{instanceId,outcomeRef});
  const result=PROVIDER.resolveStoryFactualAction({
    storyDecisionReceiptId:`qa-decision:${key}`,
    bindingRef:"academy_kakashi.resolver.get_closer",
    actorRef:"academy_kakashi",
    intentCommitRef:`qa-intent:${key}`,
    attemptOrdinal:1,
    idempotenceKey:`qa-idem:${key}`,
    eligibleOutcomeRefs:[outcomeRef],
    authorityVersionRefs:["qa-34120"],
    inputStateRefs:[`qa-state:${key}`],
    continuityLineageRef:instanceId,
    committedAtOccurrenceRef:occurrenceId,
    context:{storySceneInstanceId:instanceId,sceneId:definition.sceneId,beatId:"kak_original_action"}
  });
  assert.strictEqual(result.success,true,`forced ${outcomeRef} commit failed: ${JSON.stringify(result)}`);
  assert.strictEqual(globalThis.playerData.activityHistory.length,1);
  const row=globalThis.playerData.activityHistory[0];
  assert.strictEqual(row.occurrenceId,occurrenceId);
  assert.strictEqual(row.storySceneInstanceId,instanceId);
  assert.strictEqual(row.fact.selectedOutcomeRef,outcomeRef);
  assert.strictEqual(row.fact.packageState.currentHolderClass,"ANBU_MARKED_TARGET");
  assert.strictEqual(row.fact.participantStateByRole.masked_interceptor.visibilityState,"UNSEEN");
  return{result,row};
}

const success=forceOutcome("GET_CLOSER_SUCCESS","qa-get-closer-success","success");
assert.strictEqual(success.row.fact.participantStateByRole.academy_kakashi.detectionState,"UNDETECTED");
assert.strictEqual(success.row.fact.participantStateByRole.academy_kakashi.positionClass,"IMPROVED_CONCEALED_POSITION");
assert.strictEqual(success.row.fact.knowledgeStateByObserver.academy_kakashi.fullerContingencyKnowledge,true);
assert.strictEqual(success.row.fact.worldFacts.concealmentPreserved,true);
assert.strictEqual(success.result.receipt.knowledgeDeltaRefs.length,1,"Get Closer success Knowledge delta missing");

const failure=forceOutcome("GET_CLOSER_FAILURE","qa-get-closer-failure","failure");
assert.strictEqual(failure.row.fact.participantStateByRole.academy_kakashi.detectionState,"DETECTED");
assert.strictEqual(failure.row.fact.participantStateByRole.package_smuggler.positionClass,"REMAINS_AT_EXCHANGE");
assert.strictEqual(failure.row.fact.knowledgeStateByObserver.academy_kakashi.fullerContingencyKnowledge,false);
assert.strictEqual(failure.row.fact.worldFacts.handoffAborted,true);
assert.strictEqual(failure.result.receipt.knowledgeDeltaRefs.length,0,"Get Closer failure invented fuller Knowledge");

const loader=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-final-origin-adapter-34100.js"),"utf8");
assert(loader.includes("alpha-kakashi-factual-state-commit-34120.js"),"production loader missing 34120 factual commit owner");
assert(loader.indexOf("loadFactualState")<loader.indexOf("function loadFactualProvider")||loader.includes("loadFactualState();return;"),"34120 load seam missing");
assert(loader.includes('const BUILD="kakashi-final-20260916-11"'),"Kakashi child cache identity not advanced");

console.log(JSON.stringify({
  pass:true,
  fullRouteOutcome:full.selectedOutcomeRef,
  authoritativeOccurrenceOwner:"SC_ALPHA_ORIGIN_32900.commitOccurrence",
  persistentSaveOwner:"playerData/savePlayerData",
  successKnowledgeDeltaCount:success.result.receipt.knowledgeDeltaRefs.length,
  failureKnowledgeDeltaCount:failure.result.receipt.knowledgeDeltaRefs.length,
  exactStoryInstancePreserved:true,
  saveLoadNoReroll:true,
  onlyGetCloserGuardReleased:true,
  successorRoutesStillFailClosed:true,
  browserGoldenClaimed:false
},null,2));
