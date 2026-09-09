# Shinobi Chronicles — Arc 1 Missions 2–10 Machine-Addressable Story Runtime Contract

**Owner:** Writing — Konoha  
**Date:** 2026-09-09  
**Source handoff:** GitHub issue #46  
**Parent coordination:** #36  
**Status:** **WRITING RUNTIME AUTHORITY — MISSIONS 2–10**

This document converts the already-closed Arc 1 Story skeleton into machine-addressable Story causality for the first real player run. It does **not** rewrite dialogue, grant Progression, author PL, invent World source IDs, or replace Battle runtime authority.

## Global runtime rules

1. Story Scene IDs are runtime registration addresses, not World `sourceOccurrenceId` values.
2. Writing-owned `occ_*` IDs below commit only when the named factual beat has actually occurred.
3. Invalid/aborted/pre-commit attempts create no committed occurrence.
4. Save/load/retry must reuse committed occurrence identity and must not duplicate history.
5. NPC/team intent remains participant-owned. Where Battle/tactical choice occurs, independently acting participants resolve/declare intent first where reasonably observable; the protagonist then chooses their own intent.
6. Presence != Battle participation. Story supplies exact current participants and side intent; Battle resolves the factual fight.
7. Battle result != Mission result automatically.
8. Knowledge/evidence observations below are factual source material only. They do not themselves grant a Skill, Technique, PL, Stat, Rank, ownership, mastery, or generic specialization XP.
9. World-owned participant/object/source IDs are explicitly identified as caller requirements and are **not invented here**.

---

# Mission 2 — Warehouse

## Registration

- Mission ID: `arc1_m2_warehouse`
- Primary Story Scene: `scene_arc1_m2_warehouse_investigation`

## Legal entry

Enter when Mission 1 has factually resolved far enough for the warehouse lead to be actionable and the caller supplies the current protagonist/team participants plus the current warehouse/world instance context.

## Writing-owned committed occurrences

### Distributed-operation ledger discovered

`occ_arc1_m2_warehouse_ledger_distributed_operation_discovered`

Commit when the ledger/material has been legitimately examined enough to establish all four linked operational references:

- `ACADEMY`
- `HOSPITAL`
- `BARRIER`
- `ARCHIVE`

Required factual payload:

- `ledgerDiscovered = true`
- `distributedOperationEvidenceEstablished = true`
- `referencedNodes = [ACADEMY, HOSPITAL, BARRIER, ARCHIVE]`
- exact observing participant refs

This occurrence does **not** establish one universal conspiracy owner.

### Sarutobi logistics involvement observed

`occ_arc1_m2_warehouse_sarutobi_logistics_involvement_observed`

Commit only when the current scene produces legitimate evidence tying the current Sarutobi-related participant/logistics activity to this warehouse operation.

Required factual payload:

- caller-supplied `sarutobiParticipantRef`
- `logisticsInvolvementObserved`
- observation/source basis

This is participant/history evidence, not proof of wider clan guilt.

### Dangerous purge observation — optional branch

`occ_arc1_m2_warehouse_purge_observation_completed`

Commit only if the protagonist deliberately allows the dangerous purge process to execute far enough to obtain a legitimate observation and the process factually occurs.

Required factual payload:

- exact observing participant refs
- exact caller-supplied purge source/object ref
- `purgeProcessOccurred = true`
- bounded observed behaviour
- any preserved evidence/record basis

No automatic Fūinjutsu/Kinjutsu Technique, Skill, mastery, Stat, PL or specialization grant is authorised here.

## Player-owned seams

- whether to pursue/inspect the ledger evidence where options exist;
- whether to permit the dangerous purge process to execute for observation;
- any immediate protagonist response to the Sarutobi/logistics evidence.

## Autonomous participant seam

Before any dangerous observation/containment action requiring team commitment, non-protagonist participants may independently object, assist, withdraw, observe, secure evidence, or take another valid action from current Chronicle state. Their reaction is not a player command.

## Caller requirements

Writing expects caller-owned refs for:

- current warehouse/world instance;
- current Sarutobi participant if physically present;
- exact purge source/object if that branch is actionable;
- current evidence/object refs.

