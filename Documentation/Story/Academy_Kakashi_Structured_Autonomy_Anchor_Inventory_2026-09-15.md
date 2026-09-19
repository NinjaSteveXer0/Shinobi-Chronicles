# Academy Kakashi Origin — Structured Autonomy Anchor Inventory

> **2026-09-20 CURRENT CLOSURE POINTER**  
> The old “final anchor inventory NOT YET CLOSED” statement below is historical.
>
> Current anchor precedence is governed by:
> `Academy_Kakashi_Final_Structured_Autonomy_Anchor_Reconciliation_2026-09-15.md`
> plus the current 2026-09-20 Writing closure authorities.
>
> Do not reopen Attack/Pickpocket or final-audit work from the old status line.

**Date:** 2026-09-15  
**Owner:** Stephen / Writing — Konoha; reusable semantics coordinated through CE / Codex / Coordination  
**Status:** **LOCKED CURRENT IMPLEMENTATION-ANCHOR INVENTORY — APPEND/RECONCILE AT ORIGIN WRITING CLOSURE; CODING ACTIVATION DEFERRED**

## Purpose

This document identifies the current Academy Kakashi Origin points where Structured Autonomy, authored participant action, protagonist reaction priority, and Battle-owned action ordering must be distinguished explicitly at runtime.

It exists so Coding does not have to reverse-engineer participant autonomy from finished prose after the Origin is closed.

This is a **current inventory**, not a claim that Academy Kakashi Origin authoring is complete. Newly closed branches must append/reconcile their autonomy anchors before the final Origin closure handoff.

Runtime implementation is deliberately deferred until the Origin is Writing-closed and CE / Codex / Coordination has reconciled the reusable participant-first rule with Battle/Summon action semantics.

Consumes current authority including:

- `Documentation/Coordination/Structured Story Autonomy Arc 1-3 Route History and Authored Geography Contract 2026-09-10.md`;
- `Documentation/Story/Interactive_Story_Player_Agency_Character_Autonomy_Cadence_and_Earned_Possibility_Authority_2026-09-11.md`;
- `Documentation/Story/Participant_First_Structured_Autonomy_and_Kakashi_Take_Him_Down_Correction_2026-09-15.md`;
- `Documentation/Story/Academy_Kakashi_Seven_Remaining_Substantial_Branch_Closure_2026-09-15.md`;
- current Academy Kakashi branch, Pakkun, Knowledge, Battle, disposition and branch-isolation authorities.

---

# 1. Anchor classes

Every machine-addressable Kakashi autonomy seam should be classified as one of these four types.

## A. `PARTICIPANT_AUTONOMY`

A materially present participant has a due action/reaction window before the protagonist's next meaningful decision.

Runtime evaluates the participant from legitimate committed state. The exact action is not scripted by Writing unless separately fixed.

## B. `STORY_FIXED_PARTICIPANT_ACTION`

Story intentionally fixes the participant action because it is part of the authored causal spine.

Runtime commits/projects that action; it must **not reroll it as an autonomy decision**.

## C. `PROTAGONIST_REACTION_WINDOW`

Story intentionally gives Kakashi the intervention/decision window before another participant's pending action becomes due.

This is a critical guard against a naive interpretation of `participants act first`.

Participant-first means **due participants act first**. It does not mean an NPC automatically consumes a pending Story action before an authored protagonist reaction window.

## D. `BATTLE_OWNED_AUTONOMY`

Story establishes participants, objectives and starting state, then Combat/Battle owns legal action order and exact tactical resolution.

The Story participant-first phase must not silently override Battle turn/action ordering.

CE/Coding must preserve the semantic handoff and return committed participant consequences to Story.

---

# 2. Required runtime anchor record

Each implemented anchor should preserve at minimum:

- `autonomyAnchorId`;
- branch / scene / decision context;
- anchor class;
- committed entry-state predicate;
- materially present participant IDs;
- which participant action windows are `due`, `pending`, `blocked`, or `Battle-owned`;
- actor-relative Knowledge basis;
- relationship / role / obligation basis where material;
- objective / danger / position basis where material;
- eligible semantic intent/action classes when autonomy is open;
- selected participant intent, including explicit `hold/watch/wait/no_action` where that is the result;
- owning resolver and result where required;
- committed state changes caused by participant action;
- protagonist affordances/choice set derived **after** those changes;
- authored invariant refs;
- prohibited inventions / branch-isolation guards;
- stable receipt / idempotence key;
- supersession lineage if later committed history legitimately changes an unresolved decision state.

