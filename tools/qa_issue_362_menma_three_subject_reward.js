#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const vm=require("vm");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const SOURCE=fs.readFileSync(path.join(ROOT,"runtime/alpha-menma-origin-rewards-36200.js"),"utf8");

const CONFIG="academy_menma_origin_three_test_subjects_with_anko";
const ENCOUNTER="origin_academy_menma_prologue:three_test_subjects";
const OBJECTIVE="stop_three_test_subjects";
const SOURCE_ID="menma_origin_battle_three_test_subjects_victory_ryo_01";
const OLD_SOURCE="menma_origin_battle_altered_shinobi_victory_ryo_01";
const HOSTILES=["test_subject_altered_shinobi","test_subject_brute","test_subject_unstable"];
const ALLIES=["academy_menma","sj_anko"];
const SCENE="origin_academy_menma_prologue";
const INSTANCE="qa_scene_362";
const BATTLE_OCC="battle_occ_origin_academy_menma_three_test_subjects:"+INSTANCE;

function clone(v){return JSON.parse(JSON.stringify(v));}
function battle(){
  return{
    active:false,battleOver:true,battleId:"battle_issue_362",encounterId:ENCOUNTER,
    characterId:"academy_menma",
    enemy:{id:"test_subject_altered_shinobi",name:"Altered Shinobi",rewards:{ryo:{min:999,max:999},exp:{min:999,max:999},commonDrops:[],rareDrops:[]}},
    encounterEnemy:{id:"test_subject_altered_shinobi",name:"Altered Shinobi"},
    outcome:{type:"victory",committed:true,finishingShinobiId:"academy_menma",completedAt:1000},
    returnContext:{type:"story_scene",sceneId:SCENE,sceneInstanceId:INSTANCE,sourceBeatId:"tutorial_battle",victoryBeatId:"post_battle_opening",defeatBeatId:"tutorial_not_completed"},
    completedAt:1000,claimedAt:null,completionRecorded:false,
    rewards:{generated:false,claimed:false,ryo:0,exp:0,items:[],rareDrops:[],finishingShinobi:null,mvp:null},
    contributions:{}
  };
}
function battleReceipt(resolved,{result="victory",completed=true,menmaWithdrawn=false}={}){
  return{
    type:"battle_occurrence",activity:"battle",completed:result==="victory",committed:true,
    occurrenceId:BATTLE_OCC,sourceOccurrenceId:BATTLE_OCC,battleOccurrenceId:BATTLE_OCC,
    battleConfigId:CONFIG,encounterId:ENCOUNTER,objectiveId:OBJECTIVE,
    alliedParticipantIds:[...ALLIES],hostileParticipantIds:[...HOSTILES],
    battleResult:result,objectiveCompleted:completed,menmaWithdrawn,
    ankoWithdrawn:false,resolvedHostileIds:[...resolved]
  };
}
function sandbox({rows=[],ryo=250,current=battle()}={}){
  let genericGenerateCalls=0,genericClaimCalls=0,saveCalls=0,chronicleCalls=0;
  const activityHistory=clone(rows);
  const playerData={ryo,exp:0,inventory:[],activityHistory};
  const sb={
    console:{log(){},warn(){},error(){},info(){},table(){}},
    Date,JSON,Math,Object,Array,String,Number,Boolean,Set,Map,
    currentBattle:current,playerData,activityHistory,
    cloneProgressionData:clone,
    getActivityHistory:()=>activityHistory,
    getCurrentChronicleOccurrenceHistoryScope:()=>({scope:"origin"}),
    savePlayerData:()=>{playerData.activityHistory=activityHistory;saveCalls++;},
    saveTestState:()=>{saveCalls++;},
    recordBattleChronicle:()=>{
      chronicleCalls++;
      if(current.completionRecorded)return true;
      activityHistory.push({type:"battle",battleId:current.battleId,encounterId:current.encounterId,rewards:clone(current.rewards),success:true});
      current.completionRecorded=true;
      return true;
    },
    getPlayerCharacter:id=>id==="academy_menma"?{id,name:"Academy Menma"}:null,
    generateBattleRewards:()=>{genericGenerateCalls++;return{generated:true,claimed:false,ryo:999,exp:999,items:[{name:"ILLEGAL"}],rareDrops:[]};},
    claimCurrentBattleRewards:()=>{genericClaimCalls++;return true;},
    renderVictoryOverlay:()=>true,
    openOverlay:()=>true,
    document:{createElement:()=>({className:"",style:{cssText:""},textContent:"",appendChild(){},remove(){}})}
  };
  sb.globalThis=sb;
  vm.runInNewContext(SOURCE,sb,{filename:"alpha-menma-origin-rewards-36200.js"});
  return{
    sb,activityHistory,playerData,current,
    counters:()=>({genericGenerateCalls,genericClaimCalls,saveCalls,chronicleCalls})
  };
}

const diagnostics=sandbox().sb.runAcademyMenmaThreeSubjectReward36200Diagnostics();
assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics));

