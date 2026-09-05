# Shinobi Chronicles — Final 116 Admission Audit and Coding Handoff

**Status:** PL / REGISTRY / RANK SOURCE AUDIT — FULL 116 LIVE ADMISSION NOT YET AUTHORISED  
**Date:** 2026-09-05

This document is the implementation-facing PL / Registry / Rank audit for the final awaiting-placement wave of **13 Characters + 1 Entity/Summon**.

Current live production gate remains:

**85 Characters + 17 Entities = 102**

Final locked destination for this wave is:

**98 Characters + 18 Entities = 116**

No partial admission is authorised.

## 1. Authority reconciliation

Current Registry admission authority is:

`Documentation/Registry/Awaiting Placement Production Admission Scope.md`

It explicitly supersedes the earlier 107 and 115 admission-scope revisions and includes `kurama_resonance_himawari` inside the final 116 wave.

Commit provenance for that supersession:

`a99fa132162ca9b6aa9a2612146216b2c58f8d42` — **Promote Kurama Resonance Himawari into final 116 admission wave**.

Current Character Creation / Assets scope also recognises the final **13 Characters + Nue = 116** destination:

`Documentation/Assets/Awaiting Placement Wave - Character Card and Portrait Admission Status.md`

Assets supersession commit:

`c64d9a91ebada355bdb5c1bd8435259889016072` — **Expand awaiting placement Assets scope to final 116 wave**.

The older admission-count wording inside `Documentation/Registry/Awaiting Placement Final Addition - Kurama Resonance Himawari.md` that leaves Himawari outside a 115 package is historical/stale for admission scope and is superseded by the later Registry/Assets authorities above. Its identity, Stats, PL and Combat closure remain valid.

## 2. Canonical Stat order

Durable PL authority uses this positional order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Do not reinterpret existing positional arrays using a different order.

Machine-facing records below use named fields to eliminate positional ambiguity.

## 3. Final 14 identity authority table

| ID | Type | Display | Formal Rank authority | Registry/category authority | Base Stats (N/T/B/F/K/G/S) | Base PL | Alpha production status |
|---|---|---|---|---|---|---:|---|
| `chunin_iruka` | Character | Chūnin Iruka | Chūnin | Chūnin Character | `32/30/31/26/18/27/34` | 33 | Intended ACTIVE only on complete 116 admission |
| `sj_anko` | Character | Special Jōnin Anko | Special Jōnin | Special Jōnin Character | `56/52/48/44/58/39/55` | 56 | Intended ACTIVE only on complete 116 admission |
| `chunin_fugaku` | Character | Chūnin Fugaku | Chūnin | Chūnin Character | `38/34/32/20/26/35/36` | 37 | Intended ACTIVE only on complete 116 admission |
| `chunin_itama` | Character | Chūnin Itama | Chūnin | Chūnin Character | `34/36/33/18/22/20/38` | 36 | Intended ACTIVE only on complete 116 admission |
| `genin_mikoto` | Character | Genin Mikoto | Genin | Genin Character | `24/20/19/11/14/22/21` | 23 | Intended ACTIVE only on complete 116 admission |
| `genin_orochimaru` | Character | Genin Orochimaru | Genin | Genin Character | `29/24/20/18/28/25/27` | 28 | Intended ACTIVE only on complete 116 admission |
| `akatsuki_kakuzu` | Character | Akatsuki Kakuzu | No separate formal-rank value closed by PL/Registry | Akatsuki Character representation | `86/76/68/50/88/40/96` | 91 | Intended ACTIVE only on complete 116 admission |
| `sj_kiba` | Character | Special Jōnin Kiba | Special Jōnin | integrated Kiba + Akamaru one-slot Character | `50/66/52/20/34/22/70` | 64 | Intended ACTIVE only on complete 116 admission |
| `sj_nono` | Character | Special Jōnin Nono | Special Jōnin | Special Jōnin Character | `52/34/31/58/44/40/55` | 55 | Intended ACTIVE only on complete 116 admission |
| `sannin_tenten` | Character | Sannin Tenten | No separate formal-rank value closed by PL/Registry | Sannin Character representation | `68/62/94/70/74/44/80` | 88 | Intended ACTIVE only on complete 116 admission |
| `sannin_hinata` | Character | Sannin Hinata | No separate formal-rank value closed by PL/Registry | Sannin / Road-to-Ninja alternate-growth Character | `96/118/62/70/48/82/108` | 110 | Intended ACTIVE only on complete 116 admission |
| `sannin_sumire` | Character | Sannin Sumire | No separate formal-rank value closed by PL/Registry | Sannin Character; intrinsic Nue bond | `90/72/66/82/96/80/90` | 93 | Intended ACTIVE only on complete 116 admission |
| `kurama_resonance_himawari` | Character | Kurama Resonance Himawari | No formal-rank value closed by PL/Registry | dedicated hosted/resonance Character representation | `112/106/48/70/110/76/126` | 118 | Intended ACTIVE only on complete 116 admission |
| `nue` | Entity | Nue | N/A | independent Entity / Summon | `92/98/60/55/96/65/105` | 100 | Intended ACTIVE only on complete 116 admission |

