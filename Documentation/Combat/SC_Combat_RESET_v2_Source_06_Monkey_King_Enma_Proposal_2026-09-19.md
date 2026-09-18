# Shinobi Chronicles — RESET v2 Source 06 Proposal: Monkey King Enma

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **PROPOSED FOR STEPHEN SIGN-OFF — SOURCE 06 UNDER RESET v2**  
**Parent:** #235  
**Source baseline:** `13dec46d50761e0bf190d354b61865ce5db5db7f`  
**Global mechanics standard:** `Documentation/Combat/SC_Combat_Unique_Shinobi_Chronicles_Mechanics_Design_Standard_2026-09-19.md`

## A. Identity / PL

- ID: `mk_enma`
- Display: **Monkey King Enma**
- Stats N/T/B/F/K/G/S: `72/82/78/38/55/30/88`
- Base PL: **83**
- Ontology: **Entity -> Summon**
- Canonical association: Third Hokage Hiruzen.

## B. Core identity

Enma is a **living weapon / independent veteran fighter** with two mutually exclusive modes.

No generic +Stamina/+Bukijutsu stack is proposed.

Legacy `adamantine_presence +6 Stamina` and `staffmasters_counsel +5 Bukijutsu` are proposed for retirement.

## C. Mode 1 — Adamantine Staff / ATTACHED enhancement

When attached, Enma is in **Adamantine Staff Form**.

- no independent recurring Enma turn;
- no second active participant;
- controller gains Enma's Staff actions and **Adamantine Reach**;
- Enma's own PL83 is not added to controller PL.

### Adamantine Reach

Compatible Enma Staff attacks can cross ordinary close/far battlefield spacing because Enma can extend.

This does not bypass explicit barriers, seals or space-time restrictions.

### Staff actions

#### 1. Adamantine Staff Strike
One hostile, **ATK 36**.

#### 2. Extending Staff Drive
One hostile, **ATK 28**.

After damage, if the target is not protected by an exact anchor:

- force target out of close engagement / into far position.

This is positional control, not Stun.

#### 3. Living Staff Snare
Control, one hostile.

> **Enma grows an arm from the staff and catches the enemy's weapon arm.**

Through target's next action:

- actions requiring that target's held weapon/Bukijutsu weapon route are unavailable;
- Taijutsu, Ninjutsu, defense, escape and other legal actions remain available;
- not Stun;
- exact weaponless/bodiless exceptions remain legal.

#### 4. Adamantine Prison Wall
Once per Battle; up to 2 allies.

For each protected ally's next qualifying direct packet:

- if packet is a projectile/Bukijutsu projectile packet, Enma's wall **fully intercepts that one packet**;
- otherwise reduce the packet **45% pre-Stamina**.

One packet per protected ally.

## D. Mode 2 — Monkey King / MANIFESTED

Switching from Staff to Monkey King consumes the controller's normal action and removes Staff-mode access for that time.

Enma then becomes:

- independent targetable PL83 participant;
- own Battle PL ledger;
- own action opportunity.

### Monkey actions

#### 1. Monkey King Strike
One hostile, **ATK 32**.

#### 2. Grappling Crush
One hostile, **ATK 24** + `enma_physical_restraint`.

Through target's next action:

- substantial free movement/reposition unavailable;
- not Stun.

#### 3. Veteran Interpose
Reaction, once per Battle.

When the controller is targeted by a close-range physical/Bukijutsu attack and Enma can physically intervene:

- redirect that attack to Enma before damage resolution;
- controller takes none from that packet;
- Enma resolves the attack against his own Stamina/Battle PL normally.

This is bodyguard interception, not generic percentage armor.

## E. Return to Staff

Controller may spend a normal action to return manifested Enma to Staff mode.

- no free follow-up action;
- Enma's remaining Entity Battle PL is preserved for later re-manifestation that Battle;
- mode switch never refreshes Enma.

## F. Counter / drawback

The choice is explicit:

- **Staff Mode:** controller gains reach, weapon control and Prison Wall, but Enma has no independent turn.
- **Monkey Mode:** Enma becomes a second active fighter, but the controller loses Staff-mode actions.

Never both at once.

## G. Player summary

> **ENMA — Keep him as the Adamantine Staff for extending attacks, weapon-arm control and Prison Wall, or release him as an independent PL83 Monkey King fighter. You cannot have both modes at once.**

**PROPOSED.**
