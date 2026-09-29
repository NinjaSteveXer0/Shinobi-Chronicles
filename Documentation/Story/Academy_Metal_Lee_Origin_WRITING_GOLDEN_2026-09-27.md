> **APPROVAL RECORD — 2026-09-27**
>
> Stephen explicitly approved the benchmark-optimized Origin sweep for promotion. This file is the production Writing authority for player-facing expression. Runtime implementation and Browser GOLDEN remain separate.
>
> Presentation binding also consumes:
> `Documentation/Story/Academy_Origins_NPC_Card_and_Backdrop_Projection_Manifest_2026-09-27.md`

# Academy Metal Lee Origin — WRITING GOLDEN

**Date:** 2026-09-27  
**Owner:** Writing / Story — Konoha  
**Status:** **OWNER REOPENED 2026-09-29 — SUPERSEDED FOR CURRENT PLAYER-FACING VOICE / STORYTELLING**  
**Origin:** `academy_metal_lee`

> **2026-09-29 successor:** `Documentation/Story/Academy_Metal_Lee_Origin_Natural_Voice_Benchmark_Rewrite_2026-09-29.md` @ `30ab5a017db91cef0d23f144c48070ac5dd11e6e`.
>
> New binding voice anchor: `Documentation/Story/Academy_Metal_Lee_Character_Voice_and_Personality_Anchor_2026-09-29.md` @ `edfda2a0078e448cad60c8a3e0b025073b56f74f`.
>
> Owner review found the 2026-09-27 expression below the current dialogue/storytelling benchmark. Preserve this file for MET/Battle/resolver semantics only where not superseded; do not use its player-facing prose as final authority.

## Successor purpose

This is the Stephen-approved production Writing successor for Academy Metal Lee.

It preserves the closed private-capability / observed-performance / protective-response structure while:
- consuming the current CE spar contract;
- consuming the current stable Genin PL identity;
- removing excessive click-per-sentence segmentation;
- keeping the dummy-response prose ready for the current `success | partial | failure` resolver.

## Environment

Every Story scene uses:

`Scene backdrops/academy_training_ground_courtyard.png`

---

# PLAYER-FACING STORY

## SCENE 1 — PRIVATE TRAINING

### `met_open_01` — narration

The training courtyard is quiet enough for Metal to hear the dummy frame creak before it turns.

Good.

Quiet is easier.

### `met_private_choice` — choice

**SPINNING KICK**

**FULL-FORCE FIST**

**CONDITIONED ENDURANCE**

---

## SPINNING KICK

### `met_private_spin_01` — narration

Metal waits for the moving pad to cross his line, pivots with it, and drives a spinning kick through the centre.

The pad snaps back on its rail.

Metal lands exactly where he started.

**Next:** `met_watchers_01`

---

## FULL-FORCE FIST

### `met_private_fist_01` — narration

Metal plants his feet and lets the dummy roll toward him. At the last moment he steps through the timing and drives a Full-Force Fist into the reinforced centre pad.

The whole frame shudders.

His stance does not.

**Next:** `met_watchers_01`

---

## CONDITIONED ENDURANCE

### `met_private_endurance_01` — narration

Metal starts the moving-dummy cycle again.

Then again.

Then faster.

He keeps pace through every turn, breathing harder while the movement stays clean. When the mechanism finally slows, Metal is still moving.

**Next:** `met_watchers_01`

---

# SCENE 2 — THE AUDIENCE

### `met_watchers_01` — dialogue — GENIN

**GENIN:** “Nice.”

Metal stops.

### `met_watchers_02` — narration

There are people at the edge of the courtyard.

More than one.

They have been there long enough to know what he was doing.

Metal straightens too quickly and nearly catches his heel on the training mark. He fixes it before anybody comments.

### `met_watchers_03` — dialogue — METAL

**METAL:** “How long have you been standing there?”

### `met_watchers_04` — dialogue — GENIN

**GENIN:** “Long enough.”

That answer does not help.

---

# SCENE 3 — THE INVITATION

### `met_invite_01` — narration

The Genin steps away from the others, giving Metal space without leaving him alone.

### `met_invite_02` — dialogue — GENIN

**GENIN:** “Want to spar?”

Metal looks at the Genin.

Then at everyone behind them.

### `met_invite` — choice

**SPAR**

**KEEP WORKING THE DUMMY**

**BACK OUT**

---

# BRANCH A — SPAR

### `met_spar_01` — dialogue — METAL

