# Shinobi Chronicles — Alpha Village / Region Info, Map Marker Grammar, Story Locator and Executable Activation Package

**Date:** 2026-09-11  
**Owner:** World / Missions / Events / Rewards  
**Status:** **BINDING WORLD ALPHA INTEGRATION AUTHORITY — KONOHA EXECUTABLE WAVE 1; FIRE SEMANTICS READY / FINAL GEOMETRY PENDING #55**

---

## 1. Purpose

This document is the one consolidated World package requested by the post-22500 installed-browser integration sequence. It closes, in one authority surface:

1. reusable **Village / Region Info** read-only projection semantics;
2. the minimal Alpha **location-marker / opportunity-overlay / known-unknown halo grammar**;
3. the World-side **Current Main Story locator** consumed by `RETURN TO MAIN MISSION` / `LOCATE STORY`;
4. a versioned **Alpha executable activation manifest** promoted from the larger 500-seed World reservoir.

It consumes rather than reopens:

- `Documentation/Maps/Konoha Hotspot Calibration v3.md`;
- `Documentation/World/Land of Fire Interactive Event Ecology Alpha Contract.md`;
- `Documentation/World/Arc 1 Optional Pressure Side Quest and Discovery Population Wave 1 2026-09-09.md`;
- `Documentation/World/Capability_Responsive_Chronicle_Event_Ecology_v3_Consolidated_Lock_2026-09-10.md`;
- `Documentation/World/World_500_Quest_Reservoir_Activation_Policy_2026-09-10.md`;
- `Documentation/Story/Current_Story_Mission_Story_Recall_Metadata_Authority_2026-09-11.md`;
- Arc-1 M2–M10 World source/location authority;
- Arc-1 M11/M12 Pump Four / Better Host World binding authority.

Preserve throughout:

> location != hotspot != event != opportunity  
> World Truth != observer Knowledge != presentation  
> known != accessible != actionable  
> Story locator != teleport  
> marker colour != semantic authority  
> hidden denominator != harmless UI metadata  
> authored seed != executable content != runtime validated != Golden GREEN

---

# PART A — VILLAGE / REGION INFO PROJECTION

## 2. Schema

Recommended read-only projection schema:

`sc.worldInfoProjection.v1`

The UI consumes this projection. Opening/closing/refreshing the panel creates no World, Knowledge, Story, reward or discovery truth.

Suggested shape:

```text
schemaVersion
surfaceId
surfaceKind = village | region
surfaceDisplayName
projectionRevision
publicLandmarks
knownLocationProgress
knownRestrictedCount
activeOpportunityCount
knownOpportunityProgress
knownLeadProgress
recentRecordUpdates[]
trackedOpportunityRefs[]
```

Coding may use equivalent field names but must preserve the exact semantics below.

## 3. Public landmark counter

`publicLandmarks = { knownCount, legalPublicTotal }`

The denominator may contain only a deliberately published/public set whose cardinality is itself legal Knowledge.

For **Konoha v3**:

- legal public set = `KON-P01..KON-P12`;
- safe initial projection once Konoha is ordinarily known = **12 / 12**.

`KON-A##` service/activity subhosts do not automatically add to this count.

`KON-S##` concealed reservations never add to the public denominator.

Other villages/regions publish their own public denominator only after World has explicitly closed that public set. Coding must not derive totals from registry length, hidden arrays, map polygons or authoring reservations.

## 4. Chronicle-relative known-location progress

`knownLocationProgress = { verifiedCount, currentKnownRecordCount }`

This is the dynamic `12 / 12 -> 12 / 13 -> 13 / 13` grammar requested by Stephen.

### Denominator

`currentKnownRecordCount` contains only location records that have legitimately entered the current observer's Shinobi Record as known/suspected-by-name/identified geography.

A zero-leak World location that the observer does not know exists is absent from the denominator.

### Numerator

`verifiedCount` contains known-location records whose location existence/identity has been directly confirmed, visited, or otherwise legitimately verified for that observer.

A source-bounded report such as “there is a medicine house beyond the old fork” may increase the denominator when it legitimately creates a named location record while leaving the numerator unchanged until confirmation.

A known-unknown `????` does **not** enter the named-location denominator until its identity becomes legitimately known. It may instead be represented by the separate Record/discovery feed.

## 5. Known restricted geography

`knownRestrictedCount` is a plain count, not a completion fraction.

For Konoha, `KON-S01` Forest of Death / Training Ground 44 is known restricted geography and may contribute here when the current observer legitimately knows it.

Knowing a restricted place exists does not imply permission to enter it.

## 6. Active opportunities

`activeOpportunityCount` counts only currently known + currently actionable opportunity occurrences projected on that surface.

It must not count:

- eligible-but-unselected candidates;
- undiscovered events;
- suppressed/expired content unknown to the observer;
- hidden authoring seeds;
- inactive service subhosts merely because they exist.

Normal World guidance remains roughly **4–7 simultaneously actionable non-Story opportunities** when enough legitimate candidates exist.

## 7. Known opportunity progress

`knownOpportunityProgress = { closedCount, currentKnownRecordCount }`

The denominator is the observer's accumulated surface-relevant opportunity records that have legitimately entered the Shinobi Record.

The numerator counts factual closed states such as resolved, declined, withdrawn, expired-with-known-closure, or otherwise historically closed according to the exact event contract.

