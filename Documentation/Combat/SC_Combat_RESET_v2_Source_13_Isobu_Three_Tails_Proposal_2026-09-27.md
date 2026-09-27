# Shinobi Chronicles — RESET v2 Source 13 Proposal: Isobu / Three-Tails

**Date:** 2026-09-27  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons / Tailed Beasts  
**Status:** **PROPOSED — AWAITING STEPHEN SIGN-OFF**  
**Parent:** #235  
**Reset authority:** `Documentation/Combat/SC_Combat_Summons_Tailed_Beasts_Full_Calibration_RESET_v2_2026-09-18.md`  
**Canon research:** `Documentation/Combat/SC_Combat_Tailed_Beasts_Canon_Research_Shukaku_Matatabi_Isobu_Chomei_2026-09-27.md`  
**PL / Registry authority:** `Documentation/Registry/Tailed Beast Pair Snake and Pakkun PL Registry Reconciliation 2026-09-18.md`

---

# A. Identity / PL

Persistent Entity key:

`beast_isobu`

## `three_tails` — Three-Tails

Exact representation state:

**wild / pre-cooperation**

Base Stats:

- Ninjutsu **92**
- Taijutsu **88**
- Bukijutsu **58**
- Fūinjutsu **56**
- Kinjutsu **98**
- Genjutsu **48**
- Stamina **112**

Base PL:

**104**

## `isobu` — Isobu

Exact representation state:

**friendly / cooperative high-relationship**

Base Stats:

- Ninjutsu **98**
- Taijutsu **94**
- Bukijutsu **60**
- Fūinjutsu **62**
- Kinjutsu **102**
- Genjutsu **54**
- Stamina **116**

Base PL:

**108**

Same persistent beast.

Both exact representations reserve against simultaneous duplicate use.

No Entity PL transfers wholesale to a host.

## Relationship-history rule

This pair has a stronger eligibility distinction than Shukaku/Matatabi.

Current durable Registry authority explicitly says:

- `three_tails` = wild / pre-cooperation representation;
- `isobu` = friendly / cooperative **high-relationship** representation;
- sufficient relationship history is part of exact Isobu representation eligibility.

Combat does **not** invent a generic numeric friendship meter or universal threshold here.

The exact evidence/threshold remains whatever durable relationship-history authority ultimately defines.

Do not copy this Isobu-specific eligibility rule onto every other Tailed Beast pair.

---

# B. Canon fingerprint

Secure identity:

**ARMOURED SHELL / ROLLING IMPACT / CORAL / WATER RELEASE**

Canon anchors consumed:

- Isobu = Three-Tails;
- turtle/crustacean-like armoured Tailed Beast;
- exceptionally hard shell;
- Water Release affinity;
- coral production;
- rolling/spiked-ball body attack is manga-supported;
- Coral Palm is manga-supported and causes coral growth from contact;
- Isobu is comparatively timid/soft-spoken;
- project authority makes the wild/pre-cooperation vs high-relationship split mechanically important.

Lower-authority/anime material is NOT silently baselined:
- hallucination mist;
- mini-clones;
- dimensional hiding;
- explicit eye weakness;
- anime-only expanded water attacks.

Do not infer:
- generic Water immunity;
- coral on every hit;
- dimension travel;
- hallucination mechanics.

---

# C. Representation design law

Stephen's closed Bijū principle applies:

> **uncooperative/wild != punishment version**

and:

> **each Bijū pair must express its own relationship identity.**

For Isobu that means:

## `three_tails`

Mechanical projection:

**CARAPACE / ROLLING MOMENTUM / BODY PRESSURE / WILD DEFENCE**

The wild representation gives the host access to:
- partial shell manifestation;
- rolling/body-charge attacks;
- spike/contact defence;
- Stamina-focused survivability.

It does NOT automatically grant the refined coral-development branch.

## `isobu`

Mechanical projection:

**CORAL CONTROL / WATER SHAPING / PROTECTIVE COOPERATION**

The cooperative high-relationship representation gives:
- controlled coral application;
- Water-assisted defence;
- cooperative source-assisted Coral Palm;
- Isobu-derived coral/Water Potential Skill development.

Preserve:

> **wild body power != cooperative coral mastery**

> **high relationship unlocks precision, not merely larger numbers**

---

# D. Lifecycle / action economy

Tailed Beast is not an ordinary Summon.

## Hosted / sealed

