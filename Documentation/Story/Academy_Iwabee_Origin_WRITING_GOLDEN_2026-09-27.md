> **APPROVAL RECORD — 2026-09-27**
>
> Stephen explicitly approved the benchmark-optimized Origin sweep for promotion. This file is the production Writing authority for player-facing expression. Runtime implementation and Browser GOLDEN remain separate.
>
> Presentation binding also consumes:
> `Documentation/Story/Academy_Origins_NPC_Card_and_Backdrop_Projection_Manifest_2026-09-27.md`

# Academy Iwabee Origin — WRITING GOLDEN

**Date:** 2026-09-27  
**Owner:** Writing / Story — Konoha  
**Status:** **OWNER BROWSER RED 2026-09-30 — NOT GOLDEN / FULL STORY REWRITE ACTIVE**  
**Origin:** `academy_iwabee`

> **CURRENT PLAYER-FACING SUCCESSOR:** `Documentation/Story/Academy_Iwabee_Origin_Full_Story_Rewrite_2026-09-30.md` @ `0d8f64404631e1f2865bd192ce470c8690218317`.
>
> Preserve this older file only for machine/route semantics where not superseded. Do not use its player-facing Story as current authority.

> **2026-09-29 natural-voice successor:** `Documentation/Story/Academy_Iwabee_Origin_Natural_Voice_Benchmark_Rewrite_2026-09-29.md` @ `7209383cebd82a0e4598a44f91e91c3a7cc76ad8`.
>
> Owner review found too much theme-explaining / unnatural dialogue in the approved 2026-09-27 expression. Preserve this file for IWA/Battle/route semantics; do not use its player-facing dialogue as current final authority.

## Successor purpose

This is the Stephen-approved production Writing successor for Academy Iwabee.

It preserves the locked terrain/Rogue/instructor/self-interpretation spine while:
- consuming the current CE Rogue confrontation contract;
- consuming the current Rogue Genin PL/Registry mapping;
- removing excessive click-per-sentence segmentation;
- keeping World-owned Rogue disposition outside Writing.

## Environment

Every Story scene uses:

`Scene backdrops/academy_training_ground_courtyard.png`

Damaged / reshaped terrain is occurrence-specific scene state over that backdrop.

---

# PLAYER-FACING STORY

## SCENE 1 — PRACTICAL FRUSTRATION

### `iwa_open_01` — narration

Iwabee drops the written exercise onto the bench harder than he needs to.

Another red mark. Another page full of things he is supposed to prove before anybody lets him do the part he is actually good at.

### `iwa_open_02` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Finished being angry at the paper?”

### `iwa_open_03` — dialogue — IWABEE

**IWABEE:** “No.”

### `iwa_open_04` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Good. You can be angry outside.”

The instructor leads him across the practical ground to a section left broken and uneven by an earlier exercise.

### `iwa_open_05` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Make the area usable again.”

Iwabee looks over the collapsed ground.

### `iwa_open_06` — dialogue — IWABEE

**IWABEE:** “That's it?”

### `iwa_open_07` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “You wanted practical.”

Iwabee's mood changes immediately.

### `iwa_open_08` — dialogue — IWABEE

**IWABEE:** “Finally.”

---

# SCENE 2 — EARTH RELEASE PRACTICAL

### `iwa_reshape` — choice

**RAISE THE COLLAPSED SECTION**

**FLATTEN THE DAMAGED GROUND**

**BUILD A STABLE PATH THROUGH IT**

**REINFORCE THE WEAKEST SECTION**

---

# RAISE THE COLLAPSED SECTION

### `iwa_raise_01` — narration

Iwabee plants himself beside the sunken section and draws the earth upward.

The collapsed ground rises in a rough slab until it sits level with the rest of the yard.

Loose stone slides from the lifted edge.

Something underneath it moves.

### `iwa_raise_02` — narration

Not something.

Someone.

**Next:** `iwa_expose_01`

---

# FLATTEN THE DAMAGED GROUND

### `iwa_flatten_01` — narration

Iwabee drives the broken ridges down rather than rebuilding them.

The surface settles beneath his control, spreading the rubble that had been piled along one side.

A figure behind it suddenly has nowhere to hide.

**Next:** `iwa_expose_01`

---

