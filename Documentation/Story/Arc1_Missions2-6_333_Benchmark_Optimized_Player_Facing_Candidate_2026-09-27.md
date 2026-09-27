# Shinobi Chronicles — Arc 1 Missions 2–6 — #333 Benchmark-Optimized Player-Facing Candidate

**Date:** 2026-09-27  
**Owner:** Writing / Story — Konoha  
**Status:** **WRITING AMBER — STEPHEN REVIEW CANDIDATE / NOT ARC GOLDEN**

## Governing authority

Preserve:
- `Arc1_Konoha_Story_Skeleton_and_Choice_Authority_2026-09-09.md`
- `Arc1_Missions2-10_Machine_Addressable_Story_Runtime_Contract_2026-09-09.md`
- current World/Registry/Combat/Progression authority for each supplied participant/object/capability.

This file is the player-facing expression layer.

---

# GLOBAL DYNAMIC RULE

Where a beat says **CONTEXTUAL PARTICIPANT REACTION**:
- render only current physically present participants;
- use their current personality/Knowledge/relationship/duty;
- do not force developer-route Menma/Mikoto/Hinata/Anko choreography;
- do not show CE/state language.

Where a beat says **CALLER OBJECT**:
- use the exact caller-supplied World/object identity;
- do not invent a replacement prop.

---

# MISSION 2 — WAREHOUSE

**Mission:** `arc1_m2_warehouse`  
**Scene:** `scene_arc1_m2_warehouse_investigation`

## Presentation

**BACKDROP:** `Arc 1 Backdrops/warehouse_investigation.png`

Actors:
- current protagonist/team cards;
- current Sarutobi-related participant only if physically present;
- no invented generic “Sarutobi insider” card if the caller does not provide the actual participant.

---

## `m2_warehouse_01` — narration

The warehouse looked ordinary from outside.

Inside, it is too organised in the places that matter and too empty in the places that should explain why.

The useful records were not destroyed.

They were left where somebody expected them to look harmless.

---

## `m2_warehouse_02` — narration

The ledger does not read like a confession.

It reads like logistics.

Four references keep surfacing between routine entries:

**ACADEMY.**

**HOSPITAL.**

**BARRIER.**

**ARCHIVE.**

Different destinations.

The same operation touching all four.

### AUTHOR / IMPLEMENTATION NOTE

Once legitimately examined enough, commit:
`occ_arc1_m2_warehouse_ledger_distributed_operation_discovered`

Do not narrate “distributed operation established” to the player.

---

## `m2_warehouse_party_01` — CONTEXTUAL PARTICIPANT REACTION

Allow one or more present participants to react to the four-location pattern if their current Knowledge makes a reaction meaningful.

Useful reactions may include:
- suspicion about the scale;
- concern about Academy involvement;
- insistence on preserving the ledger;
- disagreement over whether the four locations prove a single organiser.

Do not let anyone state a universal conspiracy owner as fact without evidence.

---

# SARUTOBI LOGISTICS BEAT — CONDITIONAL

Render only when the caller supplies legitimate current Sarutobi/logistics evidence.

## `m2_sarutobi_01` — narration

Another part of the warehouse record is less abstract.

A current Sarutobi-linked logistics trail touches the operation closely enough that coincidence stops being a comfortable answer.

That is not the same thing as proving the Sarutobi clan stands behind it.

### AUTHOR / IMPLEMENTATION NOTE

Do not narrate that distinction as a rule.

Let the current participants argue/infer naturally.

## `m2_sarutobi_reaction` — CONTEXTUAL PARTICIPANT REACTION

If the relevant Sarutobi participant is physically present, let them respond from their actual history rather than serving as a clan spokesman.

**AUTHOR:** commit only the bounded observed involvement:
`occ_arc1_m2_warehouse_sarutobi_logistics_involvement_observed`

---

# PURGE BRANCH — CONDITIONAL

Render only if an exact caller-owned purge source/object is actionable.

## `m2_purge_01` — narration

Something in the evidence chain starts trying to erase its own usefulness.

Not all at once.

Just fast enough that stopping it now would preserve more—and watching it longer might reveal what the purge is actually designed to remove.

## `m2_purge_party_reaction` — CONTEXTUAL PARTICIPANT REACTION

Participants may object, assist, withdraw, secure other evidence or choose to observe.

Then give the protagonist the actual decision.

## `m2_purge_choice` — choice

**STOP IT NOW**

**LET IT RUN A LITTLE LONGER**

### STOP IT NOW

## `m2_purge_stop_01` — narration

The protagonist cuts the process short.

Whatever it might have shown stays unknown.

More of the evidence survives.

### LET IT RUN A LITTLE LONGER

## `m2_purge_watch_01` — narration

The protagonist waits.

Long enough to see what the purge attacks first.

Not long enough to pretend the risk was free.

