# Shinobi Chronicles — Alpha Text-First Skill Catalogue v1 — Wave 1 (001–050)

**Date:** 2026-09-10  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **CATALOGUE AUTHORITY — DESIGNED / NOT AUTO-GRANTED / RUNTIME ACTIVATION SEPARATE**

## Contract

This catalogue is a reusable text-first Skill library. Every row has a stable Skill ID and exact Combat-facing effect. Presence in this file does **not** grant the Skill to any Character, prepared palette, account, team or Chronicle. `recommendedAcquisition` identifies a legitimate source family only; the owning Training / Progression / Mission / mentor / capability system must still produce exact access authority.

Alpha requires no Skill image asset. Runtime presentation may render name, discipline, rarity and text/effect data. Semantic rarity order is `normal -> common -> rare -> legendary`; exact colour values remain UI presentation authority.

All direct Attack-PL packets use current Combat damage ordering and ordinary Stamina unless stated otherwise. No row creates hidden Speed, generic crit, cooldown, mana, independent clone/projectile/construct participants, or automatic Progression/Rank/ownership.

| # | ID | Display | Discipline | Rarity | Acquisition family | Access predicate | Exact Combat semantics |
|---:|---|---|---|---|---|---|---|
| 1 | `skill_chakra_focus` | Chakra Focus | `core_shinobi` | `normal` | `academy_or_general_training` | `learned_skill_access` | setup:self; next direct authored attack +4 Attack PL; consumed on use; expires next action |
| 2 | `skill_body_replacement` | Body Replacement | `core_shinobi` | `normal` | `academy_or_general_training` | `learned_skill_access` | guard:self; 35% pre-Stamina prevention vs next direct packet; expires next action |
| 3 | `skill_clone_feint` | Clone Feint | `core_shinobi` | `normal` | `academy_or_general_training` | `learned_skill_access` | setup:self; next eligible direct attack +3 Attack PL; no clone participant |
| 4 | `skill_smoke_veil` | Smoke Veil | `core_shinobi` | `normal` | `academy_or_general_training` | `learned_skill_access` | control:one hostile; `visibility_interference` through target next action; blocks only precision-tagged actions |
| 5 | `skill_silent_step` | Silent Step | `core_shinobi` | `common` | `academy_or_general_training` | `learned_skill_access` | utility:self; commits silent-movement evidence where context permits; no Speed stat |
| 6 | `skill_wall_run_burst` | Wall Run Burst | `core_shinobi` | `common` | `academy_or_general_training` | `learned_skill_access` | utility:self; movement/reposition action; no attack; requires traversable wall context |
| 7 | `skill_water_walk_recovery` | Water Walk Recovery | `core_shinobi` | `common` | `academy_or_general_training` | `learned_skill_access` | recovery:self; restore 5 underlying Battle PL once/Battle; requires stable footing/water context |
| 8 | `skill_tree_line_reposition` | Tree-Line Reposition | `core_shinobi` | `common` | `academy_or_general_training` | `learned_skill_access` | utility:self; movement/reposition through exact tree-line route; no evasion stat |
| 9 | `skill_combat_breath` | Combat Breath | `core_shinobi` | `common` | `academy_or_general_training` | `learned_skill_access` | recovery:self; restore 4 underlying Battle PL once/Battle; normal action |
| 10 | `skill_low_profile_advance` | Low Profile Advance | `core_shinobi` | `common` | `academy_or_general_training` | `learned_skill_access` | guard:self; 20% pre-Stamina prevention vs next direct packet; expires next action |
| 11 | `skill_disengaging_roll` | Disengaging Roll | `core_shinobi` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | utility:self; explicit disengage/reposition attempt; subject to encounter exit rules; no auto-escape |
| 12 | `skill_team_signal` | Team Signal | `core_shinobi` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | support:one ally; next authored coordination-tagged action +3 Attack PL; consumed; no team aura |
| 13 | `skill_explosive_tag_toss` | Explosive Tag Toss | `core_shinobi` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | direct:one hostile; Attack PL 18; ordinary Stamina; may establish burning only if exact explosive payload authored |
| 14 | `skill_wire_trip_setup` | Wire Trip Setup | `core_shinobi` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | control:one hostile; `wire_restraint` through target next action; requires wire-capable equipment/source; not Stun |
| 15 | `skill_chakra_suppression_breath` | Chakra Suppression Breath | `core_shinobi` | `legendary` | `legendary_mentor_or_chronicle_gate` | `learned_skill_access` | setup:self; next compatible chakra-control action gains +4 Attack PL/effect marker; no Stat mutation |
| 16 | `skill_straight_palm` | Straight Palm | `taijutsu` | `normal` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 12; ordinary Stamina |
| 17 | `skill_rising_knee` | Rising Knee | `taijutsu` | `normal` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 14; ordinary Stamina |
| 18 | `skill_leaf_sweep` | Leaf Sweep | `taijutsu` | `normal` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 13; ordinary Stamina; on positive damage blocks voluntary reposition until end target action |
| 19 | `skill_driving_elbow` | Driving Elbow | `taijutsu` | `normal` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 16; ordinary Stamina |
| 20 | `skill_shoulder_break` | Shoulder Break | `taijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 18; ordinary Stamina |
| 21 | `skill_spinning_heel` | Spinning Heel | `taijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 20; ordinary Stamina |
| 22 | `skill_low_line_kick` | Low-Line Kick | `taijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 17; ordinary Stamina |
| 23 | `skill_counter_palm` | Counter Palm | `taijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 15; ordinary Stamina; if target committed direct attack since user prior action, +4 Attack PL |
| 24 | `skill_guard_breaker` | Guard Breaker | `taijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 21; ordinary Stamina; ignores one live same-source guard setup only if that guard is explicitly `guardBreakable` |
| 25 | `skill_twin_strike` | Twin Strike | `taijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 22; ordinary Stamina; one packet despite multi-hit presentation |
| 26 | `skill_body_check` | Body Check | `taijutsu` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | direct:one hostile; Attack PL 19; ordinary Stamina |
| 27 | `skill_axe_kick` | Axe Kick | `taijutsu` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | direct:one hostile; Attack PL 24; ordinary Stamina |
| 28 | `skill_intercepting_knee` | Intercepting Knee | `taijutsu` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | direct:one hostile; Attack PL 23; ordinary Stamina; valid only after target committed movement/reposition since user prior action |
| 29 | `skill_whirlwind_combination` | Whirlwind Combination | `taijutsu` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | direct:one hostile; Attack PL 27; ordinary Stamina; one damage packet despite combination animation |
| 30 | `skill_crushing_finisher` | Crushing Finisher | `taijutsu` | `legendary` | `legendary_mentor_or_chronicle_gate` | `learned_skill_access` | direct:one hostile; Attack PL 32; ordinary Stamina |
| 31 | `skill_kunai_thrust` | Kunai Thrust | `bukijutsu` | `normal` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 13; ordinary Stamina |
| 32 | `skill_kunai_cross_cut` | Kunai Cross-Cut | `bukijutsu` | `normal` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 15; ordinary Stamina |
| 33 | `skill_shuriken_fan` | Shuriken Fan | `bukijutsu` | `normal` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 12; ordinary Stamina; visible projectile count resolves as one packet |
| 34 | `skill_shuriken_pin` | Shuriken Pin | `bukijutsu` | `normal` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 11; ordinary Stamina; on positive damage blocks voluntary movement through target next action; not Stun |
| 35 | `skill_senbon_volley` | Senbon Volley | `bukijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 14; ordinary Stamina; visible projectile count resolves as one packet |
| 36 | `skill_wire_snare` | Wire Snare | `bukijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | control:one hostile; physical wire restraint through target next action; requires wire-capable equipment; not Stun |
| 37 | `skill_wire_reversal` | Wire Reversal | `bukijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | setup:self; next wire-tagged control or direct Bukijutsu action +4 Attack PL; consumed; no reaction system |
| 38 | `skill_tanto_draw` | Tantō Draw | `bukijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 18; ordinary Stamina |
| 39 | `skill_short_blade_flurry` | Short-Blade Flurry | `bukijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 20; ordinary Stamina; one packet despite multi-hit presentation |
| 40 | `skill_staff_sweep` | Staff Sweep | `bukijutsu` | `common` | `academy_or_general_training` | `learned_skill_access` | direct:one hostile; Attack PL 16; ordinary Stamina |
| 41 | `skill_spear_thrust` | Spear Thrust | `bukijutsu` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | direct:one hostile; Attack PL 19; ordinary Stamina |
| 42 | `skill_chain_hook` | Chain Hook | `bukijutsu` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | direct:one hostile; Attack PL 17; ordinary Stamina |
| 43 | `skill_explosive_kunai` | Explosive Kunai | `bukijutsu` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | direct:one hostile; Attack PL 22; ordinary Stamina; may establish burning only when an explosive-tag inventory source is legitimately consumed |
| 44 | `skill_weapon_feint` | Weapon Feint | `bukijutsu` | `rare` | `mentor_or_mission_training` | `learned_skill_access` | setup:self; next equipped-weapon direct action +5 Attack PL; consumed; no Stat mutation |
| 45 | `skill_precision_throw` | Precision Throw | `bukijutsu` | `legendary` | `legendary_mentor_or_chronicle_gate` | `learned_skill_access` | direct:one hostile; Attack PL 24; ordinary Stamina |
| 46 | `skill_fire_style_ember_shot` | Fire Style: Ember Shot | `fire` | `normal` | `element_training` | `learned_skill_access` | direct:one hostile; Attack PL 14; ordinary Stamina |
| 47 | `skill_fire_style_flame_arc` | Fire Style: Flame Arc | `fire` | `normal` | `element_training` | `learned_skill_access` | direct:one hostile; Attack PL 16; ordinary Stamina |
| 48 | `skill_fire_style_cinder_burst` | Fire Style: Cinder Burst | `fire` | `normal` | `element_training` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 13 each; ordinary Stamina |
| 49 | `skill_fire_style_ash_screen` | Fire Style: Ash Screen | `fire` | `normal` | `element_training` | `learned_skill_access` | control:up to 2 hostiles; establish `ash_visibility_interference` through each target next action; only precision/line-of-sight tagged actions affected |
| 50 | `skill_fire_style_fireball` | Fire Style: Fireball | `fire` | `normal` | `element_training` | `learned_skill_access` | direct:one hostile; Attack PL 20; ordinary Stamina |