**METAL:** “Fine.”

### `met_spar_02` — narration

Metal steps away from the apparatus. The Genin gives him room and settles opposite him.

### `met_spar_03` — dialogue — GENIN

**GENIN:** “Ready?”

### `met_spar_04` — dialogue — METAL

**METAL:** “Obviously.”

### `met_spar_05` — narration

Somebody behind the Genin shifts for a better view.

Metal hears it.

He wishes he hadn't.

---

# CONTROLLED PL BATTLE — AUTHOR / RUNTIME ONLY

Config:
`academy_metal_lee_origin_controlled_spar`

Encounter:
`origin_academy_metal_lee:inviting_genin_spar`

Participants:
- `academy_metal_lee` — Base PL13
- `metal_origin_inviting_genin` — Base PL15

0 Battle PL = withdrawal, not injury/death.

Metal withdrawal does not fail the Origin.

No reward.

Return using Metal's Remaining Battle PL against fixed start-of-spar underlying maximum:

- >50% -> `met_spar_strong_01`
- 25–50% -> `met_spar_mixed_01`
- <25% -> `met_spar_rough_01`

Exact 50% / 25% = mixed.
0 = rough.

Combat package is closed:
- Sparring Jab ATK5
- Turning Kick ATK6
- Guarded Stance — 25% one-use pre-Stamina guard
- Feint Entry
- Committed Lunge ATK6 / ATK7 after feint
- deterministic cycle: Jab -> Turning Kick -> Guard -> Feint -> Lunge -> repeat
- Metal acts first.

---

# SPAR — STRONG

### `met_spar_strong_01` — narration

When the spar ends, Metal is breathing hard but still standing cleanly enough that nobody can pretend the audience ruined him.

Metal notices them anyway.

### `met_spar_strong_02` — dialogue — GENIN

**GENIN:** “For somebody who looked like he wanted all of us to disappear, you did pretty well.”

### `met_spar_strong_03` — dialogue — METAL

**METAL:** “I did not want you to disappear.”

The Genin waits.

Metal's ears are getting red.

### `met_spar_strong_04` — dialogue — GENIN

**GENIN:** “Right.”

Metal looks away before the smile gets worse.

**Next:** `met_close_01`

---

# SPAR — MIXED

### `met_spar_mixed_01` — narration

The spar ends messier than Metal wanted. His breathing takes longer to settle, and he avoids looking at the people behind the Genin until avoiding them becomes obvious too.

### `met_spar_mixed_02` — dialogue — GENIN

**GENIN:** “You were fighting me and everybody behind me.”

### `met_spar_mixed_03` — dialogue — METAL

**METAL:** “They were distracting.”

### `met_spar_mixed_04` — dialogue — GENIN

**GENIN:** “Nobody said anything.”

Metal finally looks over.

Nobody had.

### `met_spar_mixed_05` — dialogue — METAL

**METAL:** “That was worse.”

The Genin laughs before they can stop themself.

Metal decides not to ask what was funny.

**Next:** `met_close_01`

---

# SPAR — ROUGH

### `met_spar_rough_01` — narration

By the end, Metal's movements barely resemble the ones he was making before he knew anyone was watching.

That is the worst part.

He remembers exactly how good they felt before.

### `met_spar_rough_02` — dialogue — GENIN

**GENIN:** “You were better before you saw us.”

Metal's head comes up.

### `met_spar_rough_03` — dialogue — METAL

**METAL:** “You think I'm bad.”

### `met_spar_rough_04` — dialogue — GENIN

**GENIN:** “No.”

The Genin glances at the audience.

### `met_spar_rough_05` — dialogue — GENIN

**GENIN:** “I think you noticed us.”

Metal opens his mouth.

Nothing useful arrives.

**Next:** `met_close_01`

---

# BRANCH B — KEEP WORKING THE DUMMY

### `met_dummy_01` — dialogue — METAL

**METAL:** “I don't need a spar. I can do it here.”

### `met_dummy_02` — narration

He turns back to the apparatus and starts the mechanism.

One cycle goes cleanly.

The next goes almost cleanly.

Somebody whispers behind him.

### `met_dummy_03` — narration

Metal's next step lands too far left. He corrects harder than he needs to, the dummy swings wider, and when he tries to catch the rhythm again the frame jumps its guide.

### `met_dummy_04` — narration

The training dummy tears sideways toward another student.

For the first time since he noticed the audience, Metal forgets they are there.

---

# PROTECTIVE RESPONSE

