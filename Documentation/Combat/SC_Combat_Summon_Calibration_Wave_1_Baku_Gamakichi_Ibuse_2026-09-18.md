# Shinobi Chronicles — Summon Calibration Wave 1: Baku, Gamakichi, Ibuse

**Date:** 2026-09-18  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **BINDING COMBAT / SUMMON CALIBRATION — WAVE 1 CLOSED FOR THESE THREE SOURCES**  
**Parent:** issue #235  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

This document is the first executed slice of:

`Documentation/Combat/SC_Combat_Summons_and_Tailed_Beasts_Full_Calibration_Master_Plan_2026-09-18.md`

It consumes current PL/Registry anchors without reopening them:

- `de_baku` — Stats `55 / 48 / 18 / 22 / 40 / 62 / 70` — Base PL **64**
- `gamakichi` — Stats `72 / 68 / 52 / 28 / 40 / 20 / 76` — Base PL **71**
- `ibuse` — Stats `58 / 64 / 22 / 18 / 68 / 28 / 76` — Base PL **70**

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

No Entity PL is added to a summoner.

---

# 1. Canon Research First anchors

## Baku

Canon anchor used for this package:

- Danzō's Baku is a giant tapir/chimera Summon.
- Its defining demonstrated capability is extreme inhalation/suction.
- Danzō used the suction to amplify his Wind Release.
- The suction was strong enough to destabilise/immobilise Sasuke's Susanoo.
- Fire Release exploited the open-mouth suction and forced Baku to retreat.

Primary story anchor: Naruto manga chapter 479 / corresponding Five Kage Summit material.

SC divergence authored here:
- convert suction into bounded Battle control rather than universal forced movement;
- convert Wind synergy into one explicit allied Wind packet modifier;
- convert the Fire counter into a bounded temporary vulnerability;
- add ordinary physical tusk/body actions so the Entity has a complete playable Battle palette without inventing unrelated elemental techniques.

## Gamakichi

Canon anchor used for this package:

- Gamakichi is a Mount Myōboku toad Summon and adult battlefield partner.
- He is shown with a tantō and can fight with it.
- He can use Water Release / Starch Syrup Gun.
- He is capable of natural-energy awareness / sage-related perception.
- Anime continuity also gives cooperative Fire/Wind/oil combinations, but this closure does not make anime-only Fire Release a universal passive element package.

SC divergence authored here:
- a defensive sword guard is added as an ordinary combat use of his demonstrated weapon skill;
- co-operation is represented as exact Skill access, not a generic Stat/PL donation.

## Ibuse

Canon anchor used for this package:

- Ibuse is Hanzō's giant salamander Summon.
- Its defining capability is Poison Mist which rapidly numbs/paralyses exposed targets.
- The poison requires replenishment time before it can be used again.
- Ibuse can conceal itself underground and emerge beneath enemies.
- It can swallow/trap an opponent after surfacing.

Primary story anchors include Naruto manga chapters 369 / 531 and corresponding anime material.

SC divergence authored here:
- real-time poison replenishment is converted into a deterministic Battle cooldown;
- poison does not directly create death;
- numbness becomes bounded motor/movement control;
- swallow becomes an escape-capable Battle control state rather than custody/death.

---

# 2. Shared manifested-Summon lifecycle for this wave

These three are **full independent Summons** when legitimately manifested.

When manifested:

- the Summon becomes an independently targetable Entity participant;
- it uses its own exact Effective Stats;
- it receives its own Battle PL ledger from its own Effective PL;
- it receives one normal Entity action opportunity under the active Battle action-order system;
- it does not donate its Battle PL, Stats, depletion pool or action opportunity to the summoner;
- its action does not consume the summoner's ordinary Character action unless the exact action is explicitly authored as a joint/co-operative action;
- defeating/depleting the Summon does not defeat the summoner;
- summoner defeat does not automatically fabricate Summon defeat;
- dismissal/exit removes the Summon's own source-owned states and enhancement effects.

