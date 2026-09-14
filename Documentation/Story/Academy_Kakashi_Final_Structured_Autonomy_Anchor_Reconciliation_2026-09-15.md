# Academy Kakashi Origin — Final Structured Autonomy Anchor Reconciliation

**Date:** 2026-09-15  
**Owner:** Stephen / Writing — Konoha; reusable semantics owned by CE / Codex / Coordination  
**Status:** **FINAL WRITING-CLOSED IMPLEMENTATION ANCHOR INVENTORY — CODING MAY CONSUME**

## Purpose

This is the final Academy Kakashi Structured Autonomy reconciliation required before runtime implementation.

It merges/supersedes status and precedence from:

- `Documentation/Story/Academy_Kakashi_Structured_Autonomy_Anchor_Inventory_2026-09-15.md`;
- `Documentation/Story/Academy_Kakashi_Structured_Autonomy_Anchor_Addendum_Decision_Continuation_2026-09-15.md` @ `a846d568d20ead78c610682de2fe4ff76713b0b7`;
- `Documentation/Story/Academy_Kakashi_Final_Writing_Closure_Audit_Runtime_and_Rewards_Consumption_Authority_2026-09-15.md` @ `176ce76feef3e67d4c24644e3d7443a04dcf7d6b`;
- CE participant-first runtime ordering authority;
- CE multi-target lethal-trajectory / ending-evaluation authority @ `ad526965c24240d03bfdcd3ed4ed8e8c19b4426e`.

Where the older inventory says Attack/Pickpocket remain open, final inventory is not yet closed, or `AK_SA_022` terminates before AMT/Pakkun, that older text is superseded.

Canonical rule:

> **Participants choose themselves when their action window is due. Story-fixed actions stay fixed. Kakashi retains authored reaction windows. Battle owns live Combat action order. Committed participant consequences update the state before Kakashi receives the next meaningful decision.**

---

# 1. Anchor classes

Use equivalent machine-addressable classifications for:

- `PARTICIPANT_AUTONOMY` — actor selects a legitimate semantic action from committed state;
- `STORY_FIXED_PARTICIPANT_ACTION` — causal participant action is authored and must not reroll;
- `PROTAGONIST_REACTION_WINDOW` — Kakashi receives an authored intervention window before a pending participant action becomes due;
- `BATTLE_OWNED_AUTONOMY` — Combat owns action economy/order while Battle is live;
- `RESOLVER_RETURN` — owning resolver commits factual state before autonomy/next choices derive;
- `POST_RESOLUTION_CLASSIFICATION` — participants/objects classify independently after resolver/Battle;
- `TERMINAL_PROJECTION_GUARD` — ending/debrief cannot fire while material semantic state remains unresolved.

One anchor may legitimately combine classes.

---

# 2. Final anchor inventory

## `AK_SA_001` — Sakura exchange initial intervention

**Class:** `PROTAGONIST_REACTION_WINDOW`

Clean handoff is pending. Kakashi receives Observe / Get Closer / Attack / Attempt Pickpocket before the transfer becomes due.

## `AK_SA_002` — Observe transfer/escalation

**Class:** `STORY_FIXED_PARTICIPANT_ACTION`

Observe yields the intervention window; AMT transfers package to PS; AMT leaves; MI becomes visibly present through authored Observe escalation. Do not reroll.

## `AK_SA_003` — Direct Attack return

**Class:** `RESOLVER_RETURN` + conditional `PARTICIPANT_AUTONOMY` / `BATTLE_OWNED_AUTONOMY`

Attack interrupts/prevents intended clean handoff. Resolver commits package/position/resistance/Battle state. Due participants then act from that committed state. MI is not auto-spawned.

## `AK_SA_004` — Direct Pickpocket exact return — FINAL

**Class:** resolver -> Story-fixed success withdrawal OR Story-fixed failure escalation -> `BATTLE_OWNED_AUTONOMY`

SUCCESS:

`package = Kakashi -> withdrawal completes unseen -> no MI -> no Battle -> no Pakkun`.

FAILURE:

`MI appears as branch-specific exception -> Kakashi vs AMT + PS + MI 3-v-1`.

This replaces the older open Pickpocket anchor.

## `AK_SA_005` — Get Closer SUCCESS reaction window

**Class:** `PROTAGONIST_REACTION_WINDOW`

Handoff remains pending. Kakashi receives Let Handoff Happen / Strike Before Handoff / Attempt Pickpocket. Participant-first must not steal this window.

## `AK_SA_006` — Get Closer FAILURE participant response

**Class:** `STORY_FIXED_PARTICIPANT_ACTION`

PS detects Kakashi, aborts handoff, orders AMT to keep package/move; AMT moves; PS turns toward compromised position. Then Kakashi receives the three failure choices.

## `AK_SA_007` — Stay on Package pursuit

**Class:** `RESOLVER_RETURN`

