# Shinobi Chronicles — Specialist GitHub Sync Heartbeat and Protocol Refresh Rule

**Date:** 2026-09-22  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING PROJECT-WIDE COORDINATION RULE — ACTIVE**

## 1. Purpose

Stephen must not be required to notify every specialist chat whenever another workspace changes a rule, closes an issue, or publishes new durable authority.

GitHub is the project inbox and durable authority.

However, specialist chats do **not** magically receive new GitHub state without checking it.

Therefore every workspace must perform a lightweight synchronization heartbeat at the correct boundaries.

---

## 2. When to refresh

A specialist must refresh live GitHub authority:

1. at the start of a new owned work cycle;
2. before beginning a new substantive task;
3. after a long interruption / new chat continuation;
4. before claiming another owner has not responded;
5. before acting on a potentially stale handoff;
6. before major implementation/authoring whose inputs may have changed;
7. when Stephen references a new issue/commit/rule;
8. before a traffic check;
9. before final completion/closure evidence.

A specialist does **not** need to perform a full GitHub sweep for every conversational sentence.

---

## 3. Minimum heartbeat

At minimum:

- fetch current `main` / relevant production HEAD;
- search open issues targeted to the specialist owner token;
- inspect latest relevant issue comments;
- inspect current durable authority directly referenced by those issues;
- inspect #147 / standing all-specialist protocol updates when the work cycle begins or a coordination rule may have changed.

Coding additionally consumes #219.

---

## 4. No Stephen relay requirement

Canonical rule:

> **Stephen does not need to announce global rule changes to each chat.**

The originating workspace must make the rule durable and route it through the appropriate standing protocol/issue.

The receiving workspace is responsible for discovering it on its next heartbeat.

Stephen may mention a change for convenience, but that is not the transport mechanism.

---

## 5. What “automatic” means

“Automatic” in this project means:

> **the specialist is required to check GitHub at the prescribed work boundary without Stephen prompting it.**

It does **not** mean every existing chat receives push notifications or instantly knows a remote commit the moment it happens.

A chat that has not refreshed can be stale.

Therefore no specialist may rely only on conversation memory when current GitHub authority could have changed.

---

## 6. Mid-task stability

Do not interrupt an atomic operation merely because another protocol comment landed.

Finish the safe atomic checkpoint, then refresh before the next work unit.

If the new authority directly invalidates the work in progress and is known, stop at the nearest safe checkpoint and reconcile.

---

## 7. Global protocol routing

Project-wide rules should be recorded in durable documents and announced through standing protocol issues such as:

- #147 — all specialists;
- #219 — Coding / Runtime;

or the appropriate owner-specific standing authority.

Do not create ten duplicate handoff issues merely to tell ten workspaces the same global rule.

---

## 8. Specialist response after refresh

If new authority changes the current task:

- consume it;
- state the impact briefly;
- continue from the updated authority.

If it does not affect the current task:

- continue without ceremonial acknowledgement.

---

## 9. Staleness protection

Before telling Stephen to browser-test, approve content, or make a decision, the specialist must ensure the candidate authority/source is current.

For Coding:
- include LOCAL SYNC status;
- expected local HEAD;
- runtime fingerprint once #303 is implemented.

For Writing:
- confirm the scene package is the current durable version before asking for approval.

---

# Final lock

> **Stephen is not the project notification bus. Specialists must pull current GitHub authority at the start of each substantive work cycle and other defined refresh boundaries. They do not need to re-scan GitHub after every casual message, but they may not assume chat memory is current when GitHub could have advanced.**
