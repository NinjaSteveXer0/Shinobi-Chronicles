# Shinobi Chronicles — Genin Leader / Teacher Rank Eligibility Reconciliation

**Date:** 2026-09-10  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING ALPHA RANK RECONCILIATION — GENIN LEADER/TEACHER SOURCE RANKS = JŌNIN OR SPECIAL JŌNIN**  
**Source handoff:** GitHub issue #62  

## 1. Purpose

This document reconciles Rank-owned Alpha authority after Stephen explicitly authorised the post-Promotion Genin leader/teacher candidate pool to draw from both formal **Jōnin** and formal **Special Jōnin** candidates.

Consumed cross-system clarification:

`Documentation/Coordination/Genin Team Leader Candidate Rank Sourcing Clarification 2026-09-10.md`

Authority commit:

`319e295e44bfa13f6a85ece212c744e178808834`

This is a narrow reconciliation. It does not create a new team system, candidate database, Promotion path, qualification system, PL rule, or Registry class.

---

## 2. Superseded Rank wording

Within `Documentation/PL_Registry_Rank_Alpha_Authority.md`, section **8. Genin Roster Transition — Acquisition + Rank contract**, older wording that requires selecting one eligible **Jōnin** leader and says a candidate normally must hold formal Rank Jōnin is superseded for the Alpha leader/teacher role by this document.

The current exact Rank rule is:

> **The `geninRosterTransition` requires exactly one legitimate leader/teacher assignment. A candidate may satisfy the Rank-source requirement when their current formal Rank is either `jonin` or `special_jonin`. No other formal Rank is authorised by this reconciliation.**

Preserve:

**Special Jōnin ≠ Jōnin**  
**candidate-role inclusion ≠ Rank equivalence**  
**leader assignment ≠ Promotion**

---

## 3. Exact leader/teacher role boundary

The post-Promotion team has one leader/teacher role.

The Rank-source predicate for that role is:

```text
formalRank ∈ { jonin, special_jonin }
```

That predicate is **necessary but not sufficient**.

A candidate must also have exact current leader/teacher eligibility and current availability under legitimate Acquisition / CE / World / institutional authority.

Therefore:

```text
leaderTeacherCandidateEligible =
  formalRank in {jonin, special_jonin}
  AND exactLeaderTeacherEligibility == true
  AND currentAvailability == legitimate
```

Field names above are semantic notation only; Coding may preserve existing schema names.

Do not infer candidate eligibility from:

- formal Rank alone;
- Registry existence;
- collectible ownership;
- asset folder;
- filename;
- card presence;
- PL;
- Stats;
- Special Jōnin qualification alone;
- historical team membership alone.

---

## 4. Special Jōnin formal Rank remains distinct

A formal Special Jōnin selected as the Genin team's leader/teacher:

- remains formal Rank `special_jonin`;
- is not promoted to `jonin` by assignment;
- does not receive a Jōnin Recognition event merely from assignment;
- does not gain or lose a Special Jōnin qualification merely from assignment;
- does not mutate Base, Current, Effective or Battle PL merely from assignment;
- receives no Stat increase merely from assignment.

Existing Special Jōnin qualification and Recognition architecture remains unchanged.

Preserve:

**qualification ≠ formal Rank**  
**formal Rank ≠ leader eligibility automatically**  
**leader role ≠ qualification reward**  
**team role ≠ PL/Stat mutation**

---

## 5. No-deadlock floor — corrected Rank interpretation

The Alpha no-deadlock floor remains:

- **2 eligible Genin teammate candidates**; and
- **1 eligible leader/teacher candidate**.

The one leader/teacher candidate may be any legitimately eligible and available candidate whose formal Rank is either:

- `jonin`; or
- `special_jonin`.

Canonical floor semantics:

```text
remainingEligibleGeninReplacementCandidates >= 2
remainingEligibleLeaderTeacherCandidatesFromRanks{jonin,special_jonin} >= 1
```

Do **not** implement the leader floor as `formalRank === jonin` only.

This floor guarantees transition viability, not a favourite candidate and not full staffing of every possible NPC team.

---

## 6. Existing runtime-facing snapshot field

The currently authorised Acquisition snapshot shape includes:

`joninLeaderCandidateVariantIds`

For Alpha compatibility, **that field name may remain unchanged**. It is now a legacy schema label whose binding semantic meaning is:

> **exact leader/teacher candidate representation IDs drawn from the union of legitimately eligible formal-Jōnin and formal-Special-Jōnin candidates.**

Coding does not need to create a parallel `specialJoninLeaderCandidateVariantIds` array.

Coding also does not need to rename the field merely to satisfy this semantic correction, provided all resolver, validation, floor and commit logic consume the union source set correctly.

If a future schema cleanup renames it to a rank-neutral field such as `leaderTeacherCandidateVariantIds`, migration must preserve save/load compatibility and historical snapshot meaning; that cleanup is not required by this Rank closure.

Preserve:

**schema label ≠ formal Rank restriction**

---

## 7. Exact candidate-content boundary

This Rank reconciliation does **not** declare every current Jōnin or Special Jōnin representation leader-eligible.

It does not author an exact first-production candidate list.

It does not infer eligibility from the current asset folders or card counts.

Exact candidate inclusion still belongs to the authoritative contextual candidate snapshot produced through Acquisition consuming legitimate Rank + CE/World/institutional availability inputs.

Therefore:

**formal Rank allowed set ≠ exact candidate roster**

No Registry identities, collectible counts, Stats or PL values change under this closure.

---

## 8. Assignment / ownership / deployment boundaries

Leader/teacher candidate selection and assignment preserve existing architecture:

- candidate eligibility ≠ ownership;
- ownership ≠ assignment;
- assignment ≠ deployment;
- Registry presence ≠ availability;
- institutional leader assignment does not automatically grant collectible/My Clan ownership;
- leader assignment does not automatically place that leader into a Battle slot;
- Promotion remains already-earned before `geninRosterTransition` completion.

A selected Special Jōnin is therefore a **Special Jōnin serving the leader/teacher role**, not a Jōnin by reinterpretation.

---

## 9. Downstream consumption

Acquisition authority:

`Documentation/Acquisition/Dynamic Genin Roster Candidate and CE Team Preparation Contract 2026-09-10.md`

contains older exact-Jōnin shorthand in its leader snapshot and floor sections. Where that wording depends on Rank-source eligibility, this Rank reconciliation supersedes it semantically:

- `Formal Jōnin Rank is normally necessary` → **formal Rank must be `jonin` OR `special_jonin`**;
- `1 eligible Jōnin leader/teacher candidate` → **1 eligible leader/teacher candidate from {Jōnin, Special Jōnin}**;
- `remaining eligible Jōnin leader candidates >= 1` → **remaining eligible leader/teacher candidates from the authorised two-Rank union >= 1**;
- `joninLeaderCandidateVariantIds` remains permitted as the existing schema field, but its contents are the authorised union candidate set.

Acquisition transaction semantics otherwise remain unchanged.

Coding issue #63 must consume this correction before implementation/Golden closure and must not ship an exact-Jōnin-only filter.

---

## 10. Final Alpha lock

> **The Genin roster transition requires one legitimate leader/teacher. The formal Rank source set for that role is exactly Jōnin OR Special Jōnin. Special Jōnin remains a distinct formal Rank. Rank alone never makes a candidate eligible, and assignment changes neither Rank nor PL/Stats.**

Canonical shorthand:

```text
Leader/Teacher candidate source ranks = { jonin, special_jonin }
```

No other Rank is authorised by this handoff.
