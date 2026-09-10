# Shinobi Chronicles — Alpha Text-First Items / Weapons / Gear / Skill Presentation and Rarity Contract

**Date:** 2026-09-10  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING PLAYER-DIRECTION / ALPHA CONTENT AUTHORITY**

## 1. Alpha visual decision

Stephen has explicitly decided that Alpha does **not** require dedicated image assets for:

- consumable Items;
- Weapons;
- other Equipment / Gear;
- learned / acquired Skills and Techniques.

These content families are **text-first** for Alpha.

The runtime must not block Item/Weapon/Gear/Skill production, acquisition, Inventory display, reward authoring, loadout use or Skill-learning content merely because an icon/illustration path is absent.

Existing historical Item PNGs may remain in source, but they are not a required Alpha dependency and must not become mandatory by fallback convention.

## 2. Rarity ladder

The Alpha semantic rarity ladder is exactly:

`normal -> common -> rare -> legendary`

No `uncommon`, `epic`, `mythic` or other implicit tier is introduced by this contract.

Rarity is a content/availability/presentation classification. It is **not** an automatic PL multiplier, Stat multiplier, damage multiplier, price formula, drop-rate formula or access grant.

### Presentation tokens

Runtime/UI may present rarity through text colour using these semantic classes:

- `rarity-normal` — neutral / slate / off-white family;
- `rarity-common` — green family;
- `rarity-rare` — blue / blue-violet family;
- `rarity-legendary` — gold / amber family.

Exact colour values, contrast, hover/focus states and accessibility treatment remain UI implementation authority. Text labels must remain available so colour is never the sole information carrier.

## 3. Legendary equipment doctrine preserved

Existing Decision Log authority remains binding:

**Legendary equipment requires synergy, history and compatibility — not rarity alone.**

A `legendary` row may therefore exist in the catalogue while remaining unusable, partially realised or less effective for an incompatible wielder.

Legendary rarity does not by itself grant:

- ownership;
- access;
- full effect;
- provenance compatibility;
- mastery;
- automatic acquisition;
- automatic drop eligibility.

## 4. Catalogue vs activation

The project may author a large catalogue before every acquisition route is live.

Each content row must keep separate concepts:

- `catalogueAuthored` — the content definition exists;
- `sourceEligible` — a current mission/training/shop/crafting/world source may legitimately offer it;
- `owned` — Inventory/Skill ownership is committed;
- `equipped/prepared` — selected for current use;
- `battleLegal` — executable in current Battle context;
- `runtimeImplemented` — current code consumes the definition;
- `Golden` — validated end-to-end.

Do not collapse authored catalogue size into automatic player access.

## 5. Items and Battle Pouch

Existing Alpha pouch authority remains intact for currently closed Items:

- `field_recovery_pill`;
- `standard_antidote`;
- `burn_treatment`.

New catalogue Items do not automatically enter the Battle Pouch merely because they are consumables.

A new Item may be:

- Inventory-only;
- reward/crafting material;
- pre-Battle preparation;
- Battle-pouch compatible;
- Battle-targeting dependent on later runtime support.

Where Battle use is not yet supported by current Item targeting semantics, catalogue the Item without pretending implementation exists.

## 6. Weapons / Gear

Current exact-instance Equipment doctrine remains:

- persistent instance identity;
- source/package ownership;
- explicit equip/unequip;
- Battle mutation lock;
- no automatic durability system;
- Equipment modifies Effective State, not Base Stats;
- removal removes only source-owned modifiers;
- proficiency/acclimation remains separate from item rarity.

Catalogue rarity never bypasses proficiency.

## 7. Skills / Techniques

Skills are also text-first for Alpha. Skill rarity may be displayed using the same four semantic rarity tiers, but rarity does not itself grant access or define mastery.

A mission, mentor, training activity, discovery or scroll may provide factual learning/development evidence; the owning Progression/Skill authority still decides whether that evidence grants Access/Competence/Power/Mastery.

Skill catalogue presence != learned Skill.

## 8. Non-collapse

- image absent != content absent;
- text-first != mechanically shallow;
- rarity != power automatically;
- rarity != ownership;
- reward eligibility != grant;
- catalogue != Inventory;
- Inventory != equipped;
- equipped != Battle-legal automatically;
- Skill catalogue != Skill access;
- mission completion != Skill unlock automatically;
- training attempt != mastery;
- Equipment modifier != Base Stat mutation;
- legendary label != legendary synergy;
- colour != sole semantic carrier;
- authored != implemented != runtime validated != Golden GREEN.

## 9. Production consequence

Combat/Skills/Items/Weapons may now expand Alpha content aggressively without waiting for visual-asset production.

The immediate production targets are:

1. **200-Skill text-first catalogue v1**;
2. **96-entry Item / Weapon / Gear / Material catalogue v1**;
3. later representation-specific prepared palettes and mission/training acquisition bindings consuming those stable catalogue IDs.

Those catalogues are content authority; activation/ownership/acquisition/runtime wiring remains separately evidenced.
