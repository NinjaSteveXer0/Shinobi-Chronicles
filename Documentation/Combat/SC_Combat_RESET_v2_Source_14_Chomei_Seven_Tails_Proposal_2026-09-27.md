# Shinobi Chronicles — RESET v2 Source 14 Proposal: Seven-Tails / Chōmei

**Date:** 2026-09-27  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons / Tailed Beasts  
**Status:** **PROPOSED — PL / REGISTRY DEPENDENCY CLOSED / AWAITING STEPHEN MECHANICS SIGN-OFF**  
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

Exact Base Stats:

- Ninjutsu **98**
- Taijutsu **112**
- Bukijutsu **52**
- Fūinjutsu **54**
- Kinjutsu **102**
- Genjutsu **58**
- Stamina **112**

Formula v1.0 raw:

**106.966666...**

Base PL:

**107**

Registry state:

**DURABLY CALIBRATED / STAGED / NOT LIVE**

Asset:

`Assets/Tailed Beasts/seven_tails.png`

Fresh authority:
`Documentation/Registry/Seven Tails and Chomei Representation Recalibration 2026-09-27.md`

Calibration commit:
`27feea09f1916ab6d59359a4afd0b02d47950b09`

The retired historical PL103 row remains archaeology only and is NOT reactivated.

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

## Battle flight boundary

Current PL Battle authority explicitly preserves:

> **formation position != Combat range / distance / aggro / legality**

Therefore Source 14 does **not** create close/mid/far range bands or a generic reposition system.

Flight is expressed through exact turn-based predicates/states instead:

- `AIRBORNE`;
- `GROUND_CONTACT_REQUIRED`;
- `GROUND_BOUND` control/terrain authority;
- exact anti-air / flight / reach authority;
- visual tracking / reaction / intercept predicates;
- exact Formation-slot targeting where separately authored.

Canonical rules:

- flight does not make an actor globally untargetable;
- an `AIRBORNE` actor cannot be targeted by an action whose exact legality requires ground contact, unless that action also has explicit reach / flight / anti-air authority;
- ranged or otherwise legitimately air-capable actions remain legal;
- flight may defeat an exact `GROUND_BOUND` restriction only where the effect depends on staying on the ground and does not physically bind the actor's body;
- flight does not break ropes, coral, sand wrapped around the body, seals, chakra bindings or other body-bound control merely because the actor has wings;
- no hidden Speed, Dodge, Accuracy or distance Stat is created.

## Outside Battle — inherent flight capability

Flight is an **inherent contextual capability** of Chōmei / Seven-Tails when the exact present representation/source state physically provides flight.

It is NOT an Enhancement and does not require a separate learned "Fly" Skill.

Story / World / Mission content may automatically recognise flight for factual opportunities such as:
- reaching an elevated/open-air point;
- crossing a physically flyable gap;
- aerial observation from a legitimate viewpoint;
- carrying an appropriate payload/person where size/capability permits.

Occurrence authority still owns:
- whether a real aerial route exists;
- weather/hazard facts;
- payload feasibility;
- visibility/exposure;
- destination accessibility;
- actual success/outcome.

Flight does not fabricate a route, guarantee stealth, reveal hidden knowledge, cross sealed structures or solve an objective automatically.

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

> **Drive Chōmei's horn through one enemy for 46 ATK.**

Rules:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
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

Seven-Tails resolves a **FLIGHT-tagged ATTACK**.

Player text:

> **Stay airborne after a flying attack. Until Seven-Tails acts again, ground-contact attacks cannot target it unless they have reach or anti-air authority. Its next Flight action can ignore one ordinary ground-bound restriction.**

Effect:

after the qualifying attack resolves, Seven-Tails may enter `seven_tails_aerial_circuit`.

While active:

- Seven-Tails is **AIRBORNE** through its next action opportunity;
- an action tagged/defined as `GROUND_CONTACT_REQUIRED` cannot legally target Seven-Tails unless that exact action/source also has explicit reach / flight / anti-air authority;
- ranged or otherwise legitimately air-capable attacks remain legal;
- Seven-Tails' next **FLIGHT-tagged action** may ignore one ordinary `GROUND_BOUND` restriction that depends on being on the ground;
- that exception does NOT remove body-bound restraint, seals, chakra binding, anti-flight authority or impossible-environment constraints;
- no generic Dodge/Accuracy modifier is created.

The state ends:

- after Seven-Tails resolves its next action;
- if Seven-Tails voluntarily lands;
- if an exact effect forces grounding / suppresses flight.

Interaction:

- **Overrun Dive** qualifies for its ATK54 branch when Seven-Tails' immediately previous action was a legitimate FLIGHT-tagged action;
- Six-Wing Circuit itself adds no damage packet or scalar damage bonus.

Decision:

> **Stay airborne to deny ground-contact options and preserve a flight-capable next action, knowing proper ranged/anti-air responses still work.**

---

## Cooperative Chōmei-specific manifested actions

### 4B. `chomei_lucky_horn_vector` — **Lucky Horn Vector**

Class:

**ATTACK / CONTROLLED FLIGHT / FORMATION ROUTING**

Limit:

**once per Battle**

Target:

the enemy **Active**

ATK:

**40**

Player text:

> **Strike the enemy Active for 40 ATK and trace an aerial route through their formation. If the hit deals damage, Chōmei's next Flight attack may target one Benched enemy instead of the Active.**

Effect:
- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- on positive final damage establish `chomei_aerial_vector` through Chōmei's next action opportunity;
- while the vector is active, Chōmei's next **FLIGHT-tagged ATTACK** may choose one otherwise legal occupied **Benched** enemy instead of the enemy Active;
- Reserve targeting is NOT granted;
- the chosen attack keeps its normal ATK/effects;
- the vector is consumed when used or expires after Chōmei's next action;
- no bonus action;
- no Formation reorder/promotion;
- no random "luck" roll.

This turns cooperative flight into controlled **formation routing**, using the real Active/Benched Battle structure instead of invented range bands.

---

### 5B. `chomei_skyhook_rescue` — **Skyhook Rescue**

Class:

**REACTION / FLIGHT / EXTRACTION**

Limit:

**once per Battle**

Trigger:

Chōmei or its exact bonded controller is targeted by one direct action whose targeting legality is explicitly **GROUND_CONTACT_REQUIRED**, and legal flight is physically available.

Player text:

> **Chōmei snatches the target airborne before a ground-contact attack lands. Cancel that attack and keep the protected target airborne until their next action.**

Effect:
- the triggering GROUND_CONTACT_REQUIRED action cannot legally reach the protected target and resolves with **no damage/effect against that target**;
- the attacker still spent the committed action;
- protected target enters `chomei_airborne_rescue`;
- while airborne, actions requiring ground contact cannot target that actor unless they have explicit reach / flight / anti-air authority;
- ranged attacks and exact reach / flight / anti-air actions remain legal;
- the state ends when the protected actor resolves their next action, voluntarily lands, or is forced down;
- no generic Dodge percentage;
- no damage-reduction scalar;
- no counterattack;
- cannot trigger where exact restraints, sealed space or anti-flight authority prevent Chōmei from lifting the target.

This is cooperative Chōmei using flight to **change whether the attack line exists**, rather than copying another beast's armour/guard mechanic.

---

# F. Wild Seven-Tails Enhancement + host-assisted Skills

Valid only where future exact hosted/sealed authority permits `seven_tails` as an active wild/non-cooperative source.

## `seven_tails_unbound_wings` — **Unbound Wings**

Activation:

**HOSTED / WILD / NON-COOPERATIVE**

Player text:

> **Seven-Tails forces raw wings through your chakra. Once per Battle, overfeed one Taijutsu or Seven-Tails attack for +20% ATK and ignore one ordinary ground-bound restriction or ground-only intercept that would stop that attack.**

### Wing Overrun

Limit:

**once per Battle**

Use:
- host commits one direct **Taijutsu or Seven-Tails-assisted ATTACK**.

Effect:
- qualifying attack receives **+20% pre-Stamina Attack PL**;
- for that action only, ignore one ordinary `GROUND_BOUND` restriction or ground-only movement/intercept predicate that would otherwise make the attack illegal;
- this does NOT defeat:
  - body-bound restraints;
  - seals/chakra binding;
  - exact anti-flight authority;
  - untargetable states;
  - Formation-slot illegality not explicitly solved by the attack;
- no second action;
- no hidden range/reposition state.

This is wild Seven-Tails turning flight into **violent attack permission**, not a generic mobility button.

---

## `seven_tails_horn_dive_manifestation` — **Horn Dive Manifestation**

Classification:

**SOURCE-ASSISTED ATTACK / PARTIAL MANIFESTATION / FLIGHT**

Target:

one hostile

ATK:

**42**

Player text:

> **Manifest Seven-Tails' horn and wings and drive into one enemy for 42 ATK.**

Rules:
- host owns the action;
- one direct packet;
- ordinary Stamina mitigation;
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

host becomes subject to one ordinary **GROUND_BOUND** control/terrain state that depends on contact with the ground and does not physically bind the host's body.

Examples of qualifying source categories:
- unstable/impassable ground;
- ordinary ground snare zone;
- a terrain/control state whose restriction exists only while the actor remains grounded.

Player text:

> **Burst Seven-Tails' wings and leave the ground, escaping one ordinary ground-bound control state.**

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

> **Once per Battle after a Chōmei-assisted action, remain in controlled flight through the enemy's next action. Ground-contact attacks cannot target you, and your next Chōmei-assisted action can ignore one ordinary ground-bound restriction.**

### Controlled Flight

Limit:

**once per Battle**

Trigger:

the host resolves a legitimate **Chōmei-assisted Battle action**.

Effect:

the host may enter `chomei_controlled_flight` through the end of the enemy side's next normal action opportunity.

While active:

- the host is **AIRBORNE**;
- actions whose targeting legality is `GROUND_CONTACT_REQUIRED` cannot target the host unless they also possess explicit reach / flight / anti-air authority;
- ranged or otherwise air-capable actions remain legal;
- the host's next Chōmei-assisted action may ignore one ordinary `GROUND_BOUND` restriction that depends on remaining grounded;
- body-bound restraint, seals, anti-flight authority and unrelated targeting restrictions remain normal;
- no damage bonus;
- no extra action;
- no Dodge/Accuracy roll;
- no range/reposition state.

This is the cooperative Enhancement because Chōmei gives the host **controlled sustained flight across the opponent's turn**, not merely the biological fact that Chōmei can fly.

Outside Battle, flight remains an inherent automatic contextual capability and does not depend on Skyway Accord.

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

> **Let Chōmei form horn and wings through your chakra and strike one enemy for 42 ATK.**

Rules:
- host owns the action;
- one direct packet;
- ordinary Stamina mitigation;
- no Stun;
- no second Chōmei participant.

---

## `chomei_scale_trail_feint` — **Scale Trail Feint**

Classification:

**COOPERATIVE SOURCE-ASSISTED / FLIGHT / VISIBILITY**

SC divergence:

This is an explicit Shinobi Chronicles adaptation inspired by Fū's manga-supported host-linked **Scale Powder / Hiding in Scale Powder** technique.

It is NOT presented as proof that Chōmei independently uses Scale Powder as a manga-own manifested Skill.

Limit:

**once per Battle**

Use:

The host commits one legal **Chōmei-assisted FLIGHT ATTACK**.

Player text:

> **Scatter Chōmei-linked scale powder through the attack path. One ordinary reaction or intercept that depends on visually tracking that Flight action cannot trigger.**