**AUTHOR:** only if the purge factually occurs far enough for legitimate observation, commit:
`occ_arc1_m2_warehouse_purge_observation_completed`

No Technique/mastery reward is implied.

---

# M2 CLOSE

## `m2_close_01` — narration

By the time the warehouse gives up everything it is going to give today, the investigation has stopped being one location.

Four doors are open now.

The problem is choosing which one to walk through first.

---

# MISSION 3 — HOSPITAL

**Mission:** `arc1_m3_hospital`  
**Scene:** `scene_arc1_m3_hospital_reference_recovery`

## Presentation

Current reusable scene backdrop:
`Scene backdrops/medical_interior.png`

This is a Writing-selected shared medical interior. UI/Assets may supersede it with a dedicated Arc-1 Hospital asset without changing semantics.

Actors:
- current protagonist/team;
- caller-supplied female med-nin contact if present;
- caller-supplied Sarutobi participant if present;
- exact case/sample objects from World.

Missing concrete NPC asset mapping:
**ACTOR PROJECTION ASSET REQUIRED** for any persistent med-nin/Sarutobi participant lacking an existing approved card.

---

## `m3_hospital_01` — narration

Hospitals are built around clean surfaces and controlled information.

This room has both.

That does not make either one trustworthy.

The material the team came for is here—samples and reference evidence capable of saying something about chakra pattern and recognition if somebody knows what to look for.

**AUTHOR:** commit identification only after legitimate inspection:
`occ_arc1_m3_hospital_reference_material_identified`

---

# MED-NIN CONTACT — CONDITIONAL

## `m3_mednin_01` — CONTEXTUAL DIALOGUE

The female med-nin contact delivers only the bounded information the current occurrence actually authorises.

Her testimony should sound like a person managing risk, not a lore terminal.

Do not make every statement World Truth merely because she says it.

**AUTHOR:** commit:
`occ_arc1_m3_hospital_med_nin_contact_communication`
when the communication actually occurs.

---

# SARUTOBI SURRENDER — CONDITIONAL

If the current Sarutobi-related participant factually reaches a surrender state:

## `m3_surrender_01` — narration

The confrontation ends without anybody needing to knock them down.

Hands come away from weapons.

The room changes anyway.

Surrender is not the same thing as trust, and nobody here mistakes it for permanent custody.

## `m3_surrender_reaction` — CONTEXTUAL PARTICIPANT REACTION

Let current participants decide who secures, questions, watches or objects.

**AUTHOR:** commit only the factual surrender:
`occ_arc1_m3_hospital_sarutobi_surrender_resolved`

---

# CASE DECISION — CONDITIONAL

Render when the case is physically available to the protagonist.

## `m3_case_01` — narration

The case is small enough to carry.

That is not the same thing as being free to take.

Leaving it means trusting the next chain of custody.

Keeping it means becoming part of that chain.

## `m3_case_choice` — choice

**KEEP THE CASE**

**LEAVE IT**

### KEEP THE CASE

## `m3_case_keep_01` — narration

The protagonist takes possession of the case.

Whether they actually leave with it is still something the scene has to survive.

**AUTHOR:** commit `occ_arc1_m3_hospital_case_retained` only when factual possession persists out of the scene.

### LEAVE IT

## `m3_case_leave_01` — narration

The case stays where it is.

The information already learned does not climb back inside it.

---

# M3 CLOSE

## `m3_close_01` — narration

The hospital gives the investigation something the warehouse could not:

a reference point.

Not an answer.

Something to compare future answers against.

---

# MISSION 4 — BARRIER / RELAY FOUR

**Mission:** `arc1_m4_barrier`  
**Scene:** `scene_arc1_m4_barrier_relay_four`

## Presentation

**BACKDROP:** `Arc 1 Backdrops/barrier_relay_four.png`

Actors:
- current protagonist/team;
- exact Relay Four system projection as environment/object state;
- no invented humanoid “Barrier NPC.”

---

## `m4_relay_01` — narration

Relay Four still responds.

That is the first bad sign.

A dead system would be easier.

This one is working well enough to recognise something—and compromised enough that nobody should trust what it thinks it recognises.

**AUTHOR:** after legitimate investigation establishes compromise:
`occ_arc1_m4_relay_four_compromise_confirmed`

---

## `m4_relay_02` — narration

The barrier is not behaving like a lock waiting for the correct key.

It is behaving like a system asking a different question:

**Who does it believe is standing here?**

That makes every test more dangerous than simply opening a door.

---

# RECEIVER ROUTE — CONDITIONAL

Only if the current protagonist is legally eligible for the body-inscribed receiver route.

## `m4_receiver_party` — CONTEXTUAL PARTICIPANT REACTION

Allow present participants to warn, object, monitor or assist according to current state.

Then let the protagonist decide.

