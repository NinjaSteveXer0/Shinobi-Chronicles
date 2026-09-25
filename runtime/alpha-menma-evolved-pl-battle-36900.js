// ============================================================================
// ISSUE #369 — MENMA-FIRST EVOLVED PL BATTLE ALPHA TRANCHE — 36900
//
// Scope:
// - exact Academy Menma Origin successor Battle only;
// - PL / Remaining Battle PL remains the health identity;
// - one player-side opportunity, one enemy-side opportunity, alternating;
// - Menma / Anko player-side entitlement alternates without promoting Anko;
// - enemy Active alone spends the enemy-side opportunity;
// - no choreography/timer/DOM callback owns semantic advancement.
//
// Authority:
// Documentation/Coordination/PL_Battle_Identity_and_Menma_Alpha_Overhaul_Reconciliation_2026-09-25.md
// Documentation/Coordination/Six_Shinobi_Relay_Formation_and_Alternating_Side_Turn_Battle_Concept_Lock_2026-09-25.md
// Documentation/Coordination/Battle_Failure_Containment_Recovery_and_Catastrophe_Safeguards_2026-09-25.md
// Documentation/Combat/SC_Combat_Academy_Menma_Anko_Three_Subject_Origin_Battle_Closure_2026-09-25.md
// ============================================================================
(function installMenmaEvolvedPLBattle36900(){
"use strict";
if(globalThis.SC_MENMA_EVOLVED_PL_BATTLE_36900)return;

const PATCH_ID="menma_evolved_pl_battle_36900_2026_09_25";
const BATTLE_CONFIG_ID="academy_menma_origin_three_test_subjects_with_anko";
const ENCOUNTER_ID="origin_academy_menma_prologue:three_test_subjects";
const OBJECTIVE_ID="stop_three_test_subjects";
const ENTITLEMENT_ID="menma_origin_anko_autonomous_assist";
const STORY_SCENE_ID="origin_academy_menma_prologue";
const STORY_BATTLE_BEAT_ID="tutorial_battle";
const MENMA_ID="academy_menma";
const ANKO_ID="sj_anko";
const HOSTILE_IDS=Object.freeze([
  "test_subject_altered_shinobi",
  "test_subject_brute",
  "test_subject_unstable"
]);
const ALLIED_IDS=Object.freeze([MENMA_ID,ANKO_ID]);
const BATTLE_OCCURRENCE_PREFIX="battle_occ_origin_academy_menma_three_test_subjects:";
const ANKO_STATS=Object.freeze({nin:56,tai:52,buki:48,fuin:44,kin:58,gen:39,stamina:55});
const ANKO_BASE_PL=56;
const ANKO_DIRECT_ACTIONS=Object.freeze({
  sj_anko_hidden_shadow_snake_hands:Object.freeze({attackPL:20,discipline:"Ninjutsu"}),
  sj_anko_fire_style_dragon_flame:Object.freeze({attackPL:24,discipline:"Ninjutsu"})
});

function clone(value){
  try{return typeof cloneBattleRuntimeValue==="function"?cloneBattleRuntimeValue(value):JSON.parse(JSON.stringify(value));}
  catch(_error){return value;}
}
function battle(){
  try{return typeof currentBattle==="object"&&currentBattle?currentBattle:null;}catch(_error){}
  return globalThis.currentBattle&&typeof globalThis.currentBattle==="object"?globalThis.currentBattle:null;
}
function player(){
  try{return typeof playerData==="object"&&playerData?playerData:null;}catch(_error){}
  return globalThis.playerData&&typeof globalThis.playerData==="object"?globalThis.playerData:null;
}
function isExactBattle(value=battle()){
  return !!value&&String(value.encounterId||"")===ENCOUNTER_ID&&String(value.battleConfigId||"")===BATTLE_CONFIG_ID;
}
function sceneInstanceId(value=battle()){
  const context=value&&value.returnContext;
  if(!context||context.type!=="story_scene"||String(context.sceneId||"")!==STORY_SCENE_ID)return null;
  const id=String(context.sceneInstanceId||"").trim();
  return id||null;
}
function battleOccurrenceId(value=battle()){
  const id=sceneInstanceId(value);
  return id?BATTLE_OCCURRENCE_PREFIX+id:null;
}
function makeAnkoParticipant(){
  return {
    id:ANKO_ID,
    registryId:ANKO_ID,
    name:"SPECIAL JŌNIN ANKO",
    displayName:"Special Jōnin Anko",
    rank:"Special Jōnin",
    formalRank:"special_jonin",
    power:ANKO_BASE_PL,
    calibratedBasePL:ANKO_BASE_PL,
    baseStats:{...ANKO_STATS},
    stats:{...ANKO_STATS},
    uiPortrait:"Portraits/Special Jonin/sj_anko.png",
    encounterLocalAlliedNpc:true,
    ownershipGranted:false,
    myClanAssigned:false,
    playerSelectable:false,
    autonomousAssistEntitlementId:ENTITLEMENT_ID
  };
}
function ensureLocalAnko(){
  const b=battle();
  if(!b)return null;
  if(!b.menma369LocalAllies||typeof b.menma369LocalAllies!=="object")b.menma369LocalAllies={};
  if(!b.menma369LocalAllies[ANKO_ID])b.menma369LocalAllies[ANKO_ID]=makeAnkoParticipant();
  return b.menma369LocalAllies[ANKO_ID];
}
function createState(sceneId=null){
  return {
    version:1,
    battleConfigId:BATTLE_CONFIG_ID,
    encounterId:ENCOUNTER_ID,
    objectiveId:OBJECTIVE_ID,
    entitlementId:ENTITLEMENT_ID,
    storySceneInstanceId:sceneId||null,
    semanticGeneration:1,
    phase:"player",
    playerOpportunityOrdinal:1,
    enemyOpportunityOrdinal:0,
    playerEntitlementIndex:0,
    inputLocked:false,
    processing:false,
    committedOpportunities:{},
    rngChoices:{},
    ankoBoundTargetIds:[],
    ankoSerpentEvasionSpent:false,
    menmaWithdrawn:false,
    ankoWithdrawn:false,
    resolvedHostileIds:[],
    terminalResult:null,
    lastSemanticEvent:null
  };
}
function normalizeState(raw,sceneId=null){
  const base=createState(sceneId);
  if(!raw||typeof raw!=="object")return base;
  const next={...base,...clone(raw)};
  next.battleConfigId=BATTLE_CONFIG_ID;
  next.encounterId=ENCOUNTER_ID;
  next.objectiveId=OBJECTIVE_ID;
  next.entitlementId=ENTITLEMENT_ID;
  next.storySceneInstanceId=sceneId||next.storySceneInstanceId||null;
  next.semanticGeneration=Math.max(1,Number(next.semanticGeneration)||1);
  next.playerOpportunityOrdinal=Math.max(1,Number(next.playerOpportunityOrdinal)||1);
  next.enemyOpportunityOrdinal=Math.max(0,Number(next.enemyOpportunityOrdinal)||0);
  next.playerEntitlementIndex=Math.max(0,Number(next.playerEntitlementIndex)||0);
  next.committedOpportunities=next.committedOpportunities&&typeof next.committedOpportunities==="object"?next.committedOpportunities:{};
  next.rngChoices=next.rngChoices&&typeof next.rngChoices==="object"?next.rngChoices:{};
  next.ankoBoundTargetIds=Array.isArray(next.ankoBoundTargetIds)?[...new Set(next.ankoBoundTargetIds.filter(id=>HOSTILE_IDS.includes(id)))]:[];
  next.resolvedHostileIds=Array.isArray(next.resolvedHostileIds)?[...new Set(next.resolvedHostileIds.filter(id=>HOSTILE_IDS.includes(id)))]:[];
  next.processing=false;
  return next;
}
function ensureState(){
  const b=battle();
  if(!b||!isExactBattle(b))return null;
  let current=b.menmaEvolvedPLBattle36900;
  if(!current||typeof current!=="object"){
    current=createState(sceneInstanceId(b));
    b.menmaEvolvedPLBattle36900=current;
    return current;
  }
  // Keep one stable semantic-state object for the whole live Battle. Replacing
  // it during nested resolver reads would strand the outer settle loop on a
  // stale phase/entitlement snapshot and violate exactly-once ownership.
  current.battleConfigId=BATTLE_CONFIG_ID;
  current.encounterId=ENCOUNTER_ID;
  current.objectiveId=OBJECTIVE_ID;
  current.entitlementId=ENTITLEMENT_ID;
  current.storySceneInstanceId=sceneInstanceId(b)||current.storySceneInstanceId||null;
  current.semanticGeneration=Math.max(1,Number(current.semanticGeneration)||1);
  current.playerOpportunityOrdinal=Math.max(1,Number(current.playerOpportunityOrdinal)||1);
  current.enemyOpportunityOrdinal=Math.max(0,Number(current.enemyOpportunityOrdinal)||0);
  current.playerEntitlementIndex=Math.max(0,Number(current.playerEntitlementIndex)||0);
  if(!current.committedOpportunities||typeof current.committedOpportunities!=="object")current.committedOpportunities={};
  if(!current.rngChoices||typeof current.rngChoices!=="object")current.rngChoices={};
  if(!Array.isArray(current.ankoBoundTargetIds))current.ankoBoundTargetIds=[];
  if(!Array.isArray(current.resolvedHostileIds))current.resolvedHostileIds=[];
  return current;
}
function ankoPresent(){
  const s=ensureState();
  if(!s||s.ankoWithdrawn)return false;
  try{return Number(getBattleRemainingPL("player",ANKO_ID))>0;}catch(_error){return false;}
}
function menmaPresent(){
  const s=ensureState();
  if(!s||s.menmaWithdrawn)return false;
  try{return Number(getBattleRemainingPL("player",MENMA_ID))>0;}catch(_error){return false;}
}
function currentPlayerEntitlement(){
  const s=ensureState();
  if(!s)return null;
  if(!ankoPresent())return MENMA_ID;
  return s.playerEntitlementIndex%2===0?MENMA_ID:ANKO_ID;
}
function currentOpportunityId(side){
  const b=battle(),s=ensureState();
  if(!b||!s)return null;
  const ordinal=side==="player"?s.playerOpportunityOrdinal:s.enemyOpportunityOrdinal;
  return String(b.battleId||"battle")+":"+side+"_opportunity:"+String(ordinal);
}
function opportunityCommitted(side){
  const s=ensureState(),id=currentOpportunityId(side);
  return !!(s&&id&&s.committedOpportunities[id]);
}
function markOpportunityCommitted(side,actorId,actionId,kind){
  const s=ensureState(),id=currentOpportunityId(side);
  if(!s||!id)return{success:false,reason:"semantic_state_missing"};
  if(s.committedOpportunities[id])return{success:false,idempotent:true,reason:"side_opportunity_already_committed",opportunityId:id,receipt:s.committedOpportunities[id]};
  const receipt={
    opportunityId:id,
    side,
    actorId:actorId||null,
    actionId:actionId||null,
    kind:kind||"committed_action",
    entitlementIndex:side==="player"?s.playerEntitlementIndex:null,
    semanticGeneration:s.semanticGeneration
  };
  s.committedOpportunities[id]=receipt;
  s.lastSemanticEvent=clone(receipt);
  return{success:true,opportunityId:id,receipt};
}
function getInputReadiness(){
  const s=ensureState();
  if(!s)return{ready:false,reason:"not_menma_successor_battle"};
  if(!battle().active||battle().battleOver)return{ready:false,reason:"battle_not_active"};
  if(s.phase!=="player")return{ready:false,reason:"enemy_side_opportunity"};
  if(currentPlayerEntitlement()!==MENMA_ID)return{ready:false,reason:"anko_autonomous_assist_opportunity"};
  if(s.inputLocked||s.processing)return{ready:false,reason:"semantic_input_locked"};
  if(opportunityCommitted("player"))return{ready:false,reason:"side_opportunity_already_committed"};
  return{ready:true,reason:null,opportunityId:currentOpportunityId("player")};
}
function persistBattleSnapshot(){
  try{if(typeof saveTestState==="function")saveTestState();}catch(_error){}
}
function liveHostile(id){
  if(!HOSTILE_IDS.includes(id))return false;
  try{return Number(getBattleRemainingPL("enemy",id))>0;}catch(_error){return false;}
}
function activeEnemy(){
  try{return getBattleDeploymentParticipant("enemy",1);}catch(_error){return null;}
}
function updateResolvedHostiles(){
  const s=ensureState();
  if(!s)return[];
  HOSTILE_IDS.forEach(id=>{if(!liveHostile(id)&&!s.resolvedHostileIds.includes(id))s.resolvedHostileIds.push(id);});
  return[...s.resolvedHostileIds];
}
function hasMovementPreventingRestraint(side,participantId){
  try{
    const conditions=typeof getBattleParticipantConditions==="function"?getBattleParticipantConditions(side,participantId):[];
    if(conditions.some(c=>c&&(c.conditionType==="physical_restraint"||(c.data&&c.data.movementPreventing===true))))return true;
    const runtime=typeof ensureBattleRuntimeState==="function"?ensureBattleRuntimeState():null;
    const states=runtime&&Array.isArray(runtime.transientStates)?runtime.transientStates:[];
    return states.some(st=>st&&st.targetRef&&st.targetRef.side===side&&st.targetRef.participantId===participantId&&st.data&&st.data.semanticClass==="physical_restraint");
  }catch(_error){return false;}
}
function committedChoice(opportunityId,choiceClass,candidateIds){
  const s=ensureState();
  if(!s||!opportunityId||!Array.isArray(candidateIds)||candidateIds.length===0)return null;
  const existing=s.rngChoices[opportunityId];
  if(existing&&existing.choiceClass===choiceClass&&candidateIds.includes(existing.selectedId))return existing.selectedId;
  const index=Math.floor(Math.random()*candidateIds.length);
  const selectedId=candidateIds[Math.max(0,Math.min(candidateIds.length-1,index))];
  s.rngChoices[opportunityId]={
    opportunityId,
    choiceClass,
    candidateIds:[...candidateIds],
    selectedId,
    randomnessAppliedAfterEligibility:true,
    equalSelectionWeight:true
  };
  persistBattleSnapshot();
  return selectedId;
}

const PRE_GET_PARTICIPANT=typeof getBattleParticipantByIdentity==="function"?getBattleParticipantByIdentity:null;
if(PRE_GET_PARTICIPANT){
  const wrapped=function(side,participantId){
    if(isExactBattle()&&side==="player"&&participantId===ANKO_ID)return ensureLocalAnko();
    return PRE_GET_PARTICIPANT.apply(this,arguments);
  };
  globalThis.getBattleParticipantByIdentity=wrapped;try{getBattleParticipantByIdentity=wrapped;}catch(_error){}
}
const PRE_GET_DEPLOYED=typeof getBattleDeploymentParticipant==="function"?getBattleDeploymentParticipant:null;
if(PRE_GET_DEPLOYED){
  const wrapped=function(side,slotNumber){
    if(isExactBattle()&&side==="player"){
      const slot=typeof getBattleDeploymentSlot==="function"?getBattleDeploymentSlot(side,slotNumber):null;
      if(slot&&slot.participantId===ANKO_ID)return ensureLocalAnko();
    }
    return PRE_GET_DEPLOYED.apply(this,arguments);
  };
  globalThis.getBattleDeploymentParticipant=wrapped;try{getBattleDeploymentParticipant=wrapped;}catch(_error){}
}
const PRE_EFFECTIVE_STATS=typeof getBattleEffectiveStatsForParticipant==="function"?getBattleEffectiveStatsForParticipant:null;
if(PRE_EFFECTIVE_STATS){
  const wrapped=function(side,participantId){
    if(isExactBattle()&&side==="player"&&participantId===ANKO_ID)return{...ANKO_STATS};
    return PRE_EFFECTIVE_STATS.apply(this,arguments);
  };
  globalThis.getBattleEffectiveStatsForParticipant=wrapped;try{getBattleEffectiveStatsForParticipant=wrapped;}catch(_error){}
}
const PRE_NORMALIZE_DEPLOYMENT=typeof normalizeBattleDeployment==="function"?normalizeBattleDeployment:null;
if(PRE_NORMALIZE_DEPLOYMENT){
  const wrapped=function(rawDeployment,fallbackActivePlayerId=null){
    const normalized=PRE_NORMALIZE_DEPLOYMENT.apply(this,arguments);
    if(!isExactBattle()||!rawDeployment||typeof rawDeployment!=="object")return normalized;
    const rawSlots=rawDeployment.player&&Array.isArray(rawDeployment.player.slots)?rawDeployment.player.slots:[];
    const ids=[];
    for(let slotNumber=1;slotNumber<=6;slotNumber+=1){
      const slot=rawSlots.find(row=>Number(row&&row.slotNumber)===slotNumber);
      const id=slot&&slot.participantId;
      if(id===MENMA_ID||id===ANKO_ID)ids.push(id);else ids.push(null);
    }
    if(ids[0]!==MENMA_ID)ids[0]=MENMA_ID;
    if(ids[1]!==ANKO_ID&&!ensureState()?.ankoWithdrawn)ids[1]=ANKO_ID;
    normalized.player={slots:createBattleDeploymentSlots(ids)};
    return normalized;
  };
  globalThis.normalizeBattleDeployment=wrapped;try{normalizeBattleDeployment=wrapped;}catch(_error){}
}

const PRE_CREATE_ENVELOPE=typeof createBattleActionEnvelope==="function"?createBattleActionEnvelope:null;
if(PRE_CREATE_ENVELOPE){
  const wrapped=function(definition){
    if(!isExactBattle()||!definition||typeof definition!=="object")return PRE_CREATE_ENVELOPE.apply(this,arguments);
    const side=definition.actorSide;
    const s=ensureState();
    const augmented={...definition,data:{...(definition.data||{}),
      menmaEvolvedSideOpportunityId:currentOpportunityId(side),
      menmaEvolvedSemanticGeneration:s?s.semanticGeneration:null
    }};
    return PRE_CREATE_ENVELOPE.call(this,augmented);
  };
  globalThis.createBattleActionEnvelope=wrapped;try{createBattleActionEnvelope=wrapped;}catch(_error){}
}
const PRE_VALIDATE_ENVELOPE=typeof validateBattleActionEnvelope==="function"?validateBattleActionEnvelope:null;
if(PRE_VALIDATE_ENVELOPE){
  const wrapped=function(envelope){
    if(!isExactBattle())return PRE_VALIDATE_ENVELOPE.apply(this,arguments);
    const s=ensureState();
    if(!s||!envelope||!envelope.actorRef)return{valid:false,reason:"menma_evolved_semantic_state_missing",blockingConditionIds:[]};
    const side=envelope.actorRef.side,actorId=envelope.actorRef.participantId;
    const expectedId=currentOpportunityId(side);
    const supplied=envelope.data&&envelope.data.menmaEvolvedSideOpportunityId;
    const suppliedGeneration=envelope.data&&envelope.data.menmaEvolvedSemanticGeneration;
    if(supplied&&supplied!==expectedId)return{valid:false,reason:"stale_side_opportunity_token",blockingConditionIds:[]};
    if(suppliedGeneration!=null&&Number(suppliedGeneration)!==Number(s.semanticGeneration))return{valid:false,reason:"stale_battle_semantic_generation",blockingConditionIds:[]};
    if(opportunityCommitted(side))return{valid:false,reason:"side_opportunity_already_committed",blockingConditionIds:[]};
    if(side==="player"){
      if(s.phase!=="player")return{valid:false,reason:"player_action_outside_player_side_opportunity",blockingConditionIds:[]};
      const entitled=currentPlayerEntitlement();
      if(actorId!==entitled)return{valid:false,reason:"player_side_entitlement_actor_mismatch",blockingConditionIds:[]};
      if(actorId===MENMA_ID&&s.inputLocked)return{valid:false,reason:"semantic_input_locked",blockingConditionIds:[]};
      if(actorId===ANKO_ID){
        const blocking=typeof getBattleBlockingConditions==="function"?getBattleBlockingConditions("player",ANKO_ID,envelope.actionClass,(envelope.data&&Array.isArray(envelope.data.traits))?envelope.data.traits:[]):[];
        return{valid:blocking.length===0,reason:blocking.length?"blocked_by_condition":null,blockingConditionIds:blocking.map(c=>c.conditionId)};
      }
    }else if(side==="enemy"){
      if(s.phase!=="enemy")return{valid:false,reason:"enemy_action_outside_enemy_side_opportunity",blockingConditionIds:[]};
      const enemy=activeEnemy();
      if(!enemy||enemy.id!==actorId)return{valid:false,reason:"enemy_actor_not_active",blockingConditionIds:[]};
    }
    return PRE_VALIDATE_ENVELOPE.apply(this,arguments);
  };
  globalThis.validateBattleActionEnvelope=wrapped;try{validateBattleActionEnvelope=wrapped;}catch(_error){}
}

const PRE_CAN_WITHDRAW=typeof canWithdrawActiveBattleFighter==="function"?canWithdrawActiveBattleFighter:null;
if(PRE_CAN_WITHDRAW){
  const wrapped=function(){if(isExactBattle())return false;return PRE_CAN_WITHDRAW.apply(this,arguments);};
  globalThis.canWithdrawActiveBattleFighter=wrapped;try{canWithdrawActiveBattleFighter=wrapped;}catch(_error){}
}
const PRE_WITHDRAW=typeof withdrawActiveBattleFighter==="function"?withdrawActiveBattleFighter:null;
if(PRE_WITHDRAW){
  const wrapped=function(){
    if(isExactBattle()){
      try{recordBattleEvidence({eventType:"manual_withdraw_rejected",committedOccurrence:false,actorRef:createBattleParticipantRef("player",MENMA_ID),data:{reason:"menma_origin_manual_withdraw_not_authorised",actionOpportunityConsumed:false}});}catch(_error){}
      return false;
    }
    return PRE_WITHDRAW.apply(this,arguments);
  };
  globalThis.withdrawActiveBattleFighter=wrapped;try{withdrawActiveBattleFighter=wrapped;}catch(_error){}
}

const PRE_DEFENSE=typeof resolveBattlePreStaminaDefense==="function"?resolveBattlePreStaminaDefense:null;
if(PRE_DEFENSE){
  const wrapped=function(definition){
    if(isExactBattle()&&definition&&definition.targetSide==="player"&&definition.targetParticipantId===ANKO_ID&&definition.qualifyingDirectAttackPLPacket!==false){
      const state=findBattleTransientState({stateKey:"sj_anko_serpent_evasion_ready",targetSide:"player",targetParticipantId:ANKO_ID});
      if(state){
        const incoming=Math.max(0,Math.round(Number(definition.attackPL)||0));
        removeBattleTransientState(state.stateId);
        try{recordBattleEvidence({eventType:"sj_anko_serpent_evasion_consumed",committedOccurrence:false,actionId:definition.actionId||null,actorRef:createBattleParticipantRef("player",ANKO_ID),sourceRefs:[{type:"skill",id:"sj_anko_serpent_evasion"}],stateRefs:[state.stateId],data:{incomingAttackPL:incoming,resolvedAttackPL:0,deterministicAvoidance:true,noAccuracyRoll:true}});}catch(_error){}
        return{
          incomingAttackPL:incoming,resolvedAttackPL:0,
          guardingStep:{participated:false,stateId:null,attemptedReduction:0,actualReduction:0},
          enmaGuard:{participated:false,stateId:null,attemptedReduction:0,actualReduction:0,sourceId:null},
          flatGuards:[],ratioGuards:[],consumedStateIds:[state.stateId],
          serpentEvasion:{participated:true,stateId:state.stateId,deterministicAvoidance:true}
        };
      }
    }
    return PRE_DEFENSE.apply(this,arguments);
  };
  globalThis.resolveBattlePreStaminaDefense=wrapped;try{resolveBattlePreStaminaDefense=wrapped;}catch(_error){}
}

function expireUnusedAnkoEvasionAtOpportunityStart(){
  const state=findBattleTransientState({stateKey:"sj_anko_serpent_evasion_ready",targetSide:"player",targetParticipantId:ANKO_ID});
  if(!state)return false;
  removeBattleTransientState(state.stateId);
  try{recordBattleEvidence({eventType:"sj_anko_serpent_evasion_expired",committedOccurrence:false,actorRef:createBattleParticipantRef("player",ANKO_ID),stateRefs:[state.stateId],data:{reason:"start_of_next_anko_assist_opportunity"}});}catch(_error){}
  return true;
}
function ankoTarget(){
  for(const id of ["test_subject_brute","test_subject_unstable","test_subject_altered_shinobi"]){
    if(liveHostile(id)){
      try{const target=getBattleParticipantByIdentity("enemy",id);if(target)return target;}catch(_error){}
    }
  }
  return null;
}
function resolveAnkoDirectDamage(skillId,target,envelope){
  const contract=ANKO_DIRECT_ACTIONS[skillId];
  if(!contract||!target)return{resolved:false,reason:"anko_direct_contract_missing"};
  const attackPL=contract.attackPL;
  const output={
    primaryDiscipline:contract.discipline,
    statKey:typeof getBattlePrimaryDisciplineStatKey==="function"?getBattlePrimaryDisciplineStatKey(contract.discipline):"nin",
    effectivePrimaryDiscipline:ANKO_STATS.nin,
    coefficient:null,
    branch:"fixed_authored_anko_origin_assist",
    branchMultiplier:1,
    authoredPreExecutionMagnitude:attackPL,
    weaponExecutionMultiplier:1,
    preDefenseAttackMagnitude:attackPL,
    attackPL,
    fixedCalibration:true
  };
  const damage=resolveBattleDamagePacket({
    envelope,
    skill:{id:skillId,mechanicalPacketCount:1},
    actorSide:"player",actorParticipantId:ANKO_ID,
    targetSide:"enemy",targetParticipantId:target.id,
    output,mitigable:true,excess:null,stateRefs:[]
  });
  return damage?{resolved:true,branch:"anko_origin_direct_damage",damageApplied:true,finalDamage:Number(damage.finalDamage)||0,damage}:{resolved:false,reason:"anko_damage_resolution_failed"};
}
function resolveAnkoBind(target,envelope){
  if(!target)return{resolved:false,reason:"anko_bind_target_missing"};
  const s=ensureState();
  if(s.ankoBoundTargetIds.includes(target.id))return{resolved:false,reason:"anko_bind_target_already_used"};
  const condition=addBattleCondition({
    conditionKey:"sj_anko_snake_bind",
    conditionType:"physical_restraint",
    sourceSide:"player",sourceParticipantId:ANKO_ID,
    targetSide:"enemy",targetParticipantId:target.id,
    sourceSkillId:"sj_anko_snake_bind",
    ownerRef:{type:"skill",id:"sj_anko_snake_bind"},
    blockedActionTraits:["movement_dependent"],
    data:{
      semanticClass:"physical_restraint",
      movementPreventing:true,
      blanketStun:false,
      notStun:true,
      remainingActionOpportunities:1,
      reapplication:"no_stack",
      activationActionId:envelope.actionId
    }
  });
  if(condition&&!s.ankoBoundTargetIds.includes(target.id))s.ankoBoundTargetIds.push(target.id);
  return condition?{resolved:true,branch:"anko_snake_bind",damageApplied:false,conditionRefs:[condition.conditionId],stateRefs:[]}:{resolved:false,reason:"anko_bind_establishment_failed"};
}
function resolveAnkoEvasion(envelope){
  const existing=findBattleTransientState({stateKey:"sj_anko_serpent_evasion_ready",targetSide:"player",targetParticipantId:ANKO_ID});
  if(existing)return{resolved:false,reason:"anko_serpent_evasion_already_ready"};
  const state=addBattleTransientState({
    stateKey:"sj_anko_serpent_evasion_ready",
    sourceSide:"player",sourceParticipantId:ANKO_ID,
    targetSide:"player",targetParticipantId:ANKO_ID,
    ownerRef:{type:"skill",id:"sj_anko_serpent_evasion"},
    data:{activationActionId:envelope.actionId,oneUse:true,deterministicAvoidance:true,noAccuracyRoll:true}
  });
  if(state)ensureState().ankoSerpentEvasionSpent=true;
  return state?{resolved:true,branch:"anko_serpent_evasion",damageApplied:false,stateRefs:[state.stateId],conditionRefs:[]}:{resolved:false,reason:"anko_serpent_evasion_state_failed"};
}
function chooseAnkoAction(target){
  const s=ensureState(),opId=currentOpportunityId("player");
  if(!s||!target)return null;
  const max=Math.max(1,Number(getBattleMaximumPL("player",ANKO_ID))||ANKO_BASE_PL);
  const remaining=Math.max(0,Number(getBattleRemainingPL("player",ANKO_ID))||0);
  const evasionReady=!!findBattleTransientState({stateKey:"sj_anko_serpent_evasion_ready",targetSide:"player",targetParticipantId:ANKO_ID});
  if(remaining/max<=0.40&&!s.ankoSerpentEvasionSpent&&!evasionReady)return"sj_anko_serpent_evasion";
  if(!s.ankoBoundTargetIds.includes(target.id))return"sj_anko_snake_bind";
  return committedChoice(opId,"anko_origin_direct_action",Object.keys(ANKO_DIRECT_ACTIONS));
}
function resolveAnkoAssistOpportunity(){
  const s=ensureState();
  if(!s||s.phase!=="player"||currentPlayerEntitlement()!==ANKO_ID)return{success:false,reason:"anko_assist_not_entitled"};
  expireUnusedAnkoEvasionAtOpportunityStart();
  try{if(typeof resolveBattleStartOfActionOpportunityEffects==="function")resolveBattleStartOfActionOpportunityEffects("player",ANKO_ID,currentOpportunityId("player"));}catch(_error){}
  if(!ankoPresent()){
    s.ankoWithdrawn=true;
    const skippedId="skip:"+currentOpportunityId("player");
    recordBattleEvidence({eventType:"menma_origin_anko_assist_skipped",committedOccurrence:true,actionId:skippedId,actorRef:createBattleParticipantRef("player",ANKO_ID),data:{reason:"anko_withdrawn",inventedFallback:false}});
    markOpportunityCommitted("player",ANKO_ID,skippedId,"autonomous_assist_skipped");
    consumeBattleActionOpportunity("player",ANKO_ID,skippedId,"autonomous_assist_skipped");
    return{success:true,skipped:true,reason:"anko_withdrawn"};
  }
  const target=ankoTarget();
  if(!target){
    const skippedId="skip:"+currentOpportunityId("player");
    recordBattleEvidence({eventType:"menma_origin_anko_assist_skipped",committedOccurrence:true,actionId:skippedId,actorRef:createBattleParticipantRef("player",ANKO_ID),data:{reason:"no_live_hostile_target",inventedFallback:false}});
    markOpportunityCommitted("player",ANKO_ID,skippedId,"autonomous_assist_skipped");
    consumeBattleActionOpportunity("player",ANKO_ID,skippedId,"autonomous_assist_skipped");
    return{success:true,skipped:true,reason:"no_live_hostile_target"};
  }
  const skillId=chooseAnkoAction(target);
  if(!skillId){
    const skippedId="skip:"+currentOpportunityId("player");
    recordBattleEvidence({eventType:"menma_origin_anko_assist_skipped",committedOccurrence:true,actionId:skippedId,actorRef:createBattleParticipantRef("player",ANKO_ID),targetRef:createBattleParticipantRef("enemy",target.id),data:{reason:"no_semantically_legal_anko_action",inventedFallback:false}});
    markOpportunityCommitted("player",ANKO_ID,skippedId,"autonomous_assist_skipped");
    consumeBattleActionOpportunity("player",ANKO_ID,skippedId,"autonomous_assist_skipped");
    return{success:true,skipped:true,reason:"no_semantically_legal_anko_action"};
  }
  const targetSide=skillId==="sj_anko_serpent_evasion"?"player":"enemy";
  const targetParticipantId=targetSide==="player"?ANKO_ID:target.id;
  const envelope=createBattleActionEnvelope({
    actorSide:"player",actorParticipantId:ANKO_ID,
    targetSide,targetParticipantId,
    actionClass:skillId==="sj_anko_snake_bind"?"ally_autonomous_control":skillId==="sj_anko_serpent_evasion"?"ally_autonomous_defense":"ally_autonomous_direct",
    skillId,
    sourceRefs:[{type:"character",id:ANKO_ID,role:"encounter_local_autonomous_ally"},{type:"entitlement",id:ENTITLEMENT_ID}],
    data:{traits:["menma_origin_anko_autonomous_assist"],offSlotTargetPermission:targetSide==="enemy"}
  });
  const entry=beginBattleActionResolution(envelope);
  if(!entry.accepted)return{success:false,reason:entry.validation&&entry.validation.reason||"anko_assist_envelope_rejected",entry};
  let resolution=null;
  if(skillId==="sj_anko_snake_bind")resolution=resolveAnkoBind(target,envelope);
  else if(skillId==="sj_anko_serpent_evasion")resolution=resolveAnkoEvasion(envelope);
  else resolution=resolveAnkoDirectDamage(skillId,target,envelope);
  const resolved=!!(resolution&&resolution.resolved===true);
  recordBattleEvidence({
    eventType:"menma_origin_anko_assist_completed",
    committedOccurrence:resolved,
    actionId:envelope.actionId,
    actorRef:envelope.actorRef,targetRef:envelope.targetRef,skillId,
    sourceRefs:envelope.sourceRefs,
    stateRefs:resolution&&resolution.stateRefs||[],
    conditionRefs:resolution&&resolution.conditionRefs||[],
    data:{resolved,damageApplied:!!(resolution&&resolution.damageApplied),finalDamage:Number(resolution&&resolution.finalDamage)||0,entitlementId:ENTITLEMENT_ID,semanticActiveRemainsMenma:true,formationPromoted:false}
  });
  if(!resolved)return{success:false,reason:resolution&&resolution.reason||"anko_assist_resolution_failed",envelope,resolution};
  consumeBattleActionOpportunity("player",ANKO_ID,envelope.actionId,"valid_anko_autonomous_assist_completed");
  markOpportunityCommitted("player",ANKO_ID,envelope.actionId,"anko_autonomous_assist");
  return{success:true,envelope,resolution,skillId,targetId:targetParticipantId};
}

function enemyTargetFor(enemy){
  if(!enemy)return null;
  let targetId=MENMA_ID;
  if((enemy.id==="test_subject_brute"||enemy.id==="test_subject_unstable")&&ankoPresent())targetId=ANKO_ID;
  try{return getBattleParticipantByIdentity("player",targetId);}catch(_error){return null;}
}
function enemyEligibleActions(enemy,target){
  const authored=getEnemyAuthoredBattleActions(enemy);
  return authored.filter(action=>{
    const eligibility=evaluateEnemyAuthoredActionEligibility(action,enemy,target);
    if(!eligibility||eligibility.eligible!==true)return false;
    if(enemy.id==="test_subject_brute"&&action.id==="test_subject_brute_body_rush"&&hasMovementPreventingRestraint("enemy",enemy.id))return false;
    return true;
  });
}
function resolveEnemyOpportunity(){
  const s=ensureState();
  if(!s||s.phase!=="enemy")return{success:false,reason:"enemy_opportunity_not_current"};
  const enemy=activeEnemy();
  if(!enemy){
    updateResolvedHostiles();
    return{success:false,reason:"enemy_active_missing"};
  }
  const target=enemyTargetFor(enemy);
  if(!target){
    return{success:false,reason:"enemy_target_missing",enemyId:enemy.id};
  }
  try{if(typeof resolveBattleStartOfActionOpportunityEffects==="function")resolveBattleStartOfActionOpportunityEffects("enemy",enemy.id,currentOpportunityId("enemy"));}catch(_error){}
  const eligible=enemyEligibleActions(enemy,target);
  if(eligible.length===0){
    const skippedId="skip:"+currentOpportunityId("enemy");
    recordBattleEvidence({eventType:"menma_origin_enemy_opportunity_skipped",committedOccurrence:true,actionId:skippedId,actorRef:createBattleParticipantRef("enemy",enemy.id),targetRef:createBattleParticipantRef("player",target.id),data:{reason:"no_semantically_eligible_enemy_action",inventedFallback:false}});
    consumeBattleActionOpportunity("enemy",enemy.id,skippedId,"enemy_opportunity_no_legal_action");
    markOpportunityCommitted("enemy",enemy.id,skippedId,"enemy_opportunity_skipped");
    return{success:true,skipped:true,enemyId:enemy.id};
  }
  const opId=currentOpportunityId("enemy");
  const selectedId=committedChoice(opId,"enemy_active_authored_action",eligible.map(action=>action.id));
  const action=eligible.find(row=>row.id===selectedId);
  if(!action)return{success:false,reason:"committed_enemy_action_no_longer_eligible",selectedId};
  const envelope=createBattleActionEnvelope({
    actorSide:"enemy",actorParticipantId:enemy.id,
    targetSide:"player",targetParticipantId:target.id,
    actionClass:action.actionClass||"enemy_authored_action",
    skillId:action.skillId||action.id,
    sourceRefs:Array.isArray(action.sourceRefs)?action.sourceRefs:[],
    data:{traits:Array.isArray(action.traits)?[...action.traits]:[],authoredEnemyAction:true,activeOnlyEnemyCadence:true}
  });
  const entry=beginBattleActionResolution(envelope);
  if(!entry.accepted)return{success:false,reason:entry.validation&&entry.validation.reason||"enemy_envelope_rejected",entry};
  const resolution=action.resolve({enemy,target,envelope,currentBattle:battle()});
  const resolved=!!(resolution&&resolution.resolved===true);
  const secondary=resolved&&typeof resolveAlphaEnemyActionSecondaryConsumers==="function"?resolveAlphaEnemyActionSecondaryConsumers(action,enemy,target,envelope,resolution):{appliedIds:[],stateRefs:[],conditionRefs:[]};
  recordBattleEvidence({
    eventType:"enemy_authored_action_completed",committedOccurrence:resolved,actionId:envelope.actionId,
    actorRef:envelope.actorRef,targetRef:envelope.targetRef,skillId:envelope.skillId,sourceRefs:envelope.sourceRefs,
    stateRefs:secondary&&secondary.stateRefs||[],conditionRefs:secondary&&secondary.conditionRefs||[],
    data:{resolved,actionId:action.id,randomnessAppliedAfterEligibility:true,equalSelectionWeight:true,inventedFallback:false,activeOnlyEnemyCadence:true}
  });
  if(!resolved)return{success:false,reason:"enemy_action_resolution_failed",envelope,resolution};
  consumeBattleActionOpportunity("enemy",enemy.id,envelope.actionId,"valid_enemy_action_completed");
  markOpportunityCommitted("enemy",enemy.id,envelope.actionId,"enemy_active_action");
  return{success:true,envelope,resolution,enemyId:enemy.id,targetId:target.id,actionId:action.id};
}

function advanceAfterPlayerOpportunity(){
  const s=ensureState();if(!s)return;
  s.playerEntitlementIndex+=1;
  s.phase="enemy";
  s.enemyOpportunityOrdinal+=1;
  s.inputLocked=true;
}
function advanceAfterEnemyOpportunity(){
  const s=ensureState();if(!s)return;
  s.phase="player";
  s.playerOpportunityOrdinal+=1;
  s.inputLocked=currentPlayerEntitlement()!==MENMA_ID;
}
function settleSemanticLoop(){
  const s=ensureState();
  if(!s||s.processing||battle().battleOver)return{success:false,reason:"semantic_settle_unavailable"};
  s.processing=true;
  let guard=0,last=null;
  try{
    while(!battle().battleOver&&guard<12){
      guard+=1;
      if(s.phase==="enemy"){
        last=resolveEnemyOpportunity();
        if(!last||last.success!==true){
          const failId="skip:"+currentOpportunityId("enemy");
          if(!opportunityCommitted("enemy")){
            const failedEnemy=activeEnemy();
            recordBattleEvidence({eventType:"menma_origin_enemy_opportunity_failed_visible",committedOccurrence:true,actionId:failId,actorRef:failedEnemy?createBattleParticipantRef("enemy",failedEnemy.id):null,data:{reason:last&&last.reason||"enemy_opportunity_failed",inventedFallback:false}});
            if(failedEnemy){try{consumeBattleActionOpportunity("enemy",failedEnemy.id,failId,"enemy_opportunity_failed_visible");}catch(_error){}}
            markOpportunityCommitted("enemy",failedEnemy&&failedEnemy.id,failId,"enemy_opportunity_failed_visible");
          }
        }
        if(battle().battleOver)break;
        advanceAfterEnemyOpportunity();
        persistBattleSnapshot();
        continue;
      }
      const entitled=currentPlayerEntitlement();
      if(entitled===MENMA_ID){
        s.inputLocked=false;
        break;
      }
      last=resolveAnkoAssistOpportunity();
      if(!last||last.success!==true){
        const failId="skip:"+currentOpportunityId("player");
        if(!opportunityCommitted("player")){
          recordBattleEvidence({eventType:"menma_origin_anko_assist_failed_visible",committedOccurrence:true,actionId:failId,actorRef:createBattleParticipantRef("player",ANKO_ID),data:{reason:last&&last.reason||"anko_assist_failed",inventedFallback:false}});
          try{consumeBattleActionOpportunity("player",ANKO_ID,failId,"anko_assist_failed_visible");}catch(_error){}
          markOpportunityCommitted("player",ANKO_ID,failId,"anko_assist_failed_visible");
        }
      }
      if(battle().battleOver)break;
      advanceAfterPlayerOpportunity();
      persistBattleSnapshot();
    }
  }finally{s.processing=false;}
  if(guard>=12&&!battle().battleOver){
    s.inputLocked=true;
    recordBattleEvidence({eventType:"menma_origin_semantic_guard_tripped",committedOccurrence:false,data:{guardLimit:12,presentationCannotAdvanceSemantics:true}});
    return{success:false,reason:"semantic_guard_limit",last};
  }
  persistBattleSnapshot();
  return{success:true,last,readyForMenma:!battle().battleOver&&s.phase==="player"&&currentPlayerEntitlement()===MENMA_ID};
}

const PRE_CONSUME_OPPORTUNITY=typeof consumeBattleActionOpportunity==="function"?consumeBattleActionOpportunity:null;
if(PRE_CONSUME_OPPORTUNITY){
  const wrapped=function(side,participantId,actionId,reason){
    const result=PRE_CONSUME_OPPORTUNITY.apply(this,arguments);
    if(!isExactBattle())return result;
    const s=ensureState();
    if(!s)return result;
    if(side==="player"&&participantId===MENMA_ID&&s.phase==="player"&&currentPlayerEntitlement()===MENMA_ID&&!opportunityCommitted("player")){
      markOpportunityCommitted("player",MENMA_ID,actionId,"menma_player_action");
      advanceAfterPlayerOpportunity();
      if(!s.processing)settleSemanticLoop();
    }
    return result;
  };
  globalThis.consumeBattleActionOpportunity=wrapped;try{consumeBattleActionOpportunity=wrapped;}catch(_error){}
}

const PRE_RECORD_EVIDENCE=typeof recordBattleEvidence==="function"?recordBattleEvidence:null;
if(PRE_RECORD_EVIDENCE){
  const wrapped=function(definition){
    const record=PRE_RECORD_EVIDENCE.apply(this,arguments);
    if(isExactBattle()&&record&&definition&&definition.eventType==="skill_action_completed"&&definition.committedOccurrence===true&&definition.actorRef&&definition.actorRef.side==="player"&&definition.actorRef.participantId===MENMA_ID&&ankoPresent()){
      const skill=typeof getMenmaOriginActionDefinition==="function"?getMenmaOriginActionDefinition(definition.skillId):null;
      const discipline=skill&&skill.primaryDiscipline||null;
      const qualifying=!!(skill&&(discipline==="Kinjutsu"||(Array.isArray(skill.traits)&&skill.traits.includes("kinjutsu_observation_qualifying"))));
      PRE_RECORD_EVIDENCE({
        eventType:"menma_origin_anko_action_observed",
        committedOccurrence:false,
        actionId:definition.actionId||null,
        actorRef:createBattleParticipantRef("player",MENMA_ID),
        targetRef:definition.targetRef||null,
        observerRefs:[createBattleParticipantRef("player",ANKO_ID)],
        skillId:definition.skillId||null,
        sourceRefs:[{type:"battle_evidence",id:record.evidenceId}],
        data:{parentEvidenceId:record.evidenceId,observerId:ANKO_ID,observedDiscipline:discipline,sameBattleParticipantAccess:true,perceptible:true,observationBlocked:false,kinjutsuObservationQualifying:qualifying,men02Qualifying:qualifying}
      });
    }
    return record;
  };
  globalThis.recordBattleEvidence=wrapped;try{recordBattleEvidence=wrapped;}catch(_error){}
}

const PRE_IS_MENMA_TUTORIAL=typeof isMenmaOriginTutorialBattle==="function"?isMenmaOriginTutorialBattle:null;
if(PRE_IS_MENMA_TUTORIAL){
  const wrapped=function(){return isExactBattle()||PRE_IS_MENMA_TUTORIAL.apply(this,arguments);};
  globalThis.isMenmaOriginTutorialBattle=wrapped;try{isMenmaOriginTutorialBattle=wrapped;}catch(_error){}
}
const PRE_KINJUTSU_READ=typeof resolveMenmaOriginKinjutsuObservationRead==="function"?resolveMenmaOriginKinjutsuObservationRead:null;
if(PRE_KINJUTSU_READ){
  const wrapped=function(records=null){
    if(!isExactBattle())return PRE_KINJUTSU_READ.apply(this,arguments);
    const evidence=Array.isArray(records)?records:(typeof getMenmaOriginBattleEvidence==="function"?getMenmaOriginBattleEvidence():[]);
    const qualifying=evidence.filter(row=>row&&row.eventType==="menma_origin_anko_action_observed"&&row.data&&row.data.men02Qualifying===true);
    return{
      observed:qualifying.length>0,
      occurrenceIds:qualifying.map(row=>row.evidenceId),
      observerScope:"same_battle_participant",
      legitimateObserverAccess:true,
      perceptible:true,
      ownershipAloneNeverQualifies:true
    };
  };
  globalThis.resolveMenmaOriginKinjutsuObservationRead=wrapped;try{resolveMenmaOriginKinjutsuObservationRead=wrapped;}catch(_error){}
}

function commitBattleOccurrenceReceipt(result="victory"){
  const b=battle(),p=player(),id=battleOccurrenceId(b);
  if(!b||!p||!id)return null;
  if(!Array.isArray(p.activityHistory))p.activityHistory=[];
  const existing=p.activityHistory.find(row=>row&&String(row.battleOccurrenceId||row.occurrenceId||"")===id&&row.type!=="origin_battle_reward");
  if(existing)return existing;
  updateResolvedHostiles();
  const state=ensureState();
  const victory=result==="victory";
  const resolved=victory?[...HOSTILE_IDS]:updateResolvedHostiles();
  const record={
    historyScope:typeof getCurrentChronicleOccurrenceHistoryScope==="function"?getCurrentChronicleOccurrenceHistoryScope("origin_battle_occurrence"):null,
    type:"origin_battle_occurrence",activity:"battle",completed:true,committed:true,success:victory,
    outcome:victory?"victory":"defeat",sourceOccurrenceId:id,occurrenceId:id,battleOccurrenceId:id,
    actorVariantId:MENMA_ID,sceneId:STORY_SCENE_ID,storySceneInstanceId:sceneInstanceId(b),
    battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,
    battleResult:victory?"victory":"defeat",terminalBattleResult:victory?"victory":"defeat",
    objectiveCompleted:victory,
    menmaWithdrawn:!victory,ankoWithdrawn:!!(state&&state.ankoWithdrawn),
    alliedParticipantIds:[...ALLIED_IDS],hostileParticipantIds:[...HOSTILE_IDS],
    resolvedHostileIds:victory?[...HOSTILE_IDS]:[...resolved],
    fact:{battlePLWithdrawalNotDeath:true,noInferredInjury:true,noInferredCustody:true,menmaOnlyTutorialAttribution:true,ankoAssistEntitlementId:ENTITLEMENT_ID},
    data:{battlePLWithdrawalNotDeath:true,noInferredInjury:true,noInferredCustody:true,menmaOnlyTutorialAttribution:true,ankoAssistEntitlementId:ENTITLEMENT_ID},
    timestamp:Date.now()
  };
  p.activityHistory.push(record);
  try{if(typeof activityHistory!=="undefined"&&Array.isArray(activityHistory)&&activityHistory!==p.activityHistory)activityHistory.push(record);}catch(_error){}
  return record;
}
function upstreamBattleReceipt(){return commitBattleOccurrenceReceipt("victory");}

const PRE_COMPLETE_VICTORY=typeof completeBattleVictoryFromDamage==="function"?completeBattleVictoryFromDamage:null;
if(PRE_COMPLETE_VICTORY){
  const wrapped=function(finishingShinobi,envelope=null,defeatedParticipantId=null){
    if(!isExactBattle())return PRE_COMPLETE_VICTORY.apply(this,arguments);
    updateResolvedHostiles();
    const s=ensureState();
    const allResolved=HOSTILE_IDS.every(id=>!liveHostile(id));
    if(!allResolved)return{success:false,reason:"menma_three_subject_objective_incomplete",resolvedHostileIds:[...s.resolvedHostileIds]};
    if(!menmaPresent()||s.menmaWithdrawn)return{success:false,reason:"menma_withdrawn_before_objective"};
    upstreamBattleReceipt();
    s.terminalResult="victory";
    s.inputLocked=true;
    const result=PRE_COMPLETE_VICTORY.apply(this,arguments);
    if(battle().outcome){
      battle().outcome.battleConfigId=BATTLE_CONFIG_ID;
      battle().outcome.encounterId=ENCOUNTER_ID;
      battle().outcome.objectiveId=OBJECTIVE_ID;
      battle().outcome.objectiveCompleted=true;
      battle().outcome.menmaWithdrawn=false;
      battle().outcome.ankoWithdrawn=s.ankoWithdrawn===true;
      battle().outcome.resolvedHostileIds=[...HOSTILE_IDS];
      battle().outcome.battleOccurrenceId=battleOccurrenceId();
    }
    try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
    persistBattleSnapshot();
    return result;
  };
  globalThis.completeBattleVictoryFromDamage=wrapped;try{completeBattleVictoryFromDamage=wrapped;}catch(_error){}
}
const PRE_COMPLETE_DEFEAT=typeof completeBattleDefeat==="function"?completeBattleDefeat:null;
if(PRE_COMPLETE_DEFEAT){
  const wrapped=function(defeatedParticipantId=null,envelope=null,reason="player_deployment_exhausted"){
    if(!isExactBattle())return PRE_COMPLETE_DEFEAT.apply(this,arguments);
    const s=ensureState();
    if(defeatedParticipantId===MENMA_ID)s.menmaWithdrawn=true;
    s.terminalResult="defeat";
    s.inputLocked=true;
    commitBattleOccurrenceReceipt("defeat");
    const result=PRE_COMPLETE_DEFEAT.call(this,defeatedParticipantId,envelope,reason);
    if(battle().outcome){
      battle().outcome.battleConfigId=BATTLE_CONFIG_ID;
      battle().outcome.encounterId=ENCOUNTER_ID;
      battle().outcome.objectiveId=OBJECTIVE_ID;
      battle().outcome.objectiveCompleted=false;
      battle().outcome.menmaWithdrawn=true;
      battle().outcome.ankoWithdrawn=s.ankoWithdrawn===true;
      battle().outcome.resolvedHostileIds=updateResolvedHostiles();
      battle().outcome.battleOccurrenceId=battleOccurrenceId();
    }
    persistBattleSnapshot();
    return result;
  };
  globalThis.completeBattleDefeat=wrapped;try{completeBattleDefeat=wrapped;}catch(_error){}
}
const PRE_ZERO=typeof handleBattleParticipantAtZeroPL==="function"?handleBattleParticipantAtZeroPL:null;
if(PRE_ZERO){
  const wrapped=function(side,participantId,actor,envelope){
    if(!isExactBattle())return PRE_ZERO.apply(this,arguments);
    const s=ensureState();
    if(side==="player"&&participantId===MENMA_ID){
      s.menmaWithdrawn=true;
      return completeBattleDefeat(MENMA_ID,envelope||null,"academy_menma_withdrawn_before_objective");
    }
    if(side==="player"&&participantId===ANKO_ID){
      s.ankoWithdrawn=true;
      try{advanceBattleParticipantAtZeroPL("player",ANKO_ID);}catch(_error){}
      recordBattleEvidence({eventType:"menma_origin_anko_withdrawn",committedOccurrence:true,targetRef:createBattleParticipantRef("player",ANKO_ID),data:{battlePLWithdrawal:true,notDeath:true,menmaRemainsSemanticActive:true}});
      return{success:true,participantId:ANKO_ID,withdrawn:true,menmaRemainsActive:true};
    }
    if(side==="enemy"&&HOSTILE_IDS.includes(participantId)){
      if(!s.resolvedHostileIds.includes(participantId))s.resolvedHostileIds.push(participantId);
      return PRE_ZERO.apply(this,arguments);
    }
    return PRE_ZERO.apply(this,arguments);
  };
  globalThis.handleBattleParticipantAtZeroPL=wrapped;try{handleBattleParticipantAtZeroPL=wrapped;}catch(_error){}
}

const PRE_RENDER_ACTION_REGION=typeof renderBattleActionRegion==="function"?renderBattleActionRegion:null;
if(PRE_RENDER_ACTION_REGION){
  const wrapped=function(actor,target){
    if(isExactBattle()){
      const readiness=getInputReadiness();
      if(!readiness.ready){
        return '<div class="battle-live-autonomous-phase" data-menma-36900-autonomous="true"><strong>AUTONOMOUS ACTION</strong><span>'+String(readiness.reason||"resolving").replaceAll("_"," ").toUpperCase()+'</span></div>';
      }
    }
    return PRE_RENDER_ACTION_REGION.apply(this,arguments);
  };
  globalThis.renderBattleActionRegion=wrapped;try{renderBattleActionRegion=wrapped;}catch(_error){}
}

const PRE_SAVE_TEST=typeof saveTestState==="function"?saveTestState:null;
if(PRE_SAVE_TEST){
  const wrapped=function(){
    const result=PRE_SAVE_TEST.apply(this,arguments);
    if(isExactBattle()&&typeof sessionStorage!=="undefined"){
      try{
        const raw=sessionStorage.getItem("shinobiTestState");
        const state=raw?JSON.parse(raw):{};
        state.battleConfigId=BATTLE_CONFIG_ID;
        state.objectiveId=OBJECTIVE_ID;
        state.menma369BattleActive=battle().active===true&&battle().battleOver!==true;
        state.menmaEvolvedPLBattle36900=clone(ensureState());
        state.menma369LocalAllies={sj_anko:makeAnkoParticipant()};
        sessionStorage.setItem("shinobiTestState",JSON.stringify(state));
      }catch(_error){}
    }
    return result;
  };
  globalThis.saveTestState=wrapped;try{saveTestState=wrapped;}catch(_error){}
}
const PRE_RESTORE_TEST=typeof restoreTestState==="function"?restoreTestState:null;
if(PRE_RESTORE_TEST){
  const wrapped=function(){
    let savedState=null,savedAllies=null,savedBattleActive=false;
    if(typeof sessionStorage!=="undefined"){
      try{
        const raw=sessionStorage.getItem("shinobiTestState");
        const parsed=raw?JSON.parse(raw):null;
        if(parsed&&String(parsed.encounterId||"")===ENCOUNTER_ID&&String(parsed.battleConfigId||"")===BATTLE_CONFIG_ID){
          savedState=parsed.menmaEvolvedPLBattle36900||null;
          savedAllies=parsed.menma369LocalAllies||null;
          savedBattleActive=parsed.menma369BattleActive===true&&parsed.battleOver!==true;
          const b=battle();
          if(b){
            b.encounterId=ENCOUNTER_ID;
            b.battleConfigId=BATTLE_CONFIG_ID;
            b.objectiveId=OBJECTIVE_ID;
            b.menmaEvolvedPLBattle36900=normalizeState(savedState,null);
            b.menma369LocalAllies=savedAllies&&savedAllies[ANKO_ID]?{[ANKO_ID]:clone(savedAllies[ANKO_ID])}:{[ANKO_ID]:makeAnkoParticipant()};
          }
        }
      }catch(_error){}
    }
    const result=PRE_RESTORE_TEST.apply(this,arguments);
    if(isExactBattle()){
      const b=battle();
      b.menmaEvolvedPLBattle36900=normalizeState(savedState||b.menmaEvolvedPLBattle36900,sceneInstanceId(b));
      b.menma369LocalAllies={ [ANKO_ID]:makeAnkoParticipant() };
      if(savedBattleActive&&b.battleOver!==true)b.active=true;
      const ankoPLRecord=typeof getBattleRemainingPLRecord==="function"?getBattleRemainingPLRecord("player",ANKO_ID):null;
      if(!ankoPLRecord&&!b.menmaEvolvedPLBattle36900.ankoWithdrawn)setBattleRemainingPLRecord("player",ANKO_ID,ANKO_BASE_PL,ANKO_BASE_PL);
      if(b.active&&!b.battleOver){
        settleSemanticLoop();
        try{openOverlay("combat");}catch(_error){}
      }
    }
    return result;
  };
  globalThis.restoreTestState=wrapped;try{restoreTestState=wrapped;}catch(_error){}
}

function configureExactDeployment(){
  const b=battle();
  if(!b)return{success:false,reason:"battle_missing"};
  ensureLocalAnko();
  configureBattleEnemyParticipants(HOSTILE_IDS.map(id=>enemyDatabase[id]).filter(Boolean));
  b.deployment={
    player:{slots:createBattleDeploymentSlots([MENMA_ID,ANKO_ID])},
    enemy:{slots:createBattleDeploymentSlots([...HOSTILE_IDS])},
    transitionCounter:0,lastTransition:null
  };
  b.activePlayer=getBattleParticipantByIdentity("player",MENMA_ID);
  b.characterId=MENMA_ID;
  b.enemy=getBattleDeploymentParticipant("enemy",1);
  b.encounterEnemy=enemyDatabase.test_subject_altered_shinobi;
  initializeBattleContributionRecordsFromDeployment();
  initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:false});
  setBattleRemainingPLRecord("player",ANKO_ID,ANKO_BASE_PL,ANKO_BASE_PL);
  syncBattleActiveEnemyFromDeployment();
  syncBattleEnemyPowerCompatibilityProjection();
  return{success:true};
}
function launchMenmaEvolvedPLBattle36900(context={}){
  const menma=typeof getPlayerCharacter==="function"?getPlayerCharacter(MENMA_ID):null;
  const altered=enemyDatabase&&enemyDatabase.test_subject_altered_shinobi;
  const hostileParticipants=HOSTILE_IDS.map(id=>enemyDatabase&&enemyDatabase[id]).filter(Boolean);
  if(!menma)return{success:false,reason:"academy_menma_origin_participant_missing"};
  if(!altered||hostileParticipants.length!==HOSTILE_IDS.length)return{success:false,reason:"three_subject_opposition_authority_missing"};
  const normalizedReturn=typeof normalizeBattleReturnContext==="function"?normalizeBattleReturnContext(context.returnContext||null):(context.returnContext||null);
  if(context.returnContext&&typeof context.returnContext==="object"&&!normalizedReturn)return{success:false,reason:"battle_return_context_invalid"};

  // Exact Origin launch: do not route through My Clan START. Menma's authored
  // Story identity owns slot 1 for this one occurrence; this does not mutate My Clan.
  selectedEnemy=altered;
  const b=battle();
  b.active=true;
  b.battleId=createBattleInstanceId();
  b.encounterId=ENCOUNTER_ID;
  b.battleConfigId=BATTLE_CONFIG_ID;
  b.objectiveId=OBJECTIVE_ID;
  b.encounterOccurrenceId=null;
  b.oppositionTemplateId=altered.id;
  b.encounterStatePackageId=null;
  b.characterId=MENMA_ID;
  b.encounterEnemy=altered;
  setBattleEnemyParticipants(hostileParticipants);
  b.enemy=altered;
  b.deployment={
    player:{slots:createBattleDeploymentSlots([MENMA_ID,ANKO_ID])},
    enemy:{slots:createBattleDeploymentSlots([...HOSTILE_IDS])},
    transitionCounter:0,lastTransition:null
  };
  b.activePlayer=menma;
  syncBattleActiveEnemyFromDeployment();
  b.lastDamage=0;
  b.battleOver=false;
  b.completedAt=null;
  b.claimedAt=null;
  b.completionRecorded=false;
  b.outcome=null;
  b.defeat=null;
  b.returnContext=normalizedReturn;
  b.observerSafeResultContext=null;
  b.unknownOperativeConfrontation=null;
  b.mission7SanitisationEncounter=null;
  b.mission5FemaleOperatorEncounter=null;
  b.menma369LocalAllies={ [ANKO_ID]:makeAnkoParticipant() };
  b.menmaEvolvedPLBattle36900=createState(context.active&&context.active.instanceId||sceneInstanceId(b));
  b.battleLog=[
    "Three altered test subjects move through the clearing.",
    "Academy Menma takes Active. Special Jōnin Anko remains Benched as an autonomous assist."
  ];
  b.rewards={generated:false,claimed:false,ryo:0,exp:0,items:[],rareDrops:[],finishingShinobi:null,mvp:null};
  b.enemyPower=calculateBattlePower(altered,"standard");
  b.enemyMaxPower=b.enemyPower;

  initializeBattleContributionRecordsFromDeployment();
  initializeBattleSourcePackageRuntime();
  initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true});
  setBattleRemainingPLRecord("player",ANKO_ID,ANKO_BASE_PL,ANKO_BASE_PL);
  initializeBattlePouchFromPreparedSelection();
  initializeBattleAttachedSummonRuntimeFromDeployment();
  initializeBattleDedicatedVariantRuntimePackages();
  initializeBattleKisoganStartsActiveFromDeployment();

  recordBattleEvidence({
    eventType:"menma_evolved_pl_battle_started",committedOccurrence:true,
    actorRef:createBattleParticipantRef("player",MENMA_ID),
    targetRef:createBattleParticipantRef("enemy","test_subject_altered_shinobi"),
    sourceRefs:[{type:"battle_config",id:BATTLE_CONFIG_ID},{type:"story_scene",id:STORY_SCENE_ID}],
    data:{
      battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,
      alliedParticipantIds:[...ALLIED_IDS],hostileParticipantIds:[...HOSTILE_IDS],
      playerSideStarts:true,plIdentity:"Battle PL",healthReplacement:false,
      myClanStartBypassedForExactOriginOccurrence:true,myClanMutated:false
    }
  });
  persistBattleSnapshot();
  try{openOverlay("combat");}catch(_error){}
  return{success:true,battleId:b.battleId,encounterId:ENCOUNTER_ID,battleConfigId:BATTLE_CONFIG_ID,objectiveId:OBJECTIVE_ID,battleOccurrenceId:battleOccurrenceId(b)};
}
function applyMenmaSuccessorBattleAuthority(scene){
  if(!scene||!scene.beatMap||typeof scene.beatMap.get!=="function")return{success:false,reason:"menma_story_scene_missing"};
  const beat=scene.beatMap.get(STORY_BATTLE_BEAT_ID);
  if(!beat||beat.mode!=="battle_transition"||!beat.battle)return{success:false,reason:"menma_story_battle_beat_missing"};
  beat.battle.enemyId="test_subject_altered_shinobi";
  beat.battle.encounterId=ENCOUNTER_ID;
  beat.battle.battleConfigId=BATTLE_CONFIG_ID;
  beat.battle.objectiveId=OBJECTIVE_ID;
  beat.battle.launchResolver=launchMenmaEvolvedPLBattle36900;
  return{success:true,sceneId:STORY_SCENE_ID,beatId:STORY_BATTLE_BEAT_ID};
}
const PRE_GET_STORY_SCENE_DEFINITION=typeof getStorySceneDefinition==="function"?getStorySceneDefinition:null;
if(PRE_GET_STORY_SCENE_DEFINITION){
  const wrapped=function(sceneId){
    const scene=PRE_GET_STORY_SCENE_DEFINITION.apply(this,arguments);
    if(String(sceneId||"")===STORY_SCENE_ID&&scene)applyMenmaSuccessorBattleAuthority(scene);
    return scene;
  };
  globalThis.getStorySceneDefinition=wrapped;try{getStorySceneDefinition=wrapped;}catch(_error){}
}
function patchMenmaStoryBattle(){
  if(typeof getStorySceneDefinition!=="function")return{success:false,reason:"story_definition_api_missing"};
  const scene=getStorySceneDefinition(STORY_SCENE_ID);
  return applyMenmaSuccessorBattleAuthority(scene);
}

