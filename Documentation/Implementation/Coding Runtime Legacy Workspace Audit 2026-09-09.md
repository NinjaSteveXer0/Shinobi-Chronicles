# Shinobi Chronicles — Coding / Runtime Legacy Workspace Audit — 2026-09-09

**Owner:** Coding / Runtime Legacy Audit  
**Status:** **CURRENT RESTART AUTHORITY**  
**Purpose:** establish where Coding actually stands before opening the replacement active Coding workspace.  
**Alpha priority:** finish Shinobi Chronicles Alpha; no speculative refactor / CE expansion / post-Alpha architecture work is promoted by this audit.

---

## Authority rule used by this audit

For production-critical claims this audit used:

**current GitHub source > durable CE/SC documents > current specialist decisions > Project memory/context > historical chat recollection**

The audit keeps the following statuses separate:

**design closed ≠ durable authority ≠ implemented ≠ locally validated ≠ browser validated ≠ Golden/regression GREEN**.

The previous Coding chat and the 2026-09-07 legacy audit are archaeological evidence only. No historical source snapshot is authorised to overwrite current `main`.

---

# A. Current source baseline

## A1. Audited production fingerprint

The source baseline inspected **before this audit document itself was committed** was:

- `main`: `381c548de04cbcfad450093a0ed17659a7fd3885`
- current `game.js` blob: `62b98639d1aad530e0b80723e417eb68edaa7080`
- current `style.css` blob: `65094df08abe1006beb20dd7ab834b041c7fdb3f`
- current `tools/qa_battle_portraits.py` blob: `55975c2e703a866fae50fcacaddc111cecd77523`
- current `.github/workflows/battle-portrait-qa.yml` blob: `41375395035e01972a519bdfb1a4d3096fe77a48`

The latest numbered runtime-source commit is:

- `f0fcabd6e095360d03902af08f64b733f3892d76` — commit message `2500`

Critically, `game.js` at `f0fcabd6...` has the **same blob SHA** `62b98639...` as the audited pre-document `main`. Later commits moved story/combat/world/map/assets/document authority forward without changing the runtime file.

Therefore the replacement Coding workspace must **not** infer that later authority is already executable merely because it exists on a newer `main`.

After this audit document commit, `main` will naturally have a newer commit SHA. The safe restart fingerprint is therefore:

> fetch latest `main` → verify current `game.js` blob against `62b98639d1aad530e0b80723e417eb68edaa7080`; if it differs, re-audit the changed runtime before consuming this checkpoint literally.

## A2. Live Registry / portrait production gate

The checked-in portrait QA now correctly uses the current live production gate:

- Characters: **98**
- Entities: **18**
- total live portrait rows: **116**
- required dimensions: **1024×1024**
- mapping source: explicit `UI_PORTRAIT_MANIFEST`
- runtime resolver must remain manifest-backed
- collectible-card fallback is forbidden

This supersedes the old September-7 warning about 102-row tooling.

## A3. Current map authority that matters to Coding

Current Fire regional production authority is now beyond the earlier five-nation foundation:

- asset: `Backgrounds/inside_LOF.png`
- blob: `b1300c48e786981f610f7a46c82d92c245da2d1c`
- native canvas: `1536×1024`
- geometry authority: `Documentation/Maps/Land of Fire Regional Hotspot Calibration v2.md`
- calibration commit: `f21043b09ebcea1e6ae69012fb253302c7af97b3`
- World standing-event authority: `Documentation/World/Land of Fire Interactive Event Ecology Alpha Contract.md`
- World authority commit: `57cbb9159868f6ffc8ca05c147a0faee793f8b16`

Coding issue **#44** is the implementation-ready current consumer. Existing Post-2500 map code is a foundation, not proof that the new standing ecology is implemented.

## A4. Known diagnostic / validation entry points

Current/recoverable source provides at least these package entry points or commands:

- syntax/static: `node --check game.js`
- portrait static QA: `python tools/qa_battle_portraits.py --static-only`
- portrait full binary QA: `python tools/qa_battle_portraits.py`
- `runAlphaPost1979PortraitAuthorityIntegrationDiagnostics({runFullPortraitBinaryQA:true})`
- `runAlphaPost2074Mission7IntegrationDiagnostics()`
- `runAlphaPost2250MyClanPreviewDiagnostics()`
- `runAlphaPost2325ChronicleOriginUIDiagnostics()`
- `runAlphaFiveNationInteractiveGeographyDiagnostics()`
- `runAlphaPost2500PlayabilityMonsterDiagnostics()`

The repository still does not have one proven whole-project command that can be treated as a substitute for package diagnostics + save/load + browser + full-Arc + Golden validation.

---

# B. Legacy workspace recovery

## B1. What was recoverable durably

The 2026-09-07 Coding Runtime Legacy Workspace Audit and current source/commit archaeology preserve substantial earlier Coding work. The meaningful durable foundation includes:

