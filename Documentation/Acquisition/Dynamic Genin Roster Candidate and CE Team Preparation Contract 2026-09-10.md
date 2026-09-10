# Shinobi Chronicles — Dynamic Genin Roster Candidate and CE Team Preparation Acquisition Contract

**Date:** 2026-09-10  
**Owner:** Acquisition / Character Systems  
**Status:** **BINDING ALPHA ACQUISITION CONTRACT — MACHINE-FACING SEMANTICS CLOSED / EXACT FIRST-PRODUCTION CANDIDATE CONTENT + CODING RUNTIME VALIDATION SEPARATE**

## Authority consumed

This contract consumes and does not replace:

- `Documentation/Coordination/Opening Journey Academy Free Play Promotion and Dynamic Genin Team Availability 2026-09-10.md`;
- `Documentation/PL_Registry_Rank_Alpha_Authority.md`;
- `Documentation/UI/Academy Team Formation Presentation Contract.md`;
- the existing `geninRosterTransition` candidate-snapshot consumer shape already implemented by Coding;
- CE committed-occurrence / causal-history / Knowledge doctrine.

Preserve throughout:

**candidate eligibility ≠ ownership**  
**ownership ≠ assignment ≠ deployment**  
**Registry existence ≠ candidate availability**  
**current assignment ≠ unassigned candidate**  
**candidate assigned elsewhere ≠ character deleted**  
**Promotion ≠ roster-transition completion**  
**presentation refresh ≠ semantic reroll/recommit**

---

# 1. Initial Academy Team Formation — exact Acquisition rule

The initial Alpha Academy Team Formation candidate pool is already content-closed:

> the selected Academy Origin protagonist is excluded and the other **nine exact Academy Origin representations** are legitimate candidates.

There are no Origin-specific availability exclusions for this initial mandatory formation unless a later explicit authority supersedes this Alpha rule.

`CONFIRM TEAM` is the acquisition/formation commit boundary.

The authoritative formation transaction must:

1. validate the exact selected Origin protagonist;
2. validate exactly two distinct selected Academy candidate representation IDs;
3. reject the protagonist as a teammate candidate;
4. reject duplicate teammate identity;
5. idempotently establish ownership/roster availability of the two exact selected Academy representations;
6. assign those two owned representations as the protagonist's current Academy teammates;
7. commit one attributable Academy Team Formation occurrence/result;
8. mark formation complete only when the full `1 protagonist + 2 teammates` result is valid.

The seven unselected Academy representations are not acquired by this transaction.

Formation provenance begins current-Chronicle team/shared-history potential from the legitimate formation point. It does not fabricate the unselected Origins' prologues, prior Shared History, prior Memories or player Knowledge.

Save/load/retry must converge on the same committed pair without duplicate ownership or duplicate team assignment.

No second Academy-specific acquisition state model is authorised. Coding should consume its existing Origin/owned-character/team/formation state and make the transaction idempotent.

---

# 2. Existing Genin Roster Transition snapshot shape remains canonical

Acquisition ratifies the existing machine-facing snapshot shape:

```js
{
  snapshotId,
  subjectOwnedCharacterId,
  retentionEligibleVariantIds,
  teammateCandidateVariantIds,
  joninLeaderCandidateVariantIds,
  provenance
}
```

`subjectOwnedCharacterId` is the exact stable owned-character identity that received Academy → Genin Promotion. It is not inferred from presentation order or a newly substituted `genin_*` representation.

No new universal roster array is authorised.

No Registry scan by formal Rank is authorised as candidate authority.

---

# 3. Acquisition-side candidate resolution states

For Alpha, candidate availability is resolved into the following semantic states. These are **semantic outcomes**, not a requirement to create a parallel standalone database if current authoritative team/world state already proves them.

## `available`

The exact representation is currently legitimate for the relevant candidate role, is revealed/available to the player where Knowledge matters, is not committed to another incompatible current assignment, and satisfies its authored current prerequisites.

`available` does not imply owned.

## `assigned_to_player`

The exact representation is already committed to the protagonist's current Story/Academy/Genin team context.

The two current Academy teammates normally resolve here before the roster transition and are protected from autonomous candidate consumption.

This state does not imply Battle deployment.

## `assigned_elsewhere`

A committed non-player team/institutional assignment occurrence has placed the exact candidate into an incompatible current role/team, making them unavailable to the player's current roster transition.

