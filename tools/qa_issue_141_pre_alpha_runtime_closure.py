#!/usr/bin/env python3
"""Issue #141 — Pre-Alpha Runtime Closure gate.

This is a Coding-owned integration gate, not gameplay authority. It composes the
existing subsystem QA/harnesses and adds cross-module assertions for the live
Alpha production load chain. It deliberately does not claim installed-browser
or Golden evidence.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
GAME = ROOT / "game.js"

EXPECTED_RUNTIME_ORDER = [
    "game.js",
    "runtime/alpha-menma-tutorial-111.js",
    "runtime/alpha-world-konoha-112-core.js",
    "runtime/alpha-world-konoha-112-fix.js",
    "runtime/alpha-browser-playability-32500.js",
    "runtime/alpha-battle-browser-32600.js",
    "runtime/alpha-browser-polish-32700.js",
    "runtime/alpha-genin-roster-63.js",
    "runtime/alpha-journey-surface-32800.js",
    "runtime/alpha-origin-scenes-32900-core.js",
    "runtime/alpha-origin-scenes-32900-a.js",
    "runtime/alpha-origin-scenes-32900-b.js",
    "runtime/alpha-origin-scenes-32900-c.js",
    "runtime/alpha-origin-scenes-32900-integrator.js",
    "runtime/alpha-battle-modern-33000.js",
    "runtime/alpha-alpha-sprint-33100.js",
    "runtime/alpha-traversal-bridge-33200.js",
    "runtime/alpha-anbu-root-contained-155.js",
    "runtime/alpha-anbu-root-contained-155-knowledge-fix.js",
]

PYTHON_GATES = [
    "tools/qa_issue_111_menma_tutorial.py",
    "tools/qa_issue_112_konoha_world.py",
    "tools/qa_alpha_browser_playability_32500.py",
    "tools/qa_alpha_battle_browser_32600.py",
    "tools/qa_alpha_browser_polish_32700.py",
    "tools/qa_issue_63_genin_v2_roster.py",
    "tools/qa_alpha_journey_origin_32800_32900.py",
    "tools/qa_alpha_traversal_bridge_33200.py",
    "tools/qa_issue_155_anbu_root_contained.py",
    "tools/qa_genin_expansion_assets.py",
    "tools/qa_battle_portraits.py",
]

NODE_GATES = [
    "tools/qa_issue_112_story_locator_runtime.js",
    "tools/qa_issue_63_genin_v2_runtime.js",
    "tools/qa_alpha_origin_scenes_32900_runtime.js",
    "tools/qa_issue_155_anbu_root_runtime.js",
]


def read(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


def require(checks: dict[str, bool], name: str, value: bool) -> None:
    checks[name] = bool(value)


def contains_all(source: str, *needles: str) -> bool:
    return all(needle in source for needle in needles)


def execute(label: str, argv: list[str]) -> dict[str, object]:
    proc = subprocess.run(
        argv,
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=False,
    )
    output = proc.stdout.strip()
    if output:
        print(f"\n--- {label} ---\n{output}")
    return {"label": label, "returncode": proc.returncode, "pass": proc.returncode == 0}


def main() -> int:
    checks: dict[str, bool] = {}
    index = INDEX.read_text(encoding="utf-8")
    game = GAME.read_text(encoding="utf-8")
    scripts = re.findall(r'<script\s+src=["\']([^"\']+)["\']', index)

    # Production loader integrity.
    require(checks, "exact_production_script_order", scripts == EXPECTED_RUNTIME_ORDER)
    require(checks, "no_duplicate_production_scripts", len(scripts) == len(set(scripts)))
    require(checks, "all_production_scripts_exist", all((ROOT / path).is_file() for path in scripts))
    require(checks, "legacy_112_dynamic_bootstrap_not_loaded", "runtime/alpha-world-konoha-112.js" not in scripts)
    require(
        checks,
        "112_fix_before_browser_consumer",
        scripts.index("runtime/alpha-world-konoha-112-fix.js") < scripts.index("runtime/alpha-browser-playability-32500.js"),
    )
    require(
        checks,
        "63_before_journey_and_traversal",
        scripts.index("runtime/alpha-genin-roster-63.js") < scripts.index("runtime/alpha-journey-surface-32800.js")
        < scripts.index("runtime/alpha-traversal-bridge-33200.js"),
    )
    require(
        checks,
        "origin_packages_before_integrator",
        max(scripts.index(f"runtime/alpha-origin-scenes-32900-{part}.js") for part in ("a", "b", "c"))
        < scripts.index("runtime/alpha-origin-scenes-32900-integrator.js"),
    )
    require(
        checks,
        "155_knowledge_fix_after_base",
        scripts.index("runtime/alpha-anbu-root-contained-155.js")
        < scripts.index("runtime/alpha-anbu-root-contained-155-knowledge-fix.js"),
    )

    # Syntax-check the exact production JavaScript chain. game.js is included.
    syntax_results = []
    for script in scripts:
        result = execute(f"node --check {script}", ["node", "--check", str(ROOT / script)])
        syntax_results.append(result)
    require(checks, "production_chain_syntax_green", all(row["pass"] for row in syntax_results))

    roster = read("runtime/alpha-genin-roster-63.js")
    journey = read("runtime/alpha-journey-surface-32800.js")
    origin_integrator = read("runtime/alpha-origin-scenes-32900-integrator.js")
    sprint = read("runtime/alpha-alpha-sprint-33100.js")
    bridge = read("runtime/alpha-traversal-bridge-33200.js")
    world_fix = read("runtime/alpha-world-konoha-112-fix.js")
    contained = read("runtime/alpha-anbu-root-contained-155-knowledge-fix.js")

    # Promotion -> #63 SAVE/reload/CONTINUE -> Current Journey seam.
    require(checks, "63_stale_selection_fails_closed", "stale_candidate_snapshot_selection" in roster)
    require(checks, "63_stale_recruitment_fails_closed", "stale_candidate_snapshot_recruitment" in roster)
    require(
        checks,
        "63_save_reserves_without_assignment",
        contains_all(roster, "saveGeninRosterTransitionReservations", "assignmentCommitted:false", "save_reservations_required_before_continue"),
    )
    require(
        checks,
        "63_reserved_candidate_protected",
        contains_all(roster, "candidate_reserved_to_player_transition", "reservedGeninVariantIds", "reservedLeaderVariantId"),
    )
    require(
        checks,
        "traversal_incomplete_returns_to_roster",
        contains_all(bridge, "isIncompleteTransition33200", "openGeninRosterTransitionUI33200"),
    )
    require(
        checks,
        "traversal_completed_returns_to_existing_journey",
        contains_all(bridge, "state.completed===true", "openCurrentJourney33200", 'openOverlay("missions")'),
    )
    require(
        checks,
        "traversal_does_not_commit_acquisition",
        "commitCharacterAcquisition" not in bridge,
    )

    # Current Journey / Arc-1 / late-Arc continuity uses existing authorities.
    require(checks, "journey_m11_authority_reused", "startAlphaArc1Mission11" in journey)
    require(checks, "journey_m12_authority_reused", "startAlphaArc1Mission12" in journey)
    require(checks, "journey_world_semantics_reused", contains_all(journey, "getHotspotProjection", "getClanQueueReadModel"))
    require(
        checks,
        "story_battle_exact_caller_return_present",
        contains_all(sprint, "resumeBattleCallerAfterCompletion", 'rc.type==="story_scene"'),
    )
    require(
        checks,
        "setback_is_withdrawal_not_injury_death",
        contains_all(sprint, "battlePLWithdrawal:true", "injuryInferred:false", "deathInferred:false"),
    )

    # Origin package is ten-Origin and source-first; no direct PL grant in occurrence commit.
    require(checks, "origin_dispatcher_ten_mapping_gate", "Object.keys(A.sceneByVariant).length===10" in origin_integrator)
    require(checks, "origin_source_first_consumer", contains_all(origin_integrator, "consumeStaticOriginSourceOccurrence", "this.history().push(record)"))
    require(
        checks,
        "origin_occurrence_no_direct_pl_grant",
        '!A.commitOccurrence.toString().includes("currentPL")' in origin_integrator
        and '!A.commitOccurrence.toString().includes("BasePL")' in origin_integrator,
    )

    # World M9 exact committed lead gate. Geography knowledge cannot substitute.
    require(checks, "m9_exact_lead_literal", "arc1_veterinary_ward_lead_01" in world_fix)
    require(checks, "m9_requires_committed_address", "hasCommittedAddress" in world_fix)
    require(checks, "m9_fail_closed_no_focus", "NO_CURRENT_MAP_FOCUS" in world_fix)

    # ANBU/ROOT: access and Knowledge remain distinct; known-unknown is exact ????
    require(checks, "contained_known_unknown_exact_label", '"????"' in contained)
    require(checks, "contained_identity_gate", contains_all(contained, "IDENTIFIED", "MAPPED", "KNOWN_UNKNOWN", "UNRECOGNISED"))
    require(checks, "contained_same_instance_causal_pinning", "contained_area_semantic_change_requires_new_authority_occurrence" in contained)
    require(checks, "contained_no_browser_golden_claim", "browserGoldenClaimed:false" in contained)

    # The active loader must not silently reintroduce stale Fire implementation.
    require(
        checks,
        "fire_owner_gate_not_bypassed_by_active_runtime_module",
        not any("fire" in Path(script).name.lower() and script.startswith("runtime/") for script in scripts),
    )

    # Live portrait cardinality remains the current 115 contract. This checks the
    # source of truth indirectly too by running qa_battle_portraits.py below.
    portrait_qa = read("tools/qa_battle_portraits.py")
    require(checks, "portrait_gate_is_115_not_116", "115" in portrait_qa and "116" not in portrait_qa)

    # Required existing gates must remain present. Missing tests are regressions.
    all_gate_paths = PYTHON_GATES + NODE_GATES
    require(checks, "all_closure_subgates_exist", all((ROOT / rel).is_file() for rel in all_gate_paths))

    subgate_results: list[dict[str, object]] = []
    for rel in PYTHON_GATES:
        subgate_results.append(execute(rel, [sys.executable, str(ROOT / rel)]))
    for rel in NODE_GATES:
        subgate_results.append(execute(rel, ["node", str(ROOT / rel)]))
    require(checks, "all_existing_subsystem_gates_green", all(row["pass"] for row in subgate_results))

    # Golden remains a browser evidence class, explicitly outside this gate.
    require(checks, "browser_golden_not_claimed", True)

    failed = [name for name, ok in checks.items() if not ok]
    result = {
        "issue": 141,
        "gate": "pre_alpha_runtime_closure",
        "pass": not failed,
        "checks": checks,
        "failed": failed,
        "productionScriptCount": len(scripts),
        "syntaxGateCount": len(syntax_results),
        "subgateCount": len(subgate_results),
        "browserGoldenClaimed": False,
        "authorityCreated": False,
    }
    print("\n=== ISSUE #141 PRE-ALPHA RUNTIME CLOSURE ===")
    print(json.dumps(result, indent=2, sort_keys=True))
    if failed:
        print("FAILED: " + ", ".join(failed), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
