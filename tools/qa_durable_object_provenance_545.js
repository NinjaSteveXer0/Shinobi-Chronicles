#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const assert=require("assert");
const path=require("path");

const runtimePath=path.join(__dirname,"..","runtime","alpha-phase2-inventory-core-46100.js");
const source=fs.readFileSync(runtimePath,"utf8");

function makeSandbox(seed=null){
  let serial=0,saveCalls=0;
  const definitions={
    academy_training_tanto:{id:"academy_training_tanto",name:"Academy Training Tantō",type:"weapon",stackable:false,rarity:"Common",weaponClass:"Tanto",equipmentSlot:"weapon"},
    shop_test_kunai:{id:"shop_test_kunai",name:"Shop Test Kunai",type:"weapon",stackable:false,rarity:"Common",weaponClass:"Kunai",equipmentSlot:"weapon"},
    basic_scroll:{id:"basic_scroll",name:"Basic Scroll",type:"scroll",stackable:true,rarity:"Common"}
  };
  const sandbox={
    console,
    JSON,
    Date,
    Math,
    Object,
    Array,
    Set,
    String,
    Number,
    globalThis:null,
    playerData:seed?JSON.parse(JSON.stringify(seed)):{inventory:[]},
    getItemDefinition:id=>definitions[id]||null,
    getPlayerCharacter:()=>null,
    addItemToInventory(item){
      const id=typeof item==="string"?item:item&&item.id;
      const def=definitions[id];
      if(!def)return;
      if(def.stackable){
        const existing=this.playerData.inventory.find(row=>row&&row.id===id&&!row.instanceId);
        if(existing)existing.quantity=(Number(existing.quantity)||0)+1;
        else this.playerData.inventory.push({id,name:def.name,type:def.type,rarity:def.rarity,quantity:1});
        return;
      }
      serial+=1;
      this.playerData.inventory.push({id,name:def.name,type:def.type,rarity:def.rarity,quantity:1,instanceId:`${id}_fixture_${serial}`,weaponClass:def.weaponClass,equipmentSlot:def.equipmentSlot,equippedBy:null});
    },
    savePlayerData(){saveCalls+=1;return true;},
    __saveCalls:()=>saveCalls
  };
  sandbox.globalThis=sandbox;
  vm.createContext(sandbox);
  vm.runInContext(source,sandbox,{filename:"alpha-phase2-inventory-core-46100.js"});
  return sandbox;
}

