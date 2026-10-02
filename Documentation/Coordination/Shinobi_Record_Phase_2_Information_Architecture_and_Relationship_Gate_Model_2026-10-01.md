# Shinobi Chronicles — Shinobi Record Phase 2 Information Architecture + Relationship Gate Model

**Date:** 2026-10-01
**Owner:** Stephen / CE / Codex / Coordination
**Status:** PHASE-2 DESIGN DIRECTION / PLAYER-FACING LAYOUT SUBJECT TO STEPHEN BROWSER TRIAL
**Alpha importance:** Shinobi Record optimisation + Codex/Achievements remain Alpha release work.

## 1. Core purpose

Shinobi Record should become the player's primary observer-safe memory and planning surface.

It is not just a log viewer.

It should answer:
- Who am I right now?
- What am I doing?
- What do I know?
- What actually happened?
- How have I developed?
- What can I legitimately pursue next?
- Who have I met and what history do we share?
- What Characters/cards/Weapons/Items/Equipment/Summons/etc. have I discovered?
- What rumours/training leads have I heard?
- What Achievements have I earned?

Preserve:

World Truth != observer Knowledge != Record presentation.

## 2. Top-level Phase-2 sections

Recommended desktop sections:

1. OVERVIEW
2. MISSIONS
3. INTELLIGENCE
4. CHRONICLE
5. DEVELOPMENT
6. CODEX
7. ACHIEVEMENTS

Do not create a separate top-level Relationship tab initially.

Relationship truth should project where it is actually useful:
- Intelligence / People = what is known about a person;
- Chronicle = shared-history occurrences;
- Development = mentor/training availability;
- Codex / Character detail = discovered representations + known relationship snapshot.

## 3. Overview — keep shell, change content hierarchy

Keep:
- Shinobi dossier / portrait identity anchor;
- current PL;
- compact recent updates;
- one-glance current state.

Replace/optimise raw/internal-style values such as machine IDs, origin_starting_purse_granted, generic repeated Opportunity Known, NEXT 1 and internal OWNED / ACTIVE.

Overview should prioritise:

Identity:
- portrait / Ninja ID;
- display name;
- formal Rank;
- Village;
- current committed team;
- Current PL;
- current location;
- Ryō;
- Energy once active.

Current Journey:
- current Story arc / mission;
- current primary objective;
- active investigation;
- one or two actionable leads;
- next known Promotion/development objective where legitimate.

What Changed:
most recent meaningful Chronicle event, Knowledge/rumour update, relationship update, development breakthrough, reward/object acquired, or newly actionable location/training/mission.

Avoid duplicating whole Intelligence and Chronicle panels on Overview.

## 4. Missions — preserve strongly

Keep:
- Mission Index;
- search;
- type/status filters;
- Current Operations;
- Known Objectives;
- Operation Brief;
- Relevant Information;
- Mission History.

Change Potential Outcomes to KNOWN STAKES / KNOWN CONSEQUENCES or equivalent.

Do not leak hidden outcomes merely because production data knows them.

Future Story missions must not be shown before the player legitimately knows them.

Mission rows must use human-readable titles, not machine IDs as primary text.

Add where useful:
- issuing source;
- known participants;
- current team/deployment context;
- known start location;
- relevant Knowledge;
- known material/relationship stakes;
- linked Chronicle history.

## 5. Intelligence — one of the strongest current sections

Keep:
- Intelligence Index;
- Knowledge Ledger;
- Source & Provenance;
- Evidence Chain;
- Technical Knowledge;
- Active Leads.

Expand categories:
- People
- Locations
- Factions
- Missions
- Threats
- Techniques
- Nature / elemental knowledge
- Bloodlines / Hosted Entities where known
- Fūinjutsu
- Kinjutsu
- Weapons / tools
- Documents
- Rumours
- Tactical methods
- Resistance/countermeasure knowledge

Support observer-safe knowledge states such as Rumour/Hint, Observed, Corroborated, Confirmed/Known, Disputed, Contradicted, and Disproven/Superseded.

