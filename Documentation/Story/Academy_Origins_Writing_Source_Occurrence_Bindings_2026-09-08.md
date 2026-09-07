# Shinobi Chronicles — Academy Origins Writing Source-Occurrence Bindings

**Date:** 2026-09-08  
**Owner:** Writing  
**Status:** AUTHORITATIVE FOR WRITING-OWNED SOURCE OCCURRENCE ADDRESSES

This document answers the Writing-owned portion of GitHub issue #11. It supplies stable production `sourceOccurrenceId` values and commit boundaries for the already-closed consequence predicates in the Chronicle Engine Design Bible document `Games/Shinobi Chronicles/Alpha Academy Origins - Machine Addressable Consequence Contract.md`.

It does **not** create new rewards, predicates, consequences or progression semantics.

Preserve:

- Origin selection ≠ reward.
- Story Scene / Origin contract ID ≠ sourceOccurrenceId.
- consequenceContractId ≠ sourceOccurrenceId.
- factual occurrence ≠ consequence automatically.
- one occurrence may support several distinct consequence contracts only where the occurrence really commits all required facts.
- invalid/aborted/uncommitted scene attempts create no source occurrence.
- retry/save/load must preserve the same committed source occurrence address and never duplicate it.

## Commit-boundary rule

Unless a row below states otherwise, the occurrence commits only when the authored beat has resolved far enough that every named `source.fact.*` field is factual and no longer speculative. Dialogue selection alone does not commit an occurrence unless the dialogue itself is the factual occurrence being recorded.

## Writing-owned binding matrix

### Hinata

#### HIN-01

- `sourceOccurrenceId`: `occ_origin_hinata_controlled_hyuga_spar_resolution`
- commit boundary: the controlled Hyūga spar ends and Hinata's completed participation plus the demonstrated response set are known.
- required facts:
  - `actorVariantId = academy_hinata`
  - `controlledSparCompleted`
  - `demonstratedResponses`

#### HIN-02 / HIN-03

Both consume the same factual younger-student interaction occurrence because the choice and its resolved outcome belong to one committed encounter; the consequence contracts remain distinct.

- `sourceOccurrenceId`: `occ_origin_hinata_younger_student_practice_resolution`
- commit boundary: the younger-student interaction ends after Hinata's chosen response has actually occurred.
- required facts:
  - `actorVariantId = academy_hinata`
  - `youngerStudentChoice`
  - `selfTaijutsuLearningOccurred`
  - `youngerStudentParticipantRef` when a teaching/explanation branch occurred

No HIN-02/HIN-03 consequence is implied by `leave_them_to_figure_it_out`.

### Izuno Wasabi

#### IZU-01

- `sourceOccurrenceId`: `occ_origin_izuno_pursuit_tracking_resolution`
- commit boundary: the relevant pursuit/tracking phase resolves enough to establish whether reliable environmental tracking and/or false-trail discovery actually occurred.
- required facts:
  - `actorVariantId = academy_izuno`
  - `reliableEnvironmentalTrackingEstablished`
  - `falseTrailCorrectlyDiscovered`

#### IZU-02

- `sourceOccurrenceId`: `occ_origin_izuno_intercept_prediction_resolution`
- commit boundary: the attempted prediction/intercept resolves and it is known whether the intercept was reached by prediction rather than inferred speed.
- required facts:
  - `actorVariantId = academy_izuno`
  - `interceptReachedByPrediction`

#### IZU-03

- `sourceOccurrenceId`: `occ_origin_izuno_pursuit_cooperation_resolution`
- commit boundary: the cooperative pursuit beat resolves and the actual cooperating participant set is known.
- required facts:
  - `actorVariantId = academy_izuno`
  - `cooperatedWithAcademyStudents`
  - `cooperatingParticipantRefs`

IZU-04 remains World/Missions/Events-owned and is routed separately.

### Mirai

#### MIR-01

- `sourceOccurrenceId`: `occ_origin_mirai_substitution_verification_resolution`
- commit boundary: pre-checkpoint verification resolves and the basis on which Mirai verified the substitution is factual.
- required facts:
  - `actorVariantId = academy_mirai`
  - `substitutionVerifiedBeforeCheckpoint`
  - `verificationBasis`

#### MIR-02

- `sourceOccurrenceId`: `occ_origin_mirai_changed_chakra_observation`
- commit boundary: Mirai legitimately observes the changed/unfamiliar chakra condition; this occurrence records only the observed difference, not hidden identity truth.
- required facts:
  - `actorVariantId = academy_mirai`
  - `changedOrUnfamiliarChakraObserved`
  - `observedChakraDifference`

#### MIR-03

- `sourceOccurrenceId`: `occ_origin_mirai_checkpoint_escort_resolution`
- commit boundary: the checkpoint escort resolves and both protection-to-checkpoint and whether pre-checkpoint substitution verification occurred are settled facts.
- required facts:
  - `actorVariantId = academy_mirai`
  - `personTravellingWithMiraiReachedCheckpointProtected`
  - `substitutionVerifiedBeforeCheckpoint`

MIR-01 and MIR-03 remain mutually exclusive final escort-resolution consequence branches exactly as defined by CE authority.

### Menma

MEN-01/MEN-02 remain bound directly to Combat action occurrences. MEN-03 is Combat-owned and separately routed in issue #10.

#### MEN-04

