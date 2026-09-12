# Shinobi Chronicles — Decision-Sensitive Mission / Arc Debrief Reward Evaluation and Arc 1 Calibration

**Date:** 2026-09-13  
**Owner:** World / Missions / Events / Rewards  
**Source:** GitHub #59  
**Status:** **BINDING WORLD / REWARDS AUTHORING AUTHORITY — DESIGN CLOSED; IMPLEMENTATION / RUNTIME VALIDATION SEPARATE**

---

## 1. Purpose

This document closes the queued World/Rewards work requested by GitHub #59:

1. a reusable reward-evaluation model for Story missions and Arc debriefs;
2. exact separation between action-time development/evidence and later debrief rewards;
3. decision-sensitive reward families that consume committed Chronicle facts rather than a universal success score;
4. an Alpha calibration for the Arc 1 completion debrief surfaced at Arc 2 Mission 1;
5. deterministic one-shot entitlement / save-load behaviour;
6. loss/failure handling consistent with the project's existing `Battle loss != mission failure` doctrine.

It consumes and does not reopen:

- `Documentation/World/World Mission Event Non-Loot Outcome Authoring Contract.md`;
- `Documentation/World/Battle Loss Mission Failure and Alternate Reward Outcome Doctrine 2026-09-11.md`;
- `Documentation/Coordination/Specialist Action Progression and Special Jonin Evidence Reconciliation 2026-09-10.md`;
- `Documentation/Story/Arc1_Konoha_Story_Skeleton_and_Choice_Authority_2026-09-09.md`;
- the current Arc-1 World/Story/Combat committed-history contracts;
- Konoha Alpha reward practice in `sc_world_alpha_activation_konoha_v1_2026_09_11`.

Canonical shorthand:

> **The debrief rewards the Chronicle that actually happened. It does not convert the Chronicle into one hidden score.**

---

## 2. Hard separation: action-time development vs debrief reward

There are two non-collapsed reward/development layers.

### Layer A — occurrence-time development / evidence

When an exact committed specialist action legitimately exercises an already-authorised Skill/proficiency/development route, the owning system may commit its authorised consequence at the action/occurrence boundary.

For Special Jōnin development:

- no `specializationXP` ledger exists for Alpha;
- qualifying specialist work may create exact provenance-bearing qualification evidence under the existing 11-family / 33-path model;
- broad labels such as `Contain`, `Protect`, `Stabilise`, `Track`, `Interrogate` or `Seal` are not universal specialization IDs;
- participant attribution and `sourceOccurrenceId` provenance are mandatory;
- save/load/retry may not duplicate the evidence.

For other Skill/proficiency development, this World reward contract creates no new XP ledger. Development occurs only where the owning domain already authorises that exact learning-by-doing consequence.

### Layer B — Mission / Arc debrief reward

A later debrief may acknowledge the overall mission/Arc history and issue material/economic/recognition entitlements.

The debrief must **not** recommit Layer-A development/evidence.

Preserve:

> **action-time development != debrief reward**
>
> **debrief acknowledgement != second copy of development**

---

## 3. Reusable evaluator identity

Recommended semantic evaluator:

`sc.rewardEvaluation.v1`

Recommended committed output:

`sc.rewardEntitlementSnapshot.v1`

Equivalent runtime naming is permitted if semantics remain exact.

### Minimum evaluator inputs

A Mission/Arc reward evaluation consumes only committed authoritative facts available for the evaluated scope, including where present:

- source Mission / Arc IDs and completion/closure state;
- exact Battle results for Battles the protagonist actually entered;
- objective results independent from Battle results;
- captures / kills / releases / escapes / withdrawals / custody facts;
- evidence and object custody results;
- Knowledge/evidence/provenance acquired or lost;
- optional discovery / investigation facts;
- participant-specific committed specialist actions;
- authorised action-time development/evidence receipts, as **read-only historical facts**;
- non-combat resolutions;
- protected / lost / rescued / abandoned participant/objective facts;
- team/participant survival and factual performance where authorised;
- dangerous/unusual committed route history;
- mission-specific exceptional outcomes;
- exact prior material reward entitlements already granted inside the evaluated scope.

The evaluator must not infer facts from UI presentation, flavour text, card art, current Rank, current PL, or expected/canon history.

