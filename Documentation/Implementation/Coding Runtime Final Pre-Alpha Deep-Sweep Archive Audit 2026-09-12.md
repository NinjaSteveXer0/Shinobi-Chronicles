# Shinobi Chronicles — Coding / Runtime Final Pre-Alpha Deep-Sweep Archive Audit

Date: 2026-09-12  
Owner: Coding / Runtime archive archaeology  
Repository: `NinjaSteveXer0/Shinobi-Chronicles`

This document records the final pre-archive Coding/Runtime archaeology against live GitHub authority. It preserves the required state distinctions:

`design closed != durable authority != implemented != source/headless validated != browser validated != Golden`

It is not permission to reopen closed architecture or to infer implementation from documentation.

## A. CURRENT LIVE SOURCE CHECKPOINT

### Audited main/source baseline

- audited `main` HEAD before this documentation-only audit commit: `66607e8a8a6bf3b7460528ff8dba8633773a8ead` (`more backdrops`)
- audited HEAD tree: `488b31c216d418d603b223075de4146188d38ff9`
- current runtime-bearing `game.js` commit: `51f6d71847224998fc0178e8fc89e0b378018ce5` (`22500-27499`, 2026-09-11)
- `game.js` blob at audited HEAD: `9a95e018ac76b993c22b62ed6aa02be5520e97b1`
- `index.html` blob at audited HEAD: `b93542cc88bd78bec02efc95125ca85fe7d68625`
- `style.css` blob at audited HEAD: `bf1d044b7a4920f46073bad2b8c25847dffee843`
- `ALPHA_PLAYABILITY_MATRIX.txt` blob: `2cd14b708ba8ae8af653e7c8bcdc1a17a6232c19`
- `REVISION_MANIFEST.txt` blob: `70a5e0eabaab9a901c06662d2f7a9ba5aa363564`

### Lineage result

`game.js` at runtime commit `51f6d718...` has the same Git blob `9a95e018...` as audited HEAD `66607e8...`. Therefore later commits through the audited checkpoint did not silently replace the runtime JavaScript. Known authority commits checked from the audit prompt — Arc-2 selective restoration `a89f26f...`, Arc-1 M11/M12 contract `59b18d8...`, and Genin-v2 policy `61d7c3e...` — remain reachable from current `main` lineage.

No current evidence was found of a later Coding implementation commit becoming unreachable from `main`. Historical workspace checkpoints that named older game blobs are superseded by this live source check.

### Current validation checkpoint

The latest runtime-bearing manifest records:

- `node --check game.js`: PASS
- `runAlphaSurfaceTruthMonsterDiagnostics()`: PASS
- prior `BRICKS 12500–22499` monster: PASS
- Issue #32 regression: PASS
- World Map v2 regression: PASS
- Exams / Practical code-owned surface regression: PASS
- Battle presentation regression: PASS
- World Activity read-only projection checks: PASS
- Victory strict portrait / explicit exit checks: PASS
- Mission conductor checks: PASS
- `FULL_FRESH_ARC1_M1_TO_M12_PASS`: PASS
- live population after Teen Nagato retirement: `97 Characters + 18 Entities = 115`

Validation class: **source/static + deterministic/headless GREEN at the unchanged runtime blob**.

Production-browser / installed-browser Golden is explicitly **NOT CLAIMED**. The old runtime package reported its Chromium environment hanging; that is neither a game PASS nor game FAIL.

## B. ALPHA BLOCKERS — SEND NOW

### 1. Academy Menma tutorial active projection — GitHub #111

**System:** Battle / Academy tutorial / active Skill projection  
**Problem:** #111 was created at 2026-09-11 08:21Z, after the latest runtime-bearing commit at 06:27Z. Current source contains the new ordinary five Skill definitions, but also retains the older Kurama-gated Academy Menma mapping; the stable policy ID `alpha_combat_content_projection_v1_2026_09_11` is absent from current `game.js`. Therefore exact initial action-bar activation/supersession is not demonstrated by current source.  
**Current state:** durable authority GREEN; catalogue definitions PARTIAL; exact runtime consumer/19-regression package UNPROVEN.  
**Evidence:** `Documentation/Combat/SC_Combat_Academy_Menma_Tutorial_Start_State_and_Alpha_Active_Content_Slice_2026-09-11.md`, commit `58c26639a8e7ccec3bdf8d1ea56df5ecfbd4009f`, issue #111.  
**Owner:** Coding / Runtime.  
**Next action:** implement/verify the exact five-action prepared tutorial surface and Alpha-active content projection; prove the three Kurama-gated actions are absent initially; save/load; then browser proof. Do not add Basic Attack/Guard.

