#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const read=rel=>fs.readFileSync(path.join(ROOT,rel),"utf8");

const runtime=read("runtime/alpha-phase2-live-hud-49900.js");
const outboard=read("runtime/alpha-phase2-map-canvas-outboard-557.css");
const index=read("index.html");
const browserQa=read("tools/qa_map_canvas_unobstructed_557_browser.js");
const legacy506=read("runtime/alpha-hud-my-clan-return-context-50600.js");
const gutterAsset=path.join(ROOT,"UI/kitsunemori_gutter.png");

assert(runtime.includes('PATCH_ID="map_canvas_unobstructed_55700_2026_10_06"'),"#557 patch identity missing from canonical #499 HUD owner");
assert(runtime.includes('region:".region-map-pane"')&&runtime.includes('village:".village-map-screen"'),"#557 is not bounded to canonical Region/Village map frames");
assert(runtime.includes("intersectionArea")&&runtime.includes("hudClearOfMap")&&runtime.includes("regionControlsClearOfMap"),"#557 does not expose strict zero-overlap diagnostics");
assert(runtime.includes("--sc-hud499-map-left")&&runtime.includes("--sc-hud499-map-right"),"#557 does not consume existing #499 measured-gutter variables");
assert(runtime.includes(".sc-hud499-state-cluster")&&runtime.includes(".sc-hud499-team")&&runtime.includes(".sc-hud499-tools")&&runtime.includes(".sc-hud499-map-nav"),"required HUD surfaces are not explicitly placed outside the map");
assert(runtime.includes(".region-world-close")&&runtime.includes(".region-info-toggle")&&runtime.includes(".region-info-drawer")&&runtime.includes(".region-world-map-button"),"legacy Region map chrome is not moved outboard");
assert(runtime.includes(".region-hotspot .hotspot-hover-card{display:none!important}"),"legacy Region hover card can still cover the crisp map");
assert(runtime.includes(".region-map-pane .region-event-drawer")||outboard.includes(".region-map-pane .region-event-drawer"),"Region selected-event drawer is not moved into the contextual reserve");
assert(outboard.includes(".region-known-destinations"),"non-spatial known-destination navigation can still cover the Region map");
assert(outboard.includes(".village-map-return")&&outboard.includes(".village-info-toggle")&&outboard.includes(".village-info-drawer"),"legacy Village navigation/info chrome can still cover the Village map");
assert(index.includes('href="runtime/alpha-phase2-map-canvas-outboard-557.css"'),"#557 outboard completion stylesheet is not production-loaded");

// #614 authored Village gutter-body integration must stay inside the canonical
// #499/#557 presentation path. The atlas is a component source, never a stage
// wallpaper. Intended components are isolated into the measured left/right
// reserves while the crisp map remains the hard zero-overlap exclusion zone.
assert(fs.existsSync(gutterAsset),"#614 approved Kitsunemori gutter asset is missing");
assert(outboard.includes('background-image:url("../UI/kitsunemori_gutter.png")'),"#614 gutter components are not wired through canonical #557 presentation CSS");
assert(outboard.includes("--sc-hud499-echo-map-left")&&outboard.includes("--sc-hud499-echo-map-width"),"#614 gutter body is not clipped from the canonical measured map rectangle");
assert(outboard.includes("mask-image: linear-gradient")&&outboard.includes("transparent calc(var(--sc-hud499-echo-map-left) + var(--sc-hud499-echo-map-width))"),"#614 gutter body can bleed over the crisp map rectangle");
assert(outboard.includes(".sc-hud499-stage-echo-layer::before")&&outboard.includes("aspect-ratio:252 / 1057"),"#614 left squad rail atlas component is not isolated");
assert(outboard.includes("background-size:574.603175% 102.743614%")&&outboard.includes("background-position:1.672241% 48.275862%"),"#614 left squad rail crop no longer matches the approved atlas bounds");
assert(outboard.includes(".sc-hud499-stage-echo-layer::after")&&outboard.includes("aspect-ratio:505 / 1061"),"#614 right command/dossier atlas component is not isolated");
assert(outboard.includes("background-size:286.732673% 102.356268%")&&outboard.includes("background-position:32.025451% 40%"),"#614 right command/dossier crop no longer matches the approved atlas bounds");
const stageRule=outboard.match(/\.overlay-content-box\.sc-hud499-map-echo-active:has\(\.village-map-screen\) \.sc-hud499-stage-echo-layer \{([\s\S]*?)\n\}/);
assert(stageRule,"#614 canonical Village stage rule missing");
assert(!stageRule[1].includes("kitsunemori_gutter.png"),"#614 regressed to whole-atlas stage wallpaper consumption");
assert(stageRule[1].includes("linear-gradient"),"#614 quiet authored gutter material base is missing");
assert(outboard.includes('[data-surface="region"] .sc-hud499-state-cluster {\n  top: 12px !important;'),"#614 must not move the Region identity cluster");
assert(outboard.includes('[data-surface="village"] .sc-hud499-state-cluster {\n  top: 22px !important;'),"#614 Village identity cluster lower inset is missing");

