# Shinobi Chronicles — RESET v2 Source 10 Proposal: Snake

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **PARTIALLY REOPENED BY STEPHEN 2026-09-27 — COURIER RECLASSIFIED AS SHARED SMALL/MEDIUM-SUMMON DIALOGUE CAPABILITY / TRUE SNAKE ENHANCEMENT OPEN**  
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
- those snakes can also extend/latch to assist movement;
- snake summons range from very small to very large, and established summoners can communicate with at least some summoned snakes, supporting a bounded messenger/courier role for an appropriately sized cooperative Snake.

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

# C. Role

**AMBUSH / RESTRAINT / CAPTURE PRESSURE**

Snake's RESET v2 identity is:

1. make **Hidden Coil** an obtainable source-assisted Battle Skill rather than an automatic attachment bonus;
2. if a future/full-manifestation Battle mode permits it, field Snake as a PL47 body with constriction/capture actions;
3. use constriction to restrict movement-dependent techniques;
4. force a choice between preserving the bind or cashing it out for extra crush damage;
5. receive a separate Snake-specific Enhancement once that reopened package is closed.

This is deliberately not a generic Stat-stick.

---

# D. Lifecycle / action economy

## OWNED / AVAILABLE OUTSIDE BATTLE

- legitimate ownership does not create a generic Battle Stat bonus;
- as a **small Summon**, Snake participates in the project-wide small/medium-Summon courier dialogue capability;
- that courier capability is **not Snake's Enhancement** and does not require Snake to occupy a Battle participant slot.

## ATTACHED / PREPARED FOR BATTLE

- Snake is the Character's active/prepared Summon source;
- no independent Snake Battle PL ledger merely from ordinary Alpha Summon-action use;
- **Hidden Coil is NOT granted automatically by attachment**;
- Hidden Coil may be used only if that exact learnable source-assisted Skill has been legitimately obtained;
- if Hidden Coil is learned, Snake must be attached/prepared and not independently manifested for the follow-up to be available.

## MANIFESTED — future/full-manifestation capability

Where a later Battle mode explicitly permits independent manifestation:

- Snake becomes independently targetable;
- own Battle PL ledger = own Effective PL, starting from Base PL47;
- own Entity action opportunity under that manifestation model;
- **Hidden Coil follow-up is unavailable while Snake is manifested**, because the same Snake is no longer concealed/prepared with the controller;
- no second copy of Snake exists.

If Snake returns from manifestation while remaining attached:

- a learned Hidden Coil becomes available again only if its once-per-Battle use was not already spent;
- manifestation never refreshes a spent Hidden Coil.

Ordinary Alpha Battles do not infer a seventh Character slot or independent recurring Summon turn from this future-capability section.

---

# E. REQUIRED Enhancement Package — REOPENED / OPEN

Stephen corrected the previous Source 10 closure on **2026-09-27**:

> **ALL small-to-medium Summons can be used in dialogue choices as couriers. That shared capability is NOT Snake's Enhancement.**

Therefore:

- **Serpent Courier is RETIRED as Snake-specific Enhancement authority**;
- Snake still qualifies for courier dialogue choices because Snake is a small Summon;
- courier use belongs to the shared Summon capability/Story-World dialogue layer;
- Snake still requires a **real, separate Enhancement package** under RESET v2;
- that replacement Enhancement must remain distinct from the learnable **Hidden Coil** Skill;
- no replacement Enhancement is invented in this correction.

The already signed-off Snake identity, PL47, Hidden Coil mechanics and manifested/future combat kit remain preserved.

---

# F. Learnable source-assisted Battle Skill

## `snake_hidden_coil` — **Hidden Coil**

Availability:

**OBTAINABLE / LEARNABLE — NOT AUTOMATIC FROM OWNERSHIP OR ATTACHMENT**

Exact unlock channel:

**NOT Combat-owned.** Progression / Development / World opportunity may grant access through separately authorised training, practice, teacher/event or equivalent progression.

Requirement at use time:

- Snake is the Character's active/prepared Summon;
- Snake is not independently manifested;
- the controller has legitimately learned/unlocked Hidden Coil;
- Hidden Coil has not already been spent this Battle.

Limit:

**once per Battle**

Player text:

> **After one of your Taijutsu or Bukijutsu attacks hits, send Snake around that enemy to restrict movement-heavy techniques for their next action.**

Trigger:

- controller commits a **single-target Taijutsu or Bukijutsu ATTACK** against the current legally targetable hostile;
- the attack resolves for **positive final damage**;
- target is still present after resolution.

Effect:

- apply `snake_hidden_coil_restraint` to that same target;
- condition type: `physical_restraint`;
- duration: through the end of the target's next action opportunity;
- actions requiring **substantial free movement / reposition / escape** are unavailable while the restraint remains;
- ordinary ATTACK / DEFENSE / SUPPORT actions that do not require substantial free movement remain legal;
- exact escape / anti-restraint effect may remove or override it;
- this is **not Stun**;
- no extra damage packet is created;
- no second controller action is created;
- the once-per-Battle learned Skill use is consumed when the follow-up is committed.

