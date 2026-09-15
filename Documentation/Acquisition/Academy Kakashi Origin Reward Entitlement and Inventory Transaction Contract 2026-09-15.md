# Shinobi Chronicles — Academy Kakashi Origin Reward Entitlement and Inventory Transaction Contract

**Date:** 2026-09-15  
**Owner:** Acquisition / Character Systems  
**Status:** **CLOSED ACQUISITION / INVENTORY AUTHORITY**  
**Source handoff:** GitHub #199  

## 1. Purpose

This contract closes the Acquisition / Inventory owner fields for the Academy Kakashi Origin reward layer without creating a second inventory, loot, reward, weapon-instance, or Battle Pouch system.

It consumes:

- World reward-source authority: `Documentation/World/Academy Kakashi Origin Choice Battle Reward and Development Audit v1 2026-09-15.md`, commit `91f5969b20e270b3ef7d148342f28a1668b4eba1`;
- Combat item/weapon identity closure: `Documentation/Combat/SC_Combat_Academy_Kakashi_Reward_Action_Evidence_and_Item_Weapon_Source_Closure_2026-09-15.md`, commit `e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8`;
- current Inventory / Battle Pouch separation already consumed by Coding/runtime issue #111;
- existing crafted/provenance-instance authority, which does not make an ordinary authored catalogue weapon into a unique created instance merely because it is awarded exceptionally.

Canonical transaction boundary:

> **reward entitlement != persistent Inventory ownership != Battle Pouch preparation != equipment != use/deployment**

Package custody in Story is not Inventory ownership. Opponent equipment is not automatic loot.

---

## 2. Acquisition route

Stable Acquisition route:

`academy_kakashi_origin_reward`

Each material reward must commit from its exact authoritative World reward-source occurrence / entitlement, never from UI display, debrief screen rendering, Battle count alone, branch-name inference, or reload.

A qualifying reward receipt must carry a deterministic idempotency identity derived from at least:

- route `academy_kakashi_origin_reward`;
- sealed Academy Kakashi Origin occurrence / Chronicle identity;
- exact reward-source ID;
- exact catalogue target ID;
- recipient ownership context.

Timestamp may be recorded as receipt metadata but must not be the semantic identity of the grant.

The same qualifying source may therefore be retried safely without creating another reward.

A genuinely distinct future authorised source for the same catalogue object remains a distinct transaction and may legitimately increase quantity/ownership count according to the normal catalogue/inventory model.

---

## 3. Field Recovery Pill grant

### Source

`kak_origin_item_field_recovery_resupply`

### Target

`field_recovery_pill` × **1**

### Closed transaction

When the World predicate for `kak_origin_item_field_recovery_resupply` is factually satisfied and its entitlement is committed:

1. validate the exact catalogue identity `field_recovery_pill`;
2. validate the exact sealed Kakashi Origin source/recipient;
3. check the deterministic Acquisition receipt for this exact entitlement;
4. if that receipt already exists, project the existing committed result and grant **0 additional quantity**;
5. otherwise add exactly **1** `field_recovery_pill` to persistent Inventory ownership;
6. record the Acquisition receipt/provenance;
7. do not auto-use the pill;
8. do not auto-prepare it into the Battle Pouch;
9. do not mutate PL, Stats, Rank, Progression, Skill access, or Battle state merely because ownership committed.

### Already-owned behaviour

Existing ownership from another legitimate source does **not** invalidate this entitlement.

If the player already owns one or more `field_recovery_pill` quantities from other sources, this distinct Kakashi Origin entitlement adds **+1 quantity** to the existing persistent Inventory stack.

Duplicate suppression is source-scoped, not catalogue-ID-scoped:

- same source retry/load/reopen -> **no additional pill**;
- separate legitimate source -> may add its separately authorised quantity.

---

## 4. Exceptional Academy Training Tantō award

### Source

`kak_origin_weapon_exceptional_training_tanto`

This source is available only when the World exceptional-field-execution predicate is factually satisfied. Acquisition does not reinterpret or broaden that predicate.

### Target

`academy_training_tanto` × **1**

Combat has closed this as an ordinary authored catalogue weapon. It is **not** a player-crafted provenance weapon instance and is not `white_fang_tanto`.

### Closed transaction

When the exact entitlement commits:

1. validate catalogue identity `academy_training_tanto`;
2. validate the exact exceptional-award source and sealed Kakashi Origin recipient;
3. check the deterministic Acquisition receipt for this entitlement;
4. if the receipt already exists, project the prior committed result and grant **0 additional copies**;
5. otherwise grant exactly **one normal catalogue-owned `academy_training_tanto` copy/unit** using the existing persistent Inventory/equipment-ownership model;
6. preserve reward provenance on the Acquisition receipt;
7. do not auto-equip it;
8. do not convert it into a crafted/provenance-created unique instance;
9. do not upgrade/substitute it to `white_fang_tanto`;
10. do not grant hidden PL/Stat/Skill/Rank/Progression changes from the ownership transaction itself.

### Already-owned behaviour

The Kakashi Origin reward remains an independently earned entitlement even if an `academy_training_tanto` is already owned from another legitimate source.

The normal persistent catalogue/inventory model may therefore add one additional copy/quantity for this distinct authorised source. What must never occur is a second copy from replaying/reloading the **same** Kakashi reward entitlement.

