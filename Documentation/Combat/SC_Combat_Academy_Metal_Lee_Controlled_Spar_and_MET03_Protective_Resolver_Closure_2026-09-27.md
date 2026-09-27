# Shinobi Chronicles — Academy Metal Lee Controlled Spar + MET-03 Protective Resolver Closure

**Date:** 2026-09-27  
**Owner:** Combat / Skills / Items / Weapons  
**Incoming handoff:** #394  
**Status:** **DESIGN CLOSED / IMPLEMENTATION-READY — CODING CONSUMPTION REQUIRED**  
**Authority order:** GitHub live source > durable CE/SC documents > current specialist decisions > Project memory.

## 1. Scope

This closes the two exact Combat gaps blocking the current Academy Metal Lee Origin:

A. the one-on-one controlled PL spar against the stable inviting Genin;  
B. the deterministic MET-03 protective-response resolver.

It consumes without reopening:

- CE: `Documentation/Coordination/Academy_Metal_Spar_and_Protective_Response_Reconciliation_2026-09-27.md`
- PL / Registry: `Documentation/Registry/Academy Metal Lee Origin Inviting Genin Registry and PL Calibration 2026-09-27.md`
- Story: `Documentation/Story/Academy_Metal_Lee_Origin_2026-09-27_Scene_Authority_and_Backdrop_Contract.md`

This document does **not** change Academy Metal's Stats, Base PL, prepared palette, Story prose, MET-02 bands, rewards, or the Genin's Registry calibration.

---

# PACKAGE A — CONTROLLED SPAR

## 2. Exact encounter identity

Config:

`academy_metal_lee_origin_controlled_spar`

Encounter:

`origin_academy_metal_lee:inviting_genin_spar`

Player:

`academy_metal_lee`

Opposition:

`metal_origin_inviting_genin`

Player-facing opposition display:

**GENIN**

Environment:

`Scene backdrops/academy_training_ground_courtyard.png`

Battle type:

**one-on-one controlled PL Battle**

No additional participant is inferred.

## 3. Registry / PL inputs — preserved

### Academy Metal Lee

Base Stats:

`6 / 13 / 9 / 5 / 5 / 5 / 14`

Base PL:

**13**

Prepared palette remains exactly:

- `academy_metal_lee_leaf_rising_kick`
- `academy_metal_lee_training_flurry`
- `academy_metal_lee_pressure_rhythm`
- `academy_metal_lee_guarded_footwork`
- `academy_metal_lee_conditioned_endurance`

Current live Combat semantics remain:

- Leaf Rising Kick — direct Taijutsu, Attack PL **6**
- Training Flurry — direct Taijutsu, Attack PL **5**, multi-hit presentation / one mechanical packet
- Pressure Rhythm — self setup, next qualifying authored damage Skill receives resolver-local **+2 Attack PL**, consumed; no Stat/PL mutation
- Guarded Footwork — **25% pre-Stamina ratio guard**, one use
- Conditioned Endurance — **+4 temporary Battle capacity**, not healing, not Stamina, not Effective Stat mutation

### Inviting Genin

Registry / Battle ID:

`metal_origin_inviting_genin`

Base / Current / Effective Stats at ordinary spar entry:

`12 / 16 / 11 / 6 / 7 / 8 / 15`

Underlying Battle PL maximum:

**15**

Remaining Battle PL:

**15**

Formal Rank:

**Genin**

Representation guard:

`unnamed_metal_origin_genin_only_no_named_character_inference`

No collectible or ownership admission is created.

## 4. Inviting Genin exact prepared spar palette

These Skills are Story-scoped to this exact participant/encounter unless later authority expands them.

### 4.1 Sparring Jab

Machine ID:

`metal_origin_inviting_genin_sparring_jab`

Display:

**Sparring Jab**

- owner: `metal_origin_inviting_genin`
- discipline: Taijutsu
- target: current opponent
- resolution: direct damage
- authored Attack PL: **5**
- ordinary Stamina mitigation: **YES**
- packet count: **1**
- no rider
- no injury inference

### 4.2 Turning Kick

Machine ID:

`metal_origin_inviting_genin_turning_kick`

Display:

**Turning Kick**

- owner: `metal_origin_inviting_genin`
- discipline: Taijutsu
- target: current opponent
- resolution: direct damage
- authored Attack PL: **6**
- ordinary Stamina mitigation: **YES**
- packet count: **1**
- no rider

### 4.3 Guarded Stance

Machine ID:

`metal_origin_inviting_genin_guarded_stance`

Display:

**Guarded Stance**

