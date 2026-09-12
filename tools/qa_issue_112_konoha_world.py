#!/usr/bin/env python3
from pathlib import Path
import re,sys
ROOT=Path(__file__).resolve().parents[1]
g=(ROOT/'game.js').read_text(encoding='utf-8')
core=(ROOT/'runtime/alpha-world-konoha-112-core.js').read_text(encoding='utf-8')
fix=(ROOT/'runtime/alpha-world-konoha-112-fix.js').read_text(encoding='utf-8')
boot=(ROOT/'runtime/alpha-world-konoha-112.js').read_text(encoding='utf-8')
i=(ROOT/'index.html').read_text(encoding='utf-8')
rows_block=core.split('const ROWS=')[1].split(']);',1)[0]
checks={
 'existing_world_registry_reused':'registerWorldEventOpportunity({' in core and 'WORLD_EVENT_OPPORTUNITY_REGISTRY' in g,
 'existing_world_runtime_reused':all(x in core for x in ['setWorldEventLifecycle(','setOpportunityDiscovery(','setOpportunityActionability(','setOpportunityResolution(','setOpportunityTracking(']),
 'info_schema':'sc.worldInfoProjection.v1' in core,
 'locator_schema':'sc.worldStoryLocator.v1' in core,
 'manifest_id':'sc_world_alpha_activation_konoha_v1_2026_09_11' in core,
 'exact_24_rows':len(re.findall(r'\{id:"(?:konoha_|fire_arc1_pressure_)',rows_block))==24,
 'safe_public_12':'legalPublicTotal:12' in core and 'knownCount:12' in core,
 'zero_hidden_name_in_projection':'canonicalIdentityRevealed:false' in core and 'accessGranted:false' in core,
 'x24_exact_clue':'konoha_s02_suspicion_trace' in core,
 'main_story_distinct':'data-semantic-overlay="MAIN_STORY"' in core and 'konoha-story-overlay' in core and 'konoha-opportunity-overlay' in core,
 'no_population_from_render':'seedPopulation' not in re.search(r'renderVillageOverlay=function\(container\)\{([\s\S]*?)return out;\};',core).group(1),
 'no_fire_standing_geometry':not re.search(r'\{id:"fire_standing_',rows_block),
 'one_shot_ryo':'state.rewardGranted!==true' in core,
 'no_generic_progression_rewards':all(x in core for x in ['plGranted:false','statGranted:false','rankGranted:false','progressionGranted:false']),
 'responsive_fail_closed':'return hasSkillAccess(req)' in core and 'every(requirement)' in core,
 'authoring_checkpoint_withheld':'WITHHELD_AUTHORING_CHECKPOINT' in core,
 'locator_no_teleport':all(x not in re.search(r'function storyLocator\(\)\{([\s\S]*?)\n  \}',core).group(1) for x in ['openRegionHub','travel','teleport']),
 'index_loads_112':'runtime/alpha-world-konoha-112.js' in i,
 'bootstrap_core_then_fix':boot.index('alpha-world-konoha-112-core.js') < boot.index('alpha-world-konoha-112-fix.js'),
 'pressure_uses_live_m1_seam':'isAlphaArc1Mission1Complete()===true' in fix and 'occ_arc1_m1_story_complete' not in fix,
 'semantic_refill_after_committed_action':'executeSelectedOpportunityAction' in fix and 'result&&result.success===true' in fix and 'semanticRefill' in fix,
 'presentation_does_not_refill':not any(name in fix for name in ['renderVillageOverlay=function','renderAlphaKonohaVillageHotspots=function']),
 'existing_save_migration_idempotent': 'world_activation_konoha_v1_pressure_migration_2026_09_12' in fix and 'if(!migrated' in fix,
}
failed=[k for k,v in checks.items() if not v]
for k,v in checks.items(): print(('PASS' if v else 'FAIL'),k)
print(f'Issue #112 source/headless gate: {len(checks)-len(failed)}/{len(checks)} PASS')
if failed: print('FAILED:',failed);sys.exit(1)