## Battle

**NONE authorised by this Mission-2 contract.**

If later authority introduces a Battle, that requires a new exact Story seam; Coding must not infer one from danger/purge prose.

## World-owned dependency

World must supply any exact stable warehouse/object/participant/source IDs that persistence requires. Writing does not mint those here.

## Termination

Mission may terminate once the distributed-operation discovery is committed and the current scene's active optional branch is resolved/abandoned. Mission completion does not itself grant Progression.

---

# Mission 3 — Hospital

## Registration

- Mission ID: `arc1_m3_hospital`
- Primary Story Scene: `scene_arc1_m3_hospital_reference_recovery`

## Legal entry

Enter when the Hospital node from Mission 2 is legitimately actionable and the caller supplies current hospital/world context and current team participants.

## Writing-owned committed occurrences

### Hospital sample/reference material identified

`occ_arc1_m3_hospital_reference_material_identified`

Commit when Menma/current protagonist has legitimately identified material useful as chakra/recognition reference evidence.

Payload:

- exact caller-supplied material/object refs
- `referenceMaterialIdentified = true`
- bounded factual observation
- observing participant refs

### Case retained by protagonist — branch-dependent

`occ_arc1_m3_hospital_case_retained`

Commit only if the protagonist actually obtains and leaves the relevant scene with the case under factual possession/custody.

Payload:

- caller-supplied `caseObjectRef`
- `holderParticipantRef`
- `caseRetained = true`
- acquisition/custody basis

Choosing to steal/retain it is not enough if another participant or occurrence prevents the transfer.

### Sarutobi participant surrender — branch-dependent

`occ_arc1_m3_hospital_sarutobi_surrender_resolved`

Commit only if the current Sarutobi-related participant factually surrenders.

Payload:

- caller-supplied `sarutobiParticipantRef`
- `surrenderOccurred = true`
- resulting custody/availability fact if known

Surrender != automatic permanent custody.

### Med-nin communication received

`occ_arc1_m3_hospital_med_nin_contact_communication`

Commit when the female med-nin contact/operator actually communicates the bounded information used by this Mission.

Payload:

- caller-supplied `medNinParticipantRef`
- exact communication occurrence evidence
- bounded Knowledge output

Statement/testimony != World Truth automatically.

## Player-owned seams

- whether/how to retain the case;
- protagonist handling of the Sarutobi-related participant where contextual options exist;
- what hospital evidence to pursue.

## Autonomous participant seam

Other participants may independently secure people/evidence, object to theft, assist, observe, or refuse involvement based on current state.

## Caller requirements

Exact caller-owned refs are required for:

- female med-nin participant if persistent history depends on her;
- Sarutobi participant if physically present;
- hospital reference material/sample objects;
- retained case object.

## Battle

**NONE authorised by this Mission-3 contract.**

## New PL-relevant participant

**NONE required by Writing solely for this Mission.** Role-only participants must not be forced into PL/Combat registration unless downstream executable content separately requires it.

## World-owned dependency

World/object authority must supply stable instance/object refs where persistence/custody is required.

---

# Mission 4 — Barrier

## Registration

- Mission ID: `arc1_m4_barrier`
- Primary Story Scene: `scene_arc1_m4_barrier_relay_four`

## Writing-owned committed occurrences

### Relay Four compromised

`occ_arc1_m4_relay_four_compromise_confirmed`

Commit when legitimate investigation establishes that Relay Four is compromised.

Payload:

- caller-supplied Relay Four/world instance ref
- `relayFourCompromised = true`
- factual evidence basis

### Body-inscribed receiver established — branch-dependent

`occ_arc1_m4_menma_body_receiver_established`

Commit only if Menma/current eligible protagonist actually becomes the body-inscribed receiver in the resolved route.

Payload:

- protagonist stable participant ref
- `bodyInscribedReceiverEstablished = true`
- exact factual seal/receiver state produced by the scene
- supporting observation/interaction occurrence refs

This is a historical state occurrence, not automatic Technique ownership.

### Recognition behaviour observed

`occ_arc1_m4_barrier_recognition_behaviour_observed`

