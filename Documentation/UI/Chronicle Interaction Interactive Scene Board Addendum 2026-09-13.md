# Shinobi Chronicles — Chronicle Interaction Interactive Scene Board Addendum

**Date:** 13 September 2026  
**Owner:** Coding / Runtime + Stephen  
**Status:** **STEPHEN-APPROVED PRESENTATION DIRECTION — EXTENDS EXISTING CHRONICLE INTERACTION SHELL; RUNTIME IMPLEMENTATION / BROWSER GOLDEN SEPARATE**

## 1. Why this addendum exists

Installed-browser Origin testing exposed that technically functional Story beats can still present like a novel/admin interface: large empty dark field, small prose panel, repeated CONTINUE, no visible participants, no environmental staging, and choices that describe actions instead of presenting an evolving situation.

Stephen and Coding reviewed **Agarest: Generations of War 2** as a presentation reference only. The useful lesson is not to copy its assets or visual-novel structure. The useful lesson is that a conversation screen should visually stage **place + people + dialogue** at the same time, and an interactive decision should keep the scene visible while exposing meaningful actions.

This addendum extends:

`Documentation/UI/Chronicle Interaction Shell Presentation Contract.md`

It does **not** create a second Story / Chronicle / choice / consequence engine.

Canonical direction:

> **Story becomes an interactive scene board rather than a textbox.**

> **Story frames gameplay; Story presentation must not replace gameplay with narrated summaries.**

---

## 2. Preserve existing Chronicle Interaction architecture

The existing one-system / three-depth architecture remains authoritative:

- Full Chronicle Interaction;
- Standard Conversation;
- Quick Exchange.

This addendum defines how the scene should be visually staged inside those depths where appropriate.

Preserve permanently:

- presentation depth != semantic mode;
- Story scene != presentation layer;
- displayed choice != committed result;
- environment != participant roster;
- speaker/source != physical participant;
- Present != Heard != Knows != Battle participant;
- World Truth != observer Knowledge != presentation;
- player intent != resolver outcome;
- Battle victory != Story outcome automatically.

---

## 3. Full-stage environment — backgrounds represent places, not branches

Reusable Scene Backdrops should normally fill the Story stage rather than leaving a large blank dark field.

**Do not generate or require one bespoke image per branch.**

Backdrop identity represents a stable physical environment / scene location, for example:

- Konoha rooftop;
- Academy classroom;
- Academy courtyard;
- village street;
- market lane;
- alley;
- training ground;
- forest path;
- forest clearing;
- Hokage administration interior;
- civilian interior;
- other exact approved locations.

Multiple branch outcomes may reuse the same backdrop when they occur in the same physical place. Branching should primarily change **scene state layered over the environment**, not force new background art.

Bind a backdrop only where Story/World/location authority is recovered or approved. Unknown scene geography remains unbound rather than guessed.

Canonical rule:

> **place changes backdrop; decision changes scene state.**

---

## 4. Character Cards become Story-stage actors for Alpha

For Alpha, SC should reuse its strongest existing visual language: **Character Cards**.

The Story stage may present large character-card actors rather than requiring a new animated-character or transparent-bust asset catalogue.

Examples:

- player representation card;
- named Character card;
- reusable generic NPC card such as ANBU;
- generic civilian / rogue / shinobi card where authorised;
- observer-safe unknown/obscured card where identity is not legitimately known.

Character Card visibility is presentation only. It does not imply ownership, roster membership, assignment or deployment.

Preserve:

> **card visible in Story != acquired Character**

> **card visible in Story != identity known**

> **card visible in Story != Battle participant**

Unknown identities should be maskable as `????`, `UNKNOWN SHINOBI`, etc. until observer Knowledge legitimately permits stronger presentation.

A future dedicated Story-bust asset class remains possible but is **not required for Alpha**.

---

## 5. Stage composition

The reusable Story stage should support at minimum:

- environment/backdrop;
- left actor slot;
- centre actor slot;
- right actor slot;
- current speaker/focus state;
- optional scene objects/objectives;
- dialogue/narration surface;
- meaningful choices / actions;
- optional consequence / Record receipt.

Character Cards should be presented large enough to be part of the scene, not tiny inventory thumbnails.

Suggested stage behaviour, implemented through ordinary CSS/runtime composition rather than new animated art:

- current speaker brightens / raises / scales subtly;
- listeners become slightly subdued;
- arrivals slide/fade into a slot;
- departures slide/fade out;
- hostile or surprise entry may use a bounded impact treatment;
- cards may reposition when scene focus changes;
- selected target/object may gain a presentation highlight where legitimate.

No animation inside the character artwork is required.

---

## 6. Two complementary presentation states inside the same Story system

### A. Conversation state

Use when the primary interaction is dialogue/reaction.

Composition:

`Backdrop + present actor cards + active speaker + compact dialogue surface`

Requirements:

- dialogue belongs to the actual speaker;
- do not bundle multiple speakers into one `NARRATION ACTION` paragraph;
- character presence/body-language implication should be carried by staging where possible instead of prose explaining everything;
- narration should be short and visually distinct from dialogue;
- the scene remains visible behind the text.

Normal dialogue advancement may use click / keyboard advance with a subtle indicator. A large `CONTINUE` button should not dominate ordinary conversation.

### B. Encounter state

Use when the Story reaches a materially actionable situation.

Composition:

`Backdrop + actor/entity/object state + current objective/problem + legal player actions`

The scene should present what is materially happening instead of summarising it in prose.

Example pattern for Academy Kakashi after the original target reaches the alley:

```text
                 [SECOND MAN / NPC CARD]

 [KAKASHI CARD]       PACKAGE       [ORIGINAL TARGET CARD]

                 WHAT DOES KAKASHI DO?

       [ OBSERVE ]                [ GET CLOSER ]

       [ ATTACK ]                 [ PICKPOCKET ]
```

The exact layout is implementation-owned; the semantic principle is binding.

When the player acts, the stage should visibly realise the changed situation before or alongside the next dialogue/choice window.

---

## 7. Interactive scene state is a presentation of authoritative runtime state

The Story stage should be capable of projecting, where legitimately supplied:

- environment;
- present actors;
- perceived/identified actors;
- current speaker/source;
- visible objects;
- objective state;
- custody/holder state where observer-safe;
- threat/attention state where observer-safe;
- available protagonist intents;
- prior committed decision consequences;
- factual resolver result;
- changed next affordances.

The presentation layer does not calculate hidden truth by itself.

Desired flow:

`scene setup`
→ `visible situation`
→ `player intent`
→ `owning resolver`
→ `factual state change`
→ `stage visibly updates`
→ `dialogue/reaction/new affordances`

This is directly compatible with #121/#175 CE decision-realisation work.

---

## 8. Kakashi reference example — why this matters

The recovered original Academy Kakashi Story is particularly suitable for the scene-board model:

1. rooftop meeting with ANBU;
2. sealed envelope / Hokage-authorised limited assignment;
3. pictured target / package objective;
4. tail through Konoha;
5. alley meeting with second man;
6. first action family: `Observe / Get Closer / Attack / Attempt to Pickpocket`;
7. package transfer;
8. decoy assassin complication while original carrier flees;
9. major action family: `Fight Assassin / Secure Package / Defeat Assassin then Recover Package / Pursue Original Target`.

The important presentation upgrade is not merely better prose. The player should be able to **see the active situation change**:

- who is present;
- who is moving/leaving;
- where the package is, if legitimately perceived;
- who is under threat;
- what Kakashi can currently do.

For example, choosing `Observe` may legitimately result in a later scene that visibly presents a witnessed transfer. Choosing `Attack` may interrupt that observation and produce a different factual/Knowledge state through the appropriate resolver.

