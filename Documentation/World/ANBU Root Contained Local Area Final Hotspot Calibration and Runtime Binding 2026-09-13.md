# Shinobi Chronicles — ANBU + Root Contained Local Area Final Hotspot Calibration and Runtime Binding

**Date:** 2026-09-13  
**Owner:** World / Missions / Events / Rewards  
**Status:** **BINDING WORLD SPATIAL / LOCAL-AREA AUTHORING AUTHORITY — CODING IMPLEMENTATION / RUNTIME VALIDATION SEPARATE**  
**Source handoff:** GitHub issue #153  

## 1. Purpose

This document closes exact World calibration for the two reusable Konoha contained-area masters required by the Story-gated local-area contract:

- `konoha_anbu_hq`
- `konoha_root_hq`

It consumes and does not reopen:

- `Documentation/World/Story-Gated Local Area Access Persistent Discovery and Opportunity Eligibility Contract 2026-09-11.md`;
- `Documentation/World/Konoha v3 Location Unlock Requirements Matrix v1 2026-09-11.md`;
- Konoha exterior reservations `KON-S03` and `KON-S04`;
- UI / Assets issue #114 and World issue #153;
- the existing contained-local-area runtime pattern used by Whisper Woods where semantically compatible.

Preserve throughout:

> **interior visit != exterior-location Knowledge**  
> **local artwork != observer Knowledge**  
> **Story access != general return access**  
> **Story-authorised hotspot != permanent free-play hotspot**  
> **ANBU discovery != Root discovery**  
> **identified != mapped != accessible != actionable**

---

## 2. Frozen production masters

### ANBU HQ

- area ID: `konoha_anbu_hq`
- production path: `Konoha Locations/anbu_hq.png`
- asset commit lineage: `d02b7080e7adc50157a980cf648f1b6847fadc08`
- Git blob: `af1d79954715510b07415cbca71c4feb7a70b5e5`
- native canvas: **1536 × 1024**
- format: RGB PNG
- file size: **3,216,029 bytes**
- SHA-256: `882e77e5aeb7ae3268088eddb082e579e1ce8b117990ec78a9929c383dbe58c2`

### Root HQ

- area ID: `konoha_root_hq`
- production path: `Konoha Locations/root_hq.png`
- production commit: `1753958478d1e3cfa964227514077d71494b1e7f`
- Git blob: `1e321a3ac16b44ff8f12b54afcf36dc6f81f836a`
- native canvas: **1536 × 1024**
- format: RGB PNG
- file size: **2,981,974 bytes**
- SHA-256: `55e4062d1e24f4298ffc780889a3daa7a6edc47e54373820c76100fcf2796aa6`

These binaries are frozen spatial authority for this calibration. Replacing/cropping/resizing either binary invalidates the pixel regions below until World revalidates them.

---

## 3. Coordinate notation

- coordinate origin: source-image top-left `(0,0)`;
- `Region`: generous interaction/semantic territory `x1,y1 → x2,y2` on the **1536×1024 source master**;
- `Anchor`: recommended local marker/focus origin, expressed as pixels and source-master percentage;
- rectangles may later be refined into polygons without changing stable hotspot IDs;
- runtime must project against the **actual rendered image-content box**, including contain/letterbox offsets, not viewport percentages;
- hidden/unauthorised hotspots do not receive invisible interaction regions merely because the region exists in this authoring table.

---

# PART A — ANBU HQ

## 4. ANBU stable hotspot calibration

| Hotspot ID | Semantic subhost | Interaction region | Anchor | Physical reading / authoring use |
|---|---|---:|---:|---|
| `anbu_hq_hotspot_secure_threshold` | Secure Threshold | `500,675 → 835,955` | `665,815` `(43.29%, 79.59%)` | Main lower gate / secured arrival threshold; suitable Story/escorted entry boundary. |
| `anbu_hq_hotspot_transit_hall` | Transit Hall | `460,295 → 860,470` | `660,380` `(42.97%, 37.11%)` | Central pond/terrace/transit court linking operational spaces. |
| `anbu_hq_hotspot_operations_concourse` | Operations Concourse | `560,100 → 930,330` | `755,235` `(49.15%, 22.95%)` | Main central operational building/forecourt. Does not imply current mission activity. |
| `anbu_hq_hotspot_briefing_chamber` | Briefing Chamber | `845,285 → 1115,460` | `985,370` `(64.13%, 36.13%)` | Right-central tactical/briefing room with large working table. |
| `anbu_hq_hotspot_records_annex` | Records Annex | `1170,300 → 1505,500` | `1350,400` `(87.89%, 39.06%)` | Eastern records/library room. Records visible in art do not grant document Knowledge. |
| `anbu_hq_hotspot_equipment_bay` | Equipment Bay | `35,300 → 390,525` | `220,415` `(14.32%, 40.53%)` | Western equipment/workshop/training-support room. Presence does not grant equipment custody. |
| `anbu_hq_hotspot_observation_gallery` | Observation Gallery | `1110,70 → 1515,270` | `1295,170` `(84.31%, 16.60%)` | Elevated eastern bridge/gallery overlooking the ravine approach. |
| `anbu_hq_hotspot_lower_service_junction` | Lower Service Junction | `535,455 → 930,690` | `735,575` `(47.85%, 56.15%)` | Lower bridges/stairs/service convergence beneath the main terrace. |

