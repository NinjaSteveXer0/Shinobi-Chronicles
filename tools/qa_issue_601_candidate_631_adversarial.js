#!/usr/bin/env node
"use strict";

const assert = require("assert");
const path = require("path");

const candidatePath = process.argv[2];
if (!candidatePath) throw new Error("usage: node tools/qa_issue_601_candidate_631_adversarial.js <candidate-module>");
const guard = require(path.resolve(candidatePath));
assert.strictEqual(typeof guard.evaluateSnapshot, "function", "candidate must export evaluateSnapshot(snapshot, catalog)");

const SCHEMA = guard.RESERVATION_SCHEMA || "sc.workforce-reservation.601.v1";
const SEAM_SCHEMA = guard.SEAM_SCHEMA || "sc.workforce-protected-seams.601.v1";
const MARKER_START = guard.MARKER_START || "<!-- SC-WORKFORCE-RESERVATION-601";
const MARKER_END = guard.MARKER_END || "SC-WORKFORCE-RESERVATION-601 -->";

const catalog = {
  schema: SEAM_SCHEMA,
  seams: [
    { id: "root_game_runtime", description: "Root gameplay runtime seam", patterns: ["game.js"] },
    { id: "production_loader", description: "Production loader/order seam", patterns: ["index.html"] },
    { id: "runtime_fingerprint", description: "Runtime fingerprint source and committed manifest", patterns: ["runtime/alpha-runtime-build-fingerprint-303.js", "tools/fixtures/runtime_build_manifest_303.json"] },
    { id: "production_conformance_matrix", description: "#528 production change impact matrix", patterns: ["qa/production_change_impact_matrix_528.json"] }
  ]
};

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function reservationBlock(value) {
  return `${MARKER_START}\n${JSON.stringify(value, null, 2)}\n${MARKER_END}`;
}
function reservation(prNumber, workCell, lane, role = "integration_owner", extra = {}) {
  return reservationBlock({
    schema: SCHEMA,
    workCell,
    lane,
    role,
    issue: extra.issue || 601,
    integrationOwnerPr: role === "integration_owner" ? prNumber : extra.integrationOwnerPr,
    reservedPaths: extra.reservedPaths || [],
    sharedSeams: extra.sharedSeams || [],
    sameCellOverlapPaths: extra.sameCellOverlapPaths || []
  });
}
function pr(number, changedFiles, body, options = {}) {
  return {
    number,
    title: options.title || `[CODING][Lane ${options.lane || number}] adversarial fixture`,
    headRef: options.headRef || `coding/fixture-${number}`,
    state: options.state || "open",
    changedFiles,
    body: body || ""
  };
}
function run(targetPr, openPrs) {
  const snapshot = { targetPr, openPrs: clone(openPrs) };
  const before = JSON.stringify(snapshot);
  const result = guard.evaluateSnapshot(snapshot, clone(catalog));
  assert.strictEqual(JSON.stringify(snapshot), before, "candidate mutated supplied coordination evidence");
  return result;
}
function has(result, code) {
  return Array.isArray(result.findings) && result.findings.some(row => row && row.code === code);
}
function finding(result, code) {
  return Array.isArray(result.findings) ? result.findings.find(row => row && row.code === code) : null;
}

const failures = [];
const passes = [];
function hostile(name, fn) {
  try {
    fn();
    passes.push(name);
  } catch (error) {
    failures.push({ name, error: error && error.message ? error.message : String(error) });
  }
}

hostile("clean non-overlap does not false-positive", () => {
  const result = run(701, [
    pr(701, ["runtime/alpha-a.js"], reservation(701, "cell-alpha", "A")),
    pr(702, ["runtime/alpha-b.js"], reservation(702, "cell-beta", "B"))
  ]);
  assert.strictEqual(result.pass, true, JSON.stringify(result));
  assert.strictEqual(result.counts.block, 0);
});