- stable Registry identity consumption and representation separation;
- Base / Developed / Effective / Battle-state separation;
- Battle resolver, source-owned temporary state, Conditions and prevention ordering;
- Items / Equipment / inventory authority separation;
- acquisition / ownership / assignment / deployment separation;
- six-slot formation semantics;
- scoped Chronicle/history and occurrence-based consequence architecture;
- Story Scene runtime and Battle caller/return foundations;
- World Event / Hotspot foundations;
- Knowledge/provenance/observer-safe projection doctrine in runtime-facing contracts;
- save/load and idempotence protections across multiple packages;
- Special Jōnin evaluator foundations;
- Promotion / Field Readiness / Arena groundwork;
- explicit Character vs Entity / representation non-collapse;
- fresh-save Origin selection that does **not** auto-seed an owned roster;
- Mission 7 sanitisation encounter implementation;
- Chronicle Interaction + My Clan adaptive implementation;
- five-nation interactive geography foundation;
- Post-2500 map interaction / My Clan / Arena playability work.

Historical deterministic diagnostics recorded multiple package-local GREEN results. They are useful archaeology, not current-main proof.

## B2. What has been superseded

The following old assumptions must not survive into the replacement Coding workspace:

- `Post-1859/current main` is obsolete as a source fingerprint.
- old 102-row portrait QA is superseded by current 116-row tooling.
- old `SOURCE_OCCURRENCE_IDS_REQUIRED_34` is superseded: MEN-03 closed separately and the remaining 33 authoritative bindings are now published; Coding issue #34 is active.
- old Whisper Woods “identity/Combat authority missing” is superseded: identity/PL/Combat are closed; the remaining real Coding seam is the Story caller/round-trip under #35.
- old Mission 7 “Combat package missing” is superseded: implementation landed and #31 is closed.
- old Practical “1536×1102 physical master missing” is superseded: the accepted wide `UI/practical.png` production path landed and Coding recalibrated to the wide sibling scaffold.
- old broad portrait **mapping** wall is superseded by a no-remap verdict; the current blocker is physical binary QA, not identity/path reinterpretation.

## B3. What appears chat-only / cannot be promoted

No uncommitted historical implementation described only in the old Coding conversation is promoted by this audit. If old chat text says code existed but current GitHub does not prove it, status remains **UNKNOWN / NEEDS PROOF**.

The complete raw transcript of the exhausted legacy Coding chat was not available as a single inspectable source during this audit. Recoverable durable documents, commits, issues, current source, and available project context were swept; inaccessible transcript material was **not** pretended to be audited.

---

# C. Current implementation state by subsystem