- owner: `metal_origin_inviting_genin`
- discipline: Taijutsu
- target: self
- resolution: ratio-guard state
- prevention ratio: **25%**
- attack multiplier: **0.75**
- one use: **YES**
- pre-Stamina prevention
- reapplication: refresh/replace, never stack

### 4.4 Feint Entry

Machine ID:

`metal_origin_inviting_genin_feint_entry`

Display:

**Feint Entry**

- owner: `metal_origin_inviting_genin`
- discipline: Taijutsu
- target: self
- resolution: transient setup state
- direct damage: **0**
- state key: `metal_origin_inviting_genin_feint_entry`
- reapplication: refresh/replace
- consumer: exact `metal_origin_inviting_genin_committed_lunge` only
- no hidden Speed/Evasion/Stat bonus
- does not create automatic belief or stun

### 4.5 Committed Lunge

Machine ID:

`metal_origin_inviting_genin_committed_lunge`

Display:

**Committed Lunge**

- owner: `metal_origin_inviting_genin`
- discipline: Taijutsu
- target: current opponent
- resolution: contextual-state direct damage
- normal Attack PL: **6**
- Feint Entry-enhanced Attack PL: **7**
- consumes the exact Feint Entry state when enhanced
- ordinary Stamina mitigation: **YES**
- packet count: **1**
- no extra rider

These are ordinary controlled-spar actions. They do not imply a named canon identity or signature technique.

## 5. Deterministic Genin AI

No RNG.

Track the opposition's own committed action-opportunity index for this encounter.

Exact repeating five-opportunity cycle:

1. **Sparring Jab**
2. **Turning Kick**
3. **Guarded Stance**
4. **Feint Entry**
5. **Committed Lunge**
6. repeat from 1

Rules:

- a withdrawn participant never receives another action;
- terminal state is checked after every resolved action before turn handoff;
- Guarded Stance and Feint Entry refresh/replace if legitimately re-applied rather than stacking;
- Committed Lunge consumes Feint Entry if present and otherwise resolves at normal Attack PL6;
- AI never substitutes an unauthorised move;
- AI never reads hidden player intent;
- save/load restores the next exact opposition action opportunity and all transient states rather than rerolling.

## 6. One-on-one action economy

The controlled spar uses ordinary alternating action opportunities.

Opening order:

1. **Metal receives the first normal player action opportunity.**
2. If the Genin remains active, the Genin receives one AI action opportunity.
3. Alternate one action opportunity at a time until one participant reaches 0 Remaining Battle PL.

Every setup, guard, capacity or damage Skill consumes its owner's ordinary action opportunity.

No free setup actions.  
No presentation multi-hit creates extra mechanical actions.  
No reaction attack occurs after the target has already withdrawn.

## 7. Damage / viability proof

Locked Stamina mitigation:

`max(1, floor(resolvedAttackPL * 100 / (100 + Effective Stamina)))`

### Metal attacking Genin Stamina 15

- Attack PL5 -> **4**
- Attack PL6 -> **5**
- Attack PL7 -> **6**
- Attack PL8 -> **6**

Therefore:

- three unguarded Leaf Rising Kicks can total **15**;
- Pressure Rhythm may legitimately lift either authored damage Skill through its existing +2 resolver-local package;
- no hidden pre-damage, PL suppression or difficulty scalar is required.

### Genin attacking Metal Stamina 14

- Attack PL5 -> **4**
- Attack PL6 -> **5**
- Attack PL7 -> **6**

The deterministic first two Genin attacks therefore apply a maximum ordinary baseline of **9** final Battle-PL damage before the defensive/setup portion of the cycle.

A direct aggressive Metal line:

- Metal Leaf Rising Kick -> Genin 10
- Genin Sparring Jab -> Metal 9
- Metal Leaf Rising Kick -> Genin 5
- Genin Turning Kick -> Metal 4
- Metal Leaf Rising Kick -> Genin 0 / withdrawal

produces factual Metal Remaining Battle PL **4**, which is a legitimate **mixed** result under CE's separate MET-02 ratio.

Metal can improve preservation through the already-authorised Guarded Footwork and/or Conditioned Endurance. Conditioned Endurance's +4 temporary capacity participates legitimately while the MET-02 denominator remains the fixed start-of-spar underlying maximum **13**, exactly as CE already closed.

Poorer/longer play can reach lower remaining capacity or Metal withdrawal without any runtime difficulty scaling.

Therefore:

> **strong, mixed and rough remain mechanically reachable through ordinary player action choices and Battle truth; the opponent does not need hidden scaling.**

This is a viability statement, not a guarantee that every arbitrary action sequence yields every class.

## 8. Controlled-spar terminal envelope

If Genin reaches 0 first:

- `battleResult = "victory"`
- `withdrawnParticipantRef = "metal_origin_inviting_genin"`
- no injury/death/custody inference

