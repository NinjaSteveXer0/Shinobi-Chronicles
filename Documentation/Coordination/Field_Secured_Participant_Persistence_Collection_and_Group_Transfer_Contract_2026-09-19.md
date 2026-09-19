# Shinobi Chronicles — Field-Secured Participant Persistence, Collection and Group Transfer Contract

**Date:** 2026-09-19  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING REUSABLE CUSTODY SEMANTIC — POST-RESTRAINT ONLY**  
**Source issue:** #244  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Scope

This contract closes only the semantics **after** an authored Story disposition has already committed a participant as successfully restrained / field-secured.

It does **not** own:

- whether Battle victory occurred;
- whether a restraint choice is available;
- whether the player-facing label is `RESTRAIN` vs `ATTEMPT TO RESTRAIN`;
- any hidden `CONTROLLED_DEFEATED` gate;
- the pursuit timer/window;
- Battle action economy;
- package custody;
- participant death;
- the exact prose/choreography of the restraint scene.

Those are already governed by current Story / Combat / global post-Battle authority.

Current global rule consumed:

`Documentation/Coordination/Global_Post_Battle_Disposition_Player_Agency_and_Control_State_Simplification_2026-09-19.md`

For current Kakashi Origin, selecting an authored post-Battle `RESTRAIN ... AND CONTINUE` choice after valid Battle victory commits the immediate restraint fact directly.

#244 begins **after that fact exists**.

Canonical boundary:

```text
authored RESTRAIN AND CONTINUE
-> participant field-secured alive at exact location
-> #244 persistence / continuity / collection / transfer semantics
```

---

## 2. Canonical post-restraint state

A participant who has been restrained and left in place while the protagonist continues elsewhere requires one explicit semantic state:

`FIELD_SECURED_PENDING_COLLECTION`

This is a reusable semantic state.

Coding may encode it as an enum, state facet, custody record or equivalent existing participant-state structure. It does **not** require a second custody database.

The state means all of the following are true:

- participant identity is exact;
- participant is alive unless a later exact occurrence changes that;
- participant has been successfully field-secured;
- participant remains physically at a committed authored location;
- participant is **not** currently travelling with the protagonist;
- participant is **not** yet in institutional custody;
- participant is eligible for later collection if no intervening factual occurrence invalidates that;
- the exact restraint occurrence is preserved as provenance.

Minimum semantic payload:

```text
participantRef
status = FIELD_SECURED_PENDING_COLLECTION
securedByActorRef
securedAtLocationRef
restraintOccurrenceRef
alive = true
escortState = NOT_ESCORTED
institutionalCustodyHolderRef = null
collectionState = PENDING
continuitySourceRefs[]
```

Exact field names are Coding-owned.

Preserve:

> **field-secured != active escort**

> **field-secured != ANBU custody**

> **field-secured != Police custody**

> **field-secured != package custody**

---

## 3. Persistence rule

Field-secured custody is persistent Chronicle truth.

It does not disappear because:

- the protagonist leaves the scene;
- the Scene Board closes;
- another Battle begins;
- the player saves/loads;
- the browser refreshes;
- the player opens another UI;
- elapsed real time passes;
- another participant is later defeated.

A field-secured participant remains field-secured until a new committed factual occurrence changes that state.

There is **no hidden decay timer** and no background random escape roll.

Canonical rule:

> **No new causal occurrence -> no change to field-secured state.**

This keeps save/load deterministic and prevents restraint from becoming an invisible reroll system.

---

## 4. Escape / intervention while the protagonist is elsewhere

A field-secured participant may later:

- remain secured;
- escape;
- be freed by another actor;
- be moved by an authorised actor;
- die from a separately authored cause;
- undergo another exact authored continuity result.

But such a change requires an explicit legitimate trigger + resolver/Story occurrence.

Required causal form:

```text
existing field-secured record
+ exact authored continuity trigger
-> owning resolver / Story transition
-> one committed continuity occurrence
-> participant state changes once
```

Examples of legitimate triggers may include:

- a known third party reaches the location;
- a later Story beat explicitly evaluates the restraint;
- an authored environmental event creates a real escape opportunity;
- an authorised NPC is sent to recover the captive.

