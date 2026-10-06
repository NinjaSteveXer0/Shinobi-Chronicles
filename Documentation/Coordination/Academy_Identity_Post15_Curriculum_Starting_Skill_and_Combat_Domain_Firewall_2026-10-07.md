# Shinobi Chronicles — Academy Identity, Post-15 Curriculum, Starting-Skill and Combat Domain Firewall

**Date:** 2026-10-07  
**Owner:** Stephen / CE / Codex / Coordination  
**Tracker:** #519  
**Status:** **CE RECONCILIATION CLOSED — DOWNSTREAM DOMAIN WORK REQUIRED; NOT IMPLEMENTED**

---

## 1. Purpose

This document closes the CE / Codex / Coordination layer requested by #519 across four coupled but distinct concerns:

1. representation-first Academy Base Stat / PL calibration;
2. the Alpha continuation from Foundation curriculum into higher Ninjutsu / Genjutsu / Fūinjutsu curricula;
3. starting-Skill breadth and provenance;
4. the internal ownership firewall for the broad Combat / Skills / Items / Equipment / Weapons / Summons / Tailed Beasts / Hosted Sources / Enhancements workspace.

These concerns are related because they all shape Character capability, but they must not collapse into one owner or one state model.

Binding inputs include:
- `Documentation/Progression/Phase 2 Discipline Development to Persistent Stat Growth Trial Contract 2026-10-01.md`;
- #448 / #460 Foundation-source efficacy semantics;
- #382 Potential Skill / later-technique boundary;
- `Documentation/Combat/SC_Combat_Unique_Shinobi_Chronicles_Mechanics_Design_Standard_2026-09-19.md`;
- current PL Formula v1.0 and PL / Registry / Rank authority;
- Stephen's #519 owner refinements.

Canonical non-collapse remains:

> **PL != Progression.**  
> **Base != Current != Effective != Battle state.**  
> **starting Skill != Potential Skill != learned Skill != prepared Skill != mastered Skill.**  
> **source exhausted != Character development exhausted.**

---

# PART A — REPRESENTATION-FIRST BASE STAT CALIBRATION

## 2. Exact order of authority

Every fresh representation Base Stat package must be calibrated in this order:

1. identify the exact representation/stage;
2. inspect relevant canon-stage capability as a guardrail where applicable;
3. inspect Shinobi Chronicles authored pre-Origin/backstory/history for that exact representation;
4. describe the representation's own capability profile:
   - signature disciplines;
   - strong supporting lanes;
   - ordinary competencies;
   - weak / undeveloped lanes;
5. assign the seven Base Stats from that evidence;
6. calculate Base PL from the finished seven Stats using the existing PL formula;
7. only then run a cross-roster collision audit.

Canonical:

> **Canon guides the representation; Shinobi Chronicles history determines the exact Shinobi Chronicles representation.**

> **Individual merit first -> PL formula second -> comparative collision audit last.**

## 3. What the collision audit is allowed to do

The cross-roster audit is a contradiction detector, not a balancing template.

It may ask:
- does another representation tie/exceed a supposed specialist lane for a genuine evidence-backed reason?;
- has a broad prodigy accidentally erased the readable identity of another Character?;
- does a Stat look unsupported by this representation's own history?;
- does an apparently weak lane contradict explicit authored competence?;
- did the PL formula expose an implausible package after the individual profile was authored?

It must not impose rules such as:
- all ten Origins need equal PL;
- only one Character may be strong in a discipline;
- everyone must remain below a named specialist by quota;
- Kakashi must be weakened merely because he is broadly exceptional;
- a Character's defining discipline must always be their single highest number.

A tie or overlap is not itself a failure. It becomes a failure only when the overlap is unsupported or makes an intended identity unreadable.

## 4. Broad prodigies and specialists

Broad prodigies may legitimately be excellent across several lanes.

Their existence does not authorise comparative suppression of specialists.

