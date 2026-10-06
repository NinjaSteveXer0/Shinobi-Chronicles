#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const assert=require("assert");
const path=require("path");

const ROOT=path.resolve(__dirname,"..");
const INVENTORY_SOURCE=fs.readFileSync(path.join(ROOT,"runtime","alpha-phase2-inventory-core-46100.js"),"utf8");
const SHOP_SOURCE=fs.readFileSync(path.join(ROOT,"runtime","alpha-phase2-basic-item-shop-51700.js"),"utf8");
const PROVENANCE_ROOT="durableObjectProvenance14800";

const DEFINITIONS={
  field_recovery_pill:{id:"field_recovery_pill",name:"Field Recovery Pill",type:"consumable",rarity:"Common",stackable:true,description:"Recovery."},
  standard_antidote:{id:"standard_antidote",name:"Standard Antidote",type:"consumable",rarity:"Common",stackable:true,description:"Antidote."},
  basic_scroll:{id:"basic_scroll",name:"Basic Scroll",type:"scroll",rarity:"Common",stackable:true,description:"Scroll."},
  weapon_materials:{id:"weapon_materials",name:"Weapon Materials",type:"material",rarity:"Common",stackable:true,description:"Materials."},
  kunai:{id:"kunai",name:"Kunai",type:"weapon",weaponClass:"Kunai",rarity:"Common",stackable:false,equipmentSlot:"weapon",persistentThrowingWeapon:true,reusableWeapon:true,weaponDifficulty:0,description:"A reusable standard shinobi kunai. Ordinary Battle use does not consume the weapon."},
  academy_training_tanto:{id:"academy_training_tanto",name:"Academy Training Tantō",type:"weapon",weaponClass:"Tanto",rarity:"Common",stackable:false,equipmentSlot:"weapon"}
};

function makeSandbox(seed=null){
  let saves=0;
  const initial=seed?JSON.parse(JSON.stringify(seed)):{ryo:100,inventory:[],activityHistory:[]};
  let serial=Array.isArray(initial.inventory)?initial.inventory.filter(row=>row&&row.instanceId).length:0;
  const sandbox={
    console:{log(){},warn(){},error(){},table(){}},
    JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,RegExp,Error,TypeError,
    playerData:initial,
    getItemDefinition:id=>DEFINITIONS[id]||null,
    getChronicleCurrentRyo43600:()=>sandbox.playerData.ryo,
    getPlayerCharacter:()=>null,
    addItemToInventory(item){
      const id=typeof item==="string"?item:item&&item.id;
      const definition=DEFINITIONS[id];
      if(!definition)throw new Error(`fixture_definition_missing:${id}`);
      if(definition.stackable===true){
        const existing=this.playerData.inventory.find(row=>row&&row.id===id&&!row.instanceId);
        if(existing)existing.quantity=(Number(existing.quantity)||0)+1;
        else this.playerData.inventory.push({id,name:definition.name,type:definition.type,rarity:definition.rarity,quantity:1});
        return;
      }
      serial+=1;
      this.playerData.inventory.push({
        id,name:definition.name,type:definition.type,rarity:definition.rarity,quantity:1,
        instanceId:`${id}_qa552_${serial}`,weaponClass:definition.weaponClass,equipmentSlot:definition.equipmentSlot,equippedBy:null
      });
    },
    savePlayerData(){saves+=1;return true;},
    refreshPhase2LiveHud49900(){return true;},
    getWeaponExecutionContextForSkill(){return sandbox.__weaponContext||null;},
    getBattleEquippedWeaponExecutionContext(){return sandbox.__weaponContext||null;},
    getBattleAvailablePersistentThrowingWeaponContext(){return sandbox.__weaponContext||null;},
    __weaponContext:null,
    __saveCalls:()=>saves
  };
  sandbox.globalThis=sandbox;
  vm.createContext(sandbox);
  vm.runInContext(INVENTORY_SOURCE,sandbox,{filename:"alpha-phase2-inventory-core-46100.js"});
  vm.runInContext(SHOP_SOURCE,sandbox,{filename:"alpha-phase2-basic-item-shop-51700.js"});
  return sandbox;
}

function clone(value){return JSON.parse(JSON.stringify(value));}

