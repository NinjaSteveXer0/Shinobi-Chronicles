# Shinobi Chronicles — Interactive Scene OnClick Performance Playback Contract

**Date:** 2026-09-14  
**Owner:** Writing / Story — Konoha  
**Consumer:** Coding / Runtime  
**Status:** **BINDING PLAYER-FACING STORY PERFORMANCE REQUIREMENT**  
**Primary priority:** Finish Shinobi Chronicles Alpha.

## 1. Problem proven in installed browser

The current Chronicle Interaction / Scene Board shell is close to the intended presentation, but the Story still plays as a sequence of static semantic cards:

`render screen -> read one short sentence -> press CONTINUE -> rebuild screen -> read next short sentence -> press CONTINUE`

That is not the required Story experience.

Current Academy Kakashi source demonstrates the structural cause:

- rooftop opening is split into separate Story beats for `kak_original_rooftop`, `kak_original_anbu`, `kak_original_envelope`, and `kak_original_order`;
- each beat owns one short text payload and a `nextBeatId`;
- the Scene Board is a projection wrapper over the existing Story renderer, so every Story beat transition causes a fresh Story render / board projection.

The result is stop-start-static even when the backdrop and actors should remain in one continuous scene.

Canonical correction:

> **A semantic Story beat is not the same thing as one line of narration or dialogue.**

> **A continuous scene must be allowed to perform several narration/dialogue/action cues inside one mounted scene before the semantic Story state advances.**

---

## 2. Required player experience

For ordinary conversation / narration sequences:

- the environment remains mounted;
- actor cards remain staged;
- the current speaker / actor focus changes in-place;
- narration and dialogue replace each other in the same performance panel;
- short physical actions visibly update actor/object state;
- the player clicks/taps the scene or dialogue panel to advance the next performance cue;
- keyboard Enter / Space should provide the same advance action for accessibility;
- no full Story-screen teardown/rebuild occurs for each spoken line;
- no semantic Story history is committed merely because a performance cue advanced.

Meaningful choices remain explicit choice controls and **pause** the performance until the player chooses.

Canonical rhythm:

`mounted scene -> narration cue -> click -> actor line -> click -> reaction cue -> click -> actor line -> click -> meaningful choice OR scene transition`

Not:

`static Story screen -> CONTINUE -> static Story screen -> CONTINUE -> static Story screen`.

---

## 3. Presentation cue != semantic beat

Coding should add a reusable presentation-layer concept equivalent to a **performance sequence** (exact runtime naming is Coding-owned).

Conceptual shape:

```text
semanticBeat
  performanceSequence[]
    cue 0
    cue 1
    cue 2
    ...
  nextBeatId / choices / resolver seam
```

A performance cue may contain presentation-only data such as:

```text
cueId
kind = narration | dialogue | action | reaction | transition
speakerRef / speakerName
text
focusActorRef
actorStateDelta
actorEntrance / actorExit
objectStateDelta
environmentPresentationDelta
panelMode
hardCut / transitionHint
```

The exact schema is Coding-owned. The semantic boundary is not.

### Presentation cursor

The active Story runtime needs a presentation cursor / equivalent that advances through the current performance sequence.

Advancing this cursor:

- must not call `commitOccurrence()`;
- must not rerun `onEnterConsequences`;
- must not change factual World Truth;
- must not imply resolver success;
- must not advance `nextBeatId` until the current performance sequence reaches its authored end or a meaningful choice/resolver interrupts it.

If save/load supports saving mid-scene, the presentation cursor may be persisted as presentation state so the player resumes at the same cue. It remains **presentation state, not Chronicle factual authority**.

---

## 4. Interaction rule

For non-choice performance cues:

- click/tap on the dialogue/performance panel or an approved scene-advance surface -> advance exactly one cue;
- Enter / Space -> advance exactly one cue;
- optional small advance affordance / chevron may remain visible;
- a large repeated `CONTINUE` button is not required as the primary interaction.

When a meaningful choice is present:

- generic scene-click advance is disabled or ignored;
- only selecting a legitimate choice commits player intent;
- the relevant resolver / Story transition then owns the factual continuation.

When Battle / World / another resolver takes control:

- performance pauses;
- owning resolver establishes facts;
- return resumes the same Story context at the authorised aftermath cue / successor beat.

---

## 5. Scene continuity rule

The same physical scene should feel continuous.

During one rooftop conversation, for example:

- rooftop backdrop must remain mounted;
- Kakashi and ANBU stay staged;
- focus changes between them;
- ANBU can enter once and remain present;
- envelope can appear at the authored action cue;
- dialogue panel updates in-place;
- no layout reset or fake scene cut occurs between every sentence.

A hard scene cut is appropriate when the physical scene genuinely changes, e.g.:

`Konoha rooftop -> Konoha alley`.

Canonical rule:

> **New line != new screen. New dramatic place / material state may justify a new scene.**

---

## 6. Academy Kakashi benchmark — rooftop

The recovered / Stephen-approved rooftop opening should be the first benchmark for continuous performance playback.

### Scene state

Environment: `kakashi_origin_rooftop_night`

Actors:
- Academy Kakashi
- ANBU Operative

### Required performance

Conceptually:

```text
CUE 1 — NARRATION
Kakashi watched Konoha from the rooftop.

CUE 2 — NARRATION / ACTOR ENTRANCE
A presence registered behind him.
His eye shifted.
An ANBU operative stood several paces back, masked and motionless.

CUE 3 — DIALOGUE — ANBU
“Kakashi Hatake.”

CUE 4 — NARRATION
Kakashi turned his head slightly.

CUE 5 — DIALOGUE — ANBU
“You have orders. Stop this package from falling into the wrong hands.”

CUE 6 — ACTION / OBJECT
The operative raised a sealed envelope.

CUE 7 — NARRATION
Kakashi studied him for a moment, then moved from his position and walked over.

CUE 8 — DIALOGUE — KAKASHI
“Why are you coming to me with this?”

CUE 9 — ACTION
He took the envelope.

CUE 10 — DIALOGUE — ANBU
“Hokage’s orders.”

CUE 11 — NARRATION
Kakashi’s attention sharpened.
His eye dropped to the seal in his hand.

END SCENE -> hard cut to Konoha alley.
```

This is **one continuous performed rooftop scene**. It should not render as eleven separate static Story screens.

The exact display name order is binding project authority:

`Kakashi Hatake`

not

`Hatake Kakashi`.

---

## 7. Academy Kakashi benchmark — alley transition

After the final rooftop cue, the next advance may perform a true hard cut:

- swap rooftop backdrop -> Konoha alley backdrop;
- re-stage Kakashi for concealment / pursuit;
- target enters / becomes visible according to authored observation;
- second man becomes present at the Sakura-tree exchange as authorised;
- actor dialogue / movement performs the exchange setup;
- only after the player has actually witnessed enough to understand the situation should the first meaningful choice appear:
  - OBSERVE
  - GET_CLOSER
  - ATTACK
  - PICKPOCKET

Do not compress:

`locate target + tail through Konoha + enter alley + discover second man + discover package`

into one explanatory sentence if those actions are the dramatic bridge into the first player decision.

---

## 8. Actor / object staging expectations

Performance cues should be able to update presentation in-place.

Examples:

- ANBU card fades/slides into its authored stage position when Kakashi senses him;
- focus highlight moves from Kakashi to ANBU when ANBU speaks;
- Kakashi card focus returns when he asks his question;
- sealed envelope appears only when raised/introduced;
- envelope state may change from SEALED -> HELD BY KAKASHI / OPENED only at the applicable cue;
- target/second-man cards may enter the alley scene when they become observer-safe visible participants;
- actor state labels should describe current visible state without substituting for narration/dialogue.

Animation may be subtle. The requirement is continuity and visible reaction, not flashy motion.

---

## 9. Objective presentation

Do not create checklist-style micro-objectives for every spoken line.

Bad examples:

- `Hear the operative out.`
- `Inspect the Hokage-authorised assignment material.`

Those are not meaningful player objectives; they make conversation feel like tutorial tasks.

The objective should remain at the meaningful situation level, e.g. the assignment itself or the current unresolved problem. It may update only when the actual objective changes.

Preserve:

> **Player agency requires meaningful decisions, not constant decisions.**

Likewise:

> **Objective update != every narration/dialogue cue.**

---

## 10. Reusable acceptance test

A Story scene passes only if a player can experience ordinary dialogue as one continuous staged exchange.

For Kakashi rooftop specifically:

1. entering the rooftop scene mounts backdrop + Kakashi;
2. ANBU entrance is performed without a full screen reset;
3. each click advances one narration/dialogue/action cue;
4. actor focus and object state update in-place;
5. the player hears `Kakashi Hatake`, not `Hatake Kakashi`;
6. Kakashi asks why ANBU came to him;
7. ANBU answers `Hokage’s orders.`;
8. no semantic occurrence is committed by clicking through dialogue;
9. final rooftop advance performs a real scene cut to the alley;
10. meaningful choices appear only after the alley exchange has been sufficiently performed;
11. save/load does not duplicate factual consequences or reroll committed Story state;
12. installed-browser proof is required before Golden.

Final shorthand:

> **Story beats own meaning. Performance cues own cinematic delivery.**

> **Clicks advance performance until a meaningful decision or resolver boundary is reached.**

> **Do not rebuild the whole Story screen for every sentence. Keep the scene alive.**
