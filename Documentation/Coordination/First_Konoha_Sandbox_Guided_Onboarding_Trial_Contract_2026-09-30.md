# Shinobi Chronicles — First Konoha Sandbox Guided Onboarding Trial Contract

**Date:** 2026-09-30  
**Owner:** Stephen / CE / Codex / Coordination  
**Status:** **OWNER-APPROVED TRIAL LOCK — IMPLEMENT FOR STEPHEN BROWSER ASSESSMENT / NOT GOLDEN YET**  
**Successor to:** `Documentation/World/First Konoha Post-Team Tutorial Continuation Contract 2026-09-15.md` where this document explicitly changes presentation/free-play gating  
**Primary purpose:** Make the transition from Academy Team Formation into the real game clear without replacing Konoha with a forced modal tutorial.

## 1. Owner problem

Current browser flow reaches:

`YOUR CHRONICLE BEGINS -> choose exactly two Academy teammates -> TEAM FORMED -> Konoha map`

and then leaves the player on the Konoha map with no useful direction.

Stephen wants an explicit first explanation that the game has now entered its sandbox/free-play phase and that the Arena / Promotion route is the forward Chronicle path.

The tutorial must teach by **using real game surfaces**, not by forcing a long sequence of disconnected text boxes.

## 2. Core presentation law

Use:

> **one opening Sandbox popup + contextual first-use guidance**

Do NOT use:

> **mandatory modal slideshow -> mandatory modal slideshow -> mandatory modal slideshow**

The Konoha map remains the real game surface.

## 3. Free-play boundary — trial correction to #209

For this trial implementation, once:

- Origin completion is valid;
- Academy Team Formation is committed with exactly two legitimate teammates;
- the resulting three-person Academy squad is committed;

the player enters ordinary Konoha sandbox/free play.

Therefore the old #209 rule:

`academy_free_play requires tutorial completion receipt`

is **superseded for this trial**.

The tutorial receipt remains useful for tracking which onboarding guidance has been seen/completed, but it is no longer permission to play Konoha.

Preserve:

`tutorial guidance != World permission authority`

and:

`closing a tutorial popup != Promotion`.

## 4. Opening popup — exact trial copy

Trigger once on the first Konoha-map entry after committed Academy Team Formation.

### Title

**KONOHA IS OPEN**

### Body

**Your Academy team is formed. You are now in Sandbox mode. Explore Konoha at your own pace, or head to the Arena when you are ready to attempt the Genin Promotion Assessment and continue your Chronicle.**

**The first time you visit important areas, a short guide will explain what you can do there.**

### Primary actions

- **SHOW ME AROUND**
- **EXPLORE KONOHA**

Both actions enter the same legitimate free-play state.

Difference:

- **SHOW ME AROUND** enables/highlights the recommended onboarding route and contextual coachmarks.
- **EXPLORE KONOHA** dismisses the recommended-route emphasis but does not disable first-use contextual guidance unless the player later disables tutorial tips.

No choice here starts Promotion.

## 5. Recommended route

When **SHOW ME AROUND** is selected, the map should recommend — not force — these surfaces:

1. General Training Ground / Practical;
2. Shinobi Academy / Exams;
3. Arena.

Fūinjutsu Workshop, Hospital, Hokage Administration, Forge and other village locations remain discoverable/usable according to their normal authority but are not required stops in this first guided route.

Reason:

The first tutorial should explain the minimum gameplay loop, not every Konoha service.

## 6. Contextual guidance — Training Ground

Trigger only the first time the player legitimately opens/enters the General Training Ground while tutorial tips are enabled.

### Trial explanation

**TRAINING GROUND**

**Use Training and Practical activities to develop your ninja and your current team. Different activities test and improve different capabilities. Your progress should persist as your Chronicle develops.**

If persistent-development/current-team runtime is not yet implemented when this tutorial patch first lands, the implementation must not falsely claim completed functionality.

Coding may temporarily use:

**Training and Practical activities are where your ninja and current team will develop.**

until the actual persistent-development loop is activated.

The tutorial itself grants no Stats, PL or development.

## 7. Contextual guidance — Exams

Trigger only on first legitimate Exams entry.

### Trial explanation

**SHINOBI EXAMS**

**Exams test specific shinobi disciplines and capabilities when you are eligible to take them. They are separate from formal Rank Promotion.**

Opening Exams does not:
- grant eligibility;
- grant development;
- promote the player;
- create an exam result.

## 8. Contextual guidance — Practical

If Practical is entered through the Training Ground, its first-use explanation should appear there rather than requiring a second Konoha-map stop.

### Trial explanation

**PRACTICAL TRAINING**

**Practical activities put your current ninja and team into hands-on training situations. Results can contribute to real development when the activity supports it.**

Do not claim persistent development before runtime genuinely supports it.

## 9. Arena tutorial

Trigger first time the player opens the Konoha Arena.

The Arena tutorial should explain its four major Alpha-facing lanes as four compact coachmarks/cards rather than a prose wall.

### PROMOTION

**Take formal Promotion assessments when they are available. Academy -> Genin is available after the opening journey and does not require a mandatory Academy grind.**

### ARENA BATTLE

