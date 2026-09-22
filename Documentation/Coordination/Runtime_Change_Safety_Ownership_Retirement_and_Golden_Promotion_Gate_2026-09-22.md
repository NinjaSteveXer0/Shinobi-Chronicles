# Shinobi Chronicles — Runtime Change Safety, Ownership, Retirement and Golden Promotion Gate

**Date:** 2026-09-22  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING PROJECT-WIDE CODING SAFETY AUTHORITY — ACTIVE**  
**Source:** #299  
**Standing Coding authority extended:** #219  
**Benchmark:** Academy Kakashi V2 clean-room runtime  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA WITHOUT RECREATING KAKASHI-ERA LAYERING DEBT**

---

## 1. Purpose

Academy Kakashi exposed a recurring failure mode:

```text
correct new behavior added
-> prior owner stays live
-> compatibility/adapter layer added
-> later patch outranks rather than replaces
-> tests validate newest layer
-> installed browser still executes stale or duplicate behavior
```

This gate exists to stop that class of failure from recurring.

It converts earlier Coding guidance into mandatory **pre-change**, **replacement**, **runtime**, **regression**, and **Golden-promotion** checks.

This document extends, rather than replaces:

- #219 Mandatory execution / consolidation / anti-stall charter;
- Coding scope-locality / minimal-inspection addendum;
- checkpoint / timeout recovery / legacy retirement protocol;
- long-session Origin consolidation / surgical replacement protocol;
- Academy Origin Writing-to-Coding one-pass benchmark.

---

## 2. Core rule

> **A replacement is not complete because newer code exists. A replacement is complete only when the superseded owner is no longer capable of controlling production behavior and the successor passes with the superseded owner absent.**

And:

> **One runtime responsibility -> one production owner.**

Load order is not ownership.

"Newest file wins" is not an architecture.

CSS suppression of a second renderer is not sufficient if the second renderer remains semantically active or can reappear.

---

## 3. Runtime responsibility registry

Coding must maintain one machine-readable registry of production responsibilities.

Minimum fields per responsibility:

```text
responsibilityId
canonicalOwner
ownerType
directCallers[]
stateReads[]
stateWrites[]
productionLoadPath[]
extensionHooks[]
permittedAdapters[]
retiredOwners[]
saveSchemaRefs[]
qaRefs[]
```

Examples of responsibilities:

- Story scene lifecycle;
- Story dialogue/narration DOM;
- Story choice DOM;
- Story -> Battle caller;
- Battle -> Story return;
- Objective projection;
- package custody;
- participant custody;
- reward commit;
- Chronicle Receipt;
- Origin completion;
- save/load serialization;
- Battle action presentation.

A registry entry is not merely documentation. CI/diagnostics should consume it where practical.

---

## 4. Mandatory runtime change declaration

Every substantive Coding change must be classified as exactly one of:

### NEW

Creates a genuinely new responsibility.

Must name:

- responsibility ID;
- owner;
- caller;
- state touched;
- production loader;
- QA.

### EXTENDS

Adds behavior to an existing canonical owner.

Must not create a second owner for the same responsibility.

### REPLACES

Supersedes an existing owner.

Must name:

- canonical successor;
- exact owner(s) being replaced;
- dependencies to migrate;
- loader removal;
- save/schema compatibility;
- negative regression proving replaced owner is absent/unreachable.

An unclassified "patch" is not an acceptable production change.

---

## 5. Replacement / retirement gate

A `REPLACES` change is incomplete until all are true:

1. replacement responsibility is explicit;
2. old owner is identified;
3. legitimate callers/dependencies are mapped;
4. required behavior is migrated;
5. old owner is removed from the production load path;
6. successor is tested with old owner genuinely absent;
7. production diagnostics prove the retired owner is unreachable;
8. obsolete module is deleted or tombstoned when safe;
9. save/load compatibility is proven;
10. broad relevant regression is GREEN.

Do not keep an obsolete runtime loaded "just in case".

If a compatibility reader is required for old saves, it must be a **reader/migrator only**, not a second active semantic writer.

---

## 6. Legacy exclusion gate

Every major replacement must provide **negative assertions**, not only positive successor tests.

Examples:

- retired runtime filename is absent from active loader;
- retired global symbol does not exist;
- retired resolver registration is absent;
- retired DOM root cannot mount;
- retired CSS owner is absent;
- retired reward writer cannot commit;
- retired state writer cannot execute.

The Kakashi V2 `qa_kakashi_v2_legacy_exclusion.js` model is the benchmark.

Canonical rule:

> **Prove the old thing cannot run, not merely that the new thing can.**

---

## 7. Single visible-owner gate

For a player-facing surface, "one owner" means one actual runtime output path.

For each presentation responsibility QA should verify, where practical:

- exact expected root cardinality;
- exact visible text-surface cardinality;
- exact active choice-deck cardinality;
- no sibling legacy renderer;
- no duplicate click/advance handler;
- no duplicate transition owner;
- no duplicate Objective projection;
- no stale panel after mode transition/save-load/return.

Example:

```text
dialogue cue
-> exactly one visible dialogue surface
-> exactly one advance path
```

A hidden second renderer is technical debt unless it is explicitly required by another mode and cannot become active concurrently.

---

## 8. No ownership by CSS suppression

CSS may style or hide mode-specific descendants inside one canonical renderer.

CSS must not be used as the primary safety mechanism for two active competing renderers.

If correctness depends on:

```text
old renderer creates UI
+ new renderer creates UI
+ CSS hopes old renderer stays hidden
```

the ownership model is still unresolved.

Preferred order:

```text
semantic source
-> canonical renderer decision
-> one DOM path
-> CSS presentation
```

not:

```text
two DOM paths
-> CSS arbitration
```

---

## 9. Adapter / compatibility budget

Temporary adapters are allowed only when unavoidable.

Every adapter must declare:

```text
adapterId
reason
owner
sourceOwner
targetOwner
exact behavior bridged
retirementCondition
deadline/milestone
qaRef
```

An adapter without a retirement condition is prohibited.

Adapters may translate.

Adapters may not become untracked semantic owners.

If a temporary adapter survives two major implementation milestones, it must be reviewed as architectural debt.

---

## 10. Duplicate-owner detection

Where technically feasible, CI/diagnostics must fail on:

- two production modules claiming the same responsibility ID;
- two render lifecycle roots for one surface;
- duplicate resolver binding for the same semantic action ID;
- duplicate wrapper replacement of the same global without an explicit chain;
- duplicate event listener ownership for one semantic action;
- duplicate loader activation;
- old and new reward/state writers both active;
- old and new save serializers both writing the same semantic field.

Do not depend on runtime load order to pick a winner.

---

## 11. Production load manifest and parity

Maintain one machine-readable production load manifest, or equivalent generated diagnostic, that answers:

- what modules are loaded;
- in what order;
- which responsibilities each owns;
- active generation/version;
- retired modules that must be absent.

Tests must validate the same load graph the browser/release uses.

Before Golden promotion:

> **tested load graph == production load graph**

No hidden newer branch, stale local file, or alternate loader may be treated as production proof.

---

## 12. Branch / checkpoint discipline

Before risky consolidation:

- record exact base HEAD;
- use coherent checkpoint commits;
- keep one active implementation line;
- avoid long-lived hidden branches diverging hundreds of commits from `main`;
- merge/rebase current authority before final proof;
- record rollback point;
- do not browser-test a mixed generation.

If work needs a clean-room branch, its merge criteria must be explicit from the start.

---

## 13. Clean-room rewrite trigger

Incremental repair is preferred while ownership remains understandable.

A clean-room replacement should be considered when evidence shows one or more of:

- multiple competing live owners for the same responsibility;
- patch ordering materially determines correctness;
- old/new state models are interwoven enough that safe retirement cannot be proven locally;
- browser behavior cannot be predicted from current source ownership;
- every fix requires another compatibility override;
- owner graph cannot be reduced without widespread special cases;
- tests repeatedly pass while installed browser exposes stale execution.

A clean-room rewrite is not permission to redesign semantics.

It must:

- consume current durable behavior authority;
- preserve stable external IDs where required;
- isolate semantic/state/presentation responsibilities;
- exclude legacy execution explicitly;
- provide migration/save compatibility;
- prove route parity;
- retire old production load path.

Academy Kakashi V2 is the benchmark example.

---

## 14. Scope / file-touch safety

Bug-fix and stabilization tranches remain scope-local.

Before editing:

```text
expected owner
expected direct caller(s)
expected competitor(s)
expected files touched
```

Expansion beyond that path requires evidence.

Do not use a bug as permission for unrelated refactoring.

Do not use "cleanup" as permission to rewrite working systems.

---

## 15. State writer exclusivity

For every durable semantic field, exactly one current authority path should commit it per occurrence family.

Examples:

- package holder;
- participant custody;
- reward grant;
- Origin completion;
- Story decision receipt;
- Battle return result.

Multiple readers are acceptable.

Multiple writers require explicit arbitration/migration authority.

No silent dual-write.

---

## 16. Save/schema replacement safety

When changing a state owner:

- identify persisted fields;
- identify existing save versions;
- define migration or compatibility reading;
- write migrated form once;
- do not reroll committed outcomes;
- do not duplicate grants;
- do not resurrect retired fields into current authority;
- terminate compatibility reader when retirement condition is met.

A compatibility migration must never become a second semantic runtime.

---

## 17. Presentation refresh safety

Preserve:

> **presentation refresh != semantic recommit**

A render/re-render must not:

- re-run a resolver;
- grant a reward;
- reroll an event;
- change package custody;
- change participant custody;
- advance Story;
- create another occurrence.

