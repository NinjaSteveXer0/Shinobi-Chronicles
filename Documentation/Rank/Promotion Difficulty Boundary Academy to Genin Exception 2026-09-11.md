# Shinobi Chronicles — Promotion Difficulty Boundary / Academy → Genin Exception

**Date:** 2026-09-11  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING RANK AUTHORITY — PLAYER CORRECTION LOCKED**

## 1. Core decision

Difficulty-aware Promotion requirements apply only to **later Rank transitions**.

The opening transition:

`Academy Student → Genin`

is explicitly exempt from any difficulty-based grind/readiness prerequisite.

Once the exact authored opening/prologue prerequisites required by current opening-journey authority are complete, the Genin Promotion route/assessment becomes legitimately available.

Difficulty must not add an extra prerequisite before that availability.

## 2. What this does NOT mean

This does **not** mean the player is silently or automatically promoted to Genin.

Existing voluntary Promotion resolution may still determine whether a legitimate attempt succeeds or fails under its authored assessment/result contract.

The correction is specifically about **eligibility / availability gating before the Academy → Genin attempt**:

- no difficulty-specific PL floor;
- no difficulty-specific Stat floor;
- no difficulty-specific EXP requirement;
- no difficulty-specific training-count requirement;
- no difficulty-specific mission-count requirement;
- no difficulty-specific mastery requirement;
- no hidden difficulty readiness score;
- no mandatory free-play/grind duration.

The player may still remain Academy-ranked voluntarily and continue legitimate free play before attempting Promotion.

## 3. Existing opening authority preserved

This authority preserves the authored opening sequence and prerequisites owned elsewhere.

It does not independently rewrite which exact opening/prologue/team/tutorial facts current CE/Story/Acquisition authority requires before the Genin Promotion route becomes available.

Canonical boundary:

> **Authored opening prerequisites may gate Academy → Genin availability. Difficulty may not.**

Therefore a runtime rule equivalent to:

`openingPrerequisitesSatisfied && difficultyGrindRequirementSatisfied`

is incorrect for Academy → Genin.

The correct semantic form is:

`openingPrerequisitesSatisfied → Genin Promotion route available`

subject only to the existing non-difficulty availability/state rules already authored for that route.

## 4. Later Rank transitions

Difficulty-aware Promotion requirements remain legitimate for **later** formal Rank transitions after Genin.

PL / Registry / Rank owns the exact transition-level requirement authority when those later Promotion contracts are authored.

This document does **not** invent exact numeric thresholds, topology, exam content, recognition events, institutional requirements or difficulty tables for those later transitions.

Until an exact later-transition contract exists, do not infer one from:

- UI difficulty ordering;
- Rank labels;
- card folders;
- PL alone;
- Stats alone;
- mission count;
- player level;
- historical code constants.

Preserve:

**difficulty ordering ≠ formal Rank topology**

and:

**difficulty-aware requirement ≠ hidden PL bonus or Base-Stat mutation**.

## 5. PL / Rank separation

Difficulty-specific Promotion requirements, where later authored, are eligibility/evidence/institutional requirements only unless an exact contract says otherwise.

They do not mutate Base PL, Current PL or Stats merely because a difficulty was selected.

Promotion itself still grants no automatic PL/Stat increase unless separately authored by Progression/Development authority.

Preserve:

- Rank ≠ PL;
- Promotion ≠ development automatically;
- difficulty ≠ Base-Stat mutation;
- difficulty ≠ hidden PL multiplier;
- assessment availability ≠ Promotion success;
- Battle result ≠ Promotion result automatically.

## 6. Supersession / reconciliation note

Any current or future wording that applies a difficulty-grind prerequisite to `academy_to_genin_field_readiness_assessment` availability is superseded by this authority.

Existing Field Readiness assessment semantics are not otherwise revoked by this decision.

Existing opening-journey authority that already allows immediate voluntary assessment after legitimate opening prerequisites is reinforced, not replaced.

## Final lock

> **Academy Student → Genin is the opening exception: once the authored opening/prologue prerequisites are complete, the Promotion route is available without a difficulty grind gate. Difficulty-aware Promotion requirements begin only with later Rank transitions, under separately authored Rank authority.**