- `sourceOccurrenceId`: `occ_origin_menma_anko_training_interest_response`
- commit boundary: the optional Menma/Anko exchange resolves and Anko has actually expressed future-training interest in response to current history.
- required facts:
  - `actorVariantId = academy_menma`
  - `ankoTrainingInterestExpressed`

This fact grants no guaranteed training opportunity or access.

#### MEN-05

- `sourceOccurrenceId`: `occ_origin_menma_nine_tails_internal_exchange`
- commit boundary: the authored internal exchange with the Nine-Tails has actually occurred.
- required facts:
  - `actorVariantId = academy_menma`
  - `nineTailsInternalExchangeOccurred`

The occurrence grants no battle assistance, technique access or transformation access by itself.

### Kushina

#### KUS-01

- `sourceOccurrenceId`: `occ_origin_kushina_residual_seal_work_resolution`
- commit boundary: Kushina's qualifying sealing-crisis work resolves and the qualifying Fūinjutsu work is factual.
- required facts:
  - `actorVariantId = academy_kushina`
  - `qualifyingFuinjutsuWorkCompleted`

#### KUS-02

- `sourceOccurrenceId`: `occ_origin_kushina_gerotora_identity_disclosure`
- commit boundary: Gerotora actually communicates his own identity to Kushina.
- required facts:
  - `actorVariantId = academy_kushina`
  - `gerotoraCommunicatedOwnIdentity`

#### KUS-03

- `sourceOccurrenceId`: `occ_origin_kushina_gerotora_causal_explanation`
- commit boundary: Gerotora actually gives the bounded residual-formula explanation to Kushina.
- required facts:
  - `actorVariantId = academy_kushina`
  - `gerotoraExplainedResidualFormulaInference`

#### KUS-04

- `sourceOccurrenceId`: `occ_origin_kushina_joint_residual_seal_closure`
- commit boundary: the joint residual-seal closure with Gerotora completes.
- required facts:
  - `actorVariantId = academy_kushina`
  - `jointResidualSealClosureWithGerotora`

#### KUS-05

- `sourceOccurrenceId`: `occ_origin_kushina_gerotora_first_contact`
- commit boundary: the first-contact encounter with Gerotora becomes a committed occurrence, regardless of whether later sealing work qualifies.
- required facts:
  - `actorVariantId = academy_kushina`
  - `gerotoraFirstContactOccurred`

These are intentionally separate factual occurrences so identity Knowledge, causal explanation, sealing application and shared-history meanings do not collapse.

### Kurenai

#### KUR-01 / KUR-02

Both consume one final Bell Test resolution occurrence; consequence exclusivity determines which consequence may commit.

- `sourceOccurrenceId`: `occ_origin_kurenai_bell_test_resolution`
- commit boundary: the Bell Test occurrence ends and one final `bellTestOutcomeClass` is committed.
- required facts:
  - `actorVariantId = academy_kurenai`
  - `bellTestOutcomeClass` in `complete_loss | partial_loss | partial_win | complete_win`

### Iwabee

#### IWA-01

- `sourceOccurrenceId`: `occ_origin_iwabee_training_ground_reshape_resolution`
- commit boundary: the formal terrain-reshaping objective resolves and it is factual whether Iwabee completed the objective.
- required facts:
  - `actorVariantId = academy_iwabee`
  - `trainingGroundReshapeObjectiveCompletedByIwabee`

IWA-02 remains World/Missions/Events-owned because it is the Rogue Genin interruption/response occurrence and is routed separately.

### Metal Lee

#### MET-01

- `sourceOccurrenceId`: `occ_origin_metal_private_training_resolution`
- commit boundary: qualifying private Taijutsu/conditioning work has completed and the observer discovery occurs afterward, making both predicate facts stable.
- required facts:
  - `actorVariantId = academy_metal_lee`
  - `qualifyingPrivateTaijutsuOrConditioningWorkCompleted`
  - `observerDiscoveryOccurredAfterQualifyingPrivateWork`

#### MET-02

- `sourceOccurrenceId`: `occ_origin_metal_pressured_performance_resolution`
- commit boundary: the Origin-specific pressured-performance scene/encounter resolves and Writing consumes the legitimate performance evidence into exactly one contextual class.
- required facts:
  - `actorVariantId = academy_metal_lee`
  - `pressuredPerformanceClass` in `strong | mixed | rough`

This source occurrence does not rewrite underlying capability or create a permanent anxiety state.

#### MET-03

- `sourceOccurrenceId`: `occ_origin_metal_protective_response_resolution`
- commit boundary: the training-dummy hazard resolves far enough to establish whether Metal attempted a protective response, what he attempted, and the factual outcome.
- required facts:
  - `actorVariantId = academy_metal_lee`
  - `protectiveResponseAttempted`
  - `protectiveResponseKind`
  - `protectiveResponseOutcome`

MET-04 remains World/Missions/Events-owned because the exact inviting-Genin participant identity and encounter occurrence must be supplied by the factual world owner.

## Rows not owned by Writing

The following issue-#11 rows are intentionally **not** assigned IDs here:

- IZU-04
- IWA-02
- MET-04
- KAK-01
- KAK-02
- KAK-03
- OBI-01
- OBI-02
- OBI-03
- OBI-04
- OBI-05

These require one World/Missions/Events return containing exact stable source occurrence IDs and participant/world-instance refs where required.

## Writing verdict

Writing-owned source-address closure: **22/22 CLOSED** for the rows above.

Issue #11 as a whole remains open until the 11 World/Missions/Events-owned rows return and the complete 33-row implementation matrix can be handed to Coding.
