# Academy Menma Origin — Three-Subject Whole-Encounter Reward Lock

**Date:** 2026-09-25  
**Owner:** World / Missions / Events / Rewards  
**Source handoff:** GitHub #361  
**Status:** **WORLD CLOSED — SUCCESSOR REWARD AUTHORITY / CODING REQUIRED**

## 1. Successor scope

This contract supersedes the old single-opponent Altered Shinobi tutorial reward **for new Academy Menma Scene 7 executions**.

Successor Battle authority:

- config: `academy_menma_origin_three_test_subjects_with_anko`;
- encounter: `origin_academy_menma_prologue:three_test_subjects`;
- objective: `stop_three_test_subjects`;
- allied participants:
  - `academy_menma` — player-controlled;
  - `sj_anko` — autonomous allied NPC;
- hostile participants:
  - `test_subject_altered_shinobi`;
  - `test_subject_brute`;
  - `test_subject_unstable`.

Victory exists only when all three exact hostile participants are resolved/withdrawn before Menma tutorial failure.

Withdrawing Altered Shinobi alone, or any two hostiles, is **not** a victory reward trigger.

## 2. Fixed whole-encounter reward

A committed victory over the complete successor encounter grants:

**100 Ryō immediate**

Stable World reward source:

`menma_origin_battle_three_test_subjects_victory_ryo_01`

This is one **whole-encounter** reward.

It is not:

- 50 Ryō per hostile;
- a bounty per withdrawal;
- a kill reward;
- a damage-share reward;
- a performance-bucket multiplier.

### Calibration

The old one-opponent tutorial reward was 50 Ryō.

The successor encounter requires resolution of three exact hostile participants and keeps Menma exposed to a materially larger encounter, so preserving only 50 Ryō would under-reward the new factual objective.

However, this is not calibrated as a solo 3-v-1 because:

- Anko is a genuine autonomous allied Battle participant;
- Anko may damage, bind, defend against, or withdraw hostiles;
- Menma is not required to personally cause all three withdrawals.

Therefore **100 Ryō** is the fixed successor whole-encounter payout.

## 3. Trigger predicate

The 100-Ryō entitlement commits only when the exact Battle result proves all of the following:

- battle config is `academy_menma_origin_three_test_subjects_with_anko`;
- encounter is `origin_academy_menma_prologue:three_test_subjects`;
- objective is `stop_three_test_subjects`;
- terminal Battle result is `victory`;
- all three exact hostile IDs are present in the resolved-hostile set;
- Menma did not already withdraw/finalise tutorial failure.

The exact Combat Battle occurrence remains the authoritative ancestry:

`battle_occ_origin_academy_menma_three_test_subjects:<sceneInstanceId>`

## 4. No partial payout

There is no fixed material payout from this source when:

- only Altered Shinobi withdraws;
- exactly two hostiles withdraw;
- Menma withdraws before objective completion;
- the Battle ends as tutorial defeat/not-completed;
- the encounter is abandoned before committed victory.

Do not resurrect the old 50-Ryō source as a mid-Battle claim when Altered Shinobi leaves the field.

## 5. Anko contribution does not split or remove the reward

The 100 Ryō is awarded for Menma successfully completing the authored tutorial encounter while remaining a valid tutorial participant.

Anko may legitimately cause one or more hostile withdrawals.

That does not:

- reduce the fixed whole-encounter reward;
- split cash into an Anko/player share;
- make Anko owned;
- make Anko's actions count as Menma's MEN-03 performance evidence.

Reward ownership and performance attribution remain separate.

## 6. Fixed non-cash contents

This successor fixed reward grants:

- Items: **none**;
- Weapons/equipment: **none**;
- materials: **none**;
- common drops: **none**;
- rare drops: **none**;
- generic Character EXP: **none / 0**.

The test subjects' equipment, bodies, altered condition, experimental materials, visible gear, or Orochimaru association do not create automatic loot.

## 7. Action-derived development remains separate

Menma may separately earn legitimate action-derived discipline/Stamina development from his own exact committed Battle actions under current Combat/Progression authority.

Preserve:

- fixed Battle cash != action-derived development;
- Anko actions != Menma development;
- MEN-03 performance evidence != fixed reward amount;
- victory does not multiply action-derived development;
- Battle loss does not erase already-committed legitimate action development.

No fixed discipline EXP amount is authored here.

## 8. MEN-03 boundary

The existing Menma tutorial-performance source remains:

`combat_academy_menma_tutorial_performance_resolved`

The fixed 100-Ryō payout does not vary by MEN-03 high/middle/low performance bucket.

A strong or weak successful performance may matter to Story/Progression/observer history under their own authority, but it does not alter this Battle cash amount.

## 9. Reward timing and idempotence

The reward is:

- Battle-result-owned;
- immediate after committed whole-encounter victory;
- claimable before Story resumes;
- one-shot per exact committed successor Battle occurrence.

Runtime must dedupe using:

- reward source ID;
- exact Battle occurrence ID;
- exact Story scene/occurrence provenance already carried by the Battle caller.

Save/load, browser refresh, reopening Victory, repeated claim input, Story return, or rerender must not duplicate the 100 Ryō.

## 10. Victory disclosure

The Battle Victory/result surface must show or be able to explain:

- **Ryō +100** — Academy Menma three-subject tutorial whole-encounter victory;
- Items/materials: none;
- generic Character EXP: none;
- exact Menma action-derived discipline/Stamina development, if any, with causal attribution;
- MEN-03 / deferred Story or Origin consequences separately rather than pretending they are part of the cash payout.

## 11. Supersession of old reward authority

Prior World authority:

`Documentation/World/Academy Menma Altered Shinobi Tutorial Victory Reward Lock 2026-09-25.md`

and reward source:

`menma_origin_battle_altered_shinobi_victory_ryo_01`

remain valid only for already-committed legacy/historical occurrences produced under the superseded one-opponent encounter authority.

For new Scene 7 executions:

- do not create the old single-opponent Battle;
- do not fire the old 50-Ryō source;
- do not migrate the old trigger onto Altered Shinobi withdrawal inside the successor Battle;
- use only `menma_origin_battle_three_test_subjects_victory_ryo_01` after full encounter victory.

Historical committed receipts remain historical truth and must not be rewritten.

## 12. Non-collapse

Preserve:

- one hostile withdrawal != Battle victory;
- three-hostile objective completion != three separate reward sources;
- Anko participation != ownership;
- Anko contribution != Menma performance;
- Battle PL 0 != death/injury;
- fixed cash != morality;
- fixed cash != Rank/PL/Base Stat gain;
- Battle victory != Origin completion;
- reward entitlement != presentation;
- Story return != second reward trigger.

## Final lock

> **Academy Menma + Anko defeating the complete three-test-subject Scene 7 encounter grants one immediate 100-Ryō Battle reward. No partial/per-subject payout exists, no fixed loot or generic Character EXP is added, and the old 50-Ryō Altered-only source is retired for new executions.**
