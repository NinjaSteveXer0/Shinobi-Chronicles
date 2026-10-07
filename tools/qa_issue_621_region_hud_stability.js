#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const runtime=fs.readFileSync(path.join(ROOT,"runtime/alpha-phase2-live-hud-49900.js"),"utf8");
const start=runtime.indexOf("// ISSUE #557 — UNOBSTRUCTED VILLAGE / REGION MAP CANVASES");
const end=runtime.indexOf("// #557 selected Region location / discovery card",start);
assert(start>=0&&end>start,"#621 could not isolate the canonical #557 scheduler block");
const source=runtime.slice(start,end);

assert(source.includes("#621 hardens the scheduler against self-reactive geometry feedback"),"#621 repair marker missing");
assert(source.includes('mode:"signal_coalesced"'),"#621 signal-coalesced scheduler diagnostics missing");
assert(source.includes("ResizeObserver"),"#621 lacks bounded resize-driven geometry refresh");
assert(source.includes('state.overlayObserver.observe(overlay,{attributes:true,attributeFilter:["style","class","hidden"]})'),"#621 does not observe real overlay visibility transitions narrowly");
assert(!source.includes("rootObserver"),"#621 still wakes from #499 root projection churn");
assert(!source.includes('attributeFilter:["data-surface","hidden"]'),"#621 still observes #499 data-surface polling churn");
assert(source.includes('attributeFilter:["class","hidden"]'),"#621 does not observe bounded map structural transitions");
assert(source.includes("target===state.box"),"#621 does not ignore owned/echo box class churn");
assert(source.includes("setStyleIfChanged"),"#621 geometry writes are not change-aware");
assert(source.includes("setDatasetIfChanged"),"#621 presentation markers are not change-aware");
assert(source.includes("if(state.raf)return false"),"#621 does not coalesce repeated signals into one rAF");
assert(source.includes("getUnobstructedMapCanvas55700SchedulerSnapshot"),"#621 scheduler instrumentation export missing");
assert(source.includes('schedulerMode:"signal_coalesced"'),"#621 public runtime authority does not report scheduler mode");

assert(!source.includes("setInterval(sync,300)"),"#621 left the #557 300ms geometry polling clock active");
assert(!source.includes("observer.observe(document.body"),"#621 left the body-wide mutation observer active");
assert(!source.includes('attributeFilter:["class","style","hidden","data-surface"]'),"#621 still observes self-written style attributes");

const applyStart=source.indexOf("function applyGeometry");
const syncStart=source.indexOf("function sync",applyStart);
assert(applyStart>=0&&syncStart>applyStart,"#621 applyGeometry boundary missing");
const applySource=source.slice(applyStart,syncStart);
assert(!applySource.includes('root.style.setProperty("--sc-hud499-'),"#621 still competes with #499 for shared HUD gutter CSS variables");
assert(applySource.includes('setStyleIfChanged(map,"--sc-map557-outboard-right"'),"#621 lost #557 Region control outboard geometry");
assert(applySource.includes('setStyleIfChanged(map,"--sc-map557-gutter-control-width"'),"#621 lost #557 control-width geometry");

for(const forbidden of ["savePlayerData(","localStorage.setItem(","activityHistory.push","playerData.","commitWorld","commitChronicle"]){
  assert(!source.includes(forbidden),`#621 presentation repair crossed semantic/persistence firewall: ${forbidden}`);
}

console.log(JSON.stringify({
  pass:true,
  issue:621,
  productionOwner:"runtime/alpha-phase2-live-hud-49900.js",
  scope:"#557 scheduler/observer only",
  signalCoalesced:true,
  periodicGeometryPolling:false,
  bodyWideStyleObserver:false,
  sharedHudGutterWriter:"#499 only",
  cssFileChanged:false,
  browserGoldenClaimed:false
},null,2));