| Subsystem | Current state | Evidence / boundary | Next action |
|---|---|---|---|
| Registry / stable identity | **IMPLEMENTED foundation / current authority active** | live Character/Entity separation, persistent IDs, observer projections; M11/12 Registry authority now closed upstream | consume exact IDs only; no presentation inference |
| Stats / PL | **IMPLEMENTED foundation** | Base/Effective/Battle separation is durable; M11/12 exact packages published | #41 must implement current M11/12 runtime packages without Base mutation |
| Rank / Promotion | **IMPLEMENTED foundation, full orchestration not Golden** | Promotion ≠ victory, Rank ≠ progression doctrine preserved | do not auto-promote from Story/Battle; #42 stays queued |
| Acquisition / ownership / candidate / assignment / deployment | **IMPLEMENTED foundation** | fresh-save Origin flow does not auto-seed ownership; formation state is separate | preserve all separations; no UI slot as authority |
| Academy Origins | **PARTIAL / BLOCKED** | MEN-03 authority closed; 33 remaining exact source addresses now durable | **#34 ACTIVE** |
| Origin `sourceOccurrenceId` consequences | **AUTHORITY READY, not fully wired** | complete 33-row matrix exists; code search does not prove consumption | **#34 ACTIVE** |
| Story Scene runtime | **IMPLEMENTED foundation** | reusable Story shell / caller-return architecture exists | current per-Mission registration still incomplete |
| Story → Battle → same Story | **IMPLEMENTED foundation; package-specific gaps remain** | Unknown Operative Combat exists; M1 caller is not wired | **#35 ACTIVE** |
| Chronicle occurrences / consequence transactions | **IMPLEMENTED foundation** | stable source-address / idempotent consequence model exists | #34 + new content must reuse it |
| Knowledge / evidence / observer-safe projection | **IMPLEMENTED doctrine/foundation** | projection ≠ identity; World Truth ≠ Knowledge ≠ presentation | preserve in #35/#44/#41 |
| Participant autonomy | **IMPLEMENTED doctrine/foundation** | presence/team != Battle participation; player intent != party command | #35 and Arc callers must consume exact participant sets |
| Battle core | **IMPLEMENTED foundation** | exact Attack PL / Stamina / source-state systems exist | #41 current packages; do not add hidden scaling |
| Mission 7 sanitisation trio | **IMPLEMENTED; NEEDS current full-path proof** | commit `199da1a1...` / issue #31 closed | do not reopen Combat semantics; prove Story/full-Arc path later |
| Skills / Techniques / transformations | **IMPLEMENTED foundation, content varies** | source-owned Actions/temporary projections supported | #41 exact actions; no invented capability |
| Equipment / Weapons / Items | **IMPLEMENTED foundation** | persistent item/equipment authority separated from presentation | no current blocking issue found in this audit |
| Hosted Entities | **IMPLEMENTED foundation / current ontology closed upstream** | Hosted Entity != host; no default independent turn/PL | consume current Menma/Echo contract |
| Multiple Hosted Entities | **AUTHORITY READY** | CE multiple-host contract closed in `6020deb4...` | #41 must implement exact current Battle/runtime consumption |
| Echo / Echo Menma | **AUTHORITY READY, M11/12 runtime not implemented** | `echo_menma` PL63; Hosted Echo separate; Cipher Menma != Echo Menma | **#41 ACTIVE** |
| temporary Kurama lending | **AUTHORITY READY, runtime not implemented** | exact M12 borrowed projection Effective PL80, source-owned and temporary | **#41 ACTIVE** |
| Mission 11/12 Battle packages | **AUTHORITY READY / BLOCKED** | Combat `f474788...`, Registry `074ad7b...` | **#41 ACTIVE** |
| World / Mission / Event foundation | **IMPLEMENTED foundation** | World Regions/Events/Hotspots exist | current Fire standing ecology is new #44 work |
| Land of Fire standing ecology | **AUTHORITY READY / NOT IMPLEMENTED** | 22 Wave-1 families + Fire(10) geometry closed | **#44 ACTIVE** |
| Whisper Woods | **PARTIAL** | map + Unknown Operative identity/Combat durable | **#35** for exact World→Story→Battle(optional)→same Story |
| Field Readiness / Promotion assessment | **IMPLEMENTED foundation / not whole-Alpha Golden** | older runtime packages durable | verify only when consumed in current full path |
| Genin roster transition | **PARTIAL / state-sensitive** | Promotion and representation remain separate; Origin no auto-seed | no canonical auto-transition |
| Chronicle Interaction UI | **IMPLEMENTED / NEEDS CURRENT BROWSER PROOF** | issue #32 implementation landed in `2174` with headless diagnostics | keep #32 open until current browser evidence |
| My Clan | **IMPLEMENTED / NEEDS CURRENT BROWSER PROOF** | Browse/Inspection, six slots, dirty/save/clear implemented; later preview/playability work landed | keep #32 open until current browser evidence |
| Practical Training | **IMPLEMENTED wide presentation integration / NEEDS CURRENT BROWSER PROOF** | accepted `UI/practical.png` 1536×1102 path consumed | validate, do not redesign |
| Exams | **IMPLEMENTED existing surface / current full-browser proof not established here** | map route exists in later runtime | validate only; no UI art invention in Coding |
| Arena | **IMPLEMENTED presentation/runtime foundation / not full Golden** | Post-2500 makes approved masters live while Battle/Promotion retain semantics | browser + Promotion/Battle flow proof remains |
| Loadout / Selected Shinobi | **PARTIAL / deeper final UI authority not closed** | My Clan may route deeper but must not invent unfinished UI | preserve queue; do not fabricate Alpha authority |
| `collectibleCard` | **IMPLEMENTED separate projection** | full-card roster use distinct from portrait | never use as `uiPortrait` fallback |
| `uiPortrait` | **MAPPING AUTHORITY CLOSED; PHYSICAL QA RED** | current 116-row manifest correct; binary gate failing | **#45 UI-ASSETS**, then #16 browser/runtime proof |
| asset-path authority | **EXPLICIT mapping model implemented** | repository tree does not author identity/path mapping | no filename/folder inference |
| save/load | **IMPLEMENTED foundation; package-specific proof required** | multiple systems contain idempotent persistence contracts | re-prove on #34/#35/#41/#44 and full Arc |
| retry / idempotence | **IMPLEMENTED foundation; package-specific proof required** | source-owned occurrence patterns exist | no duplicate history on retries |
| invalid action no-history | **IMPLEMENTED Battle doctrine** | invalid/precommit Actions must not consume action or mint history | #41 regression requirement |
| deterministic diagnostics | **MANY PACKAGE-LOCAL ENTRIES, no single Golden harness** | historical local GREEN exists | rerun against current source after every package |
| CI | **PORTRAIT CI CURRENT AND RED** | current tool/workflow correctly targets 116 | #45 owns physical repair |
| browser validation | **INCOMPLETE** | #32 explicitly lacks final browser closure; earlier Unknown Operative browser attempt was not proof | mandatory before Golden |
| whole-Alpha Golden | **NOT GREEN / NOT CLAIMED** | full Arc 1 is not executable end-to-end yet; portrait CI red | final stage only after current blockers |

## C1. Semantic non-collapses that remain hard runtime constraints

