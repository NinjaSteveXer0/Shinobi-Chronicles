#!/usr/bin/env python3
# TEMP #597 bootstrap trigger; delete after guarded integration commit.
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / "game.js"
QA111 = ROOT / "tools/qa_issue_111_menma_tutorial.py"
QA63 = ROOT / "tools/qa_issue_63_genin_v2_roster.py"
MATRIX = ROOT / "qa/production_change_impact_matrix_528.json"
FINGERPRINT = ROOT / "runtime/alpha-runtime-build-fingerprint-303.js"
MANIFEST = ROOT / "tools/fixtures/runtime_build_manifest_303.json"

OLD_BUILD = "SC-ALPHA-RUNTIME-R303-2026-10-06-EI"
NEW_BUILD = "SC-ALPHA-RUNTIME-R303-2026-10-07-EJ"
OLD_BASELINE = "1c45661d60dad8bc456e1de4483dbb4a90182f32"
NEW_BASELINE = "eee7a36872536aa769b45251d50e376cf14f8185"
OLD_GENERATION = "unobstructed-village-region-map-canvases-557"
NEW_GENERATION = "academy-origin-registry-recalibration-597"
FEATURE = "academy-origin-base-stat-recalibration-582-597"
WORKFLOW_PATH = ".github/workflows/issue-597-academy-origin-registry.yml"


def git_blob_sha(text: str) -> str:
    raw = text.encode("utf-8")
    return hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest()


def strip_declared_469_save_reader(text: str) -> str:
    start_marker = "      // ISSUE #469 / #34000 — preserve the canonical neutral Story decision"
    end_marker = "      // ISSUE #322 / #23 — preserve shared Story intent/factual receipts and"
    start = text.find(start_marker)
    end = text.find(end_marker, start if start >= 0 else 0)
    if start < 0 or end <= start:
        raise SystemExit("#469 normalization markers missing")
    return text[:start] + text[end:]


game = GAME.read_text(encoding="utf-8")
for token in [
    '"academy_origin_base_stats_582_v1"',
    '"academy_hinata": {',
    '"academy_mirai": {',
    '"academy_menma": {',
    'migrateAcademyOriginBaseSave582(parsedData);',
]:
    if token not in game:
        raise SystemExit(f"required #597 production token missing: {token}")

normalized_hash = git_blob_sha(strip_declared_469_save_reader(game))
if not re.fullmatch(r"[0-9a-f]{40}", normalized_hash):
    raise SystemExit("normalized game hash invalid")

qa111 = QA111.read_text(encoding="utf-8")
qa111, n111 = re.subn(
    r"EXPECTED_BLOB='[0-9a-f]{40}'",
    f"EXPECTED_BLOB='{normalized_hash}'",
    qa111,
    count=1,
)
if n111 != 1:
    raise SystemExit("#111 exact audit pin not found once")
QA111.write_text(qa111, encoding="utf-8")

qa63 = QA63.read_text(encoding="utf-8")
qa63, n63 = re.subn(
    r"game_without_declared_469_save_reader\(game\)\)==\'[0-9a-f]{40}\'",
    f"game_without_declared_469_save_reader(game))=='{normalized_hash}'",
    qa63,
    count=1,
)
if n63 != 1:
    raise SystemExit("#63 exact audit pin not found once")
QA63.write_text(qa63, encoding="utf-8")

matrix = json.loads(MATRIX.read_text(encoding="utf-8"))
shared = next((row for row in matrix.get("rules", []) if row.get("id") == "shared_game_runtime"), None)
if shared is None:
    raise SystemExit("#528 shared_game_runtime rule missing")
changed_any = shared.setdefault("changed_any", [])
if WORKFLOW_PATH not in changed_any:
    changed_any.append(WORKFLOW_PATH)
MATRIX.write_text(json.dumps(matrix, indent=2) + "\n", encoding="utf-8")

fingerprint = FINGERPRINT.read_text(encoding="utf-8")
for old, new, label in [
    (OLD_BUILD, NEW_BUILD, "build id"),
    (OLD_BASELINE, NEW_BASELINE, "baseline"),
    (OLD_GENERATION, NEW_GENERATION, "generation"),
]:
    if old not in fingerprint:
        raise SystemExit(f"expected old fingerprint {label} missing")
    fingerprint = fingerprint.replace(old, new)
anchor = '      "phase2-unobstructed-village-region-map-canvases-557"\n'
if FEATURE not in fingerprint:
    if anchor not in fingerprint:
        raise SystemExit("#557 feature anchor missing")
    fingerprint = fingerprint.replace(anchor, anchor.rstrip("\n") + ',\n      "' + FEATURE + '"\n', 1)
diag_anchor = '      unobstructedMapCanvas557Present:first.majorRuntimeFeatures.includes("phase2-unobstructed-village-region-map-canvases-557"),\n'
if "academyOriginRegistry597Present" not in fingerprint:
    if diag_anchor not in fingerprint:
        raise SystemExit("fingerprint diagnostic anchor missing")
    fingerprint = fingerprint.replace(
        diag_anchor,
        diag_anchor + '      academyOriginRegistry597Present:first.majorRuntimeFeatures.includes("' + FEATURE + '"),\n',
        1,
    )
FINGERPRINT.write_text(fingerprint, encoding="utf-8")

manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
if manifest.get("buildId") != OLD_BUILD:
    raise SystemExit("manifest old build id mismatch")
if manifest.get("sourceBaselineCommit") != OLD_BASELINE:
    raise SystemExit("manifest old baseline mismatch")
if manifest.get("runtimeGeneration") != OLD_GENERATION:
    raise SystemExit("manifest old generation mismatch")
manifest["buildId"] = NEW_BUILD
manifest["sourceBaselineCommit"] = NEW_BASELINE
manifest["runtimeGeneration"] = NEW_GENERATION
features = manifest.setdefault("majorRuntimeFeatures", [])
if FEATURE not in features:
    features.append(FEATURE)
MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

print(json.dumps({
    "normalizedGameAuditHash": normalized_hash,
    "buildId": NEW_BUILD,
    "sourceBaselineCommit": NEW_BASELINE,
    "runtimeGeneration": NEW_GENERATION,
    "feature": FEATURE,
    "matrixClassifiedPath": WORKFLOW_PATH,
}, indent=2))
