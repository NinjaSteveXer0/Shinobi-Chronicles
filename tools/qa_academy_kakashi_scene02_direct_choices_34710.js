#!/usr/bin/env node
"use strict";

const fs=require("fs"),vm=require("vm"),path=require("path"),assert=require("assert");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}
function choice(choiceId,label,nextBeatId){return{choiceId,label,nextBeatId,availability:null,knownBlocker:null,consequenceRequests:[],contextPatch:null};}
function freshDefinition(){
  const action={beatId:"kak_original_action",mode:"choice",environmentRef:{assetId:"qa_alley"},choices:[
    choice("observe","WATCH THE EXCHANGE","kak_original_transfer"),choice("get_closer","MOVE IN CLOSER","kak_original_transfer"),choice("attack","STRIKE BEFORE THE HANDOFF","kak_original_transfer"),choice("attempt_pickpocket","SLIP IN FOR THE PACKAGE","kak_original_transfer")
  ]};
  const transfer={beatId:"kak_original_transfer",mode:"narration",nextBeatId:"kak_original_major_choice",onEnterConsequences:[]};
  const major={beatId:"kak_original_major_choice",mode:"choice",choices:[choice("fight_assassin","STOP THE ASSASSIN","kak_original_major_choice"),choice("secure_package","SECURE THE PACKAGE","kak_original_secured"),choice("defeat_assassin_then_recover","DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE","kak_original_major_choice"),choice("pursue_original_target","GO AFTER THE ORIGINAL TARGET","kak_original_pursue")]};
  const secured={beatId:"kak_original_secured",mode:"narration",exitScene:true,onEnterConsequences:[]};
  const pursue={beatId:"kak_original_pursue",mode:"narration",exitScene:true,onEnterConsequences:[]};
  return{sceneId:"origin_academy_kakashi_anbu_retrieval",entryBeatId:"kak_original_action",beatMap:new Map([[action.beatId,action],[transfer.beatId,transfer],[major.beatId,major],[secured.beatId,secured],[pursue.beatId,pursue]]),onCompleteConsequences:[]};
}

let definition=freshDefinition();
let active={sceneId:definition.sceneId,instanceId:"qa-scene02-attack",beatId:"kak_original_action",localContext:{},committedChoiceKeys:[]};
let saves=0,renders=0,launched=null;
function resetRuntime(instanceId){
  globalThis.playerData={activityHistory:[]};globalThis.activityHistory=globalThis.playerData.activityHistory;
  active={sceneId:definition.sceneId,instanceId,beatId:"kak_original_action",localContext:{},committedChoiceKeys:[]};
  launched=null;
}
globalThis.playerData={activityHistory:[]};globalThis.activityHistory=globalThis.playerData.activityHistory;
globalThis.savePlayerData=()=>{saves++;return true;};
globalThis.ensurePlayerAcquisitionState=()=>({chronicleOriginVariantId:"academy_kakashi"});
globalThis.getStorySceneDefinition=id=>id===definition.sceneId?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.renderStoryScenePresentationLayer=()=>{renders++;return true;};
globalThis.normalizeStorySceneBeat=(beat,index)=>({...beat,authoredIndex:index,choices:Array.isArray(beat.choices)?beat.choices.map(row=>({...row,consequenceRequests:Array.isArray(row.consequenceRequests)?row.consequenceRequests:[],contextPatch:row.contextPatch||null})):[],onEnterConsequences:Array.isArray(beat.onEnterConsequences)?beat.onEnterConsequences:[]});
globalThis.launchAcademyKakashiOriginPlBattle=spec=>{launched={...spec};return{success:true,battleConfigId:spec.battleConfigId,returnToken:spec.returnToken};};
globalThis.projectAcademyKakashiOriginBattleResult=()=>null;

load("runtime/alpha-origin-scenes-32900-core.js");
load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-kakashi-final-origin-adapter-34100-core.js");
load("runtime/alpha-kakashi-final-authority-guard-34200.js");
load("runtime/alpha-story-factual-resolver-34600.js");
load("runtime/alpha-kakashi-factual-state-commit-34120.js");
load("runtime/alpha-kakashi-factual-bindings-34700.js");
load("runtime/alpha-kakashi-direct-opening-consumer-34710.js");

