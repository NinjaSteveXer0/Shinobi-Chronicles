#!/usr/bin/env python3
from pathlib import Path
import hashlib, subprocess, sys

ROOT=Path(__file__).resolve().parents[1]
game=(ROOT/'game.js').read_text(encoding='utf-8')
patch=(ROOT/'runtime/alpha-genin-roster-63.js').read_text(encoding='utf-8')
index=(ROOT/'index.html').read_text(encoding='utf-8')
runtime_qa=ROOT/'tools/qa_issue_63_genin_v2_runtime.js'

def git_blob_sha(text:str)->str:
    raw=text.encode('utf-8')
    return hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()

V1=[
'genin_boruto','genin_chocho','genin_himawari','genin_hinata','genin_hoki','genin_karin','genin_menma','genin_mikoto','genin_mitsuki','genin_naruto','genin_orochimaru','genin_sarada','genin_sasuke'
]
V2_NEW=[
'genin_hashirama','genin_hiruzen','genin_mito','genin_tsunade','genin_sakumo','genin_duy','genin_guy','genin_rin','genin_dan','genin_nawaki','genin_shizune','genin_yamato','genin_sai','genin_kagami','genin_danzo','genin_torifu','genin_inoichi','genin_choza','genin_shibi','genin_tsume','genin_hiashi','genin_yugao','genin_hayate','genin_mukai','genin_kosuke'
]
LEADERS=['jonin_hanabi','jonin_inojin','jonin_konohamaru','jonin_kushina','jonin_sasuke','jonin_shikaku','jonin_shino','sj_anko','sj_ebisu','sj_genma','sj_ibiki','sj_kiba','sj_nono']
checks={}
checks['audited_game_blob_preserved']=git_blob_sha(game)=='9a95e018ac76b993c22b62ed6aa02be5520e97b1'
core_pos=index.find('runtime/alpha-world-konoha-112-core.js')
fix_pos=index.find('runtime/alpha-world-konoha-112-fix.js')
roster_pos=index.find('runtime/alpha-genin-roster-63.js')
checks['script_loaded_after_112_core_fix']=core_pos>=0 and fix_pos>=0 and roster_pos>=0 and core_pos < fix_pos < roster_pos
checks['legacy_112_dynamic_bootstrap_retired']='src="runtime/alpha-world-konoha-112.js"' not in index and "src='runtime/alpha-world-konoha-112.js'" not in index
checks['v1_policy_preserved']='alpha_genin_roster_first_production_content_v1' in patch
checks['v2_policy_exact']='alpha_genin_roster_first_production_content_v2' in patch
checks['exact_v1_ids']=all(f'"{x}"' in patch for x in V1)
checks['exact_25_expansion_ids']=all(f'"{x}"' in patch for x in V2_NEW) and len(V2_NEW)==25
checks['exact_38_authored']='V2_TEAMMATES=Object.freeze([...V1_TEAMMATES,...V2_EXPANSION])' in patch
checks['leader_union_13']=all(f'"{x}"' in patch for x in LEADERS) and len(LEADERS)==13
checks['explicit_content_no_registry_scan']='V2_TEAMMATE_IDS' in patch and 'candidateContentPolicyId' in patch
checks['stable_person_authority']=all(('person_' in patch and x in patch) for x in V2_NEW)
checks['dedicated_assets']='Assets/Genin/${id}.png' in patch and 'Portraits/Genin/${id}.png' in patch
checks['baseline_palettes']='PRODUCTION_PREPARED_SKILL_PALETTES' in patch and all(x in patch for x in V2_NEW)
checks['no_base_live_registry_count_mutation']='ALPHA_PRODUCTION_CHARACTER_IDS.push' not in patch and 'ALPHA_PRODUCTION_CHARACTER_IDS=' not in patch
checks['lineage_pinning']='candidateContentPolicyId' in patch and 'candidate_content_policy_lineage_migration_forbidden' in patch
checks['explicit_recruitment']='commitGeninRosterTransitionRecruitment' in patch and 'genin_roster_transition_recruitment' in patch
checks['recruitment_not_assignment']='assignmentCommitted:false' in patch and 'recruitmentDoesNotAssign:true' in patch
checks['stale_snapshot_fail_closed']='stale_candidate_snapshot_recruitment' in patch and 'expectedSnapshotId' in patch
checks['reservation_state']='reservedGeninVariantIds' in patch and 'reservedLeaderVariantId' in patch and 'reservationProvenance' in patch
checks['save_reserves_continue_assigns']='saveGeninRosterTransitionReservations' in patch and 'finalisationState' in patch and 'confirmGeninRosterTransition' in patch
checks['retention_exception']='exceptional' in patch and 'retentionEligibleVariantIds' in patch and 'commitGeninRosterTransitionCandidateUnavailable' in patch
checks['record_objective']='Complete Your Genin Team' in patch and 'Complete your team in Arena' in patch
checks['observer_safe_passive_updates']='recordVisible' in patch and 'getIssue63ObserverSafeTeamFormationUpdates' in patch

