# Shinobi Chronicles — Production Authority Consumption, Traceability and Continuous Conformance Gate

**Date:** 2026-10-05  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING PROJECT-WIDE SAFETY AUTHORITY — ACTIVE**  
**Primary priority:** **Finish Shinobi Chronicles Alpha without silently losing approved Story, system, CE, UI or asset authority.**

Consumes and extends:

- `Documentation/Coordination/Runtime Validation and Golden Gate Successor Authority 2026-09-13.md`;
- `Documentation/Coordination/Runtime_Change_Safety_Ownership_Retirement_and_Golden_Promotion_Gate_2026-09-22.md`;
- `Documentation/Coordination/Phase_2_Persistent_Chronicle_Safety_Constitution_2026-10-01.md`;
- `Documentation/Coordination/Specialist_GitHub_Handoff_Protocol.md`.

This gate was activated after owner review exposed a production-traceability gap: several approved UI masters existed durably, some were source-wired, some were intentionally queued, yet their actual live-player consumption status was not obvious from the asset folder or normal project traffic. The same failure mode would be materially worse if it affected Story authority, a system redesign, or a Chronicle Engine semantic overhaul.

---

## 1. Core safety law

> **Approved authority that is not traceably consumed is not production-complete.**

And:

> **source reference != active consumer != observable effect != owner-visible behavior != Golden/regression GREEN**

The project already distinguishes design closure, implementation and Golden. This gate adds the missing durable bridge between them: **consumption traceability + continuing conformance**.

No specialist, Coding pass, asset folder, issue close, CI run or future chat may infer that a closed decision is still functioning merely because:
- the document exists;
- an asset exists;
- a source file contains its name;
- a module is loaded;
- an old test once passed;
- a later system “should” still consume it.

The production path must remain traceable and re-provable.

---

## 2. Extended production lifecycle

For any material player-facing or semantic authority, track these states separately:

1. **DISCUSSION / PROPOSAL**
2. **DESIGN CLOSED**
3. **DURABLE AUTHORITY**
4. **DISPOSITIONED**
   - IMPLEMENT NOW;
   - QUEUED with an exact activation owner/condition;
   - RECORD ONLY with explicit reason that no runtime/content consumer is required.
5. **IMPLEMENTED**
6. **ACTIVE CONSUMER PROVEN**
   - current production load/caller path actually reaches the implementation.
7. **SOURCE / HEADLESS VALIDATED**
8. **INTEGRATION VALIDATED**
9. **OBSERVABLE BROWSER VALIDATED**
   - the intended player-facing effect is actually present/reachable/visible.
10. **GOLDEN / REGRESSION GREEN**
11. **CONFORMANCE WATCHED**
   - later changes which can invalidate the contract automatically or procedurally force re-validation.

A surface may be intentionally parked at QUEUED. That is safe.

A surface may not disappear between DURABLE AUTHORITY and implementation without an explicit disposition.

---

## 3. Mandatory Production Consumption Record

Every material authority that expects a production consumer must have a traceable Consumption Record.

The exact storage may be one machine-readable manifest plus issue/doc references, but the minimum semantic fields are:

```text
contractId
authorityOwner
authorityRefs[]
authorityStatus
productionDisposition
implementationOwner
canonicalConsumers[]
productionLoadPaths[]
stateReads[]
stateWrites[]
presentationAssets[]
observableAcceptance[]
qaRefs[]
browserCanaryRefs[]
watchedPaths[]
lastValidatedSha
lastBrowserValidatedSha
goldenScope
supersedes[]
supersededBy
knownDebt[]
```

### Definitions

- **authorityRefs** — exact durable docs/issues/commits defining the behavior.
- **productionDisposition** — IMPLEMENT NOW / QUEUED / RECORD ONLY / SUPERSEDED.
- **canonicalConsumers** — exact runtime/content systems expected to consume the authority.
- **observableAcceptance** — what a player/owner must actually be able to see/do to prove the change is alive.
- **watchedPaths** — source/assets/contracts whose material change invalidates prior evidence.
- **knownDebt** — explicit unproven boundaries; never silently hidden behind GREEN.

A contract with no runtime need may use RECORD ONLY and does not require a fake Coding consumer.

---

## 4. Orphan-authority prevention gate

A material design/content issue must not be treated as safely finished until its production disposition is explicit.

When an owner closes durable authority, one of these must be true:

### A. IMPLEMENT NOW

There is an implementation owner and exact downstream issue/PR/consumer.

### B. QUEUED

There is:
- exact future owner;
- activation condition/milestone;
- reason it is not current work;
- no false claim that the feature already exists.

### C. RECORD ONLY

No implementation is required because the decision is purely documentary/semantic or intentionally non-production.

### D. SUPERSEDED

The successor authority is named.

Canonical rule:

> **closed decision != consumed decision**

A closed issue with a runtime/content expectation but no disposition is an **orphan authority defect**.

---

## 5. Consumer-without-authority prevention gate

The reverse defect is also prohibited.

A current production consumer must be able to identify the authority it consumes.

Fail or flag where practical:

- runtime feature exists but no current authority can be named;
- old/superseded authority is still consumed;
- presentation asset appears in production with no active classification;
- resolver/Story branch behavior has no current owning contract;
- a CE semantic rule is implemented from memory/chat only;
- UI invents semantics because a mockup has a control.

Canonical rule:

> **authority without consumer is orphaned intent; consumer without authority is orphaned implementation. Both are defects.**

---

## 6. Observable-effect gate — no invisible GREEN

This is the specific failure class exposed by the UI-master review.

For any user-facing change:

> **code presence is never sufficient proof that the player receives the intended effect.**

At least one browser-facing acceptance probe must prove the intended observable behavior.

Examples:

### UI / visual asset
Source proof:
- path exists;
- asset resolves;
- stylesheet references it.

Observable proof:
- exact route reaches the surface;
- asset/resource loads;
- intended DOM/root is active;
- effective opacity/visibility/size are non-zero;
- no later layer fully obscures or bypasses the intended presentation;
- screenshot/browser inspection proves the result is recognisable enough to perform its intended role.

### Story
Source proof:
- scene/beat text exists.

Observable proof:
- exact live branch reaches it;
- correct actors/backdrop/choices appear;
- old superseded branch does not intercept;
- subsequent factual state changes correctly.

### Combat/system improvement
Source proof:
- resolver/module exists.

Observable proof:
- legal player path triggers it;
- state change is visible and persists where required;
- save/load and downstream consumer still agree.

### CE overhaul
Source proof:
- rule/engine code exists.

Observable proof:
- at least one representative fixture/canary demonstrates the changed causal result;
- the old semantic behavior is not still winning;
- resulting Chronicle state can be inspected through an authorised projection/diagnostic;
- browser-facing behavior changes where the contract says it should.

If a semantic change is intentionally invisible to the player, the observable canary may be an exact diagnostic/state assertion rather than UI.

---

## 7. Invalidation and stale-GREEN rule

Every Consumption Record declares **watchedPaths** and relevant dependency refs.

When a materially watched source changes:

- previous source/headless evidence becomes **STALE** for the affected contract until rerun;
- previous browser evidence becomes **STALE** where the change can affect player-facing behavior;
- unrelated contracts remain valid.

Do not invalidate the whole game because one CSS file changes.

Do not preserve GREEN merely because nobody remembered to rerun the right test.

The system should prefer targeted invalidation over blanket reruns.

---

## 8. Continuous conformance layers

Coding / Runtime must implement a machine-enforced conformance layer in addition to existing focused QA.

Minimum target:

### A. On pull request / production-source change

Run:
- Production Consumption Manifest validation;
- orphan-authority / orphan-consumer checks where machine-detectable;
- exact asset classification/path checks;
- runtime responsibility ownership checks;
- changed-path -> affected-contract mapping;
- affected deterministic QA;
- stale-GREEN reporting.

### B. On merge to `main`

Run the same conformance gate against the exact production load graph.

No PR-only load graph may count as live proof.

### C. Scheduled deep sweep

Run a recurring GitHub Actions conformance audit on `main` even when nobody is actively working the affected system.

Purpose:
- catch dead links/assets;
- catch renamed/deleted consumers;
- catch retired authorities still referenced;
- catch active authorities with no consumer;
- catch browser-canary/validation evidence that has become stale;
- catch modules/assets that remain wired but no longer influence current player-visible output.

Suggested starting cadence: **daily** while Alpha is actively changing. Reduce later if signal/noise proves poor.

### D. Alpha release / Golden candidate

Require a full cross-surface conformance report plus the current installed-browser Golden matrix.

---

## 9. Browser canary matrix

Not every feature needs a full manual replay every commit.

Maintain a bounded **browser canary matrix** of representative high-risk routes.

At minimum for current Alpha it should eventually cover:

- one complete Origin -> team -> Konoha path;
- Chronicle Interaction Full / Standard / Quick projection;
- Story -> Battle -> same-Story return;
- Victory result;
- Setback/defeat result;
- Inventory populated and empty state;
- Character acquisition -> ownership -> team assignment boundary;
- Promotion transition;
- World/Region/Village map navigation;
- one real CE hotspot occurrence;
- save/load across a meaningful committed consequence.

Each canary must name:
- starting fixture/save;
- route/actions;
- expected visible/semantic checkpoints;
- exact contracts it certifies;
- last successful SHA.

A canary becoming unreachable is a defect, not a reason to quietly remove it.

---

## 10. UI asset classification registry

Every durable `UI/*` master must be classified as exactly one:

### ACTIVE PRODUCTION MASTER
Current runtime must visibly consume the approved design.

### REFERENCE / COMPOSITION MASTER
Runtime recreates the design code-first; the raster itself is not necessarily displayed literally.

### QUEUED CONCEPT
Approved/preserved direction but not current implementation authority.

### SUPERSEDED / HISTORICAL
Must not be treated as current production direction.

The registry should record:
- asset path;
- authority contract;
- current consumer;
- classification;
- last owner-visible validation;
- successor if superseded.

Physical presence in `UI/` alone never proves ACTIVE status.

The same classification principle may be reused for other high-value asset families where ambiguity appears.

---

