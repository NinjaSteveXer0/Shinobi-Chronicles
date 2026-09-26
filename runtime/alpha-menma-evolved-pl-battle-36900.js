// ============================================================================
// ISSUE #369 / #373 SUCCESSOR — ACADEMY MENMA GUEST-ALLY EVOLVED PL BATTLE
// CE authority:
// Documentation/Coordination/Battle_Participant_Control_and_First_PL_Battle_Tutorial_Contract_2026-09-26.md
// Writing defeat authority:
// Documentation/Story/Academy_Menma_Scene_7_Party_Defeat_Continuation_2026-09-26.md
// Combat Skill/numeric authority retained from:
// Documentation/Combat/SC_Combat_Academy_Menma_Half_Scripted_Anko_Takedown_Package_2026-09-26.md
// ============================================================================
// Scene 7 is a scoped authored participant formation. It does NOT rewrite
// generic PL Battle law or grant temporary participants permanent ownership.
//
// Anko opens Active as a player-controlled Guest Ally. Her four legal Origin
// Skills are genuine player choices. Ordinary Active-vs-Active cadence applies.
// Enemy relay remains Altered -> Brute -> Unstable. If Anko legitimately resolves
// Altered + Brute while still eligible/Active, she yields to Menma after the
// Brute withdrawal and Unstable relay. Side alternation does not reset.
//
// Zero-PL formation mutation is presentation-gated so the outgoing participant
// remains visible for the immutable action receipt. Presentation never chooses
// or recalculates the semantic outcome.
// ============================================================================
(function installMenmaEvolvedPLBattle36900(){
"use strict";

const PATCH_ID="menma_guest_ally_evolved_pl_battle_36900_2026_09_26";
const BATTLE_CONFIG_ID="academy_menma_origin_three_test_subjects_with_anko";
const ENCOUNTER_ID="origin_academy_menma_prologue:three_test_subjects";
const OBJECTIVE_ID="stop_three_test_subjects";
const STORY_SCENE_ID="origin_academy_menma_prologue";
const STORY_BATTLE_BEAT_ID="tutorial_battle";
const BATTLE_OCCURRENCE_PREFIX="battle_occ_origin_academy_menma_three_test_subjects:";
const SCRIPT_CONTRACT_ID="menma_origin_guest_ally_controller_v3";
const PLAYER_OBJECTIVE_TEXT="Stop the Test Subjects.";
const BATTLE_ENVIRONMENT_PATH="Scene backdrops/forest_clearing_day.png";
const FUTURE_ENVIRONMENT_PATH="Scene backdrops/whisper_woods_forest_route.png";
const FUTURE_ENVIRONMENT_ASSET_ID="whisper_woods_forest_route";
const PARTY_DEFEAT_RETURN_BEAT_ID="menma_party_defeat_return_01";
const FUTURE_ENTRY_BEAT_ID="menma_future_01";
const FUTURE_INTENT_OCCURRENCE_ID="occ_origin_menma_future_ambition_intent";
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

const ANKO_GUEST_SKILLS=Object.freeze({
  sj_anko_hidden_shadow_snake_hands:Object.freeze({
    id:"sj_anko_hidden_shadow_snake_hands",displayName:"Hidden Shadow Snake Hands",ownerRegistryId:ANKO_ID,
    primaryDiscipline:"Ninjutsu",targetMode:"current_enemy",actionClass:"guest_ally_direct",
    resolutionKind:"authored_direct_damage",attackPL:20,
    traits:Object.freeze(["guest_ally","origin_legal","direct_damage"]),requirements:Object.freeze([])
  }),
  sj_anko_snake_bind:Object.freeze({
    id:"sj_anko_snake_bind",displayName:"Snake Bind",ownerRegistryId:ANKO_ID,
    primaryDiscipline:"Ninjutsu",targetMode:"current_enemy",actionClass:"guest_ally_control",
    resolutionKind:"physical_restraint",
    traits:Object.freeze(["guest_ally","origin_legal","control"]),requirements:Object.freeze([])
  }),
  sj_anko_fire_style_dragon_flame:Object.freeze({
    id:"sj_anko_fire_style_dragon_flame",displayName:"Fire Style: Dragon Flame",ownerRegistryId:ANKO_ID,
    primaryDiscipline:"Ninjutsu",targetMode:"current_enemy",actionClass:"guest_ally_direct",
    resolutionKind:"authored_direct_damage",attackPL:24,
    traits:Object.freeze(["guest_ally","origin_legal","direct_damage"]),requirements:Object.freeze([])
  }),
  sj_anko_serpent_evasion:Object.freeze({
    id:"sj_anko_serpent_evasion",displayName:"Serpent Evasion",ownerRegistryId:ANKO_ID,
    primaryDiscipline:"Taijutsu",targetMode:"self",actionClass:"guest_ally_defense",
    resolutionKind:"deterministic_evasion_state",
    traits:Object.freeze(["guest_ally","origin_legal","defense"]),requirements:Object.freeze([])
  })
});
const ANKO_GUEST_SKILL_IDS=Object.freeze(Object.keys(ANKO_GUEST_SKILLS));
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
function bindAuthoredEnemyOpportunityController(value=battle()){
  if(!value||!value.battleId)return false;
  value.authoredEnemyOpportunityControllerId=SCRIPT_CONTRACT_ID;
  value.authoredEnemyOpportunityControllerBattleId=String(value.battleId);
  return true;
}
function makeAnkoParticipant(){
  return {
    id:ANKO_ID,registryId:ANKO_ID,name:"SPECIAL JŌNIN ANKO",displayName:"Special Jōnin Anko",
    rank:"Special Jōnin",formalRank:"special_jonin",power:ANKO_BASE_PL,calibratedBasePL:ANKO_BASE_PL,
    baseStats:{...ANKO_STATS},stats:{...ANKO_STATS},
    uiPortrait:"Portraits/Special Jonin/sj_anko.png",
    encounterLocalAlliedNpc:true,ownershipGranted:false,myClanAssigned:false,playerSelectable:true,participantClass:"guest_ally",controlAuthority:"player",temporaryBattleParticipant:true
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
    version:3,battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,
    scriptContractId:SCRIPT_CONTRACT_ID,storySceneInstanceId:sceneId||null,semanticGeneration:3,
    phase:"player",inputLocked:false,processing:false,
    playerOpportunityOrdinal:1,enemyOpportunityOrdinal:0,
    committedOpportunities:{},rngChoices:{},
    ankoBoundTargetIds:[],ankoSerpentEvasionSpent:false,
    pendingZero:null,pendingAuthoredYieldActionId:null,
    resolvedHostileIds:[],withdrawalOrder:[],
    menmaWithdrawn:false,ankoWithdrawn:false,ankoYielded:false,authoredYieldCancelled:false,
    menmaEvidenceStarted:false,terminalResult:null,lastSemanticEvent:null
  };
}
function normalizeState(raw,sceneId=null){
  const base=createState(sceneId);
  if(!raw||typeof raw!=="object")return base;
  const next={...base,...clone(raw)};
  next.version=3;
  next.battleConfigId=BATTLE_CONFIG_ID;next.encounterId=ENCOUNTER_ID;next.objectiveId=OBJECTIVE_ID;
  next.scriptContractId=SCRIPT_CONTRACT_ID;next.storySceneInstanceId=sceneId||next.storySceneInstanceId||null;
  next.semanticGeneration=3;
  next.phase=["player","enemy","terminal"].includes(next.phase)?next.phase:"player";
  next.playerOpportunityOrdinal=Math.max(1,Number(next.playerOpportunityOrdinal)||1);
  next.enemyOpportunityOrdinal=Math.max(0,Number(next.enemyOpportunityOrdinal)||0);
  next.committedOpportunities=next.committedOpportunities&&typeof next.committedOpportunities==="object"?next.committedOpportunities:{};
  next.rngChoices=next.rngChoices&&typeof next.rngChoices==="object"?next.rngChoices:{};
  next.ankoBoundTargetIds=Array.isArray(next.ankoBoundTargetIds)?[...new Set(next.ankoBoundTargetIds.filter(id=>HOSTILE_IDS.includes(id)))]:[];
  next.resolvedHostileIds=Array.isArray(next.resolvedHostileIds)?[...new Set(next.resolvedHostileIds.filter(id=>HOSTILE_IDS.includes(id)))]:[];
  next.withdrawalOrder=Array.isArray(next.withdrawalOrder)?next.withdrawalOrder.filter(row=>row&&["player","enemy"].includes(row.side)&&row.participantId):[];
  next.processing=false;

  // Migrate old Scene-7 snapshots by preserving only already-committed facts.
  // New executions never replay the superseded automated Anko takedowns.
  if(Number(raw.version||0)<3){
    const oldPhase=String(raw.phase||"");
    const resolved=new Set(next.resolvedHostileIds);
    next.ankoYielded=raw.ankoYielded===true||
      (resolved.has(HOSTILE_IDS[0])&&resolved.has(HOSTILE_IDS[1])&&(oldPhase==="phase_c_player"||oldPhase==="phase_c_enemy"));
    next.menmaEvidenceStarted=next.ankoYielded||raw.menmaEvidenceStarted===true;
    next.authoredYieldCancelled=raw.ankoWithdrawn===true&&!next.ankoYielded;
    next.pendingZero=null;next.pendingAuthoredYieldActionId=null;
    next.phase=oldPhase==="phase_c_enemy"?"enemy":"player";
    next.inputLocked=false;
  }
  if(next.ankoWithdrawn&&next.ankoYielded!==true)next.authoredYieldCancelled=true;
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
  const receipt={opportunityId:id,side,actorId:actorId||null,actionId:actionId||null,kind:kind||"committed_action",semanticGeneration:3};
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
  const b=battle(),st=ensureState();
  if(!st||!b||!b.active||b.battleOver)return{ready:false,reason:"battle_not_active"};
  if(st.pendingZero||st.pendingAuthoredYieldActionId)return{ready:false,reason:"formation_settling"};
  if(st.phase!=="player")return{ready:false,reason:"enemy_side_opportunity"};
  const active=activePlayer();
  if(!active||![ANKO_ID,MENMA_ID].includes(active.id))return{ready:false,reason:"player_active_missing"};
  if(st.inputLocked||st.processing)return{ready:false,reason:"semantic_input_locked"};
  if(opportunityCommitted("player"))return{ready:false,reason:"side_opportunity_already_committed"};
  return{
    ready:true,reason:null,opportunityId:currentOpportunityId("player"),
    activeParticipantId:active.id,controlAuthority:"player",
    participantClass:active.id===ANKO_ID?"guest_ally":"owned"
  };
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
    const st=ensureState();
    const ordered=[];
    if(st&&st.ankoYielded===true){
      if(!st.menmaWithdrawn)ordered.push(MENMA_ID);
      if(!st.ankoWithdrawn)ordered.push(ANKO_ID);
    }else{
      if(!st?.ankoWithdrawn)ordered.push(ANKO_ID);
      if(!st?.menmaWithdrawn)ordered.push(MENMA_ID);
    }
    normalized.player={slots:createBattleDeploymentSlots(ordered)};
    return normalized;
  };
  globalThis.normalizeBattleDeployment=wrapped;try{normalizeBattleDeployment=wrapped;}catch(_error){}
}

// Guest Ally Skill projection uses the ordinary Battle Skill deck. These
// wrappers are exact-encounter only and do not register Anko into My Clan or
// the permanent prepared-Skill authorities.
const PRE_GET_BATTLE_UI_SKILL_PALETTE_36900=typeof getBattleUISkillPalettePresentation==="function"?getBattleUISkillPalettePresentation:null;
if(PRE_GET_BATTLE_UI_SKILL_PALETTE_36900){
  const wrapped=function(actor){
    if(isExactBattle()&&actor&&actor.id===ANKO_ID){
      return{skillIds:[...ANKO_GUEST_SKILL_IDS],source:"story_guest_ally_palette",authoredPackageSize:ANKO_GUEST_SKILL_IDS.length,temporaryBattleParticipant:true};
    }
    return PRE_GET_BATTLE_UI_SKILL_PALETTE_36900.apply(this,arguments);
  };
  globalThis.getBattleUISkillPalettePresentation=wrapped;try{getBattleUISkillPalettePresentation=wrapped;}catch(_error){}
}
const PRE_GET_BATTLE_PREPARED_SKILL_36900=typeof getBattlePreparedSkillDefinition==="function"?getBattlePreparedSkillDefinition:null;
if(PRE_GET_BATTLE_PREPARED_SKILL_36900){
  const wrapped=function(actor,skillId){
    if(isExactBattle()&&actor&&actor.id===ANKO_ID&&ANKO_GUEST_SKILLS[skillId])return ANKO_GUEST_SKILLS[skillId];
    return PRE_GET_BATTLE_PREPARED_SKILL_36900.apply(this,arguments);
  };
  globalThis.getBattlePreparedSkillDefinition=wrapped;try{getBattlePreparedSkillDefinition=wrapped;}catch(_error){}
}
const PRE_EVALUATE_BATTLE_PREPARED_SKILL_36900=typeof evaluateBattlePreparedSkillAvailability==="function"?evaluateBattlePreparedSkillAvailability:null;
if(PRE_EVALUATE_BATTLE_PREPARED_SKILL_36900){
  const wrapped=function(skill,actor,target){
    if(isExactBattle()&&actor&&actor.id===ANKO_ID&&skill&&ANKO_GUEST_SKILLS[skill.id]){
      const readiness=getInputReadiness();
      if(!readiness.ready||readiness.activeParticipantId&&readiness.activeParticipantId!==ANKO_ID)return{available:false,reason:readiness.reason||"actor_not_active"};
      if(skill.targetMode==="current_enemy"&&(!target||target.id!==activeEnemy()?.id))return{available:false,reason:"active_enemy_required"};
      if(skill.id==="sj_anko_snake_bind"){
        const st=ensureState();
        if(st&&Array.isArray(st.ankoBoundTargetIds)&&target&&st.ankoBoundTargetIds.includes(target.id))return{available:false,reason:"target_already_bound_this_battle"};
      }
      if(skill.id==="sj_anko_serpent_evasion"){
        const existing=typeof findBattleTransientState==="function"
          ?findBattleTransientState({stateKey:"sj_anko_serpent_evasion_ready",targetSide:"player",targetParticipantId:ANKO_ID})
          :null;
        if(existing)return{available:false,reason:"serpent_evasion_already_ready"};
      }
      const traits=Array.isArray(skill.traits)?skill.traits:[];
      const blocking=typeof getBattleBlockingConditions==="function"
        ?getBattleBlockingConditions("player",ANKO_ID,skill.actionClass,traits):[];
      if(blocking&&blocking.length)return{available:false,reason:"blocked_by_condition",blockingConditionIds:blocking.map(row=>row.conditionId)};
      return{available:true,reason:null,temporaryGuestAllySkill:true};
    }
    return PRE_EVALUATE_BATTLE_PREPARED_SKILL_36900.apply(this,arguments);
  };
  globalThis.evaluateBattlePreparedSkillAvailability=wrapped;try{evaluateBattlePreparedSkillAvailability=wrapped;}catch(_error){}
}

function resolveAnkoGuestDirectDamage(skillId,target,envelope){
  const contract=ANKO_DIRECT_ACTIONS[skillId];
  if(!contract||!target)return{resolved:false,reason:"anko_direct_contract_missing"};
  const output={
    primaryDiscipline:contract.discipline,
    statKey:typeof getBattlePrimaryDisciplineStatKey==="function"?getBattlePrimaryDisciplineStatKey(contract.discipline):"nin",
    effectivePrimaryDiscipline:ANKO_STATS.nin,
    coefficient:null,branch:"fixed_authored_anko_origin_guest_action",branchMultiplier:1,
    authoredPreExecutionMagnitude:contract.attackPL,weaponExecutionMultiplier:1,
    preDefenseAttackMagnitude:contract.attackPL,attackPL:contract.attackPL,fixedCalibration:true
  };
  const damage=resolveBattleDamagePacket({
    envelope,skill:{id:skillId,mechanicalPacketCount:1},
    actorSide:"player",actorParticipantId:ANKO_ID,targetSide:"enemy",targetParticipantId:target.id,
    output,mitigable:true,excess:null,stateRefs:[]
  });
  return damage?{resolved:true,branch:"anko_origin_guest_direct_damage",damageApplied:true,finalDamage:Number(damage.finalDamage)||0,remainingBattlePLAfter:Number(getBattleRemainingPL("enemy",target.id)),damage}:{resolved:false,reason:"anko_damage_resolution_failed"};
}
function resolveAnkoGuestBind(target,envelope){
  if(!target)return{resolved:false,reason:"anko_bind_target_missing"};
  const st=ensureState();
  if(st&&Array.isArray(st.ankoBoundTargetIds)&&st.ankoBoundTargetIds.includes(target.id))return{resolved:false,reason:"anko_bind_target_already_used"};
  const condition=addBattleCondition({
    conditionKey:"sj_anko_snake_bind",conditionType:"physical_restraint",
    sourceSide:"player",sourceParticipantId:ANKO_ID,targetSide:"enemy",targetParticipantId:target.id,
    sourceSkillId:"sj_anko_snake_bind",ownerRef:{type:"skill",id:"sj_anko_snake_bind"},
    blockedActionTraits:["movement_dependent"],
    data:{semanticClass:"physical_restraint",movementPreventing:true,blanketStun:false,notStun:true,remainingActionOpportunities:1,reapplication:"no_stack",activationActionId:envelope.actionId}
  });
  if(condition&&st&&!st.ankoBoundTargetIds.includes(target.id))st.ankoBoundTargetIds.push(target.id);
  return condition?{resolved:true,branch:"anko_snake_bind",damageApplied:false,conditionRefs:[condition.conditionId],stateRefs:[]}:{resolved:false,reason:"anko_bind_establishment_failed"};
}
function resolveAnkoGuestEvasion(envelope){
  const existing=findBattleTransientState({stateKey:"sj_anko_serpent_evasion_ready",targetSide:"player",targetParticipantId:ANKO_ID});
  if(existing)return{resolved:false,reason:"anko_serpent_evasion_already_ready"};
  const state=addBattleTransientState({
    stateKey:"sj_anko_serpent_evasion_ready",
    sourceSide:"player",sourceParticipantId:ANKO_ID,targetSide:"player",targetParticipantId:ANKO_ID,
    ownerRef:{type:"skill",id:"sj_anko_serpent_evasion"},
    data:{activationActionId:envelope.actionId,oneUse:true,deterministicAvoidance:true,noAccuracyRoll:true}
  });
  return state?{resolved:true,branch:"anko_serpent_evasion",damageApplied:false,stateRefs:[state.stateId],conditionRefs:[]}:{resolved:false,reason:"anko_serpent_evasion_state_failed"};
}


function hasMovementPreventingRestraint36900(side,participantId){
  try{
    const conditions=typeof getBattleParticipantConditions==="function"?getBattleParticipantConditions(side,participantId):[];
    if(conditions.some(row=>row&&(row.conditionType==="physical_restraint"||(row.data&&row.data.movementPreventing===true))))return true;
    const runtime=typeof ensureBattleRuntimeState==="function"?ensureBattleRuntimeState():null;
    const states=runtime&&Array.isArray(runtime.transientStates)?runtime.transientStates:[];
    return states.some(row=>row&&row.targetRef&&row.targetRef.side===side&&row.targetRef.participantId===participantId&&row.data&&row.data.semanticClass==="physical_restraint");
  }catch(_error){return false;}
}

const PRE_DEFENSE_36900=typeof resolveBattlePreStaminaDefense==="function"?resolveBattlePreStaminaDefense:null;
if(PRE_DEFENSE_36900){
  const wrapped=function(definition){
    if(isExactBattle()&&definition&&definition.targetSide==="player"&&definition.targetParticipantId===ANKO_ID&&definition.qualifyingDirectAttackPLPacket!==false){
      const state=typeof findBattleTransientState==="function"
        ?findBattleTransientState({stateKey:"sj_anko_serpent_evasion_ready",targetSide:"player",targetParticipantId:ANKO_ID})
        :null;
      if(state){
        const incoming=Math.max(0,Math.round(Number(definition.attackPL)||0));
        if(typeof removeBattleTransientState==="function")removeBattleTransientState(state.stateId);
        try{
          recordBattleEvidence({
            eventType:"sj_anko_serpent_evasion_consumed",committedOccurrence:false,actionId:definition.actionId||null,
            actorRef:createBattleParticipantRef("player",ANKO_ID),
            sourceRefs:[{type:"skill",id:"sj_anko_serpent_evasion",role:"defensive_source"}],
            stateRefs:[state.stateId],
            data:{incomingAttackPL:incoming,resolvedAttackPL:0,deterministicAvoidance:true,noAccuracyRoll:true}
          });
        }catch(_error){}
        return{
          incomingAttackPL:incoming,resolvedAttackPL:0,
          guardingStep:{participated:false,stateId:null,attemptedReduction:0,actualReduction:0},
          enmaGuard:{participated:false,stateId:null,attemptedReduction:0,actualReduction:0,sourceId:null},
          flatGuards:[],ratioGuards:[],consumedStateIds:[state.stateId],
          serpentEvasion:{participated:true,stateId:state.stateId,deterministicAvoidance:true}
        };
      }
    }
    return PRE_DEFENSE_36900.apply(this,arguments);
  };
  globalThis.resolveBattlePreStaminaDefense=wrapped;try{resolveBattlePreStaminaDefense=wrapped;}catch(_error){}
}
function expireUnusedAnkoEvasion36900(){
  const state=typeof findBattleTransientState==="function"
    ?findBattleTransientState({stateKey:"sj_anko_serpent_evasion_ready",targetSide:"player",targetParticipantId:ANKO_ID})
    :null;
  if(!state)return false;
  if(typeof removeBattleTransientState==="function")removeBattleTransientState(state.stateId);
  try{
    recordBattleEvidence({
      eventType:"sj_anko_serpent_evasion_expired",committedOccurrence:false,
      actorRef:createBattleParticipantRef("player",ANKO_ID),stateRefs:[state.stateId],
      data:{reason:"start_of_next_guest_ally_action_opportunity"}
    });
  }catch(_error){}
  return true;
}

const PRE_ATTEMPT_BATTLE_PREPARED_SKILL_36900=typeof attemptBattlePreparedSkill==="function"?attemptBattlePreparedSkill:null;
if(PRE_ATTEMPT_BATTLE_PREPARED_SKILL_36900){
  const wrapped=function(skillId,targetParticipantId=null,options={}){
    const actor=activePlayer();
    const skill=actor&&actor.id===ANKO_ID?ANKO_GUEST_SKILLS[skillId]:null;
    if(!isExactBattle()||!actor||actor.id!==ANKO_ID||!skill){
      return PRE_ATTEMPT_BATTLE_PREPARED_SKILL_36900.apply(this,arguments);
    }
    const readiness=getInputReadiness();
    if(!readiness.ready||readiness.activeParticipantId!==ANKO_ID)return{success:false,reason:readiness.reason||"guest_ally_not_actionable"};

    const enemy=activeEnemy();
    const target=skill.targetMode==="self"?actor:enemy;
    const availability=evaluateBattlePreparedSkillAvailability(skill,actor,target);
    if(!availability||availability.available!==true)return{success:false,reason:availability&&availability.reason||"guest_ally_skill_unavailable",availability};

    // A prior Serpent Evasion lasts through the immediately following enemy
    // opportunity only. If unused, it expires when Anko begins her next action.
    if(skill.id!=="sj_anko_serpent_evasion")expireUnusedAnkoEvasion36900();

    const targetSide=skill.targetMode==="self"?"player":"enemy";
    const targetId=targetSide==="player"?ANKO_ID:(target&&target.id||targetParticipantId);
    if(!targetId)return{success:false,reason:"guest_ally_target_missing"};

    const envelope=createBattleActionEnvelope({
      actorSide:"player",actorParticipantId:ANKO_ID,targetSide,targetParticipantId:targetId,
      actionClass:skill.actionClass,skillId:skill.id,
      sourceRefs:[
        {type:"character",id:ANKO_ID,role:"guest_ally_actor"},
        {type:"combat_contract",id:"menma_scene7_anko_origin_palette",role:"legal_action_authority"}
      ],
      data:{
        traits:Array.isArray(skill.traits)?[...skill.traits]:[],
        participantClass:"guest_ally",controlAuthority:"player",
        temporaryBattleParticipant:true,ownershipGranted:false,myClanAssigned:false
      }
    });
    const entry=beginBattleActionResolution(envelope);
    if(!entry||entry.accepted!==true)return{success:false,reason:entry&&entry.validation&&entry.validation.reason||"guest_ally_action_rejected",entry};

    let resolution=null;
    if(skill.id==="sj_anko_snake_bind")resolution=resolveAnkoGuestBind(enemy,envelope);
    else if(skill.id==="sj_anko_serpent_evasion")resolution=resolveAnkoGuestEvasion(envelope);
    else resolution=resolveAnkoGuestDirectDamage(skill.id,enemy,envelope);

    const resolved=!!(resolution&&resolution.resolved===true);
    recordBattleEvidence({
      eventType:"skill_action_completed",committedOccurrence:resolved,actionId:envelope.actionId,
      actorRef:envelope.actorRef,targetRef:envelope.targetRef,skillId:skill.id,sourceRefs:envelope.sourceRefs,
      stateRefs:resolution&&Array.isArray(resolution.stateRefs)?resolution.stateRefs:[],
      conditionRefs:resolution&&Array.isArray(resolution.conditionRefs)?resolution.conditionRefs:[],
      data:{
        resolved,branch:resolution&&resolution.branch||null,
        damageApplied:!!(resolution&&resolution.damageApplied),
        finalDamage:Number(resolution&&resolution.finalDamage)||0,
        remainingBattlePLAfter:targetSide==="enemy"&&targetId?Number(getBattleRemainingPL("enemy",targetId)):null,
        guestAllyPlayerChosen:true,men03Eligible:false
      }
    });
    if(!resolved)return{success:false,reason:resolution&&resolution.reason||"guest_ally_resolution_failed",envelope,resolution};

    consumeBattleActionOpportunity("player",ANKO_ID,envelope.actionId,"valid_guest_ally_player_action_completed");
    persistBattleSnapshot();
    try{if(!battle().battleOver)openOverlay("combat");}catch(_error){}
    return{success:true,envelope,resolution,skillId:skill.id,targetId};
  };
  globalThis.attemptBattlePreparedSkill=wrapped;try{attemptBattlePreparedSkill=wrapped;}catch(_error){}
}

function enemyEligibleActions(enemy,target){
  if(!enemy||!target)return[];
  const authored=typeof getEnemyAuthoredBattleActions==="function"?getEnemyAuthoredBattleActions(enemy):[];
  return authored.filter(action=>{
    const eligibility=typeof evaluateEnemyAuthoredActionEligibility==="function"
      ?evaluateEnemyAuthoredActionEligibility(action,enemy,target):{eligible:true};
    if(!eligibility||eligibility.eligible!==true)return false;
    if(action.id==="test_subject_brute_body_rush"&&hasMovementPreventingRestraint36900("enemy",enemy.id))return false;
    return true;
  });
}
function resolveEnemyOpportunity(){
  const st=ensureState();
  if(!st||st.phase!=="enemy"||st.pendingZero)return{success:false,reason:"enemy_opportunity_not_ready"};
  const enemy=activeEnemy(),target=activePlayer();
  if(!enemy)return{success:false,reason:"enemy_active_missing"};
  if(!target)return{success:false,reason:"player_active_missing"};
  const eligible=enemyEligibleActions(enemy,target);
  if(eligible.length===0){
    const skippedId="skip:"+currentOpportunityId("enemy");
    recordBattleEvidence({
      eventType:"menma_origin_enemy_opportunity_skipped",committedOccurrence:true,actionId:skippedId,
      actorRef:createBattleParticipantRef("enemy",enemy.id),targetRef:createBattleParticipantRef("player",target.id),
      data:{reason:"no_semantically_eligible_enemy_action",inventedFallback:false}
    });
    consumeBattleActionOpportunity("enemy",enemy.id,skippedId,"enemy_opportunity_no_legal_action");
    return{success:true,skipped:true,enemyId:enemy.id,targetId:target.id,actionId:skippedId};
  }
  const opId=currentOpportunityId("enemy");
  const selectedId=committedChoice(opId,"enemy_active_authored_action",eligible.map(row=>row.id));
  const action=eligible.find(row=>row.id===selectedId);
  if(!action)return{success:false,reason:"committed_enemy_action_no_longer_eligible",selectedId};
  const envelope=createBattleActionEnvelope({
    actorSide:"enemy",actorParticipantId:enemy.id,targetSide:"player",targetParticipantId:target.id,
    actionClass:action.actionClass||"enemy_authored_action",skillId:action.skillId||action.id,
    sourceRefs:Array.isArray(action.sourceRefs)?action.sourceRefs:[],
    data:{traits:Array.isArray(action.traits)?[...action.traits]:[],authoredEnemyAction:true,activeOnlyEnemyCadence:true}
  });
  const entry=beginBattleActionResolution(envelope);
  if(!entry||entry.accepted!==true)return{success:false,reason:entry&&entry.validation&&entry.validation.reason||"enemy_envelope_rejected",entry};
  const resolution=action.resolve({enemy,target,envelope,currentBattle:battle()});
  const resolved=!!(resolution&&resolution.resolved===true);
  const secondary=resolved&&typeof resolveAlphaEnemyActionSecondaryConsumers==="function"
    ?resolveAlphaEnemyActionSecondaryConsumers(action,enemy,target,envelope,resolution)
    :{appliedIds:[],stateRefs:[],conditionRefs:[]};
  recordBattleEvidence({
    eventType:"enemy_authored_action_completed",committedOccurrence:resolved,actionId:envelope.actionId,
    actorRef:envelope.actorRef,targetRef:envelope.targetRef,skillId:envelope.skillId,sourceRefs:envelope.sourceRefs,
    stateRefs:secondary&&secondary.stateRefs||[],conditionRefs:secondary&&secondary.conditionRefs||[],
    data:{resolved,actionId:action.id,randomnessAppliedAfterEligibility:true,equalSelectionWeight:true,inventedFallback:false,activeOnlyEnemyCadence:true}
  });
  if(!resolved)return{success:false,reason:"enemy_action_resolution_failed",envelope,resolution};
  consumeBattleActionOpportunity("enemy",enemy.id,envelope.actionId,"valid_enemy_action_completed");
  return{success:true,envelope,resolution,enemyId:enemy.id,targetId:target.id,actionId:action.id};
}

function startMenmaEvidenceWindow36900(reason){
  const st=ensureState(),active=activePlayer();
  if(!st||st.menmaEvidenceStarted||!active||active.id!==MENMA_ID)return false;
  st.menmaEvidenceStarted=true;
  recordBattleEvidence({
    eventType:"menma_origin_phase_c_started",committedOccurrence:true,
    actorRef:createBattleParticipantRef("player",MENMA_ID),targetRef:activeEnemy()?createBattleParticipantRef("enemy",activeEnemy().id):null,
    data:{men03Scope:"menma_active_only",entryReason:reason||"active_promotion",ankoActionsExcluded:true,firstLegitimateMenmaActiveMoment:true}
  });
  return true;
}

const PRE_ZERO=typeof handleBattleParticipantAtZeroPL==="function"?handleBattleParticipantAtZeroPL:null;
if(PRE_ZERO){
  const wrapped=function(side,participantId,actor,envelope){
    if(!isExactBattle())return PRE_ZERO.apply(this,arguments);
    const st=ensureState(),actionId=envelope&&envelope.actionId||null;
    if(!st||!actionId)return PRE_ZERO.apply(this,arguments);
    const relevant=(side==="enemy"&&HOSTILE_IDS.includes(participantId))||(side==="player"&&ALLIED_IDS.includes(participantId));
    if(!relevant)return PRE_ZERO.apply(this,arguments);

    if(!st.pendingZero){
      st.pendingZero={
        side,participantId,actionId,actorId:actor&&actor.id||envelope&&envelope.actorRef&&envelope.actorRef.participantId||null,
        causedBySide:envelope&&envelope.actorRef&&envelope.actorRef.side||null,
        phase:st.phase
      };
      st.inputLocked=true;
      if(side==="enemy"&&!st.resolvedHostileIds.includes(participantId))st.resolvedHostileIds.push(participantId);
      if(side==="player"){
        if(participantId===MENMA_ID)st.menmaWithdrawn=true;
        if(participantId===ANKO_ID){st.ankoWithdrawn=true;st.authoredYieldCancelled=true;}
      }
      if(!st.withdrawalOrder.some(row=>row&&row.side===side&&row.participantId===participantId)){
        st.withdrawalOrder.push({side,participantId,actionId,causedBySide:st.pendingZero.causedBySide});
      }
      persistBattleSnapshot();
    }
    return{type:"presentation_pending_withdrawal",side,participantId,actionId,presentationMustSettleFirst:true};
  };
  globalThis.handleBattleParticipantAtZeroPL=wrapped;try{handleBattleParticipantAtZeroPL=wrapped;}catch(_error){}
}

function shouldAuthorMenmaHandoff36900(){
  const st=ensureState(),enemy=activeEnemy(),ally=activePlayer();
  if(!st||st.authoredYieldCancelled||st.ankoYielded)return false;
  if(st.ankoWithdrawn||st.menmaWithdrawn)return false;
  if(!ally||ally.id!==ANKO_ID||!enemy||enemy.id!==HOSTILE_IDS[2])return false;
  if(!st.resolvedHostileIds.includes(HOSTILE_IDS[0])||!st.resolvedHostileIds.includes(HOSTILE_IDS[1]))return false;
  return Number(getBattleRemainingPL("player",ANKO_ID))>0&&Number(getBattleRemainingPL("player",MENMA_ID))>0;
}
function yieldAnkoToMenmaActive36900(){
  const b=battle(),st=ensureState();if(!b||!st||!shouldAuthorMenmaHandoff36900())return false;
  const deployment=b.deployment;
  b.deployment.player={slots:createBattleDeploymentSlots([MENMA_ID,ANKO_ID])};
  if(typeof clearBattleActionSelectionForActorChange==="function")clearBattleActionSelectionForActorChange();
  if(typeof syncBattleActivePlayerFromDeployment==="function")syncBattleActivePlayerFromDeployment();
  else b.activePlayer=getBattleParticipantByIdentity("player",MENMA_ID);
  b.characterId=MENMA_ID;
  st.ankoYielded=true;st.phase="enemy";st.inputLocked=true;
  deployment.transitionCounter=(Number(deployment.transitionCounter)||0)+1;
  deployment.lastTransition={
    id:"menma_guest_yield_"+String(deployment.transitionCounter),type:"authored_active_yield",side:"player",
    reason:"menma_origin_guest_ally_teaching_handoff",withdrawnParticipantId:null,vacatedSlot:1,replacementParticipantId:MENMA_ID,
    movements:[
      {participantId:ANKO_ID,fromSlot:1,toSlot:2,movementType:"authored_yield_to_bench"},
      {participantId:MENMA_ID,fromSlot:2,toSlot:1,movementType:"authored_bench_promotion"}
    ],
    sideOrderReset:false,nextSide:"enemy",createdAt:Date.now()
  };
  recordBattleEvidence({
    eventType:"battle_formation_yield_committed",committedOccurrence:true,
    actorRef:createBattleParticipantRef("player",ANKO_ID),targetRef:createBattleParticipantRef("player",MENMA_ID),
    data:{yieldFrom:ANKO_ID,promoteTo:MENMA_ID,ankoRemainsDeployed:true,actionOpportunityConsumed:false,sideOrderReset:false,nextSide:"enemy"}
  });
  startMenmaEvidenceWindow36900("authored_guest_ally_yield");
  persistBattleSnapshot();
  return true;
}

function completeOccurrenceReceipt(result){
  const b=battle(),p=player(),id=battleOccurrenceId(b);
  if(!b||!p||!id)return null;
  if(!Array.isArray(p.activityHistory))p.activityHistory=[];
  const existing=p.activityHistory.find(row=>row&&String(row.battleOccurrenceId||row.occurrenceId||"")===id&&row.type!=="origin_battle_reward");
  if(existing)return existing;
  const st=ensureState(),victory=result==="victory";
  updateResolvedHostiles();
  const resolved=victory?[...HOSTILE_IDS]:[...(st&&st.resolvedHostileIds||[])];
  const unresolved=HOSTILE_IDS.filter(id=>!resolved.includes(id));
  const record={
    historyScope:typeof getCurrentChronicleOccurrenceHistoryScope==="function"?getCurrentChronicleOccurrenceHistoryScope("origin_battle_occurrence"):null,
    type:"origin_battle_occurrence",activity:"battle",completed:true,committed:true,success:victory,
    outcome:victory?"victory":"defeat",sourceOccurrenceId:id,occurrenceId:id,battleOccurrenceId:id,
    actorVariantId:MENMA_ID,sceneId:STORY_SCENE_ID,storySceneInstanceId:sceneInstanceId(b),
    battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,
    battleResult:victory?"victory":"defeat",terminalBattleResult:victory?"victory":"defeat",objectiveCompleted:victory,
    menmaWithdrawn:!!(st&&st.menmaWithdrawn),ankoWithdrawn:!!(st&&st.ankoWithdrawn),
    alliedParticipantIds:[...ALLIED_IDS],hostileParticipantIds:[...HOSTILE_IDS],
    resolvedHostileIds:resolved,unresolvedHostileIds:unresolved,
    withdrawalOrder:clone(st&&st.withdrawalOrder||[]),
    fact:{
      battlePLWithdrawalNotDeath:true,noInferredInjury:true,noInferredCustody:true,
      guestAllyControl:true,ownershipGranted:false,myClanMutated:false,
      menmaOnlyTutorialAttribution:true,menmaEvidenceStarted:!!(st&&st.menmaEvidenceStarted)
    },
    data:{
      battlePLWithdrawalNotDeath:true,noInferredInjury:true,noInferredCustody:true,
      guestAllyControl:true,ownershipGranted:false,myClanMutated:false,
      menmaOnlyTutorialAttribution:true,menmaEvidenceStarted:!!(st&&st.menmaEvidenceStarted)
    },
    timestamp:Date.now()
  };
  p.activityHistory.push(record);
  try{if(typeof activityHistory!=="undefined"&&Array.isArray(activityHistory)&&activityHistory!==p.activityHistory)activityHistory.push(record);}catch(_error){}
  return record;
}

const PRE_COMPLETE_VICTORY=typeof completeBattleVictoryFromDamage==="function"?completeBattleVictoryFromDamage:null;
function completeMenmaSuccessorVictory(actionId=null,finishingActorId=null){
  const st=ensureState();if(!st||battle().battleOver)return battle().outcome||battle().rewards;
  if(!HOSTILE_IDS.every(id=>Number(getBattleRemainingPL("enemy",id))<=0))return{success:false,reason:"three_subject_objective_incomplete"};
  st.terminalResult="victory";st.phase="terminal";st.inputLocked=true;
  completeOccurrenceReceipt("victory");
  const finisher=finishingActorId?getBattleParticipantByIdentity("player",finishingActorId):activePlayer();
  const result=PRE_COMPLETE_VICTORY?PRE_COMPLETE_VICTORY.call(globalThis,finisher||activePlayer(),null,HOSTILE_IDS[2]):null;
  if(battle().outcome){
    Object.assign(battle().outcome,{
      battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,objectiveCompleted:true,
      menmaWithdrawn:st.menmaWithdrawn===true,ankoWithdrawn:st.ankoWithdrawn===true,
      resolvedHostileIds:[...HOSTILE_IDS],battleOccurrenceId:battleOccurrenceId(),
      tutorialResult:"completed",men03Scope:"menma_active_only",menmaEvidenceStarted:st.menmaEvidenceStarted===true
    });
  }
  try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
  persistBattleSnapshot();
  return result;
}
const PRE_COMPLETE_DEFEAT=typeof completeBattleDefeat==="function"?completeBattleDefeat:null;
function completeMenmaSuccessorDefeat(actionId=null,defeatedParticipantId=null){
  const b=battle(),st=ensureState();
  if(!b||!st)return b&&b.outcome||null;
  if(b.battleOver===true&&(!b.outcome||b.outcome.type!=="defeat"))return b.outcome;

  st.terminalResult="defeat";st.phase="terminal";st.inputLocked=true;
  completeOccurrenceReceipt("defeat");

  // Generic defeat owns the reusable Battle lifecycle, but its Story caller
  // must not resume until this encounter has appended its authoritative facts.
  // Temporarily withhold only the caller envelope, let generic defeat commit,
  // restore the same envelope, enrich outcome truth, persist, then resume once.
  const genericDefeatAlreadyCommitted=b.battleOver===true&&b.outcome&&b.outcome.type==="defeat";
  const callerReturnContext=!genericDefeatAlreadyCommitted?b.returnContext||null:null;
  let result=b.outcome;
  if(!genericDefeatAlreadyCommitted&&PRE_COMPLETE_DEFEAT){
    b.returnContext=null;
    try{
      result=PRE_COMPLETE_DEFEAT.call(globalThis,defeatedParticipantId||null,null,"menma_scene7_allied_side_exhausted");
    }finally{
      b.returnContext=callerReturnContext;
    }
  }

  if(b.outcome&&b.outcome.type==="defeat"){
    Object.assign(b.outcome,{
      battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,objectiveCompleted:false,
      menmaWithdrawn:st.menmaWithdrawn===true,ankoWithdrawn:st.ankoWithdrawn===true,
      resolvedHostileIds:[...(st.resolvedHostileIds||[])],
      unresolvedHostileIds:HOSTILE_IDS.filter(id=>!(st.resolvedHostileIds||[]).includes(id)),
      battleOccurrenceId:battleOccurrenceId(),tutorialResult:"not_completed",performanceBucket:null,
      men03Scope:"menma_active_only",partyDefeat:true,battlePLWithdrawalNotDeath:true,noInferredInjury:true
    });
    b.defeat=clone(b.outcome);
  }
  persistBattleSnapshot();

  if(!genericDefeatAlreadyCommitted&&callerReturnContext&&typeof resumeBattleCallerAfterCompletion==="function"){
    resumeBattleCallerAfterCompletion("defeat");
  }
  return b.outcome||result;
}

function advanceAfterEnemyOpportunity36900(){
  const st=ensureState();if(!st||battle().battleOver)return;
  st.phase="player";st.playerOpportunityOrdinal+=1;st.inputLocked=false;
}
function settleEnemyOpportunity36900(){
  const st=ensureState();
  if(!st||st.processing||battle().battleOver||st.pendingZero||st.phase!=="enemy")return{success:false,reason:"enemy_settle_unavailable"};
  st.processing=true;
  let result=null;
  try{
    result=resolveEnemyOpportunity();
    const enemyId=result&&result.enemyId||activeEnemy()&&activeEnemy().id||null;
    const actionId=result&&result.envelope&&result.envelope.actionId||result&&result.actionId||null;
    if(!opportunityCommitted("enemy"))markOpportunityCommitted("enemy",enemyId,actionId||("failed:"+currentOpportunityId("enemy")),result&&result.success===true?"enemy_active_action":"enemy_action_failed");
    if(!result||result.success!==true){
      recordBattleEvidence({
        eventType:"menma_origin_enemy_opportunity_failed_visible",committedOccurrence:true,
        actionId:actionId||("failed:"+currentOpportunityId("enemy")),
        actorRef:enemyId?createBattleParticipantRef("enemy",enemyId):null,
        data:{reason:result&&result.reason||"enemy_resolution_failed",inventedFallback:false}
      });
    }
    if(!st.pendingZero&&!battle().battleOver)advanceAfterEnemyOpportunity36900();
  }finally{st.processing=false;}
  persistBattleSnapshot();
  return result||{success:false,reason:"enemy_resolution_missing"};
}

// Called by 33000 only after the exact committed action has visibly settled.
function advanceAfterPresentation(receipt){
  const st=ensureState();if(!st||!receipt||!receipt.actionId)return{success:false,reason:"presentation_receipt_missing"};
  const pending=st.pendingZero;
  if(!pending||String(pending.actionId||"")!==String(receipt.actionId||""))return{success:false,reason:"no_matching_pending_zero"};
  st.pendingZero=null;

  const transition=typeof advanceBattleParticipantAtZeroPL==="function"
    ?advanceBattleParticipantAtZeroPL(pending.side,pending.participantId):null;

  if(pending.side==="enemy"){
    updateResolvedHostiles();
    const next=activeEnemy();
    recordBattleEvidence({
      eventType:"battle_formation_relay_committed",committedOccurrence:true,actionId:pending.actionId,
      actorRef:createBattleParticipantRef("enemy",pending.participantId),
      targetRef:next?createBattleParticipantRef("enemy",next.id):null,
      data:{relayFrom:pending.participantId,relayTo:next&&next.id||null,outgoingActiveExited:true,nextEligibleActive:next&&next.id||null,sideOrderReset:false}
    });
    if(!next){
      return{success:true,terminal:"victory",transition,result:completeMenmaSuccessorVictory(pending.actionId,pending.actorId)};
    }

    // The player-side action that caused this withdrawal has been consumed.
    // Enemy remains next even when the authored Anko -> Menma handoff occurs.
    st.phase="enemy";st.enemyOpportunityOrdinal+=1;st.inputLocked=true;
    yieldAnkoToMenmaActive36900();
    persistBattleSnapshot();
    const enemyResult=settleEnemyOpportunity36900();
    return{success:true,relay:transition,enemyResult,activePlayerId:activePlayer()&&activePlayer().id||null,activeEnemyId:next.id};
  }

  if(pending.side==="player"){
    const next=activePlayer();
    recordBattleEvidence({
      eventType:"battle_formation_relay_committed",committedOccurrence:true,actionId:pending.actionId,
      actorRef:createBattleParticipantRef("player",pending.participantId),
      targetRef:next?createBattleParticipantRef("player",next.id):null,
      data:{relayFrom:pending.participantId,relayTo:next&&next.id||null,outgoingActiveExited:true,nextEligibleActive:next&&next.id||null,sideOrderReset:false}
    });
    if(!next){
      return{success:true,terminal:"defeat",transition,result:completeMenmaSuccessorDefeat(pending.actionId,pending.participantId)};
    }
    if(pending.participantId===ANKO_ID)st.authoredYieldCancelled=true;
    if(next.id===MENMA_ID)startMenmaEvidenceWindow36900("normal_relay_after_anko_withdrawal");

    const nextSide=pending.causedBySide==="enemy"?"player":"enemy";
    if(nextSide==="player"){
      st.phase="player";st.playerOpportunityOrdinal+=1;st.inputLocked=false;
      persistBattleSnapshot();
      return{success:true,relay:transition,nextSide:"player",activePlayerId:next.id};
    }
    st.phase="enemy";st.enemyOpportunityOrdinal+=1;st.inputLocked=true;
    persistBattleSnapshot();
    const enemyResult=settleEnemyOpportunity36900();
    return{success:true,relay:transition,nextSide:"enemy",enemyResult,activePlayerId:next.id};
  }
  return{success:false,reason:"pending_zero_shape_unhandled"};
}
globalThis.advanceMenmaScriptedBattleAfterPresentation37300=advanceAfterPresentation;

// Current-Active side alternation. Player actions may be Menma or Guest Ally
// Anko; control follows slot 1 and never implies ownership.
const PRE_CONSUME_OPPORTUNITY=typeof consumeBattleActionOpportunity==="function"?consumeBattleActionOpportunity:null;
if(PRE_CONSUME_OPPORTUNITY){
  const wrapped=function(side,participantId,actionId,reason){
    const result=PRE_CONSUME_OPPORTUNITY.apply(this,arguments);
    if(!isExactBattle())return result;
    const st=ensureState();if(!st||battle().battleOver)return result;

    // Nested enemy resolution is owned by settleEnemyOpportunity36900.
    if(st.processing)return result;

    if(side==="player"&&st.phase==="player"){
      const active=activePlayer();
      if(!active||active.id!==participantId)return result;
      if(!opportunityCommitted("player"))markOpportunityCommitted("player",participantId,actionId,participantId===ANKO_ID?"guest_ally_player_action":"menma_player_action");
      if(participantId===MENMA_ID)startMenmaEvidenceWindow36900("menma_player_action");
      st.inputLocked=true;

      // A zero-PL target waits for this exact action's presentation. Relay then
      // releases the next side without consuming a bonus opportunity.
      if(st.pendingZero){persistBattleSnapshot();return result;}

      st.phase="enemy";st.enemyOpportunityOrdinal+=1;
      persistBattleSnapshot();
      settleEnemyOpportunity36900();
      return result;
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
    let savedState=null,savedBattleActive=false,savedExactSuccessorSnapshot=false;
    if(typeof sessionStorage!=="undefined"){
      try{
        const raw=sessionStorage.getItem("shinobiTestState"),parsed=raw?JSON.parse(raw):null;
        if(parsed&&String(parsed.encounterId||"")===ENCOUNTER_ID&&String(parsed.battleConfigId||"")===BATTLE_CONFIG_ID){
          savedState=parsed.menmaEvolvedPLBattle36900||null;
          savedBattleActive=parsed.menma369BattleActive===true;
          savedExactSuccessorSnapshot=true;

          // #373 real-player restore repair.
          //
          // game.js intentionally does not know the scoped BattleConfig identity,
          // so its base save/restore contract persists encounterId/deployment but
          // not currentBattle.battleConfigId. The superseded #369 runtime DID
          // persist battleConfigId in the session extension. Without restoring
          // that scoped identity BEFORE the base restore, every exact-successor
          // hook is false while normalizeBattleDeployment() runs; a legacy
          // Menma-first [Menma, Anko] deployment is therefore restored verbatim.
          //
          // Seed only the exact saved Menma Scene-7 occurrence before delegating
          // to the generic restore. This lets the already-installed scoped
          // participant/deployment wrappers resolve encounter-local Anko and
          // migrate the player Active slot from the saved semantic phase. It
          // does not change generic Battle restore law.
          const b=battle();
          if(b){
            b.encounterId=ENCOUNTER_ID;
            b.battleConfigId=BATTLE_CONFIG_ID;
            b.objectiveId=OBJECTIVE_ID;
            b.playerFacingObjective=PLAYER_OBJECTIVE_TEXT;
            b.environmentPath=BATTLE_ENVIRONMENT_PATH;
            b.presentationEnvironmentPath=BATTLE_ENVIRONMENT_PATH;
            b.menma369LocalAllies={[ANKO_ID]:makeAnkoParticipant()};
            b.menmaEvolvedPLBattle36900=normalizeState(savedState,null);
          }
        }
      }catch(_error){}
    }

    const result=PRE_RESTORE_TEST.apply(this,arguments);

    if(savedExactSuccessorSnapshot){
      const b=battle();
      if(b){
        // Reassert scoped fields the generic restore deliberately does not own.
        b.encounterId=ENCOUNTER_ID;
        b.battleConfigId=BATTLE_CONFIG_ID;
        b.objectiveId=OBJECTIVE_ID;
        b.playerFacingObjective=PLAYER_OBJECTIVE_TEXT;
        b.environmentPath=BATTLE_ENVIRONMENT_PATH;
        b.presentationEnvironmentPath=BATTLE_ENVIRONMENT_PATH;
        bindAuthoredEnemyOpportunityController(b);
      }
    }

    if(isExactBattle()){
      const b=battle();
      bindAuthoredEnemyOpportunityController(b);
      b.menma369LocalAllies={[ANKO_ID]:makeAnkoParticipant()};
      b.menmaEvolvedPLBattle36900=normalizeState(savedState||b.menmaEvolvedPLBattle36900,sceneInstanceId(b));
      if(savedBattleActive&&b.battleOver!==true)b.active=true;

      // Fail closed against the superseded Menma-first restore shape even if a
      // caller supplied a deployment snapshot that bypassed the wrapped
      // normalizeBattleDeployment() path. The current semantic phase is the
      // authority for which ally owns Active; characterId remains Menma as the
      // Story/ownership identity and is not used as Active truth.
      const semantic=b.menmaEvolvedPLBattle36900;
      const ordered=[];
      if(semantic&&semantic.ankoYielded===true){
        if(!semantic.menmaWithdrawn)ordered.push(MENMA_ID);
        if(!semantic.ankoWithdrawn)ordered.push(ANKO_ID);
      }else{
        if(!semantic?.ankoWithdrawn)ordered.push(ANKO_ID);
        if(!semantic?.menmaWithdrawn)ordered.push(MENMA_ID);
      }
      if(!b.deployment||typeof b.deployment!=="object")b.deployment={};
      b.deployment.player={slots:createBattleDeploymentSlots(ordered)};

      if(!getBattleRemainingPLRecord("player",ANKO_ID))setBattleRemainingPLRecord("player",ANKO_ID,ANKO_BASE_PL,ANKO_BASE_PL);
      if(typeof syncBattleActivePlayerFromDeployment==="function")syncBattleActivePlayerFromDeployment();
      if(typeof syncBattleActiveEnemyFromDeployment==="function")syncBattleActiveEnemyFromDeployment();
      if(savedBattleActive&&b.battleOver!==true){
        try{openOverlay("combat");}catch(_error){}
      }
      queueMicrotask(()=>{
        const st=ensureState();if(!st||battle().battleOver)return;
        if(st.pendingZero){
          let pendingPresentation=false;
          try{pendingPresentation=typeof pendingBattlePresentation33000==="function"&&pendingBattlePresentation33000();}catch(_error){}
          if(!pendingPresentation)advanceAfterPresentation({actionId:st.pendingZero.actionId});
          return;
        }
        if(activePlayer()&&activePlayer().id===MENMA_ID)startMenmaEvidenceWindow36900("restored_active");
        st.inputLocked=st.phase!=="player";
        if(st.phase==="enemy")settleEnemyOpportunity36900();
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
  bindAuthoredEnemyOpportunityController(b);
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
  bindAuthoredEnemyOpportunityController(b);
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
      participantControlModel:"guest_ally_current_active",startingPlayerActive:ANKO_ID,startingPlayerBenched:[MENMA_ID],
      guestAllyPlayerControlled:true,ownershipGranted:false,
      plIdentity:"Battle PL",healthReplacement:false,myClanStartBypassedForExactOriginOccurrence:true,myClanMutated:false
    }
  });
  persistBattleSnapshot();
  try{openOverlay("combat");}catch(_error){}
  return{
    success:true,battleId:b.battleId,encounterId:ENCOUNTER_ID,battleConfigId:BATTLE_CONFIG_ID,objectiveId:OBJECTIVE_ID,
    battleOccurrenceId:battleOccurrenceId(b),activeParticipantId:ANKO_ID,participantClass:"guest_ally",controlAuthority:"player"
  };
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
function commitMenmaFutureAmbitionIntent38800(intent){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;
  if(!A||typeof A.commitOccurrence!=="function")return{success:false,reason:"menma_future_intent_history_authority_missing"};
  return A.commitOccurrence(
    MENMA_ID,
    FUTURE_INTENT_OCCURRENCE_ID,
    {futureAmbitionIntent:String(intent||""),storyIntent:true,progressionGranted:false},
    [],
    {
      type:"origin_story_intent",
      outcome:"future_ambition_intent_selected",
      sourceRefs:[{type:"story_scene",id:STORY_SCENE_ID,role:"future_ambition_choice"}]
    }
  );
}
function menmaFutureIntentChoice38800(choiceId,label,nextBeatId,intent){
  return{
    choiceId,label,nextBeatId,
    contextPatch:{menmaFutureAmbitionIntent:intent},
    consequenceRequests:[{
      requestId:`menma_future_ambition_intent_${intent}_38800`,
      kind:"domain",
      resolve:()=>commitMenmaFutureAmbitionIntent38800(intent)
    }]
  };
}
function menmaDefeatAndFutureStoryBeats38800(){
  const clearing={mode:"authored_asset",assetId:"konoha_forest_clearing_day"};
  const future={mode:"authored_asset",assetId:FUTURE_ENVIRONMENT_ASSET_ID};
  const anko={sourceId:"anko",sourceType:"story_character",physicalPresence:true};
  const menma={sourceId:MENMA_ID,sourceType:"character",physicalPresence:true};
  const menmaInternal={sourceId:MENMA_ID,sourceType:"character",physicalPresence:false};
  const nineTails={sourceId:"nine_tails",sourceType:"communication_source",physicalPresence:false};
  return[
    {beatId:"menma_party_defeat_return_01",mode:"narration",text:"The fight breaks apart before Menma can pull it back together.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_02"},
    {beatId:"menma_party_defeat_return_02",mode:"narration",text:"By the time the clearing settles, Menma and Anko are both at its edge.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_03"},
    {beatId:"menma_party_defeat_return_03",mode:"narration",text:"The test subjects still able to move use the opening.\n\nThey disappear between the trees.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_04"},
    {beatId:"menma_party_defeat_return_04",mode:"dialogue",speakerRef:anko,speakerName:"ANKO",text:"They're gone.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_05"},
    {beatId:"menma_party_defeat_return_05",mode:"dialogue",speakerRef:menma,speakerName:"MENMA",text:"I know.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_06"},
    {beatId:"menma_party_defeat_return_06",mode:"dialogue",speakerRef:anko,speakerName:"ANKO",text:"You wanted a real test.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_07"},
    {beatId:"menma_party_defeat_return_07",mode:"dialogue",speakerRef:menma,speakerName:"MENMA",text:"I got one.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_08"},
    {beatId:"menma_party_defeat_return_08",mode:"dialogue",speakerRef:anko,speakerName:"ANKO",text:"And?",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_09"},
    {beatId:"menma_party_defeat_return_09",mode:"narration",text:"Menma looks at the gap in the trees where the last of them disappeared.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_10"},
    {beatId:"menma_party_defeat_return_10",mode:"dialogue",speakerRef:menma,speakerName:"MENMA",text:"I need more.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_11"},
    {beatId:"menma_party_defeat_return_11",mode:"narration",text:"Anko laughs once.\n\nNot because it is funny.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_12"},
    {beatId:"menma_party_defeat_return_12",mode:"dialogue",speakerRef:anko,speakerName:"ANKO",text:"Yeah.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_13"},
    {beatId:"menma_party_defeat_return_13",mode:"dialogue",speakerRef:anko,speakerName:"ANKO",text:"That sounds familiar.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_14"},
    {beatId:"menma_party_defeat_return_14",mode:"dialogue",speakerRef:menma,speakerName:"MENMA",text:"You're going after them?",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_15"},
    {beatId:"menma_party_defeat_return_15",mode:"dialogue",speakerRef:anko,speakerName:"ANKO",text:"I'm reporting where they went.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_16"},
    {beatId:"menma_party_defeat_return_16",mode:"dialogue",speakerRef:menma,speakerName:"MENMA",text:"I can help.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_17"},
    {beatId:"menma_party_defeat_return_17",mode:"dialogue",speakerRef:anko,speakerName:"ANKO",text:"No.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_18"},
    {beatId:"menma_party_defeat_return_18",mode:"narration",text:"Menma gives her a look.\n\nAnko sees it immediately.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_19"},
    {beatId:"menma_party_defeat_return_19",mode:"dialogue",speakerRef:anko,speakerName:"ANKO",text:"That wasn't a challenge.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_20"},
    {beatId:"menma_party_defeat_return_20",mode:"dialogue",speakerRef:menma,speakerName:"MENMA",text:"Didn't say it was.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_21"},
    {beatId:"menma_party_defeat_return_21",mode:"dialogue",speakerRef:anko,speakerName:"ANKO",text:"Go home, Menma.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_22"},
    {beatId:"menma_party_defeat_return_22",mode:"dialogue",speakerRef:menma,speakerName:"MENMA",text:"Not the Academy.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_23"},
    {beatId:"menma_party_defeat_return_23",mode:"dialogue",speakerRef:anko,speakerName:"ANKO",text:"Didn't say Academy.",environmentRef:clearing,nextBeatId:"menma_party_defeat_return_24"},
    {beatId:"menma_party_defeat_return_24",mode:"narration",text:"Anko heads back toward the village.\n\nMenma waits until she is gone, then takes the forest route the other way.",environmentRef:clearing,nextBeatId:FUTURE_ENTRY_BEAT_ID},

    {beatId:"menma_future_01",mode:"narration",text:"Menma is running again.",environmentRef:future,nextBeatId:"menma_future_02"},
    {beatId:"menma_future_02",mode:"narration",text:"Through the trees, Konoha comes back into view. The Academy is somewhere beyond the rooftops.",environmentRef:future,nextBeatId:"menma_future_03"},
    {beatId:"menma_future_03",mode:"internal_voice",speakerRef:nineTails,speakerName:"NINE-TAILS",text:"Satisfied?",environmentRef:future,nextBeatId:"menma_future_04"},
    {beatId:"menma_future_04",mode:"internal_voice",speakerRef:menmaInternal,speakerName:"MENMA",text:"No.",environmentRef:future,nextBeatId:"menma_future_05"},
    {beatId:"menma_future_05",mode:"internal_voice",speakerRef:nineTails,speakerName:"NINE-TAILS",text:"Good.",environmentRef:future,nextBeatId:"menma_future_choice"},
    {beatId:"menma_future_choice",mode:"choice",text:"",environmentRef:future,choices:[
      menmaFutureIntentChoice38800("master_what_they_wont_teach_me","MASTER WHAT THEY WON'T TEACH ME","menma_future_master_01","master_what_they_wont_teach_me"),
      menmaFutureIntentChoice38800("become_too_strong_to_hold_back","BECOME TOO STRONG TO HOLD BACK","menma_future_strength_01","become_too_strong_to_hold_back"),
      menmaFutureIntentChoice38800("create_something_thats_mine","CREATE SOMETHING THAT'S MINE","menma_future_create_01","create_something_thats_mine"),
      menmaFutureIntentChoice38800("find_out_how_far_i_can_go","FIND OUT HOW FAR I CAN GO","menma_future_limit_01","find_out_how_far_i_can_go")
    ]},

    {beatId:"menma_future_master_01",mode:"internal_voice",speakerRef:menmaInternal,speakerName:"MENMA",text:"If they won't teach me yet, I'll find out what I'm missing.",environmentRef:future,nextBeatId:"menma_future_master_02"},
    {beatId:"menma_future_master_02",mode:"internal_voice",speakerRef:nineTails,speakerName:"NINE-TAILS",text:"Hungry.",environmentRef:future,nextBeatId:"menma_future_master_03"},
    {beatId:"menma_future_master_03",mode:"internal_voice",speakerRef:menmaInternal,speakerName:"MENMA",text:"Ambitious.",environmentRef:future,nextBeatId:"menma_future_terminal"},

    {beatId:"menma_future_strength_01",mode:"internal_voice",speakerRef:menmaInternal,speakerName:"MENMA",text:"I'll get strong enough that nobody gets to decide I'm not ready.",environmentRef:future,nextBeatId:"menma_future_strength_02"},
    {beatId:"menma_future_strength_02",mode:"internal_voice",speakerRef:nineTails,speakerName:"NINE-TAILS",text:"That sounds familiar.",environmentRef:future,nextBeatId:"menma_future_strength_03"},
    {beatId:"menma_future_strength_03",mode:"internal_voice",speakerRef:menmaInternal,speakerName:"MENMA",text:"Good.",environmentRef:future,nextBeatId:"menma_future_terminal"},

    {beatId:"menma_future_create_01",mode:"internal_voice",speakerRef:menmaInternal,speakerName:"MENMA",text:"Maybe I don't need what they're keeping from me.",environmentRef:future,nextBeatId:"menma_future_create_02"},
    {beatId:"menma_future_create_02",mode:"internal_voice",speakerRef:menmaInternal,speakerName:"MENMA",text:"Maybe I'll make something better.",environmentRef:future,nextBeatId:"menma_future_create_03"},
    {beatId:"menma_future_create_03",mode:"internal_voice",speakerRef:nineTails,speakerName:"NINE-TAILS",text:"Now that's more interesting.",environmentRef:future,nextBeatId:"menma_future_terminal"},

    {beatId:"menma_future_limit_01",mode:"internal_voice",speakerRef:menmaInternal,speakerName:"MENMA",text:"I want to know where the limit actually is.",environmentRef:future,nextBeatId:"menma_future_limit_02"},
    {beatId:"menma_future_limit_02",mode:"internal_voice",speakerRef:nineTails,speakerName:"NINE-TAILS",text:"And when you find it?",environmentRef:future,nextBeatId:"menma_future_limit_03"},
    {beatId:"menma_future_limit_03",mode:"internal_voice",speakerRef:menmaInternal,speakerName:"MENMA",text:"I'll decide then.",environmentRef:future,nextBeatId:"menma_future_terminal"},

    {beatId:"menma_future_terminal",mode:"narration",text:"Menma runs toward Konoha.",environmentRef:future,exitScene:true}
  ];
}
function upsertMenmaStoryBeat38800(scene,row){
  if(!scene||!row||!row.beatId||typeof normalizeStorySceneBeat!=="function")return false;
  const index=Array.isArray(scene.beats)?scene.beats.findIndex(item=>item&&item.beatId===row.beatId):-1;
  const normalized=normalizeStorySceneBeat(row,index>=0?index:(Array.isArray(scene.beats)?scene.beats.length:0));
  if(!normalized)return false;
  if(index>=0)scene.beats[index]=normalized;
  else if(Array.isArray(scene.beats))scene.beats.push(normalized);
  scene.beatMap.set(normalized.beatId,normalized);
  return true;
}
const MENMA_DEFEAT_FUTURE_BOARD_REGISTRATION_ID="academy_menma_defeat_future_38800";
function isMenmaDefeatFutureBoardBeat38800(beatId){
  const id=String(beatId||"");
  return id.startsWith("menma_party_defeat_return_")||id.startsWith("menma_future_");
}
function registerMenmaDefeatFutureSceneBoard38800(){
  if(typeof globalThis.registerStorySceneBoardDefinition!=="function"){
    return{success:false,reason:"story_scene_board_not_loaded"};
  }
  const result=globalThis.registerStorySceneBoardDefinition(STORY_SCENE_ID,{
    resolve:({beatId})=>{
      const id=String(beatId||"");
      if(!isMenmaDefeatFutureBoardBeat38800(id))return null;
      return{
        mode:"conversation",
        location:id.startsWith("menma_future_")?"WHISPER WOODS":"FOREST CLEARING",
        actors:[]
      };
    },
    resolveBackdrop:({beatId})=>{
      const id=String(beatId||"");
      if(id.startsWith("menma_party_defeat_return_")){
        return{assetPath:BATTLE_ENVIRONMENT_PATH,assetId:"konoha_forest_clearing_day"};
      }
      if(id.startsWith("menma_future_")){
        return{assetPath:FUTURE_ENVIRONMENT_PATH,assetId:FUTURE_ENVIRONMENT_ASSET_ID};
      }
      return null;
    }
  });
  try{
    if(result&&result.success===true&&typeof globalThis.renderStorySceneBoard33900==="function"){
      globalThis.renderStorySceneBoard33900();
    }
  }catch(_error){}
  return result;
}
function ensureMenmaDefeatFutureSceneBoard38800(){
  if(globalThis.SC_STORY_SCENE_BOARD_33900)return registerMenmaDefeatFutureSceneBoard38800();
  const queue=globalThis.SC_STORY_SCENE_BOARD_PENDING_REGISTRATIONS||(globalThis.SC_STORY_SCENE_BOARD_PENDING_REGISTRATIONS=[]);
  if(!queue.some(row=>row&&row.id===MENMA_DEFEAT_FUTURE_BOARD_REGISTRATION_ID)){
    queue.push({id:MENMA_DEFEAT_FUTURE_BOARD_REGISTRATION_ID,register:registerMenmaDefeatFutureSceneBoard38800});
  }
  return{success:true,queued:true};
}
function installMenmaDefeatStoryBridge38800(scene){
  if(!scene||!scene.beatMap||typeof scene.beatMap.set!=="function")return{success:false,reason:"menma_story_scene_missing"};
  if(typeof normalizeStorySceneBeat!=="function")return{success:false,reason:"story_beat_normalizer_missing"};
  if(typeof registerSceneBackdropAssetPath==="function"){
    registerSceneBackdropAssetPath("konoha_forest_clearing_day",BATTLE_ENVIRONMENT_PATH);
    registerSceneBackdropAssetPath(FUTURE_ENVIRONMENT_ASSET_ID,FUTURE_ENVIRONMENT_PATH);
  }
  const rows=menmaDefeatAndFutureStoryBeats38800();
  if(!rows.every(row=>upsertMenmaStoryBeat38800(scene,row)))return{success:false,reason:"menma_story_bridge_normalization_failed"};
  const sceneBoard=ensureMenmaDefeatFutureSceneBoard38800();
  return{
    success:true,
    defeatEntryBeatId:PARTY_DEFEAT_RETURN_BEAT_ID,
    defeatBeatCount:24,
    futureEntryBeatId:FUTURE_ENTRY_BEAT_ID,
    futureChoiceBeatId:"menma_future_choice",
    futureEnvironmentPath:FUTURE_ENVIRONMENT_PATH,
    sceneBoardRegistered:sceneBoard&&sceneBoard.success===true
  };
}
function applyMenmaSuccessorBattleAuthority(scene){
  if(!scene||!scene.beatMap||typeof scene.beatMap.get!=="function")return{success:false,reason:"menma_story_scene_missing"};
  const storyBridge=installMenmaDefeatStoryBridge38800(scene);
  if(!storyBridge.success)return storyBridge;
  const beat=scene.beatMap.get(STORY_BATTLE_BEAT_ID);
  if(!beat||beat.mode!=="battle_transition"||!beat.battle)return{success:false,reason:"menma_story_battle_beat_missing"};
  beat.battle.enemyId=HOSTILE_IDS[0];beat.battle.encounterId=ENCOUNTER_ID;beat.battle.battleConfigId=BATTLE_CONFIG_ID;beat.battle.objectiveId=OBJECTIVE_ID;
  beat.battle.objectiveText=PLAYER_OBJECTIVE_TEXT;beat.battle.objectiveLabel=PLAYER_OBJECTIVE_TEXT;
  beat.battle.environmentPath=BATTLE_ENVIRONMENT_PATH;beat.battle.backdrop=BATTLE_ENVIRONMENT_PATH;
  beat.battle.defeatBeatId=PARTY_DEFEAT_RETURN_BEAT_ID;
  beat.battle.launchResolver=launchMenmaEvolvedPLBattle36900;
  for(const row of scene.beatMap.values())migrateMenmaSuccessorDisplayValue(row);
  return{
    success:true,sceneId:STORY_SCENE_ID,beatId:STORY_BATTLE_BEAT_ID,
    objectiveText:PLAYER_OBJECTIVE_TEXT,environmentPath:BATTLE_ENVIRONMENT_PATH,
    defeatBeatId:PARTY_DEFEAT_RETURN_BEAT_ID,futureEntryBeatId:FUTURE_ENTRY_BEAT_ID,
    storyBridge
  };
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
  const source=[
    launchMenmaEvolvedPLBattle36900,getInputReadiness,resolveEnemyOpportunity,
    yieldAnkoToMenmaActive36900,advanceAfterPresentation,completeOccurrenceReceipt
  ].map(fn=>String(fn)).join("\n");
  const checks={
    patchId:PATCH_ID==="menma_guest_ally_evolved_pl_battle_36900_2026_09_26",
    exactBattleIdentity:!!beat&&beat.battle&&beat.battle.battleConfigId===BATTLE_CONFIG_ID&&beat.battle.encounterId===ENCOUNTER_ID&&beat.battle.objectiveId===OBJECTIVE_ID,
    successorPlayerObjective:!!beat&&beat.battle&&beat.battle.objectiveText===PLAYER_OBJECTIVE_TEXT,
    exactBattleEnvironment:!!beat&&beat.battle&&beat.battle.environmentPath===BATTLE_ENVIRONMENT_PATH,
    exactParticipants:ALLIED_IDS.includes(MENMA_ID)&&ALLIED_IDS.includes(ANKO_ID)&&HOSTILE_IDS.join("|")==="test_subject_altered_shinobi|test_subject_brute|test_subject_unstable",
    ankoGuestAlly:makeAnkoParticipant().participantClass==="guest_ally"&&makeAnkoParticipant().controlAuthority==="player"&&makeAnkoParticipant().ownershipGranted===false,
    ankoPaletteExact:ANKO_GUEST_SKILL_IDS.join("|")==="sj_anko_hidden_shadow_snake_hands|sj_anko_snake_bind|sj_anko_fire_style_dragon_flame|sj_anko_serpent_evasion"&&!ANKO_GUEST_SKILL_IDS.includes("sj_anko_twin_snakes_mutual_death"),
    ordinaryCurrentActiveInput:String(getInputReadiness).includes("activeParticipantId:active.id")&&String(getInputReadiness).includes('st.phase!=="player"'),
    noForcedAnkoTakedown:!source.includes("scripted_a")&&!source.includes("scripted_b")&&!source.includes("authored_scripted_takedown"),
    normalEnemyCadence:String(resolveEnemyOpportunity).includes("activePlayer()")&&String(resolveEnemyOpportunity).includes("enemyEligibleActions")&&String(enemyEligibleActions).includes("getEnemyAuthoredBattleActions"),
    presentationGatesWithdrawal:String(advanceAfterPresentation).includes("advanceBattleParticipantAtZeroPL")&&String(handleBattleParticipantAtZeroPL).includes("presentation_pending_withdrawal"),
    exactEnemyRelay:HOSTILE_IDS.join("|")==="test_subject_altered_shinobi|test_subject_brute|test_subject_unstable",
    authoredYieldAfterLegitimateFirstTwo:String(shouldAuthorMenmaHandoff36900).includes("resolvedHostileIds.includes(HOSTILE_IDS[0])")&&String(shouldAuthorMenmaHandoff36900).includes("resolvedHostileIds.includes(HOSTILE_IDS[1])"),
    authoredYieldPreservesSideOrder:String(yieldAnkoToMenmaActive36900).includes('nextSide:"enemy"')&&String(yieldAnkoToMenmaActive36900).includes("sideOrderReset:false"),
    ordinaryAlliedRelay:String(advanceAfterPresentation).includes('pending.side==="player"')&&String(advanceAfterPresentation).includes("activePlayer()"),
    partyDefeatOnlyOnAlliedExhaustion:String(advanceAfterPresentation).includes('if(!next)')&&String(completeMenmaSuccessorDefeat).includes("allied_side_exhausted"),
    men03StartsAtMenmaActive:String(startMenmaEvidenceWindow36900).includes("firstLegitimateMenmaActiveMoment:true")&&String(startMenmaEvidenceWindow36900).includes('men03Scope:"menma_active_only"'),
    phaseFailureNoFakeLow:String(completeMenmaSuccessorDefeat).includes('tutorialResult:"not_completed"')&&String(completeMenmaSuccessorDefeat).includes("performanceBucket:null"),
    partyDefeatReturnsToWritingBeat:!!beat&&beat.battle&&beat.battle.defeatBeatId===PARTY_DEFEAT_RETURN_BEAT_ID,
    partyDefeatWritingChainComplete:Array.from({length:24},(_,index)=>scene&&scene.beatMap&&scene.beatMap.has(`menma_party_defeat_return_${String(index+1).padStart(2,"0")}`)).every(Boolean)&&scene.beatMap.get("menma_party_defeat_return_24")?.nextBeatId===FUTURE_ENTRY_BEAT_ID,
    futureAmbitionBridgeInstalled:scene&&scene.beatMap&&scene.beatMap.has(FUTURE_ENTRY_BEAT_ID)&&scene.beatMap.has("menma_future_choice")&&scene.beatMap.get("menma_future_terminal")?.exitScene===true,
    futureAmbitionChoiceExact:scene&&scene.beatMap&&scene.beatMap.get("menma_future_choice")?.choices?.map(choice=>choice.label).join("|")==="MASTER WHAT THEY WON'T TEACH ME|BECOME TOO STRONG TO HOLD BACK|CREATE SOMETHING THAT'S MINE|FIND OUT HOW FAR I CAN GO",
    futureAmbitionHistoryIntent:String(commitMenmaFutureAmbitionIntent38800).includes("FUTURE_INTENT_OCCURRENCE_ID")&&!String(commitMenmaFutureAmbitionIntent38800).includes("currentPL")&&!String(commitMenmaFutureAmbitionIntent38800).includes("BasePL"),
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
globalThis.runIssue369MenmaEvolvedPLBattleDiagnostics=diagnostics;
globalThis.SC_MENMA_EVOLVED_PL_BATTLE_36900=Object.freeze({
  patchId:PATCH_ID,battleConfigId:BATTLE_CONFIG_ID,encounterId:ENCOUNTER_ID,objectiveId:OBJECTIVE_ID,
  scriptContractId:SCRIPT_CONTRACT_ID,alliedParticipantIds:Object.freeze([...ALLIED_IDS]),hostileParticipantIds:Object.freeze([...HOSTILE_IDS]),
  controlModel:"guest_ally_current_active",phaseOrder:Object.freeze(["player","enemy"]),storyPatch:clone(storyPatch),browserGoldenClaimed:false
});
})();
