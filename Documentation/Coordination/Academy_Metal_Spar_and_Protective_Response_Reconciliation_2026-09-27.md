# Shinobi Chronicles — Academy Metal Spar + Protective Response Reconciliation

**Date:** 2026-09-27  
**Owner:** CE / Codex / Coordination  
**Incoming handoff:** #389  
**Status:** **CE CONTRACT CLOSED / PL-REGISTRY DEPENDENCY REQUIRED / COMBAT FOLLOWS / CODING NOT YET RELEASED**

## 1. Scope

This contract closes the reusable semantics and exact Story/Battle seams for the two unresolved Academy Metal Lee Origin mechanics:

1. controlled SPAR PL Battle;
2. MET-03 protective-response outcome resolver.

It does not invent PL/Registry calibration or Combat numerics that belong to other specialists.

Current Writing authority remains:
- Documentation/Story/Academy_Metal_Lee_Origin_2026-09-27_Scene_Authority_and_Backdrop_Contract.md
- Documentation/Story/Academy_Metal_Lee_Origin_333_Player_Facing_Rewrite_Candidate_2026-09-27.md

Backdrop remains:
Scene backdrops/academy_training_ground_courtyard.png

## 2. Existing Metal authority consumed

Live Registry / Combat authority already closes Academy Metal:

Registry ID:
academy_metal_lee

Base stats:
- Ninjutsu 6
- Taijutsu 13
- Bukijutsu 9
- Fūinjutsu 5
- Kinjutsu 5
- Genjutsu 5
- Stamina 14

Base PL:
13

Prepared Battle palette:
- academy_metal_lee_leaf_rising_kick
- academy_metal_lee_training_flurry
- academy_metal_lee_pressure_rhythm
- academy_metal_lee_guarded_footwork
- academy_metal_lee_conditioned_endurance

Current Combat semantics include:
- Leaf Rising Kick = authored fixed Taijutsu Attack PL 6;
- Training Flurry = authored fixed Taijutsu Attack PL 5;
- Pressure Rhythm = transient +2 resolver-local bonus to authored damage Skill;
- Guarded Footwork = 25% ratio guard;
- Conditioned Endurance = +4 temporary Battle capacity, explicitly not healing / Stamina / Effective Stat mutation.

Writing-friendly practice labels such as SPINNING KICK / FULL-FORCE FIST are expression vocabulary and do not silently rename production Battle Skill IDs.

Intensive Focus remains forbidden.

# GAP A — CONTROLLED SPAR

## 3. Stable opponent identity

Story / World stable participant identity remains:

metal_origin_inviting_genin

Historical prior-contact source remains:

occ_origin_metal_inviting_genin_prior_contact

Player-facing display may remain:

GENIN

Unnamed display != identity-less participant.

However current production authority contains no Battle-capable Registry / PL representation for this person.

CE therefore does not invent one.

PL / Registry / Rank must close:
- exact Battle representation ID or exact stable participant -> Registry representation mapping;
- canonical seven Base Stats;
- Base PL from current PL formula;
- formal Rank/category fields needed by runtime;
- Current/Effective initialization rules if anything differs from Base.

Combat must then close the exact prepared spar palette/action package for that exact representation.

## 4. Spar encounter identity

Stable Battle config ID:

academy_metal_lee_origin_controlled_spar

Stable encounter ID:

origin_academy_metal_lee:inviting_genin_spar

Exact participants:

PLAYER:
- academy_metal_lee

OPPOSITION:
- metal_origin_inviting_genin through the exact PL/Registry Battle mapping supplied downstream.

Environment:

Scene backdrops/academy_training_ground_courtyard.png

This is a one-on-one controlled PL Battle.

No additional participant is inferred.

## 5. Story caller / return seam

Writing-owned caller beat:

met_spar_05

After met_spar_05 completes, the SPAR branch launches the exact controlled Battle above.

Battle returns once to the same Origin Story lineage.

Post-Battle Story selector consumes the committed Origin-specific performance class and resumes at exactly one:

- strong -> met_spar_strong_01
- mixed -> met_spar_mixed_01
- rough -> met_spar_rough_01

No new Story branch is created from win/loss alone.

Battle victory/defeat is factual Battle history; the Origin-specific pressured-performance class is a separate Story interpretation.

## 6. Controlled spar terminal law

The spar uses ordinary Battle PL depletion.

0 Remaining Battle PL = withdrawal.

The spar ends when either exact participant withdraws.

Do not infer:
- injury;
- death;
- custody;
- Origin failure;
- cowardice/bravery;
- permanent confidence/anxiety.

If the Genin withdraws first:
- player-side Battle victory is factual;
- Story still classifies Metal only from Metal's final Remaining Battle PL ratio.

