# Shinobi Chronicles — Phase 2 Konoha Implementation Priority Order

Date: 2026-10-01
Owner: Stephen / CE / Codex / Coordination
Status: ACTIVE PHASE-2 EXECUTION ORDER

## Principle

Konoha should be implemented as a playable dependency chain, not as disconnected location screens.

Priority is based on:
- what Stephen is already actively testing;
- dependency order;
- first-hour player value;
- ability to prove real Chronicle persistence;
- avoidance of later rewrites;
- Alpha relevance.

## 1. CURRENT ACTIVE FOUNDATION — finish before broad expansion

Complete the current active Coding work:
- #431 current-team correction so Practical/Exams use the exact committed Academy squad;
- current onboarding defects / player-language polish needed for acceptance;
- Chronicle Receipt reward/development projection fixes already in the Coding loop;
- Inventory screen foundation;
- first bounded real Konoha hotspot/event implementation already requested by Stephen.

Do not open five new location builds while these are still unstable.

Acceptance result:
`real Origin -> real team -> Konoha -> Inventory -> real hotspot/event -> correct Record/Receipt projection`.

## 2. PERSISTENT DEVELOPMENT + CURRENT-TEAM TRAINING

New owner-browser evidence shows that My Clan does not yet reflect training changes. Treat this as a source-of-truth problem, not a My Clan-only cosmetic patch.

Implement #448 after #431 owner acceptance.

Targets:
- dynamic Discipline EXP -> Stat growth;
- exact current-team subject selection;
- Practical/Exams/Training persistent growth;
- derived PL recalculation;
- visible development ceilings;
- Chronicle development history;
- remove fossil `MASTERY 1 / 0 of 50` semantics.

This makes free play materially useful.

My Clan must consume the resulting canonical persistent Stats/PL and prove the trained Character's state updates without inventing a My Clan-local Stats store.

## 3. INVENTORY CORE SURFACE

Implement a bounded Inventory surface before any Shop.

Initial scope:
- persistent owned stackable Items/material quantities;
- persistent durable Weapon/Equipment instances where current authority already supplies them;
- exact source/provenance summary hooks;
- clear owned vs equipped/prepared distinction;
- save/load;
- text-first Alpha presentation;
- no invented full Loadout/Manage Shinobi system.

Inventory must consume existing ownership transactions; UI inspection never creates ownership.

This is an infrastructure surface for Shop, Crafting, rewards and later provenance.

## 4. FIRST LIVE CE / HOTSPOT BENCHMARK

CE authoring/preflight may proceed in parallel while Steps 1–3 are being stabilised.

Coding should consume one exact #432 benchmark package rather than invent generic hotspot content.

The first event must prove:
- real current team;
- participant-first Structured Autonomy;
- player choice after teammate intent;
- factual outcome/consequence;
- relationship/shared-history receipts;
- Shinobi Record update;
- save/load idempotence.

This is the first proof that Konoha is alive rather than a menu hub.

Do not activate the broad 500-seed reservoir.

## 5. KONOHA LIVE HUD

Design may proceed in parallel under:
`Documentation/Coordination/Konoha_Phase_2_Live_HUD_Minimum_Information_and_Navigation_Contract_2026-10-01.md`.

Coding implements after UI direction is approved and currentTeam / Inventory / persistent Stats projections are trustworthy.

HUD should expose compact live identity, Rank, Ryō, current team, Journey plus My Clan / Inventory / Shinobi Record access without becoming a second state store.

## 6. CENTRAL COMMERCIAL DISTRICT — FIRST REAL ECONOMY LOOP

Implement the first spending loop only after Inventory ownership/persistence is trustworthy.

Order inside this tranche:
1. Item Shop / basic consumables/materials;
2. Character Card Shop / Acquisition;
3. deliberate roster/team assignment after purchase.

Required proof:
`Origin/World reward Ryō -> shop purchase -> ownership -> Inventory/Codex -> deliberate use/assignment -> save/load`.

Preserve:
`purchase != ownership until transaction commits != current-team assignment`.

Use a deliberately small Alpha catalogue first.

## 7. HOKAGE ADMINISTRATION + MISSION ASSIGNMENT / MAIN STORY FRONT DOOR

