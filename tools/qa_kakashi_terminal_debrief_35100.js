#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const core=read("runtime/alpha-story-decision-realisation-34000.js");
const rewards=read("runtime/alpha-kakashi-origin-rewards-34800.js");
const terminal=read("runtime/alpha-kakashi-terminal-debrief-35100.js");
const loader=read("runtime/alpha-kakashi-final-origin-adapter-34100.js");

const context={console,setTimeout,clearTimeout,Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,Infinity,NaN};
context.globalThis=context;context.window=context;
vm.createContext(context);
const run=(src,file)=>vm.runInContext(src,context,{filename:file});
const plain=(expr,file="qa35100-expression.js")=>JSON.parse(JSON.stringify(run(`(()=>(${expr}))()`,file)));
const truth=expr=>run(`!!(${expr})`);

run(`
var playerData={};
var activityHistory=[];
var __qaRuntime=null;
var __qaScene=null;
var __qaCompletionCalls=[];
var __qaProgression={};
function cloneProgressionData(v){return v===undefined?undefined:JSON.parse(JSON.stringify(v));}
function savePlayerData(){activityHistory=playerData.activityHistory||[];return true;}
function saveTestState(){return savePlayerData();}
function normalizeStorySceneBeat(def){return def;}
function getActiveStorySceneRuntime(){return __qaRuntime;}
function getStorySceneDefinition(sceneId){return __qaScene&&__qaScene.sceneId===sceneId?__qaScene:null;}
function getItemDefinition(id){if(id==="field_recovery_pill")return{id,name:"Field Recovery Pill"};if(id==="academy_training_tanto")return{id,name:"Academy Training Tanto"};return null;}
function addItemToInventory(item){playerData.inventory=Array.isArray(playerData.inventory)?playerData.inventory:[];playerData.inventory.push(JSON.parse(JSON.stringify(item)));return true;}
function addDisciplineExp(subjectId,disciplineId,amount){const k=subjectId+"::"+disciplineId;__qaProgression[k]=Number(__qaProgression[k]||0)+Number(amount||0);return true;}
function getCharacterDisciplineProgression(subjectId,disciplineId){const k=subjectId+"::"+disciplineId;return{characterId:subjectId,disciplineId,exp:Number(__qaProgression[k]||0)};}
function completeChronicleOriginPrologue(originId,evidenceIds){__qaCompletionCalls.push({originId,evidenceIds:[...(evidenceIds||[])]});return{success:true,originId,evidenceIds:[...(evidenceIds||[])]};}
function resetDataQA(instanceId){
  playerData={activityHistory:[],inventory:[],ryo:0};activityHistory=playerData.activityHistory;__qaProgression={};__qaCompletionCalls=[];
  __qaRuntime={sceneId:"origin_academy_kakashi_anbu_retrieval",instanceId,beatId:"kak_seq_debrief_pending",localContext:{},battleResume:null};
}
function resetQA(instanceId){
  resetDataQA(instanceId);
  const beat=id=>({beatId:id,mode:"narration",text:id,onEnterConsequences:[]});
  __qaScene={sceneId:"origin_academy_kakashi_anbu_retrieval",beatMap:new Map(),onCompleteConsequences:[]};
  ["kak_seq_debrief_pending","kak_observe_secure_package_return","kak_observe_secure_package_amt_return","kak_seq_mi_return","kak_seq_ps_return","kak_seq_amt_return"].forEach(id=>__qaScene.beatMap.set(id,beat(id)));
  __qaScene.beatMap.set("kak_seq_amt_battle",{beatId:"kak_seq_amt_battle",mode:"narration",battle:{launchResolver:function(){return{success:true,battleId:"qa-seq-amt-launch"};}}});
}
function qaFindOccurrence(id){return (playerData.activityHistory||[]).find(row=>row&&row.occurrenceId===id&&row.sourceOccurrenceId===id)||null;}
function qaCommitOccurrence(originId,occurrenceId,fact,rowIds,options){
  let existing=qaFindOccurrence(occurrenceId);if(existing)return{success:true,occurrenceId,record:JSON.parse(JSON.stringify(existing)),idempotent:true};
  const record={type:options&&options.type||"origin_story_occurrence",activity:"story_scene",completed:true,committed:true,success:true,outcome:options&&options.outcome||"resolved",occurrenceId,sourceOccurrenceId:occurrenceId,actorVariantId:originId,protagonistParticipantId:originId,participantRefs:[...new Set([originId,...(options&&options.participantRefs||[])])],sceneId:__qaRuntime.sceneId,storySceneInstanceId:__qaRuntime.instanceId,fact:JSON.parse(JSON.stringify(fact||{})),data:JSON.parse(JSON.stringify(fact||{})),sourceRefs:JSON.parse(JSON.stringify(options&&options.sourceRefs||[])),timestamp:Date.now()};
  playerData.activityHistory.push(record);activityHistory=playerData.activityHistory;savePlayerData();return{success:true,occurrenceId,record:JSON.parse(JSON.stringify(record)),idempotent:false};
}
globalThis.SC_ALPHA_ORIGIN_32900={findOccurrence:qaFindOccurrence,commitOccurrence:qaCommitOccurrence};
`,"qa35100-stubs.js");

