# Shinobi Chronicles — Altered Shinobi Battle Presentation Asset Binding

**Date:** 2026-09-13  
**Owner:** UI / Assets  
**Status:** FINAL ALPHA PRESENTATION AUTHORITY — consumes #172

## 1. Stable runtime identity

`test_subject_altered_shinobi`

UI / Assets does not rename this Combat/runtime identity to match any historical filename or display label.

## 2. Approved Battle/Victory presentation asset

Exact approved physical path:

`Enemies Portraits/test_subject_altered_shinobi.png`

Exact presentation mapping:

`test_subject_altered_shinobi -> Enemies Portraits/test_subject_altered_shinobi.png`

Current physical blob on `main` at closure:

`19975fd7644f6e414b614a6ff909ab0d87d81493`

## 3. Provenance / authority

The asset is not genuinely missing. Character Creation / Visuals already corrected the Altered Shinobi representation in commit:

`201f673fc6747d8a08e9c35e9303790fe3245157` — `fixed test subject altered shinobi`

That commit modifies exactly:

`Enemies Portraits/test_subject_altered_shinobi.png`

The Character Creation final archive delta also records this commit as the altered-shinobi correction and records that the old `altered_shinobi` production key is superseded by `test_subject_altered_shinobi`.

Therefore this is an existing approved opposition Battle presentation asset, not a new image-generation dependency.

## 4. Presentation class boundary

This asset is an **enemy/opposition Battle presentation portrait**.

It is not:

- a premium collectible card;
- permission to add the enemy to the playable-character `UI_PORTRAIT_MANIFEST`;
- Registry admission;
- ownership/acquisition authority;
- Combat semantic authority.

Battle and Victory should resolve this same authorised presentation for `test_subject_altered_shinobi` unless a future owning representation contract explicitly supersedes it.

## 5. Coding consumer rule

Where the current enemy row still has `image:null` or equivalent missing presentation authority, Coding should bind the exact approved path above through the existing enemy/Battle presentation seam. Coding must not infer a path from identity strings, substitute another portrait, or rename the runtime identity.

Preserve:

- runtime identity != filename inference;
- enemy Battle presentation != collectible card;
- enemy Battle presentation != playable-character uiPortrait class;
- physical asset != gameplay authority;
- UI mapping != Combat/Registry mutation;
- Battle/Victory presentation consistency != new participant state.
