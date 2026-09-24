#!/usr/bin/env node
"use strict";

const fs=require("fs"),vm=require("vm"),assert=require("assert");

const STORY="runtime/alpha-origin-scenes-32900-a.js";
const CATALOGUE="runtime/academy-wasabi-writing-golden-343.js";
const BATTLE="runtime/alpha-wasabi-rogue-battle-343.js";
const DOC="Documentation/Story/Academy_Wasabi_Izuno_Origin_WRITING_GOLDEN_2026-09-24.md";
for(const p of [STORY,CATALOGUE,BATTLE,DOC])assert(fs.existsSync(p),"missing #343 authority/runtime file "+p);

const storySource=fs.readFileSync(STORY,"utf8");
const catalogueSource=fs.readFileSync(CATALOGUE,"utf8");
const battleSource=fs.readFileSync(BATTLE,"utf8");
const doc=fs.readFileSync(DOC,"utf8");

const scenes=new Map(),commits=[];
let activeRt={sceneId:"origin_academy_izuno_prologue",instanceId:"qa-wasabi-scene",localContext:{},battleResume:null};
const A={
  sceneByVariant:{academy_hinata:"origin_academy_hinata_prologue",academy_izuno:"origin_academy_izuno_prologue",academy_mirai:"origin_academy_mirai_prologue"},
  clone(v){return v&&typeof v==="object"?JSON.parse(JSON.stringify(v)):v;},
  active(){return activeRt;},
  local(){return activeRt&&activeRt.localContext||{};},
  choice(choiceId,label,nextBeatId,contextPatch=null,extra={}){return{choiceId,label,nextBeatId,contextPatch,...extra};},
  commitRequest(requestId,originId,occurrenceId,factResolver,rowIdsResolver,optionsResolver){
    return{requestId,kind:"domain",__originId:originId,__occurrenceId:occurrenceId,__factResolver:factResolver,__rowIdsResolver:rowIdsResolver,__optionsResolver:optionsResolver,resolve:()=>({success:true})};
  },
  completionRequest(originId,evidenceIds){return{requestId:"complete_"+originId+"_origin_32900",kind:"domain",__originId:originId,__evidenceIds:evidenceIds,resolve:()=>({success:true})};},
  unavailableBattle(_scene,label){return()=>({available:false,knownBlocker:label});},
  commitOccurrence(originId,occurrenceId,fact,rowIds,options){
    const prior=commits.find(x=>x.occurrenceId===occurrenceId);
    if(prior)return{success:true,idempotent:true,record:prior};
    const row={originId,occurrenceId,fact:JSON.parse(JSON.stringify(fact||{})),rowIds:[...(rowIds||[])],options:JSON.parse(JSON.stringify(options||{}))};
    commits.push(row);return{success:true,record:row};
  },
  register(def){const copy={...def,beatMap:new Map((def.beats||[]).map(b=>[b.beatId,b]))};scenes.set(def.sceneId,copy);return{success:true,sceneId:def.sceneId};}
};
const storyCtx={console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,SC_ALPHA_ORIGIN_32900:A,savePlayerData:()=>true};
storyCtx.globalThis=storyCtx;
vm.createContext(storyCtx);
vm.runInContext(catalogueSource,storyCtx,{filename:CATALOGUE});
assert.strictEqual(storyCtx.runAcademyWasabiWritingGolden343Diagnostics().pass,true,JSON.stringify(storyCtx.runAcademyWasabiWritingGolden343Diagnostics(),null,2));
vm.runInContext(storySource,storyCtx,{filename:STORY});

const def=scenes.get("origin_academy_izuno_prologue");
assert(def,"Wasabi GOLDEN scene missing");
const beats=def.beats||[],byId=def.beatMap;
const wasabiSource=storySource.slice(storySource.indexOf("// Wasabi Izuno"),storySource.indexOf("// Mirai"));
function labels(id){const b=byId.get(id);assert(b,"missing beat "+id);return Array.from(b.choices||[],x=>String(x.label));}
function choice(id,cid){const b=byId.get(id);assert(b,"missing beat "+id);const x=(b.choices||[]).find(v=>v.choiceId===cid);assert(x,"missing choice "+id+"/"+cid);return x;}
function tail(prefix){const rows=beats.filter(b=>b.beatId.startsWith(prefix+"_")).sort((a,b)=>Number(a.beatId.slice(prefix.length+1))-Number(b.beatId.slice(prefix.length+1)));assert(rows.length,"missing sequence "+prefix);return rows.at(-1);}
function cueTexts(prefix){return beats.filter(b=>b.beatId.startsWith(prefix+"_")).map(b=>b.text);}

