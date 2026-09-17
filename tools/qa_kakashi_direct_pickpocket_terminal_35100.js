#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const context={console,setTimeout,clearTimeout,Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,Infinity,NaN};
context.globalThis=context;context.window=context;
vm.createContext(context);
const run=(src,file)=>vm.runInContext(src,context,{filename:file});
const plain=(expr,file="qa35100-direct-expression.js")=>JSON.parse(JSON.stringify(run(`(()=>(${expr}))()`,file)));

run(`
var playerData={};
var activityHistory=[];
var __qaRuntime=null;
var __qaScene=null;
var __qaProgression={};
var __qaCompletionCalls=[];
function cloneProgressionData(v){return v===undefined?undefined:JSON.parse(JSON.stringify(v));}
function savePlayerData(){activityHistory=playerData.activityHistory||[];return true;}
function saveTestState(){return savePlayerData();}
function normalizeStorySceneBeat(def){return def;}
function getActiveStorySceneRuntime(){return __qaRuntime;}
function getStorySceneDefinition(sceneId){return __qaScene&&__qaScene.sceneId===sceneId?__qaScene:null;}
function getItemDefinition(id){if(id==="field_recovery_pill")return{id,name:"Field Recovery Pill"};if(id==="academy_training_tanto")return{id,name:"Academy Training Tanto"};return null;}
function addItemToInventory(item){playerData.inventory=Array.isArray(playerData.inventory)?playerData.inventory:[];playerData.inventory.push(JSON.parse(JSON.stringify(item)));return true;}
function addDisciplineExp(subjectId,disciplineId,amount){const key=subjectId+"::"+disciplineId;__qaProgression[key]=Number(__qaProgression[key]||0)+Number(amount||0);return true;}
function getCharacterDisciplineProgression(subjectId,disciplineId){const key=subjectId+"::"+disciplineId;return{characterId:subjectId,disciplineId,exp:Number(__qaProgression[key]||0)};}
function completeChronicleOriginPrologue(originId,evidenceIds){__qaCompletionCalls.push({originId,evidenceIds:[...(evidenceIds||[])]});return{success:true,originId,evidenceIds:[...(evidenceIds||[])]};}
function qaFindOccurrence(id){return (playerData.activityHistory||[]).find(row=>row&&row.occurrenceId===id&&row.sourceOccurrenceId===id)||null;}
function qaCommitOccurrence(originId,occurrenceId,fact,rowIds,options){
  const existing=qaFindOccurrence(occurrenceId);if(existing)return{success:true,occurrenceId,record:JSON.parse(JSON.stringify(existing)),idempotent:true};
  const record={type:options&&options.type||"origin_story_occurrence",activity:"story_scene",completed:true,committed:true,success:true,outcome:options&&options.outcome||"resolved",occurrenceId,sourceOccurrenceId:occurrenceId,actorVariantId:originId,protagonistParticipantId:originId,participantRefs:[...new Set([originId,...(options&&options.participantRefs||[])])],sceneId:__qaRuntime.sceneId,storySceneInstanceId:__qaRuntime.instanceId,fact:JSON.parse(JSON.stringify(fact||{})),data:JSON.parse(JSON.stringify(fact||{})),sourceRefs:JSON.parse(JSON.stringify(options&&options.sourceRefs||[])),timestamp:Date.now()};
  playerData.activityHistory.push(record);activityHistory=playerData.activityHistory;savePlayerData();return{success:true,occurrenceId,record:JSON.parse(JSON.stringify(record)),idempotent:false};
}
globalThis.SC_ALPHA_ORIGIN_32900={findOccurrence:qaFindOccurrence,commitOccurrence:qaCommitOccurrence};
function resetQA(instanceId){
  playerData={activityHistory:[],inventory:[],ryo:0};activityHistory=playerData.activityHistory;__qaProgression={};__qaCompletionCalls=[];
  __qaRuntime={sceneId:"origin_academy_kakashi_anbu_retrieval",instanceId,beatId:"kak_seq_debrief_pending",localContext:{},battleResume:null};
  const beat=id=>({beatId:id,mode:"narration",text:id,onEnterConsequences:[]});
  __qaScene={sceneId:__qaRuntime.sceneId,beatMap:new Map(),onCompleteConsequences:[]};
  ["kak_seq_debrief_pending","kak_scene03d_pickpocket_failure_3v1_return_34710"].forEach(id=>__qaScene.beatMap.set(id,beat(id)));
}
resetQA("qa-direct-bootstrap");
`,"qa35100-direct-stubs.js");

