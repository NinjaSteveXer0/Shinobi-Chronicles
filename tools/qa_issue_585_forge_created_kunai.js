#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const TARGET=path.resolve(process.argv[2]||process.env.FORGE_585_TARGET||path.join(__dirname,"../runtime/alpha-forge-created-kunai-58500.js"));
if(!fs.existsSync(TARGET)){console.error(JSON.stringify({issue:585,pass:false,reason:"forge_585_target_missing",target:TARGET,browserGoldenClaimed:false}));process.exit(2);}
const SOURCE=fs.readFileSync(TARGET,"utf8");
const clone=v=>JSON.parse(JSON.stringify(v));

function boot(){
  let serial=0;
  const c={console,Date,JSON,Math,Object,Array,Set,Map,String,Number,Boolean,RegExp,Error};
  c.globalThis=c;
  c.playerData={ryo:100,inventory:[{id:"weapon_materials",itemId:"weapon_materials",quantity:2,rarity:"Common"}],activityHistory:[]};
  c.activityHistory=c.playerData.activityHistory;
  c.__characters={
    academy_kakashi:{id:"academy_kakashi",name:"Kakashi",equipment:[]},
    academy_hinata:{id:"academy_hinata",name:"Hinata",equipment:[]}
  };
  c.getPlayerCharacter=id=>c.__characters[id]||null;
  c.getItemDefinition=id=>id==="weapon_materials"?{id,name:"Weapon Materials",type:"material",stackable:true,rarity:"Common"}:id==="kunai"?{id,name:"Kunai",type:"weapon",stackable:false,rarity:"Common",attackBonus:5}:null;
  c.addItemToInventory=item=>{serial+=1;c.playerData.inventory.push({id:item.id,itemId:item.id,name:item.name,instanceId:`qa585_obj_${serial}`,quantity:1,rarity:"Common"});};
  c.savePlayerData=()=>{if(c.__saveFailure)throw new Error("qa585_save_failure");c.__saved=clone(c.playerData);return true;};
  c.SC_PHASE2_BASIC_ITEM_SHOP_51700={retailKunai:{profileId:"retail_kunai_condition_552"}};

  const addressOf=spec=>["durable_acquisition_v1",String(spec.sourceOccurrenceId||""),String(spec.sourceId||""),String(spec.itemId||""),String(spec.acquisitionKind||"acquisition")].join("|");
  c.getDurableObjectRecord54500=instanceId=>{const root=c.playerData.durableObjectProvenance14800,row=root&&root.objectsByInstanceId&&root.objectsByInstanceId[String(instanceId||"")];return row?clone(row):null;};
  c.getDurableAcquisitionReceipt54500=addressOrSpec=>{const root=c.playerData.durableObjectProvenance14800;if(!root||!root.acquisitionReceipts)return null;const address=typeof addressOrSpec==="string"?addressOrSpec:addressOf(addressOrSpec||{}),row=root.acquisitionReceipts[address];return row?clone(row):null;};
  c.commitDurableInventoryAcquisition54500=spec=>{
    if(c.__acquisitionFailure)return{success:false,reason:"qa585_acquisition_failure"};
    const p=c.playerData;p.durableObjectProvenance14800||={schemaVersion:1,objectsByInstanceId:{},acquisitionReceipts:{}};
    const root=p.durableObjectProvenance14800,address=addressOf(spec);
    if(root.acquisitionReceipts[address]){const prior=root.acquisitionReceipts[address],object=root.objectsByInstanceId[prior.instanceId];return{success:true,idempotent:true,address,instanceId:prior.instanceId,receipt:clone(prior),object:clone(object),currentlyInInventory:!!p.inventory.find(r=>r.instanceId===prior.instanceId)};}
    const before=new Set(p.inventory.filter(r=>r.instanceId).map(r=>r.instanceId));c.addItemToInventory({id:spec.itemId,name:"Kunai"});
    const row=p.inventory.find(r=>r.instanceId&&!before.has(r.instanceId));if(!row)return{success:false,reason:"qa585_mint_failed"};
    const eventId=["durable_provenance_v1",row.instanceId,spec.eventType,spec.sourceOccurrenceId,spec.sourceId].join("|");
    const event={eventId,eventType:spec.eventType,instanceId:row.instanceId,itemId:spec.itemId,sourceOccurrenceId:spec.sourceOccurrenceId,sourceId:spec.sourceId,sourceRefs:clone(spec.sourceRefs||[]),metadata:clone(spec.metadata||{}),provenanceWorthy:true,committedAt:Date.now()};
    root.objectsByInstanceId[row.instanceId]={schemaVersion:1,instanceId:row.instanceId,itemId:spec.itemId,identityOrigin:"ownership_commit",identityCommittedAt:Date.now(),events:[event]};
    const receipt={schemaVersion:1,address,instanceId:row.instanceId,itemId:spec.itemId,acquisitionKind:spec.acquisitionKind,sourceOccurrenceId:spec.sourceOccurrenceId,sourceId:spec.sourceId,provenanceEventId:eventId,committed:true,committedAt:Date.now()};
    root.acquisitionReceipts[address]=receipt;
    row.provenanceObjectId=row.instanceId;row.acquisitionReceiptId=address;row.sourceOccurrenceId=spec.sourceOccurrenceId;row.rewardSourceId=spec.sourceId;row.provenanceRefs=[eventId,spec.sourceOccurrenceId,spec.sourceId,...(spec.sourceRefs||[])];row.provenance={receiptId:address,sourceOccurrenceId:spec.sourceOccurrenceId,sourceRefs:clone(row.provenanceRefs)};
    return{success:true,idempotent:false,address,instanceId:row.instanceId,receipt:clone(receipt),object:clone(root.objectsByInstanceId[row.instanceId]),currentlyInInventory:true};
  };

  const condition=id=>{const r=c.playerData.inventory.find(x=>x.instanceId===id);return r?{instanceId:id,durabilityCurrent:+r.durabilityCurrent||0,durabilityMax:+r.durabilityMax||0,usable:(+r.durabilityCurrent||0)>0}:null;};
  c.commitRetailKunaiWear55200=({instanceId,sourceOccurrenceId,sourceId})=>{const r=c.playerData.inventory.find(x=>x.instanceId===instanceId);if(!r)return{success:false,reason:"retail_kunai_instance_missing"};r.retailKunaiConditionHistory55200||=[];const eventId=`wear|${instanceId}|${sourceOccurrenceId}|${sourceId}`,old=r.retailKunaiConditionHistory55200.find(e=>e.eventId===eventId);if(old)return{success:true,idempotent:true,event:clone(old),condition:condition(instanceId)};if(r.durabilityCurrent<=0)return{success:false,reason:"retail_kunai_depleted",condition:condition(instanceId)};const before=r.durabilityCurrent;r.durabilityCurrent-=1;const event={eventId,durabilityBefore:before,durabilityAfter:r.durabilityCurrent};r.retailKunaiConditionHistory55200.push(event);c.savePlayerData();return{success:true,idempotent:false,event,condition:condition(instanceId)};};
  c.repairRetailKunai55200=({instanceId,sourceOccurrenceId,sourceId})=>{const r=c.playerData.inventory.find(x=>x.instanceId===instanceId);if(!r)return{success:false,reason:"retail_kunai_instance_missing"};r.retailKunaiConditionHistory55200||=[];const eventId=`repair|${instanceId}|${sourceOccurrenceId}|${sourceId}`,old=r.retailKunaiConditionHistory55200.find(e=>e.eventId===eventId);if(old)return{success:true,idempotent:true,event:clone(old),condition:condition(instanceId)};const before=r.durabilityCurrent;r.durabilityCurrent=10;const event={eventId,durabilityBefore:before,durabilityAfter:10};r.retailKunaiConditionHistory55200.push(event);c.savePlayerData();return{success:true,idempotent:false,event,condition:condition(instanceId)};};
  vm.createContext(c);vm.runInContext(SOURCE,c,{filename:path.basename(TARGET)});return c;
}
function spec(extra={}){return{craftOperationId:"forge585:adv:001",recipeId:"forge_create_precision_balanced_kunai_v1",branch:"forge",operation:"create",serviceHostId:"KON-A05",serviceHostAlias:"village:konoha:craft_quarter:forge",servicePermission:true,commissionerRef:"academy_kakashi",executorRef:"konoha_forge_service_executor_role_v1",executorCapabilityRefs:["executor_capability_forge_standard_weaponcraft_v1"],executorKnowledgeRefs:["recipe_knowledge_forge_create_precision_balanced_kunai_v1"],chronicleRef:"chronicle:qa:585:adversarial",...extra};}
const snap=c=>JSON.stringify(c.playerData);
const mats=c=>c.playerData.inventory.filter(r=>!r.instanceId&&(r.id||r.itemId)==="weapon_materials").reduce((n,r)=>n+(+r.quantity||0),0);
function expectZeroMutationFailure(c,input,label,reasons=null){const before=snap(c),result=c.commitForgeCreatedKunai58500(input);assert.strictEqual(result.success,false,`${label}: unexpectedly succeeded ${JSON.stringify(result)}`);if(reasons)assert(reasons.includes(result.reason),`${label}: unexpected reason ${result.reason}`);assert.strictEqual(snap(c),before,`${label}: failure mutated player state`);return result;}

