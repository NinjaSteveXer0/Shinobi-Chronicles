# Shinobi Chronicles — Arc 1 Missions 2–10 World Source / Object / Location Binding Contract

**Date:** 2026-09-09  
**Owner:** World / Missions / Events / Rewards  
**Status:** WORLD AUTHORITY — M2–M10 CALLER BINDINGS CLOSED / MAP GEOMETRY-AGNOSTIC  
**Writing input:** `Documentation/Story/Arc1_Missions2-10_Machine_Addressable_Story_Runtime_Contract_2026-09-09.md`  
**Arc skeleton:** `Documentation/Story/Arc1_Konoha_Story_Skeleton_and_Choice_Authority_2026-09-09.md`

---

## 1. Purpose

This contract closes the World-owned caller refs that Writing deliberately left unresolved for Arc 1 Missions 2–10.

It binds exact Story-relevant world instances, occurrence-local/persistent source refs, physical evidence/object refs and continuity rules without redesigning Story, Combat, Progression, PL, Registry or UI.

The current World Map / five regional map artwork may continue changing. These IDs are **semantic addresses**, not pixel coordinates. UI / Assets may rebind their presentation anchors after final map replacement without changing Chronicle history or Story causality.

Preserve:

- Story Scene ID != World `sourceOccurrenceId`;
- location != hotspot != event != opportunity;
- stable semantic place != current pixel coordinate;
- source addressability != Registry/collectible admission;
- object custody != ownership of a gameplay Item;
- testimony != World Truth;
- Battle result != Mission result automatically;
- map replacement != Chronicle reroll;
- final art geometry may move; these semantic IDs do not.

---

# 2. Global source-occurrence rule

Every Mission below receives one World occurrence root.

A Story-owned `occ_arc1_*` record may cite this World occurrence root or an exact object/participant source beneath it. The World root means **this physical situation existed**. It does not itself commit Writing's historical conclusion.

World roots:

- M2 `world_occ_arc1_m2_warehouse_operation_01`
- M3 `world_occ_arc1_m3_hospital_reference_operation_01`
- M4 `world_occ_arc1_m4_relay_four_operation_01`
- M5 `world_occ_arc1_m5_third_bell_operation_01`
- M6 `world_occ_arc1_m6_archive_operation_01`
- M7 `world_occ_arc1_m7_dead_transfer_operation_01`
- M8 `world_occ_arc1_m8_sanitisation_investigation_01`
- M9 `world_occ_arc1_m9_ashes_investigation_01`
- M10 `world_occ_arc1_m10_veterinary_facility_operation_01`

Once committed, save/load/retry must reuse these historical occurrence identities. They are not regenerated because a scene is reopened.

---

# 3. Mission 2 — Warehouse

**Mission:** `arc1_m2_warehouse`  
**Story scene:** `scene_arc1_m2_warehouse_investigation`

## Stable physical context

- location instance: `arc1_m2_warehouse_site_01`
- semantic parent: Konoha commercial/logistics environment
- map geometry: presentation-owned / may be rebound after map update
- World root: `world_occ_arc1_m2_warehouse_operation_01`

This is a temporary Story-used warehouse site within reusable Konoha geography. The Story occurrence does not create a permanent public destination unless later World authority deliberately promotes it.

## Exact source/object refs

- distributed-operation ledger: `arc1_m2_distributed_operation_ledger_01`
- purge apparatus/source: `arc1_m2_purge_apparatus_01`
- recoverable warehouse evidence set: `arc1_m2_warehouse_evidence_bundle_01`
- Sarutobi logistics source: `arc1_m2_sarutobi_logistics_source_01`

`arc1_m2_sarutobi_logistics_source_01` is a stable source within Arc-1 history, not automatic collectible/Registry admission and not proof of wider Sarutobi-clan complicity.

## World commit boundaries

- `world_occ_arc1_m2_warehouse_entered` — site physically entered;
- `world_occ_arc1_m2_ledger_available` — ledger physically present/addressable;
- `world_occ_arc1_m2_purge_apparatus_available` — purge apparatus/source physically actionable on a route where Writing permits it;
- `world_occ_arc1_m2_evidence_custody_changed` — only when exact holder/custodian changes.

World does **not** commit the Writing conclusions `distributed operation discovered` or `purge observation completed`; Writing commits those after legitimate interaction.

---

# 4. Mission 3 — Hospital

