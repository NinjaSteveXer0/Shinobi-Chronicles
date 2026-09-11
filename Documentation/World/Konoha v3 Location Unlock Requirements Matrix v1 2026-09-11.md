# Shinobi Chronicles — Konoha v3 Location Unlock Requirements Matrix v1

**Date:** 2026-09-11  
**Owner:** World / Missions / Events / Rewards  
**Status:** **BINDING WORLD LOCATION-UNLOCK AUTHORITY — KONOHA CONCEALED/RESTRICTED WAVE 1**

---

## 1. Purpose

This matrix is the first concrete implementation of:

`Documentation/World/Story-Gated Local Area Access Persistent Discovery and Opportunity Eligibility Contract 2026-09-11.md`

It defines the Konoha v3 concealed/restricted location unlock grammar for `KON-S01..KON-S24`.

It does **not** make all twenty-four locations Alpha-actionable immediately.

It closes:

- what can make a location become a known-unknown;
- what is required before its canonical identity may be revealed;
- what can grant access;
- whether return is persistent or conditional;
- what does **not** count as discovery.

Preserve:

> World Truth != observer Knowledge != presentation  
> known-unknown != identified != mapped  
> identified != accessible  
> accessible != actionable  
> Story visit != exterior discovery automatically  
> capability != automatic secret reveal  
> location discovery != event eligibility  
> event eligibility != selection  
> no hidden completion denominator

---

# 2. Stable stage facts

World uses these facts as observer-facing location-stage commits. Coding may store equivalent structured records, but semantics must survive.

For each `KON-S##` location, World may commit at most the legitimate stages below:

- `<location>_suspected`
  - bounded evidence supports a location/anomaly worth investigating;
  - allows `KNOWN_UNKNOWN` / golden `????` only where a map area is sufficiently bounded.
- `<location>_identity_confirmed`
  - canonical location identity is legitimately known.
- `<location>_map_position_confirmed`
  - precise map/exterior position is legitimately known.
- `<location>_access_authorised`
  - current access route/permission/physical entry is legitimate.

A single occurrence may commit multiple stages only where its factual outcome genuinely proves them.

`identity_confirmed` without `map_position_confirmed` is legal.

Example: the Character can learn that Root Headquarters exists without knowing its Konoha entrance.

---

# 3. Matrix

## `KON-S01` — Forest of Death Entrance / Training Ground 44

**Start state:** `KNOWN_RESTRICTED_GEOGRAPHY`

**Known-unknown:** not applicable; public/restricted identity is already legitimate.

**Identity/map position:** ordinarily known with Konoha restricted geography.

**Access requirement — any exact authored grant:**

- active Examination/Chūnin-Exam route granting Training Ground 44 access;
- active formal mission/Story route requiring Forest of Death entry;
- authorised training/survival exercise;
- explicit institutional access occurrence.

**Persistent return:** **conditional only**. Knowing the Forest exists never creates general unrestricted access.

**Does not unlock access:** Rank alone; map hover; prior unrelated mission completion; seeing the forest from outside.

---

## `KON-S02` — Orochimaru's Forgotten Laboratory

**Start state:** `UNRECOGNISED`

**Known-unknown fact:** existing `konoha_s02_suspicion_trace`.

Earliest authorised producer already exists through `konoha_alpha_eastern_drainage_trace` when exact unusual drainage/chemical/maintenance evidence survives ordinary explanations.

**Known-unknown result:** golden `????` at `KON-S02`; canonical name remains hidden.

**Identity confirmation requires an authored occurrence establishing both:**

1. reliable evidence that the concealed site is an abandoned Orochimaru-associated research facility rather than merely suspicious infrastructure; and
2. direct or corroborated physical entrance/site confirmation.

Recommended World commit:

`konoha_s02_orochimaru_lab_identity_confirmed`

**Map precision commit:**

`konoha_s02_orochimaru_lab_map_position_confirmed`

**Access — any exact legal route:**

- entrance physically opened/cleared by an authored investigation;
- Story/formal mission grants temporary entry;
- exact key/seal/access method is legitimately obtained and its owning system confirms usability;
- another authored route explicitly establishes safe/possible ingress.

**Persistent return:** conditional after discovery; may remain unsafe, sealed, monitored or event-locked.

**Does not reveal:** merely possessing Fūinjutsu; merely knowing Orochimaru's name; ordinary drain proximity; Mission 10 veterinary geography; Eastern Drainage Trace by itself.

