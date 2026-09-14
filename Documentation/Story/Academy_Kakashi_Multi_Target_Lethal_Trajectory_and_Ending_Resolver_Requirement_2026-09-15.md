# Academy Kakashi Origin — Multi-Target Lethal Trajectory and Ending Resolver Requirement

**Date:** 2026-09-15  
**Owner:** Stephen / Writing — Konoha  
**Status:** **STEPHEN-DIRECT PRODUCT REQUIREMENT — REQUIRED BEFORE ACADEMY KAKASHI WRITING CLOSURE**

## Purpose

Academy Kakashi's current branch tree has closed most tactical priority / package / Battle routes, but Stephen identified a missing cross-cutting decision layer:

> Kakashi may make repeated lethal decisions across multiple consecutive encounters, and the Origin ending must consume both his lethal intent and the factual resolver results rather than treating each Battle victory as automatically terminal.

This requirement applies especially to route families where Kakashi can legitimately encounter, defeat and continue beyond:

1. **Masked Interceptor**;
2. **Package Smuggler**;
3. **ANBU Marked Target**.

It consumes and preserves:

- `Documentation/Story/Deterministic_Kill_vs_Resolver_Determined_Lethal_Intent_Contract_2026-09-14.md`;
- current Battle / pursuit / Knowledge / branch-isolation / Pakkun / debrief authorities;
- `Documentation/Story/Academy_Kakashi_Seven_Remaining_Substantial_Branch_Closure_2026-09-15.md`;
- current Structured Autonomy authority.

This is not permission to convert every confrontation into a deterministic kill menu. Exact lethal eligibility must follow current committed state.

---

# 1. Core correction — Battle victory is not automatically terminal

A PL Battle victory commits the Battle result and any separately authored immediate Story facts.

It does **not** automatically mean:

- the scene is over;
- the target has been spared;
- the target has been killed;
- Kakashi must stop pursuing another participant;
- a later participant is permanently unreachable;
- the Origin must jump directly to debrief.

After each resolved encounter, CE/Story must derive the next legal protagonist actions from the actual committed state.

If the defeated/current target is in a state where a lethal action is legitimately available, the player may receive the appropriate lethal semantic class:

- `KILL — GUARANTEED`, when deterministic kill eligibility is genuinely satisfied by authored/current state; or
- `ATTEMPT TO KILL — RESOLVER-DETERMINED`, when the target retains enough agency / escape / intervention / uncertainty that death is not guaranteed.

If neither is legitimate, neither should be presented.

After the lethal action resolves, time, position, package custody, participant state and pursuit eligibility must be recalculated before the next protagonist decision.

Canonical loop:

`Battle / resolver result`
-> `post-resolution state commits`
-> `eligible protagonist disposition/lethal actions`
-> `KILL or ATTEMPT TO KILL if legitimately available`
-> `death / survival / interruption / escape commits`
-> `time + position + pursuit state updates`
-> `due participant autonomy resolves`
-> `next legal protagonist action / pursuit / debrief`

**Kill != automatic Origin ending.**

**Failed lethal attempt != no history.**

---

# 2. Required benchmark — Kakashi triple-kill trajectory

Stephen's explicit benchmark trajectory must be representable when the live state and resolvers keep each continuation eligible:

`Kakashi fights Masked Interceptor`
-> `wins PL Battle`
-> `chooses KILL where deterministic eligibility is valid`
-> `Masked Interceptor death commits`
-> `pursuit state recalculates`
-> `Kakashi chases Package Smuggler if still eligible`
-> `wins Package Smuggler PL Battle`
-> `chooses KILL where deterministic eligibility is valid`
-> `Package Smuggler death commits`
-> `package custody remains separately resolved/committed`
-> `pursuit state recalculates`
-> `Kakashi chases ANBU Marked Target if still eligible`
-> `Kakashi legitimately reaches ANBU Marked Target -> Pakkun present`
-> `Kakashi/Pakkun win PL Battle`
-> `Kill him` remains the existing deterministic ANBU Marked Target disposition where its entry predicates are satisfied`
-> `ANBU Marked Target death commits`
-> `ending resolver consumes 3 confirmed kills / 0 failed lethal attempts plus the exact package / pursuit / Knowledge history`.

This trajectory is a benchmark of **possibility**, not a guarantee that every run can always reach all three actors after spending time on lethal actions.

Pursuit resolvers must remain meaningful. A slow Battle, failed pursuit, participant intervention, or time spent on an action may close the next catch-up opportunity.

---

# 3. Correction to the recent seven-branch closure

The recent quick-win chain currently states, after Package Smuggler Battle victory, that ANBU Marked Target remains escaped.

That statement is too terminal as a universal rule.

Correct precedence is now:

> **After Package Smuggler is resolved on a route whose prior timing still leaves ANBU Marked Target potentially reachable, CE/resolver must evaluate current pursuit eligibility from committed elapsed action/Battle/pursuit state.**

Therefore:

- Package Smuggler victory does not itself teleport ANBU Marked Target permanently out of reach;
- killing / attempting to kill Masked Interceptor may consume time and alter the later catch-up state;
- killing / attempting to kill Package Smuggler may consume time and alter ANBU Marked Target catch-up state;
- leaving a defeated participant immediately may preserve more pursuit opportunity;
- exact pursuit availability must come from resolver/current state, not from a branch label;
- if Kakashi does reach ANBU Marked Target, Pakkun becomes mandatory under existing authority.

This correction supersedes only the overly terminal continuation assumption. It does not reopen the seven branches' distinct tactical identities.

---

# 4. Lethal trajectory receipt

The Origin must preserve lethal decisions as a structured Chronicle ledger rather than inferring them from final body count.

For every materially lethal protagonist action, preserve at minimum:

- target stable identity;
- scene / branch / sequence position;
- lethal semantic class: `deterministic_kill` or `resolver_determined_lethal_intent`;
- protagonist lethal intent occurrence;
- eligibility basis;
- owning resolver when applicable;
- factual result: death / survived / interrupted / escaped / other legal outcome;
- whether a death occurrence committed;
- whether a failed lethal-attempt occurrence committed;
- witnesses / materially present participants;
- relevant participant reactions/autonomy consequences;
- elapsed-time / pursuit-state consequence where material;
- package custody before/after where material;
- target custody / capability state before/after;
- Kakashi Knowledge of the result;
- provenance / idempotence key.

The ending must never reconstruct this history from presentation text.

---

# 5. Kill count and failed-lethal-attempt count are separate

For ending evaluation, preserve at least:

- `confirmedKillCount`;
- `failedLethalAttemptCount`;
- exact target identities in each set;
- chronological order.

For clarity in this contract, **failed lethal attempt** means Kakashi committed resolver-determined lethal intent but no death committed from that action.

If a resolver-determined lethal action succeeds and kills the target, it contributes to `confirmedKillCount` while retaining resolver-determined provenance. It is not counted as a failed attempt.

This preserves the existing rule:

> intent history != outcome history.

---

# 6. Required three-target ending families

When Kakashi has made lethal commitments against all three benchmark targets, the ending resolver must support at minimum these four aggregate result families Stephen explicitly required:

### A. 3 kills / 0 failed lethal attempts

- three confirmed deaths;
- no failed lethal commitment;
- includes the full triple-kill benchmark where all three deaths legitimately commit.

### B. 2 kills / 1 failed lethal attempt

- two confirmed deaths;
- one target survives / escapes / is interrupted under a resolver-determined lethal attempt;
- exact surviving target identity remains part of the ending facts.

### C. 1 kill / 2 failed lethal attempts

- one confirmed death;
- two failed lethal commitments;
- exact killed target and exact surviving targets remain part of the ending facts.

### D. 0 kills / 3 failed lethal attempts

- no confirmed deaths;
- Kakashi nevertheless committed lethal intent three separate times;
- the ending must **not** misrepresent this as a merciful/nonlethal route merely because the resolvers prevented all three deaths.

These are ending **families**, not four flat hard-coded cutscenes.

The exact target identities and full Chronicle state remain significant.

For example, `2 kills + 1 failed attempt` has multiple identity permutations and must not erase which actor survived.

---

# 7. Ending resolver consumes choice AND consequence

The ending must evaluate both:

1. **what Kakashi chose to do**; and
2. **what actually happened**.

Therefore:

- three failed lethal attempts are not equivalent to choosing nonlethal restraint three times;
- one confirmed kill plus two failed attempts is not equivalent to one kill plus two deliberate spared/released targets;
- three confirmed kills must not be projected as merely three Battle victories;
- a failed attempt remains Chronicle history even where the target survives;
- package success/failure remains separate from lethal history;
- debrief honesty remains separate from lethal history;
- custody/release remains separate from lethal history.

The ending resolver should consume a structured state such as:

`mission objective result`
+ `package custody`
+ `participant outcomes`
+ `lethal trajectory ledger`
+ `pursuit history`
+ `Kakashi Knowledge`
+ `debrief truthfulness/completeness`
+ `Pakkun participation/reactions where applicable`
+ `other committed branch facts`.

Do not choose an ending solely from `confirmedKillCount`.

Counts select a major evaluation family; exact Chronicle facts determine the actual ending expression.

---

# 8. Minato private evaluation

Minato's private evaluation must distinguish lethal intent from lethal success.

At minimum:

- **3 kills / 0 failed attempts:** Minato recognises repeated successful lethal finality, not merely combat competence. Whether the package objective succeeded is evaluated separately.
- **2 kills / 1 failed attempt:** the failed third action does not erase the repeated choice to kill; the survivor/result is factual and identity-specific.
- **1 kill / 2 failed attempts:** repeated lethal commitment remains visible despite only one death.
- **0 kills / 3 failed attempts:** zero bodies does not equal restraint. Minato knows Kakashi attempted lethal outcomes repeatedly and that the resolvers, not Kakashi's mercy, prevented the deaths.

This does not require Minato to moralise or deliver a generic good/evil score.

His evaluation remains calm, branch-specific and concerned with judgement, objective handling, control, necessity, escalation and what Kakashi did with the options actually available to him.

Minato's private evaluation remains hidden from Kakashi.

---

# 9. Debrief and Chronicle Receipt

The factual ANBU debrief and final Origin Chronicle Receipt must project the exact committed lethal history.

If Kakashi killed all three, the report/receipt must not omit two deaths merely because the final scene focuses on ANBU Marked Target.

If Kakashi attempted to kill a participant who survived, the report/receipt must preserve the attempt where Kakashi legitimately knows the result.

No hidden evaluation truth may leak into Kakashi's debrief.

Chronicle Receipt may summarize the route but must retain exact participant identities and factual outcomes rather than only `kills = 2`.

---

# 10. Structured Autonomy / participant reactions

After every committed kill or failed lethal attempt, materially present autonomous participants whose action/reaction window is due must resolve before the next protagonist choice.

Examples include:

- Pakkun reacting to a lethal Kakashi action when present;
- a surviving target choosing escape / retaliation / surrender / hold where legitimate;
- another fleeing participant gaining distance while Kakashi spends time resolving a lethal action;
- witnesses changing behaviour from what they observed.

Writing must not hard-script autonomous reactions merely to force a desired ending.

Participant autonomy may alter pursuit/state, but it may not rewrite the already committed kill/attempt result.

Battle turn/action ordering remains Combat-owned while inside Battle.

---

# 11. Closure consequence

Academy Kakashi Origin is **not yet ready for final Writing closure** merely because the seven major tactical branches are authored.

Before closure, Writing must now:

1. identify every state-eligible post-resolution lethal decision window across the Kakashi branch tree;
2. classify each as deterministic `KILL`, resolver-determined lethal attempt, or ineligible;
3. ensure lethal action does not falsely terminate later pursuit where continuation remains resolver-eligible;
4. ensure pursuit/timing can support the Stephen benchmark triple-kill route when resolver results allow it;
5. define ending-resolution projection for mixed kill / failed-attempt histories without hard-coding every entire Story timeline;
6. reconcile Structured Autonomy anchors for lethal aftermaths;
7. include lethal trajectory in final Kakashi audit / debrief / Minato / Chronicle Receipt checks.

Only after this layer, direct Attack, Pickpocket and the final consolidated audit are reconciled may Academy Kakashi be called Writing-closed.

---

## Final lock

> **Battle victory does not automatically end a target's decision space or the Origin.**
>
> **Kill and attempted kill remain separate semantic classes.**
>
> **A kill does not automatically end pursuit; current time/position/state determines whether another target remains reachable.**
>
> **Kakashi's Origin must support the legitimate triple-kill trajectory when resolver state permits it.**
>
> **The ending evaluates both lethal intent and factual deaths.**
>
> **3 kills / 0 failed attempts, 2 kills / 1 failed attempt, 1 kill / 2 failed attempts, and 0 kills / 3 failed attempts must all produce distinct evaluation families while preserving exact target identities and the rest of the Chronicle.**
