#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const assert=require("assert");

const CONTENT_PATH="runtime/academy-kakashi-v2-content-36000.js";
const WRITING_GOLDEN_PATH="runtime/academy-kakashi-v2-writing-golden-36100.js";
const CORE_PATH="runtime/alpha-kakashi-v2-core-36020.js";
const contentSource=fs.readFileSync(CONTENT_PATH,"utf8");
const writingGoldenSource=fs.readFileSync(WRITING_GOLDEN_PATH,"utf8");
const coreSource=fs.readFileSync(CORE_PATH,"utf8");
const scenes=new Map();
const factualDefinitions=new Map();
let factualOutcomes={};
let activeRuntime=null;
let completionCalls=0,scenarioSequence=0;

const D={
  openSemanticChoiceSet:spec=>({success:true,choiceSet:{choiceSetId:`qa:${spec.decisionPointRef}`}}),
  commitStoryIntent:({choiceSetId,choiceId})=>({success:true,receipt:{storyDecisionReceiptId:`receipt:${choiceSetId}`,intentCommitRef:`intent:${choiceId}`,choiceSetId,choiceId}})
};
const F={
  stableRef:(prefix,payload)=>prefix+":"+JSON.stringify(payload),
  registerStoryFactualResolverBinding:(bindingRef,spec)=>{factualDefinitions.set(bindingRef,spec);return{success:true};},
  resolveStoryFactualAction:req=>{
    const spec=factualDefinitions.get(req.bindingRef);
    assert(spec,`unregistered factual binding ${req.bindingRef}`);
    const selected=factualOutcomes[req.bindingRef]||(spec.outcomes&&spec.outcomes[0]&&spec.outcomes[0].outcomeRef);
    assert((spec.outcomes||[]).some(row=>row.outcomeRef===selected),`invalid forced factual outcome ${selected} for ${req.bindingRef}`);
    return{success:true,receipt:{selectedOutcomeRef:selected,storyFactualResolverReceiptId:`fact:${req.bindingRef}:${selected}`,resolutionMode:"qa_forced"}};
  }
};
const tenConfigs={
  academy_kakashi_origin_battle_amt_1v1:{},academy_kakashi_origin_battle_amt_ps_2v1:{},
  academy_kakashi_origin_battle_amt_ps_mi_3v1:{},academy_kakashi_origin_battle_kakashi_pakkun_vs_amt:{},
  academy_kakashi_origin_battle_ps_mi_2v1:{},academy_kakashi_origin_battle_mi_1v1:{},
  academy_kakashi_origin_battle_ps_1v1:{},academy_kakashi_origin_battle_seq_mi:{},
  academy_kakashi_origin_battle_seq_ps:{},academy_kakashi_origin_battle_seq_amt_pakkun:{}
};
const context={
  console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,
  playerData:{activityHistory:[]},activityHistory:[],
  savePlayerData:()=>true,
  SC_STORY_DECISION_REALISATION_34000:D,
  SC_STORY_FACTUAL_RESOLVER_34600:F,
  SC_ALPHA_SPECIAL_JONIN_EVIDENCE_PRODUCER_34700:{patchId:"qa"},
  projectSpecialJoninContextualEvidence34700:()=>({success:true}),
  SC_ACADEMY_KAKASHI_V2_BATTLE_36010:{configs:tenConfigs},
  commitAcademyKakashiV2TerminalRewards36015:()=>({success:true,sourceReceipts:[],plan:{totalRyo:100}}),
  unregisterStoryScene:id=>scenes.delete(id),
  registerStoryScene:def=>{const copy={...def,beatMap:new Map((def.beats||[]).map(b=>[b.beatId,b]))};scenes.set(def.sceneId,copy);return{success:true,sceneId:def.sceneId};},
  getStorySceneDefinition:id=>scenes.get(id)||null,
  getActiveStorySceneRuntime:()=>activeRuntime,
  completeChronicleOriginPrologue:()=>{completionCalls+=1;return{success:true,academyTeamFormationRequired:true};}
};
context.globalThis=context;
vm.createContext(context);
vm.runInContext(contentSource,context,{filename:CONTENT_PATH});
vm.runInContext(writingGoldenSource,context,{filename:WRITING_GOLDEN_PATH});
vm.runInContext(coreSource,context,{filename:CORE_PATH});

const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const def=scenes.get(SCENE_ID);
assert(def,"Kakashi V2 production scene missing");

