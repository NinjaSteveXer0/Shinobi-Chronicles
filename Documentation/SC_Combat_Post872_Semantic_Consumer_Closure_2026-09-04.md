# Shinobi Chronicles — Post-872 Combat Secondary Semantic Consumer Closure

Date: 2026-09-04

Status: **COMBAT AUTHORITY / PRE-GOLDEN CLOSURE**

This document answers Coding's Post-872 deterministic semantic-closure audit. Post-872 correctly distinguishes main resolver coverage from secondary authored consumers. Runtime GREEN is not Golden Combat GREEN while an Alpha-production secondary semantic remains without an exact consumer.

This closure classifies all 30 enumerated secondary consumers as either:

- **A — Alpha-production:** exact authorised consumer semantics follow; or
- **B — secondary branch explicitly outside Alpha production:** the parent Skill/action remains Alpha-valid, but the unresolved secondary rider/effect must not be inferred or fabricated.

No generic stun/burn/control/counter behaviour may be substituted for an exact authored semantic.

## 1. Amaterasu persistent output — A / Alpha-production

Applies to:

- `akatsuki_itachi_amaterasu`
- `amaterasu` owned by `akatsuki_sasuke`
- `kage_itachi_amaterasu`

Existing magnitudes remain authoritative:

- Akatsuki Itachi: initial 50 Attack PL; `amaterasu_flame` 12 Attack PL.
- Akatsuki Sasuke: initial 48 Attack PL; `amaterasu_flame` 11 Attack PL.
- Kage Itachi: initial 56 Attack PL; `amaterasu_flame` 14 Attack PL.

Consumer semantics:

1. A qualifying establishment creates a source/provenance-bearing `amaterasu_flame` persistent state on that exact target.
2. The state resolves at the **start of each affected target action opportunity**.
3. Each persistence occurrence resolves the source variant's authored Amaterasu-flame Attack PL through ordinary Stamina mitigation. Amaterasu is **not** generic `burning` and does not inherit generic Burning's bypass-Stamina/cure semantics.
4. After each valid persistence occurrence, decrement its remaining target-action-opportunity count. Maximum duration is 3 target action opportunities unless legitimately removed/invalidated earlier.
5. Same exact source/action reapplication refreshes/replaces its own stream rather than stacking duplicate copies. Different exact causal sources must not be merged merely because the state family name matches.
6. If the target is already defeated/removed or the exact Amaterasu state has been legitimately invalidated before the opportunity, no phantom tick occurs.
7. Removal ends current runtime output but never erases the establishment/tick history already committed.
8. `burn_treatment` cures generic `burning`; it does not automatically remove `amaterasu_flame`.

## 2. Ordinary Burning conditional riders — A / Alpha-production

Applies to:

- `genin_sarada_fireball_jutsu`
- `genin_sasuke_great_fireball`
- `genin_sasuke_dragon_fire`
- `chunin_jiraiya_flame_bullet`
- `kage_sarada_inferno_fireball`
- `shisui_great_fireball`

Exact qualification for Alpha:

- the parent action must be a committed valid direct-damage occurrence against that target;
- the target's resolved `finalDamage` from that parent packet must be greater than 0;
- the parent metadata must explicitly carry the `ordinary_burning` rider.

Then establish/refresh the existing generic `burning` Condition through the authoritative generic Condition lifecycle. Do not establish Burning from visual fire presentation alone, from ownership/loadout, from a miss/fully prevented packet, or from another fire Skill that lacks the exact rider.

Generic Burning remains:

- 2 direct Battle-PL damage per tick;
- maximum 2 ticks;
- `start_of_action_opportunity`;
- bypasses Stamina;
- refresh / single-stream semantics;
- compatible cure: `burn_treatment`.

## 3. Shadow-pin riders — A / Alpha-production

Applies to:

- `chunin_shikadai_shadow_sewing`
- `sannin_shikamaru_shadow_sewing_barrage`

Qualification:

- the exact target receives positive committed final damage from the parent Shadow Sewing packet.

Then establish source-owned `shadow_pin` for that target's next action opportunity.

Strength:

- use the actor's **current legitimate Effective Ninjutsu** at the time the pin is established.

State semantics:

- blocks substantial free movement, `reposition`, and movement-dependent Taijutsu/Bukijutsu while active;
- does not blanket-deny stationary actions;
- does not become generic Stun;
- reapplication by the same exact source refreshes/replaces that source's pin rather than stacking indefinite duplicate control.

