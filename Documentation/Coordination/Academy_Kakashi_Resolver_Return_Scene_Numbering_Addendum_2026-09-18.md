# Academy Kakashi Origin — Resolver Return Scene Numbering Addendum

**Date:** 2026-09-18  
**Owner:** Stephen / Writing / Story — Konoha  
**Status:** **STEPHEN-LOCKED ACTIVE WORKFLOW ADDENDUM**

This addendum extends:

`Documentation/Coordination/Academy_Kakashi_Scene_By_Scene_Writing_to_Coding_Workflow_Lock_2026-09-17.md`

## Binding numbering rule

A PL Battle or other owning-system resolver is not counted as a separate Story scene.

The Story scene that invokes the resolver retains its current scene number while control is handed to the owning system.

When that resolver commits its factual result and control returns to the Chronicle Interaction / Scene Board, the returned Story presentation begins as the **next Story scene number**.

Canonical pattern:

`Scene N -> owning resolver / PL Battle -> committed result -> Scene N+1`

Do **not** label the returned Story scene as `Scene N-2`, `Scene N-2A`, `Scene N Part 2`, or another continuation suffix merely because it follows the same branch.

The resolver belongs inside the originating scene's `System / Resolver` field; the post-resolver Story Board is a new scene boundary.

## Kakashi current example

Current locked branch:

`Scene 4A — STOP THE ASSASSIN`

invokes:

`PL BATTLE: Kakashi Hatake vs Masked Interceptor — 1-v-1`

After Battle commits the result, Story returns into:

`Scene 5A — post-Battle continuation`

If the Battle result creates materially different Story continuations, they remain children of Scene 5A and should use stable result-qualified identities, for example:

- `Scene 5A-W — Kakashi victory continuation`
- `Scene 5A-L — Kakashi defeat continuation`

Exact suffix vocabulary may be finalised when that scene is authored, but the parent Story number remains **5A**, not `4A-2`.

## Coding / Runtime requirement

Coding must preserve the resolver boundary explicitly:

`Scene 4A -> Battle -> committed Battle result -> same causal branch -> Scene 5A`

Do not fabricate Scene 5A content before Writing authority exists.

Do not hard-script a Story result in place of Battle.

Do not treat the Battle surface itself as another numbered Story scene.

## Preserve

- Story scene != Battle surface
- selected intent != Battle result
- Battle result != mission/Origin result automatically
- resolver return != same Story board continued invisibly
- branch continuity != scene-number continuity
- new Story Board after resolver return = next Story scene number
