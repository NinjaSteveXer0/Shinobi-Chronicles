# Shinobi Chronicles — Pre-Alpha First-Hour Visual Coherence Contract

**Date:** 2026-10-07  
**Owner:** UI / Assets  
**Status:** **BINDING PRE-ALPHA PRESENTATION AUTHORITY — #561**  
**Primary priority:** Finish Shinobi Chronicles Alpha.  
**Source issue:** #561  
**Consumes:** #543, #490, #519, #533, #555, #559 and current live runtime authority.  
**Current audited baseline:** `1bea1ea8f8c67fc3014433d63c7f45ffd00745d9`

---

## 1. Purpose

This contract closes the current first-hour presentation gap without reopening gameplay semantics.

The Alpha has largely recovered functional authority across World / Region / Village navigation, My Clan, Exams, the Hokage Office / Chronicle Dispatch, Battle, Story and first-hour transitions. The remaining pre-Alpha problem is that several surfaces still read as prototype-era assemblies even when their underlying behavior is correct.

Canonical rule:

> **Visual coherence may reorganise presentation, hierarchy, spacing, emphasis and authored composition. It may not become a new semantic owner.**

This contract covers four connected presentation workstreams:

1. Hokage Office / Chronicle Dispatch visual recomposition;
2. Shinobi Exams visual redesign;
3. My Clan visual rethink after the current functional recovery;
4. shared prototype-exit rules consumed by the first-hour Alpha surfaces.

Story Scene Board choreography is activated under the companion #490 UI / Assets authority rather than duplicated here.

---

# 2. Global non-negotiables

The following existing semantic separations remain binding:

- identity != ownership;
- ownership != assignment;
- assignment != deployment;
- Rank != Progression;
- Promotion != Battle victory;
- Battle victory != Story completion;
- mission availability != mission assignment != mission launch;
- Knowledge != Access != Competence != Power != Mastery;
- presentation state != gameplay state;
- UI affordance != semantic permission.

Runtime owns dynamic values and actions. Static visual masters may provide framing/composition only.

No visual redesign may:

- create a second state store;
- invent Ryō, Rank, mission availability, party membership, rewards, progress, callbacks or eligibility;
- bypass fail-closed runtime checks;
- bake live values into static art;
- change current caller-return/navigation semantics;
- replace domain-owned mechanics with inferred UI behavior.

---

# 3. Hokage Office / Chronicle Dispatch — unified interactive hub

## 3.1 Current problem

Current implementation through `renderChronicleDispatchHub43110` is functionally integrated but visually reads as multiple adjacent technical slabs:

- mission/backlog panel;
- briefing panel;
- party/assignment controls;
- launch/action controls.

The owner-facing defect is not missing functionality. It is that the room does not yet read as **one coherent place where dispatch work happens**.

## 3.2 Selected presentation direction

The Hokage Office must become one spatially coherent Chronicle Dispatch hub.

The presentation should read in this order:

1. **Place / office context** — one authored visual field or code-owned environmental treatment;
2. **Mission backlog / available dispatches** — the actionable work entering the room;
3. **Selected mission briefing** — the currently inspected dispatch;
4. **Party / readiness** — the shinobi relationship to that dispatch;
5. **Primary action** — assign / launch / continue only when runtime says legal.

These are regions of one interface, not separate mini-applications.

## 3.3 Composition

Desktop target:

- preserve one dominant environmental/scene field;
- use one primary framing layer, not four independent bordered boxes;
- mission backlog occupies a clear edge/rail or integrated dossier zone;
- selected briefing owns the strongest central reading zone;
- party/readiness sits physically adjacent to the selected briefing or primary action so the relationship is visually obvious;
- primary legal action is always discoverable without requiring the user to scan a separate detached footer;
- secondary facts may use dividers, tabs, folds, seals, narrow rails or translucent internal regions rather than full independent slabs;
- no large dead black void introduced merely to look “clean.”

The runtime may remain code-first. A new static background is **not required** to satisfy this contract.

## 3.4 Environment art status

At this audit no verified standalone production Hokage Office backdrop path has been established for this surface.

Classification:

- **Hokage Office interactive-hub environment art:** `UNBOUND / UNKNOWN`

Therefore Coding must not guess a filename or repurpose Story art without explicit UI / Assets authority.

A code-owned atmospheric office treatment is valid for Alpha if it satisfies the composition rules above.

If UI / Assets later approves a physical backdrop, it must be classified and committed before Coding consumes it.

## 3.5 Interaction requirements