This preserves the previously approved Hidden Coil behavior while moving its ownership from an automatic attached Enhancement to a **learned source-assisted Skill**.

---

# G. Manifested own Skill kit

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

# H. Counter / drawback

Snake's main authored limitation is the **mode trade-off**:

- ATTACHED does not automatically grant Hidden Coil;
- if Hidden Coil has been legitimately learned, ATTACHED / not-manifested Snake enables that once-per-Battle follow-up;
- MANIFESTED future-capability gives PL47 actions and Coiling Interpose;
- learned Hidden Coil cannot trigger while Snake is physically manifested.

Additional limitations:

- Snake is only PL47 and can be depleted as an independent participant;
- all restraint is movement-specific, not blanket Stun;
- exact escape / anti-restraint authority remains counterplay;
- Coiling Crush must release the same-source restraint to gain ATK24;
- no artificial elemental weakness is added.

---

# I. Environmental interaction

No default environmental bonus is proposed for generic Snake.

In particular:

- rain does not automatically buff Snake;
- earth/underground terrain does not automatically grant burrow;
- vegetation does not create hidden Snake mechanics;
- environmental modifiers may be authored later only where the exact Battle environment and exact source support them.

This keeps Snake inside currently modelled Battle authority.

---

# J. Persistent / collection progression

No account-wide numeric collection bonus is currently closed for Snake.

Snake's participation in courier dialogue choices comes from the **shared small/medium-Summon courier capability**, not a Snake-specific persistent Enhancement.

No generic snake-family recruitment multiplier or named-snake contract progress is inferred.

---

# K. Double-count / representation exclusions

- Snake PL47 belongs to Snake only.
- No PL/Stats transfer to controller.
- learned Hidden Coil and manifested Snake use the **same source**, not two Snakes;
- Hidden Coil is unavailable while manifested;
- manifesting/returning does not refresh a spent Hidden Coil;
- ownership/attachment alone does not grant Hidden Coil; the Skill requires legitimate unlock authority.
- generic Snake does not inherit Manda, Aoda or Manda II mechanics.
- generic Snake does not automatically grant venom, shedding, Sage access or underground ambush.
- a Character technique such as Hidden Shadow Snake Hands does not automatically mean the collectible `snake` Entity is separately attached unless exact source authority says so.
- if a future Character representation already embodies this exact generic-Snake assist package, do not apply the same source package twice.

---

# L. Current-runtime / admission note

Current source contains the Snake card/portrait assets, but `snake` is not currently implemented in the live runtime Entity Registry or live production Entity list.

Therefore Stephen sign-off here would mean:

- Combat mechanics DESIGN CLOSED;
- stable ID / Base Stats / PL remain as already closed by PL / Registry;
- Coding may later implement the Entity, enhancement, conditions and own actions;
- sign-off does **not** silently admit Snake to live production;
- implementation / runtime validation / Golden remain separate.

No old live Snake skill package exists that must be preserved.

---

# M. Player-facing summary — CURRENT REOPENED STATE

## SNAKE — AMBUSH / RESTRAINT / CAPTURE

> **Train with Snake to unlock Hidden Coil, letting it wrap an enemy after one of your Taijutsu or Bukijutsu hits. In future/full-manifestation Battles, Snake can fight directly with bites, constriction and interception. Like every small-to-medium Summon, Snake may also appear in authored courier dialogue choices; that shared courier use is not Snake's Enhancement.**

The final source summary remains incomplete until Snake's replacement Enhancement is closed.

---

# N. Decision state

**Stephen correction:** **2026-09-27 — courier is shared small/medium-Summon dialogue capability, not Snake's Enhancement.**  
**Identity / Stats / Base PL:** CLOSED by PL / Registry at `snake`, PL47.  
**Enhancement:** **REOPENED / OPEN — Serpent Courier retired as Snake-specific Enhancement.**  
**Shared courier dialogue capability:** **YES because Snake is small/medium; not source Enhancement authority.**  
**Hidden Coil mechanics:** **CLOSED.**  
**Hidden Coil ownership:** **OBTAINABLE / LEARNABLE, not automatic — CLOSED.**  
**Exact Hidden Coil unlock pathway:** downstream Progression / Development / World authority.  
**Manifested/future Battle kit:** CLOSED as future/full-manifestation capability.  
**Production admission:** NOT LIVE / separate downstream decision.  
**Implementation:** HOLD — full RESET v2 source is not closed until a true Snake Enhancement is signed off.  
**Runtime validation:** NOT CLAIMED.  
**Golden:** NOT CLAIMED.

**SOURCE 10 SNAKE = PARTIALLY REOPENED ON ENHANCEMENT ONLY.**

**combat kit closed != enhancement closed != implemented != runtime validated != Golden GREEN**
