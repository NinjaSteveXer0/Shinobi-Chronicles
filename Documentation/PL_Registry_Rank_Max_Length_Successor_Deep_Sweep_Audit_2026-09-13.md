# Shinobi Chronicles — PL / Registry / Rank Max-Length Successor Deep-Sweep Audit

**Date:** 2026-09-13  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING SUCCESSOR RECONCILIATION / CURRENT PL-REGISTRY-RANK INDEX**  
**Audit baseline `main`:** `9d23ef765b547c25b3b85ce7af5a4561d6a14669` — `coding: bridge Promotion roster resume to Current Journey`  
**Autonomous execution authority:** `Documentation/Coordination/Autonomous Alpha Specialist Execution Mode 2026-09-13.md` (`f36b4daab22d6def73338eba13b388ace57dc47c`)  
**Protocol issue:** #147

This document is the durable succession layer for the max-length PL / Registry / Rank workspace. It does not erase historical documents. It states which historical checkpoints remain semantically binding, which fields/counts are superseded, what current source proves, what was reconstructed archaeologically, and what is still owned elsewhere.

## Binding supersession note

`Documentation/PL_Registry_Rank_Alpha_Authority.md` remains foundational semantic authority where not superseded, but its **85 Characters + 17 Entities = 102** production-cardinality checkpoint is historical. Current live production authority is **97 Characters + 18 Entities = 115**, ratified after Teen Nagato retirement by:

- `Documentation/Registry/Teen Nagato Retirement and Live 115 Cardinality Ratification 2026-09-11.md`
- authority commit `6d1c9eefc5f592eff9cde0d7f56b5bdb9bef1251`
- closed issue #103.

Likewise, section 8's older exact-Jōnin-only leader wording is superseded by:

- `Documentation/Rank/Genin Leader Teacher Rank Eligibility Reconciliation 2026-09-10.md`

so the current leader/teacher source-rank set is exactly `{jonin, special_jonin}`, with Special Jōnin remaining a distinct formal Rank.

Do not use older 102/116 constants, exact-Jōnin-only leader shorthand, or Teen Nagato live status as current authority.

---

## 1. Repository HEAD inspected

Audit baseline inspected before this writeback:

`9d23ef765b547c25b3b85ce7af5a4561d6a14669`

The HEAD traversal bridge changes navigation only and explicitly does not redefine candidate, ownership, assignment, Promotion, Mission, Story, World, or Battle authority.

Current monolithic production source remains `game.js` plus additive runtime/QA scripts. The authenticated GitHub connector could inspect the current `game.js` blob identity/metadata but could not return/search the full ~3.5 MB body. Current-source claims below therefore distinguish direct-current-source evidence from archaeological source reconstruction.

## 2. Authority files consumed

Primary/current durable authority consumed:

- `Documentation/PL_Registry_Rank_Alpha_Authority.md`
- `Documentation/PL_Registry_Rank_Post872_Reconciliation.md`
- `Documentation/Registry/Teen Nagato Retirement and Live 115 Cardinality Ratification 2026-09-11.md`
- `Documentation/Registry/Final 116 Admission Audit and Coding Handoff.md`
- `Documentation/Registry/Entity Ontology and Collectible Card Folder Reconciliation.md`
- `Documentation/Rank/Special Jonin Alpha Catalogue Closure.md`
- `Documentation/Rank/Genin Leader Teacher Rank Eligibility Reconciliation 2026-09-10.md`
- `Documentation/Rank/Promotion Difficulty Boundary Academy to Genin Exception 2026-09-11.md`
- `Documentation/Coordination/Menma Multiple Hosted Entity and Echo Arc 1 Contract 2026-09-09.md`
- `Documentation/Combat/SC_Combat_Bloodline_Contextual_Capability_Surface_2026-09-12.md`
- `Documentation/Coordination/Specialist_GitHub_Handoff_Protocol.md`
- `Documentation/Coordination/Autonomous Alpha Specialist Execution Mode 2026-09-13.md`
- `Documentation/Registry/One-Tailed Chakra Cloak Menma Registry and PL Calibration 2026-09-13.md`
- `Documentation/Registry/Arc 2 ROOT Woman Persistent Identity and PL Ratification 2026-09-13.md`
- `Documentation/Registry/Arc 2 Kusa Broker and Routekeeper Persistent Contact Registry Admission 2026-09-13.md`
- `Documentation/Implementation/Coding Runtime Final Pre-Alpha Deep-Sweep Archive Audit 2026-09-12.md`
- current `tools/qa_battle_portraits.py`
- current issue traffic including #16, #23, #103, #124, #134, #147, #152.

Historical-path correction: the retired handoff named `Documentation/Codex.md` and `Documentation/Development_Plan.md`, but those literal paths are not current repository files. `Documentation/Chronicle_Engine_Bible.md` is explicitly an early historical skeleton, and `Documentation/Development_Milestones.md` is an early milestone log; neither is silently promoted into a one-for-one replacement. Current authority is distributed across the durable files above.

## 3. Live Character count

**LIVE PRODUCTION CHARACTERS: 97**

This is current collectible/production cardinality, not the total universe of all persistent human Registry-addressable people.

Proof chain:

1. historical 102 gate = 85 Characters + 17 Entities;
2. Final-116 admission = +13 Characters +1 Entity → 98 +18 =116;
3. intentional retirement of `teen_nagato` = -1 Character;
4. current authority/runtime/portrait QA = **97 Characters**;
5. September 13 persistent Story contacts and staged representations explicitly do not increment live production cardinality.

## 4. Live Entity count

**LIVE PRODUCTION ENTITIES: 18**

