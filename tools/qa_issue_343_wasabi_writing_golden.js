#!/usr/bin/env node
"use strict";

const fs=require("fs"),vm=require("vm"),assert=require("assert");
const STORY="runtime/alpha-origin-scenes-32900-a.js";
const CONTENT="runtime/academy-wasabi-writing-golden-34300.js";
const BATTLE="runtime/alpha-wasabi-origin-battle-34300.js";
const DOC="Documentation/Story/Academy_Wasabi_Izuno_Origin_WRITING_GOLDEN_2026-09-24.md";
for(const p of [STORY,CONTENT,BATTLE,DOC])assert(fs.existsSync(p),"missing #343 authority file "+p);

const storySource=fs.readFileSync(STORY,"utf8");
const contentSource=fs.readFileSync(CONTENT,"utf8");
const battleSource=fs.readFileSync(BATTLE,"utf8");
const doc=fs.readFileSync(DOC,"utf8");

// ---------------------------------------------------------------------------
// Load exact Writing catalogue.
// ---------------------------------------------------------------------------
const contentCtx={console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null};
contentCtx.globalThis=contentCtx;vm.createContext(contentCtx);
vm.runInContext(contentSource,contentCtx,{filename:CONTENT});
const writing=contentCtx.SC_ACADEMY_WASABI_WRITING_GOLDEN_34300;
assert(writing,"Wasabi Writing-Golden catalogue missing");
assert.strictEqual(contentCtx.runAcademyWasabiWritingGolden34300Diagnostics().pass,true);

// Every catalogue cue must be exact player-facing source text.
const start=doc.indexOf("# PLAYER-FACING STORY");
const end=doc.indexOf("## Machine-facing preservation");
assert(start>=0&&end>start,"Wasabi GOLDEN player-facing bounds missing");
const playerFacing=doc.slice(start,end);
for(const [key,rows] of Object.entries(writing.sections)){
  for(const row of rows){
    assert(playerFacing.includes(row.text),`catalogue cue not found in GOLDEN: ${key}: ${row.text}`);
  }
}
assert(writing.sections.finish_direct.length>0,"DIRECT CATCH catalogue disappeared");
// There is no authored resolver mapping DIRECT CATCH to one of the current route
// choices. Keep the prose available, but do not invent a catch probability.
assert(!storySource.includes('G("finish_direct")'),"runtime invented an unauthorised DIRECT CATCH route selector");

// ---------------------------------------------------------------------------
// Load Story graph with metadata-preserving 32900 mocks.
// ---------------------------------------------------------------------------
const scenes=new Map();
function choice(choiceId,label,nextBeatId,contextPatch=null,extra={}){return{choiceId,label,nextBeatId,contextPatch,...extra};}
function commitRequest(requestId,originId,occurrenceId,factResolver,rowIdsResolver,optionsResolver){
  return{requestId,kind:"domain",__originId:originId,__occurrenceId:occurrenceId,__factResolver:factResolver,__rowIdsResolver:rowIdsResolver,__optionsResolver:optionsResolver,resolve:()=>({success:true})};
}
function completionRequest(originId,evidenceIds){
  return{requestId:`complete_${originId}_origin_32900`,kind:"domain",__originId:originId,__evidenceIds:evidenceIds,resolve:()=>({success:true})};
}
const A={
  sceneByVariant:{academy_hinata:"origin_academy_hinata_prologue",academy_izuno:"origin_academy_izuno_prologue",academy_mirai:"origin_academy_mirai_prologue"},
  choice,commitRequest,completionRequest,
  active:()=>({instanceId:"qa_wasabi_scene",battleResume:{outcome:"victory",authored:{battleResult:"victory",battleOccurrenceId:"battle_occ_origin_izuno_rogue_genin_step_in:qa_wasabi_scene"}}}),
  local:()=>({}),
  commitOccurrence:(originId,occurrenceId,fact,rowIds,options)=>({success:true,originId,occurrenceId,fact,rowIds,options}),
  register:def=>{const copy={...def,beatMap:new Map((def.beats||[]).map(b=>[b.beatId,b]))};scenes.set(def.sceneId,copy);return{success:true,sceneId:def.sceneId};}
};
const storyCtx={
  console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,
  SC_ALPHA_ORIGIN_32900:A,
  SC_ACADEMY_WASABI_WRITING_GOLDEN_34300:writing,
  SC_ACADEMY_WASABI_BATTLE_34300:{patchId:"qa"},
  launchAcademyWasabiRogueGeninBattle34300:()=>({success:true}),
  projectAcademyWasabiRogueGeninBattleResult34300:()=>({battleResult:"victory",battleOccurrenceId:"qa"}),
  savePlayerData:()=>true
};
storyCtx.globalThis=storyCtx;vm.createContext(storyCtx);
vm.runInContext(storySource,storyCtx,{filename:STORY});
const def=scenes.get("origin_academy_izuno_prologue");
assert(def,"Academy Wasabi GOLDEN scene missing");
const beats=def.beats||[],byId=def.beatMap;
function labels(id){const b=byId.get(id);assert(b,"missing beat "+id);return Array.from(b.choices||[],x=>x.label);}
assert.deepStrictEqual(labels("izu_initial_choice"),[
  "TAKE THE OBVIOUS TRAIL","LOOK FOR SOMETHING BETTER","WORK WITH THE OTHERS","FORGET THE TRAIL — WHERE ARE THEY GOING?"
]);
assert.deepStrictEqual(labels("izu_split_choice"),[
  "TAKE THE RIVER","FOLLOW THE STRONGER TRAIL","CHECK THE SHOUTING","CUT FOR THE INTERCEPT"
]);
assert.deepStrictEqual(labels("izu_rogue_choice"),["STEP IN","CALL FOR HELP","KEEP PURSUING"]);
assert.deepStrictEqual(labels("izu_reflect"),[
  "Next time I'm trusting the trail.",
  "Next time I'm trusting what I notice.",
  "Sometimes the fastest path isn't the obvious one.",
  "Catching them wasn't the only thing that mattered."
]);

