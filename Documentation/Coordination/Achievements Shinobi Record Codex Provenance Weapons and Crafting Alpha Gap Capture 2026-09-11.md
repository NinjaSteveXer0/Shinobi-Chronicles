# Shinobi Chronicles — Achievements, Shinobi Record Codex, Provenance Weapons and Crafting Alpha Gap Capture

**Date:** 2026-09-11  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING GAP CAPTURE / OWNER CLOSURE + IMPLEMENTATION PENDING**

## 1. Purpose

This document records several player-facing systems/sections that have been discussed in active design but were not yet represented by sufficiently explicit durable GitHub authority.

It is intentionally a **gap capture**, not a claim that every mechanic below is fully designed or implemented.

Preserve:

> design captured != owner contract closed != implemented != runtime validated != Golden GREEN

The immediate priorities captured here are:

1. **Achievements**;
2. new **Achievements** and **Codex** sections inside the Shinobi Record surface;
3. an observer-safe collection Codex for Characters / Weapons / Items / Equipment / Summons and future eligible categories;
4. a dedicated player-created **Provenance Weapons / Creations** projection;
5. explicit Alpha mechanics authority for ordinary **Crafting / Forge** and **Fūin Craft** rather than only map/service-host reservations.

---

## 2. Achievements — core system lock

Shinobi Chronicles should have a persistent Achievement system capable of recognising meaningful completed-Chronicle accomplishments and other exact committed feats.

Achievements must consume factual committed authority. They must not unlock because a UI screen was opened, because a card title implied a fact, or because presentation guessed at history.

### 2.1 Promotionless full-game completion — mandatory achievement family

A player who completes the applicable full main-game Chronicle **without ever receiving a formal Promotion** must be explicitly rewarded with an Achievement.

This is not Kage-difficulty-exclusive.

The accomplishment should be recognised on **every supported ordinary Shinobi-career difficulty**, with the completed difficulty recorded as part of achievement provenance / tiering.

A Kage-difficulty completion with zero Promotions is therefore a deliberately prestigious version of the same achievement family and should receive correspondingly strong recognition/reward treatment once Rewards closes the exact package.

Binding semantic test:

```text
main Chronicle completion legitimately committed
AND
promotionCount for the relevant protagonist Chronicle participant == 0
AND
selected difficulty identity is committed
=> promotionless-completion Achievement eligibility
```

Do not infer this from final displayed Rank alone. A Character might have rank state for reasons unrelated to the intended test; the Achievement should consume actual Promotion history/provenance.

The Achievement should be capable of distinguishing the completed difficulty so an Academy Student-difficulty zero-Promotion clear and a Kage-difficulty zero-Promotion clear are not flattened into indistinguishable history.

Exact player-facing names, badges, points, unlock rewards, rarity/tiering and any meta-progression reward are **Rewards/UI/Coding closure pending**.

### 2.2 Achievement architecture boundary

Achievements may later cover many other meaningful feats, but this document does not fabricate a full catalogue.

Future rows should be data/authority driven and may consume exact Chronicle facts such as:

- Story/arc completion outcomes;
- Promotion / no-Promotion history;
- Battle accomplishments;
- difficult optional outcomes;
- discovery / Knowledge milestones;
- collection/creation milestones;
- relationship/Shared-History accomplishments where appropriate;
- specialised development/crafting feats;
- other exact owner-authored conditions.

Preserve:

- achievement condition != reward package;
- achievement unlock != Story progression automatically;
- achievement != formal Rank;
- achievement != direct Base Stat/Base PL mutation;
- difficulty identity != formal Rank;
- UI display != achievement truth;
- save/load/reopen != re-award / duplicate reward.

Achievement unlocks must be idempotent and provenance-bearing.

---

## 3. Difficulty / representation / Rank interaction relevant to Achievements

Current CE/Rank doctrine remains:

> difficulty/meta progression != collectible representation != current formal Chronicle Rank

A future higher-difficulty Chronicle may allow a player to begin from a higher-stage representation/Origin while the new Chronicle participant still starts at the formal Rank authorised by that Chronicle's progression rules.

Therefore Achievement logic must read actual Chronicle Rank/Promotion history, not the rank/category printed on a card.