Do not infer a formal rank for Akatsuki/Sannin/hosted-resonance representations from PL or asset folders. If the live Registry schema requires a separate `formalRank` property for those records, Coding must use the existing schema/default convention or obtain explicit Rank authority rather than inventing one.

## 4. Exact representation restrictions

### `sj_anko`

Untransformed Special Jōnin Anko. Do not apply `cs_anko` or `l2_anko` embodied packages.

### `chunin_fugaku`

Ordinary Sharingan access/expression is authorised; no Mangekyō inference.

### `chunin_itama`

No Wood Release inference.

### `genin_mikoto`

Ordinary Sharingan access/expression is authorised; no Mangekyō inference.

### `genin_orochimaru`

Young Genin representation only. Do not inherit later immortality/body-replacement/Curse Mark/laboratory/high forbidden packages.

### `akatsuki_kakuzu`

`earth_grudge_fear` is intrinsic. Alpha masks/hearts are embedded attack source/presentation only: no independent participants, turns, PL pools, per-mask defeat or heart-count survival implementation.

### `sj_kiba`

Exact production ID is **`sj_kiba`**. Never create `s_jkiba`.

Kiba + Akamaru are one integrated Character representation, one deployment position and one composite PL64 ledger.

Stable internal causal source:

`akamaru`

classification:

`source_only_integrated_participant`

role:

`companion`

Akamaru is not a collectible Character/Entity, Summon, Hosted Entity, second ownership record, second Battle turn or second PL ledger.

### `sannin_hinata`

Final Stats/PL above supersede the earlier PL94 calibration completely. No stale PL94 layer or extra alternate-growth modifier may remain.

### `sannin_sumire` + `nue`

Two stable Registry identities. Acquiring/instantiating `sannin_sumire` must idempotently ensure/reuse exactly one `nue` and establish/reaffirm the authorised default attachment.

Sumire PL93 and Nue PL100 remain independent. No PL/Stat transfer or relationship bonus.

Default attachment does not automatically manifest Nue at Battle start.

### `kurama_resonance_himawari`

Kurama Resonance is already embodied in the Character's Base Stats/Base PL.

Do not create or project a second Kurama Entity, `nine_tails`, `yang_kurama`, `yin_kurama`, `kurama_complete`, Hosted Kurama ownership, extra Battle turn/slot, extra Kurama acquisition or separate Kurama PL ledger.

The five closed Combat Action IDs are:

- `kurama_resonance_himawari_resonant_chakra_strike`
- `kurama_resonance_himawari_tailed_beast_bomb`
- `kurama_resonance_himawari_regenerative_resonance`
- `kurama_resonance_himawari_chakra_hair_rescue`
- `kurama_resonance_himawari_resonant_guard`

These do not require PL/Registry to invent a separate hosted-Entity Registry field. Combat-owned runtime state such as `resonant_guard`, once-per-Battle use, packet targeting and restoration lifecycle belongs in Combat/action state, not Registry identity.

### `nue`

Independent production Entity/Summon identity. It consumes one ordinary production Entity count on admission.

Nue owns its own Stats, PL, Battle PL and actions. Its PL/Stats never transfer wholesale to Sumire.

Its Battle manifestation/action-opportunity lifecycle remains Summon/Combat-owned. Default Sumire attachment means associated/available, not automatically active in Battle.

The Registry calibration document contains a prepared action palette, but PL/Registry does not claim unresolved Combat Attack-PL or manifestation numbers.

