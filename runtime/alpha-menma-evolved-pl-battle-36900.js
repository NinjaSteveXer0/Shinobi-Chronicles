// ============================================================================
// ISSUE #369 / #373 SUCCESSOR — ACADEMY MENMA HALF-SCRIPTED EVOLVED PL BATTLE
// CE authority:
// Documentation/Coordination/Academy_Menma_Half_Scripted_Three_Subject_Battle_Successor_2026-09-26.md
// Combat authority:
// Documentation/Combat/SC_Combat_Academy_Menma_Half_Scripted_Anko_Takedown_Package_2026-09-26.md
// ============================================================================
// Scene 7 is a scoped authored encounter. It does NOT rewrite generic PL Battle law.
//
// Phase A: Anko Active -> Hidden Shadow Snake Hands -> Altered withdraws.
// Phase B: Anko Active -> Fire Style: Dragon Flame -> Brute withdraws.
// Phase C: Anko yields -> Menma promotes -> Menma vs Unstable ordinary PL Battle.
//
// Scripted A/B actions do not consume ordinary side opportunities and never count
// toward MEN-03. Zero-PL withdrawal is presentation-gated so the struck portrait
// remains present until the committed action has visibly settled.
// ============================================================================
(function installMenmaEvolvedPLBattle36900(){
"use strict";

const PATCH_ID="menma_half_scripted_evolved_pl_battle_36900_2026_09_26";
const BATTLE_CONFIG_ID="academy_menma_origin_three_test_subjects_with_anko";
const ENCOUNTER_ID="origin_academy_menma_prologue:three_test_subjects";
const OBJECTIVE_ID="stop_three_test_subjects";
const STORY_SCENE_ID="origin_academy_menma_prologue";
const STORY_BATTLE_BEAT_ID="tutorial_battle";
const BATTLE_OCCURRENCE_PREFIX="battle_occ_origin_academy_menma_three_test_subjects:";
const SCRIPT_CONTRACT_ID="menma_origin_half_scripted_anko_takedown";
const PLAYER_OBJECTIVE_TEXT="Stop the Test Subjects.";
const BATTLE_ENVIRONMENT_PATH="Scene backdrops/forest_clearing_day.png";
const MENMA_ID="academy_menma";
const ANKO_ID="sj_anko";
const HOSTILE_IDS=Object.freeze([
  "test_subject_altered_shinobi",
  "test_subject_brute",
  "test_subject_unstable"
]);
const HOSTILE_BATTLE_PORTRAITS=Object.freeze({
  test_subject_altered_shinobi:"Enemies Portraits/test_subject_altered_shinobi.png",
  test_subject_brute:"Enemies Portraits/test_subject_brute.png",
  test_subject_unstable:"Enemies Portraits/test_subject_unstable.png"
});
const ALLIED_IDS=Object.freeze([MENMA_ID,ANKO_ID]);
const ANKO_STATS=Object.freeze({nin:56,tai:52,buki:48,fuin:44,kin:58,gen:39,stamina:55});
const ANKO_BASE_PL=56;

// Stephen-direct current Battle presentation authority confirms all three
// existing Test Subject Battle/UI portraits are to be used. These remain
// non-Registry opposition identities; binding enemy.image is presentation
// authority only and does not promote them into the collectible Registry.
function bindTestSubjectBattlePortraits36900(){
  try{
    if(typeof enemyDatabase!=="object"||!enemyDatabase)return false;
    for(const [id,path] of Object.entries(HOSTILE_BATTLE_PORTRAITS)){
      if(enemyDatabase[id]&&typeof enemyDatabase[id]==="object")enemyDatabase[id].image=path;
    }
    return HOSTILE_IDS.every(id=>enemyDatabase[id]&&enemyDatabase[id].image===HOSTILE_BATTLE_PORTRAITS[id]);
  }catch(_error){return false;}
}
const TEST_SUBJECT_PORTRAITS_BOUND=bindTestSubjectBattlePortraits36900();

const SCRIPTED_PHASES=Object.freeze({
  scripted_a:Object.freeze({
    phase:"scripted_a",
    skillId:"sj_anko_hidden_shadow_snake_hands",
    displayName:"Hidden Shadow Snake Hands",
    targetId:"test_subject_altered_shinobi",
    attackPL:20,
    expectedStamina:11,
    expectedDamage:18,
    relayTo:"test_subject_brute"
  }),
  scripted_b:Object.freeze({
    phase:"scripted_b",
    skillId:"sj_anko_fire_style_dragon_flame",
    displayName:"Fire Style: Dragon Flame",
    targetId:"test_subject_brute",
    attackPL:24,
    expectedStamina:14,
    expectedDamage:21,
    relayTo:"test_subject_unstable"
  })
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
    id:ANKO_ID,registryId:ANKO_ID,name:"SPECIAL JŌNIN ANKO",displayName:"Special Jōnin Anko",
    rank:"Special Jōnin",formalRank:"special_jonin",power:ANKO_BASE_PL,calibratedBasePL:ANKO_BASE_PL,
    baseStats:{...ANKO_STATS},stats:{...ANKO_STATS},
    uiPortrait:"Portraits/Special Jonin/sj_anko.png",
    encounterLocalAlliedNpc:true,ownershipGranted:false,myClanAssigned:false,playerSelectable:false
  };
}
function ensureLocalAnko(){
  const b=battle();if(!b)return null;
  if(!b.menma369LocalAllies||typeof b.menma369LocalAllies!=="object")b.menma369LocalAllies={};
  if(!b.menma369LocalAllies[ANKO_ID])b.menma369LocalAllies[ANKO_ID]=makeAnkoParticipant();
  return b.menma369LocalAllies[ANKO_ID];
}
function createState(sceneId=null){
  return {
    version:2,battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,
    scriptContractId:SCRIPT_CONTRACT_ID,storySceneInstanceId:sceneId||null,semanticGeneration:2,
    phase:"scripted_a",inputLocked:true,processing:false,
    playerOpportunityOrdinal:1,enemyOpportunityOrdinal:0,
    committedOpportunities:{},rngChoices:{},
    scriptedCompleted:{scripted_a:false,scripted_b:false},
    pendingZero:null,resolvedHostileIds:[],
    menmaWithdrawn:false,ankoWithdrawn:false,ankoYielded:false,
    terminalResult:null,lastSemanticEvent:null
  };
}
function normalizeState(raw,sceneId=null){
  const base=createState(sceneId);
  if(!raw||typeof raw!=="object")return base;
  const next={...base,...clone(raw)};
  next.version=2;
  next.battleConfigId=BATTLE_CONFIG_ID;next.encounterId=ENCOUNTER_ID;next.objectiveId=OBJECTIVE_ID;
  next.scriptContractId=SCRIPT_CONTRACT_ID;
  next.storySceneInstanceId=sceneId||next.storySceneInstanceId||null;
  next.semanticGeneration=2;
  next.committedOpportunities=next.committedOpportunities&&typeof next.committedOpportunities==="object"?next.committedOpportunities:{};
  next.rngChoices=next.rngChoices&&typeof next.rngChoices==="object"?next.rngChoices:{};
  next.scriptedCompleted=next.scriptedCompleted&&typeof next.scriptedCompleted==="object"?{scripted_a:next.scriptedCompleted.scripted_a===true,scripted_b:next.scriptedCompleted.scripted_b===true}:{scripted_a:false,scripted_b:false};
  next.resolvedHostileIds=Array.isArray(next.resolvedHostileIds)?[...new Set(next.resolvedHostileIds.filter(id=>HOSTILE_IDS.includes(id)))]:[];
  next.playerOpportunityOrdinal=Math.max(1,Number(next.playerOpportunityOrdinal)||1);
  next.enemyOpportunityOrdinal=Math.max(0,Number(next.enemyOpportunityOrdinal)||0);
  next.processing=false;

  // Deterministic migration away from the superseded #369 Menma/Anko assist cadence.
  if(Number(raw.version||0)<2){
    const resolved=new Set(next.resolvedHostileIds);
    if(resolved.has(HOSTILE_IDS[0])&&resolved.has(HOSTILE_IDS[1]))next.phase="phase_c_player";
    else if(resolved.has(HOSTILE_IDS[0]))next.phase="scripted_b";
    else next.phase="scripted_a";
    next.scriptedCompleted={
      scripted_a:resolved.has(HOSTILE_IDS[0]),
      scripted_b:resolved.has(HOSTILE_IDS[1])
    };
    next.pendingZero=null;
    next.inputLocked=next.phase!=="phase_c_player";
    next.ankoYielded=next.phase==="phase_c_player"||next.phase==="phase_c_enemy";
  }
  if(!["scripted_a","scripted_b","phase_c_player","phase_c_enemy","terminal"].includes(next.phase))next.phase="scripted_a";
  return next;
}
function ensureState(){
  const b=battle();if(!b||!isExactBattle(b))return null;
  if(!b.menmaEvolvedPLBattle36900||typeof b.menmaEvolvedPLBattle36900!=="object"){
    b.menmaEvolvedPLBattle36900=createState(sceneInstanceId(b));
  }else{
    const normalized=normalizeState(b.menmaEvolvedPLBattle36900,sceneInstanceId(b));
    Object.keys(b.menmaEvolvedPLBattle36900).forEach(key=>delete b.menmaEvolvedPLBattle36900[key]);
    Object.assign(b.menmaEvolvedPLBattle36900,normalized);
  }
  return b.menmaEvolvedPLBattle36900;
}
function liveHostile(id){
  if(!HOSTILE_IDS.includes(id))return false;
  try{return Number(getBattleRemainingPL("enemy",id))>0;}catch(_error){return false;}
}
function activeEnemy(){
  try{return getBattleDeploymentParticipant("enemy",1);}catch(_error){return null;}
}
function activePlayer(){
  try{return getBattleDeploymentParticipant("player",1);}catch(_error){return null;}
}
function updateResolvedHostiles(){
  const s=ensureState();if(!s)return[];
  HOSTILE_IDS.forEach(id=>{if(!liveHostile(id)&&!s.resolvedHostileIds.includes(id))s.resolvedHostileIds.push(id);});
  return[...s.resolvedHostileIds];
}
function currentOpportunityId(side){
  const b=battle(),s=ensureState();if(!b||!s)return null;
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
  if(s.committedOpportunities[id])return{success:false,idempotent:true,receipt:s.committedOpportunities[id]};
  const receipt={opportunityId:id,side,actorId:actorId||null,actionId:actionId||null,kind:kind||"committed_action",semanticGeneration:2};
  s.committedOpportunities[id]=receipt;s.lastSemanticEvent=clone(receipt);return{success:true,receipt};
}
function committedChoice(opportunityId,choiceClass,candidateIds){
  const s=ensureState();
  if(!s||!opportunityId||!Array.isArray(candidateIds)||candidateIds.length===0)return null;
  const existing=s.rngChoices[opportunityId];
  if(existing&&existing.choiceClass===choiceClass&&candidateIds.includes(existing.selectedId))return existing.selectedId;
  const index=Math.floor(Math.random()*candidateIds.length);
  const selectedId=candidateIds[Math.max(0,Math.min(candidateIds.length-1,index))];
  s.rngChoices[opportunityId]={opportunityId,choiceClass,candidateIds:[...candidateIds],selectedId,randomnessAppliedAfterEligibility:true,equalSelectionWeight:true};
  persistBattleSnapshot();
  return selectedId;
}
function getInputReadiness(){
  const b=battle(),s=ensureState();
  if(!s||!b||!b.active||b.battleOver)return{ready:false,reason:"battle_not_active"};
  if(s.pendingZero)return{ready:false,reason:"committed_zero_waiting_for_presentation"};
  if(s.phase==="scripted_a"||s.phase==="scripted_b")return{ready:false,reason:"authored_anko_takedown"};
  if(s.phase!=="phase_c_player")return{ready:false,reason:"enemy_side_opportunity"};
  const active=activePlayer();
  if(!active||active.id!==MENMA_ID)return{ready:false,reason:"menma_not_active"};
  if(s.inputLocked||s.processing)return{ready:false,reason:"semantic_input_locked"};
  if(opportunityCommitted("player"))return{ready:false,reason:"side_opportunity_already_committed"};
  return{ready:true,reason:null,opportunityId:currentOpportunityId("player")};
}
function persistBattleSnapshot(){
  try{if(typeof saveTestState==="function")saveTestState();}catch(_error){}
}

// Encounter-local Anko is not ownership and never becomes a My Clan member.
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
    const s=ensureState();
    normalized.player={slots:createBattleDeploymentSlots(
      s&&(s.phase==="phase_c_player"||s.phase==="phase_c_enemy"||s.ankoYielded===true)
        ?[MENMA_ID,ANKO_ID]:[ANKO_ID,MENMA_ID]
    )};
    return normalized;
  };
  globalThis.normalizeBattleDeployment=wrapped;try{normalizeBattleDeployment=wrapped;}catch(_error){}
}

