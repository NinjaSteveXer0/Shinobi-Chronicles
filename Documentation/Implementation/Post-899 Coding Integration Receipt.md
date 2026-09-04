# Shinobi Chronicles — Post-899 Coding Integration Receipt

**Status:** CODING IMPLEMENTATION RECEIPT — LOCAL CUMULATIVE BUILD VALIDATED  
**Date:** 2026-09-04

This receipt records bounded Coding work performed cumulatively on top of the browser-validated Post-892 source lineage. It does not supersede the owning Rank / Registry / Assets / Combat authority documents.

## Combat baseline

The browser-validated Post-888 Alpha Combat Freeze semantics remain the baseline:

- semantic closure: 20 implemented / 10 explicitly deferred / 0 unresolved;
- deterministic Battle-entry PL;
- only Ruined Gate Cataclysm executable among Alpha Triple Rashōmon Sequence Arts;
- no generic Breakout Kurama forced mid-Battle manifestation bridge.

Post-899 does not re-author those contracts.

## Brick 893 — Menma wider-clearing opposition packages

Exact wider-clearing packages added for the already-authorised opposition identities:

- `test_subject_brute_heavy_swing` — 7 Attack PL;
- `test_subject_brute_body_rush` — 6 Attack PL, no automatic Stun/displacement;
- `test_subject_brute_crushing_clinch` — 0 Attack PL, source-owned `physical_restraint`, live Effective Taijutsu resolver, no hidden restraint scalar;
- `test_subject_unstable_frantic_rush` — 5 Attack PL;
- `test_subject_unstable_chakra_spasm` — 6 Attack PL;
- `test_subject_unstable_panicked_burst` — 7 Attack PL.

Menma's direct tutorial Battle remains exactly `academy_menma` vs `test_subject_altered_shinobi`. Brute and Unstable are not added to that Battle instance.

## Bricks 894–895 — Special Jōnin Alpha catalogue and Recognition boundary

Coding consumes the locked `Documentation/Rank/Special Jonin Alpha Production Catalogue.md` exactly:

- 11 family IDs;
- 33 unique qualification IDs;
- exact namespaced required evidence / competency / supporting / capstone tags;
- existing generic 12-point / 4-record / 2-category / 2-source / 50%-family-cap / verified-capstone policy;
- no Alpha Stat/PL capacity threshold;
- Escort / Protective Detail absent from the executable Alpha catalogue;
- missing historical 2-family / 6-path archaeology is not fabricated.

Qualification earning remains separate from formal rank.

A bounded `commitSpecialJoninRecognition(...)` consumer requires:

- an exact permanently earned Alpha qualification;
- current formal rank `chunin`;
- explicit institutional authority;
- an exact committed `special_jonin_recognition` occurrence identity;
- no authored institutional block.

Recognition mutates only the exact owned character's formal rank to `special_jonin`, preserves the qualification as a separate credential, preserves prior formal-rank progression metadata, and grants no PL/Stat bonus.

## Bricks 896–898 — Battle `uiPortrait` authority

Coding consumes the Registry-ratified Assets projection as one exact immutable 102-row runtime map:

`Registry representation ID → approved uiPortrait path`

The resolver:

- does not derive paths from IDs;
- does not crop/fallback to collectible Character Cards;
- does not use generic participant `image` as permanent portrait authority;
- returns an explicit `missing_authority` state when no ratified mapping exists;
- preserves deliberate filename mismatches from the Assets manifest.

Current Battle roster presentation consumes this resolver. Stage/Arena/Tournament surfaces are not separately fabricated where the current source has no corresponding production consumer; the same resolver is available for those surfaces when they are integrated.

## Brick 899 — cumulative gate

`runAlphaPost899IntegrationDiagnostics()` chains the Post-892 gate and adds:

- Menma wider-clearing package checks;
- exact 11/33 Special Jōnin catalogue checks;
- namespaced evidence non-leak regression;
- qualification vs Recognition separation;
- 102/102 `uiPortrait` ID/path authority checks;
- deliberate filename mismatch checks;
- Battle resolver/no-card-fallback checks.

Local VM/runtime diagnostics are GREEN and the Post-888 Combat Freeze baseline remains preserved.

## Portrait binary QA

Fresh repository-byte QA is intentionally separate from runtime mapping authority. GitHub CI now runs `tools/qa_battle_portraits.py` through `.github/workflows/battle-portrait-qa.yml`.

The first fresh run found six current asset-byte issues. Those are Assets repair/supersession work; Coding does not silently remap or resize approved paths.

**Bible/Assets authority closed ≠ runtime resolver implemented ≠ binary QA passed.**
