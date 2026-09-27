# Shinobi Chronicles — Arc 1 Mission 1 Whisper Woods Major Contact — #333 Benchmark-Optimized Player-Facing Candidate

**Date:** 2026-09-27  
**Owner:** Writing / Story — Konoha  
**Status:** **WRITING AMBER — STEPHEN REVIEW CANDIDATE / NOT ARC GOLDEN**  
**Scene:** `scene_arc1_m1_whisper_major_contact`

## Governing authority

Preserve without redesign:

- `Documentation/Story/Arc1_Mission1_Whisper_Woods_Major_Contact_Story_Scene_Contract_2026-09-08.md`
- `Documentation/World/Academy Origin and Whisper Woods World Source Instance Bindings.md`
- `Documentation/Registry/Whisper Woods Unknown Operative Identity and PL Ratification.md`
- `Documentation/Coordination/Unknown Operative Projection and Lethal Encounter Coordination Contract.md`
- `Documentation/SC_Combat_Whisper_Woods_Unknown_Operative_Confrontation_Closure_2026-09-07.md`

Existing runtime scene/caller IDs remain unchanged.

---

# PRESENTATION CONTRACT

## Location

`fire_whisper_woods_north_ravine`

## Backdrop

**BACKDROP ASSET REQUIRED — WHISPER WOODS NORTH RAVINE**

Current live source does not expose an approved dedicated North Ravine Scene Board backdrop.

Do not silently substitute:
- the Whisper Woods world map;
- `Scene backdrops/whisper_woods_forest_route.png`;

unless UI/Assets explicitly binds one of them to this exact physical scene.

## Stable local actors

### Rogue Shinobi

Stable World participant:
`arc1_m1_whisper_rogue_shinobi_01`

Player-facing label until stronger identity Knowledge exists:
**ROGUE SHINOBI**

**ACTOR PROJECTION ASSET REQUIRED / exact approved card mapping not currently published**

### Injured Smuggler

Stable World participant:
`arc1_m1_whisper_injured_smuggler_01`

Player-facing label according to current observer Knowledge:
**INJURED SMUGGLER**

**ACTOR PROJECTION ASSET REQUIRED / exact approved card mapping not currently published**

### Unknown Operative

Stable identity:
`arc1_m1_unknown_operative`

Observer projection:
`observer_projection_unknown_operative`

Player-facing label:
**UNKNOWN OPERATIVE**

**ACTOR PROJECTION ASSET REQUIRED / map the existing observer projection key to approved art**

Do **not** substitute unrelated:
`Others/uknown_root_operative.png`

without explicit Assets authority.

### Current protagonist / team

Project the actual physically present Chronicle participants with their current approved cards.

Presence does not mean Battle participation.

---

# PLAYER-FACING STORY

## `major_contact_observed` — narration

The North Ravine narrows until the trees stop feeling like cover and start feeling like walls.

Three strangers already occupy the space ahead: the injured smuggler, a Rogue Shinobi, and a third man whose clothes offer no village mark worth trusting.

The third man is watching the smuggler.

The Rogue is watching him.

---

## `major_contact_rogue_01` — dialogue — ROGUE SHINOBI

**ROGUE SHINOBI:** “Step away from him.”

The unknown man does not.

---

## `major_contact_operative_01` — dialogue — UNKNOWN OPERATIVE

**UNKNOWN OPERATIVE:** “You can leave.”

---

## `major_contact_rogue_02` — dialogue — ROGUE SHINOBI

**ROGUE SHINOBI:** “Wasn't asking.”

The Rogue moves.

---

## `major_contact_wrist_01` — narration

The unknown operative catches the reaching arm before the Rogue's weight finishes coming forward.

There is almost no struggle.

A turn of the wrist.

One short crack.

The Rogue jerks free with the other hand clamped over the break.

**AUTHOR / RUNTIME:** commit the already-authorised exact contextual fact:
`occ_arc1_m1_whisper_unknown_operative_wrist_break`
against:
`arc1_m1_whisper_rogue_shinobi_01`

No ordinary Battle attack is inferred from this beat.

---

## `major_contact_wrist_02` — dialogue — UNKNOWN OPERATIVE

**UNKNOWN OPERATIVE:** “Now you can leave.”

The Rogue does not answer.

He does not reach for the operative again either.

---

# CURRENT-PARTY REACTION INSERTION

## `major_contact_party_reaction` — contextual conversation

This is an authored **dynamic participant-reaction slot**, not a generic system message.

Before the protagonist commits to Kill / Detain / Release:

