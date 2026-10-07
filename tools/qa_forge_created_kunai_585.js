#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const SOURCE=fs.readFileSync(path.join(ROOT,"runtime","alpha-forge-created-kunai-58500.js"),"utf8");
const clone=v=>JSON.parse(JSON.stringify(v));

function boot(){
  let serial=0;
  const c={console,Date,JSON,Math,Object,Array,Set,Map,String,Number,Boolean,RegExp,Error};
  c.globalThis=c;
  c.playerData={ryo:100,inventory:[{id:"weapon_materials",itemId:"weapon_materials",quantity:2,rarity:"Common"}],activityHistory:[]};
  c.activityHistory=c.playerData.activityHistory;
  c.getItemDefinition=id=>id==="weapon_materials"
    ?{id,name:"Weapon Materials",type:"material",stackable:true,rarity:"Common"}
    :id==="kunai"?{id,name:"Kunai",type:"weapon",stackable:false,rarity:"Common",attackBonus:5}:null;
  c.addItemToInventory=item=>{serial++;c.playerData.inventory.push({id:item.id,itemId:item.id,name:item.name,instanceId:`qa_kunai_${serial}`,quantity:1,rarity:"Common"});};
  c.savePlayerData=()=>{if(c.__saveFailure)throw new Error("qa_save_failure");c.__saved=clone(c.playerData);};
  c.SC_PHASE2_BASIC_ITEM_SHOP_51700={retailKunai:{profileId:"retail_kunai_condition_552"}};
  c.commitDurableInventoryAcquisition54500=spec=>{
    if(c.__acquisitionFailure)return{success:false,reason:"qa_acquisition_failure"};
    const p=c.playerData;
    p.durableObjectProvenance14800||={schemaVersion:1,objectsByInstanceId:{},acquisitionReceipts:{}};
    const root=p.durableObjectProvenance14800,address=`qa|${spec.sourceOccurrenceId}|${spec.sourceId}|${spec.itemId}|${spec.acquisitionKind}`;
    if(root.acquisitionReceipts[address]){
      const prior=root.acquisitionReceipts[address];return{success:true,idempotent:true,address,instanceId:prior.instanceId,receipt:clone(prior)};
    }
    const before=new Set(p.inventory.filter(r=>r.instanceId).map(r=>r.instanceId));
    c.addItemToInventory({id:spec.itemId,name:"Kunai"});
    const row=p.inventory.find(r=>r.instanceId&&!before.has(r.instanceId));
    const event={eventType:spec.eventType,sourceOccurrenceId:spec.sourceOccurrenceId,sourceId:spec.sourceId,sourceRefs:clone(spec.sourceRefs),metadata:clone(spec.metadata)};
    root.objectsByInstanceId[row.instanceId]={instanceId:row.instanceId,itemId:spec.itemId,events:[event]};
    root.acquisitionReceipts[address]={address,instanceId:row.instanceId,itemId:spec.itemId,committed:true};
    return{success:true,idempotent:false,address,instanceId:row.instanceId,receipt:clone(root.acquisitionReceipts[address])};
  };
  const condition=id=>{const r=c.playerData.inventory.find(x=>x.instanceId===id);return r?{instanceId:id,durabilityCurrent:+r.durabilityCurrent||0,durabilityMax:+r.durabilityMax||0,usable:(+r.durabilityCurrent||0)>0}:null;};
  c.commitRetailKunaiWear55200=({instanceId,sourceOccurrenceId,sourceId})=>{
    const r=c.playerData.inventory.find(x=>x.instanceId===instanceId);if(!r)return{success:false,reason:"missing"};
    r.retailKunaiConditionHistory55200||=[];const eventId=`w|${sourceOccurrenceId}|${sourceId}`;
    const old=r.retailKunaiConditionHistory55200.find(e=>e.eventId===eventId);if(old)return{success:true,idempotent:true,event:clone(old),condition:condition(instanceId)};
    if(r.durabilityCurrent<=0)return{success:false,reason:"retail_kunai_depleted"};
    const before=r.durabilityCurrent;r.durabilityCurrent--;const event={eventId,durabilityBefore:before,durabilityAfter:r.durabilityCurrent};r.retailKunaiConditionHistory55200.push(event);c.savePlayerData();return{success:true,idempotent:false,event,condition:condition(instanceId)};
  };
  c.repairRetailKunai55200=({instanceId,sourceOccurrenceId,sourceId})=>{
    const r=c.playerData.inventory.find(x=>x.instanceId===instanceId);if(!r)return{success:false,reason:"missing"};
    r.retailKunaiConditionHistory55200||=[];const eventId=`r|${sourceOccurrenceId}|${sourceId}`;
    const old=r.retailKunaiConditionHistory55200.find(e=>e.eventId===eventId);if(old)return{success:true,idempotent:true,event:clone(old),condition:condition(instanceId)};
    const before=r.durabilityCurrent;r.durabilityCurrent=10;const event={eventId,durabilityBefore:before,durabilityAfter:10};r.retailKunaiConditionHistory55200.push(event);c.savePlayerData();return{success:true,idempotent:false,event,condition:condition(instanceId)};
  };
  vm.createContext(c);vm.runInContext(SOURCE,c,{filename:"alpha-forge-created-kunai-58500.js"});return c;
}
function spec(extra={}){return{craftOperationId:"forge585:qa:001",recipeId:"forge_create_precision_balanced_kunai_v1",branch:"forge",operation:"create",serviceHostId:"KON-A05",serviceHostAlias:"village:konoha:craft_quarter:forge",servicePermission:true,commissionerRef:"academy_kakashi",executorRef:"konoha_forge_service_executor_role_v1",executorCapabilityRefs:["executor_capability_forge_standard_weaponcraft_v1"],executorKnowledgeRefs:["recipe_knowledge_forge_create_precision_balanced_kunai_v1"],chronicleRef:"chronicle:qa:585",...extra};}
const fingerprint=c=>JSON.stringify(c.playerData);
const materialQty=c=>c.playerData.inventory.filter(r=>!r.instanceId&&(r.id||r.itemId)==="weapon_materials").reduce((n,r)=>n+(+r.quantity||0),0);

