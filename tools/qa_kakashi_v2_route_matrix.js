#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const assert=require("assert");

const CORE_PATH="runtime/alpha-kakashi-v2-core-36020.js";
const coreSource=fs.readFileSync(CORE_PATH,"utf8");
const scenes=new Map();
const factualDefinitions=new Map();
let factualOutcomes={};
let activeRuntime=null;
let completionCalls=0;

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
  playerData:{},savePlayerData:()=>true,
  SC_STORY_DECISION_REALISATION_34000:D,
  SC_STORY_FACTUAL_RESOLVER_34600:F,
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
const toComplete=reachable("v2_complete",reverse);
assert.strictEqual(toComplete.size,def.beats.length,`beats cannot reach v2_complete: ${def.beats.filter(b=>!toComplete.has(b.beatId)).map(b=>b.beatId).join(", ")}`);
assert.deepStrictEqual(reverse.get("v2_minato"),["v2_report"],"terminal path bypasses ANBU report");
assert.deepStrictEqual(reverse.get("v2_receipt"),["v2_minato"],"terminal path bypasses private Minato evaluation");
assert.deepStrictEqual(reverse.get("v2_complete"),["v2_receipt"],"terminal path bypasses Chronicle Receipt");

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
assert.strictEqual(def.beats.find(b=>b.exitScene===true).beatId,"v2_complete");
assert.strictEqual(def.beats.length,99,"unexpected Kakashi V2 beat count");

