# Shinobi Chronicles — Academy Kakashi Final Origin Expression Precedence Correction

**Date:** 2026-09-13  
**Owner:** Writing — Konoha  
**Status:** **BINDING PRECEDENCE CORRECTION — PLAYER-FACING EXPRESSION ONLY**

## Why this correction exists

Installed-browser review showed Academy Kakashi opening with the earlier benchmark text:

> The evaluator sets a sealed packet on the table between them, then slides it into the hands of a waiting logistics clerk.

That wording comes from the earlier Kakashi-only benchmark authority:

`Documentation/Story/Origin_Prologue_Screen_First_Scene_Performance_Rewrite_v2_2026-09-13.md`
commit `c774cd1582b267fb5afbc67bc3bb8556bea71449`

That file was an intermediate benchmark used to establish the screen-first performance standard.

It does **not** override the later completed 10/10 Origin package.

## Final player-facing Kakashi authority

The later and final Origin expression authority is:

`Documentation/Story/Academy_Origins_Screen_First_Player_Facing_Story_Rewrite_2026-09-13.md`
commit `a08dcf50f67d264497944af761475865dff8dc81`

For `academy_kakashi`, the Kakashi section in that file supersedes the earlier Kakashi-only v2 benchmark wherever wording differs.

Precedence for Kakashi player-facing expression is therefore:

> **Academy_Origins_Screen_First_Player_Facing_Story_Rewrite (`a08dcf...`) > Origin_Prologue_Screen_First_Scene_Performance_Rewrite_v2 (`c774cd...`) > earlier modernization/runtime prose.**

This is expression precedence only. Existing semantic IDs, choices, consequence/source-occurrence bindings, custody/intelligence facts, Battle boundaries, World Truth, Knowledge, PL/Stats, Progression, Acquisition, living-Sakumo divergence and completion semantics remain unchanged.

## Exact opening that should appear

The final `kak_brief` presentation begins with:

> The Academy evaluator lays a small route map on the table. A thumb-sized seal marks the packet.
>
> He slides both toward Kakashi.
>
> **ACADEMY EVALUATOR:** “Recover the packet.”
>
> Kakashi looks at the map once.
>
> The evaluator keeps one finger on it.
>
> **ACADEMY EVALUATOR:** “And Hatake? Bring back what you can prove. Not what you assume.”
>
> Kakashi lifts his eyes to him.
>
> **KAKASHI:** “Those are usually the same thing.”
>
> The evaluator releases the map.
>
> **ACADEMY EVALUATOR:** “Today would be a good day to learn the difference.”

If the installed browser instead begins with `The evaluator sets a sealed packet on the table between them...`, Coding is consuming the superseded Kakashi-only benchmark rather than final Origin expression authority.

## Runtime implication

Current runtime layer `runtime/alpha-origin-screen-first-33700.js` must not treat `c774cd...` as a Kakashi override over `a08dcf...`.

Coding should project the final Kakashi row from `a08dcf...` while preserving all existing semantic state and resolver boundaries.

Writing does not claim runtime application or browser Golden.
