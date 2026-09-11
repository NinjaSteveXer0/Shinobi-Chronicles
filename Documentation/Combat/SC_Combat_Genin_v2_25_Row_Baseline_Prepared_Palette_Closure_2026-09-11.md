# Shinobi Chronicles — Genin v2 25-Row Baseline Prepared-Palette Closure

**Date:** 2026-09-11  
**Owner:** Combat / Skills / Items / Weapons  
**Source handoff:** GitHub issue #104  
**Status:** **COMBAT / SKILLS AUTHORITY CLOSED — 25/25 BATTLE-READY BASELINE PALETTES AUTHORED / v2 ACTIVATION STILL CE + CODING OWNED**

## 1. Scope

This document consumes GitHub issue #104 and closes the Combat/Skills readiness gate for the commissioned 25-row Genin v2 wave.

Consumed Registry / PL authority:

`Documentation/Registry/Alpha Genin Expansion 25 Row Registry and PL Admission 2026-09-10.md`

commit:

`fc8281fd81c92cf47e63c20dd097b7402d17a492`

Consumed catalogue authority:

- `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave1_001-050.md`
- `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave2_051-100.md`
- `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave3_101-150.md`
- `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave4_151-200.md`

No Skill effect is redefined here. The stable catalogue row remains the exact resolver authority for Attack PL, target count, prevention, control lifetime, recovery, Stamina ordering and invalid-selection semantics.

Current production candidate policy remains:

`alpha_genin_roster_first_production_content_v1`

This closure does **not** activate v2, mutate current v1, grant ownership, assign a teammate, deploy a Character, alter Rank, or change any Stat/Base PL package.

---

## 2. Representation-baseline Skill-access semantics

Issue #104 explicitly authorises Combat to publish the minimum exact representation-level repertoire necessary for these Genin to be playable.

For the 25 exact representations below, this closure therefore establishes:

`baselineSkillAccess = granted`

for **only** the exact Skill IDs listed in that representation's prepared palette.

This is representation-authored baseline repertoire authority. It is not a fabricated Chronicle training occurrence and does not mint generic Progression XP, mastery, mentor history, Mission history, Bloodline access or transferable Skill ownership for another representation.

Runtime meaning when the later v2 candidate policy legitimately activates a row:

1. the exact listed Skill IDs satisfy the catalogue's `learned_skill_access` predicate for that exact representation baseline;
2. the same IDs are its default prepared palette;
3. catalogue-local additional predicates still apply (for example a weapon-tagged action still requires a compatible current weapon/source where the resolver requires one);
4. failed contextual/source prerequisites reject before commit and consume no action;
5. no unlisted Skill is inferred from Stats, lineage, name, card art or famous future history.

Preserve:

**baseline repertoire != Chronicle learning event**  
**prepared != Battle-legal in every context**  
**Stats != Skills**  
**lineage != Access**  
**possession != executable capability**

---

## 3. Shared Battle-ready floor

Every one of the 25 palettes contains at minimum:

- one direct action that does not require a Bloodline/Transformation/Hosted/Summon capability;
- one defensive/setup/control/support option;
- no generic Basic Attack or Guard fallback fabricated outside the catalogue.

Weapon-forward representations may prepare ordinary Academy/general-training Bukijutsu rows. Those rows remain source/equipment-gated at execution if the resolver requires a compatible weapon. Each such representation also retains at least one non-weapon direct action so absence of equipment does not make the Character actionless.

No elemental nature is inferred in this closure. The catalogue contains Fire/Water/Wind/Lightning/Earth rows, but issue #104 provides no exact elemental-affinity/training authority for these 25 representations. Therefore elemental Skills are excluded rather than guessed from canon fame.

---

## 4. Exact 25-row prepared palettes

### 1. `genin_hashirama` — Base PL 36

Base Stats remain `36/30/25/18/18/21/39`.

Prepared Skill IDs:

1. `skill_chakra_focus`
2. `skill_body_replacement`
3. `skill_clone_feint`
4. `skill_straight_palm`
5. `skill_shoulder_break`

Possessed-but-locked:

- `capability.wood_release.possessed = true`
- `capability.wood_release.access = false` at baseline

Excluded until legitimate Wood Release Access exists: `skill_wood_release_seeded_snare` through `skill_wood_release_great_tree_domain` and any future Wood Release row requiring `capability.wood_release.access`.

No adult Hashirama/Hokage/Sage/Tailed-Beast package is inherited.

### 2. `genin_hiruzen` — Base PL 33

Base Stats remain `34/29/31/22/20/28/32`.