Commit when the barrier system's recognition/identity behaviour has been legitimately tested/observed.

Payload:

- observing participant refs
- bounded observed recognition behaviour
- exact supporting system/interaction refs

This evidence may later be consumed by Progression but grants nothing by itself.

## Player-owned seams

- protagonist decision to accept/attempt the receiver route when available;
- protagonist testing/interaction choices with barrier recognition.

## Autonomous participant seam

Team members may independently observe, warn, assist, oppose, or monitor the receiver attempt from their own state.

## Battle

**NONE.**

## Caller requirements / World dependency

World must supply the exact stable Relay Four/world/system instance address used by this Mission. Writing does not invent its World `sourceOccurrenceId`.

---

# Mission 5 — Academy

## Registration

- Mission ID: `arc1_m5_academy`
- Primary Story Scene: `scene_arc1_m5_academy_third_bell`

## Writing-owned committed occurrences

### Female Operator confrontation reached

`occ_arc1_m5_female_operator_confrontation_reached`

Commit when the story has factually reached the confrontation with the same persistent Female Operator already established by prior history.

Payload:

- caller-supplied stable Female Operator participant ref
- exact current team/participant refs
- `confrontationReached = true`

`Female Operator — Unleashed` remains the same woman at full commitment, not a second person/Base identity.

### Calibration redirected into receiver — branch-dependent

`occ_arc1_m5_calibration_redirected_into_receiver`

Commit only if Menma/current eligible protagonist successfully redirects calibration into the body-inscribed receiver.

Payload:

- protagonist ref
- prerequisite receiver-state occurrence ref
- `calibrationRedirected = true`
- exact system interaction evidence

### Third Bell propagated/accepted

`occ_arc1_m5_third_bell_propagation_accepted`

Commit when the Third Bell/trusted-system propagation factually demonstrates acceptance of the changed identity state.

Payload:

- `thirdBellPropagationOccurred = true`
- `changedIdentityStateAccepted = true`
- exact observing participant/system refs
- supporting calibration/recognition occurrences

This is factual technique-development evidence only.

## Player-owned seams

- protagonist tactical/Battle intent after autonomous participant intent is established;
- whether to attempt the calibration redirection where legally available.

## Autonomous participant intent boundary

Immediately before Battle selection, independently acting allies determine/declare their intended participation/target/objective from current Chronicle state where observable. The protagonist then selects only their own Battle intent.

## Battle

**BATTLE REQUIRED ONCE THE FEMALE OPERATOR CONFRONTATION REACHES THE HOSTILE COMMIT BOUNDARY.**

Story→Battle caller seam:

`battle_seam_arc1_m5_female_operator_confrontation`

Writing does **not** author her PL or exact Combat package here.

Required caller return must preserve:

- same Female Operator stable identity;
- exact active participant IDs/side assignments;
- factual Battle result;
- life/injury/custody/escape facts supported by Battle/encounter authority;
- same Story continuation context.

Post-Battle return:

`scene_arc1_m5_academy_third_bell` resumes from the factual Battle return. Battle victory does not itself manufacture calibration success or Third Bell acceptance.

## PL/Registry dependency

**YES.** Female Operator needs one stable Registry identity + Stats/Base PL if not already durably closed, with Unleashed preserved as the same person at full commitment.

## World dependency

Exact Academy system/room/world instance refs are caller-owned if downstream persistence requires them; Writing does not mint their World source occurrence.

---

# Mission 6 — Archive

## Registration

- Mission ID: `arc1_m6_archive`
- Primary Story Scene: `scene_arc1_m6_archive_identity_rebinding`

## Writing-owned committed occurrences

### Legitimate identity-change propagation understood

`occ_arc1_m6_archive_identity_change_propagation_understood`

Commit when Menma/current protagonist legitimately obtains enough Archive evidence to understand how accepted identity changes propagate through trusted systems.

Payload:

- observing/learning participant ref
- bounded Archive evidence
- supporting prior recognition/calibration occurrences when present

### Identity Rebinding Seal created/developed

`occ_arc1_m6_identity_rebinding_seal_created`

Commit only when the resolved scene factually establishes Menma creating/developing the **Identity Rebinding Seal** within the **False Identity Seals** family.

