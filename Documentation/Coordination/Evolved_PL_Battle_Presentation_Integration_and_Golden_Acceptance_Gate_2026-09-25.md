# Shinobi Chronicles — Evolved PL Battle Presentation Integration + Golden Acceptance Gate

**Date:** 2026-09-25  
**Owner:** CE / Codex / Coordination  
**Trigger:** Stephen browser/video review after #369 / PR #372  
**Status:** **SEMANTIC FOUNDATION VALIDATED / PRESENTATION INTEGRATION RED / PLAYER EXPERIENCE RED / BATTLE GOLDEN NOT CLAIMED**

## 1. Classification

#369 / PR #372 proved substantial evolved-PL Battle semantics. It did **not** prove the locked player-facing Battle overhaul.

Current truthful status:

~~~text
EVOLVED PL BATTLE SEMANTICS = LARGELY GREEN
PRESENTATION INTEGRATION = RED
PLAYER EXPERIENCE = RED
BATTLE GOLDEN = NOT CLAIMED
~~~

PR #372's `browserGoldenClaimed:false` was correct and remains meaningful.

Preserve #369's semantic work unless a reproduced semantic defect proves otherwise:
- PL / Remaining Battle PL identity;
- exact Menma + Anko vs Altered + Brute + Unstable participant envelope;
- Menma / Anko player-side entitlement;
- enemy Active-only relay;
- independent PL ledgers;
- exact whole-encounter receipt;
- 100-Ryō reward ownership;
- MEN-03 Menma-only attribution;
- save/load and committed RNG safeguards;
- Beta #366 exclusion;
- Kakashi protection.

## 2. Confirmed mismatch

The dedicated semantic runtime is:

`runtime/alpha-menma-evolved-pl-battle-36900.js`

The canonical shared Battle presentation owner remains:

`runtime/alpha-battle-modern-33000.js`

The semantic runtime's synchronous `settleSemanticLoop()` can commit several autonomous actions before control returns to the next Menma input opportunity.

That is valid semantic processing, but without a presentation queue it allows committed events to become effectively invisible to the player.

The locked target remains:

> **A living six-shinobi formation, not two cards subtracting numbers from each other.**

And every committed action must visibly read as:

> **ACTOR -> ACTION -> TARGET -> IMPACT / RESPONSE -> RESULT -> PL CHANGE -> SETTLE**

## 3. Presentation queue law

Complete one canonical ordered playback queue in the shared Battle presentation owner.

Architecture:

~~~text
SEMANTIC ACTION COMMITS
-> immutable presentation receipt emitted
-> receipt enters ordered presentation queue
-> shared Battle presentation plays receipt
-> UI settles to already-authoritative state
-> next queued receipt plays
~~~

The queue consumes committed truth. It never creates truth and never reruns Combat resolution.

Each receipt must contain enough immutable data to present at minimum:
- Battle / action-opportunity identity;
- sequence ordinal;
- actor side + participant ID;
- exact action/Skill ID and display label;
- target side + participant ID;
- committed result class;
- committed PL delta / control result;
- relevant pre/post Remaining Battle PL;
- withdrawal/result flags;
- formation transition facts where applicable;
- exact action role: Active, authored assist, or other authorised role.

## 4. Safeguard compatibility

The existing catastrophe safeguard remains absolute:

> **No timer, animation, DOM event, CSS transition, portrait movement or presentation callback may be required for semantic Battle truth to become true.**

Combat may commit first.

Presentation failure never rolls truth back or reruns the resolver.

But semantic commit does **not** authorise silent visual skipping.

If playback fails or reduced motion is active:
- hard-settle directly to the committed authoritative state;
- expose the result sufficiently;
- continue without duplicate semantics.

## 5. Terminal Battle / Story return

A terminal semantic result may commit before playback finishes.

However the Battle surface must not disappear into Story before the terminal committed sequence is exposed.

Required visible flow:

~~~text
terminal semantic result commits
-> terminal receipt queued
-> final action / response / PL / withdrawal exposed
-> terminal Battle state settles visibly
-> Story return/navigation may proceed
~~~

Navigation is presentation flow, not semantic Battle ownership.

## 6. Menma formation proof

The first Battle Golden candidate must visibly show the exact 2-v-3 formation.

Player side:
- Menma = **Active**
- Anko = visibly **Benched**

Enemy side:
- Altered Shinobi = **Active**
- Brute = visibly **Benched**
- Unstable = visibly **Benched**

The screen must read as adaptive Squad Wedge versus adaptive Squad Wedge.

It must not read as Menma card versus Altered card with incidental tiny portraits.

Use approved frameless Battle portrait presentation, not collectible-card-panel presentation.

Exact geometry remains under existing UI/presentation authority.

## 7. Anko assist presentation

Anko remains semantically Benched.

Her authored assist presentation is:

~~~text
Anko Benched
-> temporary confrontation focus
-> exact action shown
-> exact target response shown
-> result / PL / state shown
-> Anko returns to Benched projection
~~~

