# Academy Kushina Origin — #333 Player-Facing Rewrite Candidate

**Date:** 2026-09-27  
**Owner:** Writing / Story — Konoha  
**Status:** **WRITING AMBER — STEPHEN REVIEW CANDIDATE / NOT GOLDEN**  
**Origin:** `academy_kushina`

## Governing authority

Consumes:

- `Documentation/Story/Academy_Kushina_Origin_2026-09-27_Scene_Authority_and_Backdrop_Contract.md`
- universal #333 Story-quality authority;
- universal Story box segmentation authority;
- existing KUS-01..KUS-05 source occurrence boundaries.

## Environment

Every beat uses:

`environmentId: konoha_academy_courtyard_day`

Exact physical backdrop:

`Scene backdrops/academy_training_ground_courtyard.png`

---

# PLAYER-FACING STORY

## SCENE 1 — ACADEMY SEALING PRACTICAL

### `kus_open_01` — narration

The practice scroll lies open on the courtyard stone.

Ink lines cross the page in a tight sealing pattern while Kushina works beside another Academy student.

### `kus_open_02` — narration

The exercise is supposed to be controlled.

Then one line breaks.

### `kus_open_03` — narration

Chakra spits through the damaged edge.

The scroll jerks hard enough to lift from the stone.

### `kus_open_04` — narration

The student beside it freezes.

Kushina does not.

---

# SCENE 2 — THE CRISIS

### `kus_crisis` — choice

The damaged formula is still leaking.

The next pulse is already building.

**GET THE STUDENT CLEAR**

**CONTAIN THE DAMAGED SEAL**

**MOVE THE SCROLL TO THE SAFETY LANE**

**CORRECT THE FORMULA**

---

# ROUTE A — GET THE STUDENT CLEAR

### `kus_protect_student_01` — narration

The formula bucks hard enough to lift one edge of the scroll.

Ink crawls past the guide marks toward the student beside it.

### `kus_protect_student_02` — narration

Kushina catches them by the arm and yanks them clear before the next pulse reaches the stone where they were kneeling.

### `kus_protect_student_03` — dialogue — CLASSMATE

**CLASSMATE:** “I could've moved.”

### `kus_protect_student_04` — dialogue — KUSHINA

**KUSHINA:** “You were still staring at it.”

### `kus_protect_student_05` — narration

With the student out of the danger zone, the instructor steps in and secures the damaged scroll.

### `kus_protect_student_06` — narration

Kushina never corrected the formula.

She made sure it did not get a second chance at somebody.

**AUTHOR CONSEQUENCE:** no qualifying Fūinjutsu work; no reverse summon; no Gerotora occurrence.

**EXIT ORIGIN.**

---

# ROUTE B — CONTAIN THE DAMAGED SEAL

### `kus_contain_seal_01` — narration

Kushina drops beside the scroll instead of backing away.

The original pattern is already torn.

### `kus_contain_seal_02` — narration

She stops trying to restore the exercise exactly as written and closes the broken containment boundary around the leaking chakra.

### `kus_contain_seal_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “That's not the original formula.”

### `kus_contain_seal_04` — dialogue — KUSHINA

**KUSHINA:** “It doesn't need to be pretty. It needs to stop leaking.”

### `kus_contain_seal_05` — narration

The loose chakra folds back inside the completed boundary and goes still.

### `kus_contain_seal_06` — narration

The classmate is safe.

The scroll is contained.

The original formula is still damaged.

**AUTHOR CONSEQUENCE:** qualifying Fūinjutsu work; contained != corrected; no new Technique/mastery; no reverse summon; no Gerotora occurrence.

**EXIT ORIGIN.**

---

# ROUTE C — MOVE THE SCROLL TO THE SAFETY LANE

### `kus_move_object_01` — narration

Kushina does not wait for the formula to settle.

She snatches the unstable scroll off the practice stand.

### `kus_move_object_02` — narration

The scroll lands inside the cleared safety lane before the next discharge can catch the student beside it.

### `kus_move_object_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “That was not the assignment.”

### `kus_move_object_04` — dialogue — KUSHINA

**KUSHINA:** “Neither was exploding.”

### `kus_move_object_05` — narration

The scroll flares once inside the empty lane.

The instructor secures it there.

### `kus_move_object_06` — narration

Kushina never fixed the formula.

She moved the danger somewhere it could not hurt anybody first.

**AUTHOR CONSEQUENCE:** no qualifying Fūinjutsu work; no reverse summon; no Gerotora occurrence.

**EXIT ORIGIN.**

---

# ROUTE D — CORRECT THE FORMULA

### `kus_correct_01` — narration

Kushina drops beside the scroll.

The broken line is still feeding chakra into the wrong part of the pattern.

### `kus_correct_02` — narration

She traces the damaged formula, catches the point where it stopped closing properly, and corrects it.

### `kus_reverse_01` — narration

For half a heartbeat, the seal settles.

### `kus_reverse_02` — narration

Then the corrected formula flashes white and folds inward through a connection it was never meant to reach.

### `kus_reverse_03` — narration

Kushina throws one forearm over her eyes.

### `kus_reverse_04` — narration

When she lowers it, a toad is sitting beside the damaged formula.

**AUTHOR CONSEQUENCE:** KUS-01 qualifying Fūinjutsu work; KUS-05 first contact commits. No intentional summoning and no Summon ownership/access.

---

# SCENE 5D — FIRST CONTACT

### `kus_gero_01` — dialogue — TOAD

**TOAD:** “...That is not where I was.”

### `kus_gero_02` — dialogue — KUSHINA

**KUSHINA:** “You're a toad.”

### `kus_gero_03` — dialogue — TOAD

**TOAD:** “Excellent observation.”

