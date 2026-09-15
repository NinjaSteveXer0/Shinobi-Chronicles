# Shinobi Chronicles — First Konoha Post-Team Tutorial Continuation Contract

**Date:** 2026-09-15  
**Owner:** World / Missions / Events / Rewards  
**Status:** **BINDING WORLD ONBOARDING AUTHORITY — #178 CONTENT BLOCKER CLOSED; CODING IMPLEMENTATION / BROWSER GOLDEN SEPARATE**

## 1. Purpose

This document supplies the exact missing continuation requested by GitHub Issue #178 after Academy Team Formation.

Binding journey:

`Origin -> Prologue -> YOUR CHRONICLE BEGINS -> Academy Team Formation -> exactly 2 teammates -> committed 3-person squad -> First Team Orientation -> academy_free_play`

Preserve:

- team formation != tutorial completion;
- opening the Konoha map != tutorial completion;
- tutorial presentation != World occurrence truth;
- public location Knowledge != ordinary free-play authority;
- tutorial completion != Story mission completion;
- tutorial completion != Rank / Promotion / PL / Skill / Item grant;
- teammate assignment != fabricated Shared History.

This contract creates no second onboarding architecture. Coding should use the existing Academy Team Formation continuation seam, existing Konoha map/location machinery, existing World occurrence semantics, and existing save/persistence authority.

## 2. Stable occurrence identity

Mandatory one-shot onboarding occurrence:

`konoha_onboarding_first_team_orientation_v1`

Recommended deterministic occurrence instance key:

`konoha_onboarding_first_team_orientation_v1::<academyTeamFormationReceiptRef>`

The same committed Academy Team Formation receipt must always resolve to the same tutorial occurrence identity across reopen/save/load.

This occurrence is:

- mandatory for a fresh Academy onboarding journey;
- one-shot per Chronicle onboarding;
- not randomly selected;
- not part of the ordinary standing-opportunity refill pool;
- not Main Story;
- not a Battle occurrence.

## 3. Exact entry / caller

Entry authority is the already-committed Academy Team Formation receipt proving:

- one selected Origin/Ninja identity is locked;
- exactly two legitimate Academy teammates have been committed;
- the resulting active squad contains exactly three members;
- no tutorial-completion receipt already exists.

When the player activates the existing post-formation `CONTINUE`, `continueAcademyTeamFormationJourney()` must **not** immediately commit `academy_free_play`.

It must instead enter/persist the semantic state:

`academy_first_konoha_tutorial_pending`

and route to `konoha_onboarding_first_team_orientation_v1`.

`formation.continuationCompleted` must not be treated as true merely because the Village overlay opened. If Coding retains that field, it may become true only when the tutorial completion receipt in section 7 has committed.

## 4. World host / map presentation

Primary host:

- `KON-P07` — **General Training Ground**

Local activity host:

- `KON-A02` — **Practical Training Compound**

No new top-level Konoha location is created.

During `academy_first_konoha_tutorial_pending`:

- open/project the ordinary Konoha village map;
- preserve legitimate public Konoha location Knowledge;
- focus `KON-P07` as the current onboarding destination;
- project one tracked `DEVELOPMENT`-class tutorial overlay at `KON-P07` using existing marker grammar;
- do not treat pulsing golden known-unknown halos as tutorial markers;
- do not surface ordinary `konoha_alpha_standing_pool_v1` opportunities as actionable yet because `KONOHA_FREE_PLAY` is not true;
- selecting or opening another public location may show lawful read-only location information, but does not complete the tutorial or unlock ordinary opportunities.

The tutorial must not reveal any concealed `KON-S##` location, hidden denominator, secret identity, Arc-specific location, or optional location that the current observer does not legitimately know.

## 5. Minimum player-facing objective

Required objective projection:

**FIRST TEAM ORIENTATION**  
**Report to the General Training Ground with your squad.**

On entry to `KON-P07` / `KON-A02`, project:

**Complete the First Team Orientation.**

The minimum interaction is deliberately small and deterministic:

1. player selects/focuses the General Training Ground from the Konoha map;
2. player enters the Practical Training Compound;
3. player activates **BEGIN ORIENTATION**;
4. the tutorial presents one bounded observation/practical-readiness interaction;
5. player activates **REPORT READY** after that interaction resolves;
6. the completion receipt commits;
7. the player returns to the Konoha map with ordinary Academy free play now authorised.

The bounded observation/practical-readiness interaction may reuse existing World training presentation primitives. It must not require a new prose-heavy Story scene, new NPC identity, new asset, new resolver architecture, or new combat tutorial.

## 6. Battle / success / failure semantics

**Battle: ABSENT.**

The first post-team Konoha tutorial is a map/location/opportunity onboarding seam, not a combat gate.

There is no performance failure state. `BACK`, closing the panel, reopening the map, reload, or leaving the location before `REPORT READY` simply leaves the tutorial pending at its latest committed phase.

There is no material reward, Ryō reward, Item reward, PL grant, Stat grant, Skill grant, Rank grant, Promotion grant, or automatic discipline EXP from this mandatory tutorial.

