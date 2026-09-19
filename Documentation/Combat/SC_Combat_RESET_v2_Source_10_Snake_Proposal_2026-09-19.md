# Shinobi Chronicles — RESET v2 Source 10 Proposal: Snake

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **PROPOSED FOR STEPHEN SIGN-OFF — SOURCE 10 UNDER RESET v2**  
**Parent:** #235  
**Reset authority:** `Documentation/Combat/SC_Combat_Summons_Tailed_Beasts_Full_Calibration_RESET_v2_2026-09-18.md`  
**Global mechanics standard:** `Documentation/Combat/SC_Combat_Unique_Shinobi_Chronicles_Mechanics_Design_Standard_2026-09-19.md`  
**PL / Registry authority:** `Documentation/Registry/Tailed Beast Pair Snake and Pakkun PL Registry Reconciliation 2026-09-18.md`  
**Source baseline:** `bfca3a019cf23a22cc078f3c61870f0c55288b14`

---

# A. Identity / PL

Stable ID:

`snake`

Display:

**Snake**

Ontology:

**Entity -> Summon**

Identity mode:

**generic summoned-snake representation**

Explicitly NOT:

- Manda;
- Aoda;
- Manda II;
- another named Ryūchi Cave individual;
- a hidden alias for a named snake.

Base Stats:

- Ninjutsu **30**
- Taijutsu **52**
- Bukijutsu **38**
- Fūinjutsu **12**
- Kinjutsu **20**
- Genjutsu **12**
- Stamina **48**

Base PL:

**47**

Formula raw result:

`47.242857...` -> **47**

Production state:

**DURABLY CALIBRATED / NOT LIVE / RUNTIME REGISTRY NOT IMPLEMENTED**

No Snake PL or Stats transfer wholesale to the controller.

---

# B. Canon anchors consumed before authoring

Generic Naruto snake use supports a clear mechanical identity without borrowing named-snake powers:

- snake contracts exist separately from named individual snakes;
- generic summoned snakes can attack by biting;
- generic summoned snakes can constrict / capture a target;
- snakes used through Hidden Shadow Snake Hands can surprise a target from the summoner's body/sleeve;
- those snakes can also extend/latch to assist movement.

Canon references consumed:
- Summoning Technique material identifying Orochimaru and Sasuke as snake summoners;
- Hidden Shadow Snake Hands, including biting, constriction/capture and surprise deployment;
- Many Hidden Shadow Snake Hands as evidence that generic snake bodies can cooperate in capture/entanglement.

SC deliberately does **not** infer:

- venom;
- skin-shedding escape;
- Sage techniques;
- named-snake physical scale;
- Manda/Aoda loyalty or personality;
- underground ambush;
- named-snake regeneration/durability.

Those require separate authority.

---

# C. Battle role

**AMBUSH / RESTRAINT / CAPTURE PRESSURE**

Snake's RESET v2 identity is:

1. remain concealed while attached;
2. spring out once to wrap a target after the controller establishes physical contact;
3. if manifested, trade that surprise ambush for an independent PL47 body;
4. use constriction to restrict movement-dependent techniques;
5. force a choice between preserving the bind or cashing it out for extra crush damage.

This is deliberately not a generic Stat-stick.

---

# D. Lifecycle / action economy

## OWNED

- collection presence only;
- no global Battle bonus.

## ATTACHED / PREPARED

- Snake is the Character's active Summon;
- no independent Snake Battle PL ledger;
- no independent Snake action opportunity;
- **Hidden Coil** is available once per Battle;
- Snake is treated as concealed/prepared with the controller for this exact enhancement.

## MANIFESTED

- Snake becomes independently targetable;
- own Battle PL ledger = own Effective PL, starting from Base PL47;
- own normal Entity action opportunity;
- **Hidden Coil becomes unavailable while Snake is manifested**, because the same Snake is no longer concealed on/with the controller;
- no second copy of Snake exists.

If Snake returns from manifestation while remaining attached:

- Hidden Coil becomes available again **only if it has not already been spent this Battle**;
- manifestation does not refresh a spent Hidden Coil.

Detaching/replacing Snake ends its source-owned state.

This is an intentional attached-vs-manifested trade-off.

---

# E. REQUIRED Enhancement Package

## `snake_hidden_coil` — **Hidden Coil**

Activation:

**ATTACHED / NOT MANIFESTED**

Limit:

**once per Battle**

Player text:

> **Once per Battle, after one of your Taijutsu or Bukijutsu attacks hits, Snake can immediately coil that enemy and restrict movement-heavy techniques for their next action.**

Trigger:

- controller commits a **single-target Taijutsu or Bukijutsu ATTACK** against the current legally targetable hostile;
- the attack resolves for **positive final damage**;
- target is still present after resolution;
- Snake is attached and not manifested;
- Hidden Coil has not already been spent.

Effect:

- apply `snake_hidden_coil_restraint` to that same target;
- condition type: `physical_restraint`;
- duration: through the end of the target's next action opportunity;
- actions requiring **substantial free movement / reposition / escape** are unavailable while the restraint remains;
- ordinary ATTACK / DEFENSE / SUPPORT actions that do not require substantial free movement remain legal;
- an exact escape / anti-restraint effect may remove or override it;
- this is **not Stun**;
- no extra damage packet is created;
- no extra controller action is created.

The restraint is source-owned by Snake, not a transfer of Snake's PL/Stats to the controller.

Why the positive-damage trigger exists:

The controller must first genuinely get Snake close enough to spring the ambush. Hidden Coil is a follow-up to established contact, not a free remote bind.

---

# F. Manifested own Skill kit

## 1. `snake_fang_lunge` — **Fang Lunge**

Class:

**ATTACK**

Target:

one hostile

ATK:

**18**

Player text:

