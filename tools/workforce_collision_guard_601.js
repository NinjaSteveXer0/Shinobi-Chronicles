#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const RESERVATION_SCHEMA = "sc.workforce-reservation.601.v1";
const SEAM_SCHEMA = "sc.workforce-protected-seams.601.v1";
const MARKER_START = "<!-- SC-WORKFORCE-RESERVATION-601";
const MARKER_END = "SC-WORKFORCE-RESERVATION-601 -->";

function norm(value) {
  return String(value || "").replace(/\\/g, "/").replace(/^\.\//, "").trim();
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) out[key] = true;
    else {
      out[key] = next;
      i += 1;
    }
  }
  return out;
}

function wildcardToRegExp(pattern) {
  const p = norm(pattern);
  if (!p) throw new Error("empty path pattern");
  let source = "^";
  for (let i = 0; i < p.length; i += 1) {
    const ch = p[i];
    if (ch === "*" && p[i + 1] === "*") {
      source += ".*";
      i += 1;
      continue;
    }
    if (ch === "*") {
      source += "[^/]*";
      continue;
    }
    source += /[\^$.*+?()[\]{}|]/.test(ch) ? "\\" + ch : ch;
  }
  return new RegExp(source + "$");
}

function matchesPattern(file, pattern) {
  return wildcardToRegExp(pattern).test(norm(file));
}

function isDocumentationOnly(file) {
  const p = norm(file);
  return /^Documentation\//.test(p) || /^README(?:\.md)?$/i.test(p) || /^CHANGELOG(?:\.md)?$/i.test(p);
}

function isCoordinationTooling(file) {
  const p = norm(file);
  return /^tools\//.test(p) || /^\.github\/workflows\//.test(p);
}

function isProductionPath(file) {
  const p = norm(file);
  if (!p || isDocumentationOnly(p) || isCoordinationTooling(p)) return false;
  return true;
}

function isCodingPr(pr) {
  const title = String(pr.title || "");
  const ref = String(pr.headRef || (pr.head && pr.head.ref) || "");
  return /\[(?:CODING|QA|RUNTIME|WORK-CELL)\]/i.test(title) || /^(?:coding|qa)\//i.test(ref);
}

function parseReservationBlock(body) {
  const text = String(body || "");
  const starts = [];
  let cursor = 0;
  while (true) {
    const idx = text.indexOf(MARKER_START, cursor);
    if (idx < 0) break;
    starts.push(idx);
    cursor = idx + MARKER_START.length;
  }
  if (starts.length === 0) return { present: false, value: null, errors: [] };
  if (starts.length > 1) return { present: true, value: null, errors: ["multiple reservation blocks"] };
  const start = starts[0] + MARKER_START.length;
  const end = text.indexOf(MARKER_END, start);
  if (end < 0) return { present: true, value: null, errors: ["reservation block missing closing marker"] };
  const raw = text.slice(start, end).trim();
  try {
    return { present: true, value: JSON.parse(raw), errors: [] };
  } catch (error) {
    return { present: true, value: null, errors: ["reservation JSON parse failed: " + error.message] };
  }
}

function validateReservation(raw, prNumber) {
  const errors = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { valid: false, errors: ["reservation must be an object"], value: null };
  const value = {
    schema: raw.schema,
    workCell: String(raw.workCell || "").trim(),
    lane: String(raw.lane || "").trim(),
    role: String(raw.role || "").trim(),
    issue: Number(raw.issue),
    integrationOwnerPr: raw.integrationOwnerPr == null ? null : Number(raw.integrationOwnerPr),
    reservedPaths: Array.isArray(raw.reservedPaths) ? raw.reservedPaths.map(norm).filter(Boolean) : [],
    sharedSeams: Array.isArray(raw.sharedSeams) ? raw.sharedSeams.map(String).map((x) => x.trim()).filter(Boolean) : [],
    sameCellOverlapPaths: Array.isArray(raw.sameCellOverlapPaths) ? raw.sameCellOverlapPaths.map(norm).filter(Boolean) : []
  };
  if (value.schema !== RESERVATION_SCHEMA) errors.push("schema must equal " + RESERVATION_SCHEMA);
  if (!value.workCell) errors.push("workCell is required");
  if (!value.lane) errors.push("lane is required");
  if (!value.role) errors.push("role is required");
  if (!Number.isInteger(value.issue) || value.issue <= 0) errors.push("issue must be a positive integer");
  if (value.integrationOwnerPr != null && (!Number.isInteger(value.integrationOwnerPr) || value.integrationOwnerPr <= 0)) errors.push("integrationOwnerPr must be a positive integer when present");
  if (value.role === "integration_owner") {
    if (value.integrationOwnerPr == null) errors.push("integration_owner must declare integrationOwnerPr");
    else if (value.integrationOwnerPr !== Number(prNumber)) errors.push("integration_owner integrationOwnerPr must equal its own PR number");
  }
  if (value.sharedSeams.length > 0 && value.role !== "integration_owner") errors.push("only integration_owner may claim sharedSeams");
  if (value.sharedSeams.length > 0 && value.integrationOwnerPr == null) errors.push("sharedSeams require integrationOwnerPr");
  for (const group of [value.reservedPaths, value.sameCellOverlapPaths]) {
    for (const pattern of group) {
      try { wildcardToRegExp(pattern); } catch (error) { errors.push("invalid path pattern " + pattern + ": " + error.message); }
    }
  }
  return { valid: errors.length === 0, errors, value };
}

