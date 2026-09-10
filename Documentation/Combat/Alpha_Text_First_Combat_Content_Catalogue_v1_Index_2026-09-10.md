# Shinobi Chronicles — Alpha Text-First Combat Content Catalogue v1 — Index

**Date:** 2026-09-10  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **CONTENT INDEX — 356 DEFINITIONS AUTHORED / ACTIVATION AND GOLDEN SEPARATE**

## 1. Current authored catalogue

The Alpha text-first catalogue now contains exactly:

- **260 Skills / Techniques**;
- **24 Consumables**;
- **28 Weapons**;
- **28 Gear pieces**;
- **16 crafting/training Materials**;
- **356 total authored definitions**.

These are durable content definitions, not automatic player unlocks and not a claim that all 356 rows are runtime-implemented or Golden.

## 2. Presentation / rarity authority

`Documentation/Combat/Alpha_Text_First_Items_Weapons_Gear_Rarity_Contract_2026-09-10.md`

Commit: `7c4f65f1fdf1d68502d93b25228c283117e0ff74`

Rarity ladder:

`normal -> common -> rare -> legendary`

No dedicated image asset is required for Skills, Items, Weapons or Gear in Alpha. Rarity may be projected through text colour, but the rarity label remains available and rarity itself is not an automatic PL/Stat/damage/access multiplier.

## 3. Skill catalogue

### Wave 1 — 001–050
`Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave1_001-050.md`  
commit `b833b146aa72da7c311f6dc649fe547715f7e873`

Coverage: core shinobi practice, Taijutsu, Bukijutsu, opening Fire Style.

### Wave 2 — 051–100
`Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave2_051-100.md`  
commit `241aad55fe7f0069e82f5836f313b9a69f97b340`

Coverage: expanded Fire, Water, Wind, opening Lightning.

### Wave 3 — 101–150
`Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave3_101-150.md`  
commit `dcad377e58c4eb2ad7a444793ce7afa55fb1fdf1`

Coverage: expanded Lightning, Earth, Genjutsu.

### Wave 4 — 151–200
`Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave4_151-200.md`  
commit `65203534e11ac855859f6b59a353558a3bcd0ecb`

Coverage: Fūinjutsu, medical/sensory, Wood Release, capability-gated Sharingan / Byakugan / Gentle Fist / Nara / Yamanaka / Akimichi / Inuzuka / kikaichū / Ink Arts / Uzumaki Chains / Eight Gates examples.

### Wave 5 — 201–230
`Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave5_201-230_Kinjutsu_Echo.md`  
commit `4076279ffb4bc09539183f7ec56088af4b0e208c`

Coverage:
- 15 general Kinjutsu techniques;
- 15 Echo-interface / relationship techniques;
- exact Technique-local self-cost/risk where authored;
- bounded source/Memory/causal reads rather than omniscience;
- no automatic Echo ownership/turn/PL.

### Wave 6 — 231–260
`Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave6_231-260_Menma_Echo_TailedBeast.md`  
commit `7f9716480ab2fb6bb904cc16c306516ef0a51542`

Coverage:
- 15 Menma / `arc1_menma_echo` later-development techniques;
- 10 reusable Hosted-Tailed-Beast technique families;
- Kurama-specific hosted techniques;
- Menma + Echo + voluntary-Kurama three-source techniques;
- exact current-source predicates preventing prior Mission-12 experience from becoming standing Kurama access.

Kinjutsu/Echo/Tailed-Beast boundary:

`Documentation/Combat/SC_Combat_Kinjutsu_Echo_Tailed_Beast_Catalogue_Boundary_2026-09-10.md`  
commit `c7f80c56b1ec364386947a8cf7f01b66d58e5e84`

Every Skill row keeps stable identity, rarity, acquisition/source family, access predicate and exact Combat-facing semantics. Catalogue presence does not grant the Skill.

## 4. Item / Weapon / Gear / Material catalogue

