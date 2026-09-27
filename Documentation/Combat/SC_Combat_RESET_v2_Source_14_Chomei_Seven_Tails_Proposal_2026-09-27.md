# Shinobi Chronicles — RESET v2 Source 14 Proposal: Seven-Tails / Chōmei

**Date:** 2026-09-27  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons / Tailed Beasts  
**Status:** **MECHANICS PROPOSED — NEW SEVEN-TAILS EXACT REPRESENTATION REQUIRES PL / REGISTRY RECALIBRATION**  
**Parent:** #235  
**Reset authority:** `Documentation/Combat/SC_Combat_Summons_Tailed_Beasts_Full_Calibration_RESET_v2_2026-09-18.md`  
**Canon research:** `Documentation/Combat/SC_Combat_Tailed_Beasts_Canon_Research_Shukaku_Matatabi_Isobu_Chomei_2026-09-27.md`  
**Prior PL / Registry authority:** `Documentation/Registry/Tailed Beast Pair Snake and Pakkun PL Registry Reconciliation 2026-09-18.md`

---

# A. Owner-direction / Registry delta

Prior Registry authority accepted only:

- `chomei` — Chōmei / Seven-Tails — PL107;

and explicitly retired the former separate `seven_tails` PL103 row because alternate artwork alone was insufficient to mint a second representation.

On **2026-09-27**, Stephen explicitly directed Combat to author:

> **Seven Tails and Chōmei**

as the next Tailed-Beast pair.

Combat therefore treats this as **new owner direction to create a deliberate second exact representation**, NOT permission to silently revive the retired numeric row.

Proposed representation semantics:

## `seven_tails` — Seven-Tails

**wild / non-cooperative exact representation**

Mechanical identity:

**AERIAL OVERRUN / HORN-CARAPACE MOMENTUM / RAW FLIGHT**

Exact Base Stats / Base PL:

**OPEN — PL / Registry / Rank must recalibrate under current Formula v1.0.**

The retired historical PL103 row may be inspected as archaeology only. It is not reactivated by this proposal.

## `chomei` — Chōmei

**named / friendly / cooperative exact representation**

Current closed Registry row:

- Ninjutsu **104**
- Taijutsu **108**
- Bukijutsu **48**
- Fūinjutsu **58**
- Kinjutsu **104**
- Genjutsu **68**
- Stamina **112**
- Base PL **107**

Persistent beast key remains:

`beast_chomei`

Same persistent beast.

Both representations must reserve against simultaneous duplicate use once the new Seven-Tails row is accepted.

No Entity PL transfers wholesale to a host.

---

# B. Canon fingerprint

Secure identity:

**FLIGHT / INSECT BODY / HORN CHARGE / BITE**

Canon anchors:

- Chōmei = Seven-Tails;
- insect / rhinoceros-beetle-like body;
- six tail structures function as wings;
- genuine flight;
- **Spear Attack Shining Horn** is manga-supported;
- **Bug Bite** is manga-supported through Fū's transformed state and is usable as cautious Chōmei-family body authority;
- Chōmei is upbeat/happy-go-lucky.

Important boundaries:

- flight does NOT prove Wind Release;
- no generic poison;
- no automatic evasion chance merely because Chōmei flies;
- no Cocoon baseline;
- no combustible scale powder;
- no direct manga proof that Chōmei itself owns Scale Powder as an independent beast technique.

Fū's Scale Powder / Hiding in Scale Powder is manga-supported host material.

If SC later generalises scale-powder development beyond Fū, that must be labelled an explicit SC adaptation.

---

# C. Representation design law

Stephen's closed Bijū rules apply:

> **wild/uncooperative != punishment version**

> **each Bijū pair must express its own relationship identity**

> **same persistent beast != identical prepared package**

For Chōmei:

## Seven-Tails

The wild/non-cooperative state offers:

- violent partial wing manifestation;
- rapid aerial engagement;
- horn/body momentum;
- escape from ordinary **ground-route** control;
- aggressive fly-through attacks.

It is not "Chōmei minus cooperation."

## Chōmei

