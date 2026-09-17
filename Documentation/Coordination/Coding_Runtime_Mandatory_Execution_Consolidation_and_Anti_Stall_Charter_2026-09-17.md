# Shinobi Chronicles — Coding / Runtime Mandatory Execution, Consolidation and Anti-Stall Charter

**Date:** 2026-09-17  
**Owner:** CE / Codex / Coordination  
**Status:** **MANDATORY CODING / RUNTIME SESSION AUTHORITY — ACTIVE**  
**Applies to:** **EVERY current and future Coding / Runtime workspace, successor chat, recovery chat, implementation session and Alpha repair tranche**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

---

## 1. Why this charter exists

Shinobi Chronicles now has enough durable Story, Combat, World, Progression, UI and CE authority to implement the Academy Origins without repeatedly rediscovering design intent.

The current Alpha problem is therefore not primarily missing design. It is execution discipline and runtime ownership drift:

- newer correct logic may exist while older runtime paths remain live;
- headless/source tests may exercise a corrected child module while the installed browser still consumes stale parents or compatibility layers;
- fixes may be added as new overlays instead of replacing the obsolete owner;
- a Coding session may spend substantial time investigating, report the diagnosis, and stop before the player-facing path changes;
- cache/version churn may be mistaken for progress;
- browser RED may coexist with source/CI GREEN;
- temporary compatibility code may become effectively permanent.

This charter exists to end that loop.

Canonical objective:

> **Coding / Runtime is responsible for turning closed authority into one working production path, not for accumulating patches, reports or green component tests while the installed game remains broken.**

GitHub history is the archive. Superseded runtime code does not need to remain live merely because it once carried a feature.

---

## 2. Precedence and scope

This charter is mandatory for Coding / Runtime.

It supplements and, where execution behavior conflicts, takes precedence over narrower prior Coding execution guidance, including:

- `Documentation/Coordination/Coding_Runtime_Durable_Checkpoint_Timeout_Recovery_and_Legacy_Code_Retirement_Protocol_2026-09-15.md`;
- `Documentation/Coordination/Coding_Runtime_Context_Health_Soft_Rotation_and_GitHub_Recoverable_Handoff_Protocol_2026-09-16.md`;
- `Documentation/Coordination/Coding_Runtime_Long_Session_Origin_Consolidation_and_Surgical_Replacement_Protocol_2026-09-17.md`.

Those documents remain useful detail. This charter is the top-level mandatory working law for current and future Coding sessions.

Production authority remains:

`GitHub live source > durable CE/SC documents > current specialist decisions > Project memory / chat summaries`.

Always distinguish:

`design closed != implemented != source validated != production released != installed-browser validated != Golden`.

---

# 3. Mandatory session-start contract

Every Coding / Runtime workspace must begin substantive work by silently establishing current authority.

Before editing:

1. fetch current `main` / HEAD;
2. inspect open GitHub issues targeted to Coding / Coding-Runtime that relate to the active lane;
3. inspect the newest comments on the active owning issue;
4. inspect the current production source and load chain for the exact player-facing path;
5. inspect the durable owner contracts referenced by that issue/source;
6. identify the one current implementation target and its acceptance proof;
7. inspect this charter before adopting a work pattern inconsistent with it.

Do not ask Stephen to reconstruct GitHub state that the workspace can inspect itself.

Do not begin from an old SHA simply because a previous chat named it.

Do not trust chat memory over current source.

---

# 4. NO-STALL RULE — investigation is not the deliverable

A Coding session is not complete because it found or explained a bug.

The following are **not valid completion states** while the current path remains editable:

- `I found the issue`;
- `the likely cause is...`;
- `the repair should be...`;
- `CI is green`;
- `the new module exists`;
- `the cache generation was advanced`;
- `the code is ready for another test` when the known production path has not been repaired;
- a long status report with no durable code/test/routing change.

Once a concrete defect is understood, Coding must continue from diagnosis into repair during the same working session whenever tooling and authority permit.