This removes the candidate from the player's available pool without deleting the Character, changing ownership, inventing Rank or erasing that Character's history.

## `unavailable`

An exact authoritative current-state reason excludes the candidate without requiring assignment elsewhere. Examples may include an authored absence, incompatible current role, closed recruitment route, current-world unavailability or another exact owner-approved exclusion.

Do not use `unavailable` as an unexplained generic boolean. Provenance must identify the authoritative basis.

## No soft `reserved` state from UI selection

Alpha does **not** create a semantic reservation merely because the player hovers, previews or pending-selects a candidate.

If a future transaction needs reservation/locking for concurrency, Coding may implement technical transaction protection without treating presentation selection as Chronicle history.

---

# 4. Retention semantics

`retentionEligibleVariantIds` is derived from the exact two teammates currently assigned to the promoted subject's pre-Promotion Academy team.

Each current teammate is included unless a separate committed occurrence has made that exact teammate legitimately unavailable for the post-Promotion team role.

Retention:

- creates no new acquisition;
- creates no duplicate ownership;
- does not replace the Registry representation;
- preserves the same owned-character continuity;
- preserves legitimate Shared History;
- does not auto-promote the retained teammate;
- does not imply Battle deployment.

The CE/world autonomous preparation process must never silently consume a teammate while that teammate remains legitimately assigned to the protagonist.

**time passing ≠ teammate abandonment**

---

# 5. Genin teammate candidate snapshot semantics

`teammateCandidateVariantIds` contains only exact replacement candidates that resolve `available` for **this subject + this Chronicle + this current world/acquisition state** at snapshot creation.

A candidate may be included when either:

1. the exact representation is already owned and remains legitimately available for the Genin teammate role; or
2. the exact representation is not owned, but an active legitimate acquisition/recruitment route exists and the opportunity is currently available/revealed.

Candidate inclusion must consume exact authority such as committed occurrences, current team/world state, authored relationship/Shared-History prerequisites, Knowledge/discoverability, timing, institutional availability and exact recruitment requirements where relevant.

Do not populate the array from:

- all Genin Registry identities;
- all owned Characters;
- all production Characters;
- Registry order;
- asset/card filenames;
- UI order;
- random static roster sampling.

The exact first-production Genin candidate identities are **not authored by this contract**. This contract closes the resolver/transaction semantics only.

---

# 6. Unowned replacement acquisition

An unowned representation may legitimately appear in `teammateCandidateVariantIds` only when an active acquisition/recruitment route exists for that exact representation.

Selection of an unowned replacement must continue through the existing `acquisition_required` behavior rather than silently creating ownership.

The subsequent acquisition transaction must:

1. revalidate that the exact route remains legitimate against the authoritative current state/snapshot lineage;
2. grant/reuse the exact Registry representation idempotently;
3. commit acquisition provenance including the qualifying route/occurrence and roster-transition context;
4. preserve ownership even if the player later chooses another final teammate;
5. leave final team assignment as a separate roster-transition consequence.

If another legitimate route acquired the exact representation after snapshot creation, reuse existing ownership rather than minting a duplicate.

**recruitment commit ≠ final team assignment**

---

# 7. Jōnin leader/teacher candidate snapshot semantics

`joninLeaderCandidateVariantIds` contains only exact representations that current Rank + Chronicle/world/institutional authority explicitly authorises to lead **this subject's team in this Chronicle state**.

Formal Jōnin Rank is normally necessary under current Rank authority, but Rank alone is never sufficient.

Do not populate from every Registry Jōnin.

Candidate authority may consume exact institutional assignment/access state, current availability, Chronicle history, world timing and authored leader prerequisites.

## Alpha ownership decision — institutional assignment/access is sufficient

For the generic Alpha Genin Roster Transition, **collectible ownership of the selected Jōnin representation is not required**.

The relevant consequence is an authorised institutional/team-leader assignment, not automatic player acquisition.

Therefore:

- an unowned but snapshot-authorised Jōnin leader may be selected/assigned;
- leader assignment does not grant My Clan/collectible ownership;
- an already-owned leader is not reacquired;
- leader assignment does not imply Battle deployment;
- any future exact leader route that specifically requires ownership must satisfy that prerequisite as part of candidate eligibility before snapshot inclusion rather than using a universal ownership gate after selection.

Coding must preserve teammate ownership validation while removing any generic post-snapshot leader-ownership requirement.

---

# 8. CE/world autonomous preparation and assignment

