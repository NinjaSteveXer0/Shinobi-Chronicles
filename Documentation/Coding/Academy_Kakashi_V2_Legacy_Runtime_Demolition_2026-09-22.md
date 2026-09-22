# Academy Kakashi V2 — Legacy Runtime Demolition Record

**Date:** 2026-09-22  
**Owner:** Coding / Runtime  
**Status:** **IMPLEMENTED ON REBUILD BRANCH — LEGACY KAKASHI EXECUTION REMOVED; V2 NOT YET IMPLEMENTED; BROWSER GOLDEN NOT CLAIMED**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

This record marks the deliberate removal of the accumulated Academy Kakashi runtime stack before the clean-room V2 rebuild.

The reason is architectural, not narrative:

- current durable Academy Kakashi Writing remains authoritative;
- current Combat, reward, custody, Knowledge and CE contracts remain authoritative;
- approved assets remain available;
- the old browser/runtime implementation is **not** retained as implementation authority.

The rebuild must consume durable authority directly instead of layering another patch over the retired runtime.

## 2. Preserved authority

The demolition does **not** reopen or delete current design authority.

Preserved inputs include, at minimum:

- `Documentation/Story/Academy_Kakashi_100_Percent_Writing_Path_Variation_Audit_2026-09-20.md`
- `Documentation/Story/Academy_Kakashi_Origin_100_Percent_Writing_Closure_2026-09-20.md`
- `Documentation/Story/Academy_Kakashi_Post_Battle_Disposition_Simplification_2026-09-19.md`
- `Documentation/Coordination/Global_Post_Battle_Disposition_Player_Agency_and_Control_State_Simplification_2026-09-19.md`
- `Documentation/Coordination/Field_Secured_Participant_Persistence_Collection_and_Group_Transfer_Contract_2026-09-19.md`
- `Documentation/Coordination/Neutral Story Decision Realisation Runtime Contract 2026-09-14.md`
- `Documentation/Combat/SC_Combat_Academy_Kakashi_Origin_Battle_Config_Composition_Gap_Addendum_2026-09-15.md`
- `Documentation/World/Academy Kakashi Origin Choice Battle Reward and Development Audit v1 2026-09-15.md`
- `Documentation/UI/Chronicle Interaction Interactive Scene Board Addendum 2026-09-13.md`

Approved Academy Kakashi assets and backdrop assets are retained.

## 3. Retired implementation

The branch removes the entire `runtime/alpha-kakashi-*.js` production family that had accumulated across generations 33800–35950, including:

- original-origin restoration;
- Kakashi-specific Scene Board polish / compatibility;
- final adapter / guard / factual binding layers;
- battle-deployment, battle-interaction and reward adapters;
- substitution and Pakkun interception patches;
- terminal/debrief scene-board patches;
- Scene 03A / 04A / 05A / 06A continuation patches;
- W2C endings;
- immediate custody / deterministic kill / loss-ending / post-MI pursuit patches;
- Konoha closure, field-secured, move-closer, dynamic-terminal and browser-acceptance layers.

The corresponding architecture-specific Kakashi QA files and dedicated Kakashi workflow files are also removed.

## 4. Shared-owner cleanup

Shared systems remain in production, but Kakashi-specific ownership embedded inside them is removed.

Changes include:

- `runtime/alpha-origin-scenes-32900-c.js` no longer registers a Kakashi scene package;
- `runtime/alpha-origin-scenes-32900-integrator.js` preserves the stable `academy_kakashi` identity/mapping but fails closed with `academy_kakashi_v2_pending` while V2 is absent;
- `runtime/alpha-origin-choice-reaction-33510.js`, `runtime/alpha-early-story-modernization-33600.js` and `runtime/alpha-origin-screen-first-33700.js` no longer patch Kakashi;
- `runtime/alpha-story-scene-board-33900.js` is restored to generic Scene Board ownership and contains no embedded Kakashi actors, cues, routes or assets;
- `runtime/alpha-story-decision-realisation-34000.js` remains a neutral semantic core and no longer owns a Kakashi loader;
- `runtime/alpha-traversal-bridge-33200.js` loads the generic Scene Board directly rather than routing through the retired 33800 Kakashi layer;
- the ANBU/ROOT Knowledge hardening module no longer contains a terminal Kakashi loader;
- unrelated workflows no longer trigger on retired Kakashi files.

## 5. Temporary player-facing state

Until V2 is implemented, choosing `academy_kakashi` must fail closed rather than execute any surviving legacy route.

Expected dispatcher result:

```text
success: false
reason: academy_kakashi_v2_pending
```

This temporary gap is deliberate. It is preferable to running a partially demolished or accidentally resurrected legacy implementation.

## 6. Regression gate

`tools/qa_kakashi_v2_legacy_exclusion.js` is the demolition regression.

It proves source/headless facts including:

- every retired Kakashi runtime file is absent;
- no production runtime file references the retired `runtime/alpha-kakashi-*` chain;
- the legacy 32900 Kakashi scene registration is absent;
- the generic Scene Board contains no embedded Kakashi authority;
- the neutral Story Decision core contains no Kakashi adapter loader;
- the traversal chain does not load retired 33800;
- durable V2 input documents remain present.

## 7. Status semantics

At this checkpoint:

`legacy Kakashi runtime demolished` = **implemented**

`shared owners restored / fail-closed gap installed` = **implemented**

`demolition source/headless regression` = **must be GREEN before merge**

`Academy Kakashi V2 runtime` = **not implemented yet**

`installed-browser Browser Golden` = **not claimed**

This record creates no new Story, Combat, reward, PL, custody, Knowledge, Progression, Acquisition or presentation semantics.