### `kus_contact_setup` — narration

The toad looks down at the damaged formula.

Then back at Kushina.

### `kus_contact_choice` — choice

**“WHAT JUST HAPPENED?”**

**“WHO ARE YOU?”**

**HELP CLOSE THE RESIDUAL CONNECTION**

**“THEN GO BACK BEFORE THIS GETS WORSE.”**

---

# CONTACT BRANCH — WHAT JUST HAPPENED?

### `kus_what_01` — narration

The toad taps one webbed finger beside the corrected line.

### `kus_what_02` — dialogue — TOAD

**TOAD:** “You fixed the seal.”

### `kus_what_03` — dialogue — TOAD

**TOAD:** “You also connected it somewhere it had no business reaching.”

**AUTHOR CONSEQUENCE:** KUS-03 commits. KUS-02 does not commit merely from this branch.

**Next:** `kus_close_unknown_01`

---

# CONTACT BRANCH — WHO ARE YOU?

### `kus_who_01` — dialogue — KUSHINA

**KUSHINA:** “Who are you?”

### `kus_who_02` — dialogue — TOAD

**TOAD:** “Gerotora.”

**AUTHOR CONSEQUENCE:** KUS-02 commits here.

### `kus_who_03` — narration

Kushina looks him over again.

The name has not improved the situation.

**Next:** `kus_close_named_01`

---

# CONTACT BRANCH — HELP CLOSE THE CONNECTION

### `kus_help_01` — narration

Kushina drops beside the scroll again.

### `kus_help_02` — narration

Gerotora braces the connection from his side while she closes the line she opened.

**AUTHOR NOTE:** player-facing speaker identity remains TOAD unless a separate legitimate name disclosure occurs. Author/runtime may know `key_gero`.

**AUTHOR CONSEQUENCE:** KUS-04 commits. Do not infer KUS-02 or KUS-03.

**Next:** `kus_close_unknown_01`

---

# CONTACT BRANCH — SEND HIM BACK

### `kus_send_01` — narration

Kushina reaches for the formula.

### `kus_send_02` — dialogue — TOAD

**TOAD:** “Not like that.”

### `kus_send_03` — dialogue — TOAD

**TOAD:** “Unless you'd like to bring something else through.”

Kushina's hand stops.

**AUTHOR CONSEQUENCE:** no KUS-02/KUS-03/KUS-04 inference from this branch.

**Next:** `kus_close_unknown_01`

---

# SCENE 6D — GEROTORA DEPARTURE

## Named closure — only after KUS-02

### `kus_close_named_01` — dialogue — GEROTORA

**GEROTORA:** “Next time you touch a formula you don't understand, try not to drag somebody through it.”

### `kus_close_named_02` — dialogue — KUSHINA

**KUSHINA:** “I understood it.”

### `kus_close_named_03` — dialogue — GEROTORA

**GEROTORA:** “That's what worries me.”

### `kus_depart_named_01` — narration

The connection folds shut.

Gerotora disappears with it.

### `kus_depart_named_02` — narration

Kushina looks down at the damaged formula for a long moment.

Then she kneels and quietly redraws the line that caused the whole problem.

**EXIT ORIGIN.**

---

## Unknown-name closure — no KUS-02

### `kus_close_unknown_01` — dialogue — TOAD

**TOAD:** “Next time you touch a formula you don't understand, try not to drag somebody through it.”

### `kus_close_unknown_02` — dialogue — KUSHINA

**KUSHINA:** “I understood it.”

### `kus_close_unknown_03` — dialogue — TOAD

**TOAD:** “That's what worries me.”

### `kus_depart_unknown_01` — narration

The connection folds shut.

The toad disappears with it.

### `kus_depart_unknown_02` — narration

Kushina looks down at the damaged formula for a long moment.

Then she kneels and quietly redraws the line that caused the whole problem.

**EXIT ORIGIN.**

---

# AUTHOR / CODING BACKDROP MAP

| Scene / family | Exact backdrop |
|---|---|
| Scene 1 — sealing practical | `Scene backdrops/academy_training_ground_courtyard.png` |
| Scene 2 — crisis / choice | **continue same backdrop** |
| Route A — protect student | **continue same backdrop** |
| Route B — contain seal | **continue same backdrop** |
| Route C — move scroll | **continue same backdrop** |
| Route D — correct formula | **continue same backdrop** |
| Gerotora first contact | **continue same backdrop** |
| Gerotora interaction choices | **continue same backdrop** |
| Gerotora departure | **continue same backdrop** |

Environment:
`konoha_academy_courtyard_day`

---

# #333 SELF-AUDIT

## Character
Kushina:
- acts quickly;
- does not soften into generic concern dialogue;
- challenges the instructor naturally;
- uses technical knowledge only when she chooses a technical route.

Gerotora:
- irritated/practical;
- dry rather than mascot-comedic;
- says only what he legitimately knows;
- does not behave as though a contract already exists.

## Capability
Fūinjutsu creates:
- contain option;
- correct option.

It does not remove:
- protect;
- relocate.

## Knowledge
The player-facing name **GEROTORA** appears only after he actually says it.

No speaker label leaks KUS-02.

## Consequences
- protect/move do not become Fūinjutsu work;
- contain qualifies but does not become correction;
- only correct_formula creates reverse summon;
- first contact != identity disclosure;
- identity != contract/access/ownership;
- joint closure != Technique transfer.

## Segmentation
Every ordinary narration/dialogue cue is authored as one readable beat.

No Story cue depends on an internal scrollbar.

## Backdrop
Every route remains in the exact approved courtyard environment.

---

# CANDIDATE STATUS

This is a **Stephen review candidate**.

It is not whole-Origin Writing GOLDEN until Stephen approves the player-facing version.
