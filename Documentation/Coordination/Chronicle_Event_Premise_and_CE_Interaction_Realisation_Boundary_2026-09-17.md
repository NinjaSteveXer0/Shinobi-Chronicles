# Shinobi Chronicles — Chronicle Event Premise and CE Interaction Realisation Boundary

**Date:** 2026-09-17  
**Owner:** CE / Codex / Coordination, consuming World / Missions / Events / Rewards authority  
**Status:** **STEPHEN-APPROVED DESIGN DIRECTION — DURABLE BOUNDARY; IMPLEMENTATION / RUNTIME VALIDATION PENDING**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

This document closes the ownership boundary for dynamically realised hotspot / World-event presentation.

Canonical shorthand:

> **World authors what is happening. CE fills in how that legitimate occurrence is presented to this Chronicle.**

CE does **not** manufacture the factual premise merely because it owns the interaction realisation layer.

This extends rather than replaces:

- `Documentation/World/Capability_Responsive_Chronicle_Event_Ecology_v3_Consolidated_Lock_2026-09-10.md`;
- `Documentation/Coordination/Mission Skeleton Driven CE Choice Generation Runtime Contract 2026-09-11.md`;
- the existing Chronicle Interaction Scene Board presentation contract.

## 2. Event premise manufacturing

**World / Missions / Events / Rewards owns the authored event premise and event-family truth.**

For a hotspot/event family, World defines the factual envelope required for a legitimate occurrence, including where relevant:

- event family / chain identity;
- factual situation or pressure;
- location / host requirements;
- participant-role requirements;
- object / evidence / package requirements;
- exact eligibility predicates;
- recurrence / expiry / suppression / transformation rules;
- factual World state that exists before player interaction;
- observer Knowledge / discovery / actionability boundaries;
- permitted semantic intent families;
- resolver seams;
- factual outcome envelopes and non-action consequences;
- contextual reward/consequence envelope where separately authorised.

Example authored premise:

```text
EVENT FAMILY: injured_courier

Factual situation:
- courier is injured;
- courier carries a sealed message;
- courier requires assistance or must continue unaided;

Observer-safe starting Knowledge:
- protagonist can perceive the injury;
- protagonist can perceive the sealed message;
- protagonist does not know the recipient merely from seeing it.

Potential intent families:
- HELP
- QUESTION
- INSPECT
- LEAVE

Resolver seams:
- Medical / treatment resolution;
- Investigation / Knowledge resolution;
- Relationship / disposition resolution;
- Battle only if a separate legitimate factual occurrence or participant action creates it.
```

The statement `courier is injured` exists because World authored that event family / committed occurrence state. CE does not infer or invent the injury in order to make the scene interesting.

## 3. Occurrence creation

An **event definition** is not yet a historical event.

Runtime / World selection first determines that a candidate is semantically eligible from current committed Chronicle and World state.

Only then may a concrete **occurrence instance** be committed with stable identity and factual state.

Conceptually:

```text
authored event family
-> semantic eligibility
-> legitimate selection
-> committed occurrence instance
-> CE interaction realisation
```

A committed occurrence should carry or reference enough exact authority for CE to know what it is allowed to present, conceptually including:

```text
{
  occurrenceId,
  eventFamilyId,
  hostRef,
  participantRefs[],
  objectRefs[],
  factualState,
  observerKnowledgeState,
  permittedIntentFamilies[],
  resolverBindings[],
  causalSourceRefs[]
}
```

## 4. CE interaction realisation

Once the occurrence exists, CE may realise the player-facing Chronicle Interaction from the occurrence plus the actual observer/participant context.

Conceptual reusable entry point:

```text
openChronicleOccurrence(occurrenceId)
```

which consumes something equivalent to:

```text
realiseChronicleInteraction({
    occurrence,
    observer,
    participants,
    location,
    knowledge,
    relationships,
    capabilities,
    history,
    currentState
})
```

CE may then produce the Scene Board presentation payload:

```text
{
    backdropRef,
    visibleParticipants[],
    narration[],
    dialogue[],
    choices[]
}
```

The presentation may legitimately vary by Chronicle context.

Examples:

- a Medical-capable protagonist may receive a treatment-specific observation/choice;
- a protagonist who knows the courier may receive different dialogue;
- a participant with relevant faction Knowledge may recognise an observer-safe symbol legitimately visible to them;
- relationship history may alter tone or willingness to cooperate;
- current companions may react or form autonomous intent from their own Knowledge/history.

But the factual event premise remains fixed unless an owning resolver commits a changed state.

## 5. CE fills blanks; CE does not author authority

CE may fill **expression blanks**, including:

- suitable backdrop selection from authorised assets/context;
- observer-safe narration;
- character-appropriate dialogue;
- contextual phrasing;
- eligible player-facing choice wording;
- bounded participant reactions;
- transition text after committed resolver outcomes.

