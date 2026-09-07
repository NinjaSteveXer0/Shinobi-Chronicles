# Shinobi Chronicles — Arc 1 Mission 1 Whisper Woods Major-Contact Story Scene Contract

**Date:** 2026-09-08  
**Owner:** Writing — Konoha  
**Status:** ALPHA STORY AUTHORITY / IMPLEMENTATION-READY SUBJECT TO ONE WORLD INSTANCE RETURN

This document closes the Writing-owned causal Story contract requested by GitHub issue #17 for:

- scene: `scene_arc1_m1_whisper_major_contact`
- opportunity: `arc1_m1_whisper_major_contact`
- event: `arc1_m1_whisper_major_contact_event`
- opponent stable identity: `arc1_m1_unknown_operative`
- observer-safe projection: `observer_projection_unknown_operative`
- confrontation package: `arc1_m1_unknown_operative_confrontation`

It consumes the existing Combat/Registry/CE closures and does not redesign them.

## 1. Entry / legal caller transition

The World opportunity/event may enter `scene_arc1_m1_whisper_major_contact` only when the major-contact event is the currently resolved Whisper Woods occurrence and its actual participant/world-instance state is supplied to Story.

Story must receive at minimum:

- protagonist stable participant/variant ref;
- current physically present team/travel participant refs;
- current Chronicle-relative participation/relationship/Knowledge evidence available to those actors;
- actual stable Rogue Shinobi world-instance participant ref for this occurrence;
- current Smuggler presence/custody/availability fact if still present;
- `arc1_m1_unknown_operative` observer projection context;
- any prior Mission-1 facts that legitimately alter dialogue or willingness to act.

Story does not manufacture a participant because a display label exists.

## 2. Authored major-contact beat order

The stable causal order is:

1. the team/event enters the major-contact occurrence and observes the concealed Unknown Operative through `observer_projection_unknown_operative`;
2. the Unknown Operative is not automatically hostile and may pursue information from the Smuggler/current scene state;
3. the actual Rogue Shinobi participant confronts/interferes with the Unknown Operative;
4. if the required scene context remains valid, Story commits the contextual wrist-break beat using `arc1_m1_unknown_operative_wrist_break` against the exact Rogue Shinobi stable participant supplied by World;
5. factual result: `fractured_wrist` is committed only through the existing Combat contextual-action contract; Story does not infer a generic injury from ordinary attacks;
6. the Rogue Shinobi's role may then change from primary immediate threat toward wounded information source / temporarily aligned or non-hostile participant according to actual resolved state;
7. the Unknown Operative remains a distinct external actor with independent intent and does not become automatically hostile merely because the player distrusts him;
8. the protagonist may reach a contextual resolution intent of **Detain**, **Kill**, or **Release** where eligible;
9. teammate/leader reactions are resolved from their own Chronicle state before Story supplies the exact active confrontation participant set;
10. Kill or Detain may legally transition into `arc1_m1_unknown_operative_confrontation`; Release does not invoke that package;
11. Story consumes the returned Combat outcome envelope and continues/terminates the same major-contact occurrence from the factual result.

## 3. Wrist-break source occurrence

Writing source occurrence:

`occ_arc1_m1_whisper_unknown_operative_wrist_break`

Commit boundary: the contextual action contract has legally resolved against the actual World-supplied Rogue Shinobi stable participant and the `fractured_wrist` factual injury occurrence has been accepted.

Required source ancestry:

- `scene_arc1_m1_whisper_major_contact`
- `arc1_m1_whisper_major_contact`
- `arc1_m1_whisper_major_contact_event`
- actor `arc1_m1_unknown_operative`
- target = World-supplied stable Rogue Shinobi participant ref
- action `arc1_m1_unknown_operative_wrist_break`

Story must not replace the target with a generic display archetype.

## 4. Participant autonomy before confrontation

The protagonist chooses an intended Story resolution. That choice does **not** establish party-wide agreement or Battle participation.

Before transition to Battle, Story resolves each present participant's response from legitimate current state, including where relevant:

- what the participant actually knows/observed;
- relationship/shared-history evidence;
- role/obligation;
- current injuries/capability;
- current fear/risk assessment;
- personal values and authored disposition where available.

Story then emits the exact `activeParticipantIds` and `sideAssignments` for the confrontation caller.

Preserve:

- team membership ≠ Battle participation;
- physical presence ≠ Battle participation;
- disagreement ≠ automatic refusal;
- support ≠ identical motive;
- protagonist intent ≠ command over allies;
- actor autonomy ≠ random sabotage.

Where another participant's intended response is reasonably perceivable before the protagonist commits, Story should surface that intent/contextually useful information before final choice resolution.

The historical Menma/Mikoto/Hinata/Anko example is not a universal template.

## 5. Kill Story semantics

