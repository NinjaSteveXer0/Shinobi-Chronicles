# Shinobi Chronicles — Coding / Runtime Durable Checkpoint, Timeout Recovery and Legacy-Code Retirement Protocol

**Date:** 2026-09-15  
**Owner:** CE / CODEX / COORDINATION  
**Status:** **BINDING CODING / RUNTIME EXECUTION DISCIPLINE — ALPHA**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

This protocol governs how Coding / Runtime should structure production work so that interrupted chats, message-delivery failures, context-window retirement, retries, and legacy-runtime replacement do not create duplicated work, semantic drift, or immortal patch layers.

It is an execution / durability protocol. It does **not** change Story, CE, Battle, Progression, Acquisition, World, Registry or UI ownership.

Canonical principle:

> **Durable commit = recoverable production work. Uncommitted work = expendable.**

A failed or timed-out chat response does not roll back a GitHub commit that already landed. Conversely, a chat claiming that work was performed is not production authority if the corresponding source / document / issue mutation never became durable.

Production precedence remains:

`current GitHub source > durable CE/SC documents > current specialist decisions > Project memory / chat summaries`.

---

# 2. Interruption / timeout recovery law

When a Coding / Runtime request, response, or tool delivery times out, is interrupted, or becomes ambiguous:

## 2.1 Never assume success or failure

Do **not** blindly retry the previous write.

Before continuing, Coding must inspect:

1. current GitHub `main` / HEAD;
2. newest relevant commits;
3. newest comments on the owning GitHub issue;
4. current contents of the files that were being edited;
5. relevant tests / diagnostics where needed.

Then continue only from what is durably present.

Canonical recovery rule:

> **After interruption, source-first archaeology precedes retry.**

This prevents:

- duplicate implementation commits;
- duplicate issue comments / handoffs;
- repeated one-shot data migrations;
- duplicate reward / persistence wiring;
- accidental overwrite of a commit that landed after the chat stopped responding;
- reimplementation from stale assumptions.

## 2.2 Chat completion is not the checkpoint

A user-visible assistant response is useful reporting, but it is not the durable checkpoint.

The durable checkpoint is the repository / issue mutation itself.

Therefore:

- `commit exists` -> work can be recovered from GitHub even if the final chat response times out;
- `issue comment exists` -> routing / evidence can be recovered;
- `only discussed in chat` -> treat as potentially lost until made durable;
- `tool may have run but result is unclear` -> inspect GitHub before repeating it.

## 2.3 Message delivery timeout != rollback

If ChatGPT reports message-delivery failure after a Coding action, do not infer that GitHub writes were undone. GitHub is authoritative; inspect it.

Likewise, do not infer that a write definitely landed merely because Coding said it was about to commit.

---

# 3. Commit tranche discipline

Coding should prefer **medium-sized coherent checkpoint commits** over both giant mega-overhauls and microscopic noise commits.

Canonical rule:

> **One semantic responsibility per commit.**

Good tranche examples:

- implement one neutral Story-core behavior + tests;
- bind one closed Kakashi resolver family + tests;
- wire one exact Story -> Battle -> same-Story return package;
- add one save/load/idempotence seam;
- implement the Origin Chronicle Receipt consumer;
- replace one deprecated runtime consumer with its successor;
- add one coherent browser-presentation correction + regression;
- retire one proven-unused legacy layer.

Bad tranche examples:

- `finish Kakashi + refactor Battle + rewrite saves + replace Scene Board + clean every old runtime patch` in one commit;
- enormous unrelated Alpha cleanup where failure provenance becomes impossible to isolate;
- dozens of one-line commits that consume context / traffic without representing coherent production states.

## 3.1 Commit before changing semantic responsibility

Preferred execution rhythm:

`inspect current authority`
-> `implement one coherent responsibility`
-> `run relevant source/headless/integration diagnostics`
-> `commit`
-> `comment exact evidence on owning issue when appropriate`
-> `then move to the next semantic responsibility`.

If context is becoming unstable or near max length, checkpoint earlier rather than carrying large uncommitted state.

## 3.2 Do not overstate validation

A checkpoint commit may truthfully be:

- implemented only;
- source/headless GREEN;
- integration GREEN;
- browser validated;
- Golden/regression GREEN.

These levels remain separate.

A successful commit is not automatically browser proof.

---

# 4. Retry idempotence for Coding work

A retried Coding instruction should be safe even if part of the previous attempt landed.

Coding should design implementation workflows so re-entry begins from current durable state rather than replaying an assumed sequence.

For retries:

- inspect HEAD before writing;
- compare intended change against current file contents;
- reuse existing durable issue traffic rather than create duplicates;
- do not recreate files that already exist under a successor commit;
- do not repeat migrations / grants / one-shot source writes;
- do not reset source to the chat's remembered pre-timeout state;
- if concurrent commits landed, reconcile them explicitly before proceeding.

If source changed underneath the interrupted task, treat that as a fresh authority / integration check, not an inconvenience to overwrite.

---

# 5. Legacy-code replacement lifecycle

Shinobi Chronicles has accumulated runtime patches while Alpha architecture has evolved. Temporary patching is legitimate when it safely bridges authority transitions, but patch layers must not become permanent merely because deletion is uncomfortable.

Canonical principle:

> **Patches may bridge authority transitions. They must not become immortal architecture.**

Preferred lifecycle:

`legacy implementation`
-> `identify all legitimate consumers / persistence dependencies`
-> `build successor`
-> `route one real production consumer through successor`
-> `validate successor`
-> `migrate remaining legitimate consumers`
-> `remove legacy code from production load / registration path`
-> `re-run source + integration + browser regressions`
-> `delete obsolete implementation / obsolete tests / temporary guard when safe`.

