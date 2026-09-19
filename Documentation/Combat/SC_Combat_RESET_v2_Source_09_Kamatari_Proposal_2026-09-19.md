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

**WIND-RIDING BUKIJUTSU / PURSUIT / COVER BREAKER**

Kamatari's RESET v2 identity is not:

> +6 Bukijutsu because he carries a sickle.

His source-specific identity is:

1. convert a real Wind Release action into a **wind lane**;
2. let Bukijutsu ride that lane across ordinary battlefield distance;
3. pursue enemies who try to reposition or escape;
4. turn a prepared wind lane into **Quick Beheading Dance**;
5. tear apart ordinary destructible cover / hiding terrain instead of applying a generic accuracy debuff.

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
- removes any unspent Kamatari wind-lane state.

---

# E. REQUIRED Enhancement Package

## `kamatari_sicklewind_route` — **Sicklewind Route**

Activation:

**ATTACHED** — remains active while manifested.

Player text:

> **Use Wind Release to open a wind lane. Your next Bukijutsu attack can ride that lane across normal distance, or Kamatari can turn it into Quick Beheading Dance.**

## Wind-lane establishment

When the controller completes a qualifying **Wind Release** action that actually creates battlefield airflow / gust / whirlwind movement:

- establish one `kamatari_wind_lane`;
- the Wind action resolves normally first;
- establishing the lane does **not** create another attack or action;
- only one Kamatari wind lane may exist for this controller at a time;
- creating a new valid lane replaces the unused prior lane.

A mere Wind-affinity label with no expressed airflow does not automatically qualify.

## Attached-controller use

While Kamatari is attached but not manifested, the controller may consume the lane with their next qualifying **Bukijutsu** attack to:

- bridge ordinary battlefield distance / reposition separation;
- cut through ordinary soft/destructible obstruction along that authored route;
- prevent ordinary vegetation/debris/soft-cover concealment on that route from making the target untargetable for that attack.

The lane does **not**:

- add hidden Attack PL;
- bypass sealed barriers;
- bypass space-time locks;
- bypass exact indestructible protection;
- automatically defeat Genjutsu;
- create a generic accuracy stat.

## Manifested use

While Kamatari is manifested, the lane may instead be consumed by **Quick Beheading Dance**.

The same lane cannot empower both the controller and Kamatari.

## Expiration

If Kamatari is manifested:

- an unused lane expires after Kamatari completes his next action opportunity.

If Kamatari is not manifested:

- an unused lane expires after the controller completes their next action opportunity.

This makes the enhancement a timing decision rather than a permanent passive Stat increase.

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
- does not consume `kamatari_wind_lane`.

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

Requirement:

consume one active `kamatari_wind_lane`.

Target:

up to **3 hostiles** reachable through the same authored wind path / affected area.

ATK:

**32 each**

Player text:

> **Consume your wind lane. Kamatari rides it through up to 3 enemies for 32 ATK each and tears apart ordinary hiding cover in the path.**

Rules:

- one Attack-PL packet per target;
- ordinary Stamina mitigation;
- no random accuracy / miss roll;
- does not create an extra controller action;
- does not automatically kill, dismember, or remove a target;
- does not destroy sealed barriers / authored indestructible terrain merely because the technique is destructive.

## Cover-breaking consequence

For each affected position / target:

- ordinary destructible vegetation, debris, soft cover or equivalent hiding terrain in the authored cutting path is treated as cut apart / cleared;
- concealment or untargetability that depended **only** on that ordinary destroyed cover ends;
- this does not reveal unrelated hidden information;
- this does not break Genjutsu;
- this does not negate a separate stealth technique whose authority does not depend on the destroyed terrain;
- Story/world terrain destruction still requires authored Chronicle authority outside the Battle occurrence.

Mechanical fingerprint:

> Kamatari does not receive a generic "accuracy buff." He physically removes the ordinary cover that was doing the hiding.

---

# G. Counter / drawback

Kamatari's main limitation is **Wind dependence for his signature technique**.

- Reaping Rush and Gale Pursuit remain usable without setup.
- Quick Beheading Dance requires a real Kamatari wind lane.
- the Wind action that creates the lane already resolves normally, so the setup is not a dead button.
- an enemy can deny the signature payoff by forcing Kamatari/controller timing, removing Kamatari, or using protection that is not ordinary destructible cover.
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
- one `kamatari_wind_lane` cannot empower both controller Bukijutsu and Quick Beheading Dance.
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

## KAMATARI — WIND-RIDING SICKLE / PURSUIT / COVER BREAKER

> **Attach Kamatari and use Wind Release to open a wind lane. Spend it to carry a Bukijutsu attack across the field, or manifest Kamatari and unleash Quick Beheading Dance on up to 3 enemies. Kamatari is especially dangerous against enemies who run or hide behind ordinary cover.**

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
