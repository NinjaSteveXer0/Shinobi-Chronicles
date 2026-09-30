// ============================================================================
// ACADEMY IWABEE — ROGUE GENIN BATTLE CONSUMER — #399
//
// World authority:
// Documentation/World/Academy Iwabee Rogue Genin Disposition and Custody Resolution 2026-09-27.md
// Combat authority:
// Documentation/Combat/SC_Combat_Academy_Iwabee_Rogue_Genin_Consumer_and_Viability_Contradiction_2026-09-27.md
// Writing authority:
// Documentation/Story/Academy_Iwabee_Origin_WRITING_GOLDEN_2026-09-27.md
//
// Battle capability != World disposition. This adapter reports only factual
// withdrawal/result state; Story/World commits escape/custody in 32900-b.
// ============================================================================
(function installAcademyIwabeeOriginRuntime399(){
"use strict";
if(globalThis.SC_ACADEMY_IWABEE_ORIGIN_RUNTIME_399)return;

const PATCH_ID="academy_iwabee_origin_runtime_399_2026_09_27";
const IWABEE="academy_iwabee";
const ROGUE="iwabee_origin_rogue_genin_01";
const TEMPLATE="rogue_genin";
const CONFIG="academy_iwabee_origin_rogue_confrontation";
const ENCOUNTER="origin_academy_iwabee:rogue_genin_confrontation";
const SOURCE="occ_origin_iwabee_rogue_genin_response_resolution";
const SCENE_ID="origin_academy_iwabee_prologue";
const ENVIRONMENT="Scene backdrops/academy_training_ground_courtyard.png";
const FIXED_VICTORY_RYO=50;
const REWARD_SOURCE_ID="iwabee_origin_rogue_genin_battle_victory_ryo_01";
const PROFILE=Object.freeze({
  id:ROGUE,name:"ROGUE GENIN",rank:"Rogue Genin",pl:23,
  stats:Object.freeze({nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24}),
  image:"Enemies/rogue_genin.png"
});

function clone(v){try{return typeof cloneBattleRuntimeValue==="function"?cloneBattleRuntimeValue(v):JSON.parse(JSON.stringify(v));}catch(_){return v;}}
function meta(){return currentBattle&&currentBattle.iwabee399||null;}
function applyEnvironment(){
  if(!currentBattle)return false;
  currentBattle.environmentPath=ENVIRONMENT;
  currentBattle.presentationEnvironmentPath=ENVIRONMENT;
  return true;
}
function registerProfile(){
  if(typeof enemyDatabase!=="object"||!enemyDatabase)return{success:false,reason:"enemy_database_missing"};
  if(typeof buildReusableRogueGeninOppositionActions399!=="function")return{success:false,reason:"rogue_genin_shared_package_missing"};
  enemyDatabase[ROGUE]={
    id:ROGUE,name:PROFILE.name,rank:PROFILE.rank,power:PROFILE.pl,calibratedBasePL:PROFILE.pl,
    baseStats:{...PROFILE.stats},stats:{...PROFILE.stats},image:PROFILE.image,
    oppositionTemplateId:TEMPLATE,
    rewards:{ryo:{min:FIXED_VICTORY_RYO,max:FIXED_VICTORY_RYO},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},
    provenance:{origin:"academy_iwabee",historicalParticipantRef:ROGUE,oppositionTemplateId:TEMPLATE,storyScoped:true,noRegistryAdmission:true,noCollectibleAdmission:true,noAutoScaling:true},
    noSummon:true,noTransformation:true,noBossScaling:true
  };
  const packageState=buildReusableRogueGeninOppositionActions399({participantId:ROGUE,metaGetter:meta});
  enemyDatabase[ROGUE].authoredBattleActions=packageState.actions;
  enemyDatabase[ROGUE].iwabee399PackageState=packageState;
  return{success:true};
}

const PRE_CHOOSE=typeof chooseEnemyAuthoredBattleAction==="function"?chooseEnemyAuthoredBattleAction:null;
if(PRE_CHOOSE){
  globalThis.chooseEnemyAuthoredBattleAction=function chooseIwabee399EnemyAction(state=null){
    if(currentBattle&&currentBattle.iwabee399&&currentBattle.active===true){
      const enemy=enemyDatabase&&enemyDatabase[ROGUE],pkg=enemy&&enemy.iwabee399PackageState;
      if(pkg&&typeof pkg.expireFeint==="function")pkg.expireFeint();
    }
    return PRE_CHOOSE.apply(this,arguments);
  };
  try{chooseEnemyAuthoredBattleAction=globalThis.chooseEnemyAuthoredBattleAction;}catch(_){}
}

function rewardHistory(){if(!playerData.activityHistory||!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];return playerData.activityHistory;}
function isExactRewardBattle(){return !!(currentBattle&&currentBattle.iwabee399&&currentBattle.battleConfigId===CONFIG&&currentBattle.encounterId===ENCOUNTER);}
function projectRewards(rewards=null){
  if(!isExactRewardBattle())return rewards;
  const victory=currentBattle&&currentBattle.outcome&&currentBattle.outcome.type==="victory";
  const out=rewards&&typeof rewards==="object"?rewards:{generated:true,claimed:false};
  out.generated=true;out.claimed=out.claimed===true;out.ryo=victory?FIXED_VICTORY_RYO:0;out.exp=0;out.items=[];out.rareDrops=[];
  out.requiresExplicitPostClaimContinue=false;out.iwabee399FixedReward=true;out.iwabee399RewardSourceId=REWARD_SOURCE_ID;out.battleOccurrenceId=meta().battleOccurrenceId;
  currentBattle.rewards=out;return out;
}
const PRE_GENERATE=typeof generateBattleRewards==="function"?generateBattleRewards:null;
if(PRE_GENERATE){
  globalThis.generateBattleRewards=function generateIwabee399Rewards(){
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
  const m=meta();if(!m)return{success:false,reason:"iwabee399_battle_not_active"};
  if(!currentBattle.outcome||currentBattle.outcome.type!=="victory")return{success:false,reason:"iwabee399_victory_required"};
  const prior=existingRewardReceipt();if(prior){if(currentBattle.rewards)currentBattle.rewards.claimed=true;return{success:true,idempotent:true,receipt:prior};}
  if(!currentBattle.rewards||currentBattle.rewards.generated!==true)projectRewards(currentBattle.rewards);
  if(currentBattle.rewards.claimed===true)return{success:false,reason:"iwabee399_reward_claim_state_without_receipt"};
  playerData.ryo=Math.max(0,Number(playerData.ryo)||0)+FIXED_VICTORY_RYO;
  const receipt={type:"origin_battle_reward",rewardSourceId:REWARD_SOURCE_ID,battleOccurrenceId:m.battleOccurrenceId,battleConfigId:CONFIG,encounterId:ENCOUNTER,actorVariantId:IWABEE,ryo:FIXED_VICTORY_RYO,exp:0,items:[],rareDrops:[],claimedAt:Date.now()};
  rewardHistory().push(receipt);currentBattle.rewards.claimed=true;currentBattle.claimedAt=Date.now();
  try{recordBattleChronicle();}catch(_){}
  savePlayerData();saveTestState();return{success:true,idempotent:false,receipt:clone(receipt)};
}
const PRE_CLAIM=typeof claimCurrentBattleRewards==="function"?claimCurrentBattleRewards:null;
if(PRE_CLAIM){
  globalThis.claimCurrentBattleRewards=function claimIwabee399Rewards(){if(isExactRewardBattle())return claimReward().success===true;return PRE_CLAIM.apply(this,arguments);};
  try{claimCurrentBattleRewards=globalThis.claimCurrentBattleRewards;}catch(_){}
}

const PRE_SAVE=typeof saveTestState==="function"?saveTestState:null;
if(PRE_SAVE){
  globalThis.saveTestState=function saveIwabee399State(){
    const result=PRE_SAVE.apply(this,arguments);
    if(currentBattle&&currentBattle.iwabee399&&typeof sessionStorage!=="undefined"){
      try{
        const raw=sessionStorage.getItem("shinobiTestState"),state=raw?JSON.parse(raw):{};
        state.iwabee399=clone(currentBattle.iwabee399);
        state.iwabee399BattleActive=currentBattle.active===true&&currentBattle.battleOver!==true;
        state.iwabee399BattleLaunches=clone(playerData&&playerData.iwabee399BattleLaunches||{});
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
  globalThis.restoreTestState=function restoreIwabee399State(){
    let saved=null,active=false,launches=null;
    if(typeof sessionStorage!=="undefined"){
      try{
        const raw=sessionStorage.getItem("shinobiTestState"),state=raw?JSON.parse(raw):null;
        if(state&&state.iwabee399&&String(state.encounterId||"")===ENCOUNTER&&String(state.battleConfigId||"")===CONFIG){
          saved=clone(state.iwabee399);active=state.iwabee399BattleActive===true;launches=clone(state.iwabee399BattleLaunches||{});
          if(currentBattle){currentBattle.iwabee399=clone(saved);currentBattle.battleConfigId=CONFIG;currentBattle.encounterId=ENCOUNTER;applyEnvironment();}
        }
      }catch(_){}
    }
    const result=PRE_RESTORE.apply(this,arguments);
    if(saved&&currentBattle){
      currentBattle.iwabee399=clone(saved);currentBattle.battleConfigId=CONFIG;currentBattle.encounterId=ENCOUNTER;applyEnvironment();
      if(active&&currentBattle.battleOver!==true)currentBattle.active=true;
    }
    if(saved&&launches&&playerData){playerData.iwabee399BattleLaunches=playerData.iwabee399BattleLaunches||{};Object.assign(playerData.iwabee399BattleLaunches,launches);}
    return result;
  };
  try{restoreTestState=globalThis.restoreTestState;}catch(_){}
}

const PRE_RENDER_ROW=typeof renderBattleActionFamilyRow==="function"?renderBattleActionFamilyRow:null;
if(PRE_RENDER_ROW){
  globalThis.renderBattleActionFamilyRow=function renderIwabee399ActionFamilyRow(actor){
    const html=PRE_RENDER_ROW.apply(this,arguments);
    if(!(currentBattle&&currentBattle.iwabee399&&currentBattle.iwabee399.strictOneVsOne===true))return html;
    return String(html).replace(/\s*<button\b[^>]*class="[^"]*\bbattle-live-withdraw-action\b[^"]*"[^>]*>[\s\S]*?<\/button>/i,"");
  };
  try{renderBattleActionFamilyRow=globalThis.renderBattleActionFamilyRow;}catch(_){}
}

function strictDeployment(){
  const iwabee=getPlayerCharacter(IWABEE);if(!iwabee)return{success:false,reason:"academy_iwabee_battle_identity_missing"};
  currentBattle.deployment=currentBattle.deployment||{};
  currentBattle.deployment.player={slots:createBattleDeploymentSlots([IWABEE])};currentBattle.characterId=IWABEE;syncBattleActivePlayerFromDeployment();
  configureBattleEnemyParticipants([ROGUE]);currentBattle.deployment.enemy={slots:createBattleDeploymentSlots([ROGUE])};syncBattleActiveEnemyFromDeployment();
  initializeBattleContributionRecordsFromDeployment();initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true});
  try{initializeBattlePouchFromPreparedSelection();}catch(_){}
  try{initializeBattleAttachedSummonRuntimeFromDeployment();}catch(_){}
  try{initializeBattleDedicatedVariantRuntimePackages();}catch(_){}
  return{success:currentBattle.activePlayer&&currentBattle.activePlayer.id===IWABEE&&currentBattle.enemy&&currentBattle.enemy.id===ROGUE};
}
function exactBattleId(sceneInstanceId){return "battle_occ_origin_iwabee_rogue_genin_confrontation:"+String(sceneInstanceId||"");}
function launchStore(){if(!playerData.iwabee399BattleLaunches||typeof playerData.iwabee399BattleLaunches!=="object")playerData.iwabee399BattleLaunches={};return playerData.iwabee399BattleLaunches;}
function launch(spec={}){
  if(!spec.returnContext||spec.returnContext.type!=="story_scene"||String(spec.returnContext.sceneId)!==SCENE_ID)return{success:false,reason:"iwabee_story_return_context_invalid"};
  const sceneInstanceId=spec.returnContext.sceneInstanceId||null;if(!sceneInstanceId)return{success:false,reason:"iwabee_story_instance_missing"};
  const battleId=exactBattleId(sceneInstanceId),store=launchStore();
  if(store[battleId]){
    if(currentBattle&&currentBattle.battleId===battleId&&currentBattle.iwabee399)return{success:true,idempotent:true,battleId,encounterId:ENCOUNTER,battleConfigId:CONFIG};
    return{success:false,reason:"iwabee_battle_occurrence_already_committed_without_runtime",battleId};
  }
  const launched=launchBattleWithReturnContext(ROGUE,ENCOUNTER,{...clone(spec.returnContext),battleConfigId:CONFIG,sourceOccurrenceId:SOURCE,historicalParticipantRef:ROGUE,oppositionTemplateId:TEMPLATE});
  if(!launched||launched.success!==true)return launched||{success:false,reason:"iwabee_battle_launch_failed"};
  currentBattle.battleId=battleId;currentBattle.encounterId=ENCOUNTER;currentBattle.battleConfigId=CONFIG;currentBattle.oppositionTemplateId=TEMPLATE;applyEnvironment();
  const deployed=strictDeployment();if(!deployed.success)return deployed;
  currentBattle.enemyPower=23;currentBattle.enemyMaxPower=23;
  currentBattle.iwabee399={patchId:PATCH_ID,battleConfigId:CONFIG,battleOccurrenceId:battleId,sourceOccurrenceId:SOURCE,historicalParticipantRef:ROGUE,oppositionTemplateId:TEMPLATE,strictOneVsOne:true,feintUsed:false,feintCreatedEnemyOpportunityIndex:null,noHiddenScaling:true};
  initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true});
  if(currentBattle.rewards){currentBattle.rewards={generated:false,claimed:false,ryo:0,exp:0,items:[],rareDrops:[],requiresExplicitPostClaimContinue:false,iwabee399FixedReward:true,iwabee399RewardSourceId:REWARD_SOURCE_ID};}
  const evidence=recordBattleEvidence({
    eventType:"academy_iwabee_rogue_genin_battle_launched",committedOccurrence:true,
    actorRef:createBattleParticipantRef("player",IWABEE),targetRef:createBattleParticipantRef("enemy",ROGUE),
    sourceRefs:[{type:"origin_source_occurrence",id:SOURCE,role:"world_response_source"},{type:"historical_participant",id:ROGUE,role:"opposition_participant"},{type:"opposition_template",id:TEMPLATE,role:"capability_source"}],
    data:{battleOccurrenceId:battleId,battleConfigId:CONFIG,encounterId:ENCOUNTER,iwabeeBasePL:13,rogueBasePL:23,noAutoScaling:true,noHiddenHandicap:true,victoryRewardRyo:FIXED_VICTORY_RYO,rewardSourceId:REWARD_SOURCE_ID,battleResultDoesNotEstablishDisposition:true}
  });
  store[battleId]={battleOccurrenceId:battleId,launchEvidenceId:evidence&&evidence.evidenceId||null,createdAt:Date.now()};
  savePlayerData();saveTestState();openOverlay("combat");
  return{success:true,battleId,encounterId:ENCOUNTER,battleConfigId:CONFIG,playerParticipantIds:[IWABEE],oppositionParticipantIds:[ROGUE]};
}
function projectResult(){
  if(!(currentBattle&&currentBattle.iwabee399))return null;
  const outcome=currentBattle.outcome&&currentBattle.outcome.type||null;
  return{
    battleOccurrenceId:currentBattle.iwabee399.battleOccurrenceId,
    sourceOccurrenceId:SOURCE,historicalParticipantRef:ROGUE,oppositionTemplateId:TEMPLATE,
    battleResult:outcome==="victory"?"victory":outcome==="defeat"?"defeat":"unresolved",
    iwabeeBattleWithdrawn:getBattleRemainingPL("player",IWABEE)<=0,
    rogueBattleWithdrawn:getBattleRemainingPL("enemy",ROGUE)<=0
  };
}
const PRE_RESUME=typeof resumeBattleCallerAfterCompletion==="function"?resumeBattleCallerAfterCompletion:null;
if(PRE_RESUME){
  globalThis.resumeBattleCallerAfterCompletion=function resumeIwabee399Caller(outcomeType=null){
    if(currentBattle&&currentBattle.iwabee399&&currentBattle.returnContext&&currentBattle.returnContext.type==="story_scene"){
      const p=projectResult(),active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
      if(active&&active.sceneId===SCENE_ID&&p){
        active.localContext=active.localContext||{};
        active.localContext.iwabeeRogueBattleOccurrenceId=p.battleOccurrenceId;
        active.localContext.iwabeeRogueBattleResult=p.battleResult;
        active.localContext.iwabeeBattleWithdrawn=p.iwabeeBattleWithdrawn;
        active.localContext.iwabeeRogueBattleWithdrawn=p.rogueBattleWithdrawn;
      }
    }
    return PRE_RESUME.apply(this,arguments);
  };
  try{resumeBattleCallerAfterCompletion=globalThis.resumeBattleCallerAfterCompletion;}catch(_){}
}

function diagnostics(){
  const enemy=enemyDatabase&&enemyDatabase[ROGUE],actions=enemy&&enemy.authoredBattleActions||[];
  const checks={
    exactHistoricalIdentity:!!enemy&&enemy.id===ROGUE&&enemy.provenance.historicalParticipantRef===ROGUE,
    reusableTemplateSeparated:!!enemy&&enemy.oppositionTemplateId===TEMPLATE&&ROGUE!==TEMPLATE,
    exactProfile:!!enemy&&enemy.calibratedBasePL===23&&JSON.stringify(enemy.baseStats)===JSON.stringify({nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24}),
    sharedActionPackage:JSON.stringify(actions.map(a=>a.id))===JSON.stringify(["enemy_rogue_genin_kunai_rush","enemy_rogue_genin_shuriken_spread","enemy_rogue_genin_substitution_feint"])&&typeof buildReusableRogueGeninOppositionActions399==="function",
    noAutoScaling:enemy.provenance.noAutoScaling===true,
    strictOneVsOne:String(strictDeployment).includes("createBattleDeploymentSlots([IWABEE])")&&String(strictDeployment).includes("createBattleDeploymentSlots([ROGUE])"),
    fixedVictoryReward:enemy.rewards.ryo.min===FIXED_VICTORY_RYO&&enemy.rewards.ryo.max===FIXED_VICTORY_RYO&&enemy.rewards.exp.min===0&&enemy.rewards.exp.max===0&&FIXED_VICTORY_RYO===50,
    stableRewardReceipt:String(claimReward).includes('type:"origin_battle_reward"')&&String(claimReward).includes("battleOccurrenceId")&&REWARD_SOURCE_ID==="iwabee_origin_rogue_genin_battle_victory_ryo_01",
    observerSafeBattleResult:String(projectResult).includes("iwabeeBattleWithdrawn")&&String(projectResult).includes("rogueBattleWithdrawn")&&!String(projectResult).includes("custody"),
    noIWA02FromBattle:!String(launch).includes("IWA-02")&&!String(projectResult).includes("earthReleaseUsedToConstrainRogueGenin"),
    saveReload:!!PRE_SAVE&&!!PRE_RESTORE&&typeof globalThis.saveTestState==="function"&&typeof globalThis.restoreTestState==="function",
    worldDispositionNotOwnedHere:!String(launch).includes("rogueDisposition")&&!String(projectResult).includes("rogueDisposition")
  };
  const failed=Object.entries(checks).filter(([,v])=>v!==true).map(([k])=>k);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const installed=registerProfile();if(!installed.success)throw new Error(installed.reason);
globalThis.launchAcademyIwabeeRogueConfrontation399=launch;
globalThis.projectAcademyIwabeeRogueConfrontation399=projectResult;
globalThis.runAcademyIwabeeOriginRuntime399Diagnostics=diagnostics;
globalThis.SC_ACADEMY_IWABEE_ORIGIN_RUNTIME_399=Object.freeze({patchId:PATCH_ID,battleConfigId:CONFIG,encounterId:ENCOUNTER,sourceOccurrenceId:SOURCE,participantRefs:Object.freeze({iwabee:IWABEE,rogueGenin:ROGUE}),oppositionTemplateId:TEMPLATE,environmentPath:ENVIRONMENT,fixedVictoryRyo:FIXED_VICTORY_RYO,rewardSourceId:REWARD_SOURCE_ID,browserGoldenClaimed:false});
})();
