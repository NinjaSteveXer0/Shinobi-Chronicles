// ============================================================================
// ISSUE #343 — ACADEMY WASABI IZUNO / ROGUE GENIN BATTLE ADAPTER
//
// Coding owner: exact Battle entry/return glue for Academy Wasabi's WRITING
// GOLDEN STEP IN branch. Story/World truth remains owned by 32900 + IZU-04.
// ============================================================================
(function installAcademyWasabiRogueGeninBattle34300(){
"use strict";
if(globalThis.SC_ACADEMY_WASABI_BATTLE_34300)return;

const PATCH_ID="academy_wasabi_rogue_genin_battle_34300_2026_09_24";
const PLAYER="academy_izuno";
const HISTORICAL="wasabi_origin_rogue_genin_01";
const TEMPLATE="rogue_genin";
const AFFECTED="wasabi_origin_interference_student";
const SOURCE_OCCURRENCE="occ_origin_izuno_rogue_genin_interruption_resolution";
const CONFIG_ID="academy_izuno_origin_rogue_genin_step_in_battle";
const ENCOUNTER_ID="origin_academy_izuno_rogue_genin_step_in";
const SCENE_ID="origin_academy_izuno_prologue";
const FEINT_STATE="rogue_genin_substitution_feint_ready";

const CONFIG=Object.freeze({
  id:CONFIG_ID,
  encounterId:ENCOUNTER_ID,
  playerParticipantId:PLAYER,
  historicalParticipantRef:HISTORICAL,
  oppositionTemplateId:TEMPLATE,
  sourceOccurrenceId:SOURCE_OCCURRENCE,
  affectedParticipantRef:AFFECTED,
  rewards:Object.freeze({ryo:0,exp:0,items:Object.freeze([]),rareDrops:Object.freeze([])})
});
const PROFILE=Object.freeze({
  id:HISTORICAL,
  name:"ROGUE GENIN",
  rank:"Rogue Genin",
  pl:23,
  stats:Object.freeze({nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24}),
  image:"Enemies Portraits/rogue_genin.png"
});

function clone(v){try{return typeof cloneBattleRuntimeValue==="function"?cloneBattleRuntimeValue(v):JSON.parse(JSON.stringify(v));}catch(_){return v;}}
function meta(){
  if(!currentBattle)return null;
  return currentBattle.wasabiOrigin34300||(currentBattle.wasabiOrigin34300={
    patchId:PATCH_ID,battleConfigId:CONFIG_ID,battleOccurrenceId:null,
    sourceOccurrenceId:SOURCE_OCCURRENCE,historicalParticipantRef:HISTORICAL,
    oppositionTemplateId:TEMPLATE,affectedParticipantRef:AFFECTED,
    feintSpent:false,feintReady:false
  });
}
function findFeint(){
  try{
    return typeof findBattleTransientState==="function"
      ?findBattleTransientState({stateKey:FEINT_STATE,sourceSide:"enemy",sourceParticipantId:HISTORICAL,targetSide:"enemy",targetParticipantId:HISTORICAL})||null
      :null;
  }catch(_error){return null;}
}
function expireFeintAtNextRogueOpportunity(){
  const m=meta();
  if(!m||m.feintReady!==true)return false;
  const state=findFeint();
  if(state&&typeof removeBattleTransientState==="function")removeBattleTransientState(state.stateId);
  m.feintReady=false;
  return !!state;
}
function direct(id,attackPL){
  const action={
    id,skillId:id,displayName:id==="enemy_rogue_genin_kunai_rush"?"Kunai Rush":"Shuriken Spread",
    actionClass:"enemy_authored_action",resolutionKind:"direct_damage",
    primaryDiscipline:"Bukijutsu",authoredAttackPL:attackPL,mechanicalPacketCount:1,
    traits:["one_authored_damage_packet","ordinary_stamina_mitigation"],
    evaluateAvailability({enemy,target}){return{available:!!enemy&&!!target,reason:enemy&&target?null:"participant_missing"};},
    resolve({enemy,target,envelope}){
      if(!enemy||!target)return{resolved:false,reason:"participant_missing"};
      const fixed=makeEnemyFixedDamageAction(id,attackPL,{primaryDiscipline:"Bukijutsu",traits:["one_authored_damage_packet"]});
      return fixed.resolve({enemy,target,envelope,currentBattle});
    }
  };
  return action;
}
function feint(){
  const id="enemy_rogue_genin_substitution_feint";
  const base=makeEnemyRatioGuardAction(id,0.40,{stateKey:FEINT_STATE,traits:["once_per_battle","one_packet_guard","direct_mitigable_only"]});
  return{
    id,skillId:id,displayName:"Substitution Feint",
    actionClass:"enemy_context_technique",resolutionKind:"ratio_guard_state",
    primaryDiscipline:"Ninjutsu",
    traits:["once_per_battle","one_packet_guard","direct_mitigable_only","no_auto_miss","no_counter"],
    guard:Object.freeze({preventionRatio:0.40,oneUse:true,stateKey:FEINT_STATE,beforeStamina:true}),
    evaluateAvailability({enemy,target}){
      const m=meta();
      if(!enemy||!target)return{available:false,reason:"participant_missing"};
      if(m&&m.feintSpent===true)return{available:false,reason:"once_per_battle_used"};
      if(findFeint())return{available:false,reason:"feint_already_active"};
      return{available:true,reason:null};
    },
    resolve(ctx){
      const m=meta();
      if(!m)return{resolved:false,reason:"wasabi_battle_meta_missing"};
      if(m.feintSpent===true)return{resolved:false,reason:"once_per_battle_used"};
      const result=base.resolve(ctx);
      if(result&&result.resolved===true){
        m.feintSpent=true;
        m.feintReady=true;
      }
      return result;
    }
  };
}

function registerProfile(){
  if(typeof enemyDatabase!=="object"||!enemyDatabase)return{success:false,reason:"enemy_database_missing"};
  const template=enemyDatabase[TEMPLATE]||{};
  enemyDatabase[HISTORICAL]={
    ...template,
    id:HISTORICAL,name:"ROGUE GENIN",rank:"Rogue Genin",
    power:23,calibratedBasePL:23,
    baseStats:{...PROFILE.stats},stats:{...PROFILE.stats},
    image:template.image||PROFILE.image,
    rewards:{ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},
    provenance:{
      origin:"academy_wasabi_origin",
      historicalParticipantRef:HISTORICAL,
      oppositionTemplateId:TEMPLATE,
      sourceOccurrenceId:SOURCE_OCCURRENCE,
      noAutoScaling:true,
      stagedExternalProvenance:"intentionally_unresolved"
    },
    noSummon:true,noTransformation:true,noBossScaling:true
  };
  enemyDatabase[HISTORICAL].authoredBattleActions=[
    direct("enemy_rogue_genin_kunai_rush",9),
    direct("enemy_rogue_genin_shuriken_spread",7),
    feint()
  ];
  return{success:true};
}
const profileRegistration=registerProfile();
if(!profileRegistration.success)throw new Error("wasabi_343_rogue_profile_registration_failed:"+profileRegistration.reason);

const PRIOR_CHOOSE=typeof chooseEnemyAuthoredBattleAction==="function"?chooseEnemyAuthoredBattleAction:null;
function chooseWasabiRogueAction34300(state={}){
  const enemy=state.enemy||null,target=state.target||null;
  if(!enemy||enemy.id!==HISTORICAL)return PRIOR_CHOOSE?PRIOR_CHOOSE(state):{success:false,reason:"no_shared_enemy_scheduler"};
  // The Feint expires at the beginning of the Rogue Genin's next action
  // opportunity if no qualifying direct packet consumed it first.
  expireFeintAtNextRogueOpportunity();
  const actions=Array.isArray(enemy.authoredBattleActions)?enemy.authoredBattleActions:[];
  const eligible=actions.filter(action=>{
    if(!action)return false;
    if(typeof action.evaluateAvailability!=="function")return true;
    const row=action.evaluateAvailability({enemy,target,currentBattle});
    return !!(row&&row.available===true);
  });
  if(!eligible.length)return{success:false,reason:"no_semantically_eligible_enemy_action",eligibleActionIds:[]};
  const index=Math.min(eligible.length-1,Math.floor(Math.random()*eligible.length));
  return{
    success:true,action:eligible[index],
    eligibleActionIds:eligible.map(a=>a.id),
    randomnessAppliedAfterEligibility:true,
    equalSelectionWeight:true,
    wasabiOrigin34300:true
  };
}
globalThis.chooseEnemyAuthoredBattleAction=chooseWasabiRogueAction34300;
try{chooseEnemyAuthoredBattleAction=globalThis.chooseEnemyAuthoredBattleAction;}catch(_error){}

function battleOccurrenceId(sceneInstanceId){
  return "battle_occ_origin_izuno_rogue_genin_step_in:"+String(sceneInstanceId||"");
}
function receiptStore(){
  if(!playerData.wasabiOriginBattle34300||typeof playerData.wasabiOriginBattle34300!=="object"){
    playerData.wasabiOriginBattle34300={receipts:{}};
  }
  if(!playerData.wasabiOriginBattle34300.receipts||typeof playerData.wasabiOriginBattle34300.receipts!=="object"){
    playerData.wasabiOriginBattle34300.receipts={};
  }
  return playerData.wasabiOriginBattle34300.receipts;
}
function recordLaunchReceipt(id,sceneInstanceId){
  const store=receiptStore();
  if(store[id])return{success:true,idempotent:true,receipt:clone(store[id])};
  const receipt={
    battleOccurrenceId:id,
    sourceOccurrenceId:SOURCE_OCCURRENCE,
    historicalParticipantRef:HISTORICAL,
    affectedParticipantRef:AFFECTED,
    oppositionTemplateId:TEMPLATE,
    battleConfigId:CONFIG_ID,
    encounterId:ENCOUNTER_ID,
    sceneInstanceId:String(sceneInstanceId||""),
    committed:true
  };
  store[id]=receipt;
  if(typeof recordBattleEvidence==="function"){
    recordBattleEvidence({
      eventType:"origin_battle_occurrence_started",committedOccurrence:true,
      actorRef:{side:"player",participantId:PLAYER},
      targetRef:{side:"enemy",participantId:HISTORICAL},
      sourceRefs:[
        {type:"story_source_occurrence",id:SOURCE_OCCURRENCE},
        {type:"historical_participant",id:HISTORICAL},
        {type:"affected_participant",id:AFFECTED},
        {type:"opposition_template",id:TEMPLATE}
      ],
      data:clone(receipt)
    });
  }
  try{savePlayerData();saveTestState();}catch(_error){}
  return{success:true,idempotent:false,receipt:clone(receipt)};
}

function launch(spec={}){
  const rc=spec.returnContext;
  if(!rc||rc.type!=="story_scene"||String(rc.sceneId)!==SCENE_ID)return{success:false,reason:"wasabi_343_story_return_context_invalid"};
  const sceneInstanceId=String(rc.sceneInstanceId||spec.storyOccurrenceId||"");
  if(!sceneInstanceId)return{success:false,reason:"wasabi_343_scene_instance_missing"};
  const occurrenceId=battleOccurrenceId(sceneInstanceId);

  const prior=receiptStore()[occurrenceId];
  if(prior&&currentBattle&&currentBattle.wasabiOrigin34300&&currentBattle.wasabiOrigin34300.battleOccurrenceId===occurrenceId&&currentBattle.battleOver!==true){
    return{success:true,idempotent:true,battleId:currentBattle.battleId||null,battleOccurrenceId:occurrenceId,battleConfigId:CONFIG_ID,encounterId:ENCOUNTER_ID};
  }

  const launched=launchBattleWithReturnContext(HISTORICAL,ENCOUNTER_ID,{
    ...clone(rc),
    battleConfigId:CONFIG_ID,
    sourceOccurrenceId:SOURCE_OCCURRENCE,
    historicalParticipantRef:HISTORICAL,
    oppositionTemplateId:TEMPLATE,
    returnToken:"wasabi_rogue_step_in"
  });
  if(!launched||launched.success!==true)return launched||{success:false,reason:"wasabi_343_battle_launch_failed"};

  if(typeof configureBattlePlayerParticipants==="function")configureBattlePlayerParticipants([PLAYER]);
  const composed=configureBattleEnemyParticipants([HISTORICAL]);
  if(!Array.isArray(composed)||composed.length!==1||composed[0].id!==HISTORICAL)return{success:false,reason:"wasabi_343_enemy_deployment_not_exact_1v1"};

  initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true});
  const players=[1,2,3,4].map(slot=>getBattleDeploymentParticipant("player",slot)).filter(Boolean);
  const enemies=[1,2,3,4].map(slot=>getBattleDeploymentParticipant("enemy",slot)).filter(Boolean);
  if(players.length!==1||players[0].id!==PLAYER)return{success:false,reason:"wasabi_343_player_deployment_not_exact_1v1",participantIds:players.map(p=>p.id)};
  if(enemies.length!==1||enemies[0].id!==HISTORICAL)return{success:false,reason:"wasabi_343_enemy_deployment_not_exact_1v1",participantIds:enemies.map(p=>p.id)};
  if(getBattleRemainingPL("enemy",HISTORICAL)!==23)return{success:false,reason:"wasabi_343_rogue_genin_pl_not_23",remainingBattlePL:getBattleRemainingPL("enemy",HISTORICAL)};

  currentBattle.encounterId=ENCOUNTER_ID;
  currentBattle.wasabiOrigin34300={
    patchId:PATCH_ID,battleConfigId:CONFIG_ID,battleOccurrenceId:occurrenceId,
    sourceOccurrenceId:SOURCE_OCCURRENCE,historicalParticipantRef:HISTORICAL,
    affectedParticipantRef:AFFECTED,oppositionTemplateId:TEMPLATE,
    feintSpent:false,feintReady:false,rewardEntitlement:{ryo:0,exp:0,items:[],rareDrops:[]}
  };
  const receipt=recordLaunchReceipt(occurrenceId,sceneInstanceId);
  if(!receipt.success)return receipt;
  try{savePlayerData();saveTestState();openOverlay("combat");}catch(_error){}
  return{
    success:true,battleId:currentBattle.battleId||launched.battleId||null,
    battleOccurrenceId:occurrenceId,battleConfigId:CONFIG_ID,encounterId:ENCOUNTER_ID,
    playerParticipantIds:[PLAYER],enemyParticipantIds:[HISTORICAL],receipt:receipt.receipt
  };
}

