# Shinobi Chronicles — Academy Kakashi Player-Facing Skill Clarity

**Date:** 2026-09-16  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING PLAYER-FACING COMBAT CLARITY — NO PL OR BALANCE CHANGE / CODING CONSUMPTION REQUIRED**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Problem this closes

Installed-browser review of the Academy Kakashi Origin Battle exposed a player-facing clarity failure.

The Battle presentation layer explicitly declares a youth reading target of `12-13`, but Academy Kakashi's five prepared Skills do not have exact player-facing summaries there and therefore fall through to generic implementation vocabulary such as:

- `technique`;
- `setup_technique`;
- `control_technique`;
- `context_technique`;
- "the exact limit comes from this Skill's authored rule";
- "create a temporary setup state".

Those phrases are implementation/designer language. They are not acceptable primary player instructions.

A player must be able to answer **"what happens if I click this?"** from the card/guide without understanding resolver terminology.

This closure changes player-facing names/copy only where the current mechanic is already concrete. It does **not** change stable Skill IDs, PL, Stats, damage formula, action economy, #214 viability, enemy tuning, or Story outcomes.

Where the current runtime mechanic itself is too incomplete to support an honest concrete description, this document records a real Combat/runtime semantic gap instead of inventing a fake benefit.

---

## 2. Global player-facing rules

For Battle Skill cards and Skill Guide presentation:

1. **Stable backend Skill IDs remain unchanged.**
2. Do not prefix every visible Skill name with the actor name when the actor is already visually identified on the Battle stage.
3. Do not expose raw action-class / serialization labels such as `technique`, `setup_technique`, `control_technique`, or `context_technique` as the primary player-facing type.
4. Preferred visible categories are short functional words such as `ATTACK`, `SETUP`, `CONTROL`, `INFO`, `DEFENSE`, and `RECOVERY`.
5. The first sentence must say the actual result of using the Skill.
6. Exact deterministic attack values should be shown when known.
7. If the Skill deals no damage, say **"Deals no damage."**
8. If another Skill changes its result, name that interaction directly.
9. Do not use phrases such as "authored rule", "transient state", "categorical evidence", "semantic class", or "resolver strength" in normal player guidance.
10. Do not claim a stun, movement block, damage bonus, hidden-stat reveal, extra turn, or other benefit that the resolver does not actually implement.

These rules are presentation requirements only. They do not author new Battle mechanics by implication.

---

## 3. Exact Academy Kakashi display contract

### 3.1 `academy_kakashi_kunai_quickdraw`

Stable backend ID remains:

`academy_kakashi_kunai_quickdraw`

**Player-facing name:** `Quick Kunai Strike`  
**Player-facing category:** `ATTACK`

**Card summary:**

> Attack one enemy at ATK 5.

**Expanded Skill Guide:**

> Strike one enemy with a fast kunai attack.
>
> - ATK 5.
> - The enemy's Stamina can reduce the damage.

Current mechanic remains direct Attack PL 5 with ordinary Stamina mitigation.

---

### 3.2 `academy_kakashi_clone_feint`

Stable backend ID remains:

`academy_kakashi_clone_feint`

**Player-facing name:** `Clone Feint`  
**Player-facing category:** `SETUP`

**Card summary:**

> Deals no damage. Power up your next Opening Strike from ATK 5 to ATK 7.

**Expanded Skill Guide:**

> Trick the enemy with a clone and create an opening.
>
> - Deals no damage.
> - Your next Opening Strike uses ATK 7 instead of ATK 5.
> - The setup is used up when that stronger Opening Strike resolves.

Current mechanic remains the existing `academy_kakashi_clone_feint_opening` setup state. No free action is created.

---

### 3.3 `academy_kakashi_opening_exploit`

Stable backend ID remains:

`academy_kakashi_opening_exploit`

**Player-facing name:** `Opening Strike`  
**Player-facing category:** `ATTACK`

**Card summary:**

> Attack one enemy at ATK 5, or ATK 7 after Clone Feint.

**Expanded Skill Guide:**

> Strike one enemy when you see an opening.
>
> - ATK 5 normally.
> - If Clone Feint is active, this attack becomes ATK 7.
> - The Clone Feint setup ends after the stronger attack resolves.
> - The enemy's Stamina can reduce the damage.

Current mechanic remains normal Attack PL 5 / enhanced Attack PL 7 and consumes only the exact Clone Feint source state.

---

### 3.4 `academy_kakashi_wire_snare`

Stable backend ID remains:

`academy_kakashi_wire_snare`

**Player-facing name:** `Wire Snare`  
**Player-facing category:** `CONTROL`

The name itself is sufficiently concrete. The current **mechanic is not yet sufficiently concrete for a complete player-facing promise**.

Current source defines this as `dynamic_control` with semantic class `physical_restraint`, but the exact Kakashi definition does not currently provide an authored `conditionKey`, condition type, blocked action traits, or duration. The current dynamic-control resolver only creates an actual Battle condition when such a condition is authored.