# BUILD A STABLE PATH THROUGH IT

### `iwa_path_01` — narration

Iwabee leaves the worst of the collapse alone and raises a solid strip of earth straight through it.

The new path cuts cleanly through the debris.

A pair of feet that absolutely should not be there are standing beside it.

Iwabee looks up.

**Next:** `iwa_expose_01`

---

# REINFORCE THE WEAKEST SECTION

### `iwa_reinforce_01` — narration

Iwabee studies the damaged section long enough to find the point most likely to collapse again.

He packs earth beneath it until the weakened edge locks into place.

The shift pushes aside a sheet of broken timber somebody had been using as cover.

A young shinobi is crouched behind it.

**Next:** `iwa_expose_01`

---

# SCENE 3 — THE ROGUE GENIN

### `iwa_expose_01` — narration

The stranger is wearing shinobi gear.

Not Academy gear.

His eyes go from Iwabee to the instructor, then immediately to the clearest route out of the yard.

### `iwa_expose_02` — dialogue — ROGUE GENIN

**ROGUE GENIN:** “Move.”

### `iwa_expose_03` — dialogue — IWABEE

**IWABEE:** “No.”

### `iwa_response` — choice

**CONFRONT HIM**

**BLOCK HIS ESCAPE WITH EARTH RELEASE**

**CALL THE INSTRUCTOR**

**FINISH THE PRACTICAL**

---

# BRANCH A — CONFRONT HIM

### `iwa_confront_01` — narration

Iwabee steps between the Rogue Genin and the open side of the yard.

### `iwa_confront_02` — dialogue — ROGUE GENIN

**ROGUE GENIN:** “You an Academy kid or a guard?”

### `iwa_confront_03` — dialogue — IWABEE

**IWABEE:** “Right now?”

Iwabee settles his stance.

### `iwa_confront_04` — dialogue — IWABEE

**IWABEE:** “I'm the one in your way.”

### `iwa_confront_05` — narration

The Rogue Genin stops looking for a way around him.

---

# CONDITIONAL PL BATTLE — AUTHOR / RUNTIME ONLY

Config:
`academy_iwabee_origin_rogue_confrontation`

Encounter:
`origin_academy_iwabee:rogue_genin_confrontation`

Historical participant:
`iwabee_origin_rogue_genin_01`

Battle template:
`rogue_genin`

Base PL:
- Iwabee = 13
- Rogue Genin = 23

Caller:
after `iwa_confront_05`

Return selector:

- Iwabee withdrawal / Rogue still eligible -> `iwa_confront_loss_01`
- Rogue withdrawal / Iwabee still eligible -> `iwa_confront_return_01`

0 PL = withdrawal only.

Battle result does not itself establish:
- capture;
- surrender;
- escape;
- injury;
- death;
- IWA-02.

No reward.

### Defeat bridge

Binding authority:

`Documentation/Story/Academy_Iwabee_Direct_Confrontation_Defeat_Story_Bridge_2026-09-27.md`

commit:
`c86b8f408cd4f59a0d8f19343bea6e4b048dcd4d`

The expected fresh-Iwabee loss is a normal Story branch:
`iwa_confront_loss_01 -> ... -> iwa_confront_loss_05 -> iwa_confront_loss_world_result`

Closed fresh-defeat disposition:
- Rogue escapes;
- instructor protects withdrawn Iwabee;
- no custody;
- no injury/death;
- no retry / Origin failure.

The binding defeat bridge now plays the exact World result before:
`iwa_eval_route_confront_loss_01 -> ... -> iwa_eval_core_01`.

### Legitimate victory return

### `iwa_confront_return_01` — narration

When the confrontation is over, the repaired section of training ground is still where Iwabee put it.

Whatever became of the Rogue Genin is a second fact the instructor now has to deal with.

**AUTHOR:** on legitimate Iwabee victory, the Rogue withdraws and the instructor establishes `TEMPORARY_INSTRUCTOR_DETENTION`. Direct victory still does not satisfy IWA-02.

**Next:** `iwa_eval_route_confront`

---

# BRANCH B — BLOCK HIS ESCAPE WITH EARTH RELEASE

### `iwa_block_01` — narration

Iwabee does not chase him.

He watches where the Rogue is looking.

The moment the man commits to the open side of the yard, earth rises across it.