Do not infer an escape merely because Kakashi is absent.

Do not reroll escape/intervention on:

- refresh;
- save/load;
- repeated query;
- re-entering the location;
- repeated presentation.

A continuity occurrence requires a stable source identity and is idempotent.

Suggested semantic key:

`(participantRef, restraintOccurrenceRef, continuityTriggerOccurrenceRef)`

One trigger produces one committed result.

---

## 5. Participant identity is never collapsed into a count

Multiple secured captives remain separate participant records.

Never replace:

```text
Masked Interceptor = FIELD_SECURED_PENDING_COLLECTION
Package Smuggler = FIELD_SECURED_PENDING_COLLECTION
ANBU Marked Target = ACTIVE_ESCORT
```

with only:

```text
captives = 3
```

Counts may be derived for presentation, achievements or summaries, but they are not source truth.

Every captive keeps:

- exact participant identity;
- exact restraint source;
- exact location;
- exact life state;
- exact current custody/escort state;
- exact escape/intervention history;
- exact final institutional destination.

This is required for mixed histories.

---

## 6. Derived captive set

The current "secured captive set" is a **derived query**, not a new collective person/entity.

Conceptually:

```text
securedCaptiveSet =
all exact participants in current Chronicle scope
where alive
and current state is:
  FIELD_SECURED_PENDING_COLLECTION
  or COLLECTED_ACTIVE_ESCORT
and not already institutionally transferred
and not escaped / released / dead / otherwise unavailable
```

The set may contain one, two, three or more participants.

The set must be recalculated from exact committed participant states when the Story reaches a collection/disposition boundary.

Do not preserve only a stale numeric count.

---

## 7. Collection

Collection is the factual transition from:

`FIELD_SECURED_PENDING_COLLECTION`

to:

`COLLECTED_ACTIVE_ESCORT`

for one exact participant.

Collection requires:

- the participant is still alive;
- the participant is still field-secured;
- the participant's current committed location is known/available to the collecting route;
- the Story/World sequence legitimately reaches that location;
- no committed escape/removal fact supersedes the restraint.

Collection does not teleport a captive.

If multiple field-secured captives exist at different locations, an authored collection sequence may collect them in order.

Use one exact child occurrence per participant:

```text
collect MI -> MI = COLLECTED_ACTIVE_ESCORT
collect PS -> PS = COLLECTED_ACTIVE_ESCORT
```

A parent collection sequence/manifest may group those actions for presentation, but each participant transition remains independently addressable.

If a previously secured participant escaped before collection, they are not silently restored into the escort group.

---

## 8. Collection manifest

When Story begins a multi-captive collection sequence, runtime may create a stable non-person aggregate:

`captiveCollectionManifest`

Conceptual contents:

```text
collectionManifestId
sourceStoryOccurrenceRef
candidateParticipantRefs[]
collectedParticipantRefs[]
unavailableParticipantRefs[]
collectionOccurrenceRefs[]
escortPartyRefs[]
destinationIntentRef? // null until chosen
```

This manifest is only orchestration/provenance.

It is **not** the custody owner and does not replace participant states.

Save/load must reopen the same manifest and completed child collection occurrences rather than rerunning them.

---

## 9. Active escort

`COLLECTED_ACTIVE_ESCORT` means the participant has been physically collected and is travelling under the current escort sequence.

It remains distinct from institutional custody.

Minimum semantics:

- exact participant;
- exact collection occurrence;
- escort party/source;
- current escort sequence;
- no final institution yet.

A participant may move from field-secured to active escort without becoming ANBU/Police property.

Preserve:

> **collection != institutional transfer**

---

## 10. Group transfer intent

When two or more eligible living captives are actively collected/escorted, Story may present a group intent such as:

- `TAKE THEM ALL BACK TO ANBU`
- `TAKE THEM ALL TO THE UCHIHA POLICE FORCE`

The player-facing action is one group decision.

The factual transfer is still participant-by-participant.

Canonical transaction:

```text
group transfer intent
-> freeze exact eligible escort member refs
-> preflight destination legality
-> create stable parent group-transfer occurrence
-> commit one child institutional-transfer occurrence per participant
-> each participant enters exact institutional custody
-> mark parent complete
-> present one group handoff scene
```

---

## 11. Group transfer atomicity / crash recovery

A group transfer must not leave arbitrary partial custody merely because the browser crashes after the first child record.

Use an idempotent parent transaction.

Required behavior:

1. freeze the exact eligible participant refs at transfer commit;
2. create/reuse one stable parent transfer occurrence;
3. commit/reconcile each exact child participant transfer;
4. on retry/load, reuse existing successful child transfers and complete only missing children;
5. project completion only when the parent transaction is complete.

This is transaction idempotence, not semantic collapsing.

Every participant still receives a distinct final transition such as:

```text
MI -> ANBU_INSTITUTIONAL_CUSTODY
PS -> ANBU_INSTITUTIONAL_CUSTODY
AMT -> ANBU_INSTITUTIONAL_CUSTODY
```

or the Police equivalent.

---

## 12. What "ALL" means

`TAKE THEM ALL ...` means:

> all participants in the exact currently committed eligible escort set for that disposition boundary.

It does not mean:

- every enemy ever encountered;
- escaped captives;
- dead participants;
- released participants;
- participants still field-secured but not yet collected unless the authored sequence first collects them;
- hidden participants the protagonist does not know about.

If only one eligible captive remains after factual escape/death/removal, Story should project the appropriate singular disposition instead of pretending a group still exists.

Presentation adapts to factual membership.

---

## 13. Destination state

Institutional destination is a participant-level fact.

Minimum destinations currently required:

- `ANBU_INSTITUTIONAL_CUSTODY`
- `UCHIHA_POLICE_INSTITUTIONAL_CUSTODY`

A parent group transfer records the shared destination intent, but each participant receives their own custody transition.

Do not encode only:

`groupTransferredTo = ANBU`

without participant-level custody facts.

Later Story / Chronicle Receipt must be able to report exact mixed histories.

---

## 14. Pakkun continuity

Pakkun remains a separate autonomous participant.

His presence does not:

- create player ownership;
- create Summon acquisition;
- make him the custody owner;
- automatically prevent escape;
- automatically move captives;
- automatically create group-transfer success.

For the current Academy Kakashi trajectory:

- if Pakkun has legitimately entered the route and no explicit departure has committed, he may remain present through the connected collection/escort sequence as current Story authority permits;
- his exact assistance, guarding, scouting or non-intervention must still come from an authorised participant-autonomy/Story action;
- his presence may make the authored escort choreography physically credible;
- field-secured participant persistence does not depend on Pakkun being present.

If Pakkun departs, that is a separate occurrence.

Departure does not silently release already secured captives.

---

## 15. Participant autonomy interaction

Participant-first Story autonomy remains valid.

A field-secured captive is generally not treated as freely available for ordinary autonomous movement merely because a new Story decision boundary occurs.

Any escape/resistance/intervention must come from the exact continuity semantics in Section 4.

This prevents:

```text
refresh
-> autonomy reruns
-> prisoner randomly escapes
```

Likewise, an external participant may affect a secured captive only when a legitimate due autonomy window/trigger exists.

Do not create unrestricted background NPC simulation.

---

## 16. Pursuit timing remains outside #244

This contract intentionally does not encode Kakashi's MI/PS/AMT turn thresholds.

After restraint commits, current Story authority owns which pursuit remains available.

The custody layer merely preserves the restrained participant while that separately-authorised pursuit proceeds.

Canonical boundary:

```text
RESTRAIN AND CONTINUE commits field-secured participant
-> current Story state reevaluates pursuit from its own timing/position facts
-> #244 never adds or removes pursuit by itself
```

This prevents stale autonomy anchors or historical turn thresholds from being reintroduced through custody implementation.

---

## 17. Mixed histories

One reusable participant-state model must support combinations such as:

