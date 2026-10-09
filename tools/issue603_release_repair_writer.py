#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPECTED_PARENT = "4db0fe4df57e2b9c2884a2c1f59737c27bad9b32"
NEW_BUILD_ID = "SC-ALPHA-RUNTIME-R303-2026-10-10-EO"
NEW_GENERATION = "step7-academy-genin-promotion-integrated-603"
BASELINE = "248954c1fd3fc2d77abd8cd95af90fb2f99e5d7d"
FEATURE = "step7-academy-genin-promotion-integrated-603"


def text(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def write(path: str, value: str) -> None:
    (ROOT / path).write_text(value, encoding="utf-8")


def replace_once(source: str, old: str, new: str, label: str) -> str:
    count = source.count(old)
    if count != 1:
        raise RuntimeError(f"{label}: expected exact single match, got {count}")
    return source.replace(old, new, 1)


def replace_all_exact(source: str, old: str, new: str, count: int, label: str) -> str:
    actual = source.count(old)
    if actual != count:
        raise RuntimeError(f"{label}: expected {count} matches, got {actual}")
    return source.replace(old, new)


def repair_manifest_436_qa() -> None:
    path = "tools/qa_phase2_chronicle_state_manifest_436.js"
    s = text(path)
    old_domains = 'assert.deepStrictEqual(manifest.domains.map(x=>x.stateDomainId),["currentTeam","tutorialProgress","chronicleIdentity","chronicleRunIdentity","currentRyo","disciplineDevelopment","characterStats","originParticipantContinuity","privateOriginHistory","shinobiRecordProjection"]);'
    new_domains = 'assert.deepStrictEqual(manifest.domains.map(x=>x.stateDomainId),["promotionState","currentTeam","tutorialProgress","chronicleIdentity","chronicleRunIdentity","currentRyo","disciplineDevelopment","characterStats","originParticipantContinuity","privateOriginHistory","shinobiRecordProjection"]);'
    s = replace_once(s, old_domains, new_domains, "#436 exact domain order")
    anchor = '''  assert.strictEqual(runDomain.savePath,"playerData.phase2ChronicleState.chronicleRunIdentity");

  const privateOriginDomain=manifest.domains.find(row=>row.stateDomainId==="privateOriginHistory");'''
    replacement = '''  assert.strictEqual(runDomain.savePath,"playerData.phase2ChronicleState.chronicleRunIdentity");

  const promotionDomain=manifest.domains.find(row=>row.stateDomainId==="promotionState");
  assert(promotionDomain,"promotionState domain missing");
  assert.strictEqual(promotionDomain.semanticOwner,"PL / Registry / Rank + Coding #603");
  assert.strictEqual(promotionDomain.canonicalWritePath,"SC_PROMOTION_INSTALLED_60330 scoped persistence adapter");
  assert.strictEqual(promotionDomain.savePath,"playerData.phase2ChronicleState.promotionState");
  assert(promotionDomain.qaRefs.includes("#603"));

  const privateOriginDomain=manifest.domains.find(row=>row.stateDomainId==="privateOriginHistory");'''
    s = replace_once(s, anchor, replacement, "#436 promotion domain assertions")
    anchor2 = '''{
  const legacy=JSON.parse(JSON.stringify(teamSave));
  legacy.acquisition.academyTeamFormation.confirmationReceipt.firstKonohaTutorial={'''
    promotion_block = '''{
  const promotionSave=JSON.parse(JSON.stringify(teamSave));
  const promotionState={
    schemaVersion:1,
    stateDomainId:"promotionState",
    assessmentFamilyId:"academy_to_genin_field_readiness_assessment",
    scenarioId:"academy_genin_missing_courier_dispatch_v1",
    rankTransitionId:"academy_to_genin",
    stableCharacterId:"owned_character_academy_menma",
    promotionRequirementPackageId:"academy_genin_fr_pkg_information_team_v1",
    attempts:[{assessmentAttemptId:"assessment_save436_603",status:"COMMITTED"}],
    activeAttemptId:"assessment_save436_603"
  };
  promotionSave.phase2ChronicleState={schemaVersion:1,promotionState};
  const c=boot(promotionSave);
  const migrated=plain(c.migratePhase2ChronicleState43600(c.playerData));
  assert.deepStrictEqual(migrated.phase2ChronicleState.promotionState,promotionState,"#603 Promotion state dropped or rewritten by #436 migration");
  const migratedAgain=plain(c.migratePhase2ChronicleState43600(migrated));
  assert.deepStrictEqual(migratedAgain.phase2ChronicleState.promotionState,promotionState,"#603 Promotion state rerolled on repeated #436 migration");
}

{
  const legacy=JSON.parse(JSON.stringify(teamSave));
  legacy.acquisition.academyTeamFormation.confirmationReceipt.firstKonohaTutorial={'''
    s = replace_once(s, anchor2, promotion_block, "#436 Promotion migration fixture")
    old_output = '  initialDomains:["currentTeam","tutorialProgress","chronicleIdentity","chronicleRunIdentity","currentRyo","disciplineDevelopment","characterStats","originParticipantContinuity","shinobiRecordProjection"],\n  chronicleRunIdentity:true,'
    new_output = '  initialDomains:["promotionState","currentTeam","tutorialProgress","chronicleIdentity","chronicleRunIdentity","currentRyo","disciplineDevelopment","characterStats","originParticipantContinuity","privateOriginHistory","shinobiRecordProjection"],\n  promotionStateRegistered:true,\n  promotionStateMigrationPreserved:true,\n  chronicleRunIdentity:true,'
    s = replace_once(s, old_output, new_output, "#436 diagnostic output")
    write(path, s)


def add_declared_603_game_normalizer(path: str, check_name: str) -> None:
    s = text(path)
    anchor = '''def game_without_declared_469_save_reader(text:str)->str:
    start_marker='      // ISSUE #469 / #34000 — preserve the canonical neutral Story decision'
    end_marker='      // ISSUE #322 / #23 — preserve shared Story intent/factual receipts and'
    start=text.find(start_marker)
    end=text.find(end_marker,start if start >= 0 else 0)
    if start < 0 or end <= start:
        return ''
    return text[:start]+text[end:]
'''
    helper = anchor + '''
# #603 intentionally adds exactly two bounded game.js seams: canonical Battle
# caller return dispatch for the Missing Courier assessment and rogue-feint expiry
# at the existing enemy action-opportunity boundary. Strip only those exact
# reviewed blocks before applying the frozen pre-#603 game.js blob pin.
def game_without_declared_603_promotion_seams(text:str)->str:
    return_block=''' + "'''" + '''  if (returnContext.type==="field_readiness_assessment") {
    if (returnContext.assessmentScenarioId==="academy_genin_missing_courier_dispatch_v1") {
      const courier=globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310;
      if (!courier||typeof courier.resumeFromCurrentBattle!=="function") return {success:false,reason:"promotion_courier_return_authority_missing"};
      return courier.resumeFromCurrentBattle(returnContext);
    }
    return resumeFieldReadinessAssessmentFromBattle(returnContext);
  }''' + "'''" + '''
    prior_return='  if (returnContext.type==="field_readiness_assessment") return resumeFieldReadinessAssessmentFromBattle(returnContext);'
    feint_block=''' + "'''" + '''  if (globalThis.currentBattle&&currentBattle.promotionCourier60310&&globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310&&typeof globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.expireRogueFeintAtActionOpportunity==="function") {
    globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.expireRogueFeintAtActionOpportunity();
  }
''' + "'''" + '''
    if text.count(return_block)!=1 or text.count(feint_block)!=1:
        return ''
    return text.replace(return_block,prior_return,1).replace(feint_block,'',1)
'''
    s = replace_once(s, anchor, helper, f"{path} #603 normalizer")
    old = f"checks['{check_name}']=git_blob_sha(game_without_declared_469_save_reader(game))==EXPECTED_BLOB"
    if path.endswith("qa_issue_63_genin_v2_roster.py"):
        old = "checks['audited_game_blob_preserved']=git_blob_sha(game_without_declared_469_save_reader(game))=='f45dc5a147b9569862ad7f17e7f4254ddc916f8e'"
        new = "checks['audited_game_blob_preserved']=git_blob_sha(game_without_declared_603_promotion_seams(game_without_declared_469_save_reader(game)))=='f45dc5a147b9569862ad7f17e7f4254ddc916f8e'"
    else:
        new = f"checks['{check_name}']=git_blob_sha(game_without_declared_603_promotion_seams(game_without_declared_469_save_reader(game)))==EXPECTED_BLOB"
    s = replace_once(s, old, new, f"{path} blob audit composition")
    write(path, s)


def repair_traversal_qa() -> None:
    path = "tools/qa_alpha_traversal_bridge_33200.py"
    s = text(path)
    old = '        "ordinary_promotion_delegates": \'priorPromotion33200.apply(this,arguments)\' in runtime,'
    new = '''        "ordinary_promotion_delegates": (
            'typeof globalThis.openInstalledPromotion60330!=="function"' in runtime
            and 'return globalThis.openInstalledPromotion60330(subjectId);' in runtime
            and 'promotion_step7_integration_authority_missing' in runtime
        ),'''
    s = replace_once(s, old, new, "#33200 Step-7 delegate expectation")
    write(path, s)


def repair_141() -> None:
    path = "tools/qa_issue_141_pre_alpha_runtime_closure.py"
    s = text(path)
    anchor = '    "runtime/alpha-chronicle-state-manifest-43600.js",\n    "runtime/alpha-discipline-stat-growth-44800.js",'
    replacement = '''    "runtime/alpha-chronicle-state-manifest-43600.js",
    "runtime/alpha-promotion-core-60300.js",
    "runtime/alpha-promotion-courier-assessment-60310.js",
    "runtime/alpha-promotion-arena-ui-60320.js",
    "runtime/alpha-promotion-installed-integration-60330.js",
    "runtime/alpha-discipline-stat-growth-44800.js",'''
    s = replace_once(s, anchor, replacement, "#141 production order")
    anchor2 = '    "tools/qa_phase2_character_card_shop_524.js",\n]'
    replacement2 = '    "tools/qa_phase2_character_card_shop_524.js",\n    "tools/qa_issue_603_installed_integration.js",\n]'
    s = replace_once(s, anchor2, replacement2, "#141 #603 installed subgate")
    anchor3 = '''    require(
        checks,
        "63_before_journey_and_traversal",
        scripts.index("runtime/alpha-genin-roster-63.js") < scripts.index("runtime/alpha-journey-surface-32800.js")
        < scripts.index("runtime/alpha-traversal-bridge-33200.js"),
    )
'''
    replacement3 = anchor3 + '''    require(
        checks,
        "603_promotion_modules_ordered_before_consumers",
        scripts.index("runtime/alpha-chronicle-state-manifest-43600.js")
        < scripts.index("runtime/alpha-promotion-core-60300.js")
        < scripts.index("runtime/alpha-promotion-courier-assessment-60310.js")
        < scripts.index("runtime/alpha-promotion-arena-ui-60320.js")
        < scripts.index("runtime/alpha-promotion-installed-integration-60330.js")
        < scripts.index("runtime/alpha-traversal-bridge-33200.js"),
    )
'''
    s = replace_once(s, anchor3, replacement3, "#141 #603 loader seam assertion")
    write(path, s)


def repair_528_manifest() -> None:
    path = ROOT / "qa/production_consumption_manifest_528.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    row = next((r for r in data["rows"] if r.get("id") == "promotion_transition_141_63"), None)
    if row is None:
        raise RuntimeError("#528 promotion transition row missing")
    for ref in ["#603", "#608", "#609"]:
        if ref not in row["authority_ref"]:
            row["authority_ref"].append(ref)
    for consumer in [
        "runtime/alpha-promotion-core-60300.js",
        "runtime/alpha-promotion-courier-assessment-60310.js",
        "runtime/alpha-promotion-arena-ui-60320.js",
        "runtime/alpha-promotion-installed-integration-60330.js",
    ]:
        if consumer not in row["consumer_paths"]:
            row["consumer_paths"].append(consumer)
    for qa in [
        "tools/qa_issue_603_step7_promotion.js",
        "tools/qa_issue_603_step7_promotion_browser.js",
        "tools/qa_issue_603_installed_integration.js",
    ]:
        if qa not in row["qa_paths"]:
            row["qa_paths"].append(qa)
    row["expected_evidence"] = {
        "path": "runtime/alpha-promotion-installed-integration-60330.js",
        "contains": "SC_PROMOTION_INSTALLED_60330",
    }
    row["observable_acceptance"] = [
        "Academy→Genin inspection remains non-committing while deliberate assessment commit persists one opaque attempt lineage and a stable package across retry/save-load",
        "Missing Courier mission and optional Hold-Line Battle return only factual evidence/reward causes; Battle victory and mission completion do not manufacture Promotion",
        "only a valid PASS invokes the existing authorised Genin Origin transition, idempotently, without mutating unrelated ownership/assignment/deployment truth",
        "1366×768 and 1920×1080 installed-browser Promotion proof remains a required non-Golden acceptance class",
    ]
    invalidation = row.setdefault("invalidation_rule", {})
    patterns = invalidation.setdefault("match_any", [])
    for pattern in [
        ".github/workflows/issue-603-step7-promotion.yml",
        "runtime/alpha-promotion-core-60300.js",
        "runtime/alpha-promotion-courier-assessment-60310.js",
        "runtime/alpha-promotion-arena-ui-60320.js",
        "runtime/alpha-promotion-installed-integration-60330.js",
        "tools/qa_issue_603_step7_promotion.js",
        "tools/qa_issue_603_step7_promotion_browser.js",
        "tools/qa_issue_603_installed_integration.js",
    ]:
        if pattern not in patterns:
            patterns.append(pattern)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def repair_fingerprint() -> None:
    path = "runtime/alpha-runtime-build-fingerprint-303.js"
    s = text(path)
    s = replace_all_exact(s, "SC-ALPHA-RUNTIME-R303-2026-10-09-EN", NEW_BUILD_ID, 2, "#303 build ID")
    s = replace_once(s, 'sourceBaselineCommit:"6e6acfdcc96822a876a3cd5dde8d836f9587fb05",', f'sourceBaselineCommit:"{BASELINE}",', "#303 baseline")
    s = replace_once(s, 'runtimeGeneration:"canonical-battle-terminal-result-owner-consolidated-544",', f'runtimeGeneration:"{NEW_GENERATION}",', "#303 generation manifest")
    feature_anchor = '      "canonical-battle-terminal-result-owner-consolidated-544"\n    ]),'
    feature_replacement = '      "canonical-battle-terminal-result-owner-consolidated-544",\n      "step7-academy-genin-promotion-integrated-603"\n    ]),'
    s = replace_once(s, feature_anchor, feature_replacement, "#303 feature append")
    s = replace_once(s, 'generationPresent:first.runtimeGeneration==="canonical-battle-terminal-result-owner-consolidated-544",', f'generationPresent:first.runtimeGeneration==="{NEW_GENERATION}",', "#303 generation diagnostic")
    diag_anchor = '      canonicalBattleTerminalResult544Present:first.majorRuntimeFeatures.includes("canonical-battle-terminal-result-owner-consolidated-544"),\n      noPlayerFacingSurface:first.playerFacing===false,'
    diag_replacement = '      canonicalBattleTerminalResult544Present:first.majorRuntimeFeatures.includes("canonical-battle-terminal-result-owner-consolidated-544"),\n      step7Promotion603Present:first.majorRuntimeFeatures.includes("step7-academy-genin-promotion-integrated-603"),\n      noPlayerFacingSurface:first.playerFacing===false,'
    s = replace_once(s, diag_anchor, diag_replacement, "#303 feature diagnostic")
    write(path, s)

    manifest_path = ROOT / "tools/fixtures/runtime_build_manifest_303.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest["buildId"] = NEW_BUILD_ID
    manifest["sourceBaselineCommit"] = BASELINE
    manifest["runtimeGeneration"] = NEW_GENERATION
    if FEATURE not in manifest["majorRuntimeFeatures"]:
        manifest["majorRuntimeFeatures"].append(FEATURE)
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def repair_311_promotion_persistence() -> None:
    path = "tools/qa_save_compatibility_311.js"
    s = text(path)
    anchor = '''    originParticipantContinuity:{schemaVersion:1,byKey:{}},
    privateOriginHistories:{'''
    promotion_state = '''    originParticipantContinuity:{schemaVersion:1,byKey:{}},
    promotionState:{
      schemaVersion:1,
      stateDomainId:"promotionState",
      assessmentFamilyId:"academy_to_genin_field_readiness_assessment",
      scenarioId:"academy_genin_missing_courier_dispatch_v1",
      rankTransitionId:"academy_to_genin",
      stableCharacterId:"owned_character_academy_kakashi",
      packagePoolVersion:"academy_genin_fr_package_pool_v1",
      promotionRequirementPackageId:"academy_genin_fr_pkg_information_team_v1",
      packageDerivation:{algorithm:"fnv1a32_utf8_v1",seedFingerprint:"save311603",materializedAt:"2026-10-10T00:00:00.000Z"},
      readinessSlots:{
        academy_genin_req_mission_comprehension:{slotId:"academy_genin_req_mission_comprehension",domain:"mission_comprehension",revealed:true,satisfied:true,revealRefs:["save311603"],evidenceRefs:["save311603"]},
        academy_genin_req_judgement_under_pressure:{slotId:"academy_genin_req_judgement_under_pressure",domain:"judgement_under_pressure",revealed:false,satisfied:false,revealRefs:[],evidenceRefs:[]},
        academy_genin_req_secondary_1:{slotId:"academy_genin_req_secondary_1",domain:"information_use",revealed:false,satisfied:false,revealRefs:[],evidenceRefs:[]},
        academy_genin_req_secondary_2:{slotId:"academy_genin_req_secondary_2",domain:"team_coordination",revealed:false,satisfied:false,revealRefs:[],evidenceRefs:[]}
      },
      attempts:[{
        assessmentAttemptId:"assessment_save311_603",
        attemptNumber:1,
        status:"COMMITTED",
        assessmentFamilyId:"academy_to_genin_field_readiness_assessment",
        scenarioId:"academy_genin_missing_courier_dispatch_v1",
        startedAt:"2026-10-10T00:00:01.000Z",
        missionInstanceId:"mission_academy_genin_missing_courier_dispatch_v1::assessment_save311_603",
        worldOccurrenceId:"occ_academy_genin_missing_courier_dispatch_v1::assessment_save311_603",
        rewardSnapshotId:"reward_snapshot_academy_genin_missing_courier_dispatch_v1::assessment_save311_603",
        battleOccurrenceId:"battle_occ_academy_genin_missing_courier_hold_line_v1::assessment_save311_603"
      }],
      activeAttemptId:"assessment_save311_603",
      nextAttemptNumber:2,
      geninTransitionReceipts:{}
    },
    privateOriginHistories:{'''
    s = replace_once(s, anchor, promotion_state, "#311 promotion persistence fixture")
    anchor2 = '  assert.deepStrictEqual(loaded.phase2ChronicleState,fixture.phase2ChronicleState,"#436 Phase-2 root dropped/rewritten by compatibility reader");\n  context.__phase2Loaded=loaded;'
    replacement2 = '  assert.deepStrictEqual(loaded.phase2ChronicleState,fixture.phase2ChronicleState,"#436 Phase-2 root dropped/rewritten by compatibility reader");\n  assert.strictEqual(loaded.phase2ChronicleState.promotionState.activeAttemptId,"assessment_save311_603","#603 active Promotion attempt lineage dropped on load");\n  context.__phase2Loaded=loaded;'
    s = replace_once(s, anchor2, replacement2, "#311 load assertion")
    anchor3 = '  assert.deepStrictEqual(migratedAgain,migrated,"#436 migration rerolled Phase-2 state");\n  vm.runInContext("playerData=loadPlayerData();savePlayerData();",context);'
    replacement3 = '  assert.deepStrictEqual(migratedAgain,migrated,"#436 migration rerolled Phase-2 state");\n  assert.deepStrictEqual(migrated.phase2ChronicleState.promotionState,fixture.phase2ChronicleState.promotionState,"#603 Promotion package/attempt state changed during migration");\n  vm.runInContext("playerData=loadPlayerData();savePlayerData();",context);'
    s = replace_once(s, anchor3, replacement3, "#311 migration assertion")
    anchor4 = '  assert.deepStrictEqual(reloaded.phase2ChronicleState,fixture.phase2ChronicleState,"#436 save/reload changed tutorialProgress");\n}'
    replacement4 = '  assert.deepStrictEqual(reloaded.phase2ChronicleState,fixture.phase2ChronicleState,"#436 save/reload changed tutorialProgress");\n  assert.deepStrictEqual(reloaded.phase2ChronicleState.promotionState,fixture.phase2ChronicleState.promotionState,"#603 Promotion package/attempt state changed after save/reload");\n}'
    s = replace_once(s, anchor4, replacement4, "#311 reload assertion")
    anchor5 = '    chronicleRunIdentityPersists:true\n  },'
    replacement5 = '    chronicleRunIdentityPersists:true,\n    promotionStatePersists:true,\n    promotionPackageAndAttemptLineageNoReroll:true\n  },'
    s = replace_once(s, anchor5, replacement5, "#311 output invariants")
    write(path, s)


def main() -> None:
    parent = subprocess.check_output(["git", "rev-parse", "HEAD^"], cwd=ROOT, text=True).strip()
    if parent != EXPECTED_PARENT:
        raise RuntimeError(f"stale writer parent: expected {EXPECTED_PARENT}, got {parent}")

    repair_manifest_436_qa()
    add_declared_603_game_normalizer("tools/qa_issue_111_menma_tutorial.py", "audited_game_blob_unchanged")
    add_declared_603_game_normalizer("tools/qa_issue_63_genin_v2_roster.py", "audited_game_blob_preserved")
    repair_traversal_qa()
    repair_141()
    repair_528_manifest()
    repair_fingerprint()
    repair_311_promotion_persistence()

    # Fast local source checks before the workflow commits anything.
    checks = [
        ["python3", "tools/qa_issue_111_menma_tutorial.py"],
        ["python3", "tools/qa_issue_63_genin_v2_roster.py"],
        ["python3", "tools/qa_alpha_traversal_bridge_33200.py"],
        ["node", "tools/qa_phase2_chronicle_state_manifest_436.js"],
        ["node", "tools/qa_issue_603_installed_integration.js"],
        ["node", "tools/qa_issue_303_runtime_build_fingerprint.js"],
        ["node", "tools/qa_save_compatibility_311.js"],
    ]
    for argv in checks:
        subprocess.run(argv, cwd=ROOT, check=True)

    # Temporary writer infrastructure must not survive the produced candidate.
    (ROOT / "tools/issue603_release_repair_writer.py").unlink()
    (ROOT / ".github/workflows/603-release-repair-writer.yml").unlink()


if __name__ == "__main__":
    main()
