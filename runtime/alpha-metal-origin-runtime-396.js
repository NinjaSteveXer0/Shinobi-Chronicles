// ============================================================================
// ACADEMY METAL LEE — CONTROLLED SPAR + MET-03 RESOLVER — #396
//
// Combat authority:
// Documentation/Combat/SC_Combat_Academy_Metal_Lee_Controlled_Spar_and_MET03_Protective_Resolver_Closure_2026-09-27.md
// Writing authority:
// Documentation/Story/Academy_Metal_Lee_Origin_WRITING_GOLDEN_2026-09-27.md
// ============================================================================
(function installAcademyMetalOriginRuntime396(){
"use strict";
if(globalThis.SC_ACADEMY_METAL_ORIGIN_RUNTIME_396)return;

const PATCH_ID="academy_metal_origin_runtime_396_2026_09_27";
const METAL="academy_metal_lee";
const GENIN="metal_origin_inviting_genin";
const CONFIG="academy_metal_lee_origin_controlled_spar";
const ENCOUNTER="origin_academy_metal_lee:inviting_genin_spar";
const SCENE_ID="origin_academy_metal_lee_prologue";
const MET02="occ_origin_metal_pressured_performance_resolution";
const MET03="occ_origin_metal_protective_response_resolution";
const ENVIRONMENT="Scene backdrops/academy_training_ground_courtyard.png";
const BATTLE_PORTRAIT="NPC portrait/metal_classmate_1.png";
const BATTLE_PORTRAIT_BLOB_SHA="583c814dfd016e05dbac3f77b1f922a174f818c6";
const FIXED_VICTORY_RYO=50;
const REWARD_SOURCE_ID="metal_origin_controlled_spar_battle_victory_ryo_01";
const START_MAX=13;
const FEINT_STATE="metal_origin_inviting_genin_feint_entry_ready";
const AI_IDS=Object.freeze([
  "metal_origin_inviting_genin_sparring_jab",
  "metal_origin_inviting_genin_turning_kick",
  "metal_origin_inviting_genin_guarded_stance",
  "metal_origin_inviting_genin_feint_entry",
  "metal_origin_inviting_genin_committed_lunge"
]);
const PROFILE=Object.freeze({
  id:GENIN,name:"GENIN",rank:"Genin",pl:15,
  stats:Object.freeze({nin:12,tai:16,buki:11,fuin:6,kin:7,gen:8,stamina:15})
});

function clone(v){try{return typeof cloneBattleRuntimeValue==="function"?cloneBattleRuntimeValue(v):JSON.parse(JSON.stringify(v));}catch(_){return v;}}
function meta(){return currentBattle&&currentBattle.metal396||null;}
function aiIndex(){return typeof getBattleActionOpportunityIndex==="function"?(Number(getBattleActionOpportunityIndex("enemy",GENIN))||0)%AI_IDS.length:0;}
function exactAction(id){return()=>({available:AI_IDS[aiIndex()]===id,reason:"metal_controlled_spar_deterministic_cycle"});}
function feintState(){try{return findBattleTransientState({stateKey:FEINT_STATE,sourceSide:"enemy",sourceParticipantId:GENIN,targetSide:"enemy",targetParticipantId:GENIN})||null;}catch(_){return null;}}
function applyEnvironment(){
  if(!currentBattle)return false;
  currentBattle.environmentPath=ENVIRONMENT;
  currentBattle.presentationEnvironmentPath=ENVIRONMENT;
  return true;
}
function fixed(id,name,pl){
  const action=makeEnemyFixedDamageAction(id,pl,{primaryDiscipline:"Taijutsu",evaluateAvailability:exactAction(id),traits:["controlled_spar","one_authored_damage_packet","stamina_mitigated","no_injury_inference"]});
  action.displayName=name;action.authoredAttackPL=pl;action.primaryDiscipline="Taijutsu";
  return action;
}
function guardedStance(){
  const id=AI_IDS[2],action=makeEnemyRatioGuardAction(id,0.25,{stateKey:"metal_origin_inviting_genin_guarded_stance_ready",evaluateAvailability:exactAction(id),traits:["controlled_spar","one_use_pre_stamina_ratio_guard"]});
  action.displayName="Guarded Stance";action.preventionRatio=0.25;return action;
}
function feintEntry(){
  const id=AI_IDS[3];
  return{
    id,skillId:id,displayName:"Feint Entry",actionClass:"enemy_context_technique",
    traits:["controlled_spar","setup","zero_damage","refresh_replace","feeds_committed_lunge_only"],
    evaluateAvailability:exactAction(id),
    resolve({enemy,envelope}){
      if(!enemy)return{resolved:false,reason:"metal_feint_actor_missing"};
      const existing=feintState();if(existing)removeBattleTransientState(existing.stateId);
      const state=addBattleTransientState({
        stateKey:FEINT_STATE,sourceSide:"enemy",sourceParticipantId:enemy.id,targetSide:"enemy",targetParticipantId:enemy.id,
        ownerRef:{type:"skill",id},
        data:{sourceSkillId:id,feedsSkillId:AI_IDS[4],refreshReplace:true,activationActionId:envelope&&envelope.actionId||null}
      });
      if(state)recordBattleEvidence({
        eventType:"metal_controlled_spar_feint_entry_established",actionId:envelope&&envelope.actionId||null,
        actorRef:createBattleParticipantRef("enemy",enemy.id),targetRef:createBattleParticipantRef("enemy",enemy.id),
        skillId:id,stateRefs:[state.stateId],data:{automaticAttackPL:0,setupOnly:true,refreshReplace:true}
      });
      return{resolved:!!state,branch:"metal_feint_entry",damageApplied:false,stateRefs:state?[state.stateId]:[]};
    }
  };
}
function committedLunge(){
  const id=AI_IDS[4],normal=makeEnemyFixedDamageAction(id,6,{primaryDiscipline:"Taijutsu"}),boosted=makeEnemyFixedDamageAction(id,7,{primaryDiscipline:"Taijutsu"});
  return{
    id,skillId:id,displayName:"Committed Lunge",actionClass:"enemy_authored_action",
    authoredAttackPL:6,contextualAttackPL:Object.freeze({normal:6,afterFeint:7}),
    traits:["controlled_spar","one_authored_damage_packet","stamina_mitigated","feint_context_consumed_if_present"],
    evaluateAvailability:exactAction(id),
    resolve(ctx){
      const state=feintState(),boost=!!state;
      if(state)removeBattleTransientState(state.stateId);
      const result=(boost?boosted:normal).resolve(ctx);
      if(result&&result.resolved===true){
        result.branch=boost?"metal_committed_lunge_after_feint":"metal_committed_lunge_normal";
        result.authoredAttackPL=boost?7:6;result.consumedFeintStateId=state&&state.stateId||null;
      }
      return result;
    }
  };
}
function registerProfile(){
  if(typeof enemyDatabase!=="object"||!enemyDatabase)return{success:false,reason:"enemy_database_missing"};
  enemyDatabase[GENIN]={
    id:GENIN,name:PROFILE.name,rank:PROFILE.rank,power:PROFILE.pl,calibratedBasePL:PROFILE.pl,
    baseStats:{...PROFILE.stats},stats:{...PROFILE.stats},image:BATTLE_PORTRAIT,
    oppositionTemplateId:GENIN,
    rewards:{ryo:{min:FIXED_VICTORY_RYO,max:FIXED_VICTORY_RYO},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},
    provenance:{origin:"academy_metal_lee",historicalParticipantRef:GENIN,storyScoped:true,noRegistryAdmission:true,noCollectibleAdmission:true,noAutoScaling:true,battlePortraitPath:BATTLE_PORTRAIT,battlePortraitAuthorityBlobSha:BATTLE_PORTRAIT_BLOB_SHA},
    noSummon:true,noTransformation:true,noBossScaling:true
  };
  enemyDatabase[GENIN].authoredBattleActions=[
    fixed(AI_IDS[0],"Sparring Jab",5),
    fixed(AI_IDS[1],"Turning Kick",6),
    guardedStance(),feintEntry(),committedLunge()
  ];
  return{success:true};
}

const PRE_CHOOSE=typeof chooseEnemyAuthoredBattleAction==="function"?chooseEnemyAuthoredBattleAction:null;
if(PRE_CHOOSE){
  globalThis.chooseEnemyAuthoredBattleAction=function chooseMetal396EnemyAction(state=null){
    if(!(currentBattle&&currentBattle.metal396&&currentBattle.active===true))return PRE_CHOOSE.apply(this,arguments);
    const scheduler=state&&state.ready===true?state:evaluateEnemyActionScheduler();
    if(!scheduler||scheduler.ready!==true)return{success:false,reason:scheduler&&scheduler.reason||"metal_enemy_scheduler_unavailable"};
    const expected=AI_IDS[aiIndex()];
    const eligible=(scheduler.eligibleActions||[]).filter(Boolean);
    const action=eligible.find(row=>row.id===expected)||null;
    if(!action)return{success:false,reason:"metal_deterministic_action_not_eligible",expectedActionId:expected,eligibleActionIds:eligible.map(row=>row.id)};
    return{success:true,action,eligibleActionIds:[action.id],randomnessAppliedAfterEligibility:false,equalSelectionWeight:false,deterministicCycle:true,metal396:true};
  };
  try{chooseEnemyAuthoredBattleAction=globalThis.chooseEnemyAuthoredBattleAction;}catch(_){}
}

function rewardHistory(){if(!playerData.activityHistory||!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];return playerData.activityHistory;}
function isExactRewardBattle(){return !!(currentBattle&&currentBattle.metal396&&currentBattle.battleConfigId===CONFIG&&currentBattle.encounterId===ENCOUNTER);}
function projectRewards(rewards=null){
  if(!isExactRewardBattle())return rewards;
  const victory=currentBattle&&currentBattle.outcome&&currentBattle.outcome.type==="victory";
  const out=rewards&&typeof rewards==="object"?rewards:{generated:true,claimed:false};
  out.generated=true;out.claimed=out.claimed===true;out.ryo=victory?FIXED_VICTORY_RYO:0;out.exp=0;out.items=[];out.rareDrops=[];
  out.requiresExplicitPostClaimContinue=false;out.metal396FixedReward=true;out.metal396RewardSourceId=REWARD_SOURCE_ID;out.battleOccurrenceId=meta().battleOccurrenceId;
  currentBattle.rewards=out;return out;
}
const PRE_GENERATE=typeof generateBattleRewards==="function"?generateBattleRewards:null;
if(PRE_GENERATE){
  globalThis.generateBattleRewards=function generateMetal396Rewards(){
    if(isExactRewardBattle())return projectRewards(currentBattle.rewards);
    return PRE_GENERATE.apply(this,arguments);
  };
  try{generateBattleRewards=globalThis.generateBattleRewards;}catch(_){}
}
function existingRewardReceipt(){
  const m=meta();if(!m)return null;
  return rewardHistory().find(row=>row&&row.type==="origin_battle_reward"&&row.rewardSourceId===REWARD_SOURCE_ID&&row.battleOccurrenceId===m.battleOccurrenceId)||null;
}
function claimReward(){
  const m=meta();if(!m)return{success:false,reason:"metal396_battle_not_active"};
  if(!currentBattle.outcome||currentBattle.outcome.type!=="victory")return{success:false,reason:"metal396_victory_required"};
  const prior=existingRewardReceipt();if(prior){if(currentBattle.rewards)currentBattle.rewards.claimed=true;return{success:true,idempotent:true,receipt:prior};}
  if(!currentBattle.rewards||currentBattle.rewards.generated!==true)projectRewards(currentBattle.rewards);
  if(currentBattle.rewards.claimed===true)return{success:false,reason:"metal396_reward_claim_state_without_receipt"};
  playerData.ryo=Math.max(0,Number(playerData.ryo)||0)+FIXED_VICTORY_RYO;
  const receipt={type:"origin_battle_reward",rewardSourceId:REWARD_SOURCE_ID,battleOccurrenceId:m.battleOccurrenceId,battleConfigId:CONFIG,encounterId:ENCOUNTER,actorVariantId:METAL,ryo:FIXED_VICTORY_RYO,exp:0,items:[],rareDrops:[],claimedAt:Date.now()};
  rewardHistory().push(receipt);currentBattle.rewards.claimed=true;currentBattle.claimedAt=Date.now();
  try{recordBattleChronicle();}catch(_){}
  savePlayerData();saveTestState();return{success:true,idempotent:false,receipt:clone(receipt)};
}
const PRE_CLAIM=typeof claimCurrentBattleRewards==="function"?claimCurrentBattleRewards:null;
if(PRE_CLAIM){
  globalThis.claimCurrentBattleRewards=function claimMetal396Rewards(){if(isExactRewardBattle())return claimReward().success===true;return PRE_CLAIM.apply(this,arguments);};
  try{claimCurrentBattleRewards=globalThis.claimCurrentBattleRewards;}catch(_){}
}

const PRE_SAVE=typeof saveTestState==="function"?saveTestState:null;
if(PRE_SAVE){
  globalThis.saveTestState=function saveMetal396State(){
    const result=PRE_SAVE.apply(this,arguments);
    if(currentBattle&&currentBattle.metal396&&typeof sessionStorage!=="undefined"){
      try{
        const raw=sessionStorage.getItem("shinobiTestState"),state=raw?JSON.parse(raw):{};
        state.metal396=clone(currentBattle.metal396);
        state.metal396BattleActive=currentBattle.active===true&&currentBattle.battleOver!==true;
        state.metal396BattleLaunches=clone(playerData&&playerData.metal396BattleLaunches||{});
        state.battleConfigId=CONFIG;
        sessionStorage.setItem("shinobiTestState",JSON.stringify(state));
      }catch(_){}
    }
    return result;
  };
  try{saveTestState=globalThis.saveTestState;}catch(_){}
}
const PRE_RESTORE=typeof restoreTestState==="function"?restoreTestState:null;
if(PRE_RESTORE){
  globalThis.restoreTestState=function restoreMetal396State(){
    let saved=null,active=false,launches=null;
    if(typeof sessionStorage!=="undefined"){
      try{
        const raw=sessionStorage.getItem("shinobiTestState"),state=raw?JSON.parse(raw):null;
        if(state&&state.metal396&&String(state.encounterId||"")===ENCOUNTER&&String(state.battleConfigId||"")===CONFIG){
          saved=clone(state.metal396);active=state.metal396BattleActive===true;launches=clone(state.metal396BattleLaunches||{});
        }
      }catch(_){}
    }
    const result=PRE_RESTORE.apply(this,arguments);
    if(saved&&currentBattle){
      currentBattle.metal396=saved;currentBattle.battleConfigId=CONFIG;currentBattle.encounterId=ENCOUNTER;applyEnvironment();
      if(active&&currentBattle.battleOver!==true)currentBattle.active=true;
    }
    if(saved&&launches&&playerData){playerData.metal396BattleLaunches=playerData.metal396BattleLaunches||{};Object.assign(playerData.metal396BattleLaunches,launches);}
    return result;
  };
  try{restoreTestState=globalThis.restoreTestState;}catch(_){}
}

const PRE_RENDER_ROW=typeof renderBattleActionFamilyRow==="function"?renderBattleActionFamilyRow:null;
if(PRE_RENDER_ROW){
  globalThis.renderBattleActionFamilyRow=function renderMetal396ActionFamilyRow(actor){
    const html=PRE_RENDER_ROW.apply(this,arguments);
    if(!(currentBattle&&currentBattle.metal396&&currentBattle.metal396.strictOneVsOne===true))return html;
    return String(html).replace(/\s*<button\b[^>]*class="[^"]*\bbattle-live-withdraw-action\b[^"]*"[^>]*>[\s\S]*?<\/button>/i,"");
  };
  try{renderBattleActionFamilyRow=globalThis.renderBattleActionFamilyRow;}catch(_){}
}

function strictDeployment(){
  const metal=getPlayerCharacter(METAL);if(!metal)return{success:false,reason:"academy_metal_lee_battle_identity_missing"};
  currentBattle.deployment=currentBattle.deployment||{};
  currentBattle.deployment.player={slots:createBattleDeploymentSlots([METAL])};currentBattle.characterId=METAL;syncBattleActivePlayerFromDeployment();
  configureBattleEnemyParticipants([GENIN]);currentBattle.deployment.enemy={slots:createBattleDeploymentSlots([GENIN])};syncBattleActiveEnemyFromDeployment();
  initializeBattleContributionRecordsFromDeployment();initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true});
  try{initializeBattlePouchFromPreparedSelection();}catch(_){}
  try{initializeBattleAttachedSummonRuntimeFromDeployment();}catch(_){}
  try{initializeBattleDedicatedVariantRuntimePackages();}catch(_){}
  return{success:currentBattle.activePlayer&&currentBattle.activePlayer.id===METAL&&currentBattle.enemy&&currentBattle.enemy.id===GENIN};
}
function exactBattleId(sceneInstanceId){return "battle_occ_origin_metal_inviting_genin_spar:"+String(sceneInstanceId||"");}
function launchStore(){if(!playerData.metal396BattleLaunches||typeof playerData.metal396BattleLaunches!=="object")playerData.metal396BattleLaunches={};return playerData.metal396BattleLaunches;}
function launch(spec={}){
  if(!spec.returnContext||spec.returnContext.type!=="story_scene"||String(spec.returnContext.sceneId)!==SCENE_ID)return{success:false,reason:"metal_story_return_context_invalid"};
  const sceneInstanceId=spec.returnContext.sceneInstanceId||null;if(!sceneInstanceId)return{success:false,reason:"metal_story_instance_missing"};
  const battleId=exactBattleId(sceneInstanceId),store=launchStore();
  if(store[battleId]){
    if(currentBattle&&currentBattle.battleId===battleId&&currentBattle.metal396)return{success:true,idempotent:true,battleId,encounterId:ENCOUNTER,battleConfigId:CONFIG};
    return{success:false,reason:"metal_spar_occurrence_already_committed_without_runtime",battleId};
  }
  const launched=launchBattleWithReturnContext(GENIN,ENCOUNTER,{...clone(spec.returnContext),battleConfigId:CONFIG,sourceOccurrenceId:MET02,historicalParticipantRef:GENIN});
  if(!launched||launched.success!==true)return launched||{success:false,reason:"metal_spar_launch_failed"};
  currentBattle.battleId=battleId;currentBattle.encounterId=ENCOUNTER;currentBattle.battleConfigId=CONFIG;currentBattle.oppositionTemplateId=GENIN;applyEnvironment();
  const deployed=strictDeployment();if(!deployed.success)return deployed;
  currentBattle.enemyPower=15;currentBattle.enemyMaxPower=15;
  currentBattle.metal396={patchId:PATCH_ID,battleConfigId:CONFIG,battleOccurrenceId:battleId,sourceOccurrenceId:MET02,historicalParticipantRef:GENIN,startingUnderlyingMaximum:START_MAX,strictOneVsOne:true,deterministicAi:true};
  initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true});
  if(currentBattle.rewards){currentBattle.rewards={generated:false,claimed:false,ryo:0,exp:0,items:[],rareDrops:[],requiresExplicitPostClaimContinue:false,metal396FixedReward:true,metal396RewardSourceId:REWARD_SOURCE_ID};}
  const evidence=recordBattleEvidence({eventType:"academy_metal_controlled_spar_launched",committedOccurrence:true,actorRef:createBattleParticipantRef("player",METAL),targetRef:createBattleParticipantRef("enemy",GENIN),sourceRefs:[{type:"origin_source_occurrence",id:MET02,role:"pressured_performance_source"},{type:"historical_participant",id:GENIN,role:"spar_opponent"}],data:{battleOccurrenceId:battleId,battleConfigId:CONFIG,encounterId:ENCOUNTER,startingUnderlyingMaximum:START_MAX,opponentBasePL:15,victoryRewardRyo:FIXED_VICTORY_RYO,rewardSourceId:REWARD_SOURCE_ID,metalActsFirst:true,deterministicAiCycle:[...AI_IDS]}});
  store[battleId]={battleOccurrenceId:battleId,launchEvidenceId:evidence&&evidence.evidenceId||null,createdAt:Date.now()};
  savePlayerData();saveTestState();openOverlay("combat");
  return{success:true,battleId,encounterId:ENCOUNTER,battleConfigId:CONFIG,playerParticipantIds:[METAL],oppositionParticipantIds:[GENIN]};
}
function classify(){
  const remaining=Math.max(0,Number(getBattleRemainingPL("player",METAL))||0),ratio=remaining/START_MAX;
  const performanceClass=ratio>0.50?"strong":ratio>=0.25?"mixed":"rough";
  return{remaining,startingUnderlyingMaximum:START_MAX,ratio,performanceClass};
}
function projectResult(){
  if(!(currentBattle&&currentBattle.metal396))return null;
  const c=classify(),outcome=currentBattle.outcome&&currentBattle.outcome.type||null;
  return{battleOccurrenceId:currentBattle.metal396.battleOccurrenceId,battleResult:outcome==="victory"?"victory":outcome==="defeat"?"defeat":"unresolved",metalBattlePLDepleted:getBattleRemainingPL("player",METAL)<=0,geninBattlePLDepleted:getBattleRemainingPL("enemy",GENIN)<=0,finalMetalRemainingBattlePL:c.remaining,startingUnderlyingMaximum:c.startingUnderlyingMaximum,finalRemainingRatio:c.ratio,performanceClass:c.performanceClass};
}
const PRE_ADVANCE=typeof advanceStoryScene==="function"?advanceStoryScene:null;
function metalInternalRouteTarget396(active){
  if(!active||active.sceneId!==SCENE_ID)return null;
  const lc=active.localContext||{};
  if(active.beatId==="met_spar_dispatch"){
    const cls=lc.metalSparPerformanceClass;
    return ["strong","mixed","rough"].includes(cls)?"met_spar_"+cls+"_01":null;
  }
  const responsePrefix={
    met_resolve_redirect:"met_redirect",
    met_resolve_impact:"met_impact",
    met_resolve_destroy:"met_destroy",
    met_redirect_dispatch:"met_redirect",
    met_impact_dispatch:"met_impact",
    met_destroy_dispatch:"met_destroy"
  }[active.beatId]||null;
  const outcome=lc.metalProtectiveOutcome;
  return responsePrefix&&["success","partial","failure"].includes(outcome)?responsePrefix+"_"+outcome+"_01":null;
}
if(PRE_ADVANCE){
  globalThis.advanceStoryScene=function advanceMetal396Story(choiceId=null){
    const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
    const target=metalInternalRouteTarget396(active);
    if(target&&typeof setStorySceneBeat==="function")return setStorySceneBeat(target);
    return PRE_ADVANCE.apply(this,arguments);
  };
  try{advanceStoryScene=globalThis.advanceStoryScene;}catch(_){}
}