An exact host relationship does not automatically create:
- a second participant;
- a second turn;
- a second Battle PL ledger;
- Entity PL transfer.

Host-assisted Skills consume the host's normal action unless explicitly reaction-classed.

## Independent / manifested

Where an authored lifecycle legitimately manifests the beast:
- use the exact representation's own Battle PL ledger;
- the beast becomes independently targetable;
- the exact manifested palette below becomes available;
- no duplicate second Isobu source/body exists simultaneously.

---

# E. Manifested Skill packages

Three core actions are shared because both exact cards are the same persistent Isobu.

Two prepared actions vary by representation.

## Shared core — `three_tails` + `isobu`

### 1. `isobu_spiked_shell_roll` — **Spiked Shell Roll**

Class:

**ATTACK / ARMOURED BODY / MOVEMENT**

Target:

one hostile

ATK:

**44**

Player text:

> **Curl into Isobu's spiked shell, cross ordinary close-to-mid distance and crash into one enemy for 44 ATK.**

Rules:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- may bridge ordinary close-to-mid separation;
- no separate reposition action;
- cannot bypass impossible/sealed barriers or superior movement rules;
- no automatic Stun.

---

### 2. `isobu_coral_palm` — **Coral Palm**

Class:

**ATTACK / CORAL CONTROL**

Target:

one hostile

ATK:

**34**

Player text:

> **Strike one enemy for 34 ATK. If it deals damage, coral grows from the impact point and restricts their movement through their next action.**

Effect:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- positive final damage applies `isobu_coral_growth`;
- duration: through target's next action opportunity;
- blocks ordinary movement / reposition / escape;
- attacks / defence / support that do not require substantial free movement remain legal;
- exact anti-restraint / source-specific removal may override;
- not Stun;
- coral does not automatically deal repeated damage.

---

### 3. `isobu_tidal_shell_burst` — **Water Release: Tidal Shell Burst**

Classification:

**ATTACK / WATER RELEASE / AREA**

SC adaptation:

Original Shinobi Chronicles technique built from Isobu's canonical Water affinity + shell/body identity.

Target:

up to **2 legally exposed hostiles**

ATK:

**36 each**

Player text:

> **Burst Water Release outward from Isobu's shell and hit up to 2 exposed enemies for 36 ATK each.**

Rules:
- one direct packet per target;
- ordinary Stamina mitigation;
- no automatic Water weakness/resistance interaction;
- no knockback;
- no waiting-slot bypass;
- no anime-only water technique claim.

---

## Three-Tails-specific manifested actions

### 4A. `three_tails_wild_shell_crash` — **Wild Shell Crash**

Classification:

**ATTACK / ARMOURED BODY / MOMENTUM**

Target:

one hostile

Base ATK:

**40**

Momentum ATK:

**52**

Player text:

> **Crash into one enemy for 40 ATK. If Three-Tails moved or rolled into engagement on its previous action, carry that momentum through for 52 instead.**

Rules:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- ATK52 requires Three-Tails' immediately previous action to have included legitimate movement/reposition/rolling engagement;
- no hidden Speed Stat;
- no automatic Stun;
- no bonus action.

This rewards the wild representation for staying in motion rather than copying Matatabi's pursuit logic.

---

### 5A. `three_tails_spiked_recoil` — **Spiked Recoil**

Classification:

**REACTION / DEFENSE / CONTACT COUNTER**

Limit:

**once per Battle**

Trigger:

Three-Tails is targeted by one direct **close-range Taijutsu or Bukijutsu** Attack-PL packet.

Player text:

> **Brace the spiked shell against one close-range physical attack. Cut its ATK by 45%; if the attack still deals damage, the attacker takes an 18 ATK recoil hit.**

Effect:
- reduce triggering packet **45% pre-Stamina**;
- ordinary Stamina resolves against Three-Tails;
- if positive final damage still reaches Three-Tails, attacker receives one **ATK18** direct physical recoil packet;
- attacker resolves ordinary Stamina against ATK18;
- no recoil if triggering attack deals zero final damage;
- no effect against ranged/pure Ninjutsu/Kinjutsu/Genjutsu;
- no generic reflect percentage;
- no repeated passive thorns effect.

---

## Cooperative Isobu-specific manifested actions

### 4B. `isobu_coral_bulwark` — **Coral Bulwark**

Classification:

**REACTION / DEFENSE / CORAL**

Limit:

**once per Battle**

Trigger:

Isobu is targeted by one direct Attack-PL packet.

Player text:

> **Raise shell and coral against one direct attack, reducing its ATK by 55%. If a close-range attacker still deals damage, coral catches their footing through their next action.**

Effect:
- reduce triggering packet **55% pre-Stamina**;
- ordinary Stamina resolves;
- if attacker used a close-range attack and still deals positive final damage, apply `isobu_coral_growth` to that attacker;
- no recoil damage;
- no effect on control-only or non-packet effects;
- exact anti-restraint may remove the coral normally.

This turns cooperative Isobu's defence into controlled capture rather than wild retaliation.

---

### 5B. `isobu_reef_current` — **Water Release: Reef Current**

Classification:

**ATTACK / WATER RELEASE / CORAL PAYOFF**

Target:

one hostile

Base ATK:

**36**

Coral-target ATK:

**48**

Player text:

> **Drive a focused Water current into one enemy for 36 ATK. If they are caught in Isobu's coral, hit for 48 instead and wash the coral away.**

Rules:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- ATK48 requires active same-source `isobu_coral_growth`;
- stronger branch removes that coral state after resolution;
- no automatic new coral;
- no Stun;
- no generic Water weakness.

Decision:

> **Keep coral for control, or cash it out through Isobu's Water Release for a heavier hit.**

---

# F. Wild Three-Tails Enhancement + host-assisted Skills

This branch is only valid where an exact future hosted/sealed lifecycle permits `three_tails` as the active wild/pre-cooperation source.

It is not inferred merely from encountering the wild beast.

## `three_tails_carapace_instinct` — **Carapace Instinct**

Activation:

**HOSTED / WILD / PRE-COOPERATION**

Player text:

> **Three-Tails hardens your body through partial shell manifestation. Gain +10 Stamina. Once per Battle, brace a close-range physical hit against the shell, reducing its ATK by 40% and striking the attacker back for 16 ATK if they still hurt you.**

### Effective Stat modifier

- controller **Effective Stamina +10**;
- source-owned modifier;
- Effective PL recomputes normally;
- no Base Stat mutation;
- source removal ends the modifier.

### Shell Contact

Limit:

**once per Battle**

Trigger:

host is targeted by one direct close-range Taijutsu/Bukijutsu packet.

Effect:
- reduce triggering packet **40% pre-Stamina**;
- ordinary Stamina then resolves;
- if positive final damage remains, attacker receives **ATK16** direct physical recoil;
- ordinary Stamina mitigates the recoil;
- no effect against ranged/pure Ninjutsu/Kinjutsu/Genjutsu;
- no permanent reflection aura.

This gives the wild host a body-first defensive identity rather than a weaker version of cooperative coral control.

---

## `three_tails_partial_shell_roll` — **Partial Shell Roll**

Classification:

**SOURCE-ASSISTED ATTACK / PARTIAL MANIFESTATION / MOVEMENT**

Target:

one hostile

ATK:

**40**

Player text:

> **Manifest Three-Tails' shell around your body, roll across ordinary close-to-mid distance and crash into one enemy for 40 ATK.**

Rules:
- host owns the action;
- one direct packet;
- ordinary Stamina mitigation;
- bridges ordinary close-to-mid distance;
- no separate reposition action;
- no Stun;
- no second Entity participant.

---

## `three_tails_spike_wake` — **Spike Wake**

Classification:

**SOURCE-ASSISTED ATTACK / PARTIAL MANIFESTATION / AREA**

Target:

up to **2 legally exposed hostiles**

ATK:

**32 each**

Player text:

> **Burst shell-spines through your partial transformation and strike up to 2 exposed enemies for 32 ATK each.**

Rules:
- one packet per target;
- ordinary Stamina mitigation;
- no Bleed;
- no waiting-slot bypass;
- no automatic restraint.

---

## `three_tails_breakwater_curl` — **Breakwater Curl**

Classification:

**SOURCE-ASSISTED DEFENSE / PARTIAL MANIFESTATION**

Limit:

**once per Battle**

Use:

host spends their normal action to curl behind a partial Isobu shell.

Player text:

> **Curl behind Three-Tails' shell. Reduce the next direct attack that hits you before your next action by 60%.**

Effect:
- next qualifying direct Attack-PL packet before host's next action is reduced **60% pre-Stamina**;
- ordinary Stamina then resolves;
- consumed by first qualifying packet;
- expires at host's next action if unused;
- does not make host untargetable;
- control-only effects remain normal.

This is intentionally a strong action-cost defence, not a passive aura.

