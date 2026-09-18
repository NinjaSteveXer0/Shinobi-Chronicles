# Academy Kakashi Origin — Active Route Traversal and Test Tracker

**Date:** 2026-09-18  
**Owner:** Stephen / Writing — Konoha  
**Status:** **ACTIVE PRODUCTION TRACKER — UPDATE AS EACH ROUTE IS WRITTEN / IMPLEMENTED / BROWSER-TESTED**

## Purpose

Track the exact Kakashi Origin route Stephen is currently traversing so scene-by-scene production does not lose branches, and record when an artificial browser/dev-tools test intervention is required to expose a route that is not naturally reachable with the current Academy build.

Do not treat this tracker as Story authority where it conflicts with a locked scene/causal document. It records traversal/testing coverage only.

## Current traversal strategy

Stephen is completing one route all the way to the Origin end before rewinding to the earlier choice point and working the remaining routes around.

Current production traversal:

`Scene 2 — WATCH THE EXCHANGE`
-> `Scene 3A — STOP THE ASSASSIN`
-> `Scene 4A — Kakashi vs Masked Interceptor PL Battle`
-> natural browser result: **Kakashi Victory on turn 4+**
-> `Scene 5A-W2 — Late Victory / no pursuit`
-> selected `ATTEMPT TO KILL HER`
-> `Scene 6A-W2C — Attempt to Kill Her`
-> resolver result **LETHAL_ATTEMPT_KILLED**
-> confirmed-kill animation + aftermath
-> Objective switches to **Report to ANBU.**
-> **BLACK WIPE**
-> `Scene 7A-W2C-K — ANBU Report` on `rooftop_night.png`
-> Objective `Report to ANBU.` removed at scene end
-> **BLACK WIPE**
-> `Scene 8A-W2C-K — Hokage's Office` on `hokage_administration_interior_night.png`
-> private reaction scene with Minato + ANBU Operative + ANBU Marked Target + Package Smuggler; Masked Interceptor absent because she is dead on this Chronicle
-> **BLACK WIPE**
-> Chronicle Receipt / closing sequence
-> **continue this route to its terminal Origin ending before rewinding**.

## Current route state

- Scene 5A-W2 represents `STOP THE ASSASSIN -> WIN -> turn 4+`.
- Its visible choice surface has three actions:
  - `ATTEMPT TO KILL HER` / `KILL HER` where lawful;
  - `TAKE HER BACK TO ANBU`;
  - `TAKE HER TO THE UCHIHA POLICE FORCE`.
- The `ATTEMPT TO KILL HER` family has now been authored through terminal continuation for all four resolver outcomes:
  - `LETHAL_ATTEMPT_KILLED`;
  - `LETHAL_ATTEMPT_SURVIVED`;
  - `LETHAL_ATTEMPT_INTERRUPTED`;
  - `LETHAL_ATTEMPT_ESCAPED`.
- The KILLED / SURVIVED / INTERRUPTED / ESCAPED chains each now have their Scene 06 result, Scene 07 rooftop ANBU report, and Scene 08 Hokage Office continuation locked.
- Coding has implemented the non-kill continuation family; installed-browser Golden remains open.
- One surgical runtime correction is currently pending on #237: remove the stray player-facing narration `A beat.` from the ESCAPED Hokage Office scene. This does not reopen Story semantics.
- The next Writing traversal rewinds to the same Scene 5A-W2 late-victory decision surface and takes the next unconsumed sibling branch: `TAKE HER BACK TO ANBU`.

## Required later browser test — manual fast-win exposure

Current Academy-state combat may resolve too slowly to expose the corrected `STOP THE ASSASSIN -> WIN -> 1–4 turns` pursuit fork during ordinary play.

Therefore this route requires a deliberate **Dev Tools / test-state intervention** later so Stephen can validate the quick-win scene.

Required reminder point:

> When Stephen rewinds to test the corrected `STOP THE ASSASSIN` fast-win fork, remind him **before or at the Masked Interceptor Battle** that he may need the Dev Tools/test override to force a victory within 1–4 turns.

The corrected quick-win branch to validate is:

`STOP THE ASSASSIN`
-> `Kakashi vs Masked Interceptor`
-> **win in 1–4 turns**
-> immediate post-MI decision surface includes both:
   - `GO AFTER PACKAGE SMUGGLER`
   - `GO AFTER ANBU MARKED TARGET`
-> selecting Package Smuggler can preserve later AMT pursuit only if Package Smuggler is then defeated within **1–3 turns**
-> selecting ANBU Marked Target immediately closes the Package Smuggler route.

Do not treat the Dev Tools intervention as canonical Chronicle history; it is browser/route validation only.

## Branches known to require later revisit from Scene 5A-W2

After the current `ATTEMPT TO KILL HER` route reaches its end, the other Scene 5A-W2 branches still need their own scene-by-scene traversal:

- `TAKE HER BACK TO ANBU`
- `TAKE HER TO THE UCHIHA POLICE FORCE`

## Earlier branch point still to revisit

After the active `STOP THE ASSASSIN` family is completed, return to Scene 3A and continue remaining sibling choices under the established top-left-around traversal plan:

- `SECURE THE PACKAGE`
- `SECURE THE PACKAGE BEFORE THE ASSASSIN`
- `DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE`
- `GO AFTER THE ORIGINAL TARGET`

Each branch must be tracked independently through its own Battle/resolver outcomes.

## Tracking rule

For every new scene reached, update this file with:

- incoming choice / branch ID;
- Battle/resolver result;
- timing gate result where relevant;
- current scene ID;
- branches tested;
- branches still untested;
- whether normal play can reach the branch;
- whether a Dev Tools/test override is needed for browser coverage.

## Current next action

Rewind to:

`SCENE_05A_W2 — STOP THE ASSASSIN -> Kakashi Victory -> turn 4+`

Select the next unconsumed sibling choice:

`SCENE_05A_W / CHOICE_01 / BRANCH_D — TAKE HER BACK TO ANBU`

Current Writing production task:

**Author both post-Battle Masked Interceptor custody branches before the next Coding tranche:**

1. `SCENE_05A_W / CHOICE_01 / BRANCH_D — TAKE HER BACK TO ANBU`
2. `SCENE_05A_W / CHOICE_01 / BRANCH_E — TAKE HER TO THE UCHIHA POLICE FORCE`

Stephen has also corrected the STOP THE ASSASSIN pursuit timing. New binding causal authority:

`Documentation/Story/Academy_Kakashi_Stop_Assassin_1_to_4_Turn_Dual_Pursuit_Fork_Correction_2026-09-18.md`

Correct rule:
- MI victory in **1–4 turns** -> both Package Smuggler and ANBU Marked Target are immediate pursuit options.
- Choose Package Smuggler -> defeating PS within **1–3 turns** preserves later AMT pursuit.
- Choose ANBU Marked Target immediately -> Package Smuggler route closes.
- MI victory on turn **5+** -> no immediate pursuit remains.

Do not ask Coding to implement this corrected pursuit fork until the two MI custody branches are authored/approved and Scene 05A-W exact player-facing authority is rewritten coherently.

## Resolver-result coverage for Scene 06A-W2C

Authored/locked:

- `LETHAL_ATTEMPT_KILLED`
- `LETHAL_ATTEMPT_SURVIVED`
- `LETHAL_ATTEMPT_INTERRUPTED`
- `LETHAL_ATTEMPT_ESCAPED`

These remain distinct Chronicle histories and must not be collapsed into one another.
