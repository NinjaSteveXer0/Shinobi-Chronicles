# Shinobi Chronicles — RESET v2 Source 12 Proposal: Matatabi / Two-Tails

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

`beast_matatabi`

## `two_tails` — Two-Tails

Exact representation state:

**hostile encounter / non-cooperative**

Base Stats:

- Ninjutsu **98**
- Taijutsu **106**
- Bukijutsu **48**
- Fūinjutsu **54**
- Kinjutsu **104**
- Genjutsu **46**
- Stamina **108**

Base PL:

**103**

## `matatabi` — Matatabi

Exact representation state:

**named / friendly / cooperative**

Base Stats:

- Ninjutsu **104**
- Taijutsu **112**
- Bukijutsu **50**
- Fūinjutsu **58**
- Kinjutsu **108**
- Genjutsu **52**
- Stamina **112**

Base PL:

**108**

Same persistent beast.

Both exact representations reserve against simultaneous duplicate use.

No Matatabi Entity PL transfers wholesale to a host.

---

# B. Canon fingerprint

Secure identity:

**BLUE FIRE / FELINE PHYSICALITY / AGILITY / CLAW PRESSURE**

Canon anchors:

- Matatabi = Two-Tails;
- giant bakeneko/cat-like Tailed Beast;
- body is visually engulfed/composed of blue flame;
- Fire Release is canonical;
- **Cat Flame Roaring Fire** is manga-supported;
- **Great Cat Claw Attack** is manga-supported;
- feline agility/reflexive physical pressure is core identity;
- Matatabi is a normal Tailed Beast Ball user;
- named Matatabi presents as notably formal/respectful/polite.

Hard research boundary:

Blue flame colour does **not** automatically mean:
- unquenchable fire;
- soul damage;
- special chakra burn;
- healing flame;
- Amaterasu properties;
- Fire immunity.

Any SC-only blue-flame technique below uses ordinary authored Fire mechanics unless explicitly stated otherwise.

---

# C. Representation design law

Stephen's Source 11 rule carries forward:

> **uncooperative Bijū != punishment version**

and:

> **each uncooperative/cooperative pair must express that beast's own identity rather than copying Shukaku or Kurama.**

Matatabi's split therefore uses **feline predation vs controlled fire partnership**.

## `two_tails`

Mechanical projection:

**PREDATOR / PARTIAL FELINE MANIFESTATION / TAIJUTSU PRESSURE / HUNTING**

Where an exact future hosted lifecycle permits this non-cooperative state, Two-Tails offers dangerous body/chakra power because predatory escalation can serve the beast as well as the host.

Host-facing package:
- **Predator's Pulse** Enhancement;
- **Flame Claw Manifestation**;
- **Twin-Tail Maul**;
- **Hunting Pounce**;
- no automatic cooperative Matatabi blue-flame learnable branch.

## `matatabi`

Mechanical projection:

**CONTROLLED FIRE / AGILITY / PRECISE COOPERATION**

Host-facing package:
- **Blue Flame Accord** Enhancement;
- cooperative **Cat Flame Roaring Fire** assist;
- **Feline Flame Step** assist;
- Matatabi-derived blue-flame Fire Release Potential Skill branch.

This is not "good form stronger than bad form."

It is:

> **predatory body access vs refined elemental cooperation**

---

# D. Lifecycle / action economy

Tailed Beast is not an ordinary Summon.

## Host/sealed state

A hosted Matatabi/Two-Tails source does not automatically create:
- second participant;
- second turn;
- second Battle PL ledger;
- Entity PL transfer.

Source-assisted host Skills consume the host's normal action opportunity unless explicitly reaction-classed.

## Independent / manifested state

Where an authored lifecycle legitimately manifests the beast as an acting participant:
- use that exact representation's own Battle PL ledger;
- the beast becomes independently targetable;
- use the exact manifested palette below;
- the same persistent beast cannot also exist as a duplicate second source/body.

---

# E. Manifested Skill packages

Three actions are shared because both cards are the same Matatabi.

Two actions vary by exact representation.

## Shared core — `two_tails` + `matatabi`

### 1. `matatabi_cat_flame_roaring_fire` — **Cat Flame Roaring Fire**

Class:

**ATTACK / FIRE RELEASE**

Target:

one hostile

ATK:

**44**

Player text:

> **Blast one enemy with Matatabi's blue Fire Release for 44 ATK.**

Rules:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- blue flame is presentation/source identity;
- no automatic Burning;
- no unquenchable/fire-immunity inference;
- no automatic displacement.

---

### 2. `matatabi_great_cat_claw_attack` — **Great Cat Claw Attack**

Class:

**ATTACK / FELINE PHYSICAL**

Target:

one hostile

ATK:

**40**

Player text:

> **Rake one enemy with Matatabi's giant claw for 40 ATK.**

Rules:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- no automatic Bleed;
- no Stun;
- ordinary close-range attack.

---

### 3. `matatabi_tailed_beast_ball` — **Tailed Beast Ball**

Class:

**ATTACK / TAILED-BEAST CHAKRA**

Limit:

**once per Battle**

Target:

one hostile

ATK:

**58**

Player text:

> **Fire a compressed Tailed Beast Ball at one enemy for 58 ATK. Once per Battle.**

Rules:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- no invented area wipe;
- no automatic environmental destruction;
- no second action;
- exact Story/battlefield collateral remains occurrence-owned.

---

## Two-Tails-specific manifested actions

### 4A. `two_tails_predators_pounce` — **Predator's Pounce**

Class:

**ATTACK / FELINE PURSUIT**

Target:

one hostile

Base ATK:

**34**

Pursuit ATK:

**48**

Player text:

> **Pounce for 34 ATK. If that enemy moved, repositioned or tried to escape since Two-Tails' previous action, hunt them down for 48 instead.**

Rules:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- stronger branch requires genuine target movement/reposition/escape since Two-Tails' previous action opportunity;
- can bridge the ordinary battlefield distance created by that movement;
- no hidden Speed Stat;
- no universal movement cancellation;
- no Stun.

This is deliberate predatory chase pressure.

---

### 5A. `two_tails_flame_rake_rush` — **Flame-Rake Rush**

Class:

**ATTACK / FIRE-ASSISTED FELINE / AREA**

Target:

up to **2 legally exposed hostiles**

ATK:

**36 each**

Player text:

> **Rush through up to 2 exposed enemies with flame-wreathed claws for 36 ATK each.**

Rules:
- one direct packet per target;
- ordinary Stamina mitigation;
- Fire-assisted physical presentation;
- no automatic Burn/Bleed;
- no waiting/Benched/Reserve bypass;
- no bonus reposition after resolution.

This gives hostile Two-Tails a second aggressive manifested route rather than a defensive cooperative slot.

---

## Cooperative Matatabi-specific manifested actions

### 4B. `matatabi_blue_flame_arc` — **Blue Flame Arc**

Class:

**ATTACK / FIRE RELEASE / CONTROLLED AREA**

Target:

up to **2 legally exposed hostiles**

ATK:

**38 each**

Player text:

> **Sweep a controlled blue flame arc through up to 2 exposed enemies for 38 ATK each.**

Rules:
- one direct packet per target;
- ordinary Stamina mitigation;
- no automatic Burning;
- no waiting-slot targeting;
- no special blue-flame properties beyond exact authored Fire damage.

This is controlled flame shaping rather than Two-Tails' physical rush.

---

### 5B. `matatabi_feline_slip` — **Feline Slip**

Class:

**REACTION / DEFENSE / AGILITY**

Limit:

**once per Battle**

Trigger:

Matatabi is targeted by one direct **Taijutsu or Bukijutsu** Attack-PL packet.

Player text:

> **Slip across the attack line, reducing one physical attack's ATK by 55%. If it was a close-range attack, Matatabi may end at ordinary mid-range.**

Effect:
- reduce that qualifying packet **55% pre-Stamina**;
- ordinary Stamina then applies;
- if the triggering attack required close-range engagement, Matatabi may shift to ordinary mid-range separation after the attack resolves;
- no random dodge roll;
- no effect against pure Ninjutsu/Kinjutsu/Genjutsu packets;
- no untargetable state;
- no counterattack.

This expresses feline reflexes through deterministic positioning instead of generic evasion chance.

---

# F. Uncooperative Two-Tails Enhancement + host-assisted Skills

This host-facing branch is valid only where a future exact hosted/sealed lifecycle permits `two_tails` as the active non-cooperative source.

It is not inferred merely because a hostile encounter card exists.

