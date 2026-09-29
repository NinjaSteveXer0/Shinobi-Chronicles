# Shinobi Chronicles — Academy Mirai Origin — PL Battle Defeat Assessment Termination

**Date:** 2026-09-29  
**Owner:** Stephen / Writing — Konoha  
**Status:** **OWNER-DIRECT CORRECTION — BINDING PREVIEW IMPLEMENTATION / MIRAI REMAINS AMBER**  
**Production Origin:** `academy_mirai`

## 1. Owner defect

Stephen's installed-browser review proves the previous defeat continuation is still wrong.

Current bad behavior:

> Mirai loses the PL Battle, then continues the escort toward Checkpoint Three as though the Battle defeat changed nothing.

That is not the intended Story result.

A 0-PL Mirai is Battle-depleted and cannot continue the controlled exchange.

For this Origin, that means the **current escort assessment attempt ends at the Battle location**.

Mirai may still:
- learn the hidden assessment truth through the instructor's authored reveal;
- receive a later debrief;
- complete the Origin.

She may **not**:
- resume escort duty;
- walk the substitute to Checkpoint Three as though the mission is still active;
- earn a normal checkpoint-escort success from that defeated route.

## 2. Supersession

This file supersedes the defeat-continuation routing in:

`Documentation/Story/Academy_Mirai_PL_Battle_Defeat_Story_Continuations_2026-09-29.md`

commit:
`061ca97c325aa330da5a7e177eaaffe3b2bb75cc`

Specifically retired:
- shortcut defeat -> return to Scene 5;
- confrontation defeat -> reveal then continue through normal escort flow;
- any defeat path that allows Mirai to keep performing the escort assignment.

Victory paths are not reopened here.

## 3. Core route rule

For **either** authorised #338 Battle caller:

`battleResult = defeat`

must commit:

`miraiEscortAssessmentResult = "not_completed_battle_defeat"`

and:

`miraiEscortDutyActive = false`

Story meaning:

> Mirai's Origin continues, but this escort-assessment attempt is over.

This does not mean:
- injury;
- death;
- custody;
- permanent incompetence;
- Origin failure;
- loss of earlier Knowledge.

---

# 4. SHORTCUT CALLER — DEFEAT TERMINATES THE ASSESSMENT

Caller:

`academy_mirai_origin_shortcut_battle`

Battle backdrop:

`Mirai Origin Backdrop/konoha_storehouse_side_lane.png`

Pre-reveal physical presentation:
- Mirai;
- apparent male Traveller / Escort disguise.

## Routing

`defeat`
-> `mir_shortcut_defeat_end_01`
-> ...
-> `mir_shortcut_defeat_end_13`
-> BLACK WIPE
-> `mir_defeat_debrief_shortcut_01`
-> route-specific defeat reflection
-> Origin close / Receipt.

Do **not** return to Scene 5.

## `mir_shortcut_defeat_end_01` — narration

Mirai's guard gives first.

She catches herself against the storehouse wall.

The Traveller stops.

He does not attack again.

## `mir_shortcut_defeat_end_02` — dialogue — TRAVELLER

**TRAVELLER:** “Enough.”

## `mir_shortcut_defeat_end_03` — narration

Mirai forces herself upright.

Her arms feel heavy.

She still puts herself between him and the way back to the main road.

## `mir_shortcut_defeat_end_04` — dialogue — MIRAI

**MIRAI:** “I'm not done.”

## `mir_shortcut_defeat_end_05` — dialogue — TRAVELLER

**TRAVELLER:** “The exercise is.”

Mirai freezes.

Not because of the word.

Because of the voice behind it.

## `mir_shortcut_defeat_end_06` — narration

The Traveller raises one hand.

Smoke rolls through the lane.

## `mir_shortcut_defeat_end_07` — narration

When it clears, the Academy instructor is standing where he was.

Actor projection changes now:
- remove apparent Traveller / Escort card;
- project `NPC/mirai_instructor.png`;
- female presentation / she-her from this beat onward.

## `mir_shortcut_defeat_end_08` — dialogue — MIRAI

**MIRAI:** “Where is he?”

## `mir_shortcut_defeat_end_09` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “Checkpoint Three. Safe.”

## `mir_shortcut_defeat_end_10` — narration

Mirai looks toward the mouth of the lane.

Checkpoint Three is still several streets away.

The assignment is not.

It ended here.

## `mir_shortcut_defeat_end_11` — dialogue — MIRAI

**MIRAI:** “I was supposed to get him there.”

## `mir_shortcut_defeat_end_12` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “You were.”

## `mir_shortcut_defeat_end_13` — narration

Mirai looks back at the instructor.

No excuse comes.

The instructor does not ask for one.

### Transition

**BLACK WIPE**

Then:

