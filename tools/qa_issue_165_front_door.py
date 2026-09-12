#!/usr/bin/env python3
"""Issue #165 — Alpha front-door source/load gate.

Source/headless only. Installed-browser/Golden is intentionally not claimed.
"""
from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
FRONT=ROOT/"runtime/alpha-front-door-33300.js"
BRIDGE=ROOT/"runtime/alpha-traversal-bridge-33200.js"
HARNESS=ROOT/"tools/qa_issue_165_front_door_runtime.js"


def syntax(path:Path)->bool:
    return subprocess.run(["node","--check",str(path)],cwd=ROOT,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True).returncode==0


def main()->int:
    front=FRONT.read_text(encoding="utf-8") if FRONT.is_file() else ""
    bridge=BRIDGE.read_text(encoding="utf-8") if BRIDGE.is_file() else ""
    checks={
        "front_runtime_exists":FRONT.is_file(),
        "runtime_harness_exists":HARNESS.is_file(),
        "front_runtime_syntax":FRONT.is_file() and syntax(FRONT),
        "bridge_syntax":BRIDGE.is_file() and syntax(BRIDGE),
        "exact_patch_id":"alpha_front_door_33300_2026_09_13" in front,
        "exact_boot_sequence":all(token in front for token in ["landing","ninja_id","village","ninja"]),
        "existing_save_has_continue":"CONTINUE CHRONICLE" in front and "NEW CHRONICLE" in front,
        "fresh_save_has_begin":"BEGIN CHRONICLE" in front,
        "reset_exact_player_save":"shinobiChroniclesPlayerSave" in front,
        "reset_exact_session_resume":"shinobiTestState" in front,
        "reset_not_blanket_storage_clear":"localStorage.clear" not in front and "sessionStorage.clear" not in front,
        "ninja_id_profile_separate":"shinobiChroniclesFrontDoorProfileV1" in front and "presentationOnly:true" in front,
        "konoha_only_enabled":'id:"konoha",name:"HIDDEN LEAF",country:"LAND OF FIRE",enabled:true' in front,
        "other_four_fail_closed":sum(front.count(f'id:"{v}"') for v in ["suna","kiri","kumo","iwa"])==4 and front.count("enabled:false")>=4,
        "reuses_existing_origin_entries":"getAlphaChronicleOriginSelectionEntries" in front,
        "reuses_existing_origin_commit":"selectChronicleOrigin" in front,
        "reuses_existing_origin_dispatcher":"beginAlphaChronicleOriginPrologue" in front,
        # Diagnostic strings name the forbidden authorities deliberately; reject
        # actual direct calls instead of whole-file string mentions.
        "no_second_acquisition_commit":"commitCharacterAcquisition(" not in front and "grantCharacterRegistryOwnership(" not in front,
        "underlying_game_inert_while_front_door":"game.inert=true" in front and "game.inert=false" in front,
        "bridge_terminal_loader_exact":bridge.count('script.src="runtime/alpha-front-door-33300.js"')==1,
        "bridge_loader_duplicate_guard":"sc-alpha-front-door-33300-script" in bridge and "SC_ALPHA_FRONT_DOOR_33300" in bridge,
        "browser_golden_not_claimed":True,
    }
    failed=[name for name,value in checks.items() if not value]
    result={"issue":165,"pass":not failed,"checks":checks,"failed":failed,"browserGoldenClaimed":False}
    print(json.dumps(result,indent=2,sort_keys=True))
    return 1 if failed else 0


if __name__=="__main__":
    raise SystemExit(main())
