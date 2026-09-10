# Shinobi Chronicles — Capability-Responsive Chronicle Event Ecology v3

**Date:** 2026-09-10  
**Owner:** World / Missions / Events / Rewards  
**Status:** **BINDING WORLD CONTENT AUTHORITY — CONSOLIDATED LOCK; IMPLEMENTATION / RUNTIME VALIDATION SEPARATE**

## 1. Purpose

This document consolidates the capability-responsive World doctrine after Stephen's final clarification.

The intended experience is:

> **The world should increasingly present opportunities that make sense for the shinobi this Chronicle actually produced.**

A Character who became skilled at False Identity should periodically become eligible for identity/recognition-shaped events and chains that another Character may never encounter. A Character who instead developed Tracking, Medical capability, Fūinjutsu, Bukijutsu, Hosted-Entity relationships, underworld contacts, Bloodline history, specialist fieldcraft, unusual Knowledge, political recognition or some other meaningful route should receive different eligible possibilities.

A Character who legitimately develops several of those routes receives the **union of those eligible pools**, plus rarer authored **compound-path opportunities** whose premise genuinely requires more than one route.

This is the core player-facing principle:

> **something for everyone ≠ everything for everyone**

and:

> **different histories should create different verbs, different eligible events, different chains and different future problems/opportunities.**

## 2. What this does NOT mean

This is not deterministic build matching.

The engine must not behave like:

`player learned Tracking -> immediately spawn Tracking Quest #7`

Nor does every event inspect every capability and expose twenty specialist buttons.

The world remains a mixture of:

- ordinary unrelated village / regional life;
- Story and Arc-contextual pressure;
- formal missions;
- baseline World opportunities;
- capability-responsive opportunities;
- history-generated follow-ups;
- secrets / discoveries;
- occasional locations with nothing currently actionable.

A specialist path changes the **eligible possibility space**. It does not turn the world into a tutorial checklist for that build.

## 3. Authority boundary

### World / Missions / Events / Rewards owns

- authored event / quest / mission / chain definitions;
- factual location, participant, object and world-system context;
- exact occurrence-eligibility predicates;
- Knowledge / discovery / actionability requirements;
- route affordances;
- causal prerequisites;
- recurrence, expiry, suppression, transformation and replacement rules;
- factual outcomes and non-action handling;
- contextual reward / consequence envelopes;
- authoring pools and placement across the seven villages and seven regional interactive maps.

### Capability / identity / progression owners own

Progression, Skills, Registry, Rank, PL, Acquisition, Items, Weapons, Equipment, Summons, Bloodline / Hosted-Entity authorities and other specialist owners define whether the Character actually possesses the relevant learned Skill, qualification, Rank, ownership, access, relationship, representation, item, Summon, weapon, Bloodline state, Hosted Entity state or other prerequisite.

World consumes those facts. It does not manufacture them.

### CE / World selection owns

CE / World selection may evaluate committed Character + world history and filter/select only among **already semantically eligible authored candidates**.

CE is explicitly expected to help surface suitable quest chains, missions, events and follow-ups based on the Character's real history, Skills, Knowledge, relationships and choices — but only from legitimate authored candidates and predicates.

### Coding owns

- generic evaluation;
- persistence;
- selection / scheduling mechanics;
- occurrence identity;
- save/load idempotence;
- UI projection plumbing;
- tests / Golden / regression validation.

Preserve:

**event definition != occurrence**  
**Skill != event creator**  
**capability predicate != success**  
**eligibility != selection**  
**selection != discovery**  
**discovery != actionability**  
**specialist event != guaranteed specialist victory**  
**randomness among eligible candidates != randomness manufacturing eligibility**

## 4. Five authoring modes

These are content semantics, not mandatory engine enum names.

### A. `baseline_world`

The event can legitimately happen from ordinary location/world/history conditions.

A specialist capability may add a route, clue, interpretation or method without being required for the event to exist.

Example: a civilian road accident is ordinary World content; Medical Triage may reveal which victim is deteriorating.

### B. `single_path_responsive`

The event itself requires one exact capability/history family.

If the Character lacks that prerequisite, **the event is absent from their candidate pool**.

Example: a dedicated recognition discrepancy chain that only becomes relevant after the Character has used or developed False Identity.

### C. `multi_path_any`

The event is eligible if any of several authored route families is satisfied.

Different qualifying paths may reveal different information or actions.

Example: an old sealed ruin may become relevant through Fūinjutsu Knowledge, a recovered archival document, a legitimate old key, clan-history evidence or another exact route.

### D. `compound_path_synergy`

The event, branch or follow-up requires two or more independent capabilities/histories together.

Examples:

- False Identity + Counter-Surveillance;
- False Identity + Fūinjutsu;
- False Identity + Underworld Contact;
- Tracking + Evidence Reconstruction;
- Medical + Poison Recognition;
- Fūinjutsu + Barrier Recognition;
- Weapon Expertise + rare provenance Knowledge;
- Hosted Entity relationship + Tailed-Beast negotiation;
- Echo relationship + Recall-pressure awareness;
- Bloodline capability + clan-history Knowledge;
- Service recognition + underworld relationship.

A compound event is rarer because it requires a genuinely unusual Chronicle intersection, not because it must provide numerically superior loot.

### E. `history_generated_followup`

The event exists because a prior committed occurrence/action/non-action created the factual prerequisite.

Examples:

- a false profile used earlier becomes relevant evidence later;
- a spared hostile becomes a witness/contact/threat;
- evidence left untouched is recovered by another actor;
- a civilian stabilised earlier later becomes a source;
- a parcel delivered under an alias creates a later recognition contradiction;
- a threat ignored by the player is later resolved by another team and creates a different observer/history network;
- a weapon returned to its owner creates a later mentorship or provenance chain;
- information deliberately withheld changes who knows what in a later investigation.

This is the strongest Chronicle mode because later World content is being caused by actual prior history rather than by build labels alone.

## 5. Personalised candidate ecology

At any location/time/world state, candidate selection should conceptually operate as:

`authored local candidate reservoir`

-> factual Story / Arc / world-state filter

-> location / route / participant availability filter

-> prior occurrence / recurrence / expiry / suppression filter

-> observer Knowledge / discovery predicates

-> Character capability / relationship / item / ownership / recognition / representation predicates

-> exact history-generated predicates

-> **eligible candidate set**

-> optional relevance / variety weighting among eligible candidates

-> CE / World chooses a bounded subset

-> UI projects only legitimate discovered/actionable state.

A Character with more meaningful developed routes therefore has a **deeper eligible deck**, not a map containing every eligible event simultaneously.

## 6. Multi-capability Characters — explicit free-for-all rule

If a Character legitimately has several route families, World is allowed to become a **free-for-all of legitimate candidate possibilities**.

Example Character state:

- False Identity;
- Counter-Surveillance;
- Fūinjutsu literacy;
- ANBU Knowledge;
- underworld contact;
- specialised weapon provenance Knowledge.

That Character may qualify for:

1. ordinary baseline events;
2. False Identity events;
3. Counter-Surveillance events;
4. Fūinjutsu events;
5. ANBU-history events;
6. underworld events;
7. weapon-provenance events;
8. history-generated follow-ups from prior actions;
9. authored two-path intersections;
10. rarer three-or-more-path intersections where a real premise exists.

Another Character may see none of those exact dedicated occurrences and instead receive Medical, Tracking, clan, Summon, Bloodline or other content.

This difference is intentional.

The world should feel as though it has different reasons to care about different shinobi.

## 7. Anti-clutter rule

More eligible content must not create marker spam.

Current World guidance remains roughly:

> **4–7 simultaneously actionable non-Story opportunities when enough legitimate candidates exist.**

This is pacing guidance, not a universal hard engine cap.

A broad Character receives greater variety across time and revisits, not thirty pulsing markers at once.

The eligible reservoir may be much larger than the currently surfaced subset.

## 8. Relevance weighting after eligibility

After hard semantic eligibility is established, CE / World may prefer candidates that are especially relevant to the current Chronicle, provided this does not make ineligible events eligible.

Potential soft weighting inputs include:

- recently developed capability;
- underused but established capability;
- unresolved prior history;
- participant relationship;
- current location;
- recent Story consequences;
- existing unresolved clue / rumour;
- route diversity / recent-event variety;
- current world pressure;
- a meaningful compound intersection becoming newly possible.

Soft weighting exists to improve pacing and personal relevance, not to force a predictable content schedule.

## 9. Dedicated-path absence must be invisible

If a Character does not qualify for a dedicated responsive event:

- do not spawn it;
- do not show a disabled marker;
- do not show a greyed specialist option;
- do not show `requires False Identity` or equivalent spoiler text;
- do not leak its existence through map hover, DOM/accessibility labels, hidden tooltip text or quest index counts;
- do not penalise the Character for not having the path.

The same geography may host a completely different eligible occurrence for that Character.

This is especially important for False Identity, secret Knowledge, rare representation paths, Bloodlines, Summons, Hosted Entities and high-value compound events.

## 10. Baseline content remains essential

The personalised ecology must sit on top of a healthy ordinary-world ecosystem.

Every map should continue to support plausible non-specialist activity such as:

- civilian requests;
- routine assignments;
- local disputes;
- ordinary investigations;
- training opportunities;
- trade/service problems;
- rescue/protection;
- travel/courier issues;
- discoveries;
- normal character encounters;
- Arc pressure where appropriate.

This prevents the world from feeling as though every stranger knows the player's character sheet.

## 11. False Identity — flagship responsive path

