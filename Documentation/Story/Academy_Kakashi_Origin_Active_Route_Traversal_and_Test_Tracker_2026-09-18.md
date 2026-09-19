# Academy Kakashi Origin — Active Route Traversal and Test Tracker

**Date:** 2026-09-18  
**Owner:** Stephen / Writing — Konoha  
**Status:** **ACTIVE PRODUCTION TRACKER — UPDATE AS EACH ROUTE IS WRITTEN / IMPLEMENTED / BROWSER-TESTED**

## Purpose

Track the exact Kakashi Origin route Stephen is currently traversing so scene-by-scene production does not lose branches, and record when an artificial browser/dev-tools test intervention is required to expose a route that is not naturally reachable with the current Academy build.

Do not treat this tracker as Story authority where it conflicts with a locked scene/causal document. It records traversal/testing coverage only.

## Current traversal strategy

Stephen is completing one route all the way to the Origin end before rewinding to the earlier choice point and working the remaining routes around.

Current production traversal:

`Scene 2 — WATCH THE EXCHANGE`
-> `Scene 3A — STOP THE ASSASSIN`
-> `Scene 4A — Kakashi vs Masked Interceptor PL Battle`
-> natural browser result: **Kakashi Victory on turn 4+**
-> `Scene 5A-W2 — Late Victory / no pursuit`
-> selected `ATTEMPT TO KILL HER`
-> `Scene 6A-W2C — Attempt to Kill Her`
-> resolver result **LETHAL_ATTEMPT_KILLED**
-> confirmed-kill animation + aftermath
-> Objective switches to **Report to ANBU.**
-> **BLACK WIPE**
-> `Scene 7A-W2C-K — ANBU Report` on `rooftop_night.png`
-> Objective `Report to ANBU.` removed at scene end
-> **BLACK WIPE**
-> `Scene 8A-W2C-K — Hokage's Office` on `hokage_administration_interior_night.png`
-> private reaction scene with Minato + ANBU Operative + ANBU Marked Target + Package Smuggler; Masked Interceptor absent because she is dead on this Chronicle
-> **BLACK WIPE**
-> Chronicle Receipt / closing sequence
-> **continue this route to its terminal Origin ending before rewinding**.

## Current route state

- Scene 5A-W2 represents `STOP THE ASSASSIN -> WIN -> turn 4+`.
- Its visible choice surface has three actions:
  - `ATTEMPT TO KILL HER` / `KILL HER` where lawful;
  - `TAKE HER BACK TO ANBU`;
  - `TAKE HER TO THE UCHIHA POLICE FORCE`.
- The `ATTEMPT TO KILL HER` family has now been authored through terminal continuation for all four resolver outcomes:
  - `LETHAL_ATTEMPT_KILLED`;
  - `LETHAL_ATTEMPT_SURVIVED`;
  - `LETHAL_ATTEMPT_INTERRUPTED`;
  - `LETHAL_ATTEMPT_ESCAPED`.
- The KILLED / SURVIVED / INTERRUPTED / ESCAPED chains each now have their Scene 06 result, Scene 07 rooftop ANBU report, and Scene 08 Hokage Office continuation locked.
- Coding has implemented the non-kill continuation family; installed-browser Golden remains open.
- One surgical runtime correction is currently pending on #237: remove the stray player-facing narration `A beat.` from the ESCAPED Hokage Office scene. This does not reopen Story semantics.
- `TAKE HER BACK TO ANBU` is now fully authored/Stephen-approved through its ANBU handoff, Hokage Office and Chronicle closure.
- `TAKE HER TO THE UCHIHA POLICE FORCE` is now fully authored/Stephen-approved through Police handoff, ANBU report, Hokage Office and Chronicle closure.
- The corrected post-MI fast-win choice surface is Stephen-approved, including the new `RESTRAIN HER AND CONTINUE` intent.
- Immediate ANBU/Police branches are routed to Coding on #246.
- `RESTRAIN HER AND CONTINUE` remains waiting on CE / Codex / Coordination #244 before exact runtime consequence scenes are authored/implemented.

## Required later browser test — manual fast-win exposure

