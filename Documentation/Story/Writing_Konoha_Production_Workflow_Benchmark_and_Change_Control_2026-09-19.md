# Shinobi Chronicles — Writing / Story — Konoha Production Workflow Benchmark and Change-Control Lock

**Date:** 2026-09-19  
**Owner:** Stephen / Writing / Story — Konoha  
**Status:** **BINDING CURRENT-PRODUCTION WORKFLOW BENCHMARK — CHANGES REQUIRE SUPERIORITY**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

Stephen has explicitly approved the current Writing-chat production workflow and directed that it be:

- locked;
- benchmarked;
- preserved across successor chats;
- changed only when a proposed replacement is demonstrably superior to the current workflow.

This document captures the workflow as it is working successfully now.

It is not a prose-style document only.

It governs how Writing:

- recovers source truth;
- reasons about mechanics and Story boundaries;
- works with Stephen;
- drafts player-facing scenes;
- consumes character personality;
- handles exact assets;
- obtains approval;
- commits durable authority;
- routes implementation;
- updates stale authority;
- tracks completion status;
- avoids unnecessary architecture and issue churn.

Canonical rule:

> **Do not change a production workflow that is working merely because another process is possible.**

And:

> **A replacement must prove that it is better, not merely different.**

---

# 2. Current workflow is the benchmark

The current benchmark is the production behaviour demonstrated in the active Academy Kakashi Origin work on 2026-09-19.

Its strengths are:

- direct collaboration with Stephen;
- source-first factual recovery;
- simple explanation of complex mechanics before authoring;
- willingness to challenge convoluted or player-hostile systems;
- character-driven conversation rather than information-terminal dialogue;
- exact player-facing approval before commit;
- fast conversion of approved decisions into durable GitHub authority;
- narrow specialist routing;
- clean distinction between Story authority and implementation;
- exact asset/backdrop binding;
- state-driven branching rather than bespoke permutation explosion;
- coherent scene packages where related scenes belong together;
- minimal reopening of closed architecture;
- preservation of human/player agency;
- production momentum toward Alpha.

This benchmark is not frozen because it is perfect.

It is protected because it is currently producing good results.

---

# 3. Source-first recovery

Before substantive Writing work that depends on current project state:

1. fetch current live `main` / HEAD;
2. inspect the relevant live GitHub issue(s) and latest comments;
3. inspect current durable Story / CE / Combat / World / UI authority that materially owns the scene;
4. inspect current runtime only when implementation reality affects what Writing should author or when Stephen is diagnosing a live browser result;
5. do not trust stale SHAs, stale handoff text or project memory over current source.

Authority order remains:

> **GitHub live source > durable CE/SC documents > current specialist decisions > Project memory**

Do not broad-scan unrelated systems when the task is narrow.

Source-first does not mean deep-diving for hours into unrelated code before making a two-line Story correction.

Canonical balance:

> **Recover enough source truth to be correct, then do the actual job.**

---

# 4. Understand the player-facing problem before writing around it

When Stephen identifies a mechanic or scene that does not make sense:

- explain the current behaviour simply;
- identify whether the problem is Story, Combat, CE, Runtime, UI or a cross-lane mismatch;
- do not defend complexity merely because existing authority contains it;
- test whether the player can reasonably understand and control the mechanic;
- if the mechanic is convoluted, backwards or has no player-created path, simplify the rule at the correct authority layer rather than inventing another workaround.

Example benchmark established during current work:

Old:
`Battle victory -> hidden CONTROLLED_DEFEATED gate -> special restraint condition -> ordinary post-Battle choice`

Rejected.

Current:
`Battle victory -> player chooses RESTRAIN -> character uses a legitimate restraint method from their actual kit`

The lesson is reusable:

> **Do not make the player solve invisible implementation bookkeeping in order to express an ordinary Story intention.**

Writing may challenge another domain's presentation or semantic consequence when it creates bad player-facing Story, while respecting domain ownership of the underlying mechanic.

---

# 5. Stephen remains the exact player-facing approval gate

New or changed exact player-facing dialogue, narration, objective wording or choice wording must be shown to Stephen before Writing commits it as verbatim authority.

Workflow:

`recover source -> reason through semantics -> draft exact player-facing scene in chat -> Stephen approves/edits/rejects -> commit exactly what was approved`

After approval:

- do not silently improve the wording during GitHub write;
- do not paraphrase;
- do not compress;
- do not expand;
- do not reorder;
- do not add new dialogue;
- do not change choice wording;
- do not change backdrop binding;
- do not change objective wording.

If a later improvement is desired, show the changed player-facing material to Stephen again.

Stephen may approve:

- one scene;
- several tightly related scenes;
- a complete coherent branch package.

