# Shinobi Chronicles — Chronicle Start Modes, Inheritance Carryover, Legacy Restart and Pre-Origin Staging Contract

**Date:** 2026-09-18  
**Owner:** CE / Codex / Coordination  
**Status:** **STEPHEN-DIRECTED SYSTEM PLANNING — START ARCHITECTURE CLOSED AT SEMANTIC BOUNDARY; EXACT DOMAIN CATALOGUES / NUMERIC LIMITS / UI IMPLEMENTATION SEPARATE**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

This document closes the reusable start-flow architecture for three distinct player entry modes:

1. **NEW START**
2. **INHERITANCE CARRYOVER**
3. **LEGACY RESTART**

All three use one start-manifest pipeline rather than three unrelated onboarding systems.

Canonical flow:

```text
difficulty selection
-> Origin character / person selection
-> start-mode-specific Start Review
-> explicit inheritance + starter-kit commit
-> My Clan start staging
-> BEGIN ORIGIN
-> authored Origin Story
```

The central design goal is that a returning player may deliberately bring legitimate prior-character development into a new difficulty or restarted Chronicle without collapsing:

- representation identity into person identity;
- prior formal Rank into current formal Rank;
- prior Chronicle World state into the new Chronicle;
- historical player knowledge into actor-relative Knowledge;
- ownership into assignment;
- assignment into deployment;
- qualification into Rank;
- a player-facing lethal label into factual death.

This contract is also the required re-ratification of the old historical `Path of Inheritance` / vague Legacy-rebirth scaffolding for **start/restart semantics only**.

The obsolete `Path of Shadows` concept is not revived.

---

## 2. One Start Manifest, three source policies

Runtime should produce one immutable, provenance-bearing `ChronicleStartManifest` before the Origin begins.

Conceptual shape:

```js
{
  startManifestId,
  startMode, // NEW_START | INHERITANCE_CARRYOVER | LEGACY_RESTART
  selectedDifficultyId,

  originId,
  originPersonRef,
  selectedStartRepresentationRef,

  forbiddenStart: false,
  forbiddenNinjaSourceChronicleRef: null,
  forbiddenNinjaSourceRepresentationRef: null,
  forbiddenNinjaDevelopmentSnapshotRef: null,

  parentChronicleRef: null,
  donorChronicleRef: null,

  inheritanceEntries: [],
  starterProvisioningReceiptRef,
  rosterBootstrapReceiptRef,
  myClanStagingReceiptRef,

  committedAt,
  sourceRefs: []
}
```

Exact runtime field names remain Coding-owned.

The three modes differ by what may populate `inheritanceEntries` and what prior Chronicle provenance may be referenced. They do not require separate Story, Inventory, roster or Progression engines.

Canonical rule:

> **Start mode changes the source policy for the Start Manifest; it does not create a second Chronicle runtime.**

---

## 3. NEW START

A New Start is a fresh Chronicle with no inherited character-development package.

Required semantics:

- `parentChronicleRef = null`;
- `donorChronicleRef = null`;
- `inheritanceEntries = []`;
- fresh World state;
- fresh actor-relative Knowledge unless an existing account-level system explicitly supplies something that is not actor Knowledge;
- fresh relationship / Shared History state;
- no prior mission completion;
- no prior formal Rank;
- no prior specialist qualification automatically injected;
- no prior Inventory instance automatically injected.

A New Start still receives:

- the selected difficulty;
- the selected Origin/person;
- the legitimate starting representation/roster bootstrap defined by Acquisition;
- **two basic starter-item picks** from an Items-owned starter pool;
- the common Start Review screen;
- the common My Clan start-staging step before Story begins.

The player may therefore configure the start deliberately even on a completely fresh Chronicle.

---

## 4. INHERITANCE CARRYOVER

Inheritance Carryover creates a fresh Chronicle while allowing a controlled, provenance-bearing import from an eligible prior character/Chronicle.

This is the mode that supports a player deliberately carrying one character they personally developed in the prior difficulty playthrough into the next difficulty.

Example:

> During the current playthrough, the player develops their own Kakashi into a powerful Jōnin-era character. When moving into the next difficulty, the player may choose that exact developed Kakashi as the run's **Forbidden Ninja**. The system does not add or generate a separate "Forbidden Ninja Kakashi" card.

### 4.1 Forbidden Ninja — player-created carryover, not a card category

