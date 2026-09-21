# Shinobi Chronicles — Academy Origin Writing-to-Coding One-Pass Production Benchmark

**Date:** 2026-09-21  
**Owner:** CE / Codex / Coordination with Writing / Story — Konoha and Coding / Runtime as consumers  
**Status:** **BINDING ALPHA ORIGIN PRODUCTION BENCHMARK — ACTIVE FOR ALL ACADEMY ORIGINS**  
**Benchmark source:** Academy Kakashi Origin completion campaign  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

Academy Kakashi proved two things at the same time:

1. a deeply branching Origin can be made source/integration-complete when Writing authority is complete and Coding receives one finite route target; and
2. repeatedly handing Coding partial/evolving Story fragments creates unnecessary patch layers, stale-owner collisions, browser regressions and rework.

The remaining Academy Origins must therefore use a cleaner production model.

Canonical rule:

> **Writing authors the complete Origin scene-by-scene and makes every transition, resolver, state write and branch explicit. Coding receives one implementation-ready Origin package and implements/consolidates it as one sustained completion campaign.**

This is the benchmark for:

- Academy Hinata;
- Academy Izuno / Wasabi;
- Academy Mirai;
- Academy Menma;
- Academy Kushina;
- Academy Kurenai;
- Academy Iwabee;
- Academy Metal Lee;
- Academy Obito;

and any future Academy Origin unless a demonstrably superior workflow is approved.

Kakashi remains the benchmark implementation lineage, not a requirement that every Origin have Kakashi's complexity.

---

## 2. Important process correction

Do **not** copy the oldest Kakashi production mistake:

`Writing one scene -> Coding patches it -> Writing changes later branch -> Coding adds another layer -> browser finds stale owner -> another patch`.

The required workflow is now:

```text
Writing source-first recovery
-> complete Origin scene architecture
-> author scenes in order
-> Stephen reviews exact player-facing material in coherent tranches
-> durable scene authority
-> complete branch / state / resolver manifest
-> Writing declares ORIGIN IMPLEMENTATION PACKAGE COMPLETE
-> one clean Coding handoff
-> Coding one-pass implementation + consolidation
-> deterministic full-route traversal
-> consolidated installed-browser acceptance
```

Writing may still draft and review one scene at a time where that is useful.

But **Coding should not begin normal implementation while the Origin package is still materially changing** unless Stephen explicitly authorises an early vertical slice.

---

## 3. Definition of “scene-by-scene”

“Scene-by-scene” means every player-facing Story scene has an explicit production record.

It does not mean every sentence needs its own file.

A scene is the smallest coherent Story unit with:

- one factual entry state;
- one presentation environment;
- one objective context;
- one performance sequence;
- zero or more player decisions;
- zero or one externally owned resolver transition at a given decision boundary;
- explicit successor mapping.

Connected micro-beats may live in one scene package where that is clearer.

---

## 4. Mandatory scene implementation schema

Every Origin scene handed to Coding must expose the following fields.

### 4.1 Identity

- **Origin ID**
- **Scene ID**
- **Beat IDs / cue IDs**
- **Parent branch ID**
- **Stable child branch IDs**
- **authority version / commit**

Player-facing wording must never be the only semantic identity.

### 4.2 Entry facts / predicates

State exactly what must already be true for the scene to exist.

At minimum, where relevant:

- current location;
- present participants;
- package/object holder;
- participant life/custody state;
- Battle result;
- pursuit result;
- resolver result;
- Knowledge;
- relationship/history facts;
- Pakkun/Summon/Hosted-Entity presence;
- current objective;
- prior branch identity.

Do not make Coding reverse-engineer entry state from prose.

### 4.3 Backdrop / environment

- exact approved backdrop/environment ID;
- exact repository asset path where fixed;
- day/night or other authored state;
- whether transition uses black wipe or another approved transition.

No invented substitute asset.

### 4.4 Actors / presentation

For every materially visible participant:

- stable actor/entity ref;
- observer-safe display label;
- portrait/card asset;
- intended presence;
- important role/position relationship where presentation requires it.

Do not leak hidden identity merely because runtime knows the Entity.

### 4.5 Objective

State:

- objective on entry;
- exact change point;
- objective after change.

Objective projection reads committed Story state; it does not create facts.

### 4.6 Narration

Exact Stephen-approved player-facing narration where locked.

Narration is not a resolver log.

### 4.7 Dialogue

Exact Stephen-approved dialogue with:

- speaker semantic ID;
- speaker display name where observer-safe;
- cue order.

Approved dialogue is verbatim authority and may not be rewritten by Coding.

