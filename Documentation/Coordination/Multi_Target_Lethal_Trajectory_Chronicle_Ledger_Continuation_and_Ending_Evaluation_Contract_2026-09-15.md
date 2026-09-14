# Shinobi Chronicles — Multi-Target Lethal Trajectory Chronicle Ledger, Continuation and Ending Evaluation Contract

**Date:** 2026-09-15  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CE / STORY RUNTIME SEMANTIC CONTRACT — DESIGN CLOSED; IMPLEMENTATION / BROWSER / GOLDEN SEPARATE**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

GitHub issue #195 asks CE / Codex / Coordination to generalise a reusable Story / Chronicle rule exposed while Academy Kakashi is being closed:

> Sequential lethal choices and lethal outcomes across several encounters must remain structured Chronicle history and must drive later continuation and ending evaluation. A Battle victory, kill or failed lethal attempt is not automatically a terminal Story state.

This contract generalises that requirement without turning Academy Kakashi's exact Story into a universal rule.

It consumes and extends:

- `Documentation/Story/Deterministic_Kill_vs_Resolver_Determined_Lethal_Intent_Contract_2026-09-14.md`;
- `Documentation/Coordination/Neutral Story Decision Realisation Runtime Contract 2026-09-14.md`;
- `Documentation/Coordination/Participant First Story Autonomy Runtime Ordering and Battle Boundary Contract 2026-09-15.md`;
- `Documentation/Coordination/Structured Story Autonomy Arc 1-3 Route History and Authored Geography Contract 2026-09-10.md`;
- `Documentation/Story/Academy_Kakashi_Multi_Target_Lethal_Trajectory_and_Ending_Resolver_Requirement_2026-09-15.md` @ `a0f7ca16c4522a7b1cd49fcb98343bdd9f4b0d51`;
- `Documentation/Story/Academy_Kakashi_Triple_Kill_Turn_Window_and_Achievement_Note_2026-09-15.md` @ `f5218fd6126ff50e495b725e5ba2493aede96273`;
- `Documentation/Story/Academy_Kakashi_Decision_Continuation_Matrix_and_Pickpocket_Route_Lock_2026-09-15.md` @ `0e0f99e688701ce9985ac715aa2041b1e2b49070`;
- `Documentation/Story/Academy_Kakashi_Structured_Autonomy_Anchor_Addendum_Decision_Continuation_2026-09-15.md` @ `a846d568d20ead78c610682de2fe4ff76713b0b7`.

Canonical shorthand:

> **Intent history and outcome history are both Chronicle history.**
>
> **A resolved confrontation changes state; it does not decide terminality by implication.**
>
> **Continuation and endings consume committed history, not button labels, body count alone or expected route shape.**

---

## 2. Non-collapse rules

Preserve permanently:

- Battle victory != target death;
- Battle victory != target custody;
- Battle victory != Story completion;
- target death != Story completion;
- `KILL — deterministic` != `ATTEMPT TO KILL — resolver-determined`;
- lethal intent != factual death;
- failed lethal attempt != no occurrence;
- zero deaths != mercy;
- body count != complete ending state;
- pursuit eligibility != prior branch label;
- post-Battle defeated != controlled automatically;
- controlled defeated != dead;
- escaped != spared;
- participant action != protagonist command;
- Story continuation != presentation text;
- ending evaluation != history mutation;
- Chronicle receipt != source authority;
- Battle turn count != Story-authored time by implication except where current Story explicitly consumes that Battle result as a timing gate.

---

## 3. Reusable post-resolution continuation loop

The neutral continuation loop is:

`owning resolver / Battle result commits`
→ `post-resolution participant and object state classifies`
→ `eligible protagonist disposition / lethal / custody / pursuit actions derive`
→ `player commits protagonist intent where a meaningful choice exists`
→ `deterministic KILL or resolver-determined lethal action resolves where selected and legal`
→ `death / survival / interruption / escape / custody consequences commit`
→ `timeline / position / pursuit / objective state updates through owning authority`
→ `due participant-autonomy windows resolve`
→ `participant consequences commit`
→ `next protagonist affordances derive from the updated state`
→ `repeat or satisfy authored completion / ending predicates`.

