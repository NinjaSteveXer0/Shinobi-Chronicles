# Shinobi Chronicles — Academy Kakashi Reward Action-Evidence and Item/Weapon Source Closure

**Date:** 2026-09-15  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING COMBAT / SKILL-ACTION / ITEM-WEAPON SOURCE AUTHORITY — PROGRESSION VALUES, INVENTORY TRANSACTIONS AND RUNTIME IMPLEMENTATION SEPARATE**

## 1. Purpose

This document closes the Combat / Skills / Items / Weapons owner fields requested by GitHub handoff `#199`, consuming:

- `Documentation/World/Academy Kakashi Origin Choice Battle Reward and Development Audit v1 2026-09-15.md` (`91f5969b20e270b3ef7d148342f28a1668b4eba1`);
- final Kakashi Writing authority `176ce76feef3e67d4c24644e3d7443a04dcf7d6b`;
- final Structured Autonomy inventory `713cae26e3b3fb4a214564b497a5f30fb2f14313`;
- current Combat catalogue authority, especially `Alpha_Item_Weapon_Gear_Catalogue_v1_Wave1_001-048.md`.

This closes Combat evidence and content/source legality only. It does **not** invent Progression values, Inventory transactions, reward presentation, runtime implementation or Golden status.

Preserve:

- Story choice != Battle action;
- Battle action != automatic Progression;
- action legality/effect != reward entitlement;
- reward entitlement != Inventory ownership;
- catalogue definition != ownership;
- ownership != equipped;
- equipped != mastery;
- Battle victory != mission success;
- Battle loss != zero action evidence;
- kill != Kinjutsu;
- kill != Assassination;
- item/weapon source authorisation != automatic runtime implementation.

---

## 2. Battle action -> development evidence contract

Progression may consume Battle evidence only from the **authored action actually executed**, never from a Story button label, branch name, scene description or inferred animation.

### 2.1 Authoritative action evidence fields

Each materially executed Battle action may expose one source-owned evidence record keyed by the committed action occurrence. The semantic fields are:

- `actorId` — exact acting participant;
- `actionId` — exact authored Skill / Battle action / Item action / Summon action identity;
- `occurrenceId` — exact committed Battle occurrence, unique for idempotence;
- `sourceId` — exact Skill, equipment, Item, Summon, Hosted Entity, Bloodline or other authorised causal source where applicable;
- `disciplineTags` — only discipline tags authored by the action definition;
- `capabilityTags` — only exact capability/source tags already authored by current authority;
- `executionCommitted` — whether the action passed precommit legality and actually executed;
- `effectResult` — bounded resolver result such as `resolved`, `partially_resolved`, `resisted`, `blocked`, `failed_after_commit`, or another exact authored result;
- `effectCommitted` — whether a target/context effect occurrence actually committed;
- `actionOpportunityConsumed` — whether the actor's normal action opportunity was consumed;
- exact target/source/provenance refs required to prove the occurrence.

These names are semantic authority, not a requirement that Coding use these exact object property names.

### 2.2 Discipline tags are authored, not inferred

Canonical discipline-development tags available from Combat where an exact action definition declares them are:

- `ninjutsu`;
- `taijutsu`;
- `genjutsu`;
- `bukijutsu`;
- `fuinjutsu`;
- `kinjutsu`.

An action may expose more than one discipline only when its exact authored definition legitimately declares multiple disciplines. Do not infer a second discipline from equipment, animation, elemental appearance or narrative framing.

Examples:

- an authored Taijutsu direct action may expose `taijutsu`;
- an authored Bukijutsu weapon action may expose `bukijutsu`;
- a Fūinjutsu Skill exposes `fuinjutsu` only where the exact action definition is Fūinjutsu;
- a Kinjutsu Skill exposes `kinjutsu` only where the exact action definition is Kinjutsu;
- a generic `Attack` Story choice exposes **no discipline tag by itself**;
- `Pickpocket` exposes **no Bukijutsu tag by itself**;
- a deterministic disposition `KILL` exposes **no Kinjutsu tag by itself**.

Equipment may alter Effective Stats or enable an action, but equipment identity does not manufacture an action discipline.

### 2.3 Capability tags

Combat may expose exact capability/source tags only where current durable authority already authored them on the resolving action/source. Examples include an exact Bloodline, Hosted Entity, Summon, clan-art, contextual Skill or weapon-source relationship.