Effect:
- the declared Flight attack otherwise resolves normally;
- one ordinary enemy **reaction / intercept** whose trigger requires direct visual tracking of that Flight action cannot trigger;
- this does NOT suppress:
  - area reactions that do not need exact visual tracking;
  - exact non-visual sensory/tracking authority;
  - sealed barriers;
  - anti-flight fields;
  - reactions that do not depend on visually tracking the Flight action;
- no bonus damage;
- no Blind condition;
- no invisibility state;
- no second action.

This gives cooperative Chōmei a precise **approach-control** tool instead of another generic damage reduction reaction.

---

# I. Chōmei-derived Potential Skill Roster — seed catalogue

These are Beta-facing **seed examples**, not a lifetime ceiling.

Global breadth/unlock framework remains under #382.

## Core source-derived flight/insect branch

### 1. `skill_chomei_horn_vector` — **Chōmei Art: Horn Vector**

Classification:

**LEARNABLE / CHŌMEI-DERIVED / FLIGHT / TAIJUTSU / FORMATION ROUTING**

SC origin:

**Original Shinobi Chronicles technique.**

Potential prerequisites:
- legitimate Chōmei-derived wing/horn capability;
- sufficient future-framework Taijutsu and/or source-control development;
- separate persistent unlock.

Limit:

**once per Battle**

Target:

enemy **Active**

ATK:

**40**

Player text:

> **Strike the enemy Active for 40 ATK. If it deals damage, your next Chōmei-derived Flight attack may target one Benched enemy instead.**

Rules:
- one direct packet;
- ordinary Stamina mitigation;
- positive final damage creates `chomei_horn_vector` through user's next action;
- next Chōmei-derived FLIGHT ATTACK may select one otherwise legal occupied Benched enemy instead of Active;
- Reserve access is not granted;
- no Formation reorder/promotion;
- no bonus action;
- no Wind Release.

This is the learned host analogue of Chōmei's controlled aerial formation-routing identity.

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

### 3. `skill_chomei_scale_veil` — **Chōmei Art: Scale Veil**

Classification:

**LEARNABLE / CHŌMEI-DERIVED / SCALE POWDER / VISIBILITY CONTROL**

SC divergence:

**Explicit Shinobi Chronicles host-development adaptation** from Fū's manga-supported Chōmei-linked Scale Powder technique.

This is not claimed as a manga-proven independent Chōmei-own Skill.

Potential prerequisites:
- legitimate Chōmei-derived source access;
- sufficient future-framework Ninjutsu / source-control development;
- exact training/development authority;
- separate persistent unlock.

Limit:

**once per Battle**

Target:

one hostile observer

Player text:

> **Fill the flight lane with luminous scale powder. Until your next action, that enemy cannot make a direct single-target attack against you if it requires ordinary visual tracking.**

Effect:
- apply `chomei_scale_veil` against one selected hostile observer through the user's next action opportunity;
- while active, that hostile cannot legally target the user with a direct single-target action whose targeting requires ordinary visual tracking;
- the hostile may still:
  - target another legal actor;
  - use an AREA action that does not require exact visual lock;
  - use exact non-visual sensory/tracking authority;
  - use an exact technique that explicitly penetrates/clears the veil;
- no generic Blind condition;
- no accuracy roll;
- no universal untargetability;
- effect ends after user's next action or exact counter-authority clears it.

Decision:

> **Use the veil to deny one observer's clean targeting lane, not to make yourself invisible to the whole battlefield.**

---

## Scale Powder — explicit source boundary

Fū's manga-supported **Scale Powder / Hiding in Scale Powder** proves a host-linked Chōmei-family technique exists.

However current research does NOT cleanly prove Chōmei independently uses the powder in manga.

Therefore this Source 14 proposal does NOT place Scale Powder in Chōmei's manifested own kit.

