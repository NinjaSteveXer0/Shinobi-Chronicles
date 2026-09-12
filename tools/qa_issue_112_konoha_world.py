#!/usr/bin/env python3
from pathlib import Path
import re
import shutil
import subprocess
import sys

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'
CORE=ROOT/'runtime'/'alpha-world-konoha-112-core.js'
FIX=ROOT/'runtime'/'alpha-world-konoha-112-fix.js'
BOOT=ROOT/'runtime'/'alpha-world-konoha-112.js'
INDEX=ROOT/'index.html'

g=GAME.read_text(encoding='utf-8')
core=CORE.read_text(encoding='utf-8')
fix=FIX.read_text(encoding='utf-8')
boot=BOOT.read_text(encoding='utf-8') if BOOT.exists() else ''
i=INDEX.read_text(encoding='utf-8')

def between(text,start,end):
    if start not in text:
        return ''
    tail=text.split(start,1)[1]
    return tail.split(end,1)[0] if end in tail else ''

def syntax_green(path:Path)->bool:
    node=shutil.which('node')
    if not node:
        return False
    result=subprocess.run([node,'--check',str(path)],capture_output=True,text=True)
    return result.returncode==0

def no_binary_corruption(text:str)->bool:
    if '\ufffd' in text:
        return False
    return not any(ord(ch)<32 and ch not in '\n\r\t' for ch in text)

rows_block=between(core,'const ROWS=Object.freeze([',']);')
locator_block=between(core,'function getCurrentWorldStoryLocator112(){','function overlayClass')
capability_block=between(core,'function capability(ref){','function rowEligible')
x24_match=re.search(r'\{id:"konoha_alpha_eastern_drainage_trace"[^\n]+\}',rows_block)
x24=x24_match.group(0) if x24_match else ''

core_tag='<script src="runtime/alpha-world-konoha-112-core.js"></script>'
fix_tag='<script src="runtime/alpha-world-konoha-112-fix.js"></script>'
boot_tag='<script src="runtime/alpha-world-konoha-112.js"></script>'
next_tag='<script src="runtime/alpha-browser-playability-32500.js"></script>'

forbidden_domain_writes=[
    'commitCharacterAcquisition(',
    'confirmPromotion(',
    'commitPromotion(',
    'grantStat(',
    'grantProgression(',
    'playerData.rank=',
    'playerData.pl+=',
    'playerData.PL+=',
]