Entity is the parent ontology; Summon is only one lifecycle/classification beneath it. Current production includes Summons, Familiar, Constructs, Forced Manifestation, Hosted Entity and Tailed Beast representations under explicit authority.

## 5. Total Registry production count

**LIVE PRODUCTION TOTAL: 115**

`97 Characters + 18 Entities = 115`.

Important scope distinction:

- production/live collectible Registry cardinality = 115;
- persistent Story/World person identity universe is broader;
- Enemy/Opposition persistent addressability is broader;
- staged/calibrated-but-not-live representations are broader;
- Registry identity does not imply collectible ownership or live-production admission.

Post-115 examples that **do not** increment 115:
- `one_tailed_chakra_cloak_menma` — calibrated staged representation, live admission NO;
- `arc2_root_woman_01` — persistent opposition addressability, not live collectible;
- `story_actor_kusa_broker_01` / `story_actor_kusa_routekeeper_01` — persistent non-collectible Story/World contacts.

## 6. Exact PL formula

Canonical Formula v1.0:

```text
round(
  0.60 × highest Stat
+ 0.25 × average(top 3 Stats)
+ 0.15 × average(all 7 Stats)
)
```

Final rounding is nearest integer at the published PL boundary. Current/recovered production Base Stats are integer-authored; weighted/average intermediates are fractional.

No direct/hidden Base PL bonuses are authorised.

## 7. Exact Stat model

Canonical seven Stats / machine order:

1. Ninjutsu — `nin`
2. Taijutsu — `tai`
3. Bukijutsu — `buki`
4. Fūinjutsu — `fuin`
5. Kinjutsu — `kin`
6. Genjutsu — `gen`
7. Stamina — `stamina`

Stats are not hard-capped. PL has no hard cap.

**Stamina current semantic lock:** mitigation/defensive envelope; it is not a second Battle-capacity scaler.

Bloodline, equipment, Summon, transformation, title, Rank, appointment, rarity and reputation do not manufacture hidden eighth Stats or hidden Base-PL bonuses.

## 8. Base / Developed / Effective / Battle boundaries

Current separation:

- **Base Stats / Base PL** — canonical baseline of the exact authored representation.
- **Developed / Current state** — permanent legitimate development of the persistent participant; PL derives from legitimate developed state rather than an independent hidden PL currency.
- **Effective state** — contextual/source-owned Stat projection from legitimate equipment, Bloodline, transformation, Summon/relationship or other authorised sources.
- **Battle/runtime state** — encounter operational capacity/depletion/control and temporary encounter effects. Battle PL is not health and Battle depletion is not permanent Base loss.

Removal/expiry of a source removes that source-owned temporary projection. Legitimate persistent development remains.

## 9. Complete current calibration ledger / authoritative pointer

Authoritative runtime pointers:
- `game.js` → `characterRegistry`, `entityRegistry`, `ALPHA_PRODUCTION_CHARACTER_IDS`, `ALPHA_PRODUCTION_ENTITY_IDS`;
- current production-cardinality/portrait projection gate → `tools/qa_battle_portraits.py`;
- durable atomic admissions/retirements → Registry documents above.

Because current `game.js` is too large for the connector to return as text, this audit reconstructed the 115 live PL ledger from:
- exact recoverable Post-949 source snapshot (85 production Characters +17 production Entities);
- exact Final-116 admission rows (+13 Characters + Nue);
- exact Teen Nagato retirement (-1 Character);
- current 97/18/115 source/QA diagnostics.

Result:
- old production Characters checked: **85/85 formula exact** before retirement;
- Final-116 added Characters: **13/13 formula exact**;
- current reconstructed live Characters: **97/97 zero known Stats↔Base-PL mismatches**;
- old production Entities: **17/17 formula exact**;
- `nue`: derived PL100, exact;
- current reconstructed live Entities: **18/18 zero known formula mismatches**.

No current evidence of a live Stats↔Base-PL inconsistency was found.

Full reconstructed current-live Character and Entity ledgers are Appendix A/B.

## 10. Registry identity findings

Current non-collapse:

**Registry identity != ownership != assignment != deployment.**

**Registry identity != representation.**

One persistent person may have multiple representations. A transformation/stage/card does not mint a new person unless explicit Registry authority says so.

Findings:
- Teen Nagato is retired/dormant and absent from current production IDs.
- One-Tailed Cloak Menma is the same persistent Menma person, not a second person.
- Echo Menma / Cipher Menma / Base Genin Menma are representation/state distinctions of the same Menma person under their exact contracts.
- ROOT Woman has one stable persistent person address; formal Rank remains deliberately null.
- Grass Broker and Grass Routekeeper are persistent human Characters/contacts with no invented PL.
- occurrence-local M12 surrendered operator remains occurrence-local until future recurrence requires persistent identity.
- Entity identity is not created merely to record an event; Chronicle is what happened, Entity/Character is what something is.

No duplicate current-live production stable ID was found in the reconstructed/current gate chain.

## 11. Rank taxonomy

Current live Alpha `formalRank` values proven by the reconstructed 97-Character ledger are exactly:

- `academy`
- `genin`
- `chunin`
- `special_jonin`
- `jonin`
- `null` where no separate formal Rank is authorised.

Current reconstructed distribution:
- Academy: 10
- Genin: 12
- Chūnin: 10
- Special Jōnin: 6
- Jōnin: 5
- null/unset: 54

Do not promote presentation categories/titles/offices into formal Rank:

