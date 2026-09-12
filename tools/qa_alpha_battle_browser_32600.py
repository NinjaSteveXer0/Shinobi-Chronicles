from pathlib import Path
import sys
root=Path(__file__).resolve().parents[1]
js=(root/'runtime'/'alpha-battle-browser-32600.js').read_text(encoding='utf-8')
index=(root/'index.html').read_text(encoding='utf-8')
checks={
    'wired_after_32500': index.find('alpha-browser-playability-32500.js') < index.find('alpha-battle-browser-32600.js') and index.find('alpha-battle-browser-32600.js') >= 0,
    'repeat_skill_reselects_through_normal_api': 'selectBattlePreparedSkill(usedSkillId)' in js,
    'no_repeat_bypass_flag': 'repeatStillUsesAuthoritativeAvailability:true' in js,
    'claim_auto_returns': 'continueAfterVictory()' in js and 'autoReturned:true' in js,
    'claim_happens_before_continue': js.find('priorClaimVictoryAutoReturn.apply') >= 0 and js.find('continueAfterVictory()', js.find('priorClaimVictoryAutoReturn.apply')) > js.find('priorClaimVictoryAutoReturn.apply'),
    'return_context_captured': 'returnContextBefore' in js,
    'feed_fonts_increased': 'font-size:clamp(8px,.61vw,10px)' in js and 'width:14.3%' in js,
    'browser_golden_not_claimed': 'browserGoldenClaimed:false' in js,
}
failed=[k for k,v in checks.items() if not v]
for k,v in checks.items(): print(f'{"PASS" if v else "FAIL"} {k}')
print(f'\n{sum(checks.values())}/{len(checks)} PASS')
sys.exit(1 if failed else 0)
