# Shinobi Chronicles — Academy Origin and Whisper Woods World Source / Instance Bindings

**Date:** 2026-09-08  
**Owner:** World / Missions / Events / Rewards  
**Status:** **WORLD SOURCE-ADDRESS CLOSURE — ISSUE #24 COMPLETE**  
**Source issue:** GitHub issue #24

This document publishes only the missing factual World/Event source addresses, commit boundaries, and occurrence-local participant/object refs requested by Writing. It does **not** create new consequence predicates, rewards, progression semantics, Combat rules, or Story choreography.

Preserve:

- generic archetype / display label != stable historical participant instance;
- World occurrence != Combat occurrence;
- Story Scene ID != sourceOccurrenceId;
- factual occurrence != consequence automatically;
- source addressability != collectible Entity registration;
- package success != intelligence quality != participant/custody history;
- retry/save/load preserves one committed source address and does not mint duplicates.

---

## 1. Academy Origin bindings

### IZU-04 — Rogue Genin interruption resolved by Wasabi action

**sourceOccurrenceId**

`occ_origin_izuno_rogue_genin_interruption_resolution`

**Stable occurrence-local participant refs**

- Rogue Genin: `wasabi_origin_rogue_genin_01`
- affected/interference Academy student: `wasabi_origin_interference_student`

`wasabi_origin_rogue_genin_01` is the stable historical World instance for this Origin occurrence. Where Battle occurs, Combat consumes that occurrence's already-authorised Rogue Genin opposition package; the Combat occurrence does not replace this World occurrence.

**Commit boundary**

Commit only when the secondary Rogue Genin interruption has factually resolved far enough to establish Wasabi's actual response/outcome. The source must then carry:

- `committed = true`
- `actorVariantId = academy_izuno`
- `rogueGeninInterruptionResolvedByWasabiAction`
- `rogueGeninResponse`
- `battleOccurrenceIds` containing exact supporting Combat occurrence IDs when Battle actually occurred, otherwise an empty set/list
- the stable participant refs above where applicable

Following/pursuing the primary assessment target alone does not commit IZU-04.

---

### IWA-02 — Rogue Genin Earth-Release response

**sourceOccurrenceId**

`occ_origin_iwabee_rogue_genin_response_resolution`

**Stable occurrence-local Rogue Genin ref**

`iwabee_origin_rogue_genin_01`

This is the Rogue Genin exposed during the practical-ground occurrence; it is not the Academy exercise itself and does not need a collectible Entity identity merely to remain historically addressable.

**Commit boundary**

Commit when the Rogue Genin response branch reaches a factual World resolution and the actual response is known. The source carries:

- `committed = true`
- `actorVariantId = academy_iwabee`
- `rogueGeninParticipantRef = iwabee_origin_rogue_genin_01`
- `earthReleaseUsedToConstrainRogueGenin`

IWA-02 qualifies only when the existing consequence predicate is satisfied. Battle victory by itself is not this source fact.

---

### MET-04 — inviting-Genin prior contact

**sourceOccurrenceId**

`occ_origin_metal_inviting_genin_prior_contact`

**Stable historically addressable participant ref**

`metal_origin_inviting_genin`

Display may remain simply **Genin** / the Writing-authored contextual label. `metal_origin_inviting_genin` is an occurrence-local stable referent, not a newly named canon character and not a collectible Registry admission.

**Commit boundary**

Commit once the inviting Genin encounter has actually occurred such that the prior contact is part of Chronicle history. Required source facts:

- `committed = true`
- `actorVariantId = academy_metal_lee`
- `invitingGeninEncounterOccurred = true`
- `invitingGeninParticipantRef = metal_origin_inviting_genin`

A merely possible invitation that never occurs does not commit this source.

---

## 2. Kakashi parent retrieval occurrence — KAK-01 / KAK-02 / KAK-03

All three consequence contracts consume one factual parent World occurrence because the same completed retrieval operation can legitimately commit package disposition, intelligence quality, and participant/custody history as separate meanings.

**Shared sourceOccurrenceId**

`occ_origin_kakashi_anbu_retrieval_resolution`

**Stable occurrence-local refs**

- carrier / former logistics clerk: `kakashi_origin_logistics_clerk`
- information broker / receiver: `kakashi_origin_information_broker`
- sealed route packet: `kakashi_origin_outer_route_packet`
- assassin instance: `kakashi_origin_decoy_assassin_01`

The assassin instance consumes the existing `decoy_assassin` opposition authority where Combat is legally invoked. The instance ID above is the historical participant address; it does not create a second opponent archetype.

**Commit boundary**

Commit once the chosen retrieval branch has reached its final authored World/custody/intelligence state and all relevant facts are stable. The one source occurrence must carry, as factual outputs rather than inferred consequence results:

- `committed = true`
- `actorVariantId = academy_kakashi`
- `packageDisposition`
- `packageInstanceRef = kakashi_origin_outer_route_packet`
- `retrievalIntelligenceClass`
- `observerKnowledgeBasis`
- `qualifyingParticipantOrCustodyInteractionOccurred`
- exact `participantRefs`
- exact `custodyFacts`

### Package-disposition mapping from the already-closed World branches

- **Fight Assassin only**; broker remains holder and retrieval is not achieved → `packageDisposition = unresolved`
- **Secure Package**; broker transfers packet to Kakashi → `packageDisposition = secured`
- **Defeat Assassin then Recover**; Combat resolves then broker transfers packet to Kakashi → `packageDisposition = secured`
- **Pursue Carrier**; authored offscreen result leaves assassin with packet and assassin escapes → `packageDisposition = lost`

These mappings do not determine `retrievalIntelligenceClass`. Intelligence quality remains independently authored from what Kakashi actually observed/learned.

### Custody facts

The source must retain actual custody transitions, not only the final holder. The packet begins with the logistics clerk, transfers to the information broker during the illicit exchange, and then follows the chosen authored branch. Assassin defeat alone does not transfer the packet to Kakashi.

KAK-01, KAK-02 and KAK-03 therefore share `occ_origin_kakashi_anbu_retrieval_resolution` but remain three independent consequence contracts.

---

## 3. Obito independent diversion occurrences — OBI-01

There is no helper-count or all-diversions aggregate source. Each diversion has its own World occurrence.

| Diversion | sourceOccurrenceId | `diversionType` | stable beneficiary/world refs |
|---|---|---|---|
| furniture assistance | `occ_origin_obito_furniture_assistance_resolution` | `furniture_assistance` | `obito_origin_furniture_civilian` |
| scattered vegetables | `occ_origin_obito_scattered_vegetables_resolution` | `scattered_vegetables` | `obito_origin_vegetable_vendor` |
| lost Academy equipment | `occ_origin_obito_lost_academy_equipment_resolution` | `lost_academy_equipment` | `obito_origin_academy_equipment_custodian` |
| overturned delivery | `occ_origin_obito_overturned_delivery_resolution` | `overturned_delivery` | `obito_origin_delivery_worker` |
| runaway cart | `occ_origin_obito_runaway_cart_resolution` | `runaway_cart` | `obito_origin_runaway_cart_civilian` |

These beneficiary refs are occurrence-local factual source addresses. They are not collectible Entity registrations or new named canon characters.

**Commit boundary for each diversion**

Commit that diversion's occurrence when its selected authored response has factually resolved enough to establish:

- `committed = true`
- `actorVariantId = academy_obito`
- `diversionType`
- `obitoCausalContributionEstablished`
- `obitoContribution`
- `beneficiaryRefs`
- `delayConsequence`
- `worldOutcome`

OBI-01 may consume one receipt per genuinely distinct diversion occurrence only when its existing predicate is satisfied. Choosing to continue past a diversion may still be Chronicle history, but it does not counterfeit `obitoCausalContributionEstablished = true`.

No helper count, total-help score, morality score, or all-five bonus is authorised.

---

## 4. Obito formal-training entitlement — OBI-02 / OBI-03 / OBI-04 / OBI-05

All four consequence contracts consume the same mutually exclusive factual entitlement occurrence.

**Shared sourceOccurrenceId**

`occ_origin_obito_formal_training_entitlement_resolution`

**Commit boundary**

Commit once actual elapsed journey time / arrival timing has been authoritatively resolved against the already-closed training window and exactly one qualifying Alpha entitlement has become factual:

- `FULL`
- `SUBSTANTIAL`
- `REDUCED`
- `MINIMAL`

Required source facts:

- `committed = true`
- `actorVariantId = academy_obito`
- exactly one `formalTrainingEntitlement`
- underlying actual journey-time/arrival evidence retained by the parent Origin history

Exactly one of OBI-02 / OBI-03 / OBI-04 / OBI-05 may match this occurrence.

If the already-authored journey outcome produces **no formal training entitlement** because Obito arrives after the training opportunity is no longer available, that factual history does **not** counterfeit `MINIMAL` and does not qualify any of OBI-02 through OBI-05. No fifth reward/consequence row is created here.

Community/diversion outcomes remain separate from formal-training entitlement.

---

## 5. Whisper Woods major-contact World instance bindings

This section answers the remaining World instance return for Writing issue #17.

### Existing caller authority

- mission area: `whisper_woods`
- location: `fire_whisper_woods_north_ravine`
- hotspot: `whisper_woods_hotspot_north_ravine`
- World opportunity: `arc1_m1_whisper_major_contact`
- World event: `arc1_m1_whisper_major_contact_event`
- Story Scene: `scene_arc1_m1_whisper_major_contact`
- Unknown Operative stable identity: `arc1_m1_unknown_operative`
- Unknown Operative observer projection: `observer_projection_unknown_operative`

