const fs=require("fs");
const path=require("path");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(ROOT,p),"utf8");

const battle=read("runtime/alpha-battle-modern-33000.js");
const menma=read("runtime/alpha-menma-evolved-pl-battle-36900.js");
const game=read("game.js");
const fingerprint=read("runtime/alpha-runtime-build-fingerprint-303.js");
const manifest=JSON.parse(read("tools/fixtures/runtime_build_manifest_303.json"));
const registry=JSON.parse(read("tools/fixtures/runtime_responsibility_registry_300.json"));
const declarations=JSON.parse(read("tools/fixtures/runtime_change_declarations_300.json"));

function hasAll(text,parts){return parts.every(part=>text.includes(part));}

const stale=[
  "Stop the Altered Shinobi.",
  "origin_academy_menma_prologue:altered_shinobi",
  "STOP THE ALTERED SHINOBI",
  "Stop the Altered Shinobi — not completed."
];

const presentationOwner=registry.responsibilities.find(row=>row.responsibilityId==="battle.presentation.shared");
const change=declarations.declarations.find(row=>row.changeId==="issue-373-evolved-pl-battle-presentation-golden-gate-2026-09-25");

const checks={
  sharedOwnerStillCanonical:presentationOwner&&presentationOwner.canonicalOwner==="runtime/alpha-battle-modern-33000.js",
  orderedQueueApi:hasAll(battle,[
    "function ensureBattlePresentationQueueState33000",
    "function enqueueBattlePresentationReceipt33000",
    "function startNextBattlePresentationReceipt33000",
    "function hardSettleBattlePresentation33000",
    "function getBattlePresentationQueueState33000"
  ]),
  immutableReceipt:battle.includes("const receipt=Object.freeze({")&&battle.includes("sequenceOrdinal:state.nextSequenceOrdinal++"),
  queueConsumesEvidence:hasAll(battle,[
    "currentBattle.runtime.evidence",
    "BATTLE_PRESENTATION_COMPLETION_TYPES_33000",
    "recordBattleEvidence",
    "enqueueBattlePresentationReceipt33000(definition.actionId)"
  ]),
  queueDoesNotResolveCombat:!battle.includes("function enqueueBattlePresentationReceipt33000(actionId){\n    resolveBattleDamage")&&
    !battle.includes("function startNextBattlePresentationReceipt33000(stage){\n    beginBattleActionResolution"),
  supportHydration:hasAll(battle,[
    'node.classList.remove("is-empty")',
    'node.dataset.formationRole="benched"',
    'node.dataset.presentationAssetKind="frameless_portrait"'
  ]),
  activePortraitProjection:hasAll(battle,[
    'node.dataset.formationRole="active"',
    'img.dataset.presentationAssetKind="frameless_portrait"',
    "formationPortrait33000(side,participant)"
  ]),
  exactEnvironment:battle.includes('MENMA_EVOLVED_BACKDROP_33000="Scene backdrops/forest_clearing_day.png"')&&
    battle.includes('stage.style.setProperty("background-image"'),
  exactObjective:battle.includes('MENMA_EVOLVED_OBJECTIVE_33000="Stop the Test Subjects."')&&
    menma.includes('OBJECTIVE_DISPLAY="Stop the Test Subjects."'),
  exactFormationSemantics:menma.includes('createBattleDeploymentSlots([MENMA_ID,ANKO_ID])')&&
    menma.includes('createBattleDeploymentSlots([...HOSTILE_IDS])'),
  exactEnemyPortraitAssets:hasAll(game,[
    'image:"Enemies Portraits/test_subject_altered_shinobi.png"',
    'image:"Enemies Portraits/test_subject_brute.png"',
    'image:"Enemies Portraits/test_subject_unstable.png"'
  ]),
  staleObjectiveGone:stale.every(token=>!game.includes(token)),
  successorObjectivePresent:hasAll(game,[
    "Stop the Test Subjects.",
    "origin_academy_menma_prologue:three_test_subjects",
    "STOP THE TEST SUBJECTS",
    "Stop the Test Subjects — not completed."
  ]),
  menmaQueueEnabled:hasAll(menma,[
    "b.presentationQueueEnabled=true",
    "b.evolvedBattlePresentation=true",
    "initializeBattlePresentationQueue33000",
    "b.presentationTerminalPending=\"victory\"",
    "b.presentationTerminalPending=\"defeat\""
  ]),
  terminalCallerDeferred:hasAll(menma,[
    "const caller=b.returnContext||null",
    "b.returnContext=null",
    "b.returnContext=caller"
  ])&&hasAll(battle,[
    "presentationTerminalPending",
    'resumeBattleCallerAfterCompletion("defeat")',
    'openOverlay("victory")'
  ]),
  safeHardSettle:hasAll(battle,[
    'hardSettleBattlePresentation33000(reason="presentation_fail_soft")',
    "semanticWrite:false",
    "state.playbackToken"
  ]),
  kakashiMotionPolicyPreserved:battle.includes("Final Kakashi Golden / Formation Stage motion policy")&&
    battle.includes('[data-evolved-battle-presentation="true"]'),
  buildBumped:manifest.buildId==="SC-ALPHA-RUNTIME-R303-2026-09-25-AJ"&&
    manifest.runtimeGeneration==="alpha-evolved-pl-battle-presentation-373"&&
    manifest.majorRuntimeFeatures.includes("evolved-pl-battle-presentation-golden-gate-373")&&
    fingerprint.includes("SC-ALPHA-RUNTIME-R303-2026-09-25-AJ"),
  ownershipDeclared:!!presentationOwner&&presentationOwner.stateWrites.includes("currentBattle.presentation33000 presentation-only queue/exposure state")&&
    !!change&&change.classification==="EXTENDS",
  goldenStillNotClaimed:battle.includes("browserGoldenClaimed:false")&&menma.includes("browserGoldenClaimed:false")
};

const failed=Object.entries(checks).filter(([,value])=>value!==true).map(([key])=>key);
console.log(JSON.stringify({
  pass:failed.length===0,
  issue:373,
  kind:"source_evolved_pl_battle_presentation",
  checks,
  failed,
  semanticNumericsChanged:false,
  browserGoldenClaimed:false
},null,2));
assert.deepStrictEqual(failed,[]);