## `two_tails_predators_pulse` — **Predator's Pulse**

Activation:

**HOSTED / NON-COOPERATIVE**

Player text:

> **Two-Tails heightens your predatory body. Gain +10 Taijutsu. Once per Battle, after an enemy hurts you directly, mark them as prey until your next action; your next Taijutsu or Two-Tails-assisted attack against them gains +20% ATK and can cross ordinary close-to-mid distance.**

### Effective Stat modifier

- controller **Effective Taijutsu +10**;
- source-owned modifier;
- recompute Effective PL normally;
- no Base Stat mutation;
- source removal ends the modifier;
- no unrelated Taijutsu Skill unlock.

### Mark Prey

Limit:

**once per Battle**

Trigger:
- host takes positive final damage from one direct hostile Attack-PL packet.

Effect:
- attacker receives `two_tails_marked_prey` until the end of the host's next action opportunity;
- host's next qualifying direct **Taijutsu or Two-Tails-assisted ATTACK** against that attacker:
  - receives **+20% pre-Stamina Attack PL**;
  - may bridge ordinary close-to-mid separation;
- mark ends when the qualifying attack resolves or the window expires;
- no bonus action;
- no forced targeting;
- host may decline to pursue.

This makes hostile Two-Tails valuable through retaliatory predation rather than a generic damage passive.

---

## `two_tails_flame_claw_manifestation` — **Flame Claw Manifestation**

Classification:

**SOURCE-ASSISTED ATTACK / PARTIAL MANIFESTATION / TAIJUTSU**

Target:

one hostile

ATK:

**40**

Player text:

> **Manifest Two-Tails' flame-wreathed claw through your body and rake one enemy for 40 ATK.**

Rules:
- host owns the action;
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- classification is Taijutsu with Two-Tails Fire-assisted source presentation;
- does not independently grant Fire Release discipline;
- no automatic Burn/Bleed;
- no second Entity participant.

---

## `two_tails_twin_tail_maul` — **Twin-Tail Maul**

Classification:

**SOURCE-ASSISTED ATTACK / PARTIAL MANIFESTATION / MULTI-TARGET**

Target:

up to **2 legally exposed hostiles**

ATK:

**32 each**

Player text:

> **Manifest both tails and maul up to 2 exposed enemies for 32 ATK each.**

Rules:
- one direct packet per target;
- ordinary Stamina mitigation;
- no waiting-slot bypass;
- no restraint;
- no second action.

---

## `two_tails_hunting_pounce` — **Hunting Pounce**

Classification:

**SOURCE-ASSISTED ATTACK / PARTIAL MANIFESTATION / PURSUIT**

Target:

one hostile

Base ATK:

**34**

Moved-target ATK:

**44**

Player text:

> **Pounce for 34 ATK. If that enemy moved or tried to escape since your previous action, hunt them down for 44 instead.**

Rules:
- host owns the action;
- one direct packet;
- ordinary Stamina mitigation;
- stronger branch requires genuine movement/reposition/escape by that target since host's previous action;
- may bridge ordinary distance created by that movement;
- no hidden Speed;
- no automatic movement cancellation.

---

# G. Cooperative Matatabi Enhancement

Available only from cooperative named `matatabi`.

## `matatabi_blue_flame_accord` — **Blue Flame Accord**

Activation:

**HOSTED / BONDED / COOPERATIVE**

Player text:

> **While Matatabi is genuinely cooperating with you, gain +10 Ninjutsu. Once per Battle, Matatabi can guide one direct Fire Release attack around one ordinary cover or line-of-fire obstruction.**

### Effective Stat modifier

- controller **Effective Ninjutsu +10**;
- source-owned modifier;
- Effective PL recomputes normally;
- no Base Stat mutation;
- does not grant unrelated Ninjutsu Skills.

### Guided Flame

Limit:

**once per Battle**

Use:
- controller declares one direct Fire Release ATTACK against an otherwise legal target;
- exactly one **ordinary cover / line-of-fire obstruction** would prevent the direct line.

Effect:
- Matatabi shapes/guides the flame around that ordinary obstruction;
- the attack resolves with its **normal authored ATK/effects**;
- no bonus damage;
- no second packet;
- cannot bypass sealed/impossible barriers, untargetable states, space-time separation, or lack of actual target knowledge.

