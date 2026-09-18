# Shinobi Chronicles — RESET v2 Source 08 Proposal: Pakkun / Kakashi Ninken Family

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **SIGNED OFF / BINDING COMBAT CALIBRATION — SOURCE 08 CLOSED UNDER RESET v2**  
**Parent:** #235  
**Source baseline:** `13dec46d50761e0bf190d354b61865ce5db5db7f`  
**Global mechanics standard:** `Documentation/Combat/SC_Combat_Unique_Shinobi_Chronicles_Mechanics_Design_Standard_2026-09-19.md`

## A. Pakkun identity / PL

- ID: `pakkun`
- Display: **Pakkun**
- Stats N/T/B/F/K/G/S: `13/16/6/4/4/9/18`
- Base PL: **16**
- Ontology: **Entity -> Summon**
- State: **STAGED OUTSIDE LIVE PRODUCTION**
- PL48 remains retired.

Pakkun is a tracking/scouting/support ninken, not a battle-type damage pet.

## B. Persistent collection enhancement — Ninja Dog Finder

This is the standing Stephen rule.

> **Each distinct Kakashi Ninja Dog legitimately recruited grants +5 percentage points Item Find.**

Family members:

- Pakkun
- Shiba
- Biscuit
- Akino
- Guruko
- Wuhei
- Urushi
- Bull

Progression:

- 1 = +5%
- 2 = +10%
- 3 = +15%
- 4 = +20%
- 5 = +25%
- 6 = +30%
- 7 = +35%
- 8 = +40%

Rules:

- COLLECTION-owned;
- does not require attachment/manifestation;
- each distinct dog counts once;
- duplicate art/representations do not stack;
- Story meeting without recruitment does not count;
- determine eligible random item/loot table first;
- add Ninken Item Find percentage points after base eligible chance;
- final eligible chance caps at 100%;
- no effect on guaranteed rewards, Ryo, EXP or fixed Story rewards.

Player text:

> **NINJA DOG FINDER — Every Ninja Dog you recruit adds +5% Item Find. Recruit all 8 for +40%.**

## C. Pakkun attached enhancement — Scent Companion

While Pakkun is the active attached Summon, he can maintain exact **scent locks** created from legitimate scent evidence.

A scent lock means:

- ordinary smoke/concealment/false-retreat/reposition does not make that exact target "unknown" to Pakkun's controller solely by breaking visual contact;
- Pakkun can preserve bounded direction/trail continuity where scent evidence still physically exists;
- teleportation, dimension travel, scent destruction or an exact superior masking effect may break the trail;
- no exact-location omniscience.

No Stat/PL bonus.

## D. Action economy

Pakkun does **not** receive an independent recurring Battle turn by default.

- deliberate Pakkun actions use the controller's normal action opportunity;
- exact reactions below do not consume the controller's action;
- Pakkun remains the causal source;
- Pakkun PL never transfers to controller.

This preserves his non-battle-type support identity.

## E. Pakkun actions

### 1. Tracking Scent
Support / information.

> **Lock onto one target's scent and keep their trail even if you lose sight of them.**

Requirements:

- exact target/trace/object/scent basis exists;
- Pakkun has legitimate access to smell it.

In Battle:

- establish `pakkun_scent_lock` on one current target.

Outside Battle:

- may produce bounded direction, trail continuity/break and freshness evidence;
- not automatic mission completion or exact map location.

### 2. Warning Bark
Reaction, once per Battle.

Trigger:

- a scent-locked hostile attempts a hidden/ambush/false-retreat direct attack against the controller.

Effect:

- Pakkun warns the controller;
- remove that attack's exact **hidden/opening/ambush rider** before damage resolution;
- the base attack still resolves normally.

This is not generic damage reduction.

### 3. Stay on the Trail
Reaction, once per Battle.

Trigger:

- a scent-locked target uses ordinary movement/reposition/escape/concealment.

Effect:

- the target may still move if its action is otherwise legal;
- ordinary movement/concealment does **not** break Pakkun's scent lock;
- no automatic teleport cancellation;
- no hard root/stun.

### 4. Nipping Bite
One hostile, **ATK 7**.

Simple emergency direct attack; ordinary Stamina; no Stun/Bleed/Poison.

### 5. Field Guide
Contextual support.

Where Story/World/Mission exposes a real route/pursuit/regroup/hazard problem, Pakkun may provide bounded route evidence.

No universal "best path", no hidden map reveal, no automatic escape.

## F. Player summary

> **PAKKUN — Recruiting him gives +5% Item Find as one of Kakashi's 8 Ninja Dogs. Attach him to track targets by scent, keep their trail through ordinary concealment, warn you when a tracked enemy tries an ambush, and follow them when they reposition.**

## G. Production boundary

Combat calibration does not by itself admit Pakkun into live production or mint the other seven Ninken Registry rows.

Their future Registry/PL/asset admission remains separately owned.

**PROPOSED.**

---

## Stephen sign-off / closure

Stephen has explicitly signed off this RESET v2 Pakkun / Kakashi Ninken package.

This document is now binding Combat design authority for Source 08.

Preserve:
- Pakkun PL16 and STAGED / not live production status;
- COLLECTION enhancement: +5 percentage points Item Find per distinct recruited Kakashi Ninja Dog, max +40% across all eight;
- Pakkun counts once;
- ATTACHED Scent Companion enhancement;
- exact scent-lock tracking rather than generic detection;
- Warning Bark once/Battle strips hidden/opening/ambush rider from one tracked enemy attack;
- Stay on the Trail once/Battle preserves scent lock through ordinary concealment/movement;
- Nipping Bite ATK7;
- Field Guide bounded contextual route evidence;
- no independent recurring Pakkun turn by default.

**design closed != implemented != runtime validated != Golden GREEN**
