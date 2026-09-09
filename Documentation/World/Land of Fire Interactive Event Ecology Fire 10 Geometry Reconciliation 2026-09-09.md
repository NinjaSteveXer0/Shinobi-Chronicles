# Shinobi Chronicles — Land of Fire Interactive Event Ecology / Fire (10) Geometry Reconciliation

**Date:** 2026-09-09  
**Owner:** World / Missions / Events / Rewards  
**Status:** **WORLD GEOMETRY RECONCILIATION — IMPLEMENTATION-READY**

## Purpose

This document consumes the completed UI / Assets source-and-geometry handoff from GitHub issue #43 and reconciles the existing World event ecology authority with the current Land of Fire production map.

It is a narrow authority update. It does **not** reopen or replace the closed semantic/event content in:

`Documentation/World/Land of Fire Interactive Event Ecology Alpha Contract.md`

Authority commit:

`57cbb9159868f6ffc8ca05c147a0faee793f8b16`

This reconciliation **supersedes only the stale geometry-pending language in Section 2 of that contract**.

All Wave-1 event-family, discovery, recurrence, persistence, density, Knowledge, Battle-boundary, reward-boundary, and dormant-reservation decisions in the original World contract remain authoritative unless explicitly changed here.

---

## 1. Current production map authority

Current production asset:

`Backgrounds/inside_LOF.png`

Git blob:

`b1300c48e786981f610f7a46c82d92c245da2d1c`

Master identity:

**Fire (10)**

Native canvas:

**1536 × 1024**

Current durable geometry authority:

`Documentation/Maps/Land of Fire Regional Hotspot Calibration v2.md`

Geometry authority commit:

`f21043b09ebcea1e6ae69012fb253302c7af97b3`

Current provenance ledger:

`Documentation/Maps/Regional Map Source Binding Ledger.md`

Ledger commit:

`381c548de04cbcfad450093a0ed17659a7fd3885`

UI / Assets revalidated the exact current Fire (10) binary and closed:

- 14 / 14 regional zones;
- 12 / 12 public destinations, anchors and interaction regions;
- 6 / 6 public service anchors;
- 20 / 20 optional destinations, anchors and interaction regions;
- 28 / 28 concealed/event-driven reservations and suspicion anchors;
- 12 / 12 travel-corridor control-point chains.

**Coordinate changes required: 0.**

Therefore the Fire v2 geometry is current production authority. The earlier v1 calibration remains historical provenance for `inside_LOF(9).PNG` only.

---

## 2. World consumption rule

All semantic hosting addresses already authorised by the World ecology contract may now consume their exact v2 Fire (10) spatial records.

This means:

- `fire:P##` consumes the matching v2 public-destination geometry;
- `fire:SV##` consumes the matching v2 service-anchor geometry;
- `fire:O##` consumes the matching v2 optional-destination geometry;
- `fire:S##` consumes the matching v2 concealed/event-reservation geometry only when World/Knowledge state authorises perception or interaction;
- `fire:R##` consumes the matching v2 travel-corridor control-point chain;
- `fire:Z##` consumes the matching v2 broad-territory geometry where a World occurrence needs territory-level hosting.

These are spatial bindings only.

Preserve:

> geometry authority ≠ event eligibility

> geometry exists ≠ marker is visible

> concealed reservation exists ≠ observer knows it

> regional hosting address ≠ automatic duplicate runtime location

Where `worldRegions.fire` already owns the real runtime place, implementation must bind the regional hosting address to that existing identity instead of creating another location record merely because the calibration has a `P`, `O`, or `S` address.

---

## 3. Wave-1 activation remains unchanged

Fire (10) geometry being complete does **not** activate every calibrated place.

The World ecology contract's existing Wave-1 activation decisions remain locked.

In particular:

- dormant high-lore concealed reservations remain dormant;
- optional destinations still require legitimate discovery where the World contract says so;
- concealed locations still require the authored observer/Knowledge predicate before anomaly, suspicion, partial recognition, discovery, or actionability;
- `fire:P09` Firewatch Caldera remains legitimate geography but is not newly required for standing Wave-1 population merely because its coordinates are now production-safe;
- service anchors remain specialist presentation/action contexts, not World-owned persistent-domain authorities.

No additional destination becomes Alpha-required solely because its geometry was revalidated.

---

## 4. Bandit non-merge remains locked

Current runtime authority already contains:

- runtime location `bandit_hideout`;
- authored opportunity `alpha_bandit_hideout_battle`.

The v2 calibration also contains legacy regional reservation:

- `fire:S10` — Bandit King's Hollow.

There is still no authority proving these are the same historical place.

Therefore:

**DO NOT MERGE THEM BY NAME, THEME, OR PROXIMITY.**

For Alpha Wave 1:

- preserve current `bandit_hideout` / `alpha_bandit_hideout_battle` exactly;
- keep `fire:S10` dormant;
- do not create a second Bandit Hideout occurrence merely to occupy the calibrated reservation.

---

## 5. Runtime projection boundary

Fire v2 coordinates are authored against the native 1536 × 1024 image canvas.

Runtime must project them through the actual rendered image-content box.

For an uncropped render:

`renderedX = imageLeft + (nativeX / 1536) × renderedImageWidth`

`renderedY = imageTop + (nativeY / 1024) × renderedImageHeight`

Any containment, letterboxing, responsive offset, or other actual image transform must be applied consistently to:

- visual anchors;
- interaction regions;
- route control points;
- anomaly/suspicion anchors;
- temporary event treatments.

Do not calculate hotspot positions from browser viewport percentages independent of the rendered image content box.

This geometry closure is **not** a claim that responsive or accessibility runtime validation is already GREEN.

---

## 6. Implementation readiness

With this reconciliation, the World-owned Land of Fire Wave-1 standing-event package has no remaining World/UI geometry authority blocker.

Implementation authority now consists of:

1. `Documentation/World/Land of Fire Interactive Event Ecology Alpha Contract.md`
   - commit `57cbb9159868f6ffc8ca05c147a0faee793f8b16`;
2. `Documentation/Maps/Land of Fire Regional Hotspot Calibration v2.md`
   - commit `f21043b09ebcea1e6ae69012fb253302c7af97b3`;
3. `Documentation/Maps/Regional Map Source Binding Ledger.md`
   - commit `381c548de04cbcfad450093a0ed17659a7fd3885`;
4. this reconciliation document.

Coding should reuse the existing regional map / World Event opportunity / Encounter / Story-return / persistence architecture already present in runtime source.

No second regional-map engine is authorised.

---

## 7. Validation still required after implementation

Implementation must still prove:

- responsive Fire (10) anchor/region alignment;
- route-control-point alignment;
- pointer and keyboard behaviour;
- unknown-location DOM/focus/accessibility non-leakage;
- standing-pool persistence and anti-reroll behaviour;
- same-family/same-host repeat suppression;
- new occurrence identity for repeatable families;
- Story + standing free-play coexistence;
- Battle return to the same unresolved regional occurrence;
- save/load idempotence;
- no duplicate location creation from regional hosting addresses;
- no accidental activation of dormant reservations;
- no `fire:S10` / current `bandit_hideout` collapse;
- no universal reward invention.

Preserve:

> design closed ≠ implemented ≠ runtime validated ≠ Golden GREEN

---

## 8. Routing state

UI / Assets issue #39: **CONSUMED / COMPLETE**.

Incoming World issue #43: **CONSUMED by this reconciliation**.

Downstream Coding handoff:

GitHub issue #44 — `[HANDOFF][TO: CODING][SEND NOW] Implement Land of Fire standing interactive-event ecology on Fire (10) geometry`.

Current World status:

**WAITING ON CODING — issue #44.**