Manifestation does **not** create a second Character identity or reserve the underlying summoner twice.

Merely owning/preparing one of these Summons does not activate any effect below. The source must be in the exact active state required by the effect.

---

# 3. Baku — `de_baku`

Display:

**Baku**

Base anchor:

- Base PL **64**
- Stamina **70**

## 3.1 Own-action palette

### `de_baku_vacuum_draw`

Display: **Vacuum Draw**

Class: CONTROL / Ninjutsu-like summon ability  
Target: up to **2 hostile participants**  
Damage: **none**

Effect:

- establish source-owned `baku_vacuum_lock` on each successfully affected target;
- duration: through that target's next action opportunity;
- while live, actions whose exact definition requires movement/reposition are unavailable;
- this is **not Stun**;
- non-movement attacks, guards, support, control and information actions remain legal if otherwise legal;
- a target already carrying `baku_vacuum_lock` cannot be refreshed by another Vacuum Draw until the existing state ends.

After Baku uses Vacuum Draw, establish self-state:

`baku_open_maw_exposure`

until Baku's next action opportunity.

While that state is live, the next hostile direct **Fire Release** Attack-PL packet targeting Baku gains **+6 Attack PL**, then consumes the exposure state.

This is a bounded expression of the canon Fire counter. It is not a permanent Fire weakness.

### `de_baku_maw_pressure`

Display: **Maw Pressure**

Class: ATTACK  
Discipline: Ninjutsu / pressure  
Target: one hostile  
Attack PL: **28**

- one direct packet;
- ordinary Stamina mitigation;
- no automatic displacement, Stun or restraint;
- does not create `baku_vacuum_lock`.

### `de_baku_tusk_sweep`

Display: **Tusk Sweep**

Class: ATTACK  
Discipline: Taijutsu  
Target: up to **2 hostiles**  
Attack PL: **22 per target**

- one direct packet per affected target;
- ordinary Stamina mitigation;
- no automatic Bleed, knockdown, displacement or Stun.

### `de_baku_wind_conduit`

Display: **Wind Conduit**

Class: SUPPORT  
Target: one allied Character  
Damage: none

Effect:

- establish `baku_wind_conduit` on that ally;
- the ally's next exact compatible direct **Wind Release** Attack-PL packet gains **+6 Attack PL**;
- one packet only;
- consumed when that packet resolves;
- if unused, expires at Baku's next action opportunity;
- does not alter Ninjutsu Stat;
- does not alter Base/Current PL;
- does not grant Wind Release access;
- does not create an extra action.

### `de_baku_debris_ingestion`

Display: **Devour the Barrage**

Class: DEFENSE  
Target: self  
Damage: none

Effect:

- prevent **50%** of the next qualifying hostile direct projectile/Bukijutsu Attack-PL packet before ordinary Stamina mitigation;
- consumed by that packet;
- if unused, expires at Baku's next action opportunity;
- does not protect against Fire Release;
- does not protect against control-only actions, condition ticks or non-projectile direct packets.

## 3.2 Baku relationship / enhancement package

Baku provides **no passive Character Stat modifier merely for being owned, prepared or manifested**.

Its summoner enhancement is tactical and explicit:

1. **Vacuum battlefield control** through Baku's own action.
2. **Wind Conduit** can strengthen one compatible allied Wind Release packet by +6 Attack PL.
3. Baku remains independently targetable and carries the Fire counter-risk after Vacuum Draw.

Player-facing shorthand:

> **Baku controls movement with powerful suction and can boost one allied Wind attack. Fire attacks can punish it while its maw is open.**

No generic Crit, Wind Affinity, Ninjutsu or PL bonus is authorised.

---

# 4. Gamakichi — `gamakichi`

Display:

**Gamakichi**

Base anchor:

- Base PL **71**
- Stamina **76**

## 4.1 Own-action palette