Current Academy-state combat may resolve too slowly to expose the corrected `STOP THE ASSASSIN -> WIN -> 1–4 turns` pursuit fork during ordinary play.

Therefore this route requires a deliberate **Dev Tools / test-state intervention** later so Stephen can validate the quick-win scene.

Required reminder point:

> When Stephen rewinds to test the corrected `STOP THE ASSASSIN` fast-win fork, remind him **before or at the Masked Interceptor Battle** that he may need the Dev Tools/test override to force a victory within 1–4 turns.

The corrected quick-win branch to validate is:

`STOP THE ASSASSIN`
-> `Kakashi vs Masked Interceptor`
-> **win in 1–4 turns**
-> immediate post-MI decision surface includes both:
   - `GO AFTER PACKAGE SMUGGLER`
   - `GO AFTER ANBU MARKED TARGET`
-> selecting Package Smuggler can preserve later AMT pursuit only if Package Smuggler is then defeated within **1–3 turns**
-> selecting ANBU Marked Target immediately closes the Package Smuggler route.

Do not treat the Dev Tools intervention as canonical Chronicle history; it is browser/route validation only.

## Branches known to require later revisit from Scene 5A-W2

After the current `ATTEMPT TO KILL HER` route reaches its end, the other Scene 5A-W2 branches still need their own scene-by-scene traversal:

- `TAKE HER BACK TO ANBU`
- `TAKE HER TO THE UCHIHA POLICE FORCE`

## Earlier branch point still to revisit

After the active `STOP THE ASSASSIN` family is completed, return to Scene 3A and continue remaining sibling choices under the established top-left-around traversal plan:

- `SECURE THE PACKAGE`
- `SECURE THE PACKAGE BEFORE THE ASSASSIN`
- `DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE`
- `GO AFTER THE ORIGINAL TARGET`

Each branch must be tracked independently through its own Battle/resolver outcomes.

## Tracking rule

For every new scene reached, update this file with:

- incoming choice / branch ID;
- Battle/resolver result;
- timing gate result where relevant;
- current scene ID;
- branches tested;
- branches still untested;
- whether normal play can reach the branch;
- whether a Dev Tools/test override is needed for browser coverage.

## Multi-target live-custody expansion

Stephen approved a nonlethal multi-target trajectory parallel to the multi-target lethal trajectory.

Durable Story requirement:
`Documentation/Story/Academy_Kakashi_Multi_Target_Live_Custody_Trajectory_and_Group_Disposition_Requirement_2026-09-18.md`
commit `0213690b64e0b381910ec089d9a81404a12adab0`.

Required benchmark:
`MI win 1–4 -> restrain MI and continue -> pursue PS -> PS win 1–3 -> restrain PS and continue -> reach AMT -> Pakkun -> capture AMT -> collect earlier secured captives -> transfer all captives to ANBU or Uchiha Police Force`.

Immediate transfer remains distinct from restrain-and-continue:
- TAKE HER BACK TO ANBU = deliver now / pursuit closes;
- TAKE HER TO UCHIHA POLICE FORCE = deliver now / pursuit closes;
- RESTRAIN AND CONTINUE = field-secure alive / pursuit may continue if still eligible.

Reusable field-custody semantics are now waiting on CE / Codex / Coordination issue #244 before exact restrain-and-continue scenes are locked.

## Stop the Assassin — current completion inventory

Current binding timing:
- MI victory in **1–4 turns** -> both Package Smuggler and ANBU Marked Target pursuit options may remain.
- MI victory on **turn 5+** -> immediate pursuit is closed.
- PS-first continuation preserves later AMT pursuit only if PS is defeated within **1–3 turns**.

### Writing / Story complete
- Scene 04A — Kakashi vs Masked Interceptor Battle caller.
- Scene 05A-L — Kakashi loses, ending at **RETURN TO ANBU** choice.
- Lethal-intent family after MI victory:
  - KILLED;
  - SURVIVED;
  - INTERRUPTED;
  - ESCAPED;
  each authored through ANBU report / hidden Hokage-office continuation.
