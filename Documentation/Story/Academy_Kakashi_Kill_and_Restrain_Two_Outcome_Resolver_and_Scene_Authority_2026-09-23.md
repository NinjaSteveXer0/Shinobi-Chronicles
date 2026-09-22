# Academy Kakashi Origin — KILL / RESTRAIN Two-Outcome Resolver and Exact Scene Authority

**Date:** 2026-09-23  
**Owner:** Stephen / Writing — Konoha  
**Status:** **STEPHEN-APPROVED PLAYER-FACING STORY AUTHORITY — READY FOR RUNTIME CONSUMPTION**  
**Scope:** Academy Kakashi Origin V2 only  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

Stephen has simplified the Academy Kakashi post-Battle disposition model.

The playable Origin must not restore the old hidden-control / controlled-defeat / field-secured state machine.

For this Origin, the player-facing resolver contract is now intentionally small:

```
KILL     -> KILLED | ESCAPED
RESTRAIN -> RESTRAINED | ESCAPED
```

The choice is Kakashi's intent. The resolver commits the factual result.

No third outcome is permitted for either resolver in Academy Kakashi V2.

## 2. Binding semantic simplification

### KILL

Selecting **KILL HER / KILL HIM / KILL THEM** commits lethal intent.

For each exact target, the resolver returns only:

- **KILLED** — target dies; or
- **ESCAPED** — lethal intent fails and the target leaves Kakashi's control alive.

Do not expose or commit a separate:
- SURVIVED;
- INTERRUPTED;
- FAILED_KILL;
- WOUNDED;
- CONTROLLED_DEFEATED;
- DEFEATED_BUT_NOT_CONTROLLED.

For this Origin, **ESCAPED is the complete non-death factual result**.

This is a narrow Academy Kakashi supersession of the older Kakashi projection in
`Deterministic_Kill_vs_Resolver_Determined_Lethal_Intent_Contract_2026-09-14.md`.
It does not silently rewrite unrelated Stories.

### RESTRAIN

Selecting **RESTRAIN HER / HIM** or **RESTRAIN ... AND CONTINUE** commits restraint intent.

For each exact target, the resolver returns only:

- **RESTRAINED** — target is alive and physically bound; or
- **ESCAPED** — restraint fails and the target leaves Kakashi's control alive.

Academy Kakashi V2 must not require or persist:
- CONTROLLED_DEFEATED;
- DEFEATED_BUT_NOT_CONTROLLED;
- FIELD_SECURED_PENDING_COLLECTION;
- COLLECTED_ACTIVE_ESCORT;
- ATTEMPT_TO_RESTRAIN as a separate player-facing semantic;
- partial-restraint states.

A successful restraint may retain ordinary factual metadata required by Story continuity, such as exact participant and authored location. That metadata does **not** create another custody state.

**RESTRAINED != ANBU custody != Uchiha Police custody.**

Direct **TAKE ... TO ANBU / POLICE** choices remain separate authored dispositions.

## 3. Timing / pursuit rule

The new disposition resolver must not invent a hidden time penalty.

Existing authored Battle/pursuit gates remain the only authority for whether the next pursuit is still available.

Therefore:

- a `KILLED`, `ESCAPED`, or `RESTRAINED` result does not by itself close a pursuit that the existing route/timing state still authorises;
- a disposition result does not reopen a pursuit already closed by existing Story timing;
- no reroll occurs on refresh/save-load;
- each result commits once.

This preserves the established multi-target lethal and live-capture trajectories without restoring the discarded control-state architecture.

## 4. Presentation rule

Resolver presentation must be short, physical and factual.

Do not insert:
- morality commentary;
- Pakkun acting as Kakashi's conscience;
- speeches explaining what killing means;
- a second disposition choice after an ESCAPED result;
- dialogue with a character who has already escaped;
- a fresh Battle simply to realise the resolver.

For **KILLED**, use the approved stylised kill animation language already owned by presentation/choreography, then establish the factual death with one brief beat.

