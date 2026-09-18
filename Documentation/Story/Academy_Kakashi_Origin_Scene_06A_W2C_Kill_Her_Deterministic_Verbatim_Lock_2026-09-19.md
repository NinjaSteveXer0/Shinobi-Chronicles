# Academy Kakashi Origin — Scene 06A-W2C: Kill Her — Deterministic Verbatim Lock

**Date:** 2026-09-19  
**Owner:** Stephen / Writing — Konoha  
**Status:** **STEPHEN-APPROVED / LOCKED VERBATIM — DO NOT CHANGE**

**Source branch:** `SCENE_05A_W / CHOICE_01 / BRANCH_C — KILL HER`  
**Eligibility:** Masked Interceptor is factually **CONTROLLED_DEFEATED**.

## Backdrop
`fight_at_sakura_tree.png`

## Objective
**Retrieve the package.**

## Narration

Masked Interceptor does not get back up.

Kakashi stands over her.

Her weapon is out of reach.

The fight is finished.

### If pursuit is still open

Kakashi looks once toward the street.

Package Smuggler is still within reach.

ANBU Marked Target is farther ahead.

There is still time to move.

Kakashi looks back down.

He makes his decision.

### Common continuation

His hand closes around the kunai.

Masked Interceptor sees it.

There is no second fight.

No opening left for her to take.

Kakashi moves.

## Dialogue
None.

## System / Resolver

**KILL — GUARANTEED / DETERMINISTIC**

Target: **Masked Interceptor**

Eligibility requires factual **CONTROLLED_DEFEATED** state.

On selection:

1. commit Kakashi's lethal intent;
2. commit Masked Interceptor's **DEATH**;
3. record deterministic-kill provenance;
4. then play the approved lethal-action animation;
5. return to the Sakura-tree aftermath;
6. recalculate pursuit state.

The kill is **not** resolver-contested.

Do not downgrade this choice into `ATTEMPT TO KILL`.

## Confirmed Kill Aftermath

Petals drift across the stone.

Masked Interceptor remains where she fell.

Her weapon rests a short distance from her hand.

Kakashi straightens.

The kunai stays in his grip for another moment.

Then he lowers it.

His eye returns to the road.

### If pursuit remains

The others are still moving.

So is Kakashi.

### If pursuit has closed

The road ahead is empty.

Whatever chance remained to recover the package is gone.

Kakashi puts the kunai away.

There is only one place left to go.

## System / Resolver — Aftermath

Commit:

- Masked Interceptor: **DEAD**
- lethal class: **DETERMINISTIC KILL**
- Kakashi lethal intent: **COMMITTED**
- confirmed kill count: +1
- exact Battle turn count retained
- exact package custody retained
- exact PS / AMT pursuit state reevaluated rather than assumed.

For the required benchmark, MI Battle victory in **1–4 turns** followed by deterministic MI kill must preserve a legitimate **Package Smuggler pursuit**.

If pursuit remains, Objective stays:

**Retrieve the package.**

If pursuit has closed, switch to:

**Report to ANBU.**

## Choices

If pursuit remains, generate only currently legal pursuit choices from committed state.

If pursuit does not remain:

None.
