# Shinobi Chronicles — Academy Kakashi Sequential MI/PS Action Tuning + AMT Viability

**Date:** 2026-09-16  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING COMBAT TUNING FOR MASKED INTERCEPTOR + PACKAGE SMUGGLER / FINAL AMT PL CALIBRATION STILL REQUIRED**

## 1. Purpose

This document consumes the PL / Registry / Rank return on GitHub issue `#214` and closes the Combat-owned action numerics, AI and mathematical viability for the Academy Kakashi sequential Masked Interceptor and Package Smuggler stages.

Consumed PL authority:

`Documentation/Registry/Academy Kakashi Origin Sequential Opposition Registry and PL Calibration 2026-09-16.md`

commit:

`930c5048453d0034b2856ad3ddfa5ea65fdede7b`

Binding occurrence/source calibrations:

- `academy_kakashi_origin_masked_interceptor` — Stats `11 / 14 / 15 / 8 / 8 / 10 / 13` — Base PL **14**;
- `academy_kakashi_origin_package_smuggler` — Stats `9 / 7 / 8 / 11 / 9 / 6 / 10` — Base PL **10**.

These occurrence profiles supersede the earlier use of generic `decoy_assassin` and `fuinjutsu_smuggler` numerics inside Academy Kakashi Origin Battle configs. The generic profiles remain unchanged elsewhere and remain only derivation/provenance references for these Story participants.

Preserve:

- authored occurrence calibration != runtime encounter scaling;
- Story participant identity != generic reusable opposition identity;
- `academy_kakashi` remains Base PL 15;
- no hidden damage multiplier, capacity reduction or parity scaling;
- Combat tuning != Base-PL authorship;
- sequential timing role != direct/non-sequential timing role;
- Battle victory != Story success;
- Battle defeat != death/custody;
- design closed != implemented != runtime validated != Golden GREEN.

---

## 2. Current Kakashi feasibility baseline

For this exact viability proof, current authoritative prepared damage includes:

- `academy_kakashi_kunai_quickdraw` — Attack PL **5**;
- `academy_kakashi_opening_exploit` — normal Attack PL **5**;
- enhanced Opening Exploit — Attack PL **7** only after `academy_kakashi_clone_feint` setup;
- Clone Feint itself consumes a controller action and deals no Battle-PL damage;
- Wire Snare / Prodigy's Read remain utility/control rather than hidden damage.

Current Stamina mitigation remains:

`max(1, floor(resolvedAttackPL * 100 / (100 + Effective Stamina)))`.

No Kakashi Skill is globally inflated by this closure.

---

# 3. Masked Interceptor — final Academy-Origin Combat package

Source participant:

`academy_kakashi_origin_masked_interceptor`

Base PL / Battle-entry capacity:

**14**

Effective Stamina at unmodified entry:

**13**

The action identities may retain their existing runtime IDs for compatibility, but their Academy-Origin resolution source is the exact occurrence participant above, not the generic PL45 `decoy_assassin` profile.

## 3.1 Concealed Blade

Existing action ID:

`enemy_decoy_assassin_concealed_blade`

Academy-Origin semantics:

- discipline: `bukijutsu`;
- mode: direct;
- target: one hostile;
- Attack PL: **5**;
- ordinary Stamina mitigation;
- no automatic Crit, Bleed, Stun, displacement or extra packet.

The prior Academy-Origin value **26** is superseded for this participant.

## 3.2 Decoy Substitution

Existing action ID:

`enemy_decoy_assassin_decoy_substitution`

Retain:

- mode: guard/setup self;
- once per Battle;
- establishes a source-owned guard for the next qualifying direct packet;
- **25% pre-Stamina prevention** against that one packet;
- one packet only;
- no independent decoy participant, PL or turn;
- no automatic miss/evasion state.

No stronger prevention value is authorised here.

## 3.3 False Retreat

Existing action ID:

`enemy_decoy_assassin_false_retreat`

Academy-Origin semantics:

- mode: movement/deception setup self;
- establishes one source-owned `false_retreat_opening` through the user's next action;
- the next Concealed Blade gains **+2 Attack PL**, producing Attack PL **7**, then consumes the marker;
- otherwise the marker expires after the user's next action;
- does not compel pursuit;
- does not automatically alter opponent Knowledge/belief;
- no Speed Stat, evasion scalar or extra action.

The prior Academy-Origin **+4** is superseded for this participant.

## 3.4 Deterministic AI — corrected order

The Masked Interceptor resolves this priority:

1. if `false_retreat_opening` is live and Concealed Blade is legal, use Concealed Blade and consume the marker;
2. else if Remaining Battle PL is at or below 50% of entry capacity, Decoy Substitution is unused, and no equivalent source-owned guard is live, use Decoy Substitution;
3. otherwise use False Retreat.

