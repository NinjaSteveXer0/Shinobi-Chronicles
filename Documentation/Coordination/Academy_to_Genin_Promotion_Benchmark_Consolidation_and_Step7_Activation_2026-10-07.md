# Shinobi Chronicles — Academy → Genin Promotion Benchmark Consolidation and Step-7 Activation

**Date:** 2026-10-07  
**Owner:** CE / Codex / Coordination  
**Tracker:** #446  
**Consumes:** Rank #445/#447, Writing #450 / PR #558  
**Status:** **CE DESIGN CONSOLIDATION CLOSED — STEP-7 DOWNSTREAM IMPLEMENTATION PACKAGES STILL REQUIRED**

---

## 1. Purpose

This document completes the CE / Codex / Coordination consumption requested by #446 after Writing returned the first production Academy → Genin Promotion benchmark.

It consumes:
- `Documentation/Rank/Academy to Genin Variable Promotion Requirement Packages 2026-10-01.md`;
- `Documentation/Rank/Academy to Genin Promotion Package New Game Seed Amendment 2026-10-01.md`;
- `Documentation/Coordination/Academy_to_Genin_CE_World_Promotion_Assessment_Phase_2_Direction_2026-10-01.md`;
- `Documentation/Story/Academy_to_Genin_Missing_Field_Courier_Benchmark_2026-10-06.md`;
- Writing merge `73425e0fa9d4556ad85ef9c0b775704ffc84f112`.

This closes the CE design-consumption gap. It does **not** claim World/Rewards, Combat, UI or Coding implementation.

---

## 2. Exact first benchmark

Assessment family:

`academy_to_genin_field_readiness_assessment`

First benchmark scenario:

`academy_genin_missing_courier_dispatch_v1`

Player-facing mission identity:

> **Locate the missing field courier, recover the sealed dispatch, and return it to the examiner.**

Source-grounded route:

`KON-P01 -> KON-P10 -> whisper_woods -> fire_whisper_woods_north_ravine -> KON-P10 -> KON-P01`

The North Ravine is reused as geography only.

Promotion must not activate, duplicate or rewrite the existing Arc-1 North Ravine major-contact occurrence.

Canonical:

> **location identity != occurrence identity.**

---

## 3. Rank package contract consumed without change

Academy → Genin retains:
- mandatory mission objective completion;
- `mission_comprehension`;
- `judgement_under_pressure`;
- exactly two package-selected secondary domains;
- safety/integrity abort/disqualification boundary.

The initial six package IDs remain exactly:
- `academy_genin_fr_pkg_information_team_v1`;
- `academy_genin_fr_pkg_information_combat_v1`;
- `academy_genin_fr_pkg_information_objective_v1`;
- `academy_genin_fr_pkg_team_combat_v1`;
- `academy_genin_fr_pkg_team_objective_v1`;
- `academy_genin_fr_pkg_combat_objective_v1`.

Package identity remains rooted in:

`immutableChronicleSeed + stableCharacterId + academy_to_genin -> promotionRequirementPackageId`

Retry, alternate assessment, failure, withdrawal, team change, discovery, satisfaction, UI, save/load and refresh do not reroll it.

---

## 4. First scenario supports all six packages

Writing's benchmark deliberately provides legitimate evidence opportunities for all six readiness domains:
- `mission_comprehension`;
- `judgement_under_pressure`;
- `information_use`;
- `team_coordination`;
- `combat_readiness`;
- `objective_protection`.

Therefore the first benchmark supports all six current Academy → Genin package IDs.

Canonical:

> **evidence opportunity != evidence satisfaction.**

Writing does not define Rank weights/counts or Promotion success.

---

## 5. Exact meaningful decision seams consumed

Initial search:
- `agen_m01_search_follow_fresh_sign_v1`;
- `agen_m01_search_check_waypoint_v1`.

Immediate priority:
- `agen_m01_priority_secure_dispatch_v1`;
- `agen_m01_priority_stabilize_courier_v1`;
- `agen_m01_priority_cover_approach_v1`.

Hostile contact:
- `agen_m01_contact_hold_line_v1`;
- `agen_m01_contact_extract_under_cover_v1`;
- `agen_m01_contact_use_ravine_route_v1`.

At authored participant-first seams:
1. due teammate intent/reaction resolves first;
2. observer-safe participant stance is projected where perceivable;
3. then the protagonist/player chooses their own intent.

Player choice does not command teammates.

---

## 6. Hidden readiness / examiner / Assessment Record remains closed

The four stable readiness slots remain:
- `academy_genin_req_mission_comprehension`;
- `academy_genin_req_judgement_under_pressure`;
- `academy_genin_req_secondary_1`;
- `academy_genin_req_secondary_2`.

