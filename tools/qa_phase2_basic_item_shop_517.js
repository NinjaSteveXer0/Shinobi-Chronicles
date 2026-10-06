#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const RUNTIME=fs.readFileSync(path.join(ROOT,"runtime/alpha-phase2-basic-item-shop-51700.js"),"utf8");
const INDEX=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");

assert(RUNTIME.includes('const PATCH_ID="phase2_basic_item_shop_51700_2026_10_06_kunai_552"'),"Shop patch identity missing");
assert(RUNTIME.includes('const LOCATION_ID="KON-P09"'),"Central Commercial District binding missing");
assert(RUNTIME.includes('["Common","Uncommon","Rare","Legendary"]'),"canonical rarity order missing");
assert(!RUNTIME.includes('"Normal"'),"obsolete Normal rarity revived");
assert(RUNTIME.includes("addItemToInventory"),"Shop no longer delegates stack ownership to existing Inventory authority");
assert(RUNTIME.includes("commitDurableInventoryAcquisition54500"),"durable Kunai does not consume #545 acquisition authority");
const HOSTING=RUNTIME.slice(RUNTIME.indexOf("function commercialDistrictHost"),RUNTIME.indexOf("function diagnostics"));
assert(HOSTING.includes("data-village-hotspot-id"),"Shop no longer resolves through authoritative Village hotspot candidates");
assert(HOSTING.includes("Central Commercial District"),"Shop no longer resolves the existing Commercial District presentation identity");
assert(!HOSTING.includes("createElement"),"Shop manufactured duplicate Konoha geography");
assert(!HOSTING.includes(".hidden="),"Shop hides authoritative Konoha geography");
assert(RUNTIME.includes("purchaseReceipt(stableIntent)"),"purchase-intent idempotence gate missing");
assert(RUNTIME.includes("beforeRyo<price"),"insufficient-funds precommit gate missing");
assert(RUNTIME.includes("pd.inventory=inventoryBefore"),"atomic rollback inventory restore missing");
assert(RUNTIME.includes("pd.ryo=beforeRyo"),"atomic rollback Ryō restore missing");
assert(!RUNTIME.includes("commitCharacterAcquisition"),"Character acquisition leaked into basic Item Shop");
assert(!RUNTIME.includes("currentTeam"),"team assignment leaked into basic Item Shop");
assert(INDEX.includes("runtime/alpha-phase2-basic-item-shop-51700.js"),"Shop production loader missing");