Do **not** delete first and rebuild from memory unless current authority explicitly proves the old layer has no remaining production responsibility.

Do **not** retain obsolete code indefinitely simply because it is safer than understanding it.

---

# 6. Guard / shim policy

A guard, compatibility shim, fail-closed wrapper, bridge adapter, or temporary patch is appropriate when:

- the old implementation can commit false facts;
- the successor is not yet fully consumable;
- removing the old path immediately would strand a legitimate production surface;
- save compatibility requires a transition period;
- a new owner contract is still pending.

A guard is **not** evidence that the successor implementation is complete.

Every temporary guard should have an identifiable retirement condition.

For example:

> old route is fail-closed until exact final branch / Battle authority is implemented; once the successor graph owns the production path and regression proof is GREEN, remove the old route / guard rather than stacking another permanent patch on top.

Do not solve an obsolete guard by simply disabling the guard and re-exposing the stale behavior it was protecting against.

---

# 7. Proof required before deleting legacy code

Before physically deleting a legacy runtime file / function / adapter / patch family, Coding should establish all four of these conditions:

1. **No current production load path needs it.**
   - inspect `index.html`, dynamic loaders, registries, runtime installers and indirect string/global references;
2. **No save/load migration or backward-compatibility path still needs it.**
   - distinguish active runtime behavior from historical save migration / interpretation;
3. **No active feature or legitimate test still consumes it.**
   - obsolete tests should be retired with the obsolete behavior rather than preserved as false authority;
4. **The successor path has equal-or-better regression coverage for the surviving responsibility.**

Code search alone is useful but insufficient when dynamic loaders / globals / serialized IDs are involved.

---

# 8. De-load before delete

Where practical, use a two-stage retirement proof:

## Stage A — production de-load

Remove the legacy implementation from the production load / registration path while leaving the physical source file temporarily present.

Run relevant:

- syntax / source diagnostics;
- integration tests;
- save/load checks;
- production browser path.

This proves:

> **the game no longer requires this implementation to run.**

## Stage B — physical deletion

Once the production path is proven independent of the legacy code:

- delete the obsolete file / functions;
- remove obsolete QA that only validates retired behavior;
- update references / docs;
- rerun relevant regressions;
- commit the retirement as its own coherent tranche where practical.

This is stronger than deleting based solely on a search result.

---

# 9. Replacement over endless overlay

When replacing a materially obsolete subsystem, prefer:

`old A`
-> `successor A2`
-> `one real production consumer on A2`
-> `validation`
-> `remaining consumers migrated`
-> `A removed`

over:

`A`
-> `patch A1`
-> `patch A2`
-> `guard A3`
-> `compat A4`
-> `final-fix A5`
-> legacy A still executes underneath everything.

Alpha delivery may require temporary overlays. Their existence should create **retirement work**, not normalize indefinite layering.

Do not perform a large architectural rewrite merely to make the runtime prettier before Alpha. Retirement should target **proven-superseded responsibility**, not speculative cleanup.

---

# 10. Single-executor preference for overlapping runtime work

For the current Alpha push, prefer **one primary Coding / Runtime executor on overlapping production source at a time**.

Parallel Coding work is only safe when write scopes are explicitly non-conflicting or separate branch / PR ownership is being used.

Two chats should not independently modify the same semantic/runtime surface based on their own chat memory.

Cross-workspace Coding communication is through durable GitHub source / docs / issues, not one Coding chat trusting another Coding chat's prose summary.

If two implementation efforts could touch the same runtime responsibility, serialize them unless a deliberate branch/integration-owner workflow exists.

---

# 11. Successor-chat / max-length behavior

When Coding / Runtime approaches max context:

- prioritize durable commit checkpoints over finishing a long explanatory chat response;
- conduct the current Coding retirement deep-sweep protocol;
- capture uncommitted material before archive;
- reconcile concurrent commits that landed during the sweep;
- leave exact active issue + highest blocker + source state;
- do not declare archive safety if production-critical state remains trapped only in chat.

A successor Coding workspace begins from GitHub, not from reconstructed memory.

---

# 12. Acceptance rules

A Coding tranche follows this protocol when:

- interruption recovery begins by inspecting live GitHub;
- retries do not blindly replay writes;
- meaningful implementation is durably checkpointed before moving to an unrelated responsibility;
- commit scope is coherent enough to diagnose / revert / compare;
- validation level is stated truthfully;
- temporary guards have explicit reason / retirement condition;
- legacy code is not deleted until consumers / persistence / tests / successor coverage are checked;
- de-load-before-delete is used where practical;
- superseded code is actively retired once successor proof exists;
- no second runtime architecture is created merely to avoid understanding current production authority.

## Compact operating law

> **Inspect before retry. Commit coherent truth early. Validate at the correct level. Guard only while necessary. De-load before delete. Retire superseded code once the successor is proven.**

---

# 13. Non-collapse reminders

Preserve throughout implementation:

- commit exists != production path consumes it;
- implementation != validation != installed-browser proof != Golden;
- Story choice != factual outcome;
- Battle victory != Story success;
- participant autonomy != free NPC Battle action;
- presentation != authority;
- Chronicle Receipt != recommit;
- reward entitlement != Inventory grant;
- PL != Progression;
- Rank != Progression;
- Acquisition != Progression;
- ownership != assignment != deployment;
- Base != Developed != Effective != Battle/runtime state.

**Stephen relay:** NONE. GitHub is the durable execution authority.