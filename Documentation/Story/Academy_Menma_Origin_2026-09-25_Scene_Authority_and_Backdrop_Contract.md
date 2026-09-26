# Academy Menma Origin — Scene Authority + Backdrop Contract

**Date:** 2026-09-25  
**Owner:** Stephen / Writing — Konoha  
**Status:** **CURRENT SPECIALIST SUCCESSOR AUTHORITY — WRITING / PRESENTATION INPUT; BATTLE SEAM RECONCILIATION REQUIRED**  
**Origin:** `academy_menma`

## Purpose

This records Stephen's current scene-by-scene Academy Menma Origin direction and adds a mandatory implementation rule:

> **Writing handoff to Coding must include the exact backdrop for every scene. Coding must not guess, omit, or substitute a backdrop merely because Story text is otherwise complete.**

Backdrop binding is part of implementation-ready Story authority.

---

# Scene authority

## Scene 1 — Academy / restriction

Academy Menma is ambitious and proud.

He feels constrained by the Academy and specifically by his instructor.

His frustration is not "school is boring." He believes his ability is being restricted and wants the opportunity to prove what he can actually do.

The scene ends with Menma making the consequential decision to **leave the Academy**.

### Backdrop
`Scene backdrops/academy_classroom.png`

Current asset blob:
`94d69570c2ca3abe291745af8ccdc9d001fd2a10`

---

## Scene 2 — Forest / freedom

Menma runs through the forest after leaving.

The forest must feel different from the Academy:
- nobody standing over him;
- nobody setting the limits;
- physical freedom and momentum.

While moving through the woods, he hears fighting somewhere ahead.

### Backdrop
`Scene backdrops/whisper_woods_forest_route.png`

Current asset blob:
`5f7b3a5e1c622b20c3c507eacaed297c5c054534`

---

## Scene 3 — Menma and the Nine-Tails

Short internal conversation.

This is character material, not jinchuriki tutorial exposition.

Menma and the Nine-Tails share a point of interest here: **ambition**.

The Nine-Tails wants to see what Menma can actually do.

Menma wants the same thing.

The fighting offers the test the Academy was not giving him.

Menma goes looking for it.

Preserve:
- internal voice != physical participant;
- internal relationship != automatic combat assistance;
- interest != ownership/mastery/unlock.

### Backdrop
Continue:
`Scene backdrops/whisper_woods_forest_route.png`

Do not reset to a generic dark/internal-void background unless a later approved presentation authority explicitly creates one.

---

## Scene 4 — Discovery

Menma reaches the fight.

He finds **Special Jonin Anko** fighting **three of Orochimaru's former test subjects**.

This immediately establishes that Menma has entered something far beyond an Academy exercise.

Current stable opposition identities remain:
- `test_subject_brute`
- `test_subject_altered_shinobi`
- `test_subject_unstable`

### Backdrop
`Scene backdrops/forest_clearing_day.png`

Current asset blob:
`522265bde2731ca27c481b2935f5cf835ba3497c`

---

## Scene 5 — The decision to enter

The Nine-Tails comments internally.

Menma smirks.

He agrees with the sentiment: this is his chance to show what he can actually do.

He enters the fight.

Do not impose heroic-intervention morality as the motive.

Legitimate Menma motives include:
- ambition;
- pride;
- desire for a real test;
- confidence in his own ability.

### Backdrop
Continue:
`Scene backdrops/forest_clearing_day.png`

---

## Scene 6 — Menma and Anko

Anko is surprised and unhappy that an Academy student has inserted himself into this fight.

Brief back-and-forth only.

The enemies do not politely wait for the conversation.

Personality collision:
- Anko understands the danger;
- Menma believes he belongs in it.

### Backdrop
Continue:
`Scene backdrops/forest_clearing_day.png`

---

## Scene 7 — PL Battle

Current reusable Battle authority is now closed by:

`Documentation/Coordination/Battle_Participant_Control_and_First_PL_Battle_Tutorial_Contract_2026-09-26.md`

CE commit lineage:
`13a258c68fd19a3fff6e8e84ea14eaf659041514`

### Current participant/control truth

Allied:
- `sj_anko` — **Guest Ally**, temporary/non-owned, **player-controlled while Active**;
- `academy_menma` — Origin protagonist / owned actor, player-controlled while Active.

Enemy order:
1. `test_subject_altered_shinobi`
2. `test_subject_brute`
3. `test_subject_unstable`

Starting formation:

```
ALLIED
Active  = sj_anko
Benched = academy_menma

ENEMY
Active  = test_subject_altered_shinobi
Benched = test_subject_brute
Benched = test_subject_unstable
```

Anko's legal Origin palette is available to the player while she is Active.

Her results are genuine player-driven PL Battle results.

Do not restore the superseded automated / guaranteed first-two takedowns.

### Intended teaching handoff

If Anko legitimately resolves Altered + Brute while remaining eligible:
- Unstable relays;
- Anko yields Active;
- Menma promotes from Benched;
- Anko becomes Benched;
- side alternation does not reset;
- Unstable acts next against Menma;
- Menma then receives the next player-side action.

### Legitimate divergence

If Anko withdraws before the intended handoff:
- Menma relays normally;
- player controls Menma;
- Battle continues against the current surviving enemy formation.

If Menma later withdraws while Anko remains eligible:
- Anko may relay back;
- player controls Anko;
- Battle continues.

### Party defeat

Party defeat commits only when:

> **no eligible allied participant remains before `stop_three_test_subjects` completes.**

On party defeat:
- 0 Battle PL still means withdrawal, not injury/death;
- MEN-03 = `tutorialResult:not_completed`;
- MEN-03 `performanceBucket:null`;
- reward = 0 Ryō;
- Story returns to:
  `menma_party_defeat_return_01`.