**Mission:** `arc1_m3_hospital`  
**Story scene:** `scene_arc1_m3_hospital_reference_recovery`

## Stable physical context

- host destination: Konoha Hospital
- internal Story site: `arc1_m3_hospital_reference_room_01`
- World root: `world_occ_arc1_m3_hospital_reference_operation_01`

If runtime already owns a persistent Konoha Hospital location identity, bind this Story site beneath it. Do not duplicate the hospital as a second world location.

## Exact source/object refs

- female med-nin source: `arc1_m3_med_nin_contact_01`
- Sarutobi-related source: `arc1_m3_sarutobi_hospital_source_01`
- chakra/recognition reference material set: `arc1_m3_reference_material_set_01`
- retained physical case: `arc1_m3_reference_case_01`

The M2 Sarutobi source and M3 Sarutobi source are **not declared the same historical person** by World. Do not merge them absent separate Writing/Registry authority.

## Custody contract

`arc1_m3_reference_case_01` has independent factual state:

- `custodian`
- `physicalLocation`
- `securedState`
- `availableForInspection`

Writing's `occ_arc1_m3_hospital_case_retained` may commit only after the actual custody transfer is successful.

Hospital evidence != Item ownership. If later Items authority converts any sample into inventory, that is a separate transaction.

---

# 5. Mission 4 — Barrier / Relay Four

**Mission:** `arc1_m4_barrier`  
**Story scene:** `scene_arc1_m4_barrier_relay_four`

## Stable physical/system identity

- location/site: `arc1_m4_relay_four_site_01`
- barrier relay system: `arc1_m4_relay_four_system_01`
- recognition interface: `arc1_m4_relay_four_recognition_interface_01`
- World root: `world_occ_arc1_m4_relay_four_operation_01`

These are persistent Arc-1 historical addresses even if the map artwork changes.

## World state

World may commit physical/system facts such as:

- relay accessible;
- relay active/inactive;
- interface present;
- receiver-compatible route physically available;
- system state changed by an authorised resolver.

World does not itself grant Identity Rebinding, Technique competence, PL, Stats or mastery.

`occ_arc1_m4_relay_four_compromise_confirmed` remains Writing-owned interpretation of legitimate evidence.

---

# 6. Mission 5 — Academy / Third Bell

**Mission:** `arc1_m5_academy`  
**Story scene:** `scene_arc1_m5_academy_third_bell`

## Stable physical/system identity

- Academy Story chamber: `arc1_m5_third_bell_chamber_01`
- calibration system: `arc1_m5_third_bell_calibration_system_01`
- receiver interface: `arc1_m5_third_bell_receiver_interface_01`
- Third Bell propagation node: `arc1_m5_third_bell_node_01`
- World root: `world_occ_arc1_m5_third_bell_operation_01`

Bind the chamber beneath the existing Shinobi Academy geography. Do not create a second permanent Academy.

## Boundary

World owns physical/system addressability and resulting factual system-state transitions requested by Story/Combat.

Writing owns:

- confrontation reached;
- calibration successfully redirected;
- Third Bell propagation accepted.

Combat owns the Female Operator Battle and factual Battle return.

Battle victory does not set the Third Bell facts automatically.

---

# 7. Mission 6 — Archive

**Mission:** `arc1_m6_archive`  
**Story scene:** `scene_arc1_m6_archive_identity_rebinding`

## Stable physical/system identity

- Archive site: `arc1_m6_archive_site_01`
- trusted-identity records system: `arc1_m6_identity_archive_system_01`
- relevant record set: `arc1_m6_identity_propagation_records_01`
- Dead Transfer lead record: `arc1_m6_dead_transfer_lead_record_01`
- World root: `world_occ_arc1_m6_archive_operation_01`

## Boundary

Archive evidence may be inspected, copied, retained as Knowledge, or otherwise acted upon according to Story.

World does not convert evidence into Technique ownership.

Writing's `occ_arc1_m6_identity_rebinding_seal_created` is the factual creation/development occurrence; Progression/Skills remain the authority for persistent capability state.

---

# 8. Mission 7 — The Dead Transfer

**Mission:** `arc1_m7_dead_transfer`  
**Story scene:** `scene_arc1_m7_dead_transfer`

## Stable physical context

- transfer site: `arc1_m7_dead_transfer_site_01`
- transfer apparatus: `arc1_m7_transfer_apparatus_01`
- World root: `world_occ_arc1_m7_dead_transfer_operation_01`

## Exact sources/objects

