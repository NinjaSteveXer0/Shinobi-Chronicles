# Coding Context Health and Soft Retirement Protocol

**Status:** CANONICAL PROCESS AUTHORITY  
**Effective:** 2026-09-16  
**Scope:** Coding/runtime implementation chats, repository-backed implementation work, and successor handoffs  
**Authority relationship:** This protocol supplements existing repository-write, implementation-durability, and deep-sweep retirement practices. It does not replace forensic deep-sweep audits when those are genuinely required.

---

## 1. Purpose

Coding work must preserve its execution state continuously rather than waiting for a conversation to approach context exhaustion.

The normal operating model is disciplined repository-backed shift work: implement a coherent responsibility, prove it, commit it, leave durable evidence, checkpoint the current state, and continue. A healthy successor chat is a routine rotation, not evidence of failure.

This protocol exists so that a Coding conversation can retire while it is still healthy and understandable, without requiring a large forensic reconstruction every time work moves to a successor.

---

## 2. Core invariants

> **Do not wait for context exhaustion to preserve state. Preserve state continuously, and rotate workspaces at natural semantic boundaries when continuation cost begins exceeding restart cost.**

> **A successor chat started from a current durable checkpoint is routine rotation, not an emergency retirement.**

GitHub remains implementation authority. Chat memory is useful working context, but it must not become the only surviving authority for implementation state, ownership, validation status, unresolved blockers, or the next exact action.

---

## 3. Normal Coding operating loop

The default implementation rhythm is:

> **Inspect → implement one responsibility → QA → commit → issue evidence → checkpoint → continue.**

A coherent implementation tranche should be committed as soon as its responsibility is internally complete and its claimed validation has actually been run. Unrelated responsibilities should not be held together merely to reduce commit count.

After a substantial milestone, Coding must leave a small durable checkpoint before continuing into the next substantial tranche.

Checkpoint frequency should be high. Chat retirement frequency can remain moderate.

---

## 4. Three context-health levels

### 4.1 Normal checkpoint

A normal checkpoint is routine and should occur after each substantial coherent milestone. It is not a retirement event.

At minimum, the checkpoint records:

```text
CURRENT HEAD: <exact committed SHA>
ACTIVE ISSUE: #<issue> | NONE
JUST COMPLETED: <what became true in this tranche>
CURRENT CANONICAL FILES: <authoritative files/owners>
CURRENT BLOCKER: <exact blocker> | NONE
BROWSER STATUS: <honest current browser validation state> | N/A
NEXT ACTION: <single next exact action>
CHAT-ONLY MATERIAL: NONE | <explicit undurable material>
```

The checkpoint should be durable in repository documentation, issue evidence, or another repository-backed authority appropriate to the work. A checkpoint that exists only in conversational prose does not satisfy this protocol.

`CHAT-ONLY MATERIAL: NONE` means all implementation-relevant decisions, code, ownership changes, validation evidence, blockers, and required successor context have already been made durable. If that is not true, the remaining material must be named explicitly and made durable as soon as practical.

### 4.2 Soft rotation

Soft rotation is a healthy successor handoff performed before context distress.

Coding should perform a context-health check after roughly **2–3 large implementation cycles**, or sooner when recovery/archaeology traffic becomes disproportionate. This is a decision point, not an automatic forced retirement after a fixed number of commits.

Soft rotation is appropriate when:

- a natural semantic boundary has been reached;
- a major subsystem has just been completed and another major subsystem is about to begin;
- the current checkpoint is complete and repository authority is clear;
- continuation cost is beginning to exceed the cost of starting a successor from the checkpoint; or
- context-health warning signs are accumulating even though the chat is still functional.

A clean subsystem boundary such as “Kakashi final runtime closure finished; next is tutorial/onboarding work” is a preferred rotation point. There is little value in carrying a large body of completed subsystem archaeology into an unrelated implementation phase when the completed state is already durable.

A routine soft rotation does **not** require a giant retirement audit when the current checkpoint is complete, ownership is known, and `CHAT-ONLY MATERIAL` is `NONE`.

### 4.3 Deep-sweep retirement

Deep-sweep retirement is the forensic/archaeological path. It is not the default way to change Coding shifts.

Use a deep sweep when one or more of the following are true:

- the conversation is at or near context/max-length distress;
- many systems were touched and ownership is uncertain;
- important implementation material may exist only in chat;
- canonical versus transitional layers cannot be recovered cheaply;
- there is substantial uncommitted or ambiguously committed work;
- repeated recovery attempts are producing contradictory state; or
- a successor cannot safely resume from the latest ordinary checkpoint without reconstructing history.

