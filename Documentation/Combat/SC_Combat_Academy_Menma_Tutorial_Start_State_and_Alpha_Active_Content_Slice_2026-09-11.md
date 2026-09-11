# Shinobi Chronicles — Academy Menma Tutorial Start-State Legality + Alpha-Active Combat Content Slice

**Date:** 2026-09-11  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING COMBAT AUTHORITY — ISSUE #108 CONSUMED / CODING INTEGRATION REQUIRED**

## 1. Scope / authority consumed

This closure consumes GitHub issue **#108** and preserves without reopening:

- `Documentation/SC_Combat_Alpha_Integration_Closures_2026-09-04.md`;
- `Documentation/SC_Combat_Deep_Sweep_Closures_2026-09-04.md`;
- `Documentation/UI/Academy Menma Tutorial Battle Presentation Contract.md`;
- `Documentation/Coordination/Post-22500 Installed-Browser Integration Owner Sequence 2026-09-11.md`;
- the existing production Academy Menma ordinary-action definitions/palette already present in source;
- the current text-first Combat catalogue and existing Alpha Item/Weapon/Equipment boundaries.

Exact tutorial remains:

- Origin: `origin_academy_menma_prologue`;
- player: `academy_menma`;
- opponent: `test_subject_altered_shinobi`;
- objective: **Stop the Altered Shinobi**.

Menma receives **no automatic Menma Nine-Tails / Kurama assistance** merely to make the tutorial actionable.

This document does not change Menma Stats/Base PL, the Altered Shinobi package, tutorial performance thresholds, MEN-03 source-occurrence authority, ownership, Rank, Progression or Story outcome authority.

---

## 2. Exact Academy Menma tutorial baseline prepared palette

For this tutorial, the exact baseline prepared palette is the existing ordinary Academy Menma production palette:

```text
academy_menma_chakra_knuckle
academy_menma_crescent_kunai
academy_menma_guard_breaker
academy_menma_shadow_clone_feint
academy_menma_shadowstep
```

These are **Character-specific authored actions**, not a generic Basic Attack / Guard fallback system.

### 2.1 `academy_menma_chakra_knuckle`

- display: **Chakra Knuckle**;
- target: current enemy;
- resolution: one direct Battle-PL damage packet;
- authored Attack PL: **6**;
- Stamina mitigation: **yes**;
- requirements: **none**;
- Battle-start status in the exact tutorial: **AVAILABLE** while the Altered Shinobi remains a legal current enemy;
- Kinjutsu-observation qualifying: **NO** under current authority.

This is one lawful ordinary Academy Menma strike. It is not a generic engine-wide Basic Attack.

### 2.2 `academy_menma_crescent_kunai`

- display: **Crescent Kunai**;
- target: current enemy;
- resolution: one direct Battle-PL damage packet;
- authored Attack PL: **5**;
- Stamina mitigation: **yes**;
- requirements: **none in the authored action definition**;
- Battle-start status in the exact tutorial: **AVAILABLE** while the Altered Shinobi remains a legal current enemy;
- Kinjutsu-observation qualifying: **NO**.

The current authored Character action does not consume or require a separate player Inventory/equipped-weapon grant. Coding must not add an Inventory prerequisite merely from the display name.

### 2.3 `academy_menma_guard_breaker`

- display: **Guard Breaker**;
- target: current enemy;
- resolution: one direct Battle-PL damage packet;
- authored Attack PL: **7**;
- Stamina mitigation: **yes**;
- requirements: **none**;
- Battle-start status in the exact tutorial: **AVAILABLE** while the Altered Shinobi remains a legal current enemy;
- Kinjutsu-observation qualifying: **NO**.

It carries an authored conditional `guard_interaction` rider. That rider requires a qualifying guard interaction and is **not automatic**. Absence of a qualifying guard does **not** make the parent Attack-PL action illegal and does not manufacture a guard break.

Existing contextual injury authority for this action remains separate: where the already-closed campaign condition legitimately permits the wrist-fracture rider and the physical hit succeeds, the injury may be authored from that parent hit; it never creates a second damage packet.

### 2.4 `academy_menma_shadow_clone_feint`

