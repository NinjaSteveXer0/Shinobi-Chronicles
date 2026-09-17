# Academy Kakashi Scene-by-Scene Writing -> Coding Workflow Lock

Status: **STEPHEN-LOCKED ACTIVE WORKFLOW — DO NOT BYPASS**

Date: 2026-09-17

Purpose: establish the only allowed production workflow for completing Academy Kakashi's Origin from this point forward.

## Binding workflow

Kakashi's Origin will be completed **one scene at a time**.

For each scene, the required order is:

1. **Writing authors exactly one scene.**
   - Dialogue and Narration/Action must be clearly separated.
   - Existing approved dialogue must be preserved verbatim unless Stephen has explicitly approved a replacement.
   - Do not author later scenes in the same production handoff.
   - If the scene contains a player choice, every choice branch must be explicitly labelled in the scene authority before GitHub write.

2. **Stephen reviews that exact scene.**
   - Stephen may approve, edit, or reject it.
   - No scene is production authority until Stephen approves it.
   - If the scene contains choices, Stephen is approving both the exact player-facing choice wording and the branch labels used to track each continuation.

3. **Writing commits only the approved scene to GitHub.**
   - The GitHub scene file must match Stephen's approved wording.
   - No paraphrasing, compression, expansion, reordering, substitution, or additional dialogue is allowed during commit.
   - Dialogue changes require Stephen's explicit approval before GitHub write under the separate dialogue-approval guardrail.
   - Choice branches must be written as separately labelled continuations; do not bury or merge sibling branches in prose.

4. **Coding implements that exact locked scene.**
   - Coding consumes the scene's exact Dialogue/Narration split and existing semantic/resolver authority.
   - Coding must not rewrite dialogue or narration while implementing.
   - Runtime bindings should use stable cue/semantic IDs rather than mutable prose wherever possible.
   - Choice branch labels/IDs are tracking identity only; player-facing choice text remains the approved choice wording.

5. **Coding records implementation evidence for that scene.**
   - exact implementation commit;
   - source/headless/runtime checks appropriate to the scene;
   - browser evidence when the scene is player-facing and browser-verifiable;
   - exact branch coverage for every choice branch contained in that scene.
   - Implementation is not called complete merely because the Writing file exists.

6. **Only after Coding has implemented the current scene does Writing move to the next scene.**

Binding loop:

`WRITE ONE SCENE -> LABEL EVERY CHOICE BRANCH -> STEPHEN APPROVES -> WRITE EXACT APPROVED SCENE TO GITHUB -> CODING IMPLEMENTS THAT SCENE + ITS BRANCHES -> RECORD EVIDENCE -> MOVE TO NEXT SCENE`

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

## Completion condition

Academy Kakashi's Origin is complete only when every scene has passed this loop, every choice branch is durably labelled and implemented, and the final scene has been implemented and validated. Only then should the Origin receive final consolidated closure/audit/handoff status.
