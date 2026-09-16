// ============================================================================
// ISSUE #201 — ACADEMY KAKASHI ORIGIN BATTLE DEPLOYMENT — 34300
//
// Combat authority:
// Documentation/Combat/SC_Combat_Academy_Kakashi_Origin_Runtime_Battle_Deployment_and_Result_Contract_2026-09-15.md
// commit 6c0037db3531d38890447a4e86c2e7e8c80e6e2e
// Documentation/Combat/SC_Combat_Academy_Kakashi_Origin_Battle_Config_Composition_Gap_Addendum_2026-09-15.md
// commit 3f7502e4b41b1f58c88fe83e89f9839ed0607ef4
//
// This module binds Combat's published Kakashi battle configurations to the
// existing Battle engine. It does not own Story outcomes, package custody,
// participant death/custody, rewards, Summon ownership, or Progression.
// ============================================================================
(function installAcademyKakashiOriginBattleDeployment34300(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300)return;

const PATCH_ID="alpha_kakashi_origin_battle_deployment_34300_2026_09_15";
const AUTHORITY_COMMIT="6c0037db3531d38890447a4e86c2e7e8c80e6e2e";
const CONFIG_AUTHORITY_COMMIT="3f7502e4b41b1f58c88fe83e89f9839ed0607ef4";
const STORY_SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const KAKASHI="academy_kakashi";
const PAKKUN="pakkun_origin_unfamiliar_ninken";
const AMT="academy_kakashi_origin_amt";
const PS="academy_kakashi_origin_package_smuggler";
const MI="academy_kakashi_origin_masked_interceptor";

const PROFILE_IDS=Object.freeze({
  [AMT]:"anbu_style_operative",
  [PS]:"fuinjutsu_smuggler",
  [MI]:"decoy_assassin"
});

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

function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(_e){return v;}}
function runtimeAvailable(){return typeof enemyDatabase==="object"&&enemyDatabase&&typeof makeEnemyFixedDamageAction==="function";}
function conditionFor(targetId,key,sourceId){
  if(typeof ensureBattleRuntimeState!=="function")return null;
  const rt=ensureBattleRuntimeState();
  return Array.isArray(rt.conditions)?rt.conditions.find(c=>c&&c.conditionKey===key&&c.targetRef&&c.targetRef.side==="player"&&c.targetRef.participantId===targetId&&(!sourceId||(c.sourceRef&&c.sourceRef.participantId===sourceId)))||null:null;
}
function transientFor(side,participantId,key){
  if(typeof findBattleTransientState!=="function")return null;
  return findBattleTransientState({stateKey:key,targetSide:side,targetParticipantId:participantId});
}
function direct(id,baseAttackPL,discipline,{boostMarker=null,boost=0}={}){
  const base=makeEnemyFixedDamageAction(id,baseAttackPL,{primaryDiscipline:discipline});
  return {...base,authoredAttackPL:baseAttackPL,resolve(args){
    let magnitude=baseAttackPL,marker=null;
    if(boostMarker&&args&&args.enemy){
      marker=transientFor("enemy",args.enemy.id,boostMarker);
      if(marker)magnitude+=boost;
    }
    const dyn=makeEnemyFixedDamageAction(id,magnitude,{primaryDiscipline:discipline});
    const out=dyn.resolve(args);
    if(marker&&typeof removeBattleTransientState==="function")removeBattleTransientState(marker.stateId);
    return {...out,authoredAttackPL:magnitude,baseAuthoredAttackPL:baseAttackPL,conditionalBoostApplied:!!marker};
  }};
}
function movementControl(id,discipline,conditionKey){
  return {
    id,skillId:id,actionClass:"enemy_authored_action",primaryDiscipline:discipline,targetMode:"current_enemy",traits:["control_only","not_generic_stun"],authoredAttackPL:0,
    evaluateAvailability({enemy,target}){return target&&!conditionFor(target.id,conditionKey,enemy&&enemy.id)?{available:true}:{available:false,reason:`${conditionKey}_already_live`};},
    resolve({enemy,target,envelope}){
      if(!enemy||!target||typeof createAlphaMovementControlCondition!=="function")return{resolved:false,reason:"movement_control_runtime_missing"};
      const applied=createAlphaMovementControlCondition({conditionKey,conditionType:"physical_restraint",sourceSide:"enemy",sourceParticipantId:enemy.id,sourceRefs:[{type:"enemy_profile",id:PROFILE_IDS[enemy.id]||enemy.id,role:"combat_authority"}],sourceSkillId:id,actionId:envelope&&envelope.actionId||null,targetSide:"player",targetParticipantId:target.id,strength:0,resolverDiscipline:discipline,durationActionOpportunities:1,extraData:{sourceOwned:true,blanketStun:false,noDirectBattlePLDamage:true}});
      return{resolved:!!(applied&&applied.condition),damageApplied:false,finalDamage:0,conditionRefs:applied&&applied.condition?[applied.condition.conditionId]:[],stateRefs:[]};
    }
  };
}
function setupMarker(id,key,discipline){
  return {
    id,skillId:id,actionClass:"enemy_support",primaryDiscipline:discipline,targetMode:"self",traits:["setup_only","no_extra_action"],authoredAttackPL:0,
    evaluateAvailability({enemy}){return enemy&&!transientFor("enemy",enemy.id,key)?{available:true}:{available:false,reason:`${key}_already_live`};},
    resolve({enemy,envelope}){
      if(!enemy||typeof addBattleTransientState!=="function")return{resolved:false,reason:"transient_state_runtime_missing"};
      const state=addBattleTransientState({stateKey:key,sourceSide:"enemy",sourceParticipantId:enemy.id,targetSide:"enemy",targetParticipantId:enemy.id,ownerRef:{type:"skill",id},data:{sourceSkillId:id,remainingActionOpportunities:1,noExtraAction:true,activationActionId:envelope&&envelope.actionId||null}});
      return{resolved:!!state,damageApplied:false,finalDamage:0,stateRefs:state?[state.stateId]:[],conditionRefs:[]};
    }
  };
}
function sealRelease(){
  const id="enemy_fuinjutsu_smuggler_seal_release";
  return {
    id,skillId:id,actionClass:"enemy_support",primaryDiscipline:"Fuinjutsu",targetMode:"self",traits:["bounded_cleanse"],authoredAttackPL:0,
    evaluateAvailability({enemy}){
      if(!enemy||typeof ensureBattleRuntimeState!=="function")return{available:false,reason:"battle_runtime_missing"};
      const rt=ensureBattleRuntimeState();
      const found=(rt.conditions||[]).find(c=>c&&c.targetRef&&c.targetRef.side==="enemy"&&c.targetRef.participantId===enemy.id&&c.data&&c.data.smuggler_seal_release_compatible===true);
      return found?{available:true}:{available:false,reason:"no_compatible_state"};
    },
    resolve({enemy}){
      const rt=ensureBattleRuntimeState();
      const found=(rt.conditions||[]).find(c=>c&&c.targetRef&&c.targetRef.side==="enemy"&&c.targetRef.participantId===enemy.id&&c.data&&c.data.smuggler_seal_release_compatible===true);
      if(!found||typeof removeBattleCondition!=="function")return{resolved:false,reason:"no_compatible_state"};
      const removed=removeBattleCondition(found.conditionId,{reason:"fuinjutsu_smuggler_seal_release",removerRef:{side:"enemy",participantId:enemy.id}});
      return{resolved:removed===true,damageApplied:false,finalDamage:0,conditionRefs:[found.conditionId],stateRefs:[]};
    }
  };
}
function decoyGuard(){
  const id="enemy_decoy_assassin_decoy_substitution";
  return {
    id,skillId:id,actionClass:"enemy_defense",targetMode:"self",traits:["one_use_guard","not_evasion"],authoredAttackPL:0,
    evaluateAvailability({enemy}){
      if(!enemy)return{available:false,reason:"enemy_missing"};
      const used=currentBattle&&currentBattle.kakashiOriginCombat&&currentBattle.kakashiOriginCombat.decoySubstitutionUsed===true;
      const max=typeof getBattleMaximumPL==="function"?getBattleMaximumPL("enemy",enemy.id):enemy.maxHp||enemy.hp||0;
      const rem=typeof getBattleRemainingPL==="function"?getBattleRemainingPL("enemy",enemy.id):enemy.hp||0;
      return !used&&max>0&&rem<=max*.5&&!transientFor("enemy",enemy.id,"decoy_assassin_guard")?{available:true}:{available:false,reason:"decoy_substitution_threshold_or_once_gate"};
    },
    resolve({enemy,envelope}){
      if(!enemy||typeof addBattleTransientState!=="function")return{resolved:false,reason:"guard_runtime_missing"};
      const state=addBattleTransientState({stateKey:"decoy_assassin_guard",sourceSide:"enemy",sourceParticipantId:enemy.id,targetSide:"enemy",targetParticipantId:enemy.id,ownerRef:{type:"skill",id},data:{sourceSkillId:id,attackMultiplier:.75,preventionRatio:.25,oneUse:true,notEvasion:true,activationActionId:envelope&&envelope.actionId||null}});
      if(currentBattle){currentBattle.kakashiOriginCombat=currentBattle.kakashiOriginCombat||{};currentBattle.kakashiOriginCombat.decoySubstitutionUsed=true;}
      return{resolved:!!state,damageApplied:false,finalDamage:0,stateRefs:state?[state.stateId]:[],conditionRefs:[]};
    }
  };
}
function registerProfiles(){
  if(!runtimeAvailable())return{success:false,reason:"battle_runtime_authority_missing"};
  const rows={
    [AMT]:{id:AMT,name:"ANBU MARKED TARGET",rank:"Story Opposition",power:49,calibratedBasePL:49,baseStats:{nin:50,tai:47,buki:48,fuin:34,kin:43,gen:46,stamina:49},stats:{nin:50,tai:47,buki:48,fuin:34,kin:43,gen:46,stamina:49},image:null,rewards:{ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},provenance:{combatSourceProfileId:"anbu_style_operative",storyParticipantRef:AMT,profileIntegratedTools:"profile_integrated_tanto_wire_tools"}},
    [PS]:{id:PS,name:"PACKAGE SMUGGLER",rank:"Story Opposition",power:36,calibratedBasePL:36,baseStats:{nin:29,tai:24,buki:27,fuin:38,kin:33,gen:22,stamina:31},stats:{nin:29,tai:24,buki:27,fuin:38,kin:33,gen:22,stamina:31},image:null,rewards:{ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},provenance:{combatSourceProfileId:"fuinjutsu_smuggler",storyParticipantRef:PS,profileIntegratedTools:"profile_integrated_seal_tools"}},
    [MI]:{id:MI,name:"MASKED INTERCEPTOR",rank:"Story Opposition",power:45,calibratedBasePL:45,baseStats:{nin:43,tai:44,buki:46,fuin:24,kin:38,gen:42,stamina:41},stats:{nin:43,tai:44,buki:46,fuin:24,kin:38,gen:42,stamina:41},image:null,rewards:{ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},provenance:{combatSourceProfileId:"decoy_assassin",storyParticipantRef:MI,profileIntegratedTools:"profile_integrated_concealed_blade_decoy_tools"}}
  };
  Object.entries(rows).forEach(([id,row])=>{enemyDatabase[id]={...(enemyDatabase[id]||{}),...row};});
  enemyDatabase[AMT].authoredBattleActions=[movementControl("enemy_anbu_style_operative_wire_capture","Bukijutsu","wire_capture"),setupMarker("enemy_anbu_style_operative_silent_body_flicker","silent_body_flicker_position","Ninjutsu"),direct("enemy_anbu_style_operative_tanto_flash",26,"Bukijutsu",{boostMarker:"silent_body_flicker_position",boost:4})];
  enemyDatabase[PS].authoredBattleActions=[sealRelease(),movementControl("enemy_fuinjutsu_smuggler_binding_tag","Fuinjutsu","binding_tag"),direct("enemy_fuinjutsu_smuggler_contraband_seal_burst",22,"Fuinjutsu")];
  enemyDatabase[MI].authoredBattleActions=[decoyGuard(),setupMarker("enemy_decoy_assassin_false_retreat","false_retreat_opening",null),direct("enemy_decoy_assassin_concealed_blade",26,"Bukijutsu",{boostMarker:"false_retreat_opening",boost:4})];
  return{success:true,participantIds:[AMT,PS,MI]};
}