- **TAKE HER BACK TO ANBU** immediate-transfer branch authored through terminal Origin closure.
- **TAKE HER TO THE UCHIHA POLICE FORCE** immediate-transfer branch authored through terminal Origin closure.
- Fast-win post-MI semantic choice surface approved, including **RESTRAIN HER AND CONTINUE**.

### Implemented
- Immediate MI -> ANBU and MI -> Uchiha Police branches are implemented by Coding generation 47, commit `81ed5b581f119d6f2a186e0502b47fc5c3a9b8cf`; source/headless GREEN; installed-browser validation still required.
- Corrected 1–4 MI pursuit predicates and 1–3 PS->AMT timing predicates are implemented.
- **RESTRAIN HER AND CONTINUE** is visible where eligible but its consequence remains deliberately fail-closed pending CE issue #244.

### Stop the Assassin Writing still outstanding
1. Rewrite the exact Scene 05A-W player-facing authority so its narration/choice presentation matches the approved **1–4 dual-pursuit** rule and new restrain option; the older 1–3 verbatim file is superseded causally but not yet replaced cleanly.
2. Complete **Kakashi loses -> RETURN TO ANBU** after Scene 05A-L through debrief / hidden evaluation / Chronicle closure.
3. Complete **GO AFTER PACKAGE SMUGGLER** from the qualifying post-MI 1–4 state:
   - pursuit/catch-up scene and resolver;
   - PS Battle;
   - post-PS result/disposition surface;
   - <=3-turn PS victory may preserve AMT;
   - 4+ closes later AMT pursuit.
4. Complete **GO AFTER ANBU MARKED TARGET** directly after qualifying MI victory:
   - PS route closes;
   - pursuit;
   - Pakkun entry;
   - AMT Battle / return;
   - legal post-AMT disposition and terminal continuation for this package-missing chronology.
5. Reconcile the lethal scene's fast-win presentation/entry wording with the new 1–4 parent state, including a deterministic **KILL HER** exact branch if `CONTROLLED_DEFEATED` is actually produced.
6. After CE #244 closes field-secured custody semantics, author **RESTRAIN HER AND CONTINUE**:
   - MI field-secure continuation;
   - PS restraint/custody continuation;
   - accumulated-captive collection;
   - final all-captive ANBU / Uchiha Police transfers;
   - mixed live/dead/escaped custody histories as state-driven projections rather than bespoke permutation explosion.

### Browser validation still outstanding
- generation-47 immediate ANBU custody branch;
- generation-47 immediate Uchiha Police custody branch;
- corrected fast-win 1–4 decision surface;
- later engineered Dev Tools fast-win coverage once the remaining successor branches exist.



## 2026-09-19 approval advance — Scene 05A-W / lethal correction / loss report

Stephen explicitly approved and Writing committed:

- corrected Scene 05A-W exact 1–4 dual-pursuit choice surface — `bf16ebe0f677994878fbe60e30e7b546da899eb8`;
- corrected resolver-determined ATTEMPT TO KILL continuation with post-result pursuit recalculation — `bef78d90ccdea0206199ca0cdd06593ce3a0adb1`;
- deterministic CONTROLLED_DEFEATED KILL HER branch — `0d4aa441e4ef6d566f3d1df23c198940bdc559dd`;
- Kakashi-loss RETURN TO ANBU report scene — `8e1d18cdc2b1e2ca0c6d0d0b56dd3c3b5fd5d623`.

The previous runtime assumption that lethal intent itself closes all pursuit is superseded. Current rule is factual-result commit -> pursuit recalculation.

The loss route is authored only through its rooftop ANBU report. Hidden Hokage Office loss-route evaluation remains the next Writing scene for that branch.

Coding handoff: issue #pending.

CE #244 still exclusively blocks the factual consequence of RESTRAIN / ATTEMPT TO RESTRAIN AND CONTINUE.


## 2026-09-19 approval advance — STOP THE ASSASSIN loss route closed in Writing

Stephen approved the hidden Hokage Office continuation after the Kakashi-loss rooftop report.