No duplicate-conversion economy is authored here. Do **not** replace an already-owned reward with Ryō, shards, XP, rarity upgrades, another weapon, or `white_fang_tanto` merely because a copy already exists.

If the runtime ownership model only supports one boolean ownership row for this weapon rather than a quantity/count, Coding must preserve the Kakashi entitlement receipt as committed historical truth and reuse the existing owned catalogue identity rather than fabricating a compensation system. That implementation-model limitation does not author a second weapon-instance economy.

---

## 5. Inventory capacity / full-state law

Current project authority distinguishes persistent Inventory ownership from Battle Pouch preparation. A Battle Pouch capacity/full state therefore **cannot reject or consume** either Kakashi reward entitlement.

No current Acquisition authority establishes a generic finite persistent-Inventory capacity that may silently delete a legitimate reward.

For Alpha:

- `field_recovery_pill` grants to persistent Inventory; Battle Pouch preparation is a later separate action;
- `academy_training_tanto` grants to persistent Inventory/equipment ownership; equipping is a later separate action;
- neither grant may be discarded, converted, or auto-used because a presentation slot, Battle Pouch, equipment slot, or currently prepared loadout is full.

If current runtime contains a genuine persistent-Inventory hard-cap implementation that conflicts with this contract, Coding must **not lose the entitlement** and must not invent a mailbox/stash/overflow/compensation mechanic. Preserve a pending/committed entitlement receipt fail-closed and route the exact implementation collision to CE / Codex / Coordination for smallest-resolution authority.

---

## 6. Minimum Acquisition receipt / provenance

Each committed material reward transaction must retain enough durable evidence to answer why this object is owned.

Minimum fields/concepts:

- stable transaction/receipt identity;
- route `academy_kakashi_origin_reward`;
- sealed Academy Kakashi Origin occurrence / Chronicle source ref;
- exact World reward-source ID;
- exact catalogue target ID;
- quantity authorised;
- recipient/player ownership context;
- previous ownership/quantity where the runtime tracks it;
- resulting ownership/quantity where the runtime tracks it;
- whether an existing owned catalogue identity/stack was reused;
- source authority/provenance refs;
- commit timestamp as metadata only;
- `autoPreparedToBattlePouch = false` or equivalent factual projection for the pill;
- `autoEquipped = false` or equivalent factual projection for the weapon.

Retry/save/load must resolve to the same transaction identity and must not mint another historical grant.

Presentation may display the receipt; presentation does not create it.

---

## 7. Atomicity and failure behaviour

A reward entitlement exists before Inventory mutation and must not be treated as owned until the ownership transaction commits successfully.

Preserve:

`entitlement -> validated Acquisition transaction -> persistent ownership -> optional later preparation/equipment/use`

If validation fails before commit:

- no Inventory quantity/copy is added;
- no fake ownership/history receipt is emitted;
- the underlying legitimate entitlement remains unresolved/pending rather than being erased.

If a retry occurs after a successful commit:

- receipt lookup returns the existing result;
- no duplicate quantity/copy is added.

Do not partially commit an ownership mutation while omitting its provenance receipt.

---

## 8. Explicit non-collapse rules

Preserve:

- reward source != reward entitlement;
- reward entitlement != Inventory ownership;
- Inventory ownership != Battle Pouch preparation;
- Inventory ownership != equipment;
- equipment != Battle deployment/use;
- package custody != Inventory ownership;
- defeated participant equipment != loot;
- exceptional award != unique crafted-instance ontology;
- duplicate catalogue ownership != automatic compensation currency;
- same source retry != new reward;
- different legitimate source != duplicate retry;
- `academy_training_tanto` != `white_fang_tanto`;
- item/weapon ownership != PL/Stat/Rank/Progression mutation;
- presentation receipt != transaction authority.

---

## 9. Coding consumption / regression minimum

Coding should consume the existing reward, Inventory and Battle Pouch architecture rather than create a parallel Academy-Kakashi reward inventory system.

Minimum regressions:

1. qualifying `kak_origin_item_field_recovery_resupply` grants exactly one `field_recovery_pill` to persistent Inventory;
2. same-source retry/reload/reopen grants no second pill;
3. already owning a pill from another legitimate source does not suppress this +1 grant;
4. pill grant does not auto-use or auto-prepare into Battle Pouch;
5. Battle Pouch full state does not block persistent pill ownership;
6. qualifying `kak_origin_weapon_exceptional_training_tanto` grants exactly one `academy_training_tanto` entitlement/ownership result;
7. same-source retry grants no duplicate weapon result;
8. another legitimate pre-existing `academy_training_tanto` does not trigger Ryō/shard/alternate-weapon compensation;
9. weapon reward does not auto-equip and never resolves to `white_fang_tanto`;
10. failed/unqualified World source creates no ownership;
11. package custody/opponent equipment creates no automatic Inventory ownership;
12. save/load preserves both receipt provenance and resulting persistent ownership;
13. no PL/Stat/Rank/Progression/Skill-access mutation occurs merely from reward ownership;
14. if runtime supports only singleton weapon ownership, prior ownership is reused while the Kakashi entitlement receipt remains idempotently preserved;
15. no UI/presentation refresh can mint either reward.

This contract closes Acquisition semantics only. Runtime implementation and installed-browser/Golden proof remain Coding-owned.