function resolveScriptedAnkoDamage(contract,envelope){
  const target=getBattleParticipantByIdentity("enemy",contract.targetId);
  if(!target)return{resolved:false,reason:"scripted_target_missing"};
  const output={
    primaryDiscipline:"Ninjutsu",statKey:typeof getBattlePrimaryDisciplineStatKey==="function"?getBattlePrimaryDisciplineStatKey("Ninjutsu"):"nin",
    effectivePrimaryDiscipline:ANKO_STATS.nin,coefficient:null,branch:"fixed_authored_anko_scripted_takedown",branchMultiplier:1,
    authoredPreExecutionMagnitude:contract.attackPL,weaponExecutionMultiplier:1,preDefenseAttackMagnitude:contract.attackPL,
    attackPL:contract.attackPL,fixedCalibration:true
  };
  const damage=resolveBattleDamagePacket({
    envelope,skill:{id:contract.skillId,mechanicalPacketCount:1},
    actorSide:"player",actorParticipantId:ANKO_ID,targetSide:"enemy",targetParticipantId:contract.targetId,
    output,mitigable:true,excess:null,stateRefs:[]
  });
  return damage?{resolved:true,damageApplied:true,finalDamage:Number(damage.finalDamage)||0,damage}:{resolved:false,reason:"scripted_damage_failed"};
}
function commitScriptedAnkoPhase(phaseKey){
  const s=ensureState(),contract=SCRIPTED_PHASES[phaseKey];
  if(!s||!contract)return{success:false,reason:"scripted_phase_missing"};
  if(s.phase!==phaseKey)return{success:false,reason:"scripted_phase_not_current",phase:s.phase};
  if(s.scriptedCompleted[phaseKey]===true)return{success:true,idempotent:true,phase:phaseKey};
  if(s.pendingZero)return{success:false,reason:"scripted_zero_already_pending"};

  const enemy=activeEnemy();
  if(!enemy||enemy.id!==contract.targetId)return{success:false,reason:"scripted_active_enemy_mismatch",expected:contract.targetId,actual:enemy&&enemy.id||null};
  const actor=ensureLocalAnko();
  const envelope=createBattleActionEnvelope({
    actorSide:"player",actorParticipantId:ANKO_ID,targetSide:"enemy",targetParticipantId:contract.targetId,
    actionClass:"authored_scripted_takedown",skillId:contract.skillId,
    sourceRefs:[
      {type:"combat_contract",id:SCRIPT_CONTRACT_ID},
      {type:"character",id:ANKO_ID,role:"encounter_local_scripted_ally"}
    ],
    data:{
      menmaHalfScriptedPhase:phaseKey,scriptedEncounterBeat:true,ordinarySideOpportunityConsumed:false,
      men03Eligible:false,displayName:contract.displayName
    }
  });
  const resolution=resolveScriptedAnkoDamage(contract,envelope);
  if(!resolution.resolved)return{success:false,reason:resolution.reason||"scripted_resolution_failed"};
  s.scriptedCompleted[phaseKey]=true;
  recordBattleEvidence({
    eventType:"menma_origin_scripted_anko_takedown_completed",committedOccurrence:true,actionId:envelope.actionId,
    actorRef:createBattleParticipantRef("player",ANKO_ID),targetRef:createBattleParticipantRef("enemy",contract.targetId),
    skillId:contract.skillId,sourceRefs:envelope.sourceRefs,
    data:{
      resolved:true,displayName:contract.displayName,scriptedPhase:phaseKey,
      authoredAttackPL:contract.attackPL,expectedTargetStamina:contract.expectedStamina,
      finalDamage:Number(resolution.finalDamage)||0,expectedDamage:contract.expectedDamage,
      ordinarySideOpportunityConsumed:false,men03Eligible:false,
      zeroPLWithdrawalPendingPresentation:true
    }
  });
  persistBattleSnapshot();
  return{success:true,phase:phaseKey,envelope,resolution};
}

