# Shinobi Chronicles — Six-Shinobi Relay Formation + Alternating Side-Turn Battle Concept Lock

**Date:** 2026-09-25  
**Owner:** CE / Codex / Coordination, preserving Combat and UI ownership boundaries  
**Status:** **DESIGN LOCKED / IMPLEMENTATION HOLD — DO NOT CODE YET**  
**Primary priority:** Finish and judge Academy Kakashi Origin Browser Golden before any implementation begins from this concept.

## 1. Purpose

Stephen has approved the high-level Battle direction after reviewing the current Shinobi Chronicles Battle screen and the Ninja Manager reference videos.

The goal is not to copy Ninja Manager's visual design. The useful lesson is its visible Battle rhythm:

~~~text
actor acts
-> target responds
-> result appears
-> power changes
-> next action begins
~~~

Shinobi Chronicles should combine that kinetic rhythm with its stronger authored Skills, Items, Summons, PL semantics, targeting, setup/control and Formation Stage.

Target identity:

> **modern + kinetic + tactical turn-based combat**

This document exists to preserve that concept now without authorising implementation.

## 2. Absolute implementation hold

**DO NOT IMPLEMENT THIS CONCEPT YET.**

Stephen is currently deciding whether Academy Kakashi Origin can become Browser Golden after the current animation/presentation work. If it does not, Kakashi may receive a major rewrite.

Therefore:

~~~text
Battle concept = DESIGN LOCKED
Battle runtime implementation = HOLD
Coding handoff = NONE
~~~

No specialist should alter current Battle turn semantics, rebuild the Formation Stage, add relay/promotion runtime, add new Battle animation, change PvP architecture or change current Kakashi Battle behaviour because of this document until Stephen explicitly releases the hold.

Current live runtime remains production authority.

## 3. Core Battle identity

Canonical concept:

> **A living six-shinobi formation, not two cards subtracting numbers from each other.**

The existing Squad Wedge remains the presentation foundation.

## 4. PvE turn rhythm

Normal PvE Battle is intended to use alternating **side action opportunities**.

The player side starts first.

~~~text
PLAYER SIDE ACTION
-> authoritative result
-> presentation / settle

ENEMY SIDE ACTION
-> authoritative result
-> presentation / settle

PLAYER SIDE ACTION
-> ...
~~~

Conceptually:

~~~text
Player
Enemy
Player
Enemy
Player
Enemy
~~~

Team size does **not** automatically create one ordinary turn per deployed participant.

A 6v6 is not a twelve-action initiative round.

The Current Actor normally spends the side's action opportunity. Explicit Skills, reactions, assists or Summons may later create exceptional opportunities if Combat separately authorises them.

## 5. Team capacity

Standard Battle team ceiling:

> **6 deployed shinobi per side**

Do not restrict the Battle team to three.

Six preserves larger Battles, roster strategy, attrition, tactical reserves, future PvP depth and future event/war-scale encounters.

## 6. Six-Shinobi Squad Wedge

A full side conceptually contains:

~~~text
                 CURRENT ACTOR

        SUPPORT    SUPPORT    SUPPORT

             RESERVE    RESERVE
~~~

Exact geometry remains UI-owned.

### Current Actor

The one participant currently taking the side's normal action opportunity and receiving confrontation focus.

### Deployed Supports

Three participants visibly deployed behind/around the Current Actor.

They are part of the battlefield and may be legal consumers of support/off-slot mechanics.

They do not automatically receive their own normal turn.

### Reserves

Two additional Battle-deployed participants positioned further back/recessed.

They remain visibly part of the six-person Battle team rather than being invisible roster entries.

## 7. Adaptive Formation Stage

Do not render meaningless empty slots.

The Formation Stage adapts to actual participants:

- 1v1: both participants receive strong confrontation prominence.
- 1v2: one side faces one Current Actor with the second enemy clearly belonging to that formation.
- 3v3: both formations fill naturally.
- 6v6: full Current Actor + 3 Supports + 2 Reserves per side.

Canonical rule:

> **The battlefield grows with the Battle. Empty team capacity is not empty visual furniture.**

## 8. Withdrawal and relay promotion

Existing Battle law remains:

> **0 Battle PL = withdrawal, not factual injury or death.**

When the Current Actor reaches 0 Battle PL:

~~~text
Current Actor withdraws
        ↓
one Deployed Support replaces the Current Actor
        ↓
one Reserve advances into the vacated Support position
        ↓
formation settles
~~~

Example:

~~~text
BEFORE

                 KAKASHI

        NARUTO    SASUKE    SAKURA

              SAI     YAMATO


Kakashi reaches 0 Battle PL


AFTER

                  SASUKE

        NARUTO      SAI      SAKURA

                    YAMATO
~~~

The formation should communicate this state change visually without explanatory prose.

### Replacement-selection rule remains OPEN

This document does not yet lock whether the replacing Support is:

- selected by the player;
- selected by authored formation order;
- selected by Combat AI/rules in particular contexts.

Combat must close that before implementation.

## 9. Formation is not hidden range

Preserve:

> **formation position != Combat range / distance / aggro / legality**

Presentation position does not independently determine legal target, damage, initiative, control or action economy.

Combat remains semantic authority.

## 10. Off-slot targeting

The formation supports legitimate mechanics that target a non-Current participant.

Approved example: **Sicklewind Route**, which can attack an enemy not occupying the Current Actor slot once per Battle, subject to its authoritative legality.

Presentation intent:

~~~text
AMT = Current Actor
PS = Deployed Support

Kakashi selects Sicklewind Route
-> legal off-slot target highlights
-> PS enters temporary confrontation focus
-> action resolves against PS
-> PS reacts
-> PS returns to support position
-> AMT remains Current Actor
~~~

Presentation never creates target legality.

## 11. Battle action presentation grammar

Every ordinary Battle action should ultimately consume the shared grammar:

~~~text
ACTOR
-> ACTION
-> TARGET
-> IMPACT / RESPONSE
-> RESULT
-> UPDATED BATTLE STATE
-> SETTLE
~~~

Example:

~~~text
KAKASHI TURN
-> Kunai Quickdraw chosen
-> Kakashi advances
-> attack presentation
-> AMT reacts
-> HIT / -5 PL
-> PL drains 18 -> 13
-> both settle

AMT TURN
~~~

Presentation makes committed Combat visible. Presentation does not decide Combat.

## 12. PL feedback

PL loss should eventually read as impact rather than bookkeeping:

~~~text
impact
-> local result indicator
-> Battle PL ring drains
-> target responds
-> new PL settles
~~~

The authoritative PL result must already exist before presentation.

## 13. Reusable Battle presentation vocabulary

Future shared visual primitives may include:

- melee advance / strike;
- projectile;
- chakra strike;
- seal/control;
- guard/block;
- substitution;
- recovery;
- condition application;
- recoil;
- Summon manifestation;
- withdrawal;
- Support promotion;
- Reserve promotion.

Do not require bespoke animation art for every Skill.

Iconic Skills may later receive bespoke presentation.

## 14. Enemy turn readability

The battlefield should make clear:

- who acted;
- which action was used;
- who was targeted;
- whether the result was HIT / BLOCK / EVADE / SUBSTITUTION / etc.;
- what PL/state changed.

The Combat Log remains detail/history, not the only readable surface.

## 15. Conditions and setup

Authoritative Battle states should eventually be projected near/on affected participants where appropriate, including examples such as:

- Wire Capture;
- guard;
- poison;
- binding;
- substitution setup;
- Clone Feint;
- buffs/debuffs;
- control state.

Visible state is presentation only and cannot become a second semantic owner.

## 16. Action dock

Existing primary dock remains:

~~~text
SKILLS | ITEMS | SUMMONS
~~~

Player turn: active.

Enemy turn: disabled/recessed/dimmed so attention returns to the battlefield.

No permanent TARGET peer button is authorised.

## 17. Target selection

If an action has one legal target, direct execution may remain valid.

If multiple legal targets exist:

~~~text
select action
-> legal battlefield targets highlight
-> player selects target
-> action commits
~~~

Combat supplies legal targets. Presentation exposes them.

## 18. Future tactical affordances — NOT Alpha commitments

The formation can support future concepts such as:

- Bodyguard Intercept;
- Medical Support;
- Formation Break;
- Forced Rotation;
- reserve pressure;
- support assists;
- off-slot control;
- Summon participation interactions.

These are design affordances only. Do not implement them from this document.

## 19. PvP direction

Future PvP should consume the same canonical Battle action protocol rather than a second Battle engine.

Conceptually:

~~~text
PvE:
Combat determines legal actions
-> enemy AI chooses one

PvP:
Combat determines legal actions
-> remote human chooses one
~~~

Shared authoritative state should eventually cover turn/action-opportunity ID, side authority, Current Actor, legal action, legal target, committed result, PL/state mutation, withdrawal, promotion and sequence order.

Client presentation must not author damage/result.

### Deferred

PvP first-turn fairness is not closed here.

The PvE rule remains: player side starts first.

Do not invent a hidden Speed/Initiative Stat merely to solve future PvP ordering.

## 20. Ownership boundary

### Combat owns

- action-opportunity legality;
- side/actor entitlement;
- legal Skills/actions;
- legal targets;
- authoritative result;
- Battle PL/state mutation;
- withdrawal;
- promotion eligibility;
- Battle completion;
- enemy AI legality.

### battle.presentation.shared owns

Canonical owner remains:

'runtime/alpha-battle-modern-33000.js'

Presentation owns:

- Formation Stage layout;
- Current Actor visual focus;
- support/reserve projection;
- action playback;
- impact/result feedback;
- PL drain presentation;
- withdrawal presentation;
- promotion presentation;
- settle-to-authoritative-state behaviour.

Presentation cannot decide semantic result.

## 21. What is DESIGN LOCKED

The following concept is now locked:

1. Squad Wedge remains the Battle formation presentation.
2. Standard Battle team ceiling is six participants per side.
3. Full formation is 1 Current Actor + 3 Deployed Supports + 2 Reserves.
4. Formation adapts to actual participant count.
5. Normal PvE uses alternating side action opportunities.
6. Player side starts first in normal PvE.
7. Team size does not create one normal turn per participant.
8. 0 Battle PL remains withdrawal, not injury/death.
9. Current Actor withdrawal causes a relay: a Support promotes and a Reserve fills the vacated Support position where available.
10. Formation position does not invent Combat range/legality.
11. Existing off-slot mechanics such as Sicklewind Route can consume the formation model.
12. Actions follow ACTOR -> ACTION -> TARGET -> IMPACT/RESPONSE -> RESULT -> UPDATED STATE -> SETTLE.
13. Battle presentation remains separate from Combat semantics.
14. Existing 'battle.presentation.shared' ownership remains canonical.
15. Future PvP should consume the same Battle semantic protocol rather than a second engine.

## 22. What remains OPEN

Do not silently decide these without owner closure:

- player-choice vs automatic Support promotion;
- reserve ordering;
- exact formation coordinates/scales;
- exact animation timing;
- generic enemy AI strategy;
- PvP first-turn rule;
- PvP timeout/disconnect handling;
- voluntary formation reordering;
- exact Summon interaction with six Character slots;
- reactions/interrupts/extra action opportunities;
- any new support/reserve mechanic not already authorised.

## 23. Release condition

This implementation hold may be released only after Stephen explicitly decides what happens with Academy Kakashi Origin following the current Browser Golden evaluation.

If Kakashi is accepted, this concept may move to Combat semantic closure and later UI/Coding implementation planning.

If Kakashi is rewritten, shared Battle implementation should wait until that rewrite scope is reconciled.

## 24. Final lock

> **Shinobi Chronicles Battle is intended to become alternating side-turn combat presented through an adaptive six-shinobi Squad Wedge: one Current Actor, three Deployed Supports and two Reserves per full team. The Current Actor spends the normal side action opportunity; team size does not create six independent normal turns. At 0 Battle PL the actor withdraws, a Support promotes, and a Reserve fills the vacated support position where available. Combat owns all factual turn/action/target/result/withdrawal legality; battle.presentation.shared makes those committed facts kinetic and readable. The concept is locked now, but implementation is explicitly on hold until Stephen completes the Academy Kakashi Browser Golden decision.**
