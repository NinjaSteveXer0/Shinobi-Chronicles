# Shinobi Chronicles — Arc 1 Missions 11–12 Machine-Addressable Story Runtime Contract

**Owner:** Writing — Konoha  
**Date:** 2026-09-11  
**Source handoff:** GitHub issue #97  
**Parent coordination:** #36  
**Active Coding consumer:** #41  
**Status:** **WRITING RUNTIME AUTHORITY — MISSIONS 11–12**

This document converts the already-closed Mission 11/12 Story skeleton into exact Story caller/return authority for the first real Arc-1 runtime run. It does not redesign Arc 1, Combat, Registry/PL, Hosted Entity ontology, Progression, or World authority.

## Global runtime rules

1. Story Scene IDs are runtime registration addresses, not World occurrence IDs.
2. Writing-owned `occ_*` IDs commit only when the named factual Story transition actually occurs.
3. Invalid, aborted or pre-commit attempts create no committed occurrence.
4. Save/load/retry resumes the same mission/scene lineage. A factual transition may have only one committed occurrence identity in that lineage.
5. Story occurrence != Battle occurrence.
6. Battle result != Mission result automatically.
7. Battle defeat != death, injury, custody or loss of a Hosted Entity automatically.
8. Player intent != party intent. Independently acting participants resolve intent before protagonist tactical intent where reasonably observable.
9. Presence != Battle participation. Story supplies exact factual `activeParticipantIds` and `sideAssignments` after independent intent is resolved.
10. Testimony != World Truth. Observer Knowledge remains bounded.
11. Story may consume capability/relationship/result facts from owning systems but may not manufacture them.
12. Mission completion != Progression unlock automatically.
13. Developer-route historical results are authoring evidence only; Combat must return factual runtime outcomes.

---

# Mission 11 — The Man Who Signed the Night Shift

## Registration

- Mission ID: `arc1_m11_man_who_signed_night_shift`
- Primary Story Scene: `scene_arc1_m11_moroboshi_confrontation`
- Pump Four Story Scene: `scene_arc1_m11_pump_four_recall`
- Pump Four post-Battle Story Scene: `scene_arc1_m11_pump_four_return`
- Lower-chamber Story Scene: `scene_arc1_m11_lower_chamber_better_host_reveal`
- Mission-12 handoff Scene: `scene_arc1_m11_to_m12_better_host_handoff`

## Legal entry

Enter when Mission 10 has factually resolved far enough for the Moroboshi trail to be actionable and the caller supplies the current protagonist/team participants, Moroboshi state, relevant Pump Four world context and any surviving custody/evidence state from prior missions.

## Writing-owned committed occurrences

### Moroboshi report/channel history established

`occ_arc1_m11_moroboshi_internal_security_report_history_established`

Commit when the scene factually establishes that Moroboshi previously reported through an Internal Security channel, received `MATTER ALREADY UNDER AUTHORISED REVIEW`, and then received White Thread acknowledgement two days later.

Payload:
- `moroboshiParticipantRef`
- exact observing/listening participant refs
- `internalSecurityReportMade = true`
- `authorisedReviewReceiptObserved = true`
- `whiteThreadAcknowledgementObserved = true`
- bounded testimony/evidence refs

This does not prove institutional Internal Security ownership of the network.

### Pump Four order becomes actionable

`occ_arc1_m11_pump_four_order_actionable`

Commit when the fresh order `PUMP STATION FOUR / 01:30 / OPEN LOWER SERVICE ACCESS` is legitimately recovered/established and Pump Four becomes a legal Story destination.

Payload:
- caller-owned order/evidence ref
- caller-owned Pump Four world/location ref
- observing participant refs

### Controlled Moroboshi handoff chosen/resolved

`occ_arc1_m11_moroboshi_controlled_handoff_resolved`

Commit only if Moroboshi is factually brought into the Pump Four operation under the resolved route.

Payload:
- `moroboshiParticipantRef`
- actual escort/custody participant refs
- current custody/cooperation state