---

## 4. No universal performance score

The project does **not** author a hidden morality/performance number such as:

`ArcScore = battlesWon + captures - deaths + goodChoices`

That collapses materially different histories into one ladder and turns decision-sensitive rewards into `more points = better person`.

Instead the evaluator derives **factual reward signals**.

Reusable signal families include:

- `FIELD_RELIABILITY` — the Character repeatedly carried required field pressure through to closure;
- `EXCEPTIONAL_BATTLE_RECORD` — exact Battle history supports an exceptional combat-performance acknowledgement;
- `ADAPTIVE_RECOVERY` — losses/withdrawals/partial failures occurred, but the Character preserved meaningful objectives/evidence/people/history and continued the Arc;
- `INVESTIGATION_DEPTH` — multiple distinct committed discoveries/evidence/provenance results materially deepened the factual investigation;
- `EVIDENCE_CUSTODY` — difficult evidence/object custody was legitimately preserved, transferred, surrendered, lost or protected in a way that materially affected the Chronicle;
- `LIVE_CUSTODY / PROTECTION` — living targets, witnesses, civilians, teammates or other protected persons were legitimately preserved/captured/extracted where the occurrence made that meaningful;
- `SPECIALIST_APPLICATION` — exact specialist capabilities materially changed factual outcomes; this signal acknowledges the route but does not grant Skill/Rank development itself;
- `NONCOMBAT_RESOLUTION` — significant pressure was resolved without Battle where the factual situation genuinely allowed it;
- `RESOURCE / PROVENANCE_RECOVERY` — legitimate material/object provenance was preserved/recovered under exact custody rules;
- `MISSION_SPECIFIC_EXCEPTIONAL` — an exact Story/World contract marks an outcome exceptional without making it universally superior.

These are authoring/evaluation semantics, not personality or morality labels.

---

## 5. Evaluation order

The reusable Mission/Arc debrief order is:

1. **Resolve source scope** — identify the exact Mission/Arc occurrence/history envelope being evaluated.
2. **Read committed facts** — no re-resolution, no generated replacement history.
3. **Subtract already-granted material entitlements** — debrief must not accidentally duplicate earlier one-shot rewards from the same source facts.
4. **Read action-time development/evidence receipts** for acknowledgement only; do not recommit them.
5. **Derive factual reward signals**.
6. **Build the eligible reward component set** from authored package rules.
7. **Commit one immutable entitlement snapshot** for this debrief occurrence.
8. **Grant each material entitlement at most once**.
9. **Project acknowledgement/presentation** from the committed snapshot.

UI reopen, save/load, dialogue replay, Story recall and debrief-panel reopen are presentation boundaries only.

---

## 6. Mission-level material reward rule

There is no universal `mission success = X Ryō` formula.

Each Story mission/formal mission/event may author:

- no material payment;
- contractual payment;
- partial payment;
- reimbursement;
- retained recovered property where custody permits;
- an item/material/equipment entitlement;
- a debrief-performance component;
- non-material value only.

A failed or partial mission may therefore produce more Knowledge/development/future opportunity value than a clean success while receiving different or no material pay.

Preserve:

> **failure may reward differently, not universally less in every dimension**

---

## 7. Debrief component model

For an Arc-scale performance debrief, use three bounded layers rather than unlimited stacking.

### A. Arc completion base

An authored Arc may define one base contractual/completion acknowledgement.

### B. Performance component — maximum one

Choose at most one of:

- `EXCEPTIONAL_BATTLE_RECORD`;
- `ADAPTIVE_RECOVERY`;
- ordinary `FIELD_RELIABILITY` fallback.

This prevents a Character from being paid three times for mutually overlapping descriptions of the same operational history.

### C. Method/history component — maximum one

Choose at most one of:

- `INVESTIGATION_DEPTH / EVIDENCE_CUSTODY`;
- `SPECIALIST_APPLICATION`;
- `LIVE_CUSTODY / PROTECTION`;
- `NONCOMBAT_RESOLUTION`;
- another exact Arc-specific method component.

If several method components qualify, choose the component supported by the greatest number of **distinct material source occurrences**. If tied, use the Arc's fixed tie order. Do not reroll.

