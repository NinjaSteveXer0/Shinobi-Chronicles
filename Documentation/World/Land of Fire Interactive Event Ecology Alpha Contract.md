# Shinobi Chronicles — Land of Fire Interactive Event Ecology Alpha Contract

**Date:** 2026-09-09  
**Owner:** World / Missions / Events / Rewards  
**Status:** WORLD CONTENT AUTHORITY — ALPHA STANDING EVENT ECOLOGY WAVE 1 CLOSED; CURRENT-MASTER GEOMETRY PENDING UI / ASSETS ISSUE #39

---

## 1. Purpose

This contract defines the **Land of Fire standing interactive-map content ecology** for Shinobi Chronicles Alpha.

Its purpose is to ensure the Land of Fire remains a meaningful free-play surface between Story beats rather than becoming a one-use quest board that empties and forces Story continuation.

The player should be able to decide:

> I am not advancing Story yet. I am going to see what is happening in Fire Country.

…and find legitimate gameplay.

This contract therefore closes the semantic/event side of:

- standing route activity;
- ordinary settlement/civilian activity;
- investigation and discovery opportunities;
- field/training opportunities;
- contextual threats;
- regional travel incidents;
- optional-location discovery;
- concealed/event-driven reservation use;
- free-play replenishment and anti-reroll rules;
- coexistence between ordinary free-play, Story, Arc-sensitive pressure and secrets.

It does **not** author a second regional-map engine.

Current runtime authority already provides the regional map, hotspot projection, shared World Event opportunity registry, contextual interaction routing, Encounter construction, Story caller/return and same-hotspot return behaviour. This contract is content for those systems.

Preserve:

> location ≠ hotspot ≠ event ≠ opportunity

> stable geography ≠ fixed opportunity population

> route ≠ content owner

> Story Mission ≠ standing free-play pool

> standing free-play ≠ Arc-specific pressure pool

> map presentation ≠ Knowledge authority

> Battle availability ≠ mandatory Battle

> event completion ≠ progression automatically

---

## 2. Current source / geometry boundary

Current production repository asset:

`Backgrounds/inside_LOF.png`

Current audited blob at contract authoring:

`b1300c48e786981f610f7a46c82d92c245da2d1c`

Durable map provenance authority:

`Documentation/Maps/Regional Map Source Binding Ledger.md`

The ledger establishes that:

- legacy Land of Fire calibration geometry was authored against `inside_LOF(9).PNG`, 1536×1024;
- the later workspace master is **Fire (10)**;
- Fire (10) requires coordinate revalidation;
- old pixel coordinates / percentages cannot be silently transferred to the later master.

Therefore this contract adopts the **stable semantic authoring identities and host roles** from the earlier Land of Fire specification, but **does not author current-master x/y coordinates**.

Current-master geometry is:

**WAITING ON UI / ASSETS — GitHub issue #39**

`[HANDOFF][TO: UI-ASSETS][SEND NOW] Revalidate Land of Fire Fire (10) regional hotspot geometry`

This blocks only exact hotspot placement against the current artwork.

It does **not** block the event ecology in this document.

---

## 3. Regional hosting-address rule

The country-scoped forms below are stable **regional authoring/hosting addresses**:

- `fire:P##` — public/major destination
- `fire:SV##` — specialist-service presentation anchor
- `fire:O##` — optional destination
- `fire:S##` — concealed / secret / event-driven reservation
- `fire:R##` — travel corridor
- `fire:Z##` — broad regional territory

These addresses identify where World content is allowed to occur.

They are **not permission to duplicate an existing runtime location**.

Where current `worldRegions.fire` already contains the corresponding real location, Coding must bind the regional hosting address to that existing location identity rather than creating a second place solely to satisfy this document.

Preserve:

> regional hosting address ≠ automatic new runtime location

> same display name ≠ proven same place

A specific example is the current live `bandit_hideout` location/opportunity versus legacy `fire:S10` Bandit King's Hollow. They must **not** be merged by name similarity. This contract leaves `fire:S10` dormant for Alpha Wave 1.

---

## 4. Alpha visible geography / marker density

### 4.1 Public Alpha host set

The following public destination addresses are approved as Wave-1 regional hosts:

| Address | Authoring identity | Alpha role |
|---|---|---|
| `fire:P01` | Konohagakure | primary home / Konoha regional entry |
| `fire:P02` | Fire Capital | major civilian / administrative / logistics host |
| `fire:P03` | Fire Temple | pilgrim / route / cultural host |
| `fire:P04` | Tanzaku Quarters | commercial / traveller / ordinary incident host |
| `fire:P05` | Emberfall Harbour | coast / cargo / repair / maritime host |
| `fire:P06` | Southern Border Fortress | border / caravan / patrol host |
| `fire:P07` | Western Training Plateau | field training / tracking / reconnaissance host |
| `fire:P08` | Naka River Crossing | river / crossing / travel host |
| `fire:P10` | Verdant Falls Basin | waterfall / traveller / field host |
| `fire:P11` | Eastern Pilgrim Road | pilgrimage / road / route host |
| `fire:P12` | Beacon Lake Watchtower | observation / patrol / signal host |

`fire:P09` Firewatch Caldera remains legitimate stable geography but is **not required for Wave-1 standing population**. It may be activated later without changing this ecology.

### 4.2 Service hosts

The following existing service-host reservations may surface their ordinary service actions independently from World events:

- `fire:SV01` Konoha Hospital
- `fire:SV02` Tenten's Forge and Equipment Workshop
- `fire:SV03` Konoha Fūinjutsu Guidance and Service, only when publicly available
- `fire:SV04` Fire Capital Hospital
- `fire:SV05` Emberfall Maritime Repair Yard
- `fire:SV06` Southern Border Caravan Workshop

A service is not consumed because a World event uses its host.

A World event may create a reason to visit a service but does not own the persistent domain the service changes.

### 4.3 Default projection density

Normal regional presentation should target:

- approximately **9–14 known destination markers**;
- **0–3 authorised anomaly/suspicion treatments**;
- **0–3 temporary event treatments**;
- approximately **4–7 currently actionable non-Story opportunities** distributed across the region when enough legitimate candidates exist.

The 4–7 target is a **content-density goal**, not permission to fabricate eligibility.

If only three semantic candidates are legitimately eligible, show three.

Do not manufacture a seventh incident merely to fill the UI.

Service anchors may collapse into their host at distant/default presentation and do not need to consume separate marker budget.

---

## 5. Standing activity layers

Land of Fire free play has five separate layers.

### Layer A — persistent destinations / services

Stable geography and ordinary destination/service actions.

Examples:

- travel to Fire Capital;
- enter Konoha;
- use an available hospital/workshop/service;
- visit an already-discovered optional settlement.

These are not event occurrences merely because the player clicks them.

### Layer B — standing free-play occurrences

Ordinary Chronicle events selected from the Wave-1 families in this contract.

They are not main Story content.

They are designed to be reusable as **new occurrences**, not replayed copies of one historical event.

### Layer C — finite optional/discovery occurrences

One-shot or bounded opportunities that reveal a location, establish Knowledge, resolve a specific local situation, or create lasting history.

### Layer D — Arc / Story-sensitive overlays

Optional contextual pressure arising from exact Story/world history.

This contract does **not** infer those events merely from Mission number. An Arc overlay requires exact committed eligibility supplied by Story/World authority.

### Layer E — mandatory Story opportunities

Story opportunities coexist with all layers above but remain separately identified and separately resolved.

Preserve:

> Story opportunity priority in presentation ≠ Story owns the location

---

## 6. Standing opportunity snapshot / replenishment contract

### 6.1 Goal

The Land of Fire should not empty after several side events.

The regional standing pool therefore maintains a persisted set of **selected occurrence instances**, not a freshly rerolled menu every time the map is opened.

Stable pool ID:

`fire_alpha_standing_pool_v1`

### 6.2 Target active population

Where enough legitimate candidates exist:

- target active standing occurrences: **5**;
- preferred minimum: **4**;
- soft maximum: **7**;
- distribute across at least **3 distinct host addresses** where possible;
- no more than **2 unresolved standing occurrences at one host**;
- do not allow one family to occupy more than two active slots simultaneously.

These rules exist to create variety, not to override factual eligibility.

### 6.3 Refill boundaries

A vacant standing slot may be filled only at a legitimate World refresh boundary, including:

1. first creation of the Land-of-Fire standing snapshot after the player becomes eligible for ordinary regional free play;
2. factual resolution of an active standing occurrence;
3. factual expiry/suppression of an occurrence whose authored conditions are no longer true;
4. a committed Story/world-state change that changes semantic eligibility and causes the pool to be re-evaluated.

The following are **not** refill/reroll boundaries:

- closing and reopening the regional map;
- hovering a different hotspot;
- loading the same save;
- leaving a drawer and reopening it;
- Battle return to the same unresolved occurrence.

### 6.4 Selection rule

Selection order is:

**semantic eligibility**

→ **observer/discovery legality**

→ **host capacity / diversity rule**

→ **recent-repeat suppression**

→ **random selection among the remaining equally legitimate candidates where variation is desired**

→ **commit selected occurrence instance**.

Randomness may select among eligible possibilities.

Randomness must never manufacture eligibility.

### 6.5 Persistence

Once a family/host candidate has been selected into an active slot, its exact occurrence identity and factual setup persist until resolved/suppressed/expired.

Save/load must not:

- change its host;
- swap its participants;
- replace its family;
- transform a peaceful occurrence into a Battle;
- transform a reported clue into a different clue;
- reroll a hidden discovery;
- duplicate an already-resolved occurrence.

---

## 7. Recurrence and anti-grind rules

### 7.1 Stable family ≠ stable occurrence

Example:

`fire_standing_broken_wagon`

is a reusable family.

Each selected wagon incident is a new Chronicle occurrence with a new occurrence ID and occurrence-local participants/object refs.

Resolving one wagon does not mean that same wagon eternally respawns.

### 7.2 No immediate same-host repetition

After a repeatable family resolves at a host, that same `family + host` pair is ineligible for the **next refill at that same host**.

It may become eligible again after:

- a different standing occurrence has resolved at that host; or
- a committed world/Story change materially changes the host context.

No wall-clock timer is required by this content contract.

### 7.3 Participant reuse

Minor/faceless participants are occurrence-local unless another authority has already established them as persistent people.

A repeatable family must not silently recycle the same historical civilian/shinobi participant merely because the display role is the same.

### 7.4 Outcomes matter

A previous occurrence may alter later eligibility.

Examples:

- an exact bandit participant who was detained cannot be regenerated as the same historical person;
- a discovered optional village remains discovered;
- a repaired route incident does not remain visually broken after resolution;
- an unresolved report may support a later investigation if explicitly authored;
- a player who ignored one occurrence does not automatically gain Knowledge of its off-screen result.

---

## 8. Minor/faceless participant grammar

Standing occurrences may freely use role-level participants such as:

- Courier
- Caravan Driver
- Traveller
- Merchant
- Stable Worker
- Patrol Shinobi
- Border Clerk
- Pilgrim
- Dock Worker
- Craft Worker
- Farmer
- Waystation Keeper

These do not require collectible cards or permanent Registry admission.

When their statement or action matters historically, give the occurrence-local participant a stable source ref within that occurrence.

Their testimony records:

> this source reported X

not:

> X is automatically World Truth.

Preserve:

> testimony ≠ direct observation

> source statement ≠ omniscient truth

> faceless source addressability ≠ collectible identity

---

# 9. WAVE-1 STANDING EVENT FAMILIES

The following families form the Alpha Wave-1 reusable free-play pool.

These families are content definitions. A family becomes an occurrence only after selection/commit.

Unless a row explicitly says otherwise:

- source kind = `standing_world`;
- random-pool eligible = yes after semantic filtering;
- recurrence = `repeatable_new_occurrence`;
- no automatic Battle;
- no automatic material reward;
- actions produce only their factual authored result;
- generated contextual dialogue may vary while committed facts remain bounded.

---

## FIRE-ST-01 — Delayed Courier

**familyId:** `fire_standing_delayed_courier`

**Eligible host addresses:**

`fire:R01`, `fire:R02`, `fire:R05`, `fire:R07`, `fire:R10`, `fire:R11`, `fire:O05`

**Category:** INVESTIGATION / SIDE_OCCURRENCE

**Base eligibility:**

- ordinary Land-of-Fire free play available;
- route/host legitimately accessible;
- no same-host immediate-repeat suppression;
- no authored current-world fact already making the chosen route unusable for ordinary courier travel.

**Observer presentation:**

Route treatment such as **Delayed Courier**, **Stopped Messenger**, or equivalent bounded contextual label.

Do not project package contents or cause of delay before discovery.

**Legal actions:**

- `ask_what_happened`
- `inspect_delay_context`
- `assist_courier`
- `report_delay`
- `continue_travel`

**Possible factual outcomes:**

- courier resumes route;
- courier remains delayed but issue is reported;
- player acquires source-bounded information about the delay;
- a separately authored physical clue becomes known;
- player declines involvement.