Pursuit success/failure commits before downstream Story. Success satisfies downstream Pakkun-interception eligibility; failure does not.

## `AK_SA_008` — Downstream Pakkun interception entry

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` for eligibility/entry, then `PARTICIPANT_AUTONOMY`

Only legitimate downstream AMT reach invokes this anchor. Original-exchange presence of AMT does not.

## `AK_SA_009` — Demand Package refusal -> Battle

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` -> `BATTLE_OWNED_AUTONOMY`

AMT refuses; Kakashi + temporary Pakkun vs AMT PL Battle. No package-compliance resolver.

## `AK_SA_010` — Demand Package Battle return

**Class:** Story-fixed post-Battle consequence.

Win -> package + AMT custody. Loss -> AMT escapes with package. Pakkun remains until explicit departure.

## `AK_SA_011` — Take Him Down neutral-package autonomy

**Class:** `PARTICIPANT_AUTONOMY` at Story/Battle boundary + `BATTLE_OWNED_AUTONOMY`

Kakashi makes package neutral. Pakkun's exact response is not scripted. `Pakkun secures package while Kakashi fights` is legitimate, not mandatory.

## `AK_SA_012` — Pakkun recurring autonomy/presence

**Class:** recurring `PARTICIPANT_AUTONOMY` guard.

After Pakkun enters, every due unfixed reaction/action window considers him until explicit departure. Presence != player command or ownership.

## `AK_SA_013` — Package-secured AMT disposition window

**Class:** protected protagonist choice with surrounding participant autonomy.

Police / Release / Kill / Return to ANBU remain Kakashi's choices when predicates are satisfied. Participants may react but do not choose for him.

