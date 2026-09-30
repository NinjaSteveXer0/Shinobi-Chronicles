# Shinobi Chronicles — Phase 2 Persistent Chronicle Safety Constitution

**Date:** 2026-10-01  
**Owner:** Stephen / CE / Codex / Coordination  
**Status:** **BINDING PHASE-2 SAFETY AUTHORITY — ACTIVATES WITH PHASE 2**  
**Primary priority:** Finish 10/10 Academy Origins GOLDEN, then expand without corrupting the Chronicle those Origins created.

## 1. Why this exists

Phase 1 proved bounded Origins and the shared Battle System.

Phase 2 introduces persistent cross-system state at a much larger scale:

- current team;
- persistent Stats and discipline development;
- Nature Development;
- Technique Practice and Skill Access;
- Bloodline / Hosted Entity state;
- resistance/conditioning;
- relationship/shared-history evidence;
- rumours and Knowledge;
- Shinobi Record / Codex discovery;
- exact durable object instances and provenance;
- World/CE event history;
- Promotion/roster transitions;
- Energy and resource transactions;
- later difficulty inheritance.

The danger is no longer only “does this screen work?”

The danger is:

> **does one action create one coherent Chronicle truth that every later system consumes without duplication, contradiction, leakage or reroll?**

This Constitution hardens that boundary.

It extends the existing runtime-safety, Golden-promotion, save/load, idempotence and owner-isolation authorities. It does not replace them.

---

## 2. Phase-2 entry gate

Phase 2 does not formally activate until:

1. all 10 Academy Origins are Stephen-GOLDEN / frozen;
2. the canonical shared Battle System is Stephen-GOLDEN for the applicable Origin set;
3. exact known-good production candidate HEAD is recorded;
4. current save-compatibility corpus is GREEN at that candidate;
5. rollback/checkpoint reference is recorded;
6. known Origin/Battle Coding blockers = 0.

Planning/docs may occur before this gate.

Large runtime tranches should not interrupt the final Origin Golden loop unless Stephen explicitly changes priority.

---

## 3. Stable-person / stable-object identity first

Persistent development/history must attach to stable semantic identity, not presentation assets.

For Characters:

`stable persistent Character / ownedCharacterId / progressionCharacterId`
!=
`representation/card ID`
!=
`portrait asset`
!=
`current team slot`.

Therefore:

- Mikoto development does not reset because her visible card changes to Sharingan Mikoto;
- Hinata's Bloodline history does not live inside one art asset;
- later-rank representations inherit authorised persistent history;
- removing a Character from a team does not delete their development;
- Guest Ally participation does not silently create team membership.

For durable objects:

`object definition != exact object instance != visual icon`.

---

## 4. Chronicle State Manifest — mandatory

Before a new Phase-2 persistent domain is implemented, it must be registered in one machine-readable or otherwise centrally testable **Chronicle State Manifest**.

Minimum fields per persistent domain:

```text
stateDomainId
semanticOwner
canonicalWritePath
stableIdentityKey
savePath
schemaVersion
sourceOccurrenceIdFormat
idempotenceKeyFormat
derivedFields[]
projectionConsumers[]
migrationRule
resetRule
difficultyScope
inheritanceRule
devOverridePolicy
qaRefs[]
```

Candidate domains include:

- currentTeam;
- characterStats;
- disciplineDevelopment;
- natureDevelopment;
- techniquePractice;
- learnedSkills;
- bloodlineState;
- hostedEntityState;
- resistanceDevelopment;
- relationshipEvidence;
- rumoursKnowledge;
- codexDiscovery;
- durableObjectInstances;
- objectProvenance;
- tutorialProgress;
- energy;
- promotionState;
- difficultyInheritance.

If the owner/write path cannot be named, the feature is not ready for Coding.

---

## 5. One semantic writer per durable fact

Preserve existing project-wide law:

> **one runtime responsibility -> one production owner**

