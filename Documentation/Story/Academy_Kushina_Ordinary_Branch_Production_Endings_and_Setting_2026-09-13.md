# Shinobi Chronicles — Academy Kushina Ordinary-Branch Production Endings + Scene Setting

**Date:** 2026-09-13  
**Owner:** Writing — Konoha  
**Status:** **FINAL PRODUCTION WRITING AUTHORITY — #169 WRITING SLICE CLOSED; UI/ASSETS MAPPING + CODING IMPLEMENTATION SEPARATE**

## 1. Purpose

This package closes the missing player-facing production continuation for the three legal `academy_kushina` branches that do **not** trigger the accidental Gerotora reverse-summon sequence:

- `protect_student`
- `contain_damaged_seal`
- `move_unstable_object`

It also closes the exact Story setting needed by UI / Assets for scene-environment mapping.

This consumes and preserves the recovered authority:

`NinjaSteveXer0/Chronicle-Engine-Design-Bible/Games/Shinobi Chronicles/Academy Kushina Origin - Final Writing Detail Reconciliation.md`

and current runtime semantics in:

`runtime/alpha-origin-scenes-32900-b.js`.

No new Summon contract, ownership, permanent access, Battle, Rank, PL, Skill, mastery or Progression result is created here.

---

# 2. Canon-first Kushina voice anchor

Official Naruto material establishes young Kushina as bold, assertive, proud and unwilling to be looked down on; she famously announces her Hokage ambition at the Academy and reacts forcefully when bullied, while still carrying real anxiety and uncertainty beneath that outward confidence.

SC uses that as a voice anchor only. Current Shinobi Chronicles Recorded History remains authoritative where it diverges.

For this scene, Kushina should read as:

- immediate rather than hesitant under pressure;
- blunt and physically decisive;
- proud enough to answer criticism instead of shrinking from it;
- technically interested where the seal itself is the chosen problem;
- protective without becoming soft-spoken or saintly;
- concise rather than exposition-heavy.

Do not give every branch the same joke or identical emotional meaning.

---

# 3. Exact Story setting

## Setting

**Konoha Ninja Academy — exterior practical training courtyard — daytime.**

The scene is a supervised Academy sealing exercise being conducted in the practical training courtyard rather than an indoor classroom.

The unstable scroll/formula is positioned within the exercise area near another Academy student/classmate when it destabilises.

This setting supports all four already-authorised legal responses without changing their meaning:

- formula correction;
- physical student protection/removal;
- damaged-seal containment;
- moving the unstable object to a safer part of the exercise area.

### Closure-location rule

All three ordinary branches remain in the **same Academy practical training courtyard** through their ending.

### Gerotora environment rule

The existing `correct_formula -> reverse summon -> Gerotora` sequence also occurs in the **same Academy practical training courtyard**.

The accidental bridge opens from the unstable/corrected exercise formula where Kushina is already standing. Writing does **not** require a second environment for Gerotora first contact or residual-seal closure.

UI / Assets therefore needs only one semantically correct Academy practical-courtyard environment mapping for the complete current Kushina Origin.

Writing does not own the final environment ID or physical backdrop path; UI / Assets must map this exact setting to the approved presentation authority.

---

# 4. Branch: `protect_student`

## Required routing

`protect_student`
→ `kus_protect_student_01`
→ `kus_protect_student_02`
→ `kus_protect_student_03`
→ `kus_protect_student_04`
→ exit scene

## Production beats

### `kus_protect_student_01`
**Mode:** narration

> The formula bucks hard enough to lift one edge of the scroll. Ink crawls past the guide marks toward the student beside it. Kushina catches them by the arm and yanks them clear before the next pulse reaches the stone where they were kneeling.

### `kus_protect_student_02`
**Mode:** dialogue  
**Speaker:** CLASSMATE

> “I could've moved.”

### `kus_protect_student_03`
**Mode:** dialogue  
**Speaker:** KUSHINA

> “You were still staring at it.”

### `kus_protect_student_04`
**Mode:** narration

> With the student out of the danger zone, the instructor steps in and secures the damaged scroll. Kushina never corrected the formula; she made sure it did not get a second chance at somebody.

## Factual branch consequence

- Kushina physically removes/protects the endangered classmate from the immediate seal hazard.
- The classmate is not struck by the destabilising discharge in this authored branch.
- The instructor subsequently secures the damaged exercise scroll after the classmate is clear.
- Kushina does **not** complete qualifying Fūinjutsu correction/containment work merely from this protective response.
- No reverse-summoning occurrence happens.
- No Gerotora first-contact history happens.

Do not infer a permanent protector/personality trait from this branch.

---

# 5. Branch: `contain_damaged_seal`

## Required routing

`contain_damaged_seal`
→ `kus_contain_seal_01`
→ `kus_contain_seal_02`
→ `kus_contain_seal_03`
→ `kus_contain_seal_04`
→ exit scene

## Production beats

### `kus_contain_seal_01`
**Mode:** narration

> Kushina drops beside the scroll instead of backing away. The original pattern is already torn, so she stops trying to restore the exercise exactly as written and closes the broken containment boundary around the leaking chakra.