---

## `KON-S03` — ANBU Headquarters Entrance

**Start state:** `UNRECOGNISED`

**Known-unknown fact:**

`konoha_s03_anbu_entry_suspected`

May be produced only when evidence bounds a concealed institutional entry area without yet proving exact identity/entrance.

**Interior visit fact:**

`anbu_hq_interior_visited`

This does **not** unlock Konoha-map location by itself.

**Identity + map confirmation:**

`anbu_hq_exterior_location_confirmed`

May commit when the Character:

- approaches/leaves through the actual exterior while reliably oriented;
- receives exact entrance disclosure from an authorised source;
- independently investigates and verifies the entrance;
- receives another exact equivalent map-Knowledge outcome.

**Access:**

- `STORY_TEMPORARY` / `ESCORTED_TEMPORARY` from exact Story lineage;
- current ANBU/institutional access grant;
- exact trusted contact/authority invitation;
- another authored access occurrence.

**Persistent return:** conditional. Interior familiarity does not create permanent clearance.

**No Arc-2 blanket unlock.**

---

## `KON-S04` — Root Headquarters Entrance

**Start state:** `UNRECOGNISED`

**Known-unknown fact:**

`konoha_s04_root_entry_suspected`

Requires evidence that bounds a concealed site/route without exposing Root identity prematurely.

**Interior visit fact:**

`root_hq_interior_visited`

**Identity/map confirmation:**

`root_hq_exterior_location_confirmed`

Requires direct/corroborated reliable spatial evidence of the actual Root entrance. Root existence Knowledge or ANBU discovery is insufficient.

**Access:**

- exact Story temporary/escorted route;
- exact Root/authority access token or invitation where Story/world makes that possible;
- verified underground/hidden route that the current World state leaves passable;
- another authored exact access occurrence.

**Persistent return:** strongly conditional. Discovery is not clearance.

**No Arc-2 blanket unlock.**

---

## `KON-S05` — Monument Substructure

**Start state:** `UNRECOGNISED`

**Known-unknown trigger — any authored factual route:**

- structural/maintenance discrepancy beneath the Monument;
- archive/blueprint evidence showing an unaccounted sublevel;
- exact hidden-route evidence from another Konoha investigation.

Commit:

`konoha_s05_monument_substructure_suspected`

**Identity confirmation:** direct verified entrance/substructure + documentary or physical evidence that it belongs to Monument infrastructure.

Commit:

`konoha_s05_monument_substructure_identity_confirmed`

**Access:** exact maintenance/emergency/Story route; physical opening; institutional permission.

**Persistent return:** conditional.

**Boundary:** Monument Substructure discovery does not reveal ANBU HQ, Root HQ or Nine-Tails Memorial Cavity automatically.

---

## `KON-S06` — Hokage Emergency Passage

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:** crisis/emergency-route evidence, trusted Administration disclosure, or direct route observation.

Commit:

`konoha_s06_emergency_passage_suspected`

**Identity confirmation:** exact Administration emergency-route disclosure or direct mapped traversal.

Commit:

`konoha_s06_emergency_passage_identity_confirmed`

**Access:** active emergency/evacuation/Story state, explicit Hokage/Administration trust grant, or exact authorised maintenance occurrence.

**Persistent return:** normally **not general**; access expires with authority/emergency state unless later permission is authored.

---

## `KON-S07` — Sealed Uchiha Archive

**Start state:** `UNRECOGNISED`

**Known-unknown trigger — any legitimate route:**

- Uchiha history/provenance Knowledge + unexplained sealed architecture at the Uchiha remnants;
- `skill_seal_pattern_literacy` in an occurrence containing exact observable compatible seal evidence;
- trusted Uchiha/clan source or recovered document referencing a concealed archive.

Commit:

`konoha_s07_uchiha_archive_suspected`

**Identity confirmation requires:** archive provenance evidence + physical/site verification.

Commit:

`konoha_s07_uchiha_archive_identity_confirmed`

**Access:** exact key/seal method, authorised clan/institutional access, Story route, or another explicit opening occurrence.

**Persistent return:** conditional on seal/authority state.

**Boundary:** Sharingan ownership alone does not reveal/open it.

---

