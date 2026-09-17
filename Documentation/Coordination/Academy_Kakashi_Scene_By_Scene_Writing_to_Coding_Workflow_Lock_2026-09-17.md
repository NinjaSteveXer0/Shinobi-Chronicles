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

2. **Stephen reviews that exact scene.**
   - Stephen may approve, edit, or reject it.
   - No scene is production authority until Stephen approves it.

3. **Writing commits only the approved scene to GitHub.**
   - The GitHub scene file must match Stephen's approved wording.
   - No paraphrasing, compression, expansion, reordering, substitution, or additional dialogue is allowed during commit.
   - Dialogue changes require Stephen's explicit approval before GitHub write under the separate dialogue-approval guardrail.

4. **Coding implements that exact locked scene.**
   - Coding consumes the scene's exact Dialogue/Narration split and existing semantic/resolver authority.
   - Coding must not rewrite dialogue or narration while implementing.
   - Runtime bindings should use stable cue/semantic IDs rather than mutable prose wherever possible.

5. **Coding records implementation evidence for that scene.**
   - exact implementation commit;
   - source/headless/runtime checks appropriate to the scene;
   - browser evidence when the scene is player-facing and browser-verifiable.
   - Implementation is not called complete merely because the Writing file exists.

6. **Only after Coding has implemented the current scene does Writing move to the next scene.**

Binding loop:

`WRITE ONE SCENE -> STEPHEN APPROVES -> WRITE EXACT APPROVED SCENE TO GITHUB -> CODING IMPLEMENTS THAT SCENE -> RECORD EVIDENCE -> MOVE TO NEXT SCENE`

## Prohibited workflow

Do not:
- bulk-author multiple future Kakashi scenes and hand them to Coding at once;
- let Coding infer or invent missing dialogue;
- let Writing alter dialogue during commit after Stephen approval;
- let UI/presentation/localisation silently rewrite approved dialogue;
- treat a Writing commit as runtime implementation proof;
- move Writing ahead several scenes while Coding is still implementing an earlier scene;
- create replacement scene text from stale runtime prose when newer Stephen-approved scene authority exists.

## Current scene state

Scene 1 — Konoha Rooftop at Night — is locked verbatim in:

`Documentation/Story/Academy_Kakashi_Origin_Scene_01_Rooftop_Verbatim_Lock_2026-09-17.md`

Commit:
`d11aa0f4f8e1ee203d3b63cee9a1b0d2fa88ea91`

Coding should implement Scene 1 exactly before Writing advances to Scene 2.

## Authority boundary

This workflow changes coordination/order only. It does not reopen Kakashi's closed Story semantics, Structured Autonomy rules, resolver ownership, Battle ownership, Knowledge boundaries, custody logic, rewards, PL, Rank, Progression, or Chronicle history.

Where stale runtime text conflicts with the current Stephen-approved scene file, the current Stephen-approved scene file wins for player-facing expression.

## Completion condition

Academy Kakashi's Origin is complete only when every scene has passed this loop and the final scene has been implemented and validated. Only then should the Origin receive final consolidated closure/audit/handoff status.