A player deliberately completing the game without Promotion is a valid challenge/flex even if their selected representations are extremely powerful or visually associated with later Rank/state.

No collectible title such as `Kage` manufactures a Kage appointment, Kage formal Rank, past Promotion history or institutional authority in the new Chronicle.

---

## 4. Shinobi Record — new Achievements section

The existing Shinobi Record shell should gain a dedicated **Achievements** section.

Minimum projection intent:

- unlocked achievements;
- locked/unknown treatment that does not leak secret conditions unless the Achievement definition explicitly allows a visible hint;
- difficulty/tier provenance where relevant;
- exact unlock Chronicle/date/history reference where useful;
- reward claimed/unclaimed state only if Rewards/Coding later authorises claim mechanics;
- no duplicate unlock on reload/reopen.

The Shinobi Record presents Achievement truth; it does not create it.

---

## 5. Shinobi Record — Codex section

The Shinobi Record should also gain a dedicated **Codex** section for player-facing collection/discovery reference.

Initial required category families:

- **Characters**;
- **Weapons**;
- **Items**;
- **Equipment**;
- **Summons**;
- **Creations / Provenance Weapons** (see section 6).

The category architecture should remain extensible so later eligible content families can be added without inventing a second Codex system.

### 5.1 Codex is not omniscient Registry access

The Codex must not dump every hidden production row simply because the Registry/catalogue contains it.

Each projected entry requires an authorised visibility source such as legitimate ownership, encounter/discovery, identification, public catalogue knowledge, or another exact owner-defined rule.

Preserve:

> Registry existence != Codex visibility  
> Codex visibility != ownership  
> ownership != deployment  
> encountered != fully identified  
> observer Knowledge != World Truth

Hidden/undiscovered content must not leak through DOM, names, thumbnails, totals or completion denominators unless an exact Codex category explicitly authorises that denominator.

### 5.2 Category ownership

The Codex is a presentation/index surface consuming existing domain authorities:

- Registry / identity authority for Characters;
- Combat / Skills / Items / Weapons authority for Weapons, Items and Equipment;
- Summon authority for Summons;
- Crafting/Items/Weapons authority for player-created Provenance Weapons;
- CE/Knowledge authority for observer-safe visibility/provenance;
- UI/Coding for projection/runtime.

The Codex must not become a second source of truth for those systems.

---

## 6. Provenance Weapons / player-created Creations

Player-created weapons should have a dedicated Codex subsection rather than being flattened into the immutable authored Weapon catalogue.

Working player-facing section name may be:

- **Creations**; or
- **Provenance Weapons**.

Final title is UI/content naming authority pending.

The key semantic requirement is durable distinction between:

1. authored/catalogue weapon identity; and
2. a weapon instance materially created/customised by the player through legitimate Crafting/provenance history.

The dedicated section should show only actual committed creations belonging to / legitimately known by the current player context.

Minimum provenance fields to preserve where the owning Crafting contract supports them may include:

- stable created-object identity;
- current player-facing name;
- base/template/source definition if any;
- creator / commissioning participant where relevant;
- exact creation occurrence;
- material/component provenance;
- forge/workshop/service provenance;
- Fūin/seal provenance where legitimately attached;
- later modification/upgrade/supersession lineage;
- current ownership/custody state;
- current Combat/equipment projection from owning systems.

This document does **not** invent the exact crafting recipe/effect schema.

Preserve:

> created instance != catalogue definition  
> provenance != free power  
> crafted != equipped  
> crafted != mastered  
> Fūin attachment != automatic Fūinjutsu competence  
> custom name/presentation != semantic reroll

---

## 7. Crafting / Forge and Fūin Craft — missing mechanics authority

Current GitHub authority already contains **World hosting** for two separate services, including issue #56 and Konoha v3 map reservations:

- ordinary **Forge / Crafting**;
- **Fūin Craft** / Fūinjutsu sealing service.

That hosting authority is useful but insufficient for Alpha mechanics implementation.

A separate owning-system contract is still required for what the player can actually do.

### 7.1 Ordinary Crafting / Forge must close

The owning Items/Weapons/Crafting authority should define at minimum:

- what object categories are craftable in Alpha;
- recipe/blueprint/knowledge requirements;
- material inputs and consumption;
- Ryō/service-cost interaction where applicable;
- capability/Skill/Progression prerequisites if any;
- success/failure semantics if Crafting is not deterministic;
- resulting ownership/custody;
- whether creation produces a catalogue item or a provenance-bearing created instance;
- modification/upgrade/repair boundaries;
- save/load/idempotence;
- how Crafting history is recorded for Shinobi Record/Codex/Achievements.

### 7.2 Fūin Craft must remain distinct

Fūin Craft must not silently collapse into ordinary Forge Crafting.

The owning contract should close:

- final player-facing name: **`Fūin Craft` is current durable terminology, but final naming should be explicitly ratified before UI freeze**;
- seal creation vs seal attachment distinction;
- prerequisite Fūinjutsu Knowledge/Access/Competence rules;
- valid host object categories;
- material/component requirements;
- ownership/custody of created seals;
- attachment/removal/supersession rules;
- whether a seal creates resolver effects, Stat modifiers or access packages and which owner defines those effects;
- provenance recording;
- idempotence/save-load.

Preserve:

> Fūinjutsu Knowledge != Access != Competence != Mastery  
> Fūin Craft availability != seal ownership  
> creating a seal != attaching a seal  
> attaching a seal != learning a Skill  
> service host != service permission  
> service permission != automatic success

---

## 8. Existing GitHub authority this capture must not duplicate

### #56 — World service hosting

`[QUEUE][TO: WORLD-MISSIONS-EVENTS-REWARDS] Reserve Forge + Fūin Craft service hosts in every Hidden Village`

#56 owns village/world physical service placement and must remain separate from mechanics.

### #59 — dynamic Story/Arc reward calibration

`[HANDOFF][TO: WORLD-MISSIONS-EVENTS-REWARDS][QUEUE] Calibrate Arc 1 decision-sensitive reward progression`

#59 remains mission/arc reward evaluation authority. Achievement rewards may reuse compatible Reward machinery, but Achievement semantics must not be collapsed into ordinary mission reward calculation.

### #87 — capability-responsive World ecology

Crafting/Fūinjutsu may legitimately become World opportunity predicates once their actual owning semantics are closed. #87 does not itself define Crafting mechanics.

---

## 9. Required owner sequence

Do not interrupt the current Coding push for a complete start-to-end Arc 1 playthrough merely to build these new surfaces immediately.

Recommended sequence:

1. **CE / Codex / Coordination** — this gap capture: DONE;
2. **Combat / Skills / Items / Weapons (and exact Crafting owner)** — close ordinary Crafting + Fūin Craft + Provenance Weapon instance semantics;
3. **World / Missions / Events / Rewards** — close Achievement reward policy, beginning with promotionless-completion difficulty tiers;
4. **World** — continue #56 service-host allocation/calibration without owning Crafting mechanics;
5. **UI / Coding** — add Shinobi Record Achievements + Codex sections and Provenance Creations projection from closed schemas;
6. **Coding** — implement achievement evaluation/persistence, Codex projection, crafting runtime and save/load;
7. runtime/browser/Golden validation.

No subsystem should scrape UI text or card titles to infer these facts.

---

## 10. Alpha status

As of this capture:

- Achievements concept / mandatory promotionless-completion family: **DESIGN CAPTURED**;
- exact Achievement catalogue: **NOT CLOSED**;
- exact Achievement rewards: **NOT CLOSED**;
- Shinobi Record Achievements section: **REQUIRED / NOT IMPLEMENTED**;
- Shinobi Record Codex section: **REQUIRED / NOT IMPLEMENTED**;
- Codex observer-safe category semantics: **COORDINATION BOUNDARY CAPTURED / OWNER DETAIL PENDING**;
- Provenance Weapons / Creations section: **REQUIRED / MECHANICS PENDING**;
- Crafting/Fūin Craft World service hosts: **PARTIALLY DURABLE / #56 OPEN**;
- Crafting mechanics: **NOT CLOSED**;
- Fūin Craft mechanics/final naming ratification: **NOT CLOSED**;
- Coding implementation/runtime validation: **NOT CLAIMED**.

Canonical reminder:

> **Achievements reward what actually happened. Codex shows what the player legitimately knows/owns. Provenance shows what the player actually created. Crafting creates through owning mechanics, not through UI presentation.**
