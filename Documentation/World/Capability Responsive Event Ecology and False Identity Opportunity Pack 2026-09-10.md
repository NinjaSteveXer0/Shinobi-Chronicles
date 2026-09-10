# Shinobi Chronicles — Capability-Responsive Event Ecology and False Identity Opportunity Pack

**Date:** 2026-09-10  
**Owner:** World / Missions / Events / Rewards  
**Status:** **WORLD CONTENT AUTHORITY — PATH-RESPONSIVE EVENT DOCTRINE CLOSED / FALSE IDENTITY EVENT PACK AUTHORED / ACTIVATION SEPARATE**

## 1. Purpose

Shinobi Chronicles should repeatedly give players moments where the exact kind of shinobi they have become matters outside Battle.

A player who invested in False Identity, Fūinjutsu, Tracking, Medicine, Summons, Hosted-Entity relationships, specialist fieldcraft, a Bloodline route, weapon expertise, reconnaissance, political recognition, crafting, unusual Knowledge or another meaningful Chronicle-developed path should eventually encounter situations where that history creates a legitimate way to perceive, interpret, approach or resolve something.

The design goal is not:

> every event supports every build.

The design goal is:

> across the living world, every meaningful route should periodically find situations that feel made for the history the player actually built.

This is the **capability-responsive event ecology**.

It is a World content doctrine, not a new progression system and not a universal proc table.

## 2. Live authority consumed

This contract consumes the Combat / Skills contextual surface:

`Documentation/Combat/SC_Combat_Contextual_Passive_Active_Skill_Surface_2026-09-10.md`

and specifically the authored contextual Skill catalogues:

- `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave7_261-290_Passive_Contextual.md`
- `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave8_291-320_Active_Hybrid_Contextual.md`

Important boundary:

- Story / World / Mission / Event authority creates the factual event, location, people, object, system, route, query and opportunity;
- Progression owns learned/development Access;
- Combat / Skills owns exact Skill effect and compatibility;
- Acquisition / Inventory owns required object/source ownership;
- Coding owns generic runtime evaluation, persistence and tests.

Therefore:

**event exists ≠ Skill creates event**  
**Skill exists ≠ event must expose it**  
**Skill route available ≠ automatic success**  
**special route ≠ better person / objectively best route**

## 3. Something-for-everyone doctrine

World content should deliberately contain a broad mixture of route affordances.

A normal event may have:

1. a baseline route available to any contextually eligible player;
2. one or more conditional routes exposed only when the Character has relevant Knowledge / Access / Skill / relationship / object / recognition / history;
3. later follow-up events that exist only because of factual history created in an earlier occurrence.

The baseline route must remain legitimate. A specialist route is not automatically a superior reward lane.

Examples:

- a tracker may find a trail earlier;
- a medical specialist may realise which victim needs immediate attention;
- a Fūinjutsu user may understand why a ward behaves strangely;
- a False Identity user may be recognised under a legitimate prepared profile;
- a weapon specialist may identify provenance or unusual construction;
- a Summon relationship may create a conversation/request route;
- a politically recognised shinobi may be invited into a meeting that an unknown Genin would not be;
- a player who does nothing may preserve anonymity, neutrality, time or another opportunity rather than receiving a hidden punishment.

No global moral score is implied.

## 4. Route-family coverage model

The 500-entry World reservoir and later event waves should tag opportunities with one or more **event affordance families** where genuinely supported.

Recommended families include:

- `identity_recognition`
- `fuinjutsu_barrier`
- `kinjutsu_risk`
- `investigation_evidence`
- `tracking_scent_trace`
- `sensory_chakra`
- `counter_surveillance`
- `stealth_infiltration`
- `medical_triage`
- `terrain_traversal`
- `weapons_bukijutsu`
- `crafting_material_provenance`
- `summon_relationship`
- `hosted_entity_relationship`
- `echo_relationship`
- `tailed_beast_relationship`
- `bloodline_capability`
- `clan_history`
- `service_recognition`
- `rank_specialization_recognition`
- `underworld_contact`
- `political_reputation`
- `personal_shared_history`
- `rare_knowledge`
- `representation_unlock_evidence`

These tags are authoring/indexing aids, not a claim that a universal runtime enum is required.

## 5. Coverage rule for future discoveries

When another specialist, Writing, World or CE closes a distinctive player-development route comparable in importance to False Identity, World should perform a lightweight **event-consumer pass**.

The pass asks:

1. What factual situations could naturally interact with this route?
2. What can the route legitimately notice, expose, attempt or change?
3. What does it explicitly NOT do?
4. Which existing event seeds can gain a conditional affordance without becoming bespoke to that route?
5. Are 2–6 new event seeds worthwhile because the path creates genuinely novel gameplay?
6. What factual history should CE preserve if the path materially participates?
7. What reward channels make sense without making the special route universally superior?

