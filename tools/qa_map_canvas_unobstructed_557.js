#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const read=rel=>fs.readFileSync(path.join(ROOT,rel),"utf8");

const runtime=read("runtime/alpha-phase2-live-hud-49900.js");
const legacy506=read("runtime/alpha-hud-my-clan-return-context-50600.js");

assert(runtime.includes('PATCH_ID="map_canvas_unobstructed_55700_2026_10_06"'),"#557 patch identity missing from canonical #499 HUD owner");
assert(runtime.includes('region:".region-map-pane"')&&runtime.includes('village:".village-map-screen"'),"#557 is not bounded to canonical Region/Village map frames");
assert(runtime.includes("intersectionArea")&&runtime.includes("hudClearOfMap")&&runtime.includes("regionControlsClearOfMap"),"#557 does not expose strict zero-overlap diagnostics");
assert(runtime.includes("--sc-hud499-map-left")&&runtime.includes("--sc-hud499-map-right"),"#557 does not consume existing #499 measured-gutter variables");
assert(runtime.includes(".sc-hud499-state-cluster")&&runtime.includes(".sc-hud499-team")&&runtime.includes(".sc-hud499-tools")&&runtime.includes(".sc-hud499-map-nav"),"required HUD surfaces are not explicitly placed outside the map");
assert(runtime.includes(".region-world-close")&&runtime.includes(".region-info-toggle")&&runtime.includes(".region-info-drawer")&&runtime.includes(".region-world-map-button"),"legacy Region map chrome is not moved outboard");
assert(runtime.includes(".region-hotspot .hotspot-hover-card{display:none!important}"),"legacy Region hover card can still cover the crisp map");
assert(runtime.includes("SC_PHASE2_LIVE_HUD_49900"),"#557 does not consume existing #499 presentation authority");
assert(runtime.includes("SC_MAP_CANVAS_UNOBSTRUCTED_55700"),"#557 integrated activation is not exposed from canonical #499 owner");
assert(runtime.includes("browserGoldenClaimed:false"),"#557 incorrectly claims browser GOLDEN");

const patchStart=runtime.indexOf("// ISSUE #557 — UNOBSTRUCTED VILLAGE / REGION MAP CANVASES");
assert(patchStart>=0,"#557 integrated source boundary missing");
const patchSource=runtime.slice(patchStart);
for(const forbidden of [
  "savePlayerData(","saveTestState(","localStorage.setItem(","commitWorld","commitChronicle",
  "discoverOpportunity","discoverLocation","activityHistory.push","playerData."
]){
  assert(!patchSource.includes(forbidden),`#557 presentation patch contains forbidden semantic/persistence write seam: ${forbidden}`);
}

assert(!legacy506.includes("alpha-map-canvas-unobstructed-55700.js"),"#506 still owns a duplicate #557 loader seam");
assert(!fs.existsSync(path.join(ROOT,"runtime/alpha-map-canvas-unobstructed-55700.js")),"duplicate standalone #557 runtime owner still exists");

console.log(JSON.stringify({
  pass:true,
  issue:557,
  owner:"runtime/alpha-phase2-live-hud-49900.js",
  patch:"map_canvas_unobstructed_55700_2026_10_06",
  scope:["village","region"],
  semanticMutation:false,
  persistentMapOverlapPolicy:"zero",
  duplicateRuntimeOwner:false,
  browserGoldenClaimed:false
},null,2));
