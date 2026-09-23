# Academy Kakashi — #333 Player Choice Label Modernization

**Date:** 2026-09-24  
**Owner:** Writing / Story — Konoha  
**Status:** **STEPHEN-DIRECTED REOPEN / EXACT WORDING CANDIDATE**  
**Scope:** player-facing choice labels only  
**Semantic IDs / route topology:** unchanged

## Why this exists

Stephen explicitly reopened the Academy Kakashi option/decision names after identifying the grammatical and player-facing failure:

> `ATTEMPT THE PICKPOCKET`

This is not natural English and exposes old branch-label thinking.

The audit then found a wider issue: multiple current labels are internal / mechanical / overlong, and resolver results are sometimes exposed as fake `CONTINUE` choices.

## New choice-label law

A player-facing Kakashi choice should:

- state the action/intention directly;
- normally use 2–6 words;
- sound like something a person could decide to do now;
- not expose internal participant IDs when ordinary scene language is clearer;
- not explain resolver uncertainty with `ATTEMPT` unless uncertainty itself is the meaningful decision;
- not promise success merely because the button is imperative;
- not include route bookkeeping;
- not use `CONTINUE` for an automatic resolver projection.

Choice click != success.

Examples:
- `KILL HIM` may still resolve `ESCAPED`;
- `TAKE HIM DOWN` may still lose the Battle;
- therefore `STEAL THE PACKAGE` does not need to be named `ATTEMPT THE PICKPOCKET`.

## Proposed canonical display labels

### Root — Scene 02

| Stable semantic ID | Old display | Proposed display |
|---|---|---|
| `watch_exchange` | WATCH THE EXCHANGE | **WATCH THE HANDOFF** |
| `move_in_closer` | MOVE IN CLOSER | **GET CLOSER** |
| `strike_before_handoff` | STRIKE BEFORE THE HANDOFF | **INTERRUPT THE HANDOFF** |
| `slip_for_package` | SLIP IN FOR THE PACKAGE | **SLIP IN AND TAKE IT** |

### After the handoff / MI entrance

| Stable semantic ID | Old display | Proposed display |
|---|---|---|
| `stop_assassin` | STOP THE ASSASSIN | **INTERCEPT THE MASKED ATTACKER** |
| `secure_package` | SECURE THE PACKAGE | **GO FOR THE PACKAGE** |
| `secure_before_assassin` | SECURE THE PACKAGE BEFORE THE ASSASSIN | **BEAT HER TO THE PACKAGE** |
| `assassin_then_package` | DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE | **DEAL WITH HER FIRST** |
| `go_original_target` | GO AFTER THE ORIGINAL TARGET | **CHASE THE MAN FROM THE PHOTO** |

These names keep the five distinct intents:
- stop MI now;
- commit directly to the package fight;
- race MI for a clean package extraction;
- commit to MI first and package second;
- abandon the package route and follow the original photographed target.

### MOVE IN CLOSER — SUCCESS

| Stable semantic ID | Old display | Proposed display |
|---|---|---|
| `closer_handoff` | LET THE HANDOFF HAPPEN | **WAIT FOR THE HANDOFF** |
| `closer_strike` | STRIKE BEFORE THE HANDOFF | **INTERRUPT THE HANDOFF** |
| `closer_pick` | ATTEMPT THE PICKPOCKET | **SLIP IN AND TAKE IT** |

### MOVE IN CLOSER — FAILURE

| Stable semantic ID | Old display | Proposed display |
|---|---|---|
| `failure_stay` | STAY ON THE PACKAGE | **CHASE THE PACKAGE** |
| `failure_stop_ps` | STOP PACKAGE SMUGGLER | **CONFRONT THE RECEIVER** |
| `failure_cutoff` | CUT THEM OFF AT THE SAKURA TREE | **CUT THEM OFF** |

### Cornered AMT / package interrogation

