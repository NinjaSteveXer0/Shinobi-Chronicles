#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const runtime=fs.readFileSync(path.join(ROOT,"runtime/alpha-phase2-live-hud-49900.js"),"utf8");
const start=runtime.indexOf("// ISSUE #557 — UNOBSTRUCTED VILLAGE / REGION MAP CANVASES");
const end=runtime.indexOf("// #557 selected Region location / discovery card",start);
assert(start>=0&&end>start,"Lane J could not isolate canonical #557 scheduler block");
const source=runtime.slice(start,end);
const count=(needle)=>(source.match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"))||[]).length;

assert(source.includes("#621 hardens the scheduler against self-reactive geometry feedback"),"#621 repair marker missing");
assert(source.includes('mode:"signal_coalesced"'),"signal-coalesced scheduler snapshot missing");
assert(source.includes('schedulerMode:"signal_coalesced"'),"public scheduler mode missing");
assert(source.includes("if(state.raf)return false"),"scheduler does not coalesce repeated signals into one rAF");
assert.strictEqual(count("requestAnimationFrame("),1,"#557 owns more than one rAF scheduling site");
assert.strictEqual(count("setInterval("),0,"#557 contains a periodic timer");
assert.strictEqual(count("setTimeout("),0,"#557 contains an additive timeout stabilizer/watchdog");
assert(!source.includes("observer.observe(document.body"),"body-wide observer resurrected");
assert(!source.includes('attributeFilter:["class","style","hidden","data-surface"]'),"self-reactive style/class/data-surface observer resurrected");
assert(source.includes("new ResizeObserver"),"bounded ResizeObserver authority missing");
assert.strictEqual(count("new MutationObserver("),3,"unexpected competing MutationObserver owner count");
assert(source.includes('state.surfaceObserver.observe(root,{attributes:true,attributeFilter:["data-surface"],attributeOldValue:true})'),"narrow surface handoff observer missing");
assert(source.includes('state.overlayObserver.observe(overlay,{attributes:true,attributeFilter:["style","class","hidden"]})'),"narrow overlay visibility observer missing");
assert(source.includes('state.structureObserver.observe(overlay,{subtree:true,childList:true,attributes:true,attributeFilter:["class","hidden"]})'),"bounded structural observer missing");
assert(source.includes("target===state.box"),"owned echo/box mutation exclusion missing");
assert(source.includes("setStyleIfChanged"),"idempotent style writer missing");
assert(source.includes("setDatasetIfChanged"),"idempotent dataset writer missing");
assert(runtime.includes('if(root.dataset.surface!==data.surface.kind)root.dataset.surface=data.surface.kind;'),"#499 surface projection is not change-aware");

const applyStart=source.indexOf("function applyGeometry");
const syncStart=source.indexOf("function sync",applyStart);
assert(applyStart>=0&&syncStart>applyStart,"applyGeometry boundary missing");
const applySource=source.slice(applyStart,syncStart);
assert(!applySource.includes('root.style.setProperty("--sc-hud499-'),"#557 competes with #499 for shared HUD geometry variables");
assert(!applySource.includes('setStyleIfChanged(root,"--sc-hud499-'),"#557 competes with #499 through idempotent writer");
assert(applySource.includes('setStyleIfChanged(map,"--sc-map557-outboard-right"'),"#557 lost its narrow outboard projection");

for(const forbidden of ["savePlayerData(","localStorage.setItem(","activityHistory.push","commitWorld","commitChronicle","setCharacterOwnershipRuntimeAuthority("]){
  assert(!source.includes(forbidden),`presentation scheduler crossed semantic/persistence firewall: ${forbidden}`);
}

console.log(JSON.stringify({
  pass:true,issue:621,lane:"J",target:process.env.ISSUE621_TARGET_SHA||null,
  oneGeometryOwner:true,periodicTimers:0,requestAnimationFrameSites:1,
  mutationObserverOwners:3,bodyWideObserver:false,sharedHudGutterWriter:"#499 only",
  semanticPersistenceWrites:false,browserGoldenClaimed:false
},null,2));