const definitions={
  field_recovery_pill:{id:"field_recovery_pill",name:"Field Recovery Pill",type:"consumable",rarity:"Common",stackable:true,description:"Recovery."},
  standard_antidote:{id:"standard_antidote",name:"Standard Antidote",type:"consumable",rarity:"Common",stackable:true,description:"Antidote."},
  basic_scroll:{id:"basic_scroll",name:"Basic Scroll",type:"scroll",rarity:"Common",stackable:true,description:"Scroll."},
  weapon_materials:{id:"weapon_materials",name:"Weapon Materials",type:"material",rarity:"Common",stackable:true,description:"Materials."},
  kunai:{id:"kunai",name:"Kunai",type:"weapon",weaponClass:"Kunai",rarity:"Common",stackable:false,equipmentSlot:"weapon",description:"Reusable standard shinobi kunai."}
};
let saves=0,serial=0;
const ctx=vm.createContext({
  console:{log(){},warn(){},error(){}},JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,RegExp,Error,TypeError,
  playerData:{ryo:100,inventory:[],activityHistory:[]},
  getChronicleCurrentRyo43600:()=>ctx.playerData.ryo,
  getItemDefinition:id=>definitions[id]||null,
  addItemToInventory:item=>{
    const d=definitions[item.id];
    assert(d);
    if(d.stackable===true){
      const existing=ctx.playerData.inventory.find(row=>row.id===item.id&&!row.instanceId);
      if(existing)existing.quantity=(existing.quantity||0)+1;
      else ctx.playerData.inventory.push({id:item.id,name:d.name,type:d.type,rarity:d.rarity,quantity:1});
      return;
    }
    serial+=1;
    ctx.playerData.inventory.push({id:item.id,name:d.name,type:d.type,rarity:d.rarity,quantity:1,instanceId:`${item.id}_qa517_${serial}`,weaponClass:d.weaponClass,equipmentSlot:d.equipmentSlot,equippedBy:null});
  },
  commitDurableInventoryAcquisition54500:spec=>{
    const address=["durable_acquisition_v1",spec.sourceOccurrenceId,spec.sourceId,spec.itemId,spec.acquisitionKind].join("|");
    if(!ctx.playerData.durableObjectProvenance14800)ctx.playerData.durableObjectProvenance14800={schemaVersion:1,objectsByInstanceId:{},acquisitionReceipts:{}};
    const p=ctx.playerData.durableObjectProvenance14800;
    const prior=p.acquisitionReceipts[address];
    if(prior)return{success:true,idempotent:true,address,instanceId:prior.instanceId,receipt:prior};
    ctx.addItemToInventory({id:spec.itemId});
    const row=ctx.playerData.inventory[ctx.playerData.inventory.length-1];
    const event={eventId:`purchase:${row.instanceId}`,eventType:spec.eventType,sourceOccurrenceId:spec.sourceOccurrenceId,sourceId:spec.sourceId};
    p.objectsByInstanceId[row.instanceId]={instanceId:row.instanceId,itemId:spec.itemId,events:[event]};
    p.acquisitionReceipts[address]={address,instanceId:row.instanceId,itemId:spec.itemId,sourceOccurrenceId:spec.sourceOccurrenceId,sourceId:spec.sourceId,committed:true};
    row.provenanceObjectId=row.instanceId;row.acquisitionReceiptId=address;
    return{success:true,idempotent:false,address,instanceId:row.instanceId,receipt:p.acquisitionReceipts[address],object:p.objectsByInstanceId[row.instanceId],inventoryRow:row};
  },
  savePlayerData:()=>{saves+=1;},
  refreshPhase2LiveHud49900:()=>true
});
ctx.globalThis=ctx;
vm.runInContext(RUNTIME,ctx,{filename:"alpha-phase2-basic-item-shop-51700.js"});

const initial=JSON.parse(JSON.stringify(ctx.getPhase2BasicItemShopSnapshot51700()));
assert.equal(initial.ryo,100);
assert.equal(initial.catalogue.length,5);
assert.deepStrictEqual(initial.rarityOrder,["Common","Uncommon","Rare","Legendary"]);
assert.deepStrictEqual(initial.catalogue.map(row=>[row.itemId,row.price]),[
  ["field_recovery_pill",25],["standard_antidote",20],["basic_scroll",40],["weapon_materials",60],["kunai",50]
]);
assert.deepStrictEqual(initial.catalogue.find(row=>row.itemId==="kunai"),{
  itemId:"kunai",name:"Kunai",type:"weapon",rarity:"Common",stackable:false,durable:true,durabilityCurrent:10,durabilityMax:10,description:"Reusable standard shinobi kunai.",price:50,ownedQuantity:0
});

const first=JSON.parse(JSON.stringify(ctx.commitPhase2BasicItemShopPurchase51700("field_recovery_pill","qa517:purchase:one")));
assert.equal(first.success,true);
assert.equal(first.idempotent,false);
assert.equal(first.ryoBefore,100);
assert.equal(first.ryoAfter,75);
assert.equal(first.quantityBefore,0);
assert.equal(first.quantityAfter,1);
assert.equal(ctx.playerData.ryo,75);
assert.equal(ctx.playerData.inventory.find(row=>row.id==="field_recovery_pill").quantity,1);
assert(ctx.playerData.inventory.find(row=>row.id==="field_recovery_pill").sourceRefs.includes("konoha_item_shop_purchase::qa517:purchase:one"));
assert.equal(ctx.playerData.activityHistory.filter(row=>row.type==="item_shop_purchase").length,1);
assert.equal(saves,1);

