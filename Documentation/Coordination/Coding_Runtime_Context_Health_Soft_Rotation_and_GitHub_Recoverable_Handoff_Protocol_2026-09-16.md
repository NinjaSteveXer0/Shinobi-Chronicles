# Coding / Runtime Context Health, Soft Rotation, and GitHub-Recoverable Handoff Protocol — 2026-09-16

Status: ACTIVE COORDINATION AUTHORITY

Primary priority: **FINISH SHINOBI CHRONICLES ALPHA**

This protocol extends, and does not replace:

- `Documentation/Coordination/Autonomous Alpha Specialist Execution Mode 2026-09-13.md`
- `Documentation/Coordination/Coding_Runtime_Durable_Checkpoint_Timeout_Recovery_and_Legacy_Code_Retirement_Protocol_2026-09-15.md`
- the current Coding / Runtime retirement-audit lineage under `Documentation/Implementation/`.

## 1. Core problem

Coding / Runtime workspaces can exhaust conversational context before the product work is finished, while the product UI does not provide a reliable context-capacity gauge.

Therefore Coding must not wait for a visible or exact maximum-length warning before preserving recoverable state.

Canonical rule:

> **Do not wait for context exhaustion to preserve state. Preserve state continuously, and rotate workspaces at natural semantic boundaries when continuation cost begins exceeding restart cost.**

And:

> **A successor chat started from a current durable checkpoint is routine rotation, not an emergency retirement.**

The project must treat chat context as expendable working memory and GitHub as durable production/recovery memory.

## 2. Three levels of continuity protection

### A. Normal checkpoint

Use continuously during ordinary Coding / Runtime execution.

Preferred rhythm:

`inspect authority -> implement one coherent responsibility -> run appropriate diagnostics -> commit -> issue evidence -> checkpoint -> continue`

A normal checkpoint should exist after each coherent implementation tranche that materially changes runtime truth.

Examples:
- one Story resolver family;
- one exact Story -> Battle -> same-Story return package;
- one save/load seam;
- one factual resolver binding family;
- one browser presentation correction;
- one legacy de-load/retirement tranche.

The checkpoint does not require a new document every time. Durable source commit + exact issue evidence is sufficient when it records current truth.

### B. Soft rotation

Use while the current workspace is still healthy, at a natural semantic boundary, when continuing in the same conversation has become more expensive or risky than starting a fresh successor.

Examples:
- Academy Kakashi final runtime closure finishes and Coding is about to begin #209 first-Konoha onboarding;
- a large Battle-integration tranche closes and the next task is save/load or World onboarding;
- one subsystem has accumulated substantial archaeology and a different subsystem is now next;
- the workspace is repeatedly rereading the same authority just to reconstruct its working set.

Soft rotation does **not** require a giant deep-sweep audit if all production-relevant work is already durable and the current workspace can truthfully state `CHAT-ONLY MATERIAL: NONE`.

A soft-rotation handoff may be compact.

### C. Deep-sweep retirement

Reserve for high-risk retirement conditions:
- actual/near context exhaustion;
- broad multi-system work;
- uncertain chat-only material;
- conflicting concurrent commits;
- unclear canonical ownership;
- accumulated guards/hotfixes/legacy layers needing archaeology;
- substantial issue drift;
- repeated connection/response interruption where durable state is uncertain.

Use the current retirement-audit protocol/version and perform full source-first archaeology.

## 3. Context-health warning signs

Because no exact context meter is available, Coding should use operational warning signs.

A soft rotation should be considered when one or more of these becomes material:

- Coding repeatedly rereads files or documents already investigated merely to reconstruct context;
- responses spend increasing space restating prior architecture before making a change;
- the workspace is no longer confident which implementation layer is canonical versus transitional;
- multiple patches/hotfixes for the same responsibility have accumulated in the same workspace;
- each new implementation turn requires large archaeology merely to recover the current working set;
- tool operations become unusually numerous relative to the size of the code change;
- response streaming becomes slow/interrupted or retries become common;
- a large subsystem has just closed and the next work belongs to a materially different subsystem;
- the workspace has completed several major implementation cycles and GitHub already contains sufficient recovery evidence.

These are warnings, not hard numeric thresholds.

Do not rotate merely because a conversation is long if the current workspace remains efficient, coherent, and fully source-grounded.

## 4. Checkpoint content

A recoverable Coding checkpoint should make the next workspace able to reconstruct active work directly from GitHub.

At minimum, current GitHub authority should reveal:

- current source HEAD / relevant implementation commit;
- primary active issue;
- exact responsibility just completed;
- exact current blocker or next action;
- current canonical owner files/functions where non-obvious;
- validation level reached;
- installed-browser status where relevant;
- any still-required owner dependency;
- whether any chat-only production material remains.

For ordinary checkpoints this information may be distributed across:
- source commits;
- issue comments;
- durable authority documents;
- QA/workflow evidence.

It need not be duplicated into a separate checkpoint file unless doing so materially improves recovery.

## 5. Compact soft-rotation receipt

When rotating early and no deep sweep is required, Coding should leave a compact durable receipt on the current primary issue or a dedicated implementation checkpoint document if the issue would become confusing.

Recommended fields:

```text
SOFT ROTATION CHECKPOINT

CURRENT HEAD:
[SHA]

PRIMARY ACTIVE ISSUE:
[# + title]

JUST COMPLETED:
[one concise responsibility + commit]

CURRENT CANONICAL OWNERS:
[file/function list only where needed]

CURRENT BLOCKER / NEXT ACTION:
[one exact item]

VALIDATION:
[source/headless/integration/browser/Golden state]

OPEN OWNER DEPENDENCIES:
[issue(s) or NONE]

CHAT-ONLY MATERIAL:
NONE
or exact item

SUCCESSOR STARTUP:
[short ordered list]

STEPHEN RELAY:
NONE
```

