# Chronicle Engine — Interactive Narrative Affordance, Intention Revision, Reincorporation and Causal Presentation Doctrine

**Date:** 2026-09-20  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CE RESEARCH-INTEGRATION DOCTRINE — CURRENT / PROJECT-WIDE**  
**Research basis:** AIIDE 2011 Intelligent Narrative Technologies workshop, Vol. 7 No. 2 / AAAI Technical Report WS-11-18  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

This document turns useful external interactive-narrative research into explicit Chronicle Engine doctrine without importing a drama-manager architecture or widening Alpha scope.

It is an integration document, not a claim that Shinobi Chronicles implements the cited research systems directly.

Research can sharpen CE semantics. It does not override current SC authority.

Authority order remains:

`current GitHub source > durable SC/CE authority > current closed specialist authority > external research > memory/inference`.

The five adopted principles are:

1. **Narrative affordance / legibility**
2. **Knowledge-gated intention revision**
3. **Causal reincorporation**
4. **Selection vs state refinement**
5. **Causal retrospective presentation**

A sixth principle is an explicit rejection:

6. **Do not use invisible drama-management steering to manufacture the author's preferred route.**

---

## 2. Research basis

### 2.1 Young & Cardona-Rivera — affordance and story comprehension

R. Michael Young and Rogelio Cardona-Rivera, **“Approaching a Player Model of Game Story Comprehension Through Affordance in Interactive Narrative”**, AIIDE 7(2), 2011, pp. 123–130.

DOI:
`https://doi.org/10.1609/aiide.v7i2.12466`

The paper frames interactive narrative agency partly as a communication/comprehension problem: the system must reason about how story content is communicated so the player can understand the story and their role in it.

CE adopts the project interpretation:

> **A semantic affordance can be real without being legible to the player.**

Therefore:

> **factual eligibility != perceived actionability**

---

### 2.2 Fendt & Young — intention revision

Matthew Fendt and R. Michael Young, **“The Case for Intention Revision in Stories and its Incorporation into IRIS, a Story-Based Planning System”**, AIIDE 7(2), 2011, pp. 10–16.

DOI:
`https://doi.org/10.1609/aiide.v7i2.12461`

IRIS models characters whose beliefs can change and whose intentions/plans can then be revised.

CE adopts the stronger knowledge-safe rule:

> **World change alone does not justify participant intention revision. The participant must receive enough legitimate Knowledge/belief update for the revision.**

---

### 2.3 Tomaszewski — reincorporation

Zach Tomaszewski, **“On the Use of Reincorporation in Interactive Drama”**, AIIDE 7(2), 2011, pp. 84–91.

DOI:
`https://doi.org/10.1609/aiide.v7i2.12468`

The paper evaluates selecting later scenes that build on significant earlier player actions. It found improved structural reincorporation, while player-reported story quality/agency did not improve correspondingly in the study.

CE adopts the useful part and the warning:

> **Prior Chronicle history should matter later when causally, character, objective or payoff relevant.**

But:

> **Do not callback prior history merely to prove the engine remembered it.**

---

### 2.4 Roberts — experience-management decomposition

David Roberts, **“Seven Design Challenges for Fully-realized Experience Management”**, AIIDE 7(2), 2011, pp. 49–56.

DOI:
`https://doi.org/10.1609/aiide.v7i2.12472`

The paper separates representational and computational challenges involved in experience management rather than treating narrative adaptation as one undifferentiated problem.

CE adopts a compatible decomposition:

```text
semantic eligibility / desired consequence family
-> select authorised action / continuation
-> refine against exact current committed state
-> owning resolver / transition
-> factual commit
-> presentation
```

Selection and refinement are separate responsibilities.

---

### 2.5 Tomai et al. — causality and retrospective narration

Emmett Tomai, Laxman Thapa, Andrew Gordon and Sin-Hwa Kang, **“Causality in Hundreds of Narratives of the Same Events”**, AIIDE 7(2), 2011, pp. 77–83.

DOI:
`https://doi.org/10.1609/aiide.v7i2.12471`

The paper studies how causal relationships among events affect what people include when recounting the same event sequence and how narration ordering relates to event order.

CE adopts:

> **A Chronicle summary should privilege causal and consequence structure over raw chronological log dumping.**

---

## 3. Principle A — narrative affordance / player legibility

CE already distinguishes:

`World Truth -> observer Knowledge -> Access / Competence -> eligible action -> committed result -> presentation`.

This doctrine adds a presentation-quality distinction:

```text
semantic affordance
!=
player-perceived affordance
```

A choice can be perfectly legal in CE and still fail as interactive narrative if the player cannot understand:

- why it is available;
- what situation it responds to;
- what immediate intent it represents;
- what important factual difference separates it from neighbouring choices.

### 3.1 Required rule

For important player decisions:

> **Presentation should make the decision's factual basis and immediate intent legible without exposing hidden state.**

This does not mean showing internal predicates or debug flags.

Good projection may use:

- visible participant state;
- object custody;
- location;
- recent causal event;
- dialogue/reaction;
- concise choice wording;
- observer-safe contextual text;
- objective wording.

### 3.2 Failure modes

Avoid:

- enabled choices whose relevance is incomprehensible;
- grey choices with no player-legible reason when explanation is appropriate;
- choice labels that hide materially different semantic intents;
- choices made available by hidden facts the player cannot perceive;
- UI descriptions that leak exact hidden predicates merely to explain eligibility.

Canonical lock:

> **CE owns factual eligibility. Presentation owns player-legible projection. Neither may invent the other.**

---

## 4. Principle B — Knowledge-gated intention revision

Participant autonomy must remain observer/actor-relative.

Current participant loop is extended:

```text
World Truth changes
-> determine whether participant legitimately perceives / learns enough of that change
-> if participant belief/Knowledge changes materially
-> reevaluate due intention / autonomy window
-> revise, retain or abandon intent from the participant's own state
```

Do not use:

```text
World Truth changed
-> every relevant NPC instantly knows
-> NPC replans
```

### 4.1 Intention persistence

An existing participant intention remains legitimate until:

- completed;
- invalidated by participant-known facts;
- superseded by another authorised obligation/priority;
- impossible from participant-known/capability state;
- explicitly abandoned through a committed autonomy result.

The engine must not make a character omniscient merely to keep plot flow convenient.

### 4.2 Wrong beliefs remain possible

A participant may:

- retain an obsolete plan because they do not know conditions changed;
- react late;
- infer incorrectly;
- revise toward a mistaken plan;
- disagree with another informed participant.

That is legitimate Chronicle history where Knowledge supports it.

Canonical lock:

> **World Truth != participant Knowledge != participant intention.**

And:

> **Intention revision requires a legitimate participant-side belief/Knowledge basis, not omniscient runtime awareness.**

---

## 5. Principle C — causal reincorporation

Committed player/participant history may influence future:

- Story;
- World opportunities;
- relationships;
- participant expectations;
- Knowledge;
- debrief;
- reward eligibility;
- institutional response;
- route availability;
- Chronicle Receipt.

But CE must not turn every recorded fact into a callback.

### 5.1 Reincorporation eligibility

A prior fact is a strong reincorporation candidate when it is materially relevant to one or more of:

- current causal state;
- current participant relationship/history;
- current objective;
- observer Knowledge;
- current institutional judgement;
- promised setup/payoff;
- unresolved consequence;
- current capability/access;
- later World eligibility.

### 5.2 Avoid memory theatre

Do not add references solely because:

- the fact exists in history;
- the engine can query it;
- a writer wants to prove branching happened;
- a callback would make a route look “more dynamic”.

This produces shallow memory theatre rather than causality.

Canonical lock:

> **Reincorporate history when it changes meaning, possibility, reaction or payoff — not merely to prove persistence.**

---

## 6. Principle D — selection vs state refinement

CE must not collapse:

- choosing the correct semantic continuation; and
- adapting that continuation to the exact current facts.

These are separate stages.

Canonical pipeline:

```text
1. derive eligible semantic continuation families
2. select an authorised continuation family
3. refine that family against exact current committed state
4. resolve / commit exact factual occurrence
5. project observer-safe presentation
```

### 6.1 Selection

Selection answers questions such as:

- which participant intent is legitimate;
- which authored opportunity becomes current;
- which Story continuation family applies;
- which World seed among eligible candidates is selected.

Selection may not invent eligibility.

### 6.2 Refinement

Refinement answers:

- which exact participant(s) are still present;
- who actually holds the package;
- which location is current;
- which pursuit remains open;
- who is alive / dead / escaped / field-secured;
- which exact observer Knowledge exists;
- which current representation/capability applies;
- which exact destination/relationship/history facts constrain the scene.

A generic selected continuation must not overwrite exact current truth merely because its template assumed another state.

### 6.3 No third invented truth

If a selected continuation conflicts with exact current state:

- refine it from current authority where authorised;
- select another eligible continuation;
- fail closed and route the exact authority gap.

Do not invent a compromise event unsupported by either authority.

Canonical lock:

> **Selection chooses the legitimate semantic family. Refinement makes that family truthful to the exact Chronicle state.**

---

## 7. Principle E — causal retrospective presentation

Chronicle Receipt, debrief and later retrospective narration must not degrade into raw chronological event dumps.

They should be generated from committed facts while preserving:

- player intent;
- factual outcome;
- cause/consequence;
- participant identity;
- object/custody changes;
- important relationship/history creation;
- unresolved state;
- observer-safe Knowledge.

### 7.1 Causal grouping

Where useful, retrospective presentation should make causal chains legible:

```text
You chose X
-> resolver produced Y
-> Y changed Z
-> later consequence Q became true
```

without exposing internal resolver/debug machinery.

### 7.2 Chronology still matters

Causal presentation does not erase chronology.

Use chronology where sequence itself matters, but prefer causal grouping when it better explains:

- why the package was lost/recovered;
- why a participant escaped;
- why a relationship changed;
- why an opportunity opened/closed;
- why a reward was earned;
- why an institution reacted.