### Recall contact authorised by protagonist intent

`occ_arc1_m11_recall_contact_intent_committed`

Commit when the protagonist factually permits the initial Recall contact to proceed far enough for the Recall attempt to become actionable.

This occurrence records protagonist intent only. It does not establish Recall success, carrier obedience, Recognition Substitution success or Battle victory.

### Pump Four Battle caller

`occ_arc1_m11_pump_four_battle_called`

Commit immediately before calling existing Combat encounter:

`arc1_m11_pump_four_recall_encounter`

Required caller payload:
- `storyMissionId = arc1_m11_man_who_signed_night_shift`
- `storySceneId = scene_arc1_m11_pump_four_recall`
- same-lineage return address `scene_arc1_m11_pump_four_return`
- exact current `activeParticipantIds`
- exact current `sideAssignments`
- exact current participant availability/custody facts required by Combat
- causal Story occurrence refs that made the encounter actionable

### Allied participant rule

Writing does **not** hard-code developer Mikoto/Hinata/Anko/Menma target distribution.

Before the Battle call:
1. current NPC participants independently resolve/express tactical intent from current Chronicle state;
2. protagonist tactical intent is then resolved;
3. Story supplies only the participants who are factually active in the encounter and their factual sides;
4. Battle owns targeting/action resolution thereafter.

## M11 factual Recall/Recognition consumption

Story may consume the existing factual sources:
- `arc1_m11_echo_recall_refusal`
- `arc1_m11_menma_recognition_substitution`

When returned/committed by owning runtime authority, Story may project their narrative consequences.

Hard separation:
- `battleResult` is the Combat result;
- `recallResult` is the Recall protocol result;
- `carrierResponse` is the Echo response;
- Recognition Substitution is a factual capability use/result against the exact compatible contact;
- none is inferred from another.

Story must not infer `carrierResponse = refused` because Menma won, or infer `recallResult = incomplete_data` because the carrier refused, unless those facts are independently returned by the owning resolver.

### Pump Four return receipt

`occ_arc1_m11_pump_four_return_consumed`

Commit once for the factual return from `arc1_m11_pump_four_recall_encounter` into `scene_arc1_m11_pump_four_return`.

Required payload keeps separate:
- `battleResult`
- `recallResult`
- `carrierResponse`
- Recognition Substitution result/source refs where present
- exact participant survival state
- exact participant injury/neutralisation state
- exact custody/escape/withdrawal state
- Moroboshi current state
- Kagawa current state
- Kagawa/Moroboshi testimony refs actually produced
- `storyContinuationClass`

## M11 continuation classes

Coding must select from factual state; Story does not force developer victory.

### `pump_four_access_secured`

Use when the returned factual state makes lower-service access safely/actionably available without inventing an outcome. This may follow a win or another legitimate result; Battle label alone is not the predicate.

Story may then commit:

`occ_arc1_m11_lower_service_access_secured`

and continue to `scene_arc1_m11_lower_chamber_better_host_reveal`.

### `pump_four_access_contested`

Use when Battle ended but the lower route is known/exposed and remains presently unsafe, blocked or controlled by unresolved opposition.

Story remains in the Mission-11 lineage. No lower-chamber reveal commits. No Mission-12 handoff occurs. A later legitimate recovery/re-entry occurrence may resume this same lineage; UI retry/save-load must not duplicate prior factual occurrences.

### `pump_four_forced_withdrawal`

Use when current participant state requires withdrawal from Pump Four.

Story records the factual withdrawal and preserves all prior discoveries. Mission 11 remains unresolved. No automatic rewind, death, custody or progression consequence is inferred.

### `pump_four_interrupted`

Use when an external factual interruption terminates the encounter without resolving access. Story records the interruption and remains unresolved until a legitimate later occurrence re-establishes actionability.

## Lower-chamber transition

### Better Host route revealed

`occ_arc1_m11_better_host_lower_chamber_revealed`

