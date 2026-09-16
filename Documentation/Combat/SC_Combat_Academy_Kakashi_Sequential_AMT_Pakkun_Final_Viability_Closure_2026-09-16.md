# Shinobi Chronicles — Academy Kakashi Sequential AMT / Pakkun Final Viability Closure

**Date:** 2026-09-16  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING COMBAT CLOSURE — ISSUE #214 COMBAT SEMANTICS COMPLETE / CODING + RUNTIME + GOLDEN PROOF REQUIRED**  
**Source issue:** GitHub issue `#214`

## 1. Purpose

This document consumes the final PL / Registry / Rank return for the Academy Kakashi Origin ANBU Marked Target and closes the remaining Combat-owned portion of issue `#214`.

Consumed Registry / PL authority:

`Documentation/Registry/Academy Kakashi Origin ANBU Marked Target Registry and PL Calibration 2026-09-16.md`

commit:

`0a0bbaf3c3c2395e22977a41da0892a209a73994`

Consumed prior Combat closure:

`Documentation/Combat/SC_Combat_Academy_Kakashi_Sequential_MI_PS_Action_Tuning_and_AMT_Viability_2026-09-16.md`

commit:

`4ef10cc556790a35e692b6a10f2733846809b494`

The final PL return establishes the exact Academy-Origin participant/source profile:

`academy_kakashi_origin_amt`

with canonical Stats:

`14 / 17 / 19 / 10 / 11 / 13 / 17`

and Base PL / unmodified Battle-entry capacity:

**18**

The globally reusable `anbu_style_operative` remains PL49 under its own authority and is not changed by this closure.

Preserve throughout:

- exact Story participant != generic reusable opposition profile;
- authored occurrence calibration != runtime encounter scaling;
- Battle victory != Story success;
- Battle defeat != death/custody;
- Pakkun temporary participation != Summon ownership/contract;
- Pakkun action source != independent initiative;
- no hidden depletion, healing, capacity reduction or damage multiplier;
- no global Kakashi or Pakkun Skill inflation;
- design closed != implemented != runtime validated != Golden GREEN.

---

## 2. Academy-Origin AMT action package

The existing action IDs may remain for runtime compatibility, but when they resolve from `academy_kakashi_origin_amt` inside Academy Kakashi Origin, the exact semantics below supersede the former generic `anbu_style_operative` PL49 numerics for this Story participant only.

### 2.1 Tantō Flash

Existing action ID:

`enemy_anbu_style_operative_tanto_flash`

Academy-Origin semantics:

- discipline: `bukijutsu`;
- mode: direct;
- target: one hostile;
- Attack PL: **6**;
- ordinary Stamina mitigation;
- no automatic Crit;
- no Bleed;
- no Stun;
- no displacement;
- no extra damage packet.

The former Academy-Origin inheritance of generic Attack PL **26** is superseded for this exact participant.

This keeps the AMT offensively above the Masked Interceptor / Package Smuggler PL5 baseline without importing high-tier generic ANBU-scale output into an Academy tutorial occurrence.

### 2.2 Wire Capture

Existing action ID:

`enemy_anbu_style_operative_wire_capture`

Academy-Origin semantics:

- discipline: `bukijutsu`;
- mode: control;
- target: one hostile;
- **once per Battle** for this exact Academy-Origin participant;
- on valid committed resolution establish source-owned `wire_capture` through the target's next action;
- blocks only actions whose exact authored definition requires movement/reposition;
- not Stun;
- no direct Battle-PL damage;
- does not create custody/capture Story fact;
- does not disable a direct action merely because its animation, name or fiction implies physical movement.

In particular, current `pakkun_nipping_bite` remains a direct physical Attack PL7 action and has no authored movement/reposition requirement. Wire Capture therefore does **not** make Nipping Bite illegal merely from the word or animation concept “bite”.

This once-per-Battle bound is occurrence-specific and prevents the final tutorial opponent from repeatedly refreshing movement control as a substitute for meaningful offence. It does not alter the globally reusable generic `anbu_style_operative` action package.

### 2.3 Silent Body Flicker

Existing action ID:

`enemy_anbu_style_operative_silent_body_flicker`

Academy-Origin semantics:

- discipline: `ninjutsu`;
- mode: utility/setup self;
- establish one source-owned `silent_body_flicker_position` marker through the AMT's next action;
- if the next legal AMT action is Tantō Flash, that attack gains **+2 Attack PL**, producing Attack PL **8**, then consumes the marker;
- otherwise the marker expires after the AMT's next action;
- no Speed/Agility Stat;
- no extra action or turn;
- no invisibility state;
- no automatic evasion;
- no target Knowledge rewrite.

