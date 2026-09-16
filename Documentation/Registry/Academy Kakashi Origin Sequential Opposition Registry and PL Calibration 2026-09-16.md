# Shinobi Chronicles — Academy Kakashi Origin Sequential Opposition Registry and PL Calibration

**Date:** 2026-09-16  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING REGISTRY / PL CLOSURE — ISSUE #214 PL SLICE COMPLETE / RETURN TO COMBAT REQUIRED**  
**Source handoff:** GitHub issue #214  
**Combat triage:** `Documentation/Combat/SC_Combat_Academy_Kakashi_Sequential_Viability_PL_Boundary_Triage_2026-09-16.md` / commit `236c9080d35b2c41eb88b3e7f6b2ec2743f238d3`  
**Story timing authority:** `Documentation/Story/Academy_Kakashi_Triple_Kill_Turn_Window_and_Achievement_Note_2026-09-15.md`

## 1. Ruling

The Kakashi Origin Masked Interceptor and Package Smuggler are exact Story participants and must not inherit the globally reusable `decoy_assassin` PL45 / `fuinjutsu_smuggler` PL36 packages merely because those generic profiles were convenient implementation matches.

This closure therefore authors two exact Academy-Kakashi-Origin opposition Registry source profiles:

- `academy_kakashi_origin_masked_interceptor`
- `academy_kakashi_origin_package_smuggler`

These are the same exact Story participants everywhere they occur inside Academy Kakashi Origin. They are **not** special low-capacity sequential-only copies and they are **not** runtime-scaled from Kakashi.

The reusable generic opposition packages remain unchanged:

- `decoy_assassin` remains PL45 under its existing authority;
- `fuinjutsu_smuggler` remains PL36 under its existing authority.

Preserve:

> **exact Story participant != generic reusable opposition profile**

> **authored exact-participant calibration != encounter scaling**

> **same participant across branch/config variants != multiple Registry people**

---

## 2. Canonical Stat model

Stat order remains:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Formula v1.0 remains:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

No direct/hidden PL bonus is introduced.

---

## 3. Masked Interceptor

Stable Academy-Origin participant/source ID:

`academy_kakashi_origin_masked_interceptor`

Display / observer-safe Story label:

**Masked Interceptor**

Classification:

**Enemy/Opposition — exact Academy Kakashi Origin Story participant**

Formal Rank:

**unknown / not authorised**

Collectible/live-production admission:

**NO**

Base Stats:

`11 / 14 / 15 / 8 / 8 / 10 / 13`

Formula:

- highest = `15`
- top three = `15 / 14 / 13`
- top-three average = `14`
- all-seven sum = `79`
- all-seven average = `11.285714...`
- raw PL = `0.60×15 + 0.25×14 + 0.15×11.285714...`
- raw PL = `14.192857...`

Base PL:

**14**

Calibration intent:

- Bukijutsu / Taijutsu forward exact interceptor profile;
- enough Stamina and field capability to remain dangerous to Academy Kakashi without borrowing adult/generic `decoy_assassin` capability wholesale;
- no hidden Speed/Agility Stat;
- no automatic evasion, substitution, guard, escape or interception effect from Base Stats alone;
- exact Concealed Blade / False Retreat / Decoy Substitution semantics remain Combat-owned.

### Feasibility boundary exposed to Combat

Current Combat Stamina mitigation:

`max(1, floor(resolvedAttackPL × 100 / (100 + Effective Stamina)))`

At Stamina `13`:

- Attack PL5 -> `floor(500/113)` = **4** Battle-PL damage;
- Attack PL7 -> `floor(700/113)` = **6** Battle-PL damage.

Therefore current Kakashi lines include:

- four direct PL5 attacks -> `4 + 4 + 4 + 4 = 16` against capacity14;
- Clone Feint setup + enhanced PL7 Opening Exploit + two PL5 attacks -> `0 + 6 + 4 + 4 = 14` across four controller actions.

Thus the Story-authorised `Masked Interceptor <=4 turns` gate is numerically possible before Combat performs its required AI/prevention/tactical re-audit.

This PL closure does **not** guarantee either line survives final Combat AI/guard semantics unchanged. Combat owns the final difficult-but-possible viability proof.

---

## 4. Package Smuggler

Stable Academy-Origin participant/source ID:

`academy_kakashi_origin_package_smuggler`

Display / observer-safe Story label:

**Package Smuggler**

Classification:

**Enemy/Opposition — exact Academy Kakashi Origin Story participant**

Formal Rank:

**unknown / not authorised**

Collectible/live-production admission:

**NO**

Base Stats:

`9 / 7 / 8 / 11 / 9 / 6 / 10`

Formula:

- highest = `11`
- top three = `11 / 10 / 9`
- top-three average = `10`
- all-seven sum = `60`
- all-seven average = `8.571428...`
- raw PL = `0.60×11 + 0.25×10 + 0.15×8.571428...`
- raw PL = `10.385714...`