Commit only after `occ_arc1_m11_lower_service_access_secured` and when the lower-chamber scene factually establishes:
- a person is present below;
- Kagawa testimony, where actually available, includes the Better Host claim;
- lower-system observations establish the bounded host/carrier/pair-state facts actually perceived.

Kagawa testimony remains testimony unless separately established as World Truth.

### Menma descent resolved

`occ_arc1_m11_lower_chamber_descent_resolved`

Commit the factual descent participant set after independent participant intent resolves. The developer route had Menma descend alone; runtime must not hard-code that distribution.

Payload:
- actual descending participant refs
- actual participants remaining above and their current intent/role where committed

### Ren/Better Host encounter established

`occ_arc1_m11_primary_host_encounter_established`

Commit when the lower chamber factually establishes the teenage host and the system identifies the bounded pair-state/primary-host facts authored by Story.

Do not infer the participant's personal name until Mission 12 establishes Ren.

### Mission 11 → Mission 12 handoff

`occ_arc1_m11_to_m12_better_host_handoff_committed`

Commit when the lower-chamber scene reaches the historical anchor that another host/carrier pair exists and the deeper system wakes into the Better Host confrontation.

Required payload:
- exact current protagonist/participant refs
- exact lower-chamber/world instance ref
- exact observed host ref supplied by Registry/World authority
- exact current Echo host-relationship refs already authoritative
- same Chronicle/Story lineage ref

This occurrence is the legal Story caller into Mission 12. Mission 11 completion itself grants no Progression.

---

# Mission 12 — The Better Host

## Registration

- Mission ID: `arc1_m12_better_host`
- Master sequence ID: `arc1_m12_better_host_climax`
- Entry Story Scene: `scene_arc1_m12_ren_reveal_and_comparative_retrieval`
- Stage-One pre-Battle Scene: `scene_arc1_m12_stage1_early_reciprocity`
- Stage-One return Scene: `scene_arc1_m12_stage1_return`
- Reciprocity transition Scene: `scene_arc1_m12_reciprocity_established`
- Stage-Two pre-Battle Scene: `scene_arc1_m12_stage2_echo_menma`
- Stage-Two return Scene: `scene_arc1_m12_stage2_return`
- Kurama-loan Scene: `scene_arc1_m12_kurama_voluntary_loan`
- Stage-Three pre-Battle Scene: `scene_arc1_m12_stage3_terminal_optimisation`
- Stage-Three return Scene: `scene_arc1_m12_stage3_return`
- Wind-down/naming Scene: `scene_arc1_m12_arc1_winddown_echo_naming`

## Legal entry

Requires `occ_arc1_m11_to_m12_better_host_handoff_committed` in the same Story lineage and current factual availability of the Better Host scene.

## Ren and Echo factual reveal

### Ren identity established

`occ_arc1_m12_ren_identity_established`

Commit when the Better Host identifies himself as Ren and Registry resolves the same persistent person `arc1_ren`.

### Echo programme term/cycle established

`occ_arc1_m12_echo_programme_cycle_established`

Commit when the scene factually establishes the programme term `Echoes` and the bounded attach → adapt/learn → carry → transfer/return → Recall model.

### Comparative retrieval authorised/active

`occ_arc1_m12_comparative_retrieval_active`

Commit only if the comparative-retrieval route factually begins. Preserve independent participant intent before protagonist intent. This occurrence may reference existing programme source `arc1_m12_programme_comparative_retrieval_link` where owning runtime commits it.

### Sazan alive revealed

`occ_arc1_m12_sazan_alive_revealed`

Commit when the inner containment factually reveals `arc1_dr_sazan` alive. This supersedes prior belief/testimony that sanitisation killed him without rewriting that earlier belief as never having existed.

## Stage One caller

### Voluntary manifestation / cooperation request

`occ_arc1_m12_echo_voluntary_manifestation_committed`

Commit only when the exact hosted Entity `arc1_menma_echo` voluntarily answers the request for cooperation and the partial manifestation factually occurs.

This is not ownership, mastery or the permanent reciprocity receipt by itself.

### Stage One Battle call

`occ_arc1_m12_stage1_battle_called`