Payload:

- creator participant ref
- `techniqueFamily = false_identity_seals`
- `techniqueName = Identity Rebinding Seal`
- supporting evidence occurrence refs from Hospital/Barrier/Academy/Archive as actually present
- `creationDevelopmentOccurred = true`

This is the factual development occurrence. Progression/Skills authority must separately decide persistent Access/Competence/Power/Mastery consequences.

### Cipher Menma representation-history eligibility established

`occ_arc1_m6_cipher_menma_history_established`

Commit when the Chronicle-specific body-inscribed Identity Rebinding state is factually present after the resolved development occurrence.

Payload:

- Menma stable identity ref
- `representationHistory = cipher_menma`
- exact supporting seal-state occurrence ref

This occurrence does **not** mean `mission6Complete => cipher_menma` and does not grant the representation without the underlying factual state.

### Dead Transfer lead acquired

`occ_arc1_m6_dead_transfer_lead_acquired`

Commit when legitimate Archive evidence makes the Dead Transfer lead actionable.

## Player-owned seams

- protagonist technical/investigative approach to the Archive evidence;
- any choice to commit the body-inscribed rebinding route when legally available.

## Autonomous participant seam

Other participants may independently assist, object, monitor, disclose/withhold observations, or disengage based on current state.

## Battle

**NONE newly authorised by this machine-addressability pass.**

Any earlier discovery prose involving a separate Reika confrontation is not converted into a runtime Battle here without an exact durable Battle seam/owner package. CE must not infer one from non-authoritative prose.

## Progression dependency

**YES.** Progression/Development must consume the exact factual occurrences above and decide persistent capability/access/representation consequences without collapsing evidence into mastery.

## World dependency

Exact Archive system/object instance refs are caller-owned where needed.

---

# Mission 7 — The Dead Transfer

## Registration

- Mission ID: `arc1_m7_dead_transfer`
- Primary Story Scene: `scene_arc1_m7_dead_transfer`

## Writing-owned committed occurrences

### Collector/transfer apparatus contact established

`occ_arc1_m7_transfer_site_contact_established`

Commit when the current Story occurrence factually reaches the transfer site with the Collector, living carrier and black stabiliser/coupling vessel present.

Required caller refs:

- Collector participant ref;
- living carrier/Hosted Entity candidate ref;
- black stabiliser/coupling vessel object ref;
- exact current team participants.

### Deliberate carrier acceptance

`occ_arc1_m7_carrier_transfer_deliberately_accepted`

Commit when the protagonist explicitly chooses/commits to accept the living carrier transfer and the attempt has passed the Story commitment boundary.

Player choice != successful attachment.

### Carrier attachment established

`occ_arc1_m7_carrier_attachment_established`

Commit only when the living carrier factually attaches as a distinct hosted presence alongside Kurama.

Payload:

- host participant ref
- carrier/Hosted Entity stable ref
- `attachmentEstablished = true`
- coexistence fact with existing hosted state
- no ownership/mastery implication

### Chain sanitisation activation

`occ_arc1_m7_chain_sanitisation_activated`

Commit when the network factually emits/enters `CHAIN SANITISATION ACTIVE` and the current trio encounter becomes legally callable.

## Player-owned seams

- whether to accept the carrier transfer;
- protagonist Battle/tactical intent after NPC intent resolution.

## Autonomous participant intent boundary

Before the sanitisation Battle, allies independently decide/declare intended participation/objective where observable. Story passes the exact active participant set and side assignments to Battle.

## Battle

Existing authoritative encounter package:

`arc1_m7_chain_sanitisation_active_encounter`

Story→Battle seam:

`battle_seam_arc1_m7_chain_sanitisation_active`

This contract does **not** reopen #29/#30/#31.

Caller must supply:

- exact active participant IDs + side assignments;
- exact current Sealer/Breacher/Warden stable IDs from existing authority;
- exact Story/World-supplied sanitisation-eligible evidence/object refs;
- current Story continuation context.

The black stabiliser/coupling vessel may be included only if the authoritative object owner supplies its exact ref and the current story state marks it sanitisation-eligible/exposed. The hosted living carrier must never be silently converted into a generic evidence object.

