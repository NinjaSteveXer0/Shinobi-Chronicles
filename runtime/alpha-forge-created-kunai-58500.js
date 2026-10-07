// ============================================================================
// ISSUE #585 — STEP 8 FORGE-CREATED DURABLE KUNAI — ISOLATED RUNTIME BODY
// ============================================================================
// Bounded commissioned-Forge transaction over existing #545 durable
// Inventory/provenance authority and #552 Kunai condition/wear/repair authority.
//
// This module deliberately does NOT own:
// - Forge UI / generic Crafting / Fūin Craft;
// - Inventory identity or durable-object identity;
// - save-schema migration;
// - Battle/Stats/PL/proficiency truth;
// - shared loader/fingerprint/build-manifest/#528 wiring.
//
// Final production loading/wiring remains Integrator-owned after the reserved
// shared-seam sequence releases. browserGoldenClaimed=false.
// ============================================================================
(function installForgeCreatedKunai58500(){
"use strict";
if(globalThis.SC_FORGE_CREATED_KUNAI_58500)return;

const PATCH_ID="forge_created_kunai_58500_2026_10_08";
const RECIPE_ID="forge_create_precision_balanced_kunai_v1";
const RECIPE_LABEL="Forge Kunai — Precision Balance";
const BRANCH_ID="forge";
const OPERATION_ID="create";
const OUTPUT_MODE="durable_instance";
const KUNAI_ID="kunai";
const MATERIAL_ID="weapon_materials";
const MATERIAL_QTY=1;
const RYO_COST=25;
const RESULT_PACKAGE_REF="forge_result_precision_balanced_kunai_v1";
const KNOWLEDGE_REF="recipe_knowledge_forge_create_precision_balanced_kunai_v1";
const CAPABILITY_REF="executor_capability_forge_standard_weaponcraft_v1";
const SERVICE_HOST_ID="KON-A05";
const SERVICE_HOST_ALIAS="village:konoha:craft_quarter:forge";
const PARENT_LOCATION_ID="KON-P04";
const DURABILITY_MAX=10;
const EFFECTIVE_BUKI_BONUS=1;
const CANONICAL_ATTACK_BONUS=5;
const FALLBACK_552_PROFILE="retail_kunai_condition_552";
const RECEIPT_TYPE="forge_created_durable_kunai";

function clone58500(value){
  try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}
  catch(_error){return value;}
}
function text58500(value,max=220){
  if(typeof value!=="string"&&typeof value!=="number")return"";
  return String(value).trim().slice(0,max);
}
function currentPlayer58500(){
  try{return typeof playerData!=="undefined"&&playerData?playerData:null;}
  catch(_error){return globalThis.playerData&&typeof globalThis.playerData==="object"?globalThis.playerData:null;}
}
function itemDefinition58500(itemId){
  try{return typeof globalThis.getItemDefinition==="function"?globalThis.getItemDefinition(itemId):null;}
  catch(_error){return null;}
}
function normalizeOperationId58500(value){
  const id=text58500(value,180);
  return /^[A-Za-z0-9:_-]{6,180}$/.test(id)?id:null;
}
function occurrenceId58500(craftOperationId){
  return `forge_create_precision_balanced_kunai::${craftOperationId}`;
}
function history58500(pd=currentPlayer58500()){
  if(!pd)return null;
  if(!Array.isArray(pd.activityHistory))pd.activityHistory=[];
  return pd.activityHistory;
}
function receiptForOperation58500(craftOperationId,pd=currentPlayer58500()){
  const rows=history58500(pd);
  if(!rows)return null;
  return rows.find(row=>row&&row.type===RECEIPT_TYPE&&row.recipeId===RECIPE_ID&&row.craftOperationId===craftOperationId)||null;
}
function inventoryRows58500(pd=currentPlayer58500()){
  return pd&&Array.isArray(pd.inventory)?pd.inventory:[];
}
function rowItemId58500(row){
  return text58500(row&&(row.id||row.itemId),120);
}
function inventoryRowByInstance58500(instanceId,pd=currentPlayer58500()){
  const id=text58500(instanceId,220);
  return inventoryRows58500(pd).find(row=>row&&text58500(row.instanceId,220)===id)||null;
}
function ownedStackQuantity58500(itemId,pd=currentPlayer58500()){
  const id=text58500(itemId,120);
  return inventoryRows58500(pd).reduce((sum,row)=>{
    if(!row||row.instanceId||rowItemId58500(row)!==id)return sum;
    return sum+Math.max(0,Math.floor(Number(row.quantity)||0));
  },0);
}
function currentRyo58500(pd=currentPlayer58500()){
  try{
    if(typeof globalThis.getChronicleCurrentRyo43600==="function"){
      const value=Number(globalThis.getChronicleCurrentRyo43600());
      if(Number.isFinite(value))return Math.max(0,Math.floor(value));
    }
  }catch(_error){}
  return Math.max(0,Math.floor(Number(pd&&pd.ryo)||0));
}
function sourceSet58500(value){
  const input=Array.isArray(value)?value:[];
  return new Set(input.map(row=>text58500(row,180)).filter(Boolean));
}
function exactRecipeSnapshot58500(){
  return Object.freeze({
    recipeId:RECIPE_ID,
    label:RECIPE_LABEL,
    branch:BRANCH_ID,
    operation:OPERATION_ID,
    outputMode:OUTPUT_MODE,
    outputDefinitionId:KUNAI_ID,
    requiredKnowledgeRefs:Object.freeze([KNOWLEDGE_REF]),
    requiredCapabilityPredicates:Object.freeze([CAPABILITY_REF]),
    requiredFacilityTags:Object.freeze(["forge"]),
    materialInputs:Object.freeze([Object.freeze({definitionId:MATERIAL_ID,quantity:MATERIAL_QTY})]),
    currencyCostRyo:RYO_COST,
    serviceAllowed:true,
    commissionedRouteAllowed:true,
    resultPackageRef:RESULT_PACKAGE_REF,
    consumedHostObject:false,
    supersessionMode:null,
    serviceHostId:SERVICE_HOST_ID,
    serviceHostAlias:SERVICE_HOST_ALIAS,
    parentLocationId:PARENT_LOCATION_ID
  });
}
function durabilityProfile58500(){
  const profile=globalThis.SC_PHASE2_BASIC_ITEM_SHOP_51700&&
    globalThis.SC_PHASE2_BASIC_ITEM_SHOP_51700.retailKunai&&
    text58500(globalThis.SC_PHASE2_BASIC_ITEM_SHOP_51700.retailKunai.profileId,120);
  return profile||FALLBACK_552_PROFILE;
}
function validateCanonicalDefinitions58500(){
  const material=itemDefinition58500(MATERIAL_ID);
  const kunai=itemDefinition58500(KUNAI_ID);
  if(!material)return{success:false,reason:"forge_material_definition_missing"};
  if(material.stackable!==true)return{success:false,reason:"forge_material_must_use_stackable_canonical_inventory"};
  if(String(material.rarity||"")!=="Common")return{success:false,reason:"forge_material_rarity_mismatch"};
  if(!kunai)return{success:false,reason:"forge_kunai_definition_missing"};
  if(kunai.stackable!==false||String(kunai.type||"").toLowerCase()!=="weapon")return{success:false,reason:"forge_kunai_definition_not_canonical_durable_weapon"};
  if(String(kunai.rarity||"")!=="Common")return{success:false,reason:"forge_kunai_rarity_mismatch"};
  return{success:true,material,kunai};
}
function validateCommission58500(spec,pd){
  const craftOperationId=normalizeOperationId58500(spec&&spec.craftOperationId);
  if(!craftOperationId)return{success:false,reason:"forge_stable_craft_operation_id_required"};

  const prior=receiptForOperation58500(craftOperationId,pd);
  if(prior){
    const requestedCommissioner=text58500(spec&&spec.commissionerRef,180);
    if(requestedCommissioner&&requestedCommissioner!==text58500(prior.commissionerRef,180)){
      return{success:false,reason:"forge_operation_identity_conflict",craftOperationId};
    }
    const row=inventoryRowByInstance58500(prior.instanceId,pd);
    return{
      success:true,
      idempotent:true,
      craftOperationId,
      receipt:clone58500(prior),
      instanceId:text58500(prior.instanceId,220),
      outputPresent:!!row,
      condition:row?forgeKunaiCondition58500(prior.instanceId,pd):null
    };
  }

  if(text58500(spec&&spec.recipeId,180)!==RECIPE_ID)return{success:false,reason:"forge_recipe_unknown_or_mismatch"};
  if(text58500(spec&&spec.branch,80)!==BRANCH_ID||text58500(spec&&spec.operation,80)!==OPERATION_ID){
    return{success:false,reason:"forge_branch_operation_mismatch"};
  }

  const serviceHost=text58500(spec&&spec.serviceHostId,180);
  const serviceAlias=text58500(spec&&spec.serviceHostAlias,220);
  if(serviceHost!==SERVICE_HOST_ID&&serviceAlias!==SERVICE_HOST_ALIAS){
    return{success:false,reason:"forge_service_host_invalid"};
  }
  if(spec&&spec.servicePermission!==true)return{success:false,reason:"forge_service_permission_required"};

  const commissionerRef=text58500(spec&&spec.commissionerRef,180);
  const executorRef=text58500(spec&&spec.executorRef,180);
  if(!commissionerRef)return{success:false,reason:"forge_commissioner_required"};
  if(!executorRef)return{success:false,reason:"forge_executor_required"};
  if(executorRef===commissionerRef)return{success:false,reason:"forge_executor_must_differ_from_commissioner"};

  const capabilities=sourceSet58500(spec&&spec.executorCapabilityRefs);
  const knowledge=sourceSet58500(spec&&spec.executorKnowledgeRefs);
  if(!capabilities.has(CAPABILITY_REF))return{success:false,reason:"forge_executor_capability_missing"};
  if(!knowledge.has(KNOWLEDGE_REF))return{success:false,reason:"forge_executor_recipe_knowledge_missing"};

  const definitions=validateCanonicalDefinitions58500();
  if(!definitions.success)return definitions;
  if(ownedStackQuantity58500(MATERIAL_ID,pd)<MATERIAL_QTY){
    return{success:false,reason:"forge_insufficient_weapon_materials",required:MATERIAL_QTY,available:ownedStackQuantity58500(MATERIAL_ID,pd)};
  }
  if(currentRyo58500(pd)<RYO_COST){
    return{success:false,reason:"forge_insufficient_ryo",required:RYO_COST,available:currentRyo58500(pd)};
  }
  if(typeof globalThis.commitDurableInventoryAcquisition54500!=="function"){
    return{success:false,reason:"forge_durable_inventory_authority_missing"};
  }
  if(typeof globalThis.savePlayerData!=="function"){
    return{success:false,reason:"forge_save_authority_missing"};
  }
  return{
    success:true,
    idempotent:false,
    craftOperationId,
    commissionerRef,
    executorRef,
    serviceHostId:serviceHost===SERVICE_HOST_ID?SERVICE_HOST_ID:SERVICE_HOST_ALIAS,
    serviceHostAlias:serviceAlias===SERVICE_HOST_ALIAS?SERVICE_HOST_ALIAS:null,
    chronicleRef:text58500(spec&&spec.chronicleRef,220)||`chronicle:${occurrenceId58500(craftOperationId)}`
  };
}
function consumeStackableExact58500(pd,itemId,quantity){
  let remaining=Math.max(0,Math.floor(Number(quantity)||0));
  const rows=inventoryRows58500(pd);
  for(let index=0;index<rows.length&&remaining>0;index+=1){
    const row=rows[index];
    if(!row||row.instanceId||rowItemId58500(row)!==itemId)continue;
    const available=Math.max(0,Math.floor(Number(row.quantity)||0));
    if(available<=0)continue;
    const take=Math.min(available,remaining);
    row.quantity=available-take;
    remaining-=take;
  }
  if(remaining>0)return{success:false,reason:"forge_material_consume_mismatch",unconsumed:remaining};
  pd.inventory=rows.filter(row=>!(row&&!row.instanceId&&rowItemId58500(row)===itemId&&Math.max(0,Math.floor(Number(row.quantity)||0))===0));
  return{success:true,consumed:quantity};
}
function forgeKunaiCondition58500(instanceId,pd=currentPlayer58500()){
  const row=inventoryRowByInstance58500(instanceId,pd);
  if(!row||rowItemId58500(row)!==KUNAI_ID||text58500(row.resultPackageRef,180)!==RESULT_PACKAGE_REF)return null;
  const current=Math.max(0,Math.floor(Number(row.durabilityCurrent)||0));
  const max=Math.max(0,Math.floor(Number(row.durabilityMax)||0));
  return{
    itemId:KUNAI_ID,
    baseDefinitionId:KUNAI_ID,
    instanceId:text58500(row.instanceId,220),
    resultPackageRef:RESULT_PACKAGE_REF,
    durabilityCurrent:current,
    durabilityMax:max,
    usable:current>0&&max===DURABILITY_MAX,
    conditionProfileId:text58500(row.durabilityProfileId,120)
  };
}
function initializeForgeKunai58500(instanceId,pd=currentPlayer58500()){
  const row=inventoryRowByInstance58500(instanceId,pd);
  if(!row||rowItemId58500(row)!==KUNAI_ID)return{success:false,reason:"forge_created_kunai_instance_missing"};
  row.baseDefinitionId=KUNAI_ID;
  row.resultPackageRef=RESULT_PACKAGE_REF;
  row.forgeResultPackageRef=RESULT_PACKAGE_REF;
  row.durabilityCurrent=DURABILITY_MAX;
  row.durabilityMax=DURABILITY_MAX;
  row.durabilityProfileId=durabilityProfile58500();
  row.forgeEffectiveBukijutsuBonus=EFFECTIVE_BUKI_BONUS;
  row.forgeCanonicalAttackBonus=CANONICAL_ATTACK_BONUS;
  if(row.equippedBy)return{success:false,reason:"forge_created_kunai_must_not_auto_equip"};
  return{success:true,condition:forgeKunaiCondition58500(instanceId,pd)};
}
function restoreRoot58500(pd,key,had,before){
  if(had)pd[key]=before;
  else delete pd[key];
}
function commitForgeCreatedKunai58500(spec={}){
  const pd=currentPlayer58500();
  if(!pd)return{success:false,reason:"forge_player_state_missing"};
  if(!Array.isArray(pd.inventory))pd.inventory=[];

  const gate=validateCommission58500(spec,pd);
  if(!gate.success||gate.idempotent)return gate;

  const beforeRyo=currentRyo58500(pd);
  const beforeMaterials=ownedStackQuantity58500(MATERIAL_ID,pd);
  const inventoryBefore=clone58500(pd.inventory);
  const rows=history58500(pd);
  if(!rows)return{success:false,reason:"forge_history_state_missing"};
  const historyBefore=clone58500(rows);
  const hadProv=Object.prototype.hasOwnProperty.call(pd,"durableObjectProvenance14800");
  const provBefore=hadProv?clone58500(pd.durableObjectProvenance14800):null;
  const occurrenceId=occurrenceId58500(gate.craftOperationId);

  try{
    pd.ryo=beforeRyo-RYO_COST;
    const consumed=consumeStackableExact58500(pd,MATERIAL_ID,MATERIAL_QTY);
    if(!consumed.success)throw new Error(consumed.reason||"forge_material_commit_failed");

    const acquisition=globalThis.commitDurableInventoryAcquisition54500({
      itemId:KUNAI_ID,
      sourceOccurrenceId:occurrenceId,
      sourceId:RECIPE_ID,
      acquisitionKind:"commissioned_forge_creation",
      eventType:"forge_creation",
      sourceRefs:[
        SERVICE_HOST_ID,SERVICE_HOST_ALIAS,PARENT_LOCATION_ID,RECIPE_ID,RESULT_PACKAGE_REF,
        gate.executorRef,gate.commissionerRef,gate.chronicleRef
      ],
      metadata:{
        recipeId:RECIPE_ID,
        craftOperationId:gate.craftOperationId,
        branch:BRANCH_ID,
        operation:OPERATION_ID,
        outputMode:OUTPUT_MODE,
        baseDefinitionId:KUNAI_ID,
        resultPackageRef:RESULT_PACKAGE_REF,
        executorRef:gate.executorRef,
        commissionerRef:gate.commissionerRef,
        serviceHostId:SERVICE_HOST_ID,
        serviceHostAlias:SERVICE_HOST_ALIAS,
        parentLocationId:PARENT_LOCATION_ID,
        materialInputs:[{definitionId:MATERIAL_ID,quantity:MATERIAL_QTY}],
        currencyCostRyo:RYO_COST,
        durabilityCurrent:DURABILITY_MAX,
        durabilityMax:DURABILITY_MAX,
        chronicleRef:gate.chronicleRef
      },
      deferSave:true
    });
    if(!acquisition||acquisition.success!==true)throw new Error(acquisition&&acquisition.reason||"forge_durable_acquisition_failed");

    const initialized=initializeForgeKunai58500(acquisition.instanceId,pd);
    if(!initialized.success)throw new Error(initialized.reason||"forge_kunai_initialization_failed");
    const outputRow=inventoryRowByInstance58500(acquisition.instanceId,pd);
    if(!outputRow||outputRow.equippedBy)throw new Error("forge_created_kunai_must_not_auto_equip");

    const afterMaterials=ownedStackQuantity58500(MATERIAL_ID,pd);
    if(afterMaterials!==beforeMaterials-MATERIAL_QTY)throw new Error("forge_material_quantity_commit_mismatch");
    if(Number(pd.ryo)!==beforeRyo-RYO_COST)throw new Error("forge_ryo_commit_mismatch");

    const receipt={
      id:occurrenceId,
      occurrenceId,
      sourceOccurrenceId:occurrenceId,
      type:RECEIPT_TYPE,
      activity:"commissioned_forge_creation",
      committed:true,
      success:true,
      recipeId:RECIPE_ID,
      recipeLabel:RECIPE_LABEL,
      craftOperationId:gate.craftOperationId,
      branch:BRANCH_ID,
      operation:OPERATION_ID,
      outputMode:OUTPUT_MODE,
      baseDefinitionId:KUNAI_ID,
      itemId:KUNAI_ID,
      rarity:"Common",
      instanceId:text58500(acquisition.instanceId,220),
      durableAcquisitionReceiptId:text58500(acquisition.address,300),
      resultPackageRef:RESULT_PACKAGE_REF,
      executorRef:gate.executorRef,
      commissionerRef:gate.commissionerRef,
      serviceHostId:SERVICE_HOST_ID,
      serviceHostAlias:SERVICE_HOST_ALIAS,
      parentLocationId:PARENT_LOCATION_ID,
      chronicleRef:gate.chronicleRef,
      materialInputs:[{definitionId:MATERIAL_ID,quantity:MATERIAL_QTY}],
      materialQuantityBefore:beforeMaterials,
      materialQuantityAfter:afterMaterials,
      ryoCost:RYO_COST,
      ryoBefore:beforeRyo,
      ryoAfter:Number(pd.ryo),
      durabilityCurrent:DURABILITY_MAX,
      durabilityMax:DURABILITY_MAX,
      autoEquipped:false,
      timestamp:Date.now()
    };
    rows.push(receipt);

    globalThis.savePlayerData();
    return{
      success:true,
      idempotent:false,
      craftOperationId:gate.craftOperationId,
      occurrenceId,
      instanceId:receipt.instanceId,
      receipt:clone58500(receipt),
      condition:forgeKunaiCondition58500(receipt.instanceId,pd)
    };
  }catch(error){
    pd.ryo=beforeRyo;
    pd.inventory=inventoryBefore;
    pd.activityHistory=historyBefore;
    restoreRoot58500(pd,"durableObjectProvenance14800",hadProv,provBefore);
    try{activityHistory=pd.activityHistory;}catch(_error){}
    return{success:false,reason:"forge_commit_failed",error:String(error&&error.message||error)};
  }
}
function projectForgeEffectiveBukijutsu58500({instanceId,equippedInstanceId=null}={}){
  const condition=forgeKunaiCondition58500(instanceId);
  const equipped=text58500(equippedInstanceId,220);
  const active=!!(
    condition&&condition.usable&&equipped&&
    equipped===condition.instanceId&&condition.resultPackageRef===RESULT_PACKAGE_REF
  );
  return Object.freeze({
    instanceId:condition?condition.instanceId:text58500(instanceId,220)||null,
    baseDefinitionId:KUNAI_ID,
    resultPackageRef:condition?RESULT_PACKAGE_REF:null,
    packageActive:active,
    effectiveBukijutsuBonus:active?EFFECTIVE_BUKI_BONUS:0,
    appliesBeforeWeaponProficiencyRealisation:active,
    canonicalAttackBonus:CANONICAL_ATTACK_BONUS,
    baseBukijutsuMutation:false,
    developedBukijutsuMutation:false,
    registryMutation:false,
    naturalPlMutation:false,
    provenanceAloneGrantsPower:false
  });
}
function commitForgeKunaiWear58500({instanceId,sourceOccurrenceId,sourceId}={}){
  const condition=forgeKunaiCondition58500(instanceId);
  if(!condition)return{success:false,reason:"forge_result_package_instance_missing"};
  if(!condition.usable)return{success:false,reason:"forge_kunai_depleted",condition};
  if(typeof globalThis.commitRetailKunaiWear55200!=="function")return{success:false,reason:"kunai_condition_authority_552_missing"};
  const result=globalThis.commitRetailKunaiWear55200({instanceId:condition.instanceId,sourceOccurrenceId,sourceId});
  if(!result||result.success!==true)return result||{success:false,reason:"kunai_wear_552_failed"};
  return{...clone58500(result),forgeResultPackageRef:RESULT_PACKAGE_REF,condition:forgeKunaiCondition58500(condition.instanceId)};
}
function repairForgeKunai58500({instanceId,sourceOccurrenceId,sourceId}={}){
  const condition=forgeKunaiCondition58500(instanceId);
  if(!condition)return{success:false,reason:"forge_result_package_instance_missing"};
  if(typeof globalThis.repairRetailKunai55200!=="function")return{success:false,reason:"kunai_condition_authority_552_missing"};
  const result=globalThis.repairRetailKunai55200({instanceId:condition.instanceId,sourceOccurrenceId,sourceId});
  if(!result||result.success!==true)return result||{success:false,reason:"kunai_repair_552_failed"};
  const after=forgeKunaiCondition58500(condition.instanceId);
  if(!after||after.durabilityCurrent!==DURABILITY_MAX||after.resultPackageRef!==RESULT_PACKAGE_REF){
    return{success:false,reason:"forge_kunai_repair_identity_or_package_drift",condition:after};
  }
  return{...clone58500(result),forgeResultPackageRef:RESULT_PACKAGE_REF,condition:after};
}
function diagnostics58500(){
  const recipe=exactRecipeSnapshot58500();
  const source=String(commitForgeCreatedKunai58500);
  const checks={
    exactRecipe:recipe.recipeId===RECIPE_ID&&recipe.materialInputs[0].quantity===1&&recipe.currencyCostRyo===25,
    canonicalOutput:recipe.outputDefinitionId==="kunai"&&recipe.outputMode==="durable_instance",
    canonicalHost:recipe.serviceHostId==="KON-A05"&&recipe.serviceHostAlias===SERVICE_HOST_ALIAS,
    exactResultPackage:recipe.resultPackageRef===RESULT_PACKAGE_REF,
    usesDurable545:source.includes("commitDurableInventoryAcquisition54500"),
    reusesCondition552:String(commitForgeKunaiWear58500).includes("commitRetailKunaiWear55200")&&String(repairForgeKunai58500).includes("repairRetailKunai55200"),
    atomicRollback:source.includes("pd.inventory=inventoryBefore")&&source.includes("pd.ryo=beforeRyo")&&source.includes("durableObjectProvenance14800"),
    noAutoEquip:source.includes("forge_created_kunai_must_not_auto_equip"),
    resultPackageNotProvenanceDerived:String(projectForgeEffectiveBukijutsu58500).includes("condition.resultPackageRef===RESULT_PACKAGE_REF")&&String(projectForgeEffectiveBukijutsu58500).includes("provenanceAloneGrantsPower:false"),
    noBaseMutation:String(projectForgeEffectiveBukijutsu58500).includes("baseBukijutsuMutation:false")&&String(projectForgeEffectiveBukijutsu58500).includes("naturalPlMutation:false"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,recipe,browserGoldenClaimed:false};
}

const API=Object.freeze({
  patchId:PATCH_ID,
  recipe:exactRecipeSnapshot58500(),
  commit:commitForgeCreatedKunai58500,
  condition:forgeKunaiCondition58500,
  projectEffectiveBukijutsu:projectForgeEffectiveBukijutsu58500,
  commitWear:commitForgeKunaiWear58500,
  repair:repairForgeKunai58500,
  diagnostics:diagnostics58500,
  browserGoldenClaimed:false
});
globalThis.getForgeCreatedKunaiRecipe58500=exactRecipeSnapshot58500;
globalThis.commitForgeCreatedKunai58500=commitForgeCreatedKunai58500;
globalThis.getForgeCreatedKunaiCondition58500=forgeKunaiCondition58500;
globalThis.projectForgeCreatedKunaiEffectiveBukijutsu58500=projectForgeEffectiveBukijutsu58500;
globalThis.commitForgeCreatedKunaiWear58500=commitForgeKunaiWear58500;
globalThis.repairForgeCreatedKunai58500=repairForgeKunai58500;
globalThis.runForgeCreatedKunai58500Diagnostics=diagnostics58500;
globalThis.SC_FORGE_CREATED_KUNAI_58500=API;
})();