The former Academy-Origin inheritance of generic **+4** is superseded for this exact participant.

---

## 3. Deterministic AMT AI

For `academy_kakashi_origin_amt`, resolve action selection in this order:

1. if `silent_body_flicker_position` is live and Tantō Flash is legal, use Tantō Flash and consume the marker;
2. else if Wire Capture has not yet been used this Battle, no equivalent source-owned `wire_capture` is already live on the selected target, and Wire Capture is legal, use Wire Capture;
3. else if the AMT's immediately prior committed action was Tantō Flash and Silent Body Flicker is legal, use Silent Body Flicker;
4. otherwise use Tantō Flash.

This yields a readable tactical rhythm rather than a setup loop:

`Wire Capture -> Tantō Flash -> Silent Body Flicker -> boosted Tantō Flash -> Silent Body Flicker -> boosted Tantō Flash ...`

subject to ordinary legality and Battle ending first.

The AI does not gain additional actions because a setup was used. Wire Capture and Silent Body Flicker each consume the AMT's normal action opportunity.

---

## 4. Temporary Pakkun remains unchanged

No new Pakkun power is required to make the final fight viable.

Retain current temporary Battle authority:

`pakkun_origin_unfamiliar_ninken`

Base / Battle PL:

**16**

`pakkun_nipping_bite`:

- direct physical;
- Attack PL **7**;
- ordinary Stamina mitigation;
- no poison;
- no Stun.

Action economy remains:

- Pakkun has no independent initiative/turn;
- choosing a Pakkun action consumes the same controller action opportunity that otherwise belongs to Kakashi;
- Pakkun PL is never added to Kakashi;
- there is no separate Summon capacity donation;
- no Summon ownership/contract is granted by this Story occurrence.

No route-only Pakkun damage bonus, assist multiplier or hidden combo scalar is authorised.

---

## 5. Final-stage difficult-but-achievable proof

AMT Effective Stamina at unmodified entry is **17**.

Current mitigation:

`max(1, floor(resolvedAttackPL * 100 / (100 + Effective Stamina)))`

Therefore against the AMT:

- Kakashi Attack PL5 -> `floor(500 / 117)` = **4** Battle-PL damage;
- Kakashi enhanced Attack PL7 -> `floor(700 / 117)` = **5** Battle-PL damage;
- Pakkun Nipping Bite PL7 -> `floor(700 / 117)` = **5** Battle-PL damage.

AMT entry capacity is **18**.

Four legal Pakkun Nipping Bite controller choices therefore resolve:

`5 + 5 + 5 + 5 = 20`

against capacity18.

That is a legitimate four-controller-action victory line while fully preserving the shared action economy: those are four controller actions, not four Pakkun turns plus four Kakashi turns.

A mixed line can also reach the same threshold without any hidden bonus. For example two PL7-equivalent packets and two ordinary Kakashi PL5 packets resolve:

`5 + 5 + 4 + 4 = 18`.

The final stage has **no newly authored <=4 Story timing gate**. These four-action lines are mathematical viability evidence only, not a new chase benchmark.

### 5.1 Conservative incoming-pressure proof

The AMT package remains dangerous.

Under the deterministic AI above, even a conservative ordering in which the AMT receives an action opportunity before each of the first four controller actions produces:

1. AMT Wire Capture — no damage;
2. controller action;
3. AMT Tantō Flash — Attack PL6;
4. controller action;
5. AMT Silent Body Flicker — no damage;
6. controller action;
7. AMT boosted Tantō Flash — Attack PL8;
8. controller action.

Before that fourth controller action resolves, the AMT has delivered only two direct damage packets: PL6 and PL8.

Because ordinary Stamina mitigation cannot increase a packet above its resolved Attack PL, those two packets can deal at most:

`6 + 8 = 14`

Battle-PL damage in total even under the deliberately harsher zero-mitigation upper bound.

Baseline Academy Kakashi remains Base/Battle PL15 and temporary Pakkun remains PL16. Therefore neither can be forced from a fresh ordinary unmodified entry state to 0 by those first two AMT direct packets solely from these action numerics, even if both packets target the same one of them.

The fourth legitimate PL7 Pakkun packet can consequently still exist in the conservative trace and defeats the PL18 AMT at 20 cumulative resolved damage.

This establishes a real difficult-but-achievable final fight without:

- runtime parity scaling;
- hidden pre-damage to the AMT;
- a secret Kakashi/Pakkun damage multiplier;
- extra Pakkun initiative;
- generic ANBU nerfs;
- global Kakashi Skill inflation.

The player is not guaranteed this line. Poor action choices may prolong the fight into additional boosted Tantō Flash cycles and may lose. That is intentional.