(function run(){
  const s=makeSandbox();
  assert.strictEqual(typeof s.commitDurableInventoryAcquisition54500,"function");
  assert.strictEqual(typeof s.registerPreexistingDurableObject54500,"function");

  const stackAttempt=s.commitDurableInventoryAcquisition54500({
    itemId:"basic_scroll",sourceOccurrenceId:"occ_stack",sourceId:"source_stack",acquisitionKind:"reward"
  });
  assert.strictEqual(stackAttempt.success,false,"stackable objects must stay outside durable provenance acquisition");
  assert.strictEqual(stackAttempt.reason,"item_not_durable");
  assert.strictEqual(s.playerData.inventory.length,0,"failed durable commit must not mutate Inventory");

  const first=s.commitDurableInventoryAcquisition54500({
    itemId:"academy_training_tanto",
    sourceOccurrenceId:"occ_kakashi_exceptional_field_execution",
    sourceId:"kak_origin_weapon_exceptional_training_tanto",
    acquisitionKind:"reward",
    eventType:"reward_acquisition",
    sourceRefs:["academy_kakashi_origin"],
    metadata:{reason:"exceptional_field_execution"}
  });
  assert.strictEqual(first.success,true);
  assert.strictEqual(first.idempotent,false);
  assert.ok(first.instanceId);
  assert.strictEqual(s.playerData.inventory.length,1);
  assert.strictEqual(s.playerData.inventory[0].instanceId,first.instanceId);

  const object=s.getDurableObjectRecord54500(first.instanceId);
  assert.ok(object,"exact durable object record must exist");
  assert.strictEqual(object.itemId,"academy_training_tanto");
  assert.strictEqual(object.identityOrigin,"ownership_commit");
  assert.strictEqual(object.events.length,1);
  assert.strictEqual(object.events[0].sourceId,"kak_origin_weapon_exceptional_training_tanto");
  assert.strictEqual(Object.prototype.hasOwnProperty.call(object,"owned"),false,"provenance must not duplicate ownership truth");
  assert.strictEqual(Object.prototype.hasOwnProperty.call(object,"equippedBy"),false,"provenance must not duplicate equipment truth");
  assert.strictEqual(Object.prototype.hasOwnProperty.call(object,"provenanceScore"),false,"history must not become a hidden power score");

  const retry=s.commitDurableInventoryAcquisition54500({
    itemId:"academy_training_tanto",
    sourceOccurrenceId:"occ_kakashi_exceptional_field_execution",
    sourceId:"kak_origin_weapon_exceptional_training_tanto",
    acquisitionKind:"reward",
    eventType:"reward_acquisition"
  });
  assert.strictEqual(retry.success,true);
  assert.strictEqual(retry.idempotent,true);
  assert.strictEqual(retry.instanceId,first.instanceId);
  assert.strictEqual(s.playerData.inventory.length,1,"retry must not duplicate Inventory instance");
  assert.strictEqual(s.getDurableObjectRecord54500(first.instanceId).events.length,1,"retry must not duplicate provenance event");

  const persisted=JSON.parse(JSON.stringify(s.playerData));
  const reloaded=makeSandbox(persisted);
  const afterReload=reloaded.commitDurableInventoryAcquisition54500({
    itemId:"academy_training_tanto",
    sourceOccurrenceId:"occ_kakashi_exceptional_field_execution",
    sourceId:"kak_origin_weapon_exceptional_training_tanto",
    acquisitionKind:"reward",
    eventType:"reward_acquisition"
  });
  assert.strictEqual(afterReload.success,true);
  assert.strictEqual(afterReload.idempotent,true);
  assert.strictEqual(afterReload.instanceId,first.instanceId,"save/load must preserve exact instance identity");
  assert.strictEqual(reloaded.playerData.inventory.length,1);

  const pre=s.registerPreexistingDurableObject54500({
    instanceId:"world_object_kunai_001",
    itemId:"shop_test_kunai",
    sourceOccurrenceId:"occ_world_object_created",
    sourceId:"world_object_authority",
    eventType:"creation",
    metadata:{createdBeforePlayerOwnership:true}
  });
  assert.strictEqual(pre.success,true);
  const transfer=s.commitDurableInventoryAcquisition54500({
    itemId:"shop_test_kunai",
    sourceOccurrenceId:"occ_shop_purchase_001",
    sourceId:"shop_purchase_receipt_001",
    acquisitionKind:"purchase",
    eventType:"purchase",
    existingInstanceId:"world_object_kunai_001"
  });
  assert.strictEqual(transfer.success,true);
  assert.strictEqual(transfer.instanceId,"world_object_kunai_001","pre-created exact object identity must survive acquisition");
  const transferredObject=s.getDurableObjectRecord54500("world_object_kunai_001");
  assert.strictEqual(transferredObject.events.length,2,"pre-player creation history must survive player acquisition");
  assert.strictEqual(transferredObject.events[0].eventType,"creation");
  assert.strictEqual(transferredObject.events[1].eventType,"purchase");

  s.playerData.inventory.push({id:"shop_test_kunai",name:"Legacy Kunai",type:"weapon",rarity:"Common",quantity:1,instanceId:"legacy_instance_without_provenance",equippedBy:null});
  const legacySnapshot=s.getPhase2InventorySnapshot46100();
  const legacy=legacySnapshot.durable.find(row=>row.instanceId==="legacy_instance_without_provenance");
  assert.ok(legacy,"legacy durable instance must remain projected");
  assert.strictEqual(legacy.provenanceObject,null,"legacy instance must not receive fictional provenance");

  const diag=s.runDurableObjectProvenance54500Diagnostics();
  assert.strictEqual(diag.pass,true,JSON.stringify(diag));

  console.log(JSON.stringify({
    pass:true,
    benchmark:"academy_training_tanto",
    sourceId:"kak_origin_weapon_exceptional_training_tanto",
    exactInstanceId:first.instanceId,
    retryInstanceId:retry.instanceId,
    preexistingTransferInstanceId:transfer.instanceId,
    inventoryCount:s.playerData.inventory.length,
    provenanceObjectCount:diag.objectCount,
    provenanceReceiptCount:diag.receiptCount
  },null,2));
})();
