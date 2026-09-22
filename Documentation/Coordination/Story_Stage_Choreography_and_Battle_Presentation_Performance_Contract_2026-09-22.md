# Shinobi Chronicles — Story Stage Choreography and Battle Presentation Performance Contract

**Date:** 2026-09-22  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CROSS-SYSTEM PRESENTATION CONTRACT — QUEUED IMPLEMENTATION**  
**Source:** #304  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA WITHOUT REINTRODUCING LAYERED PRESENTATION OWNERS**

---

## 1. Purpose

Stephen's installed-browser review identified two related presentation weaknesses:

1. Story scenes often describe physical action in text while Character Cards remain comparatively static.
2. Battle often reads as portraits/cards plus a PL number decreasing rather than a sequence of readable shinobi actions, reactions and consequences.

The answer is **not** another presentation stack.

The answer is one reusable presentation grammar over already-authorised Story and Combat facts.

Canonical doctrine:

> **Presentation should make committed action visible. It must never decide whether the action happened.**

And:

> **If the player can understand a physical action from staging/choreography, narration should not be forced to carry that entire burden.**

---

# PART A — STORY STAGE CHOREOGRAPHY

## 2. Extends the existing Interactive Scene Board

This contract extends:

- `Documentation/UI/Chronicle Interaction Interactive Scene Board Addendum 2026-09-13.md`
- `Documentation/UI/Chronicle Interaction Shell Presentation Contract.md`

It does not create:

- a second Story engine;
- a Kakashi-only renderer;
- a second participant-state system;
- presentation-owned truth;
- another overlay patch stack.

Use the canonical Scene Board / Story renderer.

---

## 3. Choreography is projection, not authority

Story truth flow:

```text
authorised Story beat / resolver result
-> committed or already-authoritative factual state
-> presentation choreography cue
-> visible movement/reaction
-> next dialogue / narration / choice
```

The choreography layer may represent:

- entry;
- exit;
- approach;
- retreat;
- reposition;
- turn/focus;
- lunge;
- strike;
- evade;
- recoil;
- collapse;
- flee;
- restrain;
- release;
- handoff;
- object transfer;
- threat focus;
- attention shift;
- surprise appearance.

It may not determine:

- whether an attack succeeds;
- whether a target escaped;
- whether restraint succeeded;
- package holder;
- death;
- custody;
- Battle result;
- Knowledge;
- reward;
- Story branch outcome.

---

## 4. Reusable Story performance cue

Story/renderer should support a bounded cue envelope conceptually equivalent to:

```text
cueId
sourceBeatId / sourceOccurrenceId
actorRefs[]
targetRefs[]
actionClass
startSlot / endSlot
focusRef
visibleObjectRefs[]
tempo
emphasis
resultStateRef
textSyncMode
reducedMotionFallback
```

Exact code schema is Coding-owned.

Writing/Story may author choreography intent where materially important.

Coding/UI may derive ordinary staging from exact supplied state where the meaning is unambiguous.

Do not infer hidden factual outcomes from a cue label.

---

## 5. Choreography grammar before bespoke animation

Alpha should use a small reusable grammar rather than one custom animation per line.

Recommended reusable classes:

- `ENTER`
- `EXIT`
- `FOCUS`
- `REPOSITION`
- `APPROACH`
- `RETREAT`
- `LUNGE`
- `STRIKE`
- `EVADE`
- `RECOIL`
- `COLLAPSE`
- `FLEE`
- `RESTRAIN`
- `RELEASE`
- `HANDOFF`
- `OBJECT_TRANSFER`
- `SURPRISE_ENTRY`

A choreography class may use:

- slide;
- scale;
- brief positional offset;
- stage-side swap;
- focus/brightness;
- shake/recoil;
- fade;
- bounded impact pulse;
- temporary target emphasis.

No animated character artwork is required.

---

## 6. Narration/choreography balance

Narration still owns information choreography cannot safely convey.

Use narration for:

- observer-safe sensory detail;
- internal thought where authorised;
- environmental change;
- complex action not safely represented by the stage;
- causally important detail the movement alone could miscommunicate.

Avoid redundant prose such as:

```text
"Kakashi lunges forward."
```

when the stage can clearly show Kakashi lunging and the dialogue/next fact already establishes why it matters.

Text fallback must remain sufficient for accessibility/reduced motion.