Preserve source, where, method, observer, corroborating evidence, contradicting evidence and current understanding.

Do not show raw internal source IDs as the primary player-facing source label.

## 6. Chronicle — preserve as factual timeline

Keep timeline/list, filters, action status, factual outcome, important consequence, material rewards, Knowledge consequences, newly actionable, Chronicle echoes and service/recognition.

Expand each meaningful occurrence with:
- participants;
- location;
- player action/inaction;
- factual result;
- relationship/shared-history consequence;
- development consequence;
- object/provenance consequence;
- recognition/reputation consequence;
- new access/opportunity;
- linked Mission/Intelligence/Object entries.

Support filters such as Story, Formal Missions, World Events, Side Occurrences, Relationship, Training, Battle, Crafting/Creation, Discovery and Institutional/Recognition.

Do not show participants unrecorded or location unrecorded as noisy player text. Omit genuinely absent fields.

## 7. Development — major Phase-2 rebuild

Recommended Development categories:
- Stats / PL
- Discipline Development
- Nature Development
- Techniques / Technique Practice
- Bloodlines / Hosted Entities
- Resistance / Conditioning
- Weapons / Proficiency
- Fūinjutsu
- Kinjutsu
- Mentors / Training Sources
- Qualifications / Exams
- Special Jōnin / Specialisations
- Rank / Promotion Evidence
- Archived

Development Ledger shows only discovered/known/authorised paths.

Potential paths must not leak hidden content.

For one selected path, show current state, current progress, known requirements, observer-safe rumoured requirements, evidence sources, mentor/training source, recent attempts, blockers, authorised outcomes and linked Skills/qualifications where known.

Development must support the exact persistent Character being inspected.

## 8. Codex — required Phase-2/Alpha section

Codex is a discovery/collection/reference surface, not omniscient Registry access.

Initial categories:
- Characters
- Character Cards / Representations
- Weapons
- Items
- Equipment
- Summons
- Hosted Entities
- Bloodlines
- Techniques / Skills
- Creations / Provenance Objects

Prefer stable Character/person -> discovered representations/cards -> known capabilities -> shared Chronicle history -> known relationship snapshot rather than pretending every card is a separate person.

Allow the player to preview unlocked/discovered card art.

Preserve hidden/undiscovered representation safety.

## 9. Achievements

Add a dedicated Achievements section consuming existing Achievement authority.

Show unlocked, visible locked/hinted where authorised, hidden achievements without leakage, difficulty/tier, unlock Chronicle provenance and reward/claim state only where exact Rewards authority permits.

## 10. Relationships — factual evidence, not talk-count XP

No universal rule:

talk 20 times -> friendship level 20.

A relationship is directional and multi-dimensional.

A Character may trust someone without liking them, respect someone while resenting them, owe a debt without being a friend, like someone but refuse dangerous training, or rival someone while willingly training with them.

## 11. Relationship evidence receipts

Meaningful occurrences may commit exact relationship evidence.

Suggested semantic dimensions/families:
- trust;
- professional respect;
- personal openness/warmth;
- rivalry/competitive history;
- resentment/tension;
- obligation/debt;
- mentor/student history;
- protection/rescue;
- betrayal/broken promise;
- shared secret;
- shared success/failure;
- witnessed capability;
- gift history;
- institutional/family history;
- boundaries respected/violated;
- willingness/refusal.

Each receipt preserves participants, direction, occurrence, factual cause, significance class, observer visibility and any explicit authored consequence.

## 12. Significance and anti-spam

Not every conversation is relationship progression.

Suggested occurrence significance:
- contact — ordinary interaction; establishes/fills context;
- minor — small meaningful social/action fact;
- meaningful — substantive choice/shared action;
- major — high-stakes trust/rescue/betrayal/debt/etc.;
- defining — rare relationship-changing occurrence.

Repeated identical low-stakes interaction does not stack forever.

Telling Kakashi hello 20 times must not equal Kakashi trusting you with a lethal secret technique.

Duplicate/repetitive event families should saturate unless new context/history makes the occurrence materially different.

## 13. Relationship states are derived facts, not one score