const priorChoose=typeof chooseEnemyAuthoredBattleAction==="function"?chooseEnemyAuthoredBattleAction:null;
function chooseKakashiEnemyAction34300(schedulerState=null){
  const state=schedulerState&&schedulerState.ready===true?schedulerState:(typeof evaluateEnemyActionScheduler==="function"?evaluateEnemyActionScheduler():null);
  if(!state||state.ready!==true)return priorChoose?priorChoose(schedulerState):{success:false,reason:"enemy_scheduler_unavailable"};
  const ids=(state.eligibleActions||[]).map(a=>a&&a.id).filter(Boolean);
  let priority=null;
  if(state.enemyId===AMT)priority=["enemy_anbu_style_operative_wire_capture","enemy_anbu_style_operative_tanto_flash","enemy_anbu_style_operative_silent_body_flicker"];
  if(state.enemyId===PS)priority=["enemy_fuinjutsu_smuggler_seal_release","enemy_fuinjutsu_smuggler_binding_tag","enemy_fuinjutsu_smuggler_contraband_seal_burst"];
  if(state.enemyId===MI)priority=["enemy_decoy_assassin_decoy_substitution","enemy_decoy_assassin_false_retreat","enemy_decoy_assassin_concealed_blade"];
  if(!priority)return priorChoose?priorChoose(state):{success:false,reason:"enemy_scheduler_authority_missing"};
  // AMT special rule: Body Flicker becomes preferred after a direct attack when
  // capture is already live and no setup marker exists.
  if(state.enemyId===AMT&&currentBattle&&currentBattle.kakashiOriginCombat&&currentBattle.kakashiOriginCombat.lastEnemyActionByParticipant&&currentBattle.kakashiOriginCombat.lastEnemyActionByParticipant[AMT]==="enemy_anbu_style_operative_tanto_flash")priority=["enemy_anbu_style_operative_wire_capture","enemy_anbu_style_operative_silent_body_flicker","enemy_anbu_style_operative_tanto_flash"];
  const selectedId=priority.find(id=>ids.includes(id));
  const action=(state.eligibleActions||[]).find(a=>a&&a.id===selectedId)||null;
  return action?{success:true,action,eligibleActionIds:ids,randomnessAppliedAfterEligibility:false,equalSelectionWeight:false,deterministicKakashiOriginAI:true}:priorChoose?priorChoose(state):{success:false,reason:"no_semantically_eligible_enemy_action"};
}
if(priorChoose){globalThis.chooseEnemyAuthoredBattleAction=chooseKakashiEnemyAction34300;try{chooseEnemyAuthoredBattleAction=chooseKakashiEnemyAction34300;}catch(_e){}}