The workflow does **not** require artificial one-scene-only batching when a coherent group of scenes is ready, source-stable and Stephen wants to review it together.

---

# 6. Write characters as people, not state terminals

Before substantial recurring-character dialogue, consume the current personality / voice profile.

If no durable profile exists, create or extend one before treating substantial dialogue as complete.

Current core rule remains:

> **People ask questions. People answer as themselves.**

Dialogue must be filtered through:

- personality;
- age/life stage;
- current emotion;
- relationship;
- observer Knowledge;
- social posture;
- confidence;
- fear;
- irritation;
- humour;
- sympathy;
- restraint;
- institutional role;
- what the character wants from the conversation.

A factual answer may be:

- thoughtful;
- humorous;
- warm;
- dry;
- evasive;
- fierce;
- irritated;
- sympathetic;
- apathetic;
- defensive;
- unkind;
- professionally restrained;
- silent.

Do not reduce a scene to:

`question -> yes/no -> question -> yes/no`

unless that rhythm is deliberately earned.

Information-terminal dialogue is Writing RED even when every fact is correct.

---

# 7. Conversation quality benchmark

The current Kakashi / Pakkun / Package Smuggler / Masked Interceptor / AMT scenes establish the desired conversational direction:

- characters react to each other, not only to the plot;
- humour emerges from personality and circumstance;
- questions may receive answers, counter-questions, deflections or dry observations;
- supporting characters are allowed to notice one another;
- silence and timing may carry meaning;
- exposition is embedded in interaction;
- characters may disagree without turning the scene into a lecture;
- practical mission dialogue can still feel socially alive;
- a scene may be funny without becoming comedy;
- danger and professional competence are not erased by banter.

The goal is not “more dialogue”.

The goal is:

> **Dialogue that could only have been spoken by these people in this situation.**

Speaker-swap test:

If two recurring characters could exchange most of their lines without the scene feeling wrong, the scene needs more characterisation.

---

# 8. Narration benchmark

Consume the active Storywide performance authority.

Default target:

- cinematic;
- observer-bounded;
- selective;
- close enough to character perception to feel lived;
- concise where logistics are routine;
- expanded where emotion, danger, relationship or consequence matters.

Do not write admin prose.

Do not write screenplay notes disguised as prose.

Do not narrate every state transition as though the player is reading a resolver log.

System truth belongs in the System / Resolver section.

Player-facing narration should make the event feel real.

---

# 9. Story facts and expression remain separate

Preserve:

> **semantic correctness != expressive completeness**

> **Story facts closed != dialogue frozen forever**

> **expression repair != Chronicle rewrite**

Writing may improve:

- dialogue;
- narration;
- pacing;
- character reaction;
- body language;
- conversational naturalism;

without reopening closed factual semantics.

Conversely, good dialogue does not give Writing permission to invent:

- package custody;
- Battle outcomes;
- institutional authority;
- Knowledge;
- PL;
- rewards;
- Skill ownership;
- Registry facts;
- World state.

---

# 10. State-driven scenes over permutation explosion

Where multiple participant histories can converge on a common scene:

- query exact committed participant states;
- adapt presentation to the factual set;
- skip unavailable people;
- preserve exact identities;
- avoid hand-authoring one ending for every possible combination unless the combinations genuinely produce different dramatic scenes.

Current benchmark:

- field-secured captives remain exact participants;
- collection happens participant-by-participant;
- group transfer is one player intent with exact child custody facts;
- dead/escaped/released people are not silently restored;
- singular/plural wording projects from actual state.

Canonical rule:

> **Author the meaningful dramatic differences; derive the bookkeeping combinations from state.**

---

# 11. Exact capability and asset projection

Writing must use exact project assets and actual character capabilities.

For assets:

- use exact repository filename/path;
- similar-looking files are not interchangeable;
- if Stephen specifies an exact backdrop, bind that exact backdrop;
- update the durable asset inventory when a new exact binding becomes part of current Story authority.

For character actions:

- project from Skills/items/tools/capabilities the character legitimately has;
- do not invent generic equipment when a concrete owned method exists;
- do not turn capability projection into a hidden player prerequisite unless deliberately designed and approved.

Current example:

Academy Kakashi restraint:
- player chooses **RESTRAIN**;
- Kakashi uses **Wire Snare / ninja wire**;
- Wire Snare need not have been the Battle finisher.

---

# 12. Draft first; commit after approval

When exact player-facing material is new:

1. draft it in chat;
2. make the causal/system boundary clear;
3. show the exact dialogue/narration/choice wording;
4. receive Stephen's explicit sign-off;
5. commit the approved material;
6. report the exact durable commit.

Do not use GitHub as the first place Stephen discovers new dialogue.

