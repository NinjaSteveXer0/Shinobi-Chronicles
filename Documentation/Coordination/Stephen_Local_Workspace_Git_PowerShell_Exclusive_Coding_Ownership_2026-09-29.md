# Shinobi Chronicles — Stephen Local Workspace Git / PowerShell Exclusive Coding Ownership

**Date:** 2026-09-29  
**Owner:** Stephen / CE / Codex / Coordination  
**Status:** **LOCKED PROJECT-WIDE SAFETY RULE — ACTIVE**  
**Primary priority:** Finish Shinobi Chronicles Alpha without allowing specialist-local VCS actions to corrupt or displace the active Coding candidate.

## 1. Why this rule exists

Stephen's local Shinobi Chronicles working copy is the installed-browser test surface used by Coding / Runtime.

A non-Coding specialist instructing Stephen to perform Git / PowerShell / terminal operations against that same local repository can:

- switch the local branch away from the active Coding candidate;
- pull or overwrite a different generation;
- expose or hide uncommitted files;
- cause asset and runtime changes to become mixed;
- invalidate the expected local HEAD;
- force rollback/recovery work;
- destroy a clean owner-browser acceptance opportunity.

This failure mode occurred on 2026-09-29 and required rollback to a known-safe Coding checkpoint. The project therefore treats local repository command ownership as a runtime-safety concern.

## 2. Exclusive local terminal ownership

> **Only Coding / Runtime may instruct Stephen to run Git, PowerShell, Git Bash, terminal, or local VCS commands against the Shinobi Chronicles repository.**

This includes, but is not limited to:

- `git status`;
- `git switch` / `git checkout`;
- `git pull` / `git fetch`;
- `git add` / `git commit` / `git push`;
- `git stash`;
- `git merge` / `git rebase` / `git cherry-pick`;
- `git reset`;
- `git clean`;
- branch creation/deletion;
- PowerShell file-copy / move / rename steps performed inside the repository for VCS purposes;
- VS Code Source Control actions whose effect is equivalent to staging, committing, branch switching, syncing or pushing the local repository.

No other specialist owns Stephen's local repo state.

## 3. Non-Coding specialists

Writing, UI / Assets, Character Creation / Visuals, Combat, World, PL / Registry / Rank, Progression, Acquisition and CE / Codex / Coordination must not tell Stephen to manipulate his local repository.

They may:

- inspect current live GitHub authority;
- create/update durable documents through GitHub tooling;
- commit to their authorised remote specialist branch when the workflow explicitly allows it;
- create/comment/close GitHub issues;
- publish approved assets remotely through the dedicated approved branch/workflow;
- provide exact path/SHA/issue evidence to Coding.

They must not convert a remote GitHub task into local terminal work for Stephen.

If a specialist requires a local-repository action to complete its task, it must route the exact need to **Coding / Runtime** rather than instruct Stephen directly.

## 4. Remote GitHub != Stephen's local checkout

This rule does **not** prohibit specialists from using approved remote GitHub tools inside their ownership boundary.

Examples:

- Character Creation / Visuals may publish an approved PNG to `visuals/asset-vault` through remote GitHub blob/tree/commit/ref tooling.
- Writing may commit an approved Story authority document remotely.
- CE may commit coordination authority remotely.

Those operations do not grant the specialist authority to tell Stephen to switch, pull, push or otherwise reconcile his local working copy.

When remote work must become visible in Stephen's installed browser, **Coding / Runtime owns the local synchronization instruction**.

## 5. Coding / Runtime responsibility

Because Coding exclusively owns local repository commands, Coding must protect Stephen's workspace before every local sync/recovery instruction.

Before any branch switch, pull, merge, checkout, reset, stash, clean or other potentially state-changing instruction, Coding must:

1. establish the expected current local branch/HEAD when relevant;
2. account for known local/uncommitted work;
3. prefer non-destructive commands;
4. never casually use `reset --hard`, `clean`, forced checkout or destructive stash operations;
5. preserve unrelated approved assets/work;
6. state the exact target HEAD for the browser retest;
7. keep the command sequence bounded to the active Coding task.

If Coding cannot safely determine the local state, it must stop before destructive reconciliation.

## 6. Asset-vault consequence

The dedicated `visuals/asset-vault` workflow remains active.

Character Creation / Visuals must:

- publish the exact approved PNG remotely to `visuals/asset-vault`;
- create the implementation issue;
- provide exact path + commit SHA.

Character Creation / Visuals must **not** tell Stephen to:

- switch to `visuals/asset-vault`;
- stage/commit/push the PNG locally;
- use PowerShell/Git Bash;
- use VS Code Source Control to publish the asset;
- merge/cherry-pick the asset into Coding.

Coding consumes the exact remote asset identified by the implementation issue.

## 7. Specialist failure rule

If a non-Coding specialist finds itself about to provide Stephen with a Git/PowerShell/local-VCS command:

> **STOP. DO NOT SEND THE COMMAND.**

Instead:

- complete the operation through approved remote GitHub tooling if it is within that specialist's ownership; or
- route the exact local-workspace dependency to Coding / Runtime.

Stephen is never the workaround for missing specialist tooling.

## 8. Golden / browser safety

A local workspace command can change what Stephen is actually testing.

Therefore:

- a browser verdict is meaningful only against the intended Coding candidate;
- non-Coding local VCS activity must never occur between Coding handoff and Stephen owner-browser acceptance;
- a Golden opportunity must not be invalidated by an unrelated specialist changing the local branch/worktree;
- Coding's expected local HEAD remains the browser-test authority.

## 9. Canonical shorthand

> **REMOTE SPECIALIST WORK: owned specialist may use approved GitHub tooling.**  
> **STEPHEN'S LOCAL REPO: CODING / RUNTIME ONLY.**

And:

> **No one except Coding tells Stephen to run Git or PowerShell against Shinobi Chronicles.**

This rule is project-wide and applies immediately to every current and future specialist workspace.
