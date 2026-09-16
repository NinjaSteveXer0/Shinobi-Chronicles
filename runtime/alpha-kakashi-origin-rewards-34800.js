// ============================================================================
// ISSUE #188 / #197 / #199 — ACADEMY KAKASHI ORIGIN REWARD/DEVELOPMENT OWNER
// 34800
//
// Consumes durable World / Combat / Progression / Acquisition authority.
// This module does NOT make Battle victory equal Origin reward entitlement.
// It projects only exact source-owned development/reward facts and keeps
// terminal-debrief grants separate from ordinary Battle Victory claim.
// ============================================================================
(function installAcademyKakashiOriginRewards34800(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_ORIGIN_REWARDS_34800)return;

const PATCH_ID="alpha_kakashi_origin_rewards_34800_v1_2026_09_17";
const ROUTE="academy_kakashi_origin_reward";
const KAKASHI="academy_kakashi";
const ITEM_SOURCE="kak_origin_item_field_recovery_resupply";
const WEAPON_SOURCE="kak_origin_weapon_exceptional_training_tanto";
const ITEM_ID="field_recovery_pill";
const WEAPON_ID="academy_training_tanto";
const TECHNICAL_DISCIPLINES=new Set(["ninjutsu","taijutsu","genjutsu","bukijutsu","fuinjutsu","kinjutsu"]);
const WORLD_AUTHORITY_COMMIT="91f5969b20e270b3ef7d148342f28a1668b4eba1";
const COMBAT_AUTHORITY_COMMIT="e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8";
const PROGRESSION_AUTHORITY_COMMIT="54314cc29e1374783cae0a0d90654cc9a2316a45";
const ACQUISITION_AUTHORITY_COMMIT="b83884adb70f1e74e62f96ab96848c1ec33704f9";

function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(_error){return v;}}
function ensureRoot(){
  if(typeof playerData!=="object"||!playerData)return null;
  playerData.kakashiOriginRewards=playerData.kakashiOriginRewards&&typeof playerData.kakashiOriginRewards==="object"?playerData.kakashiOriginRewards:{};
  const root=playerData.kakashiOriginRewards;
  root.route=ROUTE;
  root.sourceReceipts=root.sourceReceipts&&typeof root.sourceReceipts==="object"?root.sourceReceipts:{};
  root.disciplineDevelopment=root.disciplineDevelopment&&typeof root.disciplineDevelopment==="object"?root.disciplineDevelopment:{};
  root.fieldcraftEvidence=root.fieldcraftEvidence&&typeof root.fieldcraftEvidence==="object"?root.fieldcraftEvidence:{};
  root.entitlements=root.entitlements&&typeof root.entitlements==="object"?root.entitlements:{};
  root.grants=root.grants&&typeof root.grants==="object"?root.grants:{};
  return root;
}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){} try{if(typeof saveTestState==="function")saveTestState();}catch(_error){}}
function sourceKey(kind,sourceId,subjectId=KAKASHI){return `${ROUTE}::${String(kind||"")}::${String(sourceId||"")}::${String(subjectId||"")}`;}
function registerSourceOnce(kind,sourceId,payload={}){
  const root=ensureRoot();if(!root||!sourceId)return{success:false,reason:"kakashi_reward_state_missing"};
  const key=sourceKey(kind,sourceId,payload.subjectId||KAKASHI);
  if(root.sourceReceipts[key])return{success:true,idempotent:true,receipt:clone(root.sourceReceipts[key])};
  const receipt={sourceKey:key,route:ROUTE,kind:String(kind||""),sourceId:String(sourceId),subjectId:String(payload.subjectId||KAKASHI),payload:clone(payload),authority:{world:WORLD_AUTHORITY_COMMIT,combat:COMBAT_AUTHORITY_COMMIT,progression:PROGRESSION_AUTHORITY_COMMIT,acquisition:ACQUISITION_AUTHORITY_COMMIT}};
  root.sourceReceipts[key]=receipt;save();return{success:true,idempotent:false,receipt:clone(receipt)};
}
function normalizeDiscipline(value){return String(value||"").trim().toLowerCase().replace(/ū/g,"u");}
function recordTechnicalDisciplineDevelopment({sourceId,discipline,executionClass="attempt",subjectId=KAKASHI,battleOccurrenceId=null}={}){
  const key=normalizeDiscipline(discipline);
  if(!TECHNICAL_DISCIPLINES.has(key))return{success:false,reason:"technical_discipline_not_authored",discipline:key};
  const amount=executionClass==="exceptional"?3:executionClass==="effective"?2:executionClass==="attempt"?1:0;
  if(amount<=0)return{success:false,reason:"development_execution_not_material"};
  const registered=registerSourceOnce("discipline_development",sourceId,{subjectId,discipline:key,executionClass,battleOccurrenceId});
  if(!registered.success)return registered;
  const root=ensureRoot();
  if(registered.idempotent===true)return{success:true,idempotent:true,discipline:key,amount:0,total:Number(root.disciplineDevelopment[key]||0)};
  const battleKey=battleOccurrenceId?String(battleOccurrenceId):null;
  const capKey=battleKey?`${key}::${battleKey}`:null;
  root.disciplineBattleTotals=root.disciplineBattleTotals&&typeof root.disciplineBattleTotals==="object"?root.disciplineBattleTotals:{};
  const used=capKey?Number(root.disciplineBattleTotals[capKey]||0):0;
  const granted=capKey?Math.max(0,Math.min(amount,6-used)):amount;
  root.disciplineDevelopment[key]=Number(root.disciplineDevelopment[key]||0)+granted;
  if(capKey)root.disciplineBattleTotals[capKey]=used+granted;
  save();
  return{success:true,idempotent:false,discipline:key,amount:granted,total:root.disciplineDevelopment[key],battleCap:capKey?6:null};
}
function recordStaminaDevelopment({sourceId,mitigationAmount,battleOccurrenceId,subjectId=KAKASHI}={}){
  if(!(Number(mitigationAmount)>0)||!battleOccurrenceId)return{success:false,reason:"stamina_mitigation_fact_required"};
  const registered=registerSourceOnce("stamina_development",sourceId,{subjectId,mitigationAmount:Number(mitigationAmount),battleOccurrenceId:String(battleOccurrenceId)});
  const root=ensureRoot();if(!registered.success)return registered;
  root.staminaBattleTotals=root.staminaBattleTotals&&typeof root.staminaBattleTotals==="object"?root.staminaBattleTotals:{};
  const battleKey=String(battleOccurrenceId),used=Number(root.staminaBattleTotals[battleKey]||0);
  if(registered.idempotent===true)return{success:true,idempotent:true,amount:0,total:Number(root.disciplineDevelopment.stamina||0)};
  const granted=used<2?1:0;
  root.disciplineDevelopment.stamina=Number(root.disciplineDevelopment.stamina||0)+granted;
  root.staminaBattleTotals[battleKey]=used+granted;save();
  return{success:true,idempotent:false,amount:granted,total:root.disciplineDevelopment.stamina,battleCap:2};
}
function recordFieldcraftEvidence({sourceId,family,evidenceType,significance=1,subjectId=KAKASHI}={}){
  const allowed={
    "fieldcraft.stealth_approach":new Set(["covert_approach_attempt","undetected_positioning","covert_route_execution"]),
    "fieldcraft.covert_acquisition":new Set(["covert_acquisition_attempt","unnoticed_transfer_execution","sleight_of_hand_control"])
  };
  if(!allowed[family]||!allowed[family].has(String(evidenceType||"")))return{success:false,reason:"fieldcraft_evidence_not_authorised"};
  const sig=Math.max(1,Math.min(3,Number(significance)||1));
  const registered=registerSourceOnce("fieldcraft_evidence",sourceId,{subjectId,family,evidenceType,significance:sig});
  const root=ensureRoot();if(!registered.success)return registered;
  const current=root.fieldcraftEvidence[family]||{family,significance:0,evidenceTypes:[],sourceIds:[]};
  if(!registered.idempotent){
    current.significance=Math.max(Number(current.significance||0),sig);
    if(!current.evidenceTypes.includes(evidenceType))current.evidenceTypes.push(evidenceType);
    if(!current.sourceIds.includes(String(sourceId)))current.sourceIds.push(String(sourceId));
    root.fieldcraftEvidence[family]=current;save();
  }
  return{success:true,idempotent:registered.idempotent===true,evidence:clone(current)};
}
function getInventoryContainer(){
  if(typeof playerData!=="object"||!playerData)return null;
  if(playerData.inventory&&typeof playerData.inventory==="object")return playerData.inventory;
  playerData.inventory={};return playerData.inventory;
}
function grantPersistentItemQuantity(itemId,quantity){
  const inventory=getInventoryContainer();if(!inventory)return{success:false,reason:"persistent_inventory_missing"};
  const q=Math.max(0,Number(quantity)||0);if(q<=0)return{success:false,reason:"invalid_reward_quantity"};
  if(inventory.items&&typeof inventory.items==="object"&&!Array.isArray(inventory.items)){
    inventory.items[itemId]=Number(inventory.items[itemId]||0)+q;return{success:true,quantity:q,total:inventory.items[itemId]};
  }
  if(Array.isArray(inventory.items)){
    const row=inventory.items.find(entry=>entry&&String(entry.id||entry.itemId||"")===itemId);
    if(row){row.quantity=Number(row.quantity||0)+q;return{success:true,quantity:q,total:row.quantity};}
    inventory.items.push({id:itemId,quantity:q});return{success:true,quantity:q,total:q};
  }
  inventory.items={[itemId]:q};return{success:true,quantity:q,total:q};
}
function grantSingletonWeapon(weaponId){
  const inventory=getInventoryContainer();if(!inventory)return{success:false,reason:"persistent_inventory_missing"};
  if(Array.isArray(inventory.weapons)){
    const exists=inventory.weapons.some(row=>String(row&&row.id||row||"")===weaponId);
    if(!exists)inventory.weapons.push(weaponId);
    return{success:true,alreadyOwned:exists,weaponId};
  }
  inventory.weapons=inventory.weapons&&typeof inventory.weapons==="object"?inventory.weapons:{};
  const exists=!!inventory.weapons[weaponId];inventory.weapons[weaponId]=inventory.weapons[weaponId]||{id:weaponId,owned:true};
  return{success:true,alreadyOwned:exists,weaponId};
}
function commitOriginInventoryEntitlement({sourceId,kind}={}){
  const root=ensureRoot();if(!root)return{success:false,reason:"kakashi_reward_state_missing"};
  const definition=kind==="field_recovery_pill"?{sourceId:ITEM_SOURCE,itemId:ITEM_ID,quantity:1}:kind==="academy_training_tanto"?{sourceId:WEAPON_SOURCE,weaponId:WEAPON_ID}:null;
  if(!definition||String(sourceId||"")!==definition.sourceId)return{success:false,reason:"reward_entitlement_source_mismatch"};
  const registered=registerSourceOnce("inventory_entitlement",definition.sourceId,{subjectId:KAKASHI,kind});
  if(!registered.success)return registered;
  if(root.grants[definition.sourceId])return{success:true,idempotent:true,grant:clone(root.grants[definition.sourceId])};
  const grant=definition.itemId?grantPersistentItemQuantity(definition.itemId,definition.quantity):grantSingletonWeapon(definition.weaponId);
  if(!grant.success)return{success:false,reason:"persistent_inventory_grant_failed",detail:grant,pendingEntitlement:true};
  root.entitlements[definition.sourceId]={sourceId:definition.sourceId,kind,entitled:true};
  root.grants[definition.sourceId]={sourceId:definition.sourceId,kind,grant:clone(grant),committed:true};save();
  return{success:true,idempotent:false,grant:clone(root.grants[definition.sourceId])};
}
function evaluateTerminalDebriefRewards(facts={}){
  if(facts.terminalDebriefReached!==true)return{success:false,reason:"terminal_debrief_required"};
  const ryo=100+(facts.packageRecovered===true?75:0)+(facts.verifiedActionableIntelligence===true?25:0)+(facts.liveCustodyEstablished===true?25:0)+(facts.exceptionalFieldExecution===true?25:0);
  return{success:true,ryo:Math.min(250,ryo),fieldRecoveryPillEligible:facts.materiallyParticipatedInPlBattle===true,academyTrainingTantoEligible:facts.exceptionalTrainingTantoPredicate===true};
}
function commitTerminalDebriefRewards(facts={}){
  const evaluated=evaluateTerminalDebriefRewards(facts);if(!evaluated.success)return evaluated;
  const root=ensureRoot();
  const receipt=registerSourceOnce("terminal_debrief_reward","kak_origin_terminal_debrief_reward",{subjectId:KAKASHI,ryo:evaluated.ryo,facts:clone(facts)});
  if(!receipt.success)return receipt;
  if(receipt.idempotent!==true){
    playerData.ryo=Number(playerData.ryo||0)+evaluated.ryo;
    root.terminalDebrief={ryo:evaluated.ryo,committed:true};
  }
  const grants=[];
  if(evaluated.fieldRecoveryPillEligible)grants.push(commitOriginInventoryEntitlement({sourceId:ITEM_SOURCE,kind:"field_recovery_pill"}));
  if(evaluated.academyTrainingTantoEligible)grants.push(commitOriginInventoryEntitlement({sourceId:WEAPON_SOURCE,kind:"academy_training_tanto"}));
  save();
  return{success:true,idempotent:receipt.idempotent===true,ryo:receipt.idempotent===true?0:evaluated.ryo,totalRyo:Number(playerData.ryo||0),grants};
}
function snapshot(){const root=ensureRoot();return root?clone(root):null;}
function diagnostics(){
  const checks={
    routeExact:ROUTE==="academy_kakashi_origin_reward",
    terminalDebriefSeparated:evaluateTerminalDebriefRewards({terminalDebriefReached:false}).success===false,
    ryoMax250:evaluateTerminalDebriefRewards({terminalDebriefReached:true,packageRecovered:true,verifiedActionableIntelligence:true,liveCustodyEstablished:true,exceptionalFieldExecution:true}).ryo===250,
    itemSourceExact:ITEM_SOURCE==="kak_origin_item_field_recovery_resupply"&&ITEM_ID==="field_recovery_pill",
    weaponSourceExact:WEAPON_SOURCE==="kak_origin_weapon_exceptional_training_tanto"&&WEAPON_ID==="academy_training_tanto",
    technicalValues:recordTechnicalDisciplineDevelopment.toString().includes('executionClass==="exceptional"?3')&&recordTechnicalDisciplineDevelopment.toString().includes('executionClass==="effective"?2'),
    technicalBattleCap:recordTechnicalDisciplineDevelopment.toString().includes("6-used"),
    staminaBattleCap:recordStaminaDevelopment.toString().includes("used<2?1:0"),
    noBattleVictoryRewardInference:!commitTerminalDebriefRewards.toString().includes("battleOver")&&!commitTerminalDebriefRewards.toString().includes("outcome"),
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
globalThis.getAcademyKakashiOriginRewardSnapshot34800=snapshot;
globalThis.runAcademyKakashiOriginRewards34800Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_ORIGIN_REWARDS_34800=Object.freeze({patchId:PATCH_ID,route:ROUTE,browserGoldenClaimed:false});
})();
