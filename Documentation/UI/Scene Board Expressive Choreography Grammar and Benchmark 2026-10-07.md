# Shinobi Chronicles — Scene Board Expressive Choreography Grammar + First Benchmark

**Date:** 2026-10-07  
**Owner:** UI / Assets  
**Tracker:** #490  
**Status:** **ACTIVE PRE-ALPHA PRESENTATION AUTHORITY — FIRST BENCHMARK REQUIRED**  
**Current shared renderer:** `runtime/alpha-story-scene-board-33900.js`

---

## 1. Activation

#490 is no longer parked.

Its original blocker has cleared:

- #469 CLOSED;
- PR #475 MERGED;
- #528 watchdog marked the work READY for UI / Assets.

This document activates the bounded first benchmark only.

Do not bulk-propagate choreography to all Origins until Stephen accepts the shared benchmark.

Canonical:

> **Animation presents authorised Story truth; animation does not create Story truth.**

> **Motion primitive != emotion != factual state change.**

---

## 2. Existing shared authority remains

Build on, do not replace:

- `Documentation/Coordination/Story_Stage_Choreography_and_Battle_Presentation_Performance_Contract_2026-09-22.md`;
- `Documentation/UI/Story Choreography and Battle Presentation Benchmark Specification 2026-09-22.md`;
- `Documentation/UI/Scene Board GOLDEN Plus Staging Focus and Transition Closure 2026-10-02.md`;
- current `runtime/alpha-story-scene-board-33900.js`;
- current semantic stage anchors and shared choreography controller;
- current Full / Standard / Quick presentation-depth work.

No second renderer. No Kakashi-local patch resurrection. No MutationObserver/time-out semantic ownership.

---

## 3. Archaeology result — what the smoother Kakashi presentation got right

Historical benchmark commit:

`12146904656106ec632d2c3f1bb7e58778371ffd` — **Kakashi final Browser Golden visual attempt (#346)**.

The useful quality was not a special Kakashi semantic system. It was presentation technique.

### Reusable qualities to recover

1. **Do not animate against the same `transform` property that owns stage anchoring.**  
   The old benchmark deliberately used CSS transform longhands (`translate`, `scale`, `rotate`) while preserving the anchor transform separately.

2. **Short, bounded motion beats.**  
   The old smooth pass used roughly:
   - enter: ~240ms;
   - short focus pulse: brief, low-amplitude;
   - recoil: ~1.25vw rather than a large screen jump;
   - strike/lunge: bounded local movement;
   - exit/flee: one clean directional motion.

3. **One motion owner at a time.**  
   It prevented stage-anchor positioning, actor entry animation and shared choreography from all fighting the same frame.

4. **Separate departure/hold visuals from the live actor node when continuity required it.**  
   This avoided remount flashes while keeping semantic actor presence owned by Story state.

5. **Movement settles cleanly.**  
   A non-semantic reaction returns to its anchor. A real exit ends off-stage only when Story truth authorises departure.

6. **No phantom card-holder chrome.**  
   The Character Card itself remains the visual object; temporary motion wrappers must not create a second visible card frame.

### Current shared-renderer risk to correct

Current shared Scene Board still contains transform-based keyframes such as enter/approach/lunge/recoil while actor anchoring/focus also uses transform.

That makes transform contention a credible source of jitter, double motion and wrong settle positions.

Required implementation principle:

> **Recover the old compositor-safe motion qualities in the current shared renderer, not the old Kakashi-local ownership.**

---

## 4. Stage grammar

The Scene Board should be able to express these spatial compositions without inventing Story facts.

### 4.1 Formation / entry

Canonical presentation intents:

- `TEAM_ENTER_LEFT`
- `TEAM_ENTER_RIGHT`
- `SQUAD_WEDGE_LEFT`
- `SQUAD_WEDGE_RIGHT`
- `LEADER_FORWARD`
- `SUPPORT_RECESSED`
- `STAGGERED_GROUP_ENTRY`
- `SOLO_ALREADY_PRESENT`
- `PASSING_TRAVERSE`

These are composition intents, not semantic actions.

A wedge means visual staging only. It does not automatically mean battle formation, leadership authority or deployment state.

### 4.2 Conversational acting primitives

Add bounded reusable primitives to the shared renderer:

- `STEP_FORWARD`
- `STEP_BACK`
- `SIDESTEP`
- `LEAN_FORWARD`
- `LEAN_BACK`
- `SHORT_PACE`
- `ATTENTION_SHIFT`
- `SMALL_RECOIL`
- `LARGE_RECOIL`
- `BOUNCE`
- `DOUBLE_BOUNCE`
- `TRIPLE_BOUNCE`
- `TILT`
- `OPPOSING_GROUP_TILT`
- `SHORT_SHAKE`
- `SETTLE_TO_ANCHOR`

Existing shared primitives such as `ENTER`, `EXIT`, `FOCUS`, `REPOSITION`, `APPROACH`, `RETREAT`, `LUNGE`, `STRIKE`, `EVADE`, `RECOIL`, `COLLAPSE`, `FLEE`, `RESTRAIN`, `RELEASE`, `HANDOFF`, `OBJECT_TRANSFER`, `SURPRISE_ENTRY` remain valid where their meaning is already authorised.

Names may be normalised by Coding if equivalent identifiers are clearer. The semantic/presentation distinctions in this document are binding.

### 4.3 Scene movement

Reusable scene-level intents:

- `CROSS_FIELD`
- `APPROACH`
- `PASS_BY`
- `RETREAT`
- `RECOMPOSE_GROUP`
- `EXIT`
- `FLEE`

`EXIT` / `FLEE` may persist off-stage only when Story authority says the Character actually leaves.

A comic recoil may temporarily cross a lane boundary only if the actor visibly returns within the same non-semantic reaction beat.

---

## 5. Primitive contract

Each authored choreography cue must be able to specify, directly or through an equivalent data shape:

- actor id;
- primitive / choreography kind;
- current or source anchor where needed;
- destination anchor where needed;
- duration class or bounded duration;
- intensity/amplitude class where relevant;
- whether the cue returns to anchor;
- whether removal from stage is semantically authorised;
- optional group id for coordinated but non-identical group reaction.

UI owns the safe visual grammar. Writing/Story owns what the motion means in the scene. Coding owns exact runtime execution, timing/easing implementation and cancellation safety.

---

## 6. Motion-quality rules

### 6.1 Transform ownership

Shared actor anchoring must not fight expressive motion.

Preferred implementation:

- anchor position uses existing stage-anchor positioning;
- expressive motion uses transform longhands (`translate`, `scale`, `rotate`) or an equivalent nested motion wrapper;
- do not stack multiple independent `transform:` animations on the same actor node;
- one active expressive cue per actor at a time unless a deliberately composed combined cue is implemented by the same owner.

### 6.2 Duration bands

Use short readable motion:

- micro focus/attention cue: 100–180ms;
- small reaction: 150–260ms;
- enter/recompose/local move: 220–360ms;
- deliberate traverse/pace: 320–650ms;
- no expressive cue should hold the interface hostage after its visual meaning is readable.

Exact timings remain Coding-owned within these quality bands.

### 6.3 Amplitude bands

Prefer restrained local motion:

- small reaction: ~0.6–1.8vw / 4–14px vertical;
- medium reaction: ~1.8–4vw;
- large reaction/traverse only when scene geometry requires it.

Avoid repeated 8–13vw jolts for ordinary conversation.

### 6.4 Settle behavior

- non-semantic reactions return to current anchor;
- entry settles once, no bounce-back unless deliberately authored;
- speaker focus may combine with a local reaction but must settle to the current semantic anchor;
- re-rendering the same cue must not replay entry accidentally;
- cancellation/supersession must leave the actor in a valid anchor state.

### 6.5 Group reaction

Group reaction must not mean cloned motion.

For two or more reacting Characters, permit coordinated asymmetry such as:

- one tilts, one recoils;
- one steps, one remains still;
- opposing tilts;
- staggered bounce/attention shift;
- leader holds while support reacts.

Same emotion/action context does not require the same primitive.

---

## 7. Speaker focus remains additive

Preserve #486:

- all present actors remain full colour / normal opacity / normal saturation;
- speaker focus is additive only;
- target scale remains approximately +3–5%;
- bounded vertical raise approximately 8–14px where geometry permits;
- cyan/focus edge remains presentation only;
- focus does not imply availability, eligibility, party membership or relationship state.

---

## 8. Reduced motion

Every cue needs an information-equivalent reduced-motion form.

Reduced motion preserves:

- actor presence;
- actual enter/exit state;
- speaker focus;
- attention direction;
- final stage anchor;
- group hierarchy.

Reduced motion must not:

- grey/fade present listeners merely because motion is disabled;
- hide an actual semantic exit;
- convert a movement cue into a false state change.

For non-semantic reaction primitives, reduced motion may use immediate anchor/focus state plus a brief <=100ms opacity/focus confirmation.

---

# 9. First owner-review benchmark — four-participant hotspot

Use the existing CE hotspot/private-history collision scene shape with:

- Menma Origin;
- Hinata;
- Kakashi;
- Masked Woman / current MI actor identity supplied by Story authority.

Do not rewrite dialogue or CE semantics.

### 9.1 Opening composition

- Menma + Hinata + Kakashi enter from off-left;
- settle into a loose left-side squad wedge;
- Menma occupies leader-forward/inner-left position;
- Hinata and Kakashi occupy distinct recessed support lanes;
- Masked Woman is already present on the right.

### 9.2 Traverse

Masked Woman may make a short right-to-centre passing traverse if current Story geometry still supports “moving past / leaving prior business.”

This is presentation only; do not imply escape/departure unless Story says so.

### 9.3 Reaction sequence

Use the owner exemplar as performance inspiration, not fixed emotional mapping:

- Hinata: quick bounded bounce/attention cue before her authorised line;
- Kakashi: local recoil/step back, short pace or settle where authored context supports it;
- Masked Woman: small tilt/lean/shake variant where appropriate;
- Menma + Hinata: asymmetric group reaction rather than identical nodding motion.

### 9.4 Closure

The scene must visibly recompose before transition:

- no actor overlap;
- no remount flash;
- no wrong-lane settle;
- no persistent off-screen actor unless Story truth says they left;
- final nonverbal beat must be perceptible before same-place transition or hard exit.

---

# 10. Benchmark acceptance

Stephen owner review is required before wider propagation.

At 1366×768 and 1920×1080 prove:

- three-person group entry is smooth and readable;
- four participants fit without overlap;
- stage anchors remain stable during expressive motion;
- no transform fight/jitter/double motion;
- local reaction primitives feel character-specific rather than generic;
- speaker focus remains additive/full-colour;
- group reaction is asymmetric where authored;
- recompose/exit is perceptible;
- reduced motion preserves all semantic information;
- dialogue/choice semantics are unchanged;
- no second renderer or Kakashi-local patch owner appears.

Only after Stephen accepts this benchmark may UI/Coding queue:

1. Kakashi Origin presentation-only choreography polish;
2. other frozen Origins, one bounded pass at a time;
3. broader CE hotspot/world-event choreography propagation.

---

# 11. Backdrop catalogue obligation

Activation of #490 also activates the durable Backdrop Authoring Catalogue requirement from `Documentation/Coordination/Story_Performance_and_Backdrop_Authoring_Interface_2026-10-02.md`.

That catalogue is a separate continuing UI / Assets deliverable and must use the locked status vocabulary:

- `BOUND`;
- `AVAILABLE SAME-LOCATION VARIANT`;
- `AVAILABLE REUSABLE ENVIRONMENT`;
- `CANDIDATE / NEEDS CONFIRMATION`;
- `UNBOUND / UNKNOWN`.

Unknown metadata stays UNKNOWN. File existence does not create Story binding.

The first choreography benchmark does not wait for the entire catalogue to be complete.