### 7.3 No fabricated causality

Do not infer that event A caused B merely because A happened first.

Retrospective presentation must read committed causal/provenance links or exact authored authority.

Canonical lock:

> **Chronicle Receipt is not a log dump. It is a truthful causal summary of committed player-known history.**

---

## 8. Explicit non-adoption — no invisible drama-manager steering

CE does **not** adopt a general author-preference drama manager whose job is to force the player toward a desired plot.

Do not:

- close legitimate routes merely to steer the player toward a preferred scene;
- change eligibility to manufacture dramatic structure;
- secretly alter facts because an author-preferred beat has not fired;
- spawn Knowledge, capability, relationships or participants to satisfy pacing;
- punish “wrong” choices by making the world cheat.

Shinobi Chronicles should prefer:

```text
committed state
-> legitimate possibilities
-> player / participant choices
-> factual consequences
-> later causally relevant opportunities
```

not:

```text
desired author outcome
-> manipulate world until player reaches it
```

Authored invariants remain valid where explicitly closed. This rule rejects hidden steering, not authored Story.

---

## 9. World-seed relationship

Research on suggesting new plot elements is useful only as a future authoring aid.

Current SC architecture remains:

```text
authored seed reservoir
-> factual eligibility
-> selection among eligible possibilities
-> discovery / actionability
-> committed occurrence
```

CE may later assist authors in proposing candidate seeds offline.

It must not dynamically manufacture canon World events during Alpha merely because an algorithm predicts they would improve drama.

---

## 10. Existing authority extensions

This doctrine **extends without reopening**:

- `Documentation/Coordination/Participant First Story Autonomy Runtime Ordering and Battle Boundary Contract 2026-09-15.md`
- `Documentation/Coordination/Neutral Story Decision Realisation Runtime Contract 2026-09-14.md`
- `Documentation/Story/Interactive_Story_Player_Agency_Character_Autonomy_Cadence_and_Earned_Possibility_Authority_2026-09-11.md`
- `Documentation/Story/Origin_Chronicle_Receipt_Player_History_Summary_Requirement_2026-09-14.md`
- World eligibility / observer-Knowledge / Story->World reintegration authority.

Where this doctrine adds specificity:

- autonomy is explicitly **Knowledge-gated for intention revision**;
- important eligible actions require **player-legible affordance projection**;
- later callbacks should satisfy **causal reincorporation relevance**;
- adaptive continuation uses **selection then exact-state refinement**;
- receipts/debriefs prefer **causal retrospective organisation**.

It does not create new ownership boundaries.

---

## 11. Alpha posture

These are semantic/design guardrails, not a demand for a new Alpha subsystem.

For current Alpha:

- do not build a general narrative planner;
- do not build a player-model prediction engine;
- do not build a drama manager;
- do not retrofit every existing scene merely to reference this research;
- do not make external research another Kakashi blocker unless a live defect directly violates an adopted rule.

Apply the doctrine when touching a relevant current surface.

Examples:

- if a choice is legal but inscrutable, fix affordance/presentation;
- if an NPC replans from hidden truth, fix Knowledge gating;
- if a later scene mentions old history gratuitously, remove/replace the callback;
- if a generic continuation assumes the wrong package holder, refine against exact state;
- if a Receipt dumps raw rows, organise the current facts causally.

---

## 12. QA / review questions

When reviewing a CE-driven interactive Story surface, ask:

1. Is each important action factually eligible?
2. Can the player understand why the important action is available without hidden-state leakage?
3. Are participant decisions based on participant Knowledge rather than omniscient World Truth?
4. If a participant revises a plan, what Knowledge/belief update justified it?
5. Does later history callback an earlier fact because it matters, or merely because it exists?
6. Was the semantic continuation selected before being refined against exact current facts?
7. Did refinement preserve exact participant/object/location/custody/Knowledge truth?
8. Does retrospective presentation explain causal history rather than dump logs?
9. Is any author-preferred route being enforced through invisible world manipulation?
10. Are existing authored invariants and specialist ownership still respected?

---

## 13. Preserve

- World Truth != observer Knowledge != presentation;
- World Truth != participant Knowledge != participant intention;
- semantic affordance != perceived affordance;
- eligible != understandable;
- eligibility != selection;
- selection != refinement;
- authored seed != occurrence;
- prior history != mandatory callback;
- memory != relevance;
- chronology != causality;
- causal presentation != fabricated cause;
- player agency != unrestricted success;
- participant autonomy != omniscience;
- Story invariant != invisible drama steering;
- external research != project authority until explicitly integrated;
- design doctrine != implementation != runtime validation != Golden GREEN.

# Canonical lock

> **Chronicle Engine should make legitimate possibilities understandable, let characters revise intentions only from what they can legitimately know, reincorporate history when it causally matters, separate semantic selection from exact-state refinement, and present retrospective history by meaningful causal consequence rather than raw logs. It must not manipulate hidden world truth merely to force an author-preferred route.**
