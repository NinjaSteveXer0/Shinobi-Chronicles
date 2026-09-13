from pathlib import Path
import subprocess, sys

root=Path(__file__).resolve().parents[1]
runtime=root/'runtime'/'alpha-mission-choice-generation-121.js'
binding=root/'runtime'/'alpha-mission-choice-production-bindings-121.js'
bridge=root/'runtime'/'alpha-traversal-bridge-33200.js'
errors=[]

if not runtime.exists():
    errors.append('runtime module missing')
else:
    source=runtime.read_text(encoding='utf-8')
    required=[
        'registerMissionSkeleton121','ensureMissionChoiceSet121','commitMissionIntent121',
        'markMissionAnchor121','canCompleteMission121','completeMission121',
        'immutable_committed_state_ref_required','allowCommittedStateSupersession',
        'selectedProtagonistIntent','resolverResultRef','perceivableNpcIntent',
        'mandatory_anchors_missing','authored_completion_predicate_unsatisfied',
        'bindStoryDecision121','ceDecision121','browserGoldenClaimed:false'
    ]
    for token in required:
        if token not in source:
            errors.append(f'missing runtime token: {token}')
    for token in ['fetch(','XMLHttpRequest','openai','ChatGPT','Math.random(']:
        if token in source:
            errors.append(f'unsafe/unbounded generation dependency present: {token}')
    syntax=subprocess.run(['node','--check',str(runtime)],capture_output=True,text=True)
    if syntax.returncode:
        errors.append('node syntax failed: '+syntax.stderr.strip())

if not binding.exists():
    errors.append('production binding module missing')
else:
    source=binding.read_text(encoding='utf-8')
    required=[
        'scene_arc1_m11_moroboshi_confrontation','m11_recall_intent',
        'd5a2d9577e45e1dbefb55c0202bb0327aa94e811',
        'commitAlphaM11RecallIntent','permit_recall','permit_recall_substitute',
        'access:identity_rebinding','nextBeatId:"m11_battle"',
        'bindStoryDecision','browserGoldenClaimed:false'
    ]
    for token in required:
        if token not in source:
            errors.append(f'missing production binding token: {token}')
    if 'accessRefs:identityAccess?[ACCESS_REF]:[]' not in source or 'capabilityRefs:[]' not in source:
        errors.append('Identity Rebinding Access collapsed into capability/other semantic lane')
    for token in ['Math.random(','fetch(','XMLHttpRequest','commitCharacterAcquisition(']:
        if token in source:
            errors.append(f'production binding contains unauthorised dependency/mutation: {token}')
    syntax=subprocess.run(['node','--check',str(binding)],capture_output=True,text=True)
    if syntax.returncode:
        errors.append('production binding node syntax failed: '+syntax.stderr.strip())

if not bridge.exists():
    errors.append('33200 activation bridge missing')
else:
    source=bridge.read_text(encoding='utf-8')
    if 'alpha-mission-choice-generation-121.js' not in source:
        errors.append('runtime not activated from 33200')
    if 'SC_ALPHA_MISSION_CHOICE_121' not in source:
        errors.append('activation duplicate guard missing')
    if 'alpha-mission-choice-production-bindings-121.js' not in source:
        errors.append('production binding not activated from 33200')
    if 'engine.addEventListener("load",loadBindings121,{once:true})' not in source:
        errors.append('production binding does not wait for choice-engine load')

if errors:
    for error in errors:
        print('FAIL:',error)
    sys.exit(1)

print('PASS issue #121 source/load + production-binding gate')