Delay cause is occurrence-authored and must not default to hostile action.

---

## FIRE-ST-02 — Broken Wagon

**familyId:** `fire_standing_broken_wagon`

**Hosts:**

`fire:R01`, `fire:R05`, `fire:R07`, `fire:R11`, `fire:P06`, `fire:O09`, `fire:O10`

**Category:** SIDE_OCCURRENCE

**Legal actions:**

- `inspect_wagon`
- `help_repair_or_move`
- `guard_while_repairing`
- `seek_workshop_help`
- `continue_travel`

**Resolvers:**

World for assistance/outcome; specialist service only if routed to an actual workshop; Battle only if a separate threat occurrence becomes causally actionable.

**Possible outputs:**

- wagon movable/repaired enough to continue;
- cargo/passengers protected while help is sought;
- workshop/service destination becomes known where legitimately referenced;
- assistance declined.

No universal repair Skill check is invented here.

---

## FIRE-ST-03 — Injured Traveller

**familyId:** `fire_standing_injured_traveller`

**Hosts:**

`fire:R02`, `fire:R03`, `fire:R04`, `fire:R09`, `fire:P03`, `fire:P10`, `fire:P11`, `fire:O08`

**Category:** SIDE_OCCURRENCE

**Legal actions:**

- `check_condition`
- `ask_what_happened`
- `escort_to_safety`
- `seek_medical_help`
- `report_location`
- `leave`

**Boundary:**

World may establish factual aid/transport/reporting.

World does not invent medical competence, heal injuries automatically, or award medical development.

The traveller's explanation is testimony, not automatic truth.

---

## FIRE-ST-04 — Missing Pack Animal

**familyId:** `fire_standing_missing_pack_animal`

**Hosts:**

`fire:R01`, `fire:R05`, `fire:R07`, `fire:R11`, `fire:O01`, `fire:O02`, `fire:O10`

**Category:** INVESTIGATION / SIDE_OCCURRENCE

**Legal actions:**

- `inspect_tracks`
- `ask_owner`
- `track_animal`
- `search_nearby`
- `decline`

**Possible outputs:**

- animal located and returned;
- direction narrowed but animal not recovered;
- another destination/route becomes known through legitimate tracking;
- search abandoned.

This is useful low-stakes tracking play and must not automatically turn into a monster attack.

---

## FIRE-ST-05 — Suspicious Road Watcher

**familyId:** `fire_standing_suspicious_watcher`

**Hosts:**

`fire:R01`, `fire:R02`, `fire:R05`, `fire:R09`, `fire:R10`, `fire:P12`, `fire:O15`

**Category:** INVESTIGATION

**Legal actions:**

- `observe_watcher`
- `change_route_and_observe`
- `approach`
- `report_suspicion`
- `ignore`

**Knowledge rule:**

The initial fact is only that someone appears to be watching traffic / lingering in a context that invites investigation.

Do not label them spy, missing-nin, foreign operative, criminal, hostile or faction-aligned without evidence.

**Battle:**

None by default.

A later confrontation requires a separately authorised participant/opposition state.

---

## FIRE-ST-06 — Roadside Extortion

**familyId:** `fire_standing_roadside_extortion`

**Hosts:**

`fire:R05`, `fire:R07`, `fire:R11`, `fire:O01`, `fire:O02`, `fire:O09`

**Category:** SIDE_OCCURRENCE / possible BATTLE

**Eligibility:**

Requires an authored occurrence setup in which actual criminals are presently demanding property/payment or coercing travellers.

**Legal actions:**

- `observe_first`
- `intervene`
- `help_civilians_withdraw`
- `report_threat`
- `avoid_area`

**Combat boundary:**

Intervention does not itself invent a Battle package.

Where the selected occurrence explicitly binds an existing legal encounter package, the Battle action may become available.

No player-relative scaling.

No generic `criminal => Fight` inference.

Current existing calibrated opposition may be consumed only through exact encounter authority; this contract does not mint new PL packages.

---

## FIRE-ST-07 — Abandoned Camp

**familyId:** `fire_standing_abandoned_camp`

**Hosts:**

`fire:R03`, `fire:R04`, `fire:R08`, `fire:R09`, and `fire:R12` only after R12 is legitimately discovered.

**Category:** DISCOVERY / INVESTIGATION

**Legal actions:**

- `inspect_camp`
- `inspect_tracks`
- `inspect_objects`
- `record_findings`
- `leave`

**Outputs:**

Directly observed physical facts only.

An abandoned camp is not automatically:

- hostile;
- criminal;
- a missing-nin camp;
- loot;
- evidence of a conspiracy.

Any material entitlement requires separate authored provenance.

---

## FIRE-ST-08 — Missing Patrol Trace

**familyId:** `fire_standing_missing_patrol_trace`

**Hosts:**

`fire:R05`, `fire:R08`, `fire:P06`, `fire:P12`, `fire:O15`, and `fire:R12` only if that route is already known.

**Category:** INVESTIGATION / SIDE_OCCURRENCE

**Base eligibility:**

Requires an exact occurrence source establishing that a patrol/check-in is actually overdue or a known route marker is missing.

**Legal actions:**

- `inspect_last_known_point`
- `follow_trace`
- `report_missing_check_in`
- `return_for_support`
- `leave`

**Possible outputs:**

- patrol located;
- signs found but participant outcome remains unknown;
- a hidden/discovery predicate is legitimately established;
- no useful trace found;
- player withdraws.

Missing does not mean dead.

---

## FIRE-ST-09 — Flooded Crossing

**familyId:** `fire_standing_flooded_crossing`

**Hosts:**

`fire:R10`, `fire:R04`, `fire:P08`, `fire:P10`, `fire:O16`

**Category:** SIDE_OCCURRENCE / OTHER

**Eligibility:**

Requires occurrence-local environmental state establishing current high water / blocked passage.

This does not create a universal weather simulation.

**Legal actions:**

- `inspect_crossing`
- `help_stranded_travellers`
- `find_safe_passage`
- `turn_back`
- `report_condition`

**Outputs:**

- local crossing resolved for the occurrence;
- safe path found for participants;
- route condition reported;
- player turns back.

Do not automatically mutate a stable route into globally closed state.

---

## FIRE-ST-10 — Missing Medicine Delivery

**familyId:** `fire_standing_missing_medicine`

**Hosts:**

`fire:O01`, `fire:O02`, `fire:O10`, `fire:P06`, with legitimate source/target references to `fire:O03` Foxglove Medicine House or a public medical service when authored.

**Category:** INVESTIGATION / SIDE_OCCURRENCE

**Legal actions:**