EXACT_STATS={
'genin_hashirama':(36,(36,30,25,18,18,21,39)),
'genin_hiruzen':(33,(34,29,31,22,20,28,32)),
'genin_mito':(33,(27,20,18,34,22,24,35)),
'genin_tsunade':(31,(24,32,18,16,20,17,34)),
'genin_sakumo':(34,(30,32,36,17,18,22,31)),
'genin_duy':(28,(16,29,20,10,12,12,31)),
'genin_guy':(31,(18,33,22,11,12,14,34)),
'genin_rin':(25,(25,20,18,22,17,22,26)),
'genin_dan':(27,(26,23,21,17,18,28,25)),
'genin_nawaki':(21,(20,20,18,13,14,16,22)),
'genin_shizune':(26,(26,21,19,19,22,21,27)),
'genin_yamato':(30,(31,25,23,22,23,21,32)),
'genin_sai':(30,(28,25,31,19,18,24,28)),
'genin_kagami':(30,(31,29,26,18,19,30,29)),
'genin_danzo':(29,(29,25,27,24,28,22,30)),
'genin_torifu':(29,(22,28,25,16,18,17,31)),
'genin_inoichi':(28,(25,20,18,16,17,30,24)),
'genin_choza':(30,(22,29,25,16,18,16,32)),
'genin_shibi':(28,(27,21,20,18,20,27,29)),
'genin_tsume':(29,(22,30,28,14,16,18,31)),
'genin_hiashi':(31,(24,33,25,18,17,27,31)),
'genin_yugao':(29,(21,27,31,15,16,22,27)),
'genin_hayate':(28,(22,26,30,16,16,23,26)),
'genin_mukai':(30,(24,31,27,17,18,23,30)),
'genin_kosuke':(28,(24,26,29,16,17,20,28)),
}
checks['exact_25_stat_pl_packages']=all(
    f'{rid}:{{' in patch
    and f'basePL:{pl}' in patch[patch.index(f'{rid}:{{'):patch.index(f'{rid}:{{')+360]
    and f'baseStats:{{nin:{stats[0]},tai:{stats[1]},buki:{stats[2]},fuin:{stats[3]},kin:{stats[4]},gen:{stats[5]},stamina:{stats[6]}}}' in patch
    for rid,(pl,stats) in EXACT_STATS.items()
)

checks['node_runtime_qa_present']=runtime_qa.exists()
failed=[k for k,v in checks.items() if not v]
for k,v in checks.items(): print(f"{'PASS' if v else 'FAIL'}  {k}")
print(f"\nIssue #63 static/source gate: {len(checks)-len(failed)}/{len(checks)} PASS")
if failed:
    print('FAILED:',', '.join(failed)); sys.exit(1)
res=subprocess.run(['node',str(runtime_qa)],cwd=ROOT,text=True,capture_output=True)
print(res.stdout.rstrip())
if res.returncode:
    print(res.stderr.rstrip()); sys.exit(res.returncode)
