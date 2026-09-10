# Shinobi Chronicles — World Content Expansion, Visual Hosting and Special Unlock Proposal

**Date:** 2026-09-10  
**Owner:** World / Missions / Events / Rewards  
**Status:** **WORLD PRODUCTION PROPOSAL / CROSS-OWNER CLOSURE REQUIRED WHERE NOTED**

## 1. Purpose

This document records the World-facing production requirements created by the seven-village + seven-regional-map free-play expansion and the new 500-seed quest/event reservoir.

It deliberately separates:

- stable geography from current event;
- World hosting from UI presentation;
- reward entitlement from Item/Weapon/Skill/Summon ownership;
- Chronicle history from morality scoring;
- representation eligibility from Character ownership/admission;
- Hosted Entity relationship from Jinchūriki fusion/binding;
- dedicated representation from additive PL.

Nothing in this proposal authorises another owner to infer mechanics from scenery or names.

---

# 2. Exact Konoha vocabulary to preserve

Current Konoha calibration vocabulary is:

- **Forest of Death Entrance / Training Ground 44**;
- **Orochimaru's Forgotten Laboratory**;
- **ANBU Headquarters Entrance**;
- **Root Headquarters Entrance**.

For player-facing dedicated interiors, the natural short display names may be:

- Forest of Death / Training Ground 44;
- Orochimaru's Forgotten Laboratory;
- ANBU Headquarters;
- Root Headquarters.

`Orochimaru's Forgotten Laboratory` is the current calibrated authoring identity. Do not silently rename it to `Abandoned Laboratory`, although descriptions may accurately call it abandoned/forgotten.

Other Konoha concealed locations with strong potential to need dedicated or reusable interior scenes include, where activated:

- Monument Substructure;
- Hokage Emergency Passage;
- Sealed Uchiha Archive;
- Uzumaki Seal Chamber;
- Hyūga Branch Record Vault;
- Aburame Black-Hive Room;
- Nara Moonlit Medicine Cellar;
- Drowned Naka Archive;
- Forgotten War Tunnel;
- Old Smugglers' Rootway;
- Silent Shrine;
- Mask-Maker's Hidden Room.

This list is **not** an instruction to build one bespoke full-screen UI per secret. UI / Assets should prefer reusable environment families and only create a dedicated location shell/interior when repeated gameplay, unique navigation or strong spatial identity genuinely requires it.

---

# 3. UI / Assets — dedicated location visual needs

## Alpha / near-Alpha high-value dedicated environments

UI / Assets should plan reusable environment masters for:

1. **Forest of Death / Training Ground 44**
   - gate/exterior threshold;
   - dense interior forest;
   - clearing/trial area;
   - restricted-survival atmosphere;
   - no baked current participant, corpse, trap result or Story damage.

2. **Orochimaru's Forgotten Laboratory**
   - concealed approach/entrance;
   - abandoned experimental corridor/chamber;
   - storage/workbench/archive variant;
   - atmosphere should communicate age, neglect and disturbing prior use without baking a current criminal occupant or event result.

3. **ANBU Headquarters**
   - secure entrance/transition;
   - briefing/operations chamber;
   - records/intelligence room where useful;
   - concealed nature preserved before legitimate access.

4. **Root Headquarters**
   - separate visual identity from ANBU;
   - hidden access/transition;
   - underground operations/training/interrogation-capable rooms;
   - no assumption that Root is currently publicly known or accessible.

5. **Uzumaki Seal Chamber**
   - high-value Fūinjutsu/provenance environment;
   - reusable for sealing history, research and future hosted-entity/Jinchūriki-related content only where exact authority permits.

6. **Sealed Uchiha Archive / clan archive family**
   - reusable records/vault environment rather than one Story-specific tableau.

7. **Underground archive / tunnel / drainage family**
   - capable of covering Drowned Naka Archive, Forgotten War Tunnel, emergency passages, maintenance routes and similar event geography through safe visual variants.

Dedicated environment art must not disclose a secret before observer Knowledge authorises its presentation.

---

# 4. UI / Assets — reusable conversation / event scene environment library

The seven villages and seven regional maps need a reusable **scene-environment kit**, not hundreds of bespoke backgrounds.

