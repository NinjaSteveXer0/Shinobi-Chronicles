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
const BATTLE_ENVIRONMENT="Izuno Origin Backdrop/konoha_alleyway_day.png";
const SCENE_ID="origin_academy_izuno_prologue";
const FEINT_ID="enemy_rogue_genin_substitution_feint";
const FEINT_STATE="rogue_genin_substitution_feint_ready";
const REWARD_SOURCE_ID="wasabi_origin_rogue_genin_battle_victory_ryo_01";
const FIXED_VICTORY_RYO=50;

const PROFILE=Object.freeze({
  id:ROGUE,name:"ROGUE GENIN",rank:"Rogue Genin",
  pl:23,
  stats:Object.freeze({nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24}),
  image:"Enemies/rogue_genin.png"
});

function clone(v){try{return typeof cloneBattleRuntimeValue==="function"?cloneBattleRuntimeValue(v):JSON.parse(JSON.stringify(v));}catch(_){return v;}}
function applyBattleEnvironment(){
  if(!currentBattle)return false;
  currentBattle.environmentPath=BATTLE_ENVIRONMENT;
  currentBattle.presentationEnvironmentPath=BATTLE_ENVIRONMENT;
  return true;
}
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
function fixedDamageAction(id,authoredAttackPL,options={}){
  const action=makeEnemyFixedDamageAction(id,authoredAttackPL,options);
  if(action&&typeof action==="object"){
    action.authoredAttackPL=Math.max(0,Math.round(Number(authoredAttackPL)||0));
    action.primaryDiscipline=options.primaryDiscipline||null;
  }
  return action;
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
    fixedDamageAction("enemy_rogue_genin_kunai_rush",9,{primaryDiscipline:"Bukijutsu",traits:["one_authored_damage_packet","stamina_mitigated","no_bleed","no_stun","no_displacement","no_speed_modifier"]}),
    fixedDamageAction("enemy_rogue_genin_shuriken_spread",7,{primaryDiscipline:"Bukijutsu",traits:["multiple_projectiles_one_packet","stamina_mitigated","no_hit_rng"]}),
    feintAction()
  ];
  return{success:true};
}

const PRE_CHOOSE=typeof chooseEnemyAuthoredBattleAction==="function"?chooseEnemyAuthoredBattleAction:null;
if(PRE_CHOOSE){
  globalThis.chooseEnemyAuthoredBattleAction=function chooseWasabi343EnemyAction(state=null){
    if(!(currentBattle&&currentBattle.wasabi343&&currentBattle.active===true))return PRE_CHOOSE.apply(this,arguments);
    expireFeintBeforeRogueNextAction();
    const scheduler=state&&state.ready===true?state:(typeof evaluateEnemyActionScheduler==="function"?evaluateEnemyActionScheduler():null);
    if(!scheduler||scheduler.ready!==true)return{success:false,reason:scheduler&&scheduler.reason||"wasabi_enemy_scheduler_unavailable"};
    if(String(scheduler.enemyId||"")!==ROGUE)return{success:false,reason:"wasabi_unexpected_enemy_scheduler_participant"};
    const eligible=Array.isArray(scheduler.eligibleActions)?scheduler.eligibleActions.filter(Boolean):[];
    if(!eligible.length)return{success:false,reason:"no_semantically_eligible_enemy_action",eligibleActionIds:[]};
    const index=eligible.length===1?0:Math.floor(Math.random()*eligible.length);
    const action=eligible[index]||null;
    if(!action)return{success:false,reason:"wasabi_equal_weight_selection_failed",eligibleActionIds:eligible.map(a=>a.id)};
    return{
      success:true,action,eligibleActionIds:eligible.map(a=>a.id),
      randomnessAppliedAfterEligibility:eligible.length>1,equalSelectionWeight:true,
      wasabiRogueGenin343:true
    };
  };
  try{chooseEnemyAuthoredBattleAction=globalThis.chooseEnemyAuthoredBattleAction;}catch(_error){}
}

