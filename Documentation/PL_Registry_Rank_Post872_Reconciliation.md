# Shinobi Chronicles — PL / Registry / Rank Post-872 Reconciliation

**Status:** Current reconciliation addendum  
**Date:** 2026-09-04

This addendum records Coding Post-872 implementation findings against already-closed PL / Registry / Rank authority. It supplements `Documentation/PL_Registry_Rank_Alpha_Authority.md`.

---

## 1. Legacy Battle-entry capacity — authority CLOSED, implementation DRIFT

Combat/PL classification is already final:

- standard ×1 — **KEEP as the ordinary baseline only**;
- elite ×1.25 — **RETIRE from production Battle entry**;
- `groupBoss` ×8 — **RETIRE from production Battle entry**;
- `guardBoss` ×50 — **RETIRE from production Battle entry**;
- random ±10% Battle-entry variation (`0.90 + Math.random() * 0.20`) — **RETIRE from production Battle entry**.

Post-872 Coding archaeology confirms the retired rules are still actively present in `calculateBattlePower()`.

Therefore this is no longer an open Combat/PL design question. It is an implementation-drift blocker:

**retired design authority ≠ removed runtime code**

Coding should remove or quarantine the retired production path and extend cumulative regression coverage so production Battle entry is deterministic except where an exact authored mechanic explicitly changes capacity.

No Base, Current, or Effective PL/Stat recalibration follows.

**Stamina remains mitigation, not Battle-capacity scaling.**

---

## 2. FIELD READINESS ASSESSMENT — Rank resolver already CLOSED

Stable assessment ID:

`academy_to_genin_field_readiness_assessment`

Display title:

**FIELD READINESS ASSESSMENT**

Formal mission:

**Locate the missing field courier, recover the sealed dispatch, and return it to the examiner.**

### Formal objective

`missionObjectiveCompleted=true` requires committed evidence that:

1. the missing field courier was located;
2. the sealed dispatch was recovered;
3. the sealed dispatch was returned to the examiner.

Formal objective completion is necessary but not sufficient for Promotion.

### Evidence domains

- `mission_comprehension`
- `information_use`
- `team_coordination`
- `combat_readiness`
- `objective_protection`
- `judgement_under_pressure`

These are evidence domains, not Stats and not hidden PL modifiers.

### PASS rule

A valid PASS requires all of:

1. `missionObjectiveCompleted=true`;
2. qualifying `mission_comprehension` evidence;
3. qualifying `judgement_under_pressure` evidence;
4. qualifying evidence in at least two of:
   - `information_use`;
   - `team_coordination`;
   - `combat_readiness`;
   - `objective_protection`;
5. no authored examiner safety/integrity abort or disqualification.

This requires at least four distinct readiness domains. Battle is not mandatory.

One explicit `assessmentSubjectOwnedCharacterId` owns the formal Rank mutation. Team participation does not produce team-wide automatic Promotion.

### Success

Success atomically:

- persists the committed assessment/Promotion occurrence and supporting evidence references;
- mutates only the exact assessment subject from Academy to Genin;
- unlocks the separate `geninRosterTransition`.

Promotion grants no direct PL/Stat increase and does not automatically replace the Registry representation.

### Failure / re-attempt

Failure:

- does not change formal rank;
- does not rewrite PL/Stats;
- does not erase ownership/team/Shared History;
- preserves the failed attempt and legitimate evidence/Knowledge.

Re-attempt is permitted after the previous attempt resolves and the authored assessment becomes available again. No universal cooldown exists unless separately authored.

Preserve:

**Battle result ≠ Promotion result**

**formal objective completion ≠ every assessment criterion satisfied**

**failed Promotion ≠ erased attempt**

**same assessment ≠ same Chronicle history**

**objective protection evidence ≠ Escort Special Jōnin qualification automatically**

---

## 3. FIELD READINESS ASSESSMENT — Combat evidence consumer contract

Combat owns Battle/opposition evidence only. Rank consumes it together with non-Battle evidence.

Controlled opposition does not create a promotion-only enemy identity by itself; any actual opponent must use exact Registry/encounter identity supplied by assessment content authority.

Combat may record factual Battle outcomes including:

- `neutralized`
- `repelled`
- `evaded`
- `disengaged`
- `team_withdrew`
- `team_defeated`

These are historical Battle outcomes, not Promotion decisions.

A causally valid disengage/withdrawal that protects the mission objective may be legitimate evidence; enemy defeat is not mandatory.

Minimum Combat evidence envelope when Battle occurs:

- `assessmentContextId`
- `battleEncounterId`
- participant IDs
- `battleCompleted`
- `battleResult`
- `oppositionOutcome`
- committed Battle occurrence IDs
- personal-performance evidence by participant
- protective-performance evidence separately
- explicit cooperation/joint-action evidence where present
- dispatch/objective Battle events where present
- pursuit/disengage Battle occurrences where present

Do not infer teamwork merely because multiple teammates took turns. Coordination evidence requires actual causal cooperation, role dependency, protection, hand-off, cover, joint action, or another explicitly qualifying interaction.

Where the sealed dispatch participates in Battle context, Combat may consume authoritative holder/asset state and record factual consequences such as possession maintained/lost/recovered, holder protection/interception, or authored integrity change. Combat does not become persistent dispatch-ownership authority.

---

## 4. Special Jōnin — catalogue still OPEN, implementation gap confirmed

Coding confirms:

`SPECIAL_JONIN_QUALIFICATION_DEFINITIONS = {}`

while the generic evaluator exists.

Registry status remains:

- generic evidence-based evaluator — **implemented/accepted**;
- production qualification catalogue — **not yet closed/loaded**;
- historical exact recovery — **11 families / 33 named paths**;
- older historical architecture claim — **13 families / 39 paths**;
- exact remaining historical two families/six paths — **not recovered**;
- Escort / Protective Detail — **restored direction, final catalogue position still open**.

Do not manufacture a full 13/39 catalogue from memory or enemy-card concepts.

Do not derive qualification paths from qualification enemies.

Preserve:

**enemy/challenge identity ≠ qualification path**

**Stats ≠ automatic qualification**

**qualification ≠ Rank ≠ appointment ≠ department ≠ clearance ≠ assignment**

**personal performance ≠ protective performance**

The `special_jonin → jonin` ordering found under `SHINOBI_DIFFICULTIES` is difficulty/presentation ordering and does not by itself justify a formal-rank topology patch. Formal rank progression remains separately stored and adjudicated.

---

## 5. Battle Portrait authority — still awaiting Assets manifest

Registry contract remains:

`Registry representation ID → approved square uiPortrait → exact repository path`

Preserve:

**collectible Character Card ≠ Battle Portrait**

**Registry identity ≠ asset filename**

Coding must not fabricate `Assets/Portraits/...` paths, crop collectible cards, or permanently substitute generic participant image data.

Registry cannot publish a trustworthy 102-wide portrait mapping until Character Creation / Assets supplies the approved portrait manifest.

Once supplied, Coding should wire one dedicated `uiPortrait` resolver for Battle / Stage / Arena consumers.

---

## 6. Freeze status

The immediate design questions in this addendum are resolved as follows:

- Legacy Battle-entry capacity classification — **CLOSED: retired except standard baseline; runtime cleanup still required**.
- Field Readiness Rank interpretation — **CLOSED**.
- Field Readiness Combat evidence contract — **CLOSED upstream and accepted as consumer evidence**.
- Special Jōnin catalogue — **OPEN**.
- Battle Portrait manifest — **OPEN pending Assets/Character Creation**.

No PL recalibration follows from the first three closure items.
