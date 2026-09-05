# Shinobi Chronicles — Registry / PL Enemy Encounter Selection + Scaling Alpha Acceptance

**Date:** 2026-09-05  
**Status:** **REGISTRY / PL ACCEPTED — ALPHA ENCOUNTER-SCALING BOUNDARY CLOSED**

This document records Registry / PL acceptance of the Combat authority:

`Documentation/SC_Combat_Enemy_Encounter_Selection_Scaling_Boundary_2026-09-05.md`

Combat commit:

`429c592683db10cc4ae28caea6ecad083940e8d1`

The existing Enemy/Opposition Base-Stat/Base-PL calibrations remain authoritative and unchanged.

---

## 1. Canonical enemy packages remain stable

Enemy/Opposition Registry Base Stats and Base PL describe the stable canonical archetype package.

The three reusable Menma Test Subjects remain exactly:

- `test_subject_altered_shinobi` — Base PL **11**
- `test_subject_brute` — Base PL **13**
- `test_subject_unstable` — Base PL **12**

Their low values are deliberate canonical calibration and are correct for Menma's tutorial/prologue.

Menma's tutorial uses those canonical packages with **no encounter scaling projection**.

Do not rewrite Base Stats or Base PL merely because the same archetype later appears in a harder encounter.

Preserve:

**Base enemy identity ≠ encounter occurrence**

**later difficulty ≠ Base-PL rewrite**

**same archetype ≠ same historical occurrence**

---

## 2. Alpha default occurrence rule

For Alpha:

**ordinary/common enemy occurrence = canonical Base package by default.**

No generic player-level, player-PL, map-tier, UI-difficulty, random-roll or hidden multiplier scaling is authorised.

The following retired patterns remain prohibited:

- random ±10% Battle-entry variation;
- `elite ×1.25`;
- `groupBoss ×8`;
- `guardBoss ×50`;
- equivalent hidden scaling under renamed labels.

---

## 3. Explicit harder-occurrence projection

A later authored mission/encounter may instantiate a stronger or otherwise modified occurrence of the same stable enemy archetype only through an explicit encounter-owned Effective-State projection.

Required properties:

- exact source/package identity;
- exact occurrence ownership;
- Effective-state projection only;
- Base Stats/Base PL unchanged;
- applied exactly once / idempotently;
- provenance retained;
- removable/traceable with the occurrence lifecycle.

An encounter projection must not be inferred automatically from:

- player level;
- player PL;
- UI difficulty;
- map tier;
- enemy display name;
- hidden random multiplier.

If an authored occurrence projection requires exact new Stat values, **Registry / PL owns calibration of the declared package** after CE / Mission / World has defined its semantic purpose and source identity.

Registry / PL does not invent generic scaling numbers after the fact.

---

## 4. Encounter-selection ownership

Registry / PL accepts the ownership split:

- **CE / Mission / World encounter authority** — selects which enemy identities plausibly appear and why;
- **Registry / PL** — owns canonical Base Stats/Base PL and calibrates exact declared occurrence Stat packages where explicitly requested;
- **Combat** — consumes the constructed participant state and resolves Battle;
- **Coding** — implements occurrence construction, exact projection application, provenance, persistence and deterministic Battle entry.

CE / Mission / World selection may legitimately consider mission, location, faction/world state, Chronicle history, prior events/Knowledge, authored encounter purpose and bounded eligible archetypes.

Combat does not choose world encounter composition.

---

## 5. Overworld / interactive-map Alpha model

Alpha uses the accepted:

**hybrid authored-candidate + contextual-selection model**

Meaning:

1. mission/map/world content provides an exact or bounded authored candidate set;
2. CE/world context filters/selects only among semantically eligible candidates;
3. randomness, if used, occurs only after eligibility is established;
4. no unrestricted global random-enemy table may ignore mission, location, faction or world-state plausibility.

Preserve:

**map encounter opportunity ≠ arbitrary random enemy table**

**randomness chooses among eligible possibilities ≠ randomness defines semantic eligibility**

---

## 6. Encounter-grade vocabulary

No universal Alpha vocabulary such as `normal`, `veteran`, `elite` or `boss` is authorised merely to wrap hidden PL multipliers.

If post-Alpha content requires reusable encounter-grade packages:

- CE / Mission / World owns vocabulary and semantic meaning;
- Registry / PL calibrates exact declared Stat projections;
- Coding implements occurrence projection/provenance;
- Combat consumes the resulting Effective state.

---

## 7. Registry / PL closure

No Enemy/Opposition Base-PL recalibration is required by this Combat lock.

The current 38-enemy calibration document remains canonical for Base Stats/Base PL.

Future requests to Registry / PL must identify an exact authored occurrence projection package rather than asking for generic level scaling.

Hard boundaries:

**encounter scaling ≠ Base mutation**

**difficulty label ≠ hidden PL bonus**

**explicit occurrence projection ≠ permanent archetype mutation**

**CE selection ≠ Combat resolution**

**semantic encounter context ≠ arbitrary random scaling**