const priorConsume=typeof consumeBattleActionOpportunity==="function"?consumeBattleActionOpportunity:null;
function consumeKakashiBattleOpportunity34300(side,participantId,actionId,reason){
  const before=currentBattle&&currentBattle.kakashiOriginDeployment?currentBattle.kakashiOriginDeployment:null;
  const result=priorConsume?priorConsume.apply(this,arguments):null;
  if(before&&side==="player"&&participantId===before.controllerParticipantId){
    before.countedControllerActionIds=Array.isArray(before.countedControllerActionIds)?before.countedControllerActionIds:[];
    if(actionId&&!before.countedControllerActionIds.includes(actionId)){
      before.countedControllerActionIds.push(actionId);
      before.playerActionOpportunityCount=Math.max(0,Number(before.playerActionOpportunityCount)||0)+1;
    }
  }
  if(before&&side==="enemy"&&actionId){
    currentBattle.kakashiOriginCombat=currentBattle.kakashiOriginCombat||{};
    const map=currentBattle.kakashiOriginCombat.lastEnemyActionByParticipant||(currentBattle.kakashiOriginCombat.lastEnemyActionByParticipant={});
    map[participantId]=String((currentBattle.runtime&&currentBattle.runtime.evidence||[]).slice().reverse().find(e=>e&&e.actionId===actionId&&e.skillId)?.skillId||"");
  }
  return result;
}
if(priorConsume){globalThis.consumeBattleActionOpportunity=consumeKakashiBattleOpportunity34300;try{consumeBattleActionOpportunity=consumeKakashiBattleOpportunity34300;}catch(_e){}}