function enemyEligibleActions(enemy,target){
  if(!enemy||enemy.id!=="test_subject_unstable"||!target||target.id!==MENMA_ID)return[];
  const authored=typeof getEnemyAuthoredBattleActions==="function"?getEnemyAuthoredBattleActions(enemy):[];
  return authored.filter(action=>{
    const eligibility=typeof evaluateEnemyAuthoredActionEligibility==="function"?evaluateEnemyAuthoredActionEligibility(action,enemy,target):{eligible:true};
    return !!eligibility&&eligibility.eligible===true;
  });
}
function resolvePhaseCEnemyOpportunity(){
  const s=ensureState();if(!s||s.phase!=="phase_c_enemy"||s.pendingZero)return{success:false,reason:"phase_c_enemy_not_ready"};
  const enemy=activeEnemy(),target=getBattleParticipantByIdentity("player",MENMA_ID);
  if(!enemy||enemy.id!=="test_subject_unstable")return{success:false,reason:"unstable_not_active"};
  if(!target)return{success:false,reason:"menma_target_missing"};
  const eligible=enemyEligibleActions(enemy,target);
  if(eligible.length===0)return{success:false,reason:"unstable_no_legal_action"};
  const opId=currentOpportunityId("enemy");
  const selectedId=committedChoice(opId,"unstable_phase_c_action",eligible.map(row=>row.id));
  const action=eligible.find(row=>row.id===selectedId);
  if(!action)return{success:false,reason:"committed_unstable_action_no_longer_eligible"};
  try{if(typeof resolveBattleStartOfActionOpportunityEffects==="function")resolveBattleStartOfActionOpportunityEffects("enemy",enemy.id,opId);}catch(_error){}
  const envelope=createBattleActionEnvelope({
    actorSide:"enemy",actorParticipantId:enemy.id,targetSide:"player",targetParticipantId:MENMA_ID,
    actionClass:action.actionClass||"enemy_authored_action",skillId:action.skillId||action.id,
    sourceRefs:Array.isArray(action.sourceRefs)?action.sourceRefs:[],
    data:{traits:Array.isArray(action.traits)?[...action.traits]:[],authoredEnemyAction:true,phaseCOnly:true}
  });
  const entry=beginBattleActionResolution(envelope);
  if(!entry||entry.accepted!==true)return{success:false,reason:entry&&entry.validation&&entry.validation.reason||"unstable_envelope_rejected"};
  const resolution=action.resolve({enemy,target,envelope,currentBattle:battle()});
  const resolved=!!(resolution&&resolution.resolved===true);
  const secondary=resolved&&typeof resolveAlphaEnemyActionSecondaryConsumers==="function"
    ?resolveAlphaEnemyActionSecondaryConsumers(action,enemy,target,envelope,resolution)
    :{appliedIds:[],stateRefs:[],conditionRefs:[]};
  recordBattleEvidence({
    eventType:"enemy_authored_action_completed",committedOccurrence:resolved,actionId:envelope.actionId,
    actorRef:envelope.actorRef,targetRef:envelope.targetRef,skillId:envelope.skillId,sourceRefs:envelope.sourceRefs,
    stateRefs:secondary&&secondary.stateRefs||[],conditionRefs:secondary&&secondary.conditionRefs||[],
    data:{resolved,actionId:action.id,phaseCOnly:true,randomnessAppliedAfterEligibility:true,equalSelectionWeight:true}
  });
  if(!resolved)return{success:false,reason:"unstable_action_resolution_failed"};
  consumeBattleActionOpportunity("enemy",enemy.id,envelope.actionId,"valid_enemy_action_completed");
  return{success:true,envelope,resolution};
}

