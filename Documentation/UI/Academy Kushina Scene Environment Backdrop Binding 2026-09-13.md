# Shinobi Chronicles — Academy Kushina Scene Environment Backdrop Binding

**Date:** 2026-09-13  
**Owner:** UI / Assets  
**Status:** **FINAL ALPHA PRESENTATION AUTHORITY — GitHub #169 UI / Assets slice CLOSED**

## 1. Consumed Story authority

This binding consumes:

`Documentation/Story/Academy_Kushina_Ordinary_Branch_Production_Endings_and_Setting_2026-09-13.md`

Writing closes the complete current `academy_kushina` Origin setting as:

> **Konoha Ninja Academy — exterior practical training courtyard — daytime.**

All three ordinary endings and the existing `correct_formula -> reverse summon -> Gerotora` sequence remain in that same courtyard. No second Gerotora environment is required.

## 2. Stable environment identity

The existing runtime Scene Environment library already contains the exact compatible stable identity:

`konoha_academy_courtyard_day`

Current runtime semantics associate it with:

- `konoha:academy:courtyard`
- `konoha:academy:exterior`

This is the correct presentation identity for Writing's Academy exterior practical training courtyard. Do **not** create a new Kushina-specific environment ID and do **not** substitute the indoor `konoha_academy_classroom_day` identity.

## 3. Approved physical backdrop

UI / Assets ratifies the existing physical master:

`Scene backdrops/academy_training_ground_courtyard.png`

as the approved Alpha physical backdrop for:

`konoha_academy_courtyard_day`

This is reuse of the existing Academy / Training Courtyard master, not new image production.

Authoritative mapping:

```text
konoha_academy_courtyard_day
→ Scene backdrops/academy_training_ground_courtyard.png
```

No new image generation is required for GitHub #169.

## 4. Kushina scene projection

Every beat in the current `academy_kushina` Origin may use:

```js
environmentRef:{environmentId:"konoha_academy_courtyard_day"}
```

This includes:

- `kus_crisis`;
- all three new ordinary-branch beat chains;
- `kus_reverse`;
- Gerotora first-contact dialogue/choice/closure beats;
- the final Gerotora departure beat.

The backdrop is presentation only. It does not create a new World location, occurrence, Summon state, Technique state, or branch consequence.

## 5. Exact path-case runtime caveat

Current repository physical authority uses the lowercase directory name:

`Scene backdrops/`

while the older runtime helper constant currently says:

`Scene Backdrops/`

Those strings are **not equivalent on case-sensitive hosts**.

For #169, Coding must preserve the exact approved physical path above. The existing runtime already supports explicit registration through `assetManifest.sceneBackdrops` / `registerSceneBackdropAssetPath(...)`, so the implementation-ready mapping is equivalent to:

```js
registerSceneBackdropAssetPath(
  "konoha_academy_courtyard_day",
  "Scene backdrops/academy_training_ground_courtyard.png"
);
```

Do not derive this file through `getExpectedAlphaSceneBackdropAssetPath()` while its root constant still disagrees with the physical repository path. A later global folder-case migration, if Coding performs one, is separate and must not silently invalidate this approved mapping.

## 6. Boundaries preserved

- `environmentRef` != World identity invention;
- presentation backdrop != branch result;
- ordinary branch != failed Gerotora branch;
- no Gerotora appearance != missing Story;
- same courtyard across the Origin != identical event state;
- physical asset reuse != new image generation;
- UI / Assets approval != Coding implementation != browser validation != Golden/regression GREEN.

## 7. Completion

**GitHub #169 UI / Assets slice: CLOSED.**

Final required mapping:

```text
environmentId: konoha_academy_courtyard_day
physicalPath: Scene backdrops/academy_training_ground_courtyard.png
```

No second environment is required for the Gerotora branch.