The cooperative named state offers:

- controlled flight;
- precise aerial routing;
- defensive extraction/reposition;
- shared aerial attack lines;
- a broad future flight/insect-body Potential Skill branch.

Cooperation makes flight **controlled and reusable**, rather than simply more destructive.

---

# D. Lifecycle / flight grammar

Tailed Beast is not an ordinary Summon.

A hosted relationship does not automatically create:
- a second participant;
- a second turn;
- a second Battle PL ledger;
- Entity PL transfer.

## Flight boundary

Flight is real source capability, but it is not generic untargetability.

Where an exact Chōmei/Seven-Tails action establishes aerial movement:

- ordinary **ground-only route obstruction** may be bypassed where physically plausible;
- ordinary close-to-mid separation may be crossed when the action says so;
- flight does not bypass sealed ceilings, impossible barriers, space-time separation or exact anti-flight authority;
- flying does not automatically avoid ranged attacks;
- flying does not create a generic Dodge/Speed Stat;
- an action must explicitly grant any defensive benefit.

---

# E. Manifested Skill packages

Three core actions are shared.

Two prepared actions vary by exact representation.

## Shared core — Seven-Tails + Chōmei

### 1. `chomei_spear_attack_shining_horn` — **Spear Attack: Shining Horn**

Class:

**ATTACK / HORN / AERIAL CHARGE**

Target:

one hostile

ATK:

**46**

Player text:

> **Drive Chōmei's horn through one enemy for 46 ATK, crossing ordinary close-to-mid distance as part of the charge.**

Rules:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- may bridge ordinary close-to-mid separation;
- no separate reposition action;
- no automatic Stun;
- no Wind Release classification.

---

### 2. `chomei_bug_bite` — **Bug Bite**

Class:

**ATTACK / INSECT PHYSICAL**

Target:

one hostile

ATK:

**38**

Player text:

> **Bite one enemy for 38 ATK.**

Rules:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- no Poison;
- no Bleed;
- no automatic restraint.

Simple by design: the body mechanic is canon-supported and does not need a fake status rider.

---

### 3. `chomei_wingbeat_crossing` — **Wingbeat Crossing**

Class:

**ATTACK / FLIGHT / AREA**

SC origin:

**Original Shinobi Chronicles technique built from Chōmei's canonical flight/body identity.**

Target:

up to **2 legally exposed hostiles**

ATK:

**34 each**

Player text:

> **Fly through up to 2 exposed enemies and strike each for 34 ATK.**

Rules:
- one packet per target;
- ordinary Stamina mitigation;
- ordinary ground-only route obstruction may be crossed where physically plausible;
- no waiting/Benched/Reserve bypass;
- no Wind Release classification;
- no automatic forced movement.

---

## Seven-Tails-specific manifested actions

### 4A. `seven_tails_overrun_dive` — **Overrun Dive**

Class:

**ATTACK / FLIGHT / MOMENTUM**

Target:

one hostile

Base ATK:

**40**

Flight-momentum ATK:

**54**

Player text:

> **Dive into one enemy for 40 ATK. If Seven-Tails crossed ordinary battlefield distance on its previous action, carry that flight momentum through for 54 instead.**

Rules:
- one direct packet;
- ordinary Stamina mitigation;
- ATK54 requires the immediately previous Seven-Tails action to have included legitimate movement/flight crossing;
- no hidden Speed Stat;
- no Stun;
- no bonus action.

This is wild Chōmei-family power expressed as momentum rather than precision.

---

### 5A. `seven_tails_six_wing_circuit` — **Six-Wing Circuit**

Class:

**FLIGHT STATE / AERIAL ROUTING / MOMENTUM**

Limit:

**once per Battle**

Trigger:

Seven-Tails resolves a **FLIGHT-tagged ATTACK** that actually crossed ordinary battlefield distance.

Player text:

> **Stay airborne after a flying attack. Until Seven-Tails acts again, ordinary ground-bound close attacks cannot reach it. Its next flight attack can cross ordinary battlefield distance without first repositioning.**

Effect:

after the qualifying attack resolves, Seven-Tails may enter `seven_tails_aerial_circuit`.

While `seven_tails_aerial_circuit` is active:

- Seven-Tails remains **airborne** through its next action opportunity;
- an attack that is explicitly **ground-bound and close-range** cannot legally target Seven-Tails unless that attacker has an exact reach / flight / anti-air capability that solves the height problem;
- ranged attacks remain legal;
- Ninjutsu / Kinjutsu / Bukijutsu or other actions that can legitimately reach the airborne target remain legal;
- Seven-Tails' next **FLIGHT-tagged ATTACK** may cross ordinary close-to-mid battlefield separation and ordinary ground-only route obstruction without spending a separate reposition action;
- no generic Dodge percentage is created;
- Seven-Tails is not globally untargetable;
- sealed ceilings, anti-flight authority, forced grounding or impossible aerial routes can end/prevent the state.

The state ends:

- after Seven-Tails resolves its next action;
- if Seven-Tails voluntarily lands;
- if an exact effect forces it out of flight.

Interaction:

- **Overrun Dive** may qualify for its ATK54 momentum branch if the immediately previous qualifying action established Six-Wing Circuit through legitimate flight movement;
- Six-Wing Circuit itself adds **no damage packet and no scalar damage bonus**.

Decision:

> **Use the aerial circuit to stay above ground-bound pressure and preserve a flight lane for the next attack, knowing ranged/anti-air enemies can still punish the airborne route.**

This is deliberately NOT another shell guard. Its identity comes from Chōmei's six wing-tail structures and sustained aerial routing.

---

## Cooperative Chōmei-specific manifested actions

### 4B. `chomei_lucky_horn_vector` — **Lucky Horn Vector**

Class:

**ATTACK / CONTROLLED FLIGHT / POSITIONING**

Target:

one hostile

ATK:

**40**

Player text:

> **Strike one enemy for 40 ATK, then choose to remain engaged or fly back to ordinary mid-range.**

Rules:
- one direct packet;
- ordinary Stamina mitigation;
- after resolution choose:
  - **PRESS** — remain in ordinary close engagement;
  - **BREAK AWAY** — move to ordinary mid-range where legal;
- no random "luck" roll;
- no bonus action;
- no Wind Release.

Chōmei's "lucky" motif stays personality/flavour; it does not become RNG.

---

### 5B. `chomei_wing_shelter` — **Wing Shelter**

Class:

**REACTION / DEFENSE / ALLY EXTRACTION**

Limit:

**once per Battle**

Trigger:

Chōmei or its exact bonded controller is targeted by one direct Attack-PL packet while ordinary reposition remains legal.

Player text:

> **Chōmei sweeps the target out of the attack line. Reduce one direct hit by 50%, then carry the protected target to ordinary mid-range if the route is open.**

Effect:
- reduce triggering direct packet **50% pre-Stamina**;
- ordinary Stamina then resolves against the original target;
- after resolution, protected target may move to ordinary mid-range;
- no target swap;
- no duplicated packet;
- no untargetability;
- sealed/impossible routes or exact movement locks can prevent the reposition.

This gives cooperative Chōmei a protective flight identity instead of another generic guard.

---

# F. Wild Seven-Tails Enhancement + host-assisted Skills

Valid only where future exact hosted/sealed authority permits `seven_tails` as an active wild/non-cooperative source.

## `seven_tails_unbound_wings` — **Unbound Wings**

Activation:

**HOSTED / WILD / NON-COOPERATIVE**

Player text:

> **Seven-Tails forces raw wings through your chakra. Once per Battle, overrun one enemy from ordinary close-to-mid distance for +20% ATK and ignore one ordinary ground-only route obstruction.**

No generic Stat bonus is required.

This Enhancement is intentionally a **capability change**, not another Stat stick.

### Wing Overrun

Limit:

**once per Battle**

Use:
- host declares one direct Taijutsu or Seven-Tails-assisted ATTACK against an otherwise legal target;
- target may be at ordinary close-to-mid separation;
- one ordinary **ground-only route obstruction** may lie between them.