checks={
 'core_utf8_recovered':'Recovery note (2026-09-13)' in core and 'recoveredFromCorruptBlob:true' in core,
 'core_no_replacement_or_c0_corruption':no_binary_corruption(core),
 'fix_no_replacement_or_c0_corruption':no_binary_corruption(fix),
 'core_node_syntax':syntax_green(CORE),
 'fix_node_syntax':syntax_green(FIX),
 'existing_world_registry_reused':'registerWorldEventOpportunity({' in core and 'WORLD_EVENT_OPPORTUNITY_REGISTRY' in g,
 'existing_world_runtime_reused':all(x in core for x in ['setWorldEventLifecycle(','setOpportunityDiscovery(','setOpportunityActionability(','setOpportunityResolution(','setOpportunityTracking(']),
 'info_schema':'sc.worldInfoProjection.v1' in core,
 'locator_schema':'sc.worldStoryLocator.v1' in core,
 'manifest_id':'sc_world_alpha_activation_konoha_v1_2026_09_11' in core,
 'exact_24_rows':len(re.findall(r'\{id:"(?:konoha_|fire_arc1_pressure_)',rows_block))==24,
 'exact_pool_counts':rows_block.count('pool:STANDING')==13 and rows_block.count('pool:PRESSURE')==4 and rows_block.count('pool:RESPONSIVE')==7,
 'safe_public_12':'legalPublicTotal:12' in core and 'knownCount:12' in core,
 'known_restricted_is_explicit':'["KON-S01"]' in core and 'knownRestrictedCount:' in core,
 'zero_hidden_name_in_projection':'canonicalIdentityRevealed:false' in core and 'accessGranted:false' in core,
 'hidden_lab_identity_not_baked':"Orochimaru's Forgotten Laboratory" not in core,
 'x24_bounded_authority':all(x in x24 for x in ['host:"KON-O16"','category:"DISCOVERY"','reward:0','finite:true','"inspect_trace"','"preserve_report"','"follow_public_route"','"leave"']),
 'x24_exact_clue_gate':all(x in core for x in ['commitKonohaS02SuspicionTrace112','worldTruthSupportsSuspicion!==true','konoha_s02_suspicion_trace','canonicalIdentityRevealed:false','accessGranted:false']),
 'byakugan_requirement_exact':'skill_byakugan_peripheral_detail' in rows_block and 'skil_byakugan_peripheral_detail' not in rows_block,
 'semantic_overlay_classes':all(x in core for x in ['"MAIN_STORY"','"KNOWN_THREAT"','"DEVELOPMENT"','"RECORD_DISCOVERY"','"WORLD_ACTIVE"']),
 'main_story_not_known_unknown':'overlayClass:"MAIN_STORY"' in core and 'KNOWN_UNKNOWN' not in locator_block,
 'presentation_does_not_populate':'seedPopulation' not in core and '.innerHTML' not in core and 'insertAdjacentHTML' not in core,
 'no_fire_standing_geometry':not re.search(r'\{id:"fire_standing_',rows_block),
 'one_shot_ryo':'resolution.rewardGranted!==true' in core and 'playerData.ryo=' in core,
 'no_cross_domain_reward_mutation':all(x not in core+fix for x in forbidden_domain_writes) and 'worldOnly:true' in core,
 'responsive_fail_closed':all(x in capability_block for x in ['if(String(ref).startsWith("skill_"))','return false;']) and 'some(ref=>!capability(ref))' in core,
 'authoring_checkpoint_withheld':'WITHHELD_AUTHORING_CHECKPOINT' in locator_block,
 'locator_no_teleport':locator_block!='' and all(x not in locator_block for x in ['openRegionHub','travel(','teleport']),
 'core_diagnostic_exported':'runIssue112RecoveredCoreDiagnostics' in core and 'globalThis.runIssue112RecoveredCoreDiagnostics=' in core,
 'correction_diagnostic_exported':'runIssue112CorrectionDiagnostics' in fix and 'window.runIssue112CorrectionDiagnostics=' in fix,
 'parser_loads_core_once':i.count(core_tag)==1,
 'parser_loads_fix_once':i.count(fix_tag)==1,
 'dynamic_bootstrap_retired_from_index':boot_tag not in i,
 'parser_order_core_fix_downstream':i.find(core_tag)>=0 and i.find(core_tag)<i.find(fix_tag)<i.find(next_tag),
 'bootstrap_file_retained_only_as_legacy_artifact':('alpha-world-konoha-112-core.js' in boot and 'alpha-world-konoha-112-fix.js' in boot) if BOOT.exists() else True,
 'pressure_uses_live_m1_seam':'isAlphaArc1Mission1Complete()===true' in fix and 'occ_arc1_m1_story_complete' not in fix,
 'semantic_refill_after_committed_action':'executeSelectedOpportunityAction' in fix and 'result&&result.success===true' in fix and 'semanticRefill' in fix,
 'presentation_does_not_refill':not any(name in fix for name in ['renderVillageOverlay=function','renderAlphaKonohaVillageHotspots=function']),
 'existing_save_migration_idempotent':'world_activation_konoha_v1_pressure_migration_2026_09_12' in fix and 'if(!migrated' in fix,
 'm9_exact_veterinary_lead':all(x in fix for x in ['arc1_veterinary_ward_lead_01','story_locator_arc1_m9_veterinary_lead','hasCommittedAddress(M9_LEAD)']),
 'm9_lead_requires_committed_history':'row.committed!==true' in fix and 'function hasCommittedAddress' in fix,
 'm9_locator_fail_closed_without_lead':all(x in fix for x in ['story_locator_arc1_m9_no_current_focus','NO_CURRENT_MAP_FOCUS','hostLocationRef:null','localInstanceRef:null']),
 'browser_golden_not_claimed':'browserGoldenClaimed:false' in core and 'browserGoldenClaimed:false' in fix,
}

failed=[k for k,v in checks.items() if not v]
for k,v in checks.items():
    print(('PASS' if v else 'FAIL'),k)
print(f'Issue #112 recovered source/load-chain gate: {len(checks)-len(failed)}/{len(checks)} PASS')
if failed:
    print('FAILED:',failed)
    sys.exit(1)