run(read("runtime/alpha-story-decision-realisation-34000.js"),"runtime/alpha-story-decision-realisation-34000.js");
run(`
globalThis.SC_ALPHA_KAKASHI_FINAL_34100={
  recordPostResolutionState:function(spec){const results=[];for(const row of spec&&spec.participantStates||[])results.push(SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",...row}));for(const row of spec&&spec.materialStates||[])results.push(SC_STORY_DECISION_REALISATION_34000.recordMaterialState({storyUnitRef:"academy_kakashi",...row}));return{success:results.every(row=>row&&row.success===true),results};},
  terminalGuard:function(state){return SC_STORY_DECISION_REALISATION_34000.terminalSemanticGuard({storyUnitRef:"academy_kakashi",state,requiredMaterialRefs:Array.isArray(state&&state.materiallyRelevantRefs)?state.materiallyRelevantRefs:[]});}
};
`,"qa35100-direct-kakashi-stub.js");
run(read("runtime/alpha-kakashi-origin-rewards-34800.js"),"runtime/alpha-kakashi-origin-rewards-34800.js");
run(read("runtime/alpha-kakashi-terminal-debrief-35100.js"),"runtime/alpha-kakashi-terminal-debrief-35100.js");

assert.strictEqual(plain(`runAcademyKakashiTerminalDebrief35100Diagnostics()`).pass,true,"35100 v3 diagnostics failed");
const directReturn=context.__qaScene.beatMap.get("kak_scene03d_pickpocket_failure_3v1_return_34710");
assert(directReturn.onEnterConsequences.some(row=>row.requestId==="kakashi_terminal_capture_35100::kak_scene03d_pickpocket_failure_3v1_return_34710"),"35100 did not bind direct Pickpocket 3-v-1 capture");

function commitPackageOccurrence(id,fact,outcome,participantRefs=[]){
  context.qaCommitOccurrence("academy_kakashi",id,fact,[],{type:"origin_story_factual_occurrence",outcome,participantRefs});
  context.__qaRuntime.localContext.kakashiDirectPickpocketPackageOccurrenceId=id;
}

