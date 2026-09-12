#!/usr/bin/env python3
from pathlib import Path
import re,sys

ROOT=Path(__file__).resolve().parents[1]
g=(ROOT/'game.js').read_text(encoding='utf-8')
core=(ROOT/'runtime/alpha-world-konoha-112-core.js').read_text(encoding='utf-8')
fix=(ROOT/'runtime/alpha-world-konoha-112-fix.js').read_text(encoding='utf-8')
boot=(ROOT/'runtime/alpha-world-konoha-112.js').read_text(encoding='utf-8')
i=(ROOT/'index.html').read_text(encoding='utf-8')

def between(text,start,end):
    if start not in text:
        return ''
    tail=text.split(start,1)[1]
    return tail.split(end,1)[0] if end in tail else ''

rows_block=between(core,'const ROWS=Object.freeze([',']);')
locator_block=between(core,'function getCurrentWorldStoryLocator112(){','function overlayClass')
capability_block=between(core,'function capability(ref){','function rowEligible')
x24_match=re.search(r'\{id:"konoha_alpha_eastern_drainage_trace"[^\n]+\}',rows_block)
x24=x24_match.group(0) if x24_match else ''

checks={
 'core_utf8_recovered':'Recovery note (2026-09-13)' in core and 'recoveredFromCorruptBlob:true' in core,
 'existing_world_registry_reused':'registerWorldEventOpportunity({' in core and 'WORLD_EVENT_OPPORTUNITY_REGISTRY' in g,
 'existing_world_runtime_reused':all(x in core for x in ['setWorldEventLifecycle(','setOpportunityDiscovery(','setOpportunityActionability(','setOpportunityResolution(','setOpportunityTracking(']),
 'info_schema':'sc.worldInfoProjection.v1' in core,
 'locator_schema':'sc.worldStoryLocator.v1' in core,
 'manifest_id':'sc_world_alpha_activation_konoha_v1_2026_09_11' in core,
 'exact_24_rows':len(re.findall(r'\{id:"(?:konoha_|fire_arc1_pressure_)',rows_block))==24,
 'exact_pool_counts':rows_block.count('pool:STANDING')==13 and rows_block.count('pool:PRESSURE')==4 and rows_block.count('pool:RESPONSIVE')==7,
 'safe_public_12':'legalPublicTotal:12' in core and 'knownCount:12' in core,
 'zero_hidden_name_in_projection':'canonicalIdentityRevealed:false' in core and 'accessGranted:false' in core,
 'hidden_lab_identity_not_baked':"Orochimaru's Forgotten Laboratory" not in core,
 'x24_bounded_authority':all(x in x24 for x in ['host:"KON-O16"','category:"DISCOVERY"','reward:0','finite:true','"inspect_trace"','"preserve_report"','"follow_public_route"','"leave"']),
 'x24_exact_clue_gate':all(x in core for x in ['commitKonohaS02SuspicionTrace112','worldTruthSupportsSuspicion!==true','konoha_s02_suspicion_trace','canonicalIdentityRevealed:false','accessGranted:false']),
 'byakugan_requirement_exact':'skill_byakugan_peripheral_detail' in rows_block and 'skil_byakugan_peripheral_detail' not in rows_block,
 'main_story_distinct':'overlayClass:"MAIN_STORY"' in core and 'KNOWN_UNKNOWN' not in locator_block,
 'presentation_does_not_populate':'seedPopulation' not in core and '.innerHTML' not in core and 'insertAdjacentHTML' not in core,
 'no_fire_standing_geometry':not re.search(r'\{id:"fire_standing_',rows_block),
 'one_shot_ryo':'resolution.rewardGranted!==true' in core and 'playerData.ryo=' in core,
 'no_generic_progression_rewards':all(x not in core for x in ['playerData.pl+=','playerData.PL+=','playerData.rank=','grantStat','grantProgression']) and 'worldOnly:true' in core,
 'responsive_fail_closed':all(x in capability_block for x in ['if(String(ref).startsWith("skill_"))','return false;']) and 'some(ref=>!capability(ref))' in core,
 'authoring_checkpoint_withheld':'WITHHELD_AUTHORING_CHECKPOINT' in locator_block,
 'locator_no_teleport':locator_block!='' and all(x not in locator_block for x in ['openRegionHub','travel(','teleport']),
 'core_diagnostic_exported':'runIssue112RecoveredCoreDiagnostics' in core and 'globalThis.runIssue112RecoveredCoreDiagnostics=' in core,
 'index_loads_112':'runtime/alpha-world-konoha-112.js' in i,
 'bootstrap_core_then_fix':'alpha-world-konoha-112-core.js' in boot and 'alpha-world-konoha-112-fix.js' in boot and boot.index('alpha-world-konoha-112-core.js') < boot.index('alpha-world-konoha-112-fix.js'),
 'pressure_uses_live_m1_seam':'isAlphaArc1Mission1Complete()===true' in fix and 'occ_arc1_m1_story_complete' not in fix,
 'semantic_refill_after_committed_action':'executeSelectedOpportunityAction' in fix and 'result&&result.success===true' in fix and 'semanticRefill' in fix,
 'presentation_does_not_refill':not any(name in fix for name in ['renderVillageOverlay=function','renderAlphaKonohaVillageHotspots=function']),
 'existing_save_migration_idempotent':'world_activation_konoha_v1_pressure_migration_2026_09_12' in fix and 'if(!migrated' in fix,
 'm9_exact_veterinary_lead':'arc1_veterinary_ward_lead_01' in fix and 'story_locator_arc1_m9_veterinary_lead' in fix,
 'm9_lead_requires_committed_history':'row.committed!==true' in fix and 'function hasCommittedAddress' in fix,
 'm9_locator_fail_closed_without_lead':all(x in fix for x in ['story_locator_arc1_m9_no_current_focus','NO_CURRENT_MAP_FOCUS','hostLocationRef:null','localInstanceRef:null']),
 'correction_diagnostic_exported':'runIssue112CorrectionDiagnostics' in fix and 'window.runIssue112CorrectionDiagnostics=' in fix,
}
failed=[k for k,v in checks.items() if not v]
for k,v in checks.items(): print(('PASS' if v else 'FAIL'),k)
print(f'Issue #112 source/headless gate: {len(checks)-len(failed)}/{len(checks)} PASS')
if failed:
    print('FAILED:',failed)
    sys.exit(1)