If Metal withdraws first:
- opposition-side Battle victory is factual;
- Metal's final Remaining Battle PL is 0;
- Story continues through rough;
- the Origin does not fail merely because Metal lost the controlled spar.

## 7. Metal pressured-performance ratio

Define the fixed spar denominator:

metalSparStartingUnderlyingBattlePLMaximum

This is Metal's ordinary Battle PL maximum at spar start before temporary Battle-capacity effects created during the spar.

At current Base authority this begins from 13 unless legitimate pre-Battle Current/Effective authority later changes the spar start.

Performance ratio:

remainingRatio = finalRemainingBattlePL / metalSparStartingUnderlyingBattlePLMaximum

Clamp only for classification purposes to [0, +infinity); do not mutate Battle truth.

Bands:

- remainingRatio > 0.50 -> strong
- 0.25 <= remainingRatio <= 0.50 -> mixed
- remainingRatio < 0.25 -> rough

Boundary examples:
- exactly 50% = mixed;
- exactly 25% = mixed;
- 0 PL / withdrawal = rough.

Temporary Battle capacity such as Conditioned Endurance may legitimately preserve additional remaining capacity, but it does not change the fixed denominator after Battle start.

These bands are Academy Metal Story interpretation only.

They are not generic Battle performance grades.

## 8. MET-02 commit boundary

On spar terminal settle:
1. commit factual Battle result;
2. capture Metal final Remaining Battle PL;
3. derive exactly one strong | mixed | rough class from the fixed ratio;
4. commit occ_origin_metal_pressured_performance_resolution with pressuredPerformanceClass;
5. return to the corresponding Writing beat.

No second MET-02 commit on reload/Story re-entry.

## 9. Spar reward

No current durable authority grants a spar reward.

Therefore:

> **SPAR REWARD = NONE under current authority.**

Coding must not invent Ryō, items, Character EXP, Stat gain or hidden development merely because a Battle occurred.

A later specialist may separately author development/reward evidence if desired.

## 10. Spar save/load and idempotence

Persist enough to restore:
- exact encounter/config ID;
- exact opponent stable/Registry identity mapping;
- each participant's Remaining Battle PL;
- turn/action opportunity;
- transient Battle states;
- committed action receipts;
- terminal result;
- final Metal Remaining Battle PL;
- derived strong/mixed/rough class once committed;
- Story caller/return lineage.

Reload must not:
- restart the spar after terminal commit;
- reroll opponent action;
- duplicate MET-02;
- duplicate MET-04;
- alter the final classification;
- convert withdrawal into injury/death.

# GAP B — MET-03 PROTECTIVE RESPONSE

## 11. Protective response is not Battle

The dummy hazard is a scoped contextual resolver, not a PL Battle.

It must not:
- create a fake enemy participant;
- subtract Battle PL;
- use Battle withdrawal;
- create a permanent trait/stat;
- reuse MET-02 strong/mixed/rough as the result itself.

Canonical non-collapse:

> underlying capability != pressured performance != protective-response outcome

## 12. Stable action IDs

Exact MET-03 response kinds:

- redirect_dummy
- take_impact
- destroy_dummy

Exact result classes:

- success
- partial
- failure

MET-03 source remains:

occ_origin_metal_protective_response_resolution

Committed facts must include:
- protectiveResponseAttempted = true
- protectiveResponseKind = exact action ID
- protectiveResponseOutcome = exact result class

No other production result label is valid for new executions.

The stale attempt_committed outcome is superseded.

## 13. Resolver input law

The resolver must consume only legitimate current authoritative state captured at the protective choice commit.

Minimum input envelope:

- actorRegistryId = academy_metal_lee
- responseKind
- current developed/effective Academy Metal Stats relevant to the action
- exact currently authorised capability evidence if Combat requires it
- fixed authored dummy-hazard context
- exact physically present intervention participant ref = metal_origin_inviting_genin
- prior committed Story facts only where they establish physical/contextual state

Do not create:
- Protector Trait;
- bravery/cowardice;
- confidence;
- anxiety;
- hidden morality;
- permanent capability rewrite.

## 14. Action capability channels

CE closes the semantic capability channel, not numeric thresholds.

### redirect_dummy

Primary capability channel:
Taijutsu / controlled physical redirection.

Uses current legitimate effective Taijutsu state and any exact Combat-authored relevant capability factor.

### take_impact

Primary capability channel:
Stamina / physical stopping capacity.

Uses current legitimate effective Stamina state and any exact Combat-authored relevant defensive/body-control factor.

No injury is implied by choosing or succeeding with this action.

### destroy_dummy

Primary capability channel:
Taijutsu / decisive striking force and control.

Uses current legitimate effective Taijutsu state and any exact Combat-authored relevant striking capability factor.

