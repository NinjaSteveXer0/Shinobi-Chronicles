# Shinobi Chronicles — Special Jōnin Contextual Development Evidence Contract

**Date:** 2026-09-07  
**Status:** **PL / REGISTRY / RANK CLOSED — CONTEXTUAL SPECIALIST DEVELOPMENT USES EXISTING EVIDENCE ARCHITECTURE; NO PARALLEL XP CURRENCY**  
**Source issue:** GitHub issue #19

---

## 1. Decision

Story, Mission, World and Combat occurrences may contribute persistent Special Jōnin specialist development when a committed factual action genuinely demonstrates one of the closed Alpha qualification competencies.

For Alpha this development is represented by the **existing Special Jōnin qualification-evidence architecture**.

PL / Registry / Rank does **not** author a second numeric currency such as:

- `specializationXP`;
- `specializationLevel`;
- generic Interrogation XP;
- generic Assassination XP;
- generic Diplomacy XP;
- generic Medical XP;
- family-level XP bars that bypass qualification evidence.

The phrase **hidden specialization EXP** from Writing should therefore be interpreted as **persistent, potentially non-player-visible qualification evidence/progress**, not as a new Rank-owned XP ledger.

Preserve:

**qualification evidence ≠ XP currency**

**progress visibility ≠ progress ontology**

---

## 2. Existing Alpha evaluator remains authoritative

The closed Alpha Special Jōnin catalogue remains:

**11 families / 33 exact qualification paths**

Current generic evaluator policy remains unchanged:

- `requiredWeightedPoints: 12`;
- `minimumDistinctEvidenceRecords: 4`;
- `minimumEvidenceCategories: 2`;
- `minimumIndependentSources: 2`;
- `activityFamilyPointCapRatio: 0.50`;
- `requiresVerifiedSpecialistCapstone: true`;
- evidence significance normalized to **1–4**;
- no generic Stat/PL threshold (`capacityRequirements: []`).

The evaluator is already implemented and was consumed by Coding in the Post-899 integration lineage.

No new threshold or Rank ladder is created by this contract.

---

## 3. Exact qualification targeting — no generic family XP

Contextual evidence must target an exact closed qualification path and its exact namespaced tags.

Examples from issue #19 map as follows only when the factual action genuinely fits the path:

### Interrogation

Use exact qualification:

`intelligence.interrogator`

Relevant competency tags remain:

- `information_extraction`;
- `credibility_assessment`.

A conversation merely containing questions is not automatically Interrogator evidence.

### Assassination

Use exact qualification:

`covert_operations.assassin`

Relevant competency tags remain:

- `target_isolation`;
- `covert_execution`.

A kill, Battle victory or lethal choice is not automatically Assassin evidence.

### Diplomacy

There is no generic `diplomacyXP` authority.

The exact Alpha family is:

`diplomacy_and_negotiation`

with exact paths:

- `diplomacy_and_negotiation.shinobi_envoy`;
- `diplomacy_and_negotiation.conflict_mediator`;
- `diplomacy_and_negotiation.cultural_liaison`.

The committed occurrence must support one exact path rather than awarding generic family progress by convenience.

### Medical

There is no generic `medicalXP` authority.

The exact Alpha family is:

`medical_operations`

with exact paths:

- `medical_operations.field_medic`;
- `medical_operations.toxicologist`;
- `medical_operations.medical_nin_researcher`.

A medically themed scene does not automatically satisfy all three paths.

---

## 4. What makes contextual evidence legitimate

A player-facing Story choice, dialogue option, mission branch or Battle selection is **not itself evidence**.

Persistent specialist evidence may be created only after an authoritative committed occurrence establishes that the exact participant actually performed or resolved specialist-relevant work.

At minimum the evidence projection must preserve enough authority to identify:

- the exact participant / subject receiving evidence;
- the exact committed source occurrence;
- the exact qualification ID;
- exact namespaced specialist-work / competency / supporting tags factually demonstrated;
- existing evidence-category semantics;
- significance under the existing 1–4 normalization;
- independent-source provenance;
- activity-family provenance needed by the 50% cap;
- whether the occurrence was genuinely verified at `specialistLevel=true`;
- the exact qualification-specific capstone tag when and only when separately authorised.

Exact runtime field names remain implementation/Progression-owned. This contract owns the semantic boundary, not a replacement schema.

Preserve:

**choice ≠ action**

**action ≠ success**

