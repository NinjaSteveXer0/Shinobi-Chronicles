# Shinobi Chronicles — Standard Retail Kunai Durable Benchmark Package

**Date:** 2026-10-06  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons / Tailed Beasts  
**Status:** **DESIGN CLOSED — #148 BENCHMARK 2 CONTENT AUTHORITY / IMPLEMENTATION SEPARATE**  
**Parent handoff:** #550  
**Downstream consumer:** #148 durable-object benchmark 2

## 1. Purpose

This closes the smallest exact Combat / Items package required for the second #148 durable-object provenance regression benchmark:

> one shop-bought durable weapon.

The benchmark consumes the existing Konoha Commercial District Item Shop host and the already-merged #545 durable-object instance/provenance foundation. It does not create a Weapon Shop, dynamic pricing, selling, merchant reputation, Forge UI or a second ownership/provenance system.

## 2. Source-first canonical definition reuse

Current Combat catalogue authority already contains the exact canonical weapon row:

- definition ID: `kunai`
- player-facing name: **Kunai**
- kind: `weapon`
- use family: `weapon`
- existing mechanical semantic: **no intrinsic Stat modifier; enables compatible kunai/Bukijutsu actions**.

Therefore this benchmark MUST reuse `kunai`.

Do **not** create `standard_kunai` as a duplicate definition.

The older catalogue row labels `kunai` as `normal`. Current Phase-2 rarity authority explicitly supersedes the obsolete `normal -> common -> rare -> legendary` ladder with:

`Common -> Uncommon -> Rare -> Legendary`

For this benchmark package only, the authoritative current rarity of `kunai` is therefore:

**Common**.

This does not perform a blanket migration of every old catalogue row.

## 3. Exact retail durable package — LOCKED

| Field | Exact authority |
|---|---|
| Definition ID | `kunai` |
| Display name | **Kunai** |
| Object kind | `weapon` |
| Weapon class | `kunai` / standard shinobi throwing-melee weapon |
| Rarity | **Common** |
| Stackable | `false` |
| Ownership model | exact durable instance |
| Starting durability | **10** |
| Maximum durability | **10** |
| Base Effective Stat modifier | **none** |
| Base Attack/PL bonus | **none** |
| Base passive bonus | **none** |
| Capability | enables exact compatible kunai/Bukijutsu actions when current condition permits |
| Alpha retail price | **50 Ryō** |

## 4. Mechanical package

A fresh standard retail `kunai` is deliberately ordinary.

It provides exactly:

1. a valid durable Weapon instance;
2. eligibility to equip/use it through existing equipment legality;
3. compatibility with exact Skills/actions that require a kunai or compatible Bukijutsu weapon;
4. no intrinsic Character Stat modifier;
5. no intrinsic Attack PL modifier;
6. no generic accuracy/crit/Speed/evasion modifier;
7. no provenance-derived bonus;
8. no Forge/reforge/Fūin effect at purchase time.

The catalogue's existing semantic remains controlling:

> **no intrinsic Stat modifier; enables compatible kunai/Bukijutsu actions**.

Purchase does not auto-equip the object.

## 5. Exact durability / repairable-condition authority

The existing Crafting/Fūin contract intentionally does **not** create one generic durability system for all Weapons.

This benchmark therefore authors one bounded repairable condition state for the exact `kunai` definition rather than silently globalising durability.

Canonical fields for a fresh instance:

```text
durabilityCurrent = 10
durabilityMax = 10
```

Rules:

- durability belongs to the exact owned instance, not the catalogue definition quantity;
- successful ownership commit creates the new retail instance at `10 / 10`;
- only an exact committed use/wear resolver may reduce durability;
- UI hover, equip/unequip, Inventory reopen, save/load and provenance inspection do not reduce durability;
- for the #148 regression proof, one exact committed compatible weapon-use wear event reduces durability by **1**;
- durability never drops below `0`;
- at `0`, the object remains owned and keeps the same instance/provenance identity, but it cannot satisfy a kunai-required executable weapon action until repaired;
- repair restores the same instance to `10 / 10` for this benchmark;
- repair does not mint a new instance;
- repair does not erase purchase provenance;
- repair does not increase max durability;
- repair does not add power;
- durability mutation does not alter item definition identity, ownership history or provenance lineage.

