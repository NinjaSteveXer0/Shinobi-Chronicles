#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const RUNTIME=fs.readFileSync(path.join(ROOT,"runtime/alpha-phase2-inventory-core-46100.js"),"utf8");
const INDEX=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");
const PROVENANCE_ROOT="durableObjectProvenance14800";

assert(RUNTIME.includes('const PATCH_ID="phase2_inventory_core_46100_2026_10_05_provenance_545"'),"Inventory/provenance patch identity missing");
assert(RUNTIME.includes('const PROVENANCE_ROOT_KEY="durableObjectProvenance14800"'),"Durable provenance root missing");
assert(RUNTIME.includes("function readProvenanceState"),"Non-mutating provenance reader missing");
assert(RUNTIME.includes("commitDurableInventoryAcquisition54500"),"Durable acquisition transaction missing");
assert(INDEX.includes('data-alpha-route="inventory"'),"Inventory navigation route missing");
assert(INDEX.includes('runtime/alpha-phase2-inventory-core-46100.js'),"Inventory runtime loader missing");
assert(!RUNTIME.includes("activityHistory.find"),"#461 must not infer provenance from fuzzy history search");
assert(RUNTIME.includes("not_exposed_on_inventory_record"),"truthful missing-provenance state missing");

// #545 deliberately consolidates the durable-object transaction into the existing
// Inventory owner module rather than stacking another runtime patch. Preserve the
// original #461 read-only presentation boundary: rendering/snapshot/opening must
// never mint ownership or write persistence. The canonical ownership API may be
// consumed only by the explicit durable acquisition transaction; executable checks
// below separately prove that presentation cannot reach that transaction.
const durableCommitStart=RUNTIME.indexOf("function commitDurableInventoryAcquisition54500");
const durableCommitEnd=RUNTIME.indexOf("function preparedItemIds",durableCommitStart);
assert(durableCommitStart>=0&&durableCommitEnd>durableCommitStart,"Durable acquisition transaction boundary missing");
const durableCommitSource=RUNTIME.slice(durableCommitStart,durableCommitEnd);
assert(durableCommitSource.includes('typeof globalThis.addItemToInventory!=="function"'),"Durable acquisition transaction must fail closed when Inventory writer is missing");
assert(durableCommitSource.includes("globalThis.addItemToInventory("),"Durable acquisition transaction must consume canonical Inventory writer");
assert(durableCommitSource.includes("hadProvenanceRoot"),"Durable acquisition transaction must remember provenance-root existence for rollback");
assert(durableCommitSource.includes("delete pd[PROVENANCE_ROOT_KEY]"),"Failed durable transaction must restore provenance-root absence");
assert(!RUNTIME.includes("playerData.inventory.push("),"Consolidated module must not create a second direct Inventory writer");
const secondOwnershipPatterns=[
  /\bownedObjects\s*[:=]\s*[\[{]/,
  /(?:playerData|pd|state)\s*\.\s*ownedObjects\s*=/
];
assert(secondOwnershipPatterns.every(pattern=>!pattern.test(RUNTIME)),"Consolidated module must not create a second ownership collection");

const definitions={
  field_recovery_pill:{id:"field_recovery_pill",name:"Field Recovery Pill",type:"consumable",rarity:"Common",stackable:true,description:"Recovery."},
  kunai:{id:"kunai",name:"Kunai",type:"weapon",rarity:"Common",stackable:false,weaponClass:"Kunai",equipmentSlot:"weapon",description:"Reusable weapon."},
  ninja_wire:{id:"ninja_wire",name:"Ninja Wire",type:"tool",rarity:"Common",stackable:false,description:"Reusable tool."}
};
const menma={id:"academy_menma",name:"Menma",equipment:[{instanceId:"kunai::one",itemId:"kunai",slot:"weapon"}]};
let saveCalls=0;
const ctx=vm.createContext({
  console:{log(){},warn(){},error(){}},Date,Math,JSON,Object,Array,Number,String,Set,Map,
  playerData:{
    inventory:[
      {id:"field_recovery_pill",name:"Field Recovery Pill",type:"consumable",rarity:"Common",quantity:2},
      {id:"kunai",name:"Kunai",type:"weapon",rarity:"Common",quantity:1,instanceId:"kunai::one",equippedBy:"academy_menma"},
      {id:"kunai",name:"Kunai",type:"weapon",rarity:"Common",quantity:1,instanceId:"kunai::two",equippedBy:null},
      {id:"ninja_wire",name:"Ninja Wire",type:"tool",rarity:"Common",quantity:1,instanceId:"wire::one",sourceRefs:["qa461-source-ref"]}
    ],
    battlePouch:{itemIds:["field_recovery_pill"]},
    activityHistory:[{type:"unrelated_reward",itemId:"kunai",sourceId:"must_not_be_inferred"}]
  },
  getItemDefinition:id=>definitions[id]||null,
  getPlayerCharacter:id=>id==="academy_menma"?menma:null,
  addItemToInventory(){throw new Error("#461 presentation must never call ownership writer");},
  savePlayerData(){saveCalls+=1;throw new Error("#461 presentation must never persist");},
  openOverlay:type=>({success:true,type}),
  closeOverlay(){},
});
ctx.globalThis=ctx;
vm.runInContext(RUNTIME,ctx,{filename:"alpha-phase2-inventory-core-46100.js"});

assert.equal(Object.prototype.hasOwnProperty.call(ctx.playerData,PROVENANCE_ROOT),false,"legacy Inventory fixture must start without provenance state");
const beforeFirstSnapshot=JSON.stringify(ctx.playerData);
const snap=ctx.getPhase2InventorySnapshot46100();
assert.equal(JSON.stringify(ctx.playerData),beforeFirstSnapshot,"#461 Inventory snapshot mutated persistent state");
assert.equal(Object.prototype.hasOwnProperty.call(ctx.playerData,PROVENANCE_ROOT),false,"#461 Inventory snapshot created empty provenance state");
assert.equal(snap.summary.stackIdentities,1);
assert.equal(snap.summary.stackUnits,2);
assert.equal(snap.summary.durableInstances,3);
assert.equal(snap.summary.equippedInstances,1);
assert.equal(snap.summary.preparedStacks,1);
assert.equal(snap.summary.provenanceTrackedInstances,0);

const pill=snap.stacks.find(row=>row.itemId==="field_recovery_pill");
assert(pill);
assert.equal(pill.quantity,2);
assert.equal(pill.prepared,true);
assert.equal(pill.sourceStatus,"not_exposed_on_inventory_record");
assert.deepStrictEqual(JSON.parse(JSON.stringify(pill.sourceRefs)),[]);

const kunai=snap.durable.filter(row=>row.itemId==="kunai");
assert.equal(kunai.length,2);
assert.notEqual(kunai[0].instanceId,kunai[1].instanceId,"identical definitions collapsed distinct durable instances");
assert.equal(kunai.find(row=>row.instanceId==="kunai::one").equipment.equipped,true);
assert.equal(kunai.find(row=>row.instanceId==="kunai::one").equipment.verified,true);
assert.equal(kunai.find(row=>row.instanceId==="kunai::two").equipment.equipped,false);
assert(kunai.every(row=>!row.sourceRefs.includes("must_not_be_inferred")),"provenance was inferred from unrelated history");

const wire=snap.durable.find(row=>row.itemId==="ninja_wire");
assert(wire);
assert.deepStrictEqual(JSON.parse(JSON.stringify(wire.sourceRefs)),["qa461-source-ref"]);
assert.equal(wire.sourceStatus,"exact_refs_exposed");

const presentationFns=[
  ctx.getPhase2InventorySnapshot46100,
  ctx.renderPhase2InventoryCore46100,
  ctx.openPhase2InventoryCore46100
];
for(const fn of presentationFns){
  const body=String(fn);
  assert(!body.includes("addItemToInventory"),"#461 presentation function contains ownership mutation");
  assert(!body.includes("commitDurableInventoryAcquisition54500"),"#461 presentation function contains durable acquisition commit");
  assert(!body.includes("savePlayerData"),"#461 presentation function contains persistence mutation");
  assert(!body.includes("localStorage"),"#461 presentation function contains direct persistence access");
}

const before=JSON.stringify(ctx.playerData);
const diagnostics=ctx.runPhase2InventoryCore46100Diagnostics();
const after=JSON.stringify(ctx.playerData);
assert.equal(diagnostics.pass,true,JSON.stringify(diagnostics));
assert.equal(before,after,"#461 diagnostics mutated persistent state");
assert.equal(Object.prototype.hasOwnProperty.call(ctx.playerData,PROVENANCE_ROOT),false,"#461 diagnostics created provenance state");
assert.equal(saveCalls,0,"#461 read-only projection attempted persistence");

const provenanceBefore=JSON.stringify(ctx.playerData);
const provenanceDiag=ctx.runDurableObjectProvenance54500Diagnostics();
const provenanceAfter=JSON.stringify(ctx.playerData);
assert.equal(provenanceDiag.pass,true,JSON.stringify(provenanceDiag));
assert.equal(provenanceAfter,provenanceBefore,"Provenance diagnostics mutated persistent state");
assert.equal(Object.prototype.hasOwnProperty.call(ctx.playerData,PROVENANCE_ROOT),false,"Provenance diagnostics created empty provenance state");

console.log(JSON.stringify({
  pass:true,
  issue:461,
  provenanceExtensionIssue:545,
  readOnlyProjection:true,
  stacksRemainQuantities:true,
  distinctDurableInstances:true,
  equipmentProjection:true,
  battlePouchProjection:true,
  exactSourceRefsOnly:true,
  uiCreatedOwnership:false,
  provenanceTransactionSeparatedFromPresentation:true,
  legacyReadCreatesProvenance:false,
  diagnosticsCreateProvenance:false,
  browserGoldenClaimed:false
},null,2));
