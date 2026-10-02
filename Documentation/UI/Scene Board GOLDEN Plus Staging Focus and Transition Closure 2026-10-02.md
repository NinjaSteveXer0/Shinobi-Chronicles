# Shinobi Chronicles — Scene Board GOLDEN+ Staging, Focus and Transition Closure

**Date:** 2026-10-02  
**Owner:** UI / Assets  
**Status:** **DESIGN CLOSED / CURRENT SUCCESSOR UI AUTHORITY FOR NEW + REOPENED SCENE BOARD CONTENT**  
**Source issue:** #486  
**Current implementation consumer:** #469 / PR #475  
**Supersedes in part:** `Documentation/UI/Story Choreography and Battle Presentation Benchmark Specification 2026-09-22.md`

## 1. Scope

This document closes the reusable Scene Board presentation defects exposed by Stephen's first live CE/private-history benchmark.

It applies to:
- current #469 / #478 hotspot presentation;
- all new Scene Board content;
- any existing Story scene explicitly reopened for presentation work.

It does **not** reopen frozen Academy Origins merely to retrofit presentation changes.

No new Story renderer is authorised.  
No new image assets are required.  
No Story semantics are changed.

Preserve:

> presentation != Story authority  
> actor visibility != ownership / deployment / availability  
> focus != semantic state  
> scene transition != travel authority  
> visual hierarchy != participant importance truth unless the authored scene explicitly supplies hierarchy  
> reduced motion != reduced information

---

# 2. Present Character Cards stay visually alive

The old listener-dimming rule in the 2026-09-22 benchmark is superseded.

## Binding rule

> **A physically present Character Card remains full-colour, normal-opacity and immediately readable even when that Character is not speaking.**

Do not use listener state to imply:
- disabled;
- dead;
- unavailable;
- defeated;
- hidden;
- absent;
- unconscious;
- semantically inactive.

For ordinary present listeners:
- opacity: normal / 1.0 target;
- saturation: normal;
- brightness: normal;
- no greying;
- no blur;
- no translucency.

Opacity/fade is permitted only when it communicates an actual presentation transition such as:
- `ENTER`;
- `EXIT`;
- `FLEE`;
- an authored disappearance/removal transition.

A focus change alone must never make another present actor translucent.

---

# 3. Speaker focus

Active speaker treatment remains deliberately subtle.

Target:
- scale approximately **+3% to +5%** over that actor's settled presentation size;
- visual raise approximately **8–14px** where layout allows;
- normal full colour;
- bounded cyan/coloured focus edge;
- optional restrained focus shadow/glow;
- z-order may rise enough to keep the focused card readable, but must not create a collision.

The speaker focus edge communicates **current presentation focus only**.

It does not mean:
- selected target;
- ally/enemy;
- hostility;
- relationship;
- rarity;
- active Battle participant;
- semantic priority.

## Hard scale boundary

Normal speaker focus must remain within approximately:
`1.03–1.05`

Do not grow ordinary speaker focus beyond this merely to make focus visible. The border/edge + raise carry the rest of the signal.

---

# 4. Scene staging — stop defaulting to a queue

The Scene Board is a **16:9 stage**, not a row of cards.

## Binding composition rule

> **Participant count, relationship, attention, current speaker and scene hierarchy determine staging. Even spacing in a flat row is only a fallback, not the default grammar.**

Use the existing semantic anchor vocabulary:

- `PLAYER_LEFT`
- `INNER_LEFT`
- `CENTER`
- `CENTER_OBJECT`
- `INNER_RIGHT`
- `OPPONENT_RIGHT`
- `FAR_ENTRY_LEFT`
- `FAR_ENTRY_RIGHT`

The renderer may responsively map these anchors, but the composition must preserve the intended spatial relationship.

## Composition goals