The loop may also skip a protagonist choice where no meaningful decision exists. A deterministic transition, participant reaction, Battle, pursuit, debrief or closure may be the next legal state.

Canonical rule:

> **The engine asks what is still legitimately possible after the committed result. It does not assume that winning, killing or failing automatically ends the Story unit.**

---

## 4. Post-resolution participant state classification

After any relevant resolver or Battle returns, each materially relevant participant must be represented by committed state sufficient to derive later affordances.

Exact implementation names are Coding-owned. Equivalent neutral classes include:

### `CONTROLLED_DEFEATED`

The participant is defeated and under sufficiently secure protagonist / allied control that immediate disposition can be guaranteed where authored.

Potential later actions may include, if current Story authority permits:

- deterministic `KILL`;
- custody / return to authority;
- release;
- leave and continue pursuit;
- another explicit disposition.

### `DEFEATED_BUT_NOT_CONTROLLED`

The participant lost the confrontation but retains sufficient agency, position, uncertainty or intervention opportunity that guaranteed disposition is not established.

A lethal action, if legal, is normally resolver-determined lethal intent rather than deterministic kill.

### `ESCAPED_UNAVAILABLE`

The participant is not currently actionable. No immediate disposition option may be manufactured merely because they were previously encountered.

### `DEAD`

Death is already committed. No second kill action exists.

### Other owner-authorised states

Combat / World / Story may require more specific states such as incapacitated, surrendered, restrained, unreachable, hidden, separated or protected. CE does not invent a universal state list merely for schema elegance.

Hard rule:

> **Multi-participant Battle victory must not collapse all opponents into one generic `victory` flag. Their post-resolution states remain independently addressable.**

This matters especially after group encounters: the protagonist may control one actor, lose another to escape and have a third participant already dead or otherwise unavailable.

---

## 5. Lethal semantic classes

The existing deterministic-kill contract remains binding.

### A. Deterministic authored kill

Conceptual semantic class:

`intentClass = lethal`
`outcomeMode = deterministic`

If the option is legitimately available and selected, the owning commit path establishes death.

A deterministic `KILL` is not a hidden attack roll.

Eligibility must be revalidated at commit. If the state changed so that the deterministic contract is no longer legal before protagonist intent committed, the stale option is superseded / unavailable; runtime must not silently convert it into a failed lethal attempt.

Once deterministic intent commits under valid eligibility, death and its source occurrence commit atomically/idempotently through the owning authority.

### B. Resolver-determined lethal intent

Conceptual semantic class:

`intentClass = lethal`
`outcomeMode = resolver_determined`

The protagonist commits lethal intent first. The owning resolver then commits the factual result.

Possible factual results may include:

- death;
- survival;
- interruption;
- escape;
- injury without death;
- substitution / deflection where legitimate;
- another owner-authorised result.

A non-death result remains a real lethal-intent occurrence.

### C. No lethal affordance

If current state does not support deterministic or resolver-determined lethal action, no lethal option is presented.

Do not use threatening wording to manufacture a lethal capability or guaranteed result.

---

## 6. Neutral lethal-action receipt

Every committed materially lethal protagonist action must preserve structured provenance.

Exact field names are implementation-owned. The receipt must preserve equivalent semantics to:

```text
lethalActionReceiptId
storyDecisionContextId
storyUnitRef
sceneRef / decisionPointRef
continuityLineageRef
sequenceIndex
actorRef                 // protagonist / committing actor
targetRef
intentClass = lethal
outcomeMode = deterministic | resolver_determined
selectedIntentRef
intentOccurrenceRef
eligibilityBasisRefs[]
postResolutionTargetStateBeforeRef
resolverBindingRef?
resolverRequestRef?
resolverResultRef?
factualOutcome           // death | survived | interrupted | escaped | other owner-authorised result
deathOccurrenceRef?
failedLethalAttemptOccurrenceRef?
postResolutionTargetStateAfterRef
witnessRefs[]             // only materially legitimate witnesses / observers
participantAutonomyReceiptRefs[]
timelineDeltaRefs[]
positionDeltaRefs[]
pursuitDeltaRefs[]
objectiveDeltaRefs[]
objectCustodyDeltaRefs[]
targetCustodyDeltaRefs[]
knowledgeDeltaRefs[]
relationshipHistoryRefs[]
sourceOccurrenceRefs[]
provenanceRefs[]
idempotenceKey
```

