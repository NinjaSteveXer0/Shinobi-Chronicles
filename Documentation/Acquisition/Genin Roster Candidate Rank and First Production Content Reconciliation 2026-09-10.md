# Shinobi Chronicles — Genin Roster Candidate Rank and First-Production Content Reconciliation

**Date:** 2026-09-10  
**Owner:** Acquisition / Character Systems  
**Status:** **BINDING ALPHA ACQUISITION RECONCILIATION — CONSUMES CURRENT RANK + CE CONTENT AUTHORITY / RUNTIME VALIDATION SEPARATE**

## Purpose

This is a narrow Acquisition reconciliation for the existing contract:

`Documentation/Acquisition/Dynamic Genin Roster Candidate and CE Team Preparation Contract 2026-09-10.md`

That earlier contract remains authoritative for acquisition, candidate-state, retention, autonomous preparation, floor, snapshot, ownership and assignment semantics except where this document explicitly supersedes stale wording.

This reconciliation consumes:

- `Documentation/Rank/Genin Leader Teacher Rank Eligibility Reconciliation 2026-09-10.md`;
- `Documentation/Coordination/First Production Genin Roster Candidate Content Authority 2026-09-10.md`;
- `Documentation/Coordination/Genin Expansion Alpha Admission and Candidate Versioning Decision 2026-09-10.md` where current v1/v2 sequencing is relevant.

It does not create another candidate database, team system, Rank rule, Registry identity, asset admission rule or runtime subsystem.

---

# 1. Leader / teacher source ranks — corrected Acquisition consumption

The older Acquisition shorthand that described `joninLeaderCandidateVariantIds` as Jōnin-only is superseded.

For Alpha, the allowed formal Rank source set for the leader/teacher role is exactly:

```text
{ jonin, special_jonin }
```

A representation enters the current leader/teacher candidate field only when all required authority is satisfied:

```text
formalRank ∈ { jonin, special_jonin }
AND exact leader/teacher eligibility exists
AND current availability is legitimate
AND no current person/team collision excludes it
AND no committed assignment/unavailability fact removes it
```

Rank alone remains insufficient.

The existing schema field name:

`joninLeaderCandidateVariantIds`

may remain for Alpha compatibility, but semantically it now contains the union of legitimately eligible formal-Jōnin and formal-Special-Jōnin candidates.

Do not create a second Special-Jōnin candidate array merely because the legacy field name says `jonin`.

A selected Special Jōnin remains formal Rank `special_jonin`. Leader assignment causes no Promotion, qualification mutation, Recognition mutation, PL/Stat mutation or collectible ownership by itself.

Preserve:

**Special Jōnin ≠ Jōnin**  
**schema label ≠ Rank restriction**  
**Rank eligibility ≠ candidate availability**  
**leader assignment ≠ Promotion ≠ acquisition ≠ Battle deployment**

---

# 2. First-production teammate candidate universe — v1 active authority

The exact active first-production replacement-candidate universe is supplied by CE content authority and is currently:

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

Policy marker:

`alpha_genin_roster_first_production_content_v1`

This is an authored candidate universe, not a Registry/rank scan. Future Genin Registry additions do not enter this v1 universe automatically.

A concrete `teammateCandidateVariantIds` snapshot is derived from this universe only after applying current Chronicle/person/team/availability/acquisition and committed candidate-preparation facts.

Candidate universe membership therefore does not guarantee inclusion in every snapshot.

---

# 3. First-production leader / teacher universe — v1 active authority

The exact active first-production leader/teacher universe is:

### Formal Jōnin

1. `jonin_hanabi`
2. `jonin_inojin`
3. `jonin_konohamaru`
4. `jonin_kushina`
5. `jonin_sasuke`
6. `jonin_shikaku`
7. `jonin_shino`

### Formal Special Jōnin

8. `sj_anko`
9. `sj_ebisu`
10. `sj_genma`
11. `sj_ibiki`
12. `sj_kiba`
13. `sj_nono`

These are the authored source candidates for v1, not a declaration that every listed representation is always currently selectable.

Concrete `joninLeaderCandidateVariantIds` still filters legitimate current availability, exact leader/teacher eligibility, person collision and committed autonomous assignment/unavailability history.

Collectible ownership remains unnecessary for generic Alpha leader assignment once the exact candidate is snapshot-authorised.

---

# 4. Deterministic concrete snapshot derivation

For the first unresolved post-Promotion `geninRosterTransition` snapshot:

1. begin from the exact active v1 teammate and leader/teacher universes above;
2. exclude any representation whose underlying stable Chronicle person is the promoted subject;
3. exclude replacement representations whose underlying stable person is one of the two current Academy teammates; those teammates belong in `retentionEligibleVariantIds` while retention remains legitimate;
4. exclude `assigned_elsewhere` / `unavailable` candidates from exact committed authority;
5. exclude candidates whose exact recruitment/acquisition or leader/teacher prerequisites are not currently satisfied;
6. consume committed CE/world/institutional candidate-preparation facts that occurred before snapshot creation;
7. project the survivors into the existing candidate arrays;
8. preserve the current two Academy teammates separately in retention;
9. retain exact policy/provenance references sufficient to explain exclusions and candidate state.

If the player promotes immediately and no candidate-affecting non-player history exists, do not fabricate `assigned_elsewhere` states merely to make the world appear dynamic.

---

# 5. Same-person collision — Acquisition enforcement

A final Story/Genin team must never simultaneously contain two representations of the same underlying Chronicle person.

This applies across:

- promoted subject;
- retained Academy teammates;
- replacement teammates;
- leader/teacher.

Examples include:

- `academy_hinata` + `genin_hinata`;
- `academy_menma` + `genin_menma`;
- `academy_kushina` + `jonin_kushina`;
- `genin_sasuke` + `jonin_sasuke`.

Representation-ID inequality is not enough. Candidate filtering/final validation must consume stable-person continuity authority.

Preserve:

**representation identity ≠ second person**  
**two cards ≠ two simultaneous Chronicle people**

---

# 6. No-deadlock floor — corrected leader interpretation

The autonomous minimum floor remains:

```text
remaining eligible uncommitted Genin replacement candidates >= 2
remaining eligible leader/teacher candidates from {jonin,special_jonin} >= 1
```

Retained Academy teammates do not count toward the two-Genin replacement floor.

The leader floor must not be implemented as `formalRank === jonin` only.

The floor protects transition completion, not favourite-character availability.

---

# 7. Snapshot/provenance compatibility

The existing Acquisition policy marker remains:

`alpha_genin_roster_dynamic_candidate_policy_v1`

The concrete content policy marker for current first-production content is:

`alpha_genin_roster_first_production_content_v1`

Snapshots should preserve both where useful, alongside Promotion occurrence/result, Academy team source, candidate-preparation/unavailability occurrences, person-collision exclusions and snapshot supersession lineage.

Existing snapshot stability/supersession rules remain unchanged:

**same authoritative state → same unresolved snapshot**  
**new committed candidate-affecting history → new snapshot may supersede with attributable provenance**  
**UI/reload/presentation activity → never candidate reroll**

---

# 8. Commissioned 25-row Genin expansion — not active v1 Acquisition content yet

A commissioned 25-row Konoha Genin expansion is moving through Registry/PL and production asset admission.

Acquisition does not add those rows to the active candidate universe merely because semantic Registry admission or physical card files exist.

Current active authority remains:

`alpha_genin_roster_first_production_content_v1`

until CE publishes a new explicit versioned candidate-content policy after the required production admission/asset gate closes.

When a v2 policy is published, historical v1 snapshots remain interpretable under their recorded policy/provenance and must not be silently rewritten.

Preserve:

**Registry admission ≠ candidate-content activation**  
**asset presence ≠ candidate-content activation**  
**v2 future universe ≠ retroactive mutation of v1 snapshot history**

---

# 9. Coding consumption correction

Coding issue #63 must consume this reconciliation in addition to the original Acquisition contract.

Required corrections/validations include:

- accept leader/teacher candidates from both `jonin` and `special_jonin` formal Rank sources when exact candidate authority permits;
- preserve Special Jōnin formal Rank after assignment;
- keep the existing `joninLeaderCandidateVariantIds` field if desired, but interpret it as the union candidate field;
- consume exact v1 candidate universes from CE authority rather than Registry/rank scans;
- enforce same-person collision across protagonist, teammate and leader roles;
- keep the 2 Genin + 1 leader/teacher floor with the corrected two-Rank leader source set;
- do not activate commissioned v2 Genin rows until a new versioned CE candidate-content authority exists;
- preserve historical v1 snapshot provenance after any later v2 activation.

---

# Final Alpha lock

For the current production pass:

- **Acquisition dynamic semantics:** `alpha_genin_roster_dynamic_candidate_policy_v1`;
- **candidate content:** `alpha_genin_roster_first_production_content_v1`;
- **teammate authored universe:** exact 13 `genin_*` IDs above;
- **leader/teacher authored universe:** exact 7 Jōnin + 6 Special Jōnin IDs above;
- **leader Rank source set:** `{ jonin, special_jonin }`;
- **leader collectible ownership:** not required by the generic Alpha institutional assignment path;
- **concrete snapshot:** current Chronicle-derived subset, not the whole authored universe;
- **25-row expansion:** not active until CE publishes a new versioned policy after its production gate closes.

Canonical shorthand:

> **Author the universe once, filter by the real Chronicle, and never let a schema label or Registry scan decide who is actually available.**