// Exact graph integrity, including Battle terminal returns.
const ids=new Set(beats.map(b=>b.beatId));
for(const b of beats){
  if(b.nextBeatId)assert(ids.has(b.nextBeatId),`missing next beat ${b.beatId}->${b.nextBeatId}`);
  for(const ch of b.choices||[])if(ch.nextBeatId)assert(ids.has(ch.nextBeatId),`missing choice target ${b.beatId}/${ch.choiceId}`);
  if(b.battle){
    assert(ids.has(b.battle.victoryBeatId),`missing battle victory return ${b.beatId}`);
    assert(ids.has(b.battle.defeatBeatId),`missing battle defeat return ${b.beatId}`);
  }
}
const reachable=new Set([def.entryBeatId]),queue=[def.entryBeatId];
while(queue.length){
  const id=queue.shift(),b=byId.get(id);if(!b)continue;
  const targets=[b.nextBeatId,...(b.choices||[]).map(x=>x.nextBeatId),b.battle&&b.battle.victoryBeatId,b.battle&&b.battle.defeatBeatId].filter(Boolean);
  for(const t of targets)if(!reachable.has(t)){reachable.add(t);queue.push(t);}
}
assert.deepStrictEqual(beats.map(b=>b.beatId).filter(id=>!reachable.has(id)),[],"Wasabi GOLDEN graph has unreachable beats");

const battleBase=byId.get("izu_rogue_step_in_battle");
assert(battleBase&&battleBase.mode==="battle_transition","STEP IN Battle seam missing");
assert.strictEqual(battleBase.battle.encounterId,"origin_academy_izuno_rogue_genin_step_in");
assert.strictEqual(battleBase.battle.victoryBeatId,"izu_rogue_step_in_return_1");
assert.strictEqual(battleBase.battle.defeatBeatId,"izu_rogue_step_in_return_1");
assert.strictEqual(battleBase.battle.postBattleBeatId,"izu_rogue_step_in_return_1");
assert.strictEqual(battleBase.battle.actionLabel,"BEGIN PL BATTLE");
const battleCoop=byId.get("izu_rogue_step_in_battle_coop");
assert(battleCoop&&battleCoop.battle.victoryBeatId===battleCoop.battle.defeatBeatId,"cooperative STEP IN result split illegally");