---

# G. Cooperative Isobu Enhancement

Available only when the exact `isobu` high-relationship representation is legitimately active.

## `isobu_coral_tide_accord` — **Coral Tide Accord**

Activation:

**HOSTED / BONDED / HIGH-RELATIONSHIP**

Player text:

> **With high-relationship Isobu, gain +10 Ninjutsu. Once per Battle, after one of your Water Release or Isobu-assisted attacks deals damage, grow coral from the hit and restrict that enemy's movement through their next action.**

### Effective Stat modifier

- controller **Effective Ninjutsu +10**;
- source-owned modifier;
- Effective PL recomputes normally;
- no Base Stat mutation;
- no unrelated Ninjutsu unlock.

### Coral Follow-Through

Limit:

**once per Battle**

Trigger:
- controller's direct Water Release or Isobu-assisted ATTACK deals positive final damage to one hostile.

Effect:
- apply `isobu_coral_growth`;
- duration through target's next action opportunity;
- blocks ordinary movement/reposition/escape;
- other actions remain legal if they do not require substantial free movement;
- exact anti-restraint can remove it;
- no second damage packet;
- no extra action.

This makes high relationship matter through precise coral placement rather than a hidden relationship multiplier.

---

# H. Cooperative Isobu source-assisted Skills

## `isobu_assisted_coral_palm` — **Coral Palm**

Classification:

**COOPERATIVE SOURCE-ASSISTED ATTACK / CORAL**

Target:

one hostile

ATK:

**36**

Player text:

> **Let Isobu drive coral through your strike for 36 ATK. If it deals damage, coral grows from the impact point and restricts movement through the target's next action.**

Rules:
- host owns the action;
- one direct packet;
- ordinary Stamina mitigation;
- positive final damage applies `isobu_coral_growth`;
- no repeated damage;
- not Stun;
- use does not by itself permanently teach coral manipulation.

---

## `isobu_shell_current_guard` — **Shell Current Guard**

Classification:

**COOPERATIVE SOURCE-ASSISTED REACTION / WATER / DEFENSE**

Limit:

**once per Battle**

Trigger:

host is targeted by one direct Attack-PL packet.

Player text:

> **Isobu wraps shell-shaped Water pressure around you, reducing one direct attack's ATK by 50%. If it was close-range, push yourself back to ordinary mid-range after it resolves.**

Effect:
- reduce triggering packet **50% pre-Stamina**;
- ordinary Stamina resolves;
- if triggering attack required close range, host may end at ordinary mid-range after resolution;
- no random dodge;
- no counterattack;
- cannot bypass exact movement locks that explicitly prevent reposition.

This combines Isobu's defensive shell identity with Water shaping rather than copying Matatabi's agility.

---

# I. Isobu-derived Potential Skill Roster

Available only as future potential development from legitimate high-relationship Isobu-derived coral/Water access.

These are not automatically learned.

Global Potential Skill Roster thresholds remain under #382.

## 1. `skill_isobu_coral_lance` — **Coral Release: Reef Lance**

Classification:

**LEARNABLE / ISOBU-DERIVED CORAL / NINJUTSU**

SC origin:

**Original Shinobi Chronicles technique.**

Potential prerequisites:
- legitimate high-relationship Isobu source access;
- sufficient future-framework Ninjutsu;
- legitimate developed Isobu-derived coral manipulation;
- separate persistent unlock.

Target:

one hostile

ATK:

**38**

Player text:

> **Drive a focused coral lance into one enemy for 38 ATK. If it deals damage, coral anchors their footing through their next action.**

Effect:
- one direct packet;
- ordinary Stamina mitigation;
- positive damage applies movement-specific coral restraint;
- no Stun;
- no repeated damage.

---

## 2. `skill_isobu_reef_prison` — **Coral Release: Reef Prison**

Classification:

**LEARNABLE / ISOBU-DERIVED CORAL / CONTROL**

Limit:

**once per Battle**

Target:

one hostile

Player text:

> **Grow a coral cage around one enemy. They cannot reposition or escape on their next action, but may still attack or defend if the action does not require substantial movement.**

Effect:
- no direct damage;
- apply `isobu_reef_prison` through target's next action opportunity;
- blocks ordinary movement/reposition/escape;
- exact anti-restraint/source-specific break can remove it;
- not Stun;
- no automatic damage.

This is a pure control option rather than another attack with a rider.

---

## 3. `skill_isobu_breaking_tide` — **Water Release: Breaking Tide**

