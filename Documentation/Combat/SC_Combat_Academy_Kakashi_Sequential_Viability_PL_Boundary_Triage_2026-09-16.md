# Shinobi Chronicles — Academy Kakashi Sequential Viability / PL Boundary Triage

**Date:** 2026-09-16  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING COMBAT TRIAGE — PL / REGISTRY RECALIBRATION REQUIRED BEFORE FINAL COMBAT TUNING**

## 1. Trigger

Coding/runtime issue `#214` proved an implementation-valid but mathematically impossible Battle state for the Academy Kakashi sequential Masked Interceptor stage.

Current authority combines:

- `academy_kakashi` Base/Battle PL **15**;
- prepared direct Attack PL values **5 / 5**, with enhanced Opening Exploit **7** after a non-damage Clone Feint setup action;
- Masked Interceptor currently mapped to generic opposition profile `decoy_assassin`, Base PL **45**, Stamina **41**;
- Package Smuggler currently mapped to generic opposition profile `fuinjutsu_smuggler`, Base PL **36**, Stamina **31**;
- Stephen-direct Story timing lock:
  - Masked Interceptor must be defeated within **1–4 PL Battle turns** to preserve Package Smuggler catch-up;
  - Package Smuggler must then be defeated within **1–3 PL Battle turns** to preserve ANBU Marked Target catch-up.

The timing source is:
`Documentation/Story/Academy_Kakashi_Triple_Kill_Turn_Window_and_Achievement_Note_2026-09-15.md`.

This is a possibility requirement, not a guaranteed player outcome, but it must remain factually achievable.

---

## 2. Combat mathematical proof

Current Stamina mitigation remains:

`max(1, floor(resolvedAttackPL * 100 / (100 + Effective Stamina)))`

### Masked Interceptor

At Stamina **41**:

- Attack PL 5 -> `floor(500 / 141)` = **3** Battle-PL damage;
- Attack PL 7 -> `floor(700 / 141)` = **4** Battle-PL damage.

Best four-controller-action direct spam under the current package is therefore:

`3 + 3 + 3 + 3 = 12`

against entry Battle capacity **45**.

The Clone Feint -> enhanced Opening Exploit route is lower total output inside four actions because Clone Feint itself consumes an action.

Therefore the authored `<=4` victory window is impossible by a wide margin even before Decoy Substitution's 25% pre-Stamina guard is considered.

### Package Smuggler

At Stamina **31**:

- Attack PL 5 -> `floor(500 / 131)` = **3** Battle-PL damage;
- Attack PL 7 -> `floor(700 / 131)` = **5** Battle-PL damage.

Best three-action direct spam is:

`3 + 3 + 3 = 9`

against entry Battle capacity **36**.

Clone Feint -> enhanced Opening Exploit consumes one of the three actions and produces at most `5 + 3 = 8` resolved Battle-PL damage across the remaining two damaging actions.

Therefore the authored `<=3` Package Smuggler victory window is also mathematically impossible under the currently mapped generic profile.

The second contradiction has not yet needed a separate runtime failure to be real; it follows directly from the already-binding numbers and timing gate.

---

## 3. Ownership diagnosis

This is **not correctly solved by silently buffing Academy Kakashi's general Skill package**.

Reasons:

1. The 1–4 / 1–3 windows are Stephen-direct Story authority and are deliberately intended as a difficult legitimate route. Combat should not erase them merely to accommodate an unrelated generic enemy profile.
2. Academy Kakashi's Base Stats/Base PL are PL / Registry authority. Combat must not mutate them encounter-locally without upstream representation authority.
3. `decoy_assassin` PL45 and `fuinjutsu_smuggler` PL36 are generic reusable Enemy/Opposition Registry calibrations. Their global values may be appropriate elsewhere. The contradiction is that these generic profiles were bound directly to an Academy-origin occurrence whose authored timing challenge requires a very different viability envelope.
4. Inflating Academy Kakashi's ordinary direct Skills enough to erase PL45 in four actions would distort every other Battle using that same prepared palette and would turn a source-binding/calibration problem into global Skill power creep.
5. No current Story authority establishes that the Masked Interceptor or Package Smuggler enters these Battles already heavily depleted, so Combat will not fabricate route-local missing Battle PL as an invisible workaround.
6. Coding-only hidden HP/damage cheats remain prohibited.

Therefore the smallest correct upstream owner is **PL / Registry / Rank** for exact Academy-Kakashi-occurrence opposition calibration/source identity.

---

## 4. Required PL / Registry decision

PL / Registry must close one exact representation/calibration route for the Academy Kakashi sequential opposition without automatic encounter scaling.

Preferred architecture:

- retain global generic `decoy_assassin` PL45 and `fuinjutsu_smuggler` PL36 unchanged unless PL independently finds those generic calibrations wrong;
- author dedicated Academy-Kakashi-Origin opposition source identities/profiles (or another explicit occurrence-specific Registry calibration mechanism) for:
  - `academy_kakashi_origin_masked_interceptor`;
  - `academy_kakashi_origin_package_smuggler`;
- assign exact seven Stats and Base PL appropriate to these authored Academy-Origin occurrences;
- preserve identity/source separation: Story participant identity does not have to equal a generic reusable card/profile identity;
- do not derive values automatically from Kakashi PL at runtime;
- do not mutate Kakashi Base PL merely to force encounter parity.

PL should calibrate with the binding Combat feasibility constraints visible, but PL owns the exact Stats/PL values. Combat does **not** prescribe a hidden target PL number here.

A useful hard feasibility bound from the current Skill package is:

- with four Attack-PL-5 actions, absolute raw ceiling before Stamina is **20**;
- with three Attack-PL-5 actions, absolute raw ceiling before Stamina is **15**;
- any positive Stamina reduces those resolved ceilings further.

Therefore any PL calibration intended to preserve these exact timing windows must be authored together with the current Stamina mitigation and must leave at least one legitimate player line that can actually reach defeat inside the relevant window.

---

## 5. Combat work after PL closure

Once PL / Registry publishes the exact Academy-origin opponent Stats/Base PL/source bindings, Combat will immediately re-audit and close:

- Masked Interceptor direct Attack PL and setup/guard values;
- Package Smuggler direct Attack PL/control values;
- deterministic AI against Academy Kakashi's capacity;
- whether current Decoy Substitution 25% prevention is still viable inside the 1–4 challenge;
- whether one or more authored Kakashi Skill interactions need a **bounded tactical payoff** rather than a global damage buff;
- final AMT/Pakkun stage viability under the same no-auto-scaling law.

Combat must prove the route is difficult but possible. The goal is not automatic victory.

---

## 6. Preserve

- PL owns Base Stats / Base PL / Registry calibration.
- Combat owns action semantics, Attack PL, conditions, prevention, AI, Battle viability and action-economy interaction.
- Story's `MI <=4 -> PS <=3 -> AMT reachable` timing requirement remains binding.
- difficult != impossible.
- authored occurrence calibration != automatic encounter scaling.
- generic enemy profile != mandatory source for every visually/narratively similar Story participant.
- Battle victory != Story success.
- Battle defeat != death/custody.
- design closed != implemented != runtime validated != Golden GREEN.

## Final ruling

> The current sequential Kakashi contradiction is a **PL/Registry source-calibration blocker first**, followed by a Combat tuning pass.
>
> Combat will not solve it by global Kakashi Skill inflation, hidden Battle-capacity cheats, or deleting Stephen's timing challenge.
