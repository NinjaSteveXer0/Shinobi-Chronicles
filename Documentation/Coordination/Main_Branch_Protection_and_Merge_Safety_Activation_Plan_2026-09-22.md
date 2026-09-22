# Shinobi Chronicles — Main Branch Protection and Merge Safety Activation Plan

**Date:** 2026-09-22  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING STAGED SAFETY PLAN — DO NOT HARD-ENABLE UNTIL GATE WORKFLOW IS PROVEN**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA WITHOUT LOCKING THE PROJECT OUT OF ITS OWN DELIVERY FLOW**

---

## 1. Why this exists

Current repository state on 2026-09-22:

- `main` is not branch-protected;
- GitHub rulesets list is empty;
- runtime ownership / retirement safeguards now exist in source and QA;
- current Coding and specialist workflows still commonly write directly to `main`;
- several important workflows use path filters and therefore do not run on every pull request.

This creates two risks:

1. bad runtime architecture can still reach `main` if checks are bypassed or never run;
2. enabling strict branch protection too early can block legitimate documentation / coordination work or break the current specialist delivery model.

Therefore branch protection must be introduced in stages.

---

## 2. Current safe checkpoint

Known clean checkpoint branch:

`checkpoint/kakashi-v2-golden-2026-09-22`

points to:

`0119fcfa8ac5f5a8d9a27100e23d3b3be7cae21c`

This is the rollback/comparison point for the first protection rollout.

---

## 3. Do NOT hard-enable required status checks yet

Current critical workflows include:

- `Issue 300 Runtime Ownership Safety`
- `Issue 141 Pre-Alpha Runtime Closure`
- `Issue 188 Story Decision QA`
- `Kakashi V2 Installed Browser Golden`

Several are path-filtered.

If any path-filtered workflow is configured directly as a required status check, a pull request that does not touch its trigger paths may never produce that status and can become unmergeable.

Canonical rule:

> **Never require a path-filtered status directly unless its skipped state is guaranteed to satisfy the branch rule.**

The project should instead require one **always-run merge safety gate**.

---

## 4. Required architecture — one always-run Merge Safety Gate

Create one workflow:

`.github/workflows/merge-safety-gate.yml`

Desired workflow name:

`Shinobi Chronicles Merge Safety Gate`

Desired job/status name:

`merge-safety-gate`

Trigger:

```yaml
on:
  pull_request:
  merge_group:
```

No path filter.

The job runs on every PR and decides which deeper checks are required from the changed-file set.

At minimum:

### Documentation / coordination-only change

- validate repository can parse/load the safety manifest;
- no runtime suite required;
- pass quickly.

### Runtime / game.js / index.html / runtime QA change

Require:

- runtime ownership safety;
- legacy exclusion;
- production load parity;
- duplicate-owner diagnostics;
- applicable source/headless runtime closure.

### Story / Origin runtime-affecting change

Additionally require:

- Story decision QA;
- relevant Origin route/manifest QA.

### Kakashi V2 runtime-affecting change

Additionally require:

- Kakashi V2 clean-room / legacy exclusion;
- route matrix;
- browser cardinality / installed-browser QA when the changed-file classification says it is required.

The merge gate may call scripts directly or use reusable workflows, but its own status must always resolve.

---

## 5. Merge-gate changed-file contract

The merge gate should classify changes into at least:

- `DOCS_ONLY`
- `RUNTIME_CORE`
- `STORY_RUNTIME`
- `ORIGIN_RUNTIME`
- `KAKASHI_V2`
- `BATTLE_RUNTIME`
- `SAVE_SCHEMA`
- `WORKFLOW_SAFETY`

A PR may occupy multiple classes.

The classification is implementation/QA machinery, not game semantics.

If classification is uncertain for a runtime file, fail closed into the broader relevant QA set.

---

## 6. Required branch rules after the gate is proven

Once `merge-safety-gate` is proven on both docs-only and runtime PRs, enable a GitHub ruleset targeting:

`main`

Recommended settings:

### Required

- Require a pull request before merging.
- Required approving reviews: **0 initially** for the solo-owner workflow.
- Require status checks to pass before merging.
- Required status:
  - `merge-safety-gate`