A new known unresolved opportunity may therefore change `12 / 12` to `12 / 13`; resolving or factually closing it may produce `13 / 13`.

Do not remove an opportunity from historical progress merely because its live marker is gone.

## 8. Known lead progress

`knownLeadProgress = { closedCount, currentKnownLeadCount }`

A lead enters only from legitimate Knowledge/history. It closes only from factual resolution, explicit abandonment/withdrawal, or an observer-legitimate fact that the route is no longer actionable.

If the sole information carrier dies/disappears and the lead becomes unavailable, runtime must not silently regenerate the same lead. A later resurfacing requires a **new causal source/occurrence** and a new Shinobi Record update.

## 9. Recent Shinobi Record / discovery feed

`recentRecordUpdates[]` may project only committed observer-facing changes, including:

- `location_known`;
- `location_identified`;
- `location_verified`;
- `known_unknown_detected`;
- `opportunity_known`;
- `opportunity_resolved`;
- `lead_added`;
- `lead_closed`;
- `knowledge_recorded`;
- `access_changed`;
- `story_locator_changed`.

A hidden World change unknown to the observer creates no feed entry.

Feed entry != source of truth. It is a receipt of truth committed elsewhere.

## 10. Surface projection rules

- Village/Region Info is read-only.
- Counters are observer-relative.
- Public geography totals may be static only when World explicitly publishes them.
- Hidden reservation totals are never inferred.
- Optional-location count is Chronicle-relative unless an exact public catalogue exists.
- Service subhosts do not inflate location totals by default.
- One physical location can host several opportunity records without becoming several locations.

---

# PART B — MINIMAL ALPHA MAP MARKER / HALO GRAMMAR

## 11. Separation model

Every visible map treatment is composed from two independent layers:

1. **base location projection** — what place the observer legitimately knows;
2. **opportunity overlays** — what is currently known/actionable at that place.

A location never becomes a different location because an overlay changes.

## 12. Base location projection states

### `NONE`

Observer has no legitimate projected Knowledge.

Required behaviour:

- no marker;
- no halo;
- no pointer/cursor change;
- no hover/focus target;
- no tooltip;
- no DOM/accessibility identity;
- no invisible hitbox/interception.

### `KNOWN_LOCATION`

Named location identity is legitimately known.

Recommended presentation: stable neutral location marker/ring and legitimate known display name.

### `KNOWN_RESTRICTED`

Named location is known, but current access is restricted/closed.

Recommended presentation: normal location marker plus a restrained restriction/lock treatment. Restriction is not “danger” and does not imply failure.

### `KNOWN_UNKNOWN`

The observer legitimately knows **something is there / worth investigating**, but canonical identity is not yet known.

**Binding presentation:** restrained **pulsing golden halo + label exactly `????`**.

This treatment is reserved for the known-unknown epistemic state. It is not the generic Main Story marker.

### `IDENTIFIED_LOCATION`

A previously known-unknown location has been legitimately identified. The same projection slot replaces `????` with the discovered name and normal known-location presentation.

## 13. Opportunity overlay semantic classes

These are World/UI semantic classes, not permission to infer state from colour.

### `MAIN_STORY`

Current authorised Main Story focus from the Story locator registry.

Recommended presentation: **solid static Story diamond/scroll badge** attached to the location marker. Warm-gold/amber is acceptable, but **no pulsing halo and no `????`**.

### `WORLD_ACTIVE`

Ordinary current standing/side/world opportunity.

Recommended presentation: restrained small neutral/teal activity badge or rim.

### `DEVELOPMENT`

Known training/development opportunity whose owning system currently makes it actionable.

Recommended presentation: cyan/teal training badge. It does not promise EXP or mastery.

### `RECORD_DISCOVERY`

Known investigation/discovery/Shinobi-Record lead.

Recommended presentation: blue/ivory record/book/spark badge.

### `KNOWN_THREAT`

A threat state is legitimately known to this observer.

Recommended presentation: red warning rim/badge. Do not project red merely because World Truth contains a hostile participant the observer has not identified as a threat.

### `SPECIAL_AUTHORED`

An exact authored unusual/special opportunity whose special significance is itself legitimately known.

Recommended presentation: small violet/special badge. Coding must not infer rarity from reward value, hidden ID, secret namespace or content length.

## 14. Overlay stacking

One base location marker may host multiple overlays.

Do not draw duplicate location markers for each event.

Suggested visible priority when space is limited:

1. `MAIN_STORY`;
2. `KNOWN_THREAT`;
3. player-tracked known opportunity;
4. `DEVELOPMENT`;
5. `RECORD_DISCOVERY`;
6. `SPECIAL_AUTHORED`;
7. `WORLD_ACTIVE`.

Maximum visible badges should remain low-clutter; additional legitimately known opportunities may live in the location/event drawer.

No hidden event may increase a visible badge count.

## 15. Selection / focus

Marker focus does not commit, accept, resolve, travel to, or reroll an opportunity.

Map open/close and hover are presentation refreshes only.

---

# PART C — CURRENT MAIN STORY LOCATOR

## 16. Schema

World publishes:

`sc.worldStoryLocator.v1`

Recommended fields:

```text
schemaVersion
locatorRef
missionId
locatorState
surfaceId
hostLocationRef
localInstanceRef
focusMode
knowledgeGateRefs[]
accessGateRefs[]
storyResumeSceneId
currentChoiceId
```

