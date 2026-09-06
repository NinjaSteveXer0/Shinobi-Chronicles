# Shinobi Chronicles — Supplemental 14 Battle Portrait Registry Ratification

**Status:** PL / REGISTRY / RANK — SUPPLEMENTAL 14/14 PORTRAIT PROJECTION RATIFIED; TEN LIVE SUPERSESSIONS RELEASED TO CODING; FOUR ASSETS-READY IDENTITIES REMAIN SEPARATELY ADMISSION-CONTROLLED  
**Date:** 2026-09-06

This document ratifies the supplemental fourteen-portrait UI / Assets projection closed in:

`Documentation/Assets/Battle Portrait Authority and Manifest.md`

Assets closure provenance:

`da653de72eb45f987b1bcf903560f3ec262c9247` — `Reconcile Battle portrait authority with supplemental 14 wave`

Accepted binary-wave provenance:

`f36a0f4cbef77d3820b56389dbde4265feb5f346` — `complete battle portrait update`

Registry accepts the exact Assets mappings below without deriving, normalising, renaming or reconstructing paths from Registry IDs or Character Creation workspace labels.

Preserve:

**workspace/file label ≠ Registry identity**

**same path + accepted replacement binary ≠ new identity**

**portrait supersession ≠ Registry identity mutation**

**Assets approval ≠ Registry admission**

**Registry ratification ≠ runtime QA GREEN**

---

## 1. Registry decision

The supplemental Assets projection is **RATIFIED 14/14**.

The fourteen rows deliberately separate into two downstream states:

1. **ten already-live Registry identities** whose `uiPortrait` authority is superseded/updated only; and
2. **four Assets-ready identities** whose production admission remains separately controlled.

No Registry ID, Base Stats, Base PL, formal Rank/category, acquisition state, ownership state or Battle ontology is changed by this portrait ratification.

---

## 2. Already-live identities — portrait supersession only

The following ten stable Registry identities remain the same live identities. Registry ratifies only the exact ACTIVE `uiPortrait` projection shown here.

| Registry ID | Exact ACTIVE `uiPortrait` | Ratification kind |
|---|---|---|
| `triple_rashomon` | `Portraits/Constructs/triple_rashomon.png` | path supersession |
| `iron_maiden` | `Portraits/Constructs/iron_maiden.png` | path supersession |
| `black_sun_himawari` | `Portraits/Rare Cards/black_sun_himawari.png` | accepted binary supersession at same authoritative path |
| `menma_nine_tails` | `Portraits/Tailed Beasts/menma_nine_tails.png` | path supersession |
| `nine_tails` | `Portraits/Tailed Beasts/nine_tails.png` | path supersession |
| `curse_mark_hinata` | `Portraits/Transformation/curse_mark_hinata.png` | path supersession |
| `coercive_cloak` | `Portraits/Variants/coercive_cloak.png` | accepted binary supersession at same authoritative path |
| `three_tail_dominion` | `Portraits/Variants/three_tail_dominion.png` | path supersession |
| `six_tail_dominion` | `Portraits/Variants/six_tail_dominion.png` | path supersession |
| `breakout_kurama` | `Portraits/Forced Manifestations/breakout_kurama.png` | path supersession |

For `black_sun_himawari` and `coercive_cloak`, the Registry identity and authoritative path remain unchanged; only the accepted binary revision at that path supersedes the prior binary revision.

For the other eight rows, the exact new portrait path supersedes prior path authority. Physical predecessor files do not retain ACTIVE authority merely because they may still exist in source history or the repository tree.

No new admission event is created for these ten identities.

---

## 3. Assets-ready identities — portrait mapping ratified, admission remains separate

Registry records the following exact approved portrait projections as **Assets-ready** only:

| Registry ID | Registry classification already closed | Exact approved `uiPortrait` | Production-admission state |
|---|---|---|---|
| `black_zetsu` | Entity — Hosted Entity | `Portraits/Hosted Entity/hosted_entity_black_zetsu.png` | separately controlled; NOT admitted by this document |
| `reborn_kurama` | Entity — Hosted Entity; Tailed Beast / Kurama family | `Portraits/Hosted Entity/hosted_entity_reborn_kurama.png` | separately controlled; NOT admitted by this document |
| `kage_madara` | Character — Kage representation | `Portraits/Kage/kage_madara.png` | separately controlled; NOT admitted by this document |
| `pakkun` | Entity — Summon | `Portraits/Summons/pakkun.png` | separately controlled; NOT admitted by this document |