- **Special Jōnin** = distinct formal Rank.
- **ANBU** = role/service/representation/assignment semantics; current live source rows do not use `anbu` as formalRank merely because a card is ANBU.
- **Sannin** = title/representation category, not automatic formal Rank.
- **Kage** = office/title/representation category, not automatic formal Rank.
- ROOT/Foundation/mission role = affiliation/role, not formal Rank proof.
- card title = presentation, not formal Rank truth.

Difficulty ordering is not formal Rank topology.

## 12. Promotion semantics

Academy → Genin current authority:

- exact authored opening/prologue prerequisites may gate availability;
- **difficulty-based grind/readiness may not** gate this first Promotion route;
- no difficulty-specific PL, Stat, EXP, training-count, mission-count, mastery, hidden readiness or free-play-duration gate;
- availability != automatic Promotion;
- entry is voluntary;
- existing Field Readiness assessment pass/fail contract remains;
- Battle victory != Promotion result;
- Promotion mutates only the exact subject's formal Rank on success;
- Promotion grants no automatic PL/Stat increase;
- Promotion does not automatically swap Registry representation;
- Promotion unlocks, but is distinct from, the separate Genin roster transition.

Later Promotions may be difficulty-aware only under separately authored exact Rank authority.

## 13. Representation-vs-Rank rules

Hard current boundary:

**representation != formal Rank != team role != mission role != office != capability != observer Knowledge.**

Examples:
- an Academy representation may persist while the owned participant's formal Rank develops.
- One-Tailed Menma transformation grants no Rank; it projects the persistent Menma participant's legitimate current formal Rank.
- a Kage/Sannin/ANBU card label does not fabricate persistent Rank, clearance, command authority or Promotion history.
- higher-capability representation does not automatically command Story party or solve Story.
- physical art does not admit Registry state.

## 14. Hosted Entity findings

Binding current semantics:
- host Character != Hosted Entity;
- one host may host multiple separately-authored Hosted Entities;
- shared host != merged identity;
- attachment != ownership/mastery/access;
- visible manifestation != independent Battle participant by default;
- Hosted Entity does not automatically get a second team slot, recurring turn, or additive host PL ledger;
- Hosted Entity Stats/PL do not transfer wholesale to host;
- co-hosting != additive PL.

Menma may host Kurama + Arc 1 Echo simultaneously where separately established. Temporary Kurama loan remains occurrence-owned unless later progression authority establishes repeatable access.

## 15. Bloodline / transformation PL findings

Current Bloodline authority is capability-specific:

**possession != Access != Competence != Power != Mastery.**

- clan identity/card art/future canon capability does not activate a Bloodline;
- exact active/stage state is required where mechanics depend on stage;
- Stats != Bloodline Skills;
- temporary Bloodline/contextual effects do not mutate canonical Base by implication;
- no universal hidden Bloodline PL bonus is authorised.

The older historical “one active Bloodline at a time” baseline was **not located as a current universal binding Alpha rule** in the consumed current Bloodline contract. Do not promote it into current authority. Simultaneous/combined use requires exact separate capability/state authority.

Transformation rule:
- a dedicated representation may have its own authored Base package;
- an occurrence/runtime transformation may instead be source-owned Effective/Battle state;
- never apply the same transformation package twice.

One-Tailed Cloak Menma is a dedicated Base representation at PL66; therefore do not also add Kurama/Echo PL or a generic cloak +Stats package on top of it.

## 16. Team / duo findings

Preserve:
- underlying person identity reservation prevents the same person appearing twice via two representations.
- team slot, ownership, assignment and deployment remain separate.
- no combined duo Base-PL formula is authorised by default.
- `sj_kiba` is an authorised integrated Kiba + Akamaru one-slot Character representation; Akamaru does not receive a second additive PL ledger merely from the integrated package.
- Hosted Entity manifestation does not create an extra team slot by default.
- Genin leader/teacher source Rank set = `{jonin, special_jonin}`, but Rank alone is insufficient eligibility.

## 17. Downstream consumer drift

Confirmed current status:

- **Coding/runtime cardinality:** current QA consumes 97/18/115; stale 116 constants were superseded.
- **Portrait physical QA:** current live-115 physical QA is GREEN (115/115); Teen Nagato absent.
- **Portrait browser/runtime resolver:** issue #16 remains open for Coding's browser/runtime resolver proof; this is validation-only, not Registry design uncertainty.
- **Special Jōnin contextual evidence producer:** issue #23 remains queued to Coding; evaluator/catalogue authority itself is closed.
- **Current HEAD traversal bridge:** preserves Promotion/ownership/assignment/Story/World/Battle boundaries; no semantic collapse found.
- **Arc 2 CE parents #124/#152:** PL-owned slices are already closed; parent issues remain open for other owners and must not be closed by PL.
- **Current code/search limitation:** no full direct textual inspection of current 3.5 MB `game.js` was possible through the connector. Current count/manifest QA and prior exact source lineage were used rather than guessing.

No confirmed current source violation requiring a new PL→downstream SEND NOW issue was found during this audit.

## 18. Open issue traffic classification

- **#147** — 🔴 ACTIVE / protocol consumed. Autonomous Alpha Specialist Execution Mode.
- **#134** — 🟠 QUEUED / required before next relevant canon-derived production task. Canon Research First.
- **#16** — VALIDATION ONLY / Coding-owned. Live-115 browser/runtime portrait resolver proof remains.
- **#23** — 🟠 QUEUED / Coding-owned. Contextual Special Jōnin evidence producer projection; not a current PL authority blocker.
- **#124** — 🟢 RECORD ONLY from PL perspective. One-Tailed Menma + ROOT Woman PL/Registry slices closed; broader CE/Acquisition/Visual work remains.
- **#152** — 🟢 RECORD ONLY from PL perspective. Kusa persistent-contact Registry slice closed; broader World/runtime coordination remains.
- **#103** — COMPLETE / CLOSED. Live 115 cardinality ratified.
- **#45** — COMPLETE / CLOSED. Current live-115 physical portrait QA returned GREEN.