`storyResumeSceneId` and `currentChoiceId` are consumed from Writing's `sc.storyRecall.v1`; World does not invent them.

## 17. Locator states

- `ACTIVE_FOCUS` — legal map focus exists now.
- `ACTIVE_LOCAL_INSTANCE` — known host + exact contained/internal instance can be resumed.
- `KNOWN_BUT_INACCESSIBLE` — place is known but current entry is not authorised; focus is allowed, travel/entry is not.
- `NO_CURRENT_MAP_FOCUS` — current Story state has no legitimate map target.
- `WITHHELD_AUTHORING_CHECKPOINT` — Writing state is draft-only and must not project to runtime.
- `COMPLETED` — no active current-mission locator.

## 18. Universal locator rules

`RETURN TO MAIN MISSION` / `LOCATE STORY` may:

- open the correct map surface;
- focus the exact legitimate host;
- apply `MAIN_STORY` overlay;
- open a known location drawer or route to an already-authorised contained area/scene when ordinary access permits.

It may **not**:

- teleport through unknown geography;
- discover a hidden location by being clicked;
- invent access;
- invent a Story opportunity;
- fabricate recap/history;
- resolve a choice;
- advance Story;
- expose a hidden canonical identity.

## 19. Arc-1 World locator registry

These entries are reusable for Arc-1 replays/current saves. They identify World focus; they do not replace Story caller/return authority.

| Mission | `locatorRef` | Surface | Host | Local/internal target | Rule |
|---|---|---|---|---|---|
| `arc1_m1_*` | `story_locator_arc1_m1_whisper_woods` | `fire` | `fire:O21` / `fire_whisper_woods` | `whisper_woods` | Project only after Mission-1 trace/Story actionability legitimately reveals the approach; Fire final regional focus waits for #55 final geometry. |
| `arc1_m2_warehouse` | `story_locator_arc1_m2_warehouse` | `konoha` | `KON-O19` | `arc1_m2_warehouse_site_01` | Story may make the temporary warehouse actionable inside Storehouse Row without turning the warehouse into a permanent top-level location. |
| `arc1_m3_hospital` | `story_locator_arc1_m3_hospital` | `konoha` | `KON-P03` | `arc1_m3_hospital_reference_room_01` | Focus Hospital, then internal Story scene. |
| `arc1_m4_barrier` | `story_locator_arc1_m4_relay_four` | `konoha` | `KON-O20` (within `KON-D11`) | `arc1_m4_relay_four_site_01` | Focus Pump/Naka infrastructure; exact Relay Four system remains Story/World source identity. |
| `arc1_m5_academy` | `story_locator_arc1_m5_third_bell` | `konoha` | `KON-P06` | `arc1_m5_third_bell_chamber_01` | Focus Academy; Third Bell remains internal Story geography. |
| `arc1_m6_archive` | `story_locator_arc1_m6_archive` | `konoha` | `KON-P01` | `arc1_m6_archive_site_01` | Focus Administration; do not mint a duplicate public Archive marker. |
| `arc1_m7_dead_transfer` | `story_locator_arc1_m7_dead_transfer` | `konoha` | `KON-O19` | `arc1_m7_dead_transfer_site_01` | Focus Storehouse Row; transfer site remains occurrence-local. |
| `arc1_m8_sanitisation_chain` | `story_locator_arc1_m8_dynamic_investigation` | dynamic | dynamic exact committed investigation host | exact committed M8 source/site | No permanent Mission-8 hotspot. If current committed history supplies no legitimate known map host, return `NO_CURRENT_MAP_FOCUS`. |
| `arc1_m9_ashes_of_chain` | `story_locator_arc1_m9_veterinary_lead` | `konoha` | `KON-O21` | `arc1_veterinary_ward_facility_01` | Project only after `arc1_veterinary_ward_lead_01` creates legitimate discovery/actionability. |
| `arc1_m10_veterinary_ward` | `story_locator_arc1_m10_veterinary_facility` | `konoha` | `KON-O21` | current exact tunnel/ward/room Story instance | Internal sites do not become extra map markers. |
| `arc1_m11_pump_four` | `story_locator_arc1_m11_pump_four` | `konoha` | `KON-O20` | exact M11 Pump Four / lower-service instance from current M11/M12 World contract | Focus same persistent physical chain. |
| `arc1_m12_better_host` | `story_locator_arc1_m12_better_host` | `konoha` | `KON-O20` | same persisted M11/M12 lower-facility/lower-chamber instance | Do not create a second exterior location for M12. |

## 20. Current Arc-2 Writing state

Writing now publishes `sc.storyRecall.v1` for `arc2_m2_the_leak`, but the latest developer-Menma Hokage-office state is explicitly:

`storyStateClass = authoring_checkpoint`

Therefore current World locator result is:

```text
locatorRef = story_locator_arc2_m2_the_leak_pending
missionId = arc2_m2_the_leak
locatorState = WITHHELD_AUTHORING_CHECKPOINT
surfaceId = null
hostLocationRef = null
localInstanceRef = null
```

World must not project the draft Hokage-office scene as committed runtime state.

Once Writing replaces the checkpoint with committed runtime recall metadata, World may add/activate the exact host mapping supported by that final Story state. No speculative Arc-2 map target is authored here.

---

# PART D — ALPHA EXECUTABLE ACTIVATION MANIFEST

## 21. Manifest identity

