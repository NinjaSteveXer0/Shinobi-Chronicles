# Shinobi Chronicles — Academy Mirai Disguised Instructor Battle Portrait Production Spec

**Date:** 2026-09-29  
**Owner:** Character Creation / Visuals  
**Status:** **BATTLE PORTRAIT ABSENT — CREATION REQUIRED**  
**Handoff:** #420

## 1. Purpose

Define the exact production identity and presentation contract for the missing Battle/UI portrait used by Academy Mirai's optional PL Battle against the disguised instructor.

This document does **not** author a new participant, rewrite Story, change Combat numerics, change Registry identity, or reveal hidden Story truth early.

## 2. Stable participant

Internal participant:

`academy_mirai_origin_instructor`

Underlying World identity:

- female Academy instructor;
- one stable participant / one PL ledger;
- formal Rank unknown and must not be inferred.

Pre-reveal observer-facing presentation during the authorised Battle:

- **male Traveller / Escort disguise**;
- player-facing Battle presentation must preserve the apparent male Traveller/Escort;
- Battle UI must not reveal `Academy Instructor` before the authored Story reveal.

After Story performs the disguise reveal, presentation returns to the approved female instructor NPC representation.

## 3. Current exact Story visual anchor

Primary pre-reveal visual anchor:

`NPC/traveller.png`

Current live blob:

`2f8849c0f1e00f251a87b671f602a7dbc90b7188`

Writing-GOLDEN visual description:

- adult male Traveller;
- travel bag over one shoulder;
- dust on his sandals;
- easy smile during ordinary escort scenes.

During the confrontation/Battle escalation, the smile is allowed to fall away and the expression may become focused/guarded, but the apparent Traveller identity must remain intact.

Do **not** use:

- `NPC/mirai_instructor.png` for the pre-reveal Battle;
- `NPC/mirai_checkpoint_instructor.png`;
- a female instructor portrait;
- `Enemies Portraits/escort_breaker.png` or any unrelated reusable opponent;
- a generic Academy instructor;
- an NPC Character Card as a runtime Battle portrait substitute.

## 4. Live audit result

Audited current `main` plus current relevant Coding/Mirai branches.

Present:
- `NPC/traveller.png`
- `NPC/escort.png`
- `NPC/mirai_instructor.png`
- `NPC/mirai_checkpoint_instructor.png`
- unrelated `Enemies Portraits/escort_breaker.png`

Absent:
- no exact approved square Battle/UI portrait for the Mirai apparent Traveller / disguised instructor under `Portraits/`;
- no alternate committed Mirai Traveller/Escort Battle portrait found on the current Coding #105 branch or the prior Mirai presentation branch.

Therefore:

> **BATTLE PORTRAIT ABSENT — CREATION REQUIRED**

## 5. Required asset class

Create a purpose-composed Shinobi Chronicles Battle/UI portrait.

Hard asset contract:

- **1024 × 1024**
- square
- frameless
- no Character Card border
- no icon
- no title
- no nameplate
- no text
- no baked UI
- not a crop of `NPC/traveller.png`
- same approved apparent Traveller identity

Recommended production path once created:

`Portraits/Others/mirai_disguised_instructor.png`

Final path remains Assets-owner authority at commit time; consumers must use the committed path exactly.

## 6. Visual identity lock

The portrait must read as the same male Traveller seen in the approved Story card, not as a new male character.

Preserve:
- adult male apparent identity;
- same facial identity;
- same hair;
- same clothing language;
- same travel-bag / traveller visual cues where composition allows;
- same ordinary civilian/escort disguise logic.

Battle-state adjustment is presentation-only:
- expression becomes focused, guarded, observant or mildly testing;
- posture becomes battle-ready enough to support the controlled assessment;
- disguise remains convincing;
- do not visually leak the female instructor beneath the disguise.

The participant is capable enough to perform the closed Combat package:
- Testing Strike;
- Substitution Guard;
- Turning Sweep.

Do not encode formal Rank, clan identity, hidden instructor insignia or a female silhouette.

## 7. Composition direction

Purpose-composed Battle portrait:
- head-and-upper-body dominant;
- three-quarter angle preferred;
- strong small-scale readability;
- controlled assessment energy rather than lethal-villain framing;
- apparent Traveller should look like he has stopped being casual and is now testing Mirai.

Visual verb:

**TEST / GUARD / TURN**

The portrait should feel consistent with the Story beat where the Traveller's smile has faded and confrontation has escalated, while still preserving the disguise.

## 8. Knowledge / reveal firewall

Before reveal, Battle presentation may use:
- `TRAVELLER`
- `ESCORT`
- male pronouns where Story currently requires them.

Before reveal, Battle presentation must not use:
- Academy Instructor;
- female pronouns;
- female instructor portrait;
- any asset detail that exposes the substitution.

World identity != observer Knowledge != presentation.

## 9. Generation lock

No image may be generated from this production spec unless Stephen uses the exact phrase:

`generate now`

Until then this remains a production-ready asset specification only.

## 10. Acceptance

Battle portrait is complete only when:

1. exact 1024×1024 frameless asset exists;
2. it visually matches `NPC/traveller.png`;
3. it preserves the male disguise;
4. it does not reveal the instructor;
5. exact committed repository path/blob are recorded;
6. Coding consumes the committed Battle portrait rather than the NPC card;
7. Browser presentation is later validated separately.

Design/spec closed != image generated != committed != runtime validated != Golden.