- `ask_about_delivery`
- `trace_delivery_route`
- `search_for_package_or_courier`
- `report_problem`
- `decline`

**Discovery:**

A legitimate participant statement identifying Foxglove Medicine House may commit:

`fire_discovery_foxglove_medicine_house`

This reveals the location as known; it does not solve the delivery problem.

**Loot:**

Medicine belonging to the delivery is mission/property custody, not automatic player Item ownership.

---

## FIRE-ST-11 — Local Theft Report

**familyId:** `fire_standing_local_theft`

**Hosts:**

`fire:P04`, `fire:O01`, `fire:O02`, `fire:O09`, `fire:O10`

**Category:** INVESTIGATION / SIDE_OCCURRENCE

**Legal actions:**

- `hear_report`
- `inspect_scene`
- `ask_witnesses`
- `follow_evidence`
- `report_findings`
- `decline`

**Knowledge rule:**

Accusation ≠ guilt.

Witness confidence ≠ truth.

Finding the missing property ≠ proving who took it unless evidence supports that conclusion.

**Battle:**

None by default.

---

## FIRE-ST-12 — Fire / Structural Accident

**familyId:** `fire_standing_fire_accident`

**Hosts:**

`fire:P04`, `fire:O01`, `fire:O04`, `fire:O10`

**Category:** SIDE_OCCURRENCE / RESCUE

**Eligibility:**

Requires an exact local accident occurrence such as a shed fire, kiln problem, falling timber, or damaged work structure.

No universal fire simulation is created.

**Legal actions:**

- `help_people_clear_area`
- `assist_with_safe_response`
- `seek_specialist_help`
- `protect_property_or_route`
- `leave`

**Boundary:**

No automatic Ninjutsu solution and no direct Development reward.

If a participant actually uses a qualifying Technique/action, record the factual action and let the correct owner interpret it.

---

## FIRE-ST-13 — Workshop Material Shortage

**familyId:** `fire_standing_workshop_shortage`

**Hosts:**

`fire:P05`, `fire:P06`, `fire:O10`, with service contexts `fire:SV05` and `fire:SV06` where applicable.

**Category:** SIDE_OCCURRENCE

**Legal actions:**

- `ask_what_is_missing`
- `help_locate_shipment`
- `escort_materials`
- `report_supply_problem`
- `decline`

**Boundary:**

World owns the occurrence and custody/logistics facts.

Workshop inventory/equipment construction remains with the appropriate Item/Equipment authority.

No free equipment is implied by successful assistance.

---

## FIRE-ST-14 — Tracking Drill

**familyId:** `fire_standing_tracking_drill`

**Hosts:**

`fire:P07`, `fire:O15`, `fire:R03`

**Category:** TRAINING_DEVELOPMENT

**Eligibility:**

Requires a currently available training/instructor or assessment occurrence.

**Legal actions:**

- `accept_tracking_drill`
- `inspect_starting_sign`
- `follow_evidence`
- `end_drill`
- `decline`

**Result:**

World records exact participation, actions and outcome.

Progression/Development decides whether those facts qualify for persistent development.

No generic EXP, PL or Stat increase is authored here.

---

## FIRE-ST-15 — Reconnaissance Observation Exercise

**familyId:** `fire_standing_recon_observation`

**Hosts:**

`fire:P07`, `fire:P12`, `fire:O17`

**Category:** TRAINING_DEVELOPMENT / INVESTIGATION

**Legal actions:**

- `accept_observation_task`
- `observe_target_area`
- `record_details`
- `report_observations`
- `decline`

**Outputs:**

- observation history;
- source-bounded report;
- possible legitimate discovery clue where the authored occurrence contains one.

Do not convert observation into omniscient identification.

---

## FIRE-ST-16 — Lost Pilgrim

**familyId:** `fire_standing_lost_pilgrim`

**Hosts:**

`fire:P03`, `fire:P11`, `fire:O07`, `fire:R02`, `fire:R09`

**Category:** SIDE_OCCURRENCE

**Legal actions:**

- `ask_destination`
- `help_reorient`
- `escort`
- `seek_local_guidance`
- `decline`

**Possible outputs:**

- pilgrim reaches a safe/known route;
- player provides reliable directions;
- a local optional destination becomes legitimately known through testimony;
- assistance declined.

No morality score.

---

## FIRE-ST-17 — Harbour Cargo Trouble

**familyId:** `fire_standing_harbour_cargo`

**Hosts:**

`fire:P05`, `fire:O18`, `fire:R06`

**Category:** SIDE_OCCURRENCE / INVESTIGATION

**Legal actions:**

- `ask_dock_workers`
- `inspect_cargo_problem`
- `help_secure_or_locate_cargo`
- `report_irregularity`
- `decline`

**Boundary:**

Cargo custody ≠ player Item ownership.

Missing cargo ≠ smuggling automatically.

A separate smuggling occurrence may later become eligible only from actual evidence.

---

## FIRE-ST-18 — Border Caravan Check

**familyId:** `fire_standing_border_caravan_check`

**Hosts:**

`fire:P06`, `fire:O09`, `fire:R05`

**Category:** INVESTIGATION / SIDE_OCCURRENCE

**Eligibility:**

Requires an occurrence in which a caravan/checkpoint interaction actually needs shinobi assistance, verification, escort or follow-up.

**Legal actions:**

- `hear_checkpoint_problem`
- `inspect_caravan_or_route_context`
- `speak_to_driver_or_clerk`
- `escort_or_follow_up`
- `report_findings`
- `decline`

**Knowledge rule:**

Foreign origin, unusual cargo, nervous behaviour or paperwork inconsistency do not individually prove hostile intent.

---

## FIRE-ST-19 — River Crossing Assistance

**familyId:** `fire_standing_river_assistance`

**Hosts:**

`fire:P08`, `fire:R10`, `fire:O16`

**Category:** RESCUE / SIDE_OCCURRENCE

**Legal actions:**

- `assess_problem`
- `help_people_or_goods_cross`
- `secure_route`
- `seek_local_help`
- `decline`

This provides non-Combat river gameplay without creating a swimming/boat subsystem.

---

## FIRE-ST-20 — Lost Equipment / Field Kit

**familyId:** `fire_standing_lost_field_kit`

**Hosts:**

`fire:P07`, `fire:O15`, `fire:R03`, `fire:P12`

**Category:** INVESTIGATION / TRAINING_DEVELOPMENT

**Legal actions:**

- `inspect_last_known_area`
- `track_owner_route`
- `recover_kit`
- `return_kit`
- `report_location`

Recovered institutional/personal kit remains its owner's property unless another authority explicitly grants it.

