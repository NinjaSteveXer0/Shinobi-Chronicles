# Shinobi Chronicles — Battle Portrait Authority and Manifest

Date: 6 September 2026

Status: **CURRENT UI / ASSETS PORTRAIT AUTHORITY — LIVE 116 BASELINE RECONCILED / SUPPLEMENTAL 14 ACCEPTED AND PROJECTED / RUNTIME + REGISTRY FOLLOW-THROUGH SEPARATE**

---

## 1. Core contract

Shinobi Chronicles preserves separate image authorities for premium collectible cards and square UI/Battle portraits.

> **collectible Character Card ≠ `uiPortrait` ≠ battlefield Entity/representation**

Current production presentation contract:

- `collectibleCard`: exact **980 × 1400** premium framed card asset;
- `uiPortrait`: required **1024 × 1024**, frameless square portrait asset.

A collectible-card asset must not be silently cropped or substituted as `uiPortrait` merely because both represent the same Registry identity.

A generic participant image field must not become permanent `uiPortrait` authority by convenience.

Assets owns approved portrait selection, exact repository path, ACTIVE/superseded state and explicit asset supersession. Registry owns stable identity and production admission. Coding owns runtime resolver consumption, binary QA, diagnostics and Golden/regression validation.

Preserve:

> **Registry identity ≠ asset filename.**

> **asset existence ≠ approved runtime mapping.**

> **Assets approval ≠ Registry admission ≠ Coding implementation ≠ runtime validation.**

---

## 2. Current repository/root reconciliation

The old 4 September 2026 102-era snapshot in this file is superseded as current authority.

Its `Assets/Portraits/...` repository-root references are historical and must not be used for new production wiring.

The current physical production portrait root is:

`Portraits/`

The current live source baseline has already moved beyond the old 102 gate. The ratified runtime portrait authority is **116/116**, with source diagnostics requiring every live portrait path to begin with `Portraits/` and the final fourteen admission rows already integrated.

The complete final-116 Assets admission projection remains durably recorded in:

`Documentation/Assets/Final 116 Asset Projection Status.md`

The historical 102 mapping table remains recoverable through Git history, but it is no longer the current production path authority.

---

## 3. Supplemental Character Creation handoff received

Character Creation / Visuals completed and Stephen accepted the supplemental fourteen-portrait wave.

Durable upstream handoff:

`Documentation/Assets/Character Creation Supplemental Portrait Handoff 2026-09-06.md`

The accepted binaries are already physically committed in current source. Assets therefore does **not** remain blocked on binary arrival.

This document now closes the Assets-side production projection for all fourteen accepted portraits.

Character Creation workspace names are treated only as handoff labels. They do not create Registry identities.

Required translations preserved here:

- Character Creation `cs1_hinata` → Registry `curse_mark_hinata`;
- Character Creation `hosted_entity_black_zetsu` → Registry `black_zetsu`;
- Character Creation `kurama_reborn` → Registry `reborn_kurama`.

---

## 4. Supplemental 14 — exact Assets production projection

