# Shinobi Chronicles — World Production Integration Surface Operating Boundary

**Date:** 2026-09-10  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING ALPHA COORDINATION — WORLD MAY SCALE INTO PRIMARY INTEGRATION SURFACE WITHOUT COLLAPSING DOMAIN OWNERSHIP**  
**Source:** Stephen direction to CE / Codex / Coordination, 2026-09-10

## 1. Coordination decision

Shinobi Chronicles has reached the production phase where previously separate systems must become one playable world rather than remain isolated contracts.

World / Missions / Events is therefore expected to become a large Alpha production workspace. That growth is intentional.

The governing principle is:

> **World is where systems meet; it is not where their ownership collapses.**

World may assemble locations, maps, secret areas, characters, contextual Skills, seals, weapons/items, Knowledge state, Story conditions, Chronicle history and encounter/event opportunities into playable situations, while each contributing system keeps its existing semantic authority.

This is an integration/composition responsibility, not permission to recreate Registry, Acquisition, Progression, Combat, Skills, Items, Rank, Story or CE inside World.

---

## 2. World-owned authority

World / Missions / Events may own and author, within existing contracts:

- stable world locations and regional/subregional bindings;
- world-map and regional-map semantic anchors consuming approved geometry;
- world occurrence identities and factual World source/object/location bindings;
- hotspot/event/opportunity families and their contextual hosting;
- event eligibility inputs that are genuinely World-owned;
- causal availability, suppression, expiry and environmental/world-state consequences;
- secret-area existence, physical placement and world-state discovery/access context, while respecting Knowledge and capability boundaries;
- contextual activity surfaces such as exploration, investigation, training opportunities, travel encounters and non-Story world activity;
- mission/world opportunity hosting where Writing supplies mandatory Story anchors;
- factual environmental/object state used by Combat, Story, Skills or Progression;
- decision-sensitive reward evaluation and World-owned non-loot consequence families where separately authorised;
- participant presence/context requests where exact participant identity comes from Registry/World authority;
- Chronicle-facing factual occurrence/consequence requests that are resolved by the owning domain.

World may become very large because it carries many cross-domain references. Size is not itself an architecture defect.

---

## 3. What World consumes but does not own

### Characters / identities

Registry / PL / Rank owns stable person/entity identity, representation addressing, Base Stats, Base PL and formal Rank.

World may place, encounter, move, hide, reveal, host or reference those people/entities. It must not mint or mutate identity merely because a map/event needs a participant.

### Acquisition / teams

Acquisition / Character Systems owns obtainability, ownership, recruitment and roster acquisition/assignment semantics.

World opportunities may make recruitment possible or alter legitimate availability, but:

**world opportunity != acquisition**  
**candidate eligibility != ownership**  
**ownership != assignment != deployment**

### Progression / development

Progression / Development owns persistent capability development, gates, Access/Competence/Power/Mastery and stage/journey unlocks.

World may supply factual evidence and contexts that Progression consumes. It must not infer development from mission completion, map visitation, UI inspection or famous identity.

### Combat / Skills / Items / Weapons

Combat / Skills / Items / Weapons owns exact Battle effects, Skill semantics, prepared/executable palettes, weapon/item mechanical effects and resolver behavior.

World may place weapons/items, host situations where Skills are contextually relevant, and supply exact targets/objects/routes/systems/relationships to contextual Skills. It does not invent effects from names, art, Stats or environment.

Current contextual-Skill direction is especially relevant: World/Event supplies compatible factual context; Combat/Skills owns exact effect/compatibility; Progression owns learned/access state; Coding implements the dispatcher.

### Writing / Story

Writing owns mandatory Story occurrences, authored narrative anchors, reveals, choices and Story sequencing.

World may host the place/opportunity/context around Story, but:

**mandatory Story != random event pool**  
**location != event != opportunity**

If an exact occurrence must happen for the authored story to remain that story, Writing owns the occurrence.

### Knowledge / epistemics

World Truth and observer Knowledge remain separate.

A secret area, character, object, weapon, seal, event or route may exist in World Truth without being known, visible, actionable or accessible to the protagonist.

World presentation must preserve:

**World Truth != observer Knowledge != presentation**  
**discovery != access**  
**Knowledge != Access != Competence != Power != Mastery**

### CE / Codex / Coordination

CE owns reusable causal/epistemic/provenance semantics and cross-system collision resolution.

World should not invent parallel CE doctrine to solve a local content problem. Escalate genuine semantic collisions through GitHub issues only when another owner must decide or act.

### Coding

Coding owns runtime implementation, persistence, save/load, tests and Golden/regression proof.

World contract closure does not imply implementation or validation.

---

## 4. Playable-world composition model

The intended Alpha composition pattern is:

```text
WORLD / STORY CONTEXT
    ↓
exact location / host / participant / object / Knowledge / history state
    ↓
eligible world or Story opportunity
    ↓
contextual options and participant intents from legitimate authority
    ↓
owning domain resolver
    - Combat
    - Skill / contextual Skill
    - Progression / development
    - Acquisition
    - Reward / item consequence
    - Story continuation
    ↓
factual occurrence + consequence
    ↓
Chronicle / World / Knowledge / relationship / availability update
    ↓
new legitimate opportunities
```