For area Shadow Sewing Barrage, qualification/resolution is evaluated independently per target.

## 4. Deva Black Receiver Impalement — receiver pin — A / Alpha-production

`akatsuki_deva_black_receiver_impalement`

Qualification:

- the committed Impalement packet deals positive final damage to the exact target.

Then establish source-owned `receiver_pin` for that target's next action opportunity.

Strength:

- current legitimate Effective Bukijutsu of Akatsuki Deva at establishment time; canonical baseline 48.

`receiver_pin` blocks substantial free movement/reposition/movement-dependent actions. It is physical restraint, not generic Stun and not blanket chakra/action denial.

## 5. Jōnin Hanabi — Sixty-Four Palms tenketsu disruption — A / Alpha-production

`eight_trigrams_sixty_four_palms`

Qualification:

- the parent action is committed and deals positive final damage to the target.

Then establish source-owned `tenketsu_disruption` for **2 target action opportunities**.

Resolver strength:

- `round(0.90 × current legitimate Effective Taijutsu)` at establishment time, preserving the existing authored metadata.

Alpha effect is deliberately narrow and typed:

- blocks `transformation_activation`;
- blocks actions explicitly tagged `chakra_dependent_positive_self_enhancement` while the disruption is active;
- does not rewrite the target's Stats;
- does not universally disable all Ninjutsu/Fūinjutsu/Kinjutsu;
- does not become Stun.

Each completed affected target action opportunity decrements the state duration. Existing history survives removal/expiry.

## 6. Sannin Shikamaru — Shadow Neck Binding rider — A / Alpha-production

`sannin_shikamaru_shadow_neck_binding`

The 52 Attack PL parent packet remains authoritative.

The secondary `shadow_control` rider qualifies only when the target is already under an active **same-source Shikamaru shadow-control state** established by this actor, such as that actor's `shadow_possession` or `shadow_pin`.

On a qualifying committed Neck Binding resolution, preserve/refresh one target action opportunity of source-owned shadow control using current legitimate Effective Ninjutsu. Do not manufacture control merely because damage occurred, and do not convert the rider into generic Stun.

## 7. Teen Nagato — Black Receiver Bind — A / Alpha-production

`teen_nagato_black_receiver_bind`

Qualification:

- the parent action is valid and its authored binding/contact resolution succeeds according to the existing main resolver; positive damage, where present, is evidence but is not a universal control rule for unrelated actions.

Establish source-owned `physical_restraint` for one affected target action opportunity using current legitimate Effective Bukijutsu where a restraint scalar is required.

It blocks substantial free movement/reposition/movement-dependent actions only. Not generic Stun.

## 8. Planetary Devastation stage 2 — A / Alpha-production

`akatsuki_deva_planetary_devastation`

This remains one committed two-stage Technique lifecycle.

Stage 1 — Core Formation:

- consumes the initiating action opportunity;
- commits the pending Planetary Devastation state;
- deals no automatic damage.

While the exact pending state exists and Deva remains a valid Battle participant, **the next Deva action opportunity must continue Planetary Devastation Stage 2 rather than presenting/choosing an unrelated action**.

Stage 2 — Collapse / Devastation:

- consumes that next Deva action opportunity;
- removes/consumes the pending Stage-1 state exactly once;
- resolves 64 Attack PL per affected target;
- Alpha max targets 3;
- ordinary Stamina mitigation applies to each damage packet;
- `planetary_containment` strength = `round(1.10 × current legitimate Effective Ninjutsu)` at Stage-2 resolution; canonical baseline 106;
- no Excess for Alpha.

If Deva ceases to be a valid participant before Stage 2 can occur, invalidate/clean the pending runtime state with evidence; do not create a phantom collapse after removal. Stage-1 history remains.

## 9. Kamatari Gale Sever catastrophic interruption listener — A / Alpha-production

`kamatari_gale_sever`

Existing authored release/backfire numbers remain unchanged.

A central listener may call `interruptKamatariGaleSever(..., {catastrophic:true})` **only** when all are true:

- a Gale Sever charge exists;
- charge stage is 2 or 3;
- a committed external Battle occurrence affecting the charging actor explicitly carries an authored semantic trait/effect equivalent to `catastrophic_charge_disruption` / `gale_sever_catastrophic_disruption`;
- that disruptive effect successfully resolves against the charging actor.

