# Shinobi Chronicles — Durable Object Instance at Ownership Commit + Provenance Significance Gate

**Date:** 2026-09-30  
**Owner:** Stephen / CE / Codex / Coordination  
**Status:** **BINDING PROVENANCE ADDENDUM — PHASE-2 IMPLEMENTATION QUEUED THROUGH #148**  
**Consumes:** existing Crafting / Fūin Craft / provenance authority and item-economy recovery authority

## 1. Owner ruling

Stephen has reaffirmed the core Shinobi Chronicles object-history principle:

> **A relevant durable Weapon / Equipment / meaningful Item is not just a catalogue row once the player actually owns that exact object. It becomes an exact object with its own history.**

Canonical rule:

> **durable object definition != exact durable object instance**

For a normal durable object with no pre-existing exact identity:

> **mint the durable instance when ownership commits**

If the exact object already existed before player ownership, do **not** mint a replacement object on acquisition.

Transfer the same instance.

## 2. Provenance may predate player ownership

Player acquisition is not necessarily the beginning of an object's history.

An exact object may already exist because it was:

- authored into Story/World history;
- created by Forge/Crafting;
- created by CE as a committed World object;
- carried by another participant;
- inherited;
- stolen previously;
- modified previously;
- awarded an authored history before the current player finds it.

Therefore:

`player ownership start != object existence start`

and:

`acquisition != provenance reset`.

If the player steals, buys, loots, receives or otherwise acquires an already-instanced object, the same stable object instance continues with a new custody/ownership occurrence.

## 3. When to mint an instance

### A. Standard retail / ordinary reward object with no prior exact instance

At successful ownership commit:

`catalogue definition -> mint exact durable instance -> commit acquisition provenance -> assign ownership`

Semantic result:

- exact stable objectInstanceId;
- definitionId;
- acquisition mode;
- exact source occurrence;
- initial owner;
- current custody/ownership.

### B. Pre-existing authored / CE / World object

The instance already exists.

Acquisition performs:

`existing objectInstanceId -> custody/ownership transfer`

Do not mint a second object.

### C. Crafted durable object

Crafting already creates the exact object.

Its provenance begins at the creation/craft occurrence.

If the player later becomes owner, ownership is another occurrence on the same instance.

### D. Fungible stacks

Ordinary consumables/materials/stackable ammunition do not require one instance per unit by default.

Their stack/acquisition receipts may retain source provenance.

A normally fungible object becomes individually instanced only when exact authority makes that physical unit durably meaningful.

## 4. Object families covered

Default durable-instance candidates include:

- weapons;
- equipment/gear;
- durable tools;
- authored unique quest/reward objects that can persist in Inventory;
- other exact non-fungible objects deliberately admitted by owner authority.

Default non-instance families unless separately authored:

- ordinary stackable consumables;
- ordinary crafting-material quantities;
- generic currency;
- temporary Battle-only objects;
- presentation-only tokens.

## 5. Minimum provenance spine

Every durable instance must be able to preserve:

- stable object instance ID;
- stable catalogue/base definition;
- creation/origin mode if known;
- creator/executor if applicable and observer-safe;
- first known acquisition/source occurrence;
- custody/ownership changes;
- current owner/custodian;
- current custom/display name;
- modification/reforge lineage;
- Fūin attachment history/current attachment;
- destruction/retirement/supersession state;
- exact significant Chronicle occurrences where the object materially mattered;
- source/provenance refs required for save/load/idempotence.

This is factual history.

It is not a generic power meter.

## 6. Provenance-worthy vs ordinary usage

Not every use of an object deserves a prominent provenance entry.

Canonical rule:

> **History is recorded where causally needed; player-facing provenance highlights only events that materially change what this exact object means.**

### Automatically provenance-worthy

These should normally create durable provenance entries:

1. **creation / forging / authored object birth**;
2. **first legitimate player acquisition**;
3. **purchase from an exact vendor**;
4. **reward/award from an exact Mission, Story, World or Achievement source**;
5. **loot/recovery from an exact participant/location/occurrence**;
6. **theft / pickpocket / robbery / confiscation** where custody genuinely changes;
7. **gift / inheritance / transfer / trade** where custody genuinely changes;
8. **loss / abandonment / destruction / recovery**;
9. **modification / reforge / transformation**;
10. **Fūin attachment / replacement / removal** where the exact attachment history is persistent;
11. **authored renaming / recognition as a named object**;
12. **an exact Story/World occurrence whose resolver explicitly marks this object as materially decisive or uniquely significant**;
13. **a provenance-sensitive unlock/evolution/compatibility event**;
14. **formal institutional recognition/registration of the exact object** where such a system exists.

### Not provenance-worthy by default

Do not create prominent provenance entries merely because:

- the object was equipped;
- the object was unequipped;
- the player opened Inventory;
- the object was inspected;
- an ordinary attack used it;
- another generic enemy was defeated with it;
- the same routine Training activity was repeated;
- the player defeated Rogue Genin #1 through #64;
- Battle damage was dealt;
- the object sat in the Battle Pouch;
- UI/save/load occurred.

