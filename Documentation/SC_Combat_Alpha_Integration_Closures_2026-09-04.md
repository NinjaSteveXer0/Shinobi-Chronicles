# Shinobi Chronicles — Combat Alpha Integration Closures

Date: 2026-09-04

This document records later Combat authority that supplements and, where stated, supersedes portions of `Documentation/SC_Combat_Deep_Sweep_Closures_2026-09-04.md`.

## 1. Academy Menma tutorial encounter — final composition

Origin: `origin_academy_menma_prologue`.

Wider clearing occurrence:

- `test_subject_brute` — keeps Anko under primary close-range pressure.
- `test_subject_unstable` — contributes to the wider dangerous clearing state.
- `test_subject_altered_shinobi` — breaks/repositions away from Anko's immediate control and becomes Menma's direct opponent.

Menma tutorial Battle deployment is exactly:

`academy_menma` vs `test_subject_altered_shinobi`.

Tutorial objective: **Stop the Altered Shinobi.**

The Brute and Unstable Test Subject are not silently instantiated into Menma's Battle. Preserve occurrence participation ≠ Battle-instance participation and enemy-card roster ≠ Battle deployment.

The corrected Writing dialogue uses `MENMA: “She does.”` for the female Altered Shinobi.

The Altered Shinobi Alpha action package is exactly:

- `test_subject_altered_shinobi_shinobi_strike`
- `test_subject_altered_shinobi_shuriken_cast`
- `test_subject_altered_shinobi_unstable_chakra_burst`

These three authored Actions are sufficient for the Alpha Menma tutorial encounter. The earlier phrase **“plus ordinary Basic Attack / Guard where legal” is superseded**. There is no universal enemy Basic Attack / Guard fallback authority to infer here, and Coding must not fabricate Basic Attack or Guard machine IDs, Attack PL, guard ratios, resolver semantics, or Stat-derived fallbacks for this opponent.

No boss-scale Curse Mark package, arbitrary Orochimaru high-tier inheritance, hidden instability stat, Summon package or Transformation is added.

## 2. Menma tutorial performance resolver — SUPERSEDING RULE

This section supersedes the earlier pressure-only HIGH/MIDDLE/LOW formula in the deep-sweep closure file.

Writing explicitly requires that the bucket not be derived solely from Remaining Battle PL, victory, damage or UI heuristics. Combat therefore uses two factual dimensions after the tutorial objective is actually completed:

1. **pressure management** — how much committed post-defence/Stamina damage Menma actually absorbed and whether he entered critical underlying Battle-PL exposure;
2. **action execution quality** — how many of Menma's committed action opportunities produced their authored primary effect rather than resolving ineffectively.

The resolver remains Origin-specific. It is not a universal Battle rating.

### Objective gate

No performance bucket exists unless Combat records the Altered Shinobi as stopped/neutralised and the tutorial encounter as completed.

Defeat, withdrawal, unresolved encounter or opponent escape/non-stop outcome returns:

- `tutorialResult: not_completed`
- `performanceBucket: null`

### Pressure evidence

Track:

`pressureRatio = grossFinalPLDamageReceivedByMenma / startingUnderlyingBattlePLMaximum`

`grossFinalPLDamageReceivedByMenma` is the sum of committed hostile `finalDamage` packets after defence/Stamina. Later restoration never subtracts from this historical total.

`criticalExposure = true` if any committed post-resolution state places Menma at or below 25% of starting underlying Battle-PL maximum.

### Action-execution evidence

Track Menma's committed action opportunities.

An action counts as `meaningfullyResolved` when its authored primary effect is successfully established by resolution, for example:

- damaging action produces positive final damage;
- control/Condition action successfully establishes its authored state;
- Guard/defensive action successfully establishes its authored defensive state;
- valid setup action establishes its authored setup state;
- valid Item/restorative action successfully applies its authored effect.

A committed damaging/control action that misses, is legitimately prevented, or otherwise resolves without its authored primary effect counts as ineffective. Invalid pre-commit requests are not history and are excluded rather than counted as failed actions.

`actionExecutionRatio = meaningfullyResolvedMenmaActions / committedMenmaActionOpportunities`

### Final buckets

For a completed tutorial victory/objective:

- **HIGH** — `pressureRatio <= 0.30`, no critical exposure, and `actionExecutionRatio >= 0.75`.
- **LOW** — `pressureRatio > 0.65`, OR critical exposure occurred, OR `actionExecutionRatio < 0.50`.
- **MIDDLE** — every other completed result.

Thus no single dimension decides the result by itself. A clean damage profile with poor execution is not HIGH; a technically efficient fight with severe pressure is not HIGH; victory merely enables evaluation.

Expose at minimum:

- `tutorialResult`
- `objectiveCompleted`
- `performanceBucket`
- `startingUnderlyingBattlePLMaximum`
- `grossFinalPLDamageReceived`
- `pressureRatio`
- `criticalExposure`
- `committedMenmaActionOpportunities`
- `meaningfullyResolvedMenmaActions`
- `actionExecutionRatio`
- supporting committed Battle occurrence IDs.

Observed Kinjutsu remains an entirely separate observer-bounded evidence channel and must not be inferred from this bucket.

## 3. Triple Rashomon — exact current Combat status

