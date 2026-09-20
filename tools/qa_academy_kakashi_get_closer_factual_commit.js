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
const source34120=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-factual-state-commit-34120.js"),"utf8");
assert(source34120.includes('PATCH_ID="alpha_kakashi_factual_state_commit_34120_v4_2026_09_20"'));
assert(source34120.includes("Package Smuggler is coming toward the alley."),"Stay-on-Package branch performance missing");
assert(source34120.includes("This yours?"),"Pakkun interception performance missing");
assert(source34120.includes("For the first time since the ANBU operative handed him the assignment"),"pursuit-failure performance missing");
assert(source34120.includes("STAY_PACKAGE_CHASE_BEAT"),"pursuit outcome must route through authored chase projection");
assert.strictEqual(BINDINGS.diagnostics().pass,true,`34700 diagnostics failed: ${JSON.stringify(BINDINGS.diagnostics().failed)}`);
assert.strictEqual(typeof STATE.getCommitResult("academy_kakashi.resolver.stay_on_package_pursuit"),"function","stay-on-package pursuit has no authoritative 34120 commit owner");

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
  const observe=definition.beatMap.get("kak_get_closer_handoff_observe_escalation");
  const intercept=definition.beatMap.get("kak_get_closer_failure_stay_package_intercept");
  assert(success&&failure&&observe&&intercept,"Get Closer factual continuation beats missing");
  assert.strictEqual(success.choices.map(row=>row.label).join("|"),"LET THEM MAKE THE HANDOFF|STRIKE BEFORE THE HANDOFF|SLIP IN FOR THE PACKAGE");
  assert.strictEqual(failure.choices.map(row=>row.label).join("|"),"STAY WITH THE PACKAGE|STOP THE MAN WHO SPOTTED YOU|CUT THEM OFF AT THE SAKURA TREE");
  assert.strictEqual(observe.choices.map(row=>row.label).join("|"),"CUT HER OFF|GO FOR THE PACKAGE|BEAT HER TO THE PACKAGE|DEAL WITH HER FIRST, THEN CHASE THE PACKAGE|STAY ON THE FIRST MAN");
  assert.strictEqual(intercept.choices.map(row=>row.label).join("|"),"DEMAND THE PACKAGE|TAKE HIM DOWN|ASK WHERE THE PACKAGE WAS GOING");
  const handoff=success.choices.find(row=>row.choiceId==="let_handoff_happen");
  const stay=failure.choices.find(row=>row.choiceId==="stay_on_package");
  assert(handoff&&stay,"Get Closer released successor choice missing");
  assert.strictEqual(handoff.availability().available,true,"LET THEM MAKE THE HANDOFF should be released");
  assert.strictEqual(handoff.consequenceRequests.length,1,"handoff must have one authoritative consequence request");
  assert.strictEqual(handoff.consequenceRequests[0].requestId,"kakashi_get_closer_handoff_factual_commit_34120");
  assert.strictEqual(stay.availability().available,true,"STAY WITH THE PACKAGE should be released");
  assert.strictEqual(stay.consequenceRequests.length,1,"stay-on-package must have one authoritative pursuit request");
  assert.strictEqual(stay.consequenceRequests[0].requestId,"kakashi_get_closer_stay_package_pursuit_34120");
  assert(success.choices.filter(row=>row.choiceId!=="let_handoff_happen").every(row=>row.availability().available===false),"other Get Closer success routes released prematurely");
  assert(failure.choices.filter(row=>row.choiceId!=="stay_on_package").every(row=>row.availability().available===false),"other Get Closer failure routes released prematurely");
  assert(intercept.choices.every(row=>row.availability().available===false),"Pakkun-intercept downstream choice released before its implementation owner");
  assert(observe.choices.every(row=>row.availability().available===false),"Observe escalation route released prematurely");
  assert.strictEqual(Object.prototype.hasOwnProperty.call(intercept,"environmentRef"),false,"missing alleyway_konoha_night repo path must not be replaced by an invented/substitute environment binding");
}
function bridge(factual){
  const receipt=factual.receipt||{};
  return{
    success:true,
    resolverResultRef:receipt.storyFactualResolverReceiptId||null,
    consequenceRefs:receipt.consequenceRefs||[],
    stateDeltaRefs:receipt.stateDeltaRefs||[],
    knowledgeDeltaRefs:receipt.knowledgeDeltaRefs||[],
    relationshipHistoryRefs:receipt.relationshipHistoryRefs||[],
    objectiveDeltaRefs:receipt.objectiveDeltaRefs||[],
    successorSituationRef:receipt.successorSituationRef||null,
    result:factual.result||receipt.result||null
  };
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

function primeSemanticGetCloser(instanceId,outcomeRef,decisionPointRef,beatId,key){
  resetRuntime(instanceId);
  const contextStateRef=PROVIDER.stableRef("sc34120-kakashi-get-closer-entry",{sceneId:definition.sceneId,storySceneInstanceId:instanceId,beatId:"kak_original_action"});
  const opened=KAK.openDecisionPoint("AK_SA_001",{committedStateRef:contextStateRef,beatRef:"kak_original_action",sourceOccurrenceRefs:[]});
  assert.strictEqual(opened.success,true,"failed to open semantic Get Closer choice set");
  const intent=CORE.commitStoryIntent({storyUnitRef:"academy_kakashi",choiceSetId:opened.choiceSet.choiceSetId,choiceId:"get_closer"});
  assert.strictEqual(intent.success,true,"failed to commit semantic Get Closer intent");
  const occurrenceId=PROVIDER.stableRef("occ_origin_kakashi_get_closer",{storySceneInstanceId:instanceId,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId});
  const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef:"academy_kakashi.resolver.get_closer",actorRef:"academy_kakashi",intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:`qa-prime-${key}:${instanceId}`,eligibleOutcomeRefs:[outcomeRef],authorityVersionRefs:["qa-34120-successor"],inputStateRefs:[contextStateRef],continuityLineageRef:instanceId,committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:instanceId,sceneId:definition.sceneId,beatId:"kak_original_action"}});
  assert.strictEqual(factual.success,true,`failed to force semantic ${outcomeRef}`);
  const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:"academy_kakashi",receiptId:intent.receipt.storyDecisionReceiptId,state:{resolverResults:{"academy_kakashi.resolver.get_closer":bridge(factual)}},context:{sceneRef:definition.sceneId,originId:"academy_kakashi",storySceneInstanceId:instanceId}});
  assert.strictEqual(dispatched.success,true,`failed to dispatch semantic ${outcomeRef}`);
  const successor=KAK.openDecisionPoint(decisionPointRef,{committedStateRef:occurrenceId,beatRef:beatId,sourceOccurrenceRefs:[occurrenceId]});
  assert.strictEqual(successor.success,true,`failed to open ${decisionPointRef} successor choice set`);
  active.beatId=beatId;
  active.localContext={...(active.localContext||{}),kakashiGetCloserOutcomeRef:outcomeRef,kakashiGetCloserOccurrenceId:occurrenceId,kakashiGetCloserSuccessorDecisionPointRef:decisionPointRef,kakashiGetCloserSuccessorChoiceSetId:successor.choiceSet.choiceSetId};
  return{occurrenceId,intent,factual,successor};
}
function primeSemanticGetCloserSuccess(instanceId){return primeSemanticGetCloser(instanceId,"GET_CLOSER_SUCCESS","AK_SA_005","kak_get_closer_success","success");}
function primeSemanticGetCloserFailure(instanceId){return primeSemanticGetCloser(instanceId,"GET_CLOSER_FAILURE","AK_SA_006","kak_get_closer_failure","failure");}