const recipeProbe=boot(),recipe=recipeProbe.getForgeCreatedKunaiRecipe58500();
assert.deepStrictEqual(JSON.parse(JSON.stringify(recipe.materialInputs)),[{definitionId:"weapon_materials",quantity:1}]);assert.strictEqual(recipe.currencyCostRyo,25);assert.strictEqual(recipe.outputMode,"durable_instance");assert.strictEqual(recipe.outputDefinitionId,"kunai");assert.strictEqual(recipe.resultPackageRef,"forge_result_precision_balanced_kunai_v1");assert.strictEqual(recipe.serviceHostId,"KON-A05");

for(const [name,patch,reasons] of [["unknown-recipe",{recipeId:"not_a_recipe"},["forge_recipe_unknown_or_mismatch"]],["branch-mismatch",{branch:"fuin"},["forge_branch_operation_mismatch"]],["no-service-permission",{servicePermission:false},["forge_service_permission_required"]],["missing-commissioner",{commissionerRef:""},["forge_commissioner_required"]],["invalid-commissioner",{commissionerRef:"not_a_player_character"},["forge_commissioner_invalid"]],["same-executor-commissioner",{executorRef:"academy_kakashi"},["forge_executor_must_differ_from_commissioner"]],["missing-executor-capability",{executorCapabilityRefs:[]},["forge_executor_capability_missing"]],["missing-executor-knowledge",{executorKnowledgeRefs:[]},["forge_executor_recipe_knowledge_missing"]],["unstable-operation-id",{craftOperationId:"bad id"},["forge_stable_craft_operation_id_required"]]]){const c=boot();expectZeroMutationFailure(c,spec({...patch,craftOperationId:patch.craftOperationId||`forge585:adv:${name}`}),name,reasons);}