- physically present autonomous teammates/leader may visibly react;
- any participant whose intent is reasonably observable may speak or move first;
- expression must come from that participant's current personality, relationship, Knowledge and duty;
- objection != automatic refusal to participate;
- agreement != automatic Battle deployment.

Do not display:
- “party intent resolved”;
- “participant autonomy”;
- “current allies decide independently”;
- any equivalent CE explanation.

The player should simply experience what their actual team does.

If no present participant has a meaningful authored/contextual reaction, omit this beat rather than manufacture commentary.

---

# RESOLUTION CHOICE

## `major_contact_resolution_choice` — choice

The unknown operative turns his attention back toward the injured smuggler.

The Rogue is hurt.

Nobody here looks confused about how quickly that happened.

**KILL HIM**

**TAKE HIM ALIVE**

**LET HIM GO**

### Runtime mapping

- `KILL HIM` -> existing choiceId `kill`
- `TAKE HIM ALIVE` -> existing choiceId `detain`
- `LET HIM GO` -> existing choiceId `release`

Choice wording changes presentation only.

---

# KILL BRANCH — PRE-BATTLE

## `major_contact_kill_01` — narration

The decision changes the space immediately.

Whoever is willing to fight moves.

Whoever is not does not become an attacker merely because they are standing here.

The unknown operative reads the shift without asking what it means.

## `major_contact_kill_02` — dialogue — UNKNOWN OPERATIVE

**UNKNOWN OPERATIVE:** “That's your answer?”

[PROTAGONIST response may be contextually voiced where a current approved voice profile supports it. Do not invent a universal line.]

**Next:** existing `major_contact_battle_transition`

### Objective
`kill_arc1_m1_unknown_operative`

---

# DETAIN BRANCH — PRE-BATTLE

## `major_contact_detain_01` — narration

The protagonist closes the distance instead of giving him the path out.

The unknown operative looks once at the ravine behind the team.

Then back.

## `major_contact_detain_02` — dialogue — UNKNOWN OPERATIVE

**UNKNOWN OPERATIVE:** “You're going to try to take me in.”

Not a question.

[PROTAGONIST response may be contextually voiced.]

**Next:** existing `major_contact_battle_transition`

### Objective
`detain_arc1_m1_unknown_operative`

---

# BATTLE TRANSITION

## `major_contact_battle_transition`

Use existing package:

`arc1_m1_unknown_operative_confrontation`

The exact active participant set comes from current Story/Chronicle state.

No player-facing text should explain side-assignment semantics.

Preferred transition presentation:
- cards of non-participating but still physically present people recede/leave the Battle formation according to Battle UI authority;
- exact combatants enter the existing Battle presentation;
- return to the same Story occurrence.

---

# RELEASE BRANCH

## `major_contact_release_resolution` — narration

Nobody moves to stop him.

That does not make the ravine friendly.

It only leaves one route open.

The unknown operative studies the group for another second, then looks back to the injured smuggler.

## `major_contact_release_02` — dialogue — UNKNOWN OPERATIVE

**UNKNOWN OPERATIVE:** “Good.”

He gives no name.

No explanation.

Nothing that makes the decision easier after it has already been made.

## `major_contact_release_03` — narration

The encounter ends without a fight.

What the operative was doing here remains exactly as uncertain as the man himself.

**AUTHOR FACT:**
commit existing Release resolution.

Do not imply:
- trust;
- alliance;
- true affiliation Knowledge;
- Smuggler objective completion.

Exit the same Story occurrence through existing Mission continuation.

---

# POST-BATTLE RETURN

The existing runtime returns to:
`major_contact_post_battle`

The player-facing presentation must select from the actual outcome envelope.

---

## KILL OBJECTIVE — LETHAL SUCCESS

### `major_contact_post_kill_success_01` — narration

The confrontation ends with the unknown operative down and no attempt left to turn the result into an escape.

The ravine is suddenly quieter than it was before the first strike.

### `major_contact_post_kill_success_02` — narration

Whatever name he carried into the woods dies with him for now.

The team still has the Rogue, the injured smuggler and the rest of the mission to deal with.

**AUTHOR:** consume accepted lethal-objective/death consequence only. Do not fabricate identity reveal.

---

## KILL OBJECTIVE — OPERATIVE ESCAPES

### `major_contact_post_kill_escape_01` — narration

The operative gives ground until the ravine offers him one clean exit.

Then he takes it.

By the time anybody can close the distance again, the trees have swallowed him.

### `major_contact_post_kill_escape_02` — narration

The decision to kill him remains part of what happened.

So does the fact that it failed.

---