`Forbidden Ninja` is a **contextual designation applied to one existing player-developed character card/state carried from the prior difficulty playthrough**.

It is **not**:

- a separate rarity;
- a special pre-authored Forbidden card pool;
- an extra card automatically inserted into the roster;
- a duplicate representation manufactured by Coding;
- a shop/acquisition category;
- a replacement for the player's developed character.

Canonical rule:

> **Your Forbidden Ninja is one ninja you developed yourself in the prior difficulty run.**

At the qualifying difficulty transition:

1. the system grants exactly **one Forbidden Ninja carry slot**;
2. the player chooses one eligible character card they legitimately owned and developed during the source playthrough;
3. that exact character/representation becomes the new Chronicle's `Forbidden Ninja`;
4. its carryover is provenance-backed to the source Chronicle and source development state;
5. no second "Forbidden" copy is created.

Conceptually:

```text
source Chronicle
-> one owned + developed character chosen by player
-> snapshot exact eligible persistent developed state
-> designate that carried character FORBIDDEN NINJA in the new Chronicle
```

The Forbidden designation belongs to the **new-run start context**, not to the underlying collectible-card definition.

A card that was ordinary in the source playthrough can therefore become the player's Forbidden Ninja in the next difficulty because of what **that player developed it into**.

### 4.1.1 Core Forbidden Ninja snapshot vs extra inheritance

The Forbidden Ninja carries a **core source snapshot** of that chosen character rather than being reconstructed from a clean catalogue card.

The core snapshot must preserve, subject to each owning domain's carryover law:

- exact person / representation identity;
- canonical Base state of that representation;
- eligible permanent development actually earned on that character;
- provenance of that development.

Additional optional inheritance entries may still be selected on the Start Review where the mode/difficulty allows them.

This creates a clean distinction:

> **Forbidden Ninja core snapshot = the developed ninja you created.**

> **Additional inheritance = other separately eligible carryover layered around that start.**

No optional inheritance selection may double-count development already present in the Forbidden Ninja core snapshot.

### 4.1.2 Kage / Jōnin / Special Jōnin card does not grant current formal Rank

A Forbidden Ninja may come from a high-stage/high-rank representation such as Jōnin Kakashi or a Kage-era card.

That does **not** automatically set the new Chronicle's formal institutional Rank to Jōnin, Special Jōnin, ANBU, Kage, Hokage or any other prior/source rank.

Preserve the distinction:

- the carried representation may retain its canonical Base identity / Base Stats / Base PL and eligible developed capability;
- source-stage/rank descriptors remain provenance for that representation;
- the **current Chronicle formal Rank** remains owned by PL / Registry / Rank and must be earned/recognised under the new Chronicle's Rank rules;
- prior specialist qualification may carry as competence where authorised, but qualification != Recognition != formal Rank.

Canonical rule:

> **Taking a Kage card as your Forbidden Ninja does not make your new Chronicle character Kage-ranked.**

### 4.1.3 Difficulty interaction

Difficulty must not silently rewrite the carried Forbidden Ninja's canonical Base state merely to make it look like an ordinary lower-stage start.

Encounter/world difficulty may still apply through its own legitimate difficulty systems.

The Start Review must visibly identify:

- the chosen Forbidden Ninja;
- its source Chronicle;
- its carried core development snapshot;
- the current new-run formal Rank separately;
- any additional optional inheritance.

Preserve:

> **difficulty != Base mutation**

> **Forbidden Ninja != current formal Rank**

> **Forbidden Ninja != automatic inheritance of every prior-run World fact**

### 4.2 Fresh Chronicle still means fresh World

Inheritance Carryover does **not** copy the old Chronicle wholesale.

By default, do not carry:

- mission completion;
- World event outcomes;
- current NPC disposition;
- current faction state;
- current custody state;
- current active objectives;
- Shared History with newly encountered participants;
- actor-relative Knowledge merely because the player learned it previously.

Account/Codex visibility may remain separately persistent where already authoritative, but:

> **player knows ≠ new protagonist knows**

---

## 5. LEGACY RESTART

Legacy Restart creates a new Chronicle as a deliberate descendant/restart of a completed or abandoned prior Chronicle.

It must record lineage:

```text
prior Chronicle
-> Legacy Restart request
-> archived/read-only parent Chronicle
-> new Chronicle Start Manifest with parentChronicleRef
```

Legacy Restart may expose a broader inheritance candidate set than ordinary Inheritance Carryover, but it still uses the same manifest architecture and the same domain-owned eligibility checks.