{
  const c=boot();expectZeroMutationFailure(c,spec({craftOperationId:"forge585:adv:host-conflict",serviceHostId:"KON-P09",serviceHostAlias:"village:konoha:craft_quarter:forge"}),"contradictory-host-context",["forge_service_host_invalid"]);
}
{
  const c=boot();expectZeroMutationFailure(c,spec({craftOperationId:"forge585:adv:alias-conflict",serviceHostId:"KON-A05",serviceHostAlias:"village:konoha:not-the-forge"}),"contradictory-host-alias",["forge_service_host_alias_invalid"]);
}
{
  const c=boot();c.playerData.inventory[0].quantity=0;expectZeroMutationFailure(c,spec({craftOperationId:"forge585:adv:no-material"}),"no-material",["forge_insufficient_weapon_materials"]);
}
{
  const c=boot();c.playerData.ryo=24;expectZeroMutationFailure(c,spec({craftOperationId:"forge585:adv:no-ryo"}),"no-ryo",["forge_insufficient_ryo"]);
}
{
  const c=boot();c.__acquisitionFailure=true;expectZeroMutationFailure(c,spec({craftOperationId:"forge585:adv:acquisition-failure"}),"acquisition-failure",["forge_commit_failed"]);
}
{
  const c=boot();c.__saveFailure=true;expectZeroMutationFailure(c,spec({craftOperationId:"forge585:adv:save-failure"}),"save-failure",["forge_commit_failed"]);
}