// Runtime Story prose is sourced from GOLDEN catalogue only.
const wasabiStart=storySource.indexOf("// Wasabi Izuno — #343");
const miraiStart=storySource.indexOf("// Mirai",wasabiStart);
const wasabiSource=storySource.slice(wasabiStart,miraiStart);
for(const retired of [
  "Academy pursuit trial: find the target before they reach the extraction point.",
  "Choose how Wasabi begins.",
  "The route diverges.",
  "A Rogue Genin is interfering with another Academy student. This is a separate occurrence.",
  "The instructor evaluates route, evidence, target result and any secondary occurrence rather than reducing the Origin to catch/fail.",
  "No Speed/Agility stat, morality score or automatic specialization is created."
])assert(!wasabiSource.includes(retired),"retired compressed Wasabi prose returned: "+retired);
for(const forbidden of ["alignment=","morality=","personalityTrait","protectorSpecialization","escortSpecialization","speedStat","agilityStat"]){
  assert(!wasabiSource.includes(forbidden),"forbidden Wasabi semantic write: "+forbidden);
}
for(const exact of [
  "occ_origin_izuno_pursuit_tracking_resolution",
  "occ_origin_izuno_intercept_prediction_resolution",
  "occ_origin_izuno_pursuit_cooperation_resolution",
  "occ_origin_izuno_rogue_genin_interruption_resolution",
  "wasabi_origin_rogue_genin_01",
  "wasabi_origin_interference_student"
])assert(wasabiSource.includes(exact),"stable Wasabi authority missing: "+exact);

// No new hidden pursuit resolver/random chance was invented.
assert(!/Math\.random|random|roll/i.test(wasabiSource),"Wasabi Story invented random pursuit eligibility/outcome");
assert(wasabiSource.includes('outcome:"arrive_just_after_target"'));
assert(wasabiSource.includes('outcome:"false_trail_discovered"'));
assert(wasabiSource.includes('outcome:"secondary_occurrence_costs_pursuit"'));
assert(wasabiSource.includes('outcome:"intercept_before_extraction"'));

// Completion retains all four source occurrence addresses.
const complete=(def.onCompleteConsequences||[])[0];
assert(complete&&complete.__originId==="academy_izuno");
assert.deepStrictEqual(JSON.parse(JSON.stringify(complete.__evidenceIds)),[
  "occ_origin_izuno_pursuit_tracking_resolution",
  "occ_origin_izuno_intercept_prediction_resolution",
  "occ_origin_izuno_pursuit_cooperation_resolution",
  "occ_origin_izuno_rogue_genin_interruption_resolution"
]);

