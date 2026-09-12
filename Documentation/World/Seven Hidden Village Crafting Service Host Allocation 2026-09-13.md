# Shinobi Chronicles — Seven Hidden Village Crafting Service Host Allocation

**Date:** 2026-09-13  
**Owner:** World / Missions / Events / Rewards  
**Source:** GitHub #56  
**Status:** **BINDING WORLD SERVICE-HOST AUTHORITY — FORGE / FŪIN CRAFT HOSTS CLOSED; MECHANICS / NON-KONOHA PIXEL CALIBRATION / RUNTIME SEPARATE**

---

## 1. Purpose

This contract assigns stable physical/service hosting for the two Alpha Crafting branches across all seven production Hidden Villages:

1. **Forge** — ordinary physical Crafting/modification service;
2. **Fūin Craft** — separate seal creation/attachment service.

It consumes the mechanics closure:

`Documentation/Combat/SC_Combat_Alpha_Crafting_Fuin_Craft_Provenance_Instance_Contract_2026-09-13.md`

commit `a43b7675a332c1cdb5af4762529d34ea8811a51e`.

That mechanics authority closes:

- `Crafting` = umbrella;
- `Forge` = physical crafting/modification branch;
- `Fūin Craft` = separate Fūinjutsu seal creation/attachment branch;
- recipe, executor, commissioner, material, cost, output, attachment and provenance semantics remain Combat/Items authority.

World closes only:

- where the services physically live;
- local service identity;
- public/service access class;
- route/location relationship;
- whether services share geography without collapsing semantics;
- whether current art needs revision.

Preserve:

> **World hosts the service. Combat owns what the craft action means.**

---

## 2. Canon Research First boundary

The current production villages are canon-derived institutions, but canon does not supply a universal named blacksmith/sealing workshop for every village.

Accordingly:

- village identity and broad institutional setting remain canon anchored;
- the exact service-host names below are deliberate **Shinobi Chronicles functional geography** unless a separate durable source says otherwise;
- no generic smith/sealer is elevated into canon merely because a service needs a host;
- no village is forced to copy Konoha's architecture.

The Research First baseline already consumed for the seven-village institutional allocation confirms the major Hidden Villages and Hidden Rain as distinct village societies; this contract does not require a new canon claim beyond that institutional premise.

---

## 3. Stable semantic address grammar

For non-Konoha villages, use stable service addresses:

```text
village:<village>:craft_quarter
village:<village>:craft_quarter:forge
village:<village>:fuin_workshop
```

A village may physically place `fuin_workshop` inside the same craft district/compound as `forge`, but the actionable service identities remain separate.

Where a later village hotspot calibration defines local `P/A/O/...` IDs, those IDs may alias these stable semantic refs without changing service meaning.

---

## 4. Universal Forge host rule

Default Forge service host is a known village craft/workshop district or compound.

World access class:

`PUBLIC_SERVICE_CONDITIONAL`

Meaning:

- the location/service can be publicly discoverable where ordinary village access allows;
- a Character may be allowed to request/commission authorised work;
- self-crafting remains subject to exact recipe, Knowledge, executor capability, materials, cost and facility requirements;
- public service visibility does not imply ownership of tools, recipes, materials or outputs;
- opening the Forge surface commits nothing.

World does **not** impose a universal Rank gate on Forge access.

An exact recipe/provider/institution may impose narrower conditions through owning mechanics/content authority.

---

## 5. Universal Fūin Craft host rule

Default Fūin Craft host is a specialist sealing workshop/annex/quiet craft institution separate in service semantics from the Forge.

World access class:

`PUBLIC_SPECIALIST_SERVICE_CONDITIONAL`

Meaning:

- the location may be publicly known where ordinary village access allows;
- commissioned seal work may be requested only where the exact recipe/service permits;
- self-authored Fūin Craft still requires exact Fūinjutsu/recipe/competence/material/facility predicates from the Combat contract;
- public workshop access does not teach Fūinjutsu;
- knowledge of the workshop does not grant seal Knowledge;
- service permission does not guarantee craft success;
- creating a seal and attaching a seal remain separate operations.

World does **not** impose a universal Rank gate or mentor gate on the host itself.

Exact restricted recipes, dangerous Kinjutsu-linked seal work, body seals, Story objects or classified services require separate authority and are not made public by this host.

---

# PART II — VILLAGE ALLOCATION

## 6. Konohagakure

Production master:

`Backgrounds/konoha.png`

Current Konoha v3 authority already closes the exact physical service hosts.

### Forge

- public parent: `KON-P04` — Konoha Craftsmen's Quarter;
- internal service host: `KON-A05` — Forge and Equipment Workshop;
- stable semantic alias: `village:konoha:craft_quarter:forge`.

### Fūin Craft

- public parent: `KON-P05` — Public Fūinjutsu Sealing Workshop;
- internal service host: `KON-A06` — Fūin Craft and Seal Attachment;
- stable semantic alias: `village:konoha:fuin_workshop`.

Legacy regional compatibility:

- `fire:SV02` Tenten's Forge and Equipment Workshop may resolve/route toward the current Konoha Forge service context where compatibility is still required;
- `fire:SV03` Konoha Fūinjutsu Guidance and Service may resolve/route toward the current Konoha Fūin Craft service context.

The legacy regional reservation is not a second physical Forge/Fūin system.

Konoha intentionally keeps Forge and Fūin Craft at distinct top-level public village hosts.

Art revision: **NONE**.

---

## 7. Sunagakure

Production master:

`Backgrounds/suna.png`

### Forge

- parent: `village:suna:craft_quarter`;
- service: `village:suna:craft_quarter:forge`;
- interpretation: ordinary Sunagakure artisans/equipment workshop area within existing village geography.

### Fūin Craft

- service: `village:suna:fuin_workshop`;
- physical relation: may occupy a quieter specialist annex within/adjacent to the same craft quarter, but remains a distinct service/action route.

No generic puppet/crafting expertise, seal mastery or Sand-specific technique is inferred merely from entering the district.

Art revision: **NONE REQUESTED**; exact pixel anchors deferred to village calibration.

---

## 8. Iwagakure

Production master:

`Backgrounds/iwa.png`

### Forge

- parent: `village:iwa:craft_quarter`;
- service: `village:iwa:craft_quarter:forge`;
- interpretation: ordinary equipment/metal/stone-working workshop district within current village geography.

### Fūin Craft

- service: `village:iwa:fuin_workshop`;
- physical relation: specialist sealing annex/atelier may share the wider craft district while remaining independently actionable.

Rock/earth craftsmanship aesthetics do not manufacture Earth-style Skill mechanics or material bonuses.

Art revision: **NONE REQUESTED**.

---

## 9. Kirigakure

Production master:

`Backgrounds/kiri.png`

### Forge

- parent: `village:kiri:craft_quarter`;
- service: `village:kiri:craft_quarter:forge`;
- interpretation: ordinary weapon/equipment workshop hosted in existing inhabited/industrial village geography.

### Fūin Craft

- service: `village:kiri:fuin_workshop`;
- physical relation: specialist seal workshop may share a service quarter but does not collapse into the Forge.

Historical associations with particular Mist swords/weapons do not grant access, ownership, recipe Knowledge or proficiency through service location alone.

Art revision: **NONE REQUESTED**.

---

## 10. Kumogakure

Production master:

`Backgrounds/kumo.png`

### Forge

- parent: `village:kumo:craft_quarter`;
- service: `village:kumo:craft_quarter:forge`;
- interpretation: stable village equipment/weapon workshop in ordinary accessible institutional/commercial geography.

### Fūin Craft

- service: `village:kumo:fuin_workshop`;
- physical relation: specialist sealing service annex may be adjacent to the craft quarter or another public institutional strip when exact pixel calibration chooses the best host.

No Lightning-style effect or specialised weapon property is inferred from village identity.

Art revision: **NONE REQUESTED**.

---

## 11. Amegakure

Production master:

`Backgrounds/ame.png`

### Forge

- parent: `village:ame:craft_quarter`;
- service: `village:ame:craft_quarter:forge`;
- interpretation: enclosed/covered ordinary equipment workshop/service area appropriate to current SC village geography.

### Fūin Craft

- service: `village:ame:fuin_workshop`;
- physical relation: specialist seal workshop/annex may share a secure service structure but remains a separate action/service identity.

Amegakure's canon history of surveillance/security does not make every ordinary craft service classified. Exact current SC Recorded History/access state controls any additional restrictions.

Art revision: **NONE REQUESTED**.

---

## 12. Kusagakure

Production master:

`Backgrounds/kusa.png`

### Forge

- parent: `village:kusa:craft_quarter`;
- service: `village:kusa:craft_quarter:forge`;
- interpretation: ordinary market/crafts workshop host within existing village geography.