For **ESCAPED** and **RESTRAINED**, use the exact scenes below.

---

# 5. MASKED INTERCEPTOR

## MI-KILL-ESCAPED — exact scene

**Trigger:** Kakashi defeated Masked Interceptor and selects **KILL HER**; resolver returns **ESCAPED**.

> Kakashi closes the distance before she can recover.
>
> Masked Interceptor watches him come.
>
> She reads the decision in his movement.
>
> At the instant Kakashi commits, she twists off the line he expected and throws everything she has left into distance.
>
> Kakashi turns with her.
>
> Too late.
>
> She clears the edge of the square, reaches the roofline and disappears beyond it.
>
> Kakashi stops.
>
> Masked Interceptor is alive.
>
> She is gone.

No MI dialogue.

**Fact commit:** MI = ESCAPED; lethal intent occurrence remains in Chronicle history.

**Continuation:** reevaluate the already-existing post-MI pursuit gate. If the existing fast-win state still authorises the next pursuit, present that existing continuation. Otherwise return to report. Do not create a new timing penalty because the kill failed.

## MI-RESTRAINED — exact scene

**Trigger:** Kakashi selects **RESTRAIN HER AND CONTINUE**; resolver returns **RESTRAINED**.

> Kakashi looks once toward the route the package took, then back to Masked Interceptor.
>
> He draws ninja wire.
>
> **MASKED INTERCEPTOR:** "You're still going after them."
>
> **KAKASHI:** "Yes."
>
> Kakashi binds her wrists and secures the restraint beneath the Sakura tree.
>
> She tests it once.
>
> It holds.
>
> Her eyes lift to him.
>
> **MASKED INTERCEPTOR:** "You're leaving me here."
>
> **KAKASHI:** "For now."
>
> She looks toward the route the others took.
>
> **MASKED INTERCEPTOR:** "They'll have distance."
>
> Kakashi checks the restraint once and turns away.
>
> **KAKASHI:** "Then I need to move."

**Fact commit:** MI = RESTRAINED; authored location = Sakura-tree scene.

**Continuation:** existing eligible pursuit only. No `FIELD_SECURED_PENDING_COLLECTION` state.

## MI-RESTRAIN-ESCAPED — exact scene

**Trigger:** Kakashi selects **RESTRAIN HER AND CONTINUE**; resolver returns **ESCAPED**.

> Kakashi draws the wire and moves in.
>
> Masked Interceptor stays still until the first loop reaches her wrist.
>
> Then she moves.
>
> Her hand turns through the slack before Kakashi can cinch it.
>
> She drives past his shoulder and breaks for the edge of the square.
>
> Kakashi catches the loose wire.
>
> Not her.
>
> By the time he reaches the roofline, Masked Interceptor has already disappeared into Konoha.
>
> The wire hangs from Kakashi's hand for a moment.
>
> Then he puts it away.

No MI dialogue after the escape.

**Fact commit:** MI = ESCAPED; restraint intent occurrence remains in Chronicle history.

**Continuation:** reevaluate the same existing post-MI pursuit gate. Do not add a separate "restraint failed" state.

### MI slow-win variation

If the current route/timing state already says the PS/AMT pursuit is gone:
- MI KILL -> KILLED or ESCAPED -> report;
- no **RESTRAIN HER AND CONTINUE** continuation is invented solely by this addendum.

---

# 6. PACKAGE SMUGGLER

Package Smuggler has two materially different contexts:

1. **package recovered by Kakashi** before disposition; and
2. **package already gone with ANBU Marked Target**.

The target result is identical; the package fact must remain route-derived.

## PS-KILL-ESCAPED-A — package recovered

**Trigger:** PS defeated; Kakashi already holds the package; **KILL HIM** -> **ESCAPED**.