This is an exact authored condition state for `kunai` and the #148 benchmark. It does **not** author automatic durability for every Weapon/Equipment definition in the project.

## 6. Fixed Alpha retail price

The exact Alpha benchmark retail price is:

# **50 Ryō**

This is a fixed content price, not a rarity formula.

It is intentionally coherent with the existing bounded Konoha Basic Item Shop catalogue:

- Standard Antidote — 20 Ryō;
- Field Recovery Pill — 25 Ryō;
- Basic Scroll — 40 Ryō;
- Weapon Materials — 60 Ryō.

A fresh standard Kunai at 50 Ryō sits inside the current first-hour economy without creating a wider pricing doctrine.

No selling/resale value is authored here.

## 7. Retail host / provenance consumption

Consume the CE/Codex authority already supplied on #550:

- location: `KON-P09`;
- shop: `konoha_central_commercial_basic_item_shop`;
- purchase occurrence: `konoha_item_shop_purchase::<purchaseIntentId>`;
- `acquisitionKind = purchase`;
- `eventType = purchase`;
- `sourceId = konoha_central_commercial_basic_item_shop`;
- exact purchase occurrence is the provenance source occurrence;
- provenance retains exact location, shop and `kunai` definition refs;
- durable acquisition uses the #545 exact-instance/provenance API.

Purchase provenance records **where/how this exact object was acquired**.

It does not modify the object's Combat package.

## 8. Retail vs Forge boundary

Buying this object grants only the ordinary standard-retail `kunai` package defined above.

It does **not** receive:

- forged-quality bonuses;
- creator/masterwork bonuses;
- hidden provenance scaling;
- rarity-based stat scaling;
- automatic Fūin effects;
- permanent superiority/inferiority based on acquisition source.

Existing #148 authority still requires the later Forge benchmark to begin with a mechanically stronger fresh forged-kunai package than a fresh standard retail kunai.

That Forge package is **not authored here**.

A purchased kunai may later become mechanically different or stronger only through separately authorised exact mechanics/history such as:

- modification;
- reforge;
- Fūin Craft attachment;
- provenance-sensitive authored development;
- another exact future weapon mechanic.

History/provenance by itself never grants generic power.

Likewise a fresh forged kunai is not permanently guaranteed to outperform every historically developed purchased kunai.

## 9. Required non-collapse

Preserve:

- weapon definition != exact owned instance;
- one `kunai` definition may have many separately owned instances;
- same-template instances may have different histories and condition states;
- purchase intent != committed purchase;
- purchase receipt != provenance object != Inventory ownership row;
- ownership != equipped;
- purchase != auto-equip;
- rarity != power formula;
- retail provenance != hidden bonus;
- Forge provenance != generic superiority;
- durability != identity;
- repair != replacement;
- repair != provenance reset;
- condition mutation != Base Character Stat mutation;
- design closed != implemented != runtime validated != Golden GREEN.

## 10. #148 benchmark-2 acceptance package

Coding may now implement/prove exactly:

```text
real Ryō
-> deliberate purchase intent
-> 50 Ryō atomic debit
-> one exact `kunai` Inventory instance at 10/10
-> #545 purchase provenance event/receipt
-> no auto-equip
-> reopen/save-load preserves same instance + provenance + durability
-> same purchaseIntentId retry does not debit/grant twice
-> one exact compatible wear event: 10 -> 9
-> save/load preserves 9/10 on same instance
-> exact repair: 9 -> 10 on same instance
-> purchase provenance and instance identity remain unchanged
```

No full Forge/Crafting UI, Forge balance package, Fūin Craft, dynamic pricing, selling or Weapon Shop architecture is required for this benchmark.

## 11. Final lock

> **The #148 shop-bought durable benchmark uses the existing canonical `kunai` definition, not a new `standard_kunai` duplicate. Its current rarity is Common; it is non-stackable and instance-owned; a fresh instance begins at 10/10 authored durability; its standard mechanical package has no intrinsic Stat or Attack bonus and only enables compatible kunai/Bukijutsu actions; its fixed Alpha retail price is 50 Ryō. Purchase provenance records history but grants no power. Later Forge/reforge/Fūin/development can differentiate the exact object only through separately authorised mechanics.**