## `AK_SA_014` — Observe -> Secure Package

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` -> `BATTLE_OWNED_AUTONOMY`

Kakashi goes PS first; MI joins under cover story; 2-v-1 Battle.

## `AK_SA_015` — Observe -> Defeat Assassin then Secure Package

**Class:** Story-fixed priority + `BATTLE_OWNED_AUTONOMY` + timing gate.

PS escape progress occurs while Kakashi fights MI. MI win <=4 preserves PS catch-up; 5+ closes it.

## `AK_SA_016` — Get Closer FAILURE -> Stop PS

**Class:** Story-fixed AMT escape progression -> `BATTLE_OWNED_AUTONOMY`.

AMT continues with package while Kakashi engages PS.

## `AK_SA_017` — Get Closer FAILURE -> Cut Off at Sakura

**Class:** Story-fixed convergence -> downstream Pakkun entry -> `BATTLE_OWNED_AUTONOMY`.

Kakashi + Pakkun vs AMT + PS.

## `AK_SA_018` — Ask Where Package Was Going

**Class:** Story-fixed Knowledge payoff; autonomy resumes afterward.

AMT provides only authored limited knowledge, then route reconverges to Demand Package / Take Him Down.

## `AK_SA_019` — Observe -> Stop Assassin

**Class:** Story-fixed PS clean escape + `BATTLE_OWNED_AUTONOMY`.

No 1–4 catch-up privilege on this branch.

## `AK_SA_020` — Secure Package Before Assassin

**Class:** interception `RESOLVER_RETURN`.

Success -> package extraction + withdrawal. Failure -> existing Secure Package 2-v-1 state. Do not reroll duplicate branch state.

## `AK_SA_021` — Go After Original Target

**Class:** Story-fixed priority + pursuit `RESOLVER_RETURN` + conditional downstream Pakkun/Battle.

Package remains with PS. Pursuit success -> downstream Pakkun -> Kakashi+Pakkun vs AMT.

## `AK_SA_022` — Quick MI -> PS -> AMT continuation — SUPERSEDED FINAL

**Class:** catch-up resolver + `BATTLE_OWNED_AUTONOMY` + sequential timing gates.

Correct sequence:

`MI Battle win <=4 -> PS catch-up eligible -> PS Battle win <=3 -> AMT reach eligible -> AMT reached -> Pakkun entry -> later AMT Battle/disposition`.

Old `no Pakkun / AMT gone after PS victory` text is superseded on this qualifying route.

A qualifying deterministic MI/PS kill does not receive an invented hidden timing penalty that makes the locked sequential triple-kill route impossible.

## `AK_SA_023` — Generic post-resolution classification

**Class:** `POST_RESOLUTION_CLASSIFICATION`

Each relevant participant independently becomes controlled defeated / defeated-not-controlled / escaped-unavailable / dead / owner-authorised equivalent before Kakashi's next legal affordances derive.

## `AK_SA_024` — Take Him Down defeat package closure

**Class:** Battle defeat -> package-state evaluation -> due autonomy if needed.

AMT escapes; target custody lost. Package must resolve to committed Kakashi/Pakkun-side custody, AMT custody, or a factual autonomy result before debrief/ending.

## `AK_SA_025` — Secure Package 2-v-1 victory continuation

**Class:** `POST_RESOLUTION_CLASSIFICATION` + due autonomy + protagonist continuation.

Package commits to Kakashi; PS/MI classify independently; immediate Kakashi continuation preserves clean AMT pursuit; optional actions commit before later state derives.

## `AK_SA_026` — Stop PS victory continuation

**Class:** `POST_RESOLUTION_CLASSIFICATION`.

AMT/package escape remains fixed. PS state determines custody / deterministic kill / resolver lethal attempt / unavailable action.

## `AK_SA_027` — AMT victory without package

**Class:** `POST_RESOLUTION_CLASSIFICATION` with package/disposition non-collapse.

Package failure does not erase physical lethal eligibility against a controlled defeated AMT. Package-success menu predicates remain separate.

## `AK_SA_028` — Direct Pickpocket failure 3-v-1 return

**Class:** `BATTLE_OWNED_AUTONOMY` -> multi-participant `POST_RESOLUTION_CLASSIFICATION`.

After victory, all three opponents classify separately and package state commits separately. Group victory does not grant an uninterrupted free disposition chain; after each material protagonist action, due participant autonomy/state reevaluates.

## `AK_SA_029` — Get Closer SUCCESS -> Strike Before Handoff

**Class:** `RESOLVER_RETURN` consuming Direct Attack matrix from improved position.

AMT starts with package; clean handoff is interrupted. MI does not auto-appear. Current resolver state determines the next legitimate continuation.

## `AK_SA_030` — Get Closer SUCCESS -> Attempt Pickpocket

**Class:** resolver -> Story-fixed success withdrawal OR Story-fixed MI-unseen failure Battle.

SUCCESS:

`package = Kakashi -> withdrawal -> no MI -> no Battle -> no Pakkun`, while retaining fuller Get Closer Knowledge.

FAILURE:

`clean handoff prevented -> AMT + PS react -> MI remains unseen -> Kakashi vs AMT + PS 2-v-1`.

Post-Battle states classify independently.

## `AK_SA_031` — Pakkun explicit terminal departure

**Class:** `STORY_FIXED_PARTICIPANT_ACTION` at connected mission closure when no more specific approved departure exists.

After final relevant debrief/connected closure, Pakkun explicitly leaves before private Minato/Receipt projection. No name exchange or ownership state is created.

## `AK_SA_032` — Terminal semantic-resolution guard

**Class:** `TERMINAL_PROJECTION_GUARD`.

Debrief / Minato / Chronicle Receipt / Origin completion may not commit while a materially relevant package custody, participant final state, lethal action result, pursuit result, or due autonomy consequence is still semantically unresolved.

Once all required facts are committed, ending evaluation is read-only over that history until its own ending-realisation occurrence commits.

---

# 3. Final reusable ordering

Outside Battle, where a due participant window exists:

`committed state`
-> `eligible due participants evaluated`
-> `participant intent/resolver result commits`
-> `state updates`
-> `Kakashi choice set derives`
-> `Kakashi intent commits`
-> `owning resolver/Battle`
-> `post-resolution classification`
-> repeat.

Inside Battle:

Combat owns action economy / turn ordering.

Story/CE must not create free extra tactical actions at Battle boundaries.

---

# 4. Coding implementation requirements

Coding may now activate this inventory as the Academy Kakashi consumer of reusable CE autonomy architecture.

At minimum runtime must support:

- machine-addressable anchor IDs;
- due / pending / blocked / Battle-owned window state;
- actor-relative Knowledge/history/role/capability/position/objective eligibility;
- semantic participant action selection independent from prose;
- owning-resolver dispatch;
- state commit before Kakashi choice regeneration;
- persistent/idempotent autonomy receipts;
- no reroll on refresh/save/load;
- branch isolation;
- independent object custody and participant custody;
- multi-participant post-Battle classification;
- diagnostics explaining eligibility/result;
- Battle/Summon integration without double actions;
- exact supersession/precedence for anchors 004 and 022;
- anchors 023–032 above.

Alpha may use bounded authored semantic action classes/templates. No unrestricted generated NPC behaviour is required.

---

# 5. Final activation status

**Kakashi Writing closure:** CLOSED.  
**Final Structured Autonomy anchor inventory:** CLOSED.  
**Reusable CE participant-first semantics:** DESIGN CLOSED.  
**Reusable CE lethal-trajectory semantics:** DESIGN CLOSED.  
**Coding consumption:** READY.  
**Implemented:** NOT CLAIMED.  
**Runtime validated:** NOT CLAIMED.  
**Golden/regression GREEN:** NOT CLAIMED.

Final rule:

> **The player chooses Kakashi. Autonomous participants choose themselves when due. Story fixes only intentional causal invariants. Battle owns Battle. Every committed consequence changes what can happen next.**
