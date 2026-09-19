# Shinobi Chronicles — RESET v2 Source 03: Ibuse

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **DESIGN CLOSED — STEPHEN SIGN-OFF — SOURCE 03 UNDER RESET v2**  
**Parent:** #235  
**Stephen sign-off:** 2026-09-19  
**Reset authority:** `Documentation/Combat/SC_Combat_Summons_Tailed_Beasts_Full_Calibration_RESET_v2_2026-09-18.md`  
**Global mechanics standard:** `Documentation/Combat/SC_Combat_Unique_Shinobi_Chronicles_Mechanics_Design_Standard_2026-09-19.md`  
**Source baseline:** `284e4e2a832219f640302e09de74bc48fdd708e5`

---

# A. Identity / PL

Stable ID:

`ibuse`

Display:

**Ibuse**

Ontology:

**Entity -> Summon**

Current Registry:

- Ninjutsu **58**
- Taijutsu **64**
- Bukijutsu **22**
- Fūinjutsu **18**
- Kinjutsu **68**
- Genjutsu **28**
- Stamina **76**
- Base PL **70**
- canonical association: **Hanzō**

This closure does not reopen those Base Stats / Base PL.

Canon anchors consumed before authoring:

- Ibuse is Hanzō's giant poisonous salamander Summon;
- Ibuse can exhale a poison mist that rapidly numbs/paralyses victims;
- the poison requires time to replenish after use;
- Ibuse can travel underground;
- Ibuse can surface beneath a target and swallow them, exposing them to poison inside its body.

SC divergence for the enhancement is explicit below.

---

# B. Battle role

**POISON SPECIALIST / CONTROL / AMBUSH**

Ibuse's identity is:

1. protect the attached controller from poison;
2. poison multiple enemies;
3. attack from underground;
4. exploit poisoned targets with swallowing/control;
5. force opponents to respect antidotes and poison timing.

Ibuse is not a generic Stamina stat-stick under RESET v2.

---

# C. Lifecycle / action economy

## OWNED

- Ibuse is present in the player's collection;
- ownership alone does not provide Poison Immunity globally.

## ATTACHED / PREPARED

- Ibuse is the Character's active Summon;
- **Salamander Poison Immunity is active immediately**;
- no second Battle PL ledger;
- no second turn.

## MANIFESTED

- Ibuse becomes independently targetable;
- own Battle PL ledger = his own Effective PL;
- own normal Entity action opportunity;
- **Salamander Poison Immunity remains active** because Ibuse is still the Character's active Summon source;
- no Ibuse PL/Stats transfer to controller.

If Ibuse leaves manifestation but remains attached:

- Poison Immunity remains;
- only Ibuse's body, own Battle PL ledger and own actions leave play.

Detaching or replacing Ibuse ends the enhancement.

---

# D. Enhancement Package

## `ibuse_salamander_poison_immunity` — **Poison Immunity**

Activation:

**ATTACHED** — remains active while manifested.

Player text:

> **Attach Ibuse to become immune to Poison.**

Exact Battle mechanics:

- the controller cannot receive a Battle condition whose resolver classification is `conditionType: poison` while Ibuse is the active attached Summon, including ordinary `poisoned` and source-authored `ibuse_neurotoxin`;
- attempts to establish a Battle poison condition on the controller fail;
- if an attached-state transition legitimately activates Ibuse while the controller already has one or more Battle conditions classified `conditionType: poison`, those Battle poison conditions are removed;
- this does **not** negate the raw damage of an attack that also carries poison;
- this does **not** grant immunity to Burning, sealing, paralysis, curse effects, venom-like Story outcomes or unrelated conditions unless their exact resolver class is `poison`;
- it does not rewrite past Story poisoning or automatically solve authored poison scenarios outside Battle;
- no Stat or direct PL bonus is granted.

SC divergence:

Hanzō's own poison resistance came from a salamander venom-sac body modification rather than merely summoning Ibuse. SC deliberately turns the salamander relationship into a readable Summon enhancement: **equipping Ibuse grants Battle Poison Immunity**.

This replaces the older generic `ibuse.salamanders_endurance` +6 Stamina enhancement.

---

# E. Own Skill Kit

## 1. `ibuse_poison_mist` — **Poison Mist**

Class:

**CONTROL / POISON**

Target:

up to **2 hostiles**

Player text:

> **Hit up to 2 enemies with poison gas for 8 Battle PL immediately. They become Neurotoxin Poisoned: movement is numbed, and fighting through it costs more Battle PL.**

Effects on each successfully affected target:

- deal **8 Battle PL immediately** from the poison exposure;
- this immediate poison damage **bypasses Stamina**;
- establish `ibuse_neurotoxin` with condition type `poison`;
- duration: until cured or after the target completes **3 action opportunities**;
- on the target's **first** poisoned action opportunity:
  - movement/reposition-required actions are unavailable;
  - this is not Stun;
- while `ibuse_neurotoxin` remains active:
  - when the target completes a **hostile ATTACK** action or a **movement/reposition/escape** action, it loses **6 Battle PL** after that action resolves;
  - this exertion damage bypasses Stamina;
  - maximum **2 exertion triggers** per application;
  - DEFENSE, SUPPORT and legitimate CLEANSE actions do not trigger the exertion damage;
- a compatible antidote/cleanse removes the poison profile immediately;
- reapplication refreshes the 3-action duration but does not restore already-spent exertion triggers beyond the profile maximum.

Maximum uncured poison pressure from one Mist application:

- **8 Battle PL immediately**;
- up to **12 additional Battle PL** if the target keeps fighting/moving through the poison;
- plus the first-action movement numbness.

Recharge:

- after use, **Poison Mist cannot be used during Ibuse's next 2 action opportunities**;
- it becomes available again after those two opportunities pass.

This makes Ibuse's poison a tactical threat: cure it, play defensively, or keep fighting and pay for it.

---

## 2. `ibuse_venom_bite` — **Venom Bite**

Class:

**ATTACK / POISON**

Target:

one hostile

ATK:

**24**

Player text:

> **Bite one enemy for 24 ATK and inflict Neurotoxin Poison.**

Effects:

- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- establish/refresh the same `ibuse_neurotoxin` Poison Profile;
- Venom Bite does **not** add the Mist's separate 8 Battle-PL cloud-exposure packet;
- the bite's immediate ATK24 is the immediate damage portion;
- no automatic Stun.

---

## 3. `ibuse_subterranean_ambush` — **Subterranean Ambush**

Class:

**ATTACK**

Target:

one hostile

ATK:

**28**

Player text:

> **Burrow underground and erupt beneath one enemy for 28 ATK.**

Rules:

- one direct packet;
- ordinary Stamina mitigation;
- can bridge ordinary battlefield positioning/reposition distance;
- burrowing does **not** make Ibuse permanently untargetable;
- cannot bypass an explicit sealed floor, anti-burrow barrier, space-time lock or other exact traversal prohibition.

---

## 4. `ibuse_swallow_trap` — **Swallow Trap**

Class:

**CONTROL**

Requirement:

target currently has `ibuse_neurotoxin`.

Target:

one hostile

Player text:

> **Swallow one Neurotoxin-Poisoned enemy. Deal 6 Battle PL from concentrated venom, then trap them inside Ibuse.**

Effect:

- target immediately loses **6 Battle PL**, bypassing Stamina;
- target receives `ibuse_swallowed` through the end of its next action opportunity;
- movement/reposition/escape actions are unavailable unless an exact escape effect overrides the trap;
- hostile direct attacks may target Ibuse only if otherwise legal;
- self-defense, self-cleanse and exact escape actions remain legal;
- not custody;
- not death;
- not Stun;
- condition ends if Ibuse is depleted/dismissed before target's next action completes.

This turns Ibuse's canonical swallow-and-poison tactic into clear Battle control without pretending swallowing automatically kills the target.

---

# F. Counter / drawback

Ibuse's main authored limitation is **Poison Mist recharge**.

After Poison Mist:

- unavailable for Ibuse's next **2** action opportunities;
- Venom Bite remains available for single-target poison pressure.

No artificial elemental weakness is added.

A compatible antidote/cleanse remains legitimate counterplay against `ibuse_neurotoxin`; the shared poison classification may reuse authorised poison-cure plumbing without collapsing Neurotoxin into the generic poison profile.

Poison Immunity protects the controller; it does not make Ibuse's poison impossible to counter.

---

# G. Persistent / collection progression

No account-wide persistent collection bonus is proposed for Ibuse.

Its defining enhancement is **ATTACHED Poison Immunity**.

This is an explicit audited decision.

---

# H. Double-count / representation exclusions

- Ibuse PL70 is Ibuse's own Battle capacity only.
- Poison Immunity is a categorical controller enhancement, not Stamina/PL transfer.
- do not also apply the legacy +6 Stamina package if this proposal is approved.
- ordinary Poison immunity does not imply immunity to every harmful status.
- Ibuse's own poison uses source-authored `ibuse_neurotoxin` with shared `conditionType: poison`; this reuses common poison classification/cure plumbing without turning Neurotoxin into the generic `poisoned` profile or creating a second universal poison system.
- dedicated future Character representations that explicitly embody this same poison-immunity package must not receive it twice.

---

# I. Player-facing summary

## IBUSE — POISON SPECIALIST / CONTROL

> **Attach Ibuse to become immune to Poison. Manifest him to hit enemies with Neurotoxin: it hurts immediately, numbs movement, and punishes them for fighting through it. Poisoned enemies can also be swallowed for extra damage and control.**

That is the complete player-facing identity.

---

# J. Current-source replacement note

Current runtime contains:

- `ibuse.salamanders_endurance` = +6 Stamina;
- `ibuse_poison_mist` = current legacy **4 immediate Battle PL + generic poison**;
- `ibuse_venom_bite` = ATK13 + poison;
- `ibuse_subterranean_ambush` = ATK10 / ATK13 contextual;
- generic `poisoned` = 2 Battle PL per end-of-action tick, maximum 3 ticks, Stamina bypass, refresh-not-stack, standard antidote compatible.

Stephen sign-off requires implementation to:

- replace +6 Stamina with attached **Poison Immunity**;
- do **not** preserve the legacy generic 2-BP x 3-tick poison profile as Ibuse's final specialist design;
- implement `ibuse_neurotoxin` as the source-authored Ibuse Poison Profile;
- preserve the design law that a damaging Poison application does meaningful immediate damage and then creates a meaningful poison problem;
- replace old Ibuse attack numerics/action package with this signed-off kit;
- add the authored Poison Mist recharge and Swallow Trap semantics;
- do not stack old and new effects;
- no runtime implementation / validation is claimed by this proposal.

**DESIGN CLOSED.** Implementation / runtime validation / Golden remain separate.

**design closed != implemented != runtime validated != Golden GREEN**