Writing vocabulary does not automatically invoke Full-Force Fist as a Battle Skill ID unless Combat explicitly maps that expression to a legitimate current action source.

## 15. Pressured-performance non-collapse

MET-02 strong | mixed | rough is **not** a direct MET-03 lookup table.

Forbidden examples:
- strong => success;
- mixed => partial;
- rough => failure.

The protective hazard is a new factual challenge.

Current source contains no authorised anxiety/confidence modifier.

Therefore Combat must not secretly convert MET-02 into a hidden scalar.

If a future contextual modifier is explicitly authored, it requires separate authority.

## 16. Three-band causal resolver shape

Combat must supply deterministic action-specific thresholds/effectiveness under the above capability channels.

Required semantic shape:

- success = Metal's committed action alone is sufficient to protect the student;
- partial = Metal causally reduces/changes the hazard but does not complete protection alone;
- failure = Metal attempts but does not causally complete protection.

For partial/failure, Writing already establishes a legitimate intervention:

metal_origin_inviting_genin

Therefore the resolver may return:

interventionRequired = false for success

interventionRequired = true for partial/failure
interventionParticipantRef = metal_origin_inviting_genin

This records causality; it does not create Battle participation or reward.

Combat owns the exact numeric/categorical boundary producing success/partial/failure.

CE does not invent threshold numbers.

## 17. Determinism and RNG

The current project has no durable random protective-check mechanic.

Do not invent a hidden dice roll merely to create three outcome classes.

Resolver must be deterministic from:
- committed response kind;
- current authorised capability state;
- authored hazard difficulty/context;
- exact resolver thresholds supplied by Combat.

If Combat wants stochastic resolution, that is a new design decision requiring separate CE reconciliation.

## 18. MET-03 injury boundary

Regardless of result:

- threatened student is not injured under current Writing authority;
- Metal is not automatically injured;
- Genin is not automatically injured;
- observers are not automatically injured.

Another legitimate intervention prevents harm on partial/failure.

The outcome records Metal's causal contribution only.

## 19. MET-03 commit/idempotence

The protective choice itself commits intent/attempt.

The authoritative result commits only after the resolver produces success | partial | failure.

Then exactly one MET-03 source occurrence commits with:
- attempted;
- exact response kind;
- exact result.

Reload must not:
- rerun an already committed resolver;
- change result class;
- duplicate the source occurrence;
- create a second intervention;
- turn observer interpretation into objective result.

The result may then select the already-written Writing beat family for that action/result.

# DOWNSTREAM OWNERSHIP

## 20. PL / Registry / Rank — first required owner

Must close metal_origin_inviting_genin Battle representation and PL.

This is the first blocking dependency because Combat cannot author a legitimate opponent package without exact representation/PL identity.

## 21. Combat / Skills / Items / Weapons — second owner

After PL/Registry closure, Combat must close in one package:

A. inviting Genin:
- exact legal prepared spar palette;
- action values/semantics;
- AI legality;
- controlled-spar compatibility.

B. MET-03:
- exact deterministic thresholds/effectiveness for redirect_dummy;
- exact deterministic thresholds/effectiveness for take_impact;
- exact deterministic thresholds/effectiveness for destroy_dummy;
- exact evidence fields consumed by the CE result envelope.

Combat should then route the implementation-ready result directly to Coding/Runtime.

## 22. Coding release condition

Coding is not yet authorised to invent either missing package.

Once PL/Registry and Combat close:
- consume exact controlled-spar package;
- consume MET-03 resolver;
- update stale attempt_committed logic;
- implement caller/return and performance bands;
- preserve MET-04 prior-contact identity;
- prove save/load/idempotence;
- test all three protective action/result classes;
- test Metal 0-PL -> rough without injury inference.

## 23. Final lock

> **Academy Metal's SPAR branch is a real one-on-one controlled PL Battle between academy_metal_lee and the stable historical participant metal_origin_inviting_genin once PL/Registry supplies that participant's Battle representation. Ordinary PL withdrawal ends the spar; Metal withdrawal at 0 PL is not Origin failure and maps to the Origin-specific rough performance class. Performance uses a fixed start-of-spar underlying Battle PL maximum as denominator: >50% strong, 25–50% mixed, <25% rough. The spar grants no reward under current authority. MET-03 is a separate deterministic contextual capability resolver, not a Battle and not a restatement of MET-02. redirect_dummy uses a Taijutsu redirection channel, take_impact uses a Stamina stopping-capacity channel, and destroy_dummy uses a Taijutsu striking/control channel. Combat owns the exact success/partial/failure thresholds; no hidden anxiety/confidence/morality or RNG is invented. Partial/failure truthfully records intervention by the already-present metal_origin_inviting_genin.**