Classification:

**LEARNABLE / WATER RELEASE / CORAL PAYOFF**

Target:

one hostile

Base ATK:

**40**

Coral-target ATK:

**52**

Player text:

> **Hit one enemy with a compressed Water surge for 40 ATK. If they are caught in your Isobu-derived coral, hit for 52 instead and wash the coral away.**

Rules:
- one direct packet;
- ordinary Stamina mitigation;
- ATK52 requires an active Isobu-derived coral restraint owned by the user/source;
- stronger branch consumes that coral state after resolution;
- no new restraint;
- no Stun.

This gives learned coral development the same control-vs-damage decision as Isobu itself without copying the exact manifested technique.

---

# J. Counterplay / drawbacks

## Three-Tails
- +10 Stamina is source-owned and disappears when the source is no longer valid;
- Shell Contact works only against one close-range physical packet;
- recoil requires positive damage to get through;
- Partial Shell Roll / Spike Wake do not grant coral mastery;
- Breakwater Curl costs the host's action.

## Isobu
- coral is movement-specific control, not Stun;
- Coral Follow-Through requires positive damage;
- high-relationship Isobu eligibility is not reduced to a generic numeric friendship meter here;
- Shell Current Guard cannot defeat exact superior movement locks;
- no Water immunity is granted.

---

# K. Persistent / non-Battle utility

No speculative account-wide numeric collection bonus is proposed.

No anime-only dimensional hiding, hallucinogenic mist, mini-clone or eye-weakness mechanics are imported.

Future Story/World may author coral/environment interactions where the actual occurrence supports them; Combat does not fabricate environmental success.

---

# L. Anti-double-count / representation exclusions

Do not:
- add PL104/PL108 wholesale to a host;
- stack `three_tails` and `isobu` simultaneously;
- apply +10 Stamina and +10 Ninjutsu simultaneously from the same persistent beast;
- copy Isobu's explicit relationship-history eligibility rule to every other Tailed Beast pair;
- give the wild Three-Tails branch cooperative coral-development access automatically;
- duplicate Isobu source modifiers on a dedicated Jinchūriki representation that already embodies them;
- treat Coral Palm as generic Earth/Water access for unrelated Characters;
- infer anime-only abilities.

Batch 5 must audit exact Isobu Jinchūriki/transformation representations before layering these source packages.

---

# M. Player-facing summaries

## THREE-TAILS — WILD CARAPACE / ROLLING BODY POWER

> **Wild Three-Tails gives +10 Stamina in an authorised hosted state. Use partial shell manifestation for rolling charges, spike pressure and heavy defence. Once per Battle, a close physical attacker can be punished by Isobu's shell if they still break through your guard.**

## ISOBU — HIGH-RELATIONSHIP CORAL / WATER CONTROL

> **High-relationship Isobu gives +10 Ninjutsu and can grow coral from one successful Water or Isobu-assisted attack each Battle. Use Coral Palm and Shell Current Guard through the partnership, then develop Isobu-derived coral and Water techniques through the future Potential Skill system.**

---

# N. Decision state

**Identity / Base Stats / Base PL:** CLOSED by PL / Registry.  
**Relationship-state identity:** CLOSED by Registry; exact high-relationship evidence/threshold remains separate authority.  
**Canon research:** COMPLETE.  
**Shared manifested core:** PROPOSED.  
**Three-Tails manifested variants:** Wild Shell Crash + Spiked Recoil — PROPOSED.  
**Isobu manifested variants:** Coral Bulwark + Reef Current — PROPOSED.  
**Three-Tails Enhancement:** Carapace Instinct (+10 Effective Stamina + Shell Contact) — PROPOSED.  
**Three-Tails host-assisted Skills:** Partial Shell Roll / Spike Wake / Breakwater Curl — PROPOSED.  
**Isobu Enhancement:** Coral Tide Accord (+10 Effective Ninjutsu + Coral Follow-Through) — PROPOSED.  
**Isobu cooperative assisted Skills:** Coral Palm / Shell Current Guard — PROPOSED.  
**Isobu Potential Skill branch:** Reef Lance / Reef Prison / Breaking Tide — PROPOSED.  
**Implementation:** NOT STARTED.  
**Runtime validation:** NOT CLAIMED.  
**Golden:** NOT CLAIMED.

**Awaiting Stephen sign-off / edits.**

**proposal != design closed != implemented != runtime validated != Golden GREEN**