hostile("documentation-only overlap is ignored", () => {
  const file = "Documentation/Coordination/note.md";
  const result = run(703, [
    pr(703, [file], reservation(703, "cell-alpha", "A")),
    pr(704, [file], reservation(704, "cell-beta", "B"))
  ]);
  assert.strictEqual(result.pass, true, JSON.stringify(result));
  assert(!has(result, "CROSS_CELL_PRODUCTION_COLLISION"), JSON.stringify(result));
});

hostile("declared same-cell overlap is distinguishable and allowed", () => {
  const file = "runtime/alpha-promotion-shared.js";
  const result = run(710, [
    pr(710, [file], reservation(710, "cell-603", "A", "integration_owner", { sameCellOverlapPaths: [file] })),
    pr(711, [file], reservation(711, "cell-603", "B", "builder", { integrationOwnerPr: 710, sameCellOverlapPaths: [file] }))
  ]);
  assert.strictEqual(result.pass, true, JSON.stringify(result));
  const row = finding(result, "DECLARED_SAME_CELL_OVERLAP");
  assert(row && row.severity === "INFO", JSON.stringify(result));
});

hostile("plain cross-cell changed-file collision is warning/advisory, not an Alpha blocker", () => {
  const file = "runtime/shared-result-adapter.js";
  const result = run(720, [
    pr(720, [file], reservation(720, "cell-544", "E")),
    pr(721, [file], reservation(721, "cell-585", "I"))
  ]);
  const row = finding(result, "CROSS_CELL_PRODUCTION_COLLISION");
  assert(row, JSON.stringify(result));
  assert.notStrictEqual(row.severity, "BLOCK", `changed-file warning was promoted to BLOCK: ${JSON.stringify(result)}`);
  assert.strictEqual(result.pass, true, `warning-only collision must remain advisory: ${JSON.stringify(result)}`);
});

hostile("other-owner protected seam is blocked with exact owner evidence", () => {
  const result = run(730, [
    pr(730, ["index.html"], reservation(730, "cell-585", "I")),
    pr(602, ["runtime/owner.js"], reservation(602, "cell-544", "E", "integration_owner", { sharedSeams: ["production_loader"] }))
  ]);
  assert.strictEqual(result.pass, false, JSON.stringify(result));
  const row = finding(result, "PROTECTED_SEAM_RESERVED_TO_OTHER");
  assert(row, JSON.stringify(result));
  assert.strictEqual(row.path, "index.html");
  assert.strictEqual(row.owner && row.owner.pr, 602, JSON.stringify(row));
});

hostile("declared protected-seam owner may edit its seam", () => {
  const result = run(602, [
    pr(602, ["index.html"], reservation(602, "cell-544", "E", "integration_owner", { sharedSeams: ["production_loader"] }))
  ]);
  assert.strictEqual(result.pass, true, JSON.stringify(result));
  assert.strictEqual(result.protectedSeamOwners.production_loader.state, "CLAIMED");
});

hostile("ambiguous protected-seam ownership fails closed", () => {
  const result = run(740, [
    pr(740, ["game.js"], reservation(740, "cell-target", "T")),
    pr(741, ["runtime/a.js"], reservation(741, "cell-a", "A", "integration_owner", { sharedSeams: ["root_game_runtime"] })),
    pr(742, ["runtime/b.js"], reservation(742, "cell-b", "B", "integration_owner", { sharedSeams: ["root_game_runtime"] }))
  ]);
  assert.strictEqual(result.pass, false, JSON.stringify(result));
  const row = finding(result, "PROTECTED_SEAM_AMBIGUOUS_OWNER");
  assert(row && row.path === "game.js", JSON.stringify(result));
  assert.strictEqual(row.owners.length, 2, JSON.stringify(row));
});

