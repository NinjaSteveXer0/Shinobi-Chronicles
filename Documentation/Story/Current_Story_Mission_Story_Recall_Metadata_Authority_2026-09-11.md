# Shinobi Chronicles — Current Story Mission / Story Recall Metadata Authority

**Date:** 2026-09-11  
**Owner:** Writing — Konoha  
**Status:** **BINDING WRITING / STORY RUNTIME-METADATA AUTHORITY — WORLD LOCATOR / CODING CONSUMPTION SEPARATE**

---

## 1. Purpose

The Missions surface is repurposed as **Current Story Mission / Story Recall** rather than a village/side-mission selector.

Writing owns the compact Story metadata that tells the player what current authored Story state they are in and what immediate unresolved pressure remains.

Writing does **not** own World map access, location identity, travel, opportunity hosting, map focus or locator projection.

This contract supplies machine-facing Story-recall inputs for World/Coding consumption without requiring them to scrape prose or invent summary/history.

Preserve:

- Story occurrence != World occurrence;
- Story destination != automatic travel/access;
- World Truth != observer Knowledge != presentation;
- authored summary != fabricated history;
- player intent != committed occurrence;
- developer authoring checkpoint != runtime-committed Chronicle history.

---

## 2. Machine-facing record

Recommended schema identifier:

`sc.storyRecall.v1`

A current Story-recall record may expose only fields supported by legitimate current Story/Chronicle state.

### Required identity fields

- `schemaVersion`
- `arcId`
- `arcName`
- `missionId`
- `missionTitle`
- `storyStateClass`
- `recapAnchorId`
- `currentObjective`
- `unresolvedImmediatePressure`

### Provenance / safe-recall fields

- `recapFactRefs[]`
  - exact committed Story occurrence / authoritative source refs supporting the concise recap;
- `completedHistoryRefs[]`
  - exact already-committed history refs safe to mention in a read-only recap;
- `knowledgeBasisRefs[]`
  - exact Knowledge / observer-facing evidence refs where the recap would otherwise risk exposing hidden truth;
- `resumeStorySceneId`
  - Writing-owned Story registration address only when an exact resumable scene exists;
- `currentChoiceId`
  - optional exact unresolved protagonist choice address;
- `choicePromptSummary`
  - optional concise description of what the protagonist is deciding, without selecting an answer;
- `storyLineageRef`
  - current authoritative Story/Chronicle lineage where runtime owns one.

### Optional safe display fields

- `recapHeadline`
- `recapBullets[]`
- `objectiveLabel`
- `pressureLabel`

These are presentation-safe projections from factual inputs. They do not become new history merely because displayed.

---

## 3. `storyStateClass`

Allowed semantic classes for Writing projection:

### `active`

The mission is factually active and has a legitimate current Story continuation.

### `awaiting_player_intent`

The mission is active but Story is deliberately stopped at a meaningful Origin Character decision.

This class must not imply that any displayed option has been selected.

### `awaiting_resolution`

The protagonist/NPC intent has been committed far enough to require another resolver such as Battle/World/another owning system before Story can continue.

This class must not invent the resolver's result.

### `interrupted`

Current Story lineage remains unresolved but cannot continue until a legitimate later occurrence restores actionability.

### `completed`

The exact mission-completion occurrence has committed.

Mission completion does not automatically mean Progression, Promotion, reward or Battle victory.

### `authoring_checkpoint`

Developer/Writing drafting state only.

This is **not player-facing runtime history** and must never be used by Coding as if it were committed Chronicle state.

It exists so successor Writing work can recover an exact authoring stop without fabricating that the draft already happened in-game.

---

## 4. Factual recap rule

A Story Recall recap must be reconstructable from exact factual references.

Safe summarisation rule:

> **Summarise committed facts; do not complete missing causality.**

The recall layer may compress wording but may not add a new claim such as:

- hidden enemy identity;
- mastermind/allegiance;
- motive;
- secret organisation ownership;
- undiscovered location;
- unseen Battle outcome;
- uncommitted player choice;
- NPC intent that was never resolved/observed;
- future route identity;
- fabricated relationship state.

If the exact factual support is unavailable, omit the claim rather than filling the gap with plausible prose.

A generated/contextual recap is a **consumer** of committed state, never a free Chronicle writer.