Durable scene:
- `SCENE_07A_L — HOKAGE'S OFFICE: KAKASHI DEFEATED`
- `Documentation/Story/Academy_Kakashi_Origin_Scene_07A_L_Hokage_Office_Kakashi_Defeated_Verbatim_Lock_2026-09-19.md`
- commit `d0d29a18ae2104b0cd29c1ca29b1f5a88fef71ab`.

Loss chronology is now Writing-complete through:
`MI defeats Kakashi -> RETURN TO ANBU -> rooftop ANBU report -> hidden Hokage Office -> Chronicle Receipt / Origin closure`.

Coding issue #249 has been updated to consume this final loss-route scene. Browser validation remains separate after implementation.


## 2026-09-19 approval advance — STOP THE ASSASSIN pursuit successors locked

Stephen approved the remaining post-MI-death pursuit writing requested by Coding issue #252.

Durable locks:

1. **MI dead -> GO AFTER PACKAGE SMUGGLER**
   - `Documentation/Story/Academy_Kakashi_Stop_Assassin_Post_MI_Death_Go_After_Package_Smuggler_Verbatim_Lock_2026-09-19.md`
   - commit `bf30ca7dfff9f850bebe978acdd8830f16758042`
   - closes chase / catch-up, PS Battle, separate package-recovery occurrence, post-PS lethal/disposition timing, qualifying PS->AMT continuation, Pakkun AMT entry, AMT Battle return, and corrected AMT-loss package-state resolver wording.

2. **MI dead -> GO AFTER ANBU MARKED TARGET**
   - `Documentation/Story/Academy_Kakashi_Stop_Assassin_Post_MI_Death_Go_After_ANBU_Marked_Target_Verbatim_Lock_2026-09-19.md`
   - commit `e18729844922461c654481745e48a6eac20649cd`
   - closes direct AMT pursuit, permanent PS-route closure, mandatory Pakkun entry on legitimate AMT reach, AMT Battle, state-derived disposition, and corrected package-custody resolution on Kakashi defeat.

Both locks preserve:
- deterministic MI KILL vs resolver-successful lethal-attempt provenance;
- `Kill != automatic Origin ending`;
- package custody independent from participant life/death;
- PS <=3 benchmark for later AMT reach where applicable;
- Pakkun continuity after legitimate AMT reach;
- Kakashi's established `PAKKUN: "This yours?" -> KAKASHI: "Apparently."` exchange;
- AMT Battle victory/defeat never granting package custody by implication.

### Remaining STOP THE ASSASSIN Writing blocker

Only the factual **RESTRAIN / ATTEMPT TO RESTRAIN AND CONTINUE** consequence family remains blocked on CE #244.

The approved future choice projection is now recorded:
- another objective remains -> **RESTRAIN HIM AND CONTINUE**;
- final single restrained participant -> **RESTRAIN HIM AND TURN HIM INTO ANBU** / **RESTRAIN HIM AND TURN HIM INTO THE UCHIHA POLICE FORCE**;
- earlier restrained captives also remain -> **RESTRAIN AND TURN THEM INTO ANBU** / **RESTRAIN AND TURN THEM INTO THE UCHIHA POLICE FORCE**.

Do not author or implement field-secured custody, later collection, escape/intervention, or group-transfer facts until #244 publishes the reusable semantic contract.

Coding routing: **SEND NOW -> issue #252**.
Stephen relay: **NONE**.


## 2026-09-19 expression retrofit — loss Hokage Office

Stephen rejected the implemented Scene 07A-L hidden Hokage Office conversation as repetitive information-terminal dialogue and approved a character-driven rewrite.

Revised exact authority:
- `Documentation/Story/Academy_Kakashi_Origin_Scene_07A_L_Hokage_Office_Kakashi_Defeated_Verbatim_Lock_2026-09-19.md`
- commit `362f72b8f20f50fec1b8e11e483e40cf5030364c`.

Semantics remain unchanged. This is a player-facing expression retrofit only.

Global Writing law strengthened:
- `Storywide_Player_Facing_Performance_and_Narrative_Craft_Successor_Authority_2026-09-14.md`
- commit `f3367b021da9d7b111d29ff3fbf0537d600e1755`
- explicit rule: **People ask questions. People answer as themselves.**
- repetitive factual question / one-word-answer ping-pong is Writing RED unless deliberately earned.