// ---------------------------------------------------------------------------
// Battle adapter executable source contract.
// ---------------------------------------------------------------------------
const deployment={player:[],enemy:[]},remaining={player:{},enemy:{}},battleEvidence=[];
const battleCtx={
  console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,
  enemyDatabase:{rogue_genin:{id:"rogue_genin",name:"ROGUE GENIN",image:"Enemies/rogue_genin.png"}},
  playerData:{},currentBattle:null,
  cloneBattleRuntimeValue:v=>v===undefined?undefined:JSON.parse(JSON.stringify(v)),
  makeEnemyFixedDamageAction:(id,attackPL,opts)=>({id,resolve:()=>({resolved:true,attackPL,opts})}),
  makeEnemyRatioGuardAction:(id,ratio,opts)=>({id,resolve:({enemy})=>{
    const state={stateId:"qa_feint",stateKey:opts.stateKey,sourceParticipantId:enemy.id};
    battleCtx.__transient=state;return{resolved:true,stateRefs:[state.stateId],ratio};
  }}),
  chooseEnemyAuthoredBattleAction:()=>({success:false,reason:"qa_prior"}),
  evaluateEnemyActionScheduler:()=>({ready:true,enemyId:"wasabi_origin_rogue_genin_01",eligibleActions:[]}),
  findBattleTransientState:query=>battleCtx.__transient&&battleCtx.__transient.stateKey===query.stateKey?battleCtx.__transient:null,
  removeBattleTransientState:id=>{if(battleCtx.__transient&&battleCtx.__transient.stateId===id)battleCtx.__transient=null;return true;},
  launchBattleWithReturnContext:(enemyId,encounterId,returnContext)=>{
    battleCtx.currentBattle={battleId:"qa_battle",active:true,battleOver:false,outcome:null,returnContext,activePlayer:{id:"academy_izuno"},runtime:{evidence:[]}};
    deployment.player=[{id:"academy_izuno",name:"Wasabi"}];
    deployment.enemy=[battleCtx.enemyDatabase[enemyId]];
    return{success:true,battleId:"qa_battle",encounterId};
  },
  configureBattlePlayerParticipants:ids=>{deployment.player=ids.map(id=>({id,name:id}));return deployment.player;},
  configureBattleEnemyParticipants:ids=>{deployment.enemy=ids.map(id=>battleCtx.enemyDatabase[id]);return deployment.enemy;},
  initializeBattleRemainingPLFromDeployment:()=>{
    remaining.player={academy_izuno:19};remaining.enemy={wasabi_origin_rogue_genin_01:23};return true;
  },
  getBattleDeploymentParticipant:(side,slot)=>(deployment[side]||[])[slot-1]||null,
  getBattleRemainingPL:(side,id)=>Number(remaining[side]&&remaining[side][id])||0,
  recordBattleEvidence:e=>{battleEvidence.push(e);return e;},
  savePlayerData:()=>true,saveTestState:()=>true,openOverlay:()=>true
};
battleCtx.globalThis=battleCtx;vm.createContext(battleCtx);
vm.runInContext(battleSource,battleCtx,{filename:BATTLE});
const bdiag=battleCtx.runAcademyWasabiBattle34300Diagnostics();
assert.strictEqual(bdiag.pass,true,JSON.stringify(bdiag,null,2));
const profile=battleCtx.enemyDatabase.wasabi_origin_rogue_genin_01;
assert(profile,"historical Rogue Genin Battle participant missing");
assert.strictEqual(profile.calibratedBasePL,23);
assert.deepStrictEqual(JSON.parse(JSON.stringify(profile.baseStats)),{nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24});
assert.deepStrictEqual(Array.from(profile.authoredBattleActions,a=>a.id),[
  "enemy_rogue_genin_kunai_rush",
  "enemy_rogue_genin_shuriken_spread",
  "enemy_rogue_genin_substitution_feint"
]);
const kunai=profile.authoredBattleActions[0],spread=profile.authoredBattleActions[1],sub=profile.authoredBattleActions[2];
assert.strictEqual(kunai.authoredAttackPL,9);
assert.strictEqual(kunai.mechanicalPacketCount,1);
assert.strictEqual(spread.authoredAttackPL,7);
assert.strictEqual(spread.mechanicalPacketCount,1);
assert.strictEqual(sub.guard.preventionRatio,0.40);
assert.strictEqual(sub.guard.beforeStamina,true);
assert(sub.traits.includes("once_per_battle")&&sub.traits.includes("no_auto_miss")&&sub.traits.includes("no_counter"));

assert.strictEqual(bdiag.checks.semanticEligibilityBeforeRandom,true,"Wasabi AI stopped consuming shared scheduler eligibility");
assert(!battleSource.includes("Basic Attack"),"Wasabi adapter invented a Basic Attack fallback");
battleCtx.currentBattle={wasabiOrigin34300:{historicalParticipantRef:"wasabi_origin_rogue_genin_01",feintReady:false},battleOver:false};
const schedulerPick=battleCtx.chooseEnemyAuthoredBattleAction({
  ready:true,
  enemyId:"wasabi_origin_rogue_genin_01",
  eligibleActions:[kunai,spread]
});
assert.strictEqual(schedulerPick.success,true);
assert(["enemy_rogue_genin_kunai_rush","enemy_rogue_genin_shuriken_spread"].includes(schedulerPick.action.id));
assert.deepStrictEqual(Array.from(schedulerPick.eligibleActionIds),["enemy_rogue_genin_kunai_rush","enemy_rogue_genin_shuriken_spread"]);
assert.strictEqual(schedulerPick.sharedSchedulerEligibility,true);
assert.strictEqual(schedulerPick.equalSelectionWeight,true);
assert(!schedulerPick.eligibleActionIds.includes("enemy_rogue_genin_substitution_feint"),"scheduler adapter reintroduced an ineligible Feint");
battleCtx.currentBattle=null;

