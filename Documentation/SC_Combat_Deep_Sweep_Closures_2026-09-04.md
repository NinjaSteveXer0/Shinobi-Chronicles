# Shinobi Chronicles — Combat Deep-Sweep Closures

Date: 2026-09-04

This document records Combat-side adjudications recovered/closed during the pre-Alpha archaeological sweep. It is SC production authority, not a generic Chronicle Engine doctrine file.

## Chronicle Wraith

Writing authority resolves CHRONICLE WRAITH as the Phase-2 stage/representation of the persistent production identity `chronicle_reaper`.

Progression:

CHRONICLE REAPER → CHRONICLE WRAITH → [PHASE 3 TITLE TBD]

Do not register `chronicle_wraith` as a separate persistent Entity by inference. Phase 3 remains the same persistent identity. Stage/display title, runtime representation, persistent identity and cross-Renewal identity proof remain distinct.

Combat consumes the stage/representation authority supplied by Registry/Writing and must preserve historical attribution to `chronicle_reaper`.

## Kisogan — Causal Strata Analysis

`kisogan_causal_strata_analysis` requires 2–3 legitimately accessible committed historical references.

- 1 reference: reject before commit; no action opportunity consumed.
- 2 references: eligible when all other requirements pass.
- 3 references: eligible when all other requirements pass.
- 4+ references: reject before commit; no action opportunity consumed.

This does not widen access scope. Fidelity remains downstream of observer access.

## Legacy Battle-entry capacity modifiers

The legacy `calculateBattlePower()` encounter-type capacity scaling and random Battle-entry variation are retired from Alpha production semantics.

Retire:

- random `0.90 + Math.random() * 0.20` Battle-entry variation;
- `elite ×1.25` capacity scaling;
- `groupBoss ×8` capacity scaling;
- `guardBoss ×50` capacity scaling.

`standard ×1` is semantically a no-op and must not be treated as a separate balance modifier.

Battle-entry underlying Battle PL must be deterministic from current authoritative Battle/Effective-state policy. Stamina remains mitigation and must not add Battle capacity.

Boss/elite difficulty comes from authored identity, Stats/PL, actions, encounter rules and exact packages—not hidden global capacity multipliers.

## Triple Rashomon — Alpha scope

All six successful sequence names/history remain valid:

- `1>2>3` — Nine Hells Sanctuary
- `1>3>2` — Demon's Reversal
- `2>1>3` — Graveyard Seal
- `2>3>1` — Forsaken Threshold
- `3>1>2` — Maw of the Abandoned
- `3>2>1` — Ruined Gate Cataclysm

For Alpha, only `3>2>1 → Ruined Gate Cataclysm` is an executable payoff-ready Sequence Art.

The other five remain recognised/discoverable successful sequence outcomes and historical pattern identities, but do not receive invented Alpha action IDs/effects. They may be promoted to executable mechanics later through explicit authored contracts.

Preserve successful qualifying Gate order ≠ button order, pattern recognition ≠ Technique discovery, and Technique discovery ≠ execution/access.

## Breakout Kurama — forced-manifestation bridge

`breakout_kurama` remains a valid production identity and may be used where an encounter explicitly authors it as a hostile participant.

The generic coercive/hosted forced-manifestation bridge is deferred post-Alpha. Alpha does not automatically perform:

seal/control failure → hostile Breakout insertion into an already-running deployment.

Therefore Alpha requires no generic seventh-slot/full-enemy-deployment insertion policy. Do not invent a seventh slot, overwrite an occupied participant, create a hidden off-grid combatant, or silently replace another hostile.

If later Writing/encounter authority makes forced breakout mandatory in a playable Alpha encounter, this deferral must be explicitly reopened before shipping that encounter.

## Menma Origin — Test Subject deployment boundary

Origin: `origin_academy_menma_prologue`.

Writing/Registry supplies three dedicated opposition identities:

- `test_subject_brute`
- `test_subject_altered_shinobi`
- `test_subject_unstable`

The actual Menma tutorial Battle is one-on-one:

`academy_menma` vs `test_subject_altered_shinobi`.

`test_subject_brute` and `test_subject_unstable` remain legitimate members of the wider clearing occurrence / Anko opposition context, but they are not silently instantiated in Menma's Battle deployment. Preserve occurrence participation ≠ Battle-instance participation and enemy-card roster ≠ Battle deployment.

Anko remains occupied with the wider hostile group. Menma receives no automatic Nine-Tails Battle assistance merely because Nine-Tails is present in the Origin narrative/relationship context.

### `test_subject_altered_shinobi` — Alpha Combat package

Grounded former-shinobi fundamentals plus unstable experimental chakra/body provenance. No boss-scale Curse Mark package, no arbitrary Orochimaru high-tier inheritance, no Transformation, no Summon package, no regeneration package and no hidden stat bonus.

Standard legal generic actions: Basic Attack and Guard.

Authored actions:

1. `test_subject_altered_shinobi_shinobi_strike` — **Shinobi Strike**
   - primary discipline: Taijutsu
   - target: current enemy
   - one direct Battle-PL damage packet
   - Stamina mitigation: yes
   - no automatic Stun, displacement, guard break or Condition.

2. `test_subject_altered_shinobi_shuriken_cast` — **Shuriken Cast**
   - primary discipline: Bukijutsu
   - target: current enemy
   - visible thrown-projectile attack resolving as one mechanical damage packet
   - Stamina mitigation: yes
   - projectile count does not multiply packets
   - no player-Inventory consumption semantics are imported into the enemy package.

3. `test_subject_altered_shinobi_unstable_chakra_burst` — **Unstable Chakra Burst**
   - primary discipline: Ninjutsu
   - target: current enemy
   - one direct erratic chakra damage packet
   - Stamina mitigation: yes
   - trait/context: experimental chakra instability
   - no automatic Burning, Stun, Weakened, self-damage, transformation or boss mechanic.

PL owns the exact damage calibration for these three authored damaging actions after this semantic closure.

### `test_subject_brute` — Alpha Combat package

Failed physical augmentation expressed as crude close-pressure, not boss-scale mutation.

Standard legal generic actions: Basic Attack and Guard.

Authored actions:

1. `test_subject_brute_heavy_swing` — **Heavy Swing**
   - Taijutsu; current enemy; one direct damage packet; Stamina mitigation yes.
   - no automatic Stun, displacement or guard break.

2. `test_subject_brute_body_rush` — **Body Rush**
   - Taijutsu; current enemy; movement-dependent direct damage packet; Stamina mitigation yes.
   - successful damage does not itself establish Stun or displacement.

3. `test_subject_brute_crushing_clinch` — **Crushing Clinch**
   - physical-control action; current enemy.
   - applies source-owned `physical_restraint` on successful control resolution.
   - no direct damage is required by the semantic contract.
   - restraint lasts one affected action opportunity / uses the existing physical-restraint lifecycle and must not become generic Stun.

PL calibrates Heavy Swing, Body Rush and any resolver scalar genuinely required by Crushing Clinch.

### `test_subject_unstable` — Alpha Combat package

Severe experimental damage expressed as frightened/aggressive, erratic but still human opposition. Do not turn instability into random unsupported Conditions or a hidden Instability Stat.

Standard legal generic actions: Basic Attack and Guard.

Authored actions:

1. `test_subject_unstable_frantic_rush` — **Frantic Rush**
   - Taijutsu; current enemy; movement-dependent; one direct damage packet; Stamina mitigation yes.

2. `test_subject_unstable_chakra_spasm` — **Chakra Spasm**
   - Ninjutsu; current enemy; one direct unstable chakra damage packet; Stamina mitigation yes.
   - no automatic paralysis, Stun or self-damage.

3. `test_subject_unstable_panicked_burst` — **Panicked Burst**
   - Ninjutsu; current enemy; visibly erratic/multi-pulse presentation resolving as one mechanical damage packet; Stamina mitigation yes.
   - no automatic Burning, random status table or hidden mutation package.