CE/Relationship authority may derive qualitative states such as:
- contact established;
- professional respect established;
- trust established;
- trust damaged;
- mentor interest;
- mentor willing;
- mentor conditional;
- mentor refused;
- active rivalry;
- unresolved resentment;
- debt owed;
- secret shared;
- cooperation likely/unlikely.

These are not a linear friendship ladder.

One event may establish one state while damaging another.

## 14. Opportunity / mentor gate model

Relationship-gated opportunities should use explicit predicates.

Recommended grammar:
- requiredRelationshipFactsAll[]
- requiredRelationshipFactsAny[]
- blockingRelationshipFactsAny[]
- requiredSharedHistory[]
- requiredKnowledge[]
- requiredCapabilities[]
- requiredDevelopment[]
- requiredLocation/context
- source/mentor currently available
- currentStory/world exclusions[]

Then:

eligible possibilities -> selection/presentation -> player action -> factual result -> relationship/history update.

Do not use raw conversation count as the underlying eligibility test.

## 15. Example — Chidori training

Illustrative only; exact numbers remain specialist work.

Possible legitimate gate:
- Kakashi/Sasuke is a legitimate current trainer source;
- professional respect or formal teacher relationship exists;
- trainer willingness is not blocked;
- learner has Lightning Access;
- learner has sufficient Lightning Development;
- learner has sufficient Ninjutsu/control/Stamina;
- required prerequisite/evidence exists;
- current Story/World state permits training.

Then Chidori training route becomes available.

Not Kakashi conversation count == 20.

Not relationship score >= 75.

## 16. “What does this person think of me?”

Shinobi Record may show KNOWN IMPRESSIONS, but only when supported by player-observable evidence.

Examples:
- Kakashi respects your field judgement.
- Anko thinks your Ninjutsu has potential.
- Hinata trusts you with a private concern.
- Mikoto is still angry about your earlier decision.
- This person's current view of you is unclear.

Do not expose private internal thoughts merely because CE knows them.

A person may deliberately hide their opinion.

Record should distinguish known impression, inferred but uncertain, and unknown.

## 17. Where relationship information lives

Do not create one giant Relationship page initially.

Intelligence / People:
what you know about them + known impression.

Chronicle:
what actually happened between you.

Development:
mentor/trainer eligibility and shared training history.

Codex / Character:
discovered cards/representations + summary of known shared history / relationship state.

Overview:
only recent important relationship updates.

## 18. Gifts

Gift history belongs in Chronicle occurrence, Character relationship/shared-history detail, exact item provenance/ownership and Codex object provenance where relevant.

Gift != automatic affection score.

## 19. UI defects visible in current Phase-1 shell

Phase-2 optimisation must remove player-facing raw/internal leakage such as:
- machine event IDs as titles;
- source IDs as visible source names;
- placeholder generic Opportunity Known duplicates;
- impossible/wrong participant provenance;
- future Missions shown before legitimate Knowledge;
- empty panels that imply missing data rather than an intentionally unavailable category.

Raw IDs may remain in diagnostics/dev mode only.

## 20. Final direction

> Shinobi Record becomes the player's observer-safe memory, investigation notebook, Chronicle history, development planner and collection Codex. Relationship progression is driven by distinct meaningful shared-history evidence and explicit opportunity predicates, not repeated conversation counts or one universal friendship bar. The Record shows what the player legitimately knows about people, opportunities and development while keeping hidden truths genuinely hidden.

## 21. Chronicle social-history view — do not label it “Relationships”

Stephen prefers relationship history to live inside **CHRONICLE**, not as a gamified friendship screen.

Recommended Chronicle sub-view:

**PEOPLE IN YOUR CHRONICLE**

or equivalent final UI title.

This view is not a relationship score list.

It answers:

- Who has materially shared history with this Character?
- What happened between them?
- What do I legitimately know about where that stands?
- What important promises, debts, secrets, gifts, rivalries, training or conflict exist?

### Candidate filters

- Teammates
- Mentors / Trainers
- Allies / Contacts
- Rivals
- Family
- Former Opponents
- Institutional Contacts
- Other Recurring People

