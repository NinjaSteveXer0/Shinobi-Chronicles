# Shinobi Chronicles — RESET v2 Source 02 Proposal: Gamakichi

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **SIGNED OFF / BINDING COMBAT CALIBRATION — SOURCE 02 CLOSED UNDER RESET v2**  
**Parent:** #235  
**Reset authority:** `Documentation/Combat/SC_Combat_Summons_Tailed_Beasts_Full_Calibration_RESET_v2_2026-09-18.md`  
**Source baseline:** `69d995bb1a0967d81854227de31819875d98c87e`

---

# A. Identity / PL

Stable ID:

`gamakichi`

Display:

**Gamakichi**

Ontology:

**Entity -> Summon**

Current Registry:

- Ninjutsu **72**
- Taijutsu **68**
- Bukijutsu **52**
- Fūinjutsu **28**
- Kinjutsu **40**
- Genjutsu **20**
- Stamina **76**
- Base PL **71**
- species: **Toad**
- affiliation: **Mount Myōboku**

This proposal does not reopen those Base Stats / Base PL.

Canon anchors consumed before authoring:

- Gamakichi is Naruto's summoned toad partner and part of the new Three-Way Deadlock;
- adult Gamakichi fights with a tantō;
- he uses Water Release / senjutsu through **Starch Syrup Gun**;
- he is highly mobile through giant toad leaps;
- anime material also gives him Fire Release, but this proposal does not require anime-only Fire Release to define his core package.

---

# B. Battle role

**NINJUTSU SUPPORT / MOBILE FRONT-LINE FIGHTER**

Gamakichi's identity is:

1. improve the controller's Ninjutsu while attached;
2. fight independently when manifested;
3. use Water Release control;
4. use his tantō for direct offense;
5. protect an ally through active interception.

He is not a generic elemental damage amplifier like Baku.

---

# C. Lifecycle / action economy

## OWNED

- Gamakichi is in the player's collection;
- ownership alone does not apply his Battle enhancement globally.

## ATTACHED / PREPARED

- Gamakichi is the Character's active Summon;
- **Toad Chakra Guidance is active immediately**;
- no second Battle PL ledger;
- no second turn;
- Gamakichi does not need to be manifested for the attached enhancement.

## MANIFESTED

- Gamakichi becomes independently targetable;
- own Battle PL ledger = his own Effective PL;
- own normal Entity action opportunity;
- **Toad Chakra Guidance remains active** because he is still the Character's active Summon source;
- no Gamakichi PL transfer to the controller.

If Gamakichi leaves manifestation but remains attached:

- the +6 Ninjutsu enhancement remains;
- only his manifested body / own actions / own Battle PL ledger leave play.

Detaching or replacing Gamakichi ends the enhancement.

---

# D. Enhancement Package

## `gamakichi_toad_chakra_guidance` — **Toad Chakra Guidance**

Activation:

**ATTACHED** — remains active while manifested.

Player text:

> **Attach Gamakichi to gain +6 Ninjutsu.**

Exact mechanics:

- controller receives source-owned **+6 Ninjutsu**;
- recompute Effective PL normally from the seven Stats;
- no direct/hidden PL bonus;
- no Water Release, Fire Release, Sage Mode, Senjutsu or other technique is granted merely by attaching Gamakichi;
- the modifier is removed when Gamakichi is detached/replaced;
- do not apply it twice when Gamakichi is manifested.

This deliberately preserves the existing `gamakichi.toad_chakra_guidance` concept because it gives Gamakichi a broad but readable Ninjutsu-support identity without copying Baku's elemental damage bonuses.

---

# E. Own Skill Kit

## 1. `gamakichi_toad_sword_beheading` — **Toad Sword Beheading**

Class:

**ATTACK / Bukijutsu**

Target:

one hostile

ATK:

**30**

Player text:

> **Slash one enemy with Gamakichi's tantō for 30 ATK.**

Rules:

- one direct packet;
- ordinary Stamina mitigation;
- no automatic Bleed / Stun / execution.

---

## 2. `gamakichi_starch_syrup_gun` — **Starch Syrup Gun**

