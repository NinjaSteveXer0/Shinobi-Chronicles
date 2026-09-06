# Shinobi Chronicles — Character Creation Supplemental Portrait Handoff

**Date:** 2026-09-06  
**Owner/status:** Character Creation / Visuals — **GENERATION COMPLETE / USER ACCEPTED; ASSET PROJECTION + BINARY COMMIT PENDING**

---

## Purpose

This records the supplemental Battle/UI portrait work completed after the final-116 Character Creation portrait cohort.

This is a **visual-production handoff**, not a silent Registry or runtime admission change.

Preserve:

> **Character Creation visual completion ≠ Assets path projection ≠ Registry admission ≠ Coding implementation/runtime validation.**

> **collectible Character Card ≠ `uiPortrait`.**

The required portrait contract remains:

- exact production target: **1024 × 1024**;
- square;
- frameless;
- no text/nameplate/card border/icon clutter;
- purpose-composed for Battle/UI readability;
- exact representation fidelity.

The generated visual masters were produced in the Character Creation workspace and accepted by Stephen. Their final repository filenames/paths must be explicitly projected by Assets when the binary files are committed.

---

## A. Existing portrait projections requiring visual supersession / upgrade

These identities already have older portrait authority in the current Battle Portrait manifest. The new Character Creation artwork is intended to **supersede the existing visual binary**, not create a duplicate Registry identity.

| Work item | Registry / authority identity | Current GitHub portrait authority before supersession | Character Creation result |
|---|---|---|---|
| `triple_rashomon` | `triple_rashomon` | `Assets/Portraits/Summons/rashomon.png` | **NEW UPGRADED VISUAL COMPLETE** |
| `iron_maiden` | `iron_maiden` | `Assets/Portraits/Summons/maiden.png` | **NEW UPGRADED VISUAL COMPLETE** |
| `black_sun_himawari` | `black_sun_himawari` | `Assets/Portraits/Rare Cards/black_sun_himawari.png` | **NEW UPGRADED VISUAL COMPLETE** |
| `menma_nine_tails` | `menma_nine_tails` | `Assets/Portraits/Summons/menma_nine_tails.png` | **NEW UPGRADED VISUAL COMPLETE** |
| `nine_tails` | `nine_tails` | `Assets/Portraits/Summons/naruto_nine_tails.png` | **NEW UPGRADED VISUAL COMPLETE** |
| `cs1_hinata` | Registry identity `curse_mark_hinata` / current file `cs1_hinata.png` | `Assets/Portraits/Transformation/cs1_hinata.png` | **NEW UPGRADED VISUAL COMPLETE** |
| `coercive_cloak` | `coercive_cloak` | `Assets/Portraits/Variants/coercive_cloak.png` | **NEW UPGRADED VISUAL COMPLETE** |
| `three_tail_dominion` | `three_tail_dominion` | `Assets/Portraits/Variants/dominion_three_tails.png` | **NEW UPGRADED VISUAL COMPLETE** |
| `six_tail_dominion` | `six_tail_dominion` | `Assets/Portraits/Variants/dominion_six_tails.png` | **NEW UPGRADED VISUAL COMPLETE** |

### Visual correction locks consumed during production

- `black_sun_himawari`: final portrait was corrected to follow the approved Chakra Mode/Black Sun card representation more closely, including the sunflower shirt, long dark hair, black-sun atmosphere, and **heavier black eye markings** matching the supplied facial reference.
- `six_tail_dominion`: final portrait was corrected away from the initial lunging composition to a **standing, dominant torso-to-ankle/full standing read with the cloak visible**, while preserving the red-black six-tail dominion identity.
- `menma_nine_tails`: beast-only representation; must not collapse into a human Menma portrait or standard orange Nine-Tails.
- `three_tail_dominion`, `six_tail_dominion`, and `coercive_cloak` remain distinct authored Dark Naruto states; visual similarity must not collapse their representation identities.

---

## B. Newly completed portrait visuals needing Assets projection / admission reconciliation

These visual assets were produced because Character Creation lacked a satisfactory dedicated portrait for the exact representation. Their Registry/ontology state is already separately authored where noted; this document does **not** change that semantic authority.

| Character Creation work name | Exact Registry / ontology identity | Existing semantic/card authority | Character Creation result |
|---|---|---|---|
| `breakout_kurama` | `breakout_kurama` | Forced Manifestation Entity; existing older portrait mapping currently points to `Assets/Portraits/Variants/outbreak_kurama.png` | **NEW DEDICATED VISUAL COMPLETE — explicit supersession required** |
| `hosted_entity_black_zetsu` | `black_zetsu` | Hosted Entity | **NEW DEDICATED VISUAL COMPLETE** |
| `kurama_reborn` | `reborn_kurama` | Hosted Entity; Himawari-era reborn Kurama | **NEW DEDICATED VISUAL COMPLETE** |
| `kage_madara` | `kage_madara` | calibrated Character representation; collectible card at `Assets/Kage/kage_madara.png`; production admission separately controlled | **NEW DEDICATED VISUAL COMPLETE** |
| `pakkun` | `pakkun` | calibrated Entity / Summon; collectible card at `Assets/Summons/pakkun.png`; production admission separately controlled | **NEW DEDICATED VISUAL COMPLETE** |

Important naming preservation:

- user/workspace phrase `hosted_entity_black_zetsu` maps to stable Registry identity **`black_zetsu`**;
- user/workspace phrase `kurama_reborn` maps to stable Registry identity **`reborn_kurama`**;
- do not create duplicate Registry IDs merely to mirror portrait filenames.

---

## C. Character Creation closure state

Supplemental portrait wave:

- **9** existing portrait upgrades/supersessions visually complete;
- **5** additional dedicated portrait visuals complete;
- **14 / 14 visual tasks complete**.

Character Creation has no further generation blocker for this listed cohort.

What remains outside Character Creation ownership:

1. Assets receives the accepted binary masters and selects exact repository filenames/paths.
2. Assets commits/replaces the binaries and explicitly supersedes any old mapping where applicable.
3. Assets updates `Documentation/Assets/Battle Portrait Authority and Manifest.md` only after the actual binary paths are authoritative.
4. Registry decides any production admission changes for identities still awaiting admission (`kage_madara`, `pakkun`, `black_zetsu`, `reborn_kurama`, etc.).
5. Coding/CI performs required 1024 × 1024 / corruption / loadability checks and runtime projection validation.

Do not mark an uncommitted generated image as runtime-live merely because Character Creation accepted the visual.

---

## Handoff outcome

**CHARACTER CREATION: COMPLETE FOR THIS 14-PORTRAIT SUPPLEMENTAL WAVE.**

**NEXT OWNER: Assets / production projection.**

Assets should consume the accepted visual masters, commit them, preserve exact Registry identity mappings, and then update portrait authority. Registry/Coding downstream admission and validation remain separate gates.
