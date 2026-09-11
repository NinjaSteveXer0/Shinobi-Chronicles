# Shinobi Chronicles — Story-Gated Local Area Access, Persistent Discovery and Opportunity Eligibility Contract

**Date:** 2026-09-11  
**Owner:** World / Missions / Events / Rewards  
**Status:** **BINDING WORLD SEMANTIC AUTHORITY — UI / CODING / STORY CONSUMPTION SEPARATE**

---

## 1. Purpose

This contract closes the World-side distinction between:

- **temporary Story access to a contained local area**;
- **persistent discovery of that area's exterior / regional / village map identity**;
- **persistent access after Story**;
- **local-map hotspot reveal and actionability**;
- **general event / hotspot / quest eligibility predicates**.

It also gives UI / Assets the required contained-map production targets for:

- **ANBU Headquarters**;
- **Root Headquarters**;

using the existing Whisper Woods contained-map grammar rather than inventing a second local-area system.

This document consumes rather than reopens:

- `Documentation/Maps/Konoha Hotspot Calibration v3.md`;
- `Documentation/World/Land of Fire Whisper Woods Regional Hosting Addendum 2026-09-09.md`;
- `Documentation/Assets/Whisper Woods Local Map Asset Contract.md`;
- `Documentation/World/Alpha Village Region Info Marker Story Locator and Executable Activation Package 2026-09-11.md`;
- `Documentation/World/Capability_Responsive_Chronicle_Event_Ecology_v3_Consolidated_Lock_2026-09-10.md`;
- current Writing authority for Arc 2 Mission 2 `THE LEAK`.

Preserve throughout:

> Story access != map discovery  
> interior visit != exterior-location Knowledge automatically  
> discovered != accessible != actionable  
> location != hotspot != opportunity != event  
> local map artwork != observer Knowledge  
> Story-authorised hotspot != permanent free-play hotspot  
> mission completion != universal secret-location reveal  
> eligibility != selection != discovery != actionability  
> randomness may select among eligible candidates; randomness must not manufacture eligibility

---

# PART A — GENERIC STORY-TEMPORARY LOCAL-AREA ACCESS

## 2. Three independent dimensions

Contained areas must track at least three semantic dimensions independently.

### A. Location Knowledge

Recommended semantic states:

- `UNRECOGNISED`
  - observer has no legitimate map-location Knowledge;
  - no marker, hover, focus, DOM/accessibility identity or hitbox leak.
- `KNOWN_UNKNOWN`
  - observer has legitimate evidence that something/location-worthy exists at a bounded area but canonical identity is not yet known;
  - village/regional map may use the binding **pulsing golden halo + exactly `????`**.
- `IDENTIFIED`
  - canonical location identity is legitimately known;
  - real location name may be projected.
- `MAPPED`
  - observer has sufficiently precise spatial Knowledge to focus the exact exterior/entrance on the relevant interactive map.

`IDENTIFIED` does not necessarily mean `MAPPED`.

A Character may know that **ANBU Headquarters exists** without knowing where its concealed entrance is.

### B. Access

Recommended semantic states:

- `NO_ACCESS`;
- `STORY_TEMPORARY` — exact current Story route grants contained-area entry only for that Story occurrence/lineage;
- `ESCORTED_TEMPORARY` — Character may physically enter but the route itself may deliberately conceal exterior geography;
- `CONDITIONAL` — persistent return is possible only while exact current predicates remain true;
- `GENERAL` — ordinary return is authorised by current World/access state.

Story temporary access is an **access grant**, not a Knowledge grant.

### C. Local actionability

Recommended semantic states:

- `NONE`;
- `STORY_ONLY` — exact current Story hotspots/actions only;
- `LIMITED` — some discovered/free-play hotspots/actions currently legal;
- `GENERAL` — all presently eligible local opportunities may be selected/projected.

No state above guarantees success.

---

## 3. Story-instance rule

A Story mission may route the player into a contained local area even when the area's village/regional-map location remains undiscovered.