### ANBU exterior relationship

- Konoha exterior reservation remains `KON-S03`.
- local contained area remains `konoha_anbu_hq`.
- first legitimate interior visit may commit/consume `anbu_hq_interior_visited` where the caller owns that occurrence boundary.
- **Only** exact exterior spatial confirmation may establish `anbu_hq_exterior_location_confirmed`.
- escorted/concealed transit, Story loading, local-map display, hearing that ANBU has a headquarters, or interior presence alone do not confirm `KON-S03` on the Konoha map.

---

# PART B — ROOT HQ

## 5. Root stable hotspot calibration

| Hotspot ID | Semantic subhost | Interaction region | Anchor | Physical reading / authoring use |
|---|---|---:|---:|---|
| `root_hq_hotspot_concealed_threshold` | Concealed Threshold | `185,20 → 420,210` | `295,105` `(19.21%, 10.25%)` | Surface shrine/hidden descent threshold. Local use does not itself expose Konoha exterior coordinates. |
| `root_hq_hotspot_silent_concourse` | Silent Concourse | `560,320 → 930,560` | `750,445` `(48.83%, 43.46%)` | Central stair/cross-junction connecting the upper institutional and lower operational levels. |
| `root_hq_hotspot_training_assessment_hall` | Training / Assessment Hall | `300,320 → 570,550` | `440,435` `(28.65%, 42.48%)` | Western circular assessment/training floor and adjacent open drill hall. |
| `root_hq_hotspot_records_vault` | Records Vault | `835,125 → 1105,315` | `970,220` `(63.15%, 21.48%)` | Upper eastern archive/records room. Visible shelving != readable/known contents. |
| `root_hq_hotspot_interview_chamber` | Interview Chamber | `385,145 → 625,310` | `505,225` `(32.88%, 21.97%)` | Upper western controlled meeting/interview chamber. |
| `root_hq_hotspot_operations_gallery` | Operations Gallery | `500,540 → 850,735` | `675,625` `(43.95%, 61.04%)` | Lower-middle staging/logistics gallery and connective work space. |
| `root_hq_hotspot_command_chamber` | Command Chamber | `610,125 → 890,340` | `750,235` `(48.83%, 22.95%)` | Upper central command/map chamber beneath the large rooted seal-door structure. |
| `root_hq_hotspot_sealed_lower_junction` | Sealed Lower Junction | `700,650 → 1015,930` | `860,805` `(55.99%, 78.61%)` | Deep lower sealed chamber/junction linking the lowest visible routes. |

### Root exterior relationship

- Konoha exterior reservation remains `KON-S04`.
- local contained area remains `konoha_root_hq`.
- first legitimate interior visit may commit/consume `root_hq_interior_visited` where the caller owns that occurrence boundary.
- **Only** exact exterior spatial confirmation may establish `root_hq_exterior_location_confirmed`.
- ANBU Knowledge, ROOT existence Knowledge, Story completion, local-map rendering, or interior transit alone do not confirm `KON-S04`.

---

# PART C — LOCAL KNOWLEDGE / ACCESS / ACTIONABILITY

## 6. Local projection is observer-relative

The production master may depict more physical geography than the current observer is authorised to understand or use.

Runtime therefore treats the calibrated table as **World spatial authority**, not as a list of automatically visible buttons.

For each local hotspot, the caller/runtime must separately determine:

- whether its existence may be projected;
- whether its identity may be named;
- whether it may receive focus/hover/input;
- whether current access permits movement into it;
- whether any current Story/World opportunity is actionable there.

Before legitimate projection, a hotspot must have:

- no marker;
- no label;
- no cursor/pointer affordance;
- no focus target;
- no tooltip;
- no accessible-name leak;
- no invisible hitbox that intercepts input.

A spatially bounded legitimate known-unknown may use the existing `????` known-unknown grammar only when exact Knowledge authority permits it. Merely seeing a corridor in the background art is not sufficient.

## 7. Story-temporary / escorted access

A Story caller may supply, conceptually:

```text
missionAreaId
worldInstanceRef
entryRouteRef
storyAuthorizedHotspotIds[]
accessState = STORY_TEMPORARY | ESCORTED_TEMPORARY | another exact authorised state
localActionability = STORY_ONLY | LIMITED | GENERAL
returnCallerRef
```

