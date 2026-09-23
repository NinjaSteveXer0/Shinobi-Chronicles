# Shinobi Chronicles — Academy Mirai Origin Disguised Instructor Registry and PL Calibration

**Date:** 2026-09-24  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING REGISTRY / PL CLOSURE — ISSUE #337 CONSUMED / RETURN TO COMBAT REQUIRED**  
**Source handoff:** GitHub issue #337  
**Writing authority:** `Documentation/Story/Academy_Mirai_Origin_WRITING_GOLDEN_2026-09-24.md`  
**CE reconciliation:** `Documentation/Coordination/Academy_Mirai_WRITING_GOLDEN_Disguised_Instructor_Implementation_Reconciliation_2026-09-24.md`  
**Source baseline inspected:** `95a66452f6df82eee3431d83e27a9bba74e213ae`  
**Current `game.js` blob inspected:** `9a95e018ac76b993c22b62ed6aa02be5520e97b1`

## 1. Ruling

Academy Mirai's optional post-switch PL Battle uses one exact Registry-addressable Story participant:

`academy_mirai_origin_instructor`

This is the same historical person who:

- appears as the Academy instructor before the escort begins;
- switches places with the real Traveller during the covered-market separation;
- presents as the apparent Traveller / Escort after the switch;
- may become Mirai's PL Battle opponent;
- is later revealed again as the Academy instructor.

The disguise does **not** mint another participant.

Preserve:

> **one person + changed presentation = one participant identity**

> **World identity != observer Knowledge != presentation label**

> **exact Academy-assessment participant != generic reusable Academy-instructor archetype**

This row is an exact Academy-Mirai-Origin assessment profile. It does not establish a universal PL for all Academy instructors and does not claim to be a future unrestricted/named representation of this person.

If a later authority names this instructor or authors a fuller representation, Registry must explicitly link that representation to this same persistent participant rather than creating a second historical person or retroactively inflating this Academy assessment occurrence.

---

## 2. Stable identity and classification

Stable participant/source ID:

`academy_mirai_origin_instructor`

Registry parent classification:

**Character-side Story participant / non-collectible opposition-capable participant**

Exact representation classification:

**Academy Mirai Origin controlled-assessment instructor profile**

Post-reveal display / role label:

**Academy Instructor**

Observer-safe pre-reveal Story/Battle presentation:

**Traveller** or **Escort**, according to the current authorised Story surface.

The observer-safe label is presentation only. Runtime/Combat may internally retain the stable participant ref without revealing it to Mirai or the player before the authored reveal.

Formal Rank:

**unknown / not authorised**

The word `Instructor` establishes a Story role, not a formal shinobi Rank. Do not infer Chūnin, Special Jōnin, Jōnin, or the Special-Jōnin qualification `instruction_and_examination.elite_instructor` from role wording alone.

Collectible/live-production admission:

**NO**

This participant does not enter the collectible Character production cardinality merely because Registry can address the Story opponent.

---

## 3. Canonical Stat model

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Formula v1.0:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

No direct or hidden PL bonus is authorised.

---

## 4. Base Stats / Base PL — CLOSED

Base Stats:

`17 / 14 / 10 / 6 / 7 / 12 / 15`

Breakdown:

- Ninjutsu: **17**
- Taijutsu: **14**
- Bukijutsu: **10**
- Fūinjutsu: **6**
- Kinjutsu: **7**
- Genjutsu: **12**
- Stamina: **15**

Formula:

- highest = `17`
- top three = `17 / 15 / 14`
- top-three average = `15.333333...`
- all-seven sum = `81`
- all-seven average = `11.571428...`
- raw PL = `0.60×17 + 0.25×15.333333... + 0.15×11.571428...`
- raw PL = `15.769047...`

Base PL:

**16**

### Calibration intent

This exact profile is deliberately:

- above Academy Mirai's current Base PL **9**;
- capable enough to read as an instructor conducting a controlled assessment rather than another Academy peer;
- below the stronger Academy-Kakashi final tutorial opposition ceiling represented by `academy_kakashi_origin_amt` PL18;
- Ninjutsu-forward because the Story requires credible sustained disguise/substitution presentation, without treating disguise as a PL bonus;
- supported by useful Taijutsu/Stamina and moderate Genjutsu-facing capability without inventing a specific Genjutsu technique;
- not a generic adult/instructor template;
- not a hidden famous canon character.

The Base Stats do **not** automatically grant:

- Transformation Jutsu as an executable Combat action;
- substitution/evasion;
- Stun;
- identity concealment against every sensor;
- automatic escape;
- any specific weapon;
- any formal Rank;
- any special-instructor qualification;
- any future unrestricted capability package.

Combat owns the exact action kit.

---

## 5. Current PL / Battle-entry boundary

For the exact Academy Mirai Origin assessment occurrence:

**Current Stats at ordinary Battle entry = Base Stats**

**Current PL at ordinary Battle entry = 16**

**Remaining Battle PL at ordinary Battle entry = 16**

No pre-Battle injury, depletion, permanent development, equipment Stat package, or route-local PL modifier is authored by Writing/CE/#337.

Therefore Combat must **not** create difficulty by silently changing this participant's Current PL from branch to branch.

Likewise, the instructor's controlled assessment role must **not** be implemented as a hidden Base/Current PL reduction from some invented larger number.

The correct boundary is:

> **assessment restraint belongs to Combat action choice, action numerics, legal result envelope and Story consequences — not runtime PL scaling**