Class:

**ATTACK + CONTROL / Water Release**

Target:

up to **2 hostiles**

ATK:

**18 each**

Player text:

> **Blast up to 2 enemies with sticky water for 18 ATK. They cannot use movement or reposition actions on their next turn.**

Effect:

- separate packet per target;
- ordinary Stamina mitigation;
- each successfully affected target receives `gamakichi_syrup_slow`;
- through that target's next action opportunity, movement/reposition-required actions are unavailable;
- this is **not Stun**;
- ordinary attacks/support remain legal where they do not require movement;
- no hidden Speed/Agility Stat.

This uses the actual high-viscosity Water Release identity instead of the older generic Oil Bullet runtime placeholder.

---

## 3. `gamakichi_leaping_tanto_dive` — **Leaping Tantō Dive**

Class:

**ATTACK**

Target:

one hostile

ATK:

**26**

Player text:

> **Leap across the battlefield and strike one enemy for 26 ATK.**

Rules:

- one direct packet;
- ordinary Stamina mitigation;
- can legally reach a distant/repositioned target where ordinary battlefield distance is the only obstacle;
- does not bypass explicit barriers, space-time locks, sealed zones or effects that specifically prevent traversal;
- no permanent untargetability.

---

## 4. `gamakichi_blade_guard` — **Blade Guard**

Class:

**DEFENSE / SUPPORT**

Target:

Gamakichi or one ally

Player text:

> **Gamakichi blocks for an ally. Reduce their next direct hit by 35%.**

Effect:

- next qualifying direct Attack-PL packet against the selected target is reduced **35% before Stamina**;
- one packet;
- if unused, expires at Gamakichi's next action opportunity;
- no counterattack;
- no Stat transfer.

---

# F. Counter / drawback

No special elemental weakness is proposed.

Gamakichi's trade-off is structural rather than punitive:

- while merely attached, the player gets **+6 Ninjutsu** but not Gamakichi's own actions;
- manifest him to gain the independent fighter and skill kit;
- manifestation does not create a second copy of the +6 Ninjutsu enhancement.

No artificial drawback is added merely for symmetry.

---

# G. Persistent / collection progression

No account-wide persistent collection bonus is proposed for Gamakichi.

His defining enhancement is **ATTACHED** rather than **OWNED/COLLECTION**.

This is an explicit audited decision.

---

# H. Double-count / representation exclusions

- Gamakichi PL71 remains his own Battle capacity;
- +6 Ninjutsu is a source-owned controller modifier, not PL transfer;
- do not also add a generic Water/Fire/Sage damage bonus unless separately authorised later;
- do not grant Sage Mode or Senjutsu access from attachment;
- if a dedicated Character representation someday explicitly embodies this exact Gamakichi modifier in Base Stats, do not apply the source package again;
- current legacy `gamakichi_oil_bullet`, `gamakichi_heavy_landing`, and flat `gamakichi_blade_guard` package become replacement-only if Stephen approves this RESET v2 design.

---

# I. Player-facing summary

## GAMAKICHI — NINJUTSU SUPPORT / FIGHTER

> **Attach Gamakichi to gain +6 Ninjutsu. Manifest him to fight beside you with his sword, sticky Water Release, long-distance leaps, and Blade Guard.**

That is the complete player-facing identity.

---

# J. Current-source replacement note

Current runtime contains:

- `gamakichi.toad_chakra_guidance` = +6 Ninjutsu;
- `gamakichi_oil_bullet` = ATK9 + Oiled;
- `gamakichi_heavy_landing` = ATK13;
- `gamakichi_blade_guard` = flat prevention 7;
- current generic Summon runtime consumes the Character action rather than providing an independent Entity turn.

Stephen has signed off RESET v2 Gamakichi.

Therefore:

- preserve the +6 Ninjutsu enhancement as binding attached-source authority;
- replace the old action palette with this signed-off package;
- do not stack old and new actions/effects;
- implement the RESET v2 manifested independent-action semantics downstream;
- no runtime implementation / validation is claimed by this closure.

**design closed != implemented != runtime validated != Golden GREEN**
