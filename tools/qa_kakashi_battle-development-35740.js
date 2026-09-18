#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const path=require("path");
const assert=require("assert");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

globalThis.playerData={ryo:0,exp:0,inventory:[]};
const discipline={};
let saves=0,chronicleCalls=0;
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.saveTestState=()=>true;
globalThis.addDisciplineExp=(subject,id,amount)=>{
  const key=subject+"::"+id;discipline[key]=(discipline[key]||0)+Number(amount||0);return true;
};
globalThis.getCharacterDisciplineProgression=(subject,id)=>({subjectId:subject,disciplineId:id,exp:discipline[subject+"::"+id]||0});
const defs={
  field_recovery_pill:{id:"field_recovery_pill",name:"Field Recovery Pill",type:"consumable",rarity:"Common",stackable:true},
  academy_training_tanto:{id:"academy_training_tanto",name:"Academy Training Tanto",type:"weapon",rarity:"Rare",stackable:false}
};
globalThis.getItemDefinition=id=>defs[id]||null;
globalThis.addItemToInventory=item=>{
  if(!item)return false;
  const def=defs[item.id]||item;
  if(def.stackable){
    const existing=playerData.inventory.find(row=>row.id===def.id&&!row.instanceId);
    if(existing)existing.quantity=Number(existing.quantity||0)+1;
    else playerData.inventory.push({...def,quantity:1});
  }else playerData.inventory.push({...def,quantity:1,instanceId:def.id+"_"+(playerData.inventory.length+1)});
  return true;
};

const KAKASHI="academy_kakashi";
const MI="academy_kakashi_origin_masked_interceptor";
const battleId="qa-kakashi-mi-1";
globalThis.currentBattle={
  battleId,
  active:false,
  battleOver:true,
  outcome:{type:"victory"},
  enemy:{id:MI,name:"MASKED INTERCEPTOR"},
  activePlayer:{id:KAKASHI,name:"Academy Kakashi"},
  kakashiOriginDeployment:{
    battleConfigId:"academy_kakashi_origin_battle_mi_1v1",
    battleOccurrenceId:battleId,
    storyOccurrenceId:"qa-origin-occurrence-1",
    controllerParticipantId:KAKASHI,
    oppositionParticipantIds:[MI]
  },
  runtime:{evidence:[
    {evidenceId:"ev-attempt-1",battleId,actionId:"a1",eventType:"action_attempted",actorRef:{side:"player",participantId:KAKASHI},targetRef:{side:"enemy",participantId:MI},skillId:"academy_kakashi_kunai_quickdraw",data:{actionClass:"skill"}},
    {evidenceId:"ev-damage-1",battleId,actionId:"a1",eventType:"damage_resolved",actorRef:{side:"player",participantId:KAKASHI},targetRef:{side:"enemy",participantId:MI},skillId:"academy_kakashi_kunai_quickdraw",data:{primaryDiscipline:"Bukijutsu",resolvedAttackPL:5,staminaMitigationAmount:1,finalDamage:4,remainingBattlePLBefore:14,remainingBattlePLAfter:10}},
    {evidenceId:"ev-attempt-2",battleId,actionId:"a2",eventType:"action_attempted",actorRef:{side:"player",participantId:KAKASHI},targetRef:{side:"enemy",participantId:MI},skillId:"academy_kakashi_clone_feint",data:{actionClass:"skill"}},
    {evidenceId:"ev-enemy-damage",battleId,actionId:"e1",eventType:"damage_resolved",actorRef:{side:"enemy",participantId:MI},targetRef:{side:"player",participantId:KAKASHI},skillId:"enemy_decoy_assassin_concealed_blade",data:{primaryDiscipline:"Bukijutsu",resolvedAttackPL:5,effectiveStamina:10,staminaMitigationAmount:2,finalDamage:3,remainingBattlePLBefore:15,remainingBattlePLAfter:12}}
  ]},
  rewards:{generated:false,claimed:false,ryo:0,exp:0,items:[],rareDrops:[]}
};
globalThis.getBattleParticipantByIdentity=(side,id)=>side==="player"&&id===KAKASHI?currentBattle.activePlayer:null;
globalThis.getBattlePreparedSkillDefinition=(_actor,id)=>({
  academy_kakashi_kunai_quickdraw:{id,primaryDiscipline:"Bukijutsu"},
  academy_kakashi_clone_feint:{id,primaryDiscipline:"Ninjutsu"}
}[id]||null);