The occurrence may record only the factual onboarding/history receipt that the squad reported for its first field orientation. It must not fabricate pre-existing friendship, team chemistry, relationship improvement, mentor bond, or Shared History beyond the occurrence that actually happened.

## 7. Completion predicate / receipt

Stable completion receipt:

`konoha_onboarding_first_team_orientation_completed_v1`

Minimum receipt fields / equivalent committed facts:

```text
receiptId = konoha_onboarding_first_team_orientation_completed_v1
occurrenceId = konoha_onboarding_first_team_orientation_v1
academyTeamFormationReceiptRef
originVariantId
playerCharacterRef
squadMemberRefs[3]
hostLocationRef = KON-P07
localHostRef = KON-A02
orientationStarted = true
orientationReportedReady = true
completed = true
```

`academy_free_play` becomes true only when BOTH are committed:

1. valid Academy Team Formation receipt; and
2. `konoha_onboarding_first_team_orientation_completed_v1`.

Recommended post-completion transition:

`academy_first_konoha_tutorial_pending -> academy_first_konoha_tutorial_complete -> academy_free_play`

Coding may collapse the intermediate presentation state if persistence still proves the exact completion receipt before free play.

## 8. Save / load / reopen / idempotence

Required semantics:

- save after Team Formation but before tutorial entry -> reload returns tutorial pending and points to `KON-P07`;
- save after entering `KON-A02` but before `REPORT READY` -> reload resumes the same occurrence/phase; no reroll and no duplicate occurrence;
- save after completion -> reload remains `academy_free_play`; tutorial does not reopen;
- UI refresh/open/close cannot commit completion;
- map focus cannot commit completion;
- repeated `REPORT READY` after the receipt exists is idempotent and grants nothing again;
- new Chronicle reset creates a new onboarding occurrence only through a new legitimate team-formation receipt.

World does not require retroactively rewinding established older saves that have meaningful post-formation Chronicle history. #105 fresh-save/browser validation must use the strict new boundary above.

## 9. Chronicle-relative branches preserved

This tutorial is intentionally shared across all ten Academy Origins.

The current Chronicle still carries its real:

- selected Origin history;
- committed Origin consequences;
- exact two selected teammates;
- actor-relative Knowledge;
- any already-legitimate relationship/history facts.

The tutorial may display/use the actual three squad identities, but it must not normalise them into the same prior history.

There is no Origin-specific alternate tutorial branch required for Alpha.

If a Character legitimately knows additional Konoha geography before this point, that Knowledge remains true, but ordinary World opportunities remain gated until tutorial completion. If a Character does not know optional/secret geography, the tutorial does not reveal it.

## 10. Relationship to existing Konoha opportunity `KOH-X12`

The intended tutorial is **not** the ordinary standing occurrence `KOH-X12 — Observation Drill` itself.

Reason: `KOH-X12` is currently a repeatable `konoha_alpha_standing_pool_v1` opportunity whose eligibility depends on `KONOHA_FREE_PLAY`. Reusing that exact occurrence as the gate to `KONOHA_FREE_PLAY` would create a circular predicate and would consume/alter standing-event history.

The mandatory tutorial may reuse the **presentation/content family** of the Observation Drill at `KON-P07`, but it has its own stable one-shot identity:

`konoha_onboarding_first_team_orientation_v1`

After the tutorial is complete and ordinary free play is authorised, future legitimate `KOH-X12` occurrences remain independently eligible under their existing recurrence rules. Completing the tutorial does not pre-resolve or suppress `KOH-X12`.

## 11. Coding acceptance conditions

Implementation is correct only if a fresh onboarding traversal proves:

1. team formation commits exactly once;
2. post-formation `CONTINUE` enters tutorial-pending rather than `academy_free_play`;
3. Konoha map opens with `KON-P07` as the tracked tutorial destination;
4. standing World opportunities are not actionably surfaced before tutorial completion;
5. selecting/opening the map alone does not complete the tutorial;
6. entering `KON-P07` / `KON-A02`, beginning orientation, and reporting ready commits the stable completion receipt once;
7. only then does `academy_free_play` become true;
8. reload at each phase preserves exact state and squad composition;
9. no Origin or teammate history is fabricated/normalised;
10. no Battle is invoked;
11. no hidden Konoha content leaks;
12. no reward/development transaction duplicates or is invented;
13. existing ordinary `KOH-X12` remains independently available after free play when its own eligibility allows;
14. browser Golden remains separately validated under #105/#141.

## 12. Closure status

World content authority for #178 is closed by this contract.

- design closed: **YES**;
- exact stable occurrence identified: **YES**;
- exact Konoha host identified: **YES**;
- minimum player-facing objective identified: **YES**;
- completion receipt identified: **YES**;
- Battle requirement identified: **ABSENT**;
- save/load semantics identified: **YES**;
- Chronicle-relative preservation identified: **YES**;
- relationship to existing `KOH-X12` identified: **YES — reuse family, do not consume standing occurrence**;
- runtime implementation: **NO CLAIM**;
- installed-browser validation: **NO CLAIM**;
- Golden/regression GREEN: **NO CLAIM**.

No further Story prose or new CE architecture is required to implement this Alpha tutorial seam.