Canonical rule:

> **Show simple movement; narrate meaning, nuance and information the stage cannot safely carry.**

---

## 7. Group-scene compatibility

This choreography contract complements the Writing group-conversation standard.

A lively scene should combine:

```text
place
+ present participants
+ real conversation
+ visible reactions/movement
+ meaningful player decisions
```

Do not substitute choreography for dialogue.

Do not substitute dialogue for obvious stage movement.

---

## 8. Story action acceptance proof

A benchmark Story scene should prove:

1. actor enters visibly;
2. speaker focus is clear;
3. actor can approach/reposition;
4. actor can perform one authorised physical action;
5. target visibly reacts;
6. actor can leave/flee;
7. object transfer can be presented from committed holder state;
8. restraint can be staged only after the authoritative restraint fact;
9. cue cannot recommit/duplicate Story state;
10. save/load during/after presentation does not reroll the fact;
11. reduced-motion fallback remains understandable;
12. one canonical renderer owns the output.

---

# PART B — BATTLE PRESENTATION EXPERIENCE

## 9. Battle presentation problem

Current Battle semantics are not being reopened.

The presentation problem is that a resolved action can currently collapse visually into:

```text
choose action
-> number changes
```

The player should instead be able to read:

```text
WHO acted
-> WHAT they used
-> WHO/WHAT it targeted
-> WHAT happened on contact/resolution
-> WHAT changed
-> WHO acts next
```

Canonical Battle presentation sequence:

> **ACTOR -> ACTION -> TARGET -> IMPACT/RESPONSE -> RESULT -> UPDATED BATTLE STATE**

---

## 10. Combat owns fact; presentation owns playback

Combat continues to own:

- legal action;
- target legality;
- initiative/action economy;
- hit/miss;
- damage;
- PL/runtime-state effects;
- substitution;
- crit;
- guard;
- status effects;
- summon participation;
- defeat/withdrawal;
- Battle completion.

Presentation consumes that committed result.

Animation never rolls hit chance, chooses a target, changes damage, or determines defeat.

---

## 11. Battle presentation event envelope

Coding should provide one presentation event/result envelope derived from Combat's committed action resolution.

Conceptually:

```text
battleOccurrenceId
turnId
actionId
actionLabel
actorRef
targetRefs[]
presentationClass
resultType
damageOrDelta[]
critical
blocked
evaded
substitution
statusApplied[]
statusRemoved[]
resourceDelta[]
battlePLBefore[]
battlePLAfter[]
defeatRefs[]
nextActorRef
environmentPresentationRefs[]
```

Exact fields remain implementation-owned and should reuse current Combat result authority where already available.

Do not create duplicate Battle truth merely to animate it.

---

## 12. Battle animation grammar

Do not require bespoke art/animation for every technique during Alpha.

Use reusable classes such as:

- `PHYSICAL_STRIKE`
- `HEAVY_STRIKE`
- `PROJECTILE`
- `CHAKRA_RANGED`
- `AREA_ATTACK`
- `GUARD`
- `EVADE`
- `SUBSTITUTION`
- `HEAL`
- `BUFF`
- `DEBUFF`
- `RESTRAINT`
- `SUMMON`
- `ENVIRONMENTAL`
- `TRANSFORMATION`
- `DEFEAT`

Technique-specific presentation overrides may be added later through the same canonical owner.

---

## 13. Minimum Battle action readability

For an ordinary damaging action, presentation should normally provide:

- active actor emphasis;
- technique/action name;
- visible actor movement or action emphasis;
- target emphasis;
- impact/reaction;
- damage/result feedback;
- Battle PL/state update;
- brief settle into next-turn state.

For non-damaging actions, substitute the correct factual feedback:

- guard stance;
- heal gain;
- buff/debuff state;
- substitution replacement;
- summon arrival;
- restraint state;
- transformation state.

Do not fake physical contact for an action whose actual result was evade/miss/substitution.

---

## 14. PL is state, not the whole performance

Battle PL remains important.

But PL change should be **one result readout**, not the sole visible representation of combat.

The player should understand *why* the state changed from the action playback.

Preserve:

> **Battle PL/runtime state != animation**

> **animation != damage authority**

---

## 15. Asset-family boundary

Preserve the existing asset ontology:

- Battle uses approved Battle Portraits / enemy Battle assets.
- Story Scene Board uses approved Story/scene/entity assets.