function loadSeamCatalog(catalog) {
  if (!catalog || catalog.schema !== SEAM_SCHEMA || !Array.isArray(catalog.seams)) {
    throw new Error("protected seam catalog must use schema " + SEAM_SCHEMA + " with seams[]");
  }
  const seen = new Set();
  return catalog.seams.map((row, index) => {
    const id = String(row && row.id || "").trim();
    const patterns = Array.isArray(row && row.patterns) ? row.patterns.map(norm).filter(Boolean) : [];
    if (!id) throw new Error("protected seam row " + index + " missing id");
    if (seen.has(id)) throw new Error("duplicate protected seam id " + id);
    seen.add(id);
    if (patterns.length === 0) throw new Error("protected seam " + id + " must declare patterns");
    for (const pattern of patterns) wildcardToRegExp(pattern);
    return { id, description: String(row.description || ""), patterns };
  });
}

function normalizePr(raw) {
  const number = Number(raw.number);
  if (!Number.isInteger(number) || number <= 0) throw new Error("PR number must be a positive integer");
  return {
    number,
    title: String(raw.title || ""),
    body: String(raw.body || ""),
    state: String(raw.state || "open"),
    headRef: String(raw.headRef || (raw.head && raw.head.ref) || ""),
    headSha: String(raw.headSha || (raw.head && raw.head.sha) || ""),
    changedFiles: [...new Set((raw.changedFiles || []).map(norm).filter(Boolean))].sort()
  };
}

function preparePr(raw, openPrNumbers) {
  const pr = normalizePr(raw);
  const parsed = parseReservationBlock(pr.body);
  let reservation = null;
  let reservationErrors = parsed.errors.slice();
  if (parsed.present && parsed.value) {
    const checked = validateReservation(parsed.value, pr.number);
    reservation = checked.value;
    reservationErrors = reservationErrors.concat(checked.errors);
    if (reservation && reservation.integrationOwnerPr != null && !openPrNumbers.has(reservation.integrationOwnerPr)) {
      reservationErrors.push("integrationOwnerPr #" + reservation.integrationOwnerPr + " is not an open PR");
    }
  }
  return { ...pr, reservationPresent: parsed.present, reservation, reservationErrors, reservationValid: parsed.present && reservationErrors.length === 0 };
}

function reservationPatternHits(pr, file) {
  if (!pr.reservationValid) return [];
  return pr.reservation.reservedPaths.filter((pattern) => matchesPattern(file, pattern));
}

function sameCellOverlapDeclared(a, b, file) {
  if (!a.reservationValid || !b.reservationValid) return false;
  if (a.reservation.workCell !== b.reservation.workCell) return false;
  const inA = a.reservation.sameCellOverlapPaths.some((p) => matchesPattern(file, p));
  const inB = b.reservation.sameCellOverlapPaths.some((p) => matchesPattern(file, p));
  return inA || inB;
}

function finding(severity, code, data) {
  return { severity, code, ...data };
}

