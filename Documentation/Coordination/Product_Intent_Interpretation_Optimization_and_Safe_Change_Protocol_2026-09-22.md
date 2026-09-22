# Shinobi Chronicles — Product Intent Interpretation, Optimization and Safe Change Protocol

**Date:** 2026-09-22  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING PROJECT-WIDE DEVELOPMENT PROTOCOL — ACTIVE**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA WITHOUT TURNING DESIGN EVOLUTION INTO PATCH LAYERS**

---

## 1. Why this exists

Shinobi Chronicles is being designed and implemented at the same time.

Stephen owns the game direction, taste and final player-facing judgement. Specialists and Coding own the obligation to translate that direction into a technically sound, maintainable implementation.

A recurring failure mode has been:

```text
Stephen describes the desired result
-> specialist implements the wording too literally
-> technically correct but weak/awkward behavior reaches browser
-> Stephen sees the real result and asks for an improvement
-> improvement is stacked over old implementation
-> another exception/adapter appears
-> old behavior remains live
-> project later spends days removing the layers
```

This protocol changes that relationship.

Canonical rule:

> **Stephen is not required to anticipate implementation hazards, hidden dependencies, stale owners, architectural debt, UX side-effects or the best technical shape of a feature before asking for it.**

And:

> **Specialists must translate product intent into the strongest implementation they can justify, not merely execute the most literal reading of the prompt.**

---

## 2. Roles

### Stephen owns

- product direction;
- desired player experience;
- subjective quality;
- taste;
- priorities;
- approval of meaningful player-facing alternatives;
- final acceptance.

### Specialists own

- expert interpretation inside their domain;
- identifying contradictions / hidden costs;
- proposing stronger implementation;
- warning when a literal reading will create a worse result;
- preserving durable authority;
- detecting architecture/ownership hazards;
- routing genuine cross-owner conflicts.

### Coding owns

- technical implementation;
- canonical-owner selection;
- dependency mapping;
- migration/retirement;
- regression protection;
- save/load safety;
- production load parity;
- technical optimization that does not change approved semantics.

Stephen should not have to tell Coding how to avoid stale renderers, duplicate writers, bad adapters, loader drift, save-schema conflicts or inefficient architecture.

---

## 3. Intent before implementation

Before substantive implementation, the owner must extract three layers:

### A. Locked intent

What result must remain true?

Examples:
- player can restrain after a valid Battle victory;
- actor must visibly appear in a scene;
- package remains with exact holder;
- Battle should feel impactful;
- dialogue must preserve approved meaning/voice.

### B. Flexible implementation

What Stephen did **not** lock?

Examples:
- exact DOM structure;
- helper function names;
- module count;
- layout algorithm;
- animation implementation;
- internal state representation;
- which canonical shared owner should implement it.

### C. Risks / improvement opportunities

Before coding, explicitly consider:
- does literal implementation create duplicate ownership?
- is an existing owner better extended?
- does this supersede something that must retire?
- is this reusable across Origins?
- will it create save/schema migration?
- can this produce awkward UX even if technically correct?
- is there a simpler/cleaner implementation?
- will the result create another special case?

Do this analysis proactively.

---

## 4. Constructive interpretation rule

If Stephen says:

> "Make X do Y"

the specialist must not assume:

> "implement the first literal mechanism that produces Y."

Instead:

```text
desired player result
-> current authority
-> current architecture
-> best safe implementation
-> identify any meaningful tradeoff
-> execute
```

If the better implementation preserves Stephen's intent and does not introduce a subjective product decision, the specialist may choose it without asking Stephen to design the mechanism.

If the better implementation materially changes player-facing behavior, cost/scope, or a locked rule, surface the alternative for Stephen's decision first.

---

## 5. Mandatory challenge trigger

A specialist should challenge or modify the literal implementation when it would likely create:

- duplicate runtime ownership;
- another overlay/adapter where canonical owner can be changed;
- hardcoded one-off behavior that should be shared;
- stale code left active;
- fragile load-order dependence;
- save-schema dual writing;
- unnecessary UI complexity;
- visibly weak/awkward UX;
- repeated manual work that can be data-driven;
- architecture that will be multiplied across remaining Origins;
- a future cleanup debt larger than the present convenience.

This is an application of the standing constructive-disagreement rule.

---

## 6. Change classification before editing

Every meaningful mid-development change must be classified:

### TUNE

Same semantics, same owner, small bounded adjustment.

Examples:
- spacing;
- timing;
- wording typo;
- numerical presentation polish.

Action:
- edit canonical owner;
- focused regression.

### EXTEND

Adds legitimate behavior to an existing owner without replacing its responsibility.

Action:
- extend canonical owner;
- prove no competing owner.

### REPLACE

The old implementation is no longer the intended implementation.

Action:
```text
identify old owner
-> map legitimate dependencies
-> implement successor
-> migrate dependencies
-> de-load old owner
-> prove successor with old absent
-> delete/tombstone old implementation
```

### REDESIGN / CONTRACT CHANGE

The player-facing meaning or system contract changes materially.

Action:
- stop implementation on the affected responsibility;
- close the new authority;
- create migration plan;
- replace rather than layer.

Canonical rule:

> **A design change must not be implemented as a patch if it actually replaces the previous design.**

---

## 7. No "temporary forever" rule

If a temporary shim/adapter is genuinely needed, it must have:

- owner;
- exact reason;
- exact dependency;
- retirement condition;
- QA;
- milestone/date/event when it will be reviewed.

No unlabeled temporary adapter.

No compatibility behavior without an exit.

---

## 8. Player-experience preflight

For player-facing features, before broad implementation ask:

1. What will the player actually see?
2. What will the player believe is happening?
3. What is the intended emotional/readability effect?
4. Does the proposed implementation communicate that clearly?
5. Is the interaction cumbersome, overly literal or visually flat?
6. Does it look like one coherent game rather than multiple systems stitched together?
7. Does a better presentation fit the same locked semantics?

This does not mean delaying every feature for subjective perfection.

It means catching obvious "technically correct but obviously not what we really want" outcomes earlier.

---

## 9. Representative preview rule

For a new reusable player-facing presentation system or a major redesign:

- implement one representative canonical slice first;
- use the real shared owner;
- no disposable patch/prototype layer;
- prove the architecture and player experience;
- Stephen reviews the slice;
- then scale the accepted owner/pattern.

This is appropriate for:
- shared Battle presentation;
- Story Scene Board;
- new Origin presentation templates;
- major UI surfaces.

It is **not** permission to implement an entire Origin scene-by-scene while Writing is still changing.

Writing authority must still be stable before normal Origin implementation.

---

## 10. Specialist "second-order" review

Before declaring a task complete, specialists must ask:

> **What did Stephen not explicitly ask about that a competent owner should still verify?**

Examples:

### Writing
- actor continuity;
- voice consistency;
- branch leakage;
- causal continuity;
- implementation clarity.

### UI
- responsive behavior;
- safe zones;
- visual hierarchy;
- consistency with adjacent states.

### Coding
- old owner retirement;
- duplicate listeners/renderers;
- loader parity;
- save/load;
- idempotence;
- regression;
- dead code;
- performance-sensitive repeated work.

### Combat
- interaction with existing action economy;
- AI/legal target edge cases;
- Battle return semantics.

### CE
- cross-owner collisions;
- terminology;
- future reuse;
- semantic non-collapse.

Stephen should not need to enumerate these each time.

---

## 11. "Looks wrong in browser" is useful evidence, not a specification failure

When Stephen says:

- "this looks shit";
- "this feels wrong";
- "this is too literal";
- "this isn't what I imagined";
- "this works but it isn't good";

do not treat that as Stephen failing to specify the implementation.

Treat it as experiential acceptance evidence.

Then determine:

- presentation defect;
- UX interpretation failure;
- Writing quality issue;
- architecture issue;
- genuine design change.

Fix the correct owner.

Do not automatically stack another patch.

---

## 12. Browser feedback change-control loop

When browser feedback changes direction:

```text
feedback
-> classify TUNE / EXTEND / REPLACE / REDESIGN
-> identify canonical owner
-> identify what becomes obsolete
-> implement change
-> retire obsolete behavior
-> regression
-> browser candidate
```

The required question is:

> **What old behavior is no longer supposed to exist after this change?**

If the answer is non-empty, retirement is part of the task.

---

## 13. Optimization authority

Coding may proactively optimize implementation without Stephen approval when all are true:

- player-facing semantics do not change;
- durable authority is preserved;
- save/load remains compatible;
- tests remain meaningful;
- optimization reduces duplication, complexity or risk;
- no new hidden system is created.

Examples:
- consolidate duplicate helpers;
- data-drive repeated route mapping;
- remove dead adapter;
- reduce redundant renders;
- use one shared lifecycle owner.

Coding should comment meaningful structural changes, but Stephen does not need to approve every internal optimization.

---

## 14. Escalation threshold

Ask Stephen before implementation when the proposed improvement would materially change:

- what choices the player sees;
- narrative outcome;
- visual/art direction;
- Battle mechanics;
- reward balance;
- scope;
- game difficulty;
- player-facing terminology;
- a previously approved subjective design.

Do not ask Stephen to choose between two internal implementation details unless the tradeoff affects the product.

---

## 15. Completion evidence

A substantive task is not complete merely because requested behavior exists.

Completion also requires appropriate proof that:

- no superseded owner remains active;
- adjacent working behavior remains intact;
- relevant save/load behavior is stable;
- production loader uses the tested implementation;
- new implementation is not dependent on accidental load order;
- expected player-facing result is coherent enough for Stephen to judge.

---

## 16. Relationship to Alpha speed

This protocol is intended to make Alpha faster.

It does **not** require:
- large design documents for trivial fixes;
- Stephen approval for internal refactors;
- perfection before showing work;
- speculative architecture.

Use proportional effort.

The goal is to stop expensive second-week rewrites caused by first-day literal implementations.

---

# Final lock

> **Stephen defines the game he wants to play; specialists are responsible for translating that intent into robust architecture and strong implementation. Do not require Stephen to foresee engineering hazards or specify every optimization. Before implementing literally, identify the intended result, the existing canonical owner, the stronger safe implementation and anything that must retire. When browser feedback changes the design, classify the change and replace obsolete behavior instead of stacking another layer.**