Current Scene Environment standard remains **1920×1080 dialogue-safe**.

Current Alpha temporal bands remain:

- `DAY`
- `LATE AFTERNOON`
- `DUSK`

A later-time version of the same environment is presentation variation, **not a new semantic location**.

## Recommended reusable environment families

### Village / institutional
- village main street;
- market / commercial lane;
- residential lane / rear courtyard;
- narrow alley / service route;
- rooftop / elevated overlook;
- administration / mission office;
- records archive / library;
- Academy classroom / hall;
- examination hall/archive;
- general training ground;
- weapons range;
- practical compound;
- hospital / clinic room;
- hospital courtyard;
- forge / crafts workshop;
- Fūin craft / sealing workspace;
- village gate / checkpoint;
- shrine / memorial terrace;
- cemetery / memorial field;
- holding / interrogation-capable room where authorised;
- inn / teahouse / ordinary meeting interior.

### Regional / natural
- open forest;
- dense/deep forest;
- woodland clearing;
- road / trail / fork;
- riverbank;
- lake shore;
- bridge / crossing;
- waterfall basin;
- cave / cavern;
- tunnel / drainage route;
- ruins / abandoned compound;
- farm / field / rice terrace;
- grassland / meadow;
- marsh / reed wetland;
- desert / dunes;
- rocky badlands;
- canyon / ravine;
- mountain ridge / pass;
- high plateau;
- coast / beach;
- harbour / dock;
- island landing / channel;
- border post / watchtower;
- caravan camp / roadside camp.

### Country-specific reusable families
- **Rain:** rain-soaked tower street, canal/service bridge, industrial waterworks, drainage tunnel, flooded lower district, elevated walkway. Rain should normally read as genuinely rainy/wet unless an exact authored condition says otherwise.
- **Grass:** overgrown path, reed wetland, mossed ruin, river crossing, medicinal/botanical clearing, concealed shinobi structure.
- **Mist/Water:** fog-capable harbour/channel/island/woodland environments.
- **Lightning:** cloud-line ridge, suspension bridge, high-lake/waterfall and mountain settlement environments.
- **Earth:** quarry/mine, canyon bridge, plateau settlement and rock-tunnel environments.
- **Wind:** dune road, canyon gate, oasis, caravan stop and sandstone settlement environments.
- **Fire:** forest road, river network, pilgrim route, settlement edge and Konoha-outskirts environments.

## Reuse rules

- do not bake event-specific corpses, current enemies, loot, evidence, destruction, markers, text or canonical secret labels into the reusable base master;
- reusable weather/lighting overlays or variants are preferred where practical;
- current World occurrence may add contextual props/VFX without mutating base geography;
- same environment can host Story, Formal Mission, World Event, Side Occurrence, Investigation, training or ordinary conversation when causally legitimate;
- environment art never creates discovery, Knowledge or event eligibility;
- secret environment existence does not create map hover/focus/DOM leakage before discovery.

---

# 5. 500 World quest/event/opportunity seed reservoir

World has begun a 500-seed reservoir covering all fourteen interactive surfaces.

Index authority:

`Documentation/World/World_Quest_Seed_Catalogue_v0.1_INDEX.md`

Index commit:

`23a4b76c4b0f3e3fb758b2d7ce723e54f2ff1146`

Distribution target:

- 35 seeds × 7 Hidden Villages = 245;
- 35 seeds × 7 regional maps = 245;
- 10 cross-map Chronicle chains = 10;
- total = **500**.

These are authored **content seeds**, not a demand to machine-integrate 500 quests before Alpha.

Activation strategy should prefer a coherent Alpha slice, with additional authored seeds held in reserve. The world should remain meaningfully playable when a player deliberately ignores Story progression.

## Content families

The reservoir deliberately spans:

- Civic Requests;
- Training Opportunities;
- Service Matters;
- World Events;
- Investigations;
- Character Matters;
- Formal Missions;
- Threats;
- Discoveries;
- Recognition opportunities;
- Side Quests;
- cross-map Chronicle Chains.

## CE identity / decision recording intent

Activated content should frequently produce attributable history for choices such as:

- intervene / observe / report / walk away;
- take custody / leave in place / notify / trace provenance;
- confront / negotiate / shadow / bypass;
- rescue / pursue / protect objective / preserve evidence;
- reveal / conceal / share / retain information;
- accept / decline / defer / leave unresolved;
- use specialist competence / choose ordinary method;
- credit another participant / accept credit / remain anonymous;
- spare / capture / release / kill only where factually/legal resolution permits;
- finish assigned objective / pursue an optional thread;
- keep material / surrender it / return it / investigate its source.

Non-action is not a morality penalty. It may legitimately preserve another actor's autonomy, allow an event to proceed, close an opportunity, alter who receives credit, or create a later consequence. CE should record what happened rather than convert every choice to good/bad points.

---

# 6. Reward/source placement bridge — multi-owner work required

Current Combat catalogue authority contains hundreds of authored Skills, Items, Weapons, Gear and Materials, but catalogue membership does **not** place them in the world or grant ownership.

World needs an explicit placement bridge allowing eligible catalogue definitions to be sourced through:

- mission reward pools;
- occurrence-specific recovery;
- shops/services;
- Forge recipes;
- Fūin Craft recipes;
- training/mentor opportunities;
- investigation discoveries;
- hidden caches/archives;
- defeated/captured opposition only where factual custody permits;
- institutional issue/requisition;
- rare Chronicle recognition;
- regional materials;
- special-location opportunities.

The owning Combat / Skills / Items / Weapons / Summons domains must identify which definitions are eligible for which source families and any exact prerequisites. World then authors occurrence-specific entitlement and location/context.

Preserve:

- catalogue != ownership;
- eligible source != guaranteed grant;
- enemy defeated != automatic loot explosion;
- material recovered != recipe knowledge;
- weapon ownership != proficiency;
- Skill knowledge != Skill Access/Competence;
- Summon encounter != contract/ownership;
- rarity != automatic reward quality score.

---

# 7. Special Character Card / representation unlock hooks

World should be allowed to author opportunities whose factual outcomes make a player **eligible to be considered** for a special Character representation, without directly minting the card.

Potential World-originating representation hooks include:

- completing a significant personal Chronicle chain tied to the represented identity;
- preserving or recovering a representation-defining relic/document/source;
- establishing a rare mentor/relationship/shared-history condition;
- surviving and resolving a unique transformation/Hosted Entity occurrence;
- discovering a sealed archive or proving lineage/history;
- completing a village recognition/service chain;
- reconciling two or more independent historical prerequisites;
- achieving a distinct route outcome without requiring a morality score;
- forming a recognised Chronicle Echo/composite history where CE/Registry authority permits it.

World emits exact history/evidence/eligibility facts. Character Creation / Registry / Acquisition decide whether a representation exists, its visual authority, admission, and ownership transaction.

A player who takes another legitimate route should receive different Chronicle value; they are not punished simply because one special card did not become eligible.

---

# 8. Origin Character representation upgrade location — World proposal

## Proposed service/location

**Shinobi Record Archive — Legacy Chamber**

Initial Konoha host recommendation:

**Hokage Administration / Shinobi Record Archive** as a semantic interior/service location.

Other villages may expose equivalent institutional Record/Legacy chambers later without implying identical architecture.

## Function

This is **not** a magical machine that increases Base PL because the player clicks it.

Its job is to:

1. read already-authorised Chronicle/Progression/Registry eligibility;
2. present that the Origin character has qualified for a stronger dedicated representation;
3. conduct the owning-system confirmation/registration ceremony or archival recognition;
4. trigger the exact Acquisition/Registry transaction only after those owners authorise it;
5. preserve the earlier representation and its history rather than rewriting the same card in place.

This can support future Origin-specific upgrades such as `resonant_menma` where exact requirements are eventually satisfied, but it must be generic enough for every Origin.

Required cross-owner decisions:

- whether every Origin receives at least one stronger representation;
- exact eligibility model per representation;
- whether upgrade is replacement, additional selectable representation, or both under Acquisition authority;
- exact Stats/Base PL of the new representation;
- whether current formal Rank projects unchanged;
- exact Skill/Hosted Entity/source prerequisites;
- whether village access is required or alternate rogue/neutral recognition routes exist.

