#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const runtimePath=path.join(root,"runtime","alpha-kakashi-origin-rewards-34800.js");
const src=fs.readFileSync(runtimePath,"utf8");
assert(src.includes("ACADEMY KAKASHI ORIGIN REWARD ADAPTER"));
assert(src.includes('const ROUTE="academy_kakashi_origin_reward"'));
assert(src.includes('const ITEM_SOURCE="kak_origin_item_field_recovery_resupply"'));
assert(src.includes('const WEAPON_SOURCE="kak_origin_weapon_exceptional_training_tanto"'));
assert(src.includes('const MI_REWARD_AUTHORITY_COMMIT="fe715e81cb76b3c4e4a7a8ccbc48ae04bc3b99da"'));
assert(src.includes('const MI_REWARD_FAMILY="kak_origin_battle_mi_victory_reward_v1"'));
assert(src.includes('const MI_REWARD_CLAIM_FAMILY="kak_origin_battle_mi_victory_reward_claim_v1"'));
assert(src.includes("addDisciplineExp"),"34800 must consume canonical discipline Progression");
assert(src.includes("addItemToInventory"),"34800 must consume canonical Inventory grant");
const terminalStart=src.indexOf("function commitTerminalDebriefRewards");
const terminalEnd=src.indexOf("function snapshot",terminalStart);
assert(terminalStart>=0&&terminalEnd>terminalStart,"terminal debrief commit owner missing");
const terminalSource=src.slice(terminalStart,terminalEnd);
assert(!terminalSource.includes("battleOver")&&!terminalSource.includes('outcome===\"victory\"'),"terminal reward commit must not infer entitlement from Battle victory");
assert(src.includes('if(facts.terminalDebriefReached!==true)return{success:false,reason:"terminal_debrief_required"}'),"terminal debrief factual gate missing");

const characterProgression={nin:{exp:0},tai:{exp:0},gen:{exp:0},buki:{exp:0},fuin:{exp:0},kin:{exp:0},stamina:{exp:0}};
const playerData={ryo:0,inventory:[]};
const legacyTrainingSources={nin:"exam",tai:"practical",gen:"exam",buki:"practical",fuin:"exam",kin:"battle",stamina:"practical"};
const extraTrainingSources=new Map();
const defs={
  field_recovery_pill:{id:"field_recovery_pill",name:"Field Recovery Pill",type:"consumable",stackable:true},
  academy_training_tanto:{id:"academy_training_tanto",name:"Academy Training Tanto",type:"weapon",weaponClass:"Tanto",stackable:false,statModifiers:{buki:1}}
};
let saves=0;
const context={
  console,globalThis:null,window:null,Set,Object,Array,String,Number,Boolean,JSON,Math,Date,Error,
  playerData,
  savePlayerData(){saves+=1;},
  saveTestState(){},
  registerDisciplineTrainingSource(source,disciplineIds=[]){
    const id=String(source||"").trim(),ids=[...new Set((Array.isArray(disciplineIds)?disciplineIds:[]).map(String).filter(key=>Object.prototype.hasOwnProperty.call(legacyTrainingSources,key)))];
    if(!id||!ids.length)return{success:false,reason:"discipline_training_source_registration_invalid"};
    const set=extraTrainingSources.get(id)||new Set();ids.forEach(key=>set.add(key));extraTrainingSources.set(id,set);
    return{success:true,source:id,disciplineIds:[...set]};
  },
  getRegisteredDisciplineTrainingSource(source){
    const set=extraTrainingSources.get(String(source||""));return set?{source:String(source),disciplineIds:[...set]}:null;
  },
  isValidDisciplineTrainingSource(disciplineId,source){
    return legacyTrainingSources[disciplineId]===source||!!(extraTrainingSources.get(String(source||""))&&extraTrainingSources.get(String(source||"")).has(disciplineId));
  },
  addDisciplineExp(characterId,disciplineId,amount,source){
    if(!context.isValidDisciplineTrainingSource(disciplineId,source))return false;
    assert.strictEqual(characterId,"academy_kakashi");
    if(!characterProgression[disciplineId])return false;
    characterProgression[disciplineId].exp+=Number(amount)||0;
    return {success:true,exp:characterProgression[disciplineId].exp};
  },
  getCharacterDisciplineProgression(characterId,disciplineId){
    assert.strictEqual(characterId,"academy_kakashi");
    return characterProgression[disciplineId]||null;
  },
  getItemDefinition(id){return defs[id]||null;},
  addItemToInventory(item){
    if(item.stackable){
      const existing=playerData.inventory.find(row=>row.id===item.id&&!row.instanceId);
      if(existing)existing.quantity=Number(existing.quantity||1)+1;
      else playerData.inventory.push({...item,quantity:1});
      return true;
    }
    playerData.inventory.push({...item,instanceId:`${item.id}_${playerData.inventory.length+1}`});
    return true;
  }
};
context.globalThis=context;context.window=context;
vm.createContext(context);vm.runInContext(src,context,{filename:"alpha-kakashi-origin-rewards-34800.js"});

