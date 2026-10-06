# Shinobi Chronicles — Forge-Created Kunai Durable Benchmark Package

**Date:** 2026-10-07  
**Owner:** Combat / Skills / Items / Weapons  
**Incoming:** #578  
**Parent coordination:** #148 / #449 Step 8  
**Status:** **DESIGN CLOSED — BENCHMARK 3 PRODUCTION PACKAGE / CODING IMPLEMENTATION + RUNTIME VALIDATION SEPARATE**

---

## 1. Purpose

This document closes the smallest exact Combat-owned production recipe required for the third #148 durable-object provenance benchmark:

1. rewarded Academy Training Tantō — already runtime-proven;
2. shop-bought durable Kunai — already runtime-proven;
3. **Forge-created durable Kunai — closed here for implementation.**

This does not reopen benchmark 1 or benchmark 2 and does not author the full Crafting, modification/reforge or Fūin Craft trees.

Binding upstream authority remains:

- `Documentation/Combat/SC_Combat_Alpha_Crafting_Fuin_Craft_Provenance_Instance_Contract_2026-09-13.md`;
- `Documentation/Coordination/Item Economy Ingredient Sourcing Blueprint Provenance and Kakashi Ninken Loot Recovery 2026-09-13.md`;
- `Documentation/Coordination/Durable_Object_Instance_at_Ownership_Commit_and_Provenance_Significance_Gate_2026-09-30.md`;
- `Documentation/Combat/SC_Combat_Standard_Retail_Kunai_Durable_Benchmark_Package_2026-10-06.md`;
- `Documentation/World/Seven Hidden Village Crafting Service Host Allocation 2026-09-13.md`;
- current #517 Alpha shop authority for `weapon_materials`.

Canonical non-collapse:

> **forged provenance != mechanical package**
>
> **recipe definition != recipe Knowledge**
>
> **creation occurrence != ownership until atomic commit**
>
> **definition != exact created instance**

---

## 2. Benchmark decision — create an exact `kunai` instance, do not create a duplicate weapon definition

The benchmark output reuses the existing canonical weapon definition:

`kunai`

Do **not** create `forged_kunai`, `standard_forged_kunai`, `tempered_kunai` or another duplicate weapon definition merely to encode creation provenance.

The created object is:

- object kind: `weapon`;
- base definition: `kunai`;
- rarity projection: **Common**, consuming the current Alpha rarity authority used by benchmark 2;
- output mode: `durable_instance`;
- exact stable created-object/Inventory instance identity;
- creation origin/provenance: Forge craft;
- exact authored mechanical result package supplied by this recipe.

The existing catalogue row `balanced_kunai` remains a separate authored catalogue definition and is **not** activated or substituted as this recipe output. Its existing conservative +1 Effective Bukijutsu magnitude is a useful balance precedent only; this benchmark preserves `kunai` as the base definition so the provenance/instance system proves that two exact Kunai instances can begin with different explicitly authored mechanical packages without inventing a second base definition.

---

## 3. Exact recipe

### Recipe identity

`recipeId = forge_create_precision_balanced_kunai_v1`

Player-facing recipe label:

**Forge Kunai — Precision Balance**

### Recipe schema

```text
recipeId: forge_create_precision_balanced_kunai_v1
branch: forge
operation: create
outputMode: durable_instance
outputDefinitionId: kunai
creationArchetypeId: null
requiredKnowledgeRefs:
  - recipe_knowledge_forge_create_precision_balanced_kunai_v1
requiredCapabilityPredicates:
  - executor_capability_forge_standard_weaponcraft_v1
requiredFacilityTags:
  - forge
materialInputs:
  - definitionId: weapon_materials
    quantity: 1
currencyCostRyo: 25
serviceAllowed: true
commissionedRouteAllowed: true
executorRequirements:
  - executor_capability_forge_standard_weaponcraft_v1
  - knows:recipe_knowledge_forge_create_precision_balanced_kunai_v1
commissionerRequirements:
  - current Forge service access/permission
resultPackageRef: forge_result_precision_balanced_kunai_v1
consumedHostObject: false
supersessionMode: null
```

### Why `weapon_materials`