Not an attack.

A wall where there was an exit a second ago.

### `iwa_block_02` — dialogue — ROGUE GENIN

**ROGUE GENIN:** “Seriously?”

### `iwa_block_03` — dialogue — IWABEE

**IWABEE:** “You said move.”

Iwabee glances at the blocked route.

### `iwa_block_04` — dialogue — IWABEE

**IWABEE:** “Try another direction.”

**AUTHOR:** commit IWA-02 here:
`earthReleaseUsedToConstrainRogueGenin = true`

Constraint does NOT imply immobilisation, Stun, capture, PL damage or Battle advantage.

Current World result:
- Rogue surrenders;
- instructor establishes `TEMPORARY_INSTRUCTOR_DETENTION`;
- no second Battle.

### `iwa_block_return_01` — narration

The Rogue looks at the new wall.

Then at the instructor.

Whatever calculation he makes ends there.

He raises his hands.

The instructor takes control of the situation while Iwabee looks from the barrier to the first section of ground he repaired.

Two changes.

One assignment.

**Next:** `iwa_eval_route_block`

---

# BRANCH C — CALL THE INSTRUCTOR

### `iwa_call_01` — narration

Iwabee keeps his eyes on the Rogue Genin.

### `iwa_call_02` — dialogue — IWABEE

**IWABEE:** “Sensei.”

### `iwa_call_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “I see him.”

The instructor moves between the Academy students and the unexpected shinobi.

### `iwa_call_04` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Back up.”

Iwabee does.

He does not look pleased about it.

### `iwa_call_05` — narration

The Rogue sees the instructor commit to shielding the students and takes the open route instead.

By the time the instructor can safely move after him, he is gone.

**AUTHOR:** Rogue escapes. No custody.

**Next:** `iwa_eval_route_call`

---

# BRANCH D — FINISH THE PRACTICAL

### `iwa_finish_01` — narration

Iwabee looks at the Rogue Genin.

Then at the ground he was actually told to fix.

### `iwa_finish_02` — dialogue — IWABEE

**IWABEE:** “Not my assignment.”

He turns back to the practical.

### `iwa_finish_03` — narration

Whatever happens behind him, the training ground is usable when he is finished.

That part is not ambiguous.

### `iwa_finish_04` — narration

Behind him, footsteps break toward the open side of the yard.

The Rogue is gone before Iwabee finishes the last section.

**AUTHOR:** Rogue escapes. Do not credit Iwabee with resolving him. IWA-01 remains complete.

**Next:** `iwa_eval_route_finish`

---

# SCENE 6 — INSTRUCTOR EVALUATION

## CONFRONT ROUTE

### `iwa_eval_route_confront` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “You saw another problem and went straight at it.”

### `iwa_eval_route_confront_02` — dialogue — IWABEE

**IWABEE:** “It was standing right there.”

The instructor looks at the repaired ground.

### `iwa_eval_route_confront_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “So was that.”

**Next:** `iwa_eval_core_01`

---

## BLOCK ESCAPE ROUTE

### `iwa_eval_route_block` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “You changed the ground twice.”

### `iwa_eval_route_block_02` — dialogue — IWABEE

**IWABEE:** “Second one wasn't on the worksheet.”

### `iwa_eval_route_block_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “No.”

The instructor looks at the barrier.

### `iwa_eval_route_block_04` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Still useful.”

**Next:** `iwa_eval_core_01`

---

## CALL INSTRUCTOR ROUTE

### `iwa_eval_route_call` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “You called me.”

### `iwa_eval_route_call_02` — dialogue — IWABEE

**IWABEE:** “You're the instructor.”

### `iwa_eval_route_call_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Good. You noticed.”

Iwabee gives him a look that makes it very clear he is not accepting that as praise.

**Next:** `iwa_eval_core_01`

---

## FINISH PRACTICAL ROUTE

### `iwa_eval_route_finish` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “You finished the assignment.”

### `iwa_eval_route_finish_02` — dialogue — IWABEE

**IWABEE:** “That was the point.”

The instructor glances toward whatever became of the Rogue Genin situation.

### `iwa_eval_route_finish_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “It was one point.”

**Next:** `iwa_eval_core_01`

---

# CORE EVALUATION

