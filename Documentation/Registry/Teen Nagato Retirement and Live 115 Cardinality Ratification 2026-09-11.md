# Shinobi Chronicles — Teen Nagato Retirement and Live 115 Cardinality Ratification

**Date:** 2026-09-11  
**Owner:** PL / Registry / Rank  
**Status:** BINDING CURRENT ALPHA PRODUCTION CARDINALITY AUTHORITY  
**Source handoff:** GitHub issue #103

## 1. Decision

PL / Registry / Rank selects **Option A** from issue #103.

The current live Alpha production roster after the intentional retirement of `teen_nagato` is ratified as:

**97 Characters + 18 Entities = 115 total live production identities.**

No replacement Character is fabricated, inferred, selected, or restored merely to preserve the historical number 116.

`teen_nagato` is retired from active production until a future representation is separately authored and admitted through the normal Registry / Assets / Combat / runtime gates.

## 2. Binding source facts

Intentional retirement commit:

`02bbed2c3fc14aca822acdc8accb7f6350cb3b04` — `retiring teen nagato`

This removed the active presentation binaries:

- `Assets/Variant/teen_nagato.png`
- `Portraits/Variants/teen_nagato.png`

Current integrated runtime package:

`ee14b9b9350d9d5366f73e94766c2059858b3a71` — `12500-22499`

That package consumes the retirement and removes `teen_nagato` from active:

- collectible-card projection;
- `UI_PORTRAIT_MANIFEST`;
- `characterRegistry`;
- runtime Registry bindings;
- Skill-owner projection.

Its current live production diagnostic is:

**97 Characters + 18 Entities = 115.**

## 3. Supersession of historical final-116 cardinality

The following older authority remains historically valid for the identities, Stats, PL, representation restrictions and exact mappings that it admitted, but its **98 Characters + 18 Entities = 116 cardinality is superseded for the current live production baseline**:

`Documentation/Registry/Final 116 Admission Audit and Coding Handoff.md`

Likewise, references such as:

- `live-116`;
- `EXPECTED_CHARACTERS = 98`;
- `EXPECTED_ENTITIES = 18`;
- `EXPECTED_COUNT = 116`;
- `116/116` closure requirements;

must no longer be treated as current cardinality authority after this ratification.

This is a cardinality supersession only. It does **not** revoke or remap the still-live identities previously admitted in the 116 package.

## 4. Teen Nagato status

Stable representation key:

`teen_nagato`

Current production status:

**RETIRED / DORMANT — NOT ACTIVE PRODUCTION**

The prior Teen Nagato numerical package and Combat semantics remain historical archaeology only. They are not current Alpha production authority and must not be used to reinsert the representation automatically.

Retirement does not delete the fact that historical documents or commits once authored Teen Nagato. It means those records no longer make him a live Character.

A future Nagato concept — including any possible War-Era / pre-Yahiko-death representation — requires its own explicit Character/representation authority, exact Stats/Base PL, Assets projection, Combat readiness and runtime admission. It is not a rename or automatic restoration of `teen_nagato`.

## 5. No replacement-by-count rule

The roster count is descriptive of authorised live identities; it is not a target that authorises content creation.

Preserve:

- intentional retirement != vacancy that must be filled;
- count constant != Character authority;
- stale QA expectation != Registry truth;
- physical asset != identity admission;
- card filename != stable identity authority;
- retired representation != deleted history;
- future replacement concept != automatic reuse of old Stats/PL;
- numerical roster cardinality != content-design requirement.

Therefore no 116th Character is authorised by this document.

## 6. Current-live versus future admitted expansion

This document ratifies the **current live production baseline** used by active portrait/runtime QA after Teen Nagato retirement.

It does not cancel separately authorised future expansion work.

In particular, the 25-row Genin v2 wave is already semantically admitted by:

`Documentation/Registry/Alpha Genin Expansion 25 Row Registry and PL Admission 2026-09-10.md`

but remains outside current live candidate/runtime activation while its Combat-readiness and CE v2 activation gates are still open.

Therefore:

**current live production cardinality = 115**

until a later explicit production activation authority adds or removes identities and publishes a new superseding cardinality.

Do not pre-add the 25 Genin rows to this 115 count before their v2 activation authority is committed.

## 7. UI / Assets re-baseline

UI / Assets must preserve every still-authorised portrait mapping and physical repair already completed.

For current-live portrait QA, re-baseline only the expected cardinality:

- expected Characters: **97**;
- expected Entities: **18**;
- expected total: **115**.

`teen_nagato` must be absent from the active portrait manifest and must not be restored merely to satisfy historical `116/116` checks.

All remaining valid binary/path/dimension requirements remain unchanged for the 115 active rows.

No unrelated ID/path remap is authorised.

## 8. Coding / runtime re-baseline

Coding must consume the same exact current-live baseline:

**97 Characters + 18 Entities = 115**.

Required behavior:

- active `characterRegistry` count = 97;
- active Entity count = 18;
- active total = 115;
- `teen_nagato` absent from active card/portrait/runtime/Skill-owner projection;
- fail-visible `uiPortrait` resolution preserved;
- no collectible-card fallback introduced;
- no unrelated Registry identity or PL mutation;
- save/load/runtime behavior must not resurrect the retired representation.

Source/headless runtime validation already proving 115 is implementation evidence, not by itself Registry authority; this document now supplies that missing Registry authority.

## 9. Status distinction

Teen Nagato retirement decision: **CLOSED / AUTHORISED**  
Registry current-live cardinality: **CLOSED — 115**  
UI / Assets QA re-baseline: **DOWNSTREAM**  
Coding QA re-baseline: **DOWNSTREAM**  
Browser/Golden final proof: **NOT CLAIMED HERE**  
Genin v2 future activation cardinality: **SEPARATE / NOT YET LIVE**

## Final lock

> **The current Alpha production baseline after Teen Nagato retirement is 97 Characters + 18 Entities = 115. The old 116 count is historical for cardinality purposes. No replacement Character is authorised merely to restore the number 116. Future production additions must publish their own superseding cardinality when they actually become live.**
