# Shinobi Chronicles — Alpha Text-First Item / Weapon / Gear Catalogue v1 — Wave 1 (001–048)

**Date:** 2026-09-10  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **CATALOGUE AUTHORITY — DESIGNED / ACTIVATION EXPLICIT PER ROW**

This catalogue consumes the Alpha text-first rarity contract. No row requires an image asset. Existing `alpha_live` rows preserve current live Combat authority; `catalogue_only` rows are authored content but are not automatically placed into Inventory, shops, mission rewards, crafting, Battle Pouch or runtime tables.

Semantic rarity order is `normal -> common -> rare -> legendary`. Rarity never grants access, ownership, proficiency or an automatic multiplier.

| # | ID | Display | Kind | Rarity | Slot/use family | Exact effect / semantic | Activation |
|---:|---|---|---|---|---|---|---|
| 1 | `field_recovery_pill` | Field Recovery Pill | `consumable` | `common` | `battle_pouch` | restore 4 underlying Remaining Battle PL, capped; self-target; successful use consumes 1 quantity + current actor action | `alpha_live` |
| 2 | `standard_antidote` | Standard Antidote | `consumable` | `normal` | `battle_pouch` | cure one compatible generic poisoned state on self; successful use consumes 1 quantity + current actor action | `alpha_live` |
| 3 | `burn_treatment` | Burn Treatment | `consumable` | `normal` | `battle_pouch` | cure generic burning on self; successful use consumes 1 quantity + current actor action | `alpha_live` |
| 4 | `field_bandage` | Field Bandage | `consumable` | `normal` | `battle_pouch_candidate` | restore 2 underlying Battle PL; does not cure authored injury | `catalogue_only` |
| 5 | `chakra_ration` | Chakra Ration | `consumable` | `common` | `battle_pouch_candidate` | restore 5 underlying Battle PL; no Stat/PL-max increase | `catalogue_only` |
| 6 | `concentrated_recovery_pill` | Concentrated Recovery Pill | `consumable` | `rare` | `battle_pouch_candidate` | restore 8 underlying Battle PL; capped; no resurrection | `catalogue_only` |
| 7 | `refined_antidote` | Refined Antidote | `consumable` | `common` | `battle_pouch_candidate` | cure generic poisoned; may cure another exact toxin only when that toxin declares this item compatible | `catalogue_only` |
| 8 | `cooling_salve` | Cooling Salve | `consumable` | `common` | `battle_pouch_candidate` | cure generic burning and restore 2 underlying Battle PL; no injury repair | `catalogue_only` |
| 9 | `smoke_bomb` | Smoke Bomb | `consumable` | `normal` | `targeted_battle_item` | establish `visibility_interference` on up to 2 hostiles through their next action; precision/line-of-sight tags only | `catalogue_only_requires_targeted_item_support` |
| 10 | `flash_bomb` | Flash Bomb | `consumable` | `common` | `targeted_battle_item` | establish `flash_interference` on one hostile through next action; not Stun; no Speed effect | `catalogue_only_requires_targeted_item_support` |
| 11 | `explosive_tag_pack` | Explosive Tag Pack | `consumable` | `common` | `skill_payload` | consumable payload for exact explosive-tag Skills; payload alone does not create an attack | `catalogue_only` |
| 12 | `poison_coating_kit` | Poison Coating Kit | `consumable` | `common` | `prebattle_weapon_prep` | prepare one compatible weapon so next positive-damage compatible hit applies generic poisoned; consumed on successful coating | `catalogue_only` |
| 13 | `wire_spool` | Ninja Wire Spool | `consumable` | `normal` | `skill_payload` | source for wire-tagged Skills/controls; no direct attack and no automatic restraint | `catalogue_only` |
| 14 | `chakra_conductive_oil` | Chakra-Conductive Oil | `consumable` | `common` | `prebattle_weapon_prep` | next compatible Lightning-tagged equipped-weapon direct action gains +4 Attack PL; consumed on that action; no Stat mutation | `catalogue_only` |
| 15 | `field_splint` | Field Splint | `consumable` | `common` | `field_support` | commits bounded stabilisation/support evidence for a compatible limb injury; does not cure/remove injury | `catalogue_only` |
| 16 | `clotting_powder` | Clotting Powder | `consumable` | `common` | `battle_pouch_candidate` | restore 3 underlying Battle PL; does not erase bleeding/injury history unless exact condition declares compatibility | `catalogue_only` |
| 17 | `emergency_recovery_pill` | Emergency Recovery Pill | `consumable` | `rare` | `battle_pouch_candidate` | restore 12 underlying Battle PL; capped; no resurrection | `catalogue_only` |
| 18 | `cleansing_formula` | Cleansing Formula | `consumable` | `rare` | `battle_pouch_candidate` | cure one selected compatible generic condition: poisoned or burning; one successful use | `catalogue_only` |
| 19 | `sealing_ink_capsule` | Sealing Ink Capsule | `consumable` | `common` | `skill_payload` | consumable material for exact Fūinjutsu actions that declare `inkRequired`; does not grant seal access | `catalogue_only` |
| 20 | `sensor_powder` | Sensor Powder | `consumable` | `rare` | `field_support` | commit bounded local trace/presence evidence when a detectable physical/chakra trace exists; no identity omniscience | `catalogue_only` |
| 21 | `chakra_anchor_talisman` | Chakra Anchor Talisman | `consumable` | `rare` | `battle_pouch_candidate` | 25% pre-Stamina prevention against next qualifying direct packet on self; one packet; consumed | `catalogue_only` |
| 22 | `soldier_medicine_pill` | Soldier Medicine Pill | `consumable` | `rare` | `battle_pouch_candidate` | restore 8 underlying Battle PL and grant +3 Attack PL to next direct action; consumed; no Base/Stat mutation | `catalogue_only` |
| 23 | `phoenix_salve` | Phoenix Salve | `consumable` | `legendary` | `battle_pouch_candidate` | cure generic burning and restore 10 underlying Battle PL; no resurrection or authored-injury erasure | `catalogue_only` |
| 24 | `nine_herb_elixir` | Nine-Herb Elixir | `consumable` | `legendary` | `battle_pouch_candidate` | restore 16 underlying Battle PL and cure one selected generic poisoned/burning state; capped; no resurrection | `catalogue_only` |
| 25 | `kunai` | Kunai | `weapon` | `normal` | `weapon` | no intrinsic Stat modifier; enables compatible kunai/Bukijutsu actions | `alpha_live` |
| 26 | `shuriken_set` | Shuriken Set | `weapon` | `normal` | `weapon` | no intrinsic Stat modifier; enables compatible shuriken/Bukijutsu actions; projectile count does not imply packet count | `alpha_live` |
| 27 | `ninja_wire` | Ninja Wire | `weapon` | `normal` | `weapon_tool` | no intrinsic Stat modifier; enables compatible wire actions; does not restrain automatically | `alpha_live` |
| 28 | `bandit_captains_tanto` | Bandit Captain's Tantō | `weapon` | `rare` | `weapon` | +3 Effective Bukijutsu before proficiency realisation; existing acclimation/proficiency doctrine applies | `alpha_live` |
| 29 | `academy_training_tanto` | Academy Training Tantō | `weapon` | `normal` | `weapon` | +1 Effective Bukijutsu before proficiency realisation | `catalogue_only` |
| 30 | `iron_tanto` | Iron Tantō | `weapon` | `common` | `weapon` | +2 Effective Bukijutsu before proficiency realisation | `catalogue_only` |
| 31 | `balanced_kunai` | Balanced Kunai | `weapon` | `common` | `weapon` | +1 Effective Bukijutsu before proficiency realisation; enables kunai actions | `catalogue_only` |
| 32 | `weighted_shuriken_set` | Weighted Shuriken Set | `weapon` | `common` | `weapon` | +1 Effective Bukijutsu before proficiency realisation; enables shuriken actions | `catalogue_only` |
| 33 | `short_sword` | Shinobi Short Sword | `weapon` | `common` | `weapon` | +2 Effective Bukijutsu before proficiency realisation | `catalogue_only` |
| 34 | `bo_staff` | Bō Staff | `weapon` | `common` | `weapon` | +2 Effective Bukijutsu before proficiency realisation | `catalogue_only` |
| 35 | `shinobi_spear` | Shinobi Spear | `weapon` | `common` | `weapon` | +2 Effective Bukijutsu before proficiency realisation | `catalogue_only` |
| 36 | `chain_sickle` | Chain Sickle | `weapon` | `common` | `weapon` | +2 Effective Bukijutsu before proficiency realisation; chain controls still require exact Skill | `catalogue_only` |
| 37 | `senbon_case` | Senbon Case | `weapon` | `common` | `weapon` | +1 Effective Bukijutsu before proficiency realisation; enables senbon actions | `catalogue_only` |
| 38 | `chakra_conductive_blade` | Chakra-Conductive Blade | `weapon` | `rare` | `weapon` | +3 Effective Bukijutsu before proficiency realisation; elemental channeling requires exact compatible Skill/access | `catalogue_only` |
| 39 | `fuma_shuriken` | Fūma Shuriken | `weapon` | `rare` | `weapon` | +3 Effective Bukijutsu before proficiency realisation; one thrown Skill packet unless exact action says otherwise | `catalogue_only` |
| 40 | `twin_short_blades` | Twin Short Blades | `weapon` | `rare` | `weapon` | +3 Effective Bukijutsu before proficiency realisation; dual-wield presentation does not double packets | `catalogue_only` |
| 41 | `heavy_war_fan` | Heavy War Fan | `weapon` | `rare` | `weapon` | +3 Effective Bukijutsu before proficiency realisation; elemental/fan techniques require exact access | `catalogue_only` |
| 42 | `reinforced_gauntlets` | Reinforced Combat Gauntlets | `weapon` | `rare` | `weapon` | +2 Effective Taijutsu before proficiency realisation | `catalogue_only` |
| 43 | `chakra_knuckle_blades` | Chakra Knuckle Blades | `weapon` | `rare` | `weapon` | +2 Effective Taijutsu and +1 Effective Bukijutsu before proficiency realisation | `catalogue_only` |
| 44 | `executioner_style_cleaver` | Executioner-Style Cleaver | `weapon` | `rare` | `weapon` | +4 Effective Bukijutsu before proficiency realisation; no special regeneration/heritage effect | `catalogue_only` |
| 45 | `white_fang_tanto` | White Fang Tantō | `weapon` | `legendary` | `weapon` | +5 Effective Bukijutsu before proficiency realisation; further legendary synergy requires exact provenance/compatibility authority | `catalogue_only` |
| 46 | `kusanagi_blade` | Kusanagi Blade | `weapon` | `legendary` | `weapon` | +5 Effective Bukijutsu before proficiency realisation; special technique/synergy effects require exact authority | `catalogue_only` |
| 47 | `uchiha_gunbai` | Uchiha Gunbai | `weapon` | `legendary` | `weapon` | +4 Effective Bukijutsu before proficiency realisation; reflection/guard effects require exact Skill or provenance authority | `catalogue_only` |
| 48 | `samehada` | Samehada | `weapon` | `legendary` | `weapon` | +4 Effective Bukijutsu before proficiency realisation; sentience/chakra-drain/synergy require exact Entity/provenance authority | `catalogue_only` |
