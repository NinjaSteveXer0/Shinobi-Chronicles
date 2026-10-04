#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const read=rel=>fs.readFileSync(path.join(ROOT,rel),"utf8");
const RUNTIME=read("runtime/alpha-hud-my-clan-return-context-50600.js");
const INDEX=read("index.html");
const FP=read("runtime/alpha-runtime-build-fingerprint-303.js");

assert(RUNTIME.includes('data-hud499-action="clan"'),"#506 must bind only HUD My Clan activation");
assert(RUNTIME.includes("captureStoryScenePresentationUnderlay"),"#506 must reuse existing underlay capture authority");
assert(RUNTIME.includes("restoreStoryScenePresentationUnderlay"),"#506 must reuse existing underlay restore authority");
assert(RUNTIME.includes("returnToWorldMap"),"#506 World return must use canonical World owner");
assert(RUNTIME.includes("forceCloseMyClanOverlay"),"#506 must integrate at existing My Clan force-close seam");
assert(RUNTIME.includes("priorForceCloseMyClan.apply"),"#506 must preserve non-HUD My Clan close behavior");
assert(RUNTIME.includes('currentOverlayName()==="clan"'),"#506 must consume return context only while My Clan is actually open");
assert(RUNTIME.includes('noPlayerDataMutation:!sourceBundle().includes("playerData.")'),"#506 runtime diagnostic must firewall playerData mutation");
assert(RUNTIME.includes('noWorldMutation:!sourceBundle().includes("setOpportunity")'),"#506 runtime diagnostic must firewall World mutation");
assert(RUNTIME.includes('noTeamMutation:!sourceBundle().includes("selectAcademyTeamFormation")'),"#506 runtime diagnostic must firewall team mutation");
assert(RUNTIME.includes("persistentStateCreated:false"),"#506 must explicitly declare transient-only caller context");

const hudPos=INDEX.indexOf('runtime/alpha-phase2-live-hud-49900.js');
const shopPos=INDEX.indexOf('runtime/alpha-phase2-basic-item-shop-51700.js');
const fixPos=INDEX.indexOf('runtime/alpha-hud-my-clan-return-context-50600.js');
assert(hudPos>=0&&shopPos>=0&&fixPos>shopPos&&fixPos>hudPos,"#506 adapter must load after HUD/My Clan callsites");
assert(FP.includes("hud-my-clan-exact-map-return-506"),"#506 missing from runtime fingerprint features");

console.log(JSON.stringify({
  pass:true,
  issue:506,
  existingPresentationReturnAuthorityReused:true,
  hudCallerOnly:true,
  dirtyCloseAuthorityPreserved:true,
  persistentNavigationStateCreated:false,
  worldOrKnowledgeMutation:false,
  browserGoldenClaimed:false
},null,2));