| Registry ID | Character Creation handoff label | Exact approved `uiPortrait` path | Assets state | Production/admission note |
|---|---|---|---|---|
| `triple_rashomon` | `triple_rashomon` | `Portraits/Constructs/triple_rashomon.png` | **ACTIVE — supersedes prior portrait mapping** | Existing live identity; runtime must consume new Assets path |
| `iron_maiden` | `iron_maiden` | `Portraits/Constructs/iron_maiden.png` | **ACTIVE — supersedes prior portrait mapping** | Existing live identity; runtime must consume new Assets path |
| `black_sun_himawari` | `black_sun_himawari` | `Portraits/Rare Cards/black_sun_himawari.png` | **ACTIVE — accepted binary supersession at authoritative path** | Existing live identity |
| `menma_nine_tails` | `menma_nine_tails` | `Portraits/Tailed Beasts/menma_nine_tails.png` | **ACTIVE — supersedes prior portrait mapping** | Existing live identity; runtime must consume new Assets path |
| `nine_tails` | `nine_tails` | `Portraits/Tailed Beasts/nine_tails.png` | **ACTIVE — supersedes prior portrait mapping** | Existing live identity; runtime must consume new Assets path |
| `curse_mark_hinata` | `cs1_hinata` | `Portraits/Transformation/curse_mark_hinata.png` | **ACTIVE — supersedes prior portrait mapping** | Existing live identity; no new `cs1_hinata` Registry identity |
| `coercive_cloak` | `coercive_cloak` | `Portraits/Variants/coercive_cloak.png` | **ACTIVE — accepted binary supersession at authoritative path** | Existing live identity |
| `three_tail_dominion` | `three_tail_dominion` | `Portraits/Variants/three_tail_dominion.png` | **ACTIVE — supersedes prior portrait mapping** | Existing live identity; runtime must consume new Assets path |
| `six_tail_dominion` | `six_tail_dominion` | `Portraits/Variants/six_tail_dominion.png` | **ACTIVE — supersedes prior portrait mapping** | Existing live identity; runtime must consume new Assets path |
| `breakout_kurama` | `breakout_kurama` | `Portraits/Forced Manifestations/breakout_kurama.png` | **ACTIVE — dedicated replacement / supersedes prior portrait mapping** | Existing live identity; runtime must consume new Assets path |
| `black_zetsu` | `hosted_entity_black_zetsu` | `Portraits/Hosted Entity/hosted_entity_black_zetsu.png` | **ACTIVE — new dedicated Assets projection** | Assets-ready; Registry admission remains separate |
| `reborn_kurama` | `kurama_reborn` | `Portraits/Hosted Entity/hosted_entity_reborn_kurama.png` | **ACTIVE — new dedicated Assets projection** | Assets-ready; Registry admission remains separate |
| `kage_madara` | `kage_madara` | `Portraits/Kage/kage_madara.png` | **ACTIVE — new dedicated Assets projection** | Assets-ready; Registry admission remains separate |
| `pakkun` | `pakkun` | `Portraits/Summons/pakkun.png` | **ACTIVE — new dedicated Assets projection** | Assets-ready; Registry admission remains separate |

**Assets result: 14/14 COMPLETE.**

---

## 5. Explicit supersession ledger

The following prior runtime/path choices must not regain authority merely because their files may still physically exist:

| Registry ID | Superseded portrait/path form | Current ACTIVE Assets authority |
|---|---|---|
| `triple_rashomon` | `Portraits/Constructs/rashomon.png` / older Summons-path fossil | `Portraits/Constructs/triple_rashomon.png` |
| `iron_maiden` | `Portraits/Constructs/maiden.png` / older Summons-path fossil | `Portraits/Constructs/iron_maiden.png` |
| `menma_nine_tails` | older `Portraits/Summons/menma_nine_tails.png` projection | `Portraits/Tailed Beasts/menma_nine_tails.png` |
| `nine_tails` | older `Portraits/Summons/naruto_nine_tails.png` projection | `Portraits/Tailed Beasts/nine_tails.png` |
| `curse_mark_hinata` | `Portraits/Transformation/cs1_hinata.png` | `Portraits/Transformation/curse_mark_hinata.png` |
| `three_tail_dominion` | `Portraits/Variants/dominion_three_tails.png` | `Portraits/Variants/three_tail_dominion.png` |
| `six_tail_dominion` | `Portraits/Variants/dominion_six_tails.png` | `Portraits/Variants/six_tail_dominion.png` |
| `breakout_kurama` | `Portraits/Variants/outbreak_kurama.png` | `Portraits/Forced Manifestations/breakout_kurama.png` |

For `black_sun_himawari` and `coercive_cloak`, the accepted visual upgrade may retain the same authoritative repository path. Their newer accepted binary is the ACTIVE content at that path; the prior binary revision is superseded through Git history rather than a path change.

Preserve:

> **physical predecessor file ≠ active mapping**

> **same path + accepted replacement binary = visual supersession without identity mutation**

---

## 6. Machine-consumable supplemental projection