This ordering prevents the AI from creating an opening and then ignoring it to select another setup action.

It also means the opponent presents three readable tactical beats rather than simply spamming direct damage:

- establish opening;
- cash out opening;
- use one defensive trick when badly depleted.

---

## 4. Masked Interceptor <=4 controller-action viability proof

Against Stamina 13:

- Attack PL5 -> `floor(500 / 113)` = **4 Battle-PL damage**;
- Attack PL7 -> `floor(700 / 113)` = **6 Battle-PL damage**.

A direct four-action line therefore has raw resolved sequence:

`4 + 4 + 4 + 4 = 16`

against capacity 14 before Decoy Substitution.

Decoy Substitution does not make the authored <=4 route impossible. Even under a conservative integer interpretation where 25% prevention reduces a PL5 packet to resolved Attack PL3 before Stamina, that guarded packet still deals:

`floor(300 / 113) = 2`.

Three ordinary PL5 packets plus one conservatively guarded packet therefore resolve:

`4 + 4 + 4 + 2 = 14`.

That exactly exhausts a 14-capacity Masked Interceptor within four Kakashi/controller action opportunities.

A second legitimate line also exists from PL authority:

`Clone Feint -> enhanced Opening Exploit -> PL5 direct -> PL5 direct`

which resolves before MI prevention as:

`0 + 6 + 4 + 4 = 14`.

Runtime does not guarantee the player either line. It must merely preserve at least one legitimate difficult-but-possible path through the authored action/AI package.

The Stephen-direct Story gate therefore remains:

**Masked Interceptor Battle victory in 1–4 controller action opportunities preserves Package Smuggler catch-up eligibility.**

---

# 5. Package Smuggler — final Academy-Origin Combat package

Source participant:

`academy_kakashi_origin_package_smuggler`

Base PL / Battle-entry capacity:

**10**

Effective Stamina at unmodified entry:

**10**

The action identities may retain existing runtime IDs for compatibility, but their Academy-Origin numeric source is the exact occurrence participant above, not generic PL36 `fuinjutsu_smuggler`.

## 5.1 Binding Tag

Existing action ID:

`enemy_fuinjutsu_smuggler_binding_tag`

Retain:

- discipline: `fuinjutsu`;
- mode: control;
- target: one hostile;
- establish source-owned `binding_tag` through target's next action;
- blocks only actions whose exact definition requires movement/reposition;
- not Stun;
- no direct Battle-PL damage;
- does not block an otherwise legal non-movement direct action merely because it is offensive.

## 5.2 Contraband Seal Burst

Existing action ID:

`enemy_fuinjutsu_smuggler_contraband_seal_burst`

Academy-Origin semantics:

- discipline: `fuinjutsu`;
- mode: direct;
- target: one hostile;
- Attack PL: **5**;
- ordinary Stamina mitigation;
- no automatic secondary condition.

The prior Academy-Origin value **22** is superseded for this participant.

## 5.3 Seal Release

Existing action ID:

`enemy_fuinjutsu_smuggler_seal_release`

Retain:

- support self;
- may remove one live adverse state only if that state's exact metadata declares `smuggler_seal_release_compatible`;
- no universal cleanse;
- no Hosted Entity/Summon implication;
- illegal/unselectable if no compatible state exists.

## 5.4 Deterministic AI

Retain:

1. if a compatible releasable adverse state is live, use Seal Release;
2. else if target has no live source-owned `binding_tag`, use Binding Tag;
3. otherwise use Contraband Seal Burst.

Binding Tag remains tactical control rather than a no-play Stun, so it must not silently invalidate Kakashi actions that do not require movement/reposition.

---

## 6. Package Smuggler <=3 controller-action viability proof

Against Stamina 10:

- Attack PL5 -> `floor(500 / 110)` = **4 Battle-PL damage**;
- Attack PL7 -> `floor(700 / 110)` = **6 Battle-PL damage**.

Three legal PL5 direct packets resolve:

`4 + 4 + 4 = 12`

against capacity 10.

The setup line also reaches the threshold:

`Clone Feint -> enhanced Opening Exploit -> PL5 direct`

resolves:

`0 + 6 + 4 = 10`.

No route-specific hidden Kakashi damage bonus is required or authorised.

The Stephen-direct Story gate therefore remains:

**Package Smuggler Battle victory in 1–3 controller action opportunities preserves ANBU Marked Target catch-up eligibility.**

---

# 7. Config projection law

The PL occurrence calibration and Combat action packages above apply whenever these exact Story participants deploy inside Academy Kakashi Origin, including:

- sequential configurations;
- direct/non-sequential 1v1 configurations;
- PS+MI 2v1;
- any authorised multi-opponent configuration containing either exact participant.