run(core,"runtime/alpha-story-decision-realisation-34000.js");
run(`
globalThis.SC_ALPHA_KAKASHI_FINAL_34100={
  recordPostResolutionState:function(spec){const results=[];for(const row of spec&&spec.participantStates||[])results.push(SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",...row}));for(const row of spec&&spec.materialStates||[])results.push(SC_STORY_DECISION_REALISATION_34000.recordMaterialState({storyUnitRef:"academy_kakashi",...row}));return{success:results.every(row=>row&&row.success===true),results};},
  terminalGuard:function(state){return SC_STORY_DECISION_REALISATION_34000.terminalSemanticGuard({storyUnitRef:"academy_kakashi",state,requiredMaterialRefs:Array.isArray(state&&state.materiallyRelevantRefs)?state.materiallyRelevantRefs:[]});}
};
resetQA("qa-secure-35100");
`,"qa35100-kakashi-stub.js");
run(rewards,"runtime/alpha-kakashi-origin-rewards-34800.js");
run(terminal,"runtime/alpha-kakashi-terminal-debrief-35100.js");

assert(loader.includes('runtime/alpha-kakashi-origin-rewards-34800.js'),"34100 does not production-load 34800 rewards");
assert(loader.includes('runtime/alpha-kakashi-terminal-debrief-35100.js'),"34100 does not production-load 35100 terminal bridge");
assert(loader.includes('kakashi-final-20260917-15'),"Kakashi child cache generation did not advance for reward tranche");
assert.strictEqual(plain(`runAcademyKakashiOriginRewards34800Diagnostics()`).pass,true,"34800 diagnostics failed");
assert.strictEqual(plain(`runAcademyKakashiTerminalDebrief35100Diagnostics()`).pass,true,"35100 diagnostics failed");
assert.strictEqual(plain(`runAcademyKakashiTerminalDebrief35100Diagnostics()`).browserGoldenClaimed,false);

// Battle victory alone cannot manufacture package success or terminal rewards.
run(`__qaRuntime.battleResume={authored:{battleOccurrenceId:"battle-secure-1",battleConfigId:"academy_kakashi_origin_battle_ps_mi_2v1",storyOccurrenceId:__qaRuntime.instanceId,sourceAnchorRef:"AK_SA_014",bindingRef:"academy_kakashi.battle.secure_package",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:"academy_kakashi_origin_package_smuggler",side:"opposition",battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},{participantRef:"academy_kakashi_origin_masked_interceptor",side:"opposition",battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}],rewardGranted:false,lootGranted:false,participantDeathCommitted:false,participantCustodyCommitted:false}};`);
let captured=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.captureBattleResult("academy_kakashi_origin_battle_ps_mi_2v1")`);
assert.strictEqual(captured.success,true);
let facts=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.deriveTerminalFacts()`);
assert.strictEqual(facts.success,false,"Battle victory alone incorrectly enabled terminal facts");
assert.strictEqual(facts.reason,"kakashi_terminal_package_state_unresolved");
assert.strictEqual(Number(context.playerData&&context.playerData.ryo||0),0,"Battle victory granted Ryō before debrief");

