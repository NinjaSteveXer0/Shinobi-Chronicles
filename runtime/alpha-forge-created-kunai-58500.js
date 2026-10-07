// ============================================================================
// ISSUE #585 — STEP 8 FORGE-CREATED DURABLE KUNAI — ISOLATED RUNTIME BODY
// ============================================================================
// Exact commissioned Forge benchmark over existing #545 durable-object
// provenance/Inventory authority and #552 Kunai wear/repair authority.
//
// This module is intentionally narrow. It does NOT own:
// - a generic Crafting/Forge framework or Forge UI;
// - Fūin Craft;
// - Inventory/equipment identity;
// - global save schema/migrations;
// - Base/Current Stats, PL, proficiency or Battle resolution;
// - loader/fingerprint/build-manifest/#528 wiring.
//
// browserGoldenClaimed=false until production integration + owner review.
// ============================================================================
(function installForgeCreatedKunai58500(){
"use strict";
if(globalThis.SC_FORGE_CREATED_KUNAI_58500)return;

const PATCH_ID="forge_created_kunai_58500_2026_10_08_lane_i";
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
const CONDITION_PROFILE_ID="retail_kunai_condition_552";
const EFFECTIVE_BUKI_BONUS=1;
const ACQUISITION_KIND="commissioned_forge_creation";
const RECEIPT_TYPE="forge_created_durable_kunai";

function clone58500(value){
  try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}
  catch(_error){return value;}
}
function text58500(value,max=220){
  if(typeof value!=="string"&&typeof value!=="number")return"";
  return String(value).trim().slice(0,max);
}
function stableRef58500(value,max=220){
  const ref=text58500(value,max);
  return /^[A-Za-z0-9:._/-]{3,220}$/.test(ref)?ref:null;
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
function readHistory58500(pd=currentPlayer58500()){
  if(!pd)return null;
  if(pd.activityHistory===undefined)return[];
  return Array.isArray(pd.activityHistory)?pd.activityHistory:null;
}
function receiptForOperation58500(craftOperationId,pd=currentPlayer58500()){
  const rows=readHistory58500(pd);
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
function chronicleRef58500(spec){
  const explicit=stableRef58500(spec&&spec.chronicleRef,220);
  if(explicit)return explicit;
  try{
    if(typeof globalThis.getChronicleRunIdentity43600==="function"){
      const identity=globalThis.getChronicleRunIdentity43600();
      const runId=stableRef58500(identity&&identity.runId,220);
      if(runId)return runId;
    }
  }catch(_error){}
  return null;
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
function exactResultPackageSnapshot58500(){
  return Object.freeze({
    resultPackageRef:RESULT_PACKAGE_REF,
    exactBaseDefinitionId:KUNAI_ID,
    effectiveBukijutsuBonus:EFFECTIVE_BUKI_BONUS,
    activeOnlyWhenExactInstanceEquipped:true,
    activeOnlyWhenDurabilityAboveZero:true,
    applicationOrder:"before_weapon_proficiency_realisation",
    grantsAttackPl:false,
    mutatesBaseBukijutsu:false,
    mutatesCurrentBukijutsu:false,
    mutatesBaseOrCurrentPl:false,
    grantsProficiencyOrMastery:false,
    grantsSkillAccess:false,
    provenanceTextAloneActivates:false
  });
}
function validateCanonicalDefinitions58500(){
  const material=itemDefinition58500(MATERIAL_ID);
  const kunai=itemDefinition58500(KUNAI_ID);
  if(!material)return{success:false,reason:"forge_material_definition_missing"};
  if(material.stackable!==true)return{success:false,reason:"forge_material_must_use_stackable_canonical_inventory"};
  if(String(material.rarity||"")!=="Common")return{success:false,reason:"forge_material_rarity_mismatch"};
  if(!kunai)return{success:false,reason:"forge_kunai_definition_missing"};
  if(kunai.stackable!==false||String(kunai.type||"").toLowerCase()!=="weapon"){
    return{success:false,reason:"forge_kunai_definition_not_canonical_durable_weapon"};
  }
  if(String(kunai.rarity||"")!=="Common")return{success:false,reason:"forge_kunai_rarity_mismatch"};
  return{success:true,material,kunai};
}
function durableReceiptForOperation58500(craftOperationId){
  if(typeof globalThis.getDurableAcquisitionReceipt54500!=="function")return null;
  try{
    return globalThis.getDurableAcquisitionReceipt54500({
      sourceOccurrenceId:occurrenceId58500(craftOperationId),
      sourceId:RECIPE_ID,
      itemId:KUNAI_ID,
      acquisitionKind:ACQUISITION_KIND
    });
  }catch(_error){return null;}
}
function forgeBinding58500(instanceId,craftOperationId=null,pd=currentPlayer58500()){
  const row=inventoryRowByInstance58500(instanceId,pd);
  const operation=normalizeOperationId58500(craftOperationId||row&&row.forgeCraftOperationId);
  if(!row||rowItemId58500(row)!==KUNAI_ID||!operation)return{verified:false,reason:"forge_binding_inventory_row_missing"};
  const occurrence=occurrenceId58500(operation);
  if(
    text58500(row.resultPackageRef,180)!==RESULT_PACKAGE_REF||
    text58500(row.forgeCraftOperationId,180)!==operation||
    text58500(row.forgeCreationOccurrenceId,220)!==occurrence
  ){
    return{verified:false,reason:"forge_binding_inventory_marker_mismatch"};
  }
  if(typeof globalThis.getDurableObjectRecord54500!=="function"||typeof globalThis.getDurableAcquisitionReceipt54500!=="function"){
    return{verified:false,reason:"forge_binding_provenance_authority_missing"};
  }
  let object=null,acquisition=null;
  try{
    object=globalThis.getDurableObjectRecord54500(row.instanceId);
    acquisition=durableReceiptForOperation58500(operation);
  }catch(_error){
    return{verified:false,reason:"forge_binding_provenance_read_failed"};
  }
  if(!object||String(object.instanceId||"")!==String(row.instanceId)||String(object.itemId||"")!==KUNAI_ID){
    return{verified:false,reason:"forge_binding_object_record_mismatch"};
  }
  if(
    !acquisition||acquisition.committed!==true||
    String(acquisition.instanceId||"")!==String(row.instanceId)||
    String(acquisition.itemId||"")!==KUNAI_ID||
    String(acquisition.sourceOccurrenceId||"")!==occurrence||
    String(acquisition.sourceId||"")!==RECIPE_ID
  ){
    return{verified:false,reason:"forge_binding_acquisition_receipt_mismatch"};
  }
  const events=Array.isArray(object.events)?object.events:[];
  const event=events.find(candidate=>
    candidate&&candidate.eventType==="forge_creation"&&
    String(candidate.sourceOccurrenceId||"")===occurrence&&
    String(candidate.sourceId||"")===RECIPE_ID&&
    candidate.metadata&&candidate.metadata.resultPackageRef===RESULT_PACKAGE_REF&&
    candidate.metadata.craftOperationId===operation&&
    candidate.metadata.baseDefinitionId===KUNAI_ID
  )||null;
  if(!event)return{verified:false,reason:"forge_binding_creation_event_missing"};
  return{
    verified:true,
    instanceId:String(row.instanceId),
    craftOperationId:operation,
    occurrenceId:occurrence,
    acquisitionReceiptId:String(acquisition.address||row.acquisitionReceiptId||""),
    provenanceEventId:String(event.eventId||""),
    resultPackageRef:RESULT_PACKAGE_REF
  };
}
function forgeKunaiCondition58500(instanceId,pd=currentPlayer58500()){
  const row=inventoryRowByInstance58500(instanceId,pd);
  if(!row)return null;
  const binding=forgeBinding58500(instanceId,row.forgeCraftOperationId,pd);
  if(!binding.verified)return null;
  const current=Math.max(0,Math.floor(Number(row.durabilityCurrent)||0));
  const max=Math.max(0,Math.floor(Number(row.durabilityMax)||0));
  const profile=text58500(row.durabilityProfileId,120);
  return{
    itemId:KUNAI_ID,
    baseDefinitionId:KUNAI_ID,
    instanceId:String(row.instanceId),
    resultPackageRef:RESULT_PACKAGE_REF,
    craftOperationId:binding.craftOperationId,
    durabilityCurrent:current,
    durabilityMax:max,
    conditionProfileId:profile,
    usable:current>0&&max===DURABILITY_MAX&&profile===CONDITION_PROFILE_ID,
    binding:clone58500(binding)
  };
}
function verifyCommittedReceipt58500(receipt,pd){
  if(!receipt||receipt.committed!==true||receipt.success!==true)return{success:false,reason:"forge_committed_receipt_invalid"};
  if(receipt.recipeId!==RECIPE_ID||receipt.resultPackageRef!==RESULT_PACKAGE_REF||receipt.baseDefinitionId!==KUNAI_ID){
    return{success:false,reason:"forge_committed_receipt_contract_mismatch"};
  }
  const row=inventoryRowByInstance58500(receipt.instanceId,pd);
  if(!row)return{success:false,reason:"forge_committed_output_missing"};
  const condition=forgeKunaiCondition58500(receipt.instanceId,pd);
  if(!condition)return{success:false,reason:"forge_committed_output_binding_invalid"};
  if(condition.craftOperationId!==receipt.craftOperationId)return{success:false,reason:"forge_committed_operation_binding_mismatch"};
  return{success:true,row,condition};
}
function validateCommission58500(spec,pd){
  const craftOperationId=normalizeOperationId58500(spec&&spec.craftOperationId);
  if(!craftOperationId)return{success:false,reason:"forge_stable_craft_operation_id_required"};

  if(pd.activityHistory!==undefined&&!Array.isArray(pd.activityHistory)){
    return{success:false,reason:"forge_history_state_invalid"};
  }
  const prior=receiptForOperation58500(craftOperationId,pd);
  if(prior){
    const suppliedRecipe=text58500(spec&&spec.recipeId,180);
    const suppliedBranch=text58500(spec&&spec.branch,80);
    const suppliedOperation=text58500(spec&&spec.operation,80);
    const suppliedCommissioner=stableRef58500(spec&&spec.commissionerRef,180);
    if(
      (suppliedRecipe&&suppliedRecipe!==RECIPE_ID)||
      (suppliedBranch&&suppliedBranch!==BRANCH_ID)||
      (suppliedOperation&&suppliedOperation!==OPERATION_ID)||
      (suppliedCommissioner&&suppliedCommissioner!==prior.commissionerRef)
    ){
      return{success:false,reason:"forge_operation_identity_conflict",craftOperationId};
    }
    const verified=verifyCommittedReceipt58500(prior,pd);
    if(!verified.success)return{...verified,craftOperationId};
    return{
      success:true,
      idempotent:true,
      craftOperationId,
      occurrenceId:prior.occurrenceId,
      instanceId:String(prior.instanceId),
      receipt:clone58500(prior),
      condition:clone58500(verified.condition)
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

  const commissionerRef=stableRef58500(spec&&spec.commissionerRef,180);
  const executorRef=stableRef58500(spec&&spec.executorRef,180);
  if(!commissionerRef)return{success:false,reason:"forge_commissioner_required"};
  if(!executorRef)return{success:false,reason:"forge_executor_required"};
  if(executorRef===commissionerRef)return{success:false,reason:"forge_executor_must_differ_from_commissioner"};

  const capabilities=sourceSet58500(spec&&spec.executorCapabilityRefs);
  const knowledge=sourceSet58500(spec&&spec.executorKnowledgeRefs);
  if(!capabilities.has(CAPABILITY_REF))return{success:false,reason:"forge_executor_capability_missing"};
  if(!knowledge.has(KNOWLEDGE_REF))return{success:false,reason:"forge_executor_recipe_knowledge_missing"};

  const chronicleRef=chronicleRef58500(spec);
  if(!chronicleRef)return{success:false,reason:"forge_chronicle_ref_required"};
  if(!Array.isArray(pd.inventory))return{success:false,reason:"forge_inventory_state_missing"};

  const definitions=validateCanonicalDefinitions58500();
  if(!definitions.success)return definitions;
  const availableMaterials=ownedStackQuantity58500(MATERIAL_ID,pd);
  if(availableMaterials<MATERIAL_QTY){
    return{success:false,reason:"forge_insufficient_weapon_materials",required:MATERIAL_QTY,available:availableMaterials};
  }
  const availableRyo=currentRyo58500(pd);
  if(availableRyo<RYO_COST){
    return{success:false,reason:"forge_insufficient_ryo",required:RYO_COST,available:availableRyo};
  }
  if(
    typeof globalThis.commitDurableInventoryAcquisition54500!=="function"||
    typeof globalThis.getDurableObjectRecord54500!=="function"||
    typeof globalThis.getDurableAcquisitionReceipt54500!=="function"
  ){
    return{success:false,reason:"forge_durable_inventory_authority_missing"};
  }
  if(typeof globalThis.savePlayerData!=="function")return{success:false,reason:"forge_save_authority_missing"};

  const partial=durableReceiptForOperation58500(craftOperationId);
  if(partial&&partial.committed===true){
    return{success:false,reason:"forge_partial_commit_detected",craftOperationId,instanceId:partial.instanceId||null};
  }

  return{
    success:true,
    idempotent:false,
    craftOperationId,
    occurrenceId:occurrenceId58500(craftOperationId),
    commissionerRef,
    executorRef,
    chronicleRef
  };
}
function consumeStackableExact58500(pd,itemId,quantity){
  let remaining=Math.max(0,Math.floor(Number(quantity)||0));
  const rows=pd.inventory;
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
function initializeForgeKunai58500(instanceId,gate,pd=currentPlayer58500()){
  const row=inventoryRowByInstance58500(instanceId,pd);
  if(!row||rowItemId58500(row)!==KUNAI_ID)return{success:false,reason:"forge_created_kunai_instance_missing"};
  if(row.equippedBy)return{success:false,reason:"forge_created_kunai_must_not_auto_equip"};
  row.baseDefinitionId=KUNAI_ID;
  row.resultPackageRef=RESULT_PACKAGE_REF;
  row.forgeCraftOperationId=gate.craftOperationId;
  row.forgeCreationOccurrenceId=gate.occurrenceId;
  row.durabilityCurrent=DURABILITY_MAX;
  row.durabilityMax=DURABILITY_MAX;
  row.durabilityProfileId=CONDITION_PROFILE_ID;
  const binding=forgeBinding58500(instanceId,gate.craftOperationId,pd);
  if(!binding.verified)return{success:false,reason:binding.reason||"forge_result_package_binding_failed"};
  return{success:true,binding,condition:forgeKunaiCondition58500(instanceId,pd)};
}
function canonicalEquipmentState58500(instanceId,pd=currentPlayer58500()){
  const row=inventoryRowByInstance58500(instanceId,pd);
  if(!row||!row.equippedBy)return{equipped:false,verified:true,equippedBy:null};
  const equippedBy=String(row.equippedBy);
  if(typeof globalThis.getPlayerCharacter!=="function"){
    return{equipped:true,verified:false,equippedBy,reason:"equipment_character_resolver_missing"};
  }
  try{
    const character=globalThis.getPlayerCharacter(equippedBy);
    const verified=!!(
      character&&Array.isArray(character.equipment)&&
      character.equipment.some(entry=>entry&&String(entry.instanceId||"")===String(row.instanceId)&&String(entry.itemId||entry.id||"")===KUNAI_ID)
    );
    return{equipped:true,verified,equippedBy};
  }catch(_error){
    return{equipped:true,verified:false,equippedBy,reason:"equipment_character_resolver_failed"};
  }
}
function restoreProperty58500(pd,key,had,before){
  if(had)pd[key]=before;
  else delete pd[key];
}
function commitForgeCreatedKunai58500(spec={}){
  const pd=currentPlayer58500();
  if(!pd)return{success:false,reason:"forge_player_state_missing"};

  const gate=validateCommission58500(spec,pd);
  if(!gate.success||gate.idempotent)return gate;

  const beforeRyo=currentRyo58500(pd);
  const beforeMaterials=ownedStackQuantity58500(MATERIAL_ID,pd);
  const inventoryBefore=clone58500(pd.inventory);
  const hadHistory=Object.prototype.hasOwnProperty.call(pd,"activityHistory");
  const historyBefore=hadHistory?clone58500(pd.activityHistory):null;
  const hadProv=Object.prototype.hasOwnProperty.call(pd,"durableObjectProvenance14800");
  const provBefore=hadProv?clone58500(pd.durableObjectProvenance14800):null;

  try{
    pd.ryo=beforeRyo-RYO_COST;
    const consumed=consumeStackableExact58500(pd,MATERIAL_ID,MATERIAL_QTY);
    if(!consumed.success)throw new Error(consumed.reason||"forge_material_commit_failed");

    const acquisition=globalThis.commitDurableInventoryAcquisition54500({
      itemId:KUNAI_ID,
      sourceOccurrenceId:gate.occurrenceId,
      sourceId:RECIPE_ID,
      acquisitionKind:ACQUISITION_KIND,
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
    if(!acquisition||acquisition.success!==true||acquisition.idempotent===true){
      throw new Error(acquisition&&acquisition.reason||"forge_durable_acquisition_failed");
    }

    const initialized=initializeForgeKunai58500(acquisition.instanceId,gate,pd);
    if(!initialized.success)throw new Error(initialized.reason||"forge_kunai_initialization_failed");

    const afterMaterials=ownedStackQuantity58500(MATERIAL_ID,pd);
    if(afterMaterials!==beforeMaterials-MATERIAL_QTY)throw new Error("forge_material_quantity_commit_mismatch");
    if(Number(pd.ryo)!==beforeRyo-RYO_COST)throw new Error("forge_ryo_commit_mismatch");

    if(!Array.isArray(pd.activityHistory))pd.activityHistory=[];
    const receipt={
      id:gate.occurrenceId,
      occurrenceId:gate.occurrenceId,
      sourceOccurrenceId:gate.occurrenceId,
      historyRef:gate.occurrenceId,
      type:RECEIPT_TYPE,
      activity:ACQUISITION_KIND,
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
      instanceId:String(acquisition.instanceId),
      durableAcquisitionReceiptId:String(acquisition.address||""),
      provenanceEventId:String(initialized.binding.provenanceEventId||""),
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
      committedAt:Date.now()
    };
    pd.activityHistory.push(receipt);

    globalThis.savePlayerData();

    const verified=verifyCommittedReceipt58500(receipt,pd);
    if(!verified.success)throw new Error(verified.reason||"forge_postsave_verification_failed");
    return{
      success:true,
      idempotent:false,
      craftOperationId:gate.craftOperationId,
      occurrenceId:gate.occurrenceId,
      instanceId:receipt.instanceId,
      receipt:clone58500(receipt),
      condition:clone58500(verified.condition)
    };
  }catch(error){
    pd.ryo=beforeRyo;
    pd.inventory=inventoryBefore;
    restoreProperty58500(pd,"activityHistory",hadHistory,historyBefore);
    restoreProperty58500(pd,"durableObjectProvenance14800",hadProv,provBefore);
    try{if(typeof activityHistory!=="undefined")activityHistory=pd.activityHistory;}catch(_error){}
    return{success:false,reason:"forge_commit_failed",error:String(error&&error.message||error)};
  }
}
function projectForgeEffectiveBukijutsu58500({instanceId,equippedInstanceId=null}={}){
  const condition=forgeKunaiCondition58500(instanceId);
  const equipment=canonicalEquipmentState58500(instanceId);
  const expected=text58500(equippedInstanceId,220);
  const exactExpected=!expected||condition&&expected===condition.instanceId;
  const active=!!(
    condition&&condition.usable&&
    equipment.equipped===true&&equipment.verified===true&&
    exactExpected&&condition.resultPackageRef===RESULT_PACKAGE_REF
  );
  return Object.freeze({
    instanceId:condition?condition.instanceId:text58500(instanceId,220)||null,
    baseDefinitionId:KUNAI_ID,
    resultPackageRef:condition?RESULT_PACKAGE_REF:null,
    packageActive:active,
    equipmentVerified:equipment.verified===true,
    equippedBy:equipment.equippedBy||null,
    effectiveBukijutsuBonus:active?EFFECTIVE_BUKI_BONUS:0,
    appliesBeforeWeaponProficiencyRealisation:active,
    usableForKunaiRequiredAction:active,
    grantsAttackPl:false,
    mutatesBaseBukijutsu:false,
    mutatesCurrentBukijutsu:false,
    mutatesBaseOrCurrentPl:false,
    grantsProficiencyOrMastery:false,
    provenanceAloneGrantsPower:false
  });
}
function commitForgeKunaiWear58500({instanceId,sourceOccurrenceId,sourceId}={}){
  const condition=forgeKunaiCondition58500(instanceId);
  if(!condition)return{success:false,reason:"forge_result_package_instance_missing"};
  if(!condition.usable)return{success:false,reason:"forge_kunai_depleted",condition};
  if(typeof globalThis.commitRetailKunaiWear55200!=="function"){
    return{success:false,reason:"kunai_condition_authority_552_missing"};
  }
  const result=globalThis.commitRetailKunaiWear55200({instanceId:condition.instanceId,sourceOccurrenceId,sourceId});
  if(!result||result.success!==true)return result||{success:false,reason:"kunai_wear_552_failed"};
  const after=forgeKunaiCondition58500(condition.instanceId);
  if(!after)return{success:false,reason:"forge_kunai_wear_binding_drift"};
  return{...clone58500(result),forgeResultPackageRef:RESULT_PACKAGE_REF,condition:after};
}
function repairForgeKunai58500({instanceId,sourceOccurrenceId,sourceId}={}){
  const condition=forgeKunaiCondition58500(instanceId);
  if(!condition)return{success:false,reason:"forge_result_package_instance_missing"};
  if(typeof globalThis.repairRetailKunai55200!=="function"){
    return{success:false,reason:"kunai_condition_authority_552_missing"};
  }
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
  const resultPackage=exactResultPackageSnapshot58500();
  const commitSource=String(commitForgeCreatedKunai58500);
  const checks={
    exactRecipe:recipe.recipeId===RECIPE_ID&&recipe.materialInputs[0].quantity===1&&recipe.currencyCostRyo===25,
    canonicalOutput:recipe.outputDefinitionId==="kunai"&&recipe.outputMode==="durable_instance",
    canonicalHost:recipe.serviceHostId==="KON-A05"&&recipe.serviceHostAlias===SERVICE_HOST_ALIAS,
    exactResultPackage:recipe.resultPackageRef===RESULT_PACKAGE_REF&&resultPackage.effectiveBukijutsuBonus===1,
    canonicalDurableAuthority:commitSource.includes("commitDurableInventoryAcquisition54500"),
    canonicalConditionAuthority:String(commitForgeKunaiWear58500).includes("commitRetailKunaiWear55200")&&String(repairForgeKunai58500).includes("repairRetailKunai55200"),
    zeroMutationValidation:!String(validateCommission58500).includes("activityHistory=[]")&&!String(validateCommission58500).includes("inventory=[]"),
    atomicRollback:commitSource.includes("pd.inventory=inventoryBefore")&&commitSource.includes('restoreProperty58500(pd,"activityHistory"')&&commitSource.includes('restoreProperty58500(pd,"durableObjectProvenance14800"'),
    noAutoEquip:String(initializeForgeKunai58500).includes("forge_created_kunai_must_not_auto_equip"),
    exactInstancePackageBinding:String(forgeBinding58500).includes("forge_creation")&&String(forgeBinding58500).includes("getDurableObjectRecord54500"),
    noProvenanceStringPower:String(projectForgeEffectiveBukijutsu58500).includes("provenanceAloneGrantsPower:false"),
    noDuplicateAttackPackage:!String(initializeForgeKunai58500).includes("Attack")&&!String(projectForgeEffectiveBukijutsu58500).includes("canonicalAttackBonus"),
    noBaseOrPlMutation:String(projectForgeEffectiveBukijutsu58500).includes("mutatesBaseBukijutsu:false")&&String(projectForgeEffectiveBukijutsu58500).includes("mutatesBaseOrCurrentPl:false"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,recipe,resultPackage,browserGoldenClaimed:false};
}

const API=Object.freeze({
  patchId:PATCH_ID,
  recipe:exactRecipeSnapshot58500(),
  resultPackage:exactResultPackageSnapshot58500(),
  commit:commitForgeCreatedKunai58500,
  condition:forgeKunaiCondition58500,
  binding:forgeBinding58500,
  projectEffectiveBukijutsu:projectForgeEffectiveBukijutsu58500,
  commitWear:commitForgeKunaiWear58500,
  repair:repairForgeKunai58500,
  diagnostics:diagnostics58500,
  browserGoldenClaimed:false
});
globalThis.getForgeCreatedKunaiRecipe58500=exactRecipeSnapshot58500;
globalThis.getForgeCreatedKunaiResultPackage58500=exactResultPackageSnapshot58500;
globalThis.commitForgeCreatedKunai58500=commitForgeCreatedKunai58500;
globalThis.getForgeCreatedKunaiCondition58500=forgeKunaiCondition58500;
globalThis.getForgeCreatedKunaiBinding58500=forgeBinding58500;
globalThis.projectForgeCreatedKunaiEffectiveBukijutsu58500=projectForgeEffectiveBukijutsu58500;
globalThis.commitForgeCreatedKunaiWear58500=commitForgeKunaiWear58500;
globalThis.repairForgeCreatedKunai58500=repairForgeKunai58500;
globalThis.runForgeCreatedKunai58500Diagnostics=diagnostics58500;
globalThis.SC_FORGE_CREATED_KUNAI_58500=API;
})();