---

## FIRE-ST-21 — Small Delivery Assistance

**familyId:** `fire_standing_delivery_assistance`

**Hosts:**

`fire:P04`, `fire:O01`, `fire:O02`, `fire:O10`, `fire:R07`, `fire:R11`

**Category:** SIDE_OCCURRENCE

**Legal actions:**

- `accept_delivery_help`
- `verify_destination`
- `carry_or_escort_delivery`
- `return_to_sender`
- `decline`

This is ordinary Fire Country life and should remain available even when Arc 1 is tense.

---

## FIRE-ST-22 — Pilgrim Route Upkeep

**familyId:** `fire_standing_pilgrim_route_upkeep`

**Hosts:**

`fire:P03`, `fire:P11`, `fire:O07`, `fire:R02`, `fire:R09`

**Category:** SIDE_OCCURRENCE

**Legal actions:**

- `inspect_route_problem`
- `help_clear_or_mark_route`
- `warn_travellers`
- `report_problem`
- `decline`

No doctrine/religious alignment is inferred from helping maintain safe passage.

---

# 10. Wave-1 host-family matrix

The matrix below is authoring permission, not guaranteed simultaneous population.

| Host | Primary Wave-1 family candidates |
|---|---|
| `fire:P01` | regional entry; Story/Konoha access; no need to flood with standing incidents |
| `fire:P02` | delivery/logistics follow-ups; public services; future ordinary urban events |
| `fire:P03` | injured traveller, lost pilgrim, pilgrim route upkeep |
| `fire:P04` | local theft, fire/structural accident, delivery assistance |
| `fire:P05` | workshop shortage, harbour cargo trouble |
| `fire:P06` | broken wagon, missing patrol trace, missing medicine, workshop shortage, border caravan check |
| `fire:P07` | tracking drill, recon observation, lost field kit |
| `fire:P08` | flooded crossing, river assistance |
| `fire:P10` | injured traveller, flooded crossing |
| `fire:P11` | injured traveller, lost pilgrim, pilgrim route upkeep |
| `fire:P12` | suspicious watcher, missing patrol trace, recon observation, lost field kit |
| `fire:O01` | missing pack animal, roadside extortion, missing medicine, local theft, fire accident, delivery help |
| `fire:O02` | missing pack animal, roadside extortion, missing medicine, local theft, delivery help |
| `fire:O03` | medicine source/service-related contextual opportunities after discovery |
| `fire:O04` | fire/structural accident after discovery |
| `fire:O05` | delayed courier after discovery |
| `fire:O07` | lost pilgrim, pilgrim upkeep after discovery |
| `fire:O08` | injured traveller after discovery |
| `fire:O09` | broken wagon, roadside extortion, local theft, border caravan check after discovery |
| `fire:O10` | broken wagon, missing pack animal, missing medicine, local theft, fire accident, workshop shortage, delivery help after discovery |
| `fire:O15` | suspicious watcher, missing patrol trace, tracking drill, lost field kit after discovery |
| `fire:O16` | flooded crossing, river assistance after discovery |
| `fire:O17` | recon observation after discovery |
| `fire:O18` | harbour cargo trouble after discovery |
| `fire:R01` | delayed courier, broken wagon, missing pack animal, suspicious watcher |
| `fire:R02` | delayed courier, injured traveller, suspicious watcher, lost pilgrim, pilgrim upkeep |
| `fire:R03` | injured traveller, abandoned camp, tracking drill, lost field kit |
| `fire:R04` | injured traveller, abandoned camp, flooded crossing |
| `fire:R05` | delayed courier, broken wagon, missing pack animal, suspicious watcher, extortion, missing patrol, border check |
| `fire:R06` | harbour cargo trouble |
| `fire:R07` | delayed courier, broken wagon, missing pack animal, extortion, abandoned camp, delivery help |
| `fire:R08` | abandoned camp, missing patrol trace |
| `fire:R09` | injured traveller, suspicious watcher, abandoned camp, lost pilgrim, pilgrim upkeep |
| `fire:R10` | delayed courier, suspicious watcher, flooded crossing, river assistance |
| `fire:R11` | delayed courier, broken wagon, missing pack animal, extortion, delivery help |
| `fire:R12` | abandoned camp / missing patrol only after the route itself is legitimately discovered |

---

# 11. Optional-destination discovery contracts

Optional destination geography may exist before the player knows it.

An optional destination begins without an interactive named marker unless legitimate Knowledge/discovery supports projection.

The following stable discovery facts are approved for Wave 1:

| Optional address | Discovery fact | Legitimate Wave-1 producers |
|---|---|---|
| `fire:O01` Cedar Smoke Village | `fire_discovery_cedar_smoke_village` | route testimony, local delivery/animal occurrence, direct travel discovery |
| `fire:O02` Riverstone Hamlet | `fire_discovery_riverstone_hamlet` | Naka/road testimony, local delivery occurrence, direct travel discovery |
| `fire:O03` Foxglove Medicine House | `fire_discovery_foxglove_medicine_house` | missing-medicine source testimony; public medical referral; direct discovery |
| `fire:O04` Charcoal Burners' Camp | `fire_discovery_charcoal_burners_camp` | legitimate smoke/work-route clue; local testimony; direct discovery |
| `fire:O05` Konoha Courier Station | `fire_discovery_konoha_courier_station` | courier testimony/briefing; direct route discovery |
| `fire:O07` Old Pilgrims' Lodge | `fire_discovery_old_pilgrims_lodge` | pilgrim testimony; route upkeep; direct discovery |
| `fire:O08` Waterfall Tea House | `fire_discovery_waterfall_tea_house` | traveller testimony; Verdant Falls travel; direct discovery |
| `fire:O09` Border Market | `fire_discovery_border_market` | border/caravan testimony; direct discovery |
| `fire:O10` Cedarwood Crafts Village | `fire_discovery_cedarwood_crafts_village` | workshop/delivery testimony; direct discovery |
| `fire:O15` Hunters' Relay Post | `fire_discovery_hunters_relay_post` | tracking/patrol testimony; direct discovery |
| `fire:O16` Floodplain Rice Terraces | `fire_discovery_floodplain_rice_terraces` | river/flood occurrence; local testimony; direct discovery |
| `fire:O17` Ashwind Observatory | `fire_discovery_ashwind_observatory` | observation/watchtower testimony; direct discovery |
| `fire:O18` Sealed Cargo Depot | `fire_discovery_sealed_cargo_depot` | legitimate harbour logistics testimony; direct discovery |

### Discovery non-collapse

A participant mentioning a place by name may establish that the place is known to the observer.