This expresses cooperative flame control without inventing exotic blue-fire properties.

---

# H. Cooperative Matatabi source-assisted Skills

## `matatabi_assisted_cat_flame_roaring_fire` — **Cat Flame Roaring Fire**

Classification:

**COOPERATIVE SOURCE-ASSISTED ATTACK / FIRE RELEASE**

Target:

one hostile

ATK:

**42**

Player text:

> **Call on Matatabi to pour blue Fire Release through your attack for 42 ATK.**

Rules:
- host owns the action opportunity;
- Matatabi is the Fire causal source;
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- no automatic Burning;
- no requirement that the host independently knows Fire Release;
- use does not by itself teach Fire Release.

---

## `matatabi_feline_flame_step` — **Feline Flame Step**

Classification:

**COOPERATIVE SOURCE-ASSISTED ATTACK / MOVEMENT / FIRE**

Limit:

**once per Battle**

Target:

one hostile at ordinary close-to-mid separation

ATK:

**36**

Player text:

> **Let Matatabi carry you through a burst of blue flame, cross ordinary distance and strike for 36 ATK in one action.**

Rules:
- host owns the action;
- one direct packet;
- ordinary Stamina mitigation;
- bridges ordinary close-to-mid battlefield separation without a separate reposition action;
- after resolution the host is at ordinary close engagement unless exact Battle geometry says otherwise;
- cannot cross sealed/impossible barriers or superior movement restrictions;
- no untargetability during transit;
- no automatic Burn.

This is cooperative movement precision, not a generic teleport.

---

# I. Matatabi-derived Potential Skill Roster

This is the cooperative source-derived future-development branch.

It is **not automatically learned** from hosting Matatabi.

Global Potential Skill Roster semantics remain separately owned under #382.

Preserve:

> **Matatabi source access != learned Fire Release mastery**

> **potential != learned != prepared != mastered**

## 1. `skill_matatabi_blue_flame_crescent` — **Fire Release: Blue Flame Crescent**

Classification:

**LEARNABLE / FIRE RELEASE / MATATABI-DERIVED**

SC origin:

**Original Shinobi Chronicles technique.**

Potential prerequisites:
- legitimate cooperative Matatabi-derived Fire development route;
- sufficient future-framework **Ninjutsu**;
- legitimate Fire Release access/development;
- separate persistent unlock.

Battle use:

Target:

up to **2 legally exposed hostiles**

ATK:

**36 each**

Player text:

> **Shape Matatabi's blue flame into a sweeping crescent that strikes up to 2 exposed enemies for 36 ATK each.**

Rules:
- one direct packet per target;
- ordinary Stamina mitigation;
- no automatic Burn;
- blue colour is source expression, not a special damage class;
- no waiting-slot bypass.

---

## 2. `skill_matatabi_pouncing_flame` — **Fire Release: Pouncing Flame**

Classification:

**LEARNABLE / FIRE RELEASE / MOVEMENT / MATATABI-DERIVED**

SC origin:

**Original Shinobi Chronicles technique.**

Potential prerequisites:
- legitimate Matatabi-derived Fire development;
- sufficient future-framework **Ninjutsu**;
- sufficient **Taijutsu** or equivalent movement-control development predicate;
- separate persistent unlock.

Battle use:

Target:

one hostile

ATK:

**40**

Player text:

> **Ride a shaped burst of blue flame into one enemy for 40 ATK, crossing ordinary close-to-mid distance as part of the attack.**

Rules:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- bridges ordinary close-to-mid separation;
- ends at ordinary close engagement;
- no teleport;
- no Burn/Stun;
- no separate reposition action.

This is the learned Character technique analogue of Matatabi's feline/fire movement identity.

---

## 3. `skill_matatabi_blue_flame_guard` — **Fire Release: Blue Flame Guard**

Classification:

**LEARNABLE / FIRE RELEASE / DEFENSE / MATATABI-DERIVED**

SC origin:

**Original Shinobi Chronicles technique.**

Potential prerequisites:
- legitimate Matatabi-derived Fire development;
- sufficient future-framework Ninjutsu/control development;
- separate persistent unlock.

Limit:

**once per Battle**

Trigger:

one direct close-range Taijutsu or Bukijutsu packet targets the user.

Player text:

> **Flash Matatabi's blue flame across the approach, reducing one close-range physical attack's ATK by 45%.**

Effect:
- reduce qualifying packet **45% pre-Stamina**;
- ordinary Stamina then resolves;
- no damage reflected;
- no automatic Burn;
- no effect against ranged/pure Ninjutsu/Kinjutsu packets;
- no Fire immunity.

This turns controlled flame placement into defensive spacing without copying Matatabi's own Feline Slip.

---

# J. Counterplay / drawbacks

## Two-Tails
- Predator's Pulse requires the host to actually take positive direct damage before its once/Battle prey window can exist;
- marked prey does not force pursuit;
- Hunting Pounce requires genuine prior movement;
- partial manifestation does not create a second beast body;
- no cooperative Fire-development branch by default.

## Matatabi
- Guided Flame bypasses only one ordinary cover/line-of-fire obstruction;
- it does not bypass target knowledge, impossible barriers or untargetable states;
- Feline Flame Step cannot cross superior barriers;
- blue fire receives no invented exotic properties.

No generic Fire immunity is granted to either representation.

---

# K. Persistent / non-Battle utility

No speculative account-wide numeric collection bonus is proposed.

No automatic stealth/tracking capability is inferred merely because Matatabi is feline.

Future Story/World content may use an exact authored Matatabi sensory/mobility opportunity only where separately supported; Combat does not invent one here.

---

# L. Anti-double-count / representation exclusions

Do not:
- add PL103/PL108 wholesale to a host;
- stack `two_tails` and `matatabi` simultaneously;
- apply Two-Tails +10 Taijutsu and Matatabi +10 Ninjutsu simultaneously from the same persistent beast;
- treat blue flame as a new exotic damage type;
- infer Fire immunity;
- grant the cooperative Potential Skill branch to an arbitrary hostile Two-Tails encounter;
- duplicate Matatabi source modifiers on a dedicated Jinchūriki representation that already embodies them;
- grant Tailed Beast Ball to a host merely because manifested Matatabi owns it.

Batch 5 must audit dedicated Matatabi Jinchūriki/transformation representations before layering source packages.

---

# M. Player-facing summaries

## TWO-TAILS — PREDATORY FELINE / PARTIAL MANIFESTATION

> **Two-Tails gives +10 Taijutsu in an authorised non-cooperative host state. Once per Battle, an enemy who hurts you can become prey, empowering your next Taijutsu or Two-Tails attack against them. Manifest flame claws, both tails, or a hunting pounce for aggressive close pressure.**

## MATATABI — CONTROLLED BLUE FIRE / FELINE COOPERATION

> **Cooperative Matatabi gives +10 Ninjutsu and can guide one Fire Release attack around ordinary cover each Battle. Use Cat Flame Roaring Fire and Feline Flame Step through the partnership, then develop Matatabi-derived blue-flame Fire techniques through the future Potential Skill system.**

---

# N. Decision state

**Identity / Base Stats / Base PL:** CLOSED by PL / Registry.  
**Canon research:** COMPLETE.  
**Shared manifested core:** PROPOSED.  
**Two-Tails manifested variants:** Predator's Pounce + Flame-Rake Rush — PROPOSED.  
**Matatabi manifested variants:** Blue Flame Arc + Feline Slip — PROPOSED.  
**Two-Tails Enhancement:** Predator's Pulse (+10 Effective Taijutsu + prey retaliation window) — PROPOSED.  
**Two-Tails host-assisted Skills:** Flame Claw Manifestation / Twin-Tail Maul / Hunting Pounce — PROPOSED.  
**Matatabi Enhancement:** Blue Flame Accord (+10 Effective Ninjutsu + Guided Flame) — PROPOSED.  
**Matatabi cooperative assisted Skills:** Cat Flame Roaring Fire / Feline Flame Step — PROPOSED.  
**Matatabi Potential Skill branch:** Blue Flame Crescent / Pouncing Flame / Blue Flame Guard — PROPOSED.  
**Tailed Beast Ball:** shared manifested own action, ATK58 once/Battle — PROPOSED.  
**Implementation:** NOT STARTED.  
**Runtime validation:** NOT CLAIMED.  
**Golden:** NOT CLAIMED.

**Awaiting Stephen sign-off / edits.**

**proposal != design closed != implemented != runtime validated != Golden GREEN**