### Source 14 proposed treatment

Source 14 deliberately chooses the second route:

- Fū's exact canon technique remains a valid **Fū-specific character branch**;
- SC may also allow sufficiently developed legitimate Chōmei hosts to learn a **source-derived scale-powder branch**;
- that generalisation is an explicit **Shinobi Chronicles adaptation**, not a claim that manga Chōmei independently demonstrated it.

Current proposed adaptations:
- **Scale Trail Feint** — cooperative source-assisted approach control;
- **Chōmei Art: Scale Veil** — later learnable observer-specific visual targeting control.

No generic Blind status, combustion, poison, accuracy penalty or Cocoon mechanic is created.

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

## Inherent contextual capability — Flight

Chōmei / Seven-Tails flight is automatic contextual capability when the exact present source/body state physically provides it.

It is NOT:
- an Enhancement;
- a learned Skill requirement;
- a reward unlock merely to use wings the source already has.

Story / World / Mission may expose physically valid flight affordances automatically.

The same global law applies to other inherent source capabilities such as:
- message carrying/courier use where the source is physically capable;
- fitting through a physically plausible tight space;
- swimming/aquatic traversal;
- climbing/burrowing or equivalent body capability where actually supported.

Context owns whether the route/opportunity exists and what happens.

**inherent capability != guaranteed success**

**automatic contextual eligibility != automatic objective completion**

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

> **Wild Seven-Tails turns flight into aggression. Overfeed one attack through Unbound Wings, stay airborne through Six-Wing Circuit, and use raw flight to defeat ground-bound control without breaking real body restraints.**

## CHŌMEI — COOPERATIVE SKYWAY / CONTROLLED FLIGHT

> **Cooperative Chōmei controls the airspace. Skyway Accord can keep the host airborne across the enemy's turn, Lucky Horn Vector opens a one-action route to a Benched target, and Scale Powder development can disrupt visual reactions. Outside Battle, flight is automatic inherent capability rather than an Enhancement.**

---

# N. Decision state

**Persistent beast:** `beast_chomei` — preserved.  
**Chōmei Base Stats / PL107:** CLOSED by current Registry.  
**Seven-Tails exact representation:** ACCEPTED by PL / Registry — wild / non-cooperative raw-flight / horn-momentum, Base Stats `98/112/52/54/102/58/112`, Base PL **107**.  
**Historical retired Seven-Tails PL103 row:** RETIRED / NOT revived; fresh PL107 row is successor authority.  
**Shared manifested core:** PROPOSED.  
**Seven-Tails manifested variants:** Overrun Dive + Six-Wing Circuit — PROPOSED.  
**Chōmei manifested variants:** Lucky Horn Vector + Skyhook Rescue — PROPOSED.  
**Seven-Tails Enhancement:** Unbound Wings — PROPOSED.  
**Seven-Tails host-assisted Skills:** Horn Dive Manifestation / Wing Scissor / Groundbreak Lift — PROPOSED.  
**Chōmei Enhancement:** Skyway Accord — PROPOSED.  
**Chōmei cooperative assisted Skills:** Shining Horn Dive / Scale Trail Feint — PROPOSED.  
**Chōmei Potential Skill seed branch:** Horn Vector / Crosswing Sweep / Scale Veil — PROPOSED.  
**Scale Powder:** deliberately NOT in Chōmei's manifested own kit. Source 14 now proposes an explicit SC **host-development adaptation** through Scale Trail Feint / Scale Veil, grounded in Fū's manga-supported host-linked technique and clearly labelled as SC divergence.  
**Implementation:** NOT STARTED.  
**Runtime validation:** NOT CLAIMED.  
**Golden:** NOT CLAIMED.

**PL / Registry dependency #410 is CLOSED. Source 14 now requires only Stephen's final mechanics sign-off before Combat DESIGN CLOSED status.**

**proposal != design closed != implemented != runtime validated != Golden GREEN**