const c=boot(),recipe=c.getForgeCreatedKunaiRecipe58500();
assert.strictEqual(recipe.materialInputs[0].quantity,1);assert.strictEqual(recipe.currencyCostRyo,25);assert.strictEqual(recipe.outputDefinitionId,"kunai");assert.strictEqual(recipe.resultPackageRef,"forge_result_precision_balanced_kunai_v1");
for(const [patch,reason] of [[{servicePermission:false},"forge_service_permission_required"],[{serviceHostId:"bad",serviceHostAlias:"bad"},"forge_service_host_invalid"],[{executorCapabilityRefs:[]},"forge_executor_capability_missing"],[{executorKnowledgeRefs:[]},"forge_executor_recipe_knowledge_missing"]]){const before=fingerprint(c),r=c.commitForgeCreatedKunai58500(spec({...patch,craftOperationId:`forge585:bad:${reason}`}));assert.strictEqual(r.success,false);assert.strictEqual(r.reason,reason);assert.strictEqual(fingerprint(c),before);}

const made=c.commitForgeCreatedKunai58500(spec());assert.strictEqual(made.success,true);assert.strictEqual(made.idempotent,false);assert.strictEqual(materialQty(c),1);assert.strictEqual(c.playerData.ryo,75);
const id=made.instanceId,row=c.playerData.inventory.find(r=>r.instanceId===id);assert(row);assert.strictEqual(row.baseDefinitionId,"kunai");assert.strictEqual(row.resultPackageRef,"forge_result_precision_balanced_kunai_v1");assert.strictEqual(row.durabilityCurrent,10);assert.strictEqual(row.durabilityMax,10);assert.strictEqual(row.equippedBy,undefined);
const prov=c.playerData.durableObjectProvenance14800.objectsByInstanceId[id].events[0];assert.strictEqual(prov.eventType,"forge_creation");assert.strictEqual(prov.metadata.materialInputs[0].quantity,1);assert.strictEqual(prov.metadata.currencyCostRyo,25);assert.strictEqual(prov.metadata.resultPackageRef,"forge_result_precision_balanced_kunai_v1");
const first=fingerprint(c),retry=c.commitForgeCreatedKunai58500(spec());assert.strictEqual(retry.idempotent,true);assert.strictEqual(retry.instanceId,id);assert.strictEqual(fingerprint(c),first);

let p=c.projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:id,equippedInstanceId:id});assert.strictEqual(p.effectiveBukijutsuBonus,1);assert.strictEqual(p.canonicalAttackBonus,5);assert.strictEqual(p.baseBukijutsuMutation,false);assert.strictEqual(p.developedBukijutsuMutation,false);assert.strictEqual(p.naturalPlMutation,false);
c.playerData.inventory.push({id:"kunai",instanceId:"qa_retail",durabilityCurrent:10,durabilityMax:10,durabilityProfileId:"retail_kunai_condition_552",provenance:{label:"forged precision words only"}});p=c.projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:"qa_retail",equippedInstanceId:"qa_retail"});assert.strictEqual(p.effectiveBukijutsuBonus,0);

