# Shinobi Chronicles — Neutral Story Decision Realisation Runtime Contract

**Date:** 2026-09-14  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CE / STORY RUNTIME CONTRACT — FIRST REQUIRED CONSUMER: ACADEMY ORIGINS**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

Issue #175 asked CE / Codex / Coordination to define the smallest reusable decision-realisation contract that lets live Story outside Mission skeletons behave as consequential Chronicle gameplay without creating a second Story/history system.

The decision is now closed:

> **Use one neutral Story Decision Realisation Core, consumed through context-specific adapters.**

The existing #121 Mission implementation remains a valid Mission adapter/consumer of these semantics. Academy Origins consume the same semantic core through an Origin / neutral Story adapter. Origins do **not** become Missions, and Mission state must not become the storage model for Origins.

Canonical runtime flow:

`authoritative Story situation`
→ `eligible protagonist-intent set`
→ `player selects intent`
→ `explicit owning resolver seam`
→ `committed factual result`
→ `Chronicle / World / Knowledge / custody / relationship state updates through their owners`
→ `Story decision core reevaluates the changed state`
→ `next legitimate Story situation / automatic action / Battle / transition / closure`
→ `Scene Board reprojects the new authoritative state`

The rejected completion model is:

`choice -> different paragraph -> same functional route`.

This contract extends rather than replaces:

- `Documentation/Coordination/Mission Skeleton Driven CE Choice Generation Runtime Contract 2026-09-11.md`;
- `Documentation/Coordination/Structured Story Realisation Package Cross-Department Workflow 2026-09-14.md`;
- `Documentation/Story/Interactive_Scene_Performance_and_Branch_Realization_Doctrine_2026-09-14.md`;
- `Documentation/Story/CE_Intelligent_Story_Decision_Continuation_Requirement_2026-09-14.md`;
- `Documentation/Story/CE_Choice_Driven_Story_Direction_and_Trajectory_Requirement_2026-09-14.md`;
- `Documentation/UI/Chronicle Interaction Interactive Scene Board Addendum 2026-09-13.md`;
- existing protagonist-intent / participant-autonomy / Knowledge / occurrence / domain-ownership doctrine.

---

## 2. Architecture decision — neutral semantic core + adapters

The reusable abstraction is a **neutral semantic Story Decision Realisation Core**.

It owns no Mission, Origin, Battle, World, Knowledge, custody, Rank, Progression, Acquisition or presentation truth by itself.

Its responsibilities are only to coordinate:

1. the current authoritative Story context;
2. current legitimate protagonist intents;
3. stable unresolved decision state;
4. committed protagonist intent;
5. dispatch to an explicitly registered owning resolver seam;
6. factual-result / consequence references returned by that resolver;
7. reevaluation of the next legitimate Story state from newly committed history;
8. deterministic persistence / replay provenance.

Context-specific adapters supply the structural envelope.

### Mission adapter

Consumes:

- `arcId` / `missionId` / skeleton version;
- beat / invariant progress;
- mission objective / completion predicates;
- current Chronicle state.

This is the semantic role already implemented by #121.

### Origin / neutral Story-unit adapter

Consumes:

- Story package / Origin identity;
- scene / beat identity;
- actor envelope;
- environment/location authority;
- visible/relevant objects;
- current objective / unresolved pressures;
- authored branch invariants;
- semantic intent families;
- explicit resolver seams;
- exit / completion predicates;
- current Chronicle state.

This adapter must not manufacture `missionId`, mission completion semantics, or Active-Konoha Shared History merely to reuse the core.

### Future adapters

World Chronicle events, relationship scenes and other Story consumers may later consume the same neutral core where useful. That generalisation is not required to close SC Alpha and must not become an Alpha blocker.

---

## 3. Minimum neutral decision context

Exact field names are Coding-owned, but runtime must preserve equivalent semantics.

Conceptually:

```text
storyDecisionContextId
storyUnitType            // origin | mission | event | relationship | other authorised type
storyUnitRef
sceneRef / beatRef
continuityLineageRef
sourceOccurrenceRefs[]
authorityVersionRefs[]
observerRef
currentEnvironmentRef
presentActorRefs[]
perceivedActorRefs[]
visibleObjectRefs[]
objectiveRefs[]
unresolvedPressureRefs[]
currentStateRefs[]
mandatoryInvariantRefs[]
completionPredicateRefs[]
semanticIntentDefinitions[]
resolverBindings[]
```

The context is a projection of existing authority. It is not a duplicate owner of those facts.

Preserve:

> **Story decision context != World Truth owner**

> **Story decision context != Chronicle occurrence**

> **Story decision context != presentation state**

---

## 4. Neutral semantic choice set

At a meaningful decision point, the core produces or consumes an eligible semantic choice set.

Conceptual record:

```text
choiceSetId
decisionPointRef
contextStateRef
choices[]:
  choiceId
  intentType
  intentPayload
  eligibilityBasisRefs[]
  resolverBindingRef
  presentationKey / wording projection
excludedIntentRefs[]      // optional developer provenance only
```

Choice wording is presentation. Semantic intent is authoritative.

Preserve permanently:

- `ATTACK` != Battle by implication;
- `PICKPOCKET` != successful theft / custody by implication;
- `OBSERVE` != automatic discovery of hidden truth;
- `PURSUE` != successful capture;
- `PROTECT` != guaranteed survival;
- `DISCLOSE` != target believes the statement;
- choice != outcome;
- intent != party command.

A choice may map to a deterministic authored Story transition when the Story itself has already fixed the high-level causal result. That is still an explicit resolver/transition seam, not inference from the English label.

---

## 5. Explicit resolver binding — never infer owner from button text

Every material intent must point to a registered semantic owner / resolver seam.

Examples:

```text
OBSERVE -> Story/perception/Knowledge resolution seam
GET_CLOSER -> movement/detection resolution seam
ATTACK -> confrontation seam; Battle may become legal if current authority says so
PICKPOCKET -> stealth/interception/custody seam
PURSUE -> movement/World/encounter seam
```

The exact implementation may compose more than one domain where legitimate.

Rules:

1. A button label never creates a resolver.
2. Story may fix a branch-level invariant without claiming all lower-level factual details.
3. A resolver may commit only facts it owns.
4. Cross-domain consequences must be requested/committed through the owning systems.
5. If no legal resolver/transition exists, fail closed and surface the exact authority gap.

Canonical rule:

> **Authored Story rail constrains what must/can happen; owning resolvers establish the exact factual history inside that rail.**

---

## 6. Story-owned branch invariants versus resolver-owned results

A Story package may legitimately author a high-level branch invariant.

Example from Academy Kakashi:

- `ATTACK` route: the clean package handoff is prevented/interrupted;
- `PICKPOCKET` route: the clean package handoff is prevented;
- `OBSERVE` route: Kakashi allows the handoff, the package transfers, and the decoy-assassin / Rogue Chūnin escalation enters the Story;
- `GET CLOSER`: high-level continuation remains unresolved until recovered/approved.

These are game-specific authored Story rails.

They do **not** create universal CE rules such as:

- every `ATTACK` starts Battle;
- every `PICKPOCKET` succeeds;
- every `OBSERVE` spawns an assassin.

Within the fixed Kakashi rail, unresolved details remain separate and may include:

- who detects whom;
- exact custody after intervention;
- exact position;
- whether Battle becomes legal;
- who escapes;
- injury / withdrawal;
- Knowledge gained;
- relationship/history consequences;
- later objective pressure.

---

## 7. Committed intent and factual realisation receipt

Selecting a choice crosses the protagonist-intent commit boundary only when the Story runtime confirms commitment.

A neutral realisation receipt should preserve equivalent semantics to:

```text
storyDecisionReceiptId
storyDecisionContextId
choiceSetId
selectedChoiceId
selectedIntent
intentCommitRef
resolverBindingRef
resolverRequestRef
resolverResultRef
sourceOccurrenceRefs[]
consequenceRefs[]
stateDeltaRefs[]
knowledgeDeltaRefs[]
relationshipHistoryRefs[]
objectiveDeltaRefs[]
successorSituationRef
supersedesReceiptRef?       // only when later committed history legitimately supersedes an unresolved state
```

The receipt is provenance, not another owner of the facts referenced by it.

Preserve:

> **blocked/failed outcome != erased committed intent**

> **resolver result != protagonist intent**

> **receipt != source authority**

---

## 8. Deterministic unresolved-state persistence

An unresolved decision set must remain stable while committed semantic state remains unchanged.

UI reopen, rerender, scene focus change, save/load, browser refresh, portrait/backdrop refresh or expression variation must not reroll the semantic choices.

Runtime must either:

- persist the unresolved semantic choice set; or
- deterministically reconstruct it from immutable committed-state / authority references.

If new committed history materially changes the situation before resolution, runtime may explicitly supersede the old unresolved choice set while retaining provenance.

Canonical rule:

> **New history may change what is possible. Looking at the screen may not.**

---

## 9. State-derived continuation after resolution

After resolver completion, the core must reevaluate the actual committed situation.

Minimum reasoning envelope:

- What factual state changed?
- What does the protagonist now legitimately know?
- What do materially relevant NPCs now know?
- Which actors remain present / available / capable?
- What does each actor now want from their own state?
- What objective / custody / threat / evidence / relationship pressure remains unresolved?
- What autonomous action occurs if the protagonist does nothing?
- Does a meaningful protagonist decision currently exist?
- Which semantic intents are now legitimate?
- Which authored mandatory beats remain eligible / required?
- Which future scenes became legal or illegal because of the committed history?

Possible next runtime state is not limited to another choice menu. It may be:

- actor reaction;
- autonomous NPC action;
- deterministic Story transition;
- Battle;
- World/encounter transition;
- short dialogue;
- changed objective;
- scene closure;
- next meaningful decision set.

Preserve:

> **CE asks whether another decision exists before generating another decision.**

---

## 10. NPC autonomy

Non-protagonist actors remain Chronicle participants, not player extensions.

Their response may consume their own:

- Knowledge;
- current objective;
- relationships/history;
- role / obligation;
- capability;
- position;
- current injury/resource state;
- perceived protagonist action;
- current World state.

The core may expose perceivable NPC intent/reaction to Story presentation, but must not expose hidden intent merely because it exists internally.

Preserve:

- protagonist intent != NPC intent;
- presence != participation;
- team membership != obedience;
- shared occurrence != shared Knowledge;
- NPC reaction != player command slot.

---

## 11. Story direction and long-tail inheritance

The decision core does not merely choose the next local paragraph.

Committed factual history may legitimately change later:

- scene eligibility;
- actor availability;
- object/evidence custody;
- Knowledge;
- relationships/history;
- World opportunities;
- institutional response;
- mission-local pressure;
- Arc-local pressure;
- route eligibility where authored gates consume actual history.

Later Story consumes **Recorded History**, not an expected default path.

Macro Story may converge where authored, but convergence must not erase material Chronicle differences.

No universal hidden morality / personality / Canon-vs-Alt score is authorised by this contract.

---

## 12. Scene Board relationship

`runtime/alpha-story-scene-board-33900.js` and the Interactive Scene Board are presentation consumers of the neutral decision-realisation flow.

The Scene Board may project, where observer-safe:

- backdrop/environment;
- actors present;
- current speaker/focus;
- visible objects;
- objective state;
- custody state;
- attention/threat state;
- legitimate protagonist intents;
- arrivals/departures;
- Battle transition;
- visible factual aftermath;
- changed later affordances.