Presentation text is downstream. It must not create, reroll or replace the semantic autonomy result.

---

# 3. Current Academy Kakashi anchor inventory

## `AK_SA_001` — Sakura exchange initial intervention window

**Class:** `PROTAGONIST_REACTION_WINDOW`

**State:** ANBU Marked Target and Package Smuggler are positioned for the package exchange; clean handoff has not completed; Kakashi is concealed and has the four first intents available.

**Player decision family:**

- Observe
- Get Closer
- Attack
- Attempt Pickpocket

**Priority guard:**

ANBU Marked Target and Package Smuggler's next transfer action is **pending, not due before this choice**.

Runtime must not apply the participant-first rule by completing the handoff before Kakashi receives this authored intervention window.

This anchor protects the causal existence of Attack and Pickpocket.

---

## `AK_SA_002` — Observe commits the exchange/escalation

**Class:** `STORY_FIXED_PARTICIPANT_ACTION`

Selecting Observe intentionally yields Kakashi's intervention window.

The following are authored causal actions, not autonomy rolls:

- ANBU Marked Target transfers the package to Package Smuggler;
- ANBU Marked Target begins leaving;
- Package Smuggler takes package custody;
- Masked Interceptor enters the visible situation under the existing Observe authority.

Only after those authored consequences commit is the Observe-derived protagonist choice family presented.

Do not reroll whether the handoff occurs after Observe.

---

## `AK_SA_003` — Direct Attack resolver return

**Class:** `PARTICIPANT_AUTONOMY` + owning-resolver seam

**Authored invariant:** Kakashi's direct intervention prevents/interrupts the intended clean handoff.

**Not authored automatically:** exact package custody, resistance, participant positioning, escape, custody, injury, or whether the legal resolver becomes Battle.

After the owning resolver commits the factual interruption state, materially present participants with due reaction windows must resolve before the next Kakashi decision is derived.

Do not reuse the Observe transfer/escalation merely for implementation convenience.

---

## `AK_SA_004` — Attempt Pickpocket resolver return

**Class:** `PARTICIPANT_AUTONOMY` + owning-resolver seam

**Authored invariant:** Kakashi's intervention prevents the intended clean handoff.

Detection, temporary custody, resistance, side effects, escape and resulting positions belong to the owning resolver/current Chronicle state.

After that factual result commits, due participant reactions resolve before the next protagonist decision.

Selecting Pickpocket does not command participant obedience or guarantee permanent Kakashi custody.

---

## `AK_SA_005` — Get Closer success: pre-handoff decision priority

**Class:** `PROTAGONIST_REACTION_WINDOW`

Kakashi successfully improves position and Knowledge while preserving concealment. The package is still with ANBU Marked Target and the handoff remains pending.

Approved next intents:

- Let the Handoff Happen
- Strike Before the Handoff
- Attempt the Pickpocket

**Priority guard:** the waiting handoff must not auto-complete merely because participants-first exists. Story has deliberately opened Kakashi's next reaction window before transfer completion.

If the player selects Let the Handoff Happen, the authored transfer then becomes due/fixed and Masked Interceptor becomes visibly eligible through Observe authority.

---

## `AK_SA_006` — Get Closer failure participant response

**Class:** `STORY_FIXED_PARTICIPANT_ACTION`

The failed resolver has an authored response sequence:

- Package Smuggler detects Kakashi's approach;
- he aborts the handoff;
- he tells ANBU Marked Target to keep the package and move;
- ANBU Marked Target obeys that immediate contingency and moves toward the main street/Sakura area;
- Package Smuggler remains behind and turns toward the compromised position.

These actions establish the failure state and are not rerolled.

Only then does Kakashi receive:

- Stay on the Package
- Stop Package Smuggler
- Cut Them Off at the Sakura Tree

---

## `AK_SA_007` — Stay on the Package pursuit resolver

