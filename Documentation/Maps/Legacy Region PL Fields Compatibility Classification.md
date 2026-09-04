# Shinobi Chronicles — Legacy Region PL Fields Compatibility Classification

Date: 4 September 2026

Status: **WORLD / MAP / EVENT OWNERSHIP CLASSIFICATION — CODING CONSUMER TRACE STILL REQUIRED BEFORE REMOVAL**

---

## Recovered legacy fields

Post-866 still contains pre-standardisation region-threat metadata equivalent to:

- `location.power.recommended` / `recommendedPL`;
- `enemyMin`;
- `enemyMax`;
- legacy `getLocationThreat()` logic.

These values originate from an older PL/world-map presentation model.

---

## Current World / Map / Event verdict

The current Knowledge-sensitive hotspot/event architecture does **not** require these legacy fields as authority for:

- event existence;
- event eligibility;
- opportunity identity;
- hotspot visibility/projection;
- observer Knowledge / Discovery;
- map actionability;
- current world truth;
- location identity;
- interaction commitment.

Current map projection is derived from authoritative world/Chronicle truth + observer Knowledge/Discovery + authoritative Actionability/availability/access + presentation policy.

Therefore, from the World / Map / Event side, the legacy region PL fields are classified as:

> **LEGACY COMPATIBILITY / PRESENTATION RESIDUE unless Coding proves a still-intentional non-map consumer during source tracing.**

They are **not part of the current map/event contract**.

---

## Required non-collapse

Preserve:

> **location identity ≠ event identity**

> **event eligibility ≠ player strength**

> **difficulty assessment ≠ event eligibility**

> **map presentation ≠ PL authority**

> **hotspot visibility ≠ capability to succeed**

> **actionability ≠ success prediction**

A world event may legitimately exist or become discoverable/actionable while being far above, near or below the player's current capability.

The map must not hide, create, invalidate or rescale event truth solely because of a legacy region PL band.

---

## PL / Combat boundary

PL owns current numeric calibration.

Combat / the relevant resolver owns actual encounter resolution and any legitimately authored matchup/difficulty assessment.

World/Map may present an authorised difficulty/read-model result if one is explicitly supplied and observer-safe; it must not calculate one from these legacy fields.

Do **not** replace the old values with newly invented modern PL numbers as part of cleanup.

---

## Coding action required before deletion

Coding should trace all live consumers of the recovered fields/functions.

If all remaining consumers are retired map/threat presentation code, remove or migrate the dead path safely.

If a compatibility consumer still exists:

- document why it still exists;
- prevent it from becoming modern PL authority;
- prevent it from affecting current event eligibility/hotspot projection/actionability/world truth;
- isolate it until the compatibility path can be retired.

Do not delete fields blindly before consumer tracing, and do not preserve them merely because stale source still reads them.

---

## Regression expectations

After cleanup, prove that:

1. removing/ignoring legacy region PL fields does not change authoritative event existence;
2. hotspot projection remains Knowledge/actionability-driven;
3. an event can be visible/actionable regardless of being above/below current player PL when its authored eligibility permits it;
4. no map helper manufactures modern recommended PL from the old scale;
5. World/Map never becomes numeric PL calibration authority.