Legacy Restart does not mean "resume the old world after wiping the UI."

The new Chronicle has fresh:

- active World state;
- current missions/objectives;
- participant relationships;
- actor-relative Knowledge unless specifically inherited by a legitimate domain rule;
- formal institutional state unless explicitly re-granted by the owning authority.

The prior Chronicle remains provenance, not current truth.

Canonical rule:

> **Legacy lineage != World-state duplication**

> **parent Chronicle history != current Chronicle history**

---

## 6. Inheritance entry classes

Every carried element must be represented as an explicit typed entry with source provenance and an owning domain.

Conceptually:

```js
{
  inheritanceEntryId,
  inheritanceClass,
  subjectPersonRef,
  sourceRepresentationRef,
  sourceChronicleRef,
  sourceReceiptRefs: [],
  ownerDomain,
  carriedValueRef,
  carryoverPolicyRef
}
```

The minimum candidate classes are:

### A. Representation selection

Owned by Acquisition / Registry boundaries.

This is the selected start representation, including an authorised Forbidden Ninja exception.

Its canonical Base Stats / Base PL belong to that representation and are not copied as an ad-hoc bonus.

### B. Persistent development

Owned by Progression / relevant development system.

Examples may include legitimate permanent character development already committed to the donor character.

Carryover must preserve source-scoped idempotence and must not double-count development already native to the selected representation.

### C. Earned specialist qualification / competence

Owned by Rank + Progression evidence authority for source legitimacy, then consumed by the relevant resolver as inherited competence where allowed.

Formal Rank is separate.

### D. Techniques / Skills / capabilities

Owned by Combat / Skills / relevant capability domain.

Knowledge, Access, Competence, Power and Mastery remain distinct.

A carried technique must identify exactly which state is inherited; the UI cannot turn a known technique name into mastered capability.

### E. Equipment / Items / Summons / other owned assets

Owned by their existing domains.

Only entries explicitly marked carryover-eligible may transfer.

Inventory instance identity and provenance must survive if an actual instance is transferred.

### F. Account / Codex / achievement visibility

Account-level or read-only meta progression may remain visible where separately authoritative.

It must not silently become actor-relative Knowledge, current relationship state or current World truth.

---

## 7. What does NOT carry merely because a character was powerful before

The following are never inferred from "same character" or "high-rank card":

- current formal Rank;
- current institutional appointment;
- current Special Jōnin Recognition;
- current ANBU assignment;
- current Kage office;
- current mission authority;
- current relationship;
- current Shared History;
- current World Knowledge;
- current objective;
- current Inventory contents;
- current Summon ownership;
- current Bloodline activation state;
- current transformation state.

Each requires its own start-policy entry if the owning domain ever permits carryover.

In particular:

> **prior Rank != inherited competence**

> **inherited competence != current Rank**

> **representation Base PL != prior Chronicle development**

---

## 8. Special Jōnin Assassin inheritance and lethal resolvers

The current executable Special Jōnin catalogue includes:

```text
covert_operations.assassin
- target_isolation
- covert_execution
```

A prior Kakashi who legitimately earned the Assassin qualification may therefore produce an inheritance candidate representing **proven Assassin competence**.

That inherited competence may influence an authorised lethal Story/Combat resolver.

It must not directly write a death fact.

### 8.1 ATTEMPT TO KILL vs KILL

Default player-facing lethal affordance:

```text
ATTEMPT TO KILL
-> commit lethal intent
-> owning resolver
-> success / failure / interruption / other authorised result
-> factual death only if resolver commits death
```

Inherited Assassin competence may legitimately improve the resolver's effective success basis, probability, threshold or eligible outcome set when the exact resolver consumes that competence.

It does **not** automatically make every target killable.

### 8.2 When a real KILL button may appear

A player-facing `KILL` affordance may replace `ATTEMPT TO KILL` only when the current pre-action resolver state can prove that the lethal outcome is deterministic under the committed situation.

Conceptually:

```text
lethal intent eligible
+ exact target state
+ exact protagonist capability
+ inherited Assassin competence where applicable
+ no unresolved defensive/autonomy/state uncertainty
-> resolver preflight proves deterministic lethal resolution
-> presentation may project KILL
```

Even then, pressing `KILL` does not let UI write death directly.

The click still commits semantic intent and invokes the owning resolver, which commits the factual death occurrence.

Therefore:

> **Assassin qualification can improve lethal resolution.**

> **Assassin qualification alone != guaranteed kill.**

> **KILL label != UI-owned death.**

This preserves the existing distinction between deterministic `KILL` and resolver-determined lethal intent while allowing inherited specialist competence to materially change play.

---

## 9. Difficulty and inheritance envelope

Difficulty may define what carryover is allowed, but it should do so explicitly.

Each difficulty/start policy may publish an inheritance envelope such as:

- whether the current transition is eligible for the standard one-slot Forbidden Ninja carry;
- exact source-playthrough eligibility requirements for the chosen developed character;
- permitted inheritance classes;
- optional caps on transferred development/assets;
- whether specific high-impact capability classes are blocked;
- whether Legacy Restart receives broader eligibility than ordinary Inheritance Carryover.

This contract intentionally does **not** invent numeric carryover budgets.

Those values must be authored by the relevant difficulty/Progression/Acquisition owners.

Canonical rule:

> **difficulty may constrain eligibility; it must not silently mutate committed inherited truth**

If the player's developed Jōnin Kakashi is carried as the Forbidden Ninja into Genin difficulty, its representation remains Jōnin Kakashi's canonical representation state rather than being secretly rewritten into Academy/Genin Base Stats. The new Chronicle's formal Rank remains separately owned and does not become Jōnin merely because the carried card is a Jōnin representation.

---

## 10. The new Start Review screen

After Origin character selection and before entering My Clan, all three modes open the same adaptive **CHRONICLE START REVIEW** surface.

Minimum player-facing sections:

1. **Origin**
   - chosen Origin/person;
   - chosen start representation;
   - current difficulty.

2. **Start Mode**
   - New Start / Inheritance Carryover / Legacy Restart;
   - Forbidden Ninja status where applicable;
   - source Chronicle + source developed character for the Forbidden carry.

3. **Carryover**
   - New Start: explicit "No inherited character development";
   - Inheritance / Legacy: grouped inherited entries;
   - each entry shows what is actually carried, its source, and what is not carried.

4. **Starter Kit**
   - exactly **two basic starter-item picks** from the authorised Starter Pool;
   - no hidden random starter-item roll.

5. **Start Summary**
   - final read-only preview of the manifest that will be committed.

Primary continuation:

```text
CONFIRM START PACKAGE
-> commit Start Manifest
-> enter My Clan start staging
```

Changing difficulty, Origin, source Chronicle, chosen Forbidden Ninja or inheritance selection before confirmation must rebuild the uncommitted preview rather than mutate an already committed manifest.

After confirmation, changes require an explicit restart/edit flow rather than silent reroll.

---

## 11. Starter provisioning

All three start modes receive two basic starter-item picks.

This starter grant is separate from inheritance.

Therefore an Inheritance/Legacy player may legitimately have:

```text
eligible carried item(s)
+ two new-run basic starter picks
```

if Items authority permits the carried instances.

Items / Weapons owns:

- the exact Starter Pool;
- stackability;
- quantity;
- item instance creation;
- whether any candidate is equipped automatically;
- carryover eligibility for prior Inventory instances.

CE locks only:

- two starter picks;
- deterministic player selection;
- no random reroll requirement;
- source-scoped provisioning receipt;
- no duplicate grant on reopen/save/load.

Starter items must be granted through authoritative Inventory APIs.

UI selection alone is not ownership.

---

## 12. My Clan start staging before Story

After the Start Manifest commits, route the player to the existing **My Clan** system in a bounded **Start Staging** state.

This is not a second My Clan or a new roster system.

It uses the existing My Clan authority:

- roster = owned/legitimately bootstrapped characters;
- formation = staged assignment;
- `START` = first formation position;
- ownership != assignment != deployment.

### 12.1 Origin protagonist is separate from START slot

The chosen Origin protagonist/person is already bound by the Start Manifest.

Changing formation `START` must not silently change the Origin protagonist.

If the player wants a different Origin character, they must explicitly return to the Origin/start flow.

Preserve:

> **My Clan START != protagonist**

### 12.2 Start Staging responsibilities

The player may:

- inspect the legitimate starting roster;
- select a shinobi;
- stage/save formation where available;
- review Current Loadout;
- enter deeper LOADOUT / MANAGE SHINOBI if that surface is implemented;
- confirm readiness.

The surface then exposes:

```text
BEGIN ORIGIN
```