> **Snake lunges and bites one enemy for 18 ATK.**

Rules:

- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- no automatic Poison;
- no automatic Bleed;
- no automatic Stun.

Generic Snake does not inherit a venom package merely because some real-world snakes are venomous.

---

## 2. `snake_constricting_bite` — **Constricting Bite**

Class:

**ATTACK / CONTROL**

Target:

one hostile

ATK:

**12**

Player text:

> **Bite for 12 ATK. If the bite deals damage, Snake wraps the target and restricts movement-heavy techniques for their next action.**

Rules:

- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- if final damage is positive, apply `snake_manifested_constriction`;
- condition type: `physical_restraint`;
- duration: through the end of target's next action opportunity;
- blocks substantial-free-movement / reposition / escape actions;
- other legally usable actions remain available;
- exact escape / anti-restraint authority may remove or override it;
- not Stun.

This is Snake's reliable manifested capture route.

---

## 3. `snake_coiling_crush` — **Coiling Crush**

Class:

**ATTACK / RESTRAINT PAYOFF**

Target:

one hostile

Base ATK:

**14**

Constricted ATK:

**24**

Player text:

> **Crush one enemy for 14 ATK, or 24 ATK if Snake currently has them constricted. Using the stronger hit releases the coil.**

Rules:

- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- boosted ATK24 requires an active same-source Snake restraint on that target:
  - `snake_hidden_coil_restraint`; or
  - `snake_manifested_constriction`;
- if the boosted branch is committed, that same-source Snake restraint ends after the attack resolves;
- if base ATK14 is used without a qualifying restraint, no restraint is created.

Decision:

> **Keep the enemy tied up for control, or cash the bind out for a stronger crush.**

This avoids a passive generic damage bonus: the player chooses between control duration and damage payoff.

---

## 4. `snake_coiling_interpose` — **Coiling Interpose**

Class:

**REACTION / DEFENSE**

Limit:

**once per Battle**

Requirement:

Snake must be manifested.

Trigger:

the attached controller is targeted by one qualifying direct Attack-PL packet.

Player text:

> **Snake coils across the attack and takes the hit for its summoner.**

Effect:

- redirect the qualifying direct packet from the controller to manifested Snake;
- the same packet resolves against Snake using Snake's own Stamina / Battle PL;
- the packet is not duplicated;
- no percentage reduction is added;
- no counterattack is created;
- if the attack has a target-specific rider that cannot legally transfer to Snake, that rider is resolved only where its exact authority permits.

This makes Snake's body itself the defense rather than adding a generic guard percentage.

---

# G. Counter / drawback

Snake's main authored limitation is the **mode trade-off**:

- ATTACHED gives one surprise **Hidden Coil**;
- MANIFESTED gives independent PL47 actions and Coiling Interpose;
- Hidden Coil cannot trigger while Snake is physically manifested.

Additional limitations:

- Snake is only PL47 and can be depleted as an independent participant;
- all restraint is movement-specific, not blanket Stun;
- exact escape / anti-restraint authority remains counterplay;
- Coiling Crush must release the same-source restraint to gain ATK24;
- no artificial elemental weakness is added.

---

# H. Environmental interaction

No default environmental bonus is proposed for generic Snake.

In particular:

- rain does not automatically buff Snake;
- earth/underground terrain does not automatically grant burrow;
- vegetation does not create hidden Snake mechanics;
- environmental modifiers may be authored later only where the exact Battle environment and exact source support them.

This keeps Snake inside currently modelled Battle authority.

---

# I. Persistent / collection progression

No account-wide persistent collection bonus is proposed.

No generic "snake family" recruitment multiplier is created.

No named-snake contract progress is inferred from owning this generic Snake.

---

# J. Double-count / representation exclusions

- Snake PL47 belongs to Snake only.
- No PL/Stats transfer to controller.
- Hidden Coil and manifested Snake are two states of the **same source**, not two Snakes.
- Hidden Coil cannot trigger while manifested.
- manifesting/returning does not refresh a spent Hidden Coil.
- generic Snake does not inherit Manda, Aoda or Manda II mechanics.
- generic Snake does not automatically grant venom, shedding, Sage access or underground ambush.
- a Character technique such as Hidden Shadow Snake Hands does not automatically mean the collectible `snake` Entity is separately attached unless exact source authority says so.
- if a future Character representation already embodies this exact generic-Snake assist package, do not apply the same source package twice.

---

# K. Current-runtime / admission note

Current source contains the Snake card/portrait assets, but `snake` is not currently implemented in the live runtime Entity Registry or live production Entity list.

Therefore Stephen sign-off here would mean:

- Combat mechanics DESIGN CLOSED;
- stable ID / Base Stats / PL remain as already closed by PL / Registry;
- Coding may later implement the Entity, enhancement, conditions and own actions;
- sign-off does **not** silently admit Snake to live production;
- implementation / runtime validation / Golden remain separate.

No old live Snake skill package exists that must be preserved.

---

# L. Player-facing summary

## SNAKE — AMBUSH / RESTRAINT / CAPTURE

> **Keep Snake attached to spring one surprise coil after a Taijutsu or Bukijutsu hit. Manifest it instead for bites, constriction and a stronger crush that trades away the bind. While manifested, Snake can also take one direct attack for its summoner.**

That is the complete Source 10 identity.

---

# M. Decision state

**Mechanics:** PROPOSED / awaiting Stephen sign-off.  
**Identity / Stats / Base PL:** CLOSED by PL / Registry at `snake`, PL47.  
**Production admission:** NOT LIVE / separate downstream decision.  
**Implementation:** NOT STARTED.  
**Runtime validation:** NOT CLAIMED.  
**Golden:** NOT CLAIMED.

**design proposed != design closed != implemented != runtime validated != Golden GREEN**
