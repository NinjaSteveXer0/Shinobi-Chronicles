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
- `Documentation/Story/Academy_Mirai_Instructor_Male_Identity_Correction_2026-09-30.md`;
- `Documentation/Story/Academy_Mirai_PL_Battle_Reveal_Trigger_and_Post_Battle_Causality_2026-09-30.md`;
- `Documentation/Story/Academy_Mirai_Shortcut_Battle_Attack_Reveal_Exact_Story_2026-09-30.md`;
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

**male Academy instructor**

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

# 10. Two caller contracts — Battle-triggered reveal successor consumed 2026-09-30

The same Battle config serves the authorised post-substitution Mirai callers.

Current binding Story authority:

`Documentation/Story/Academy_Mirai_PL_Battle_Reveal_Trigger_and_Post_Battle_Causality_2026-09-30.md`

Exact shortcut Story authority:

`Documentation/Story/Academy_Mirai_Shortcut_Battle_Attack_Reveal_Exact_Story_2026-09-30.md`

Canonical causal law:

```text
apparent Traveller attacks Mirai
-> Mirai knows something is wrong
-> PL Battle
-> Battle result
-> Story-controlled instructor reveal
```

Therefore:

```text
VICTORY -> REVEAL
DEFEAT  -> REVEAL
```

Battle result changes the aftermath.

Battle occurrence triggers reveal eligibility.

The Battle engine itself still does not render or commit hidden Story identity Knowledge.

## 10.1 Shortcut caller

Caller ID:

`academy_mirai_origin_shortcut_battle`

### Pre-Battle Story entry

The former pre-Battle explanation package is retired.

Do NOT require:

- `Your instructor gave me one extra job.`;
- `See what you do if the person you're escorting stops cooperating.`;
- `This is part of the assessment.`;
- any advance explanation that turns the attack into a mutually agreed spar.

Current exact Story entry:

```text
shortcut/storehouse-side lane
-> mir_shortcut_attack_01
-> ... mir_shortcut_attack_05
-> apparent Traveller attacks / Mirai reacts
-> exact CTA: Start PL Battle
-> academy_mirai_origin_shortcut_battle
-> academy_mirai_origin_disguised_instructor_battle
```

At Battle launch, Mirai may legitimately know:

- the person she is escorting has attacked her;
- the escort relationship has broken;
- something about the person or assessment is wrong.

She does NOT yet know:

- that the apparent Traveller is the Academy instructor;
- the covered-market substitution truth;
- the real Traveller's location.

Preserve:

```text
attackObserved != instructorIdentityKnown
somethingIsWrongKnown != substitutionFullyProven
```

### Shortcut victory return

Exact current return:

```text
battleResult = "victory"
-> mir_shortcut_victory_reveal_01
-> ... mir_shortcut_victory_reveal_08
-> Story-controlled male instructor reveal
-> BLACK WIPE
-> LATER — CHECKPOINT THREE
-> result-aware aftermath / debrief
```

The disguise does NOT survive shortcut victory.

Do NOT:

- return to ordinary Scene 5 before reveal;
- resume escorting the substitute;
- preserve Traveller/Escort identity after the Battle;
- render the stale post-victory `No attack comes.` line.

Story verifies the substitution through the reveal.

### Shortcut defeat return

Exact current return:

```text
battleResult = "defeat"
-> mir_shortcut_defeat_reveal_01
-> ... mir_shortcut_defeat_reveal_07
-> Story-controlled male instructor reveal
-> BLACK WIPE
-> LATER — CHECKPOINT THREE
-> defeat-specific aftermath / debrief
```

Mirai remains Battle-depleted under ordinary Combat law.

The substitute escort does not resume.

### Shortcut occurrence consequence boundary

For either terminal result:

- the Battle occurrence triggers the Story reveal family;
- `identityRevealedByBattle = false` remains true at the Battle boundary;
- Story then verifies the substitution;
- `substitutionVerifiedBeforeCheckpoint = true`;
- `verificationBasis = "battle_triggered_instructor_reveal"`;
- the shortcut-Battle route does NOT commit ordinary MIR-03 checkpoint escort success;
- the real Traveller is already safe at Checkpoint Three under Story World truth.

Victory and defeat may produce different debrief/reflection facts.

They do not differ on reveal eligibility.

## 10.2 Confrontation caller

Caller ID:

`academy_mirai_origin_confrontation_battle`

Semantic entry:

current authorised confrontation against the apparent Traveller after the covered-market substitution.

Current reveal law is the same:

```text
confrontation Battle occurs
-> Battle result
-> Story-controlled reveal
```

### Victory

```text
battleResult = "victory"
-> authorised confrontation post-Battle reveal family
-> male Academy Instructor presentation
-> result-aware aftermath
```

### Defeat