```json
[
  {"registryId":"triple_rashomon","uiPortrait":"Portraits/Constructs/triple_rashomon.png","assetStatus":"ACTIVE","projectionKind":"supersession"},
  {"registryId":"iron_maiden","uiPortrait":"Portraits/Constructs/iron_maiden.png","assetStatus":"ACTIVE","projectionKind":"supersession"},
  {"registryId":"black_sun_himawari","uiPortrait":"Portraits/Rare Cards/black_sun_himawari.png","assetStatus":"ACTIVE","projectionKind":"binary_supersession_same_path"},
  {"registryId":"menma_nine_tails","uiPortrait":"Portraits/Tailed Beasts/menma_nine_tails.png","assetStatus":"ACTIVE","projectionKind":"supersession"},
  {"registryId":"nine_tails","uiPortrait":"Portraits/Tailed Beasts/nine_tails.png","assetStatus":"ACTIVE","projectionKind":"supersession"},
  {"registryId":"curse_mark_hinata","uiPortrait":"Portraits/Transformation/curse_mark_hinata.png","assetStatus":"ACTIVE","projectionKind":"supersession"},
  {"registryId":"coercive_cloak","uiPortrait":"Portraits/Variants/coercive_cloak.png","assetStatus":"ACTIVE","projectionKind":"binary_supersession_same_path"},
  {"registryId":"three_tail_dominion","uiPortrait":"Portraits/Variants/three_tail_dominion.png","assetStatus":"ACTIVE","projectionKind":"supersession"},
  {"registryId":"six_tail_dominion","uiPortrait":"Portraits/Variants/six_tail_dominion.png","assetStatus":"ACTIVE","projectionKind":"supersession"},
  {"registryId":"breakout_kurama","uiPortrait":"Portraits/Forced Manifestations/breakout_kurama.png","assetStatus":"ACTIVE","projectionKind":"supersession"},
  {"registryId":"black_zetsu","uiPortrait":"Portraits/Hosted Entity/hosted_entity_black_zetsu.png","assetStatus":"ACTIVE","projectionKind":"new_dedicated"},
  {"registryId":"reborn_kurama","uiPortrait":"Portraits/Hosted Entity/hosted_entity_reborn_kurama.png","assetStatus":"ACTIVE","projectionKind":"new_dedicated"},
  {"registryId":"kage_madara","uiPortrait":"Portraits/Kage/kage_madara.png","assetStatus":"ACTIVE","projectionKind":"new_dedicated"},
  {"registryId":"pakkun","uiPortrait":"Portraits/Summons/pakkun.png","assetStatus":"ACTIVE","projectionKind":"new_dedicated"}
]
```

Runtime must consume these exact mappings. It must not derive replacement paths from the Registry IDs or Character Creation workspace labels.

---

## 7. Binary QA boundary

This closure proves **Assets selection, supersession state and exact committed path authority**.

The GitHub connector available to this workspace can enumerate the committed PNG files but cannot independently decode their image pixels. Therefore this pass does **not** claim a fresh 14-file decode/dimension/content QA.

Required downstream validation remains:

1. each approved PNG decodes successfully;
2. exact **1024 × 1024** dimensions;
3. no accidental duplicate-path collision;
4. runtime resolver returns the exact approved path for every live identity;
5. superseded paths never become active through filesystem presence or fallback;
6. missing approved assets fail visibly rather than silently substituting collectible-card art.

A failed binary QA result does not authorise Coding to choose another file. Repair the approved file in place or return the exact row to Assets for explicit supersession.

---

## 8. Production/admission boundary

The supplemental wave contains two different downstream states and they must not be collapsed:

- existing live identities whose portrait authority is being superseded; and
- new dedicated Assets projections whose Registry production admission remains separately controlled.

Assets does not create or admit Registry identities.

Specifically, this handoff must **not** create Registry IDs named:

- `cs1_hinata`;
- `hosted_entity_black_zetsu`;
- `kurama_reborn`.

Those are visual-workspace/file labels only. The Registry IDs remain:

- `curse_mark_hinata`;
- `black_zetsu`;
- `reborn_kurama`.

---

## 9. UI consumption boundary

One approved square `uiPortrait` projection may be reused across:

- normal Battle UI;
- Stage Battles;
- Arena / Tournament;
- other compact identity presentation explicitly using the same portrait contract.

This does not create separate `Battle/` or `Arena/` portrait directories.

---

## 10. Current closure state

**Character Creation supplemental visual work:** 14/14 COMPLETE / accepted.

**Physical accepted binaries:** present in current source.

**UI / Assets exact path selection:** 14/14 COMPLETE / ACTIVE.

**Explicit supersession ledger:** CLOSED.

**Fresh binary/dimension QA:** separate downstream validation.

**Registry admission for Assets-ready non-live identities:** separate downstream authority.

**Runtime adoption of superseded mappings:** separate Coding action.

No image generation or visual redesign is authorised by this document.