A debrief may acknowledge additional facts in dialogue/Record history without paying extra stacked material bundles for every tag.

---

## 8. Item/material pool boundary

World/Rewards may define reward-pool purpose and entitlement rules, but must not invent Item/Weapon mechanical definitions owned by Combat / Skills / Items / Weapons.

For Alpha, a reward component that refers to equipment/consumables/materials must resolve only against an already-authorised **Alpha-active** item/equipment entry.

If no legally grantable entry exists at runtime, use the exact Ryō fallback specified by the package rather than fabricate an Item.

No reroll occurs merely because the available catalogue later changes; once an entitlement snapshot is committed, its resolved item or fallback remains fixed.

---

# PART II — ARC 1 COMPLETION DEBRIEF CALIBRATION

## 9. Evaluator

Arc 1 debrief evaluator:

`reward_eval_arc1_completion_debrief_v1`

Recommended entitlement key:

`reward_entitlement_arc1_completion_debrief_v1::<chronicleRef>`

Source history envelope:

- current Arc-1 Missions 1–12 committed Chronicle history;
- exact Battle returns;
- exact Story/World occurrence facts;
- exact action-time development/evidence already committed by owning systems.

The debrief is surfaced by Arc 2 Mission 1 according to Writing authority.

### Eligibility

Eligible only when:

1. Arc 1 is factually completed for the current Chronicle;
2. the Arc-1 completion reward entitlement has not already been committed for that Chronicle;
3. the Arc-2 debrief caller is legitimate.

The debrief does not need every optional Arc-1 thread to be resolved.

---

## 10. Arc 1 base material acknowledgement

**Base Arc-1 completion grant: 1,200 Ryō.**

This is a one-shot Arc-scale acknowledgement, intentionally larger than routine Konoha Alpha assistance rewards currently calibrated around roughly 100–220 Ryō per small occurrence.

This base grant does not retroactively replace or duplicate any exact material entitlement already granted by a Mission/World occurrence.

---

## 11. Arc 1 performance component — maximum one

### `ARC1_PERF_EXCEPTIONAL_BATTLE_RECORD`

Eligible when the committed Arc-1 Battle history establishes that the protagonist resolved **every Battle they actually entered** without a protagonist Battle defeat or withdrawal result, and the history contains at least one materially dangerous Story Battle rather than an empty/no-Battle Arc.

This is factual Battle-record recognition only; it does not imply perfect mission outcomes, zero casualties, moral superiority or formal Rank readiness.

Reward:

- one entitlement from `reward_pool_alpha_high_quality_equipment_v1`, restricted to already-authorised Alpha-active equipment the Character can legally receive;
- if no legal pool entry exists at snapshot time: **+700 Ryō fallback**.

No direct PL/Stat/Skill/Rank gain.

### `ARC1_PERF_ADAPTIVE_RECOVERY`

Eligible when:

- one or more Arc-1 Battles/objectives ended in defeat, withdrawal, partial failure or materially adverse outcome;
- Arc 1 was nevertheless completed;
- at least one adverse occurrence also preserved a meaningful factual value such as a person, evidence, Knowledge, custody result, source lead, specialist work or future actionable chain.

Reward:

- **+400 Ryō**;
- one entitlement from `reward_pool_alpha_recovery_resupply_v1` if a legal Alpha-active entry exists;
- if the pool has no legal entry: **+200 Ryō fallback**.

This package is deliberately not a consolation-prize downgrade. It acknowledges a different Chronicle: recovery, preservation and continuation under adverse facts.

### `ARC1_PERF_FIELD_RELIABILITY`

Fallback where neither exceptional-battle nor adaptive-recovery package applies.

Reward:

- **+250 Ryō**.

---

## 12. Arc 1 method/history component — maximum one

The following components consume actual Arc-1 facts. They do not assume the explored developer-Menma route occurred on every Chronicle.

### `ARC1_METHOD_INVESTIGATION_EVIDENCE`

Typical qualifying facts may include distinct committed evidence/provenance/investigation results across the warehouse/ledger, hospital reference material, Barrier/Third Bell/archive recognition chain, sanitisation/Moroboshi/Kagawa evidence, Recall observations, transfer facility, Sazan/programme evidence or other legitimate alternate-route discoveries.

