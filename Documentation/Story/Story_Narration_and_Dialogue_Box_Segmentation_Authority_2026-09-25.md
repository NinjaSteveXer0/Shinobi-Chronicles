# Shinobi Chronicles — Story Narration and Dialogue Box Segmentation Authority

**Date:** 2026-09-25  
**Owner:** Writing / Story + UI/Coding consumer boundary  
**Status:** **ACTIVE UNIVERSAL PLAYER-FACING STORY PRESENTATION AUTHORITY**

## Problem

Installed-browser evidence from Academy Obito shows authored narration paragraphs being packed into one Scene Board cue, forcing the player to scroll inside the narration box.

Example current runtime source:

```js
{
  kind: "narration",
  text: "One day.\n\nNot maybe.\n\nNot if the Sharingan decides to hurry up.\n\nNot if the rest of the Uchiha suddenly starts taking him seriously.\n\nOne day, his face is going up there."
}
```

This is not the intended Story reading rhythm.

The prose contains multiple distinct paragraphs/beats, but runtime currently treats them as one narration page.

---

# Universal rule

> **One Story narration box = one readable paragraph / dramatic beat.**

A player-facing Story box is not a scrollable document viewport.

## Paragraph boundary

For narration/dialogue source authored with a blank-line paragraph break:

`\n\n`

that break is a **Story cue/page boundary**, not merely vertical whitespace inside the same box.

Each paragraph must become its own sequential Story cue unless Writing explicitly marks a rare compound beat.

## Overflow rule

If one paragraph still exceeds the available Story box height at normal supported viewport/layout:

- do **not** solve it by making the player scroll;
- split the paragraph at a natural sentence / dramatic beat boundary;
- preserve wording and order;
- do not truncate;
- do not shrink typography below the approved Story style merely to force-fit prose.

## Dialogue

Ordinary spoken dialogue remains:
- one speaker turn per dialogue cue;
- no multi-speaker text in one dialogue cue;
- if one speaker has a genuinely long speech, split it into natural consecutive speaker turns/boxes where the speech rhythm supports it.

## Narration

Narration should advance like Story beats:

`paragraph -> click anywhere -> next paragraph -> click anywhere -> next beat`

not:

`multi-paragraph article -> internal scroll -> continue`

## No-scroll acceptance rule

For ordinary Story narration/dialogue:

> **If the player must use an internal scrollbar to read the authored cue, the cue segmentation has failed.**

Scrollable surfaces remain appropriate only for intentionally document-like UI such as:
- Chronicle Receipt;
- archive/history views;
- long records/logs;
- codex/reference UI;

not ordinary Story prose.

---

# Writing responsibility

Writing owns the intended segmentation.

Implementation-ready Writing must provide prose already divided into paragraph/beat-sized cues.

Do not hand Coding a large prose block and expect runtime heuristics to decide narrative pacing.

Writing may use:
- one-sentence paragraph;
- multi-sentence paragraph;
- fragment paragraph;

according to rhythm.

Length is subordinate to readability.

---

# Coding/runtime safeguard

Coding should preserve authored cue boundaries exactly.

Additionally, runtime should fail safely if a legacy Story cue still contains multiple blank-line paragraphs:

- split `\n\n` paragraph groups into sequential narration cues where this can be done without breaking choices/consequences;
- never silently merge adjacent authored cues;
- do not treat CSS overflow scrolling as the normal solution.

This fallback is a safeguard for legacy content, not a replacement for Writing-owned segmentation.

---

# Academy Obito immediate correction

Current `runtime/alpha-origin-scenes-32900-c.js` contains many narration cues with multiple `\n\n` paragraphs.

These must be resegmented.

Example:

Current:

```
One day.

Not maybe.

Not if the Sharingan decides to hurry up.

Not if the rest of the Uchiha suddenly starts taking him seriously.

One day, his face is going up there.
```

Required sequential narration boxes:

1. `One day.`
2. `Not maybe.`
3. `Not if the Sharingan decides to hurry up.`
4. `Not if the rest of the Uchiha suddenly starts taking him seriously.`
5. `One day, his face is going up there.`

This changes presentation pacing only.

It does not alter:
- wording;
- Story chronology;
- choices;
- consequence commits;
- source occurrences;
- timing authority;
- route semantics.

The same audit must be applied to all Obito narration cues, including training and home/reflection sequences.

---

# Project-wide application

Apply this rule automatically to:
- all Academy Origins;
- Arc 1+ Story;
- Mission/Event Story;
- Battle preludes/aftermath;
- debriefs/endings;
- future village Story.

When modernising or approving Writing, paragraph/cue segmentation is part of acceptance.

---

# Acceptance test

A Story scene is presentation-ready only if:

1. each narration cue is readable without internal scrolling at normal supported layout;
2. each dialogue cue is readable without internal scrolling;
3. paragraph boundaries advance through Story rather than remain inside one scrollable box;
4. click-anywhere advancement still works;
5. no prose is lost or reordered;
6. choices appear only after the complete authored preceding beat has been read;
7. consequence commits stay attached to the correct authored beat.

---

# Canonical short rule

> **Paragraphs are Story pages, not scroll content.**

> **If a Story box needs a scrollbar, split the Writing.**