### 2. Konoha World Info / marker grammar / Story locator / executable opportunities — GitHub #112

**System:** World runtime  
**Problem:** #112 was created at 08:25Z after the last runtime commit. Current `game.js` contains neither `sc.worldInfoProjection.v1` nor `sc_world_alpha_activation_konoha_v1_2026_09_11`.  
**Current state:** durable authority GREEN; implementation RED.  
**Evidence:** `Documentation/World/Alpha Village Region Info Marker Story Locator and Executable Activation Package 2026-09-11.md`, commit `6d4f4dfaf7e93046ae1bc7ee1b9038cb6c8e6c26`, issue #112.  
**Owner:** Coding / Runtime.  
**Next action:** consume the consolidated Konoha package through existing World systems; preserve zero hidden denominator/DOM leakage, committed-event no-reroll, exact Story locator semantics and capability-responsive eligibility.

### 3. Genin candidate v2 + persistent incomplete roster reservation — existing GitHub #63

**System:** Academy→Genin roster transition / Acquisition / CE preparation  
**Problem:** current source still pins `alpha_genin_roster_first_production_content_v1`; `alpha_genin_roster_first_production_content_v2`, `reservedGeninVariantIds`, and the newer persistent-incomplete reservation fields are absent.  
**Current state:** v1 machinery implemented and source/headless validated historically; v2 activation + SAVE-reservation contract not implemented.  
**Evidence:** `Documentation/Coordination/Genin Roster Candidate Content Policy v2 2026-09-11.md`, commit `61d7c3e2d376b0a4c0ef77a5ed39d09ebdcbdc21`; `Documentation/Coordination/Persistent Incomplete Genin Roster Transition Reservation and Shinobi Record Projection Contract 2026-09-11.md`; issue #63.  
**Owner:** Coding / Runtime.  
**Next action:** extend the existing roster transition only; preserve v1 snapshots, version-pin v2 for new lineages, persist incomplete reservation state, make SAVE reserve and CONTINUE assign, reject stale selection, and browser/save-load prove it. Do not create a second roster system.

### 4. Installed-production-browser Golden gates — #105 / #41 / #36

**System:** onboarding + Arc 1 end-to-end  
**Problem:** source/headless evidence is GREEN but installed-production-browser evidence remains missing.  
**Current state:** implementation GREEN; browser/Golden RED/UNPROVEN.  
**Evidence:** #105 ten Academy Origin onboarding validation; #41 M11/M12 Story→Battle→same Story browser round trip; parent #36 complete Arc-1 installed-browser Golden.  
**Owner:** Coding / Runtime for browser evidence, coordinated under #36.  
**Next action:** after current SEND NOW implementation deltas land, perform one fresh installed-browser sweep rather than creating separate substitute diagnostics.

### 5. Live-115 portrait resolver/browser proof — #16

**System:** Registry / portraits  
**Problem:** source now deliberately targets 97 Characters + 18 Entities = 115 after Teen Nagato retirement and strict `uiPortrait` no-card-fallback behavior is source-regression GREEN, but the broad issue remains open for current binary/resolver/browser proof.  
**Current state:** implementation/source proof GREEN; current broad browser/binary proof open.  
**Owner:** Coding / Runtime, returning exact bad rows to Assets only if validation fails.  
**Next action:** validate the current **115**, not stale 116 constants; do not resurrect Teen Nagato to satisfy historical QA wording.

## C. REAL PRE-ALPHA WORK — QUEUE