// Exact current player choice surfaces.
assert.deepStrictEqual(labels("izu_initial_choice"),[
  "TAKE THE OBVIOUS TRAIL","LOOK FOR SOMETHING BETTER","WORK WITH THE OTHERS","FORGET THE TRAIL — WHERE ARE THEY GOING?"
]);
assert.deepStrictEqual(labels("izu_split_choice"),["TAKE THE RIVER","FOLLOW THE STRONGER TRAIL","CHECK THE SHOUTING","CUT FOR THE INTERCEPT"]);
assert.deepStrictEqual(labels("izu_rogue_choice"),["STEP IN","CALL FOR HELP","KEEP PURSUING"]);
assert.deepStrictEqual(labels("izu_reflect"),[
  "Next time I'm trusting the trail.","Next time I'm trusting what I notice.","Sometimes the fastest path isn't the obvious one.","Catching them wasn't the only thing that mattered."
]);

// Approved voice/dialogue anchors from Writing GOLDEN.
for(const [prefix,line] of [
  ["izu_open","That's not a time."],
  ["izu_initial_obvious","Catch up and ask me!"],
  ["izu_initial_better","Yeah. That's the problem."],
  ["izu_initial_cooperate","You didn't pick me!"],
  ["izu_initial_predict","We'll find out!"],
  ["izu_rogue_step_in","So do you."],
  ["izu_rogue_call_help","INSTRUCTOR!"],
  ["izu_intercept","Hi."],
  ["izu_close","The exercise is over!"]
]) assert(cueTexts(prefix).includes(line),"missing GOLDEN line "+prefix+" :: "+line);
assert(storyCtx.SC_ACADEMY_WASABI_WRITING_GOLDEN_343.get("eval_rogue_call_help").some(c=>c.text==="You handed it off."));
assert(storyCtx.SC_ACADEMY_WASABI_WRITING_GOLDEN_343.get("eval_rogue_keep_pursuing").some(c=>c.text==="The instructor doesn't mention the Rogue Genin first."));

// Closed graph and one legal PL Battle seam only.
const ids=new Set(beats.map(b=>b.beatId));
for(const b of beats){
  if(b.nextBeatId)assert(ids.has(b.nextBeatId),"missing next target "+b.beatId+" -> "+b.nextBeatId);
  for(const ch of b.choices||[])if(ch.nextBeatId)assert(ids.has(ch.nextBeatId),"missing choice target "+b.beatId+"/"+ch.choiceId);
  if(b.battle){
    assert.strictEqual(b.beatId,"izu_rogue_step_in_battle","unauthorised Wasabi PL Battle "+b.beatId);
    assert.strictEqual(b.battle.encounterId,"origin_academy_izuno_rogue_genin_step_in");
    assert.strictEqual(b.battle.victoryBeatId,"izu_rogue_step_in_return_1");
    assert.strictEqual(b.battle.defeatBeatId,"izu_rogue_step_in_return_1");
  }
}
assert.strictEqual(beats.filter(b=>b.battle).length,1,"Wasabi must have exactly one authorised Battle seam");
const reachable=new Set([def.entryBeatId]),queue=[def.entryBeatId];
while(queue.length){
  const id=queue.shift(),b=byId.get(id);if(!b)continue;
  const targets=[
    b.nextBeatId,
    ...(b.choices||[]).map(x=>x.nextBeatId),
    b.battle&&b.battle.victoryBeatId,
    b.battle&&b.battle.defeatBeatId
  ].filter(Boolean);
  for(const t of targets)if(!reachable.has(t)){reachable.add(t);queue.push(t);}
}
const unreachable=Array.from(beats,b=>b.beatId).filter(id=>!reachable.has(id));
assert.strictEqual(unreachable.length,0,"unreachable Wasabi GOLDEN beats: "+unreachable.join(","));

