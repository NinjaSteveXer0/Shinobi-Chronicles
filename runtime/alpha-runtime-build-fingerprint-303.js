// ============================================================================
// ALPHA RUNTIME BUILD FINGERPRINT — ISSUE #303
//
// Development/Alpha diagnostics only. This module exposes the exact static
// runtime generation expected by the checked-out candidate without mutating
// gameplay state, saves, Story, Battle, rewards, PL/Rank or presentation.
//
// IMPORTANT:
// - sourceBaselineCommit is the verified main commit on which this fingerprint
//   generation was authored. It is not claimed to be this file's self-SHA.
// - buildId is the browser-visible runtime identity.
// - runtime-affecting changes must bump the committed manifest/buildId.
// ============================================================================
(function installAlphaRuntimeBuildFingerprint303(){
  "use strict";

  const MANIFEST=Object.freeze({
    schemaVersion:1,
    buildId:"SC-ALPHA-RUNTIME-R303-2026-09-22-A",
    sourceBaselineCommit:"107d602107237f95d23694685ed15b46d0dc4a45",
    sourceRef:"issue-303-runtime-build-fingerprint-v1",
    runtimeGeneration:"alpha-clean-runtime-kakashi-v2-ownership300-agency278",
    majorRuntimeFeatures:Object.freeze([
      "academy-kakashi-v2",
      "runtime-ownership-safety-300",
      "post-battle-agency-278"
    ]),
    productionLoader:"index.html",
    runtimeModule:"runtime/alpha-runtime-build-fingerprint-303.js",
    api:"getRuntimeBuildFingerprint",
    fingerprintPolicy:"bump_on_runtime_affecting_change",
    playerFacing:false
  });

  function snapshot(){
    return Object.freeze({
      schemaVersion:MANIFEST.schemaVersion,
      buildId:MANIFEST.buildId,
      sourceBaselineCommit:MANIFEST.sourceBaselineCommit,
      sourceRef:MANIFEST.sourceRef,
      runtimeGeneration:MANIFEST.runtimeGeneration,
      majorRuntimeFeatures:Object.freeze([...MANIFEST.majorRuntimeFeatures]),
      productionLoader:MANIFEST.productionLoader,
      runtimeModule:MANIFEST.runtimeModule,
      api:MANIFEST.api,
      fingerprintPolicy:MANIFEST.fingerprintPolicy,
      playerFacing:MANIFEST.playerFacing
    });
  }

  function getRuntimeBuildFingerprint(){
    return snapshot();
  }

  function runRuntimeBuildFingerprint303Diagnostics(){
    const first=getRuntimeBuildFingerprint();
    const second=getRuntimeBuildFingerprint();
    const checks={
      exactBuildId:first.buildId==="SC-ALPHA-RUNTIME-R303-2026-09-22-A",
      sourceBaselineIsRealSha:/^[0-9a-f]{40}$/.test(first.sourceBaselineCommit),
      sourceRefPresent:first.sourceRef==="issue-303-runtime-build-fingerprint-v1",
      generationPresent:first.runtimeGeneration==="alpha-clean-runtime-kakashi-v2-ownership300-agency278",
      noPlayerFacingSurface:first.playerFacing===false,
      deterministic:JSON.stringify(first)===JSON.stringify(second),
      immutable:Object.isFrozen(first)&&Object.isFrozen(first.majorRuntimeFeatures)
    };
    const failed=Object.entries(checks).filter(([,value])=>value!==true).map(([key])=>key);
    return Object.freeze({pass:failed.length===0,checks:Object.freeze(checks),failed:Object.freeze(failed),browserGoldenClaimed:false});
  }

  globalThis.SC_RUNTIME_BUILD_FINGERPRINT_303=MANIFEST;
  globalThis.getRuntimeBuildFingerprint=getRuntimeBuildFingerprint;
  globalThis.runRuntimeBuildFingerprint303Diagnostics=runRuntimeBuildFingerprint303Diagnostics;

  try{
    console.info(
      "[Shinobi Chronicles][ALPHA] Runtime "+
      MANIFEST.buildId+
      " | baseline "+MANIFEST.sourceBaselineCommit.slice(0,8)+
      " | generation "+MANIFEST.runtimeGeneration
    );
  }catch(_error){}
})();