The receipt references facts owned elsewhere; it is not a second owner of death, custody, Knowledge or Battle state.

### Failed lethal attempt definition

For aggregate ending evaluation, `failed lethal attempt` means:

> a committed **resolver-determined lethal intent** whose own factual result did not commit the target's death.

A successful resolver-determined lethal action contributes a confirmed death while retaining resolver-determined provenance.

A deterministic kill should not produce a `failed lethal attempt` branch after valid commit; if eligibility was invalid before intent commit, the stale choice is rejected/superseded rather than rewritten as an attempted kill.

---

## 7. Lethal trajectory is an ordered view over receipts

Do not make the canonical lethal history a mutable counter-only object.

The authoritative trajectory is the ordered set of committed lethal-action receipts and their referenced factual occurrences within the relevant Story/Chronicle scope.

A trajectory projection may derive:

```text
trajectoryRef
scopeRef
orderedLethalActionReceiptRefs[]
confirmedKillCount
failedLethalAttemptCount
confirmedKillTargetRefs[]
failedLethalAttemptTargetRefs[]
chronologicalTargetOrder[]
```

These aggregates are conveniences for eligibility / ending-family selection / diagnostics.

They do not replace the underlying receipts.

Therefore:

- `2 kills / 1 failed attempt` preserves which two died and which one survived;
- three failed attempts preserve three lethal choices rather than presenting zero-body history as restraint;
- repeated actions against the same target remain distinguishable if current Story legitimately permits them;
- order remains material where pursuit, witness reaction or later Knowledge depends on sequence.

---

## 8. Timeline and pursuit semantics

Continuation must consume committed timing / position / pursuit facts rather than hard-coded branch terminality.

After any Battle or post-resolution action:

1. consume the owning resolver's factual timing/state result;
2. apply any explicitly authored timing gate;
3. resolve any action-specific timeline / position delta through its owner;
4. resolve due participant autonomy;
5. reevaluate which targets / locations / objectives remain reachable;
6. derive the next protagonist affordances.

### No invented hidden action cost

CE must not invent an extra timing penalty merely because a post-Battle disposition appears dramatic or because a later route should be rarer.

If Story says a deterministic post-Battle kill does **not** independently consume the authored catch-up window, runtime must preserve that.

Resolver-determined lethal attempts may change time / position where their factual resolution says they do.

### Kakashi benchmark timing

For Academy Kakashi, current Story explicitly fixes:

- Masked Interceptor PL Battle victory in **1–4 turns** preserves Package Smuggler catch-up;
- Package Smuggler PL Battle victory in **1–3 turns** then preserves ANBU Marked Target catch-up;
- if both gates are satisfied, AMT remains reachable;
- legitimate AMT reach carries existing Pakkun continuity;
- qualifying deterministic post-Battle kills on MI / PS do not receive an additional hidden timing penalty that silently invalidates this benchmark;
- later resolver-determined actions still consume their actual factual state effects.

These numeric windows are **Kakashi Story authority**, not universal CE kill timing.

---

## 9. Participant-first autonomy after lethal outcomes

The participant-first ordering contract applies after each committed kill or failed lethal action where another participant has a due action/reaction window.

Canonical order:

`lethal result commits`
→ `timeline / position / custody state commits`
→ `due autonomous participants evaluated`
→ `participant intent resolves through owning seam`
→ `participant consequence commits`
→ `next protagonist choice derives`.

Examples of legitimate autonomous consequences include:

- another target escapes while the protagonist handles a defeated actor;
- a witness withdraws, retaliates, surrenders or seeks help where legitimate;
- an ally reacts, secures an objective, blocks pursuit or refuses participation according to state;
- Pakkun reacts from his own Knowledge / role / position rather than scripted obedience.

### No free Battle actions

If Combat currently owns an encounter, Combat owns initiative, turns, action economy, damage and temporary-Summon actions.

CE cannot insert a free participant-autonomy action inside Battle merely because the Story continuation loop has an autonomy phase.