**Class:** owning-resolver seam; participant actions folded into pursuit resolution

The pursuit resolver determines success/failure rather than assuming Kakashi catches ANBU Marked Target.

On success, Story's Pakkun eligibility predicate is satisfied because Kakashi legitimately reaches ANBU Marked Target.

On failure, ANBU Marked Target escapes carrying the package and Pakkun does not appear.

The pursuit resolver outcome is committed before later participant-autonomy/choice evaluation.

---

## `AK_SA_008` — Pakkun first-contact interception

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` for eligibility/entrance; autonomy resumes afterward

If Kakashi legitimately reaches ANBU Marked Target, Pakkun's presence is authored/mandatory. His recovered first-contact beat and initial interception staging are current Story authority.

Runtime must not randomly spawn Pakkun before eligibility and must not omit him after eligibility.

Once the first-contact scene has committed, Pakkun becomes a materially present autonomous participant. His later exact reactions/actions are not player commands and are open only where not separately fixed.

No Kakashi↔Pakkun name Knowledge is inferred.

---

## `AK_SA_009` — Demand the Package escalation

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` into `BATTLE_OWNED_AUTONOMY`

Authored sequence:

`Kakashi demands package -> ANBU Marked Target refuses -> PL Battle begins`.

There is no package-compliance resolver.

Battle caller:

**Kakashi Hatake with Pakkun as temporary Story-authorised Summon vs ANBU Marked Target.**

ANBU Marked Target's refusal is fixed Story causality here; do not reroll voluntary surrender.

Once Battle begins, exact tactical participant action ordering is Battle-owned. Story participant-first does not grant Pakkun a free pre-turn action unless CE/Combat explicitly reconcile and authorise that seam.

Temporary Summon participation != ownership/acquisition/assignment/permanent unlock.

---

## `AK_SA_010` — Demand the Package post-Battle return

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` / committed Battle consequence

Current approved outcomes are fixed from Battle result:

- Victory -> package recovered + ANBU Marked Target in Kakashi custody -> disposition family eligible.
- Defeat -> ANBU Marked Target escapes with package -> no custody/disposition.

These outcomes are not rerolled by a separate autonomy phase after Battle.

Pakkun remains present until an explicit authored departure.

Any additional participant reaction between committed Battle result and a later Kakashi decision must preserve these fixed outcome facts.

---

## `AK_SA_011` — Take Him Down: neutral package autonomy anchor

**Class:** `PARTICIPANT_AUTONOMY` at Story/Battle boundary; exact ordering requires CE/Combat reconciliation

Authored invariant:

Kakashi chooses immediate physical control and his opening intervention separates ANBU Marked Target from the package. The package becomes **neutral/contested** before the main Battle state.

**This is the strongest current Academy Kakashi Structured Autonomy anchor.**

Pakkun is materially present. His exact next tactical response is **not scripted by Writing**.

Examples of legitimate actions, only if current state supports them:

- recover/secure package;
- guard package;
- block ANBU Marked Target's route to it;
- support Kakashi directly;
- pressure ANBU Marked Target from another angle;
- hold/watch;
- another legitimate action.

`Pakkun secures the package while Kakashi fights` is an excellent CE realisation, not mandatory canon.

ANBU Marked Target is also autonomous within the same contested state, subject to Battle/CE ordering and his legitimate objective/capability.

The earlier scripted rule `Pakkun must preserve package` is superseded.

On a Take Him Down Battle defeat:

- target custody is lost;
- final package custody must consume whatever participant/Battle state actually committed.

Coding must not hard-code a universal package-recovery result from the button label.

---

## `AK_SA_012` — Pakkun persistent-participant recurrence

**Class:** recurring `PARTICIPANT_AUTONOMY` guard

After Pakkun first appears, he remains factually present through connected scenes until an explicit authored departure commits.

At every later consequential scene boundary, if his reaction/action window is due and the exact response is not already fixed by Story/Battle:

- evaluate Pakkun from his own Knowledge, personality, position, danger, objective and current state;
- permit hold/watch/no-action as legitimate results;
- allow his action to change the situation/affordances where legal;
- do not let the player command his exact behaviour;
- do not infer Summon ownership or Kakashi name Knowledge.

Continuity requires presence; autonomy determines eligible unfixed behaviour.

Continuity does **not** authorise spontaneous departure. Pakkun may be omitted only after an explicit legitimate departure occurrence.

---

## `AK_SA_013` — Post-capture disposition decision

**Class:** `PARTICIPANT_AUTONOMY` before/around a protected protagonist-choice family

Entry requires the valid capture state with package secured, ANBU Marked Target available for disposition, and Pakkun present.

The four Kakashi choices are protected authored protagonist intents:

1. Bring him to Uchiha Police Force
2. Let him go
3. Kill him
4. Take him back to the ANBU

Pakkun and ANBU Marked Target may react autonomously where a due reaction window exists and exact reaction is not already fixed by the approved branch prose.

They may **not** select Kakashi's disposition for him or remove/rewrite the four-choice family merely because they prefer another outcome, unless a separately authorised physical/resolver event legitimately changes the entry state before the choice becomes actionable.

Package custody remains independent.

---

## `AK_SA_014` — Observe → Secure the Package

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` into `BATTLE_OWNED_AUTONOMY`