Effect:
- bridge the ordinary separation as part of the attack;
- bypass that one ordinary ground-only route obstruction where flight physically solves it;
- qualifying attack receives **+20% pre-Stamina ATK**;
- after resolution, host remains in ordinary close engagement unless the exact attack says otherwise;
- cannot bypass sealed ceilings, impossible barriers, untargetable states, space-time separation or lack of target knowledge;
- no second action.

This gives wild Seven-Tails a powerful aggressive aerial route without copying Shukaku/Matatabi/Isobu Stat Enhancements.

---

## `seven_tails_horn_dive_manifestation` — **Horn Dive Manifestation**

Classification:

**SOURCE-ASSISTED ATTACK / PARTIAL MANIFESTATION / FLIGHT**

Target:

one hostile

ATK:

**42**

Player text:

> **Manifest Seven-Tails' horn and wings, cross ordinary distance and drive into one enemy for 42 ATK.**

Rules:
- host owns the action;
- one direct packet;
- ordinary Stamina mitigation;
- bridges ordinary close-to-mid separation;
- no Stun;
- no second Entity body.

---

## `seven_tails_wing_scissor` — **Wing Scissor**

Classification:

**SOURCE-ASSISTED ATTACK / PARTIAL MANIFESTATION / AREA**

Target:

up to **2 legally exposed hostiles**

ATK:

**34 each**

Player text:

> **Manifest the wing-tails and cut through up to 2 exposed enemies for 34 ATK each.**

Rules:
- one packet per target;
- ordinary Stamina mitigation;
- no Bleed;
- no waiting-slot bypass;
- no Wind Release classification.

---

## `seven_tails_groundbreak_lift` — **Groundbreak Lift**

Classification:

**SOURCE-ASSISTED REACTION / FLIGHT / MOVEMENT**

Limit:

**once per Battle**

Trigger:

host becomes subject to one ordinary **ground-dependent movement restriction** that does not physically bind the host's body.

Examples of qualifying source categories:
- unstable/impassable ground;
- ordinary ground snare zone;
- terrain effect that prevents walking/reposition through the floor route.

Player text:

> **Burst Seven-Tails' wings and leave the ground, escaping one ordinary ground-bound movement restriction.**

Effect:
- remove/ignore one qualifying ground-dependent movement restriction for the host;
- does NOT break ropes, coral, sand wrapped around the body, seals, chakra restraints or other actual body-binding effects;
- no damage;
- no bonus action;
- exact anti-flight or sealed-space authority may prevent it.

This makes flight matter mechanically without becoming a universal cleanse.

---

# G. Cooperative Chōmei Enhancement

## `chomei_skyway_accord` — **Skyway Accord**

Activation:

**HOSTED / BONDED / COOPERATIVE**

Player text:

> **Cooperative Chōmei gives you controlled wing access. Once per Battle, one movement-dependent attack can cross ordinary close-to-mid distance and one ordinary ground-only obstruction without spending a separate reposition action. Outside Battle, authored scenes may offer legitimate aerial routes.**

### Battle: Skyway Route

Limit:

**once per Battle**

Use:
- host declares one otherwise legal movement-dependent ATTACK;
- target is at ordinary close-to-mid separation and/or one ordinary ground-only route obstruction lies between them.

Effect:
- Chōmei carries the host through the valid aerial route;
- declared attack resolves at its normal authored ATK/effects;
- no bonus damage;
- no separate reposition action;
- cannot cross sealed/impossible barriers, unknown destinations, space-time separation or exact anti-flight authority.

### Non-Battle: Aerial Access

Where Story/World authorises an actual reachable aerial route, cooperative Chōmei may enable:
- crossing a chasm/roofline/vertical approach;
- reaching an elevated point;
- bypassing an ordinary ground-route obstruction;
- aerial reconnaissance from a physically plausible viewpoint.

It does NOT guarantee:
- stealth;
- Mission success;
- knowledge of hidden facts;
- entry through sealed structures;
- safe flight through authored hazards.

This is a source-specific traversal Enhancement rather than a generic Stat bonus.