A user-visible progress report is not a milestone by itself.

### A Coding turn may stop only when one of these is true

1. **Durable working progress has landed and the planned acceptance target is reached.**
2. **Stephen must perform one exact local/manual surgical edit that Coding cannot safely perform itself.** Use Section 11.
3. **A genuine external-owner authority gap blocks the active causal path.** Route it directly in GitHub first, then continue all non-blocked work before stopping.
4. **A hard tool/context/execution boundary is imminent.** Commit every coherent change and leave an exact GitHub checkpoint first.
5. **Installed-browser replay by Stephen is now the only remaining validation level.** All source/integration/production-delivery prerequisites must already be ready.

Ordinary test failures, stale references, syntax errors, loader mismatches, outdated QA assumptions, and discoverable legacy callers are not reasons to stop. They are the work.

---

# 5. Long execution sessions are the default

Coding should work through a causal production tranche in a sustained session:

`inspect live authority`
-> `map current owner/load path`
-> `implement`
-> `test`
-> `fix failures`
-> `retest`
-> `commit coherent checkpoint`
-> `continue`
-> `consolidate ownership`
-> `de-load superseded layer`
-> `retest production path`
-> `continue until valid stop condition`.

Long session does **not** mean one giant uncommitted rewrite.

Use coherent commits for recoverability, but do not stop after each commit merely to narrate it.

Good checkpoint boundaries include:

- one canonical owner repaired;
- one complete branch made causal end-to-end;
- one obsolete live owner de-loaded;
- one reward/debrief/Receipt seam made idempotent;
- one production loader generation made coherent;
- one browser defect removed and regression-covered.

---

# 6. CANONICAL OWNER LAW — one responsibility, one live semantic owner

Before repairing a repeatedly patched runtime surface, Coding must identify every live module capable of mutating the same responsibility.

Classify each relevant module/block as:

- `CANONICAL_OWNER`;
- `TEMPORARY_COMPATIBILITY`;
- `SUPERSEDED_LIVE`;
- `UNREACHABLE / DEAD`;
- `UNKNOWN — DO NOT DELETE YET`.

Responsibilities include, where relevant:

- Origin identity / registry;
- Story decision semantics;
- factual resolver/results;
- participant/object state;
- Battle caller/return;
- Scene Board projection;
- rewards/development projection;
- terminal debrief;
- Chronicle Receipt;
- Origin completion/continuation;
- save/load/idempotence;
- production loader/cache generation.

Canonical rule:

> **One responsibility must converge on one live semantic owner.**

Two live layers must not independently decide the same Story fact, custody fact, reward entitlement, choice eligibility, terminal state or presentation authority merely because removing one is inconvenient.

---

# 7. SUPERSESSION LAW — newer correct authority must replace stale live behavior

When all of the following are true:

1. a newer durable authority supersedes an older behavior;
2. the successor implementation exists or can be implemented in a canonical owner;
3. current callers/consumers can be identified;
4. save/persistence compatibility has been checked;

then Coding must migrate the production path to the successor and retire the obsolete live owner.

It is not acceptable for newer correct code to sit beside old live code while the browser continues consuming the old behavior.

A stale path may not remain authoritative merely because:

- it loads earlier;
- a test still imports it directly;
- a compatibility hook still points at it;
- deleting it feels risky;
- a later patch can override it most of the time.

Git history preserves the retired implementation.

---

# 8. PATCH-STACK FIREWALL — modify canonical owners by default

Creating another runtime patch/module/overlay is now the exception.

Before adding a new compatibility or patch layer, Coding must answer:

- Why can the fix not safely live in the canonical owner?
- Which existing owner would otherwise remain wrong?
- What exact Alpha blocker requires the temporary layer?
- What is the retirement condition?

If those answers are not concrete, modify the canonical owner instead.

Prohibited substitutes for repair include:

- another monkey patch that re-enables behavior an earlier guard intentionally blocked;
- another factual store for the same fact;
- another Story runtime for one Origin;
- advancing cache/version strings without fixing the semantic owner;
- direct-loading corrected modules in QA while production loads stale parents;
- leaving the old branch live and covering it with a later branch-specific override;
- fixing presentation by recommitting semantic facts;
- fixing rewards by granting from Battle result instead of factual terminal entitlement.

Temporary compatibility is allowed only with an explicit retirement condition.

---

# 9. LEGACY RETIREMENT LAW — de-load, prove, delete

Coding is expected to remove superseded code once its responsibility has migrated.

Do **not** mass-delete merely because a file is old.

Required retirement sequence:

1. identify exact old owner/block/module;
2. identify exact canonical successor;
3. migrate all still-legitimate behavior;
4. identify production callers, globals, registries, dynamic loaders, script tags and save interpretation dependencies;
5. remove old code from the production load/registration path;
6. run focused tests with the old layer absent;
7. run broader integration/production-load checks;
8. when practical, run the player-facing browser path;
9. only then physically delete the obsolete implementation and obsolete tests;
10. rerun relevant regressions.

Canonical shorthand:

> **De-load before delete. Prove the successor. Then remove the corpse.**

`UNKNOWN` code is not deleted until ownership/callers are understood.

---

# 10. BROWSER-REALITY RULE

For player-facing Alpha work, the installed browser is the acceptance surface.

Source/headless/CI tests remain necessary, but:

- CI GREEN does not make a broken browser path ready;
- direct module tests do not prove the production loader consumes that module;
- mocked DOM does not prove the installed game renders the correct branch;
- cache-generation assertions do not prove visible behavior;
- module existence does not prove runtime consumption.

If Stephen demonstrates Browser RED while source/CI is GREEN, Coding must treat that as a **production integration failure** and audit the live load chain/ownership before adding another patch.

The response to Browser RED is not `tests pass`; it is `find why the browser consumed the wrong owner and replace/de-load that path`.

No player-facing Origin is Golden until Stephen approves installed-browser behavior.

---

# 11. STEPHEN SURGICAL-EDIT MODE — header-to-header replacement only

Stephen should not be used as a routine code editor.

Coding stops for Stephen only when a local/browser-served file genuinely requires manual replacement that Coding cannot safely perform through current tools.

Each surgical packet must contain exactly:

### FILE
Exact path.

### START HEADER
Exact unique comment/header/function declaration Stephen can search.

### END HEADER
Exact unique next header/comment/function declaration bounding the replacement.

### REPLACEMENT SCOPE
Default:
`replace from START HEADER through the line immediately before END HEADER`.

### COMPLETE REPLACEMENT
Full replacement block with no ellipses and no omitted middle.

### EXPECTED RESULT
Exact visible/runtime function/global/version behavior expected.

### VERIFY
One concise verification step.

Rules:

- one block at a time unless two files are inseparable;
- no line-number-only instructions;
- no partial snippets Stephen must reconstruct;
- no `find roughly this area`;
- after Stephen edits, inspect the resulting source/state before continuing;
- if Coding can safely make the edit itself, Coding must do so.

---

# 12. CURRENT ALPHA ORDER — finish Origins, do not endlessly benchmark them

The Academy Origins are already sufficiently designed to implement.

Current IDs:

- `academy_hinata`
- `academy_izuno`
- `academy_mirai`
- `academy_menma`
- `academy_kushina`
- `academy_kurenai`
- `academy_iwabee`
- `academy_metal_lee`
- `academy_kakashi`
- `academy_obito`

Current order:

1. **Finish Academy Kakashi as the hardest consolidation benchmark.**
2. Use Kakashi to remove stale shared Origin/runtime ownership and prove the canonical shared path.
3. Apply that same shared runtime to the other nine Origins.
4. Fix only Origin-specific content/branch defects after shared runtime is stable.
5. Complete #105 ten-Origin installed-browser validation.