### `met_protect` — choice

**REDIRECT THE DUMMY**

**TAKE THE IMPACT**

**DESTROY THE DUMMY**

**AUTHOR:** MET-02 pressured demonstration remains a separate `rough` contextual-performance fact. MET-03 resolver result is not derived directly from it.

---

# REDIRECT THE DUMMY

## SUCCESS

### `met_redirect_success_01` — narration

Metal reaches the dummy on the turn and kicks across its line instead of against it.

The frame whips past the student and crashes into empty ground.

### `met_redirect_success_02` — dialogue — GENIN

**GENIN:** “Nice save.”

Metal is already looking at the student.

### `met_redirect_success_03` — dialogue — METAL

**METAL:** “You okay?”

The student nods.

Only then does Metal look back at the broken training line.

**Next:** `met_hazard_after_success_01`

## PARTIAL

### `met_redirect_partial_01` — narration

Metal catches the frame badly but changes its path enough that the direct hit is gone.

The Genin grabs the student and pulls them clear of the new line.

### `met_redirect_partial_02` — dialogue — GENIN

**GENIN:** “Close.”

### `met_redirect_partial_03` — dialogue — METAL

**METAL:** “Too close.”

**Next:** `met_hazard_after_partial_01`

## FAILURE

### `met_redirect_failure_01` — narration

Metal hits the frame at the wrong angle.

It barely moves.

The Genin gets there first and drags the student clear before the dummy smashes through the empty marker behind them.

### `met_redirect_failure_02` — dialogue — METAL

**METAL:** “Are you hurt?”

### `met_redirect_failure_03` — dialogue — STUDENT

**STUDENT:** “No.”

Metal looks at the dummy.

He does not answer.

**Next:** `met_hazard_after_failure_01`

---

# TAKE THE IMPACT

## SUCCESS

### `met_impact_success_01` — narration

Metal steps into the dummy's path and braces.

The moving frame drives into him and stops short of the student behind him.

### `met_impact_success_02` — dialogue — STUDENT

**STUDENT:** “Metal?”

### `met_impact_success_03` — dialogue — METAL

**METAL:** “You okay?”

The student nods.

Metal lets the frame drop.

**AUTHOR:** no injury is inferred from the intercept.

**Next:** `met_hazard_after_success_01`

## PARTIAL

### `met_impact_partial_01` — narration

Metal gets between the dummy and the student, but the frame keeps driving him backward.

The Genin catches the other side.

Together they stop it.

### `met_impact_partial_02` — dialogue — GENIN

**GENIN:** “Got it.”

### `met_impact_partial_03` — dialogue — METAL

**METAL:** “I had it.”

The Genin looks at the bent rail.

### `met_impact_partial_04` — dialogue — GENIN

**GENIN:** “Sure.”

**Next:** `met_hazard_after_partial_01`

## FAILURE

### `met_impact_failure_01` — narration

Metal moves to put himself in the path and comes up one step short.

The Genin pulls the student sideways as the dummy tears through the space they were standing in.

### `met_impact_failure_02` — dialogue — GENIN

**GENIN:** “You good?”

### `met_impact_failure_03` — dialogue — METAL

**METAL:** “Ask them.”

The threatened student nods quickly.

Metal finally exhales.

**Next:** `met_hazard_after_failure_01`

---

# DESTROY THE DUMMY

## SUCCESS

### `met_destroy_success_01` — narration

Metal does not chase the whole frame.

He targets the joint carrying its momentum and drives his strike through it.

The dummy folds sideways and drops before it reaches the student.

### `met_destroy_success_02` — narration

For a second, the courtyard is silent.

Metal looks around at everybody staring.

### `met_destroy_success_03` — dialogue — METAL

**METAL:** “What?”

**Next:** `met_hazard_after_success_01`

## PARTIAL

### `met_destroy_partial_01` — narration

Metal's strike breaks one side of the moving frame.

The rest keeps coming.

The Genin drives into the damaged section and knocks it down before it reaches the student.

### `met_destroy_partial_02` — dialogue — METAL

**METAL:** “I weakened it.”

### `met_destroy_partial_03` — dialogue — GENIN

**GENIN:** “I noticed.”

**Next:** `met_hazard_after_partial_01`

## FAILURE

### `met_destroy_failure_01` — narration

Metal commits to the strike.

The joint slips past the point he aimed for.

The Genin shoves the student clear and the dummy crashes into the empty rack behind them.

### `met_destroy_failure_02` — narration