function assertStayPackageCommittedOutcome(outcomeRef,instanceId,key){
  const primed=primeSemanticGetCloserFailure(instanceId);
  const pursuitIntent=CORE.commitStoryIntent({storyUnitRef:"academy_kakashi",choiceSetId:primed.successor.choiceSet.choiceSetId,choiceId:"stay_on_package"});
  assert.strictEqual(pursuitIntent.success,true,"failed to commit stay-on-package semantic intent");
  const reached=outcomeRef==="PURSUIT_SUCCESS_AMT_REACHED";
  const factualId=`qa-stay-package-factual:${key}`;
  const occurrenceId=PROVIDER.stableRef("qa-stay-package-occurrence",{instanceId,outcomeRef});
  const resultPayload=reached?{outcomeClass:outcomeRef,amtReached:true,pakkunPresent:true}:{outcomeClass:outcomeRef,amtReached:false,amtEscapesWithPackage:true,pakkunPresent:false};
  const committed=STATE.commitStayOnPackagePursuit({receipt:{selectedOutcomeRef:outcomeRef,storyDecisionReceiptId:pursuitIntent.receipt.storyDecisionReceiptId,storyFactualResolverReceiptId:factualId,successorSituationRef:reached?"academy_kakashi.pakkun_intercept":"academy_kakashi.debrief"},request:{committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:instanceId,parentOccurrenceRef:primed.occurrenceId}},result:resultPayload});
  assert.strictEqual(committed.success,true,`stay-on-package ${outcomeRef} factual commit failed: ${JSON.stringify(committed)}`);
  assert.deepStrictEqual(committed.objectCustodyDeltaRefs,[],"pursuit must not invent a package custody transfer");
  const row=A.findOccurrence(occurrenceId);assert(row,"stay-on-package authoritative occurrence missing");
  assert.strictEqual(row.fact.packageState.currentHolderClass,"ANBU_MARKED_TARGET","pursuit changed package holder without authority");
  assert.strictEqual(row.fact.worldFacts.packageRecovered,false,"pursuit incorrectly marked package recovered");
  assert.strictEqual(row.fact.worldFacts.maskedInterceptorVisible,false,"MI leaked into Get Closer FAILURE pursuit");
  assert.strictEqual(row.fact.worldFacts.pakkunPresent,reached,"Pakkun presence did not follow legitimate reach predicate");
  assert.strictEqual(row.fact.participantStateByRef.pakkun_origin_unfamiliar_ninken.presenceState,reached?"PRESENT":"NOT_PRESENT");
  assert.strictEqual(row.fact.participantStateByRef.academy_kakashi_origin_amt.reachState,reached?"REACHED":"ESCAPED");
  assert(committed.materialState&&committed.materialState.resolved===true,"pursuit package material state not resolved");
  assert.strictEqual(committed.materialState.value.custodyClass,"ANBU_MARKED_TARGET");
  return{primed,pursuitIntent,committed,row};
}

