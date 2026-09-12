#!/usr/bin/env python3
"""Issue #165 — Alpha front-door / browser-correction source gate.

Source/headless only. Installed-browser/Golden is intentionally not claimed.
"""
from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
FRONT=ROOT/"runtime/alpha-front-door-33300.js"
FIX=ROOT/"runtime/alpha-browser-onboarding-fixes-33400.js"
BRIDGE=ROOT/"runtime/alpha-traversal-bridge-33200.js"
HARNESS_V1=ROOT/"tools/qa_issue_165_front_door_runtime.js"
HARNESS_V2=ROOT/"tools/qa_issue_165_front_door_v2_runtime.js"


def syntax(path:Path)->bool:
    return path.is_file() and subprocess.run(["node","--check",str(path)],cwd=ROOT,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True).returncode==0


def function_slice(source:str,start:str,end:str)->str:
    left=source.find(start)
    if left<0:
        return ""
    right=source.find(end,left+len(start))
    return source[left:right if right>=0 else len(source)]


def main()->int:
    front=FRONT.read_text(encoding="utf-8") if FRONT.is_file() else ""
    fix=FIX.read_text(encoding="utf-8") if FIX.is_file() else ""
    bridge=BRIDGE.read_text(encoding="utf-8") if BRIDGE.is_file() else ""
    reset_source=function_slice(fix,"function startNewChronicle33400()","function beginSelectedOrigin33400()")
    checks={
        "legacy_front_runtime_present":FRONT.is_file() and syntax(FRONT),
        "browser_fix_runtime_present":FIX.is_file() and syntax(FIX),
        "bridge_syntax":syntax(BRIDGE),
        "v1_harness_present":HARNESS_V1.is_file(),
        "v2_harness_present":HARNESS_V2.is_file(),
        "v2_patch_id":"alpha_browser_onboarding_fixes_33400_2026_09_13" in fix,
        "register_login_front_door":"REGISTER / LOGIN" in fix and "REGISTER / NEW NINJA" in fix and "LOGIN / CONTINUE" in fix,
        "truthful_browser_local_alpha":"browser-local" in fix and "No online account, password or server authentication" in fix,
        "exact_new_player_sequence":all(f'{stage}:' in fix for stage in ["account","ninja_id","village","ninja","intro"]),
        "fresh_pending_shell_not_begun":"chronicle_origin_pending" in fix and "pendingShell:pending" in fix and "const begun=locked===true" in fix,
        "force_new_survives_reload":"shinobiChroniclesForceNewOnboardingV2" in fix and "location.reload" in reset_source,
        "reset_function_found":bool(reset_source),
        "reset_is_exact_not_blanket":bool(reset_source) and "localStorage.clear" not in reset_source and "sessionStorage.clear" not in reset_source and all(token in reset_source for token in ["PLAYER_SAVE_KEY","PROFILE_KEY","SESSION_RESUME_KEY"]),
        "ninja_id_is_presentation_only":"presentationOnly:true" in fix and "authenticationScope:\"alpha_browser_local_profile\"" in fix,
        "konoha_only_alpha_start":'id:"konoha",name:"HIDDEN LEAF",country:"LAND OF FIRE",enabled:true' in fix and fix.count("enabled:false")>=4,
        "exact_origin_authority_reused":"getAlphaChronicleOriginSelectionEntries" in fix,
        "selection_does_not_commit_before_intro":"selection only" in fix and "BEGIN after the introduction" in fix,
        "begin_reuses_existing_authorities":"selectChronicleOrigin(entry.variantId" in fix and "beginAlphaChronicleOriginPrologue()" in fix,
        "no_second_acquisition_authority":"commitCharacterAcquisition(" not in fix and "grantCharacterRegistryOwnership(" not in fix,
        "enemy_turn_uses_existing_scheduler":"evaluateEnemyActionScheduler" in fix and "executeEnemyAuthoredActionOpportunity" in fix,
        "enemy_turn_one_way_guard":'side!==\"player\"' in fix and "enemyTurnInProgress33400" in fix,
        "pl_circle_calibration":".battle2-modern .battle-live-power{top:50.2%!important}" in fix,
        "terminal_chain_front_then_fix":'front.src="runtime/alpha-front-door-33300.js"' in bridge and 'fix.src="runtime/alpha-browser-onboarding-fixes-33400.js"' in bridge and "front.addEventListener(\"load\",load33400" in bridge,
        "terminal_chain_duplicate_guards":"SC_ALPHA_FRONT_DOOR_33300" in bridge and "SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400" in bridge,
        "headless_loader_noop":"!document.head" in bridge,
        "browser_golden_not_claimed":"browserGoldenClaimed:false" in fix,
    }
    failed=[name for name,value in checks.items() if not value]
    result={"issue":165,"pass":not failed,"checks":checks,"failed":failed,"browserGoldenClaimed":False}
    print(json.dumps(result,indent=2,sort_keys=True))
    return 1 if failed else 0


if __name__=="__main__":
    raise SystemExit(main())