- display: **Shadow Clone Feint**;
- primary discipline: Ninjutsu;
- target: current enemy;
- resolution: transient source-owned setup state;
- Attack PL: none;
- state: `academy_menma_clone_feint`;
- reapplication: `refresh_replace`;
- requirements: none;
- clone is a temporary Technique construct, **not a Battle participant**;
- deception evidence does not equal automatic belief/deception success;
- Battle-start status in the exact tutorial: **AVAILABLE** while the Altered Shinobi remains a legal target;
- Kinjutsu-observation qualifying: **NO**.

A committed use is meaningful only when its authored primary setup state is actually established. UI preview/hover or rejected use creates no meaningful-action evidence.

### 2.5 `academy_menma_shadowstep`

- display: **Shadowstep**;
- target: self / contextual reposition;
- resolution: categorical movement/reposition evidence;
- Attack PL: none;
- requirements: no hidden capability grant, but the current Battle context must expose a **legitimate viable route/reposition opportunity**;
- not teleportation;
- no hidden Speed/Evasion scalar;
- Battle-start status: **CONDITIONAL** — legal only if the current encounter state exposes a legitimate route;
- invalid/no-route selection rejects precommit, consumes no action opportunity and creates no false movement history;
- Kinjutsu-observation qualifying: **NO**.

---

## 3. Start-state playability proof

At tutorial Battle start, the authored deployment contains one legal current enemy: `test_subject_altered_shinobi`.

Therefore, absent an already-resolved/invalid Battle state, all three of the following are immediately legal without any Kurama/Nine-Tails prerequisite:

```text
academy_menma_chakra_knuckle
academy_menma_crescent_kunai
academy_menma_guard_breaker
```

`academy_menma_shadow_clone_feint` is also legal against the current enemy and `academy_menma_shadowstep` is conditionally legal when an exact route exists.

Thus the exact authored tutorial begins with **at least three guaranteed executable player actions** while an actionable opponent exists.

If no legal current enemy exists, the tutorial is no longer in the authored actionable start state and Coding must resolve/return that Battle state rather than inventing a fallback button.

There is **no generic Basic Attack** or generic **Guard** added for Academy Menma by this closure. The three direct ordinary actions above are the lawful Character-specific baseline.

---

## 4. Treatment of the three currently visible Kurama-gated actions

The installed review showed:

```text
academy_menma_yin_chakra_pulse
academy_menma_fox_chakra_strike
academy_menma_kuramas_guidance
```

These remain valid authored Academy Menma / Menma Nine-Tails relationship techniques, but they are **NOT part of the initial tutorial prepared palette**.

### 4.1 `academy_menma_yin_chakra_pulse`

- primary discipline: Ninjutsu;
- direct one-target packet;
- ordinary Stamina mitigation;
- requires exact current cooperative Menma Nine-Tails access for the limited Yin-Kurama expression;
- current tutorial start status: **NOT PREPARED / NOT PROJECTED**;
- Kinjutsu-observation qualifying: **NO** under current authored discipline/flags.

### 4.2 `academy_menma_fox_chakra_strike`

- primary discipline: Taijutsu;
- direct one-target packet;
- ordinary Stamina mitigation;
- requires exact current cooperative Menma Nine-Tails access for the limited Yin-Kurama expression;
- current tutorial start status: **NOT PREPARED / NOT PROJECTED**;
- Kinjutsu-observation qualifying: **NO**.

### 4.3 `academy_menma_kuramas_guidance`

- relationship-owned Ninjutsu-support setup;
- creates source-owned `kurama_guidance` only when the exact cooperative relationship predicate passes;
- requires exact current cooperative Menma Nine-Tails access plus the exact current Guidance capability/relationship state;
- current tutorial start status: **NOT PREPARED / NOT PROJECTED**;
- Kinjutsu-observation qualifying: **NO**.

### 4.4 Projection rule

Do **not** show these three as the tutorial's initial action-bar palette with disabled buttons merely because their definitions exist.

They may become Battle-projectable only if a separate authoritative committed state during a legitimate encounter establishes their exact cooperative source/access predicates **and** the current prepared/action-package authority permits their projection. This closure does not bootstrap such a state and the current tutorial does not receive it automatically.

A Codex/relationship-information surface may describe known locked Techniques if another authority allows that presentation, but locked-definition visibility is not prepared Battle access.

---

## 5. Kinjutsu observation in this tutorial

Current observation authority remains unchanged:

A qualifying observation requires an actual committed Menma action authored as Kinjutsu or explicitly tagged `kinjutsu_observation_qualifying`, legitimate Anko observer access/perceptibility, and no applicable blocker.