const diag=JSON.parse(JSON.stringify(context.runAcademyKakashiOriginRewards34800Diagnostics()));
assert.strictEqual(diag.pass,true,`34800 diagnostics failed: ${(diag.failed||[]).join(",")}`);
assert.strictEqual(diag.browserGoldenClaimed,false);

// Battle victory alone is not a terminal reward source.
assert.strictEqual(context.evaluateAcademyKakashiTerminalDebriefRewards34800({terminalDebriefReached:false}).success,false);

// Exact solo Kakashi-vs-MI victory now owns one immediate material Battle reward.
const miBattle={
  battleId:"battle-mi-solo-1",battleOver:true,outcome:{type:"victory"},
  kakashiOriginDeployment:{
    battleConfigId:"academy_kakashi_origin_battle_mi_1v1",
    battleOccurrenceId:"battle-mi-solo-1",
    storyOccurrenceId:"origin-occurrence-1",
    controllerParticipantId:"academy_kakashi",
    oppositionParticipantIds:["academy_kakashi_origin_masked_interceptor"]
  }
};
let immediate=context.ensureAcademyKakashiMiVictoryBattleEntitlement34800(miBattle);
assert.strictEqual(immediate.success,true);assert.strictEqual(immediate.claimed,false);
let immediateState=context.getAcademyKakashiMiVictoryBattleRewardState34800(miBattle);
assert.strictEqual(immediateState.success,true);assert.strictEqual(immediateState.entitlement.materialReward.ryo,50);
assert.strictEqual(immediateState.entitlement.materialReward.items[0].itemId,"field_recovery_pill");
let immediateClaim=context.commitAcademyKakashiMiVictoryBattleReward34800(miBattle);
assert.strictEqual(immediateClaim.success,true);assert.strictEqual(immediateClaim.ryoGranted,50);
assert.strictEqual(playerData.ryo,50);
assert.strictEqual(playerData.inventory.filter(row=>row.id==="field_recovery_pill").reduce((n,row)=>n+Number(row.quantity||1),0),1);
immediateClaim=context.commitAcademyKakashiMiVictoryBattleReward34800(miBattle);
assert.strictEqual(immediateClaim.success,true);assert.strictEqual(immediateClaim.idempotent,true);
assert.strictEqual(playerData.ryo,50,"immediate claim retry must not duplicate Ryō");
assert.strictEqual(playerData.inventory.filter(row=>row.id==="field_recovery_pill").reduce((n,row)=>n+Number(row.quantity||1),0),1,"immediate claim retry must not duplicate pill");

// Loss and multi-target MI Battles do not qualify by implication.
const lossBattle=JSON.parse(JSON.stringify(miBattle));lossBattle.battleId="battle-mi-loss";lossBattle.outcome={type:"defeat"};lossBattle.kakashiOriginDeployment.battleOccurrenceId="battle-mi-loss";
assert.strictEqual(context.ensureAcademyKakashiMiVictoryBattleEntitlement34800(lossBattle).success,false);
const multiBattle=JSON.parse(JSON.stringify(miBattle));multiBattle.battleId="battle-mi-multi";multiBattle.kakashiOriginDeployment.battleOccurrenceId="battle-mi-multi";multiBattle.kakashiOriginDeployment.battleConfigId="academy_kakashi_origin_battle_ps_mi_2v1";multiBattle.kakashiOriginDeployment.oppositionParticipantIds=["academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"];
assert.strictEqual(context.ensureAcademyKakashiMiVictoryBattleEntitlement34800(multiBattle).success,false);