globalThis.generateBattleRewards=function baseGenerate(_enemy,finisher){
  currentBattle.rewards={generated:true,claimed:false,ryo:0,exp:0,items:[],rareDrops:[],finishingShinobi:finisher&&finisher.name||null};
  return currentBattle.rewards;
};
globalThis.projectAcademyKakashiOriginBattleResult=()=>({
  battleConfigId:currentBattle.kakashiOriginDeployment.battleConfigId,
  battleOccurrenceId:battleId,
  resultState:"player_side_victory",
  rewardGranted:false
});
globalThis.createBattleChronicleResult=()=>({
  battleId,
  rewards:{
    exp:Number(currentBattle.rewards&&currentBattle.rewards.exp)||0,
    ryo:Number(currentBattle.rewards&&currentBattle.rewards.ryo)||0,
    items:(currentBattle.rewards&&currentBattle.rewards.items||[]).map(x=>({id:x.id,name:x.name,amount:1})),
    progression:[]
  }
});
globalThis.recordBattleChronicle=()=>{chronicleCalls+=1;return true;};
globalThis.claimCurrentBattleRewards=function baseClaim(){
  throw new Error("qualifying MI reward must not fall through to generic base claim");
};
globalThis.renderVictoryOverlay=()=>true;

load("runtime/alpha-kakashi-origin-rewards-34800.js");
load("runtime/alpha-kakashi-battle-development-35740.js");

const first=globalThis.generateBattleRewards(currentBattle.enemy,currentBattle.activePlayer);
assert.strictEqual(first.generated,true);
assert.strictEqual(first.ryo,50,"Exact solo MI victory must project immediate 50 Ryō");
assert.strictEqual(first.exp,0,"Battle development must not route into generic player EXP");
assert.strictEqual(first.items.length,1);
assert.strictEqual(first.items[0].id,"field_recovery_pill");
assert.deepStrictEqual(first.rareDrops,[]);
assert.strictEqual(first.kakashiImmediateMiBattleReward,true);
assert.strictEqual(first.requiresExplicitPostClaimContinue,true);
assert.strictEqual(first.claimed,false);
assert.strictEqual(first.kakashiOriginDevelopment,true);
assert.strictEqual(first.terminalOriginRewardDeferred,true);
assert.deepStrictEqual(first.progression,[
  {type:"discipline_exp",discipline:"ninjutsu",amount:1},
  {type:"discipline_exp",discipline:"bukijutsu",amount:2},
  {type:"discipline_exp",discipline:"stamina",amount:1}
]);
assert.strictEqual(currentBattle.kakashiOriginDevelopmentSummary.totalExp,4);
assert.strictEqual(discipline[KAKASHI+"::buki"],2);
assert.strictEqual(discipline[KAKASHI+"::nin"],1);
assert.strictEqual(discipline[KAKASHI+"::stamina"],1);
assert.strictEqual(playerData.exp,0);
assert.strictEqual(playerData.ryo,0,"Material Battle reward must remain entitlement-only before claim");
assert.strictEqual(playerData.inventory.length,0,"Pill must not be owned before claim");

let immediateState=globalThis.getAcademyKakashiMiVictoryBattleRewardState34800(currentBattle);
assert.strictEqual(immediateState.success,true);
assert.strictEqual(immediateState.claimed,false);
assert.strictEqual(immediateState.entitlement.materialReward.ryo,50);

// Reprojection/retry must not double-award development or material ownership.
const again=globalThis.syncAcademyKakashiBattleDevelopment35740();
assert.strictEqual(again.success,true);
assert.strictEqual(again.summary.totalExp,4);
assert.strictEqual(discipline[KAKASHI+"::buki"],2);
assert.strictEqual(discipline[KAKASHI+"::nin"],1);
assert.strictEqual(discipline[KAKASHI+"::stamina"],1);
assert.strictEqual(playerData.ryo,0);
assert.strictEqual(playerData.inventory.length,0);

let projected=globalThis.projectAcademyKakashiOriginBattleResult();
assert.strictEqual(projected.developmentSummary.totalExp,4);
assert.strictEqual(projected.developmentSummary.terminalOriginRewardDeferred,true);
assert.strictEqual(projected.rewardGranted,false);
assert.strictEqual(projected.immediateBattleReward.claimed,false);

