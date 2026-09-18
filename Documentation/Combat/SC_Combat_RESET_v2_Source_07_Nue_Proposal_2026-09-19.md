# Shinobi Chronicles — RESET v2 Source 07 Proposal: Nue

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **SIGNED OFF / BINDING COMBAT CALIBRATION — SOURCE 07 CLOSED UNDER RESET v2**  
**Parent:** #235  
**Source baseline:** `13dec46d50761e0bf190d354b61865ce5db5db7f`  
**Global mechanics standard:** `Documentation/Combat/SC_Combat_Unique_Shinobi_Chronicles_Mechanics_Design_Standard_2026-09-19.md`

## A. Identity / PL

- ID: `nue`
- Display: **Nue**
- Stats N/T/B/F/K/G/S: `92/98/60/55/96/65/105`
- Base PL: **100**
- Ontology: **Entity -> Summon**
- Current production representation guard: Nue and Sumire remain distinct Registry identities.
- `sannin_sumire` has an intrinsic Nue bond, but Nue PL never transfers to Sumire.

## B. Battle role

**CHAKRA PREDATOR / DIMENSIONAL ATTACKER / HIGH-RISK POWER STORAGE**

Nue's defining mechanic is not a generic damage buff. It feeds on chakra and converts what it eats into a dangerous stored core.

## C. Enhancement — Chakra Feeding Link

Activation: **ATTACHED**.

Create source-owned `nue_fed_chakra`, starting at 0, maximum **16**.

The first **two** qualifying direct Ninjutsu/Kinjutsu Attack-PL packets that hit the controller each Battle may feed Nue:

- divert **25% of that packet pre-Stamina**, rounded once;
- maximum **8** diverted from one packet;
- diverted amount is prevented from the controller;
- add the exact prevented amount to `nue_fed_chakra`, cap 16.

This is not a generic shield:

- only qualifying chakra attacks feed Nue;
- the prevented amount becomes a later offensive resource;
- no Base/Effective Stat or PL transfer occurs.

Stored chakra persists if Nue is manifested.

## D. Manifested Nue

Manifested Nue becomes an independent targetable PL100 participant with own action opportunity.

### 1. Demon Beast Claw
One hostile, **ATK 34**.

### 2. Rift Pounce
One hostile, **ATK 30**.

Nue passes through its dimensional route:

- may cross ordinary battlefield distance/reposition restrictions;
- does not bypass exact anti-space-time barriers/seals.

### 3. Chakra Devour
Reaction, once per Battle.

When Nue is targeted by a qualifying direct Ninjutsu/Kinjutsu packet:

- prevent **50% pre-Stamina**;
- add the prevented amount to `nue_fed_chakra` up to cap16;
- any prevented amount beyond the storage cap is simply dissipated, not converted into Stats/PL.

### 4. Core Overload
Once per Battle.

> **Release everything Nue has eaten in one unstable blast.**

One hostile.

Attack PL:

**24 + current `nue_fed_chakra`**, maximum **40**.

After resolution:

- `nue_fed_chakra` -> 0;
- Nue loses Battle PL equal to **half the spent stored chakra, rounded up**, bypassing Stamina.

This is the cost of overfeeding/violent discharge.

### 5. Rift Retreat
Reaction, once per Battle.

When a direct attack is committed against Nue:

- Nue retreats through its dimensional route;
- cancel that one direct packet against Nue;
- end Nue's manifestation immediately;
- return Nue to attached state;
- no free counterattack;
- remaining Nue Battle PL persists for later legitimate re-manifestation;
- exact dimensional lock can prevent this reaction.

## E. Relationship boundary

Current `sannin_sumire` intrinsic bond authorises the relationship fact.

This proposal does **not** add a generic "friendship multiplier" or extra hidden Sumire bonus.

Any future Sumire-only relationship technique must be separately authored.

## F. Player summary

> **NUE — Attach Nue to feed on part of incoming chakra attacks. Manifest it to use that stored chakra for a dangerous Core Overload, or escape through its dimension when threatened. The bigger the stored blast, the more Battle PL Nue loses afterward.**

**PROPOSED.**

---

## Stephen sign-off / closure

Stephen has explicitly signed off this RESET v2 Nue package.

This document is now binding Combat design authority for Source 07.

Preserve:
- ATTACHED Chakra Feeding Link;
- first two qualifying controller chakra packets may feed Nue;
- 25% pre-Stamina diversion, max 8 each, stored cap 16;
- manifested PL100 independent Nue;
- Demon Beast Claw ATK34;
- Rift Pounce ATK30;
- Chakra Devour once/Battle;
- Core Overload once/Battle using stored chakra with backlash;
- Rift Retreat once/Battle by ending manifestation;
- no generic Sumire friendship multiplier;
- Nue and Sumire remain distinct Registry identities.

**design closed != implemented != runtime validated != Golden GREEN**
