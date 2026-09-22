# Academy Kakashi V2 — Two-Outcome Disposition, Reward, Evidence and Restraint Reconciliation

**Date:** 2026-09-23  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CROSS-SYSTEM RECONCILIATION — KAKASHI V2 ONLY**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

This reconciliation consumes the corrected World/Rewards authority and the Stephen-approved Writing/Story resolver package for Academy Kakashi V2.

It resolves the collision between:

- the older Kakashi-specific direct-death / field-secured implementation;
- reusable CE field-secured custody semantics from #244;
- the newer Stephen-approved two-outcome KILL / RESTRAIN model;
- recalibrated material rewards;
- contextual Special Jōnin evidence;
- observer / institutional history.

This document does **not** reopen unrelated Story, Combat, Rank, PL or Progression architecture.

---

## 2. Authority consumed

Current binding inputs:

1. `Documentation/Story/Academy_Kakashi_Kill_and_Restrain_Two_Outcome_Resolver_and_Scene_Authority_2026-09-23.md`
   - commit `469de7c67ece78364c947953abef07e32856c1ba`;
   - current content package is already present in `runtime/academy-kakashi-v2-content-36000.js` at commit `a0ccb6097967db21348bec56d6139c39448a09d9`.

2. `Documentation/World/Academy Kakashi Origin Reward Recalibration and Disposition Lock 2026-09-23.md`
   - corrected authority commit `5bc5108918adeab9b6fe58266d58d61663c48fd8`.

3. `Documentation/Progression/Special Jonin Contextual Evidence Producer Projection Contract.md`
   - commit `f80ebbc78ac155c04aec9e003bc580d11a277073`;
   - implementation lane #23.

4. Reusable #244 field-secured contract:
   - `Documentation/Coordination/Field_Secured_Participant_Persistence_Collection_and_Group_Transfer_Contract_2026-09-19.md`;
   - commit `77d351e6f8d4eefaea0f8a6db82dec686391e1c0`.

The #244 contract remains reusable authority for systems that still use its semantic states.

**Academy Kakashi V2 now has a narrow explicit supersession and does not consume those field-secured custody-state names.**

---

## 3. Final Kakashi V2 disposition model

For Academy Kakashi V2:

```text
KILL     -> KILLED | ESCAPED
RESTRAIN -> RESTRAINED | ESCAPED
```

These are resolver outcomes, not player promises.

The player chooses intent.

The factual resolver commits exactly one allowed result per exact target.

### Forbidden Kakashi V2 outcome/state resurrection

Do not restore or use for this Origin:

- `SURVIVED`;
- `INTERRUPTED`;
- `FAILED_KILL`;
- `WOUNDED` as a third disposition outcome;
- `CONTROLLED_DEFEATED`;
- `DEFEATED_BUT_NOT_CONTROLLED`;
- `FIELD_SECURED_PENDING_COLLECTION`;
- `COLLECTED_ACTIVE_ESCORT`;
- `ATTEMPT_TO_RESTRAIN` as a separate player-facing branch;
- partial-restraint custody states.

The older direct `KILL -> DEAD` mutation is superseded.

The older `addField()/fieldSecured[]` Kakashi V2 restraint path is superseded.

---

## 4. Exact participant facts

### KILLED

`KILLED` means the exact participant is factually dead from the resolved lethal occurrence.

It is not inferred from Battle defeat alone.

### ESCAPED

`ESCAPED` means the exact participant remains alive and has left Kakashi's control after the attempted disposition.

The attempted intent remains historical truth:

- KILL -> ESCAPED retains lethal / attempted-assassination history;
- RESTRAIN -> ESCAPED retains attempted-restraint history.

`ESCAPED != RELEASED`.

### RESTRAINED

`RESTRAINED` means the exact participant is alive and physically restrained.

It may retain factual continuity metadata such as:

- exact participant ref;
- restraint occurrence ref;
- authored restraint location;
- relevant source route / beat.

That metadata does not create another custody state.

```text
RESTRAINED
!= delivered
!= ANBU custody
!= Uchiha Police custody
```

### RELEASED

Release remains a separate authored factual disposition.

Do not map resolver escape to release/mercy.

---

## 5. Resolver integrity

Every disposition result must be idempotent.

A committed result must survive:

- save/load;
- refresh;
- re-entry;
- retry;
- renderer replay.

No result rerolls after commit.

A recommended identity envelope is conceptually:

```text
storyOccurrenceId
+ dispositionIntent
+ exactParticipantRef
-> one committed factual outcome
```

Exact runtime schema remains Coding-owned.