This does not:
- promote Anko;
- replace Menma;
- expose a second player dock;
- create a second action;
- rewrite formation order.

## 8. Enemy action and relay presentation

Enemy Active actions must expose actor, exact action, target, response, result, PL change and settle.

When enemy Active withdraws:

~~~text
outgoing Active result/withdrawal exposed
-> outgoing Active clears
-> next eligible Benched hostile relays into Active
-> formation settles
-> next side opportunity becomes visible
~~~

Menma proof uses Altered -> Brute -> Unstable, subject to any future relay candidate already withdrawn by Anko's off-slot assist.

## 9. Environment

Menma Battle must visibly consume:

`Scene backdrops/forest_clearing_day.png`

A black/empty generic Battle void is not acceptable for Golden.

## 10. Stale Story objective is confirmed live and superseded

Current live `game.js` still contains:
- `Stop the Altered Shinobi.`
- old encounter `origin_academy_menma_prologue:altered_shinobi`
- `STOP THE ALTERED SHINOBI`
- `Stop the Altered Shinobi — not completed.`

These are stale for new Scene 7 executions.

The player-facing objective must consume:

> **Stop the Test Subjects.**

Exact successor encounter:

`origin_academy_menma_prologue:three_test_subjects`

Exact objective:

`stop_three_test_subjects`

Historical already-committed legacy history is not rewritten.

## 11. Balance hold

Do **not** change Menma PL10, Altered PL11, hostile action values, Anko action values or cadence merely because the current presentation makes the Battle feel brutally fast.

The current video is confounded by invisible/synchronous playback.

After presentation repair, test the exact damage/action matrix and determine whether:
- Menma receives enough meaningful selectable opportunities;
- normal legal action choices can win;
- one narrow forced sequence exists;
- Anko contributes as intended;
- enemy pressure is appropriate for an Academy Origin.

Any numeric rebalance requires separate Combat/PL evidence and authority.

## 12. New installed-browser Golden gate

Battle Golden now requires explicit player-facing assertions in addition to semantic QA.

### Formation
- exactly 2 allied portraits projected;
- exactly 3 opposition portraits projected;
- formation mode is not duel;
- Menma Active;
- Anko Benched;
- Altered Active initially;
- Brute + Unstable Benched;
- frameless Battle portrait projection active.

### Environment
- forest-clearing Battle environment visibly bound.

### Playback
- at least one Menma action visibly plays;
- at least one enemy action visibly plays;
- at least one Anko assist visibly plays;
- actor/action/target/result/PL change are readable;
- autonomous semantic events are not swallowed in a synchronous burst.

### Relay
- Altered withdrawal visibly relays Brute;
- Brute withdrawal visibly relays Unstable when applicable;
- a relay candidate already withdrawn off-slot is skipped correctly.

### Terminal
- final committed action/result is visible before Story navigation;
- terminal Victory/Defeat state is not erased instantly;
- exact Story caller resumes once.

### Objective
- no new execution displays `Stop the Altered Shinobi`;
- successor three-subject objective is shown.

### Safeguards
- playback failure/reduced motion hard-settles safely;
- no semantic duplication on skip/failure;
- save/reload does not duplicate committed presentation receipts;
- stale receipts cannot play against a newer Battle/session.

Screenshots/video evidence must be **assessed**, not merely captured.

## 13. QA status vocabulary

Going forward track separately:

~~~text
SEMANTIC GREEN
PRESENTATION GREEN
INSTALLED-BROWSER FUNCTIONAL GREEN
STEPHEN VISUAL ACCEPTANCE
BATTLE GOLDEN
~~~

Canonical rule:

> **Installed-browser runtime proof != presentation acceptance != Battle Golden.**

## 14. Scope boundary

This repair does not reopen:
- PL formula/identity;
- Menma/Anko cadence;
- Anko Combat package;
- MEN-03;
- 100-Ryō reward;
- Beta #366;
- Kakashi;
- general formation semantics.

Do not create a second presentation owner.

Use the canonical shared Battle presentation owner.

## 15. Final lock

> **#369 is preserved as the semantic foundation of the evolved PL Battle System, but it is not the completed player-facing Battle overhaul. The missing Alpha tranche is presentation integration through the canonical shared Battle owner: the exact multi-participant Squad Wedge and environment must be visible, and every already-committed Menma, enemy and Anko action must enter an immutable ordered presentation queue that visibly plays ACTOR -> ACTION -> TARGET -> IMPACT/RESPONSE -> RESULT -> PL CHANGE -> SETTLE without becoming semantic authority. Terminal Story navigation must wait for terminal presentation exposure or a safe hard-settle. Live legacy Menma wording/launcher state must migrate from the old Altered-only objective to the three-subject encounter. Battle Golden requires separate semantic, presentation, installed-browser and Stephen visual acceptance evidence.**

**SEMANTICS GREEN != PRESENTATION GREEN != BATTLE GOLDEN.**
