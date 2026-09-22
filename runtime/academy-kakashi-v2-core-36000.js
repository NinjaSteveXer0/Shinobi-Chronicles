// ============================================================================
// ACADEMY KAKASHI V2 — CLEAN-ROOM STATE + COMBAT ADAPTER — 36000
// ============================================================================
(function installAcademyKakashiV2Core36000(){
"use strict";
if(globalThis.SC_KAKASHI_V2_CORE_36000)return;

const PATCH_ID="academy_kakashi_v2_core_36000_2026_09_22";
const STORY_SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const KAKASHI="academy_kakashi";
const MI="academy_kakashi_origin_masked_interceptor";
const PS="academy_kakashi_origin_package_smuggler";
const AMT="academy_kakashi_origin_amt";
const PAKKUN="pakkun_origin_unfamiliar_ninken";
const SUBSTITUTION="academy_kakashi_substitution_jutsu";
const LEGACY_ANALYZE="academy_kakashi_prodigys_read";

const CONFIGS=Object.freeze({
  academy_kakashi_origin_battle_amt_1v1:Object.freeze({opposition:[AMT],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_amt_ps_2v1:Object.freeze({opposition:[AMT,PS],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_amt_ps_mi_3v1:Object.freeze({opposition:[AMT,PS,MI],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_kakashi_pakkun_vs_amt:Object.freeze({opposition:[AMT],pakkun:true,timingGate:null}),
  academy_kakashi_origin_battle_ps_mi_2v1:Object.freeze({opposition:[PS,MI],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_mi_1v1:Object.freeze({opposition:[MI],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_ps_1v1:Object.freeze({opposition:[PS],pakkun:false,timingGate:null}),
  academy_kakashi_origin_battle_seq_mi:Object.freeze({opposition:[MI],pakkun:false,timingGate:{maximumControllerActions:4,stage:"masked_interceptor"}}),
  academy_kakashi_origin_battle_seq_ps:Object.freeze({opposition:[PS],pakkun:false,timingGate:{maximumControllerActions:3,stage:"package_smuggler"}}),
  academy_kakashi_origin_battle_seq_amt_pakkun:Object.freeze({opposition:[AMT],pakkun:true,timingGate:null})
});

const DEFAULT_FACTS=Object.freeze({
  firstAction:null,getCloserOutcome:null,getCloserKnowledge:false,askWhereKnowledge:false,
  packageHolder:"amt",packageStatus:"in_field",packageRecovered:false,packageReturnedToAnbu:false,
  miState:"unseen",psState:"active",amtState:"active",pakkunState:"absent",
  pursuitTarget:null,pursuitOutcome:null,battleResults:[],custodyTransfers:[],lethalHistory:[],
  fieldSecured:[],deliberateReleases:[],exceptionalFieldExecution:false,
  verifiedActionableIntelligence:false,reportComplete:false,terminalReached:false
});

function clone(v){try{return typeof cloneProgressionData==="function"?cloneProgressionData(v):JSON.parse(JSON.stringify(v));}catch(_e){return v;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_e){}}
function player(){if(typeof playerData!=="undefined"&&playerData&&typeof playerData==="object")return playerData;if(!globalThis.playerData)globalThis.playerData={};return globalThis.playerData;}
function now(){return Date.now();}
function stableId(prefix,payload){const raw=JSON.stringify(payload,Object.keys(payload||{}).sort());let h=2166136261;for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619);}return prefix+":"+(h>>>0).toString(16).padStart(8,"0");}
function activeRuntime(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function activeOccurrenceId(){const rt=activeRuntime();if(rt&&rt.sceneId===STORY_SCENE_ID&&rt.occurrenceId)return String(rt.occurrenceId);const root=ensureRoot();return root.occurrenceId||"academy_kakashi_v2_pending_occurrence";}
function ensureRoot(){
  const pd=player();
  if(!pd.academyKakashiV2||typeof pd.academyKakashiV2!=="object")pd.academyKakashiV2={version:2,occurrenceId:null,facts:clone(DEFAULT_FACTS),events:[],factualReceipts:{},rewardReceipts:{},createdAt:now(),updatedAt:now()};
  const root=pd.academyKakashiV2;root.version=2;
  if(!root.facts||typeof root.facts!=="object")root.facts=clone(DEFAULT_FACTS);
  for(const [k,v] of Object.entries(DEFAULT_FACTS))if(root.facts[k]===undefined)root.facts[k]=clone(v);
  if(!Array.isArray(root.events))root.events=[];if(!root.factualReceipts||typeof root.factualReceipts!=="object")root.factualReceipts={};if(!root.rewardReceipts||typeof root.rewardReceipts!=="object")root.rewardReceipts={};return root;
}
function bindOccurrence(occurrenceId){
  const root=ensureRoot(),id=String(occurrenceId||activeOccurrenceId()||"");
  if(!root.occurrenceId&&id)root.occurrenceId=id;
  if(root.occurrenceId&&id&&root.occurrenceId!==id)player().academyKakashiV2={version:2,occurrenceId:id,facts:clone(DEFAULT_FACTS),events:[],factualReceipts:{},rewardReceipts:{},createdAt:now(),updatedAt:now()};
  ensureRoot().occurrenceId=id||ensureRoot().occurrenceId;save();return snapshot();
}
function facts(){return clone(ensureRoot().facts);}
function eventKey(kind,sourceRef){return String(kind||"event")+"::"+String(sourceRef||"");}
function commitFact(patch={},meta={}){
  const root=ensureRoot(),sourceRef=String(meta.sourceRef||stableId("kak-v2-fact",{patch,kind:meta.kind||"fact",occurrenceId:root.occurrenceId})),key=eventKey(meta.kind||"fact",sourceRef);
  const existing=root.events.find(row=>row&&row.key===key);if(existing)return{success:true,idempotent:true,event:clone(existing),facts:clone(root.facts)};
  Object.assign(root.facts,clone(patch));const row={key,sourceRef,kind:String(meta.kind||"fact"),patch:clone(patch),createdAt:now()};root.events.push(row);root.updatedAt=now();save();return{success:true,idempotent:false,event:clone(row),facts:clone(root.facts)};
}
function pushUniqueFactArray(key,value,meta={}){
  const root=ensureRoot(),list=Array.isArray(root.facts[key])?root.facts[key]:[],signature=JSON.stringify(value);
  if(list.some(row=>JSON.stringify(row)===signature))return{success:true,idempotent:true,facts:clone(root.facts)};
  return commitFact({[key]:[...list,clone(value)]},meta);
}
function setParticipantState(participantRef,state,meta={}){
  const map={mi:MI,ps:PS,amt:AMT,masked_interceptor:MI,package_smuggler:PS,anbu_marked_target:AMT},id=map[participantRef]||participantRef,key=id===MI?"miState":id===PS?"psState":id===AMT?"amtState":null;
  if(!key)return{success:false,reason:"kakashi_v2_participant_unknown",participantRef:id};return commitFact({[key]:String(state)},meta);
}
function setPackage(holder,status="in_field",meta={}){const recovered=holder==="kakashi"||holder==="anbu";return commitFact({packageHolder:holder,packageStatus:status,packageRecovered:recovered,packageReturnedToAnbu:holder==="anbu"},meta);}
function snapshot(){return clone(ensureRoot());}

const FACTUAL_BINDINGS=Object.freeze({
  getCloser:"academy_kakashi_v2.resolver.get_closer",
  directPickpocket:"academy_kakashi_v2.resolver.direct_pickpocket",
  improvedPickpocket:"academy_kakashi_v2.resolver.improved_pickpocket",
  secureBeforeAssassin:"academy_kakashi_v2.resolver.secure_before_assassin",
  amtPursuit:"academy_kakashi_v2.resolver.amt_pursuit",
  psPursuit:"academy_kakashi_v2.resolver.ps_pursuit",
  securePackageAmtPursuit:"academy_kakashi_v2.resolver.secure_package_amt_pursuit"
});
function registerFactualBindings(){
  if(typeof registerStoryFactualResolverBinding!=="function")return{success:false,reason:"neutral_story_factual_resolver_missing"};
  const pairs=[
    [FACTUAL_BINDINGS.getCloser,["SUCCESS","FAILURE"]],[FACTUAL_BINDINGS.directPickpocket,["SUCCESS","FAILURE"]],
    [FACTUAL_BINDINGS.improvedPickpocket,["SUCCESS","FAILURE"]],[FACTUAL_BINDINGS.secureBeforeAssassin,["SUCCESS","FAILURE"]],
    [FACTUAL_BINDINGS.amtPursuit,["SUCCESS_REACHED","FAILURE_ESCAPED"]],[FACTUAL_BINDINGS.psPursuit,["SUCCESS_REACHED","FAILURE_ESCAPED"]],
    [FACTUAL_BINDINGS.securePackageAmtPursuit,["SUCCESS_REACHED","FAILURE_ESCAPED"]]
  ];
  const rows=[];
  for(const [bindingRef,outcomes] of pairs)rows.push(registerStoryFactualResolverBinding(bindingRef,{ownerRef:"academy_kakashi_v2_story",authorityVersionRefs:["academy-kakashi-writing-closure-2026-09-20"],outcomes:outcomes.map((outcomeRef,index)=>({outcomeRef,authoredOrder:index,resultPayloadTemplate:{outcome:outcomeRef}})),metadata:{storyUnitRef:"academy_kakashi",stableOccurrenceScopedSelection:true,noMathRandom:true}}));
  return{success:rows.every(row=>row&&row.success===true),rows};
}
function resolveFactual(bindingRef,anchorRef,options={}){
  if(typeof resolveStoryFactualAction!=="function")return{success:false,reason:"neutral_story_factual_resolver_missing"};
  const root=ensureRoot(),occurrenceId=String(root.occurrenceId||activeOccurrenceId()),idempotenceKey="kak-v2-factual::"+occurrenceId+"::"+String(anchorRef);
  const result=resolveStoryFactualAction({bindingRef,storyDecisionReceiptId:"kak-v2-story-choice::"+occurrenceId+"::"+String(anchorRef),actorRef:KAKASHI,idempotenceKey,committedAtOccurrenceRef:occurrenceId,inputStateRefs:[String(anchorRef)],state:clone(root.facts),context:{storySceneId:STORY_SCENE_ID,anchorRef:String(anchorRef)},eligibleOutcomeRefs:Array.isArray(options.eligibleOutcomeRefs)?options.eligibleOutcomeRefs:undefined});
  if(result&&result.success===true){root.factualReceipts[idempotenceKey]=clone(result.receipt);root.updatedAt=now();save();}return result;
}

function installSubstitutionSkill(){
  try{
    if(typeof CLOSURE_WAVE_1_BATTLE_SKILL_DATABASE==="object"&&CLOSURE_WAVE_1_BATTLE_SKILL_DATABASE)CLOSURE_WAVE_1_BATTLE_SKILL_DATABASE[SUBSTITUTION]={id:SUBSTITUTION,displayName:"Substitution Jutsu",ownerRegistryId:KAKASHI,primaryDiscipline:"Ninjutsu",targetMode:"self",actionClass:"defensive_technique",resolutionKind:"ratio_guard_state",staminaMitigation:null,traits:["once_per_battle","qualifying_direct_hit_only","pre_stamina_prevention","no_extra_action","no_evasion_inference"],requirements:[],guard:{stateKey:"academy_kakashi_substitution_guard",preventionRatio:0.50,attackMultiplier:0.50,oneUse:true}};
    if(typeof PRODUCTION_PREPARED_SKILL_PALETTES==="object"&&Array.isArray(PRODUCTION_PREPARED_SKILL_PALETTES[KAKASHI]))PRODUCTION_PREPARED_SKILL_PALETTES[KAKASHI]=PRODUCTION_PREPARED_SKILL_PALETTES[KAKASHI].map(id=>id===LEGACY_ANALYZE?SUBSTITUTION:id);
    if(typeof characterRegistry==="object"&&characterRegistry&&characterRegistry[KAKASHI]&&Array.isArray(characterRegistry[KAKASHI].exactPreparedSkillIds))characterRegistry[KAKASHI].exactPreparedSkillIds=characterRegistry[KAKASHI].exactPreparedSkillIds.map(id=>id===LEGACY_ANALYZE?SUBSTITUTION:id);
    return{success:true};
  }catch(error){return{success:false,reason:"kakashi_v2_substitution_install_failed",detail:String(error&&error.message||error)};}
}

function battleRuntimeAvailable(){return typeof enemyDatabase==="object"&&enemyDatabase&&typeof makeEnemyFixedDamageAction==="function"&&typeof addBattleTransientState==="function";}
function transient(side,participantId,stateKey){try{return typeof findBattleTransientState==="function"?findBattleTransientState({stateKey,targetSide:side,targetParticipantId:participantId}):null;}catch(_e){return null;}}
function originBattleState(){if(typeof currentBattle==="undefined"||!currentBattle)return null;currentBattle.kakashiV2Combat=currentBattle.kakashiV2Combat&&typeof currentBattle.kakashiV2Combat==="object"?currentBattle.kakashiV2Combat:{usedActionIds:[],lastEnemyActionByParticipant:{}};return currentBattle.kakashiV2Combat;}
function usedAction(actionId){const row=originBattleState();return !!(row&&Array.isArray(row.usedActionIds)&&row.usedActionIds.includes(String(actionId)));}
function markUsed(actionId){const row=originBattleState();if(!row)return;row.usedActionIds=Array.isArray(row.usedActionIds)?row.usedActionIds:[];if(!row.usedActionIds.includes(String(actionId)))row.usedActionIds.push(String(actionId));}
function directAction(id,attackPL,discipline,boostState=null,boost=0){
  return{id,skillId:id,actionClass:"enemy_authored_action",primaryDiscipline:discipline||null,targetMode:"current_enemy",traits:["academy_kakashi_v2_exact_action"],authoredAttackPL:attackPL,resolve(args){const marker=boostState&&args&&args.enemy?transient("enemy",args.enemy.id,boostState):null,finalPL=attackPL+(marker?boost:0),action=makeEnemyFixedDamageAction(id,finalPL,{primaryDiscipline:discipline||null}),result=action.resolve(args);if(marker&&typeof removeBattleTransientState==="function")removeBattleTransientState(marker.stateId);return{...result,authoredAttackPL:finalPL,baseAuthoredAttackPL:attackPL,conditionalBoostApplied:!!marker};}};
}
function setupAction(id,stateKey,discipline=null){
  return{id,skillId:id,actionClass:"enemy_setup_technique",primaryDiscipline:discipline,targetMode:"self",traits:["setup_only","no_extra_action"],authoredAttackPL:0,evaluateAvailability({enemy}){return enemy&&!transient("enemy",enemy.id,stateKey)?{available:true}:{available:false,reason:stateKey+"_already_live"};},resolve({enemy,envelope}){if(!enemy)return{resolved:false,reason:"enemy_missing"};const state=addBattleTransientState({stateKey,sourceSide:"enemy",sourceParticipantId:enemy.id,targetSide:"enemy",targetParticipantId:enemy.id,ownerRef:{type:"skill",id},data:{sourceSkillId:id,noExtraAction:true,activationActionId:envelope&&envelope.actionId||null}});return{resolved:!!state,branch:"setup",damageApplied:false,stateRefs:state?[state.stateId]:[],conditionRefs:[]};}};
}
function movementControlAction(id,conditionKey,discipline,{oncePerBattle=false}={}){
  return{id,skillId:id,actionClass:"enemy_control_technique",primaryDiscipline:discipline,targetMode:"current_enemy",traits:["movement_only_control","not_generic_stun","no_custody_inference"],authoredAttackPL:0,evaluateAvailability({enemy,target}){if(oncePerBattle&&usedAction(id))return{available:false,reason:conditionKey+"_once_per_battle_used"};if(!enemy||!target)return{available:false,reason:"control_target_missing"};try{const live=typeof getBattleParticipantConditions==="function"?getBattleParticipantConditions("player",target.id).some(c=>c&&c.conditionKey===conditionKey&&c.sourceRef&&c.sourceRef.participantId===enemy.id):false;return live?{available:false,reason:conditionKey+"_already_live"}:{available:true};}catch(_e){return{available:true};}},resolve({enemy,target,envelope}){if(!enemy||!target||typeof createAlphaMovementControlCondition!=="function")return{resolved:false,reason:"movement_control_runtime_missing"};const applied=createAlphaMovementControlCondition({conditionKey,conditionType:"physical_restraint",sourceSide:"enemy",sourceParticipantId:enemy.id,sourceRefs:[{type:"story_battle_occurrence_participant",id:enemy.id,role:"combat_authority"}],sourceSkillId:id,actionId:envelope&&envelope.actionId||null,targetSide:"player",targetParticipantId:target.id,strength:0,resolverDiscipline:discipline,durationActionOpportunities:1,extraData:{sourceOwned:true,blanketStun:false,noDirectBattlePLDamage:true,movementOnlyControl:true,noCustodyInference:true}});if(applied&&applied.condition&&oncePerBattle)markUsed(id);return{resolved:!!(applied&&applied.condition),branch:"movement_control",damageApplied:false,conditionRefs:applied&&applied.condition?[applied.condition.conditionId]:[],stateRefs:[]};}};
}
function decoySubstitutionAction(){
  const id="enemy_decoy_assassin_decoy_substitution";
  return{id,skillId:id,actionClass:"enemy_defensive_setup",targetMode:"self",traits:["one_use_guard","pre_stamina_prevention","not_evasion"],authoredAttackPL:0,evaluateAvailability({enemy}){if(!enemy||usedAction(id))return{available:false,reason:"decoy_substitution_used_or_enemy_missing"};const max=typeof getBattleMaximumPL==="function"?Number(getBattleMaximumPL("enemy",enemy.id)||0):0,rem=typeof getBattleRemainingPL==="function"?Number(getBattleRemainingPL("enemy",enemy.id)||0):0;return max>0&&rem<=max*.5&&!transient("enemy",enemy.id,"decoy_assassin_guard")?{available:true}:{available:false,reason:"decoy_substitution_threshold"};},resolve({enemy,envelope}){if(!enemy)return{resolved:false,reason:"enemy_missing"};const state=addBattleTransientState({stateKey:"decoy_assassin_guard",sourceSide:"enemy",sourceParticipantId:enemy.id,targetSide:"enemy",targetParticipantId:enemy.id,ownerRef:{type:"skill",id},data:{sourceSkillId:id,attackMultiplier:.75,preventionRatio:.25,oneUse:true,requiresDirectAttackPLPacket:true,preStamina:true,notEvasion:true,activationActionId:envelope&&envelope.actionId||null}});if(state)markUsed(id);return{resolved:!!state,branch:"guard",damageApplied:false,stateRefs:state?[state.stateId]:[],conditionRefs:[]};}};
}
function sealReleaseAction(){
  const id="enemy_fuinjutsu_smuggler_seal_release";
  return{id,skillId:id,actionClass:"enemy_support",primaryDiscipline:"Fuinjutsu",targetMode:"self",traits:["bounded_cleanse"],authoredAttackPL:0,evaluateAvailability({enemy}){if(!enemy||typeof ensureBattleRuntimeState!=="function")return{available:false,reason:"battle_runtime_missing"};const rt=ensureBattleRuntimeState(),found=(rt.conditions||[]).find(c=>c&&c.targetRef&&c.targetRef.side==="enemy"&&c.targetRef.participantId===enemy.id&&c.data&&c.data.smuggler_seal_release_compatible===true);return found?{available:true}:{available:false,reason:"no_compatible_state"};},resolve({enemy}){if(!enemy||typeof ensureBattleRuntimeState!=="function")return{resolved:false,reason:"battle_runtime_missing"};const rt=ensureBattleRuntimeState(),found=(rt.conditions||[]).find(c=>c&&c.targetRef&&c.targetRef.side==="enemy"&&c.targetRef.participantId===enemy.id&&c.data&&c.data.smuggler_seal_release_compatible===true);if(!found||typeof removeBattleCondition!=="function")return{resolved:false,reason:"no_compatible_state"};const removed=removeBattleCondition(found.conditionId,{reason:id,removerRef:{side:"enemy",participantId:enemy.id}});return{resolved:removed===true,branch:"seal_release",damageApplied:false,conditionRefs:[found.conditionId],stateRefs:[]};}};
}
function registerOpposition(){
  if(!battleRuntimeAvailable())return{success:false,reason:"battle_runtime_authority_missing"};
  const zeroRewards={ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]};
  enemyDatabase[MI]={...(enemyDatabase[MI]||{}),id:MI,name:"MASKED INTERCEPTOR",rank:"Story Opposition",power:14,calibratedBasePL:14,baseStats:{nin:11,tai:14,buki:15,fuin:8,kin:8,gen:10,stamina:13},stats:{nin:11,tai:14,buki:15,fuin:8,kin:8,gen:10,stamina:13},image:"NPC portrait/masked_interceptor.png",rewards:clone(zeroRewards)};
  enemyDatabase[PS]={...(enemyDatabase[PS]||{}),id:PS,name:"PACKAGE SMUGGLER",rank:"Story Opposition",power:10,calibratedBasePL:10,baseStats:{nin:9,tai:7,buki:8,fuin:11,kin:9,gen:6,stamina:10},stats:{nin:9,tai:7,buki:8,fuin:11,kin:9,gen:6,stamina:10},image:"NPC portrait/package_smuggler.png",rewards:clone(zeroRewards)};
  enemyDatabase[AMT]={...(enemyDatabase[AMT]||{}),id:AMT,name:"ANBU MARKED TARGET",rank:"Story Opposition",power:18,calibratedBasePL:18,baseStats:{nin:14,tai:17,buki:19,fuin:10,kin:11,gen:13,stamina:17},stats:{nin:14,tai:17,buki:19,fuin:10,kin:11,gen:13,stamina:17},image:"NPC portrait/anbu_marked_target.png",rewards:clone(zeroRewards)};
  enemyDatabase[MI].authoredBattleActions=[decoySubstitutionAction(),setupAction("enemy_decoy_assassin_false_retreat","false_retreat_opening",null),directAction("enemy_decoy_assassin_concealed_blade",5,"Bukijutsu","false_retreat_opening",2)];
  enemyDatabase[PS].authoredBattleActions=[sealReleaseAction(),movementControlAction("enemy_fuinjutsu_smuggler_binding_tag","binding_tag","Fuinjutsu"),directAction("enemy_fuinjutsu_smuggler_contraband_seal_burst",5,"Fuinjutsu")];
  enemyDatabase[AMT].authoredBattleActions=[movementControlAction("enemy_anbu_style_operative_wire_capture","wire_capture","Bukijutsu",{oncePerBattle:true}),setupAction("enemy_anbu_style_operative_silent_body_flicker","silent_body_flicker_position","Ninjutsu"),directAction("enemy_anbu_style_operative_tanto_flash",6,"Bukijutsu","silent_body_flicker_position",2)];
  return{success:true,participantIds:[MI,PS,AMT]};
}

const PRE_CHOOSE=typeof chooseEnemyAuthoredBattleAction==="function"?chooseEnemyAuthoredBattleAction:null;
function chooseEnemyActionV2(schedulerState=null){
  const state=schedulerState&&schedulerState.ready===true?schedulerState:(typeof evaluateEnemyActionScheduler==="function"?evaluateEnemyActionScheduler():null);
  if(!state||state.ready!==true)return PRE_CHOOSE?PRE_CHOOSE(schedulerState):{success:false,reason:"enemy_scheduler_unavailable"};
  const battle=typeof currentBattle!=="undefined"?currentBattle:null;if(!battle||!battle.kakashiV2Deployment)return PRE_CHOOSE?PRE_CHOOSE(state):{success:false,reason:"enemy_scheduler_authority_missing"};
  const eligible=Array.isArray(state.eligibleActions)?state.eligibleActions:[],ids=eligible.map(a=>a&&a.id).filter(Boolean),pick=id=>eligible.find(a=>a&&a.id===id)||null;let chosen=null;
  if(state.enemyId===MI){if(transient("enemy",MI,"false_retreat_opening")&&ids.includes("enemy_decoy_assassin_concealed_blade"))chosen="enemy_decoy_assassin_concealed_blade";else if(ids.includes("enemy_decoy_assassin_decoy_substitution"))chosen="enemy_decoy_assassin_decoy_substitution";else if(ids.includes("enemy_decoy_assassin_false_retreat"))chosen="enemy_decoy_assassin_false_retreat";else if(ids.includes("enemy_decoy_assassin_concealed_blade"))chosen="enemy_decoy_assassin_concealed_blade";}
  else if(state.enemyId===PS)chosen=["enemy_fuinjutsu_smuggler_seal_release","enemy_fuinjutsu_smuggler_binding_tag","enemy_fuinjutsu_smuggler_contraband_seal_burst"].find(id=>ids.includes(id))||null;
  else if(state.enemyId===AMT){const combat=originBattleState(),last=combat&&combat.lastEnemyActionByParticipant&&combat.lastEnemyActionByParticipant[AMT]||null;if(transient("enemy",AMT,"silent_body_flicker_position")&&ids.includes("enemy_anbu_style_operative_tanto_flash"))chosen="enemy_anbu_style_operative_tanto_flash";else if(!usedAction("enemy_anbu_style_operative_wire_capture")&&ids.includes("enemy_anbu_style_operative_wire_capture"))chosen="enemy_anbu_style_operative_wire_capture";else if(last==="enemy_anbu_style_operative_tanto_flash"&&ids.includes("enemy_anbu_style_operative_silent_body_flicker"))chosen="enemy_anbu_style_operative_silent_body_flicker";else if(ids.includes("enemy_anbu_style_operative_tanto_flash"))chosen="enemy_anbu_style_operative_tanto_flash";else if(ids.includes("enemy_anbu_style_operative_silent_body_flicker"))chosen="enemy_anbu_style_operative_silent_body_flicker";}
  const action=chosen?pick(chosen):null;return action?{success:true,action,eligibleActionIds:ids,randomnessAppliedAfterEligibility:false,equalSelectionWeight:false,deterministicKakashiV2AI:true}:PRE_CHOOSE?PRE_CHOOSE(state):{success:false,reason:"no_semantically_eligible_enemy_action"};
}
if(PRE_CHOOSE){globalThis.chooseEnemyAuthoredBattleAction=chooseEnemyActionV2;try{chooseEnemyAuthoredBattleAction=chooseEnemyActionV2;}catch(_e){}}

const PRE_CONSUME=typeof consumeBattleActionOpportunity==="function"?consumeBattleActionOpportunity:null;
function consumeActionOpportunityV2(side,participantId,actionId,reason){
  const battle=typeof currentBattle!=="undefined"?currentBattle:null;
  if(battle&&battle.kakashiV2Deployment&&side==="player"&&participantId===KAKASHI){const dep=battle.kakashiV2Deployment;dep.countedControllerActionIds=Array.isArray(dep.countedControllerActionIds)?dep.countedControllerActionIds:[];if(actionId&&!dep.countedControllerActionIds.includes(String(actionId))){dep.countedControllerActionIds.push(String(actionId));dep.playerActionOpportunityCount=Number(dep.playerActionOpportunityCount||0)+1;}}
  const result=PRE_CONSUME?PRE_CONSUME.apply(this,arguments):{};
  if(battle&&battle.kakashiV2Deployment&&side==="enemy"&&participantId){const combat=originBattleState();if(combat){combat.lastEnemyActionByParticipant=combat.lastEnemyActionByParticipant||{};combat.lastEnemyActionByParticipant[participantId]=String(actionId||"");}}
  return result;
}
if(PRE_CONSUME){globalThis.consumeBattleActionOpportunity=consumeActionOpportunityV2;try{consumeBattleActionOpportunity=consumeActionOpportunityV2;}catch(_e){}}

function getBattleConfig(id){const row=CONFIGS[String(id||"")];return row?{id:String(id),...clone(row)}:null;}
function launchBattle(spec={}){
  const config=getBattleConfig(spec.battleConfigId);if(!config)return{success:false,reason:"kakashi_v2_battle_config_unknown",battleConfigId:spec.battleConfigId||null};
  if(typeof launchBattleWithReturnContext!=="function"||typeof configureBattleEnemyParticipants!=="function")return{success:false,reason:"battle_deployment_api_missing"};
  const rt=activeRuntime();if(!rt||rt.sceneId!==STORY_SCENE_ID)return{success:false,reason:"kakashi_v2_story_scene_not_active"};
  const returnContext={...(spec.returnContext||{}),type:"story_scene",sceneId:STORY_SCENE_ID,occurrenceId:rt.occurrenceId,returnToken:spec.returnToken||null,battleConfigId:config.id};
  const launched=launchBattleWithReturnContext(config.opposition[0],config.id,returnContext);if(!launched||launched.success!==true)return launched||{success:false,reason:"kakashi_v2_battle_launch_failed"};
  const composed=configureBattleEnemyParticipants(config.opposition),ids=(composed||[]).map(row=>row&&row.id).filter(Boolean);if(JSON.stringify(ids)!==JSON.stringify(config.opposition))return{success:false,reason:"kakashi_v2_opposition_composition_failed",expected:config.opposition,actual:ids};
  const battle=typeof currentBattle!=="undefined"?currentBattle:null;if(!battle)return{success:false,reason:"battle_state_missing_after_launch"};
  battle.encounterId=config.id;battle.kakashiV2Deployment={battleConfigId:config.id,battleOccurrenceId:battle.battleId,storyOccurrenceId:rt.occurrenceId,controllerParticipantId:KAKASHI,oppositionParticipantIds:[...config.opposition],pakkunAuthorized:config.pakkun===true,temporaryPakkun:config.pakkun?{participantRef:PAKKUN,basePL:16,remainingBattlePL:16,ownershipGranted:false,independentInitiative:false}:null,timingGate:clone(config.timingGate),playerActionOpportunityCount:0,countedControllerActionIds:[]};battle.kakashiV2Combat={usedActionIds:[],lastEnemyActionByParticipant:{}};try{if(typeof saveTestState==="function")saveTestState();}catch(_e){}return{success:true,battleId:battle.battleId,encounterId:config.id,battleConfigId:config.id,oppositionParticipantIds:[...config.opposition],pakkunTemporaryParticipation:config.pakkun===true};
}
function projectBattleResult(battleState=null){
  const battle=battleState||(typeof currentBattle!=="undefined"?currentBattle:null),dep=battle&&battle.kakashiV2Deployment;if(!battle||!dep)return null;
  const outcome=battle.outcome&&battle.outcome.type==="victory"?"victory":battle.outcome&&battle.outcome.type==="defeat"?"defeat":null,gate=dep.timingGate,actions=Number(dep.playerActionOpportunityCount||0);
  return{battleConfigId:dep.battleConfigId,battleOccurrenceId:dep.battleOccurrenceId||battle.battleId,resultState:outcome,controllerActionCount:actions,timingGate:clone(gate),timingGateMet:gate&&Number.isFinite(Number(gate.maximumControllerActions))?outcome==="victory"&&actions<=Number(gate.maximumControllerActions):null,oppositionParticipantIds:[...(dep.oppositionParticipantIds||[])],pakkunAuthorized:dep.pakkunAuthorized===true};
}
function commitBattleResultToFacts(){const projected=projectBattleResult();if(!projected||!projected.resultState)return{success:false,reason:"kakashi_v2_battle_result_unavailable"};const root=ensureRoot();if((root.facts.battleResults||[]).some(row=>row&&row.battleOccurrenceId===projected.battleOccurrenceId))return{success:true,idempotent:true,result:projected};pushUniqueFactArray("battleResults",projected,{kind:"battle_result",sourceRef:projected.battleOccurrenceId});return{success:true,idempotent:false,result:projected};}
function attemptPakkunAction(actionId,{targetParticipantId=null}={}){
  const battle=typeof currentBattle!=="undefined"?currentBattle:null,dep=battle&&battle.kakashiV2Deployment;if(!battle||!dep||dep.pakkunAuthorized!==true)return{success:false,reason:"pakkun_temporary_participation_not_authorized"};
  if(!["pakkun_nipping_bite","pakkun_tracking_scent","pakkun_field_guide"].includes(actionId))return{success:false,reason:"pakkun_action_not_authorized"};
  const kakashi=typeof getBattleDeploymentParticipant==="function"?getBattleDeploymentParticipant("player",1):null,target=targetParticipantId&&typeof getBattleParticipantByIdentity==="function"?getBattleParticipantByIdentity("enemy",targetParticipantId):(typeof getBattleDeploymentParticipant==="function"?getBattleDeploymentParticipant("enemy",1):null);if(!kakashi)return{success:false,reason:"kakashi_controller_missing"};
  const damaging=actionId==="pakkun_nipping_bite";if(damaging&&!target)return{success:false,reason:"pakkun_target_missing"};
  const envelope=createBattleActionEnvelope({actorSide:"player",actorParticipantId:kakashi.id,targetSide:damaging?"enemy":null,targetParticipantId:damaging?target.id:null,actionClass:"temporary_participant_action",skillId:actionId,sourceRefs:[{type:"temporary_story_battle_participant",id:PAKKUN,role:"action_owner"}],data:{temporaryParticipantRef:PAKKUN,noIndependentInitiative:true,controllerParticipantId:KAKASHI}}),entry=beginBattleActionResolution(envelope);if(!entry||entry.accepted!==true)return{success:false,reason:entry&&entry.validation&&entry.validation.reason||"pakkun_action_rejected"};
  let resolution;if(damaging){const output={primaryDiscipline:null,statKey:null,effectivePrimaryDiscipline:null,coefficient:null,branch:"pakkun_nipping_bite",branchMultiplier:1,authoredPreExecutionMagnitude:7,weaponExecutionMultiplier:1,preDefenseAttackMagnitude:7,attackPL:7,fixedCalibration:true},damage=resolveBattleDamagePacket({envelope,skill:{id:actionId},actorSide:"player",actorParticipantId:kakashi.id,targetSide:"enemy",targetParticipantId:target.id,output,mitigable:true,stateRefs:[]});resolution={resolved:!!damage,damageApplied:!!damage,finalDamage:Number(damage&&damage.finalDamage)||0};}
  else{resolution={resolved:true,damageApplied:false,finalDamage:0,boundedInformationOnly:true,noHiddenTruthReveal:true};try{if(typeof recordBattleEvidence==="function")recordBattleEvidence({eventType:actionId==="pakkun_tracking_scent"?"pakkun_tracking_clue":"pakkun_field_guidance",committedOccurrence:true,actionId:envelope.actionId,actorRef:{type:"temporary_story_battle_participant",id:PAKKUN},skillId:actionId,sourceRefs:envelope.sourceRefs,data:{boundedEvidenceOnly:true,hiddenTruthRevealed:false,ownershipGranted:false}});}catch(_e){}}
  if(resolution.resolved===true)consumeBattleActionOpportunity("player",kakashi.id,envelope.actionId,"valid_pakkun_temporary_action_completed");try{if(typeof saveTestState==="function")saveTestState();}catch(_e){}return{success:resolution.resolved===true,envelope,resolution,temporaryParticipantRef:PAKKUN,actionOpportunityConsumed:resolution.resolved===true};
}
function diagnostics(){
  const mi=typeof enemyDatabase==="object"&&enemyDatabase?enemyDatabase[MI]:null,ps=typeof enemyDatabase==="object"&&enemyDatabase?enemyDatabase[PS]:null,amt=typeof enemyDatabase==="object"&&enemyDatabase?enemyDatabase[AMT]:null,palette=typeof PRODUCTION_PREPARED_SKILL_PALETTES==="object"?PRODUCTION_PREPARED_SKILL_PALETTES[KAKASHI]:null;
  const checks={exactTenBattleConfigs:Object.keys(CONFIGS).length===10,exactParticipantPL:!!mi&&mi.power===14&&!!ps&&ps.power===10&&!!amt&&amt.power===18,exactMiStats:JSON.stringify(mi&&mi.baseStats)===JSON.stringify({nin:11,tai:14,buki:15,fuin:8,kin:8,gen:10,stamina:13}),exactPsStats:JSON.stringify(ps&&ps.baseStats)===JSON.stringify({nin:9,tai:7,buki:8,fuin:11,kin:9,gen:6,stamina:10}),exactAmtStats:JSON.stringify(amt&&amt.baseStats)===JSON.stringify({nin:14,tai:17,buki:19,fuin:10,kin:11,gen:13,stamina:17}),sequentialGates:CONFIGS.academy_kakashi_origin_battle_seq_mi.timingGate.maximumControllerActions===4&&CONFIGS.academy_kakashi_origin_battle_seq_ps.timingGate.maximumControllerActions===3&&CONFIGS.academy_kakashi_origin_battle_seq_amt_pakkun.timingGate===null,substitutionInstalled:Array.isArray(palette)&&palette.length===5&&palette[4]===SUBSTITUTION&&!palette.includes(LEGACY_ANALYZE),directRoutesNoInheritedGate:CONFIGS.academy_kakashi_origin_battle_mi_1v1.timingGate===null&&CONFIGS.academy_kakashi_origin_battle_ps_1v1.timingGate===null&&CONFIGS.academy_kakashi_origin_battle_amt_1v1.timingGate===null,noDomOwnership:!commitFact.toString().includes("document.")&&!launchBattle.toString().includes("document."),browserGoldenClaimed:false};
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const rt=activeRuntime();if(rt&&rt.sceneId===STORY_SCENE_ID)bindOccurrence(rt.occurrenceId);
const factualRegistration=registerFactualBindings(),substitutionRegistration=installSubstitutionSkill(),oppositionRegistration=registerOpposition();

globalThis.SC_KAKASHI_V2_CORE_36000=Object.freeze({patchId:PATCH_ID,storySceneId:STORY_SCENE_ID,ids:Object.freeze({kakashi:KAKASHI,mi:MI,ps:PS,amt:AMT,pakkun:PAKKUN}),configs:CONFIGS,factualBindings:FACTUAL_BINDINGS,bindOccurrence,facts,snapshot,commitFact,pushUniqueFactArray,setParticipantState,setPackage,registerFactualBindings,resolveFactual,getBattleConfig,launchBattle,projectBattleResult,commitBattleResultToFacts,attemptPakkunAction,factualRegistration,substitutionRegistration,oppositionRegistration,browserGoldenClaimed:false});
globalThis.runAcademyKakashiV2Core36000Diagnostics=diagnostics;
})();
