# Shinobi Chronicles — Story Performance + Backdrop Authoring Interface

**Date:** 2026-10-02  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CROSS-OWNER AUTHORING CONTRACT — PRE-ALPHA POLISH / NEW + REOPENED STORY IMMEDIATE; FROZEN ORIGINS DEFERRED**

---

# 1. Purpose

Shinobi Chronicles Story is presented through a visual Scene Board, not through prose floating independently of the screen.

Writing therefore owns more than dialogue/narration wording. Where materially relevant, Writing must also author the **performance intent** that the Scene Board is expected to communicate.

UI / Assets owns the reusable visual grammar and the authoritative inventory/metadata describing which backdrops exist and what physical views they actually represent.

Coding owns faithful execution of those approved authoring inputs through the canonical shared Scene Board renderer.

Canonical:

> **Writing authors what the scene is doing. UI defines how the Scene Board can express it. Coding executes that contract.**

> **Writing works with the approved visual stage; it must not write around it as though the backdrop and cards do not exist.**

---

# 2. Presentation does not create Story truth

Preserve:

> **Animation presents authorised Story truth; animation does not create Story truth.**

> **Backdrop availability does not create Story geography.**

> **Card motion does not create factual action unless Writing/Story already authorises that action.**

Examples:
- a recoil primitive may project surprise without meaning factual retreat;
- a short pace may project restless thought without moving the Character to a new location;
- a persistent EXIT/FLEE may only be used where the Character actually leaves;
- an alternate-angle backdrop may change camera/viewpoint without changing physical location;
- an asset existing in GitHub does not authorise Writing to invent a new location merely to use it.

---

# 3. Writing must author screen-performance intent

For new Story, Hotspots, Missions, Events and any explicitly reopened/polished Story scene, Writing should provide enough stage intent that Coding does not have to invent performance.

Use ordinary Story language / semantic choreography, not CSS or implementation coordinates.

Where relevant, each scene or beat should identify:

## A. Environment
- exact approved backdrop asset path where known;
- environment/location identity;
- time-of-day/state where materially relevant;
- whether this is the same physical location with a different approved angle;
- whether the scene starts already in-place or arrives from another context.

## B. Initial blocking
- who is already present;
- who enters;
- broad side/field relationship: left / centre / right / foreground / recessed support;
- group formation where meaningful;
- who currently owns visual attention.

## C. Physical performance
- authored enter/exit/traverse;
- meaningful step forward/back;
- approach/retreat/pass-by;
- pacing, recoil, lean, turn, pause/stillness, object handling or another physical beat where it carries Character/performance;
- group reaction where multiple Characters visibly respond;
- recompose/settle after a major movement.

## D. Speaker / reaction emphasis
- who is speaking;
- who is visibly reacting;
- whether a reaction is large, restrained, delayed, simultaneous, asymmetric, nonverbal or absent;
- whether stillness is the intended performance.

## E. Scene closure
- who remains;
- who actually leaves;
- whether closure is verbal or nonverbal;
- whether the next context is same-place/new-scene or a different location/full Story exit;
- any authored final visual beat before transition.

Writing does **not** need to specify pixel distances, durations, easing curves, z-index, CSS transform values or renderer implementation.

---

# 4. Writing must not use animation as an emotion dictionary

Writing may describe the intended physical expression, but must not reduce Characterisation to universal motion tokens.

Preserve:

> **Animation primitive != emotion.**

> **Same emotion != same motion.**

> **Same semantic speech act != same performance.**

Authoring question:
> **What does this specific Character physically do here, given personality, Knowledge, pressure, relationship, immediate want and scene geometry?**

Examples:
- one Character may laugh by leaning back;
- another may give one tiny shoulder movement;
- another may shake visibly;
- another may remain completely still and let the line carry it;
- two Characters reacting together may use different but coordinated motion.

Do not mechanically append gestures to every line.

---

# 5. UI / Assets owns a GitHub Backdrop Authoring Catalogue

