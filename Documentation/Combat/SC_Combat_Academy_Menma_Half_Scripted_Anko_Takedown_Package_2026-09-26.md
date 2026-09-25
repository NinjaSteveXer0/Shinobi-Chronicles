# Shinobi Chronicles — Academy Menma Half-Scripted Anko Takedown Package

**Date:** 2026-09-26  
**Owner:** Combat / Skills / Items / Weapons  
**Incoming handoff:** #380  
**CE successor:** `Documentation/Coordination/Academy_Menma_Half_Scripted_Three_Subject_Battle_Successor_2026-09-26.md`  
**Status:** **DESIGN CLOSED — COMBAT SEMANTICS / CODING IMPLEMENTATION REQUIRED DOWNSTREAM**  
**Live main/HEAD inspected before closure:** `b75c6addb3ff90ecb4362237177a61fa809b60f5`  
**Live `game.js` blob inspected:** `05e014efc8a77705c53f0ec9d8f143703ad91da8`

This document closes only the two deterministic Anko takedown beats required by Academy Menma Scene 7's half-scripted successor.

It does not rewrite generic PL Battle law, the six-shinobi relay model, MEN-03, World reward ownership, or the held broader Battle redesign.

---

## 1. Preserved encounter identity

- Battle config: `academy_menma_origin_three_test_subjects_with_anko`
- Encounter: `origin_academy_menma_prologue:three_test_subjects`
- Objective: `stop_three_test_subjects`
- Environment: `Scene backdrops/forest_clearing_day.png`
- Hostile order:
  1. `test_subject_altered_shinobi`
  2. `test_subject_brute`
  3. `test_subject_unstable`
- Phase C opponent: exactly `test_subject_unstable`
- 0 Remaining Battle PL = withdrawal, not injury/death.

The first two Anko takedowns are authored encounter beats. They are not ordinary side action opportunities and never count toward MEN-03.

---

## 2. Phase A — Altered Shinobi deterministic takedown

### Exact action

- Skill ID: `sj_anko_hidden_shadow_snake_hands`
- Player-facing label: **Hidden Shadow Snake Hands**
- Actor: `sj_anko`
- Target: `test_subject_altered_shinobi`
- Authored Attack PL: **20**
- Target Effective Stamina: **11**
- Target starting Battle PL: **11**

### Exact numeric resolution

Locked ordinary Stamina mitigation:

`max(1, floor(resolvedAttackPL * 100 / (100 + Effective Stamina)))`

Phase A:

`floor(20 * 100 / 111) = 18`

Resolved damage is therefore sufficient to deplete the Altered Shinobi's 11 Battle PL in one committed packet.

### Semantic result

1. Commit exactly one `sj_anko_hidden_shadow_snake_hands` action receipt.
2. Resolve one ordinary mitigable direct Attack-PL packet at authored Attack PL 20.
3. Apply the ordinary PL ledger result.
4. Target Remaining Battle PL reaches 0.
5. Resolve ordinary Battle withdrawal for `test_subject_altered_shinobi`.
6. Mark Phase A committed/completed exactly once.
7. Relay hostile Active to `test_subject_brute` exactly once.
8. Proceed to Phase B only after the semantic relay is committed.

No Poison, Bleed, Stun, restraint, Summon participant, kill result, injury result, or extra packet is inferred.

---

## 3. Phase B — Brute deterministic takedown

### Exact action

- Skill ID: `sj_anko_fire_style_dragon_flame`
- Player-facing label: **Fire Style: Dragon Flame**
- Actor: `sj_anko`
- Target: `test_subject_brute`
- Authored Attack PL: **24**
- Target Effective Stamina: **14**
- Target starting Battle PL: **13**

### Exact numeric resolution

`floor(24 * 100 / 114) = 21`

Resolved damage is therefore sufficient to deplete the Brute's 13 Battle PL in one committed packet.

### Semantic result

1. Commit exactly one `sj_anko_fire_style_dragon_flame` action receipt.
2. Resolve one ordinary mitigable direct Attack-PL packet at authored Attack PL 24.
3. Apply the ordinary PL ledger result.
4. Target Remaining Battle PL reaches 0.
5. Resolve ordinary Battle withdrawal for `test_subject_brute`.
6. Mark Phase B committed/completed exactly once.
7. Relay hostile Active to `test_subject_unstable` exactly once.
8. Anko then yields allied Active under the CE successor.
9. Promote `academy_menma` from Benched to allied Active.
10. Menma receives the first normal player-side action opportunity of Phase C.

No automatic Burning, area damage, kill result, injury result, or hidden projectile/accuracy roll is inferred.

---

## 4. Resolver classification

**A direct authored Attack-PL packet is sufficient for the actual takedown math.**

A **scoped scripted beat resolver is still required** for encounter sequencing and catastrophe containment.

The scripted resolver must not invent replacement damage. Its job is only to:

- verify the exact battle/config/objective/phase;
- commit the exact authored Anko action once;
- invoke the existing ordinary Attack-PL/Stamina/withdrawal machinery;
- commit the exact relay/yield transition once;
- emit immutable presentation evidence;
- reject duplicate/stale replay.

