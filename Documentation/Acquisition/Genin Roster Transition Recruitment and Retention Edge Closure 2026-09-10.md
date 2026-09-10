# Shinobi Chronicles — Genin Roster Transition Recruitment + Retention Edge Closure

**Date:** 2026-09-10  
**Owner:** Acquisition / Character Systems  
**Status:** **BINDING ALPHA ACQUISITION CLOSURE — PRODUCTION RECRUITMENT TRANSACTION + RETENTION EXCEPTION CLOSED / CODING VALIDATION SEPARATE**

## 1. Purpose

This document closes two remaining Acquisition-facing gaps exposed by source review of the active `geninRosterTransition` implementation:

1. an unowned authoritative replacement candidate can currently return `acquisition_required`, while the route `genin_roster_transition_recruitment` is visible in diagnostics but is not yet a closed production transaction/caller contract;
2. current runtime validation can force both pre-Promotion Academy teammates into retention even though existing authority permits a separate committed occurrence to make one of those teammates legitimately unavailable for the Genin-team role.

This document does not redesign the roster system. It consumes:

- `Documentation/Acquisition/Dynamic Genin Roster Candidate and CE Team Preparation Contract 2026-09-10.md`;
- `Documentation/Acquisition/Genin Roster Candidate Rank and First Production Content Reconciliation 2026-09-10.md`;
- `Documentation/Coordination/First Production Genin Roster Candidate Content Authority 2026-09-10.md`;
- `Documentation/Rank/Genin Leader Teacher Rank Eligibility Reconciliation 2026-09-10.md`;
- the existing Coding `geninRosterTransition` snapshot consumer and generic `commitCharacterAcquisition(...)` primitive.

Preserve:

**candidate eligibility ≠ ownership**  
**recruitment ≠ assignment**  
**retention ≠ acquisition**  
**current team membership ≠ guaranteed future availability**  
**snapshot presence ≠ silent ownership**

---

# 2. Exact production replacement recruitment route

The Alpha production route ID is:

`genin_roster_transition_recruitment`

For a replacement candidate to be recruitable through this route, all of the following must be true at the recruitment commit boundary:

1. `geninRosterTransition` is active and unresolved;
2. the caller supplies the expected current `snapshotId`;
3. the exact `variantId` is present in the current authoritative `teammateCandidateVariantIds`;
4. the candidate currently resolves `available` under that snapshot lineage;
5. the exact representation remains Registry-valid / production-admitted;
6. no same-stable-person collision makes the recruitment invalid for the current transition context;
7. no committed superseding occurrence has made the candidate `assigned_elsewhere` or `unavailable`;
8. the player explicitly accepts/confirms the recruitment action.

For first-production content policy `alpha_genin_roster_first_production_content_v1`, inclusion of an unowned representation in the current authoritative `teammateCandidateVariantIds` is sufficient Acquisition access to this generic roster-transition recruitment route unless that candidate has a separately authored stricter prerequisite. Coding must not require a second fabricated World event merely to make the already-authoritative candidate recruitable.

This means:

**candidate inclusion → recruitment opportunity available**

not:

**candidate inclusion → ownership granted**

---

# 3. Recommended machine-facing recruitment transaction

Coding may preserve current naming conventions, but the semantic API is equivalent to:

```text
commitGeninRosterTransitionRecruitment({
  variantId,
  expectedSnapshotId
})
```

Required behavior:

1. fail closed when the transition is inactive/completed;
2. fail stale when `expectedSnapshotId` is not the current authoritative snapshot;
3. revalidate exact candidate membership and current `available` state;
4. if the representation is already owned through another legitimate route, return `already_owned / reusable` without creating duplicate ownership;
5. if the same roster-transition recruitment occurrence already committed, return the same result idempotently;
6. otherwise commit one exact recruitment-acceptance occurrence and call the existing Character acquisition primitive with:
   - `variantId = exact selected replacement`;
   - `route = genin_roster_transition_recruitment`;
   - `sourceEventId = exact committed recruitment-acceptance occurrence ID`;
   - context including current `snapshotId`, promoted `subjectOwnedCharacterId`, and transition identity;
7. establish/reuse permanent ownership of that exact representation;
8. do **not** assign the Character to either teammate slot as part of the acquisition transaction;
9. allow normal teammate selection to succeed afterward because ownership now exists.