No open direct PL-REGISTRY-RANK handoff requiring an unperformed owned action was found.

## 19. Fixes committed during audit

This successor audit itself is the required durable stale-authority correction/index:

- it explicitly supersedes the 102 cardinality embedded in the old primary checkpoint;
- preserves Final-116 row provenance without resurrecting 116;
- records the current 115 baseline;
- records current leader source-Rank supersession;
- records current formal-Rank taxonomy;
- preserves the historical-vs-current formula supersession chain;
- records protected gaps rather than inventing missing history.

No code mutation was made because no exact current PL-owned source defect was proven from current authority.

## 20. Superseded historical assumptions

Never resurrect as current authority:

- 85 +17 =102 as current production cardinality;
- 98 +18 =116 after Teen Nagato retirement;
- Teen Nagato as current-live production Character;
- exact-Jōnin-only Genin leader source;
- Special Jōnin 13-family/39-path Alpha production requirement;
- Battle-entry random ±10% PL;
- elite ×1.25;
- groupBoss ×8;
- guardBoss ×50;
- direct/hidden PL bonuses;
- title/rarity/appointment/Rank directly modifying PL;
- card title == formal Rank;
- Promotion == representation swap;
- Battle victory == Promotion;
- Academy→Genin difficulty grind gate;
- Hosted Entity PL added wholesale to host;
- transformation package both embodied in Base and re-applied as an Effective bonus;
- Bloodline latent/clan identity automatically creating active PL;
- old uncertainty that Formula v1.0 was not design-locked;
- old global “one active Bloodline at a time” notion unless a new exact current authority deliberately re-establishes it.

## 21. Protected recovery gaps

### A. Earliest deleted/max-length conversation wording
Some earliest historical sentences are not recoverable verbatim. This is a **PROTECTED RECOVERY GAP** only at transcript/genealogy level. Current architecture, IDs, semantics, supersession chain and Alpha production state are durably recoverable. Do not reconstruct lost wording.

### B. Historical Special Jōnin 13/39 tail
Two historical qualification families / six paths were not recovered. Current Alpha catalogue is explicitly closed at 11 families /33 paths. Missing 2/6 = genealogy only, not Alpha blocker. Do not invent replacements.

### C. Direct current `game.js` full-body row inspection
The authenticated connector could not return/search the current oversized `game.js` body. This audit therefore uses exact source archaeology + atomic admissions/retirement + current deterministic QA. This is a **tool-access proof gap**, not permission to guess. It does not currently expose an Alpha semantic mismatch.

### D. Universal beginner EXP curve
Historical PL workspace doctrine said starting Base PL does not place a Character on a later EXP curve. Current PL authority still preserves PL != Progression and no independent hidden PL EXP, but this audit did not locate a single current Progression document that re-ratifies the historical “universal beginner EXP curve” wording. Therefore PL does not re-author it. Exact EXP curve remains Progression-owned and is not inferred here.

## 22. Exact current blockers

**PL / Registry / Rank-owned Alpha blocker: NONE currently proven.**

Cross-system/live validation still present:
- #16 Coding browser/runtime portrait resolver proof.
- #23 Coding Special Jōnin evidence-producer projection when/where consumed.
- broader Arc 2 World/runtime/Acquisition/visual work under CE parent issues.

These are not permission for PL/Registry to invent missing downstream semantics.

## 23. Exact next PL / Registry / Rank execution order

