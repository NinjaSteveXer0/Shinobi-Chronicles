# Shinobi Chronicles — Structured Story Realisation Package Cross-Department Workflow

**Date:** 2026-09-14  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CROSS-DEPARTMENT AUTHORING / SEMANTIC REVIEW / RUNTIME CONSUMPTION WORKFLOW**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

Shinobi Chronicles must not require Stephen to screenplay every possible branch in advance, and it must not allow Writing, CE or Coding to invent another department's facts merely to make an unplayed branch function.

The production workflow is therefore:

`Stephen Story skeleton / approved Story premise`

→ `Writing expands it into a Structured Story Realisation Package`

→ `CE / Codex / Coordination validates semantics, causality, Knowledge and resolver ownership`

→ `Stephen approval where substantive new Story expression / choreography requires approval`

→ `Coding / Runtime implements the package through existing Story / World / Battle / domain resolvers`

→ `installed-browser proof`

This workflow consumes and reconciles:

- `Documentation/Story/Interactive_Scene_Performance_and_Branch_Realization_Doctrine_2026-09-14.md`;
- `Documentation/Story/CE_Intelligent_Story_Decision_Continuation_Requirement_2026-09-14.md`;
- `Documentation/Story/CE_Choice_Driven_Story_Direction_and_Trajectory_Requirement_2026-09-14.md`;
- `Documentation/UI/Chronicle Interaction Interactive Scene Board Addendum 2026-09-13.md`;
- `Documentation/Coordination/Mission Skeleton Driven CE Choice Generation Runtime Contract 2026-09-11.md`;
- existing protagonist-intent / participant-autonomy / Knowledge / occurrence / domain-ownership doctrine.

Canonical principle:

> **Stephen authors the Story skeleton. Writing authors the playable dramatic structure. CE validates what the structure means. Owning resolvers determine what actually happens. Coding wires the contract. The Scene Board shows the resulting Chronicle.**

This does **not** create a second Story engine.

---

## 2. What Stephen should have to author

Stephen should normally be able to supply the dramatic skeleton at the level of:

- premise;
- important Story facts;
- major participants;
- important locations where known;
- major objectives / pressures;
- meaningful set-pieces;
- important choices or choice families where deliberately envisioned;
- mandatory campaign facts / route constraints;
- desired emotional / thematic purpose;
- fixed lines or moments that matter enough to be authored exactly.

Stephen does **not** owe the project a complete screenplay for every choice he did not make.

Preserve:

> **unplayed branch != missing Stephen screenplay**

> **one recovered playthrough != universal branch history**

> **Story skeleton != factual outcome resolver**

---

## 3. Writing output — Structured Story Realisation Package

Writing converts the approved skeleton into a machine-consumable dramatic package without stealing factual authority from Battle, World, Skills, Acquisition, Progression, PL/Rank or another domain.

A substantial Story scene / decision family should provide, where applicable:

### A. Scene identity and dramatic purpose

```text
storyUnitId
sceneId / beatId
scenePurpose
mandatory / optional / conditional status
entry conditions
exit / completion predicates
```

Writing states why the scene exists and which authored campaign obligations it carries.

### B. Environment / physical space

```text
environmentRef / location authority
physical-space changes
presentation state = conversation | encounter
```

Writing may identify an approved/recovered location. It must not invent geography because an asset exists.

Backdrop binding remains subject to approved/recovered environment authority.

### C. Actor envelope

```text
required actors[]
possible / conditional actors[]
presence conditions
speaker / focus candidates
known relationships / obligations relevant to the scene
```

A conditional actor is an **authored possibility**, not an instruction that the actor must spawn.

Example:

`decoy_assassin = authorised conditional participant`

is legitimate.

`decoy_assassin appears because it would be dramatic`

is not.

### D. Objects / objectives / unresolved pressures

```text
visible / relevant object refs[]
current custody where already factual
objectiveRefs[]
unresolved pressures[]
```

Writing may define that package custody matters. It must not pre-commit who successfully obtains the package when that result belongs to a resolver.