// Exact AK_SA_025 package custody unlocks a factual secure-package debrief.
run(`
qaCommitOccurrence("academy_kakashi","occ-secure-package-qa",{factClass:"academy_kakashi_secure_package_2v1_post_battle_factual_state",storySceneInstanceId:__qaRuntime.instanceId,battleOccurrenceId:"battle-secure-1",battleConfigId:"academy_kakashi_origin_battle_ps_mi_2v1",battleResultState:"player_side_victory",packageState:{objectRef:"kakashi_origin_outer_route_packet",previousHolderClass:"PACKAGE_SMUGGLER",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",handoffCompleted:true},worldFacts:{packageCustody:"KAKASHI",participantCustodyCommitted:false,participantDeathCommitted:false}},[],{type:"origin_story_factual_occurrence",outcome:"secure_package"});
__qaRuntime.localContext.kakashiObserveSecurePackageOccurrenceId="occ-secure-package-qa";
__qaRuntime.localContext.kakashiObserveSecurePackagePostBattleOutcome="player_side_victory";
`);
facts=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.deriveTerminalFacts()`);
assert.strictEqual(facts.success,true);
assert.strictEqual(facts.packageRecovered,true);
assert.strictEqual(facts.materiallyParticipatedInPlBattle,true);
assert.strictEqual(facts.liveCustodyEstablished,false,"defeated-but-uncontrolled participant became custody reward");
assert.strictEqual(facts.verifiedActionableIntelligence,false,"unverified Knowledge became intelligence reward");
assert.strictEqual(facts.exceptionalFieldExecution,false,"ordinary secure-package 2v1 became exceptional bonus");
assert.strictEqual(facts.exceptionalTrainingTantoPredicate,false);

assert.strictEqual(plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.guardedOriginCompletion()`).success,false,"Origin completed before terminal receipts");
const debrief=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitTerminalDebrief()`);
assert.strictEqual(debrief.success,true,"terminal ANBU debrief did not commit");
assert.strictEqual(truth(`!!SC_ALPHA_ORIGIN_32900.findOccurrence("occ_origin_kakashi_terminal_debrief_35100::qa-secure-35100")`),true);
assert.strictEqual(Number(context.playerData.ryo||0),0,"debrief alone prematurely granted terminal Ryō");
const material=plain(`SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi").materialStates["kakashi_origin_outer_route_packet"]`);
assert.strictEqual(material.resolved,true,"package material state was not terminally committed");
assert.strictEqual(material.value.holderClass,"KAKASHI");

const rewardCommit=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitChronicleReceiptAndRewards()`);
assert.strictEqual(rewardCommit.success,true,"Chronicle Receipt + reward commit failed");
assert.strictEqual(Number(context.playerData.ryo||0),175,"secure-package terminal Ryō was not exact 100+75");
assert.strictEqual(context.playerData.inventory.filter(row=>row&&row.id==="field_recovery_pill").length,1,"PL-Battle pill entitlement not granted exactly once");
assert.strictEqual(context.playerData.inventory.filter(row=>row&&row.id==="academy_training_tanto").length,0,"ordinary secure-package route incorrectly granted Tantō");
assert.strictEqual(truth(`!!SC_ALPHA_ORIGIN_32900.findOccurrence("occ_origin_kakashi_chronicle_receipt_35100::qa-secure-35100")`),true);
assert.strictEqual(plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.closureReady()`),true);

const repeated=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitChronicleReceiptAndRewards()`);
assert.strictEqual(repeated.success,true);
assert.strictEqual(Number(context.playerData.ryo||0),175,"repeat terminal commit duplicated Ryō");
assert.strictEqual(context.playerData.inventory.filter(row=>row&&row.id==="field_recovery_pill").length,1,"repeat terminal commit duplicated pill");
const completed=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.guardedOriginCompletion()`);
assert.strictEqual(completed.success,true,"guarded Origin completion did not release after closure receipts");
assert.strictEqual(context.__qaCompletionCalls.length,1);
assert.strictEqual(context.__qaCompletionCalls[0].originId,"academy_kakashi");
assert(context.__qaCompletionCalls[0].evidenceIds.some(id=>String(id).includes("terminal_debrief_35100")));
assert(context.__qaCompletionCalls[0].evidenceIds.some(id=>String(id).includes("chronicle_receipt_35100")));