const PRE_MENMA_PRODUCTION_DIAG=typeof runAlphaMenmaOriginProductionDiagnostics==="function"?runAlphaMenmaOriginProductionDiagnostics:null;
if(PRE_MENMA_PRODUCTION_DIAG){
  const wrapped=function(){
    const prior=PRE_MENMA_PRODUCTION_DIAG.apply(this,arguments);
    const scene=getStorySceneDefinition(STORY_SCENE_ID),beat=scene&&scene.beatMap&&scene.beatMap.get(STORY_BATTLE_BEAT_ID);
    const successor=!!beat&&beat.battle&&beat.battle.encounterId===ENCOUNTER_ID&&beat.battle.battleConfigId===BATTLE_CONFIG_ID&&beat.battle.objectiveId===OBJECTIVE_ID&&beat.battle.launchResolver===launchMenmaEvolvedPLBattle36900;
    const result={...prior,
      directBattleExactlyMenmaVsAltered:false,
      directBattleExactlyMenmaVsAlteredSuperseded:true,
      successorMenmaAnkoThreeSubjectBattle:successor
    };
    result.pass=Object.entries(result).filter(([key])=>!["pass","directBattleExactlyMenmaVsAltered"].includes(key)).every(([,value])=>value===true);
    return result;
  };
  globalThis.runAlphaMenmaOriginProductionDiagnostics=wrapped;try{runAlphaMenmaOriginProductionDiagnostics=wrapped;}catch(_error){}
}