Do **not** generate broad specialist-development tags such as `assassination`, `stealth`, `tracking`, `pickpocket`, `surveillance` or `fieldcraft` merely because a Battle or Story situation appears to resemble them. Those require exact owning-system capability/evidence authority.

---

## 3. Failed but legitimate Battle actions

A failed action can still be a real executed technique. Combat therefore closes the following distinction.

### 3.1 Precommit rejection — NO execution evidence

If an action fails before execution because any required legality predicate is false, it is rejected precommit. Examples:

- actor lacks exact Skill/capability access;
- source Item/equipment/Summon is unavailable;
- target is invalid;
- required authored context is absent;
- action route is unavailable;
- Battle action opportunity is unavailable;
- another exact precondition fails before action execution.

A precommit rejection:

- consumes no action unless another exact existing contract explicitly says otherwise;
- creates no factual technique-use occurrence;
- creates no Combat discipline-development evidence;
- creates no false capability demonstration.

### 3.2 Committed execution with unsuccessful result — YES attempt evidence

Once an action passes legality and **materially executes**, the committed action occurrence may be consumed by Progression even if the final effect is unsuccessful.

This includes exact authored outcomes such as:

- attack/resolver misses where an exact miss route exists;
- effect is resisted;
- effect is guarded/blocked after execution;
- control attempt fails after a valid committed attempt;
- target survives or takes zero net effect through a legitimate defensive resolver;
- another authored `failed_after_commit` result.

The minimum Combat predicate is:

`executionCommitted == true`

The action does **not** need to deal positive Battle-PL damage or achieve its objective for Combat to certify that the discipline was genuinely attempted/executed.

Progression remains owner of:

- exact development value for an attempt versus a successful effect;
- any success weighting;
- per-Battle/per-source/per-Character caps;
- diminishing returns;
- anti-farm treatment across repeated new occurrences.

Combat closes only that **legitimate committed failure is not the same thing as invalid non-execution**.

### 3.3 Duplicate prevention

One committed Battle action occurrence may emit its Combat execution evidence once for that `occurrenceId`.

Re-render, save/load, retry projection or repeated reward evaluation must not recommit another evidence occurrence for the same committed action history.

A genuinely new action on a later action opportunity is a new occurrence; broader anti-farm treatment belongs to Progression.

---

## 4. Stamina-relevant Combat evidence

Combat owns one exact reusable Stamina signal: **actual Stamina mitigation participation in a resolved direct Battle-PL packet**.

The current Combat mitigation formula remains:

`postStaminaDamage = max(1, floor(resolvedAttackPL * 100 / (100 + EffectiveStamina)))`

For a positive direct packet that reaches the Stamina stage, Combat may expose defender-attributable evidence containing:

- exact packet/action occurrence;
- `resolvedAttackPL` entering Stamina mitigation after authored pre-Stamina defence;
- defender `EffectiveStamina` used by the resolver;
- resolved post-Stamina Battle-PL damage;
- `staminaMitigationAmount = max(0, resolvedAttackPL - postStaminaDamage)`;
- exact attacker/source/defender refs.

A packet fully invalidated or prevented **before** the Stamina stage emits no Stamina-mitigation evidence because Stamina did not participate in that packet.

Combat does **not** author a numeric Stamina EXP award here. Progression owns whether and how this factual mitigation evidence contributes to persistent Stamina development, including caps and anti-farm rules.

High Stamina existing on a Character does not itself generate development evidence while idle.

---

## 5. `field_recovery_pill` Kakashi Origin resupply — APPROVED

Current catalogue authority defines:

- stable ID: `field_recovery_pill`;
- display: **Field Recovery Pill**;
- kind: `consumable`;
- rarity: `common`;
- use family: `battle_pouch`;
- effect: restore **4 underlying Remaining Battle PL**, capped, self-target;
- successful Battle use consumes **1 quantity + current actor action**;
- activation: `alpha_live`.

Combat therefore approves World source:

`kak_origin_item_field_recovery_resupply`

for exactly:

`field_recovery_pill x1`

under the World predicate:

- Kakashi materially participated in at least one PL Battle in the sealed Origin occurrence; and
- terminal debrief commits.

Combat-specific boundaries:

- this is a legitimate **resupply/reward source**, not enemy loot;
- it does not retroactively restore Battle PL in a completed Battle;
- entitlement does not auto-consume the pill;
- entitlement does not auto-place it into the currently locked Battle Pouch snapshot;
- future Battle availability still follows Inventory/Pouch preparation authority;
- grant transaction/idempotence/already-owned quantity handling remain Acquisition/Inventory authority.

