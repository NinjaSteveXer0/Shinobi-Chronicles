# Shinobi Chronicles / Chronicle Engine — Specialist GitHub Handoff Protocol

**Date:** 6 September 2026  
**Updated:** 12 September 2026  
**Status:** **COORDINATION AUTHORITY — ACTIVE**  
**Purpose:** remove Stephen from routine specialist-to-specialist message relaying while preserving owner boundaries, durable authority, Alpha-first traffic discipline, and automatic capture of production-relevant ideas before they can be lost in chat history.

---

## 1. Core rule

GitHub is the shared asynchronous transport between specialist workspaces.

**Documents / source / commits remain durable authority. GitHub Issues carry active cross-workspace action traffic and CE review traffic.**

A specialist must not rely on Stephen to copy a SEND NOW or QUEUE handoff into another workspace when the GitHub connector is available.

The default flow is:

`SPECIALIST DECISION / IMPLEMENTATION / PRODUCTION-RELEVANT IDEA`

→ durable source/document/commit where appropriate

→ GitHub handoff/review issue targeted to the owner that must act

→ recipient checks its open handoff issues before declaring itself blocked or asking Stephen to relay anything

→ recipient acts against current GitHub authority

→ recipient records completion with commit/document/runtime evidence

→ recipient closes the consumed issue

→ if another owner must now act, recipient creates the next GitHub handoff issue directly.

Stephen is not the message bus.

---

## 2. When an issue is required

Create a GitHub handoff issue only for a genuine dependency or required CE review:

### SEND NOW
Another owner must act before current Alpha work can proceed.

Create an open issue immediately.

### QUEUE
Real future work exists but does not block the current task.

Create an issue when preserving the future action is useful enough to justify durable queue traffic. Mark it `QUEUE` in the title/body. Do not interrupt Stephen merely to relay it.

### CE REVIEW
A production-relevant idea is closed/promising enough to preserve and it:

- changes or could change canon;
- crosses specialist ownership boundaries;
- introduces or alters reusable Chronicle Engine semantics;
- creates a new systemic capability or non-collapse rule;
- changes identity / Registry / PL / Rank / Acquisition / Progression / Battle / Knowledge / World / Story semantics outside the originating owner's sole boundary;
- could materially improve or simplify existing architecture;
- could conflict with existing durable authority;
- may become important later even if it is not Alpha-critical now;
- or Stephen explicitly says to keep, lock, preserve, develop, revisit, or have CE review it.

In those cases, make the idea durable and route **one consolidated review issue** to `CE-CODEX-COORDINATION` unless an existing CE review issue already covers it.

### RECORD ONLY
No owner currently needs to act and no CE review is required.

Do **not** create a handoff issue merely for traffic. Preserve production-relevant information in the appropriate durable document/source when needed.

Repeated closed information is reinforcement/validation, not a new issue.

---

## 3. Required issue title format

Use:

`[HANDOFF][TO: <OWNER>][SEND NOW] <short action>`

or:

`[HANDOFF][TO: <OWNER>][QUEUE] <short action>`

For production-relevant idea review use:

`[IDEA-REVIEW][TO: CE-CODEX-COORDINATION][QUEUE] <short idea>`

or `SEND NOW` only when the review truly blocks active Alpha work.

Examples:

`[HANDOFF][TO: UI-ASSETS][SEND NOW] Commit Whisper Woods map binary`

`[HANDOFF][TO: CODING][SEND NOW] Activate Whisper Woods map binding`

`[IDEA-REVIEW][TO: CE-CODEX-COORDINATION][QUEUE] Bloodline use creates observer Knowledge and future counter-preparation`

Owner tokens should be stable and obvious:

- `CE-CODEX-COORDINATION`
- `CODING`
- `WRITING`
- `WORLD-MISSIONS-EVENTS`
- `UI-ASSETS`
- `PL-REGISTRY-RANK`
- `ACQUISITION-CHARACTER-SYSTEMS`
- `PROGRESSION-DEVELOPMENT`
- `COMBAT-SKILLS-ITEMS-WEAPONS`
- `CHARACTER-CREATION-VISUALS`

If several owners may be involved, route one issue to `CE-CODEX-COORDINATION` rather than creating parallel handoffs.

---

## 4. Required issue body

Every actionable handoff or idea-review issue must state:

- **FROM:** originating specialist/workspace;
- **TO:** exact owner;
- **PRIORITY:** SEND NOW or QUEUE;
- **WHY THIS OWNER MUST ACT / WHY CE SHOULD REVIEW:** one concise dependency or semantic statement;
- **AUTHORITATIVE INPUTS:** exact document paths, commit SHAs, IDs, paths, contracts, or current source refs;
- **IDEA / REQUESTED ACTION:** implementation, decision, verification, refinement, or reconciliation required;
- **WHAT STEPHEN ACTUALLY APPROVED OR SAID:** when the idea originated directly from Stephen, preserve the substance faithfully and do not silently broaden it;
- **DO NOT INVENT / PRESERVE:** critical non-collapse boundaries;
- **COMPLETION CRITERIA:** exact evidence that closes the dependency/review;
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

CE / Codex / Coordination must additionally inspect open:

`[IDEA-REVIEW][TO: CE-CODEX-COORDINATION]`

traffic during coordination/traffic checks.

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

UI / Assets commits the binary, comments/closes Writing→UI issue, then creates a new issue to Coding with exact approved path + asset commit.

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

## 8. No conversation-only dependency or canon traffic

A message in a specialist chat is not sufficient cross-workspace delivery **and is not sufficient durable preservation of production-relevant canon/design**.

Conversation may explain, explore or discuss an idea, but:

- any genuine SEND NOW dependency must be represented by a GitHub issue when the connector is available;
- any closed/approved production-relevant Story, canon, system, semantic or cross-owner decision must be written to durable GitHub authority before the workspace treats it as safely preserved;
- any production-relevant idea meeting the CE REVIEW criteria in Section 2 must be routed to CE automatically without waiting for Stephen to remember it later.

If GitHub issue/file creation/search is unavailable in a particular workspace, Stephen relay is an explicit **fallback**, not the normal workflow.

---

## 9. Duplicate / stale traffic rule

Before creating a handoff or idea-review issue, search for an existing open issue for the same target/topic.

If one exists:

- update/comment on the existing issue when the dependency/review is the same;
- create a new issue only when new evidence creates a genuinely distinct action;
- close superseded duplicates with a reference to the surviving issue.

Once an issue is closed, do not reopen it merely to route a new owner. Create the next issue and reference the prior one. This preserves handoff lineage.

For idea capture, prefer **one consolidated issue per coherent idea/topic**, not one issue per conversational sentence or brainstorm fragment.

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
3. open IDEA-REVIEW issues targeted to CE when the current owner is CE / Codex / Coordination;
4. duplicate/superseded issues;
5. latest relevant commits/source that may already satisfy an issue;
6. consumed issues that should now be closed;
7. whether completion creates exactly one necessary downstream issue.

Return Stephen only what he personally must decide or do. Prefer zero manual relay messages.

---

## 12. Alpha discipline

This protocol changes coordination transport and durability, not ownership or Alpha scope.

Preserve:

- GitHub source > durable CE/SC documents > current specialist decisions > Project memory;
- design closed ≠ implemented ≠ runtime validated ≠ Golden/regression GREEN;
- cross-system relevance ≠ handoff required;
- idea preservation ≠ Alpha implementation requirement;
- CE review ≠ automatic promotion into Alpha scope;
- no speculative system becomes an Alpha blocker merely because an issue can be created;
- direct specialist → specialist routing only when there is one obvious recipient;
- otherwise route to CE / Codex / Coordination.

---

## 13. CE / Codex / Coordination idea-review authority

CE / Codex / Coordination is the **review and reconciliation hub** for production-relevant ideas that meet the CE REVIEW criteria.

This does **not** erase specialist ownership.

The originating specialist remains authoritative for its own domain content unless a higher durable authority or cross-system contradiction requires reconciliation.

For each incoming idea, CE must inspect current GitHub authority and choose one explicit disposition:

### ACCEPT
The idea is compatible and valuable as-is.

CE may make the reusable/cross-system semantic contract durable and route owner-specific implementation/content work.

### REFINE / IMPROVE
The idea is valuable but can be made stronger, more reusable, clearer, safer from semantic collapse, or better integrated with existing systems.

CE may improve the **cross-system contract / canon framing / reusable architecture / non-collapse boundaries**, while preserving the originating owner's domain ownership.

If refinement changes an owner-specific design decision rather than merely reconciling it, route the changed decision back to that owner or Stephen when required.

### RETURN TO OWNER
The idea is sound but needs exact domain content/decision from the proper specialist before CE can close the cross-system layer.

CE routes one issue to the relevant owner and avoids inventing their content.

### VETO / SUPERSEDE
CE may reject or supersede an idea when current durable authority proves it would:

- contradict canon/Recorded History;
- collapse protected semantics;
- duplicate an existing system unnecessarily;
- violate ownership/identity/state boundaries;
- create an Alpha-breaking contradiction;
- fabricate authority or Knowledge;
- or conflict with newer binding authority.

The veto must cite the exact durable contradiction/reason. `CE does not like it` is not sufficient.

