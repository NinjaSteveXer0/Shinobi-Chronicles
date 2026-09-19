# Shinobi Chronicles — RESET v2 Source 09 Proposal: Kamatari

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **PROPOSED FOR STEPHEN SIGN-OFF — PL / REGISTRY NUMERIC RECONCILIATION #258 OPEN**  
**Parent:** #235  
**PL / Registry dependency:** #258  
**Reset authority:** `Documentation/Combat/SC_Combat_Summons_Tailed_Beasts_Full_Calibration_RESET_v2_2026-09-18.md`  
**Global mechanics standard:** `Documentation/Combat/SC_Combat_Unique_Shinobi_Chronicles_Mechanics_Design_Standard_2026-09-19.md`  
**Source baseline:** `75c8cd3c99127c3029e3505d00ab2d77e3925036`

---

# A. Identity / PL

Stable ID:

`wr_kamatari`

Display:

**Kamatari**

Ontology:

**Entity -> Summon**

Canonical association:

**Temari**

Production state:

**LIVE Entity Registry source.**

## PL / Registry conflict — not owned by Combat

Current live `game.js` records:

- Ninjutsu **74**
- Taijutsu **78**
- Bukijutsu **82**
- Fūinjutsu **24**
- Kinjutsu **48**
- Genjutsu **30**
- Stamina **70**
- Base PL **77**

Those Stats resolve to PL77 under Formula v1.0.

However, #236's opening PL / Registry authority says Kamatari is an existing live anchor at **PL82**.

Combat will not invent a hidden PL bonus or silently rewrite Stats to reconcile that contradiction.

Issue **#258** has therefore been routed to PL / Registry / Rank for the authoritative seven Stats + Base PL.

This proposal deliberately authors Kamatari's mechanics without depending on whether the returned Base PL is 77 or 82.

No Kamatari PL transfers wholesale to a controller.

---

# B. Canon anchors consumed before authoring

Canon / source anchors used:

- Kamatari is Temari's weasel Summon and carries a large sickle.
- Temari summons Kamatari through **Summoning: Quick Beheading Dance / Blade Dance**.
- the technique uses Temari's Giant Folding Fan to generate a powerful wind current that carries Kamatari through the battlefield.
- Kamatari rapidly cuts through the path carried by that wind.
- the attack is unusually wide-area and destructive rather than a single ordinary melee swing.
- the technique can expose or destroy hiding terrain / cover by cutting through the surrounding area.
- its destructive path can leave the battlefield flattened and reveal positions that depended on that terrain.
- Kamatari's speed while riding the wind is a defining part of the technique.

Primary/near-primary anchors:
- Naruto manga chapter 214.
- Tō no Sho databook entry for Summoning: Quick Beheading Dance.

Secondary canon reference consumed for cross-check:
- Narutopedia entries for Kamatari and Summoning: Quick Beheading Dance.

SC adaptation below does **not** claim every gameplay state or number is literal canon.

---

# C. Battle role

**WIND-RIDING BUKIJUTSU / PURSUIT / FORMATION BYPASS**

Kamatari's RESET v2 identity is not:

> +6 Bukijutsu because he carries a sickle.

His source-specific identity is:

1. use Kamatari's wind-riding speed to reach **one enemy outside Active Slot 1** once per Battle;
2. let the controller break the normal front-target restriction with an exact Wind Release / Bukijutsu strike rather than a generic Stat bonus;
3. pursue enemies who try to reposition or escape;
4. retain **Quick Beheading Dance** as Kamatari's signature manifested attack without inventing vegetation, debris or cover objects the current Battle model does not use.

This deliberately replaces the old generic Stat-stick interpretation.

---

# D. Lifecycle / action economy

## OWNED

- collection presence only;
- no global Battle bonus.

## ATTACHED / PREPARED

- Kamatari is the Character's active Summon;
- **Sicklewind Route** enhancement is active;
- no independent Kamatari Battle PL ledger;
- no independent Kamatari action opportunity;
- no +6 Bukijutsu Stat modifier under this RESET v2 proposal.

## MANIFESTED

- Kamatari becomes independently targetable;
- own Battle PL ledger = his own Effective PL after #258 numeric authority is resolved;
- own normal Entity action opportunity;
- **Sicklewind Route remains active** while Kamatari is still the attached source;
- no Kamatari Stats / PL transfer to controller.

If Kamatari leaves manifestation but remains attached:

- Sicklewind Route remains;
- Kamatari's body / own Battle PL ledger / own actions leave play.

Detaching or replacing Kamatari:

- ends Sicklewind Route;
- removes any unused Sicklewind Route opportunity.

---

# E. REQUIRED Enhancement Package

## `kamatari_sicklewind_route` — **Sicklewind Route**

Activation:

**ATTACHED** — remains available while manifested.

Limit:

**once per Battle**

Player text:

> **Once per Battle, use a Wind Release or Bukijutsu attack on one enemy in the waiting formation instead of the active enemy.**

Exact Battle mechanics:

- normal enemy targeting is centered on **Enemy Active Slot 1**;
- Sicklewind Route may be declared when Kamatari's controller uses one qualifying **single-target Wind Release or Bukijutsu ATTACK**;
- instead of Enemy Active Slot 1, choose one occupied enemy waiting slot from **Slots 2–6**;
- resolve that attack normally against the chosen participant;
- the chosen waiting enemy does **not** become the active enemy merely because it was attacked;
- the enemy deployment queue is not reordered merely because Sicklewind Route was used;
- if the attack legitimately depletes that participant to 0 Battle PL, ordinary depletion / queue rules handle the result;
- Sicklewind Route cannot target an empty, already-depleted or otherwise legally untargetable participant;
- the route does not bypass exact immunity, protection, sealing, space-time or technique-specific targeting restrictions;
- the route is consumed when the off-slot attack is committed;
- no second attack, bonus action, hidden Attack PL or Stat increase is created.

Why this is Kamatari-specific:

Kamatari's defining wind-riding speed lets the controller **cut past the fighter currently occupying the front of the formation** and reach someone waiting behind them. SC expresses that canon identity through its actual six-slot Battle deployment model rather than through vegetation, debris or other environmental objects the current game does not model.

Decision created:

> **Do I spend Kamatari's one route now to hit a dangerous enemy before they reach Active Slot 1, or save it for later?**

This replaces the proposed generic wind-lane / soft-cover concept.

---

# F. Own Skill Kit

## 1. `kamatari_reaping_rush` — **Reaping Rush**

Class:

**ATTACK / BUKIJUTSU**

Target:

one hostile

ATK:

**30**

Player text:

> **Kamatari rushes through one enemy with his sickle for 30 ATK.**

Rules:

- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- can bridge ordinary close-to-mid battlefield separation;
- no automatic Bleed;
- no automatic Stun;
- does not consume Sicklewind Route unless this attack is specifically used as the controller's declared off-slot Sicklewind attack.

This is Kamatari's reliable no-setup attack.

---

## 2. `kamatari_gale_pursuit` — **Gale Pursuit**

Class:

**ATTACK / PURSUIT**

Target:

one hostile

Base ATK:

**24**

Pursuit ATK:

**32**

Player text:

> **Chase one enemy for 24 ATK. If they moved, repositioned or tried to escape since Kamatari's last action, deal 32 ATK instead.**

Rules:

- one direct packet;
- ordinary Stamina mitigation;
- the stronger value requires a genuine movement / reposition / escape action by that target since Kamatari's previous action opportunity;
- can bridge the ordinary distance created by that movement;
- no hidden Speed Stat;
- no automatic movement cancellation;
- no automatic Stun.

Decision created:

> **Move away and risk Kamatari's stronger pursuit, or stay and fight from your current position.**

---

## 3. `kamatari_crosswind_cutoff` — **Crosswind Cutoff**

Class:

**REACTION / PURSUIT**

Limit:

**once per Battle**

Trigger:

one hostile Kamatari can legally pursue begins an ordinary movement / reposition / escape action.

Player text:

> **Kamatari cuts across the escape route. The enemy can stop moving, or push through and take the hit.**

Target choice:

### BREAK OFF

- the movement / reposition / escape portion is cancelled;
- no Kamatari damage is dealt;
- the target may still keep any non-movement effect that the original action legally resolves without that movement;
- this is not Stun.

### PUSH THROUGH

- the movement / reposition / escape resolves;
- after it resolves, Kamatari deals **ATK22** to that target;
- ordinary Stamina mitigation applies;
- Kamatari follows to the target's new ordinary position where legal.

Exact superior movement effects that explicitly cannot be intercepted by ordinary pursuit ignore Crosswind Cutoff.

This is not a generic "root" or "slow": the target chooses whether the route is worth the cut.

---