If Battle damages this participant, that changes **Remaining Battle PL** for the Battle. It does not rewrite Base PL or persistent Current PL.

If future Story authority establishes factual injury/depletion before a later occurrence, that may create an explicit source-owned state. No such state is authorised here.

---

## 6. Academy Mirai feasibility boundary exposed to Combat

Current Academy Mirai authority:

- `academy_mirai`
- Base Stats: `8/8/9/5/6/7/8`
- Base PL: **9**

Current prepared direct-damage anchors include:

- `academy_mirai_twin_kunai` — Attack PL5;
- `academy_mirai_crossing_strike` — Attack PL6.

Current ordinary Stamina mitigation remains:

`max(1, floor(resolvedAttackPL × 100 / (100 + Effective Stamina)))`

Against instructor Stamina **15**:

- Attack PL5 -> `floor(500/115)` = **4** Battle-PL damage;
- Attack PL6 -> `floor(600/115)` = **5** Battle-PL damage.

Against entry capacity **16**, ordinary direct-damage lines are therefore numerically reachable without hidden scaling; for example:

- four PL5-equivalent packets -> `4+4+4+4 = 16`;
- four PL6-equivalent packets -> `5+5+5+5 = 20`;
- mixed legitimate packets can also cross the 16-capacity boundary.

This is only a PL feasibility boundary.

PL / Registry does **not** author:

- the instructor's Attack PL;
- instructor AI;
- action economy;
- guard/evasion/control;
- Battle objective;
- whether depletion to zero is the only valid assessment-success condition;
- lethal/nonlethal handling;
- win/loss Story meaning;
- post-Battle reveal timing.

Combat must prove the final encounter is credible and achievable under the exact authored package.

---

## 7. Identity / disguise / Knowledge lock

World Truth remains:

1. the real Traveller and the Academy instructor are different people;
2. the instructor switches places with the real Traveller during the covered-market separation;
3. the real Traveller remains safe;
4. the instructor is the apparent Traveller after the switch;
5. any authorised post-switch PL Battle is therefore against `academy_mirai_origin_instructor`;
6. presentation may continue to show **Traveller/Escort** until Story reveals the substitution;
7. internal Registry identity does not automatically grant Mirai/player Knowledge.

Do not create:

- `academy_mirai_origin_fake_escort` as a second person;
- a second PL ledger because disguise is active;
- a separate ownership/history record for the apparent Escort;
- Battle UI text that leaks **Academy Instructor** before the authored reveal;
- a replacement unrelated enemy.

Chronicle/Battle history should attach to the one stable participant ref while player-facing history remains bounded by what Mirai legitimately knows.

---

## 8. Production/cardinality boundary

`academy_mirai_origin_instructor` is Registry-addressable for Story/Battle source identity but is **not** a collectible production Character admission.

This closure does not change:

- the current live collectible Registry count;
- ownership;
- roster availability;
- assignment;
- deployment outside the exact Story occurrence;
- acquisition;
- asset authority.

No collectible card or permanent Battle portrait is authorised by this PL closure.

Presentation assets remain separately owned.

---

## 9. Comparison boundaries

Relevant exact-participant precedent:

- `academy_kakashi_origin_package_smuggler` — PL10;
- `academy_kakashi_origin_masked_interceptor` — PL14;
- `academy_kakashi_origin_amt` — PL18;
- `academy_kakashi` — PL15;
- `academy_mirai` — PL9.

These values are calibration references, not a ladder that all Academy encounters must copy.

The Mirai instructor's PL16 is authored for this exact controlled-assessment occurrence because it places the opponent clearly above Mirai without borrowing an unrelated generic adult/instructor profile or requiring runtime parity scaling.

Do not infer:

- Academy instructor = PL16 globally;
- all assessment opponents = player PL + N;
- instructor Rank from PL;
- instructor skill list from another PL16 Character.

---

## 10. Downstream Combat release

PL / Registry has closed the #337 dependency.

Combat must consume:

- stable participant/source ID: `academy_mirai_origin_instructor`;
- classification: exact Academy Mirai Origin controlled-assessment Character-side Story participant;
- Base Stats: `17/14/10/6/7/12/15`;
- Base PL: **16**;
- ordinary Battle-entry Current PL: **16**;
- formal Rank: **unknown / not authorised**;
- pre-reveal presentation remains **Traveller/Escort** where Story requires it;
- one stable identity across instructor/disguise/reveal.

Combat now owns:

- executable Battle config/package;
- instructor legal action kit;
- exact Attack PL/control/guard/setup numerics;
- AI/action economy;
- assessment-safe result envelope;
- Battle win/loss factual return;
- Story return contract;
- proof that Academy Mirai can legitimately resolve the encounter without hidden scaling.

Do not route Coding until Combat has closed that package.

---

## 11. Final lock

> **Academy Mirai Origin's disguised instructor is one exact Registry-addressable Story participant: `academy_mirai_origin_instructor`. The disguise changes presentation, not identity. This controlled-assessment profile has Base Stats `17/14/10/6/7/12/15`, Base PL16, and ordinary Battle-entry Current/Remaining PL16. Formal Rank is unknown and must not be inferred from the instructor role. The row is non-collectible and does not change live production cardinality. Future naming or a fuller unrestricted representation must link back to the same persistent person rather than rewriting this Academy assessment profile. Combat now owns the executable Battle package and viability proof.**