`manifestId = sc_world_alpha_activation_konoha_v1_2026_09_11`

`schema = sc.worldActivationManifest.v1`

**Executable scope in this version:** Konoha v3 only.

**Why Fire is excluded from `executable=true`:** World semantics are mature, but final selected Fire regional binary is still awaiting authoritative commit/calibration in GitHub #55. Fire candidates remain semantic-ready and must not consume legacy/stale coordinates.

This manifest deliberately does **not** claim that the missing detailed 500-row wave files are durable production authority. These rows are promoted directly into executable authority from existing durable World ecology plus this document.

## 22. Pool rules

### Konoha baseline pool

`konoha_alpha_standing_pool_v1`

- target active ordinary occurrences: 4;
- preferred minimum: 3 when enough candidates exist;
- soft maximum: 6;
- distribute across at least 3 hosts where possible;
- no more than 2 unresolved ordinary occurrences at one host;
- repeatable entries create **new occurrence identities**, never replay the same history;
- resolved `family + host` is suppressed for the next refill at that host.

### Konoha Arc-1 pressure pool

`konoha_arc1_pressure_pool_v1`

- maximum currently surfaced at once: 2;
- selection only from exact current Arc/history eligibility;
- these do not replace ordinary-life content.

### Konoha capability-responsive pool

`konoha_capability_responsive_pool_v1`

- target surfaced: 0–2 depending on actual eligible routes;
- dedicated events are absent when prerequisites are absent;
- a Character with multiple legitimate paths gets the union of pools plus compound candidates;
- eligibility first, relevance weighting/randomness second.

Overall map guidance remains roughly 4–7 actionable non-Story opportunities when enough legitimate candidates exist.

## 23. Shared predicate semantics

These are semantic World predicates. Coding may map them to existing equivalent committed-state checks but must not weaken them.

- `KONOHA_FREE_PLAY` — Konoha is known/access-authorised and current Story state does not explicitly suppress ordinary free play.
- `HOST_KNOWN_ACCESSIBLE(host)` — exact host identity is known and current ordinary access is authorised.
- `ARC1_ACTIVE_AFTER_M1` — current Chronicle has entered Arc-1 post-M1 pressure window through committed Story history.
- `ARC1_MIDDLE_OR_LATER` — current committed Story history has reached the middle Arc-1 pressure window; do not infer from UI mission-number text alone.
- `HAS_SKILL_ACCESS(skillId)` — owning Skill system says the actor currently has legitimate learned access.
- `HAS_FALSE_PROFILE` — current source-owned legitimate False Identity profile exists.
- `HAS_EXACT_EVIDENCE_COUNT(2..3)` — exact accessible committed evidence refs required by Evidence Thread Reconstruction exist in the occurrence.
- `KNOWN_UNKNOWN_ALLOWED(secretRef)` — an exact committed clue/evidence predicate authorises known-unknown projection for that secret; never inferred from proximity.

## 24. Reward rule for this manifest

All Ryō grants are occurrence-entitlements and one-shot per exact occurrence resolution.

Qualifying outcome commits entitlement -> persistence grants once -> UI reports grant.

Save/load/reopen cannot duplicate payment.

Declining/non-action never subtracts money, Progression, Rank, PL or morality. It may simply mean the service payment was not earned because the service was not performed, while factual non-action/history remains recordable where meaningful.

No event below grants an Item, Weapon, Equipment, Summon, Technique, PL, Stat, Rank, Promotion or Special Jōnin status.

Training/specialist participation may emit exact factual action/evidence references for the owning Progression/Qualification system to interpret; World does not double-grant development.

## 25. Executable rows — 24 Konoha candidates

Every row uses Konoha v3 geometry authority and is `executable=true` **as content authority**. Coding/runtime validation is still required before GREEN.

### KOH-X01 — Gate Delivery Assistance

- `opportunityId`: `konoha_alpha_gate_delivery_assistance`
- pool: `konoha_alpha_standing_pool_v1`
- mode: `baseline_world`
- host: `KON-P10`
- geometry: `Konoha Hotspot Calibration v3 / KON-P10`
- category: `SIDE_OCCURRENCE`
- eligibility: `KONOHA_FREE_PLAY + HOST_KNOWN_ACCESSIBLE(KON-P10)`
- actions: verify destination; help carry/escort delivery; return to sender; decline
- factual outcomes: delivery completed; delivery returned; delivery reported/problem unresolved; declined
- reward: **120 Ryō** only on `delivery_completed` where the occurrence's client is the payer; otherwise no material reward
- other value: ordinary service/Chronicle history
- recurrence: repeatable new occurrence with same-host suppression
- external dependencies: none

### KOH-X02 — Lost Market Parcel

- `opportunityId`: `konoha_alpha_market_lost_parcel`
- pool: baseline
- host: `KON-P09`
- geometry: v3 / `KON-P09`
- category: `INVESTIGATION / SIDE_OCCURRENCE`
- eligibility: `KONOHA_FREE_PLAY + HOST_KNOWN_ACCESSIBLE(KON-P09)`
- actions: inspect last-known area; ask bounded witnesses; locate parcel; return/report; leave
- factual outcomes: parcel returned; location reported; no parcel found; declined
- reward: **100 Ryō** only when exact owner/client receives the parcel or authorised recovery result
- custody boundary: parcel is occurrence property, not player Item ownership
- recurrence: repeatable new occurrence