> Kakashi secures the package before he turns back.
>
> Package Smuggler sees the change in his stance.
>
> The humour leaves his face.
>
> Kakashi moves to finish it.
>
> Package Smuggler throws himself sideways before the line closes, catches the wall with one hand and forces himself back onto his feet.
>
> Kakashi follows.
>
> The man is already moving.
>
> He clears the next corner without the package and disappears.
>
> Kakashi does not mistake the result.
>
> The package is still his.
>
> Package Smuggler is not.

**Fact commit:** PS = ESCAPED; lethal intent recorded; package remains with Kakashi.

**Continuation:** preserve the existing PS-to-AMT timing gate. If AMT pursuit remains authorised by the already-existing Battle window, it remains available.

## PS-KILL-ESCAPED-B — package missing

**Trigger:** PS defeated on a route where AMT has already escaped with the package; **KILL HIM** -> **ESCAPED**.

> Kakashi steps toward the defeated man.
>
> Package Smuggler looks once toward the route the package already took.
>
> Then back to Kakashi.
>
> He understands.
>
> Kakashi commits.
>
> Package Smuggler uses the first opening to break away instead of fighting back.
>
> He reaches the alley mouth, turns once and is gone.
>
> The package was already lost.
>
> Now the man Kakashi stopped is gone too.

**Fact commit:** PS = ESCAPED; package state unchanged from the route.

**Continuation:** report unless another already-authorised continuation independently exists.

## PS-RESTRAINED-A — package recovered / continuation eligible

**Trigger:** **RESTRAIN HIM AND CONTINUE** -> **RESTRAINED**.

> Kakashi keeps the recovered package secured against himself and draws the wire.
>
> Package Smuggler watches him bind his wrists.
>
> **PACKAGE SMUGGLER:** "You're going after him too."
>
> **KAKASHI:** "Yes."
>
> Kakashi finishes the restraint and checks it.
>
> Package Smuggler pulls once against the wire.
>
> It holds.
>
> He looks toward the route ANBU Marked Target took.
>
> **PACKAGE SMUGGLER:** "Of course you are."
>
> Kakashi is already moving.

**Fact commit:** PS = RESTRAINED at the current authored PS post-Battle location.

**Continuation:** if the existing PS Battle timing gate still authorises AMT pursuit, continue to it. No field-secured intermediate state is created.

## PS-RESTRAINED-B — package missing / no continuation

**Trigger:** **RESTRAIN HIM** -> **RESTRAINED** on the direct PS route where AMT already escaped with the package.

> Kakashi draws the wire.
>
> Package Smuggler watches him bind his wrists without looking away.
>
> **PACKAGE SMUGGLER:** "Package is still gone."
>
> **KAKASHI:** "I know."
>
> Kakashi tightens the restraint and checks it once.
>
> Package Smuggler tests the wire.
>
> It holds.
>
> The street beyond him is empty.
>
> There is no package trail left to chase.

**Fact commit:** PS = RESTRAINED at the current authored location; package remains wherever the existing route says it is.

**Continuation:** report / existing closure. Do not turn RESTRAINED into ANBU or Police custody automatically.

## PS-RESTRAIN-ESCAPED-A — package recovered

**Trigger:** RESTRAIN -> **ESCAPED** while Kakashi holds the package.

> Kakashi draws the wire.
>
> Package Smuggler waits until Kakashi is close enough to bind him.
>
> Then he snaps into motion.
>
> The loose line catches his wrist for half a second.
>
> He tears free before Kakashi can close it.
>
> Kakashi takes one step after him, then stops.
>
> The recovered package is still secured against him.
>
> Package Smuggler reaches the next street and disappears without it.

**Fact commit:** PS = ESCAPED; restraint intent recorded; package remains with Kakashi.

**Continuation:** preserve the existing PS-to-AMT timing gate if it is still authorised.

## PS-RESTRAIN-ESCAPED-B — package missing

**Trigger:** RESTRAIN -> **ESCAPED** on the direct PS route where AMT already has/escaped with the package.