PL owns exact damage calibration for these three authored damaging actions.

## Menma tutorial — Combat performance resolver

Writing requires **high / middle / low pressured Battle performance**, not a universal character-performance Stat.

This resolver is Origin/encounter-specific and must not become a generic Battle rating.

Only a completed Menma victory generates the Writing performance bucket. A defeat/withdrawal/non-completed tutorial attempt returns `performanceBucket:null` / `tutorialResult:not_completed` and must not route into Writing's successful post-Battle dialogue merely by pretending it was a low-performance win.

For a completed victory, Combat computes pressure from committed Battle history rather than final Remaining Battle PL alone:

`pressureRatio = grossFinalPLDamageReceivedByMenma / startingUnderlyingBattlePLMaximum`

Where `grossFinalPLDamageReceivedByMenma` is the sum of committed hostile `finalDamage` packets against Menma after defence/Stamina resolution and before later restoration can erase the current-state symptom. Recovery therefore cannot rewrite how much pressure actually occurred.

Also track:

`criticalExposure = true` if any committed post-resolution state places Menma at or below 25% of starting underlying Battle-PL maximum.

Buckets:

- **HIGH** — victory + `pressureRatio <= 0.30` + `criticalExposure === false`.
- **MIDDLE** — victory + `0.30 < pressureRatio <= 0.65` + `criticalExposure === false`.
- **LOW** — victory + `pressureRatio > 0.65` OR `criticalExposure === true`.

The structured Combat read should expose at minimum:

- `performanceBucket`
- `tutorialResult`
- `startingUnderlyingBattlePLMaximum`
- `grossFinalPLDamageReceived`
- `pressureRatio`
- `criticalExposure`
- committed victory/completion occurrence ID
- supporting Battle occurrence IDs.

This read is a contextual answer to "how pressured was Menma in this specific tutorial fight?" It is not universal performance truth. Victory remains distinct from Anko's judgement, and protective performance remains a separate evidence dimension.

## Menma tutorial — observed Kinjutsu evidence

Overall Battle performance and observed Kinjutsu use are independent reads.

A qualifying Anko observation requires an actual committed Battle occurrence in which:

- Menma is the action actor;
- the exact action is authored as Kinjutsu or explicitly `kinjutsu_observation_qualifying`;
- the occurrence reaches committed/resolved history (a legitimate resolved miss/failure may still be observed; an invalid/uncommitted selection may not);
- Anko has legitimate observer access to that occurrence from the authored clearing context;
- the action has an overt/perceivable signature within that observer scope, and no authored concealment/occlusion/observer blocker invalidates observation.

Anko's presence elsewhere in the clearing does not grant omniscience: observer scope is bounded. However, Writing has authored her as physically present and occupied nearby, so Combat may treat her as a peripheral eligible observer of overt Menma actions that remain legitimately perceptible while she fights the wider group.

The observation record should retain:

- Battle occurrence ID
- observer identity/reference supplied by the scene/Registry
- actor `academy_menma`
- action ID
- discipline / qualifying flag
- resolution
- observer-access basis / scene scope
- source/provenance refs.

Technique ownership, loadout presence, availability or access alone never establishes observation.

## Arena Promotion — Combat-side contract

Combat does not own Promotion eligibility or Promotion mutation.

Combat exposes a structured Arena attempt result/evidence package to Rank/Registry/Progression, including completion/result state and the relevant committed Battle evidence. Arena availability does not force entry, and victory does not automatically promote the player unless Rank/Progression explicitly defines that consequence.

No aggregate Team PL shortcut is authorised.

## Special Jonin opposition catalogue

The approved opposition-role catalogue is not automatically a set of Alpha Combat production packages or Registry identities.

Exact enemy action packages are deferred unless Rank/Registry marks a particular opposition encounter as required for Alpha. Combat will then author that encounter's actions/targeting/problem-space and evidence semantics without making enemy defeat equal qualification.

One encounter may create qualification evidence opportunities; it does not deterministically grant a Special Jonin specialisation.