- Collector source/person address: `arc1_m7_collector_01`
- living carrier stable Entity ref: `arc1_menma_echo` — consume Registry/CE authority; do not mint a second World carrier identity
- black stabiliser/coupling vessel: `arc1_m7_black_stabiliser_01`
- transfer coupling interface: `arc1_m7_transfer_coupling_interface_01`
- sanitisation-eligible evidence set root: `arc1_m7_sanitisation_evidence_set_01`

Default evidence members where physically present:

- `arc1_m7_black_stabiliser_01`
- `arc1_m7_transfer_apparatus_trace_01`
- `arc1_m7_transfer_site_record_fragment_01`

The living Hosted Entity `arc1_menma_echo` is **not** an evidence object merely because the sanitisation event exists.

## World occurrence boundaries

- `world_occ_arc1_m7_transfer_site_entered`
- `world_occ_arc1_m7_transfer_apparatus_present`
- `world_occ_arc1_m7_carrier_physically_present`
- `world_occ_arc1_m7_attachment_state_changed` — only from authorised Story/Entity consequence
- `world_occ_arc1_m7_sanitisation_targets_exposed` — exact target list, not a global purge flag

Existing sanitisation Combat package remains authoritative and is not reopened.

---

# 9. Mission 8 — The Sanitisation Chain

**Mission:** `arc1_m8_sanitisation_chain`  
**Story scene:** `scene_arc1_m8_sanitisation_chain_investigation`

## World root

`world_occ_arc1_m8_sanitisation_investigation_01`

## Exact source/object refs

- white-thread evidence: `arc1_m8_white_thread_evidence_01`
- Moroboshi reassignment packet: `arc1_m8_moroboshi_reassignment_packet_01`
- sponsor-trail evidence set: `arc1_m8_sponsor_trail_evidence_01`
- Daichi Moroboshi stable source/person: `arc1_daichi_moroboshi`

`arc1_daichi_moroboshi` is a stable Chronicle participant/source because later Missions return to the same historical person. This does not require Battle Stats/PL or collectible admission.

## World state

Physical paperwork/material custody persists independently from whether Writing has interpreted it.

White-thread evidence can be:

- present;
- observed;
- secured;
- transferred;
- sanitised/unavailable in current evidentiary context;

without retroactively erasing already committed History/Knowledge.

Mission 8 has no World-authorised Battle.

---

# 10. Mission 9 — Ashes of the Chain

**Mission:** `arc1_m9_ashes_of_chain`  
**World root:** `world_occ_arc1_m9_ashes_investigation_01`

## Purpose

World consumes the factual historical result of the Mission-7 sanitisation encounter and current persisted evidence state. It must not hard-code the developer-authoring route as universal truth.

## Exact lead/binding

- veterinary-ward lead: `arc1_veterinary_ward_lead_01`
- veterinary-ward/facility stable location: `arc1_veterinary_ward_facility_01`
- Moroboshi trail reference: `arc1_m9_moroboshi_trail_reference_01`

The facility becomes map/actionable only when `arc1_veterinary_ward_lead_01` is legitimately acquired and observer Knowledge permits projection.

Before that, its physical existence does not require a visible marker.

## Sanitisation/history rule

Current physical/evidentiary availability may be reduced or altered by exact sanitisation outcomes.

Never erase:

- already committed Chronicle occurrences;
- participant history;
- already acquired legitimate Knowledge;
- factual Battle history.

Mission 9 does not gain a Battle merely because Mission 7 had one.

---

# 11. Mission 10 — Beneath the Veterinary Ward

**Mission:** `arc1_m10_veterinary_ward`  
**Story scene:** `scene_arc1_m10_veterinary_ward_facility`  
**World root:** `world_occ_arc1_m10_veterinary_facility_operation_01`

## Stable location structure

Parent stable facility:

`arc1_veterinary_ward_facility_01`

Internal sites:

- storm-drain/service approach: `arc1_m10_vet_service_tunnel_01`
- underground transfer ward: `arc1_m10_transfer_ward_01`
- restraint/transfer room: `arc1_m10_transfer_room_01`
- operator escape route: `arc1_m10_operator_escape_route_01`

These are local Story geography beneath one stable facility, not four permanent world-map markers.

## Exact participant/source ref

Stable transfer operator:

`arc1_m10_transfer_operator_01`

This is one persistent human source for Mission-10 history. Stable source addressability does not itself require a collectible or a Battle package.