// ---------------------------------------------------------------------------
// Graph closure: every registered beat is reachable from entry and every beat
// can reach the single completion node. Terminal convergence is mandatory.
// ---------------------------------------------------------------------------
const adjacency=new Map();
for(const beat of def.beats){
  const next=new Set();
  if(beat.nextBeatId)next.add(beat.nextBeatId);
  for(const choice of beat.choices||[])if(choice.nextBeatId)next.add(choice.nextBeatId);
  if(beat.battle){
    if(beat.battle.victoryBeatId)next.add(beat.battle.victoryBeatId);
    if(beat.battle.defeatBeatId)next.add(beat.battle.defeatBeatId);
  }
  adjacency.set(beat.beatId,[...next]);
}
for(const [id,targets] of adjacency)for(const target of targets)assert(adjacency.has(target),`missing graph target ${id} -> ${target}`);

function reachable(start,graph=adjacency){
  const seen=new Set(),stack=[start];
  while(stack.length){const id=stack.pop();if(seen.has(id))continue;seen.add(id);for(const n of graph.get(id)||[])stack.push(n);}
  return seen;
}
const fromEntry=reachable(def.entryBeatId);
assert.strictEqual(fromEntry.size,def.beats.length,`unreachable V2 beats: ${def.beats.filter(b=>!fromEntry.has(b.beatId)).map(b=>b.beatId).join(", ")}`);

const reverse=new Map(def.beats.map(b=>[b.beatId,[]]));
for(const [id,targets] of adjacency)for(const t of targets)reverse.get(t).push(id);
const toComplete=reachable("v2_receipt",reverse);
assert.strictEqual(toComplete.size,def.beats.length,`beats cannot reach v2_receipt: ${def.beats.filter(b=>!toComplete.has(b.beatId)).map(b=>b.beatId).join(", ")}`);
assert.deepStrictEqual(reverse.get("v2_hidden_review"),["v2_report"],"terminal path bypasses mission-giver ANBU report");
assert.deepStrictEqual(reverse.get("v2_receipt"),["v2_hidden_review"],"terminal path bypasses hidden Hokage test review");
assert(!def.beatMap.has("v2_minato"),"superseded non-reveal Minato beat returned");
assert(!def.beatMap.has("v2_complete"),"forbidden Origin occurrence sealed pseudo-receipt returned");

let cycle=null;
const white=new Set(adjacency.keys()),grey=new Set(),black=new Set();
function visit(id,path=[]){
  if(cycle)return;
  if(grey.has(id)){cycle=[...path,id];return;}
  if(black.has(id))return;
  white.delete(id);grey.add(id);
  for(const n of adjacency.get(id)||[])visit(n,[...path,id]);
  grey.delete(id);black.add(id);
}
visit(def.entryBeatId);
assert.strictEqual(cycle,null,`unexpected Kakashi V2 route cycle: ${cycle&&cycle.join(" -> ")}`);

assert.strictEqual(def.beats.filter(b=>b.exitScene===true).length,1,"Kakashi V2 must have one semantic exit");
assert.strictEqual(def.beats.find(b=>b.exitScene===true).beatId,"v2_receipt");
assert.strictEqual(def.beats.length,131,"unexpected Kakashi V2 beat count after Writing-Golden terminal replacement");