function evaluateSnapshot(snapshot, catalog) {
  const targetPrNumber = Number(snapshot.targetPr);
  if (!Number.isInteger(targetPrNumber) || targetPrNumber <= 0) throw new Error("snapshot.targetPr must be a positive integer");
  if (!Array.isArray(snapshot.openPrs)) throw new Error("snapshot.openPrs must be an array");

  const basePrs = snapshot.openPrs.map(normalizePr).filter((pr) => pr.state === "open");
  const openPrNumbers = new Set(basePrs.map((pr) => pr.number));
  const prs = basePrs.map((pr) => preparePr(pr, openPrNumbers));
  const target = prs.find((pr) => pr.number === targetPrNumber);
  if (!target) throw new Error("target PR #" + targetPrNumber + " is not present in openPrs");
  const codingPrs = prs.filter((pr) => isCodingPr(pr) || pr.number === targetPrNumber);
  const seams = loadSeamCatalog(catalog);
  const findings = [];

  for (const pr of codingPrs) {
    if (pr.reservationPresent && !pr.reservationValid) {
      findings.push(finding(pr.number === target.number ? "BLOCK" : "WARN", "MALFORMED_RESERVATION", {
        pr: pr.number,
        errors: pr.reservationErrors
      }));
    }
  }

  const ownerBySeam = {};
  for (const seam of seams) {
    const claimers = codingPrs.filter((pr) => pr.reservationValid && pr.reservation.sharedSeams.includes(seam.id));
    if (claimers.length === 0) ownerBySeam[seam.id] = { state: "UNCLAIMED", owners: [] };
    else if (claimers.length === 1) ownerBySeam[seam.id] = { state: "CLAIMED", owners: [{ pr: claimers[0].number, lane: claimers[0].reservation.lane, workCell: claimers[0].reservation.workCell }] };
    else ownerBySeam[seam.id] = { state: "AMBIGUOUS", owners: claimers.map((pr) => ({ pr: pr.number, lane: pr.reservation.lane, workCell: pr.reservation.workCell })) };
  }

  for (const file of target.changedFiles) {
    for (const seam of seams) {
      if (!seam.patterns.some((pattern) => matchesPattern(file, pattern))) continue;
      const owner = ownerBySeam[seam.id];
      if (owner.state === "UNCLAIMED") {
        findings.push(finding("BLOCK", "PROTECTED_SEAM_UNCLAIMED", { path: file, seam: seam.id, targetPr: target.number }));
      } else if (owner.state === "AMBIGUOUS") {
        findings.push(finding("BLOCK", "PROTECTED_SEAM_AMBIGUOUS_OWNER", { path: file, seam: seam.id, targetPr: target.number, owners: owner.owners }));
      } else if (owner.owners[0].pr !== target.number) {
        findings.push(finding("BLOCK", "PROTECTED_SEAM_RESERVED_TO_OTHER", { path: file, seam: seam.id, targetPr: target.number, owner: owner.owners[0] }));
      }
    }
  }

  for (const other of codingPrs) {
    if (other.number === target.number) continue;
    const overlap = target.changedFiles.filter((file) => isProductionPath(file) && other.changedFiles.includes(file));
    for (const file of overlap) {
      if (!target.reservationValid || !other.reservationValid) {
        findings.push(finding("BLOCK", "UNCLASSIFIED_PRODUCTION_COLLISION", {
          path: file,
          targetPr: target.number,
          otherPr: other.number,
          targetReservationValid: target.reservationValid,
          otherReservationValid: other.reservationValid
        }));
      } else if (target.reservation.workCell === other.reservation.workCell) {
        findings.push(finding(sameCellOverlapDeclared(target, other, file) ? "INFO" : "WARN",
          sameCellOverlapDeclared(target, other, file) ? "DECLARED_SAME_CELL_OVERLAP" : "UNDECLARED_SAME_CELL_OVERLAP", {
            path: file,
            targetPr: target.number,
            otherPr: other.number,
            workCell: target.reservation.workCell
          }));
      } else {
        findings.push(finding("BLOCK", "CROSS_CELL_PRODUCTION_COLLISION", {
          path: file,
          targetPr: target.number,
          otherPr: other.number,
          targetWorkCell: target.reservation.workCell,
          otherWorkCell: other.reservation.workCell
        }));
      }
    }

    for (const file of target.changedFiles) {
      const hits = reservationPatternHits(other, file);
      if (hits.length === 0) continue;
      if (!target.reservationValid) {
        findings.push(finding("BLOCK", "RESERVED_PATH_TARGET_UNDECLARED", { path: file, targetPr: target.number, ownerPr: other.number, ownerPatterns: hits }));
        continue;
      }
      if (target.reservation.workCell === other.reservation.workCell) {
        findings.push(finding(sameCellOverlapDeclared(target, other, file) ? "INFO" : "WARN",
          sameCellOverlapDeclared(target, other, file) ? "DECLARED_SAME_CELL_RESERVED_PATH_OVERLAP" : "SAME_CELL_RESERVED_PATH_OVERLAP", {
            path: file,
            targetPr: target.number,
            ownerPr: other.number,
            workCell: target.reservation.workCell,
            ownerPatterns: hits
          }));
      } else {
        findings.push(finding("BLOCK", "RESERVED_PATH_VIOLATION", {
          path: file,
          targetPr: target.number,
          ownerPr: other.number,
          ownerLane: other.reservation.lane,
          ownerWorkCell: other.reservation.workCell,
          ownerPatterns: hits
        }));
      }
    }
  }

  if (target.reservationValid && target.reservation.integrationOwnerPr != null && target.reservation.integrationOwnerPr !== target.number) {
    const ownerPr = codingPrs.find((pr) => pr.number === target.reservation.integrationOwnerPr);
    if (!ownerPr || !ownerPr.reservationValid || ownerPr.reservation.workCell !== target.reservation.workCell || ownerPr.reservation.role !== "integration_owner") {
      findings.push(finding("BLOCK", "STALE_OR_INVALID_INTEGRATION_OWNER", {
        targetPr: target.number,
        integrationOwnerPr: target.reservation.integrationOwnerPr,
        workCell: target.reservation.workCell
      }));
    }
  }

  const blocking = findings.filter((row) => row.severity === "BLOCK");
  const warnings = findings.filter((row) => row.severity === "WARN");
  return {
    pass: blocking.length === 0,
    issue: 601,
    slice: "S0.5-collision-reservation",
    targetPr: target.number,
    targetChangedFiles: target.changedFiles,
    targetProductionFiles: target.changedFiles.filter(isProductionPath),
    openCodingPrCount: codingPrs.length,
    protectedSeamOwners: ownerBySeam,
    counts: {
      block: blocking.length,
      warn: warnings.length,
      info: findings.filter((row) => row.severity === "INFO").length
    },
    findings
  };
}

