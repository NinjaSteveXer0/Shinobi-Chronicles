# Shinobi Chronicles — Neutral Story Factual Resolver Provider + Stable Outcome Selection Contract

**Date:** 2026-09-15  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CE RUNTIME ADDENDUM — DESIGN CLOSED; IMPLEMENTATION / BROWSER / GOLDEN SEPARATE**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

Issue #175 was correctly reopened after installed-browser Academy Kakashi evidence proved that the neutral Story Decision Realisation Core and final Kakashi adapter still lacked one production-critical layer: an actual factual producer for authorised **non-Battle** resolver bindings.

Current runtime already has:

- the neutral Story core (`34000`);
- the final Kakashi semantic adapter / 32-anchor inventory (`34100`);
- a safe stale-authority guard (`34200`);
- current Combat-owned Kakashi Battle deployment work (`34300` / #201 lane).

The remaining defect is not Story wording and not a second Story engine. It is this missing seam:

`player commits authorised non-Battle intent`
→ **factual non-Battle resolver provider**
→ `committed result receipt`
→ `Story/CE reevaluates changed state`
→ `next legitimate action / Battle / reaction / closure`
→ `Scene Board reprojects authority`.

This document closes that seam.

It extends:

- `Documentation/Coordination/Neutral Story Decision Realisation Runtime Contract 2026-09-14.md` @ `aa01e819183cb0a16ccca9f61dc8ca253c409022`;
- final Kakashi Writing closure @ `176ce76feef3e67d4c24644e3d7443a04dcf7d6b`;
- final Kakashi Structured Autonomy inventory @ `713cae26e3b3fb4a214564b497a5f30fb2f14313`;
- participant-first runtime ordering @ `06566ee81fe7c7856fd513d0225e621273f4bfaa`;
- lethal trajectory / ending evaluation @ `ad526965c24240d03bfdcd3ed4ed8e8c19b4426e`.

## 2. Ownership decision

The reusable provider is CE architecture, implemented by Coding / Runtime.

### CE owns

- the neutral factual-resolution request / receipt protocol;
- semantic eligibility-before-randomness ordering;
- stable outcome-selection semantics;
- idempotence / replay law;
- the rule that unknown capability maths or hidden thresholds may not be invented by Coding.

### Story / World / Combat / other domain owners own

- which factual outcomes are authorised for a binding;
- predicates that make a candidate outcome legal/illegal;
- any explicit deterministic precedence, capability contest, weight, threshold or Battle transition they author;
- the factual consequences their domain owns.

### Coding / Runtime owns

- production implementation;
- persistence;
- stable selection plumbing;
- adapter registrations from already-closed authority;
- diagnostics / browser proof.

For the current Academy Kakashi benchmark, the final Writing authorities already close the high-level outcome envelopes needed by the non-Battle bindings below. **No new Writing decision is required merely to make those authored choices actionable.**

Combat remains separate. Battle deployment/opposition is consumed through the current #201 / `34300` authority rather than reimplemented here.

## 3. Provider identity / API contract

Stable semantic provider ID:

`ce.neutral_story_factual_resolver.v1`

Coding must expose equivalent runtime capabilities to:

```text
registerStoryFactualResolverBinding(bindingRef, bindingSpec)
resolveStoryFactualAction(request)
getStoryFactualResolverReceipt(idempotenceKey)
```

Exact JavaScript packaging/file numbering is Coding-owned, but the semantic API is not optional.

Conceptual request:

```text
storyDecisionReceiptId
storyDecisionContextId
storyUnitRef
sceneRef / decisionPointRef
bindingRef
actorRef
intentCommitRef
committedStateRef
sourceOccurrenceRefs[]
authorityVersionRefs[]
capabilityContextRefs[]      // factual refs only; no invented hidden scalar
positionRefs[]
objectCustodyRefs[]
participantStateRefs[]
knowledgeRefs[]              // observer-safe factual input where applicable
attemptOrdinal
idempotenceKey
```

The provider receives **committed factual context**, not UI wording.

## 4. Binding specification

Each registered non-Battle binding must provide an authorised candidate set equivalent to:

```text
bindingRef
ownerRef
outcomes[]:
  outcomeRef
  eligibilityPredicateRefs[]
  resultPayloadTemplate
  consequenceRequestRefs[]
  successorSituationRef / successorRule
resolutionPolicy?            // explicit owner policy when one exists
```

A binding specification is a projection of durable authority. It may not invent a new Story outcome merely to avoid a disabled button.

## 5. Resolution order — binding

For every committed factual resolver request:

1. Validate the selected semantic intent was actually eligible at commit time.
2. Validate the current binding registration / authority version.
3. Build the candidate factual outcome set from the binding specification.
4. Apply committed-state predicates first.
5. Apply explicit owning-domain capability / World / timing predicates where they actually exist.
6. Remove impossible candidates.
7. Resolve selection using Section 6.
8. Persist the resolver receipt **before** downstream presentation or retry can cause a second selection.
9. Commit/request factual deltas only through their owning systems.
10. Return the same receipt to the neutral Story core.
11. Drain due participant-autonomy windows.
12. Derive the next legitimate protagonist affordance / Battle / reaction / closure.

Preserve permanently:

> **eligibility before randomness**

> **randomness among eligible possibilities != randomness deciding eligibility**

> **button label != factual result**

## 6. Deterministic / randomness authority

Coding must not invent a coin flip, Skill formula, hidden threshold or stat contest.

Selection law:

### A. Zero eligible outcomes

Fail closed as an exact authority/state contradiction.

Do not silently choose an outcome.

### B. Exactly one eligible outcome

Resolve deterministically to that outcome.

### C. More than one eligible outcome + owner-authored policy exists

Consume that policy exactly.

Examples may include an explicit deterministic precedence, authored capability contest, authored weights or another owner-defined resolver.

### D. More than one eligible outcome + NO more-specific owner policy exists

For **SC Alpha neutral Story factual resolution**, use a **stable occurrence-scoped draw among the already-eligible authorised outcomes**.

Default weighting is equal among those remaining authorised candidates unless a durable owner supplies weights.

This is the binding Alpha fallback. It is deliberately simpler and safer than Coding inventing unowned capability maths.

The draw must be stable from immutable provenance equivalent to:

```text
storyDecisionReceiptId
bindingRef
attemptOrdinal
authorityVersionRefs[]
continuityLineageRef
```

The implementation hash/PRNG is Coding-owned, but the result must satisfy:

- UI reopen does not reroll;
- save/load does not reroll;
- browser refresh does not reroll;
- retry after transport/message failure does not reroll;
- presentation refresh does not reroll;
- the same idempotence key returns the same committed receipt;
- a genuinely new causal attempt may only draw again if Story/runtime legitimately creates a new attempt occurrence / new `attemptOrdinal`.

This fallback is **not** a universal permanent Skill-check formula. Later domain authority may replace a binding's fallback selection with a more specific deterministic/capability policy without changing the neutral provider contract.

## 7. Factual resolver receipt

The provider must persist an equivalent receipt:

```text
storyFactualResolverReceiptId
providerId = ce.neutral_story_factual_resolver.v1
storyDecisionReceiptId
bindingRef
actorRef
intentCommitRef
attemptOrdinal
idempotenceKey
authorityVersionRefs[]
inputStateRefs[]
eligibleOutcomeRefs[]
resolutionMode            // deterministic_single | owner_policy | stable_draw
selectedOutcomeRef
resolverPolicyRef?
selectionProvenanceRef?   // developer provenance only; not player-facing truth
result
consequenceRefs[]
stateDeltaRefs[]
knowledgeDeltaRefs[]
relationshipHistoryRefs[]
objectiveDeltaRefs[]
objectCustodyDeltaRefs[]
participantStateDeltaRefs[]
successorSituationRef?
committedAtOccurrenceRef
```

The receipt is provenance and orchestration evidence. It is not a second World/Chronicle owner.

## 8. Academy Kakashi — current non-Battle binding map

The following final-authorised choices remain **player-actionable even where outcome is uncertain**. Uncertainty is resolved after intent commit; it is not represented as a permanently disabled button.

### `academy_kakashi.resolver.get_closer`

Authorised outcome families:

- `GET_CLOSER_SUCCESS` — concealment preserved; improved position; fuller contingency-conversation Knowledge; next decision family = `LET THE HANDOFF HAPPEN / STRIKE BEFORE THE HANDOFF / ATTEMPT THE PICKPOCKET`;
- `GET_CLOSER_FAILURE` — approach detected; handoff aborted; AMT retains package and moves away; Package Smuggler remains behind/pressuring; Masked Interceptor unseen; next decision family = `STAY ON THE PACKAGE / STOP PACKAGE SMUGGLER / CUT THEM OFF AT THE SAKURA TREE`.

No owner-authored success percentage or stat threshold is currently required by final Writing. Therefore, after factual eligibility, the Alpha stable-draw rule applies unless newer authority supplies a more-specific policy.

### `academy_kakashi.resolver.pickpocket_direct`

Authorised outcome families:

- `PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION` — Kakashi gets package; completed undetected withdrawal; no MI; no Battle; no Pakkun;
- `PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1` — clean extraction fails; MI becomes visibly present under this branch-specific exception; exact 3-v-1 Battle caller consumes current Combat authority; no Pakkun at original exchange.

No label-derived custody inference is allowed.

### `academy_kakashi.resolver.pickpocket_improved`

Authorised outcome families:

- `PICKPOCKET_IMPROVED_SUCCESS_CLEAN_EXTRACTION` — package to Kakashi; clean withdrawal; retained Get-Closer-success Knowledge; MI unseen; no Battle; no Pakkun;
- `PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1` — AMT + Package Smuggler react; MI remains unseen; exact 2-v-1 Battle caller consumes current Combat authority; absent separately committed change, AMT remains package holder at Battle entry.

### `academy_kakashi.resolver.attack`

Consume the current Direct Attack state-return matrix. High-level candidate factual classes are:

- `ATTACK_RETURN_PACKAGE_KAKASHI`;
- `ATTACK_RETURN_PACKAGE_AMT`;
- `ATTACK_RETURN_PACKAGE_SMUGGLER`;
- `ATTACK_RETURN_PACKAGE_NEUTRAL_CONTESTED`;
- `ATTACK_RETURN_IMMEDIATE_BATTLE` where the exact current participant composition has a legal Combat deployment.

All candidates preserve the authored invariant that the intended clean handoff is interrupted/prevented.

Masked Interceptor does not appear merely because `ATTACK` was selected.

### `academy_kakashi.resolver.strike_before_handoff`

Consume the same Direct Attack state-return matrix, but from the committed improved-position / improved-Knowledge state produced by successful `GET CLOSER`.

Masked Interceptor remains unseen unless a later separate eligibility event makes her visible.

### `academy_kakashi.resolver.stay_on_package_pursuit`

Authorised outcome families:

- `PURSUIT_SUCCESS_AMT_REACHED` — downstream AMT interception legitimately reached; Pakkun present under the existing continuity predicate;
- `PURSUIT_FAILURE_AMT_ESCAPES_WITH_PACKAGE` — AMT escapes with package; no downstream Pakkun appearance on that timeline.

Consume explicit authored timing/state predicates first. Only if more than one factual family remains eligible without a more-specific owner policy does the stable-draw fallback apply.

### `academy_kakashi.resolver.secure_package_before_assassin`

Consume the exact current Writing state-return envelope for that decision. This provider owns selection/provenance only; it may not convert the wording into automatic package custody or automatic Battle.

Where the current committed state leaves multiple Writing-authorised factual returns and no owner-specific policy distinguishes them, use the stable-draw fallback after semantic eligibility.

### `academy_kakashi.resolver.pursue_original_target`

Consume current pursuit / reachability / timing / participant-state authority.

Pakkun appears only on legitimate downstream AMT reach. `PURSUE` does not mean successful reach/capture by implication.

Where exact committed timing/state collapses the candidate set to one outcome, resolve deterministically. Otherwise apply owner policy or stable draw as above.

## 9. Nonlethal disposition bindings

Current nonlethal disposition choices are **state-gated deterministic transitions**, not random rolls, once their eligibility predicate is satisfied.

Examples:

- `academy_kakashi.resolver.disposition_police` — commits the authorised alive/custody transfer to Police where that choice is currently legal;
- `academy_kakashi.resolver.disposition_release` — commits release / loss of Kakashi custody while preserving alive state and exact history;
- `academy_kakashi.resolver.disposition_return_anbu` — commits alive/custody transfer to originating ANBU authority where legal.

If the participant is not currently in the required control/availability state, the choice must be excluded before presentation rather than clicked and then randomly rejected.

Deterministic `KILL` remains governed by existing lethal authority and is not converted into this neutral stable draw.

## 10. Player-actionability rule

If final Story/domain authority says an intent is currently legitimate, uncertain factual outcome does **not** justify disabling the button merely because success is not known in advance.

Canonical rule:

> **Eligibility answers whether the player may try. The resolver answers what happens.**

Therefore the current final-authored Kakashi intents such as `GET CLOSER`, `ATTACK`, and `ATTEMPT PICKPOCKET` remain actionable when their intent eligibility is true even though the provider has not yet selected the factual result.

A disabled choice is appropriate only when:

- the intent itself is not currently legal;
- a required exact owner/provider truly does not exist after this contract;
- an exact downstream Battle composition remains unowned;
- or current committed state invalidates the intent.

## 11. Save/load/retry/idempotence

Required sequence:

`intent commits`
→ `resolver request/idempotence key persists`
→ `selected factual outcome receipt persists`
→ `owning consequence/state requests commit`
→ `Story continuation derives`.

If delivery, UI, browser or chat transport fails after the resolver receipt is durable, retry must recover and return the same receipt.

If consequence commit partially completes, recovery must use source-occurrence/idempotence provenance to finish or replay safely rather than issue a new factual draw.

No duplicate:

- package custody;
- participant state;
- Knowledge;
- relationship/history;
- reward/development evidence;
- Battle launch;
- death;
- Chronicle Receipt fact.

## 12. Battle boundary

This provider does not resolve Combat-owned facts.

A selected factual outcome may return `successorSituationRef = battle_transition` only where a currently authorised exact Battle config exists.

Combat then owns:

- participants/sides;
- action legality;
- turn/action economy;
- Battle result;
- defeat;
- turn-count receipt.

Story resumes from the Battle result and independently classifies custody/death/pursuit/continuation under current authority.

Preserve:

> **Battle victory != Story success**

> **Battle victory != package custody**

> **Battle victory != death**

## 13. Acceptance / diagnostics

Coding implementation must prove at minimum:

1. final-authorised uncertain Kakashi intents render actionable when intent eligibility is true;
2. intent commits before factual selection;
3. zero/one/multiple candidate rules behave exactly as Sections 5–6;
4. same idempotence key replays the same result across save/load/refresh/retry;
5. no UI reroll;
6. direct Pickpocket success/failure preserve exact MI/Pakkun/Battle distinctions;
7. improved Pickpocket failure remains 2-v-1 with MI unseen;
8. Get Closer success/failure preserve their distinct Knowledge/position/next-choice families;
9. Direct Attack / Strike Before Handoff consume the state-return matrix rather than label inference;
10. nonlethal dispositions are deterministic after state eligibility;
11. Battle handoff uses current Combat configs and exact same-Story return;
12. participant-first autonomy runs before the next protagonist choice where due;
13. #121 Mission behavior remains unchanged;
14. `browserGoldenClaimed=false` until Stephen approves installed-browser behavior.

## 14. Closure statement

The reopened #175 gap is design-closed by this addendum.

There is now an explicit owner and provider contract for non-Battle Story factual resolution:

> **CE defines neutral selection/provenance semantics. Final Story/domain authority supplies legitimate result envelopes. Coding implements the provider and persistence.**

For SC Alpha, when multiple already-authorised factual outcomes remain possible and no more-specific owner rule exists, the provider uses a **stable, idempotent occurrence-scoped draw among eligible outcomes** rather than disabling the player choice or inventing an unowned Skill/stat formula.

This does not claim implementation, browser validation or Golden GREEN.