// Exact factual source addresses.
for(const id of [
  "occ_origin_izuno_pursuit_tracking_resolution",
  "occ_origin_izuno_intercept_prediction_resolution",
  "occ_origin_izuno_pursuit_cooperation_resolution",
  "occ_origin_izuno_rogue_genin_interruption_resolution"
])assert(wasabiSource.includes(id),"missing Wasabi source occurrence "+id);
assert(wasabiSource.includes('"wasabi_origin_rogue_genin_01"')&&wasabiSource.includes('"wasabi_origin_interference_student"'));

// IZU-02 is actual prediction intercept, not merely choosing prediction thinking earlier.
const interceptReq=byId.get("izu_after_base_1").onEnterConsequences.find(x=>x.requestId==="izu_intercept_32900");
assert(interceptReq,"IZU-02 request missing");
assert.deepStrictEqual(JSON.parse(JSON.stringify(interceptReq.__factResolver({outcome:"intercept_before_extraction"}))),{
  interceptReachedByPrediction:true,pursuitOutcome:"intercept_before_extraction"
});
assert.deepStrictEqual(JSON.parse(JSON.stringify(interceptReq.__rowIdsResolver({outcome:"intercept_before_extraction"}))),["IZU-02"]);
assert.deepStrictEqual(JSON.parse(JSON.stringify(interceptReq.__rowIdsResolver({predictionApproach:true,outcome:"arrive_just_after_target"}))),[]);

// Rogue response remains separate from pursuit outcome.
assert.deepStrictEqual(JSON.parse(JSON.stringify(choice("izu_rogue_choice","intervene").contextPatch)),{
  rogueGeninResponse:"intervene",rogueResponse:"intervene",rogueResolved:false,outcome:"secondary_occurrence_costs_pursuit"
});
assert.deepStrictEqual(JSON.parse(JSON.stringify(choice("izu_rogue_choice","call_for_help").contextPatch)),{
  rogueGeninResponse:"call_for_help",rogueResponse:"call_for_help",rogueGeninInterruptionResolvedByWasabiAction:true,rogueResolved:true,battleOccurrenceIds:[],outcome:"secondary_occurrence_costs_pursuit"
});
assert.deepStrictEqual(JSON.parse(JSON.stringify(choice("izu_rogue_choice","keep_pursuing").contextPatch)),{
  rogueGeninResponse:"keep_pursuing",rogueResponse:"keep_pursuing",rogueGeninInterruptionResolvedByWasabiAction:false,rogueResolved:false,battleOccurrenceIds:[],outcome:"secondary_occurrence_costs_pursuit"
});

const afterReqs=byId.get("izu_after_base_1").onEnterConsequences;
const rogueReq=afterReqs.find(x=>x.requestId==="izu_rogue_32900");
assert(rogueReq,"IZU-04 conditional request missing");
activeRt.localContext={rogueGeninResponse:"keep_pursuing",rogueResolved:false,battleOccurrenceIds:[]};
const skipped=rogueReq.resolve();
assert.strictEqual(skipped.success,true);assert.strictEqual(skipped.skipped,true);
assert.strictEqual(commits.some(x=>x.occurrenceId==="occ_origin_izuno_rogue_genin_interruption_resolution"),false,"KEEP PURSUING counterfeited resolved IZU-04");
activeRt.localContext={rogueGeninResponse:"call_for_help",rogueResolved:true,battleOccurrenceIds:[]};
const callCommit=rogueReq.resolve();
assert.strictEqual(callCommit.success,true);
const izu04=commits.find(x=>x.occurrenceId==="occ_origin_izuno_rogue_genin_interruption_resolution");
assert(izu04&&izu04.fact.rogueGeninResponse==="call_for_help");
assert.strictEqual(izu04.fact.rogueGeninInterruptionResolvedByWasabiAction,true);
assert.deepStrictEqual(izu04.fact.battleOccurrenceIds,[]);
assert.deepStrictEqual(izu04.rowIds,["IZU-04"]);

