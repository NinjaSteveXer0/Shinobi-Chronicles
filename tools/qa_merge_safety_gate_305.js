#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {classifyFiles,CLASSES}=require("./merge_safety_gate_305.js");

const ROOT=path.resolve(__dirname,"..");
const MANIFEST=JSON.parse(fs.readFileSync(path.join(ROOT,"tools/fixtures/merge_safety_gate_305_manifest.json"),"utf8"));
const WORKFLOW=fs.readFileSync(path.join(ROOT,".github/workflows/merge-safety-gate.yml"),"utf8");
const OWNERSHIP_QA=fs.readFileSync(path.join(ROOT,"tools/qa_runtime_ownership_safety_300.js"),"utf8");

assert.strictEqual(MANIFEST.schemaVersion,1,"#305 manifest schema");
assert.strictEqual(MANIFEST.workflowName,"Shinobi Chronicles Merge Safety Gate","#305 workflow name manifest drift");
assert.strictEqual(MANIFEST.requiredStatus,"merge-safety-gate","#305 stable status manifest drift");
assert.deepStrictEqual(MANIFEST.classes,CLASSES,"#305 classifier enum drift");
assert.strictEqual(MANIFEST.failClosedUnknownRuntime,true,"#305 must fail closed on uncertain runtime-affecting paths");
assert.strictEqual(MANIFEST.docsOnlyWaitsForPathFilteredRuntimeChecks,false,"#305 docs-only must not wait on path-filtered runtime workflows");
assert.strictEqual(MANIFEST.rulesetMutationAllowed,false,"#305 Coding must not mutate branch-protection rulesets");

assert(/^name:\s*Shinobi Chronicles Merge Safety Gate\s*$/m.test(WORKFLOW),"#305 workflow display name drift");
assert(/^\s{2}pull_request:\s*$/m.test(WORKFLOW),"#305 workflow must run on every pull_request");
assert(/^\s{2}merge_group:\s*$/m.test(WORKFLOW),"#305 workflow must support merge_group");
assert(!/pull_request:\s*\n\s+paths:/m.test(WORKFLOW),"#305 pull_request trigger must not have path filters");
assert(/^\s{2}merge-safety-gate:\s*$/m.test(WORKFLOW),"#305 stable job/status merge-safety-gate missing");
assert(WORKFLOW.includes("tools/merge_safety_gate_305.js"),"#305 workflow does not invoke changed-file classifier");
assert(WORKFLOW.includes("tools/qa_merge_safety_gate_305.js"),"#305 workflow does not run its manifest/config sanity");
assert(WORKFLOW.includes("tools/qa_runtime_ownership_safety_300.js"),"#305 runtime ownership safety missing");
assert(WORKFLOW.includes("tools/qa_kakashi_v2_legacy_exclusion.js"),"#305 legacy exclusion missing");
assert(WORKFLOW.includes("tools/qa_issue_141_pre_alpha_runtime_closure.py"),"#305 Alpha source/headless closure missing");
assert(WORKFLOW.includes("tools/qa_issue_188_story_decision_runtime.js"),"#305 Story decision QA missing");
assert(WORKFLOW.includes("tools/qa_alpha_origin_scenes_32900_runtime.js"),"#305 Origin runtime QA missing");
assert(WORKFLOW.includes("tools/qa_kakashi_v2_clean_room.js"),"#305 Kakashi clean-room QA missing");
assert(WORKFLOW.includes("tools/qa_kakashi_v2_route_matrix.js"),"#305 Kakashi route matrix missing");
assert(WORKFLOW.includes("tools/qa_kakashi_v2_browser.js"),"#305 Kakashi installed-browser/cardinality QA missing");
assert(WORKFLOW.includes("tools/qa_issue_141_arc1_battle_return_runtime.js"),"#305 Battle return QA missing");
assert(WORKFLOW.includes("tools/qa_issue_278_post_battle_agency.js"),"#305 Battle agency QA missing");
assert(WORKFLOW.includes("tools/qa_contract_integrity_311.js"),"#311 contract integrity not wired into merge gate");
assert(WORKFLOW.includes("tools/qa_save_compatibility_311.js"),"#311 save compatibility not wired into merge gate");
assert(WORKFLOW.includes("tools/qa_reference_integrity_311.js"),"#311 reference integrity not wired into merge gate");
assert(WORKFLOW.includes("tools/qa_story_reachability_311.js"),"#311 Story reachability not wired into merge gate");
assert(WORKFLOW.includes("tools/qa_browser_runtime_error_gate_311.js"),"#311 browser error policy not wired into merge gate");
assert(WORKFLOW.includes("tools/qa_release_candidate_evidence_311.js"),"#311 release evidence QA not wired into merge gate");

