# Academy Obito — Final Journey Timing and Runtime Replacement Reconciliation

**Date:** 2026-09-23  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CROSS-SYSTEM RECONCILIATION — READY FOR CODING**  
**Production Origin:** `academy_obito`  
**Sequence:** `origin_academy_obito_journey_to_training`  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

---

## 1. Purpose

This document consumes the Stephen-approved final Academy Obito Writing authority and closes the last cross-owner semantic seam before runtime replacement:

> **deterministic route-relative journey time -> one factual formal-training entitlement**

It also classifies the current Obito runtime change as **REPLACE**, not patch.

This reconciliation does not reopen:

- final Story prose / choices;
- the five independent World source occurrences;
- existing four Progression development packages;
- PL calibration;
- Origin completion architecture;
- Academy Obito identity;
- no-Sharingan / no-PL-Battle boundaries.

---

## 2. Current authority consumed

Writing FINAL:

`Documentation/Story/Academy_Obito_Origin_Final_Cohesive_Story_Authority_2026-09-23.md`

authority commit:

`328578e7d5f238422627b338b21eb091709a2630`

Voice/personality anchor:

`Documentation/Story/Academy_Obito_Character_Voice_and_Personality_Anchor_2026-09-23.md`

commit:

`3a315b815733fcc40d4552828a43a364efc4603e`

Existing World source bindings:

`Documentation/World/Academy Origin and Whisper Woods World Source Instance Bindings.md`

Existing Progression / PL package authority:

`Documentation/PL/Academy Obito Formal Training Development Calibration.md`

Current superseded runtime owner:

`runtime/alpha-origin-scenes-32900-c.js`

Current live main at reconciliation start:

`2393c2cfd991cdc9ea61437e91dd450096f1e1be`

---

## 3. Final Story shape

The current Academy Obito Origin is:

```text
late for training
-> furniture HELP | CONTINUE
-> vegetables HELP | CONTINUE
-> Academy equipment HELP | CONTINUE
-> overturned delivery HELP | CONTINUE
-> runaway cart HELP | CONTINUE
-> factual arrival / entitlement
-> only remaining training blocks
-> walk home
-> home reflection
-> one of four independent interpretations
-> shared Origin completion / Active Konoha
```

The five diversion occurrences remain independent.

No helper-count occurrence exists.

No morality score exists.

No kindness/selfishness route exists.

No lateness Trait exists.

The final reflection remains independent self-interpretation:

```text
behaviour != interpretation
```

---

# 4. Journey clock — route-relative authored time

## 4.1 Clock model

The Origin uses a **route-relative authored journey clock**.

The direct-travel path defines:

```text
directArrivalOffsetMinutes = 0
```

This is not a literal claim that Obito's trip takes zero minutes.

It means all fixed travel time shared by every route is absorbed into the baseline. Only authored **variable diversion time** is added.

The runtime must never use:

- real wall-clock time;
- player reading speed;
- browser frame time;
- animation duration;
- number of clicks;
- helpCount;
- morality;
- device performance.

Only committed Story/World facts advance the journey clock.

Canonical formula:

```text
arrivalDelayMinutes =
  furnitureDelay
+ vegetablesDelay
+ equipmentDelay
+ deliveryDelay
+ runawayCartDelay
+ any future explicitly-authored Origin-local journey delay
```

For the current final Story, only the five listed diversion occurrences contribute variable time.

---

## 4.2 Exact current diversion delays

Each binary HELP route has one fixed authored route-time cost.

CONTINUE contributes zero additional diversion time.

| Diversion | sourceOccurrenceId | HELP delay | CONTINUE delay |
|---|---|---:|---:|
| furniture | `occ_origin_obito_furniture_assistance_resolution` | **7 min** | **0 min** |
| scattered vegetables | `occ_origin_obito_scattered_vegetables_resolution` | **5 min** | **0 min** |
| missing Academy equipment | `occ_origin_obito_lost_academy_equipment_resolution` | **8 min** | **0 min** |
| overturned delivery | `occ_origin_obito_overturned_delivery_resolution` | **9 min** | **0 min** |
| runaway cart | `occ_origin_obito_runaway_cart_resolution` | **6 min** | **0 min** |

