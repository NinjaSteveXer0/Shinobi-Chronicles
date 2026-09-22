// ============================================================================
// ACADEMY KAKASHI V2 — CLEAN-ROOM BATTLE ADAPTER — 36010
//
// Coding owner: Battle entry/return glue for the clean-room Academy Kakashi
// Origin. This module owns no Story DOM and does not decide Story outcomes.
// It consumes the current Registry/Combat contracts directly.
// ============================================================================
(function installAcademyKakashiV2Battle36010(){
"use strict";
if(globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010)return;

const PATCH_ID="academy_kakashi_v2_battle_36010_2026_09_22";
const KAKASHI="academy_kakashi";
const AMT="academy_kakashi_origin_amt";
const PS="academy_kakashi_origin_package_smuggler";
const MI="academy_kakashi_origin_masked_interceptor";
const PAKKUN="pakkun_origin_unfamiliar_ninken";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const AMT_TANTO_BASE_PL=6,AMT_FLICKER_BOOST_PL=2;
const PS_SEAL_BURST_PL=5;
const MI_BLADE_BASE_PL=5,MI_FALSE_RETREAT_BOOST_PL=2;

const CONFIGS=Object.freeze({
  academy_kakashi_origin_battle_amt_1v1:Object.freeze({id:"academy_kakashi_origin_battle_amt_1v1",opposition:[AMT],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_amt_ps_2v1:Object.freeze({id:"academy_kakashi_origin_battle_amt_ps_2v1",opposition:[AMT,PS],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_amt_ps_mi_3v1:Object.freeze({id:"academy_kakashi_origin_battle_amt_ps_mi_3v1",opposition:[AMT,PS,MI],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_kakashi_pakkun_vs_amt:Object.freeze({id:"academy_kakashi_origin_battle_kakashi_pakkun_vs_amt",opposition:[AMT],pakkun:true,timingGate:null}),
  academy_kakashi_origin_battle_ps_mi_2v1:Object.freeze({id:"academy_kakashi_origin_battle_ps_mi_2v1",opposition:[PS,MI],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_mi_1v1:Object.freeze({id:"academy_kakashi_origin_battle_mi_1v1",opposition:[MI],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_ps_1v1:Object.freeze({id:"academy_kakashi_origin_battle_ps_1v1",opposition:[PS],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_seq_mi:Object.freeze({id:"academy_kakashi_origin_battle_seq_mi",opposition:[MI],pakkun:false,timingGate:Object.freeze({maximumControllerActions:4,stage:"masked_interceptor"})}),
  academy_kakashi_origin_battle_seq_ps:Object.freeze({id:"academy_kakashi_origin_battle_seq_ps",opposition:[PS],pakkun:false,timingGate:Object.freeze({maximumControllerActions:3,stage:"package_smuggler"})}),
  academy_kakashi_origin_battle_seq_amt_pakkun:Object.freeze({id:"academy_kakashi_origin_battle_seq_amt_pakkun",opposition:[AMT],pakkun:true,timingGate:null})
});

const PROFILE=Object.freeze({
  [AMT]:Object.freeze({id:AMT,name:"ANBU MARKED TARGET",rank:"Origin Opposition",pl:18,stats:Object.freeze({nin:14,tai:17,buki:19,fuin:10,kin:11,gen:13,stamina:17}),image:"NPC portrait/anbu_marked_target.png",derivation:"anbu_style_operative"}),
  [PS]:Object.freeze({id:PS,name:"PACKAGE SMUGGLER",rank:"Origin Opposition",pl:10,stats:Object.freeze({nin:9,tai:7,buki:8,fuin:11,kin:9,gen:6,stamina:10}),image:"NPC portrait/package_smuggler.png",derivation:"fuinjutsu_smuggler"}),
  [MI]:Object.freeze({id:MI,name:"MASKED INTERCEPTOR",rank:"Origin Opposition",pl:14,stats:Object.freeze({nin:11,tai:14,buki:15,fuin:8,kin:8,gen:10,stamina:13}),image:"NPC portrait/masked_interceptor.png",derivation:"decoy_assassin"})
});

function clone(v){try{return typeof cloneBattleRuntimeValue==="function"?cloneBattleRuntimeValue(v):JSON.parse(JSON.stringify(v));}catch(_){return v;}}
function battleMeta(){if(!currentBattle)return null;return currentBattle.kakashiV2||(currentBattle.kakashiV2={lastEnemyActionByParticipant:{},usedEnemyActionIds:[],pakkunRemainingPL:16});}
function actionUsed(id){
  const meta=battleMeta();return !!(meta&&Array.isArray(meta.usedEnemyActionIds)&&meta.usedEnemyActionIds.includes(String(id||"")));
}
function markEnemyAction(enemy,id){
  const meta=battleMeta();if(!meta||!enemy||!id)return;
  if(!meta.lastEnemyActionByParticipant||typeof meta.lastEnemyActionByParticipant!=="object")meta.lastEnemyActionByParticipant={};
  meta.lastEnemyActionByParticipant[enemy.id]=String(id);
  if(!Array.isArray(meta.usedEnemyActionIds))meta.usedEnemyActionIds=[];
  if(!meta.usedEnemyActionIds.includes(String(id)))meta.usedEnemyActionIds.push(String(id));
}
function lastEnemyAction(id){
  const meta=battleMeta();if(meta&&meta.lastEnemyActionByParticipant&&meta.lastEnemyActionByParticipant[id])return meta.lastEnemyActionByParticipant[id];
  const rows=currentBattle&&currentBattle.runtime&&Array.isArray(currentBattle.runtime.evidence)?currentBattle.runtime.evidence:[];
  const row=[...rows].reverse().find(e=>e&&e.actorRef&&e.actorRef.side==="enemy"&&e.actorRef.participantId===id&&e.skillId);
  return row?String(row.skillId):null;
}
function sourceState(key,id){
  try{return findBattleTransientState({stateKey:key,sourceSide:"enemy",sourceParticipantId:id,targetSide:"enemy",targetParticipantId:id})||null;}catch(_){return null;}
}
function targetCondition(key,targetId,sourceId){
  try{return getBattleParticipantConditions("player",targetId).find(c=>c&&c.conditionKey===key&&(!sourceId||getBattleConditionSourceParticipantId(c)===sourceId))||null;}catch(_){return null;}
}
function addSelfMarker(enemy,key,skillId,envelope){
  const prior=sourceState(key,enemy.id);if(prior)removeBattleTransientState(prior.stateId);
  return addBattleTransientState({stateKey:key,sourceSide:"enemy",sourceParticipantId:enemy.id,targetSide:"enemy",targetParticipantId:enemy.id,ownerRef:{type:"skill",id:skillId},data:{activationActionId:envelope&&envelope.actionId||null,kakashiV2:true}});
}
function movementControlAction(id,discipline,conditionKey,{oncePerBattle=false}={}){
  return {
    id,skillId:id,actionClass:"enemy_control_technique",traits:["movement_control_only","not_stun","no_story_custody",...(oncePerBattle?["once_per_battle"]:[])],
    evaluateAvailability({enemy,target}){
      if(!enemy||!target)return{available:false,reason:"participant_missing"};
      if(oncePerBattle&&actionUsed(id))return{available:false,reason:"once_per_battle_used"};
      return{available:!targetCondition(conditionKey,target.id,enemy.id),reason:"target_already_movement_controlled"};
    },
    resolve({enemy,target,envelope}){
      if(!enemy||!target)return{resolved:false,reason:"control_participant_missing"};
      if(oncePerBattle&&actionUsed(id))return{resolved:false,reason:"once_per_battle_used"};
      const live=resolveAuthoredDynamicControlStrength({sourceSide:"enemy",sourceParticipantId:enemy.id,discipline});
      if(!live||live.success!==true)return{resolved:false,reason:"control_strength_unavailable"};
      const applied=createAlphaMovementControlCondition({conditionKey,conditionType:"physical_restraint",sourceSide:"enemy",sourceParticipantId:enemy.id,sourceRefs:[{type:"origin_opposition_profile",id:enemy.id}],sourceSkillId:id,actionId:envelope.actionId,targetSide:"player",targetParticipantId:target.id,strength:live.strength,resolverDiscipline:discipline,durationActionOpportunities:1,extraData:{blanketStun:false,storyCustody:false,kakashiV2:true}});
      const resolved=!!(applied&&applied.condition);if(resolved)markEnemyAction(enemy,id);
      return{resolved,branch:"movement_control_only",damageApplied:false,conditionRefs:applied&&applied.condition?[applied.condition.conditionId]:[]};
    }
  };
}
function directAction(id,basePL,discipline,{boostMarker=null,boost=0}={}){
  return {
    id,skillId:id,actionClass:"enemy_authored_action",traits:["one_authored_damage_packet"],authoredAttackPL:basePL,conditionalBoostAttackPL:boost,
    evaluateAvailability({enemy,target}){
      if(!enemy||!target)return{available:false,reason:"participant_missing"};
      if(enemy.id===AMT){
        const wire=targetCondition("wire_capture",target.id,enemy.id);
        const marker=sourceState("silent_body_flicker_position",enemy.id);
        const prior=lastEnemyAction(enemy.id);
        return{available:!!wire&&(!!marker||prior!=="enemy_anbu_style_operative_tanto_flash"),reason:"amt_priority_other_action"};
      }
      if(enemy.id===PS)return{available:!!targetCondition("binding_tag",target.id,enemy.id),reason:"smuggler_priority_binding"};
      if(enemy.id===MI)return{available:!!sourceState("false_retreat_opening",enemy.id),reason:"interceptor_priority_setup"};
      return{available:true};
    },
    resolve({enemy,target,envelope}){
      const marker=boostMarker?sourceState(boostMarker,enemy.id):null;
      const attackPL=basePL+(marker?boost:0);
      const action=makeEnemyFixedDamageAction(id,attackPL,{primaryDiscipline:discipline,traits:["one_authored_damage_packet"]});
      const result=action.resolve({enemy,target,envelope,currentBattle});
      if(marker)removeBattleTransientState(marker.stateId);
      if(result&&result.resolved===true)markEnemyAction(enemy,id);
      return result;
    }
  };
}
function setupAction(id,key,discipline,availability){
  return {
    id,skillId:id,actionClass:"enemy_context_technique",traits:["setup_only","no_extra_turn","no_hidden_speed"],
    evaluateAvailability(ctx){return availability?availability(ctx):{available:!sourceState(key,ctx.enemy&&ctx.enemy.id)};},
    resolve({enemy,envelope}){const state=addSelfMarker(enemy,key,id,envelope);if(state)markEnemyAction(enemy,id);return{resolved:!!state,branch:"authored_setup",damageApplied:false,stateRefs:state?[state.stateId]:[]};}
  };
}
function compatibleSmugglerCondition(enemy){
  try{return getBattleParticipantConditions("enemy",enemy.id).find(c=>c&&c.data&&c.data.smuggler_seal_release_compatible===true)||null;}catch(_){return null;}
}
function smugglerRelease(){
  const id="enemy_fuinjutsu_smuggler_seal_release";
  return{id,skillId:id,actionClass:"enemy_support_technique",traits:["bounded_single_state_release"],
    evaluateAvailability({enemy}){return{available:!!enemy&&!!compatibleSmugglerCondition(enemy),reason:"no_compatible_state"};},
    resolve({enemy,envelope}){const c=compatibleSmugglerCondition(enemy);if(!c)return{resolved:false,reason:"no_compatible_state"};const removed=removeBattleCondition(c.conditionId,{reason:"smuggler_seal_release",actionId:envelope.actionId,targetRef:createBattleParticipantRef("enemy",enemy.id)});if(removed===true)markEnemyAction(enemy,id);return{resolved:removed===true,branch:"bounded_state_release",damageApplied:false,conditionRefs:[c.conditionId]};}
  };
}
function interceptorGuard(){
  const id="enemy_decoy_assassin_decoy_substitution";
  const base=makeEnemyRatioGuardAction(id,0.25,{stateKey:"decoy_substitution_guard",traits:["once_per_battle","one_packet_guard"]});
  return{id,skillId:id,actionClass:base.actionClass,traits:base.traits,
    evaluateAvailability({enemy}){
      const meta=battleMeta(),remaining=getBattleRemainingPL("enemy",enemy.id),max=enemy&&Number(enemy.calibratedBasePL)||14;
      return{available:remaining<=max*0.5&&meta.decoySubstitutionUsed!==true&&!sourceState("decoy_substitution_guard",enemy.id),reason:"decoy_guard_not_due"};
    },
    resolve(ctx){const result=base.resolve(ctx);if(result&&result.resolved===true){battleMeta().decoySubstitutionUsed=true;markEnemyAction(ctx.enemy,id);}return result;}
  };
}

function registerProfiles(){
  if(typeof enemyDatabase!=="object"||!enemyDatabase)return{success:false,reason:"enemy_database_missing"};
  Object.values(PROFILE).forEach(p=>{
    enemyDatabase[p.id]={
      id:p.id,name:p.name,rank:p.rank,power:p.pl,calibratedBasePL:p.pl,
      baseStats:{...p.stats},stats:{...p.stats},image:p.image,
      rewards:{ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},
      provenance:{origin:"academy_kakashi_v2",combatSourceProfileId:p.id,derivationProfileId:p.derivation,noAutoScaling:true},
      noSummon:true,noTransformation:true,noBossScaling:true
    };
  });
  enemyDatabase[AMT].authoredBattleActions=[
    movementControlAction("enemy_anbu_style_operative_wire_capture","Bukijutsu","wire_capture",{oncePerBattle:true}),
    setupAction("enemy_anbu_style_operative_silent_body_flicker","silent_body_flicker_position","Ninjutsu",({enemy,target})=>({available:!!targetCondition("wire_capture",target.id,enemy.id)&&!sourceState("silent_body_flicker_position",enemy.id)&&lastEnemyAction(enemy.id)==="enemy_anbu_style_operative_tanto_flash",reason:"amt_flicker_not_due"})),
    directAction("enemy_anbu_style_operative_tanto_flash",AMT_TANTO_BASE_PL,"Bukijutsu",{boostMarker:"silent_body_flicker_position",boost:AMT_FLICKER_BOOST_PL})
  ];
  enemyDatabase[PS].authoredBattleActions=[
    smugglerRelease(),
    movementControlAction("enemy_fuinjutsu_smuggler_binding_tag","Fuinjutsu","binding_tag"),
    directAction("enemy_fuinjutsu_smuggler_contraband_seal_burst",PS_SEAL_BURST_PL,"Fuinjutsu")
  ];
  enemyDatabase[MI].authoredBattleActions=[
    interceptorGuard(),
    setupAction("enemy_decoy_assassin_false_retreat","false_retreat_opening",null,({enemy})=>({available:!sourceState("false_retreat_opening",enemy.id),reason:"false_retreat_already_live"})),
    directAction("enemy_decoy_assassin_concealed_blade",MI_BLADE_BASE_PL,"Bukijutsu",{boostMarker:"false_retreat_opening",boost:MI_FALSE_RETREAT_BOOST_PL})
  ];
  return{success:true};
}

const PRE_CHOOSE_ENEMY_ACTION=typeof chooseEnemyAuthoredBattleAction==="function"?chooseEnemyAuthoredBattleAction:null;
function chooseAcademyKakashiV2EnemyAction36010(schedulerState=null){
  const meta=currentBattle&&currentBattle.kakashiV2;
  if(!meta||!Array.isArray(meta.oppositionParticipantIds))return PRE_CHOOSE_ENEMY_ACTION?PRE_CHOOSE_ENEMY_ACTION.apply(this,arguments):{success:false,reason:"enemy_scheduler_authority_missing"};
  const state=schedulerState&&schedulerState.ready===true?schedulerState:(typeof evaluateEnemyActionScheduler==="function"?evaluateEnemyActionScheduler():null);
  if(!state||state.ready!==true)return PRE_CHOOSE_ENEMY_ACTION?PRE_CHOOSE_ENEMY_ACTION(state):{success:false,reason:state&&state.reason||"enemy_scheduler_unavailable"};
  const enemyId=String(state.enemyId||"");
  const candidates=Array.isArray(state.eligibleActions)?state.eligibleActions:[];
  const byId=id=>candidates.find(a=>a&&a.id===id)||null;
  let action=null;
  if(enemyId===AMT){
    action=byId("enemy_anbu_style_operative_tanto_flash")&&sourceState("silent_body_flicker_position",AMT)?byId("enemy_anbu_style_operative_tanto_flash"):null;
    if(!action&&!actionUsed("enemy_anbu_style_operative_wire_capture"))action=byId("enemy_anbu_style_operative_wire_capture");
    if(!action&&lastEnemyAction(AMT)==="enemy_anbu_style_operative_tanto_flash")action=byId("enemy_anbu_style_operative_silent_body_flicker");
    if(!action)action=byId("enemy_anbu_style_operative_tanto_flash");
  }else if(enemyId===PS){
    action=byId("enemy_fuinjutsu_smuggler_seal_release")||byId("enemy_fuinjutsu_smuggler_binding_tag")||byId("enemy_fuinjutsu_smuggler_contraband_seal_burst");
  }else if(enemyId===MI){
    action=sourceState("false_retreat_opening",MI)?byId("enemy_decoy_assassin_concealed_blade"):null;
    if(!action)action=byId("enemy_decoy_assassin_decoy_substitution");
    if(!action)action=byId("enemy_decoy_assassin_false_retreat");
  }
  if(!action)return PRE_CHOOSE_ENEMY_ACTION?PRE_CHOOSE_ENEMY_ACTION(state):{success:false,reason:"no_semantically_eligible_enemy_action"};
  return{success:true,action,eligibleActionIds:candidates.map(a=>a.id),randomnessAppliedAfterEligibility:false,equalSelectionWeight:false,deterministicKakashiOriginAI:true};
}
if(PRE_CHOOSE_ENEMY_ACTION){
  globalThis.chooseEnemyAuthoredBattleAction=chooseAcademyKakashiV2EnemyAction36010;
  try{chooseEnemyAuthoredBattleAction=globalThis.chooseEnemyAuthoredBattleAction;}catch(_error){}
}

function config(id){return CONFIGS[String(id||"")]||null;}
function launchKey(spec,def){return [spec.storyOccurrenceId,spec.sourceAnchorRef,spec.bindingRef,def.id].map(String).join("|");}
function ensureLaunchStore(){if(!playerData.kakashiV2BattleLaunches||typeof playerData.kakashiV2BattleLaunches!=="object")playerData.kakashiV2BattleLaunches={};return playerData.kakashiV2BattleLaunches;}

function launch(spec={}){
  const def=config(spec.battleConfigId);if(!def)return{success:false,reason:"kakashi_v2_battle_config_unknown"};
  if(!spec.returnContext||spec.returnContext.type!=="story_scene"||String(spec.returnContext.sceneId)!==SCENE_ID)return{success:false,reason:"kakashi_v2_story_return_context_invalid"};
  if(typeof getCharacterRegistryEntry==="function"&&!getCharacterRegistryEntry(KAKASHI))return{success:false,reason:"academy_kakashi_registry_missing"};
  const active=typeof getBattleDeploymentParticipant==="function"&&currentBattle&&currentBattle.active?getBattleDeploymentParticipant("player",1):null;
  const store=ensureLaunchStore(),key=launchKey(spec,def),prior=store[key];
  if(prior&&currentBattle&&currentBattle.battleId===prior.battleOccurrenceId&&currentBattle.battleOver!==true)return{success:true,idempotent:true,battleId:prior.battleOccurrenceId,encounterId:def.id,battleConfigId:def.id};
  const primary=def.opposition[0];
  const launched=launchBattleWithReturnContext(primary,def.id,{...clone(spec.returnContext),battleConfigId:def.id,storyOccurrenceId:String(spec.storyOccurrenceId||""),sourceAnchorRef:String(spec.sourceAnchorRef||""),bindingRef:String(spec.bindingRef||""),returnToken:spec.returnToken?String(spec.returnToken):null});
  if(!launched||launched.success!==true)return launched||{success:false,reason:"kakashi_v2_battle_launch_failed"};
  if(!currentBattle.activePlayer||currentBattle.activePlayer.id!==KAKASHI)return{success:false,reason:"kakashi_v2_requires_academy_kakashi_as_start"};
  const composed=configureBattleEnemyParticipants(def.opposition);
  if(!Array.isArray(composed)||composed.length!==def.opposition.length)return{success:false,reason:"kakashi_v2_opposition_composition_failed"};
  initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true});
  const zero=def.opposition.filter(id=>getBattleRemainingPL("enemy",id)<=0);
  if(zero.length)return{success:false,reason:"kakashi_v2_multi_opposition_zero_battle_pl",participantIds:zero};
  const occurrenceId=currentBattle.battleId||launched.battleId;
  currentBattle.encounterId=def.id;
  currentBattle.kakashiV2={
    patchId:PATCH_ID,battleConfigId:def.id,battleOccurrenceId:occurrenceId,
    storyOccurrenceId:String(spec.storyOccurrenceId||""),sourceAnchorRef:String(spec.sourceAnchorRef||""),bindingRef:String(spec.bindingRef||""),
    oppositionParticipantIds:[...def.opposition],pakkunAuthorized:def.pakkun===true,pakkunRemainingPL:def.pakkun?16:0,
    timingGate:clone(def.timingGate),lastEnemyActionByParticipant:{},usedEnemyActionIds:[],decoySubstitutionUsed:false,packageCustodyDelta:"none"
  };
  store[key]={battleOccurrenceId:occurrenceId,battleConfigId:def.id,createdAt:Date.now()};
  savePlayerData();saveTestState();openOverlay("combat");
  return{success:true,battleId:occurrenceId,encounterId:def.id,battleConfigId:def.id,oppositionParticipantIds:[...def.opposition],pakkunTemporaryParticipation:def.pakkun===true};
}

function pakkunAction(actionId,{targetParticipantId=null}={}){
  const dep=currentBattle&&currentBattle.kakashiV2;
  if(!dep||dep.pakkunAuthorized!==true)return{success:false,reason:"pakkun_temporary_participation_not_authorized",actionOpportunityConsumed:false};
  const kakashi=getBattleParticipantByIdentity("player",KAKASHI);
  if(!kakashi)return{success:false,reason:"academy_kakashi_not_active",actionOpportunityConsumed:false};
  if(Number(dep.pakkunRemainingPL)<=0)return{success:false,reason:"pakkun_battle_pl_depleted",actionOpportunityConsumed:false};
  const allowed=["pakkun_nipping_bite","pakkun_tracking_scent","pakkun_field_guide"];
  if(!allowed.includes(actionId))return{success:false,reason:"pakkun_action_not_authorized",actionOpportunityConsumed:false};
  const needsTarget=actionId==="pakkun_nipping_bite";
  const target=targetParticipantId?getBattleParticipantByIdentity("enemy",targetParticipantId):getBattleDeploymentParticipant("enemy",1);
  if(needsTarget&&!target)return{success:false,reason:"pakkun_target_missing",actionOpportunityConsumed:false};
  const envelope=createBattleActionEnvelope({actorSide:"player",actorParticipantId:kakashi.id,targetSide:needsTarget?"enemy":null,targetParticipantId:needsTarget?target.id:null,actionClass:"temporary_participant_action",skillId:actionId,sourceRefs:[{type:"temporary_story_battle_participant",id:PAKKUN,role:"action_owner"}],data:{temporaryParticipantRef:PAKKUN,noIndependentInitiative:true,controllerParticipantId:KAKASHI}});
  const entry=beginBattleActionResolution(envelope);if(!entry.accepted)return{success:false,reason:entry.validation.reason,entry,actionOpportunityConsumed:false};
  let resolution;
  if(needsTarget){
    const output={primaryDiscipline:null,statKey:null,effectivePrimaryDiscipline:null,coefficient:null,branch:"pakkun_nipping_bite",branchMultiplier:1,authoredPreExecutionMagnitude:7,weaponExecutionMultiplier:1,preDefenseAttackMagnitude:7,attackPL:7,fixedCalibration:true};
    const damage=resolveBattleDamagePacket({envelope,skill:{id:actionId,excess:null,mechanicalPacketCount:1},actorSide:"player",actorParticipantId:kakashi.id,targetSide:"enemy",targetParticipantId:target.id,output,mitigable:true,excess:null,stateRefs:[]});
    resolution={resolved:!!damage,damageApplied:!!damage,finalDamage:Number(damage&&damage.finalDamage)||0,stateRefs:[],conditionRefs:[],actionOwnerRef:PAKKUN};
  }else{
    resolution={resolved:true,damageApplied:false,finalDamage:0,stateRefs:[],conditionRefs:[],actionOwnerRef:PAKKUN,boundedInformationOnly:true,noHiddenIdentityOrStatReveal:true};
    recordBattleEvidence({eventType:actionId==="pakkun_tracking_scent"?"pakkun_tracking_clue":"pakkun_field_guidance",committedOccurrence:true,actionId:envelope.actionId,actorRef:{type:"temporary_story_battle_participant",id:PAKKUN},targetRef:null,skillId:actionId,sourceRefs:envelope.sourceRefs,data:{boundedEvidenceOnly:true,hiddenTruthRevealed:false,ownershipGranted:false}});
  }
  if(resolution.resolved)consumeBattleActionOpportunity("player",kakashi.id,envelope.actionId,"valid_pakkun_temporary_action_completed");
  savePlayerData();saveTestState();if(!currentBattle.battleOver)openOverlay("combat");
  return{success:resolution.resolved===true,envelope,resolution,actionOpportunityConsumed:resolution.resolved===true,temporaryParticipantRef:PAKKUN};
}

function authoritativePlayerBasePLAtEntry(participantId){
  const participant=typeof getBattleParticipantByIdentity==="function"?getBattleParticipantByIdentity("player",participantId):null;
  const registry=typeof getCharacterRegistryEntry==="function"?getCharacterRegistryEntry(participantId):null;
  const candidates=[
    participant&&participant.basePL,
    participant&&participant.basePower,
    participant&&participant.powerLevel,
    registry&&registry.basePL,
    registry&&registry.powerLevel,
    registry&&registry.pl
  ];
  for(const value of candidates){const n=Number(value);if(Number.isFinite(n)&&n>0)return n;}
  const maximum=typeof getBattleMaximumPL==="function"?Number(getBattleMaximumPL("player",participantId)):0;
  return Number.isFinite(maximum)&&maximum>0?maximum:null;
}
function projectResult(){
  const dep=currentBattle&&currentBattle.kakashiV2;if(!dep)return null;
  const evidence=currentBattle.runtime&&Array.isArray(currentBattle.runtime.evidence)?currentBattle.runtime.evidence:[];
  const actionCount=typeof getBattleActionOpportunityIndex==="function"?getBattleActionOpportunityIndex("player",KAKASHI):0;
  const participants=[{
    participantRef:KAKASHI,combatSourceProfileId:KAKASHI,side:"player",deploymentRole:"controller",
    basePLAtEntry:authoritativePlayerBasePLAtEntry(KAKASHI),remainingBattlePL:getBattleRemainingPL("player",KAKASHI),
    battleStatus:getBattleRemainingPL("player",KAKASHI)<=0?"defeated":"active",lifeState:"unresolved",custodyState:"unresolved",
    actionOccurrenceRefs:evidence.filter(e=>e&&e.actorRef&&e.actorRef.participantId===KAKASHI).map(e=>e.actionId).filter(Boolean)
  }];
  dep.oppositionParticipantIds.forEach(id=>participants.push({
    participantRef:id,combatSourceProfileId:id,side:"opposition",deploymentRole:"hostile",basePLAtEntry:PROFILE[id].pl,
    remainingBattlePL:getBattleRemainingPL("enemy",id),battleStatus:getBattleRemainingPL("enemy",id)<=0?"defeated":"active",
    lifeState:"unresolved",custodyState:"unresolved",
    actionOccurrenceRefs:evidence.filter(e=>e&&e.actorRef&&e.actorRef.participantId===id).map(e=>e.actionId).filter(Boolean)
  }));
  return{
    battleConfigId:dep.battleConfigId,battleOccurrenceId:dep.battleOccurrenceId,storyOccurrenceId:dep.storyOccurrenceId,
    sourceAnchorRef:dep.sourceAnchorRef,bindingRef:dep.bindingRef,
    resultState:currentBattle.outcome&&currentBattle.outcome.type==="victory"?"player_side_victory":currentBattle.outcome?"opposition_side_victory":"unresolved",
    playerActionOpportunityCount:actionCount,participants,actionOccurrenceRefs:evidence.map(e=>e&&e.actionId).filter(Boolean),
    packageCustodyDelta:"none",temporaryParticipationEnded:dep.pakkunAuthorized===true,rewardGranted:false,lootGranted:false,
    participantDeathCommitted:false,participantCustodyCommitted:false,storyObjectiveCommitted:false,timingGate:clone(dep.timingGate)
  };
}

function installPakkunBattleButtons(container){
  if(typeof document==="undefined"||!container||!currentBattle||!currentBattle.kakashiV2||currentBattle.kakashiV2.pakkunAuthorized!==true||currentBattle.battleOver===true)return false;
  const stage=container.querySelector&&container.querySelector(".alpha-code-battle-stage");if(!stage)return false;
  let root=stage.querySelector(".kakashi-v2-pakkun-actions");if(!root){root=document.createElement("div");root.className="kakashi-v2-pakkun-actions";stage.appendChild(root);}
  root.innerHTML='<span>PAKKUN · TEMPORARY ACTION SOURCE</span><button type="button" data-pakkun-action="pakkun_nipping_bite">NIPPING BITE</button><button type="button" data-pakkun-action="pakkun_tracking_scent">TRACKING SCENT</button><button type="button" data-pakkun-action="pakkun_field_guide">FIELD GUIDE</button>';
  for(const b of root.querySelectorAll("button"))b.onclick=()=>pakkunAction(b.dataset.pakkunAction);
  if(!document.getElementById("kakashi-v2-pakkun-style")){const s=document.createElement("style");s.id="kakashi-v2-pakkun-style";s.textContent='.kakashi-v2-pakkun-actions{position:absolute;right:3.4%;top:57%;z-index:36;width:32.6%;padding:8px;border:1px solid rgba(197,160,75,.35);background:rgba(3,10,15,.92);display:flex;flex-wrap:wrap;gap:6px}.kakashi-v2-pakkun-actions span{width:100%;font-size:7px;font-weight:900;letter-spacing:.12em;color:#d7b55a}.kakashi-v2-pakkun-actions button{border:1px solid rgba(86,207,218,.35);background:rgba(9,40,47,.5);color:#75dce4;padding:6px 7px;font-size:7px;font-weight:800;cursor:pointer}';document.head.appendChild(s);}
  return true;
}
const PRE_RENDER=typeof renderCombatOverlay==="function"?renderCombatOverlay:null;
if(PRE_RENDER){globalThis.renderCombatOverlay=function kakashiV2BattleRenderWrapper(container){const r=PRE_RENDER.apply(this,arguments);try{installPakkunBattleButtons(container);}catch(_e){}return r;};try{renderCombatOverlay=globalThis.renderCombatOverlay;}catch(_e){}}

function diagnostics(){
  const checks={
    exactTenConfigs:Object.keys(CONFIGS).length===10,
    exactAMT:PROFILE[AMT].pl===18&&JSON.stringify(PROFILE[AMT].stats)===JSON.stringify({nin:14,tai:17,buki:19,fuin:10,kin:11,gen:13,stamina:17}),
    exactPS:PROFILE[PS].pl===10&&JSON.stringify(PROFILE[PS].stats)===JSON.stringify({nin:9,tai:7,buki:8,fuin:11,kin:9,gen:6,stamina:10}),
    exactMI:PROFILE[MI].pl===14&&JSON.stringify(PROFILE[MI].stats)===JSON.stringify({nin:11,tai:14,buki:15,fuin:8,kin:8,gen:10,stamina:13}),
    exactAttackPL:enemyDatabase[AMT].authoredBattleActions.some(a=>a.id==="enemy_anbu_style_operative_tanto_flash"&&a.authoredAttackPL===6&&a.conditionalBoostAttackPL===2)&&enemyDatabase[PS].authoredBattleActions.some(a=>a.id==="enemy_fuinjutsu_smuggler_contraband_seal_burst"&&a.authoredAttackPL===5)&&enemyDatabase[MI].authoredBattleActions.some(a=>a.id==="enemy_decoy_assassin_concealed_blade"&&a.authoredAttackPL===5&&a.conditionalBoostAttackPL===2),
    amtWireOncePerBattle:String(movementControlAction).includes("oncePerBattle")&&enemyDatabase[AMT].authoredBattleActions.some(a=>a.id==="enemy_anbu_style_operative_wire_capture"&&a.traits.includes("once_per_battle")),
    deterministicOpponentAI:typeof globalThis.chooseEnemyAuthoredBattleAction==="function"&&String(globalThis.chooseEnemyAuthoredBattleAction).includes("deterministicKakashiOriginAI"),
    noAutoScaling:Object.values(PROFILE).every(p=>enemyDatabase[p.id].provenance.noAutoScaling===true),
    timingGatesExact:CONFIGS.academy_kakashi_origin_battle_seq_mi.timingGate.maximumControllerActions===4&&CONFIGS.academy_kakashi_origin_battle_seq_ps.timingGate.maximumControllerActions===3,
    pakkunTemporaryOnly:!String(pakkunAction).includes("grantEntityOwnership")&&!String(pakkunAction).includes("attachEntitySummonToCharacter"),
    playerEntryPLNotHardcoded:!String(projectResult).includes("basePLAtEntry:15")&&String(projectResult).includes("authoritativePlayerBasePLAtEntry"),
    noStoryDom:!String(launch).includes("querySelector")&&!String(projectResult).includes("document."),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const installed=registerProfiles();if(!installed.success)throw new Error(installed.reason);
globalThis.launchAcademyKakashiV2Battle36010=launch;
globalThis.projectAcademyKakashiV2BattleResult36010=projectResult;
globalThis.attemptAcademyKakashiV2PakkunAction36010=pakkunAction;
globalThis.runAcademyKakashiV2Battle36010Diagnostics=diagnostics;
globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010=Object.freeze({patchId:PATCH_ID,configs:CONFIGS,participantRefs:Object.freeze({kakashi:KAKASHI,amt:AMT,packageSmuggler:PS,maskedInterceptor:MI,pakkun:PAKKUN}),browserGoldenClaimed:false});
})();
