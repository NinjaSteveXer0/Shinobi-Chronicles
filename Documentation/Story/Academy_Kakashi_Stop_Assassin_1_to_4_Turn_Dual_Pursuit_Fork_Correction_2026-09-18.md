# Academy Kakashi Origin — STOP THE ASSASSIN 1–4 Turn Dual-Pursuit Fork Correction

**Date:** 2026-09-18  
**Owner:** Stephen / Writing — Konoha  
**Status:** **STEPHEN-DIRECT STORY / CAUSAL CORRECTION — BINDING**

## Purpose

Stephen identified a causal/timing error in the current `STOP THE ASSASSIN` fast-win authority.

This correction supersedes the conflicting rule that a STOP THE ASSASSIN victory only preserves Package Smuggler pursuit within 1–3 turns and never exposes a direct ANBU Marked Target pursuit.

The exact Scene 05A-W player-facing rewrite remains a separate Writing step and must be approved before its narration/choice text is replaced.

## Correct STOP THE ASSASSIN timing gate

Route:

`WATCH THE EXCHANGE -> STOP THE ASSASSIN -> Kakashi vs Masked Interceptor`

Masked Interceptor remains a 1-v-1 PL Battle.

### Kakashi defeats Masked Interceptor within 1–4 turns

Both fleeing targets remain sufficiently reachable for an immediate pursuit choice:

- **GO AFTER PACKAGE SMUGGLER**
- **GO AFTER ANBU MARKED TARGET**

The existing post-Battle Masked Interceptor disposition family also remains available where the committed Battle-end state permits:

- **KILL HER** / **ATTEMPT TO KILL HER**
- **TAKE HER BACK TO ANBU**
- **TAKE HER TO THE UCHIHA POLICE FORCE**

The pursuit choice is a real fork. Kakashi cannot pursue both targets simultaneously.

### Kakashi defeats Masked Interceptor on turn 5 or later

The pursuit window has closed.

Neither Package Smuggler nor ANBU Marked Target remains available from the immediate post-MI return.

Only state-eligible Masked Interceptor disposition choices remain.

## Package Smuggler-first fork

If Kakashi selects:

**GO AFTER PACKAGE SMUGGLER**

then the Package Smuggler pursuit / Battle resolves first.

If Kakashi defeats Package Smuggler within **1–3 turns**, ANBU Marked Target may still be pursued afterward.

If the Package Smuggler Battle takes longer than that qualifying window, ANBU Marked Target is no longer reachable from that chain.

Where Kakashi legitimately reaches ANBU Marked Target afterward, existing Pakkun authority remains binding.

Canonical fast sequential trajectory:

`MI victory in 1–4`
-> `GO AFTER PACKAGE SMUGGLER`
-> `Package Smuggler Battle victory in 1–3`
-> `GO AFTER ANBU MARKED TARGET`
-> `Pakkun where existing predicates are satisfied`.

## ANBU Marked Target-first fork

If Kakashi selects:

**GO AFTER ANBU MARKED TARGET**

immediately after the qualifying 1–4 turn Masked Interceptor victory, that choice commits Kakashi to the ANBU Marked Target pursuit.

The Package Smuggler route closes.

Kakashi cannot later return to Package Smuggler from that branch.

Package Smuggler remains escaped with the package unless a separately authorised later event changes that fact.

Canonical direct-AMT fork:

`MI victory in 1–4`
-> `GO AFTER ANBU MARKED TARGET`
-> Package Smuggler pursuit **CLOSED**
-> no later return to Package Smuggler from this branch.

## Masked Interceptor disposition branches

Selecting a Masked Interceptor disposition instead of immediate pursuit is a committed branch choice.

Current production order is:

1. **TAKE HER BACK TO ANBU**
2. **TAKE HER TO THE UCHIHA POLICE FORCE**

These two post-Battle MI branches are to be authored before Coding is asked to implement the newly corrected downstream pursuit fork.

The already-authored lethal-intent family remains separate and retains its resolver distinctions.

## Mechanical distinction preserved

This correction does not collapse `STOP THE ASSASSIN` into `DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE`.

The distinction is now:

- **STOP THE ASSASSIN:** quick MI victory creates a **choice fork** between Package Smuggler and ANBU Marked Target.
- **DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE:** the authored route remains package-second by commitment; Package Smuggler is the next target, with ANBU Marked Target only becoming available later if the Package Smuggler resolution is fast enough.

## Explicit supersession

For `STOP THE ASSASSIN`, this document supersedes conflicting statements in:

- `Documentation/Story/Academy_Kakashi_Stop_Assassin_Quick_Win_Catch_Up_Correction_2026-09-18.md`
- `Documentation/Story/Academy_Kakashi_Origin_Scene_05A_W_Kakashi_Wins_Verbatim_Lock_2026-09-18.md`

Specifically superseded:

- the 1–3 turn MI threshold;
- the claim that turn 4 automatically closes pursuit;
- the Package-Smuggler-only fast-win pursuit rule;
- the prohibition on direct post-MI ANBU Marked Target pursuit.

Correct binding causal rule:

> **MI victory in 1–4 turns -> Package Smuggler and ANBU Marked Target are both immediate pursuit options.**
>
> **Choose Package Smuggler -> beat PS in 1–3 turns to preserve later AMT pursuit.**
>
> **Choose ANBU Marked Target immediately -> Package Smuggler route closes.**
>
> **MI victory on turn 5+ -> no immediate pursuit remains.**

## Production sequencing lock

Do not send the pursuit correction to Coding as an implementation request yet.

Writing first completes and Stephen approves:

- `TAKE HER BACK TO ANBU`
- `TAKE HER TO THE UCHIHA POLICE FORCE`

After those post-Battle MI branches are locked, Writing will rewrite Scene 05A-W exact player-facing authority around the corrected 1–4 dual-pursuit fork and then hand the coherent package to Coding.
