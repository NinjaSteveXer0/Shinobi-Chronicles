# Academy Origin Missing NPC Card Path Reconciliation

**Date:** 2026-09-28  
**Owner:** UI / Assets  
**Status:** **COMPLETE PATH AUDIT — 17 PHYSICAL STORY ACTOR CARDS ABSENT / CHARACTER CREATION REQUIRED**  
**Parent:** #418  
**Upstream:** #416  
**Coding consumer:** PR #417 / `coding/issue-105-origin-presentation-repair-current`

## Authority checked

UI / Assets re-audited current live production authority before classifying the missing actor rows.

Checked:
- live `main` at `da811fbda363dc85fff848e2377f8c2fa38be73d`;
- current Coding presentation candidate `7bc6dd20ae6602317a8e033f19437c257f2b9572`;
- current Origin/backdrop integration branch `43420816c055a1f0a5b2c6e81e8f4408542062f7`;
- current Wasabi Golden branch `8a14753cbc8e501bddb2eb7731c026ee31a44c94`;
- current Obito/Mirai presentation branch `5bad8162a60fb08b6ac5074edc82ef3f8c319111`;
- current Obito Golden branch `8fc9bf50e332a3c0a8800a91940a0f3c6dddb281`;
- live `NPC/`, `Enemies/`, `Assets/` and `Portraits/` inventories;
- direct repository searches for the Stephen-reported filenames `academy_student_fem_1.png` and `pursuit_target.png`;
- recent asset/NPC commit history.

The exact reported filenames are not present in durable GitHub authority. No non-obvious live-main file has an authoritative identity mapping to any row below.

## 17-row result

| # | Origin | Physical Story actor | Result |
|---:|---|---|---|
| 1 | Kushina | Academy instructor | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 2 | Kushina | Academy classmate | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 3 | Iwabee | Academy instructor | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 4 | Metal Lee | stable inviting Genin — `metal_origin_inviting_genin` | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 5 | Metal Lee | threatened Academy student | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 6 | Obito | CIVILIAN | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 7 | Obito | VENDOR | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 8 | Obito | CUSTODIAN | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 9 | Obito | DELIVERY WORKER | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 10 | Obito | ACADEMY INSTRUCTOR | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 11 | Hinata | YOUNGER STUDENT | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 12 | Wasabi Izuno | ACADEMY STUDENT | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 13 | Wasabi Izuno | ACADEMY STUDENT 2 | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 14 | Wasabi Izuno | PROCTOR | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 15 | Wasabi Izuno | pursuit TARGET | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 16 | Mirai | PORTER | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |
| 17 | Mirai | CHECKPOINT INSTRUCTOR | **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED** |

## Explicit non-substitution rules

- Do not map an arbitrary collectible Genin card to `metal_origin_inviting_genin`.
- Do not reuse protagonist collectible cards as unnamed NPCs.
- Do not treat an existing Battle portrait as a Story actor card.
- Do not infer identity from visual similarity or filename.
- Mirai presentation remains observer-facing: concealed instructor truth does not permit premature instructor-card projection.
- Physical actor cards appear only while that actor is physically present.

## Backdrop correction consumed from #418

The following older manifest statements are stale as Browser-Golden blockers:

### Kushina
Current Story successor authority binds **every current Origin beat**, including the accidental reverse summon / Gerotora material, to:

`Scene backdrops/academy_training_ground_courtyard.png`

No dedicated reverse-summon backdrop is required for current Alpha.

### Iwabee
Current Story successor authority binds **every current Origin scene and conditional Battle environment** to:

`Scene backdrops/academy_training_ground_courtyard.png`

Damaged / reshaped terrain is occurrence state, not a bespoke backdrop requirement.

### Metal Lee
Current Story successor authority binds **every current Origin scene and spar environment** to:

`Scene backdrops/academy_training_ground_courtyard.png`

No Metal-specific backdrop is required for current Alpha.

Therefore the projection manifest's older “waiting for dedicated/alternate backdrop sync” language for these three Origins must not block Browser Golden.

Optional alternate-angle art may still exist or be produced for presentation quality, but optional art != current required scene binding.

## Existing assets explicitly preserved

This audit does not reopen or duplicate already-authoritative files such as:
- `NPC/hyuga_instructor.png`
- `NPC/hyuga_sparring_partner.png`
- `NPC/izuno_instructor.png`
- `NPC/kurenai_instructor.png`
- `NPC/menma_instructor.png`
- `NPC/mirai_instructor.png`
- `NPC/traveller.png`
- `NPC/escort.png`
- `Enemies/rogue_genin.png`
- `Enemies Portraits/rogue_genin.png`
- Gerotora Story/support assets
- current approved protagonist cards and already-bound Origin backdrops.

## Production consequence

All 17 unresolved rows now have one exact status:

> **PHYSICAL ASSET ABSENT — CHARACTER CREATION REQUIRED**

Coding must continue using safe non-guessed fallbacks until exact approved binaries are committed and UI / Assets can publish exact production paths + blob SHAs.

The Project image lock remains binding. This audit does **not** authorise image generation.

## Closure

UI / Assets has completed the path-reconciliation portion of #418.

Next physical-asset owner:
**Character Creation / Visuals**.

Once approved binaries are committed, UI / Assets can perform a finite path-binding return to Coding / #416 without reopening Story semantics.
