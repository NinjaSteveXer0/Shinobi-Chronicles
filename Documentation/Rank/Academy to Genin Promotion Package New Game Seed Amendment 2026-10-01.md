# Shinobi Chronicles — Academy -> Genin Promotion Package New Game Seed Amendment

**Date:** 2026-10-01  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING RANK AMENDMENT — ISSUE #447**  
**Amends:** `Documentation/Rank/Academy to Genin Variable Promotion Requirement Packages 2026-10-01.md`  
**Does not reopen:** Option A readiness-domain model or the six Academy package definitions.

## 1. Owner clarification ratified

Promotion requirement package identity is rooted in the **New Game / Chronicle playthrough**, not in assessment entry.

For a given playthrough, exact Character and exact Rank transition:

> **the underlying Promotion requirement package is already fixed by the immutable Chronicle root and cannot reroll during play.**

Discovery, satisfaction, failure, retry, scenario choice, team changes, UI activity and save/load may change surrounding state or presentation, but they do not change package identity.

## 2. Authoritative derivation identity

Rank ratifies the semantic derivation key:

`immutableChronicleSeed + stableCharacterId + rankTransitionId -> promotionRequirementPackageId`

The exact hashing/PRNG implementation is Coding-owned, but it must be deterministic and must consume only a stable immutable Chronicle seed plus stable Character identity plus exact Rank-transition identity, together with the Rank-authored eligible package pool/version.

For Academy -> Genin:

`rankTransitionId = academy_to_genin`

The derived result must be one of the six Rank-authored Academy package IDs already closed by #445.

The package is **effectively determined from New Game**, even if runtime materialises/caches the record only when that Character/transition first needs it.

Materialisation time != semantic determination time.

## 3. Per-Character / per-transition lock

Package identity is stable for:

**one Chronicle playthrough + one stable Character + one Rank transition**

Do not key package identity from:
- current team slot;
- current roster order;
- current Registry display representation;
- assessment scenario;
- attempt number;
- failure count;
- current difficulty presentation;
- UI state;
- discovery state;
- satisfaction state.

If the same Character becomes eligible later in the playthrough, the same immutable Chronicle seed still determines the package that belongs to that Character/transition.

A Character acquired after New Game therefore does **not** receive a freshly randomised package at acquisition time.

## 4. No in-play reroll

The following must never reroll the package:

- first assessment entry;
- retry;
- failure;
- withdrawal;
- alternate authorised assessment scenario;
- changing team composition;
- changing current assignment;
- leaving/re-entering Arena;
- save/load;
- browser refresh;
- UI reopen/rerender;
- Shinobi Record inspection;
- requirement discovery;
- requirement satisfaction;
- examiner disclosure;
- Promotion-result inspection.

An alternate scenario must support the already-fixed package. Scenario choice cannot select a more favourable package.

## 5. New package boundary

A different package may arise only from:

1. a genuinely new Chronicle / New Game with a new authoritative Chronicle seed; or
2. a separately authorised post-completion restart/new-Chronicle mode whose authority explicitly creates a new Chronicle seed/root.

Normal in-play institutional actions do not supersede the package.

The earlier #445 wording allowing an explicit institutional/new-lineage supersession inside the same playthrough is therefore superseded for Academy -> Genin.

Content migration may map obsolete package/version IDs only when technically required to preserve compatibility. Such migration must preserve the same semantic package where possible and must never become a player-accessible reroll mechanism.

## 6. Reveal and satisfaction remain independent

Package identity, reveal state and satisfaction state are separate.

Each requirement slot can occupy exactly these semantic combinations:

- hidden + unsatisfied;
- hidden + satisfied;
- revealed + unsatisfied;
- revealed + satisfied.

Discovery/reveal changes only Knowledge/presentation.

Satisfaction changes only authoritative criterion state.

Neither changes `promotionRequirementPackageId`.

Player projection:

- hidden -> `??????` or approved equivalent;
- revealed + unsatisfied -> readable requirement, no success treatment;
- revealed + satisfied -> readable requirement with approved light-green/checkmarked success treatment or final UI equivalent.

A hidden satisfied requirement remains hidden until legitimate reveal authority exists.

## 7. Option A preserved

No readiness-domain change is made.

Academy -> Genin PASS still requires:

1. `missionObjectiveCompleted=true`;
2. qualifying `mission_comprehension`;
3. qualifying `judgement_under_pressure`;
4. the exact two secondary domains named by the fixed package;
5. no examiner safety/integrity abort/disqualification.

The six Academy package IDs remain unchanged.

## Final lock

> **For each Chronicle playthrough, Promotion package identity is fixed from the immutable New-Game Chronicle root per stable Character + Rank transition. Runtime may materialise that package later, but it must deterministically recover the package that was already true for that playthrough. Nothing that happens during ordinary play can reroll it. Discovery and satisfaction alter only Knowledge/presentation and criterion state, never package identity.**
