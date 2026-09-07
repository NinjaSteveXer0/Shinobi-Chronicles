# Shinobi Chronicles — MEN-03 Tutorial Performance Source Occurrence Closure

**Date:** 2026-09-07  
**Status:** **COMBAT AUTHORITY — SOURCE OCCURRENCE CLOSED**  
**Source handoff:** GitHub issue #10

This document publishes the missing Combat-owned aggregate occurrence address required by the Alpha Academy Origin consequence row `MEN-03`.

Existing Combat authority remains unchanged:

- Origin: `origin_academy_menma_prologue`
- protagonist representation: `academy_menma`
- exact tutorial opponent: `test_subject_altered_shinobi`
- tutorial objective: **Stop the Altered Shinobi.**
- completed-result performance resolver fields: `performanceBucket`, `pressureRatio`, `criticalExposure`, `actionExecutionRatio`, plus supporting committed occurrence ancestry.

## 1. Exact aggregate source occurrence

The single authoritative Combat occurrence for the completed aggregate Menma tutorial-performance result is:

`combat_academy_menma_tutorial_performance_resolved`

For Alpha Academy Origin consequence addressing, the exact binding is:

- `sourceOccurrenceId`: `combat_academy_menma_tutorial_performance_resolved`
- `consequenceContractId`: `academy_menma_tutorial_performance_evidence`
- CE row: `MEN-03`

Preserve:

**sourceOccurrenceId ≠ consequenceContractId**

**aggregate performance occurrence ≠ Battle occurrence ID**

**aggregate performance occurrence ≠ any supporting Action occurrence ID**

## 2. Exact commit boundary

`combat_academy_menma_tutorial_performance_resolved` commits **once, and only once**, when the exact Menma tutorial encounter has reached a committed completed state satisfying all of the following:

1. the exact tutorial Battle is the locked `academy_menma` vs `test_subject_altered_shinobi` encounter under `origin_academy_menma_prologue`;
2. the tutorial objective has committed as completed / the Altered Shinobi has been stopped or neutralised under the existing Combat contract;
3. `tutorialResult == "completed"`;
4. the Combat performance resolver has finalised exactly one valid `performanceBucket` in `{ "low", "middle", "high" }`;
5. the historical pressure and action-execution metrics have been computed from committed Battle history under the existing superseding Combat resolver;
6. the supporting committed occurrence ancestry has been captured.

The aggregate occurrence must **not** commit for:

- defeat;
- withdrawal;
- unresolved tutorial;
- opponent escape / non-stop outcome;
- `tutorialResult == "not_completed"`;
- `performanceBucket == null`;
- invalid or pre-commit action requests.

A failed/non-completed attempt therefore creates no MEN-03 aggregate source occurrence. If the tutorial is later legitimately retried and completed, the aggregate occurrence commits at that completed resolution boundary.

## 3. Required aggregate occurrence payload

The committed occurrence must preserve at minimum:

```js
{
  sourceOccurrenceId: "combat_academy_menma_tutorial_performance_resolved",
  occurrenceType: "tutorial_performance_resolved",
  originId: "origin_academy_menma_prologue",
  actorId: "academy_menma",
  opponentId: "test_subject_altered_shinobi",
  tutorialResult: "completed",
  objectiveCompleted: true,
  performanceBucket,
  startingUnderlyingBattlePLMaximum,
  grossFinalPLDamageReceived,
  pressureRatio,
  criticalExposure,
  committedMenmaActionOpportunities,
  meaningfullyResolvedMenmaActions,
  actionExecutionRatio,
  supportingOccurrenceIds
}
```

Existing schema property names may be adapted where the current runtime already has canonical names, but the source occurrence ID and factual semantics above must not change by schema convenience.

## 4. Supporting occurrence ancestry

`supportingOccurrenceIds` remain historical ancestry/evidence for how the aggregate result was computed.

They may include the exact committed Battle/action/state occurrences legitimately consumed by the resolver.

They do **not** become alternate MEN-03 dedupe addresses and none is selected arbitrarily as the aggregate source occurrence.

The aggregate occurrence therefore means:

> Combat has completed the Origin-specific Menma tutorial performance evaluation from committed underlying Battle history and has committed the final factual result.

It does not mean merely:

> one Battle happened or one action succeeded.

## 5. Idempotence / persistence

Within a Chronicle/save's Menma Origin lifecycle, `combat_academy_menma_tutorial_performance_resolved` is the singular semantic occurrence address for the completed tutorial-performance result.

Implementation must persist the committed aggregate occurrence and reuse that same `sourceOccurrenceId` through retry of consequence projection, save/load, UI refresh, or replay of the consequence-consumption path.

Do not mint a new aggregate occurrence merely because MEN-03 projection is attempted again.

If consequence application uses the CE address pair, dedupe authority is exactly:

`combat_academy_menma_tutorial_performance_resolved + academy_menma_tutorial_performance_evidence`

A separate Chronicle/renewal has its own Chronicle occurrence namespace/history; this contract does not collapse histories across Chronicles.

## 6. Consequence boundary

This source occurrence supplies factual Combat evidence only.

It does **not** itself:

- grant Stats;
- grant PL;
- create access/mastery;
- declare progression-stage completion beyond the CE consequence contract;
- infer HIGH merely from Battle victory;
- reinterpret observed Kinjutsu evidence.

The CE consequence contract owns what MEN-03 does with this evidence.

Preserve:

- Battle victory ≠ HIGH performance;
- performance evidence ≠ direct Stat/PL development;
- observed Kinjutsu evidence ≠ tutorial-performance bucket;
- invalid/pre-commit action ≠ committed history;
- supporting occurrence list ≠ aggregate source occurrence;
- consequence projection retry ≠ new source occurrence.

## 7. Final status

MEN-03 Combat source addressing is now **CLOSED**.

Exact binding:

`sourceOccurrenceId = combat_academy_menma_tutorial_performance_resolved`

`consequenceContractId = academy_menma_tutorial_performance_evidence`

Coding may now activate MEN-03 against the existing CE predicate/payload without inventing a source address.
