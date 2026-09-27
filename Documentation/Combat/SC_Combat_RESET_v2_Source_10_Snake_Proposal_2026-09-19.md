# Shinobi Chronicles — RESET v2 Source 10 Proposal: Snake

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **DESIGN CLOSED BY STEPHEN 2026-09-27 — SERPENT REACH / NARROW PASSAGE ENHANCEMENT / LEARNABLE HIDDEN COIL**  
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
- snake summons range from very small to very large.

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
5. provide **Serpent Reach** as the attached Battle Enhancement and **Narrow Passage** as its source-specific infiltration utility.

This is deliberately not a generic Stat-stick.

---

# D. Lifecycle / action economy

## OWNED

- legitimate ownership does not create a generic Battle Stat bonus.

## ATTACHED / PREPARED FOR BATTLE

- Snake is the Character's active/prepared Summon source;
- **Serpent Reach** is active while Snake is attached/prepared;
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

# E. REQUIRED Enhancement Package — CLOSED

Snake's source-specific Enhancement is **Serpent Reach**. Its non-Battle source utility is **Narrow Passage**.

These are the complete Source 10 Enhancement authorities. Global Summon rules are defined outside this source package.

## `snake_serpent_reach` — **Serpent Reach**

Activation:

**ATTACHED / PREPARED**

Limit:

**once per Battle**

Classification:

**REACH / POSITIONING ASSIST**

Player text:

> **Once per Battle, Snake can bridge the distance for one close-range Taijutsu or Bukijutsu attack against the Active enemy.**

Exact mechanics:

- controller declares one **single-target Taijutsu or Bukijutsu ATTACK** against the current legally targetable **Active** enemy;
- the attack must normally require close-range engagement;
- the target may be at ordinary **mid-range** separation that would otherwise require the controller to reposition first;
- Snake extends/latches across that ordinary separation and creates the physical route for that one attack;
- the declared attack resolves at its **normal authored ATK / effects**;
- no extra damage, Stat, PL, Crit, accuracy or hidden scaling is added;
- the controller does **not** spend a separate reposition action merely to bridge that ordinary separation;
- Serpent Reach does not target Benched/Reserve enemies, does not bypass sealed or impossible barriers, and does not defeat exact space-time / untargetable / superior-distance rules;
- using Serpent Reach consumes the once-per-Battle Enhancement use when the assisted attack is committed;
- this does **not** create a second action;
- if the assisted attack deals positive final damage and the controller has legitimately learned an unspent **Hidden Coil**, Hidden Coil may still be offered under its own separate rules. Serpent Reach does not grant or refresh Hidden Coil.

This preserves Snake's source identity as an extending/latching body without turning the Enhancement into poison or a generic Stat stick.

## `snake_narrow_passage` — **Narrow Passage**

Classification:

**NON-BATTLE INFILTRATION / ACCESS / SCOUTING SUPPORT**

Activation:

Snake must be legitimately **available** to the Character in the current Story / Mission / Hotspot context.

Player-facing meaning:

> **Snake can slip through openings too small for a shinobi, scout the reachable space beyond, and interact with small reachable objects where the scene permits it.**

Exact authored capability:

- Snake may traverse a **physically plausible small opening, gap, vent, pipe, crack, crawlspace or similarly confined route** that the Character cannot normally enter;
- where World/Story authority provides an eligible connected space, Snake may:
  - scout what it can directly observe;
  - reveal a reachable passage / room / point of interest;
  - retrieve or carry back **one small authored object** appropriate to Snake's physical scale;
  - reach a simple small latch, cord, token, marker or equivalent interaction point where physically plausible;
- Snake does not phase through sealed walls or barriers;
- Snake does not automatically understand documents, codes, mechanisms or hidden facts merely by entering the space;
- Snake does not guarantee stealth, safety, retrieval, access or Mission success;
- the occurrence owns hazards, blockers, what Snake can actually observe, and the factual result.


### Explicit exclusions

Snake's Enhancement does **not** grant:

- Poison;
- venom;
- shedding;
- Sage mechanics;
- burrowing by default;
- named-snake powers;
- wholesale PL/Stats;
- automatic Hidden Coil.

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

No account-wide numeric collection bonus is created for Snake.

Snake's source-specific persistent/non-Battle value is **Narrow Passage** infiltration/access/scouting when Snake is legitimately available.

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

# M. Player-facing summary

## SNAKE — REACH / INFILTRATION / RESTRAINT / CAPTURE

> **Attach Snake to gain Serpent Reach: once per Battle, Snake can bridge ordinary distance for one close-range Taijutsu or Bukijutsu attack. Outside Battle, Narrow Passage lets Snake slip through small openings to scout, reveal reachable spaces or retrieve a small object where the scene allows it. Train with Snake separately to unlock Hidden Coil. Snake has no poison package.**


---

# N. Decision state

**Stephen correction / final sign-off:** **2026-09-27.**  
**Identity / Stats / Base PL:** CLOSED by PL / Registry at `snake`, PL47.  
**Enhancement:** **Serpent Reach — CLOSED.**  
**Serpent Reach Battle effect:** **once/Battle, bridge ordinary mid-range separation for one close-range single-target Taijutsu or Bukijutsu attack against the Active enemy; normal attack values/effects; no separate reposition action.**  
**Non-Battle source utility:** **Narrow Passage — CLOSED** for physically plausible small-gap access/scouting/small-object interaction.  
**Poison/venom Enhancement:** **NONE / explicitly rejected.**  
**Hidden Coil mechanics:** **CLOSED.**  
**Hidden Coil ownership:** **OBTAINABLE / LEARNABLE, not automatic — CLOSED.**  
**Exact Hidden Coil unlock pathway:** downstream Progression / Development / World authority.  
**Manifested/future Battle kit:** CLOSED as future/full-manifestation capability.  
**Production admission:** NOT LIVE / separate downstream decision.  
**Combat design:** **DESIGN CLOSED.**  
**Implementation:** NOT STARTED.  
**Runtime validation:** NOT CLAIMED.  
**Golden:** NOT CLAIMED.

**SOURCE 10 SNAKE = DESIGN CLOSED under RESET v2.**

**design closed != implemented != runtime validated != Golden GREEN**