Calls:
`arc1_m12_ren_stage_1_battle`

Required caller payload:
- `masterSequenceId = arc1_m12_better_host_climax`
- same Story lineage
- `returnSceneId = scene_arc1_m12_stage1_return`
- exact active participants/sides required by Combat
- current Menma representation authorised by Registry
- exact hosted-source refs required by Combat

## Stage One factual return

`occ_arc1_m12_stage1_return_consumed`

Payload:
- exact `battleResult`
- exact Menma/Ren participant survival/injury/neutralisation/withdrawal state
- exact Hosted Entity attachment state
- exact scene interruption/custody/escape facts
- `stage1ContinuationClass`

Legitimate classes:

### `stage1_reciprocity_opportunity_live`

Use when, regardless of win/loss label, Menma and `arc1_menma_echo` remain factually available in the active climax context and legitimate voluntary/mutual operational evidence exists such that Story/CE can resolve the authored reciprocal-relationship transition.

### `stage1_reciprocity_not_yet_established`

Use when Stage One ended but the factual relationship evidence is insufficient. Stage Two may not begin. Story may continue only through legitimate same-lineage interaction that could establish the transition; it must not infer reciprocity from Battle completion.

### `stage1_climax_aborted`

Use when death, separation, custody, withdrawal, interruption or another factual state makes the reciprocal transition unavailable in the current climax. No Stage Two call occurs unless a later legitimate authored occurrence restores actionability.

Developer Menma losing Stage One is one valid history inside `stage1_reciprocity_opportunity_live`; it is not required.

## Reciprocal relationship transition — Stage Two gate

### Writing/CE transition occurrence

`occ_arc1_m12_menma_echo_reciprocity_established`

Commit only when the current Chronicle factually establishes that:
- Menma is the same persistent person;
- `arc1_menma_echo` is still the exact hosted Entity;
- `host_rel_menma_arc1_echo` remains the relationship lineage;
- cooperation is voluntary;
- Menma and the Echo have mutually demonstrated operational cooperation sufficient to establish a reciprocal relationship rather than mere temporary coordination.

This is the exact Story/CE continuation fact Progression may consume when deciding whether to commit:
`progression_receipt_arc1_menma_echo_reciprocity`.

Story does not directly mint the Progression receipt.

### Stage Two eligibility boundary

Stage Two may be called only after owning Progression/runtime authority reports `EchoMenmaProgressionEligible(actor) = true` for the same persistent Menma.

Battle result alone may neither grant nor block this predicate.

## Stage Two caller

`occ_arc1_m12_stage2_battle_called`

Calls:
`arc1_m12_ren_stage_2_battle`

Required caller payload:
- same master sequence/Story lineage
- `returnSceneId = scene_arc1_m12_stage2_return`
- exact active participants/sides
- Registry-authorised `echo_menma` representation
- current Ren Stage-Two representation authorised by owning systems

## Stage Two factual return

`occ_arc1_m12_stage2_return_consumed`

Payload:
- exact `battleResult`
- exact Menma/Ren current state
- exact Hosted Entity states
- exact Sazan/programme availability state
- `stage2ContinuationClass`

Legitimate classes:

### `stage2_terminal_escalation_live`

Use when Ren remains alive/available, his conditioned Echo remains attached, and the programme/current scene can factually commit the terminal-optimisation escalation. A Stage-Two win is not required; a Stage-Two loss does not guarantee it either.

Story may then consume/observe existing programme transition `arc1_m12_programme_terminal_optimisation_transition` where factually committed.

### `stage2_terminal_escalation_blocked`

Use when factual state prevents terminal optimisation. Stage Three must not be fabricated. Story resolves the current Mission-12 consequence path from returned state; Arc-1 completion still requires aftermath/naming/completion conditions below.

### `stage2_climax_aborted`

Use when the current protagonist/required causal chain is no longer available to continue the climax.

Developer decisive Stage-Two victory is one valid history, not a hard-coded requirement.

## Kurama voluntary loan — exact Story source

