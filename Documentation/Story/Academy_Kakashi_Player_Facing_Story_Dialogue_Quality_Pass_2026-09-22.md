# Academy Kakashi Origin — Player-Facing Story / Dialogue Quality Pass

**Date:** 2026-09-22  
**Owner:** Writing / Story — Konoha  
**Status:** **CURRENT PLAYER-FACING EXPRESSION SUCCESSOR — SEMANTICS UNCHANGED**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## Purpose

This authority records the Academy Kakashi Origin player-facing performance pass requested by Stephen after the V2 clean-room runtime became current.

The task is not proofreading.

It is a scene-performance rewrite within existing Story rails.

Preserve all current:

- route causality;
- exact player choices;
- Battle results;
- package state;
- life/death state;
- restraint/custody/release state;
- Knowledge;
- rewards;
- chronology;
- Pakkun eligibility and ownership law;
- hidden-operation boundaries.

This pass may rewrite delegated/derived narration and dialogue where the previous wording is stiff, over-explanatory, document-like, repetitive, or insufficiently character-specific.

Any exact wording explicitly locked by Stephen remains stronger than this pass.

## Performance rule

For every scene:

> **If these were actual people standing here together, would the conversation happen like this?**

For named characters:

> **If the speaker names disappeared, could the player still tell who was speaking?**

## Character separation applied

### Academy Kakashi

- economical, observant and tactical;
- allowed to be silent;
- answers the point rather than every literal question;
- dry humour remains occasional rather than constant;
- does not narrate his own competence;
- does not sound like a rules document.

### Package Smuggler

- socially looser than the others;
- uses humour as self-preservation and pressure release;
- talks more when nervous;
- remains dangerous/complicit rather than comic relief.

### Masked Interceptor

- terse, controlled and unsentimental;
- speaks when there is a reason;
- does not join a running joke merely because another character started one.

### ANBU Marked Target

- guarded, analytical and quietly challenging;
- tests Kakashi's reasoning;
- does not become a second Package Smuggler.

### Pakkun

- practical, dry and autonomous;
- short interventions;
- does not become a quip machine or Kakashi's conscience;
- does not talk simply because the scene has gone quiet.

### ANBU Operative

- professional and concise;
- asks for what matters;
- reacts to anomalies rather than reading a checklist aloud;
- debriefs should feel like command judgement, not form completion.

### Uchiha Police

- civic/institutional suspicion distinct from ANBU;
- concerned with who Kakashi is bringing them, what happened in Konoha, and what they can actually take custody of;
- do not speak in resolver terminology.

## Global expression corrections

Player-facing narration must not expose internal authoring/runtime vocabulary such as:

- `actual committed state`;
- `package state says`;
- `exact chronology`;
- `factual shortcut`;
- `aggregate prisoner state`;
- `legitimate escort member`;
- `hidden-operation truth`;
- `automatically becomes a prisoner`;
- `Battle ended` when used as rules explanation rather than lived event.

Translate those facts into natural scene behaviour.

Examples:

- instead of explaining that custody commits separately, show Kakashi handing over restraint lines one at a time;
- instead of explaining that package state is independent, show the package physically staying with or leaving the correct person;
- instead of saying Kakashi cannot invent Knowledge, have him answer only what he actually knows;
- instead of explaining that a defeated person has not become a prisoner, let the post-fight scene leave them physically present and make the player's next choice meaningful.

## Scene families receiving direct rewrite

The current V2 runtime player-facing text is rewritten under this authority for:

- WATCH THE EXCHANGE narration where document-like analysis had replaced immediacy;
- direct Pickpocket three-captive ANBU return;
- Package Smuggler package-missing restraint / ANBU / Police outcomes;
- AMT pursuit defeat and post-Battle disposition scenes;
- AMT -> ANBU / Uchiha Police transfers;
- multi-captive collection;
- multi-captive ANBU handoff;
- multi-captive Uchiha Police handoff;
- singular PS ANBU return;
- singular AMT ANBU return;
- all-three return journey;
- Secure Package ANBU debrief variants;
- any current V2 lines incorrectly encoded as dialogue/narration;
- any current V2 player-facing rules-language leak covered by the global corrections above.

The current V2 runtime content implementation is:

`runtime/academy-kakashi-v2-content-36000.js`

## Dialogue/narration typing rule

A character's spoken line must be a dialogue item with its actual `speakerName`.

Narration, stage direction and transition text must not be assigned to a speaking character.

This pass specifically corrects existing cases where:

- `PACKAGE SMUGGLER: “...”` had been rendered as narration text;
- narration had accidentally been stored as Package Smuggler dialogue;
- `A beat.` had been stored as Kakashi dialogue.

## Debrief rule

A debrief must still convey the necessary facts, but the facts should emerge through:

- what the operative notices on arrival;
- one or two consequential questions;
- Kakashi's own concise report;
- reactions from prisoners/Pakkun only when they would realistically interject;
- silence where silence is more believable than another joke.

Do not enumerate the scene as:

> the target; the handoff; the fight; the recovery; the prisoners.

Do not narrate implementation constraints to the player.

## Group-scene rule

When several characters are present:

- a new line should normally respond to what just happened;
- not everyone must speak;
- silence can distinguish MI from PS;
- AMT may refuse to help PS make light of the situation;
- Pakkun should not automatically supply the fourth punchline;
- Kakashi may simply keep moving rather than verbally winning the exchange.

## Final lock

> **This pass changes expression, not Story truth.**

> **The Kakashi Origin should now feel like people inhabiting a tense night in Konoha, not a state machine explaining itself through prose.**

> **Where this authority changes delegated/derived wording, the improved player-facing expression supersedes the older wording while preserving the older file's semantic facts.**


