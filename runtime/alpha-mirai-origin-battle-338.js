// ============================================================================
// #338 — ACADEMY MIRAI DISGUISED INSTRUCTOR PL BATTLE
// Combat authority: SC_Combat_Academy_Mirai_Disguised_Instructor_PL_Battle_Closure_2026-09-29.md
// ============================================================================
(function installAcademyMiraiDisguisedInstructorBattle338(){
"use strict";
if(globalThis.SC_ACADEMY_MIRAI_DISGUISED_INSTRUCTOR_BATTLE_338)return;

const PATCH_ID="academy_mirai_disguised_instructor_battle_338_2026_09_29";
const CONFIG="academy_mirai_origin_disguised_instructor_battle";
const ENCOUNTER="origin_academy_mirai_disguised_instructor_assessment";
const SCENE_ID="origin_academy_mirai_prologue";
const MIRAI="academy_mirai";
const INSTRUCTOR="academy_mirai_origin_instructor";
const BATTLE_PORTRAIT="NPC portrait/mirai_instructor_disguised.png";
const SHORTCUT_CALLER="academy_mirai_origin_shortcut_battle";
const CONFRONT_CALLER="academy_mirai_origin_confrontation_battle";
const CALLERS=Object.freeze([SHORTCUT_CALLER,CONFRONT_CALLER]);
const FIXED_VICTORY_RYO=50;
const REWARD_SOURCE_ID="mirai_origin_disguised_instructor_battle_victory_ryo_01";
const GUARD_STATE="academy_mirai_instructor_substitution_guard_ready";
const TESTING_STRIKE="academy_mirai_instructor_testing_strike";
const SUBSTITUTION_GUARD="academy_mirai_instructor_substitution_guard";
const TURNING_SWEEP="academy_mirai_instructor_turning_sweep";
const ACTION_LOOP=Object.freeze([TESTING_STRIKE,SUBSTITUTION_GUARD,TURNING_SWEEP]);
const PROFILE=Object.freeze({pl:16,stats:Object.freeze({nin:17,tai:14,buki:10,fuin:6,kin:7,gen:12,stamina:15})});

function clone(v){try{return typeof cloneBattleRuntimeValue==="function"?cloneBattleRuntimeValue(v):JSON.parse(JSON.stringify(v));}catch(_){return v;}}
function meta(){return currentBattle&&currentBattle.mirai338&&currentBattle.mirai338.battleConfigId===CONFIG?currentBattle.mirai338:null;}
function isExact(){return !!meta()&&currentBattle&&currentBattle.encounterId===ENCOUNTER;}
function rewardHistory(){if(!playerData.activityHistory||!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];return playerData.activityHistory;}
function occurrenceId(callerId,sceneInstanceId){return "battle_occ_origin_mirai_disguised_instructor:"+String(callerId||"")+":"+String(sceneInstanceId||"");}
function launchStore(){if(!playerData.mirai338BattleLaunches||typeof playerData.mirai338BattleLaunches!=="object")playerData.mirai338BattleLaunches={};return playerData.mirai338BattleLaunches;}

function wrapCycleAction(base,index,displayName){
  const raw=base.resolve;
  return{...base,displayName,resolve(context){
    const m=meta();
    if(!m||Number(m.aiCycleIndex)%ACTION_LOOP.length!==index)return{resolved:false,reason:"mirai338_ai_cycle_mismatch"};
    const result=raw.call(base,context);
    if(result&&result.resolved===true){
      if(index===1){
        const state=findBattleTransientState({stateKey:GUARD_STATE,targetSide:"enemy",targetParticipantId:INSTRUCTOR});
        if(state&&state.data){
          state.data.requiresDirectAttackPLPacket=true;
          state.data.mirai338ExactQuarterGuard=true;
          m.guardCreatedEnemyOpportunityIndex=getBattleActionOpportunityIndex("enemy",INSTRUCTOR);
        }
      }
      m.lastEnemyActionId=ACTION_LOOP[index];
      m.aiCycleIndex=(index+1)%ACTION_LOOP.length;
      m.enemyActionsResolved=Math.max(0,Number(m.enemyActionsResolved)||0)+1;
    }
    return result;
  }};
}
const testingStrike=wrapCycleAction(makeEnemyFixedDamageAction(TESTING_STRIKE,4,{primaryDiscipline:"Taijutsu",traits:["assessment_action","direct_damage"]}),0,"Testing Strike");
const substitutionGuard=wrapCycleAction(makeEnemyRatioGuardAction(SUBSTITUTION_GUARD,0.25,{stateKey:GUARD_STATE,traits:["assessment_action","single_target_direct_mitigable_attack_pl_packet_only","expires_before_instructor_next_action","no_counter_damage","no_forced_miss","no_reposition"]}),1,"Substitution Guard");
const turningSweep=wrapCycleAction(makeEnemyFixedDamageAction(TURNING_SWEEP,5,{primaryDiscipline:"Taijutsu",traits:["assessment_action","direct_damage"]}),2,"Turning Sweep");

function registerProfile(){
  if(typeof enemyDatabase!=="object"||!enemyDatabase)return{success:false,reason:"enemy_database_missing"};
  enemyDatabase[INSTRUCTOR]={
    id:INSTRUCTOR,oppositionTemplateId:"academy_mirai_origin_disguised_instructor",
    name:"TRAVELLER",displayName:"TRAVELLER",apparentRole:"ESCORT",
    calibratedBasePL:PROFILE.pl,power:PROFILE.pl,baseStats:{...PROFILE.stats},stats:{...PROFILE.stats},
    image:BATTLE_PORTRAIT,rewards:{ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},
    authoredBattleActions:[testingStrike,substitutionGuard,turningSweep],
    provenance:{stableParticipantId:INSTRUCTOR,underlyingIdentity:"female_academy_instructor",observerPresentation:"male_traveller_escort_disguise",battlePortraitPath:BATTLE_PORTRAIT,battlePortraitAuthorityCommit:"38e4d0ebd89176d7d30aa2cc6044565711353ee6",noRegistryAdmission:true}
  };
  return{success:true};
}

function expireUnusedGuardBeforeInstructorOpportunity(){
  const m=meta();if(!m)return null;
  const state=findBattleTransientState({stateKey:GUARD_STATE,targetSide:"enemy",targetParticipantId:INSTRUCTOR});
  if(!state)return null;
  const created=Number(m.guardCreatedEnemyOpportunityIndex),now=getBattleActionOpportunityIndex("enemy",INSTRUCTOR);
  if(Number.isFinite(created)&&now>created){
    removeBattleTransientState(state.stateId);
    m.guardCreatedEnemyOpportunityIndex=null;m.guardExpiredUnused=true;
    return{expired:true,stateId:state.stateId};
  }
  return{expired:false,stateId:state.stateId};
}
const PRE_CHOOSE=typeof chooseEnemyAuthoredBattleAction==="function"?chooseEnemyAuthoredBattleAction:null;
if(PRE_CHOOSE){
  globalThis.chooseEnemyAuthoredBattleAction=function chooseMirai338InstructorAction(schedulerState=null){
    if(!isExact())return PRE_CHOOSE.apply(this,arguments);
    expireUnusedGuardBeforeInstructorOpportunity();
    const state=schedulerState&&schedulerState.ready===true?schedulerState:evaluateEnemyActionScheduler();
    if(!state||state.ready!==true)return{success:false,...(state||{}),reason:state&&state.reason||"mirai338_scheduler_not_ready"};
    const expected=ACTION_LOOP[Number(meta().aiCycleIndex)%ACTION_LOOP.length];
    const candidates=state.eligibleActions||[],action=candidates.find(row=>row&&row.id===expected)||null;
    if(!action)return{success:false,reason:"mirai338_expected_action_not_eligible",expectedActionId:expected,eligibleActionIds:candidates.map(row=>row.id)};
    return{success:true,action,eligibleActionIds:candidates.map(row=>row.id),randomnessAppliedAfterEligibility:false,equalSelectionWeight:false,deterministicAssessmentLoop:true};
  };
  try{chooseEnemyAuthoredBattleAction=globalThis.chooseEnemyAuthoredBattleAction;}catch(_){}
}

// #338 closes Substitution Guard as exact -25% before Stamina. Generic ratio
// guards round the intermediate Attack PL; this bridge preserves 4.5 exactly
// for the one scoped encounter (Crossing Strike 6 -> 4.5 -> 3 after Stamina).
const PRE_PRE_DEFENSE=typeof resolveBattlePreStaminaDefense==="function"?resolveBattlePreStaminaDefense:null;
if(PRE_PRE_DEFENSE){
  globalThis.resolveBattlePreStaminaDefense=function resolveMirai338QuarterGuard(definition){
    const m=meta();
    const guard=m&&definition&&definition.targetSide==="enemy"&&definition.targetParticipantId===INSTRUCTOR
      ?findBattleTransientState({stateKey:GUARD_STATE,targetSide:"enemy",targetParticipantId:INSTRUCTOR}):null;
    const result=PRE_PRE_DEFENSE.apply(this,arguments);
    if(!m||!guard||definition.qualifyingDirectAttackPLPacket!==true)return result;
    const row=(result.ratioGuards||[]).find(item=>item&&item.stateId===guard.stateId&&item.participated===true);
    if(!row)return result;
    const exact=Math.max(0,Number(row.before)*0.75);
    row.after=exact;row.multiplier=0.75;row.preventionRatio=0.25;row.actualReduction=Math.max(0,Number(row.before)-exact);
    result.resolvedAttackPL=exact;
    m.pendingFractionalGuardStamina={actionId:definition.actionId||null,resolvedAttackPL:exact};
    return result;
  };
  try{resolveBattlePreStaminaDefense=globalThis.resolveBattlePreStaminaDefense;}catch(_){}
}
const PRE_STAMINA=typeof calculateBattleStaminaMitigationV1==="function"?calculateBattleStaminaMitigationV1:null;
if(PRE_STAMINA){
  globalThis.calculateBattleStaminaMitigationV1=function calculateMirai338FractionalGuardStamina(resolvedAttackPL,effectiveStamina,pivot){
    const m=meta(),pending=m&&m.pendingFractionalGuardStamina;
    if(!pending||Math.abs(Number(resolvedAttackPL)-Number(pending.resolvedAttackPL))>0.000001)return PRE_STAMINA.apply(this,arguments);
    m.pendingFractionalGuardStamina=null;
    const attack=Math.max(0,Number(resolvedAttackPL)||0),stamina=Math.max(0,Number(effectiveStamina)||0),staminaPivot=Math.max(1,Number(pivot)||100);
    if(attack<=0)return{resolvedAttackPL:0,effectiveStamina:stamina,pivot:staminaPivot,mitigationAmount:0,finalDamage:0};
    const finalDamage=Math.max(1,Math.floor(attack*staminaPivot/(staminaPivot+stamina)));
    return{resolvedAttackPL:attack,effectiveStamina:stamina,pivot:staminaPivot,mitigationAmount:Math.max(0,attack-finalDamage),finalDamage};
  };
  try{calculateBattleStaminaMitigationV1=globalThis.calculateBattleStaminaMitigationV1;}catch(_){}
}

function strictDeployment(){
  const mirai=getPlayerCharacter(MIRAI);
  if(!currentBattle||currentBattle.active!==true)return{success:false,reason:"mirai338_battle_not_active"};
  if(!mirai)return{success:false,reason:"academy_mirai_battle_identity_missing"};
  currentBattle.deployment=currentBattle.deployment||{};
  currentBattle.deployment.player={slots:createBattleDeploymentSlots([MIRAI])};
  currentBattle.characterId=MIRAI;syncBattleActivePlayerFromDeployment();
  if(!currentBattle.activePlayer||currentBattle.activePlayer.id!==MIRAI)return{success:false,reason:"academy_mirai_not_active_slot_1"};
  configureBattleEnemyParticipants([INSTRUCTOR]);
  currentBattle.deployment.enemy={slots:createBattleDeploymentSlots([INSTRUCTOR])};syncBattleActiveEnemyFromDeployment();
  initializeBattleContributionRecordsFromDeployment();
  currentBattle.enemyPower=PROFILE.pl;currentBattle.enemyMaxPower=PROFILE.pl;
  initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true});
  try{if(typeof initializeBattlePouchFromPreparedSelection==="function")initializeBattlePouchFromPreparedSelection();}catch(_){}
  try{if(typeof initializeBattleAttachedSummonRuntimeFromDeployment==="function")initializeBattleAttachedSummonRuntimeFromDeployment();}catch(_){}
  try{if(typeof initializeBattleDedicatedVariantRuntimePackages==="function")initializeBattleDedicatedVariantRuntimePackages();}catch(_){}
  const p=(currentBattle.deployment.player.slots||[]).map(s=>s.participantId).filter(Boolean),e=(currentBattle.deployment.enemy.slots||[]).map(s=>s.participantId).filter(Boolean);
  return{success:JSON.stringify(p)===JSON.stringify([MIRAI])&&JSON.stringify(e)===JSON.stringify([INSTRUCTOR]),playerIds:p,enemyIds:e};
}