### Kurama willingness occurrence

`occ_arc1_m12_kurama_voluntary_limited_loan_committed`

This is the sole Writing-owned Story source for the Mission-12 temporary Kurama loan.

Commit only when:
- the same persistent Menma requests/accepts help in the active Stage-Three escalation context;
- Kurama independently elects to lend limited power;
- willingness/consent is factually established for this exact occurrence;
- `arc1_menma_echo` remains distinct and factually able to participate in the cooperative routing state;
- owning Registry/Progression/Combat prerequisites are satisfied.

Player UI choice, Stage-Two Battle result, displayed representation or prior Kurama history cannot substitute for Kurama's current voluntary willingness.

Payload:
- Menma persistent ref
- exact Kurama Hosted Entity/relationship ref from owning authority
- `arc1_menma_echo` ref
- `kuramaWillingness = voluntary_limited_loan`
- source Story scene/occurrence refs

Progression may consume this exact occurrence to commit `progression_receipt_arc1_m12_coordinated_kurama_loan_experience`; Story does not mint that receipt.

## Stage Three caller

`occ_arc1_m12_stage3_battle_called`

Calls:
`arc1_m12_ren_stage_3_battle`

Caller may use temporary Combat projection:
`arc1_m12_menma_echo_borrowed_kurama`

only while `occ_arc1_m12_kurama_voluntary_limited_loan_committed` is live for this exact climax occurrence.

Required caller payload:
- same master sequence/Story lineage
- `returnSceneId = scene_arc1_m12_stage3_return`
- exact active participants/sides
- live Kurama-loan occurrence ref
- current reciprocal Echo relationship source refs
- current Ren Stage-Three projection authorised by owning systems

## Stage Three factual return

`occ_arc1_m12_stage3_return_consumed`

Required payload keeps separate:
- `battleResult`
- `terminalOptimisationCollapse` / objective-resolution fact
- Ren survival state
- Ren injury/neutralisation state
- Ren custody/escape state
- `arc1_ren_conditioned_echo` attachment/current state
- Sazan presence/survival state
- Sazan custody/escape state
- Kurama-loan cleanup confirmation
- permanent Menma/Echo relationship state
- exact remaining participant states
- `stage3ContinuationClass`

Combat owns removal of all temporary Kurama source-owned modifiers/actions at Stage-Three Battle end. Story may record the history but may not preserve the temporary package.

Legitimate classes:

### `stage3_climax_resolved`

Use when the immediate terminal-optimisation threat is factually ended/collapsed or otherwise no longer active and the scene can enter aftermath. Battle victory label alone is not the predicate.

### `stage3_climax_unresolved`

Use when terminal optimisation remains an active unresolved threat. Mission 12 and Arc 1 do not complete. No wind-down/naming completion is fabricated.

### `stage3_climax_aborted`

Use when the scene terminates through withdrawal/interruption or another factual state without resolving the immediate threat.

Developer Stage-Three victory, Ren survival and Sazan custody are one authored historical route only; runtime must record factual returned states.

## Mission-12 aftermath

### Programme climax resolved

`occ_arc1_m12_programme_climax_aftermath_resolved`

Commit only when the post-Battle Story has factually resolved the current immediate state of:
- Ren;
- Ren's conditioned Echo;
- Sazan;
- surviving/captured/escaped participants;
- the terminal optimisation threat;
- any current custody/escape facts Story is legally able to establish from returned state.

This occurrence does not rewrite unresolved wider conspiracy facts.

## Echo personal naming seam

### Naming scene eligibility

Enter `scene_arc1_m12_arc1_winddown_echo_naming` only if the same persistent `arc1_menma_echo` remains attached/present and the Chronicle has reached a legitimate wind-down state.

### Personal name committed

`occ_arc1_m12_echo_personal_name_committed`

Commit once when:
- Menma refuses the programme specimen label as the entity's only personal address;
- a player/Chronicle-relative personal name is supplied through the authorised naming UI/Story seam;
- the entity's acceptance/recognition of being addressed by that name is factually established in the scene;
- the same stable Entity remains `arc1_menma_echo`.

