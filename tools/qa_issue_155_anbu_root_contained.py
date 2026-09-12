#!/usr/bin/env python3
from __future__ import annotations
import json, sys
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
RUNTIME=ROOT/'runtime'/'alpha-anbu-root-contained-155.js'
INDEX=ROOT/'index.html'
EXPECTED_ANBU=[
'anbu_hq_hotspot_secure_threshold','anbu_hq_hotspot_transit_hall','anbu_hq_hotspot_operations_concourse','anbu_hq_hotspot_briefing_chamber','anbu_hq_hotspot_records_annex','anbu_hq_hotspot_equipment_bay','anbu_hq_hotspot_observation_gallery','anbu_hq_hotspot_lower_service_junction']
EXPECTED_ROOT=[
'root_hq_hotspot_concealed_threshold','root_hq_hotspot_silent_concourse','root_hq_hotspot_training_assessment_hall','root_hq_hotspot_records_vault','root_hq_hotspot_interview_chamber','root_hq_hotspot_operations_gallery','root_hq_hotspot_command_chamber','root_hq_hotspot_sealed_lower_junction']

def main()->int:
    src=RUNTIME.read_text(encoding='utf-8') if RUNTIME.exists() else ''
    idx=INDEX.read_text(encoding='utf-8') if INDEX.exists() else ''
    tag='<script src="runtime/alpha-anbu-root-contained-155.js"></script>'
    checks={
      'runtime_exists':RUNTIME.exists(),
      'index_exists':INDEX.exists(),
      'loaded_once':idx.count(tag)==1,
      'exact_patch_id':'issue155_anbu_root_contained_local_areas_2026_09_13' in src,
      'exact_assets':'Konoha Locations/anbu_hq.png' in src and 'Konoha Locations/root_hq.png' in src,
      'exact_blobs':'af1d79954715510b07415cbca71c4feb7a70b5e5' in src and '1e321a3ac16b44ff8f12b54afcf36dc6f81f836a' in src,
      'all_16_ids':all(x in src for x in EXPECTED_ANBU+EXPECTED_ROOT),
      'reuses_local_area_registry':'registerLocalMissionArea' in src and 'openLocalMissionArea' in src,
      'reuses_world_projection':'registerWorldEventOpportunity' in src and 'revealPredicate' in src,
      'strict_story_subset':'storyAuthorizedHotspotIds' in src and 'contained_area_authorised_hotspot_subset_invalid' in src,
      'temporary_access_only':'STORY_TEMPORARY' in src and 'ESCORTED_TEMPORARY' in src and 'NO_ACCESS' in src,
      'no_projection_actions':'interactions:[]' in src and 'randomPoolEligible:false' in src,
      'separate_exterior_facts':'anbu_hq_exterior_location_confirmed' in src and 'root_hq_exterior_location_confirmed' in src and 'exteriorLocationConfirmed:false' in src,
      'diagnostic_no_save_fixture':'saveState=false' in src or 'saveState:false' in src,
      'browser_golden_not_claimed':'browserGoldenClaimed:false' in src,
    }
    failed=[k for k,v in checks.items() if not v]
    print(json.dumps({'pass':not failed,'checks':checks,'failed':failed,'browserGoldenClaimed':False},indent=2,sort_keys=True))
    return 0 if not failed else 1
if __name__=='__main__':sys.exit(main())