A due autonomy opportunity must be consumed:

- before Battle; or
- through an authorised Battle action / temporary-participant seam; or
- after Battle return;

but never twice.

Battle result receipts may supply turn count and participant outcome facts to Story after return; Story does not rewrite Battle history.

---

## 10. Multi-participant post-Battle ordering

A group Battle may leave several participants simultaneously defeated / controlled / available.

The protagonist does **not** automatically receive a free uninterrupted sequence of dispositions against every defeated actor.

Required process:

1. commit Battle result;
2. classify each participant independently;
3. commit object / package / objective state independently;
4. resolve already-due participant autonomy where current seam requires it;
5. derive current protagonist affordances;
6. player selects one meaningful protagonist intent;
7. resolve/commit that action;
8. rerun participant-first / timeline / reachability evaluation before the next protagonist decision.

Thus choosing to kill, arrest, release or leave one defeated participant may legitimately allow another to escape, intervene, become unavailable or change the situation where current state supports it.

This protects participant autonomy and prevents a Battle-win flag from becoming universal ownership over every actor in the scene.

---

## 11. Completion and terminality

A Story unit ends only when its authorised completion / exit predicates are satisfied.

Neither of these imply completion by themselves:

- `Battle result = victory`;
- `target state = dead`.

After each material result, the neutral Story Decision Realisation Core reevaluates:

- unresolved objective state;
- participant availability;
- package/object custody;
- pursuit eligibility;
- remaining authored pressures;
- due participant autonomy;
- protagonist Knowledge;
- legal next intents;
- mandatory authored beats;
- completion predicates.

Possible continuation states include:

- another disposition decision;
- pursuit;
- another Battle;
- participant reaction;
- custody transfer;
- debrief;
- ending evaluation;
- Story closure.

Canonical rule:

> **Terminality is explicit state satisfaction, not an implied reward for winning the last thing currently on screen.**

---

## 12. Ending evaluation boundary

The ending evaluator is a **read-only semantic consumer of committed Chronicle state** until it commits the ending-realisation occurrence itself.

It must not retroactively decide what happened.

Conceptual ending-evaluation input may include:

```text
storyUnitRef
authorityVersionRefs[]
objectiveResultRefs[]
object / package custody refs
participantOutcomeRefs[]
orderedLethalActionReceiptRefs[]
confirmedKillCount
failedLethalAttemptCount
pursuit / timing refs
participantAutonomy refs
knowledge refs
debrief communication refs / truthfulness basis
relationship/history refs
other authored ending-gate refs
```

The evaluator may derive:

```text
endingEvaluationReceiptId
endingFamilyRef
endingVariantRef
sourceStateRefs[]
sourceLethalReceiptRefs[]
sourceOccurrenceRefs[]
observerSafeProjectionRefs[]
authorityVersionRefs[]
idempotenceKey
```

The selected ending family / variant is itself provenance-bearing Story realisation.

It does not become a substitute source for deaths, attempts, custody or Knowledge.

---

## 13. Choice AND consequence must reach the ending

Ending evaluation must preserve both:

1. **what the protagonist committed to doing**; and
2. **what factually happened**.

Therefore:

- repeated lethal attempts that all fail remain a lethal-intent trajectory;
- a survivor produced by failed lethal resolution is not equivalent to deliberate mercy;
- a successful kill is not inferred merely from `Battle victory`;
- a package-success ending may coexist with Battle defeat if actual custody history supports it;
- a target may be dead while the mission objective still failed;
- a target may survive while the protagonist repeatedly chose lethal outcomes;
- debrief truthfulness / completeness is separate from actual history;
- private evaluator Knowledge must remain separate from protagonist Knowledge.

Counts may select a broad family. Exact identities, order and surrounding Chronicle facts select the actual expression / variant.

---

## 14. Kakashi three-target aggregate families

For Academy Kakashi, when lethal intent is committed against all three benchmark targets, the ending evaluator must support at minimum:

### A. 3 confirmed kills / 0 failed lethal attempts

All three targets die through legitimate deterministic or successful resolver-determined lethal actions.

### B. 2 confirmed kills / 1 failed lethal attempt

Two die; one resolver-determined lethal commitment does not produce death.