1. **Land of Fire standing ecology (#44):** current source has no `fire_alpha_standing_pool_v1`. However #44 names older Fire (10) geometry while later #55 froze a replacement final Fire master and explicitly requires World recalibration before Coding. Do not implement #44 against stale coordinates. World must publish/confirm the final calibration/binding first; then Coding consumes the existing event architecture.
2. **ANBU / Root contained local areas (#113/#114):** assets + World calibration remain upstream. Coding is not actionable until both selected binaries and exact local-anchor bindings are durable.
3. **Mission-skeleton-driven CE live choice generation (#121):** genuine reusable CE/runtime work, queued behind current Alpha/Arc-1 push. Consume the restored Arc-2 skeleton, not discarded Unknown Boy Story.
4. **Arc-entry continuity checkpoint (#42):** queued; requires exact Story boundary before activation.
5. **Contextual Special-Jōnin evidence producer projection (#23):** queued unless executable Alpha content needs it.
6. Training/Arena deeper consequences remain deliberately fail-closed where their owning gameplay contracts are not active; the code-owned shells themselves are live.

## D. RECORD ONLY / ALREADY CLOSED

- Current live population is **115 = 97 Characters + 18 Entities**. The old `116` portrait-era language is historical, not a mandate to restore Teen Nagato.
- Arc 1 M1–M12 is present in current source and deterministic/headless fresh-chain regression is GREEN.
- M11/M12 machine-addressed Story scenes, Battle callers/return envelopes, stable Ren identity, Echo reciprocity, voluntary temporary Kurama loan, cleanup, Mission-12 completion and separate Arc-1 completion are implemented.
- Mission 5 and Mission 7 real Battle seams were exercised by the fresh-chain headless regression.
- Current Battle scheduler has explicit no-fabricated-Basic/no-fabricated-Guard source diagnostics and fails closed with no semantically eligible action.
- PL formula remains the seven-Stat formula: 60% peak + 25% average top three + 15% average all seven.
- Effective state derives through developed Stats + authorised equipment/runtime Stat modifiers rather than a hidden direct Base-PL mutation.
- `GROUP`, `DEFEND`, `KAGE`, Daily Reward and Special Shop are retired from ordinary Alpha navigation; compatibility handlers are fail-closed dormant paths.
- Chronicle Interaction and My Clan adaptive systems are implemented and source-regression GREEN under #32; deeper Selected Shinobi Loadout remains separately unclosed and is not invented.
- World Map v2 zero-leak locked-secret source regression is GREEN.
- Mission 1 pre-Whisper three-person trace producer exists in current source and is included in the later monster regression; issue #90 body is stale as an implementation request.
- Konoha v3 implementation diagnostics were consumed in the later runtime monster; issue #84 body is stale as an implementation request.

## E. IMPLEMENTED BUT NOT VALIDATED

The following have implementation/source or deterministic/headless evidence but do **not** have current installed-production-browser/Golden proof:

- ten Academy Origin onboarding paths (#105)
- Arc 1 complete M1→M12 player-facing run (#36)
- M11/M12 Story→Battle→same Story round trip (#41)
- M5 Female Operator player-facing Battle return (#52) despite deterministic fresh-chain seam evidence
- World Map v2 responsive DOM/focus/browser projection (#54)
- Konoha v3 final browser marker/known-unknown behavior (#84)
- Mission-1 pre-Whisper producer player-facing/browser path (#90)
- Chronicle Interaction + My Clan responsive/browser behavior (#32)
- live-115 portrait binary/resolver/browser wall (#16)
- Alpha surface truth as a whole; production-browser Golden remains not claimed.

These validation gaps must not be described as missing design or missing source implementation where source already exists.

## F. DURABLE AUTHORITY BUT NOT IMPLEMENTED

1. **#112 Konoha World consolidated package:** no `sc.worldInfoProjection.v1`; no `sc_world_alpha_activation_konoha_v1_2026_09_11` in current source.
2. **Genin v2 candidate policy:** no `alpha_genin_roster_first_production_content_v2`; source remains v1.
3. **Persistent incomplete Genin transition reservations:** no `reservedGeninVariantIds` or equivalent exact new reservation contract demonstrated in source.
4. **#111 exact Academy Menma active projection policy:** new five-action definitions exist, but the post-runtime policy/consumer is not proven and the old Kurama-gated Academy Menma table remains present. Treat as open until exact projection diagnostics close it.
5. **#121 mission-skeleton-driven live choice generation:** durable queue contract, not implemented against active restored Arc-2 authority.
6. **#42 Arc-entry projection/checkpoint:** durable framework, queued.
7. **#23 Special-Jōnin contextual producer projection:** durable, queued.
8. **Fire standing ecology:** semantic families exist, but current runtime has no active `fire_alpha_standing_pool_v1`; final geometry binding must be reconciled after #55 before Coding implementation.

## G. CHAT-ONLY / POSSIBLY LOST WORK

The archaeology recovered no production-critical Coding implementation that can currently be proven to exist **only** in the exhausted chat and to be absent from GitHub `main`.

Historical workspace checkpoints named older runtime blobs and planned a later `27500–32499` tranche containing #111 and Genin-v2 work. Those plans are **not implementation proof**. Live source confirms the post-22500 SEND NOW contracts were not comprehensively consumed. They are therefore classified as open durable work, not as mysterious lost code.

If a future archive export contains an implementation diff for #111/#112/v2/reservations that was never committed, document the exact diff before reconstruction; do not overwrite current source from memory.

## H. SUPERSEDED / DEAD CODE / STALE TRAFFIC

- **Arc-2 Unknown Boy alley/timed-Battle branch:** current active Story authority discards it. Current `game.js` has no `arc2_unknown_boy_01`. GitHub #120 is stale/superseded and should be closed NOT PLANNED rather than implemented.
- Preserve generic packages/mechanics only where independently reusable; do not delete reusable Battle/Registry mechanics merely because the Story caller died.
- Current source contains older superseded `continueAlphaArc1()` wrappers/string checks such as `mission11_12_story_caller_runtime_authority_pending`; later runtime overrides actually route Mission 11/12 into `startAlphaArc1Mission11()` / `startAlphaArc1Mission12()`. Treat older wrappers as dead/superseded source archaeology, not current frontier truth.
- Historical `116/116` portrait comments/constants are stale relative to current live-115 population after Teen Nagato retirement.
- #90, #84, #54, #52 and #32 issue bodies still read substantially like implementation requests even though current runtime/source regression contains their implementations. Their remaining work is validation/browser proof unless a fresh test finds a real defect.
- #44 references Fire (10) coordinates that later final-master workflow explicitly superseded; do not consume those coordinates without newer World calibration.

## I. CE-REUSABLE ARCHITECTURE RECOVERED

Reusable Chronicle Engine architecture present or strongly established in the SC runtime includes:

- machine-addressed Chronicle occurrences with stable source/provenance references
- idempotent commit patterns and factual occurrence lookup rather than presentation reconstruction
- Story occurrence / World occurrence / Battle occurrence separation
- Story Scene registration, caller context, resolver transition and same-Story return
- explicit factual Battle return envelopes rather than inferred Story outcome
- observer-relative Knowledge/presentation separation
- Registry stable identity separated from representation state
- ownership / assignment / deployment separation
- Hosted Entity source participation without a second participant turn/slot/PL ledger
- source-owned temporary Effective/Battle state with explicit cleanup while committed history persists
- save-envelope extension/wrappers for Story/Battle/mission-specific state
- committed World opportunity state that does not reroll on UI refresh
- autonomous participant/NPC intent boundaries
- contextual state projection from authoritative truth rather than UI state
- stale-state/snapshot fail-close and idempotent unresolved-state reuse patterns

SC-specific adapters include Konoha/Arc-1 IDs, Academy/Genin roster content, exact Naruto-inspired Registry rows, authored Battle packages and map bindings. Those must not be mistaken for generic CE schema.

Future reusable work #121 should extend the existing Story/occurrence model rather than create a second Story engine.

## J. CURRENT ALPHA RUNTIME MATRIX

| Major Alpha system | DESIGN | DURABLE | IMPLEMENTED | SOURCE/HEADLESS | BROWSER | GOLDEN |
|---|---|---|---|---|---|---|
| CE occurrence/history/provenance core | GREEN | GREEN | GREEN | GREEN | UNKNOWN | UNKNOWN |
| Story runtime Arc 1 M1–M12 | GREEN | GREEN | GREEN | GREEN | UNKNOWN | RED |
| Arc 1 M11/M12 Battle/Story integration | GREEN | GREEN | GREEN | GREEN | UNKNOWN | RED |
| Battle prepared-action / PL / control / Hosted Entity semantics | GREEN | GREEN | GREEN | GREEN | UNKNOWN | RED |
| Academy Origin onboarding semantics | GREEN | GREEN | GREEN | GREEN | UNKNOWN | RED |
| Academy Menma exact tutorial active projection (#111) | GREEN | GREEN | PARTIAL | RED | RED | RED |
| Promotion / assessment semantic separation | GREEN | GREEN | GREEN | GREEN | UNKNOWN | RED |
| Genin roster v1 machinery | GREEN | GREEN | GREEN | GREEN | UNKNOWN | RED |
| Genin candidate v2 activation | GREEN | GREEN | RED | RED | N/A | RED |
| Incomplete Genin transition SAVE/reservation | GREEN | GREEN | RED | RED | N/A | RED |
| Registry / live 115 cardinality | GREEN | GREEN | GREEN | GREEN | UNKNOWN | PARTIAL |
| strict `uiPortrait` resolver | GREEN | GREEN | GREEN | GREEN | UNKNOWN | RED |
| World Map v2 | GREEN | GREEN | GREEN | GREEN | UNKNOWN | RED |
| Konoha v3 base map runtime | GREEN | GREEN | GREEN | GREEN | UNKNOWN | RED |
| Konoha World Info/locator/24-opportunity package (#112) | GREEN | GREEN | RED | RED | N/A | RED |
| Fire standing-event ecology | GREEN | PARTIAL | RED | RED | N/A | RED |
| My Clan adaptive formation/UI | GREEN | GREEN | GREEN | GREEN | UNKNOWN | RED |
| PL / Developed / Effective / Battle state | GREEN | GREEN | GREEN | GREEN | UNKNOWN | PARTIAL |
| Save/load/persistence existing systems | GREEN | GREEN | PARTIAL | GREEN | UNKNOWN | RED |
| UI/navigation Alpha surface truth | GREEN | GREEN | GREEN | GREEN | UNKNOWN | RED |
| GROUP / DEFEND / KAGE / retired Alpha surfaces | GREEN | GREEN | safe dormant | GREEN | N/A | N/A |
| Arc-2 active runtime | PARTIAL | PARTIAL | RED | RED | N/A | N/A |
| CE mission-skeleton live choice generation (#121) | GREEN | GREEN | RED | RED | N/A | N/A |

`RED` in Golden means the required production browser/Golden proof is absent, not that deterministic source tests failed.

## K. OPEN GITHUB ISSUE RECONCILIATION

| Issue | Owner | Current audit status | Exact next action |
|---|---|---|---|
| #16 | Coding | implementation/source strict portrait behavior present; live-115 browser/binary proof open | validate current 115 and close only on exact resolver/browser evidence |
| #32 | Coding | source implementation/regression GREEN; body stale as implementation request | browser responsive/interaction proof, then close |
| #36 | CE/Coding coordination | overall Arc-1 installed-browser Golden open | retain as umbrella final browser gate |
| #41 | Coding | M11/M12 implementation/source GREEN; issue body stale on “implementation missing” | prove installed-browser round trip/Golden only |
| #44 | Coding/World dependency | runtime not implemented; named Fire(10) geometry superseded by later final-master workflow | obtain current World recalibration/binding before Coding; do not implement stale coordinates |
| #52 | Coding | M5 implementation/headless seam GREEN | browser Story→Battle→same Story proof then close |
| #54 | Coding | World Map v2 source regression GREEN | current responsive DOM/focus/browser proof then close |
| #63 | Coding | v1 implemented; v2 + persistent reservations unconsumed | implement both through same subsystem; browser/save-load proof |
| #84 | Coding | Konoha v3 source implementation/regression exists | browser marker/secret-leak proof then close |
| #90 | Coding | pre-Whisper producer source/headless implementation exists | browser producer proof then close |
| #105 | Coding | source/origin consequence machinery closed | 10/10 installed-browser onboarding matrix |
| #111 | Coding | current SEND NOW implementation/activation gap | exact tutorial active projection + regression/browser proof |
| #112 | Coding | current SEND NOW implementation gap | implement consolidated Konoha World package + browser proof |
| #120 | Coding | **SUPERSEDED / DEAD STORY CALLER** | close NOT PLANNED; do not implement discarded Unknown Boy branch |
| #121 | Coding | valid QUEUE reusable CE work | hold behind current Alpha push; implement only against approved active mission skeleton |
| #42 | Coding | valid QUEUE | wait for exact Arc boundary/caller, then implement one projection/checkpoint path |
| #23 | Coding | valid QUEUE | activate only when executable Alpha content requires it |
| #114 | UI/Assets upstream | not yet Coding-actionable | wait for assets + World calibration |

No new Coding issue is required by this audit: #111, #112, #63, #105/#41/#36 and existing validation threads already cover the genuine work.

## L. SAFE SUCCESSOR CODING CHECKPOINT

### Repository/source

- repo: `NinjaSteveXer0/Shinobi-Chronicles`
- audited runtime source baseline: HEAD `66607e8a8a6bf3b7460528ff8dba8633773a8ead`
- runtime-bearing commit: `51f6d71847224998fc0178e8fc89e0b378018ce5`
- critical runtime blob: `game.js` `9a95e018ac76b993c22b62ed6aa02be5520e97b1`
- critical files: `game.js`, `index.html`, `style.css`, `ALPHA_PLAYABILITY_MATRIX.txt`, `REVISION_MANIFEST.txt`

### Critical durable authority to consume first

1. `Documentation/Combat/SC_Combat_Academy_Menma_Tutorial_Start_State_and_Alpha_Active_Content_Slice_2026-09-11.md` — #111
2. `Documentation/World/Alpha Village Region Info Marker Story Locator and Executable Activation Package 2026-09-11.md` — #112
3. `Documentation/Coordination/Genin Roster Candidate Content Policy v2 2026-09-11.md` — #63
4. `Documentation/Coordination/Persistent Incomplete Genin Roster Transition Reservation and Shinobi Record Projection Contract 2026-09-11.md` — #63
5. `Documentation/Story/Arc1_Missions11-12_Machine_Addressable_Story_Runtime_Contract_2026-09-11.md` — preserve; do not rebuild
6. `Documentation/Coordination/Arc 2 Selective Story Restoration Mission 1 Cat-and-Mouse Mission 2 and Late-Arc Preservation 2026-09-11.md` — Arc-2 precedence

### Work not to repeat

Do not rebuild Arc-1 M1–M12, M11/M12 Battle packages, Mission-1 pre-Whisper producer, M5/M7 seams, World Map v2, Konoha v3 base projection, My Clan/Chronicle Interaction source implementation, PL formula, Hosted Entity semantics, live-115 retirement, or Alpha navigation shells merely because their issues are still open. Their open state is primarily validation unless this audit identifies a newer unconsumed contract.

Do not implement Arc-2 Unknown Boy timed alley Story caller.

### First exact successor action

1. Fetch current `main` and confirm `game.js` blob is still `9a95e018...` or inspect any newer runtime commit before touching code.
2. Consume #111 first because it is a player-blocking tutorial start-state defect and its authority landed after the runtime blob.
3. Then #112 and #63 v2/reservation deltas.
4. After implementation deltas, run one consolidated installed-production-browser Golden sweep covering #105 + #41 + #36 and close validation-only issues with exact evidence.

## M. ARCHIVE SAFETY VERDICT

# **ARCHIVE SAFE FOR CONTINUITY / ALPHA STILL HAS OPEN GATES**

The exhausted Coding/Runtime workspace can be retired without losing the current source lineage or known production authority: the live runtime baseline is exact, its latest runtime commit remains reachable and unchanged at the audited HEAD, major historical implementation claims were reconciled against source, newer durable gaps are identified, stale Arc-2 traffic is separated, and no production-critical implementation was found that can only be proven from chat.

Alpha itself is **not frozen/Golden**. Current open gates are #111, #112, #63 v2/reservation work, current portrait/browser proof, and the consolidated installed-browser onboarding/Arc-1 Golden validations. Fire regional event Coding must wait for current post-#55 World calibration rather than consuming stale Fire(10) coordinates.

The safe operating order remains:

`recover -> verify current GitHub -> consume only newer durable deltas -> browser validate -> Golden -> freeze`

## Successor semantic boundaries — preserve

- PL != Progression
- Rank != Progression
- Acquisition != Progression
- Registry identity != ownership
- ownership != assignment
- assignment != deployment
- Promotion != roster-transition completion
- Battle victory != Promotion
- mission completion != Progression automatically
- Knowledge != Access != Competence != Power != Mastery
- Base != Developed != Effective != Battle/runtime state
- World Truth != observer Knowledge != presentation
- location != event != opportunity
- mandatory Story != random event pool
- semantic eligibility precedes randomness
- committed history != rerollable presentation
- Story occurrence != World occurrence != Battle occurrence
- protagonist intent != party command
- presence != Battle participation
- Character Card != Registry/formal Rank authority
- design closed != implemented != runtime validated != Golden