### Wave 1 — 001–048
`Documentation/Combat/Alpha_Item_Weapon_Gear_Catalogue_v1_Wave1_001-048.md`  
commit `d690875a738c75b0bba69ffc2f60b6286e8e953c`

Contains 24 Consumables and first 24 Weapons. Existing Alpha-live rows remain:
`field_recovery_pill`, `standard_antidote`, `burn_treatment`, `kunai`, `shuriken_set`, `ninja_wire`, `bandit_captains_tanto`.

### Wave 2 — 049–096
`Documentation/Combat/Alpha_Item_Weapon_Gear_Catalogue_v1_Wave2_049-096.md`  
commit `7409b9a5d32da23bfd99e37364252d26a7ca2a14`

Contains final 4 Weapons, 28 Gear pieces and 16 crafting/training Materials. Equipment modifiers affect Effective State only and preserve exact-instance/proficiency/acclimation doctrine.

## 5. Hashirama / Yamato Wood Release

`Documentation/SC_Combat_Genin_Hashirama_Yamato_Wood_Release_Possession_Access_Boundary_2026-09-10.md`  
commit `1bc85d3fb16088da72df9712e0b8494b3d2a3b9a`

Binding rule:

- `genin_hashirama` possesses Wood Release from representation start;
- `genin_yamato` possesses Wood Release from representation start;
- executable access remains locked behind legitimate requirements;
- possession does not alter current Base Stats/Base PL;
- failed access checks reject before action/history commit.

## 6. Menma / Echo / Kurama preservation

Existing Mission-12 Combat authority remains unchanged. In particular, the catalogue does not replace or rename:

- `echo_menma_reciprocal_chakra_strike`;
- `echo_menma_threaded_route_burst`;
- `echo_menma_route_read`;
- `echo_menma_reciprocal_guard`;
- `echo_menma_adaptive_reroute`;
- `arc1_m12_echo_kurama_routed_burst`;
- `arc1_m12_borrowed_kurama_chakra_strike`;
- `arc1_m12_borrowed_kurama_shroud`;
- `arc1_m12_echo_kurama_compensatory_recovery`.

`progression_receipt_arc1_m12_coordinated_kurama_loan_experience` remains historical repeatability evidence, not current Kurama Access. Any new three-source Skill still requires a new current authorised voluntary Kurama source.

## 7. Production strategy

A large authored catalogue is desirable; a requirement to bespoke-integrate every row before Alpha is not.

Use this sequence:

1. author stable distinct definitions;
2. bind only legitimate source/development opportunities;
3. grant/own through proper authority;
4. prepare/equip separately;
5. execute only when Battle predicates are satisfied;
6. implement generic resolver families where possible;
7. prove activated slices through runtime/Golden rather than claiming catalogue-wide GREEN.

The next major Combat consumer remains the 25-Genin prepared-palette wave after CE's exact repertoire audit. This 260-Skill catalogue is the reusable source library for that work.

## 8. Status distinction

- text-first Alpha presentation: **DESIGN CLOSED**;
- rarity ladder: **DESIGN CLOSED**;
- 260 Skill catalogue definitions: **AUTHORED / DURABLE**;
- 96 Item/Weapon/Gear/Material definitions: **AUTHORED / DURABLE**;
- Kinjutsu/Echo/Tailed-Beast expansion boundary: **CLOSED**;
- Hashirama/Yamato Wood Release possession: **CLOSED**;
- catalogue-wide acquisition/source bindings: **NOT YET CLOSED**;
- catalogue-wide runtime implementation: **NOT CLAIMED**;
- catalogue-wide Golden/regression: **NOT CLAIMED**.

## 9. Non-collapse

- catalogue != ownership;
- catalogue != prepared palette;
- source eligibility != grant;
- mission completion != Skill unlock automatically;
- training attempt != mastery;
- rarity != power automatically;
- Kinjutsu Stat != Kinjutsu repertoire;
- Echo relationship != every Echo Skill;
- Hosted Entity PL != host PL;
- prior Kurama-loan experience != current Kurama access;
- source participation != second turn;
- authored != implemented != runtime validated != Golden GREEN.