Authored action priority is fixed:

- Kakashi goes directly for Package Smuggler;
- Masked Interceptor reacts by joining against Kakashi under the apparent cover-story situation;
- Battle caller becomes Kakashi vs Package Smuggler + Masked Interceptor (2-v-1).

Do not reroll whether Masked Interceptor joins this locked branch.

Once Battle begins, exact combat action selection/order is Battle-owned.

Approved Battle outcome consequences remain Story authority and must not be replaced by post-hoc autonomy rerolls.

---

## `AK_SA_015` — Observe → Defeat Assassin, then Secure Package

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` + `BATTLE_OWNED_AUTONOMY` + temporal world-state progression

Authored state:

- Kakashi prioritises Masked Interceptor;
- 1-v-1 PL Battle begins;
- Package Smuggler continues escaping with the package during Battle.

Package Smuggler's escape progress is a fixed causal consequence of Kakashi's chosen priority, not a new random autonomy decision each turn.

Battle turn count controls catch-up eligibility:

- victory in turns 1–4 -> catch-up remains possible;
- victory in turn 5+ -> Package Smuggler is gone.

Exact Battle actions are Combat-owned.

The downstream quick-win Package Smuggler confrontation is now closed by `AK_SA_022` below.

---

## `AK_SA_016` — Get Closer failure → Stop Package Smuggler

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` + `BATTLE_OWNED_AUTONOMY`

Kakashi deliberately abandons immediate pursuit of ANBU Marked Target and chooses Package Smuggler.

Authored fixed consequence:

- ANBU Marked Target continues escaping with the package while Kakashi commits to Package Smuggler.

This escape progression is not rerolled as an autonomy choice merely because ANBU Marked Target is an autonomous participant; it is the direct temporal consequence of Kakashi's selected priority.

Kakashi vs Package Smuggler then becomes PL Battle-owned.

Victory/defeat consumes the locked Story exit states from the seven-branch closure authority.

No Pakkun eligibility is created because Kakashi never reaches ANBU Marked Target.

---

## `AK_SA_017` — Get Closer failure → Cut Them Off at the Sakura Tree

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` into `BATTLE_OWNED_AUTONOMY`

Authored convergence state:

- Kakashi cuts across both fleeing/separating participants rather than selecting one to follow;
- ANBU Marked Target and Package Smuggler are prevented from cleanly separating;
- Kakashi legitimately reaches ANBU Marked Target, satisfying Pakkun's authored presence predicate;
- Pakkun's first-contact/interception staging commits;
- the resulting Battle caller is Kakashi + temporary Pakkun vs ANBU Marked Target + Package Smuggler.

The convergence and Battle sides are Story-fixed.

Exact tactical actions inside the PL Battle are Battle-owned. Do not grant Pakkun extra free Story actions merely because he is autonomous.

Victory may make the existing four-way ANBU Marked Target disposition family eligible only when the locked package + target custody predicates have committed.

---

## `AK_SA_018` — Ask Where the Package Was Going

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` for Knowledge payoff; `PARTICIPANT_AUTONOMY` resumes afterward