const PRE_RESUME=typeof resumeBattleCallerAfterCompletion==="function"?resumeBattleCallerAfterCompletion:null;
if(PRE_RESUME){
  globalThis.resumeBattleCallerAfterCompletion=function resumeMetal396Caller(outcomeType=null){
    if(currentBattle&&currentBattle.metal396&&currentBattle.returnContext&&currentBattle.returnContext.type==="story_scene"){
      const c=classify(),target=c.performanceClass==="strong"?"met_spar_strong_01":c.performanceClass==="mixed"?"met_spar_mixed_01":"met_spar_rough_01";
      currentBattle.returnContext.postBattleBeatId=target;
      const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
      if(active&&active.sceneId===SCENE_ID){
        active.localContext=active.localContext||{};
        active.localContext.metalSparPerformanceClass=c.performanceClass;
        active.localContext.metalSparBattleOccurrenceId=currentBattle.metal396.battleOccurrenceId;
        active.localContext.metalSparFinalRemainingBattlePL=c.remaining;
        active.localContext.metalSparStartingMaximum=START_MAX;
      }
    }
    return PRE_RESUME.apply(this,arguments);
  };
  try{resumeBattleCallerAfterCompletion=globalThis.resumeBattleCallerAfterCompletion;}catch(_){}
}