// Battle return records factual Battle result without turning victory into pursuit truth.
commits.length=0;
activeRt.localContext={rogueGeninResponse:"intervene",rogueResolved:false,outcome:"secondary_occurrence_costs_pursuit"};
const battleReturn=byId.get("izu_rogue_step_in_return_1").onEnterConsequences[0];
const br=battleReturn.resolve({sceneContext:{battleResume:{authored:{
  battleOccurrenceId:"battle_occ_origin_izuno_rogue_genin_step_in:qa-wasabi-scene",
  sourceOccurrenceId:"occ_origin_izuno_rogue_genin_interruption_resolution",
  historicalParticipantRef:"wasabi_origin_rogue_genin_01",
  oppositionTemplateId:"rogue_genin",
  battleResult:"victory",rogueGeninBattlePLDepleted:true,wasabiBattlePLDepleted:false
}}}});
assert.strictEqual(br.success,true,JSON.stringify(br));
assert.strictEqual(activeRt.localContext.rogueGeninResponse,"intervene");
assert.strictEqual(activeRt.localContext.rogueResolved,true);
assert.deepStrictEqual(activeRt.localContext.battleOccurrenceIds,["battle_occ_origin_izuno_rogue_genin_step_in:qa-wasabi-scene"]);
assert.strictEqual(activeRt.localContext.outcome,"secondary_occurrence_costs_pursuit","Battle victory rewrote pursuit result");

// No morality/personality/progression invention and no retired fail-closed STEP IN.
for(const forbidden of ["personalityTrait","alignment","specialization","morality","A.unavailableBattle(scene,\"STEP IN\"","rogueGeninDefeated"]){
  assert(!wasabiSource.includes(forbidden),"forbidden Wasabi inference/retired seam returned: "+forbidden);
}

// Battle adapter executes under bounded mocks.
const ratioCalls=[],evidenceRows=[];
const battleCtx={
  console,JSON,Object,Array,String,Number,Boolean,Set,Map,Date,globalThis:null,
  Math:Object.create(Math),
  playerData:{},currentBattle:null,enemyDatabase:{},
  makeEnemyFixedDamageAction:(id,pl,opts={})=>({id,skillId:id,actionClass:"enemy_authored_action",traits:opts.traits||[],authoredAttackPL:pl,evaluateAvailability:()=>({available:true}),resolve:()=>({resolved:true})}),
  makeEnemyRatioGuardAction:(id,ratio,opts={})=>{ratioCalls.push({id,ratio,opts});return{id,skillId:id,actionClass:"enemy_ratio_guard",traits:opts.traits||[],evaluateAvailability:()=>({available:true}),resolve:()=>({resolved:true})};},
  chooseEnemyAuthoredBattleAction:()=>({success:false,reason:"qa_generic"}),
  generateBattleRewards:()=>({generated:true,claimed:false,ryo:88,exp:77,items:[{id:"bad"}],rareDrops:[{id:"bad_rare"}]}),
  evaluateEnemyActionScheduler:()=>({ready:true,enemyId:"wasabi_origin_rogue_genin_01",eligibleActions:[]}),
  findBattleTransientState:()=>null,removeBattleTransientState:()=>true,
  getBattleActionOpportunityIndex:()=>0,
  getPlayerCharacter:id=>id==="academy_izuno"?{id}:null,
  createBattleDeploymentSlots:ids=>ids.map((participantId,index)=>({slot:index+1,participantId})),
  syncBattleActivePlayerFromDeployment:()=>{battleCtx.currentBattle.activePlayer={id:battleCtx.currentBattle.deployment.player.slots[0].participantId};},
  configureBattleEnemyParticipants:ids=>ids.map(id=>battleCtx.enemyDatabase[id]),
  syncBattleActiveEnemyFromDeployment:()=>{battleCtx.currentBattle.activeEnemy={id:battleCtx.currentBattle.deployment.enemy.slots[0].participantId};},
  initializeBattleContributionRecordsFromDeployment:()=>true,
  initializeBattleRemainingPLFromDeployment:()=>true,
  initializeBattlePouchFromPreparedSelection:()=>true,
  initializeBattleAttachedSummonRuntimeFromDeployment:()=>true,
  initializeBattleDedicatedVariantRuntimePackages:()=>true,
  initializeBattleKisoganStartsActiveFromDeployment:()=>true,
  launchBattleWithReturnContext:(enemyId,encounterId,returnContext)=>{
    battleCtx.currentBattle={active:true,battleOver:false,battleId:"generic-"+Date.now(),encounterId,returnContext,rewards:{ryo:99,exp:99,items:[1],rareDrops:[1]},deployment:{}};
    return{success:true,battleId:battleCtx.currentBattle.battleId,enemyId};
  },
  recordBattleEvidence:row=>{evidenceRows.push(JSON.parse(JSON.stringify(row)));return{evidenceId:"wasabi-evidence-"+evidenceRows.length};},
  createBattleParticipantRef:(side,participantId)=>({side,participantId}),
  getBattleRemainingPL:(side,id)=>side==="enemy"?23:15,
  savePlayerData:()=>true,saveTestState:()=>true,openOverlay:()=>true
};
battleCtx.globalThis=battleCtx;
vm.createContext(battleCtx);
vm.runInContext(battleSource,battleCtx,{filename:BATTLE});
const battleDiag=battleCtx.runAcademyWasabiRogueGeninBattle343Diagnostics();
assert.strictEqual(battleDiag.pass,true,JSON.stringify(battleDiag,null,2));
assert.deepStrictEqual(JSON.parse(JSON.stringify(ratioCalls[0])),{
  id:"enemy_rogue_genin_substitution_feint",ratio:0.4,
  opts:{stateKey:"rogue_genin_substitution_feint_ready",traits:["once_per_battle","single_target_direct_mitigable_attack_pl_packet_only","expires_before_rogue_next_action"]}
});