Writing-owned character profile registry created:
- `Documentation/Story/Character_Personality_and_Voice_Profile_Registry_2026-09-19.md`
- commit `e7cd58d0574d069e9b25bc7ec8506f639af22f0c`
- active Kakashi Origin profiles: Academy Kakashi, Pakkun, Minato, ANBU Operative, Masked Interceptor, Package Smuggler, ANBU Marked Target, plus Uchiha Police institutional baseline.

Runtime currently still contains the superseded office cue sequence in `runtime/alpha-kakashi-loss-ending-35820.js`.

Coding handoff:
- GitHub #257 — replace only the player-facing office cue realization; preserve existing loss semantics / hidden-review facts / closure.


## 2026-09-19 simplification — remove post-Battle control-state gate

Stephen simplified Academy Kakashi Origin post-Battle disposition semantics after installed-browser testing exposed that `CONTROLLED_DEFEATED` had no clear player-created path and was needlessly blocking restraint work.

Binding authority:
- `Documentation/Story/Academy_Kakashi_Post_Battle_Disposition_Simplification_2026-09-19.md`
- commit `62821414baaadd047c524239d1b3bbf207692b61`.

Current rule:
- valid Battle victory opens authored post-Battle disposition;
- no Ninja Wire / binding-skill finisher requirement;
- no hidden `CONTROLLED_DEFEATED` prerequisite for direct Story choices;
- do not rename choices to `ATTEMPT TO...` solely from internal control classification;
- direct `KILL` is deterministic where authored after Battle victory;
- direct `RESTRAIN ... AND CONTINUE` commits successful field restraint;
- institutional custody and package custody remain separate.

Issue impact:
- #244 narrowed: no attempted-restraint success resolver needed; remaining scope is field-secured persistence, later escape/intervention, collection and group transfer.
- #256 item 1 superseded: no separate PS attempted-lethal resolver merely because PS lacks hidden control classification.
- Coding handoff #277: remove the control-state gate from MI/PS/AMT player-facing post-Battle choices and preserve existing timing/package/autonomy semantics.


## 2026-09-19 — #281 restraint / collection / ANBU returns complete

Stephen approved the complete post-restraint / collection / multi-captive transfer tranche and the supplemental ANBU-return scenes.

Durable exact authorities:

- `Documentation/Story/Academy_Kakashi_Post_Restraint_Collection_and_Multi_Captive_Transfer_Verbatim_Lock_2026-09-19.md`
  - original approved lock: `bc8d0a1b5c6b829e0963feaa411864394ce7a092`
  - PS exact alternate-night backdrop update: `b80a7b178509640f28ab9f586cad3d1d42b934f5`

- `Documentation/Story/Academy_Kakashi_Supplemental_ANBU_Returns_PS_AMT_All_Three_Verbatim_Lock_2026-09-19.md`
  - commit: `6af07c7e5374c2e6910c487d709961347a4b306f`

- Kakashi backdrop inventory exact PS binding:
  - `Documentation/Story/Academy_Kakashi_Origin_Backdrop_Asset_Inventory_and_Writing_Binding_2026-09-19.md`
  - commit: `41ad6a16a5d776ccfec72e228998296b0f83f931`

Current PS-focused backdrop:
`Kakashi Origin Backdrop/konoha_alleyway_alt_night.png`

Approved scenes now include:
- MI `RESTRAIN HER AND CONTINUE`;
- PS `RESTRAIN HIM AND CONTINUE`;
- AMT `RESTRAIN HIM AND COLLECT THE OTHERS`;
- state-driven collection of PS / MI;
- singular/group final disposition projection;
- group ANBU handoff;
- group Uchiha Police handoff;
- singular PS return to ANBU;
- singular AMT + Pakkun return to ANBU;
- all-three captive return journey into the approved group ANBU handoff.

Kakashi uses `Wire Snare` / ninja wire as the physical restraint method after the player chooses RESTRAIN.

#281 Writing work: COMPLETE.
Coding/runtime implementation: separate; routed to the existing Kakashi Coding lane (#188).
Browser Golden: not claimed.
