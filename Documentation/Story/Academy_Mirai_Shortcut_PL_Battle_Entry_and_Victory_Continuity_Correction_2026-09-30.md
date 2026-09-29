# Shinobi Chronicles — Academy Mirai Origin — Shortcut PL Battle Entry + Victory Continuity Correction

**Date:** 2026-09-30  
**Owner:** Stephen / Writing — Konoha  
**Status:** **OWNER BROWSER-DEFECT CORRECTION — BINDING PREVIEW IMPLEMENTATION / FINAL MIRAI WRITING RED FLAG**  
**Production Origin:** `academy_mirai`

> **SUPERSESSION NOTE — 2026-09-30 — BATTLE-TRIGGERED REVEAL**
>
> Stephen directly corrected this document's pre-Battle explanation and shortcut-victory concealment logic.
>
> Current successor:
> `Documentation/Story/Academy_Mirai_PL_Battle_Reveal_Trigger_and_Post_Battle_Causality_2026-09-30.md`
> @ `bd1ceddb8bc9044911d99cb31034235ac9f91bc3`
>
> The following rules in this file are **RETIRED**:
> - `Your instructor gave me one extra job.`
> - advance explanation that the apparent Traveller is an authorised assessment participant;
> - Mirai calmly knowing before Battle that this is a controlled assessment exchange;
> - shortcut victory preserving the disguise;
> - shortcut victory resuming ordinary escort duty with the substitute.
>
> Current law:
> **apparent Traveller attacks Mirai -> Mirai knows something is wrong -> PL Battle -> instructor reveals after Battle whether Mirai wins or loses.**
>
> This file remains useful only for route/backdrop/history context not contradicted by the successor.

## 1. Owner defect

Stephen's installed-browser review found the last remaining Mirai Writing red flag:

> Mirai follows the apparent Traveller into the shortcut / storehouse-side lane and the Story suddenly becomes a PL Battle with no explanation for why either character is fighting.

This is a Writing causality defect.

The current authoritative prose literally ends the shortcut approach with:

> The main road is gone behind them.

and then immediately enters:

> PL BATTLE

No player-facing trigger exists.

## 2. Required Story meaning

The shortcut Battle is not:
- a random attack;
- an unrelated ambush;
- Mirai spontaneously attacking the Traveller;
- the Battle engine revealing hidden instructor identity.

It is:

> **a deliberate controlled escort-assessment trap triggered because Mirai followed the apparent Traveller off the marked route and allowed the escort to take route control.**

Observer-safe truth available before reveal:

- Mirai knows this is an Academy escort assessment;
- the apparent Traveller may legitimately claim that Mirai's instructor gave him an extra test condition;
- Mirai may therefore understand that the fight is part of the assessment;
- Mirai still does **not** know that the Traveller is actually the female Academy instructor in disguise.

World Truth remains:

> the apparent Traveller is the disguised Academy instructor.

## 3. Preserve

Do not change:
- covered-market substitution truth;
- real Traveller remains safe;
- apparent Traveller remains male in observer-facing presentation before reveal;
- female underlying instructor identity;
- Battle config `academy_mirai_origin_disguised_instructor_battle`;
- Battle PL / actions / AI / reward;
- shortcut victory does not reveal instructor identity;
- shortcut defeat uses the existing assessment-termination successor;
- confrontation caller remains separate;
- all current Mirai Knowledge/evidence boundaries.

---

# 4. SHORTCUT PRE-BATTLE STORY

Current entry remains:

Mirai follows the apparent Traveller into the storehouse-side lane.

Preserve the existing physical setup through:

> The main road is gone behind them.

Then insert:

## `mir_shortcut_battle_pre_01` — narration

The Traveller stops at the next turn.

Not because he is checking the way.

He turns around and waits for Mirai to catch up.

## `mir_shortcut_battle_pre_02` — dialogue — MIRAI

**MIRAI:** “Why did you stop?”

## `mir_shortcut_battle_pre_03` — dialogue — TRAVELLER

**TRAVELLER:** “Because you followed me.”

Mirai looks back toward the turn behind them.

## `mir_shortcut_battle_pre_04` — dialogue — MIRAI

**MIRAI:** “You said this was faster.”

## `mir_shortcut_battle_pre_05` — dialogue — TRAVELLER

**TRAVELLER:** “I did.”

## `mir_shortcut_battle_pre_06` — dialogue — TRAVELLER

**TRAVELLER:** “Your instructor gave me one extra job.”

Mirai's attention sharpens.

## `mir_shortcut_battle_pre_07` — dialogue — MIRAI

**MIRAI:** “What job?”

## `mir_shortcut_battle_pre_08` — dialogue — TRAVELLER

**TRAVELLER:** “See what you do if the person you're escorting stops cooperating.”

The Traveller sets down his bag.

His stance changes.

Not dramatic.

Enough.

## `mir_shortcut_battle_pre_09` — dialogue — MIRAI

**MIRAI:** “This is part of the assessment.”

## `mir_shortcut_battle_pre_10` — dialogue — TRAVELLER

**TRAVELLER:** “Looks like it.”

Mirai folds the route map and puts it away.

Then raises her guard.

## `mir_shortcut_battle_pre_11` — dialogue — MIRAI

**MIRAI:** “Fine.”

**MIRAI:** “Then stop me.”

### CTA

**Start PL Battle**

Launch:

`academy_mirai_origin_shortcut_battle`

using existing Battle config:

`academy_mirai_origin_disguised_instructor_battle`

---

# 5. SHORTCUT VICTORY — POST-BATTLE CONTINUITY

Current Combat law remains:

`battleResult = "victory"`

Mirai is not Battle-depleted.

Instructor identity is not automatically revealed.