const pursuitSuccess=assertStayPackageCommittedOutcome("PURSUIT_SUCCESS_AMT_REACHED","qa-stay-package-success","success");
const pursuitFailure=assertStayPackageCommittedOutcome("PURSUIT_FAILURE_AMT_ESCAPES_WITH_PACKAGE","qa-stay-package-failure","failure");
assert.strictEqual(pursuitSuccess.row.fact.nextAnchorRef,"AK_SA_008","successful pursuit must reach Pakkun interception authority");
assert.strictEqual(pursuitFailure.row.fact.nextSituationRef,"academy_kakashi.debrief","failed pursuit must return to debrief");

const routed=primeSemanticGetCloserFailure("qa-stay-package-route");
assertSuccessorMenus();
const failureBeat=definition.beatMap.get("kak_get_closer_failure");
const stayChoice=failureBeat.choices.find(row=>row.choiceId==="stay_on_package");
const routedResult=stayChoice.consequenceRequests[0].resolve();
assert.strictEqual(routedResult.success,true,`stay-on-package end-to-end route failed: ${JSON.stringify(routedResult)}`);
assert(["PURSUIT_SUCCESS_AMT_REACHED","PURSUIT_FAILURE_AMT_ESCAPES_WITH_PACKAGE"].includes(routedResult.selectedOutcomeRef),"stay-on-package resolver returned unauthorised outcome");
assert.strictEqual(routedResult.packageHolderClass,"ANBU_MARKED_TARGET");
assert(active.localContext.kakashiGetCloserStayPackagePursuitOccurrenceId,"route did not persist pursuit occurrence ref");
assert.strictEqual(active.localContext.kakashiGetCloserStayPackagePursuitOutcomeRef,routedResult.selectedOutcomeRef);
const routedOccurrence=A.findOccurrence(routedResult.occurrenceId);assert(routedOccurrence,"routed pursuit occurrence missing");
assert.strictEqual(routedOccurrence.fact.packageState.currentHolderClass,"ANBU_MARKED_TARGET");
assert.strictEqual(routedOccurrence.fact.worldFacts.maskedInterceptorVisible,false);
if(routedResult.selectedOutcomeRef==="PURSUIT_SUCCESS_AMT_REACHED"){
  assert.strictEqual(routedResult.nextBeatId,"kak_get_closer_failure_stay_package_chase_34120","successful pursuit must project the authored chase before interception");
  assert.strictEqual(routedResult.pakkunPresent,true);
  assert(active.localContext.kakashiGetCloserStayPackageInterceptionChoiceSetId,"successful pursuit did not open AK_SA_008 choice set");
}else{
  assert.strictEqual(routedResult.nextBeatId,"kak_get_closer_failure_stay_package_chase_34120","failed pursuit must project its authored chase/failure before terminal");
  assert.strictEqual(routedResult.pakkunPresent,false);
  assert.strictEqual(active.localContext.kakashiGetCloserStayPackageInterceptionChoiceSetId,null);
}
const routedReceipt=factualReceipts().find(row=>row.bindingRef==="academy_kakashi.resolver.stay_on_package_pursuit");
assert(routedReceipt&&routedReceipt.status==="resolved","stay-on-package 34600 receipt did not resolve through 34120 owner");
assert.deepStrictEqual(routedReceipt.objectCustodyDeltaRefs,[],"routed pursuit invented custody delta");
const routedDecision=Object.values(CORE.getStoryUnitSnapshot("academy_kakashi").decisionReceipts||{}).find(row=>row.selectedChoiceId==="stay_on_package");
assert(routedDecision&&routedDecision.status==="resolved","stay-on-package semantic intent did not close through 34000");

