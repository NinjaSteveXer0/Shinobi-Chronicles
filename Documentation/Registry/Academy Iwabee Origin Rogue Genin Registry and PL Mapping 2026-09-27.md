# Shinobi Chronicles — Academy Iwabee Origin Rogue Genin Registry and PL Mapping

**Date:** 2026-09-27  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING REGISTRY / PL CLOSURE — ISSUE #392 CONSUMED / RETURN TO COMBAT REQUIRED**  
**Source handoff:** GitHub issue #392  
**CE authority:** `Documentation/Coordination/Academy_Iwabee_Rogue_Genin_Battle_and_Escape_Block_Reconciliation_2026-09-27.md`  
**Story authority:** `Documentation/Story/Academy_Iwabee_Origin_2026-09-27_Scene_Authority_and_Backdrop_Contract.md`  
**Existing opposition calibration authority:** `Documentation/Registry/Awaiting Placement Character and Enemy Calibration Wave.md`  
**Comparable exact-consumer precedent:** `Documentation/Combat/SC_Combat_Academy_Wasabi_Rogue_Genin_PL_Battle_Closure_2026-09-24.md`  
**Current source baseline inspected:** `5a87fe7df630cc69661166b688b14fb4be739307`

## 1. Ruling

Academy Iwabee's Rogue Genin does **not** require a new independently calibrated Rogue-Genin numerical package.

The project already owns a reusable Enemy/Opposition Registry template:

`rogue_genin`

with closed Base Stats:

`23 / 22 / 21 / 10 / 14 / 15 / 24`

and Base PL:

**23**

Iwabee's World/Story identity remains the exact persistent historical participant:

`iwabee_origin_rogue_genin_01`

The correct Registry/Battle mapping is therefore:

`iwabee_origin_rogue_genin_01 -> oppositionTemplateId: rogue_genin`

This follows the already-closed Academy Wasabi pattern:

`wasabi_origin_rogue_genin_01 -> oppositionTemplateId: rogue_genin`

The two Iwabee/Wasabi historical participant refs are **not** the same person. They merely consume the same reusable opposition capability template.

Preserve:

> **historical participant identity != reusable opposition template**

> **same template != same person**

> **unnamed display != identity-less participant**

> **template reuse != collectible acquisition**

---

## 2. Exact identity layers

### World / Story participant

Stable participant ref:

`iwabee_origin_rogue_genin_01`

Source occurrence:

`occ_origin_iwabee_rogue_genin_response_resolution`

Player-facing display:

**ROGUE GENIN**

This ref owns the occurrence-specific historical identity.

It must persist across:

- terrain exposure;
- direct confrontation;
- optional Battle;
- escape-block branch;
- any later World disposition;
- IWA-02 history;
- save/load.

### Battle / Registry opposition template

Exact reusable opposition template ID:

`rogue_genin`

Registry class:

**Enemy / Opposition template**

Formal Rank/category:

**Genin / Rogue Genin opposition**

This template supplies the capability package used when the historical participant enters PL Battle.

It does **not** replace the historical participant ref in Chronicle history.

---

## 3. Canonical Base Stats / Base PL

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Exact reusable template Stats:

`23 / 22 / 21 / 10 / 14 / 15 / 24`

Breakdown:

- Ninjutsu: **23**
- Taijutsu: **22**
- Bukijutsu: **21**
- Fūinjutsu: **10**
- Kinjutsu: **14**
- Genjutsu: **15**
- Stamina: **24**

Formula v1.0:

`round(0.60 × highest + 0.25 × average(top 3) + 0.15 × average(all 7))`

Formula check:

- highest = `24`
- top three = `24 / 23 / 22`
- top-three average = `23`
- all-seven sum = `129`
- all-seven average = `18.428571...`
- raw PL = `0.60×24 + 0.25×23 + 0.15×18.428571...`
- raw PL = `22.914285...`

Base PL:

**23**

No direct or hidden PL bonus is introduced.