Truth and Knowledge remain independent:
- hidden + unsatisfied;
- hidden + satisfied;
- revealed + unsatisfied;
- revealed + satisfied.

Hidden projects as `??????`.

Never expose normal-player:
- package ID;
- hidden domain identity;
- evidence counts/weights;
- examiner score;
- pass probability;
- hidden satisfaction state.

The Assessment Record is a read-only projection, not the gameplay and not a state owner.

---

## 7. Battle / failure integration

Battle is optional in the benchmark.

Preserve:
- Battle victory != Promotion;
- Battle loss/withdrawal != automatic assessment failure;
- mission objective failure != erased Chronicle history;
- dispatch/courier/team state after Battle determines whether Story can continue;
- legitimate Battle, Knowledge, Development, participant and relationship history persists even on an unsuccessful assessment.

The occurrence-local hostile Story/World ref does not author a Combat package by itself.

Combat must supply an exact legal opposition/Battle package before runtime may open that Battle seam.

---

## 8. Promotion Chronicle Receipt

Every terminal assessment attempt must project a read-only Promotion Chronicle Receipt from committed facts.

Where non-empty and observer-safe, preserve sections equivalent to:
- **YOUR DECISIONS**;
- **TEAM / PARTICIPANT ACTIONS**;
- **WHAT HAPPENED**;
- **PROMOTION RESULT**;
- **HISTORY CREATED**;
- **DEVELOPMENT / EVIDENCE**;
- **REWARDS**;
- **NEWLY ACTIONABLE**.

Reward projection must consume exact committed reward transactions from World / Missions / Events / Rewards authority.

Writing does not set reward amounts in the benchmark contract.

Receipt opening/reopening never grants, rerolls or recommits anything.

---

## 9. Retry / alternate assessment

Retry creates a new assessment occurrence/attempt.

It does not:
- reroll the immutable Promotion package;
- erase the previous attempt;
- duplicate previous one-shot consequences;
- turn UI activity into a Chronicle Pulse.

An alternate assessment scenario must support the already-fixed package.

Scenario selection cannot participate in package selection.

---

## 10. Step-7 downstream ownership sequence

The CE/Rank/Writing design layer is now sufficiently closed to stop treating #446 as an unresolved design blocker.

However Step 7 is **not implementation-ready from CE alone**. Exact downstream owner packages remain:

### World / Missions / Events / Rewards
Must close:
- formal Promotion occurrence registration/host/actionability on the existing Konoha/Whisper Woods geography;
- courier/dispatch World-state and custody integration where not already covered by Story-local refs;
- hostile-pressure occurrence eligibility/World transition;
- exact mission reward package / visible player-facing reward causes;
- return/debrief World handoff.

### Combat / Skills / Items / Weapons
Must close only the optional Battle seam actually used by this scenario:
- exact hostile opposition package;
- exact Battle caller/return envelope;
- post-Battle factual state projection required by Story;
- no Battle-victory-to-Promotion collapse.

### UI / Assets
Must close:
- Arena -> Promotion inspection / explicit attempt-commit presentation;
- compact Assessment Record presentation;
- hidden/revealed slot visual grammar;
- Promotion result/Receipt presentation;
- real World/Story mission remains the primary gameplay, not a checklist panel.

### Coding / Runtime
Consumes the closed packages and implements:
- immutable package derivation/persistence;
- attempt/scenario occurrence lineage;
- participant-first seams;
- World/Story/Battle return flow;
- Rank evidence/result integration;
- Receipt/Record projection;
- save/load/idempotence/no-reroll;
- success -> existing Genin roster transition.

---

## 11. Activation / sequencing

Current master implementation sequence remains #449.

This closure does **not** interrupt the currently active earlier Konoha First-Hour tranche merely because Promotion design is now ready to advance.

When #449 reaches **Step 7 — Arena v2 / Promotion**, CE / Coordination should route the next exact owner package rather than asking Stephen to reconstruct #446.

Until then:

**Promotion design = CLOSED enough for activation.**  
**World/Combat/UI packages = NOT YET CLOSED.**  
**Runtime implementation = NOT DONE.**  
**Owner browser / Golden = NOT DONE.**

---

## Final lock

> **The first Academy → Genin Promotion benchmark is now a closed CE/Rank/Writing mission contract: one immutable playthrough requirement package, one real World assessment occurrence, participant-first team autonomy, hidden institutional evaluation, meaningful unsuccessful history, and a truthful Promotion Chronicle Receipt. Step 7 now waits on exact World/Rewards, optional Combat, UI and runtime implementation packages — not on further Rank or Writing design.**
