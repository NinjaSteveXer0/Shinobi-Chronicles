# Academy Kakashi Origin — Scene 06A-W2C: Attempt to Kill Her — Verbatim Lock

**Date:** 2026-09-18  
**Owner:** Stephen / Writing — Konoha  
**Status:** **STEPHEN-APPROVED / LOCKED VERBATIM — DO NOT CHANGE**

**Source branch:** `SCENE_05A_W / CHOICE_01 / BRANCH_C — ATTEMPT TO KILL HER`  
**Entry condition:** `STOP THE ASSASSIN -> Kakashi Victory -> turn 4+ post-Battle scene -> ATTEMPT TO KILL HER`.

This file is the exact player-facing and resolver-handoff authority for Kakashi Origin Scene 6A-W2C. Coding must implement it verbatim. Do not paraphrase, condense, expand, reorder, substitute, or convert lethal intent into a confirmed death before the owning resolver returns.

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

Package Smuggler has already disappeared into Konoha.

There is no sound of pursuit.

No movement from the route ANBU Marked Target took.

Only the two of them remain beneath the Sakura tree.

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

The owning resolver determines the factual result.

### Current confirmed-kill continuation

If the resolver returns:

**`LETHAL_ATTEMPT_KILLED`**

Masked Interceptor's death must commit **before** the kill presentation begins.

### Coding Presentation Note — Kill Animation Begins Here

Play the approved stylised lethal-action presentation immediately after the resolver confirms `LETHAL_ATTEMPT_KILLED`.

Presentation sequence:

**Kakashi vanishes forward**
-> Masked Interceptor reacts
-> rapid close-distance movement
-> brief weapon / impact flash
-> **diagonal black slash across the screen**
-> full black for a short beat
-> audio / visual impact drops into silence
-> fade back to `fight_at_sakura_tree.png`

Do not show the death animation before the resolver confirms the kill.

Do not use graphic gore.

When the Sakura-tree scene returns, Masked Interceptor is factually **dead**.

## Narration — Confirmed Kill Aftermath
Petals drift across the stone.

Masked Interceptor remains where she fell.

Her weapon rests a short distance from her hand.

Kakashi straightens.

The kunai stays in his grip for another moment.

Then he lowers it.

His eye passes over the road beyond the Sakura tree.

Whatever chance existed to recover the package is gone now.

Kakashi puts the kunai away.

There is only one place left to go.

## Objective Switch
**Report to ANBU.**

## System / Resolver — Confirmed Kill Commit
Commit:

- Masked Interceptor: **DEAD**
- Kakashi lethal intent: **COMMITTED**
- lethal attempt result: **SUCCESS / CONFIRMED KILL**
- Package Smuggler: escaped with package
- package: not recovered
- ANBU Marked Target: escaped
- pursuit: closed
- Pakkun: not present

Record Masked Interceptor's confirmed death in Kakashi's lethal-trajectory history.

The later ANBU report must preserve:

- Kakashi failed to recover the package;
- Package Smuggler escaped with it;
- ANBU Marked Target escaped;
- Kakashi fought Masked Interceptor;
- Kakashi subsequently attempted to kill her;
- that lethal attempt succeeded.

Other resolver outcomes (`LETHAL_ATTEMPT_SURVIVED`, `LETHAL_ATTEMPT_INTERRUPTED`, `LETHAL_ATTEMPT_ESCAPED`, or another already-authorised factual result) do **not** consume this confirmed-kill aftermath and remain separate continuation work.

## Choices
None.

## Transition
Kakashi leaves the Sakura tree behind.

**BLACK WIPE**

-> **ANBU Report Scene**

## Scene ID
`SCENE_06A_W2C — ATTEMPT TO KILL HER`
