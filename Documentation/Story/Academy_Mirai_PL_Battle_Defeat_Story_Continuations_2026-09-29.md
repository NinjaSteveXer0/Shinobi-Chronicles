# Shinobi Chronicles — Academy Mirai Origin — PL Battle Defeat Story Continuations

**Date:** 2026-09-29  
**Owner:** Stephen / Writing — Konoha  
**Status:** **SUPERSEDED — DO NOT IMPLEMENT CURRENT CONTINUATION ROUTING**  
**Production Origin:** `academy_mirai`

> **Superseded by:** `Documentation/Story/Academy_Mirai_PL_Battle_Defeat_Assessment_Termination_2026-09-29.md` @ `67d0c83e7bd75b523d4a3b010d36dfd2ab4ff126`.
>
> Owner browser review proved that acknowledging defeat but then resuming the escort still fails Story causality. On defeat, the assessment now ends at the Battle location; any later Checkpoint Three scene is debrief only.

## Defect

Owner installed-browser review confirmed that Mirai can legitimately lose the authorised disguised-instructor PL Battle, but no authored defeat scene plays before the Origin continues toward its ending.

Current Combat correctly returns:

`battleResult = "defeat"`

when Mirai reaches 0 Remaining Battle PL.

However, current Story authority sends both victory and defeat straight into the ordinary caller return.

That is insufficient player-facing Story.

A real Battle defeat must be acknowledged on screen.

## Preserve

Do not change:
- Battle config: `academy_mirai_origin_disguised_instructor_battle`;
- opponent identity: `academy_mirai_origin_instructor`;
- female underlying instructor identity;
- apparent male Traveller / Escort presentation before reveal;
- PL16;
- attacks / AI / action economy;
- 0 Battle PL = Battle depletion / withdrawal only;
- no injury;
- no death;
- no custody;
- no automatic mission failure;
- no automatic identity reveal from Battle alone;
- 0 Ryō Battle cash on defeat;
- existing Mirai Knowledge/history.

This correction is Story continuation only.

---

# 1. SHORTCUT CALLER — DEFEAT

Caller:

`academy_mirai_origin_shortcut_battle`

Old defeat return:

`defeat -> mir_shortcut_battle_return -> Scene 5`

New defeat return:

`defeat -> mir_shortcut_defeat_01 -> ... -> mir_shortcut_defeat_09 -> Scene 5 post-Battle variant`

The disguise remains active.

Mirai does **not** learn that the Traveller is the Academy instructor here.

## `mir_shortcut_defeat_01` — narration

Mirai's footing gives first.

She catches herself against the storehouse wall before she hits the ground.

The Traveller does not follow with another attack.

## `mir_shortcut_defeat_02` — dialogue — TRAVELLER

**TRAVELLER:** “Enough.”

## `mir_shortcut_defeat_03` — narration

Mirai looks up.

He has space to leave.

He does not take it.

That bothers her more than if he had run.

## `mir_shortcut_defeat_04` — dialogue — MIRAI

**MIRAI:** “Why did you stop?”

## `mir_shortcut_defeat_05` — dialogue — TRAVELLER

**TRAVELLER:** “Because you did.”

## `mir_shortcut_defeat_06` — narration

Mirai pushes herself upright.

Her arms feel heavy.

Her attention does not.

She looks back toward the way they entered the lane.

## `mir_shortcut_defeat_07` — dialogue — MIRAI

**MIRAI:** “We're going back to the main road.”

## `mir_shortcut_defeat_08` — dialogue — TRAVELLER

**TRAVELLER:** “Your mission.”

## `mir_shortcut_defeat_09` — narration

Mirai lets him walk first.

Not far.

Just far enough that she can see both of his hands.

They return to the checkpoint road with more space between them than before.

### Return

Continue into Scene 5 using a **post-Battle opening variant**:

> The shortcut rejoins the checkpoint road beyond the market district.  
> Mirai keeps the Traveller in front of her now.  
> Checkpoint Three is not far.

Then continue the existing Scene-5 conversation / contradiction / chakra-evidence chain as legitimately available.

### Knowledge boundary

The defeat establishes only observable facts:
- this apparent Traveller fought Mirai;
- he stopped when Mirai became Battle-depleted;
- he did not use the opportunity to flee;
- Mirai now treats him more cautiously.

It does **not** establish:
- Academy instructor identity;
- substitution timing;
- motive;
- controlled-assessment truth.

---

# 2. CONFRONTATION CALLER — DEFEAT