function effectiveStat(key){
  const metal=getPlayerCharacter(METAL);if(!metal)return 0;
  try{
    const stats=typeof getDevelopedEffectiveCharacterStats==="function"?getDevelopedEffectiveCharacterStats(metal):(metal.stats||metal.baseStats||{});
    return Math.max(0,Number(stats&&stats[key])||0);
  }catch(_){return Math.max(0,Number((metal.stats||metal.baseStats||{})[key])||0);}
}
function resolveProtectiveResponse(kind){
  const table={
    redirect_dummy:{statKey:"tai",statLabel:"Taijutsu",successMin:14,partialMin:11},
    take_impact:{statKey:"stamina",statLabel:"Stamina",successMin:14,partialMin:11},
    destroy_dummy:{statKey:"tai",statLabel:"Taijutsu",successMin:15,partialMin:12}
  };
  const rule=table[kind];if(!rule)return{success:false,reason:"metal_protective_response_kind_invalid"};
  const value=effectiveStat(rule.statKey),outcome=value>=rule.successMin?"success":value>=rule.partialMin?"partial":"failure";
  const intervention=outcome==="success"?null:GENIN;
  return{success:true,resolverId:"academy_metal_lee_origin_protective_response_v1",hazardId:"academy_metal_origin_training_dummy_hazard_v1",attempted:true,protectiveResponseKind:kind,protectiveResponseOutcome:outcome,resolverStatKey:rule.statKey,resolverStatLabel:rule.statLabel,resolverStatValue:value,successThreshold:rule.successMin,partialThreshold:rule.partialMin,interventionRequired:!!intervention,interventionParticipantRef:intervention};
}
function diagnostics(){
  const enemy=enemyDatabase&&enemyDatabase[GENIN],actions=enemy&&enemy.authoredBattleActions||[];
  const checks={
    exactProfile:!!enemy&&enemy.calibratedBasePL===15&&JSON.stringify(enemy.baseStats)===JSON.stringify({nin:12,tai:16,buki:11,fuin:6,kin:7,gen:8,stamina:15}),
    storyScopedNonCollectible:!!enemy&&enemy.provenance.storyScoped===true&&enemy.provenance.noCollectibleAdmission===true,
    exactBattlePortrait:!!enemy&&enemy.image===BATTLE_PORTRAIT&&enemy.provenance.battlePortraitPath===BATTLE_PORTRAIT&&enemy.provenance.battlePortraitAuthorityBlobSha===BATTLE_PORTRAIT_BLOB_SHA,
    exactFiveActions:JSON.stringify(actions.map(a=>a.id))===JSON.stringify(AI_IDS),
    exactDisplayNames:JSON.stringify(actions.map(a=>a.displayName))===JSON.stringify(["Sparring Jab","Turning Kick","Guarded Stance","Feint Entry","Committed Lunge"]),
    deterministicCycle:!!PRE_CHOOSE&&AI_IDS.length===5&&actions.length===5&&actions.every((action,index)=>action&&action.id===AI_IDS[index]&&typeof action.evaluateAvailability==="function"),
    lungeSixSeven:actions[4]&&actions[4].contextualAttackPL&&actions[4].contextualAttackPL.normal===6&&actions[4].contextualAttackPL.afterFeint===7,
    guardTwentyFive:actions[2]&&actions[2].preventionRatio===0.25,
    fixedPerformanceBands:classify.toString().includes('ratio>0.50?"strong":ratio>=0.25?"mixed":"rough"')&&START_MAX===13,
    fixedVictoryReward:enemy.rewards.ryo.min===FIXED_VICTORY_RYO&&enemy.rewards.ryo.max===FIXED_VICTORY_RYO&&enemy.rewards.exp.min===0&&enemy.rewards.exp.max===0&&FIXED_VICTORY_RYO===50,
    rewardClaimWired:!!PRE_GENERATE&&!!PRE_CLAIM&&String(projectRewards).includes("requiresExplicitPostClaimContinue=false"),
    met03ExactResolver:resolveProtectiveResponse("redirect_dummy").resolverId==="academy_metal_lee_origin_protective_response_v1"&&resolveProtectiveResponse("take_impact").hazardId==="academy_metal_origin_training_dummy_hazard_v1",
    met03NoRandomness:!String(resolveProtectiveResponse).includes("Math.random"),
    met03ClosedVocabulary:!String(resolveProtectiveResponse).includes("attempt_committed")&&!String(resolveProtectiveResponse).includes('protectiveResponseKind:"intercept"')&&!String(resolveProtectiveResponse).includes('protectiveResponseOutcome:"protected"'),
    internalDispatchAutoRouted:!!PRE_ADVANCE&&metalInternalRouteTarget396({sceneId:SCENE_ID,beatId:"met_spar_dispatch",localContext:{metalSparPerformanceClass:"strong"}})==="met_spar_strong_01"&&metalInternalRouteTarget396({sceneId:SCENE_ID,beatId:"met_redirect_dispatch",localContext:{metalProtectiveOutcome:"partial"}})==="met_redirect_partial_01",
    saveReload:!!PRE_SAVE&&!!PRE_RESTORE&&typeof globalThis.saveTestState==="function"&&typeof globalThis.restoreTestState==="function",
    noStoryOccurrenceCommit:String(launch).includes("sourceOccurrenceId")&&!String(launch).includes("consumeStaticOriginSourceOccurrence")
  };
  const failed=Object.entries(checks).filter(([,v])=>v!==true).map(([k])=>k);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const installed=registerProfile();if(!installed.success)throw new Error(installed.reason);
globalThis.launchAcademyMetalControlledSpar396=launch;
globalThis.projectAcademyMetalControlledSpar396=projectResult;
globalThis.resolveAcademyMetalProtectiveResponse396=resolveProtectiveResponse;
globalThis.claimAcademyMetalControlledSparReward396=claimReward;
globalThis.runAcademyMetalOriginRuntime396Diagnostics=diagnostics;
globalThis.SC_ACADEMY_METAL_ORIGIN_RUNTIME_396=Object.freeze({patchId:PATCH_ID,battleConfigId:CONFIG,encounterId:ENCOUNTER,participantRefs:Object.freeze({metal:METAL,genin:GENIN}),met02:MET02,met03:MET03,startingUnderlyingMaximum:START_MAX,environmentPath:ENVIRONMENT,battlePortrait:BATTLE_PORTRAIT,fixedVictoryRyo:FIXED_VICTORY_RYO,rewardSourceId:REWARD_SOURCE_ID,browserGoldenClaimed:false});
})();