Dr. Sazan remains testimony/reported programme authority in Mission 10 unless another exact scene places him physically there.

## Detected subjects

World authorises six occurrence-local subject refs for the explored six-person facility state:

- `arc1_m10_transfer_subject_01`
- `arc1_m10_transfer_subject_02`
- `arc1_m10_transfer_subject_03`
- `arc1_m10_transfer_subject_04`
- `arc1_m10_transfer_subject_05`
- `arc1_m10_transfer_subject_06`

Their factual alive/dead condition must be committed by the current occurrence state and legitimate observation/resolver output. Do not assume the developer route's 4 alive / 2 dead until that current occurrence actually establishes it.

## Physical evidence objects

- stabiliser tube set root: `arc1_m10_stabiliser_tube_set_01`
- restraint/transfer bed set root: `arc1_m10_transfer_bed_set_01`
- numbered hook array: `arc1_m10_numbered_hook_array_01`
- facility programme records: `arc1_m10_programme_records_01`

Objects may have sub-instance refs if runtime requires per-object custody/destruction. Do not turn these into inventory Items by inference.

## Observer/actionability rule

Facility discovery:

world existence
→ legitimate lead/route Knowledge
→ location discovery
→ actionable entry
→ internal observation.

Hinata/Byakugan or another capability may establish observer facts, but World does not convert observation into medical treatment competence.

Mission 10 contains no automatic Battle under Writing's current contract.

---

# 12. Cross-Mission continuity table

| Source / object | First World address | Persists into |
|---|---|---|
| Distributed ledger | `arc1_m2_distributed_operation_ledger_01` | M2 evidence/history; node leads M3–M6 |
| Hospital case | `arc1_m3_reference_case_01` | later evidence only if custody retained |
| Relay Four | `arc1_m4_relay_four_system_01` | M4 evidence; M5/M6 development context |
| Third Bell | `arc1_m5_third_bell_node_01` | M5 evidence; M6 development context |
| Archive record | `arc1_m6_identity_propagation_records_01` | M6 evidence/history |
| Dead Transfer lead | `arc1_m6_dead_transfer_lead_record_01` | M7 actionability |
| Hosted Entity Echo | `arc1_menma_echo` | M7 onward under CE/Registry authority |
| Black stabiliser | `arc1_m7_black_stabiliser_01` | M7 evidence subject to factual sanitisation |
| White-thread evidence | `arc1_m8_white_thread_evidence_01` | M8–M11 where physically/history-relevant |
| Daichi Moroboshi | `arc1_daichi_moroboshi` | M8/M9 lead history; direct M11 person |
| Veterinary ward lead | `arc1_veterinary_ward_lead_01` | M9 → M10 actionability |
| Veterinary facility | `arc1_veterinary_ward_facility_01` | M9 discovery → M10 physical operation |
| Transfer operator | `arc1_m10_transfer_operator_01` | M10 testimony/history and any later recurrence if survived/available |

---

# 13. Map replacement / geometry rule

Stephen is replacing the World Map and intends to replace all five Great-Land maps.

Therefore:

1. semantic IDs in this contract remain stable;
2. no current x/y coordinate is made durable here;
3. UI / Assets owns final visual anchor/calibration for any Story location that actually needs map projection;
4. temporary internal Story sites may remain local Scene/mission-area geography and need no country-map marker;
5. map replacement must not create new historical places merely because artwork moved;
6. if an existing stable real place can host the Story occurrence, bind beneath it rather than creating a duplicate public location;
7. exact Story location visibility remains Knowledge/Actionability driven.

---

# 14. Rewards

This binding contract authors **no automatic rewards**.

Any later Ryō/item/material/reputation/access/development reward must cite an exact resolved outcome and separate reward package.

Preserve:

- mission evidence != reward automatically;
- loot-capable object != granted Item;
- training/development evidence != automatic Progression;
- Battle victory != mission reward automatically.

---

# 15. Implementation status

World caller/source/object binding for Missions 2–10 is now **CLOSED**.

This does not mean:

- Story runtime implemented;
- all Battle packages implemented;
- all map anchors rebound to Stephen's new artwork;
- browser validation complete;
- Golden/regression GREEN.

Coding may consume these IDs as the missing World caller refs in the Writing M2–M10 machine-addressable Story contract.

UI / Assets should only receive a geometry handoff for a specific anchor after Stephen's replacement map for that surface is committed/final enough to calibrate.
