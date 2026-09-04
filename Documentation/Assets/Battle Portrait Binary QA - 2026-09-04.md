# Shinobi Chronicles — Battle Portrait Binary QA — 2026-09-04

**Status:** CODING / CI QA — FAIL, ASSET REPAIR REQUIRED  
**Authority preserved:** 102/102 Registry → `uiPortrait` mappings remain ratified; this report does not authorise path substitution.

Fresh GitHub Actions QA ran against the current repository bytes using:

- `tools/qa_battle_portraits.py`
- `.github/workflows/battle-portrait-qa.yml`
- workflow run `33877639424`

## Structural results

- manifest rows: **102 / 102**
- unique Registry IDs: **102 / 102**
- unique approved paths: **102 / 102**
- PNGs decoding successfully: **101 / 102**
- exact 1024 × 1024: **96 / 102**

## Failing approved assets

### Wrong dimensions — 1254 × 1254 instead of 1024 × 1024

- `academy_iwabee` → `Assets/Portraits/Academy Student/academy_student_iwabe.png`
- `academy_kakashi` → `Assets/Portraits/Academy Student/academy_student_kakashi.png`
- `academy_kurenai` → `Assets/Portraits/Academy Student/academy_student_kurenai.png`
- `academy_metal_lee` → `Assets/Portraits/Academy Student/academy_student_metal.png`
- `academy_obito` → `Assets/Portraits/Academy Student/academy_student_obito.png`

### Decode/corruption failure

- `shikamaru_avatar_yang` → `Assets/Portraits/Jinchuriki/jshika_ava.png`
  - Pillow: `OSError: Truncated File Read`

## Required handling

These are asset-byte failures, not Registry-identity failures.

Do **not**:

- change Registry IDs;
- silently choose a different portrait;
- derive a fallback from filenames;
- crop a collectible Character Card;
- silently resize/substitute at runtime.

Character Creation / Assets should repair the approved file at the same path or explicitly supersede the mapping through the existing asset-authority process. After repair/supersession, rerun the same 102-file binary QA.

Preserve:

**approved mapping ≠ current bytes valid**

**QA failure ≠ permission to substitute another asset**
