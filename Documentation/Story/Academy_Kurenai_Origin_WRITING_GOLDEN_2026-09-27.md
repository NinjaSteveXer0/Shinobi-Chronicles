> **APPROVAL RECORD — 2026-09-27**
>
> Stephen explicitly approved the benchmark-optimized Origin sweep for promotion. This file is the production Writing authority for player-facing expression. Runtime implementation and Browser GOLDEN remain separate.
>
> Presentation binding also consumes:
> `Documentation/Story/Academy_Origins_NPC_Card_and_Backdrop_Projection_Manifest_2026-09-27.md`

# Academy Kurenai Origin — WRITING GOLDEN

**Date:** 2026-09-27  
**Owner:** Writing / Story — Konoha  
**Status:** **OWNER BROWSER AMBER — WRITING REPAIR COMPLETE / CODING IMPLEMENTATION + OWNER RETEST REQUIRED / NOT FROZEN**  
**Origin:** `academy_kurenai`

> **CURRENT PLAYER-FACING SUCCESSOR:** `Documentation/Story/Academy_Kurenai_Origin_Final_Staged_Bell_Test_Rewrite_2026-09-30.md` @ `b98c00693c88a7ba6050b20d39d8f1bc760ed158`.
>
> This successor restores three meaningful Bell-Test choice stages, keeps the female instructor, preserves the four outcome classes, and restores Receipt -> CONTINUE -> YOUR CHRONICLE BEGINS ordering. Do not use this older one-choice player-facing structure.

> **2026-09-30 structural restoration authority:** `Documentation/Story/Academy_Kurenai_Origin_Staged_Choice_and_Receipt_Restoration_2026-09-30.md` @ `e7ce02375db5288c50bec9e457cdaa7cc96e6075`.
>
> The 2026-09-27 rewrite collapsed the durable staged deception architecture into one opening choice and is no longer current structural authority. The Bell Test must again use staged deception decisions; the Chronicle Receipt must precede `YOUR CHRONICLE BEGINS`.

> **2026-09-29 expansion successor:** `Documentation/Story/Academy_Kurenai_Origin_Benchmark_Expansion_2026-09-29.md` @ `5748e7df05bd0044b74fb054fdb4472b6ff77919`.
>
> **Voice anchor:** `Documentation/Story/Academy_Kurenai_Character_Voice_and_Personality_Anchor_2026-09-29.md` @ `7669d8fd4406cb79347e4be26723c15e9159d7a0`.
>
> Stephen explicitly chose to preserve the developed Bell Test/evaluation and expand the Origin around it. The Bell Test remains current core authority; the old immediate post-evaluation transition is superseded by the expansion.

## Environment

Current implementation-safe backdrop for every beat:

`Scene backdrops/academy_training_ground_courtyard.png`

A later approved same-location alternate-angle asset may replace the evaluation backdrop without changing Story semantics.

---

# PLAYER-FACING STORY

## SCENE 1 — THE BELL

### `kur_open_01` — narration

The instructor hangs a small bell from two fingers.

It barely moves.

Kurenai watches the bell first, then his hand, then his feet.

### `kur_open_02` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Take it.”

### `kur_open_03` — dialogue — KURENAI

**KURENAI:** “That's all?”

### `kur_open_04` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “If you need more instructions, you may already have a problem.”

Kurenai's eyes return to the bell.

### `kur_approach` — choice

**SEND A FALSE KURENAI**

**HIDE MY REAL MOVEMENT**

**DISTORT HIS SENSE OF DISTANCE**

**MAKE THE DIRECT APPROACH LOOK REAL**

---

# ROUTE 1 — SEND A FALSE KURENAI

### `kur_false_01` — narration

Kurenai moves first without moving at all.

A second Kurenai breaks toward the bell.

### `kur_false_02` — narration

The instructor does not follow it.

His eyes stay on the patch of empty ground where the real Kurenai thought she had disappeared.

### `kur_false_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Too early.”

### `kur_false_04` — narration

The false Kurenai reaches for the bell and comes apart before her fingers close.

The instructor turns just enough to meet the real approach waiting behind it.

Kurenai stops.

The bell never changes hands.

**AUTHOR RESULT:** `complete_loss`

**Next:** `kur_eval_loss_01`

---

# ROUTE 2 — HIDE MY REAL MOVEMENT

### `kur_conceal_01` — narration

Kurenai leaves the instructor something obvious to watch.

Her real movement goes the other way.

### `kur_conceal_02` — narration

He turns toward the distraction exactly when she wants him to.

By the time he looks back, Kurenai is behind him.

The bell jingles beside his ear.

### `kur_conceal_03` — dialogue — KURENAI

**KURENAI:** “Looking for this?”

The instructor glances toward the bell in her hand.

Then smiles.

### `kur_conceal_04` — narration

The sound cuts out.

Kurenai looks down.

Her hand is empty.

The real bell is still hanging from the instructor's fingers.

### `kur_conceal_05` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Better.”

That makes it worse.

**AUTHOR RESULT:** `partial_loss`

**Next:** `kur_eval_partial_loss_01`

---

# ROUTE 3 — DISTORT HIS SENSE OF DISTANCE

### `kur_distance_01` — narration

Kurenai gives him the correct direction and the wrong distance.

Every step toward her lands a little shorter than it should.

### `kur_distance_02` — narration

The instructor notices only when Kurenai is already close enough to touch the bell.

She takes it and retreats.

### `kur_distance_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Head-on?”

Kurenai lets him think she is backing away.