## 11. Story / content authority safeguard

Story changes are especially vulnerable to “written but not actually played.”

For every material Story rewrite/addition intended for production:

- stable scene/beat/occurrence IDs;
- durable Story authority;
- exact runtime/source binding;
- branch reachability proof;
- obsolete/superseded branch exclusion where applicable;
- at least one browser route proving the new content;
- regression watch if a shared Story renderer/resolver changes.

A Story document with no runtime binding must remain visibly QUEUED / NOT IMPLEMENTED.

Never allow “Writing GOLDEN” to be mistaken for runtime Story Golden.

---

## 12. CE / system-overhaul safeguard

For every material Chronicle Engine or reusable-system overhaul:

1. name old behavior being replaced/extended;
2. name exact canonical consumer(s);
3. include at least one **semantic canary fixture** that would fail under the old behavior;
4. include negative proof that superseded behavior cannot still win;
5. bind persistent-state/schema impact;
6. register downstream projections affected;
7. declare watched paths;
8. re-run the canary after dependent runtime changes.

A CE principle entering the Design Bible is durable architectural authority, not proof that Shinobi Chronicles runtime consumes it.

A runtime implementation is not proof that every intended game surface consumes it.

---

## 13. No silent “wired but ineffective” state

The conformance report must distinguish:

- **DECLARED** — contract exists;
- **REFERENCED** — production source names it;
- **LOADED** — consumer enters production load graph;
- **REACHABLE** — legitimate route can invoke it;
- **EFFECTIVE** — invocation changes intended output/state;
- **OBSERVED** — browser/diagnostic proof confirms the effect;
- **GOLDEN** — accepted scope frozen/regression-covered.

This is mandatory because:
- a dead asset can be REFERENCED but not LOADED;
- a loaded module can be unreachable;
- a reachable renderer can be fully hidden;
- an effective semantic change can be invisible where visibility was required;
- an old handler can still override a newer implementation.

---

## 14. Acceptance debt is allowed; invisible debt is not

Alpha work may intentionally leave a system AMBER.

That is legitimate only when the debt is explicit.

Examples:
- `loadout.png` preserved as QUEUED CONCEPT;
- a source-implemented surface awaiting Stephen browser review;
- a design-closed CE contract awaiting Coding;
- a browser canary blocked by another owner.

The project does not need every idea implemented immediately.

It does need to know exactly what is not implemented or not proven.

---

## 15. Specialist work-cycle safeguard

At the beginning and end of a substantial specialist work cycle, check:

1. what current authority am I consuming?
2. what production consumer does this affect?
3. did I create a new authority that now needs disposition?
4. did I supersede something that must be retired?
5. what proof exists beyond document/source existence?
6. what evidence became stale because of my changes?
7. is another owner genuinely required?

This extends the existing GitHub handoff protocol; it does not turn Stephen into the message bus.

---

## 16. Ownership

### CE / Codex / Coordination
Owns:
- the Consumption Record schema;
- orphan/drift semantics;
- cross-owner reconciliation;
- authority supersession relationships.

### Coding / Runtime
Owns:
- machine-readable production consumption manifest;
- conformance tooling/CI;
- runtime reachability/effectiveness diagnostics;
- browser canary harness where automatable;
- stale-evidence detection.

### UI / Assets
Owns:
- UI master classification and presentation acceptance contracts.

### Domain specialists
Own:
- exact acceptance criteria for their semantics/content;
- exact durable authority;
- downstream handoff when another owner genuinely must act.

### Stephen
Owns:
- subjective player-facing acceptance/taste where Golden requires owner judgement.

Automated GREEN never substitutes for Stephen where owner-browser Golden is required.

---

## 17. Initial Alpha backfill

Do not attempt to backfill the entire project in one giant archaeology pass.

Start with current high-risk Alpha surfaces:

1. current `UI/*` master audit under #526;
2. Chronicle Interaction / #32;
3. Victory / Setback current result paths;
4. Inventory + Battle Pouch follow-up;
5. #449 current economy/team-assignment tranche;
6. #519 Stats/Skills/Exam/Combat-firewall changes once design closes;
7. #522 protagonist/rank/representation/Promotion semantics once design closes;
8. current Golden/frozen Origin shared-runtime dependencies.

Then expand the ledger as new material authority is authored.

---

## 18. Required Coding deliverable

Create one bounded implementation issue/tranche for:

- machine-readable Production Consumption Manifest;
- validator tool;
- CI workflow on PR + main;
- scheduled `main` deep sweep;
- stale-evidence report;
- first browser-canary ledger;
- initial backfill for the high-risk Alpha rows above.

Do not rewrite gameplay to satisfy the manifest.

The manifest describes and verifies current authority/consumption; it does not become a second semantic owner.

---

## 19. Final lock

> **Nothing important may survive only as chat memory, an isolated document, an unclassified asset, a stale issue, a dead source reference, or an old PASS. Every material production authority must have an explicit disposition, a named consumer where one is required, a provable observable effect, and a continuing conformance path capable of detecting when later work breaks or bypasses it.**

> **The project is allowed to have unfinished work. It is not allowed to forget that the work is unfinished.**
