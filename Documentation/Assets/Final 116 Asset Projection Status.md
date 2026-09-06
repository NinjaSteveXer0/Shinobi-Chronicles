# Shinobi Chronicles — Final 116 Asset Projection Status

**Status:** UI / ASSETS PROJECTION AUTHORITY — COMPLETE 14/14 / READY FOR REGISTRY RATIFICATION  
**Date:** 2026-09-06  
**Owner:** UI / Assets

This document closes the final UI / Assets projection required for the atomic Shinobi Chronicles production-admission move from:

**85 Characters + 17 Entities = 102**

into the already-authorised destination:

**98 Characters + 18 Entities = 116**

No partial live admission is authorised.

The fourteen production representations below now have both:

- an approved collectible-card repository projection where required; and
- an approved dedicated square `uiPortrait` repository projection.

UI / Assets therefore marks the complete fourteen-row projection:

**ACTIVE — Assets approved**

This is presentation/asset authority only.

**Assets projection approval ≠ Registry ratification ≠ Coding live admission ≠ binary QA.**

The live production gate remains **102** until Registry ratifies this exact projection and Coding performs the already-prepared atomic admission.

---

## 1. Current-source audit basis

A fresh audit of the current committed repository tree confirms all fourteen dedicated portrait binaries physically exist under the production `Portraits/` hierarchy.

The portrait batch was committed together in the production source wave that added the exact fourteen required representations. The audit preserves the committed repository spelling and casing rather than deriving paths from Registry IDs.

Important exact-path example:

`chunin_itama` → `Portraits/Chunin/chunin_Itama.png`

The capital `I` in `chunin_Itama.png` is authoritative for the current committed file.

Exact Kiba Registry identity remains:

`sj_kiba`

Never create `s_jkiba`.

---

## 2. Complete fourteen-row production projection

| Registry ID | collectibleCard | uiPortrait | Assets status |
|---|---|---|---|
| `chunin_iruka` | `Assets/Chunin/chunin_iruka.png` | `Portraits/Chunin/chunin_iruka.png` | **ACTIVE** |
| `sj_anko` | `Assets/Special Jonin/sj_anko.png` | `Portraits/Special Jonin/sj_anko.png` | **ACTIVE** |
| `chunin_fugaku` | `Assets/Chunin/chunin_fugaku.png` | `Portraits/Chunin/chunin_fugaku.png` | **ACTIVE** |
| `chunin_itama` | `Assets/Chunin/chunin_itama.png` | `Portraits/Chunin/chunin_Itama.png` | **ACTIVE** |
| `genin_mikoto` | `Assets/Genin/genin_mikoto.png` | `Portraits/Genin/genin_mikoto.png` | **ACTIVE** |
| `genin_orochimaru` | `Assets/Genin/genin_orochimaru.png` | `Portraits/Genin/genin_orochimaru.png` | **ACTIVE** |
| `akatsuki_kakuzu` | `Assets/Akatsuki/akatsuki_kakuzu.png` | `Portraits/Akatsuki/akatsuki_kakuzu.png` | **ACTIVE** |
| `sj_kiba` | `Assets/Special Jonin/sj_kiba.png` | `Portraits/Special Jonin/sj_kiba.png` | **ACTIVE** |
| `sj_nono` | `Assets/Special Jonin/sj_nono.png` | `Portraits/Special Jonin/sj_nono.png` | **ACTIVE** |
| `sannin_tenten` | `Assets/Sannin/sannin_tenten.png` | `Portraits/Sannin/sannin_tenten.png` | **ACTIVE** |
| `sannin_hinata` | `Assets/Sannin/sannin_hinata.png` | `Portraits/Sannin/sannin_hinata.png` | **ACTIVE** |
| `sannin_sumire` | `Assets/Sannin/sannin_sumire.png` | `Portraits/Sannin/sannin_sumire.png` | **ACTIVE** |
| `kurama_resonance_himawari` | `Assets/Rare Cards/kurama_resonance_himawari.png` | `Portraits/Rare Cards/kurama_resonance_himawari.png` | **ACTIVE** |
| `nue` | `Assets/Summons/nue.png` | `Portraits/Summons/nue.png` | **ACTIVE** |

All fourteen rows are now complete.

No path in this table is inferred from a naming convention. These are the exact current committed repository paths selected by UI / Assets authority.

---

## 3. Machine-consumable fourteen-row manifest