Caller:

`academy_mirai_origin_confrontation_battle`

Old defeat return:

`defeat -> mir_confrontation_battle_return -> immediate disguise reveal`

New defeat return:

`defeat -> mir_confrontation_defeat_01 -> ... -> mir_confrontation_defeat_08 -> existing disguise reveal`

## `mir_confrontation_defeat_01` — narration

Mirai's guard breaks before the Traveller's does.

She drops to one knee.

The exchange stops.

Immediately.

## `mir_confrontation_defeat_02` — narration

Mirai looks up.

The Traveller is still standing exactly where she blocked the road.

He is not running for the checkpoint.

## `mir_confrontation_defeat_03` — dialogue — TRAVELLER

**TRAVELLER:** “Done?”

## `mir_confrontation_defeat_04` — dialogue — MIRAI

**MIRAI:** “No.”

The answer comes before she has fully caught her breath.

## `mir_confrontation_defeat_05` — dialogue — TRAVELLER

**TRAVELLER:** “You can't keep fighting.”

## `mir_confrontation_defeat_06` — dialogue — MIRAI

**MIRAI:** “I can keep asking.”

## `mir_confrontation_defeat_07` — narration

The Traveller looks at her for a long second.

Then his shoulders ease.

## `mir_confrontation_defeat_08` — dialogue — TRAVELLER

**TRAVELLER:** “Good.”

Smoke bursts across the road.

### Existing reveal resumes

Continue into the current authorised reveal:

> Mirai jumps back.  
> The Academy instructor stands where the Traveller had been.

Then preserve:

**MIRAI:** “Where is he?”

and the existing reveal / checkpoint continuation.

### Meaning

Mirai lost the **Battle**.

She did not lose:
- the evidence she gathered;
- the decision to confront;
- the question of who she was escorting;
- the whole Origin.

The instructor revealing herself after the defeat is the authored assessment continuation, not a reward for winning.

---

# 3. DEBRIEF ACKNOWLEDGEMENT

If Mirai reached the reveal through **confrontation defeat**, the checkpoint debrief may include this short route-specific exchange before the final reflection family:

**ACADEMY INSTRUCTOR:** “You lost the exchange.”

Mirai looks at her.

**MIRAI:** “I know.”

**ACADEMY INSTRUCTOR:** “You still stopped me.”

Mirai glances toward the real Traveller.

Then back.

**MIRAI:** “I wasn't letting you walk in there until I knew who you were.”

The instructor nods once.

No speech follows.

This is factual acknowledgement, not a morality lesson.

If Mirai reached the reveal through shortcut defeat and later verification, do not reuse this confrontation-specific exchange.

---

# 4. FINAL REFLECTION INTERACTION

The 2026-09-29 route-aware ending authority remains:

`Documentation/Story/Academy_Mirai_Origin_Ending_Reflection_Rewrite_2026-09-29.md`

Battle defeat does not create a generic “I lost” reflection family.

Select the final reflection from what Mirai actually learned:
- conversation catch;
- chakra catch;
- suspicion / no confrontation;
- missed substitution.

Where confrontation defeat occurred, preserve the Battle result in Chronicle/history, but do not replace Mirai's identity-verification reflection with a combat-performance lesson.

---

# 5. RUNTIME ACCEPTANCE

## Shortcut defeat

Must visibly show:

`Battle defeat`
-> Mirai against wall / Traveller stops
-> “Why did you stop?”
-> “Because you did.”
-> Mirai orders return to main road
-> post-Battle Scene 5
-> later evidence/reveal
-> route-aware ending
-> Chronicle Receipt

No immediate identity reveal.

## Confrontation defeat

Must visibly show:

`Battle defeat`
-> Mirai on one knee
-> “Done?” / “No.”
-> “You can't keep fighting.” / “I can keep asking.”
-> “Good.”
-> smoke / female instructor reveal
-> checkpoint
-> route-aware debrief/reflection
-> Chronicle Receipt

## Hard failure conditions

Fail if:
- defeat jumps directly to mission ending;
- defeat jumps directly to Chronicle Receipt;
- defeat is treated as injury/death;
- shortcut defeat reveals instructor identity;
- confrontation defeat skips the defeat scene;
- Battle result is silently ignored;
- defeat pays Battle cash;
- Mirai's earlier Knowledge is erased.

## Final lock

> **Every legitimate Mirai PL Battle defeat must have an authored visible Story consequence before the Origin continues. Battle defeat is not mission failure, but it must never be narratively invisible.**
