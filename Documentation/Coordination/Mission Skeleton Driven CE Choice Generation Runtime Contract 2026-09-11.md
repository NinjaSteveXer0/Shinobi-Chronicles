# Shinobi Chronicles — Mission-Skeleton-Driven CE Choice Generation Runtime Contract

**Date:** 2026-09-11  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING DESIGN / RUNTIME CONTRACT — IMPLEMENTATION + VALIDATION PENDING**

## 1. Purpose

Shinobi Chronicles live Story should not depend on a Writing session improvising every playable scene and every player-facing option in sequence.

Writing authors the Arc and Mission skeleton. Chronicle Engine consumes that approved skeleton plus current committed Chronicle state and produces the legitimate live realisation, including the current player decision space.

Canonical shorthand:

> **Writing authors where the mission must go. CE determines what this Chronicle can legitimately do next.**

This extends, and does not replace:

- `Documentation/Coordination/Structured Story Autonomy Arc 1-3 Route History and Authored Geography Contract 2026-09-10.md`;
- `Documentation/Story/Interactive_Story_Player_Agency_Character_Autonomy_Cadence_and_Earned_Possibility_Authority_2026-09-11.md`;
- `Documentation/Story/Arc_Authoring_Workflow_and_Arc2_Full_Reset_Authority_2026-09-11.md`.

## 2. Writing ownership — approved mission skeleton

For each approved mission, Writing owns the durable mission blueprint, including where relevant:

- `arcId` / `missionId` / mission title;
- mission dramatic function;
- entry conditions;
- required authored invariants / historical anchors;
- required macro geography / destinations;
- required participants or institutions only where Story truly fixes them;
- ordered or partially ordered mandatory beats;
- optional beat families / branch space;
- intended escalation and major pressures;
- resolver seams such as Battle, investigation, travel, acquisition, promotion or other owning-system calls;
- authored facts that must not be contradicted;
- prohibited shortcuts / prohibited premature conclusions where needed;
- mission completion / failure / abort conditions;
- durable outputs required for later missions/arcs;
- bridge into the next mission.

Writing does **not** need to pre-author every exact sentence or every exact runtime choice for every possible Chronicle.

Approved mission skeleton != fixed protagonist decisions.

## 3. CE ownership — live decision-space generation

At each unresolved player-facing decision beat, CE consumes:

- the pinned mission skeleton/version;
- current beat / mandatory-anchor progress;
- exact committed Chronicle occurrences;
- current protagonist formal Rank and representation separately;
- current team/participant assignment and availability;
- bounded observer Knowledge / beliefs / inferences;
- relationships / Shared History where material;
- current world / location / access / opportunity state;
- exact learned/available capabilities from owning systems;
- current mission objective / unresolved pressure;
- autonomous NPC intent where legitimately formed and reasonably perceivable;
- prior choices and consequences in the current mission/Arc.

From that state CE builds an **eligible protagonist-intent set**.

The player-facing choices are projections of those eligible intents, not predetermined outcomes.

Examples of intent families may include, where legitimate:

- investigate / question / observe;
- follow / intercept / withdraw / reposition;
- persuade / threaten / deceive / disclose / conceal;
- protect / rescue / capture / release;
- use an exact learned capability;
- request or refuse institutional support;
- agree with, combine, challenge or reject another participant's proposed course;
- initiate Battle where lawful and contextually possible;
- another mission-specific authored intent family.

No universal choice catalogue is implied. Only current legitimate possibilities are surfaced.

## 4. Choice semantics

Each generated/presented choice should correspond to a machine-addressable protagonist **intent**, not prose that pre-commits the result.

Conceptual choice record:

```text
{
  choiceId,
  missionId,
  beatId,
  intentType,
  intentPayload,
  eligibilityBasis[],
  presentationText,
  generatedFromStateRef,
  choiceSetId
}
```

`presentationText` may vary with Character voice, current Rank, relationships and context.

The semantic intent remains separate from wording.

Preserve:

- selected choice != guaranteed occurrence;
- capture intent != capture result;
- threaten != target becomes afraid automatically;
- attack != kill;
- investigate != discover the hidden truth automatically;
- choose a Skill route != successful Skill resolution;
- dialogue wording != World Truth.

## 5. Player-facing cadence

The runtime Story surface should preserve the established interactive rhythm:

`scene beat -> character reactions -> autonomous NPC intent where perceivable -> player choices -> STOP -> player selection -> owning resolver -> committed consequence -> next beat`

The game must not present internal authoring prompts, model instructions, correction notes, hidden state dumps or debugging explanations as player-facing Story.

The player should receive:

1. usable Story prose / scene presentation;
2. any relevant perceivable NPC reaction/intent;
3. clean, concise player-facing choices.

Not:

- a prompt explaining Writing mistakes;
- raw mission-authoring notes;
- a detached choice list with no usable scene context;
- a pre-written ending followed by meaningless options.

## 6. Mission skeleton is a hard drift boundary

CE may vary the causal route and exact scene realisation, but it may not silently abandon the approved mission skeleton.

Runtime must not:

- declare mission completion before the authored completion predicate is satisfied;
- skip a mandatory historical anchor merely because generated prose implied it happened;
- create an ending that contradicts the approved Arc/Mission spine;
- jump to the next mission because a generated scene felt conclusive;
- resurrect superseded mission drafts;
- convert one Chronicle-specific branch into universal Story authority.

