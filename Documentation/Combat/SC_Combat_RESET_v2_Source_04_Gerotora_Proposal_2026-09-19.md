# Shinobi Chronicles — RESET v2 Source 04 Proposal: Gerotora

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **SIGNED OFF / BINDING COMBAT CALIBRATION — SOURCE 04 CLOSED UNDER RESET v2**  
**Parent:** #235  
**Source baseline:** `13dec46d50761e0bf190d354b61865ce5db5db7f`  
**Global mechanics standard:** `Documentation/Combat/SC_Combat_Unique_Shinobi_Chronicles_Mechanics_Design_Standard_2026-09-19.md`

## A. Identity / PL

- ID: `key_gero`
- Display: **Gerotora**
- Stats N/T/B/F/K/G/S: `34/20/8/62/38/28/32`
- Base PL: **53**
- Ontology: **Entity -> Summon**
- Core identity: Tailed-Beast seal key / seal-management support.

## B. Eligibility / lifecycle

Gerotora may be owned wherever Acquisition permits, but Battle attachment requires a Character with an **exact compatible Tailed-Beast seal**.

Player-facing requirement:

> **Requires a Tailed-Beast Seal.**

Gerotora is not a normal damage pet.

While attached:

- no independent recurring turn;
- no second Battle PL ledger;
- no passive PL/Stat donation;
- Gerotora-assisted actions use the controller's normal action unless explicitly reactive;
- PL53 is reserved for exact Story/occurrence manifestation where separately authored.

## C. Enhancement — Seal-Key Authority

Activation: **ATTACHED + compatible Tailed-Beast seal**.

Attaching Gerotora gives the controller deliberate **seal-key control** over the exact linked seal.

This is not +Fūinjutsu.

The enhancement is the ability to manipulate the seal itself through the actions below.

Legacy `key_gero.sealkeepers_counsel +6 Fūinjutsu` is proposed for retirement.

## D. Actions

### 1. Open the Seal
Normal action.

> **Open the linked seal. You can use Tailed-Beast powers you have already unlocked.**

- linked seal -> OPEN;
- already-legitimate seal-dependent Skills/forms become eligible;
- grants no new Skill, cooperation, Stats or Beast PL.

### 2. Close the Seal
Normal action.

> **Shut the linked seal. Seal-dependent Tailed-Beast powers stop until it is opened again.**

- linked seal -> CLOSED;
- ends current open-seal state/form that requires the seal to remain open;
- does not rewind resolved damage/history.

### 3. Measured Release
Once per Battle. Gerotora-assisted controller action.

> **Use one Tailed-Beast attack through the closed seal, then Gerotora shuts it again immediately.**

Requirements:

- seal currently CLOSED;
- actor already legitimately owns the chosen direct Tailed-Beast attack;
- all non-seal requirements for that attack are satisfied;
- cannot be used to start a persistent cloak/transformation.

Effect:

- Gerotora opens the seal only for that one attack's resolution;
- after resolution, seal returns CLOSED;
- does not grant cooperation or Beast PL/Stats;
- does not erase the chosen attack's own recoil/consequence;
- does not create V1/V2/KCM access the actor does not already own.

This replaces the old generic +6 ATK proposal with a seal-specific tactical tool.

### 4. Emergency Reseal
Automatic reaction, once per Battle.

> **If V2 causes Mindless Jinchūriki, Gerotora slams the seal shut and gives control back.**

Trigger:

- exact `Mindless Jinchūriki` state caused by V2/open-seal escalation.

Effect:

- force seal CLOSED;
- end the active V2/Mindless state that depends on the open seal;
- restore ordinary player control;
- no heal;
- no extra action;
- no history rollback.

### 5. Lock the Key
Reaction, once per Battle.

> **Block one enemy attempt to force, damage, suppress or extract through your Tailed-Beast seal.**

Blocks one hostile action whose exact mechanical target is the linked seal:

- force-open;
- force-close;
- seal damage;
- seal suppression;
- hostile tampering;
- extraction through that seal.

Does not block ordinary damage, voluntary host/beast choices, or every sealing technique in the game.

## E. Counterplay / drawback

Gerotora's power is narrow:

- useless for a Character without a compatible Tailed-Beast seal;
- does not create Tailed-Beast repertoire;
- opening a seal still exposes the user to exact authored transformation/loss-of-control risks;
- Measured Release cannot smuggle a transformation through a closed seal.

## F. Persistent / collection

No account-wide collection bonus proposed.

## G. Player summary

> **GEROTORA — Attach him to a Jinchūriki/Tailed-Beast host. He lets you open and close the seal, safely pulse one already-unlocked Beast attack through a closed seal once per Battle, save you once from V2 loss of control, and block one enemy seal-tampering attempt.**

## H. Closure state

**PROPOSED.** No runtime implementation / validation / Golden claim.

---

## Stephen sign-off / closure

Stephen has explicitly signed off this RESET v2 Gerotora package.

This document is now binding Combat design authority for Source 04.

Preserve:
- compatible Tailed-Beast seal requirement;
- Seal-Key Authority as the enhancement rather than a generic Stat bonus;
- Open the Seal / Close the Seal;
- Measured Release once/Battle;
- Emergency Reseal once/Battle;
- Lock the Key once/Battle;
- no independent recurring Gerotora turn by default;
- no hidden PL/Stat transfer.

**design closed != implemented != runtime validated != Golden GREEN**
