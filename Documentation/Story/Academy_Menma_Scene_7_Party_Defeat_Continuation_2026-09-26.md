# Academy Menma Origin — Scene 7 Party-Defeat Continuation

**Date:** 2026-09-26  
**Owner:** Writing / Story — Konoha  
**Incoming:** #386  
**Status:** **WRITING CLOSED — BINDING DEFEAT-PATH CONTINUATION**  
**Origin scene:** `origin_academy_menma_prologue`

## Authority consumed

Battle truth is owned by:

`Documentation/Coordination/Battle_Participant_Control_and_First_PL_Battle_Tutorial_Contract_2026-09-26.md`

Current Battle contract:

- Anko = Guest Ally;
- Anko starts allied Active;
- Menma starts Benched;
- player controls whichever player-side Active is current;
- enemy order = Altered -> Brute -> Unstable;
- normal withdrawal / relay rules apply;
- authored Anko -> Menma teaching handoff may occur after legitimate Altered + Brute resolution;
- Anko may withdraw earlier;
- Menma may withdraw and Anko may relay back if still eligible;
- party defeat occurs only when no eligible allied participant remains before `stop_three_test_subjects` completes;
- 0 Battle PL = withdrawal, not injury/death.

On terminal party defeat:

- `tutorialResult = not_completed`;
- MEN-03 `performanceBucket = null`;
- reward = 0 Ryō.

Writing does not fabricate LOW.

---

# 1. Exact Story return contract

## Stable return beat

`menma_party_defeat_return_01`

Battle terminal defeat returns **once** to this beat.

Return scene remains:

`origin_academy_menma_prologue`

Backdrop:

`Scene backdrops/forest_clearing_day.png`

Actor projection at return:
- Menma present;
- Anko present;
- do not imply either is injured;
- do not project withdrawn test subjects back into active confrontation;
- unresolved surviving test subjects leave the clearing during the return sequence below.

## Idempotence

The Battle defeat receipt must bind this return lineage exactly once.

Save/load/re-entry must not:
- replay the Battle;
- recommit defeat;
- duplicate MEN-03;
- duplicate a reward;
- duplicate the escape of unresolved subjects;
- restart at an earlier pre-Battle Story beat.

If the return lineage has already begun, resume the exact current Story beat.

---

# 2. Withdrawal-order handling

No separate full scene family is required.

Whether:

### A
Anko withdrew first -> Menma later withdrew -> party defeat

or:

### B
Menma withdrew first -> Anko later withdrew -> party defeat

the terminal factual Story state is:

> both allied participants are no longer eligible to continue the Battle and the objective remains incomplete.

The shared scene below truthfully covers both.

Do not narrate which person "lost the Battle for the team."

Do not assign blame.

If UI/History needs the exact withdrawal order, preserve it machine-facing from Battle evidence.

---

# 3. Player-facing Story

## Segmentation rule

Each numbered cue below is one Story box / dramatic beat.

Do not merge blank-line-separated cues into a scrollable narration box.

---

## `menma_party_defeat_return_01` — narration

The fight breaks apart before Menma can pull it back together.

**Next:** `menma_party_defeat_return_02`

---

## `menma_party_defeat_return_02` — narration

By the time the clearing settles, Menma and Anko are both at its edge.

**Next:** `menma_party_defeat_return_03`

---

## `menma_party_defeat_return_03` — narration

The test subjects still able to move use the opening.

They disappear between the trees.

**Next:** `menma_party_defeat_return_04`

---

## `menma_party_defeat_return_04` — dialogue — ANKO

**ANKO:** “They're gone.”

**Next:** `menma_party_defeat_return_05`

---

## `menma_party_defeat_return_05` — dialogue — MENMA

**MENMA:** “I know.”

**Next:** `menma_party_defeat_return_06`

---

## `menma_party_defeat_return_06` — dialogue — ANKO

**ANKO:** “You wanted a real test.”

**Next:** `menma_party_defeat_return_07`

---

## `menma_party_defeat_return_07` — dialogue — MENMA

**MENMA:** “I got one.”

**Next:** `menma_party_defeat_return_08`

---

## `menma_party_defeat_return_08` — dialogue — ANKO

**ANKO:** “And?”

**Next:** `menma_party_defeat_return_09`

---

## `menma_party_defeat_return_09` — narration

Menma looks at the gap in the trees where the last of them disappeared.

**Next:** `menma_party_defeat_return_10`

---

## `menma_party_defeat_return_10` — dialogue — MENMA

**MENMA:** “I need more.”

**Next:** `menma_party_defeat_return_11`

---

## `menma_party_defeat_return_11` — narration

Anko laughs once.

Not because it is funny.

**Next:** `menma_party_defeat_return_12`

---

## `menma_party_defeat_return_12` — dialogue — ANKO

**ANKO:** “Yeah.”

**Next:** `menma_party_defeat_return_13`

---

## `menma_party_defeat_return_13` — dialogue — ANKO