### Fūin Craft

- service: `village:kusa:fuin_workshop`;
- physical relation: specialist workshop/quiet annex may share the craft quarter where later pixel calibration makes that efficient.

Vegetation/herbal geography does not automatically imply crafting materials, recipe Knowledge or medical/sealing proficiency.

Art revision: **NONE REQUESTED**.

---

## 13. Shared-compound rule

Suna, Iwa, Kiri, Kumo, Ame and Kusa are authorised to use a **shared physical craft district/compound** for both branches when later village calibration finds that most natural.

If shared physically:

```text
one parent geography
├─ Forge service action
└─ Fūin Craft service action
```

Do not merge into:

`generic Craft Shop` with one undifferentiated action.

The two services retain:

- separate route/action IDs;
- separate recipe branches;
- separate executor/provider capability requirements;
- separate material/effect semantics;
- separate legal failure reasons;
- separate provenance where committed.

---

## 14. Knowledge / discovery rule

Ordinary village inhabitants/authorised visitors may learn public service locations through normal village Knowledge.

The host itself does not need an active craft opportunity to remain known.

Before legitimate location Knowledge:

- no hidden marker/hitbox/DOM/accessibility leak;
- opening a Crafting UI from another route must not silently reveal undiscovered geography.

A known service may appear in village service navigation without displaying recipes the observer does not know or actions they cannot legitimately attempt.

---

## 15. Access / actionability rule

World separates:

1. **location access** — can the Character physically/usefully reach the service host?;
2. **service permission** — may they request/use the branch at all?;
3. **recipe Knowledge**;
4. **executor/commissioner capability**;
5. **materials / Ryō / compatible target**;
6. **craft success/commit**.

Therefore:

> **known Forge != can craft everything**
>
> **known Fūin workshop != knows Fūinjutsu**
>
> **service permission != recipe eligibility != success**

World-facing UI should avoid leaking hidden recipes or exact missing capability recipes unless Combat/Progression/UI authority deliberately exposes that information.

---

## 16. Current art disposition

Current production village masters exist on `main` for all seven villages:

- `Backgrounds/konoha.png`
- `Backgrounds/suna.png`
- `Backgrounds/iwa.png`
- `Backgrounds/kiri.png`
- `Backgrounds/kumo.png`
- `Backgrounds/ame.png`
- `Backgrounds/kusa.png`

This contract intentionally treats Forge/Fūin hosts as semantic service geography that may occupy existing workshop/market/institutional areas without requiring baked signage or a unique new building.

Current World disposition:

> **NO UI/ASSETS REVISION REQUESTED BY #56.**

Only later exact village pixel calibration may prove a specific visual master lacks any believable host. If that occurs, route one narrow art revision with evidence rather than regenerating all village maps pre-emptively.

---

## 17. Craft occurrence / provenance host projection

When Combat/Coding commits a successful craft operation, World authorises the exact service host semantic ref to be attached as provenance where the operation occurred there.

Examples:

- `serviceHostId = village:suna:craft_quarter:forge`
- `serviceHostId = village:kiri:fuin_workshop`
- `serviceHostId = KON-A05`

The World host is provenance/context only. It does not become an ownership ledger or craft resolver.

---

## 18. Runtime routing boundary

Long-term world-facing Crafting routes should resolve:

`current village`
→ legitimate known/access-authorised service host
→ Forge **or** Fūin Craft branch
→ Combat/Crafting validation/resolution.

World route may not:

- fabricate recipe Knowledge;
- fabricate materials;
- fabricate executor competence;
- grant an Item before craft commit;
- create attachment state;
- consume materials or Ryō;
- reroll a deterministic craft;
- mutate ownership.

---

## 19. Completion status

Closed by this document:

- all seven Forge hosts;
- all seven Fūin Craft hosts;
- service separation;
- shared-compound permission without semantic collapse;
- location Knowledge/access/actionability boundaries;
- Konoha legacy regional alias relationship;
- provenance host-ref availability;
- current no-art-revision disposition.

Separate:

- mechanics: already closed by Combat #116 authority;
- non-Konoha exact pixel calibration;
- Runtime/Inventory implementation;
- actual recipe/content population;
- exact service providers/participants where needed;
- UI/Assets revision only if later calibration proves a physical visual blocker.

Canonical shorthand:

> **Same district is allowed. Same service is not.**