// Exact technical action development: effective +2, idempotent retry +0.
let r=context.recordAcademyKakashiTechnicalDevelopment34800({sourceId:"battle1_action1",discipline:"bukijutsu",executionClass:"effective",battleOccurrenceId:"battle1"});
assert.strictEqual(r.success,true);assert.strictEqual(r.amount,2);assert.strictEqual(characterProgression.buki.exp,2);
r=context.recordAcademyKakashiTechnicalDevelopment34800({sourceId:"battle1_action1",discipline:"bukijutsu",executionClass:"effective",battleOccurrenceId:"battle1"});
assert.strictEqual(r.idempotent,true);assert.strictEqual(characterProgression.buki.exp,2);
context.recordAcademyKakashiTechnicalDevelopment34800({sourceId:"battle1_action2",discipline:"bukijutsu",executionClass:"effective",battleOccurrenceId:"battle1"});
context.recordAcademyKakashiTechnicalDevelopment34800({sourceId:"battle1_action3",discipline:"bukijutsu",executionClass:"effective",battleOccurrenceId:"battle1"});
r=context.recordAcademyKakashiTechnicalDevelopment34800({sourceId:"battle1_action4",discipline:"bukijutsu",executionClass:"effective",battleOccurrenceId:"battle1"});
assert.strictEqual(characterProgression.buki.exp,6);assert.strictEqual(r.amount,0,"technical discipline Battle cap must be 6");

// Stamina development: positive mitigation only, max 2 per causal Battle.
assert.strictEqual(context.recordAcademyKakashiStaminaDevelopment34800({sourceId:"stam0",mitigationAmount:0,battleOccurrenceId:"battle1"}).success,false);
context.recordAcademyKakashiStaminaDevelopment34800({sourceId:"stam1",mitigationAmount:1,battleOccurrenceId:"battle1"});
context.recordAcademyKakashiStaminaDevelopment34800({sourceId:"stam2",mitigationAmount:2,battleOccurrenceId:"battle1"});
r=context.recordAcademyKakashiStaminaDevelopment34800({sourceId:"stam3",mitigationAmount:3,battleOccurrenceId:"battle1"});
assert.strictEqual(characterProgression.stamina.exp,2);assert.strictEqual(r.amount,0);

// Fieldcraft is evidence, not generic XP, and strengthens rather than duplicates.
context.recordAcademyKakashiFieldcraftEvidence34800({sourceId:"approach1",family:"fieldcraft.stealth_approach",evidenceType:"covert_approach_attempt",significance:1});
r=context.recordAcademyKakashiFieldcraftEvidence34800({sourceId:"approach2",family:"fieldcraft.stealth_approach",evidenceType:"undetected_positioning",significance:2});
assert.strictEqual(r.evidence.significance,2);assert.strictEqual(r.evidence.sourceIds.length,2);

// Terminal debrief package: exact max 250 and source-scoped Inventory grants once.
const facts={terminalDebriefReached:true,packageRecovered:true,verifiedActionableIntelligence:true,liveCustodyEstablished:true,exceptionalFieldExecution:true,materiallyParticipatedInPlBattle:true,exceptionalTrainingTantoPredicate:true};
r=context.commitAcademyKakashiTerminalDebriefRewards34800(facts);
assert.strictEqual(r.success,true);assert.strictEqual(r.ryo,250);assert.strictEqual(playerData.ryo,300);
assert.strictEqual(playerData.inventory.filter(row=>row.id==="field_recovery_pill").reduce((n,row)=>n+Number(row.quantity||1),0),1);
assert.strictEqual(playerData.inventory.filter(row=>row.id==="academy_training_tanto").length,1);
r=context.commitAcademyKakashiTerminalDebriefRewards34800(facts);
assert.strictEqual(r.success,true);assert.strictEqual(r.idempotent,true);assert.strictEqual(r.ryo,0);assert.strictEqual(playerData.ryo,300);
assert.strictEqual(playerData.inventory.filter(row=>row.id==="academy_training_tanto").length,1,"same-source retry must not duplicate weapon grant");

console.log(JSON.stringify({pass:true,adapter:"34800-v5",canonicalProgression:true,canonicalInventory:true,immediateSoloMiReward:{ryo:50,item:"field_recovery_pill",claimIdempotent:true},technicalBattleCap:6,staminaBattleCap:2,terminalRewardMaxRyo:250,immediateRewardOutsideDebriefCap:true,sourceScopedIdempotence:true,battleVictoryNotTerminalOriginReward:true,browserGoldenClaimed:false,saves},null,2));