ANBU Marked Target's limited answer is authored Knowledge payoff, not a social/compliance resolver:

- he carried the package to Package Smuggler;
- his intended role ended at the handoff;
- he does not know the downstream destination;
- Package Smuggler did not tell him where it goes next.

This exchange must not manufacture a hidden destination or evaluation truth.

Because custody/position do not materially change, the route legitimately reconverges to:

- Demand the Package;
- Take Him Down.

Pakkun remains present and autonomous around unfixed reactions, but neither Pakkun nor ANBU Marked Target may select Kakashi's next physical intent for him.

---

## `AK_SA_019` — Observe → Stop the Assassin

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` + `BATTLE_OWNED_AUTONOMY`

Kakashi chooses the apparent immediate attacker rather than preserving package pursuit.

Authored fixed consequence:

- Package Smuggler uses that commitment window to escape cleanly with the package;
- this branch does **not** receive the 1–4-turn catch-up privilege belonging to `DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE`.

Kakashi vs Masked Interceptor is then Battle-owned.

Victory/defeat must preserve the apparent cover story and factual Knowledge boundaries.

No Pakkun eligibility is created because Kakashi does not reach ANBU Marked Target.

---

## `AK_SA_020` — Observe → Secure the Package Before the Assassin

**Class:** owning interception-resolver seam; success commits package extraction, failure reconverges to `AK_SA_014`

The player chooses to race/intercept the package before Masked Interceptor can close on Package Smuggler.

The interception resolver decides whether Kakashi gets there first.

### Success

- package custody commits to Kakashi;
- Kakashi withdraws with the objective;
- ANBU Marked Target escapes;
- Package Smuggler + Masked Interceptor remain behind;
- their exact later resolution is outside Kakashi Knowledge unless another authority later observes it.

Do not hard-script an off-screen autonomous fight merely to complete their state.

### Failure

Failure creates the existing 2-v-1 pressure state and must reconverge to `AK_SA_014` / Observe → Secure the Package.

Do not duplicate or reroll a second independent branch state when the established 2-v-1 authority already owns it.

---

## `AK_SA_021` — Observe → Go After the Original Target

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` + pursuit resolver + conditional `BATTLE_OWNED_AUTONOMY`

Authored tradeoff:

- Kakashi turns away from current package custody to pursue ANBU Marked Target;
- Package Smuggler remains the last known package holder;
- Masked Interceptor remains behind in the observed exchange space.

The pursuit resolver determines whether Kakashi legitimately reaches ANBU Marked Target.

### Pursuit failure

- no Pakkun;
- no target custody;
- package remains unrecovered;
- later state is factual debrief only.

### Pursuit success

- Pakkun presence becomes mandatory under the existing reach predicate;
- first-contact staging commits;
- ANBU Marked Target is empty-handed and refuses Kakashi's attempt to take him back;
- PL Battle begins: Kakashi + temporary Pakkun vs ANBU Marked Target.

Exact tactical actions are Battle-owned.

Even Battle victory does **not** unlock the package-secured four-way disposition family because package custody is absent. The locked route instead returns captured ANBU Marked Target to ANBU authority while recording mission-objective failure.

---

## `AK_SA_022` — Quick-win Package Smuggler catch-up after Masked Interceptor Battle

**Class:** owning catch-up-resolver seam + conditional `BATTLE_OWNED_AUTONOMY`

Entry requires the already-locked state:

- Kakashi defeated Masked Interceptor in 1–4 Battle turns;
- Package Smuggler escaped during that Battle;
- catch-up remains possible.

Fast victory grants **opportunity**, not automatic package recovery.

Catch-up resolver determines success/failure.

### Catch-up failure

- Package Smuggler escapes with package;
- no second Battle;
- no Pakkun;
- later debrief consumes Kakashi's factual Masked Interceptor and pursuit history.

### Catch-up success

- Kakashi reaches Package Smuggler;
- PL Battle begins: Kakashi vs Package Smuggler;
- exact tactical action is Battle-owned;
- post-Battle package custody consumes the locked Story result.

Do not fabricate Pakkun merely because other Kakashi endgame branches include him; Kakashi does not reach ANBU Marked Target on this route.

---

