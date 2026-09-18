# Academy Kakashi Origin — Scene 06A-W2C-I: Lethal Attempt Interrupted — Verbatim Lock

**Date:** 2026-09-18  
**Owner:** Stephen / Writing — Konoha  
**Status:** **STEPHEN-APPROVED / LOCKED VERBATIM — DO NOT CHANGE**

**Source branch:** `SCENE_05A_W / CHOICE_01 / BRANCH_C — ATTEMPT TO KILL HER`  
**Entry condition:** `STOP THE ASSASSIN -> Kakashi Victory -> turn 4+ -> ATTEMPT TO KILL HER -> LETHAL_ATTEMPT_INTERRUPTED`.

This file is the exact player-facing and resolver-return authority for the INTERRUPTED result. It extends the common Scene 06 lethal-intent setup and does not alter the already-locked KILLED continuation.

The common pre-resolution Scene 06 narration ends:

> Kakashi lowers his centre of gravity.
>
> Then disappears from where he was standing.

## Backdrop
`fight_at_sakura_tree.png`

## Objective
**Retrieve the package.**

## Narration
Kakashi moves.

Masked Interceptor braces—

Then light spills across the far end of the street.

Voices.

A Konoha patrol is turning into the junction.

Kakashi’s kunai stops short.

Masked Interceptor sees the hesitation.

That is all she needs.

She kicks loose a broken piece of stone beneath her heel.

It strikes the ground between them.

Dust bursts upward.

Kakashi moves through it immediately.

But the moment is already gone.

Masked Interceptor clears the wall and disappears onto the rooftops beyond.

The patrol voices grow closer.

Kakashi remains beneath the Sakura tree.

Kunai still in hand.

The strike never landed.

Not because he changed his mind.

Because the opportunity was taken away from him.

He puts the kunai away before the patrol reaches the street.

## Dialogue
None.

## System / Resolver
Resolved outcome:

**`LETHAL_ATTEMPT_INTERRUPTED`**

Commit:

- Kakashi lethal intent: **COMMITTED**
- Kakashi attempted to kill Masked Interceptor.
- The lethal action was **INTERRUPTED before completion**.
- No death occurred.
- This is **not** a voluntary spare / mercy outcome.
- Masked Interceptor legitimately perceives Kakashi’s lethal intent.
- The approaching Konoha patrol interrupts the immediate lethal-action window.
- Masked Interceptor uses the interruption as her due autonomy opportunity to withdraw.
- The patrol does **not** learn the hidden operation merely by entering the area.
- Package Smuggler remains escaped with package.
- ANBU Marked Target remains escaped.
- Old pursuit routes do not reopen.
- No Pakkun.

## Coding Presentation Note — Konoha Patrol Entry
Stephen has approved **two Konoha Patrol card visuals** for this interruption beat.

When the patrol enters the scene:
- use the two approved Konoha Patrol cards to make the interruption physically visible;
- the cards represent the approaching patrol presence;
- do not infer named persistent identities, hidden-operation Knowledge, or extra Story facts from the card art alone;
- patrol presence is the interruption cause; Masked Interceptor's escape remains her subsequent autonomy action.

The approved card binaries were supplied by Stephen in the Writing workspace on 2026-09-18 and require repository asset placement/path authority before runtime references are hard-coded.

## Shinobi Record
**SHINOBI RECORD UPDATED**

Kakashi tried to kill Masked Interceptor.

Something stopped him.

**She will remember that.**

## Objective Switch
**Report to ANBU.**

## Choices
None.

## Transition
Kakashi leaves before the patrol reaches the Sakura tree.

**BLACK WIPE**

-> Outcome-specific ANBU Report Scene.
