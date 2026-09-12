#!/usr/bin/env python3
from pathlib import Path
import hashlib, re, sys

ROOT=Path(__file__).resolve().parents[1]
game=(ROOT/'game.js').read_text(encoding='utf-8')
patch=(ROOT/'runtime/alpha-menma-tutorial-111.js').read_text(encoding='utf-8')
index=(ROOT/'index.html').read_text(encoding='utf-8')

EXPECTED_BLOB='9a95e018ac76b993c22b62ed6aa02be5520e97b1'
def git_blob_sha(text:str)->str:
    raw=text.encode('utf-8')
    return hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()

five=[
 'academy_menma_chakra_knuckle',
 'academy_menma_crescent_kunai',
 'academy_menma_guard_breaker',
 'academy_menma_shadow_clone_feint',
 'academy_menma_shadowstep',
]
legacy=[
 'academy_menma_yin_chakra_pulse',
 'academy_menma_fox_chakra_strike',
 'academy_menma_kuramas_guidance',
]

checks={}
checks['audited_game_blob_unchanged']=git_blob_sha(game)==EXPECTED_BLOB
checks['patch_loaded_after_game']=index.index('<script src="game.js"></script>') < index.index('<script src="runtime/alpha-menma-tutorial-111.js"></script>')
checks['stable_policy_id']='alpha_combat_content_projection_v1_2026_09_11' in patch
checks['exact_five_in_patch_order']=all(patch.index(f'"{sid}"') < patch.index(f'"{five[i+1]}"') for i,sid in enumerate(five[:-1])) and all(sid in patch for sid in five)
checks['legacy_three_not_prepared_by_patch']='ACADEMY_BATTLE_PILOT_PREPARED_SKILLS.academy_menma=[...EXACT_INITIAL_PALETTE]' in patch
checks['production_palette_already_exact']='academy_menma:["academy_menma_chakra_knuckle","academy_menma_crescent_kunai","academy_menma_guard_breaker","academy_menma_shadow_clone_feint","academy_menma_shadowstep"]' in game
checks['knuckle_exact_pl6']='makeFactoryFixedDamageSkill("academy_menma_chakra_knuckle","academy_menma",6' in game
checks['kunai_exact_pl5_no_inventory']='makeFactoryFixedDamageSkill("academy_menma_crescent_kunai","academy_menma",5' in game and 'academy_menma_crescent_kunai","academy_menma",5,{requirements' not in game
checks['guard_breaker_exact_pl7']='makeFactoryFixedDamageSkill("academy_menma_guard_breaker","academy_menma",7' in game
checks['guard_breaker_rider_nonautomatic']='academy_menma_guard_breaker' in game and 'guard_interaction' in game and 'automatic:false' in game
checks['clone_feint_no_participant']='academy_menma_clone_feint' in game and 'temporary_clone_construct_not_participant' in game
checks['shadowstep_requires_route']='makeFactoryCategoricalSkill("academy_menma_shadowstep"' in game and 'requires_legitimate_route' in game and 'legitimate_current_route_required' in patch
attempt=re.search(r'function attemptClosureWaveBattleSkill\([\s\S]*?\n\}',game)
checks['invalid_shadowstep_precommit_order']=bool(attempt and attempt.group(0).find('evaluateClosureWaveSkillAvailability') < attempt.group(0).find('createBattleActionEnvelope')) and 'precommit:true' in patch and 'noActionHistory:true' in patch
checks['no_generic_basic_guard']=not any(re.search(r'basic_attack|basic_guard|generic_guard',sid,re.I) for sid in five)
checks['no_cooperative_kurama_bootstrap']=not any(token in patch for token in ['grantAttachedSummonAccess','attachSummon','menma_nine_tails","cooperative','cooperative_access:true'])
checks['no_default_kinjutsu_observation']='kinjutsu_observation_qualifying' not in '\n'.join(line for line in patch.splitlines() if 'EXACT_INITIAL_PALETTE' in line)
checks['catalogue_not_bulk_prepared']='authoredCatalogueNotBulkPrepared:palette.length===5' in patch
checks['exact_four_alpha_equipment']='["kunai","shuriken_set","ninja_wire","bandit_captains_tanto"]' in game
checks['exact_three_battle_pouch']=all(item in game for item in ['field_recovery_pill','standard_antidote','burn_treatment']) and 'getLiveBattlePouchItemIds' in game
checks['no_image_dependency']='noImageDependency:![...EXACT_INITIAL_PALETTE,POLICY_ID].some' in patch and not any(token in patch for token in ['document.createElement("img")','new Image(','setAttribute("src"','assetManifest'])
checks['save_load_no_new_persistent_truth']=not any(token in patch for token in ['localStorage.setItem','playerData=','playerData.','savePlayerData(','commitCharacterAcquisition(','grantCharacterRegistryOwnership('])
checks['legacy_definitions_remain_authored']=all(sid in game for sid in legacy)
checks['runtime_diagnostic_exported']='window.runIssue111AcademyMenmaTutorialDiagnostics=runDiagnostics' in patch

failed=[k for k,v in checks.items() if not v]
for k,v in checks.items(): print(f"{'PASS' if v else 'FAIL'}  {k}")
print(f"\nIssue #111 source/headless gate: {len(checks)-len(failed)}/{len(checks)} PASS")
if failed:
    print('FAILED:',', '.join(failed))
    sys.exit(1)
