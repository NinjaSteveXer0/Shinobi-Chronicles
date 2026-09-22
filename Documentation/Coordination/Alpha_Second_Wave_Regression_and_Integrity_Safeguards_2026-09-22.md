# Shinobi Chronicles — Alpha Second-Wave Regression and Integrity Safeguards

**Date:** 2026-09-22  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING SAFEGUARD DIRECTION — QUEUED IMPLEMENTATION**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA WITHOUT TURNING SAFEGUARDS INTO A SECOND PRODUCT**

---

## 1. Purpose

The project now has strong first-wave protection around:

- one responsibility -> one canonical owner;
- replacement/retirement;
- duplicate-owner detection;
- production-load parity;
- local-sync notification;
- runtime build fingerprint;
- merge-safety / branch-protection rollout;
- product-intent interpretation;
- specialist GitHub refresh.

A second review identifies several high-value failure classes not yet covered strongly enough.

This document deliberately limits the second wave to safeguards that would have caught real or plausible Alpha failures early.

Do not create speculative infrastructure beyond these needs.

---

# 2. Contract-test integrity / anti-self-certification

A test suite is not protective if implementation and expected results can be silently changed together until the test passes.

Canonical rule:

> **Coding must not “fix” a failing contract by weakening the test unless current durable authority genuinely changed.**

For contract/authority-derived fixtures and tests, preserve where practical:

```text
authorityRef
contractVersion
responsibilityId
expectedInvariant
```

If a runtime PR changes both implementation and the expected contract fixture/assertion, it must explicitly classify why:

- AUTHORITY_CHANGED;
- BUG_IN_TEST;
- INTENTIONAL_SCHEMA_MIGRATION.

A changed expected result without one of those explanations is suspicious and should fail/flag review.

Deleting, skipping, broadening or weakening an assertion solely to obtain GREEN is prohibited.

---

# 3. Route graph / interactive reachability gate

Every Story/Origin route package should be machine-checkable for structural completeness.

Where manifests exist, QA should prove:

- every non-terminal beat has at least one legitimate outgoing transition;
- every rendered enabled choice maps to exactly one semantic intent/handler;
- no enabled button is handlerless;
- no choice maps to multiple competing semantic owners;
- every referenced next beat exists;
- every Battle caller has a valid return contract;
- every required Battle result class is handled;
- every terminal beat reaches the intended terminal/completion boundary;
- no orphan authored beat is unreachable unintentionally;
- no route can silently fall into a generic fallback because an exact mapping is missing.

Canonical rule:

> **No player-facing enabled action without exactly one reachable semantic path.**

This is intended to catch the class of “button does nothing” / dead-end / wrong return defects before Stephen sees them.

---

# 4. Save compatibility corpus

Fresh-start tests are insufficient for a game that changes during Alpha.

Maintain a bounded set of representative save fixtures covering important lifecycle points, for example:

- pre-Origin selection;
- mid-Origin before Battle;
- post-Battle before Story continuation;
- mid-route with custody/object state;
- terminal reward/Receipt boundary;
- Origin complete / team formation;
- Academy free play.

Save fixtures must declare a schema/runtime generation.

Current runtime should prove:

- current-version save loads exactly;
- supported previous-version save migrates deterministically;
- migration is idempotent;
- reload does not duplicate reward/development/acquisition;
- committed choices/outcomes do not reroll;
- retired fields do not resurrect retired runtime behavior;
- compatibility reader does not become a second semantic writer.

Do not preserve every historical development save forever. Keep a bounded supported compatibility horizon appropriate to Alpha.

---

# 5. Browser runtime error gate

A browser path may look superficially correct while emitting errors that become later failures.

Installed/headless browser QA should fail on unexpected:

- `pageerror`;
- unhandled promise rejection;
- uncaught runtime exception;
- `console.error`;
- failed script/module load;
- failed required asset request;
- missing required runtime manifest/build fingerprint.

Allowlist only a documented, intentional browser warning/error that cannot currently be removed.

An allowlist entry requires reason + retirement/review condition.

Canonical rule:

> **Browser GREEN means no unexpected runtime errors behind the visible screen.**

---

# 6. Lifecycle / re-entry leak gate

Single-pass success does not prove a UI/runtime lifecycle is safe.

For high-risk shared surfaces, repeat the same lifecycle several times:

```text
open -> act -> leave -> reopen
Story -> Battle -> Story -> Battle -> Story
save -> reload -> resume
```

After repetition, prove where practical:

- canonical root count remains stable;
- no duplicate visible panel/root;
- no duplicate semantic event handler;
- one click produces one action;
- no old timer/animation callback recommits state;
- no stale observer/listener revives retired presentation;
- no cumulative transition delay from repeated timers/listeners.

This is particularly important for Story Scene Board, Battle return, overlays and reusable UI surfaces.

---

# 7. Runtime reference-integrity gate

Production runtime/content references should be validated before browser handoff.

At minimum validate relevant references such as:

- asset path exists;
- Story beat ID exists;
- speaker/participant ref exists;
- resolver/intent ID exists;
- Battle caller/config exists;
- Battle return target exists;
- reward/development package ID exists;
- referenced runtime module is in the intended production load path.

Do not infer a replacement path silently when the exact reference is missing.

Fail closed and identify the missing authority/reference.

---

# 8. Release-candidate evidence manifest

For each meaningful Alpha release candidate / browser acceptance request, record one compact evidence manifest containing:

```text
candidateHead
runtimeFingerprint
productionLoadManifestVersion
requiredQASuite
knownNonBlockingIssues[]
knownBlockingIssues[]
saveCompatibilityResult
browserErrorResult
localSyncRequirement
expectedLocalHead
```

This is not another gameplay system.

Its purpose is to stop “which build/test state are we actually discussing?” confusion.

---

# 9. Scope control

These safeguards are valuable only if they remain bounded.

Do NOT require:

- visual pixel-perfect snapshot tests for every screen;
- permanent compatibility with every development save ever created;
- exhaustive performance profiling before Alpha;
- enterprise multi-review bureaucracy;
- speculative telemetry infrastructure;
- duplicate QA systems for each specialist.

Prefer one reusable invariant over dozens of route-specific tests.

---

# 10. Activation order

1. Finish #305 always-run merge-safety gate.
2. Enable/prove branch protection as separately authorised.
3. Implement the highest-value second-wave safeguards:
   - contract-test integrity;
   - route/reachability gate;
   - browser runtime error gate;
   - save compatibility corpus.
4. Add lifecycle/re-entry and reference-integrity checks to the shared surfaces as they are touched.
5. Use the release-candidate evidence manifest for the next broad Origin validation tranche.
6. Do not delay Alpha for speculative low-value automation.

---

# Final lock

> **The next major risk is no longer only stale code. It is false confidence: tests that certify changed expectations, routes with dead interactions, fresh-start-only validation, browser errors hidden behind apparently working UI, and lifecycle defects that appear only after repeated use. Safeguards should target those failure classes directly while remaining small enough that finishing Alpha stays the priority.**