function idempotenceKey(spec){return [spec.storyOccurrenceId,spec.sourceAnchorRef,spec.bindingRef].map(v=>String(v||"")).join("::");}
function getConfig(id){return CONFIGS[String(id||"")]||null;}
function validateLaunch(spec,config){
  if(!config)return{success:false,reason:"kakashi_battle_config_unknown"};
  if(!spec.storyOccurrenceId||!spec.sourceAnchorRef||!spec.bindingRef)return{success:false,reason:"kakashi_battle_caller_identity_incomplete"};
  if(!spec.returnContext||spec.returnContext.type!=="story_scene"||spec.returnContext.sceneId!==STORY_SCENE_ID)return{success:false,reason:"kakashi_story_return_context_invalid"};
  if(typeof getCharacterRegistryEntry==="function"&&!getCharacterRegistryEntry(KAKASHI))return{success:false,reason:"academy_kakashi_authoritative_snapshot_missing"};
  if(config.pakkun!==true&&spec.pakkunAuthorized===true)return{success:false,reason:"pakkun_not_in_selected_config"};
  if(config.pakkun===true&&spec.pakkunAuthorized!==true)return{success:false,reason:"pakkun_story_authority_missing"};
  return{success:true};
}
function launchAcademyKakashiOriginPlBattle(spec={}){
  const config=getConfig(spec.battleConfigId);const gate=validateLaunch(spec,config);if(!gate.success)return gate;
  registerProfiles();
  if(typeof launchBattleWithReturnContext!=="function"||typeof configureBattleEnemyParticipants!=="function")return{success:false,reason:"existing_battle_deployment_api_missing"};
  playerData.kakashiOriginBattleLaunches=playerData.kakashiOriginBattleLaunches&&typeof playerData.kakashiOriginBattleLaunches==="object"?playerData.kakashiOriginBattleLaunches:{};
  const key=idempotenceKey(spec),existing=playerData.kakashiOriginBattleLaunches[key];
  if(existing&&existing.battleOccurrenceId&&currentBattle&&currentBattle.battleId===existing.battleOccurrenceId&&!currentBattle.battleOver)return{success:true,idempotent:true,battleId:existing.battleOccurrenceId,encounterId:config.id};
  const returnContext={...clone(spec.returnContext),battleConfigId:config.id,storyOccurrenceId:String(spec.storyOccurrenceId),sourceAnchorRef:String(spec.sourceAnchorRef),bindingRef:String(spec.bindingRef),returnToken:spec.returnToken?String(spec.returnToken):null};
  const primary=config.opposition[0];
  const launched=launchBattleWithReturnContext(primary,{encounterId:config.id,storyOccurrenceId:spec.storyOccurrenceId,sourceAnchorRef:spec.sourceAnchorRef,bindingRef:spec.bindingRef},returnContext);
  if(!launched||launched.success!==true)return launched||{success:false,reason:"kakashi_battle_launch_failed"};
    const composed=configureBattleEnemyParticipants(config.opposition);
  const composedIds=Array.isArray(composed)
    ?composed.map(row=>row&&row.id).filter(Boolean)
    :[];

  const compositionExact=
    composedIds.length===config.opposition.length &&
    config.opposition.every(
      (participantId,index)=>composedIds[index]===participantId
    );

  if(!compositionExact){
    return{
      success:false,
      reason:"kakashi_opposition_composition_failed",
      expectedParticipantIds:[...config.opposition],
      actualParticipantIds:composedIds
    };
  }
  const occurrenceId=currentBattle.battleId||launched.battleId||`kakashi-origin-battle-${Date.now()}`;
  currentBattle.encounterId=config.id;
  currentBattle.kakashiOriginDeployment={battleConfigId:config.id,battleOccurrenceId:occurrenceId,storyOccurrenceId:String(spec.storyOccurrenceId),sourceAnchorRef:String(spec.sourceAnchorRef),bindingRef:String(spec.bindingRef),returnToken:spec.returnToken?String(spec.returnToken):null,controllerParticipantId:KAKASHI,oppositionParticipantIds:[...config.opposition],pakkunAuthorized:config.pakkun===true,temporaryPakkun:config.pakkun?{participantRef:PAKKUN,basePL:16,remainingBattlePL:16,ownershipGranted:false,independentInitiative:false}:null,timingGate:clone(config.timingGate),playerActionOpportunityCount:0,countedControllerActionIds:[],packageCustodyDelta:"none",authorityCommit:AUTHORITY_COMMIT,configAuthorityCommit:CONFIG_AUTHORITY_COMMIT};
  playerData.kakashiOriginBattleLaunches[key]={battleOccurrenceId:occurrenceId,battleConfigId:config.id,createdAt:Date.now()};
  if(typeof savePlayerData==="function")savePlayerData();
  return{success:true,battleId:occurrenceId,encounterId:config.id,battleConfigId:config.id,oppositionParticipantIds:[...config.opposition],pakkunTemporaryParticipation:config.pakkun===true};
}

