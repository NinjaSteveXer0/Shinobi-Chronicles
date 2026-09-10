# Shinobi Chronicles — Genin Team Leader Candidate Rank-Sourcing Clarification

**Date:** 2026-09-10  
**Owner:** CE / Codex / Coordination — cross-system reconciliation  
**Status:** **BINDING ALPHA CLARIFICATION — LEADER/TEACHER CANDIDATE SOURCE POOL = JŌNIN + SPECIAL JŌNIN**

## 1. Purpose

This clarification records Stephen's explicit player-direction for the post-Promotion Genin team transition and removes an ambiguity in earlier shorthand that referred only to a "Jōnin candidate" or "Jōnin leader/teacher candidate".

The player-facing **leader/teacher candidate role** is not restricted to characters whose formal Rank is exactly Jōnin.

For Alpha, eligible leader/teacher candidates may be sourced from **both**:

- formal Rank **Jōnin**; and
- formal Rank **Special Jōnin**.

This clarification applies to the opening `geninRosterTransition` and the dynamic candidate-pool/autonomous-preparation rules recorded in:

`Documentation/Coordination/Opening Journey Academy Free Play Promotion and Dynamic Genin Team Availability 2026-09-10.md`

## 2. Canonical interpretation

Whenever the opening-flow documents use shorthand such as:

- `Jōnin candidate`;
- `Jōnin teacher/leader candidate`;
- `1 Jōnin remaining`;
- `Genin/Jōnin candidate field`;

for the post-Promotion leader slot, interpret the **candidate-role pool** as:

`eligible formal-Jōnin candidates ∪ eligible formal-Special-Jōnin candidates`

The role label does not rewrite formal Rank.

Preserve:

**leader/teacher candidate role ≠ formal Rank Jōnin only**  
**Special Jōnin candidate ≠ promoted to Jōnin by selection**  
**Jōnin candidate ≠ Special Jōnin Rank collapsed into Jōnin Rank**

## 3. Candidate floor

The existing no-deadlock floor remains:

- **2 eligible Genin teammate candidates**; and
- **1 eligible leader/teacher candidate**.

That one leader/teacher candidate may be either:

- an eligible Jōnin; or
- an eligible Special Jōnin.

Therefore the floor is semantically:

`2 Genin teammate candidates + 1 leader/teacher candidate from {Jōnin, Special Jōnin}`

Do not implement the floor as `formalRank === jonin` only.

## 4. Eligibility remains contextual

Being Jōnin or Special Jōnin does not automatically make a character available to the player.

The candidate must still satisfy the current Chronicle's legitimate leader/teacher eligibility and availability rules, including where applicable:

- current assignment / institutional availability;
- Chronicle history;
- relationships / Shared History;
- discoverability / Knowledge;
- recruitment or acquisition prerequisites;
- world/team state;
- any exact candidate-specific authored restriction.

Preserve:

**formal Rank ∈ {Jōnin, Special Jōnin} ≠ automatic candidate eligibility**  
**candidate eligibility ≠ ownership**  
**ownership ≠ assignment ≠ deployment**

## 5. CE autonomous preparation

CE/world autonomous preparation may legitimately prepare or assign eligible unselected leader/teacher candidates from either formal Rank class into non-player teams or other commitments, subject to the same causal-history rules as the wider dynamic pool.

The process still stops before it would reduce the player-relevant leader/teacher pool below one viable candidate.

A candidate becoming unavailable because of a legitimate non-player assignment does not delete the character and does not mutate their formal Rank.

## 6. Rank boundary

PL / Registry / Rank remains the owner of formal Rank and leader-role qualification semantics.

This document supplies the cross-system player-direction that the Alpha opening leader/teacher source pool includes **both Jōnin and Special Jōnin**. Rank authority should reconcile any older wording that implied only exact-formal-rank Jōnin candidates were allowed.

No other formal Rank is authorised by this clarification.

Preserve:

**Special Jōnin ≠ Jōnin**  
**candidate-role inclusion ≠ Rank equivalence**  
**teacher/leader assignment ≠ Promotion**  
**team role ≠ PL/Stat mutation**

## 7. Acquisition / Coding consumption

Acquisition / Character Systems should build the player-facing leader/teacher candidate snapshot from the union of legitimately eligible Jōnin and Special Jōnin candidates, not from a hard-coded exact-Jōnin filter.

Coding must consume that authoritative candidate snapshot and must not infer candidate availability from Registry order, asset folders, filenames or visible cards.

Save/load/UI refresh must preserve the same committed candidate state and must not reroll which formal-rank class remains available.

## Final Alpha lock

> **The post-Promotion team needs one legitimate teacher/leader. That candidate may be a Jōnin or a Special Jōnin. The role does not erase the distinction between those Ranks.**

Canonical shorthand:

**Leader/Teacher candidate pool = eligible Jōnin + eligible Special Jōnin.**