These values are **Story-time facts**, not reward values and not moral weights.

They reflect the authored amount of additional journey time consumed by the exact HELP scene:

- furniture requires physically manoeuvring the wedged wardrobe through;
- vegetables requires collecting the scattered stock;
- equipment requires an actual route search and recovery;
- delivery requires righting the cart and restoring the load;
- runaway cart requires the emergency intercept and immediate recovery before Obito resumes the route.

The numbers exist only to make the already-authorised causal opportunity cost deterministic.

---

# 5. Formal-training arrival windows

Existing training-block order remains:

1. Stamina
2. Bukijutsu
3. Ninjutsu / Academy-scale Fire
4. Taijutsu

The four existing entitlement packages remain unchanged.

Route-relative arrival is resolved as:

| total added journey delay | factual entitlement | training still available |
|---:|---|---|
| **0–5 min** | `FULL` | Stamina + Bukijutsu + Ninjutsu + Taijutsu |
| **6–14 min** | `SUBSTANTIAL` | Bukijutsu + Ninjutsu + Taijutsu |
| **15–24 min** | `REDUCED` | Ninjutsu + Taijutsu |
| **25–35 min** | `MINIMAL` | Taijutsu |
| **36+ min** | no formal-training entitlement | none |

Boundary rule is inclusive at the upper value shown.

Therefore:

- 0-help direct travel = **FULL**;
- all-five HELP = 35 minutes = **MINIMAL**;
- the current final 32 binary routes never fabricate an empty/no-training result;
- no-entitlement remains a valid semantic state only if some separately authorised journey fact in the future adds enough real delay to exceed the current Taijutsu closure boundary.

This is not consolation training.

The current all-five-help route still reaches the factual Taijutsu closing block because Stephen explicitly locked that route to MINIMAL.

---

# 6. Proof this is not helpCount

The runtime may derive total elapsed delay from the five exact occurrence-time facts.

It must not store or consume a semantic `helpCount` to decide entitlement.

Same number of HELP choices can produce different arrival bands.

Examples:

```text
VEGETABLES only
5 min
-> FULL
```

```text
FURNITURE only
7 min
-> SUBSTANTIAL
```

```text
FURNITURE + VEGETABLES
12 min
-> SUBSTANTIAL
```

```text
FURNITURE + EQUIPMENT
15 min
-> REDUCED
```

Both last examples contain two HELP choices but produce different entitlements.

Therefore:

```text
number of people helped != training entitlement
```

The causal source is elapsed authored journey time.

---

# 7. Exhaustive current 32-route entitlement matrix

Legend:

- F = furniture HELP
- V = vegetables HELP
- E = equipment HELP
- D = delivery HELP
- C = runaway cart HELP

No listed letter means CONTINUE at that occurrence.

## 0 HELP

| Route | Delay | Entitlement |
|---|---:|---|
| — | 0 | FULL |

## 1 HELP

| Route | Delay | Entitlement |
|---|---:|---|
| F | 7 | SUBSTANTIAL |
| V | 5 | FULL |
| E | 8 | SUBSTANTIAL |
| D | 9 | SUBSTANTIAL |
| C | 6 | SUBSTANTIAL |

## 2 HELP

| Route | Delay | Entitlement |
|---|---:|---|
| F+V | 12 | SUBSTANTIAL |
| F+E | 15 | REDUCED |
| F+D | 16 | REDUCED |
| F+C | 13 | SUBSTANTIAL |
| V+E | 13 | SUBSTANTIAL |
| V+D | 14 | SUBSTANTIAL |
| V+C | 11 | SUBSTANTIAL |
| E+D | 17 | REDUCED |
| E+C | 14 | SUBSTANTIAL |
| D+C | 15 | REDUCED |

## 3 HELP

| Route | Delay | Entitlement |
|---|---:|---|
| F+V+E | 20 | REDUCED |
| F+V+D | 21 | REDUCED |
| F+V+C | 18 | REDUCED |
| F+E+D | 24 | REDUCED |
| F+E+C | 21 | REDUCED |
| F+D+C | 22 | REDUCED |
| V+E+D | 22 | REDUCED |
| V+E+C | 19 | REDUCED |
| V+D+C | 20 | REDUCED |
| E+D+C | 23 | REDUCED |