## `m4_receiver_choice` — choice

**USE ME AS THE RECEIVER**

**KEEP TESTING FROM OUTSIDE**

### USE ME AS THE RECEIVER

## `m4_receiver_accept_01` — narration

The protagonist stops asking the system to read an external answer.

They give it a living surface to write against.

The change is immediate enough that everyone watching understands this is no longer a harmless test.

**AUTHOR:** commit only after the factual body-inscribed state is established:
`occ_arc1_m4_menma_body_receiver_established`
or its current eligible protagonist-equivalent authority.

Historical receiver state != Technique ownership.

### KEEP TESTING FROM OUTSIDE

## `m4_receiver_decline_01` — narration

The protagonist keeps the experiment on the other side of their skin.

Slower.

Safer.

And possibly less revealing.

---

# RECOGNITION TEST

## `m4_recognition_01` — narration

However the route is tested, Relay Four responds to identity information rather than simple possession.

The useful discovery is not that the barrier can be fooled.

It is that the barrier has a concept of **who counts**.

**AUTHOR:** commit only the bounded observed behaviour:
`occ_arc1_m4_barrier_recognition_behaviour_observed`

---

# M4 CLOSE

## `m4_close_01` — narration

The team leaves Relay Four with a worse question than the one they brought in.

If a trusted system can recognise the wrong identity—

what happens when another trusted system believes it too?

---

# MISSION 5 — ACADEMY / THIRD BELL

**Mission:** `arc1_m5_academy`  
**Scene:** `scene_arc1_m5_academy_third_bell`

## Presentation

Exact physical calibration site is not durably bound to an approved scene asset in current Writing authority.

**BACKDROP ASSET REQUIRED — ARC 1 ACADEMY THIRD-BELL CALIBRATION SITE**

Female Operator Story card:
`Others/female_operator.png`

Female Operator Battle portrait:
`Portraits/Others/female_operator.png`

If the existing encounter legitimately uses the Unleashed presentation:
- Story: `Others/female_operator_unleashed.png`
- Battle: `Portraits/Others/female_operator_unleashed.png`

Same woman. Do not project as a second person.

---

## `m5_operator_01` — narration

The Academy was supposed to be one of the safe words in the warehouse ledger.

Standing here now, it feels more like a location somebody assumed nobody would question.

The Female Operator is already in the way.

She does not look surprised to see the team.

---

## `m5_operator_02` — dialogue — FEMALE OPERATOR

**FEMALE OPERATOR:** “You kept following it.”

The line is not praise.

[If current history supports a more specific reference, contextualise it without revealing hidden facts.]

**AUTHOR:** once the same persistent operator confrontation is factually reached:
`occ_arc1_m5_female_operator_confrontation_reached`

---

# PRE-BATTLE AUTONOMY

## `m5_party_intent` — CONTEXTUAL PARTICIPANT REACTION

Present allies may declare/express tactical intent first where observable.

Do not render this as a vote.

Do not make the protagonist choose for them.

---

# BATTLE TRANSITION

## `m5_battle_transition`

Use existing seam:
`battle_seam_arc1_m5_female_operator_confrontation`

Battle owns:
- exact exchanges;
- PL result;
- withdrawal;
- supported life/injury/custody/escape facts.

Return to the same:
`scene_arc1_m5_academy_third_bell`

---

# POST-BATTLE — RECEIVER/CALIBRATION ROUTE

Only render if the current returned state makes the calibration route legally available.

## `m5_calibration_01` — narration

The fight is over.

The system is not.

The calibration is still looking for an answer.

If the protagonist carries the body-inscribed receiver state, there is now a route that did not exist before Relay Four.

## `m5_calibration_choice` — choice

**REDIRECT THE CALIBRATION**

**LEAVE THE RECEIVER OUT OF IT**

### REDIRECT THE CALIBRATION

## `m5_calibration_redirect_01` — narration

Instead of letting the calibration finish where it started, the protagonist turns the recognition path into the receiver.

For one dangerous moment, nothing answers.

Then the system accepts the changed state.

**AUTHOR:** commit only on factual success:
`occ_arc1_m5_calibration_redirected_into_receiver`

### LEAVE THE RECEIVER OUT OF IT

## `m5_calibration_leave_01` — narration

The protagonist lets the calibration end without feeding the receiver into it.

Whatever the system might have accepted remains untested here.

---

# THIRD BELL

Render only when the trusted-system propagation factually occurs.

## `m5_third_bell_01` — narration

The first acceptance would have been interesting.

The second could have been coincidence.

The **Third Bell** answers from another trusted point in the chain.

Not because it saw the original identity.

Because it accepted the changed one.

Nobody in the room needs a lecture on why that matters.

**AUTHOR:** commit:
`occ_arc1_m5_third_bell_propagation_accepted`