// Existing #300 negative fixtures are part of the merge-gate proof. The gate
// must consume the same canonical detector instead of creating a second owner.
for(const marker of [
  MANIFEST.negativeFixtures.duplicateRuntimeResponsibility,
  MANIFEST.negativeFixtures.retiredOwnerReintroduced,
  MANIFEST.negativeFixtures.duplicateVisibleStoryOwner
]){
  assert(OWNERSHIP_QA.includes(marker),`#305 canonical negative fixture missing: ${marker}`);
}

function has(result,name){return result.classes.includes(name);}
const docs=classifyFiles(["Documentation/Coordination/example.md"]);
assert.strictEqual(docs.docsOnly,true);
assert.deepStrictEqual(docs.classes,["DOCS_ONLY"]);
assert.strictEqual(docs.runtime,false);

const runtime=classifyFiles(["runtime/alpha-traversal-bridge-33200.js"]);
assert(has(runtime,"RUNTIME_CORE"));
assert.strictEqual(runtime.failClosed,false);

const story=classifyFiles(["runtime/alpha-story-decision-realisation-34000.js"]);
assert(has(story,"RUNTIME_CORE")&&has(story,"STORY_RUNTIME"));

const origin=classifyFiles(["runtime/alpha-origin-scenes-32900-core.js"]);
assert(has(origin,"RUNTIME_CORE")&&has(origin,"ORIGIN_RUNTIME"));

const kakashi=classifyFiles(["runtime/alpha-kakashi-v2-core-36020.js"]);
assert(has(kakashi,"RUNTIME_CORE")&&has(kakashi,"STORY_RUNTIME")&&has(kakashi,"ORIGIN_RUNTIME")&&has(kakashi,"KAKASHI_V2"));

const battle=classifyFiles(["runtime/alpha-battle-modern-33000.js"]);
assert(has(battle,"RUNTIME_CORE")&&has(battle,"BATTLE_RUNTIME"));

const save=classifyFiles(["game.js"]);
assert(has(save,"RUNTIME_CORE")&&has(save,"SAVE_SCHEMA"));

const workflow=classifyFiles([".github/workflows/merge-safety-gate.yml"]);
assert(has(workflow,"RUNTIME_CORE")&&has(workflow,"WORKFLOW_SAFETY"));

const mixed=classifyFiles(["Documentation/Coordination/example.md","runtime/alpha-battle-modern-33000.js"]);
assert.strictEqual(mixed.docsOnly,false);
assert(has(mixed,"RUNTIME_CORE")&&has(mixed,"BATTLE_RUNTIME"));

const uncertain=classifyFiles(["scripts/new-alpha-runtime-loader.mjs"]);
assert.strictEqual(uncertain.failClosed,true);
assert(has(uncertain,"RUNTIME_CORE"));

const empty=classifyFiles([]);
assert.strictEqual(empty.failClosed,true);
assert(has(empty,"RUNTIME_CORE")&&has(empty,"WORKFLOW_SAFETY"));

// Deliberate policy fixtures: these represent the expected top-level gate
// outcome classes used by the real PR proof sequence after merge.
const proofFixtures={
  docsOnlyGreen:classifyFiles(["Documentation/Coordination/merge-safety-docs-proof-305.md"]),
  ordinaryRuntimeGreen:classifyFiles(["runtime/alpha-runtime-build-fingerprint-303.js"]),
  badOwnershipMustEnterRuntimeGate:classifyFiles(["tools/fixtures/runtime_responsibility_registry_300.json"]),
  correctedRuntimeGreen:classifyFiles(["tools/qa_runtime_ownership_safety_300.js"])
};
assert(proofFixtures.docsOnlyGreen.docsOnly===true&&proofFixtures.docsOnlyGreen.runtime===false);
assert(proofFixtures.ordinaryRuntimeGreen.runtime===true);
assert(proofFixtures.badOwnershipMustEnterRuntimeGate.runtime===true&&proofFixtures.badOwnershipMustEnterRuntimeGate.workflowSafety===true);
assert(proofFixtures.correctedRuntimeGreen.runtime===true&&proofFixtures.correctedRuntimeGreen.workflowSafety===true);

console.log(JSON.stringify({
  pass:true,
  issue:305,
  workflowName:MANIFEST.workflowName,
  requiredStatus:MANIFEST.requiredStatus,
  classes:CLASSES,
  docsOnlyClassification:"GREEN",
  runtimeClassification:"GREEN",
  storyClassification:"GREEN",
  originClassification:"GREEN",
  kakashiClassification:"GREEN",
  battleClassification:"GREEN",
  saveSchemaClassification:"GREEN",
  workflowSafetyClassification:"GREEN",
  unknownRuntimeFailClosed:"GREEN",
  negativeFixtureWiring:{
    duplicateRuntimeResponsibility:"GREEN",
    retiredOwnerReintroduced:"GREEN",
    duplicateVisibleStoryOwner:"GREEN"
  },
  branchProtectionMutation:false,
  browserGoldenClaimed:false
},null,2));