A newly invented system is not automatically entitled to new World content. The route must first have real closed semantics and a legitimate event-facing surface.

## 6. False Identity — World interpretation

Stable passive Skill:

`skill_false_identity`

Separate active evolution:

`skill_false_identity_recognition_substitution`

World must preserve the closed distinction:

- False Identity may provide a legitimate current recognised false profile to a compatible recognition query;
- Recognition Substitution deliberately attempts that substitution against one exact live compatible query;
- neither rewrites stable identity or World Truth;
- neither erases prior observations or Knowledge;
- neither invents Rank, ownership, citizenship, clearance, credentials or permissions;
- neither universally hides chakra / Hosted Entities / Bloodlines / equipment;
- neither guarantees passage or success.

This limitation is useful rather than restrictive: it creates events where False Identity is clever, uncertain, contextual and memorable instead of becoming a universal `skip security` button.

## 7. False Identity Opportunity Pack v1

The following are **World event seeds**, not automatically active Alpha quests and not mandatory Story.

Each event must remain solvable / resolvable without False Identity unless explicitly authored later as a specialist follow-up that only exists because the player already has the route.

### FI-01 — The Name on the Gate Ledger

**Region:** Konoha / Land of Fire gate or courier infrastructure.  
**Situation:** A gate clerk is reconciling travellers against a recently corrected ledger. The clerk does not possess direct personal Knowledge of the player but uses a recognised identity field supplied by the checkpoint process.

Possible approaches:
- answer normally;
- present ordinary documents if possessed;
- decline and leave;
- use a legitimate current False Identity profile if the query is compatible;
- observe the procedure and learn how the recognition chain works.

False Identity may be accepted, challenged, partial or incompatible. It does not fabricate travel clearance if separate clearance is required.

Possible history:
`gate_identity_query_resolved`, `false_profile_presented`, `clerk_challenged_profile`, `travel_not_pursued`.

Possible rewards:
Knowledge, access to a later courier/contact opportunity, recognition history, small ordinary mission entitlement if actual work is performed; no guaranteed cash bonus for using False Identity.

### FI-02 — A Face Someone Almost Knows

**Region:** any village market / public district.  
**Situation:** An NPC believes they have seen the player before but their Knowledge is indirect, incomplete or second-hand.

Possible approaches:
- confirm the encounter;
- deny it verbally;
- allow the uncertainty to remain;
- leave;
- if a compatible legitimate profile exists, let False Identity participate in the recognition query.

If the NPC has direct contradictory Shared History, False Identity does not make them forget. The interesting outcome can be the NPC noticing the contradiction rather than simple success/failure.

Possible history:
`witness_recognition_uncertain`, `recognition_profile_challenged`, `identity_story_deepened`.

Possible rewards:
relationship history, rumour Knowledge, a contact, later investigation or nothing material.

### FI-03 — The Borrowed Patient Record

**Region:** hospital / medical archive context in any village.  
**Situation:** A treatment clerk is trying to attach a current interaction to an old identity record. The player may have reason to avoid linking the current visit to their ordinary recognised profile.

False Identity can answer only a compatible identity-recognition field. It cannot fabricate medical history, payment, legal authorization or prior treatment.

Other routes include giving true identity, refusing treatment/record linkage, asking for a private consultation, or using relationship / service recognition.

Potential consequences may include a clean separate record, a challenged mismatch, preserved anonymity from ordinary clerical linkage, or a later discrepancy someone investigates.

### FI-04 — Rain Registry Echo

**Region:** Amegakure.  
**Situation:** An old automated/clerical recognition system repeats a historical classification when a traveller passes through a waterlogged municipal checkpoint. It asks who is being presented, not whether they have political clearance.

False Identity can participate in the recognition answer. Separate legal/physical access rules remain separate.

Other routes: ordinary registration, wait for manual inspection, investigate why the old system is still running, leave, or exploit a non-identity infrastructure route if legitimately known.

Potential rewards: Rain-system Knowledge, archive lead, local contact, future investigation access.

### FI-05 — Grass Border Census

**Region:** Kusagakure / Land of Grass road network.  
**Situation:** Officials are documenting movement after a disputed local incident. They are collecting identity categories and recent route information, not universally issuing clearance.

False Identity can present a legitimate recognised false profile to the identity field. It does not erase witnesses who saw the player elsewhere.

Interesting branch: the profile is accepted now, but a different evidence source later creates a contradiction the player may choose to investigate, explain, leave unresolved or compound.

### FI-06 — The Wrong Bounty Sketch

**Region:** any village or regional road.  
**Situation:** A low-quality bounty / suspect sketch loosely resembles the player or one of their recognised profiles.