Likewise, a specialist does not receive an arbitrary numeric monopoly simply because the label "specialist" applies.

The test is profile coherence and evidence.

Stephen's current owner direction remains admissible evidence for the downstream PL audit:
- Academy Kakashi Ninjutsu 16 may remain a legitimate prodigy expression;
- Academy Menma Kinjutsu in approximately the 12–13 range is more coherent than the current Kin 9 tie with Kakashi;
- exact final seven-Stat rows and recalculated PL values remain PL / Registry / Rank authority, not CE invention.

## 5. Base recalibration is not Progression

Correcting an authored fresh-representation Base package is a Registry/PL calibration action.

It is not:
- a training reward;
- a Development EXP breakthrough;
- a hidden PL grant;
- a retroactive Story reward.

Persistent Current development remains a separate historical layer.

---

# PART B — ALPHA FOUNDATION -> EXPERT -> MASTER CURRICULUM

## 6. Alpha curriculum grammar is now closed

For the Alpha structured Ninjutsu / Genjutsu / Fūinjutsu development surface, the curriculum grammar is:

**FOUNDATION CURRICULUM -> EXPERT CURRICULUM -> MASTER CURRICULUM**

These labels describe the **curriculum/source profile**, not a universal Character title or proof that the Character personally possesses total mastery of the discipline.

Recommended player-facing discipline form:
- `FOUNDATION NINJUTSU CURRICULUM`;
- `EXPERT NINJUTSU CURRICULUM`;
- `MASTER NINJUTSU CURRICULUM`;

and equivalent Genjutsu / Fūinjutsu labels.

## 7. Same facility / same screen, different source

Alpha must not multiply the current Exams/Practical/Training facility into duplicate screens merely to continue Stat development.

The same player-facing discipline lane may host multiple source profiles.

Canonical:

> **same UI lane != same development source.**

When Foundation ceases to be effective, the UI must not pretend Foundation continues forever. It must project a different authorised curriculum/source when one is available.

## 8. Foundation semantics remain intact

Existing profile:

`academy_foundation_discipline_activity_v1`

remains valid.

Its Stat-15 limit remains an activity/source efficacy ceiling only.

At Current Stat 15 or above:
- Foundation awards 0 primary Discipline Development EXP for that discipline;
- existing earned overflow remains valid;
- the Character is not globally capped;
- higher curricula / other legitimate sources may continue development.

## 9. Expert and Master are real source profiles, not cosmetic labels

Progression / Development must author exact higher curriculum profiles rather than Coding/UI faking them.

Each higher profile must durably define at minimum:
- stable source/profile ID;
- supported discipline(s);
- observer-safe player-facing label;
- exact access/entry predicates;
- exact development effectiveness range / `developmentCeilingStat` or equivalent source limit;
- any resource cost and preflight rule;
- which factual actions can produce +1 / +2 / +3 Discipline Development EXP under the existing action-derived law, or an explicit successor if Progression proves one necessary;
- whether Technique Practice is available and, if so, the exact authorised route dependency;
- save/load/idempotence behavior;
- Chronicle source/provenance receipts;
- what happens when that source itself becomes ineffective.

UI may display the profile. Coding may enforce it. Neither may invent it.

## 10. Alpha reachability requirement

Alpha requires a legitimate player-facing continuation above Foundation for:
- Ninjutsu;
- Genjutsu;
- Fūinjutsu.

The route must be reachable through legitimate Academy-stage play and cannot require already being Genin merely to escape the Academy Foundation ceiling.

This is especially important because Academy Kakashi already begins above the Foundation Ninjutsu source ceiling.

Therefore:

> **Promotion cannot be the only gate to post-15 development.**

Rank may be one contextual predicate in later/harder curricula where separately justified, but Rank must not become the Stat-growth owner and cannot create a circular `need Genin to develop -> need development to become Genin` dead end.

