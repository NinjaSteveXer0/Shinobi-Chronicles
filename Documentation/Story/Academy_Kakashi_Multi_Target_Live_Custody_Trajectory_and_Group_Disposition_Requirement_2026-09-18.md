# Academy Kakashi Origin — Multi-Target Live Custody Trajectory and Group Disposition Requirement

> **2026-09-19 SUPERSESSION NOTICE**  
> The older `CONTROLLED_DEFEATED` / `DEFEATED_BUT_NOT_CONTROLLED -> ATTEMPT TO RESTRAIN` gating language in this requirement has been superseded by the global post-Battle disposition authority and CE #244 closure.  
> Current rule: valid Battle victory may expose direct **RESTRAIN ... AND CONTINUE** where the actor has a legitimate restraint-capable Skill/tool/item; selecting it commits successful field restraint, then the #244 post-restraint lifecycle applies. No pre-existing-control requirement remains.

**Date:** 2026-09-18  
**Owner:** Stephen / Writing — Konoha; reusable semantics require CE / Codex / Coordination reconciliation  
**Status:** **STEPHEN-APPROVED STORY REQUIREMENT — REUSABLE CUSTODY SEMANTICS PENDING CE RECONCILIATION**

## Purpose

Stephen approved a nonlethal multi-target trajectory parallel to the already-authorised multi-target lethal trajectory.

Kakashi must be able, where Battle/resolver state legitimately permits, to secure multiple defeated participants alive while continuing the mission and later transfer the surviving captured group to either:

- ANBU; or
- the Uchiha Police Force.

This is not permission to magically carry several prisoners through active pursuits. The runtime must distinguish immediate physical control, field-secured custody pending collection, final escort, and institutional transfer.

## 1. Preserve the existing immediate-custody choices

The already-authored immediate choices remain valid and distinct:

- **TAKE HER BACK TO ANBU**
- **TAKE HER TO THE UCHIHA POLICE FORCE**

Selecting one of these means Kakashi leaves the pursuit trajectory and delivers that participant immediately.

If an eligible pursuit window still existed, that pursuit closes because Kakashi chose immediate transfer.

These choices must not be silently repurposed into multi-target capture actions.

## 2. Add a separate continue-mission custody semantic

When a defeated participant is legitimately under Kakashi's control, Story must be able to offer a distinct semantic action equivalent to:

**RESTRAIN AND CONTINUE**

Meaning:

- Kakashi secures the participant alive;
- the participant is not yet delivered to ANBU or Police;
- the participant enters a field-secured custody state at the current authored location;
- Kakashi may continue a still-eligible pursuit;
- the participant remains part of Chronicle history and may later be collected for final escort.

Exact player-facing wording may be character/target specific.

If the participant is `CONTROLLED_DEFEATED`, field securing may be deterministic where current capability/state makes that legitimate.

If the participant is `DEFEATED_BUT_NOT_CONTROLLED`, the corresponding action must be resolver-owned, equivalent to:

**ATTEMPT TO RESTRAIN AND CONTINUE**

The resolver may commit legitimate results such as secured, resisted, escaped, interrupted, or another authorised state.

Do not infer successful custody from the button label.

## 3. Required custody dimensions

Do not collapse these dimensions:

- Battle result;
- alive/dead state;
- current control state;
- field-secured state;
- current physical escort state;
- institutional custody holder;
- participant location;
- ability to escape/resist;
- package custody;
- pursuit eligibility;
- Kakashi Knowledge;
- lethal-intent history.

A participant can therefore be:

- alive;
- Battle-defeated;
- field-secured by Kakashi;
- not physically beside Kakashi at the current moment;
- not yet in ANBU custody;
- not yet in Uchiha Police custody.

Exact runtime enum/API naming is CE/Coding-owned. Story requires the semantic distinction.

## 4. Field-secured continuity

Field-secured custody is not teleportation and is not a UI-only flag.

The participant is physically secured at an authored location pending later collection.

At material time/state transitions, the runtime may evaluate legitimate continuity consequences from committed state, including:

- remains securely restrained;
- escapes;
- is freed/intervened upon;
- is recovered/transferred by another authorised actor;
- another explicitly authorised result.

Such evaluation must:

- be resolver/state-owned;
- persist/idempotently commit;
- not reroll on refresh/save-load;
- preserve actor-relative Knowledge;
- not fabricate rescue/escape merely to simplify the route.

There must be a legitimate path where all qualifying captives remain secured long enough for the three-capture benchmark to complete.

## 5. STOP THE ASSASSIN three-capture benchmark

Consumes the corrected STOP THE ASSASSIN timing authority:

`MI victory in 1–4`
-> immediate PS vs AMT pursuit fork.

Required live-custody benchmark:

`Kakashi defeats Masked Interceptor in 1–4`
-> `RESTRAIN MI AND CONTINUE`
-> choose **GO AFTER PACKAGE SMUGGLER**
-> reach / fight Package Smuggler
-> defeat Package Smuggler within the qualifying **1–3** window
-> `RESTRAIN PS AND CONTINUE`
-> ANBU Marked Target remains reachable
-> reach ANBU Marked Target
-> Pakkun becomes present under existing authority
-> defeat / control ANBU Marked Target
-> secure ANBU Marked Target alive
-> collect any still-secured earlier captives
-> final group disposition:
   - **TAKE THEM ALL BACK TO ANBU**
   - **TAKE THEM ALL TO THE UCHIHA POLICE FORCE**

This is a benchmark of legitimate possibility, not a guarantee that every resolver sequence keeps all three captives.

## 6. Direct AMT fork remains exclusive

On a qualifying post-MI 1–4 state:

`RESTRAIN MI AND CONTINUE`
-> choose **GO AFTER ANBU MARKED TARGET**

commits to the AMT pursuit.

Package Smuggler pursuit closes.

The existence of a live secured MI does not reopen PS later.

## 7. Package Smuggler continuation

If Kakashi reaches and defeats Package Smuggler, the post-Battle state must classify PS independently.

Where custody is legitimate:

- immediate transfer may still be offered if authored;
- `RESTRAIN PS AND CONTINUE` may preserve AMT pursuit only where the existing **1–3 PS Battle timing** and current state keep AMT reachable.

Where PS is defeated-but-not-controlled, restraint remains resolver-owned.

Do not use capture as a free action that bypasses current Story/Battle state.

## 8. ANBU Marked Target and Pakkun

Whenever Kakashi legitimately reaches ANBU Marked Target, Pakkun remains mandatory under current authority.

If the route reaches a final live-capture state:

- Pakkun remains present through the connected custody/collection/escort sequence until an explicit departure commits;
- Pakkun is an autonomous participant, not a player-controlled pack mule;
- his presence may legitimately help make a multi-prisoner escort physically credible where his own due action permits, but Story does not automatically command him to do so.

The exact physical collection/escort choreography is authored after reusable custody semantics are reconciled.

## 9. Final group disposition

When Kakashi has two or more living captives still legitimately secured/escorted, the final disposition may operate on the accumulated captive set rather than forcing one bespoke branch per permutation.

Authorised high-level intents:

- transfer all currently secured captives to ANBU;
- transfer all currently secured captives to Uchiha Police Force.

For the full three-capture benchmark, player-facing wording may be:

- **TAKE THEM ALL BACK TO ANBU**
- **TAKE THEM ALL TO THE UCHIHA POLICE FORCE**

Institutional transfer must commit each participant separately.

Example:

- MI -> Uchiha Police custody;
- PS -> Uchiha Police custody;
- AMT -> Uchiha Police custody.

Do not replace exact target states with only `captives = 3`.

## 10. Mixed lethal / custody trajectories

The group-disposition architecture must coexist with the lethal trajectory ledger.

Examples legitimately supported by the same state model include:

- MI captured / PS captured / AMT captured;
- MI dead / PS captured / AMT captured;
- MI escaped / PS dead / AMT captured;
- MI captured / PS escaped / AMT dead;
- any other factually reachable combination.

Do not hard-code a flat ending per permutation.

Ending evaluation / Chronicle Receipt reads:

- exact participant identities;
- exact lethal intent/results;
- exact custody results;
- package custody;
- pursuit history;
- Pakkun history;
- Kakashi Knowledge;
- institutional transfer destination.

## 11. Timing rule

The three-capture route must not be made impossible by an invented hidden custody penalty.

Battle timing and authored pursuit windows remain meaningful.

A legitimate deterministic secure action against an already-controlled defeated participant must not receive an arbitrary extra time tax solely to prevent continuation.

Resolver-owned restraint against a participant who is not controlled may legitimately consume time / fail / close pursuit according to the owning resolver.

## 12. Chronicle / receipt

The final Origin history must distinguish:

- defeated;
- killed;
- failed lethal attempt;
- field-secured;
- escaped from restraint;
- captured and later collected;
- transferred to ANBU;
- transferred to Uchiha Police Force.

`0 kills / 3 captures` is not the same history as:

- `0 kills / 3 failed lethal attempts`;
- `0 kills / 3 deliberate releases`;
- `0 kills / 3 Battle victories with no custody`.

## 13. Production order

Writing production order remains:

1. finish exact immediate **TAKE HER BACK TO ANBU** branch;
2. finish exact immediate **TAKE HER TO THE UCHIHA POLICE FORCE** branch;
3. reconcile reusable `field-secured / restrain-and-continue` semantics with CE;
4. author exact MI **RESTRAIN AND CONTINUE** Scene 06 branch;
5. author PS post-Battle custody continuation;
6. author final accumulated-captive ANBU / Police group disposition;
7. then send one coherent implementation tranche to Coding.

## Final lock

> **Immediate transfer and restrain-and-continue are different protagonist intents.**
>
> **Captured != delivered.**
>
> **Field-secured != physically escorted beside Kakashi.**
>
> **Institutional destination remains a separate fact.**
>
> **The Origin must support a legitimate all-three-live-capture trajectory when the Battles, pursuit windows, restraint results and participant continuity keep it possible.**