If the current Chronicle cannot legitimately satisfy the next required invariant from existing state, CE must:

1. consume an explicitly authored fallback/bridge if one exists; or
2. fail closed as a content/authority gap.

It must not invent missing history to force progression.

## 7. Choice-set stability / anti-reroll

A generated unresolved decision is semantic Chronicle state.

UI reopen, save/load, browser refresh, hover/focus, or presentation rerender must not create a new choice field merely to offer different options.

For an unresolved beat, runtime should either:

- persist the committed `choiceSetId` and exact eligible semantic choices; or
- deterministically reconstruct the same choice set from an immutable realisation receipt.

A materially changed committed Chronicle state may legitimately supersede an unresolved choice set, with explicit provenance.

Canonical rule:

> **New history may change what can be chosen. Looking at the choices may not.**

## 8. Generated wording / templates / future language generation

CE choice generation is a semantic system first.

Alpha does **not** require unrestricted live language-model prose generation.

A safe implementation may use:

- authored scene fragments;
- authored choice-language templates;
- Character voice templates;
- deterministic contextual interpolation;
- bounded variant selection;
- later optional contextual language generation if separately authorised.

Whatever expression layer is used:

- semantics resolve first;
- generated/displayed text never creates new World Truth;
- wording must remain observer-safe;
- the expression layer may not invent Skills, Rank, relationships, Knowledge, identity, allegiance, outcomes or history.

## 9. Rank / representation / party context

Choice wording and eligibility may consume actual Chronicle formal Rank, current representation, mission role and participant state separately.

A collectible title/rank label does not manufacture formal Chronicle Rank or institutional authority.

A higher-capability or higher-stage representation may legitimately create additional capability-backed choices while current formal Rank still controls Rank-owned permissions and institutional reactions.

Preserve:

> difficulty != representation != formal Rank != appointment != capability

## 10. Autonomous NPC choices

CE may resolve NPC intent from legitimate NPC Knowledge, relationships, role, motive, capability and current history.

NPCs are not extra player choice slots.

Where an NPC's intended course is reasonably perceivable before protagonist commitment, runtime should surface it before the player selects the protagonist's response.

Preserve:

> protagonist intent != party command

## 11. Freeform / authored alternative

Where UI/runtime later supports a player-authored alternative, CE may attempt to map that input onto an existing legitimate semantic intent or reject/fail closed where the requested action is impossible/unsupported.

Freeform text does not grant arbitrary authority to invent facts or bypass owning resolvers.

## 12. Realisation receipt

Each committed decision beat should preserve enough provenance for save/load, debugging and deterministic replay, conceptually including:

- mission skeleton/version;
- beat/invariant ref;
- current Story realisation ref;
- causal source occurrence refs;
- relevant Knowledge / relationship / role / capability basis;
- eligible choice IDs/intents;
- exclusion reasons where practical;
- selected protagonist intent;
- owning resolver call/result refs;
- resulting consequence refs;
- successor beat or mission-state ref.

Committed factual history is replayed/reconstructed, never rerolled.

## 13. Arc 2 reset reconciliation

Current Writing authority at commit `499564f3ed15efba1035e7e94f79cbcb5e82c25c` resets Arc 2 to pre-mission-plan state and supersedes the recent Unknown Boy / `THE LEAK` live branch as active Story authority.

Therefore this contract must be applied to the **new approved Arc 2 mission skeleton once Stephen approves it**, not to force the discarded branch back into runtime.

Historic discarded prose may be mined for reusable ideas only through deliberate new authoring; it is not current Story truth.

## 14. Implementation posture

**Design:** CLOSED by this contract.

**Writing:** should produce approved Arc + mission skeletons, not attempt to serve as the permanent live runtime choice engine.

**Coding/runtime:** QUEUED after current immediate Alpha/Arc-1 blockers unless Stephen explicitly reprioritises. Runtime implementation should extend existing Story/Chronicle machinery rather than create a second Story history system.

Minimum future implementation proof should demonstrate:

- one approved mission skeleton drives multiple Chronicle-relative legitimate choice sets;
- current Rank/Knowledge/team/history alter choice eligibility and wording without rewriting mission invariants;
- unresolved choice set survives save/load/reopen without reroll;
- selecting a choice commits intent, then owning resolver determines outcome;
- mandatory mission beats cannot be skipped by presentation/generated prose;
- mission cannot complete from an unauthorised generated ending;
- NPC autonomous intent remains separate from player command;
- observer-hidden truth does not leak through generated choices;
- same committed history reproduces the same semantic decision state.

## 15. Canonical summary

> **Arc plan gives the campaign shape. Mission skeleton gives each mission its guardrails. CE generates the legitimate next decision space. The player chooses intent. Owning systems resolve what actually happens. Chronicle history changes what becomes possible next.**

Preserve:

- skeleton != exact scene script;
- generated choice != generated outcome;
- choice wording != semantic intent;
- Story invariant != fabricated causal carrier;
- UI refresh != choice reroll;
- generated prose != World Truth;
- current mission != permission to ignore the approved Arc;
- player choice != NPC obedience;
- design closed != implemented != runtime validated != Golden GREEN.
