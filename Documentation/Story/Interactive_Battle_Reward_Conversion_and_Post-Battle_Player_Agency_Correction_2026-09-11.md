# Interactive Battle Reward Conversion and Post-Battle Player Agency Correction

Date: 2026-09-11
Owner: Writing — Konoha
Status: Durable Writing / Story UX authority for Shinobi Chronicles Alpha

## Why this exists

Live Arc 2 Mission 2 author-mode testing exposed a bad gameplay pattern: a player earned a high-quality Battle outcome whose explicit Story reward was interrogation, but the post-Battle prose inserted a long interruption, attempted self-kill beat, extra warning signals, and more choices before the player received the earned interrogation.

That pattern is rejected.

## Locked rule

When Story establishes a concrete Battle reward/conversion condition and Battle returns that condition as achieved, Story must convert the result promptly and visibly.

Do not insert arbitrary denial, fake-out, melodrama, or another long prose gate before the player receives the earned interaction.

For the current `arc2_m2_the_leak` Unknown Boy encounter:

- Battle outcome branch: Menma wins in fewer than 5 turns and ends above 50% starting Battle PL.
- Earned Story conversion: immediate custody and immediate player-controlled interrogation opportunity.
- Rejected/non-canonical test beats: suicide-pill attempt, flare interruption, delayed custody doubt, forced move-on choice before interrogation.
- Unknown Boy remains alive and restrained at interrogation start unless the actual Battle return says otherwise.
- Player controls interrogation approach through frequent choices.
- NPC/target resistance remains autonomous; interrogation does not guarantee truthful answers.
- Interrogation can become threatening, manipulative, physically coercive, psychologically coercive, or otherwise darker where legitimate to the scene and player choice. Shinobi Chronicles does not need to flatten these scenes into PG-safe polite questioning.
- Consequences still matter: methods can affect relationships, personality evolution, future willingness to cooperate, injury, escape/rescue opportunity, political fallout, and later Chronicle history.

## Contaminated-choice rollback rule

If an authored branch is explicitly rejected or rolled back, choices made only in reaction to that rejected branch do not automatically survive the rollback.

Return to the last clean committed player-decision boundary and re-offer player agency from there unless Stephen explicitly preserves a later choice.

For this live test, the clean rollback point is:

`Menma wins the Battle cleanly -> Unknown Boy is restrained -> player chooses the first interrogation action.`

Therefore the following are also non-canonical unless the player chooses them again from the clean interrogation state:

- invoking Kurama;
- asking Kurama to induce fear;
- any name reveal produced by that fear tactic;
- any interrogation question or answer authored after the rejected post-Battle branch.

At the clean interrogation start, no interrogation method has yet been chosen and Unknown Boy's name remains unknown to Menma/player.

## Cadence rule

After a major player-earned result:

`result -> short consequence beat -> immediate meaningful player choice`

Not:

`result -> long exposition -> arbitrary obstruction -> extra interruption -> delayed reward -> eventual choice`

For live gameplay, personality and tension should be delivered through short reactive beats between choices, not large narrative walls.

## Player-facing target

The player should feel:
- I earned this.
- I get to use what I earned now.
- My next choice matters.

They should not feel:
- the game moved the goalposts after victory;
- the reward was replaced by exposition;
- the authored story is protecting an NPC from a result the player legitimately achieved.

## Non-collapse

Prompt conversion of earned reward does not mean guaranteed downstream success.

Battle win can legitimately grant custody/interrogation access without guaranteeing:
- confession;
- truth;
- identity reveal;
- allegiance reveal;
- safe transport;
- survival through later choices;
- permanent custody;
- mission completion.

The player gets the earned opportunity. CE/Story then resolves what happens inside that opportunity based on legitimate state and choices.
