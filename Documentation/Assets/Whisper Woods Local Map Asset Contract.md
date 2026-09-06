# Shinobi Chronicles — Whisper Woods Local Map Asset Contract

Date: 6 September 2026

Status: **UI / ASSETS CLOSED — MAP BINARY LANDED / EXACT `mapImage` BINDING ACTIVE FOR CODING CONSUMPTION**

---

## 1. Purpose

This document consumes the closed World / Missions / Events content contract for Arc 1 Mission 1 and converts it into the UI / Assets production contract for the contained local map `whisper_woods`.

Source authority:

`Games/Shinobi Chronicles/Arc 1 Mission 1 - Whisper Woods World Content Contract.md`

This document does not change World geography, reveal predicates, Story choreography, Battle authority, mission outcomes, rewards, or event semantics.

Preserve:

> **map artwork ≠ world truth**
>
> **stable location ≠ hotspot ≠ opportunity**
>
> **environmental presence ≠ observer discovery**
>
> **secret geography in the painting ≠ secret interaction revealed**
>
> **UI / Assets closure ≠ Coding implementation ≠ runtime validation ≠ Golden GREEN**

---

## 2. Area identity

Area ID:

`whisper_woods`

Display name:

**WHISPER WOODS**

World location root:

`fire_whisper_woods`

Parent region:

`fire`

The local-map artwork is a reusable environmental master, not a one-use Mission-1 event plate.

---

## 3. Production image contract

Approved master format:

- PNG;
- **1536 × 1024 px**;
- **3:2** aspect ratio;
- full environmental composition;
- no baked runtime HUD, markers, labels, quest state, participants, clues, rewards, or event-state overlays.

Exact ACTIVE production repository binding:

`Konoha Locations/whisper_woods.png`

Current committed blob:

`4a44b9f6a15dd5ab529994c43f62e42c37fdb8c1`

Assets state:

**ACTIVE — UI / Assets approved production `mapImage` binding.**

The previously reserved target:

`Backgrounds/whisper_woods.png`

is **SUPERSEDED / STALE — DO NOT USE FOR PRODUCTION BINDING**.

No duplicate copy is required at the superseded path. Runtime should consume the exact committed ACTIVE path above rather than migrating or deriving a different path for convenience.

---

## 4. Locked map topology

The artwork supports the World-owned normalized anchor targets exactly; UI / Assets does not move them to make the painting easier.

| Stable place | Hotspot ID | X | Y | Environmental reading |
|---|---|---:|---:|---|
| South Trailhead | `whisper_woods_hotspot_south_trailhead` | 50% | 88% | readable south-entry dirt/trade trail |
| Split-Cedar Fork | `whisper_woods_hotspot_split_cedar` | 48% | 66% | unmistakable natural route fork around split cedar |
| Old Warden Shelter | `whisper_woods_hotspot_warden_shelter` | 25% | 52% | small abandoned woodland/warden structure on western route |
| Whisper Creek Ford | `whisper_woods_hotspot_creek_ford` | 68% | 49% | shallow creek crossing in eastern-middle woods |
| North Ravine | `whisper_woods_hotspot_north_ravine` | 52% | 20% | higher rugged ravine terrain toward north |
| Old Watch Ledge | `whisper_woods_hotspot_watch_ledge` | 82% | 27% | elevated ridge/ledge geometry, environmentally plausible but not advertised as a secret |
| Hollow Cedar | `whisper_woods_hotspot_hollow_cedar` | 18% | 35% | dense western woodland containing a plausible hollow cedar/recess, not visually signposted as interactable |

Primary environmental route read:

**South Trailhead → Split-Cedar Fork**

then:

**east / broken-understory → Whisper Creek Ford → North Ravine**

or:

**west / old-road spur → Old Warden Shelter → route information reconnecting toward creek**

Optional environmental support:

- Watch Ledge overlooks the northern woods;
- Hollow Cedar sits off the older western patrol route.

The painting does not imply a linear `Battle 1 → Battle 2 → Battle 3 → Boss` topology.

---

## 5. Environmental visual brief

The approved reusable master depicts/supports:

- dense Fire Country woodland;
- one readable dirt/trade trail entering from the south;
- a visually distinctive split cedar at the central fork;
- a small abandoned forest/warden shelter on the western side;
- a creek cutting through the eastern-middle area;
- higher, rougher ravine terrain toward the north;
- elevated ridge terrain capable of supporting Old Watch Ledge;
- dense western woodland capable of concealing Hollow Cedar.

The environment remains intended to be readable under runtime hotspot overlays and the existing contained mission-area Event Drawer.