> Kakashi brings out the wire.
>
> Package Smuggler looks at it.
>
> He stops talking.
>
> Kakashi reaches for his wrist.
>
> Package Smuggler twists away, forces a gap and runs.
>
> Kakashi reaches the corner seconds later.
>
> Empty street.
>
> The package is already gone.
>
> Package Smuggler is gone with nothing but himself.

**Fact commit:** PS = ESCAPED; package state unchanged.

**Continuation:** report unless another pre-existing continuation is independently authorised.

---

# 7. ANBU MARKED TARGET

AMT variations are primarily package-state variations. Pakkun remains present on the existing routes where current authority already places him.

## AMT-KILL-ESCAPED — package already recovered by Kakashi

**Trigger:** **KILL HIM** -> **ESCAPED** while Kakashi already holds the package.

> Kakashi steps in.
>
> ANBU Marked Target sees the intent before the attack comes.
>
> He does not argue.
>
> He spends everything he has left on distance.
>
> Pakkun moves for the open side.
>
> The man changes direction before the gap closes, gets a foot onto the wall and reaches the roofline.
>
> Kakashi follows to the alley mouth.
>
> The man is gone.
>
> Pakkun looks up at him.
>
> **PAKKUN:** "Gone."
>
> **KAKASHI:** "Yes."
>
> The package remains secured against Kakashi.

**Fact commit:** AMT = ESCAPED; lethal intent recorded; package remains with Kakashi.

## AMT-KILL-ESCAPED — package already missing elsewhere

**Trigger:** **KILL HIM** -> **ESCAPED** while the package has already escaped with another participant.

> Kakashi moves to finish it.
>
> ANBU Marked Target reads the decision and abandons everything except escape.
>
> He breaks for the alley mouth.
>
> Pakkun cuts toward him.
>
> The man changes line at the last instant, reaches the wall and disappears above it.
>
> Kakashi reaches the opening a moment later.
>
> Nothing.
>
> **PAKKUN:** "He's gone."
>
> Kakashi keeps looking down the empty route.
>
> **KAKASHI:** "I know."
>
> The package is still missing.

**Fact commit:** AMT = ESCAPED; package remains in its already-committed state.

## AMT-RESTRAINED — exact scene

**Trigger:** RESTRAIN -> **RESTRAINED**.

> Kakashi draws the wire.
>
> ANBU Marked Target looks at it, then at Pakkun.
>
> **ANBU MARKED TARGET:** "So that's your answer."
>
> **KAKASHI:** "For now."
>
> Kakashi binds his wrists.
>
> The man pulls once against the restraint.
>
> It holds.
>
> Pakkun stays near the open end of the alley.
>
> ANBU Marked Target stops testing the wire.
>
> **ANBU MARKED TARGET:** "What now?"
>
> Kakashi looks back along the route he came.
>
> **KAKASHI:** "Depends who is still waiting."

**Fact commit:** AMT = RESTRAINED.

**Continuation:**
- if earlier MI and/or PS are RESTRAINED, proceed to the existing collection trajectory using those exact participants;
- if no earlier restrained participant exists, proceed to the route's existing report / transfer continuation.
- do not create `FIELD_SECURED_PENDING_COLLECTION` or `COLLECTED_ACTIVE_ESCORT`.

## AMT-RESTRAIN-ESCAPED — exact scene

**Trigger:** RESTRAIN -> **ESCAPED**.

> Kakashi brings the wire around his wrist.
>
> ANBU Marked Target waits until Kakashi pulls the first loop tight.
>
> Then he turns with it.
>
> The sudden movement drags the loose line across Kakashi's arm and gives the man the half-step he needs.
>
> Pakkun lunges for the exit.
>
> ANBU Marked Target is already changing direction.
>
> He reaches the wall, clears it and disappears beyond the roofline.
>
> Pakkun stops beneath the eaves.
>
> **PAKKUN:** "Gone."
>
> Kakashi gathers the loose wire.
>
> **KAKASHI:** "Yes."