function projectRewards(rewards=null){
  if(!isExact())return rewards;
  const victory=currentBattle&&currentBattle.outcome&&currentBattle.outcome.type==="victory";
  const out=rewards&&typeof rewards==="object"?rewards:{generated:true,claimed:false};
  out.generated=true;out.claimed=out.claimed===true;out.ryo=victory?FIXED_VICTORY_RYO:0;out.exp=0;out.items=[];out.rareDrops=[];
  out.requiresExplicitPostClaimContinue=true;out.mirai338FixedReward=true;out.mirai338RewardSourceId=REWARD_SOURCE_ID;out.battleOccurrenceId=meta().battleOccurrenceId;
  currentBattle.rewards=out;return out;
}
const PRE_GENERATE=typeof generateBattleRewards==="function"?generateBattleRewards:null;
if(PRE_GENERATE){
  globalThis.generateBattleRewards=function generateMirai338Rewards(){const base=PRE_GENERATE.apply(this,arguments);return isExact()?projectRewards(base):base;};
  try{generateBattleRewards=globalThis.generateBattleRewards;}catch(_){}
}
function existingRewardReceipt(){
  const m=meta();if(!m)return null;
  return rewardHistory().find(row=>row&&row.type==="origin_battle_reward"&&row.rewardSourceId===REWARD_SOURCE_ID&&row.battleOccurrenceId===m.battleOccurrenceId)||null;
}
function claimReward(){
  const m=meta();if(!m)return{success:false,reason:"mirai338_battle_not_active"};
  if(!currentBattle.outcome||currentBattle.outcome.type!=="victory")return{success:false,reason:"mirai338_victory_required"};
  const prior=existingRewardReceipt();if(prior){if(currentBattle.rewards)currentBattle.rewards.claimed=true;return{success:true,idempotent:true,receipt:prior};}
  if(!currentBattle.rewards||currentBattle.rewards.generated!==true)projectRewards(currentBattle.rewards);
  if(currentBattle.rewards.claimed===true)return{success:false,reason:"mirai338_reward_claim_state_without_receipt"};
  playerData.ryo=Math.max(0,Number(playerData.ryo)||0)+FIXED_VICTORY_RYO;
  const receipt={type:"origin_battle_reward",rewardSourceId:REWARD_SOURCE_ID,battleOccurrenceId:m.battleOccurrenceId,battleConfigId:CONFIG,encounterId:ENCOUNTER,callerId:m.callerId,actorVariantId:MIRAI,ryo:FIXED_VICTORY_RYO,exp:0,items:[],rareDrops:[],claimedAt:Date.now()};
  rewardHistory().push(receipt);currentBattle.rewards.claimed=true;currentBattle.claimedAt=Date.now();
  try{recordBattleChronicle();}catch(_){}
  savePlayerData();saveTestState();return{success:true,idempotent:false,receipt:clone(receipt)};
}
const PRE_CLAIM=typeof claimCurrentBattleRewards==="function"?claimCurrentBattleRewards:null;
if(PRE_CLAIM){
  globalThis.claimCurrentBattleRewards=function claimMirai338Rewards(){if(isExact())return claimReward().success===true;return PRE_CLAIM.apply(this,arguments);};
  try{claimCurrentBattleRewards=globalThis.claimCurrentBattleRewards;}catch(_){}
}