Asset readiness does not create production admission, player ownership, Acquisition availability, Battle deployment or another Registry-count increment.

The existing PL / Registry identity and numerical authority for these four remains unchanged.

---

## 4. Exact identity translations

The following Character Creation / workspace/file labels are not Registry identities:

- `cs1_hinata` → Registry ID `curse_mark_hinata`;
- `hosted_entity_black_zetsu` → Registry ID `black_zetsu`;
- `kurama_reborn` → Registry ID `reborn_kurama`.

Do not create new Registry identities named:

`cs1_hinata`

`hosted_entity_black_zetsu`

`kurama_reborn`

The approved filename may differ from the stable Registry identity without any identity mutation.

---

## 5. Explicit supersession ledger consumed from Assets

Registry ratifies the Assets supersession ledger exactly:

| Registry ID | Prior/superseded portrait form | Current ratified ACTIVE portrait |
|---|---|---|
| `triple_rashomon` | `Portraits/Constructs/rashomon.png` / older Summons-path fossil | `Portraits/Constructs/triple_rashomon.png` |
| `iron_maiden` | `Portraits/Constructs/maiden.png` / older Summons-path fossil | `Portraits/Constructs/iron_maiden.png` |
| `menma_nine_tails` | older `Portraits/Summons/menma_nine_tails.png` projection | `Portraits/Tailed Beasts/menma_nine_tails.png` |
| `nine_tails` | older `Portraits/Summons/naruto_nine_tails.png` projection | `Portraits/Tailed Beasts/nine_tails.png` |
| `curse_mark_hinata` | `Portraits/Transformation/cs1_hinata.png` | `Portraits/Transformation/curse_mark_hinata.png` |
| `three_tail_dominion` | `Portraits/Variants/dominion_three_tails.png` | `Portraits/Variants/three_tail_dominion.png` |
| `six_tail_dominion` | `Portraits/Variants/dominion_six_tails.png` | `Portraits/Variants/six_tail_dominion.png` |
| `breakout_kurama` | `Portraits/Variants/outbreak_kurama.png` | `Portraits/Forced Manifestations/breakout_kurama.png` |

`black_sun_himawari` and `coercive_cloak` are deliberately absent from the path-change ledger because their approved path remains the same while the accepted binary revision changes.

---

## 6. Coding/runtime release — ten live identities only

Registry releases the **ten-live portrait supersession package** to SC Coding / Runtime now.

Coding should:

1. update the eight changed runtime portrait paths to the exact ratified paths above;
2. preserve the existing path for `black_sun_himawari` and `coercive_cloak` while consuming the accepted replacement binaries at those paths;
3. never recreate deprecated predecessor paths as fallback authority;
4. never derive a portrait path from Registry ID or workspace/file label;
5. keep all ten stable Registry identities and all non-presentation mechanics unchanged;
6. run fresh decode/dimension QA across all fourteen accepted supplemental portrait binaries;
7. verify required portrait dimensions are exactly 1024 × 1024;
8. run live resolver/Golden checks for the ten already-live identities;
9. verify no alias/duplicate-path regression and no deprecated path regains active authority.

For the four Assets-ready but not-yet-admitted identities, Coding may validate the physical portrait binaries and stage exact projection data, but this Registry ratification does **not** authorise live production admission.

A failed binary or resolver check does not authorise heuristic substitution or identity renaming. Repair or explicitly supersede the approved Assets row under the owning authority.

---

## 7. Final Registry status

- supplemental Assets projection: **14/14 RATIFIED**;
- ten already-live identities: **same Registry identities; portrait authority superseded only**;
- eight live path changes: **RELEASED TO CODING**;
- two live same-path binary supersessions: **RATIFIED / PRESERVE PATH**;
- four new Assets-ready identities: **portrait mapping ratified / production admission still separate**;
- new Registry identities created by this ratification: **NONE**;
- PL/Stats/Rank changes created by this ratification: **NONE**;
- runtime/Golden validation already proven merely by Registry ratification: **NO**.

> **The ten-live portrait supersession package is released to Coding. The four Assets-ready identities remain separately admission-controlled.**