- Require branches to be up to date before merging, if GitHub's merge queue/update behavior remains practical for the project.
- Block force pushes.
- Block branch deletion.

### Recommended initially OFF

- Require signed commits.
- Require linear history.
- Require conversation resolution.
- Required code-owner review.
- Multiple human approvals.

These may be added later if useful, but are not necessary for Alpha safety and may create unnecessary friction in a solo development workflow.

---

## 7. Bypass policy

A bypass is an emergency escape hatch, not the normal delivery path.

Preferred:

- Stephen/repository owner may retain emergency bypass if GitHub plan/settings support it.
- Automated specialist/app identities should not receive blanket bypass merely for convenience.

Any bypass used for a runtime change must be followed by:

- exact reason;
- exact commit;
- post-merge merge-safety run;
- issue/comment receipt.

Canonical rule:

> **Bypass can recover the project; it cannot become the project's ordinary merge strategy.**

---

## 8. Specialist delivery migration

Current project automation often commits directly to `main`.

Before PR-required rules are enabled, current specialist behavior must be migrated to:

```text
current main
-> specialist branch
-> coherent commits
-> pull request
-> merge-safety-gate
-> merge
-> local-sync notice
```

Documentation-only specialist changes can use compact PRs.

Runtime changes should preserve one primary Coding executor at a time.

Do not enable PR-only rules until this workflow has been proven by at least:

1. one documentation/coordination PR;
2. one runtime PR;
3. one negative safety fixture PR that correctly fails;
4. one corrected runtime PR that passes.

---

## 9. Negative protection tests before activation

Before enabling the ruleset, deliberately prove that:

1. duplicate runtime responsibility registration fails;
2. retired owner reintroduced to loader fails;
3. duplicate visible Story output owner fails;
4. a docs-only PR passes without waiting forever for path-filtered runtime checks;
5. an ordinary safe runtime change passes the gate;
6. a failed merge gate prevents normal merge after ruleset activation.

These are test fixtures only; do not merge intentionally bad runtime into production.

---

## 10. Local sync remains mandatory after merge

Branch protection does not update Stephen's computer.

Every merged candidate still requires:

`LOCAL SYNC: REQUIRED/NOT REQUIRED`

and:

`EXPECTED LOCAL HEAD: <sha>`

before browser evidence is interpreted.

The build fingerprint from #303 should become a second verification channel.

---

## 11. Rollback / emergency recovery

If branch protection itself blocks urgent recovery:

- use explicit owner bypass only if necessary;
- do not force-push history;
- create recovery branch from known-good checkpoint;
- preserve bad candidate for diagnosis rather than rewriting history;
- restore through a normal corrective PR where practical.

Known rollback comparison:

`checkpoint/kakashi-v2-golden-2026-09-22`

---

## 12. Activation order

1. Finish current Coding #278 atomic tranche without interruption.
2. Implement #303 runtime build fingerprint.
3. Implement always-run `merge-safety-gate`.
4. Prove docs-only PR.
5. Prove runtime PR.
6. Prove deliberate negative fixture fails.
7. CE confirms gate behavior.
8. Stephen enables GitHub `main` ruleset manually.
9. Verify one real PR cannot bypass required gate through normal merge.
10. Mark branch-protection rollout ACTIVE.

---

## 13. Manual GitHub ruleset action — only after CE says READY

Because current GitHub tooling does not expose repository-administration write access, Stephen must perform the final GitHub Settings action.

Do not perform it before the always-run gate is proven.

Target configuration:

```text
Repository Settings
-> Rules
-> Rulesets
-> New branch ruleset

Name: Main Production Safety
Enforcement: Active
Target branch: main

Require pull request before merging: ON
Required approvals: 0
Require status checks: ON
Required check: merge-safety-gate
Block force pushes: ON
Restrict deletions / block branch deletion: ON
```

Exact GitHub wording may vary.

---

# Final lock

> **Do not protect `main` with path-filtered checks directly. First create one always-run merge-safety gate, prove it on docs-only, runtime and deliberate-failure PRs, migrate specialist delivery to branch/PR flow, then enable branch protection. The goal is to prevent unsafe merges without locking the project out of legitimate Alpha work.**