## Post-Battle continuation

Return to `scene_arc1_m7_dead_transfer` with the factual Combat envelope including per-operative outcome and `sanitisationOutcome` over the exact supplied evidence/object set.

Story then resolves the Mission from those returned facts. Battle victory != complete evidence preservation and sanitisationOutcome != automatic Mission success/failure.

## World/object dependency

**YES.** Exact stable refs are required for the Collector, carrier candidate, black stabiliser/coupling vessel, and any other sanitisation-eligible physical evidence/object targets. Writing does not invent their World/object source IDs.

---

# Mission 8 — The Sanitisation Chain

## Registration

- Mission ID: `arc1_m8_sanitisation_chain`
- Primary Story Scene: `scene_arc1_m8_sanitisation_chain_investigation`

## Writing-owned committed occurrences

### Collector recruitment/sponsor trail established

`occ_arc1_m8_collector_sponsor_trail_established`

Commit when the current investigation legitimately establishes the recruitment/sponsor trail sufficient to continue.

### White-thread material recovered/observed

`occ_arc1_m8_white_thread_evidence_observed`

Commit when white-thread material is legitimately recovered or observed as evidence.

Payload requires exact caller-supplied material/object ref where physical persistence matters.

### Moroboshi reassignment signature established

`occ_arc1_m8_moroboshi_reassignment_signature_established`

Commit when the paperwork legitimately establishes **Daichi Moroboshi** as the signer of the relevant reassignment(s).

Payload:

- Moroboshi stable participant/person ref if already authoritative;
- caller-supplied paperwork/document ref;
- `signedReassignmentEstablished = true`
- observation/source basis

### Sanitisation-network escalation understood

`occ_arc1_m8_sanitisation_network_escalation_observed`

Commit when Menma/current investigators legitimately establish that compromised transfer chains are deliberately being sanitised/escalated.

This does not prove one universal conspiracy owner.

## Player-owned seams

- what trail/evidence to prioritise;
- protagonist response to Moroboshi/white-thread findings where choices exist.

## Autonomous participant seam

Other participants may independently pursue evidence, challenge interpretations, secure objects, or form bounded hypotheses.

## Battle

**NONE.** Mission 8 is Story/investigation in this contract. Coding/CE must not invent a new Battle from sanitisation language.

## New PL-relevant participant

**NONE required by this Mission contract.**

## World/object dependency

**YES** only for exact persistent physical document/material refs and any stable Moroboshi person/world ref if not already authoritative.

---

# Mission 9 — Ashes of the Chain

## Registration

- Mission ID: `arc1_m9_ashes_of_the_chain`
- Primary Story Scene: `scene_arc1_m9_ashes_of_the_chain_aftermath`

## Causal relationship to Mission 7

Mission 9 **does not launch a new Battle**.

It consumes the factual persisted result of the Mission 7 encounter `arc1_m7_chain_sanitisation_active_encounter` and the current Story/World evidence state.

The developer-authoring example `Sealer captured / Breacher incapacitated / Warden escaped` is **not** hard-coded. Runtime provides the actual persisted per-operative outcomes.

## Writing-owned committed occurrences

### Sanitisation aftermath assessed

`occ_arc1_m9_sanitisation_aftermath_assessed`

Commit when the Story has factually assessed the persisted Mission-7 Battle/sanitisation return.

Payload:

- Mission-7 encounter occurrence/result ref;
- exact per-operative factual outcomes;
- exact supplied evidence/object state set;
- factual `sanitisationOutcome`;
- remaining current evidence availability.

### Evidentiary cleanup consequence established

`occ_arc1_m9_evidentiary_cleanup_state_established`

Commit when the current evidentiary context factually establishes what chakra/evidence traces remain available after sanitisation.

This occurrence may mark current evidence unavailable/sanitised but must never retroactively erase Chronicle history, prior Knowledge, or unrelated physical objects.

### Moroboshi trail advanced

`occ_arc1_m9_moroboshi_trail_advanced`

Commit when surviving/available evidence legitimately advances the Daichi Moroboshi lead.

### Veterinary-ward direction established