### KOH-X03 — Hospital Supply Run

- `opportunityId`: `konoha_alpha_hospital_supply_run`
- pool: baseline
- host: `KON-P03`
- geometry: v3 / `KON-P03`
- category: `SIDE_OCCURRENCE`
- eligibility: `KONOHA_FREE_PLAY + HOST_KNOWN_ACCESSIBLE(KON-P03)`
- actions: accept delivery; verify source/destination; carry/escort supplies; report delay; decline
- outcomes: supplies delivered; problem reported; delivery incomplete; declined
- reward: **150 Ryō** on authorised completed delivery
- boundary: no medical competence/development is inferred
- recurrence: repeatable new occurrence

### KOH-X04 — River Satchel Recovery

- `opportunityId`: `konoha_alpha_river_satchel_recovery`
- pool: baseline
- host: `KON-O03`
- geometry: v3 / `KON-O03`
- category: `SIDE_OCCURRENCE / INVESTIGATION`
- eligibility: `KONOHA_FREE_PLAY + HOST_KNOWN_ACCESSIBLE(KON-O03)`
- actions: assess current; recover by ordinary safe route if available; use an authorised contextual traversal Skill if owned/offered; report location; leave
- outcomes: satchel returned; satchel location established; unrecovered; declined
- reward: **100 Ryō** on return to exact owner
- boundary: contents remain owner property; `skill_water_crossing_control` may add a route but is never required by default
- recurrence: repeatable new occurrence

### KOH-X05 — Craftsmen Shipment Delay

- `opportunityId`: `konoha_alpha_crafts_shipment_delay`
- pool: baseline
- host: `KON-P04`, may route to `KON-O19`
- geometry: v3 / `KON-P04` + `KON-O19`
- category: `INVESTIGATION / SIDE_OCCURRENCE`
- eligibility: Konoha free play; relevant hosts known/access-authorised
- actions: inspect paperwork; check Storehouse Row; locate shipment/custodian; report discrepancy; decline
- outcomes: shipment located; custody discrepancy bounded; delay reported; unresolved; declined
- reward: **180 Ryō** on completed authorised logistics assistance
- boundary: shipment materials do not become player crafting materials
- recurrence: repeatable new occurrence

### KOH-X06 — Messenger Roost Delay

- `opportunityId`: `konoha_alpha_messenger_roost_delay`
- pool: baseline
- host: `KON-O18`
- geometry: v3 / `KON-O18`
- category: `INVESTIGATION / SIDE_OCCURRENCE`
- eligibility: Konoha free play + O18 known/access-authorised
- actions: hear delay report; inspect dispatch chain; check bounded route information; report/assist; leave
- outcomes: delay source bounded; dispatch resumes; authority notified; unresolved; declined
- reward: **140 Ryō** only where exact occurrence was an authorised paid assistance request and outcome qualifies
- recurrence: repeatable new occurrence

### KOH-X07 — Storehouse Inventory Discrepancy

- `opportunityId`: `konoha_alpha_storehouse_inventory_discrepancy`
- pool: baseline
- host: `KON-O19`
- geometry: v3 / `KON-O19`
- category: `INVESTIGATION`
- eligibility: Konoha free play + O19 known/access-authorised
- actions: compare records; inspect physical count; ask custodians; preserve discrepancy; report; decline
- outcomes: clerical mismatch established; custody problem established; unresolved discrepancy preserved; declined
- reward: **220 Ryō** on completed formal inspection/report accepted by the occurrence authority
- Knowledge: testimony remains source-bounded; discrepancy != theft automatically
- recurrence: repeatable new occurrence with new local inventory/custodian facts

### KOH-X08 — Pump Maintenance Alarm

- `opportunityId`: `konoha_alpha_pump_maintenance_alarm`
- pool: baseline
- host: `KON-O20`
- geometry: v3 / `KON-O20`
- category: `SIDE_OCCURRENCE / INVESTIGATION`
- eligibility: Konoha free play + O20 known/access-authorised + no active Story lock that makes the exact infrastructure unavailable
- actions: inspect surface equipment; identify ordinary fault evidence; warn civilians/workers; request specialist help; report; leave
- outcomes: ordinary fault bounded; safe response completed; issue reported; unresolved
- reward: **180 Ryō** on completed authorised civic assistance
- boundary: does not reveal Arc-1 Pump Four/lower-facility truth or hidden access by proximity
- recurrence: repeatable new occurrence

### KOH-X09 — Runaway Veterinary Animal

- `opportunityId`: `konoha_alpha_veterinary_runaway_animal`
- pool: baseline
- host: `KON-O21`
- geometry: v3 / `KON-O21`
- category: `INVESTIGATION / SIDE_OCCURRENCE`
- eligibility: Konoha free play + O21 known/access-authorised outside exact Story lock
- actions: ask handler; inspect ordinary tracks; search; use authorised tracking/scent route if owned; report; decline
- outcomes: animal returned; direction bounded; location reported; unresolved; declined
- reward: **120 Ryō** on return to authorised handler
- boundary: no hidden facility truth inferred from ordinary veterinary activity
- recurrence: repeatable new occurrence

### KOH-X10 — Memorial Record Request

