# Academy Kakashi Scene-by-Scene Writing -> Coding Workflow Lock

> **2026-09-19 PROCESS SUPERSESSION NOTICE**  
> The current production workflow is now governed by:
> `Documentation/Story/Writing_Konoha_Production_Workflow_Benchmark_and_Change_Control_2026-09-19.md`
> commit `2f32fe97394602d76ba7d4da4482b25359929b7e`.
>
> This older document remains authoritative for exact approval gates, Objective/System-Resolver visibility, branch identity, verbatim GitHub commits and Coding non-rewrite boundaries.
>
> It is superseded where it requires artificial one-scene-only batching or forbids Writing from authoring a coherent connected scene family before Coding implements the immediately previous scene. Current rule: use the smallest coherent tranche Stephen can meaningfully review and current authority supports.

Status: **STEPHEN-LOCKED ACTIVE WORKFLOW — DO NOT BYPASS**

Date: 2026-09-17

Purpose: establish the only allowed production workflow for completing Academy Kakashi's Origin from this point forward.

## Required scene description fields

Every Kakashi Origin scene presented to Stephen must use these six production fields:

1. **Backdrop**
2. **Objective**
3. **Narration**
4. **Dialogue**
5. **System / Resolver**
6. **Choices**

`Objective` is the exact current top-right Story objective projected from the committed scene state. Writing must actively check whether the objective changes during or after each scene rather than carrying stale objective text forward automatically.

If a scene changes the factual mission state enough to change the objective, the scene authority must identify the exact change point and the new exact player-facing objective wording.

Current Kakashi objective continuity lock:

- after Kakashi opens the ANBU envelope on the rooftop, the objective is: **Stop the package from falling into the wrong hands.**
- when ANBU Marked Target hands the package to Package Smuggler, the objective changes to: **Retrieve the package.**

The Objective display is presentation of current Story state. It does not manufacture new Story facts, custody, success, failure, or branch resolution.

`System / Resolver` is the mandatory explicit audit field for any scene-owned transition into or through another gameplay/system owner. It exists specifically so Writing cannot accidentally omit a PL Battle, resolver call, Skill check, investigation resolution, travel transition, acquisition step, disposition resolver, or other owning-system seam that the scene requires.

For every scene, Writing must actively inspect current authoritative branch semantics and state one of:

- the exact required **PL BATTLE** package / participants / format where Battle owns the next resolution;
- the exact named resolver or owning-system seam where another system owns the factual result;
- `None.` only when no external system/resolver is required at that point.

A scene must not be approved or committed with `System / Resolver: None.` merely because the prose reads smoothly if current authority requires a PL Battle or another resolver.

Where turn count, custody, pursuit eligibility, participant state, Battle return, or later branch availability depends on the resolver result, the scene authority must state that dependency without inventing the result.

## Binding workflow

Kakashi's Origin will be completed **one scene at a time**.

For each scene, the required order is:

1. **Writing authors exactly one scene.**
   - Backdrop, Objective, Narration, Dialogue, System / Resolver, and Choices must be clearly separated.
   - Dialogue and Narration/Action must be clearly separated.
   - Existing approved dialogue must be preserved verbatim unless Stephen has explicitly approved a replacement.
   - The current Objective must match committed Story state, and any objective change must be explicitly identified at the exact causal point where it becomes true.
   - Writing must check current authority for any PL Battle, resolver, Skill check, investigation, travel, acquisition, disposition, or other system seam before presenting the scene.
   - Do not author later scenes in the same production handoff.
   - If the scene contains a player choice, every choice branch must be explicitly labelled in the scene authority before GitHub write.

2. **Stephen reviews that exact scene.**
   - Stephen may approve, edit, or reject it.
   - No scene is production authority until Stephen approves it.
   - Stephen is also approving the exact Objective wording and any objective-change point included in the scene.
   - Stephen is also approving the explicit System / Resolver seam shown for the scene.
   - If the scene contains choices, Stephen is approving both the exact player-facing choice wording and the branch labels used to track each continuation.

3. **Writing commits only the approved scene to GitHub.**
   - The GitHub scene file must match Stephen's approved wording.
   - No paraphrasing, compression, expansion, reordering, substitution, or additional dialogue is allowed during commit.
   - Dialogue changes require Stephen's explicit approval before GitHub write under the separate dialogue-approval guardrail.
   - Objective wording/change points must be preserved exactly as approved.
   - System / Resolver requirements must be preserved exactly as approved and may not be omitted during commit.
   - Choice branches must be written as separately labelled continuations; do not bury or merge sibling branches in prose.

4. **Coding implements that exact locked scene.**
   - Coding consumes the scene's exact Backdrop/Objective/Narration/Dialogue/System-Resolver/Choices authority and existing semantic/resolver authority.
   - Coding must not rewrite dialogue, narration, or objective wording while implementing.
   - Coding must enter the exact authorised PL Battle / resolver seam rather than inferring a different outcome directly in Story code.
   - Runtime bindings should use stable cue/semantic IDs rather than mutable prose wherever possible.
   - Objective projection must update only from the authorised committed Story state/change point.
   - Choice branch labels/IDs are tracking identity only; player-facing choice text remains the approved choice wording.