### C. 1 confirmed kill / 2 failed lethal attempts

One dies; two lethal commitments fail to produce death.

### D. 0 confirmed kills / 3 failed lethal attempts

No target dies, but Kakashi committed lethal intent against all three.

This is not a mercy route.

These are **aggregate ending families**, not four universal cutscenes.

The evaluator must still consume:

- exact killed/surviving target identities;
- chronological sequence;
- package outcome;
- pursuit history;
- Battle timing where material;
- Pakkun participation and legitimate reactions;
- Kakashi Knowledge;
- debrief truthfulness/completeness;
- custody/release results;
- any other current authored branch facts.

---

## 15. Debrief, private evaluation and Chronicle Receipt

All downstream projections must consume the same committed history.

### Debrief

A factual debrief may report only what the reporting actor legitimately knows and says.

It must not erase earlier deaths or attempts merely because the final confrontation involved a different target.

### Private evaluation

An authorised private evaluator such as Minato may consume broader facts only where their Knowledge authority supports them.

The evaluator must distinguish lethal intent from lethal success. Zero deaths from three failed lethal attempts is not evidence of restraint.

Private evaluation remains private unless a separate disclosure occurrence commits it.

### Origin Chronicle Receipt

The Origin Chronicle Receipt must read the same committed lethal-action / death / pursuit / custody history later Story consumes.

It may summarize, but must not collapse exact participant identity into body count alone.

Presentation must remain observer-safe.

---

## 16. Save/load, idempotence and replay

Committed lethal actions and ending realisations are factual history.

UI reopen, browser refresh, scene revisit, presentation rerender, save/load or Story Board reconstruction must not reroll:

- lethal intent class;
- target;
- resolver result;
- death state;
- failed lethal-attempt occurrence;
- chronology;
- pursuit eligibility already committed;
- participant-autonomy consequence;
- ending family/variant once the ending commits.

Idempotence must prevent duplicate death occurrences, duplicate failed-attempt history and duplicate ending commits.

A new factual action may create a new lethal receipt; it does not mutate the previous receipt into a different history.

---

## 17. Knowledge and witness safety

A lethal-action receipt may retain witness/provenance information for semantic purposes, but presentation may expose only observer-safe facts.

Preserve:

- actual witness presence != every witness understood the same thing;
- participant presence != participant Knowledge of motive;
- death fact != knowledge of who caused it for every observer;
- protagonist lethal intent may be inferred only where an observer legitimately perceived enough to know it;
- private evaluator facts must not leak into protagonist-facing debrief;
- ending family labels must not expose hidden internal classifications or future route gates.

---

## 18. Interaction with fixed Story invariants

Neutral CE semantics do not override deliberately authored Story outcomes.

Examples:

- a Story-fixed deterministic kill remains deterministic when its entry predicates are satisfied;
- a Story-fixed clean withdrawal may commit before any later participant-autonomy window exists;
- a Story-fixed Battle caller/opposition remains fixed;
- an authored target escape may close pursuit if current Story actually fixes that escape as complete;
- participant-first autonomy cannot undo a fact whose resolution already committed before that autonomy window became due.

Conversely, an older branch note that merely assumed terminality because an encounter ended is not a fixed invariant if newer Story authority explicitly restores state-derived continuation.

---

## 19. Academy Kakashi implementation projection

Current Writing authority requires the eventual Kakashi runtime to represent at least these reusable semantics:

1. Pickpocket success = clean extraction + completed withdrawal + no Battle.
2. Pickpocket failure = branch-specific 3-v-1 Battle at the original exchange.
3. Multi-opponent victory returns independent participant-state classifications.
4. MI <= 4 turns preserves PS catch-up.
5. PS <= 3 turns then preserves AMT catch-up.
6. Legitimate AMT reach preserves Pakkun continuity.
7. Deterministic post-Battle kills on the qualifying MI/PS benchmark do not receive an invented hidden timing penalty.
8. Resolver-determined lethal attempts retain their actual state/timing effects.
9. `TAKE HIM DOWN` defeat loses target custody while package custody comes from committed participant/Battle state.
10. Final debrief / Minato / Chronicle Receipt / ending consume exact lethal, package, pursuit and participant history.