## KILL OBJECTIVE — OPERATIVE WINS / PLAYER SIDE WITHDRAWS

### `major_contact_post_kill_loss_01` — narration

The attempt breaks before the operative does.

He does not chase a withdrawn fighter simply to prove he could.

That may be the most unsettling part.

### `major_contact_post_kill_loss_02` — dialogue — UNKNOWN OPERATIVE

**UNKNOWN OPERATIVE:** “Finished?”

[Continue from the exact factual survival/withdrawal state.]

---

## KILL OBJECTIVE — INTERRUPTED / UNRESOLVED

### `major_contact_post_kill_unresolved_01` — narration

The confrontation ends without settling the reason it began.

Nobody gets to pretend that means the choice never happened.

[Project exact interruption fact; do not invent death/escape.]

---

# DETAIN OBJECTIVE — CAPTURE SUCCEEDS

## `major_contact_post_detain_success_01` — narration

The operative is neutralised alive.

This time somebody is still standing who can finish the job.

The restraint goes on before he gets another opening.

## `major_contact_post_detain_success_02` — dialogue — UNKNOWN OPERATIVE

**UNKNOWN OPERATIVE:** “You think holding me answers the question.”

He does not say which question.

**AUTHOR:** consume `captureOutcome: detained`. Custody is factual; identity remains concealed.

---

# DETAIN OBJECTIVE — OPERATIVE ESCAPES

## `major_contact_post_detain_escape_01` — narration

The moment the restraint route stops being clean, the operative uses it.

He breaks contact and disappears into the woods alive.

## `major_contact_post_detain_escape_02` — narration

There is no prisoner.

Only an attempted detention and a man who now knows exactly who tried it.

---

# DETAIN OBJECTIVE — NEUTRALISED BUT CUSTODY UNRESOLVED

## `major_contact_post_detain_unresolved_01` — narration

The operative is beaten back far enough to stop fighting.

Nobody is in position to turn that advantage into secure custody.

The difference matters immediately.

[Project the exact blocking reason from Combat/Story state without turning it into QA prose.]

---

# DETAIN OBJECTIVE — OPERATIVE WINS / PLAYER SIDE WITHDRAWS

## `major_contact_post_detain_loss_01` — narration

The attempt to take him alive fails before anyone gets the chance to secure him.

The operative remains standing.

The intended prisoner does not become one because the team wanted him to.

---

# COMMON CONTINUATION

After any post-Battle branch:

- preserve the exact operative life/custody/escape state;
- preserve the Rogue's fractured-wrist history;
- preserve the injured Smuggler's existing state;
- do not declare the wider Whisper Woods Mission solved merely because the confrontation ended;
- return to the same World/Mission continuity already implemented by #35.

---

# STORY-BOX SEGMENTATION

Every numbered player-facing cue above is one readable dramatic beat.

Coding may combine immediately adjacent short action + dialogue only where the final rendered box remains comfortably readable and does not create a scroll box.

Do not collapse the entire wrist-break/contact sequence into one narration panel.

Do not split every sentence into a separate click.

---

# CURRENT ASSET BLOCKERS

## North Ravine backdrop

`BACKDROP ASSET REQUIRED`

UI/Assets must bind an approved scene backdrop for:
`fire_whisper_woods_north_ravine`

## Unknown Operative observer card

Projection key exists:
`observer_projection_unknown_operative`

Concrete approved art path:
**NOT CURRENTLY VISIBLE IN LIVE AUTHORITY**

## Rogue Shinobi card

Stable participant exists:
`arc1_m1_whisper_rogue_shinobi_01`

Concrete approved Story card path:
**NOT CURRENTLY VISIBLE IN LIVE AUTHORITY**

## Injured Smuggler card

Stable participant exists:
`arc1_m1_whisper_injured_smuggler_01`

Concrete approved Story card path:
**NOT CURRENTLY VISIBLE IN LIVE AUTHORITY**

Do not guess or reuse unrelated assets merely to fill the board.

---

# BENCHMARK AUDIT

- state-report opening removed: GREEN
- CE/player-agency explanation removed from Story: GREEN
- wrist-break dramatized from closed fact: GREEN
- operative identity remains concealed: GREEN
- protagonist choice remains protagonist-owned: GREEN
- teammate autonomy preserved without system prose: GREEN
- Kill/Detain/Release remain distinct: GREEN
- post-Battle outcomes react to exact Combat truth: GREEN
- wider Mission objectives remain separate: GREEN
- one complete beat per box: GREEN
- backdrop/card paths: **WAITING ON ASSET BINDING where listed**
- Stephen scene-level review: **PENDING**

