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

This is the mode that supports a player deliberately taking an out-of-band character representation into another difficulty.

Example:

> A player selects **Jōnin Kakashi** as a permitted **Forbidden Ninja** for a Genin-difficulty Chronicle, then chooses which additional eligible inherited development from that prior Kakashi is carried into the new Chronicle before starting Kakashi's Origin.

### 4.1 Forbidden Ninja

`Forbidden Ninja` is an explicit start exception, not a hidden normalization rule.

When a difficulty/start policy permits it:

- one otherwise out-of-band representation may be selected as `selectedStartRepresentationRef`;
- the chosen representation retains its own canonical Base identity / Base Stats / Base PL;
- difficulty must not silently rewrite that representation's Base state merely to make it look like an ordinary lower-stage start;
- encounter/world difficulty may still apply through its own legitimate difficulty systems;
- the Start Review must visibly identify that the run is using a Forbidden start exception.

Preserve:

> **difficulty != Base mutation**

> **Forbidden representation != automatic inheritance of every prior-run fact**

The selected representation is the starting representation. Additional prior-run development is imported only through explicit inheritance entries.

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

- whether Forbidden Ninja is allowed;
- how many Forbidden representation slots exist;
- permitted inheritance classes;
- optional caps on transferred development/assets;
- whether specific high-impact capability classes are blocked;
- whether Legacy Restart receives broader eligibility than ordinary Inheritance Carryover.

This contract intentionally does **not** invent numeric carryover budgets.

Those values must be authored by the relevant difficulty/Progression/Acquisition owners.

Canonical rule:

> **difficulty may constrain eligibility; it must not silently mutate committed inherited truth**

If a Jōnin Kakashi representation is allowed into Genin difficulty, it remains Jōnin Kakashi's canonical representation state rather than being secretly rewritten into Academy/Genin Base Stats.

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
   - Forbidden Ninja status where applicable.

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

Changing difficulty, Origin, donor, Forbidden representation or inheritance selection before confirmation must rebuild the uncommitted preview rather than mutate an already committed manifest.

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
- Forbidden Ninja eligibility/source;
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

- Forbidden Ninja cross-difficulty starts;
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

### Example B — Inheritance Carryover / Forbidden Kakashi

```text
Genin difficulty
-> choose Kakashi Origin
-> select Jōnin Kakashi as permitted Forbidden Ninja
-> eligible prior Kakashi development is offered as inheritance candidates
-> player selects allowed carried entries
-> prior earned covert_operations.assassin qualification is carried as inherited specialist competence
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
- selected representation != inherited development;
- representation Base PL != direct inheritance bonus;
- difficulty != Base mutation;
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

- Forbidden Ninja eligibility rules by difficulty;
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

> **Every Chronicle starts from one committed Start Manifest. New Start uses no inherited development. Inheritance Carryover selectively imports provenance-backed character development and may permit one explicit Forbidden representation without mutating its Base state. Legacy Restart creates a new Chronicle linked to a prior Chronicle while still beginning from fresh World/Knowledge/relationship truth. All three receive two basic starter-item picks, then enter the existing My Clan surface for start staging before BEGIN ORIGIN. Inherited specialist competence may materially alter resolvers — including lethal resolution — but it never turns UI labels, prior Rank or prior history into new factual truth by implication.**