Do not keep Kakashi as a permanent research project.

The purpose of the benchmark is to establish the shared implementation path and then finish the family.

Practical per-Origin target:

`Origin selection`
-> `correct authored prologue`
-> `legitimate player decisions`
-> `committed factual outcomes`
-> `Battle + same-Story return where authorised`
-> `terminal scenes/rewards where applicable`
-> `Chronicle Receipt`
-> `YOUR CHRONICLE BEGINS`
-> `exactly two legitimate Academy teammates`
-> `first-Konoha/tutorial boundary`
-> `ordinary Academy free play`.

Registration in source is not completion.

---

# 13. NO FALSE PROGRESS METRICS

Do not present the following as meaningful Alpha closure by themselves:

- number of commits;
- number of patch files;
- number of cache generations advanced;
- number of tests added;
- one green component test;
- one green workflow;
- existence of a reward module;
- existence of a scene definition;
- design closure.

Meaningful progress is:

- player path newly works;
- stale owner removed from production;
- canonical owner simplified;
- branch now reaches its correct continuation;
- reward/debrief/Receipt actually executes;
- installed browser reflects current authority;
- save/load/idempotence is preserved;
- regression is prevented.

---

# 14. AI ARCHITECTURE REVIEWER — explicit manual operation

`SC AI Architecture & Contract Review v1` is currently advisory and manually triggered.

The current workflow uses `workflow_dispatch`; it is **not an automatic bot watching every commit**.

Coding must not assume the OpenAI API key means continuous review is active.

Recommended use during consolidation:

1. record `BASE_SHA` before a substantial ownership/retirement tranche;
2. complete the coherent tranche;
3. run ordinary source/integration tests;
4. manually trigger the reviewer over `BASE_SHA..HEAD`;
5. inspect any contradiction against full current source and durable authority;
6. repair genuine issues;
7. proceed to installed-browser proof.

Do not run it after every micro-commit.

Reviewer PASS != browser proof.

Reviewer warning != fact until reconciled against untruncated current authority.

---

# 15. One primary executor for overlapping runtime work

Only one Coding / Runtime workspace should actively mutate an overlapping production responsibility at a time unless a deliberate branch/PR integration plan exists.

Do not have two chats independently patching the same Origin/Story/runtime surface.

A successor Coding workspace takes over from GitHub state; the predecessor stops being primary.

GitHub carries continuity.

---

# 16. Mandatory completion report

At a valid stop, Coding reports only durable, useful state:

- current HEAD;
- exact commits landed;
- canonical owners changed;
- stale live owners de-loaded/retired;
- exact player path now working;
- exact tests/workflows and results;
- production loader parity status;
- installed-browser status;
- one genuine blocker if one remains;
- one exact header-to-header surgical edit if Stephen must act.

Do not end with a speculative `next I would...` essay while editable work remains.

Do not make Stephen wait through a long investigation only to receive a diagnosis instead of a repair.

---

# 17. Mandatory future-chat adoption rule

Every current or future Coding / Runtime chat is considered bound by this charter whether or not Stephen manually pastes it into the conversation.

At session start, the workspace must recover current Coding authority from GitHub and treat this file as standing execution law.

A future handoff may summarize this charter but must not weaken it.

If a Coding workspace discovers a genuine reason this charter cannot be followed, it must record the exact conflict on GitHub and route it to CE / Codex / Coordination before silently reverting to patch-stacking or report-only behavior.

---

# Compact operating law

> **Read live GitHub first. Work until something materially changes. One responsibility, one canonical owner. New correct authority replaces stale live behavior. Patch only when unavoidable and with a retirement condition. De-load before delete. Browser RED overrides readiness claims. Stop for Stephen only for one exact surgical edit, a real external authority blocker, a hard execution boundary after checkpointing, or final installed-browser validation. Finish the Origins; do not keep rediscovering them.**

**Stephen relay:** NONE. GitHub is the durable execution authority.