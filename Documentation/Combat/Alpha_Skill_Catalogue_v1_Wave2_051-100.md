# Shinobi Chronicles — Alpha Text-First Skill Catalogue v1 — Wave 2 (051–100)

**Date:** 2026-09-10  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **CATALOGUE AUTHORITY — DESIGNED / NOT AUTO-GRANTED / RUNTIME ACTIVATION SEPARATE**

This file continues the binding catalogue contract from Wave 1. Catalogue presence does not grant access. Rarity is semantic/presentation metadata only and does not bypass progression, capability or source requirements. All direct packets use current Combat damage ordering and ordinary Stamina unless explicitly stated.

| # | ID | Display | Discipline | Rarity | Acquisition family | Access predicate | Exact Combat semantics |
|---:|---|---|---|---|---|---|---|
| 51 | `skill_fire_style_phoenix_scatter` | Fire Style: Phoenix Scatter | `fire` | `common` | `mentor_or_training` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 16 each; ordinary Stamina |
| 52 | `skill_fire_style_burning_line` | Fire Style: Burning Line | `fire` | `common` | `mentor_or_training` | `learned_skill_access` | direct:one hostile; Attack PL 22; ordinary Stamina; on positive damage may apply/refresh generic burning |
| 53 | `skill_fire_style_flame_wall` | Fire Style: Flame Wall | `fire` | `common` | `mentor_or_training` | `learned_skill_access` | guard:self or one ally; 25% pre-Stamina prevention vs next qualifying direct packet; one packet; expires source next action |
| 54 | `skill_fire_style_searing_palm` | Fire Style: Searing Palm | `fire` | `common` | `mentor_or_training` | `learned_skill_access` | direct:one hostile; Attack PL 24; ordinary Stamina |
| 55 | `skill_fire_style_cinder_mine` | Fire Style: Cinder Mine | `fire` | `common` | `mentor_or_training` | `learned_skill_access` | control:one hostile; establish `cinder_hazard` through target next action; blocks movement/reposition-required actions only; not Stun |
| 56 | `skill_fire_style_dragon_breath` | Fire Style: Dragon Breath | `fire` | `common` | `mentor_or_training` | `learned_skill_access` | direct:one hostile; Attack PL 28; ordinary Stamina |
| 57 | `skill_fire_style_furnace_wave` | Fire Style: Furnace Wave | `fire` | `common` | `mentor_or_training` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 23 each; ordinary Stamina |
| 58 | `skill_fire_style_blazing_ring` | Fire Style: Blazing Ring | `fire` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 22 each; ordinary Stamina; on positive damage apply generic burning using existing condition authority |
| 59 | `skill_fire_style_great_fireball` | Fire Style: Great Fireball | `fire` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:one hostile; Attack PL 32; ordinary Stamina |
| 60 | `skill_fire_style_flame_pursuit` | Fire Style: Flame Pursuit | `fire` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:one hostile; Attack PL 30; ordinary Stamina; may apply/refresh burning on positive damage; valid only after target committed movement/reposition since user prior action |
| 61 | `skill_fire_style_scorching_barrage` | Fire Style: Scorching Barrage | `fire` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 26 each; ordinary Stamina |
| 62 | `skill_fire_style_inferno_corridor` | Fire Style: Inferno Corridor | `fire` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:up to 3 hostiles; Attack PL 34 each; ordinary Stamina |
| 63 | `skill_fire_style_majestic_flame_surge` | Fire Style: Majestic Flame Surge | `fire` | `legendary` | `legendary_mentor_or_chronicle_gate` | `learned_skill_access` | direct:up to 3 hostiles; Attack PL 40 each; ordinary Stamina |
| 64 | `skill_water_style_water_bullet` | Water Style: Water Bullet | `water` | `normal` | `element_training` | `learned_skill_access` | direct:one hostile; Attack PL 14; ordinary Stamina |
| 65 | `skill_water_style_cutting_stream` | Water Style: Cutting Stream | `water` | `normal` | `element_training` | `learned_skill_access` | direct:one hostile; Attack PL 16; ordinary Stamina |
| 66 | `skill_water_style_mist_screen` | Water Style: Mist Screen | `water` | `normal` | `element_training` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 13 each; ordinary Stamina |
| 67 | `skill_water_style_water_whip` | Water Style: Water Whip | `water` | `normal` | `element_training` | `learned_skill_access` | control:up to 2 hostiles; establish `mist_visibility_interference` through each target next action; only precision/line-of-sight tagged actions affected |
| 68 | `skill_water_style_rising_current` | Water Style: Rising Current | `water` | `normal` | `element_training` | `learned_skill_access` | direct:one hostile; Attack PL 20; ordinary Stamina |
| 69 | `skill_water_style_water_clone` | Water Style: Water Clone | `water` | `common` | `mentor_or_training` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 16 each; ordinary Stamina; clone is presentation/technique construct, not participant |
| 70 | `skill_water_style_pressurised_shot` | Water Style: Pressurised Shot | `water` | `common` | `mentor_or_training` | `learned_skill_access` | direct:one hostile; Attack PL 22; ordinary Stamina |
| 71 | `skill_water_style_water_wall` | Water Style: Water Wall | `water` | `common` | `mentor_or_training` | `learned_skill_access` | guard:self or one ally; 25% pre-Stamina prevention vs next qualifying direct packet; one packet; expires source next action |
| 72 | `skill_water_style_undertow` | Water Style: Undertow | `water` | `common` | `mentor_or_training` | `learned_skill_access` | direct:one hostile; Attack PL 24; ordinary Stamina |
| 73 | `skill_water_style_binding_current` | Water Style: Binding Current | `water` | `common` | `mentor_or_training` | `learned_skill_access` | control:one hostile; establish `binding_current` through target next action; blocks movement/reposition-required actions only; not Stun |
| 74 | `skill_water_style_torrent_lance` | Water Style: Torrent Lance | `water` | `common` | `mentor_or_training` | `learned_skill_access` | direct:one hostile; Attack PL 28; ordinary Stamina |
| 75 | `skill_water_style_mist_prison` | Water Style: Mist Prison | `water` | `common` | `mentor_or_training` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 23 each; ordinary Stamina |
| 76 | `skill_water_style_surging_wave` | Water Style: Surging Wave | `water` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 22 each; ordinary Stamina; bounded displacement pressure only where current encounter supports it |
| 77 | `skill_water_style_water_dragon` | Water Style: Water Dragon | `water` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:one hostile; Attack PL 32; ordinary Stamina; no independent dragon participant |
| 78 | `skill_water_style_flood_step` | Water Style: Flood Step | `water` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:one hostile; Attack PL 30; ordinary Stamina; valid only after target committed movement/reposition since user prior action |
| 79 | `skill_water_style_crushing_tide` | Water Style: Crushing Tide | `water` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 26 each; ordinary Stamina |
| 80 | `skill_water_style_grand_waterfall` | Water Style: Grand Waterfall | `water` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:up to 3 hostiles; Attack PL 34 each; ordinary Stamina |
| 81 | `skill_water_style_leviathan_surge` | Water Style: Leviathan Surge | `water` | `legendary` | `legendary_mentor_or_chronicle_gate` | `learned_skill_access` | direct:up to 3 hostiles; Attack PL 40 each; ordinary Stamina |
| 82 | `skill_wind_style_air_bullet` | Wind Style: Air Bullet | `wind` | `normal` | `element_training` | `learned_skill_access` | direct:one hostile; Attack PL 14; ordinary Stamina |
| 83 | `skill_wind_style_palm_gust` | Wind Style: Palm Gust | `wind` | `normal` | `element_training` | `learned_skill_access` | direct:one hostile; Attack PL 16; ordinary Stamina |
| 84 | `skill_wind_style_cutting_breeze` | Wind Style: Cutting Breeze | `wind` | `normal` | `element_training` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 13 each; ordinary Stamina |
| 85 | `skill_wind_style_dust_screen` | Wind Style: Dust Screen | `wind` | `normal` | `element_training` | `learned_skill_access` | control:up to 2 hostiles; establish `dust_visibility_interference` through each target next action; only precision/line-of-sight tagged actions affected |
| 86 | `skill_wind_style_wind_blade` | Wind Style: Wind Blade | `wind` | `normal` | `element_training` | `learned_skill_access` | direct:one hostile; Attack PL 20; ordinary Stamina |
| 87 | `skill_wind_style_gale_step` | Wind Style: Gale Step | `wind` | `common` | `mentor_or_training` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 16 each; ordinary Stamina |
| 88 | `skill_wind_style_pressure_shot` | Wind Style: Pressure Shot | `wind` | `common` | `mentor_or_training` | `learned_skill_access` | direct:one hostile; Attack PL 22; ordinary Stamina |
| 89 | `skill_wind_style_deflecting_gust` | Wind Style: Deflecting Gust | `wind` | `common` | `mentor_or_training` | `learned_skill_access` | guard:self or one ally; 25% pre-Stamina prevention vs next qualifying direct packet; one packet; expires source next action |
| 90 | `skill_wind_style_vacuum_palm` | Wind Style: Vacuum Palm | `wind` | `common` | `mentor_or_training` | `learned_skill_access` | direct:one hostile; Attack PL 24; ordinary Stamina |
| 91 | `skill_wind_style_cyclone_snare` | Wind Style: Cyclone Snare | `wind` | `common` | `mentor_or_training` | `learned_skill_access` | control:one hostile; establish `cyclone_control` through target next action; blocks movement/reposition-required actions only; not Stun |
| 92 | `skill_wind_style_razor_current` | Wind Style: Razor Current | `wind` | `common` | `mentor_or_training` | `learned_skill_access` | direct:one hostile; Attack PL 28; ordinary Stamina |
| 93 | `skill_wind_style_gale_barrage` | Wind Style: Gale Barrage | `wind` | `common` | `mentor_or_training` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 23 each; ordinary Stamina |
| 94 | `skill_wind_style_crosswind_cut` | Wind Style: Crosswind Cut | `wind` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 22 each; ordinary Stamina; bounded crosswind pressure only where encounter supports it |
| 95 | `skill_wind_style_great_breakthrough` | Wind Style: Great Breakthrough | `wind` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:one hostile; Attack PL 32; ordinary Stamina |
| 96 | `skill_wind_style_pursuit_draft` | Wind Style: Pursuit Draft | `wind` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:one hostile; Attack PL 30; ordinary Stamina; valid only after target committed movement/reposition since user prior action |
| 97 | `skill_wind_style_vacuum_sphere` | Wind Style: Vacuum Sphere | `wind` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:up to 2 hostiles; Attack PL 26 each; ordinary Stamina |
| 98 | `skill_wind_style_tempest_corridor` | Wind Style: Tempest Corridor | `wind` | `rare` | `mission_mentor_or_scroll` | `learned_skill_access` | direct:up to 3 hostiles; Attack PL 34 each; ordinary Stamina |
| 99 | `skill_wind_style_severing_storm` | Wind Style: Severing Storm | `wind` | `legendary` | `legendary_mentor_or_chronicle_gate` | `learned_skill_access` | direct:up to 3 hostiles; Attack PL 40 each; ordinary Stamina |
| 100 | `skill_lightning_style_spark_jab` | Lightning Style: Spark Jab | `lightning` | `normal` | `element_training` | `learned_skill_access` | direct:one hostile; Attack PL 14; ordinary Stamina; no automatic Stun |
