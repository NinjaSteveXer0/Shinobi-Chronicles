# Academy Kakashi Origin — Scene 05A-W: Kakashi Wins — Verbatim Lock

**Date:** 2026-09-18  
**Owner:** Stephen / Writing — Konoha  
**Status:** **STEPHEN-APPROVED / LOCKED VERBATIM — DO NOT CHANGE**

**Source branch:** `SCENE_03A / CHOICE_01 / BRANCH_A — STOP THE ASSASSIN`  
**Entry:** Scene 04A PL Battle resolves with **Kakashi Hatake victory over Masked Interceptor**.

**Supersedes:** the earlier Scene 05A-W 1–4-turn / direct-AMT pursuit version.

This file is the exact player-facing and scene-continuation authority for Kakashi Origin Scene 5A-W. Coding must implement it verbatim. Do not paraphrase, condense, expand, reorder, substitute, or silently restore the removed direct ANBU Marked Target pursuit choice.

## Backdrop
`fight_at_sakura_tree.png`

## Objective
**Retrieve the package.**

## Narration
Masked Interceptor hits the stone beneath the Sakura tree.

Kakashi lands a few steps away.

For a moment, the street is still.

Then his eye moves past her.

Toward the route Package Smuggler took.

### If Kakashi wins within 1–3 turns

A figure cuts across the far end of the street.

Package Smuggler.

Still moving.

The package is still with him.

Kakashi has not lost him yet.

Not quite.

He looks back at Masked Interceptor.

She lies where he put her.

Every second he spends here gives Package Smuggler more distance.

The package is still within reach.

But only if Kakashi moves now.

### If Kakashi wins on turn 4 or later

The street ahead is empty.

Kakashi searches the rooftops.

The alleys.

The next junction.

Nothing.

Package Smuggler had too much time.

The package is gone with him.

Kakashi looks back at Masked Interceptor.

She lies beneath the Sakura tree.

The chase is over.

What happens to her is the only decision left here.

## Dialogue
None.

## System / Resolver
Consume:

**PL BATTLE — Kakashi Hatake vs Masked Interceptor**  
**Result: Kakashi Victory**

Read the completed Battle turn count.

**Victory within 1–3 turns:**
- Package Smuggler remains reachable.
- **GO AFTER PACKAGE SMUGGLER** remains available.
- No direct ANBU Marked Target pursuit is available from this immediate post-MI return.

**Victory on turn 4 or later:**
- Package Smuggler is no longer reachable.
- No pursuit choice remains.

Masked Interceptor remains available for a post-Battle decision.

Her exact Battle-end condition determines whether the lethal choice is **KILL HER** or **ATTEMPT TO KILL HER**.

## Choices

**If Kakashi wins within 1–3 turns:**
- `SCENE_05A_W / CHOICE_01 / BRANCH_A` — **GO AFTER PACKAGE SMUGGLER**
- `SCENE_05A_W / CHOICE_01 / BRANCH_C` — **KILL HER** / **ATTEMPT TO KILL HER**
- `SCENE_05A_W / CHOICE_01 / BRANCH_D` — **TAKE HER BACK TO ANBU**
- `SCENE_05A_W / CHOICE_01 / BRANCH_E` — **TAKE HER TO THE UCHIHA POLICE FORCE**

**If Kakashi wins on turn 4 or later:**
- `SCENE_05A_W / CHOICE_01 / BRANCH_C` — **KILL HER** / **ATTEMPT TO KILL HER**
- `SCENE_05A_W / CHOICE_01 / BRANCH_D` — **TAKE HER BACK TO ANBU**
- `SCENE_05A_W / CHOICE_01 / BRANCH_E` — **TAKE HER TO THE UCHIHA POLICE FORCE**
