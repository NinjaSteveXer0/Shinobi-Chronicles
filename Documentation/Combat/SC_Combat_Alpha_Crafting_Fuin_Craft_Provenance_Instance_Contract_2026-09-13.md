# Shinobi Chronicles — Alpha Crafting, Fūin Craft and Provenance Instance Contract

**Date:** 2026-09-13  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING ALPHA MECHANICS CONTRACT — IMPLEMENTATION / UI / WORLD HOSTING / GOLDEN SEPARATE**

## 1. Purpose

This contract closes the Combat-owned mechanics gap captured by GitHub issue #116.

It defines one coherent Alpha package covering:

1. ordinary **Crafting** with the player-facing physical branch **Forge**;
2. distinct **Fūin Craft** for seal creation and seal attachment;
3. provenance-bearing durable created/customised object instances suitable for Combat, Inventory, CE history and Shinobi Record/Codex projection.

This contract consumes and preserves:

- `Documentation/Coordination/Achievements Shinobi Record Codex Provenance Weapons and Crafting Alpha Gap Capture 2026-09-11.md`;
- `Documentation/Combat/Alpha_Item_Weapon_Gear_Catalogue_v1_Wave1_001-048.md`;
- `Documentation/Combat/Alpha_Item_Weapon_Gear_Catalogue_v1_Wave2_049-096.md`;
- `Documentation/Combat/Alpha_Content_Source_Binding_Boundary_2026-09-10.md`;
- World issue #56 service-host separation;
- current Item/Weapon/Gear rarity, equipment, proficiency, Effective-State and provenance doctrine.

Canonical boundary:

> **World hosts the service. Combat owns what the craft action means. Inventory/Acquisition owns actual possession. Progression owns learned/developed access. Coding owns runtime/persistence. UI presents committed truth.**

---

## 2. Final player-facing terminology

The final Alpha terminology is:

- **Crafting** — umbrella system;
- **Forge** — ordinary physical crafting/modification branch for items, weapons, gear and materials;
- **Fūin Craft** — distinct Fūinjutsu seal creation/attachment branch.

`Fūin Craft` is hereby **ratified** as the player-facing term for Alpha.

A Forge and a Fūin Craft service may share one physical compound only when World explicitly authors that host arrangement. Shared geography does not collapse mechanics.

Preserve:

**Crafting != Forge only**  
**Forge != Fūin Craft**  
**service host != service permission**  
**service permission != craft success**

---

## 3. Alpha craftable object categories

A catalogue row is craftable only when an exact recipe definition authorises it.

`catalogue_only` does **not** mean craftable.

### 3.1 Forge-supported output categories

Alpha Forge may create or modify exact authored outputs in these existing catalogue families:

- `consumable`;
- `weapon`;
- `weapon_tool` / durable weapon-adjacent tool where separately authored;
- `gear`;
- `material` only when a specific refinement recipe exists.

Alpha Forge does not generically craft:

- Characters;
- Summons;
- Skills;
- Bloodlines;
- Hosted Entities;
- Rank/Promotion;
- arbitrary Story/world objects;
- collectible representations/cards.

Legendary rarity does not imply craftability. A legendary definition requires an exact recipe/source if Crafting can produce it.

### 3.2 Fūin Craft-supported outputs

Fūin Craft may produce:

- a durable standalone `seal_instance` from an exact seal definition/recipe;
- an attachment relationship between one valid `seal_instance` and one valid durable host object.

Fūin Craft does not generically place seals on living bodies, Hosted Entities, Summons, locations or Story objects. Those require separate exact Skill/Story/Kinjutsu/Fūinjutsu authority.

---

## 4. Recipe authority

Crafting is recipe-driven.

A recipe is mechanics authority for one exact craft operation family. It must declare enough data to resolve without inference.

Minimum recipe fields:

```text
recipeId
branch: forge | fuin_craft
operation: create | refine | modify | reforge | repair | create_seal | attach_seal | detach_seal
outputMode: catalogue_stack | durable_instance | custom_creation | attachment_only
outputDefinitionId?          # existing catalogue/seal definition when applicable
creationArchetypeId?         # required if custom_creation has no catalogue base
requiredKnowledgeRefs[]
requiredCapabilityPredicates[]
requiredFacilityTags[]
materialInputs[]             # exact definitionId + quantity
currencyCostRyo?             # optional exact recipe/service cost
serviceAllowed: true | false
commissionedRouteAllowed: true | false
executorRequirements[]       # capability/competence predicates for actual maker
commissionerRequirements[]   # if any
resultPackageRef?            # exact modifier/effect package for modifications/attachments
consumedHostObject?          # explicit only
supersessionMode?            # in_place | new_instance_supersedes_old
```

