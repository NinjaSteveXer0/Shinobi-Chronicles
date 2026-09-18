# Academy Kakashi Origin — Scene 05A-W: Kakashi Wins — Verbatim Lock

**Date:** 2026-09-19  
**Owner:** Stephen / Writing — Konoha  
**Status:** **STEPHEN-APPROVED / LOCKED VERBATIM — DO NOT CHANGE**

**Source branch:** `SCENE_03A / CHOICE_01 / BRANCH_A — STOP THE ASSASSIN`  
**Entry:** Scene 04A PL Battle resolves with **Kakashi Hatake victory over Masked Interceptor**.

This file is the exact player-facing and scene-continuation authority for Kakashi Origin Scene 05A-W.

It supersedes the prior player-facing 1–3 / Package-Smuggler-only version.

## Backdrop
`fight_at_sakura_tree.png`

## Objective
**Retrieve the package.**

## Narration

Masked Interceptor hits the stone beneath the Sakura tree.

Kakashi lands a few steps away.

For a moment, the street is still.

Then his eye moves past her.

Toward the routes the others took.

### If Kakashi wins within 1–4 turns

Package Smuggler cuts across the far end of the street.

Still moving.

The package is still with him.

Higher up, movement flashes across a distant roofline.

ANBU Marked Target.

Farther away.

But not gone.

Not yet.

Kakashi looks between them.

One route leads to the package.

The other to the man who carried it here.

Then his eye drops back to Masked Interceptor.

She lies where he put her.

Three problems.

Not enough time for all of them at once.

Whatever Kakashi does next will decide which ones remain within reach.

### If Kakashi wins on turn 5 or later

The street ahead is empty.

Kakashi searches the rooftops.

The alleys.

The next junction.

Nothing.

Package Smuggler had too much time.

The package is gone with him.

ANBU Marked Target is gone as well.

Kakashi looks back at Masked Interceptor.

She lies beneath the Sakura tree.

The pursuit is over.

What happens to her is the only decision left here.

## Dialogue
None.

## System / Resolver

Consume:

**PL BATTLE — Kakashi Hatake vs Masked Interceptor**  
**Result: Kakashi Victory**

Read the completed Battle turn count and Masked Interceptor's exact post-Battle control state.

### Victory within 1–4 turns

Immediate pursuit state:

- Package Smuggler remains reachable.
- ANBU Marked Target remains reachable.
- Kakashi may pursue **one** immediately.
- Choosing ANBU Marked Target closes Package Smuggler pursuit.
- Choosing Package Smuggler preserves possible later ANBU Marked Target pursuit only through the separately authorised PS **1–3-turn** continuation gate.

Masked Interceptor remains available for a post-Battle decision where her factual state permits it.

### Victory on turn 5 or later

- Package Smuggler is no longer reachable.
- ANBU Marked Target is no longer reachable.
- No pursuit choice remains.
- Only state-eligible Masked Interceptor dispositions remain.

### Masked Interceptor state

If **CONTROLLED_DEFEATED**:

- deterministic **KILL HER** may be available;
- immediate ANBU custody may be available;
- immediate Uchiha Police custody may be available;
- on a qualifying 1–4-turn victory, **RESTRAIN HER AND CONTINUE** may be available.

If **DEFEATED_BUT_NOT_CONTROLLED**:

- **ATTEMPT TO KILL HER** may be available;
- custody actions remain subject to legitimate current-state eligibility;
- on a qualifying 1–4-turn victory, use the resolver-owned **ATTEMPT TO RESTRAIN HER AND CONTINUE** equivalent.

## Choices

### If Kakashi wins within 1–4 turns

- `SCENE_05A_W / CHOICE_01 / BRANCH_A` — **GO AFTER PACKAGE SMUGGLER**
- `SCENE_05A_W / CHOICE_01 / BRANCH_B` — **GO AFTER ANBU MARKED TARGET**
- `SCENE_05A_W / CHOICE_01 / BRANCH_C` — **KILL HER** / **ATTEMPT TO KILL HER**
- `SCENE_05A_W / CHOICE_01 / BRANCH_D` — **TAKE HER BACK TO ANBU**
- `SCENE_05A_W / CHOICE_01 / BRANCH_E` — **TAKE HER TO THE UCHIHA POLICE FORCE**
- `SCENE_05A_W / CHOICE_01 / BRANCH_F` — **RESTRAIN HER AND CONTINUE** / **ATTEMPT TO RESTRAIN HER AND CONTINUE**

### If Kakashi wins on turn 5 or later

- `SCENE_05A_W / CHOICE_01 / BRANCH_C` — **KILL HER** / **ATTEMPT TO KILL HER**
- `SCENE_05A_W / CHOICE_01 / BRANCH_D` — **TAKE HER BACK TO ANBU**
- `SCENE_05A_W / CHOICE_01 / BRANCH_E` — **TAKE HER TO THE UCHIHA POLICE FORCE**