The replacement Coding workspace must preserve, without reopening debate:

- PL != Progression
- Rank != Progression
- Acquisition != Progression
- Registry identity != ownership
- candidate eligibility != ownership
- ownership != assignment
- assignment != deployment
- Promotion != roster-transition completion
- Battle victory != Promotion
- mission completion != progression automatically
- Knowledge != Access != Competence != Power != Mastery
- Base != Developed != Effective != Battle/runtime state
- World Truth != observer Knowledge != presentation
- event eligibility != event success
- location != event != opportunity
- mandatory Story != random event pool
- randomness among eligible possibilities != randomness deciding eligibility
- encounter scaling != Base mutation
- presentation refresh != semantic reroll/recommit
- player intent != guaranteed occurrence
- protagonist intent != party-wide command
- team/travel presence != Battle participation
- NPC disagreement != automatic non-participation
- observer projection != stable identity
- Kill intent != death
- Detain intent != custody
- Battle defeat != death
- generated/displayed dialogue != World Truth
- current Story team != My Clan formation automatically
- stable person != current representation
- Hosted Entity != host person
- Hosted Entity != independent Battle participant by default
- co-hosting != fusion / ownership / mastery / additive PL
- temporary Kurama loan != persistent unlock
- Echo Menma != Cipher Menma

---

# D. Arc 1 Mission 1–12 runtime matrix

**Important:** Writing has closed the authored Arc 1 skeleton through Mission 12. That is not an implementation claim.

| Mission | Writing authority | World / Event authority | Registry / PL | Combat | Coding runtime | Save/load | Browser/runtime validation | Status | Next real blocker only |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **CLOSED DESIGN** | **AUTHORITY READY** exact World→Story source | **AUTHORITY READY** Unknown Operative PL63 + stable local IDs | **IMPLEMENTED** confrontation package | **PARTIAL**; caller missing | caller round-trip **NEEDS PROOF** | **NOT BROWSER VALIDATED** as complete mission | **BLOCKED** | **#35** wire exact World→Story→Battle(optional)→same Story |
| 2 | **CLOSED DESIGN** | **UNKNOWN / NEEDS PROOF** for exact executable caller bindings | **UNKNOWN / NEEDS PROOF** as required | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN** | **UNKNOWN** | **AUTHORITY-BLOCKED** | **#36** must return the exact implementation-ready Mission 2 package; Coding must not invent it |
| 3 | **CLOSED DESIGN** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** as required | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN** | **UNKNOWN** | **AUTHORITY-BLOCKED** | **#36** exact Mission 3 implementation packet |
| 4 | **CLOSED DESIGN** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** as required | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN** | **UNKNOWN** | **AUTHORITY-BLOCKED** | **#36**, including exact Progression/Development projection if consumed |
| 5 | **CLOSED DESIGN** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** for Battle-relevant participants | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN** | **UNKNOWN** | **AUTHORITY-BLOCKED** | **#36** exact Mission 5 package; no PL/Combat invention |
| 6 | **CLOSED DESIGN** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** as required | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN** | **UNKNOWN** | **AUTHORITY-BLOCKED** | **#36**, including exact Identity-Rebinding/False-Identity progression projection if consumed |
| 7 | **CLOSED DESIGN** | Story facts closed; exact whole-Mission caller path **NEEDS PROOF** | **AUTHORITY READY / IMPLEMENTED consumption** for sanitisation trio | **IMPLEMENTED** `arc1_m7_chain_sanitisation_active_encounter` | encounter **IMPLEMENTED**; whole mission not proven | source-owned state implemented; **current-main rerun needed** | **NOT BROWSER VALIDATED** as whole mission | **IMPLEMENTED / NEEDS RUNTIME PROOF** | **#36** exact remaining Story/runtime orchestration only; do **not** reopen trio Combat |
| 8 | **CLOSED DESIGN** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** | Battle package **not proven closed** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN** | **UNKNOWN** | **AUTHORITY-BLOCKED** | **#36** upstream closure + exact Coding handoff |
| 9 | **CLOSED DESIGN** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** | authored/explored Battle result is not runtime authority; exact package **NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN** | **UNKNOWN** | **AUTHORITY-BLOCKED** | **#36** exact owner closure / Coding packet |
| 10 | **CLOSED DESIGN** | **UNKNOWN / NEEDS PROOF** | Sazan/current participants **NEED exact runtime-role proof** where applicable | **UNKNOWN / NEEDS PROOF** | **UNKNOWN / NEEDS PROOF** | **UNKNOWN** | **UNKNOWN** | **AUTHORITY-BLOCKED** | **#36** exact Mission 10 package |
| 11 | **CLOSED DESIGN** | Story authority ready; exact caller registration still part of implementation | **AUTHORITY READY** Kagawa53 / Recall46 / Field51 | **AUTHORITY READY** exact Pump Four/Recall package | **NOT IMPLEMENTED** in current `game.js` | specified, not implemented | **NOT VALIDATED** | **BLOCKED / AUTHORITY READY** | **#41** implement + integrate caller/return/save-load |
| 12 | **CLOSED DESIGN** | Story authority ready; programme transition facts authored | **AUTHORITY READY** Ren/Echo/Sazan model | **AUTHORITY READY** Stage1/2/3 + temp Kurama PL80 | **NOT IMPLEMENTED** in current `game.js` | specified, not implemented | **NOT VALIDATED** | **BLOCKED / AUTHORITY READY** | **#41** implement exact M12 chain + cleanup/idempotence |

