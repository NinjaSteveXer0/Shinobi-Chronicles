# Shinobi Chronicles — Promotion Difficulty / Academy → Genin CE Reconciliation

**Date:** 2026-09-11  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING ALPHA COORDINATION — #109 CONSUMED / NO VERIFIED CODING DRIFT**  
**Source handoff:** GitHub issue #109  
**Rank authority:** `Documentation/Rank/Promotion Difficulty Boundary Academy to Genin Exception 2026-09-11.md`

## 1. Coordination decision

CE consumes the Rank correction exactly.

`Academy Student → Genin` is an explicit exception to later difficulty-aware Promotion-readiness scaling.

Once the authored opening/prologue prerequisites are legitimately complete, the Genin assessment becomes **available/unlocked automatically**.

This means:

- assessment availability != forced attempt;
- automatic availability != automatic Promotion;
- no mandatory Academy grind exists to unlock the assessment;
- player-selected difficulty does not add a readiness-budget gate to Academy → Genin;
- Battle victory != Promotion;
- mission completion != Promotion;
- Promotion grants no direct or hidden PL/Stat bonus.

The assessment itself remains governed by the existing formal Rank / evidence / Promotion-result authority. This reconciliation changes the **availability boundary**, not the meaning of a successful or failed assessment.

## 2. Existing CE opening authority already aligns

The current opening authority:

`Documentation/Coordination/Opening Journey Academy Free Play Promotion and Dynamic Genin Team Availability 2026-09-10.md`

already establishes that:

- Academy free play is optional;
- there is no universal mandatory pre-Genin grind;
- the authored opening/prologue prerequisites precede Genin-assessment availability;
- Battle/mission results do not independently create Promotion;
- successful Promotion then unlocks the separate `geninRosterTransition`.

Therefore this Rank correction does **not** require reopening the opening architecture.

## 3. Existing Rank Alpha authority already aligns

`Documentation/PL_Registry_Rank_Alpha_Authority.md` defines the minimum Academy → Genin attempt/eligibility boundary without any player-difficulty predicate.

The Rank correction therefore narrows and clarifies the intended interpretation rather than contradicting the durable Alpha Rank model.

## 4. Difficulty-aware Promotion scaling begins later

Difficulty-aware Promotion-readiness breadth may apply only to **later exact Rank transitions** when PL / Registry / Rank explicitly authors that transition to use it.

Examples may include:

- Genin → Chūnin;
- later/higher Rank transitions;
- ANBU → Kage or another exact transition only where Rank authority permits.

For those later transitions, Rank authority must define the exact evidence families / readiness budget and difficulty profile consumption before Coding implements anything.

Preserve:

- requirement evidence = provenance-bearing factual evidence;
- requirement breadth != hidden universal grind score;
- difficulty scaling != direct PL bonus;
- Rank transition authority remains transition-specific;
- one later-transition rule does not back-propagate to Academy → Genin.

The earlier illustrative `2–3` / `5–6` requirement counts are **not universal constants** and must not be hard-coded onto Academy → Genin.

## 5. Current source audit — no verified Coding contradiction

CE performed a current default-branch code/document search for combinations including:

- `difficulty promotion academy genin`;
- `difficultyProfile academy_to_genin`;
- `difficultyProfile promotion`;
- `selectedDifficulty promotion`;
- Academy/Genin field-readiness identifiers.

The search surfaced the current Rank/Coordination documentation and older Rank reconciliation material, but **no concrete runtime source predicate was found that gates Academy → Genin assessment availability by player-selected difficulty**.

This is a source-audit result, not installed-browser Golden proof.

Therefore:

- there is **no evidence-based Coding defect to route right now**;
- CE must not create speculative Coding work merely because a correction was clarified in prose;
- if later source review or installed-browser evidence proves that Academy → Genin is difficulty-gated in runtime, that becomes a concrete Coding correction and should be routed then with exact evidence.

## 6. Validation status

Current status:

- Rank semantic decision: **CLOSED / GREEN**;
- CE reconciliation: **CLOSED / GREEN**;
- durable authority alignment: **GREEN**;
- verified conflicting source implementation: **NONE FOUND**;
- installed-browser proof of every difficulty profile reaching the same Academy → Genin availability boundary: **NOT CLAIMED HERE**.

Existing broader opening/Origins/Promotion browser validation lanes may prove this behavior in normal runtime testing without creating a second semantic system or duplicate implementation issue.

## Final Alpha lock

> **After legitimate authored opening/prologue prerequisites complete, Academy → Genin assessment availability is difficulty-independent. Difficulty-aware Promotion-readiness scaling begins only on later Rank transitions that receive explicit Rank authority. No Coding issue is created without concrete runtime contradiction.**
