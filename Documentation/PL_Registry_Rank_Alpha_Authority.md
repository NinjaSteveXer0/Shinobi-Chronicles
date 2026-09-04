# Shinobi Chronicles — PL / Registry / Rank Alpha Authority

**Status:** Current production authority checkpoint  
**Date:** 2026-09-04

This document records current PL / Character Registry / Rank / Acquisition-boundary authority for Alpha reconciliation. It does not replace Combat, Writing, Character Creation, Codex/CE, UI, or Coding ownership.

---

## 1. Alpha production Registry checkpoint

The current collectible/production Registry gate remains:

- **85 Character identities**
- **17 Entity identities**
- **102 total production identities**

The earlier **97 / 97** factory remains a closed historical milestone. The only additions that changed that gate from 97 to 102 are:

- `academy_kurenai`
- `academy_iwabee`
- `academy_metal_lee`
- `academy_kakashi`
- `academy_obito`

Generic enemies, qualification definitions, Escort challenge enemies, Menma test-subject opposition identities, and Chronicle Reaper stage labels do not silently increment this 102 collectible Character/Entity gate.

Deleted identities remain deleted:

- `divided_vessel`
- generic `fallen_hokage`

Surviving alternate-route boss identity:

- `fallen_hokage_sasuke`

`breakout_kurama` remains one stable Entity identity; removal from a Summon-card category does not delete the Entity.

---

## 2. Registry identity and presentation

Preserve:

**Registry identity ≠ represented person/source name ≠ display name ≠ collectible-card filename ≠ UI portrait filename.**

`academy_izuno` is the stable machine identity representing **Wasabi Izuno**. The absence of an `academy_wasabi` ID is not evidence that Wasabi should be removed or replaced.

Card-facing display remains separately authored. Known Academy examples:

- `academy_iwabee` → **IWABE**
- `academy_metal_lee` → **METAL**

The current repository has a known card-file mapping mismatch for Iwabee/Metal. Coding may explicitly map the physical files or migrate filenames, but must not change Registry identity to solve an asset-path problem.

### Battle portrait authority

Required contract:

`Registry representation ID → approved collectibleCard + approved uiPortrait`

Filename equality is not required. Physical file presence, directory order, filename similarity, or collectible-card art must not select the Battle Portrait automatically. Coding must not silently crop a collectible card into a permanent portrait asset.

Exact 102-wide `uiPortrait` mappings remain pending an approved Character Creation / Assets portrait manifest; Registry will not fabricate mappings from filenames.

---

## 3. PL authority

Canonical seven-Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Formula v1.0:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

Preserve:

- Base PL = exact canonical representation baseline.
- Current PL = permanent earned development.
- Effective PL = legitimate runtime Stat projection.
- Battle PL = encounter-runtime operational capacity, not health.
- Rank, appointment, department, rarity, reputation, qualification, or title grants no direct PL.
- Resolver-local effects must not become hidden Stats merely because they are numeric.
- Entity PL never transfers wholesale to an associated Character.

No current handoff authorises recalibration of the locked 102 production identities.

### Legacy Battle-entry variation — RETIRED

Combat has retired the following from production Battle entry:

- random ±10% Remaining-Battle-PL capacity variation;
- elite ×1.25;
- `groupBoss` ×8;
- `guardBoss` ×50.

These are no longer production Battle-entry authority. No Base, Current, or Effective PL/Stat recalibration follows their retirement.

**Stamina remains mitigation, not Battle-capacity scaling.**

Any stale runtime implementation of those multipliers is compatibility/dead-code cleanup for Coding, not PL authority.

### Legacy world-region PL fossils

Old `worldRegions` fields such as `recommendedPL`, `enemyMin`, `enemyMax`, and old `getLocationThreat()` values are **not current PL authority**. Do not recalibrate them in place. Coding must either retire the dead compatibility path or quarantine it from current Knowledge-sensitive hotspot presentation and modern PL comparisons.

### Wasabi route / Intercept resolver boundary

Wasabi's Intercept route is tactical inference/prediction. It does **not** create or imply a hidden Speed/Agility Stat, hidden turn-order Stat, or direct PL modifier.

---

## 4. Exact access / embodiment / lineage

Preserve:

**access ≠ active state ≠ embodied representation ≠ subordinate Technique/action access**

**lineage ≠ runtime transformation**

Higher-stage representations do not inherit lower-stage runtime packages merely because they share progression lineage. Historical formation provenance does not itself authorise current runtime projection. Parent Expression access does not grant every child Technique.

Embodiment metadata must never manufacture access authority.

---

## 5. Source-only causal identities

`kikaichu_colony` remains exactly:

**source-only bound collective**

It is not:

- a production Entity Registry record;
- a Summon;
- a Companion ontology;
- an independent Battle participant;
- a turn owner;
- a PL donor;
- a hidden Shino Stat package.

Any runtime wording such as `source_only_bound_collective_companion` is implementation taxonomy drift, not a second canonical classification.

Preserve:

**source addressability ≠ Entity registration**

**causal identity ≠ collectible identity**

**bound source ≠ independent Battle participant**

---

## 6. Academy / Chronicle Origin authority

Exactly ten Chronicle Origin choices are production-authorised:

1. `academy_hinata`
2. `academy_izuno`
3. `academy_kushina`
4. `academy_menma`
5. `academy_mirai`
6. `academy_kurenai`
7. `academy_iwabee`
8. `academy_metal_lee`
9. `academy_kakashi`
10. `academy_obito`

Preserve:

**Academy stage ≠ generation ≠ cohort ≠ canonical date**

**source-era provenance ≠ current Chronicle history**

Initial Academy Team Formation requires:

`1 Origin protagonist + 2 distinct eligible Academy teammates`

before ordinary Academy free play.

### Acquisition/Rank column for the Ten-Origin matrix

For all ten exact Origin IDs, the Acquisition/Rank architecture is **LOCKED** independently of Writing completeness:

- Origin selection acquires/sets the exact Origin protagonist only;
- it does not auto-acquire the other nine Academy representations;
- the protagonist begins the Active Konoha progression at formal rank Academy unless exact upstream authority later says otherwise;
- after the exact Origin prologue reaches the committed Active-Konoha entry boundary, Academy Team Formation requires two distinct eligible Academy teammates;
- ordinary Academy free play remains gated until that three-person Academy team is complete;
- per-Origin Writing lock, Coding integration, UI presentation, continuity verification, and runtime testing must be reported independently and cannot be inferred from this Acquisition/Rank lock.

Preserve:

**skeleton lock ≠ authored-content completion**

**shared Origin acquisition architecture ≠ shared Origin sequence**

---

## 7. Alpha Arena Promotion contract — Rank authority

The first Alpha promotion lifecycle is Academy → Genin. The same architecture may support later promotions, but later assessments own their own content/requirements.

### Availability

Promotion Arena availability means the player is allowed to inspect/choose the assessment. It does **not** force entry.

For the first Alpha promotion, minimum attempt eligibility is:

- the exact owned candidate currently has formal rank **Academy**;
- the Active Konoha continuity boundary has been entered;
- mandatory Academy Team Formation is complete;
- the authored Academy→Genin promotion assessment is currently available;
- no unresolved promotion attempt for that candidate is already committed.

Do not gate attempt eligibility through aggregate Team PL, Average PL, a hidden UI checklist, or a UI-calculated readiness score.

### Entry

Entry is an explicit voluntary player action.

### Resolution

Combat reports the Battle result and relevant Battle evidence. The Rank/Progression assessment authority decides the Promotion result from the authored assessment contract.

Preserve:

**Battle victory ≠ automatic Promotion**

**Battle defeat ≠ erased attempt**

**PL ≠ Promotion authority**

### Success

A successful assessment must atomically:

- persist the committed Promotion occurrence/evidence;
- mutate the exact owned character's formal rank from Academy to Genin;
- unlock the separate Genin Roster Transition.

Promotion itself grants no direct PL/Stat increase and does not automatically replace the Registry variant.

### Failure

Failure:

- does not change formal rank;
- does not rewrite Base/Current PL or Stats;
- does not delete ownership/team history;
- preserves the failed attempt and legitimate evidence/Knowledge gained.

### Re-attempt

Re-attempt is permitted after the previous attempt has resolved and the authored assessment is available again. There is no universal cooldown unless a future exact assessment explicitly authors one.