`occ_arc1_m9_veterinary_ward_direction_established`

Commit when legitimate current evidence/carrier response makes the veterinary-ward direction actionable.

## Player-owned seams

- which surviving evidence/lead to pursue where multiple are available;
- protagonist interpretation/hypothesis remains bounded and does not become Truth merely by selection.

## Battle

**NONE.** Mission 9 consumes Mission 7 history; it does not duplicate the sanitisation fight.

## New PL-relevant participant

**NONE.**

## World dependency

World/object authority must provide current persisted evidence/object availability and the exact veterinary-ward world/location binding when the lead becomes actionable.

---

# Mission 10 — Beneath the Veterinary Ward

## Registration

- Mission ID: `arc1_m10_veterinary_ward`
- Primary Story Scene: `scene_arc1_m10_veterinary_ward_facility`
- Transfer-operator pursuit/communication continuation: `scene_arc1_m10_transfer_operator_pursuit`

## Legal entry

Enter when the veterinary-ward lead is factually actionable and the caller supplies the exact current location/facility/world instance plus current participants.

## Writing-owned committed occurrences

### Hidden facility entered

`occ_arc1_m10_hidden_transfer_facility_entered`

Commit when the team factually enters the underground facility through a legal route.

The explored storm-drain/service-tunnel route is valid Story content but must not be assumed to be the only possible world traversal if another authorised route later exists.

### Carrier directional response observed

`occ_arc1_m10_carrier_directional_response_observed`

Commit when the carrier factually reacts to recognition/direction toward the facility/origin context.

Payload:

- host ref
- carrier ref
- bounded directional/recognition response

This does not grant perfect GPS or omniscient tracking.

### Subject-count observation established

`occ_arc1_m10_subject_presence_observed`

Commit when legitimate observation establishes the currently perceived subject count/state.

In the explored route Hinata observed six people: four alive, two dead. Runtime must record what the authorised observation actually establishes for the current occurrence; it must not convert Byakugan perception into medical-treatment competence.

Payload:

- observing participant ref
- exact observed alive/dead count or participant refs if World supplies them
- observation capability/source basis

### Carrier grief-like response observed

`occ_arc1_m10_carrier_grief_response_observed`

Commit when the hosted carrier factually reacts to dead/other carrier subjects in a manner reasonably observed as grief-like affect.

Observation of affect != complete biography/motive truth.

### Transfer-operator communication received

`occ_arc1_m10_transfer_operator_communication_received`

Commit when the fleeing transfer operator actually communicates the bounded programme information.

Required factual communication envelope may include only what the operator legitimately states/knows:

- carriers intended to `carry state`;
- state includes chakra pattern / recognition behaviour / adaptation;
- carrier is a courier/learning vessel, not automatically a weapon;
- sponsor identified/testified as Dr. Sazan;
- 27 transfers;
- 9 survived initial attachment;
- some subjects moved to other handlers;
- three said to be inside Konoha;
- next stage described as Recall/retrieval of learned host state.

These are testimony/Knowledge outputs until separately established as World Truth.

### Recall threat understood

`occ_arc1_m10_recall_threat_understood`

Commit when the current Story occurrence gives Menma/team legitimate understanding that Recall is intended to retrieve what the carrier learned from its host and that the carrier fears retrieval/return.

## Player-owned seams

- protagonist response to facility discoveries;
- whether/how to pursue the fleeing operator if contextual options exist;
- what questions/hypotheses to pursue during operator communication.

## Autonomous participant split rule

The explored split `Menma + Anko pursue / Mikoto + Hinata remain` is **not universal choreography**.

At the pursuit seam, each non-protagonist participant resolves their own intent from current Chronicle state. Story then forms the actual pursuit/remaining groups from those decisions plus protagonist intent.

No participant is auto-assigned merely because they filled that role in the developer-authoring route.

## Battle

**NONE authorised by Mission 10.**

The operator pursuit is Story/pursuit/communication, not automatically Combat. If a later exact Battle is added, it requires separate PL/Combat authority and a new Story Battle seam.

## Stable transfer-operator dependency

**YES — stable participant history is required.**

