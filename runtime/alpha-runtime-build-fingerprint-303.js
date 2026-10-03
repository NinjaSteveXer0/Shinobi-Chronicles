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
    buildId:"SC-ALPHA-RUNTIME-R303-2026-10-03-DN",
    sourceBaselineCommit:"7e96e3e927d8e2190db9c001e83dfd69db728ce5",
    sourceRef:"issue-303-runtime-build-fingerprint-v1",
    runtimeGeneration:"phase2-live-hud-499",
    majorRuntimeFeatures:Object.freeze([
      "academy-kakashi-v2",
      "runtime-ownership-safety-300",
      "post-battle-agency-278",
      "story-battle-performance-312",
      "battle-formation-stage-319",
      "story-battle-motion-quick-skills",
      "story-battle-motion-coherence",
      "kakashi-ps-route-reward-scene-crossfade",
      "kakashi-battle-golden-consolidation",
      "kakashi-final-static-motion-curtain",
      "academy-obito-final-binary-journey-331",
      "shared-story-hard-transition-owner-334",
      "contextual-special-jonin-evidence-producer-23",
      "kakashi-final-dispositions-rewards-evidence-322",
      "kakashi-final-browser-golden-longhand-motion",
      "academy-hinata-writing-golden-340",
      "active-origin-story-reload-presentation-340",
      "kakashi-writing-golden-runtime-consumption",
      "kakashi-canonical-machine-resolver-routing",
      "kakashi-uncapped-terminal-reward-aggregation-354",
      "kakashi-individual-anbu-handoff-card-separation-302",
      "academy-menma-three-subject-whole-encounter-reward-362",
      "academy-obito-golden-presentation-backdrops",
      "academy-menma-evolved-pl-battle-369",
      "academy-menma-whole-encounter-reward-victory-trigger-379",
      "academy-kakashi-menma-skill-lock-383",
      "academy-menma-half-scripted-battle-presentation-373",
      "academy-menma-half-scripted-relay-refresh-373",
      "story-box-paragraph-segmentation-370",
      "origin-backdrop-tranche-hinata-menma-393",
      "academy-metal-controlled-spar-met03-396",
      "academy-iwabee-reusable-rogue-genin-package-399",
      "academy-iwabee-rogue-disposition-399",
      "academy-origin-eight-palette-display-names-400",
      "academy-metal-story-graph-route-closure-396",
      "academy-metal-iwabee-golden-shim-retirement-33500",
      "academy-origin-shared-scene-board-bindings-105",
      "academy-wasabi-writing-golden-343",
      "academy-wasabi-rogue-genin-battle-343",
      "academy-wasabi-pursuit-target-actor-343",
      "academy-wasabi-machine-resolver-adapter-343",
      "academy-origin-starting-purse-409",
      "shared-origin-story-presentation-parity-105",
      "academy-mirai-menma-writing-golden-runtime-105",
      "shared-radial-battle-pl-containment-105",
      "origin-receipt-button-input-lock-105",
      "origin-start-pl-battle-global-cta-105",
      "academy-mirai-terminal-receipt-repair-105",
      "academy-menma-nine-tails-speaker-receipt-repair-105",
      "academy-menma-victory-diagnostic-retired-105",
      "phase2-first-live-ce-hotspot-469",
      "phase2-private-origin-live-ce-hotspot-478",
      "story-scene-board-owner-retest-469",
      "menma-dynamic-second-teammate-ce-hotspot-469",
      "story-scene-board-ui486-golden-plus-authority",
      "chronicle-run-instance-identity-494",
      "phase2-live-hud-499",
      "phase2-live-hud-owned-identity-variant-projection-499",
      "phase2-live-hud-canonical-affiliation-projection-499",
      "phase2-live-hud-canonical-empty-affiliation-preservation-499",
      "phase2-live-hud-world-map-dominance-repair-499",
      "phase2-live-hud-team-rail-owner-polish-499",
      "phase2-live-hud-chronicle-compass-synthesis-499",
      "phase2-live-hud-world-masterbrand-lockup-499",
      "phase2-live-hud-safe-bottom-reserve-499",
      "phase2-live-hud-canonical-world-return-499"
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
      exactBuildId:first.buildId==="SC-ALPHA-RUNTIME-R303-2026-10-03-DN",
      sourceBaselineIsRealSha:/^[0-9a-f]{40}$/.test(first.sourceBaselineCommit),
      sourceRefPresent:first.sourceRef==="issue-303-runtime-build-fingerprint-v1",
      generationPresent:first.runtimeGeneration==="phase2-live-hud-499",
      repaired469FeaturePresent:first.majorRuntimeFeatures.includes("phase2-first-live-ce-hotspot-469"),
      privateHistory478FeaturePresent:first.majorRuntimeFeatures.includes("phase2-private-origin-live-ce-hotspot-478"),
      ownerRetestPresentationFeaturePresent:first.majorRuntimeFeatures.includes("story-scene-board-owner-retest-469"),
      dynamicSecondTeammate469Present:first.majorRuntimeFeatures.includes("menma-dynamic-second-teammate-ce-hotspot-469"),
      sceneBoardUi486AuthorityPresent:first.majorRuntimeFeatures.includes("story-scene-board-ui486-golden-plus-authority"),
      chronicleRunInstance494Present:first.majorRuntimeFeatures.includes("chronicle-run-instance-identity-494"),
      phase2LiveHud499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-499"),
      phase2LiveHudOwnedIdentityVariantProjection499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-owned-identity-variant-projection-499"),
      phase2LiveHudCanonicalAffiliation499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-canonical-affiliation-projection-499"),
      phase2LiveHudCanonicalEmptyAffiliation499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-canonical-empty-affiliation-preservation-499"),
      phase2LiveHudWorldMapDominance499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-world-map-dominance-repair-499"),
      phase2LiveHudTeamRailOwnerPolish499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-team-rail-owner-polish-499"),
      phase2LiveHudChronicleCompass499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-chronicle-compass-synthesis-499"),
      phase2LiveHudWorldMasterbrand499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-world-masterbrand-lockup-499"),
      phase2LiveHudSafeBottomReserve499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-safe-bottom-reserve-499"),
      phase2LiveHudCanonicalWorldReturn499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-canonical-world-return-499"),
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