function attemptAcademyKakashiPakkunBattleAction(actionId,{targetParticipantId=null}={}){
  const dep=currentBattle&&currentBattle.kakashiOriginDeployment;
  if(!dep||dep.pakkunAuthorized!==true)return{success:false,reason:"pakkun_temporary_participation_not_authorized",actionOpportunityConsumed:false};
  const kakashi=typeof getBattleParticipantByIdentity==="function"?getBattleParticipantByIdentity("player",KAKASHI):null;
  if(!kakashi)return{success:false,reason:"academy_kakashi_not_active",actionOpportunityConsumed:false};
  const pakkun=dep.temporaryPakkun;if(!pakkun||Number(pakkun.remainingBattlePL)<=0)return{success:false,reason:"pakkun_battle_pl_depleted",actionOpportunityConsumed:false};
  const allowed=["pakkun_nipping_bite","pakkun_tracking_scent","pakkun_field_guide"];
  if(!allowed.includes(actionId))return{success:false,reason:"pakkun_action_not_authorized",actionOpportunityConsumed:false};
  const target=targetParticipantId&&typeof getBattleParticipantByIdentity==="function"?getBattleParticipantByIdentity("enemy",targetParticipantId):typeof getBattleDeploymentParticipant==="function"?getBattleDeploymentParticipant("enemy",1):null;
  const needsTarget=actionId==="pakkun_nipping_bite";
  if(needsTarget&&!target)return{success:false,reason:"pakkun_target_missing",actionOpportunityConsumed:false};
  const envelope=createBattleActionEnvelope({actorSide:"player",actorParticipantId:kakashi.id,targetSide:needsTarget?"enemy":null,targetParticipantId:needsTarget?target.id:null,actionClass:"temporary_participant_action",skillId:actionId,sourceRefs:[{type:"temporary_story_battle_participant",id:PAKKUN,role:"action_owner"}],data:{temporaryParticipantRef:PAKKUN,noIndependentInitiative:true,controllerParticipantId:KAKASHI}});
  const entry=beginBattleActionResolution(envelope);if(!entry.accepted)return{success:false,reason:entry.validation.reason,entry,actionOpportunityConsumed:false};
  let resolution=null;
  if(actionId==="pakkun_nipping_bite"){
    const output={primaryDiscipline:null,statKey:null,effectivePrimaryDiscipline:null,coefficient:null,branch:"pakkun_nipping_bite",branchMultiplier:1,authoredPreExecutionMagnitude:7,weaponExecutionMultiplier:1,preDefenseAttackMagnitude:7,attackPL:7,fixedCalibration:true};
    const damage=resolveBattleDamagePacket({envelope,skill:{id:actionId,excess:null},actorSide:"player",actorParticipantId:kakashi.id,targetSide:"enemy",targetParticipantId:target.id,output,mitigable:true,excess:null,stateRefs:[]});
    resolution={resolved:!!damage,damageApplied:!!damage,finalDamage:Number(damage&&damage.finalDamage)||0,stateRefs:[],conditionRefs:[],actionOwnerRef:PAKKUN};
  }else{
    resolution={resolved:true,damageApplied:false,finalDamage:0,stateRefs:[],conditionRefs:[],actionOwnerRef:PAKKUN,boundedInformationOnly:true,noHiddenIdentityOrStatReveal:true};
    if(typeof recordBattleEvidence==="function")recordBattleEvidence({eventType:actionId==="pakkun_tracking_scent"?"pakkun_tracking_clue":"pakkun_field_guidance",committedOccurrence:true,actionId:envelope.actionId,actorRef:{type:"temporary_story_battle_participant",id:PAKKUN},targetRef:null,skillId:actionId,sourceRefs:envelope.sourceRefs,data:{boundedEvidenceOnly:true,hiddenTruthRevealed:false,ownershipGranted:false}});
  }
  if(resolution.resolved)consumeBattleActionOpportunity("player",kakashi.id,envelope.actionId,"valid_pakkun_temporary_action_completed");
  if(typeof savePlayerData==="function")savePlayerData();
  return{success:resolution.resolved===true,envelope,resolution,actionOpportunityConsumed:resolution.resolved===true,temporaryParticipantRef:PAKKUN};
}

