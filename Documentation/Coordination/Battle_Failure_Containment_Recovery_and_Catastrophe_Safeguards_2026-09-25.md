# Shinobi Chronicles — Battle Failure Containment, Recovery and Catastrophe Safeguards

**Date:** 2026-09-25  
**Owner:** CE / Codex / Coordination, preserving Combat and Coding ownership boundaries  
**Status:** **DESIGN LOCKED / IMPLEMENTATION HOLD — DO NOT CODE YET**  
**Applies to:** the forthcoming shared Shinobi Chronicles Battle redesign and any runtime implementation derived from the six-shinobi relay concept  
**Primary priority:** finish Shinobi Chronicles Alpha without allowing Battle presentation/runtime failure to corrupt semantic Battle truth.

---

## 1. Purpose

The new Battle system must not only define what happens when everything works.

It must define what remains true when something goes wrong.

This contract exists so that failures such as:

- animation exceptions;
- double-clicks;
- repeated keyboard input;
- stale timers/listeners;
- browser reloads;
- interrupted transitions;
- malformed formation projection;
- duplicate runtime ownership;
- missing optional presentation assets;
- missing authoritative actor/action/target references;
- partial multi-target resolution;
- stale callbacks from a previous Battle;
- save/load during a side transition;

cannot silently produce:

- duplicate actions;
- free turns;
- double damage;
- rerolled outcomes;
- partially committed PL/state;
- impossible formations;
- duplicated rewards/history;
- two Battle engines competing for ownership;
- animation-dependent semantic truth.

This document extends existing production safeguards rather than replacing them, especially:

- `Documentation/Coordination/Runtime_Change_Safety_Ownership_Retirement_and_Golden_Promotion_Gate_2026-09-22.md` / #300;
- `Documentation/Coordination/Alpha_Second_Wave_Regression_and_Integrity_Safeguards_2026-09-22.md` / #311;
- `Documentation/Coordination/Six_Shinobi_Relay_Formation_and_Alternating_Side_Turn_Battle_Concept_Lock_2026-09-25.md`.

# 2. Core catastrophe doctrine

Canonical rule:

> **FALLBACK TO AUTHORITATIVE STATE, NOT TO OLD CODE.**

The project must not keep an old Battle engine semantically live as an emergency fallback.

If the new Battle presentation fails:

- recover from canonical committed Battle state;
- skip/cancel/rebuild presentation where necessary;
- do not wake a retired semantic owner;
- do not reconstruct truth from DOM position or animation completion;
- do not rerun an already committed action.

And:

> **NO TIMER, ANIMATION, DOM EVENT, CSS TRANSITION, PORTRAIT MOVEMENT OR PRESENTATION CALLBACK MAY BE REQUIRED FOR A SEMANTIC BATTLE COMMIT TO BECOME TRUE.**

Presentation may make Battle truth visible.

Presentation may never be required to make Battle truth factual.

# 3. Safeguard 1 — one semantic Battle owner

Exactly one canonical Combat/Battle semantic owner may:

- commit a Battle action;
- mutate Battle PL/state;
- consume the side action opportunity;
- change active side;
- declare withdrawal;
- determine ordinary promotion eligibility;
- normalize formation;
- declare side exhaustion;
- commit Battle completion.

UI, animation playback, target highlighting, enemy scheduling and Story adapters may request or present these facts.

They may not independently author them.

Existing #300 duplicate-owner / duplicate-state-writer protections must extend to the new Battle responsibilities when implementation is eventually authorised.

# 4. Safeguard 2 — transactional action commit

A Battle action must not become a sequence of independently persisted semantic mutations such as:

~~~text
damage target A
save
damage target B
save
withdraw Active
save
promote successor
save
~~~

Instead, one action must conceptually resolve into one candidate authoritative next state:

~~~text
previous authoritative state
-> resolve complete action
-> resolve every affected target/result segment
-> derive withdrawals
-> derive one normalized surviving formation
-> derive next side/phase/completion
-> validate candidate state
-> commit candidate state once
~~~

If resolution or validation fails before commit:

- preserve the previous authoritative semantic state;
- do not partially persist the action;
- do not consume the action opportunity;
- do not fabricate a partial historical occurrence.

Multi-target / multi-withdrawal actions remain one causal committed action.