False Identity remains the first flagship example.

Stable capability:

`skill_false_identity`

Separate active evolution:

`skill_false_identity_recognition_substitution`

World consumes the closed limitation that False Identity may affect a compatible recognised-profile query but does not:

- rewrite stable identity or World Truth;
- erase prior observations / Knowledge;
- invent Rank;
- invent citizenship;
- invent ownership;
- invent clearance;
- invent permissions;
- universally hide chakra / Bloodlines / Hosted Entities / equipment;
- guarantee access or success.

Dedicated False Identity occurrences generally require False Identity / identity-rebinding history and therefore do not appear in unrelated Chronicles.

General baseline events may still contain a False Identity route when the situation independently exists.

## 12. Example compound opportunities

### False Identity + Counter-Surveillance — `The Watcher Who Logged the Wrong Person`

The Character detects surveillance while the watcher / system records the wrong recognised profile. The player may preserve the alias, misdirect the tail, expose the watcher, confront them, leave or allow contradictory observer histories to persist.

### False Identity + Fūinjutsu — `A Name Written Into the Ward`

A ward stores recognised-profile information in a seal layer. False Identity can affect the recognition query. Fūinjutsu can inspect the stored seal state. Together they may expose an unstable provenance trace that neither path reveals alone.

### Tracking + Evidence Reconstruction — `Three Trails, One Body`

Movement evidence, scene evidence and witness timing disagree. Tracking establishes route continuity while reconstruction establishes scene chronology. Together they can prove multiple movers were involved without magically revealing identity.

### Medical + Poison Recognition — `The Patient Who Should Be Recovering`

A recovering victim deteriorates unexpectedly. Medical capability establishes the ordinary recovery expectation; poison recognition reveals a second problem. The player may treat, preserve a sample, investigate, call authority, prioritise another victim or leave the medical owner to act.

### Weapon Expertise + Provenance Knowledge — `The Blade Nobody Wanted`

An apparently worthless damaged weapon becomes meaningful because the Character recognises unusual construction/history. Possible consequences include restoration, return, sale, research, a former-owner chain, Forge access or representation/history evidence.

### Underworld + Service Recognition — `Two Names at One Table`

An institutional contact and an underworld intermediary know the same Character through different observer histories. Neither necessarily possesses complete truth. The event becomes a collision of recognition networks rather than a morality test.

### Echo + Recall Awareness — `A Knock From the Wrong Side`

A compatible Echo source experiences Recall pressure. One capability detects the pressure; relationship/history determines whether the source warns, cooperates, refuses, remains silent or creates a later consequence.

## 13. Capability-family coverage

World should maintain responsive reservoirs for meaningful closed paths including, where current authority supports them:

- False Identity / recognition;
- Fūinjutsu / barrier work;
- Kinjutsu risk / forbidden-method Knowledge;
- Tracking / scent / chakra trace;
- investigation / evidence custody / reconstruction;
- medical triage / stabilisation / poison recognition;
- counter-surveillance / infiltration;
- weapons / Bukijutsu / proficiency / provenance;
- crafting / rare materials / Forge / Fūin Craft;
- Summon relationships;
- Hosted Entity relationships;
- Echo relationships;
- Tailed Beast / Jinchūriki relationships;
- Bloodline contextual capability;
- clan history;
- service / Special Jōnin qualification evidence;
- underworld contacts;
- political / institutional reputation;
- personal/shared history;
- rare Knowledge;
- special Character-representation eligibility evidence.

This list may expand whenever another owner closes a genuinely expressive route with an event-facing surface.

## 14. Automatic World event-consumer pass

Whenever Writing, Combat, Progression, Registry, Acquisition, CE or another specialist closes a new expressive player route, World should automatically perform a lightweight **event-consumer pass**.

The pass asks:

1. What exact durable predicate proves the Character has this route?
2. What factual situations could naturally care about it?
3. What can the route legitimately notice / attempt / change?
4. What does it explicitly not do?
5. Which existing baseline events should gain a conditional route?
6. Does the route deserve dedicated event-level eligibility?
7. Are 2–6 new responsive events justified?
8. Is at least one history-generated follow-up worthwhile?
9. Which existing major routes create strong two-path or multi-path intersections?
10. What factual CE history should be committed when the capability materially participates?
11. What rewards/consequences are contextually appropriate without making the route universally superior?
12. Which Alpha slice is actually implementable now?

The player should not need to request this manually each time a good new path is invented.

## 15. 500+ World reservoir interpretation

The planned 500-entry World reservoir is a **possibility space**, not a completion checklist and not a promise that every Chronicle will see 500 events.

Its purpose is to contain:

- broad ordinary-life content;
- regional/village-specific content;
- Arc contextual content;
- specialist-responsive events;
- hidden/discoverable chains;
- history-generated follow-ups;
- compound-path opportunities;
- reward / item / weapon / access / relationship / Knowledge opportunities.

