# Shinobi Chronicles — Awaiting Placement Expansion: Ten Ninja + Nue

**Status:** Registry / PL calibration authority; Combat semantic closure pending  
**Date:** 2026-09-04

This document extends the existing awaiting-placement wave. The folder now contains **12 ninja Character cards + 1 Summon/Entity card** total: the previously calibrated `chunin_iruka` and `sj_anko`, plus the ten additional ninja and `nue` below.

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Formula v1.0 remains:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

The current live collectible gate remains **85 Characters + 17 Entities = 102** until actual production admission/Coding ingestion. If all twelve awaiting ninja plus Nue are admitted, the new gate becomes **97 Characters + 18 Entities = 115**.

This supersedes the earlier provisional note that only Iruka + Anko would raise the gate to 104.

---

## 1. Additional Character calibrations

| Registry ID | Display | Rank/Variant | Base Stats | Base PL |
|---|---|---|---|---:|
| `chunin_fugaku` | Chūnin Fugaku | Chūnin | `38/34/32/20/26/35/36` | **37** |
| `chunin_itama` | Chūnin Itama | Chūnin | `34/36/33/18/22/20/38` | **36** |
| `genin_mikoto` | Genin Mikoto | Genin | `24/20/19/11/14/22/21` | **23** |
| `genin_orochimaru` | Genin Orochimaru | Genin | `29/24/20/18/28/25/27` | **28** |
| `akatsuki_kakuzu` | Akatsuki Kakuzu | Akatsuki | `86/76/68/50/88/40/96` | **91** |
| `sj_kiba` | Special Jōnin Kiba | Special Jōnin | `46/60/48/20/32/22/62` | **58** |
| `sj_nono` | Special Jōnin Nono | Special Jōnin | `52/34/31/58/44/40/55` | **55** |
| `sannin_tenten` | Sannin Tenten | Sannin | `68/62/94/70/74/44/80` | **88** |
| `sannin_hinata` | Sannin Hinata | Sannin | `80/100/55/64/40/72/94` | **94** |
| `sannin_sumire` | Sannin Sumire | Sannin | `90/72/66/82/96/80/90` | **93** |

Previously calibrated and still authoritative:

- `chunin_iruka` — `32/30/31/26/18/27/34` — PL **33**
- `sj_anko` — `56/52/48/44/58/39/55` — PL **56**

---

## 2. Exact Character Skill palettes for Combat closure

### `chunin_fugaku`

Representation authority:

- ordinary Sharingan access/expression is authorised for this exact variant;
- no Mangekyō Sharingan;
- ocular access does not grant unrelated Sharingan Techniques by family inference.

Prepared palette:

1. `chunin_fugaku_fire_style_great_fireball` — Ninjutsu; direct fire action.
2. `chunin_fugaku_fire_style_phoenix_flower` — Ninjutsu; multi-projectile presentation does not automatically multiply packets.
3. `chunin_fugaku_uchiha_shuriken_array` — Bukijutsu; direct/projectile action.
4. `chunin_fugaku_sharingan_read` — information/ocular action; legitimate observable evidence only; no automatic Knowledge/accuracy/evasion.
5. `chunin_fugaku_wire_counter` — Bukijutsu; counter/control context; exact restraint/counter semantics to Combat.

### `chunin_itama`

No Wood Release or other Senju-exclusive expression is inferred merely from surname/lineage.

Prepared palette:

1. `chunin_itama_clone_pincer` — Ninjutsu setup/attack coordination; clone construct is not an independent participant.
2. `chunin_itama_leaf_gale` — Taijutsu direct action.
3. `chunin_itama_kunai_intercept` — Bukijutsu direct/defensive interception.
4. `chunin_itama_guarded_advance` — defensive/reposition action; no hidden Defense/Speed Stat.
5. `chunin_itama_battlefield_read` — information/tactical observation; no omniscience or automatic prediction success.

### `genin_mikoto`

Representation authority:

- ordinary Sharingan access/expression is authorised for this exact Genin variant;
- no Mangekyō Sharingan;
- no exact tomoe count is inferred from artwork unless separately authored later.

Prepared palette:

1. `genin_mikoto_fire_style_fireball` — Ninjutsu direct action.
2. `genin_mikoto_uchiha_shuriken_cast` — Bukijutsu direct/projectile action.
3. `genin_mikoto_sharingan_read` — ocular information action; observable evidence only.
4. `genin_mikoto_wire_feint` — Bukijutsu setup/control; deception does not auto-create belief.
5. `genin_mikoto_substitution_counter` — Ninjutsu defensive/counter setup.

### `genin_orochimaru`