### `iwa_eval_core_01` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “You know what your problem is, Iwabee?”

### `iwa_eval_core_02` — dialogue — IWABEE

**IWABEE:** “Yeah. Written tests.”

### `iwa_eval_core_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “No. You keep acting like the only things that count are the things you're bad at.”

### `iwa_eval_core_04` — narration

Iwabee looks across the ground he reshaped.

Nobody has to tell him whether that part worked.

---

# SCENE 7 — IWABEE'S ANSWER

### `iwa_reflect` — choice

**“I KNOW WHAT I'M GOOD AT.”**

**“I STILL NEED TO GET BETTER AT THE REST.”**

**“MAYBE THE ACADEMY TESTS THE WRONG THINGS.”**

**“I DON'T CARE WHAT THEY THINK.”**

---

## I KNOW WHAT I'M GOOD AT

### `iwa_reflect_good_01` — dialogue — IWABEE

**IWABEE:** “I know what I'm good at.”

### `iwa_reflect_good_02` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Then stop treating it like it doesn't count.”

Iwabee looks away.

He does not argue.

**Next:** `iwa_close_01`

---

## I STILL NEED TO GET BETTER AT THE REST

### `iwa_reflect_rest_01` — dialogue — IWABEE

**IWABEE:** “I still need to get better at the rest.”

### `iwa_reflect_rest_02` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Yeah.”

### `iwa_reflect_rest_03` — dialogue — IWABEE

**IWABEE:** “Don't sound so happy about it.”

**Next:** `iwa_close_01`

---

## MAYBE THE ACADEMY TESTS THE WRONG THINGS

### `iwa_reflect_tests_01` — dialogue — IWABEE

**IWABEE:** “Maybe the Academy tests the wrong things.”

### `iwa_reflect_tests_02` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Sometimes.”

Iwabee looks over.

### `iwa_reflect_tests_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Doesn't make the other things disappear.”

Iwabee clicks his tongue.

**Next:** `iwa_close_01`

---

## I DON'T CARE WHAT THEY THINK

### `iwa_reflect_care_01` — dialogue — IWABEE

**IWABEE:** “I don't care what they think.”

### `iwa_reflect_care_02` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Then make sure that's true.”

Iwabee frowns.

The instructor leaves it there.

**Next:** `iwa_close_01`

---

# SCENE 8 — CLOSE

### `iwa_close_01` — narration

The written exercise is still waiting on the bench.

The training ground is usable again.

Both are true.

Iwabee picks up the paper on his way out.

### `iwa_close_02` — transition

**YOUR CHRONICLE BEGINS**

---

# AUTHOR / CODING CONTRACT

## IWA-01

`occ_origin_iwabee_training_ground_reshape_resolution`

All four terrain choices:
- preserve exact selected terrain action;
- complete the formal reshape objective.

## IWA-02

`occ_origin_iwabee_rogue_genin_response_resolution`

Stable participant:
`iwabee_origin_rogue_genin_01`

Only authored environmental block route sets:
`earthReleaseUsedToConstrainRogueGenin = true`

Direct Battle victory does not counterfeit that fact.

## Battle

Current:
- config `academy_iwabee_origin_rogue_confrontation`
- encounter `origin_academy_iwabee:rogue_genin_confrontation`
- historical participant `iwabee_origin_rogue_genin_01`
- reusable capability template `rogue_genin`
- Rogue Base PL23
- Iwabee Base PL13
- caller after `iwa_confront_05`
- return `iwa_confront_return_01`
- no reward
- no automatic disposition from PL result.

Combat / World chain remains downstream.

## Backdrop

Every scene:
`Scene backdrops/academy_training_ground_courtyard.png`

---

# BENCHMARK AUDIT

- formal weakness vs practical ability shown, not explained: GREEN
- Earth Release affects Story verbs: GREEN
- Rogue remains genuine unexpected occurrence: GREEN
- no Academy morality-test drift: GREEN
- response choices remain legitimate without personality labels: GREEN
- current CE/Registry Battle authority consumed: GREEN
- World disposition boundary preserved: GREEN
- route-reactive instructor evaluation: GREEN
- no-scroll: GREEN
- over-fragmentation: repaired
- exact backdrop: GREEN
- Stephen approval: **APPROVED 2026-09-27**
