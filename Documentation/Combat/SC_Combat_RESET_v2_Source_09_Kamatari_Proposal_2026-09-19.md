# Shinobi Chronicles — RESET v2 Source 09 Proposal: Kamatari

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **PARTIALLY REOPENED BY STEPHEN 2026-09-27 — PL82 TARGET LOCKED / SICKLEWIND ROUTE RECLASSIFIED AS ATTACK / ENHANCEMENT OPEN**  
**Parent:** #235  
**Stephen mechanics sign-off:** 2026-09-19  
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

## PL / Registry decision — target locked by Stephen

Stephen explicitly resolved the target on **2026-09-27**:

> **Kamatari Base PL = 82.**

Current live `game.js` still records:

- Ninjutsu **74**
- Taijutsu **78**
- Bukijutsu **82**
- Fūinjutsu **24**
- Kinjutsu **48**
- Genjutsu **30**
- Stamina **70**
- Base PL **77**

Those live Stats resolve to PL77 under Formula v1.0 and are therefore now implementation drift rather than final calibration authority.

Combat will not create a direct/hidden PL bonus and will not invent Kamatari's replacement seven-Stat row.

Issue **#258** remains the PL / Registry / Rank lane for the exact **Formula-v1.0-valid seven Base Stats that resolve to PL82**.

Stable ID remains:

`wr_kamatari`

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

Stephen corrected the Source 09 classification on **2026-09-27**:

> **Sicklewind Route is an ATTACK / action. It is not Kamatari's attached Enhancement.**

The already-approved tactical identity remains:

1. **Sicklewind Route** may be used once per Battle to attack one enemy **not occupying the Active slot**;
2. the target may be a legally occupied waiting/Benched/Reserve enemy slot;
3. resolving the attack does not by itself promote that enemy, reorder the queue or create a second action;
4. Kamatari retains pursuit pressure against movement/reposition;
5. **Quick Beheading Dance** remains his signature wide cutting attack.

The exact Attack-PL number for Sicklewind Route was never closed in the prior approval and remains **OPEN for Combat balancing**.

Kamatari's actual **Enhancement package is separately OPEN** and must not be fabricated by relabelling Sicklewind Route.

---

# D. Lifecycle / action economy

## OWNED

- collection presence only;
- no global Battle bonus by ownership alone.

## ATTACHED / PREPARED

- Kamatari is the Character's active/prepared Summon source;
- Kamatari's authorised Summon actions may be exposed through the current Battle's legal Summon-action interface;
- **Sicklewind Route is an attack/action, not an attached passive or Enhancement**;
- using Sicklewind Route consumes the legal action opportunity for that Summon attack;
- no second Kamatari Battle PL ledger is created merely by ordinary Alpha Summon-action use;
- Kamatari's separate Enhancement package remains **OPEN**.

## MANIFESTED — future/full-manifestation capability

Where a later Battle mode explicitly permits independent manifestation:

- Kamatari becomes independently targetable;
- own Battle PL ledger uses his own Effective PL, with Base PL target **82** after #258 returns formula-valid Stats;
- Kamatari uses his own action opportunity under that manifestation model;
- his attacks remain his own attacks;
- no Kamatari Stats / PL transfer to controller.

No ordinary Alpha Battle should infer a seventh Character slot or independent Summon turn merely from this future-capability section.

---

# E. REQUIRED Enhancement Package — OPEN

Stephen's 2026-09-27 correction explicitly reopens this section.

**Sicklewind Route is NOT the Enhancement.**

The former RESET v2 interpretation that used Sicklewind Route as the attached Enhancement is superseded.

Current requirements for the eventual Kamatari Enhancement:

- it must be distinct from Sicklewind Route and Kamatari's own attacks;
- it must have exact activation ownership;
- it must not transfer Kamatari's PL wholesale;
- it must pass the Shinobi Chronicles unique-mechanics / name-swap test;
- it must not be silently inferred from the legacy `+6 Bukijutsu` row merely because that row exists in runtime;
- Stephen sign-off is required before this source is fully calibrated again.

Until that is closed:

> **KAMATARI SKILLS/ATTACKS ≠ KAMATARI ENHANCEMENT.**

---

# F. Own Skill Kit

## 1. `kamatari_sicklewind_route` — **Sicklewind Route**

