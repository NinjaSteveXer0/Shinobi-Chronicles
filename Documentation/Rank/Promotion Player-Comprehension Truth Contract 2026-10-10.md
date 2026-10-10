# Shinobi Chronicles — Promotion Player-Comprehension Truth Contract

**Date:** 2026-10-10  
**Owner:** PL / Registry / Rank  
**Issue:** #654  
**Status:** **BINDING RANK CLARIFICATION ON MERGE TO `main`**  
**Applies to:** Academy -> Genin Field Readiness Promotion  
**Preserves:** #445 variable requirement packages, #447 New-Game seed lock, existing CE/World mission authority

## 1. Scope

This document defines only the Promotion-facing Rank truth required for player comprehension:

- what Promotion requirements may legitimately be communicated;
- what authoritative **PASS** means;
- what authoritative **FAIL** means;
- how hidden package truth remains hidden while the assessment is still understandable.

It does **not** define UI layout, visual treatment, controls, route choreography, mission content, Battle content, World opportunities, dialogue, examiner characterization, or roster/acquisition consequences.

## 2. Existing Rank resolver remains unchanged

Academy -> Genin PASS still requires all of:

1. `missionObjectiveCompleted=true`;
2. qualifying `mission_comprehension` evidence;
3. qualifying `judgement_under_pressure` evidence;
4. qualifying evidence in the exact two secondary readiness domains named by the fixed `promotionRequirementPackageId`;
5. no examiner safety/integrity abort or disqualification.

The four readiness slots remain:

- `academy_genin_req_mission_comprehension`;
- `academy_genin_req_judgement_under_pressure`;
- `academy_genin_req_secondary_1`;
- `academy_genin_req_secondary_2`.

The formal mission objective is a separate disclosed assessment truth.

Package identity remains fixed from the immutable Chronicle/New-Game root per stable Character + Rank transition. Retry, failure, withdrawal, alternate authorised scenario, team changes, discovery, satisfaction, UI, save/load and refresh do not reroll it.

## 3. Minimum Promotion truth the player may legitimately know

Without revealing any hidden criterion identity, it is legitimate to communicate all of the following:

- the exact Character who is the Promotion subject;
- the formal Rank transition being attempted: Academy Student -> Genin;
- the disclosed formal mission objective for the current attempt;
- that Promotion is decided by the full assessment standard, not by mission completion alone;
- that Battle victory is not itself Promotion;
- that Battle defeat is not automatically Promotion failure;
- that the examiner is evaluating readiness in addition to the disclosed objective;
- that there are four readiness requirement slots in the Academy -> Genin institutional model;
- that some readiness requirements may still be undisclosed to the subject;
- that every requirement which is legitimately revealed must be satisfied for PASS;
- that the underlying requirement package is stable for this Character/Rank transition in this Chronicle and does not reroll on retry.

These are institutional truths, not package-specific secret content.

A safe comprehension statement may therefore communicate the semantic equivalent of:

> Complete the disclosed mission objective and demonstrate the required field readiness. Some assessment requirements may remain undisclosed. Completing the mission or winning a Battle alone does not guarantee Promotion, and retrying does not generate a different hidden requirement set.

This statement is semantic guidance only. UI / Assets and Coding own the final presentation.

## 4. Requirement disclosure law

Requirement truth and player Knowledge remain separate.

A readiness criterion may be named to the player **only when its requirement slot has legitimate reveal authority**.

For every readiness slot:

- `revealedToSubject=false` means the criterion identity remains hidden;
- `revealedToSubject=true` permits the legitimate player-facing criterion label;
- `satisfied=true` does not by itself create Knowledge;
- `satisfied=false` does not by itself create Knowledge.

This applies equally to the two fixed mandatory readiness domains and the two package-selected secondary domains.

Therefore:

- `mission_comprehension` is mandatory Rank truth but is not automatically player-known merely because it is fixed across all packages;
- `judgement_under_pressure` is mandatory Rank truth but is not automatically player-known merely because it is fixed across all packages;
- the exact identities of `academy_genin_req_secondary_1` and `academy_genin_req_secondary_2` remain hidden until separately revealed;
- a hidden satisfied requirement remains hidden;
- a hidden unsatisfied requirement remains hidden.