None of the five ordinary tutorial baseline actions above is Kinjutsu-observation qualifying.

None of the three Kurama-gated actions above is currently authored as Kinjutsu or explicitly Kinjutsu-observation qualifying either: their current disciplines are Ninjutsu, Taijutsu and Ninjutsu-support respectively.

Therefore the default lawful tutorial palette does **not** manufacture the Kinjutsu-observed branch. That evidence remains false/absent unless a separate genuinely qualifying authored Technique is legally executed and observed.

Technique definition, ownership, disabled visibility, prepared state, hover, rejected selection or relationship presence never creates Kinjutsu-observation evidence.

---

## 6. Tutorial performance/evidence preservation

This closure changes only prepared-action legality/projection. It does not change the tutorial performance contract.

Preserve:

- `committedMenmaActionOpportunities` counts only the existing committed legal-action opportunity semantics;
- invalid/precommit requests do not consume an action and do not create false action history;
- `meaningfullyResolvedMenmaActions` increments only when the authored primary effect genuinely resolves/establishes under the existing tutorial evidence contract;
- recovery does not erase historical gross damage received;
- defeat/withdrawal/unresolved/non-stop remains `tutorialResult:not_completed` and `performanceBucket:null`;
- MEN-03 aggregate source occurrence remains `combat_academy_menma_tutorial_performance_resolved` only after legitimate completed performance resolution.

No fake shared memory, relationship cooperation, action execution or Kinjutsu evidence may be injected to satisfy tests.

---

# 7. Alpha-active Combat content projection v1

Stable projection-policy ID:

`alpha_combat_content_projection_v1_2026_09_11`

This section answers the broader #108 activation request without converting the authored text-first catalogue into blanket ownership.

## 7.1 Skills

### Definition layer

The authored **320-Skill text-first catalogue** remains valid definition authority.

Catalogue definition alone means:

```text
authored = true
runtimeActive = false by default
owned/accessed = false unless exact source state says otherwise
prepared = false unless exact palette/loadout authority says otherwise
```

### Alpha runtime-active rule

A Skill/action is runtime-active for a Character/encounter only when at least one exact production authority supplies it as:

1. that representation's current authoritative prepared palette;
2. an exact encounter/mission action package;
3. an exact temporary/Transformation/Hosted-Entity/Summon package whose current predicates are satisfied; or
4. an exact learned/owned Skill grant that current loadout authority permits the Character to prepare.

Coding must not surface all 320 catalogue rows as owned/prepared Battle actions.

### Battle action bar

Project only the current actor's exact currently prepared and predicate-legal Battle actions.

- prepared + legal → enabled/actionable;
- prepared + current predicate false → disabled with exact reason only where the action is legitimately part of that prepared package;
- authored but not prepared → absent from the Battle action bar;
- catalogue-only/unowned → absent from the Battle action bar.

This tutorial specifically uses the five ordinary Academy Menma actions in section 2, not the three Kurama-gated definitions.

### Loadout

The Loadout may expose only Skills that the current Chronicle state says are legitimately owned/learned/accessed and eligible for preparation under the current representation/loadout rules.

Catalogue-only rows may appear in a separate read-only Codex/discovery surface if UI authority permits, but they are not equippable/preparable merely because they exist in the catalogue.

### Genin-v2 note

The 25-row Genin v2 baseline prepared palettes committed under issue #104 are authored readiness authority but remain outside current-v1 runtime activation until CE publishes/activates the versioned v2 candidate-content policy and Coding consumes it. **Combat readiness != current production activation.**

### Contextual Skill note

Wave-7/8 passive/active/hybrid contextual Skills remain authored catalogue authority. Generic contextual runtime integration is separately queued through issue #86; catalogue presence alone does not make all contextual rows Alpha-live.

---

## 7.2 Weapons / weapon-slot Equipment

The exact Alpha-active weapon-definition slice remains:

```text
kunai
shuriken_set
ninja_wire
bandit_captains_tanto
```

These definitions being runtime-active does not grant universal ownership/equipment.

Preserve:

- ownership comes from Inventory/Acquisition authority;
- equipped weapon is exact-instance/current-slot state;
- one weapon slot;
- explicit unequip;
- Battle mutation lock;
- no durability system;
- `bandit_captains_tanto` applies its existing +3 Effective Bukijutsu before proficiency realization only when legitimately equipped;
- proficiency/acclimation remains existing authority;
- no weapon image is required for Alpha.