A Story route should supply an exact temporary grant conceptually equivalent to:

```text
storyLineageRef
missionAreaId
worldInstanceRef
entryRouteRef
storyAuthorizedHotspotIds[]
accessState = STORY_TEMPORARY | ESCORTED_TEMPORARY
```

The local map may then load directly from Story.

This does **not** automatically:

- reveal the exterior map anchor;
- identify the canonical hidden location on the village/regional map;
- authorise later free-play return;
- reveal every hotspot inside the local map;
- make every local opportunity eligible;
- unlock unrelated side content;
- count the secret in a hidden completion denominator.

---

## 4. Local-map fog / reveal rule

Contained secret facilities such as ANBU and Root should support observer-relative local projection.

Even when the full reusable art master contains the entire physical complex, runtime should project only the areas legitimately known/available to the current Character.

Preferred treatment:

- current/known Story route: visible and interactable;
- physically visible but not semantically known wing: passive/obscured/fogged where appropriate;
- concealed local hotspot: no marker, no hover, no tooltip, no input interception;
- known-unknown local feature: restrained golden `????` treatment only if exact local Knowledge supports it;
- identified hotspot: legitimate name;
- inaccessible hotspot: identified name may remain visible only when the Character legitimately knows it exists.

A Story mission must provide `storyAuthorizedHotspotIds[]` or equivalent. UI/Coding must not infer permission from every anchor present in the local-area registry.

---

# PART B — WHISPER WOODS PERSISTENT DISCOVERY

## 5. Existing identity

Regional host:

`fire:O21` — **Whisper Woods**

World root:

`fire_whisper_woods`

Contained area:

`whisper_woods`

Regional approach:

`fire:R13` — **Whisper Woods Approach**

Existing first-entry discovery history:

`whisper_woods_discovered`

Existing Mission-1 approach prerequisite:

`arc1_m1_caravan_three_person_trace_confirmed`

---

## 6. Binding Whisper Woods rule

Whisper Woods is **not** public-from-start.

Before Mission-1 investigation legitimately establishes the approach:

- regional Fire map projects nothing for `fire:O21`;
- Story locator must not reveal it prematurely.

When the exact Mission-1 trace makes the approach actionable, Story may route the player into the contained `whisper_woods` area.

On **first legitimate physical entry**, commit/consume:

`whisper_woods_discovered`

That entry is sufficient observer evidence that the Character now knows Whisper Woods as a real place.

Therefore:

> **Whisper Woods becomes a persistent known regional location because the player legitimately reached it — not because Arc 1 later ends.**

Once `whisper_woods_discovered` is committed, the Land-of-Fire regional map may project **Whisper Woods by its real name** whenever the Fire map itself is available to the Character.

Do **not** wait until Arc-1 completion to discover it.

Do **not** make Arc-1 completion a second independent discovery trigger.

However:

- discovery does not grant unrestricted return;
- current Story lock, travel state, regional access or later authored conditions may still gate entry;
- concealed local points such as Old Watch Ledge / Hollow Cedar remain independently undiscovered until their own predicates resolve;
- future Whisper Woods opportunities require their own eligibility and selection.

After Mission 1, Whisper Woods remains a reusable Fire Country location capable of hosting unrelated legitimate Chronicle content.

---

# PART C — ANBU HEADQUARTERS

## 7. Konoha exterior identity

Konoha reservation:

`KON-S03` — **ANBU Headquarters Entrance**

Current Konoha v3 default epistemic state:

`UNRECOGNISED`

The canonical exterior name must not leak before legitimate discovery.

---

## 8. New contained-area identity

World reserves:

`missionAreaId = konoha_anbu_hq`

Display identity after legitimate interior recognition:

**ANBU HEADQUARTERS**

Recommended UI production binding target:

`Konoha Locations/anbu_hq.png`

Asset target:

- PNG;
- **1536 × 1024**;
- 3:2;
- reusable environmental master;
- no baked current Story participants, mission clues, enemies, objective state, secret labels, markers, `????`, rewards or current damage.