---

# H. Cooperative Chōmei source-assisted Skills

## `chomei_assisted_shining_horn` — **Shining Horn Dive**

Classification:

**COOPERATIVE SOURCE-ASSISTED ATTACK / FLIGHT / HORN**

Target:

one hostile

ATK:

**42**

Player text:

> **Let Chōmei form horn and wings through your chakra, cross ordinary distance and strike for 42 ATK.**

Rules:
- host owns the action;
- one direct packet;
- ordinary Stamina mitigation;
- bridge ordinary close-to-mid separation;
- no Stun;
- no second Chōmei participant.

---

## `chomei_lift_and_break` — **Lift and Break**

Classification:

**COOPERATIVE SOURCE-ASSISTED REACTION / DEFENSE / FLIGHT**

Limit:

**once per Battle**

Trigger:

host is targeted by one direct close-range Taijutsu/Bukijutsu packet.

Player text:

> **Chōmei lifts you off the attack line. Reduce one close physical hit by 50%, then move to ordinary mid-range if the route is open.**

Effect:
- reduce triggering packet **50% pre-Stamina**;
- ordinary Stamina resolves;
- host may shift to ordinary mid-range after resolution;
- no random dodge;
- no counterattack;
- exact movement lock / sealed environment can prevent reposition.

---

# I. Chōmei-derived Potential Skill Roster — seed catalogue

These are Beta-facing **seed examples**, not a lifetime ceiling.

Global breadth/unlock framework remains under #382.

## Core source-derived flight/insect branch

### 1. `skill_chomei_horn_vector` — **Chōmei Art: Horn Vector**

Classification:

**LEARNABLE / CHŌMEI-DERIVED / FLIGHT / TAIJUTSU**

SC origin:

**Original Shinobi Chronicles technique.**

Potential prerequisites:
- legitimate Chōmei-derived wing/horn capability;
- sufficient future-framework Taijutsu and/or source-control development;
- separate persistent unlock.

Target:

one hostile

ATK:

**40**

Player text:

> **Manifest a horned aerial line, cross ordinary close-to-mid distance and strike for 40 ATK. Afterward choose to remain close or break back to mid-range.**

Rules:
- one packet;
- ordinary Stamina mitigation;
- no Stun;
- no Wind Release;
- reposition choice after resolution where legal.

---

### 2. `skill_chomei_crosswing_sweep` — **Chōmei Art: Crosswing Sweep**

Classification:

**LEARNABLE / CHŌMEI-DERIVED / PARTIAL WINGS / AREA**

Target:

up to **2 legally exposed hostiles**

ATK:

**36 each**

Player text:

> **Sweep manifested wing-tails through up to 2 exposed enemies for 36 ATK each.**

Rules:
- one packet per target;
- ordinary Stamina mitigation;
- no Bleed;
- no Wind classification;
- no waiting-slot bypass.

---

### 3. `skill_chomei_carapace_glide` — **Chōmei Art: Carapace Glide**

Classification:

**LEARNABLE / CHŌMEI-DERIVED / DEFENSE / FLIGHT**

Limit:

**once per Battle**

Trigger:

one direct close-range physical packet targets the user.

Player text:

> **Turn a partial carapace into a gliding retreat. Reduce one close physical attack's ATK by 45%, then shift to ordinary mid-range if the route is open.**

Effect:
- reduce packet **45% pre-Stamina**;
- ordinary Stamina resolves;
- optional mid-range reposition after resolution;
- no counterattack;
- no generic Dodge.

---

## Scale Powder — explicit source boundary

Fū's manga-supported **Scale Powder / Hiding in Scale Powder** proves a host-linked Chōmei-family technique exists.

However current research does NOT cleanly prove Chōmei independently uses the powder in manga.

Therefore this Source 14 proposal does NOT place Scale Powder in Chōmei's manifested own kit.

### Proposed future treatment

Scale Powder should enter the Potential Skill system as either:

1. a **Fū-specific character hybrid branch** where her exact history supports it; and/or
2. a later **explicit SC adaptation** that allows other sufficiently developed Chōmei hosts to learn a scale-powder branch.

