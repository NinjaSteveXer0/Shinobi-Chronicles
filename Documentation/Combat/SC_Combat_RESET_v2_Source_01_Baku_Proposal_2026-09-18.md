# Shinobi Chronicles — RESET v2 Source 01 Proposal: Baku

**Date:** 2026-09-18  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **SIGNED OFF / BINDING COMBAT CALIBRATION — SOURCE 01 CLOSED UNDER RESET v2**  
**Parent:** #235  
**Reset authority:** `Documentation/Combat/SC_Combat_Summons_Tailed_Beasts_Full_Calibration_RESET_v2_2026-09-18.md`

---

# A. Identity / PL

Stable ID:

`de_baku`

Display:

**Baku**

Ontology:

**Entity -> Summon**

Current Registry:

- Ninjutsu **55**
- Taijutsu **48**
- Bukijutsu **18**
- Fūinjutsu **22**
- Kinjutsu **40**
- Genjutsu **62**
- Stamina **70**
- Base PL **64**
- canonical association: **Danzō**

This proposal does not reopen those Base Stats / Base PL.

---

# B. Battle role

**CONTROL / ELEMENTAL AMPLIFIER / HEAVY SUPPORT**

Baku is not primarily a damage pet.

Its identity is:

1. powerful suction that restricts enemy movement;
2. amplification of elemental attacks through the vacuum current;
3. a large physical body capable of pressure/tusk attacks;
4. a real Fire vulnerability while exposed.

---

# C. Lifecycle / action economy

## OWNED

- Baku is present in the player's collection;
- owning Baku alone does **not** apply its Battle enhancement to every Character.

## ATTACHED / PREPARED

- Baku is the Character's active Summon source;
- **Vacuum Amplification is active immediately while Baku is attached**;
- no second Battle PL ledger;
- no second turn;
- Baku does not need to be manifested for the elemental enhancement to function.

## MANIFESTED

- Baku becomes an independently targetable participant;
- Baku uses its own PL64 Battle ledger;
- Baku receives its own normal action opportunity;
- **Vacuum Amplification remains active while Baku is manifested** because Baku is still that Character's active Summon source;
- Baku's PL/Stats never transfer to the controller.

If Baku is detached/replaced:

- Vacuum Amplification ends.

If Baku is depleted/dismissed from manifestation but remains the Character's valid attached Summon source:

- the attachment enhancement remains active;
- only Baku's manifested body, own Battle PL ledger, own actions and manifested-only drawback end.

---

# D. Enhancement Package

## `de_baku_vacuum_amplification` — **Vacuum Amplification**

Activation:

**ATTACHED** — remains active while Baku is manifested.

Player text:

> **While Baku is your active Summon, your Wind attacks deal +15% damage and your Fire attacks deal +10% damage.**

Exact mechanics:

- controller's qualifying direct **Wind Release** Attack-PL packets: **+15% pre-Stamina Attack PL**;
- controller's qualifying direct **Fire Release** Attack-PL packets: **+10% pre-Stamina Attack PL**;
- round once at the resolver boundary;
- no Base PL increase;
- no Ninjutsu Stat increase;
- no elemental access is granted;
- a non-Wind/non-Fire attack gets nothing;
- one attack cannot receive the same Baku modifier twice.

Why both elements:

- canon explicitly shows Baku's suction amplifying Danzō's Wind Release;
- the same suction also intensified Sasuke's Fire Release when the fire entered Baku's airflow;
- SC turns that interaction into a usable player enhancement rather than making the Fire interaction enemy-only.

This is an intentional SC gameplay adaptation.

---

# E. Own Skill Kit

## 1. `de_baku_devouring_suction` — **Devouring Suction**

Class:

**CONTROL**

Target:

up to **2 hostile participants**

Player text:

> **Pull in up to 2 enemies. They cannot use movement or reposition actions on their next turn.**

Effect:

- no direct damage;
- each affected target receives `baku_suction_lock`;
- duration: through that target's next action opportunity;
- movement/reposition-required actions are unavailable;
- this is **not Stun**;
- attacks/support that do not require movement remain legal.

---

## 2. `de_baku_vacuum_crush` — **Vacuum Crush**

Class:

**ATTACK**

Target:

one hostile

Base ATK:

**22**

If the target currently has `baku_suction_lock`:

**ATK 30**

Player text:

> **Hit one enemy for 22 ATK. If Baku has them caught in Devouring Suction, hit for 30 instead.**

- one direct packet;
- ordinary Stamina mitigation;
- no automatic Stun or displacement.

---

## 3. `de_baku_tusk_sweep` — **Tusk Sweep**

Class:

**ATTACK**

Target:

up to **2 hostiles**

ATK:

**20 each**

Player text:

> **Sweep up to 2 enemies with Baku's tusks.**

- separate packet per target;
- ordinary Stamina mitigation;
- no automatic Bleed or knockdown.

---

## 4. `de_baku_heavy_anchor` — **Heavy Anchor**

Class:

**DEFENSE**

Target:

self

Player text:

> **Brace Baku. Reduce the next direct hit by 40% and stop one forced-movement effect.**

Effect:

- next qualifying direct Attack-PL packet against Baku is reduced **40% before Stamina**;
- also rejects one ordinary forced-movement/reposition effect attached to that same occurrence, if present;
- consumed by that qualifying occurrence;
- if unused, expires at Baku's next action opportunity;
- does not make Baku untargetable.

---

# F. Counter / drawback

## **Fire Feeds the Vacuum**

While Baku is manifested:

> **Enemy Fire attacks against Baku deal +15% damage.**

Mechanics:

- hostile qualifying direct Fire Release Attack-PL packet targeting Baku: **+15% pre-Stamina Attack PL**;
- no bonus against Baku's controller;
- no permanent Fire weakness outside manifested Battle state.

This preserves the important canon counterplay:

Baku can make Fire stronger, but Fire is also dangerous to Baku.

---

# G. Persistent / collection progression

Baku has **no proposed account-wide persistent collection bonus**.

Baku has no separate account-wide collection bonus.

Its primary enhancement is deliberately **ATTACHED**:

- attach Baku -> Wind +15%, Fire +10%;
- manifest Baku -> keep those bonuses and also gain Baku as an independent fighter;
- simply owning Baku without attaching it does not apply the Battle enhancement.

This is explicit rather than leaving the category unaudited.

---

# H. Double-count / representation exclusions

- Baku PL64 is Baku's own Battle capacity only.
- Vacuum Amplification modifies exact elemental Attack-PL packets; it does not also grant +Ninjutsu.
- Do not stack the old runtime `de_baku.devouring_pressure` resolver package with this new enhancement if this proposal is approved.
- Do not apply Baku's enhancement after Baku has been dismissed/depleted.
- no generic Danzō bonus is inferred from canonical association.

---

# I. Player-facing summary

## BAKU — CONTROL / ELEMENT BOOST

> **Wind damage +15%. Fire damage +10% while Baku is on the field. Pull enemies in, hit trapped enemies harder, and brace against attacks. Watch out: enemy Fire also deals +15% damage to Baku.**

A younger player should be able to understand the whole package from that text.

---

# J. Current-source replacement note

Current runtime contains older Baku authority including:

- `de_baku_vacuum_maw` ATK11;
- `de_baku_devouring_suction`;
- `de_baku_anchor`;
- `de_baku.devouring_pressure` with no Stat modifier.

Stephen has signed off RESET v2 Baku.

Therefore:

- this document is the new binding Combat design authority for Baku;
- the signed-off enhancement is **ATTACHED**, not manifestation-only;
- old Baku Combat package is implementation-superseded;
- Coding must replace, not stack, legacy actions/effects;
- no runtime implementation is claimed by this closure.

**design closed != implemented != runtime validated != Golden GREEN**