No alternative Item is required.

---

## 6. `academy_training_tanto` exceptional Kakashi Origin award — APPROVED FOR THIS SOURCE

Current catalogue authority defines:

- stable ID: `academy_training_tanto`;
- display: **Academy Training Tantō**;
- kind: `weapon`;
- rarity: `normal`;
- slot/use family: `weapon`;
- exact effect: **+1 Effective Bukijutsu before proficiency realisation**;
- catalogue activation currently: `catalogue_only`.

Combat approves this exact existing catalogue identity as the exceptional field-evaluation award for World source:

`kak_origin_weapon_exceptional_training_tanto`

when World has factually satisfied its existing exceptional-field-execution predicate.

This source authorisation means the item is valid content for this reward transaction. It does **not** globally move the item into shops, drops, crafting or every Alpha reward table.

When actually owned/equipped in a future Battle:

- one-weapon-slot authority applies;
- the +1 Effective Bukijutsu modifier is resolved before current weapon proficiency realisation;
- owning the weapon does not auto-equip it;
- equipping does not grant Skills;
- equipment may enable only exact compatible actions;
- reward ownership does not imply mastery or a new Base Stat/Base PL value.

Inventory grant, duplicate/already-owned handling and save/load idempotence remain Acquisition/Inventory/Coding.

No replacement weapon is required.

---

## 7. `white_fang_tanto` exclusion — CONFIRMED

`white_fang_tanto` remains an authored `legendary` weapon whose catalogue effect is **+5 Effective Bukijutsu before proficiency realisation**, with further legendary synergy requiring exact provenance/compatibility authority.

Combat confirms the World exclusion:

> **`white_fang_tanto` is NOT an Academy Kakashi Origin reward.**

The Origin must not grant it as:

- default completion equipment;
- exceptional-field substitute;
- kill reward;
- participant loot;
- hidden upgrade from `academy_training_tanto`;
- automatic inheritance/provenance reward.

Any future White Fang Tantō ownership/source requires separate exact authority.

---

## 8. Generic deterministic post-defeat `KILL` is not Assassination development

Combat confirms:

A generic deterministic post-defeat `KILL` disposition is an exact lethal outcome/occurrence, **not automatically an Assassination/covert-lethal capability demonstration**.

By itself it emits no:

- `assassination` capability tag;
- `covert_lethal` capability tag;
- Kinjutsu discipline tag;
- Bukijutsu/Taijutsu discipline tag;
- hidden combat multiplier;
- kill bonus.

Only an exact prior action/method whose authored capability/source contract legitimately declares an Assassination/covert-lethal demonstration may provide such evidence, and only if a reusable owning-system path actually exists.

Therefore:

`defeated target -> deterministic KILL choice`

is insufficient proof of stealth, assassination technique, covert approach, weapon discipline or forbidden-technique competence.

This preserves World lethal history while preventing outcome labels from fabricating development categories.

---

## 9. Kakashi Origin consumption summary

For #199 / #197, Combat closes these fields:

1. **Battle action -> discipline/capability evidence:** exact authored action/source tags only; never Story-label inference.
2. **Failed valid Battle actions:** committed material execution emits attempt evidence even when final effect fails; precommit rejection emits none.
3. **Stamina:** exact packet-level mitigation evidence is Combat-owned; numeric/persistent Stamina development remains Progression-owned.
4. **Field Recovery Pill:** `field_recovery_pill x1` is approved as the World-authored one-shot terminal-debrief PL-Battle resupply entitlement.
5. **Exceptional weapon:** `academy_training_tanto` is approved for the existing World exceptional-evaluation source; its previous `catalogue_only` status is not a blocker to this exact source binding and is not global activation.
6. **White Fang Tantō:** explicitly excluded from the Origin reward.
7. **Kill:** deterministic post-defeat kill does not automatically demonstrate Assassination/covert-lethal, Kinjutsu or any weapon discipline.

## 10. Remaining owner/runtime boundaries

Still separate after this Combat closure:

- Progression numeric/bounded discipline values;
- Progression attempt-vs-success weighting and anti-farm caps;
- persistent Stealth / covert acquisition / Assassination-family availability and development semantics;
- Acquisition/Inventory entitlement -> ownership transaction;
- duplicate/already-owned handling;
- inventory-full/capacity policy if applicable;
- save/load transactional idempotence;
- Coding implementation;
- browser/runtime validation;
- Golden/regression GREEN.

**Combat slice: CLOSED.**
