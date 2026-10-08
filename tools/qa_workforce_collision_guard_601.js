#!/usr/bin/env node
"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const guard = require("./workforce_collision_guard_601.js");

const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, "fixtures/workforce_protected_seams_601.json"), "utf8"));

function block(body) {
  return guard.MARKER_START + "\n" + JSON.stringify(body, null, 2) + "\n" + guard.MARKER_END;
}

function reservation(pr, workCell, lane, role, extra = {}) {
  return block({
    schema: guard.RESERVATION_SCHEMA,
    workCell,
    lane,
    role,
    issue: Number(workCell.replace(/\D/g, "")) || 601,
    integrationOwnerPr: role === "integration_owner" ? pr : extra.integrationOwnerPr,
    reservedPaths: extra.reservedPaths || [],
    sharedSeams: extra.sharedSeams || [],
    sameCellOverlapPaths: extra.sameCellOverlapPaths || []
  });
}

function pr(number, title, headRef, changedFiles, body = "") {
  return { number, title, headRef, changedFiles, body, state: "open" };
}

function run(targetPr, openPrs) {
  return guard.evaluateSnapshot({ targetPr, openPrs }, catalog);
}

const clean = run(100, [
  pr(100, "[CODING] A", "coding/a", ["runtime/a.js"], reservation(100, "#100", "A", "integration_owner", { reservedPaths: ["runtime/a.js"] })),
  pr(101, "[CODING] B", "coding/b", ["runtime/b.js"], reservation(101, "#101", "B", "integration_owner", { reservedPaths: ["runtime/b.js"] }))
]);
assert.strictEqual(clean.pass, true, JSON.stringify(clean));
assert.strictEqual(clean.counts.block, 0);

const crossCell = run(110, [
  pr(110, "[CODING] A", "coding/a", ["runtime/shared.js"], reservation(110, "#110", "A", "integration_owner")),
  pr(111, "[CODING] B", "coding/b", ["runtime/shared.js"], reservation(111, "#111", "B", "integration_owner"))
]);
assert.strictEqual(crossCell.pass, false);
assert(crossCell.findings.some((x) => x.code === "CROSS_CELL_PRODUCTION_COLLISION" && x.path === "runtime/shared.js"));

const sameCellDeclared = run(120, [
  pr(120, "[CODING] Integrator", "coding/cell-integrator", ["runtime/shared.js"], reservation(120, "#120", "I", "integration_owner", { sameCellOverlapPaths: ["runtime/shared.js"] })),
  pr(121, "[CODING] Builder", "coding/cell-builder", ["runtime/shared.js"], reservation(121, "#120", "J", "builder", { integrationOwnerPr: 120, sameCellOverlapPaths: ["runtime/shared.js"] }))
]);
assert.strictEqual(sameCellDeclared.pass, true, JSON.stringify(sameCellDeclared));
assert(sameCellDeclared.findings.some((x) => x.code === "DECLARED_SAME_CELL_OVERLAP" && x.severity === "INFO"));

const sameCellUndeclared = run(130, [
  pr(130, "[CODING] Integrator", "coding/cell-integrator", ["runtime/shared.js"], reservation(130, "#130", "I", "integration_owner")),
  pr(131, "[CODING] Builder", "coding/cell-builder", ["runtime/shared.js"], reservation(131, "#130", "J", "builder", { integrationOwnerPr: 130 }))
]);
assert.strictEqual(sameCellUndeclared.pass, true, JSON.stringify(sameCellUndeclared));
assert(sameCellUndeclared.findings.some((x) => x.code === "UNDECLARED_SAME_CELL_OVERLAP" && x.severity === "WARN"));

const seamOther = run(140, [
  pr(140, "[CODING] Target", "coding/target", ["index.html"], reservation(140, "#140", "I", "integration_owner")),
  pr(141, "[CODING] Owner", "coding/owner", ["runtime/owner.js"], reservation(141, "#141", "A", "integration_owner", { sharedSeams: ["production_loader"] }))
]);
assert.strictEqual(seamOther.pass, false);
assert(seamOther.findings.some((x) => x.code === "PROTECTED_SEAM_RESERVED_TO_OTHER" && x.seam === "production_loader"));

const seamOwned = run(150, [
  pr(150, "[CODING] Owner", "coding/owner", ["index.html"], reservation(150, "#150", "A", "integration_owner", { sharedSeams: ["production_loader"] }))
]);
assert.strictEqual(seamOwned.pass, true, JSON.stringify(seamOwned));
assert.strictEqual(seamOwned.protectedSeamOwners.production_loader.state, "CLAIMED");

const seamAmbiguous = run(160, [
  pr(160, "[CODING] Owner 1", "coding/owner1", ["index.html"], reservation(160, "#160", "A", "integration_owner", { sharedSeams: ["production_loader"] })),
  pr(161, "[CODING] Owner 2", "coding/owner2", ["runtime/other.js"], reservation(161, "#161", "B", "integration_owner", { sharedSeams: ["production_loader"] }))
]);
assert.strictEqual(seamAmbiguous.pass, false);
assert(seamAmbiguous.findings.some((x) => x.code === "PROTECTED_SEAM_AMBIGUOUS_OWNER"));

const malformedCollision = run(170, [
  pr(170, "[CODING] Target", "coding/target", ["runtime/shared.js"], reservation(170, "#170", "A", "integration_owner")),
  pr(171, "[CODING] Bad", "coding/bad", ["runtime/shared.js"], guard.MARKER_START + "\n{bad json}\n" + guard.MARKER_END)
]);
assert.strictEqual(malformedCollision.pass, false);
assert(malformedCollision.findings.some((x) => x.code === "UNCLASSIFIED_PRODUCTION_COLLISION"));

const staleOwner = run(180, [
  pr(180, "[CODING] Builder", "coding/builder", ["runtime/a.js"], reservation(180, "#180", "J", "builder", { integrationOwnerPr: 999, reservedPaths: ["runtime/a.js"] }))
]);
assert.strictEqual(staleOwner.pass, false);
assert(staleOwner.findings.some((x) => x.code === "MALFORMED_RESERVATION" || x.code === "STALE_OR_INVALID_INTEGRATION_OWNER"));

const toolingOnly = run(190, [
  pr(190, "[CODING] Tooling", "coding/601-tooling", ["tools/workforce_collision_guard_601.js", ".github/workflows/issue-601-workforce-collision.yml"], ""),
  pr(191, "[CODING] Existing", "coding/existing", ["runtime/a.js"], "")
]);
assert.strictEqual(toolingOnly.pass, true, JSON.stringify(toolingOnly));
assert.strictEqual(toolingOnly.targetProductionFiles.length, 0);

console.log(JSON.stringify({
  pass: true,
  issue: 601,
  slice: "S0.5-collision-reservation",
  cases: {
    cleanNoFalsePositive: true,
    crossCellCollisionBlocked: true,
    declaredSameCellOverlapDistinguished: true,
    undeclaredSameCellOverlapWarned: true,
    protectedSeamOtherOwnerBlocked: true,
    protectedSeamExactOwnerAllowed: true,
    ambiguousProtectedSeamOwnerBlocked: true,
    malformedCollisionFailsClosed: true,
    staleIntegrationOwnerFailsClosed: true,
    toolingOnlyCandidateDoesNotSelfBlock: true
  },
  productionRuntimeTouched: false,
  browserGoldenClaimed: false
}, null, 2));