A recipe definition does not itself grant Knowledge, materials, Ryō, service access, Skill access or ownership.

Preserve:

**recipe existence != recipe Knowledge**  
**recipe Knowledge != capability Access**  
**Knowledge != Access != Competence != Mastery**

---

## 5. Knowledge, capability and service execution

Alpha supports two legitimate execution modes.

### 5.1 Self craft

For a self craft, the acting Character is the `executorParticipantId` and must satisfy:

- required recipe/blueprint Knowledge;
- exact capability predicates;
- exact competence predicates;
- required facility/tool tags where any;
- required inputs and cost.

Crafting does not infer competence from displayed Stats alone unless the recipe explicitly names a Stat threshold/predicate owned by current authority.

### 5.2 Commissioned craft

A recipe may permit a commissioned service route.

Then:

- the service craftsperson/provider is the `executorParticipantId`;
- the player/current Character is normally the `commissionerParticipantId`;
- the service executor must satisfy maker Knowledge/capability/competence;
- the commissioner must satisfy service permission plus exact recipe requirements that are explicitly commissioner-owned;
- required materials/Ryō come from the exact authorised payer/source;
- the created result may be granted to the commissioner/current owner by the Inventory transaction.

Commissioning does **not** grant the commissioner the executor's Skill, Fūinjutsu competence, recipe Knowledge or Mastery.

This preserves meaningful specialist services without requiring every Character to personally become a blacksmith or seal master.

---

## 6. Deterministic Alpha resolution

Alpha Crafting has **no random success/failure or random quality roll**.

Resolution is:

1. validate exact operation, recipe, executor, commissioner, target/host and service context;
2. validate Knowledge/capability/competence/facility predicates;
3. validate exact material quantities and Ryō cost;
4. validate target compatibility and stacking/supersession rules;
5. if any precommit validation fails: return bounded failure reason, consume nothing, spend no Ryō and commit no craft occurrence;
6. if all predicates pass: commit one atomic deterministic craft transaction.

The exact authored recipe determines the result.

There is no save-scumming for quality tiers in Alpha because the craft itself does not roll quality.

`service permission != automatic success` remains true because recipe predicates, inputs, target compatibility and executor requirements still must pass.

---

## 7. Atomic transaction and idempotence

Every deliberate Crafting/Fūin Craft attempt must have a stable `craftOperationId` before commit.

On successful commit, one atomic transaction performs all applicable state changes together:

- consume exact material inputs;
- spend exact Ryō cost;
- consume/supersede an old host object only when recipe authority explicitly says so;
- create output quantity or durable instance;
- create/update seal attachment relationship where applicable;
- request legitimate ownership/custody projection from Inventory/Acquisition authority;
- emit exact craft/provenance occurrence;
- append modification/provenance lineage.

If persistence fails before commit, none of those effects are considered committed.

Retrying the same committed `craftOperationId` after save/load must return the original committed result, not consume inputs or create a second object.

UI open/close/refresh cannot rerun a craft operation.

---

## 8. Catalogue stack output vs durable provenance instance

Crafting has two fundamentally different output models.

### 8.1 Fungible catalogue stack

Use `outputMode = catalogue_stack` for fungible quantities such as ordinary consumables or refined materials.

Result:

- references one existing catalogue `definitionId`;
- increments committed owned quantity through Inventory authority;
- records the crafting occurrence/batch provenance where useful;
- does **not** mint a unique object identity for every pill, herb bundle or ingot.

A stack can have acquisition/crafting history without each unit becoming a named provenance weapon.

### 8.2 Durable created instance

Use `outputMode = durable_instance` for a durable weapon, gear piece, tool or comparable created object.

A successful craft mints one stable created-object identity distinct from the catalogue definition.

Canonical rule:

> **Catalogue definition says what kind of thing it is. Created-object identity says which exact thing this is.**

Two crafted `iron_tanto` instances may share one catalogue effect definition while retaining different creator/material/service/modification/Fūin/history provenance.

### 8.3 Custom creation

`outputMode = custom_creation` is permitted only when an exact recipe supplies a `creationArchetypeId` or other authored mechanical shell.

The player may not invent arbitrary mechanics by typing a custom name.

Custom naming is presentation; the exact recipe/effect package remains mechanical authority.

---

## 9. Durable created-object schema

Combat/Crafting requires the following machine-addressable created-object projection.