```text
battleResult = "defeat"
-> authorised confrontation defeat/reveal family
-> male Academy Instructor presentation
-> result-aware aftermath
```

The exact pre-Battle confrontation prose may contain more suspicion/evidence than the shortcut path.

That does not change the universal post-Battle rule:

> **Any authorised Mirai-vs-disguised-instructor Battle is followed by Story reveal after victory OR defeat.**

Critical separation:

```text
Battle engine != Story reveal renderer
Battle occurrence = Story reveal trigger
Battle result = aftermath selector
```

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

- internal male-instructor World identity;
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

Underlying instructor identity:

**male Academy instructor**

Player-facing opponent presentation while Battle is active:

**TRAVELLER / ESCORT**

Apparent gender while disguised:

**male**

Post-reveal Story presentation:

**ACADEMY INSTRUCTOR / male / he-him-his**

The disguise changes identity/presentation, not gender.

The Battle UI/log must not expose before terminal resolution:

- Academy Instructor label;
- hidden participant source ID;
- covered-market substitution truth;
- hidden reveal text;
- formal Rank.

After a terminal Battle result returns:

- Battle still reports `identityRevealedByBattle = false`;
- Story consumes the Battle occurrence;
- Story executes the authorised reveal;
- Traveller/Escort presentation is removed;
- the approved male Mirai instructor representation is projected;
- real Traveller status/location is then clarified through Story.

Preserve:

```text
World identity != observer Knowledge != presentation
Battle occurrence -> Story reveal trigger
Battle engine != reveal renderer
```

The existing approved disguised Battle portrait remains an asset/presentation concern and does not create a second participant.

---

# 15. Coding acceptance requirements

#105 / PR #417 must prove:

1. stable participant remains `academy_mirai_origin_instructor`;
2. underlying identity/provenance is **male Academy Instructor**, with no stale `female_academy_instructor` runtime value;
3. opponent entry PL remains exactly 16;
4. Stats remain `17/14/10/6/7/12/15`;
5. instructor uses the exact deterministic Testing Strike -> Substitution Guard -> Turning Sweep cycle;
6. player side starts;
7. no hidden scaling/pre-damage occurs;
8. victory still pays exactly 50 Ryō once;
9. defeat still pays no Battle cash;
10. shortcut Battle entry uses the hostile-act causal family `mir_shortcut_attack_01..05`, not the retired `extra job` explanation;
11. shortcut Battle UI remains Traveller/Escort while the Battle is active;
12. shortcut victory returns to `mir_shortcut_victory_reveal_01..08`, not ordinary Scene 5;
13. shortcut defeat returns to `mir_shortcut_defeat_reveal_01..07`;
14. shortcut victory and defeat both execute Story reveal before any later Checkpoint Three aftermath;
15. no post-Battle substitute escort continuation exists;
16. confrontation victory executes Story reveal;
17. confrontation defeat executes Story reveal;
18. `identityRevealedByBattle` remains false at the Battle result boundary;
19. Story, not Combat, commits instructor identity Knowledge after return;
20. post-reveal speaker/actor presentation is male Academy Instructor / he-him-his;
21. real Traveller remains separate and is never the Battle opponent;
22. save/load preserves Battle state, AI cycle, terminal result and result-aware reveal successor;
23. no stale female identity/provenance survives in active Mirai runtime/config/save diagnostics;
24. no stale shortcut-victory no-reveal route survives;
25. global exact CTA remains **Start PL Battle**;
26. no stale compressed Mirai runtime may overwrite the current reveal successor.

Hard failure if:

- any Battle result leaves the instructor disguised afterward;
- victory preserves the substitute escort;
- female instructor identity appears anywhere in current production authority/runtime;
- the Battle engine itself exposes hidden identity before terminal result;
- a second instructor/opponent participant is created.

---

# 16. Final lock

> **Academy Mirai's authorised post-substitution PL Battle uses one stable participant, `academy_mirai_origin_instructor`: a male Academy instructor disguised as the apparent male Traveller/Escort. Stats `17/14/10/6/7/12/15`, PL16, the deterministic Testing Strike ATK4 -> Substitution Guard 25% -> Turning Sweep ATK5 cycle, player-first action economy, and reward semantics remain unchanged. The apparent Traveller's attack is the Story contradiction that launches the shortcut Battle. For every authorised Mirai-vs-disguised-instructor Battle, victory reveals and defeat reveals. The Battle engine returns factual Combat state with `identityRevealedByBattle=false`; the Battle occurrence then triggers the Story-controlled male-instructor reveal. Battle result changes the aftermath, not reveal eligibility. No post-Battle substitute escort continuation is valid.**

**COMBAT DESIGN REMAINS CLOSED / IDENTITY + REVEAL CONTRACT RECONCILED 2026-09-30 != RUNTIME VALIDATED != BROWSER GOLDEN.**
