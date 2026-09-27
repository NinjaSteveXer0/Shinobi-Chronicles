# Academy Iwabee Origin — Direct-Confrontation Defeat Story Bridge

**Date:** 2026-09-27  
**Owner:** Writing / Story — Konoha  
**Status:** **WRITING CLOSED — BINDING DEFEAT BRIDGE / WORLD DISPOSITION SLOT OPEN**  
**Origin:** `academy_iwabee`

## Why this exists

Current CE/Combat authority now explicitly closes the fresh-Origin confrontation as intentionally overmatched:

- Academy Iwabee Base PL13;
- Rogue Genin Base PL23;
- no Rogue nerf;
- no Iwabee buff;
- no hidden scaling;
- no `alwaysDefeat` scripting;
- later legitimate developed / inherited state may still win normally.

Therefore the Origin requires a genuine player-facing loss path.

This loss path is not:
- Origin failure;
- injury;
- death;
- cowardice;
- permanent incompetence;
- erasure of Iwabee's completed practical task.

---

# 1. Battle return selector

Encounter:

`origin_academy_iwabee:rogue_genin_confrontation`

Config:

`academy_iwabee_origin_rogue_confrontation`

## Iwabee withdrawal / Rogue still eligible

Return to:

`iwa_confront_loss_01`

## Rogue withdrawal / Iwabee still eligible

Do **not** use the defeat bridge.

Return through the existing direct-confrontation success/World-disposition path.

0 Battle PL remains withdrawal only.

---

# 2. Defeat scene — before World disposition

Backdrop:

Use the exact currently approved Academy practical-ground backdrop for this Origin.

Actor state:
- Iwabee remains physically present;
- Rogue Genin remains physically present if Battle truth says he is still eligible;
- Academy instructor remains physically present if current World/Story truth says so;
- no injury state is inferred.

## `iwa_confront_loss_01` — narration

Iwabee's stance gives before the Rogue Genin's does.

Not because the ground shifted.

Not because somebody interrupted.

This one is his.

## `iwa_confront_loss_02` — narration

He forces himself upright again anyway.

The Rogue is still standing.

Another exchange is not happening.

## `iwa_confront_loss_03` — dialogue — ROGUE GENIN

**ROGUE GENIN:** “Stay down.”

## `iwa_confront_loss_04` — dialogue — IWABEE

**IWABEE:** “Wasn't planning to.”

## `iwa_confront_loss_05` — narration

Iwabee does not step forward.

That is not the same thing as agreeing.

---

# 3. Fresh-defeat World result — CLOSED

Current World authority:

`Documentation/World/Academy Iwabee Rogue Genin Disposition and Custody Resolution 2026-09-27.md`

commit:
`b8af7bb8eaac5ae14811c88b3141107aeb82de1f`

After `iwa_confront_loss_05`:

## `iwa_confront_loss_world_result` — narration

The Rogue Genin's eyes flick toward the open edge of the yard.

The instructor moves before Iwabee can.

Not toward the Rogue.

Between the Rogue and the student who has already been forced out of the fight.

## `iwa_confront_loss_world_result_02` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Enough.”

## `iwa_confront_loss_world_result_03` — narration

The Rogue does not argue.

He takes the opening and runs.

The instructor lets him go long enough to make sure Iwabee stays standing.

No one calls it a victory.

No one needs to.

**AUTHOR FACTS:**
- Rogue escapes;
- instructor protects withdrawn Iwabee;
- no custody;
- no injury/death;
- no Origin failure.

**Next:**
`iwa_eval_route_confront_loss_01`

---

# 4. Loss-specific instructor evaluation

This occurs after the World result has settled enough for instructor evaluation to resume.

## `iwa_eval_route_confront_loss_01` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “You went straight at him.”

## `iwa_eval_route_confront_loss_02` — dialogue — IWABEE

**IWABEE:** “And lost.”

## `iwa_eval_route_confront_loss_03` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Yeah.”

Iwabee's jaw tightens.

## `iwa_eval_route_confront_loss_04` — narration

The instructor looks past him at the section of training ground Iwabee repaired before any of this started.

## `iwa_eval_route_confront_loss_05` — dialogue — INSTRUCTOR

**INSTRUCTOR:** “Ground's still fixed.”

Iwabee looks at it.

It is.

**Next:**
`iwa_eval_core_01`

---

# 5. Shared core evaluation remains

After the loss-specific route reaction, preserve:

**INSTRUCTOR:** “You know what your problem is, Iwabee?”

**IWABEE:** “Yeah. Written tests.”

**INSTRUCTOR:** “No. You keep acting like the only things that count are the things you're bad at.”

The defeat gives this line additional context without changing its meaning.

Iwabee can be:
- good at the practical;
- overmatched by this Rogue;
- still poor at written work;

all at once.

---

# 6. Origin continuation

Defeat does **not**:
- retry the Battle automatically;
- terminate the Origin;
- reset IWA-01;
- grant a reward;
- create injury/death;
- erase the selected terrain solution.

After shared instructor evaluation:
- continue to Iwabee's existing four-way self-interpretation choice;
- then Origin close;
- then `YOUR CHRONICLE BEGINS`.

---

# FINAL LOCK

> **Fresh Iwabee losing the Rogue Genin Battle is a normal authored Chronicle result, not a failed Origin.**

> **The Story acknowledges that he was overmatched, preserves his earlier practical success, waits for World to decide the Rogue disposition, then continues into the same self-interpretation ending.**