If `CHAT-ONLY MATERIAL` is not `NONE`, Coding must make it durable before claiming a clean soft rotation, or escalate to a deep-sweep retirement.

## 6. New Coding / Runtime chat recovery

A new Coding / Runtime workspace is expected to recover useful CE, owner, and predecessor information from GitHub directly.

It must not depend on Stephen manually copying old-chat discussion.

At startup, the successor should inspect, in this order:

1. live `main` / HEAD;
2. the primary active Coding issue(s) targeted to `CODING` / `CODING-RUNTIME`;
3. newest comments on those issues;
4. the latest soft-rotation checkpoint or retirement audit referenced by those comments;
5. exact current durable CE / Story / Combat / World authority linked from the active issue;
6. current production source/load order for the files it will change;
7. current diagnostics/workflows/browser evidence relevant to that lane.

The successor should then continue from GitHub authority, not reconstruct old conversation memory.

## 7. How CE-useful information reaches the successor

The successor Coding workspace may safely pull CE-useful information from GitHub when that information is made durable in one of the following forms:

### Binding durable CE contract

Reusable semantics, boundaries, runtime ordering, and cross-system law belong in durable CE / Coordination documents.

Examples:
- neutral Story decision realisation;
- factual resolver provider semantics;
- participant-first autonomy;
- lethal trajectory / ending evaluation;
- runtime durability / legacy retirement law.

The active Coding issue should link the exact current CE authority rather than paraphrase it indefinitely.

### GitHub issue handoff

A genuine owner dependency or implementation-ready return belongs in a GitHub issue/comment targeted to the owner token.

Issue = inbox/routing.
Commit/document = durable authority.

A successor Coding workspace must search current open issues targeted to its owner token at startup. Therefore handoffs do not need to be carried from old Coding chat to new Coding chat by Stephen.

### Implementation evidence comment

When Coding consumes a handoff, it should comment the exact implementation commit, files/owner seam, diagnostics, and remaining browser/Golden state on the source issue.

That comment becomes part of the next workspace's recovery trail.

### Retirement / soft-rotation receipt

Chat-local operational conclusions that matter to continuation should be reduced to a compact durable checkpoint or, when necessary, a deep-sweep audit.

## 8. What does NOT need to be handed forward

Do not preserve ordinary conversational scratch work merely because it existed.

The successor does not need:
- every theory considered;
- every failed search;
- every conversational explanation;
- repeated restatements of already-durable CE law;
- superseded branch ideas;
- temporary reasoning that produced no production-relevant result.

Preserve outcomes, current constraints, active dependencies, provenance, and exact evidence — not chat volume.

## 9. Cross-workspace handoff continuity

When a Coding workspace creates a genuine dependency for another owner:

1. create/update the GitHub handoff issue directly before rotating;
2. commit/record any authority or implementation evidence first where applicable;
3. link exact source/commit/document in the issue;
4. classify SEND NOW / QUEUE / RECORD ONLY;
5. leave Stephen relay as `NONE` when GitHub tooling is available.

When another owner has already returned authority:

- Coding's successor should discover it from the same issue/newest comments;
- do not require the retiring Coding workspace to restate the whole returned package in its chat response;
- do not duplicate the issue merely because the Coding chat changed.

A Coding workspace is disposable. The issue thread and source authority persist.

## 10. CE coordination continuity

CE / Codex / Coordination remains the cross-system semantic and traffic-control owner, but the new Coding workspace does not need CE to manually brief it on every restart.

The normal recovery model is:

`live source + current issue + linked durable CE authority + latest implementation evidence -> successor resumes`

Escalate back to CE only when the successor discovers:
- a genuine authority contradiction;
- unclear owner boundary;
- stale/superseded CE contract that cannot be reconciled locally;
- multi-owner collision;
- new reusable semantic gap;
- Alpha-priority ambiguity.

Do not use CE merely as a transcript-forwarding service.

## 11. Relationship to early retirement and legacy consolidation

Soft rotation and legacy-code retirement are complementary.

A fresh Coding workspace may be especially useful before a bounded consolidation tranche because it starts from a concise durable responsibility map rather than carrying the entire patch-generation history in conversational memory.

However:
- rotate first only when current state is recoverable;
- do not use rotation to avoid documenting a messy active state;
- do not delete old code simply because a new workspace starts;
- legacy retirement still requires consumer archaeology, successor proof, de-load, regression, browser proof, then deletion.

## 12. Connection interruption / timeout recovery

A response-stream interruption does not imply GitHub work failed or rolled back.

After interruption:

1. inspect current HEAD;
2. inspect recent relevant commits;
3. inspect newest issue comments;
4. inspect changed files/current source;
5. continue only from durable truth.

Do not blindly replay writes.

Frequent interruption is itself a context-health warning and may justify soft rotation once current durable state is confirmed.

## 13. Binding shorthand

> **Checkpoint frequently. Rotate deliberately. Deep-sweep only when necessary.**

> **GitHub carries continuity; chats carry working context.**

> **A new Coding chat should be able to recover CE law, owner handoffs, current implementation truth, and next action from GitHub without Stephen acting as the network cable.**

> **Preserve production truth, not transcript volume.**

## 14. Alpha boundary

This protocol changes execution/recovery discipline only.

It does NOT:
- reopen closed design;
- author new gameplay semantics;
- create a second issue/routing system;
- require routine full-project audits;
- make post-Alpha cleanup an Alpha blocker;
- weaken installed-browser / Golden requirements.

Primary priority remains: **Finish Shinobi Chronicles Alpha.**