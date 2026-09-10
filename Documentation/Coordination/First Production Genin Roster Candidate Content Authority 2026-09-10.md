# Shinobi Chronicles — First-Production Genin Roster Candidate Content Authority

**Date:** 2026-09-10  
**Owner:** CE / Codex / Coordination — first-production content reconciliation  
**Status:** **BINDING ALPHA CONTENT AUTHORITY — BASE CANDIDATE UNIVERSES + SNAPSHOT DERIVATION CLOSED / RUNTIME VALIDATION SEPARATE**  
**Source handoff:** GitHub issue #65

## 1. Purpose

This document closes the exact first-production candidate-content dependency left open by the dynamic Genin roster Acquisition contract.

It supplies an explicit authored candidate universe and deterministic snapshot derivation rule. Coding must consume this authority through the existing `geninRosterTransition` snapshot machinery and must not derive production candidates from Registry order, asset folders, filenames, card ownership or formal Rank scans.

Consumed authority:

- `Documentation/Coordination/Opening Journey Academy Free Play Promotion and Dynamic Genin Team Availability 2026-09-10.md`;
- `Documentation/Acquisition/Dynamic Genin Roster Candidate and CE Team Preparation Contract 2026-09-10.md`;
- `Documentation/Rank/Genin Leader Teacher Rank Eligibility Reconciliation 2026-09-10.md`;
- existing Registry/person-continuity authority.

Preserve:

**candidate universe ≠ current snapshot**  
**candidate eligibility ≠ ownership**  
**ownership ≠ assignment ≠ deployment**  
**formal Rank source set ≠ automatic candidate inclusion**  
**representation identity ≠ duplicate Chronicle person**

---

# 2. First-production Genin teammate candidate universe

The authored first-production replacement-candidate universe is exactly:

1. `genin_boruto`
2. `genin_chocho`
3. `genin_himawari`
4. `genin_hinata`
5. `genin_hoki`
6. `genin_karin`
7. `genin_menma`
8. `genin_mikoto`
9. `genin_mitsuki`
10. `genin_naruto`
11. `genin_orochimaru`
12. `genin_sarada`
13. `genin_sasuke`

This is authored candidate-content authority. It is not a rule saying “all Registry Genin are candidates.” Future Registry additions do not enter this universe automatically.

A listed representation is still excluded from a concrete snapshot when current authoritative state makes it ineligible/unavailable or when it would duplicate a Chronicle person already occupying the protagonist/current-team context.

---

# 3. First-production leader / teacher candidate universe

The authored first-production leader/teacher universe is exactly:

### Formal Jōnin source representations

1. `jonin_hanabi`
2. `jonin_inojin`
3. `jonin_konohamaru`
4. `jonin_kushina`
5. `jonin_sasuke`
6. `jonin_shikaku`
7. `jonin_shino`

### Formal Special Jōnin source representations

8. `sj_anko`
9. `sj_ebisu`
10. `sj_genma`
11. `sj_ibiki`
12. `sj_kiba`
13. `sj_nono`

This explicitly consumes Stephen's lock that the leader/teacher source pool is drawn from **both Jōnin and Special Jōnin**.

The existing schema field may remain `joninLeaderCandidateVariantIds`, but its first-production content may contain exact IDs from both formal-rank classes.

Preserve:

**Special Jōnin ≠ Jōnin**  
**leader/teacher candidate role ≠ formal Rank mutation**  
**Rank alone ≠ candidate availability**

---

# 4. Deterministic first-snapshot derivation

At the first unresolved `geninRosterTransition` snapshot after successful `academy_to_genin_field_readiness_assessment`, resolve content in this order:

1. start from the exact teammate and leader universes in sections 2 and 3;
2. exclude any representation whose underlying stable Chronicle person is the promoted subject;
3. exclude any representation whose underlying stable Chronicle person is one of the two current Academy teammates from the replacement-candidate field; those two belong in `retentionEligibleVariantIds` while retention remains legitimate;
4. exclude any candidate whose exact current authoritative state is `assigned_elsewhere` or `unavailable`;
5. exclude any candidate whose authored acquisition/recruitment/leader eligibility is not currently satisfied;
6. apply any committed CE/world/institutional candidate-preparation facts that occurred before snapshot creation;
7. project the surviving exact replacement IDs into `teammateCandidateVariantIds` and the surviving exact leader IDs into `joninLeaderCandidateVariantIds`;
8. preserve the current two Academy teammates separately in `retentionEligibleVariantIds` and do not count them toward the 2-Genin replacement floor.

For a fresh Chronicle in which the player promotes immediately and no candidate-affecting non-player assignment/unavailability occurrence has committed, the initial candidate states are `available` after the identity/current-team exclusions above.

No default `assigned_elsewhere` candidates are fabricated merely to make the pool look dynamic.

---

# 5. Same-person collision rule