The committed recruitment occurrence ID must be stable on retry. A deterministic key derived from current snapshot + candidate is acceptable, provided it represents the player's explicit recruitment acceptance and does not turn the snapshot itself into an acquisition occurrence.

---

# 4. Recruitment persistence / supersession

If the candidate becomes legitimately unavailable **before** recruitment acceptance commits:

- recruitment fails closed;
- no ownership is created;
- the current/superseding snapshot is consumed normally.

If recruitment successfully commits and a later occurrence makes the Character unavailable for final team assignment:

- the Character remains owned;
- the recruitment remains historical truth;
- final team selection may fail against the newer authoritative snapshot;
- ownership must not be rolled back merely because the Character was not ultimately assigned.

If another legitimate acquisition route acquires the candidate between snapshot creation and recruitment action:

- reuse that ownership;
- do not mint a duplicate owned Character;
- no roster-transition recruitment record is required unless the player actually performs a distinct authorised recruitment occurrence.

Preserve:

**successful recruitment ≠ guaranteed final assignment**

---

# 5. Player-facing acquisition-required handling

Current `acquisition_required` / `genin_teammate_acquisition_required` behavior is correct as a fail-closed signal, but it must not be a terminal dead end for a snapshot-authorised unowned replacement.

When that result is returned for a current authoritative replacement candidate, runtime/UI must expose or invoke the explicit roster-transition recruitment action described above before retrying teammate selection.

The exact visual wording/control remains UI/Coding presentation authority. Semantically it must require explicit player confirmation and must not silently auto-own on card click or pending selection.

---

# 6. Retention eligibility — committed unavailability exception

Existing rule remains:

> the two exact pre-Promotion Academy teammates are retention-eligible by default.

But **default retention is not absolute**.

`retentionEligibleVariantIds` must equal:

```text
current pre-Promotion Academy teammates
MINUS any exact teammate whose current Genin-team retention eligibility was legitimately removed by a committed authoritative occurrence/state
```

Therefore Coding must not require every current pre-Promotion teammate to appear in `retentionEligibleVariantIds` when an exact committed unavailability fact proves otherwise.

Likewise, normalization must not automatically rewrite an explicitly unavailable current teammate back to `assigned_to_player` for retention purposes merely because that identity still exists in the historical/pre-Promotion team record.

A current teammate remains protected from autonomous background consumption while legitimately assigned. This exception applies only when a **separate committed occurrence** genuinely changes that teammate's availability; elapsed time, UI refresh, map opening, loading, or autonomous random consumption cannot do so.

If one current teammate becomes legitimately unavailable, the transition must require one replacement. If both become legitimately unavailable, it must require two replacements. The existing 2-Genin replacement floor remains the autonomous no-deadlock protection for the wider candidate field.

Preserve:

**historical Academy assignment ≠ forced Genin retention**  
**committed unavailability ≠ un-ownership**  
**unavailable for current team ≠ Character deleted**

---

# 7. Coding regressions required

Before Coding issue #63 is closed, prove at minimum:

1. selecting an unowned current-snapshot replacement returns `acquisition_required` without ownership;
2. explicit `genin_roster_transition_recruitment` acceptance acquires that exact candidate once;
3. retry/save-load of the same recruitment acceptance is idempotent;
4. after recruitment, teammate selection succeeds without a second acquisition;
5. recruitment does not assign the Character automatically;
6. recruit-then-change-mind leaves the Character owned;
7. stale/superseded snapshot blocks recruitment before commit without granting ownership;
8. candidate acquired via another legitimate route is reused, not duplicated;
9. no UI card click/preview alone grants ownership;
10. both current Academy teammates remain retention-eligible in the ordinary baseline;
11. a separately committed teammate-unavailability occurrence may remove exactly that teammate from retention;
12. runtime does not normalize that exact unavailable teammate back into retention merely because they were on the pre-Promotion Academy team;
13. unavailable outgoing teammate remains owned/history-preserved;
14. unrelated UI/save-load actions do not change retention or recruitment eligibility.

---

# 8. Final Alpha lock

> **A snapshot-authorised unowned Genin replacement must have a real, explicit, idempotent roster-transition recruitment transaction that can satisfy `acquisition_required`; recruitment creates ownership but not assignment. Current Academy teammates are retained by default, but a separate committed occurrence may legitimately remove an exact teammate from retention without deleting or un-owning them.**

No new Registry, Rank, Progression, World, Battle, or duplicate-economy system is created by this closure.