### DEFER / RECORD ONLY
The idea is worthwhile but not appropriate for current Alpha scope or does not yet require action.

Preserve it durably with enough context for later recovery; do not turn it into an Alpha blocker.

Canonical rule:

> **Specialists create and close domain ideas. CE/Codex/Coordination protects the whole system: it may accept, strengthen, reconcile, return, veto/supersede, or defer cross-system production ideas — but it must not silently steal owner authority or invent missing domain content.**

---

## 14. Automatic production-idea recognition and durability rule

### 14.1 Stephen does not have to say `save this`

The specialist owns recognition.

Stephen may explicitly say `keep this`, `lock this`, `save this`, `canon`, `we need this later`, or equivalent, and those statements are mandatory capture triggers. But **absence of those words is not permission to leave an important idea chat-only**.

Every specialist must continuously classify its own conversation using the three-gate test below.

### 14.2 Gate One — SHOULD THIS SURVIVE THIS CHAT?

A specialist must make an idea/decision durable when **any** of the following is true:

- Stephen approves it, positively selects it over alternatives, or builds later reasoning on top of it;
- the specialist itself describes it as closed, approved, locked, canonical, authoritative, final, accepted, required, preserved, or a future plan;
- it establishes or changes a factual Story/canon/World/Character history;
- it changes future gameplay, runtime behavior, content eligibility, capability semantics, progression, acquisition, Registry, Rank, PL, Battle, UI, asset use, persistence, or CE architecture;
- it creates an exception, edge-case rule, non-collapse boundary, fallback, precedence rule, or protected gap;
- it creates a named mechanic, route, event family, system, content lane, variant, representation, relationship, faction fact, location fact, mission beat, reward concept, or future hook;
- it introduces exact IDs, formulas, numerical packages, required assets, file paths, schemas, state transitions, or validation requirements that future work may depend on;
- another specialist could reasonably make a different decision if they did not know this information;
- later implementation/content would be wrong, weaker, contradictory, or incomplete without it;
- the idea has been discussed more than once or survives comparison against alternatives;
- Stephen reacts in a way that clearly adopts the idea even without formal words such as `save` or `lock`;
- losing it would plausibly force Stephen to reconstruct it from memory;
- reproducing it later would require meaningful creative/design effort rather than trivial re-derivation.

A practical one-line test is:

> **If a competent successor specialist would want to know this before making a future production decision, preserve it.**

Another equivalent test is:

> **If losing this would annoy Stephen because he already spent real thought deciding it, preserve it.**

### 14.3 What does NOT need automatic durable capture

Do not flood GitHub with every conversational fragment.

Durable capture is normally unnecessary for:

- clearly rejected ideas whose rejection itself has no future semantic importance;
- throwaway examples used only to explain an already-durable rule;
- ordinary factual questions that do not change project authority;
- transient wording/style alternatives that were never selected;
- duplicate reinforcement of authority already durable and current;
- casual reactions with no production consequence;
- speculative brainstorming that is immediately abandoned and creates no useful future lane.

If rejection itself matters because the project must **not** revisit the idea, record the rejection/supersession rather than discarding it silently.

### 14.4 Uncertain importance defaults to preservation without promotion

When a specialist is genuinely unsure whether an idea is important enough, the safe default is:

**preserve lightly; do not promote.**

That means record it as `DISCUSSION`, `CANDIDATE`, `PROPOSAL`, `PROTECTED GAP`, `POST-ALPHA`, or another truthful non-binding status rather than either:

- losing it completely; or
- falsely declaring it canon.

Durability and authority level are separate questions.

**preserved != approved**  
**approved != implemented**  
**implemented != runtime validated**  
**runtime validated != Golden**

### 14.5 Gate Two — DOES CE NEED TO REVIEW IT?

After deciding an idea should survive the chat, ask whether it requires CE / Codex / Coordination review.

Route one consolidated `[IDEA-REVIEW][TO: CE-CODEX-COORDINATION]` issue when the preserved idea:

- changes or creates canon / Recorded History / chronology;
- changes terminology or Codex meaning;
- crosses more than one specialist ownership boundary;
- creates reusable Chronicle Engine semantics;
- creates a systemic capability rather than one isolated content instance;
- introduces a new exception/non-collapse rule that other systems must respect;
- could contradict or supersede existing durable authority;
- changes identity, Knowledge, Access, ownership, assignment, deployment, Rank, PL, Progression, Battle, World, Story, relationship, provenance, persistence, or event semantics outside one owner's isolated implementation detail;
- appears useful beyond the immediate scene/character/item/mission;
- materially simplifies or improves existing architecture;
- could create hidden downstream technical/content debt if accepted carelessly;
- or would benefit from CE checking whether the idea can be made more general, safer, cleaner, or more powerful without breaking owner boundaries.