# 5. Safeguard 3 — unique Battle and action-opportunity identity

Every live Battle must have stable identity equivalent to a unique Battle/session ID.

Every legitimate side action opportunity must have stable identity equivalent to a unique action-opportunity ID.

A committed action-opportunity ID is single-use.

The same opportunity may not commit twice because of:

- double-click;
- repeated Enter/Space;
- two event handlers;
- stale promise resolution;
- retry callback;
- browser restoration;
- animation completion;
- duplicated enemy scheduler;
- re-render.

Duplicate submission of an already consumed opportunity must be rejected/no-op without creating a second historical action.

# 6. Safeguard 4 — strict semantic phase/state machine

Battle must expose an authoritative semantic phase model sufficient to reject impossible transitions.

Exact Coding schema remains implementation-owned, but it must distinguish at least the equivalent of:

- which Battle/session is current;
- which side owns the next normal action opportunity;
- whether an action has been accepted/committed;
- whether a Battle result/completion is already committed;
- any required continuation/replacement state that cannot be inferred safely.

Only legal phase transitions may commit.

Examples of invalid/stale work that must not mutate semantic state:

- player action submitted while enemy side owns the opportunity;
- second player action for an already consumed opportunity;
- duplicate enemy response;
- target selection belonging to an old action;
- callback from a prior Battle/session;
- action arriving after Battle completion.

# 7. Safeguard 5 — post-submit input lock

Once a valid player action submission has been accepted for commitment:

- SKILLS / ITEMS / SUMMONS action submission is locked for that opportunity;
- target submission is locked for that opportunity;
- keyboard and pointer aliases cannot submit a second action;
- re-render does not reopen the consumed opportunity.

The next input opportunity opens only from authoritative semantic state.

Presentation timing does not independently unlock it.

# 8. Safeguard 6 — presentation failure cannot block semantic truth

Correct architecture:

~~~text
Combat resolves + validates
-> semantic state commits
-> presentation stages the committed result
~~~

If presentation fails after commit:

- semantic truth remains committed;
- do not rollback solely because animation failed;
- do not rerun the resolver;
- do not restore spent resources/opportunity merely because presentation failed;
- settle/re-render directly from authoritative committed state.

This includes:

- failed attack animation;
- failed target response;
- failed PL drain animation;
- failed withdrawal choreography;
- failed Benched -> Active movement;
- failed Reserve -> Benched movement;
- reduced-motion mode;
- interrupted transition;
- lost animation event;
- page hidden/resumed.

# 9. Safeguard 7 — presentation watchdog is allowed only to recover presentation

A bounded presentation watchdog/recovery path is permitted to prevent the UI remaining permanently locked when an expected animation/presentation completion never arrives.

The watchdog may:

- cancel remaining presentation;
- clear stale presentation locks;
- render the canonical committed Battle state;
- continue from the already-authoritative semantic phase.

The watchdog must never:

- calculate damage;
- invent HIT/MISS/BLOCK/etc.;
- consume a new action opportunity;
- change active side by itself;
- withdraw/promote a participant by itself;
- reroll RNG;
- commit Battle completion;
- write Story consequences.

Canonical rule:

> **A watchdog may repair presentation progress. It may not become a hidden semantic scheduler.**

# 10. Safeguard 8 — atomic persistence after semantic commit

After a semantic action commits, save/load recovery must know the resulting Battle truth.

If:

~~~text
player action commits
-> browser closes before enemy presentation/action
~~~

reload must not grant a free player action.

The save must preserve enough authoritative state to recover facts equivalent to:

- Battle/session identity;
- sequence/action-opportunity identity;
- committed participant Battle state;
- current normalized formation;
- active side / next side obligation;
- spent once-per-Battle/action resources where applicable;
- committed conditions/state;
- Battle completion state where applicable.

Exact persistence schema remains Coding-owned.

The semantic checkpoint must be sufficient to resume truth without replaying an already committed action.

# 11. Safeguard 9 — deterministic formation normalization

Formation normalization must remain semantic and deterministic from:

- surviving participants;
- authoritative Battle state;
- committed My Clan formation order for the player side;
- authorised enemy formation/order;
- any separately authorised explicit Combat reorder/rotation mechanic.

One action that withdraws several participants:

~~~text
resolves all withdrawals
-> derives one surviving formation
-> validates it
-> commits it once
-> presentation stages it
~~~