Then:

- Stage 2 catastrophic interruption → 6 direct Battle-PL deterioration, bypass Stamina;
- Stage 3 catastrophic interruption → 10 direct Battle-PL deterioration, bypass Stamina;
- remove the charge and restore the ordinary Summon Skill palette;
- preserve exact disrupting occurrence/source provenance.

Everything else uses non-catastrophic interruption semantics:

- clean cancel;
- ordinary avoidance;
- normal defensive interruption;
- early disengagement;
- unrelated damage/Conditions that lack the explicit catastrophic-disruption semantic.

These end/cancel as authored with **no backfire**. Never infer catastrophic backfire from damage alone.

## 10. Fallen Hokage Sasuke — Shadow Seal — A / Alpha-production

`fallen_hokage_sasuke_shadow_seal`

Establishment remains a source-owned Fūinjutsu interaction state on the current active player, with live Effective Fūinjutsu 88 baseline and **one target action opportunity** of relevance.

Exact Alpha interference scope is intentionally narrow:

- it may interfere with the target's next `transformation_activation`; or
- the target's next positive self setup/activation explicitly tagged `chakra_dependent_positive_self_enhancement`.

If the target attempts one of those qualifying actions while Shadow Seal is active:

- Shadow Seal consumes itself exactly once;
- the qualifying activation/setup is rejected before commit with reason `shadow_seal_interference`;
- no false action history is created for the rejected action;
- the target does not lose an additional action opportunity for an action that never committed;
- the Seal's own interference occurrence/evidence is committed.

If the target completes a non-qualifying action opportunity first, Shadow Seal expires after that opportunity without blocking the action.

Do not extend Shadow Seal to attacks, Items, ordinary movement, all chakra actions, or blanket action denial.

## 11. Shadow of Indra — Black Mirror — A / Alpha-production

`shadow_of_indra_black_mirror`

Black Mirror remains Attack PL 0 and categorical by default. No hidden Black-Mirror Stat exists.

On use, establish a one-use `black_mirror_reversal_ready` context on Shadow of Indra for the current opposing actor's next action opportunity.

The context reacts only to an action directly targeting Shadow of Indra whose authored semantics are primarily perception/read/analysis/information acquisition (for example explicit visual read, sensory read, historical/perception analysis), not to ordinary damaging/control actions.

On a qualifying perception/read action:

- consume Black Mirror exactly once;
- resolve a `mirrored_perception_interference` occurrence before new target information is committed to the observer;
- the read does **not** gain new factual information about Shadow of Indra from that attempt;
- preserve evidence that the observer encountered a deceptive/reversal effect rather than rewriting objective world/history truth;
- do not grant Shadow of Indra the observer's Technique, Knowledge, or action;
- do not redirect damage or create reflected Attack PL.

If the opponent instead completes a non-qualifying action opportunity, the one-opportunity mirror context expires unused.

Only if an existing shared perception contest genuinely requires a magnitude may it read Shadow of Indra's current legitimate Effective Genjutsu (canonical baseline 127). Do not store a separate `BlackMirrorPower` field.

## 12. Black Madara — Black Tendril Impalement restraint — A / Alpha-production

`black_madara_black_tendril_impalement`

Base attack remains 76 Attack PL with ordinary Stamina mitigation.

Damage success alone must **not** automatically establish restraint.

For Alpha, the restraint rider qualifies only when the exact target is already under `black_lattice_control` established by the same `black_madara` participant when Tendril Impalement commits.

If that setup is present **and** the Tendril packet resolves with positive final damage:

- establish/refresh source-owned `black_tendril_restraint` for the target's next action opportunity;
- restraint strength = Black Madara's current legitimate Effective Kinjutsu at establishment time; canonical baseline 117;
- block substantial free movement/reposition/movement-dependent actions only;
- do not become generic Stun;
- preserve both the prior Black Lattice state reference and Tendril occurrence in causal evidence.

Without the exact same-source Black Lattice setup, Tendril remains only its 76-Attack damage action and creates no restraint.

## 13. Explicitly deferred secondary branches — B / outside Alpha production

The following parent Skills/actions remain valid Alpha content, but their listed unresolved secondary semantics are **not executable Alpha branches**. Coding must not invent a consumer, and the semantic-closure audit should treat these exact secondary branches as explicitly deferred rather than unresolved.