5. **Coding records implementation evidence for that scene.**
   - exact implementation commit;
   - source/headless/runtime checks appropriate to the scene;
   - browser evidence when the scene is player-facing and browser-verifiable;
   - exact branch coverage for every choice branch contained in that scene;
   - objective projection/change evidence where the scene changes the objective;
   - exact Battle/resolver entry + return evidence where the scene invokes another owning system.
   - Implementation is not called complete merely because the Writing file exists.

6. **Only after Coding has implemented the current scene does Writing move to the next scene.**

Binding loop:

`WRITE ONE SCENE -> CHECK CURRENT OBJECTIVE / OBJECTIVE CHANGE -> CHECK REQUIRED PL BATTLE / RESOLVER / SYSTEM SEAM -> LABEL EVERY CHOICE BRANCH -> STEPHEN APPROVES -> WRITE EXACT APPROVED SCENE TO GITHUB -> CODING IMPLEMENTS THAT SCENE + ITS BRANCHES + SYSTEM SEAM -> RECORD EVIDENCE -> MOVE TO NEXT SCENE`

## Choice-branch labelling rule

Every Kakashi Origin choice point must expose two separate identities in the durable scene authority:

1. **Stable branch label / tracking ID** — used by Writing, Coding, QA, save/load diagnostics, and later audit to identify the branch without relying on mutable prose.
2. **Exact player-facing choice text** — the wording the player actually sees and selects.

Recommended scene-document format:

`SCENE_## / CHOICE_## / BRANCH_[A|B|C...] — <short semantic branch name>`

followed by:

`Player-facing choice: <exact approved wording>`

Example shape only:

`SCENE_03 / CHOICE_01 / BRANCH_A — Observe Exchange`

`Player-facing choice: WATCH THE EXCHANGE`

The branch label is not automatically player-facing text. It is durable production identity.

Rules:
- every sibling choice gets its own branch label;
- branch labels remain stable once approved unless Stephen explicitly authorises a rename;
- changing player-facing wording does not silently change branch identity;
- changing branch identity does not silently rewrite player-facing wording;
- a branch that later splits again receives child branch labels rather than overwriting the parent;
- Coding must preserve the same branch identity through resolver, Battle, return, debrief, Chronicle Receipt, save/load and QA evidence where that branch remains causally relevant;
- no sibling branch may be collapsed merely because two branches later reconverge;
- branch labels must appear in the GitHub scene file before Coding implements the choice point.

## Prohibited workflow

Do not:
- bulk-author multiple future Kakashi scenes and hand them to Coding at once;
- let Coding infer or invent missing dialogue;
- let Writing alter dialogue during commit after Stephen approval;
- let UI/presentation/localisation silently rewrite approved dialogue;
- carry an old Objective forward after committed Story state has changed it;
- let CE/UI invent a new Objective without exact Story authority;
- omit a PL Battle or resolver because it was not mentioned in the prose draft;
- replace an owning-system resolution with a hard-scripted Story outcome;
- label `System / Resolver` as `None.` without checking current branch authority first;
- treat a Writing commit as runtime implementation proof;
- move Writing ahead several scenes while Coding is still implementing an earlier scene;
- create replacement scene text from stale runtime prose when newer Stephen-approved scene authority exists;
- create an unlabeled choice branch;
- use player-facing button text as the only branch identity;
- merge, rename, or repurpose an approved branch ID without Stephen approval.

## Current scene state

Scene 1 — Konoha Rooftop at Night — is locked verbatim in:

`Documentation/Story/Academy_Kakashi_Origin_Scene_01_Rooftop_Verbatim_Lock_2026-09-17.md`

Commit:
`d11aa0f4f8e1ee203d3b63cee9a1b0d2fa88ea91`

Scene 1 contains no player choice, so no branch label is required inside Scene 1.

Coding should implement Scene 1 exactly before Writing advances to Scene 2.

## Authority boundary

This workflow changes coordination/order only. It does not reopen Kakashi's closed Story semantics, Structured Autonomy rules, resolver ownership, Battle ownership, Knowledge boundaries, custody logic, rewards, PL, Rank, Progression, or Chronicle history.

Where stale runtime text conflicts with the current Stephen-approved scene file, the current Stephen-approved scene file wins for player-facing expression.

Where an approved branch label conflicts with a stale runtime-only label, the current Stephen-approved scene authority wins for branch tracking identity.

Where a stale runtime Objective conflicts with the current approved committed Story state, the approved objective-change authority wins for player-facing projection.

Where prose presentation conflicts with an already-closed owning-system seam, the owning-system seam remains binding; Writing must expose it in the System / Resolver field rather than write around it.

## Completion condition

Academy Kakashi's Origin is complete only when every scene has passed this loop, every choice branch is durably labelled and implemented, every Objective transition is projected from the correct committed Story state, every required PL Battle/resolver seam is explicitly captured and consumed, and the final scene has been implemented and validated. Only then should the Origin receive final consolidated closure/audit/handoff status.