## 4. `kamatari_quick_beheading_dance` — **Quick Beheading Dance**

Class:

**ATTACK / AREA / WIND-RIDING BUKIJUTSU**

Limit:

**once per Battle**

Target:

the current legally targetable enemy group / active engagement, up to **3 hostiles** where the Battle occurrence actually exposes multiple simultaneous hostile targets.

ATK:

**32 each**

Player text:

> **Kamatari rides the wind through up to 3 legally exposed enemies for 32 ATK each.**

Rules:

- one Attack-PL packet per target;
- ordinary Stamina mitigation;
- no random accuracy / miss roll;
- does not create an extra controller action;
- does not automatically kill, dismember or remove a target;
- does **not** invent destructible vegetation, debris or soft-cover objects;
- Sicklewind Route is the separate once-per-Battle rule that permits the controller to target a waiting-slot enemy;
- Quick Beheading Dance does not independently grant unrestricted access to Slots 2–6 unless another exact rule makes those participants legally exposed.

This preserves Kamatari's wide cutting signature while keeping the new formation-bypass enhancement mechanically distinct.

---

# G. Counter / drawback

Kamatari's defining enhancement is deliberately limited to **one off-slot strike per Battle**.

- ordinary attacks still obey the normal active-enemy targeting structure;
- Sicklewind Route must be spent on one qualifying single-target Wind Release or Bukijutsu attack;
- using it does not reorder the enemy formation or pull the waiting target into Active Slot 1;
- Reaping Rush and Gale Pursuit remain ordinary manifested attacks unless another exact rule changes their target eligibility;
- no artificial elemental weakness is added.

Crosswind Cutoff is limited to once per Battle and preserves target choice rather than creating generic hard crowd control.

---

# H. Persistent / collection progression

No account-wide persistent collection bonus is proposed for Kamatari.

No generic rarity bonus is added.

His identity lives in the active Sicklewind Route / manifested combat package.

---

# I. Double-count / representation exclusions

- Kamatari's own Base PL is Kamatari's Battle capacity only.
- no Entity PL transfers to controller.
- RESET v2 **retires** the old generic `wr_kamatari.sicklewind_guidance` +6 Bukijutsu Stat package if this proposal is approved.
- do not apply +6 Bukijutsu and Sicklewind Route together.
- Sicklewind Route is consumed by one committed off-slot attack and cannot be reused in the same Battle.
- manifested Kamatari remains the same attached source; no duplicate second Kamatari package is created.
- a dedicated future representation that already embodies this exact Kamatari wind-lane package must not receive it twice.

---

# J. Current-runtime replacement note

Current `game.js` still contains the historical Kamatari package:

- `wr_kamatari.sicklewind_guidance` = +6 Bukijutsu;
- `kamatari_reap` = ATK15;
- `kamatari_gale_pursuit` = ATK11 / ATK14 contextual;
- `kamatari_crosswind_interception` = categorical interception state;
- `kamatari_gale_sever` = charged 12 / 21 / 32 attack with catastrophic interruption behavior.

Those rows pre-date RESET v2 and the global unique-mechanics standard.

If Stephen signs off Source 09:

- replace +6 Bukijutsu with **Sicklewind Route**;
- replace the old Kamatari manifested action palette with the signed-off Source 09 kit;
- do not stack old and new actions/effects;
- preserve live implementation until Coding performs the explicit migration;
- resolve #258 before claiming Kamatari's final Base PL / Stats are numerically closed.

No runtime implementation / browser validation / Golden claim is made by this proposal.

---

# K. Player-facing summary

## KAMATARI — WIND-RIDING SICKLE / PURSUIT / FORMATION BYPASS

> **Attach Kamatari to gain Sicklewind Route: once per Battle, one of your Wind Release or Bukijutsu attacks can target an enemy waiting outside Active Slot 1. Manifest Kamatari for fast sickle attacks, pursuit and Quick Beheading Dance.**

That is the intended Source 09 identity.

---

# L. Decision state

**Mechanics:** PROPOSED / awaiting Stephen sign-off.  
**Identity:** stable ID `wr_kamatari` preserved.  
**PL numeric closure:** BLOCKED only on PL / Registry issue #258.  
**Implementation:** NOT STARTED under RESET v2.  
**Runtime validation:** NOT CLAIMED.  
**Golden:** NOT CLAIMED.

**design proposed != design closed != implemented != runtime validated != Golden GREEN**
