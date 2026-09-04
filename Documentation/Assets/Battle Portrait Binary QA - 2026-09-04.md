# Shinobi Chronicles — Battle Portrait Binary QA — 2026-09-04

**Status:** CHARACTER CREATION / ASSETS REPAIR + CODING / CI QA — PASS  
**Authority preserved:** 102/102 Registry → `uiPortrait` mappings remain unchanged and ratified.

The earlier fresh binary QA failure was repaired in place under Assets authority and the canonical repository QA was rerun using:

- `tools/qa_battle_portraits.py`
- the existing 102-row approved Assets manifest;
- the existing Registry ratification.

## Repairs applied

Five approved Academy portraits were resampled from **1254 × 1254** to the required **1024 × 1024** at their existing approved paths using high-quality Lanczos resampling:

- `academy_iwabee` → `Assets/Portraits/Academy Student/academy_student_iwabe.png`
- `academy_kakashi` → `Assets/Portraits/Academy Student/academy_student_kakashi.png`
- `academy_kurenai` → `Assets/Portraits/Academy Student/academy_student_kurenai.png`
- `academy_metal_lee` → `Assets/Portraits/Academy Student/academy_student_metal.png`
- `academy_obito` → `Assets/Portraits/Academy Student/academy_student_obito.png`

The approved `shikamaru_avatar_yang` path remained unchanged:

- `Assets/Portraits/Jinchuriki/jshika_ava.png`

Its corrupt/truncated bytes were repaired by restoring the nearest prior decodable **1024 × 1024** revision of that same approved path from Git history.

Restore source commit:

`013b2437569627bcce64a29c0873e49bb275b53b`

This is an in-place asset repair, not a Registry remap and not a portrait substitution.

## Final QA result

- manifest rows: **102 / 102**
- unique Registry IDs: **102 / 102**
- unique approved paths: **102 / 102**
- PNG decode: **102 / 102 PASS**
- dimensions exactly 1024 × 1024: **102 / 102 PASS**
- silent card fallback/substitution: **none authorised**

Preserve:

**approved mapping = unchanged**

**asset repair ≠ Registry identity mutation**

**asset repair ≠ permission for runtime fallback**