# 4. Current unresolved/future anchor obligations

After Stephen's approval of the seven-branch closure batch, the only remaining exact branch-realisation obligations are:

- direct first-choice `ATTACK` resolver-driven player-facing realisation / return envelope;
- direct first-choice `ATTEMPT PICKPOCKET` resolver-driven player-facing realisation / return envelope.

Pickpocket is intentionally allowed to remain last because Stephen expects it to be the fastest remaining branch.

The final Academy Kakashi audit may identify exact defects or missing explicit-departure/autonomy receipts, but it must not invent new branch families merely to expand scope.

**Authoring rule:** when Attack and Pickpocket are closed, Writing must classify any newly material decision/reaction seam into the anchor classes above, then perform one final reconciliation before declaring this inventory complete.

---

# 5. Anti-collapse rules for Coding

Coding must preserve all of the following:

- `participants act first` != every NPC acts before every player input;
- participant action window due != participant merely present;
- pending authored participant action != due autonomy window;
- protagonist reaction window != participant-autonomy window;
- Story-fixed participant action != autonomy reroll;
- participant autonomy != random behaviour;
- participant autonomy != player command;
- participant autonomy != unrestricted generated prose;
- autonomy selection != owning-resolver bypass;
- Story participant-first phase != override Battle turn/action order;
- temporary Summon participant != owned Summon;
- participant presence != Knowledge of identity/name;
- package location/custody != target custody;
- Battle victory/defeat != unstated Story consequence;
- UI refresh/save-load != autonomy reroll;
- presentation line != semantic participant action;
- sibling branch facts != current branch state.

---

# 6. Coding implementation shape after Origin closure

When Academy Kakashi Origin is Writing-closed and this inventory has received its final reconciliation, Coding should consume it through the existing queued CE live-choice / Story runtime work rather than building a Kakashi-only autonomy engine.

Minimum implementation expectations:

1. machine-addressable autonomy-anchor registration;
2. due/pending/blocked/Battle-owned participant action-window state;
3. participant eligibility from authoritative Knowledge/history/role/capability/position/current objective;
4. semantic action selection independent from expression;
5. owning-resolver dispatch where required;
6. state commit before protagonist choice regeneration;
7. persistent/idempotent participant-autonomy receipts;
8. choice set recalculated from the changed committed state;
9. no reroll on refresh/save/load;
10. diagnostics showing why an actor was eligible/ineligible and what state change their action committed;
11. branch-timeline isolation;
12. Battle/Summon integration without double turns or free Story actions that bypass Combat ordering.

Alpha-safe implementation may remain bounded/deterministic and use authored semantic action classes/templates. No unrestricted LLM action generation is required.

---

# 7. Activation gate

**Design / current anchor identification:** CLOSED FOR CURRENT AUTHORED MATERIAL.

**Academy Kakashi final anchor inventory:** NOT YET CLOSED — Attack/Pickpocket + final audit remain.

**Coding implementation:** QUEUED / DO NOT ACTIVATE FROM THIS DOCUMENT ALONE.

Activation prerequisites:

1. Academy Kakashi Origin Writing closure and final branch audit;
2. final update/reconciliation of this anchor inventory against the complete Origin;
3. CE / Codex / Coordination reconciliation of participant-first Story ordering with Combat/Battle/Summon action ordering;
4. then Coding implements/validates the complete anchor set as part of the real Origin runtime package.

Preserve:

**design identified != final inventory != implemented != runtime validated != Golden GREEN.**

---

## Final lock

> **Structured Autonomy anchors are implementation authority, not prose decoration.**
>
> **Every material Kakashi decision seam must identify whether participant action is autonomous, Story-fixed, protagonist-priority, or Battle-owned.**
>
> **Due autonomous participants resolve before the next protagonist choice; pending participant actions do not steal authored reaction windows.**
>
> **Pakkun recovering the neutral package during Take Him Down is a canonical example of a legitimate CE realisation, not a scripted Kakashi branch outcome.**
>
> **The seven substantial branch families now have explicit autonomy/resolver/Battle anchors.**
>
> **This inventory must be finalized when Attack/Pickpocket and the final Origin audit are complete, then consumed by Coding through reusable CE runtime architecture.**