### `kus_contain_seal_02`
**Mode:** dialogue  
**Speaker:** INSTRUCTOR

> “That's not the original formula.”

### `kus_contain_seal_03`
**Mode:** dialogue  
**Speaker:** KUSHINA

> “It doesn't need to be pretty. It needs to stop leaking.”

### `kus_contain_seal_04`
**Mode:** narration

> The loose chakra folds back inside the completed boundary and goes still. The exercise ends with the scroll contained, the classmate safe, and the original formula still damaged.

## Factual branch consequence

- Kushina materially completes/contains the damaged sealing boundary.
- The unstable chakra is contained and the immediate exercise hazard ends.
- This remains legitimate qualifying Fūinjutsu work under the already-existing Kushina seal-resolution authority.
- The original exercise formula is **contained rather than restored/corrected**.
- No reverse-summoning occurrence happens from this branch.
- No Gerotora first-contact history happens.
- One Academy exercise success does not grant a new Technique, mastery or universal sealing authority.

---

# 6. Branch: `move_unstable_object`

## Required routing

`move_unstable_object`
→ `kus_move_object_01`
→ `kus_move_object_02`
→ `kus_move_object_03`
→ `kus_move_object_04`
→ exit scene

## Production beats

### `kus_move_object_01`
**Mode:** narration

> Kushina does not wait for the formula to settle. She snatches the unstable scroll off the practice stand and throws it into the cleared safety lane at the edge of the exercise area before the next discharge can catch the student beside it.

### `kus_move_object_02`
**Mode:** dialogue  
**Speaker:** INSTRUCTOR

> “That was not the assignment.”

### `kus_move_object_03`
**Mode:** dialogue  
**Speaker:** KUSHINA

> “Neither was exploding.”

### `kus_move_object_04`
**Mode:** narration

> The scroll flares once inside the empty lane. The instructor secures it there while Kushina watches from outside the discharge. She never fixed the formula; she moved the danger somewhere it could not hurt anybody first.

## Factual branch consequence

- Kushina deliberately relocates the unstable object away from the endangered classmate and occupied exercise space.
- The destabilising discharge occurs in the cleared safety lane rather than striking the nearby student.
- The instructor subsequently secures the object in that safer position.
- Kushina does **not** gain qualifying Fūinjutsu correction/containment credit merely from physically relocating the object.
- No reverse-summoning occurrence happens.
- No Gerotora first-contact history happens.

Do not infer recklessness/cowardice/alignment from selecting this response.

---

# 7. Existing Gerotora branch

The existing accidental Gerotora branch remains **Story-semantically unchanged**.

Preserve:

`correct_formula`
→ accidental reverse-summoning
→ Gerotora first contact
→ existing branch-specific communication/assistance possibilities
→ residual connection closes
→ Gerotora departs.

Writing does not reopen its already-closed factual boundaries in this package.

Only the environment is now clarified:

> **the reverse-summon and Gerotora first-contact sequence occurs in the same exterior Academy practical training courtyard, daytime.**

A later general Origin prose-modernisation pass may improve expression across this branch under #170, but must preserve its exact historical semantics.

---

# 8. Runtime / consequence preservation

Current runtime uses:

`occ_origin_kushina_residual_seal_work_resolution`

with the current `kushinaCrisisChoice` as branch provenance.

This Writing package does not require a second Story-history system or new occurrence merely because each branch now has proper prose.

Coding should preserve existing branch-semantic state and exact current consequence authority where possible.

If Coding/CE needs additional branch-result payload fields for deterministic projection/tests, those fields must express only the factual consequences above and must not manufacture Skill/Rank/PL/relationship state.

Preserve:

- `protect_student` != Fūinjutsu correction;
- `contain_damaged_seal` = legitimate containment work, not formula correction;
- `move_unstable_object` != sealing work;
- ordinary branch != failed Gerotora branch;
- no Gerotora occurrence != missing content;
- classmate safety != permanent Relationship;
- scene prose != new occurrence;
- environment backdrop != new World location;
- Origin completion != Summon access;
- chosen action != personality/alignment lock.

---

# 9. UI / Assets handoff input

Writing's exact setting supplied to #169 is:

> **Konoha Ninja Academy — exterior practical training courtyard — daytime.**

The full current Kushina Origin, including accidental Gerotora first contact, remains in that same setting.

Known existing physical candidate reported by #169 archaeology:

`Scene backdrops/academy_training_ground_courtyard.png`

Writing does **not** approve the physical mapping by filename intuition. UI / Assets must inspect/ratify the semantic fit and return the authoritative:

`environmentId -> exact approved physical path`

No image generation is required or authorised by this Writing closure.

---

# 10. Completion status

**Writing #169 slice: CLOSED.**

Closed:

- exact setting;
- ordinary-branch stable beat IDs;
- exact ordered player-facing text;
- exact factual branch consequences;
- same-environment rule for Gerotora branch;
- Gerotora factual branch otherwise unchanged.

Still separate:

- UI / Assets environment ID + physical backdrop approval;
- Coding patch;
- runtime regression;
- installed-browser validation / Golden.