CE may also derive the legitimate **semantic decision space** where current authority already permits that derivation.

CE may **not** fill authority blanks by inventing:

- why the event exists;
- a hidden faction;
- an injury that World did not commit;
- an undisclosed target or object identity;
- new participant history;
- Rank;
- Skills;
- relationships;
- ownership;
- discovery;
- success/failure;
- Battle entry;
- rewards;
- death/survival;
- mission completion;
- World Truth.

Canonical rule:

> **Missing expression may be generated. Missing authority must fail closed or return to the owning author.**

## 6. Choice semantics

Player-facing choices are projections of authorised semantic intents.

Conceptually:

```text
{
  displayText: "HELP HIM",
  intent: HELP_INJURED_COURIER
}
```

Selecting the choice commits protagonist intent only.

It does not commit success.

The owning resolver determines the factual result, after which CE may realise the next scene from the newly committed state.

Canonical loop:

```text
World-authored premise
-> committed occurrence
-> CE realises scene
-> player selects semantic intent
-> owning resolver
-> committed consequence
-> CE realises updated scene
```

## 7. Expression modes over one interaction pipeline

The same Chronicle Interaction machinery may support several expression-control levels without creating separate Story engines.

### `VERBATIM`

For exact authored Story such as Origins, major reveals, historical anchors and other owner-locked scenes.

CE/runtime displays exact approved Backdrop / Narration / Dialogue / Choices and may not rewrite them.

### `BOUNDED`

For important events with authored anchors but contextual flexibility.

Writing/World may lock key lines, facts or beats while CE fills connective narration, observer-safe contextual text and eligible wording.

### `DYNAMIC`

For ordinary hotspots / standing World events.

World authors the complete factual premise/constraints; CE realises the scene from occurrence + Chronicle context.

These are expression modes, not different truth systems.

## 8. Determinism / persistence

A dynamic occurrence must not become a different conversation merely because the player closes and reopens the hotspot.

For any committed occurrence, runtime should either:

- persist the selected expression/variant receipt; or
- deterministically reconstruct the same presentation from stable occurrence/state inputs.

A new committed factual consequence may legitimately create a new scene realisation.

UI refresh, hover, focus, reopen or save/load alone may not reroll the occurrence premise, eligible semantic choices, participant identities or unresolved factual state.

## 9. Relationship to current World ecology

This boundary preserves the existing World authority that:

- World owns authored event/quest/mission/chain definitions and factual context;
- CE / World may select only among already semantically eligible authored candidates;
- event definition != occurrence;
- eligibility != selection != discovery != actionability;
- randomness among eligible candidates != randomness manufacturing eligibility.

This document adds the explicit downstream presentation rule:

> **After a legitimate occurrence is committed, CE may dynamically realise its player-facing interaction without becoming the owner of the occurrence premise.**

## 10. Example — injured courier

World authors:

```text
Courier is injured.
Courier has a sealed message.
Recipient is not observer-known.
The courier may accept/refuse assistance according to factual state and participant behaviour.
HELP / QUESTION / INSPECT / LEAVE are potentially legal intent families.
```

The committed occurrence supplies the actual courier Entity/instance, host, injury state, sealed-message object and observer Knowledge.

CE may realise for one Chronicle:

```text
Narration:
A shinobi is sitting against the base of a cedar beside the road.
One hand is pressed tightly against his side.

COURIER:
"Don't suppose you're a medic."

Choices:
HELP HIM
ASK WHAT HAPPENED
LOOK AT THE SEALED MESSAGE
KEEP MOVING
```

Another Chronicle may legitimately receive different wording or additional capability-backed choices while consuming the same event-family truth.

CE may not decide that the courier secretly belongs to ROOT, that the sealed message names a specific recipient, or that treatment succeeds unless those facts are supplied/committed by the appropriate authority/resolver.

## 11. Alpha posture

This is a reusable design seam, not permission to make unrestricted live language generation an Alpha blocker.

Alpha may implement the same interface using:

- authored fragments;
- deterministic templates;
- bounded variants;
- contextual interpolation;
- later contextual language generation behind the same contract.

The important Alpha requirement is the authority boundary and reusable interaction payload, not a specific prose-generation technology.

## 12. Canonical summary

> **World creates the event premise. Runtime commits the occurrence. CE reads that truth plus the current Chronicle and fills the presentation/decision-space blanks. The player chooses intent. Owning systems resolve what actually happens. CE then presents the new committed state.**

Preserve:

- event definition != occurrence;
- premise != presentation;
- World Truth != observer Knowledge != presentation;
- generated wording != generated fact;
- eligible intent != guaranteed outcome;
- selected intent != resolver result;
- CE expression != World authoring;
- dynamic scene != semantic reroll;
- missing expression != missing authority;
- design closed != implemented != runtime validated != Golden GREEN.