Binding Writing continuation:

`Documentation/Story/Academy_Menma_Scene_7_Party_Defeat_Continuation_2026-09-26.md`

commit:
`5e25bb268f101e0f8ea5a08fe225f614a156e24e`

The Origin does not auto-retry or terminate on party defeat.

It continues from the defeat scene into:
`menma_future_01`
and the existing future-ambition choice.

### MEN-03

MEN-03 measures Menma only from the first legitimate moment he becomes Active.

Exclude Anko actions/results.

On allied victory:
- high / middle / low may commit from Menma's actual evidence;
- Menma withdrawal may legitimately contribute to LOW if the party later wins.

On allied defeat:
- no completed performance bucket;
- do not fake LOW.

### Capability benchmark

- Menma's Kinjutsu/Fūinjutsu identity may shape legitimate Story observation/approach;
- only legal prepared Battle actions are selectable;
- observed capability requires committed evidence;
- Anko retains her own established capabilities;
- neither character becomes generic.

### Backdrop / Battle environment

Use:
`Scene backdrops/forest_clearing_day.png`

The Battle remains in the same clearing.

### Current status

Battle semantic authority: **CLOSED by CE #385**.

Coding implementation / visual acceptance remains owned by:
- #373
- PR #375

Writing defeat dependency: **CLOSED by #386 successor authority above**.

## Scene 8 — Post-Battle / Anko

After the test subjects are dealt with, Anko and Menma finally have the conversation the fight did not permit.

Emotional premise:

> **Anko recognises something of herself in Menma. Recognition != approval.**

Anko knows what it is to:
- possess dangerous potential;
- be drawn toward things others tell you not to touch;
- have somebody else decide what you should or should not be allowed to become.

She may still believe Menma's decision to enter was reckless.

Because the enemies are Orochimaru's former test subjects, Anko's history must affect how she experiences the encounter and reads Menma afterward.

Do not use Orochimaru history as decorative trivia.

Capability/evidence boundary:
- Anko may react to Menma's Kinjutsu/Fuinjutsu only where she legitimately observed relevant committed actions;
- machine-known capability != observer Knowledge;
- Battle result/performance != exact technique-use evidence automatically.

### Backdrop
Continue:
`Scene backdrops/forest_clearing_day.png`

---

## Scene 9 — Parting

Anko and Menma separate.

Anko does not deliver "the lesson of the Origin."

Her final words leave Menma something to think about rather than defining him for the player.

### Backdrop
Continue:
`Scene backdrops/forest_clearing_day.png`

---

## Scene 10 — Forest / future

Menma runs through the woods again.

The external conflict is over.

The scene returns to his own ambition.

The final meaningful CE choice shapes what Academy Menma **wants to become / intends to pursue**.

This is not a morality referendum on whether leaving the Academy was correct.

### Backdrop
`Scene backdrops/whisper_woods_forest_route.png`

---

# Emotional movement

> Someone else defines Menma's limits
> -> Menma rejects those limits
> -> he finds the test he wanted
> -> survives a genuinely dangerous test beside someone who understands part of what drives him
> -> Menma decides where he wants that ambition to lead.

---

# Story choice law

Story choices belong to the character who is making them.

Established capabilities are part of character identity and should shape available approaches where contextually legitimate.

Do not:
- turn capability into omniscience;
- turn possession into observed use;
- turn success into moral correctness;
- turn the final future-goal choice into Good/Neutral/Evil classification.

---

# Backdrop production rule — binding

For this Origin and future implementation-ready Writing packages:

1. Every authored scene must name its exact current backdrop path.
2. Same-location scene changes must explicitly say **continue same backdrop** where applicable.
3. Story->Battle handoffs must identify the encounter environment/backdrop.
4. Coding must not infer a backdrop from scene title alone.
5. Coding must not leave the generic shell background because Writing omitted an asset path.
6. If no appropriate approved asset exists, Writing/UI must mark **BACKDROP ASSET REQUIRED** before implementation rather than silently substituting.
7. Exact backdrop binding belongs in the downstream Coding handoff / runtime contract.
8. Backdrop changes are presentation only; they do not alter Story semantics.

This rule is a production safeguard against the Origin runtime shipping correct prose over missing/wrong environments.

---

# Existing source occurrence boundaries to preserve

Current durable bindings include:

## MEN-04
`occ_origin_menma_anko_training_interest_response`

The occurrence records Anko actually expressing future-training interest in response to current history.

It does not grant guaranteed training/access.

## MEN-05
`occ_origin_menma_nine_tails_internal_exchange`

The occurrence records the authored internal exchange actually occurring.

It does not grant:
- Nine-Tails combat assistance;
- technique access;
- transformation access.

MEN-01 / MEN-02 remain Combat-action sourced.

MEN-03 remains Combat-owned aggregate tutorial-performance evidence under current durable authority, but its current encounter shape will require reconciliation if the Battle changes from 1-v-1 to Menma+Anko vs all three.

---

# Status boundary

Closed at Writing direction:
- Scenes 1-10 emotional/narrative shape;
- Menma ambition/pride motive;
- Nine-Tails ambition connection;
- Anko recognition != approval;
- Orochimaru history relevance;
- final future-ambition choice;
- exact scene backdrop mapping;
- backdrop-in-handoff production rule.

Requires reconciliation before implementation:
- Scene 7 Battle composition and any MEN-03 assumptions tied specifically to the old 1-v-1 tutorial configuration.

Not yet Stephen-approved:
- exact successor player-facing prose/dialogue.

Therefore this document is **scene authority / rewrite input**, not yet whole-Origin Writing GOLDEN.