**LATER — CHECKPOINT THREE**

Backdrop becomes:

`Mirai Origin Backdrop/checkpoint_three_day.png`

This is a debrief scene.

It is **not resumed escort gameplay**.

---

# 5. CONFRONTATION CALLER — DEFEAT TERMINATES THE ASSESSMENT

Caller:

`academy_mirai_origin_confrontation_battle`

Battle / defeat backdrop:

`Mirai Origin Backdrop/konoha_main_street.png`

Pre-reveal presentation:
- Mirai;
- apparent male Traveller / Escort disguise.

## Routing

`defeat`
-> `mir_confront_defeat_end_01`
-> ...
-> `mir_confront_defeat_end_12`
-> BLACK WIPE
-> `mir_defeat_debrief_confront_01`
-> route-specific defeat reflection
-> Origin close / Receipt.

Do **not** resume the escort after reveal.

## `mir_confront_defeat_end_01` — narration

Mirai's guard breaks before the Traveller's does.

She drops to one knee.

The exchange stops immediately.

## `mir_confront_defeat_end_02` — dialogue — TRAVELLER

**TRAVELLER:** “Done?”

## `mir_confront_defeat_end_03` — dialogue — MIRAI

**MIRAI:** “No.”

## `mir_confront_defeat_end_04` — dialogue — TRAVELLER

**TRAVELLER:** “You can't keep fighting.”

## `mir_confront_defeat_end_05` — dialogue — MIRAI

**MIRAI:** “I can keep asking.”

## `mir_confront_defeat_end_06` — narration

The Traveller looks at her for a moment.

Then his stance disappears.

## `mir_confront_defeat_end_07` — dialogue — TRAVELLER

**TRAVELLER:** “Good.”

## `mir_confront_defeat_end_08` — narration

Smoke bursts across the road.

When it clears, the Academy instructor stands in his place.

Actor projection changes now to:
`NPC/mirai_instructor.png`.

## `mir_confront_defeat_end_09` — dialogue — MIRAI

**MIRAI:** “Where is he?”

## `mir_confront_defeat_end_10` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “Checkpoint Three. Safe.”

## `mir_confront_defeat_end_11` — dialogue — MIRAI

**MIRAI:** “So I was right.”

## `mir_confront_defeat_end_12` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “About the switch.”

Mirai's eyes drop to the ground between them.

**ACADEMY INSTRUCTOR:** “You still lost the exchange.”

Mirai looks away.

She knows.

### Transition

**BLACK WIPE**

Then:

**LATER — CHECKPOINT THREE**

Backdrop:

`Mirai Origin Backdrop/checkpoint_three_day.png`

The escort attempt is already over.

---

# 6. SHORTCUT-DEFEAT DEBRIEF — CHECKPOINT THREE

Physical actors:
- Mirai;
- female Academy instructor;
- real male Traveller.

The real Traveller was already safe here.

Mirai did not escort him here after losing.

## `mir_defeat_debrief_shortcut_01` — narration

The real Traveller is sitting on the Checkpoint Three steps when Mirai arrives later with the instructor.

His travel bag is beside him.

The cup in his hands is almost empty.

## `mir_defeat_debrief_shortcut_02` — dialogue — TRAVELLER

**TRAVELLER:** “You found the shortcut.”

Mirai gives him a look.

## `mir_defeat_debrief_shortcut_03` — dialogue — MIRAI

**MIRAI:** “Apparently.”

## `mir_defeat_debrief_shortcut_04` — dialogue — TRAVELLER

**TRAVELLER:** “Didn't like it?”

## `mir_defeat_debrief_shortcut_05` — dialogue — MIRAI

**MIRAI:** “I lost a fight in it.”

The Traveller stops smiling.

## `mir_defeat_debrief_shortcut_06` — dialogue — TRAVELLER

**TRAVELLER:** “Oh.”

## `mir_defeat_debrief_shortcut_07` — narration

Mirai looks at the instructor.

## `mir_defeat_debrief_shortcut_08` — dialogue — MIRAI

**MIRAI:** “I followed someone I was supposed to be protecting into a route he chose.”

## `mir_defeat_debrief_shortcut_09` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “Yes.”

## `mir_defeat_debrief_shortcut_10` — dialogue — MIRAI

**MIRAI:** “Then I couldn't finish the escort.”

## `mir_defeat_debrief_shortcut_11` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “No.”

The instructor does not turn it into a speech.

Mirai already knows the result.

### SHORTCUT DEFEAT REFLECTION

Choose one:

**“I gave up control of the route before the fight even started.”**

**“I should've made him explain the shortcut before I followed.”**

**“Once I lost the exchange, the escort was over.”**

**“Next time I stop the problem before it becomes a fight.”**

These are route-relative interpretations only.

They do not alter the factual defeat.