Prepared Skill IDs:

1. `skill_chakra_focus`
2. `skill_body_replacement`
3. `skill_clone_feint`
4. `skill_counter_palm`
5. `skill_genjutsu_false_footfall`

No five-nature mastery, Hokage repertoire, summon package or future signature is inferred.

### 3. `genin_mito` — Base PL 33

Base Stats remain `27/20/18/34/22/24/35`.

Prepared Skill IDs:

1. `skill_chakra_focus`
2. `skill_body_replacement`
3. `skill_fuinjutsu_binding_tag`
4. `skill_fuinjutsu_barrier_knot`
5. `skill_fuinjutsu_restriction_script`

Explicitly excluded without separate capability authority:

- `skill_adamantine_sealing_chains`
- `skill_chakra_chain_anchor`

Uzumaki lineage and strong Fūinjutsu/Stamina calibration do not grant chain capability, Tailed-Beast hosting or future mastery.

### 4. `genin_tsunade` — Base PL 31

Base Stats remain `24/32/18/16/20/17/34`.

Prepared Skill IDs:

1. `skill_chakra_focus`
2. `skill_body_replacement`
3. `skill_rising_knee`
4. `skill_shoulder_break`
5. `skill_twin_strike`

No adult Sannin medical mastery, Strength-of-a-Hundred package, summon package or future super-strength mechanic is back-propagated.

### 5. `genin_sakumo` — Base PL 34

Base Stats remain `30/32/36/17/18/22/31`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_counter_palm`
3. `skill_kunai_cross_cut`
4. `skill_tanto_draw`
5. `skill_short_blade_flurry`

Bukijutsu rows remain compatible-weapon/source gated at execution. No White-Fang reputation multiplier, chakra-blade signature package or adult technique package is inferred.

### 6. `genin_duy` — Base PL 28

Base Stats remain `16/29/20/10/12/12/31`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_rising_knee`
4. `skill_leaf_sweep`
5. `skill_shoulder_break`

Explicitly excluded:

- `skill_eight_gates_first_gate_release`
- every later Eight-Gates action/package unless separately authorised

Future Eight-Gates fame does not back-propagate.

### 7. `genin_guy` — Base PL 31

Base Stats remain `18/33/22/11/12/14/34`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_rising_knee`
3. `skill_low_line_kick`
4. `skill_spinning_heel`
5. `skill_twin_strike`

Explicitly excluded:

- `skill_eight_gates_first_gate_release`
- every later Eight-Gates action/package unless separately authorised

No adult Might Guy output is inherited.

### 8. `genin_rin` — Base PL 25

Base Stats remain `25/20/18/22/17/22/26`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_mystical_palm_minor`
4. `skill_field_stabilisation`
5. `skill_chakra_pulse_read`

This is a foundational technical/support package only. It does not grant advanced medical mastery, resurrection, adult competence or future Hosted-Entity state.

### 9. `genin_dan` — Base PL 27

Base Stats remain `26/23/21/17/18/28/25`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_genjutsu_false_footfall`
4. `skill_genjutsu_double_image`
5. `skill_genjutsu_phantom_wound`

No future Spirit Transformation or adult signature technique is inferred.

### 10. `genin_nawaki` — Base PL 21

Base Stats remain `20/20/18/13/14/16/22`.

Prepared Skill IDs:

1. `skill_chakra_focus`
2. `skill_body_replacement`
3. `skill_clone_feint`
4. `skill_straight_palm`
5. `skill_combat_breath`

No Senju heritage bonus, Wood Release, special lineage action or future potential multiplier is granted.

### 11. `genin_shizune` — Base PL 26

Base Stats remain `26/21/19/19/22/21/27`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_mystical_palm_minor`
4. `skill_field_stabilisation`
5. `skill_chakra_pulse_read`

This is foundational Genin support/medical competence only. No adult medical mastery, poison-specialist mastery or later equipment/summon package is inferred.

### 12. `genin_yamato` — Base PL 30

Base Stats remain `31/25/23/22/23/21/32`.

Prepared Skill IDs:

1. `skill_chakra_focus`
2. `skill_body_replacement`
3. `skill_clone_feint`
4. `skill_rising_knee`
5. `skill_fuinjutsu_binding_tag`

Possessed-but-locked:

- `capability.wood_release.possessed = true`
- `capability.wood_release.access = false` at baseline

No Wood Release Skill is prepared until legitimate Access exists. No adult ANBU/Yamato suppression, Tailed-Beast control or future signature is inferred.

### 13. `genin_sai` — Base PL 30

Base Stats remain `28/25/31/19/18/24/28`.

