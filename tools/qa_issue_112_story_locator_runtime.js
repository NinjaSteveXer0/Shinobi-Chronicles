#!/usr/bin/env node
"use strict";

// Focused headless regression for #112's causal Mission-9 Story locator gate.
// This executes the live correction module with a minimal World-runtime shim.
// It is intentionally not installed-browser Golden evidence.

const fs=require("fs");
const path=require("path");
const vm=require("vm");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const source=fs.readFileSync(path.join(ROOT,"runtime","alpha-world-konoha-112-fix.js"),"utf8");
let saveWrites=0;

const originalM9Locator=()=>({
  schemaVersion:"sc.worldStoryLocator.v1",
  locatorRef:"story_locator_arc1_m9_veterinary_lead",
  missionId:"arc1_m9",
  locatorState:"ACTIVE_LOCAL_INSTANCE",
  surfaceId:"konoha",
  hostLocationRef:"KON-O21",
  localInstanceRef:"arc1_veterinary_ward_facility_01",
  focusMode:"host_and_local_instance",
  knowledgeGateRefs:["KON-O21"],
  accessGateRefs:[]
});

const context={
  console,
  playerData:{activityHistory:[]},
  SC_KONOHA_ALPHA_WORLD_ROWS:[],
  getWorldEventDimensionState:()=>({}),
  getAlphaKonohaV3ExplicitKnowledgeState:()=>"identified",
  getRegisteredWorldEventOpportunity:()=>null,
  setWorldEventLifecycle:()=>{},
  setOpportunityDiscovery:()=>{},
  setOpportunityActionability:()=>{},
  setOpportunityResolution:()=>{},
  setOpportunityTracking:()=>{},
  getSelectedWorldOpportunity:()=>null,
  executeSelectedOpportunityAction:()=>({success:false,reason:"fixture_no_action"}),
  isAlphaArc1Mission1Complete:()=>false,
  savePlayerData:()=>{saveWrites+=1;},
  getCurrentWorldStoryLocator:originalM9Locator,
  Date,
  Set,
  Map,
  Array,
  Number,
  String,
  Object,
  JSON,
};
context.window=context;
context.globalThis=context;
vm.createContext(context);
vm.runInContext(source,context,{filename:"alpha-world-konoha-112-fix.js"});

function assertClosed(label){
  const result=context.getCurrentWorldStoryLocator();
  assert.strictEqual(result.locatorRef,"story_locator_arc1_m9_no_current_focus",`${label}: locatorRef`);
  assert.strictEqual(result.locatorState,"NO_CURRENT_MAP_FOCUS",`${label}: locatorState`);
  assert.strictEqual(result.surfaceId,null,`${label}: surfaceId`);
  assert.strictEqual(result.hostLocationRef,null,`${label}: hostLocationRef`);
  assert.strictEqual(result.localInstanceRef,null,`${label}: localInstanceRef`);
}

assertClosed("no lead");

// Mere knowledge/history at the shared veterinary host is insufficient.
context.playerData.activityHistory.push({
  id:"unrelated_konoha_veterinary_history",
  occurrenceId:"unrelated_konoha_veterinary_history",
  committed:true,
  locationId:"KON-O21",
  type:"location_known"
});
assertClosed("unrelated KON-O21 history");

// An uncommitted matching address is also insufficient.
context.playerData.activityHistory.push({
  id:"arc1_veterinary_ward_lead_01",
  occurrenceId:"arc1_veterinary_ward_lead_01",
  committed:false,
  locationId:"KON-O21"
});
assertClosed("uncommitted exact lead");

// The exact committed lead opens the existing World-authored locator unchanged.
context.playerData.activityHistory.push({
  id:"arc1_veterinary_ward_lead_01",
  occurrenceId:"arc1_veterinary_ward_lead_01",
  committed:true,
  locationId:"KON-O21",
  type:"lead_added"
});
let result=context.getCurrentWorldStoryLocator();
assert.strictEqual(result.locatorRef,"story_locator_arc1_m9_veterinary_lead");
assert.strictEqual(result.locatorState,"ACTIVE_LOCAL_INSTANCE");
assert.strictEqual(result.hostLocationRef,"KON-O21");
assert.strictEqual(result.localInstanceRef,"arc1_veterinary_ward_facility_01");

// Source-ref provenance is also a legitimate exact committed address carrier.
context.playerData.activityHistory=[{
  id:"m9_lead_projection_receipt",
  occurrenceId:"m9_lead_projection_receipt",
  committed:true,
  sourceRefs:[{type:"world_lead",id:"arc1_veterinary_ward_lead_01",role:"source"}]
}];
result=context.getCurrentWorldStoryLocator();
assert.strictEqual(result.locatorRef,"story_locator_arc1_m9_veterinary_lead");

const diagnostics=context.runIssue112CorrectionDiagnostics();
assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics.failed));
assert.strictEqual(diagnostics.browserGoldenClaimed,false);
assert.strictEqual(saveWrites,0,"locator gate fixture must not commit/save history");

console.log(JSON.stringify({
  pass:true,
  checks:{
    noLeadFailsClosed:true,
    unrelatedHostKnowledgeInsufficient:true,
    uncommittedLeadInsufficient:true,
    exactCommittedLeadUnlocksExistingLocator:true,
    exactCommittedSourceRefUnlocksExistingLocator:true,
    diagnosticsPass:true,
    fixtureSaveWrites:saveWrites===0,
    browserGoldenClaimed:false
  }
},null,2));