const primed=primeSemanticGetCloserSuccess("qa-get-closer-handoff-main");
assertSuccessorMenus();
const successBeat=definition.beatMap.get("kak_get_closer_success");
const handoffChoice=successBeat.choices.find(row=>row.choiceId==="let_handoff_happen");
const handoff=handoffChoice.consequenceRequests[0].resolve();
assert.strictEqual(handoff.success,true,`Get Closer handoff chain failed: ${JSON.stringify(handoff)}`);
assert.strictEqual(handoff.selectedOutcomeRef,"GET_CLOSER_SUCCESS_HANDOFF_COMPLETED");
assert.strictEqual(handoff.parentOccurrenceId,primed.occurrenceId,"handoff lost parent occurrence provenance");
assert.strictEqual(handoff.nextBeatId,"kak_get_closer_handoff_observe_escalation");
assert.strictEqual(globalThis.playerData.activityHistory.length,2,"handoff route must add exactly one authoritative occurrence");
const handoffOccurrence=globalThis.playerData.activityHistory.find(row=>row.occurrenceId===handoff.occurrenceId);
assert(handoffOccurrence,"handoff authoritative occurrence missing");
assert.strictEqual(handoffOccurrence.storySceneInstanceId,active.instanceId,"handoff left exact Story instance");
assert.strictEqual(handoffOccurrence.fact.parentOccurrenceRef,primed.occurrenceId,"handoff fact lost parent occurrence");
assert.strictEqual(handoffOccurrence.fact.packageState.previousHolderClass,"ANBU_MARKED_TARGET");
assert.strictEqual(handoffOccurrence.fact.packageState.currentHolderClass,"PACKAGE_SMUGGLER");
assert.strictEqual(handoffOccurrence.fact.packageState.handoffCompleted,true);
assert.strictEqual(handoffOccurrence.fact.participantStateByRole.academy_kakashi.detectionState,"UNDETECTED");
assert.strictEqual(handoffOccurrence.fact.knowledgeStateByObserver.academy_kakashi.fullerContingencyKnowledge,true,"handoff lost fuller Get Closer Knowledge");
assert.strictEqual(handoffOccurrence.fact.knowledgeStateByObserver.academy_kakashi.maskedInterceptorVisible,true,"MI did not become visible after completed transfer");
assert.strictEqual(handoffOccurrence.fact.participantStateByRole.masked_interceptor.visibilityState,"VISIBLE_AFTER_COMPLETED_TRANSFER");
assert.strictEqual(handoffOccurrence.fact.worldFacts.observeEscalationActive,true);

const handoffSemantic=CORE.getStoryUnitSnapshot("academy_kakashi");
const handoffDecision=Object.values(handoffSemantic.decisionReceipts||{}).find(row=>row.selectedChoiceId==="let_handoff_happen");
assert(handoffDecision,"semantic handoff intent receipt missing");
assert.strictEqual(handoffDecision.status,"resolved","semantic handoff intent did not close after factual commit");
assert.strictEqual(handoffDecision.resolverBindingRef,"academy_kakashi.story_fixed.let_handoff_happen");
assert(handoffDecision.intentCommitRef,"handoff intent provenance missing");
assert(handoffDecision.resolverResultRef,"handoff factual result not bridged into 34000");