Therefore Coding/UI must **not** display copy that claims Wire Snare currently:

- stuns the enemy;
- blocks the enemy's next turn;
- prevents movement for a stated duration;
- lowers a Stat;
- deals damage;
- or prevents a specific action class.

Until Combat closes the missing exact control effect, the most specific truthful interim player copy is:

**Interim card summary:**

> Try to restrain one enemy with ninja wire. Deals no damage.

**Interim guide:**

> Use ninja wire to attempt to restrain one enemy.
>
> - Deals no damage.
> - This Skill is control, not a full stun.

**Combat blocker:** before public Alpha, either the exact lasting/control consequence must be authored and then stated plainly here, or this Skill must not be presented as though a stronger concrete restriction already exists.

This document intentionally does not invent that missing mechanical consequence as a copy fix.

---

### 3.5 `academy_kakashi_prodigys_read`

Stable backend ID remains:

`academy_kakashi_prodigys_read`

**Player-facing name:** `Analyze Opponent`  
**Player-facing category:** `INFO`

Current source resolves bounded observable-analysis evidence with information boundary `observable_analysis_only_no_technique_access`. It deals no damage and the exact Kakashi definition currently creates no dedicated Battle condition/state or ID-specific tactical payoff.

Therefore player copy must not claim that this Skill currently grants:

- bonus damage;
- accuracy/evasion;
- guaranteed prediction of the enemy's next action;
- hidden Stat revelation;
- hidden technique revelation;
- an extra action;
- or another follow-up bonus not present in source.

**Current truthful card summary:**

> Study one enemy's visible actions. Deals no damage.

**Current truthful guide:**

> Analyze what Kakashi can actually observe about one enemy.
>
> - Deals no damage.
> - Records observable information only.
> - Does not reveal hidden Stats or hidden techniques.

**Combat blocker:** this Skill currently has an understandable information boundary but not a concrete player-visible tactical payoff. Before public Alpha, Combat should either author that payoff explicitly or reconsider its prepared-Battle slot. Coding must not manufacture a benefit merely to make the tooltip sound useful.

---

## 4. Card presentation requirement

Academy Kakashi's five cards should visually read approximately as:

- `Quick Kunai Strike` — `ATTACK` — `ATK 5`
- `Clone Feint` — `SETUP` — `NO DAMAGE · NEXT OPENING STRIKE ATK 7`
- `Opening Strike` — `ATTACK` — `ATK 5 · ATK 7 AFTER CLONE FEINT`
- `Wire Snare` — `CONTROL` — `NO DAMAGE`
- `Analyze Opponent` — `INFO` — `NO DAMAGE`

Do not render `Academy Kakashi` inside every Skill name. The actor card already establishes ownership.

Internal IDs and action classes remain available to diagnostics/developer tooling and must not be lost; they simply are not the primary user-facing labels.

---

## 5. Coding consumption target

Current player-facing modern Battle presentation is owned by the 33000 presentation layer and the Kakashi interaction hotfix delegates hover/focus guidance into that layer. Coding should consume this closure there rather than creating a second Skill Guide system.

Required implementation shape:

- add exact Kakashi player-facing display-name / youth-summary overrides keyed by the stable Skill IDs above;
- preserve exact click/hover behavior and native Battle resolution;
- remove actor-name repetition from these five visible names;
- prevent raw action-class strings from appearing as the player-facing subtype for these exact cards;
- show `ATTACK / SETUP / CONTROL / INFO` functional labels;
- preserve exact mechanics and stable IDs;
- do not add a fake Wire Snare condition;
- do not add a fake Analyze Opponent combat bonus;
- keep developer diagnostics capable of seeing the underlying IDs/classes.

The existing presentation layer already states a youth reading target of `12-13`; Academy Kakashi must meet that target in practice rather than falling through generic resolver vocabulary.

---

## 6. Non-regression

This clarity closure does not reopen or change:

- Academy Kakashi Base PL15;
- #214 MI / PS / AMT sequential viability;
- Quick Kunai Strike Attack PL5;
- Clone Feint action consumption;
- Opening Strike PL5 / enhanced PL7;
- Pakkun action economy;
- Stamina mitigation;
- opposition calibration;
- Battle result semantics;
- Story outcome/custody authority;
- installed-browser Golden status.

Design/content clarity is now explicit. Runtime presentation implementation and browser verification remain Coding-owned.

## 7. Closure

The first three Kakashi Skills are mechanically concrete and now have binding plain-language player presentation.

`Wire Snare` and `Analyze Opponent` exposed deeper semantic/payoff gaps that generic tooltip wording had been hiding. Those gaps are now explicitly recorded rather than disguised with technical language or fabricated benefits.

**Routing:** Coding / Runtime issue `#188` should consume this document for the immediate presentation fix. Combat retains ownership of any later decision to author new Wire Snare / Analyze Opponent mechanics.