// Claim commits the exact material package once and does not grant development twice.
let claimed=globalThis.claimCurrentBattleRewards();
assert.strictEqual(claimed,true);
assert.strictEqual(playerData.ryo,50);
assert.strictEqual(playerData.inventory.filter(row=>row.id==="field_recovery_pill").reduce((n,row)=>n+Number(row.quantity||1),0),1);
assert.strictEqual(currentBattle.rewards.claimed,true);
assert.strictEqual(currentBattle.rewards.requiresExplicitPostClaimContinue,true);
assert.strictEqual(discipline[KAKASHI+"::buki"],2);
assert.strictEqual(discipline[KAKASHI+"::nin"],1);
assert.strictEqual(discipline[KAKASHI+"::stamina"],1);
assert(chronicleCalls>=1);

// Idempotent repeat / reload-style reconciliation: no extra Ryō or pill.
claimed=globalThis.claimCurrentBattleRewards();
assert.strictEqual(claimed,true);
assert.strictEqual(playerData.ryo,50);
assert.strictEqual(playerData.inventory.filter(row=>row.id==="field_recovery_pill").reduce((n,row)=>n+Number(row.quantity||1),0),1);

projected=globalThis.projectAcademyKakashiOriginBattleResult();
assert.strictEqual(projected.rewardGranted,true);
assert.strictEqual(projected.immediateBattleReward.claimed,true);

const chronicle=globalThis.createBattleChronicleResult();
assert.strictEqual(chronicle.rewards.ryo,50);
assert.strictEqual(chronicle.rewards.items[0].id,"field_recovery_pill");
assert.deepStrictEqual(chronicle.rewards.progression,[
  {type:"discipline_exp",discipline:"ninjutsu",amount:1},
  {type:"discipline_exp",discipline:"bukijutsu",amount:2},
  {type:"discipline_exp",discipline:"stamina",amount:1}
]);
assert.strictEqual(chronicle.rewards.terminalOriginRewardDeferred,true);

// Same once-per-Origin pill source must not grant a second pill at terminal debrief.
const terminal=globalThis.commitAcademyKakashiTerminalDebriefRewards34800({
  terminalDebriefReached:true,packageRecovered:false,verifiedActionableIntelligence:false,
  liveCustodyEstablished:false,exceptionalFieldExecution:false,
  materiallyParticipatedInPlBattle:true,exceptionalTrainingTantoPredicate:false
});
assert.strictEqual(terminal.success,true);
assert.strictEqual(terminal.ryo,100);
assert.strictEqual(playerData.ryo,150,"Immediate 50 + terminal 100 must remain separate reward classes");
assert.strictEqual(playerData.inventory.filter(row=>row.id==="field_recovery_pill").reduce((n,row)=>n+Number(row.quantity||1),0),1,"terminal debrief must not duplicate immediate MI pill");

const snap=globalThis.getAcademyKakashiOriginRewardSnapshot34800();
const receipts=Object.values(snap.sources);
assert(receipts.some(r=>r.kind==="discipline_development"&&r.payload.discipline==="bukijutsu"&&r.payload.amount===2));
assert(receipts.some(r=>r.kind==="discipline_development"&&r.payload.discipline==="ninjutsu"&&r.payload.amount===1));
assert(receipts.some(r=>r.kind==="stamina_development"&&r.payload.amount===1));
assert(Object.values(snap.battleClaims).some(r=>r.claimFamily==="kak_origin_battle_mi_victory_reward_claim_v1"&&r.committed===true));

const diag=globalThis.runAcademyKakashiBattleDevelopment35740Diagnostics();
assert.strictEqual(diag.pass,true,"35740 diagnostics failed: "+JSON.stringify(diag.failed));
assert.strictEqual(diag.browserGoldenClaimed,false);
assert(saves>0);

console.log("Academy Kakashi Story Battle development + immediate MI reward 35740 QA: PASS");
console.log("- exact action evidence -> discipline development through 34800");
console.log("- solo MI victory -> immediate 50 Ryō + Field Recovery Pill ×1 entitlement");
console.log("- claim commits material package exactly once; no generic EXP");
console.log("- claim retry/reprojection does not duplicate Ryō, pill or development");
console.log("- terminal debrief remains separate and same-source pill does not duplicate");
console.log("- Battle Chronicle carries 50 Ryō, pill and committed development");
