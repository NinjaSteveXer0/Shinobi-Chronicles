#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const vm=require("vm");

const ROOT=path.resolve(__dirname,"..");
const MANIFEST_PATH=path.join(ROOT,"tools/fixtures/runtime_build_manifest_303.json");
const MODULE_PATH=path.join(ROOT,"runtime/alpha-runtime-build-fingerprint-303.js");
const INDEX_PATH=path.join(ROOT,"index.html");

const manifest=JSON.parse(fs.readFileSync(MANIFEST_PATH,"utf8"));
const source=fs.readFileSync(MODULE_PATH,"utf8");
const index=fs.readFileSync(INDEX_PATH,"utf8");

assert.strictEqual(manifest.schemaVersion,1,"#303 manifest schema");
assert.strictEqual(manifest.playerFacing,false,"#303 fingerprint must remain non-player-facing");
assert.strictEqual(manifest.productionLoader,"index.html","#303 production loader drift");
assert.strictEqual(manifest.runtimeModule,"runtime/alpha-runtime-build-fingerprint-303.js","#303 runtime module drift");
assert.strictEqual(manifest.api,"getRuntimeBuildFingerprint","#303 API drift");
assert.strictEqual(manifest.fingerprintPolicy,"bump_on_runtime_affecting_change","#303 bump policy missing");
assert(/^[0-9a-f]{40}$/.test(manifest.sourceBaselineCommit),"#303 sourceBaselineCommit must be a real full SHA");
assert(!/^[0-9a-f]{40}$/.test(manifest.buildId),"#303 buildId must not masquerade as a Git SHA");
assert(Array.isArray(manifest.majorRuntimeFeatures)&&manifest.majorRuntimeFeatures.length>=3,"#303 major runtime features missing");

const scriptNeedle='<script src="runtime/alpha-runtime-build-fingerprint-303.js"></script>';
assert.strictEqual(index.split(scriptNeedle).length-1,1,"#303 fingerprint module must load exactly once");
assert(index.indexOf(scriptNeedle)<index.indexOf('<script src="game.js"></script>'),"#303 fingerprint should load before gameplay runtime");

for(const forbidden of ["playerData","currentBattle","activeStorySceneRuntime","localStorage","sessionStorage","document.querySelector","document.getElementById"]){
  assert(!source.includes(forbidden),`#303 diagnostics module must not touch gameplay/browser state: ${forbidden}`);
}

const consoleLines=[];
const sandbox={
  console:{info:(...args)=>consoleLines.push(args.map(String).join(" ")),log(){},warn(){},error(){}}
};
sandbox.globalThis=sandbox;
vm.runInNewContext(source,sandbox,{filename:"alpha-runtime-build-fingerprint-303.js"});

assert.strictEqual(typeof sandbox.getRuntimeBuildFingerprint,"function","#303 global diagnostic API missing");
assert(sandbox.SC_RUNTIME_BUILD_FINGERPRINT_303,"#303 global manifest missing");
assert.strictEqual(typeof sandbox.runRuntimeBuildFingerprint303Diagnostics,"function","#303 diagnostics missing");

const first=JSON.parse(JSON.stringify(sandbox.getRuntimeBuildFingerprint()));
const second=JSON.parse(JSON.stringify(sandbox.getRuntimeBuildFingerprint()));
assert.deepStrictEqual(first,manifest,"#303 browser API does not match committed manifest");
assert.deepStrictEqual(second,manifest,"#303 browser API is not deterministic");

const diag=JSON.parse(JSON.stringify(sandbox.runRuntimeBuildFingerprint303Diagnostics()));
assert.strictEqual(diag.pass,true,JSON.stringify(diag));

const expectedBanner=
  "[Shinobi Chronicles][ALPHA] Runtime "+
  manifest.buildId+
  " | baseline "+manifest.sourceBaselineCommit.slice(0,8)+
  " | generation "+manifest.runtimeGeneration;
assert(consoleLines.includes(expectedBanner),"#303 exact console startup banner missing");

console.log(JSON.stringify({
  pass:true,
  issue:303,
  buildId:manifest.buildId,
  sourceBaselineCommit:manifest.sourceBaselineCommit,
  sourceRef:manifest.sourceRef,
  runtimeGeneration:manifest.runtimeGeneration,
  productionLoader:"index.html",
  loadedBeforeGameJs:true,
  api:"getRuntimeBuildFingerprint()",
  deterministic:true,
  committedManifestParity:true,
  exactConsoleBanner:expectedBanner,
  playerFacing:false,
  browserGoldenClaimed:false
},null,2));
