// ============================================================================
// ISSUE #188 / #201 — ACADEMY KAKASHI ORIGIN BATTLE DEPLOYMENT — 34300
//
// Base deployment authority:
// Documentation/Combat/SC_Combat_Academy_Kakashi_Origin_Runtime_Battle_Deployment_and_Result_Contract_2026-09-15.md
// commit 6c0037db3531d38890447a4e86c2e7e8c80e6e2e
// Documentation/Combat/SC_Combat_Academy_Kakashi_Origin_Battle_Config_Composition_Gap_Addendum_2026-09-15.md
// commit 3f7502e4b41b1f58c88fe83e89f9839ed0607ef4
//
// Sequential occurrence calibration / tuning authority:
// Documentation/Registry/Academy Kakashi Origin Sequential Opposition Registry and PL Calibration 2026-09-16.md
// commit 930c5048453d0034b2856ad3ddfa5ea65fdede7b
// Documentation/Combat/SC_Combat_Academy_Kakashi_Sequential_MI_PS_Action_Tuning_and_AMT_Viability_2026-09-16.md
// commit 4ef10cc556790a35e692b6a10f2733846809b494
// Documentation/Registry/Academy Kakashi Origin ANBU Marked Target Registry and PL Calibration 2026-09-16.md
// commit 0a0bbaf3c3c2395e22977a41da0892a209a73994
// Documentation/Combat/SC_Combat_Academy_Kakashi_Sequential_AMT_Pakkun_Final_Viability_Closure_2026-09-16.md
// commit 32f79944304ea30689d87a4b1f7b48f84fb2734e
//
// This module binds Combat's published Kakashi battle configurations to the
// existing Battle engine. It does not own Story outcomes, package custody,
// participant death/custody, rewards, Summon ownership, or Progression.
// ============================================================================
(function installAcademyKakashiOriginBattleDeployment34300(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300)return;

const PATCH_ID="alpha_kakashi_origin_battle_deployment_34300_v2_2026_09_16";
const AUTHORITY_COMMIT="6c0037db3531d38890447a4e86c2e7e8c80e6e2e";
const CONFIG_AUTHORITY_COMMIT="3f7502e4b41b1f58c88fe83e89f9839ed0607ef4";
const SEQUENTIAL_REGISTRY_COMMIT="930c5048453d0034b2856ad3ddfa5ea65fdede7b";
const SEQUENTIAL_MI_PS_COMBAT_COMMIT="4ef10cc556790a35e692b6a10f2733846809b494";
const AMT_REGISTRY_COMMIT="0a0bbaf3c3c2395e22977a41da0892a209a73994";
const AMT_COMBAT_COMMIT="32f79944304ea30689d87a4b1f7b48f84fb2734e";
const STORY_SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const KAKASHI="academy_kakashi";
const PAKKUN="pakkun_origin_unfamiliar_ninken";
const AMT="academy_kakashi_origin_amt";
const PS="academy_kakashi_origin_package_smuggler";
const MI="academy_kakashi_origin_masked_interceptor";

// Generic opposition profiles remain derivation/provenance only. The exact
// Academy-Origin participant IDs below own the occurrence calibration.
const DERIVATION_PROFILE_IDS=Object.freeze({
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
function originCombatState34300(){
  if(!currentBattle)return null;
  currentBattle.kakashiOriginCombat=currentBattle.kakashiOriginCombat||{};
  return currentBattle.kakashiOriginCombat;
}
function originActionUsed34300(actionId){
  const state=originCombatState34300();
  return !!(state&&Array.isArray(state.oncePerBattleActionIds)&&state.oncePerBattleActionIds.includes(String(actionId||"")));
}
function markOriginActionUsed34300(actionId){
  const state=originCombatState34300();
  if(!state||!actionId)return false;
  state.oncePerBattleActionIds=Array.isArray(state.oncePerBattleActionIds)?state.oncePerBattleActionIds:[];
  if(!state.oncePerBattleActionIds.includes(String(actionId)))state.oncePerBattleActionIds.push(String(actionId));
  return true;
}
function direct(id,baseAttackPL,discipline,{boostMarker=null,boost=0}={}){
  const base=makeEnemyFixedDamageAction(id,baseAttackPL,{primaryDiscipline:discipline});
  return {...base,authoredAttackPL:baseAttackPL,conditionalBoostMarker:boostMarker,conditionalBoostAttackPL:boost,resolve(args){
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
function movementControl(id,discipline,conditionKey,{oncePerBattle=false}={}){
  return {
    id,skillId:id,actionClass:"enemy_authored_action",primaryDiscipline:discipline,targetMode:"current_enemy",traits:["control_only","movement_only_control","not_generic_stun"],authoredAttackPL:0,oncePerBattle:oncePerBattle===true,
    evaluateAvailability({enemy,target}){
      if(oncePerBattle===true&&originActionUsed34300(id))return{available:false,reason:`${conditionKey}_once_per_battle_used`};
      return target&&!conditionFor(target.id,conditionKey,enemy&&enemy.id)?{available:true}:{available:false,reason:`${conditionKey}_already_live`};
    },
    resolve({enemy,target,envelope}){
      if(!enemy||!target||typeof createAlphaMovementControlCondition!=="function")return{resolved:false,reason:"movement_control_runtime_missing"};
      const sourceRefs=[
        {type:"story_battle_occurrence_participant",id:enemy.id,role:"combat_authority"},
        {type:"enemy_profile",id:DERIVATION_PROFILE_IDS[enemy.id]||enemy.id,role:"derivation_provenance"}
      ];
      const applied=createAlphaMovementControlCondition({conditionKey,conditionType:"physical_restraint",sourceSide:"enemy",sourceParticipantId:enemy.id,sourceRefs,sourceSkillId:id,actionId:envelope&&envelope.actionId||null,targetSide:"player",targetParticipantId:target.id,strength:0,resolverDiscipline:discipline,durationActionOpportunities:1,extraData:{sourceOwned:true,blanketStun:false,noDirectBattlePLDamage:true,movementOnlyControl:true,noCustodyInference:true}});
      if(applied&&applied.condition&&oncePerBattle===true)markOriginActionUsed34300(id);
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
    [AMT]:{id:AMT,name:"ANBU MARKED TARGET",rank:"Story Opposition",power:18,calibratedBasePL:18,baseStats:{nin:14,tai:17,buki:19,fuin:10,kin:11,gen:13,stamina:17},stats:{nin:14,tai:17,buki:19,fuin:10,kin:11,gen:13,stamina:17},image:"NPC portrait/anbu_marked_target.png",rewards:{ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},provenance:{combatSourceProfileId:AMT,derivationProfileId:"anbu_style_operative",storyParticipantRef:AMT,profileIntegratedTools:"profile_integrated_tanto_wire_tools",registryAuthorityCommit:AMT_REGISTRY_COMMIT,combatAuthorityCommit:AMT_COMBAT_COMMIT}},
    [PS]:{id:PS,name:"PACKAGE SMUGGLER",rank:"Story Opposition",power:10,calibratedBasePL:10,baseStats:{nin:9,tai:7,buki:8,fuin:11,kin:9,gen:6,stamina:10},stats:{nin:9,tai:7,buki:8,fuin:11,kin:9,gen:6,stamina:10},image:"NPC portrait/package_smuggler.png",rewards:{ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},provenance:{combatSourceProfileId:PS,derivationProfileId:"fuinjutsu_smuggler",storyParticipantRef:PS,profileIntegratedTools:"profile_integrated_seal_tools",registryAuthorityCommit:SEQUENTIAL_REGISTRY_COMMIT,combatAuthorityCommit:SEQUENTIAL_MI_PS_COMBAT_COMMIT}},
    [MI]:{id:MI,name:"MASKED INTERCEPTOR",rank:"Story Opposition",power:14,calibratedBasePL:14,baseStats:{nin:11,tai:14,buki:15,fuin:8,kin:8,gen:10,stamina:13},stats:{nin:11,tai:14,buki:15,fuin:8,kin:8,gen:10,stamina:13},image:"NPC portrait/masked_interceptor.png",rewards:{ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]},provenance:{combatSourceProfileId:MI,derivationProfileId:"decoy_assassin",storyParticipantRef:MI,profileIntegratedTools:"profile_integrated_concealed_blade_decoy_tools",registryAuthorityCommit:SEQUENTIAL_REGISTRY_COMMIT,combatAuthorityCommit:SEQUENTIAL_MI_PS_COMBAT_COMMIT}}
  };
  Object.entries(rows).forEach(([id,row])=>{enemyDatabase[id]={...(enemyDatabase[id]||{}),...row};});
  enemyDatabase[AMT].authoredBattleActions=[movementControl("enemy_anbu_style_operative_wire_capture","Bukijutsu","wire_capture",{oncePerBattle:true}),setupMarker("enemy_anbu_style_operative_silent_body_flicker","silent_body_flicker_position","Ninjutsu"),direct("enemy_anbu_style_operative_tanto_flash",6,"Bukijutsu",{boostMarker:"silent_body_flicker_position",boost:2})];
  enemyDatabase[PS].authoredBattleActions=[sealRelease(),movementControl("enemy_fuinjutsu_smuggler_binding_tag","Fuinjutsu","binding_tag"),direct("enemy_fuinjutsu_smuggler_contraband_seal_burst",5,"Fuinjutsu")];
  enemyDatabase[MI].authoredBattleActions=[decoyGuard(),setupMarker("enemy_decoy_assassin_false_retreat","false_retreat_opening",null),direct("enemy_decoy_assassin_concealed_blade",5,"Bukijutsu",{boostMarker:"false_retreat_opening",boost:2})];
  return{success:true,participantIds:[AMT,PS,MI]};
}

const priorChoose=typeof chooseEnemyAuthoredBattleAction==="function"?chooseEnemyAuthoredBattleAction:null;
function chooseKakashiEnemyAction34300(schedulerState=null){
  const state=schedulerState&&schedulerState.ready===true?schedulerState:(typeof evaluateEnemyActionScheduler==="function"?evaluateEnemyActionScheduler():null);
  if(!state||state.ready!==true)return priorChoose?priorChoose(schedulerState):{success:false,reason:"enemy_scheduler_unavailable"};
  const eligible=state.eligibleActions||[];
  const ids=eligible.map(a=>a&&a.id).filter(Boolean);
  const actionFor=id=>eligible.find(a=>a&&a.id===id)||null;
  let selectedId=null;

  if(state.enemyId===AMT){
    const wire="enemy_anbu_style_operative_wire_capture";
    const flicker="enemy_anbu_style_operative_silent_body_flicker";
    const tanto="enemy_anbu_style_operative_tanto_flash";
    const flickerLive=!!transientFor("enemy",AMT,"silent_body_flicker_position");
    const prior=currentBattle&&currentBattle.kakashiOriginCombat&&currentBattle.kakashiOriginCombat.lastEnemyActionByParticipant&&currentBattle.kakashiOriginCombat.lastEnemyActionByParticipant[AMT]||null;
    if(flickerLive&&ids.includes(tanto))selectedId=tanto;
    else if(!originActionUsed34300(wire)&&ids.includes(wire))selectedId=wire;
    else if(prior===tanto&&ids.includes(flicker))selectedId=flicker;
    else if(ids.includes(tanto))selectedId=tanto;
    else if(ids.includes(flicker))selectedId=flicker;
  }else if(state.enemyId===PS){
    selectedId=["enemy_fuinjutsu_smuggler_seal_release","enemy_fuinjutsu_smuggler_binding_tag","enemy_fuinjutsu_smuggler_contraband_seal_burst"].find(id=>ids.includes(id))||null;
  }else if(state.enemyId===MI){
    const decoy="enemy_decoy_assassin_decoy_substitution";
    const retreat="enemy_decoy_assassin_false_retreat";
    const blade="enemy_decoy_assassin_concealed_blade";
    const openingLive=!!transientFor("enemy",MI,"false_retreat_opening");
    if(openingLive&&ids.includes(blade))selectedId=blade;
    else if(ids.includes(decoy))selectedId=decoy;
    else if(ids.includes(retreat))selectedId=retreat;
    else if(ids.includes(blade))selectedId=blade;
  }else{
    return priorChoose?priorChoose(state):{success:false,reason:"enemy_scheduler_authority_missing"};
  }

  const action=selectedId?actionFor(selectedId):null;
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
  const composedIds=Array.isArray(composed)?composed.map(row=>row&&row.id).filter(Boolean):[];
  const compositionExact=composedIds.length===config.opposition.length&&config.opposition.every((participantId,index)=>composedIds[index]===participantId);
  if(!compositionExact)return{success:false,reason:"kakashi_opposition_composition_failed",expectedParticipantIds:[...config.opposition],actualParticipantIds:composedIds};
  const initializedPL=typeof initializeBattleRemainingPLFromDeployment==="function"
    ?initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true})
    :null;
  if(!initializedPL)return{success:false,reason:"kakashi_multi_opposition_pl_initialization_failed"};
  const zeroCapacity=composedIds.filter(participantId=>typeof getBattleMaximumPL==="function"&&Number(getBattleMaximumPL("enemy",participantId))<=0);
  if(zeroCapacity.length)return{success:false,reason:"kakashi_multi_opposition_zero_battle_pl",participantIds:zeroCapacity};
  const occurrenceId=currentBattle.battleId||launched.battleId||`kakashi-origin-battle-${Date.now()}`;
  currentBattle.encounterId=config.id;
  currentBattle.kakashiOriginDeployment={battleConfigId:config.id,battleOccurrenceId:occurrenceId,storyOccurrenceId:String(spec.storyOccurrenceId),sourceAnchorRef:String(spec.sourceAnchorRef),bindingRef:String(spec.bindingRef),returnToken:spec.returnToken?String(spec.returnToken):null,controllerParticipantId:KAKASHI,oppositionParticipantIds:[...config.opposition],pakkunAuthorized:config.pakkun===true,temporaryPakkun:config.pakkun?{participantRef:PAKKUN,basePL:16,remainingBattlePL:16,ownershipGranted:false,independentInitiative:false}:null,timingGate:clone(config.timingGate),playerActionOpportunityCount:0,countedControllerActionIds:[],packageCustodyDelta:"none",authorityCommit:AUTHORITY_COMMIT,configAuthorityCommit:CONFIG_AUTHORITY_COMMIT,sequentialRegistryCommit:SEQUENTIAL_REGISTRY_COMMIT,sequentialMiPsCombatCommit:SEQUENTIAL_MI_PS_COMBAT_COMMIT,amtRegistryCommit:AMT_REGISTRY_COMMIT,amtCombatCommit:AMT_COMBAT_COMMIT};
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
  dep.oppositionParticipantIds.forEach(id=>{const rem=typeof getBattleRemainingPL==="function"?getBattleRemainingPL("enemy",id):null;participants.push({participantRef:id,combatSourceProfileId:id,derivationProfileId:DERIVATION_PROFILE_IDS[id]||null,side:"opposition",deploymentRole:"hostile",basePLAtEntry:enemyDatabase[id]&&enemyDatabase[id].calibratedBasePL||null,remainingBattlePL:rem,battleStatus:rem!==null&&rem<=0?"defeated":"active",lifeState:"unresolved",custodyState:"unresolved",actionOccurrenceRefs:evidence.filter(e=>e&&e.actorRef&&e.actorRef.participantId===id).map(e=>e.actionId).filter(Boolean)});});
  if(dep.pakkunAuthorized)participants.push({participantRef:PAKKUN,combatSourceProfileId:"pakkun_summon_action_closure",side:"player",deploymentRole:"temporary_action_source",basePLAtEntry:16,remainingBattlePL:dep.temporaryPakkun&&dep.temporaryPakkun.remainingBattlePL||16,battleStatus:"temporary_participation_ended",lifeState:"unresolved",custodyState:"not_applicable",actionOccurrenceRefs:evidence.filter(e=>e&&Array.isArray(e.sourceRefs)&&e.sourceRefs.some(r=>r&&r.id===PAKKUN)).map(e=>e.actionId).filter(Boolean)});
  return{battleConfigId:dep.battleConfigId,battleOccurrenceId:dep.battleOccurrenceId,storyOccurrenceId:dep.storyOccurrenceId,sourceAnchorRef:dep.sourceAnchorRef,bindingRef:dep.bindingRef,resultState:outcome,playerActionOpportunityCount:Number(dep.playerActionOpportunityCount)||0,participants,actionOccurrenceRefs:evidence.map(e=>e&&e.actionId).filter(Boolean),packageCustodyDelta:"none",temporaryParticipationEnded:dep.pakkunAuthorized===true,rewardGranted:false,lootGranted:false,participantDeathCommitted:false,participantCustodyCommitted:false,storyObjectiveCommitted:false,timingGate:clone(dep.timingGate)};
}

function runAcademyKakashiOriginBattleDeployment34300Diagnostics(){
  const registered=registerProfiles();
  const amtActions=enemyDatabase[AMT]&&enemyDatabase[AMT].authoredBattleActions||[];
  const psActions=enemyDatabase[PS]&&enemyDatabase[PS].authoredBattleActions||[];
  const miActions=enemyDatabase[MI]&&enemyDatabase[MI].authoredBattleActions||[];
  const byId=(rows,id)=>rows.find(row=>row&&row.id===id)||null;
  const amtWire=byId(amtActions,"enemy_anbu_style_operative_wire_capture");
  const amtTanto=byId(amtActions,"enemy_anbu_style_operative_tanto_flash");
  const psBurst=byId(psActions,"enemy_fuinjutsu_smuggler_contraband_seal_burst");
  const miBlade=byId(miActions,"enemy_decoy_assassin_concealed_blade");
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_origin_battle_deployment_34300_v2_2026_09_16",
    authorityPinned:AUTHORITY_COMMIT==="6c0037db3531d38890447a4e86c2e7e8c80e6e2e",
    configAuthorityPinned:CONFIG_AUTHORITY_COMMIT==="3f7502e4b41b1f58c88fe83e89f9839ed0607ef4",
    sequentialAuthorityPinned:SEQUENTIAL_REGISTRY_COMMIT==="930c5048453d0034b2856ad3ddfa5ea65fdede7b"&&SEQUENTIAL_MI_PS_COMBAT_COMMIT==="4ef10cc556790a35e692b6a10f2733846809b494"&&AMT_REGISTRY_COMMIT==="0a0bbaf3c3c2395e22977a41da0892a209a73994"&&AMT_COMBAT_COMMIT==="32f79944304ea30689d87a4b1f7b48f84fb2734e",
    tenPublishedConfigs:Object.keys(CONFIGS).length===10,
    exactAMT:!!enemyDatabase[AMT]&&enemyDatabase[AMT].calibratedBasePL===18&&JSON.stringify(enemyDatabase[AMT].baseStats)===JSON.stringify({nin:14,tai:17,buki:19,fuin:10,kin:11,gen:13,stamina:17}),
    exactPS:!!enemyDatabase[PS]&&enemyDatabase[PS].calibratedBasePL===10&&JSON.stringify(enemyDatabase[PS].baseStats)===JSON.stringify({nin:9,tai:7,buki:8,fuin:11,kin:9,gen:6,stamina:10}),
    exactMI:!!enemyDatabase[MI]&&enemyDatabase[MI].calibratedBasePL===14&&JSON.stringify(enemyDatabase[MI].baseStats)===JSON.stringify({nin:11,tai:14,buki:15,fuin:8,kin:8,gen:10,stamina:13}),
    occurrenceSourceNotGeneric:[AMT,PS,MI].every(id=>enemyDatabase[id]&&enemyDatabase[id].provenance&&enemyDatabase[id].provenance.combatSourceProfileId===id&&enemyDatabase[id].provenance.derivationProfileId===DERIVATION_PROFILE_IDS[id]),
    exactActionCounts:amtActions.length===3&&psActions.length===3&&miActions.length===3,
    amtTuning:!!amtTanto&&amtTanto.authoredAttackPL===6&&amtTanto.conditionalBoostAttackPL===2&&amtTanto.conditionalBoostMarker==="silent_body_flicker_position"&&!!amtWire&&amtWire.oncePerBattle===true,
    psTuning:!!psBurst&&psBurst.authoredAttackPL===5,
    miTuning:!!miBlade&&miBlade.authoredAttackPL===5&&miBlade.conditionalBoostAttackPL===2&&miBlade.conditionalBoostMarker==="false_retreat_opening",
    movementControlNotStun:movementControl.toString().includes('movementOnlyControl:true')&&movementControl.toString().includes('blanketStun:false')&&!movementControl.toString().includes('all_actions'),
    amtAiNoWireRefreshLoop:chooseKakashiEnemyAction34300.toString().includes("flickerLive")&&chooseKakashiEnemyAction34300.toString().includes("!originActionUsed34300(wire)")&&chooseKakashiEnemyAction34300.toString().includes("prior===tanto"),
    miAiConsumesOpeningFirst:chooseKakashiEnemyAction34300.toString().includes("openingLive&&ids.includes(blade)"),
    direct3v1Exact:JSON.stringify(CONFIGS.academy_kakashi_origin_battle_amt_ps_mi_3v1.opposition)===JSON.stringify([AMT,PS,MI]),
    improved2v1Exact:JSON.stringify(CONFIGS.academy_kakashi_origin_battle_amt_ps_2v1.opposition)===JSON.stringify([AMT,PS]),
    observePackage2v1Exact:JSON.stringify(CONFIGS.academy_kakashi_origin_battle_ps_mi_2v1.opposition)===JSON.stringify([PS,MI])&&CONFIGS.academy_kakashi_origin_battle_ps_mi_2v1.timingGate===null,
    directMI1v1Untimed:JSON.stringify(CONFIGS.academy_kakashi_origin_battle_mi_1v1.opposition)===JSON.stringify([MI])&&CONFIGS.academy_kakashi_origin_battle_mi_1v1.timingGate===null,
    directPS1v1Untimed:JSON.stringify(CONFIGS.academy_kakashi_origin_battle_ps_1v1.opposition)===JSON.stringify([PS])&&CONFIGS.academy_kakashi_origin_battle_ps_1v1.timingGate===null,
    pakkunNoIndependentInitiative:CONFIGS.academy_kakashi_origin_battle_kakashi_pakkun_vs_amt.pakkun===true&&attemptAcademyKakashiPakkunBattleAction.toString().includes('consumeBattleActionOpportunity("player",kakashi.id')&&attemptAcademyKakashiPakkunBattleAction.toString().includes('actionClass:"temporary_participant_action"'),
    pakkunBiteExact:attemptAcademyKakashiPakkunBattleAction.toString().includes('attackPL:7')&&attemptAcademyKakashiPakkunBattleAction.toString().includes('skill:{id:actionId,excess:null}'),
    timingExact:CONFIGS.academy_kakashi_origin_battle_seq_mi.timingGate.maximumControllerActions===4&&CONFIGS.academy_kakashi_origin_battle_seq_ps.timingGate.maximumControllerActions===3&&CONFIGS.academy_kakashi_origin_battle_seq_amt_pakkun.timingGate===null,
    portraitAuthorityBound:enemyDatabase[AMT].image==="NPC portrait/anbu_marked_target.png"&&enemyDatabase[PS].image==="NPC portrait/package_smuggler.png"&&enemyDatabase[MI].image==="NPC portrait/masked_interceptor.png",
    noLoot:[AMT,PS,MI].every(id=>enemyDatabase[id].rewards&&enemyDatabase[id].rewards.ryo.min===0&&enemyDatabase[id].rewards.commonDrops.length===0),
    compositionUsesExactArray:launchAcademyKakashiOriginPlBattle.toString().includes("configureBattleEnemyParticipants(config.opposition)"),multiOpponentPlInitializedAfterComposition:launchAcademyKakashiOriginPlBattle.toString().includes("initializeBattleRemainingPLFromDeployment({preserveExistingEnemyPower:true})")&&launchAcademyKakashiOriginPlBattle.toString().includes("kakashi_multi_opposition_zero_battle_pl"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,registered,configIds:Object.keys(CONFIGS),browserGoldenClaimed:false};
}

const api=Object.freeze({patchId:PATCH_ID,authorityCommit:AUTHORITY_COMMIT,configAuthorityCommit:CONFIG_AUTHORITY_COMMIT,sequentialRegistryCommit:SEQUENTIAL_REGISTRY_COMMIT,sequentialMiPsCombatCommit:SEQUENTIAL_MI_PS_COMBAT_COMMIT,amtRegistryCommit:AMT_REGISTRY_COMMIT,amtCombatCommit:AMT_COMBAT_COMMIT,configs:CONFIGS,participantRefs:Object.freeze({kakashi:KAKASHI,pakkun:PAKKUN,amt:AMT,packageSmuggler:PS,maskedInterceptor:MI}),registerProfiles,getConfig,launchAcademyKakashiOriginPlBattle,attemptAcademyKakashiPakkunBattleAction,projectAcademyKakashiOriginBattleResult,browserGoldenClaimed:false});
globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300=api;
globalThis.launchAcademyKakashiOriginPlBattle=launchAcademyKakashiOriginPlBattle;
globalThis.attemptAcademyKakashiPakkunBattleAction=attemptAcademyKakashiPakkunBattleAction;
globalThis.projectAcademyKakashiOriginBattleResult=projectAcademyKakashiOriginBattleResult;
globalThis.runAcademyKakashiOriginBattleDeployment34300Diagnostics=runAcademyKakashiOriginBattleDeployment34300Diagnostics;
registerProfiles();
})();