const PRE_SAVE=typeof saveTestState==="function"?saveTestState:null;
if(PRE_SAVE){
  globalThis.saveTestState=function saveMirai338State(){
    const result=PRE_SAVE.apply(this,arguments);
    try{const raw=sessionStorage.getItem("shinobiTestState");if(!raw)return result;const state=JSON.parse(raw);state.mirai338=currentBattle&&currentBattle.mirai338?clone(currentBattle.mirai338):null;state.mirai338BattleLaunches=playerData&&playerData.mirai338BattleLaunches?clone(playerData.mirai338BattleLaunches):{};state.battleConfigId=currentBattle&&currentBattle.battleConfigId||null;sessionStorage.setItem("shinobiTestState",JSON.stringify(state));}catch(_){}
    return result;
  };
  try{saveTestState=globalThis.saveTestState;}catch(_){}
}
const PRE_RESTORE=typeof restoreTestState==="function"?restoreTestState:null;
if(PRE_RESTORE){
  globalThis.restoreTestState=function restoreMirai338State(){
    let saved=null;try{const raw=sessionStorage.getItem("shinobiTestState");saved=raw?JSON.parse(raw):null;}catch(_){}
    const result=PRE_RESTORE.apply(this,arguments);
    if(saved&&saved.mirai338&&saved.mirai338.battleConfigId===CONFIG){
      currentBattle.mirai338=clone(saved.mirai338);currentBattle.battleConfigId=CONFIG;currentBattle.encounterId=ENCOUNTER;
      if(saved.mirai338BattleLaunches&&typeof saved.mirai338BattleLaunches==="object")playerData.mirai338BattleLaunches=clone(saved.mirai338BattleLaunches);
      try{if(currentBattle.active===true)openOverlay("combat");}catch(_){}
    }
    return result;
  };
  try{restoreTestState=globalThis.restoreTestState;}catch(_){}
}