Use the existing factual-resolver architecture rather than creating a Kakashi-only random-state system.

This reconciliation does **not** author a new visible probability system or hidden CONTROL stat.

If current resolver infrastructure needs a technical selection policy, Coding must preserve the existing factual-resolver contract and tests rather than invent player-facing percentages or a new gameplay mechanic.

---

## 6. Group KILL THEM

A group KILL choice is:

- one protagonist intent;
- one causal parent occurrence;
- multiple exact participant outcome children.

Each exact target independently resolves to:

`KILLED | ESCAPED`.

Do not use:

- one aggregate all-dead flag;
- one group participant state;
- one result copied blindly to every target.

The exact 2-target / 3-target mixed-result Story scenes are already authored in the current Writing authority/content package.

All child outcomes retain the same causal-root ancestry for Progression evidence.

Therefore:

> multiple resolved targets in one Kakashi Origin causal occurrence do not counterfeit multiple independent evidence sources.

---

## 7. Restraint, collection and delivery

### 7.1 Successful restraint

After `RESTRAINED`, the participant stays exactly restrained unless another authored factual occurrence changes that fact.

No passive decay timer.

No refresh escape.

No random background escape roll.

### 7.2 Pursuit

Disposition resolution does not invent a new time cost.

Existing authored Battle / pursuit gates remain authoritative.

Therefore:

- RESTRAINED does not automatically close an already-authorised pursuit;
- KILLED does not automatically close it;
- ESCAPED does not automatically close it;
- none of these outcomes reopens a pursuit already closed by existing Story timing.

### 7.3 Collection

Academy Kakashi V2 collection predicates read exact participant `RESTRAINED` facts.

Do not key collection from:

- `fieldSecured[]`;
- `FIELD_SECURED_PENDING_COLLECTION`;
- `COLLECTED_ACTIVE_ESCORT`.

A collection occurrence may update ordinary location / escort / presentation metadata required to show that Kakashi has returned to the restrained participants.

It does **not** create a replacement custody enum.

### 7.4 Group collection

The live-capture benchmark remains:

```text
MI RESTRAINED
-> PS RESTRAINED
-> AMT RESTRAINED
-> collect exact RESTRAINED participants
-> TAKE THEM ALL TO ANBU
   OR
-> TAKE THEM ALL TO UCHIHA POLICE
```

A dead, escaped or released participant cannot be collected.

If only a subset remains RESTRAINED, only that exact subset is eligible.

### 7.5 Institutional custody

Institutional custody commits only through the exact authored delivery/transfer occurrence.

Destination truth remains participant-level:

- ANBU custody; or
- Uchiha Police custody.

One group intent may orchestrate several participant-level custody commits under one idempotent parent transaction if the runtime needs transaction safety.

---

## 8. Material reward reconciliation

Material reward sources remain causally distinct.

### 8.1 Immediate Battle cash

For qualifying Academy Kakashi Origin victories:

- legitimate 1v1 victory = **50 Ryō immediate**;
- legitimate 2v1 victory = **100 Ryō immediate**;
- failed direct-pickpocket 3v1 victory = **200 Ryō immediate**.

The implementation should identify the authoritative Battle occurrence / participant configuration, not rely on an accidental incomplete list of route config IDs.

Existing MI Field Recovery Pill source remains.

Existing +25 exceptional-field-execution and Academy Training Tantō eligibility remain separate where their predicates are satisfied.

### 8.2 Objective rewards retained

- terminal/debrief = **100 Ryō**;
- package recovery = **+75 Ryō**;
- actionable intelligence = **+25 Ryō**;
- exceptional = **+25 Ryō**.

Do not double-pay the same underlying intelligence fact through multiple aliases.

### 8.3 Live-capture tier

The old flat one-or-more captive +25 source is superseded.

The delivered-living-participant tier is:

- exactly 1 delivered live captive = **25 Ryō total capture reward**;
- exactly 2 delivered live captives = **50 Ryō total capture reward**;
- all 3 delivered live captives = **100 Ryō total full-extraction reward**.

These are tier totals, not cumulative 25 + 50 + 100 stacking.

ANBU and Uchiha Police delivery have the same material tier.

Their institutional/history consequences remain distinct.

### 8.4 Release

Release supplies:

- no new material reward merely for release;
- no material penalty;
- no clawback of legitimately earned Battle/action/objective rewards.

Its reward channel is historical / future-content opportunity where authored.

### 8.5 Kill / assassination

No corpse bounty, morality penalty, cash clawback or automatic new kill Ryō is created.

The kill-specific reward channel is:

- exact Chronicle history;
- contextual Assassin evidence where Progression predicates fit;
- observer/evaluation history;
- institutional record where reported;
- future ANBU lethal-history / lethal-profile hotspot or opportunity eligibility where authored.

KILL -> ESCAPED retains the attempted lethal history and surviving-target recurrence potential.

### 8.6 250 Ryō cap

The legacy 250 Ryō terminal/debrief cap remains a World-owned unresolved arithmetic question.

Do not silently use that cap to erase or clip newly approved value.

Its resolution is not required before implementing independent immediate Battle cash or the disposition semantic replacement.

If terminal reward aggregation is changed before World closes the cap, tests must expose the unresolved boundary rather than silently choosing retain/raise/remove/bypass.

---

## 9. Route-anchor reward / evidence producer mappings

The following mappings are now authored inputs.

### GET CLOSER

Material:
- successful authored handoff-contingency intelligence may satisfy the existing +25 actionable-intelligence source once.

Evidence:
- `fieldcraft.stealth_approach:covert_approach_attempt`;
- materially executed covert attempt -> significance 1;
- useful successful undetected positioning -> significance 2;
- exact exceptional benchmark may reach significance 3.

Same causal root remains one independent source.

### PICKPOCKET

Material:
- clean success retains +75 package;
- +25 exceptional where its existing predicate is satisfied;
- Academy Training Tantō eligibility remains where already authorised.

Evidence:
- `fieldcraft.covert_acquisition`;
- materially executed failed attempt -> significance 1;
- successful covert acquisition -> significance 2;
- clean undetected exceptional acquisition may reach significance 3.

### ROUTE INTERCEPT / SAKURA CUTOFF

Evidence candidate:
- `reconnaissance.tracker_nin:route_intercept_execution`.

The resulting qualifying 2v1 Battle separately pays 100 Ryō immediate.

Exact significance remains Progression-owned.

### INFORMATION EXTRACTION

Material:
- verified new relevant intelligence may satisfy +25 actionable-intelligence once.

Evidence candidates:
- `intelligence.interrogator:information_extraction`;
- `credibility_assessment` only when factual reliability / contradiction assessment was actually performed.

Exact significance remains Progression-owned unless already determined by a stronger Progression authority.

### RESTRAIN / EXTRACTION

Field restraint by itself is not custody cash.

Evidence candidates:
- `covert_operations.extraction_specialist:extraction_planning` where tactical restrain-and-continue genuinely demonstrates planning;
- `subject_recovery` where later recovery / collection / escort / delivery genuinely demonstrates it.

All-three restrain -> collect -> deliver may demonstrate both competencies from one causal Origin source.

It does not become two independent sources merely because two tags are supported.

Exact significance / capstone treatment remains Progression-owned.

### KILL / ASSASSINATION

Qualification path:
- `covert_operations.assassin`.

Relevant competencies:
- `target_isolation`;
- `covert_execution`.

Rules:
- Battle victory alone != Assassin evidence;
- KILL choice alone != automatic evidence;
- KILLED may support successful execution evidence only when committed facts demonstrate the competency;
- ESCAPED may support partial evidence only for work actually demonstrated;
- failed lethal result does not automatically mean zero evidence;
- all-three lethal pattern may strengthen same-causal-source evidence without creating three independent sources.

Exact evidence tags/significance/capstone fields remain Progression-owned.

---

## 10. Progression boundary

Preserve:

```text
specialist evidence != XP
evidence != qualification
qualification != Recognition
Recognition != formal Rank
PL != Progression
```

Evidence projection consumes committed facts, not raw button clicks.

It requires:

- exact participant attribution;
- stable source occurrence;
- factual competency mapping;
- causal ancestry;
- commit-time capability snapshot where required;
- idempotence.

Do not create:

- Assassination XP;
- Extraction XP;
- Stealth XP;
- a Kakashi-only qualification ledger.

Issue #23 is the existing producer implementation lane.

Because Academy Kakashi is now executable Alpha content that requires these mappings, #23's former “not an Alpha blocker until executable content consumes producers” condition is now satisfied for these specific producer mappings.

---

## 11. Observer / institutional history

History and Knowledge remain separate.

Where truthfully observed or reported:

- Minato may retain observer/evaluation history;
- the reporting ANBU operative may retain observer history;
- ANBU may retain an institutional report;
- Uchiha Police may retain receiving-institution custody/history where applicable;
- a surviving escaped participant retains their own direct memory of Kakashi's attempted lethal/restraint act.

Institutional record does **not** imply every member of the institution personally knows every fact.