UI / Assets must maintain durable GitHub-facing metadata for approved/reusable Story backdrops so Writing can author **with** the actual visual library.

This catalogue is an authoring interface, not merely a file list.

Each backdrop entry should provide, where known:

- exact asset path;
- canonical environment/location family;
- sub-location / physical viewpoint;
- time of day / lighting state;
- camera angle / view distinction;
- continuity family: which other assets represent the same physical place;
- authoring status;
- known Story bindings;
- safe optional use cases;
- staging affordances / obvious card-safe zones where useful;
- important visual landmarks that Writing may legitimately reference because they are actually visible;
- transition relationship to sibling views, e.g. `SAME_LOCATION_ALTERNATE_ANGLE`;
- restrictions / misleading substitutions to avoid;
- provenance / approval note where needed.

Do not require speculative metadata where the asset truth is unknown. Mark it UNKNOWN rather than guessing.

---

# 6. Backdrop authoring statuses

Use a clear status vocabulary so Writing knows what it may consume.

## BOUND

Exact Story/scene binding is already approved.

Writing must use the exact binding unless newer authority changes it.

## AVAILABLE SAME-LOCATION VARIANT

An approved alternate angle/view of the same physical location/time family exists.

Writing may use it to improve staging, visual rhythm or scene distinction **without changing Story geography/time/causality**, provided the exact asset path is named.

This is the main category for Stephen's optional flavour / same-location-different-angle assets.

## AVAILABLE REUSABLE ENVIRONMENT

Asset is approved as a reusable environment but is not pre-bound to one exact scene.

Writing may propose/use it when the authored scene independently belongs to that same location/time/environment family.

## CANDIDATE / NEEDS CONFIRMATION

Asset exists and may visually fit, but exact Story mapping is not closed.

Writing may cite it as a candidate but must not silently hard-bind it.

## UNBOUND / UNKNOWN

Asset exists or a location is known, but authoritative mapping is insufficient.

Do not guess.

Canonical:

> **Asset exists != scene binding.**

> **AVAILABLE SAME-LOCATION VARIANT may enrich presentation; it may not rewrite Story.**

---

# 7. Writing must consult the backdrop catalogue before finalising visual Story direction

For any scene that materially depends on environment or stage geography, Writing must:

1. inspect current backdrop catalogue / exact asset authority;
2. preserve already-bound Story geography and time;
3. select an approved exact asset where available;
4. consider an approved same-location alternate angle when it improves visual storytelling;
5. author blocking/action that makes sense for the visible environment;
6. avoid narrating visual facts that contradict the selected backdrop;
7. explicitly flag a missing view when the current asset library genuinely cannot support the authored scene.

Do not reverse the process into:

> **asset exists -> invent a scene so the asset gets used**

but also do not tolerate:

> **approved useful backdrop exists -> Writing ignores it and authors around a blank imaginary stage**.

The target is:

> **Story truth chooses the physical place; the approved visual library helps Writing stage that truth well.**

---

# 8. Alternate-angle / same-place storytelling

Same-location alternate angles are valuable Story tools.

They may be used to:
- distinguish a new conversational beat without implying travel;
- move emphasis from group-wide blocking to a two-person exchange;
- stage arrival/departure from another side of the same place;
- avoid repetitive composition;
- reveal a visible environmental landmark from another approved view;
- support a same-place transition;
- create visual rhythm across a longer scene.

They must not be used to imply:
- travel that never happened;
- a different district/building;
- a different time of day unless approved;
- a factual object/landmark that is absent from that backdrop;
- a new Story occurrence merely because a pretty angle exists.

---

# 9. Coding consumption rule

Coding should not invent card acting or backdrop selection to make a scene feel alive.

Consume:
- Writing's authored performance intent;
- UI's approved choreography grammar;
- UI's exact backdrop catalogue/bindings;
- current semantic Story authority.