Legitimate reveal authority remains limited to already-authorised Knowledge routes such as examiner/institution disclosure, authored briefing/discovery, authorised observer-safe satisfaction disclosure, post-attempt debrief/rationale, or another separately authorised Knowledge route.

## 5. Hidden package truth that must never leak merely for comprehension

Player comprehension does **not** require disclosure of:

- `promotionRequirementPackageId`;
- `promotionRequirementPackageVersion`;
- immutable Chronicle seed or derivation key;
- exact hidden secondary-domain identities;
- hidden satisfaction state;
- hidden failure state for a particular unrevealed criterion;
- internal evidence counts, weights, thresholds or scoring;
- pass probability;
- examiner-only diagnostics;
- package/scenario compatibility diagnostics;
- machine provenance.

Outcome explanation must not backdoor any of those truths.

In particular, no aggregate progress statement may be used if it would let the player infer the satisfied/unsatisfied state of an unrevealed requirement.

## 6. Authoritative PASS meaning

**PASS** is a formal Rank result.

PASS means:

- the disclosed formal mission objective was completed;
- all four authoritative readiness slots were satisfied, including any that remained hidden to the subject;
- no safety/integrity abort or disqualification prevented Promotion;
- the exact assessed Character receives the formal Academy Student -> Genin Rank mutation.

PASS does **not** mean:

- the player necessarily won a Battle;
- the player necessarily fought at all;
- mission completion alone caused Promotion;
- every hidden requirement must now be disclosed;
- the Character gains direct PL or Stats from Promotion;
- teammates are promoted;
- ownership, assignment, deployment or roster-transition consequences are automatically complete.

The PASS result itself is legitimate player Knowledge even when some underlying requirement identities remain hidden.

## 7. Authoritative FAIL meaning

**FAIL** means the exact assessed Character does **not** receive the Academy Student -> Genin Rank mutation from that attempt.

At Rank level, FAIL means the complete PASS resolver was not satisfied or an authorised safety/integrity abort/disqualification prevented PASS.

FAIL does **not** by itself mean:

- Battle defeat;
- failure to complete the mission objective;
- that any specific hidden criterion was unsatisfied;
- that the requirement package has changed;
- that the Character has become ineligible for all future attempts;
- that previous attempt history did not happen.

A player-facing FAIL explanation may name only reasons that are already legitimate player Knowledge.

If the exact unmet criterion remains unrevealed, FAIL must not disclose its identity or satisfaction state merely to explain the result.

A post-attempt debrief may reveal more only when that debrief itself is an authorised Knowledge route.

## 8. Retry truth

The player may legitimately be told that retry does **not** reroll the Promotion requirement package.

For the same Chronicle playthrough + stable Character + Academy -> Genin transition:

- the underlying package is the same;
- retry is another attempt against the same fixed Promotion truth;
- alternate authorised scenarios must support that already-fixed package;
- discovery/reveal may change what the Character knows;
- satisfaction/evidence state may change according to the authorised attempt/runtime rules;
- package identity does not change.

Do not describe retry as a chance to receive easier, different or freshly randomised requirements.

## 9. Boundary with other owners

This Rank contract deliberately stops at formal Promotion truth.

- **CE / Codex / Coordination** chairs #654 convergence and reconciles cross-owner comprehension semantics.
- **World / Missions / Events** owns the actual mission situation, authored objective content and route opportunities.
- **Combat / Skills / Items / Weapons** owns Battle action semantics where Battle is present.
- **UI / Assets + Coding** own how legitimate Rank truth is presented and interacted with without leakage.
- **Acquisition / Character Systems** owns downstream roster/ownership transition consequences after valid Promotion where applicable.

Rank does not author those systems through this clarification.

## Final lock

> **Academy -> Genin must be understandable without exposing hidden package truth. The player may know the assessed Character, the Academy -> Genin transition, the disclosed mission objective, that four readiness slots exist, that some may remain undisclosed, that full readiness rather than mission completion or Battle victory alone determines Promotion, and that retry does not reroll the requirement package. Individual readiness criteria may be named only after legitimate reveal authority. PASS means the exact subject satisfied the complete Rank resolver and is formally promoted; FAIL means no Rank mutation from that attempt, without automatically revealing which hidden criterion was unmet. Hidden criterion identity, hidden satisfaction state, package identity and machine diagnostics remain hidden unless separately authorised as player Knowledge.**
