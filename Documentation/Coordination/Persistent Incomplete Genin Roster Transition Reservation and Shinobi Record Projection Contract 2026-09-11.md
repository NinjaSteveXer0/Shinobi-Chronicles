# Shinobi Chronicles — Persistent Incomplete Genin Roster Transition, Reservation and Shinobi Record Projection Contract

**Date:** 2026-09-11  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING ALPHA COORDINATION AUTHORITY — CODING CONSUMPTION THROUGH EXISTING #63**

## 1. Purpose

This contract closes the player-facing and Chronicle-state behavior for an **incomplete post-Promotion Genin roster transition**.

It extends the existing dynamic Genin roster / Acquisition / candidate-content authority without creating a second roster system.

Core experience:

1. the protagonist completes the authored opening/prologue and legitimate Academy → Genin Promotion assessment;
2. post-Promotion, the player may retain the legitimate Academy team or form a new Genin team under existing roster-transition authority;
3. the team-selection surface may be left **incomplete** and revisited later;
4. selected candidates may be deliberately **saved/reserved**;
5. unfilled candidate availability may later change only because legitimate committed Chronicle history changed;
6. Shinobi Record keeps the player oriented and may report legitimate public/known passive team-formation events without becoming an omniscient CE debug feed.

Preserve throughout:

> candidate eligibility != ownership != reservation != assignment != deployment  
> Save != final team assignment  
> UI refresh != semantic reroll  
> passive World Truth != observer Knowledge  
> Shinobi Record presents legitimate Knowledge; it does not create truth by presentation

---

## 2. Consumed authority

This contract consumes and does not reopen:

- `Documentation/Coordination/Opening Journey Academy Free Play Promotion and Dynamic Genin Team Availability 2026-09-10.md`;
- `Documentation/Acquisition/Dynamic Genin Roster Candidate and CE Team Preparation Contract 2026-09-10.md`;
- `Documentation/Acquisition/Genin Roster Candidate Rank and First Production Content Reconciliation 2026-09-10.md`;
- `Documentation/Acquisition/Genin Roster Transition Recruitment and Retention Edge Closure 2026-09-10.md`;
- `Documentation/Coordination/Genin Roster Candidate Content Policy v2 2026-09-11.md`;
- current Rank authority for Academy → Genin;
- existing Shinobi Record / Knowledge doctrine;
- GitHub Coding handoff #63.

The active candidate-content policy remains lineage-pinned exactly as already closed. This contract does not migrate v1 lineages to v2 or alter the 38-row v2 authored universe / 13-row leader universe.

---

## 3. Post-Promotion entry choice

After a successful Academy → Genin Promotion result, the roster transition may present the player with the conceptual choice:

- **Stay With Your Academy Team**
- **Form / Join a New Genin Team**

This choice is not itself a new Rank or Acquisition system.

### Stay with Academy Team

The existing legitimate retained teammates are preselected/retained under current retention authority.

Any still-required role, including a Jōnin / Special Jōnin leader where one is not already authoritatively assigned, remains subject to the existing roster-transition rules.

### Form / Join a New Genin Team

The protagonist remains the fixed subject of the transition while the current legitimate Genin teammate candidates and Jōnin / Special Jōnin leader candidates are projected from the current authoritative snapshot.

The UI may visually center the protagonist and present candidate rows around/above them. Presentation does not change semantic truth.

---

## 4. Required final team shape

For this Alpha transition, **CONTINUE / FINALISE** remains disabled until the transition has a legal complete formation equivalent to:

```text
3 Genin total
+ 1 authorised Jōnin / Special Jōnin leader
```

The promoted protagonist counts as one of the three Genin.

The other two Genin may be legitimate retained Academy teammates and/or legitimate recruited replacement candidates under existing authority.

The leader must come from the currently authorised leader candidate field and must satisfy the existing Rank/institutional eligibility rules.

