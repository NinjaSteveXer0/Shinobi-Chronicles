# Shinobi Chronicles — Summon Calibration Wave 3 Proposal: Nue, Pakkun, Kamatari

**Date:** 2026-09-18  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **PROPOSED FOR STEPHEN SIGN-OFF — NOT YET BINDING COMBAT CLOSURE**  
**Parent:** #235  
**Source baseline:** `42d0ec8a2ebc6cabdd111aaf2b1d4749011d9967`

Current exact Registry/source anchors:

- `nue` — **Nue** — Stats `92 / 98 / 60 / 55 / 96 / 65 / 105` — Base PL **100** — LIVE
- `pakkun` — **Pakkun** — Stats `13 / 16 / 6 / 4 / 4 / 9 / 18` — Base PL **16** — STAGED / NOT LIVE
- `wr_kamatari` — **Kamatari** — Stats `74 / 78 / 82 / 24 / 48 / 30 / 70` — Base PL **77** — LIVE

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

No Entity PL transfers wholesale to a controller.

---

# 1. Nue — `nue`

## Canon anchor

Official BORUTO episode material establishes:

- Nue is a giant otherworldly/dimensional beast connected to Sumire through the Gozu Tennō;
- Nue can drain chakra and grow stronger;
- Nue and Sumire can move through Nue's dimension;
- later Sumire fights alongside Nue, while a larger/more powerful Nue becomes harder to control.

SC keeps Nue and Sumire as distinct Registry identities. Current production already makes `sannin_sumire` and `nue` a paired acquisition relationship while explicitly preserving:

- no Sumire/Nue PL transfer;
- attachment != Battle manifestation;
- one independent Nue Entity identity.

## Proposed lifecycle

Nue is a **full independent manifested Summon**.

When attached but not manifested:

- no second Battle PL ledger;
- no independent action;
- no passive transfer of Nue's Stats/PL.

When legitimately manifested:

- Nue becomes independently targetable;
- own Battle PL ledger = its own Effective PL;
- own action opportunity;
- defeat/depletion of Nue does not defeat its controller.

## Proposed own actions

### `nue_demon_beast_claw` — **Demon Beast Claw**

ATTACK / Taijutsu / one hostile / ATK **34**

> **Nue tears into one enemy with its claws.**

- one direct packet;
- ordinary Stamina mitigation;
- no automatic Stun or Bleed.

### `nue_portal_pounce` — **Portal Pounce**

ATTACK / one hostile / ATK **30**

> **Nue disappears through a portal and attacks from another angle.**

- one direct packet;
- ordinary Stamina mitigation;
- may be used while Nue is under an ordinary movement/reposition restriction;
- does not make Nue permanently untargetable;
- does not bypass an exact barrier/space-time lock that explicitly blocks this route.

### `nue_chakra_devour` — **Chakra Devour**

REACTION / self / once per Battle

> **Absorb part of one chakra attack. Take less damage, then power up Nue's next attack.**

Trigger:

- Nue is targeted by a qualifying direct Ninjutsu or Kinjutsu Attack-PL packet.

Effect:

- reduce that packet by **50% before Stamina**;
- Nue's next direct attack gains **+10 ATK**;
- the +10 is consumed by that attack;
- if unused, it expires at Battle end;
- no permanent growth;
- no Stats/PL transfer.

### `nue_demon_beast_roar` — **Demon Beast Roar**

ATTACK / AREA / up to **2 hostiles** / ATK **24 each**

> **Nue blasts nearby enemies with a violent chakra roar.**

- one packet per target;
- ordinary Stamina mitigation;
- no automatic Stun or forced movement.

## Proposed Nue bond action

### `nue_bonded_guard` — **Protect the Bond**

REACTION / exact authored Nue-bond controller / once per Battle

> **If Nue's bonded partner is hit, Nue jumps in and takes the edge off the attack.**

Eligibility:

- controller must have an exact authored Nue bond;
- current production example: `sannin_sumire`.

Effect:

- reduce the bonded controller's next qualifying direct Attack-PL packet by **40% before Stamina**;
- no extra attack;
- no healing;
- no Nue PL/Stat transfer;
- ordinary ownership alone does not create a Nue bond.

Player-facing shorthand:

> **Nue is a powerful independent fighter that can absorb one chakra attack, strike through portals, and protect a character who has a real bond with it.**

---

# 2. Pakkun — `pakkun`

## Canon anchor

