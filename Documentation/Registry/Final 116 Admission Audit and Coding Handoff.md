# Shinobi Chronicles — Final 116 Admission Audit and Coding Handoff

**Status:** PL / REGISTRY / RANK SOURCE AUDIT — FULL 116 ADMISSION AUTHORISED FOR CODING EXECUTION  
**Date:** 2026-09-06

This document is the implementation-facing PL / Registry / Rank audit for the final awaiting-placement wave of **13 Characters + 1 Entity/Summon**.

Current live production gate before Coding executes the released package remains:

**85 Characters + 17 Entities = 102**

Final authorised destination for this wave is:

**98 Characters + 18 Entities = 116**

No partial admission is authorised.

## 1. Authority reconciliation

Current Registry admission authority is:

`Documentation/Registry/Awaiting Placement Production Admission Scope.md`

It explicitly supersedes the earlier 107 and 115 admission-scope revisions and includes `kurama_resonance_himawari` inside the final 116 wave.

Commit provenance for that supersession:

`a99fa132162ca9b6aa9a2612146216b2c58f8d42` — **Promote Kurama Resonance Himawari into final 116 admission wave**.

Complete current UI / Assets projection authority is:

`Documentation/Assets/Final 116 Asset Projection Status.md`

Assets closure commit:

`8284611341d5491c284e745f1f445b70354cbf42` — **Close final 116 Assets portrait projection 14/14**.

Final Registry projection ratification is:

`Documentation/Registry/Final 116 Asset Projection Registry Ratification.md`

The older admission-count wording inside `Documentation/Registry/Awaiting Placement Final Addition - Kurama Resonance Himawari.md` that leaves Himawari outside a 115 package is historical/stale for admission scope and is superseded by the later Registry/Assets authorities above. Its identity, Stats, PL and Combat closure remain valid.

## 2. Canonical Stat order

Durable PL authority uses this positional order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Do not reinterpret existing positional arrays using a different order.

Machine-facing records below use named fields to eliminate positional ambiguity.

## 3. Final 14 identity authority table

| ID | Type | Display | Formal Rank authority | Registry/category authority | Base Stats (N/T/B/F/K/G/S) | Base PL | Alpha production status |
|---|---|---|---|---|---|---:|---|
| `chunin_iruka` | Character | Chūnin Iruka | Chūnin | Chūnin Character | `32/30/31/26/18/27/34` | 33 | ACTIVE on atomic 116 admission |
| `sj_anko` | Character | Special Jōnin Anko | Special Jōnin | Special Jōnin Character | `56/52/48/44/58/39/55` | 56 | ACTIVE on atomic 116 admission |
| `chunin_fugaku` | Character | Chūnin Fugaku | Chūnin | Chūnin Character | `38/34/32/20/26/35/36` | 37 | ACTIVE on atomic 116 admission |
| `chunin_itama` | Character | Chūnin Itama | Chūnin | Chūnin Character | `34/36/33/18/22/20/38` | 36 | ACTIVE on atomic 116 admission |
| `genin_mikoto` | Character | Genin Mikoto | Genin | Genin Character | `24/20/19/11/14/22/21` | 23 | ACTIVE on atomic 116 admission |
| `genin_orochimaru` | Character | Genin Orochimaru | Genin | Genin Character | `29/24/20/18/28/25/27` | 28 | ACTIVE on atomic 116 admission |
| `akatsuki_kakuzu` | Character | Akatsuki Kakuzu | No separate formal-rank value closed by PL/Registry | Akatsuki Character representation | `86/76/68/50/88/40/96` | 91 | ACTIVE on atomic 116 admission |
| `sj_kiba` | Character | Special Jōnin Kiba | Special Jōnin | integrated Kiba + Akamaru one-slot Character | `50/66/52/20/34/22/70` | 64 | ACTIVE on atomic 116 admission |
| `sj_nono` | Character | Special Jōnin Nono | Special Jōnin | Special Jōnin Character | `52/34/31/58/44/40/55` | 55 | ACTIVE on atomic 116 admission |
| `sannin_tenten` | Character | Sannin Tenten | No separate formal-rank value closed by PL/Registry | Sannin Character representation | `68/62/94/70/74/44/80` | 88 | ACTIVE on atomic 116 admission |
| `sannin_hinata` | Character | Sannin Hinata | No separate formal-rank value closed by PL/Registry | Sannin / Road-to-Ninja alternate-growth Character | `96/118/62/70/48/82/108` | 110 | ACTIVE on atomic 116 admission |
| `sannin_sumire` | Character | Sannin Sumire | No separate formal-rank value closed by PL/Registry | Sannin Character; intrinsic Nue bond | `90/72/66/82/96/80/90` | 93 | ACTIVE on atomic 116 admission |
| `kurama_resonance_himawari` | Character | Kurama Resonance Himawari | No formal-rank value closed by PL/Registry | dedicated hosted/resonance Character representation | `112/106/48/70/110/76/126` | 118 | ACTIVE on atomic 116 admission |
| `nue` | Entity | Nue | N/A | independent Entity / Summon | `92/98/60/55/96/65/105` | 100 | ACTIVE on atomic 116 admission |

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

The current exact hosted causal source is `reborn_kurama`, as closed by the later Reborn Kurama Registry/Combat authority. This does **not** create a second Battle participant, slot, turn or additive Entity PL ledger.

Do not project `nine_tails`, `yang_kurama`, `yin_kurama`, or `kurama_complete` onto this Character and do not add generic Hosted-Entity Stats/PL on top of the authored Base state.

The five closed Combat Action IDs are:

- `kurama_resonance_himawari_resonant_chakra_strike`
- `kurama_resonance_himawari_tailed_beast_bomb`
- `kurama_resonance_himawari_regenerative_resonance`
- `kurama_resonance_himawari_chakra_hair_rescue`
- `kurama_resonance_himawari_resonant_guard`

Combat-owned runtime state such as `resonant_guard`, once-per-Battle use, packet targeting and restoration lifecycle belongs in Combat/action state, not Registry identity.

### `nue`

Independent production Entity/Summon identity. It consumes one ordinary production Entity count on admission.

Nue owns its own Stats, PL, Battle PL and actions. Its PL/Stats never transfer wholesale to Sumire.

Its Battle manifestation/action-opportunity lifecycle remains Summon/Combat-owned. Default Sumire attachment means associated/available, not automatically active in Battle.

## 5. Production collectible / acquisition distinction

All fourteen are intended ACTIVE production identities once the complete batch is admitted.

That does not mean every Character has a closed acquisition route.

PL/Registry therefore authorises production identity admission only; obtainability/recruitment routes remain Acquisition / Character Systems authority except where already closed, notably the idempotent `sannin_sumire` → `nue` paired-acquisition contract.

Preserve:

**production admission ≠ acquisition**

## 6. Exact ratified asset projection

UI / Assets has now closed and Registry has ratified this exact fourteen-row projection:

| Registry ID | collectibleCard | uiPortrait | Status |
|---|---|---|---|
| `chunin_iruka` | `Assets/Chunin/chunin_iruka.png` | `Portraits/Chunin/chunin_iruka.png` | ACTIVE / RATIFIED |
| `sj_anko` | `Assets/Special Jonin/sj_anko.png` | `Portraits/Special Jonin/sj_anko.png` | ACTIVE / RATIFIED |
| `chunin_fugaku` | `Assets/Chunin/chunin_fugaku.png` | `Portraits/Chunin/chunin_fugaku.png` | ACTIVE / RATIFIED |
| `chunin_itama` | `Assets/Chunin/chunin_itama.png` | `Portraits/Chunin/chunin_Itama.png` | ACTIVE / RATIFIED |
| `genin_mikoto` | `Assets/Genin/genin_mikoto.png` | `Portraits/Genin/genin_mikoto.png` | ACTIVE / RATIFIED |
| `genin_orochimaru` | `Assets/Genin/genin_orochimaru.png` | `Portraits/Genin/genin_orochimaru.png` | ACTIVE / RATIFIED |
| `akatsuki_kakuzu` | `Assets/Akatsuki/akatsuki_kakuzu.png` | `Portraits/Akatsuki/akatsuki_kakuzu.png` | ACTIVE / RATIFIED |
| `sj_kiba` | `Assets/Special Jonin/sj_kiba.png` | `Portraits/Special Jonin/sj_kiba.png` | ACTIVE / RATIFIED |
| `sj_nono` | `Assets/Special Jonin/sj_nono.png` | `Portraits/Special Jonin/sj_nono.png` | ACTIVE / RATIFIED |
| `sannin_tenten` | `Assets/Sannin/sannin_tenten.png` | `Portraits/Sannin/sannin_tenten.png` | ACTIVE / RATIFIED |
| `sannin_hinata` | `Assets/Sannin/sannin_hinata.png` | `Portraits/Sannin/sannin_hinata.png` | ACTIVE / RATIFIED |
| `sannin_sumire` | `Assets/Sannin/sannin_sumire.png` | `Portraits/Sannin/sannin_sumire.png` | ACTIVE / RATIFIED |
| `kurama_resonance_himawari` | `Assets/Rare Cards/kurama_resonance_himawari.png` | `Portraits/Rare Cards/kurama_resonance_himawari.png` | ACTIVE / RATIFIED |
| `nue` | `Assets/Summons/nue.png` | `Portraits/Summons/nue.png` | ACTIVE / RATIFIED |

Critical path casing:

`Portraits/Chunin/chunin_Itama.png`

must be consumed exactly.

Assets closure:

`Documentation/Assets/Final 116 Asset Projection Status.md`

commit `8284611341d5491c284e745f1f445b70354cbf42`.

Registry ratification:

`Documentation/Registry/Final 116 Asset Projection Registry Ratification.md`.

Do not infer, regenerate, lowercase or otherwise normalise any path from a Registry ID.

## 7. Final admission decision

# FULL 116 ADMISSION AUTHORISED FOR SC CODING EXECUTION

The PL/Registry identity, numerical calibration, final 116 scope and exact fourteen-row asset projection are all closed.

Coding may now execute the complete atomic production admission:

**+13 Characters + 1 Entity**

from:

**85 Characters + 17 Entities = 102**

to:

**98 Characters + 18 Entities = 116**.

No partial admission is authorised.

Coding / CI must still prove runtime validity and Golden/regression GREEN. Registry ratification is not a claim that Coding has already implemented or validated the new gate.

## 8. Existing live 102 regression safety

This admission does not authorise any mutation of the existing 102 identities' Base Stats, Base PL, Registry IDs, Character/Entity classification, formal-rank metadata or approved existing semantics.

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

## 10. Coding release conditions

Coding must validate:

- exact final count 116 = 98 Characters + 18 Entities;
- all fourteen new stable IDs exactly once;
- `s_jkiba` absent;
- all exact ratified card/portrait paths consumed literally;
- `Portraits/Chunin/chunin_Itama.png` casing preserved;
- all fourteen portraits decode and satisfy current production dimension contract;
- no duplicate path/alias drift;
- existing 102 identities/numerics unchanged;
- Registry/card/portrait Golden/regression gates extended atomically 102→116.

If validation fails, fix the exact defect and rerun the atomic gate. Do not create an intermediate live production count.