// ---------------------------------------------------------------------------
// Scenario driver: execute authored state consequences rather than merely parse
// labels. Battle outcomes are injected only at the Battle-return boundary.
// ---------------------------------------------------------------------------
function reset(forced={}){
  factualOutcomes={...forced};
  context.playerData.activityHistory=[];context.activityHistory=context.playerData.activityHistory;
  activeRuntime={
    sceneId:SCENE_ID,instanceId:`qa_origin_${++scenarioSequence}`,
    beatId:def.entryBeatId,localContext:{},battleResume:null
  };
  enter(def.entryBeatId);
}
function beat(){return def.beatMap.get(activeRuntime.beatId);}
function runRequests(requests,battleResume=null){
  for(const request of requests||[]){
    const result=request.resolve({sceneContext:{battleResume}});
    assert(result&&result.success===true,`consequence failed at ${activeRuntime.beatId}: ${JSON.stringify(result)}`);
  }
}
function enter(id,battleResume=null){
  assert(def.beatMap.has(id),`unknown beat ${id}`);
  activeRuntime.beatId=id;activeRuntime.battleResume=battleResume;
  const b=beat();runRequests(b.onEnterConsequences,battleResume);
  return b;
}
function availableChoice(label){
  const rows=(beat().choices||[]).filter(c=>c.label===label);
  assert(rows.length,`choice ${label} missing at ${activeRuntime.beatId}`);
  const row=rows.find(candidate=>typeof candidate.availability!=="function"||candidate.availability().available===true);
  assert(row,`choice ${label} unavailable at ${activeRuntime.beatId}`);
  return row;
}
function choose(label){
  const row=availableChoice(label);
  runRequests(row.consequenceRequests,null);
  return enter(row.nextBeatId||beat().nextBeatId);
}
function next(){
  const b=beat();runRequests(b.onAdvanceConsequences,null);
  assert(b.nextBeatId,`beat ${b.beatId} has no nextBeatId`);
  return enter(b.nextBeatId);
}
function resolveMachine(){
  const b=beat();
  assert.strictEqual(b.machineResolved,true,`beat ${b.beatId} is not machine-resolved`);
  const rows=(b.choices||[]).filter(candidate=>typeof candidate.availability!=="function"||candidate.availability().available===true);
  assert.strictEqual(rows.length,1,`machine resolver branch cardinality at ${b.beatId}`);
  assert.strictEqual(rows[0].label,"RESOLVE RESULT",`machine resolver label leaked at ${b.beatId}`);
  runRequests(rows[0].consequenceRequests,null);
  return enter(rows[0].nextBeatId);
}
function returnBattle(resultBeat,{outcome="victory",encounterId="qa",actions=1}={}){
  return enter(resultBeat,{outcome,battle_id:`qa_battle_${resultBeat}`,encounter_id:encounterId,authored:{playerActionOpportunityCount:actions}});
}
function state(){return context.getAcademyKakashiV2State36020();}
function finishTerminal(){
  assert.strictEqual(activeRuntime.beatId,"v2_report");
  next();assert.strictEqual(activeRuntime.beatId,"v2_hidden_review");
  next();assert.strictEqual(activeRuntime.beatId,"v2_receipt");
  runRequests(beat().onAdvanceConsequences,null);
  assert.strictEqual(state().rewards.terminalCommitted,true);
  assert.strictEqual(completionCalls>0,true,"Receipt did not invoke Origin completion");
}

// Clean direct Pickpocket: no Battle, no MI, package returned.
reset({"academy_kakashi.v2.pickpocket_direct":"PICKPOCKET_DIRECT_SUCCESS"});
enter("v2_scene02_tail");
choose("SLIP IN AND TAKE IT");
resolveMachine();
assert.strictEqual(activeRuntime.beatId,"v2_pickpocket_clean_success");
assert.strictEqual(state().package.holder,"KAKASHI");
assert.strictEqual(state().participants.MI.state,"UNSEEN");
next();
assert.strictEqual(state().package.holder,"ANBU");
assert.strictEqual(state().package.returned,true);
finishTerminal();

// Failed direct Pickpocket -> exact 3-v-1 -> deliberate group release.
reset({"academy_kakashi.v2.pickpocket_direct":"PICKPOCKET_DIRECT_FAILURE"});
enter("v2_scene02_tail");
choose("SLIP IN AND TAKE IT");resolveMachine();next();
assert.strictEqual(activeRuntime.beatId,"v2_battle_pickpocket_3v1");
returnBattle("v2_pickpocket_3v1_win",{outcome:"victory",encounterId:"academy_kakashi_origin_battle_amt_ps_mi_3v1",actions:3});
choose("LET THEM GO");
assert.strictEqual(activeRuntime.beatId,"v2_group3_release");
for(const ref of ["AMT","PS","MI"])assert.strictEqual(state().participants[ref].state,"RELEASED");
assert.strictEqual(state().package.holder,"KAKASHI","release scene must preserve package truth until report");
next();
assert.strictEqual(state().package.holder,"ANBU");
for(const ref of ["AMT","PS","MI"])assert.strictEqual(state().participants[ref].state,"RELEASED");

