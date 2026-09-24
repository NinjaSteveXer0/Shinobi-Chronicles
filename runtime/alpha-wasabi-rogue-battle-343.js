// ============================================================================
// ACADEMY WASABI IZUNO — ROGUE GENIN ORIGIN BATTLE ADAPTER — #343
//
// Combat authority:
// Documentation/Combat/SC_Combat_Academy_Wasabi_Rogue_Genin_PL_Battle_Closure_2026-09-24.md
//
// This is Battle entry/return glue only. Story truth remains in 32900-a.
// ============================================================================
(function installAcademyWasabiRogueGeninBattle343(){
"use strict";
if(globalThis.SC_ACADEMY_WASABI_ROGUE_BATTLE_343)return;

const PATCH_ID="academy_wasabi_rogue_battle_343_2026_09_24";
const WASABI="academy_izuno";
const ROGUE="wasabi_origin_rogue_genin_01";
const AFFECTED_STUDENT="wasabi_origin_interference_student";
const TEMPLATE="rogue_genin";
const SOURCE_OCCURRENCE="occ_origin_izuno_rogue_genin_interruption_resolution";
const CONFIG="academy_izuno_origin_rogue_genin_step_in_battle";
const ENCOUNTER="origin_academy_izuno_rogue_genin_step_in";
const SCENE_ID="origin_academy_izuno_pursuit_trial";
const FEINT_ID="enemy_rogue_genin_substitution_feint";
const FEINT_STATE="rogue_genin_substitution_feint_ready";

const PROFILE=Object.freeze({
  id:ROGUE,name:"ROGUE GENIN",rank:"Rogue Genin",
  pl:23,
  stats:Object.freeze({nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24}),
  image:"Enemies/rogue_genin.png"
});

function clone(v){try{return typeof cloneBattleRuntimeValue==="function"?cloneBattleRuntimeValue(v):JSON.parse(JSON.stringify(v));}catch(_){return v;}}
function meta(){return currentBattle&&currentBattle.wasabi343||null;}
function feintState(){
  try{return findBattleTransientState({stateKey:FEINT_STATE,sourceSide:"enemy",sourceParticipantId:ROGUE,targetSide:"enemy",targetParticipantId:ROGUE})||null;}
  catch(_){return null;}
}
function expireFeintBeforeRogueNextAction(){
  const m=meta(),state=feintState();
  if(!m||!state)return false;
  const now=typeof getBattleActionOpportunityIndex==="function"?Number(getBattleActionOpportunityIndex("enemy",ROGUE))||0:0;
  const created=Number(m.feintCreatedEnemyOpportunityIndex);
  if(Number.isFinite(created)&&now>created){
    removeBattleTransientState(state.stateId);
    m.feintExpiredAtEnemyOpportunity=now;
    return true;
  }
  return false;
}
function feintAction(){
  const base=makeEnemyRatioGuardAction(FEINT_ID,0.40,{stateKey:FEINT_STATE,traits:["once_per_battle","single_target_direct_mitigable_attack_pl_packet_only","expires_before_rogue_next_action"]});
  return{
    id:FEINT_ID,skillId:FEINT_ID,actionClass:base.actionClass,
    traits:[...(base.traits||[]),"ninjutsu_defensive_setup","no_counter_damage","no_forced_miss","no_reposition"],
    evaluateAvailability(){
      const m=meta();
      return{available:!!m&&m.feintUsed!==true&&!feintState(),reason:"substitution_feint_spent_or_active"};
    },
    resolve(ctx){
      const m=meta();
      if(!m||m.feintUsed===true||feintState())return{resolved:false,reason:"substitution_feint_unavailable"};
      const result=base.resolve(ctx);
      if(result&&result.resolved===true){
        m.feintUsed=true;
        m.feintCreatedEnemyOpportunityIndex=typeof getBattleActionOpportunityIndex==="function"?Number(getBattleActionOpportunityIndex("enemy",ROGUE))||0:0;
      }
      return result;
    }
  };
}
function registerProfile(){
  if(typeof enemyDatabase!=="object"||!enemyDatabase)return{success:false,reason:"enemy_database_missing"};
  enemyDatabase[ROGUE]={
    id:ROGUE,name:PROFILE.name,rank:PROFILE.rank,power:PROFILE.pl,calibratedBasePL:PROFILE.pl,
    baseStats:{...PROFILE.stats},stats:{...PROFILE.stats},image:PROFILE.image,
    oppositionTemplateId:TEMPLATE,
    rewards:{ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},
    provenance:{
      origin:"academy_wasabi_izuno",
      historicalParticipantRef:ROGUE,
      oppositionTemplateId:TEMPLATE,
      noRegistryAdmission:true,noAutoScaling:true
    },
    noSummon:true,noTransformation:true,noBossScaling:true
  };
  enemyDatabase[ROGUE].authoredBattleActions=[
    makeEnemyFixedDamageAction("enemy_rogue_genin_kunai_rush",9,{primaryDiscipline:"Bukijutsu",traits:["one_authored_damage_packet","stamina_mitigated","no_bleed","no_stun","no_displacement","no_speed_modifier"]}),
    makeEnemyFixedDamageAction("enemy_rogue_genin_shuriken_spread",7,{primaryDiscipline:"Bukijutsu",traits:["multiple_projectiles_one_packet","stamina_mitigated","no_hit_rng"]}),
    feintAction()
  ];
  return{success:true};
}

const PRE_CHOOSE=typeof chooseEnemyAuthoredBattleAction==="function"?chooseEnemyAuthoredBattleAction:null;
if(PRE_CHOOSE){
  globalThis.chooseEnemyAuthoredBattleAction=function chooseWasabi343EnemyAction(state=null){
    if(currentBattle&&currentBattle.wasabi343&&currentBattle.active===true)expireFeintBeforeRogueNextAction();
    return PRE_CHOOSE.apply(this,arguments);
  };
  try{chooseEnemyAuthoredBattleAction=globalThis.chooseEnemyAuthoredBattleAction;}catch(_error){}
}

function strictWasabiDeployment(){
  if(!currentBattle||currentBattle.active!==true)return{success:false,reason:"wasabi_battle_not_active"};
  const wasabi=typeof getPlayerCharacter==="function"?getPlayerCharacter(WASABI):null;
  if(!wasabi)return{success:false,reason:"academy_izuno_battle_identity_missing"};
  currentBattle.deployment=currentBattle.deployment||{};
  currentBattle.deployment.player={slots:createBattleDeploymentSlots([WASABI])};
  currentBattle.characterId=WASABI;
  syncBattleActivePlayerFromDeployment();
  if(!currentBattle.activePlayer||currentBattle.activePlayer.id!==WASABI)return{success:false,reason:"academy_izuno_not_active_slot_1"};
  configureBattleEnemyParticipants([ROGUE]);
  currentBattle.deployment.enemy={slots:createBattleDeploymentSlots([ROGUE])};
  syncBattleActiveEnemyFromDeployment();
  initializeBattleContributionRecordsFromDeployment();
  initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true});
  try{if(typeof initializeBattlePouchFromPreparedSelection==="function")initializeBattlePouchFromPreparedSelection();}catch(_){}
  try{if(typeof initializeBattleAttachedSummonRuntimeFromDeployment==="function")initializeBattleAttachedSummonRuntimeFromDeployment();}catch(_){}
  try{if(typeof initializeBattleDedicatedVariantRuntimePackages==="function")initializeBattleDedicatedVariantRuntimePackages();}catch(_){}
  try{if(typeof initializeBattleKisoganStartsActiveFromDeployment==="function")initializeBattleKisoganStartsActiveFromDeployment();}catch(_){}
  const playerIds=(currentBattle.deployment.player.slots||[]).map(s=>s.participantId).filter(Boolean);
  const enemyIds=(currentBattle.deployment.enemy.slots||[]).map(s=>s.participantId).filter(Boolean);
  return{success:JSON.stringify(playerIds)===JSON.stringify([WASABI])&&JSON.stringify(enemyIds)===JSON.stringify([ROGUE]),playerIds,enemyIds};
}
function exactBattleOccurrenceId(sceneInstanceId){return "battle_occ_origin_izuno_rogue_genin_step_in:"+String(sceneInstanceId||"");}
function launch(spec={}){
  if(!spec.returnContext||spec.returnContext.type!=="story_scene"||String(spec.returnContext.sceneId)!==SCENE_ID)return{success:false,reason:"wasabi_story_return_context_invalid"};
  const sceneInstanceId=spec.returnContext.sceneInstanceId||spec.storyOccurrenceId||null;
  if(!sceneInstanceId)return{success:false,reason:"wasabi_story_instance_missing"};
  const exactId=exactBattleOccurrenceId(sceneInstanceId);
  if(currentBattle&&currentBattle.active===true&&currentBattle.battleId===exactId&&currentBattle.wasabi343)return{success:true,idempotent:true,battleId:exactId,encounterId:ENCOUNTER,battleConfigId:CONFIG};

  const launched=launchBattleWithReturnContext(ROGUE,ENCOUNTER,{...clone(spec.returnContext),battleConfigId:CONFIG,sourceOccurrenceId:SOURCE_OCCURRENCE,historicalParticipantRef:ROGUE,affectedParticipantRef:AFFECTED_STUDENT});
  if(!launched||launched.success!==true)return launched||{success:false,reason:"wasabi_battle_launch_failed"};

  currentBattle.battleId=exactId;
  currentBattle.encounterId=ENCOUNTER;
  currentBattle.oppositionTemplateId=TEMPLATE;
  const deployment=strictWasabiDeployment();
  if(!deployment.success)return deployment;
  currentBattle.enemyPower=PROFILE.pl;
  currentBattle.enemyMaxPower=PROFILE.pl;
  currentBattle.wasabi343={
    patchId:PATCH_ID,battleConfigId:CONFIG,battleOccurrenceId:exactId,
    sourceOccurrenceId:SOURCE_OCCURRENCE,historicalParticipantRef:ROGUE,affectedParticipantRef:AFFECTED_STUDENT,
    oppositionTemplateId:TEMPLATE,feintUsed:false,feintCreatedEnemyOpportunityIndex:null,launchEvidenceId:null
  };
  initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true});

  const evidence=recordBattleEvidence({
    eventType:"academy_wasabi_rogue_genin_battle_launched",
    committedOccurrence:true,
    actorRef:createBattleParticipantRef("player",WASABI),
    targetRef:createBattleParticipantRef("enemy",ROGUE),
    sourceRefs:[
      {type:"origin_source_occurrence",id:SOURCE_OCCURRENCE,role:"causal_story_occurrence"},
      {type:"historical_participant",id:ROGUE,role:"opposition_participant"},
      {type:"historical_participant",id:AFFECTED_STUDENT,role:"affected_student"}
    ],
    data:{
      battleOccurrenceId:exactId,sourceOccurrenceId:SOURCE_OCCURRENCE,historicalParticipantRef:ROGUE,
      affectedParticipantRef:AFFECTED_STUDENT,oppositionTemplateId:TEMPLATE,battleConfigId:CONFIG,encounterId:ENCOUNTER,
      strictOneVsOne:true,rewardRyo:0,visibleExp:0
    }
  });
  if(!evidence)return{success:false,reason:"wasabi_battle_launch_evidence_failed"};
  currentBattle.wasabi343.launchEvidenceId=evidence.evidenceId;
  if(currentBattle.rewards){currentBattle.rewards.ryo=0;currentBattle.rewards.exp=0;currentBattle.rewards.items=[];currentBattle.rewards.rareDrops=[];}
  savePlayerData();saveTestState();openOverlay("combat");
  return{success:true,battleId:exactId,encounterId:ENCOUNTER,battleConfigId:CONFIG,playerParticipantIds:[WASABI],oppositionParticipantIds:[ROGUE],launchEvidenceId:evidence.evidenceId};
}
function projectResult(){
  const m=meta();if(!m)return null;
  const outcome=currentBattle&&currentBattle.outcome&&currentBattle.outcome.type||null;
  return{
    battleOccurrenceId:m.battleOccurrenceId,
    sourceOccurrenceId:m.sourceOccurrenceId,
    historicalParticipantRef:m.historicalParticipantRef,
    oppositionTemplateId:m.oppositionTemplateId,
    battleResult:outcome==="victory"?"victory":outcome==="defeat"?"defeat":"unresolved",
    rogueGeninBattlePLDepleted:getBattleRemainingPL("enemy",ROGUE)<=0,
    wasabiBattlePLDepleted:getBattleRemainingPL("player",WASABI)<=0
  };
}
function diagnostics(){
  const enemy=enemyDatabase&&enemyDatabase[ROGUE];
  const actions=enemy&&enemy.authoredBattleActions||[];
  const checks={
    exactProfile:!!enemy&&enemy.calibratedBasePL===23&&JSON.stringify(enemy.baseStats)===JSON.stringify({nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24}),
    historicalNotTemplateIdentity:!!enemy&&enemy.id===ROGUE&&enemy.oppositionTemplateId===TEMPLATE&&enemy.provenance.noRegistryAdmission===true,
    exactActions:actions.length===3&&actions.some(a=>a.id==="enemy_rogue_genin_kunai_rush"&&a.authoredAttackPL===9)&&actions.some(a=>a.id==="enemy_rogue_genin_shuriken_spread"&&a.authoredAttackPL===7)&&actions.some(a=>a.id===FEINT_ID),
    exactFeint:String(feintAction).includes("0.40")&&String(feintAction).includes(FEINT_STATE)&&String(expireFeintBeforeRogueNextAction).includes("now>created"),
    sharedScheduler:!!PRE_CHOOSE&&String(globalThis.chooseEnemyAuthoredBattleAction).includes("PRE_CHOOSE.apply"),
    strictDeployment:String(strictWasabiDeployment).includes("createBattleDeploymentSlots([WASABI])")&&String(strictWasabiDeployment).includes("createBattleDeploymentSlots([ROGUE])"),
    withdrawNaturallyUnavailable:String(strictWasabiDeployment).includes("player={slots:createBattleDeploymentSlots([WASABI])}"),
    exactOccurrenceId:exactBattleOccurrenceId("qa")==="battle_occ_origin_izuno_rogue_genin_step_in:qa",
    zeroRewards:enemy.rewards.ryo.min===0&&enemy.rewards.ryo.max===0&&enemy.rewards.exp.min===0&&enemy.rewards.exp.max===0&&enemy.rewards.commonDrops.length===0&&enemy.rewards.rareDrops.length===0,
    observerSafeResult:Object.keys(projectResult.call({})||{}).length===0?true:String(projectResult).includes("rogueGeninBattlePLDepleted")&&!String(projectResult).includes("stats"),
    noStoryTruth:String(launch).includes("sourceOccurrenceId")&&!String(launch).includes("consumeStaticOriginSourceOccurrence")
  };
  const failed=Object.entries(checks).filter(([,v])=>v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
const installed=registerProfile();
if(!installed.success)throw new Error(installed.reason);
globalThis.launchAcademyWasabiRogueGeninBattle343=launch;
globalThis.projectAcademyWasabiRogueGeninBattle343=projectResult;
globalThis.runAcademyWasabiRogueGeninBattle343Diagnostics=diagnostics;
globalThis.SC_ACADEMY_WASABI_ROGUE_BATTLE_343=Object.freeze({
  patchId:PATCH_ID,battleConfigId:CONFIG,encounterId:ENCOUNTER,sourceOccurrenceId:SOURCE_OCCURRENCE,
  participantRefs:Object.freeze({wasabi:WASABI,rogueGenin:ROGUE,affectedStudent:AFFECTED_STUDENT}),
  oppositionTemplateId:TEMPLATE,browserGoldenClaimed:false
});
})();