## `KON-S08` — Uzumaki Seal Chamber

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- Fūinjutsu/Uzumaki provenance Knowledge from exact Chronicle history;
- exact historical document/relic pointing to a Konoha seal chamber;
- compatible seal-pattern observation in the correct area;
- Hosted Entity/Jinchūriki history only where an authored event produces a legitimate chamber lead.

Commit:

`konoha_s08_uzumaki_chamber_suspected`

**Identity confirmation:** exact Uzumaki/sealing provenance + physical chamber verification.

Commit:

`konoha_s08_uzumaki_chamber_identity_confirmed`

**Access:** authorised seal key/method, exact Fūinjutsu competence where owning Skill authority permits it, institutional/lineage access, or Story route.

**Persistent return:** conditional.

**Boundary:** Hosted Entity presence, Kinjutsu Knowledge or Fūinjutsu Knowledge alone does not equal access.

---

## `KON-S09` — Hyūga Branch Record Vault

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- trusted Hyūga relationship/invitation;
- exact clan/political records discrepancy;
- branch-family history evidence from an authored occurrence.

Commit:

`konoha_s09_hyuga_vault_suspected`

**Identity confirmation:** clan-source disclosure or direct verified record-vault entry.

**Access:** Hyūga authority/trust, Story/formal investigation grant, or exact key/escort.

**Persistent return:** invitation/authority dependent.

**Boundary:** Byakugan capability alone does not reveal or authorise the vault.

---

## `KON-S10` — Aburame Black-Hive Room

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- exact insect/symbiotic anomaly recognised through authorised knowledge/capability;
- Aburame trust/invitation;
- clan-related occurrence produces a hidden-room lead.

Commit:

`konoha_s10_black_hive_suspected`

**Identity confirmation:** Aburame disclosure or direct verified chamber discovery.

**Access:** clan trust/invitation or exact Story/mission grant.

**Persistent return:** relationship/authority dependent.

**Boundary:** generic insect knowledge does not automatically reveal the room.

---

## `KON-S11` — Nara Moonlit Medicine Cellar

**Start state:** `UNRECOGNISED`

**Known-unknown trigger requires a compatible occurrence combining:**

- Medicine/herbal Knowledge or exact medical-development route;
- Nara/family/trusted-source entitlement or a legitimate cellar lead;
- **DUSK / night-context entitlement** where the authored clue depends on the moonlit access condition.

Commit:

`konoha_s11_nara_cellar_suspected`

**Identity confirmation:** direct verified cellar + Nara medicine provenance.

**Access:** invitation/key/Story route; time-of-day condition may remain relevant if authored.

**Persistent return:** conditional on trust/time/access policy.

---

## `KON-S12` — Drowned Naka Archive

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- Naka/Uchiha/Konoha historical evidence pointing to lost river records;
- water-route investigation revealing submerged masonry/structure;
- recovered water-damaged document or exact map discrepancy.

Commit:

`konoha_s12_drowned_archive_suspected`

**Identity confirmation:** physical archive verification + historical provenance.

**Access:** safe water-route/dive/low-water opening/Story access as authored.

**Persistent return:** environmental/access-state dependent.

**Boundary:** seeing the Naka River or possessing Water Affinity does not reveal it.

---

## `KON-S13` — Forgotten War Tunnel

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- veteran testimony + route corroboration;
- old war map/logistics document;
- collapsed-route evidence found in an authored investigation.

Commit:

`konoha_s13_war_tunnel_suspected`

**Identity confirmation:** direct route verification + war-era provenance.

**Access:** cleared entrance, authorised mission route, exact excavation/opening event.

**Persistent return:** conditional on structural/world state.

---

## `KON-S14` — Old Smugglers' Rootway

**Start state:** `UNRECOGNISED`

**Known-unknown trigger — any exact compatible route:**

- Tracking evidence showing repeated concealed passage use;
- underworld/criminal contact Knowledge;
- smuggling ledger/route clue;
- prior history-generated follow-up from an escaped/surviving smuggler.

Commit:

`konoha_s14_smugglers_rootway_suspected`

**Identity confirmation:** physical route continuity + smuggling provenance.

**Access:** discovered opening not currently sealed/guarded, underworld access, Story/mission grant.

**Persistent return:** conditional; route may transform/suppress after enforcement or collapse.

---

## `KON-S15` — Silent Shrine

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- contextual Genjutsu/perception anomaly;
- spiritual/shrine-history Knowledge;
- old local rumour corroborated by physical evidence;
- character/mentor route legitimately pointing there.