const MOD=globalThis.SC_ALPHA_KAKASHI_DIRECT_OPENING_34710,CORE=globalThis.SC_STORY_DECISION_REALISATION_34000,PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600,GUARD=globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200;
assert(MOD&&CORE&&PROVIDER&&GUARD,"Scene 02 direct-choice dependencies missing");
assert.strictEqual(MOD.diagnostics().pass,true,`34710 diagnostics failed: ${JSON.stringify(MOD.diagnostics().failed)}`);
const action=definition.beatMap.get("kak_original_action"),attack=action.choices.find(c=>c.choiceId==="attack"),pick=action.choices.find(c=>c.choiceId==="attempt_pickpocket");
assert.strictEqual(attack.availability().available,true,"STRIKE BEFORE THE HANDOFF still unavailable");
assert.strictEqual(pick.availability().available,true,"SLIP IN FOR THE PACKAGE still unavailable");
assert.notStrictEqual(attack.nextBeatId,"kak_original_transfer","Attack still targets legacy transfer");
assert.notStrictEqual(pick.nextBeatId,"kak_original_transfer","Pickpocket still targets legacy transfer");
assert(attack.consequenceRequests.some(r=>r.requestId===MOD.attackRequestId),"Attack proof request missing");
assert(pick.consequenceRequests.some(r=>r.requestId===MOD.pickpocketRequestId),"Pickpocket proof request missing");
const guard=GUARD.getGuardState();
assert(guard.releasedInitialChoiceIds.includes("attack")&&guard.releasedInitialChoiceIds.includes("attempt_pickpocket"),"34200 did not record both Scene 02 releases");
const major=definition.beatMap.get("kak_original_major_choice");
assert(major.choices.every(row=>typeof row.availability==="function"&&row.availability().available===false),"Scene 03A downstream choices were changed by 34710");

function semanticReceiptFor(choiceId){const snap=CORE.getStoryUnitSnapshot("academy_kakashi")||{};return Object.values(snap.decisionReceipts||{}).find(row=>row&&row.selectedChoiceId===choiceId)||null;}
function runRequest(choiceRow,requestId){const req=choiceRow.consequenceRequests.find(r=>r.requestId===requestId);assert(req,"route request missing");const out=req.resolve();assert.strictEqual(out.success,true,`${choiceRow.choiceId} consequence failed: ${JSON.stringify(out)}`);return out;}

resetRuntime("qa-scene02-attack");
const attackResult=runRequest(attack,MOD.attackRequestId);
assert(/^ATTACK_RETURN_/.test(attackResult.selectedOutcomeRef),`unexpected Attack outcome ${attackResult.selectedOutcomeRef}`);
assert.strictEqual(globalThis.playerData.activityHistory.length,1,"Attack did not commit exactly one Origin occurrence");
let fact=globalThis.playerData.activityHistory[0].fact||globalThis.playerData.activityHistory[0].data;
assert.strictEqual(fact.factClass,"academy_kakashi_direct_attack_factual_state");
assert.strictEqual(fact.knowledgeStateByObserver.academy_kakashi.maskedInterceptorVisible,false,"Direct Attack invented Masked Interceptor visibility");
assert.strictEqual(semanticReceiptFor("attack").status,"resolved","Attack semantic intent did not resolve");
const attackReplay=runRequest(attack,MOD.attackRequestId);
assert.strictEqual(attackReplay.selectedOutcomeRef,attackResult.selectedOutcomeRef,"Attack replay rerolled factual outcome");
assert.strictEqual(globalThis.playerData.activityHistory.length,1,"Attack replay duplicated Origin occurrence");
assert.notStrictEqual(attack.nextBeatId,"kak_original_transfer","Attack consequence restored legacy transfer");

resetRuntime("qa-scene02-pickpocket");
const pickResult=runRequest(pick,MOD.pickpocketRequestId);
assert(["PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION","PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1"].includes(pickResult.selectedOutcomeRef),`unexpected Pickpocket outcome ${pickResult.selectedOutcomeRef}`);
assert.strictEqual(globalThis.playerData.activityHistory.length,1,"Pickpocket did not commit exactly one Origin occurrence");
fact=globalThis.playerData.activityHistory[0].fact||globalThis.playerData.activityHistory[0].data;
assert.strictEqual(fact.factClass,"academy_kakashi_direct_pickpocket_factual_state");
assert.strictEqual(semanticReceiptFor("attempt_pickpocket").status,"resolved","Pickpocket semantic intent did not resolve");
if(pickResult.selectedOutcomeRef==="PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION"){
  assert.strictEqual(fact.packageState.currentHolderClass,"KAKASHI");assert.strictEqual(fact.worldFacts.maskedInterceptorVisible,false);assert.strictEqual(pick.nextBeatId,MOD.pickpocketSuccessBoundaryBeatId);
}else{
  assert.strictEqual(fact.worldFacts.maskedInterceptorVisible,true);assert.strictEqual(fact.worldFacts.battleConfigId,MOD.pickpocketBattleConfigId);assert.strictEqual(pick.nextBeatId,MOD.pickpocketBattleBeatId);
}
const pickReplay=runRequest(pick,MOD.pickpocketRequestId);
assert.strictEqual(pickReplay.selectedOutcomeRef,pickResult.selectedOutcomeRef,"Pickpocket replay rerolled factual outcome");
assert.strictEqual(globalThis.playerData.activityHistory.length,1,"Pickpocket replay duplicated Origin occurrence");
assert.notStrictEqual(pick.nextBeatId,"kak_original_transfer","Pickpocket consequence restored legacy transfer");

