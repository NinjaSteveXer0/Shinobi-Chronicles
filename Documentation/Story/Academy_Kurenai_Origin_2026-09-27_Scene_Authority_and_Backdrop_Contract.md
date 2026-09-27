# Academy Kurenai Origin — Scene Authority + Backdrop Contract

**Date:** 2026-09-27  
**Owner:** Writing / Story — Konoha  
**Status:** **CURRENT SPECIALIST SUCCESSOR AUTHORITY — PLAYER-FACING REWRITE INPUT**  
**Origin:** `academy_kurenai`

## Governing durable authority

Consumes:

- CE: `Games/Shinobi Chronicles/Academy Kurenai Origin - Final Battle of Illusions Writing Lock.md`
  - blob `ca6b1b48758eef95b8887f67313005b664157660`;
- KUR-01 / KUR-02 source binding:
  `occ_origin_kurenai_bell_test_resolution`;
- universal #333 player-facing quality gate;
- Storywide Player-Facing Performance + Narrative Craft successor authority;
- universal Story-box segmentation authority;
- current UI backdrop inventory.

Core:
- text-choice deception encounter;
- no Battle runtime;
- four final outcome classes;
- no morality/personality output;
- applied Genjutsu practice/evidence remains downstream Progression authority.

---

# 1. Setting / backdrop

Location:

**Academy training ground / training yard — daytime.**

Current implementation-safe backdrop:

`Scene backdrops/academy_training_ground_courtyard.png`

This is the current exact physical asset available on `main` for the same Academy practical-ground family.

Stephen has separately pursued same-location alternate-angle Kurenai art for later visual variation. Until an exact alternate asset path exists on live authority, Coding should use the courtyard master rather than guess a filename.

If a later approved same-location Kurenai alternate asset lands:
- evaluation/aftermath may swap to it as presentation;
- semantic scene identity does not change.

---

# 2. Core encounter

The instructor presents a visible bell.

Objective:

> **Take the bell.**

Kurenai's encounter is about layered deception.

No PL Battle.

No opponent package.

No damage.

No attack resolver.

The player chooses how Kurenai begins controlling what the instructor thinks is happening.

---

# 3. Meaningful decision surface

Current runtime contains several single-option follow-up cards.

Those are not meaningful decisions and should be rendered as authored continuation, not fake choice prompts.

The meaningful opening deception approaches remain:

1. **SEND A FALSE KURENAI**
2. **HIDE MY REAL MOVEMENT**
3. **DISTORT HIS SENSE OF DISTANCE**
4. **MAKE THE DIRECT APPROACH LOOK REAL**

These map to the four already-closed route exemplars/outcome classes.

No new semantic route is invented.

---

# 4. Outcome classes

## Complete loss

Route authority:

`False Kurenai -> Rush the bell`

Instructor reads the deception immediately.

Kurenai never creates a meaningful reversal.

Bell not obtained.

Outcome:
`complete_loss`

## Partial loss

Route authority:

`Conceal real movement -> Draw attention away -> Take the bell now`

Kurenai successfully deceives the instructor at one layer and appears behind him with the bell.

The instructor still owns the deeper/final layer.

The apparent bell possession does not remain a complete victory.

Outcome:
`partial_loss`

## Partial win

Route authority:

`Distort distance/position -> Rush the bell -> Pretend to withdraw`

Kurenai genuinely breaks one of the instructor's assumptions and obtains the bell long enough to establish a real success.

Instructor subsequently appears behind her and takes it back.

Outcome:
`partial_win`

## Complete win

Route authority:

`Fake clumsy/direct approach -> Rush bell -> Let instructor think he caught Kurenai`

Required layered reveal:

- instructor believes he caught Kurenai;
- first distortion;
- Kurenai behind him with bell:
  **“Have you?”**
- second distortion;
- instructor behind Kurenai with bell:
  **“Yes.”**
- final distortion;
- both stand where encounter began;
- only changed fact: **Kurenai genuinely holds the bell**.

Outcome:
`complete_win`

---

# 5. Evaluation

Instructor evaluation must respond to the actual outcome.

Do not reconverge all four histories into one generic narration beat.

Shared locked meaning:

> Genjutsu requires knowing what is real/true while manipulating belief, not merely producing an illusion.

The instructor may phrase this naturally.

Kurenai's reaction should vary with whether she:
- lost cleanly;
- won one layer but lost the deeper one;
- broke through strongly but had the bell taken back;
- completed the full deception.

No morality/alignment/personality judgement.

---

# 6. KUR source occurrence

`occ_origin_kurenai_bell_test_resolution`

Commit when the Bell Test ends with exactly one:

- `complete_loss`
- `partial_loss`
- `partial_win`
- `complete_win`

KUR-01/KUR-02 consume this factual occurrence according to current exclusivity.

Do not create multiple Bell Test result occurrences merely because presentation has several illusion layers.

---

# 7. Character/voice

Kurenai should read as:
- observant;
- composed;
- direct;
- quietly competitive;
- willing to commit to deception without narrating the trick to the player;
- not a generic sarcastic Academy prodigy.

Her later canon identity as a strong Genjutsu specialist supports the capability direction, but Academy Kurenai is not written as already possessing adult mastery.

The instructor is:
- calm;
- difficult to read;
- genuinely participating in the illusion contest;
- not a tutorial voice explaining each layer.

---

# 8. Segmentation

One Story box = one complete readable beat.

Do not:
- put the whole illusion sequence in one scroll box;
- atomise every sentence into a separate click;
- render single-option pseudo-choices.

Illusion reveal sequences may use short boxes where rapid perceptual reversals need them.

---

# 9. Ending

After route-reactive evaluation:

**YOUR CHRONICLE BEGINS**

No Battle.

No personality lock.

No mastery declaration.

---

# FINAL LOCK

> **The player chooses Kurenai's deception approach. The scene performs the illusion contest. The final factual class is one of four closed outcomes.**

> **Single-option follow-up cards are presentation noise, not meaningful agency.**

> **The prose must make the player feel their certainty being manipulated rather than telling them that an illusion layer resolved.**

> **Current backdrop: `Scene backdrops/academy_training_ground_courtyard.png`.**
