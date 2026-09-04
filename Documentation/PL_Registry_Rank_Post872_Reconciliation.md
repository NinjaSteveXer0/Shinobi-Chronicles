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

## 2. FIELD READINESS ASSESSMENT — Rank resolver CLOSED

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

## 3. FIELD READINESS ASSESSMENT — Combat evidence consumer contract CLOSED

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

## 4. Special Jōnin — Alpha production catalogue CLOSED; Coding load pending

The generic evidence-based evaluator is already implemented and accepted.

Current Alpha production authority is now deliberately:

- **11 families / 33 qualification paths**;
- based on the exactly recovered historical catalogue material;
- encoded as current production authority in `Documentation/Rank/Special Jonin Alpha Production Catalogue.md`.

Preserve separately:

- **13 families / 39 paths** = historical aggregate genealogy only;
- **2 historical families / 6 paths** = unrecovered archaeology gap;
- those missing six are not to be fabricated as recovery.

Escort / Protective Detail remains ratified specialist semantics but is **POST-ALPHA / DEFERRED from the executable Alpha qualification catalogue** because its exact historical catalogue placement was not recoverable.

Coding still needs to populate the existing declarative `SPECIAL_JONIN_QUALIFICATION_DEFINITIONS` registry with the exact 33 Alpha definitions and extend regression coverage.

Qualification success remains separate from formal Rank. A separately committed institutional `special_jonin_recognition` occurrence owns any legitimate `chunin → special_jonin` formal-rank transition.

Preserve:

**enemy/challenge identity ≠ qualification path**

**Stats ≠ automatic qualification**

**qualification ≠ Recognition ≠ Rank ≠ appointment ≠ department ≠ clearance ≠ assignment ≠ active practice**

**personal performance ≠ protective performance**

**difficulty ordering ≠ formal rank topology**

The `special_jonin → jonin` ordering under `SHINOBI_DIFFICULTIES` does not justify a formal-rank topology patch.

---

## 5. Battle Portrait authority — Assets CLOSED + Registry RATIFIED; Coding/QA pending

Character Creation / Assets has completed the full production portrait authority:

**102 Registry production IDs → 102 unique approved `uiPortrait` paths**

Authoritative Assets manifest:

`Documentation/Assets/Battle Portrait Authority and Manifest.md`

Registry has ratified that exact 102-row projection without normalising filenames or deriving paths from IDs.

Registry ratification:

`Documentation/Assets/Battle Portrait Registry Ratification.md`

Preserve:

**collectible Character Card ≠ `uiPortrait` ≠ battlefield representation**

**Registry identity ≠ asset filename**

**physical file presence ≠ Assets approval**

**Assets approval ≠ Registry ratification ≠ Coding implementation**

Coding may now wire one dedicated `Registry representation ID → uiPortrait` resolver for Battle / Stage / Arena / Tournament consumers using the exact ratified manifest.

Coding must not:

- derive portrait paths heuristically from Registry IDs;
- crop collectible cards into permanent portraits;
- silently substitute generic participant images;
- silently choose another portrait if binary QA fails.

Fresh current-repository QA remains required before Alpha freeze:

- all 102 expected paths exist;
- all PNGs decode;
- each is exactly 1024×1024;
- all 102 expected Registry IDs resolve exactly once;
- no duplicate Registry ID;
- no duplicate approved path;
- no silent fallback/substitution.

A bad file is an explicit Assets repair/supersession problem, not a mapping-selection question.

---

## 6. Freeze status — refreshed after downstream closures

Current status:

- Legacy Battle-entry capacity classification — **CLOSED: retired except standard baseline; Coding cleanup still required**.
- Field Readiness Writing/Rank/Combat semantics — **CLOSED**.
- Field Readiness backend — **Coding-reported implemented; field/UI orchestration + Golden proof still pending**.
- Special Jōnin generic evaluator — **CLOSED / implemented**.
- Special Jōnin Alpha catalogue — **CLOSED at 11 families / 33 paths; Coding population/regression pending**.
- Historical 13/39 claim — **genealogy only, not current executable catalogue authority**.
- Escort / Protective Detail — **ratified semantics; post-Alpha/deferred from executable Alpha catalogue**.
- Battle Portrait Assets manifest — **CLOSED 102/102**.
- Battle Portrait Registry ratification — **CLOSED 102/102**.
- Battle Portrait resolver — **Coding implementation pending**.
- Portrait binary dimension/corruption QA — **pending Coding/CI**.
- Special Jōnin formal-rank topology patch — **not authorised / not justified by difficulty ordering**.

No PL recalibration follows from these closures.
