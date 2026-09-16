# Shinobi Chronicles — Post-Battle Control-State Classification and AK_SA_025 Resolver Addendum

**Date:** 2026-09-16  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CE RUNTIME SEMANTIC ADDENDUM — ISSUE #213 CLOSED; CODING MAY CONSUME**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

GitHub issue #213 exposed one precise ambiguity at the Academy Kakashi `AK_SA_025` boundary:

`GO FOR THE PACKAGE`
→ exact 2-v-1 Battle
→ Battle victory returns both opposition participants as `defeated`, with `lifeState = unresolved` and `custodyState = unresolved`
→ Story must classify each participant independently before later affordances derive.

Current Combat authority intentionally does **not** infer death, custody, package transfer or Story success from Battle victory. That boundary is correct and remains unchanged.

This addendum closes only the missing reusable classification rule. It does not create a second Battle resolver, custody store, Story engine or random eligibility system.

## 2. Ownership ruling

**Combat does not need to manufacture a new `controlled` fact merely because a participant was defeated.**

Combat owns the factual Battle result it actually resolved, including Battle status, escape if Combat actually resolved an escape, action history and any exact Combat-owned state.

**Story / CE owns post-resolution classification as a deterministic derivation over already committed factual state.**

The classification does not create new custody, death, escape or restraint facts. It references the committed facts that justify the class.

Canonical rule:

> **classification reads facts; classification does not invent facts.**

## 3. Deterministic classification precedence

For each materially relevant participant after a resolver/Battle return, evaluate independently in this order.

### A. `DEAD`

Use only when an authoritative committed death fact already exists for that participant.

Battle defeat alone never satisfies this predicate.

### B. `ESCAPED_UNAVAILABLE`

Use only when an authoritative committed escape / unreachable / removed-from-current-actionability fact already exists.

Battle defeat alone never satisfies this predicate.

### C. `CONTROLLED_DEFEATED`

Use only when all of the following are true:

1. the participant is factually defeated/incapable of ordinary Battle continuation; and
2. at least one authoritative committed **secure-control basis** exists that makes immediate protagonist/allied disposition reliable.

Valid secure-control bases may include an exact owner-authorised fact equivalent to:

- committed participant custody;
- committed surrender under reliable control;
- committed restraint/containment that survives the Battle boundary and is sufficient for disposition;
- another exact owner-authorised control fact.

`CONTROLLED_DEFEATED` is therefore a **derived classification from a control fact**. It is not itself the custody transaction and must not be used to back-create one.

### D. `DEFEATED_BUT_NOT_CONTROLLED`

Use when:

1. the participant is factually defeated/incapable of ordinary Battle continuation; and
2. no committed death fact exists; and
3. no committed escape/unavailability fact exists; and
4. no committed secure-control basis exists.

This is the required deterministic fallback for a defeated participant whose life/custody/control state is otherwise unresolved.

It does **not** mean the participant instantly escapes, acts, is free, is captured, survives permanently, or becomes non-actionable forever. It means only that guaranteed disposition has not been established.

### E. `UNRESOLVED`

Use only when the underlying resolver/Battle result is itself not yet complete enough to establish even the participant's defeated/available status.

Do not use `UNRESOLVED` merely because custody/death is unresolved after a completed defeat; that exact state is `DEFEATED_BUT_NOT_CONTROLLED` unless another committed fact selects a stronger class above.

## 4. Participant autonomy remains separate from classification

A post-resolution class does not automatically create an immediate autonomy action window.

Preserve:

- participant present != autonomy due;
- `DEFEATED_BUT_NOT_CONTROLLED` != automatic escape attempt;
- `CONTROLLED_DEFEATED` != automatic custody grant;
- classification != participant action;
- participant autonomy resolves only when the current Story/CE state says a due window exists.

This is necessary to preserve authored protagonist reaction windows and exact continuation ordering.

## 5. AK_SA_025 exact ruling

Current authoritative Combat return for the prepared `GO FOR THE PACKAGE` 2-v-1 gives, for Package Smuggler and Masked Interceptor on player-side victory:

- `battleStatus = defeated`;
- `lifeState = unresolved`;
- `custodyState = unresolved`;
- no committed participant death;
- no committed participant custody;
- no committed escape/unavailability;
- no independent committed secure-control fact.