### `kur_distance_04` — narration

His next step commits to where she should be.

Kurenai is somewhere else.

For the first time, his expression changes.

Only slightly.

Enough.

### `kur_distance_05` — narration

Then breath touches the back of her shoulder.

The instructor is behind her.

Two fingers hook the bell away before she can turn.

### `kur_distance_06` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “A strong attempt.”

Kurenai looks at the empty cord in her hand.

### `kur_distance_07` — dialogue — KURENAI

**KURENAI:** “You sound disappointed.”

### `kur_distance_08` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “I said strong.”

**AUTHOR RESULT:** `partial_win`

**Next:** `kur_eval_partial_win_01`

---

# ROUTE 4 — MAKE THE DIRECT APPROACH LOOK REAL

### `kur_complete_01` — narration

Kurenai does something almost insulting.

She rushes him.

No clever angle.

No hidden approach.

No subtlety.

The instructor's attention sharpens anyway.

### `kur_complete_02` — narration

He catches her before she reaches the bell.

His hand closes around her wrist.

### `kur_complete_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Got you.”

The yard bends.

### `kur_complete_04` — narration

Kurenai is standing behind him with the bell between two fingers.

### `kur_complete_05` — dialogue — KURENAI

**KURENAI:** “Have you?”

The yard bends again.

### `kur_complete_06` — narration

The instructor is behind Kurenai now.

The bell is back in his hand.

### `kur_complete_07` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Yes.”

The yard folds one final time.

### `kur_complete_08` — narration

They are both standing where the exercise began.

Same distance.

Same posture.

Same quiet courtyard.

Except Kurenai is holding the bell.

She looks down at it once.

Then at him.

### `kur_complete_09` — dialogue — KURENAI

**KURENAI:** “You were saying?”

The instructor exhales through his nose.

Not quite a laugh.

**AUTHOR RESULT:** `complete_win`

**Next:** `kur_eval_win_01`

---

# SCENE 2 — EVALUATION

## COMPLETE LOSS

### `kur_eval_loss_01` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “You gave me the illusion before you gave me a reason to believe it.”

Kurenai looks once at the place her false approach disappeared.

### `kur_eval_loss_02` — dialogue — KURENAI

**KURENAI:** “I showed you the trick.”

### `kur_eval_loss_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Exactly.”

**Next:** `kur_eval_core_01`

---

## PARTIAL LOSS

### `kur_eval_partial_loss_01` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “You made me believe you had the bell.”

### `kur_eval_partial_loss_02` — dialogue — KURENAI

**KURENAI:** “For a second.”

### `kur_eval_partial_loss_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “And then you believed it too.”

Kurenai's mouth tightens.

Fair.

Annoying.

Fair.

**Next:** `kur_eval_core_01`

---

## PARTIAL WIN

### `kur_eval_partial_win_01` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “You moved where I thought you couldn't.”

### `kur_eval_partial_win_02` — dialogue — KURENAI

**KURENAI:** “Long enough to take it.”

### `kur_eval_partial_win_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Not long enough to keep it.”

Kurenai glances at the bell.

### `kur_eval_partial_win_04` — dialogue — KURENAI

**KURENAI:** “Next time.”

**Next:** `kur_eval_core_01`

---

## COMPLETE WIN

### `kur_eval_win_01` — narration

The instructor looks at the bell in Kurenai's hand.

This time he does not reach for it.

### `kur_eval_win_02` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “You kept track of the real one.”

### `kur_eval_win_03` — dialogue — KURENAI

**KURENAI:** “So did you.”

### `kur_eval_win_04` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Eventually.”

Kurenai smiles.

**Next:** `kur_eval_core_01`

---

# SHARED CLOSE

### `kur_eval_core_01` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Genjutsu isn't only making somebody believe something false.”

He taps the bell once.

### `kur_eval_core_02` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “It's knowing what stays true after both of you start lying.”

Kurenai looks at the bell.

Then at him.

She does not answer immediately.

### `kur_close_01` — narration

The exercise is over.

The uncertainty takes a little longer to leave.

### `kur_close_02` — transition

**YOUR CHRONICLE BEGINS**

---

# AUTHOR / CODING CONTRACT

## Meaningful choice

Render only `kur_approach` as the current player decision surface.

The old single-option follow-up cards are authored continuation beats in this candidate.

## Outcome mapping

- SEND A FALSE KURENAI -> `complete_loss`
- HIDE MY REAL MOVEMENT -> `partial_loss`
- DISTORT HIS SENSE OF DISTANCE -> `partial_win`
- MAKE THE DIRECT APPROACH LOOK REAL -> `complete_win`

This does not invent a new outcome class.

## Source

Commit one:

`occ_origin_kurenai_bell_test_resolution`

with exact `bellTestOutcomeClass`.

## Battle

NONE.

## Backdrop

Current main:

`Scene backdrops/academy_training_ground_courtyard.png`

A later same-location alternate-angle asset may replace evaluation presentation after exact path authority exists.

---

# BENCHMARK AUDIT

- admin/state-report runtime prose: removed
- four outcome classes: visibly differentiated
- fake single-option choice prompts: removed from candidate surface
- Kurenai voice: composed/direct/quietly competitive
- instructor autonomy: preserved
- illusion reversals: performed rather than summarized
- no Battle/runtime leakage: GREEN
- no-scroll segmentation: GREEN
- over-fragmentation: controlled
- exact current backdrop: GREEN
- Stephen approval: **APPROVED 2026-09-27**