### 4.8 Choices

For each choice:

- stable semantic choice ID;
- exact player-facing wording;
- eligibility predicate;
- immediate protagonist intent;
- successor resolver/transition owner;
- exact next scene family after each authorised result.

Button text != factual outcome.

### 4.9 System / Resolver seam

This field is mandatory.

State one of:

- exact named resolver;
- exact PL Battle package;
- exact travel transition;
- exact acquisition/inventory transaction;
- exact disposition/custody transition;
- exact Progression/development producer;
- exact deterministic Story occurrence;
- **None**, only after verifying no external owner is required.

For a resolver/Battle seam, specify:

- owner;
- caller identity;
- required inputs;
- possible result family;
- result provenance;
- exact Story return target.

Do not hard-script an outcome that belongs to another system.

### 4.10 Factual writes

List exactly what the scene itself commits.

Examples:

- intent occurrence;
- package custody;
- participant position;
- Knowledge;
- Shared History;
- field restraint;
- institutional custody;
- deliberate release;
- participant death where Story owns a deterministic post-Battle kill;
- objective-state change.

If the scene does not own a fact, do not list it as a write.

### 4.11 Factual reads

List important committed facts this scene consumes.

This prevents Coding from inventing state from choice labels or previous screen text.

### 4.12 Outcome / successor table

Every resolver result and meaningful factual variation must map somewhere.

Use an explicit table such as:

```text
RESULT / STATE
-> NEXT SCENE ID
-> OBJECTIVE
-> PARTICIPANT STATE
-> OBJECT STATE
-> NOTES
```

No approved result may terminate in “TBD”.

### 4.13 Battle contract where applicable

Writing does not own Combat numbers, but the scene must expose:

- exact participants;
- team composition;
- caller;
- Story purpose;
- Battle win return;
- Battle loss return;
- whether turn count matters;
- what Battle result does **not** imply.

Preserve:

- Battle victory != death;
- Battle victory != custody;
- Battle victory != package recovery;
- Battle loss != participant death automatically.

### 4.14 Rewards / development seam

Where the route creates a reward/development entitlement, identify:

- source occurrence;
- owning reward/development contract;
- grant timing;
- what result qualifies;
- whether the scene merely projects the reward later.

Do not invent generic Character EXP.

### 4.15 Save/load / idempotence identity

Identify the stable occurrence/branch identity that must survive save/load.

Mark any one-shot transition/grant that must not recommit.

### 4.16 Terminal / Receipt contribution

State what this scene contributes to later:

- ANBU/debrief report;
- evaluator judgement;
- Chronicle Receipt;
- reward predicates;
- future Knowledge/relationship/World eligibility.

Do not require the terminal system to infer history from button labels.

### 4.17 Prohibited inferences

Every scene package should state any especially dangerous non-collapse.

Examples:

- package held by PS != PS institutional custody;
- participant defeated != dead;
- participant restrained != ANBU custody;
- Pakkun present != player owns Pakkun;
- observing an event != knowing hidden identity;
- Battle won != mission complete.

---

## 5. Required Origin-level manifest

Writing must provide one complete implementation manifest before normal Coding begins.

The manifest must contain:

- all root scenes;
- all choice points;
- every stable branch ID;
- every resolver/Battle seam;
- every authorised success/failure result;
- every defeat scene;
- all meaningful factual variations;
- all reconvergence points;
- terminal state families;
- reward/development sources;
- Chronicle Receipt fields;
- Origin completion predicate;
- `YOUR CHRONICLE BEGINS` transition;
- exactly-two teammate boundary;
- first-Konoha transition;
- Academy free-play destination.

The manifest must be finite and machine-addressable enough for Coding to turn it into automated traversal.

---

## 6. Writing completion gate before Coding

Writing may declare:

**ORIGIN IMPLEMENTATION PACKAGE COMPLETE**

only when:

1. every current scene has the mandatory schema;
2. every player-facing dialogue/narration/choice change requiring Stephen approval has been approved;
3. every branch has a stable ID;
4. every branch has an explicit next state/scene;
5. every external resolver seam is named;
6. every resolver result has authored continuation;
7. Battle victory and defeat both have Story return authority where relevant;
8. package/participant/Knowledge state is explicit;
9. terminal ANBU/evaluation/Receipt expression is complete;
10. rewards/development sources are identified;
11. exact assets/backdrops are bound where required;
12. no current implementation-critical field is `TBD`;
13. superseded conflicting Story authority is clearly marked;
14. one Origin-level route manifest exists.

Writing complete != runtime implemented.

---

## 7. One clean Coding handoff