---

## 4. Current / Effective / Battle-entry initialization

For `iwabee_origin_rogue_genin_01` when consuming `rogue_genin` in the Academy Iwabee Origin confrontation:

**Current Stats initialize exactly from the template Base Stats.**

`Current Stats = 23 / 22 / 21 / 10 / 14 / 15 / 24`

**Current PL initializes exactly from Base PL.**

`Current PL = 23`

Absent separately authorised equipment/effective state:

**Effective Stats initialize equal to Current Stats.**

**Underlying Battle PL maximum = 23.**

**Remaining Battle PL at ordinary Battle entry = 23.**

No Iwabee-Origin-specific reduction, handicap, encounter multiplier, hidden pre-damage, or random variation is authorised.

The CE escape-block authority explicitly defaults to **no hidden Battle modifier**.

Therefore if the escape-block branch later transitions into Battle, it uses the same Base/Current/Effective entry package unless Combat explicitly closes a legitimate contextual Battle state.

The Story/world fact that an escape route was physically constrained does not itself alter PL.

---

## 5. Iwabee comparison boundary

Academy Iwabee remains unchanged:

- Registry ID: `academy_iwabee`
- Base Stats: `14/11/13/6/5/5/14`
- Base PL: **13**

PL / Registry does not lower the Rogue Genin merely to force parity.

The existing `rogue_genin` PL23 package is already durable project authority and has an executable Combat precedent in Academy Wasabi.

Whether the exact Iwabee 1v1 is appropriately difficult and genuinely achievable under Iwabee's current palette is a **Combat viability question**, not a reason for PL / Registry to fork a weaker duplicate template.

Combat may:

- reuse the already-closed `rogue_genin` action package where compatible;
- author exact occurrence-specific legal/action-selection context where legitimately required;
- prove viability under current evolved PL Battle semantics.

Combat may **not** silently mutate Base PL23.

If current Combat semantics prove the authored Iwabee encounter impossible without violating closed authority, return that exact contradiction rather than inventing a second `rogue_genin_easy` profile.

---

## 6. Representation guard

Historical participant representation guard:

`iwabee_origin_rogue_genin_01_only_no_named_character_inference`

Reusable template guard:

`rogue_genin_generic_opposition_template_not_persistent_person`

Meaning:

- do not substitute Naruto, Boruto, Sarada, Mitsuki, or another named/canon Genin;
- do not infer clan, bloodline, signature technique, relationship or identity from the generic template;
- do not collapse Iwabee's Rogue with Wasabi's Rogue because both consume `rogue_genin`;
- do not turn `rogue_genin` itself into the Chronicle-history participant ID;
- do not create a new persistent person every time the reusable template is consumed.

Exact historical identity remains `iwabee_origin_rogue_genin_01`.

---

## 7. Story scope / ownership / acquisition

The historical Rogue is Story-scoped.

Neither the participant ref nor the reusable template creates:

- collectible Character admission;
- collectible Entity admission;
- ownership;
- My Clan membership;
- acquisition;
- teammate eligibility;
- general deployment access;
- assignment;
- reward entitlement.

No reward exists under current Iwabee authority.

Battle withdrawal at 0 Remaining PL does not establish:

- injury;
- death;
- capture;
- custody;
- surrender;
- escape.

World owns post-Battle disposition.

---

## 8. Asset / presentation boundary

Physical repository assets exist:

- `Enemies/rogue_genin.png`
- `Enemies Portraits/rogue_genin.png`

However current `game.js` source audit found no explicit ratified Iwabee-specific card / `uiPortrait` mapping for `iwabee_origin_rogue_genin_01`.

Therefore PL / Registry does not invent or promote a new asset mapping.

Battle/UI may consume the existing `rogue_genin` presentation asset only when current UI/Assets/runtime authority explicitly supports that opposition-template projection.

Preserve:

**physical asset != automatic Registry/presentation mapping**

**template art != historical identity**