Preserve:

- Origin person != representation;
- stronger card != second person;
- representation unlock != Promotion;
- representation unlock != automatic relationship/mastery;
- Archive visit != eligibility creation;
- old representation history is not deleted.

---

# 9. Jinchūriki binding / fusion location — World proposal

## Existing physical candidate

Use the already-reserved World secret:

**`world:S05` — Jinchūriki Temple**

as the preferred physical locus for a future Jinchūriki binding/fusion rite **if CE / Registry / PL / Acquisition / Progression / Combat confirm that this does not contradict current Hosted Entity doctrine**.

Do not invent a second temple unless the semantic review proves one is required.

## Important terminology question

Current CE doctrine explicitly preserves:

- co-hosting != fusion;
- Hosted Entity != host person;
- presence != ownership/access/control/cooperation/mastery;
- Hosted Entity PL != host PL;
- dedicated representation Stats must not be obtained by adding host + beast PL.

Therefore the project-owner phrase **Jinchūriki fusion** requires exact cross-owner definition before runtime implementation.

Possible interpretation to evaluate:

`Jinchūriki Temple rite`
→ validates character + exact Tailed Beast + Fūinjutsu/ritual requirements + current source state
→ establishes or transforms an authorised Hosted Entity / vessel relationship
→ may create eligibility for a dedicated Jinchūriki Character representation
→ dedicated representation receives one exact Registry/PL package
→ does NOT merge historical identities or add two PL ledgers.

CE must decide whether the production term should remain `fusion`, become `binding`, `vessel rite`, or have separate meanings.

## Requirements that owners must close

At minimum determine:

1. exact eligible host/Character conditions;
2. exact eligible Tailed Beast identity and whether it must be owned, encountered, captured, contractually available, cooperative, controlled, or some other exact state;
3. whether every beast can bind to every host or only authored combinations;
4. required Fūinjutsu Knowledge / Access / Competence / ritual source;
5. any Rank, Progression, History, relationship or recognition gate;
6. whether willing and coercive routes exist and how their consequences differ without morality scoring;
7. exact Hosted Entity relationship created/changed;
8. exact representation created/unlocked, if any;
9. exact dedicated Base Stats / Base PL and source-overlap rules;
10. exact Skills/techniques that become eligible versus immediately usable;
11. exact Acquisition/ownership transaction and idempotence;
12. failure/interruption/decline outcomes and retained history;
13. save/load/retry semantics so a rite cannot duplicate a Beast, host relation or card;
14. observer Knowledge requirements for discovering and accessing Jinchūriki Temple itself.

## Reward/value principle

A player declining or failing to pursue Jinchūriki binding is not mechanically punished. That Chronicle may gain or preserve different access, relationships, techniques, reputational evidence, items, alliances, independence, or alternative representation routes.

---

# 10. Production order

Recommended sequence:

1. finish current Konoha v3 geometry/source binding;
2. close reusable UI environment requirement and start high-value scene masters;
3. close CE interpretation of Origin representation evolution + Jinchūriki fusion/binding;
4. receive catalogue/source eligibility from Combat/Items/Weapons/Skills/Summons;
5. receive representation/card eligibility contract from Character Creation/Registry/Acquisition;
6. activate the first coherent World content wave from the 500-seed reservoir;
7. bind exact coordinates, participants, rewards and consequence addresses per activated occurrence;
8. Coding implements through existing World/Event/Reward architecture;
9. runtime/save-load/browser/Golden validation remains separate.

---

# 11. Non-collapse summary

- location != event != opportunity;
- scene background != semantic location authority;
- unknown != known-unknown != discovered != actionable;
- reward entitlement != reward grant;
- catalogue != ownership;
- Knowledge != Access != Competence != Power != Mastery;
- special-card eligibility != ownership;
- representation != persistent person;
- representation unlock != Promotion;
- Hosted Entity != host;
- Tailed Beast unlocked/known != host relationship;
- co-hosting != fusion by current authority;
- dedicated Jinchūriki representation != additive host + beast PL;
- World hosts context; it does not seize Registry/PL/Acquisition/Progression/Combat authority;
- authored != implemented != runtime validated != Golden GREEN.