Routes include:
- ignore it;
- ask about the bounty;
- correct the mistaken identity;
- deliberately let the mistake continue;
- use False Identity when a real recognition query occurs;
- investigate who created the sketch.

This event can become funny, dangerous, useful or meaningless depending on history. There is no hidden morality judgment for correcting or exploiting the confusion.

### FI-07 — The Black-Market Introducer

**Region:** discovered underworld contact in Konoha, Rain, Grass, Kiri or a regional port/market.  
**Situation:** An intermediary needs a name/profile under which to remember the player. This is not automatic faction membership or criminal clearance.

False Identity can allow a legitimate prepared profile to become the identity under which this contact records the encounter.

Later events may recognise that profile while other observers know the player differently, creating real observer-relative Chronicle history.

Possible rewards: underworld contact, information, rare trade lead, suspicious provenance, no guaranteed ownership/acquisition.

### FI-08 — Orochimaru's Forgotten Laboratory: Subject Index

**Region:** `KON-S02` Orochimaru's Forgotten Laboratory.  
**Situation:** A surviving archive/index mechanism attempts to classify an entrant against damaged identity/reference categories.

This is deliberately **not** a magic locked door that False Identity automatically opens.

False Identity may affect the classification query if the player possesses an exact compatible legitimate false profile. The laboratory's physical locks, traps, seals, permissions and hazards remain independent.

Other routes may involve Seal Pattern Literacy, Barrier Recognition, investigation, recovered records, a physical key, another entrance, or leaving the system alone.

Potential result: the archive files the player under a different recognised category, exposes a new bounded record set, challenges the profile, or produces contradictory evidence.

### FI-09 — ANBU Dead Drop Without a Name

**Region:** discovered ANBU-related dead-drop / field network; not ANBU HQ access by default.  
**Situation:** A legacy dead-drop procedure records the identity category of the collector for later verification.

False Identity may affect only the exact recognition record. It cannot fabricate ANBU status or authorization. If the drop separately requires a token, code, relationship or mission entitlement, those remain mandatory.

This event is useful because False Identity can change **who the system thinks interacted** without automatically granting the right to interact.

### FI-10 — The Returning Witness

**Region:** any map after a prior event.  
**Situation:** An NPC from a previous occurrence sees the player again while a third party identifies them differently.

This event requires real prior Chronicle history and is an excellent test of:

**World Truth ≠ observer Knowledge ≠ presented recognition.**

The original witness may challenge the false profile, remain unsure, stay silent, confront the player privately or exploit the discrepancy for their own purposes.

False Identity is not failure-proof here; the reward is the complicated history itself.

### FI-11 — The Sealed Parcel Recipient

**Region:** courier / merchant / mission context across any Great Nation.  
**Situation:** A parcel is addressed to a recognised recipient profile, but possession/ownership of the contents is not automatically determined by the recognition step.

False Identity may satisfy or challenge the recipient-identification query if the current profile legitimately matches the field being tested.

Separate entitlement/custody rules decide whether the parcel can actually transfer.

Other routes: find the real recipient, return parcel, refuse involvement, investigate sender, accept temporary custody if authorised.

This deliberately tests:

**recognition ≠ ownership ≠ custody ≠ entitlement.**

### FI-12 — The Person Who Never Arrived

**Region:** late-Alpha / reserve, any village.  
**Situation:** A future investigation is trying to establish whether a particular recognised identity ever entered a district during an earlier event window.

If the player previously used a false profile there, their own committed history may now become relevant evidence.

The player can:
- reveal the truth;
- preserve the prior deception;
- provide partial information;
- investigate another suspect;
- decline involvement;
- use further identity tools only where current queries legitimately permit them.

The event exists because of past history rather than because the Skill fires randomly. It demonstrates the strongest intended form of capability-responsive Chronicle design: a route chosen earlier can generate a qualitatively different later problem/opportunity without being labelled punishment.

## 8. False Identity reward philosophy

False Identity events should favour **interesting consequences** over inflated loot.

Useful reward channels include:

- Knowledge;
- new leads;
- observer-specific relationship/shared history;
- access to a contact or follow-up opportunity;
- rare document / evidence provenance;
- underworld or institutional recognition evidence;
- Fūinjutsu / identity-system development evidence where legitimate;
- Chronicle Echo / representation eligibility evidence where later authority explicitly consumes it;
- ordinary Ryō/items/material rewards when actual paid work, recovery or service justifies them.

Do not make `use False Identity` universally pay more than `tell the truth`.

A truth route might earn institutional trust. A false-profile route might preserve anonymity. A direct confrontation might earn recognition. Walking away might avoid entanglement. Investigating might produce Knowledge. Each can be valuable without one becoming the morality-correct answer.