- `opportunityId`: `konoha_alpha_memorial_record_request`
- pool: baseline
- host: `KON-O04`
- geometry: v3 / `KON-O04`
- category: `CHARACTER_MATTER / INVESTIGATION`
- eligibility: Konoha free play + O04 known/access-authorised
- actions: help locate a public inscription; compare public memorial reference; listen; decline
- outcomes: inscription/reference located; conflicting public record noticed where occurrence authors it; request unresolved; declined
- material reward: **none**
- value: Knowledge/history/relationship evidence only where facts support it
- recurrence: repeatable new occurrence with different occurrence-local requester/history

### KOH-X11 — Academy Lost Equipment

- `opportunityId`: `konoha_alpha_academy_lost_equipment`
- pool: baseline
- host: `KON-P06` / `KON-O17` only if Annex is known for the selected setup
- geometry: v3 / P06 (+ O17 when legal)
- category: `SIDE_OCCURRENCE / INVESTIGATION`
- eligibility: Konoha free play + Academy access
- actions: hear report; inspect last-known area; recover; return; report; decline
- outcomes: equipment returned; location reported; unresolved; declined
- material reward: **none**
- custody: Academy property, never automatic player Item ownership
- recurrence: repeatable new occurrence

### KOH-X12 — Observation Drill

- `opportunityId`: `konoha_alpha_training_observation_drill`
- pool: baseline
- host: `KON-P07`
- geometry: v3 / `KON-P07`
- category: `TRAINING_DEVELOPMENT`
- eligibility: Konoha free play + Training Ground accessible + occurrence-local instructor/task available
- actions: accept; observe exact target area; record bounded details; report; end/decline
- outcomes: exact participation/action/result evidence only
- material reward: **none**
- development boundary: Progression/Qualification owner interprets genuine evidence; no generic EXP/PL/Stat grant
- recurrence: repeatable new occurrence

### KOH-X13 — Arc-1 Marked Residence

- `opportunityId`: `fire_arc1_pressure_marked_residence`
- pool: `konoha_arc1_pressure_pool_v1`
- host: selected exact residence context under `KON-P09` or another current authorised Konoha civic host
- geometry: v3 / selected committed host
- category: `INVESTIGATION`
- eligibility: `ARC1_ACTIVE_AFTER_M1` + exact occurrence establishes perceptible mark/household context
- actions: inspect mark; watch; ask occupant; remove/alter; report; ignore
- outcomes: bounded surveillance clue; mark removed; watcher follow-up may become separately eligible; practical/non-hostile explanation where authored; unresolved
- material reward: **none**
- recurrence: finite once per exact selected occurrence; no universal mastermind attribution

### KOH-X14 — Arc-1 Records Tampering

- `opportunityId`: `fire_arc1_pressure_records_tampering`
- pool: Arc-1 pressure
- host: `KON-P01` administrative/archive context
- geometry: v3 / `KON-P01`
- category: `INVESTIGATION`
- eligibility: `ARC1_ACTIVE_AFTER_M1` + exact current record set contains authored removal/alteration evidence
- actions: inspect binding/entry; compare duplicate record; question custodian; preserve tamper state; report
- outcomes: tampering established; innocent administrative cause established; access window bounded; unresolved
- material reward: **none**
- value: Knowledge/history; evidence handling may be consumed by exact contextual Skills
- recurrence: finite occurrence; new later tampering requires new causal occurrence

### KOH-X15 — Arc-1 Rooftop Observer

- `opportunityId`: `fire_arc1_pressure_rooftop_observer`
- pool: Arc-1 pressure
- host: `KON-P09` / current exact protected route host
- geometry: v3 / selected host
- category: `INVESTIGATION`
- eligibility: `ARC1_ACTIVE_AFTER_M1` + exact observer-visible repeated elevated surveillance fact
- actions: approach; flank if route exists; pretend not to notice; observe attention target; report; leave
- outcomes: observer lost; bounded contact/description; innocent explanation; follow-up enabled; unresolved
- material reward: **none**
- Battle: none by this manifest
- recurrence: finite exact occurrence

### KOH-X16 — Arc-1 False Patrol at the Gate

- `opportunityId`: `fire_arc1_pressure_false_patrol`
- pool: Arc-1 pressure
- host: `KON-P10`
- geometry: v3 / `KON-P10`
- category: `INVESTIGATION`
- eligibility: `ARC1_ACTIVE_AFTER_M1` + exact occurrence presents patrol claim with authored observable inconsistencies
- actions: accept explanation; verify credentials through available channel; ask route-specific question; discreetly observe/follow if route exists; challenge; report/leave
- outcomes: legitimate patrol confirmed; impersonation established; unresolved suspicion; group withdraws
- material reward: **none**
- Battle: none by this manifest; any confrontation package requires separate exact authority
- recurrence: finite exact occurrence

### KOH-X17 — The Name on the Gate Ledger

- `opportunityId`: `konoha_resp_false_identity_gate_ledger`
- pool: `konoha_capability_responsive_pool_v1`
- mode: `single_path_responsive`
- host: `KON-P10`
- geometry: v3 / `KON-P10`
- category: `INVESTIGATION / CHARACTER_MATTER`
- eligibility: Konoha free play + `HAS_SKILL_ACCESS(skill_false_identity)` + `HAS_FALSE_PROFILE` + exact compatible gate/ledger recognition query exists
- absence rule: completely absent if False Identity prerequisite is absent
- actions: answer ordinarily; allow current legitimate false profile to participate where the Skill permits; decline/leave if ordinary rules permit; preserve contradiction
- outcomes: ledger records recognised profile; profile challenged; ordinary identity used; contradiction/history preserved
- material reward: **none**
- value: observer/history network + possible later history-generated follow-up
- boundary: no citizenship, Rank, clearance, ownership or permission is fabricated
- recurrence: finite once per exact ledger occurrence