(function run(){
  const s=makeSandbox();

  const catalogue=clone(s.getPhase2BasicItemShopSnapshot51700());
  const kunaiRow=catalogue.catalogue.find(row=>row.itemId==="kunai");
  assert.ok(kunaiRow,"Kunai missing from existing Basic Item Shop catalogue");
  assert.equal(kunaiRow.price,50);
  assert.equal(kunaiRow.rarity,"Common");
  assert.equal(kunaiRow.stackable,false);
  assert.equal(kunaiRow.durable,true);
  assert.equal(kunaiRow.durabilityCurrent,10);
  assert.equal(kunaiRow.durabilityMax,10);
  assert.equal(catalogue.catalogue.filter(row=>row.itemId!=="kunai").length,4,"#517 stackable catalogue changed unexpectedly");

  const purchase=s.commitPhase2BasicItemShopPurchase51700("kunai","qa552:retail:kunai:one");
  assert.equal(purchase.success,true,JSON.stringify(purchase));
  assert.equal(purchase.idempotent,false);
  assert.equal(purchase.ryoBefore,100);
  assert.equal(purchase.ryoAfter,50);
  assert.equal(s.playerData.ryo,50,"purchase must debit exactly 50 Ryō");
  assert.ok(purchase.instanceId,"durable purchase must return exact instanceId");
  assert.equal(s.playerData.inventory.filter(row=>row.id==="kunai").length,1,"purchase must mint exactly one canonical Kunai instance");

  const instance=s.playerData.inventory.find(row=>row.instanceId===purchase.instanceId);
  assert.ok(instance);
  assert.equal(instance.id,"kunai");
  assert.equal(instance.durabilityCurrent,10);
  assert.equal(instance.durabilityMax,10);
  assert.equal(instance.equippedBy,null,"purchase must not auto-equip Kunai");
  assert.equal(instance.durabilityProfileId,"retail_kunai_condition_552");

  const receipt=s.playerData.activityHistory.find(row=>row.purchaseIntentId==="qa552:retail:kunai:one");
  assert.ok(receipt,"shop purchase receipt missing");
  assert.equal(receipt.sourceOccurrenceId,"konoha_item_shop_purchase::qa552:retail:kunai:one");
  assert.equal(receipt.sourceId,"konoha_central_commercial_basic_item_shop");
  assert.equal(receipt.locationId,"KON-P09");
  assert.equal(receipt.itemId,"kunai");
  assert.equal(receipt.instanceId,purchase.instanceId);

  const provenance=s.playerData[PROVENANCE_ROOT];
  assert.ok(provenance,"#545 provenance root missing after durable purchase");
  const object=provenance.objectsByInstanceId[purchase.instanceId];
  assert.ok(object,"exact Kunai provenance object missing");
  assert.equal(object.itemId,"kunai");
  assert.equal(object.events.length,1,"purchase must create exactly one provenance event");
  assert.equal(object.events[0].eventType,"purchase");
  assert.equal(object.events[0].sourceOccurrenceId,receipt.sourceOccurrenceId);
  assert.equal(object.events[0].sourceId,"konoha_central_commercial_basic_item_shop");
  assert.ok(object.events[0].sourceRefs.includes("KON-P09"));
  assert.ok(object.events[0].sourceRefs.includes("kunai"));
  assert.equal(Object.prototype.hasOwnProperty.call(object,"power"),false,"retail provenance must not grant hidden power");
  assert.equal(Object.prototype.hasOwnProperty.call(object,"plBonus"),false,"retail provenance must not grant hidden PL");
  assert.equal(Object.prototype.hasOwnProperty.call(object,"provenanceScore"),false,"retail provenance must not become a power score");

  const afterFirst=clone(s.playerData);
  const saveCountAfterFirst=s.__saveCalls();
  const retry=s.commitPhase2BasicItemShopPurchase51700("kunai","qa552:retail:kunai:one");
  assert.equal(retry.success,true);
  assert.equal(retry.idempotent,true);
  assert.equal(retry.instanceId,purchase.instanceId);
  assert.equal(JSON.stringify(s.playerData),JSON.stringify(afterFirst),"same purchaseIntentId retry mutated state");
  assert.equal(s.__saveCalls(),saveCountAfterFirst,"idempotent purchase retry rewrote save");

  const reopened=clone(s.getPhase2BasicItemShopSnapshot51700());
  assert.equal(reopened.catalogue.find(row=>row.itemId==="kunai").ownedQuantity,1,"Shop reopen lost durable ownership projection");
  const inventorySnapshot=clone(s.getPhase2InventorySnapshot46100());
  assert.ok(inventorySnapshot.durable.some(row=>row.instanceId===purchase.instanceId),"Inventory reopen lost exact Kunai instance");

  const persistedFresh=clone(s.playerData);
  const freshReload=makeSandbox(persistedFresh);
  const freshCondition=clone(freshReload.getRetailKunaiCondition55200(purchase.instanceId));
  assert.equal(freshCondition.durabilityCurrent,10);
  assert.equal(freshCondition.durabilityMax,10);
  assert.equal(freshReload.playerData[PROVENANCE_ROOT].objectsByInstanceId[purchase.instanceId].events.length,1,"save/load duplicated purchase provenance");

  const provenanceBeforeWear=JSON.stringify(s.playerData[PROVENANCE_ROOT]);
  const wear=s.commitRetailKunaiWear55200({instanceId:purchase.instanceId,sourceOccurrenceId:"qa552:wear:one",sourceId:"qa552_compatible_kunai_action"});
  assert.equal(wear.success,true,JSON.stringify(wear));
  assert.equal(wear.idempotent,false);
  assert.equal(wear.condition.durabilityCurrent,9,"one committed wear event must resolve 10 -> 9");
  assert.equal(wear.condition.durabilityMax,10);
  assert.equal(wear.condition.instanceId,purchase.instanceId);
  assert.equal(JSON.stringify(s.playerData[PROVENANCE_ROOT]),provenanceBeforeWear,"wear must not rewrite purchase provenance lineage");

  const wearRetry=s.commitRetailKunaiWear55200({instanceId:purchase.instanceId,sourceOccurrenceId:"qa552:wear:one",sourceId:"qa552_compatible_kunai_action"});
  assert.equal(wearRetry.success,true);
  assert.equal(wearRetry.idempotent,true);
  assert.equal(wearRetry.condition.durabilityCurrent,9,"wear retry decremented twice");

  const persistedWorn=clone(s.playerData);
  const wornReload=makeSandbox(persistedWorn);
  const wornCondition=clone(wornReload.getRetailKunaiCondition55200(purchase.instanceId));
  assert.equal(wornCondition.durabilityCurrent,9,"save/load must preserve 9/10 condition");
  assert.equal(wornCondition.instanceId,purchase.instanceId);

  const provenanceBeforeRepair=JSON.stringify(wornReload.playerData[PROVENANCE_ROOT]);
  const repair=wornReload.repairRetailKunai55200({instanceId:purchase.instanceId,sourceOccurrenceId:"qa552:repair:one",sourceId:"qa552_exact_repair"});
  assert.equal(repair.success,true,JSON.stringify(repair));
  assert.equal(repair.idempotent,false);
  assert.equal(repair.condition.durabilityCurrent,10,"exact repair must restore 9 -> 10");
  assert.equal(repair.condition.durabilityMax,10);
  assert.equal(repair.condition.instanceId,purchase.instanceId,"repair must not replace exact instance");
  assert.equal(JSON.stringify(wornReload.playerData[PROVENANCE_ROOT]),provenanceBeforeRepair,"repair must not reset/rewrite purchase provenance");
  const repairRetry=wornReload.repairRetailKunai55200({instanceId:purchase.instanceId,sourceOccurrenceId:"qa552:repair:one",sourceId:"qa552_exact_repair"});
  assert.equal(repairRetry.idempotent,true);
  assert.equal(repairRetry.condition.durabilityCurrent,10);

  const gate=makeSandbox(clone(s.playerData));
  gate.__weaponContext={itemId:"kunai",instanceId:purchase.instanceId,weaponClass:"Kunai"};
  for(let i=2;i<=10;i++){
    const result=gate.commitRetailKunaiWear55200({instanceId:purchase.instanceId,sourceOccurrenceId:`qa552:wear:${i}`,sourceId:"qa552_compatible_kunai_action"});
    assert.equal(result.success,true,`wear ${i} failed: ${JSON.stringify(result)}`);
  }
  const depleted=clone(gate.getRetailKunaiCondition55200(purchase.instanceId));
  assert.equal(depleted.durabilityCurrent,0);
  assert.ok(gate.playerData.inventory.find(row=>row.instanceId===purchase.instanceId),"0 durability must not delete ownership");
  assert.equal(gate.getWeaponExecutionContextForSkill({},{}),null,"0 durability Kunai still satisfied executable weapon context");
  const depletedWear=gate.commitRetailKunaiWear55200({instanceId:purchase.instanceId,sourceOccurrenceId:"qa552:wear:below-zero",sourceId:"qa552_compatible_kunai_action"});
  assert.equal(depletedWear.success,false);
  assert.equal(depletedWear.reason,"retail_kunai_depleted");
  assert.equal(gate.getRetailKunaiCondition55200(purchase.instanceId).durabilityCurrent,0,"durability fell below zero");
  const gateRepair=gate.repairRetailKunai55200({instanceId:purchase.instanceId,sourceOccurrenceId:"qa552:repair:depleted",sourceId:"qa552_exact_repair"});
  assert.equal(gateRepair.success,true);
  assert.equal(gateRepair.condition.durabilityCurrent,10);
  assert.ok(gate.getWeaponExecutionContextForSkill({},{}),"repaired Kunai did not regain executable weapon context");

  const insufficient=makeSandbox({ryo:49,inventory:[],activityHistory:[]});
  const beforeInsufficient=JSON.stringify(insufficient.playerData);
  const insufficientResult=insufficient.commitPhase2BasicItemShopPurchase51700("kunai","qa552:retail:insufficient");
  assert.equal(insufficientResult.success,false);
  assert.equal(insufficientResult.reason,"insufficient_ryo");
  assert.equal(JSON.stringify(insufficient.playerData),beforeInsufficient,"insufficient funds mutated Ryō/Inventory/provenance");
  assert.equal(Object.prototype.hasOwnProperty.call(insufficient.playerData,PROVENANCE_ROOT),false);

  const stack=s.makeStackSandbox;
  const stackSandbox=makeSandbox({ryo:100,inventory:[],activityHistory:[]});
  const stackPurchase=stackSandbox.commitPhase2BasicItemShopPurchase51700("basic_scroll","qa552:stack:one");
  assert.equal(stackPurchase.success,true);
  assert.equal(stackSandbox.playerData.ryo,60);
  const stackRow=stackSandbox.playerData.inventory.find(row=>row.id==="basic_scroll");
  assert.ok(stackRow&&!stackRow.instanceId&&stackRow.quantity===1,"#517 stackable semantics collapsed into durable-instance semantics");
  assert.equal(Object.prototype.hasOwnProperty.call(stackSandbox.playerData,PROVENANCE_ROOT),false,"stack purchase created durable provenance state");

  const tantoSandbox=makeSandbox({ryo:0,inventory:[],activityHistory:[]});
  const tanto=tantoSandbox.commitDurableInventoryAcquisition54500({
    itemId:"academy_training_tanto",
    sourceOccurrenceId:"occ_kakashi_exceptional_field_execution",
    sourceId:"kak_origin_weapon_exceptional_training_tanto",
    acquisitionKind:"reward",
    eventType:"reward_acquisition",
    sourceRefs:["academy_kakashi_origin"]
  });
  assert.equal(tanto.success,true,JSON.stringify(tanto));
  assert.equal(tantoSandbox.runDurableObjectProvenance54500Diagnostics().pass,true,"#545 provenance diagnostics regressed");

  const diagnostics=clone(s.runPhase2BasicItemShop51700Diagnostics());
  assert.equal(diagnostics.pass,true,JSON.stringify(diagnostics));
  assert.equal(diagnostics.checks.browserGoldenClaimed,false);

  console.log(JSON.stringify({
    pass:true,
    issue:552,
    parent:148,
    host:"konoha_central_commercial_basic_item_shop",
    location:"KON-P09",
    itemId:"kunai",
    priceRyo:50,
    exactInstanceId:purchase.instanceId,
    freshDurability:"10/10",
    wearProof:"10 -> 9",
    repairProof:"9 -> 10",
    depletedExecutionBlocked:true,
    purchaseRetryIdempotent:true,
    insufficientFundsNoMutation:true,
    stackable517SemanticsPreserved:true,
    academyTrainingTanto545Preserved:true,
    provenancePowerBonus:false,
    browserGoldenClaimed:false
  },null,2));
})();
