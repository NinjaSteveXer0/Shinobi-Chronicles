# Shinobi Chronicles — Academy Mirai Disguised Instructor PL Battle Closure

**Date:** 2026-09-29  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons / Tailed Beasts  
**Status:** **DESIGN CLOSED / IMPLEMENTATION-READY — ISSUE #338 CONSUMED**  
**Incoming handoff:** #338  
**Downstream runtime lane:** #105 / draft PR #417  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

---

# 1. Scope

This document closes the exact executable Combat package for Academy Mirai's optional post-switch PL Battles.

It consumes without reopening:

- `Documentation/Registry/Academy Mirai Origin Disguised Instructor Registry and PL Calibration 2026-09-24.md`;
- `Documentation/Story/Academy_Mirai_Origin_WRITING_GOLDEN_2026-09-24.md`;
- `Documentation/Story/Academy_Mirai_Instructor_Female_Identity_Correction_2026-09-29.md`;
- `Documentation/Coordination/Academy_Mirai_WRITING_GOLDEN_Disguised_Instructor_Implementation_Reconciliation_2026-09-24.md`;
- current shared PL Battle action economy and Stamina mitigation;
- `Documentation/World/Origin Starting Purse Battle Ryō Baseline and Hidden CE Reward Projection Rule 2026-09-27.md`.

This closure does not rewrite Writing GOLDEN, Registry identity, Stats, PL, Rank, rewards outside this Battle, Story Knowledge or presentation timing.

---

# 2. Exact identities

Player:

`academy_mirai`

Opponent / stable participant:

`academy_mirai_origin_instructor`

Opponent classification:

**Academy Mirai Origin controlled-assessment Character-side Story participant / non-collectible**

Underlying World identity:

**female Academy instructor**

Pre-reveal observer-facing presentation:

**male Traveller / Escort disguise**

Real Traveller:

separate male Story participant; safe after covered-market substitution; never the Battle opponent.

Canonical:

> **one instructor + one disguise = one Battle participant / one PL ledger**

Do not create:
- fake Escort opponent identity;
- second instructor identity;
- duplicate PL ledger;
- unrelated enemy;
- inferred formal Rank.

---

# 3. Registry / PL inputs — preserved

## Academy Mirai

Base Stats:

`8 / 8 / 9 / 5 / 6 / 7 / 8`

Base PL:

**9**

Ordinary Battle-entry Current / Remaining Battle PL:

**9**

Known current direct-damage anchors:

- `academy_mirai_twin_kunai` / **Twin Fang Kunai** — Attack PL **5**
- `academy_mirai_crossing_strike` / **Crossing Fang** — Attack PL **6**

Existing prepared Mirai palette remains unchanged:

- `academy_mirai_twin_kunai`
- `academy_mirai_wire_trip`
- `academy_mirai_false_footstep`
- `academy_mirai_guarding_blade`
- `academy_mirai_crossing_strike`

This closure does not alter those Skills.

## Academy instructor

Stats:

`17 / 14 / 10 / 6 / 7 / 12 / 15`

Base / Current PL:

**16**

Ordinary Battle-entry Remaining Battle PL:

**16**

Formal Rank:

**unknown / not authorised**

No hidden:
- PL scaling;
- pre-damage;
- difficulty scalar;
- defence Stat;
- Speed Stat;
- evasion Stat;
- accuracy roll.

---

# 4. Battle config and deployment

Shared Combat config ID:

`academy_mirai_origin_disguised_instructor_battle`

Encounter ID:

`origin_academy_mirai_disguised_instructor_assessment`

Exact deployment:

```text
PLAYER ACTIVE
academy_mirai

ENEMY ACTIVE
academy_mirai_origin_instructor

ALL BENCHED / RESERVE SLOTS
empty
```

Battle type:

**1v1 controlled Academy assessment PL Battle**

Player side acts first under current normal PvE law.

The persistent My Clan queue does not inject teammates.

No second instructor/opponent is created for the two Story callers.

---

# 5. Instructor exact action package

The instructor has exactly three authored Battle actions.

## 5.1 `academy_mirai_instructor_testing_strike` — Testing Strike

Class:

**TAIJUTSU / ATTACK**

Target:

Mirai / current legal opposing Active

Attack PL:

**4**

Resolution:

- one direct packet;
- ordinary Stamina mitigation;
- no Stun;
- no restraint;
- no displacement;
- no injury inference;
- no second packet.

Against Mirai Stamina 8:

`floor(4 × 100 / 108) = 3`

ordinary Battle-PL damage.

---

## 5.2 `academy_mirai_instructor_substitution_guard` — Substitution Guard

Class:

**NINJUTSU / DEFENSIVE SETUP**

Target:

self

Direct damage:

**0**

State:

`academy_mirai_instructor_substitution_guard_ready`

Effect:

- the next qualifying single-target direct mitigable Attack-PL packet against the instructor is reduced **25% pre-Stamina**;
- after that packet resolves, the state is consumed;
- if unused, the state expires when the instructor's next normal action opportunity begins;
- re-use later in the deterministic cycle creates a fresh state;
- states never stack;
- no automatic miss;
- no Dodge/accuracy check;
- no counterattack;
- no reposition;
- no identity reveal.

Player-facing meaning:

> **The Escort prepares a substitution guard. The next direct hit before his next turn is reduced by 25%.**

Pre-reveal use of **Escort / Traveller / he** is observer-safe disguise presentation only.

---

## 5.3 `academy_mirai_instructor_turning_sweep` — Turning Sweep

Class:

**TAIJUTSU / ATTACK**

Target:

Mirai / current legal opposing Active

Attack PL:

**5**

Resolution:

- one direct packet;
- ordinary Stamina mitigation;
- no Stun;
- no restraint;
- no knockdown/displacement rule;
- no injury inference.

Against Mirai Stamina 8:

`floor(5 × 100 / 108) = 4`

ordinary Battle-PL damage.

---

# 6. Deterministic assessment AI

This exact encounter does not use random enemy Skill selection.

Instructor action cycle:

```text
1. Testing Strike
2. Substitution Guard
3. Turning Sweep
4. Testing Strike
5. Substitution Guard
6. Turning Sweep
...
```

Rules:

- one action per enemy-side normal action opportunity;
- advance cycle only after the committed action resolves;
- save/load preserves the exact current cycle index;
- no health-percentage branching;
- no hidden PL/Rank/difficulty weighting;
- no random fallback;
- if Battle has already reached a terminal result, no next action resolves;
- Substitution Guard expires at the instructor's next opportunity before the next cycle action if it was not consumed.

This is assessment restraint through **authored action choice/numerics**, not PL mutation.

---

# 7. Target legality / action economy

This is strict 1v1.

Therefore:

- all direct attacks target the opposing Active;
- no Benched/Reserve/off-slot target exists;
- no ordinary relay occurs;
- WITHDRAW is unavailable because no legal successor exists;
- instructor receives no reaction/extra turn;
- Mirai receives no encounter-specific extra turn;
- this package grants no new Item/Summon access;
- any globally authorised existing player action surface remains governed by its own authority.

Terminal result set:

`victory | defeat`

No Battle flee / custody / kill / restrain choice exists here.

---

# 8. Exact viability proof

Current Stamina formula:

`damage = max(1, floor(resolvedAttackPL × 100 / (100 + Effective Stamina)))`

Instructor Stamina:

**15**

Mirai direct anchors therefore resolve:

- Twin Fang Kunai ATK5 -> **4 damage**
- Crossing Fang ATK6 -> **5 damage**

when no guard is active.

Under Substitution Guard:

- Crossing Fang ATK6 × 0.75 = 4.5 resolved Attack PL
- `floor(4.5 × 100 / 115) = 3` damage

## Valid no-scaling victory line

Player acts first:

```text
Mirai P1: Crossing Fang
Instructor 16 -> 11

Instructor E1: Testing Strike
Mirai 9 -> 6

Mirai P2: Crossing Fang
Instructor 11 -> 6

Instructor E2: Substitution Guard

Mirai P3: Crossing Fang through 25% guard
Instructor 6 -> 3

Instructor E3: Turning Sweep
Mirai 6 -> 2

Mirai P4: Crossing Fang
Instructor 3 -> 0
VICTORY
```

Mirai therefore can legitimately win against full PL16 without:

- parity scaling;
- hidden pre-damage;
- Base/Current PL mutation;
- scripted instructor surrender;
- extra player turns.

The encounter is not scripted to guarantee victory.

