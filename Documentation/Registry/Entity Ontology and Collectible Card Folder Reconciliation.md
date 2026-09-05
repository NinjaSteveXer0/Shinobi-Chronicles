# Shinobi Chronicles — Entity Ontology and Collectible Card Folder Reconciliation

**Status:** PL / Registry / Rank ontology authority — CLOSED; source folder implementation VERIFIED; runtime/Assets projection consumption downstream  
**Date:** 2026-09-05

This document reconciles the former catch-all `Summons` collectible-card folder with the now-implemented Entity ontology folders.

Source implementation authority:

- commit `48061d6dca9e857f08a9714ffb3d0972802880c2` — `card upgrades and reorganization`;
- merged to current `main` by `183305955930652829ef8bd70f33790ecb0b4168`.

The reorganisation changes **collectible-card folder placement / ontology projection only**. Stable Registry IDs are unchanged.

Preserve:

**asset folder move ≠ Registry identity change**

**Entity ≠ Summon**

**folder/category ≠ automatic Battle lifecycle**

**collectibleCard path ≠ uiPortrait path**

---

## 1. Parent Registry ontology

All records below remain under the broad Registry type:

**Entity**

Lifecycle / representation classification is now explicit beneath that parent type.

The current collectible-card folders are:

- `Assets/Summons/`
- `Assets/Familiars/`
- `Assets/Constructs/`
- `Assets/Forced Manifestations/`
- `Assets/Hosted Entity/`
- `Assets/Tailed Beasts/`

These folders are ontology-facing collectible-card organisation. They do not by themselves author acquisition, Battle manifestation, ownership, deployment, action economy or PL transfer.

---

## 2. Exact current classification and source paths

| Registry ID | Registry type | Lifecycle / ontology classification | Exact current collectible-card path | Notes |
|---|---|---|---|---|
| `de_baku` | Entity | Summon | `Assets/Summons/de_baku.png` | independent summon lifecycle |
| `gamakichi` | Entity | Summon | `Assets/Summons/gamakichi.png` | independent summon lifecycle |
| `ibuse` | Entity | Summon | `Assets/Summons/ibuse.png` | independent summon lifecycle |
| `key_gero` | Entity | Summon | `Assets/Summons/key_gero.png` | summon/toad entity; utility semantics do not change ontology |
| `mirage_clam` | Entity | Summon | `Assets/Summons/mirage_clam.png` | independent summon lifecycle |
| `mk_enma` | Entity | Summon | `Assets/Summons/mk_enma.png` | independent summon lifecycle |
| `nue` | Entity | Summon | `Assets/Summons/nue.png` | independent Summon despite Sumire default attachment |
| `pakkun` | Entity | Summon | `Assets/Summons/pakkun.png` | independent Summon; Kakashi association does not make him Hosted |
| `wr_kamatari` | Entity | Summon | `Assets/Summons/wr_kamatari.png` | independent summon lifecycle |
| `koto_crow` | Entity | Familiar | `Assets/Familiars/koto_crow.png` | bound/special-purpose familiar; not forced through generic Summon ontology |
| `iron_maiden` | Entity | Construct | `Assets/Constructs/iron_maiden.png` | construct/device representation, not a living Summon |
| `triple_rashomon` | Entity | Construct | `Assets/Constructs/triple_rashomon.png` | summoned construct/barrier; exact Rashōmon sequence mechanics remain separately authored |
| `breakout_kurama` | Entity | Forced Manifestation | `Assets/Forced Manifestations/breakout_kurama.png` | hostile/forced manifestation; manifestation ≠ summon ownership/access |
| `black_zetsu` | Entity | Hosted Entity | `Assets/Hosted Entity/hosted_entity_black_zetsu.png` | stable Hosted Entity; no second slot/turn/PL by default |
| `reborn_kurama` | Entity | Hosted Entity | `Assets/Hosted Entity/hosted_entity_reborn_kurama.png` | Himawari-era reborn Kurama; family = Tailed Beast / Kurama |
| `kurama_complete` | Entity | Tailed Beast | `Assets/Tailed Beasts/kurama_complete.png` | exact mature Complete Kurama representation |
| `menma_kurama` | Entity | Tailed Beast | `Assets/Tailed Beasts/menma_kurama.png` | exact Menma Kurama representation |
| `menma_nine_tails` | Entity | Tailed Beast | `Assets/Tailed Beasts/menma_nine_tails.png` | exact Menma Nine-Tails representation |
| `nine_tails` | Entity | Tailed Beast | `Assets/Tailed Beasts/nine_tails.png` | exact Nine-Tails/Kurama representation |
| `yang_kurama` | Entity | Tailed Beast | `Assets/Tailed Beasts/yang_kurama.png` | exact Yang Kurama representation |
| `yin_kurama` | Entity | Tailed Beast | `Assets/Tailed Beasts/yin_kurama.png` | exact Yin Kurama representation |