const launch=battleCtx.launchAcademyWasabiRogueGeninBattle34300({
  battleConfigId:"academy_izuno_origin_rogue_genin_step_in_battle",
  storyOccurrenceId:"qa_scene",
  returnContext:{type:"story_scene",sceneId:"origin_academy_izuno_prologue",sceneInstanceId:"qa_scene",sourceBeatId:"izu_rogue_step_in_battle",victoryBeatId:"izu_rogue_step_in_return_1",defeatBeatId:"izu_rogue_step_in_return_1",postBattleBeatId:"izu_rogue_step_in_return_1"}
});
assert.strictEqual(launch.success,true,JSON.stringify(launch));
assert.deepStrictEqual(launch.playerParticipantIds,["academy_izuno"]);
assert.deepStrictEqual(launch.enemyParticipantIds,["wasabi_origin_rogue_genin_01"]);
assert.strictEqual(launch.battleOccurrenceId,"battle_occ_origin_izuno_rogue_genin_step_in:qa_scene");
assert.strictEqual(battleCtx.getBattleRemainingPL("enemy","wasabi_origin_rogue_genin_01"),23);
assert.strictEqual(battleEvidence.filter(e=>e.eventType==="origin_battle_occurrence_started").length,1);
const replay=battleCtx.launchAcademyWasabiRogueGeninBattle34300({
  battleConfigId:"academy_izuno_origin_rogue_genin_step_in_battle",
  storyOccurrenceId:"qa_scene",
  returnContext:{type:"story_scene",sceneId:"origin_academy_izuno_prologue",sceneInstanceId:"qa_scene"}
});
assert.strictEqual(replay.success,true);
assert.strictEqual(replay.idempotent,true);
assert.strictEqual(Object.keys(battleCtx.playerData.wasabiOriginBattle34300.receipts).length,1);

remaining.enemy.wasabi_origin_rogue_genin_01=0;
remaining.player.academy_izuno=11;
battleCtx.currentBattle.outcome={type:"victory"};
let projected=battleCtx.projectAcademyWasabiRogueGeninBattleResult34300();
assert.deepStrictEqual(JSON.parse(JSON.stringify(projected)),{
  battleOccurrenceId:"battle_occ_origin_izuno_rogue_genin_step_in:qa_scene",
  sourceOccurrenceId:"occ_origin_izuno_rogue_genin_interruption_resolution",
  historicalParticipantRef:"wasabi_origin_rogue_genin_01",
  oppositionTemplateId:"rogue_genin",
  battleResult:"victory",
  rogueGeninBattlePLDepleted:true,
  wasabiBattlePLDepleted:false
});
remaining.enemy.wasabi_origin_rogue_genin_01=9;
remaining.player.academy_izuno=0;
battleCtx.currentBattle.outcome={type:"defeat"};
projected=battleCtx.projectAcademyWasabiRogueGeninBattleResult34300();
assert.strictEqual(projected.battleResult,"defeat");
assert.strictEqual(projected.rogueGeninBattlePLDepleted,false);
assert.strictEqual(projected.wasabiBattlePLDepleted,true);
assert(!JSON.stringify(projected).match(/pursuitOutcome|morality|injury|custody|staged|external/i),"Battle result envelope leaked forbidden semantics");

// Zero standalone Battle reward and no alternate identity.
assert.strictEqual(bdiag.config.rewards.ryo,0);
assert.strictEqual(bdiag.config.rewards.exp,0);
assert.deepStrictEqual(Array.from(bdiag.config.rewards.items),[]);
assert.strictEqual(profile.provenance.oppositionTemplateId,"rogue_genin");
assert.strictEqual(profile.provenance.historicalParticipantRef,"wasabi_origin_rogue_genin_01");

const battleOperationalSource=battleSource.split("function diagnostics()")[0];
assert(!battleOperationalSource.includes("invokeBattleWithdrawAction"),"Wasabi adapter must not create a bespoke WITHDRAW path");
assert(!battleOperationalSource.match(/injur|morality|custody/i),"Wasabi Battle adapter leaked Story consequence semantics");

console.log(JSON.stringify({
  pass:true,
  issue:343,
  sceneId:def.sceneId,
  beatCount:beats.length,
  writingGoldenCatalogueCueCount:Object.values(writing.sections).flat().length,
  directCatchCatalogueRetainedWithoutInventedResolver:true,
  exactChoiceSurfaces:true,
  stableSourceOccurrences:true,
  stepInBattle:true,
  strictOneVsOne:true,
  rogueGeninBasePL:23,
  exactEnemyActions:3,
  deterministicBattleReceipt:true,
  zeroStandaloneBattleReward:true,
  resultSeparatedFromPursuit:true,
  browserGoldenClaimed:false
},null,2));
