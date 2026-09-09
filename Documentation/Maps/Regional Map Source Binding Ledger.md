# Shinobi Chronicles — Regional Map Source Binding Ledger

Date: 9 September 2026

Status: **ASSET / MAP-PROVENANCE AUTHORITY — LAND OF FIRE REVALIDATED; OTHER LATER REGIONAL MASTERS STILL REQUIRE REVALIDATION**

---

## Purpose

Regional hotspot/calibration geometry is valid only against the exact artwork master and canvas it was authored against.

> **calibration coordinates ≠ artwork-independent truth**

> **same region identity ≠ same pixel geometry across artwork revisions**

A newer visual master must not silently inherit older hotspot coordinates without visual/coordinate validation.

---

## Legacy audited regional bindings

`Regional_Maps_Cross_Map_Consistency_Audit_v1` binds the following artwork revisions:

| Country | v1 audited artwork master | Native canvas |
|---|---|---:|
| Land of Fire | `inside_LOF(9).PNG` | 1536×1024 |
| Land of Earth | `inside_LOE(5).png` | 1535×1024 |
| Land of Lightning | `inside_LOL(2).png` | 1535×1024 |
| Land of Water | `inside_LOWA(3).png` | 1536×1024 |
| Land of Wind | `inside_LOW(6).png` | 1536×1024 |

These bindings remain valid as provenance for the v1 calibration/audit set.

They must not be misrepresented as bindings for later artwork revisions.

---

## Later workspace master revisions

Later UI/asset authority identifies newer regional masters:

| Country | Later master revision | Current coordinate status |
|---|---|---|
| Land of Fire | Fire `(10)` | **REVALIDATED — v2 CURRENT PRODUCTION AUTHORITY** |
| Land of Earth | Earth `(6)` | **REVALIDATION REQUIRED** |
| Land of Lightning | Lightning `(3)` | **REVALIDATION REQUIRED** |
| Land of Water | Water `(4)` | **REVALIDATION REQUIRED** |
| Land of Wind | Wind `(7)` | **REVALIDATION REQUIRED** |

Do not copy v1 pixel coordinates or percentages onto a later master until the exact later source asset has been visually matched and each anchor/interaction region has been checked.

This is **asset/document provenance drift**, not a new map architecture.

---

## Land of Fire current production binding

Land of Fire Fire `(10)` has completed the required source/geometry revalidation.

Current production authority:

- **Asset path:** `Backgrounds/inside_LOF.png`
- **Git blob:** `b1300c48e786981f610f7a46c82d92c245da2d1c`
- **Native canvas:** **1536 × 1024**
- **Geometry authority:** `Documentation/Maps/Land of Fire Regional Hotspot Calibration v2.md`
- **Revalidation date:** 9 September 2026

The current binary entered the interactive-map lineage at commit `94cddaf818d2b2c873ecd4ad7d53c6f0a116b851` and was later moved to the present `Backgrounds/` path without binary change at commit `04975a8d3f837509c0eb3b79aac1c33fec9e2b26`.

The v2 calibration explicitly revalidated all regional zones, public anchors/interaction regions, service anchors, optional anchors/interaction regions, concealed/event reservations/suspicion anchors, and all twelve route control-point chains against this exact Fire `(10)` master. No geometry changes were required after revalidation.

Therefore:

> **Land of Fire v2 is the current production geometry/source-binding authority.**

> **Land of Fire v1 remains historical provenance for `inside_LOF(9).PNG` and must not regain current-master authority.**

This closes source binding and presentation geometry only. Runtime responsive alignment, input/focus/accessibility non-leakage, and Golden/regression status remain separate implementation verification.

---

## Konoha calibration authority

Current Library authority confirms:

`Konoha_Hotspot_Calibration_v2.md`

explicitly:

- **supersedes** `Konoha_Hotspot_Calibration_v1.md`;
- binds to approved Konoha master `konoha(3).png`;
- uses canvas **1536×1024**;
- changes no artwork;
- remains a map/UI spatial specification only, not gameplay authority.

Therefore:

> **Konoha v2 is the current production calibration source.**

> **Konoha v1 must not regain authority accidentally.**

---

## Map authority boundary

Regardless of artwork revision, regional/Konoha calibration documents provide presentation geometry only.

They do not own:

- world/location existence;
- event identity;
- observer Knowledge;
- discovery history;
- event eligibility;
- actionability;
- PL calibration;
- matchup assessment;
- mission/activity truth;
- Chronicle history;
- reward truth.

Preserve:

> **World Truth → Player/Character Knowledge → Discovery Record → Presentation State → Available Interaction → Result**

and:

> **location identity ≠ event identity**

> **hotspot identity ≠ location identity ≠ event identity ≠ opportunity identity**

> **map presentation ≠ PL authority**

---

## Revalidation procedure for each later regional master

Before promoting a later regional master to production source binding:

1. identify the exact source image and native canvas;
2. visually compare major landmarks against the currently bound calibration;
3. verify every public/optional/concealed anchor against the new art;
4. verify interaction-region bounds, not only icon anchors;
5. verify route control points and country-specific spatial layers;
6. preserve native width differences where applicable;
7. update the calibration document's source-binding header/version;
8. retain the old binding as historical provenance rather than silently rewriting which art it described;
9. run responsive/unknown-location non-leakage checks after implementation.

Until that process completes for a later artwork master, that artwork may be visually preferred while its old coordinate set remains **not automatically transferable**.