No Iwabee-specific collectible card is authorised.

---

## 9. Save/load identity continuity

Save/load must preserve two separate addresses:

Historical participant:

`iwabee_origin_rogue_genin_01`

Battle capability source:

`rogue_genin`

Recommended persistent Battle identity envelope:

```text
historicalParticipantRef = iwabee_origin_rogue_genin_01
oppositionTemplateId = rogue_genin
```

That pair must survive:

1. Story exposure;
2. response choice;
3. Battle launch if any;
4. Battle save/load;
5. Battle terminal settle;
6. Story return;
7. World disposition;
8. IWA-02 history.

Reload must not:

- replace the historical ref with `rogue_genin`;
- allocate a new Rogue person;
- swap to Wasabi's `wasabi_origin_rogue_genin_01`;
- reroll Stats/PL;
- manufacture ownership;
- infer capture/escape from Battle PL state.

---

## 10. IWA-02 non-collapse

IWA-02 remains:

`occ_origin_iwabee_rogue_genin_response_resolution`

with qualifying fact:

`earthReleaseUsedToConstrainRogueGenin = true`

and participant:

`iwabee_origin_rogue_genin_01`

Battle template use does not change that predicate.

Therefore:

- Battle victory != IWA-02;
- Battle Earth Release != automatically the authored environmental escape-block fact;
- `rogue_genin` template identity != IWA-02 participant identity;
- only the authored environmental branch commits the exact qualifying constraint fact under current authority.

---

## 11. Downstream Combat release

PL / Registry has closed #392.

Combat must consume:

- historical participant: `iwabee_origin_rogue_genin_01`;
- opposition template: `rogue_genin`;
- Stats: `23/22/21/10/14/15/24`;
- Base PL: **23**;
- Current/Effective/Battle entry: Base-derived;
- formal category: Rogue Genin / Genin opposition;
- no hidden escape-block Battle modifier;
- no ownership/reward/injury/death/custody inference.

Relevant already-closed Combat precedent:

`Documentation/Combat/SC_Combat_Academy_Wasabi_Rogue_Genin_PL_Battle_Closure_2026-09-24.md`

That package already closes for `rogue_genin`:

- `enemy_rogue_genin_kunai_rush` — Attack PL9;
- `enemy_rogue_genin_shuriken_spread` — Attack PL7;
- `enemy_rogue_genin_substitution_feint` — once-per-Battle 40% pre-Stamina mitigation against the next qualifying direct packet before the Rogue's next action;
- eligible-action selection discipline;
- no hidden Speed/accuracy/evasion;
- PL23 entry.

Combat must determine whether this existing reusable package is directly valid for the Iwabee consumer or whether only an occurrence-context wrapper/AI legality adjustment is required.

Combat must **not** duplicate the action package merely because the historical participant is different.

Combat must also answer the #392-required question:

> Is any exact contextual Battle state warranted after the escape-block branch?

Default CE/PL authority remains:

**NO hidden Battle modifier.**

After Combat closes/validates the Iwabee consumer, route directly to World / Missions / Events for post-confrontation and post-constraint disposition.

---

## 12. Final lock

> **Academy Iwabee's stable Rogue Genin participant `iwabee_origin_rogue_genin_01` consumes the existing reusable `rogue_genin` Enemy/Opposition template rather than receiving a duplicate numerical calibration. The template's authoritative Stats are `23/22/21/10/14/15/24` with Base PL23. Current/Effective/Battle-entry state initializes from that Base package with no Iwabee-specific handicap or hidden escape-block modifier. Chronicle history remains attached to `iwabee_origin_rogue_genin_01`, while `rogue_genin` remains only the reusable capability template. Same template does not mean same person: Iwabee's Rogue is distinct from Wasabi's Rogue. No ownership, reward, injury/death, custody or collectible admission is inferred. Combat now owns Iwabee encounter viability/reuse of the already-closed Rogue Genin action package, after which World owns the Rogue's factual disposition.**
