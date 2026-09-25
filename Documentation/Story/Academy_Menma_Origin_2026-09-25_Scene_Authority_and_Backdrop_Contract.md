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

Stephen's current intended Battle:

> **Menma + Anko vs three former Orochimaru test subjects.**

Story establishes the confrontation.

Combat resolves it.

Story resumes from committed Battle truth.

Do not pre-write specific strikes, injuries, kills, individual takedowns or performance results owned by Combat.

Capability benchmark:
- Menma is especially strong in **Kinjutsu** and **Fuinjutsu**;
- legitimate options/observations/approaches may reflect those capabilities when contextually available;
- Anko retains her own established capability identity;
- neither becomes a generic combatant at the Story->Battle seam.

### Backdrop / Battle environment
Use the same encounter location:
`Scene backdrops/forest_clearing_day.png`

Battle presentation must preserve that the Battle occurs in the same clearing unless Combat/UI authority requires a technically separate projection of the same environment.

### AUTHORITY COLLISION — MUST BE RECONCILED

Older durable authority currently defines:
- Menma directly fights only `test_subject_altered_shinobi`;
- Anko remains occupied with `test_subject_brute` + `test_subject_unstable`;
- tutorial Battle is one-on-one.

Stephen's 2026-09-25 direction supersedes that intended design but requires CE / Combat reconciliation before implementation may claim the 2-v-3 Battle is supported.

Writing must not falsely mark that Combat contract implemented/validated.

---

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
