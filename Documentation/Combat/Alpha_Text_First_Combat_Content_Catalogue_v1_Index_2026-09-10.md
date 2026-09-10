# Shinobi Chronicles — Alpha Text-First Combat Content Catalogue v1 — Index

**Date:** 2026-09-10  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **CONTENT INDEX — 296 DEFINITIONS AUTHORED / ACTIVATION AND GOLDEN SEPARATE**

## 1. Purpose

This index records the first broad Alpha-ready text-first content production wave made possible by the decision that Skills, Items, Weapons and Gear do not require dedicated image assets for Alpha.

The catalogue contains exactly:

- **200 Skills / Techniques**;
- **24 Consumables**;
- **28 Weapons**;
- **28 Gear pieces**;
- **16 crafting/training Materials**;
- **296 total authored definitions**.

These are authored catalogue definitions. They are not 296 automatic player unlocks and they are not a claim that all 296 are already runtime-implemented or Golden.

## 2. Binding presentation / rarity authority

`Documentation/Combat/Alpha_Text_First_Items_Weapons_Gear_Rarity_Contract_2026-09-10.md`

Commit:
`7c4f65f1fdf1d68502d93b25228c283117e0ff74`

Rarity ladder:

`normal -> common -> rare -> legendary`

No image asset is required for these content families in Alpha. Rarity may be projected through text colour, but a rarity label must remain available and rarity itself never acts as an automatic PL/Stat/damage/access multiplier.

## 3. Skill catalogue

### Wave 1 — 001–050

`Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave1_001-050.md`

Commit:
`b833b146aa72da7c311f6dc649fe547715f7e873`

Coverage:
- core shinobi practice;
- Taijutsu;
- Bukijutsu;
- opening Fire Style library.

### Wave 2 — 051–100

`Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave2_051-100.md`

Commit:
`241aad55fe7f0069e82f5836f313b9a69f97b340`

Coverage:
- expanded Fire Style;
- Water Style;
- Wind Style;
- opening Lightning Style.

### Wave 3 — 101–150

`Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave3_101-150.md`

Commit:
`dcad377e58c4eb2ad7a444793ce7afa55fb1fdf1`

Coverage:
- expanded Lightning Style;
- Earth Style;
- Genjutsu.

### Wave 4 — 151–200

`Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave4_151-200.md`

Commit:
`65203534e11ac855859f6b59a353558a3bcd0ecb`

Coverage:
- Fūinjutsu;
- medical/sensory Skills;
- Wood Release;
- capability-gated Sharingan / Byakugan / Gentle Fist / Nara / Yamanaka / Akimichi / Inuzuka / kikaichū / Ink Arts / Uzumaki Chains / Eight Gates examples.

Every Skill row has:
- stable Skill ID;
- display name;
- discipline;
- rarity;
- recommended acquisition/source family;
- access predicate;
- exact Combat-facing effect.

Catalogue presence does not grant the Skill.

## 4. Item / Weapon / Gear / Material catalogue

### Wave 1 — 001–048

`Documentation/Combat/Alpha_Item_Weapon_Gear_Catalogue_v1_Wave1_001-048.md`

Commit:
`d690875a738c75b0bba69ffc2f60b6286e8e953c`

Contains:
- 24 Consumables;
- first 24 Weapons.

Preserves current live Alpha rows:
- `field_recovery_pill`;
- `standard_antidote`;
- `burn_treatment`;
- `kunai`;
- `shuriken_set`;
- `ninja_wire`;
- `bandit_captains_tanto`.

New rows remain catalogue-only until exact acquisition/runtime authority activates them.

### Wave 2 — 049–096

`Documentation/Combat/Alpha_Item_Weapon_Gear_Catalogue_v1_Wave2_049-096.md`

Commit:
`7409b9a5d32da23bfd99e37364252d26a7ca2a14`

Contains:
- final 4 Weapons;
- 28 Gear pieces;
- 16 crafting/training Materials.

Equipment modifiers affect Effective State only and preserve existing exact-instance/proficiency/acclimation doctrine.

## 5. Hashirama / Yamato Wood Release correction

New explicit player-direction authority:

`Documentation/SC_Combat_Genin_Hashirama_Yamato_Wood_Release_Possession_Access_Boundary_2026-09-10.md`

Commit:
`1bc85d3fb16088da72df9712e0b8494b3d2a3b9a`

Binding rule:

- `genin_hashirama` possesses Wood Release from representation start;
- `genin_yamato` possesses Wood Release from representation start;
- executable Wood Release Access remains locked behind legitimate requirements;
- possession does not alter current Base Stats/Base PL;
- failed access checks reject before action/history commit.

Capability grammar:

```text
capability.wood_release.possessed = true
capability.wood_release.access = false by default
```

The catalogue may therefore contain Wood Release Skills now while exact Progression/Bloodline requirements still govern when either Character can actually learn/prepare/use them.

## 6. Is 200 Skills overkill?

**As an authored catalogue: NO.**

A large text-first library is useful because Shinobi Chronicles needs enough content for:
- training rewards;
- mentor teaching;
- mission discoveries;
- scroll/formula rewards;
- character-specific prepared palettes;
- elemental specialization;
- clan/bloodline capability gates;
- Fūinjutsu / medical / sensory development;
- future world/mission reward pools.

**As 200 mandatory bespoke runtime integrations before Alpha: YES.**

The correct Alpha strategy is therefore:

1. author stable catalogue definitions now;
2. activate only legitimately sourced rows;
3. use the same definitions across character palettes, training, missions and rewards;
4. implement catalogue ingestion/presentation once rather than hard-coding duplicate technique text in many systems;
5. expand runtime coverage according to actual Alpha callers;
6. keep implementation/runtime/Golden status explicit per activated content slice.

## 7. Recommended next Combat production

After the current 25-Genin Assets gate and CE repertoire audit return, Combat should use this catalogue as the baseline source library when closing the 25 new Genin prepared palettes.

Where a representation requires a technique not yet in this 200-Skill library, author a new stable Skill row rather than overloading an unrelated existing row.

Separately, World/Missions/Training/Progression can later bind exact acquisition evidence to these IDs without inventing their effects.

Likewise Item/Weapon/Gear catalogue rows can be bound later to mission rewards, shops, crafting, discoveries and loot through their owning source systems without requiring artwork.

## 8. Status distinction

- text-first Alpha presentation rule: **DESIGN CLOSED**;
- rarity ladder: **DESIGN CLOSED**;
- 200 Skill catalogue definitions: **AUTHORED / DURABLE**;
- 96 Item/Weapon/Gear/Material definitions: **AUTHORED / DURABLE**;
- Hashirama/Yamato Wood Release possession: **CLOSED**;
- exact Wood Release unlock requirements: **NOT COMBAT-OWNED / PENDING APPROPRIATE DEVELOPMENT AUTHORITY**;
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
- image absent != content absent;
- Equipment modifier != Base Stat mutation;
- possession != access;
- famous future repertoire != Genin repertoire;
- authored != implemented != runtime validated != Golden GREEN.
