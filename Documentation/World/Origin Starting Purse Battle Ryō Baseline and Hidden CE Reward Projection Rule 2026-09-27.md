# Shinobi Chronicles — Origin Starting Purse, Battle Ryō Baseline and Hidden CE Reward Projection Rule

**Date:** 2026-09-27  
**Owner:** World / Missions / Events / Rewards  
**Status:** **STEPHEN-APPROVED GLOBAL REWARD BASELINE**  
**Source:** #406 Wasabi reward-spectrum review / Stephen direct clarification

## 1. Origin starting purse

Every completed Origin must leave the new Chronicle with usable spending money for the transition out of tutorial/onboarding and into the main game economy.

The money exists to seed:

- ordinary Item / Weapon purchases;
- Character-card acquisition where the exact Acquisition/economy route permits;
- Crafting;
- Fūin Crafting;
- other legitimate early-game services/economic choices.

This is an onboarding/economy grant, not praise for choosing a morally preferred route.

### Baseline

One valid sealed Origin completion grants:

**100 Ryō**

Stable semantic source:

`origin_completion_starting_purse_ryo_01`

Runtime identity must include the exact sealed Chronicle/Origin occurrence so Origin replay, Receipt reopen, refresh or save/load cannot farm the grant.

The grant is universal across Origins unless an exact later economy authority deliberately changes the global onboarding amount.

Route-specific rewards may exist in addition, but must be separately caused.

## 2. Battle money is mandatory

Every authored player-facing PL Battle must define a non-zero Ryō reward for a committed **player victory**.

Canonical:

> **Battle victory -> non-zero Ryō reward, plus any separately justified special rewards.**

This is a game-economy courtesy and part of the Battle reward envelope.

It does not mean:

- one universal flat value for every Battle;
- cash per enemy body;
- bounty semantics;
- kill reward;
- generic Character EXP;
- automatic loot;
- morality scoring.

World calibrates the exact Ryō amount from the encounter's authored difficulty/context while preserving already-closed exact values.

### Current Academy calibration anchor

A standard qualifying one-opponent Academy/Origin PL Battle victory may use:

**50 Ryō**

when no exact encounter contract establishes another value.

Harder/multi-participant encounters may legitimately use larger authored values such as existing 100 / 200 Ryō packages.

There is no generic `50 × enemyCount` formula.

### Defeat / withdrawal

Battle defeat or withdrawal does not automatically grant Battle cash unless an exact separate participation/stipend/reimbursement contract says otherwise.

Action-derived development and Chronicle consequences earned before defeat remain intact.

## 3. Special Battle rewards

A Battle may additionally grant causally justified:

- Items / consumables;
- Weapons;
- Equipment / tools;
- materials;
- other exact owner-authorised entitlements.

Not every Battle has loot.

No item is added merely because a Battle exists.

Special material rewards must consume an authorised definition/source and preserve normal ownership/Acquisition boundaries.

## 4. Rarity hierarchy

Stephen-approved reward rarity hierarchy is:

`common -> uncommon -> rare -> legendary`

This supersedes the prior World-facing `normal -> common -> rare -> legendary` statement.

Current Combat / Item / Weapon catalogue rows that still use `normal` require owner reconciliation; World must not silently remap live definitions itself. Until that owner return lands, reward authoring uses the Stephen-approved hierarchy semantically while exact live catalogue entries retain their current owner-authored rarity field.

Rarity is a property of the exact Item/Weapon/Equipment definition.

It is not a requirement that every Battle grant one reward from each tier.

## 5. Origins vs Battles vs Missions / side quests

### Origins

- always grant the one-shot **100 Ryō starting purse**;
- may additionally grant development, Items, Weapons, access, Knowledge, history, etc. when facts support them;
- may contain Battles whose Battle cash is separate.

### Battles

- player victory always grants non-zero Ryō;
- special loot/equipment/material rewards remain optional and causal;
- action-derived development remains separate.

### Side quests / Missions / Events

Ryō is **not mandatory merely because the content completed**.

Cash is considered an additional reward when there is an actual source such as:

- employer payment;
- bounty;
- reimbursement;
- institutional fee/bonus;
- sale/trade;
- authored economic entitlement.

Knowledge, development, access, relationship/history and future opportunity may be the primary value.

## 6. Chronicle Engine invisibility

Chronicle Engine internal operation is not a player-facing reward category.

The player is never shown raw CE machinery such as:

- sourceOccurrence IDs;
- internal evidence IDs/weights;
- hidden relationship calculus;
- hidden event-eligibility predicates;
- hidden future callback routing;
- internal observer-Knowledge graphs;
- raw Special Jōnin qualification-evidence weights/tags unless a separate UI authority deliberately exposes a human-readable progression surface.

Canonical:

> **Developers/authors know what CE committed. The player sees the factual outcome of their choices, not the hidden engine that made later consequences possible.**

Examples:

Internal:
- a student now has Shared History with Wasabi;
- a tracking recommendation makes a future training occurrence eligible;
- an instructor has observer-bounded evidence;
- a later callback reservoir gained an eligible event.

Player-facing:
- the student remembers what Wasabi did when they meet again;
- an instructor later offers relevant training;
- a future conversation acknowledges the earlier pursuit;
- a route/opportunity naturally becomes available.

Do not display:
- `CE +1 relationship`;
- `future event eligibility unlocked`;
- `sourceOccurrence committed`;
- raw hidden evidence weight.

## 7. Development presentation is separate from CE secrecy

Legitimate gameplay development may still be shown where current UI/Progression policy permits, including:

- Discipline Development EXP;
- a real Stat increase;
- Item/Weapon ownership;
- Skill/technique access;
- material Battle rewards.

If a Stat actually increases, display the Stat and causal development source as already required.

CE secrecy does not require hiding ordinary gameplay rewards.

## 8. Reward-spectrum relationship

This rule supplements the binding CE reward-spectrum firewall.

It does not reverse:

- consequences first;
- no filler loot;
- owner gap != cash substitute;
- no morality payout;
- no cash substitute for Skills/Summons/Enhancements/evidence;
- failure may retain development/history;
- diverse != maximal.

It adds two explicit economic baselines:

1. **every Origin -> 100 Ryō starting purse**;
2. **every player Battle victory -> non-zero Ryō**.

## Canonical lock

> **Every Origin ends with a one-shot 100-Ryō starting purse so the player enters Shinobi Chronicles' main economy with spending money. Every player Battle victory pays non-zero Ryō, while special Item/Weapon/Equipment/material rewards remain causal and optional. Missions and side quests do not require cash unless an actual economic source exists. Stephen-approved reward rarity is common -> uncommon -> rare -> legendary; any live catalogue `normal` rows require owner reconciliation rather than silent World mutation. Chronicle Engine internals stay hidden: players experience the outcomes of their decisions, not the machinery, IDs, weights or future-eligibility logic behind those outcomes.**