Writing requires one exact stable `transferOperatorRef` supplied by the appropriate World/Registry authority because later testimony/history may need to address the same person. Writing does not invent that stable ID here.

## Dr. Sazan boundary

In Mission 10, Dr. Sazan exists only as reported/testified programme authority/information. Mission 10 does **not** place Sazan directly into Battle or physical encounter by default.

## World dependency

World must supply:

- exact veterinary-ward/facility instance;
- exact stable transfer-operator participant ref;
- any exact detected subject participant refs if persistence requires them;
- exact physical stabiliser/bed/evidence object refs where later systems consume them.

---

# Cross-mission evidence chain exposed to downstream Progression

Writing establishes the following factual sequence without granting capability automatically:

1. Mission 3 — hospital reference material identified/retained where factually achieved;
2. Mission 4 — barrier recognition behaviour observed and body receiver established where achieved;
3. Mission 5 — calibration redirected and Third Bell acceptance observed where achieved;
4. Mission 6 — legitimate identity-change propagation understood and Identity Rebinding development occurrence committed;
5. Mission 6 — Cipher Menma representation history exists only when its factual seal state exists;
6. Mission 7 onward — hosted-carrier facts remain separate from False Identity capability;
7. later Recognition Substitution must consume legitimate capability/history and is not retroactively granted by this document.

Progression/Skills owns what Access/Competence/Power/Mastery follows from this evidence.

---

# Dependency summary for CE routing

## Progression / Development

**SEND NEXT OWNER WORK REQUIRED** for Mission 4–6 evidence chain, Identity Rebinding persistent capability/access, Cipher Menma representation eligibility, and later prerequisite compatibility. Writing has now supplied exact factual occurrence addresses.

## PL / Registry / Rank

**Required only where executable runtime consumes stable Battle identity.** Current exact need exposed here:

- Female Operator in Mission 5 if not already closed.

Do not create PL packages for role-only noncombat participants merely because they appear in Story.

## Combat / Skills / Items / Weapons

Current exact needs exposed here:

- Mission 5 Female Operator confrontation package, after PL/Registry closure;
- Mission 7 trio package is already closed and must not be reopened.

Missions 2, 3, 4, 6, 8, 9 and 10 have **no new Battle authorised by this contract**.

## World / Missions / Events / object authority

Exact stable caller/source/instance returns are needed only where named above, especially:

- Mission 2 warehouse/Sarutobi/purge source if persisted;
- Mission 3 med-nin/Sarutobi/case/material objects where persisted;
- Mission 4 Relay Four/system instance;
- Mission 5 Academy system/room refs if persisted;
- Mission 6 Archive system/object refs if persisted;
- Mission 7 Collector/carrier candidate/stabiliser/evidence target refs;
- Mission 8 white-thread/paperwork/Moroboshi refs where absent;
- Mission 9 veterinary-ward actionable world binding/current evidence state;
- Mission 10 facility/transfer-operator/detected subjects/object refs.

Writing does not mint World `sourceOccurrenceId` values.

## Coding

Coding should receive this Story contract only after CE has returned/closed the minimum exact owner-specific dependencies above. Coding must not fill missing PL/World/Progression/Combat authority by naming convention or prose inference.

---

# Hard preserves

- Story historical anchor != fixed verbatim dialogue
- Story Scene ID != World sourceOccurrenceId
- World occurrence != Story occurrence != Battle occurrence
- player intent != guaranteed occurrence
- protagonist intent != party-wide command
- NPC intent != random sabotage
- presence != participation
- Knowledge != Access != Competence != Power != Mastery
- technique evidence != technique ownership
- Mission completion != Progression
- Battle result != Mission result
- Battle defeat != death/custody automatically
- Female Operator != Female Operator Unleashed as a second person
- Mission 7 implemented Combat != whole Mission 7 executable Story
- provisional developer route != hard-coded runtime truth
- current evidence sanitised != Chronicle history erased
- Sazan testimony in Mission 10 != Sazan physical participation
- design closed != implemented != runtime validated != Golden GREEN

**Writing verdict:** Missions 2–10 are now machine-addressed at the Story layer. Remaining gaps are owner-specific dependencies to be routed by CE / Coordination.