Metal stares at the mark his fist left on the wrong part of the frame.

### `met_destroy_failure_03` — dialogue — GENIN

**GENIN:** “They're okay.”

### `met_destroy_failure_04` — dialogue — METAL

**METAL:** “I know.”

He does not sound relieved yet.

**Next:** `met_hazard_after_failure_01`

---

# AFTER THE HAZARD

## SUCCESS

### `met_hazard_after_success_01` — narration

The courtyard is much quieter now.

Metal checks the student once more before he remembers the audience exists.

### `met_hazard_after_success_02` — dialogue — GENIN

**GENIN:** “You moved fast.”

Metal looks at the wrecked dummy.

### `met_hazard_after_success_03` — dialogue — METAL

**METAL:** “Had to.”

**Next:** `met_close_01`

## PARTIAL

### `met_hazard_after_partial_01` — narration

The student is safe.

The Genin is still standing beside Metal, one hand on whatever part of the dummy they had to stop together.

### `met_hazard_after_partial_02` — dialogue — GENIN

**GENIN:** “You didn't freeze.”

Metal looks at them.

### `met_hazard_after_partial_03` — dialogue — METAL

**METAL:** “Wasn't time.”

**Next:** `met_close_01`

## FAILURE

### `met_hazard_after_failure_01` — narration

The student is safe because somebody else finished what Metal tried to do.

The Genin does not tell him it was fine.

Metal does not ask them to.

### `met_hazard_after_failure_02` — dialogue — STUDENT

**STUDENT:** “I'm okay.”

Metal nods once.

That is the only part he is ready to believe.

**Next:** `met_close_01`

---

# BRANCH C — BACK OUT

### `met_backout_01` — narration

Metal looks at the Genin, then at everybody behind them.

### `met_backout_02` — dialogue — METAL

**METAL:** “No.”

### `met_backout_03` — dialogue — GENIN

**GENIN:** “Okay.”

Metal frowns.

### `met_backout_04` — dialogue — METAL

**METAL:** “I didn't say I couldn't.”

### `met_backout_05` — dialogue — GENIN

**GENIN:** “Didn't say you did.”

The Genin steps back toward the others.

No one gets to turn Metal's answer into another challenge.

**Next:** `met_close_01`

---

# FINAL SCENE

### `met_close_01` — narration

Eventually the courtyard starts to empty.

The clean marks from Metal's private training are still there.

So are the later ones.

He looks at both before tightening his hand wraps.

### `met_close_02` — dialogue — METAL

**METAL:** “Again.”

### `met_close_03` — transition

**YOUR CHRONICLE BEGINS**

---

# AUTHOR / CODING CONTRACT

## MET-01

Private qualifying work commits before observer discovery.

Options:
- Spinning Kick
- Full-Force Fist
- Conditioned Endurance

Never expose `Intensive Focus`.

## MET-04

Stable person:
`metal_origin_inviting_genin`

Display:
**GENIN**

## Spar

Current CE/Registry package:
- config `academy_metal_lee_origin_controlled_spar`
- encounter `origin_academy_metal_lee:inviting_genin_spar`
- Genin Base PL15
- Metal Base PL13
- caller after `met_spar_05`
- strong/mixed/rough returns as authored above
- no reward.

## MET-03

Actions:
- redirect_dummy
- take_impact
- destroy_dummy

Outcomes:
- success
- partial
- failure

Deterministic resolver:
- redirect_dummy / Effective Taijutsu >=14 success, 11–13 partial, <=10 failure
- take_impact / Effective Stamina >=14 success, 11–13 partial, <=10 failure
- destroy_dummy / Effective Taijutsu >=15 success, 12–14 partial, <=11 failure

Fresh Base Metal resolves:
- redirect = partial
- take impact = success
- destroy = partial

Partial/failure uses the same stable Genin as intervening actor.

No injury inference.

## Backdrop

Every scene:
`Scene backdrops/academy_training_ground_courtyard.png`

---

# BENCHMARK AUDIT

- private ability established before observation: GREEN
- audience pressure shown rather than diagnosed: GREEN
- stable Genin behaves as a person, not therapist/UI: GREEN
- spar exact current contract consumed: GREEN
- MET-03 separate from MET-02: GREEN
- back-out non-collapse: GREEN
- no-scroll: GREEN
- over-fragmentation: repaired
- capability-based verbs: GREEN
- exact backdrop: GREEN
- Stephen approval: **APPROVED 2026-09-27**