const c=boot(),beforeInv=c.playerData.inventory.length,made=c.commitForgeCreatedKunai58500(spec());
assert.strictEqual(made.success,true);assert.strictEqual(made.idempotent,false);assert.strictEqual(mats(c),1);assert.strictEqual(c.playerData.ryo,75);
const id=made.instanceId,row=c.playerData.inventory.find(r=>r.instanceId===id);assert(row);assert.strictEqual(c.playerData.inventory.length,beforeInv+1);assert.strictEqual(row.baseDefinitionId,"kunai");assert.strictEqual(row.resultPackageRef,"forge_result_precision_balanced_kunai_v1");assert.strictEqual(row.durabilityCurrent,10);assert.strictEqual(row.durabilityMax,10);assert.strictEqual(row.equippedBy,undefined);
const object=c.playerData.durableObjectProvenance14800.objectsByInstanceId[id];assert(object);assert.strictEqual(object.events.length,1);const prov=object.events[0];assert.strictEqual(prov.eventType,"forge_creation");assert.strictEqual(prov.metadata.recipeId,"forge_create_precision_balanced_kunai_v1");assert.strictEqual(prov.metadata.craftOperationId,"forge585:adv:001");assert.strictEqual(prov.metadata.resultPackageRef,"forge_result_precision_balanced_kunai_v1");assert.strictEqual(prov.metadata.baseDefinitionId,"kunai");

const committed=snap(c),retry=c.commitForgeCreatedKunai58500(spec());assert.strictEqual(retry.success,true);assert.strictEqual(retry.idempotent,true);assert.strictEqual(retry.instanceId,id);assert.strictEqual(snap(c),committed);expectZeroMutationFailure(c,spec({commissionerRef:"academy_hinata"}),"same-operation-different-commissioner",["forge_operation_identity_conflict"]);

let projection=c.projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:id,equippedInstanceId:id});assert.strictEqual(projection.effectiveBukijutsuBonus,0);assert.strictEqual(projection.equipmentVerified,true);
row.equippedBy="academy_kakashi";c.__characters.academy_kakashi.equipment=[{itemId:"kunai",instanceId:id}];projection=c.projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:id,equippedInstanceId:id});assert.strictEqual(projection.effectiveBukijutsuBonus,1);assert.strictEqual(projection.packageActive,true);assert.strictEqual(projection.appliesBeforeWeaponProficiencyRealisation,true);assert.strictEqual(projection.usableForKunaiRequiredAction,true);assert.strictEqual(projection.mutatesBaseBukijutsu,false);assert.strictEqual(projection.mutatesBaseOrCurrentPl,false);
projection=c.projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:id,equippedInstanceId:"some_other_object"});assert.strictEqual(projection.effectiveBukijutsuBonus,0);

c.playerData.inventory.push({id:"kunai",itemId:"kunai",instanceId:"retail_552_adv",durabilityCurrent:10,durabilityMax:10,durabilityProfileId:"retail_kunai_condition_552",resultPackageRef:"forge_result_precision_balanced_kunai_v1",forgeCraftOperationId:"forge585:spoof:001",forgeCreationOccurrenceId:"forge_create_precision_balanced_kunai::forge585:spoof:001",equippedBy:"academy_hinata",provenance:{label:"forge_result_precision_balanced_kunai_v1"}});c.__characters.academy_hinata.equipment=[{itemId:"kunai",instanceId:"retail_552_adv"}];projection=c.projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:"retail_552_adv",equippedInstanceId:"retail_552_adv"});assert.strictEqual(projection.effectiveBukijutsuBonus,0);assert.strictEqual(projection.packageActive,false);