// Persist only the #343 adapter envelope through the established Battle session
// extension seam. Generic Battle save/restore remains canonical; this adapter
// only restores the scoped identity that game.js intentionally does not own.
const PRE_SAVE_TEST=typeof saveTestState==="function"?saveTestState:null;
if(PRE_SAVE_TEST){
  globalThis.saveTestState=function saveWasabi343TestState(){
    const result=PRE_SAVE_TEST.apply(this,arguments);
    if(currentBattle&&String(currentBattle.encounterId||"")===ENCOUNTER&&currentBattle.wasabi343&&typeof sessionStorage!=="undefined"){
      try{
        const raw=sessionStorage.getItem("shinobiTestState"),state=raw?JSON.parse(raw):{};
        state.encounterId=ENCOUNTER;
        state.battleConfigId=CONFIG;
        state.wasabi343BattleActive=currentBattle.active===true&&currentBattle.battleOver!==true;
        state.wasabi343BattleId=String(currentBattle.battleId||currentBattle.wasabi343.battleOccurrenceId||"");
        state.wasabi343=clone(currentBattle.wasabi343);
        state.wasabi343BattleLaunches=clone(playerData&&playerData.wasabi343BattleLaunches||{});
        sessionStorage.setItem("shinobiTestState",JSON.stringify(state));
      }catch(_error){}
    }
    return result;
  };
  try{saveTestState=globalThis.saveTestState;}catch(_error){}
}
const PRE_RESTORE_TEST=typeof restoreTestState==="function"?restoreTestState:null;
if(PRE_RESTORE_TEST){
  globalThis.restoreTestState=function restoreWasabi343TestState(){
    let saved=null,savedBattleActive=false,savedBattleId=null,savedLaunches=null,savedExact=false;
    if(typeof sessionStorage!=="undefined"){
      try{
        const raw=sessionStorage.getItem("shinobiTestState"),parsed=raw?JSON.parse(raw):null;
        if(parsed&&String(parsed.encounterId||"")===ENCOUNTER&&String(parsed.battleConfigId||"")===CONFIG&&parsed.wasabi343&&typeof parsed.wasabi343==="object"){
          saved=clone(parsed.wasabi343);
          savedBattleActive=parsed.wasabi343BattleActive===true;
          savedBattleId=String(parsed.wasabi343BattleId||saved.battleOccurrenceId||"").trim()||null;
          savedLaunches=parsed.wasabi343BattleLaunches&&typeof parsed.wasabi343BattleLaunches==="object"?clone(parsed.wasabi343BattleLaunches):null;
          savedExact=true;
          if(currentBattle){
            currentBattle.encounterId=ENCOUNTER;
            currentBattle.battleConfigId=CONFIG;
            if(savedBattleId)currentBattle.battleId=savedBattleId;
            currentBattle.wasabi343=clone(saved);
            applyBattleEnvironment();
          }
        }
      }catch(_error){}
    }
    const restored=PRE_RESTORE_TEST.apply(this,arguments);
    if(savedExact&&currentBattle){
      currentBattle.encounterId=ENCOUNTER;
      currentBattle.battleConfigId=CONFIG;
      if(savedBattleId)currentBattle.battleId=savedBattleId;
      currentBattle.wasabi343=clone(saved);
      applyBattleEnvironment();
      if(savedBattleActive&&currentBattle.battleOver!==true)currentBattle.active=true;
    }
    if(savedExact&&savedLaunches&&playerData){
      if(!playerData.wasabi343BattleLaunches||typeof playerData.wasabi343BattleLaunches!=="object")playerData.wasabi343BattleLaunches={};
      Object.assign(playerData.wasabi343BattleLaunches,clone(savedLaunches));
    }
    return restored;
  };
  try{restoreTestState=globalThis.restoreTestState;}catch(_error){}
}