function projectAcademyKakashiOriginBattleResult(){
  const dep=currentBattle&&currentBattle.kakashiOriginDeployment;if(!dep)return null;
  const evidence=currentBattle.runtime&&Array.isArray(currentBattle.runtime.evidence)?currentBattle.runtime.evidence:[];
  const outcome=currentBattle.outcome&&currentBattle.outcome.type==="victory"?"player_side_victory":currentBattle.outcome?"opposition_side_victory":"unresolved";
  const participants=[];
  const pRem=typeof getBattleRemainingPL==="function"?getBattleRemainingPL("player",KAKASHI):null;
  participants.push({participantRef:KAKASHI,combatSourceProfileId:"current_authoritative_representation",side:"player",deploymentRole:"controller",basePLAtEntry:null,remainingBattlePL:pRem,battleStatus:pRem!==null&&pRem<=0?"defeated":"active",lifeState:"unresolved",custodyState:"unresolved",actionOccurrenceRefs:evidence.filter(e=>e&&e.actorRef&&e.actorRef.participantId===KAKASHI).map(e=>e.actionId).filter(Boolean)});
  dep.oppositionParticipantIds.forEach(id=>{const rem=typeof getBattleRemainingPL==="function"?getBattleRemainingPL("enemy",id):null;participants.push({participantRef:id,combatSourceProfileId:PROFILE_IDS[id],side:"opposition",deploymentRole:"hostile",basePLAtEntry:enemyDatabase[id]&&enemyDatabase[id].calibratedBasePL||null,remainingBattlePL:rem,battleStatus:rem!==null&&rem<=0?"defeated":"active",lifeState:"unresolved",custodyState:"unresolved",actionOccurrenceRefs:evidence.filter(e=>e&&e.actorRef&&e.actorRef.participantId===id).map(e=>e.actionId).filter(Boolean)});});
  if(dep.pakkunAuthorized)participants.push({participantRef:PAKKUN,combatSourceProfileId:"pakkun_summon_action_closure",side:"player",deploymentRole:"temporary_action_source",basePLAtEntry:16,remainingBattlePL:dep.temporaryPakkun&&dep.temporaryPakkun.remainingBattlePL||16,battleStatus:"temporary_participation_ended",lifeState:"unresolved",custodyState:"not_applicable",actionOccurrenceRefs:evidence.filter(e=>e&&Array.isArray(e.sourceRefs)&&e.sourceRefs.some(r=>r&&r.id===PAKKUN)).map(e=>e.actionId).filter(Boolean)});
  return{battleConfigId:dep.battleConfigId,battleOccurrenceId:dep.battleOccurrenceId,storyOccurrenceId:dep.storyOccurrenceId,sourceAnchorRef:dep.sourceAnchorRef,bindingRef:dep.bindingRef,resultState:outcome,playerActionOpportunityCount:Number(dep.playerActionOpportunityCount)||0,participants,actionOccurrenceRefs:evidence.map(e=>e&&e.actionId).filter(Boolean),packageCustodyDelta:"none",temporaryParticipationEnded:dep.pakkunAuthorized===true,rewardGranted:false,lootGranted:false,participantDeathCommitted:false,participantCustodyCommitted:false,storyObjectiveCommitted:false,timingGate:clone(dep.timingGate)};
}

