#!/usr/bin/env python3
"""Static source gate for the Alpha 33200 post-Promotion traversal bridge.

This gate intentionally proves source/load-chain properties only. It never claims
installed-browser Golden evidence.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    runtime_path = root / "runtime" / "alpha-traversal-bridge-33200.js"
    index_path = root / "index.html"

    runtime = runtime_path.read_text(encoding="utf-8") if runtime_path.exists() else ""
    index = index_path.read_text(encoding="utf-8") if index_path.exists() else ""

    operational = runtime.split("function runAlphaTraversalBridge33200Diagnostics", 1)[0]

    bridge_tag = '<script src="runtime/alpha-traversal-bridge-33200.js"></script>'
    prior_tag = '<script src="runtime/alpha-alpha-sprint-33100.js"></script>'

    checks = {
        "runtime_exists": runtime_path.exists(),
        "index_exists": index_path.exists(),
        "bridge_loaded_once": index.count(bridge_tag) == 1,
        "bridge_loaded_after_33100": index.find(bridge_tag) > index.find(prior_tag) >= 0,
        "exact_patch_id": 'alpha_traversal_bridge_33200_2026_09_13' in runtime,
        "pending_transition_uses_existing_roster": (
            'isIncompleteTransition33200(state)' in runtime
            and 'openGeninRosterTransitionUI33200()' in runtime
        ),
        "completed_transition_returns_current_journey": (
            'state&&state.completed===true' in runtime
            and 'openOverlay("missions")' in runtime
        ),
        "ordinary_promotion_delegates": 'priorPromotion33200.apply(this,arguments)' in runtime,
        "no_candidate_assignment_mutation": 'selectedTeamVariantIds=' not in operational,
        "no_ownership_commit": 'commitCharacterAcquisition' not in operational,
        "runtime_diagnostic_present": 'runAlphaTraversalBridge33200Diagnostics' in runtime,
        "browser_golden_not_claimed": 'browserGoldenClaimed:false' in runtime,
    }

    failed = [name for name, passed in checks.items() if not passed]
    result = {
        "pass": not failed,
        "checks": checks,
        "failed": failed,
        "browserGoldenClaimed": False,
        "scope": "source/load-chain only",
    }
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0 if not failed else 1


if __name__ == "__main__":
    sys.exit(main())