If Metal reaches 0 first:

- `battleResult = "defeat"`
- `withdrawnParticipantRef = "academy_metal_lee"`
- Metal final Remaining Battle PL = 0
- Story performance class = `rough`
- **Origin continues**
- no injury/death/cowardice/incompetence inference

On terminal settle, preserve CE's exact MET-02 sequence:

1. commit factual Battle result;
2. capture Metal final Remaining Battle PL;
3. divide by fixed `metalSparStartingUnderlyingBattlePLMaximum`;
4. derive exactly one `strong | mixed | rough`;
5. commit `occ_origin_metal_pressured_performance_resolution`;
6. return exactly once to:
   - strong -> `met_spar_strong_01`
   - mixed -> `met_spar_mixed_01`
   - rough -> `met_spar_rough_01`

Battle result != Story performance class.

## 9. Spar reward

**NONE.**

Do not grant:

- Ryō;
- Item;
- Character EXP;
- Stat gain;
- hidden development;
- acquisition;
- relationship bonus

merely because this spar occurred.

---

# PACKAGE B — MET-03 PROTECTIVE RESPONSE

## 10. Resolver identity

This is **not a Battle**.

Source occurrence:

`occ_origin_metal_protective_response_resolution`

Resolver ID:

`academy_metal_lee_origin_protective_response_v1`

Fixed hazard profile:

`academy_metal_origin_training_dummy_hazard_v1`

Stable response kinds:

- `redirect_dummy`
- `take_impact`
- `destroy_dummy`

Stable result classes:

- `success`
- `partial`
- `failure`

No other result label is valid for new executions.

## 11. Input snapshot law

At the protective choice commit, snapshot the exact current authoritative actor state needed by the chosen channel.

Common fields:

- `actorRegistryId = "academy_metal_lee"`
- `responseKind`
- `hazardProfileId = "academy_metal_origin_training_dummy_hazard_v1"`
- `interventionParticipantRef = "metal_origin_inviting_genin"`
- relevant Effective Stat key
- relevant Effective Stat integer value

Use the legitimate current developed/effective Stat value at resolver commit.

Do **not** consume:

- MET-02 `strong | mixed | rough`;
- anxiety;
- confidence;
- morality;
- Protector Trait;
- hidden personality scalar;
- Battle PL;
- prior spar win/loss;
- hidden RNG;
- a generic rank bonus.

The existing prepared Battle Skills are not silently activated or consumed outside Battle by this resolver.

## 12. Deterministic thresholds

### 12.1 redirect_dummy

Capability channel:

**Effective Taijutsu**

Reason:

controlled physical redirection.

Thresholds:

- Taijutsu **>= 14** -> `success`
- Taijutsu **11–13** -> `partial`
- Taijutsu **<= 10** -> `failure`

Fresh Academy Metal Taijutsu 13 therefore resolves **partial**.

### 12.2 take_impact

Capability channel:

**Effective Stamina**

Reason:

physical stopping capacity / braced interception.

Thresholds:

- Stamina **>= 14** -> `success`
- Stamina **11–13** -> `partial`
- Stamina **<= 10** -> `failure`

Fresh Academy Metal Stamina 14 therefore resolves **success**.

This result does not imply injury merely because the action is named Take the Impact.

### 12.3 destroy_dummy

Capability channel:

**Effective Taijutsu**

Reason:

decisive striking force plus control sufficient to stop the apparatus before it reaches the student.

This is intentionally a slightly harder Taijutsu check than redirection.

Thresholds:

- Taijutsu **>= 15** -> `success`
- Taijutsu **12–14** -> `partial`
- Taijutsu **<= 11** -> `failure`

Fresh Academy Metal Taijutsu 13 therefore resolves **partial**.

## 13. Result envelope

Every resolved MET-03 attempt returns:

- `resolved = true`
- `resolverId = "academy_metal_lee_origin_protective_response_v1"`
- `hazardProfileId = "academy_metal_origin_training_dummy_hazard_v1"`
- `protectiveResponseAttempted = true`
- exact `protectiveResponseKind`
- exact `protectiveResponseOutcome`
- `relevantStatKey`
- `relevantStatValue`
- exact threshold band used
- `interventionRequired`
- `interventionParticipantRef`

### success

- `interventionRequired = false`
- `interventionParticipantRef = null`
- Metal's committed action alone sufficiently protects the student.

### partial

- `interventionRequired = true`
- `interventionParticipantRef = "metal_origin_inviting_genin"`
- Metal causally reduces/changes the hazard, but the Genin completes protection.

### failure

- `interventionRequired = true`
- `interventionParticipantRef = "metal_origin_inviting_genin"`
- Metal attempts the chosen response but does not sufficiently change/stop the hazard; the Genin protects the student.

