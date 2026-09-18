#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const path=require("path");
const assert=require("assert");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

globalThis.playerData={ryo:0,exp:0};
const discipline={};
let saves=0;
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.saveTestState=()=>true;
globalThis.addDisciplineExp=(subject,id,amount)=>{
  const key=subject+"::"+id;discipline[key]=(discipline[key]||0)+Number(amount||0);return true;
};
globalThis.getCharacterDisciplineProgression=(subject,id)=>({subjectId:subject,disciplineId:id,exp:discipline[subject+"::"+id]||0});
globalThis.addItemToInventory=()=>true;
globalThis.getItemDefinition=id=>({id,name:id});
globalThis.getInventoryItemQuantity=()=>0;

const KAKASHI="academy_kakashi";
const battleId="qa-kakashi-mi-1";
globalThis.currentBattle={
  battleId,
  active:false,
  battleOver:true,
  enemy:{id:"academy_kakashi_origin_masked_interceptor",name:"MASKED INTERCEPTOR"},
  activePlayer:{id:KAKASHI,name:"Academy Kakashi"},
  kakashiOriginDeployment:{
    battleConfigId:"academy_kakashi_origin_battle_mi_1v1",
    battleOccurrenceId:battleId,
    controllerParticipantId:KAKASHI,
    oppositionParticipantIds:["academy_kakashi_origin_masked_interceptor"]
  },
  runtime:{evidence:[
    {evidenceId:"ev-attempt-1",battleId,actionId:"a1",eventType:"action_attempted",actorRef:{side:"player",participantId:KAKASHI},targetRef:{side:"enemy",participantId:"academy_kakashi_origin_masked_interceptor"},skillId:"academy_kakashi_kunai_quickdraw",data:{actionClass:"skill"}},
    {evidenceId:"ev-damage-1",battleId,actionId:"a1",eventType:"damage_resolved",actorRef:{side:"player",participantId:KAKASHI},targetRef:{side:"enemy",participantId:"academy_kakashi_origin_masked_interceptor"},skillId:"academy_kakashi_kunai_quickdraw",data:{primaryDiscipline:"Bukijutsu",resolvedAttackPL:5,staminaMitigationAmount:1,finalDamage:4,remainingBattlePLBefore:14,remainingBattlePLAfter:10}},
    {evidenceId:"ev-attempt-2",battleId,actionId:"a2",eventType:"action_attempted",actorRef:{side:"player",participantId:KAKASHI},targetRef:{side:"enemy",participantId:"academy_kakashi_origin_masked_interceptor"},skillId:"academy_kakashi_clone_feint",data:{actionClass:"skill"}},
    {evidenceId:"ev-enemy-damage",battleId,actionId:"e1",eventType:"damage_resolved",actorRef:{side:"enemy",participantId:"academy_kakashi_origin_masked_interceptor"},targetRef:{side:"player",participantId:KAKASHI},skillId:"enemy_decoy_assassin_concealed_blade",data:{primaryDiscipline:"Bukijutsu",resolvedAttackPL:5,effectiveStamina:10,staminaMitigationAmount:2,finalDamage:3,remainingBattlePLBefore:15,remainingBattlePLAfter:12}}
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
  resultState:"player_side_victory"
});
globalThis.renderVictoryOverlay=()=>true;

load("runtime/alpha-kakashi-origin-rewards-34800.js");
load("runtime/alpha-kakashi-battle-development-35740.js");

const first=globalThis.generateBattleRewards(currentBattle.enemy,currentBattle.activePlayer);
assert.strictEqual(first.generated,true);
assert.strictEqual(first.ryo,0,"Story Battle must not invent Battle Ryō");
assert.strictEqual(first.exp,0,"Story Battle must not route discipline development into generic player EXP");
assert.deepStrictEqual(first.items,[]);
assert.deepStrictEqual(first.rareDrops,[]);
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
assert.strictEqual(playerData.ryo,0);

// Reprojection/retry must not double-award.
const again=globalThis.syncAcademyKakashiBattleDevelopment35740();
assert.strictEqual(again.success,true);
assert.strictEqual(again.summary.totalExp,4);
assert.strictEqual(discipline[KAKASHI+"::buki"],2);
assert.strictEqual(discipline[KAKASHI+"::nin"],1);
assert.strictEqual(discipline[KAKASHI+"::stamina"],1);

const projected=globalThis.projectAcademyKakashiOriginBattleResult();
assert.strictEqual(projected.developmentSummary.totalExp,4);
assert.strictEqual(projected.developmentSummary.terminalOriginRewardDeferred,true);

const snap=globalThis.getAcademyKakashiOriginRewardSnapshot34800();
const receipts=Object.values(snap.sources);
assert(receipts.some(r=>r.kind==="discipline_development"&&r.payload.discipline==="bukijutsu"&&r.payload.amount===2));
assert(receipts.some(r=>r.kind==="discipline_development"&&r.payload.discipline==="ninjutsu"&&r.payload.amount===1));
assert(receipts.some(r=>r.kind==="stamina_development"&&r.payload.amount===1));

const diag=globalThis.runAcademyKakashiBattleDevelopment35740Diagnostics();
assert.strictEqual(diag.pass,true,"35740 diagnostics failed: "+JSON.stringify(diag.failed));
assert.strictEqual(diag.browserGoldenClaimed,false);
assert(saves>0);

console.log("Academy Kakashi Story Battle development 35740 QA: PASS");
console.log("- exact action evidence -> discipline development through 34800");
console.log("- effective Bukijutsu +2 / committed Ninjutsu attempt +1 / Stamina mitigation +1");
console.log("- progression projects separately from generic EXP");
console.log("- no Battle Ryō / item / rare-drop fabrication");
console.log("- terminal Origin reward remains deferred");
console.log("- retry is source-idempotent");