### `gamakichi_toad_sword_beheading`

Display: **Toad Sword Beheading**

Class: ATTACK  
Discipline: Bukijutsu  
Target: one hostile  
Attack PL: **30**

- one direct packet;
- ordinary Stamina mitigation;
- no automatic Bleed, Stun or execution effect.

### `gamakichi_starch_syrup_gun`

Display: **Starch Syrup Gun**

Class: ATTACK / CONTROL  
Discipline: Ninjutsu / Water Release  
Target: one hostile  
Attack PL: **22**

On successful resolution:

- apply ordinary Stamina mitigation to the direct packet;
- establish `gamakichi_syrup_bogged` through the target's next action opportunity;
- while live, actions whose exact definition requires movement/reposition are unavailable;
- not Stun;
- no Speed/Agility Stat exists or is modified.

### `gamakichi_leaping_tanto_dive`

Display: **Leaping Tantō Dive**

Class: ATTACK  
Discipline: Taijutsu / Bukijutsu  
Target: one hostile  
Attack PL: **26**

- one direct packet;
- ordinary Stamina mitigation;
- the leap is presentation/reposition context, not a hidden Speed bonus;
- no automatic displacement.

### `gamakichi_toad_sword_guard`

Display: **Toad Sword Guard**

Class: DEFENSE  
Target: self  
Damage: none

Effect:

- prevent **35%** of the next qualifying incoming direct Attack-PL packet before Stamina;
- consumed by the first qualifying packet;
- if unused, expires at Gamakichi's next action opportunity;
- no counterattack or extra action.

### `gamakichi_natural_energy_read`

Display: **Natural Energy Read**

Class: INFO  
Target: local encounter  
Damage: none

Effect:

- record bounded current evidence of an actively perceptible natural-energy / senjutsu disturbance where the encounter context actually supplies such evidence;
- does not reveal hidden Stats, hidden Skills, identity, future actions or universal chakra information;
- no combat bonus is created by the read itself.

## 4.2 Gamakichi relationship / enhancement package

Gamakichi provides **no passive wholesale Stat package** to the summoner.

While Gamakichi is legitimately manifested and cooperative, he may satisfy the exact source prerequisite for learned co-operative toad techniques.

Examples of legitimate future/known technique families include:

- Water-assisted combination actions;
- oil/wind/fire combination techniques where every required source and learned action is present;
- exact reverse-summoning/travel contexts outside ordinary Battle where separately authorised.

This closure does **not** automatically grant:

- Fire Release;
- Water Release;
- Sage Mode;
- natural-energy sensing;
- Toad Oil techniques;
- any Gamabunta technique;
- +Stats or +PL.

Player-facing shorthand:

> **Gamakichi is a balanced fighting summon: sword attacks, sticky Water Release that limits movement, and access to exact learned toad-combination techniques.**

---

# 5. Ibuse — `ibuse`

Display:

**Ibuse**

Base anchor:

- Base PL **70**
- Stamina **76**

## 5.1 Own-action palette

### `ibuse_poison_mist`

Display: **Poison Mist**

Class: CONTROL  
Discipline: Ninjutsu / poison  
Target: up to **2 hostiles**  
Direct damage: none

Effect:

- on a valid exposed target, establish `ibuse_poison_numbness`;
- duration: through that target's next action opportunity;
- while live, actions whose exact definition requires movement/reposition are unavailable;
- this is not full Stun;
- does not directly commit Injury, death or custody;
- correct exact antidote/protection authority may prevent/remove the state.

After use, establish:

`ibuse_poison_replenishing`

for **3 Ibuse action opportunities**.

While replenishing, Poison Mist is unavailable.

This deterministic cooldown is the Battle abstraction of Ibuse's canon replenishment requirement. It is not a real-time five-minute timer.

### `ibuse_burrow_ambush`

Display: **Burrow Ambush**