The result class records Metal's causal contribution only.

## 14. Injury / consequence boundary

For every current MET-03 result:

- threatened student injured = **NO inference**
- Metal injured = **NO inference**
- Genin injured = **NO inference**
- observer injured = **NO inference**
- Battle created = **NO**
- Battle PL spent = **NO**
- permanent Stat rewrite = **NO**
- personality Trait created = **NO**

Partial/failure intervention is contextual action by the already-present stable participant, not deployment/acquisition.

## 15. MET-03 commit and idempotence

The choice commits intent first.

The source occurrence commits only after the deterministic resolver returns one exact result.

Commit exactly:

- `protectiveResponseAttempted: true`
- `protectiveResponseKind: redirect_dummy | take_impact | destroy_dummy`
- `protectiveResponseOutcome: success | partial | failure`
- `interventionRequired: boolean`
- `interventionParticipantRef: null | "metal_origin_inviting_genin"`
- resolver/hazard/input snapshot needed to prove determinism

Exactly one authoritative MET-03 receipt may exist for the committed Origin occurrence.

Save/load must not:

- rerun an already committed resolver;
- change Effective Stat snapshot after commit;
- reroll result;
- duplicate intervention;
- duplicate MET-03;
- replace the stable Genin identity;
- convert observer interpretation into objective outcome.

---

# 16. Current-source drift to remove during implementation

At the inspected live `game.js` baseline, Academy Metal's five prepared Skills are present with the expected current semantics.

The current Origin runtime still contains stale fail-closed Metal behavior in:

`runtime/alpha-origin-scenes-32900-b.js`

including:

- SPAR exposed as unavailable because no exact controlled-Battle caller/opponent package is installed;
- MET-03 writing `protectiveResponseOutcome:"attempt_committed"` rather than resolving `success | partial | failure`.

The current `game.js` source-binding diagnostic fixture also still contains stale MET-03 example vocabulary:

- `protectiveResponseKind:"intercept"`
- `protectiveResponseOutcome:"protected"`

Coding must update diagnostics to the current stable response/result vocabulary rather than treating those stale fixture values as authority.

---

# 17. Coding implementation proof required

Coding must prove:

## Controlled spar

1. exact `metal_origin_inviting_genin` Registry/Battle identity is used;
2. exact Stats `12/16/11/6/7/8/15` and PL15 are consumed;
3. exact five Genin spar Skills above exist;
4. deterministic five-step AI is restored across save/load without reroll;
5. Metal acts first;
6. ordinary one-action alternating economy holds;
7. 0 PL is withdrawal only;
8. Metal defeat returns to `rough` and does not fail the Origin;
9. MET-02 ratios use fixed start underlying PL max 13;
10. no reward is granted.

## MET-03

11. exact three response IDs resolve deterministically;
12. exact thresholds above are used;
13. fresh Base Metal diagnostic resolves:
    - redirect -> partial
    - take impact -> success
    - destroy -> partial
14. forced lower/higher synthetic Stat diagnostics prove all three result classes per action where threshold bands permit;
15. partial/failure name `metal_origin_inviting_genin` as intervention participant;
16. success has no intervention participant;
17. no RNG, anxiety/confidence/morality or MET-02 scalar participates;
18. exact MET-03 source occurrence commits once;
19. stale `attempt_committed`, `intercept`, and `protected` result vocabulary is removed from current Metal execution/diagnostic authority;
20. installed-browser Story -> Battle -> Story and hazard outcome paths are validated.

---

# 18. Final lock

> **Academy Metal's SPAR branch is a real one-on-one controlled PL Battle. Metal acts first. The stable Genin uses a deterministic five-action cycle: Sparring Jab ATK5, Turning Kick ATK6, Guarded Stance 25%, Feint Entry, then Committed Lunge ATK6/7 when the exact feint is present. Ordinary PL withdrawal ends the spar and creates no injury/death/custody inference. Metal's separate Story performance class still derives only from final Remaining Battle PL divided by the fixed start underlying maximum 13. The spar grants no reward. MET-03 is a deterministic non-Battle resolver using only current Effective Taijutsu or Stamina against the exact action-specific thresholds above. Fresh Base Metal resolves redirect=partial, take impact=success, destroy=partial. MET-02 performance, anxiety/confidence, morality, hidden scaling and RNG do not participate. Partial/failure truthfully records intervention by the same stable metal_origin_inviting_genin.**

## Status distinction

- Design: **CLOSED**
- Implementation: **NOT YET PROVEN**
- Runtime validation: **NOT YET PROVEN**
- Golden/regression: **NOT YET PROVEN**
