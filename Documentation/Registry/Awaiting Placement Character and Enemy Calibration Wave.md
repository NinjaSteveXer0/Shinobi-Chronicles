# Shinobi Chronicles — Awaiting Placement Character + Enemy Calibration Wave

**Status:** Registry / PL calibration authority; Combat semantics handoff pending where noted  
**Date:** 2026-09-04

This wave closes the missing Base Stat / Base PL authority for the two collectible Character cards currently awaiting placement and the 38 enemy/opposition cards in the supplied production folder.

Canonical Stat order throughout:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Formula v1.0 remains:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

Artwork is not mechanical authority. The card roster supplied the production identities to process; PL/Registry authored the numbers below and Combat owns final action semantics / attack-control-resolution numerics where not already closed.

---

## 1. Collectible Character candidates — calibrated

These two cards are currently awaiting production placement. Their stable Registry IDs are reserved here. They do **not** change the current 102 live collectible gate until production admission/Coding ingestion occurs. When both are admitted, the collectible gate becomes **87 Characters + 17 Entities = 104**, and portrait/card manifests must expand accordingly.

| Registry ID | Display | Formal Rank | Base Stats | Base PL |
|---|---|---|---|---:|
| `chunin_iruka` | Chūnin Iruka | Chūnin | `32/30/31/26/18/27/34` | **33** |
| `sj_anko` | Special Jōnin Anko | Special Jōnin | `56/52/48/44/58/39/55` | **56** |

### Chūnin Iruka — exact proposed five-Skill palette for Combat closure

1. `chunin_iruka_kunai_counter` — Bukijutsu; direct/counter action.
2. `chunin_iruka_explosive_tag_snare` — Fūinjutsu/Bukijutsu; authored trap/control setup; no automatic hidden damage/control rider.
3. `chunin_iruka_shadow_clone_feint` — Ninjutsu; setup/decoy; clone construct is not an independent participant.
4. `chunin_iruka_capture_wire` — Bukijutsu; physical restraint/control using the shared control lifecycle where applicable.
5. `chunin_iruka_instructors_read` — information/read action; observation/context only, no automatic Knowledge/accuracy/evasion modifier.

### Special Jōnin Anko — exact proposed five-Skill palette for Combat closure

1. `sj_anko_hidden_shadow_snake_hands` — Ninjutsu; serpent strike / direct action.
2. `sj_anko_snake_bind` — Ninjutsu; serpent restraint/control.
3. `sj_anko_fire_style_dragon_flame` — Ninjutsu; direct ranged fire action.
4. `sj_anko_serpent_evasion` — Ninjutsu; movement/defensive reposition, not hidden Speed/Agility.
5. `sj_anko_twin_snakes_mutual_death` — Kinjutsu; explicitly high-risk technique; Combat must author exact self/consequence semantics rather than treating it as ordinary damage.

**Anko representation lock:** `sj_anko` is the untransformed Special Jōnin representation. Do not apply `cs_anko` or `l2_anko` embodied packages merely because those separate variants exist.

---

## 2. Enemy / Opposition Registry — 38-card calibration

All records below are Enemy/Opposition identities and remain outside the collectible Character/Entity production gate.

### Existing/legacy identity mappings that must not be silently renamed

- card `Scout` → runtime/opposition ID `scout`
- card `Bandit` → runtime/opposition ID `bandit`
- card `BanditLeader` → existing runtime/opposition ID `banditLeader`
- card `altered_shinobi` → locked opposition ID `test_subject_altered_shinobi`
- card `ScoutReborn` → new opposition ID `scout_reborn`