Other shinobi may legitimately progress into non-player teams while the player continues free play or otherwise delays resolving the post-Promotion transition.

Acquisition consumes only **committed causal facts** from CE/world/team authority.

A candidate leaves the player's available field only when an exact committed occurrence/state makes them `assigned_elsewhere` or otherwise authoritatively `unavailable`.

A valid non-player assignment fact should preserve at least:

- exact candidate representation/source identity;
- role/team assignment created;
- committed occurrence/assignment ID;
- causal/world/institutional basis;
- effective Chronicle point/time;
- whether the assignment removes that candidate from the player's current transition field.

This is not player ownership and must not create a player acquisition record.

Do not create candidate loss from:

- opening/closing UI;
- map opening;
- hover/focus;
- save reload;
- card inspection;
- presentation replay;
- unexplained RNG deletion.

---

# 9. Minimum viable pool floor — exact Alpha rule

Autonomous non-player preparation must never reduce the **player-relevant uncommitted replacement field** below:

- **2 eligible Genin teammate candidates**;
- **1 eligible Jōnin leader/teacher candidate**.

The protected two retained Academy teammates do **not** count toward the 2-Genin replacement floor. The floor exists so `replace both` remains a viable transition choice even after autonomous preparation has narrowed the world.

Before committing an autonomous assignment that would remove a player-relevant candidate, the resolver must project the post-assignment counts.

For a Genin candidate removal:

```text
allow only if remaining eligible Genin replacement candidates >= 2
```

For a Jōnin leader candidate removal:

```text
allow only if remaining eligible Jōnin leader candidates >= 1
```

If the proposed autonomous assignment would violate the relevant floor, that candidate is protected from this background consumption. CE/world may select another legitimate candidate outside the protected player-relevant field, form another team another way, or defer the assignment.

The floor protects completion, not preference. It does not guarantee a favourite Character.

An explicit later Story/World occurrence may still make a protected candidate unavailable if that authored occurrence genuinely changes the state. Such an exceptional authored change is not the autonomous pool-consumption process and must carry its own causal authority; if it would make the roster transition impossible, the owning systems must author a legitimate recovery path rather than silently violating the transition contract.

---

# 10. Snapshot creation, persistence and supersession

The snapshot is stable against presentation noise, not frozen against later committed Chronicle history.

## Creation

When the unresolved `geninRosterTransition` needs authoritative candidates, resolve current candidate state and mint one stable `snapshotId`.

The snapshot must record enough provenance to explain:

- promoted `subjectOwnedCharacterId`;
- Promotion assessment/occurrence/result;
- current Academy team used for retention;
- Acquisition policy/version;
- relevant candidate-availability bases;
- relevant autonomous assignment/unavailability occurrences;
- leader-eligibility bases;
- already-owned vs acquisition-required state where useful.

Recommended Acquisition policy marker:

`alpha_genin_roster_dynamic_candidate_policy_v1`

## No presentation reroll

The same unresolved authoritative state must reuse the same snapshot across:

- UI reopen;
- World Map reopen when no relevant world fact changed;
- save/load;
- hover/focus;
- candidate inspection;
- presentation retry.

## Legitimate supersession

A later **committed candidate-affecting fact** may legitimately change the pool while the roster transition remains unresolved.

Examples include a committed non-player team assignment, exact recruitment/relationship consequence, exact candidate unavailability change or another owner-authorised world/institutional occurrence.

When such a material fact changes candidate truth:

1. do not mutate the old snapshot in place as if it never existed;
2. resolve a new candidate state;
3. mint a new `snapshotId`;
4. record `supersedesSnapshotId` and the exact supersession occurrence/reason in provenance;
5. persist the new snapshot;
6. preserve the old causal/history evidence as historical truth.

**new committed history → new snapshot may be valid**  
**same presentation state → new snapshot is not valid**

---

# 11. Retain / replace-one / replace-both transaction behavior

The final teammate selection contains exactly two valid teammate slots.

## Retain both

Both current retention-eligible Academy teammates remain assigned. No acquisition occurs.

## Replace one

One retention-eligible current teammate remains assigned; one selected replacement must be in the authoritative teammate candidate snapshot and must be owned before final assignment commits.

The outgoing teammate remains owned and keeps prior Shared History.

## Replace both

Both selected replacements must be in the authoritative teammate candidate snapshot and must each be owned before final assignment commits.

Both outgoing Academy teammates remain owned and retain history.