Example weaker line using only Twin Fang Kunai can leave the instructor at 1 PL after Mirai's fourth action, allowing the next Testing Strike to deplete Mirai's remaining PL.

Skill/action choice therefore matters.

---

# 9. Assessment-safe terminal semantics

## Victory

Trigger:

`academy_mirai_origin_instructor Remaining Battle PL = 0`

Result:

`victory`

Meaning:

- instructor is Battle-depleted for this assessment exchange;
- fight stops immediately;
- not death;
- not injury;
- not custody;
- not capture;
- not formal Rank proof;
- not automatic identity verification.

## Defeat

Trigger:

`academy_mirai Remaining Battle PL = 0`

Result:

`defeat`

Meaning:

- Mirai is Battle-depleted and cannot continue this fight;
- instructor stops the assessment exchange;
- not death;
- not injury;
- not mission death-state;
- does not erase Mirai's earlier evidence/history;
- does not automatically mean she failed the whole escort assignment.

Battle PL depletion remains withdrawal-from-combat semantics.

No post-zero Attack packet resolves.

---

# 10. Two caller contracts — defeat-return successor consumed 2026-09-29

The same Battle config serves two distinct Story callers.

Binding defeat successor:

`Documentation/Story/Academy_Mirai_PL_Battle_Defeat_Assessment_Termination_2026-09-29.md`

commit:

`67d0c83e7bd75b523d4a3b010d36dfd2ab4ff126`

This Story successor changes **defeat routing only**.

It does **not** reopen:

- Battle config;
- PL / Stats;
- instructor actions;
- deterministic AI cycle;
- action economy;
- reward values;
- Battle-depletion semantics;
- pre-reveal disguise presentation;
- `identityRevealedByBattle = false`.

## 10.1 Shortcut caller

Caller ID:

`academy_mirai_origin_shortcut_battle`

Binding Story causality successor:

`Documentation/Story/Academy_Mirai_Shortcut_PL_Battle_Entry_and_Victory_Continuity_Correction_2026-09-30.md`

commit:

`ddcaa21ec5a2e6d730dde37d16e21d93fe4f4631`

### Pre-Battle entry — successor

The shortcut caller may launch this Battle only after Story has visibly established the controlled assessment trigger.

Required Story sequence:

```text
The main road is gone behind them.
-> mir_shortcut_battle_pre_01
-> ... mir_shortcut_battle_pre_11
-> exact CTA: Start PL Battle
-> academy_mirai_origin_shortcut_battle
-> academy_mirai_origin_disguised_instructor_battle
```

At Battle launch, Mirai may know:

- the apparent Traveller claims the instructor gave him an extra assessment role;
- the apparent Traveller is deliberately testing what Mirai does when the escort stops cooperating;
- the apparent Traveller is combat-capable;
- the exchange is part of the escort assessment.

Mirai still does **not** know:

- the apparent Traveller is the female Academy instructor;
- the market substitution truth;
- the real Traveller's current location.

Preserve:

```text
assessmentParticipationKnown = true
!= instructorIdentityKnown
!= substitutionKnown
```

The Combat package does not create this Knowledge. Story establishes it before the Battle call.

### Victory return — successor

The former direct return:

```text
victory
-> mir_shortcut_battle_return
-> ordinary Scene 5
```

is superseded.

Current exact victory return:

```text
battleResult = "victory"
-> mir_shortcut_victory_01
-> ... mir_shortcut_victory_08
-> Scene 5 — THE ROAD AFTER
```

Victory does **not** auto-reveal the disguise.

The bridge establishes:

- Traveller lowers guard first;
- the assessment exchange is acknowledged;
- Mirai takes route control back;
- Mirai walks first;
- both rejoin the checkpoint road;
- the escort continues.

On this exact post-Battle Scene-5 variant, retire:

> **No attack comes.**

because an attack/exchange has already occurred.

Scene 5 resumes from the first compatible beat that does not deny the just-completed Battle.

### Defeat return — SUPERSEDED

The former:

```text
defeat
-> mir_shortcut_battle_return
-> Scene 5
```

is retired.

Exact current defeat return:

```text
battleResult = "defeat"
-> mir_shortcut_defeat_end_01
-> ... mir_shortcut_defeat_end_13
-> Story-controlled instructor reveal
-> BLACK WIPE
-> LATER — CHECKPOINT THREE
-> mir_defeat_debrief_shortcut_01
-> shortcut-defeat reflection
-> defeat-specific Origin close / Receipt
```