It does not prove every claim the participant makes about that place.

Reaching an optional destination may establish direct location discovery.

It does not automatically create an active quest there.

---

# 12. Concealed / event-driven Alpha subset

The legacy Fire specification contains many high-lore concealed reservations. Alpha Wave 1 must **not activate all of them** merely because they have authoring names.

The following subset is authorised for current event ecology work.

## 12.1 `fire:S12` — Burned Messenger Route

Authoring identity only until discovered.

Initial state:

**unknown / no named marker**

May become **Suspicious** only when a committed route/courier/patrol occurrence establishes a concrete physical clue such as:

`fire_clue_burned_messenger_trace`

Possible legitimate producers:

- `fire_standing_delayed_courier`
- `fire_standing_missing_patrol_trace`

but only when that exact occurrence actually contains and commits the physical evidence.

The family name alone does not reveal S12.

After suspicious projection, a separate investigation may establish:

`fire_discovery_burned_messenger_route`

No hostile author is inferred automatically.

---

## 12.2 `fire:S20` — Nameless Battlefield Bell

Initial state:

**unknown**

May become a **yellow anomaly** only after an authored occurrence commits a perceptible bell/sound/physical-history clue:

`fire_clue_nameless_battlefield_bell`

The clue may come from an investigation/history/route occurrence later authored against a compatible host.

Wave 1 reserves the site and its state transition but does not force the clue into every Chronicle.

Discovery:

`fire_discovery_nameless_battlefield_bell`

No automatic item, Technique, bloodline or combat reward.

---

## 12.3 `fire:S22` — Ancient Summon Waystone

Initial state:

**unknown**

May become a **yellow anomaly** only when an exact authored occurrence gives the observer legitimate evidence that the unusual marker/waystone is perceptible and worth investigating.

Discovery:

`fire_discovery_ancient_summon_waystone`

Finding the Waystone does not:

- grant a Summon;
- create a contract;
- teach a Summon Technique;
- add an Entity to ownership;
- add an Entity to Battle.

Any Summon opportunity requires Acquisition/Entity authority after World establishes the encounter opportunity.

---

## 12.4 `fire:S24` — Listening Forest

Initial state:

**unknown**

May become **Suspicious** after an exact route/observation occurrence commits:

`fire_clue_listening_forest_anomaly`

Possible Wave-1 producer family:

`fire_standing_suspicious_watcher`

or an observation exercise, but only if the exact occurrence contains the relevant environmental evidence.

Discovery:

`fire_discovery_listening_forest`

The site's name does not author supernatural truth by itself.

---

## 12.5 `fire:S25` — Lost Caravan of Embers

Reservation class:

**event only**

There is no permanent named destination marker merely because the reservation exists.

The reservation may host a finite caravan-related side occurrence if exact Story/World eligibility is authored.

It must not be used as a generic endlessly respawning missing-caravan family.

It does not replace Arc 1 Mission 1's authored caravan occurrence.

---

## 12.6 `fire:S28` — Hollow Hokage Road / hidden-route seam

Initial state:

**unknown**

The stable travel corridor `fire:R12` exists as World Truth but begins unrecognised.

A suspicious projection may occur only after exact evidence such as:

`fire_clue_hidden_hokage_road_alignment`

is committed by a compatible observation/patrol/history occurrence.

Possible Wave-1 producer families:

- `fire_standing_recon_observation`
- `fire_standing_missing_patrol_trace`

only when the selected occurrence actually contains the clue.

Once legitimate route discovery commits:

`fire_discovery_hidden_hokage_road`

then `fire:R12` may become available as a known travel-context reference.

Discovery of R12 does not automatically populate it with threats or secrets.

---

## 12.7 Explicit dormant high-lore reservations

The following legacy reservations remain **dormant by default** in this Alpha Wave-1 ecology unless separate authority activates them:

- `fire:S01` Orochimaru's Field Annex
- `fire:S02` Root Border Safehouse
- `fire:S03` ANBU Dead-Drop Grove
- `fire:S04` Uchiha Wartime Storehouse
- `fire:S05` Uzumaki Boundary Seal
- `fire:S06` Twelve Guardians' Hidden Reliquary
- `fire:S07` Forgotten Senju Muster Camp
- `fire:S08` White Zetsu Root-Cavern
- `fire:S09` Foxfire Shrine
- `fire:S10` Bandit King's Hollow
- `fire:S11` Black Market River Dock
- `fire:S13` Hidden Battlefield Ossuary
- `fire:S14` Sealed Caldera Furnace
- `fire:S15` Blue-Flame Cavern
- `fire:S16` Drowned Shrine Passage
- `fire:S17` False Torii
- `fire:S18` Daimyō Escape Residence
- `fire:S19` Abandoned Interrogation Farm
- `fire:S21` Smouldering Stone Circle
- `fire:S23` Buried Fire-Country Archive
- `fire:S26` Underground Bounty Exchange
- `fire:S27` Sealed Plague Camp

Dormant does not mean erased from world authoring history.

It means this contract does not make them Alpha-visible/actionable merely to fill the map.

### S10 / live Bandit Hideout caution

Current runtime already contains `bandit_hideout` with explicit authored opportunity:

`alpha_bandit_hideout_battle`

bound to the existing `bandit_leader` encounter authority.

`fire:S10` Bandit King's Hollow must **not** be assumed to be the same place from naming similarity.

Wave 1 therefore preserves the current live Bandit Hideout and leaves S10 dormant.

---

# 13. Existing live Bandit Hideout

Current runtime content remains authoritative:

- runtime location: `bandit_hideout`
- opportunity: `alpha_bandit_hideout_battle`
- explicit Battle interaction: `fight_bandit_hideout`
- encounter: `bandit_leader`

World standing ecology does not replace it.

The Bandit Hideout may count as one currently actionable non-Story opportunity when it is legitimately actionable.

Its existence does not grant generic `type:battle => FIGHT` semantics to other locations.

---

# 14. Combat / opposition boundary for standing events

Standing World events may create factual confrontations.

They may not invent Combat packages.

Existing calibrated ordinary opposition includes, among others:

- `bandit` — Base PL 18
- `scout` — Base PL 21
- `rogue_genin` — Base PL 23
- `banditLeader` — Base PL 28

Those identities may only be consumed through an exact authored encounter/candidate-set path already supported by Combat/runtime.

Do not apply:

- player-level scaling;
- route-tier scaling;
- map-region PL multipliers;
- random ±PL adjustments;
- hidden difficulty bonuses;
- automatic stronger enemy because the protagonist is stronger.

Challenge variation should come from:

- who is actually present;
- number/role/composition where exact multi-participant authority exists;
- objective pressure;
- route/environmental context;
- player decisions;
- legitimate authored Effective-State sources.

Battle victory resolves Battle facts.

It does not automatically resolve every World objective.

---

# 15. Training / Development boundary

Wave-1 families with `TRAINING_DEVELOPMENT` category are:

- `fire_standing_tracking_drill`
- `fire_standing_recon_observation`
- `fire_standing_lost_field_kit` where actual field practice occurs

World owns:

- opportunity existence;
- participant/source context;
- what actions occurred;
- factual outcome/history;
- evidence emitted.

Progression / Development owns persistent interpretation.

Therefore these events grant **no automatic**:

- Stat;
- PL;
- mastery;
- Technique;
- generic training EXP.

---

# 16. Loot / object boundary

A map event may contain objects/cargo/property.

That does not make them player loot.

Preserve:

> discovered object ≠ owned Item

> recovered property ≠ player inventory

> cargo custody ≠ loot entitlement

A LOOT opportunity requires exact:

- source/provenance;
- eligibility;
- reward entitlement;
- grant timing;
- one-shot/idempotence semantics.

No standing family in Wave 1 creates generic random loot drops by itself.

---

# 17. Reward posture

The Wave-1 ecology is intentionally **not tied to a universal payout formula**.

Potential outputs include:

- Chronicle history;
- source-bounded Knowledge / Rumour;
- evidence / intelligence;
- relationship or Shared-History evidence;
- recognition/reputation evidence;
- location discovery;
- route discovery;
- future opportunity eligibility;
- successful rescue/assistance facts;
- objective completion;
- contextual material entitlement where separately authored.

No standing family automatically grants:

- generic mission EXP;
- Base PL;
- Stats;
- Technique access;
- Character acquisition;
- Entity acquisition;
- automatic relationship state.

### Economic packages

Exact Ryō/item packages for repeatable standing activities are **not fixed by this ecology pass**.

Where an occurrence is explicitly commissioned/paid, World/Rewards must author the exact package before Coding treats payment as authoritative.

This avoids inventing a hidden universal `helped someone => X Ryō` rule.

The absence of a material package does not erase non-loot consequences.

---

# 18. Ordinary-life baseline

Not every event should support the Arc-1 vulnerability thesis.

The region needs ordinary life so deterioration can be felt as deterioration.

At least half of the standing pool visible to a typical player over time should remain plausibly ordinary content such as:

- broken transport;
- missing animal;
- lost traveller;
- delivery assistance;
- local theft;
- workshop logistics;
- training;
- pilgrim route help;
- river assistance.

The map must not become:

> every tree hides an assassin and every merchant is part of the plot.

Preserve:

> ordinary occurrence ≠ Arc conspiracy

> crime ≠ foreign operation automatically

> suspicious behaviour ≠ hostile affiliation automatically

---

# 19. Arc-1 pressure overlay boundary

Arc 1 has separate Story authority.

This standing ecology does **not** infer regional pressure events merely because the player completed Mission N.

An Arc-specific optional World occurrence requires an exact committed eligibility input from Story/World authority.

When such content is authored later, it should use existing hosts/route corridors where plausible rather than manufacture permanent Story-only dots.

Example structural use only:

committed Story/world fact

→ exact regional pressure candidate becomes eligible

→ observer Knowledge/discovery determines projection

→ candidate may occupy a temporary event treatment at an existing route/destination

→ outcome commits independently

→ host remains reusable afterward.

Do not create a universal hidden `securityPressureLevel` merely to drive this ecology unless a separate durable authority explicitly adopts one.

Preserve:

> world-scale pressure ≠ every occurrence sharing one hidden author

> Arc event eligibility ≠ standing-family eligibility

> Story milestone ≠ automatic random hostile spawn

---

# 20. Story coexistence / hotspot arbitration

At a host containing both Story and standing content, the Event Drawer may project multiple separately authorised opportunities.

Presentation priority should follow existing runtime/world rules, with current Story/active temporary occurrence receiving appropriate emphasis.

However:

- Story does not consume the host permanently;
- standing events remain independently resolved;
- a side occurrence does not become a Story objective merely because both share a hotspot;
- Story completion does not suppress unrelated standing content unless the actual physical/world state makes coexistence impossible;
- a standing Battle return resumes the standing occurrence;
- a Story Battle return resumes the Story occurrence.

Preserve caller/return identity.

---

# 21. Event lifecycle classes

Every concrete opportunity instantiated from this ecology must declare one of:

### `repeatable_new_occurrence`

Family may produce later distinct occurrences after recurrence rules permit.

Used by most Wave-1 standing families.

### `finite_occurrence`

Specific situation resolves once and does not respawn as the same history.

Used by authored local side stories.

### `discovery_once`

Once the discovery fact commits, the discovery interaction itself does not replay.

The discovered location may host later content.

### `story_bound`

Eligibility/lifecycle belongs to mandatory Story authority, not standing pool.

### `arc_context_bound`

Optional Arc-sensitive event whose eligibility comes from exact Story/world history.

Randomness must never move an opportunity between lifecycle classes.

---

# 22. Decline / ignore semantics

Opening a hotspot does not commit participation.

Reading a description does not commit history beyond legitimate discovery/presentation facts already established.

Where the player explicitly declines a request and the other participant receives that answer, the event may commit an authored `declined` outcome.

Where the player simply closes the drawer before a commitment boundary, do not manufacture `declined` history unless the opportunity explicitly defines that closure as factual refusal.

Ignoring an event does not automatically grant Knowledge of what happened off-screen.

---

# 23. Alpha first-pass optional location activation

For the first implementation wave, World recommends concentrating content on the public host set plus these optional destinations as they become legitimately discovered:

- `fire:O01` Cedar Smoke Village
- `fire:O02` Riverstone Hamlet
- `fire:O03` Foxglove Medicine House
- `fire:O04` Charcoal Burners' Camp
- `fire:O05` Konoha Courier Station
- `fire:O07` Old Pilgrims' Lodge
- `fire:O08` Waterfall Tea House
- `fire:O09` Border Market
- `fire:O10` Cedarwood Crafts Village
- `fire:O15` Hunters' Relay Post
- `fire:O16` Floodplain Rice Terraces
- `fire:O17` Ashwind Observatory
- `fire:O18` Sealed Cargo Depot

Other legacy optional destinations remain valid future hosts but are not required to finish the first playable ecology.

This keeps Alpha implementation bounded while retaining expansion capacity.

---

# 24. First implementation minimum

A useful Alpha Land-of-Fire free-play release does **not** require all 22 standing families on day one.

