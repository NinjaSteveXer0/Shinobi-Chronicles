# Shinobi Chronicles — Academy Mirai Origin — Shortcut Battle Attack + Reveal Exact Story

**Date:** 2026-09-30  
**Owner:** Stephen / Writing — Konoha  
**Status:** **OWNER-DIRECT EXACT STORY — BINDING PREVIEW AUTHORITY / MIRAI NOT GOLDEN UNTIL BROWSER RETEST**  
**Origin:** `academy_mirai`

## 1. Consumed causal authority

This exact player-facing package consumes:

`Documentation/Story/Academy_Mirai_PL_Battle_Reveal_Trigger_and_Post_Battle_Causality_2026-09-30.md`

@ `bd1ceddb8bc9044911d99cb31034235ac9f91bc3`

Binding law:

> **The apparent Traveller attacking Mirai is the red flag. The Battle occurrence triggers the Story reveal. Victory reveals. Defeat reveals.**

This file supplies the exact player-facing shortcut scene and post-Battle return.

## 2. Retired shortcut material

Do not render any of the following:

- `Your instructor gave me one extra job.`
- `See what you do if the person you're escorting stops cooperating.`
- `This is part of the assessment.`
- any calm pre-Battle agreement that explains the attack away;
- any shortcut-victory continuation where the substitute remains disguised;
- any shortcut-victory continuation where Mirai resumes escorting the substitute.

The apparent Traveller does **not** announce the test before attacking.

---

# 3. SHORTCUT — THE ATTACK

Preserve the existing route through the point where Mirai has followed the apparent Traveller into the storehouse-side lane and the main road is behind them.

Then:

## `mir_shortcut_attack_01` — narration

The Traveller slows near the next turn.

Mirai checks the lane ahead.

When she looks back, he is facing her.

## `mir_shortcut_attack_02` — dialogue — MIRAI

**MIRAI:** “What is it?”

## `mir_shortcut_attack_03` — narration

He moves first.

Not toward the checkpoint.

Toward her.

Mirai catches the strike on her forearm and steps back.

## `mir_shortcut_attack_04` — dialogue — MIRAI

**MIRAI:** “What are you doing?”

## `mir_shortcut_attack_05` — narration

The Traveller does not answer.

He comes at her again.

The route map stops mattering.

The person Mirai is supposed to protect is attacking her.

She raises her guard.

### CTA

**Start PL Battle**

Launch existing caller:

`academy_mirai_origin_shortcut_battle`

using existing config:

`academy_mirai_origin_disguised_instructor_battle`

No Battle mechanics change.

---

# 4. SHARED POST-BATTLE REVEAL LAW

For either terminal result:

`victory | defeat`

the next Story state is the reveal family.

There is no post-Battle disguised-escort continuation.

There is no return to ordinary Scene 5 before reveal.

The Battle itself has made the escort relationship impossible to treat as normal.

---

# 5. VICTORY -> REVEAL

## `mir_shortcut_victory_reveal_01` — narration

The Traveller's guard breaks first.

Mirai does not follow him when he gives ground.

She keeps her hands up.

## `mir_shortcut_victory_reveal_02` — dialogue — MIRAI

**MIRAI:** “Don't move.”

The Traveller stays where he is.

## `mir_shortcut_victory_reveal_03` — dialogue — MIRAI

**MIRAI:** “You pulled me off the route and attacked me.”

Her eyes stay on him.

**MIRAI:** “Who are you?”

## `mir_shortcut_victory_reveal_04` — narration

Smoke rolls through the lane.

The man Mirai was escorting disappears inside it.

When the smoke clears, her Academy instructor is standing in his place.

Actor projection changes now:
- remove apparent Traveller / Escort card;
- project `NPC/mirai_instructor.png`;
- female instructor presentation from this point onward.

## `mir_shortcut_victory_reveal_05` — dialogue — MIRAI

**MIRAI:** “Where is he?”

## `mir_shortcut_victory_reveal_06` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “Checkpoint Three. Safe.”

Mirai looks toward the end of the lane.

## `mir_shortcut_victory_reveal_07` — dialogue — MIRAI

**MIRAI:** “Since when?”

## `mir_shortcut_victory_reveal_08` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “The market.”

Mirai's expression hardens.

She understands what changed.

### Transition

**BLACK WIPE**

Then:

**LATER — CHECKPOINT THREE**

This is debrief / aftermath.

It is not resumed escort gameplay.

---

# 6. DEFEAT -> REVEAL

Preserve Battle depletion:

`academy_mirai Remaining Battle PL = 0`

Mirai is withdrawn from the exchange.

Then:

## `mir_shortcut_defeat_reveal_01` — narration