const wear=c.commitForgeCreatedKunaiWear58500({instanceId:id,sourceOccurrenceId:"battle:adv:1",sourceId:"kunai-use"});assert.strictEqual(wear.success,true);assert.strictEqual(c.getForgeCreatedKunaiCondition58500(id).durabilityCurrent,9);const wearReplay=c.commitForgeCreatedKunaiWear58500({instanceId:id,sourceOccurrenceId:"battle:adv:1",sourceId:"kunai-use"});assert.strictEqual(wearReplay.idempotent,true);assert.strictEqual(c.getForgeCreatedKunaiCondition58500(id).durabilityCurrent,9);const repaired=c.repairForgeCreatedKunai58500({instanceId:id,sourceOccurrenceId:"forge:repair:adv:1",sourceId:"repair-service"});assert.strictEqual(repaired.success,true);assert.strictEqual(repaired.condition.instanceId,id);assert.strictEqual(repaired.condition.durabilityCurrent,10);
for(let n=0;n<10;n++)assert.strictEqual(c.commitForgeCreatedKunaiWear58500({instanceId:id,sourceOccurrenceId:`battle:drain:${n}`,sourceId:`kunai:${n}`}).success,true);projection=c.projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:id,equippedInstanceId:id});assert.strictEqual(projection.effectiveBukijutsuBonus,0);assert.strictEqual(projection.usableForKunaiRequiredAction,false);assert.strictEqual(c.commitForgeCreatedKunaiWear58500({instanceId:id,sourceOccurrenceId:"battle:after-zero",sourceId:"kunai"}).success,false);const zeroRepair=c.repairForgeCreatedKunai58500({instanceId:id,sourceOccurrenceId:"forge:repair:adv:zero",sourceId:"repair-service"});assert.strictEqual(zeroRepair.success,true);assert.strictEqual(zeroRepair.condition.instanceId,id);assert.strictEqual(zeroRepair.condition.durabilityCurrent,10);

c.savePlayerData();c.playerData=clone(c.__saved);c.activityHistory=c.playerData.activityHistory;assert.strictEqual(c.getForgeCreatedKunaiCondition58500(id).instanceId,id);assert.strictEqual(c.getForgeCreatedKunaiCondition58500(id).resultPackageRef,"forge_result_precision_balanced_kunai_v1");assert(c.playerData.durableObjectProvenance14800.objectsByInstanceId[id]);assert.strictEqual(c.commitForgeCreatedKunai58500(spec()).idempotent,true);

{
  const corrupt=boot(),made2=corrupt.commitForgeCreatedKunai58500(spec({craftOperationId:"forge585:adv:corrupt"}));assert.strictEqual(made2.success,true);const receipt=corrupt.playerData.activityHistory.find(r=>r&&r.craftOperationId==="forge585:adv:corrupt");corrupt.playerData.inventory=corrupt.playerData.inventory.filter(r=>r.instanceId!==receipt.instanceId);const before=snap(corrupt),again=corrupt.commitForgeCreatedKunai58500(spec({craftOperationId:"forge585:adv:corrupt"}));assert.strictEqual(again.success,false);assert.strictEqual(again.reason,"forge_committed_output_missing");assert.strictEqual(snap(corrupt),before);
}

const diag=c.runForgeCreatedKunai58500Diagnostics();assert.strictEqual(diag.browserGoldenClaimed,false);assert.strictEqual(diag.pass,true,JSON.stringify(diag.failed));
console.log(JSON.stringify({issue:585,pass:true,target:TARGET,defects626:{contradictoryHostRejected:true,invalidCommissionerRejected:true},transaction:{material:"2->1",ryo:"100->75",instanceId:id,durability:"10/10",autoEquip:false},idempotence:true,wearRepairSameInstance:true,retailOrSpoofBonus:0,canonicalForgedEquippedUsableBonus:1,saveReload:true,zeroMutationFailures:true,corruptReplayFailsClosed:true,browserGoldenClaimed:false},null,2));
console.log("PASS #585 Lane-J adversarial QA against corrected candidate; browserGoldenClaimed=false");
