# Shinobi Chronicles — Menma Battle System Global Shared Origin Battle Authority

**Date:** 2026-09-29  
**Owner:** Stephen / CE / Codex / Coordination  
**Status:** **LOCKED SHARED BATTLE-SYSTEM AUTHORITY — CODING IMPLEMENTATION REQUIRED**  
**Primary priority:** Finish Shinobi Chronicles Alpha.

## 1. Owner ruling

Stephen has confirmed that the Battle System now proven through Academy Menma's Origin is **not a Menma-only presentation experiment**.

It is the current Shinobi Chronicles Battle System.

Therefore:

> **Menma is the current player-facing Battle-System benchmark. Other applicable Origin PL Battles must consume the same shared Battle presentation/runtime system rather than falling back to older duel/card layouts or Origin-local Battle presentation variants.**

This does not make Menma's encounter semantics global.

The global rule is:

> **Promote the shared Battle shell and interaction contract. Preserve encounter-specific Combat/Story semantics.**

## 2. Current source finding

Current shared presentation owner:

`runtime/alpha-battle-modern-33000.js`

Current Menma encounter semantic owner:

`runtime/alpha-menma-evolved-pl-battle-36900.js`

The shared owner already contains:

- Formation Stage;
- adaptive formation modes;
- Active + supporting participant projection;
- frameless Battle portrait projection;
- Battle PL presentation;
- Skills / Items / Summons action dock;
- persistent Skill inspection/details;
- ordered action-presentation queue;
- actor -> action -> target -> result -> PL change presentation;
- shared terminal presentation/Story-return gating;
- environment projection;
- target highlighting;
- Battle ticker / status presentation;
- support relay / formation refresh presentation;
- duel / wedge / arc layout families.

However current source still contains several presentation rules gated specifically behind:

`data-evolved-pl-proof="menma_three_subjects"`

That gate is now historical implementation scaffolding, not product authority.

Menma-specific styling or logic may remain scoped only where it is genuinely specific to the Menma encounter.

## 3. What is globally shared

Every applicable Shinobi Chronicles PL Battle must use the current shared Battle System for the player-facing Battle surface.

At minimum this means:

### Battle stage

- actual environment backdrop when one is authored;
- central confrontation;
- frameless Battle portraits;
- no collectible Character Card rendering inside Battle;
- Active combatants visually dominant;
- supporting/Benched participants recessed;
- adaptive layout based on actual participant count;
- no fake support slots for a true duel.

### Formation

Use the shared Formation Stage.

Expected presentation families include:

- **DUEL** — one active participant per side;
- **SQUAD WEDGE** — multi-participant team formation;
- **ARC / other approved adaptive formation** where current shared owner legitimately selects it.

The shared system decides presentation from deployed participants. An Origin must not recreate a separate visual Battle shell because its encounter has only one opponent.

### Action interface

Use the shared bottom action dock:

- **SKILLS**
- **ITEMS**
- **SUMMONS**

Use the current shared Skill deck / Skill inspector behavior.

The menu may expose only legal actions for the exact encounter, but the shell remains shared.

### PL presentation

Use the current radial Battle PL presentation and shared PL updates.

Battle PL presentation must consume authoritative Battle truth and must not become an Origin-local numeric owner.

### Action presentation

Committed Battle actions must be presented through the shared ordered presentation path:

`ACTOR -> ACTION -> TARGET -> IMPACT / RESPONSE -> RESULT -> PL CHANGE -> SETTLE`

The presentation queue consumes committed truth. It does not resolve Combat.

### Terminal transition

The final committed Battle action/result must be visibly exposed before Story return.

Origin-specific post-Battle Story destination remains owned by the Origin/Story caller.

### Player names / enemy names

Preserve current Battle naming authority:

- player-side collectible character names may remain suppressed where current shared presentation requires;
- enemies/NPC opponents use the authorised observer-facing display identity;
- hidden identity must not leak through Battle presentation.

## 4. What remains Menma-specific

Do **not** globalise:

- Anko as a Guest Ally;
- Guest Ally control semantics beyond their reusable contract;
- Altered -> Brute -> Unstable encounter order;
- `stop_three_test_subjects`;
- Menma's Scene 7 authored yield;
- MEN-03;
- Menma's 100-Ryō whole-encounter reward;
- `forest_clearing_day.png` as a universal environment;
- Menma-only Skill packages;
- Menma-specific Story return beats;
- Menma-specific Battle occurrence IDs;
- `data-evolved-pl-proof="menma_three_subjects"` as a prerequisite for receiving the shared Battle System.

Reusable participant-control law remains reusable where another encounter legitimately uses the same participant class. Menma's exact participant arrangement is not copied.

## 5. Origin application

Current Academy Origin PL Battles must not regress to older Battle presentation merely because their semantic resolver is Origin-specific.

This applies to applicable Battles including, but not limited to:

- Kakashi Origin Battles;
- Menma Origin Battle;
- Wasabi / Izuno Rogue Genin Battle;
- Mirai disguised-instructor PL Battle;
- Metal controlled spar;
- Iwabee Battle where present;
- any other Academy Origin PL Battle currently in Alpha.

The exact Combat package, opponent identity, rewards, Story caller/return and consequence rules remain encounter-specific.

### Frozen Origins

A frozen Origin is not reopened by a shared Battle-System projection update.

Kakashi / Hinata / Menma or any other frozen Origin remains frozen at Origin-local Story/content level.

A global Battle-System correction may flow through shared Battle presentation provided:

- no frozen Story prose/choice/route is rewritten;
- no Combat semantics are changed without owner authority;
- frozen Origin regression remains GREEN;
- installed-browser acceptance is preserved/retested where the shared change affects the Battle surface.

## 6. No copy-paste Battle systems

Coding must not create:

- `metal-battle-ui-v2`;
- `mirai-modern-battle`;
- `wasabi-menma-style-battle`;
- or any equivalent Origin-specific copy of the Menma visual shell.

Canonical ownership remains:

`battle.presentation.shared`
-> `runtime/alpha-battle-modern-33000.js`

Origin Battle modules provide semantic/configuration inputs to the shared owner.

One responsibility -> one production owner.

## 7. Remove accidental Menma-only presentation gating

Coding must audit every current use of:

`data-evolved-pl-proof="menma_three_subjects"`

and classify each gated behavior as:

1. **SHARED BATTLE SYSTEM** — move/generalise under the ordinary Formation Stage/shared Battle contract; or
2. **GENUINELY MENMA-SPECIFIC** — retain scoped to Menma with an explicit reason.

Examples likely shared unless evidence proves otherwise:

- frameless active/support presentation;
- clean central confrontation;
- readable performance/action receipt;
- stable action movement/presentation;
- selected-target visual cleanup where it reflects general Battle UX;
- formation-stage actor/target presentation behavior.

Examples genuinely Menma-specific:

- exact Menma relay choreography;
- exact Menma action-movement offsets if required by that participant arrangement;
- Menma proof/debug markers.

Do not mechanically delete the marker. Remove its product-level authority.

## 8. Coding migration strategy

This is a shared-system propagation task, not an Origin rewrite.

Preferred implementation:

1. preserve current `alpha-battle-modern-33000.js` as the canonical shared owner;
2. identify Menma-only accidental gates in shared presentation;
3. promote shared behaviors into ordinary Formation Stage behavior;
4. ensure each Origin Battle launches/deploys enough authoritative participant/environment data for 33000 to project correctly;
5. remove/fix Origin-specific presentation fallbacks that bypass the shared owner;
6. keep encounter semantic modules scoped to semantics/configuration;
7. run focused Battle-system QA;
8. run one relevant Origin regression matrix;
9. produce one coherent PR #417 candidate for Stephen to retest.

This task should use the Owner-Reported Surgical Patch Fast Lane where compatible:
one bounded tranche -> one candidate -> one owner retest.

## 9. Acceptance matrix

Before Coding may claim this propagation complete, installed-browser evidence must show at least:

### Menma
- remains visually/behaviorally at current accepted Battle-System standard;
- no regression.

### One ordinary duel
For example Mirai or Metal:
- same shared Battle shell;
- environment;
- frameless Battle portraits;
- duel composition;
- shared Skills / Items / Summons dock;
- radial PL;
- shared Skill inspector;
- shared action presentation;
- correct terminal return.

### One non-Menma multi-participant Battle
Where an Alpha Origin currently has one:
- shared formation presentation;
- Active/support relationships projected correctly;
- no fallback to old cards/panels.

### Existing Golden/frozen protection
- Kakashi regression remains GREEN if shared Battle code affects it;
- no Story/route/reward semantic mutation.

## 10. Status law

Do not collapse:

`Menma Battle accepted`
!=
`global Battle System propagated`

and:

`shared Battle renderer exists`
!=
`every Origin actually consumes it correctly`

and:

`CI GREEN`
!=
`Stephen installed-browser Battle-System acceptance`

Current project state after this ruling:

- Menma establishes the Battle-System benchmark: **YES**
- global shared Battle owner exists: **YES**
- global Origin consumption is proven: **NO**
- Coding migration/repair required: **YES**
- global Battle-System Golden: **NOT YET**

## 11. Final lock

> **The Battle System visible in Academy Menma's current Origin is the Shinobi Chronicles Battle System, not a Menma-only feature set. All applicable Origin PL Battles must consume the canonical shared Battle presentation owner and present through the same Formation Stage, Battle portraits, adaptive duel/wedge layout, radial Battle PL, Skills/Items/Summons dock, Skill inspector, ordered action presentation and terminal-settle contract. Menma-specific encounter semantics remain Menma-specific. Coding must generalise accidental Menma-only presentation gates rather than copying the Battle shell into each Origin.**
