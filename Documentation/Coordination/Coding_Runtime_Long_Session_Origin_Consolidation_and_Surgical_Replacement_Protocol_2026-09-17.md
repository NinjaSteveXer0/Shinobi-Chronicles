# Shinobi Chronicles — Coding / Runtime Long-Session Origin Consolidation + Surgical Replacement Protocol

**Date:** 2026-09-17  
**Owner:** CE / Codex / Coordination  
**Status:** **ACTIVE CODING EXECUTION PROTOCOL — ALPHA PRIORITY**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

---

## 1. Why this protocol exists

The Academy Origin / Kakashi runtime has accumulated multiple generations of patch, compatibility, delivery, QA and presentation layers. Recent work has repeatedly advanced delivery/cache generations and added narrow fixes while the installed player path remains unreliable.

This protocol changes Coding execution discipline. It does **not** reopen closed Story/Combat/World/Progression semantics and does **not** author a replacement game architecture.

The goal is:

> **Stop stacking patches on patches. Establish one canonical runtime owner per responsibility, fold current authorised behaviour into those owners, retire superseded layers, and prove the actual installed Origin path.**

Git history is the archive. Superseded runtime code does not need to remain live merely because it once solved a problem.

Preserve:

- GitHub source > durable CE/SC documents > current specialist decisions > chat memory;
- design closed != implemented != source validated != production released != installed-browser validated != Golden;
- Battle victory != Story success / package custody / death / terminal reward entitlement;
- presentation != authority;
- Origin != Mission;
- no second Story/history system.

---

## 2. LONG-SESSION MODE — DEFAULT FOR ORIGIN IMPLEMENTATION

When Coding is working the Academy Origins / Origin runtime, the default is a **long execution session**, not a one-fix/one-message loop.

Coding should continue through:

`inspect live source -> identify canonical owner -> implement -> test -> fix failures -> retest -> consolidate -> retire superseded layer -> retest -> continue`

and should not stop merely because:

- one bug was identified;
- one commit landed;
- one source test failed;
- one compatibility mismatch was found;
- one cache generation advanced;
- one QA workflow turned GREEN/RED;
- ten or twenty minutes have elapsed;
- another patch could be added quickly.

A user-visible report is not a milestone by itself.

### Valid stop conditions

Coding may stop a long session only when one of these is true:

1. **Stephen must perform a surgical local edit** that Coding cannot safely perform through current GitHub/runtime tooling. Use the header-to-header replacement protocol in section 8.
2. **A genuine external-owner authority gap blocks the current causal path.** Create/update the exact GitHub handoff issue directly before stopping. Continue all non-blocked work first.
3. **A hard execution/context/tool limit is imminent.** Before stopping, commit all coherent work and write an exact durable GitHub checkpoint.
4. **The planned long-session acceptance target is actually reached** and the exact source/integration/browser evidence is recorded.

`I found the issue`, `the repair should be`, `I ran out of execution window`, and `I made progress` are not valid completion states when a code path remains editable.

---

## 3. ORIGIN CONSOLIDATION MODE — NO NEW PATCH BY DEFAULT

For Academy Origin implementation, **adding another runtime patch/module is now the exception, not the default**.

Before creating any new `alpha-*` compatibility/patch layer, Coding must prove that the behaviour cannot safely live in an existing canonical owner.

Required first step for each Origin family/tranche:

1. Re-fetch live `main` / HEAD.
2. Build the current production load graph for the relevant Origin path.
3. Identify every live module that can mutate the same responsibility.
4. Classify each as one of:
   - `CANONICAL_OWNER`
   - `TEMPORARY_COMPATIBILITY`
   - `SUPERSEDED_LIVE`
   - `UNREACHABLE/DEAD`
   - `UNKNOWN — DO NOT DELETE YET`
5. Choose exactly one canonical owner for each responsibility before changing behaviour.

Responsibilities include at minimum:

- Origin registry / selected Origin identity;
- Story decision semantics;
- factual resolver/result commit;
- Battle caller/return;
- participant/object classification;
- Scene Board projection;
- terminal debrief;
- rewards/development projection;
- Chronicle Receipt;
- Origin -> `YOUR CHRONICLE BEGINS` continuation;
- production loader/cache generation.

**Two live modules must not remain independent semantic owners of the same fact merely because removing one is inconvenient.**

---

## 4. RETIRE OLD CODE — SAFE ONE-WAY RETIREMENT LAW

Coding is authorised and expected to remove superseded Origin/Kakashi runtime code when current authority and tests prove it is no longer the owner.

Retirement sequence:

1. identify the superseded module/function/hook;
2. identify the canonical replacement owner;
3. fold any still-authorised behaviour into the canonical owner;
4. remove the superseded module from the production load chain;
5. search for remaining imports, script tags, globals, dispatch bindings, compatibility hooks and QA dependencies;
6. run focused source/integration tests with the old layer absent;
7. only then delete the old source file or dead block;
8. rerun production-delivery and Origin regression checks.

Do not keep a live duplicate `just in case`. Git retains history.

Do not delete code merely because its filename is old. `UNKNOWN` code remains until its callers/ownership are proven.

Do not mass-delete unrelated Alpha systems while consolidating Origins.

### Retirement evidence required

For every retired live layer, the commit/report must record:

- retired path or header/function;
- canonical successor owner;
- why the retired layer is superseded;
- production load-chain change;
- relevant search/reference proof;
- exact tests run after removal.

---

## 5. PATCH-STACK FIREWALL

The following are prohibited as substitutes for a semantic repair:

- advancing cache/version strings without fixing the underlying owner;
- adding a later monkey-patch that re-enables behaviour an earlier guard deliberately disabled;
- direct-loading a corrected child module in QA while production still loads an older generation;
- adding a compatibility global that silently bypasses the current canonical resolver;
- keeping multiple factual stores for the same Story/object/participant fact;
- fixing presentation by recommitting Story facts;
- fixing rewards by granting from Battle result instead of terminal factual entitlement.

If a new temporary compatibility layer is genuinely necessary, it must be marked with:

- exact reason;
- exact canonical owner it protects;
- exact retirement condition;
- Alpha blocker it resolves.

Temporary compatibility without a retirement condition is not acceptable new authority.

---

## 6. ACADEMY ORIGINS — IMPLEMENTATION TARGET

Coding should treat the ten Academy Origins as one production family with shared runtime infrastructure and Origin-specific authored content.

Current production IDs:

- `academy_hinata`
- `academy_izuno`
- `academy_mirai`
- `academy_menma`
- `academy_kushina`
- `academy_kurenai`
- `academy_iwabee`
- `academy_metal_lee`
- `academy_kakashi`
- `academy_obito`

The long-session goal is not `registered in source`.

The practical Alpha target per Origin is:

`Origin selection -> correct authored prologue -> legitimate decisions -> factual consequences -> Battle and same-Story return where authorised -> terminal closure -> Origin Chronicle Receipt -> YOUR CHRONICLE BEGINS -> exactly two legitimate Academy teammates -> first-Konoha/tutorial boundary -> ordinary Academy free play`

An Origin is not practically complete merely because a registry row or consequence mapping exists.

### Current sequencing

1. Finish/consolidate Academy Kakashi as the hardest benchmark.
2. Prove the canonical runtime path without obsolete live layers.
3. Apply the same consolidated shared runtime to the remaining Origins.
4. Fix Origin-specific defects surgically; do not fork ten separate engines.
5. Preserve #105 as the final ten-Origin installed-browser validation umbrella.

---

## 7. SOURCE TESTS ARE NECESSARY, NOT SUFFICIENT

Coding must continue using source/headless/CI diagnostics, but they may not terminate a long session if the production/browser path is still known broken.

Evidence levels remain separate:

1. source parses;
2. focused deterministic QA passes;
3. broad integration gate passes;
4. production loader contains the tested generation;
5. installed browser reproduces the path;
6. Stephen approves Golden/regression behaviour.

GREEN at levels 1–3 is not proof of level 5.

A failed installed-browser path has precedence over a passing mocked-DOM test for player-facing readiness.

---

## 8. STEPHEN SURGICAL EDIT MODE — HEADER-TO-HEADER ONLY

When Coding genuinely needs Stephen to modify a local/browser-served file manually, stop the long session only for one **surgical replacement** at a time.

Do not give line-number-only edits. Line numbers drift.

The replacement packet must contain exactly:

### FILE
Exact file path.

### START HEADER
An exact unique header/comment/function declaration that Stephen can search for.

### END HEADER
The next exact unique header/comment/function declaration that bounds the replacement.

### REPLACEMENT SCOPE
State whether Stephen should replace:
- the entire START-header section up to but not including END HEADER; or
- the exact block including both named boundary lines.

Default should be **replace from START HEADER through the line immediately before END HEADER**.

### COMPLETE REPLACEMENT
Provide the entire replacement block. No ellipses. No omitted unchanged middle.

### EXPECTED RESULT
State the exact function/global/version/visible behaviour that should exist afterward.

### VERIFY
Give one short verification step before proceeding.

Rules:

- one file/block per packet unless two files are inseparable;
- never ask Stephen to reconstruct code from several partial snippets;
- never say `find roughly this area`;
- never depend only on line numbers;
- after Stephen confirms the edit, re-fetch/inspect the actual resulting source before continuing;
- if Coding can make the edit safely through GitHub itself, Coding should do so rather than outsourcing routine editing to Stephen.

---

## 9. COMMIT DISCIPLINE DURING LONG SESSIONS

Long session does **not** mean one giant uncommitted rewrite.

Use coherent checkpoint commits while continuing work.

Good commit boundaries include:

- canonical ownership consolidation;
- one old live layer retired;
- one complete causal branch repaired;
- one shared Origin runtime seam repaired;
- production loader aligned with tested generation;
- regression test updated to canonical ownership.

Do not stop to narrate each commit to Stephen.

Continue until a valid stop condition from section 2 occurs.

Before risky retirement, a checkpoint commit is mandatory.

---

## 10. QA MUST FOLLOW THE NEW OWNER, NOT THE RETIRED PATCH

When old runtime code is retired, QA must be updated to test the canonical owner.

Do not preserve a dead patch solely because a test imports it directly.

Tests that bypass the production loader must be clearly identified as component/source tests and must not be used as production-delivery proof.

Every Origin consolidation tranche should include at least:

- component/source QA against the canonical owner;
- production-load-chain assertion;
- save/load/idempotence regression where stateful;
- Story->Battle->same-Story return where applicable;
- Scene Board projection check where applicable;
- reward/debrief/Receipt idempotence where applicable;
- broad #141 / relevant Origin umbrella gate;
- installed-browser replay when the tranche is player-facing ready.

---

## 11. AI ARCHITECTURE REVIEWER — CURRENT OPERATING RULE

`SC AI Architecture & Contract Review v1` is **advisory** and is not a continuous bot.

Its current workflow is `workflow_dispatch` only. Therefore it runs **only when manually triggered**.

Coding must not assume the OpenAI key/reviewer is watching commits automatically.

For Origin consolidation:

- do **not** run the AI reviewer after every micro-commit;
- at the start of a substantial consolidation tranche, record the tranche base SHA;
- after the coherent tranche is committed and normal tests are GREEN, manually run the AI reviewer over `BASE_SHA..HEAD`;
- reconcile any reported contradiction against live source + durable authority before acting;
- reviewer PASS does not replace browser proof;
- reviewer BLOCKING_CONTRADICTION must be checked against untruncated source/authority before becoming a Coding blocker.

If automatic AI review is later desired, change the workflow explicitly; do not assume automation exists.

---

## 12. NO MORE VERSION-CHURN SUCCESS CLAIMS

A cache/delivery generation increment is not meaningful progress by itself.

Coding completion reports should emphasise:

- player path newly working;
- canonical owner simplified;
- obsolete live owner removed;
- exact branch/reward/scene now causally complete;
- installed-browser defect fixed;
- regression prevented.

`generation 18 -> 19` without a working player path is implementation bookkeeping, not Alpha closure.

---

## 13. CURRENT KAKASHI CONSOLIDATION GUARDS

While consolidating Academy Kakashi, preserve current durable authority including:

- neutral Story decision core + Kakashi adapter model;
- current final Writing closure and machine-addressable autonomy anchors;
- Battle caller/result ownership;
- post-Battle participant classification;
- explicit object custody commits;
- `AK_SA_033 / kak_seq_secure_package_after_ps` as separate deterministic post-PS package recovery on the sequential route;
- terminal `35100` factual/debrief responsibilities unless current source proves a narrower defect;
- `34800` rewards only from exact terminal factual entitlement;
- Pakkun temporary participation != ownership/acquisition/assignment/name Knowledge;
- Minato terminal evaluation is a private cutaway unless newer authority explicitly changes it;
- Chronicle Receipt is read-only;
- Browser Golden remains unclaimed until installed replay.

Consolidation may move authorised behaviour into cleaner canonical ownership, but it must not silently change those facts.

---

## 14. SESSION COMPLETION REPORT

At a valid long-session stop, Coding reports only useful durable state:

- current HEAD;
- canonical owners changed;
- old live layers retired;
- exact code/headers replaced;
- exact Origin/player paths now working;
- tests/workflows and results;
- production loader parity;
- installed-browser status;
- one genuine blocker if one remains;
- whether Stephen must perform one header-to-header surgical edit next.

Do not end with a speculative `next I would...` essay when editable work remains.

---

## Final rule

> **For the Academy Origins, Coding now optimises for a working, consolidated production path—not patch count. Work in long execution sessions; consolidate current behaviour into canonical owners; retire proven-superseded live code; continue through ordinary failures; and stop for Stephen only when one exact header-to-header surgical replacement is genuinely required or a real owner/tool boundary is reached.**