function launch(spec={}){
  const callerId=String(spec.callerId||"");
  if(!CALLERS.includes(callerId))return{success:false,reason:"mirai338_caller_invalid"};
  if(!spec.returnContext||spec.returnContext.type!=="story_scene"||String(spec.returnContext.sceneId)!==SCENE_ID)return{success:false,reason:"mirai338_story_return_context_invalid"};
  const sceneInstanceId=spec.returnContext.sceneInstanceId||null;if(!sceneInstanceId)return{success:false,reason:"mirai338_story_instance_missing"};
  const exactId=occurrenceId(callerId,sceneInstanceId),store=launchStore(),prior=store[exactId]||null;
  if(prior){
    if(currentBattle&&currentBattle.battleId===exactId&&meta())return{success:true,idempotent:true,battleId:exactId,encounterId:ENCOUNTER,battleConfigId:CONFIG,callerId};
    return{success:false,reason:"mirai338_battle_occurrence_already_committed_without_runtime",battleId:exactId};
  }
  const launched=launchBattleWithReturnContext(INSTRUCTOR,ENCOUNTER,clone(spec.returnContext));
  if(!launched||launched.success!==true)return launched||{success:false,reason:"mirai338_battle_launch_failed"};
  currentBattle.battleId=exactId;currentBattle.battleConfigId=CONFIG;currentBattle.encounterId=ENCOUNTER;
  currentBattle.mirai338={patchId:PATCH_ID,battleConfigId:CONFIG,battleOccurrenceId:exactId,callerId,stableParticipantId:INSTRUCTOR,observerPresentation:"male_traveller_escort_disguise",underlyingIdentity:"female_academy_instructor",identityRevealedByBattle:false,aiCycleIndex:0,enemyActionsResolved:0,guardCreatedEnemyOpportunityIndex:null,strictOneVsOne:true,playerStarts:true,launchEvidenceId:null};
  const deployment=strictDeployment();if(!deployment.success)return deployment;
  currentBattle.battleLog=["TRAVELLER steps into Mirai's path.","MIRAI prepares for battle."];
  if(currentBattle.rewards){currentBattle.rewards.ryo=0;currentBattle.rewards.exp=0;currentBattle.rewards.items=[];currentBattle.rewards.rareDrops=[];currentBattle.rewards.requiresExplicitPostClaimContinue=true;}
  const evidence=recordBattleEvidence({eventType:"academy_mirai_disguised_instructor_battle_launched",committedOccurrence:true,actorRef:createBattleParticipantRef("player",MIRAI),targetRef:createBattleParticipantRef("enemy",INSTRUCTOR),sourceRefs:[{type:"story_scene",id:SCENE_ID,role:"battle_caller"}],data:{battleOccurrenceId:exactId,battleConfigId:CONFIG,encounterId:ENCOUNTER,callerId,strictOneVsOne:true,playerStarts:true,identityRevealedByBattle:false,victoryRewardRyo:FIXED_VICTORY_RYO}});
  if(!evidence)return{success:false,reason:"mirai338_launch_evidence_failed"};
  currentBattle.mirai338.launchEvidenceId=evidence.evidenceId;
  store[exactId]={battleOccurrenceId:exactId,battleConfigId:CONFIG,encounterId:ENCOUNTER,callerId,launchEvidenceId:evidence.evidenceId||null,createdAt:Date.now()};
  savePlayerData();saveTestState();openOverlay("combat");
  return{success:true,battleId:exactId,encounterId:ENCOUNTER,battleConfigId:CONFIG,callerId,playerParticipantIds:[MIRAI],oppositionParticipantIds:[INSTRUCTOR]};
}