They are **not** weakened sequential copies.

The timing gates remain attached only to the exact sequential route/configuration semantics. A direct/non-sequential Masked Interceptor or Package Smuggler fight does not acquire the <=4 / <=3 chase benchmark merely because the same participant Stats/action package is used.

---

# 8. Final ANBU Marked Target / Pakkun viability audit — NOT CLOSED

Combat's #214 triage explicitly promised to audit the final stage rather than waiting for Coding to discover another impossible fight.

Current durable Battle authority still maps the Academy Kakashi Origin ANBU Marked Target to generic:

`anbu_style_operative`

with:

- Stats `50 / 47 / 48 / 34 / 43 / 46 / 49`;
- Base PL / entry capacity **49**;
- Stamina **49**;
- Tantō Flash Attack PL **26**;
- Wire Capture movement/reposition control;
- Silent Body Flicker granting **+4** to the next Tantō Flash.

Temporary Pakkun remains:

- Base/Battle PL **16**;
- Nipping Bite Attack PL **7**;
- no independent initiative;
- choosing a Pakkun action consumes the controller's normal action opportunity;
- Pakkun PL is never added to Kakashi.

Under current Stamina mitigation against AMT Stamina49:

- Kakashi Attack PL5 -> `floor(500 / 149)` = **3**;
- Pakkun Nipping Bite PL7 -> `floor(700 / 149)` = **4**.

Because Pakkun shares the controller action economy, the best of those simple direct packets is still only 4 damage/action against capacity49. The final stage has no inherited MI/PS timing gate, so capacity49 alone does not prove mathematical impossibility. However, the combination of the generic high-tier occurrence calibration and the existing Attack PL26 / boosted PL30 offence is not responsibly certifiable as a legitimate Academy-Kakashi/Pakkun fight from current Combat authority.

Combat will **not** solve that ambiguity by:

- secretly reducing AMT Battle capacity;
- scaling AMT to Kakashi at runtime;
- globally nerfing `anbu_style_operative`;
- globally inflating Kakashi or Pakkun;
- inventing a route-only hidden damage multiplier.

The same source-boundary problem already proven for Masked Interceptor and Package Smuggler should be resolved explicitly for the Academy-Origin AMT.

Required PL / Registry action:

- author exact occurrence/source calibration for `academy_kakashi_origin_amt` for Academy Kakashi Origin;
- provide canonical seven Stats + Base PL;
- preserve generic `anbu_style_operative` as its own reusable profile unless PL independently finds that profile globally wrong;
- preserve no runtime auto-scaling;
- calibrate for a genuinely difficult but achievable final Kakashi + temporary Pakkun Battle under the already-authored shared action economy.

After PL returns that exact source calibration, Combat will close:

- AMT Tantō Flash Attack PL;
- Wire Capture interaction;
- Silent Body Flicker amplifier;
- deterministic AI;
- Kakashi/Pakkun final-stage viability;
- any bounded tactical Pakkun interaction legitimately required.

---

# 9. Coding consumption boundary

Coding may now implement the MI/PS occurrence profiles and Combat action tuning above, but complete #214 / Academy Kakashi sequential-route Golden remains blocked on the final AMT occurrence calibration and subsequent Combat closure.

For MI/PS validation, Coding must prove at minimum:

1. exact occurrence Stats/PL are used instead of generic PL45/PL36 source numerics;
2. no encounter scaling occurs;
3. MI Concealed Blade = Attack PL5;
4. MI False Retreat = +2 to next Concealed Blade;
5. MI Decoy Substitution = once/Battle, 25% pre-Stamina prevention for one qualifying direct packet;
6. MI AI consumes a live False Retreat opening before choosing another setup;
7. at least one legal Battle trace defeats MI within <=4 controller actions;
8. PS Seal Burst = Attack PL5;
9. Binding Tag remains movement/reposition-only control, not Stun;
10. at least one legal Battle trace defeats PS within <=3 controller actions;
11. direct/non-sequential fights reuse participant/action calibration without inheriting sequential chase timing gates;
12. Battle defeat/victory does not manufacture death/custody/Story success.

Installed-browser/Golden proof remains Coding-owned and unclaimed here.

---

## Final lock

> **Masked Interceptor is now PL14 / Stamina13 with PL5 Concealed Blade, +2 False Retreat and one 25% Decoy Substitution; a <=4-action victory is mathematically legitimate without scaling or hidden damage.**
>
> **Package Smuggler is now PL10 / Stamina10 with PL5 Seal Burst and bounded control; a <=3-action victory is mathematically legitimate without scaling or hidden damage.**
>
> **The final AMT/Pakkun stage remains a real PL/Registry source-calibration dependency and must be closed before Combat claims the complete sequential route viable.**