Final team assignment must not replay or erase any acquisition occurrences performed while preparing the transition.

---

# 12. Jōnin leader assignment transaction

Transition completion requires exactly one selected leader from `joninLeaderCandidateVariantIds`.

The leader assignment must:

1. validate candidate membership in the current authoritative snapshot;
2. validate the exact current Rank/leader-role requirement;
3. validate current assignment/access authority if materially rechecked at commit;
4. create/persist the Story/Genin-team leader assignment;
5. create no collectible ownership merely because the assignment succeeded;
6. create no automatic Battle deployment;
7. remain idempotent on save/retry.

If the exact leader became legitimately unavailable through a committed superseding occurrence before final commit, the stale snapshot/selection must fail closed and the transition must consume the new authoritative snapshot rather than resurrecting the leader.

---

# 13. Candidate assignment elsewhere remains history

Once a candidate is committed to another non-player team/institutional assignment:

- reopening UI does not free them;
- loading the same save does not free them;
- the player declining another candidate does not free them;
- presentation refresh does not erase that assignment;
- the Character is not deleted;
- player ownership is not fabricated;
- protagonist Knowledge of the off-screen assignment exists only when legitimately established by Knowledge/discovery authority.

A later legitimate occurrence may change that assignment, but it must be another attributable historical fact.

---

# 14. Exact candidate content boundary

As of this contract, there is **no durable authoritative exact starting list** of post-Promotion Genin replacement candidate IDs or Jōnin leader candidate IDs for the first production fresh-save Chronicle.

Acquisition therefore does **not** invent one here.

Coding must implement/consume the dynamic resolver contract without hardcoding a Registry-derived candidate list.

Until exact first-production candidate content is supplied by the relevant CE/world/content authority, Coding may use explicit diagnostic fixtures for regression only, clearly marked non-production, and must not claim the true fresh-save post-Promotion Golden complete.

This is a content dependency, not permission for Coding to infer candidates.

---

# 15. Required Coding regression behavior

Coding implementation is not complete until it proves at least:

1. initial Academy formation acquires/assigns exactly the two confirmed candidates once;
2. unselected Academy candidates are not acquired;
3. retention derives from the actual current Academy team;
4. current player-assigned Academy teammates are not consumed by CE background preparation;
5. Genin/Jōnin candidate arrays are supplied by authority, not Registry scans;
6. an autonomous committed non-player assignment can remove an unselected candidate from later availability;
7. such removal does not delete the Character or grant player ownership;
8. autonomous removal stops at the 2 Genin + 1 Jōnin player-relevant floor;
9. retained Academy teammates do not count toward the 2-Genin replacement floor;
10. UI reopen/save reload does not reroll or consume candidates;
11. a legitimate later committed candidate-affecting occurrence creates an attributable superseding snapshot rather than presentation reroll;
12. stale snapshot selection fails closed when authoritative candidate state has legitimately superseded it;
13. unowned replacement selection uses `acquisition_required` and never silently owns;
14. successful replacement acquisition persists even if that Character is not in the final team;
15. replacing a teammate does not un-own the outgoing teammate;
16. an unowned but snapshot-authorised Jōnin leader can be institutionally assigned without collectible acquisition;
17. leader assignment does not imply Battle deployment;
18. candidate assignment elsewhere survives save/load as historical truth;
19. no exact production candidate IDs are invented from filenames, cards, Registry order or Rank alone;
20. true fresh-save post-Promotion Golden remains blocked until exact first-production candidate content is authoritative.

---

# Final Alpha lock

Acquisition's Alpha model is:

`committed Chronicle/world/team facts`

→ resolve exact current candidate availability

→ protect player-assigned teammates

→ allow legitimate CE non-player assignments only while the player-relevant pool remains at least `2 Genin + 1 Jōnin`

→ persist candidate history

→ mint/reuse an authoritative roster snapshot

→ supersede only when new committed history materially changes candidate truth

→ retain/recruit/assign through exact ownership and assignment boundaries.

Preserve:

**dynamic world ≠ random roster**  
**candidate pressure ≠ deadlock**  
**minimum floor ≠ guaranteed favourite**  
**candidate availability ≠ ownership**  
**retention ≠ acquisition**  
**replacement ≠ un-owning**  
**Jōnin assignment ≠ collectible ownership**  
**snapshot stability ≠ frozen Chronicle**  
**new committed history ≠ UI reroll**.