```text
createdObjectId                    # stable unique object identity
objectKind                         # weapon | gear | weapon_tool | other authorised durable creation
baseDefinitionId?                  # existing catalogue definition where applicable
creationArchetypeId?               # if no catalogue base
currentDisplayName                 # mutable presentation only
status                             # active | retired | destroyed | consumed
creatorParticipantId?              # actual maker/executor if a Character/entity
commissionerParticipantId?         # commissioning participant when relevant
creationOccurrenceId               # exact committed craft occurrence
recipeId                           # creating recipe
materialProvenance[]               # consumed material definition/instance refs + quantities
serviceHostId?                     # World-owned host ref
serviceProviderId?                 # exact executor/provider ref where known
createdChronicleRef                # Chronicle/save/history context
modificationHistory[]              # ordered immutable refs
fuinAttachmentHistory[]            # ordered immutable refs
currentFuinAttachmentIds[]         # live exact relationships
supersedesObjectId?                # for transformative reforge lineage
supersededByObjectId?               # historical reverse ref
ownershipRef                       # Inventory/Acquisition-owned truth ref
custodyRef                         # Inventory/Acquisition-owned current custody ref
currentEquipmentProjectionRef?     # Combat/equipment projection, not ownership truth
provenanceEvidenceRefs[]           # exact committed occurrences/evidence, never free power
```

Ownership/custody values are **references to the owning Inventory/Acquisition truth**, not a second mutable ownership ledger inside Crafting.

Likewise service-host identity is World-owned and Chronicle occurrence identity is CE/history-owned.

---

## 10. Provenance semantics

Provenance is mandatory history for durable created/customised instances but is not itself a universal stat engine.

Potential exact provenance facts may include:

- who created the object;
- who commissioned it;
- which exact recipe created it;
- which materials/components were consumed;
- which forge/service/location hosted the work;
- which seal was attached/removed;
- which modification/reforge occurred;
- which object superseded which prior object;
- meaningful wielder/object history if another owning system later commits it;
- exact named historical occurrences.

Preserve:

**provenance != free power**  
**older != automatically stronger**  
**famous != automatically stronger**  
**more history entries != more Stats**  
**creator identity != automatic compatibility**  
**crafted != equipped**  
**equipped != mastered**

A Skill, weapon effect, legendary synergy, Fūin package or other exact system may query a provenance predicate only when that effect explicitly authors the predicate and payoff.

No generic `provenance score` or hidden accumulating percentage is authorised by this contract.

---

## 11. Modification, upgrade, reforge and repair

### 11.1 Modification / upgrade

There is no generic free-form `+1 / +2 / +3` upgrade ladder in Alpha.

A modification must reference an exact recipe and exact `resultPackageRef` or target definition.

Two legal patterns:

- **in-place modification** — same `createdObjectId`; append an immutable modification occurrence and apply the exact source-owned package;
- **transformative reforge** — mint a new `createdObjectId`, preserve `supersedesObjectId`, retire/consume the prior instance exactly as the recipe declares.

Modification never mutates Base Character Stats. Equipment effects continue to project into Effective state under current equipment doctrine.

### 11.2 Repair

This contract does **not** create a generic weapon durability system.

A repair action is valid only if an object has an exact repairable damage/condition state authored by its owning mechanic.

Repair may clear/alter that exact repairable state and append repair provenance.

Repair does not increase power, reroll quality or create hidden durability where none exists.

### 11.3 Rename

Changing `currentDisplayName` is presentation-only.

Rename:

- does not mint a new object;
- does not reroll effects;
- does not reset provenance;
- does not change rarity;
- does not grant compatibility or Mastery.

---

## 12. Fūin Craft contract

### 12.1 Seal creation and seal attachment are separate operations

`create_seal` creates a standalone durable `seal_instance`.

`attach_seal` consumes/references one existing compatible `seal_instance` and creates a live attachment relationship to one exact host object.

Creating a seal does not attach it.

Attaching a seal does not teach the attached effect as a Skill.

### 12.2 Fūinjutsu prerequisites

A self-authored Fūin Craft recipe may require exact predicates such as:

- Knowledge of the exact seal definition/recipe;
- Fūinjutsu Access;
- minimum authored Competence/development predicate;
- exact Skill/capability access if the seal definition depends on one;
- materials such as `seal_ink`, `chakra_paper`, `ancient_seal_lacquer` or other exact recipe inputs;
- facility/service requirements.

A commissioned Fūin Craft route may allow the service executor to satisfy maker competence while the commissioner supplies service permission/cost/materials as authored.

Possessing `seal_ink` never grants seal Knowledge or Fūinjutsu Access.

### 12.3 Valid Alpha host objects

Generic Alpha Fūin attachment is valid only for durable object instances explicitly marked/derived as compatible hosts in these families:

- weapons;
- weapon tools;
- gear;
- other durable Crafting-created objects whose definition/archetype explicitly declares `sealHostEligible`.

No generic Character-body seal attachment is authorised here.

### 12.4 Attachment capacity

Alpha default:

> **one live Fūin attachment relationship per durable host object.**

A future exact object/legendary authority may author more than one slot, but multiple slots are not inferred from rarity, art or item size.

### 12.5 Attachment effect ownership

The seal definition/result package owns the exact mechanical effect.

Possible exact effects may include:

- Effective Stat modifier;
- resolver-only rider;
- exact contextual capability;
- equipment-gated action/Skill access;
- resistance/guard interaction;
- other authored Combat/Skill effect.

Fūin Craft itself does not invent the effect.

Any Stat modifier affects Effective state unless separate authority explicitly says otherwise. Attachment never mutates Base Stats/PL.

Equipment-gated access is not learned Skill ownership.

### 12.6 Attach / detach / supersede

Attaching requires:

- compatible host;
- empty attachment capacity OR explicit replacement/supersession operation;
- valid seal instance;
- exact prerequisites and costs.

On attach, the standalone seal becomes part of the attachment relationship and cannot simultaneously exist as a second usable inventory seal.

Detachment rules are definition-owned:

- `recoverable` — exact authority may return the seal instance to standalone custody;
- `consumed_on_detach` — attachment ends and seal is retired/consumed;
- `locked` — normal detach invalid; requires exact removal/supersession authority.

If a seal definition does not author a recovery exception, Alpha default is **consumed on successful detach/replacement**.

This avoids duplication exploits and keeps removal meaningful.

### 12.7 Fūin provenance

Each attach/detach/supersede event records:

- seal instance;
- host created-object instance;
- executor/provider;
- commissioner/owner context where applicable;
- service host;
- exact occurrence;
- prior attachment if superseded;
- resulting live attachment state.

The object's creation history remains intact when its seal changes.

---

## 13. Crafting history / occurrence families

The runtime may use canonical-equivalent IDs, but must preserve these semantic occurrence families:

- `craft_created_stack`;
- `craft_created_object`;
- `craft_modified_object`;
- `craft_reforged_object`;
- `craft_repaired_object`;
- `fuin_created_seal`;
- `fuin_attached_seal`;
- `fuin_detached_seal`;
- `fuin_superseded_attachment`.

Each successful durable-object occurrence must carry stable references sufficient to reconstruct provenance without scraping UI text.

A failed precommit attempt creates no factual Crafting occurrence.

These occurrences may later be consumed by:

- Shinobi Record / Codex;
- Achievements;
- Story/World opportunity predicates;
- Skills/provenance synergies;
- observer Knowledge where legitimately exposed;
- analytics/Golden validation.

Crafting does not itself award an Achievement, create a World event or grant Progression merely because an occurrence exists.

---

## 14. Inventory / ownership / custody boundary

A successful craft requests one exact ownership transaction from the owning Inventory/Acquisition system.

For ordinary player craft/commission:

- created stack quantity becomes owned inventory quantity;
- durable created object becomes one owned object instance;
- seal instance becomes owned when created unless the exact commissioned route says it is immediately attached as part of the same atomic transaction.

Preserve:

**craft result != ownership until ownership transaction commits**  
**ownership != equipped**  
**equipped != deployed**  
**custody != ownership automatically**

Crafting cannot silently delete an owned object except through an exact recipe operation that explicitly consumes/supersedes it and commits that transaction atomically.

---

## 15. Current catalogue interaction

The existing 96-row Item/Weapon/Gear/Material catalogue remains definition authority.

This contract does not automatically activate or craft-enable any `catalogue_only` row.

Current materials already deliberately include Crafting/Fūinjutsu inputs such as:

- `seal_ink`;
- `iron_ingot`;
- `treated_wire`;
- `medicinal_herb_bundle`;
- `antidote_base`;
- `cooling_resin`;
- `explosive_powder`;
- `tempered_steel`;
- `chakra_steel`;
- `silk_wire_coil`;
- `rare_medicinal_extract`;
- `chakra_crystal`;
- `meteor_iron`;
- `sagewood_heartwood`;
- `ancient_seal_lacquer`.

Those catalogue semantics remain inputs only until exact recipe/source authority binds them.

No material gains direct Combat power merely by being carried.

---

## 16. Competitive / provenance interaction boundary

This contract is compatible with the current whole-build competitive audit doctrine.

If an exact provenance-bearing weapon, modification or Fūin attachment has Combat significance, competitive audit must evaluate the actual assembled instance rather than only its base catalogue definition.

