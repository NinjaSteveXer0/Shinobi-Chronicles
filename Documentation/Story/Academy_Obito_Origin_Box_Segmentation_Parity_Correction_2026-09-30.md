# Shinobi Chronicles — Academy Obito Origin — Story Box Segmentation Parity Correction

**Date:** 2026-09-30  
**Owner:** Stephen / Writing — Konoha  
**Origin:** `academy_obito`  
**Status:** **OWNER BROWSER AMBER — PROSE ACCEPTED / TEXT AMOUNT ACCEPTED / BOX SEGMENTATION REPAIR REQUIRED**  
**Current accepted prose authority:** `Documentation/Story/Academy_Obito_Origin_Fresh_Player_Facing_Rewrite_2026-09-30.md`  
**Accepted prose commit:** `81c9b23be6f710aed5f69018493763780d9db4a4`  
**Universal segmentation authority:** `Documentation/Story/Story_Narration_and_Dialogue_Box_Segmentation_Authority_2026-09-25.md`  
**Observed PR #417 head before this correction:** `eaaa6e2c60ac97b9a42bcf93bfe969cdd40b60b3`

---

# 1. OWNER CORRECTION

Stephen's installed-browser review now sets:

> **ACADEMY OBITO = AMBER / NOT GOLDEN / NOT FROZEN**

The fresh 2026-09-30 Writing itself is accepted.

The total amount of Story text is accepted.

The Story box size / geometry is accepted.

The remaining defect is presentation consistency:

> too much accepted text is being placed inside individual narration boxes, unlike the other nine Academy Origins.

This is **not a prose rewrite**.

This is **not a compression pass**.

This is **not permission to shorten the Origin again**.

This is a **segmentation-only correction**.

---

# 2. EXACT PRESERVATION LOCK

Preserve the accepted 2026-09-30 Obito wording and order.

Do not:
- delete text;
- add explanatory text;
- paraphrase accepted prose;
- compress accepted prose;
- expand accepted prose;
- change Story semantics;
- change choices;
- change timing;
- change entitlement;
- change rewards/progression;
- change actors;
- change backdrops;
- change Story box geometry;
- change typography to force more text into one box.

The only intended visible change is:

> **the same accepted text is distributed across more normal narration/dialogue boxes.**

---

# 3. WHY THE CURRENT IMPLEMENTATION IS WRONG

Current PR #417 at `eaaa6e2c60ac97b9a42bcf93bfe969cdd40b60b3` packs many paragraph-separated beats into a single Obito Scene Board page by combining:

- multiple `\n\n` paragraph boundaries;
- `singlePage: true`;
- in some cases, literal speaker-prefixed lines such as `OBITO: ...` inside a narration cue.

Current inspected Obito performance block contains:
- **113 blank-line paragraph boundaries**;
- **49 `singlePage: true` flags**;
- **9 narration cues containing embedded speaker-labelled dialogue**.

This bypasses the project's existing segmentation law and produces the owner-visible inconsistency.

The universal rule remains:

> **One Story narration box = one readable paragraph / dramatic beat.**

And:

> **One spoken turn = one speaker-owned dialogue box.**

---

# 4. SEGMENTATION RULE — BINDING FOR THIS OBITO AUTHORITY

For the accepted fresh Obito prose:

## Narration

Each authored paragraph / distinct physical beat must advance as its own narration box.

A narration cue must not contain several blank-line-separated paragraphs merely because they fit technically.

If one accepted paragraph is still visibly denser than the normal Academy-Origin narration treatment, split it at a natural sentence/dramatic boundary without changing wording.

## Dialogue

Every explicit spoken turn must use a proper dialogue cue with the correct `speakerName`.

Do not render:

`OBITO: "..." `

inside a narration box.

Do not render:

`ACADEMY INSTRUCTOR: "..." `

inside a narration box.

Physical action between two spoken turns is narration and receives its own narration cue.

## Mixed authored beats

Where the fresh Writing currently groups:

`dialogue -> physical reaction -> dialogue`

under one documented cue heading, runtime must project:

1. dialogue box;
2. narration box;
3. dialogue box.

The accepted wording and order remain unchanged.

---

# 5. REQUIRED MIXED-CUE CORRECTIONS

These are especially important because the current PR visibly collapses dialogue into narration.

## Opening — `obi_depart`

Current accepted sequence:

- Obito: **"No. Not today. I'm making it."**
- narration: **He points toward the Monument as he runs.**
- Obito: **"And I'm getting up there too. Just not before training."**

Required:

1. OBITO dialogue box;
2. narration box;
3. OBITO dialogue box.

## FULL arrival

Required:

1. ACADEMY INSTRUCTOR dialogue: **"Line up. You can celebrate after conditioning."**
2. narration: **Obito is in line before the sentence finishes.**

## SUBSTANTIAL arrival

Required:

1. ACADEMY INSTRUCTOR dialogue: **"Conditioning's over. Weapons line."**
2. narration: **Obito moves before there is anything else to say.**

## REDUCED arrival

Required:

1. ACADEMY INSTRUCTOR dialogue: **"Ninjutsu line. Move."**
2. narration: **Obito moves.**

## MINIMAL arrival

Required:

1. ACADEMY INSTRUCTOR dialogue: **"Last block. Taijutsu."**
2. narration: **Obito drops the bag and steps onto the yard.**

## Ending — KEEP HELPING

Required:

1. OBITO dialogue: **"I'm not going to stop helping people."**
2. narration: **His mouth twists.**
3. OBITO dialogue: **"Tomorrow I just leave earlier. A lot earlier."**

## Ending — TAKE TRAINING SERIOUSLY

Required:

1. OBITO dialogue: **"I need to take training more seriously."**
2. narration: **He tightens one loose strap.**
3. OBITO dialogue: **"Next time, I get there."**

## Ending — FIND BALANCE

Required:

1. OBITO dialogue: **"I need to get better at both."**
2. narration: **He points at himself.**
3. OBITO dialogue: **"Earlier start. Better judgement. Easy."**
4. narration: **His expression says he knows it will not be easy.**

## Ending — QUESTION THE FRAME

Required:

1. OBITO dialogue: **"Maybe I'm looking at this wrong."**
2. narration: **He pulls his goggles back on.**
3. OBITO dialogue: **"Fine. Then I'll figure out what matters most."**

---

# 6. ALL OTHER FRESH OBITO NARRATION

Apply the same universal paragraph/page rule to every remaining accepted performance family:

- `obi_depart`
- all five diversion intros;
- all five HELP consequences;
- all five CONTINUE consequences;
- `arrival_FULL`
- `arrival_SUBSTANTIAL`
- `arrival_REDUCED`
- `arrival_MINIMAL`
- `training_stamina`
- `training_bukijutsu`
- `training_ninjutsu`
- `training_taijutsu`
- `obi_end_day`
- `home_common`
- `home_all_help`
- `home_no_help`
- `home_mixed`
- all four ending narration families;
- `obi_close`.

Do not selectively fix only the most obvious boxes.

The goal is presentation parity across the entire Obito Origin.

---

# 7. CODING IMPLEMENTATION CONTRACT

Runtime owner remains:

`runtime/alpha-origin-scenes-32900-c.js`

Coding must:

1. preserve the exact accepted fresh Obito text;
2. break multi-paragraph `singlePage` entries into sequential cues;
3. use narration cues for narration;
4. use proper dialogue cues for speaker turns;
5. remove literal `OBITO:`, `ACADEMY INSTRUCTOR:`, or other speaker prefixes from narration text when converting them into `speakerName` metadata — the visible spoken wording itself must remain identical;
6. preserve authored order exactly;
7. keep choices after all intended preceding cues;
8. keep consequence commits attached to the same route result after its accepted sequence completes;
9. preserve click-anywhere progression;
10. preserve the current approved Story box size/geometry;
11. do not introduce internal scrolling as the solution;
12. do not reintroduce sentence-per-click micro-fragmentation merely to satisfy this rule.

### `singlePage` rule

A `singlePage: true` Obito cue may remain only when that cue is genuinely one readable paragraph / dramatic beat.

It must not be used to force several `\n\n` paragraphs into one box.

---

# 8. ACCEPTANCE GATES

Before returning Obito for owner browser review:

- **0** Obito narration cues may contain embedded literal speaker turns that should be dialogue bubbles;
- **0** ordinary Obito Story pages may require internal scrolling;
- **0** multi-paragraph Obito cues may be forced into one box solely by `singlePage: true`;
- accepted wording count/order must be preserved;
- no route semantics change;
- no timing change;
- no new Story content;
- no removed Story content;
- Story box size remains unchanged;
- ordinary click-anywhere progression remains unchanged;
- final Story -> BLACK WIPE -> Chronicle Receipt -> Receipt CONTINUE -> YOUR CHRONICLE BEGINS remains unchanged.

Owner-installed-browser review is the final Golden gate.

---

# 9. STATUS LOCK

**ACADEMY OBITO = AMBER.**

Writing/prose: **accepted**.  
Text amount: **accepted**.  
Story box size: **accepted**.  
Segmentation / dialogue-vs-narration projection: **requires correction**.  
Browser Golden: **FALSE until Stephen retests**.

No further Obito prose rewrite is authorised by this correction.