Writing still owns the first actual Academy→Genin assessment fiction/content and any hidden/contextual criteria beyond this minimal Rank lifecycle.

---

## 8. Genin Roster Transition — Acquisition + Rank contract

Successful Genin promotion opens a **separate** `geninRosterTransition`.

To complete the Alpha Genin Roster Transition, the player must:

- keep both current Academy teammates, replace one, or replace both through legitimate candidate/acquisition authority; and
- select/assign **one eligible Jōnin leader**.

Jōnin leader selection is therefore **mandatory for transition completion**, but it is not what causes the already-earned Genin promotion.

A leader candidate must be explicitly authorised as eligible and normally hold formal rank **Jōnin**. Do not infer a universal all-Jōnin pool. Any future exception for another rank requires explicit authority.

### Candidate authority

CE/history supplies the causal/history context used to determine who may be available. Acquisition owns the candidate/acquisition transaction and team mutation. Rank owns the formal-rank/leader-role boundary.

A candidate list is therefore an authoritative snapshot, not a static global roster.

Candidate availability may legitimately depend on:

- actions and outcomes in the current Chronicle;
- relationships/Shared History where authorised;
- observer/world Knowledge where relevant to discoverability;
- timing, including how quickly or slowly the player promoted;
- exact acquisition/recruitment prerequisites;
- current world state.

Fast promotion is not inherently superior to slow promotion, and slow promotion is not inherently superior to fast promotion.

### Retaining an existing teammate

Keeping an existing Academy teammate in the Genin team:

- does not create a new acquisition record;
- does not replace the Registry representation;
- preserves the same owned-character continuity and Shared History;
- requires that the teammate is still legitimately eligible for the Genin team role.

### Replacing a teammate

Replacing one or both teammates:

- does not delete or un-own the outgoing teammate;
- does not erase prior team/Shared History;
- requires the selected replacement to be explicitly eligible;
- if the replacement is not already legitimately acquired/owned under the relevant character-system contract, selection must not silently manufacture ownership; the required acquisition/recruitment transaction must resolve first.

An acquisition record created through that route remains historical/ownership truth even if the player later changes the final team assignment.

### Jōnin leader assignment

Preserve:

**Academy teammate position ≠ Genin teammate position ≠ Jōnin leader role**

**Jōnin leader eligibility ≠ automatic recruitment ≠ automatic ownership ≠ automatic deployment**

**Genin promotion ≠ first-team creation**

A Jōnin leader cannot be assigned merely because the corresponding Registry identity exists. The candidate must have explicit leader eligibility in the current Chronicle and satisfy whatever acquisition/recruitment/access state the exact route requires.

Leadership assignment is a team/progression role, not automatically Battle slot 1 or My Clan queue position.

### Commit boundary

The Genin Roster Transition completes only when the final teammate composition and Jōnin leader assignment are all valid. Acquisition/recruitment occurrences that happened while preparing the transition remain committed historical facts; the final team-assignment commit must not erase them.

---

## 9. Representation continuity across promotion

Alpha rule:

**formal rank progression does not automatically replace or evolve the Registry variant.**

An owned `academy_*` representation may become formally Genin through persistent progression while remaining represented by that same Registry variant. A separately authored `genin_*` collectible is not automatically substituted merely because the same fictional person progressed.

Preserve:

**Academy representation ≠ persistent Chronicle participant ≠ current formal rank**

**new representation ≠ new historical person**

**leaving the active team ≠ deletion of prior Shared History**

**representation progression ≠ replay/backfill of events that never occurred**

For current Alpha, the stable `ownedCharacterId` plus formal-rank progression record supplies continuity because no automatic representation swap occurs. If a future explicit representation-evolution/switch system is authored, it must introduce an explicit stable person/participant continuity reference before switching representations; field naming remains Coding-owned.

---

## 10. Menma Origin test-subject enemy identities — direct opponent CLOSED

Writing and Character Creation have now closed the Menma tutorial hostile identity.

The exact direct one-on-one tutorial opponent in:

`origin_academy_menma_prologue`

is:

**TEST SUBJECT — ALTERED SHINOBI**

Authoritative stable Enemy/Opposition Registry identity:

`test_subject_altered_shinobi`

This identity already exists under Registry authority and must be reused. Coding and Combat must not mint an alternate ID from prose.