function projectResult(){
  const m=meta();if(!m)return null;
  const type=currentBattle&&currentBattle.outcome&&currentBattle.outcome.type||null;
  return{battleOccurrenceId:m.battleOccurrenceId,battleConfigId:CONFIG,encounterId:ENCOUNTER,callerId:m.callerId,battleResult:type==="victory"?"victory":type==="defeat"?"defeat":"unresolved",miraiBattlePLDepleted:type==="defeat",instructorBattlePLDepleted:type==="victory",stableParticipantRef:INSTRUCTOR,identityRevealedByBattle:false};
}

function diagnostics(){
  const enemy=enemyDatabase&&enemyDatabase[INSTRUCTOR],actions=enemy&&enemy.authoredBattleActions||[];
  const checks={
    exactProfile:!!enemy&&enemy.calibratedBasePL===16&&JSON.stringify(enemy.baseStats)===JSON.stringify(PROFILE.stats),
    observerSafePresentation:!!enemy&&enemy.name==="TRAVELLER"&&enemy.image===BATTLE_PORTRAIT&&enemy.provenance.observerPresentation==="male_traveller_escort_disguise"&&enemy.provenance.underlyingIdentity==="female_academy_instructor",
    exactDeterministicLoop:actions.map(a=>a.id).join("|")===ACTION_LOOP.join("|")&&String(globalThis.chooseEnemyAuthoredBattleAction).includes("deterministicAssessmentLoop:true"),
    exactGuard:String(globalThis.resolveBattlePreStaminaDefense).includes("0.75")&&String(globalThis.calculateBattleStaminaMitigationV1).includes("attack*staminaPivot"),
    exactCallers:CALLERS.join("|")==="academy_mirai_origin_shortcut_battle|academy_mirai_origin_confrontation_battle",
    exactOccurrence:occurrenceId(SHORTCUT_CALLER,"qa")==="battle_occ_origin_mirai_disguised_instructor:academy_mirai_origin_shortcut_battle:qa",
    exactReward:FIXED_VICTORY_RYO===50,
    saveReloadEnvelope:!!PRE_SAVE&&!!PRE_RESTORE&&String(globalThis.saveTestState).includes("state.mirai338")&&String(globalThis.restoreTestState).includes("currentBattle.battleConfigId=CONFIG"),
    strictOneVsOne:String(strictDeployment).includes("createBattleDeploymentSlots([MIRAI])")&&String(strictDeployment).includes("createBattleDeploymentSlots([INSTRUCTOR])"),
    identityNeverRevealedByBattle:String(projectResult).includes("identityRevealedByBattle:false"),
    exactBattlePortrait:enemy.image===BATTLE_PORTRAIT&&enemy.provenance.battlePortraitPath===BATTLE_PORTRAIT&&enemy.provenance.battlePortraitAuthorityCommit==="38e4d0ebd89176d7d30aa2cc6044565711353ee6",
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
const installed=registerProfile();if(!installed.success)throw new Error(installed.reason);
globalThis.launchAcademyMiraiDisguisedInstructorBattle338=launch;
globalThis.projectAcademyMiraiDisguisedInstructorBattle338=projectResult;
globalThis.claimAcademyMiraiDisguisedInstructorReward338=claimReward;
globalThis.runAcademyMiraiDisguisedInstructorBattle338Diagnostics=diagnostics;
globalThis.SC_ACADEMY_MIRAI_DISGUISED_INSTRUCTOR_BATTLE_338=Object.freeze({patchId:PATCH_ID,battleConfigId:CONFIG,encounterId:ENCOUNTER,stableParticipantId:INSTRUCTOR,battlePortrait:BATTLE_PORTRAIT,callerIds:CALLERS,rewardSourceId:REWARD_SOURCE_ID,fixedVictoryRyo:FIXED_VICTORY_RYO,actionLoop:ACTION_LOOP,browserGoldenClaimed:false});
})();