Upgrade Hokage Administration / Mission Assignment Hall into the proper institutional Story/mission hub.

Primary value:
- Main Story entry/continuation;
- formal mission assignment;
- examiner/institutional conversations;
- current Journey projection;
- future World/CE mission hooks;
- Shinobi Record linkage.

Do not turn the Hokage Office into a generic vendor/service menu.

This tranche should help move Arc 1 real-browser integration forward rather than becoming decorative UI.

## 8. ARENA v2 + CE-DRIVEN PROMOTION

Arena is strategically important but must wait until the current Promotion design is closed through #446.

Then replace the flat assessment-panel experience with:
- Rank Promotion gateway;
- real World/Hotspot assessment;
- participant-first team autonomy;
- hidden New-Game-seeded requirements;
- CE multi-scene mission;
- hidden Rank evaluation;
- success/unsuccessful routes;
- full Promotion Chronicle Receipt;
- existing Genin roster transition.

Do not polish the current single-screen Promotion flow as though it were final.

Arena Battle / Staged Battles / Village Tournament remain separate Arena lanes and can be activated incrementally after the main shell is coherent.

## 9. PROVENANCE FOUNDATION + FORGE / CRAFTING

Activate #148 only after Inventory + first economy transaction are proven.

First benchmark objects:
- rewarded Academy Training Tantojutsu object / exact existing benchmark;
- one shop-bought durable weapon;
- one Forge-created durable weapon.

Then implement:
- deterministic recipe operation;
- materials + Ryō;
- stable durable object instances;
- modification/reforge semantics;
- provenance projection;
- Inventory integration;
- Shinobi Record Creations/Codex link.

Do not bulk-enable the item catalogue.

## 10. FŪIN CRAFT

Implement after ordinary durable-object/provenance infrastructure is proven.

Keep distinct from Forge:
- create seal != attach seal;
- Fūinjutsu Knowledge != Access != Competence != Mastery;
- valid host-object compatibility;
- one live Alpha attachment by default;
- exact source-owned effects;
- provenance + save/load.

Fūin Craft should reuse proven object-instance and Inventory transaction infrastructure rather than inventing a second ownership model.

## 11. HOSPITAL

Implement when there is a real persistent treatment/recovery state worth consuming.

Initial Alpha Hospital should be small and truthful:
- treatment service host;
- compatible status-treatment routes;
- relevant medical Items/consumables where vendor authority is explicitly closed;
- Chronicle/mission/Arc 1 hospital interactions.

Do not fabricate a giant medical economy or sell every catalogue medicine merely because the catalogue contains it.

Hospital should become earlier only if active World/Main Story testing creates a concrete recovery blocker.

## 12. BATH HOUSE / HOT SPRINGS + SOCIAL CHRONICLE HUB

Implement after the first CE/participant-first/relationship-history loop is proven.

Primary purpose:
- social encounters;
- teammate/NPC conversations;
- relationship/shared-history events;
- rumours/gossip;
- mentor/contact opportunities;
- Chronicle Pulse-friendly recurring social content.

Do not turn Hot Springs into a generic healing service by default.

Sakura Garden / Bath quarter should become a showcase for CE social history rather than a stats menu.

## What is intentionally not in the first Konoha order

Do not prioritise ahead of the above:
- Energy tuning;
- broad Genin Difficulty;
- full five-element training tree;
- every Crafting recipe;
- every Konoha optional/secret location;
- all 500 World seeds;
- broad achievement catalogue;
- full Codex visual completion.

Those may activate when their dependencies become real.

## Reordering rule

This order is not sacred if a real browser blocker appears.

A lower item may move earlier only when:
- it blocks a higher item;
- current Main Story testing requires it;
- Stephen explicitly changes priority;
- an owner contract closes earlier and produces a clear low-risk win.

Do not reorder simply because a later screen is visually exciting.

## Final lock

> Build Konoha as a living playable loop: real team -> real event -> persistent growth -> real spending/ownership -> Story/mission institution -> Promotion -> provenance/crafting -> specialist services -> social world. Each tranche should prove an end-to-end Chronicle consequence before the next large surface expands.