Mirai's guard gives first.

She catches herself against the wall.

The Traveller stops immediately.

He does not attack again.

## `mir_shortcut_defeat_reveal_02` — dialogue — MIRAI

**MIRAI:** “Who are you?”

## `mir_shortcut_defeat_reveal_03` — narration

Smoke rolls through the lane.

When it clears, the Academy instructor stands where the Traveller had been.

Actor projection changes now:
- remove apparent Traveller / Escort card;
- project `NPC/mirai_instructor.png`;
- female instructor presentation from this point onward.

## `mir_shortcut_defeat_reveal_04` — dialogue — MIRAI

**MIRAI:** “Where is he?”

## `mir_shortcut_defeat_reveal_05` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “Checkpoint Three. Safe.”

Mirai pushes herself upright.

## `mir_shortcut_defeat_reveal_06` — dialogue — MIRAI

**MIRAI:** “Since when?”

## `mir_shortcut_defeat_reveal_07` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “The market.”

Mirai looks back toward the road they left.

She lost the exchange.

She did not imagine the contradiction.

### Transition

**BLACK WIPE**

Then:

**LATER — CHECKPOINT THREE**

Use the existing defeat-specific debrief/aftermath where compatible.

Do not resume escort gameplay.

---

# 7. CHECKPOINT AFTERMATH

For both shortcut Battle results, the real Traveller is already at Checkpoint Three.

He was not escorted there by Mirai after the Battle.

The checkpoint scene is:
- reveal aftermath;
- debrief;
- real-Traveller continuity;
- result-aware reflection.

It is not:
- substitute escort continuation;
- MIR-03 checkpoint-protection success;
- proof that Mirai completed the escort with the person who attacked her.

Victory and defeat should remain different in the debrief:

### Victory factual acknowledgement

Mirai won the controlled exchange against the disguised instructor.

### Defeat factual acknowledgement

Mirai was Battle-depleted by the disguised instructor.

Neither result changes the already-completed reveal.

---

# 8. KNOWLEDGE / CONSEQUENCE RESULT

The hostile act gives suspicion:

`apparentTravellerAttackObserved = true`

It does **not**, by itself, give hidden identity:

`apparentTravellerAttackObserved != instructorIdentityKnown`

The post-Battle Story reveal then verifies the substitution before Checkpoint Three.

Commit the existing Mirai verification source:

`occ_origin_mirai_substitution_verification_resolution`

with:

`actorVariantId = "academy_mirai"`

`substitutionVerifiedBeforeCheckpoint = true`

`verificationBasis = "battle_triggered_instructor_reveal"`

This qualifies existing MIR-01 identity-verification evidence.

Do **not** commit MIR-03 from this shortcut-Battle route.

The person travelling beside Mirai after the substitution did not reach Checkpoint Three under an unrevealed escort state; the disguise is exposed before checkpoint arrival.

MIR-01 and MIR-03 remain mutually exclusive.

---

# 9. BATTLE BOUNDARY

Combat still owns:
- PL;
- skills;
- AI;
- victory/defeat;
- reward;
- withdrawal semantics.

Preserve:
- victory Battle cash = current authorised value;
- defeat Battle cash = current authorised value;
- no injury/death inference.

Story owns the immediate reveal after the Battle result returns.

Correct seam:

`Battle occurrence`
-> `Battle result`
-> `Story reveal`

The Battle UI does not need to expose hidden instructor identity before terminal resolution.

---

# 10. ACCEPTANCE

## Entry

PASS only if:

shortcut lane
-> apparent Traveller suddenly attacks Mirai
-> Mirai visibly reacts that something is wrong
-> **Start PL Battle**
-> Battle.

FAIL if:
- the Traveller explains the test first;
- Mirai calmly agrees to an assessment fight;
- Battle starts with no hostile trigger.

## Victory

PASS only if:

victory
-> Mirai challenges who this person is
-> smoke
-> female instructor reveal
-> real Traveller confirmed safe at Checkpoint Three
-> later checkpoint aftermath.

FAIL if:
- disguise survives;
- substitute escort resumes;
- ordinary Scene 5 continues before reveal.

## Defeat

PASS only if:

defeat
-> Mirai challenges who this person is
-> smoke
-> female instructor reveal
-> real Traveller confirmed safe at Checkpoint Three
-> later defeat-specific checkpoint aftermath.

FAIL if:
- reveal is described as happening only because Mirai lost;
- substitute escort resumes.

## Final lock

> **The apparent Traveller attacking Mirai is what tells her the escort situation is wrong. The PL Battle is the trigger for the instructor reveal. Winning reveals. Losing reveals. Once the disguise drops, the substitute escort is over; only the result-specific aftermath remains.**
