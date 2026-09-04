# Shinobi Chronicles — Battle Portrait Registry Ratification

**Status:** REGISTRY RATIFIED — 102 / 102 `uiPortrait` mappings  
**Date:** 2026-09-04

Registry has reviewed and ratifies the complete Character Creation / Assets manifest:

`Documentation/Assets/Battle Portrait Authority and Manifest.md`

Assets closure provenance:

`0db94534d62218123b688f50b2b6ec706ed9afb6`

The Assets document establishes exactly **102 unique production Registry representation IDs → 102 unique approved `uiPortrait` repository paths** for the current **85 Characters + 17 Entities = 102** collectible production gate.

Registry accepts that mapping **exactly as authored**. No filename-normalisation, ID renaming, directory inference, or card-art substitution is authorised.

---

## Ratified projection contract

The binding downstream contract is:

`Registry representation ID → approved uiPortrait exact repository path`

The Assets manifest is the authoritative 102-row data table for that projection.

Preserve:

**collectible Character Card ≠ `uiPortrait`**

**Registry ID ≠ portrait filename**

**physical file presence ≠ approval**

**Assets approval ≠ Registry identity creation**

**Registry ratification ≠ Coding implementation**

A portrait mapping changes presentation only. It does not alter identity, Stats, PL, rank, acquisition, Battle participation, or historical continuity.

---

## Path authority

Current live portrait root:

`Assets/Portraits/`

Current transformation portrait folder:

`Assets/Portraits/Transformation/`

Do not invent:

`Assets/Portraits/Battle/`

`Assets/Portraits/Arena/`

or derive paths by string-transforming Registry IDs.

Deliberate nonmatching examples in the ratified manifest include:

- `academy_iwabee` → `Assets/Portraits/Academy Student/academy_student_iwabe.png`
- `academy_metal_lee` → `Assets/Portraits/Academy Student/academy_student_metal.png`
- `akatsuki_teen_naruto` → `Assets/Portraits/Akatsuki/akatsuki_naruto.png`
- `anbu_ino` → `Assets/Portraits/Anbu/anbu_leader_ino.png`
- `fallen_hokage_sasuke` → `Assets/Portraits/Boss Cards/fallen_hokage.png`
- `sixth_shadow` → `Assets/Portraits/Boss Cards/the_sixth_shadow.png`
- `baryon_mode` → `Assets/Portraits/Transformation/bayron_mode.png`
- `kurama_sovereign` → `Assets/Portraits/Variants/kurama_sovreign.png`

These filename differences are intentional compatibility/presentation facts and must not trigger Registry-ID mutation.

---

## Coding consumer contract

Coding may now implement one dedicated `uiPortrait` resolver/manifest for Battle / Stage / Arena and other square-portrait consumers.

Required behaviour:

1. resolve by exact stable Registry representation ID;
2. return the exact ratified path from the Assets manifest;
3. do not crop or substitute collectible Character Cards;
4. do not use generic participant-image data as permanent fallback authority where a ratified `uiPortrait` exists;
5. do not infer an alternate portrait from filename similarity if a ratified file is missing/broken;
6. surface QA failure and require explicit asset repair/supersession instead of silently changing identity→portrait mapping.

---

## Fresh binary QA remains required

Registry ratification closes **identity → approved portrait path authority**.

It does not certify current PNG bytes.

Before Alpha freeze, Coding/CI must perform a fresh current-repository QA pass across all 102 ratified portrait files proving:

- path exists;
- PNG decodes successfully / is not corrupt;
- dimensions are exactly **1024 × 1024**;
- all 102 expected Registry IDs resolve exactly once;
- no duplicate Registry ID mapping;
- no duplicate path mapping unless explicitly re-authorised (current Assets authority states 102 unique paths);
- no stale path points to an unapproved substitute.

If a file fails QA, repair or explicitly supersede that asset while retaining attributable Registry mapping history. Do not silently map the representation to a different portrait.

---

## Final status

**Character Creation / Assets mapping: CLOSED 102 / 102**

**Registry ratification: CLOSED 102 / 102**

**Coding resolver: NEXT**

**Fresh binary dimension/corruption QA: REQUIRED BEFORE ALPHA FREEZE**