1. `academy_menma_guard_breaker` — `guard_interaction`
   - Parent remains 7 Attack PL.
   - Damage does not automatically break Guard.

2. `genin_sarada_chakra_enhanced_strike` — `contextual_impact_consequence`
   - Parent remains 15 Attack PL.
   - No automatic displacement, environment effect, Stun or Guard break.

3. `dragon_flame` owned by `akatsuki_sasuke` — `fire_state`
   - Parent damage remains authoritative.
   - No generic Burning/fire state is inferred.

4. `fireball_ambush` owned by `anbu_sasuke` — `fire_state`
   - Parent action remains authoritative.
   - No generic Burning/fire state is inferred.

5. `jonin_konohamaru_burning_ash_cloud` — `ash_fire_setup`
   - Parent area damage remains authoritative.
   - No downstream ash ignition/setup state is created in Alpha.

6. `jonin_sasuke_great_fireball` — `fire_state`
   - Parent damage remains authoritative.
   - No generic Burning/fire state is inferred.

7. `jonin_sasuke_wire_dragon_flame` — `wire_fire_interaction`
   - Parent 40-Attack packet remains authoritative.
   - No additional wire/fire control or condition is inferred in Alpha.

8. `kurama_dominion_nine_pillars` — `qualifying_damage_branch`
   - Secondary branch is deferred with the wider-repertoire semantics.
   - Do not promote the stored possible Attack PL into an Alpha executable rider by inference.

9. `teen_nagato_almighty_push` — `displacement_control`
   - Parent area damage remains authoritative.
   - No grid/queue displacement or invented hidden positioning system is introduced for Alpha.

10. `kage_itachi_totsuka_blade` — independent `sealing_branch`
    - Parent remains 64 Attack PL with normal Stamina.
    - The stored sealing strength `round(1.10 × Effective Fūinjutsu)` / baseline 86 is preserved for later authority.
    - Alpha does **not** infer sealing from damage, and no new target-eligibility/sealing lifecycle is invented merely to clear the audit.

These are deferred **secondary semantics**, not deleted Skill identities and not declarations that the concepts can never become executable post-Alpha.

## 14. Count reconciliation

Post-872 enumerated 30 unresolved secondary consumers.

- **A / Alpha-production with exact consumer semantics:** 20.
- **B / explicitly deferred secondary branches:** 10.
- **Remaining semantic-authority questions after Coding applies this classification:** 0.

Coding must still implement/verify the 20 A-consumers and teach the semantic-closure audit to exclude only the exact 10 B-branches as explicitly deferred. A runtime flag saying `unresolved` is not an acceptable substitute for this classification.

## 15. Reaffirmed adjacent Combat rulings

### Legacy Battle-entry capacity

Retire from Alpha production runtime:

- random ±10% Battle-entry capacity variation;
- `elite ×1.25`;
- `groupBoss ×8`;
- `guardBoss ×50`.

`standard ×1` is a no-op. Do not alter Base/Current/Effective PL or Stats in response.

### Breakout Kurama

The generic mid-Battle forced-manifestation bridge is **explicitly deferred post-Alpha**. Therefore Alpha requires no six-slots-full insertion policy. Do not create a seventh slot, overwrite, silently displace, auto-defeat, or hide an off-grid participant.

### Menma tutorial

The closed one-on-one is `academy_menma` vs `test_subject_altered_shinobi`; the wider clearing participants do not silently deploy into that Battle. Use the later two-axis Menma performance resolver and separate observer-bounded Kinjutsu evidence contract already recorded in `SC_Combat_Alpha_Integration_Closures_2026-09-04.md`.

### Field Readiness Assessment

Combat emits controlled-opposition/Battle/protective/participation evidence only. Battle result does not decide Promotion. The stable Rank assessment contract remains `academy_to_genin_field_readiness_assessment`.

## 16. Golden gate

After Coding implements the 20 Alpha consumers, explicitly marks the exact 10 deferred secondary branches, removes the retired legacy Battle-entry modifiers/variation, and preserves the prior Post-872 GREEN baseline, rerun:

1. Post-872/runtime cumulative diagnostics;
2. semantic-closure enumeration expecting **0 unresolved Alpha-production consumers**;
3. full Golden Combat Regression.

Only after those pass should Combat move from **FREEZE HOLD** to **ALPHA COMBAT FREEZE**.