This area is reusable beyond Arc 2 when later Chronicle eligibility permits.

---

## 9. ANBU local topology reservation

UI / Assets should physically support these stable authoring anchors without making all of them automatically visible/actionable:

1. `anbu_hq_hotspot_secure_threshold`
   - controlled ingress / masked checkpoint / transition host.
2. `anbu_hq_hotspot_transit_hall`
   - internal circulation and escort/story-route host.
3. `anbu_hq_hotspot_operations_concourse`
   - operational movement / dispatch host.
4. `anbu_hq_hotspot_briefing_chamber`
   - briefing/interview/coordination host.
5. `anbu_hq_hotspot_records_annex`
   - intelligence/archive host; access separately gated.
6. `anbu_hq_hotspot_equipment_bay`
   - preparation/equipment context; not automatic equipment ownership.
7. `anbu_hq_hotspot_observation_gallery`
   - surveillance/counter-surveillance/event host.
8. `anbu_hq_hotspot_lower_service_junction`
   - concealed lower-route / infrastructure host; useful for future ANBU/Root-adjacent chains without asserting a Root connection by scenery alone.

UI may adjust exact visual arrangement during asset production, but World must calibrate the final master before runtime binding.

---

## 10. ANBU Story entry vs Konoha-map discovery

If Arc 2 Mission 2 or another Story route legitimately enters ANBU Headquarters, Story may grant `STORY_TEMPORARY` / `ESCORTED_TEMPORARY` access to `konoha_anbu_hq`.

During that Story visit:

- only the exact Story-authorised local hotspots/actions are projected;
- the player does not automatically receive every ANBU local-map location or future event;
- Konoha `KON-S03` remains unprojected unless the route itself legitimately establishes exterior spatial Knowledge.

World should distinguish at least these factual histories:

- `anbu_hq_interior_visited`
  - the Character was legitimately inside the facility;
  - proves interior experience only.
- `anbu_hq_exterior_location_confirmed`
  - the Character legitimately knows the precise exterior/entrance geography well enough for Konoha-map projection.

The second may be committed only when an authorised occurrence establishes it, for example:

- the Character approaches/leaves through the exterior while retaining reliable geographic orientation;
- a legitimate authority/source explicitly discloses the exact entrance and that Knowledge is committed;
- investigation independently identifies and verifies the entrance;
- another exact authored outcome produces equivalent reliable map Knowledge.

The following are **not sufficient alone**:

- being inside ANBU HQ;
- being escorted there through concealed transit;
- hearing that ANBU has a headquarters;
- Arc-2 Mission completion;
- Arc-2 completion;
- seeing an interior local map;
- UI loading the contained map.

If evidence establishes only an approximate/suspected concealed entry area, `KON-S03` may enter `KNOWN_UNKNOWN` and project the golden `????` halo without the ANBU name.

If exact identity + exact location are confirmed, `KON-S03` becomes identified/mapped and may display **ANBU Headquarters Entrance**.

Persistent return still requires an independent access predicate.

---

# PART D — ROOT HEADQUARTERS

## 11. Konoha exterior identity

Konoha reservation:

`KON-S04` — **Root Headquarters Entrance**

Current Konoha v3 default epistemic state:

`UNRECOGNISED`

Root remains semantically distinct from ANBU. ANBU discovery does not collapse Root discovery.

---

## 12. New contained-area identity

World reserves:

`missionAreaId = konoha_root_hq`

Display identity after legitimate recognition:

**ROOT HEADQUARTERS**

Recommended UI production binding target:

`Konoha Locations/root_hq.png`

Asset target:

- PNG;
- **1536 × 1024**;
- 3:2;
- reusable environmental master;
- clearly different visual identity from ANBU Headquarters;
- underground/concealed institutional geography;
- no baked current Story participants, enemies, allegiance proof, mission state, secret labels, markers, current interrogation victim, loot/reward or Story damage.

---

## 13. Root local topology reservation

UI / Assets should support these stable authoring anchors:

1. `root_hq_hotspot_concealed_threshold`
   - hidden ingress / internal transition host.
2. `root_hq_hotspot_silent_concourse`
   - controlled internal circulation.
3. `root_hq_hotspot_training_assessment_hall`
   - training/assessment-capable area; existence does not create training opportunity automatically.
4. `root_hq_hotspot_records_vault`
   - records/intelligence host; independently gated.
5. `root_hq_hotspot_interview_chamber`
   - questioning/interrogation-capable environment without baked current victim/event truth.
6. `root_hq_hotspot_operations_gallery`
   - operational planning/observation host.
7. `root_hq_hotspot_command_chamber`
   - higher-control interior host; strongly gated.
8. `root_hq_hotspot_sealed_lower_junction`
   - deeper transit/secret-chain host; no automatic claim about where it leads.

Again, artwork may show plausible architecture while runtime projects only observer-legal hotspots.

---

## 14. Root Story entry vs Konoha-map discovery

Story may legitimately route a Character into `konoha_root_hq` without revealing `KON-S04` on the Konoha interactive map.

This is especially appropriate where Story ingress occurs through:

- concealed interior transition;
- ANBU/administrative service route;
- blind/escorted transit;
- underground route whose exterior origin cannot be reliably reconstructed;
- another exact authored route designed to preserve Root secrecy.

World should distinguish:

- `root_hq_interior_visited`
- `root_hq_exterior_location_confirmed`

The second requires exact reliable spatial Knowledge just as ANBU does, with an intentionally higher authoring bar where appropriate.

ANBU location Knowledge is never sufficient by itself.

Root existence Knowledge is never sufficient by itself.

Arc-2 completion is never sufficient by itself.

---

# PART E — ARC-END DISCOVERY RULE

## 15. No universal Arc-2 unlock

World explicitly rejects:

> `Arc 2 completed -> automatically reveal ANBU HQ + Root HQ on Konoha map`

unless final Story authority later establishes that **every valid Arc-2 Chronicle necessarily acquires exact exterior-location Knowledge for those locations**.

Current design should preserve Chronicle divergence.

A player who:

- independently maps ANBU;
- is escorted inside ANBU but never learns its exterior;
- discovers Root through a separate chain;
- enters Root through an interior route;
- never enters one of them at all;

should be allowed to finish Arc 2 with different Konoha map Knowledge.

This is not punishment. It is factual observer history.

If a later institutional outcome grants public/official access, that outcome should commit its own exact location/access facts rather than using Arc completion as a blanket shortcut.

---

# PART F — OPPORTUNITY / HOTSPOT / EVENT UNLOCK FRAMEWORK

## 16. Ownership

**World / Missions / Events / Rewards owns the exact unlock/eligibility requirements for World locations, hotspots, events, side quests, formal missions, discoveries and local opportunities.**

CE / Codex / Coordination owns reusable semantic reconciliation and may help evaluate/route cross-system prerequisites.

Other owners define whether their facts exist:

- Skills owns actual Skill capability;
- Registry/PL/Rank owns identity/Stats/PL/formal Rank;
- Progression owns persistent development/qualification state where applicable;
- Acquisition owns ownership/recruitment/admission;
- Items/Weapons/Equipment/Summons own those actual definitions/states;
- Writing owns committed Story state;
- relationships/CE own their authoritative history/state as currently defined.

World consumes those facts as predicates; it does not manufacture them.

Coding implements generic evaluation/persistence/selection from the closed World predicates.

UI projects only resulting observer-safe state.

---

## 17. Recommended authoring contract

Every activated World opportunity should be able to declare:

```text
opportunityId
hostRef
poolRef
mode

existenceEligibility:
  allOf[]
  anyOfGroups[]
  noneOf[]

discoveryEligibility:
  allOf[]
  anyOfGroups[]

identityRevealEligibility:
  allOf[]

accessEligibility:
  allOf[]
  anyOfGroups[]

actionabilityEligibility:
  allOf[]
  anyOfGroups[]

participantAvailability[]
locationStateRequirements[]
temporalRequirements[]
worldStateRequirements[]
recurrencePolicy
expiryPolicy
suppressionRules[]
transformRules[]
selectionPolicy
legalActions[]
outcomeContracts[]
rewardEnvelopeRef
```

