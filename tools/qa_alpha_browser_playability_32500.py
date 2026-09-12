from pathlib import Path
import re, sys
root=Path(__file__).resolve().parents[1]
js=(root/'runtime'/'alpha-browser-playability-32500.js').read_text(encoding='utf-8')
index=(root/'index.html').read_text(encoding='utf-8')
checks={
 'index_wired_after_world112': index.find('alpha-world-konoha-112.js') < index.find('alpha-browser-playability-32500.js') and index.find('alpha-browser-playability-32500.js')>=0,
 'my_clan_empty_drop': 'ondrop="dropMyClanCharacterIntoSlot' in js and 'ondragover="allowMyClanFormationDrop' in js,
 'my_clan_toggle_close': 'toggledClosed:true' in js,
 'my_clan_portrait_drag': 'beginMyClanCharacterDrag(event,CLAN_UI_STATE.selectedCharacterId)' in js,
 'training_close_to_village': 'currentOverlayType==="training"' in js and 'openOverlay("village")' in js,
 'konoha_p08_to_practical': 'String(locationId)==="KON-P08"' in js and 'openKonohaPracticalFromVillage()' in js,
 'fire_training_filtered': 'definition.locationId==="training_grounds"' in js,
 'village_info_layer': '.village-info-drawer{z-index:2600!important}' in js,
 'region_story_locator': 'getCurrentWorldStoryLocator' in js and 'NO REGIONAL PIN' in js,
 'battle_radial': 'alpha-battle-pl-ring' in js and 'getBattleRemainingPL' in js and 'getBattleMaximumPL' in js,
 'clone_feint_no_fake_damage': 'academy_menma_clone_feint' in js and 'no direct damage' in js,
 'claim_continue_separate': 'const priorClaimVictory=claimVictoryRewardsFromOverlay;' in js and 'const priorClaimVictory=continueAfterVictory' not in js,
 'browser_golden_not_claimed': 'browserGoldenClaimed:false' in js,
}
failed=[k for k,v in checks.items() if not v]
for k,v in checks.items(): print(f'{"PASS" if v else "FAIL"} {k}')
print(f'\n{sum(checks.values())}/{len(checks)} PASS')
sys.exit(1 if failed else 0)