// Zero-PL commit and formation mutation are deliberately separated so the struck
// participant remains visible until the committed action playback settles.
const PRE_ZERO=typeof handleBattleParticipantAtZeroPL==="function"?handleBattleParticipantAtZeroPL:null;
if(PRE_ZERO){
  const wrapped=function(side,participantId,actor,envelope){
    if(!isExactBattle())return PRE_ZERO.apply(this,arguments);
    const s=ensureState();
    const actionId=envelope&&envelope.actionId||null;
    const scriptedEnemy=(s.phase==="scripted_a"&&participantId===HOSTILE_IDS[0])||(s.phase==="scripted_b"&&participantId===HOSTILE_IDS[1]);
    const phaseCEnemy=(s.phase==="phase_c_player"&&side==="enemy"&&participantId===HOSTILE_IDS[2]);
    const phaseCPlayer=(s.phase==="phase_c_enemy"&&side==="player"&&participantId===MENMA_ID);
    if((side==="enemy"&&scriptedEnemy)||phaseCEnemy||phaseCPlayer){
      s.pendingZero={side,participantId,actionId,actorId:actor&&actor.id||null,phase:s.phase};
      s.inputLocked=true;
      if(side==="enemy"&&!s.resolvedHostileIds.includes(participantId))s.resolvedHostileIds.push(participantId);
      if(side==="player"&&participantId===MENMA_ID)s.menmaWithdrawn=true;
      persistBattleSnapshot();
      return{type:"presentation_pending_withdrawal",side,participantId,actionId,presentationMustSettleFirst:true};
    }
    return PRE_ZERO.apply(this,arguments);
  };
  globalThis.handleBattleParticipantAtZeroPL=wrapped;try{handleBattleParticipantAtZeroPL=wrapped;}catch(_error){}
}

function swapAnkoToMenmaActive(){
  const b=battle(),s=ensureState();if(!b||!s)return false;
  const before=getBattleDeploymentParticipant("player",1);
  b.deployment.player={slots:createBattleDeploymentSlots([MENMA_ID,ANKO_ID])};
  if(typeof syncBattleActivePlayerFromDeployment==="function")syncBattleActivePlayerFromDeployment();
  else b.activePlayer=getBattleParticipantByIdentity("player",MENMA_ID);
  s.ankoYielded=true;s.phase="phase_c_player";s.inputLocked=false;
  b.characterId=MENMA_ID;
  const deployment=b.deployment;
  const pairedEnemyRelayTransition=deployment.lastTransition&&deployment.lastTransition.side==="enemy"
    ?clone(deployment.lastTransition):null;
  deployment.transitionCounter=(Number(deployment.transitionCounter)||0)+1;
  deployment.lastTransition={
    id:"menma_phase_c_yield_"+String(deployment.transitionCounter),type:"authored_active_yield",side:"player",
    reason:"menma_origin_phase_c_handoff",withdrawnParticipantId:null,vacatedSlot:1,replacementParticipantId:MENMA_ID,
    movements:[{participantId:ANKO_ID,fromSlot:1,toSlot:2,movementType:"authored_yield_to_bench"},{participantId:MENMA_ID,fromSlot:2,toSlot:1,movementType:"authored_bench_promotion"}],
    pairedEnemyRelayTransition,
    createdAt:Date.now()
  };
  recordBattleEvidence({
    eventType:"battle_formation_yield_committed",committedOccurrence:true,
    actorRef:createBattleParticipantRef("player",ANKO_ID),targetRef:createBattleParticipantRef("player",MENMA_ID),
    data:{yieldFrom:before&&before.id||ANKO_ID,promoteTo:MENMA_ID,ankoRemainsDeployed:true,menmaReceivesFirstNormalPlayerOpportunity:true}
  });
  recordBattleEvidence({
    eventType:"menma_origin_phase_c_started",committedOccurrence:true,
    actorRef:createBattleParticipantRef("player",MENMA_ID),targetRef:createBattleParticipantRef("enemy",HOSTILE_IDS[2]),
    data:{men03Scope:"phase_c_only",firstNormalPlayerOpportunity:true,ankoScriptedActionsExcluded:true}
  });
  persistBattleSnapshot();
  return true;
}

function completeOccurrenceReceipt(result){
  const b=battle(),p=player(),id=battleOccurrenceId(b);
  if(!b||!p||!id)return null;
  if(!Array.isArray(p.activityHistory))p.activityHistory=[];
  const existing=p.activityHistory.find(row=>row&&String(row.battleOccurrenceId||row.occurrenceId||"")===id&&row.type!=="origin_battle_reward");
  if(existing)return existing;
  const s=ensureState(),victory=result==="victory";
  updateResolvedHostiles();
  const record={
    historyScope:typeof getCurrentChronicleOccurrenceHistoryScope==="function"?getCurrentChronicleOccurrenceHistoryScope("origin_battle_occurrence"):null,
    type:"origin_battle_occurrence",activity:"battle",completed:true,committed:true,success:victory,
    outcome:victory?"victory":"defeat",sourceOccurrenceId:id,occurrenceId:id,battleOccurrenceId:id,
    actorVariantId:MENMA_ID,sceneId:STORY_SCENE_ID,storySceneInstanceId:sceneInstanceId(b),
    battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,
    battleResult:victory?"victory":"defeat",terminalBattleResult:victory?"victory":"defeat",objectiveCompleted:victory,
    menmaWithdrawn:!!(s&&s.menmaWithdrawn),ankoWithdrawn:false,
    alliedParticipantIds:[...ALLIED_IDS],hostileParticipantIds:[...HOSTILE_IDS],
    resolvedHostileIds:victory?[...HOSTILE_IDS]:[...(s&&s.resolvedHostileIds||[])],
    fact:{battlePLWithdrawalNotDeath:true,noInferredInjury:true,noInferredCustody:true,menmaOnlyTutorialAttribution:true,halfScriptedPhaseABExcludedFromMEN03:true},
    data:{battlePLWithdrawalNotDeath:true,noInferredInjury:true,noInferredCustody:true,menmaOnlyTutorialAttribution:true,halfScriptedPhaseABExcludedFromMEN03:true},
    timestamp:Date.now()
  };
  p.activityHistory.push(record);
  try{if(typeof activityHistory!=="undefined"&&Array.isArray(activityHistory)&&activityHistory!==p.activityHistory)activityHistory.push(record);}catch(_error){}
  return record;
}
function upstreamBattleReceipt(){return completeOccurrenceReceipt("victory");}