Eligibility requires at least **four distinct material investigation/evidence source occurrences across at least three different Arc-1 missions**, with at least one source preserved/confirmed beyond a single uncorroborated testimony.

Reward:

- **+300 Ryō**;
- one entitlement from `reward_pool_alpha_investigation_utility_v1` if legal;
- otherwise **+200 Ryō fallback**.

Knowledge already learned during the Arc is not re-awarded by the debrief.

### `ARC1_METHOD_SPECIALIST_APPLICATION`

Eligible when at least **three distinct committed Arc-1 source occurrences** show the protagonist materially applying one or more already-authorised specialist capabilities to change a factual result, and at least one of those applications occurs outside ordinary direct Battle damage.

Current Menma examples may include legitimate Fūinjutsu/Kinjutsu/Identity-Rebinding/Recognition-Substitution/Echo-route work where the exact Chronicle actually contains those facts. Alternate Origin Characters may qualify through different specialist routes; this is not a Menma-only universal template.

Reward:

- **+250 Ryō**;
- one entitlement from `reward_pool_alpha_technical_materials_v1` if a legal Alpha-active material exists;
- otherwise **+200 Ryō fallback**.

This component grants **no Skill EXP, no Specialisation XP, no technique, no Special Jōnin evidence and no mastery**. Any qualifying action-time development/evidence has already been handled by its owner.

### `ARC1_METHOD_LIVE_CUSTODY_PROTECTION`

Eligible when at least **two distinct material Arc-1 occurrences** establish meaningful living-person/objective preservation, live capture/extraction, witness protection, protected custody or equivalent factual results where lethal/destructive/loss outcomes were genuinely possible.

Reward:

- **+250 Ryō**;
- one entitlement from `reward_pool_alpha_medical_containment_resupply_v1` if legal;
- otherwise **+200 Ryō fallback**.

Capture is not morally scored as superior to kill/release. This package exists only when the Chronicle repeatedly created this factual operational pattern.

### `ARC1_METHOD_NONCOMBAT_RESOLUTION`

Eligible when at least **two material Arc-1 pressure points** that could legitimately have escalated to hostile confrontation were instead factually resolved through authorised non-combat means, without merely skipping content or counting unavailable Battles.

Reward:

- **+300 Ryō**;
- one entitlement from `reward_pool_alpha_field_utility_v1` if legal;
- otherwise **+150 Ryō fallback**.

### No method package

If no method/history component qualifies, no artificial replacement tag is created. The base + performance component remains the valid debrief reward.

---

## 13. Arc 1 deterministic tie order

Where more than one method/history component qualifies with the same number of distinct material supporting source occurrences, use this fixed order:

1. `ARC1_METHOD_INVESTIGATION_EVIDENCE`
2. `ARC1_METHOD_SPECIALIST_APPLICATION`
3. `ARC1_METHOD_LIVE_CUSTODY_PROTECTION`
4. `ARC1_METHOD_NONCOMBAT_RESOLUTION`

This is an implementation tie-break only, not a claim that one playstyle is better.

No randomness is used in Arc-1 debrief family selection.

---

## 14. Example Arc 1 package shapes

These are examples of the evaluator, not precommitted history.

### Undefeated investigator

- base: 1,200 Ryō;
- performance: high-quality equipment entitlement (or +700 fallback);
- method: +300 Ryō + investigation utility (or +200 fallback).

### Specialist-heavy run with mixed Battle outcomes

- base: 1,200 Ryō;
- performance: +400 Ryō + recovery resupply (or +200 fallback);
- method: +250 Ryō + technical materials (or +200 fallback).

### Protection/custody-oriented field run

- base: 1,200 Ryō;
- performance: +250 Ryō field reliability;
- method: +250 Ryō + medical/containment resupply (or +200 fallback).

### Clean ordinary completion without a qualifying method signature

- base: 1,200 Ryō;
- performance: +250 Ryō;
- no method package.

Different package shape does not mean hidden good/bad grading.

---

## 15. Debrief acknowledgement facts

Writing/CE may consume the committed reward snapshot plus the exact supporting Chronicle facts to author a concise debrief acknowledgement.

The snapshot may expose presentation-safe fields such as:

```text
evaluatorId
sourceArcRef
entitlementId
performanceComponentId
methodComponentId | null
supportingSourceOccurrenceRefs[]
materialEntitlements[]
ryoGranted
equipmentOrPackEntitlementRef | null
fallbackUsed
acknowledgementTags[]
```

`acknowledgementTags[]` are presentation aids derived from committed facts. They are not new World Truth and do not overwrite the underlying source occurrences.

---

## 16. Loss/failure/non-action treatment

The evaluator must preserve the existing doctrine:

- Battle loss != mission failure;
- Mission failure != zero value;
- a later loss does not erase action-time development/evidence;
- failure may still preserve Knowledge, relationships, evidence, access or future-event value;
- non-action/refusal/withdrawal may be factual Chronicle outcomes without moral penalty;
- a defeat/withdrawal can contribute to `ADAPTIVE_RECOVERY` only where something meaningful was actually preserved/created — mere participation is not enough.

The Arc-1 debrief therefore never says `one loss -> all exceptional history invalid` except for the exact narrow `EXCEPTIONAL_BATTLE_RECORD` component, whose definition is literally an undefeated Battle record.

A Character who lost Battles may receive a materially different and equally meaningful debrief package.

---

## 17. Anti-duplication / save-load

For the Arc-1 debrief:

- commit one `rewardEntitlementSnapshot` per Chronicle Arc-1 completion;
- the snapshot resolves all eligible component IDs and any item-vs-fallback decision once;
- grant Ryō/items once from that snapshot;
- dialogue replay reports the same snapshot;
- UI reopen reports the same snapshot;
- save/load preserves the same snapshot;
- Arc-2 Mission-1 replay must not grant a second copy;
- a New Game / separate Chronicle is a new provenance context and may earn its own entitlement.

---

## 18. Difficulty boundary

This reward evaluator does **not** globally multiply Mission/Arc rewards by difficulty unless an exact Reward contract says so.

Difficulty may be retained as provenance for achievements or exact authored reward families, but:

> **difficulty != Rank**
>
> **difficulty != automatic material multiplier**

The separate zero-Promotion full-Chronicle Achievement requirement recorded under the current Achievement authority may reuse the same one-shot entitlement/grant machinery later, but it remains a separate Achievement condition/evaluator and must not be collapsed into this Arc-1 mission/arc performance evaluator.

---

## 19. Ownership boundaries

World / Rewards owns:

- evaluator semantics;
- reward-signal/family selection;
- Ryō values;
- item/material/equipment entitlement purpose;
- occurrence/debrief entitlement timing;
- no-double-grant semantics.

Other owners retain:

- Combat: Battle facts and Item/Weapon mechanical definitions;
- Progression: Skill/proficiency development, Special Jōnin evidence persistence, development Access;
- Rank: qualification/Recognition/Promotion;
- Acquisition: ownership/recruitment semantics where relevant;
- Writing: debrief prose/scene execution and Story facts;
- Coding: implementation, persistence and tests;
- CE: reusable Chronicle semantics/collision reconciliation.

A reward component may use an owner-authorised Item. It may not invent that Item's mechanics.

---

## 20. Runtime status and downstream need

This document closes **World reward design** for #59.

It does not claim the reusable evaluator or Arc-1 debrief consumer is implemented.

A Coding consumer is required before Arc-2 Mission 1's dynamic Arc-1 debrief reward can be runtime-complete. That implementation should reuse existing occurrence/history/reward persistence rather than create a second reward-history system.

Current Arc-1 start-to-end runtime blockers remain higher implementation priority; this reward consumer may remain QUEUED until the Arc-2 Mission-1 runtime/debrief lane is activated.

---

## 21. Canonical shorthand

Preserve:

- mission completion != automatic Progression;
- Battle victory != mission result;
- Battle loss != mission failure;
- mission failure != zero reward/value;
- action-time development != debrief reward;
- Special Jōnin evidence != XP;
- reward evaluation consumes committed facts, not UI presentation;
- decision-sensitive reward != morality score;
- different history may produce different reward families, not merely more/less currency;
- item entitlement != invented Item mechanics;
- entitlement snapshot != UI reroll;
- debrief acknowledgement != duplicate grant;
- design closed != implemented != runtime validated != Golden GREEN.