**ANKO:** “That sounds familiar.”

**Next:** `menma_party_defeat_return_14`

---

## `menma_party_defeat_return_14` — dialogue — MENMA

**MENMA:** “You're going after them?”

**Next:** `menma_party_defeat_return_15`

---

## `menma_party_defeat_return_15` — dialogue — ANKO

**ANKO:** “I'm reporting where they went.”

**Next:** `menma_party_defeat_return_16`

---

## `menma_party_defeat_return_16` — dialogue — MENMA

**MENMA:** “I can help.”

**Next:** `menma_party_defeat_return_17`

---

## `menma_party_defeat_return_17` — dialogue — ANKO

**ANKO:** “No.”

**Next:** `menma_party_defeat_return_18`

---

## `menma_party_defeat_return_18` — narration

Menma gives her a look.

Anko sees it immediately.

**Next:** `menma_party_defeat_return_19`

---

## `menma_party_defeat_return_19` — dialogue — ANKO

**ANKO:** “That wasn't a challenge.”

**Next:** `menma_party_defeat_return_20`

---

## `menma_party_defeat_return_20` — dialogue — MENMA

**MENMA:** “Didn't say it was.”

**Next:** `menma_party_defeat_return_21`

---

## `menma_party_defeat_return_21` — dialogue — ANKO

**ANKO:** “Go home, Menma.”

**Next:** `menma_party_defeat_return_22`

---

## `menma_party_defeat_return_22` — dialogue — MENMA

**MENMA:** “Not the Academy.”

**Next:** `menma_party_defeat_return_23`

---

## `menma_party_defeat_return_23` — dialogue — ANKO

**ANKO:** “Didn't say Academy.”

**Next:** `menma_party_defeat_return_24`

---

## `menma_party_defeat_return_24` — narration

Anko heads back toward the village.

Menma waits until she is gone, then takes the forest route the other way.

**Next:** `menma_future_01`

---

# 4. Continuation

Party defeat does **not**:
- terminate the Origin;
- trigger an automatic retry;
- reset Scene 7;
- award success rewards;
- fabricate a victory;
- invoke a Nine-Tails rescue.

It continues into the existing future-ambition ending lineage.

## Stable next beat

`menma_future_01`

This is Scene 10 / Forest-Future.

Backdrop changes to:

`Scene backdrops/whisper_woods_forest_route.png`

The existing final future-ambition choice remains valid because defeat does not erase Menma's ambition.

If anything, the factual defeat gives that choice a different emotional context without changing its semantic purpose.

---

# 5. Victory vs defeat Anko reaction

The existing three Anko performance reactions:

- HIGH — “That's annoyingly good.”
- MIDDLE — “You held your own.”
- LOW — “I'm looking at the price tag.”

remain **victory-lineage reactions only** where MEN-03 legitimately commits a completed performance bucket.

Terminal party defeat:

`performanceBucket = null`

therefore uses this separate defeat continuation.

Do not map defeat to LOW.

---

# 6. Orochimaru / recognition continuity

The defeat path still preserves the central Anko/Menma relationship:

> recognition != approval

Anko recognises Menma's hunger for a real test in:

- “You wanted a real test.”
- “That sounds familiar.”

She does not:
- approve of leaving the Academy;
- declare his ambition good/bad;
- diagnose his personality;
- deliver the Origin's lesson.

The unresolved test subjects remain tied to Anko's Orochimaru history, but the defeat return does not pause for a history lecture while they are escaping.

The fuller Orochimaru-history conversation remains available on the completed/victory lineage.

---

# 7. Scene consequence

On this defeat lineage:

- objective `stop_three_test_subjects` = **not completed**;
- unresolved test subjects = escaped from this encounter;
- no inferred deaths;
- no inferred injuries;
- no inferred capture;
- no reward;
- no Promotion;
- no acquisition;
- no Nine-Tails intervention;
- no automatic retry.

Menma and Anko leave the clearing separately.

Menma proceeds to the future-ambition ending.

---

# 8. Coding return payload expectation

Coding should return Story enough factual information to establish:

- terminal Battle result = defeat;
- objective incomplete;
- exact allied withdrawal history remains available for history/UI if needed;
- exact hostile resolved/unresolved identities remain available;
- MEN-03 = `not_completed / null`;
- reward = 0.

Writing does not require a separate prose branch for allied withdrawal order.

If Coding can provide exact unresolved hostile IDs, Scene Board may project only those portraits during their departure; otherwise do not fabricate a full three-hostile lineup after Battle.

---

# FINAL LOCK

> **Academy Menma Scene 7 terminal party defeat returns once to `menma_party_defeat_return_01`. Menma and Anko are both out of the Battle without inferred injury/death. Any unresolved test subjects escape into the forest. Anko recognises Menma's hunger for a real test without approving or moralising. Defeat receives no MEN-03 performance bucket and no reward. The Origin does not retry or terminate; it continues to `menma_future_01` and the existing future-ambition choice.**