const retry=JSON.parse(JSON.stringify(ctx.commitPhase2BasicItemShopPurchase51700("field_recovery_pill","qa517:purchase:one")));
assert.equal(retry.success,true);
assert.equal(retry.idempotent,true);
assert.equal(ctx.playerData.ryo,75,"same intent charged twice");
assert.equal(ctx.playerData.inventory.find(row=>row.id==="field_recovery_pill").quantity,1,"same intent granted twice");
assert.equal(ctx.playerData.activityHistory.filter(row=>row.type==="item_shop_purchase").length,1,"same intent duplicated receipt");
assert.equal(saves,1,"idempotent retry rewrote save");

const second=JSON.parse(JSON.stringify(ctx.commitPhase2BasicItemShopPurchase51700("standard_antidote","qa517:purchase:two")));
assert.equal(second.success,true);
assert.equal(ctx.playerData.ryo,55);
assert.equal(ctx.playerData.inventory.find(row=>row.id==="standard_antidote").quantity,1);
assert.equal(saves,2);

const beforeFail=JSON.stringify(ctx.playerData);
const fail=JSON.parse(JSON.stringify(ctx.commitPhase2BasicItemShopPurchase51700("weapon_materials","qa517:purchase:insufficient")));
assert.equal(fail.success,false);
assert.equal(fail.reason,"insufficient_ryo");
assert.equal(JSON.stringify(ctx.playerData),beforeFail,"insufficient funds mutated state");
assert.equal(saves,2);

ctx.playerData.ryo=100;
const kunai=JSON.parse(JSON.stringify(ctx.commitPhase2BasicItemShopPurchase51700("kunai","qa517:purchase:kunai")));
assert.equal(kunai.success,true);
assert.equal(kunai.ryoBefore,100);
assert.equal(kunai.ryoAfter,50);
assert.ok(kunai.instanceId);
const kunaiRow=ctx.playerData.inventory.find(row=>row.instanceId===kunai.instanceId);
assert.equal(kunaiRow.id,"kunai");
assert.equal(kunaiRow.durabilityCurrent,10);
assert.equal(kunaiRow.durabilityMax,10);
assert.equal(kunaiRow.equippedBy,null,"purchase auto-equipped durable Kunai");
assert.equal(ctx.playerData.durableObjectProvenance14800.objectsByInstanceId[kunai.instanceId].events.length,1);

const kunaiRetry=JSON.parse(JSON.stringify(ctx.commitPhase2BasicItemShopPurchase51700("kunai","qa517:purchase:kunai")));
assert.equal(kunaiRetry.success,true);
assert.equal(kunaiRetry.idempotent,true);
assert.equal(kunaiRetry.instanceId,kunai.instanceId);
assert.equal(ctx.playerData.ryo,50);
assert.equal(ctx.playerData.inventory.filter(row=>row.id==="kunai").length,1);

const beforeRender=JSON.stringify(ctx.playerData);
const snapAgain=JSON.parse(JSON.stringify(ctx.getPhase2BasicItemShopSnapshot51700()));
assert.equal(JSON.stringify(ctx.playerData),beforeRender,"Shop inspection mutated state");
assert.equal(snapAgain.catalogue.find(row=>row.itemId==="field_recovery_pill").ownedQuantity,1);
assert.equal(snapAgain.catalogue.find(row=>row.itemId==="kunai").ownedQuantity,1);

const diagnostics=JSON.parse(JSON.stringify(ctx.runPhase2BasicItemShop51700Diagnostics()));
assert.equal(diagnostics.pass,true,JSON.stringify(diagnostics));

console.log(JSON.stringify({
  pass:true,
  issue:517,
  canonicalRyoDebit:true,
  canonicalStackInventoryGrant:true,
  durableKunaiUses545:true,
  durableKunaiPrice:50,
  durableKunaiFreshCondition:"10/10",
  authoritativeKonohaHotspotReused:true,
  duplicateGeographyCreated:false,
  purchaseIntentIdempotence:true,
  insufficientFundsNoMutation:true,
  catalogueInspectionReadOnly:true,
  rarityAuthority:"Common -> Uncommon -> Rare -> Legendary",
  characterAcquisitionOutOfScope:true,
  browserGoldenClaimed:false
},null,2));
