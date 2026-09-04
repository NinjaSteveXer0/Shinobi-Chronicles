# Shinobi Chronicles — Victory Presentation Contract

Date: 4 September 2026

Status: **BINDING ALPHA UI / PRESENTATION AUTHORITY**

---

# Core lifecycle

The production Victory flow is:

`Battle victory committed`

→ `Victory presentation`

→ **CLAIM**

→ `confirmed post-claim Victory state remains visible`

→ **CONTINUE becomes available**

→ **CONTINUE**

→ `authoritative destination / next flow`

Canonical rule:

> **CLAIM ≠ CONTINUE.**

The two actions must not be collapsed into one automatic claim-and-route operation.

---

# Pre-claim Victory state

Before rewards are claimed, the Victory surface may present observer-safe resolved Battle outcome information and authoritative reward entitlement information.

The player-facing primary action is:

**CLAIM**

`CONTINUE` is not yet the action that commits reward application.

The UI does not re-resolve the Battle, invent rewards, recalculate entitlement, or infer claim success.

---

# Post-claim Victory state

After the authoritative claim operation succeeds:

- remain on the same Victory presentation;
- replace the pending-claim affordance with a confirmed claimed state;
- show only authoritative receipt/persistence information that is safe to expose;
- clearly indicate that rewards were claimed/applied;
- where an authoritative Chronicle/history receipt exists, it may be presented as recorded/updated feedback without inventing Chronicle content;
- **CONTINUE** becomes the destination-neutral next action.

The post-claim state must not re-run the claim operation.

Reload/re-render must preserve the already-claimed state from authoritative persistence rather than recreating the entitlement or applying rewards again.

---

# Continue semantics

**CONTINUE** means:

> leave the completed Victory presentation and follow the authoritative caller / encounter / progression route.

It is destination-neutral at UI level.

The destination may be, depending on authoritative context:

- return to an existing Story Scene continuation;
- return to a map/event/activity caller;
- advance an authored progression/completion flow;
- another explicitly supplied runtime continuation.

The UI must not hardcode one universal destination.

Canonical rule:

> **claim persistence ≠ navigation.**

> **Battle completion ≠ reward claim ≠ caller continuation.**

---

# Close / dismissal boundary

Closing, dismissing, refreshing or otherwise leaving the Victory presentation must not silently bypass authoritative pending-claim or continuation state.

Where the Battle has an unresolved reward entitlement, a generic close action must not be treated as an implicit claim or implicit continuation.

After claim, generic dismissal must not cause duplicate application or fabricate a new caller route.

---

# Final Strike attribution

Do not reopen finishing-source semantics.

The Victory presentation may identify the finishing **Character** where the authoritative Battle outcome exposes that fact.

Canonical rule:

> **Final Strike source = finishing Character, not Technique.**

A Technique may be described elsewhere when legitimately available, but the `Final Strike` attribution field itself remains Character-owned.

---

# Non-goals

This contract does not define:

- reward amounts;
- entitlement generation;
- reward application rules;
- Battle outcome resolution;
- Chronicle evidence generation;
- destination routing authority;
- save implementation.

UI consumes those authorities and presents their current state.

---

# Regression expectations

Coding should verify at minimum:

1. CLAIM and CONTINUE are separate actions.
2. CLAIM applies the authoritative entitlement at most once.
3. successful CLAIM leaves the Victory surface visible in a confirmed state.
4. CONTINUE does not call the claim mutation again.
5. reload after claim preserves claimed state without duplicate rewards.
6. pending claim cannot be bypassed through generic presentation close.
7. caller continuation is destination-neutral and supplied by runtime context.
8. Final Strike remains Character attribution.