For Phase 2:

- Training does not directly write PL;
- Shinobi Record does not unlock Skills;
- Codex does not create ownership;
- UI does not awaken Bloodlines;
- Battle does not rewrite team assignment;
- World does not mint Character ownership unless Acquisition consumes the result;
- CE does not write Combat mechanics;
- relationship projection does not fabricate hidden thoughts.

Multiple readers are fine.

Silent dual-write is prohibited.

---

## 6. Source fact -> derived state -> presentation ordering

Every cross-system action should follow:

```text
authorised occurrence
-> canonical semantic commit
-> derived recalculation
-> downstream eligibility update
-> observer-safe projection
```

Examples:

### Stat growth
discipline threshold commits
-> exact Stat +1
-> PL recalculates
-> new Skill/training eligibility may change
-> Shinobi Record projects result.

### Sharingan awakening
awakening resolver commits
-> persistent awakened state
-> contextual-use eligibility updates
-> optional Sharingan representation becomes available
-> Battle package remains separately evaluated
-> Record/Codex project observer-safe result.

### Rewarded weapon
reward entitlement resolves
-> Acquisition commits ownership
-> exact object instance mints/transfers
-> provenance commits
-> Inventory/Record project result.

Presentation never runs this chain backwards.

---

## 7. Causal envelope for multi-system events

One meaningful Story/World/CE occurrence may affect several systems.

It should carry one stable causal envelope such as:

```text
sourceOccurrenceId
participants[]
location
playerAction
resolverResult
semanticConsumers[]
committedAt
```

Each consumer writes only its owned consequence using that same causal ancestry.

Example:

Kakashi hotspot event
-> World result
-> relationship evidence
-> Knowledge update
-> gift transfer
-> Chronicle history
-> future opportunity eligibility.

Reload/reopen must not create a second copy of any consequence.

---

## 8. Save/schema migration hard gate

Phase 2 materially expands persisted state.

Every persistent tranche must:

1. declare schema/version impact;
2. preserve current save compatibility where required;
3. migrate deterministically;
4. keep compatibility reader pure;
5. write migrated/current form once;
6. never reroll committed outcomes;
7. never duplicate rewards/development/provenance;
8. never resurrect retired owners;
9. extend the save-compatibility corpus.

The current #311 compatibility model remains the benchmark.

Phase-2 corpus should eventually include at minimum:

- pre-Phase-2 Academy free-play save;
- current-team save;
- mid-discipline-development save;
- just-after Stat breakthrough save;
- mid-Nature-training save;
- mid-Technique-Practice save;
- awakened Bloodline save;
- attached-but-Battle-locked Hosted Entity/Bloodline save;
- relationship/shared-history evidence save;
- rumour/Knowledge save;
- exact durable weapon-instance/provenance save;
- post-Promotion/pre-roster-finalisation save;
- Energy-active save;
- later inherited-difficulty save when that phase activates.

---

## 9. No fabricated retroactive history

A new Phase-2 system must not silently invent past facts for an older save.

Examples prohibited by default:

- retroactively claiming an Origin Battle awarded Nature Development when no authoritative receipt existed;
- inventing relationship trust because two Characters were previously colocated;
- fabricating weapon provenance beyond known source facts;
- marking Skills observed because a Battle package once contained them when the Character did not actually observe them;
- claiming Bloodline awakening because a representation exists.

Backfill is allowed only when current authority can derive the fact deterministically from already-committed history.

Unknown remains unknown.

---

## 10. Eligibility engine must be explainable

Every significant gated opportunity should have machine-readable eligibility predicates and reason codes.

Applies to:

- Skill training;
- mentor routes;
- Bloodline awakening opportunities;
- World/CE events;
- Promotion/Rank opportunities;
- Special Jōnin specialisations;
- Staged Battles;
- Arena/Tournament eligibility;
- advanced training;
- Codex/Record revelations.

Diagnostics should be able to answer:

- eligible: YES/NO;
- satisfied predicates;
- failed predicates;
- blocking state;
- source authority.

Player-facing UI shows only observer-safe reasons.

Do not expose hidden requirements merely because diagnostics know them.

---

## 11. Randomness only after eligibility

Preserve:

`randomness among eligible possibilities != randomness deciding eligibility`.

Do not use RNG as the primary resolver for:

- whether a fully eligible Skill route exists;
- whether persistent training progress counts;
- whether an awakening requirement was actually satisfied;
- whether an already-earned reward persists.

Randomness may select among already-eligible World/event possibilities where authorised.

---

## 12. Resource-spend preflight

Before consuming:

- Energy;
- Ryō;
- Arena attempts;
- consumable Items;
- training repetitions;
- limited materials;

the game must know the action is valid.

Where observer-safe, the player should know:

- cost;
- whether primary development is still possible;
- whether the activity has hit a ceiling;
- whether a different secondary purpose such as Technique Practice remains active.

No silent paid/limited-resource action for known zero value.

Failed attempts may still produce legitimate failure/exposure/history evidence where authored.

---

## 13. Dev / owner override quarantine

Phase-2 testing will require powerful overrides.

Examples:

- unlimited Energy;
- broad Character selector;
- direct location jump;
- forced event eligibility;
- diagnostic hidden-state view;
- fixture Stats/resources.

These must be unmistakably dev/owner mode.

Dev override must not:

- contaminate normal save files silently;
- commit fake Chronicle history unless the test explicitly requests it;
- unlock normal-player Achievements;
- alter release defaults;
- become an undocumented player-access path;
- substitute for normal-path QA.

Normal-player and dev-path QA remain distinct.

---

## 14. Difficulty-aware, not difficulty-bloated

New reusable systems should accept an explicit difficulty/run context where relevant.

Do not hard-code “Academy Student forever” into foundational state.

But:

> **difficulty-aware architecture != implementing Genin Difficulty now**

Academy Student remains the only active production ruleset until the later-difficulty tranche is deliberately activated.

No speculative Genin content may block current Alpha unless it prevents a foundational schema mistake.

---

## 15. Current Team is one authoritative assignment

One committed current-team truth must feed:

- Training;
- Practical;
- Exams;
- Story where appropriate;
- World;
- Battle deployment selection;
- Shinobi Record.

Preserve:

`current team != activity participants != Battle deployment != Guest Allies != My Clan formation`.

No screen maintains a private competing team.

Promotion/roster transition must explicitly replace/transition the current-team assignment rather than relying on presentation.

---

## 16. Hidden-content / observer-safety gate

Player-facing UI, accessible DOM/data projection and Record/Codex must not leak:

- undiscovered Skill names;
- hidden awakening requirements;
- future Missions;
- unknown Character representations;
- undiscovered event pools;
- private NPC thoughts;
- hidden outcome tables;
- secret locations;
- internal CE eligibility scores/state.

Dev diagnostics may expose them only inside explicit dev mode.

Unknown/hinted/rumoured/observed/known remain distinct.

---

## 17. Human-readable projection rule

Raw internal IDs may exist in diagnostics.

Normal player UI must not primarily display values such as:

- machine event IDs;
- internal source IDs;
- raw resolver IDs;
- generic placeholder keys;
- unformatted enum names.

Every player-facing projection requires a human-readable label or intentionally omitted field.

This is especially binding for Shinobi Record.

---

## 18. Staged content activation — no reservoir dump

Designed content does not equal active content.

For World, CE events, Skills, mentors, curricula and later difficulties:

```text
authored
-> authority-closed
-> implementation-ready
-> activated in bounded slice
-> source/runtime GREEN
-> Stephen browser GOLDEN
-> broader activation
```

Do not bulk-activate hundreds of seeds merely because they exist.

First prove representative slices.

---

## 19. Feature isolation / kill-switch rule