The wider clearing may also contain the already-authorised opposition identities:

- `test_subject_brute` — **Test Subject — Brute**
- `test_subject_unstable` — **Test Subject — Unstable**

These three are dedicated **Enemy/Opposition Registry identities**, not collectible Character/Entity identities. They do **not** alter the 85 + 17 = 102 collectible production gate.

Narrative boundary:

- victims of experimentation who are currently dangerous;
- grounded Orochimaru-linked escaped/discarded subjects;
- not generic Bandits/Rogue Genin substitutes;
- not disposable evil mutants;
- not boss-scale/high-tier Curse Mark enemies.

Writing owns exact encounter composition/dialogue beyond the locked direct opponent. Combat must now close the exact Battle package for `test_subject_altered_shinobi`; PL calibrates it only after Combat semantics/role are closed.

---

## 11. Chronicle Reaper / Chronicle Wraith — resolved

Writing and Character Creation agree on the representation classification.

Authoritative progression:

**CHRONICLE REAPER → CHRONICLE WRAITH → [PHASE 3 TITLE TBD]**

All three stages belong to the same persistent production identity:

`chronicle_reaper`

`CHRONICLE WRAITH` is the **Phase-2 representation/stage title** of `chronicle_reaper`.

Do **not** register a separate persistent `chronicle_wraith` Entity/Character.

`chronicle_reaper_phase3` remains only a working representation/asset label until Writing locks the Phase-3 display title.

Preserve:

**production identity ≠ display/stage title ≠ representation ≠ persistent cross-Renewal identity proof**

**stage representation ≠ new Entity by default**

Earlier archaeology treating Chronicle Wraith only as a possible narrative designation is superseded for current phase terminology.

This representation resolution does not itself add `chronicle_reaper` to the current 102 Alpha collectible Character/Entity gate and does not trigger PL recalibration.

---

## 12. Kisōgan explicit access + Acquisition authority

Official Ability/Expression:

`kisogan_expression`

Registry access capability:

`kisogan_access`

Embodiment of `kisogan_expression` does **not** grant `kisogan_access` and does not grant subordinate actions.

### Phase 1 — Chronicle Reaper

No Kisōgan access is inferred for Phase 1 merely from persistent identity. Current authored progression introduces the eye in Phase 2. Any Phase-1 access would require new explicit Writing/Combat authority.

### Phase 2 — CHRONICLE WRAITH

The dedicated Phase-2 representation must explicitly author:

- `kisogan_access`;
- embodied `kisogan_expression` / authored starts-active state;
- `kisogan_historical_trace_read` access;
- `kisogan_causal_strata_analysis` access;
- `kisogan_contradiction_analysis` access.

It does **not** receive `kisogan_historical_lattice_analysis` by Phase-2 inference.

### Phase 3

The dedicated Phase-3 representation must explicitly author:

- `kisogan_access`;
- embodied `kisogan_expression` / authored starts-active state;
- all three Phase-2 Kisōgan actions;
- `kisogan_historical_lattice_analysis`.

Kisōgan access/actions do not grant Reaping, derivative construction, Reaper historical retention, or cross-Renewal identity.

### Player acquisition

No player Kisōgan acquisition route is final yet.

Any future acquisition transaction must explicitly author:

- `kisogan_access`;
- whichever individual Kisōgan analysis-action access IDs that exact route grants;
- any separate activation/embodiment occurrence if the route is intended to make the Expression active/embodied immediately.

Acquisition of access does not itself mean active state or embodiment. Embodiment does not back-fill missing access.

A limited route may legitimately grant only a subset of the Kisōgan analysis palette. No route may infer all subordinate actions merely from `kisogan_access` unless that exact route explicitly lists them.

Full Kisōgan analysis access still grants neither Reaping nor derivative construction by itself.

### PL lock

Kisōgan remains +0 to all seven Stats, +0 direct PL, and its four analysis actions remain 0 Attack PL.

### Causal Strata cardinality

`kisogan_causal_strata_analysis` requires **2–3** legitimately accessible committed references. One reference and four-or-more references are invalid targets and must fail without consuming an action opportunity.

---

## 13. Breakout Kurama manifestation boundary

Stable Entity identity:

`breakout_kurama`

A qualifying CE breakout occurrence may authorise the already-existing `breakout_kurama` identity to become independently present as a **hostile forced manifestation**.

This does not create a second Kurama ontology or another Registry Entity.

Preserve:

**stable Entity identity ≠ manifestation mode ≠ expression state ≠ historical occurrence identity**

**hosted/bound presence ≠ independent encounter participation**

**forced manifestation ≠ ordinary Summon preparation/attachment**

**manifestation occurrence ≠ ownership**

**Entity PL ≠ host PL**

The breakout transition does not grant Summon ownership, preparation, attachment, control, cooperation, or access. CE owns the causal breakout occurrence/history. Registry owns the identity/mode linkage. Combat owns battlefield insertion, slots, turns, and encounter participation semantics. Coding must wait for those authorities to converge before implementing the bridge.

---

## 14. Special Jōnin catalogue recovery status

The generic evidence-based qualification architecture is locked and implemented, but the production path catalogue is not yet loaded.

Recovered exact historical catalogue material currently proves **11 families / 33 named paths**:

1. Reconnaissance — Tracker-nin; Sensor-nin; Surveillance Specialist
2. Intelligence — Interrogator; Counter-Intelligence Analyst; Strategic Intelligence Analyst
3. Covert Operations — Assassin; Infiltration Specialist; Extraction Specialist
4. Medical Operations — Field Medic; Toxicologist; Medical-Nin Researcher
5. Fūinjutsu Operations — Sealing Specialist; Reverse-Summoning Specialist; Bijū Expert
6. Shinobi Engineering and Applied Ninjutsu — Fūin Toolsmith; Summoning-Systems Specialist; Ninjutsu Engineer
7. Instruction and Examination — Elite Instructor; Team Development Instructor; Examination Specialist
8. Demolition and Sabotage — Explosive-Ordnance Specialist; Trap Specialist; Infrastructure Saboteur
9. Communications and Cryptography — Cryptographer; Signal-Interception Specialist; Battlefield Communications Specialist
10. Chakra and Technique Research — Bloodline Researcher; Counter-Technique Specialist; Technique Researcher
11. Diplomacy and Negotiation — Shinobi Envoy; Conflict Mediator; Cultural Liaison

Older authority also states **13 families / 39 paths**, but the exact remaining two historical families/six paths are not recoverable from the current audit record. Registry will **not invent them and mislabel the reconstruction as historical authority**.

Escort / Protective Detail is restored as a legitimate Special Jōnin specialization direction, but its exact family/path placement and its effect on the old 13/39 count remain open until deliberate catalogue closure.

Therefore:

- do not hard-code 13 / 39 yet;
- do not derive the catalogue from enemy cards;
- do not load a partial catalogue as if complete;
- challenge identity ≠ qualification path;
- evidence opportunity ≠ institutional Recognition.

Existing character qualification IDs remain valid:

- `instruction_and_examination.elite_instructor`
- `instruction_and_examination.examination_specialist`
- `intelligence.interrogator`

Qualification remains separate from rank, department, appointment, clearance/licence, current assignment, and active practice.

---

## 15. Alpha freeze / Coding handoff boundaries

The following are Coding/Combat corrections, not PL recalibration:

- remove retired Battle-entry modifiers from any reachable production path;
- Kisōgan Causal Strata minimum reference count 1 → 2;
- remove embodiment → Kisōgan access inference;
- preserve exact `source_only_bound_collective` Kikaichū taxonomy;
- reconcile My Clan Active/Reserve filtering against current queue authority;
- implement already-ratified Triple Rashōmon payoff semantics where current working source is incomplete;
- bind Menma's direct tutorial opponent to `test_subject_altered_shinobi` only after Combat supplies the exact action package/numerics;
- enumerate every Alpha-production action still relying only on explicit unresolved/placeholder semantics before Golden Combat Freeze.

A green diagnostic must not be treated as proof of semantic completeness when the diagnostic was intentionally allowed to pass explicit unresolved markers during development.

Before Alpha Combat Freeze, each Alpha-production action must either:

A. resolve through a real authorised consumer; or

B. be explicitly outside Alpha production.

Unknown semantics must remain unknown rather than being replaced with plausible generic behaviour.