// Direct Strike -> 2-v-1 victory -> MI victory -> three deterministic kills.
reset();
enter("v2_scene02_tail");choose("INTERRUPT THE HANDOFF");next();
returnBattle("v2_direct_strike_2v1_win",{encounterId:"academy_kakashi_origin_battle_amt_ps_2v1",actions:3});next();
returnBattle("v2_direct_mi_win",{encounterId:"academy_kakashi_origin_battle_mi_1v1",actions:2});
choose("KILL THEM");
for(const ref of ["AMT","PS","MI"])assert.strictEqual(state().participants[ref].state,"KILLED");
assert.strictEqual(activeRuntime.beatId,"v2_group3_kill_result");
assert.strictEqual(state().package.holder,"KAKASHI","resolver result scene must preserve route-owned package truth before report");
next();
assert.strictEqual(activeRuntime.beatId,"v2_report");
assert.strictEqual(state().package.holder,"ANBU","ANBU custody commits only on exact report handoff");

// GET CLOSER failure -> Stay on Package -> Ask Where -> Take Him Down loss.
// Package recovery survives the Battle defeat and Knowledge remains exact.
reset({
  "academy_kakashi.v2.get_closer":"GET_CLOSER_FAILURE",
  "academy_kakashi.v2.stay_package_pursuit":"STAY_PACKAGE_PURSUIT_SUCCESS"
});
enter("v2_scene02_tail");choose("GET CLOSER");resolveMachine();choose("STAY ON THE PACKAGE");resolveMachine();
choose("ASK WHERE THE PACKAGE WAS GOING");choose("TAKE HIM DOWN");next();
returnBattle("v2_take_down_loss",{outcome:"defeat",encounterId:"academy_kakashi_origin_battle_kakashi_pakkun_vs_amt",actions:4});
assert.strictEqual(state().package.holder,"KAKASHI");
assert.strictEqual(state().package.recovered,true);
assert.strictEqual(state().participants.AMT.state,"ESCAPED");
assert.strictEqual(state().knowledge.askWhere,true);
assert.strictEqual(state().knowledge.downstreamDestinationKnown,false);
next();
assert.strictEqual(state().package.holder,"ANBU");
assert.strictEqual(state().pakkun.present,true);
next();
assert.strictEqual(state().pakkun.present,false);
assert.strictEqual(state().pakkun.departed,true);

// INTERCEPT THE MASKED ATTACKER current correction: exactly <=3 controller actions gives
// Package Smuggler catch-up only. Direct AMT pursuit must not appear.
reset();
enter("v2_watch_exchange");choose("INTERCEPT THE MASKED ATTACKER");next();
returnBattle("v2_mi_stop_win",{encounterId:"academy_kakashi_origin_battle_mi_1v1",actions:3});
assert((beat().choices||[]).some(c=>c.label==="GO AFTER PACKAGE SMUGGLER"&&c.availability().available===true));
assert(!(beat().choices||[]).some(c=>c.label==="GO AFTER ANBU MARKED TARGET"));
choose("RESTRAIN HER AND CONTINUE");
assert.strictEqual(state().participants.MI.state,"RESTRAINED");
assert.strictEqual(activeRuntime.beatId,"v2_mi_restrained_next");
next();
assert.strictEqual(activeRuntime.beatId,"v2_ps_pursuit_resolver","RESTRAIN result did not preserve Package Smuggler pursuit timing");

// Four controller actions is already too slow on INTERCEPT THE MASKED ATTACKER.
reset();
enter("v2_watch_exchange");choose("INTERCEPT THE MASKED ATTACKER");next();
returnBattle("v2_mi_stop_win",{encounterId:"academy_kakashi_origin_battle_mi_1v1",actions:4});
const visibleSlow=(beat().choices||[]).filter(c=>!c.availability||c.availability().available).map(c=>c.label);
assert(!visibleSlow.includes("GO AFTER PACKAGE SMUGGLER"));
assert(!visibleSlow.includes("RESTRAIN HER AND CONTINUE"));
assert(!visibleSlow.includes("GO AFTER ANBU MARKED TARGET"));