These are presentation filters, not permanent relationship labels.

One person may appear in more than one context over time.

## 22. Person shared-history dossier

Opening one person from PEOPLE IN YOUR CHRONICLE should show a compact history such as:

- first known meeting;
- major shared Story/World occurrences;
- training/mentor history;
- rescues/protection;
- conflicts/betrayals;
- promises/debts;
- gifts exchanged;
- secrets shared;
- meaningful successes/failures;
- known current impression;
- known current willingness/refusal states;
- latest significant interaction.

Do not show raw relationship vectors or hidden NPC thoughts.

## 23. Recent Chronicle events

The main Chronicle page should expose a **Recent Chronicle Events** feed.

This is the player-readable front door.

A button such as:

**VIEW FULL CHRONICLE**

opens the full searchable/filterable historical ledger.

Recent feed should prioritise significance, not mere recency spam.

A defining event from yesterday may remain above ten trivial contacts from today.

## 24. Interaction significance is an engine input

Stephen explicitly identifies interaction significance as key.

Every relationship/shared-history occurrence eligible to affect future opportunities should have an authored/derived significance class.

Suggested reusable classes remain:

- contact;
- minor;
- meaningful;
- major;
- defining.

But significance is not a numerical friendship award.

It determines:
- whether the event becomes durable relationship/shared-history evidence;
- whether repeated events saturate;
- how strongly the event may satisfy later qualitative predicates;
- whether it is prominent in Chronicle presentation.

## 25. Repetition saturation

Identical or near-identical low-stakes interactions should saturate.

Example:

- first useful training chat may establish contact/context;
- repeating the same chat twenty times does not create twenty meaningful trust receipts;
- a later chat after a major mission, failure, secret or betrayal may become materially different and therefore significant again.

Canonical rule:

**new occurrence identity != new interpersonal meaning automatically**

## 26. Relationship-gate accumulation model

Future eligibility should be driven by **evidence sets**, not point totals.

Example conceptual state for Kakashi:

- contact established;
- field capability witnessed;
- professional respect established;
- safety concern active;
- one secret kept;
- one promise broken;
- mentor interest present;
- mentor willingness conditional.

A later opportunity may ask for:

`professional_respect_established`
AND `mentor_interest`
AND `field_capability_witnessed`
AND NOT `mentor_refused`
AND required development/capability predicates.

No hidden “relationship score 73” is required.

## 27. Character Codex as a photo album

Stephen's preferred Codex presentation is visual-first.

For Characters:

**stable person entry -> photo/card album of discovered representations**

Example layout:

MIKOTO UCHIHA
- Genin Mikoto
- Sharingan Mikoto
- future Chūnin Mikoto
- future Jōnin Mikoto
- future ANBU Mikoto

Only legitimately discovered/unlocked representations appear.

The player may:
- preview full card art;
- inspect stage/role label;
- inspect known capability state;
- inspect known provenance/discovery;
- jump to shared Chronicle history.

Do not present undiscovered cards as grey silhouettes/count denominators unless exact Codex authority intentionally allows that teaser.

## 28. Codex representation families

Character album groupings may include:

- rank/stage representations;
- Bloodline/ocular activated representations;
- Hosted Entity representations;
- Transformations;
- alternate-timeline identities only when they are genuinely the same stable Chronicle person;
- costumes/presentation variants only where separately authorised.

Preserve:

`same album != same capability state`

`same character name != same stable person automatically`

`representation discovery != capability unlock`.

## 29. Codex and Chronicle cross-links

Character Codex should answer:

**What versions of this person have I discovered?**

Chronicle should answer:

**What happened between us?**

Intelligence should answer:

**What do I know about them?**

Development should answer:

**What can they teach / what capability path is known?**

These pages should cross-link rather than duplicate full datasets.


## 30. Participant Chronicle scope + living-world projection

Consume:

`Documentation/Coordination/Persistent_Participant_Chronicles_Offscreen_Autonomy_and_Chronicle_Pulse_2026-10-01.md`