const enemy=battleCtx.enemyDatabase.wasabi_origin_rogue_genin_01;
assert(enemy&&enemy.calibratedBasePL===23);
assert.deepStrictEqual(JSON.parse(JSON.stringify(enemy.baseStats)),{nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24});
assert.strictEqual(enemy.oppositionTemplateId,"rogue_genin");
assert.deepStrictEqual(enemy.authoredBattleActions.map(a=>[a.id,a.authoredAttackPL??null]),[
  ["enemy_rogue_genin_kunai_rush",9],
  ["enemy_rogue_genin_shuriken_spread",7],
  ["enemy_rogue_genin_substitution_feint",null]
]);

const launchSpec={returnContext:{type:"story_scene",sceneId:"origin_academy_izuno_prologue",sceneInstanceId:"qa-wasabi-scene"},storyOccurrenceId:"qa-wasabi-scene"};
const launched=battleCtx.launchAcademyWasabiRogueGeninBattle343(launchSpec);
assert.strictEqual(launched.success,true,JSON.stringify(launched));
assert.strictEqual(launched.battleId,"battle_occ_origin_izuno_rogue_genin_step_in:qa-wasabi-scene");
assert.deepStrictEqual(battleCtx.currentBattle.deployment.player.slots.map(x=>x.participantId),["academy_izuno"]);
assert.deepStrictEqual(battleCtx.currentBattle.deployment.enemy.slots.map(x=>x.participantId),["wasabi_origin_rogue_genin_01"]);
assert.strictEqual(battleCtx.currentBattle.rewards.ryo,0);assert.strictEqual(battleCtx.currentBattle.rewards.exp,0);
assert.deepStrictEqual(battleCtx.currentBattle.rewards.items,[]);assert.deepStrictEqual(battleCtx.currentBattle.rewards.rareDrops,[]);
assert.strictEqual(battleCtx.currentBattle.rewards.requiresExplicitPostClaimContinue,true);
const generatedZero=battleCtx.generateBattleRewards({rewards:{ryo:{min:99,max:99}}},{id:"academy_izuno"});
assert.strictEqual(generatedZero.ryo,0);assert.strictEqual(generatedZero.exp,0);
assert.deepStrictEqual(generatedZero.items,[]);assert.deepStrictEqual(generatedZero.rareDrops,[]);
assert.strictEqual(generatedZero.requiresExplicitPostClaimContinue,true);
assert.strictEqual(generatedZero.wasabi343ZeroEntitlement,true);
assert.strictEqual(evidenceRows.length,1);
const replay=battleCtx.launchAcademyWasabiRogueGeninBattle343(launchSpec);
assert.strictEqual(replay.success,true);assert.strictEqual(replay.idempotent,true);assert.strictEqual(evidenceRows.length,1,"Battle launch replay duplicated evidence");
battleCtx.currentBattle=null;
const lostRuntime=battleCtx.launchAcademyWasabiRogueGeninBattle343(launchSpec);
assert.strictEqual(lostRuntime.success,false);assert.strictEqual(lostRuntime.reason,"wasabi_battle_occurrence_already_committed_without_runtime");
assert.strictEqual(evidenceRows.length,1);

