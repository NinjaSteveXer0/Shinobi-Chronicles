#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const target=path.resolve(process.argv[2]||process.env.FORGE_585_TARGET||"runtime/alpha-forge-created-kunai-58500.js");
const source=fs.readFileSync(target,"utf8");
const clone=v=>v==null?v:JSON.parse(JSON.stringify(v));
function boot(){
  let serial=0;
  const c={console,Date,JSON,Math,Object,Array,Set,Map,String,Number,Boolean,RegExp,Error}; c.globalThis=c;
  c.playerData={ryo:100,inventory:[{id:"weapon_materials",itemId:"weapon_materials",quantity:2,rarity:"Common"}],activityHistory:[]};
  c.characters={academy_kakashi:{id:"academy_kakashi",equipment:[]},academy_hinata:{id:"academy_hinata",equipment:[]}};
  c.getPlayerCharacter=id=>c.characters[id]||null;
  c.getItemDefinition=id=>id==="weapon_materials"?{id,type:"material",stackable:true,rarity:"Common"}:id==="kunai"?{id,type:"weapon",stackable:false,rarity:"Common"}:null;
  c.getChronicleCurrentRyo43600=()=>c.playerData.ryo;
  c.getChronicleRunIdentity43600=()=>({runId:"chronicle:qa:585:lane-j"});
  c.savePlayerData=()=>{ if(c.failSave) throw new Error("forced-save-failure"); c.saved=clone(c.playerData); return true; };
  const addr=s=>["durable_acquisition_v1",s.sourceOccurrenceId,s.sourceId,s.itemId,s.acquisitionKind].join("|");
  c.getDurableObjectRecord54500=id=>clone(c.playerData.durableObjectProvenance14800?.objectsByInstanceId?.[id]||null);
  c.getDurableAcquisitionReceipt54500=spec=>clone(c.playerData.durableObjectProvenance14800?.acquisitionReceipts?.[typeof spec==="string"?spec:addr(spec)]||null);
  c.commitDurableInventoryAcquisition54500=spec=>{
    if(c.failAcquire)return{success:false,reason:"forced-acquire-failure"};
    const p=c.playerData; p.durableObjectProvenance14800||={schemaVersion:1,objectsByInstanceId:{},acquisitionReceipts:{}};
    const root=p.durableObjectProvenance14800,a=addr(spec),prior=root.acquisitionReceipts[a];
    if(prior)return{success:true,idempotent:true,address:a,instanceId:prior.instanceId};
    const instanceId=`qa585j-${++serial}`; p.inventory.push({id:"kunai",itemId:"kunai",instanceId,quantity:1,rarity:"Common"});
    const event={eventId:`event-${instanceId}`,eventType:spec.eventType,instanceId,itemId:"kunai",sourceOccurrenceId:spec.sourceOccurrenceId,sourceId:spec.sourceId,metadata:clone(spec.metadata||{})};
    root.objectsByInstanceId[instanceId]={schemaVersion:1,instanceId,itemId:"kunai",events:[event]};
    root.acquisitionReceipts[a]={schemaVersion:1,address:a,instanceId,itemId:"kunai",acquisitionKind:spec.acquisitionKind,sourceOccurrenceId:spec.sourceOccurrenceId,sourceId:spec.sourceId,committed:true};
    return{success:true,idempotent:false,address:a,instanceId};
  };
  const cond=id=>{const r=c.playerData.inventory.find(x=>x.instanceId===id);return r?{instanceId:id,durabilityCurrent:+r.durabilityCurrent||0,durabilityMax:+r.durabilityMax||0,usable:(+r.durabilityCurrent||0)>0}:null;};
  c.commitRetailKunaiWear55200=({instanceId,sourceOccurrenceId,sourceId})=>{const r=c.playerData.inventory.find(x=>x.instanceId===instanceId);if(!r)return{success:false};r._wear||={};const k=`${sourceOccurrenceId}|${sourceId}`;if(r._wear[k])return{success:true,idempotent:true,condition:cond(instanceId)};if(r.durabilityCurrent<=0)return{success:false,reason:"depleted"};r.durabilityCurrent--;r._wear[k]=true;c.savePlayerData();return{success:true,idempotent:false,condition:cond(instanceId)};};
  c.repairRetailKunai55200=({instanceId,sourceOccurrenceId,sourceId})=>{const r=c.playerData.inventory.find(x=>x.instanceId===instanceId);if(!r)return{success:false};r._repair||={};const k=`${sourceOccurrenceId}|${sourceId}`;if(r._repair[k])return{success:true,idempotent:true,condition:cond(instanceId)};r.durabilityCurrent=10;r._repair[k]=true;c.savePlayerData();return{success:true,idempotent:false,condition:cond(instanceId)};};
  vm.createContext(c); vm.runInContext(source,c,{filename:path.basename(target)}); return c;
}
const baseSpec=extra=>({craftOperationId:"forge585:lane-j:001",recipeId:"forge_create_precision_balanced_kunai_v1",branch:"forge",operation:"create",serviceHostId:"KON-A05",serviceHostAlias:"village:konoha:craft_quarter:forge",servicePermission:true,commissionerRef:"academy_kakashi",executorRef:"konoha_forge_service_executor_role_v1",executorCapabilityRefs:["executor_capability_forge_standard_weaponcraft_v1"],executorKnowledgeRefs:["recipe_knowledge_forge_create_precision_balanced_kunai_v1"],chronicleRef:"chronicle:qa:585:lane-j",...extra});
const snap=c=>JSON.stringify(c.playerData);
const zero=(patch,reason)=>{const c=boot(),before=snap(c),r=c.commitForgeCreatedKunai58500(baseSpec(patch));assert.strictEqual(r.success,false);assert.strictEqual(r.reason,reason);assert.strictEqual(snap(c),before);};
zero({serviceHostId:"KON-P09"},"forge_service_host_invalid"); zero({commissionerRef:"not_a_player_character"},"forge_commissioner_invalid"); zero({executorCapabilityRefs:[]},"forge_executor_capability_missing"); zero({executorKnowledgeRefs:[]},"forge_executor_recipe_knowledge_missing");
const c=boot(),recipe=c.getForgeCreatedKunaiRecipe58500(); assert.strictEqual(recipe.outputDefinitionId,"kunai"); assert.strictEqual(recipe.currencyCostRyo,25); assert.deepStrictEqual(JSON.parse(JSON.stringify(recipe.materialInputs)),[{definitionId:"weapon_materials",quantity:1}]);
const made=c.commitForgeCreatedKunai58500(baseSpec()); assert(made.success&&!made.idempotent); const id=made.instanceId,row=c.playerData.inventory.find(r=>r.instanceId===id); assert(row); assert.strictEqual(c.playerData.ryo,75); assert.strictEqual(c.playerData.inventory.find(r=>!r.instanceId&&r.itemId==="weapon_materials").quantity,1); assert.strictEqual(row.durabilityCurrent,10); assert.strictEqual(row.equippedBy,undefined);
const replayBefore=snap(c),replay=c.commitForgeCreatedKunai58500(baseSpec()); assert(replay.success&&replay.idempotent); assert.strictEqual(replay.instanceId,id); assert.strictEqual(snap(c),replayBefore);
let p=c.projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:id,equippedInstanceId:id}); assert.strictEqual(p.effectiveBukijutsuBonus,0);
row.equippedBy="academy_kakashi"; c.characters.academy_kakashi.equipment=[{itemId:"kunai",instanceId:id}]; p=c.projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:id,equippedInstanceId:id}); assert.strictEqual(p.effectiveBukijutsuBonus,1); assert.strictEqual(p.mutatesBaseOrCurrentPl,false);
c.playerData.inventory.push({id:"kunai",itemId:"kunai",instanceId:"retail-spoof",durabilityCurrent:10,durabilityMax:10,durabilityProfileId:"retail_kunai_condition_552",resultPackageRef:"forge_result_precision_balanced_kunai_v1",forgeCraftOperationId:"forge585:spoof:001",forgeCreationOccurrenceId:"forge_create_precision_balanced_kunai::forge585:spoof:001",equippedBy:"academy_hinata"}); c.characters.academy_hinata.equipment=[{itemId:"kunai",instanceId:"retail-spoof"}]; p=c.projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:"retail-spoof",equippedInstanceId:"retail-spoof"}); assert.strictEqual(p.effectiveBukijutsuBonus,0);
const wear=c.commitForgeCreatedKunaiWear58500({instanceId:id,sourceOccurrenceId:"battle:lane-j:1",sourceId:"kunai-use"}); assert(wear.success); assert.strictEqual(c.getForgeCreatedKunaiCondition58500(id).durabilityCurrent,9); const wear2=c.commitForgeCreatedKunaiWear58500({instanceId:id,sourceOccurrenceId:"battle:lane-j:1",sourceId:"kunai-use"}); assert(wear2.success&&wear2.idempotent); const repair=c.repairForgeCreatedKunai58500({instanceId:id,sourceOccurrenceId:"forge:repair:lane-j:1",sourceId:"repair-service"}); assert(repair.success); assert.strictEqual(repair.condition.durabilityCurrent,10);
const saved=clone(c.playerData); c.playerData=clone(saved); const reloaded=c.commitForgeCreatedKunai58500(baseSpec()); assert(reloaded.success&&reloaded.idempotent&&reloaded.instanceId===id);
const diag=c.runForgeCreatedKunai58500Diagnostics(); assert(diag.pass); assert.strictEqual(diag.browserGoldenClaimed,false);
console.log(JSON.stringify({issue:585,lane:"J",pass:true,target,browserGoldenClaimed:false,checks:["fail_closed_host","fail_closed_commissioner","capability_knowledge","exact_cost","stable_instance","idempotence","no_auto_equip","canonical_equip_plus1","retail_spoof_zero","wear_repair_same_instance","save_reload","diagnostics"]},null,2));