Routine usage may contribute to separate aggregate statistics if a later Record/achievement system wants them.

It does not pollute the object's provenance timeline.

## 7. Material participation test

An ordinary Battle/Story occurrence becomes provenance-worthy for an object only when at least one is true:

- owning Story/World/Combat authority explicitly tags the object as materially decisive;
- the outcome could not have happened through the same factual route without that exact object;
- the object itself changes state because of the occurrence;
- the object gains/loses a persistent capability, attachment, identity, recognised name or owner;
- the occurrence is a deliberately authored named-object milestone;
- an Achievement/Codex/Chronicle contract explicitly consumes the exact instance.

Do not infer significance merely because the object was present.

## 8. No generic provenance power score

Preserve existing law:

`provenance != automatic power`

`number of history rows != Stat bonus`

`number of kills != weapon level`

`old weapon != automatically stronger weapon`

An exact later effect may consume provenance predicates.

Example:
a weapon that has actually passed through a particular Forge lineage, Fūin attachment or authored battle may qualify for an exact later transformation.

That effect is authored by the owning system.

The history itself does not secretly add PL.

## 9. Academy Training Tantō — first Alpha benchmark

Existing reward weapon:

`academy_training_tanto`

Existing exact reward source:

`kak_origin_weapon_exceptional_training_tanto`

This becomes the first rewarded-weapon provenance benchmark.

When the exact reward entitlement successfully becomes player ownership:

- if no exact object instance already exists for the awarded physical Tantō, mint one durable instance;
- attach the exact Kakashi Origin reward-source occurrence;
- record Academy-stage acquisition context;
- preserve current +1 Effective Bukijutsu catalogue mechanics separately from provenance;
- do not auto-equip;
- do not infer mastery;
- do not rename it White Fang Tantō;
- do not grant hidden power from the provenance row.

Player-facing presentation may later say something concise such as:

**Awarded during your Academy Chronicle for exceptional field performance.**

Exact final wording is UI/Writing-owned and must reflect the actual qualifying source; the example above is not a new reward predicate.

The player may then build genuine later history on that same Tantō.

## 10. Three-object Phase-2 benchmark

Before provenance runtime can be considered mature, prove the same instance architecture across:

### Rewarded
Academy Training Tantō.

### Purchased
One ordinary shop-bought durable weapon.

### Crafted
One Forge-created durable weapon.

Required distinction:

- same definition may produce different exact instances;
- each instance has its own source history;
- purchased/forged/rewarded provenance does not collapse;
- save/load preserves exact identity;
- equip/unequip does not clone;
- transfer does not mint replacement;
- reforge/modification/Fūin continues the same lawful lineage or explicit supersession lineage.

## 11. CE-created / World-authored objects

CE may not casually mint legendary/history-bearing objects just to make a hotspot interesting.

For CE to create an exact durable object with pre-player provenance:

- object definition/authoring family must be authorised;
- World occurrence must legitimately create/place that object;
- any pre-existing owner/custody/history must be factual and committed;
- hidden provenance remains observer-safe;
- acquisition eligibility remains separate;
- exact object persists if not acquired.

A player later finding/stealing/buying/looting it acquires that same instance.

## 12. Presentation layers

### Inventory

Shows current object identity/effects/current ownership.

### Shinobi Record / Codex / Provenance

May show observer-safe significant history.

### Chronicle

May reference exact object occurrences where Story/World/CE legitimately recorded them.

Do not force the full low-level transaction log into player-facing prose.

## 13. Idempotence

The same causal occurrence must not create duplicate provenance rows through:

- save/load;
- UI reopen;
- retry projection;
- Battle return;
- reward screen rerender;
- inventory sorting;
- equipment refresh.

Every durable provenance event requires stable causal identity.

## 14. Acquisition / ownership boundary

Preserve:

`reward entitlement != ownership`

`ownership commit -> exact object becomes owned`

`owned != equipped`

`equipped != mastered`

`instance != definition`

`transfer != cloning`

`pre-existing instance acquisition != new instance mint`.

## 15. Phase-2 implementation owner

Existing queue:

GitHub #148 — Crafting / Fūin Craft / Provenance runtime + UI consumption.

This addendum is consumed by #148.

Do not create a second provenance architecture.

Initial implementation should prioritise the general durable-instance/provenance layer before requiring the entire Crafting UI to be finished.

## 16. Final lock

> **Relevant durable Weapons, Equipment and other non-fungible persistent objects become exact instances rather than remaining anonymous catalogue quantities. If no exact instance already exists, mint it when ownership commits. If an authored/CE/Crafted object already exists, acquisition transfers the same instance and preserves pre-player history. Provenance records meaningful causal history, while routine generic use does not spam the timeline and never becomes a hidden power score.**