function forcePick(outcomeRef,key){
  resetRuntime(`qa-force-${key}`);
  const occurrenceId=PROVIDER.stableRef("qa-direct-pick",{key,outcomeRef});
  const out=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:`qa-decision-${key}`,bindingRef:"academy_kakashi.resolver.pickpocket_direct",actorRef:"academy_kakashi",intentCommitRef:`qa-intent-${key}`,attemptOrdinal:1,idempotenceKey:`qa-idem-${key}`,eligibleOutcomeRefs:[outcomeRef],authorityVersionRefs:["qa-34710"],inputStateRefs:[`qa-state-${key}`],continuityLineageRef:active.instanceId,committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:active.instanceId,sceneId:definition.sceneId,beatId:"kak_original_action"}});
  assert.strictEqual(out.success,true,`forced Pickpocket ${outcomeRef} failed: ${JSON.stringify(out)}`);return{out,fact:(globalThis.playerData.activityHistory[0].fact||globalThis.playerData.activityHistory[0].data)};
}
const forcedSuccess=forcePick("PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION","success");
assert.strictEqual(forcedSuccess.fact.packageState.currentHolderClass,"KAKASHI");
assert.strictEqual(forcedSuccess.fact.worldFacts.cleanExtractionSucceeded,true);
assert.strictEqual(forcedSuccess.fact.worldFacts.maskedInterceptorVisible,false);
assert.strictEqual(forcedSuccess.fact.worldFacts.pakkunPresent,false);
const forcedFailure=forcePick("PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1","failure");
assert.strictEqual(forcedFailure.fact.worldFacts.cleanExtractionSucceeded,false);
assert.strictEqual(forcedFailure.fact.worldFacts.maskedInterceptorVisible,true);
assert.strictEqual(forcedFailure.fact.worldFacts.pakkunPresent,false);
assert.strictEqual(forcedFailure.fact.worldFacts.battleConfigId,"academy_kakashi_origin_battle_amt_ps_mi_3v1");
active.localContext={kakashiDirectOpeningOutcomeRef:"PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1"};
const battleBeat=definition.beatMap.get(MOD.pickpocketBattleBeatId);assert(battleBeat&&battleBeat.mode==="battle_transition","direct Pickpocket 3-v-1 Battle beat missing");
const launch=battleBeat.battle.launchResolver({active,returnContext:{type:"story_scene",sceneId:definition.sceneId}});
assert.strictEqual(launch.success,true,"direct Pickpocket 3-v-1 launch failed");
assert(launched,"direct Pickpocket launch did not reach 34300 seam");
assert.strictEqual(launched.battleConfigId,"academy_kakashi_origin_battle_amt_ps_mi_3v1");
assert.strictEqual(launched.sourceAnchorRef,"AK_SA_028");
assert.strictEqual(launched.bindingRef,"academy_kakashi.resolver.pickpocket_direct");
assert.strictEqual(launched.pakkunAuthorized,false);

assert(saves>0,"Scene 02 routes never persisted state");
console.log("Academy Kakashi Scene 02 direct choices 34710 QA: PASS");
console.log("- STRIKE BEFORE THE HANDOFF: selectable, semantic + factual route committed, no legacy transfer");
console.log("- SLIP IN FOR THE PACKAGE: selectable, success/failure factual routes committed, no legacy transfer");
console.log("- direct Pickpocket failure exact Battle: Kakashi vs AMT + Package Smuggler + Masked Interceptor (3-v-1)");
console.log("- Scene 03A downstream choices remain untouched/fail-closed");
