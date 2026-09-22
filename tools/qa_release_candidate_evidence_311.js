#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const cp=require("child_process");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const CONTRACT=JSON.parse(fs.readFileSync(path.join(ROOT,"tools/fixtures/release_candidate_evidence_contract_311.json"),"utf8"));
const out=cp.execFileSync("node",["tools/generate_release_candidate_evidence_311.js"],{
  cwd:ROOT,
  encoding:"utf8",
  env:{
    ...process.env,
    SC_SAVE_COMPATIBILITY_RESULT:"GREEN",
    SC_BROWSER_ERROR_RESULT:"GREEN",
    SC_LOCAL_SYNC_REQUIREMENT:"NOT_REQUIRED",
    SC_EVIDENCE_PURPOSE:"issue_311_qa"
  }
});
const manifest=JSON.parse(out);
for(const field of CONTRACT.requiredFields){
  assert(Object.prototype.hasOwnProperty.call(manifest,field),"#311 release evidence missing field "+field);
}
assert(/^[0-9a-f]{40}$/.test(manifest.candidateHead),"#311 candidateHead invalid");
assert.strictEqual(manifest.expectedLocalHead,manifest.candidateHead,"#311 expected local head must match candidate");
assert.strictEqual(manifest.runtimeFingerprint,"SC-ALPHA-RUNTIME-R303-2026-09-22-C","#311 runtime fingerprint drift");
assert.strictEqual(manifest.saveCompatibilityResult,"GREEN");
assert.strictEqual(manifest.browserErrorResult,"GREEN");
assert.strictEqual(manifest.localSyncRequirement,"NOT_REQUIRED");
assert(Array.isArray(manifest.requiredQASuite)&&manifest.requiredQASuite.includes("contract-integrity-311"));
assert(Array.isArray(manifest.knownBlockingIssues)&&Array.isArray(manifest.knownNonBlockingIssues));
assert.strictEqual(manifest.browserGoldenClaimed,false);
console.log(JSON.stringify({pass:true,issue:311,manifest},null,2));