- MI institutional custody / PS institutional custody / AMT institutional custody;
- MI dead / PS institutional custody / AMT institutional custody;
- MI escaped from field restraint / PS dead / AMT institutional custody;
- MI field-secured but not collected / PS escaped / AMT dead;
- any other factually reachable combination.

No flat ending matrix per permutation is required.

Terminal evaluation / Chronicle Receipt queries exact participant records.

---

## 18. Save/load and presentation

Save/load must preserve:

- field-secured state;
- exact secured location;
- restraint provenance;
- any continuity event result;
- collection state;
- collection manifest;
- active escort membership;
- transfer parent transaction;
- completed participant transfer children;
- Pakkun presence/departure separately.

Presentation must read those facts.

Presentation cannot:

- re-secure a participant;
- reroll escape;
- recollect an already collected participant;
- retransfer a participant;
- change destination;
- invent a missing captive.

---

## 19. Required runtime invariants

At minimum:

1. `RESTRAIN AND CONTINUE` immediate success is consumed from Story authority, not re-resolved by #244.
2. Field-secured state persists across scene exit/save/load.
3. No passive timer/random escape exists.
4. Escape/intervention requires one exact source occurrence and is idempotent.
5. Exact participant identity survives every transition.
6. Secured captive count is derived, never source truth.
7. Collection occurs participant-by-participant.
8. Collection cannot resurrect an escaped/dead/released captive.
9. Group transfer freezes the exact eligible set.
10. Group transfer commits exact child institutional-custody transitions.
11. Retry after partial technical commit reconciles rather than duplicates.
12. ANBU and Police destination facts remain distinct.
13. Pakkun presence does not become ownership/custody.
14. Pakkun departure does not erase field restraint.
15. Custody logic does not alter pursuit timing.
16. Package custody remains separate.
17. Battle victory remains separate from institutional custody.
18. Chronicle Receipt can distinguish field-secured / escaped-from-restraint / collected / institutionally transferred.
19. UI refresh does not rerun continuity or transfer.
20. Existing historical internal control classifications cannot re-gate these post-restraint semantics.

---

## 20. Academy Kakashi benchmark

The intended all-live route is representable as:

```text
MI defeated
-> RESTRAIN MI AND CONTINUE
-> MI = FIELD_SECURED_PENDING_COLLECTION @ exact MI location

PS reached + defeated
-> RESTRAIN PS AND CONTINUE
-> PS = FIELD_SECURED_PENDING_COLLECTION @ exact PS location

AMT reached
-> Pakkun present under current Story authority
-> AMT defeated + secured for final escort

collection sequence
-> collect MI
-> collect PS
-> MI / PS / AMT = COLLECTED_ACTIVE_ESCORT

final intent
-> TAKE THEM ALL BACK TO ANBU
   OR
-> TAKE THEM ALL TO UCHIHA POLICE FORCE

group transfer
-> one parent transfer occurrence
-> one institutional-custody child occurrence per exact participant
```

If an exact continuity occurrence changes one captive before collection, the final set adapts to committed truth.

The route is possible without an invented hidden custody penalty.

---

## 21. Ownership

### Story / Writing

Owns:

- when collection is narrated/performed;
- exact route/choreography;
- player-facing group/singular transfer choices;
- participant dialogue;
- scene continuity.

### CE / Codex / Coordination

Owns:

- field-secured semantic state;
- persistence/non-reroll rules;
- participant-identity preservation;
- collection/group-transfer causal structure;
- cross-system non-collapse.

### Coding / Runtime

Owns:

- representation in existing state/ledger structures;
- persistence;
- idempotent collection/transfer transactions;
- save/load;
- focused QA;
- installed-browser validation.

### Combat

Owns:

- Battle only;
- no post-restraint custody ownership is created by Combat.

### Acquisition / Inventory

Owns no captive custody merely because an entity is "held".

Participant custody is not Inventory ownership.

---

# Final lock

> **After restraint commits, the captive remains an exact living participant field-secured at an exact location until another exact causal occurrence changes that fact. Collection moves that participant into active escort; institutional transfer then commits each captive separately even when the player chooses one group action. No hidden decay, random escape, teleportation, count-only state, package-custody collapse or Pakkun ownership is introduced.**