Do not collapse the two merely to share choreography code.

Shared motion grammar is acceptable.

Shared physical asset identity is not automatic.

---

## 16. Battle pacing controls

Presentation must not make combat painfully slow.

Support:

- default readable timing;
- fast/skip behavior where safe;
- reduced motion;
- no semantic dependence on animation completion;
- queued presentation that cannot duplicate an action if input is repeated;
- input lock only for the minimal presentation window needed to prevent double-submit.

A player should be able to understand Battle without being trapped in long animation theatre.

---

## 17. Failure / evade / substitution truthfulness

Presentation must visually distinguish:

- hit;
- miss;
- evade;
- guard/block;
- substitution;
- critical;
- no-effect/resisted where relevant.

Do not show an impact animation that implies a direct hit when Combat committed substitution or evade.

---

## 18. Multi-target / off-slot compatibility

The presentation grammar must support actions targeting something other than the current active opposing slot where Combat authorises it.

This includes current/future mechanics such as an action legally affecting a non-active target.

Do not hard-code Battle presentation to:

```text
active actor always attacks active opposing actor
```

Target presentation must consume exact Combat target refs.

---

## 19. Story -> Battle -> Story continuity

Battle presentation must preserve the existing caller/return contract.

The experience should read as:

```text
Story situation
-> Battle transition
-> readable Battle performance
-> committed Battle result
-> return to same Story context
-> Story reacts to exact result
```

No detached victory presentation may invent Story custody, mission success, death, reward or disposition.

---

# PART C — OWNERSHIP AND DELIVERY

## 20. Ownership

### Writing

Owns:
- accepted scene action/choreography intent where Story-significant;
- dialogue/narration;
- participant reactions;
- scene rhythm.

Does not own animation implementation or factual resolver result.

### Combat

Owns:
- Battle semantics;
- committed action result;
- exact targets;
- action legality;
- outcome/state changes.

Does not own visual styling.

### UI / Assets

Owns:
- visual performance direction;
- motion grammar presentation;
- Battle composition;
- focus/impact/readability treatment;
- approved asset projection.

Does not own Combat facts or Story outcomes.

### Coding / Runtime

Owns:
- canonical renderer/lifecycle;
- event/cue playback;
- input lock/skip/reduced-motion;
- exact result projection;
- regression/owner uniqueness;
- save/load safety.

Does not invent new semantic outcomes.

### CE / Coordination

Owns:
- cross-system event/choreography contract;
- semantic/presentation boundary;
- collision resolution.

---

## 21. Do not repeat Kakashi layering

No new:

- Kakashi-only presentation stack;
- second Battle renderer;
- late CSS overlay owner;
- MutationObserver presentation patch;
- timeout-based semantic choreography;
- duplicate Battle result writer;
- animation-owned Story progression.

Extend or replace the canonical owner under the runtime ownership/retirement gate.

---

## 22. Representative benchmark before broad propagation

Do not redesign every Story scene or Battle at once.

Use one representative Story scene and one representative Battle.

### Story benchmark

A multi-actor scene with:
- entry;
- dialogue;
- reposition;
- physical action;
- reaction;
- exit/flee;
- choice/continuation.

### Battle benchmark

A Battle that can demonstrate:
- ordinary hit;
- evade/miss;
- substitution or guard;
- state/PL change;
- defeat;
- Story return.

Stephen reviews the actual browser experience.

Only after the shared presentation owner is accepted should the pattern be propagated broadly.

---

## 23. Alpha priority

This is valuable presentation work, but it must not reopen already-closed Combat semantics or derail current functional Alpha blockers.

Recommended order:

1. UI / Assets defines one coherent Story + Battle presentation benchmark using this contract.
2. CE reconciles any semantic collision.
3. Coding implements one canonical shared presentation slice.
4. Stephen evaluates the browser experience.
5. Tune/replace the same canonical owner until accepted.
6. Propagate only after acceptance.

---

# Final lock

> **Story choreography and Battle animation are playback of authority, not authority themselves. Story should visibly stage simple physical action instead of narrating every movement. Battle should visibly communicate actor, action, target, response, result and updated state instead of reducing combat to cards plus a falling PL number. Both must use reusable presentation grammars, one canonical runtime owner, truthful result projection and representative browser benchmarks before broad propagation.**
