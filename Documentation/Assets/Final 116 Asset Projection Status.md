# Shinobi Chronicles — Final 116 Asset Projection Status

**Status:** UI / ASSETS PROJECTION AUTHORITY — COLLECTIBLE CARD MAPPING CLOSED 14/14 / `uiPortrait` PROJECTION BLOCKED 0/14 / LIVE GATE REMAINS 102  
**Date:** 2026-09-05  
**Owner:** UI / Assets

This document answers the final 116 production-admission request from SC Coding / PL-Registry.

The final admission cohort is already closed upstream as **13 Characters + 1 Entity/Summon**, with an atomic destination of:

**98 Characters + 18 Entities = 116**

Current live production remains:

**85 Characters + 17 Entities = 102**

No partial admission is authorised.

## 1. Assets decision

UI / Assets can now close the **collectible-card half** of the requested projection.

All fourteen approved collectible-card binaries physically exist in current `main`, their Character Creation visual designs are already approved, and their exact repository paths are verified below.

UI / Assets therefore marks all fourteen `collectibleCard` projections:

**ACTIVE — Assets approved**

UI / Assets cannot truthfully close the `uiPortrait` half yet.

A fresh recursive current-`main` repository tree audit finds **no dedicated physical portrait binary for any of these fourteen identities** in the physical `Portraits/` hierarchy. The current approved portrait authority therefore remains the existing 102-wide set.

Accordingly:

**14/14 collectibleCard projections CLOSED / ACTIVE**

**0/14 new `uiPortrait` projections CLOSED**

**full fourteen-row admission projection NOT YET COMPLETE**

**116 live admission remains BLOCKED**

Do not invent portrait paths, derive them from Registry IDs, use generic participant imagery, or crop collectible cards into permanent portraits without explicit asset approval.

## 2. Exact fourteen-row projection status

| Registry ID | collectibleCard | collectibleCard status | uiPortrait | uiPortrait status | Row admission status |
|---|---|---|---|---|---|
| `chunin_iruka` | `Assets/Chunin/chunin_iruka.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `sj_anko` | `Assets/Special Jonin/sj_anko.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `chunin_fugaku` | `Assets/Chunin/chunin_fugaku.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `chunin_itama` | `Assets/Chunin/chunin_itama.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `genin_mikoto` | `Assets/Genin/genin_mikoto.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `genin_orochimaru` | `Assets/Genin/genin_orochimaru.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `akatsuki_kakuzu` | `Assets/Akatsuki/akatsuki_kakuzu.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `sj_kiba` | `Assets/Special Jonin/sj_kiba.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `sj_nono` | `Assets/Special Jonin/sj_nono.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `sannin_tenten` | `Assets/Sannin/sannin_tenten.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `sannin_hinata` | `Assets/Sannin/sannin_hinata.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `sannin_sumire` | `Assets/Sannin/sannin_sumire.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `kurama_resonance_himawari` | `Assets/Rare Cards/kurama_resonance_himawari.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |
| `nue` | `Assets/Summons/nue.png` | **ACTIVE — Assets approved** | `null` | **REQUIRED — no approved production portrait path exists** | **BLOCKED** |

Exact Kiba production identity remains:

`sj_kiba`

Do not create `s_jkiba`.

## 3. Machine-consumable projection

The following JSON is the exact Assets projection state for the fourteen-row wave as of this authority:

```json
[
  {"registryId":"chunin_iruka","collectibleCard":"Assets/Chunin/chunin_iruka.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"sj_anko","collectibleCard":"Assets/Special Jonin/sj_anko.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"chunin_fugaku","collectibleCard":"Assets/Chunin/chunin_fugaku.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"chunin_itama","collectibleCard":"Assets/Chunin/chunin_itama.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"genin_mikoto","collectibleCard":"Assets/Genin/genin_mikoto.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"genin_orochimaru","collectibleCard":"Assets/Genin/genin_orochimaru.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"akatsuki_kakuzu","collectibleCard":"Assets/Akatsuki/akatsuki_kakuzu.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"sj_kiba","collectibleCard":"Assets/Special Jonin/sj_kiba.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"sj_nono","collectibleCard":"Assets/Special Jonin/sj_nono.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"sannin_tenten","collectibleCard":"Assets/Sannin/sannin_tenten.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"sannin_hinata","collectibleCard":"Assets/Sannin/sannin_hinata.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"sannin_sumire","collectibleCard":"Assets/Sannin/sannin_sumire.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"kurama_resonance_himawari","collectibleCard":"Assets/Rare Cards/kurama_resonance_himawari.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"},
  {"registryId":"nue","collectibleCard":"Assets/Summons/nue.png","collectibleCardStatus":"ACTIVE","uiPortrait":null,"uiPortraitStatus":"REQUIRED"}
]
```

This payload is machine-consumable for **staging / diagnostics only**. It is deliberately **not** a Registry-ratifiable live-admission projection because `uiPortrait` is unresolved for every row.

## 4. Portrait requirement

Every new production representation requires one explicitly approved dedicated square `uiPortrait` projection under the existing Battle/UI portrait contract:

- exact **1024×1024**;
- frameless square composition;
- correct representation identity;
- exact committed repository path;
- explicit **ACTIVE — Assets approved** status;
- unique Registry ID and unique path;
- binary decode/dimension QA before the 116 gate goes live.

Physical repository root for current portrait binaries is `Portraits/`.

This document does **not** pre-authorise filenames or category subpaths for the missing fourteen portraits. Exact paths must be published only after the actual approved binaries are committed.

## 5. Non-collapse rules

Preserve:

**collectible Character Card ≠ `uiPortrait`**

**Registry identity ≠ asset filename**

**physical file presence ≠ portrait approval**

**collectible mapping approval ≠ complete admission projection**

**asset approval ≠ mechanical authority**

**production admission ≠ acquisition**

**partial asset readiness ≠ partial live admission**

## 6. Final gate

The current exact Assets blocker is now reduced to one thing:

> **Create/approve/commit fourteen dedicated square `uiPortrait` binaries and publish their exact paths as ACTIVE.**

Once all fourteen exist, UI / Assets can replace each `null` above with the exact approved repository path and publish the complete fourteen-row ACTIVE projection for Registry ratification.

Until then:

**102 remains live.**

**116 is the locked atomic destination, not a partially live state.**