The benchmark deliberately consumes the existing canonical stackable `weapon_materials` item already admitted to the current bounded Alpha Konoha Basic Item Shop rather than activating additional dormant material definitions solely for a regression fixture.

Current Alpha authority already supplies:

- ID: `weapon_materials`;
- display: **Weapon Materials**;
- stackable Common good;
- current Konoha Basic Item Shop price: **60 Ryō**.

This gives benchmark 3 one legitimate current acquisition route without Combat inventing a new vendor, loot table or material source.

The broader #148 rule that ordinary crafting ingredients should ultimately have both legitimate Ryō and gameplay-acquisition routes remains binding future source-table work. It does **not** block this narrow deterministic Forge resolver benchmark because `weapon_materials` already has an authorised current Alpha acquisition route.

---

## 4. Execution mode — commissioned Forge service for this Alpha benchmark

This benchmark uses the **commissioned craft** route.

Exact World host:

- public parent: `KON-P04` — Konoha Craftsmen's Quarter;
- service host: `KON-A05` — Forge and Equipment Workshop;
- stable semantic alias: `village:konoha:craft_quarter:forge`.

The benchmark does not require the player Character to already possess blacksmith competence.

### Executor

The actual maker is the Forge service executor/provider bound to the legitimate `KON-A05` Forge service context.

The executor must satisfy:

- `executor_capability_forge_standard_weaponcraft_v1`;
- `recipe_knowledge_forge_create_precision_balanced_kunai_v1`.

The benchmark does **not** require Combat to invent a named blacksmith Character or Registry identity. Runtime may use the stable service-provider role/ref supplied by the Forge service context while preserving that the maker/executor is distinct from the commissioner.

### Commissioner

The player/current Character is the commissioner and intended initial owner after successful atomic acquisition commit.

The commissioner must supply/authorise:

- legitimate Forge service access/permission;
- `weapon_materials ×1` from canonical Inventory;
- 25 Ryō service/craft cost;
- deliberate craft intent / stable `craftOperationId`.

The commissioner does **not** gain:

- the executor's Forge capability;
- recipe Knowledge;
- weapon Mastery;
- Bukijutsu proficiency;
- Rank;
- Stats/PL.

Self-crafting this recipe is **not authorised by this benchmark package**. A future self-craft route may reuse the recipe only after the acting Character legitimately satisfies the same exact Knowledge/capability/facility predicates through owning systems.

---

## 5. Exact created-weapon mechanical package

`resultPackageRef = forge_result_precision_balanced_kunai_v1`

A successfully created benchmark Kunai receives exactly this source-owned result package:

```text
while this exact created Kunai is the legitimately equipped weapon
AND durabilityCurrent > 0:
  Effective Bukijutsu +1
  applied before existing weapon-proficiency realisation
```

The base `kunai` capability remains:

- enables exact compatible kunai/Bukijutsu actions where all other action predicates permit;
- no automatic attack/action is created merely by ownership/equip.

The Forge result package grants **nothing else**.

It does not grant:

- direct Attack PL;
- Base Bukijutsu;
- Base/Current/Effective PL directly;
- a generic damage multiplier;
- accuracy/evasion/Speed;
- an extra action;
- a new Skill;
- proficiency or Mastery;
- elemental/Fūinjutsu capability;
- hidden provenance power.

### Stronger-than-retail proof

Fresh standard retail Kunai benchmark:

- Effective Bukijutsu modifier: **0**.

Fresh Forge benchmark Kunai while legitimately equipped and usable:

- Effective Bukijutsu modifier: **+1 before proficiency realisation**.

Therefore:

> **fresh Forge benchmark Kunai > fresh standard retail Kunai mechanically at creation**

through one explicit authored result package, not because the provenance string says `forged`.

A later authorised modification/reforge/Fūin/history-sensitive package may allow the exact retail Kunai to equal or surpass this fresh forged object. This benchmark creates no permanent superiority class.

---

## 6. Durability / condition

Reuse the exact benchmark-2 `kunai` repairable condition package.

Fresh Forge benchmark instance:

```text
durabilityCurrent = 10
durabilityMax = 10
```

Rules:

- UI open/close/equip/unequip/save/load does not reduce durability;
- only exact committed wear resolution may reduce it;
- at 0, the object remains owned and provenance-bearing but cannot satisfy a kunai-required executable action;
- `forge_result_precision_balanced_kunai_v1` is inactive while the object is at 0 durability;
- exact repair restores the **same instance** to 10/10;
- repair does not mint a new object, reset provenance, increase max durability or improve the +1 package;
- no generic durability ladder is created for unrelated Weapons/Equipment.

The Forge benchmark does **not** receive more maximum durability than the retail Kunai. Its starting mechanical superiority is deliberately isolated to the authored +1 Effective Bukijutsu result package.

---

## 7. Cost / economy boundary

Recipe service/craft cost:

**25 Ryō**.

Required material:

**Weapon Materials ×1**.

If the player acquires the input through the current Konoha Basic Item Shop at its present 60 Ryō price, the current all-purchased input + service outlay is 85 Ryō.

This comparison is informational only. Crafting does not derive price from rarity, result power or retail-Kunai price.

The recipe does not sell the output and creates no resale/dynamic-price policy.

---

## 8. Atomic creation + ownership transaction

A deliberate request must possess a stable `craftOperationId` before commit.

Suggested occurrence family:

`forge_create_precision_balanced_kunai::<craftOperationId>`

On valid successful commit, one atomic operation must:

1. consume exactly `weapon_materials ×1`;
2. debit exactly 25 Ryō;
3. mint exactly one stable durable object/Inventory instance with `baseDefinitionId = kunai`;
4. initialise that same object at 10/10 durability;
5. bind `forge_result_precision_balanced_kunai_v1` to that exact created instance;
6. request/commit legitimate ownership/custody to the commissioner through canonical Inventory/Acquisition authority;
7. emit the exact creation/provenance occurrence;
8. preserve the creation lineage on the same stable object identity.

If persistence/ownership commit fails before atomic completion, none of the material/currency/output/provenance effects are considered committed.

Retrying the same already-committed `craftOperationId` must return the original committed result and must not consume another material stack, another 25 Ryō, mint another object or append a duplicate creation occurrence.

No auto-equip occurs.

---

## 9. Required provenance facts

Successful craft must preserve at minimum:

- `recipeId = forge_create_precision_balanced_kunai_v1`;
- exact `craftOperationId`;
- exact creation occurrence ID;
- created exact object/instance ID;
- `baseDefinitionId = kunai`;
- `resultPackageRef = forge_result_precision_balanced_kunai_v1`;
- executor/provider ref used by the legitimate Forge service context;
- commissioner participant ref;
- consumed material definition `weapon_materials` and quantity `1`;
- `serviceHostId = KON-A05` (or stable semantic alias resolved to that same World service);
- created Chronicle/save/history ref;
- ownership/custody ref from canonical Inventory/Acquisition truth;
- fresh durability 10/10;
- subsequent wear/repair/modification/Fūin history only if separately committed later.

Creation provenance is significant history. Routine equip/unequip or ordinary Battle use is not automatically appended as prominent provenance.

---

## 10. Invalid precommit / fail-closed cases

Before commit, the recipe must reject without consuming material, Ryō or history when any required predicate fails, including:

1. unknown/invalid recipe ID;
2. branch/operation mismatch;
3. no legitimate Forge service context or required `forge` facility tag;
4. service access/permission absent;
5. commissioned route missing a valid commissioner;
6. executor/provider does not satisfy `executor_capability_forge_standard_weaponcraft_v1`;
7. executor/provider does not know `recipe_knowledge_forge_create_precision_balanced_kunai_v1`;
8. `weapon_materials` quantity < 1;
9. available Ryō < 25;
10. output cannot be committed through canonical durable Inventory/acquisition transaction;
11. craft request lacks a stable operation identity suitable for idempotent commit.

An already-committed duplicate `craftOperationId` is **not** a fresh failure and must not rerun validation as a new craft. It resolves to the original committed result.

No random success/failure or random quality roll exists.

---

## 11. Explicit non-effects / scope firewall

This recipe does **not**:

- mutate Character Base Stats;
- mutate Rank or Promotion;
- grant Base/Current PL;
- directly add Battle PL capacity;
- grant Bukijutsu proficiency/Mastery;
- auto-equip the weapon;
- create Character ownership/assignment changes beyond the exact Inventory object transaction;
- author Fūin Craft;
- create a seal/attachment;
- author generic reforge/modification trees;
- activate all catalogue materials/weapons;
- create random quality tiers;
- create a generic `+1/+2/+3` upgrade ladder;
- turn provenance count/history length into power;
- make all Forge-created objects stronger by generic rule.

The +1 Effective Bukijutsu package belongs only to this exact authored recipe/result package.

---

## 12. Coding acceptance contract

Coding should prove at minimum:

1. legitimate `KON-A05` Forge context can expose/call this exact recipe without creating a second Forge institution;
2. recipe uses `operation=create`, `outputMode=durable_instance`, `outputDefinitionId=kunai`;
3. one valid commissioned craft consumes exactly `weapon_materials ×1` and 25 Ryō once;
4. one and only one durable `kunai` instance is created;
5. created object has stable instance identity and 10/10 durability;
6. created object preserves exact Forge creation provenance including recipe, executor/provider, commissioner, material, host and occurrence;
7. created object carries `forge_result_precision_balanced_kunai_v1`;
8. while legitimately equipped and >0 durability, exact object projects +1 Effective Bukijutsu before proficiency realisation;
9. equivalent fresh retail Kunai still projects no such modifier;
10. forged provenance string alone cannot produce the +1 package on an unrelated retail instance;
11. purchase/forged instance IDs and provenance remain independent despite same base `kunai` definition;
12. craft does not auto-equip;
13. reopen/save/load preserves same created instance, package, durability and provenance;
14. same committed `craftOperationId` cannot duplicate material consumption, Ryō debit, output or provenance;
15. missing material fails precommit with zero mutation;
16. insufficient Ryō fails precommit with zero mutation;
17. invalid Forge/service/executor context fails precommit with zero mutation;
18. one compatible wear event can reduce 10 -> 9 on the same created object and save/load preserves 9/10;
19. exact repair restores that same instance to 10/10 without resetting creation provenance or improving its result package;
20. existing durable retail Kunai benchmark remains GREEN;
21. existing Academy Training Tantō benchmark remains GREEN;
22. stackable ordinary shop goods/materials remain quantity semantics;
23. no Fūin Craft/reforge/full Crafting UI is smuggled into the benchmark;
24. `browserGoldenClaimed=false` until any required Stephen-facing Forge presentation is actually reviewed.

A deterministic fixture may inject the legitimate Forge service/provider state required to prove the recipe resolver, but the production recipe itself must remain exactly the package above.

---

## 13. Status distinction

- Forge benchmark-3 recipe/mechanics design: **CLOSED**;
- exact durable output package: **CLOSED**;
- World Konoha Forge host: **ALREADY CLOSED**;
- required input has an authorised current Alpha acquisition route: **YES — `weapon_materials` via #517**;
- broader material dual-source gameplay/loot tables: **NOT CLOSED HERE / NOT A BENCHMARK-3 BLOCKER**;
- Coding implementation: **NOT YET PROVEN**;
- runtime/save-load/idempotence validation: **NOT YET PROVEN**;
- Stephen-facing Forge UI review: **NOT YET PROVEN**;
- full Crafting system Golden: **NOT CLAIMED**.

---

## 14. Final lock

> **#148 benchmark 3 uses one commissioned Konoha Forge recipe, `forge_create_precision_balanced_kunai_v1`, consuming `weapon_materials ×1` plus 25 Ryō to create one exact durable `kunai` instance at 10/10 durability. The output remains the canonical `kunai` definition but carries the explicit recipe-owned `forge_result_precision_balanced_kunai_v1` package: +1 Effective Bukijutsu before proficiency realisation while the exact weapon is legitimately equipped and usable. This makes the fresh forged benchmark object mechanically stronger than a fresh standard retail Kunai without treating provenance itself as power, without creating a duplicate weapon definition, and without authoring Fūin Craft or a generic upgrade ladder.**