## 11. Curriculum transition semantics

For one selected persistent Character + discipline, the surface must resolve:

1. which curriculum profiles are currently known/available;
2. which profile is currently effective for primary development;
3. whether the next profile is eligible, known-but-locked, or not yet known;
4. what observer-safe requirement information may be shown;
5. which exact source produced any resulting Development EXP.

A curriculum switch is a source transition.

It does not:
- reset the shared Discipline Development ledger;
- reset the Current Stat;
- award a Stat merely for changing curriculum;
- award a Skill merely for changing curriculum;
- erase previous mentor/curriculum history.

## 12. Higher difficulty does not mean generic higher EXP

Preserve the existing action-derived Development grammar unless Progression explicitly supersedes it.

Harder curriculum may legitimately provide:
- access above a weaker source ceiling;
- harder tasks;
- different challenge/context;
- different Technique Practice opportunities;
- stronger evidence for exact development routes;
- different resource or eligibility pressure.

It does not automatically mean:
- every action gives larger Discipline EXP;
- Exams/Practical become the best farm in the game;
- Battle/Story/World development becomes inferior.

Canonical:

> **source difficulty changes efficacy/access/challenge; it does not automatically multiply development rewards.**

## 13. No new fake hard cap

Expert and Master curricula may themselves have explicit source limits.

Those limits are not global discipline caps.

If the currently highest implemented Alpha curriculum becomes ineffective, presentation must say that the current source has been exhausted, not that the Character has reached an absolute maximum.

Nothing in this contract changes the global uncapped Stat model.

---

# PART C — STARTING-SKILL BREADTH + PROVENANCE

## 14. Fresh-representation starting-package breadth

For fresh representation packages currently closed by owner direction:
- Academy representation: **2 starting Skills**;
- Genin representation: **3 starting Skills**;
- Jōnin representation: **4 starting Skills**.

These are starting-package breadth rules only.

They do not define:
- Chūnin / Special Jōnin / Sannin / Kage / Akatsuki / Boss starting counts;
- lifetime learned roster size;
- permanent prepared-slot ceiling;
- Potential Skill Roster size;
- Mastery.

## 15. Identity anchor

Every fresh starting package must contain at least one Skill that clearly anchors the exact representation's identity.

Additional Skills must come from legitimate capability lanes for that Character/stage.

Elemental Nature is one possible lane, not a mandatory universal slot.

Same Rank does not imply the same composition template.

## 16. Starting-Skill provenance test

For every proposed starting Skill:

1. Did this exact representation possess/know/use it before Origin scene 1 or equivalent starting boundary?  
   -> eligible as starting capability.

2. Is it only justified by an occurrence/reward inside the Origin or later Story?  
   -> not a starting Skill; it requires the exact committed unlock.

3. Is it canonically later but intentionally moved earlier by SC?  
   -> require explicit SC divergence/backstory authority.

4. Is the label authentic but the mechanic generic filler?  
   -> redesign/remove under the Unique Mechanics Design Standard.

Current durable Obito example remains:
- `Fire Style: Cinder Burst` is treated as pre-existing/starting capability unless World reward authority is explicitly superseded;
- Obito's formal-training reward currently grants development, not that Skill.

## 17. Promotion / persistence safety

A persistent Character who earns Skills during play does not lose them merely because a fresh representation of their new Rank would normally start with a different package breadth.

Canonical:

> **fresh representation starting package != persistent Character's complete learned history.**

---

# PART D — COMBAT WORKSPACE INTERNAL DOMAIN FIREWALL

## 18. One specialist workspace may contain several owners-of-state domains

The broad Combat specialist workspace may remain operationally consolidated, but its internal domains must be explicit.

### Battle Core
Owns:
- action resolution;
- targeting;
- turn/action economy;
- mitigation;
- Battle state;
- Battle-end factual outputs.

Does not own:
- persistent Progression;
- ownership;
- formal Rank;
- Registry identity.