No ID in this table is renamed by the folder reconciliation.

---

## 3. Lifecycle distinctions

### Summon

A Summon is an Entity whose authorised active manifestation may become an independent Battle participant through a Summon lifecycle.

When legitimately manifested, a Summon may own:

- its own Stats / Effective state;
- its own Battle PL ledger;
- its own action opportunities;
- its own exact Summon lifecycle.

None of those transfer wholesale to the summoner.

Preserve:

**Summon ownership ≠ manifestation**

**Summon PL ≠ summoner PL**

### Familiar

A Familiar is an independently addressable persistent/special-purpose creature relationship that is not automatically governed by the generic Summon lifecycle.

`koto_crow` is the current Alpha classification.

Exact action/availability/attachment semantics remain source-owned and must not be inferred merely from `Familiar`.

### Construct

A Construct is an Entity/representation invoked, created or deployed as a non-creature mechanism, barrier, structure or device.

Construct classification does not imply an independent creature turn, personality, Summon contract or ordinary companion lifecycle.

`triple_rashomon` remains governed by its exact six-sequence identity / Alpha executable-sequence contracts; folder movement does not rewrite those mechanics.

### Forced Manifestation

A Forced Manifestation is an Entity made present through a hostile, involuntary or occurrence-owned manifestation rather than ordinary Summon ownership/access.

`breakout_kurama` therefore remains:

**forced manifestation ≠ summon ownership ≠ preparation ≠ cooperation ≠ access**

### Hosted Entity

A Hosted Entity is a stable causal/Registry Entity residing in, on or persistently attached to a host Character/state.

Hosted presence does not by default create:

- a second team/deployment slot;
- an independent recurring Battle turn;
- a second Battle PL ledger added to the host;
- wholesale Stat transfer;
- an ordinary Summon lifecycle.

Current Hosted Entities:

- `black_zetsu`;
- `reborn_kurama`.

Preserve:

**Hosted Entity identity ≠ independent participant by default**

**Hosted Entity PL ≠ host PL**

**hosted presence ≠ embodied representation package reapplication**

### Tailed Beast

Tailed Beast is an Entity family/representation classification, not a guarantee of one universal lifecycle.

The mature/historical Kurama-family Entity cards moved out of `Summons` because they must not be treated as ordinary summon-contract creatures by folder inference.

A Tailed Beast representation may later be manifested, hosted, coerced, forced into an encounter or otherwise expressed only where exact authority says so.

`reborn_kurama` demonstrates that family and lifecycle are distinct:

- family: **Tailed Beast / Kurama**;
- lifecycle: **Hosted Entity**.

Preserve:

**Tailed Beast family ≠ Summon lifecycle**

**same persistent being ≠ same exact Registry representation**

---

## 4. Existing Battle Portrait authority is NOT moved by this reconciliation

The source reorganisation above concerns the root collectible-card files under `Assets/...`.

Existing `uiPortrait` / Battle Portrait mappings remain under their currently approved paths until Assets explicitly supersedes them.

Do not infer a portrait move from a collectible-card move.

In particular, existing approved portrait files currently located under legacy `Assets/Portraits/Summons/...` remain attributable to their Registry IDs unless Assets publishes a new portrait manifest.

Preserve:

**collectible-card ontology folder ≠ portrait folder authority**

**card move ≠ portrait remap**

---

## 5. Production admission boundary

The reorganisation does not itself change the current live production count.

Existing live Entity identities remain live under their same Registry IDs.

New awaiting-placement identities remain subject to their own production-admission gates:

- `pakkun` — calibrated awaiting-placement Summon;
- `black_zetsu` — calibrated awaiting-placement Hosted Entity;
- `reborn_kurama` — calibrated awaiting-placement Hosted Entity.

No folder move silently admits a new identity.

The separately locked final 116 wave remains governed by its own admission authority; this ontology reconciliation does not add Black Zetsu, Reborn Kurama, Pakkun or Kage Madara to that wave by implication.

---

## 6. Runtime consumption requirement

Any runtime consumer that previously derives collectible-card paths from the old catch-all `Summons`/`Variant` category must be updated to consume exact authoritative paths or the new classification projection.

Coding must not:

- recreate old files to preserve a stale path convention;
- rename Registry IDs to match folder names;
- infer lifecycle from filename/folder alone;
- alter Stats/Base PL because ontology folder placement changed.

The correct relationship is:

`stable Registry ID → explicit ontology/classification → exact collectibleCard path`

not:

`folder name → inferred identity/mechanics`.