// Pakkun-bearing secure pursuit cannot seal the Receipt before explicit departure.
run(`resetDataQA("qa-pakkun-35100");
qaCommitOccurrence("academy_kakashi","occ-secure-package-pakkun",{factClass:"academy_kakashi_secure_package_amt_pursuit_factual_state",storySceneInstanceId:__qaRuntime.instanceId,packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI"},worldFacts:{packageCustody:"KAKASHI"}},[],{type:"origin_story_factual_occurrence",outcome:"secure_pursuit"});
__qaRuntime.localContext.kakashiObserveSecurePackageAmtPursuitOccurrenceId="occ-secure-package-pakkun";
__qaRuntime.localContext.kakashiObserveSecurePackageAmtPursuitOutcome="SECURE_PACKAGE_AMT_PURSUIT_SUCCESS_REACHED";
`);
const pakkunDebrief=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitTerminalDebrief()`);
assert.strictEqual(pakkunDebrief.success,true);
assert.strictEqual(pakkunDebrief.facts.pakkunPresentAtDebrief,true);
const prematureReceipt=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitChronicleReceiptAndRewards()`);
assert.strictEqual(prematureReceipt.success,false,"Pakkun route sealed Receipt without explicit departure");
assert.strictEqual(prematureReceipt.reason,"kakashi_terminal_pakkun_departure_required_before_receipt");
const departure=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitPakkunDeparture()`);
assert.strictEqual(departure.success,true);
const departureFact=plain(`SC_ALPHA_ORIGIN_32900.findOccurrence("occ_origin_kakashi_pakkun_departure_35100::qa-pakkun-35100").fact`);
assert.strictEqual(departureFact.departed,true);
assert.strictEqual(departureFact.ownershipGranted,false);
assert.strictEqual(departureFact.reciprocalNameKnowledgeGranted,false);
const pakkunReward=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitChronicleReceiptAndRewards()`);
assert.strictEqual(pakkunReward.success,true);
assert.strictEqual(Number(context.playerData.ryo||0),175);

// Exact sequential timing facts survive, but do NOT bypass unresolved package custody.
run(`resetDataQA("qa-sequential-35100");
__qaRuntime.battleResume={authored:{battleOccurrenceId:"battle-seq-mi",battleConfigId:"academy_kakashi_origin_battle_seq_mi",storyOccurrenceId:__qaRuntime.instanceId,sourceAnchorRef:"AK_SA_015",bindingRef:"academy_kakashi.battle.observe_sequential",resultState:"player_side_victory",playerActionOpportunityCount:4,participants:[],rewardGranted:false,lootGranted:false}};`);
assert.strictEqual(plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.captureBattleResult("academy_kakashi_origin_battle_seq_mi")`).success,true);
run(`__qaRuntime.battleResume={authored:{battleOccurrenceId:"battle-seq-ps",battleConfigId:"academy_kakashi_origin_battle_seq_ps",storyOccurrenceId:__qaRuntime.instanceId,sourceAnchorRef:"AK_SA_022",bindingRef:"academy_kakashi.battle.observe_sequential",resultState:"player_side_victory",playerActionOpportunityCount:3,participants:[],rewardGranted:false,lootGranted:false}};`);
assert.strictEqual(plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.captureBattleResult("academy_kakashi_origin_battle_seq_ps")`).success,true);
const launch=plain(`getStorySceneDefinition("origin_academy_kakashi_anbu_retrieval").beatMap.get("kak_seq_amt_battle").battle.launchResolver({})`);
assert.strictEqual(launch.success,true);
assert.strictEqual(truth(`__qaRuntime.localContext.kakashiTerminalSequentialAmtReached35100===true`),true,"qualifying AMT reach fact was not preserved");
const seqFacts=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.deriveTerminalFacts()`);
assert.strictEqual(seqFacts.success,false,"sequential timing benchmark bypassed unresolved package state");
assert.strictEqual(seqFacts.reason,"kakashi_terminal_package_state_unresolved");
const reportChoice=plain(`(()=>{const c=getStorySceneDefinition("origin_academy_kakashi_anbu_retrieval").beatMap.get("kak_seq_debrief_pending").choices[0],a=c.availability();return{choiceId:c.choiceId,available:a.available,knownBlocker:a.knownBlocker};})()`);
assert.strictEqual(reportChoice.choiceId,"kak_terminal_report_35100");
assert.strictEqual(reportChoice.available,false);
assert(String(reportChoice.knownBlocker).includes("kakashi_terminal_package_state_unresolved"));
assert.strictEqual(Number(context.playerData.ryo||0),0,"blocked sequential terminal granted reward");

console.log(JSON.stringify({
  pass:true,issue:188,tranche:"kakashi_terminal_debrief_rewards_35100",
  securePackageDebrief:true,battleVictoryAloneCannotReward:true,packageMaterialGuard:true,
  terminalRyoExact:175,fieldRecoveryPillExactlyOnce:true,ordinarySecureRouteNoTanto:true,
  pakkunExplicitDepartureRequired:true,sequentialTurnFactsPreserved:true,sequentialPackageGapFailsClosed:true,
  chronicleReceiptBeforeReward:true,guardedOriginCompletion:true,browserGoldenClaimed:false
},null,2));