hostile("closed/stale integration-owner reference fails closed", () => {
  const targetBody = reservation(750, "cell-new", "N", "builder", { integrationOwnerPr: 560 });
  const closedOwnerBody = reservation(560, "cell-old", "A", "integration_owner", { sharedSeams: ["production_conformance_matrix"] });
  const result = run(750, [
    pr(750, ["qa/production_change_impact_matrix_528.json"], targetBody),
    pr(560, ["runtime/old.js"], closedOwnerBody, { state: "closed" })
  ]);
  assert.strictEqual(result.pass, false, JSON.stringify(result));
  assert(has(result, "MALFORMED_RESERVATION") || has(result, "STALE_OR_INVALID_INTEGRATION_OWNER"), JSON.stringify(result));
  assert(JSON.stringify(result).includes("not an open PR") || has(result, "STALE_OR_INVALID_INTEGRATION_OWNER"), JSON.stringify(result));
});

hostile("missing integration-owner field is malformed and blocks", () => {
  const malformed = reservationBlock({
    schema: SCHEMA,
    workCell: "cell-z",
    lane: "Z",
    role: "integration_owner",
    issue: 601,
    reservedPaths: [],
    sharedSeams: ["runtime_fingerprint"],
    sameCellOverlapPaths: []
  });
  const result = run(760, [pr(760, ["runtime/alpha-runtime-build-fingerprint-303.js"], malformed)]);
  assert.strictEqual(result.pass, false, JSON.stringify(result));
  assert(has(result, "MALFORMED_RESERVATION"), JSON.stringify(result));
});

hostile("reservation list fields with wrong JSON types fail closed", () => {
  const malformedTypes = reservationBlock({
    schema: SCHEMA,
    workCell: "cell-types",
    lane: "T",
    role: "integration_owner",
    issue: 601,
    integrationOwnerPr: 770,
    reservedPaths: "runtime/claimed.js",
    sharedSeams: "production_loader",
    sameCellOverlapPaths: "runtime/shared.js"
  });
  const result = run(770, [pr(770, ["runtime/innocent.js"], malformedTypes)]);
  assert.strictEqual(result.pass, false, `wrong-typed reservation arrays were silently accepted: ${JSON.stringify(result)}`);
  assert(has(result, "MALFORMED_RESERVATION"), JSON.stringify(result));
});

hostile("malformed foreign reservation cannot become a silent pass on its claimed path", () => {
  const target = reservation(780, "cell-target", "T");
  const malformedOwner = reservationBlock({
    schema: "sc.workforce-reservation.601.BROKEN",
    workCell: "cell-owner",
    lane: "O",
    role: "integration_owner",
    issue: 601,
    integrationOwnerPr: 781,
    reservedPaths: ["runtime/claimed-by-malformed-owner.js"],
    sharedSeams: [],
    sameCellOverlapPaths: []
  });
  const result = run(780, [
    pr(780, ["runtime/claimed-by-malformed-owner.js"], target),
    pr(781, ["runtime/unrelated-owner-file.js"], malformedOwner)
  ]);
  assert.strictEqual(result.pass, false, `malformed reservation affecting target path was downgraded to non-blocking warning: ${JSON.stringify(result)}`);
  assert(has(result, "MALFORMED_RESERVATION"), JSON.stringify(result));
});

hostile("reserved path is enforced even when owner PR does not currently change it", () => {
  const claimed = "runtime/reserved-but-not-in-owner-diff.js";
  const result = run(790, [
    pr(790, [claimed], reservation(790, "cell-target", "T")),
    pr(791, ["runtime/owner-current-change.js"], reservation(791, "cell-owner", "O", "integration_owner", { reservedPaths: [claimed] }))
  ]);
  assert.strictEqual(result.pass, false, JSON.stringify(result));
  const row = finding(result, "RESERVED_PATH_VIOLATION");
  assert(row && row.path === claimed && row.ownerPr === 791, JSON.stringify(result));
});

const report = {
  issue: 601,
  lane: "J",
  target: "PR #631",
  candidatePath: path.resolve(candidatePath),
  pass: failures.length === 0,
  passedChecks: passes,
  failures
};
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