## 9. Non-action and route absence

If a player does not possess False Identity:

- the event remains playable through its ordinary routes;
- the UI must not taunt the player with an unexplained greyed legendary option unless current presentation authority intentionally supports discoverable unavailable options;
- no hidden penalty is applied for not having the Skill.

If the player has False Identity but chooses not to use it, that choice may itself become factual Chronicle history only when context makes the refusal/material non-use meaningful.

If the player ignores the entire event, legitimate world consequences may proceed independently, remain unresolved, expire, change or do nothing. This is not punishment.

## 10. Future route-consumer doctrine

False Identity is the first flagship example, not a one-off exception.

When future closed systems produce similarly expressive routes, World should deliberately seed events for them.

Examples already visible from current catalogue authority include:

- Seal Pattern Literacy / Barrier Recognition → old wards, damaged seals, hidden service infrastructure, border barriers;
- Counter-Surveillance → watchers, tails, suspicious rooftops, diplomatic surveillance, ANBU/underworld contexts;
- Evidence Preservation / Reconstruction → crime scenes, battlefield remnants, archives, missing-person investigations;
- Scent / Chakra Tracking → fugitive routes, missing couriers, animal attacks, false trails, border infiltration;
- Medical Triage / Stabilisation → accidents, civilian crises, post-Battle aftermath, poisoned travellers, disaster events;
- Silent Infiltration / False Trail / Trail Suppression → infiltration, escape, counter-pursuit, surveillance missions;
- Hosted Entity / Echo relationship Skills → negotiation, refusal, pressure, Recall, voluntary cooperation, source-specific history;
- Tailed-Beast/Kurama relationship Skills → requests, trust tests, crisis choices and mutually authored cooperation without command/ownership collapse;
- Bloodline-specific contextual perception → appropriate observation events without omniscience;
- Wood Release environmental response → living terrain / damaged ecosystem / seal-environment interactions where real evidence exists;
- Weapon and crafting expertise → provenance, repair, customisation, rare material discovery and specialist-service opportunities.

These should appear across the seven villages and seven regional maps rather than being concentrated only in Konoha.

## 11. Recommended activation density

Do not attempt to make every one of 500 quests support every capability.

For the activated Alpha slice, use these content targets as planning guidance rather than a runtime quota:

- a meaningful minority of events should expose at least one conditional specialist route;
- several should expose two or more different specialist approaches to the same factual problem;
- every major Alpha-visible route family should receive multiple opportunities across the wider world reservoir;
- rare/legendary paths should receive fewer but more memorable bespoke or semi-bespoke events;
- ordinary baseline routes remain important so the world does not feel like a build-check spreadsheet.

For False Identity specifically, seed **4–6 Alpha-activation candidates** from FI-01 through FI-12 and keep the rest as reserve/follow-up content. Do not expose all twelve immediately.

## 12. CE history contract

When a capability materially participates, preserve factual evidence such as:

- exact event occurrence;
- exact Skill/capability/source where relevant;
- exact queried system/person/object;
- what the player attempted;
- what was presented/observed;
- accepted/rejected/challenged/partial/incompatible result where applicable;
- resulting custody/access/Knowledge/relationship facts separately;
- whether later contradiction exists;
- what the player chose not to pursue when that fact is actually consequential.

Do not store personality labels such as `deceptive_player`, `good_shinobi`, `coward` or `clever_build` as automatic event conclusions.

## 13. Runtime / Coding note

World should consume the generic contextual-Skill evaluator already queued through Combat issue #86 rather than demand bespoke code for each event.

World events need a way to declare:

- factual caller context;
- compatible affordance tags / exact Skill IDs where needed;
- exact target/query/object/system refs;
- baseline and conditional options;
- factual outcome branches;
- bounded evidence/reward handoff;
- save/load/idempotent occurrence state.

Coding must not infer hidden event routes merely because a Character owns a Skill. The event definition supplies the context; the Skill evaluator answers whether that exact route is currently legitimate.

## 14. Final lock

> **Shinobi Chronicles World content should periodically recognise the path the player actually built. False Identity is the flagship example: not a universal bypass, but a route that becomes unusually powerful and memorable when the world presents real recognition systems, uncertain observers, records, checkpoints and later contradictions. Future distinctive capabilities should receive the same treatment — not because every build deserves identical content, but because every meaningful build deserves moments where its history matters.**

Preserve:

**something for everyone ≠ everything for everyone**  
**special route ≠ objectively superior reward route**  
**route absence ≠ punishment**  
**non-action ≠ automatic failure**  
**recognition ≠ identity ≠ authority ≠ ownership ≠ custody**  
**event context ≠ Skill authorship**  
**design closed ≠ implemented ≠ runtime validated ≠ Golden GREEN**
