# Shinobi Chronicles — Arc 1 Missions 11–12 Pump Four / Better Host World Source, Object and Location Binding Contract

**Date:** 2026-09-11  
**Owner:** World / Missions / Events / Rewards  
**Source handoff:** GitHub issue #98  
**Parent coordination:** #36 / #97  
**Active Coding consumer:** #41  
**Status:** **WORLD AUTHORITY — MISSION 11/12 CALLER BINDINGS CLOSED**

This contract closes only the remaining World-owned factual bindings required by the machine-addressable Mission 11/12 Story caller/return contract. It does not redesign Story, Combat, Registry/PL, Progression, Hosted Entity ontology, Konoha art or the already-closed M2–M10 World bindings.

## Authority consumed

- `Documentation/Story/Arc1_Missions11-12_Machine_Addressable_Story_Runtime_Contract_2026-09-11.md` — Writing runtime authority, commit `59b18d8717b921839d1c6df8e84a820c6ac064a5`.
- `Documentation/SC_Combat_Arc1_Mission11_12_Battle_Closure_2026-09-09.md` — Combat authority, commit `f474788cb553980e0dec6760ac747871a42de3c2`.
- `Documentation/Registry/Arc 1 Echo Mission 11 12 Registry and PL Ratification.md` — Registry/PL authority, commit `074ad7bd2f3435e7e88dd1d04f1ee45867a4fefe`.
- `Documentation/Maps/Konoha Hotspot Calibration v3.md` — current Konoha spatial authority, commit `4b775dd998a79b3d16fd19f24e61b46473fce121`.
- `Documentation/World/Arc 1 Missions 2-10 World Source Object and Location Binding Contract 2026-09-09.md` — precedent only; do not reopen.

Preserve throughout:

- `location != hotspot != event != opportunity`;
- World occurrence != Story occurrence != Battle occurrence;
- stable semantic place != map pixel coordinate;
- Story actionability != World history automatically;
- observer Knowledge != World Truth;
- object custody != Item ownership;
- Pump Four access != lower-service access automatically;
- lower-chamber presence != Battle participation;
- Battle result != location-state transition automatically;
- one physical Pump Four chain does not become a new World occurrence merely because Story changes Scene or Mission ID;
- save/load/retry must reuse committed physical-instance/history identity rather than minting duplicates.

---

# 1. Stable Konoha host binding

Current Konoha v3 already binds Arc 1 Mission 11 to:

- parent district: `KON-D11` — Naka River and Canal Corridor;
- reusable host: `KON-O20` — East River Pump Works;
- current v3 visual anchor: `1215,720` on the 1536×1024 Konoha master.

`KON-O20` remains reusable village geography. Mission 11 does not consume it permanently, convert it into Story-only geography or prevent later unrelated civic/water-control occurrences from using the same host when semantically legitimate.

Mission 12 does **not** receive a second exterior Konoha location. It continues through the exact same contained Pump Four underground facility reached from Mission 11.

Map-art replacement or later coordinate recalibration may move `KON-O20` presentation geometry. It must not change any semantic IDs below or reroll committed Chronicle history.

---

# 2. Pump Station Four — exact World location hierarchy

## 2.1 Pump Station Four stable Mission location

Exact World location instance:

`arc1_m11_pump_station_four_01`

Parent:

`KON-O20`

Meaning:

- one specific Pump Station Four facility inside the broader East River Pump Works geography;
- stable semantic location for the Mission-11 operation;
- not a second village-map hotspot;
- may be projected as the Story destination at the `KON-O20` host once legitimate Knowledge/actionability exists.

## 2.2 Pump Four service-floor encounter host

Exact contained sublocation:

`arc1_m11_pump_four_service_floor_01`

Parent:

`arc1_m11_pump_station_four_01`

This is the physical World host for the Recall confrontation / existing Combat encounter:

`arc1_m11_pump_four_recall_encounter`

The location ref supplies context only. It does not determine active Battle participants, sides, Recall success, Recognition Substitution success, casualty state or Story continuation.

## 2.3 Lower-service access

Exact physical access object / route:

`arc1_pump_four_lower_service_access_01`

Parent:

`arc1_m11_pump_station_four_01`

This is the same lower-service access referenced by the fresh order. It is a physical route/threshold, not an inventory Item and not a separate map hotspot.

Authoritative state fields are limited to physical/contextual facts such as:

- `physicalState: closed_controlled | traversable | blocked`;
- `currentCustodianOrControllerRefs` where factually established;
- `lastStateChangeOccurrenceRef`;
- `availableForTraversal`.

World does not infer tactical safety or Mission success from those fields.

## 2.4 Shared lower-facility mission area

Exact contained mission-area identity:

`arc1_pump_four_lower_facility`

Exact lower-chamber World instance:

`arc1_pump_four_lower_chamber_01`

Parents:

- mission area parent: `arc1_m11_pump_station_four_01`;
- entry route: `arc1_pump_four_lower_service_access_01`.