However:

- provenance count is not a multiplier;
- craft rarity is not automatic superiority;
- Fūin attachment cannot duplicate the same source-owned effect through several labels unless exact stacking authority permits it;
- replacement/supersession cannot leave ghost modifiers active;
- unequip/remove/destroy must remove only source-owned current effects while preserving committed history.

---

## 17. UI / Codex projection requirements

UI is presentation only, but must be able to project at least:

- base definition/archetype;
- current custom/display name;
- creator/commissioner where observer-safe;
- creation occurrence/history;
- materials/provenance where observer-safe;
- service/forge provenance where observer-safe;
- current modification lineage;
- current/live Fūin attachment;
- ownership/custody/equipped state from owning systems;
- supersession/retired/destroyed status where relevant.

The Shinobi Record **Creations / Provenance Weapons** surface must project actual committed instances; it must not manufacture one catalogue entry per custom name.

Hidden provenance/identity facts remain subject to observer Knowledge authority.

---

## 18. Required runtime validation

Coding implementation is not considered complete until diagnostics/regression prove at minimum:

1. invalid precommit consumes no materials/Ryō and commits no history;
2. successful craft consumes exact inputs once;
3. same `craftOperationId` is idempotent across reload/retry;
4. catalogue-stack output increments exact quantity once;
5. durable output mints one stable createdObjectId;
6. two objects from same base definition remain separate instances;
7. custom rename does not alter effects/provenance;
8. commissioned craft records executor separately from commissioner;
9. commissioned craft does not grant maker competence to commissioner;
10. modification in-place preserves object identity;
11. transformative reforge preserves supersession lineage;
12. repair cannot create generic durability/power;
13. Fūin create != attach;
14. host compatibility is validated;
15. one-slot Alpha default is enforced;
16. attach does not duplicate standalone seal inventory;
17. detach/replacement follows recoverable/consumed/locked semantics;
18. seal effects cleanly enter/leave Effective/runtime projection;
19. Base Stats/PL remain unchanged by ordinary equipment/Fūin projection;
20. save/load preserves provenance/order/current attachment exactly;
21. destroyed/retired/superseded objects cannot remain equipped through stale projection;
22. UI refresh cannot reroll/duplicate craft results.

Runtime GREEN is separate from this mechanics closure.

---

## 19. Ownership / downstream boundaries

### Combat / Skills / Items / Weapons
Owns:

- recipe mechanics schema;
- craft operation semantics;
- exact Item/Weapon/Gear/Seal effects;
- created-object/provenance instance semantics;
- Fūin attachment mechanics;
- Combat projection/effect cleanup;
- Crafting regression contract.

### Progression / Development
Owns:

- learned recipe/Skill/development Access;
- competence/development predicates where persistent;
- progression consequences/evidence.

### World / Missions / Events / Rewards
Owns:

- service-host geography/access opportunities;
- material/recipe reward opportunities;
- factual world sources;
- economy/reward placement where applicable.

### Acquisition / Inventory
Owns:

- ownership/custody/quantity transactions;
- inventory persistence semantics.

### CE / Codex / Coordination
Owns:

- reusable provenance/Knowledge reconciliation where needed;
- cross-system collisions;
- Shinobi Record coordination semantics.

### UI / Assets
Owns:

- Crafting/Forge/Fūin Craft presentation;
- Creations / Provenance Weapons projection presentation.

### Coding
Owns:

- atomic transaction implementation;
- IDs/persistence/save-load;
- integration with Inventory/World/Progression/UI;
- diagnostics/regression/Golden.

---

## 20. What this contract does NOT do

It does not:

- create every Alpha recipe row;
- decide World service-host placement;
- decide exact material drop/reward sources;
- decide exact Ryō economy values globally;
- grant any catalogue row to the player;
- activate all catalogue-only content;
- create a generic durability system;
- create random quality tiers;
- create a generic provenance-power score;
- invent Fūinjutsu Skills;
- grant Skill/recipe Knowledge automatically;
- implement runtime/UI;
- claim Golden/regression GREEN.

---

## Final lock

> **Alpha Crafting is deterministic and recipe-driven. `Crafting` is the umbrella, `Forge` is ordinary physical creation/modification, and `Fūin Craft` is the distinct sealing branch. Fungible outputs remain catalogue quantities; durable player-created/customised outputs become stable provenance-bearing object instances. Provenance records real causal history but grants no generic power. Fūin seals are separately created and attached, use one live host slot by default in Alpha, and project only exact authored effects. All successful operations are atomic and idempotent; failed precommit attempts consume nothing and create no false history.**