const PRE_COMPLETE_VICTORY=typeof completeBattleVictoryFromDamage==="function"?completeBattleVictoryFromDamage:null;
function completeMenmaSuccessorVictory(actionId=null){
  const s=ensureState();if(!s||battle().battleOver)return battle().outcome||battle().rewards;
  if(!HOSTILE_IDS.every(id=>Number(getBattleRemainingPL("enemy",id))<=0))return{success:false,reason:"three_subject_objective_incomplete"};
  s.terminalResult="victory";s.phase="terminal";s.inputLocked=true;s.menmaWithdrawn=false;
  upstreamBattleReceipt();
  const menma=getBattleParticipantByIdentity("player",MENMA_ID);
  const result=PRE_COMPLETE_VICTORY?PRE_COMPLETE_VICTORY.call(globalThis,menma,null,HOSTILE_IDS[2]):null;
  if(battle().outcome){
    Object.assign(battle().outcome,{
      battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,objectiveCompleted:true,
      menmaWithdrawn:false,ankoWithdrawn:false,resolvedHostileIds:[...HOSTILE_IDS],battleOccurrenceId:battleOccurrenceId(),
      tutorialResult:"completed",men03Scope:"phase_c_only"
    });
  }
  try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
  persistBattleSnapshot();return result;
}
const PRE_COMPLETE_DEFEAT=typeof completeBattleDefeat==="function"?completeBattleDefeat:null;
function completeMenmaSuccessorDefeat(actionId=null){
  const s=ensureState();if(!s||battle().battleOver)return battle().outcome;
  s.terminalResult="defeat";s.phase="terminal";s.inputLocked=true;s.menmaWithdrawn=true;
  completeOccurrenceReceipt("defeat");
  const result=PRE_COMPLETE_DEFEAT?PRE_COMPLETE_DEFEAT.call(globalThis,MENMA_ID,null,"academy_menma_phase_c_withdrawn"):null;
  if(battle().outcome){
    Object.assign(battle().outcome,{
      battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,objectiveCompleted:false,
      menmaWithdrawn:true,ankoWithdrawn:false,resolvedHostileIds:[...(s.resolvedHostileIds||[])],battleOccurrenceId:battleOccurrenceId(),
      tutorialResult:"not_completed",performanceBucket:null,men03Scope:"phase_c_only"
    });
  }
  persistBattleSnapshot();return result;
}

// Called by 33000 only after the exact committed action has visibly settled.
function advanceAfterPresentation(receipt){
  const s=ensureState();if(!s||!receipt||!receipt.actionId)return{success:false,reason:"presentation_receipt_missing"};
  const pending=s.pendingZero;
  if(!pending||String(pending.actionId||"")!==String(receipt.actionId||""))return{success:false,reason:"no_matching_pending_zero"};
  s.pendingZero=null;

  if(pending.side==="enemy"){
    const from=pending.participantId;
    const transition=typeof advanceBattleParticipantAtZeroPL==="function"
      ?advanceBattleParticipantAtZeroPL("enemy",from):null;
    updateResolvedHostiles();
    const next=activeEnemy();
    recordBattleEvidence({
      eventType:"battle_formation_relay_committed",committedOccurrence:true,actionId:pending.actionId,
      actorRef:createBattleParticipantRef("enemy",from),targetRef:next?createBattleParticipantRef("enemy",next.id):null,
      data:{relayFrom:from,relayTo:next&&next.id||null,outgoingActiveExited:true,nextEligibleActive:next&&next.id||null,semanticFormationAlreadyCommitted:true}
    });

    if(pending.phase==="scripted_a"){
      if(!next||next.id!==HOSTILE_IDS[1])return{success:false,reason:"brute_relay_missing"};
      s.phase="scripted_b";s.inputLocked=true;persistBattleSnapshot();
      return commitScriptedAnkoPhase("scripted_b");
    }
    if(pending.phase==="scripted_b"){
      if(!next||next.id!==HOSTILE_IDS[2])return{success:false,reason:"unstable_relay_missing"};
      swapAnkoToMenmaActive();
      return{success:true,phase:"phase_c_player",relay:transition};
    }
    if(pending.phase==="phase_c_player"){
      if(next)return{success:false,reason:"unexpected_enemy_successor_after_unstable"};
      return{success:true,terminal:"victory",result:completeMenmaSuccessorVictory(pending.actionId)};
    }
  }

  if(pending.side==="player"&&pending.participantId===MENMA_ID&&pending.phase==="phase_c_enemy"){
    return{success:true,terminal:"defeat",result:completeMenmaSuccessorDefeat(pending.actionId)};
  }
  return{success:false,reason:"pending_zero_shape_unhandled"};
}
globalThis.advanceMenmaScriptedBattleAfterPresentation37300=advanceAfterPresentation;

// Phase C side alternation. The enemy action may commit immediately after Menma,
// but 33000 presents immutable receipts strictly one after another.
const PRE_CONSUME_OPPORTUNITY=typeof consumeBattleActionOpportunity==="function"?consumeBattleActionOpportunity:null;
if(PRE_CONSUME_OPPORTUNITY){
  const wrapped=function(side,participantId,actionId,reason){
    const result=PRE_CONSUME_OPPORTUNITY.apply(this,arguments);
    if(!isExactBattle())return result;
    const s=ensureState();if(!s||s.processing||battle().battleOver)return result;

    if(side==="player"&&participantId===MENMA_ID&&s.phase==="phase_c_player"){
      if(!opportunityCommitted("player"))markOpportunityCommitted("player",MENMA_ID,actionId,"menma_phase_c_action");
      s.inputLocked=true;
      if(s.pendingZero)return result;
      s.phase="phase_c_enemy";s.enemyOpportunityOrdinal+=1;s.processing=true;
      try{
        const enemyResult=resolvePhaseCEnemyOpportunity();
        if(!enemyResult||enemyResult.success!==true){
          recordBattleEvidence({eventType:"menma_origin_phase_c_enemy_opportunity_failed_visible",committedOccurrence:true,actionId:"failed:"+currentOpportunityId("enemy"),data:{reason:enemyResult&&enemyResult.reason||"enemy_resolution_failed",inventedFallback:false}});
          s.phase="phase_c_player";s.playerOpportunityOrdinal+=1;s.inputLocked=false;
        }else if(!s.pendingZero){
          // Nested enemy opportunity consumption occurs while this outer settle
          // owns the semantic lock. Commit/advance it here exactly once rather
          // than relying on the re-entrancy-suppressed wrapper.
          const enemyActionId=enemyResult.envelope&&enemyResult.envelope.actionId||null;
          if(!opportunityCommitted("enemy"))markOpportunityCommitted("enemy",HOSTILE_IDS[2],enemyActionId,"unstable_phase_c_action");
          s.phase="phase_c_player";s.playerOpportunityOrdinal+=1;s.inputLocked=false;
        }
      }finally{s.processing=false;}
      persistBattleSnapshot();
      return result;
    }

    if(side==="enemy"&&participantId===HOSTILE_IDS[2]&&s.phase==="phase_c_enemy"){
      if(!opportunityCommitted("enemy"))markOpportunityCommitted("enemy",participantId,actionId,"unstable_phase_c_action");
      if(s.pendingZero){s.inputLocked=true;persistBattleSnapshot();return result;}
      s.phase="phase_c_player";s.playerOpportunityOrdinal+=1;s.inputLocked=false;
      persistBattleSnapshot();
    }
    return result;
  };
  globalThis.consumeBattleActionOpportunity=wrapped;try{consumeBattleActionOpportunity=wrapped;}catch(_error){}
}