const PRE_RENDER_ACTION_ROW=typeof renderBattleActionFamilyRow==="function"?renderBattleActionFamilyRow:null;
if(PRE_RENDER_ACTION_ROW){
  globalThis.renderBattleActionFamilyRow=function renderWasabi343ActionFamilyRow(actor){
    const html=PRE_RENDER_ACTION_ROW.apply(this,arguments);
    if(!(currentBattle&&currentBattle.wasabi343&&currentBattle.wasabi343.strictOneVsOne===true))return html;
    return String(html).replace(/\s*<button\b[^>]*class="[^"]*\bbattle-live-withdraw-action\b[^"]*"[^>]*>[\s\S]*?<\/button>/i,"");
  };
  try{renderBattleActionFamilyRow=globalThis.renderBattleActionFamilyRow;}catch(_error){}
}

const PRE_GENERATE_REWARDS=typeof generateBattleRewards==="function"?generateBattleRewards:null;
function projectWasabi343Rewards(finishingShinobi=null){
  if(!(currentBattle&&currentBattle.wasabi343))return{handled:false};
  const existing=currentBattle.rewards&&typeof currentBattle.rewards==="object"?currentBattle.rewards:{};
  const victory=currentBattle.outcome&&currentBattle.outcome.type==="victory";
  currentBattle.rewards={
    generated:victory,claimed:existing.claimed===true,ryo:victory?FIXED_VICTORY_RYO:0,exp:0,items:[],rareDrops:[],
    finishingShinobi:finishingShinobi&&finishingShinobi.name||existing.finishingShinobi||null,mvp:existing.mvp||null,
    requiresExplicitPostClaimContinue:true,wasabi343FixedReward:true,wasabi343RewardSourceId:REWARD_SOURCE_ID,
    wasabi343VictoryEntitlement:victory,wasabi343BattleOccurrenceId:String(currentBattle.wasabi343.battleOccurrenceId||currentBattle.battleId||"")
  };
  return{handled:true,victory,rewards:currentBattle.rewards};
}
if(PRE_GENERATE_REWARDS){
  globalThis.generateBattleRewards=function generateWasabi343BattleRewards(enemy,finishingShinobi){
    const result=PRE_GENERATE_REWARDS.apply(this,arguments);
    if(!(currentBattle&&currentBattle.wasabi343))return result;
    return projectWasabi343Rewards(finishingShinobi).rewards;
  };
  try{generateBattleRewards=globalThis.generateBattleRewards;}catch(_error){}
}
function rewardHistory(){if(!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];return playerData.activityHistory;}
function rewardReceipt(battleOccurrenceId){
  return rewardHistory().find(row=>row&&row.type==="origin_battle_reward"&&String(row.rewardSourceId||row.sourceId||"")===REWARD_SOURCE_ID&&String(row.battleOccurrenceId||"")===String(battleOccurrenceId||""))||null;
}
function claimWasabi343VictoryReward(){
  if(!(currentBattle&&currentBattle.wasabi343))return{handled:false};
  const m=currentBattle.wasabi343,battleOccurrenceId=String(m.battleOccurrenceId||currentBattle.battleId||"");
  if(!(currentBattle.outcome&&currentBattle.outcome.type==="victory"))return{handled:true,success:false,reason:"wasabi_rogue_victory_required",ryoGranted:0};
  projectWasabi343Rewards();
  const existing=rewardReceipt(battleOccurrenceId);
  if(existing){
    if(currentBattle.rewards)currentBattle.rewards.claimed=true;
    currentBattle.claimedAt=Number(existing.timestamp)||currentBattle.claimedAt||Date.now();
    return{handled:true,success:false,idempotent:true,reason:"battle_rewards_already_claimed",ryoGranted:0,receipt:clone(existing)};
  }
  const rows=rewardHistory(),beforeRyo=Number(playerData.ryo)||0,beforeLength=rows.length;
  const claimedBefore=!!(currentBattle.rewards&&currentBattle.rewards.claimed),claimedAtBefore=currentBattle.claimedAt||null;
  try{
    playerData.ryo=beforeRyo+FIXED_VICTORY_RYO;
    const timestamp=Date.now();
    const record={
      historyScope:typeof getCurrentChronicleOccurrenceHistoryScope==="function"?getCurrentChronicleOccurrenceHistoryScope("origin_battle_reward"):null,
      type:"origin_battle_reward",activity:"battle_reward",completed:true,committed:true,success:true,outcome:"reward_granted",
      rewardSourceId:REWARD_SOURCE_ID,sourceId:REWARD_SOURCE_ID,battleOccurrenceId,sourceOccurrenceId:battleOccurrenceId,
      originSourceOccurrenceId:m.sourceOccurrenceId,actorVariantId:WASABI,sceneId:SCENE_ID,battleConfigId:CONFIG,encounterId:ENCOUNTER,
      rewards:{ryo:FIXED_VICTORY_RYO,exp:0,items:[],rareDrops:[]},
      fact:{terminalBattleResult:"victory",rogueGeninBattlePLDepleted:true,genericCharacterExp:false,noFixedLoot:true},timestamp
    };
    rows.push(record);currentBattle.rewards.claimed=true;currentBattle.claimedAt=timestamp;
    const chronicleRecorded=typeof recordBattleChronicle==="function"?recordBattleChronicle():true;
    if(chronicleRecorded!==true)throw new Error("battle_chronicle_record_failed");
    if(typeof savePlayerData==="function")savePlayerData();
    if(typeof saveTestState==="function")saveTestState();
    return{handled:true,success:true,idempotent:false,ryoGranted:FIXED_VICTORY_RYO,receipt:clone(record),chronicleRecorded:true};
  }catch(error){
    playerData.ryo=beforeRyo;while(rows.length>beforeLength)rows.pop();
    if(currentBattle.rewards)currentBattle.rewards.claimed=claimedBefore;
    currentBattle.claimedAt=claimedAtBefore;
    return{handled:true,success:false,reason:"wasabi_rogue_victory_reward_claim_failed",error:String(error&&error.message||error)};
  }
}
const PRE_CLAIM_REWARDS=typeof claimCurrentBattleRewards==="function"?claimCurrentBattleRewards:null;
if(PRE_CLAIM_REWARDS){
  globalThis.claimCurrentBattleRewards=function claimWasabi343BattleRewards(){
    if(currentBattle&&currentBattle.wasabi343){
      const result=claimWasabi343VictoryReward();
      return result.success===true;
    }
    return PRE_CLAIM_REWARDS.apply(this,arguments);
  };
  try{claimCurrentBattleRewards=globalThis.claimCurrentBattleRewards;}catch(_error){}
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
function launchStore(){
  if(!playerData.wasabi343BattleLaunches||typeof playerData.wasabi343BattleLaunches!=="object")playerData.wasabi343BattleLaunches={};
  return playerData.wasabi343BattleLaunches;
}
function launch(spec={}){
  if(!spec.returnContext||spec.returnContext.type!=="story_scene"||String(spec.returnContext.sceneId)!==SCENE_ID)return{success:false,reason:"wasabi_story_return_context_invalid"};
  const sceneInstanceId=spec.returnContext.sceneInstanceId||spec.storyOccurrenceId||null;
  if(!sceneInstanceId)return{success:false,reason:"wasabi_story_instance_missing"};
  const exactId=exactBattleOccurrenceId(sceneInstanceId),store=launchStore(),prior=store[exactId]||null;
  if(prior){
    if(currentBattle&&currentBattle.battleId===exactId&&currentBattle.wasabi343){
      applyBattleEnvironment();
      return{success:true,idempotent:true,battleId:exactId,encounterId:ENCOUNTER,battleConfigId:CONFIG,environmentPath:BATTLE_ENVIRONMENT,launchEvidenceId:prior.launchEvidenceId||null};
    }
    return{success:false,reason:"wasabi_battle_occurrence_already_committed_without_runtime",battleId:exactId,launchEvidenceId:prior.launchEvidenceId||null};
  }

  const launched=launchBattleWithReturnContext(ROGUE,ENCOUNTER,{...clone(spec.returnContext),battleConfigId:CONFIG,sourceOccurrenceId:SOURCE_OCCURRENCE,historicalParticipantRef:ROGUE,affectedParticipantRef:AFFECTED_STUDENT});
  if(!launched||launched.success!==true)return launched||{success:false,reason:"wasabi_battle_launch_failed"};

  currentBattle.battleId=exactId;
  currentBattle.encounterId=ENCOUNTER;
  currentBattle.oppositionTemplateId=TEMPLATE;
  applyBattleEnvironment();
  const deployment=strictWasabiDeployment();
  if(!deployment.success)return deployment;
  currentBattle.enemyPower=PROFILE.pl;
  currentBattle.enemyMaxPower=PROFILE.pl;
  currentBattle.wasabi343={
    patchId:PATCH_ID,battleConfigId:CONFIG,battleOccurrenceId:exactId,
    sourceOccurrenceId:SOURCE_OCCURRENCE,historicalParticipantRef:ROGUE,affectedParticipantRef:AFFECTED_STUDENT,
    oppositionTemplateId:TEMPLATE,environmentPath:BATTLE_ENVIRONMENT,strictOneVsOne:true,feintUsed:false,feintCreatedEnemyOpportunityIndex:null,launchEvidenceId:null
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
      strictOneVsOne:true,victoryRewardRyo:FIXED_VICTORY_RYO,rewardSourceId:REWARD_SOURCE_ID,visibleExp:0
    }
  });
  if(!evidence)return{success:false,reason:"wasabi_battle_launch_evidence_failed"};
  currentBattle.wasabi343.launchEvidenceId=evidence.evidenceId;
  store[exactId]={
    battleOccurrenceId:exactId,launchEvidenceId:evidence.evidenceId||null,
    sourceOccurrenceId:SOURCE_OCCURRENCE,historicalParticipantRef:ROGUE,
    battleConfigId:CONFIG,encounterId:ENCOUNTER,createdAt:Date.now()
  };
  if(currentBattle.rewards){
    currentBattle.rewards.ryo=0;currentBattle.rewards.exp=0;currentBattle.rewards.items=[];currentBattle.rewards.rareDrops=[];
    currentBattle.rewards.requiresExplicitPostClaimContinue=true;
    currentBattle.rewards.wasabi343FixedReward=true;
    currentBattle.rewards.wasabi343RewardSourceId=REWARD_SOURCE_ID;
    currentBattle.rewards.wasabi343VictoryRyo=FIXED_VICTORY_RYO;
  }
  savePlayerData();saveTestState();openOverlay("combat");
  return{success:true,battleId:exactId,encounterId:ENCOUNTER,battleConfigId:CONFIG,environmentPath:BATTLE_ENVIRONMENT,playerParticipantIds:[WASABI],oppositionParticipantIds:[ROGUE],launchEvidenceId:evidence.evidenceId};
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
    exactFeint:(()=>{
      const feint=actions.find(a=>a&&a.id===FEINT_ID);
      const requiredTraits=["once_per_battle","single_target_direct_mitigable_attack_pl_packet_only","expires_before_rogue_next_action","ninjutsu_defensive_setup","no_counter_damage","no_forced_miss","no_reposition"];
      return !!feint&&
        FEINT_STATE==="rogue_genin_substitution_feint_ready"&&
        String(feintAction).includes("makeEnemyRatioGuardAction(FEINT_ID,0.40")&&
        String(feintAction).includes("stateKey:FEINT_STATE")&&
        requiredTraits.every(t=>(feint.traits||[]).includes(t))&&
        String(expireFeintBeforeRogueNextAction).includes("now>created")&&
        String(expireFeintBeforeRogueNextAction).includes("removeBattleTransientState(state.stateId)");
    })(),
    sharedScheduler:!!PRE_CHOOSE&&String(globalThis.chooseEnemyAuthoredBattleAction).includes("evaluateEnemyActionScheduler")&&String(globalThis.chooseEnemyAuthoredBattleAction).includes("equalSelectionWeight:true")&&String(globalThis.chooseEnemyAuthoredBattleAction).includes("no_semantically_eligible_enemy_action"),
    strictDeployment:String(strictWasabiDeployment).includes("createBattleDeploymentSlots([WASABI])")&&String(strictWasabiDeployment).includes("createBattleDeploymentSlots([ROGUE])"),
    withdrawNaturallyUnavailable:String(strictWasabiDeployment).includes("player={slots:createBattleDeploymentSlots([WASABI])}"),
    withdrawControlHiddenOnlyHere:!!PRE_RENDER_ACTION_ROW&&String(globalThis.renderBattleActionFamilyRow).includes("strictOneVsOne")&&String(globalThis.renderBattleActionFamilyRow).includes("battle-live-withdraw-action"),
    saveReloadEnvelope:!!PRE_SAVE_TEST&&!!PRE_RESTORE_TEST&&String(globalThis.saveTestState).includes("state.wasabi343BattleLaunches")&&String(globalThis.restoreTestState).includes("savedLaunches")&&String(globalThis.restoreTestState).includes("currentBattle.battleConfigId=CONFIG")&&String(globalThis.restoreTestState).includes("PRE_RESTORE_TEST.apply"),
    exactBattleEnvironment:BATTLE_ENVIRONMENT==="Izuno Origin Backdrop/konoha_alleyway_day.png"&&String(applyBattleEnvironment).includes("currentBattle.environmentPath=BATTLE_ENVIRONMENT")&&String(applyBattleEnvironment).includes("currentBattle.presentationEnvironmentPath=BATTLE_ENVIRONMENT"),
    exactOccurrenceId:exactBattleOccurrenceId("qa")==="battle_occ_origin_izuno_rogue_genin_step_in:qa"&&String(launch).includes("wasabi_battle_occurrence_already_committed_without_runtime"),
    genericEnemyLootSuppressed:enemy.rewards.ryo.min===0&&enemy.rewards.ryo.max===0&&enemy.rewards.exp.min===0&&enemy.rewards.exp.max===0&&enemy.rewards.commonDrops.length===0&&enemy.rewards.rareDrops.length===0,
    exactVictoryReward:REWARD_SOURCE_ID==="wasabi_origin_rogue_genin_battle_victory_ryo_01"&&FIXED_VICTORY_RYO===50&&String(projectWasabi343Rewards).includes("victory?FIXED_VICTORY_RYO:0"),
    stableRewardReceipt:String(claimWasabi343VictoryReward).includes('type:"origin_battle_reward"')&&String(claimWasabi343VictoryReward).includes("battleOccurrenceId"),
    claimSeparateFromContinue:!!PRE_GENERATE_REWARDS&&!!PRE_CLAIM_REWARDS&&String(projectWasabi343Rewards).includes("requiresExplicitPostClaimContinue:true")&&String(launch).includes("requiresExplicitPostClaimContinue=true"),
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
globalThis.claimAcademyWasabiRogueVictoryReward343=claimWasabi343VictoryReward;
globalThis.runAcademyWasabiRogueGeninBattle343Diagnostics=diagnostics;
globalThis.SC_ACADEMY_WASABI_ROGUE_BATTLE_343=Object.freeze({
  patchId:PATCH_ID,battleConfigId:CONFIG,encounterId:ENCOUNTER,sourceOccurrenceId:SOURCE_OCCURRENCE,rewardSourceId:REWARD_SOURCE_ID,fixedVictoryRyo:FIXED_VICTORY_RYO,
  participantRefs:Object.freeze({wasabi:WASABI,rogueGenin:ROGUE,affectedStudent:AFFECTED_STUDENT}),
  oppositionTemplateId:TEMPLATE,environmentPath:BATTLE_ENVIRONMENT,browserGoldenClaimed:false
});
})();
