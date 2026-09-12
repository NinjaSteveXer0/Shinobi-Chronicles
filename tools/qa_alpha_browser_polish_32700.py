from pathlib import Path
import sys
root=Path(__file__).resolve().parents[1]
js=(root/'runtime'/'alpha-browser-polish-32700.js').read_text(encoding='utf-8')
index=(root/'index.html').read_text(encoding='utf-8')
checks={
 'card_click_executes':'onclick="activateBattlePreparedSkillCard' in js,
 'no_use_skill_button':'USE SKILL</button>' not in js,
 'skill_summary':'getBattleSkillPlainLanguageSummary' in js and 'academy_menma_shadow_clone_feint' in js,
 'branch_mode_auto_commit':'autoCommitted:true' in js,
 'pl_centering':'alpha-battle-pl-core{transform:translateY(-1px)' in js,
 'feed_positioning':'battle-runtime-log{left:43.05%' in js,
 'clan_click_no_assign':'inspectMyClanFormationSlotNoAssign' in js and 'onclick="inspectMyClanFormationSlotNoAssign' in js,
 'clan_drag_drop_preserved':'dropMyClanCharacterIntoSlot' in js and 'beginMyClanFormationDrag' in js,
 'browser_golden_not_claimed':'browserGoldenClaimed:false' in js,
}
if 'runtime/alpha-browser-polish-32700.js' in index:
    checks['index_after_32600']=index.index('runtime/alpha-battle-browser-32600.js') < index.index('runtime/alpha-browser-polish-32700.js')
for k,v in checks.items(): print(('PASS' if v else 'FAIL'),k)
print(f"\n{sum(checks.values())}/{len(checks)} PASS")
sys.exit(0 if all(checks.values()) else 1)