// ---------------------------------------------------------------------------
// Scenario driver: execute authored state consequences rather than merely parse
// labels. Battle outcomes are injected only at the Battle-return boundary.
// ---------------------------------------------------------------------------
function reset(forced={}){
  factualOutcomes={...forced};
  activeRuntime={
    sceneId:SCENE_ID,instanceId:`qa_origin_${Math.random().toString(36).slice(2)}`,
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
  const row=(beat().choices||[]).find(c=>c.label===label);
  assert(row,`choice ${label} missing at ${activeRuntime.beatId}`);
  if(typeof row.availability==="function")assert.strictEqual(row.availability().available,true,`choice ${label} unavailable at ${activeRuntime.beatId}`);
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
function returnBattle(resultBeat,{outcome="victory",encounterId="qa",actions=1}={}){
  return enter(resultBeat,{outcome,battle_id:`qa_battle_${resultBeat}`,encounter_id:encounterId,authored:{playerActionOpportunityCount:actions}});
}
function state(){return context.getAcademyKakashiV2State36020();}
function finishTerminal(){
  assert.strictEqual(activeRuntime.beatId,"v2_report");
  next();assert.strictEqual(activeRuntime.beatId,"v2_minato");
  next();assert.strictEqual(activeRuntime.beatId,"v2_receipt");
  next();assert.strictEqual(activeRuntime.beatId,"v2_complete");
  runRequests(beat().onAdvanceConsequences,null);
  assert.strictEqual(state().rewards.terminalCommitted,true);
}

// Clean direct Pickpocket: no Battle, no MI, package returned.
reset({"academy_kakashi.v2.pickpocket_direct":"PICKPOCKET_DIRECT_SUCCESS"});
enter("v2_scene02_tail");
choose("SLIP IN FOR THE PACKAGE");
choose("CONTINUE");
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
choose("SLIP IN FOR THE PACKAGE");choose("CONTINUE");next();
assert.strictEqual(activeRuntime.beatId,"v2_battle_pickpocket_3v1");
returnBattle("v2_pickpocket_3v1_win",{outcome:"victory",encounterId:"academy_kakashi_origin_battle_amt_ps_mi_3v1",actions:3});
choose("TAKE THE PACKAGE AND LET THEM GO");
assert.strictEqual(state().package.holder,"ANBU");
for(const ref of ["AMT","PS","MI"])assert.strictEqual(state().participants[ref].state,"RELEASED");

// Direct Strike -> 2-v-1 victory -> MI victory -> three deterministic kills.
reset();
enter("v2_scene02_tail");choose("STRIKE BEFORE THE HANDOFF");next();
returnBattle("v2_direct_strike_2v1_win",{encounterId:"academy_kakashi_origin_battle_amt_ps_2v1",actions:3});next();
returnBattle("v2_direct_mi_win",{encounterId:"academy_kakashi_origin_battle_mi_1v1",actions:2});
choose("KILL THEM");
for(const ref of ["AMT","PS","MI"])assert.strictEqual(state().participants[ref].state,"DEAD");
assert.strictEqual(state().package.holder,"ANBU");

// MOVE IN CLOSER failure -> Stay on Package -> Ask Where -> Take Him Down loss.
// Package recovery survives the Battle defeat and Knowledge remains exact.
reset({
  "academy_kakashi.v2.get_closer":"GET_CLOSER_FAILURE",
  "academy_kakashi.v2.stay_package_pursuit":"STAY_PACKAGE_PURSUIT_SUCCESS"
});
enter("v2_scene02_tail");choose("MOVE IN CLOSER");choose("CONTINUE");choose("STAY ON THE PACKAGE");choose("CONTINUE");
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

// STOP THE ASSASSIN current correction: exactly <=3 controller actions gives
// Package Smuggler catch-up only. Direct AMT pursuit must not appear.
reset();
enter("v2_watch_exchange");choose("STOP THE ASSASSIN");next();
returnBattle("v2_mi_stop_win",{encounterId:"academy_kakashi_origin_battle_mi_1v1",actions:3});
assert((beat().choices||[]).some(c=>c.label==="GO AFTER PACKAGE SMUGGLER"&&c.availability().available===true));
assert(!(beat().choices||[]).some(c=>c.label==="GO AFTER ANBU MARKED TARGET"));
choose("RESTRAIN HER AND CONTINUE");
assert.strictEqual(state().participants.MI.state,"FIELD_SECURED_PENDING_COLLECTION");
assert.deepStrictEqual(Array.from(beat().choices).map(c=>c.label),["GO AFTER PACKAGE SMUGGLER"]);

// Four controller actions is already too slow on STOP THE ASSASSIN.
reset();
enter("v2_watch_exchange");choose("STOP THE ASSASSIN");next();
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
enter("v2_watch_exchange");choose("DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE");next();
returnBattle("v2_mi_package_second_win",{encounterId:"academy_kakashi_origin_battle_seq_mi",actions:4});
choose("CHASE THE PACKAGE SMUGGLER");choose("CONTINUE");next();
returnBattle("v2_ps_package_second_win",{encounterId:"academy_kakashi_origin_battle_seq_ps",actions:3});
choose("STAY ON THE FIRST MAN");choose("CONTINUE");next();
returnBattle("v2_amt_package_second_win",{encounterId:"academy_kakashi_origin_battle_seq_amt_pakkun",actions:4});
choose("TAKE HIM BACK TO THE ANBU");
assert.strictEqual(state().package.holder,"ANBU");
assert.strictEqual(state().participants.AMT.state,"ANBU_CUSTODY");

// SECURE THE PACKAGE victory preserves defeated participants separately.
reset();
enter("v2_watch_exchange");choose("SECURE THE PACKAGE");next();
returnBattle("v2_ps_mi_win",{encounterId:"academy_kakashi_origin_battle_ps_mi_2v1",actions:5});
choose("RETURN AND REPORT");
assert.strictEqual(state().package.holder,"ANBU");
assert.strictEqual(state().participants.PS.state,"BATTLE_DEFEATED");
assert.strictEqual(state().participants.MI.state,"BATTLE_DEFEATED");

// GO AFTER ORIGINAL TARGET pursuit failure keeps the package with PS.
reset({"academy_kakashi.v2.amt_pursuit_root":"AMT_PURSUIT_FAILURE"});
enter("v2_watch_exchange");choose("GO AFTER THE ORIGINAL TARGET");choose("CONTINUE");
assert.strictEqual(activeRuntime.beatId,"v2_amt_direct_pursuit_fail");
assert.strictEqual(state().package.holder,"PS");
next();
assert.strictEqual(state().package.holder,"PS");

// MOVE IN CLOSER success + improved clean Pickpocket preserves extra Knowledge.
reset({
  "academy_kakashi.v2.get_closer":"GET_CLOSER_SUCCESS",
  "academy_kakashi.v2.pickpocket_improved":"PICKPOCKET_IMPROVED_SUCCESS"
});
enter("v2_scene02_tail");choose("MOVE IN CLOSER");choose("CONTINUE");choose("ATTEMPT THE PICKPOCKET");choose("CONTINUE");
assert.strictEqual(activeRuntime.beatId,"v2_pickpocket_clean_success");
assert.strictEqual(state().knowledge.getCloserContingency,true);
next();assert.strictEqual(state().package.holder,"ANBU");

// Get Closer failure -> Sakura cutoff -> 2-v-1 -> Police custody.
reset({"academy_kakashi.v2.get_closer":"GET_CLOSER_FAILURE"});
enter("v2_scene02_tail");choose("MOVE IN CLOSER");choose("CONTINUE");choose("CUT THEM OFF AT THE SAKURA TREE");next();
returnBattle("v2_cutoff_win",{encounterId:"academy_kakashi_origin_battle_amt_ps_2v1",actions:4});
choose("TAKE THEM TO THE UCHIHA POLICE FORCE");
assert.strictEqual(state().package.holder,"ANBU");
assert.strictEqual(state().participants.AMT.state,"POLICE_CUSTODY");
assert.strictEqual(state().participants.PS.state,"POLICE_CUSTODY");
assert.strictEqual(state().participants.MI.state,"UNSEEN");

console.log(JSON.stringify({
  pass:true,
  beatCount:def.beats.length,
  graphReachableFromEntry:fromEntry.size,
  graphCanReachCompletion:toComplete.size,
  terminalConvergence:"ANBU_REPORT -> MINATO -> CHRONICLE_RECEIPT -> COMPLETE",
  scenarioFamiliesValidated:10,
  completionCalls,
  browserGoldenClaimed:false
},null,2));
