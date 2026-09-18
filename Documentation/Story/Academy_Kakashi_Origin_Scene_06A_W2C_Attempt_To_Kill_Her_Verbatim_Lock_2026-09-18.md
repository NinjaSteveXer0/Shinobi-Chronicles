# Academy Kakashi Origin — Scene 06A-W2C: Attempt to Kill Her — Verbatim Lock

**Date:** 2026-09-19  
**Owner:** Stephen / Writing — Konoha  
**Status:** **STEPHEN-APPROVED / LOCKED VERBATIM — DO NOT CHANGE**

**Source branch:** `SCENE_05A_W / CHOICE_01 / BRANCH_C — ATTEMPT TO KILL HER`

This file supersedes the prior late-victory-only entry assumption.

## Backdrop
`fight_at_sakura_tree.png`

## Objective
**Retrieve the package.**

## Narration

Kakashi watches Masked Interceptor push herself upright.

One hand braces against the stone.

The other stays close to her weapon.

She is hurt.

Still dangerous.

Kakashi studies her for a heartbeat.

### If pursuit was still open when Kakashi selected the lethal action

His eye shifts toward the street.

Package Smuggler is still moving.

Somewhere beyond him, ANBU Marked Target is getting farther away.

Kakashi could move now.

Instead, he looks back at Masked Interceptor.

### Common continuation

Masked Interceptor steadies herself.

Kakashi reaches for his kunai.

She sees his hand move.

Whatever she expected him to do next, this was not it.

Her stance changes.

Kakashi lowers his centre of gravity.

Then disappears from where he was standing.

## Dialogue
None.

## System / Resolver

**ATTEMPT TO KILL — RESOLVER-DETERMINED**

Target: **Masked Interceptor**

Commit Kakashi's lethal intent before resolution.

Resolve one factual result:

- `LETHAL_ATTEMPT_KILLED`
- `LETHAL_ATTEMPT_SURVIVED`
- `LETHAL_ATTEMPT_INTERRUPTED`
- `LETHAL_ATTEMPT_ESCAPED`

After that result commits:

**recalculate time, position and pursuit eligibility from the actual committed state.**

Do **not** automatically close pursuit merely because Kakashi chose lethal intent.

For the required triple-kill benchmark:

> MI Battle victory within 1–4 turns  
> → lethal action resolves to MI death  
> → Package Smuggler remains reachable.

Other resolver outcomes may alter pursuit differently according to their committed elapsed/action state.

### If no pursuit remains after resolution

Switch Objective to:

**Report to ANBU.**

Continue into the already-approved outcome-specific ANBU/report ending.

### If pursuit remains

Keep Objective:

**Retrieve the package.**

Present only the pursuit options that remain factually eligible after the lethal result.

Masked Interceptor's lethal result is already committed and cannot be rerolled.

## Choices

State-derived after the lethal result.

If pursuit remains, expose only the still-eligible pursuit choices.

If pursuit does not remain, none.