let wear=c.commitForgeCreatedKunaiWear58500({instanceId:id,sourceOccurrenceId:"battle:1",sourceId:"kunai:1"});assert.strictEqual(wear.success,true);assert.strictEqual(c.getForgeCreatedKunaiCondition58500(id).durabilityCurrent,9);const wearRetry=c.commitForgeCreatedKunaiWear58500({instanceId:id,sourceOccurrenceId:"battle:1",sourceId:"kunai:1"});assert.strictEqual(wearRetry.idempotent,true);assert.strictEqual(c.getForgeCreatedKunaiCondition58500(id).durabilityCurrent,9);
const repair=c.repairForgeCreatedKunai58500({instanceId:id,sourceOccurrenceId:"repair:1",sourceId:"forge:repair"});assert.strictEqual(repair.success,true);assert.strictEqual(c.getForgeCreatedKunaiCondition58500(id).durabilityCurrent,10);assert.strictEqual(c.playerData.inventory.find(r=>r.instanceId===id).resultPackageRef,"forge_result_precision_balanced_kunai_v1");
for(let i=0;i<10;i++)assert.strictEqual(c.commitForgeCreatedKunaiWear58500({instanceId:id,sourceOccurrenceId:`drain:${i}`,sourceId:`kunai:${i}`}).success,true);assert.strictEqual(c.getForgeCreatedKunaiCondition58500(id).durabilityCurrent,0);p=c.projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:id,equippedInstanceId:id});assert.strictEqual(p.effectiveBukijutsuBonus,0);assert.strictEqual(c.commitForgeCreatedKunaiWear58500({instanceId:id,sourceOccurrenceId:"after-zero",sourceId:"kunai"}).success,false);
assert.strictEqual(c.repairForgeCreatedKunai58500({instanceId:id,sourceOccurrenceId:"repair:2",sourceId:"forge:repair"}).success,true);assert.strictEqual(c.getForgeCreatedKunaiCondition58500(id).durabilityCurrent,10);

c.savePlayerData();c.playerData=clone(c.__saved);c.activityHistory=c.playerData.activityHistory;assert.strictEqual(c.getForgeCreatedKunaiCondition58500(id).resultPackageRef,"forge_result_precision_balanced_kunai_v1");assert(c.playerData.durableObjectProvenance14800.objectsByInstanceId[id]);assert.strictEqual(c.commitForgeCreatedKunai58500(spec()).idempotent,true);

const fail=boot();fail.__acquisitionFailure=true;const failBefore=fingerprint(fail),fr=fail.commitForgeCreatedKunai58500(spec({craftOperationId:"forge585:qa:acquisition-fail"}));assert.strictEqual(fr.success,false);assert.strictEqual(fingerprint(fail),failBefore);
const noMat=boot();noMat.playerData.inventory[0].quantity=0;const nm=fingerprint(noMat),nmr=noMat.commitForgeCreatedKunai58500(spec({craftOperationId:"forge585:qa:no-material"}));assert.strictEqual(nmr.reason,"forge_insufficient_weapon_materials");assert.strictEqual(fingerprint(noMat),nm);
const noRyo=boot();noRyo.playerData.ryo=24;const nr=fingerprint(noRyo),nrr=noRyo.commitForgeCreatedKunai58500(spec({craftOperationId:"forge585:qa:no-ryo"}));assert.strictEqual(nrr.reason,"forge_insufficient_ryo");assert.strictEqual(fingerprint(noRyo),nr);

const diag=c.runForgeCreatedKunai58500Diagnostics();assert.strictEqual(diag.pass,true,diag.failed.join(","));assert.strictEqual(diag.browserGoldenClaimed,false);
assert(!/(baseStats|developedStats|basePL)\s*=/.test(SOURCE));assert(!/(equippedBy\s*=|equipWeapon\s*\()/.test(SOURCE));assert(SOURCE.includes("commitDurableInventoryAcquisition54500"));assert(SOURCE.includes("commitRetailKunaiWear55200"));assert(SOURCE.includes("repairRetailKunai55200"));
console.log(JSON.stringify({issue:585,pass:true,craft:{material:"2->1",ryo:"100->75",instanceId:id,durability:"10/10",autoEquip:false},package:{effectiveBukijutsuEquippedUsable:+1,retail:0,depleted:0,attackBonus:5},wearRepair:{wear:"10->9",repair:"9->10",sameInstance:true},idempotence:{craft:true,wear:true},saveReload:true,rollback:true,browserGoldenClaimed:false},null,2));
console.log("PASS #585 isolated Forge-created durable Kunai contract; browserGoldenClaimed=false");