Preserve current runtime authority exactly:

- mission/backlog content comes from the existing mission source;
- briefing is projection of selected mission authority;
- party/assignment reads existing assignment/team state;
- primary action remains fail-closed;
- at least one executable action is visibly discoverable whenever current semantics allow one;
- closing or leaving the office uses current navigation authority;
- no decorative room state may manufacture mission state.

## 3.6 Hokage Office acceptance

At 1366×768 and 1920×1080:

- the interface reads as one room / one dispatch surface within three seconds;
- mission -> briefing -> party/readiness -> action has a visible spatial relationship;
- no required action is flush to the physical bottom edge;
- no live information is baked into presentation art;
- no panel is present solely because the prototype had a box there;
- current #555 functional diagnostics remain GREEN;
- owner browser review confirms the surface no longer reads as unrelated slabs.

---

# 4. Shinobi Exams — functional to designed

## 4.1 Current state

Current Exams are functional and materially improved by the recent Character Card rebalance. The redesign must preserve that progress.

The problem is presentation hierarchy and prototype residue, not mechanics.

## 4.2 Selected presentation direction

The Exams screen should read as:

> **one authored assessment surface centred on the selected shinobi and their current Exam stage**

rather than:

> **a technical panel around a list of systems**.

## 4.3 Required hierarchy

1. **Selected shinobi / Character Card** — primary human subject and strongest visual anchor;
2. **Current Exam stage / path** — what assessment is currently being considered;
3. **Stage list / progression read** — visible journey through the assessment, without implying Promotion;
4. **Current stage detail / eligibility / result projection** — runtime-owned;
5. **Begin Exam** — clear primary action where legal;
6. **Result Stage / Special Notification** — appears in the already-established result area without moving the core action unpredictably.

## 4.4 Character Card rule

The full collectible Character Card remains visually prominent.

Do not regress to a tiny identity thumbnail when one shinobi is the subject of the entire screen.

Current source already provides a large preview treatment and should be used as the lower bound for desktop prominence rather than compressed further to make room for decorative empty space.

## 4.5 Layout rules

- use the approved `UI/exams.png` master as presentation authority unless later explicitly superseded;
- runtime values, selected Character Card, result lines, progress and action states remain overlays;
- remove or mask duplicate labels if baked raster copy and runtime copy compete;
- reduce box-inside-box treatment where simple grouping/dividers provide enough hierarchy;
- keep the Result Stage visibly reserved but do not leave a huge permanent empty hole when no result is active;
- Special Notifications may expand without displacing Begin Exam off-screen or into unsafe bottom-edge space;
- stage dots/list must remain legible and clearly related to the selected stage;
- current action hierarchy must remain understandable at first glance;
- no redesign may imply that stage completion automatically grants Rank, Promotion, Skill ownership or Progression.

## 4.6 Responsive acceptance

At 1920×1080:

- Character Card feels deliberately featured;
- stage/navigation structure remains visible without dominating the character;
- primary action and result region are clearly distinct.

At 1366×768:

- no critical control is hidden behind browser/taskbar safe area;
- the Character Card remains readable as a card rather than collapsing to an icon;
- stage list and Begin Exam remain reachable without fragile scroll-position dependence;
- expanded Special Notification cannot make the primary action unreachable.

## 4.7 Exams acceptance

- current #519 semantics unchanged;
- current #559 Character Card improvement preserved or improved;
- one screen reads as a coherent Exam surface rather than stacked diagnostic panels;
- owner browser review confirms “designed game surface,” not “technical UI.”

---

# 5. My Clan — #543 visual rethink after functional recovery

## 5.1 Existing architecture remains

My Clan remains one system with two adaptive visual states:

- **Browse** — management overview, roster and formation;
- **Inspection** — selected shinobi operational detail.

No change to roster membership, ownership, assignment, deployment, staged formation, committed formation, save/load or return-context semantics is authorised here.

## 5.2 Visual objective

My Clan must stop reading like a desktop administration form.

The intended experience is:

> **a cohesive shinobi roster / squad-management surface where Character Cards are the primary visual identity and formation editing feels like team preparation.**

## 5.3 Shared shell

Browse and Inspection should share:

- one restrained Clan header / visual identity;
- one obvious close/return control in a consistent top-right safe area;
- one coherent task language;
- one formation/roster visual vocabulary;
- the same unsaved-change rules.

They must still be visibly different states, not two copies of one screen.

## 5.4 Browse state

Browse prioritises:

1. current formation / team arrangement;
2. owned Character Cards;
3. selected-card preview / relevant compact actions;
4. filters/search as secondary tools.

Required changes:

- remove the feeling of a giant top ribbon of form controls;
- convert search/filter/sort into a compact contextual task strip, drawer or grouped control cluster;
- formation sits in the upper or upper-middle primary zone and remains editable;
- Character Cards remain large enough to read as collectible identity objects;
- the right/lower detail area gains deliberate hierarchy rather than a large dead void;
- selected card may project compact identity / assignment-relevant context, but must not become another full Inspection panel;
- Save Formation feedback appears immediately adjacent to formation or its action cluster;
- Clear / Reset are visually separated from Save and never compete as equal primary actions.

## 5.5 Inspection state

Inspection prioritises:

1. selected full Character Card;
2. identity and current authoritative operational facts;
3. current loadout/skills/equipment summary where existing authority exposes them;
4. context actions close to the subject they affect.

Do not fill the panel with generated flavour text simply to occupy space.

The selected shinobi should visually dominate more than generic tool chrome.

## 5.6 Exit and unsaved state

- close control is always obvious;
- Escape routes through the same unsaved-change confirmation as visible close;
- Save / Discard / Keep Editing authority remains unchanged;
- exact map return context from the current functional repair remains untouched;
- no visual shortcut may bypass confirmation or caller restoration.

## 5.7 My Clan master-art treatment

Current production masters:

- `UI/my_clan_browse.png`
- `UI/my_clan_inspection.png`

remain valid presentation assets, but this #543 rethink may refine the code composition around them or later supersede them through explicit UI / Assets authority.

Until a replacement asset is approved and committed, Coding must not silently stop consuming the current masters where current authority requires them.

## 5.8 My Clan acceptance

At both 1366×768 and 1920×1080:

- Browse vs Inspection is obvious without reading a debug label;
- Character Cards are primary visual objects;
- formation is prominent and editable;
- Save response is immediate and adjacent;
- close is obvious;
- Escape cannot bypass unsaved confirmation;
- no hidden dead controls;
- no large autogenerated flavour block;
- no ownership/assignment/deployment semantic drift.

---

# 6. Prototype-exit rules for first-hour surfaces

A first-hour surface fails this contract if its primary visual read is any of:

- “browser form”;
- “terminal/debug panel” where not intentionally thematic;
- “several unrelated bordered boxes”;
- “large black area with controls floating in it”;
- “small character thumbnail plus lots of interface furniture” when a character is the subject;
- “static raster labels plus duplicate live labels fighting each other”;
- “important action sitting at the physical bottom edge.”

A surface passes when:

- the user can identify the place/task/subject quickly;
- the hierarchy follows the actual gameplay relationship;
- dynamic state feels integrated into authored presentation;
- decorative structure supports rather than competes with interaction;
- current semantics remain traceable to their canonical owner.

---

# 7. Runtime ownership map

| Surface | Existing canonical implementation owner | UI / Assets instruction |
|---|---|---|
| Hokage Office / Chronicle Dispatch | `renderChronicleDispatchHub43110` in `runtime/alpha-phase2-konoha-player-surfaces-43110.js` | Recompose current hub only; no second office/dispatch renderer |
| Shinobi Exams | current Exams renderer + `style.css` Exam presentation | Reframe current screen only; no second Exam system |
| My Clan | current adaptive Browse/Inspection renderer | Retrofit current adaptive renderer only; preserve return/unsaved state |
| Scene Board | `runtime/alpha-story-scene-board-33900.js` | Choreography grammar/benchmark under companion #490 authority; no second Story renderer |

---

# 8. Conformance / Golden requirements

Coding implementation must register watched paths under #528 and provide browser evidence.

Minimum viewport proof:

- 1366×768;
- 1920×1080.

Minimum routes:

- Konoha -> Hokage Office / Chronicle Dispatch;
- Konoha -> Exams;
- World/Village caller -> My Clan Browse -> Inspection -> return;
- one dirty formation close attempt;
- one four-participant Scene Board choreography benchmark through #490.

Automated GREEN does not replace Stephen’s visual/taste acceptance where Golden requires it.

---

# 9. Final lock

> **The first-hour Alpha must look like one authored game, not a collection of successful prototypes.**

> **Recomposition may change hierarchy, spacing, framing and emphasis; it may not change semantic ownership.**

> **Hokage Office becomes one integrated dispatch place, Exams becomes one authored assessment surface, and My Clan becomes a cohesive roster/formation interface with Character Cards as the visual identity.**