---

## 6. Sequential-route viability is now Combat-closed

Prior binding Combat proof already closes:

### Masked Interceptor

`academy_kakashi_origin_masked_interceptor`

- Base PL14 / Stamina13;
- Concealed Blade PL5;
- False Retreat +2 -> PL7;
- one 25% Decoy Substitution packet;
- at least one legitimate victory line within **<=4 controller action opportunities**.

### Package Smuggler

`academy_kakashi_origin_package_smuggler`

- Base PL10 / Stamina10;
- Contraband Seal Burst PL5;
- Binding Tag is movement/reposition-only control, not Stun;
- at least one legitimate victory line within **<=3 controller action opportunities**.

### ANBU Marked Target + temporary Pakkun

`academy_kakashi_origin_amt`

- Base PL18 / Stamina17;
- Tantō Flash PL6;
- Wire Capture bounded to one use and exact movement/reposition requirements;
- Silent Body Flicker +2 -> PL8 Tantō Flash;
- deterministic non-looping tactical AI;
- Pakkun Bite remains PL7 under shared controller action economy;
- final stage is mathematically winnable without a hidden timing rule or scaling mechanic.

The complete authored path is therefore now Combat-viable:

**MI <=4 -> PS <=3 -> AMT/Pakkun reachable and legitimately winnable.**

Each sequential stage remains a distinct Battle occurrence with its ordinary deterministic Battle-entry snapshot. This closure does not invent cross-stage Remaining Battle PL carry-over, cross-stage healing, hidden depletion or enemy scaling.

---

## 7. Projection law

The exact `academy_kakashi_origin_amt` Stats/Base PL and Academy-Origin action package above apply whenever this same Story participant deploys inside Academy Kakashi Origin, including direct/non-sequential and authorised multi-opponent configurations.

Do not create:

- a sequential-only weak AMT;
- an `amt_easy` runtime profile;
- separate PL18 and PL49 copies of the same Academy-Origin Story participant selected by encounter difficulty;
- a Pakkun-scaled AMT;
- a runtime scalar based on Kakashi's current PL.

The generic `anbu_style_operative` PL49 profile and its generic reusable action package remain separate global authority.

Sequential MI/PS timing gates remain attached only to their exact sequential Story route semantics. This document does not add a timing gate to direct/non-sequential AMT configurations or to the final AMT stage.

---

## 8. Coding / runtime consumption checklist

Coding / Runtime may now consume the complete #214 Combat package.

At minimum implementation and runtime/Golden proof must establish:

1. `academy_kakashi_origin_amt` resolves Stats `14/17/19/10/11/13/17`, Base PL18, not generic PL49;
2. generic `anbu_style_operative` remains unchanged elsewhere;
3. Academy-Origin Tantō Flash resolves at Attack PL6;
4. Academy-Origin Wire Capture is once/Battle, movement/reposition-only control, not Stun or custody;
5. Wire Capture does not infer movement requirements from Skill name/art/animation and therefore does not silently disable current Pakkun Nipping Bite;
6. Academy-Origin Silent Body Flicker grants +2 only to the next legal Tantō Flash, producing PL8, with no extra action/evasion/Speed state;
7. deterministic AI consumes a live Body Flicker marker before selecting another setup and does not refresh Wire Capture indefinitely;
8. Pakkun Bite remains Attack PL7 and consumes the controller's normal action opportunity;
9. no Pakkun independent initiative or PL donation occurs;
10. one factual Battle trace demonstrates the final AMT/Pakkun stage can be won under current semantics;
11. sequential MI <=4 and PS <=3 traces remain valid with their exact occurrence profiles;
12. the route can actually reach the final AMT stage after satisfying both earlier timing gates;
13. Battle victory/defeat returns factual Battle evidence only and does not manufacture Story death/custody/success;
14. no runtime encounter scaling, hidden capacity reduction or cross-stage depletion cheat is introduced;
15. installed-browser / Golden validation remains distinct from this design closure.

---

## 9. Final lock

> **Academy Kakashi Origin AMT = PL18 / Stamina17 with PL6 Tantō Flash, one bounded movement-only Wire Capture, and +2 Silent Body Flicker producing PL8.**
>
> **Temporary Pakkun remains PL16 with PL7 Nipping Bite and no independent turn or PL donation.**
>
> **The complete sequential path is now Combat-viable: MI <=4 -> PS <=3 -> AMT/Pakkun reachable and legitimately winnable, without hidden scaling, depletion, extra initiative or route-only damage bonuses.**
>
> **Issue #214 Combat semantics are closed. Coding / Runtime #188 now owns implementation plus installed-browser / Golden proof.**