| Stable semantic ID | Old display | Proposed display |
|---|---|---|
| `demand_package` | DEMAND THE PACKAGE | **DEMAND THE PACKAGE** |
| `take_him_down` | TAKE HIM DOWN | **TAKE HIM DOWN** |
| `ask_where` | ASK WHERE THE PACKAGE WAS GOING | **ASK WHERE IT WAS GOING** |

The existing `DEMAND THE PACKAGE` and `TAKE HIM DOWN` already read naturally and stay.

### Pursuit decisions

Use:
- **CHASE THE PACKAGE** when the immediate intent is following PS because he carries the objective;
- **CHASE THE MAN FROM THE PHOTO** when the immediate intent is following AMT;
- **RETURN TO ANBU** when Kakashi chooses to stop field action and report.

Retire player-facing:
- `GO AFTER PACKAGE SMUGGLER`;
- `GO AFTER ANBU MARKED TARGET`;
- `STAY ON THE FIRST MAN`;
- `CHASE THE PACKAGE SMUGGLER`;
- `RETURN AND REPORT`.

The machine may keep its stable internal IDs.

### Singular post-Battle disposition

Standardise:

- **KILL HER / KILL HIM**
- **RESTRAIN HER / RESTRAIN HIM**
- **BRING HER TO ANBU / BRING HIM TO ANBU**
- **TAKE HER TO THE UCHIHA POLICE / TAKE HIM TO THE UCHIHA POLICE**
- **LET HIM GO**
- where pursuit continues:
  - **RESTRAIN HER AND KEEP MOVING**
  - **RESTRAIN HIM AND KEEP MOVING**
- where earlier captives exist:
  - **RESTRAIN HIM AND GO BACK FOR THE OTHERS**

Retire inconsistent:
- `TAKE ... BACK TO THE ANBU`;
- `BRING ... TO THE ANBU`;
- mixed `BACK` / no-`BACK`;
- `... AND CONTINUE`;
- `... AND COLLECT THE OTHERS`.

### Group disposition

Standardise:

- **BRING THEM TO ANBU**
- **TAKE THEM TO THE UCHIHA POLICE**
- **KILL THEM**
- **LET THEM GO**

Where the package is already visibly secured, do **not** restate `TAKE THE PACKAGE` inside `LET THEM GO`. The Story has already shown Kakashi keeping the package.

Retire:
- `TAKE THEM ALL BACK TO ANBU`;
- `TAKE THEM ALL TO THE UCHIHA POLICE FORCE`;
- `TAKE THE PACKAGE AND LET THEM GO`.

### Resolver projection

Every player-facing choice whose only display is:

**CONTINUE**

and whose availability is determined exclusively by an already-committed resolver outcome is **not a genuine player decision**.

Examples include current internal transitions such as:
- `closer_success` / `closer_failure`;
- `stay_success` / `stay_failure`;
- `secure_amt_success` / `secure_amt_fail`;
- `secure_before_success` / `secure_before_failure`;
- pursuit-result continuations;
- direct/improved pickpocket result continuations.

Preferred player-facing behavior:

> commit resolver -> show authored SUCCESS/FAILURE scene automatically -> next real player decision.

If presentation requires a pacing interaction, use the project-wide click-anywhere Story advance. Do not render `CONTINUE` as a decision card.

## Semantic preservation

Changing display wording does not change:
- choice ID;
- route history semantic label unless Coding separately migrates display coupling;
- Battle caller;
- resolver;
- Knowledge;
- package/custody state;
- rewards;
- turn gates;
- save provenance.

Runtime QA currently contains exact display-label assertions. Those assertions must later be migrated to stable semantic IDs / canonical new display labels rather than blocking legitimate Writing improvements.

## Current approval boundary

Stephen has approved the need to replace the old Kakashi choice naming system.

This document proposes the exact successor wording for review while the #333 family pass continues.

No runtime mutation is authorised by this candidate alone.