For 1–4 physically present actors:
- use horizontal **and vertical/depth offset**;
- use foreground/supporting depth where useful;
- preserve open negative space around the active conversation;
- avoid equal-width/equal-height lineup treatment unless that is genuinely the scene;
- let important current focus occupy stronger screen real estate without erasing supporting actors;
- recompose when scene focus materially changes;
- use the backdrop rather than covering it with UI furniture.

Positive reference:
- the Minato report at the end of Academy Kakashi Origin demonstrates useful hierarchy: Minato reads as compositionally important while other participants remain supporting presences.

That scene is a reference only. It is not reopened.

## Four-person scenes

Four present participants must all remain projectable.

A four-person scene must not:
- truncate the fourth actor;
- force one actor translucent over another;
- rely solely on `nth-child` staggered margins as the semantic composition model;
- discard authored/derived semantic anchors.

For the live Menma + Hinata + Kakashi + Masked Woman benchmark, the four people must read as four distinct physical presences occupying one place.

---

# 5. Collision and z-order safety

Normal conversation cards must not overlap unintentionally.

Required:
- focus enlargement checks/retains safe spacing;
- semantic-anchor reassignment may occur when focus changes;
- z-order changes do not visually merge one Character into another;
- no card may appear to phase through another;
- a newly entering/focused actor may not become translucent merely to resolve collision;
- if a responsive viewport cannot preserve intended card size without collision, reduce card scale modestly before allowing overlap.

Intentional overlap requires explicit approved composition authority.

The #469 MI-over-Menma presentation is a defect, not an accepted style.

---

# 6. Compact dialogue and narration surface

Existing 2026-09-22 geometry remains binding:

- dialogue/narration lane target: approximately **18–24vh maximum**;
- text must not become the dominant visual mass;
- one ordinary Story box = one readable paragraph / dramatic beat;
- ordinary Story boxes are not scrollable mini-documents;
- click-anywhere / Enter / Space remains routine advancement where the scene allows it.

When authored text contains multiple paragraph groups:
- split them into sequential cues;
- preserve exact wording/order;
- do not solve the problem by enlarging the box;
- do not solve it with internal scroll;
- do not collapse multiple dramatic beats into one giant surface.

This is a presentation/segmentation requirement, not permission to rewrite Writing.

---

# 7. Scene transition grammar

Use one reusable transition grammar.

## A. Full physical-location / Story-context exit

Use the established **black wipe** when:
- the Story occurrence ends and the player leaves that Story stage;
- the next context is a different physical location;
- the scene returns to the Konoha map after a clearly completed occurrence;
- another full Story context replaces the current one.

The black wipe is a perceptible transition, not a one-frame flash.

It must remain presentation-only and must not commit Story state.

## B. Same physical place, new scene/context

Use a lighter **soft crossfade / focus reset** when:
- physical location remains the same;
- scene/beat context changes enough that the player should perceive a new phase;
- travel is not implied.

The same-place transition should:
- retain the backdrop;
- briefly soften/reset focus;
- clearly separate contexts;
- avoid implying relocation.

Do not create bespoke transition effects per Origin.

---

# 8. Scene ending grammar

A conversation does not require a spoken goodbye.

However:

> **Conversation closure != verbal closure, but scene closure must be perceptible.**

At a terminal scene beat, use available presentation cues in causal order:

1. final authored line/narration resolves;
2. departing actor(s) visibly exit when authored/presentationally appropriate;
3. remaining actors settle/recompose;
4. dialogue/narration surface clears or resolves;
5. a compact end affordance may indicate the scene is complete;
6. apply the appropriate black wipe or same-place transition;
7. then reveal the next context/map.

Do not add filler prose merely to make the scene feel finished.

A final-cue hint such as:
`SCENE COMPLETE · CLICK ANYWHERE TO RETURN`
is acceptable as a presentation affordance when it does not compete with Story text.

---

# 9. Reduced-motion contract

Reduced motion must preserve:
- all present actors;
- current speaker identity;
- focus edge/state;
- scene-ending affordance;
- transition boundary;
- actor enter/exit semantics;
- all textual information.