Official NARUTO material identifies Pakkun as one of Kakashi's Eight Ninja Dogs and a reliable summoned partner.

Pakkun's defining role throughout canon is **tracking, scent work, communication and pursuit**, with limited direct combat compared with large combat Summons.

Current SC authority already closes:

- sole exact Pakkun representation = PL16;
- Academy Kakashi uses this same Pakkun;
- no automatic Kakashi ownership from Story appearance;
- no Pakkun PL transfer;
- temporary Academy Kakashi use does not give Pakkun an independent recurring turn;
- existing Academy action anchor: **Nipping Bite — ATK 7**.

## Proposed lifecycle

Pakkun is a **support / tracking Summon**.

Default Battle mode:

- manifested as a support source;
- no independent recurring Battle turn;
- Pakkun actions use the controller's normal action opportunity unless an exact reaction says otherwise;
- independently targetable only when an occurrence explicitly puts Pakkun on the field as a participant;
- no passive Stat/PL donation.

This preserves the current Academy Kakashi semantics rather than creating a free extra turn from a PL16 support dog.

## Locked Kakashi Ninken enhancement — ITEM FIND

This is a **persistent recruited-Ninken enhancement**, not a Battle skill and not an attachment-only bonus.

Stephen's standing rule:

> **Each distinct Kakashi Ninja Dog legitimately found/recruited grants +5 percentage points to eligible Item Find / random loot-drop chance.**

Exact stacking:

- **1 dog = +5%**
- **2 dogs = +10%**
- **3 dogs = +15%**
- **4 dogs = +20%**
- **5 dogs = +25%**
- **6 dogs = +30%**
- **7 dogs = +35%**
- **8 dogs = +40%**

Rules:

- Pakkun counts as **one** distinct dog once he is legitimately recruited/acquired;
- finding/meeting Pakkun in Story without acquisition does **not** grant the enhancement;
- duplicate representations of the same dog do not stack;
- the enhancement is collection/roster-owned and does **not** require that dog to be attached or manifested in the current Battle;
- check loot eligibility first, then apply the cumulative Ninken Item Find bonus;
- the final eligible drop chance cannot exceed **100%**;
- this modifies **eligible random item/loot-drop chances only**;
- it does not alter fixed quest rewards, authored guaranteed drops, Story outcomes, Ryo, EXP, or unrelated reward tables.

Player-facing progression text:

> **NINJA DOG FINDER — Each Ninja Dog you recruit gives +5% Item Find. Recruit all 8 for +40%.**

This enhancement applies to the **Kakashi Ninja Dog collection family**, not merely to Pakkun's equipped Battle state.

## Proposed actions

### `pakkun_track_by_scent` — **Track by Scent**

SUPPORT / one hostile

> **Pakkun locks onto the target's scent so they are harder to hide or escape from.**

Effect:

- apply `pakkun_scent_tracked` to one target;
- while tracked, ordinary stealth/hide effects cannot make that target untargetable to Pakkun's controller;
- does not reveal unrelated hidden information;
- does not defeat Genjutsu by itself;
- lasts until Battle end, target leaves through an exact superior escape route, or the scent trail is explicitly broken.

### `pakkun_warning_bark` — **Warning Bark**

REACTION / controller / once per Battle

> **Pakkun warns you just before an attack lands.**

Effect:

- reduce one qualifying direct Attack-PL packet against the controller by **25% before Stamina**;
- automatic reaction;
- no player action cost;
- no counterattack.

### `pakkun_nipping_bite` — **Nipping Bite**

ATTACK / one hostile / ATK **7**

> **Pakkun bites the enemy.**

- preserves the existing Academy Kakashi Battle anchor;
- ordinary Stamina mitigation;
- uses the controller's normal action opportunity;
- no automatic Bleed or Stun.

### `pakkun_cut_them_off` — **Cut Them Off**

REACTION / one `pakkun_scent_tracked` hostile / once per Battle

> **If a tracked enemy tries to run, Pakkun cuts them off.**

Effect:

- reject one ordinary escape / disengage / major reposition action by the scent-tracked target;
- does not stop teleportation or an exact superior movement effect that explicitly overrides pursuit;
- does not deal damage;
- consumes no controller action because it reacts to the target's attempt.

## Exploration / Story utility

Outside Battle, `Track by Scent` may satisfy an exact authored tracking/pursuit requirement when Pakkun has a legitimate scent source.

It does not create omniscient location knowledge.

Player-facing shorthand:

> **Pakkun is a tracking specialist. Mark an enemy by scent, stop them hiding, warn you about one attack, and cut off one escape attempt. Recruiting Pakkun also adds +5% Item Find as part of Kakashi's Ninja Dog collection.**

Production note:

**Pakkun remains STAGED / NOT LIVE until separate production admission. Combat calibration does not silently admit him.**

---

# 3. Kamatari — `wr_kamatari`

## Canon anchor

Official NARUTO material explicitly identifies Temari's Kamatari and the **Summoning: Blade Dance / Quick Beheading Dance** combination.

The defining canon identity is:

- fast wind-riding movement;
- giant sickle;
- wide-area cutting;
- especially destructive when carried by the summoner's wind.

## Proposed lifecycle

Kamatari has two clean states.

### ATTACHED

- no independent Battle turn;
- controller receives source-owned **+6 Bukijutsu** from `Sicklewind Guidance`;
- Effective PL is recomputed normally from Stats;
- no Kamatari PL transfer.

### MANIFESTED

- the +6 Bukijutsu attached bonus ends;
- Kamatari becomes an independent targetable PL77 participant;
- Kamatari receives its own action opportunity and own Battle PL ledger.

This creates a readable choice:

> **Keep Kamatari attached for +6 Bukijutsu, or manifest him as a separate fighter.**

## Proposed manifested actions

### `kamatari_reaping_rush` — **Reaping Rush**

ATTACK / Bukijutsu / one hostile / ATK **28**

> **Kamatari rushes past one enemy and cuts them with his sickle.**

- one direct packet;
- ordinary Stamina mitigation;
- no automatic Bleed.

### `kamatari_gale_pursuit` — **Gale Pursuit**

ATTACK / one hostile / ATK **22**

> **Kamatari chases an enemy trying to move away.**

If the target has attempted a movement/reposition/escape action since Kamatari's previous action:

- ATK becomes **30**.

Otherwise:

- ATK **22**.

No hidden Speed Stat is created.

### `kamatari_crosswind_guard` — **Crosswind Guard**

DEFENSE / one ally

> **Kamatari sweeps across the battlefield and knocks part of an attack away.**

Effect:

- reduce the ally's next qualifying direct Attack-PL packet by **35% before Stamina**;
- one packet;
- if unused, expires at Kamatari's next action opportunity.

### `kamatari_quick_beheading_dance` — **Quick Beheading Dance**

ATTACK / AREA / once per Battle / up to **3 hostiles**

Base ATK:

- **26 per target**.

Wind synergy:

- if the controller currently has an exact compatible Wind Release / authored wind-combination source active, ATK becomes **30 per target**.

Player text:

> **Kamatari rides the wind and cuts up to 3 enemies. Stronger when your team supplies Wind Release.**

Rules:

- separate packet per target;
- ordinary Stamina mitigation;
- no automatic death, dismemberment or terrain destruction;
- no random hit roll;
- controller's Wind source does not create an extra action;
- no generic +Wind Affinity percentage.

## Legacy-runtime replacement note

Current `game.js` still contains the older Kamatari factory package:

- Reap ATK15;
- Gale Pursuit ATK11 / 14;
- Crosswind Interception;
- charged Gale Sever 12 / 21 / 32;
- existing `wr_kamatari.sicklewind_guidance` +6 Bukijutsu source package.

If Stephen signs off this Wave 3 proposal:

- preserve **Sicklewind Guidance +6 Bukijutsu** as the attached-mode enhancement;
- replace the old manifested action palette with the signed-off Wave 3 palette;
- do **not** stack old and new Kamatari actions/effects;
- implementation remains downstream.

Player-facing shorthand:

> **Kamatari can stay attached to give +6 Bukijutsu, or enter Battle as a fast sickle fighter with a powerful three-target Wind combo.**

---

# 4. Wave 3 decision state

Awaiting Stephen sign-off:

- `nue` — independent PL100 chakra-draining dimensional fighter + exact Nue-bond guard;
- `pakkun` — PL16 support/tracking Summon using the controller action economy + standing Kakashi Ninken enhancement of +5% Item Find per distinct recruited dog (up to +40% across all 8);
- `wr_kamatari` — attached +6 Bukijutsu OR manifested PL77 sickle fighter, with Quick Beheading Dance.

No runtime implementation or production admission change is claimed by this proposal.

**design proposed != design closed != implemented != runtime validated != Golden GREEN**