A given Chronicle should consume only the subset that becomes semantically eligible and selected.

Different Characters may therefore experience substantially different portions of the reservoir.

The reservoir may grow beyond 500 whenever meaningful new paths warrant additional content.

## 16. History is not a morality score

Actions and non-actions may both generate factual history.

Examples:

- intervene;
- observe;
- decline;
- withhold information;
- refuse pursuit;
- withdraw;
- spare;
- capture;
- release;
- return an object;
- keep an object where authorised;
- protect a person instead of pursuing a hostile;
- pursue a hostile instead of protecting an objective;
- allow another team to resolve the situation;
- do nothing.

Consequences may differ, but the system must not reduce them to hidden `good/bad` scores.

Non-action may produce:

- no further consequence;
- preserved neutrality/anonymity;
- lost or changed opportunity;
- another actor resolving the issue;
- a new observer network;
- later danger;
- later benefit;
- different Knowledge;
- different relationship/shared history.

Difference is not punishment.

## 17. Reward doctrine

Responsive content may legitimately produce different combinations of:

- Ryō;
- consumables;
- materials;
- weapons;
- equipment;
- service access;
- Forge / Fūin Craft opportunities;
- Knowledge;
- relationship/shared history;
- exact Special Jōnin qualification evidence where authorised;
- other Skill/proficiency development only where the owning system permits it;
- recognition;
- contacts;
- follow-up chains;
- secret-location discovery;
- CE history / Echo-relevant provenance;
- special Character-representation eligibility evidence.

A specialist route does not automatically pay more.

Its value may instead be that it creates a future Chronicle unavailable to other Characters.

Do not double-grant occurrence-time development again through mission/Arc debrief rewards.

## 18. Knowledge / UI projection

World Truth and player-facing projection remain separate.

For responsive content:

**unknown** -> no marker / no leak  
**legitimately suspected / discovered as unknown** -> existing unknown-location/event presentation may use `????` or other approved Knowledge-safe treatment  
**identity known** -> real label may project  
**actionable** -> contextual action may project.

Dedicated specialist events that are not eligible must remain completely absent, not greyed out.

## 19. Anti-reroll / recurrence

- Save/reload does not change hard semantic eligibility.
- First-time discovery/history rewards are idempotent.
- Selection randomness may vary only where the persistence contract legitimately permits a new selection/occurrence.
- Recurrent families create new occurrences with new context/participants when fiction permits; they do not replay literal history.
- Compound-path opportunities should generally be rarer than single-path-responsive events.
- Variety weighting can choose among eligible candidates but never make an ineligible event eligible.

## 20. Alpha production rule

Do not bulk-implement every responsive event merely because it is authored.

For Alpha:

- activate the strongest available slices for current real capabilities;
- ensure Konoha + Land of Fire have enough responsive content to make Arc 1 free-play meaningfully personal;
- include False Identity as a flagship example;
- include several additional paths already supported by current capability authority;
- include at least a small number of history-generated follow-ups;
- include at least a few compound-path opportunities;
- preserve broad ordinary standing-map content alongside them;
- expand activation across the seven villages and seven regional maps as runtime/content readiness permits.

Design closed != implemented != runtime validated != Golden GREEN.

## 21. Acceptance invariants

A correct implementation/content slice must satisfy all of the following:

1. A Character without a dedicated path does not encounter that dedicated path event solely to be told they lack the path.
2. A Character with one path becomes eligible for appropriate authored content but not unrelated specialist content.
3. A Character with multiple paths receives the union of eligible pools.
4. Authored compound predicates can expose additional intersection content.
5. Broad capability does not flood the map with all eligible candidates simultaneously.
6. CE/World selection only selects from candidates already semantically eligible.
7. A later event can be caused by earlier action or non-action.
8. Observer Knowledge remains separate from World Truth.
9. Specialist routes do not guarantee success.
10. Rewards differ contextually without morality scoring or universal specialist multipliers.
11. Non-action is allowed to create history without automatic punishment.
12. Missing capability is not a penalty; it simply changes the possible Chronicle.
13. No disabled/hidden UI clue leaks dedicated content the Character was never eligible to encounter.
14. Reload cannot farm first-time responsive history/rewards or reroll hard eligibility.
15. New expressive routes automatically trigger a World event-consumer review after their semantics close.

## 22. Supersession

This v3 document consolidates and clarifies:

- `Documentation/World/Capability Responsive Event Ecology and False Identity Opportunity Pack 2026-09-10.md`
- `Documentation/World/Capability_Responsive_Event_Ecology_v2_Eligibility_and_Compound_Routes_2026-09-10.md`

Where wording conflicts, **v3 governs**.

The earlier False Identity seed pack remains valid except where v2/v3 reclassifies occurrence-level eligibility.
