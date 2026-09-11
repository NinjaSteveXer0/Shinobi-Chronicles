# Shinobi Chronicles — Arc 1 Mission 1 Pre-Whisper Three-Person Trace Producer Contract

**Date:** 2026-09-10  
**Owner:** CE / Codex / Coordination — cross-system reconciliation  
**Status:** **BINDING ALPHA PRODUCER/CALLER CLOSURE — IMPLEMENTATION SEPARATE**  
**Source issue:** GitHub #58

## 1. Purpose

Close the earliest remaining fresh-save → Arc 1 Mission 1 production seam without redesigning Mission 1, Whisper Woods, Combat, or regional geometry.

Existing authority already establishes:

- Mission 1 begins from a caravan / smuggling lead involving illegal seals and summoning material;
- Whisper Woods is not public from start;
- the Mission-1 approach becomes legitimate only after the pre-Woods investigation establishes the three-person physical trace;
- the exact prerequisite consumed by runtime is `arc1_m1_caravan_three_person_trace_confirmed`;
- first legitimate Whisper Woods entry uses the existing `whisper_woods_discovered` history;
- the later major-contact Story caller, participants and optional Battle are already separately closed and implemented.

This contract closes only the missing pre-Whisper producer and the actionability seam that follows it.

## 2. Ownership ruling

The missing producer is a **World-owned factual investigation occurrence inside the active Mission-1 Story envelope**.

No new Writing Story Scene is required merely to establish the physical trace.

Writing owns that Mission 1 contains the caravan/smuggling investigation and later Whisper Woods Story. World owns the factual local investigation opportunity and source occurrence that establishes physical trace evidence. Coding implements the producer, persistence, Knowledge projection and transition.

Therefore:

**Story Mission envelope != World investigation occurrence**  
**World trace occurrence != Story Scene**  
**trace fact != Whisper Woods discovery automatically**

## 3. Exact machine addresses

### World opportunity

`arc1_m1_pre_whisper_caravan_trace`

### World event

`arc1_m1_pre_whisper_caravan_trace_event`

### Deliberate investigation action

`investigate_three_person_trace`

### Committed factual source occurrence

`arc1_m1_caravan_three_person_trace_confirmed`

The existing source ID is retained exactly. Do not rename it to an `occ_*` alias or mint a second equivalent fact.

### Exact occurrence-local physical evidence refs

- `arc1_m1_caravan_trace_signature_01`
- `arc1_m1_caravan_trace_signature_02`
- `arc1_m1_caravan_trace_signature_03`

These are **evidence/object refs, not participant identities**. They establish three distinct physical movement signatures associated with the caravan investigation context. They do not identify the three people, their faction, their motives, their names, or guarantee that they correspond one-for-one with later Whisper Woods participants.

## 4. Factual commit boundary

`arc1_m1_caravan_three_person_trace_confirmed` commits exactly once when all of the following are true:

1. the Arc-1 Mission-1 caravan/smuggling investigation is currently legitimate for the protagonist's Chronicle;
2. `arc1_m1_pre_whisper_caravan_trace_event` is the current legitimate factual World occurrence;
3. the player deliberately commits `investigate_three_person_trace` or an already-authorised equivalent factual investigation action against that occurrence;
4. the resolver has bound the three exact evidence refs above to the current occurrence;
5. the evidence has factually established **three distinct physical movement signatures** rather than one trail viewed three times;
6. those signatures establish a coherent continuation away from the caravan scene toward the authored Whisper Woods approach/forest route strongly enough to support the Mission-1 next-step inference;
7. the investigation resolves successfully enough that the trace fact is no longer merely possible or speculative.

Hovering, selecting the map, opening a drawer, receiving the caravan lead, or merely entering Mission 1 does not commit this occurrence.

If the action is invalid, aborted, or fails before the factual confirmation boundary, no committed trace occurrence is created.

## 5. Minimum committed payload

The committed occurrence must retain at minimum:

- `sourceOccurrenceId = arc1_m1_caravan_three_person_trace_confirmed`
- `eventId = arc1_m1_pre_whisper_caravan_trace_event`
- `opportunityId = arc1_m1_pre_whisper_caravan_trace`
- `actionId = investigate_three_person_trace`
- `evidenceRefs = [arc1_m1_caravan_trace_signature_01, arc1_m1_caravan_trace_signature_02, arc1_m1_caravan_trace_signature_03]`
- `distinctTraceCount = 3`
- `traceDirectionSupportsWhisperWoodsApproach = true`
- current protagonist stable participant ref
- exact current factual observer/participant refs that actually witnessed or legitimately learned the result
- causal parent/current Mission-1 context ref sufficient to prove this was the pre-Whisper caravan investigation rather than an unrelated three-track observation.

The evidence refs may carry richer factual observations, but implementation must not invent names, affiliations or motives from the three-trace count.

## 6. Knowledge boundary

World Truth and observer Knowledge remain separate.

The committed World fact may exist once established, but only actual observers or recipients of a legitimate communication/evidence transfer gain Knowledge of it.

For the normal player-facing Alpha route, the protagonist's accepted investigation must establish legitimate protagonist Knowledge sufficient to understand:

- three distinct physical movement signatures were confirmed;
- they continue toward the Whisper Woods approach/forest route.

This does **not** establish:

- who the three people are;
- that the later Rogue Shinobi, injured Smuggler and Unknown Operative are exactly those three traces;
- Kaien Shigure's full involvement;
- hidden Whisper Woods local hotspots;
- Unknown Operative identity/faction;
- unrestricted future access.

Ordinary investigation is sufficient for this baseline Mission-1 producer. A specialist Tracking/Investigation Skill may legitimately enrich evidence where separately authorised, but **no specialist capability is required to satisfy this mandatory fresh-save Story gate**.

## 7. Exact Whisper Woods actionability transition

The existing regional World authority remains:

- regional destination: `fire:O21` — Whisper Woods;
- regional approach route: `fire:R13` — Whisper Woods Approach;
- contained mission area: `whisper_woods`;
- first legitimate entry history: `whisper_woods_discovered`.

Coding may treat the Mission-1 approach as actionable through the derived predicate:

`Mission1WhisperApproachActionable(actor)`

which is true only when:

1. Mission 1 is currently active/legitimate for that Chronicle;
2. `arc1_m1_caravan_three_person_trace_confirmed` is already committed and not rolled back as an invalid/precommit attempt;
3. no later committed Story/World state has explicitly suppressed or closed the approach.

When that predicate becomes true, runtime may expose the Mission-1 approach to `fire:R13` / `fire:O21` and allow transition into the existing `whisper_woods` contained area.

This actionability transition is **derived current state, not a second occurrence**. Do not mint a redundant `trace_confirmed_then_whisper_actionable` history record merely because UI projection changes.

First legitimate entry continues to commit/consume `whisper_woods_discovered` under existing World authority.

If replacement regional pixel geometry is not yet available, the Mission-1 semantic transition may still enter the already-authorised contained `whisper_woods` area from the Mission caller. Regional map calibration must not block the causal Story path.

## 8. Save/load/retry/idempotence

- The source occurrence is once-only per legitimate Mission-1 Chronicle path.
- Retry before commitment may re-enter the investigation opportunity without history duplication.
- Save/load after commitment restores the same committed source occurrence and the same three evidence refs.
- Reloading or reopening the map does not reroll the trace count, evidence refs, direction, or actionability.
- Repeating inspection after commitment may project the existing Knowledge/history but must not mint a second trace-confirmation occurrence.
- `whisper_woods_discovered` remains a separate downstream occurrence/history and is not retroactively merged into the trace source.

## 9. No automatic side effects

This producer creates no automatic:

- Battle;
- Promotion/Rank change;
- PL/Stat change;
- Progression/Skill ownership or mastery;
- Acquisition/ownership;
- generic EXP or reward;
- relationship change;
- participant identity reveal;
- permanent unrestricted Whisper Woods access.

Any later consequence requires its own owning authority.

## 10. Relationship to already-closed Mission-1 caller

The later major-contact chain remains unchanged:

`occ_arc1_m1_whisper_major_contact_scene_transition`
→ `scene_arc1_m1_whisper_major_contact`
→ optional `arc1_m1_unknown_operative_confrontation`
→ same Story occurrence continuation.

Stable later participants remain:

- `arc1_m1_whisper_rogue_shinobi_01`
- `arc1_m1_whisper_injured_smuggler_01`
- `arc1_m1_unknown_operative`

The three pre-Whisper evidence signatures do **not** manufacture or identify those participants.

## 11. Required Coding regression

Implementation should prove at minimum:

1. fresh save can enter Mission 1 without diagnostic trace injection;
2. caravan lead alone leaves Whisper Woods approach non-actionable;
3. deliberate valid investigation commits exactly one `arc1_m1_caravan_three_person_trace_confirmed`;
4. all three exact evidence refs survive save/load;
5. three distinct traces are required; duplicate aliases of one trace do not qualify;
6. protagonist receives legitimate bounded Knowledge of the confirmed directional trace;
7. no identity/faction/secret-area Knowledge is inferred from the trace;
8. committed trace makes the Mission-1 Whisper Woods approach actionable through the derived predicate;
9. first actual Whisper Woods entry still owns `whisper_woods_discovered` separately;
10. UI reopen/reload does not duplicate or reroll the producer;
11. invalid/precommit investigation creates no false history;
12. regional map-art/calibration absence does not block the semantic Mission-1 contained-area transition;
13. the already-implemented major-contact caller remains unchanged and GREEN;
14. no hidden reward/PL/Progression/Acquisition side effect is created.

## 12. Preserve

**caravan/smuggling lead != three-person trace**  
**three physical traces != three identified people**  
**World occurrence != Story occurrence**  
**World Truth != observer Knowledge != presentation**  
**trace confirmed != Whisper Woods discovered**  
**Whisper Woods discovered != permanent unrestricted access**  
**actionability projection != new committed occurrence**  
**diagnostic injection != production producer**  
**map geometry != semantic availability**  
**specialist capability may enrich != specialist capability required for mandatory Story gate**  
**design closed != implemented != runtime validated != Golden GREEN**

## 13. Verdict

Pre-Whisper producer semantics: **CLOSED**.  
Exact source occurrence: **CLOSED**.  
Exact opportunity/event/action addresses: **CLOSED**.  
Exact evidence refs: **CLOSED**.  
Knowledge boundary: **CLOSED**.  
Whisper Woods actionability seam: **CLOSED**.  
Save/load/idempotence expectation: **CLOSED**.  
Runtime implementation: **PENDING CODING**.  
Whole Mission-1 / Arc-1 / Alpha Golden: **NOT CLAIMED**.
