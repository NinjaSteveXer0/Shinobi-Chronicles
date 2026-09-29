# Shinobi Chronicles — Academy Kurenai Origin — Staged Choice + Chronicle Receipt Restoration

**Date:** 2026-09-30  
**Owner:** Stephen / Writing — Konoha  
**Status:** **WRITING RED — STRUCTURAL REGRESSION CONFIRMED / CURRENT ONE-CHOICE PREVIEW INVALID**  
**Origin:** `academy_kurenai`

## 1. Owner browser evidence

Stephen's installed-browser review exposed two separate regressions:

1. Kurenai selects one Bell-Test option, receives a conversation sequence, and the Origin is effectively over.
2. `YOUR CHRONICLE BEGINS` is shown as ordinary Story narration before the Chronicle Receipt.

Both are wrong.

Stephen also confirms the intended Kurenai test was developed as **multiple staged sets of choices**, with variations across the illusion contest before the final result.

## 2. Source-first archaeology result

The current Shinobi Chronicles 2026-09-27 rewrite is not reliable structural authority for Kurenai's choice cadence.

It contains this later reinterpretation:

> render only `kur_approach` as the meaningful player decision surface

and classifies the old follow-up choice nodes as presentation noise.

That reinterpretation is now rejected.

### Higher durable Kurenai choreography authority

Current Chronicle Engine Design Bible source:

`NinjaSteveXer0/Chronicle-Engine-Design-Bible`

`Games/Shinobi Chronicles/Academy Kurenai Origin - Final Battle of Illusions Writing Lock.md`

Current file status:

**FINAL WRITING LOCK — DURABLE CHOREOGRAPHY**

Historical commit that created the durable lock:

`7434de87383e6597b82a45a6e9d2fa2357dbc323`

That file explicitly states:

> **The final Writing design uses staged deception choices that resolve into four authored outcome classes.**

and:

> **The chosen combination determines how many layers of the illusion contest Kurenai successfully controls.**

Therefore:

> **one opening choice -> predetermined route -> conversation -> ending**

is not the intended Kurenai Origin architecture.

## 3. Recovered exact staged-choice evidence

The durable CE lock preserves this choice palette.

### Opening deception approaches

- **FALSE KURENAI**
- **CONCEAL REAL MOVEMENT**
- **DISTORT DISTANCE / POSITION**
- **FAKE A CLUMSY / DIRECT APPROACH**

### Follow-up exploitation choices

- **RUSH THE BELL**
- **DRAW ATTENTION AWAY**
- **TAKE THE BELL NOW**
- **PRETEND TO WITHDRAW**
- **LET THE INSTRUCTOR THINK SHE CAUGHT KURENAI**

The original SC runtime integration commit:

`46b249d062eb931d978ed905631862cb0594eec0`

also proves that these were authored as **separate staged choice nodes**, not merely prose.

Recovered exemplar chains:

### Complete loss

`FALSE KURENAI`
-> `RUSH THE BELL`
-> `complete_loss`

### Partial loss

`CONCEAL REAL MOVEMENT`
-> `DRAW ATTENTION AWAY`
-> `TAKE THE BELL NOW`
-> `partial_loss`

### Partial win

`DISTORT DISTANCE / POSITION`
-> `RUSH THE BELL`
-> `PRETEND TO WITHDRAW`
-> `partial_win`

### Complete win

`FAKE A CLUMSY / DIRECT APPROACH`
-> `RUSH THE BELL`
-> `LET THE INSTRUCTOR THINK SHE CAUGHT YOU`
-> `complete_win`

These recovered chains are authoritative exemplars.

## 4. What archaeology does NOT safely recover

The currently accessible durable source does **not** preserve the complete Stephen-reviewed matrix of every option that was available in every one of the staged choice sets.

Therefore Writing must not falsely claim that a newly invented full matrix is the verbatim recovered original.

What is closed and recoverable:

- the encounter is staged;
- player choice occurs across the illusion contest rather than once;
- the combination of choices determines how deep the deception succeeds;
- the above opening/follow-up palette is authentic;
- the four outcome classes are authentic;
- the four exemplar chains above are authentic.

What remains to be reconstructed as current production expression:

- the full multi-option availability matrix for the successive choice sets;
- natural dialogue/narration around those decision points under current benchmark rules.

Until that reconstruction is durably authored, the current one-choice Kurenai implementation is not a valid Golden candidate.

## 5. Battle boundary

Despite the name **Battle of Illusions**, current FINAL CE Writing lock is explicit:

> **This is a text-choice deception encounter, not the Battle runtime.**

Battle trigger:

**NONE**

Do not create a PL Battle while restoring the staged choice architecture.

## 6. Four factual outcome classes remain

Preserve exactly:

- `complete_loss`
- `partial_loss`
- `partial_win`
- `complete_win`

One final source occurrence:

`occ_origin_kurenai_bell_test_resolution`

The occurrence commits **after the Bell Test finishes**, not when the first choice is selected.

> **Bell choice selected != Bell Test resolved != Origin completed.**

## 7. Chronicle Receipt order — current Kurenai expression is wrong

Binding current authority:

`Documentation/Story/Origin_Chronicle_Receipt_Player_History_Summary_Requirement_2026-09-14.md`

requires:

`final Origin scene`
-> **BLACK WIPE**
-> **ORIGIN CHRONICLE RECEIPT**
-> visible **CONTINUE**
-> **YOUR CHRONICLE BEGINS**

The current Kurenai preview incorrectly places:

`YOUR CHRONICLE BEGINS`
-> Chronicle Receipt

That ordering is superseded immediately.

### Presentation lock

`YOUR CHRONICLE BEGINS` is not ordinary narration inside the final Story scene.

It is the post-Receipt continuity presentation.

The Receipt:
- is read-only;
- reads committed Chronicle history;
- requires its visible CONTINUE button;
- must not be bypassed by background click or global Enter/Space.

## 8. Current expansion status

The file:

`Documentation/Story/Academy_Kurenai_Origin_Benchmark_Expansion_2026-09-29.md`

is no longer valid as complete current production authority.

Useful material that may be retained:
- After Class opening;
- Kurenai voice direction;
- result-reactive aftermath concepts;
- leaving-scene prose where compatible.

Invalid structural assumptions:
- one meaningful Bell-Test choice surface;
- opening choice directly determines final outcome;
- later staged choices removed as fake/presentation noise;
- `YOUR CHRONICLE BEGINS` before Receipt.

## 9. Immediate Coding rule

Do not attempt a local patch that merely makes all four current one-choice routes reach the aftermath.

That would preserve the wrong collapsed Story.

Current implementation must remain:

**KURENAI = RED / NOT GOLDEN / NOT FROZEN**

until Writing supplies the restored staged-choice production package.

Do not mark source/CI GREEN as owner Story acceptance.

## 10. Current restoration target

The repaired player experience must again be:

character setup
-> Bell objective
-> **staged deception choice set**
-> illusion performance
-> **next staged deception/exploitation choice**
-> further reversal
-> **final staged deception/counter choice where applicable**
-> authored outcome class
-> route-reactive evaluation
-> aftermath / actual ending
-> BLACK WIPE
-> Chronicle Receipt
-> Receipt CONTINUE
-> YOUR CHRONICLE BEGINS.

The player must feel that they are building Kurenai's deception, not choosing a canned ending from the first menu.

## Final lock

> **Academy Kurenai is a staged Battle of Illusions. The player's sequence of deception decisions determines how many layers Kurenai controls. The current one-choice implementation is a structural regression. The Chronicle Receipt appears before YOUR CHRONICLE BEGINS, never after it.**