## 5. Production collectible / acquisition distinction

All fourteen are intended ACTIVE production identities once the complete batch is admitted.

That does not mean every Character has a closed acquisition route.

PL/Registry therefore authorises production identity admission only; obtainability/recruitment routes remain Acquisition / Character Systems authority except where already closed, notably the idempotent `sannin_sumire` → `nue` paired-acquisition contract.

Preserve:

**production admission ≠ acquisition**

## 6. Asset source audit

Source commit:

`577231888974f7a612a82a5c944e1b5fd79c6f7a` — `updated roster. final for Alpha. Battle Portraits not included`

physically added the following fourteen collectible-card image files:

- `chunin_iruka` → `Assets/Chunin/chunin_iruka.png`
- `sj_anko` → `Assets/Special Jonin/sj_anko.png`
- `chunin_fugaku` → `Assets/Chunin/chunin_fugaku.png`
- `chunin_itama` → `Assets/Chunin/chunin_itama.png`
- `genin_mikoto` → `Assets/Genin/genin_mikoto.png`
- `genin_orochimaru` → `Assets/Genin/genin_orochimaru.png`
- `akatsuki_kakuzu` → `Assets/Akatsuki/akatsuki_kakuzu.png`
- `sj_kiba` → `Assets/Special Jonin/sj_kiba.png`
- `sj_nono` → `Assets/Special Jonin/sj_nono.png`
- `sannin_tenten` → `Assets/Sannin/sannin_tenten.png`
- `sannin_hinata` → `Assets/Sannin/sannin_hinata.png`
- `sannin_sumire` → `Assets/Sannin/sannin_sumire.png`
- `kurama_resonance_himawari` → `Assets/Rare Cards/kurama_resonance_himawari.png`
- `nue` → `Assets/Summons/nue.png`

This proves physical repository ingestion of those card binaries. It does **not** by itself satisfy the durable mapping contract because current Assets authority still requires an explicit verified `Registry ID → collectibleCard path → uiPortrait path → ACTIVE` projection and Registry ratification.

Current durable Assets authority still states:

- exact approved/runtime `collectibleCard` mapping + ACTIVE status: not yet published for the fourteen-row wave;
- approved square `uiPortrait`: not yet published for any of the fourteen;
- exact `uiPortrait` mapping + ACTIVE status: not yet published for any of the fourteen;
- current approved portrait authority remains 102/102.

Do not infer portrait paths, crop cards into portraits, or promote a physical file to runtime mapping authority solely from filename/directory presence.

## 7. Final admission decision

# FULL 116 ADMISSION NOT YET AUTHORISED

The PL/Registry identity, numerical calibration and final 116 scope are closed.

The exact blocker is the incomplete fourteen-row production asset projection package:

1. Assets must explicitly verify/publish the fourteen `collectibleCard` runtime mappings and ACTIVE status, consuming the already-present source files where appropriate.
2. Assets must create/approve fourteen square `uiPortrait`s.
3. Assets must publish exact fourteen `uiPortrait` repository mappings and ACTIVE status.
4. Registry must ratify that exact fourteen-row projection.
5. Only then may Coding admit all thirteen Characters + `nue` atomically and extend Golden gates from 102 to 116.

No partial admission is authorised.

## 8. Existing live 102 regression safety

This admission does not authorise any mutation of the existing 102 identities' Base Stats, Base PL, Registry IDs, Character/Entity classification or formal-rank metadata.

None of the fourteen new identities replaces or supersedes an existing live production identity.

No live-102 rebalance is part of the 116 admission operation.

## 9. Rank / Promotion safety

Preserve existing closed doctrine:

- Registry representation Rank/category ≠ persistent owned-participant formal-rank progression state;
- Promotion ≠ representation swap;
- Rank ≠ PL;
- Promotion grants no automatic PL/Stat increase;
- Academy→Genin mutates only the exact owned participant's formal-rank progression record;
- Genin Roster Transition remains a separate post-Promotion flow.

The 116 admission introduces new production representations only. It does not alter those Promotion contracts.

## 10. Coding payload

The machine-consumable authority records are the named-field records supplied in the accompanying Coding handoff. Property names should be adapted only to the existing live Registry schema; semantic values, IDs, Stats and PL must not be rewritten to fit a guessed schema.