Deep-sweep audits remain valuable emergency and periodic archaeology tools. They must not become routine overhead for a healthy, disciplined handoff.

---

## 5. Context-health warning signs

Coding must checkpoint immediately and strongly consider soft rotation when several of these behaviours appear:

- repeatedly re-reading files already investigated merely to recover the working set;
- repeatedly explaining its own previous architecture back to itself before every change;
- producing increasingly long “continuing from…” recovery preambles;
- needing a large number of GitHub calls just to rediscover the current working set;
- losing confidence about which layer is canonical versus transitional;
- accumulating several patches or hotfixes in the same chat;
- response streaming becoming unusually slow, fragile, or repeatedly interrupted;
- one implementation turn consuming dozens of repository operations primarily for context recovery rather than implementation; or
- beginning another major subsystem immediately after completing a large subsystem in the same already-heavy conversation.

No single warning sign automatically forces retirement. The governing question is whether carrying the current conversation forward remains cheaper and safer than bootstrapping a successor from durable repository state.

---

## 6. Coding owns context health

Stephen should not need to diagnose that a Coding chat has become overloaded.

Coding is responsible for:

- committing coherent implementation tranches promptly;
- keeping issue/repository evidence current;
- recording checkpoints before context is endangered;
- noticing rising recovery cost;
- choosing natural semantic boundaries for possible rotation; and
- escalating from normal checkpoint → soft rotation → deep sweep only when the evidence warrants it.

The purpose is not to maximize the lifetime of one chat. The purpose is to maximize implementation continuity, repository truth, validation honesty, and low-cost recoverability.

---

## 7. Successor handoff protocol

Before a planned soft rotation, the outgoing Coding chat must ensure:

1. the exact current `main/HEAD` is pinned;
2. the active issue/work item is identified;
3. the just-completed tranche is committed;
4. the current canonical owners/files are named;
5. the current blocker is named, or explicitly `NONE`;
6. source/headless/integration/browser/golden status is stated honestly where relevant;
7. chat-only implementation material has either been made durable or explicitly enumerated;
8. the next exact action is stated; and
9. any temporary compatibility layer that remains loaded has its owner/retirement condition represented in durable authority.

The successor then:

1. re-fetches live `main/HEAD` before mutation;
2. confirms the active issue and named canonical files against GitHub;
3. verifies that the checkpoint still matches repository truth;
4. reads only the minimum additional authority necessary to resume safely; and
5. continues from repository state rather than reconstructing the previous chat as if it were the source of truth.

If the live repository has advanced since the checkpoint, the successor reconciles against the newer GitHub authority before editing.

---

## 8. Validation and checkpoint honesty

A checkpoint must not upgrade validation status merely because code was committed.

Use only validation states that are actually true. If installed-browser replay has not happened after the checkpoint commit, record that explicitly. If a tranche is docs-only, `BROWSER STATUS: N/A — docs-only` is appropriate.

A connection interruption after a commit should therefore be cheap to recover from: the exact committed SHA and durable evidence establish what became true even if the conversational response did not finish.

---

## 9. Relationship to deep-sweep audits

The existence of a successor chat does not itself justify a max-length deep-sweep audit.

Routine rotation can be intentionally small:

```text
CURRENT HEAD: <sha>
ACTIVE ISSUE: #188
JUST COMPLETED: <completed responsibility>
CURRENT CANONICAL FILES: <authoritative owners>
CURRENT BLOCKER: <remaining closure>
BROWSER STATUS: <exact state>
NEXT ACTION: <next responsibility>
CHAT-ONLY MATERIAL: NONE
```

A deep-sweep audit is required only when this compact checkpoint cannot safely describe reality because history, ownership, uncommitted work, or chat-only material is uncertain.

The desired outcome is ordinary engineering shift change:

> **tranche → commit → checkpoint → tranche → commit → checkpoint → context-health check → continue or cleanly rotate**

—not waiting for context failure and then reconstructing the project from conversational archaeology.

---

## 10. Standing rule

For future Coding chats, context preservation is continuous responsibility.

**Normal checkpoint** is the routine durability mechanism.  
**Soft rotation** is the preferred healthy successor mechanism.  
**Deep-sweep retirement** is the exception for high-risk, ambiguous, or context-distressed recovery.

When in doubt at a natural feature boundary, compare the cost of continuing the current chat with the cost of re-fetching GitHub from a complete durable checkpoint. Choose the path that preserves implementation accuracy with less recovery overhead.