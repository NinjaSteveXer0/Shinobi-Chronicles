from pathlib import Path
import subprocess,sys

root=Path(__file__).resolve().parents[1]
source=(root/'runtime'/'alpha-origin-scenes-32900-b.js').read_text(encoding='utf-8')
binder=(root/'runtime'/'alpha-origin-scene-board-bindings-105.js').read_text(encoding='utf-8')
shim336=(root/'runtime'/'alpha-early-story-modernization-33600.js').read_text(encoding='utf-8')
shim337=(root/'runtime'/'alpha-origin-screen-first-33700.js').read_text(encoding='utf-8')
errors=[]

required_source=[
    'entryBeatId:"kus_practical_01"',
    'C("protect_student","GET THE STUDENT CLEAR","kus_protect_student_01"',
    'C("contain_damaged_seal","CONTAIN THE DAMAGED SEAL","kus_contain_seal_01"',
    'C("move_unstable_object","MOVE THE SCROLL TO THE SAFETY LANE","kus_move_object_01"',
    'C("correct_formula","CORRECT THE FORMULA","kus_reverse_01"',
    'The formula folds inward. Not like paper.',
    'A toad is sitting in the middle of the Academy courtyard.',
    'D("kus_route_d_close_08","KUSHINA","That\'s what I said.","kus_receipt")',
    '{beatId:"kus_receipt",mode:"record",environmentRef:courtyard,text:"",exitScene:true}',
    'N("kus_protect_close_08","Kushina grins.\\n\\nThey leave the courtyard.","kus_receipt"',
    'N("kus_contain_close_11","She leaves.","kus_receipt"',
    'N("kus_move_close_10","They keep walking.","kus_receipt"',
    'gerotoraFirstContactOccurred:true',
    'qualifyingFuinjutsuWorkCompleted:["correct_formula","contain_damaged_seal"].includes(ctx.kushinaCrisisChoice)',
    'Scene backdrops/academy_training_ground_courtyard.png'
]
for token in required_source:
    if token not in source:
        errors.append('missing source token: '+token)


for retired in [
    'That is not how that sentence works.',
    'Would you prefer I complain?',
    'You just threw a seal.',
    "I'm thrilled.",
]:
    if retired in source:
        errors.append('retired Kushina dialogue returned: '+retired)

if 'kus_ordinary_end' in source:
    errors.append('stale shared ordinary ending remains')
if 'No unchosen summon history is fabricated.' in source:
    errors.append('implementation guardrail still player-facing')

required_binder=[
    'function buildKushinaReceipt105()',
    'if(id==="kus_receipt")return[]',
    'id.startsWith("kus_gero_")',
    'kus_receipt:()=>[{kind:"record",text:buildKushinaReceipt105()}]'
]
for token in required_binder:
    if token not in binder:
        errors.append('missing binder token: '+token)

k0=binder.find('function kushinaActors(')
k1=binder.find('function kurenaiActors(',k0)
kushina_actor_body=binder[k0:k1] if k0>=0 and k1>k0 else ''
for forbidden in ['id.startsWith("kus_reverse_")','id.startsWith("kus_after_gero_")','id.startsWith("kus_route_d_")']:
    if forbidden in kushina_actor_body:
        errors.append('Gerotora actor leaks outside summoned interval: '+forbidden)

for name,shim in [('33600',shim336),('33700',shim337)]:
    if 'live.entryBeatId==="kus_practical_01"' not in shim or 'beat(live,"kus_route_d_close_08")' not in shim:
        errors.append(name+' does not stand down for native Kushina benchmark')

asset=root/'Scene backdrops'/'academy_training_ground_courtyard.png'
if not asset.is_file():
    errors.append('approved backdrop file missing')
elif asset.read_bytes()[:8] != b'\x89PNG\r\n\x1a\n':
    errors.append('approved backdrop is not PNG')

for js in [
    root/'runtime'/'alpha-origin-scenes-32900-b.js',
    root/'runtime'/'alpha-origin-scene-board-bindings-105.js',
    root/'runtime'/'alpha-early-story-modernization-33600.js',
    root/'runtime'/'alpha-origin-screen-first-33700.js'
]:
    syntax=subprocess.run(['node','--check',str(js)],capture_output=True,text=True)
    if syntax.returncode:
        errors.append('node syntax failed '+js.name+': '+syntax.stderr.strip())

if errors:
    for e in errors:
        print('FAIL:',e)
    sys.exit(1)

print('PASS issue #171 Kushina benchmark/ending/staging source gate')
print('browserGoldenClaimed=false')