It must never manufacture the state it displays.

Canonical flow:

`authoritative situation`
→ `Scene Board projection`
→ `player intent`
→ `owning resolver`
→ `committed factual result`
→ `Story core reevaluates`
→ `Scene Board reprojects changed situation`.

A visible cinematic board is not Golden if the semantic situation still reconverges to the same functional path without legitimate cause.

---

## 13. Origin-specific scope boundary

Academy Origin history is personal pre-Active-Konoha Chronicle history for the selected Origin representation.

Preserve:

- selected Origin != all Origins happened;
- Origin history != Active-Konoha Shared History;
- Origin actor presence != ownership/acquisition;
- acquaintance/history != Summon/Character acquisition;
- Story completion != Promotion;
- Origin Battle victory != Promotion;
- Origin choice != personality lock;
- Origin adapter != Mission adapter.

At Origin completion, transition authority remains separate from the later Active-Konoha Chronicle.

---

## 14. Origin Chronicle receipt

The binding player-facing Origin completion sequence is:

`final Origin scene`
→ `black wipe`
→ `ORIGIN CHRONICLE RECEIPT`
→ `Continue`
→ `YOUR CHRONICLE BEGINS`.

The receipt is a read-only projection of the same committed history used by save/load and later Story.

It must distinguish:

1. **PLAYER DECISIONS** — committed protagonist intents;
2. **RECORDED OUTCOMES** — factual resolver results;
3. **HISTORY CREATED** — persistent relationship / encounter / custody / obligation / other legitimate Chronicle history.

Receipt generation must read committed semantic receipts / occurrence / consequence authority. It must not reconstruct history from button labels or presentation-only state.

It must not expose hidden identities, hidden Knowledge, internal IDs, scores, future route gates or speculative outcomes.

Receipt presentation != history commit.

Community telemetry is optional and nonblocking.

---

## 15. Kakashi first benchmark — binding application

The first full benchmark is Academy Kakashi.

Current authored objective:

> **Stop the package from falling into the wrong hands.**

First semantic intent family:

- `ATTACK`;
- `PICKPOCKET`;
- `OBSERVE`;
- `GET_CLOSER`.

Binding causal rails:

### ATTACK

Direct-intervention Story route.

The clean package handoff is prevented/interrupted.

Do not infer Battle, package custody, defeat, injury or capture merely from `ATTACK`.

### PICKPOCKET

Stealth/interception Story route.

The clean package handoff is prevented.

Do not infer permanent Kakashi custody, undetected success, full Knowledge or universal pickpocket success.

### OBSERVE

Kakashi deliberately continues observation rather than intervening.

Binding Story sequence:

`OBSERVE`
→ handoff allowed
→ package transfers
→ decoy-assassin / Rogue Chūnin escalation appears
→ new meaningful decision family opens
→ at least one later eligible route leads to Pakkun's first involvement.

Pakkun does not appear randomly; the exact later trigger/path remains recovery/approval work until fixed.

### GET CLOSER

Meaningful approved intent.

Exact high-level continuation remains unresolved and therefore must fail closed as an authoring gap rather than being silently mapped onto another route.

### Benchmark acceptance

Kakashi must prove:

1. semantic choices are stable and distinct;
2. `ATTACK`, `PICKPOCKET` and `OBSERVE` produce their authored causal differences;
3. resolver-owned details remain resolver-owned;
4. the visible Scene Board changes from committed state, not presentation fiat;
5. autonomous actors react from legitimate state;
6. Battle can be entered only through an authorised caller/opposition/return seam;
7. Story→Battle→same-Story return works where Battle is legal;
8. save/load reproduces the same committed history;
9. the Origin Chronicle receipt truthfully reflects decisions/outcomes/history;
10. `browserGoldenClaimed=false` until Stephen approves installed-browser behaviour.