However, victory may no longer jump directly into ordinary Scene 5 with no acknowledgement that the two just fought.

New routing:

`victory`
-> `mir_shortcut_victory_01`
-> ...
-> `mir_shortcut_victory_11`
-> Scene 5 — THE ROAD AFTER.

## `mir_shortcut_victory_01` — narration

The Traveller is the first to lower his guard.

Mirai does not lower hers immediately.

## `mir_shortcut_victory_02` — dialogue — TRAVELLER

**TRAVELLER:** “All right.”

## `mir_shortcut_victory_03` — dialogue — MIRAI

**MIRAI:** “That was your extra job?”

## `mir_shortcut_victory_04` — dialogue — TRAVELLER

**TRAVELLER:** “See what you'd do.”

Mirai looks toward the turn behind them.

Then at him.

## `mir_shortcut_victory_05` — dialogue — MIRAI

**MIRAI:** “We're done with your route.”

## `mir_shortcut_victory_06` — dialogue — TRAVELLER

**TRAVELLER:** “Fair.”

He reaches for his bag.

Mirai does not move.

## `mir_shortcut_victory_07` — dialogue — MIRAI

**MIRAI:** “And the escort?”

## `mir_shortcut_victory_08` — dialogue — TRAVELLER

**TRAVELLER:** “My extra job is finished.”

He settles the bag over one shoulder.

**TRAVELLER:** “Yours isn't. Your instructor told you to get me to Checkpoint Three.”

## `mir_shortcut_victory_09` — dialogue — MIRAI

**MIRAI:** “Then we finish on my route.”

## `mir_shortcut_victory_10` — narration

Mirai walks first this time.

The Traveller follows.

She does not give him the next turn to choose.

## `mir_shortcut_victory_11` — narration

They rejoin the checkpoint road beyond the storehouses.

Checkpoint Three is still ahead.

Mirai resumes the escort because the assignment is explicitly still active.

### Return

Continue into Scene 5 using a post-Battle opening variant that does **not** repeat:

> No attack comes.

That line is retired on the shortcut-Battle-victory path because an attack/exchange already occurred.

Scene 5 may continue from:

> The Traveller rubs at one shoulder beneath the bag strap.

or another equivalent existing beat that does not deny the Battle.

---

# 6. SHORTCUT DEFEAT

Do not create a second defeat rewrite here.

Defeat continues to consume:

`Documentation/Story/Academy_Mirai_PL_Battle_Defeat_Assessment_Termination_2026-09-29.md`

Current binding defeat meaning remains:

- Mirai is Battle-depleted;
- the active escort assessment ends at the Battle location;
- Story deliberately reveals the instructor after the assessment ends;
- BLACK WIPE;
- later Checkpoint Three debrief;
- no resumed escort.

The new pre-Battle explanation strengthens that defeat flow because Mirai now already knows the exchange is part of the escort assessment.

## Compatibility clarification

The existing defeat line:

**TRAVELLER:** “The exercise is.”

remains valid after:

**MIRAI:** “I'm not done.”

It means the controlled assessment has ended because Mirai is Battle-depleted.

It does not newly reveal instructor identity.

The reveal still follows as authored Story action.

---

# 7. KNOWLEDGE BOUNDARY

After `mir_shortcut_battle_pre_06..10`, Mirai may know:

- the apparent Traveller says her instructor gave him an extra assessment role;
- the shortcut confrontation is part of the escort assessment;
- he is capable of fighting;
- following him off-route created the test condition.

She does **not** yet know:

- he is the Academy instructor;
- he replaced the real Traveller at the market;
- the real Traveller's exact current location;
- why the instructor selected this specific disguise beyond what later Story reveals.

Therefore:

`assessmentParticipationKnown = true`

does not imply:

`instructorIdentityKnown = true`

and does not imply:

`substitutionKnown = true`.

---

# 8. WHY THIS WORKS

The Story now gives every character a reason to act:

### Traveller / disguised instructor
She deliberately tests whether Mirai can recover after surrendering route control.

### Mirai
She understands that the apparent civilian is now an authorised obstacle inside the assessment and consciously enters the controlled exchange.

### Player
The Battle is no longer a UI surprise.

The player still retains the later identity mystery.

---

# 9. ACCEPTANCE

## Required shortcut-follow flow

Follow Traveller
-> storehouse-side lane
-> Traveller stops
-> “Because you followed me.”
-> “Your instructor gave me one extra job.”
-> “See what you do if the person you're escorting stops cooperating.”
-> Mirai recognises assessment condition
-> **Start PL Battle**
-> Battle.

## Victory

Battle victory
-> visible post-Battle exchange
-> Mirai takes route control back
-> both return to checkpoint road
-> Scene 5 continues
-> no identity reveal.

## Defeat

Battle defeat
-> existing assessment-termination authority
-> no resumed escort.

## Hard failures

Fail if:
- following the shortcut still jumps directly into Battle;
- no player-facing reason is given for the controlled exchange;
- Mirai attacks without understanding why;
- the Battle itself reveals instructor identity;
- shortcut victory returns directly to ordinary Scene 5 with no Battle acknowledgement;
- shortcut victory resumes escort duty without an explicit player-facing statement that the escort assignment is still active;
- shortcut victory still displays `No attack comes.`;
- shortcut defeat resumes the escort.

## Final lock

> **The shortcut Battle must be dramatically caused before it is mechanically launched. The apparent Traveller deliberately tests Mirai because she followed the escort off the marked route; Mirai knows she is entering an assessment exchange, but she still does not know the Traveller is her disguised instructor. If Mirai wins, the Story must explicitly establish that the combat test is over but her escort assignment remains active before she resumes escort duty.**