Minimum viable first integration should implement at least **12** of the Wave-1 families with representation across these gameplay modes:

- 3 route/logistics incidents;
- 2 civilian/settlement incidents;
- 2 investigation/tracking incidents;
- 2 training/field incidents;
- 1 pilgrim/travel incident;
- 1 river/coast/border incident;
- 1 threat-capable incident that remains non-Battle unless exact Combat authority is present.

Recommended first 12:

1. `fire_standing_delayed_courier`
2. `fire_standing_broken_wagon`
3. `fire_standing_injured_traveller`
4. `fire_standing_missing_pack_animal`
5. `fire_standing_suspicious_watcher`
6. `fire_standing_roadside_extortion`
7. `fire_standing_abandoned_camp`
8. `fire_standing_missing_patrol_trace`
9. `fire_standing_tracking_drill`
10. `fire_standing_recon_observation`
11. `fire_standing_lost_pilgrim`
12. `fire_standing_border_caravan_check`

Then add the remaining Wave-1 families without changing the ecology contract.

---

# 25. Runtime consumption requirements

Coding must consume the existing regional/world architecture.

Use existing equivalents of:

- `worldRegions.fire`
- `WORLD_EVENT_OPPORTUNITY_REGISTRY`
- `registerWorldEventOpportunity(...)`
- observer discovery/actionability dimensions
- hotspot projection / Event Drawer
- `routeWorldOpportunityInteraction(...)`
- existing Story Scene caller/return
- existing Battle/Encounter reservation/construction pipeline
- same-region/hotspot return context
- existing save/load World Event persistence

Do not create:

- `LAND_OF_FIRE_QUEST_ENGINE`
- a second discovery ledger
- a second hotspot registry just for Fire
- a parallel random mission board
- a generic location-type-to-Battle resolver
- a map-level difficulty scaler
- reload-driven event rerolls.

---

# 26. Persistence requirements

Persist at minimum for selected standing occurrences:

- stable family ID;
- unique occurrence ID;
- host address / mapped runtime host ref;
- occurrence-local participant refs where committed;
- current opportunity lifecycle state;
- discovered/known facts;
- selected/committed actions;
- factual result;
- exact Battle/Story return refs where used;
- reward entitlement/grant receipt where separately authored;
- discovery results;
- recurrence suppression evidence.

Save/load must not:

- repopulate the whole standing snapshot;
- erase resolved history;
- duplicate rewards;
- duplicate discoveries;
- mutate source testimony into truth;
- replace a participant;
- respawn the same finite occurrence;
- reveal a secret that was not discovered.

---

# 27. Map geometry integration after issue #39

When UI / Assets returns current Fire (10) revalidated geometry, World/Coding may bind:

regional host address

→ current production anchor / interaction region / route control points

without changing this event ecology.

If geometry revalidation proves a host physically incompatible with its legacy identity, treat that as a concrete contradiction and return only that host for World reconciliation.

Do not silently move an event to a semantically different place merely to fit coordinates.

---

# 28. Regression / Golden expectations

When implemented, Land of Fire standing ecology should prove at minimum:

1. opening/reopening the map does not reroll active standing occurrences;
2. save/load preserves exact selected occurrence identities and participants;
3. resolving one standing occurrence refills only legitimate vacant capacity rather than rerolling every other slot;
4. immediate same-family/same-host repetition is suppressed;
5. hidden optional destinations remain non-interactive/non-leaking until discovery;
6. a discovered optional location can remain known after its revealing event resolves;
7. standing and Story opportunities can coexist at one host without identity collapse;
8. a route can host different occurrences over time without owning their history;
9. `roadside_extortion` does not create Battle unless exact Combat/Encounter authority is supplied;
10. ordinary testimony remains source-bounded Knowledge rather than World Truth;
11. Battle return resumes the same standing occurrence;
12. a repeatable family creates a new occurrence rather than resurrecting a resolved occurrence;
13. no generic EXP/PL/Stat is granted by standing completion;
14. no discovered cargo/object becomes player ownership without explicit entitlement;
15. current live Bandit Hideout remains explicit authored Battle content and is not duplicated by `fire:S10`;
16. Region marker/event density remains readable against the revalidated current map;
17. Story progress is never required merely because standing slots were exhausted if legitimate standing candidates remain available.

---

# 29. Content-budget verdict

For Alpha, the Land of Fire should be understood as:

**stable regional geography**

+

**22 reusable standing event families**

+

**optional locations revealed through legitimate discovery**

+

**a bounded concealed-site subset**

+

**existing persistent opportunities such as Bandit Hideout**

+

**separate Story and Arc-context overlays**.

The player does not need fifty mandatory missions to experience a busy world.

The same route/settlement can remain productive because later events are new occurrences with different participants/context/history rather than literal quest replay.

The target experience is:

> Story is available when I am ready to continue it.

not:

> I have emptied the map, so Story is the only button left.

---

# 30. Current production status

### CLOSED BY WORLD

- Land-of-Fire standing-event layering
- Wave-1 public/optional host roles
- 22 standing family identities and semantic boundaries
- standing snapshot/refill semantics
- anti-reroll / anti-immediate-repeat policy
- optional destination discovery semantics
- Alpha concealed/event-driven subset
- dormant high-lore reservation policy
- live Bandit Hideout non-duplication rule
- Combat/Training/Loot/Reward ownership boundaries
- Story/standing coexistence
- first implementation minimum
- save/load / regression expectations

### OPEN EXTERNAL DEPENDENCY

**UI / Assets GitHub #39**

Current Fire (10) asset/source confirmation and production coordinate revalidation.

### FOLLOW-UP WORLD WORK

Before final Coding implementation handoff, World / Rewards should add exact economic packages only for those standing occurrences that are specifically paid/commissioned in Alpha.

Arc-1-specific regional pressure event definitions should be bound only when exact Story/world milestone outputs legitimately support them; do not infer them from mission numbering.

### CODING ROUTING

Do **not** create the final Coding implementation handoff from this document alone while #39 remains open.

Once current-master geometry returns, combine:

1. this World semantic/content authority;
2. UI / Assets current-master geometry authority;
3. any required exact reward package addendum;

into **one** implementation-ready Coding issue.

---

## Final World lock

Land of Fire Alpha free play should be a **replenishing Chronicle event ecology over stable geography**, not a finite row of one-use quest icons.

Preserve:

> eligible event family → committed occurrence → factual result → Chronicle history → changed future eligibility

not:

> click hotspot → reroll quest → grind until Story.

**World semantic/event population may proceed now. Exact current-master placement remains WAITING ON UI / ASSETS #39.**