Every substantial new Phase-2 subsystem should be capable of being disabled from production activation without corrupting unrelated Chronicle state while it is still AMBER/GREEN.

Examples:
- Elemental Training;
- CE hotspot benchmark;
- Energy;
- new provenance UI;
- new mentor chain.

Disabling presentation/activation must not delete already legitimate committed facts.

This provides a safe rollback path during browser testing.

---

## 20. Frozen-Origin regression firewall

GOLDEN Origins remain frozen.

A Phase-2 shared-system change may touch reusable infrastructure used by Origins only when necessary.

Every such change requires:
- affected Origin regression;
- shared Battle regression where relevant;
- save/load regression;
- no Story prose/route mutation without explicit owner authority.

Phase 2 does not reopen Origins merely because code is nearby.

---

## 21. Semantic history vs UI scale

Chronicle history may grow indefinitely.

The UI must not attempt to render every receipt/event/card/provenance row at once.

Phase-2 Record/Codex implementation should support:
- indexing;
- filtering;
- pagination/windowing or equivalent bounded rendering;
- significance-ranked recent summaries;
- lazy detail projection.

Do not delete semantic history merely to keep the UI fast.

Summaries are projections, not destructive compression of authoritative facts.

---

## 22. Interaction significance is mandatory for CE/social scale

Relationship/shared-history evidence requires significance/saturation.

Repeated trivial interactions cannot create infinite meaningful state.

Use:
- contact;
- minor;
- meaningful;
- major;
- defining;

or the final ratified equivalent.

Significance governs durable social evidence and presentation priority.

It is not friendship XP.

---

## 23. Browser trial before broad replication

For every new systemic Phase-2 mechanic:

> **one narrow end-to-end browser slice before broad content multiplication**

Examples:

- one discipline growth path before all curricula;
- one element before five complete elemental schools;
- one mentor route before dozens of Sannin/Hokage chains;
- one CE survivor/reactive event before broad dynamic-event activation;
- three provenance objects before the whole item catalogue;
- one relationship-gated Skill route before mass authoring.

Stephen's browser verdict may change the design.

Do not scale an unproven seed.

---

## 24. RED / AMBER / GREEN / GOLDEN remains binding

Phase-2 subsystem status:

- **RED** — absent/broken/not usable;
- **AMBER** — meaningful implementation exists but incomplete/uncertain;
- **GREEN** — source/runtime/regression works for intended slice;
- **GOLDEN** — Stephen installed-browser accepted/frozen for scope.

Never promote:
- design document -> GREEN;
- automated QA -> GOLDEN;
- one happy route -> subsystem GOLDEN;
- UI screenshot -> semantic implementation proof.

---

## 25. Phase-2 Golden evidence bundle

Before a subsystem becomes GOLDEN, record:

- exact authority consumed;
- exact production HEAD;
- canonical runtime owner;
- state paths changed;
- save/schema impact;
- focused QA;
- relevant negative assertions;
- save/load/idempotence;
- observer-safety check;
- relevant shared regression;
- Stephen browser verdict.

This becomes the rollback/debug receipt.

---

## 26. Top-10 replacement rule

The Phase-2 Top 10 is a work queue, not a permanent commandment.

When one item becomes GOLDEN:
- remove/graduate it;
- promote the next highest real blocker;
- generate the next Top 10 only from actual remaining Alpha needs.

Do not keep completed work alive as fake project activity.

Do not allow speculative post-Alpha systems to displace a current Alpha blocker.

---

## 27. Final lock

> **Phase 2 may add complexity, but it may not add ambiguity about truth. Every persistent fact has one stable identity, one semantic owner, one causal source, one save path, one migration rule and observer-safe projections. New systems must prove one narrow end-to-end browser slice before broad activation, preserve Golden Origins, remain rollback-safe while immature, and never turn presentation, randomness, repetition or dev tooling into hidden semantic authority.**
