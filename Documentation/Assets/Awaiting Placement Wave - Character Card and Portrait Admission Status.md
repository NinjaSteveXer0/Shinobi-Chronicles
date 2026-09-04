# Shinobi Chronicles — Awaiting Placement Wave: Character Card and Portrait Admission Status

**Date:** 2026-09-04  
**Owner:** Character Creation / Assets  
**Status:** **ASSETS SCOPE CLOSED; LIVE PRODUCTION ADMISSION NOT YET READY**

---

## Purpose

This document closes the Character Creation / Assets side of the awaiting-placement production-admission question without fabricating repository mappings or silently expanding the live production gate.

Current live production gate remains:

**85 Characters + 17 Entities = 102 production identities**

The awaiting-placement wave is already defined upstream as:

**12 Characters + 1 Entity/Summon = 13 identities**

If the complete wave is eventually admitted, the live gate becomes:

**97 Characters + 18 Entities = 115 production identities**

Character Creation / Assets confirms that the intended admission scope is the **complete 13-identity awaiting-placement wave**, not a partial Kiba/Hinata/Sumire/Kakuzu/Nue-only carveout.

However, **scope selection ≠ live admission readiness**.

---

## Awaiting-placement identities

### Characters

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

### Entity / Summon

- `nue`

Preserve:

> `sj_kiba` is the only valid Kiba representation ID for this card/representation. Do not create `s_jkiba`.

---

## Collectible-card asset status

All thirteen awaiting-placement identities have an approved Character Creation visual/card direction.

The eleven cards recently created/reviewed in Character Creation were explicitly approved by the user:

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

Previously approved Character Creation assets also exist for:

- `chunin_iruka`
- `sj_anko`

This closes **visual approval**, not repository ingestion.

No exact production `collectibleCard` repository path is authored here unless that path is separately verified in the live repository. Character Creation / Assets must not invent a path merely because a card image exists in conversation or local generation output.

Likewise, visual approval of a generated image does not by itself prove that the current repository copy is already exact **980×1400** or that the correct production file has been committed.

Therefore each awaiting-placement identity still requires, before live admission:

1. exact production card normalization where required;
2. explicit repository ingestion;
3. exact verified `collectibleCard` path;
4. ACTIVE/superseded asset status in the production manifest.

---

## `uiPortrait` status

The current ratified/approved `uiPortrait` authority remains exactly **102/102** for the current live production gate.

The thirteen awaiting-placement identities do **not** currently have a Character Creation / Assets-approved production `uiPortrait` path in the 102-row manifest.

The user has explicitly chosen to defer Battle/UI Portrait creation for these newly approved cards until after the immediate Alpha-completion push.

Therefore Character Creation / Assets does **not** authorise:

- automatic crop/reuse of collectible-card art as `uiPortrait`;
- guessed portrait paths;
- filename-derived portrait selection;
- generic participant image data as permanent portrait authority;
- silent expansion of the 102-row portrait manifest.

Preserve:

> **collectible Character Card ≠ `uiPortrait`**

> **asset approval ≠ production admission**

> **production admission ≠ acquisition**

> **Registry identity ≠ asset filename**

---

## Production-admission ruling from Assets

Character Creation / Assets closes the binary scope question as follows:

### Intended eventual scope: **B — complete awaiting-placement wave**

When these assets are promoted into live production, they should be admitted as the complete already-authorised wave:

**12 Characters + 1 Entity/Summon**

which would move the live gate from:

**85 Characters + 17 Entities = 102**

→

**97 Characters + 18 Entities = 115**

### Immediate live gate: **do not flip yet**

The current live production gate must remain **102** until the complete admission prerequisites are closed.

The missing Assets-side prerequisites are:

- exact verified/committed `collectibleCard` repository mapping for all 13;
- approved `uiPortrait` for all 13;
- exact verified `uiPortrait` repository mapping/status for all 13.

Because the portrait pass is intentionally deferred during the current Alpha push, Coding must not convert this eventual-scope decision into a premature live Registry/portrait gate expansion.

This is not a request to reopen Combat semantics. Coding may implement already-closed pairing/bond semantics against stable IDs where architecturally appropriate, but the Golden **live production admission gate** remains 102 until Registry and Assets explicitly complete the 115 admission package.

---

## Downstream closure sequence

1. **Character Creation / Assets** — normalize/ingest/verify the 13 collectible cards and later produce/approve 13 `uiPortrait`s.
2. **Registry** — ratify exact identity → `collectibleCard` + `uiPortrait` mappings for the complete wave.
3. **Coding** — extend live Registry/portrait Golden gates from 102 → 115 only after those mappings are complete.
4. **CI** — prove exact expected counts, unique IDs/paths, decode success and required dimensions.

Until then:

> **B is the intended admission scope, but 102 remains the live production gate.**

---

## Ownership boundary

- Character Creation / Assets owns approved visual identity, production card/portrait asset selection and supersession.
- Registry owns production identity admission and identity → asset mapping ratification.
- Coding owns runtime ingestion/resolution and Golden Regression.
- Combat/PL calibration does not itself admit identities into live production.

