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
    buildId:"SC-ALPHA-RUNTIME-R303-2026-10-10-EO",
    sourceBaselineCommit:"248954c1fd3fc2d77abd8cd95af90fb2f99e5d7d",
    sourceRef:"issue-303-runtime-build-fingerprint-v1",
    runtimeGeneration:"step7-academy-genin-promotion-integrated-603",
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
      "phase2-live-hud-canonical-world-return-499",
      "phase2-live-hud-loader-newline-cleanup-499",
      "phase2-live-hud-region-village-gutter-integration-499",
      "phase2-live-hud-functional-gutter-context-499",
      "phase2-live-hud-region-village-map-echo-499",
      "phase2-live-hud-region-village-map-echo-visible-stage-499",
      "phase2-basic-item-shop-517",
      "hud-my-clan-exact-map-return-506",
      "phase2-character-card-shop-retail-acquisition-524",
      "phase2-deliberate-team-assignment-532",
      "current-team-exact-owned-lineage-532",
      "chronicle-protagonist-team-separation-532",
      "person-name-card-title-rank-separation-532",
      "chronicle-interaction-depth-scene-board-32",
      "my-clan-code-first-inspector-541",
      "konoha-activity-current-team-1-6-541",
      "konoha-activity-result-stage-stable-dock-453-541",
      "konoha-activity-active-master-consumption-431-526-528",
      "durable-object-provenance-148-545",
      "durable-retail-kunai-148-552",
      "phase2-unobstructed-village-region-map-canvases-557",
      "phase2-region-village-hud-stability-621",
      "academy-origin-base-stat-recalibration-582-597",
      "phase2-konoha-activity-contamination-539",
      "canonical-battle-terminal-result-owner-consolidated-544",
      "step7-academy-genin-promotion-integrated-603"
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

  function getRuntimeBuildFingerprint(){return snapshot();}

  function runRuntimeBuildFingerprint303Diagnostics(){
    const first=getRuntimeBuildFingerprint();
    const second=getRuntimeBuildFingerprint();
    const checks={
      exactBuildId:first.buildId==="SC-ALPHA-RUNTIME-R303-2026-10-10-EO",
      sourceBaselineIsRealSha:/^[0-9a-f]{40}$/.test(first.sourceBaselineCommit),
      sourceRefPresent:first.sourceRef==="issue-303-runtime-build-fingerprint-v1",
      generationPresent:first.runtimeGeneration==="step7-academy-genin-promotion-integrated-603",
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
      phase2LiveHudLoaderNewlineCleanup499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-loader-newline-cleanup-499"),
      phase2LiveHudRegionVillageGutter499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-region-village-gutter-integration-499"),
      phase2LiveHudFunctionalGutterContext499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-functional-gutter-context-499"),
      phase2LiveHudRegionVillageMapEcho499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-region-village-map-echo-499"),
      phase2LiveHudRegionVillageMapEchoVisibleStage499Present:first.majorRuntimeFeatures.includes("phase2-live-hud-region-village-map-echo-visible-stage-499"),
      phase2BasicItemShop517Present:first.majorRuntimeFeatures.includes("phase2-basic-item-shop-517"),
      hudMyClanExactMapReturn506Present:first.majorRuntimeFeatures.includes("hud-my-clan-exact-map-return-506"),
      phase2CharacterCardShop524Present:first.majorRuntimeFeatures.includes("phase2-character-card-shop-retail-acquisition-524"),
      phase2TeamAssignment532Present:first.majorRuntimeFeatures.includes("phase2-deliberate-team-assignment-532"),
      exactOwnedLineage532Present:first.majorRuntimeFeatures.includes("current-team-exact-owned-lineage-532"),
      protagonistSeparation532Present:first.majorRuntimeFeatures.includes("chronicle-protagonist-team-separation-532"),
      personNameSeparation532Present:first.majorRuntimeFeatures.includes("person-name-card-title-rank-separation-532"),
      chronicleInteractionDepth32Present:first.majorRuntimeFeatures.includes("chronicle-interaction-depth-scene-board-32"),
      myClanCodeFirst541Present:first.majorRuntimeFeatures.includes("my-clan-code-first-inspector-541"),
      konohaActivityCurrentTeam541Present:first.majorRuntimeFeatures.includes("konoha-activity-current-team-1-6-541"),
      konohaActivityResultStage541Present:first.majorRuntimeFeatures.includes("konoha-activity-result-stage-stable-dock-453-541"),
      konohaActivityActiveMaster431526528Present:first.majorRuntimeFeatures.includes("konoha-activity-active-master-consumption-431-526-528"),
      durableObjectProvenance148545Present:first.majorRuntimeFeatures.includes("durable-object-provenance-148-545"),
      durableRetailKunai148552Present:first.majorRuntimeFeatures.includes("durable-retail-kunai-148-552"),
      unobstructedMapCanvas557Present:first.majorRuntimeFeatures.includes("phase2-unobstructed-village-region-map-canvases-557"),
      regionVillageHudStability621Present:first.majorRuntimeFeatures.includes("phase2-region-village-hud-stability-621"),
      academyOriginRegistry597Present:first.majorRuntimeFeatures.includes("academy-origin-base-stat-recalibration-582-597"),
      konohaActivityContamination539Present:first.majorRuntimeFeatures.includes("phase2-konoha-activity-contamination-539"),
      canonicalBattleTerminalResult544Present:first.majorRuntimeFeatures.includes("canonical-battle-terminal-result-owner-consolidated-544"),
      step7Promotion603Present:first.majorRuntimeFeatures.includes("step7-academy-genin-promotion-integrated-603"),
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
      "[Shinobi Chronicles][ALPHA] Runtime "+MANIFEST.buildId+
      " | baseline "+MANIFEST.sourceBaselineCommit.slice(0,8)+
      " | generation "+MANIFEST.runtimeGeneration
    );
  }catch(_error){}
})();