Base PL:

**10**

Calibration intent:

- technical Fūinjutsu-forward package handler/smuggler rather than a reusable high-capability `fuinjutsu_smuggler` profile;
- exact seal technique usefulness does not imply adult/high-end general Battle capability;
- no hidden package-protection bonus, restraint immunity or Story authority from the role label;
- exact Seal Burst / Binding Tag / Seal Release semantics remain Combat-owned.

### Feasibility boundary exposed to Combat

At Stamina `10`:

- Attack PL5 -> `floor(500/110)` = **4** Battle-PL damage;
- Attack PL7 -> `floor(700/110)` = **6** Battle-PL damage.

Therefore current Kakashi lines include:

- three direct PL5 attacks -> `4 + 4 + 4 = 12` against capacity10;
- Clone Feint setup + enhanced PL7 Opening Exploit + one PL5 attack -> `0 + 6 + 4 = 10` across three controller actions.

Thus the Story-authorised `Package Smuggler <=3 turns` gate is numerically possible before Combat performs its required AI/control/tactical re-audit.

Again, PL proves the Base-calibration possibility boundary only. Combat must prove the final authored action/AI package remains difficult but possible.

---

## 5. Source-binding law across Kakashi Origin configs

These exact participant calibrations apply whenever the same Story participant appears in Academy Kakashi Origin, including direct/non-sequential and sequential encounter configs.

Do **not** create branch-local variants such as:

- `academy_kakashi_origin_masked_interceptor_easy`
- `academy_kakashi_origin_package_smuggler_sequential`
- dynamically reduced Battle capacity because a timing route is active.

Where existing Kakashi Origin configs currently bind:

- Masked Interceptor -> generic `decoy_assassin`;
- Package Smuggler -> generic `fuinjutsu_smuggler`;

replace the **source/profile binding for those exact Story participants** with the stable Academy-Origin IDs above.

This includes multi-opponent configs containing the same participant. Encounter composition does not change their Base package.

If future Story authority establishes a factual injury/depletion/state change before a Battle, that may be an explicit source-owned Battle/runtime state. No such depletion is authored by this closure.

---

## 6. Identity / history semantics

Each row above is one exact historical Story participant inside Academy Kakashi Origin.

- branch/config reuse does not mint another person;
- participant death/custody/escape/survival history attaches to the stable Academy-Origin participant ID;
- observer label does not determine formal Rank;
- Battle defeat does not itself mean death or custody;
- later lethal resolver facts remain Story/CE-owned;
- these opposition rows do not enter the live collectible `97 Characters + 18 Entities = 115` production cardinality.

They are Registry-addressable opposition participants, not collectible admissions.

---

## 7. Academy Kakashi boundary

`academy_kakashi` remains Base/Battle PL **15** under existing authority.

This closure does not:

- alter Kakashi's seven Base Stats;
- grant Kakashi hidden PL;
- globally increase his Attack PL;
- grant a route-local damage multiplier;
- create automatic encounter parity;
- infer opponent values from Kakashi at runtime.

The two opposition packages are authored exact-participant calibrations because the previously reused generic profiles represented the wrong capability sources for this Origin.

---

## 8. Required downstream Combat pass

Combat now owns the immediate next action on issue #214.

Consume exact PL/Registry source authority:

- `academy_kakashi_origin_masked_interceptor` — Stats `11/14/15/8/8/10/13`, Base PL **14**;
- `academy_kakashi_origin_package_smuggler` — Stats `9/7/8/11/9/6/10`, Base PL **10**.

Then re-audit and close:

- Masked Interceptor Concealed Blade / False Retreat / Decoy Substitution;
- Package Smuggler Seal Burst / Binding Tag / Seal Release;
- deterministic AI/action economy;
- exact effect of Decoy Substitution prevention inside `<=4`;
- any bounded tactical Kakashi payoff needed without global Skill inflation;
- final ANBU Marked Target / Pakkun stage viability;
- exact difficult-but-possible proof for `MI <=4 -> PS <=3 -> AMT reachable`.

Combat must not reinterpret the PL14/PL10 values as a guarantee of player victory.

---

## 9. Final lock

> **Academy Kakashi Origin Masked Interceptor = Base Stats `11/14/15/8/8/10/13`, Base PL14.**
>
> **Academy Kakashi Origin Package Smuggler = Base Stats `9/7/8/11/9/6/10`, Base PL10.**
>
> **These are exact Origin participant profiles across all Kakashi-Origin configs, not sequential-only difficulty variants and not runtime scaling. Generic `decoy_assassin` PL45 and `fuinjutsu_smuggler` PL36 remain unchanged. Academy Kakashi remains PL15. Combat now owns final Battle tuning/viability proof.**