**Fact commit:** AMT = ESCAPED; restraint intent recorded.

**Continuation:**
- if earlier participants remain RESTRAINED, Kakashi returns to collect those exact participants;
- otherwise proceed to report.
- package state remains whatever the route already committed.

---

# 8. Sequential restrained-participant collection

The all-three-live-capture trajectory remains valid, but it uses the simple participant fact **RESTRAINED**.

Required benchmark remains:

```
MI -> RESTRAINED
PS -> RESTRAINED
AMT -> RESTRAINED
-> collect exact restrained participants
-> TAKE THEM ALL BACK TO ANBU
   OR
-> TAKE THEM ALL TO THE UCHIHA POLICE FORCE
```

No collective captive object is required.

Collection reads the exact participant states.

A dead, escaped or released participant is not collected.

Existing collection dialogue may be retained where it remains factually correct, but runtime predicates must use exact `RESTRAINED` participant facts instead of `fieldSecured[]` / `FIELD_SECURED_PENDING_COLLECTION`.

If AMT is KILLED or ESCAPED while MI/PS remain RESTRAINED, collect only the still-restrained earlier participants.

If PS is KILLED or ESCAPED while MI remains RESTRAINED and no later pursuit is taken, Kakashi must not forget MI; the later closure/report must preserve her exact restrained fact and location.

---

# 9. Group KILL THEM resolver

Existing group **KILL THEM** choices remain one protagonist intent, but the factual resolver evaluates each exact targeted participant independently.

There is no aggregate all-or-nothing death flag.

## Two-target group: AMT + PS

### BOTH KILLED

> Kakashi commits before either man can recover.
>
> He moves from the first target to the second without stopping.
>
> When it is over, neither ANBU Marked Target nor Package Smuggler moves again.
>
> The package remains exactly where the route already placed it.

### AMT KILLED / PS ESCAPED

> Kakashi commits.
>
> ANBU Marked Target does not get back up.
>
> Package Smuggler sees what happens and moves before Kakashi can turn the same decision on him.
>
> He reaches the edge of the street and disappears.
>
> One man is dead.
>
> The other is gone.

### AMT ESCAPED / PS KILLED

> Kakashi commits.
>
> ANBU Marked Target uses the movement toward him to force distance and breaks away.
>
> Kakashi does not catch him.
>
> Package Smuggler does not find the same opening.
>
> When the street settles, Package Smuggler is dead and ANBU Marked Target is gone.

### BOTH ESCAPED

> Kakashi commits.
>
> The first movement is enough to break the stillness after the fight.
>
> ANBU Marked Target forces distance in one direction.
>
> Package Smuggler takes the other.
>
> Kakashi cannot close both exits.
>
> Seconds later, both men are gone.

## Three-target group: MI + PS + AMT

For three-target **KILL THEM**, use these exact factual compositions:

### ALL KILLED

> Kakashi makes the decision once.
>
> He carries it through target by target.
>
> When it is finished, Masked Interceptor, Package Smuggler and ANBU Marked Target are dead.
>
> Kakashi is the only shinobi still standing.

### MI ESCAPED / PS + AMT KILLED

> Kakashi commits.
>
> Masked Interceptor reads the first movement and breaks away before he can close on her.
>
> Package Smuggler and ANBU Marked Target do not escape the decision.
>
> When it is over, two are dead.
>
> Masked Interceptor is gone.

### PS ESCAPED / MI + AMT KILLED

> Kakashi commits.
>
> Masked Interceptor is killed first.
>
> Package Smuggler uses that instant to run.
>
> ANBU Marked Target does not make the same opening work.
>
> Two are dead.
>
> Package Smuggler is gone.

### AMT ESCAPED / MI + PS KILLED

> Kakashi commits.
>
> Masked Interceptor and Package Smuggler do not get away.
>
> ANBU Marked Target uses the sequence to build the distance he needs.
>
> By the time Kakashi turns, the first man is already gone.
>
> Two are dead.
>
> One escaped.