---

## 5. Knowledge-safe recall

Story Recall is observer-facing presentation.

Therefore:

> **World Truth != observer Knowledge != presentation.**

A factual World secret may still be illegal to show in the recall dossier if the current Origin Character does not legitimately know it.

Examples:

- `Root Headquarters exists` in World authority does not authorise a current player recap saying `Investigate Root Headquarters` before legitimate discovery/actionability;
- a hidden operative's Registry identity must remain bounded if Story only knows an unknown courier/operative;
- Battle presence does not reveal allegiance;
- testimony may be recalled as testimony without being restated as proven World Truth.

Where observer entitlement matters, use `knowledgeBasisRefs[]` or omit the detail.

---

## 6. Completed-history recall

The Missions dossier may contain read-only history, but only from committed history.

`completedHistoryRefs[]` may reference prior completed missions / exact committed occurrences relevant to understanding the current mission.

Do not:

- reconstruct an unplayed developer route for another Chronicle;
- show rejected/superseded Writing drafts;
- convert authored possibility into historical fact;
- convert Battle intent into outcome;
- convert route affinity into a named route before current authority legitimately does so.

Historical recap may be concise. It does not need to reproduce long-form scene prose.

---

## 7. Current objective and pressure

`currentObjective` is the immediate player-facing Story objective, not a hidden system goal.

`unresolvedImmediatePressure` states why the mission remains active now.

Good examples:

- `Determine which leak pattern to investigate first.`
- `Protect the witness while the team determines whether the transfer order is legitimate.`
- `Return to the lower chamber after access becomes safe.`

Bad examples:

- `Discover that the villain is manipulating Konoha.` before the character knows that;
- `Choose the Reform route.`;
- `Go to Root Headquarters.` when location/access is not legitimate;
- `Defeat the enemy.` if the actual Story objective is evidence protection and Battle is only one resolver.

---

## 8. Story Recall vs World locator

Writing may publish:

- current mission identity;
- current Story scene/resume address;
- current objective;
- immediate pressure;
- factual recap refs;
- a Story-side destination requirement only when already legitimately authored.

Writing must **not** publish or invent:

- map hotspot ID;
- World location identity not already supplied by World;
- access predicate;
- travel state;
- `RETURN TO MAIN MISSION` target geometry;
- Main Story halo/icon/marker;
- hidden map reveal.

World consumes this Story metadata and owns the exact current Story destination/opportunity locator reference.

Locator/focus != teleport.

---

## 9. Story Recall vs player agency

When `storyStateClass = awaiting_player_intent`:

- `currentChoiceId` identifies the unresolved choice;
- `choicePromptSummary` may explain the decision;
- the dossier may recall autonomous NPC views/intent only where they were legitimately perceived;
- the dossier must not imply the Origin Character agreed with anyone;
- no choice option becomes history until legitimately selected and resolved.

The Missions surface is therefore safe to leave and return to without silently choosing for the player.

---

## 10. Current Arc-2 Mission-2 registration

Writing registers the current revised mission identity as:

- `arcId = arc2`
- `arcName = Arc 2`
- `missionId = arc2_m2_the_leak`
- `missionTitle = THE LEAK`

No more specific Arc-2 display title is invented here because current durable Writing authority has not fixed one.

Mission function remains governed by:

`Documentation/Story/Arc2_Mission2_The_Leak_Revised_Writing_Authority_2026-09-11.md`

Current Story authoring grammar remains governed by:

`Documentation/Story/Interactive_Story_Player_Agency_Character_Autonomy_Cadence_and_Earned_Possibility_Authority_2026-09-11.md`

---

## 11. Current developer-Menma authoring checkpoint — NOT runtime history yet

Stephen explicitly paused before confirming the latest rewritten Hokage-office scene.

Therefore current Writing state is recorded only as an **authoring checkpoint**, not as committed Story history.

Machine-safe authoring checkpoint:

```text
schemaVersion = sc.storyRecall.v1
arcId = arc2
arcName = Arc 2
missionId = arc2_m2_the_leak
missionTitle = THE LEAK
storyStateClass = authoring_checkpoint
recapAnchorId = authoring_arc2_m2_hokage_office_first_theory_choice
resumeStorySceneId = scene_arc2_m2_hokage_office_leak_analysis_draft
currentChoiceId = choice_arc2_m2_first_leak_interpretation_draft
currentObjective = Determine which interpretation of the leak pattern Menma wants to prioritise before the investigation moves into the field.
unresolvedImmediatePressure = Conflicting rumours connected to the recent Sazan-operation aftermath appear to be escaping through different knowledge/access channels; ANBU/ROOT suspicion may be raised but is not proven.
```

Authoring-only NPC positions currently proposed in the draft include:

- Mikoto: different wording/audiences suggest targeted narratives;
- Hinata: different factual blind spots suggest different source Knowledge;
- Kagami: trace the rarest true detail back through access;
- Mukai: watch for whoever observes Konoha's investigative response;
- Anko: ANBU/ROOT suspicion is worth confronting rather than politely ignoring.

**These positions do not become player-facing completed-history recap until Stephen confirms the scene and exact Story occurrences/scene registrations are made durable.**

Menma has made **no Mission-2 first-choice commitment** at this checkpoint.

---

## 12. Runtime publication requirement once the scene is confirmed

When the current Mission-2 scene is approved for runtime authority, Writing should replace the authoring-only checkpoint with exact machine-addressable Story registrations / committed occurrence addresses and then publish the live recall record with:

- `storyStateClass = awaiting_player_intent` at the unresolved first choice;
- exact `recapFactRefs[]` for street-gossip / recall / briefing / observed NPC analyses that actually survive final authoring;
- exact `completedHistoryRefs[]` for already committed Arc-1 / Arc-2 Mission-1 history safe for this Chronicle;
- exact `knowledgeBasisRefs[]` where ANBU/ROOT/other sensitive information is Knowledge-gated;
- final `resumeStorySceneId` and `currentChoiceId`;
- no selected Menma interpretation until Stephen/player chooses.

Do not fabricate occurrence IDs retroactively before the scene is confirmed.

---

## 13. Example runtime projection shape

Illustrative shape only; values must come from current authoritative Story state:

```js
{
  schemaVersion: "sc.storyRecall.v1",
  arcId: "arc2",
  arcName: "Arc 2",
  missionId: "arc2_m2_the_leak",
  missionTitle: "THE LEAK",
  storyStateClass: "awaiting_player_intent",
  recapAnchorId: "<authoritative-recap-anchor>",
  recapFactRefs: ["<committed-occurrence-ref>"],
  completedHistoryRefs: ["<committed-history-ref>"],
  knowledgeBasisRefs: ["<observer-knowledge-ref>"],
  resumeStorySceneId: "<registered-story-scene>",
  currentChoiceId: "<unresolved-choice-id>",
  choicePromptSummary: "<bounded-player-facing-choice-summary>",
  currentObjective: "<current-player-facing-objective>",
  unresolvedImmediatePressure: "<current-unresolved-pressure>"
}
```

Coding must not infer omitted fields from mission title, prose, filenames, old UI rows or developer playthrough memory.

---

## 14. Persistence / refresh boundary

Story Recall is a read-only projection of committed state.

UI open/close/refresh/save/load must not:

- reroll recap wording into different facts;
- commit Story occurrences;
- select an option;
- change current objective;
- create Knowledge;
- discover a location;
- advance a mission;
- regenerate a lost causal lead.

If a concise generated recap is used, semantic facts and refs remain stable even if phrasing varies.

---

## 15. State / ownership boundary

This document closes the Writing-owned **Current Story Mission / Story Recall metadata** contract requested by CE coordination.

It does not claim:

- World locator authority;
- map/discovery implementation;
- Coding implementation;
- runtime validation;
- Golden/regression GREEN;
- final confirmation of the current Mission-2 Hokage-office prose draft.

**design closed != implemented != runtime validated != Golden/regression GREEN**

---

## 16. Downstream consumption

World / Missions / Events may now consume this contract for the queued consolidated map/discovery/activation package and define the exact World-side `RETURN TO MAIN MISSION` / `LOCATE STORY` destination/opportunity reference.

Until the current Mission-2 scene is confirmed, World must not treat the authoring checkpoint's proposed scene as a committed hidden-location or opportunity reveal.

Coding should consume the Story Recall schema only after Story/World publish exact runtime records/locator refs for the relevant current mission state.