function runAcademyKakashiOriginBattleDeployment34300Diagnostics(){
  const registered=registerProfiles();
  const checks={patchId:PATCH_ID==="alpha_kakashi_origin_battle_deployment_34300_2026_09_15",authorityPinned:AUTHORITY_COMMIT==="6c0037db3531d38890447a4e86c2e7e8c80e6e2e",configAuthorityPinned:CONFIG_AUTHORITY_COMMIT==="3f7502e4b41b1f58c88fe83e89f9839ed0607ef4",tenPublishedConfigs:Object.keys(CONFIGS).length===10,exactAMT:!!enemyDatabase[AMT]&&enemyDatabase[AMT].calibratedBasePL===49&&JSON.stringify(enemyDatabase[AMT].baseStats)===JSON.stringify({nin:50,tai:47,buki:48,fuin:34,kin:43,gen:46,stamina:49}),exactPS:!!enemyDatabase[PS]&&enemyDatabase[PS].calibratedBasePL===36,exactMI:!!enemyDatabase[MI]&&enemyDatabase[MI].calibratedBasePL===45,exactActionCounts:enemyDatabase[AMT].authoredBattleActions.length===3&&enemyDatabase[PS].authoredBattleActions.length===3&&enemyDatabase[MI].authoredBattleActions.length===3,direct3v1Exact:JSON.stringify(CONFIGS.academy_kakashi_origin_battle_amt_ps_mi_3v1.opposition)===JSON.stringify([AMT,PS,MI]),improved2v1Exact:JSON.stringify(CONFIGS.academy_kakashi_origin_battle_amt_ps_2v1.opposition)===JSON.stringify([AMT,PS]),observePackage2v1Exact:JSON.stringify(CONFIGS.academy_kakashi_origin_battle_ps_mi_2v1.opposition)===JSON.stringify([PS,MI])&&CONFIGS.academy_kakashi_origin_battle_ps_mi_2v1.timingGate===null,directMI1v1Untimed:JSON.stringify(CONFIGS.academy_kakashi_origin_battle_mi_1v1.opposition)===JSON.stringify([MI])&&CONFIGS.academy_kakashi_origin_battle_mi_1v1.timingGate===null,directPS1v1Untimed:JSON.stringify(CONFIGS.academy_kakashi_origin_battle_ps_1v1.opposition)===JSON.stringify([PS])&&CONFIGS.academy_kakashi_origin_battle_ps_1v1.timingGate===null,pakkunNoIndependentInitiative:CONFIGS.academy_kakashi_origin_battle_kakashi_pakkun_vs_amt.pakkun===true&&attemptAcademyKakashiPakkunBattleAction.toString().includes('consumeBattleActionOpportunity("player",kakashi.id'),timingExact:CONFIGS.academy_kakashi_origin_battle_seq_mi.timingGate.maximumControllerActions===4&&CONFIGS.academy_kakashi_origin_battle_seq_ps.timingGate.maximumControllerActions===3,noLoot:[AMT,PS,MI].every(id=>enemyDatabase[id].rewards&&enemyDatabase[id].rewards.ryo.min===0&&enemyDatabase[id].rewards.commonDrops.length===0),browserGoldenClaimed:false};
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,registered,configIds:Object.keys(CONFIGS),browserGoldenClaimed:false};
}

const api=Object.freeze({patchId:PATCH_ID,authorityCommit:AUTHORITY_COMMIT,configAuthorityCommit:CONFIG_AUTHORITY_COMMIT,configs:CONFIGS,participantRefs:Object.freeze({kakashi:KAKASHI,pakkun:PAKKUN,amt:AMT,packageSmuggler:PS,maskedInterceptor:MI}),registerProfiles,getConfig,launchAcademyKakashiOriginPlBattle,attemptAcademyKakashiPakkunBattleAction,projectAcademyKakashiOriginBattleResult,browserGoldenClaimed:false});
globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300=api;
globalThis.launchAcademyKakashiOriginPlBattle=launchAcademyKakashiOriginPlBattle;
globalThis.attemptAcademyKakashiPakkunBattleAction=attemptAcademyKakashiPakkunBattleAction;
globalThis.projectAcademyKakashiOriginBattleResult=projectAcademyKakashiOriginBattleResult;
globalThis.runAcademyKakashiOriginBattleDeployment34300Diagnostics=runAcademyKakashiOriginBattleDeployment34300Diagnostics;
registerProfiles();
})();