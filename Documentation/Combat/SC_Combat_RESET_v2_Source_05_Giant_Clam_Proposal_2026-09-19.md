# Shinobi Chronicles — RESET v2 Source 05 Proposal: Giant Clam

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **SIGNED OFF / BINDING COMBAT CALIBRATION — SOURCE 05 CLOSED UNDER RESET v2**  
**Parent:** #235  
**Source baseline:** `13dec46d50761e0bf190d354b61865ce5db5db7f`  
**Global mechanics standard:** `Documentation/Combat/SC_Combat_Unique_Shinobi_Chronicles_Mechanics_Design_Standard_2026-09-19.md`

## A. Identity / PL

- ID: `mirage_clam`
- Display: **Giant Clam**
- Stats N/T/B/F/K/G/S: `68/35/12/26/48/82/78`
- Base PL: **76**
- Ontology: **Entity -> Summon**
- Canonical association: Second Mizukage.

## B. Battle role

**GENJUTSU MEDIUM / TARGETING DISRUPTION / FIELD CONTROL**

The Clam is not primarily a damage creature. Its identity is creating the mist medium that makes false positions believable.

## C. Enhancement — Illusion Lattice

### ATTACHED

Controller gains source-owned **+7 Genjutsu**.

That scalar is only the baseline enhancement. The source-specific part is unlocked on manifestation.

### MANIFESTED

The +7 Genjutsu remains active and the controller may establish the Clam's **Mirage Field**.

No Clam PL transfers to the controller.

## D. Mirage Field

### 1. Mirage Mist
Giant Clam action.

> **Fill the battlefield with mirage mist. Each enemy gets one false read on your real position unless they locate the real Clam.**

Effect:

- establish `giant_clam_mirage_field`;
- each hostile participant receives one unused `false_position`;
- while its `false_position` remains unused, that hostile's next qualifying direct attack against the controller or Giant Clam resolves against a mirage and deals **0**;
- the false-position charge is then consumed for that hostile;
- no RNG miss roll.

Bypass / counterplay:

- a hostile with exact contact-type locating evidence or `real_clam_located` bypasses its unused false-position charge;
- exact area/contact investigation may establish `real_clam_located`;
- defeating/dismissing Giant Clam ends the field.

This is observer-relative perception, not World Truth rewrite.

### 2. Shift the Horizon
Once per Battle; requires active Mirage Field.

> **Move the mirage again. One enemy that already attacked a fake position loses your real position a second time.**

- choose one hostile whose false-position charge was already consumed;
- if that hostile has NOT established `real_clam_located`, restore one `false_position`;
- no effect against a target that has genuinely located the Clam.

### 3. Close the Shell
Giant Clam action.

> **Clamp shut to survive a heavy hit — but the mirage collapses while the shell is closed.**

- immediately end `giant_clam_mirage_field`;
- reduce the next qualifying direct packet against Giant Clam by **65% pre-Stamina**;
- one packet;
- expires at Giant Clam's next action if unused;
- Mirage Mist must be used again to rebuild the field.

The defense therefore has a real cost: protect the source or keep the deception running.

### 4. Crushing Shell
Attack one hostile: **ATK 20**.

Straightforward emergency offense; ordinary Stamina applies.

## E. Counter / drawback

The Clam's power has explicit counterplay:

- locate the real source through exact contact-type evidence;
- destroy/dismiss the real Clam;
- force it to Close the Shell and collapse the field.

No universal "accuracy debuff" or random miss chance is used.

## F. Persistent / collection

No account-wide collection bonus proposed.

## G. Player summary

> **GIANT CLAM — Attach it for +7 Genjutsu. Manifest it to cover the battlefield in mirage mist: enemies waste attacks on false positions until they locate the real Clam. Close the shell to survive a heavy hit, but doing so collapses the mirage.**

## H. Legacy replacement

If approved, this replaces the older generic `illusion_lattice` + old False Horizon/Crushing Shell package rather than stacking with it.

**PROPOSED.**

---

## Stephen sign-off / closure

Stephen has explicitly signed off this RESET v2 Giant Clam package.

This document is now binding Combat design authority for Source 05.

Preserve:
- ATTACHED +7 Genjutsu;
- manifested source-specific Mirage Field;
- per-hostile false-position read instead of RNG accuracy/miss;
- real-Clam locating as counterplay;
- Shift the Horizon once/Battle;
- Close the Shell 65% guard with immediate Mirage Field collapse;
- Crushing Shell ATK20;
- no Entity PL transfer.

**design closed != implemented != runtime validated != Golden GREEN**