async function githubJson(url, token) {
  const headers = { "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "sc-workforce-collision-601" };
  if (token) headers.Authorization = "Bearer " + token;
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error("GitHub API " + response.status + " for " + url + ": " + await response.text());
  return response.json();
}

async function fetchPaged(url, token) {
  const rows = [];
  for (let page = 1; page <= 20; page += 1) {
    const joiner = url.includes("?") ? "&" : "?";
    const batch = await githubJson(url + joiner + "per_page=100&page=" + page, token);
    if (!Array.isArray(batch)) throw new Error("expected array from " + url);
    rows.push(...batch);
    if (batch.length < 100) break;
  }
  return rows;
}

async function buildLiveSnapshot(repo, targetPr, token) {
  if (!/^[^/]+\/[^/]+$/.test(repo || "")) throw new Error("--repo owner/name is required for live mode");
  const base = "https://api.github.com/repos/" + repo;
  const pulls = await fetchPaged(base + "/pulls?state=open", token);
  const openPrs = [];
  for (const pr of pulls) {
    const headRef = pr.head && pr.head.ref || "";
    const candidate = { number: pr.number, title: pr.title, body: pr.body || "", state: pr.state, headRef, headSha: pr.head && pr.head.sha || "" };
    if (!isCodingPr(candidate) && Number(pr.number) !== Number(targetPr)) continue;
    const files = await fetchPaged(base + "/pulls/" + pr.number + "/files?", token);
    candidate.changedFiles = files.map((row) => row.filename);
    openPrs.push(candidate);
  }
  return { targetPr: Number(targetPr), openPrs };
}

function writeReport(file, result) {
  if (!file) return;
  fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(result, null, 2) + "\n");
}

function writeGithubOutput(file, result) {
  if (!file) return;
  const rows = {
    pass: String(result.pass),
    block_count: String(result.counts.block),
    warn_count: String(result.counts.warn),
    info_count: String(result.counts.info)
  };
  fs.appendFileSync(file, Object.entries(rows).map(([key, value]) => key + "=" + value).join("\n") + "\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const catalogPath = args.catalog || "tools/fixtures/workforce_protected_seams_601.json";
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  let snapshot;
  if (args.snapshot) snapshot = JSON.parse(fs.readFileSync(args.snapshot, "utf8"));
  else if (args.live) snapshot = await buildLiveSnapshot(args.repo || process.env.GITHUB_REPOSITORY, args["target-pr"] || process.env.PR_NUMBER, process.env.GITHUB_TOKEN || "");
  else throw new Error("use --snapshot <file> or --live --target-pr <number>");
  const result = evaluateSnapshot(snapshot, catalog);
  writeReport(args["json-out"], result);
  writeGithubOutput(args["github-output"] || process.env.GITHUB_OUTPUT, result);
  process.stdout.write(JSON.stringify(result, null, 2) + "\n");
  if (!result.pass && !args["report-only"]) process.exitCode = 1;
}

if (require.main === module) {
  main().catch((error) => {
    console.error("[workforce-collision-601] " + error.stack);
    process.exit(2);
  });
}

module.exports = {
  RESERVATION_SCHEMA,
  SEAM_SCHEMA,
  MARKER_START,
  MARKER_END,
  norm,
  matchesPattern,
  isProductionPath,
  isCodingPr,
  parseReservationBlock,
  validateReservation,
  loadSeamCatalog,
  evaluateSnapshot
};