### MI KILLED / PS + AMT ESCAPED

> Kakashi commits.
>
> Masked Interceptor does not get back up.
>
> Package Smuggler and ANBU Marked Target move in opposite directions before Kakashi can carry the same decision to them.
>
> He cannot close both routes.
>
> One is dead.
>
> Two escaped.

### PS KILLED / MI + AMT ESCAPED

> Kakashi commits.
>
> Package Smuggler is killed.
>
> Masked Interceptor and ANBU Marked Target use the opening to separate.
>
> Kakashi turns after them.
>
> Both are already gone.
>
> One is dead.
>
> Two escaped.

### AMT KILLED / MI + PS ESCAPED

> Kakashi commits.
>
> ANBU Marked Target is killed.
>
> Masked Interceptor and Package Smuggler break away before Kakashi can finish the sequence.
>
> They take different exits.
>
> One is dead.
>
> Two escaped.

### ALL ESCAPED

> Kakashi commits.
>
> The defeated group moves the instant the threat becomes clear.
>
> Three routes open at once.
>
> Kakashi closes one and loses another.
>
> By the time he resets, all three have broken away.
>
> No one is dead.
>
> All three escaped.

For every group result:
- commit each target separately;
- preserve exact identity and lethal-intent history;
- do not present another disposition choice for an escaped target;
- do not infer package movement from kill outcome; preserve route-owned package truth.

---

# 10. Chronicle / report projection

The report and Chronicle Receipt must read exact committed facts.

Examples:

- `MI — KILLED`
- `MI — ESCAPED after Kakashi chose KILL`
- `PS — RESTRAINED`
- `PS — ESCAPED during restraint`
- `AMT — RESTRAINED`

Do not translate an escaped lethal attempt into mercy.

Do not translate an escaped restraint attempt into release.

Do not translate RESTRAINED into institutional custody unless ANBU/Police transfer later actually commits.

Exact internal wording/API names are Coding-owned, but the factual distinctions above are binding.

## 11. Superseded Kakashi runtime assumptions

For Academy Kakashi V2, the following current runtime assumptions are superseded:

- `dispose("X","KILL") -> DEAD` without a two-outcome resolver;
- `disposeGroup("KILL") -> DEAD for every target`;
- `addField() -> FIELD_SECURED_PENDING_COLLECTION`;
- `fieldSecured[]` as the semantic source of truth for Kakashi's restrained participants;
- report/receipt language that depends on those old Kakashi-only state names;
- legacy kill-conversation prose that moralises, explains the choice, or inserts Pakkun as conscience.

Keep Battle results, package state, current route chronology, Knowledge, Pakkun eligibility, rewards and institutional-transfer semantics unchanged unless this authority explicitly changes them.

## 12. Acceptance

Coding implementation is accepted only when:

1. every active Academy Kakashi KILL choice calls a resolver and can commit only KILLED or ESCAPED per target;
2. every active RESTRAIN choice calls a resolver and can commit only RESTRAINED or ESCAPED per target;
3. no controlled-defeat / field-secured intermediate state is required by Kakashi V2;
4. save/load/reopen does not reroll a committed result;
5. current pursuit timing gates remain authoritative;
6. all-three live capture remains reachable where existing Battle/timing gates allow it;
7. group KILL THEM resolves exact participants independently;
8. report / Minato / Chronicle Receipt reflect the committed result, not the button label;
9. old unused kill-conversation sections cannot leak back into player-facing runtime;
10. Browser Golden remains unclaimed until installed-browser validation.

## Final lock

> **KILL -> KILLED | ESCAPED.**
>
> **RESTRAIN -> RESTRAINED | ESCAPED.**
>
> **No controlled-defeat state. No field-secured state. No SURVIVED or INTERRUPTED result.**
>
> **The resolver changes the factual result, not the already-authorised route timing.**