which consumes the already committed Start Manifest plus committed formation/loadout state and launches the authored Origin.

My Clan must not fabricate:

- roster ownership;
- inherited Skills;
- starter-item ownership;
- protagonist identity;
- deployment history.

---

## 13. Origin presentation vs Forbidden representation

Origin Story remains authored Story authority.

A Forbidden start may intentionally create a nonstandard capability state, but it does not grant permission to rewrite the Origin's authored facts.

The implementation must explicitly distinguish:

- **Origin person / Story identity**;
- **selected start representation**;
- **scene presentation representation** where the authored Origin locks one;
- **runtime capability state** used by resolvers.

This allows a future policy to decide, per Origin/scene, whether a Forbidden representation is visually projected in the Story or whether the historical/Origin-stage presentation is retained while the inherited capability state still affects resolution.

Do not infer this from card art.

Until a scene-specific presentation rule exists:

> **capability carryover does not automatically rewrite authored Story presentation.**

---

## 14. Start-manifest commit and determinism

The complete start package must commit once.

Required properties:

- one stable `startManifestId`;
- all inherited entries reference exact source receipts/records;
- starter provisioning commits exactly once;
- roster bootstrap commits exactly once;
- save/load reopens the same committed package;
- UI reopen does not reroll inheritance eligibility;
- UI reopen does not duplicate starter items;
- switching screens does not recommit ownership;
- `BEGIN ORIGIN` consumes the committed manifest rather than reconstructing it from labels.

Any random selection among eligible legacy candidates must be resolved and persisted before presentation if randomness is ever added later.

---

## 15. Owner boundaries

### CE / Codex / Coordination

Owns:

- common Start Manifest;
- mode semantics;
- non-collapse rules;
- inheritance provenance contract;
- cross-domain resolver-consumption boundary;
- shared start-flow ordering.

### Acquisition / Character Systems

Owns:

- which representations are legitimately available/owned;
- eligibility of the one player-developed source character for Forbidden carry;
- proof that the chosen Forbidden Ninja was genuinely owned in the source playthrough;
- starting roster bootstrap;
- roster/representation carryover eligibility.

### Progression / Development

Owns:

- which persistent development records are carryover-eligible;
- how carried development is represented;
- anti-double-counting;
- development inheritance limits where applicable.

### PL / Registry / Rank

Owns:

- canonical Base Stats / Base PL of the selected representation;
- formal Rank;
- qualification / Recognition distinctions;
- whether an inherited prior qualification counts for any current-Chronicle Rank purpose.

Default from this contract:

> inherited specialist competence may affect resolvers where authorised, but does not automatically grant current formal Rank.

### Combat / Skills / Items / Weapons

Owns:

- inherited capability consumption;
- lethal resolver math/thresholds;
- exact deterministic `KILL` preflight rule;
- starter-item catalogue;
- transferred Inventory/Equipment instances;
- exact Skill/Technique/Summon carryover rules.

### UI / Assets

Owns:

- Start Review presentation;
- Start Staging projection in existing My Clan;
- clear carryover/source/blocker communication;
- no invented semantic state.

### Coding / Runtime

Owns:

- persistence/idempotence;
- start manifest;
- cross-owner adapters;
- save/load;
- launch sequencing;
- tests;
- installed-browser validation.

---

## 16. Alpha posture

This design must not derail current Kakashi-Origin Alpha closure.

### Alpha-relevant / near-term

The reusable pieces most relevant to ordinary Alpha onboarding are:

- a common Start Manifest;
- New Start Review;
- two basic starter-item picks;
- My Clan start staging before Origin;
- clean separation of Origin protagonist from My Clan `START`.

These may be scheduled after the current Kakashi/Origin benchmark is stable enough that changing start flow will not hide existing Origin regressions.

### Queue / later unless Stephen reprioritises

- one-player-created Forbidden Ninja cross-difficulty carry;
- Inheritance Carryover;
- Legacy Restart;
- broad asset/Skill/qualification carryover catalogues;
- difficulty-specific inheritance budgets.

Do not expose stale legacy `Path of Inheritance` surfaces as a shortcut.

---

## 17. Acceptance examples

### Example A — New Start

```text
Genin difficulty
-> choose Academy Kakashi Origin
-> CHRONICLE START REVIEW
   inheritance: none
   choose two basic starter items
-> CONFIRM START PACKAGE
-> My Clan Start Staging
-> BEGIN ORIGIN
```

No prior facts or qualifications are invented.