---

# 7. CONFRONTATION-DEFEAT DEBRIEF — CHECKPOINT THREE

Physical actors:
- Mirai;
- female Academy instructor;
- real male Traveller.

## `mir_defeat_debrief_confront_01` — narration

The real Traveller is waiting at Checkpoint Three.

Mirai looks at him first.

Only after confirming he is fine does she turn back to the instructor.

## `mir_defeat_debrief_confront_02` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “You caught the substitution.”

## `mir_defeat_debrief_confront_03` — dialogue — MIRAI

**MIRAI:** “And lost the fight.”

## `mir_defeat_debrief_confront_04` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “Both happened.”

## `mir_defeat_debrief_confront_05` — narration

Mirai looks at the road behind them.

She stopped the wrong Traveller.

She could not hold him there.

Those are different facts.

## `mir_defeat_debrief_confront_06` — dialogue — MIRAI

**MIRAI:** “I still wouldn't have let you walk into the checkpoint.”

## `mir_defeat_debrief_confront_07` — dialogue — ACADEMY INSTRUCTOR

**ACADEMY INSTRUCTOR:** “I know.”

Nothing more is added.

### CONFRONTATION DEFEAT REFLECTION

Choose one:

**“I was right to stop her.”**

**“Seeing the problem wasn't enough to win the exchange.”**

**“Next time I need an answer after talking stops working.”**

**“I caught the switch. I still have to hold the road.”**

These are route-relative interpretations only.

They do not change the Battle result.

---

# 8. ORIGIN CLOSE AFTER BATTLE DEFEAT

Do not use a normal successful-escort close.

After either defeat reflection:

The Traveller lifts his cup toward Mirai.

**TRAVELLER:** “For what it's worth, I made it.”

Mirai looks at him.

Then at the instructor.

**MIRAI:** “That was never the whole assignment.”

The instructor gives the smallest nod.

Mirai turns toward the village.

She does not take out the route map.

She leaves Checkpoint Three knowing exactly where the escort ended.

Then:
- Chronicle Receipt;
- shared Origin completion;
- 100 Ryō Origin starting purse under existing World authority.

Battle defeat cash remains 0.

---

# 9. MACHINE-FACING RESULT

On either Battle defeat:

`battleResult = "defeat"`

Preserve:

`miraiBattlePLDepleted = true`

Add/commit Story result:

`miraiEscortAssessmentResult = "not_completed_battle_defeat"`

`miraiEscortDutyActive = false`

`miraiReachedCheckpointAsActiveEscort = false`

The later Checkpoint Three scene is:

`scenePurpose = "post_assessment_debrief"`

not:

`scenePurpose = "escort_continuation"`

MIR-03 / checkpoint escort result must not falsely record normal escort success on this branch.

Existing earlier Knowledge/evidence remains intact.

---

# 10. REVEAL RULE — SUPERSEDES OLD SHORTCUT-DEFEAT RULE

Old rule:

> shortcut Battle defeat does not reveal the disguise and returns to Scene 5.

Superseded.

New rule:

> The Battle result itself does not reveal hidden identity. After Mirai is Battle-depleted, **Story ends the controlled assessment**, and the instructor deliberately drops the disguise because the exercise is over.

Therefore:

`Battle defeat != magical identity Knowledge`

but:

`Battle defeat -> Story assessment termination -> authored instructor reveal`

This is a Story reveal, not a Combat leak.

Victory shortcut behavior remains unchanged unless separately superseded.

---

# 11. ACCEPTANCE

## Shortcut defeat

Required:

Battle defeat
-> visible defeat scene in storehouse lane
-> instructor says exercise is over
-> female instructor reveal
-> Mirai learns real Traveller is safe at Checkpoint Three
-> **BLACK WIPE**
-> **LATER — CHECKPOINT THREE**
-> defeat debrief
-> shortcut-defeat reflection
-> defeat-specific close
-> Receipt.

Forbidden:
- Scene 5 Road After;
- resuming escort;
- walking substitute to checkpoint;
- normal checkpoint success.

## Confrontation defeat

Required:

Battle defeat
-> visible defeat scene
-> instructor reveal
-> assessment explicitly over
-> **BLACK WIPE**
-> **LATER — CHECKPOINT THREE**
-> confrontation-defeat debrief
-> confrontation-defeat reflection
-> defeat-specific close
-> Receipt.

Forbidden:
- resumed escort;
- normal successful-escort checkpoint flow.

## Hard failure

Fail if Mirai loses the Battle and then behaves as active escort again.

## Final lock

> **Mirai can lose the Battle and still complete her Origin. She cannot lose the Battle and continue the escort assessment as though nothing happened. The assessment ends where she is Battle-depleted; Checkpoint Three afterward is a later debrief, not mission continuation.**