{
  const x=sandbox({rows:[battleReceipt([HOSTILES[0]],{result:"in_progress",completed:false})]});
  x.current.outcome=null;x.current.battleOver=false;x.current.active=true;
  const reward=x.sb.generateBattleRewards(x.current.enemy,{id:"academy_menma",name:"Academy Menma"});
  assert.strictEqual(reward.generated,false,"Altered-only withdrawal must not create a claimable reward");
  assert.strictEqual(reward.ryo,0,"Altered-only withdrawal paid Ryō");
  assert.strictEqual(x.counters().genericGenerateCalls,0,"successor encounter fell through to generic enemy reward");
  assert.strictEqual(x.sb.claimCurrentBattleRewards(),false,"partial encounter reward claim was accepted");
  assert.strictEqual(x.playerData.ryo,250,"partial encounter mutated currency");
}
{
  const x=sandbox({rows:[battleReceipt(HOSTILES.slice(0,2),{result:"in_progress",completed:false})]});
  x.current.outcome=null;x.current.battleOver=false;x.current.active=true;
  const reward=x.sb.generateBattleRewards(x.current.enemy,{id:"academy_menma",name:"Academy Menma"});
  assert.strictEqual(reward.generated,false,"two-hostile resolution must not create a claimable reward");
  assert.strictEqual(reward.ryo,0,"two-hostile resolution paid Ryō");
  assert.strictEqual(x.counters().genericGenerateCalls,0,"two-hostile state fell through to generic reward");
  assert.strictEqual(x.sb.claimCurrentBattleRewards(),false,"two-hostile claim was accepted");
  assert.strictEqual(x.playerData.ryo,250);
}
let persisted;
{
  const x=sandbox({rows:[battleReceipt(HOSTILES)]});
  const reward=x.sb.generateBattleRewards(x.current.enemy,{id:"academy_menma",name:"Academy Menma"});
  assert.strictEqual(reward.generated,true);
  assert.strictEqual(reward.ryo,100);
  assert.strictEqual(reward.exp,0);
  assert.deepStrictEqual(Array.from(reward.items),[]);
  assert.deepStrictEqual(Array.from(reward.rareDrops),[]);
  assert.strictEqual(x.counters().genericGenerateCalls,0,"full successor victory used generic random reward");
  const before=x.playerData.ryo;
  assert.strictEqual(x.sb.claimCurrentBattleRewards(),true,"full victory claim failed");
  assert.strictEqual(x.playerData.ryo,before+100,"full victory did not grant exactly 100 Ryō");
  const receipts=x.activityHistory.filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId===SOURCE_ID&&r.battleOccurrenceId===BATTLE_OCC);
  assert.strictEqual(receipts.length,1,"exact reward receipt missing/duplicated");
  assert.strictEqual(receipts[0].rewards.ryo,100);
  assert.strictEqual(receipts[0].rewards.exp,0);
  assert.deepStrictEqual(receipts[0].rewards.items,[]);
  assert.strictEqual(x.activityHistory.some(r=>r&&r.rewardSourceId===OLD_SOURCE),false,"retired 50-Ryō source was written");
  const after=x.playerData.ryo;
  assert.strictEqual(x.sb.claimCurrentBattleRewards(),false,"repeated claim should fail idempotently");
  assert.strictEqual(x.playerData.ryo,after,"repeated claim duplicated Ryō");
  persisted={rows:clone(x.activityHistory),ryo:x.playerData.ryo};
}
{
  const reloadedBattle=battle();
  reloadedBattle.rewards={generated:false,claimed:false,ryo:0,exp:0,items:[],rareDrops:[],finishingShinobi:null,mvp:null};
  reloadedBattle.claimedAt=null;reloadedBattle.completionRecorded=false;
  const x=sandbox({rows:persisted.rows,ryo:persisted.ryo,current:reloadedBattle});
  const projected=x.sb.ensureAcademyMenmaThreeSubjectRewardProjection36200();
  assert.strictEqual(projected.ready,true,"reload failed to recover exact entitlement");
  assert.strictEqual(x.current.rewards.claimed,true,"durable activity-history receipt did not repair claimed state");
  assert.strictEqual(x.current.rewards.ryo,100);
  const before=x.playerData.ryo;
  assert.strictEqual(x.sb.claimCurrentBattleRewards(),false,"reload/reclaim should not pay twice");
  assert.strictEqual(x.playerData.ryo,before,"reload/reclaim duplicated Ryō");
  assert.strictEqual(x.activityHistory.filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId===SOURCE_ID&&r.battleOccurrenceId===BATTLE_OCC).length,1);
}
{
  const x=sandbox({rows:[battleReceipt(HOSTILES,{result:"defeat",completed:false,menmaWithdrawn:true})]});
  x.current.outcome={type:"defeat",menmaWithdrawn:true};
  const reward=x.sb.generateBattleRewards(x.current.enemy,{id:"academy_menma",name:"Academy Menma"});
  assert.strictEqual(reward.generated,false,"Menma tutorial defeat exposed reward");
  assert.strictEqual(reward.ryo,0);
  assert.strictEqual(x.sb.claimCurrentBattleRewards(),false);
  assert.strictEqual(x.playerData.ryo,250);
}

console.log(JSON.stringify({
  pass:true,
  issue:362,
  rewardSourceId:SOURCE_ID,
  battleOccurrenceId:BATTLE_OCC,
  checks:{
    alteredWithdrawalPaysZero:true,
    twoHostilesPayZero:true,
    fullVictoryPaysExactly100Once:true,
    retired50SourceNeverWritten:true,
    noGenericExpLootOrDrops:true,
    activityHistoryReceiptSurvivesReload:true,
    repeatedClaimDoesNotDuplicate:true,
    menmaDefeatPaysZero:true
  },
  browserGoldenClaimed:false
},null,2));
