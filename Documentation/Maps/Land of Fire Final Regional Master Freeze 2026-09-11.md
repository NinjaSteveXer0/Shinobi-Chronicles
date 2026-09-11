# Shinobi Chronicles — Land of Fire Final Regional Master Freeze

**Date:** 2026-09-11  
**Owner:** World / Missions / Events / Rewards  
**Source lane:** GitHub #55  
**Status:** **FINAL VISUAL MASTER SELECTED / BYTE-FROZEN — EXACT PRODUCTION BINARY LANDING STILL PENDING**

## 1. Decision

The final selected Land of Fire regional master is visually approved and is now **byte-frozen** for production consumption.

No further redraw, substitute generation, crop, resize, recompression, re-encoding, colour adjustment or other pixel mutation is authorised for the selected master under #55 unless a later explicit authority reopens it.

World geometry / hotspot recalibration must bind only to the exact bytes identified below.

## 2. Exact frozen binary identity

Intended production path:

`Backgrounds/inside_LOF.png`

Frozen selected asset metadata:

- format: PNG
- native dimensions: **1536 × 1024 px**
- byte size: **4,305,512 bytes**
- SHA-256: **`4642131e4b7daa62ae62c7f7bc8da66cb5a0fa57fc24e82d2e8ff8d3d25e419e`**
- Git blob SHA: **`8f45caabc879c5e24861cd9396f95c6dde9f291c`**

These values identify the exact accepted final candidate. Hash equality, not filename similarity, is the production proof.

## 3. Current repository mismatch at freeze time

At the time of this freeze, current `main` still contains a different binary at:

`Backgrounds/inside_LOF.png`

Current-main blob observed by World:

- Git blob SHA: **`b13070a2c72f2167c0605fc2900adce1d5beb914`**
- byte size: **6,050,315 bytes**

Therefore #55 is **not yet physically complete in version control**.

The final visual/design decision is closed; the remaining task is a one-file exact binary landing.

## 4. Required landing rule

Replace the current production binary with the exact frozen bytes so that:

`Backgrounds/inside_LOF.png`

resolves to:

`8f45caabc879c5e24861cd9396f95c6dde9f291c`

Do not recreate the PNG from a screenshot, export, browser save, image editor, regenerated prompt or compressed copy. The exact selected bytes must be used.

## 5. World recalibration gate

Until the production path resolves to the frozen blob above:

- do not publish final Fire v3 coordinates;
- do not bind the standing-event ecology to new pixel geometry;
- do not copy legacy Fire coordinates onto the selected artwork;
- do not mark #55 complete merely because the design is visually approved.

Once the exact binary is present at the production path, World may immediately perform the final regional calibration covering at minimum:

- stable zones / regions;
- public destinations;
- optional/discoverable destinations;
- concealed reservations / known-unknown projection anchors;
- service/activity hosts where applicable;
- route network;
- `fire:O21` Whisper Woods;
- `fire:R13` Whisper Woods Approach;
- standing World-event hosts;
- Arc-pressure hosts;
- Story locator / investigation hosts;
- reward/content activation geometry.

## 6. Semantic authority preserved

This freeze does not alter existing Fire semantics. Preserve:

- `location != hotspot != opportunity != event`;
- World Truth != observer Knowledge != presentation;
- public / optional / concealed identities survive visual recalibration unless separately changed by World authority;
- hidden reservations remain zero-leak before legitimate discovery;
- known-unknown projection remains the restrained pulsing golden halo + exactly `????` where authorised;
- Whisper Woods remains one reusable regional location, not a duplicated Story-only place;
- randomness may select among eligible opportunities but never manufacture eligibility.

## 7. Completion condition for #55

#55 may be considered physically frozen/complete only when all are true:

1. `Backgrounds/inside_LOF.png` exists on production `main`;
2. its Git blob SHA is exactly `8f45caabc879c5e24861cd9396f95c6dde9f291c`;
3. its native dimensions remain 1536 × 1024;
4. no later commit has mutated/replaced those bytes without explicit reopening authority;
5. World has consumed that exact binary for the final Fire calibration pass.

Design freeze and binary landing are deliberately distinguished so downstream systems cannot accidentally calibrate against the wrong art.
