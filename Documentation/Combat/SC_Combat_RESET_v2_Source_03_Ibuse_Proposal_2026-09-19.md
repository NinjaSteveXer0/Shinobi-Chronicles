# Shinobi Chronicles — RESET v2 Source 03 Proposal: Ibuse

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **PROPOSED FOR STEPHEN SIGN-OFF — SOURCE 03 UNDER RESET v2**  
**Parent:** #235  
**Reset authority:** `Documentation/Combat/SC_Combat_Summons_Tailed_Beasts_Full_Calibration_RESET_v2_2026-09-18.md`  
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

This proposal does not reopen those Base Stats / Base PL.

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

- the controller cannot receive the ordinary Battle condition `poisoned` while Ibuse is the active attached Summon;
- attempts to establish `poisoned` on the controller fail;
- if an attached-state transition legitimately activates Ibuse while the controller already has the ordinary `poisoned` Battle condition, that condition is removed;
- this does **not** negate the raw damage of an attack that also carries poison;
- this does **not** grant immunity to Burning, sealing, paralysis, curse effects, venom-like Story outcomes or unrelated conditions unless their exact resolver class is `poison`;
- it does not rewrite past Story poisoning or automatically solve authored poison scenarios outside Battle;
- no Stat or direct PL bonus is granted.

SC divergence:

Hanzō's own poison resistance came from a salamander venom-sac body modification rather than merely summoning Ibuse. SC deliberately turns the salamander relationship into a readable Summon enhancement: **equipping Ibuse grants Battle Poison Immunity**.

This replaces the older generic `ibuse.salamanders_endurance` +6 Stamina enhancement if approved.

---

# E. Own Skill Kit

## 1. `ibuse_poison_mist` — **Poison Mist**

Class:

**CONTROL / POISON**

Target:

up to **2 hostiles**

Player text:

> **Hit up to 2 enemies with poison gas for 4 Battle PL immediately, Poison them, and numb their movement for their next turn.**

Effects on each successfully affected target:

- deal **4 Battle PL immediately** from the poison exposure;
- this immediate poison damage **bypasses Stamina**;
- then establish ordinary `poisoned`;
- current generic poison authority applies:
  - **2 Battle PL** damage at the end of the target's action opportunity;
  - maximum **3 ticks**;
  - bypasses Stamina;
  - reapplication refreshes rather than stacking;
  - compatible standard antidote may cure it;
- also apply `ibuse_poison_numbness` through that target's next action opportunity:
  - movement/reposition-required actions unavailable;
  - not Stun;
  - direct attacks/support remain legal if they do not require movement.

Recharge:

- after use, **Poison Mist cannot be used during Ibuse's next 2 action opportunities**;
- it becomes available again after those two opportunities pass.

This expresses the canon poison-replenishment limitation in readable Battle timing.

---

## 2. `ibuse_venom_bite` — **Venom Bite**

Class:

**ATTACK / POISON**

Target:

one hostile

ATK:

**24**

Player text:

> **Bite one enemy for 24 ATK and Poison them.**

Effects:

- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- then establish/refresh ordinary `poisoned`;
- the poison condition continues dealing its own Battle-PL damage after application;
- no additional numbness;
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

target currently has ordinary `poisoned`.

Target:

one hostile

Player text:

> **Swallow one Poisoned enemy. Until their next turn ends, they cannot move away and their direct attacks can only target Ibuse.**

Effect:

- no direct damage;
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

Standard antidote remains legitimate counterplay against ordinary `poisoned`.

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
- Ibuse's own poison skill uses the existing generic `poisoned` condition rather than creating a second universal poison system.
- dedicated future Character representations that explicitly embody this same poison-immunity package must not receive it twice.

---

# I. Player-facing summary

## IBUSE — POISON SPECIALIST / CONTROL

> **Attach Ibuse to become immune to Poison. Manifest him to poison enemies, attack from underground, and swallow Poisoned targets. Poison Mist needs time to recharge after you use it.**

That is the complete player-facing identity.

---

# J. Current-source replacement note

Current runtime contains:

- `ibuse.salamanders_endurance` = +6 Stamina;
- `ibuse_poison_mist` = **4 immediate Battle PL + poison**;
- `ibuse_venom_bite` = ATK13 + poison;
- `ibuse_subterranean_ambush` = ATK10 / ATK13 contextual;
- generic `poisoned` = 2 Battle PL per end-of-action tick, maximum 3 ticks, Stamina bypass, refresh-not-stack, standard antidote compatible.

If Stephen signs off RESET v2 Ibuse:

- replace +6 Stamina with attached **Poison Immunity**;
- preserve the existing generic poison condition as the shared ongoing poison resolver;
- preserve the design law that a damaging Poison application does **immediate damage and then applies Poison**, rather than using Poison as a status-only button;
- replace old Ibuse attack numerics/action package with this signed-off kit;
- add the authored Poison Mist recharge and Swallow Trap semantics;
- do not stack old and new effects;
- no runtime implementation / validation is claimed by this proposal.

**design proposed != design closed != implemented != runtime validated != Golden GREEN**