For non-player-facing process, semantic, routing or authority corrections that Stephen has already explicitly decided, Writing may commit directly when the decision is unambiguous.

---

## 12A. Exact player-facing naming precedence

When several durable documents contain different player-facing names for the same already-established choice, **do not treat a general style / modernization document as permission to rename the current exact choice**.

Precedence for exact wording:

1. later Stephen-approved **verbatim / exact choice lock** for that scene;
2. current live implementation when it matches that later exact lock;
3. branch-specific current authority;
4. older general expression / modernization guidance.

If those sources disagree materially and precedence is not clear, STOP and notify Stephen before changing the name.

For delegated autonomous writing:

> **Preserve established exact names by default.**

Writing may still improve a name under Stephen's delegated judgement, but only when the change is consciously judged superior to the current game wording and is recorded as an intentional naming change — never accidentally inherited from an older superseded style document.

Current benchmark example:

The exact Scene 03A names are:

- **STOP THE ASSASSIN**
- **SECURE THE PACKAGE**
- **SECURE THE PACKAGE BEFORE THE ASSASSIN**
- **DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE**
- **GO AFTER THE ORIGINAL TARGET**

The older modernization alternatives do not override them.

---

# 13. Keep GitHub authority clean

After approval:

- create or update the durable authoritative document;
- mark stale conflicting authority as superseded when necessary;
- do not leave old global rules appearing active if they contradict the new rule;
- update the active route/tracker where materially useful;
- reference exact commits;
- keep provenance clear.

When a new rule is global, do not patch only the current scene and leave the reusable old rule intact.

Current benchmark example:

The hidden post-Battle control gate was removed:
- first from Kakashi;
- then globally;
- then the older reusable CE document received an explicit supersession notice;
- Coding and Combat were both routed so present and future fights consume the same rule.

---

# 14. Routing discipline

Route work to the owner that must act next.

Prefer:

- existing active issue/lane;
- one coherent implementation-ready handoff;
- exact durable authority references;
- explicit preserved boundaries.

Avoid:

- creating duplicate issues for the same implementation owner;
- creating a second runtime architecture;
- asking Coding to invent prose;
- asking Writing to solve a Combat formula;
- reopening a closed CE problem when the new task only needs to consume its result.

A handoff should state:

- what changed;
- exact authority/commit;
- what to implement;
- what not to change;
- what remains separately owned;
- current validation status.

---

# 15. Close the Writing issue when Writing is actually complete

A Writing issue is complete when:

- the requested scenes/rules are authored;
- Stephen has approved required player-facing material;
- durable authority exists on GitHub;
- exact asset bindings are recorded where required;
- implementation-ready routing has been posted.

Do not keep Writing work artificially open because Coding has not yet implemented it.

Do not call Coding implementation complete because Writing is complete.

---

# 16. Status language is mandatory

Always distinguish:

- **design closed**
- **Writing approved**
- **durable authority committed**
- **implementation complete**
- **runtime/source validated**
- **installed-browser validated**
- **Browser Golden / regression GREEN**

Never collapse these into “done”.

When Stephen asks whether something has been uploaded, implemented or tested, answer the exact layer.

---

# 17. Production momentum rule

The primary priority remains:

> **FINISH SHINOBI CHRONICLES ALPHA**

Therefore Writing should not:

- reopen settled architecture without new evidence;
- profile the entire future cast before the current scene needs them;
- perform broad speculative redesigns during a narrow fix;
- create exhaustive prose for states that can be projected;
- block a coherent scene package merely because an older process preferred smaller batches.

Do enough durable work to prevent rework.

Then move forward.

---

# 18. Workflow change-control gate

This workflow may evolve.

But a proposed replacement or modification must be **superior to the current benchmark**.

A change is not superior merely because:

- it is newer;
- another model prefers it;
- it is more formal;
- it uses more tools;
- it uses fewer tools;
- it creates more documentation;
- it creates fewer documents;
- it is theoretically cleaner;
- it is convenient for the assistant.

Before replacing a material part of this workflow, the proposed change should demonstrate improvement in one or more of:

- player-facing writing quality;
- character consistency;
- source accuracy;
- Stephen's control over exact dialogue;
- speed to approved production output;
- reduced rework;
- fewer semantic contradictions;
- clearer specialist ownership;
- less GitHub issue churn;
- better implementation usability;
- better testability;
- better successor-chat continuity;
- lower risk of stale authority;
- stronger progress toward Alpha.

And it must **not materially regress** the other benchmark strengths.

Canonical test:

> **Would Stephen reasonably prefer the proposed workflow after using both?**

If the benefit is speculative or marginal, keep the current workflow.

---

# 19. Change proposal format

For a material workflow change, state:

1. **Current benchmark behaviour**
2. **Proposed change**
3. **Specific problem it solves**
4. **Why the current workflow cannot solve that problem adequately**
5. **Expected measurable/practical improvement**
6. **What current strengths are preserved**
7. **Rollback path if the new process performs worse**

Stephen decides whether the workflow change is accepted.

Minor housekeeping that does not materially change how Writing works does not require a formal proposal.

---

# 20. Successor-chat continuity

A successor Writing chat should recover this benchmark before materially changing production process.

It should not infer that a blank/new chat means:

- restart Story architecture;
- reset voice standards;
- reopen approved semantics;
- abandon approval gates;
- revert to generic dialogue;
- return to one-scene-only batching;
- invent new handoff structures.

The current Writing workflow survives chat boundaries.

---

# 21. Relationship to older scene-by-scene workflow

This document supersedes conflicting **process constraints** in:

`Documentation/Coordination/Academy_Kakashi_Scene_By_Scene_Writing_to_Coding_Workflow_Lock_2026-09-17.md`

especially any requirement that:

- Writing may never author a coherent later scene package until Coding implements the immediately previous scene;
- only one scene may ever be reviewed/committed at a time regardless of branch coherence.

What remains valuable and still applies from that older workflow:

- exact Stephen approval for player-facing text;
- explicit Objectives;
- explicit system/resolver seams;
- durable branch identity;
- exact GitHub authority;
- Coding must not rewrite approved prose;
- implementation evidence remains separate from Writing authority.

Current successor rule:

> **Use the smallest coherent production tranche that Stephen can meaningfully review and that current authority supports.**

Sometimes that is one scene.

Sometimes it is a connected scene family.

Do not batch merely for convenience.

Do not split merely because an older process said “one”.

---

# 21A. Academy Origin implementation-readiness benchmark

For Academy Origins, this Writing workflow is now extended by:

`Documentation/Coordination/Academy_Origin_Writing_to_Coding_One_Pass_Production_Benchmark_2026-09-21.md`

commit:

`0f28abb2e255cbf5f9911aaa99d8a44ee94489a1`

Kakashi established the required production lesson:

> **Writing may review scenes incrementally with Stephen, but normal Coding implementation should begin from one stable, complete, implementation-ready Origin package rather than from a materially evolving sequence of partial scenes.**

For every remaining Academy Origin:

- author every scene with stable scene/branch IDs;
- expose exact entry predicates;
- bind exact Backdrop / Objective / Narration / Dialogue / Choices;
- state explicit System / Resolver / PL Battle seams;
- state factual reads and factual writes separately;
- map every authorised resolver/Battle result to an exact successor;
- identify save/load/idempotence identity;
- identify terminal/reward/Receipt contribution;
- publish one complete finite Origin route manifest;
- declare **ORIGIN IMPLEMENTATION PACKAGE COMPLETE** only after no implementation-critical field remains TBD;
- then route one clean implementation package to Coding.

Coding should then implement the Origin as one sustained completion campaign over the proven shared Origin runtime, build deterministic route traversal, and request one consolidated browser acceptance pass.

This does not require every Origin to have Kakashi's complexity.

The benchmark is **clarity + completeness before implementation**, not branch count.

---

# 22. Benchmark summary

The current Writing / Konoha production loop is:

`SOURCE-FIRST RECOVERY`

-> `UNDERSTAND THE PLAYER-FACING PROBLEM`

-> `CHECK DOMAIN / CE / STORY OWNERSHIP`

-> `SIMPLIFY BAD COMPLEXITY AT THE RIGHT LAYER`

-> `CONSUME PERSONALITY / VOICE / KNOWLEDGE`

-> `DRAFT THE SMALLEST COHERENT SCENE PACKAGE`

-> `SHOW EXACT PLAYER-FACING MATERIAL TO STEPHEN`

-> `STEPHEN APPROVES / EDITS / REJECTS`

-> `COMMIT EXACT APPROVED AUTHORITY`

-> `UPDATE STALE / SUPERSEDED AUTHORITY IF REQUIRED`

-> `ROUTE ONE CLEAN IMPLEMENTATION HANDOFF`

-> `CLOSE WRITING WHEN WRITING IS COMPLETE`

-> `TRACK IMPLEMENTATION / RUNTIME / BROWSER STATUS SEPARATELY`

---

# Final lock

> **The current Writing workflow is the benchmark.**

> **Preserve what is working: source accuracy, direct collaboration, character-driven conversation, exact approval, clean durable authority, narrow routing and production momentum.**

> **Changes are allowed only when they can demonstrate that they are superior to the current benchmark without materially degrading its strengths.**

> **Different is not better. More formal is not better. More complex is not better. The replacement must actually work better.**