Story commits:

```text
miraiEscortAssessmentResult = "not_completed_battle_defeat"
miraiEscortDutyActive = false
miraiReachedCheckpointAsActiveEscort = false
```

Critical:

- Mirai does **not** resume escort duty;
- Mirai does **not** return to Scene 5;
- the real Traveller being safe at Checkpoint Three does **not** become Mirai escort success;
- the later checkpoint scene is `post_assessment_debrief`, not escort continuation;
- the Battle engine still does not reveal hidden identity.

The reveal occurs because Story ends the controlled assessment after defeat.

## 10.2 Confrontation caller

Caller ID:

`academy_mirai_origin_confrontation_battle`

Semantic entry:

current Scene-7A confrontation after Mirai refuses to continue escorting the apparent Traveller.

### Victory return — unchanged

```text
battleResult = "victory"
-> mir_confrontation_battle_return
-> approved Scene-7A disguise reveal
```

### Defeat return — successor

```text
battleResult = "defeat"
-> mir_confront_defeat_end_01
-> ... mir_confront_defeat_end_12
-> Story-controlled instructor reveal
-> BLACK WIPE
-> LATER — CHECKPOINT THREE
-> mir_defeat_debrief_confront_01
-> confrontation-defeat reflection
-> defeat-specific Origin close / Receipt
```

Story commits the same assessment-termination facts:

```text
miraiEscortAssessmentResult = "not_completed_battle_defeat"
miraiEscortDutyActive = false
miraiReachedCheckpointAsActiveEscort = false
```

The confrontation defeat may acknowledge that Mirai correctly caught the substitution while still losing the exchange.

Critical separation remains:

```text
Battle result != identity reveal
Battle defeat -> Story assessment termination -> authored reveal
```

The Battle engine returns factual Combat state only.

---

# 11. Observer-safe Battle result envelope

Both callers receive:

```text
battleOccurrenceId
battleConfigId = academy_mirai_origin_disguised_instructor_battle
encounterId = origin_academy_mirai_disguised_instructor_assessment
callerId
battleResult
miraiBattlePLDepleted
opponentBattlePLDepleted
opponentParticipantRef = academy_mirai_origin_instructor
identityRevealedByBattle = false
```

Victory:

```text
battleResult = "victory"
miraiBattlePLDepleted = false
opponentBattlePLDepleted = true
identityRevealedByBattle = false
```

Defeat:

```text
battleResult = "defeat"
miraiBattlePLDepleted = true
opponentBattlePLDepleted = false
identityRevealedByBattle = false
```

Combat returns this factual result.

The current Story successor then commits:

```text
miraiEscortAssessmentResult = "not_completed_battle_defeat"
miraiEscortDutyActive = false
miraiReachedCheckpointAsActiveEscort = false
```

Those three fields are Story/Origin-state consequences of the Battle result, not additional Combat damage semantics.

Do not expose to player-facing Story before authorised reveal:

- internal female-instructor World identity;
- internal participant ID;
- AI cycle index;
- hidden source/state IDs;
- formal Rank;
- developer issue IDs.

---

# 12. Battle occurrence / persistence

For one Story scene instance:

```text
battleOccurrenceId =
  "battle_occ_origin_mirai_disguised_instructor:"
  + callerId
  + ":"
  + sceneInstanceId
```

Required persistence:

- exact caller ID;
- exact Battle occurrence ID;
- Remaining Battle PL;
- current AI cycle index;
- active Substitution Guard state;
- terminal result;
- return context.

Guards:

- rerender cannot relaunch Battle;
- save/load during Battle resumes same occurrence;
- save/load after terminal result does not duplicate reward or Battle receipt;
- shortcut/confrontation caller receipts remain distinct;
- one Battle occurrence cannot commit twice.

---

# 13. Reward envelope

Consumes the Stephen-approved global World Battle-money baseline.

This is a standard one-opponent Academy/Origin PL Battle with no separately authored special payout.

## Player victory

Battle reward:

**50 Ryō**

No encounter-specific:
- Item;
- Weapon;
- Equipment;
- material;
- special loot.

Ordinary separately-authorised action-derived development remains separate from the cash reward.

## Player defeat

Battle cash:

**0 Ryō**

The universal Origin-completion starting purse remains separate:

**100 Ryō at sealed Origin completion**

Do not merge the Battle reward and Origin starting purse into one source.

---

# 14. Presentation / disguise contract

Internal Battle source identity:

`academy_mirai_origin_instructor`

Player-facing opponent presentation before Story reveal:

**TRAVELLER / ESCORT**

Apparent gender while disguised:

**male**

Underlying instructor identity:

**female**

Battle UI/log must not expose:
- Academy Instructor;
- female identity;
- participant source ID;
- hidden reveal text.

After the confrontation return enters the authorised Story reveal:

- presentation changes to the female instructor representation;
- she/her becomes correct again.

Current Combat closure does not author a new Battle portrait asset path.

Coding must not convert an NPC Story card into an invented Battle-portrait authority if the exact Battle portrait remains absent.

Asset availability is presentation authority and does not reopen this Combat package.

---

# 15. Coding acceptance requirements

#105 / PR #417 must prove:

1. third Mirai Battle route no longer displays internal #338/dev-blocker prose;
2. both authorised Battle callers launch `academy_mirai_origin_disguised_instructor_battle`;
3. opponent entry PL is exactly 16;
4. opponent uses exact deterministic three-action cycle;
5. player side starts;
6. no hidden scaling/pre-damage occurs;
7. victory pays exactly 50 Ryō once;
8. defeat pays no Battle cash;
9. shortcut Battle cannot launch until `mir_shortcut_battle_pre_01..11` has established the controlled assessment cause and exact **Start PL Battle** CTA;
10. shortcut pre-Battle Story may establish assessment participation, but must not establish instructor identity or substitution Knowledge;
11. shortcut **victory** routes through `mir_shortcut_victory_01..08` before Scene 5 and does not identity-reveal;
12. shortcut victory Scene-5 variant must not display the stale `No attack comes.` line;
13. shortcut **defeat** starts at `mir_shortcut_defeat_end_01` and never returns to Scene 5;
14. confrontation **victory** returns to the approved Scene-7A reveal;
15. confrontation **defeat** starts at `mir_confront_defeat_end_01` before the authored reveal;
16. either defeat commits `miraiEscortAssessmentResult = "not_completed_battle_defeat"`;
17. either defeat commits `miraiEscortDutyActive = false`;
18. either defeat commits `miraiReachedCheckpointAsActiveEscort = false`;
19. either defeat reaches Checkpoint Three only after BLACK WIPE / **LATER — CHECKPOINT THREE** as a debrief;
20. neither defeat can resume escort gameplay or record normal checkpoint escort success;
21. Battle UI remains Traveller/Escort pre-reveal;
22. `identityRevealedByBattle` remains false for every terminal Battle result;
23. after Story reveal, female instructor presentation is restored;
24. save/load preserves Battle state, AI cycle, terminal result and caller-specific successor;
25. no stale compressed Mirai runtime overrides the current Story graph;
26. global exact CTA remains **Start PL Battle**;
27. defeat-specific Receipt/Origin completion remains Story-owned and cannot be bypassed by the old normal-escort continuation.

---

# 16. Final lock

> **Academy Mirai's optional post-switch Battle is one controlled 1v1 PL Battle against stable participant `academy_mirai_origin_instructor`, internally the female Academy instructor while observer-facing presentation remains the male Traveller/Escort until Story reveals her. The instructor enters at full PL16 and follows the deterministic assessment loop Testing Strike ATK4 -> Substitution Guard 25% -> Turning Sweep ATK5 -> repeat. Mirai acts first and can legitimately win at full values using her existing prepared actions without hidden scaling. Victory and defeat remain Battle-depletion facts, not injury/death/custody or automatic identity verification. Shortcut victory now passes through the authored `mir_shortcut_victory_01..08` continuity bridge before Scene 5 and still does not reveal the disguise. Shortcut defeat and confrontation defeat now terminate the active escort assessment at the Battle location, then Story deliberately reveals the instructor and later moves to Checkpoint Three for debrief only. Confrontation victory retains the existing Scene-7A reveal. Standard victory reward is 50 Ryō; defeat grants no Battle cash.**

**COMBAT DESIGN REMAINS CLOSED. DEFEAT STORY-RETURN CONTRACT UPDATED 2026-09-29 != IMPLEMENTED != RUNTIME VALIDATED != BROWSER GOLDEN.**