No generic blindness, combustion, poison or Cocoon mechanics are authored here.

---

# J. Counterplay / drawbacks

## Seven-Tails
- Wild flight is aggressive, not untargetability;
- Wing Overrun is once/Battle;
- Groundbreak Lift only defeats ground-dependent route restrictions, not body restraints;
- no cooperative traversal utility outside exact future authority;
- no Scale Powder branch by default.

## Chōmei
- Skyway Route provides movement/access, not bonus damage;
- flight does not bypass sealed/impossible barriers;
- Lift and Break works only against close physical packets;
- no Wind Release inferred;
- no RNG "luck" mechanic;
- no generic poison/evasion.

---

# K. Persistent / non-Battle utility

Cooperative Chōmei's **Aerial Access** is the primary non-Battle utility.

Occurrence authority owns:
- whether a real aerial route exists;
- weather/hazard facts;
- destination accessibility;
- stealth/exposure;
- what can actually be observed.

Wild Seven-Tails receives no automatic peaceful traversal utility merely from encounter existence.

---

# L. Anti-double-count / representation exclusions

Do not:
- revive historical `seven_tails` PL103 without PL/Registry recalibration;
- stack Seven-Tails and Chōmei simultaneously;
- treat both exact representations as separate beasts;
- transfer Entity PL wholesale to a host;
- duplicate source modifiers/capabilities on dedicated Jinchūriki representations already embodying them;
- infer Wind Release from flight;
- infer Poison from insect body;
- infer Scale Powder as Chōmei-own manga technique;
- infer Cocoon from anime material.

Batch 5 must audit any dedicated Chōmei/Fū/Jinchūriki representations before layering the source package.

---

# M. Player-facing summaries

## SEVEN-TAILS — WILD AERIAL OVERRUN

> **Wild Seven-Tails turns flight into aggression. Overrun enemies across ordinary battlefield distance, manifest horn and wing-tails for aerial attacks, and use raw flight to escape ground-bound route control. Flight does not make you untargetable or break actual body restraints.**

## CHŌMEI — COOPERATIVE SKYWAY / CONTROLLED FLIGHT

> **Cooperative Chōmei gives controlled aerial access. Once per Battle, carry one movement-dependent attack across ordinary distance or a ground-only obstruction without a separate reposition action. Outside Battle, authored aerial routes can open new ways through the world.**

---

# N. Decision state

**Persistent beast:** `beast_chomei` — preserved.  
**Chōmei Base Stats / PL107:** CLOSED by current Registry.  
**New Seven-Tails exact representation:** PROPOSED by Stephen's current owner direction; **PL/Registry numeric row OPEN**.  
**Historical retired Seven-Tails PL103 row:** NOT automatically revived.  
**Shared manifested core:** PROPOSED.  
**Seven-Tails manifested variants:** Overrun Dive + Six-Wing Circuit — PROPOSED.  
**Chōmei manifested variants:** Lucky Horn Vector + Wing Shelter — PROPOSED.  
**Seven-Tails Enhancement:** Unbound Wings — PROPOSED.  
**Seven-Tails host-assisted Skills:** Horn Dive Manifestation / Wing Scissor / Groundbreak Lift — PROPOSED.  
**Chōmei Enhancement:** Skyway Accord — PROPOSED.  
**Chōmei cooperative assisted Skills:** Shining Horn Dive / Lift and Break — PROPOSED.  
**Chōmei Potential Skill seed branch:** Horn Vector / Crosswing Sweep / Carapace Glide — PROPOSED.  
**Scale Powder:** deliberately NOT in manifested own kit; future Fū-specific hybrid and/or explicit SC adaptation remains open.  
**Implementation:** NOT STARTED.  
**Runtime validation:** NOT CLAIMED.  
**Golden:** NOT CLAIMED.

**Combat can close mechanics after Stephen sign-off, but full Source 14 closure additionally requires PL/Registry return for the newly deliberate Seven-Tails exact representation.**

**proposal != design closed != implemented != runtime validated != Golden GREEN**