CE review is **not** required merely because an idea is interesting. Purely local specialist content may be made durable by its owner without CE traffic.

### 14.6 Gate Three — DOES SOMEONE NEED TO ACT NOW?

After durability and CE-review classification, determine traffic priority:

- **SEND NOW** — another owner must act before current Alpha work can continue;
- **QUEUE** — genuine future action/review exists but does not block the current task;
- **RECORD ONLY** — preservation is sufficient; nobody needs to act now.

This prevents automatic preservation from becoming automatic interruption.

### 14.7 Automatic capture flow

The expected specialist behavior is:

`conversation produces idea/decision`

→ **Gate One:** would future production benefit from remembering it?

→ if YES, preserve it with truthful status

→ **Gate Two:** is it cross-system / canon / reusable / collision-prone?

→ if YES, route one CE idea-review issue

→ **Gate Three:** does anybody need to act now?

→ SEND NOW / QUEUE / RECORD ONLY

Stephen should not have to trigger any of these steps manually.

### 14.8 Durability mechanisms

Durability may be satisfied by:

1. updating an existing authoritative document and committing it;
2. creating a new durable document and committing it;
3. for a not-yet-closed idea, creating/updating a GitHub issue that preserves the exact idea and its status (`PROPOSAL`, `DISCUSSION`, `CANDIDATE`, etc.).

Do **not** promote uncertain discussion into canon merely to preserve it. Preserve the status faithfully.

Use exact state labels where useful:

- `DISCUSSION` — explored, not approved;
- `CANDIDATE` — promising, not closed;
- `CLOSED / BINDING` — approved durable authority;
- `SUPERSEDED` — no longer current;
- `PROTECTED GAP` — intentionally unresolved;
- `POST-ALPHA` — preserved, not current scope.

The goal is not to upload every thought. The goal is:

> **No production-relevant idea should exist only in chat once it matters enough that losing it would hurt the project.**

---

## 15. Workspace archive / context-limit safety rule

Before a specialist workspace is archived, replaced, or reaches a practical context limit, it must perform a final durability sweep of its accessible history.

It must recover any production-relevant material that is:

- chat-only;
- approved but uncommitted;
- discussed repeatedly but never classified;
- partially handed off;
- superseded without a durable supersession record;
- implemented without durable design provenance;
- or likely to be lost when the workspace disappears.

Recovered material must be classified and made durable before archive where possible.

If exact recovery is impossible, record a **PROTECTED RECOVERY GAP** rather than fabricating a replacement and calling it recovered authority.

---

## 16. Immediate Whisper Woods example

The intended chain is:

`Writing needs map`

→ Writing creates `[TO: UI-ASSETS]` issue

→ UI / Assets commits approved `Backgrounds/whisper_woods.png`

→ UI / Assets closes its incoming issue and creates `[TO: CODING]` issue with exact asset commit/path/QA state

→ Coding verifies, binds, runs diagnostics/Golden, then closes the issue

→ if Writing must resume after runtime closure, Coding creates `[TO: WRITING]` issue only if Writing actually has a new action.

No Stephen relay is required after the protocol is adopted.

---

## 17. Workspace bootstrap requirement

Each specialist workspace must receive this rule once, either through Project/workspace instructions or one initial bootstrap message:

> **Use `Documentation/Coordination/Specialist_GitHub_Handoff_Protocol.md` as active coordination authority. GitHub Issues are your cross-workspace inbox/outbox and GitHub documents/commits are durable production memory. Stephen does NOT need to say `save this`: you are responsible for automatically recognising production-relevant ideas using the protocol's three-gate test. If a competent successor would need an idea/decision to make correct future production choices, preserve it with its truthful status. If it changes canon, crosses owner boundaries, creates reusable CE semantics/systemic capability, risks a semantic collision, or could materially improve the wider project, create/update one consolidated `[IDEA-REVIEW][TO: CE-CODEX-COORDINATION]` issue. CE may ACCEPT, REFINE/IMPROVE, RETURN TO OWNER, VETO/SUPERSEDE with evidence, or DEFER/RECORD ONLY while preserving specialist ownership. Before asking Stephen to relay a dependency or reporting that another owner has not responded, check open issues for your owner token and current relevant GitHub authority. When your work creates a SEND NOW dependency for another owner, create the GitHub issue yourself; when you complete an incoming handoff, comment with evidence, close it, and create the next downstream issue directly if genuinely required. Stephen is fallback transport only if GitHub tooling is unavailable.**

This is a one-time protocol adoption step, not recurring message-bus work for Stephen.