Canonical successful qualifying Gate-order names remain:

- `1>2>3` — Nine Hells Sanctuary
- `1>3>2` — Demon's Reversal
- `2>1>3` — Graveyard Seal
- `2>3>1` — Forsaken Threshold
- `3>1>2` — Maw of the Abandoned
- `3>2>1` — Ruined Gate Cataclysm

Current Alpha status:

| Sequence | Name | Combat status |
|---|---|---|
| `1>2>3` | Nine Hells Sanctuary | Recorded/discoverable successful sequence only in Alpha; executable mechanical effect deferred post-Alpha. |
| `1>3>2` | Demon's Reversal | Recorded/discoverable successful sequence only in Alpha; executable mechanical effect deferred post-Alpha. |
| `2>1>3` | Graveyard Seal | Recorded/discoverable successful sequence only in Alpha; executable mechanical effect deferred post-Alpha. |
| `2>3>1` | Forsaken Threshold | Recorded/discoverable successful sequence only in Alpha; executable mechanical effect deferred post-Alpha. |
| `3>1>2` | Maw of the Abandoned | Recorded/discoverable successful sequence only in Alpha; executable mechanical effect deferred post-Alpha. |
| `3>2>1` | Ruined Gate Cataclysm | Implemented current Alpha executable payoff. |

The five non-Cataclysm mappings are **not superseded as names/history** and are not declared permanently non-mechanical. Their older or future effect concepts are simply not current Alpha execution authority. Do not invent effects from the names.

Preserve successful qualifying Gate order ≠ button/input order; hidden possible Sequence Art ≠ discovered Knowledge ≠ executable access.

## 4. Field Readiness Assessment — Combat boundary

Writing lock: **FIELD READINESS ASSESSMENT**.

Formal mission: locate the missing field courier, recover the sealed dispatch, and return it to the examiner.

Combat does not own Promotion eligibility or Promotion pass/fail. Rank/Registry/Progression interprets the full evidence envelope.

Battle is conditional supporting content. Battle victory is never itself the Promotion objective.

### Controlled-opposition Combat role

Combat does not create a new promotion-only enemy identity by implication. Any controlled opponent must use an exact Registry/encounter identity supplied by the assessment content authority.

When controlled opposition is legitimately encountered, Combat may author it to pressure one or more of these factual problems:

- route access;
- current dispatch-holder safety;
- dispatch possession/integrity;
- disengage-versus-pursuit pressure;
- team-role/cover opportunities;
- regroup or separation consequences.

The opponent package must remain assessment-appropriate and must not use hidden Battle-capacity multipliers, boss-scale escalation or UI-authored scoring.

### Legitimate Battle outcomes

Combat may record factual opposition outcomes such as:

- `neutralized`
- `repelled`
- `evaded`
- `disengaged`
- `team_withdrew`
- `team_defeated`

These describe what happened in the encounter. They do not decide Promotion.

An authored disengage/escape can be a legitimate Battle resolution when preserving the dispatch/objective is the current mission-relevant action. Do not force every opposition encounter to terminate in enemy defeat.

### Objective-asset context

Where the sealed dispatch is currently present in Battle context, Combat receives its authoritative asset/holder state from the encounter/world authority and reports factual Battle consequences without becoming the persistent object owner.

Battle evidence may include:

- dispatch holder at Battle start/end;
- possession maintained/lost/recovered during Battle;
- dispatch integrity state where the authored encounter makes integrity relevant;
- protection/interception occurrences involving the current holder;
- pursuit/disengage choices that causally affect objective safety.

Preserve Battle state/evidence ≠ persistent world-object authority.

### Team / personal evidence

Combat emits committed occurrences rather than a hidden promotion score.

Evidence may include:

- direct personal Battle performance;
- protective/interception performance as a separate classification;
- explicit cooperative/joint actions;
- cover actions or role hand-offs where actually authored/performed;
- target/threat prioritisation choices;
- withdrawal/disengage actions;
- participant defeat/incapacitation state;
- objective-holder protection/loss/recovery events.

Do not infer `team coordination` merely because several characters acted in the same Battle. Coordination evidence requires explicit causal cooperation, role dependency, protection, hand-off, joint action or other qualifying authored relationship between actions.

### Combat evidence envelope

A Battle contribution to the assessment should expose at minimum:

- `assessmentContextId` supplied by assessment authority;
- `battleEncounterId`;
- participant IDs;
- `battleCompleted`;
- `battleResult`;
- `oppositionOutcome`;
- relevant committed Battle occurrence IDs;
- personal-performance evidence by participant;
- protective-performance evidence separately;
- explicit cooperation/joint-action evidence where present;
- objective-asset/dispatch Battle events where present;
- disengage/pursuit Battle occurrences where present.

Rank/Registry consumes this alongside non-Battle assessment evidence. Coding/UI must not derive Promotion from Combat fields.

Preserve:

- Battle result ≠ Promotion result;
- formal objective completion ≠ every assessment criterion satisfied;
- failed Promotion ≠ erased attempt;
- Battle may occur ≠ Battle victory is the Promotion objective;
- objective protection evidence ≠ Escort Special Jonin qualification automatically;
- personal/offensive performance ≠ protective performance;
- one assessment ≠ one deterministic Chronicle history.
