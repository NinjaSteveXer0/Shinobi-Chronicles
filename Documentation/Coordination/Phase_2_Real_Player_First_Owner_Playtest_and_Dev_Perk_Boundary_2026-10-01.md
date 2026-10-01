# Shinobi Chronicles — Phase 2 Real-Player-First Owner Playtest + Dev-Perk Boundary

**Date:** 2026-10-01
**Owner:** Stephen
**Coordination:** CE / Codex / Coordination
**Status:** **BINDING PHASE-2 PLAYTEST OPERATING RULE**

## 1. Core rule

Phase 2 is tested as a real game.

Stephen's ordinary browser session should behave like a legitimate player Chronicle:

`complete a real Origin -> choose a real team -> enter Konoha -> earn/spend real Ryō -> acquire real Characters/objects -> train real persistent Characters -> trigger real World/CE content -> continue the Chronicle`.

Dev tooling exists only to remove testing friction.

It must not replace the real player state.

## 2. Real-player default

Normal Phase-2 browser surfaces must use:

- Stephen's actually selected Origin;
- Stephen's actually committed current team;
- actual owned roster;
- actual Ryō;
- actual persistent Stats/PL;
- actual Inventory;
- actual Chronicle history;
- actual Knowledge;
- actual relationship/shared-history evidence;
- actual Skill/Bloodline/Hosted-Entity state.

Do not show Kage Naruto, arbitrary full-roster fixtures, or synthetic state in ordinary player mode.

## 3. Dev/owner perks are additive, not substitutive

Allowed dev conveniences may include:

- unlimited Energy;
- diagnostic eligibility view;
- temporary fast travel;
- accelerated test timers;
- test-only content activation;
- safe state inspection.

They must not silently replace:
- team;
- ownership;
- acquisition;
- Chronicle history;
- progression;
- rewards;
- relationship evidence;
- Bloodline state.

## 4. Unlimited Energy

Owner/dev unlimited Energy is authorised as a testing convenience.

It must be visibly/dev-identifiably active.

It must:
- bypass Energy cost/blocking only;
- not grant development by itself;
- not grant rewards;
- not create Chronicle events;
- not unlock Skills;
- not affect Achievements;
- not persist into normal player mode by accident.

Normal Energy QA still requires dedicated tests with the bypass disabled.

## 5. Redeem Code / Mystery Gift concept

Stephen proposes a player-facing **CODE / REDEEM CODE** feature analogous to a Mystery Gift system.

This is approved as a Phase-2 concept.

Two code classes must remain separate:

### Public promotional codes

Possible sources:
- Discord;
- community events;
- limited promotions;
- developer announcements.

May grant exact authored:
- Ryō;
- Items;
- materials;
- cosmetics/cards where Acquisition permits;
- other bounded promotional entitlements.

Requirements:
- stable code ID;
- activation window where relevant;
- claim limit;
- account/Chronicle scope;
- exact reward package;
- idempotent claim receipt;
- expiry/revocation behaviour;
- no hidden random substitution.

### Owner / developer codes

Internal testing convenience only.

May enable bounded dev perks such as:
- unlimited Energy;
- diagnostic flags;
- specific test access.

Must not be distributed as ordinary public rewards.

Public-code infrastructure must not make owner/dev bypass secrets security-critical client-side authority.

## 6. Character shop as early Phase-2 economy benchmark

Stephen already has Character Shop UI assets/concept awaiting runtime implementation.

This is a strong early economy benchmark because it can test:

`real Ryō -> purchase entitlement -> Acquisition -> Character ownership -> Codex discovery -> roster availability -> optional deliberate team assignment -> Training/World consumption`.

Preserve:

`purchase != current-team assignment`.

Buying a Character makes them owned/available according to Acquisition rules.

The player must deliberately add/assign them through the proper team/roster surface where current-stage rules permit.

Do not silently replace the current team on purchase.

## 7. Phase-2 browser evidence standard

Where practical, owner browser tests should begin from Stephen's actual Chronicle save rather than a synthetic fixture.

Automated fixture tests remain necessary for deterministic QA.

They do not replace real-player acceptance.

## 8. Final lock

> **Phase 2 is played, not merely simulated. Stephen's normal session uses his real Origin, real team, real economy and real persistent history. Dev perks may accelerate testing, but they may not counterfeit progression, ownership or Chronicle state.**