| Opposition ID | Base Stats | Base PL |
|---|---|---:|
| `test_subject_altered_shinobi` | `12/11/10/5/5/6/11` | **11** |
| `ambush_captain` | `46/44/48/28/36/35/47` | **47** |
| `anbu_style_operative` | `50/47/48/34/43/46/49` | **49** |
| `bandit` | `10/17/19/5/7/6/18` | **18** |
| `banditLeader` | `24/27/30/10/12/12/29` | **28** |
| `beast_handler_rogue` | `38/39/41/22/29/25/45` | **43** |
| `chain_blade_ronin` | `30/41/45/15/23/18/40` | **42** |
| `cipher_handler` | `29/23/21/36/27/39/31` | **37** |
| `decoy_assassin` | `43/44/46/24/38/42/41` | **45** |
| `elite_missing_nin` | `56/53/55/35/47/44/58` | **56** |
| `escort_breaker` | `43/46/44/26/39/31/45` | **45** |
| `evidence_burner` | `32/28/36/29/38/21/34` | **36** |
| `false_confessor` | `24/22/20/18/25/40/30` | **36** |
| `false_trail_courier` | `26/29/31/17/16/25/33` | **31** |
| `field_commander` | `47/43/44/31/39/42/50` | **48** |
| `fugitive_scout` | `29/27/34/15/18/24/32` | **32** |
| `fuinjutsu_smuggler` | `29/24/27/38/33/22/31` | **36** |
| `genjutsu_decoy_specialist` | `33/27/26/24/28/46/36` | **42** |
| `mercenary_shinobi` | `39/38/42/19/25/22/40` | **40** |
| `missing_nin_hunter` | `43/41/46/24/31/30/44` | **44** |
| `poison_blade_mercenary` | `34/38/44/21/39/22/37` | **42** |
| `puppet_ambusher` | `42/32/44/28/38/27/40` | **42** |
| `pursuit_hunter` | `42/41/40/24/31/35/46` | **44** |
| `rogue_chunin` | `36/33/34/18/23/22/35` | **35** |
| `rogue_genin` | `23/22/21/10/14/15/24` | **23** |
| `rogue_medic` | `31/25/22/28/26/24/35` | **33** |
| `scout` | `18/16/22/8/10/14/20` | **21** |
| `scout_reborn` | `34/31/38/16/24/28/36` | **36** |
| `seal_breaker` | `39/31/33/48/44/27/39` | **45** |
| `senbon_duelist` | `28/36/45/17/22/20/38` | **41** |
| `sensory_pursuer` | `38/35/33/26/29/45/40` | **43** |
| `shinobi_infiltrator` | `41/39/37/29/30/43/38` | **42** |
| `silent_cell_operative` | `34/35/32/27/31/40/34` | **38** |
| `test_subject_brute` | `6/14/8/4/5/4/14` | **13** |
| `test_subject_unstable` | `13/10/6/4/6/4/12` | **12** |
| `trap_network_controller` | `37/30/39/44/35/31/38` | **42** |
| `trap_specialist` | `31/27/35/39/28/24/33` | **37** |
| `venom_mist_operative` | `42/29/31/21/44/24/38` | **42** |

The three Test Subject calibrations above preserve their previously closed values. The remaining enemy calibrations are the current PL authority for this placement wave and supersede legacy stamina-only / old `power` presentation values where those old records conflict.

---

## 3. Enemy action palettes — Combat handoff authority

### Already closed / retain exactly

#### `scout`
- `enemy_rogue_scout_kunai_cut` — Bukijutsu direct damage.
- `enemy_rogue_scout_shuriken_burst` — Bukijutsu direct damage; multiple projectiles = one packet.

Do not add a third action merely for symmetry.

#### `bandit`
- `enemy_bandit_tanto_slash` — Bukijutsu direct damage.
- `enemy_bandit_heavy_kick` — Taijutsu direct damage; no automatic Stun/displacement.
- `enemy_bandit_throwing_knife` — Bukijutsu direct damage; projectile presentation = one packet.

#### `banditLeader`
- `enemy_bandit_leader_execution_cut` — Bukijutsu direct damage.
- `enemy_bandit_leader_explosive_tag_burst` — Bukijutsu/Fūinjutsu-context direct action; no automatic burning.
- `enemy_bandit_leader_cross_slash` — Bukijutsu direct damage; visual two-hit = one packet.

#### `test_subject_altered_shinobi`
- `test_subject_altered_shinobi_shinobi_strike`
- `test_subject_altered_shinobi_shuriken_cast`
- `test_subject_altered_shinobi_unstable_chakra_burst`

Existing exact Attack PL remains `5 / 4 / 6`.

#### `test_subject_brute`
- `test_subject_brute_heavy_swing` — Taijutsu direct damage.
- `test_subject_brute_body_rush` — movement-dependent Taijutsu direct damage; no automatic Stun/displacement.
- `test_subject_brute_crushing_clinch` — physical restraint/control; no direct damage required; shared physical-restraint lifecycle.

Existing PL calibration remains 13. Previously ratified action numerics remain Heavy Swing 7, Body Rush 6; Clinch has no Attack PL and no separate hidden restraint scalar.

#### `test_subject_unstable`
- `test_subject_unstable_frantic_rush` — Taijutsu direct damage.
- `test_subject_unstable_chakra_spasm` — Ninjutsu direct damage.
- `test_subject_unstable_panicked_burst` — Ninjutsu direct damage; multi-pulse presentation = one packet.