Do not run one competing replacement routine per withdrawn portrait.

Visual movement into another slot does not silently rewrite original My Clan priority.

# 12. Safeguard 10 — candidate-state invariant validation

Before an action's candidate next state can become authoritative, validate Battle invariants appropriate to that state.

At minimum, implementation must reject impossible state equivalent to:

- one participant occupying multiple formation positions;
- withdrawn participant still occupying a live deployed slot;
- participant omitted/duplicated because of normalization error;
- more than six standard Character participants per side;
- surviving side with no authoritative Active when one is required;
- exhausted side still receiving a normal action opportunity;
- completed Battle receiving another normal action;
- illegal target/result participant reference;
- inconsistent Battle/session/opportunity identity;
- My Clan order being mutated merely by presentation relocation;
- impossible negative/NaN/non-finite PL or other malformed required numeric state where not expressly authored.

Validation should protect semantic state, not attempt to police harmless CSS geometry.

# 13. Safeguard 11 — stale-work cancellation / generation checks

Timers, promises, observers, listeners, requestAnimationFrame work and presentation callbacks must be bounded to the Battle/session and action sequence that created them.

When that Battle/session/action is no longer current:

- stale work becomes a no-op;
- it cannot recommit state;
- it cannot unlock/lock a newer action incorrectly;
- it cannot alter a newer formation;
- it cannot return a completed Battle to Story a second time.

Repeated:

~~~text
Story -> Battle -> Story -> Battle -> Story
~~~

must not accumulate semantically active leftovers.

This extends the project-wide #311 lifecycle/re-entry safeguard.

# 14. Safeguard 12 — semantic references fail closed; optional presentation fails soft

Differentiate authoritative semantic references from optional presentation resources.

### Authoritative semantic reference missing/invalid

Examples:

- actor identity;
- action/Skill identity;
- exact target;
- required participant state;
- required result/resolver identity;
- authoritative Battle config.

Required behavior:

- do not guess a replacement;
- do not target slot 1 because the intended target ref is missing;
- do not silently substitute another action;
- fail before semantic commit where possible;
- surface diagnostic evidence.

### Optional presentation resource missing/failing

Examples:

- optional motion effect;
- optional impact visual;
- non-semantic decorative asset;
- animation primitive.

Required behavior:

- preserve semantic truth;
- use safe presentation fallback or hard settle;
- continue from canonical state.

A missing optional visual may make the action less pretty.

It may not corrupt Battle.

# 15. Safeguard 13 — committed RNG/results never reroll

Any randomness used to resolve a committed action becomes part of the committed result/evidence.

Reload/re-render/replay of presentation must not reroll:

- HIT/MISS/etc.;
- target selection already committed;
- random damage/effect segment already committed;
- resolver branch already committed;
- any stochastic result that has already become historical truth.

If an RNG cursor/seed/state is required for deterministic continuation, persistence must preserve enough information to prevent duplicate/random replay.

Presentation never calls semantic RNG to recreate an already committed action.

# 16. Safeguard 14 — compact Battle action receipt/journal

Maintain bounded Battle-local diagnostic evidence sufficient to reconstruct what the runtime believed happened.

Exact format remains Coding-owned, but evidence should identify the equivalent of:

- Battle/session ID;
- action sequence/opportunity ID;
- acting side;
- actor participant ref;
- action ref;
- exact target refs;
- committed result class/segments;
- pre/post semantic state identity or compact state evidence;
- withdrawals caused by that action;
- normalized formation after commit where changed;
- next semantic phase/side;
- completion result where applicable.

This is a debugging/recovery aid, not a second semantic owner and not a speculative telemetry platform.

Chronicle/history projection remains governed by its proper authority.

# 17. Safeguard 15 — last-known-good semantic containment

Never overwrite the current authoritative Battle state with an unvalidated candidate merely because resolution began.

Canonical model:

~~~text
KNOWN-GOOD STATE A
-> compute candidate STATE B
-> validate B
-> atomic commit B

if compute/validation fails:
remain on STATE A
~~~

Do not leave:

~~~text
half of A + half of B
~~~

as saved truth.

If a failure occurs after B already committed successfully, B remains truth and presentation settles to B.

The recovery behavior therefore depends on whether semantic commit happened, not on whether the animation looked finished.