A complete visual selection is not yet final history until the player deliberately commits the final transition.

---

## 5. SAVE creates a persistent incomplete transition

The player may press **SAVE** before the final team is complete.

SAVE must persist the current incomplete transition lineage and exact selected/reserved slots.

It must be possible to:

```text
select some legitimate candidates
→ SAVE
→ close the team-selection surface
→ return to Arena / World / other legal free-play activity
→ later return to Arena → Promotion → CHOOSE YOUR TEAM
→ resume the same incomplete transition
```

The temporary **CHOOSE YOUR TEAM** entry remains available while the transition is incomplete.

UI close, navigation, save/load, browser refresh, or reopening the surface must not discard or reroll the saved transition.

---

## 6. Reservation semantics

A saved selected candidate becomes **reserved to the player's unresolved `geninRosterTransition` lineage** while that reservation remains valid.

Reservation means ordinary CE background team preparation must not assign that exact stable Chronicle person to another team while the reservation is active.

### Genin replacement candidate

For an unowned Genin replacement selected and saved through the existing recruitment route:

- the existing `genin_roster_transition_recruitment` transaction is used;
- successful recruitment creates/reuses legitimate ownership exactly as current Acquisition authority requires;
- the recruited Genin is then reserved to the unresolved transition;
- ownership does **not** by itself mean final team assignment;
- incomplete-team reservation does **not** make the Character automatically deployable as a finalized team member.

Therefore:

> recruited + reserved Genin may be genuinely owned before final team assignment.

If the Genin representation is already legitimately owned, reuse that ownership; do not duplicate it.

### Jōnin / Special Jōnin leader

Saving a legitimate leader selection creates an institutional **reservation / pending leader assignment** for this transition.

It does **not** grant collectible/My Clan ownership merely because the leader has been reserved.

Preserve:

> Jōnin leader reservation/assignment != collectible ownership != Battle deployment

### Existing retained Academy teammate

A legitimately retained current Academy teammate remains protected by the existing retention/current-assignment semantics. Saving the incomplete transition must not duplicate acquisition or erase prior Shared History.

---

## 7. Reservation persistence and exceptional invalidation

Ordinary candidate-pool churn must not silently take a saved reserved Character away from the player.

A reservation may cease to be valid only through a separately committed authoritative occurrence/state that genuinely overrides it, such as an applicable death, disappearance, imprisonment, institutional revocation, Story lock, or another exact future rule owned by the proper system.

If such an exceptional override occurs:

- do not silently replace the slot;
- persist the exact causal occurrence/provenance;
- project an observer-safe explanation when the protagonist can legitimately know it;
- require the player to resolve the now-open slot.

Do not invent exceptional invalidations merely to make the roster feel dynamic.

---

## 8. Unfilled availability may evolve with Chronicle history

The benefit of an incomplete saved transition is that the player may continue legal activity before choosing every slot.

The trade-off is that **unreserved / unfilled candidate availability may legitimately change while the Chronicle continues**.

Examples of legitimate candidate-affecting history include existing authorised CE / institutional team-preparation occurrences that commit a candidate as:

- `assigned_elsewhere`;
- otherwise `unavailable`;
- newly `available` through a legitimate causal change;
- or another exact state already authorised by the owning system.

The candidate field may be superseded only from such committed history and must preserve the existing `snapshotId` / `supersedesSnapshotId` / provenance rules.

Immediate-Promotion baseline must not fabricate assignments merely to create artificial scarcity.

The existing autonomous no-deadlock floor remains binding.

---

## 9. No reroll by presentation or save-scumming surface

The following are **never** candidate-affecting Chronicle occurrences by themselves:

- opening/closing the team-selection UI;
- reopening Arena;
- clicking Promotion;
- pressing X to leave the screen;
- card preview;
- hover/focus;
- save/load;
- browser refresh;
- quitting/relaunching the same Chronicle;
- presentation re-render.