Presentation consumes committed state.

---

## 18. Event/listener ownership

Every semantic player action should have one authoritative event path.

Guard against:

- duplicate click listeners;
- both native and overlay buttons committing the same action;
- wrapper chains where several owners call the previous implementation;
- MutationObservers that mutate semantic state;
- timeout/requestAnimationFrame callbacks that re-run transitions.

Visual animation callbacks may project committed facts.

They may not become hidden semantic execution paths.

---

## 19. Post-incident regression rule

Every confirmed installed-browser defect caused by stale/duplicate/conflicting ownership must produce one of:

- exact focused regression;
- reusable architecture invariant;
- negative legacy-exclusion assertion;
- production-load parity assertion.

The fix is incomplete until QA has learned the lesson.

---

## 20. Writing -> Coding stability

Normal Origin implementation begins only after:

- Writing package complete;
- route manifest complete;
- player-facing wording approved;
- resolver/Battle seams explicit;
- no implementation-critical TBD.

After Coding starts, Writing changes are bounded deltas.

Do not rebuild semantic ownership around moving Story authority.

---

## 21. Pre-merge safety checklist

Before merging a substantive runtime change:

- [ ] change classified NEW / EXTENDS / REPLACES;
- [ ] canonical responsibility owner known;
- [ ] direct callers known;
- [ ] state reads/writes known;
- [ ] production loader updated;
- [ ] replaced owner de-loaded if applicable;
- [ ] legacy exclusion assertion added if applicable;
- [ ] save/schema compatibility proven;
- [ ] focused QA GREEN;
- [ ] directly affected route GREEN;
- [ ] relevant shared regression GREEN;
- [ ] production load parity GREEN;
- [ ] no unresolved duplicate owner;
- [ ] no temporary adapter without retirement condition.

A failed checkbox blocks merge unless explicitly waived by CE for a documented Alpha reason.

---

## 22. Pre-browser / Golden safety checklist

Before Stephen is asked to validate:

- [ ] exact candidate HEAD identified;
- [ ] candidate merged/rebased against current authority;
- [ ] canonical-owner audit GREEN;
- [ ] legacy/stale-owner exclusion GREEN;
- [ ] production load parity GREEN;
- [ ] save/load/idempotence GREEN;
- [ ] route matrix GREEN;
- [ ] DOM/output cardinality GREEN on changed presentation surfaces;
- [ ] focused browser automation GREEN where available;
- [ ] broad Alpha regression GREEN;
- [ ] known Coding-owned blockers = 0.

Stephen's installed-browser play remains final experiential acceptance.

But Stephen should validate a release candidate, not discover basic duplicate-owner defects that deterministic QA can prove.

---

## 23. Periodic debt checkpoint

At these milestones:

- completion of an Origin;
- completion of a major shared runtime subsystem;
- before propagating a shared runtime to multiple Origins;
- before Alpha Golden freeze;

run a short inventory of:

- active owners;
- retired owners still referenced;
- adapters;
- compatibility readers;
- wrapper chains;
- duplicate DOM roots;
- duplicate event listeners;
- save migrations awaiting retirement;
- dead modules still in production load.

Any unresolved item is classified:

- Alpha blocker;
- bounded temporary debt with retirement condition;
- post-Alpha debt.

---

## 24. Kakashi V2 benchmark

As of 2026-09-22, Academy Kakashi V2 demonstrates the intended pattern:

- clean-room content/core/Battle/reward/renderer/transition modules;
- one Story DOM owner in `alpha-kakashi-v2-renderer-36030.js`;
- base Story siblings suppressed while V2 owns the scene;
- old Kakashi production execution excluded by `qa_kakashi_v2_legacy_exclusion.js`;
- core/state and Battle adapter forbidden from Story DOM ownership;
- renderer cardinality assertions;
- installed-browser Playwright workflow;
- full route matrix;
- exact-tested branch merged to `main`.

Kakashi V2 is a benchmark for safety architecture.

It is not permission to rewrite every future Origin from scratch.

Prefer the proven shared runtime plus clear Origin content/adapters.

---

## 25. Rollout order

1. Keep Kakashi V2 stable.
2. Implement automated safeguards from this contract.
3. Apply registry/load/legacy-exclusion gates to shared Origin runtime.
4. Validate one remaining Origin through the Writing-to-Coding benchmark.
5. Confirm safeguards catch deliberately introduced duplicate-owner fixtures/tests.
6. Propagate to remaining Origins.
7. Run periodic debt checkpoint before #105 10/10 Golden.

---

# Final lock

> **No production change may rely on a newer layer merely outranking an older one. New authority must either extend the canonical owner or replace the prior owner through an explicit retirement gate. Production QA must prove both that the successor works and that the superseded path cannot run. Player-facing surfaces must have one actual output owner, not multiple renderers arbitrated by load order or CSS.**
