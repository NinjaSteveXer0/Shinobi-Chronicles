from pathlib import Path
import subprocess, sys

root=Path(__file__).resolve().parents[1]
runtime=root/'runtime'/'alpha-mission-choice-generation-121.js'
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

if not bridge.exists():
    errors.append('33200 activation bridge missing')
else:
    source=bridge.read_text(encoding='utf-8')
    if 'alpha-mission-choice-generation-121.js' not in source:
        errors.append('runtime not activated from 33200')
    if 'SC_ALPHA_MISSION_CHOICE_121' not in source:
        errors.append('activation duplicate guard missing')

if errors:
    for error in errors:
        print('FAIL:',error)
    sys.exit(1)

print('PASS issue #121 source/load gate')