**Fight other shinobi through the ordinary Arena battle lane. Arena participation is separate from Story and World activity.**

### STAGED BATTLES

**Take on authored challenge battles with their own rules and participation limits.**

### VILLAGE TOURNAMENT

**Enter formal tournament competition when the current tournament rules make you eligible.**

Do not fabricate open Tournament/Staged content when their exact runtime is unavailable; inactive lanes should clearly say **COMING / NOT CURRENTLY AVAILABLE** rather than pretending.

## 10. Arena completion popup — exact trial copy

After the Arena explanation has been shown once:

### Title

**YOUR NEXT STEP**

### Body

**You have seen the main routes available to your Academy team. You can take the Genin Promotion Assessment now, or keep exploring Konoha and develop your Chronicle first.**

### Actions

- **TAKE PROMOTION ASSESSMENT**
- **KEEP EXPLORING**

`TAKE PROMOTION ASSESSMENT` routes only to the already-authorised Promotion surface.

`KEEP EXPLORING` returns to normal Konoha free play.

Neither option fabricates Promotion success.

## 11. Non-forced tutorial rule

The player may:

- ignore the recommended highlights;
- visit another public Konoha location first;
- open Shinobi Record;
- enter World Map where legitimately available;
- return to the tutorial route later;
- take Promotion once legitimately available;
- continue Academy free play indefinitely.

The tutorial is guidance, not a leash.

## 12. First-use guidance persistence

Tutorial state should remember independently:

- sandbox popup seen;
- recommended route enabled/disabled;
- Training guide seen;
- Exams guide seen;
- Practical guide seen;
- Arena guide seen;
- Arena completion choice seen;
- tutorial tips globally enabled/disabled.

UI reopen/save-load/browser refresh must not reroll or repeatedly spam already-seen tips.

New Chronicle may receive a new tutorial state.

A future user setting may allow replay/reset of tutorial tips without mutating World/Chronicle facts.

## 13. Shinobi Record guidance

The Shinobi Record already exists and should become part of contextual onboarding rather than receiving another mandatory stop.

On first legitimate open after Team Formation, a compact tip may say:

**SHINOBI RECORD**

**Your Shinobi Record tracks your current journey, missions, intelligence, Chronicle history and development. Use it when you are unsure what has changed or where your Chronicle is heading.**

This is presentation only.

Record display never creates the underlying facts.

## 14. Map/HUD implication

The Konoha map, Land of Fire regional map and World Map should eventually consume one **coded live HUD/navigation shell**.

Do not bake current Ryō, Rank, team, objective, Energy or Record state into map artwork.

The HUD is runtime presentation over authoritative state.

Candidate minimal persistent controls:

- current Origin/active-ninja portrait;
- formal Rank;
- Ryō;
- current objective / Journey shortcut;
- Shinobi Record shortcut;
- map-level navigation/back control;
- Energy later when Energy runtime activates.

Exact visual layout remains UI / Assets work.

This tutorial implementation may add only the minimum coded controls required for clear navigation; it need not wait for the full Ninja ID redesign.

## 15. Existing first-team orientation relationship

The old occurrence IDs may remain for compatibility:

- `konoha_onboarding_first_team_orientation_v1`
- `konoha_onboarding_first_team_orientation_completed_v1`

but they must no longer be interpreted as a hard permission gate to Konoha free play under this trial.

Coding may migrate them into tutorial-progress/history receipts.

Do not duplicate the opening journey state machine merely to change the presentation.

## 16. Acceptance for Stephen's trial

Before asking Stephen to judge the design in-browser:

1. Team Formation enters Konoha with the opening popup exactly once.
2. Player is genuinely free to explore after dismissing it.
3. SHOW ME AROUND visibly recommends the agreed route without blocking other locations.
4. Training/Practical guidance appears only on legitimate first use.
5. Exams guidance appears only on legitimate first use.
6. Arena explains the four lanes compactly.
7. Arena ends with Promotion vs Explore choice.
8. Promotion button uses the existing Promotion route.
9. Keep Exploring returns to normal Konoha.
10. Save/load does not repeat every tip.
11. No tutorial action creates Stats/PL/Rank/rewards/world events.
12. Shinobi Record first-use tip works when the Record is opened.
13. old #209 hard free-play gate no longer traps the player.
14. current team remains the exact committed Academy squad.
15. no hidden Konoha location/Knowledge leaks through tutorial highlighting.

## 17. Trial status law

`design trial locked != Stephen browser accepted != Golden`

After implementation Stephen may:
- approve;
- adjust copy;
- reorder stops;
- remove a stop;
- add a stop;
- change HUD behavior;
- reject the whole approach.

Only owner browser acceptance promotes this from TRIAL to binding Golden onboarding presentation.

## 18. Final trial lock

> **After Academy Team Formation, Konoha becomes genuine Sandbox/free play. One opening popup explains that boundary and points the player toward the Arena/Promotion path. The tutorial then teaches the game through contextual first-use coachmarks on real Training, Practical, Exams, Arena and Shinobi Record surfaces. It recommends rather than forces. The Arena explanation ends with a clear choice: attempt Genin Promotion now or keep exploring Konoha.**