// Equal-weight selection happens only after shared semantic eligibility.
battleCtx.currentBattle={active:true,wasabi343:{feintUsed:false,feintCreatedEnemyOpportunityIndex:null},runtime:{evidence:[]}};
const a1={id:"a1"},a2={id:"a2"};
battleCtx.Math.random=()=>0.75;
const selected=battleCtx.chooseEnemyAuthoredBattleAction({ready:true,enemyId:"wasabi_origin_rogue_genin_01",eligibleActions:[a1,a2]});
assert.strictEqual(selected.success,true);assert.strictEqual(selected.action.id,"a2");
assert.strictEqual(selected.equalSelectionWeight,true);assert.strictEqual(selected.randomnessAppliedAfterEligibility,true);
const none=battleCtx.chooseEnemyAuthoredBattleAction({ready:true,enemyId:"wasabi_origin_rogue_genin_01",eligibleActions:[]});
assert.strictEqual(none.success,false);assert.strictEqual(none.reason,"no_semantically_eligible_enemy_action");

// Result projection is observer-safe and does not invent death/custody/reward.
battleCtx.currentBattle={
  active:false,outcome:{type:"victory"},
  wasabi343:{battleOccurrenceId:"battle_occ_origin_izuno_rogue_genin_step_in:qa-wasabi-scene",sourceOccurrenceId:"occ_origin_izuno_rogue_genin_interruption_resolution",historicalParticipantRef:"wasabi_origin_rogue_genin_01",oppositionTemplateId:"rogue_genin"}
};
battleCtx.getBattleRemainingPL=(side)=>side==="enemy"?0:8;
const projected=battleCtx.projectAcademyWasabiRogueGeninBattle343();
assert.deepStrictEqual(Object.keys(projected).sort(),[
  "battleOccurrenceId","battleResult","historicalParticipantRef","oppositionTemplateId","rogueGeninBattlePLDepleted","sourceOccurrenceId","wasabiBattlePLDepleted"
].sort());
assert.strictEqual(projected.battleResult,"victory");assert.strictEqual(projected.rogueGeninBattlePLDepleted,true);assert.strictEqual(projected.wasabiBattlePLDepleted,false);

// Production loader order: catalogue before 32900-a, adapter after shared Battle.
const index=fs.readFileSync("index.html","utf8");
assert(index.indexOf("academy-wasabi-writing-golden-343.js")<index.indexOf("alpha-origin-scenes-32900-a.js"));
assert(index.indexOf("alpha-battle-modern-33000.js")<index.indexOf("alpha-wasabi-rogue-battle-343.js"));
assert(index.indexOf("alpha-wasabi-rogue-battle-343.js")<index.indexOf("alpha-alpha-sprint-33100.js"));

// Current Writing authority contains all implemented player choices.
for(const label of [
  "TAKE THE OBVIOUS TRAIL","LOOK FOR SOMETHING BETTER","WORK WITH THE OTHERS","FORGET THE TRAIL — WHERE ARE THEY GOING?",
  "TAKE THE RIVER","FOLLOW THE STRONGER TRAIL","CHECK THE SHOUTING","CUT FOR THE INTERCEPT",
  "STEP IN","CALL FOR HELP","KEEP PURSUING",
  "Next time I'm trusting the trail.","Next time I'm trusting what I notice.","Sometimes the fastest path isn't the obvious one.","Catching them wasn't the only thing that mattered."
])assert(doc.includes("**"+label+"**")||doc.includes("**“"+label+"”**"),"runtime choice absent from Writing GOLDEN: "+label);

console.log(JSON.stringify({
  pass:true,issue:343,sceneId:def.sceneId,beatCount:beats.length,
  exactWritingGoldenCatalogue:true,routeGraphClosed:true,
  sourceOccurrences:["IZU-01","IZU-02","IZU-03","IZU-04"],
  rogueBattle:{strictOneVsOne:true,basePL:23,actions:["9","7","40% guard"],zeroEntitlement:true,idempotentOccurrence:true},
  moralityInference:false,browserGoldenClaimed:false
},null,2));