const handoffReceipts=factualReceipts();
assert.strictEqual(handoffReceipts.length,2,"Get Closer success + handoff should have exactly two 34600 receipts");
const handoffFactual=handoffReceipts.find(row=>row.bindingRef==="academy_kakashi.story_fixed.let_handoff_happen");
assert(handoffFactual,"handoff 34600 receipt missing");
assert.strictEqual(handoffFactual.status,"resolved");
assert.strictEqual(handoffFactual.resolutionMode,"deterministic_single");
assert.strictEqual(handoffFactual.selectedOutcomeRef,"GET_CLOSER_SUCCESS_HANDOFF_COMPLETED");
assert.strictEqual(handoffFactual.objectCustodyDeltaRefs.length,1,"handoff custody transfer delta missing");
assert.strictEqual(handoffFactual.participantStateDeltaRefs.length,1,"handoff participant-state delta missing");
assert.strictEqual(handoffFactual.knowledgeDeltaRefs.length,1,"handoff MI visibility Knowledge delta missing");

const handoffSerialized=JSON.stringify(globalThis.playerData);
globalThis.playerData=JSON.parse(handoffSerialized);
globalThis.activityHistory=globalThis.playerData.activityHistory;
const handoffReplay=handoffChoice.consequenceRequests[0].resolve();
assert.strictEqual(handoffReplay.success,true,"handoff save/load replay failed");
assert.strictEqual(handoffReplay.occurrenceId,handoff.occurrenceId,"handoff replay changed occurrence");
assert.strictEqual(globalThis.playerData.activityHistory.length,2,"handoff replay duplicated occurrence");
assert.strictEqual(factualReceipts().length,2,"handoff replay duplicated 34600 receipt");
const replayHandoffReceipt=factualReceipts().find(row=>row.bindingRef==="academy_kakashi.story_fixed.let_handoff_happen");
assert.strictEqual(replayHandoffReceipt.selectedOutcomeRef,"GET_CLOSER_SUCCESS_HANDOFF_COMPLETED","handoff replay outcome drifted");

const loader=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-final-origin-adapter-34100.js"),"utf8");
assert(loader.includes("alpha-kakashi-factual-state-commit-34120.js"),"production loader missing 34120 factual commit owner");
assert(loader.indexOf("loadFactualState")<loader.indexOf("function loadFactualProvider")||loader.includes("loadFactualState();return;"),"34120 load seam missing");
assert(loader.includes('const BUILD="kakashi-final-20260917-18"'),"Kakashi child cache identity not advanced");

console.log(JSON.stringify({
  pass:true,
  patch:"34120-v4",
  fullRouteOutcome:full.selectedOutcomeRef,
  authoritativeOccurrenceOwner:"SC_ALPHA_ORIGIN_32900.commitOccurrence",
  persistentSaveOwner:"playerData/savePlayerData",
  successKnowledgeDeltaCount:success.result.receipt.knowledgeDeltaRefs.length,
  failureKnowledgeDeltaCount:failure.result.receipt.knowledgeDeltaRefs.length,
  stayPackagePursuitCommitOwner:true,
  stayPackageSuccessPackageHolder:pursuitSuccess.row.fact.packageState.currentHolderClass,
  stayPackageFailurePackageHolder:pursuitFailure.row.fact.packageState.currentHolderClass,
  stayPackageSuccessPakkun:true,
  stayPackageFailurePakkun:false,
  stayPackageNoCustodyTransfer:true,
  stayPackageMaskedInterceptorUnseen:true,
  stayPackageRouteOutcome:routedResult.selectedOutcomeRef,
  stayPackageSemanticIntentResolved:true,
  interceptionDownstreamChoicesGuardedAt34120Load:true,
  stayPackagePerformanceProjected:true,
  interceptionAssetPathBoundBySceneBoard:true,
  handoffOutcome:handoff.selectedOutcomeRef,
  handoffCustodyDeltaCount:handoffFactual.objectCustodyDeltaRefs.length,
  exactStoryInstancePreserved:true,
  saveLoadNoReroll:true,
  onlyGetCloserOpeningGuardReleased:true,
  handoffSuccessorReleased:true,
  stayPackageFailureSuccessorReleased:true,
  remainingGetCloserSuccessorsFailClosed:true,
  observeEscalationStillFailClosed:true,
  browserGoldenClaimed:false
},null,2));