function diagnostics(){
  const scene=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(STORY_SCENE_ID):null;
  const beat=scene&&scene.beatMap&&scene.beatMap.get(STORY_BATTLE_BEAT_ID);
  const source=[
    launchMenmaEvolvedPLBattle36900,
    settleSemanticLoop,
    resolveAnkoAssistOpportunity,
    resolveEnemyOpportunity,
    upstreamBattleReceipt
  ].map(fn=>String(fn)).join("\n");
  const checks={
    patchId:PATCH_ID==="menma_evolved_pl_battle_36900_2026_09_25",
    exactBattleIdentity:!!beat&&beat.battle&&beat.battle.battleConfigId===BATTLE_CONFIG_ID&&beat.battle.encounterId===ENCOUNTER_ID&&beat.battle.objectiveId===OBJECTIVE_ID,
    exactParticipants:ALLIED_IDS.join("|")==="academy_menma|sj_anko"&&HOSTILE_IDS.join("|")==="test_subject_altered_shinobi|test_subject_brute|test_subject_unstable",
    plIdentityPreserved:source.includes('plIdentity:"Battle PL"')&&!source.includes("hit"+"Points")&&!source.includes("health"+"Meter"),
    playerSideStarts:createState("x").phase==="player"&&createState("x").playerEntitlementIndex===0,
    oneActionPerOpportunity:String(validateBattleActionEnvelope).includes("side_opportunity_already_committed")&&String(markOpportunityCommitted).includes("committedOpportunities"),
    menmaAnkoEntitlement:String(currentPlayerEntitlement).includes("%2===0")&&ENTITLEMENT_ID==="menma_origin_anko_autonomous_assist",
    ankoNeverPromoted:String(configureExactDeployment).includes("[MENMA_ID,ANKO_ID]")&&String(getInputReadiness).includes("anko_autonomous_assist_opportunity"),
    enemyActiveOnly:String(resolveEnemyOpportunity).includes('getBattleDeploymentParticipant("enemy",1)')||String(activeEnemy).includes('getBattleDeploymentParticipant("enemy",1)'),
    enemyRelayAuthoredOrder:HOSTILE_IDS[0]==="test_subject_altered_shinobi"&&HOSTILE_IDS[1]==="test_subject_brute"&&HOSTILE_IDS[2]==="test_subject_unstable",
    manualWithdrawBlocked:String(canWithdrawActiveBattleFighter).includes("isExactBattle")&&String(withdrawActiveBattleFighter).includes("menma_origin_manual_withdraw_not_authorised"),
    ankoExactPackage:Object.keys(ANKO_DIRECT_ACTIONS).length===2&&ANKO_DIRECT_ACTIONS.sj_anko_hidden_shadow_snake_hands.attackPL===20&&ANKO_DIRECT_ACTIONS.sj_anko_fire_style_dragon_flame.attackPL===24&&String(resolveAnkoAssistOpportunity).includes("sj_anko_snake_bind")&&String(resolveAnkoAssistOpportunity).includes("sj_anko_serpent_evasion")&&!String(resolveAnkoAssistOpportunity).includes("twin_snakes_mutual_death"),
    committedRngPersistence:String(committedChoice).includes("rngChoices")&&String(committedChoice).includes("persistBattleSnapshot"),
    staleTokenRejection:String(validateBattleActionEnvelope).includes("stale_side_opportunity_token")&&String(validateBattleActionEnvelope).includes("stale_battle_semantic_generation"),
    semanticLoopNoTimer:!source.includes("set"+"Timeout")&&!source.includes("request"+"AnimationFrame")&&!source.includes("animation"+"end"),
    menmaDefeatImmediate:String(handleBattleParticipantAtZeroPL).includes("academy_menma_withdrawn_before_objective"),
    exactBattleReceipt:String(battleOccurrenceId).includes("BATTLE_OCCURRENCE_PREFIX")&&String(commitBattleOccurrenceReceipt).includes("resolvedHostileIds:victory?[...HOSTILE_IDS]")&&String(completeBattleDefeat).includes('commitBattleOccurrenceReceipt("defeat")'),
    rewardAdapterPresent:!!globalThis.SC_ACADEMY_MENMA_THREE_SUBJECT_REWARD_36200,
    men03StableSource:typeof MENMA_ORIGIN_TUTORIAL_PERFORMANCE_SOURCE_OCCURRENCE_ID==="undefined"||MENMA_ORIGIN_TUTORIAL_PERFORMANCE_SOURCE_OCCURRENCE_ID==="combat_academy_menma_tutorial_performance_resolved",
    kakashiUntouched:!source.includes("academy_"+"kakashi"),
    betaBatchExcluded:!source.includes("command batch")&&!source.includes("choose one Skill from every active "+"member"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const storyPatch=patchMenmaStoryBattle();
globalThis.launchMenmaEvolvedPLBattle36900=launchMenmaEvolvedPLBattle36900;
globalThis.settleMenmaEvolvedPLBattle36900=settleSemanticLoop;
globalThis.getMenmaEvolvedPLBattleInputReadiness36900=getInputReadiness;
globalThis.getMenmaEvolvedPLBattleState36900=function(){return clone(ensureState());};
globalThis.runIssue369MenmaEvolvedPLBattleDiagnostics=diagnostics;
globalThis.SC_MENMA_EVOLVED_PL_BATTLE_36900=Object.freeze({
  patchId:PATCH_ID,
  battleConfigId:BATTLE_CONFIG_ID,
  encounterId:ENCOUNTER_ID,
  objectiveId:OBJECTIVE_ID,
  entitlementId:ENTITLEMENT_ID,
  alliedParticipantIds:Object.freeze([...ALLIED_IDS]),
  hostileParticipantIds:Object.freeze([...HOSTILE_IDS]),
  storyPatch:clone(storyPatch),
  browserGoldenClaimed:false
});
})();