Player-facing intent: **Kill the Unknown Operative**.

Story commits:

`occ_arc1_m1_whisper_kill_intent_declared`

only when the protagonist actually declares/commits lethal intent in the scene.

This occurrence is intent/history only and does not imply death.

If the Kill confrontation is legally available, Story launches:

- package: `arc1_m1_unknown_operative_confrontation`
- objective: `kill_arc1_m1_unknown_operative`
- exact active participant set + side assignments from current Chronicle state.

After Battle, Story consumes the existing Combat outcome envelope. Death occurs only through accepted lethal-objective success/death consequence semantics. Escape, interruption, operative victory, withdrawal or failed lethal objective remain factual alternatives.

## 6. Detain Story semantics

Player-facing intent: **Detain the Unknown Operative**.

Story commits:

`occ_arc1_m1_whisper_detain_intent_declared`

only when the protagonist actually commits the capture intent.

Intent does not equal custody.

If legally available, Story launches:

- package: `arc1_m1_unknown_operative_confrontation`
- objective: `detain_arc1_m1_unknown_operative`
- exact active participant set + side assignments from current Chronicle state.

Story consumes `captureOutcome` from Combat exactly:

- `detained` → custody fact may continue through authorised consequence/world custody handling;
- `escaped` → operative survives/escapes as returned;
- `unresolved` → Story continues from the exact blocking reason and must not silently convert defeat into detention or escape.

## 7. Release Story semantics

Player-facing intent: **Release / do not initiate confrontation** where context allows.

Story commits:

`occ_arc1_m1_whisper_release_resolution`

when the scene factually resolves without launching Kill/Detain Battle and the Unknown Operative is allowed to leave/remain unengaged according to current scene state.

Release does not invoke `arc1_m1_unknown_operative_confrontation`.

Release does not mean trust, alliance, faction knowledge or erased suspicion.

## 8. Concealed identity / observer-safe dialogue

Until a separately authorised reveal occurs, player-facing presentation must remain observer-safe:

**UNKNOWN OPERATIVE**

Story may reveal only what the current observer legitimately learns. Dialogue, competence, behaviour and apparent goals may create Knowledge/evidence without exposing concealed true affiliation or hidden biography.

No line of dialogue automatically becomes World Truth merely because a character says it.

Later identity reveal must preserve the stable participant identity and update observer Knowledge/presentation rather than mutate history into a different person.

## 9. Post-Battle continuation

The Battle return resumes this same Story occurrence. Story must consume, not reconstruct:

- `battleResult`
- `lethalObjectiveSuccess`
- `captureOutcome`
- `operativeAlive`
- escape occurrence if present
- detention/custody evidence if present
- exact supported injuries
- action occurrence IDs
- participant contribution evidence

Minimum continuation classes:

- operative killed through accepted lethal consequence → same-Chronicle recurrence disabled absent separately authorised revival;
- operative detained → continue into custody/information handling using actual custody facts;
- operative escaped → continue with survival/escape history preserved;
- operative wins / player side withdraws or forfeits → continue Mission/World from that factual loss/withdrawal state;
- interrupted/unresolved → return control to Story/World with exact interruption facts and no fabricated final resolution.

Battle victory does not automatically solve the Smuggler, Rogue Shinobi, caravan evidence or wider Mission objectives.

## 10. Story source-occurrence summary

Stable Writing occurrences published by this contract:

- `occ_arc1_m1_whisper_unknown_operative_wrist_break`
- `occ_arc1_m1_whisper_kill_intent_declared`
- `occ_arc1_m1_whisper_detain_intent_declared`
- `occ_arc1_m1_whisper_release_resolution`

Runtime may record subordinate dialogue/action occurrences through existing general schemas, but these IDs are the durable Writing-owned major-contact boundaries defined here.

## 11. Remaining external dependency

Writing does **not** invent the actual stable Rogue Shinobi world-instance participant ref or the world-owned event-instance/source boundary that supplies it.

World/Missions/Events must return:

1. exact stable Rogue Shinobi participant/world-instance ID for this major-contact occurrence;
2. exact event/opportunity instance source occurrence ID that commits the transition into `scene_arc1_m1_whisper_major_contact`;
3. confirmation that the same instance ref is supplied to the contextual wrist-break target and later injury/history consumers.

Until that return, the Story contract is Writing-closed but the production caller remains **WAITING ON WORLD/MISSIONS/EVENTS** for that exact instance binding.

## 12. Verdict

Writing causal choreography: **CLOSED**.  
Kill/Detain/Release Story semantics: **CLOSED**.  
Participant-autonomy caller rule: **CLOSED**.  
Combat outcome consumption: **CLOSED**.  
Observer-safe projection handling: **CLOSED**.  
World stable Rogue Shinobi/event-instance binding: **EXTERNAL / OPEN**.