### KOH-X18 — The Watcher Who Logged the Wrong Person

- `opportunityId`: `konoha_resp_false_identity_counterwatch`
- pool: responsive
- mode: `compound_path_synergy`
- host: `KON-P09` or `KON-O15` selected before commit
- geometry: v3 / committed host
- category: `INVESTIGATION`
- eligibility: `HAS_SKILL_ACCESS(skill_false_identity)` + `HAS_FALSE_PROFILE` + `HAS_SKILL_ACCESS(skill_counter_surveillance_habit)` + exact authored surveillance indicators
- absence rule: absent unless both route families are legitimate
- actions: observe tail; preserve alias; misdirect only through exact legal route; confront; report; leave
- outcomes: watcher records false profile; watcher description/route bounded; contradictory observer histories preserved; contact/follow-up may become eligible
- material reward: **none**
- Battle: none by this manifest
- recurrence: finite exact occurrence

### KOH-X19 — A Name Written Into the Ward

- `opportunityId`: `konoha_resp_false_identity_fuin_ward`
- pool: responsive
- mode: `compound_path_synergy`
- host: `KON-P05`
- geometry: v3 / `KON-P05`
- category: `INVESTIGATION / DISCOVERY`
- eligibility: Fūin Workshop known/access-authorised + `HAS_SKILL_ACCESS(skill_false_identity)` + `HAS_FALSE_PROFILE` + `HAS_SKILL_ACCESS(skill_seal_pattern_literacy)` + exact accessible ward/profile record layer authored for the occurrence
- actions: inspect ward; allow compatible profile query; compare bounded seal structure; leave unchanged; report discrepancy
- outcomes: recognised-profile/ward mismatch bounded; stable-looking match; profile challenged; provenance clue produced where supported
- material reward: **none**
- boundary: no full decoding, bypass, Technique grant or authority fabrication
- recurrence: finite exact occurrence

### KOH-X20 — The Patient Who Should Be Recovering

- `opportunityId`: `konoha_resp_medical_poison_recovery`
- pool: responsive
- mode: `compound_path_synergy`
- host: `KON-P03`
- geometry: v3 / `KON-P03`
- category: `INVESTIGATION / MEDICAL_CONTEXT`
- eligibility: Hospital access + `HAS_SKILL_ACCESS(skill_medical_triage_instinct)` + `HAS_SKILL_ACCESS(skill_poison_symptom_recognition)` + occurrence contains exact compatible observable patient state
- actions: assess; recognise possible poisoning where evidence supports; preserve/report sample state if available; call appropriate medical authority; decline further involvement
- outcomes: possible-poison evidence bounded; ordinary complication established; evidence preserved; authority notified
- material reward: **none**
- development: exact capability participation may be recorded; no World-authored medical EXP
- recurrence: finite exact occurrence

### KOH-X21 — Three Trails, One Body

- `opportunityId`: `konoha_resp_tracking_evidence_three_trails`
- pool: responsive
- mode: `compound_path_synergy`
- host: `KON-O15` by default; may use another exact authorised field host before occurrence commit
- geometry: v3 / committed host
- category: `INVESTIGATION`
- eligibility: `HAS_SKILL_ACCESS(skill_scent_pursuit)` + `HAS_SKILL_ACCESS(skill_evidence_thread_reconstruction)` + `HAS_EXACT_EVIDENCE_COUNT(2..3)` + exact track/scent/evidence context exists
- actions: pursue exact scent; compare committed evidence refs; reconstruct bounded sequence; report; stop pursuit
- outcomes: multiple movers supported; one-route hypothesis supported; continuity breaks; uncertainty preserved
- material reward: **none**
- boundary: no culprit identity or exact destination is invented
- recurrence: finite exact occurrence

### KOH-X22 — Old Service Ward Handshake

- `opportunityId`: `konoha_resp_fuin_barrier_service_ward`
- pool: responsive
- mode: `compound_path_synergy`
- host: `KON-O20`
- geometry: v3 / `KON-O20`
- category: `INVESTIGATION / DISCOVERY`
- eligibility: O20 known/access-authorised + `HAS_SKILL_ACCESS(skill_seal_pattern_literacy)` + `HAS_SKILL_ACCESS(skill_barrier_recognition_intuition)` + exact observable non-Story service ward/handshake context exists
- actions: inspect pattern; observe recognition step; record bounded response; report; leave
- outcomes: recognition behaviour bounded; ordinary maintenance ward established; anomaly supported; insufficient evidence
- material reward: **none**
- boundary: must not leak Arc-1 Pump Four/lower-facility secrets by proximity; Story-owned access remains separate
- recurrence: finite exact occurrence

### KOH-X23 — Hyūga Peripheral Discrepancy