Therefore none of these may reroll candidate availability or regenerate other-team assignments.

Canonical rule:

> **CE history may change the field. Looking at the field may not.**

Once CE commits an autonomous assignment such as `Rin → Team 6`, that fact is Chronicle history and must survive save/load. Reloading the same state must not ask CE to roll the assignment again.

A genuinely new Chronicle may produce different legitimate history; this contract does not force all Chronicles to be identical.

---

## 10. Shinobi Record incomplete-team objective

While the post-Promotion roster transition remains incomplete, Shinobi Record must maintain a clear tracked objective equivalent to:

**Complete Your Genin Team**  
`Complete your team in Arena → Promotion to continue the Chronicle.`

This prevents the player from leaving the formation screen and later being unable to understand why the main Chronicle cannot advance.

The objective remains until the roster transition is legitimately finalized or another explicit future authority supersedes it.

This is guidance / state presentation, not automatic progression.

---

## 11. Passive CE events and Shinobi Record

CE may commit factual events in the world that the protagonist did not directly participate in.

Shinobi Record must **not** display all such events automatically.

Binding projection rule:

> **A passive CE occurrence enters Shinobi Record only when the protagonist has a legitimate Knowledge route to the relevant fact.**

Legitimate Knowledge routes may include, where authored/authorised:

- direct observation;
- participant testimony;
- official village notice;
- public/institutional records;
- mission/administrative reporting;
- committed investigation/discovery;
- another exact Knowledge-producing occurrence.

Secret or private World Truth remains absent until legitimate Knowledge exists.

Examples that should not become omniscient Record entries merely because CE knows them:

- covert Root movement;
- secret meetings;
- concealed betrayals;
- private relationship changes;
- hidden Akatsuki activity;
- undiscovered deaths/disappearances;
- unknown investigation results.

Preserve:

> World Truth != observer Knowledge != presentation

---

## 12. Team Formation Updates are normally Record-visible once legitimately public/known

Formal Konoha Genin team assignments are normally suitable for Shinobi Record projection once the assignment is committed and the protagonist can legitimately know it through ordinary institutional/public village channels.

This lets the player understand why a previously available candidate is no longer selectable without exposing hidden CE internals.

A Record surface may therefore present observer-safe factual updates equivalent to:

```text
TEAM FORMATION UPDATES
Mikoto Uchiha — Reserved for your pending team
Anko Mitarashi — Reserved as leader for your pending team
Rin Nohara — Assigned to Team 6
Might Guy — Assigned to Team 11
Mito Uzumaki — Currently available
```

Exact team numbers/names are shown only when those exact facts actually exist and are legitimately known. UI must not fabricate them as decorative explanation.

If the protagonist only knows that a candidate became unavailable, but not why, the Record must not leak the hidden cause.

Candidate status presentation should therefore be observer-relative, for example:

- `Reserved for your pending team`;
- `Assigned to Team X under [leader]` when exact known fact exists;
- `Unavailable` when only unavailability is known;
- no entry when the protagonist lacks legitimate Knowledge of the change.

---

## 13. Strategic pressure without fake RNG

This design intentionally creates a bounded strategic trade-off:

- **benefit:** the player may reserve preferred candidates and continue playing rather than being forced to finalize from one instantaneous snapshot;
- **cost:** unreserved candidates may legitimately join other teams as committed Chronicle history evolves.

The system must not become a hidden random-timer punishment or an invitation to UI/save-load rerolling.

Dynamic pressure comes from factual Chronicle progression, not presentation churn.

The existing no-deadlock floor remains protection against autonomous CE consumption eliminating meaningful player choice.

No rule here guarantees a favourite candidate will remain available if the player deliberately leaves them unreserved and legitimate later history assigns them elsewhere.

---

## 14. Final CONTINUE / roster-transition commit

CONTINUE / FINALISE becomes enabled only when the complete legal formation exists.

On deliberate final commit:

1. validate all selected/reserved slots against the current authoritative transition state;
2. fail closed if an exceptional authoritative change invalidated a required slot;
3. commit the final Genin team assignment as one coherent roster-transition result;
4. preserve recruited ownership/history;
5. preserve leader institutional assignment without silently granting collectible ownership;
6. clear/resolve the temporary incomplete-team objective;
7. remove the temporary `CHOOSE YOUR TEAM` entry;
8. permit downstream Chronicle continuation that requires completed Genin roster transition.

Final assignment does not itself grant PL, Stats, Skills, equipment, Battle deployment, Promotion, or unrelated progression.

---

## 15. Minimum machine-facing state

Coding may fit this into the existing `geninRosterTransition` state rather than create a second subsystem.

The unresolved transition must preserve equivalents of:

```text
transitionLineageId
candidateContentPolicyId
currentSnapshotId
subjectOwnedCharacterId
retentionEligibleVariantIds
teammateCandidateVariantIds
joninLeaderCandidateVariantIds
reservedGeninVariantIds[]
reservedLeaderVariantId | null
reservationProvenance[]
finalisationState = INCOMPLETE | READY | FINALIZED
supersedesSnapshotId | null
candidateChangeProvenance[]
```

Names are implementation-flexible; semantics are not.

A saved reservation must be reconstructible from persisted authority, never inferred from currently highlighted UI cards.

---

## 16. Runtime / save-load acceptance

Do not claim this behavior GREEN until Coding proves at minimum:

1. successful Promotion opens the roster transition without forcing immediate completion;
2. `Stay` and `New Team` paths preserve existing retention/candidate authority;
3. SAVE persists a partially completed transition;
4. closing/reopening returns the same reservations and same candidate truth absent new Chronicle history;
5. unowned saved Genin recruitment uses the existing Acquisition transaction and remains owned;
6. saved Genin reservation does not equal final assignment/deployment;
7. saved leader reservation does not grant collectible ownership;
8. ordinary CE background preparation cannot consume an active reservation;
9. a legitimate committed other-team assignment can remove an **unreserved** candidate and supersede the snapshot with provenance;
10. committed other-team assignment survives save/load and does not reroll;
11. UI reopen/save-load/browser refresh alone cannot change the field;
12. no-deadlock floor remains enforced;
13. Shinobi Record shows `Complete Your Genin Team` while incomplete;
14. known/public committed team assignments can appear as factual Team Formation Updates;
15. hidden passive CE events remain absent without legitimate protagonist Knowledge;
16. CONTINUE stays disabled until a legal 3-Genin + 1-leader formation exists;
17. final commit clears the temporary objective/Choose Your Team entry and produces the authoritative team assignment;
18. downstream Chronicle can then continue without manufacturing ownership, Rank, Skill, PL or deployment effects.

---

## 17. Alpha scope boundary

This contract does **not** require a full village labour-market simulation.

For Alpha, CE only needs to resolve from existing authorised machinery:

> given committed Chronicle truth, which unreserved candidates are currently legitimate for the unresolved player roster transition?

Future systems may deepen non-player team careers, transfers, rivalries, dissolutions or long-term institutional simulation without blocking Alpha.

---

## 18. Canonical summary

**SAVE reserves; CONTINUE assigns.**

**A recruited Genin may be owned and reserved before final team assignment.**

**A reserved Jōnin/Special Jōnin leader is not automatically collectible-owned.**

**Reserved characters are protected from ordinary autonomous assignment elsewhere.**

**Unreserved availability may change only because committed Chronicle history changed.**

**Opening, closing, loading or refreshing the UI never rerolls the roster.**

**Shinobi Record may report passive events only through legitimate observer Knowledge; formal known team assignments are valid Record information.**

**Complete Your Genin Team remains tracked until the transition is finalized.**

**The Alpha implementation consumes existing #63 machinery; no second roster/ownership/CE simulation system is authorised.**