Existing PL calibration remains 12. Previously ratified action numerics remain `5 / 6 / 7`.

### New exact action-ID palettes for Combat semantic closure

#### `scout_reborn`
- `scout_reborn_kunai_reversal` — Bukijutsu direct/counter intent.
- `scout_reborn_shuriken_crossfire` — Bukijutsu direct; visible multi-projectile presentation remains one authored packet unless Combat explicitly requires otherwise.
- `scout_reborn_vanish_step` — Ninjutsu movement/reposition; no hidden Speed Stat and no supernatural ontology inferred from the title `Reborn`.

#### `rogue_genin`
- `enemy_rogue_genin_kunai_rush` — Bukijutsu direct.
- `enemy_rogue_genin_shuriken_spread` — Bukijutsu direct; projectile count is presentation.
- `enemy_rogue_genin_substitution_feint` — Ninjutsu defensive/setup; no automatic miss/belief.

#### `rogue_chunin`
- `enemy_rogue_chunin_chakra_strike` — Taijutsu/Ninjutsu direct action.
- `enemy_rogue_chunin_wire_shuriken_trap` — Bukijutsu setup/control.
- `enemy_rogue_chunin_substitution_counter` — Ninjutsu defensive/counter.

#### `missing_nin_hunter`
- `enemy_missing_nin_hunter_hunter_blade` — Bukijutsu direct.
- `enemy_missing_nin_hunter_capture_wire` — Bukijutsu physical restraint/control.
- `enemy_missing_nin_hunter_tracking_mark` — information/targeting evidence only; not omniscience or hidden accuracy.

#### `mercenary_shinobi`
- `enemy_mercenary_shinobi_chakra_blade` — Bukijutsu direct.
- `enemy_mercenary_shinobi_shuriken_barrage` — Bukijutsu direct; one authored packet unless Combat closes another packet structure.
- `enemy_mercenary_shinobi_hardened_guard` — defensive action; no hidden Defense Stat.

#### `shinobi_infiltrator`
- `enemy_shinobi_infiltrator_silent_tanto` — Bukijutsu direct.
- `enemy_shinobi_infiltrator_smoke_breach` — setup/reposition; smoke does not automatically Blind.
- `enemy_shinobi_infiltrator_false_entry` — deception/setup; no automatic enemy belief.

#### `fuinjutsu_smuggler`
- `enemy_fuinjutsu_smuggler_binding_tag` — Fūinjutsu control.
- `enemy_fuinjutsu_smuggler_contraband_seal_burst` — Fūinjutsu direct/burst action.
- `enemy_fuinjutsu_smuggler_seal_release` — authored seal interaction; does not imply Summon/Entity creation.

#### `rogue_medic`
- `enemy_rogue_medic_chakra_scalpel` — Ninjutsu/Taijutsu direct action.
- `enemy_rogue_medic_sedative_senbon` — Bukijutsu direct with any sedative consequence requiring explicit Combat condition semantics.
- `enemy_rogue_medic_field_treatment` — self/ally medical restoration/support; Combat must define exact restoration authority, not PL.

#### `elite_missing_nin`
- `enemy_elite_missing_nin_chakra_edge` — Bukijutsu direct.
- `enemy_elite_missing_nin_body_flicker_cleave` — movement + direct action; no hidden Speed Stat.
- `enemy_elite_missing_nin_suppression_formula` — Fūinjutsu control/interference; exact package suppression must be explicitly bounded.

#### `trap_specialist`
- `enemy_trap_specialist_explosive_tag_trap` — local trap setup/direct consequence.
- `enemy_trap_specialist_wire_snare` — local physical restraint/control.
- `enemy_trap_specialist_trigger_feint` — setup/deception; no automatic belief.

**Distinction:** Trap Specialist = local emplacement/use. It is not Trap Network Controller.

#### `fugitive_scout`
- `enemy_fugitive_scout_kunai_counter` — Bukijutsu direct/counter.
- `enemy_fugitive_scout_smoke_disengage` — disengage/reposition; no automatic escape.
- `enemy_fugitive_scout_trail_break` — information/tracking-denial evidence; no hidden Evasion Stat.

#### `false_trail_courier`
- `enemy_false_trail_courier_courier_blade` — Bukijutsu direct.
- `enemy_false_trail_courier_flash_tag_escape` — movement/disengage setup.
- `enemy_false_trail_courier_false_route_feint` — deception/route-evidence action; no automatic belief.