const PRE_CAN_WITHDRAW=typeof canWithdrawActiveBattleFighter==="function"?canWithdrawActiveBattleFighter:null;
if(PRE_CAN_WITHDRAW){
  const wrapped=function(){if(isExactBattle())return false;return PRE_CAN_WITHDRAW.apply(this,arguments);};
  globalThis.canWithdrawActiveBattleFighter=wrapped;try{canWithdrawActiveBattleFighter=wrapped;}catch(_error){}
}
const PRE_WITHDRAW=typeof withdrawActiveBattleFighter==="function"?withdrawActiveBattleFighter:null;
if(PRE_WITHDRAW){
  const wrapped=function(){if(isExactBattle())return false;return PRE_WITHDRAW.apply(this,arguments);};
  globalThis.withdrawActiveBattleFighter=wrapped;try{withdrawActiveBattleFighter=wrapped;}catch(_error){}
}

const PRE_RENDER_ACTION_REGION=typeof renderBattleActionRegion==="function"?renderBattleActionRegion:null;
if(PRE_RENDER_ACTION_REGION){
  const wrapped=function(actor,target){
    if(isExactBattle()){
      const readiness=getInputReadiness(),s=ensureState();
      if(!readiness.ready){
        // Scripted/resolving phases are narrated by the ordered performance
        // presentation above the formation. Keep the action dock inert without
        // leaking internal state-machine reasons into player-facing UI.
        return '<div class="battle-live-autonomous-phase" data-menma-36900-autonomous="true" data-action-region-locked="true" aria-hidden="true"></div>';
      }
    }
    return PRE_RENDER_ACTION_REGION.apply(this,arguments);
  };
  globalThis.renderBattleActionRegion=wrapped;try{renderBattleActionRegion=wrapped;}catch(_error){}
}

// Existing Menma tutorial readers remain authoritative; this exact encounter is
// admitted so MEN-03 consumes Menma-only Phase C evidence.
const PRE_IS_MENMA_TUTORIAL=typeof isMenmaOriginTutorialBattle==="function"?isMenmaOriginTutorialBattle:null;
if(PRE_IS_MENMA_TUTORIAL){
  const wrapped=function(){return isExactBattle()||PRE_IS_MENMA_TUTORIAL.apply(this,arguments);};
  globalThis.isMenmaOriginTutorialBattle=wrapped;try{isMenmaOriginTutorialBattle=wrapped;}catch(_error){}
}