// DEFEAT ASSASSIN THEN SECURE PACKAGE keeps its distinct <=4 / <=3 chain.
reset({
  "academy_kakashi.v2.ps_pursuit":"PS_PURSUIT_SUCCESS",
  "academy_kakashi.v2.secure_amt_pursuit":"SECURE_AMT_PURSUIT_SUCCESS"
});
enter("v2_watch_exchange");choose("DEAL WITH HER FIRST");next();
returnBattle("v2_mi_package_second_win",{encounterId:"academy_kakashi_origin_battle_seq_mi",actions:4});
choose("CHASE THE PACKAGE SMUGGLER");resolveMachine();next();
returnBattle("v2_ps_package_second_win",{encounterId:"academy_kakashi_origin_battle_seq_ps",actions:3});
choose("STAY ON THE FIRST MAN");resolveMachine();next();
returnBattle("v2_amt_package_second_win",{encounterId:"academy_kakashi_origin_battle_seq_amt_pakkun",actions:4});
choose("BRING HIM TO ANBU");
assert.strictEqual(activeRuntime.beatId,"v2_amt_anbu_depart");
assert.strictEqual(state().participants.AMT.state,"BATTLE_DEFEATED","custody committed before handoff");
next();assert.strictEqual(activeRuntime.beatId,"v2_amt_anbu_handoff");
next();assert.strictEqual(activeRuntime.beatId,"v2_report");
assert.strictEqual(state().package.holder,"ANBU");
assert.strictEqual(state().participants.AMT.state,"ANBU_CUSTODY");

// GO FOR THE PACKAGE victory preserves defeated participants separately.
reset();
enter("v2_watch_exchange");choose("GO FOR THE PACKAGE");next();
returnBattle("v2_ps_mi_win",{encounterId:"academy_kakashi_origin_battle_ps_mi_2v1",actions:5});
choose("RETURN AND REPORT");
assert.strictEqual(state().package.holder,"ANBU");
assert.strictEqual(state().participants.PS.state,"BATTLE_DEFEATED");
assert.strictEqual(state().participants.MI.state,"BATTLE_DEFEATED");

// GO AFTER ORIGINAL TARGET pursuit failure keeps the package with PS.
reset({"academy_kakashi.v2.amt_pursuit_root":"AMT_PURSUIT_FAILURE"});
enter("v2_watch_exchange");choose("CHASE THE MAN FROM THE PHOTO");resolveMachine();
assert.strictEqual(activeRuntime.beatId,"v2_amt_direct_pursuit_fail");
assert.strictEqual(state().package.holder,"PS");
next();
assert.strictEqual(state().package.holder,"PS");

// GET CLOSER success + improved clean Pickpocket preserves extra Knowledge.
reset({
  "academy_kakashi.v2.get_closer":"GET_CLOSER_SUCCESS",
  "academy_kakashi.v2.pickpocket_improved":"PICKPOCKET_IMPROVED_SUCCESS"
});
enter("v2_scene02_tail");choose("GET CLOSER");resolveMachine();choose("SLIP IN AND TAKE IT");resolveMachine();
assert.strictEqual(activeRuntime.beatId,"v2_pickpocket_clean_success");
assert.strictEqual(state().knowledge.getCloserContingency,true);
next();assert.strictEqual(state().package.holder,"ANBU");

// Get Closer failure -> Sakura cutoff -> 2-v-1 -> Police custody.
reset({"academy_kakashi.v2.get_closer":"GET_CLOSER_FAILURE"});
enter("v2_scene02_tail");choose("GET CLOSER");resolveMachine();choose("CUT THEM OFF");next();
returnBattle("v2_cutoff_win",{encounterId:"academy_kakashi_origin_battle_amt_ps_2v1",actions:4});
choose("TAKE THEM TO THE UCHIHA POLICE");
assert.strictEqual(activeRuntime.beatId,"v2_group2_police_depart");
assert.strictEqual(state().participants.AMT.state,"BATTLE_DEFEATED");
assert.strictEqual(state().participants.PS.state,"BATTLE_DEFEATED");
next();assert.strictEqual(activeRuntime.beatId,"v2_group2_police_handoff");
next();assert.strictEqual(activeRuntime.beatId,"v2_report");
assert.strictEqual(state().package.holder,"ANBU");
assert.strictEqual(state().participants.AMT.state,"POLICE_CUSTODY");
assert.strictEqual(state().participants.PS.state,"POLICE_CUSTODY");
assert.strictEqual(state().participants.MI.state,"UNSEEN");

console.log(JSON.stringify({
  pass:true,
  beatCount:def.beats.length,
  graphReachableFromEntry:fromEntry.size,
  graphCanReachCompletion:toComplete.size,
  terminalConvergence:"MISSION_GIVER_ANBU_REPORT -> HIDDEN_TEST_REVIEW -> CHRONICLE_RECEIPT",
  scenarioFamiliesValidated:10,
  completionCalls,
  browserGoldenClaimed:false
},null,2));
