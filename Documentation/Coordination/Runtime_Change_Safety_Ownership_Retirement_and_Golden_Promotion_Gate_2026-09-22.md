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

## 22A. Local workspace synchronization notification gate

Stephen's installed browser runs from his local working copy.

Therefore a GitHub merge/commit does **not** imply Stephen's local runtime has changed.

Every Coding / Runtime completion, merge, branch switch, release-candidate handoff, or browser-retest request must explicitly state one of:

`LOCAL SYNC: NOT REQUIRED`

or:

`LOCAL SYNC: REQUIRED`

If local sync is required, Coding must provide the exact safe terminal commands needed for Stephen's current situation.

At minimum, when production changes have merged to `main` and Stephen should test current `main`, the handoff must include a safe sequence equivalent to:

```bash
git status --short
git switch main
git pull --ff-only origin main
```

Do not blindly instruct `git reset --hard`, `git clean`, force checkout, or destructive stash operations.

If Stephen's working tree is not clean, Coding must stop and tell him what is locally modified before suggesting any destructive reconciliation.

After synchronization, Coding must state the expected local HEAD, for example:

`EXPECTED LOCAL HEAD: <sha>`

Before interpreting new browser screenshots as evidence against a newly merged fix, Coding should first confirm Stephen's local HEAD matches the candidate being discussed.

Canonical rule:

> **No browser retest request is complete without an explicit local-sync status and expected HEAD.**

And:

> **A browser complaint against an older local checkout must not be mistaken for evidence that the current GitHub candidate failed.**

This gate applies whether changes were:
- merged automatically by GitHub;
- merged manually;
- committed on a remote branch;
- rebased;
- delivered through a clean-room replacement.

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

### 24A. Presentation visual-property and lifecycle ownership clarification — 2026-09-23

This section clarifies the existing one-owner rule for player-facing presentation. It does **not** create a second architecture and does not re-enable animation.

Canonical presentation rule:

> **A player-facing element may have multiple readers/consumers, but only one active presentation owner for each visual-property or lifecycle responsibility at a time.**

“One responsibility -> one owner” does **not** mean “one file -> one responsibility.” A single shared module may legitimately own several separately registered responsibilities when the boundaries are explicit.

For presentation, distinguish at minimum:

- canonical DOM mount / unmount lifecycle;
- base layout / semantic stage anchor projection;
- temporary choreography transform / motion;
- temporary presentation-only visibility / focus state;
- hard-scene transition playback;
- Battle performance playback / result projection.

A semantic owner and a presentation owner are different responsibilities. Presentation may consume committed truth; presentation may not decide truth.

### 24A.1 Story Scene Board

`story.scene.presentation.shared` remains owned by:

`runtime/alpha-story-scene-board-33900.js`

Its presentation responsibilities include the shared Story surface, canonical shared layout/stage-anchor vocabulary and Scene Board lifecycle.

Origin-specific content/renderers may consume the shared Scene Board contract. They may not become second shared presentation owners by adding competing motion/lifecycle systems.

### 24A.2 Story choreography

Register:

`story.choreography.presentation.shared`

Canonical owner:

`runtime/alpha-story-scene-board-33900.js`

This is a distinct responsibility even though it shares the same module as `story.scene.presentation.shared`.

Current source already exposes the canonical choreography interface:

- `playStoryChoreography33900`;
- `cancelStoryChoreography33900`;
- `getStoryChoreographyState33900`.

The choreography responsibility owns presentation-only temporary actor/object motion, choreography-scoped transform, bounded opacity/filter emphasis where required, animation timing, cancellation, cleanup, reduced-motion projection and settle-to-current-anchor behavior.

It does **not** own:

- Story factual presence;
- Story outcome;
- participant death/escape/restraint/custody;
- package/object ownership;
- Knowledge;
- semantic beat advance;
- Battle result;
- reward.

CSS animation is allowed as an implementation mechanism **inside the canonical choreography responsibility**.

The prohibition is:

> **No CSS, renderer, transition adapter, timeout helper or Origin-specific module outside the canonical choreography owner may independently animate choreography-owned visual properties.**

A renderer may establish the canonical anchor/layout. The choreography owner may temporarily project motion relative to that canonical layout. On cancellation/completion it settles to the **current** canonical projection rather than a stale remembered coordinate.

### 24A.3 Semantic presence vs visual presentation

Preserve:

```text
semantic state -> canonical renderer projection -> optional presentation choreography
```

Example:

```text
semantic owner commits participant escaped
-> renderer's canonical settled projection no longer contains participant
-> choreography may present a bounded FLEE transition
```

The FLEE playback does not make the participant escape.

No semantic commit may wait for animation completion.

Refresh/save/load/re-entry may restore the settled current presentation without replaying or rerolling the fact.

### 24A.4 Shared Story hard-scene transition ownership — audit result

The 2026-09-23 source audit found that current Kakashi V2 hard-scene transition playback is **split**:

- `runtime/alpha-kakashi-v2-transition-36040.js` decides/steps Kakashi-specific transition timing/state through `playPostCommitTransition`;
- `runtime/alpha-kakashi-v2-renderer-36030.js` owns the Kakashi-specific document curtain DOM/CSS through `ensureGlobalCurtain`, `setGlobalCurtain` and `setWipe`.

That is acceptable only as current Kakashi-specific stabilisation history. It is **not** the project-wide shared transition ownership model and must not be promoted by inertia.

