#!/usr/bin/env python3
from pathlib import Path
import hashlib, re, sys

ROOT=Path(__file__).resolve().parents[1]
game=(ROOT/'game.js').read_text(encoding='utf-8')
patch=(ROOT/'runtime/alpha-menma-tutorial-111.js').read_text(encoding='utf-8')
index=(ROOT/'index.html').read_text(encoding='utf-8')

EXPECTED_BLOB='f45dc5a147b9569862ad7f17e7f4254ddc916f8e'
# #532 intentionally extends the audited core with the canonical deliberate
# Current Team assignment writer and Person Name projection required by closed
# #522. This remains a strict normalized game.js blob pin; any further core
# change must be separately reviewed and explicitly repinned.
# #469 intentionally extends only loadPlayerData persistence for the canonical
# #34000 Story-decision runtime store. Strip that exact declared compatibility
# reader before comparing the previously audited game.js blob; every other byte
# of the old audited core must remain unchanged.
# #322's older compatibility root remains preserved immediately after it.
def git_blob_sha(text:str)->str:
    raw=text.encode('utf-8')
    return hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()

def game_without_declared_469_save_reader(text:str)->str:
    start_marker='      // ISSUE #469 / #34000 — preserve the canonical neutral Story decision'
    end_marker='      // ISSUE #322 / #23 — preserve shared Story intent/factual receipts and'
    start=text.find(start_marker)
    end=text.find(end_marker,start if start >= 0 else 0)
    if start < 0 or end <= start:
        return ''
    return text[:start]+text[end:]

# #603 intentionally adds exactly five bounded game.js seams: Promotion Battle
# session capture, canonical Missing Courier caller return dispatch, rogue-feint
# expiry at the existing enemy action-opportunity boundary, and the two restore
# hooks around canonical Battle-session rehydration. Strip only those exact
# reviewed blocks before applying the frozen pre-#603 game.js blob pin.
def game_without_declared_603_promotion_seams(text:str)->str:
    save_block='''    promotionCourier60310Battle:
      globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310&&typeof globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.captureBattleSessionState==="function"
        ? globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.captureBattleSessionState()
        : null,
'''
    return_block='''  if (returnContext.type==="field_readiness_assessment") {
    if (returnContext.assessmentScenarioId==="academy_genin_missing_courier_dispatch_v1") {
      const courier=globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310;
      if (!courier||typeof courier.resumeFromCurrentBattle!=="function") return {success:false,reason:"promotion_courier_return_authority_missing"};
      return courier.resumeFromCurrentBattle(returnContext);
    }
    return resumeFieldReadinessAssessmentFromBattle(returnContext);
  }'''
    prior_return='  if (returnContext.type==="field_readiness_assessment") return resumeFieldReadinessAssessmentFromBattle(returnContext);'
    feint_block='''  if (globalThis.currentBattle&&currentBattle.promotionCourier60310&&globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310&&typeof globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.expireRogueFeintAtActionOpportunity==="function") {
    globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.expireRogueFeintAtActionOpportunity();
  }
'''
    prepare_restore_block='''    const promotionCourier60310BattleState=state.promotionCourier60310Battle&&typeof state.promotionCourier60310Battle==="object"?state.promotionCourier60310Battle:null;
    if(promotionCourier60310BattleState&&globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310&&typeof globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.prepareBattleSessionRestore==="function"){
      globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.prepareBattleSessionRestore(promotionCourier60310BattleState);
    }
'''
    apply_restore_block='''    if(promotionCourier60310BattleState&&globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310&&typeof globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.restoreBattleSessionState==="function"){
      globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310.restoreBattleSessionState(promotionCourier60310BattleState);
    }
'''
    blocks=[save_block,return_block,feint_block,prepare_restore_block,apply_restore_block]
    if any(text.count(block)!=1 for block in blocks):
        return ''
    return (text
        .replace(save_block,'',1)
        .replace(return_block,prior_return,1)
        .replace(feint_block,'',1)
        .replace(prepare_restore_block,'',1)
        .replace(apply_restore_block,'',1))

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
checks['audited_game_blob_unchanged']=git_blob_sha(game_without_declared_603_promotion_seams(game_without_declared_469_save_reader(game)))==EXPECTED_BLOB
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