Commit:

`konoha_s15_silent_shrine_suspected`

**Identity confirmation:** direct shrine discovery + sufficient provenance to distinguish it from ordinary abandoned structure.

**Access:** generally physical once exact route is found unless a specific ward/event gates entry.

**Persistent return:** usually yes after mapped discovery, subject to current event/access state.

---

## `KON-S16` — Mask-Maker's Hidden Room

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- ANBU-mask provenance investigation;
- craftsman relationship/contact;
- weapon/equipment provenance or records identify impossible workshop output;
- exact False Identity/ANBU history-generated route where authored.

Commit:

`konoha_s16_mask_maker_room_suspected`

**Identity confirmation:** hidden-room discovery + mask-maker/crafts provenance.

**Access:** craftsman trust/key, investigative physical access, Story route.

**Persistent return:** relationship/ownership/occupancy dependent.

---

## `KON-S17` — Abandoned Surveillance Loft

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- Counter-Surveillance detects repeated observation geometry;
- political/institutional investigation finds old observer records;
- physical sightline/equipment trace is discovered.

Commit:

`konoha_s17_surveillance_loft_suspected`

**Identity confirmation:** direct loft entry + surveillance-use evidence.

**Access:** legal/climb/route access, exact key, Story/investigation grant.

**Persistent return:** usually yes if physically open; later event may suppress/occupy it.

**Boundary:** Counter-Surveillance alone does not spawn/reveal it without compatible occurrence evidence.

---

## `KON-S18` — Sealed Interrogation Annex

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- ANBU/Root/interrogation-document evidence;
- sealed institutional-route discrepancy;
- exact witness/history-generated lead.

Commit:

`konoha_s18_interrogation_annex_suspected`

**Identity confirmation:** exact record provenance + physical annex verification.

**Access:** institutional authorisation, exact key/seal route, Story temporary access.

**Persistent return:** strongly conditional.

**Boundary:** discovery does not prove current occupants, current interrogation activity or allegiance.

---

## `KON-S19` — White Snake Drain

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- Orochimaru-associated chemical/toxin evidence;
- unusual serpent shedding/trace in a compatible authored occurrence;
- drainage-route evidence connected to another confirmed Orochimaru provenance source.

Commit:

`konoha_s19_white_snake_drain_suspected`

**Identity confirmation:** physical route verification + sufficient provenance to identify the White Snake network/context.

**Access:** route physically open/safe enough, Story/investigation access, exact protective requirement where authored.

**Persistent return:** environmental/threat dependent.

**Boundary:** does not automatically reveal `KON-S02` and vice versa; cross-reveal requires an exact connecting occurrence.

---

## `KON-S20` — Toad Contract Waystone

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- authored Jiraiya/Toad/Summon lead;
- compatible Summon relationship/history;
- exact inscription/resonance clue recognised through authorised capability/Knowledge.

Commit:

`konoha_s20_toad_waystone_suspected`

**Identity confirmation:** direct waystone discovery + toad-contract provenance.

**Access:** physical site may become generally reachable after mapped discovery.

**Actionability remains separate:** Summon/contract interaction requires exact owning-system prerequisites.

**Persistent return:** usually yes once mapped, barring event/world changes.

---

## `KON-S21` — Nine-Tails Memorial Cavity

**Start state:** `UNRECOGNISED`

**Known-unknown trigger — any exact authored route:**

- village/Nine-Tails historical records contradiction;
- Hosted Entity/Kurama-related contextual perception where the owning capability permits only a bounded anomaly;
- monument/archive investigation;
- lineage/clan testimony with corroborating physical evidence.

Commit:

`konoha_s21_ninetails_cavity_suspected`

**Identity confirmation:** physical cavity verification + legitimate historical provenance.

**Access:** exact substructure route / Story / authorised opening.

**Persistent return:** conditional.

**Boundary:** Kurama presence does not grant a GPS coordinate, entry permission or automatic relationship consequence.

---

## `KON-S22` — Missing Names Wall

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- public memorial/name count contradicts an authoritative record;
- Shinobi Record/archive investigation finds omitted identities;
- exact participant testimony points to a concealed memorial surface.

Commit:

`konoha_s22_missing_names_wall_suspected`

**Identity confirmation:** concealed wall/panel physically verified + record provenance.

**Access:** normally investigation/admin/monument route once discovered; may require authority depending on exact host.

