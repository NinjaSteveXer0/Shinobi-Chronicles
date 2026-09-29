# Shinobi Chronicles — Academy Wasabi Izuno Benchmark and Personality Re-Audit

**Date:** 2026-09-29  
**Owner:** Writing / Story — Konoha  
**Status:** **REOPENED AGAIN BY OWNER BROWSER REVIEW — COMPLETE REWRITE v2 NOW CURRENT REVIEW TARGET**

## Scope

Full read-through of Academy Wasabi Izuno against current locked Writing authority.

Audited:

- Diction;
- Cadence;
- Personality;
- Emotion;
- physicality;
- speaker fingerprint;
- NPC autonomy;
- group conversation;
- route-state consistency;
- system-language separation;
- no-scroll segmentation;
- age/era fit;
- player-choice expression;
- backdrop continuity;
- current semantic boundaries.

## Findings

### 1. Missing durable Wasabi personality anchor — FAIL

The old Origin named personality traits in practice but had no dedicated current anchor.

This violated the standing requirement that a recurring canon-derived named character receive a researched behavioural model before substantial dialogue is treated as complete.

Closed by:

`Documentation/Story/Academy_Wasabi_Izuno_Character_Voice_and_Personality_Anchor_2026-09-29.md`

### 2. Speaker-fingerprint strength — PARTIAL / FAIL

Several old Wasabi lines were competent but swappable with a generic confident Academy protagonist.

Examples of the old expression problem include repeated reliance on:
- grin;
- impatience;
- short comeback;
- generic dry irritation.

The character's:
- social bickering;
- emotional visibility;
- peer challenge;
- practical care;
- fast defensive recovery after mistakes

were underused.

The rewrite deliberately makes these behaviours visible.

### 3. Project-wide dry/sarcastic house-voice contamination — PARTIAL

The Academy Instructor and Wasabi occasionally operated as matched dry-comedy partners.

The new anchor separates them:

- Wasabi = energetic / direct / reactive;
- Instructor = patient / observant / lightly amused / not trying to out-snark her.

### 4. Group-conversation liveliness — PARTIAL

The cooperation route had useful exchange, but Wasabi read too much like a small squad commander issuing roles.

The revised version keeps the exact cooperation/intelligence value while making the coordination socially Wasabi:
- challenged by peers;
- yelling instructions;
- receiving pushback;
- turning argument into useful information;
- moving while talking.

### 5. Pursuit target autonomy — PARTIAL

The target often functioned as a moving objective.

The revised target is still unnamed and mechanically unchanged, but now acts as a competitive foil:
- reacts to route success;
- owns the false trail;
- teases where appropriate;
- asks for rematch after River success.

No canon identity is invented.

### 6. River outcome — FAIL / OWNER CORRECTED

Old current result:

`river_route -> arrive_just_after_target`

Owner-restored result:

`river_route -> direct_catch`

Wasabi catches the target before extraction after sustained open-route pursuit.

River +1 Stamina Development EXP remains unchanged.

### 7. Route-state aftermath — FAIL

The old AFTER setup allowed:

`ACADEMY STUDENT: "You lost."`

to appear as shared aftermath even when Wasabi had actually secured the target.

The rewrite removes that unconditional line.

Aftermath is now route-relative:
- River success;
- other catch/intercept success;
- false-trail loss;
- Rogue-interruption cost.

### 8. False-trail response — IMPROVED

Old Wasabi called it cheating, then largely stopped at irritation.

Revised Wasabi:
- gets defensive;
- recognises the target genuinely fooled her;
- grudgingly gives credit;
- remains visibly annoyed.

This performs learning without a theme speech.

### 9. Rogue branch characterisation — IMPROVED

STEP IN:
- no hero speech;
- direct physical interposition;
- short sharper dialogue.

CALL FOR HELP:
- practical care through action;
- `Run first. Panic later.`;
- student pushes back rather than becoming a passive rescue object.

KEEP GOING:
- Wasabi remains visibly conflicted/annoyed;
- no narrator morality score;
- choice remains a legitimate primary-objective commitment.

### 10. System-strip test — PASS

The revised PLAYER-FACING STORY contains no:
- runtime;
- resolver;
- sourceOccurrence;
- evidence-weight;
- progression;
- morality-system;
- implementation language.

### 11. No-scroll authoring test — PASS AT WRITING SOURCE

No player-facing paragraph in the candidate exceeds a long multi-beat document block.

Dialogue is one speaker turn at a time.

Paragraph boundaries are suitable for Story cue/page segmentation.

Runtime must still compile those boundaries correctly.

### 12. Age/era test — PASS

The rewrite uses Academy-era:
- energetic;
- direct;
- competitive;
- socially argumentative

Wasabi.

It does not make later Chūnin-exam clan-pressure/insecurity the centre of an earlier Academy pursuit exercise.

### 13. Choice-personality test — PASS

Choices remain materially different player intents while reading as plausible choices for the same Wasabi.

No choice silently creates a new personality.

## Files produced

Voice/personality authority:

`Documentation/Story/Academy_Wasabi_Izuno_Character_Voice_and_Personality_Anchor_2026-09-29.md`

Binding River correction:

`Documentation/Story/Academy_Wasabi_Izuno_River_Route_Owner_Correction_2026-09-29.md`

Full rewrite candidate:

`Documentation/Story/Academy_Wasabi_Izuno_Origin_Benchmark_Rewrite_Candidate_2026-09-29.md`

The old 2026-09-24 WRITING GOLDEN file is now marked superseded/reopened for current expression.

## Verdict

**Old Wasabi Writing: REOPENED.**

**River factual correction: CLOSED / BINDING.**

**New Wasabi personality infrastructure: CLOSED / BINDING.**

**Full revised prose: REVIEW CANDIDATE pending Stephen sign-off.**

Do not call the current installed Wasabi prose Writing GOLDEN merely because Coding/Runtime was previously accepted.

Coding Golden and Writing Golden remain separate.


---

# 2026-09-29 second owner browser finding

Stephen tested the restored River success and proved the first rewrite architecture was still insufficient:

- River could secure the target;
- shared AFTER still contained `ACADEMY STUDENT: "You lost."`;
- the universal four final reflections still framed the ending as a lesson from failure.

This is a route-state continuity failure, not a River-only wording defect.

The first rewrite candidate is superseded.

Current review target:

`Documentation/Story/Academy_Wasabi_Izuno_Origin_Complete_Rewrite_v2_2026-09-29.md`

commit:
`6d76a5f7b15d9a9d822c53c767338bcc9f2ac365`

v2 correction:
- full Story rewritten across Scenes 1–7;
- same scene count / locations / actors / target / Rogue Genin / Battle;
- River success retained;
- Intercept success retained;
- false-trail miss remains factually distinct;
- Rogue interruption remains factually distinct from pursuit result;
- Scene 6 debrief is route-relative;
- Scene 7 aftermath is route-relative;
- **six route/response-specific four-choice reflection sets replace the single universal failure-leaning set**;
- River never enters a loss aftermath/reflection family.

Current Writing status remains **RED / NOT GOLDEN** until Stephen signs off the exact v2 player-facing Story.