Equivalent Coding field names are acceptable. The semantic separation is not optional.

---

## 18. Predicate source families

World may author hard predicates from exact durable facts including:

### Chronicle / occurrence history

Examples:

- prior event occurred;
- prior route/action/non-action committed;
- participant survived/escaped/was captured where exact authority supports it;
- evidence was kept/returned/surrendered/left untouched;
- previous false profile was used;
- previous contact or observer history exists.

### Knowledge

Examples:

- exact place/person/faction/document is known;
- source-bounded rumour exists;
- exact clue/corroboration committed;
- known-unknown state exists;
- exact technical Knowledge exists.

Knowledge predicate does not imply truth beyond its provenance.

### Capability / Skill

Examples:

- False Identity;
- Tracking;
- Medical capability;
- Fūinjutsu literacy;
- Counter-Surveillance;
- poison recognition;
- Bloodline contextual capability;
- Hosted Entity / Echo contextual capability.

Capability eligibility does not guarantee route success.

### Item / key / document / custody

Examples:

- exact key possessed;
- exact document custody;
- exact tool/equipment available;
- required material or seal source available.

Ownership/custody semantics remain with their owning systems.

### Relationship / participant history

Examples:

- participant knows the Character;
- exact shared history occurred;
- recognised contact exists;
- prior rescue/protection/betrayal/non-action history matters.

World must not invent friendship/loyalty labels from one occurrence.

### Rank / service / institutional state

Examples:

- formal Rank requirement;
- exact recognised specialist qualification;
- service commendation;
- institutional clearance/access grant.

Mission success is not Promotion automatically.

### Story state

Examples:

- exact mission/scene state active;
- Story occurrence completed;
- current Story route grants temporary local access.

Draft/authoring checkpoint is not a runtime predicate.

### Location / travel

Examples:

- host location identified;
- region accessible;
- Character currently in relevant surface/route;
- route exists and is not currently blocked.

### Temporal / environmental

Examples:

- DAY / LATE AFTERNOON / DUSK;
- authored weather/world condition;
- recurrence/cooldown window;
- event has not expired.

### World/faction state

Examples:

- faction still controls/uses a place;
- threat is unresolved;
- route is closed/open;
- prior event transformed the host.

---

## 19. Evaluation order

Binding conceptual order:

1. **Definition exists** — authored content exists in reservoir/registry.
2. **Hard causal eligibility** — World/Story/Character/history predicates pass.
3. **Candidate inclusion** — only now can the event enter CE/World selection.
4. **Selection** — deterministic/weighted/random among already eligible candidates as authored.
5. **Occurrence commit** — selected event becomes a stable occurrence; save/load does not reroll it.
6. **Observer discovery evaluation** — does the Character legitimately perceive/learn it?
7. **Identity reveal evaluation** — does the Character know what it actually is?
8. **Access evaluation** — can the Character enter/use the host now?
9. **Actionability evaluation** — what actions are legal now?
10. **Outcome commit** — chosen/resolved/non-action path writes factual history.
11. **Suppression/transformation/recurrence** — later candidate ecology updates from committed history.

Randomness is legal at step 4 only among candidates that already passed steps 1–3.

---

## 20. Dedicated capability content

The existing capability-responsive doctrine remains binding:

- if a dedicated False Identity event requires `skill_false_identity`, a Character without that route does not see a greyed version;
- if a compound event requires False Identity + Fūinjutsu, both exact predicates must exist;
- a Character with several legitimate paths receives the union of eligible reservoirs plus authored compound-path events;
- missing requirements are invisible and do not count against completion/progress.

---

## 21. Location unlock matrix requirement

World must now maintain an explicit requirements matrix for every activated optional/concealed/restricted location across the seven villages + seven regional maps.

Each location row should eventually record at minimum:

```text
locationRef
startKnowledgeState
knownUnknownPredicate
identityRevealPredicate
mapPrecisionPredicate
accessPredicate
persistentReturnPredicate
localAreaId/mapImage if any
localHotspotRevealRules
StoryTemporaryAccessRules
postStoryState
```

This matrix is now the next required World production pass.

Priority order:

1. Konoha v3 concealed/restricted locations;
2. Land of Fire optional/concealed locations including Whisper Woods;
3. Amegakure + Land of Rain;
4. Kusagakure + Land of Grass;
5. Suna/Wind, Iwa/Earth, Kiri/Water, Kumo/Lightning.

---

# PART G — ARC 2 MISSION 2 BOUNDARY

## 22. Current Story authority caution

Current durable Writing metadata for `arc2_m2_the_leak` still separates authoring checkpoint from runtime history and does not yet authorise World to assert that a specific ANBU/Root route has occurred for every save.

Therefore this World document closes **how access/discovery works if/when Story legitimately routes into ANBU and/or Root**.

It does not fabricate that the current draft route has already committed.

Once Writing publishes exact Story runtime occurrences/route refs, World should bind them to:

- `konoha_anbu_hq` and/or `konoha_root_hq` temporary Story access;
- exact `storyAuthorizedHotspotIds[]`;
- exact interior/exterior Knowledge outcomes;
- exact Story locator target.

---

# PART H — UI / ASSETS HANDOFF REQUIREMENT

## 23. Two new contained interactive-map masters

UI / Assets should create **two new reusable local-map masters** in the same production family as Whisper Woods:

### ANBU Headquarters

Target path:

`Konoha Locations/anbu_hq.png`

Required:

- 1536 × 1024 PNG;
- secure concealed Konoha shinobi headquarters;
- readable connected geography rather than isolated encounter islands;
- topology capable of supporting the eight World anchors in §9;
- high operational/intelligence identity;
- reusable after Arc 2;
- no baked marker/Story/objective/participant/event state;
- no visual claim that every door/wing is known or accessible.

### Root Headquarters

Target path:

`Konoha Locations/root_hq.png`

Required:

- 1536 × 1024 PNG;
- distinct from ANBU;
- concealed underground/hidden institutional geography;
- topology capable of supporting the eight World anchors in §13;
- reusable after Arc 2;
- no baked participant/allegiance/outcome/mission state;
- no secret marker/label baked into art.

After each selected master is committed, UI / Assets should return:

- exact path;
- blob SHA;
- native dimensions.

World then performs final anchor calibration before Coding binds runtime hotspots.

---

## 24. Local Story restriction acceptance test

For either new local map, Coding/UI must be able to prove:

- Story can open the contained map without revealing the exterior Konoha secret;
- only Story-authorised hotspots/actions appear during Story-only access;
- undiscovered local anchors do not intercept hover/input;
- Story completion does not automatically reveal every local hotspot;
- leaving/reopening/save-load does not reroll revealed local state;
- later legitimate free-play access can reuse the same art/master and progressively project additional anchors/opportunities.

---

# 25. Final decisions closed by this contract

1. **YES:** Story may enter ANBU/Root local instances without automatically unlocking their Konoha interactive-map locations.
2. **YES:** ANBU HQ and Root HQ should receive reusable contained local maps equivalent in architecture to Whisper Woods.
3. **YES:** during Story-only access, only exact Story-authorised local hotspots/actions are playable.
4. **Whisper Woods:** persistent regional discovery occurs on first legitimate entry (`whisper_woods_discovered`), not at Arc-1 completion. Return access remains separate.
5. **ANBU/Root:** Arc-2 completion does **not** universally reveal either Konoha map location. Exact exterior-location Knowledge must be earned/committed.
6. **Unlock requirements:** World owns exact location/event/hotspot eligibility and is now required to publish explicit predicate matrices; CE coordinates reusable/cross-system semantics; Coding implements; UI projects.

**design closed != UI asset landed != implemented != runtime validated != Golden/regression GREEN**