#### `poison_blade_mercenary`
- `enemy_poison_blade_mercenary_venom_slash` — Bukijutsu direct; poison consequence only through explicit condition semantics.
- `enemy_poison_blade_mercenary_poisoned_senbon` — Bukijutsu direct; poison consequence explicit.
- `enemy_poison_blade_mercenary_toxin_feint` — setup/deception; no automatic poison application without qualifying delivery.

#### `venom_mist_operative`
- `enemy_venom_mist_operative_venom_mist` — Ninjutsu/Kinjutsu-area toxic hazard; exact exposure/condition semantics to Combat.
- `enemy_venom_mist_operative_poisoned_knife` — Bukijutsu direct; explicit toxin delivery only.
- `enemy_venom_mist_operative_mist_disengage` — movement/concealment context, not automatic invisibility/evasion.

#### `silent_cell_operative`
- `enemy_silent_cell_operative_silent_strike` — Taijutsu/Bukijutsu direct.
- `enemy_silent_cell_operative_concealed_wire` — Bukijutsu control.
- `enemy_silent_cell_operative_mental_lock` — resistance/information-denial context; not a hidden Willpower Stat and not immunity to interrogation by default.

#### `false_confessor`
- `enemy_false_confessor_concealed_senbon` — Bukijutsu direct.
- `enemy_false_confessor_false_surrender` — deception/setup; surrender presentation does not automatically alter hostility/state without resolver authority.
- `enemy_false_confessor_contradiction_bait` — information/deception evidence; no automatic belief/truth inference.

#### `chain_blade_ronin`
- `enemy_chain_blade_ronin_chain_lash` — Bukijutsu direct.
- `enemy_chain_blade_ronin_hook_bind` — Bukijutsu physical restraint/control.
- `enemy_chain_blade_ronin_chain_reversal` — defensive/counter; exact prevention/counter semantics to Combat.

#### `senbon_duelist`
- `enemy_senbon_duelist_precision_throw` — Bukijutsu direct.
- `enemy_senbon_duelist_senbon_fan` — Bukijutsu direct; projectile count does not automatically multiply packets.
- `enemy_senbon_duelist_needle_deflection` — defensive/counter; no hidden Evasion/Defense Stat.

#### `cipher_handler`
- `enemy_cipher_handler_marked_kunai` — Bukijutsu direct.
- `enemy_cipher_handler_signal_scramble` — communication/information disruption context; no omniscient team shutdown.
- `enemy_cipher_handler_smoke_extract` — disengage/reposition; no automatic escape.

#### `trap_network_controller`
- `enemy_trap_network_controller_linked_tag_burst` — linked-network trap action.
- `enemy_trap_network_controller_wire_lattice` — battlefield control/network restraint.
- `enemy_trap_network_controller_remote_trigger_feint` — network setup/deception.

**Distinction:** Trap Network Controller = connected/remote network orchestration. It is not the local Trap Specialist identity.

#### `puppet_ambusher`
- `enemy_puppet_ambusher_puppet_blade` — puppet-source direct action.
- `enemy_puppet_ambusher_chakra_thread_bind` — control/restraint.
- `enemy_puppet_ambusher_hidden_senbon` — projectile direct action.

The puppet/construct is not automatically an independent Battle participant or separate collectible identity merely because it is a causal source.

#### `genjutsu_decoy_specialist`
- `enemy_genjutsu_decoy_specialist_false_target` — Genjutsu deception/context; no automatic belief.
- `enemy_genjutsu_decoy_specialist_mirror_step` — movement/deception setup; no hidden Speed.
- `enemy_genjutsu_decoy_specialist_kunai_punish` — Bukijutsu direct action against qualifying context.

#### `sensory_pursuer`
- `enemy_sensory_pursuer_sensor_lock` — sensory information/access evidence; bounded scope, not omniscience/automatic accuracy.
- `enemy_sensory_pursuer_pursuit_strike` — Taijutsu/Bukijutsu direct.
- `enemy_sensory_pursuer_concealment_read` — information action limited to legitimately observable/sensed evidence.

**Distinction:** Sensory Pursuer is not Missing-nin Hunter.

#### `beast_handler_rogue`
- `enemy_beast_handler_rogue_handler_blade` — Bukijutsu direct.
- `enemy_beast_handler_rogue_pack_harry` — trained-beast source-assisted pressure/action; Combat/Registry must keep causal source and participant ontology explicit.
- `enemy_beast_handler_rogue_recall_redirect` — source-assisted reposition/protection setup.

Do not create a separate collectible/turn-taking beast Entity merely because the action has a beast causal source unless later explicit authority requires one.