### E. Meaningful protagonist intent families

```text
OBSERVE
GET_CLOSER
ATTACK
PICKPOCKET
PROTECT
PURSUE
DISCLOSE
WITHHOLD
...
```

Writing defines meaningful intended actions where deliberately authored.

Choice wording is presentation. Semantic intent is authoritative.

Preserve:

> **choice != success**

> **Attack != Battle automatically**

> **Pickpocket != package acquired automatically**

### F. Resolver seams

For every material intent or automatic pressure that requires factual resolution, Writing identifies the required **resolver family**, not the outcome.

Conceptual examples:

```text
ATTACK -> confrontation / Battle-capable resolver seam
PICKPOCKET -> stealth / action / custody resolver seam
OBSERVE -> perception / Knowledge-resolution seam
PURSUE -> movement / World / encounter-resolution seam
```

Writing should name the semantic need even where the exact runtime implementation is owned elsewhere.

If the required owner or capability is genuinely unresolved, Writing must mark:

`UNRESOLVED RESOLVER AUTHORITY — route to [owner]`

rather than invent the missing fact.

### G. Authored invariants and prohibited inventions

Writing explicitly states facts that must remain true or must not be fabricated.

Examples:

- the package exists;
- the original target and second man are legitimate participants in the exchange;
- a Rogue Chūnin / decoy-assassin complication is an authored possibility under the relevant conditions;
- Kakashi does not automatically know hidden identities;
- package transfer / escape / confrontation may remain separable;
- Battle victory does not automatically mean package custody;
- no unearned Skill / Rank / ownership / relationship / Knowledge may be manufactured.

### H. Important authored dialogue / expression

Writing owns:

- character voice;
- important fixed lines;
- authored dialogue beats;
- bounded reaction families;
- body-language / physical-performance direction;
- tone / pacing / scene rhythm.

Writing does not need to author every permutation of every sentence.

Where expression can legitimately vary from resolved state, Writing may supply reaction constraints / families instead of exhaustive branch prose.

Example:

```text
RESULT FAMILY: PACKAGE_RECOVERED
Kakashi tone: restrained, observant, no boast.
ANBU acknowledgement: terse; wording may vary with exact intelligence recovered.
Required fact: dialogue acknowledges actual custody and actual Knowledge only.
```

---

## 4. Clarification to the branch-writing worksheet

`Interactive_Scene_Performance_and_Branch_Realization_Doctrine_2026-09-14.md` requires a branch-writing worksheet for major choices.

This workflow clarifies how that worksheet applies when the factual result is **not predetermined**.

Writing must author the **branch envelope**, not fabricate one canonical resolver result.

Therefore worksheet fields such as:

- `resolver`;
- `visible result`;
- `state delta`;
- `next pressure`;

may be expressed as **resolver-dependent result families / projection rules**.

Example:

```text
Intent: PICKPOCKET(packageHolder)
Resolver: stealth / custody
Allowed result families:
- success -> custody changes to protagonist; holder may or may not notice according to resolver evidence
- fail_noticed -> custody unchanged; detection pressure becomes true
- fail_unnoticed -> custody unchanged; surveillance may continue
- interrupted -> resolver commits interrupting actor/event and resulting state
```

Writing must not choose one of these merely because Stephen never played that branch.

The owning resolver commits which factual history actually occurred.

Canonical rule:

> **Writing defines the legitimate result envelope where needed. The resolver commits the result. Story performs the committed aftermath.**

---

## 5. CE / Codex / Coordination review

CE does **not** rewrite Writing's scene for style.

CE validates that the package is semantically safe and implementable.

For each material Story package, CE checks:

1. **intent vs outcome** — choices describe attempts, not guaranteed facts;
2. **resolver ownership** — every material factual result has a legitimate owner;
3. **Knowledge** — no branch leaks World Truth to an observer who lacks it;
4. **participant autonomy** — protagonist choice does not command NPCs without real authority;
5. **presence / participation** — present != participating != Battle participant;
6. **custody / ownership / assignment** — no domain collapse;
7. **Rank / Progression / PL** — Story does not mutate them by implication;
8. **mandatory Story facts** — required campaign anchors remain protected;
9. **dynamic continuation** — changed factual state can alter later eligible Story instead of being forced back to expected history;
10. **convergence legality** — reconvergence preserves material Chronicle differences;
11. **persistence / replay** — committed decisions/outcomes can be reconstructed without semantic reroll;
12. **presentation safety** — Scene Board projects authority; it does not create authority.

If the package is semantically closed, CE records that closure / implementation direction.

If another owner must decide a missing factual contract, CE routes one exact dependency through GitHub rather than asking Stephen to be the message bus.

---

## 6. Stephen approval boundary

The Origin expression approval lesson remains binding:

> **quality instruction != consent to wholesale replacement**

Writing may autonomously structure an approved skeleton and prepare candidate expression, but substantive new Story/choreography remains subject to Stephen approval where the project's current approval gate requires it.

Stephen does not need to approve every runtime permutation produced from an already-approved semantic package.

The approval target is the **Story contract / authored dramatic envelope**, not every possible resolver-generated historical outcome.

Examples usually requiring Stephen judgement:

- changing the premise;
- adding/removing a major actor;
- adding a major betrayal/death/Battle/set-piece;
- materially changing geography/time;
- changing mandatory Story outcome;
- changing route intent/theme;
- replacing substantial approved dialogue/choreography.

Examples that should not require Stephen to screenplay every version:

- whether a legitimate pickpocket attempt succeeds;
- exact Battle result;
- which actor escapes after a resolver says escape succeeded;
- wording variation that remains inside approved voice/factual constraints;
- next legal choice set derived from committed Chronicle state.

---

## 7. Coding / Runtime implementation responsibility

Coding consumes the CE-validated package through existing production architecture.

Coding owns:

- stable runtime IDs / schemas;
- Story scene registration;
- semantic intent wiring;
- resolver dispatch;
- calls to Battle / World / other owning systems;
- factual result receipts;
- save/load / idempotence;
- changed scene-state projection;
- Scene Board composition;
- Story -> Battle -> same-Story return;
- deterministic unresolved decision-state persistence;
- browser/runtime diagnostics and Golden evidence.

Coding must not:

- invent a missing Story outcome;
- convert `ATTACK` into guaranteed Battle merely from the label;
- convert `PICKPOCKET` into guaranteed custody;
- spawn an authored-possible actor without satisfying the applicable condition;
- create a second Origin-only Story engine;
- make presentation state become World Truth;
- flatten different committed histories solely to simplify code.

Where an exact implementation seam is missing, Coding routes the narrow dependency to the owning specialist.

---

## 8. Runtime / CE intelligent continuation

After a meaningful player intent and factual resolver result, runtime / CE evaluates the committed state rather than consulting a universal prewritten branch paragraph.

Required reasoning remains bounded by durable authority:

`what changed?`

+ `what does each relevant observer know?`

+ `what do the actors now want?`

+ `what can they actually do?`

+ `what pressures remain unresolved?`

+ `what happens autonomously if the protagonist does nothing?`

+ `which meaningful protagonist intents are now legitimate?`

→ `next Story situation / next decision set / automatic consequence / Battle / transition / closure`

This is **bounded continuation**, not unrestricted AI fiction.

No LLM or expression system may manufacture the factual result.

For Alpha, bounded authored templates / deterministic contextual interpolation remain acceptable.

---

## 9. Scene Board projection responsibility

The Interactive Scene Board consumes current authoritative Story / Chronicle state.

It may show, where observer-safe:

- backdrop / place;
- actors currently present;
- current speaker;
- visible objects;
- package/evidence custody;
- threat / attention state;
- objective state;
- legitimate actions;
- arrivals / departures;
- Battle transition;
- visible aftermath;
- changed next affordances.

Canonical flow:

`visible situation`
→ `player intent`
→ `owning resolver`
→ `committed factual result`
→ `changed authoritative state`
→ `Scene Board reprojects the new situation`
→ `Story dialogue / reaction / next affordances`

The Scene Board never invents the state it displays.

---

## 10. Kakashi example

A valid Writing package for the alley exchange may define:

```text
SCENE: kakashi_alley_exchange

Place:
- approved/recovered Konoha alley / Sakura-tree exchange area

Required actors:
- Kakashi
- original target
- second man

Conditional actor:
- Rogue Chūnin / decoy assassin under authored condition

Relevant object:
- package

Pressure:
- understand / prevent package reaching the wrong hands

Intent family:
- OBSERVE
- GET_CLOSER
- ATTACK
- PICKPOCKET

Resolver seams:
- OBSERVE -> perception / Knowledge
- GET_CLOSER -> movement / detection
- ATTACK -> confrontation / Battle-capable
- PICKPOCKET -> stealth / custody

Authored possibilities / invariants:
- package may change hands;
- one or more actors may flee;
- Rogue Chūnin complication exists where its condition is satisfied;
- Battle may become legal from confrontation state;
- custody, Knowledge, escape and Battle outcome remain separable;
- later Story consumes whichever factual state actually occurred.
```

Writing does **not** need to produce four complete fixed screenplays.

CE does **not** infer `ATTACK = Battle` or `PICKPOCKET = package acquired` from the English labels.

The relevant registered seam + current state determine which resolver may run.

The resolver commits the factual result.

The Story / Scene Board then performs the result the player actually created.

---

## 11. Production handoff format

A Writing delivery intended for runtime consumption should finish with a compact implementation block:

```text
STORY PACKAGE STATUS:
CANDIDATE | STEPHEN-APPROVED | FINAL

STABLE IDS:
[scene / beat / intent / objective refs]

REQUIRED ACTORS:
[refs]

CONDITIONAL ACTORS + CONDITIONS:
[refs / predicates]

OBJECTS / CUSTODY CONCERNS:
[refs]

MEANINGFUL INTENTS:
[intents]

RESOLVER SEAMS:
[intent -> owner / semantic resolver family]

AUTHORED INVARIANTS:
[facts]

PROHIBITED INFERENCES:
[facts that may not be invented]

COMPLETION / EXIT PREDICATES:
[predicates]

IMPORTANT FIXED EXPRESSION:
[lines / reaction constraints / voice rules]

UNRESOLVED OWNER QUESTIONS:
[only genuine gaps]
```

CE may then close / correct the semantic contract without requiring Coding to reverse-engineer prose.

---

## 12. Validation ladder

A Story package may progress through:

1. skeleton / discussion;
2. Writing structured package;
3. CE semantic review;
4. Stephen approval where required;
5. durable final authority;
6. Coding implementation;
7. source/headless validation;
8. integration validation;
9. installed-browser validation;
10. Golden/regression GREEN.

Do not collapse these states.

A beautifully written package is not implementation.

A source-level resolver binding is not installed-browser proof.

A visible Scene Board is not Golden if its choices still only select different paragraphs without changing the authoritative situation.

---

## 13. Final canonical shorthand

> **Stephen defines the story worth telling.**

> **Writing defines the playable dramatic situation, authored constraints, voice and meaningful intent envelope.**

> **CE protects semantics, causality, Knowledge and domain ownership.**

> **Owning resolvers establish factual outcomes.**

> **Coding connects those contracts to the production runtime.**

> **The Scene Board shows the player the Chronicle they actually created.**

And:

> **Do not screenplay every possible history. Author enough truth, structure and character for the engine to realise legitimate histories without inventing authority.**

## Routing consequence

This workflow is cross-department production authority. Writing, CE / Codex / Coordination and Coding / Runtime must all consume it before future Story packages are treated as implementation-ready.

It does not require reopening already-closed Story facts solely to reformat them. Apply it prospectively and during active repair / implementation of player-facing Story, beginning with the current Kakashi Scene Board benchmark.
