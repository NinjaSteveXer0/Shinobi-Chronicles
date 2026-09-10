# Shinobi Chronicles — Contextual Passive / Active Skill Surface

**Date:** 2026-09-10  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING COMBAT/SKILLS SEMANTIC CONTRACT — CONTEXTUAL SKILL MODES CLOSED / IMPLEMENTATION SEPARATE**

## 1. Purpose

Shinobi Chronicles Skills are not limited to Battle attacks. Alpha may expose learned capabilities during Story, World, Mission, investigation, training, traversal, seal/barrier interaction, Hosted-Entity interaction and other contextual events.

This contract adds reusable Skill execution modes without creating a second progression system or allowing Skills to invent events.

Canonical modes:

- `battle_active` — existing ordinary Battle-selectable action;
- `passive_contextual` — automatically eligible to participate in a compatible factual context, with no deliberate action selection required;
- `active_contextual` — deliberately invoked against an exact caller-supplied contextual opportunity/target/query;
- `hybrid_contextual` — may passively expose/qualify information or an option and then require deliberate active use for the actual intervention.

A Skill definition may support more than one mode only when its row explicitly says so.

## 2. Ownership boundary

- **Story / World / Missions / Events:** factual situation, event eligibility, exact object/system/person/location/query/opportunity and resulting narrative continuation.
- **Progression / Development:** learned capability, development/access predicates and persistent development evidence.
- **Combat / Skills:** Skill identity, mode, compatibility rules, exact mechanical/contextual effect and invalid-selection semantics.
- **Acquisition / Inventory:** actual object ownership where an item/tool/source is required.
- **Coding:** generic evaluators/dispatchers, persistence, UI projection, runtime tests and Golden/regression.

Preserve:

**event exists != Skill creates event**  
**Skill available != Skill succeeds**  
**Skill succeeds != Story objective complete automatically**  
**Knowledge != Access != Competence != Power != Mastery**

## 3. Passive contextual semantics

A `passive_contextual` Skill is checked only when the caller exposes a compatible factual context.

Rules:

1. Eligibility evaluation is side-effect-free.
2. Merely opening UI, refreshing presentation, listing Skills, entering a map or checking eligibility commits no Skill occurrence.
3. A passive consumes no Battle turn or contextual action opportunity merely for being checked.
4. A factual Skill occurrence is committed only when the passive materially participates in an actual resolved event/query/decision.
5. A passive cannot create its own event, target, system, clue, hazard, scent, seal, relationship or evidence source.
6. Passive output is bounded to what its semantics and the caller-supplied evidence permit.
7. A passive may expose an option, interpretation, warning, recognition profile or compatibility result without guaranteeing the downstream choice/success.
8. If no compatible context exists, the passive is dormant rather than failed.

## 4. Active contextual semantics

An `active_contextual` Skill requires deliberate invocation against an exact current context supplied by Story/World/Mission/Event authority.

Rules:

- invalid target/context/access is rejected before commit;
- invalid selection creates no false Skill-use history;
- outside Battle it does not consume a Battle action;
- where the caller models a contextual interaction/action opportunity, a successful active use consumes one such opportunity unless the row says otherwise;
- when invoked inside Battle, it consumes the Character's normal action opportunity unless an exact closed action says otherwise;
- the Skill cannot fabricate a missing object/system/path/relationship merely to make itself valid;
- success may be complete, partial, challenged, resisted, unavailable or otherwise bounded by the exact target/system contract.

## 5. Hybrid contextual semantics

A `hybrid_contextual` Skill has two explicit surfaces:

1. a passive/eligibility/read surface that may expose a valid option or bounded information;
2. a deliberate active surface that performs the intervention.

Passive discovery of an option is not the active use and commits no action occurrence unless the passive itself materially changes the factual resolution.

## 6. Event-facing occurrence envelope

When a contextual Skill materially participates in a factual resolution, the committed occurrence should preserve at minimum where applicable:

- `skillId`;
- stable actor ref;
- exact caller/context/source occurrence ref;
- exact target/query/object/system/relationship ref;
- execution mode;
- access/capability source used;
- factual outcome/result class;
- emitted bounded evidence refs;
- relevant provenance/relationship/source refs.

Do not create occurrences from UI hover, option preview, eligibility polling or presentation refresh.

## 7. False Identity — flagship passive

Stable Skill ID:

`skill_false_identity`

Display:

**False Identity**

Mode:

`passive_contextual`

Discipline/family:

`false_identity_seals`

Rarity:

`legendary`

### 7.1 Arc-1 semantic basis

Current Arc-1 Story establishes a deliberate development chain:

- Hospital provides recognition/reference material;
- Barrier exposes recognition behaviour;
- Academy/Third Bell demonstrates a changed identity state being accepted and propagated by trusted systems;
- Archive teaches how accepted legitimate identity changes propagate;
- Menma creates the **Identity Rebinding Seal** within the broader **False Identity Seals** family;
- Mission 11 later demonstrates active **Recognition Substitution** against Recall by presenting a believable `Menma Normal / no carrier` recognised state.

The important semantic distinction is:

> ordinary deception attempts to change what an observer believes; **False Identity changes the recognised answer a compatible system is evaluating without rewriting the actor's stable identity or World Truth.**

### 7.2 Access

For current Arc-1 Menma, `skill_false_identity` is a derived passive surface of the already-earned capability:

`false_identity_seals.identity_rebinding_seal`

It does **not** require a second duplicate training/unlock grant after `IdentityRebindingAccessSatisfied(actor)` is legitimately true.

The passive may be present as learned capability while dormant if no legitimate current false-identity profile/seal state exists.

### 7.3 Exact passive effect

When all are true:

- `IdentityRebindingAccessSatisfied(actor)`;
- an exact legitimate current source-owned false-identity/recognised-state profile exists;
- an external system/query explicitly reads an identity/recognition field that the current profile is compatible with;

then the passive may supply that current recognised profile as the actor's `presentedIdentityProfile` for that exact query.

The target/system resolves normally. Outcomes may include accepted, rejected, challenged, partial/incomplete, contradictory or incompatible according to its own authority.

### 7.4 False Identity does NOT

- rewrite the stable Character/person identity;
- rewrite World Truth;
- erase existing observations or committed Knowledge;
- forge Rank, ownership, citizenship, permissions, clearance or credentials not legitimately represented by the current profile;
- make people with direct contradictory personal Knowledge forget the actor;
- universally hide chakra, Hosted Entities, Bloodlines, transformations or equipment;
- automatically defeat every barrier/archive/security/Recall system;
- fabricate a trusted-system relationship where none exists;
- grant event completion, mission success or reward;
- create a universal stealth/evasion modifier;
- add PL or Stats.

### 7.5 Passive occurrence rule

A recognition check that merely asks whether False Identity *could* apply creates no history.

If an actual system query resolves using the supplied false profile, commit one factual contextual Skill occurrence preserving:

- `skillId: skill_false_identity`;
- actor;
- exact queried system/source;
- original queried field family;
- exact presented profile ref;
- result (`accepted | rejected | challenged | partial | incompatible` or target-owned equivalent);
- any bounded evidence emitted.

This makes successful and failed uses Chronicle history without turning passive polling into event spam.

## 8. Recognition Substitution is the active evolution, not the same Skill

Reusable catalogue Skill:

`skill_false_identity_recognition_substitution`

Mode:

`active_contextual`

Recognition Substitution is a deliberate attempt to substitute a legitimate current recognised false-state profile into **one exact active recognition/chakra/Recall/retrieval query**.

It requires:

- `IdentityRebindingAccessSatisfied(actor)`;
- exact compatible active query/contact;
- a legitimate current false-identity profile/state that can address the queried field;
- any caller-required current seal/system conditions.

It may resolve accepted, incomplete, rejected, challenged or incompatible. It does not alter stable identity or create universal bypass authority.

Historical Mission-11 action:

`arc1_m11_menma_recognition_substitution`

remains its exact committed action identity and numerical/contextual authority. Runtime/catalogue integration may record semantic linkage:

`catalogueSkillId = skill_false_identity_recognition_substitution`

without renaming or rewriting the historical action.

## 9. Contextual Skills and event authoring

A Story/World event may legitimately test for a passive or offer an active contextual Skill when the factual situation supports it.

Examples include:

- barrier recognition;
- hostile system query;
- archive/security interaction;
- scent/tracking trail;
- seal inspection/counterseal opportunity;
- traversal surface/path;
- evidence reconstruction;
- injury assessment;
- Hosted Entity cooperation/refusal;
- Echo Recall pressure;
- Tailed-Beast/Kurama negotiation or voluntary-loan request.

The presence of a Skill does not force the event author to expose that route. Conversely, event prose must not silently grant a Skill the Character never learned.

## 10. Randomness / eligibility

Contextual Skills do not introduce generic success-roll randomness.

Eligibility is semantic first. If a future event legitimately chooses randomly among multiple already-eligible outcomes, randomness occurs only **after** exact capability/context predicates have passed.

## 11. Alpha implementation target

Prefer one generic contextual-Skill dispatcher/evaluator rather than bespoke code for every row.

At minimum it should support:

- side-effect-free passive eligibility checks;
- active invocation with exact caller target/context refs;
- access predicates;
- compatibility tags;
- bounded evidence/result payloads;
- occurrence commit only on factual participation;
- save/load/idempotence;
- text-first name/rarity/mode presentation;
- no assumption that every Skill belongs on the Battle action bar.

## 12. Non-collapse

- passive availability != automatic success;
- passive evaluation != committed occurrence;
- event eligibility != event success;
- contextual Skill != Battle Skill automatically;
- learned capability != every target compatible;
- False Identity != stable identity rewrite;
- False Identity != forged legal authority;
- False Identity != universal stealth;
- False Identity != Recognition Substitution;
- Recognition Substitution != universal bypass;
- current recognised profile != permanent representation necessarily;
- presentation != World Truth;
- observer Knowledge != World Truth;
- contextual effect authorship != event/source authorship;
- authored != implemented != runtime validated != Golden GREEN.
