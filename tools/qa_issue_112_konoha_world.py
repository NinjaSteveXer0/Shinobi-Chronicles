#!/usr/bin/env python3
from pathlib import Path
import re,sys
ROOT=Path(__file__).resolve().parents[1]
g=(ROOT/'game.js').read_text(encoding='utf-8')
p=(ROOT/'runtime/alpha-world-konoha-112.js').read_text(encoding='utf-8')
i=(ROOT/'index.html').read_text(encoding='utf-8')
checks={
 'existing_world_registry_reused':'registerWorldEventOpportunity({' in p and 'WORLD_EVENT_OPPORTUNITY_REGISTRY' in g,
 'existing_world_runtime_reused':all(x in p for x in ['setWorldEventLifecycle(','setOpportunityDiscovery(','setOpportunityActionability(','setOpportunityResolution(','setOpportunityTracking(']),
 'info_schema':'sc.worldInfoProjection.v1' in p,
 'locator_schema':'sc.worldStoryLocator.v1' in p,
 'manifest_id':'sc_world_alpha_activation_konoha_v1_2026_09_11' in p,
 'exact_24_rows':len(re.findall(r'\{id:"(?:konoha_|fire_arc1_pressure_)',p.split('const ROWS=')[1].split(']);',1)[0]))==24,
 'safe_public_12':'legalPublicTotal:12' in p and 'knownCount:12' in p,
 'zero_hidden_name_in_projection':'canonicalIdentityRevealed:false' in p and 'accessGranted:false' in p,
 'x24_exact_clue':'konoha_s02_suspicion_trace' in p,
 'main_story_distinct':'data-semantic-overlay="MAIN_STORY"' in p and 'konoha-story-overlay' in p and 'konoha-opportunity-overlay' in p,
 'no_population_from_render':'seedPopulation' not in re.search(r'renderVillageOverlay=function\(container\)\{([\s\S]*?)return out;\};',p).group(1),
 'no_fire_standing_geometry':not re.search(r'\{id:"fire_standing_',p.split('const ROWS=')[1].split(']);',1)[0]),
 'one_shot_ryo':'state.rewardGranted!==true' in p,
 'no_generic_progression_rewards':all(x in p for x in ['plGranted:false','statGranted:false','rankGranted:false','progressionGranted:false']),
 'responsive_fail_closed':'return hasSkillAccess(req)' in p and 'every(requirement)' in p,
 'authoring_checkpoint_withheld':'WITHHELD_AUTHORING_CHECKPOINT' in p,
 'locator_no_teleport':all(x not in re.search(r'function storyLocator\(\)\{([\s\S]*?)\n  \}',p).group(1) for x in ['openRegionHub','travel','teleport']),
 'index_activation_pending':'runtime/alpha-world-konoha-112.js' in i,
}
failed=[k for k,v in checks.items() if not v]
for k,v in checks.items(): print(('PASS' if v else 'FAIL'),k)
print(f'Issue #112 source gate: {len(checks)-len(failed)}/{len(checks)} PASS')
if failed: print('FAILED:',failed);sys.exit(1)