**success ≠ specialist evidence automatically**

**specialist evidence ≠ capstone automatically**

---

## 5. Participant-specific development

Evidence is participant-owned.

If an autonomous teammate or other eligible shinobi independently performs a specialist-relevant action, their own development may receive evidence when the committed facts justify it.

Do not award the protagonist or whole team evidence merely because they were present.

Preserve:

**team presence ≠ participant contribution**

**shared occurrence ≠ shared evidence automatically**

**support ≠ identical competency**

A single occurrence may support more than one qualification only when the factual record independently justifies each exact qualification/tag projection. Family similarity alone never fans evidence out across sibling paths.

---

## 6. Anti-farming / provenance rules

Contextual specialist development must not be generated from arbitrary option repetition or UI interaction count.

The persistent unit is the authoritative resolved occurrence/evidence record, not the number of times a player clicked a semantically similar option.

Retry/save/load must reuse the same factual provenance and must not mint duplicate evidence for one committed occurrence.

Repeated legitimate specialist work across genuinely distinct occurrences may accumulate normally and is exactly what the evidence-based qualification architecture is designed to recognize.

Preserve:

**repetition of UI input ≠ repeated historical work**

**distinct committed occurrence ≠ duplicate retry**

---

## 7. Training / qualification / Recognition gates

There is no new universal training-session gate added by this contract.

Alpha qualification remains the existing evidence + diversity + independent-source + verified-capstone evaluation.

A path-specific authored training event may contribute legitimate evidence where its facts satisfy the path, but participation in training is not a universal substitute for the existing evaluator.

When evaluator requirements are satisfied, the exact character may earn a permanent Special Jōnin qualification record.

That still does **not** grant formal Special Jōnin rank.

Formal Recognition remains separately owned by Rank and may grant `chunin → special_jonin` only when:

1. the exact owned character has at least one permanently earned Alpha-production qualification;
2. current formal rank is `chunin`;
3. legitimate institutional authority commits `special_jonin_recognition` referencing the earned qualification/provenance;
4. no authored institutional block prevents Recognition.

If a qualification is earned below Chūnin, it remains a valid earned credential but does not bypass the formal-rank prerequisite.

If the character is already Jōnin or above, the qualification remains a credential and does not downgrade or rewrite formal Rank.

Preserve:

**evidence accumulation ≠ qualification automatically**

**qualification ≠ Recognition**

**Recognition ≠ automatic power gain**

**Rank ≠ Progression**

---

## 8. PL / Stats boundary

This contextual-development contract creates:

**NO direct PL gain**

**NO automatic Stat gain**

**NO new Base-PL calibration**

The current Alpha Special Jōnin definitions contain no direct Stat/PL thresholds.

If a future qualification deliberately adds an exact safety/capacity prerequisite, that separate Stat-facing requirement must return to PL / Registry / Rank before implementation.

Preserve:

**development evidence ≠ Stat development**

**qualification ≠ PL**

**formal Rank ≠ PL**

---

## 9. Broader non-loot reward boundary

Issue #19 correctly notes that Story/Mission outcomes may produce non-loot consequences such as Chronicle history, Knowledge, relationships, access, evidence, reputation/recognition and progression state.

PL / Registry / Rank does not collapse those domains into Special Jōnin evidence.

A non-loot reward becomes Special Jōnin qualification evidence only when the committed occurrence satisfies the exact specialist-evidence contract above.

Preserve:

**non-loot reward ≠ Special Jōnin evidence automatically**

**relationship/history/Knowledge ≠ qualification points by default**

---

## 10. Ownership boundary after this closure

PL / Registry / Rank now considers issue #19's Rank-side question **CLOSED**.

Current authority is:

- exact Alpha catalogue: **11 families / 33 paths — unchanged**;
- existing evaluator thresholds: **unchanged**;
- new specialization-XP currency: **REJECTED / NOT REQUIRED**;
- contextual specialist development: **existing qualification evidence**;
- formal Recognition contract: **unchanged**;
- new PL numeric work: **NONE**.

Persistent producer-side projection from Story/Mission/World/Combat occurrences into qualification evidence belongs to **Progression / Development** under the current specialist boundaries.

A queued downstream handoff may define those producer rules without reopening Rank/PL semantics.

> **Story choices may matter toward Special Jōnin development, but they do so by creating legitimate specialist evidence from committed history — not by filling a hidden generic XP bar.**