Therefore the immediate post-Battle classification is deterministically:

- Package Smuggler → `DEFEATED_BUT_NOT_CONTROLLED`;
- Masked Interceptor → `DEFEATED_BUT_NOT_CONTROLLED`.

This is not a random choice and does not require Combat to invent another predicate.

Separately, current Writing authority for `AK_SA_025` fixes the package result on this exact victory:

- package custody → Kakashi.

That package transaction is Story-owned factual continuation and remains independent from participant custody.

Therefore the minimum factual continuation is:

`34300 Battle victory receipt`
→ commit `package holder = Kakashi` through existing Story factual authority
→ classify PS independently as `DEFEATED_BUT_NOT_CONTROLLED`
→ classify MI independently as `DEFEATED_BUT_NOT_CONTROLLED`
→ persist provenance to the Battle occurrence + package-custody occurrence
→ drain only autonomy windows that are actually due
→ derive the protected immediate Kakashi continuation authorised by `AK_SA_025`.

## 6. Clean AMT pursuit / optional-action boundary

`DEFEATED_BUT_NOT_CONTROLLED` does not itself steal Kakashi's authored immediate continuation.

For `AK_SA_025`, Writing already authorises the immediate protagonist continuation that preserves clean pursuit of the ANBU Marked Target.

Unless a separate committed fact creates a due participant-autonomy window before that continuation, Coding must not inject one solely from the classification label.

If Kakashi instead commits an optional material action against PS or MI, that action resolves through its exact owner, state updates, due autonomy is reevaluated, and later affordances derive from the new committed state.

A deterministic `KILL` is legal only if the target later has a committed `CONTROLLED_DEFEATED`-equivalent basis or another exact deterministic-kill predicate. A merely `DEFEATED_BUT_NOT_CONTROLLED` target may only receive resolver-determined lethal intent where current authority permits it.

## 7. Implementation shape

Coding should reuse the existing Kakashi factual stack (`34120 / 34600 / 34700 / 34410`) and the existing Chronicle occurrence/history authority.

Equivalent implementation is sufficient if it preserves:

- one stable post-resolution classification per participant per relevant factual state;
- exact source refs supporting the class;
- independent classification for each participant;
- save/load/idempotent replay;
- reclassification only after a newly committed fact changes the predicates;
- package custody stored separately from participant custody;
- no second custody/Knowledge/Story database;
- no UI inference;
- no random eligibility.

Suggested receipt semantics, names implementation-owned:

```text
postResolutionClassificationReceiptId
storyOccurrenceId
battleOccurrenceId
participantRef
battleStatusRef
classification
classificationBasisRefs[]
packageCustodyRef?        // only when materially relevant; not participant custody
supersedesClassificationReceiptId?
idempotenceKey
```

## 8. Required #188 proof

For the exact `AK_SA_025` path, prove:

1. exact 2-v-1 Battle victory returns factual defeated statuses;
2. no Battle-owned death/custody/package Story result is invented;
3. Story commits package custody to Kakashi exactly once;
4. PS and MI classify independently;
5. with current factual inputs both classify `DEFEATED_BUT_NOT_CONTROLLED`;
6. reload/retry does not reroll the classifications or duplicate package transfer;
7. classification alone does not auto-escape, auto-capture or auto-act either participant;
8. immediate authorised AMT pursuit continuation remains available;
9. a later committed control/escape/death fact may lawfully supersede the classification;
10. #188/#141 source/integration proof remains separate from installed-browser/Golden proof.

## 9. Reusable rule

This ruling generalises beyond Kakashi:

> **After Battle, `defeated + no death + no escape + no secure-control fact` = `DEFEATED_BUT_NOT_CONTROLLED`.**
>
> **`CONTROLLED_DEFEATED` requires an independent committed secure-control basis.**
>
> **Neither classification creates custody, death, escape or an autonomy action by itself.**

This is consistent with the existing CE lethal-trajectory contract and current Combat result firewall.

## 10. Closure

Issue #213 is semantically closed by this addendum.

No Combat schema change is required merely to make `AK_SA_025` classifiable.

Coding may now implement the exact `AK_SA_025` continuation inside #188 using current factual owners, then release `GO FOR THE PACKAGE` only after the whole continuation is source/integration proven and production delivery/cache identity is advanced.

Browser/Golden remains separate and unclaimed.