Future events may consume institutional history only subject to their own Knowledge / Access predicates.

### Lethal profile

KILLED / repeated deliberate lethal resolutions may contribute to a distinct future ANBU lethal-profile opportunity predicate.

This is not morality scoring.

### Release / escape distinction

`RELEASED` and `ESCAPED` must never collapse in report/history projection.

A lethal escape is not mercy.

A restraint escape is not release.

---

## 12. Runtime replacement classification

For Academy Kakashi V2 this change is a **REPLACE** of the old disposition implementation, not an additive patch.

Superseded runtime responsibilities include:

- direct `dispose(..., "KILL") -> DEAD`;
- aggregate `disposeGroup("KILL") -> all DEAD`;
- `addField()` / `fieldSecured[]` as Kakashi V2 restraint truth;
- `FIELD_SECURED_PENDING_COLLECTION` predicates for Kakashi V2;
- `COLLECTED_ACTIVE_ESCORT` Kakashi V2 custody state.

Required replacement discipline:

1. identify every current read/write dependency;
2. migrate legitimate behavior to the two-outcome participant-fact model;
3. re-key collection to exact RESTRAINED facts;
4. prove the successor with old Kakashi V2 paths disabled/absent;
5. de-load/retire obsolete Kakashi V2 state writers/readers;
6. preserve save/load intentionally through a bounded migration if current Alpha saves can contain the retired fields;
7. prove no stale old state can regain semantic ownership.

Do not leave two competing disposition systems active.

---

## 13. Existing content package

Writing has already placed the approved player-facing resolver scenes in:

`runtime/academy-kakashi-v2-content-36000.js`

Current authority commit:
`a0ccb6097967db21348bec56d6139c39448a09d9`

The package contains 25 declarative `dispositionResolvers` sections.

Coding should bind/consume them.

Do not re-transcribe or paraphrase them into a second source of prose.

---

## 14. Required regression families

At minimum prove:

1. MI KILL -> KILLED;
2. MI KILL -> ESCAPED;
3. MI RESTRAIN -> RESTRAINED;
4. MI RESTRAIN -> ESCAPED;
5. PS equivalent outcomes in package-recovered and package-missing contexts;
6. AMT equivalent outcomes in package-recovered / package-missing contexts;
7. group 2-target KILL mixed outcomes;
8. group 3-target KILL mixed outcomes;
9. each exact group target commits once;
10. save/load does not reroll a disposition;
11. ESCAPED never becomes RELEASED;
12. RESTRAINED never becomes institutional custody merely by being restrained;
13. sequential all-three restraint -> exact collection -> ANBU transfer;
14. sequential all-three restraint -> exact collection -> Uchiha Police transfer;
15. partial restrained subset collection excludes dead/escaped/released participants;
16. existing authored pursuit timing is preserved;
17. package holder truth remains route-derived through all resolver outcomes;
18. immediate 1v1 / 2v1 / 3v1 Battle cash pays once;
19. MI pill retains exact source eligibility;
20. live-capture tier is total 25/50/100 and not cumulative;
21. release causes no cash grant/clawback;
22. kill causes no corpse bounty/morality cash;
23. observer/institutional records remain Knowledge-scoped;
24. evidence producer retry/save-load is idempotent;
25. same causal root cannot counterfeit independent-source breadth;
26. retired Kakashi V2 fieldSecured/direct-death writers cannot control production behavior;
27. Browser Golden remains separate.

---

## 15. Overlap / execution ordering

Current Coding work #312 / PR #318 touches overlapping Kakashi V2 presentation/runtime files and remains under manual repair.

Do not run a second overlapping executor against the same Kakashi V2 files.

The downstream disposition/reward implementation may be prepared/queued now, but file-changing execution should begin only after #312 reaches a safe merged/reconciled checkpoint or Coding explicitly consolidates both into one executor without parallel branches.

This is a runtime-safety ordering constraint, not a semantic blocker.

---

## 16. Final lock

> **Academy Kakashi V2 now uses exactly two factual outcomes for each uncertain post-Battle disposition: KILL -> KILLED|ESCAPED and RESTRAIN -> RESTRAINED|ESCAPED. RESTRAINED is the participant fact for this Origin; #244 field-secured custody-state names are not consumed. Collection reads exact restrained participants, and institutional custody occurs only on delivery. Material rewards remain causally attributed and non-moralising. Specialist development uses the existing contextual evidence architecture, never XP, and same-causal-root work cannot counterfeit independent breadth. The old Kakashi V2 direct-death and fieldSecured implementations must be replaced, not layered beside the successor.**
