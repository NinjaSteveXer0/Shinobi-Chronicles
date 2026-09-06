# Shinobi Chronicles / Chronicle Engine — Specialist GitHub Handoff Protocol

**Date:** 6 September 2026  
**Status:** **COORDINATION AUTHORITY — ACTIVE**  
**Purpose:** remove Stephen from routine specialist-to-specialist message relaying while preserving owner boundaries, durable authority, and Alpha-first traffic discipline.

---

## 1. Core rule

GitHub is the shared asynchronous transport between specialist workspaces.

**Documents / source / commits remain durable authority. GitHub Issues carry active cross-workspace action traffic.**

A specialist must not rely on Stephen to copy a SEND NOW or QUEUE handoff into another workspace when the GitHub connector is available.

The default flow is:

`SPECIALIST DECISION / IMPLEMENTATION`

→ durable source/document/commit where appropriate

→ GitHub handoff issue targeted to the owner that must act

→ recipient checks its open handoff issues before declaring itself blocked or asking Stephen to relay anything

→ recipient acts against current GitHub authority

→ recipient records completion with commit/document/runtime evidence

→ recipient closes the consumed issue

→ if another owner must now act, recipient creates the next GitHub handoff issue directly.

Stephen is not the message bus.

---

## 2. When an issue is required

Create a GitHub handoff issue only for a genuine dependency:

### SEND NOW
Another owner must act before current Alpha work can proceed.

Create an open issue immediately.

### QUEUE
Real future work exists but does not block the current task.

Create an issue only when preserving the future action is useful enough to justify durable queue traffic. Mark it `QUEUE` in the title/body. Do not interrupt Stephen merely to relay it.

### RECORD ONLY
No owner currently needs to act.

Do **not** create a handoff issue. Preserve the information in the appropriate durable document/source if needed.

Repeated closed information is reinforcement/validation, not a new issue.

---

## 3. Required issue title format

Use:

`[HANDOFF][TO: <OWNER>][SEND NOW] <short action>`

or:

`[HANDOFF][TO: <OWNER>][QUEUE] <short action>`

Examples:

`[HANDOFF][TO: UI-ASSETS][SEND NOW] Commit Whisper Woods map binary`

`[HANDOFF][TO: CODING][SEND NOW] Activate Whisper Woods map binding`

`[HANDOFF][TO: CE-COORDINATION][QUEUE] Review generational epistemic inheritance`

Owner tokens should be stable and obvious:

- `CE-COORDINATION`
- `CODING`
- `WRITING`
- `WORLD-MISSIONS-EVENTS`
- `UI-ASSETS`
- `PL-REGISTRY-RANK`
- `ACQUISITION-CHARACTER-SYSTEMS`
- `PROGRESSION-DEVELOPMENT`
- `COMBAT-SKILLS-ITEMS-WEAPONS`
- `CHARACTER-CREATION-VISUALS`

If several owners may be involved, route one issue to `CE-COORDINATION` rather than creating parallel handoffs.

---

## 4. Required issue body

Every actionable handoff issue must state:

- **FROM:** originating specialist/workspace;
- **TO:** exact owner;
- **PRIORITY:** SEND NOW or QUEUE;
- **WHY THIS OWNER MUST ACT:** one concise dependency statement;
- **AUTHORITATIVE INPUTS:** exact document paths, commit SHAs, IDs, paths, contracts, or current source refs;
- **REQUESTED ACTION:** implementation/decision/verification required;
- **DO NOT INVENT / PRESERVE:** critical non-collapse boundaries;
- **COMPLETION CRITERIA:** exact evidence that closes the dependency;
- **DOWNSTREAM OWNER:** next owner if already known, otherwise `NONE / TBD`;
- **SUPERSEDES / DEPENDS ON:** related issue numbers when relevant.

A good handoff removes uncertainty. The issue must contain enough information for the recipient to act by reading current GitHub authority, without Stephen reconstructing context manually.

---

## 5. Recipient pull rule

Every specialist workspace must treat GitHub handoff issues as its inbox.

Before a specialist:

- reports `WAITING ON <OWNER>`;
- tells Stephen to relay a message;
- claims a dependency has not returned;
- begins work whose inputs may have changed;
- performs a `traffic check`;

it must search open issues for its owner token and inspect the latest relevant source/commits.

Example query concept:

`is:issue is:open "[HANDOFF][TO: CODING]"`

The recipient must not assume that absence from conversation memory means absence from the project.

---

## 6. Completion / return rule

When the recipient completes the requested action:

1. commit or record the resulting durable authority/evidence;
2. add a completion comment to the issue containing the exact commit SHA/document/runtime result;
3. close the consumed issue as completed;
4. if another owner now has a genuine dependency, create the next handoff issue directly to that owner;
5. reference the consumed issue in the downstream issue.

Do **not** return a copy-paste packet to Stephen merely so he can deliver the next step.

Example:

Writing creates issue to UI / Assets.

UI / Assets commits the binary, comments/ closes Writing→UI issue, then creates a new issue to Coding with exact approved path + asset commit.

Coding consumes that issue, implements/binds/tests, comments/closes it.

Stephen does not relay either transition.

---

## 7. No silent completion

A specialist completing work that another owner is waiting on must not merely commit the result and stop.

**Commit existence is authority; the handoff issue is notification/action routing.**

If Coding is waiting on an Assets binary, Assets must both:

- create/commit the authoritative asset; and
- directly create/complete the downstream Coding handoff issue when Coding must act.

This rule exists specifically to prevent the failure mode where work is correctly committed but the downstream owner never knows to consume it.

---

## 8. No conversation-only dependency traffic

A message in a specialist chat is not sufficient cross-workspace delivery.

Conversation may explain or discuss a handoff, but any genuine SEND NOW dependency must be represented by the GitHub issue when the connector is available.

If GitHub issue creation/search is unavailable in a particular workspace, Stephen relay is an explicit **fallback**, not the normal workflow.

---

## 9. Duplicate / stale traffic rule

Before creating a handoff issue, search for an existing open issue for the same target/topic.

If one exists:

- update/comment on the existing issue when the dependency is the same;
- create a new issue only when new evidence creates a genuinely distinct action;
- close superseded duplicates with a reference to the surviving issue.

Once an issue is closed, do not reopen it merely to route a new owner. Create the next issue and reference the prior one. This preserves handoff lineage.

---

## 10. WAITING ON format

When a workspace is genuinely waiting on another owner, prefer:

`WAITING ON UI / ASSETS — GitHub issue #123`

rather than an untracked `waiting on UI` statement.

This makes the dependency inspectable and prevents repeated handoff generation.

---

## 11. Traffic check behavior

A `traffic check` should inspect:

1. open SEND NOW issues targeted to the current owner;
2. open QUEUE issues targeted to the current owner;
3. duplicate/superseded issues;
4. latest relevant commits/source that may already satisfy an issue;
5. consumed issues that should now be closed;
6. whether completion creates exactly one necessary downstream issue.

Return Stephen only what he personally must decide or do. Prefer zero manual relay messages.

---

## 12. Alpha discipline

This protocol changes coordination transport, not ownership or Alpha scope.

Preserve:

- GitHub source > durable CE/SC documents > current specialist decisions > Project memory;
- design closed ≠ implemented ≠ runtime validated ≠ Golden/regression GREEN;
- cross-system relevance ≠ handoff required;
- no speculative system becomes an Alpha blocker merely because an issue can be created;
- direct specialist → specialist routing only when there is one obvious recipient;
- otherwise route to CE / Codex / Coordination.

---

## 13. Immediate Whisper Woods example

The intended chain is:

`Writing needs map`

→ Writing creates `[TO: UI-ASSETS]` issue

→ UI / Assets commits approved `Backgrounds/whisper_woods.png`

→ UI / Assets closes its incoming issue and creates `[TO: CODING]` issue with exact asset commit/path/QA state

→ Coding verifies, binds, runs diagnostics/Golden, then closes the issue

→ if Writing must resume after runtime closure, Coding creates `[TO: WRITING]` issue only if Writing actually has a new action.

No Stephen relay is required after the protocol is adopted.

---

## 14. Workspace bootstrap requirement

Each specialist workspace must receive this rule once, either through Project/workspace instructions or one initial bootstrap message:

> **Use `Documentation/Coordination/Specialist_GitHub_Handoff_Protocol.md` as active coordination authority. GitHub Issues are your cross-workspace inbox/outbox. Before asking Stephen to relay a dependency or reporting that another owner has not responded, check open `[HANDOFF][TO: <YOUR OWNER TOKEN>]` issues and current relevant GitHub authority. When your work creates a SEND NOW dependency for another owner, create the GitHub issue yourself; when you complete an incoming handoff, comment with evidence, close it, and create the next downstream issue directly if one is genuinely required. Stephen is fallback transport only if GitHub issue tooling is unavailable.**

This is a one-time protocol adoption step, not recurring message-bus work for Stephen.