### Arc 1 conclusion

There is **no evidence supporting a Mission 1–12 full-run GREEN claim** today.

The key shape is:

- M1 has an exact remaining Coding seam: #35.
- M2–M10 still require #36 to convert closed Story into exact owner-complete runtime packets; Coding must not write directly from the prose skeleton.
- M7 Combat specifically is already implemented and must not be reopened.
- M11/M12 authority is closed and Coding-ready under #41.
- whole-Arc save/load/browser/Golden remains downstream of all of the above.

---

# E. Open issue reconciliation

## E1. Current Coding inbox

| Issue | Classification | Audit conclusion |
|---|---|---|
| **#16** Live-116 portrait authority wall | **AUTHORITY-BLOCKED / CURRENT CI RED** | mapping/no-remap authority is valid; current 116 binary QA fails. Wait on #45, then perform browser/runtime resolver proof. Do not remap. |
| **#23** contextual Special Jōnin evidence producers | **QUEUED** | real future producer hookup; explicitly not current blocker until executable Alpha content requires it. |
| **#32** Chronicle Interaction + My Clan | **NEEDS RUNTIME PROOF** | implementation landed in `e2499965...` with headless package diagnostics; issue remains correctly open because current browser/Alpha layout proof is absent and later runtime work touched these surfaces. |
| **#34** complete 33-row Origin source bindings | **ACTIVE / SEND NOW** | upstream authority is complete; current code does not prove the 33 exact bindings are consumed. |
| **#35** Whisper Woods major-contact Story caller | **ACTIVE / SEND NOW** | exact source + participants + existing Combat package are ready; current code does not prove the caller registration/round trip. |
| **#41** Arc 1 Mission 11/12 Battle packages | **ACTIVE / SEND NOW** | exact Registry/PL/Combat/Hosted authority is closed; no current runtime implementation found. |
| **#42** Arc-entry state projection/checkpoint | **QUEUED** | explicit queue; Story has not supplied exact Arc 2 boundary IDs. Do not interrupt first-real-run work. |
| **#44** Land of Fire standing interactive-event ecology | **ACTIVE / SEND NOW** | new World + Fire(10) geometry authority post-dates `game.js`; implementation is genuinely outstanding. |

## E2. Related active non-Coding traffic

| Issue | Classification | Audit conclusion |
|---|---|---|
| **#36** Arc 1 Missions 2–12 first-real-run coordination | **ACTIVE / SEND NOW — CE COORDINATION** | upstream chain has closed multiple-host, M11/12 Registry and Combat; M2–M10 still require exact implementation-ready routing. Coding should consume resulting handoffs, not duplicate coordination. |
| **#45** repair live-116 portrait physical QA failures | **ACTIVE / SEND NOW — UI / ASSETS** | created by this audit from exact current CI failures; blocks #16 physical closure. |
| **#33** enemy Battle/UI portrait backlog | **QUEUED — CHARACTER CREATION** | Alpha asset requirement but explicitly controlled batches / no immediate generation. Separate from #45 live-116 repair. |
| **#27** Menma carrier manifestation / Genin Menma visual state | **STALE IMMEDIATE WORDING / ACTIVE EXTERNAL VISUAL BACKLOG** | original “Writing paused at Mission 7” framing is historical because Writing reached Mission 12. Do not close without Character Creation proof; do not treat old urgency wording as Coding authority. |

## E3. Issues cleaned up during this audit

The audit found and reconciled stale parent traffic rather than leaving it as false active work:

- **#4** Unknown Operative temporary identity/lethal contract — **COMPLETE**, completion evidence commented and issue closed. Identity/PL/Combat are durable; remaining M1 caller work is #35.
- **#5** Post-1859 Coding wall — **COMPLETE / SUPERSEDED**, completion evidence commented and issue closed. Its branches are now current issues/closures, and its source baseline is obsolete.
- **#28** Mission 7 sanitisation trio parent — **COMPLETE**, completion evidence commented and issue closed. Registry/PL/Combat/Coding chain is closed; portrait backlog is separate.
- **#31** Mission 7 Coding implementation — already **COMPLETE** before this audit and correctly closed.

No issue was closed merely because an old chat said it was done.

---

# F. Current blockers ordered by Alpha impact

## 1. Complete executable Origin consequence addressing — #34

