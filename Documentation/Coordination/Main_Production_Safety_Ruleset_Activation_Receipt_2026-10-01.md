# Shinobi Chronicles — Main Production Safety Ruleset Activation Receipt

Date: 2026-10-01  
Owner: CE / Codex / Coordination  
Tracker: #315  
Status: POST-ACTIVATION VALIDATION RECEIPT

## Live ruleset

Repository ruleset:
- name: `Main Production Safety`
- ruleset id: `24319819`
- enforcement: `active`
- target: default branch / `main`
- bypass actors: none

Required rules:
- pull request before merge;
- required approvals: 0;
- required status check: `merge-safety-gate` only;
- block deletion;
- block non-fast-forward / force push.

Not required:
- signed commits;
- linear history;
- conversation resolution;
- Code Owner review;
- additional unattributed-Copilot approval;
- strict up-to-date branch policy.

## Validation purpose

This document itself is submitted through a normal pull request after the ruleset was activated.

The validation sequence for #315 is:

1. open this harmless coordination-only PR against protected `main`;
2. attempt normal merge before the required gate is available/complete;
3. GitHub must reject the merge while the required gate is not satisfied;
4. allow the always-run `merge-safety-gate` to complete;
5. merge only after the required gate is GREEN;
6. record the exact evidence on #315.

This validates that the protected-branch workflow is not merely configured but actually governs delivery.

## Delivery law after activation

Normal production delivery is now:

`main -> specialist branch -> pull request -> merge-safety-gate -> merge`

Do not return to routine direct writes to protected `main`.

Path-filtered specialist workflows remain downstream evidence and are not themselves directly required branch checks.

## Final lock

> Main is protected by one always-run merge gate. Documentation and runtime changes both travel through pull requests; deeper suites are selected by the gate rather than configured as separate path-filtered required checks.