Payload:
- `entityRef = arc1_menma_echo`
- stable host-relationship ref
- validated Chronicle-relative `personalName`
- `nameAccepted = true`
- exact naming-scene occurrence ref

The personal name does not rename the stable Entity ID and does not change the permanent representation title `Echo Menma`.

Invalid/cancelled naming attempts create no committed occurrence. Save/load reuses the committed personal name; reopening UI does not reroll/recommit it.

## Arc-1 completion boundary

### Mission 12 completion occurrence

`occ_arc1_m12_story_complete`

May commit only when:
- current Mission-12 climax is factually resolved enough to leave the active Better Host crisis;
- `occ_arc1_m12_programme_climax_aftermath_resolved` exists;
- all live temporary Kurama-loan Battle state has been cleaned up;
- required persistent Menma/Echo relationship history is preserved as actually resolved;
- the personal naming seam has resolved if `arc1_menma_echo` remains present and eligible for naming;
- any required current Ren/Sazan/custody/escape facts have been committed without fabrication.

`Stage 3 Battle ended` is not equivalent to this occurrence.

### Arc 1 completion occurrence

`occ_arc1_arc1_story_complete`

Commit once after `occ_arc1_m12_story_complete` when Arc-1 Story wind-down has completed and the Chronicle is legally ready to hand control to post-Arc-1/free-play/Arc-2 authority.

Required payload:
- Mission-12 completion occurrence ref
- exact surviving persistent protagonist ref
- exact current Hosted Entity relationship refs
- exact committed Echo personal-name ref where applicable
- exact durable unresolved-lead/history refs intended to remain available to later arcs
- current Story continuation destination/state

This is the Story completion source consumed by later systems. It grants no Rank, PL, Progression, ownership or capability by itself.

A restrained Arc-2 hook may establish that at least one carrier-host transfer occurred outside the immediate Konoha operation if/when separately authored. It must not fabricate the identity, Knowledge or motive of a future participant.

---

# Save/load, retry and idempotence across M11/M12

1. Every Battle caller stores the exact Story lineage and return Scene ID before invoking Combat.
2. On Battle completion/load, runtime consumes the existing factual Battle result into the same Story lineage; it does not create a new Mission instance.
3. `occ_arc1_m11_pump_four_return_consumed`, `occ_arc1_m12_stage1_return_consumed`, `occ_arc1_m12_stage2_return_consumed` and `occ_arc1_m12_stage3_return_consumed` are idempotent per exact Battle occurrence/result.
4. Reopening UI or reloading after a committed Story transition does not reroll NPC intent, Kurama willingness, Echo reciprocity, personal naming, custody facts or Battle result.
5. A genuine later factual occurrence may supersede an unresolved current state, but it creates new provenance rather than mutating old history.
6. No Battle segment may be replayed as though the previous factual result never occurred unless an explicit developer/debug reset authority clears the Chronicle lineage outside normal player history.
7. Same-person identity is preserved: `arc1_ren` remains one person across all three Ren projections; `arc1_menma_echo` remains one hosted Entity; representation change does not create a new person.

# Required non-collapses

- Battle victory != Recall success.
- Recall result != carrier obedience.
- testimony != World Truth.
- Recognition Substitution use != universal bypass.
- M11 completion != automatic progression/unlock.
- Stage-One result != `echo_menma` unlock.
- reciprocal cooperation != fusion or ownership.
- `echo_menma` != hidden +PL Progression reward.
- Kurama willingness != protagonist command.
- Kurama loan != permanent Kurama Access.
- teammate observation != Knowledge that Kurama is Nine-Tails.
- Stage-Three Battle end != Mission-12 completion.
- Battle defeat != death/injury/custody automatically.
- one Ren person != three Registry people.
- Sazan programme authority != personal Battle PL.
- route/representation unlock != UI state.
- Story historical anchor != fixed verbatim dialogue.
- design closed != implemented != runtime validated != Golden GREEN.