Class: ATTACK  
Discipline: Taijutsu  
Target: one hostile  
Attack PL: **28**

- one direct packet;
- ordinary Stamina mitigation;
- no automatic Stun;
- burrowing does not create untargetability before/after the committed action.

### `ibuse_swallow_trap`

Display: **Swallow Trap**

Class: CONTROL  
Target: one hostile  
Damage: none

Requirement:

- target must currently carry source-owned `ibuse_poison_numbness`.

Effect:

- establish `ibuse_swallowed` through the target's next action opportunity;
- while swallowed, the target cannot use actions requiring movement/reposition;
- direct hostile actions from the swallowed target may target **Ibuse only** if otherwise legal;
- self-support/defense/escape-compatible actions remain legal if their exact definitions permit them;
- this is not Story custody, capture, death or removal from history;
- state ends after the target's next action opportunity or if Ibuse is depleted/dismissed first.

### `ibuse_salamander_crush`

Display: **Salamander Crush**

Class: ATTACK  
Discipline: Taijutsu  
Target: one hostile  
Attack PL: **26**

- one direct packet;
- ordinary Stamina mitigation;
- no automatic knockdown, Stun or restraint.

### `ibuse_burrow_guard`

Display: **Burrow Guard**

Class: DEFENSE  
Target: self  
Damage: none

Effect:

- prevent **40%** of the next qualifying incoming direct Attack-PL packet before Stamina;
- consumed by the first qualifying packet;
- if unused, expires at Ibuse's next action opportunity;
- does not make Ibuse untargetable;
- does not create a free Burrow Ambush.

## 5.2 Ibuse relationship / enhancement package

Ibuse provides **no passive summoner Stat or PL bonus**.

While Ibuse is manifested:

### Poison Execution Window

When Ibuse successfully establishes `ibuse_poison_numbness` on a target, establish one paired source marker:

`ibuse_execution_window`

The summoner's next direct Attack-PL packet against that same affected target gains **+4 Attack PL**, then consumes the marker.

Rules:

- one packet only;
- no extra action;
- expires when `ibuse_poison_numbness` ends;
- does not grant poison immunity;
- does not alter the summoner's Stats;
- does not apply if the summoner cannot legally act against that target.

The summoner is **not automatically immune** to Ibuse's poison merely by ownership/contract. Exact respirator, antidote, immunity or other protection must come from its real source.

Player-facing shorthand:

> **Ibuse disables movement with poison, can ambush from below, and creates a short opening for its summoner to hit harder. Its poison must recharge after use.**

---

# 6. Double-count / source rules

For all three:

- no own Entity PL is added to a Character;
- no own Entity Stats are copied into a Character;
- support Attack-PL bonuses are resolver-local effects, not hidden Stats;
- manifestation does not duplicate an already-embodied dedicated Character representation;
- one exact source effect is applied once;
- dismissal/depletion removes source-owned live states;
- historical actions remain recorded after state expiry.

---

# 7. Player-facing card requirement

If/when these Summons appear in a Battle/Summon guide, primary summaries should read approximately:

- **Baku** — `CONTROL / WIND SUPPORT` — **Pull enemies off position; boost one Wind attack. Fire can punish its open maw.**
- **Gamakichi** — `FIGHTER / WATER CONTROL` — **Sword fighter with sticky Water Release that can stop movement.**
- **Ibuse** — `POISON / CONTROL` — **Numb enemies with poison, then create an opening for your next attack. Poison must recharge.**

Do not expose internal state keys as the primary player explanation.

---

# 8. Closure / next tranche

Wave 1 Combat calibration is CLOSED for:

- `de_baku`
- `gamakichi`
- `ibuse`

Next Summon wave:

- `key_gero`
- `mirage_clam`
- `mk_enma`

followed by:

- `nue`
- `pakkun`
- `wr_kamatari`
- `snake` after PL/Registry #236 returns.

Runtime implementation remains downstream and is not claimed GREEN by this document.