const ownerSelectedEventProof=browserQa.includes("proveOwnerSelectedRegionEventCard")
  &&browserQa.includes('preferredId="hotspot_fire_konohagakure"')
  &&browserQa.includes("selectMapNode(regionKey,target.hotspotId)")
  &&browserQa.includes("Konohagakure")
  &&browserQa.includes("ENTER LOCATION")
  &&browserQa.includes("DISCOVERY")
  &&browserQa.includes("assertNoIntersection(g.region.eventDrawer")
  &&browserQa.includes('assertHotspotsReachable(page,"region"')
  &&browserQa.includes("selected-event presentation mutated Chronicle/World state");
assert(ownerSelectedEventProof,"#557 browser QA does not deliberately open and prove the owner-visible Konohagakure selected-event card");
assert(browserQa.includes("knownDestinations")&&browserQa.includes(".village-map-return")&&browserQa.includes(".village-info-toggle")&&browserQa.includes(".village-info-drawer"),"#557 browser QA does not measure all remaining legacy map chrome");
assert(browserQa.includes("ordinarySingleClickDoesNotOpenDrawer")&&browserQa.includes("deliberateDoubleClickRoute"),"#557 browser QA does not preserve the deliberate Region activation contract");
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
for(const forbidden of ["savePlayerData","localStorage","playerData","commitWorld","commitChronicle","discoverOpportunity","discoverLocation"]){
  assert(!outboard.includes(forbidden),`#557 outboard stylesheet contains forbidden semantic token: ${forbidden}`);
}

assert(!legacy506.includes("alpha-map-canvas-unobstructed-55700.js"),"#506 still owns a duplicate #557 loader seam");
assert(!fs.existsSync(path.join(ROOT,"runtime/alpha-map-canvas-unobstructed-55700.js")),"duplicate standalone #557 runtime owner still exists");

console.log(JSON.stringify({
  pass:true,
  issue:557,
  owner:"runtime/alpha-phase2-live-hud-49900.js",
  patch:"map_canvas_unobstructed_55700_2026_10_06",
  styleCompletion:"runtime/alpha-phase2-map-canvas-outboard-557.css",
  scope:["village","region"],
  selectedLocationInfoOutboard:true,
  ownerSelectedEventOverlayOutboard:true,
  eventDisambiguationOutboard:true,
  deliberateRegionActivationContract:true,
  regionKnownDestinationsOutboard:true,
  villageLegacyChromeOutboard:true,
  authoredVillageGutterBody:true,
  authoredVillageGutterAsset:"UI/kitsunemori_gutter.png",
  authoredVillageGutterConsumption:"component_sliced",
  leftGutterComponentBounds:[20,14,252,1057],
  rightGutterComponentBounds:[302,10,505,1061],
  villageIdentityTopPx:22,
  regionIdentityTopPx:12,
  semanticMutation:false,
  persistentMapOverlapPolicy:"zero",
  duplicateRuntimeOwner:false,
  browserGoldenClaimed:false
},null,2));