#### `seal_breaker`
- `enemy_seal_breaker_seal_fracture` — Fūinjutsu interference against an exact qualifying seal/package.
- `enemy_seal_breaker_chakra_chisel` — Ninjutsu/Bukijutsu direct or seal-target action.
- `enemy_seal_breaker_breach_tag` — Fūinjutsu setup/breach; no universal seal deletion.

#### `evidence_burner`
- `enemy_evidence_burner_incendiary_tag` — direct/incendiary action; burning requires explicit consequence semantics.
- `enemy_evidence_burner_smoke_screen` — concealment/setup; no automatic Blind.
- `enemy_evidence_burner_evidence_ignition` — objective/evidence-target action; destroying evidence requires the evidence/object to actually be present and targetable.

#### `field_commander`
- `enemy_field_commander_tactical_cut` — Bukijutsu direct.
- `enemy_field_commander_priority_mark` — command/target-priority setup; no hidden universal damage multiplier.
- `enemy_field_commander_regroup_order` — allied coordination/defensive reposition where allied participants legitimately exist.

#### `anbu_style_operative`
- `enemy_anbu_style_operative_tanto_flash` — Bukijutsu direct.
- `enemy_anbu_style_operative_wire_capture` — Bukijutsu control.
- `enemy_anbu_style_operative_silent_body_flicker` — Ninjutsu movement/reposition; no hidden Speed.

`ANBU-style Operative` is route/context-sensitive opposition. It does not imply ANBU as an institution is inherently hostile.

#### `ambush_captain`
- `enemy_ambush_captain_blindside_cut` — Bukijutsu direct.
- `enemy_ambush_captain_crossfire_order` — allied ambush coordination where allied participants exist; no phantom participants.
- `enemy_ambush_captain_escape_lane_denial` — route/control action; exact denial lifetime to Combat.

#### `escort_breaker`
- `enemy_escort_breaker_breach_strike` — Taijutsu/Bukijutsu direct.
- `enemy_escort_breaker_guard_peel` — protection-interference action; attacking guard ≠ automatically harming principal.
- `enemy_escort_breaker_principal_cutoff` — route/separation control; principal outcome remains independently recorded.

#### `pursuit_hunter`
- `enemy_pursuit_hunter_pursuit_lunge` — Taijutsu/Bukijutsu direct.
- `enemy_pursuit_hunter_route_cut` — movement/route control.
- `enemy_pursuit_hunter_tracking_tag` — tracking information evidence; not omniscience.

#### `decoy_assassin`
- `enemy_decoy_assassin_concealed_blade` — Bukijutsu direct.
- `enemy_decoy_assassin_decoy_substitution` — deception/defensive setup; decoy not an independent participant.
- `enemy_decoy_assassin_false_retreat` — movement/deception setup; no automatic pursuit or belief.

---

## 4. Production routing

### May go directly to Coding after this document

The following already have closed Combat action semantics and now have/retain PL authority:

- `scout`
- `bandit`
- `banditLeader`
- `test_subject_altered_shinobi`
- `test_subject_brute`
- `test_subject_unstable`

For `scout`, `bandit`, and `banditLeader`, the new seven-Stat/Base-PL records supersede the old stamina-only / old `power` calibration as modern PL authority. Existing action packages remain intact.

For Brute/Unstable, Coding still needs to attach/implement their already-ratified action packages if absent.

### Must go to Combat before Coding

- `chunin_iruka`
- `sj_anko`
- `scout_reborn`
- all remaining newly calibrated opposition identities listed above.

Combat should close exact resolution semantics and any needed action-local Attack PL, guard ratio, control scalar, duration, condition, restoration, target-count, or other resolver number. PL should only be asked back for genuinely PL-owned numeric slots after Combat identifies them.

---

## 5. Hard boundaries

- Enemy/Opposition Registry presence does **not** alter the collectible 102 gate.
- The two collectible Character cards remain awaiting placement; admitting both later changes the collectible gate to 104.
- Rank/title does not grant PL.
- Card artwork does not establish mechanics.
- No hidden Speed / Agility / Defense / Instability / Willpower Stat is introduced.
- Projectile count does not automatically equal packet count.
- Deception does not automatically create belief.
- Sensory/tracking actions do not create omniscience or generic accuracy bonuses.
- Movement techniques do not create hidden Speed.
- Construct/beast/puppet causal participation does not automatically create an independent Entity/turn/deployment slot.
- Escort-opposition actions preserve principal/protective outcome separately from personal/offensive outcome.
- Special Jōnin qualification challenge identity ≠ qualification path ≠ Recognition ≠ Rank.