### Skills / Techniques
Owns:
- exact technique mechanics;
- Battle-use legality;
- source/mechanical prerequisites;
- prepared-use semantics.

Does not infer learned access from catalogue presence.

### Items
Owns:
- consumable/usable object mechanics.

Item possession != equipment state != weapon proficiency != Skill access.

### Equipment
Owns:
- equipped-state mechanics;
- equipment-source effects;
- slots/activation where authorised.

Equipment ownership != equipped.  
Equipment bonus != Base Stat mutation.

### Weapons
Owns:
- exact weapon mechanics;
- weapon-specific actions/interactions;
- weapon proficiency consumers.

Bukijutsu != exact Weapon Proficiency.  
Ownership != proficiency != equipped/prepared use.

### Summons
Owns:
- Summon source/action/lifecycle mechanics.

Summon != Tailed Beast.  
Summon acquisition != every source-assisted Skill.

### Tailed Beasts / Hosted Sources
Owns their exact:
- source relationship;
- partition/access state;
- manifestation;
- own-action packages;
- host/controller enhancement packages;
- anti-double-count rules.

They must not inherit generic Summon semantics merely because runtime plumbing is shared.

### Enhancements
Owns:
- source-conditional Effective/Battle modifications.

Enhancement != Base mutation.  
Enhancement != permanent Progression unless a separate owner commits persistence.

## 19. Required mechanic declaration before DESIGN CLOSED

Every mechanically meaningful authored package must declare:

- `sourceDomain`;
- `stateOwner`;
- `activationState`;
- `persistenceClass`;
- `antiDoubleCountRelationship`;
- exact external owner dependencies where present.

Equivalent machine/schema names are allowed; the semantic fields are mandatory.

If a mechanic crosses domains, one domain remains primary and other domains are explicit consumers/dependencies.

Do not let one convenient runtime object become the semantic owner of Skill access, equipment ownership, source relationship, persistent development and Battle state simultaneously.

## 20. Shared runtime plumbing does not collapse semantics

A shared resolver may technically process several mechanic classes.

That does not make them one design domain.

Canonical:

> **shared implementation primitive != shared semantic owner.**

Do not create one generic `buff/skill/item/summon` authority simply because multiple effects use the same engine function.

---

# PART E — DOWNSTREAM OWNERSHIP / STATUS

## 21. What is closed here

CE / Codex / Coordination now closes:
- representation-first calibration order;
- collision-audit purpose and limits;
- Foundation -> Expert -> Master curriculum grammar for Alpha;
- same-screen / different-source law;
- Academy-stage reachability requirement for post-15 Nin/Gen/Fūin development;
- source-transition non-collapse;
- starting-package breadth and provenance law;
- Combat internal domain firewall.

## 22. What is not closed here

Still owner-specific:
- exact seven Base Stats / recalculated PL for the ten Academy Origins -> PL / Registry / Rank;
- exact Expert/Master source IDs, gates, effectiveness ceilings, resource costs and factual development actions -> Progression / Development;
- exact starting Skill selections/mechanics and any exact Technique Practice mapping -> Combat / Skills;
- final visual treatment and transitions -> UI / Assets;
- runtime implementation/persistence/QA -> Coding / Runtime.

## 23. Alpha priority

The immediate Alpha blocker from #519 is the missing real post-15 Ninjutsu / Genjutsu / Fūinjutsu curriculum contract.

Therefore the next direct owner is **Progression / Development**.

Other #519 downstream work remains real but should not be used to delay that first blocking handoff.

---

## Final lock

> **A Character is calibrated from their own representation history, not from roster symmetry. Foundation, Expert and Master are distinct development sources on one coherent player-facing lane. Starting Skills come from exact provenance rather than association. The Combat workspace may share implementation plumbing, but every mechanic keeps one explicit semantic owner and anti-double-count boundary.**