Art direction preserves natural geographic continuity rather than looking like seven isolated encounter islands. Routes may narrow, disappear under foliage, reconnect, cross shallow water, or become difficult to read naturally, while the stable anchors remain physically coherent relative to one another.

No unique environmental variant is required for each discovery state.

---

## 6. Hard exclusions — not baked into the master

The approved production master does not author runtime truth through baked:

- characters;
- enemies;
- caravan wagons;
- scorch/combat marks;
- corpses;
- battle damage;
- quest arrows;
- glowing clues;
- footprints or trace markers presented as UI truth;
- loot;
- reward containers presented as active loot;
- secret icons or secret glow;
- Story icons;
- hotspot halos;
- labels;
- `???` markers;
- current mission state;
- future Battle state;
- major-contact identity;
- participant identity;
- objective text;
- success/failure state.

Environmental objects may exist naturally where geographically appropriate, but they do not encode the current observer-safe event truth.

---

## 7. Secret-geometry rule

`Old Watch Ledge` and `Hollow Cedar` are stable places but begin concealed.

The environmental master may physically contain plausible terrain supporting them. It must not advertise them as gameplay secrets through:

- isolated spotlighting;
- unnatural saturation;
- glowing edges;
- conspicuous framing;
- visible reward chest/icon treatment;
- arrows/trails that only make sense as UI guidance;
- labels;
- baked markers.

Before legitimate discovery, runtime projects **no marker** for these secrets. The background must not defeat that contract visually.

---

## 8. Runtime overlay contract

Runtime continues to own:

- hotspot presence/absence;
- labels;
- observer-safe `???` where legal;
- family/category styling;
- selected/focused state;
- legal actions;
- Event Drawer contents;
- tracking;
- discovery;
- actionability;
- aggregation;
- opportunity suppression/transformation;
- return/continuation state.

The background remains passive environmental art.

The existing project map grammar remains applicable:

> **subtle halo/circle — no pins**

when a hotspot is legitimately projected.

Secret opportunities that are not yet discovered project nothing.

---

## 9. ACTIVE target binding

The local-area registration is authorised to consume exactly:

```text
mapImage: "Konoha Locations/whisper_woods.png"
```

This binding is now **ACTIVE for Coding consumption**.

Do not substitute:

```text
Backgrounds/whisper_woods.png
```

That earlier reservation is superseded.

Do not derive a filename from `whisper_woods`, copy the binary into another directory merely to simplify code, or silently fall back to a placeholder.

Diagnostic data-URI coverage in the reusable runtime is not production asset authority.

---

## 10. Binary / runtime QA gate

Assets path reconciliation is closed. Coding/runtime validation remains a separate downstream gate.

Before Golden closure, verify:

1. file exists at exactly `Konoha Locations/whisper_woods.png`;
2. committed blob matches the approved binary authority where relevant: `4a44b9f6a15dd5ab529994c43f62e42c37fdb8c1`;
3. PNG decodes successfully;
4. dimensions are exactly 1536 × 1024;
5. no baked characters, markers, labels, clues, rewards, event state, battle state, or secret advertisement becomes runtime-semantic truth;
6. all seven normalized anchor targets land on physically plausible geography;
7. the South → Fork → Creek/Ravine route reads coherently;
8. the west Shelter route is plausible and can visually reconnect toward Creek;
9. Watch Ledge and Hollow Cedar remain environmentally present without being prematurely exposed by runtime presentation;
10. runtime hotspot overlays remain legible at the locked coordinates;
11. one master remains reusable after Mission 1.

A failed runtime/binary QA result reopens the relevant implementation or asset defect only; it does not reopen World geography or this exact path selection without new evidence.

---

## 11. Current production state

**World geography/content:** CLOSED upstream.

**UI / Assets topology translation:** CLOSED.

**Master dimensions/aspect:** CLOSED — 1536 × 1024 / 3:2.

**Exact production path:** **ACTIVE — `Konoha Locations/whisper_woods.png`.**

**Committed production blob:** `4a44b9f6a15dd5ab529994c43f62e42c37fdb8c1`.

**Previous `Backgrounds/whisper_woods.png` reservation:** SUPERSEDED / STALE.

**Environmental content brief:** CLOSED.

**No-baked-runtime-state rule:** CLOSED.

**Secret presentation rule:** CLOSED.

**Actual map binary:** **LANDED.**

**Runtime `mapImage` authority:** **ACTIVE FOR CODING CONSUMPTION.**

**Coding implementation / runtime validation / Golden:** separate downstream gates.

There is no remaining UI / Assets path/binary blocker for Whisper Woods. Coding may bind the contained mission area to the exact ACTIVE path and proceed with runtime/browser/Golden validation.