This is the young Genin representation. It does not inherit later Sannin/Orochimaru body-replacement, immortality, Curse Mark, laboratory, or high-tier forbidden-Technique packages.

Prepared palette:

1. `genin_orochimaru_wind_style_gale_palm` — Ninjutsu direct/reposition pressure; no automatic displacement unless Combat qualifies it.
2. `genin_orochimaru_serpent_sleeve` — Ninjutsu serpent-assisted direct/control action; serpent source is not automatically a separate Battle participant.
3. `genin_orochimaru_kunai_feint` — Bukijutsu direct/setup.
4. `genin_orochimaru_substitution` — Ninjutsu defensive action.
5. `genin_orochimaru_technique_dissection` — information/analysis action; observing a Technique does not grant ownership/mastery.

### `akatsuki_kakuzu`

Embodied representation authority:

- `earth_grudge_fear` is intrinsic to this exact Kakuzu representation;
- the stitched/thread body and multiple-heart state are not external Equipment or Summons;
- no separate heart/mask participant slots are inferred merely from causal source representation;
- multiple hearts must not be represented as a generic Health bar.

Prepared palette:

1. `akatsuki_kakuzu_earth_style_earth_spear` — Ninjutsu defensive/hardening action; exact prevention semantics to Combat.
2. `akatsuki_kakuzu_earth_grudge_fear_threads` — Kinjutsu physical/control action using thread-body provenance.
3. `akatsuki_kakuzu_wind_style_pressure_damage` — Ninjutsu area/direct wind action.
4. `akatsuki_kakuzu_lightning_style_false_darkness` — Ninjutsu direct lightning action.
5. `akatsuki_kakuzu_fire_style_searing_migraine` — Ninjutsu area/direct fire action.

Combat must separately author the multiple-heart lifecycle/gating if it is mechanically represented. Destroying/losing a heart may affect survival or exact elemental access, but must not silently rewrite historical occurrence or invent a universal Health subsystem.

### `sj_kiba`

Representation authority:

- Kiba + Akamaru remain an **inherently paired one-slot representation**;
- Akamaru is a legitimate causal participant/source within that representation;
- Akamaru does not consume a second collectible/team/deployment slot;
- Kiba and Akamaru do not become a generic Summon relation.

Prepared palette:

1. `sj_kiba_beast_human_tracking` — sensory/tracking information action; bounded evidence, not omniscience.
2. `sj_kiba_four_legs_technique` — source-owned combat-state/action setup; no hidden Speed Stat.
3. `sj_kiba_fang_over_fang` — Kiba/Akamaru paired direct action.
4. `sj_kiba_man_beast_clone` — paired-form action; does not create an extra participant slot.
5. `sj_kiba_three_headed_wolf_fang` — advanced paired transformation/attack; Combat must author exact temporary-state and packet semantics without duplicating Akamaru PL.

### `sj_nono`

Primary specialist identity: medical/intelligence support. Rank does not itself grant PL.

Prepared palette:

1. `sj_nono_mystical_palm` — medical restoration/support; exact Battle-PL restoration authority to Combat.
2. `sj_nono_chakra_scalpel` — Ninjutsu/Taijutsu direct action.
3. `sj_nono_emergency_stabilization` — medical protective/support action; stabilization ≠ generic healing unless resolver authorises restoration.
4. `sj_nono_disguise_feint` — covert/deception setup; no automatic belief/identity rewrite.
5. `sj_nono_medical_read` — medical information/assessment action; no omniscient diagnosis beyond legitimate evidence.

### `sannin_tenten`

Prepared palette:

1. `sannin_tenten_rising_twin_dragons` — Bukijutsu weapon barrage; visible weapon count does not automatically equal packet count.
2. `sannin_tenten_heavenly_chain_array` — Bukijutsu control/restraint.
3. `sannin_tenten_sealing_scroll_armory` — Fūinjutsu/Bukijutsu weapon-access setup; scroll contents require legitimate authored inventory/source authority.
4. `sannin_tenten_weapon_storm` — Bukijutsu area weapon action.
5. `sannin_tenten_bashosen_five_nature_fan` — Equipment-gated signature action if Bashōsen is explicitly present/owned for this representation.

**Items/Equipment boundary:** Bashōsen is not silently created by Skill access. If this fifth Skill is retained, Equipment authority must author the exact Bashōsen source/availability. Base Stats/PL do not include a hidden Equipment projection.

### `sannin_hinata`

Representation authority:

- Byakugan access/expression is explicit for this exact variant;
- no unrelated ocular Technique inheritance by family name.

Prepared palette:

1. `sannin_hinata_byakugan_read` — ocular information action; observable/evidentiary scope only.
2. `sannin_hinata_gentle_step_twin_lion_fists` — Taijutsu/Ninjutsu direct action.
3. `sannin_hinata_eight_trigrams_one_twenty_eight_palms` — Taijutsu multi-strike technique; visible strike count does not automatically equal packet count.
4. `sannin_hinata_air_palm_barrage` — Taijutsu/Ninjutsu ranged pressure action.
5. `sannin_hinata_heavenly_rotation` — defensive Taijutsu/Ninjutsu action; exact prevention ratio/lifetime to Combat.

### `sannin_sumire`

Representation authority:

- explicit access to the separate `nue` Summon/Entity is authorised for this exact Sannin variant;
- access ≠ active summon ≠ deployment;
- Sumire Base Stats/PL do **not** include Nue's Stats/PL;
- the card image containing Nue does not collapse the two identities.

Prepared palette:

1. `sannin_sumire_water_style_water_bullet` — Ninjutsu direct water action.
2. `sannin_sumire_water_style_water_wall` — Ninjutsu defensive water action.
3. `sannin_sumire_gozu_tenno_binding` — Kinjutsu/Fūinjutsu control/seal action; exact target/lifetime to Combat.
4. `sannin_sumire_chakra_suppression_seal` — Fūinjutsu control/interference; must name exact suppressible package/state rather than generic shutdown.
5. `sannin_sumire_nue_resonance` — source/relationship support action requiring legitimate `nue` access/presence where applicable; grants no PL transfer and does not itself summon Nue.

Nue deployment should remain under the Summon system rather than being smuggled into an ordinary Character Skill.

---

## 3. New Summon / Entity calibration

### `nue`

Display: **Nue**  
Category: **Summon / Entity**  
Base Stats:

`92/98/60/55/96/65/105`

Base PL:

**100**

Nue is an independent calibrated Entity. Its Stats/PL never transfer wholesale to Sumire.

Proposed Entity action palette for Combat/Summon closure:

1. `nue_rending_claw` — Taijutsu direct action.
2. `nue_tail_lash` — Taijutsu direct/area intent; exact target count and packet structure to Combat.
3. `nue_chakra_maw` — Kinjutsu direct/control intent; must not invent a generic Chakra resource transfer if no such resolver exists.
4. `nue_energy_burst` — Ninjutsu/Kinjutsu area energy action.
5. `nue_dimensional_pounce` — movement/reposition attack context; no hidden Speed/teleport omnipotence and no world-state traversal beyond authored Battle scope.

Summon lifecycle:

- `sannin_sumire` has explicit Nue access, but access does not mean Nue begins every Battle active;
- deployment/attachment/participation uses Summon authority;
- no automatic Sumire Effective-Stat package is granted merely because Nue is owned/available;
- if a future relationship package grants Sumire a source-owned modifier, it must be separately authored and projected exactly once;
- Nue's own actions and Battle PL remain Entity-owned.

---

## 4. Placement-wave count and admission boundary

Current live production collectible gate remains:

**85 Characters + 17 Entities = 102**

Awaiting-placement collectible expansion now contains:

**12 Characters**

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

plus **1 Entity/Summon**:

- `nue`

If all thirteen are admitted after Combat closure/Coding integration:

**97 Characters + 18 Entities = 115 live collectible production identities**

Do not increment the live gate merely because card assets or this calibration document exist.

The current 102-row Battle Portrait manifest remains correct for the current live gate. Production admission of these thirteen requires explicit card/portrait mapping expansion to 115; do not infer new portrait paths from filenames.

---

## 5. Combat handoff boundary

PL/Registry has now closed Base Stats / Base PL and proposed exact prepared/action IDs for all twelve awaiting ninja plus Nue.

Combat owns:

- final action class;
- target mode;
- direct/area packet structure;
- Attack PL;
- prevention/guard ratios;
- control disciplines/scalars where resolver-required;
- durations/action-opportunity lifetimes;
- condition semantics;
- restoration values;
- multi-source/joint action semantics;
- summon deployment/action lifecycle;
- Kakuzu multiple-heart lifecycle;
- Kiba/Akamaru paired-action lifecycle;
- Nue entity participation;
- any Equipment gating for Tenten/Bashōsen.

PL should only be asked back for genuinely PL-owned numeric slots after Combat identifies them.

Hard boundaries:

**rank ≠ PL**

**artwork ≠ mechanics**

**access ≠ active state ≠ embodiment/deployment**

**paired representation ≠ two team slots**

**Summon PL ≠ summoner PL**

**Equipment Skill access ≠ Equipment ownership**

**ocular access ≠ all ocular Techniques**

**multi-projectile/multi-hit presentation ≠ packet count**

**movement Technique ≠ hidden Speed Stat**

**information action ≠ omniscience/Knowledge ownership**