A first real Chronicle should not proceed with 33 durable consequences still disconnected from their exact factual source occurrences. Consume the complete matrix exactly; preserve idempotence and no hidden PL/Stat/reward mutation.

## 2. Complete Mission 1 caller round trip — #35

The Unknown Operative Battle is not the remaining problem. The missing exact seam is:

`World occurrence → Story Scene → optional exact Battle → same Story continuation`

with stable local participants and player/NPC autonomy preserved.

## 3. Convert Missions 2–10 from authored Story into implementation-ready owner packets — #36

This is a **coordination/authority blocker**, not permission for Coding to invent missing IDs/PL/Combat/Progression.

Coding can continue other source-ready work while CE closes these packets.

## 4. Implement Missions 11–12 exact Battle/runtime chain — #41

This is source-ready and Alpha-critical. Preserve:

- one Ren person across stages;
- Hosted Entity Echo without independent slot/PL ledger;
- Stage1 Menma PL36 with early Echo actions but no hidden stat buff;
- Echo Menma Base PL63;
- Ren Effective PL54/60/73 by stage;
- borrowed Kurama temporary Effective PL80 only while exact source loan is live;
- source-owned cleanup at Battle end;
- Sazan as noncombat programme source unless separate authority changes that.

## 5. Implement current Land of Fire standing ecology — #44

The Post-2500 map foundation is not the current World content package. Implement `fire_alpha_standing_pool_v1` and current Fire(10) geometry consumption without a second event/discovery/persistence system.

## 6. Re-prove current Chronicle Interaction + My Clan in browser — #32

Do not rewrite the implementation merely because the issue is open. The current missing category is browser/current-main proof.

## 7. Repair live-116 physical portraits, then finish #16 — #45 → #16

Current CI is hard RED:

- 116/116 manifest rows
- 116/116 unique paths
- resolver/no-card-fallback semantics GREEN
- decoded PNGs: **101/116**
- exact 1024×1024: **76/116**
- physical failures: **40**

This is not a Coding remap task. #45 has been routed directly to UI / Assets under the project handoff protocol.

## 8. Full Arc 1 browser/save-load run and whole-Alpha Golden

Only after the above source/authority blockers are closed should “Golden” be considered. A package-local diagnostic is not a whole-Alpha Golden.

### Explicit non-blocking queues

Do not let these interrupt the current Alpha path unless their own conditions become true:

- #42 Arc-entry state projection/checkpoint
- #23 contextual Special Jōnin evidence producer projection
- #25 Arc3/Arc4 rogue-Origin reintegration queue
- #18 personality/contextual-expression post-Alpha Writing queue

---

# G. Validation state

| Validation category | Current audit state | What can honestly be claimed |
|---|---|---|
| 1. syntax/static check | **NEEDS CURRENT RERUN** | historical `node --check` PASS exists; this audit did not execute a fresh local checkout check |
| 2. narrow deterministic diagnostic | **HISTORICAL PACKAGE GREEN / CURRENT RERUN NEEDED** | multiple packages recorded local GREEN historically; do not promote to current-main proof without rerun |
| 3. package-specific regression | **MIXED** | Mission 7 and Issue #32 have historical package evidence; #34/#35/#41/#44 still need implementation/regression |
| 4. cumulative runtime regression | **NOT PROVEN CURRENT** | many aggregate diagnostics exist, but no fresh current-main cumulative run was observed by this audit |
| 5. save/load | **FOUNDATION EXISTS / FULL CURRENT PATH NOT PROVEN** | package semantics exist; M1/M11/M12/Fire-current work still needs proof |
| 6. browser integration | **INCOMPLETE** | #32 remains open for this reason; no whole current Alpha browser pass observed |
| 7. full Arc path | **BLOCKED** | M1 caller, M2–10 implementation packets, M11/12 runtime prevent a legitimate M1–12 proof |
| 8. whole-Alpha Golden/regression | **NOT GREEN / NOT CLAIMED** | forbidden to claim until full required evidence exists |

## G1. Current hard CI evidence

The latest relevant `Live 116 Battle Portrait QA` run inspected by this audit is run `34331570494` on head `fe97ff1fb06273900c50c42d3253dbe246db49c9`, conclusion **FAILURE**.

The checked-in source/tooling is now the correct 116-row generation of the gate. `game.js` has not changed since the runtime commit that precedes the failing run, and later commits after that run do not provide a Coding resolver/remap supersession. The failure must therefore be treated as live physical evidence until Assets produces a later GREEN run.

## G2. Minimum restart validation sequence

Before new implementation work:

1. fetch latest `main`;
2. verify `game.js` fingerprint;
3. run `node --check game.js`;
4. run `python tools/qa_battle_portraits.py --static-only`;
5. inspect the current full portrait workflow state; **do not expect full binary GREEN until #45 returns**;
6. rerun the deterministic package diagnostics relevant to the next issue being consumed;
7. after each package, run its save/load/idempotence regression;
8. perform browser validation for UI/interaction packages;
9. perform the full Arc 1 path only when every Mission seam is executable;
10. only then run/record the whole-Alpha Golden/regression result.