Once the Writing package is complete, send one implementation-ready handoff to Coding.

The handoff should not re-explain the entire project.

It must point Coding to:

- Origin manifest;
- exact scene files;
- exact current commits;
- relevant shared CE/Combat/Reward authority;
- exact asset inventory;
- any genuinely unresolved external dependency.

Canonical handoff instruction:

> **Implement the complete Origin against its route manifest. Do not invent missing prose, outcomes or ownership. Fix/replace canonical runtime owners rather than stacking route-specific patches.**

---

## 8. Coding one-pass implementation benchmark

Coding should copy the successful Kakashi **process**, not Kakashi's implementation debris.

For each new Origin:

1. establish one exact completion HEAD;
2. identify the shared Origin runtime owners already proven by Kakashi;
3. add only the Origin-specific adapter/content required;
4. avoid cloning Kakashi-specific modules where reusable neutral owners exist;
5. build a deterministic Origin route traversal from the Writing manifest;
6. implement all route families in one sustained campaign;
7. test save/load/idempotence at high-risk boundaries;
8. retire/de-load any superseded Origin-specific owner discovered;
9. run focused + shared regression;
10. only then request one consolidated installed-browser acceptance pass.

Do not repeat the Kakashi gen-by-gen patch archaeology.

---

## 9. Reuse vs Origin-specific code

Kakashi is the benchmark for shared runtime behavior such as:

- Scene Board;
- semantic choice binding;
- resolver dispatch;
- Story -> Battle -> same-Story return;
- factual state commit;
- reward/development receipt;
- Chronicle Receipt;
- Origin completion;
- teammate boundary;
- first-Konoha continuation;
- save/load/idempotence.

Do not copy Kakashi-specific:

- package actors;
- pursuit thresholds;
- Pakkun route;
- Kakashi-specific dialogue geometry;
- Kakashi participant dispositions;
- Kakashi terminal prose;
- Kakashi scene IDs.

New Origins should be **content/adapters over proven shared runtime** wherever the semantics are genuinely reusable.

---

## 10. Writing quality requirement

Implementation clarity does not justify robotic prose.

Writing must still follow the current Konoha Writing benchmark:

- characters behave like people;
- exact personality/voice;
- observer-bounded Knowledge;
- cinematic narration;
- clear player intention;
- no admin/debug prose;
- no information-terminal dialogue;
- meaningful choices;
- exact approved wording.

The scene schema exists to make implementation explicit, not to make the Story read like a database.

---

## 11. Review cadence

Stephen may review:

- one scene;
- one connected scene family;
- one coherent branch tranche.

Use the smallest coherent unit that produces meaningful review.

Do not force Stephen to approve an entire Origin in one giant wall of prose.

But do not route to Coding as a normal implementation package until the Origin-level completion gate is satisfied.

This keeps human review manageable while keeping Coding authority stable.

---

## 12. Change control

Once an Origin implementation package is declared complete:

- later Story changes must be explicit;
- exact changed scenes/branches must be identified;
- Coding receives a bounded delta;
- approved dialogue changes require Stephen approval;
- do not casually rewrite downstream scenes while Coding is implementing;
- if a large rewrite becomes necessary, pause the affected route and publish a new manifest version.

Canonical rule:

> **Stable authority first; implementation second.**

---

## 13. Validation status language

Always distinguish:

- Story concept;
- scene authored;
- Stephen-approved;
- durable scene authority;
- Origin Writing package complete;
- implemented;
- source/headless GREEN;
- integration GREEN;
- installed-browser validated;
- Browser Golden.

“Writing done” must never be used to imply “Origin done”.

---

## 14. Remaining Academy Origins

Kakashi is the process benchmark.

For the other nine Origins, the required order is:

```text
current Story audit
-> implementation-ready scene-by-scene package
-> Origin route manifest
-> Writing package completion
-> one Coding completion campaign
-> automated full-route traversal
-> one consolidated browser acceptance
```

Do not reopen a completed Origin merely to make it as branch-heavy as Kakashi.

The target is **clarity and completeness**, not complexity.

---

# Final lock

> **For every remaining Academy Origin, Writing must deliver a complete scene-by-scene, implementation-ready package with stable IDs, exact approved expression, explicit objectives, explicit resolver/Battle seams, factual reads/writes, complete successor mapping, terminal/reward/Receipt contributions and one finite route manifest. Only then should Coding implement the Origin as one sustained completion campaign over the proven shared runtime. The Kakashi process — complete authority first, one-pass implementation second, automated traversal third, consolidated browser acceptance last — is the Alpha benchmark.**
