# Shinobi Chronicles — Enemy Encounter Selection + Scaling Boundary

Date: 2026-09-05

Status: **COMBAT AUTHORITY / ALPHA MINIMUM CONTRACT**

This document consumes the Registry/PL handoff concerning the 38 awaiting-placement Enemy/Opposition identities, including the three reusable Menma Test Subjects, and closes Combat's ownership boundary for encounter selection and later difficulty projection.

## 1. Canonical enemy identity remains stable

Each Enemy/Opposition identity owns canonical Base Stats and Base PL.

The three Menma Test Subjects remain:

- `test_subject_altered_shinobi` — Base PL 11
- `test_subject_brute` — Base PL 13
- `test_subject_unstable` — Base PL 12

These low canonical values are valid production identity calibration and must not be rewritten merely because the same archetype appears in a later or harder encounter.

Preserve:

- Base enemy identity ≠ encounter occurrence;
- later difficulty ≠ Base-PL rewrite;
- same archetype ≠ same historical occurrence;
- same archetype may participate in multiple encounters without gaining a hidden universal scaling rule.

## 2. Alpha minimum implementation

For Alpha, ordinary/common enemies use their canonical Base package by default.

No generic player-level auto-scaling, random Battle-entry multiplier, boss multiplier, difficulty-label multiplier, or hidden PL bonus is authorised.

The Menma tutorial uses the exact already-closed canonical Test Subject package with no encounter-grade projection.

This is sufficient for Alpha unless an exact authored mission/encounter explicitly requires a stronger or otherwise modified occurrence.

## 3. Explicit occurrence projection — allowed only when authored

A later mission may create a stronger/weaker occurrence of a stable enemy archetype only through an explicit encounter-owned projection package.

Such a projection:

- modifies the encounter occurrence's Effective Stats/state only;
- never rewrites Registry Base Stats/Base PL;
- must have an exact source/package identity and provenance;
- must be applied exactly once/idempotently;
- must be removable/traceable with the encounter occurrence lifecycle;
- must not be inferred from player level, UI difficulty label, random roll, map tier, or enemy display name alone.

Combat consumes the projected participant state after encounter construction. Combat does not invent or calibrate the projection simply because an encounter is intended to be harder.

If an explicit Stat projection package needs numeric calibration, Registry/PL is asked to calibrate that exact declared package.

## 4. Encounter selection ownership

Combat does not choose which enemy identities plausibly appear in the world.

Primary ownership belongs to CE / Mission / World encounter authority, which may consider:

- mission context;
- location/region;
- faction/world state;
- Chronicle history;
- authored encounter purpose;
- prior events/Knowledge where relevant;
- exact eligible enemy/archetype constraints.

Combat receives the constructed participant set and resolves Battle.

## 5. Overworld / interactive-map Alpha approach

For Alpha, use a **hybrid authored-candidate + contextual-selection model** rather than either extreme:

1. Mission/map/world content supplies a bounded authored candidate set or exact encounter definition for the location/context.
2. CE/world context may filter or select among those already-authorised candidates using legitimate world/Chronicle state.
3. No arbitrary global random-enemy table may ignore location, faction, mission or world-state plausibility.
4. Randomness, if used at all, occurs only after semantic eligibility is established.

This preserves authored control for Alpha while leaving room for richer CE-contextual encounter selection later.

## 6. Encounter-grade vocabulary ownership

No universal encounter-grade vocabulary (`normal`, `elite`, `veteran`, etc.) is required for Alpha.

Do not introduce labels whose only runtime meaning is a hidden multiplier.

If post-Alpha content needs reusable encounter-grade packages, their vocabulary and semantic package ownership belong to CE / Mission / World encounter authority in coordination with Registry/PL for exact Stat calibration and Coding for projection/provenance implementation.

Combat only needs the final participant Effective state and source provenance necessary to resolve Battle and record evidence.

## 7. Coding requirements

Coding should preserve:

- stable Registry Base identity/Stats/PL;
- encounter occurrence identity separate from archetype identity;
- exact source-owned occurrence projection where explicitly authored;
- idempotent application;
- provenance in save/history/evidence where the projection materially affected the occurrence;
- deterministic Battle entry under the authoritative participant state.

Do not restore retired Battle-entry randomisation or hidden elite/group/guard boss multipliers through encounter construction.

## 8. Core boundaries

Preserve:

**Registry identity/Base Stats/Base PL → stable canonical archetype**

**CE / Mission / World → who plausibly appears and under what authored encounter context**

**explicit encounter projection → occurrence Effective state only**

**Combat → resolve the resulting participant state**

**Coding → construct, project, persist and expose provenance**

And specifically:

- CE selection ≠ Combat resolution;
- map encounter opportunity ≠ arbitrary random enemy table;
- difficulty label ≠ hidden PL bonus;
- encounter scaling ≠ Base-PL rewrite;
- randomness may choose among eligible outcomes ≠ randomness determines semantic eligibility;
- explicit occurrence projection ≠ permanent archetype mutation.
