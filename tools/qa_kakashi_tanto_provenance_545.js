#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const REWARD=fs.readFileSync(path.join(ROOT,"runtime","alpha-kakashi-v2-rewards-36015.js"),"utf8");
const INVENTORY=fs.readFileSync(path.join(ROOT,"runtime","alpha-phase2-inventory-core-46100.js"),"utf8");

assert(REWARD.includes('trainingTanto:"kak_origin_weapon_exceptional_training_tanto"'),"Exact Academy Training Tanto reward source missing");
assert(REWARD.includes('id:"academy_training_tanto"'),"Academy Training Tanto catalogue identity missing");
assert(REWARD.includes('rarity:"Common"'),"Academy Training Tanto must use current Common rarity authority");
assert(REWARD.includes('globalThis.commitDurableInventoryAcquisition54500'),"Kakashi durable reward does not consume canonical provenance transaction");
assert(REWARD.includes('acquisitionKind:"reward"'),"Kakashi Tanto acquisition kind must remain reward");
assert(REWARD.includes('eventType:"reward_acquisition"'),"Kakashi Tanto provenance event type missing");
assert(REWARD.includes('durableInstanceId:acquisition.instanceId'),"Kakashi reward receipt does not reference exact durable instance");
assert(REWARD.includes('durableAcquisitionReceiptId:acquisition.address'),"Kakashi reward receipt does not reference durable acquisition receipt");
assert(REWARD.includes('provenanceEventId:acquisition.receipt&&acquisition.receipt.provenanceEventId'),"Kakashi reward receipt does not reference provenance event");
assert(REWARD.includes('durableObjectProvenance:clone(playerData.durableObjectProvenance14800||null)'),"Terminal reward snapshot does not include provenance state");
assert(REWARD.includes('delete playerData.durableObjectProvenance14800'),"Terminal rollback cannot restore absence of provenance root");
assert(REWARD.includes('trainingTantoInstanceId:tanto.instanceId||null'),"Terminal reward result does not expose exact granted instance");

assert(INVENTORY.includes('const PROVENANCE_ROOT_KEY="durableObjectProvenance14800"'),"Canonical provenance store missing");
assert(INVENTORY.includes('function commitDurableInventoryAcquisition54500'),"Canonical durable acquisition API missing");
assert(INVENTORY.includes('globalThis.addItemToInventory'),"Canonical durable acquisition must consume existing Inventory writer");
assert(!INVENTORY.includes('ownedObjects'),"Provenance layer must not create a second ownership collection");
assert(!INVENTORY.includes('provenanceScore'),"Provenance history must not become a hidden power score");

const commitItemSource=REWARD.slice(REWARD.indexOf("function commitItemSource"),REWARD.indexOf("function commitTerminal"));
assert(commitItemSource.includes("commitDurableInventoryAcquisition54500"),"Durable reward branch missing from commitItemSource");
assert(commitItemSource.includes("addItemToInventory"),"Stackable reward path must continue using canonical Inventory writer");
assert(!commitItemSource.includes("inventory.push"),"Kakashi adapter must not create a parallel Inventory writer");

console.log(JSON.stringify({
  pass:true,
  issue:545,
  benchmark:"academy_training_tanto",
  sourceId:"kak_origin_weapon_exceptional_training_tanto",
  currentRarity:"Common",
  exactInstanceReceiptLink:true,
  provenanceRollback:true,
  canonicalInventoryWriterPreserved:true,
  frozenOriginEntitlementChanged:false,
  browserGoldenClaimed:false
},null,2));