## 4 HELP

| Route | Delay | Entitlement |
|---|---:|---|
| V+E+D+C | 28 | MINIMAL |
| F+E+D+C | 30 | MINIMAL |
| F+V+D+C | 27 | MINIMAL |
| F+V+E+C | 26 | MINIMAL |
| F+V+E+D | 29 | MINIMAL |

## 5 HELP

| Route | Delay | Entitlement |
|---|---:|---|
| F+V+E+D+C | 35 | MINIMAL |

This matrix is a QA oracle, not a new Story branch catalogue.

---

# 8. Source occurrence / persistence contract

The five source occurrences remain exactly:

1. `occ_origin_obito_furniture_assistance_resolution`
2. `occ_origin_obito_scattered_vegetables_resolution`
3. `occ_origin_obito_lost_academy_equipment_resolution`
4. `occ_origin_obito_overturned_delivery_resolution`
5. `occ_origin_obito_runaway_cart_resolution`

The formal entitlement source remains:

`occ_origin_obito_formal_training_entitlement_resolution`

Each diversion occurrence should preserve enough factual output to reconstruct the timing truth, conceptually including:

```text
sourceOccurrenceId
selectedIntent = HELP | CONTINUE
journeyDelayMinutes
obitoCausalContributionEstablished
beneficiaryRefs
worldOutcome
committed
```

Exact schema remains Coding-owned.

The entitlement occurrence should preserve conceptually:

```text
sourceOccurrenceId
arrivalDelayMinutes
timingAuthorityVersion
formalTrainingEntitlement
eligibleTrainingBlocks[]
committed
```

Do not mint a helper-count aggregate source occurrence.

A derived `arrivalDelayMinutes` inside the formal entitlement record is allowed because it is a factual projection from the exact five source occurrences, not a gameplay/morality score.

---

# 9. Commit / idempotence rules

Each diversion commits once.

The chosen delay value commits with that source occurrence.

Save/load, refresh, retry and re-entry must read the existing committed time fact.

They must not:

- reroll;
- recalculate from UI text;
- double-add the delay;
- infer from whether a scene animation completed;
- infer from current screen;
- infer from number of HELP flags without reading the occurrence records.

The formal entitlement commits exactly once after all five route decisions have resolved.

If current saves contain the old three-choice Obito state:

- do not silently reinterpret old `material / brief / none` records as new final binary history;
- use a bounded Alpha migration only when there is a deterministic mapping to the actual committed old choice;
- otherwise fail closed / restart that pre-final Obito Origin rather than manufacture current-final history.

Because the final Story replaces the old choice ontology, compatibility must not invent which new choice Stephen/player would have made.

---

# 10. Progression package projection

The timing resolver selects exactly one existing package.

It does not author Stat numbers.

Existing packages remain:

### FULL
`academy_obito_formal_training_full_stats`

- Nin +1
- Tai +1
- Buki +1
- Stamina +1

### SUBSTANTIAL
`academy_obito_formal_training_substantial_stats`

- Nin +1
- Tai +1
- Buki +1

### REDUCED
`academy_obito_formal_training_reduced_stats`

- Nin +1
- Tai +1

### MINIMAL
`academy_obito_formal_training_minimal_stats`

- Tai +1

Exactly one may apply for the one formal-training occurrence.

Preserve:

```text
arrival timing != PL modifier
training entitlement != direct PL grant
community help != formal Academy training
```

---

# 11. Runtime replacement classification

The current Obito half of:

`runtime/alpha-origin-scenes-32900-c.js`

is **REPLACED**.

Superseded production behavior includes:

- three-choice diversion menus;
- `material / brief / none` choice ontology;
- partial-help routes;
- delayed-route `timing_pending` dead end;
- all-continue-only entitlement implementation;
- old reflection IDs/text:
  - `hokage_still`;
  - `faster_next`;
  - `people_mattered`;
  - `prove_it`;
- short generic terminal ending.

Do not implement the new Story as an overlay beside those paths.

Required replacement sequence:

1. inventory old Obito readers/writers/choice IDs;
2. bind final five binary decision families;
3. commit exact per-occurrence route-time facts;
4. resolve one entitlement from the timing table above;
5. play only entitled training blocks in locked order;
6. consume current walk-home / home-reflection content;
7. commit one of the four final interpretations as self-interpretation/history only;
8. transition through existing shared Origin -> Active Konoha completion;
9. de-load / retire old Obito choice and timing owners;
10. prove old choice IDs cannot control production behavior.

---

# 12. Final four interpretation boundary

The four final player interpretations remain exactly the current Writing authority:

1. `I'm not going to stop helping people.`
2. `I need to take training more seriously.`
3. `I need to get better at both.`
4. `Maybe I'm looking at this wrong. I need to figure out what matters most to me.`

They are not inferred from journey behavior.

No mapping such as:

```text
helped 4+ -> helping reflection
helped 0 -> training reflection
```

is permitted.

The selected interpretation is its own committed self-interpretation/history fact.

Ending 4 does not itself mean:

- anti-Konoha;
- anti-Hokage;
- Madara;
- Kirigakure;
- Mizukage's Aide;
- identity mutation.

---

# 13. Presentation / Scene Board boundary

Use the current shared Scene Board / onClick performance architecture.

Preserve:

- semantic Story beat != every line/cue;
- stage stays mounted through performance cues where appropriate;
- ordinary click/keyboard advances performance;
- meaningful HELP / CONTINUE choices require deliberate choice controls;
- no click-through into a newly revealed choice;
- actor movement/presentation does not commit World truth;
- transition animation does not own timing;
- authored route time comes from committed occurrence facts only.

No PL Battle is introduced.

No Sharingan is introduced.

No bespoke Obito-only Story renderer is authorised.

---

# 14. Required runtime / QA proof

At minimum prove:

1. five and only five diversion decisions;
2. each is binary HELP / CONTINUE under current Writing labels;
3. all five sourceOccurrenceIds remain distinct;
4. CONTINUE commits 0 added diversion minutes;
5. each HELP commits its exact authored minutes once;
6. all 32 route combinations match §7;
7. 0-help = FULL;
8. 5-help = MINIMAL;
9. same HELP count can yield different entitlement;
10. no helper-count field is semantic authority;
11. delayed routes no longer dead-end at timing pending;
12. exactly one formal entitlement occurrence commits;
13. exactly one development package applies;
14. training blocks shown match entitlement:
    - FULL 4;
    - SUBSTANTIAL last 3;
    - REDUCED last 2;
    - MINIMAL Taijutsu only;
15. no current 32-route path fabricates no-entitlement;
16. save/load before each decision preserves prior timing facts;
17. save/load after arrival does not reroll entitlement;
18. retry cannot double-add delay;
19. old 3-choice IDs are absent from active production behavior;
20. old reflection IDs are absent from active production behavior;
21. final reflection remains independent from route behavior;
22. no Sharingan;
23. no PL Battle;
24. exact final Story/performance content is consumed from current Writing authority;
25. Origin completes through shared `YOUR CHRONICLE BEGINS` -> Active Konoha continuity;
26. exactly-two Academy teammate onboarding remains compatible with #105;
27. browser runtime error gate remains clean;
28. installed-browser acceptance is separate from automated GREEN.

---

# 15. Golden boundary

Status after this document:

- Obito Story design = CLOSED;
- player-facing Writing = FINAL;
- timing reconciliation = CLOSED;
- Progression package values = ALREADY CLOSED / unchanged;
- runtime replacement = NOT YET IMPLEMENTED;
- runtime validated = NO;
- installed-browser current-Story validation = NO;
- Golden = NOT CLAIMED.

A source/headless test pass must not be promoted to Browser Golden.

Stephen should receive one coherent installed-browser Obito candidate after Coding replacement and regression completion, not a partial route demo.

---

# 16. Final lock

> **Academy Obito's current Origin uses five independent binary HELP / CONTINUE occurrences. Each HELP carries an exact authored route-time cost, CONTINUE carries zero added diversion time, and the sum of committed occurrence-time facts determines one formal-training entitlement. This is causal elapsed Story time, not helpCount, morality or player wall-clock time. Direct travel resolves FULL; all five HELP resolves MINIMAL. The superseded three-choice/timing-pending/reflection runtime must be replaced and retired, not patched beside the final Story.**