// Save/load exact scripted phase and encounter-local Anko without granting ownership.
const PRE_SAVE_TEST=typeof saveTestState==="function"?saveTestState:null;
if(PRE_SAVE_TEST){
  const wrapped=function(){
    const result=PRE_SAVE_TEST.apply(this,arguments);
    if(isExactBattle()&&typeof sessionStorage!=="undefined"){
      try{
        const raw=sessionStorage.getItem("shinobiTestState"),state=raw?JSON.parse(raw):{};
        state.encounterId=ENCOUNTER_ID;state.battleConfigId=BATTLE_CONFIG_ID;state.objectiveId=OBJECTIVE_ID;
        state.menma369BattleActive=battle().active===true&&battle().battleOver!==true;
        state.menmaEvolvedPLBattle36900=clone(ensureState());
        state.menma369LocalAllies={[ANKO_ID]:makeAnkoParticipant()};
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
    let savedState=null,savedBattleActive=false;
    if(typeof sessionStorage!=="undefined"){
      try{
        const raw=sessionStorage.getItem("shinobiTestState"),parsed=raw?JSON.parse(raw):null;
        if(parsed&&String(parsed.encounterId||"")===ENCOUNTER_ID&&String(parsed.battleConfigId||"")===BATTLE_CONFIG_ID){
          savedState=parsed.menmaEvolvedPLBattle36900||null;savedBattleActive=parsed.menma369BattleActive===true;
        }
      }catch(_error){}
    }
    const result=PRE_RESTORE_TEST.apply(this,arguments);
    if(isExactBattle()){
      const b=battle();b.menma369LocalAllies={[ANKO_ID]:makeAnkoParticipant()};
      b.menmaEvolvedPLBattle36900=normalizeState(savedState||b.menmaEvolvedPLBattle36900,sceneInstanceId(b));
      if(savedBattleActive&&b.battleOver!==true)b.active=true;
      if(!getBattleRemainingPLRecord("player",ANKO_ID))setBattleRemainingPLRecord("player",ANKO_ID,ANKO_BASE_PL,ANKO_BASE_PL);
      if(typeof syncBattleActivePlayerFromDeployment==="function")syncBattleActivePlayerFromDeployment();
      if(typeof syncBattleActiveEnemyFromDeployment==="function")syncBattleActiveEnemyFromDeployment();
      try{openOverlay("combat");}catch(_error){}
      queueMicrotask(()=>{
        const s=ensureState();if(!s||battle().battleOver)return;
        if(s.pendingZero){
          let pendingPresentation=false;
          try{pendingPresentation=typeof pendingBattlePresentation33000==="function"&&pendingBattlePresentation33000();}catch(_error){}
          if(!pendingPresentation)advanceAfterPresentation({actionId:s.pendingZero.actionId});
          return;
        }
        if(s.phase==="scripted_a"&&!s.scriptedCompleted.scripted_a)commitScriptedAnkoPhase("scripted_a");
        else if(s.phase==="scripted_b"&&!s.scriptedCompleted.scripted_b)commitScriptedAnkoPhase("scripted_b");
      });
    }
    return result;
  };
  globalThis.restoreTestState=wrapped;try{restoreTestState=wrapped;}catch(_error){}
}

function configureExactDeployment(){
  const b=battle();if(!b)return{success:false,reason:"battle_missing"};
  ensureLocalAnko();
  configureBattleEnemyParticipants(HOSTILE_IDS.map(id=>enemyDatabase&&enemyDatabase[id]).filter(Boolean));
  b.deployment={
    player:{slots:createBattleDeploymentSlots([ANKO_ID,MENMA_ID])},
    enemy:{slots:createBattleDeploymentSlots([...HOSTILE_IDS])},
    transitionCounter:0,lastTransition:null
  };
  if(typeof syncBattleActivePlayerFromDeployment==="function")syncBattleActivePlayerFromDeployment();
  else b.activePlayer=ensureLocalAnko();
  syncBattleActiveEnemyFromDeployment();
  b.characterId=MENMA_ID;b.enemy=getBattleDeploymentParticipant("enemy",1);
  b.encounterEnemy=enemyDatabase.test_subject_altered_shinobi;
  initializeBattleContributionRecordsFromDeployment();
  initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:false});
  setBattleRemainingPLRecord("player",ANKO_ID,ANKO_BASE_PL,ANKO_BASE_PL);
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

  selectedEnemy=altered;
  const b=battle();
  b.active=true;b.battleId=createBattleInstanceId();b.encounterId=ENCOUNTER_ID;b.battleConfigId=BATTLE_CONFIG_ID;b.objectiveId=OBJECTIVE_ID;
  b.playerFacingObjective=PLAYER_OBJECTIVE_TEXT;b.environmentPath=BATTLE_ENVIRONMENT_PATH;b.presentationEnvironmentPath=BATTLE_ENVIRONMENT_PATH;
  b.encounterOccurrenceId=null;b.oppositionTemplateId=altered.id;b.encounterStatePackageId=null;b.characterId=MENMA_ID;b.encounterEnemy=altered;
  setBattleEnemyParticipants(hostileParticipants);b.enemy=altered;
  b.menma369LocalAllies={[ANKO_ID]:makeAnkoParticipant()};
  b.deployment={player:{slots:createBattleDeploymentSlots([ANKO_ID,MENMA_ID])},enemy:{slots:createBattleDeploymentSlots([...HOSTILE_IDS])},transitionCounter:0,lastTransition:null};
  b.activePlayer=ensureLocalAnko();syncBattleActiveEnemyFromDeployment();
  b.lastDamage=0;b.battleOver=false;b.completedAt=null;b.claimedAt=null;b.completionRecorded=false;b.outcome=null;b.defeat=null;
  b.returnContext=normalizedReturn;b.observerSafeResultContext=null;b.unknownOperativeConfrontation=null;b.mission7SanitisationEncounter=null;b.mission5FemaleOperatorEncounter=null;
  b.menmaEvolvedPLBattle36900=createState(context.active&&context.active.instanceId||sceneInstanceId(b));
  b.battleLog=[
    "Three altered test subjects move through the clearing.",
    "Special Jōnin Anko takes Active. Academy Menma waits Benched for the final subject."
  ];
  b.rewards={generated:false,claimed:false,ryo:0,exp:0,items:[],rareDrops:[],finishingShinobi:null,mvp:null};
  b.enemyPower=calculateBattlePower(altered,"standard");b.enemyMaxPower=b.enemyPower;

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
    actorRef:createBattleParticipantRef("player",ANKO_ID),targetRef:createBattleParticipantRef("enemy",HOSTILE_IDS[0]),
    sourceRefs:[{type:"battle_config",id:BATTLE_CONFIG_ID},{type:"story_scene",id:STORY_SCENE_ID},{type:"combat_contract",id:SCRIPT_CONTRACT_ID}],
    data:{
      battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,
      alliedParticipantIds:[...ALLIED_IDS],hostileParticipantIds:[...HOSTILE_IDS],
      halfScripted:true,phaseAActor:ANKO_ID,phaseCPlayerActor:MENMA_ID,
      plIdentity:"Battle PL",healthReplacement:false,myClanStartBypassedForExactOriginOccurrence:true,myClanMutated:false
    }
  });
  persistBattleSnapshot();
  try{openOverlay("combat");}catch(_error){}
  const scripted=commitScriptedAnkoPhase("scripted_a");
  return{success:scripted.success===true,battleId:b.battleId,encounterId:ENCOUNTER_ID,battleConfigId:BATTLE_CONFIG_ID,objectiveId:OBJECTIVE_ID,battleOccurrenceId:battleOccurrenceId(b),scripted};
}
function migrateMenmaSuccessorDisplayValue(value){
  if(typeof value==="string")return value.replaceAll("Stop the Altered Shinobi — not completed.","Stop the Test Subjects — not completed.").replaceAll("STOP THE ALTERED SHINOBI","STOP THE TEST SUBJECTS").replaceAll("Stop the Altered Shinobi.","Stop the Test Subjects.");
  if(Array.isArray(value))return value.map(migrateMenmaSuccessorDisplayValue);
  if(value&&typeof value==="object"){
    for(const key of Object.keys(value)){
      if(/occurrence|source|history|receipt/i.test(key))continue;
      if(typeof value[key]==="function")continue;
      value[key]=migrateMenmaSuccessorDisplayValue(value[key]);
    }
  }
  return value;
}
function applyMenmaSuccessorBattleAuthority(scene){
  if(!scene||!scene.beatMap||typeof scene.beatMap.get!=="function")return{success:false,reason:"menma_story_scene_missing"};
  const beat=scene.beatMap.get(STORY_BATTLE_BEAT_ID);
  if(!beat||beat.mode!=="battle_transition"||!beat.battle)return{success:false,reason:"menma_story_battle_beat_missing"};
  beat.battle.enemyId=HOSTILE_IDS[0];beat.battle.encounterId=ENCOUNTER_ID;beat.battle.battleConfigId=BATTLE_CONFIG_ID;beat.battle.objectiveId=OBJECTIVE_ID;
  beat.battle.objectiveText=PLAYER_OBJECTIVE_TEXT;beat.battle.objectiveLabel=PLAYER_OBJECTIVE_TEXT;
  beat.battle.environmentPath=BATTLE_ENVIRONMENT_PATH;beat.battle.backdrop=BATTLE_ENVIRONMENT_PATH;
  beat.battle.launchResolver=launchMenmaEvolvedPLBattle36900;
  for(const row of scene.beatMap.values())migrateMenmaSuccessorDisplayValue(row);
  return{success:true,sceneId:STORY_SCENE_ID,beatId:STORY_BATTLE_BEAT_ID,objectiveText:PLAYER_OBJECTIVE_TEXT,environmentPath:BATTLE_ENVIRONMENT_PATH};
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
  return applyMenmaSuccessorBattleAuthority(getStorySceneDefinition(STORY_SCENE_ID));
}