**Persistent return:** usually yes once mapped, subject to institutional access.

---

## `KON-S23` — False Training Boundary

**Start state:** `UNRECOGNISED`

**Known-unknown trigger requires a compatible active occurrence plus at least one exact route such as:**

- Genjutsu/perception discrepancy;
- Tracking route discontinuity;
- recurring training-history contradiction;
- authorised instructor/mentor clue.

Commit:

`konoha_s23_false_boundary_suspected`

**Identity confirmation:** boundary is actively tested/verified and shown to be a distinct concealed training construct/area.

**Access:** event/mentor/training entitlement; may be unavailable when no qualifying occurrence is active.

**Persistent return:** **not guaranteed**. The place may remain known while actionability only exists under later training/event predicates.

---

## `KON-S24` — Underground Medical Store

**Start state:** `UNRECOGNISED`

**Known-unknown trigger:**

- Hospital inventory/supply discrepancy;
- exact delivery/custody record contradiction;
- Medical/service history exposes an unaccounted storage route;
- Story/formal investigation lead.

Commit:

`konoha_s24_medical_store_suspected`

**Identity confirmation:** physical store verification + Hospital/supply provenance.

**Access:** Hospital authority/key, exact service route, Story/investigation access.

**Persistent return:** conditional on Hospital/service authority.

**Boundary:** Hospital access alone does not reveal it.

---

# 4. Location-stage projection rule

For every row above:

### No location-stage fact

- no map marker;
- no hover;
- no tooltip;
- no focus target;
- no DOM/accessibility identity;
- no invisible hitbox;
- no hidden denominator.

### `_suspected`

If the location is spatially bounded enough for map projection:

- pulsing golden halo;
- label exactly `????`;
- no canonical name;
- Event Drawer may show only observer-safe bounded clue/action.

### `_identity_confirmed` without map precision

- Shinobi Record may know the real identity;
- interactive map need not place an exact marker yet.

### `_map_position_confirmed`

- map may display the legitimate name at the exact World anchor;
- access state remains separately projected.

### `_access_authorised`

- currently legal entry/use is enabled;
- if temporary/Story-only, do not persist it as general access.

---

# 5. Event / opportunity gate after location discovery

Unlocking a location does not populate all its events.

Each hosted event still passes the generic sequence:

1. exact event definition exists;
2. causal/location/history/capability eligibility passes;
3. event enters eligible candidate pool;
4. CE/World selects among eligible candidates;
5. occurrence commits;
6. observer discovery/identity/actionability is projected;
7. outcome/history commits.

A player may therefore discover ANBU Headquarters, Orochimaru's Forgotten Laboratory or any other secret and find **nothing currently actionable** there.

That is legal World state.

---

# 6. Story access overlay

Story may provide temporary access to any location above only through an exact Story/World access grant.

Story access may bypass ordinary entry requirements for the duration of the route where authored, but it does not bypass observer Knowledge rules unless the Story occurrence explicitly commits those Knowledge facts.

Most important examples:

- ANBU/Root contained-map access does not automatically map `KON-S03`/`KON-S04`;
- Forest of Death Story access does not create permanent unrestricted access;
- Orochimaru Lab Story access would not automatically reveal every connected drainage/tunnel secret;
- loading a local map is never itself a discovery occurrence.

---

# 7. Next matrix wave

After this Konoha concealed/restricted Wave 1, World should publish the same requirements grammar for:

1. Konoha `KON-O01..O21` optional/discoverable location introduction where not already public through Story/ordinary exploration;
2. Fire `O/S/R` discovery/access states after final #55 geometry;
3. Rain/Ame;
4. Grass/Kusa;
5. Wind/Suna;
6. Earth/Iwa;
7. Water/Kiri;
8. Lightning/Kumo.

The same matrix will also be referenced by the 500+ quest reservoir so dedicated events cannot make their own ad-hoc discovery rules.

---

# 8. Production status

**Konoha v3 concealed/restricted semantic geography:** CLOSED upstream.  
**Generic unlock grammar:** CLOSED upstream.  
**`KON-S01..S24` requirements matrix:** CLOSED by this document.  
**Exact event producers for every future secret stage:** not all authored/activated yet.  
**ANBU/Root local map assets:** pending UI / Assets through coordination handoff.  
**Coding implementation:** separate.  
**Runtime validation / Golden:** separate.