### World event/scene transition source

**sourceOccurrenceId**

`occ_arc1_m1_whisper_major_contact_scene_transition`

**Commit boundary**

Commit exactly once when:

1. `arc1_m1_whisper_major_contact_event` is the legally actionable current Whisper Woods occurrence;
2. the `approach_contact` action on `arc1_m1_whisper_major_contact` is accepted;
3. the exact current World participant instances for the major-contact occurrence have been reserved/bound;
4. control legally transitions into `scene_arc1_m1_whisper_major_contact`.

Selecting or hovering the hotspot does not commit this occurrence. A failed/invalid Story transition does not commit it.

The committed source must retain ancestry:

- `missionAreaId = whisper_woods`
- `eventId = arc1_m1_whisper_major_contact_event`
- `opportunityId = arc1_m1_whisper_major_contact`
- `sceneId = scene_arc1_m1_whisper_major_contact`
- exact current participant refs

### Rogue Shinobi stable World instance

`arc1_m1_whisper_rogue_shinobi_01`

This is the one stable historical Rogue Shinobi participant for the major-contact occurrence.

The same exact ref must be supplied to:

- `scene_arc1_m1_whisper_major_contact` participant state;
- target resolution for `arc1_m1_unknown_operative_wrist_break`;
- the resulting `fractured_wrist` injury/history record;
- any subsequent Rogue-Shinobi-specific Story/World/Combat consumer in this occurrence.

No caller may replace it with a generic `Rogue Shinobi` label or mint a fresh Rogue instance when entering Combat/returning from Combat.

This binding does not redefine the separately authorised Combat/opposition package.

### Smuggler stable World instance

`arc1_m1_whisper_injured_smuggler_01`

This is the same injured civilian Smuggler present in the major-contact occurrence. The caller passes this exact participant ref plus current factual presence/injury/custody/availability state into Story rather than Story creating a new Smuggler object.

No death, loot ownership, guilt, faction identity, or permanent Registry admission is created by this address.

### Unknown Operative binding

The persistent participant identity remains exactly:

`arc1_m1_unknown_operative`

Player-facing concealment remains through:

`observer_projection_unknown_operative`

Do not mint an occurrence-local replacement identity for the Unknown Operative. Later observer reveal updates Knowledge/presentation; it does not mutate the stable participant key.

### Major-contact caller participant set

At legal transition, the World event instance may therefore supply at minimum the factual local participant refs:

- `arc1_m1_whisper_rogue_shinobi_01`
- `arc1_m1_whisper_injured_smuggler_01`
- `arc1_m1_unknown_operative`

plus the protagonist/current physically present Chronicle participants supplied under the existing Story participant-autonomy contract.

Presence remains separate from Battle participation.

---

## 6. Retry / persistence boundary

For every source occurrence and participant/object ref in this document:

- save/load preserves the same committed ID;
- retry before commitment may re-enter the authored opportunity but may not duplicate a committed occurrence;
- Battle caller/return preserves the same historical World participant refs;
- consequence consumers receive source occurrence addresses, not reconstructed prose labels;
- no source occurrence is inferred from consequence success after the fact.

---

## 7. Closure matrix

| Row / caller | World binding |
|---|---|
| IZU-04 | `occ_origin_izuno_rogue_genin_interruption_resolution` |
| IWA-02 | `occ_origin_iwabee_rogue_genin_response_resolution` |
| MET-04 | `occ_origin_metal_inviting_genin_prior_contact` |
| KAK-01 | `occ_origin_kakashi_anbu_retrieval_resolution` |
| KAK-02 | `occ_origin_kakashi_anbu_retrieval_resolution` |
| KAK-03 | `occ_origin_kakashi_anbu_retrieval_resolution` |
| OBI-01 furniture | `occ_origin_obito_furniture_assistance_resolution` |
| OBI-01 vegetables | `occ_origin_obito_scattered_vegetables_resolution` |
| OBI-01 equipment | `occ_origin_obito_lost_academy_equipment_resolution` |
| OBI-01 delivery | `occ_origin_obito_overturned_delivery_resolution` |
| OBI-01 cart | `occ_origin_obito_runaway_cart_resolution` |
| OBI-02 / OBI-03 / OBI-04 / OBI-05 | `occ_origin_obito_formal_training_entitlement_resolution` |
| Whisper major-contact World→Story transition | `occ_arc1_m1_whisper_major_contact_scene_transition` |
| Whisper Rogue participant | `arc1_m1_whisper_rogue_shinobi_01` |
| Whisper Smuggler participant | `arc1_m1_whisper_injured_smuggler_01` |

World/Missions/Events considers all factual source-instance bindings requested by issue #24 **CLOSED**.

No new World design dependency remains on these addresses.