A concrete player team must never contain two representations of the same underlying Chronicle person.

This applies across protagonist, retained teammates, replacement candidates and leader/teacher role.

Examples that require current-person exclusion rather than representation-ID comparison alone include:

- `academy_hinata` / `genin_hinata`;
- `academy_menma` / `genin_menma`;
- `academy_kushina` / `jonin_kushina`;
- `genin_sasuke` / `jonin_sasuke` if both would otherwise be selected into the same final team.

A candidate may remain in the authored universe while being absent from one Chronicle's concrete snapshot or invalid as a simultaneous final selection because the same stable person is already represented elsewhere.

Preserve:

**same person ≠ two deployable people because two cards exist**  
**representation choice ≠ ontological duplication**

---

# 6. Retention and replacement floor

The current two Academy teammates remain in `retentionEligibleVariantIds` while legitimately available for retention.

They do **not** count toward the autonomous minimum replacement floor.

The floor remains:

```text
remaining eligible uncommitted Genin replacement candidates >= 2
remaining eligible leader/teacher candidates from {jonin,special_jonin} >= 1
```

The floor protects transition viability. It does not guarantee a particular favourite candidate.

---

# 7. Candidate preparation before the first snapshot

The first post-Promotion snapshot is not required to show the untouched base universe if the player spent time in legitimate Academy free play and committed candidate-affecting history before Promotion.

Where existing CE/world/team systems have committed an exact non-player assignment or exact unavailability fact for one of the authored candidates, that fact is consumed before the snapshot is produced.

The snapshot does not invent such a fact from elapsed UI time, map opens, training-screen visits or generic delay.

Candidate preparation remains causal:

**committed candidate-affecting occurrence → changed authoritative candidate state → later snapshot projection**

not:

**time passed → remove a random card**.

If no such occurrence exists, the candidate remains available subject to the other filters in this document.

---

# 8. Snapshot provenance

Each first-production snapshot must record enough provenance to explain its exact contents.

At minimum preserve:

- `candidateContentPolicyId = alpha_genin_roster_first_production_content_v1`;
- exact successful Promotion assessment/result occurrence for `academy_to_genin_field_readiness_assessment`;
- exact current Academy Team Formation/team-state source used to derive retention;
- Acquisition policy/version, including `alpha_genin_roster_dynamic_candidate_policy_v1` where current runtime uses that marker;
- exact candidate-preparation / assigned-elsewhere / unavailability occurrences consumed, if any;
- exact person/representation exclusion reason where a candidate was removed to prevent stable-person duplication;
- superseded snapshot lineage where later committed facts change candidate truth.

The snapshot itself is a projection/receipt. It does not create Rank, ownership, assignment or candidate-preparation history merely by existing.

---

# 9. Mukai Kohinata boundary

Mukai Kohinata is intended for the Genin candidate/roster space under current CE/Story coordination, but exact Registry admission/addressing is not yet durable.

Therefore Mukai is **not** part of `alpha_genin_roster_first_production_content_v1` yet.

He may be added only after Registry publishes an exact stable identity/representation and the candidate-content authority is amended. His visible single Byakugan remains representation/possession fact only and does not become usable merely through candidate inclusion, ownership or team assignment.

This does not block the current first-production candidate field.

---

# 10. Runtime consumption / regression minimum

Coding must prove at minimum:

1. first-production candidate arrays come from this explicit content authority, not Registry/rank/asset scans;
2. an immediate-Promotion Chronicle yields the authored universe after current-person/current-team eligibility exclusions when no candidate-preparation facts exist;
3. current Academy teammates appear through retention and are not double-counted as replacement-floor candidates;
4. same-person representation collisions are excluded/fail closed across protagonist, teammate and leader roles;
5. both Jōnin and Special Jōnin exact IDs can appear in the same leader/teacher candidate field while preserving formal Rank;
6. a committed pre-snapshot `assigned_elsewhere`/`unavailable` fact removes only the exact candidate it governs;
7. no UI refresh/save-load reroll changes content;
8. later committed candidate-affecting history supersedes the snapshot through existing lineage rather than mutating historical truth;
9. autonomous preparation cannot reduce the surviving uncommitted field below 2 Genin + 1 leader/teacher;
10. no candidate inclusion grants ownership, Rank, PL/Stats or Battle deployment by itself.

---

# Final Alpha lock

The first-production post-Promotion candidate content is now explicit.

**Replacement candidate universe:** the 13 exact `genin_*` IDs listed in section 2.  
**Leader/teacher universe:** the 7 exact `jonin_*` + 6 exact `sj_*` IDs listed in section 3.  
**Concrete snapshot:** those authored universes filtered only by legitimate current Chronicle/person/availability/acquisition/leader-eligibility and committed candidate-preparation facts.

Canonical shorthand:

> **Author the candidate universe once; let the Chronicle determine who is still legitimately available.**