// Direct Pickpocket clean success: package is committed to Kakashi, no Battle,
// no MI/Pakkun continuation, and terminal rewards consume stealth success.
run(`resetQA("qa-direct-clean-success");`);
commitPackageOccurrence("occ-direct-pick-success",{
  factClass:"academy_kakashi_direct_pickpocket_factual_state",storySceneInstanceId:"qa-direct-clean-success",selectedOutcomeRef:"PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION",
  packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",handoffCompleted:false},
  worldFacts:{cleanExtractionSucceeded:true,withdrawalCompletedUndetected:true,maskedInterceptorVisible:false,pakkunPresent:false,battleRequired:false}
},"direct_pickpocket_success");
let facts=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.deriveTerminalFacts()`);
assert.strictEqual(facts.success,true);assert.strictEqual(facts.packageRecovered,true);assert.strictEqual(facts.materiallyParticipatedInPlBattle,false);assert.strictEqual(facts.cleanExtractionBenchmarkMet,true);assert.strictEqual(facts.exceptionalTrainingTantoPredicate,true);assert.strictEqual(facts.pakkunPresentAtDebrief,false);assert.strictEqual(facts.battleFacts.length,0);
assert.strictEqual(plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitTerminalDebrief()`).success,true);
let reward=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitChronicleReceiptAndRewards()`);
assert.strictEqual(reward.success,true);assert.strictEqual(Number(context.playerData.ryo),200,"clean Pickpocket exact terminal Ryō should be 100 + 75 package + 25 exceptional");assert.strictEqual(context.playerData.inventory.filter(row=>row.id==="field_recovery_pill").length,0);assert.strictEqual(context.playerData.inventory.filter(row=>row.id==="academy_training_tanto").length,1);

// Direct Pickpocket detected-failure 3-v-1 victory: terminal state consumes the
// post-Battle package occurrence plus exact Battle receipt, but does not infer
// participant death/custody or Pakkun.
run(`resetQA("qa-direct-3v1-win");`);
commitPackageOccurrence("occ-direct-pick-3v1-win",{
  factClass:"academy_kakashi_direct_pickpocket_3v1_post_battle_factual_state",storySceneInstanceId:"qa-direct-3v1-win",battleOccurrenceId:"battle-direct-3v1-win",battleConfigId:"academy_kakashi_origin_battle_amt_ps_mi_3v1",resultState:"player_side_victory",
  packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",handoffCompleted:false},packageRecovered:true,participantCustodyCommitted:false,participantDeathCommitted:false,
  worldFacts:{maskedInterceptorVisible:true,pakkunPresent:false,cleanExtractionSucceeded:false}
},"direct_pickpocket_3v1_victory",["academy_kakashi_origin_amt","academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"]);
run(`__qaRuntime.battleResume={authored:{battleOccurrenceId:"battle-direct-3v1-win",battleConfigId:"academy_kakashi_origin_battle_amt_ps_mi_3v1",storyOccurrenceId:__qaRuntime.instanceId,sourceAnchorRef:"AK_SA_028",bindingRef:"academy_kakashi.resolver.pickpocket_direct",resultState:"player_side_victory",playerActionOpportunityCount:3,participants:[{participantRef:"academy_kakashi_origin_amt",side:"opposition",battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},{participantRef:"academy_kakashi_origin_package_smuggler",side:"opposition",battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},{participantRef:"academy_kakashi_origin_masked_interceptor",side:"opposition",battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}],rewardGranted:false,lootGranted:false,participantDeathCommitted:false,participantCustodyCommitted:false}};`);
assert.strictEqual(plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.captureBattleResult("academy_kakashi_origin_battle_amt_ps_mi_3v1")`).success,true);
facts=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.deriveTerminalFacts()`);
assert.strictEqual(facts.success,true);assert.strictEqual(facts.packageRecovered,true);assert.strictEqual(facts.materiallyParticipatedInPlBattle,true);assert.strictEqual(facts.failedPickpocket3v1Victory,true);assert.strictEqual(facts.pakkunPresentAtDebrief,false);assert.deepStrictEqual([...facts.participantRefs].sort(),["academy_kakashi_origin_amt","academy_kakashi_origin_masked_interceptor","academy_kakashi_origin_package_smuggler"].sort());
assert.strictEqual(plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitTerminalDebrief()`).success,true);
reward=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitChronicleReceiptAndRewards()`);
assert.strictEqual(reward.success,true);assert.strictEqual(Number(context.playerData.ryo),200);assert.strictEqual(context.playerData.inventory.filter(row=>row.id==="field_recovery_pill").length,1);assert.strictEqual(context.playerData.inventory.filter(row=>row.id==="academy_training_tanto").length,1);

// Direct Pickpocket 3-v-1 defeat: AMT package custody remains factual; no
// package recovery, no Pakkun, but the PL Battle is still reported/rewarded.
run(`resetQA("qa-direct-3v1-loss");`);
commitPackageOccurrence("occ-direct-pick-3v1-loss",{
  factClass:"academy_kakashi_direct_pickpocket_3v1_post_battle_factual_state",storySceneInstanceId:"qa-direct-3v1-loss",battleOccurrenceId:"battle-direct-3v1-loss",battleConfigId:"academy_kakashi_origin_battle_amt_ps_mi_3v1",resultState:"opposition_side_victory",
  packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",handoffCompleted:false},packageRecovered:false,participantCustodyCommitted:false,participantDeathCommitted:false,
  worldFacts:{maskedInterceptorVisible:true,pakkunPresent:false,amtEscapesWithPackage:true,cleanExtractionSucceeded:false}
},"direct_pickpocket_3v1_defeat",["academy_kakashi_origin_amt","academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"]);
run(`__qaRuntime.battleResume={authored:{battleOccurrenceId:"battle-direct-3v1-loss",battleConfigId:"academy_kakashi_origin_battle_amt_ps_mi_3v1",storyOccurrenceId:__qaRuntime.instanceId,sourceAnchorRef:"AK_SA_028",bindingRef:"academy_kakashi.resolver.pickpocket_direct",resultState:"opposition_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:"academy_kakashi_origin_amt",side:"opposition",battleStatus:"active",lifeState:"unresolved",custodyState:"unresolved"},{participantRef:"academy_kakashi_origin_package_smuggler",side:"opposition",battleStatus:"active",lifeState:"unresolved",custodyState:"unresolved"},{participantRef:"academy_kakashi_origin_masked_interceptor",side:"opposition",battleStatus:"active",lifeState:"unresolved",custodyState:"unresolved"}],rewardGranted:false,lootGranted:false,participantDeathCommitted:false,participantCustodyCommitted:false}};`);
assert.strictEqual(plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.captureBattleResult("academy_kakashi_origin_battle_amt_ps_mi_3v1")`).success,true);
facts=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.deriveTerminalFacts()`);
assert.strictEqual(facts.success,true);assert.strictEqual(facts.packageRecovered,false);assert.strictEqual(facts.failedPickpocket3v1Victory,false);assert.strictEqual(facts.materiallyParticipatedInPlBattle,true);assert.strictEqual(facts.pakkunPresentAtDebrief,false);
assert.strictEqual(plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitTerminalDebrief()`).success,true);
reward=plain(`SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.commitChronicleReceiptAndRewards()`);
assert.strictEqual(reward.success,true);assert.strictEqual(Number(context.playerData.ryo),100);assert.strictEqual(context.playerData.inventory.filter(row=>row.id==="field_recovery_pill").length,1);assert.strictEqual(context.playerData.inventory.filter(row=>row.id==="academy_training_tanto").length,0);

console.log("Kakashi direct Pickpocket -> terminal 35100 QA: PASS");
console.log("- clean success: factual package custody -> debrief/Receipt/rewards, no Battle/Pakkun");
console.log("- detected failure victory: exact 3-v-1 Battle + package recovery -> terminal, no death/custody inference");
console.log("- detected failure defeat: AMT escapes with package -> terminal factual failure, PL-Battle participation retained");