This lower chamber is the **same physical World instance** used by:

- `scene_arc1_m11_lower_chamber_better_host_reveal`;
- `scene_arc1_m11_to_m12_better_host_handoff`;
- `scene_arc1_m12_ren_reveal_and_comparative_retrieval`;
- the entire `arc1_m12_better_host_climax` sequence unless Story explicitly exits the facility.

M11→M12 must never mint a replacement lower chamber merely because the Story Mission ID changes.

---

# 3. Fresh Pump Four order — exact evidence object

Exact World-addressable evidence/document ref:

`arc1_m11_pump_four_fresh_order_01`

Exact authored visible content:

`PUMP STATION FOUR / 01:30 / OPEN LOWER SERVICE ACCESS`

World-owned factual fields may include:

- physical existence;
- current physical location;
- current custodian/holder where factually established;
- whether the document is physically available for inspection;
- source/provenance refs actually established by prior history.

Writing owns the Story interpretation/actionability transition:

`occ_arc1_m11_pump_four_order_actionable`

Therefore:

- recovering/reading this object does not by World fiat commit the Writing occurrence;
- once Writing legally commits `occ_arc1_m11_pump_four_order_actionable`, the caller may use `arc1_m11_pump_four_fresh_order_01` as the exact evidence ref and `arc1_m11_pump_station_four_01` as the exact World/location ref;
- custody or inspection of the order does not convert it into player Item ownership unless Items authority separately grants such an inventory object.

---

# 4. World occurrence boundary for the Pump Four chain

There is **one shared physical World occurrence root** for the continuous facility chain:

`world_occ_arc1_pump_four_better_host_facility_chain_01`

It is committed only when the party factually enters/engages the specific Pump Station Four operation under the current Story lineage. It represents the continuing physical situation from Pump Four entry through the Better Host lower-facility climax.

It is **not** committed merely because the fresh order is discovered and it is not replaced when Story transitions from Mission 11 to Mission 12.

Exact factual World sub-occurrences under this root are:

### Pump Four site entered

`world_occ_arc1_m11_pump_four_site_entered`

Commit when `arc1_m11_pump_station_four_01` is factually entered by the current operation.

### Lower-service access made traversable

`world_occ_arc1_m11_lower_service_access_made_traversable`

Commit only when an authorised factual resolution changes `arc1_pump_four_lower_service_access_01` into a physically traversable state.

This occurrence does **not** mean:

- Battle victory;
- opposition neutralised;
- tactical safety;
- lower chamber discovered;
- Mission 11 completed.

A Battle result cannot set it automatically unless the factual return explicitly establishes the physical transition and Story/World commits it.

### Lower facility entered

`world_occ_arc1_m11_lower_facility_entered`

Commit once when the current lineage physically traverses the lower-service access and enters `arc1_pump_four_lower_chamber_01`.

This is the factual World basis that allows the lower-chamber Story scene to operate after Writing has legally committed:

`occ_arc1_m11_lower_service_access_secured`

Writing still owns the `secured` Story conclusion; World owns only the physical location/route state.

No additional World occurrence is required solely to mirror Story actionability before physical entry.

---

# 5. Mission 11 lower-chamber → Mission 12 persistence

When Writing commits:

`occ_arc1_m11_to_m12_better_host_handoff_committed`

its exact World payload must carry:

- `worldOccurrenceRootRef = world_occ_arc1_pump_four_better_host_facility_chain_01`;
- `missionAreaId = arc1_pump_four_lower_facility`;
- `worldInstanceRef = arc1_pump_four_lower_chamber_01`;
- `entryRouteRef = arc1_pump_four_lower_service_access_01`;
- the same Chronicle/Story lineage ref already supplied by Writing;
- exact current physical-object/environment states already committed in the facility.

Mission 12 resumes those same refs.

Save/load/retry rules:

1. a committed World root is reused;
2. a committed lower-facility instance is reused;
3. committed access-state changes are reused;
4. already committed evidence custody/state is reused;
5. invalid/precommit retries create no duplicate World occurrence or duplicate lower chamber;
6. Story rewind/retry UI may revisit presentation, but it must not fabricate a second physical Pump Four chain.

---

# 6. Mission 12 programme environment — exact World-owned physical refs

Only the following physical/environmental refs are added because they are useful runtime addresses inside the already-authorised programme context. They do **not** duplicate Combat's programme occurrence authority.

## 6.1 Programme array

`arc1_pump_four_programme_array_01`

Parent:

`arc1_pump_four_lower_chamber_01`

Meaning:

- fixed lower-chamber apparatus/infrastructure associated with the host/Echo programme;
- physical provenance/context for system observations and programme transitions;
- not itself a Combat participant, Technique, Skill source, PL modifier or autonomous resolver.

The existing exact Combat/programme occurrence IDs remain authoritative for their effects:

- `arc1_m12_programme_comparative_retrieval_link`;
- `arc1_m12_programme_preference_test`;
- `arc1_m12_programme_advanced_optimisation_transition`;
- `arc1_m12_programme_terminal_optimisation_transition`.

World does not create parallel substitute occurrence IDs for those mechanics.

## 6.2 Comparative-retrieval interface

`arc1_pump_four_comparative_retrieval_interface_01`

Parent:

`arc1_pump_four_programme_array_01`

This is a physical interface/context which may be the environmental source address when Story/Combat legally commits `arc1_m12_programme_comparative_retrieval_link`.

It does not by itself:

- authorise comparative retrieval;
- establish Ren identity;
- read a Hosted Entity universally;
- create direct host mind-control;
- grant Knowledge beyond exact emitted observations.

## 6.3 Inner containment

`arc1_pump_four_inner_containment_01`

Parent:

`arc1_pump_four_lower_chamber_01`

This is the physical inner containment area referenced by the Mission-12 reveal context, including any factual current presence of `arc1_dr_sazan` supplied by owning Story/Registry state.

The location does not establish Sazan's identity, survival, Battle PL, custody or programme authority by itself.

---

# 7. Explicit non-World ownership

World does **not** own or infer:

- Mission IDs, Story Scene IDs or Writing `occ_*` conclusions;
- `battleResult`, `recallResult`, `carrierResponse` or Recognition Substitution outcome;
- Mizue Kagawa / Recall Medic / Field Operative Battle Stats, PL, action package or side assignment;
- Ren stable identity `arc1_ren`, Ren stage representations, Stats or PL;
- `arc1_menma_echo`, `arc1_ren_conditioned_echo` or Hosted-Entity relationship semantics;
- reciprocity eligibility or `EchoMenmaProgressionEligible(actor)`;
- permanent `echo_menma` development/representation authority;
- Kurama voluntary-loan consent, temporary modifiers or cleanup;
- Sazan personal identity/PL/Combat package;
- whether testimony is true;
- whether a Battle result makes an area safe;
- participant death, injury, custody, escape or willingness unless an owning factual resolver returns and commits those states;
- Mission/Arc completion;
- inventory ownership of the fresh order or programme hardware;
- map-marker visibility before legitimate Knowledge/actionability;
- reward/progression entitlement merely because the facility was entered or a Battle was completed.

---

# 8. Exact runtime binding table

| Story / runtime seam | Exact World ref(s) |
|---|---|
| `occ_arc1_m11_pump_four_order_actionable` | evidence `arc1_m11_pump_four_fresh_order_01`; location `arc1_m11_pump_station_four_01`; host `KON-O20` |
| `scene_arc1_m11_pump_four_recall` | `arc1_m11_pump_four_service_floor_01`; World root `world_occ_arc1_pump_four_better_host_facility_chain_01` once physically entered |
| `arc1_m11_pump_four_recall_encounter` caller context | location `arc1_m11_pump_four_service_floor_01`; parent `arc1_m11_pump_station_four_01` |
| `occ_arc1_m11_lower_service_access_secured` | physical access ref `arc1_pump_four_lower_service_access_01`; factual World transition where applicable `world_occ_arc1_m11_lower_service_access_made_traversable` |
| `scene_arc1_m11_lower_chamber_better_host_reveal` | mission area `arc1_pump_four_lower_facility`; instance `arc1_pump_four_lower_chamber_01`; physical-entry occurrence `world_occ_arc1_m11_lower_facility_entered` |
| `occ_arc1_m11_to_m12_better_host_handoff_committed` | same World root + same mission area + same lower-chamber instance; no replacement location |
| `scene_arc1_m12_ren_reveal_and_comparative_retrieval` | `arc1_pump_four_lower_chamber_01`; environment `arc1_pump_four_programme_array_01`; interface `arc1_pump_four_comparative_retrieval_interface_01` |
| `occ_arc1_m12_sazan_alive_revealed` | physical context `arc1_pump_four_inner_containment_01`; Sazan identity/state still Story/Registry-owned |
| M12 Stage 1/2/3 callers | same `arc1_pump_four_lower_chamber_01` unless Story legally changes location; World does not own stage transitions |

---

# 9. Acceptance / issue #98 closure

Issue #98 is satisfied when Coding can consume the exact refs above without prose-label invention.

World closure proves:

- Pump Station Four has one exact stable World location beneath existing `KON-O20`;
- the fresh order has one exact caller-owned evidence ref;
- lower-service access has one exact physical route ref and bounded state;
- M11 and M12 share one exact contained lower-facility instance;
- one shared World occurrence root spans the continuous physical chain instead of duplicating World history at the Mission boundary;
- the M12 programme has exact physical environment refs without stealing Combat/Story/Registry authority;
- map geometry may change without changing Chronicle identity;
- Coding #41 can now wire Story → World context → Combat → same Story without inventing World IDs.

**World blocker status: CLOSED.**