Do not fabricate a GREEN result that was not observed.

---

# H. Safe restart checkpoint

## H1. Replacement Coding workspace start sequence

> **inspect current main → verify runtime fingerprint → run static/package diagnostics → consume exact active handoffs → re-run save/load/browser evidence → do not reopen closed semantics → do not claim Golden until full evidence**

Exact restart procedure:

1. Fetch latest `main` and inspect recent commits/issues before touching source.
2. Compare current `game.js` blob to audit fingerprint `62b98639d1aad530e0b80723e417eb68edaa7080`.
   - same blob: this audit's runtime findings remain the starting checkpoint;
   - different blob: inspect the diff first and reclassify affected issues before coding.
3. Read this audit and `Documentation/Coordination/Specialist_GitHub_Handoff_Protocol.md`.
4. Pull the current Coding inbox. Do not use this document as a substitute for live issue search.
5. Run syntax/static and the relevant deterministic package diagnostics before making edits.
6. Consume Alpha work in this practical order unless newer current authority changes it:
   - **#34** complete Academy Origin 33-row source bindings;
   - **#35** wire Mission 1 Whisper Woods major-contact caller/return;
   - consume any new exact **#36-derived** Coding handoffs for Missions 2–10 as CE closes them;
   - **#41** implement Mission 11/12 exact Battle/runtime packages;
   - **#44** implement current Land of Fire standing-event ecology;
   - **#32** re-prove Chronicle Interaction + My Clan in current browser/runtime rather than rewriting blindly;
   - **#16** remains blocked on **#45** for physical portraits, then needs final browser/runtime resolver proof.
7. Keep **#42** and **#23** queued until their stated activation conditions are met.
8. Do not revive #4, #5, #28 or #31 as active work.
9. Do not resume historical brick numbering for momentum. New commits should describe actual production work.
10. Do not restore an old ZIP/source snapshot over current GitHub.

## H2. Fresh active Coding workspace prompt

Copy this prompt into the replacement Coding workspace:

```text
# SHINOBI CHRONICLES — ACTIVE CODING / RUNTIME WORKSPACE

You are the replacement active Coding / Runtime workspace for Shinobi Chronicles.

PRIMARY PRIORITY: finish Shinobi Chronicles Alpha.

Do not restart from the exhausted legacy Coding chat. Do not continue historical brick numbering merely for momentum. Current GitHub is production authority.

STARTUP — HARD ORDER

1. Inspect latest `main` and current open `[HANDOFF][TO: CODING]` issues before modifying code.
2. Read:
   - `Documentation/Implementation/Coding Runtime Legacy Workspace Audit 2026-09-09.md`
   - `Documentation/Coordination/Specialist_GitHub_Handoff_Protocol.md`
3. The audit's pre-document source fingerprint was:
   - source baseline `381c548de04cbcfad450093a0ed17659a7fd3885`
   - `game.js` blob `62b98639d1aad530e0b80723e417eb68edaa7080`
   - last runtime-source commit observed `f0fcabd6e095360d03902af08f64b733f3892d76` (`2500`)
   The audit-document commit itself may make HEAD newer. Compare the CURRENT `game.js` blob. If it differs, inspect the runtime diff and re-audit affected status before acting.
4. Run current syntax/static and relevant package diagnostics. Never treat historical PASS evidence as current-main PASS.
5. Do not claim browser validation or Golden without actually observing it.

CURRENT DIRECT CODING PRIORITIES

A. #34 — implement complete 33-row Academy Origin `sourceOccurrenceId` bindings from current durable matrix. Do not derive IDs from prose, scene IDs, branch order or consequence IDs. Preserve retry/save/load idempotence.

B. #35 — wire `scene_arc1_m1_whisper_major_contact` from exact World source `occ_arc1_m1_whisper_major_contact_scene_transition` through optional existing Combat package `arc1_m1_unknown_operative_confrontation` and back to the SAME Story occurrence. Preserve stable local IDs and participant autonomy.

C. Pull and consume any new exact Coding handoffs produced by #36 for Missions 2–10. Do NOT implement Missions 2–10 directly from the Writing skeleton when exact owner authority is still missing.

D. #41 — implement Arc 1 Mission 11/12 Battle packages exactly from current Combat/Registry/Hosted authority. Preserve one Ren person across stages, no independent Hosted-Echo turn/PL ledger, Echo Menma PL63, Ren Effective PL54/60/73, temporary borrowed-Kurama Effective PL80 only while the exact loan source is live, cleanup at Battle end, and Sazan as noncombat programme source.

E. #44 — implement `fire_alpha_standing_pool_v1` and current Fire(10) standing ecology by REUSING existing World Event / hotspot / discovery / persistence architecture. No second event system, no map-open rerolls, no unknown-site DOM/focus leak, no generic location=>FIGHT, no automatic rewards.

F. #32 — implementation already exists. Do not rewrite blindly. Establish CURRENT browser/runtime proof for Chronicle Interaction Full/Standard/Quick and My Clan Browse/Inspection, six-slot formation, dirty/save/clear, Story→Battle→same caller and save/load semantics. Close only with exact evidence.

G. #16 — portrait mapping/no-remap authority is closed, but current physical QA is RED. UI / Assets issue #45 owns the 40 exact binary failures. Coding must not remap. After #45 returns 116/116 physical GREEN, run the required current browser/runtime resolver proof and close #16 only if it passes.

QUEUED — DO NOT INTERRUP CURRENT ALPHA WORK

- #42 Arc-entry state projection/checkpoint
- #23 contextual Special Jōnin evidence producers

LOCKED SEMANTIC NON-COLLAPSES

PL != Progression.
Rank != Progression.
Acquisition != Progression.
Registry identity != ownership.
candidate eligibility != ownership.
ownership != assignment.
assignment != deployment.
Promotion != roster-transition completion.
Battle victory != Promotion.
mission completion != progression automatically.
Knowledge != Access != Competence != Power != Mastery.
Base != Developed != Effective != Battle/runtime state.
World Truth != observer Knowledge != presentation.
event eligibility != event success.
location != event != opportunity.
mandatory Story != random event pool.
randomness among eligible possibilities != randomness deciding eligibility.
encounter scaling != Base mutation.
presentation refresh != semantic reroll/recommit.
player intent != guaranteed occurrence.
protagonist intent != party-wide command.
team/travel presence != Battle participation.
NPC disagreement != automatic non-participation.
observer projection != stable identity.
Kill intent != death.
Detain intent != custody.
Battle defeat != death.
generated/displayed dialogue != World Truth.
current Story team != My Clan formation automatically.
stable person != current representation.
Hosted Entity != host person.
Hosted Entity != independent Battle participant by default.
co-hosting != fusion / ownership / mastery / additive PL.
temporary Kurama loan != persistent unlock.
Echo Menma != Cipher Menma.
collectibleCard != uiPortrait.

VALIDATION CATEGORIES MUST REMAIN SEPARATE

1. syntax/static
2. narrow deterministic diagnostic
3. package-specific regression
4. cumulative runtime regression
5. save/load
6. browser integration
7. full Arc path
8. whole-Alpha Golden/regression

A package-local PASS is not Golden.
A document saying design is closed is not implementation.
A commit saying implementation landed is not current browser proof.

CROSS-WORKSPACE ROUTING

Follow `Documentation/Coordination/Specialist_GitHub_Handoff_Protocol.md`.
Before saying WAITING ON another owner, inspect current issues. Create the exact downstream GitHub handoff yourself when needed. Stephen is not the message bus.

Do not fix UI art in Coding. Do not choose portrait assets from filenames. Do not infer Registry identity from presentation. Do not invent Story occurrence IDs, Combat packages, PL, progression or rewards.

BEGIN by inspecting current GitHub and verifying the fingerprint, not by writing code from this prompt.
```

---

# Audit actions performed on GitHub

This audit did more than produce a chat summary:

1. reconciled current source against the older Coding audit and recent authority commits;
2. inspected the current Coding inbox and related parent issues;
3. confirmed current live-116 tooling is correct but physical CI is RED;
4. created **#45** `[HANDOFF][TO: UI-ASSETS][SEND NOW] Repair live-116 portrait physical QA failures` with the exact 40 failing approved rows and no-remap instruction;
5. commented current CI evidence onto #16;
6. closed stale/completed parent issues **#4**, **#5**, and **#28** only after current durable evidence proved their original dependency chains were satisfied/superseded;
7. left #32 open because implementation evidence is not browser proof;
8. left queues queued.

## Routing at audit close

**Immediate cross-workspace route already created:** UI / Assets issue **#45**.  
**Stephen relay required:** **NONE**.

---

# Final audit verdict

Coding is **not** at an unknown archaeological wall anymore, but Alpha is also **not Golden**.

The current production truth is:

- the underlying runtime architecture is substantially implemented and survived the old-chat boundary;
- later Story/Registry/Combat/World authority has moved ahead of `game.js` in several Alpha-critical places;
- the exact executable gaps are now bounded by current GitHub handoffs rather than memory;
- Mission 7 Combat is closed and must not be reworked;
- Origins 33-row addressing, Mission 1 caller, Mission 11/12 runtime, and Fire standing ecology are implementation-ready Coding work;
- Missions 2–10 remain a coordination/authority seam under #36 and must not be guessed;
- Chronicle Interaction/My Clan need current browser proof, not reflexive rewriting;
- portrait mapping authority is fine, but physical live-116 CI is genuinely RED and is now routed to Assets under #45;
- full Arc 1 and whole-Alpha Golden remain downstream validation states, not current claims.

**Safe next state:** open the replacement active Coding workspace with the prompt above and begin from current GitHub truth.