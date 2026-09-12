#!/usr/bin/env python3
from pathlib import Path
import subprocess, sys
ROOT=Path(__file__).resolve().parents[1]
INDEX=ROOT/'index.html'
FILES=[
 'runtime/alpha-journey-surface-32800.js',
 'runtime/alpha-origin-scenes-32900-core.js',
 'runtime/alpha-origin-scenes-32900-a.js',
 'runtime/alpha-origin-scenes-32900-b.js',
 'runtime/alpha-origin-scenes-32900-c.js',
 'runtime/alpha-origin-scenes-32900-integrator.js',
 'tools/qa_alpha_origin_scenes_32900_runtime.js'
]
checks={}
for rel in FILES: checks[f'exists:{rel}']=(ROOT/rel).is_file()
index=INDEX.read_text(encoding='utf-8') if INDEX.exists() else ''
order=['alpha-genin-roster-63.js','alpha-journey-surface-32800.js','alpha-origin-scenes-32900-core.js','alpha-origin-scenes-32900-a.js','alpha-origin-scenes-32900-b.js','alpha-origin-scenes-32900-c.js','alpha-origin-scenes-32900-integrator.js']
pos=[index.find(x) for x in order]
checks['production_activation_all_present']=all(x>=0 for x in pos)
checks['production_activation_order']=checks['production_activation_all_present'] and pos==sorted(pos) and len(set(pos))==len(pos)
if (ROOT/'runtime/alpha-journey-surface-32800.js').exists():
 s=(ROOT/'runtime/alpha-journey-surface-32800.js').read_text(encoding='utf-8')
 checks['32800_modern_world_dossier']='alpha328-event' in s and 'executeSelectedOpportunityAction' in s
 checks['32800_journey_frontier']='CURRENT FRONTIER' in s and 'UNLOCKS AFTER GENIN TEAM' in s
 checks['32800_arena_four_routes']=all(x in s for x in ['openArenaPromotionSurface','staged','pvp','tournament'])
 checks['32800_no_arena_main_asset_dependency']='arena_main.png' not in s
for rel in FILES[1:6]:
 p=ROOT/rel
 if p.exists():
  r=subprocess.run(['node','--check',str(p)],capture_output=True,text=True)
  checks[f'syntax:{rel}']=r.returncode==0
qa=ROOT/'tools/qa_alpha_origin_scenes_32900_runtime.js'
if qa.exists():
 r=subprocess.run(['node',str(qa)],capture_output=True,text=True)
 checks['32900_runtime_harness']=r.returncode==0 and '"pass": true' in r.stdout
 if r.stdout: print(r.stdout.strip())
 if r.stderr: print(r.stderr.strip(),file=sys.stderr)
checks['browser_golden_claimed']=False
failed=[k for k,v in checks.items() if k!='browser_golden_claimed' and v is not True]
for k,v in checks.items(): print(f"{'PASS' if (v is True or (k=='browser_golden_claimed' and v is False)) else 'FAIL'} {k}")
print(f"RESULT: {'PASS' if not failed else 'FAIL'} ({len(checks)-len(failed)}/{len(checks)})")
if failed: print('FAILED:',', '.join(failed));sys.exit(1)