- `opportunityId`: `konoha_resp_byakugan_peripheral_discrepancy`
- pool: responsive
- mode: `single_path_responsive`
- host: `KON-O09`
- geometry: v3 / `KON-O09`
- category: `TRAINING_DEVELOPMENT / INVESTIGATION`
- eligibility: O09 known/access-authorised + `HAS_SKILL_ACCESS(skill_byakugan_peripheral_detail)` + an authorised active Byakugan observation context + exact peripheral evidence authored in the occurrence
- actions: perform authorised observation; report bounded peripheral detail; compare with ordinary view; end observation
- outcomes: extra legitimate detail recorded; no discrepancy; uncertainty preserved
- material reward: **none**
- boundary: no omniscience, wall truth or medical diagnosis
- recurrence: finite exact occurrence

### KOH-X24 — Eastern Drainage Trace

- `opportunityId`: `konoha_alpha_eastern_drainage_trace`
- pool: baseline/discovery
- host: `KON-O16`
- geometry: v3 / `KON-O16`, with potential known-unknown projection at `KON-S02`
- category: `DISCOVERY / INVESTIGATION`
- eligibility: Konoha free play + O16 known/access-authorised + exact occurrence contains bounded unusual drainage/chemical/maintenance evidence
- actions: inspect trace; preserve/report; follow only currently accessible public maintenance route; leave
- factual outcomes: ordinary maintenance cause established; unexplained trace preserved; exact clue may commit `konoha_s02_suspicion_trace` where occurrence truth supports it
- known-unknown consequence: if and only if `konoha_s02_suspicion_trace` commits, `KNOWN_UNKNOWN_ALLOWED(KON-S02)` becomes true and the map may project **golden pulsing `????`** at `KON-S02`
- canonical identity boundary: this event must **not** reveal the name `Orochimaru's Forgotten Laboratory`; identity remains hidden until a later legitimate discovery contract closes it
- material reward: **none**
- access boundary: this manifest does not make `KON-S02` enterable or accessible
- recurrence: clue occurrence finite once; ordinary O16 maintenance events may recur separately

---

## 26. Fire semantic-ready content — explicitly not executable geometry yet

The following Fire content remains durable and may be activated immediately after #55 lands the selected final Fire master and World publishes its final calibration:

- the 22 `fire_standing_*` Wave-1 families in `Land of Fire Interactive Event Ecology Alpha Contract.md`;
- the 12 `fire_arc1_pressure_*` definitions;
- the ordinary side templates and finite Fire discoveries;
- `fire:O21` Whisper Woods and `fire:R13` Whisper Woods Approach.

Until that calibration lands:

`executableGeometry = false`

for regional Fire markers/selection under this manifest.

Do not bind these families to legacy Fire coordinates by convenience.

---

# PART E — PERSISTENCE / IMPLEMENTATION ACCEPTANCE

## 27. Occurrence identity

Coding owns exact occurrence instance generation/persistence.

Once selected/committed:

- host does not reroll on save/load;
- family does not reroll;
- participants/objects do not silently swap;
- peaceful setup does not transform into Battle;
- evidence does not change after observation because the map was reopened;
- material entitlement grants at most once.

## 28. Discovery and feed idempotence

A discovery/Knowledge/history commit may create one Record/feed receipt. Refresh may re-render it but must not recommit it.

Known-unknown -> identified is a semantic transition, not an animation reroll.

## 29. No automatic Battle

None of the 24 Konoha executable rows above requires a new Battle package.

If later World authoring attaches a Battle branch, exact Combat/Registry authority must be supplied before that branch becomes executable.

This choice is deliberate: Wave 1 gives Coding a substantial real free-play population without making the activation manifest depend on unclosed opposition packages.

## 30. No hidden reward table

The exact material reward authority in this version is only the listed Ryō entitlements.

Future Items/Weapons/Equipment/Summon/special-representation rewards may be added through later manifest revisions after owner-approved IDs are bound.

## 31. Coding acceptance target

Coding can consume this package in four independently testable tranches:

1. `sc.worldInfoProjection.v1`;
2. marker/base/overlay grammar;
3. `sc.worldStoryLocator.v1` + Arc-1 locator registry + current Arc-2 authoring-checkpoint suppression;
4. `sc_world_alpha_activation_konoha_v1_2026_09_11` 24-row Konoha activation manifest.

Required proof before GREEN:

- hidden Konoha secrets never leak into counters/DOM/hover;
- `????` only appears after exact known-unknown evidence;
- Main Story overlay is visually distinct from `????` halo;
- 12/12 -> 12/13 -> 13/13 Knowledge-relative progress works without revealing hidden totals;
- source-loss / resurfacing uses new causal occurrence rather than silent lead regeneration;
- map open/close/save/load does not reroll active opportunities;
- one-shot Ryō entitlements do not duplicate;
- capability-responsive candidates are absent when prerequisites are absent;
- multi-capability Characters can qualify for union/compound candidates;
- Story locator focuses only legitimate host context and never teleports/fabricates access;
- `authoring_checkpoint` produces no runtime Story marker.

## 32. Status

**Village / Region Info semantics:** CLOSED by this document.  
**Marker / halo grammar:** CLOSED by this document.  
**Arc-1 World locator mapping:** CLOSED by this document.  
**Current Arc-2 locator:** intentionally withheld while Writing state remains `authoring_checkpoint`.  
**Konoha executable World-content Wave 1:** CLOSED — 24 candidates.  
**Fire executable geometry:** WAITING ON #55 final selected binary + final calibration.  
**Runtime implementation / browser validation:** downstream Coding responsibility.  
**500-reservoir remainder:** remains authored/reserve policy; not an Alpha blocker and not implied executable by this package.