A weapon-dependent Skill still requires its exact authored weapon/source predicate where one exists. A Character-specific action that has no separate Inventory/equipment prerequisite must not gain one merely from its display name.

---

## 7.3 Other Gear / Equipment catalogue

The later text-first 28-Gear catalogue is **AUTHORED / CATALOGUE-ONLY by default** for current Alpha projection.

There is no blanket Alpha-active grant/equip slice for those 28 Gear rows from catalogue authorship alone.

Therefore current generic non-weapon Gear activation is:

```text
blanketActiveGearRows = []
```

An exact Gear row may become active later only through a legitimate reward/shop/crafting/world/acquisition + equipment contract. Do not expose all authored Gear as player-owned Loadout choices.

---

## 7.4 Battle Pouch Items

Exact Alpha-active Battle Pouch item definitions remain exactly:

```text
field_recovery_pill
standard_antidote
burn_treatment
```

Projection is **text-first**. No Item image is required.

Coding may render authoritative:

- item name;
- type;
- quantity;
- exact effect;
- use state;
- disabled reason.

But runtime-active definition != owned quantity.

Preserve current Pouch rules:

- persistent pre-Battle selection/state;
- runtime Battle snapshot;
- team-wide pouch;
- locked after Battle begins;
- valid successful use consumes one Inventory quantity and one Character action;
- invalid use consumes neither;
- post-consumption failure refunds according to existing authority;
- `field_recovery_pill` restores +4 underlying Remaining Battle PL capped;
- `standard_antidote` cures compatible generic `poisoned`;
- `burn_treatment` cures compatible generic `burning`;
- Alpha use is self-target unless another exact authority supersedes it.

All other Consumable catalogue rows remain authored but **not blanket Alpha-active/owned** until exact source/activation authority exists.

---

## 8. Coding acceptance / minimum regressions

Coding should prove at minimum:

1. Fresh exact Academy Menma tutorial start projects the five ordinary IDs from section 2.
2. `academy_menma_chakra_knuckle` is enabled at start against the Altered Shinobi.
3. `academy_menma_crescent_kunai` is enabled at start and does not invent an Inventory requirement.
4. `academy_menma_guard_breaker` is enabled at start even when no qualifying guard rider exists; rider itself does not fire without qualification.
5. `academy_menma_shadow_clone_feint` can establish its exact state without creating a clone participant.
6. `academy_menma_shadowstep` fails precommit with no action/history when no legitimate route exists.
7. The three Kurama-gated actions are absent from the initial tutorial action bar and no cooperative access is injected.
8. At least three legal player actions exist at the exact actionable Battle start.
9. No generic Basic Attack/Guard IDs are fabricated for Menma to repair the tutorial.
10. No default tutorial action generates Kinjutsu-observation evidence.
11. Invalid action selection does not increment meaningful execution or create false occurrence history.
12. Existing tutorial performance + MEN-03 regressions remain unchanged/GREEN.
13. Battle/Loadout does not bulk-project all 320 authored Skills.
14. Current-v1 does not prematurely activate the #104 Genin-v2 palettes.
15. Alpha weapon-definition surface is exactly the four IDs in §7.2 unless a newer exact authority supersedes it.
16. Generic 28-Gear catalogue does not become blanket owned/equipped.
17. Battle Pouch surfaces exactly the three current Alpha-active definitions and preserves Inventory quantities/disabled reasons.
18. Item/Skill/weapon presentation requires no image asset.
19. Save/load preserves owned/prepared/equipped/Pouch truth without converting catalogue-only rows into ownership.

---

## 9. Non-collapse

- ordinary Academy Menma action != generic Basic Attack;
- tutorial playability != fake Kurama cooperation;
- authored Kurama Technique != prepared tutorial Technique;
- disabled definition != current prepared palette;
- Kinjutsu observation != ownership/loadout/visibility;
- authored catalogue != runtime active;
- runtime active definition != owned;
- owned/accessed != prepared;
- prepared != currently legal;
- weapon definition != weapon ownership;
- Gear catalogue != equipped Gear;
- Item definition != Inventory quantity;
- text-first presentation != loss of semantic authority;
- Combat readiness != candidate activation;
- action availability != Progression;
- Battle PL != HP/injury;
- authored != implemented != runtime validated != Golden GREEN.