If either target's authoritative Stamina/Base PL later changes enough that the fixed packet no longer guarantees withdrawal, diagnostics must fail loudly and return to Combat. Coding must not add a hidden finisher, bypass Stamina, or force Remaining Battle PL directly to zero.

---

## 5. Immutable action / presentation receipt fields

Each scripted takedown must emit one immutable semantic receipt sufficient for the shared presentation queue.

Required fields:

- `battleConfigId`
- `encounterId`
- `objectiveId`
- `battleSessionId`
- `phaseId` — `menma_origin_phase_a` or `menma_origin_phase_b`
- `scriptedBeatId`
- `actionId`
- `sequenceIndex`
- `actorSide` = `player`
- `actorParticipantId` = `sj_anko`
- `actionRole` = `scripted_encounter_takedown`
- `skillId`
- `displayLabel`
- `targetSide` = `enemy`
- `targetParticipantId`
- `authoredAttackPL`
- `targetEffectiveStamina`
- `targetBattlePLBefore`
- `resolvedDamage`
- `targetBattlePLAfter`
- `targetWithdrawn` = true
- `withdrawalReason` = `battle_pl_depleted`
- `countsTowardMen03` = false
- `playerActionOpportunityConsumed` = false
- `enemyActionOpportunityConsumed` = false
- `semanticCommitted` = true
- `relayFromParticipantId`
- `relayToParticipantId`
- `phaseCommitted` = true

For Phase B additionally emit:

- `alliedYieldFromParticipantId` = `sj_anko`
- `alliedPromoteToParticipantId` = `academy_menma`
- `phaseCPlayerInputReady` = true

Presentation may animate these facts but may not recalculate or mutate them.

---

## 6. Save/load and idempotence

Persist encounter-local semantic state independently from presentation state.

Minimum committed state:

- `phaseACommitted`
- `phaseBCommitted`
- exact committed action IDs/sequence IDs;
- exact withdrawn-hostile set;
- exact hostile Active identity;
- exact allied Active identity;
- exact Phase C readiness;
- immutable presentation-receipt IDs already emitted.

Required behavior:

- reload before Phase A commit may execute Phase A once;
- reload after Phase A commit must not replay Anko's action or withdraw Altered again;
- reload after Brute relay but before Phase B commit resumes from Phase B;
- reload after Phase B commit must not replay Dragon Flame or withdraw Brute again;
- stale callbacks/timers cannot recommit damage, withdrawal, relay, yield or promotion;
- presentation replay/recovery never owns semantic advancement;
- a watchdog/reduced-motion path may hard-settle presentation to the already committed semantic state only.

---

## 7. Phase C — Unstable package unchanged

Combat finds no contradiction requiring a change to Unstable's existing legal action package.

Retain unchanged:

1. `test_subject_unstable_frantic_rush` — Taijutsu ATK **5**
2. `test_subject_unstable_chakra_spasm` — Ninjutsu ATK **6**
3. `test_subject_unstable_panicked_burst` — Ninjutsu ATK **7**, one mechanical packet

Phase C is normal evolved PL Battle:

`Menma -> Unstable -> Menma -> Unstable ...`

Menma uses only his legitimate prepared Academy Menma action set. No automatic Kurama/Nine-Tails package is granted.

---

## 8. MEN-03 / reward boundary

- Anko Phase A/B actions never count toward MEN-03.
- MEN-03 consumes only Menma Phase C committed action/performance evidence.
- Menma Phase C defeat = terminal defeat / `tutorialResult: not_completed` / MEN-03 bucket null.
- Terminal authoritative victory requires all three exact hostiles resolved plus Menma Phase C victory.
- World reward remains **100 Ryō once** on terminal authoritative victory and is cadence-independent.
- This document does not alter World reward source identity or reward implementation.

---

## 9. Coding acceptance requirements

Downstream #373 / PR #375 must prove at minimum:

1. Anko is allied Active for Phase A.
2. Altered is enemy Active for Phase A.
3. Hidden Shadow Snake Hands commits once and withdraws Altered once.
4. Brute relays once.
5. Fire Style: Dragon Flame commits once and withdraws Brute once.
6. Unstable relays once.
7. Anko yields allied Active once.
8. Menma promotes from Benched to Active once.
9. Menma receives the first normal player input in Phase C.
10. Phase A/B consume no ordinary player or enemy action opportunity.
11. Phase A/B never affect MEN-03.
12. reload and stale callbacks cannot duplicate any semantic transition.
13. presentation receipts are semantic-consumer-only.
14. Phase C Unstable action package remains unchanged.
15. no new execution uses the superseded Menma-first/Anko-assist cadence for this Origin.
16. Kakashi Golden regression remains protected.

---

## 10. Closure

Combat closes #380 with these exact authored takedowns:

- **Phase A:** `sj_anko_hidden_shadow_snake_hands` -> Altered Shinobi -> ordinary mitigated one-packet depletion -> withdrawal.
- **Phase B:** `sj_anko_fire_style_dragon_flame` -> Brute -> ordinary mitigated one-packet depletion -> withdrawal.

The direct damage packets are sufficient numerically. The only special resolver is the scoped, idempotent phase sequencer that commits these authored beats and their relays exactly once.

**DOWNSTREAM:** existing Coding lane #373 / draft PR #375.  
**NEW ISSUE:** none.  
**Stephen relay:** NONE.
