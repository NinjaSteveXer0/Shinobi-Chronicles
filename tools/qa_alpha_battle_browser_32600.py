from pathlib import Path
import sys
# #544 clean exact-head owner-authored fan-out marker; no runtime semantics.
root=Path(__file__).resolve().parents[1]
js=(root/'runtime'/'alpha-battle-browser-32600.js').read_text(encoding='utf-8')
index=(root/'index.html').read_text(encoding='utf-8')
checks={
    'wired_after_32500': index.find('alpha-browser-playability-32500.js') < index.find('alpha-battle-browser-32600.js') and index.find('alpha-battle-browser-32600.js') >= 0,
    'repeat_skill_reselects_through_normal_api': 'selectBattlePreparedSkill(usedSkillId)' in js,
    'no_repeat_bypass_flag': 'repeatStillUsesAuthoritativeAvailability:true' in js,
    'caller_owned_claim_does_not_auto_return': 'if(callerOwned||' in js and 'callerResumeWithheldUntilExplicitContinue:true' in js and 'autoReturned:false' in js,
    'explicit_post_claim_continue_supported': 'requiresExplicitPostClaimContinue' in js and 'explicitPostClaimContinue:true' in js,
    'claim_happens_before_later_continue': js.find('priorClaimVictoryAutoReturn.apply') >= 0 and js.find('callerResumeWithheldUntilExplicitContinue:true', js.find('priorClaimVictoryAutoReturn.apply')) > js.find('priorClaimVictoryAutoReturn.apply'),
    'return_context_captured_and_restored': 'returnContextBefore' in js and 'currentBattle.returnContext' in js,
    'ordinary_no_caller_battle_keeps_generic_continue': 'callerOwned:false' in js and 'callerResult=continueAfterVictory()' in js,
    'feed_fonts_increased': 'font-size:clamp(8px,.61vw,10px)' in js and 'width:14.3%' in js,
    'browser_golden_not_claimed': 'browserGoldenClaimed:false' in js,
}
failed=[k for k,v in checks.items() if not v]
for k,v in checks.items(): print(f'{"PASS" if v else "FAIL"} {k}')
print(f'\n{sum(checks.values())}/{len(checks)} PASS')
sys.exit(1 if failed else 0)