## Implementation record — 2026-09-22

The current clean-room Academy Kakashi V2 player-facing runtime has been rewritten under this authority.

### Live files

- `runtime/academy-kakashi-v2-content-36000.js`
- `runtime/alpha-kakashi-v2-core-36020.js`

### Commit lineage

- `02d544ed1c7261a9177a23cb2ff09a8043c5a4d0` — first player-facing content rewrite;
- `519bc52486fb60760965104a19cb197b9bb213d3` — live consumed scene-family performance polish;
- `3cb5416509ad682e5573608ece58d8611fc1d153` — dynamic ANBU debrief + private Minato performance rewrite;
- `a7a31ff82db2df2ce1d360390b154afb726a7644` — removal of remaining player-facing rules/debug language;
- `6be81a79bdb6d24386211c5da8c4e92c719dd493` — final 30-beat inline V2 performance rewrite.

### Acceptance checks completed

- both edited JavaScript runtime files parse as executable source;
- current exact Scene 02 and Scene 03A choice labels remain present unchanged;
- scan for player-facing internal-authority phrases such as `actual committed state`, `exact chronology`, `factual shortcut`, `aggregate prisoner state`, `hidden-operation truth`, `last factual holder` and `second roll` is clean;
- route topology and factual consequence commits were not changed by the Writing pass.

### Runtime choreography boundary

Several current V2 disposition choices intentionally transition directly to `v2_report`.

The installed-browser Golden test currently asserts those direct transition targets.

This Writing pass therefore does **not** insert new intermediate route beats.

Where an immediate post-choice choreography beat is later desired, Coding / Runtime must change that route topology and its Golden expectations together. That is a presentation/choreography follow-up, not an unresolved Story fact.


## Character-anchor reinforcement — 2026-09-22

The dialogue-quality pass now has an explicit mandatory character preflight:

`Documentation/Story/Academy_Kakashi_Active_Cast_Character_Voice_and_Personality_Anchors_2026-09-22.md`
@ `4b2f25f3802da8b0a3d6e1e34696e81353d8da0f`

The general registry reinforcement is:
`Documentation/Story/Character_Personality_and_Voice_Profile_Registry_2026-09-19.md`
@ `9dcfd72efe741bf23ea81bef2bcd1b50ffe070bd`.

Before substantial dialogue finalisation:
- refresh/build every materially speaking recurring character anchor;
- research canon age/era and behavioural range for established characters;
- apply SC Recorded History after canon;
- preserve recurring original-NPC anchors durably;
- remove speaker names and run the speaker-fingerprint test;
- run the plot-puppet test;
- reject shared project house voice even when the lines are individually competent.

The live Kakashi V2 dialogue was re-passed under these anchors through commit:
`d1d42febfc2f7835365ad2cbd7a5de0b70dde536`.
## Final character-performance acceptance pass — 2026-09-23

A final source-first acceptance pass was performed after the active-cast anchor application, against live `main` beginning at:

`0535108163d300a8ce04493b19ae9a8d8ebae612` — `Track Kakashi character anchor voice re-pass`.

The binding active-cast anchor was re-consumed before changing dialogue.

### Runtime expression commits

- `1cb74396a40bb767c7eff108f3b3f519af30460d` — `Refine Kakashi active-cast character performance`
- `561f5ba7c8e24e7362d50236ac8923852a13052d` — `Finish Kakashi character-performance acceptance pass`

### Acceptance corrections

The pass changed expression only where the speaker-fingerprint / plot-puppet tests still genuinely failed.

It specifically:

- removed remaining Pakkun punchline chains and conscience-like commentary in favour of practical, autonomous observations;
- removed several adult-Kakashi-style comeback exchanges and kept the current Academy Kakashi more direct / young;
- removed Masked Interceptor from conversational banter where silence or immediate operational judgement fit her better;
- tightened Package Smuggler humour where danger / custody had closed in, without removing his social-pressure defence;
- sharpened ANBU Marked Target toward premise / boundary challenges rather than generic irritation;
- converted remaining ANBU / Minato form-like report enumeration into professional operational synthesis while preserving every reported fact and Knowledge boundary.

### Preserved exactly

No Story semantic or route-topology change was authorised or made.

The current exact player choices remain unchanged, including:

- `WATCH THE EXCHANGE`
- `MOVE IN CLOSER`
- `STRIKE BEFORE THE HANDOFF`
- `SLIP IN FOR THE PACKAGE`
- `STOP THE ASSASSIN`
- `SECURE THE PACKAGE`
- `SECURE THE PACKAGE BEFORE THE ASSASSIN`
- `DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE`
- `GO AFTER THE ORIGINAL TARGET`

Current direct disposition transitions to `v2_report` remain intact.

### Validation

Post-write live-`main` validation:

- `runtime/academy-kakashi-v2-content-36000.js` parses GREEN;
- `runtime/alpha-kakashi-v2-core-36020.js` parses GREEN;
- locked choice-label scan GREEN;
- targeted residual shared-house-voice scan GREEN;
- targeted internal rules/runtime-language scan GREEN;
- representative KILL / ANBU / POLICE direct-`v2_report` topology checks GREEN.

This proves **SOURCE / RUNTIME EXPRESSION VALIDATED** for the final acceptance pass.

It does **not** claim installed-browser validation or Browser Golden after these latest expression commits.

### #312 reconciliation note

Coding / Runtime issue #312 / PR #318 had already reconciled an earlier Writing head before these two commits existed.

Before #312 is merged, its branch must reconcile the current `36000` / `36020` expression heads above so superseded dialogue is not restored.

That reconciliation must not alter the already-owned #312 choreography / Battle presentation semantics.