The stable calibrated hotspot IDs in this document are the legal address vocabulary for `storyAuthorizedHotspotIds[]`.

Loading the local map does **not**:

- reveal every calibrated hotspot;
- grant free-play return access;
- grant Konoha exterior discovery;
- reveal every record/room purpose;
- activate unrelated side content;
- create `GENERAL` access;
- create a new Story occurrence by presentation alone.

Exact Story mission/section authority chooses the subset required by that Chronicle. World calibration does not hard-code the developer Menma route as a universal local path.

## 8. Entry / exit semantics

- `entryRouteRef` determines the legitimate first projected local context. Coding must not assume every entry starts at the same hotspot.
- `returnCallerRef` returns to the exact Story/World caller or authorised parent context. Exiting the contained area must not fabricate a Konoha exterior marker.
- if Story access expires, the local area may remain historical/known to the observer while current access returns to `NO_ACCESS` or another exact state.
- a later free-play return requires its own access eligibility; prior Story presence is not enough by itself.

## 9. Independent ANBU / Root knowledge domains

The two contained areas must remain independent in persistence and projection.

Do not infer:

- ANBU interior visit -> ROOT existence;
- ANBU exterior confirmation -> ROOT exterior confirmation;
- ROOT interior visit -> ANBU map location;
- Arc 2 completion -> either exterior marker;
- one facility's local hotspot discovery -> corresponding hotspot discovery in the other facility.

Shared participant history or Story linkage may create later Knowledge only when a committed occurrence explicitly supports it.

---

# PART D — STORY / WORLD BINDING

## 10. Current Arc-2 boundary

Current final Arc-2 Story authority includes Konoha security/custody investigation and ANBU action during **Mission 4 — THE EMPTY CELL**, but Story's use of ANBU resources does not itself establish permanent ANBU HQ exterior Knowledge, general access, or ROOT responsibility.

The local maps are therefore available as reusable Story-contained geography when a current Story caller legitimately chooses/needs them. Exact mission-section usage and exact authorised hotspot subset remain Story-owned.

Strong optional leads created inside either facility may later become World opportunities only through their own causal event/opportunity contracts. Facility discovery does not auto-populate side quests.

## 11. No blanket Arc-end unlock

Preserve the binding rule:

> `Arc 2 completed` does **not** automatically reveal or permanently unlock ANBU HQ or Root HQ.

A final Story state may legitimately reveal one or both only when the committed Chronicle facts establish the exact Knowledge/access predicates required by the Konoha unlock matrix.

---

# PART E — CODING CONSUMPTION

## 12. Minimum content binding record

Coding may use equivalent names, but each local-area registration needs semantics equivalent to:

```text
areaId
assetPath
assetBlobSha
nativeWidth = 1536
nativeHeight = 1024
hotspots[] {
  hotspotId
  region { x1, y1, x2, y2 }
  anchor { x, y }
}
exteriorReservationRef
interiorVisitedFactRef
exteriorLocationConfirmedFactRef
observerProjectionSource
accessSource
storyAuthorisedHotspotSource
returnCallerSource
```

World supplies geometry/semantic addresses. Runtime consumes authoritative Knowledge/access/Story state; it must not derive them from image pixels or file names.

## 13. Required runtime validation

At minimum prove:

1. both masters render from the exact frozen blob SHAs above;
2. all 8 ANBU + 8 Root anchors remain aligned responsively against the rendered image-content box;
3. unauthorised local hotspots have zero pointer/focus/DOM/accessibility leak;
4. Story can authorise a strict subset through stable hotspot IDs;
5. local-map open/close does not expand the authorised subset or recommit discovery;
6. Story-temporary/escorted access survives save/load without becoming `GENERAL`;
7. first legitimate interior visit and exterior-location confirmation remain separate facts;
8. ANBU visit/reveal does not reveal Root, and vice versa;
9. `KON-S03` / `KON-S04` remain unprojected until their own Konoha Knowledge predicates are met;
10. local exit restores the exact parent Story/World caller without fabricating exterior access;
11. unknown local geography does not intercept input merely because it is depicted in the passive master;
12. save/load/reopen produces no discovery/access reroll or duplicate occurrence;
13. current Story caller can use the same contained area with a different authorised hotspot subset in another Chronicle;
14. design/calibration completion is reported separately from implementation, browser validation and Golden/regression state.

---

## 14. Closure

**ANBU spatial calibration:** CLOSED.  
**Root spatial calibration:** CLOSED.  
**Story-local access semantics:** already closed upstream and bound here.  
**Exterior Knowledge separation:** CLOSED / reinforced.  
**Coding implementation:** separate downstream work.  
**Runtime/browser/Golden validation:** separate downstream work.

No new UI/Assets generation or art revision is requested.