### Example B — Inheritance Carryover / player-created Forbidden Kakashi

```text
source difficulty playthrough
-> player owns and develops Kakashi into their own Jōnin-era Kakashi state
-> next difficulty selected: Genin
-> choose Kakashi Origin
-> choose that exact developed Kakashi as the one Forbidden Ninja carry
-> Start Review shows the source Chronicle + core developed snapshot
-> player selects any separately allowed additional inheritance
-> prior earned covert_operations.assassin qualification may carry as inherited specialist competence
-> current Chronicle formal Rank remains whatever the new Chronicle legitimately holds; it is NOT made Jōnin/Kage by the card
-> choose two basic starter items
-> My Clan Start Staging
-> BEGIN ORIGIN
```

During a later lethal decision, Assassin competence may improve the lethal resolver.

If the current target/context still leaves uncertainty, the button remains `ATTEMPT TO KILL`.

If the owning resolver can prove the exact lethal outcome deterministic from current committed state, presentation may expose `KILL`.

### Example C — Legacy Restart

```text
completed Chronicle A
-> LEGACY RESTART
-> Chronicle A becomes parent provenance
-> choose new difficulty / Origin
-> Start Review offers only Legacy-eligible entries
-> fresh World/Knowledge/relationship state
-> choose two starter items
-> My Clan Start Staging
-> BEGIN ORIGIN in Chronicle B
```

Chronicle A remains history; it is not silently copied into Chronicle B's current World.

---

## 18. Preserve

- New Start != Inheritance Carryover != Legacy Restart;
- one Start Manifest != three runtime engines;
- Forbidden Ninja != special card category;
- Forbidden Ninja = one source-playthrough ninja the player actually developed;
- exactly one Forbidden carry slot at the qualifying transition unless later authority explicitly changes this;
- selected representation != inherited development;
- Forbidden core snapshot != optional extra inheritance;
- representation Base PL != direct inheritance bonus;
- difficulty != Base mutation;
- prior/source card Rank descriptor != current Chronicle formal Rank;
- Kage card != Kage Rank;
- prior Rank != current Rank;
- qualification != Recognition != Rank;
- inherited competence != formal Rank;
- historical Chronicle != current World truth;
- player knowledge != actor Knowledge;
- ownership != assignment != deployment;
- My Clan START != protagonist;
- starter-item selection != Inventory ownership until committed;
- ATTEMPT TO KILL != KILL;
- KILL label != UI-owned death;
- resolver probability != deterministic outcome;
- inherited Assassin competence != guaranteed kill;
- Origin presentation != capability state automatically;
- save/load/UI refresh != reroll/recommit;
- design closed != implemented != runtime validated != Golden GREEN.

## 19. Implementation-ready fields still requiring owner returns

Before full Inheritance/Legacy runtime implementation, exact owner decisions are still required for:

- exact qualifying-transition rule for the standard one-slot Forbidden Ninja carry;
- source-playthrough ownership/development eligibility for the chosen Forbidden Ninja;
- exact inheritance-class/cap limits by difficulty/mode;
- starting roster ownership/bootstrap;
- persistent-development carryover list;
- Skill/Technique/Summon carryover states;
- specialist-qualification carryover representation;
- whether inherited qualification may ever satisfy current-Rank promotion evidence;
- starter-item pool;
- item/equipment carryover rules;
- exact lethal resolver modifier/preflight semantics;
- final Start Review / Start Staging UI;
- runtime persistence and browser validation.

These are not permission for Coding to invent missing domain semantics.

---

# Canonical summary

> **Every Chronicle starts from one committed Start Manifest. New Start uses no inherited development. At a qualifying difficulty transition, Inheritance Carryover gives the player one Forbidden Ninja carry slot: they choose one character they genuinely owned and developed in the source playthrough, and that exact provenance-backed developed character becomes their Forbidden Ninja in the new Chronicle — no special Forbidden card is generated. Additional inheritance remains separate. A high-rank/Kage card retains its legitimate representation/capability state but does not grant that formal Rank in the new Chronicle. Legacy Restart creates a new Chronicle linked to a prior Chronicle while still beginning from fresh World/Knowledge/relationship truth. All three receive two basic starter-item picks, then enter the existing My Clan surface for start staging before BEGIN ORIGIN. Inherited specialist competence may materially alter resolvers — including lethal resolution — but it never turns UI labels, prior Rank or prior history into new factual truth by implication.**