```json
[
  {"registryId":"chunin_iruka","collectibleCard":"Assets/Chunin/chunin_iruka.png","uiPortrait":"Portraits/Chunin/chunin_iruka.png","status":"ACTIVE"},
  {"registryId":"sj_anko","collectibleCard":"Assets/Special Jonin/sj_anko.png","uiPortrait":"Portraits/Special Jonin/sj_anko.png","status":"ACTIVE"},
  {"registryId":"chunin_fugaku","collectibleCard":"Assets/Chunin/chunin_fugaku.png","uiPortrait":"Portraits/Chunin/chunin_fugaku.png","status":"ACTIVE"},
  {"registryId":"chunin_itama","collectibleCard":"Assets/Chunin/chunin_itama.png","uiPortrait":"Portraits/Chunin/chunin_Itama.png","status":"ACTIVE"},
  {"registryId":"genin_mikoto","collectibleCard":"Assets/Genin/genin_mikoto.png","uiPortrait":"Portraits/Genin/genin_mikoto.png","status":"ACTIVE"},
  {"registryId":"genin_orochimaru","collectibleCard":"Assets/Genin/genin_orochimaru.png","uiPortrait":"Portraits/Genin/genin_orochimaru.png","status":"ACTIVE"},
  {"registryId":"akatsuki_kakuzu","collectibleCard":"Assets/Akatsuki/akatsuki_kakuzu.png","uiPortrait":"Portraits/Akatsuki/akatsuki_kakuzu.png","status":"ACTIVE"},
  {"registryId":"sj_kiba","collectibleCard":"Assets/Special Jonin/sj_kiba.png","uiPortrait":"Portraits/Special Jonin/sj_kiba.png","status":"ACTIVE"},
  {"registryId":"sj_nono","collectibleCard":"Assets/Special Jonin/sj_nono.png","uiPortrait":"Portraits/Special Jonin/sj_nono.png","status":"ACTIVE"},
  {"registryId":"sannin_tenten","collectibleCard":"Assets/Sannin/sannin_tenten.png","uiPortrait":"Portraits/Sannin/sannin_tenten.png","status":"ACTIVE"},
  {"registryId":"sannin_hinata","collectibleCard":"Assets/Sannin/sannin_hinata.png","uiPortrait":"Portraits/Sannin/sannin_hinata.png","status":"ACTIVE"},
  {"registryId":"sannin_sumire","collectibleCard":"Assets/Sannin/sannin_sumire.png","uiPortrait":"Portraits/Sannin/sannin_sumire.png","status":"ACTIVE"},
  {"registryId":"kurama_resonance_himawari","collectibleCard":"Assets/Rare Cards/kurama_resonance_himawari.png","uiPortrait":"Portraits/Rare Cards/kurama_resonance_himawari.png","status":"ACTIVE"},
  {"registryId":"nue","collectibleCard":"Assets/Summons/nue.png","uiPortrait":"Portraits/Summons/nue.png","status":"ACTIVE"}
]
```

This payload is now suitable for **Registry ratification**.

Coding must consume the ratified projection exactly; it must not regenerate paths from IDs, normalize filename casing, substitute a different portrait, or derive a portrait from collectible-card art.

---

## 4. Binary QA boundary

This closure confirms the **Assets selection/projection** and exact committed paths.

It does **not** claim that UI / Assets independently decoded and dimension-checked all fourteen PNG binaries in this pass. Binary decode, exact 1024×1024 verification, duplicate-path checks and resolver-Golden verification remain Coding / CI validation before or as part of the 116 live-admission gate.

If binary QA finds a bad file:

- do not change the Registry ID;
- do not silently substitute another portrait;
- do not crop a collectible card as fallback;
- repair the approved file in place or explicitly supersede it through Assets authority.

---

## 5. Non-collapse rules

Preserve:

**collectible Character Card ≠ `uiPortrait`**

**Registry identity ≠ asset filename**

**physical file presence ≠ mechanical authority**

**Assets approval ≠ Registry ratification**

**Registry ratification ≠ Coding live admission**

**production admission ≠ acquisition**

**partial readiness ≠ partial live admission**

---

## 6. Final Assets gate

UI / Assets final-116 projection is now:

**14/14 COMPLETE — ACTIVE — READY FOR REGISTRY RATIFICATION**

After Registry ratifies this exact fourteen-row manifest, Coding may execute the already-prepared atomic production move:

**102 → 116**

There is no authorised intermediate live gate.