Reduced-motion mode may:
- shorten or eliminate travel distance;
- shorten transition duration;
- settle immediately to final anchors.

Reduced-motion mode must **not** use listener greying/translucency as a substitute for motion.

For non-entry/non-exit cues such as:
- `FOCUS`;
- `REPOSITION`;
- `APPROACH`;
- `RETREAT`;
- `LUNGE`;
- `STRIKE`;
- `EVADE`;
- `RECOIL`;
- `HANDOFF`;
- `OBJECT_TRANSFER`;

a reduced-motion fallback must not fade an otherwise present actor from partial opacity merely because movement was reduced.

Opacity change remains legitimate for actual `ENTER` / `EXIT` / `FLEE` presentation.

---

# 10. #469 / #478 current hotspot acceptance

The current live hotspot is UI-acceptable only when all of the following are true:

1. **Listener integrity** — present non-speaking cards remain full colour and normal opacity.
2. **Speaker focus** — active speaker uses approximately +3–5% scale, 8–14px raise where possible, and bounded cyan/coloured focus edge.
3. **No collision** — Masked Woman / Menma and all other present actors remain visually distinct; no accidental overlap/translucency.
4. **Whole-stage staging** — four-person composition uses semantic placement/depth/offset rather than a default evenly spaced row.
5. **Compact text** — narration/dialogue remains paragraph-sized and inside the approximately 18–24vh lane.
6. **Full exit transition** — terminal hotspot exit to the Konoha map uses the canonical black wipe.
7. **Same-place transition** — same-location phase changes may use the reusable soft transition, not the full travel wipe.
8. **Visible closure** — player perceives the scene ending before the map replaces it.
9. **Reduced motion** — preserves all information and does not grey present actors.
10. **Architecture** — reuse the existing Scene Board / #33900 transition owner; no parallel renderer and no new image assets.

---

# 11. Current PR #475 audit note at UI closure

UI / Assets inspected the current `coding/phase-2-ce-hotspot-469` shared Scene Board source while closing #486.

Observed positive implementation movement:
- four physical actors are no longer truncated to three;
- ordinary present cards are full opacity / full colour;
- focused speaker has a cyan edge;
- paragraph pagination exists in the shared board;
- explicit terminal-scene hint exists;
- shared soft same-location transition exists;
- shared black-wipe transition owner exists.

Two concrete deltas remain against this authority unless a newer Coding commit has already superseded the inspected source:

### A. Speaker scale is slightly outside the locked band

Inspected shared source uses:
`scale(1.055)`

UI authority is:
`1.03–1.05`

Coding should use **<= 1.05** for ordinary speaker focus.

### B. Four-person layout is still too grid-derived

The inspected board still primarily composes the four actors as:
- a four-column grid;
- fixed `nth-child` vertical margins.

That is better than a flat queue, but it is not the final semantic-anchor composition contract.

The Scene Board should consume/map semantic actor anchors / current hierarchy rather than rely on ordinal CSS position as the primary staging model.

### C. Reduced-motion opacity fallback is too broad

The inspected reduced-motion rule applies an opacity transition to multiple non-entry/non-exit choreography classes.

That conflicts with the new rule that present characters must not be faded merely because motion is reduced.

Restrict opacity fading to actual entry/exit/flee semantics. Non-entry movement/focus should settle without listener-style fading.

These are presentation deltas only. They do not reopen CE semantics, Writing, Origin history, Knowledge, economy or event eligibility.

---

# 12. Final lock

> **Present actors stay visually alive.**

> **Speaker focus adds emphasis; it does not disable everyone else.**

> **The Scene Board uses the backdrop as a stage, not as wallpaper behind a queue.**

> **Same place gets a light context transition; leaving the scene gets the black wipe.**

> **A scene may end without goodbye dialogue, but it may not end invisibly.**

> **No new renderer. No new image assets. No frozen-Origin rewrite.**