Design decision is now CLOSED:

`story.transition.presentation.shared`

**target canonical owner:**

`runtime/alpha-story-scene-board-33900.js`

Reason:

- 33900 is already the shared Story presentation infrastructure;
- hard-scene presentation is a Story presentation lifecycle responsibility;
- the shared module can own a document-level transition surface that survives individual Origin renderer teardown;
- keeping this responsibility in 33900 avoids inventing a new module solely for granularity;
- it prevents Kakashi-specific 36030/36040 behavior becoming accidental global architecture.

Implementation status:

**DESIGN CLOSED / RUNTIME MIGRATION PENDING.**

Until migration is complete, do **not** add `story.transition.presentation.shared` to the production responsibility list as though 33900 already owns live transition playback.

Required eventual migration:

- 33900 owns the one shared hard-scene transition surface/playback API;
- Origin-specific runtime supplies transition intent/context only;
- 36040 remains Kakashi-specific cue/semantic-advance adaptation and does not own shared transition playback;
- 36030 remains Kakashi Story DOM/layout projection and does not own a project-wide curtain;
- old Kakashi-specific competing transition playback is de-loaded/retired as a transition owner;
- negative QA proves no second hard-scene transition owner can execute.

This migration is an ownership consolidation. It is **not** permission to re-enable actor/card animation.

### 24A.5 Battle performance ownership

Current registry responsibility:

`battle.presentation.shared`

owned by:

`runtime/alpha-battle-modern-33000.js`

is already sufficiently specific for Alpha.

Its current source owns Formation Stage composition and exposes Battle performance projection/playback hooks including:

- `resolveBattlePerformanceProjection33000`;
- `installBattlePerformance33000`.

Therefore **do not create** `battle.performance.presentation.shared` merely for naming granularity.

For Alpha, `battle.presentation.shared` includes:

- Battle participant presentation layout;
- confrontation/performance focus;
- temporary Battle presentation motion when/if re-enabled;
- impact/result visual projection;
- participant-local result/PL/status presentation;
- settle to authoritative next Battle state.

Combat remains the semantic owner of legality, target, result, PL/runtime effects and next actor.

Future Battle motion is an `EXTENDS battle.presentation.shared` change unless evidence proves 33000 itself must be replaced.

### 24A.6 Alpha clone / ghost rule

Default for Alpha:

> **No presentation clone / ghost actor.**

A clone/ghost is permitted only after explicit approval that the required visual result cannot reasonably be achieved through the canonical actor/object node.

Any approved exception must be:

- owned by the same canonical presentation responsibility;
- presentation-only and non-semantic;
- unable to receive player input;
- unable to become the authoritative actor representation;
- occurrence/beat/turn scoped;
- bounded in lifetime;
- deterministically cleaned on completion/cancel;
- absent after save/load/re-entry;
- covered by negative stale-owner/cardinality QA.

Given the Kakashi layering incident, “temporary convenience ghost” is not sufficient justification.

### 24A.7 Mandatory negative QA before motion returns

Before Story actor/object motion is re-enabled in production, PASS must prove:

- exactly one choreography controller owns temporary actor/object motion;
- renderer owns canonical DOM/layout/anchors and does not independently animate choreography transform;
- shared transition owner does not animate actor choreography transform;
- Origin-specific adapters do not animate actors;
- CSS outside the canonical choreography responsibility does not independently animate choreography-owned properties;
- cancellation leaves actors/objects at the current canonical settled state;
- scene re-entry cannot resume stale motion;
- save/load cannot resume stale motion;
- reduced-motion path preserves identical semantic outcome;
- motion settles to the **current** canonical anchor;
- retired/stale choreography controller is unreachable;
- no semantic state waits for animation completion;
- no competing clone/ghost representation survives;
- duplicate ownership of transform / choreography opacity / temporary visibility / mount-unmount / hard-scene curtain fails deterministically where technically testable.

Before shared hard-scene transition migration is considered complete, PASS must additionally prove:

- exactly one production hard-scene transition owner;
- no Kakashi-specific curtain/transition engine can execute as a competing shared owner;
- same-environment presentation updates do not accidentally invoke hard-scene playback;
- Story -> Battle -> Story transition playback does not mutate Story/Battle truth;
- cancellation/re-entry leaves no stale document-level transition surface active.

### 24A.8 Future animation change classification

Re-enabling/improving Story card motion is normally:

```text
EXTENDS
story.choreography.presentation.shared
owner: runtime/alpha-story-scene-board-33900.js
```

If 33900's choreography implementation is proven structurally unsuitable:

```text
REPLACES
story.choreography.presentation.shared
```

The responsibility ID remains stable.

The old implementation must be de-loaded/retired and negatively proven unreachable.

Do not create a helper/fallback/final-v2 stack beside it.

Battle motion follows the same rule under `battle.presentation.shared`.

### 24A.9 Current status

This clarification changes ownership authority and registry description only.

It does **not**:

- re-enable Story animation;
- re-enable Battle animation;
- alter Story text/choices;
- alter Battle semantics;
- alter PL/rewards;
- alter Origin routes;
- promote Kakashi 36040 to shared transition owner;
- author a new transition effect.

Current static/stabilised presentation remains current runtime behavior until a separately authorised Coding change implements the clarified ownership safely.

---

# 25. Rollout order

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
