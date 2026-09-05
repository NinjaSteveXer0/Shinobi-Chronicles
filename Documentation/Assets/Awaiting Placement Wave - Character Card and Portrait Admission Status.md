# Shinobi Chronicles — Awaiting Placement Wave: Character Card and Portrait Admission Status

**Date:** 2026-09-04  
**Owner:** Character Creation / Assets  
**Status:** **FINAL WAVE SCOPE CLOSED — 13 CHARACTERS + NUE; LIVE GATE REMAINS 102 PENDING ASSET INGESTION / PORTRAITS**

---

## Purpose

This document is the current Character Creation / Assets authority for the complete awaiting-placement admission wave.

It supersedes the earlier Assets wording that stopped at **12 Characters + Nue = 115**.

Registry/PL has now explicitly added the final Character representation:

`kurama_resonance_himawari`

Therefore the complete intended admission wave is now:

**13 Characters + 1 Entity/Summon = 14 identities**

If and only if the complete wave is later admitted into live production, the production gate becomes:

**98 Characters + 18 Entities = 116 live production identities.**

The current live gate remains:

**85 Characters + 17 Entities = 102**

until the complete runtime asset projection package is ready and Coding performs admission.

Preserve:

> **scope selection ≠ live admission readiness**

> **asset approval ≠ production admission**

> **production admission ≠ acquisition**

> **Registry identity ≠ asset filename**

---

## Final awaiting-placement identities

### Characters — 13

- `chunin_iruka`
- `sj_anko`
- `chunin_fugaku`
- `chunin_itama`
- `genin_mikoto`
- `genin_orochimaru`
- `akatsuki_kakuzu`
- `sj_kiba`
- `sj_nono`
- `sannin_tenten`
- `sannin_hinata`
- `sannin_sumire`
- `kurama_resonance_himawari`

### Entity / Summon — 1

- `nue`

All fourteen are intended **ACTIVE when admitted**. None replaces or supersedes an existing live production identity.

Exact Kiba representation ID:

`sj_kiba`

Do not create `s_jkiba`.

Akamaru remains separately source-addressable as:

`akamaru`

classification:

`source_only_integrated_participant`

role:

`companion`

This does not create an additional collectible/Entity/Summon/slot/turn/PL pool.

---

## Character Creation visual approval

Character Creation has approved the visual/card designs for the complete fourteen-identity awaiting-placement wave.

Approved recent cards include:

- `chunin_fugaku`
- `chunin_itama`
- `genin_mikoto`
- `genin_orochimaru`
- `akatsuki_kakuzu`
- `sj_kiba`
- `sj_nono`
- `sannin_tenten`
- `sannin_hinata`
- `sannin_sumire`
- `nue`
- `kurama_resonance_himawari`

Previously approved awaiting-placement cards:

- `chunin_iruka`
- `sj_anko`

`kurama_resonance_himawari` is the approved premium Character card titled **KURAMA RESONANCE / HIMAWARI**. Its hosted/resonance mechanics are not inferred from artwork; Registry/PL and Combat own those semantics.

The separately approved **Chakra Mode Himawari** card is **not** added to this production-admission wave by inference. It requires its own Registry/PL admission authority if it is later promoted.

---

## Collectible-card production status

Visual approval does not by itself prove repository ingestion.

The generated/approved source cards exist in Character Creation working material, and the current source images used for this wave have been checked as suitable for non-generative normalization to the locked collectible contract:

**980 × 1400 exact**

However, an exact runtime `collectibleCard` repository path is authoritative only after the corresponding production file is actually committed/verified in the Shinobi Chronicles repository.

Assets must not publish a fake path simply because the intended category/filename appears obvious.

Before live admission, each of the fourteen therefore still requires:

1. exact production normalization where required;
2. repository ingestion;
3. exact verified `collectibleCard` repository path;
4. explicit **ACTIVE** asset status.

---

## `uiPortrait` status

The current approved/ratified `uiPortrait` authority remains exactly **102/102** for the current live gate.

The fourteen awaiting-placement identities do **not** yet have approved production `uiPortrait` mappings in that manifest.

The user has explicitly chosen:

> **Alpha completion first; Battle/UI Portraits for these new cards later.**

Therefore Assets does **not** authorise:

- automatic card cropping as a permanent portrait;
- guessed portrait paths;
- filename-derived portrait selection;
- generic participant-image fallback as portrait authority;
- silent expansion of the current 102-row portrait manifest.

Preserve:

> **collectible Character Card ≠ `uiPortrait`**

> **Registry identity ready ≠ portrait asset approved**

> **presentation asset identity ≠ production ontology**

---

## Kurama Resonance Himawari boundary

Stable Registry representation ID:

`kurama_resonance_himawari`

Display:

**Kurama Resonance Himawari**

Registry/PL authority supplied upstream:

- Stats: `112 / 106 / 48 / 70 / 110 / 76 / 126`
- Base PL: **118**

This is a dedicated hosted/resonance Character representation.

Assets must not visually or structurally imply a separate Kurama Battle participant or additional Kurama ownership transaction.

Do not infer or create:

- `nine_tails` projection;
- `yang_kurama` projection;
- `yin_kurama` projection;
- `kurama_complete` projection;
- second Kurama participant;
- Sumire/Nue-style acquisition semantics.

Its approved artwork is presentation only; embodied resonance authority comes from Registry/PL/Combat.

---

## Production-admission ruling from Assets

### Intended eventual scope: **FINAL COMPLETE WAVE — 13 Characters + Nue**

Prospective gate after full admission:

**98 Characters + 18 Entities = 116**

### Immediate live gate: **remain 102**

Do not flip the runtime Registry/card/portrait Golden gates until the complete fourteen-row production projection is ready.

The outstanding Assets inputs are:

- exact committed/verified `collectibleCard` path + ACTIVE status for all 14;
- approved square `uiPortrait` for all 14;
- exact committed/verified `uiPortrait` path + ACTIVE status for all 14.

Because portrait production is intentionally deferred during the Alpha push, this document does **not** authorise Coding to half-admit a subset or fabricate missing projections.

---

## Downstream closure sequence

1. **Assets** — ingest/verify the fourteen collectible cards.
2. **Assets** — later create/approve fourteen square `uiPortrait`s.
3. **Registry** — ratify exact fourteen-row identity → `collectibleCard` + `uiPortrait` mappings.
4. **Coding** — admit all thirteen Characters + `nue` as one complete batch.
5. Expected live counts become **98 Characters + 18 Entities = 116**.
6. Registry/card/portrait Golden gates extend **102 → 116**.
7. **CI** proves exact counts, unique IDs/paths, decode success, required dimensions and no alias drift.

Until then:

> **116 is the locked destination for this wave; 102 remains the current live gate.**

---

## Ownership boundary

- **Character Creation / Assets:** approved visual identity, card/portrait asset selection, normalization, repository asset ingestion and supersession.
- **Registry:** production identity admission and ratified identity → asset projections.
- **Combat / PL:** mechanics and numerical authority; neither admits assets by itself.
- **Coding:** runtime ingestion/resolution and Golden Regression.