If Writing requests a performance the shared renderer cannot safely express:
- preserve semantic truth;
- use the closest approved primitive only where meaning remains intact;
- otherwise route the capability gap to UI/Assets rather than silently substituting a semantically misleading motion.

If a requested backdrop is not approved/available:
- do not invent a filename;
- do not silently substitute a vaguely similar environment;
- consume the current fallback authority only where one exists;
- otherwise route the unresolved mapping.

---

# 10. Choreography authoring interface

Writing may use semantic choreography descriptions or UI-approved authoring labels once #490 closes them.

Useful categories may include:

- team/group enter;
- leader-forward/support-recessed formation;
- staggered entry;
- pass-by / traverse;
- step forward/back;
- lean;
- short pace;
- attention turn;
- recoil;
- bounce / shake / tilt where Character-appropriate;
- object handoff;
- approach/retreat;
- settle/recompose;
- actual exit/flee;
- stillness / hold;
- speaker focus.

Exact token names remain UI/Coding-owned.

Writing owns the **performance meaning**.

---

# 11. Backdrop + choreography acceptance gate for Writing

Before new/reopened Story is considered presentation-ready, Writing should be able to answer:

1. What exact environment/backdrop is the player seeing?
2. Is that backdrop actually approved for this location/time?
3. If an alternate angle exists, did we deliberately choose whether it improves this beat?
4. Where are the Characters physically arranged?
5. Which movements/reactions matter enough to show rather than narrate?
6. Does each physical beat fit the Character rather than a universal animation shorthand?
7. Is the screen doing work that prose no longer needs to explain?
8. Does the scene visibly close/recompose/transition?
9. Can Coding implement the intended motion through the shared Scene Board without inventing Story?
10. Would reduced-motion presentation preserve all semantic information?

If Writing cannot answer these because UI metadata/capability is missing, route the missing asset/presentation information rather than guessing.

---

# 12. Phase-1 freeze / Pre-Alpha polish boundary

This contract does **not** reopen the ten Academy Origins now.

Current frozen Origin semantics/prose remain frozen unless Stephen explicitly reopens a bounded presentation pass or a reproduced regression requires repair.

Apply immediately to:
- new Hotspots;
- new World Events;
- new Missions / Arc content;
- future Story;
- any scene currently open for correction;
- any explicitly reopened presentation pass.

Queue for final Pre-Alpha polish:
- Kakashi Origin animation smoothness/choreography recovery through the canonical Scene Board;
- broader Origin choreography enrichment after one shared benchmark is owner-approved;
- optional same-location/alternate-angle backdrop usage where it improves already-closed scenes without changing Story truth.

Preserve:

> **Origin Story frozen != presentation grammar forbidden forever.**

> **Final polish may improve staging/animation/backdrop use without rewriting Origin history.**

---

# 13. Ownership summary

**Writing owns:**
- Story truth;
- dialogue/narration;
- Character-specific performance intent;
- scene blocking intent;
- exact selected backdrop reference when authoritative;
- scene closure intent.

**UI / Assets owns:**
- backdrop inventory/catalogue metadata;
- exact visual asset availability/coverage;
- reusable Scene Board choreography grammar;
- stage anchors/safe composition;
- speaker-focus/presentation behaviour;
- transition presentation.

**Coding owns:**
- faithful canonical runtime execution;
- sequencing/timing/easing implementation;
- persistence-safe rendering;
- reduced-motion implementation;
- no duplicate renderer/patch stack.

**CE / Codex / Coordination owns:**
- cross-system non-collapse;
- conflicts between Story truth, asset truth and runtime projection;
- reusable semantic boundaries.

---

# Final lock

> **Shinobi Chronicles Writing is screen-aware authoring. It must write for the Character Cards and the real backdrop that the player will see, including meaningful physical performance where the scene needs it. UI / Assets must expose enough durable backdrop and choreography information for Writing to do that deliberately. Coding then performs the authored scene; it does not invent the acting, geography or emotional meaning on Writing's behalf.**