World is therefore the major **assembly surface** for Alpha, not a universal resolver.

---

## 5. Maps and secret areas

Maps are world projection surfaces, not event databases by themselves.

Preserve:

- stable semantic place != current pixel coordinate;
- location != hotspot != event != opportunity;
- map visibility != observer Knowledge automatically;
- hidden semantic IDs must not leak through presentation/DOM where the observer is not entitled to know them;
- known-unknown presentation may expose bounded uncertainty without exposing hidden World Truth;
- discovering a place does not automatically grant access to it;
- entering a place does not automatically trigger every eligible event;
- changing/recalibrating map artwork or coordinates does not reroll Chronicle history.

Existing world-map, Land of Fire ecology and Konoha map work should continue to use these boundaries rather than becoming one giant hard-coded map switch.

---

## 6. Characters in the world

As World content expands, characters must remain persistent Chronicle participants rather than disposable event props.

World may author contextual availability/presence, but preserve:

- stable person != representation;
- representation != role;
- location != affiliation;
- presence != participation;
- party/team membership != Battle participation;
- participant intent != protagonist intent;
- off-screen != causally unconstrained;
- assignment elsewhere != character deletion;
- World occurrence involving a character != player ownership of that character.

A character may become unavailable, move elsewhere, join another team, discover information, acquire history with other NPCs, or create future opportunities without waiting frozen for the protagonist, provided the change comes from committed causal history rather than UI refresh/random disappearance.

---

## 7. Weapons, items, seals and Skills in World content

World may increasingly host physical and contextual content such as weapons, items, seals, evidence, training resources and interactable systems.

Every such integration must carry an exact owning reference rather than recreating mechanics locally.

Examples:

- finding a weapon may create possession/acquisition opportunity, but does not automatically author its Combat effect;
- seeing/handling a seal may create Knowledge/evidence, but does not grant Fūinjutsu competence;
- a contextual Skill may become eligible because World supplied a compatible factual situation, but eligibility/polling is not a committed Skill-use occurrence;
- an item/object being present does not mean it is owned, usable, understood or deployable;
- an environmental Battle object is not automatically a generic Inventory item;
- a card/portrait/icon never grants mechanics.

---

## 8. Chronicle and provenance requirement

As World grows, the minimum standard is not simply “content exists.” Important changes need attributable history.

Prefer explicit chains such as:

```text
source occurrence
→ evidence / Knowledge / object / world-state contribution
→ opportunity or consequence request
→ owning resolver
→ committed consequence
→ later availability / Knowledge / relationship / world-state change
```

This keeps the world explainable and save/load safe and supports later CE opportunity-lineage work without requiring that post-Alpha architecture to block SC Alpha now.

Randomness may select among already-eligible possibilities; it must not manufacture eligibility.

**randomness among eligible possibilities != randomness deciding eligibility**

---

## 9. Scaling / workspace traffic discipline

World is expected to accumulate a large volume of content and cross-domain references. Manage that scale by durable authority rather than by turning Stephen into a message bus.

Rules:

1. Commit World-owned contracts/content to GitHub as they close.
2. Use GitHub Issues only when another specialist actually needs to decide, supply, implement or verify something.
3. Do not hand off every cross-system reference merely because it exists.
4. Consolidate related multi-owner collisions through CE / Codex / Coordination rather than creating fan-out traffic.
5. Do not reopen already-closed architecture without new evidence, contradiction or an Alpha blocker.
6. Production-ready World content should point at exact external authority rather than copy/redefine it.
7. Large World breadth is allowed; duplicated semantic ownership is not.

---

## 10. Current Alpha interpretation

This direction does **not** create a new speculative CE implementation tranche.

It authorises World / Missions / Events to become the principal SC Alpha content-integration workspace as maps, hotspots, secret areas, characters, contextual Skills, weapons/items, seals, Knowledge, Story and Chronicle state are assembled into actual play.

Existing live work remains independently sequenced, including current map/runtime issues, Arc-1 producer/caller work, reward calibration, contextual-Skill integration and candidate/asset gates.

Do not collapse them into one mega-blocker merely because World is now their common contextual surface.

The Alpha objective is practical:

> **turn already-closed systems and authored content into a causally coherent world the player can actually move through, investigate, train in, interact with and change.**

---

## 11. Non-collapse summary

Preserve throughout World expansion:

- World integration != semantic ownership of every referenced system;
- location != event != opportunity;
- mandatory Story != random event pool;
- World Truth != observer Knowledge != presentation;
- discovery != access;
- event eligibility != event success;
- candidate eligibility != ownership;
- ownership != assignment != deployment;
- presence != Battle participation;
- Skill availability != Skill success;
- mission completion != Progression automatically;
- Battle victory != Story/Mission result automatically;
- finding/seeing an item != ownership/competence;
- possession != Access != Competence != Power != Mastery;
- map/UI refresh != semantic reroll/recommit;
- design closed != implemented != runtime validated != Golden GREEN.

## 12. Routing state

This is a central coordination operating-boundary record.

No new downstream handoff is required merely to announce that World will grow. Existing owner-specific GitHub issues remain the proper execution lanes.

**Stephen relay: NONE.**