The Chronicle section should support actor/scope filtering without creating a gamified Relationship tab.

Recommended scope filters include:
- My Chronicle;
- Current Team;
- People in My Chronicle;
- Teammates;
- Mentors / Trainers;
- Allies / Contacts;
- Rivals / Enemies;
- Family;
- Institutional Contacts;
- Other recurring people.

A selected person should show only:
- shared occurrences the protagonist participated in;
- known events learned through legitimate sources;
- observer-safe autonomous decisions/stances;
- known gifts/promises/debts/secrets/training;
- known current impression/stance.

Do not expose the selected person's entire private Chronicle.

## 31. Recent Chronicle decisions

The main Chronicle view should support a significance-ranked recent-events feed that may include participant-attributed actions.

Examples:
- Menma chose to pursue the courier.
- Hinata argued for the eastern trail.
- Kakashi secured the dispatch.
- The examiner recorded the Promotion result.

One factual occurrence may project several participant-attributed lines, but those projections must share the same causal occurrence rather than becoming separate contradictory history owners.

## 32. Off-screen Chronicle discovery

A persistent NPC may experience a legitimate off-screen Chronicle event without the protagonist knowing it happened.

When the protagonist later learns that fact through a legitimate source, Shinobi Record should add the new Knowledge/history projection with provenance.

Therefore:

`NPC Chronicle truth != protagonist Knowledge != Record projection`.

## 33. Person dossier history layers

When a person becomes known enough to have a Shinobi Record dossier, separate:
- LEGACY / KNOWN BACKGROUND — authorised pre-playthrough history the protagonist legitimately knows;
- SHARED CHRONICLE — occurrences the protagonist and that person experienced together;
- OTHER KNOWN CHRONICLE EVENTS — legitimate events learned through reports, witnesses, Intelligence, institutions or later disclosure;
- RUMOURS / UNCONFIRMED — claims not yet established as fact.

Do not flatten baseline history and new CE history into one undifferentiated recent-event list.

For major historical Characters, the Record should make it possible to understand who they were before the current Chronicle, subject to protagonist Knowledge.

## 34. Dossier creation != history creation

First encounter may activate a person dossier, but the person's history may already exist.

Meeting does not cause retroactive CE history generation and does not automatically reveal private history.

Record projection follows current Knowledge.

## 35. Recent/key-event limits are presentation only

UI may cap recent/key-event cards for readability, but this does not delete canonical occurrence references.

Use pagination, filters, significance ranking and reversible summaries instead of semantic eviction.

Never evict causally important history such as provenance, Promotion, awakening, death/restoration, major relationship history or Story divergence merely because a display slot is full.

## 36. Parallel Origin private-history projection

Consume:

`Documentation/Coordination/Parallel_Origin_Private_History_and_Active_Konoha_Convergence_Contract_2026-10-02.md`

A known teammate may possess a fully committed private Origin history before Team Formation.

That private history is **not** automatically a player-facing Record section.

Shinobi Record projects only what the currently inspected observer legitimately knows.

For a teammate such as Kakashi in a Menma-origin Chronicle, the Record may therefore move through states such as:

- **Known teammate** — current identity/current-team status is known;
- **Prior connection suspected** — Menma witnesses another participant recognise Kakashi;
- **Prior connection confirmed** — a legitimate source establishes that Kakashi and that person met before Team Formation;
- **Specific prior fact learned** — Kakashi, a witness, document or other legitimate source reveals an exact past action/outcome;
- **Contradicted / disputed** — later evidence conflicts with an earlier account;
- **Unknown** — private Origin facts remain hidden.

Preserve:

**private Origin history truth != protagonist Knowledge**  
**teammate current state != teammate biography**  
**dossier activation != private-history disclosure**  
**recognition reaction != full prior-event Knowledge**  
**same-person continuity != omniscient retrospective access**

A Character's private Origin ledger may remain machine-addressable for causal evaluation while completely absent from ordinary protagonist-facing Record presentation.

The preferred revelation chain is:

`private historical truth -> current observable evidence/disclosure -> bounded Knowledge -> Record projection`.


