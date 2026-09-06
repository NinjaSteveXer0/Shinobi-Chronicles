# Shinobi Chronicles — Whisper Woods Local Map Asset Contract

Date: 6 September 2026

Status: **UI / ASSETS DESIGN + TARGET BINDING LOCKED — MAP BINARY NOT YET CREATED / RUNTIME BINDING NOT YET LIVE**

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

UI / Assets approved target repository binding:

`Backgrounds/whisper_woods.png`

Current state of that path:

**RESERVED TARGET — BINARY DOES NOT YET EXIST.**

Coding must not activate this `mapImage` binding until the binary is committed and verified. The current reusable mission-area consumer rejects a missing/empty map image, so a textual path reservation is not equivalent to a live asset.

No parallel `UI/`, `Maps/`, `Mission Areas/`, or event-specific duplicate image path is authorised for Alpha unless an actual repository migration is explicitly approved later.

---

## 4. Locked map topology

The artwork must support the World-owned normalized anchor targets exactly; UI / Assets does not move them to make the painting easier.

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

The painting must not imply a linear `Battle 1 → Battle 2 → Battle 3 → Boss` topology.

---

## 5. Environmental visual brief

The reusable master should depict:

- dense Fire Country woodland;
- one readable dirt/trade trail entering from the south;
- a visually distinctive split cedar at the central fork;
- a small abandoned forest/warden shelter on the western side;
- a creek cutting through the eastern-middle area;
- higher, rougher ravine terrain toward the north;
- elevated ridge terrain capable of supporting Old Watch Ledge;
- dense western woodland capable of concealing Hollow Cedar.

The environment should remain readable under runtime hotspot overlays and the existing contained mission-area Event Drawer.

Art direction should preserve natural geographic continuity rather than looking like seven isolated encounter islands. Routes may narrow, disappear under foliage, reconnect, cross shallow water, or become difficult to read naturally, but the stable anchors must still make physical sense relative to one another.

No unique environmental variant is required for each discovery state.

---

## 6. Hard exclusions — do not bake into the master

Do not bake:

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

Environmental objects may exist naturally where geographically appropriate, but they must not encode the current observer-safe event truth.

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

## 9. Target binding / activation rule

Once the approved binary exists, the local-area registration may consume:

```text
mapImage: "Backgrounds/whisper_woods.png"
```

Until then, the binding is not runtime-live.

No placeholder production image should silently stand in for Whisper Woods. Diagnostic data-URI coverage in the reusable runtime is not production asset authority.

---

## 10. Binary QA gate

Before Coding treats the target binding as production-valid, verify:

1. file exists at exactly `Backgrounds/whisper_woods.png`;
2. PNG decodes successfully;
3. dimensions are exactly 1536 × 1024;
4. no baked characters, markers, labels, clues, rewards, event state, battle state, or secret advertisement;
5. all seven normalized anchor targets land on physically plausible geography;
6. the South → Fork → Creek/Ravine route reads coherently;
7. the west Shelter route is plausible and can visually reconnect toward Creek;
8. Watch Ledge and Hollow Cedar are environmentally present without being visually exposed as secrets;
9. runtime hotspot overlays remain legible at the locked coordinates;
10. one master remains reusable after Mission 1.

A failed binary QA result reopens the asset file, not the World geography.

---

## 11. Current production state

**World geography/content:** CLOSED upstream.

**UI / Assets topology translation:** CLOSED.

**Master dimensions/aspect:** CLOSED — 1536 × 1024 / 3:2.

**Target production path:** CLOSED — `Backgrounds/whisper_woods.png`.

**Environmental content brief:** CLOSED.

**No-baked-runtime-state rule:** CLOSED.

**Secret presentation rule:** CLOSED.

**Actual map binary:** NOT YET CREATED.

**Runtime `mapImage` activation:** NOT YET LIVE.

**Coding implementation / runtime validation / Golden:** separate downstream gates.

The current remaining UI / Assets blocker is therefore only the production binary itself. Under the project image lock, image generation is not authorised until Stephen uses the exact phrase `generate now`.
