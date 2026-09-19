// ============================================================================
// ISSUE #188 / #197 / #199 — ACADEMY KAKASHI ORIGIN REWARD ADAPTER — 34800
//
// Context-specific consumer of existing Progression / Inventory / Reward owners.
// It does NOT create a second reward, Inventory or Progression system.
// It supplies source-scoped/idempotent Kakashi Origin receipts and routes the
// closed owner values into the existing canonical mutation APIs.
//
// Battle victory != terminal Origin/debrief reward entitlement. The exact solo
// Kakashi-vs-Masked-Interceptor victory now has its own immediate Battle reward
// class under fe715e81cb76b3c4e4a7a8ccbc48ae04bc3b99da. Terminal debrief rewards
// remain separately evaluated/committed only from exact factual input.
// ============================================================================
(function installAcademyKakashiOriginRewards34800(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_ORIGIN_REWARDS_34800)return;

const PATCH_ID="alpha_kakashi_origin_rewards_34800_v5_2026_09_19";
const ROUTE="academy_kakashi_origin_reward";
const KAKASHI="academy_kakashi";
const ITEM_SOURCE="kak_origin_item_field_recovery_resupply";
const WEAPON_SOURCE="kak_origin_weapon_exceptional_training_tanto";
const ITEM_ID="field_recovery_pill";
const WEAPON_ID="academy_training_tanto";
const TERMINAL_SOURCE="kak_origin_terminal_debrief_reward";
const MI_REWARD_AUTHORITY_COMMIT="fe715e81cb76b3c4e4a7a8ccbc48ae04bc3b99da";
const MI_REWARD_FAMILY="kak_origin_battle_mi_victory_reward_v1";
const MI_REWARD_CLAIM_FAMILY="kak_origin_battle_mi_victory_reward_claim_v1";
const MI_RYO_SOURCE="kak_origin_battle_mi_victory_ryo_01";
const MI_BATTLE_CONFIG="academy_kakashi_origin_battle_mi_1v1";
const MI_PARTICIPANT="academy_kakashi_origin_masked_interceptor";
const MI_REWARD_RYO=50;
const DISCIPLINE_ID=Object.freeze({ninjutsu:"nin",taijutsu:"tai",genjutsu:"gen",bukijutsu:"buki",fuinjutsu:"fuin",kinjutsu:"kin",stamina:"stamina"});
const ACTION_DERIVED_DISCIPLINE_SOURCE="action_derived_development";
const ACTION_DERIVED_DISCIPLINE_IDS=new Set(Object.values(DISCIPLINE_ID));
const WORLD_AUTHORITY_COMMIT="91f5969b20e270b3ef7d148342f28a1668b4eba1";
const COMBAT_AUTHORITY_COMMIT="e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8";
const PROGRESSION_AUTHORITY_COMMIT="54314cc29e1374783cae0a0d90654cc9a2316a45";
const ACQUISITION_AUTHORITY_COMMIT="b83884adb70f1e74e62f96ab96848c1ec33704f9";

function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(_error){return v;}}
function installActionDerivedDisciplineSourceGate34800(){
  if(typeof registerDisciplineTrainingSource!=="function")return false;
  const result=registerDisciplineTrainingSource(ACTION_DERIVED_DISCIPLINE_SOURCE,[...ACTION_DERIVED_DISCIPLINE_IDS]);
  return !!(result&&result.success===true);
}
const ACTION_DERIVED_SOURCE_GATE_INSTALLED=installActionDerivedDisciplineSourceGate34800();
function ensureRoot(){
  if(typeof playerData!=="object"||!playerData)return null;
  playerData.kakashiOriginRewardReceipts=playerData.kakashiOriginRewardReceipts&&typeof playerData.kakashiOriginRewardReceipts==="object"?playerData.kakashiOriginRewardReceipts:{};
  const root=playerData.kakashiOriginRewardReceipts;
  root.route=ROUTE;
  root.sources=root.sources&&typeof root.sources==="object"?root.sources:{};
  root.battleDisciplineTotals=root.battleDisciplineTotals&&typeof root.battleDisciplineTotals==="object"?root.battleDisciplineTotals:{};
  root.battleStaminaTotals=root.battleStaminaTotals&&typeof root.battleStaminaTotals==="object"?root.battleStaminaTotals:{};
  root.fieldcraft=root.fieldcraft&&typeof root.fieldcraft==="object"?root.fieldcraft:{};
  root.entitlements=root.entitlements&&typeof root.entitlements==="object"?root.entitlements:{};
  root.grants=root.grants&&typeof root.grants==="object"?root.grants:{};
  root.battleEntitlements=root.battleEntitlements&&typeof root.battleEntitlements==="object"?root.battleEntitlements:{};
  root.battleRewardComponents=root.battleRewardComponents&&typeof root.battleRewardComponents==="object"?root.battleRewardComponents:{};
  root.battleClaims=root.battleClaims&&typeof root.battleClaims==="object"?root.battleClaims:{};
  return root;
}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}try{if(typeof saveTestState==="function")saveTestState();}catch(_error){}}
function sourceKey(kind,sourceId,subjectId=KAKASHI){return `${ROUTE}::${String(kind||"")}::${String(sourceId||"")}::${String(subjectId||"")}`;}
function sourceReceipt(kind,sourceId,subjectId=KAKASHI){const root=ensureRoot();return root&&root.sources[sourceKey(kind,sourceId,subjectId)]||null;}
function registerSource(kind,sourceId,payload={}){
  const root=ensureRoot();if(!root||!sourceId)return{success:false,reason:"kakashi_reward_receipt_store_missing"};
  const subjectId=String(payload.subjectId||KAKASHI),key=sourceKey(kind,sourceId,subjectId);
  if(root.sources[key])return{success:true,idempotent:true,receipt:clone(root.sources[key])};
  const receipt={sourceKey:key,route:ROUTE,kind:String(kind),sourceId:String(sourceId),subjectId,payload:clone(payload),authority:{world:WORLD_AUTHORITY_COMMIT,combat:COMBAT_AUTHORITY_COMMIT,progression:PROGRESSION_AUTHORITY_COMMIT,acquisition:ACQUISITION_AUTHORITY_COMMIT}};
  root.sources[key]=receipt;save();return{success:true,idempotent:false,receipt:clone(receipt)};
}
function normalizeDiscipline(value){return String(value||"").trim().toLowerCase().replace(/ū/g,"u");}
function progressionAvailable(){return typeof addDisciplineExp==="function"&&typeof getCharacterDisciplineProgression==="function";}
function recordTechnicalDisciplineDevelopment({sourceId,discipline,executionClass="attempt",subjectId=KAKASHI,battleOccurrenceId=null}={}){
  const key=normalizeDiscipline(discipline),disciplineId=DISCIPLINE_ID[key];
  if(!disciplineId||key==="stamina")return{success:false,reason:"technical_discipline_not_authored",discipline:key};
  if(!sourceId||!progressionAvailable())return{success:false,reason:"canonical_progression_api_missing"};
  const authoredAmount=executionClass==="exceptional"?3:executionClass==="effective"?2:executionClass==="attempt"?1:0;
  if(authoredAmount<=0)return{success:false,reason:"development_execution_not_material"};
  if(sourceReceipt("discipline_development",sourceId,subjectId))return{success:true,idempotent:true,discipline:key,amount:0};
  const root=ensureRoot(),battleKey=battleOccurrenceId?`${String(battleOccurrenceId)}::${key}`:null;
  const used=battleKey?Number(root.battleDisciplineTotals[battleKey]||0):0;
  const amount=battleKey?Math.max(0,Math.min(authoredAmount,6-used)):authoredAmount;
  if(amount<=0){registerSource("discipline_development",sourceId,{subjectId,discipline:key,executionClass,battleOccurrenceId,amount:0,capReached:true});return{success:true,idempotent:false,discipline:key,amount:0,battleCap:6};}
  const applied=addDisciplineExp(subjectId,disciplineId,amount,ACTION_DERIVED_DISCIPLINE_SOURCE);
  if(applied===false||applied==null)return{success:false,reason:"canonical_progression_commit_failed",discipline:key};
  if(battleKey)root.battleDisciplineTotals[battleKey]=used+amount;
  registerSource("discipline_development",sourceId,{subjectId,discipline:key,disciplineId,executionClass,battleOccurrenceId,amount});save();
  return{success:true,idempotent:false,discipline:key,disciplineId,amount,progression:clone(getCharacterDisciplineProgression(subjectId,disciplineId))};
}
function recordStaminaDevelopment({sourceId,mitigationAmount,battleOccurrenceId,subjectId=KAKASHI}={}){
  if(!sourceId||!(Number(mitigationAmount)>0)||!battleOccurrenceId)return{success:false,reason:"stamina_mitigation_fact_required"};
  if(!progressionAvailable())return{success:false,reason:"canonical_progression_api_missing"};
  if(sourceReceipt("stamina_development",sourceId,subjectId))return{success:true,idempotent:true,amount:0};
  const root=ensureRoot(),battleKey=String(battleOccurrenceId),used=Number(root.battleStaminaTotals[battleKey]||0),amount=used<2?1:0;
  if(amount>0){
    const applied=addDisciplineExp(subjectId,DISCIPLINE_ID.stamina,1,ACTION_DERIVED_DISCIPLINE_SOURCE);
    if(applied===false||applied==null)return{success:false,reason:"canonical_stamina_progression_commit_failed"};
    root.battleStaminaTotals[battleKey]=used+1;
  }
  registerSource("stamina_development",sourceId,{subjectId,battleOccurrenceId:battleKey,mitigationAmount:Number(mitigationAmount),amount,capReached:amount===0});save();
  return{success:true,idempotent:false,amount,progression:clone(getCharacterDisciplineProgression(subjectId,DISCIPLINE_ID.stamina))};
}
function recordFieldcraftEvidence({sourceId,family,evidenceType,significance=1,subjectId=KAKASHI}={}){
  const allowed={"fieldcraft.stealth_approach":new Set(["covert_approach_attempt","undetected_positioning","covert_route_execution"]),"fieldcraft.covert_acquisition":new Set(["covert_acquisition_attempt","unnoticed_transfer_execution","sleight_of_hand_control"])};
  if(!sourceId||!allowed[family]||!allowed[family].has(String(evidenceType||"")))return{success:false,reason:"fieldcraft_evidence_not_authorised"};
  const sig=Math.max(1,Math.min(3,Number(significance)||1));
  if(sourceReceipt("fieldcraft_evidence",sourceId,subjectId))return{success:true,idempotent:true,evidence:clone(ensureRoot().fieldcraft[family]||null)};
  const root=ensureRoot(),current=root.fieldcraft[family]||{family,subjectId,significance:0,evidenceTypes:[],sourceIds:[]};
  current.significance=Math.max(Number(current.significance||0),sig);
  if(!current.evidenceTypes.includes(evidenceType))current.evidenceTypes.push(evidenceType);
  if(!current.sourceIds.includes(String(sourceId)))current.sourceIds.push(String(sourceId));
  root.fieldcraft[family]=current;registerSource("fieldcraft_evidence",sourceId,{subjectId,family,evidenceType,significance:sig});save();
  return{success:true,idempotent:false,evidence:clone(current)};
}
function inventoryQuantity(itemId){
  if(typeof playerData!=="object"||!playerData||!Array.isArray(playerData.inventory))return 0;
  return playerData.inventory.filter(row=>row&&String(row.id||"")===String(itemId)).reduce((sum,row)=>sum+Math.max(1,Number(row.quantity)||1),0);
}
function grantCatalogueItem(itemId){
  if(typeof addItemToInventory!=="function"||typeof getItemDefinition!=="function")return{success:false,reason:"canonical_inventory_api_missing"};
  const definition=getItemDefinition(itemId);if(!definition)return{success:false,reason:"reward_catalogue_definition_missing",itemId};
  const before=inventoryQuantity(itemId);
  try{addItemToInventory(clone(definition));}catch(error){return{success:false,reason:"canonical_inventory_commit_threw",detail:String(error&&error.message||error)};}
  const after=inventoryQuantity(itemId);
  if(after<=before)return{success:false,reason:"canonical_inventory_commit_failed",itemId,before,after};
  return{success:true,itemId,quantityAdded:after-before,total:after};
}
function commitOriginInventoryEntitlement({sourceId,kind}={}){
  const root=ensureRoot();if(!root)return{success:false,reason:"kakashi_reward_receipt_store_missing"};
  const exact=kind==="field_recovery_pill"?{sourceId:ITEM_SOURCE,itemId:ITEM_ID}:kind==="academy_training_tanto"?{sourceId:WEAPON_SOURCE,itemId:WEAPON_ID}:null;
  if(!exact||String(sourceId||"")!==exact.sourceId)return{success:false,reason:"reward_entitlement_source_mismatch"};
  if(root.grants[exact.sourceId])return{success:true,idempotent:true,grant:clone(root.grants[exact.sourceId])};
  root.entitlements[exact.sourceId]=root.entitlements[exact.sourceId]||{sourceId:exact.sourceId,kind,entitled:true,pending:true};
  const granted=grantCatalogueItem(exact.itemId);
  if(!granted.success){save();return{success:false,reason:granted.reason,detail:granted,pendingEntitlement:true};}
  registerSource("inventory_entitlement",exact.sourceId,{subjectId:KAKASHI,kind,itemId:exact.itemId});
  root.entitlements[exact.sourceId]={sourceId:exact.sourceId,kind,entitled:true,pending:false};
  root.grants[exact.sourceId]={sourceId:exact.sourceId,kind,itemId:exact.itemId,grant:clone(granted),committed:true};save();
  return{success:true,idempotent:false,grant:clone(root.grants[exact.sourceId])};
}
function qualifyingMiVictoryBattle(battleState=null){
  const b=battleState&&typeof battleState==="object"?battleState:(typeof currentBattle==="object"&&currentBattle?currentBattle:null);
  const dep=b&&b.kakashiOriginDeployment&&typeof b.kakashiOriginDeployment==="object"?b.kakashiOriginDeployment:null;
  if(!b||!dep)return{qualifies:false,reason:"kakashi_mi_battle_context_missing"};
  const opposition=Array.isArray(dep.oppositionParticipantIds)?dep.oppositionParticipantIds.map(String):[];
  const victory=!!(b.battleOver===true&&b.outcome&&b.outcome.type==="victory");
  const qualifies=dep.controllerParticipantId===KAKASHI&&dep.battleConfigId===MI_BATTLE_CONFIG&&opposition.length===1&&opposition[0]===MI_PARTICIPANT&&victory;
  return{
    qualifies,
    reason:qualifies?null:"kakashi_mi_victory_predicate_not_met",
    battleOccurrenceId:String(dep.battleOccurrenceId||b.battleId||""),
    sealedOriginOccurrenceId:String(dep.storyOccurrenceId||""),
    battleConfigId:String(dep.battleConfigId||""),
    oppositionParticipantIds:opposition,
    resultState:victory?"player_side_victory":(b.battleOver===true?"opposition_side_victory":"unresolved")
  };
}
function miEntitlementKey(ctx){
  return `${MI_REWARD_FAMILY}::${String(ctx&&ctx.sealedOriginOccurrenceId||"unsealed")}::${String(ctx&&ctx.battleOccurrenceId||"missing")}`;
}
function miClaimKey(ctx){
  return `${MI_REWARD_CLAIM_FAMILY}::${String(ctx&&ctx.battleOccurrenceId||"missing")}`;
}
function ensureMiVictoryBattleEntitlement(battleState=null){
  const ctx=qualifyingMiVictoryBattle(battleState);
  if(!ctx.qualifies||!ctx.battleOccurrenceId)return{success:false,reason:ctx.reason||"kakashi_mi_battle_occurrence_missing",context:ctx};
  const root=ensureRoot();if(!root)return{success:false,reason:"kakashi_reward_receipt_store_missing"};
  const entitlementId=miEntitlementKey(ctx);
  const existing=root.battleEntitlements[entitlementId];
  if(existing)return{success:true,idempotent:true,entitlement:clone(existing),claimed:!!root.battleClaims[miClaimKey(ctx)]};
  const entitlement={
    entitlementId,parentFamily:MI_REWARD_FAMILY,storyUnitRef:"academy_kakashi",subjectId:KAKASHI,
    battleOccurrenceId:ctx.battleOccurrenceId,sealedOriginOccurrenceId:ctx.sealedOriginOccurrenceId,
    battleConfigId:MI_BATTLE_CONFIG,oppositionParticipantIds:[MI_PARTICIPANT],resultState:"player_side_victory",
    materialReward:{ryo:MI_REWARD_RYO,items:[{itemId:ITEM_ID,quantity:1,sourceId:ITEM_SOURCE}],genericExp:0,rareDrops:[]},
    componentSources:{ryo:MI_RYO_SOURCE,item:ITEM_SOURCE},authorityCommit:MI_REWARD_AUTHORITY_COMMIT,
    status:"pending_claim",createdAt:Date.now()
  };
  root.battleEntitlements[entitlementId]=entitlement;save();
  return{success:true,idempotent:false,entitlement:clone(entitlement),claimed:false};
}
function getMiVictoryBattleRewardState(battleState=null){
  const ctx=qualifyingMiVictoryBattle(battleState);
  if(!ctx.qualifies||!ctx.battleOccurrenceId)return{success:false,qualifies:false,reason:ctx.reason||"kakashi_mi_victory_predicate_not_met",context:ctx};
  const ensured=ensureMiVictoryBattleEntitlement(battleState);if(!ensured.success)return ensured;
  const root=ensureRoot(),entitlementId=miEntitlementKey(ctx),claimId=miClaimKey(ctx);
  const claim=root.battleClaims[claimId]||null;
  return{success:true,qualifies:true,entitlementId,claimId,claimed:!!(claim&&claim.committed===true),entitlement:clone(root.battleEntitlements[entitlementId]),claim:clone(claim),components:clone(root.battleRewardComponents[entitlementId]||{})};
}
function commitMiVictoryBattleReward(battleState=null){
  const state=getMiVictoryBattleRewardState(battleState);
  if(!state.success||!state.qualifies)return state;
  const root=ensureRoot(),entitlement=state.entitlement,entitlementId=state.entitlementId,claimId=state.claimId;
  if(state.claimed)return{success:true,idempotent:true,claimed:true,entitlement:clone(entitlement),claim:clone(state.claim),ryoGranted:0,pillGranted:0};
  const components=root.battleRewardComponents[entitlementId]=root.battleRewardComponents[entitlementId]||{};

  let ryoGranted=0;
  if(!(components.ryo&&components.ryo.committed===true)){
    playerData.ryo=Number(playerData.ryo||0)+MI_REWARD_RYO;
    components.ryo={sourceId:MI_RYO_SOURCE,battleOccurrenceId:entitlement.battleOccurrenceId,amount:MI_REWARD_RYO,committed:true,committedAt:Date.now(),authorityCommit:MI_REWARD_AUTHORITY_COMMIT};
    ryoGranted=MI_REWARD_RYO;save();
  }

  let pillGranted=0;
  if(!(components.pill&&components.pill.committed===true)){
    const before=inventoryQuantity(ITEM_ID);
    const pill=commitOriginInventoryEntitlement({sourceId:ITEM_SOURCE,kind:"field_recovery_pill"});
    if(!pill||pill.success!==true)return{success:false,reason:pill&&pill.reason||"kakashi_mi_pill_commit_failed",entitlement:clone(entitlement),ryoComponentCommitted:true,pillResult:clone(pill)};
    const after=inventoryQuantity(ITEM_ID);
    pillGranted=Math.max(0,after-before);
    components.pill={sourceId:ITEM_SOURCE,itemId:ITEM_ID,quantity:1,committed:true,committedAt:Date.now(),idempotent:pill.idempotent===true,authorityCommit:MI_REWARD_AUTHORITY_COMMIT};save();
  }

  root.battleClaims[claimId]={
    claimId,claimFamily:MI_REWARD_CLAIM_FAMILY,entitlementId,battleOccurrenceId:entitlement.battleOccurrenceId,
    subjectId:KAKASHI,ryo:MI_REWARD_RYO,itemId:ITEM_ID,itemQuantity:1,committed:true,committedAt:Date.now(),
    authorityCommit:MI_REWARD_AUTHORITY_COMMIT
  };
  root.battleEntitlements[entitlementId]={...root.battleEntitlements[entitlementId],status:"claimed",claimedAt:Date.now(),claimId};
  save();
  return{success:true,idempotent:false,claimed:true,entitlement:clone(root.battleEntitlements[entitlementId]),claim:clone(root.battleClaims[claimId]),ryoGranted,pillGranted,totalRyo:Number(playerData.ryo||0)};
}
function evaluateTerminalDebriefRewards(facts={}){
  if(facts.terminalDebriefReached!==true)return{success:false,reason:"terminal_debrief_required"};
  const ryo=100+(facts.packageRecovered===true?75:0)+(facts.verifiedActionableIntelligence===true?25:0)+(facts.liveCustodyEstablished===true?25:0)+(facts.exceptionalFieldExecution===true?25:0);
  return{success:true,ryo:Math.min(250,ryo),fieldRecoveryPillEligible:facts.materiallyParticipatedInPlBattle===true,academyTrainingTantoEligible:facts.exceptionalTrainingTantoPredicate===true};
}
function commitTerminalDebriefRewards(facts={}){
  const evaluated=evaluateTerminalDebriefRewards(facts);if(!evaluated.success)return evaluated;
  if(typeof playerData!=="object"||!playerData)return{success:false,reason:"player_data_missing"};
  const root=ensureRoot(),existing=sourceReceipt("terminal_debrief_reward",TERMINAL_SOURCE,KAKASHI);let ryoGranted=0;
  if(!existing){playerData.ryo=Number(playerData.ryo||0)+evaluated.ryo;ryoGranted=evaluated.ryo;registerSource("terminal_debrief_reward",TERMINAL_SOURCE,{subjectId:KAKASHI,ryo:evaluated.ryo,facts:clone(facts)});root.terminalDebrief={ryo:evaluated.ryo,committed:true};}
  const grants=[];
  if(evaluated.fieldRecoveryPillEligible)grants.push(commitOriginInventoryEntitlement({sourceId:ITEM_SOURCE,kind:"field_recovery_pill"}));
  if(evaluated.academyTrainingTantoEligible)grants.push(commitOriginInventoryEntitlement({sourceId:WEAPON_SOURCE,kind:"academy_training_tanto"}));
  save();return{success:true,idempotent:!!existing,ryo:ryoGranted,totalRyo:Number(playerData.ryo||0),grants};
}
function snapshot(){const root=ensureRoot();return root?clone(root):null;}
function diagnostics(){
  const checks={
    contextAdapterNotSecondSystem:typeof addDisciplineExp==="function"&&typeof addItemToInventory==="function",
    routeExact:ROUTE==="academy_kakashi_origin_reward",
    terminalDebriefSeparated:evaluateTerminalDebriefRewards({terminalDebriefReached:false}).success===false,
    ryoMax250:evaluateTerminalDebriefRewards({terminalDebriefReached:true,packageRecovered:true,verifiedActionableIntelligence:true,liveCustodyEstablished:true,exceptionalFieldExecution:true}).ryo===250,
    itemSourceExact:ITEM_SOURCE==="kak_origin_item_field_recovery_resupply"&&ITEM_ID==="field_recovery_pill",
    weaponSourceExact:WEAPON_SOURCE==="kak_origin_weapon_exceptional_training_tanto"&&WEAPON_ID==="academy_training_tanto",
    developmentUsesCanonicalProgression:recordTechnicalDisciplineDevelopment.toString().includes("addDisciplineExp")&&recordStaminaDevelopment.toString().includes("addDisciplineExp"),
    actionDerivedSourceExact:ACTION_DERIVED_DISCIPLINE_SOURCE==="action_derived_development"&&recordTechnicalDisciplineDevelopment.toString().includes("ACTION_DERIVED_DISCIPLINE_SOURCE")&&recordStaminaDevelopment.toString().includes("ACTION_DERIVED_DISCIPLINE_SOURCE"),
    canonicalSourceRegistrationApi:typeof registerDisciplineTrainingSource==="function"&&typeof getRegisteredDisciplineTrainingSource==="function",
    canonicalSourceGateAcceptsActionDevelopment:ACTION_DERIVED_SOURCE_GATE_INSTALLED===true&&typeof isValidDisciplineTrainingSource==="function"&&isValidDisciplineTrainingSource(DISCIPLINE_ID.bukijutsu,ACTION_DERIVED_DISCIPLINE_SOURCE)===true&&isValidDisciplineTrainingSource(DISCIPLINE_ID.stamina,ACTION_DERIVED_DISCIPLINE_SOURCE)===true,
    actionDerivedRegistrationVisible:(()=>{const row=typeof getRegisteredDisciplineTrainingSource==="function"?getRegisteredDisciplineTrainingSource(ACTION_DERIVED_DISCIPLINE_SOURCE):null;return !!(row&&Array.isArray(row.disciplineIds)&&row.disciplineIds.length===ACTION_DERIVED_DISCIPLINE_IDS.size&&[...ACTION_DERIVED_DISCIPLINE_IDS].every(id=>row.disciplineIds.includes(id)));})(),
    legacyTrainingSourcesPreserved:isValidDisciplineTrainingSource(DISCIPLINE_ID.bukijutsu,"practical")===true&&isValidDisciplineTrainingSource(DISCIPLINE_ID.ninjutsu,"exam")===true&&isValidDisciplineTrainingSource(DISCIPLINE_ID.kinjutsu,"battle")===true&&isValidDisciplineTrainingSource(DISCIPLINE_ID.bukijutsu,"exam")===false,
    inventoryUsesCanonicalGrant:grantCatalogueItem.toString().includes("addItemToInventory")&&grantCatalogueItem.toString().includes("getItemDefinition"),
    technicalBattleCap:recordTechnicalDisciplineDevelopment.toString().includes("6-used"),
    staminaBattleCap:recordStaminaDevelopment.toString().includes("used<2?1:0"),
    noBattleVictoryRewardInference:!commitTerminalDebriefRewards.toString().includes("battleOver")&&!commitTerminalDebriefRewards.toString().includes("outcome"),
    immediateMiAuthorityPinned:MI_REWARD_AUTHORITY_COMMIT==="fe715e81cb76b3c4e4a7a8ccbc48ae04bc3b99da"&&MI_REWARD_FAMILY==="kak_origin_battle_mi_victory_reward_v1"&&MI_REWARD_CLAIM_FAMILY==="kak_origin_battle_mi_victory_reward_claim_v1",
    exactImmediateMiPackage:MI_REWARD_RYO===50&&ITEM_SOURCE==="kak_origin_item_field_recovery_resupply"&&ITEM_ID==="field_recovery_pill",
    exactSoloMiPredicate:qualifyingMiVictoryBattle.toString().includes("opposition.length===1")&&qualifyingMiVictoryBattle.toString().includes("MI_BATTLE_CONFIG")&&qualifyingMiVictoryBattle.toString().includes("MI_PARTICIPANT"),
    immediateClaimComponentReceipts:commitMiVictoryBattleReward.toString().includes("battleRewardComponents")&&commitMiVictoryBattleReward.toString().includes("MI_RYO_SOURCE")&&commitMiVictoryBattleReward.toString().includes("commitOriginInventoryEntitlement"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.recordAcademyKakashiTechnicalDevelopment34800=recordTechnicalDisciplineDevelopment;
globalThis.recordAcademyKakashiStaminaDevelopment34800=recordStaminaDevelopment;
globalThis.recordAcademyKakashiFieldcraftEvidence34800=recordFieldcraftEvidence;
globalThis.evaluateAcademyKakashiTerminalDebriefRewards34800=evaluateTerminalDebriefRewards;
globalThis.commitAcademyKakashiTerminalDebriefRewards34800=commitTerminalDebriefRewards;
globalThis.commitAcademyKakashiOriginInventoryEntitlement34800=commitOriginInventoryEntitlement;
globalThis.ensureAcademyKakashiMiVictoryBattleEntitlement34800=ensureMiVictoryBattleEntitlement;
globalThis.getAcademyKakashiMiVictoryBattleRewardState34800=getMiVictoryBattleRewardState;
globalThis.commitAcademyKakashiMiVictoryBattleReward34800=commitMiVictoryBattleReward;
globalThis.getAcademyKakashiOriginRewardSnapshot34800=snapshot;
globalThis.runAcademyKakashiOriginRewards34800Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_ORIGIN_REWARDS_34800=Object.freeze({patchId:PATCH_ID,route:ROUTE,miImmediateReward:Object.freeze({authorityCommit:MI_REWARD_AUTHORITY_COMMIT,family:MI_REWARD_FAMILY,claimFamily:MI_REWARD_CLAIM_FAMILY,ryo:MI_REWARD_RYO,itemId:ITEM_ID,itemSource:ITEM_SOURCE,battleConfigId:MI_BATTLE_CONFIG,opponentRef:MI_PARTICIPANT}),browserGoldenClaimed:false});
})();