Only after this benchmark proves the model should the pattern be propagated broadly across the other Origins.

---

## 16. Alpha-safe implementation posture

This contract does **not** require:

- unrestricted live LLM Story generation;
- a new global AI planner;
- a second Story history database;
- full simulation of every NPC;
- refactoring all #121 storage before Alpha;
- dynamic prose for every branch;
- generic universal Skill checks for every Story verb.

Alpha may use:

- deterministic authored transition rules;
- bounded authored result families;
- explicit resolver bindings;
- existing Story occurrence/consequence APIs;
- existing #121 semantic machinery where generic;
- compatibility adapters around current runtime storage;
- bounded contextual expression.

The semantic contract is reusable. The implementation may remain conservative until post-Alpha CE generalisation in Shadow Realm.

---

## 17. Migration / compatibility guidance for #121

Do not destabilise already-working Mission choice runtime merely to produce a theoretically perfect neutral abstraction before Alpha.

Coding may satisfy this contract by:

1. extracting genuinely generic #121 helpers into a neutral module; **or**
2. introducing a neutral adapter/service that reuses #121 semantics while preserving existing Mission storage/API compatibility; **or**
3. implementing equivalent neutral semantics for Story-unit consumers first, then reconciling common code after Alpha.

Whichever route is chosen must prove that Mission and Origin decisions obey the same semantic laws without pretending Origins are Missions.

Canonical rule:

> **Semantic reuse is required. Risky pre-Alpha refactoring is not.**

---

## 18. Minimum implementation proof

Coding must prove at least:

1. an Origin Story package can register a non-Mission decision context;
2. the same committed state reproduces the same unresolved semantic choice set;
3. presentation rerender does not reroll choices;
4. selected choice commits protagonist intent before resolver result;
5. explicit registered resolver seam is used rather than label inference;
6. resolver result / authored deterministic transition creates factual state change;
7. changed state alters visible situation and/or later legitimate affordances where causally appropriate;
8. hidden truth does not leak through choice labels, actor names, DOM/accessibility or Chronicle receipt;
9. autonomous NPC action remains separate from player command;
10. save/load preserves selected intent, result and successor state;
11. Origin personal history remains separate from Active-Konoha Shared History;
12. Chronicle receipt reads committed history and survives reload;
13. Mission #121 behavior remains intact;
14. browser proof demonstrates the Kakashi cinematic benchmark as gameplay rather than a static board/textbox;
15. no Golden claim occurs before Stephen's installed-browser approval.

---

## 19. Validation state at publication

At publication:

- #121 Mission semantic engine: **implemented + source/headless GREEN**;
- Scene Board primitive / Kakashi presentation work: **implemented in source, with source/headless QA; browser quality has been iterating from Stephen's installed-browser review**;
- neutral non-Mission Story Decision Realisation Core defined by this contract: **design CLOSED / durable authority**;
- full Kakashi resolver-realisation benchmark: **NOT yet Golden**;
- all-ten Origin propagation: **NOT yet authorised as complete**;
- Origin Chronicle receipt: **Writing authority CLOSED; runtime implementation / browser proof separate**;
- #105 ten-Origin browser Golden: **RED / NOT CLAIMED**.

Do not collapse these states.

---

## 20. Final canonical shorthand

> **One neutral Story Decision Realisation Core. Context-specific adapters. No second Story/history system.**

> **Story defines the situation, causal rails and meaningful intents.**

> **The player commits protagonist intent.**

> **Explicit owning resolvers establish factual results.**

> **CE reevaluates what is now true, known, wanted, possible and unresolved.**

> **The Scene Board performs the changed Chronicle.**

> **Later Story inherits Recorded History.**

> **The Origin Chronicle receipt tells the player what was actually entered into their Chronicle.**

And permanently:

> **Do not infer a resolver from a button label. Do not screenplay every possible history. Do not hide meaningful consequence in an invisible ledger.**
