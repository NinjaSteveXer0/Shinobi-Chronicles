# Shinobi Chronicles — Item Economy, Ingredient Sourcing, Blueprint Provenance and Kakashi Ninken Loot Recovery

**Date:** 2026-09-13  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING SC DESIGN RECOVERY / RECONCILIATION — IMPLEMENTATION PENDING**

## 1. Purpose and archaeology verdict

This document reconciles several older Shinobi Chronicles economy/provenance ideas against current live GitHub authority after Stephen explicitly flagged that they may never have become durable or implemented.

Authority inspected includes:

- `Documentation/Coordination/Achievements Shinobi Record Codex Provenance Weapons and Crafting Alpha Gap Capture 2026-09-11.md`;
- `Documentation/Combat/SC_Combat_Alpha_Crafting_Fuin_Craft_Provenance_Instance_Contract_2026-09-13.md`;
- GitHub #116;
- GitHub #148;
- Shinobi Record UI issue #66;
- current Pakkun Registry authority in `Documentation/Registry/Awaiting Placement Additions - Kage Madara and Pakkun.md`;
- current main/runtime surface at audit time.

### Archaeology result

The following distinction is binding:

- Crafting / Fūin Craft / created-object provenance **mechanics are design-closed and durable** under the Combat contract;
- the corresponding Crafting / provenance runtime and Shinobi Record projection are **not yet implemented/validated**; current #148 explicitly remains an open implementation/UI coordination queue;
- Shinobi Record durable authority requires Achievements, Codex and `Creations / Provenance Weapons`, but the older five-tab UI feasibility issue did not implement those later Codex expansions;
- recipe/blueprint Knowledge exists in Crafting semantics, but there is **no sufficiently explicit durable Shinobi Record Blueprints / Recipes projection** in current authority before this document;
- no durable GitHub authority was recovered for Stephen's older exact `shop-bought kunai vs forged kunai` provenance/development example;
- no durable GitHub authority was recovered for `+5 loot-drop chance per Kakashi Ninja Dog acquired`;
- Pakkun has durable identity/calibration/tracking support authority, but no recovered loot-drop modifier in that Registry contract.

Where prior exact durable authority could not be recovered, the rules below are **new binding recovery authority from Stephen's current explicit direction**. They are not falsely labelled as recovered old commits.

Preserve:

> **design closed != implemented != runtime validated != Golden GREEN**

---

## 2. Ingredient/material dual-source economy

For the ordinary Shinobi Chronicles Crafting economy, every definition classified as an ordinary **ingredient / crafting material** must have at least one legitimate **Ryō purchase route** and at least one legitimate **gameplay acquisition/loot route**.

Canonical rule:

> **Crafting ingredients may be bought if the player can afford them, and may also be earned/looted through gameplay.**

This does **not** mean every vendor stocks every ingredient at all times or from the beginning of the Chronicle.

Exact owner authority may still define:

- which village/vendor/service sells the ingredient;
- public vs restricted supplier access;
- Rank / relationship / Story / discovery / Knowledge gates to a supplier;
- price;
- stock policy where deliberately authored;
- regional availability;
- loot/source tables and eligible encounters;
- guaranteed vs random source semantics.

But once a row is admitted as an ordinary `ingredient/material` in the player Crafting economy, it must not be permanently `loot-only` merely to manufacture grind. A legitimate Ryō route must exist somewhere in the authored economy.

Likewise, ordinary ingredient purchase does not remove gameplay sourcing. Players who prefer to fight, investigate, explore or complete events may acquire the same material through legitimate source tables.

### Purchased vs looted material provenance

A purchased and looted unit may share the same catalogue material definition/mechanics while retaining different acquisition provenance where that history is relevant:

- `purchased` — exact vendor/service + Ryō transaction occurrence;
- `looted` — exact Battle/Event/World/reward occurrence and source context;
- other legitimate acquisition types may remain owner-authored.

Provenance does not automatically change the material's mechanical quality unless an exact item/recipe/effect contract says that source distinction matters.

Preserve:

**same material definition != same acquisition history**  
**different acquisition history != automatic different power**

---

## 3. Broader shop category boundary

SC shops/economy may legitimately contain purchasable rows from broader families such as:

- weapons;
- items / consumables;
- gear / equipment;
- ingredients / materials;
- Characters;
- Summons;
- other exact catalogue/acquisition families.

However this document does **not** declare that every Character, Summon, legendary weapon or special identity is universally purchasable.

Exact Character/Summon obtainability remains Acquisition / Character Systems authority. Exact weapon/item/gear shop admission remains the relevant catalogue/economy authority.

The universal dual-source rule in this document applies specifically to ordinary Crafting **ingredients/materials**.

---

## 4. Loot chance — eligibility before randomness

Loot uses the existing CE/Rewards doctrine:

> **semantic eligibility before randomness.**

A percentage modifier may improve the chance that an already-eligible random drop resolves. It may not make an ineligible item appear from an unrelated encounter.

Canonical sequence:

`committed encounter / event outcome`
→ `authoritative eligible loot set`
→ `applicable exact drop-chance modifiers`
→ `bounded random roll where the source actually uses randomness`
→ `committed reward/acquisition receipt`.

Examples:

- a tracking/support bonus may improve the chance of finding an eligible material from an encounter;
- it cannot cause an enemy with no legitimate ingredient/source relationship to drop an unrelated forbidden item merely because the percentage became high;
- guaranteed rewards remain guaranteed and do not require a loot roll;
- mandatory Story progression objects should use deterministic/bounded protection rather than miserable low-percentage repeat grinding.

Save/load/UI refresh must not reroll an already committed drop result.

---

## 5. Kakashi Ninken / Ninja Dog collection loot bonus

Stephen's current explicit recovery direction is now binding:

> **Each distinct legitimately acquired Kakashi Ninja Dog / Ninken grants +5 percentage points to eligible loot-drop chance.**

Machine-facing semantic intent:

`kakashiNinkenLootBonusPctPoints = 5 × distinctEligibleKakashiNinkenOwned`

Apply this bonus only to random loot/drop checks that explicitly accept the general eligible-loot modifier surface.

### Rules

- bonus is based on **distinct legitimately acquired Ninken identities**, not repeated possession/duplicate presentation of the same dog;
- `+5` means **+5 percentage points** to the applicable eligible drop chance unless the downstream Rewards implementation deliberately names another mathematically equivalent representation;
- final probability is capped at 100%;
- the bonus does not alter semantic eligibility;
- the bonus does not manufacture guaranteed rewards, Story objects or unavailable recipe Knowledge;
- acquiring a dog must be a legitimate Acquisition/Summon ownership event; merely seeing/card-previewing/encountering a Ninken does not grant the bonus;
- the dogs do not need to be actively manifested in the current Battle merely for the collection-level loot modifier to exist, unless a later exact Summon contract deliberately narrows a particular dog's separate personal enhancement;
- each dog's other individual support enhancement(s) remain **OWNER CLOSURE PENDING** where exact older values cannot be recovered. Do not invent them from this +5 rule.

### Pakkun relationship

Current durable Pakkun authority already defines him as a stable Summon with tracking/scouting/support identity and prepared actions including tracking scent and field guide. That authority did not contain the +5 loot rule.

Once Pakkun is legitimately admitted/acquired as one of the relevant Kakashi Ninken, he counts as one distinct dog for the collection rule above. Production admission and Acquisition ownership remain separate prerequisites.

Preserve:

**Pakkun identity != automatic ownership**  
**card/art presence != acquired Ninken**  
**loot modifier != semantic drop eligibility**

---

## 6. Shinobi Record — Blueprints / Recipes projection

The Shinobi Record Codex must gain a dedicated **Blueprints / Recipes** category or subsection.

This extends, rather than replaces, the existing required Codex families:

- Characters;
- Weapons;
- Items;
- Equipment;
- Summons;
- Creations / Provenance Weapons;
- **Blueprints / Recipes**.

### Minimum blueprint/recipe projection

For each legitimately known recipe/blueprint, the Record should be able to project observer-safe fields such as:

- stable recipe/blueprint identity;
- player-facing name;
- branch: `forge | fuin_craft`;
- authorised output definition/archetype where known;
- known material/ingredient requirements;
- known Ryō/service cost where the recipe itself fixes one;
- capability/competence/facility requirements that the current observer legitimately knows;
- source / discovery / learning provenance;
- learned/known status;
- current craftability as a **derived read-only status** from present Knowledge + Access + capability + facility + inputs + cost, never as a second truth ledger;
- meaningful creation/history links where useful.

Unknown recipes must not leak names, hidden ingredients, secret outputs or denominator information unless an exact Codex definition authorises a safe hint.

### Physical blueprint vs learned Knowledge

A physical blueprint/scroll/object and the Character's learned recipe Knowledge are distinct.

Preserve:

**physical blueprint possession != recipe Knowledge automatically**  
**recipe Knowledge != current materials**  
**recipe Knowledge != capability Access**  
**Knowledge != Access != Competence != Mastery**  
**known recipe != craftable now**

An exact read/study/learn operation may commit recipe Knowledge from a physical blueprint when its owning source authorises that transfer. Selling/losing/consuming the physical source later does not erase already committed Knowledge unless an extraordinary exact mechanic explicitly authorises memory loss.

---

## 7. Durable weapons require instance provenance beyond player-created objects

Stephen's bought-vs-forged kunai example exposes an important extension to the existing created-object provenance model:

> **A durable shop-purchased weapon must also be able to retain its own stable instance history if later events/modifications make that exact weapon meaningful.**

The existing Crafting contract already mints stable `createdObjectId` identities for durable crafted objects. Implementation must generalise the durable-instance layer enough that a non-crafted durable weapon can also be individually addressed once it needs persistent provenance.

Exact field naming is implementation/Inventory reconciliation work, but the semantic parent concept is:

`durable weapon definition`
!=
`exact durable weapon instance`.

A shop purchase may therefore produce/reference an exact durable instance with acquisition provenance such as:

- base definition `kunai`;
- origin/acquisition mode `purchased`;
- exact shop/vendor/source;
- exact Ryō purchase occurrence;
- current owner/custody;
- subsequent modification/reforge/Fūin/history refs.

A Forge craft may produce an exact durable instance with provenance such as:

- base/archetype `kunai`;
- origin mode `forged`;
- exact recipe;
- creator/executor;
- materials;
- forge/service host;
- creation occurrence;
- current owner/custody;
- subsequent modification/reforge/Fūin/history refs.

This is a provenance distinction, not two Registry identities for the weapon class.

---

## 8. Bought kunai vs forged kunai — starting mechanical distinction

The older example is now restored as binding design intent:

### Shop-bought kunai

A standard purchased kunai begins with the exact **standard retail/catalogue equipment package** authored for that purchased object route.

### Forged kunai

A kunai personally/legitimately forged through an exact authorised Forge recipe begins with an exact **forged recipe equipment package that is mechanically better than the standard newly purchased retail kunai baseline**.

Exact numbers/effects remain Combat / Items / Weapons balance authority. `better` here must be expressed through explicit weapon/equipment effect packages, never direct hidden Character Base PL mutation.

### History may later reverse the comparison

A newly forged kunai being better at creation does **not** mean every forged kunai forever outranks every bought kunai.

A shop-bought kunai may later become the superior exact object through legitimate authored history such as:

- modification / refinement;
- transformative reforge;
- Fūin attachment;
- exact special repair/alteration;
- exact provenance-sensitive Skill/effect;
- an earned named/history-bearing evolution where separately authorised;
- other explicit object-development mechanics.

Canonical rule:

> **Forged provenance may define a stronger starting object; lived provenance may later make another exact object more developed — but history alone is not a free hidden stat counter.**

Therefore:

**provenance != automatic power**  
**more history entries != automatic more Stats**  
**bought != permanently inferior**  
**forged != permanent best-in-slot**

If a purchased kunai has 'done more shit', the factual history can qualify it for exact later recognition/modification/effects. It does not silently gain power merely because its Chronicle log is longer.

---

## 9. Shinobi Record weapon provenance projection

Shinobi Record must be capable of presenting provenance for meaningful durable weapon instances regardless of whether their origin was:

- purchased;
- forged;
- looted;
- rewarded;
- inherited/transferred;
- otherwise legitimately acquired.

`Creations / Provenance Weapons` remains the dedicated showcase for player-created/customised objects, but ordinary Weapons/Codex inspection must not erase the individual history of a purchased/looted weapon once it has a meaningful stable instance.

Observer-safe weapon history may include:

- original acquisition mode/source;
- creator if forged;
- materials if relevant/known;
- prior owners/custody where legitimately known;
- meaningful Battle/Story occurrences where another owner deliberately records object participation;
- modifications/reforges;
- Fūin attachments;
- supersession lineage;
- current equipment projection.

No provenance row creates mechanical power by presentation.

---

## 10. Implementation status and owner routing

At the time of this recovery:

- Crafting / Fūin Craft mechanics: **DURABLE DESIGN CLOSED**;
- Crafting runtime: **NOT IMPLEMENTED / NOT CLAIMED**;
- durable provenance runtime: **NOT IMPLEMENTED / NOT CLAIMED**;
- Shinobi Record Creations/Provenance projection: **REQUIRED / NOT IMPLEMENTED**;
- Shinobi Record Blueprints/Recipes projection: **NEWLY CLOSED HERE / NOT IMPLEMENTED**;
- ingredient universal Ryō+loot dual sourcing: **NEWLY CLOSED HERE / SOURCE TABLES + UI + RUNTIME PENDING**;
- Kakashi Ninken +5-per-dog eligible loot modifier: **NEWLY CLOSED HERE / exact acquisition set + Rewards/runtime integration pending**;
- bought-vs-forged kunai provenance/mechanical-baseline distinction: **NEWLY CLOSED HERE / exact Combat numbers + Inventory/runtime integration pending**.

Existing GitHub #148 remains the consolidated queued Crafting/Fūin Craft/Provenance implementation coordination lane and should consume this document rather than creating a duplicate Crafting issue.

When that lane is activated, CE should route the minimum exact implementation packages to Coding/UI and any exact Rewards/Acquisition/Summon owner needed for the Ninken modifier/source tables.

Do not interrupt the current higher-priority Origin/onboarding/Golden blockers solely to implement this queue, but do not allow these required Alpha systems to disappear behind the phrase `design closed`.

---

## 11. Non-collapse summary

Preserve:

**shop category != universal obtainability**  
**ingredient buyability != every vendor stocks everything**  
**purchased material != looted material provenance**  
**provenance != free power**  
**loot modifier != loot eligibility**  
**acquired Ninken != encountered Ninken**  
**blueprint object != recipe Knowledge**  
**recipe Knowledge != craftability**  
**weapon definition != exact weapon instance**  
**purchased weapon != provenance-less object**  
**forged weapon != permanent superior object**  
**history != hidden generic stat growth**  
**Shinobi Record projection != mechanics authority**  
**design closed != implemented != browser validated != Golden GREEN**
