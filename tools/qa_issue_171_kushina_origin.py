from pathlib import Path
import subprocess,sys

root=Path(__file__).resolve().parents[1]
source=(root/'runtime'/'alpha-origin-scenes-32900-b.js').read_text(encoding='utf-8')
errors=[]

required=[
'konoha_academy_courtyard_day',
'Scene backdrops/academy_training_ground_courtyard.png',
'protect_student","Physically remove / protect the endangered student","kus_protect_student_01',
'contain_damaged_seal","Complete / contain the damaged seal","kus_contain_seal_01',
'move_unstable_object","Move the unstable object to a safer place","kus_move_object_01',
'kus_protect_student_01','kus_protect_student_02','kus_protect_student_03','kus_protect_student_04',
'kus_contain_seal_01','kus_contain_seal_02','kus_contain_seal_03','kus_contain_seal_04',
'kus_move_object_01','kus_move_object_02','kus_move_object_03','kus_move_object_04',
'correct_formula","Correct the sealing formula through Fūinjutsu","kus_reverse',
'gerotoraFirstContactOccurred:true',
'qualifyingFuinjutsuWorkCompleted:["correct_formula","contain_damaged_seal"].includes(ctx.kushinaCrisisChoice)'
]
for token in required:
    if token not in source: errors.append('missing token: '+token)

if 'kus_ordinary_end' in source: errors.append('stale two-page ordinary ending remains')
if 'No unchosen summon history is fabricated.' in source: errors.append('implementation guardrail still player-facing')

for beat in ['kus_crisis','kus_reverse','kus_gero_1','kus_gero_2','kus_gero_3','kus_contact_choice','kus_close','kus_answer','kus_last']:
    marker=f'beatId:"{beat}"'
    pos=source.find(marker)
    if pos<0 or 'environmentRef:courtyard' not in source[pos:pos+260]: errors.append('missing courtyard environment: '+beat)

for prefix in ['kus_protect_student_','kus_contain_seal_','kus_move_object_']:
    for i in range(1,5):
        beat=f'{prefix}0{i}'
        pos=source.find(f'beatId:"{beat}"')
        if pos<0 or 'environmentRef:courtyard' not in source[pos:pos+520]: errors.append('missing courtyard environment: '+beat)

asset=root/'Scene backdrops'/'academy_training_ground_courtyard.png'
if not asset.is_file(): errors.append('approved backdrop file missing')
else:
    data=asset.read_bytes()[:8]
    if data != b'\x89PNG\r\n\x1a\n': errors.append('approved backdrop is not PNG')

syntax=subprocess.run(['node','--check',str(root/'runtime'/'alpha-origin-scenes-32900-b.js')],capture_output=True,text=True)
if syntax.returncode: errors.append('node syntax failed: '+syntax.stderr.strip())

if errors:
    for e in errors: print('FAIL:',e)
    sys.exit(1)
print('PASS issue #171 Kushina branch/backdrop source gate')
print('browserGoldenClaimed=false')
