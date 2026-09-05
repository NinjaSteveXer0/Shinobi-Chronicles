# Shinobi Chronicles — Academy Obito Formal Training Development Calibration

**Status:** PL / Registry / Rank authority — Alpha calibration  
**Date:** 2026-09-05

This document consumes the World / Events / Missions / Rewards request for Academy Obito's four formal-training entitlements:

- `FULL`
- `SUBSTANTIAL`
- `REDUCED`
- `MINIMAL`

The entitlement is derived strictly from the actual remaining formal training opportunity after Obito's arrival. Community-help/diversion rewards are separate and do not replace or convert into formal training development.

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Formula v1.0 remains:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

## 1. Academy Obito baseline

Stable representation:

`academy_obito`

Canonical Base Stats:

`11 / 12 / 10 / 5 / 5 / 6 / 13`

Base PL:

**12**

The training entitlement does **not** rewrite this Base package. It applies a permanent earned **Current-Stat development package** to the owned Character instance. Current PL is then recalculated from the resulting Current Stats under Formula v1.0.

Preserve:

**Base ≠ Current**

**training entitlement ≠ direct PL grant**

**arrival timing ≠ PL modifier**

**community reward ≠ formal training reward**

## 2. Alpha training development packages

The four packages are intentionally small and Academy-appropriate. They represent how much of a balanced formal Academy training session Obito was actually able to complete. They do not imply a hidden EXP multiplier or morality score.

### FULL

Package ID:

`academy_obito_formal_training_full_stats`

Permanent Current-Stat deltas:

- Ninjutsu `+1`
- Taijutsu `+1`
- Bukijutsu `+1`
- Stamina `+1`

No change to Fūinjutsu, Kinjutsu, or Genjutsu.

From the canonical Base package, resulting Current Stats are:

`12 / 13 / 11 / 5 / 5 / 6 / 14`

Resulting Current PL:

**13**

### SUBSTANTIAL

Package ID:

`academy_obito_formal_training_substantial_stats`

Permanent Current-Stat deltas:

- Ninjutsu `+1`
- Taijutsu `+1`
- Bukijutsu `+1`

No change to Fūinjutsu, Kinjutsu, Genjutsu, or Stamina.

From the canonical Base package, resulting Current Stats are:

`12 / 13 / 11 / 5 / 5 / 6 / 13`

Resulting Current PL:

**12**

### REDUCED

Package ID:

`academy_obito_formal_training_reduced_stats`

Permanent Current-Stat deltas:

- Ninjutsu `+1`
- Taijutsu `+1`

No change to Bukijutsu, Fūinjutsu, Kinjutsu, Genjutsu, or Stamina.

From the canonical Base package, resulting Current Stats are:

`12 / 13 / 10 / 5 / 5 / 6 / 13`

Resulting Current PL:

**12**

### MINIMAL

Package ID:

`academy_obito_formal_training_minimal_stats`

Permanent Current-Stat delta:

- Taijutsu `+1`

No other Stat changes.

From the canonical Base package, resulting Current Stats are:

`11 / 13 / 10 / 5 / 5 / 6 / 13`

Resulting Current PL:

**12**

## 3. Interpretation

The Current-PL outcomes deliberately do not form a forced `+0/+1/+2/+3` reward ladder.

Formula v1.0 remains authoritative. Therefore:

- `FULL` crosses the next rounded Current-PL threshold and becomes Current PL **13** from the baseline package;
- `SUBSTANTIAL`, `REDUCED`, and `MINIMAL` all create real permanent Current-Stat development but remain Current PL **12** from the canonical baseline because they do not cross the formula threshold.

This is intentional.

Do not add a direct PL bonus simply to make the four labels display different PL numbers.

If the owned Obito already has other legitimate Current-Stat development before this training occurrence, apply the selected package's **deltas** to the existing Current Stats exactly once and recompute Current PL normally. The example resulting Current Stats above are the baseline-origin case only, not overwrite values.

## 4. Package lifecycle

Exactly one of the four training packages may be committed for the resolved formal training opportunity.

The selected package must:

- be sourced to the exact formal-training occurrence / entitlement;
- apply permanently to Current Stats;
- apply exactly once / idempotently;
- remain traceable through provenance/history;
- not be replaced by a community-help reward package;
- not stack multiple entitlement tiers for the same training opportunity.

The tiers are mutually exclusive outcomes for one formal training window.

## 5. Technique-development boundary

No Technique is authored by this PL calibration.

The supplied request does not identify an exact Technique curriculum, so PL does not invent one and does not convert hypothetical Technique learning into additional hidden Stats.

If World / Writing / Progression later defines an exact Academy Technique-development entitlement from this same training occurrence, Combat / Skills must author that Technique-access/development contract separately.

Such a Technique reward may coexist with the selected Stat package only when explicitly authorised; it is not implied by the Stat package itself.

Preserve:

**Technique development ≠ hidden Stat development**

**Stat package ≠ Technique ownership/access**

## 6. Community diversion boundary

Diversion/community occurrences may independently produce legitimate item, Ryo, EXP, relationship, Knowledge, or other contextual reward entitlements under their owning systems.

They do not alter the Stat values in this formal-training calibration except indirectly by changing how much training opportunity actually remained and therefore which one of the four already-defined entitlement labels World / Progression resolves.

Do not implement:

- `helpCountReward`
- `goodRouteBonus`
- `allHelpersBonus`
- morality-based Stat scaling
- direct PL for arriving early/late

The intended trade-off remains causal opportunity cost rather than moral punishment.