This section records current Kakashi projection. It does not make those exact branch facts universal CE law.

---

## 20. Coding implementation requirements

When Kakashi Writing closure is final and the downstream implementation tranche is activated, Coding / Runtime should implement the smallest Alpha-safe form of this contract inside the existing neutral Story-decision architecture.

Minimum required capability:

- post-resolver participant-state classification;
- stable lethal semantic class (`deterministic` vs `resolver_determined`);
- protagonist lethal-intent occurrence committed separately from factual result where resolver-determined;
- death / failed-lethal-attempt provenance;
- ordered lethal-action receipts;
- Battle turn-count consumption by Story timing gates without rewriting Combat history;
- state-derived pursuit continuation;
- participant-first autonomy between material protagonist decisions;
- no free/double NPC Battle actions;
- ending evaluation from exact committed receipts/facts;
- debrief / private evaluation / Chronicle Receipt consuming the same history;
- save/load / retry idempotence;
- no ending selected while required package/object/participant state remains semantically unresolved.

Alpha does **not** require a general procedural morality engine, unrestricted AI Story planner or generic kill system across every game surface.

Kakashi is the first concrete consumer.

---

## 21. Minimum diagnostics / regression requirements

Source/headless/integration tests should eventually prove at minimum:

1. deterministic kill cannot resolve as survival after valid commit;
2. resolver-determined lethal intent can produce death or non-death without erasing intent history;
3. a failed lethal attempt produces a persistent occurrence / receipt;
4. Battle victory alone does not create a death;
5. target death alone does not force Story completion;
6. group Battle participants retain independent post-resolution states;
7. selecting one disposition may allow another participant's due autonomy before the next player choice;
8. pursuit eligibility derives from committed timing/position state;
9. Kakashi MI <=4 + PS <=3 can preserve AMT reach;
10. a qualifying deterministic MI/PS kill does not secretly invalidate that authored benchmark through an invented time penalty;
11. save/load reproduces lethal receipt order and exact target identities;
12. no duplicate death / failed-attempt receipt appears on retry;
13. 3 kills / 0 failed attempts differs from 0 kills / 3 failed attempts even though both contain three lethal intents;
14. two histories with the same kill count but different survivor identity can select different ending variants;
15. ending evaluation does not mutate source history;
16. debrief and Origin Chronicle Receipt read the same committed lethal/custody history;
17. hidden private evaluation does not leak into protagonist-facing presentation;
18. Combat action economy remains authoritative while Battle is live;
19. participant autonomy is not consumed twice across pre-Battle / in-Battle / post-Battle seams;
20. browser Golden remains false until installed-browser Kakashi validates the full lived flow.

---

## 22. Priority / handoff state

**CE design / semantic closure:** CLOSED by this contract.

**Kakashi Writing closure:** still separately owned by Writing; current latest authority includes the decision-continuation matrix and Structured Autonomy anchor addendum.

**Coding implementation:** downstream through existing #188 / #192 runtime work **after Writing publishes final Kakashi closure / reconciled active anchors**, per #195 request. Do not make Coding consume conflicting pre-closure anchor inventories blindly.

**Browser / Golden:** NOT CLAIMED.

**Future Achievement / Discord-share treatment:** queued separately (#196); not an Alpha blocker from this CE contract.

---

## 23. Final canonical lock

> **A Battle result commits what Battle established. It does not decide death, custody, pursuit or Story completion by implication.**
>
> **A deterministic KILL commits death when legitimately selected. A resolver-determined lethal action commits intent first and factual result second.**
>
> **Failed lethal intent remains Chronicle history.**
>
> **The lethal trajectory is an ordered provenance-bearing history, not a body-count scalar.**
>
> **After each material result, participant state, timeline, autonomy and pursuit are reevaluated before the next protagonist choice.**
>
> **Kill != automatic ending.**
>
> **Ending evaluation consumes both protagonist intent and factual consequence, plus the rest of the exact Chronicle.**
>
> **Kakashi's 3/0, 2/1, 1/2 and 0/3 lethal-result families are required Story consumers of these reusable semantics, not universal morality categories.**
>
> **Design closed != implemented != runtime validated != browser Golden GREEN.**