function projectResult(){
  const m=currentBattle&&currentBattle.wasabiOrigin34300;
  if(!m)return null;
  const outcome=currentBattle.outcome&&String(currentBattle.outcome.type||"").toLowerCase();
  const result=outcome==="victory"?"victory":outcome==="defeat"?"defeat":"unresolved";
  const rogueDepleted=Number(getBattleRemainingPL("enemy",HISTORICAL))<=0;
  const wasabiDepleted=Number(getBattleRemainingPL("player",PLAYER))<=0;
  return{
    battleOccurrenceId:m.battleOccurrenceId,
    sourceOccurrenceId:SOURCE_OCCURRENCE,
    historicalParticipantRef:HISTORICAL,
    oppositionTemplateId:TEMPLATE,
    battleResult:result,
    rogueGeninBattlePLDepleted:rogueDepleted,
    wasabiBattlePLDepleted:wasabiDepleted
  };
}

function diagnostics(){
  const row=enemyDatabase&&enemyDatabase[HISTORICAL];
  const actions=row&&Array.isArray(row.authoredBattleActions)?row.authoredBattleActions:[];
  const kunai=actions.find(a=>a.id==="enemy_rogue_genin_kunai_rush");
  const spread=actions.find(a=>a.id==="enemy_rogue_genin_shuriken_spread");
  const substitution=actions.find(a=>a.id==="enemy_rogue_genin_substitution_feint");
  const checks={
    exactConfig:CONFIG.id==="academy_izuno_origin_rogue_genin_step_in_battle"&&CONFIG.encounterId==="origin_academy_izuno_rogue_genin_step_in",
    exactIdentity:CONFIG.historicalParticipantRef===HISTORICAL&&CONFIG.oppositionTemplateId===TEMPLATE&&CONFIG.sourceOccurrenceId===SOURCE_OCCURRENCE,
    exactPL:!!row&&row.calibratedBasePL===23&&JSON.stringify(row.baseStats)===JSON.stringify({nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24}),
    exactThreeActions:actions.length===3,
    kunaiOnePacket:!!kunai&&kunai.authoredAttackPL===9&&kunai.mechanicalPacketCount===1&&kunai.primaryDiscipline==="Bukijutsu",
    spreadOnePacket:!!spread&&spread.authoredAttackPL===7&&spread.mechanicalPacketCount===1&&spread.primaryDiscipline==="Bukijutsu",
    exactFeint:!!substitution&&substitution.guard&&substitution.guard.preventionRatio===0.40&&substitution.guard.oneUse===true&&substitution.guard.beforeStamina===true&&substitution.guard.stateKey===FEINT_STATE,
    feintBounded:String(chooseWasabiRogueAction34300).includes("expireFeintAtNextRogueOpportunity")&&String(feint).includes("feintSpent"),
    semanticEligibilityBeforeRandom:String(chooseWasabiRogueAction34300).includes("evaluateAvailability")&&String(chooseWasabiRogueAction34300).includes("Math.random")&&String(chooseWasabiRogueAction34300).indexOf("evaluateAvailability")<String(chooseWasabiRogueAction34300).indexOf("Math.random"),
    deterministicReceipt:String(battleOccurrenceId("scene")).startsWith("battle_occ_origin_izuno_rogue_genin_step_in:scene"),
    zeroBattleReward:CONFIG.rewards.ryo===0&&CONFIG.rewards.exp===0&&CONFIG.rewards.items.length===0&&CONFIG.rewards.rareDrops.length===0,
    exactResultEnvelope:["battleOccurrenceId","sourceOccurrenceId","historicalParticipantRef","oppositionTemplateId","battleResult","rogueGeninBattlePLDepleted","wasabiBattlePLDepleted"].every(k=>String(projectResult).includes(k)),
    noStoryOutcomeOwnership:!String(projectResult).includes("pursuitOutcome")&&!String(projectResult).includes("morality")&&!String(projectResult).includes("custody"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,config:CONFIG,profile:PROFILE,browserGoldenClaimed:false};
}

globalThis.launchAcademyWasabiRogueGeninBattle34300=launch;
globalThis.projectAcademyWasabiRogueGeninBattleResult34300=projectResult;
globalThis.getAcademyWasabiBattleOccurrenceId34300=battleOccurrenceId;
globalThis.runAcademyWasabiBattle34300Diagnostics=diagnostics;
globalThis.SC_ACADEMY_WASABI_BATTLE_34300=Object.freeze({
  patchId:PATCH_ID,config:CONFIG,profile:PROFILE,launch,projectResult,browserGoldenClaimed:false
});
})();