Class:

**ATTACK / FORMATION BYPASS**

Limit:

**once per Battle**

Target:

one legally occupied enemy slot **not occupying the Active slot**

Approved player-facing rule:

> **Once per Battle, attack an enemy NOT occupying the Active slot.**

Exact behavior:

- target one legally occupied waiting / Benched / Reserve enemy participant;
- bring that target into confrontation focus for the action presentation where needed;
- resolve the attack against that target;
- after resolution, the target remains in its ordinary queue/formation state unless normal depletion/formation rules independently change it;
- the current Active enemy remains Active merely because Sicklewind Route was used;
- no queue reorder;
- no forced promotion;
- no bonus action;
- no hidden Stat or PL increase;
- no universal targeting bypass.

**Attack PL: OPEN.**

The previous design never closed an exact Attack-PL number for this action. Combat must balance and obtain Stephen sign-off on that packet separately rather than inventing it here.

---

## 2. `kamatari_reaping_rush` — **Reaping Rush**

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

## 3. `kamatari_gale_pursuit` — **Gale Pursuit**

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

## 4. `kamatari_crosswind_cutoff` — **Crosswind Cutoff**

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

## 5. `kamatari_quick_beheading_dance` — **Quick Beheading Dance**

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
- Sicklewind Route is the separate once-per-Battle **attack** that can target a non-Active enemy;
- Quick Beheading Dance does not independently grant unrestricted access to waiting/Benched/Reserve enemies unless another exact rule makes those participants legally exposed.

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

No account-wide persistent collection bonus is currently closed for Kamatari.

No generic rarity bonus is added.

Do not use this section to substitute for the still-open **Enhancement package**.

---

# I. Double-count / representation exclusions

- Kamatari's own Base PL is Kamatari's Battle capacity only.
- no Entity PL transfers to controller.
- the legacy `wr_kamatari.sicklewind_guidance` +6 Bukijutsu row is **not ratified as final Enhancement authority by this correction**; whether it is retired or superseded by a new Enhancement remains OPEN;
- do not treat Sicklewind Route as a replacement passive Enhancement;
- Sicklewind Route is consumed as its own once-per-Battle off-slot attack and cannot be reused in the same Battle.
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

Current correction requires future implementation to:

- **NOT** replace an Enhancement with Sicklewind Route;
- implement Sicklewind Route only after its own exact Attack-PL packet is closed;
- replace old Kamatari attacks only from final signed-off Combat authority;
- do not stack old and new actions/effects;
- preserve live implementation until the corrected Source 09 package is fully closed;
- resolve #258 with Formula-valid Base Stats for **PL82** before claiming Kamatari's final Base PL / Stats are numerically closed;
- wait for a separately signed-off Kamatari Enhancement package before migrating the legacy enhancement row.

No runtime implementation / browser validation / Golden claim is made by this proposal.

---

# K. Player-facing summary — CURRENT CORRECTED DIRECTION

## KAMATARI — WIND-RIDING SICKLE / PURSUIT / FORMATION BYPASS

> **Sicklewind Route is Kamatari's once-per-Battle attack that can strike an enemy outside the Active slot. His separate attached Enhancement is still being designed.**

The full player-facing source summary is therefore **not final** until the Enhancement package and Sicklewind Route Attack PL are closed.

---

# L. Decision state

**Stable identity:** `wr_kamatari` preserved.  
**PL target:** **82 — LOCKED BY STEPHEN 2026-09-27.**  
**Formula-valid seven Stats:** OPEN / owned by PL-Registry-Rank under #258.  
**Sicklewind Route classification:** **ATTACK — CLOSED correction.**  
**Sicklewind Route off-slot behavior:** **CLOSED.**  
**Sicklewind Route Attack PL:** **OPEN.**  
**Kamatari Enhancement package:** **OPEN.**  
**Other signed-off Kamatari attack concepts:** preserved unless later balancing evidence requires a specific numeric correction.  
**Implementation:** HOLD — corrected source package is not fully closed.  
**Runtime validation:** NOT CLAIMED.  
**Golden:** NOT CLAIMED.

**PL target locked != Stats calibrated != attack numerics fully closed != enhancement closed != implemented != runtime validated != Golden GREEN**
