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
-> **continue this route to its terminal Origin ending before rewinding**.

## Current route state

- Scene 5A-W2 represents `STOP THE ASSASSIN -> WIN -> turn 4+`.
- Its visible choice surface has three actions:
  - `ATTEMPT TO KILL HER` / `KILL HER` where lawful;
  - `TAKE HER BACK TO ANBU`;
  - `TAKE HER TO THE UCHIHA POLICE FORCE`.
- Stephen is currently following the lethal-intent route:
  - `Scene 6A-W2C — ATTEMPT TO KILL HER`.

## Required later browser test — manual fast-win exposure

Current Academy-state combat makes the Masked Interceptor 1-v-1 naturally resolve too slowly to expose the `STOP THE ASSASSIN -> WIN -> 1–3 turns` branch during ordinary play.

Therefore this route requires a deliberate **Dev Tools / test-state intervention** later so Stephen can validate the quick-win scene.

Required reminder point:

> When the current late-win route is completed and Stephen rewinds to test `STOP THE ASSASSIN` again, remind him **before or at the Masked Interceptor Battle** that he needs to use the Dev Tools/test override to force a victory within 1–3 turns.

The quick-win branch to validate is:

`STOP THE ASSASSIN`
-> `Kakashi vs Masked Interceptor`
-> **win in 1–3 turns**
-> `Scene 5A-W1 — Quick Victory`
-> five-choice surface including `GO AFTER PACKAGE SMUGGLER`.

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

Continue from:

`SCENE_06A_W2C — ATTEMPT TO KILL HER`

until the route reaches its terminal Origin ending.