const PRE_MENMA_PRODUCTION_DIAG=typeof runAlphaMenmaOriginProductionDiagnostics==="function"?runAlphaMenmaOriginProductionDiagnostics:null;
if(PRE_MENMA_PRODUCTION_DIAG){
  const wrapped=function(){
    const prior=PRE_MENMA_PRODUCTION_DIAG.apply(this,arguments);
    const scene=getStorySceneDefinition(STORY_SCENE_ID),beat=scene&&scene.beatMap&&scene.beatMap.get(STORY_BATTLE_BEAT_ID);
    const successor=!!beat&&beat.battle&&beat.battle.encounterId===ENCOUNTER_ID&&beat.battle.battleConfigId===BATTLE_CONFIG_ID&&beat.battle.launchResolver===launchMenmaEvolvedPLBattle36900;
    const result={...prior,directBattleExactlyMenmaVsAltered:false,directBattleExactlyMenmaVsAlteredSuperseded:true,successorMenmaAnkoThreeSubjectBattle:successor};
    result.pass=Object.entries(result).filter(([key])=>!["pass","directBattleExactlyMenmaVsAltered"].includes(key)).every(([,value])=>value===true);
    return result;
  };
  globalThis.runAlphaMenmaOriginProductionDiagnostics=wrapped;try{runAlphaMenmaOriginProductionDiagnostics=wrapped;}catch(_error){}
}

function diagnostics(){
  const scene=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(STORY_SCENE_ID):null;
  const beat=scene&&scene.beatMap&&scene.beatMap.get(STORY_BATTLE_BEAT_ID);
  const source=[launchMenmaEvolvedPLBattle36900,commitScriptedAnkoPhase,advanceAfterPresentation,resolvePhaseCEnemyOpportunity,completeOccurrenceReceipt].map(fn=>String(fn)).join("\n");
  const checks={
    patchId:PATCH_ID==="menma_half_scripted_evolved_pl_battle_36900_2026_09_26",
    exactBattleIdentity:!!beat&&beat.battle&&beat.battle.battleConfigId===BATTLE_CONFIG_ID&&beat.battle.encounterId===ENCOUNTER_ID&&beat.battle.objectiveId===OBJECTIVE_ID,
    successorPlayerObjective:!!beat&&beat.battle&&beat.battle.objectiveText===PLAYER_OBJECTIVE_TEXT,
    exactBattleEnvironment:!!beat&&beat.battle&&beat.battle.environmentPath===BATTLE_ENVIRONMENT_PATH,
    exactParticipants:ALLIED_IDS.join("|")==="academy_menma|sj_anko"&&HOSTILE_IDS.join("|")==="test_subject_altered_shinobi|test_subject_brute|test_subject_unstable",
    phaseAExact:SCRIPTED_PHASES.scripted_a.skillId==="sj_anko_hidden_shadow_snake_hands"&&SCRIPTED_PHASES.scripted_a.attackPL===20&&SCRIPTED_PHASES.scripted_a.expectedDamage===18,
    phaseBExact:SCRIPTED_PHASES.scripted_b.skillId==="sj_anko_fire_style_dragon_flame"&&SCRIPTED_PHASES.scripted_b.attackPL===24&&SCRIPTED_PHASES.scripted_b.expectedDamage===21,
    scriptedDoesNotConsumeOrdinaryOpportunity:String(commitScriptedAnkoPhase).includes("ordinarySideOpportunityConsumed:false")&&!String(commitScriptedAnkoPhase).includes("consumeBattleActionOpportunity"),
    presentationGatesWithdrawal:String(handleBattleParticipantAtZeroPL).includes("presentation_pending_withdrawal")&&String(advanceAfterPresentation).includes("advanceBattleParticipantAtZeroPL"),
    exactEnemyRelay:HOSTILE_IDS.join("|")==="test_subject_altered_shinobi|test_subject_brute|test_subject_unstable",
    ankoYieldsToMenma:String(swapAnkoToMenmaActive).includes("[MENMA_ID,ANKO_ID]")&&String(swapAnkoToMenmaActive).includes("menmaReceivesFirstNormalPlayerOpportunity:true"),
    phaseCOnlyPlayerControl:String(getInputReadiness).includes('s.phase!=="phase_c_player"')&&String(resolvePhaseCEnemyOpportunity).includes("test_subject_unstable"),
    men03ExcludesAnko:String(commitScriptedAnkoPhase).includes("men03Eligible:false")&&String(swapAnkoToMenmaActive).includes('men03Scope:"phase_c_only"'),
    phaseCFailureNoFakeLow:String(completeMenmaSuccessorDefeat).includes('tutorialResult:"not_completed"')&&String(completeMenmaSuccessorDefeat).includes("performanceBucket:null"),
    exactBattleReceipt:String(completeOccurrenceReceipt).includes("halfScriptedPhaseABExcludedFromMEN03:true")&&String(completeOccurrenceReceipt).includes("resolvedHostileIds:victory?[...HOSTILE_IDS]"),
    rewardAdapterPresent:!!globalThis.SC_ACADEMY_MENMA_THREE_SUBJECT_REWARD_36200,
    plIdentityPreserved:source.includes('plIdentity:"Battle PL"')&&!source.includes("hit"+"Points")&&!source.includes("health"+"Meter"),
    kakashiUntouched:!source.includes("academy_"+"kakashi"),
    betaBatchExcluded:!source.includes("command batch")&&!source.includes("choose one Skill from every active "+"member"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const storyPatch=patchMenmaStoryBattle();
globalThis.launchMenmaEvolvedPLBattle36900=launchMenmaEvolvedPLBattle36900;
globalThis.getMenmaEvolvedPLBattleInputReadiness36900=getInputReadiness;
globalThis.getMenmaEvolvedPLBattleState36900=function(){return clone(ensureState());};
globalThis.commitMenmaScriptedAnkoPhase36900=commitScriptedAnkoPhase;
globalThis.runIssue369MenmaEvolvedPLBattleDiagnostics=diagnostics;
globalThis.SC_MENMA_EVOLVED_PL_BATTLE_36900=Object.freeze({
  patchId:PATCH_ID,battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,
  scriptContractId:SCRIPT_CONTRACT_ID,alliedParticipantIds:Object.freeze([...ALLIED_IDS]),hostileParticipantIds:Object.freeze([...HOSTILE_IDS]),
  phaseOrder:Object.freeze(["scripted_a","scripted_b","phase_c_player"]),storyPatch:clone(storyPatch),browserGoldenClaimed:false
});
})();