This is evidence/development history, not automatic mastery.

---

# M5 CLOSE

## `m5_close_01` — narration

The Academy did not teach the protagonist a new trick today.

It proved something more dangerous:

a trusted system can inherit somebody else's mistake and call it recognition.

---

# MISSION 6 — ARCHIVE

**Mission:** `arc1_m6_archive`  
**Scene:** `scene_arc1_m6_archive_identity_rebinding`

## Presentation

**BACKDROP:** `Scene backdrops/institutional_archive_interior.png`

Actors:
- current protagonist/team;
- Archive remains environment/object authority, not a speaking system unless separate source authorises it.

---

## `m6_archive_01` — narration

The Archive is quieter than every place that led here.

No alarms.

No operator waiting in the room.

Just records old enough that nobody expected this investigation to need them.

---

## `m6_archive_02` — narration

The pattern finally becomes legible when the protagonist stops treating each location as a separate trick.

The Hospital provided a reference.

Relay Four showed what recognition was actually reading.

The Academy showed that one trusted system could pass an accepted change to another.

The Archive explains why.

---

## `m6_archive_03` — narration

A false answer only survives until somebody checks it properly.

An accepted identity change is different.

Once the right system believes the change counts, every system that trusts it can inherit the new answer.

**AUTHOR:** when legitimately understood:
`occ_arc1_m6_archive_identity_change_propagation_understood`

---

# IDENTITY REBINDING ROUTE — CONDITIONAL

Only for a protagonist with the exact prerequisite technical/history/capability route.

## `m6_rebinding_01` — narration

For Menma's developer Chronicle, the pieces fit around the body-inscribed receiver.

The Academy taught him how to fake the answer.

The Archive shows him how to make the system believe the new answer counts.

[For another eligible protagonist, contextualise from their actual established route rather than copying Menma's technical history.]

## `m6_rebinding_choice` — choice

**BUILD THE REBINDING SEAL**

**KEEP THE THEORY ON PAPER**

### BUILD THE REBINDING SEAL

## `m6_rebinding_build_01` — narration

The protagonist stops treating the notes as a description and starts turning them into a working seal.

Reference state.

Accepted change.

Recognition propagation.

A false identity that does not merely look convincing—

it arrives carrying the right history.

**AUTHOR:** on factual creation/development commit:
`occ_arc1_m6_identity_rebinding_seal_created`

Progression/Skills owns persistent Access/Competence/Power/Mastery.

### KEEP THE THEORY ON PAPER

## `m6_rebinding_hold_01` — narration

The design stays a design.

Understanding the route is not the same thing as taking it.

---

# CIPHER MENMA — CONDITIONAL

Only if the body-inscribed Identity Rebinding state factually exists.

## `m6_cipher_01` — narration

Menma is still Menma.

The difference is what the trusted systems have been taught to recognise when they look at him.

**AUTHOR:** commit:
`occ_arc1_m6_cipher_menma_history_established`

Representation history != new historical person.

---

# DEAD TRANSFER LEAD

## `m6_dead_transfer_01` — narration

Buried inside the propagation records is one phrase that does not belong with the rest:

**DEAD TRANSFER.**

Not an explanation.

A direction.

And finally, a reason to leave the Archive.

**AUTHOR:** commit when actionable:
`occ_arc1_m6_dead_transfer_lead_acquired`

---

# M6 CLOSE

## `m6_close_01` — narration

The investigation began with somebody moving contraband through Konoha.

By the time the Archive closes behind the team, the more troubling possibility is harder to ignore:

somebody has been teaching trusted systems what to believe about people.

---

# CURRENT ASSET STATUS

## Bound now
- M2 Warehouse: `Arc 1 Backdrops/warehouse_investigation.png`
- M4 Relay Four: `Arc 1 Backdrops/barrier_relay_four.png`
- M6 Archive: `Scene backdrops/institutional_archive_interior.png`
- Female Operator cards/portraits as listed.

## Reusable current selection
- M3 Hospital: `Scene backdrops/medical_interior.png`

## Still requires exact binding
- M5 Academy Third-Bell calibration site.
- persistent med-nin/Sarutobi participant cards where current World/Registry refs exist but no approved asset mapping is published.

---

# BENCHMARK AUDIT

- machine occurrence prose stripped from player-facing Story: GREEN
- current protagonist not assumed to be Menma except conditional route: GREEN
- player seams remain real decisions: GREEN
- NPC autonomy preserved through contextual reaction slots: GREEN
- no invented Battles in M2/M3/M4/M6: GREEN
- M5 Battle remains exact existing seam: GREEN
- technical content translated into human-readable Story: GREEN
- evidence != mastery/Truth preserved in author layer: GREEN
- scene segmentation: GREEN
- asset projection: partial; exact unresolved mappings listed
- Stephen scene-level review: **PENDING**