Do not implement either result by presentation fiat.

---

## 9. Background/asset economy

This direction is intentionally designed to control visual-production cost.

Do NOT require:

- unique backdrop per dialogue line;
- unique backdrop per branch;
- animated characters;
- multiple expression variants per NPC for Alpha;
- a new Story-only Character art library before Alpha.

Prefer:

- a bounded reusable backdrop vocabulary;
- existing collectible Character Cards;
- reusable generic NPC cards;
- scene-state composition;
- CSS focus/entry/exit emphasis;
- observer-safe masking;
- new visual assets only where a genuinely new recurring place/participant is missing.

---

## 10. Writing / CE authoring implication

Writing should not need to describe visually obvious information once the stage can show it.

Avoid prose that exists only because the current UI is visually empty.

A Story package should increasingly be able to supply or reference presentation metadata such as:

```text
environmentRef
presentationDepth
presentationState = conversation | encounter
actors[]
actorSlots / focus
speakerRef
visibleObjectRefs[]
objectiveRef / objectivePresentation
availableSemanticIntents[]
```

Exact schema remains Coding/CE implementation work and must reuse current Story scene semantics.

Writing owns accepted Story/choreography/expression. CE/domain resolvers own factual legality/results. The renderer owns composition.

---

## 11. Input model and accessibility

Ordinary dialogue/narration should be advanceable by standard click and keyboard interaction without requiring a large CONTINUE control as the visual focal point.

Meaningful actions should remain explicit controls with clear semantic labels.

Keyboard/focus/accessibility requirements remain production requirements:

- meaningful action choices keyboard reachable;
- hidden/unknown entities do not leak through DOM/accessibility names;
- focus order matches visible interaction order;
- stage animation never becomes required to understand state;
- reduced-motion behaviour must remain possible.

---

## 12. Implementation boundary

Build this as an evolution of the **existing Chronicle Interaction / Story renderer**.

Do not create:

- a second Story engine;
- a separate Origin-only UI engine;
- a separate CE history system;
- presentation-owned participant truth;
- presentation-owned custody/Knowledge/outcome state.

The same renderer must be reusable by:

- Origins;
- Arc Story;
- World/Chronicle events;
- relationship/dialogue scenes;
- Story→Battle→same-Story return;
- later Chronicle Engine content.

---

## 13. Alpha proof target

Before broad conversion of all ten Origins, use one accepted Story scene as the benchmark and prove the presentation model in the installed browser.

Required benchmark evidence:

1. approved reusable backdrop fills the Story stage;
2. at least two character cards can be staged simultaneously;
3. current speaker is immediately visually clear;
4. dialogue does not occupy the majority of the screen;
5. ordinary advance is lightweight;
6. scene can switch into Encounter state without leaving the Story occurrence;
7. 2–4 meaningful actions render over the still-visible scene;
8. selecting an action calls the existing authoritative semantic handler/resolver;
9. factual result changes visible stage state;
10. observer Knowledge controls what identity/object state is shown;
11. Story→Battle→same-scene return remains possible;
12. no presentation action fabricates history;
13. browser layout works at Alpha target viewport;
14. `browserGoldenClaimed = false` until Stephen personally approves the installed-browser result.

Only after this benchmark feels like **Shinobi Chronicles gameplay** rather than a visual novel/textbox should the presentation pattern be propagated broadly.

---

## Final doctrine

> **Backdrop supplies place. Character Cards supply presence. Dialogue supplies voice. Encounter state supplies the readable problem. CE/domain resolvers supply truth. Player choices supply intent. The stage visibly reacts to the resulting Chronicle.**

> **Do not illustrate every branch. Recompose authoritative state inside reusable places.**

> **A Story choice that merely selects a different paragraph is not the target. A Story choice should be capable of changing the visible situation, later affordances, factual consequences, or Chronicle-relative reactions where the underlying authority supports it.**
