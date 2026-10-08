#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const FIXTURE_PATH = path.join(__dirname, "fixtures", "coordination_safety_601_adversarial.json");

const SEMANTIC_ALIASES = Object.freeze({
  changed_file_collision: ["changed_file_collision", "cross_cell_overlap", "accidental_overlap", "file_collision"],
  declared_same_cell_overlap: ["declared_same_cell_overlap", "same_cell_overlap", "same_work_cell_overlap", "declared_overlap"],
  reserved_seam_violation: ["reserved_seam_violation", "reservation_violation", "shared_seam_violation", "unauthorized_seam_edit"],
  reservation_ambiguous: ["reservation_ambiguous", "ambiguous_reservation", "multiple_reservation_owners", "multiple_active_owners"],
  reservation_stale: ["reservation_stale", "stale_reservation", "stale_owner", "closed_reservation_owner"],
  reservation_malformed: ["reservation_malformed", "malformed_reservation", "invalid_reservation_metadata", "reservation_invalid"]
});

function fail(message) {
  throw new Error(message);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadFixtures() {
  const raw = fs.readFileSync(FIXTURE_PATH, "utf8");
  return JSON.parse(raw);
}

function validateFixtureSet(fixtures) {
  if (!fixtures || fixtures.schemaVersion !== 1) fail("fixture schemaVersion must equal 1");
  if (!Array.isArray(fixtures.protectedSeams) || fixtures.protectedSeams.length < 5) fail("protectedSeams fixture set is incomplete");
  if (!Array.isArray(fixtures.requiredScenarioClasses) || !fixtures.requiredScenarioClasses.length) fail("requiredScenarioClasses missing");
  if (!Array.isArray(fixtures.scenarios) || !fixtures.scenarios.length) fail("scenarios missing");

  const ids = new Set();
  const classes = new Set();
  for (const scenario of fixtures.scenarios) {
    if (!scenario || typeof scenario.id !== "string" || !scenario.id.trim()) fail("scenario id missing");
    if (ids.has(scenario.id)) fail(`duplicate scenario id: ${scenario.id}`);
    ids.add(scenario.id);
    if (typeof scenario.class !== "string" || !scenario.class.trim()) fail(`scenario class missing: ${scenario.id}`);
    classes.add(scenario.class);
    if (!Number.isInteger(scenario.targetPr)) fail(`targetPr missing: ${scenario.id}`);
    if (!scenario.input || !Array.isArray(scenario.input.pullRequests) || !Array.isArray(scenario.input.reservations)) {
      fail(`scenario input malformed: ${scenario.id}`);
    }
    if (!scenario.expected || typeof scenario.expected.ok !== "boolean") fail(`scenario expected.ok missing: ${scenario.id}`);
    for (const code of scenario.expected.requiredCodes || []) {
      if (!SEMANTIC_ALIASES[code]) fail(`fixture uses unknown semantic code ${code} in ${scenario.id}`);
    }
  }
  for (const requiredClass of fixtures.requiredScenarioClasses) {
    if (!classes.has(requiredClass)) fail(`required scenario class missing: ${requiredClass}`);
  }

  const mustFailClosed = ["reserved_seam_violation", "reservation_ambiguous", "reservation_stale", "reservation_malformed"];
  for (const klass of mustFailClosed) {
    const rows = fixtures.scenarios.filter(row => row.class === klass);
    if (!rows.length || rows.some(row => row.expected.ok !== false)) fail(`${klass} must be represented as fail-closed`);
  }

  const sameCell = fixtures.scenarios.find(row => row.class === "same_cell_declared_overlap");
  if (!sameCell || sameCell.expected.ok !== true) fail("declared same-cell overlap must be distinguishable without being treated as an unauthorized collision");
  const crossCell = fixtures.scenarios.find(row => row.class === "cross_cell_overlap");
  if (!crossCell || crossCell.expected.ok !== true) fail("cross-cell changed-file collision is an advisory warning unless a reservation is violated");

  return { scenarioCount: fixtures.scenarios.length, classes: [...classes].sort() };
}

function collectFindings(result) {
  if (!result || typeof result !== "object") return [];
  const arrays = [];
  for (const key of ["findings", "issues", "warnings", "errors", "collisions", "violations"]) {
    if (Array.isArray(result[key])) arrays.push(...result[key]);
  }
  const seen = new Set();
  return arrays.filter(item => {
    const key = JSON.stringify(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function findingCode(finding) {
  if (typeof finding === "string") return finding.toLowerCase();
  if (!finding || typeof finding !== "object") return "";
  return String(finding.code || finding.kind || finding.type || finding.classification || finding.category || "").toLowerCase();
}

function semanticMatched(required, findings) {
  const aliases = SEMANTIC_ALIASES[required] || [required];
  return findings.some(finding => {
    const code = findingCode(finding);
    if (aliases.includes(code)) return true;
    const text = JSON.stringify(finding).toLowerCase();
    return aliases.some(alias => text.includes(alias));
  });
}

function resultOk(result) {
  if (!result || typeof result !== "object") return false;
  if (typeof result.ok === "boolean") return result.ok;
  if (typeof result.pass === "boolean") return result.pass;
  if (typeof result.blocked === "boolean") return !result.blocked;
  if (typeof result.allowed === "boolean") return result.allowed;
  const status = String(result.status || result.conclusion || "").toLowerCase();
  if (["blocked", "fail", "failed", "error", "invalid", "red"].includes(status)) return false;
  if (["ok", "pass", "passed", "success", "warning", "warn", "advisory", "green"].includes(status)) return true;
  return false;
}

function loadAnalyzer(candidatePath) {
  const resolved = path.resolve(candidatePath);
  if (!fs.existsSync(resolved)) fail(`candidate module not found: ${resolved}`);

  delete require.cache[resolved];
  const loaded = require(resolved);
  const candidates = [
    loaded,
    loaded && loaded.analyzeCoordinationSafety60100,
    loaded && loaded.analyzeCoordinationSafety,
    loaded && loaded.evaluateCoordinationSafety60100,
    loaded && loaded.evaluateCoordinationSafety,
    loaded && loaded.default,
    globalThis.analyzeCoordinationSafety60100,
    globalThis.analyzeCoordinationSafety,
    globalThis.SC_COORDINATION_SAFETY_60100 && globalThis.SC_COORDINATION_SAFETY_60100.analyze,
    globalThis.SC_COORDINATION_SAFETY_60100 && globalThis.SC_COORDINATION_SAFETY_60100.evaluate
  ];
  const analyzer = candidates.find(value => typeof value === "function");
  if (!analyzer) {
    fail("candidate exposes no callable coordination-safety analyzer; Lane J will adapt QA-only binding after Lane I publishes its exact callable surface");
  }
  return analyzer;
}

async function runCandidate(fixtures, candidatePath) {
  const analyzer = loadAnalyzer(candidatePath);
  const results = [];

  for (const scenario of fixtures.scenarios) {
    const input = clone({
      ...scenario.input,
      targetPr: scenario.targetPr,
      protectedSeams: fixtures.protectedSeams
    });
    const before = JSON.stringify(input);
    let actual;
    try {
      actual = await analyzer(input);
    } catch (error) {
      fail(`${scenario.id}: candidate threw instead of returning an actionable result: ${error && error.stack ? error.stack : error}`);
    }
    if (JSON.stringify(input) !== before) fail(`${scenario.id}: analyzer mutated supplied coordination evidence`);

    const findings = collectFindings(actual);
    const ok = resultOk(actual);
    if (ok !== scenario.expected.ok) {
      fail(`${scenario.id}: expected ok=${scenario.expected.ok}, got ok=${ok}; result=${JSON.stringify(actual)}`);
    }

    for (const required of scenario.expected.requiredCodes || []) {
      if (!semanticMatched(required, findings)) {
        fail(`${scenario.id}: missing required semantic finding ${required}; findings=${JSON.stringify(findings)}`);
      }
    }
    for (const forbidden of scenario.expected.forbiddenCodes || []) {
      if (semanticMatched(forbidden, findings)) {
        fail(`${scenario.id}: forbidden semantic finding ${forbidden}; findings=${JSON.stringify(findings)}`);
      }
    }
    for (const requiredPath of scenario.expected.requiredPaths || []) {
      const evidence = JSON.stringify(actual);
      if (!evidence.includes(requiredPath)) fail(`${scenario.id}: result lacks actionable path evidence for ${requiredPath}`);
    }

    if (scenario.class === "reserved_seam_violation") {
      const evidence = JSON.stringify(actual);
      if (!evidence.includes("602") && !evidence.includes("Lane E")) {
        fail(`${scenario.id}: unauthorized seam result must identify declared owner PR/lane evidence`);
      }
    }

    results.push({ id: scenario.id, ok, findings: findings.map(findingCode).filter(Boolean) });
  }

  return results;
}

(async function main() {
  const fixtures = loadFixtures();
  const fixtureSummary = validateFixtureSet(fixtures);
  const candidatePath = process.argv[2] && process.argv[2] !== "--self-test" ? process.argv[2] : null;

  if (!candidatePath) {
    console.log(JSON.stringify({
      issue: 601,
      lane: "J",
      pass: true,
      mode: "fixture-self-test",
      candidateTested: false,
      ...fixtureSummary,
      note: "No Lane-I candidate is claimed GREEN. Supply exact candidate module path as argv[2] for hostile execution."
    }, null, 2));
    return;
  }

  const results = await runCandidate(fixtures, candidatePath);
  console.log(JSON.stringify({
    issue: 601,
    lane: "J",
    pass: true,
    mode: "exact-candidate-adversarial",
    candidateTested: true,
    candidatePath: path.resolve(candidatePath),
    scenarios: results
  }, null, 2));
})().catch(error => {
  console.error(`FAIL #601 Lane-J adversarial coordination safety QA: ${error && error.stack ? error.stack : error}`);
  process.exitCode = 1;
});