# 18. Safeguard 16 — no live legacy Battle-engine fallback

The forthcoming shared Battle owner must not be protected by leaving a retired Battle semantic engine capable of taking over production responsibilities.

Do not implement:

~~~text
new Battle fails
-> invoke old Battle engine
~~~

as a semantic recovery path.

That recreates the duplicate-owner / stale-writer failure class #300 exists to prevent.

A retired owner must remain retired.

Recovery means:

- restore/render canonical state;
- reload the canonical owner;
- reject an invalid action;
- resume from a valid checkpoint;
- surface a hard diagnostic where semantic authority is unavailable.

It does **not** mean transferring semantic control to superseded runtime.

# 19. Mandatory deliberate-failure / sabotage QA

When implementation is eventually authorised, GREEN must include deliberate negative/recovery fixtures proving the safeguards can detect or survive representative failures.

Minimum Battle-specific sabotage matrix should include:

1. double-click one Skill/action submission;
2. repeated keyboard submit on the same opportunity;
3. duplicate semantic handler/writer;
4. throw during actor animation after semantic commit;
5. throw during target reaction after semantic commit;
6. prevent an animation-completion event from firing;
7. reload after player action commit but before enemy response;
8. reload after withdrawal commit but before promotion animation completes;
9. stale callback from previous action fires during the next action;
10. stale callback from previous Battle fires after Story return;
11. illegal/off-list target submitted;
12. missing authoritative actor/action/target reference;
13. missing optional presentation asset/effect;
14. malformed candidate formation containing a duplicate participant;
15. malformed candidate state with withdrawn participant still Active;
16. one action withdraws Active + multiple Benched participants;
17. all six participants withdraw from one committed action where legally possible;
18. RNG-influenced committed result reloads without reroll;
19. Story -> Battle -> Story -> Battle repeated re-entry;
20. attempt to reintroduce retired Battle semantic owner.

The bad fixture must either:

- fail the guard before corruption; or
- recover to the already committed canonical state without duplicate semantic effects.

A test that cannot turn RED when the safeguard is deliberately violated is not sufficient evidence that the safeguard exists.

# 20. Story / reward / consequence boundary

Battle containment must not broaden Battle ownership.

Battle completion may emit its authorised result/evidence.

It may not invent:

- Story custody;
- death;
- injury;
- Promotion;
- mission success;
- morality;
- reward values;
- persistent acquisition;
- disposition;
- narrative continuation.

A Battle recovery path must therefore never "repair" a failed Story return by manufacturing Story facts.

Existing Story -> Battle -> Story contracts and consequence owners remain authoritative.

# 21. Scope control

These safeguards are intended to prevent a catastrophic runtime failure class without becoming a second product.

Do not use this authority to justify:

- enterprise event sourcing;
- permanent support for every historical development save;
- a second Battle engine;
- an independent presentation state database;
- route-specific bespoke recovery engines;
- speculative multiplayer rollback infrastructure during Alpha;
- a telemetry platform;
- animation-owned semantic scheduling.

Prefer compact reusable invariants.

# 22. Implementation release condition

This safeguard contract is **DESIGN LOCKED** now.

It does not release the Battle implementation hold.

The standing Battle state remains:

~~~text
BATTLE DESIGN = LOCKED
FAILURE/RECOVERY SAFEGUARDS = LOCKED
BATTLE IMPLEMENTATION = HOLD
CODING HANDOFF = NONE
~~~

Coding implementation begins only when Stephen explicitly releases the existing Battle implementation hold.

When released, these safeguards are part of the implementation contract from the first semantic Battle tranche, not a cleanup pass added after animation.

# 23. Final lock

> **A Shinobi Chronicles Battle action must resolve from one known-good authoritative state into one validated next state and commit exactly once. Unique Battle/action-opportunity identity prevents duplicate commits. Save/load preserves which semantic state and side obligation already exist. Formation normalization is deterministic and commits once. Presentation plays committed truth but cannot create it; animation failure, cancellation, reduced motion or watchdog recovery settles to canonical state rather than rerunning semantics. Stale work cannot mutate newer Battle state. Missing semantic authority fails closed, while optional visual failure fails soft. Committed randomness never rerolls. Retired Battle engines never reactivate as emergency semantic fallbacks. The project recovers from authoritative state, not from old code.**