1. Re-audit the retired workspace's old “physical cards with likely missing PL” tail against current GitHub authority; do not assume it remains open.
2. For any still-unadmitted representation, classify `asset only / calibrated / Registry-admitted / live / runtime-consumed` before changing anything.
3. Apply Canon Research First before any new canon-derived calibration (#134).
4. Continue consuming new Story/CE identity handoffs only where persistent identity or exact PL/Rank evidence is genuinely required.
5. Keep live 115 frozen until an explicit later production activation publishes a superseding cardinality.
6. Do not absorb Acquisition, Progression, Combat, Story, World or Assets ownership.

---

# Successor activation checkpoint

**CURRENT PL FORMULA**

`round(0.60×max +0.25×avg(top3) +0.15×avg(all7))`

**CURRENT STATS**

Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina.

**LIVE REGISTRY**

- Characters: **97**
- Entities: **18**
- Total: **115**

**CURRENT FORMAL RANK TAXONOMY**

Current live formalRank values: `academy`, `genin`, `chunin`, `special_jonin`, `jonin`, or null when no separate formal Rank is authorised. ANBU/Sannin/Kage/role/title/office are not silently promoted into formalRank.

**PROMOTION**

Academy→Genin becomes available after exact authored opening prerequisites without difficulty-grind gating; attempt remains voluntary; pass/fail follows the authored assessment contract; Promotion changes formal Rank only and is separate from roster-transition completion, representation swap and automatic development.

**BASE / DEVELOPED / EFFECTIVE / BATTLE**

Base canonical representation baseline → Developed permanent earned state → Effective contextual/source-owned Stat projection → Battle encounter operational state.

**CURRENT ACTIVE OWNED ISSUES**

None directly targeted to PL / Registry / Rank after #103 closure. #147/#134 are global protocols. PL slices in #124/#152 are complete.

**CURRENT BLOCKERS**

No proven PL-owned Alpha blocker. External current validation/implementation lanes remain as listed above.

**SUPERSEDED ASSUMPTIONS**

102 current count; 116 current count; Teen Nagato live; exact-Jōnin-only leader pool; old Battle PL multipliers; hidden/direct PL bonuses; title==Rank; Battle==Promotion; difficulty grind before first Promotion; Hosted PL addition; latent Bloodline PL.

**PROTECTED GAPS**

Lost historical wording; non-Alpha historical Special Jōnin 2-family/6-path tail; direct current oversized `game.js` full-body inspection; exact historical universal beginner-EXP wording not independently re-ratified by a current Progression document.

**NEXT ACTION**

Re-audit the stale eight-item physical-card PL tail against current durable Registry/asset authority, preserving `physical asset != Registry admission`.

---

# Archive verdict

## OLD PL / REGISTRY / RANK WORKSPACE ARCHIVE SAFE — successor continuity is fully durable

No unrecovered production-relevant decision has been identified that requires the retired chat to remain the sole authority. Protected gaps above are either genealogy-only, explicitly post-Alpha/non-blocking, owned by another system, or covered by current durable/source authority.

---

# Appendix A — reconstructed current-live Character PL ledger

Method: exact Post-949 production source rows + exact Final-116 Character admissions − retired `teen_nagato`. The `Derived` column recomputes Formula v1.0. `Δ=0` is required. Display-name text is not invented where the runtime row does not contain a canonical display-name field.

| ID | N | T | B | F | K | G | S | Stored | Derived | Δ | Formal Rank | Provenance |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| `academy_hinata` | 6 | 9 | 5 | 5 | 5 | 5 | 7 | 8 | 8 | 0 | `academy` | Post-949 source lineage |
| `academy_iwabee` | 14 | 11 | 13 | 6 | 5 | 5 | 14 | 13 | 13 | 0 | `academy` | Post-949 source lineage |
| `academy_izuno` | 10 | 9 | 6 | 5 | 6 | 5 | 8 | 9 | 9 | 0 | `academy` | Post-949 source lineage |
| `academy_kakashi` | 16 | 14 | 15 | 8 | 9 | 10 | 14 | 15 | 15 | 0 | `academy` | Post-949 source lineage |
| `academy_kurenai` | 9 | 7 | 8 | 6 | 5 | 14 | 8 | 12 | 12 | 0 | `academy` | Post-949 source lineage |
| `academy_kushina` | 8 | 9 | 5 | 8 | 5 | 5 | 14 | 12 | 12 | 0 | `academy` | Post-949 source lineage |
| `academy_menma` | 10 | 8 | 6 | 5 | 9 | 7 | 11 | 10 | 10 | 0 | `academy` | Post-949 source lineage |
| `academy_metal_lee` | 6 | 13 | 9 | 5 | 5 | 5 | 14 | 13 | 13 | 0 | `academy` | Post-949 source lineage |
| `academy_mirai` | 8 | 8 | 9 | 5 | 6 | 7 | 8 | 9 | 9 | 0 | `academy` | Post-949 source lineage |
| `academy_obito` | 11 | 12 | 10 | 5 | 5 | 6 | 13 | 12 | 12 | 0 | `academy` | Post-949 source lineage |
| `akatsuki_itachi` | 100 | 70 | 54 | 62 | 91 | 106 | 84 | 101 | 101 | 0 | `None` | Post-949 source lineage |
| `akatsuki_kakuzu` | 86 | 76 | 68 | 50 | 88 | 40 | 96 | 91 | 91 | 0 | `None` | Final-116 admission; survives 115 |
| `akatsuki_naruto` | 104 | 86 | 72 | 74 | 100 | 58 | 116 | 107 | 107 | 0 | `None` | Post-949 source lineage |
| `akatsuki_pain` | 116 | 72 | 68 | 104 | 120 | 106 | 112 | 117 | 117 | 0 | `None` | Post-949 source lineage |
| `akatsuki_sasuke` | 106 | 92 | 88 | 74 | 102 | 96 | 100 | 105 | 105 | 0 | `None` | Post-949 source lineage |
| `anbu_menma` | 68 | 74 | 66 | 52 | 70 | 56 | 78 | 74 | 74 | 0 | `None` | Post-949 source lineage |
| `anbu_naruto` | 72 | 78 | 64 | 48 | 70 | 44 | 82 | 77 | 77 | 0 | `None` | Post-949 source lineage |
| `anbu_sasuke` | 76 | 74 | 80 | 52 | 72 | 70 | 74 | 77 | 77 | 0 | `None` | Post-949 source lineage |
| `black_madara` | 126 | 114 | 104 | 100 | 132 | 118 | 126 | 127 | 127 | 0 | `None` | Post-949 source lineage |
| `black_sun_himawari` | 90 | 94 | 62 | 44 | 100 | 60 | 104 | 98 | 98 | 0 | `None` | Post-949 source lineage |
| `chunin_fugaku` | 38 | 34 | 32 | 20 | 26 | 35 | 36 | 37 | 37 | 0 | `chunin` | Final-116 admission; survives 115 |
| `chunin_iruka` | 32 | 30 | 31 | 26 | 18 | 27 | 34 | 33 | 33 | 0 | `chunin` | Final-116 admission; survives 115 |
| `chunin_itama` | 34 | 36 | 33 | 18 | 22 | 20 | 38 | 36 | 36 | 0 | `chunin` | Final-116 admission; survives 115 |
| `chunin_jiraiya` | 28 | 25 | 22 | 16 | 24 | 18 | 28 | 27 | 27 | 0 | `chunin` | Post-949 source lineage |
| `chunin_mitsuki` | 44 | 42 | 32 | 26 | 40 | 30 | 46 | 43 | 43 | 0 | `chunin` | Post-949 source lineage |
| `chunin_naruto` | 36 | 42 | 26 | 18 | 30 | 20 | 46 | 41 | 41 | 0 | `chunin` | Post-949 source lineage |
| `chunin_sasuke` | 42 | 38 | 44 | 20 | 36 | 38 | 40 | 42 | 42 | 0 | `chunin` | Post-949 source lineage |
| `chunin_shikamaru` | 28 | 26 | 22 | 20 | 22 | 42 | 30 | 36 | 36 | 0 | `chunin` | Post-949 source lineage |
| `chunin_shinki` | 44 | 36 | 46 | 24 | 42 | 22 | 48 | 45 | 45 | 0 | `chunin` | Post-949 source lineage |
| `curse_mark_hinata` | 90 | 104 | 62 | 44 | 106 | 70 | 114 | 106 | 106 | 0 | `None` | Post-949 source lineage |
| `curse_seal_anko` | 48 | 44 | 40 | 38 | 52 | 34 | 50 | 49 | 49 | 0 | `special_jonin` | Post-949 source lineage |
| `curse_seal_sasuke` | 78 | 72 | 70 | 42 | 82 | 62 | 78 | 79 | 79 | 0 | `genin` | Post-949 source lineage |
| `failed_god_madara` | 144 | 124 | 116 | 112 | 148 | 132 | 142 | 144 | 144 | 0 | `None` | Post-949 source lineage |
| `fallen_hokage_sasuke` | 122 | 106 | 108 | 96 | 124 | 116 | 118 | 121 | 121 | 0 | `None` | Post-949 source lineage |
| `genin_chocho` | 20 | 22 | 20 | 11 | 15 | 12 | 24 | 22 | 22 | 0 | `genin` | Post-949 source lineage |
| `genin_ho_ki` | 18 | 17 | 20 | 14 | 13 | 17 | 19 | 19 | 19 | 0 | `genin` | Post-949 source lineage |
| `genin_karin` | 26 | 18 | 16 | 18 | 24 | 22 | 28 | 26 | 26 | 0 | `genin` | Post-949 source lineage |
| `genin_mikoto` | 24 | 20 | 19 | 11 | 14 | 22 | 21 | 23 | 23 | 0 | `genin` | Final-116 admission; survives 115 |
| `genin_mitsuki` | 31 | 28 | 22 | 17 | 30 | 20 | 34 | 31 | 31 | 0 | `genin` | Post-949 source lineage |
| `genin_naruto` | 26 | 28 | 18 | 12 | 24 | 14 | 32 | 29 | 29 | 0 | `genin` | Post-949 source lineage |
| `genin_orochimaru` | 29 | 24 | 20 | 18 | 28 | 25 | 27 | 28 | 28 | 0 | `genin` | Final-116 admission; survives 115 |
| `genin_sasuke` | 28 | 26 | 30 | 13 | 24 | 24 | 27 | 29 | 29 | 0 | `genin` | Post-949 source lineage |
| `genin_sasuke_sharingan` | 32 | 29 | 34 | 14 | 29 | 32 | 30 | 33 | 33 | 0 | `genin` | Post-949 source lineage |
| `genin_sakura` | 24 | 20 | 18 | 15 | 22 | 24 | 21 | 23 | 23 | 0 | `genin` | Post-949 source lineage |
| `genin_menma` | 30 | 28 | 25 | 34 | 38 | 22 | 32 | 36 | 36 | 0 | `genin` | Post-949 source lineage |
| `hokage_itachi` | 114 | 92 | 78 | 82 | 110 | 122 | 106 | 117 | 117 | 0 | `None` | Post-949 source lineage |
| `hokage_kakashi` | 118 | 102 | 106 | 90 | 112 | 108 | 110 | 115 | 115 | 0 | `None` | Post-949 source lineage |
| `hokage_sarada` | 108 | 100 | 96 | 84 | 106 | 104 | 106 | 106 | 106 | 0 | `None` | Post-949 source lineage |
| `jinchuriki_naruto_v1` | 50 | 54 | 28 | 20 | 56 | 18 | 62 | 57 | 57 | 0 | `genin` | Post-949 source lineage |
| `jinchuriki_naruto_v2` | 64 | 70 | 34 | 22 | 74 | 20 | 82 | 75 | 75 | 0 | `genin` | Post-949 source lineage |
| `jonin_gaara` | 72 | 56 | 66 | 52 | 58 | 44 | 80 | 73 | 73 | 0 | `jonin` | Post-949 source lineage |
| `jonin_hanabi` | 60 | 78 | 52 | 38 | 44 | 50 | 72 | 72 | 72 | 0 | `jonin` | Post-949 source lineage |
| `jonin_konohamaru` | 74 | 68 | 64 | 42 | 56 | 48 | 76 | 72 | 72 | 0 | `jonin` | Post-949 source lineage |
| `jonin_sasuke` | 82 | 78 | 84 | 54 | 76 | 74 | 80 | 81 | 81 | 0 | `jonin` | Post-949 source lineage |
| `jonin_shino` | 64 | 58 | 54 | 44 | 60 | 52 | 70 | 65 | 65 | 0 | `jonin` | Post-949 source lineage |
| `kage_menma` | 126 | 116 | 96 | 110 | 128 | 104 | 132 | 128 | 128 | 0 | `None` | Post-949 source lineage |
| `kage_naruto` | 128 | 118 | 92 | 104 | 124 | 86 | 136 | 129 | 129 | 0 | `None` | Post-949 source lineage |
| `kurama_resonance_himawari` | 112 | 106 | 48 | 70 | 110 | 76 | 126 | 118 | 118 | 0 | `None` | Final-116 admission; survives 115 |
| `level_2_anko` | 66 | 62 | 54 | 50 | 72 | 46 | 68 | 69 | 69 | 0 | `special_jonin` | Post-949 source lineage |
| `menma_nine_tails` | 114 | 110 | 82 | 98 | 122 | 74 | 128 | 120 | 120 | 0 | `None` | Post-949 source lineage |
| `mizukage_aide_obito` | 76 | 72 | 68 | 58 | 70 | 66 | 74 | 74 | 74 | 0 | `None` | Post-949 source lineage |
| `sannin_hinata` | 96 | 118 | 62 | 70 | 48 | 82 | 108 | 110 | 110 | 0 | `None` | Final-116 admission; survives 115 |
| `sannin_jiraiya` | 104 | 92 | 78 | 76 | 98 | 70 | 108 | 103 | 103 | 0 | `None` | Post-949 source lineage |
| `sannin_sakura` | 86 | 94 | 72 | 68 | 88 | 80 | 100 | 94 | 94 | 0 | `None` | Post-949 source lineage |
| `sannin_shikamaru` | 76 | 70 | 64 | 60 | 68 | 104 | 78 | 92 | 92 | 0 | `None` | Post-949 source lineage |
| `sannin_sumire` | 90 | 72 | 66 | 82 | 96 | 80 | 90 | 93 | 93 | 0 | `None` | Final-116 admission; survives 115 |
| `sannin_tenten` | 68 | 62 | 94 | 70 | 74 | 44 | 80 | 88 | 88 | 0 | `None` | Final-116 admission; survives 115 |
| `serpent_successor_anko` | 72 | 66 | 56 | 52 | 78 | 48 | 74 | 75 | 75 | 0 | `special_jonin` | Post-949 source lineage |
| `shadow_of_indra` | 132 | 116 | 104 | 98 | 138 | 124 | 126 | 133 | 133 | 0 | `None` | Post-949 source lineage |
| `sj_anko` | 56 | 52 | 48 | 44 | 58 | 39 | 55 | 56 | 56 | 0 | `special_jonin` | Final-116 admission; survives 115 |
| `sj_genma` | 54 | 62 | 68 | 36 | 44 | 38 | 60 | 63 | 63 | 0 | `special_jonin` | Post-949 source lineage |
| `sj_ibiki` | 46 | 52 | 40 | 34 | 48 | 64 | 58 | 59 | 59 | 0 | `special_jonin` | Post-949 source lineage |
| `sj_kiba` | 50 | 66 | 52 | 20 | 34 | 22 | 70 | 64 | 64 | 0 | `special_jonin` | Final-116 admission; survives 115 |
| `sj_nono` | 52 | 34 | 31 | 58 | 44 | 40 | 55 | 55 | 55 | 0 | `special_jonin` | Final-116 admission; survives 115 |
| `six_tail_dominion` | 112 | 106 | 70 | 86 | 118 | 64 | 126 | 118 | 118 | 0 | `None` | Post-949 source lineage |
| `the_sixth_shadow` | 136 | 124 | 116 | 108 | 140 | 130 | 138 | 136 | 136 | 0 | `None` | Post-949 source lineage |
| `three_tail_dominion` | 92 | 88 | 62 | 72 | 98 | 56 | 108 | 99 | 99 | 0 | `None` | Post-949 source lineage |
| `undying_madara` | 118 | 108 | 102 | 94 | 120 | 112 | 120 | 117 | 117 | 0 | `None` | Post-949 source lineage |
| `baryon_mode_naruto` | 144 | 154 | 82 | 88 | 146 | 60 | 160 | 153 | 153 | 0 | `None` | Post-949 source lineage |
| `coercive_cloak` | 84 | 90 | 52 | 68 | 98 | 44 | 102 | 97 | 97 | 0 | `None` | Post-949 source lineage |
| `jinchuriki_sakura_chomei` | 106 | 96 | 74 | 72 | 104 | 82 | 114 | 107 | 107 | 0 | `None` | Post-949 source lineage |
| `jinchuriki_shikamaru_yang` | 94 | 82 | 68 | 72 | 88 | 108 | 100 | 101 | 101 | 0 | `None` | Post-949 source lineage |
| `jinchuriki_shikamaru_yin` | 88 | 76 | 64 | 78 | 100 | 114 | 94 | 104 | 104 | 0 | `None` | Post-949 source lineage |
| `jinchuriki_tobirama_shukaku` | 112 | 102 | 94 | 110 | 116 | 96 | 118 | 115 | 115 | 0 | `None` | Post-949 source lineage |
| `kage_madara` | 109 | 97 | 90 | 80 | 98 | 108 | 108 | 107 | 107 | 0 | `None` | Post-949 source lineage |
| `black_zetsu` | 58 | 36 | 14 | 62 | 95 | 50 | 90 | 86 | 86 | 0 | `None` | Post-949 source lineage |
| `reborn_kurama` | 110 | 84 | 30 | 48 | 118 | 76 | 116 | 112 | 112 | 0 | `None` | Post-949 source lineage |
| `pakkun` | 42 | 48 | 30 | 18 | 22 | 26 | 52 | 48 | 48 | 0 | `None` | Post-949 source lineage |
| `unknown_operative` | 58 | 66 | 54 | 38 | 46 | 56 | 62 | 63 | 63 | 0 | `None` | Post-949 source lineage |
| `academy_sasuke` | 12 | 10 | 11 | 5 | 8 | 9 | 10 | 11 | 11 | 0 | `academy` | Post-949 source lineage |
| `academy_naruto` | 11 | 12 | 8 | 5 | 9 | 5 | 14 | 12 | 12 | 0 | `academy` | Post-949 source lineage |
| `academy_sakura` | 10 | 8 | 7 | 5 | 6 | 9 | 8 | 9 | 9 | 0 | `academy` | Post-949 source lineage |
| `genin_gaara` | 40 | 34 | 38 | 22 | 32 | 20 | 44 | 41 | 41 | 0 | `genin` | Post-949 source lineage |
| `chunin_gaara` | 56 | 44 | 52 | 30 | 42 | 28 | 60 | 56 | 56 | 0 | `chunin` | Post-949 source lineage |
| `genin_himawari` | 24 | 20 | 18 | 12 | 22 | 18 | 26 | 24 | 24 | 0 | `genin` | Post-949 source lineage |
| `genin_shinki` | 32 | 28 | 34 | 18 | 30 | 16 | 36 | 33 | 33 | 0 | `genin` | Post-949 source lineage |
| `genin_hanabi` | 28 | 34 | 22 | 16 | 18 | 24 | 32 | 31 | 31 | 0 | `genin` | Post-949 source lineage |
| `chunin_hanabi` | 42 | 50 | 34 | 24 | 28 | 32 | 46 | 45 | 45 | 0 | `chunin` | Post-949 source lineage |
| `genin_konohamaru` | 30 | 28 | 26 | 16 | 24 | 20 | 32 | 30 | 30 | 0 | `genin` | Post-949 source lineage |
| `chunin_konohamaru` | 46 | 42 | 38 | 26 | 34 | 30 | 48 | 44 | 44 | 0 | `chunin` | Post-949 source lineage |

# Appendix B — reconstructed current-live Entity PL ledger

Method: exact Post-949 production Entity rows + Final-116 `nue`. `Derived` recomputes Formula v1.0.

| ID | N | T | B | F | K | G | S | Stored | Derived | Δ | Provenance |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| `breakout_kurama` | 112 | 105 | 35 | 68 | 96 | 72 | 125 | 117 | 117 | 0 | Post-949 production source lineage |
| `de_baku` | 55 | 48 | 18 | 22 | 40 | 62 | 70 | 64 | 64 | 0 | Post-949 production source lineage |
| `gamakichi` | 72 | 68 | 52 | 28 | 40 | 20 | 76 | 71 | 71 | 0 | Post-949 production source lineage |
| `ibuse` | 58 | 64 | 22 | 18 | 68 | 28 | 76 | 70 | 70 | 0 | Post-949 production source lineage |
| `iron_maiden` | 18 | 42 | 52 | 48 | 58 | 12 | 72 | 65 | 65 | 0 | Post-949 production source lineage |
| `key_gero` | 34 | 20 | 8 | 62 | 38 | 28 | 32 | 53 | 53 | 0 | Post-949 production source lineage |
| `koto_crow` | 20 | 12 | 5 | 6 | 18 | 48 | 14 | 39 | 39 | 0 | Post-949 production source lineage |
| `kurama_complete` | 132 | 124 | 38 | 84 | 116 | 84 | 148 | 138 | 138 | 0 | Post-949 production source lineage |
| `menma_kurama` | 112 | 104 | 36 | 94 | 118 | 70 | 124 | 118 | 118 | 0 | Post-949 production source lineage |
| `menma_nine_tails` | 114 | 108 | 38 | 102 | 122 | 72 | 128 | 121 | 121 | 0 | Post-949 production source lineage |
| `mirage_clam` | 44 | 24 | 10 | 52 | 32 | 74 | 58 | 66 | 66 | 0 | Post-949 production source lineage |
| `mk_enma` | 68 | 78 | 62 | 24 | 50 | 30 | 84 | 77 | 77 | 0 | Post-949 production source lineage |
| `nine_tails` | 126 | 118 | 36 | 72 | 112 | 80 | 138 | 130 | 130 | 0 | Post-949 production source lineage |
| `triple_rashomon` | 12 | 18 | 70 | 82 | 64 | 5 | 98 | 83 | 83 | 0 | Post-949 production source lineage |
| `wr_kamatari` | 82 | 76 | 68 | 28 | 54 | 26 | 88 | 82 | 82 | 0 | Post-949 production source lineage |
| `yang_kurama` | 122 | 112 | 34 | 66 | 108 | 72 | 132 | 125 | 125 | 0 | Post-949 production source lineage |
| `yin_kurama` | 120 | 108 | 34 | 82 | 114 | 86 | 126 | 123 | 123 | 0 | Post-949 production source lineage |
| `nue` | 92 | 98 | 60 | 55 | 96 | 65 | 105 | 100 | 100 | 0 | Final-116 Entity admission; survives 115 |

# Appendix C — non-production current Registry/PL additions after live-115 freeze

| ID | Classification | Base Stats / PL | Live production? | Rank |
|---|---|---|---|---|
| `one_tailed_chakra_cloak_menma` | same-person Menma Character representation; Transformation / Hosted-Tailed-Beast expression | 60/65/25/34/70/22/68 → PL66 | NO | transformation grants none; project persistent Menma Rank |
| `arc2_root_woman_01` | persistent human opposition Character | 54/56/48/65/61/52/58 → PL63 | NO collectible admission | null / unresolved |
| `story_actor_kusa_broker_01` | persistent non-collectible Story/World Character contact | intentionally null | NO | null |
| `story_actor_kusa_routekeeper_01` | persistent non-collectible Story/World Character contact | intentionally null | NO | null |

Preserve: calibrated != admitted != live != runtime implemented != Golden.