Prepared Skill IDs:

1. `skill_chakra_focus`
2. `skill_body_replacement`
3. `skill_straight_palm`
4. `skill_kunai_cross_cut`
5. `skill_shuriken_fan`

Weapon rows remain compatible-source gated at execution. Explicitly excluded without separate authority:

- `skill_ink_beast_hound`
- every Ink Arts capability/action

No ROOT/ANBU/future ink package is inferred.

### 14. `genin_kagami` — Base PL 30

Base Stats remain `31/29/26/18/19/30/29`.

Prepared Skill IDs:

1. `skill_chakra_focus`
2. `skill_body_replacement`
3. `skill_genjutsu_false_footfall`
4. `skill_genjutsu_double_image`
5. `skill_genjutsu_phantom_wound`

Explicitly excluded without separate capability authority:

- `skill_sharingan_motion_read`
- `skill_sharingan_feint_counter`

Uchiha identity does not grant Sharingan Access.

### 15. `genin_danzo` — Base PL 29

Base Stats remain `29/25/27/24/28/22/30`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_fuinjutsu_binding_tag`
4. `skill_fuinjutsu_barrier_knot`
5. `skill_genjutsu_false_footfall`

High Kinjutsu/Fūinjutsu calibration does not grant future forbidden-technique packages, ROOT authority, ocular packages, Hashirama-cell packages or adult Danzō signatures.

### 16. `genin_torifu` — Base PL 29

Base Stats remain `22/28/25/16/18/17/31`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_rising_knee`
4. `skill_shoulder_break`
5. `skill_twin_strike`

Explicitly excluded without separate capability authority:

- `skill_partial_expansion_technique`

Akimichi lineage does not grant Expansion access or hidden body-size modifiers.

### 17. `genin_inoichi` — Base PL 28

Base Stats remain `25/20/18/16/17/30/24`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_genjutsu_false_footfall`
4. `skill_genjutsu_double_image`
5. `skill_genjutsu_phantom_wound`

Explicitly excluded without separate capability authority:

- `skill_mind_transfer_technique`

Yamanaka identity does not grant Mind Transfer access.

### 18. `genin_choza` — Base PL 30

Base Stats remain `22/29/25/16/18/16/32`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_rising_knee`
3. `skill_leaf_sweep`
4. `skill_shoulder_break`
5. `skill_twin_strike`

Explicitly excluded without separate capability authority:

- `skill_partial_expansion_technique`

Akimichi lineage does not grant Expansion access or hidden body-size modifiers.

### 19. `genin_shibi` — Base PL 28

Base Stats remain `27/21/20/18/20/27/29`.

Prepared Skill IDs:

1. `skill_chakra_focus`
2. `skill_body_replacement`
3. `skill_straight_palm`
4. `skill_genjutsu_false_footfall`
5. `skill_genjutsu_double_image`

Explicitly excluded without separate capability/source authority:

- `skill_insect_tracking_cloud`
- `skill_insect_chakra_drain`

No independently acting kikaichū source, turn, PL ledger or hidden insect package is created.

### 20. `genin_tsume` — Base PL 29

Base Stats remain `22/30/28/14/16/18/31`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_rising_knee`
3. `skill_low_line_kick`
4. `skill_shoulder_break`
5. `skill_kunai_cross_cut`

Weapon row remains compatible-source gated at execution. Explicitly excluded without separate capability/source authority:

- `skill_fang_over_fang`

No Inuzuka companion, beast-arts package or hidden paired participant is created.

### 21. `genin_hiashi` — Base PL 31

Base Stats remain `24/33/25/18/17/27/31`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_counter_palm`
4. `skill_guard_breaker`
5. `skill_twin_strike`

Explicitly excluded without separate capability authority:

- `skill_byakugan_chakra_read`
- `skill_gentle_fist_tenketsu_strike`
- `skill_eight_trigrams_palm_guard`

Hyūga identity does not grant active Byakugan or Gentle Fist access.

### 22. `genin_yugao` — Base PL 29

Base Stats remain `21/27/31/15/16/22/27`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_kunai_cross_cut`
4. `skill_tanto_draw`
5. `skill_short_blade_flurry`

Weapon rows remain compatible-source gated at execution. No ANBU/future sword-master package is inferred.

### 23. `genin_hayate` — Base PL 28

Base Stats remain `22/26/30/16/16/23/26`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_kunai_thrust`
4. `skill_kunai_cross_cut`
5. `skill_short_blade_flurry`

Weapon rows remain compatible-source gated at execution. No adult/future sword signature package is inferred.

### 24. `genin_mukai` — Base PL 30

Base Stats remain `24/31/27/17/18/23/30`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_counter_palm`
4. `skill_shoulder_break`
5. `skill_twin_strike`

Representation fact retained:

- visibly possesses one Byakugan

Executable Bloodline state at baseline:

- `capability.byakugan.access = false`

Explicitly excluded without separate capability authority:

- `skill_byakugan_chakra_read`
- Byakugan perception/accuracy/targeting modifiers
- Gentle Fist rows unless separately authorised

Visible possession does not equal activation permission or Battle effect.

### 25. `genin_kosuke` — Base PL 28

Base Stats remain `24/26/29/16/17/20/28`.

Prepared Skill IDs:

1. `skill_body_replacement`
2. `skill_straight_palm`
3. `skill_kunai_cross_cut`
4. `skill_staff_sweep`
5. `skill_shuriken_fan`

Weapon rows remain compatible-source gated at execution. No future veteran/famous-technique package is inferred.

---

## 5. Shared exact catalogue semantics used by this closure

The prepared rows above inherit their exact mechanics from the current catalogue. Key baseline families used here include:

- `skill_chakra_focus` — next direct authored attack +4 Attack PL; consumed; expires next action;
- `skill_body_replacement` — 35% pre-Stamina prevention against next direct packet; expires next action;
- `skill_clone_feint` — next eligible direct attack +3 Attack PL; no clone participant;
- `skill_combat_breath` — restore 4 underlying Battle PL once/Battle;
- normal/common Taijutsu direct actions — one hostile, one authored direct packet, ordinary Stamina unless their catalogue row states an exact rider;
- ordinary Bukijutsu rows — exact catalogue Attack PL/riders, with compatible weapon/source requirements preserved where applicable;
- generic Genjutsu rows — exact bounded setup/control/mental-pressure semantics; no mind reading, Knowledge rewrite or hidden Speed;
- normal/common Fūinjutsu rows — exact bounded control/guard semantics; no ownership, universal chakra shutdown or automatic capture;
- foundational medical rows — exact underlying Battle-PL restoration/information semantics; no Injury erasure or adult mastery.

Coding/CE should consume the stable Skill IDs rather than copy these effects into a second repertoire definition system.

---

## 6. Explicitly locked capability ledger

The following capability routes remain unavailable at baseline unless later authoritative development/access changes them:

- `genin_hashirama` — Wood Release possessed, not executable;
- `genin_yamato` — Wood Release possessed, not executable;
- `genin_mukai` — one Byakugan visibly possessed, not executable;
- `genin_kagami` — no Sharingan Access established;
- `genin_hiashi` — no active Byakugan or Gentle Fist Access established;
- `genin_shibi` — no kikaichū arts/source package established;
- `genin_torifu` / `genin_choza` — no Akimichi Expansion Access established;
- `genin_inoichi` — no Yamanaka Mind Arts Access established;
- `genin_tsume` — no Inuzuka beast-arts/companion source established;
- `genin_duy` / `genin_guy` — no Eight Gates Access established;
- `genin_sai` — no Ink Arts Access established;
- `genin_mito` — no Uzumaki Chains Access established.

These locks are deliberate **Battle-readiness boundaries**, not missing content defects.

---

## 7. Anti-backpropagation / no hidden package rule

This closure does not infer or grant:

- adult Hokage/Sannin/ANBU/ROOT/White-Fang/future reputation packages;
- future elemental mastery;
- future medical mastery;
- future sealing mastery;
- future transformations or Eight Gates;
- Bloodline activation from clan name or card art;
- Summons or Hosted Entities;
- special equipment ownership;
- direct Stats/Base PL changes;
- Rank/Promotion;
- candidate ownership/assignment/deployment.

A future legitimate unlock may add/replace prepared Skills through its owning authority without rewriting this historical baseline definition.

---

## 8. 25/25 gate result

Combat/Skills result:

```text
exact target rows: 25
baseline prepared palettes authored: 25/25
five prepared Skill IDs per row: 25/25
at least one non-special direct action per row: 25/25
special capability overgrant rows: 0
Stats/Base PL mutations: 0
candidate activation performed here: NO
```

Therefore the **Combat / Skills readiness gate is GREEN for all 25 rows** as authored content authority.

This means CE may now publish the next versioned v2 candidate-content policy and route only the minimum runtime consumption required. It does **not** mean runtime implementation, save/load, Battle execution or Golden/regression is already GREEN.

Preserve final distinction:

**Combat design GREEN != implemented != runtime validated != Golden GREEN.**
