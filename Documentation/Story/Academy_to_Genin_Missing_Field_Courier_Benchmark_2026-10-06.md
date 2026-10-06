# Shinobi Chronicles — Academy → Genin Missing Field Courier Benchmark

**Date:** 2026-10-06  
**Owner:** Writing / Story — Konoha  
**Tracker:** #450  
**Return tracker:** CE / Codex / Coordination #446  
**Status:** **PRODUCTION-QUALITY WRITING / STORY SCENARIO CONTRACT — DESIGN/CURRENT CONTENT CLOSED, NOT RUNTIME IMPLEMENTED**  
**assessmentFamilyId:** `academy_to_genin_field_readiness_assessment`  
**assessmentScenarioId:** `academy_genin_missing_courier_dispatch_v1`  
**Source-first main observed before authoring:** `1c45661d60dad8bc456e1de4483dbb4a90182f32`

---

# 1. Purpose

This document closes the first authored scenario skeleton for the CE-driven Academy → Genin Promotion benchmark.

Player-facing mission identity:

> **Locate the missing field courier, recover the sealed dispatch, and return it to the examiner.**

The assessment is a real World mission entered through Arena → Promotion. It is not a checklist simulation and it is not a disguised Battle exam.

Writing owns the authored mission skeleton, geography, mandatory anchors, meaningful decision seams, causal outcomes, failure/abort conditions, durable factual outputs and tone constraints.

CE owns Chronicle-relative realisation inside this skeleton.

Rank owns hidden requirement truth/evaluation.

World, Combat, Rewards, Progression, Knowledge and other owning systems retain their own resolver/transaction authority.

---

# 2. Binding authorities

Consume:

- `Documentation/Coordination/Academy_to_Genin_CE_World_Promotion_Assessment_Phase_2_Direction_2026-10-01.md`;
- `Documentation/Rank/Academy to Genin Variable Promotion Requirement Packages 2026-10-01.md`;
- `Documentation/Rank/Academy to Genin Promotion Package New Game Seed Amendment 2026-10-01.md`;
- `Documentation/Coordination/Universal_Participant_First_Team_Intent_Preview_and_Chronicle_Choice_Gate_2026-10-01.md`;
- `Documentation/Coordination/Story_Common_Sense_Causality_Rational_Actor_and_Hotspot_Conversation_Gate_2026-09-30.md`;
- `Documentation/Coordination/Persistent_Participant_Chronicles_Offscreen_Autonomy_and_Chronicle_Pulse_2026-10-01.md`;
- current World source binding for `whisper_woods` / `fire_whisper_woods_north_ravine`;
- current live Konoha public-host registry.

This scenario supports all six current Rank-authored Academy → Genin package IDs:

- `academy_genin_fr_pkg_information_team_v1`;
- `academy_genin_fr_pkg_information_combat_v1`;
- `academy_genin_fr_pkg_information_objective_v1`;
- `academy_genin_fr_pkg_team_combat_v1`;
- `academy_genin_fr_pkg_team_objective_v1`;
- `academy_genin_fr_pkg_combat_objective_v1`.

Support means each required readiness domain has a legitimate opportunity to produce evidence. It does **not** mean every route satisfies every domain and does **not** guarantee Promotion.

---

# 3. Mission identity / WHY NOW

## Formal mission

A Konoha field courier carrying a sealed dispatch from the Whisper Woods route misses the scheduled return/check-in window.

The dispatch has not been received.

The courier's last confirmed route passed through the northern Whisper Woods approach.

The formal Academy → Genin assessment subject and current team are assigned to:

1. travel to the field route;
2. locate the courier;
3. secure the sealed dispatch;
4. recover the courier if physically possible;
5. return the dispatch to the Promotion examiner;
6. give a factual debrief.

## Why now

The courier is overdue **now**, the sealed dispatch is operationally outstanding **now**, and waiting for another routine patrol would increase the chance of losing both the courier and the document trail.

The Promotion institution uses a genuine Academy-safe field task rather than fabricating danger solely for an exam.

The player is not told which hidden readiness package the subject carries.

---

# 4. Institution / examiner role

The examiner is a **Konoha Academy → Genin Field Readiness examiner acting under the village's Promotion authority**.

Machine-facing role ID:

`academy_genin_field_readiness_examiner_role_v1`

This is a role binding, not a newly named canon character or collectible Registry identity.

The examiner may:

- brief the known mission;
- state safety/integrity rules;
- receive the returned dispatch;
- receive the candidate/team's factual report;
- consume legitimate institutional evidence supplied by the occurrence;
- disclose observer-safe rationale after Rank resolves;
- communicate the authoritative Rank result.

The examiner may not:

- expose the hidden package ID;
- expose unrevealed readiness domains;
- narrate private teammate intent as omniscient fact;
- convert Battle victory into Promotion;
- erase an unsuccessful occurrence from history.

---

# 5. Exact geography / host chain

This benchmark deliberately uses current registered geography rather than inventing an unsupported off-map assessment arena.

## Launch / return host

`KON-P01`

Current Phase-2 authority uses this as the Hokage Administration public approach / forecourt host.

Use it for the Story briefing/return handoff unless a later UI/World implementation contract binds the examiner to another already-authorised Administration interior without changing the scenario geography.

## Village departure / re-entry host

`KON-P10`

Current World runtime uses this registered public host for gate-associated occurrences (`Gate Delivery Assistance`, `False Patrol at the Gate`, gate-ledger content).

Writing therefore binds the route through the **registered gate host `KON-P10`** without inventing a new gate location ID.

## Mission area

`whisper_woods`

## Field location

`fire_whisper_woods_north_ravine`

This is an already-addressable Whisper Woods World location.

## Travel chain

`Arena → Promotion explicit attempt commit`

→ Story briefing at `KON-P01`

→ physical village departure through `KON-P10`

→ World travel into mission area `whisper_woods`

→ field search at/around `fire_whisper_woods_north_ravine`

→ extraction back through the Whisper Woods route

→ re-entry through `KON-P10`

→ examiner return/debrief at `KON-P01`.

No assessment-panel teleport from briefing directly to the ravine is authorised.

## Existing Arc-1 location firewall

Reusing `fire_whisper_woods_north_ravine` as geography does **not** activate, clone or rewrite:

- `arc1_m1_whisper_major_contact`;
- `arc1_m1_whisper_major_contact_event`;
- `scene_arc1_m1_whisper_major_contact`;
- its Rogue Shinobi, Smuggler or Unknown Operative participants.

Promotion is a separate World occurrence lineage at the same physical geography.

Location identity != occurrence identity.

---

# 6. Scenario-local factual refs

Scenario occurrence root:

`occ_academy_genin_missing_courier_dispatch_v1::<assessmentAttemptId>`

Occurrence-local courier ref:

`academy_genin_missing_courier_dispatch_courier_01`

Occurrence-local sealed dispatch ref:

`academy_genin_missing_courier_dispatch_packet_01`

Optional hostile-role occurrence ref, only when that pressure seam is factually triggered:

`academy_genin_missing_courier_dispatch_rogue_01`

The hostile ref is an occurrence-local Story/World address. Combat owns the actual opposition package/stats and may not infer them from the prose label.

Retry creates a new assessment occurrence/attempt. It does not pretend the previous completed occurrence never happened.

---

# 7. Hidden World truth for the benchmark occurrence

At the start of one committed occurrence:

- the courier is alive;
- the courier still possesses the sealed dispatch;
- the seal is intact;
- the courier was forced off the main route after being pressured by a hostile rogue shinobi seeking the courier's satchel;
- while escaping, the courier slipped down the north-ravine approach and injured a leg badly enough to prevent normal travel;
- the courier reached partial shelter and cannot make the scheduled check-in unaided;
- the rogue lost immediate sight of the courier but is still searching the area;
- the rogue does not automatically know the contents of the sealed dispatch;
- the courier can identify the rogue as the same attacker if the rogue later becomes visible;
- the exact current team does not know these facts at briefing.

No hidden morality truth is attached to the rogue.

No kill/release branch is required by this scenario skeleton.

---

# 8. Knowledge at briefing

The subject/current team may legitimately know:

- a field courier is overdue;
- the courier carried a sealed dispatch;
- the dispatch has not arrived;
- the courier's last confirmed route used the northern Whisper Woods approach;
- the mission objective and return authority;
- the dispatch must be returned sealed unless an owning authority later establishes a genuine emergency exception;
- ordinary field safety rules.

They do **not** know:

- the courier's exact ravine position;
- that a hostile shinobi is involved;
- whether the courier is injured;
- whether the dispatch has been stolen/opened;
- which hidden readiness package the subject has;
- which actions Rank will count;
- any hidden score/probability.

---

# 9. Briefing anchor — player-facing intent

The examiner's briefing should be concise and operational, not a tutorial about Rank mechanics.

Required content:

> A field courier missed the return window from the northern Whisper Woods route.
>
> Find the courier. Secure the sealed dispatch. Bring the dispatch back here.
>
> If the situation changes, use your judgement and report what actually happened.

The examiner may identify the current team and assessment subject naturally.

Do not say:

- “this tests information use”;
- “earn teamwork points”;
- “you need combat readiness”;
- “two hidden requirements remain”;
- package IDs or internal counters.

---

# 10. Travel anchor

The route must visibly leave Konoha.

Minimum presentation:

1. team exits Administration area after briefing;
2. travel reaches `KON-P10`;
3. team crosses the registered gate boundary;
4. World travel advances to `whisper_woods`;
5. team reaches the northern approach / `fire_whisper_woods_north_ravine` search area.

Current teammates remain physically present unless a legitimate occurrence changes that fact.

Travel is factual mission participation. It is not a free readiness-domain success by itself.

---

# 11. Decision Boundary 1 — initial search / investigation

At the last confirmed northern-route point, the team finds two pieces of observer-safe evidence:

- the ordinary courier route continues toward the scheduled northern waypoint;
- fresh disturbed ground / snapped brush leaves the route toward the ravine approach.

Neither clue alone proves where the courier is.

## Participant-first seam

Before protagonist choice, each due current teammate may form an intent from Character × Context × Knowledge × Memory × Relationship × current state.

Eligible semantic teammate intent classes include:

- `inspect_fresh_route_sign`;
- `check_scheduled_waypoint`;
- `watch_for_hostile_presence`;
- `hold_no_strong_stance`.

Preview only what the protagonist can perceive.

Examples of legitimate preview shape:

- teammate crouches to inspect the disturbed ground;
- teammate keeps attention on the scheduled route/waypoint;
- teammate scans tree-line/approach;
- no preview when no strong intent exists.

Do not force generic dialogue onto every teammate.

Teammate preview != guaranteed result.

## Exact protagonist choices

### `agen_m01_search_follow_fresh_sign_v1`

Player-facing label:

**Follow the fresh trail.**

Meaning:

The protagonist treats the fresh deviation as the strongest current lead and moves toward the ravine approach.

### `agen_m01_search_check_waypoint_v1`

Player-facing label:

**Check the north waypoint first.**

Meaning:

The protagonist verifies the courier never reached the scheduled waypoint before committing to the off-route trail.

No third filler choice is required.

---

# 12. Search Branch A — follow the fresh trail

## Factual resolution

The team reaches the ravine approach sooner.

They find:

- a torn section of courier outer cloth caught on brush;
- a slide mark down the slope;
- the injured courier in partial shelter;
- sealed satchel/dispatch still in courier possession.

Courier condition:

`injured_stable_but_requires_assistance`

Elapsed-pressure state:

`courier_found_early_v1`

The hostile rogue is still approaching/searching but has not yet reached the courier's immediate position.

## Changed next situation

Search uncertainty ends.

The mission becomes:

> injured courier + sealed dispatch + approaching unresolved threat.

This route creates a cleaner preparation window but does not automatically satisfy any hidden requirement.

---

# 13. Search Branch B — check the north waypoint first

## Factual resolution

The team reaches the scheduled waypoint.

The courier is not there.

Observer-safe evidence at the waypoint shows the courier never completed the expected arrival:

- no current courier check mark / handoff trace;
- a scuffed return-side trail points back toward the disturbed-ground area;
- the team must reverse course.

The team then follows the off-route evidence to the ravine.

They find the same courier and sealed dispatch, but later.

Courier condition:

`injured_worsened_by_delay_but_extractable`

Elapsed-pressure state:

`courier_found_delayed_v1`

The hostile rogue has reached the outer edge of the ravine approach and is closer to the team/courier.

## Changed next situation

The route assumption was imperfect but produced real Knowledge.

The mission remains viable.

The player is not punished with a dead-end simply for making a reasonable but slower verification choice.

A factual failed assumption may later be reported honestly, but **route imperfection != dishonesty** and **mission setback != automatic Promotion failure**.

---

# 14. Courier discovery / testimony anchor

If conscious enough to speak, the courier may provide only observer-safe immediate facts:

- someone came after the satchel;
- the courier left the route to get away;
- the courier fell/slid and injured the leg;
- the dispatch is still sealed;
- if the rogue appears, the courier can identify them as the same pursuer.

Do not turn the courier into an exposition device for hidden Promotion mechanics.

Courier testimony is testimony until corroborated.

---

# 15. Decision Boundary 2 — immediate priority under pressure

The team has found the courier.

Before the protagonist chooses, due teammates act/react first.

Eligible teammate semantic intents include:

- `stabilize_courier`;
- `secure_dispatch`;
- `watch_approach`;
- `prepare_extraction`;
- `hold_no_strong_stance`.

A teammate may begin one legitimate immediate action where due.

The protagonist cannot command the exact teammate action.

## Exact protagonist choices

### `agen_m01_priority_secure_dispatch_v1`

**Secure the dispatch first.**

The protagonist moves to establish controlled custody of the sealed objective before extraction.

### `agen_m01_priority_stabilize_courier_v1`

**Stabilize the courier first.**

The protagonist prioritises the courier's immediate physical condition before transferring the dispatch.

### `agen_m01_priority_cover_approach_v1`

**Cover the approach.**

The protagonist prioritises threat detection/positioning while teammates/courier state continues according to their already-committed actions.

These are not morality choices.

Each changes factual position/custody/readiness before the next pressure arrives.

---

# 16. Priority consequences

## Secure dispatch first

If legally possible from current participant state:

- dispatch custody transfers from courier into controlled team/subject custody;
- seal condition is observed, not opened;
- courier remains not-yet-stabilised unless a teammate independently committed that action;
- later Battle loss by the protagonist does **not automatically** transfer the dispatch if it is factually outside that Battle actor's custody.

## Stabilize courier first

If successful under the owning field/medical resolver:

- courier condition improves one authored step;
- extraction becomes easier/safer;
- dispatch remains with courier unless a teammate independently secures it;
- objective remains more exposed when the hostile pressure arrives.

## Cover approach

- protagonist takes a position oriented toward the route/treeline;
- approaching hostile presence is detected earlier;
- no dispatch custody or courier stabilization is fabricated from this choice;
- Combat/evasion options may be broader because the team is not surprised.

---

# 17. Escalation — hostile pursuer arrives

The hostile rogue appears because they were already searching for the courier after losing sight of them.

This is not a random “exam enemy spawn”.

Courier recognition supplies the safe inference that this is the same person who pursued the satchel.

The rogue wants the satchel/dispatch and a route out.

The current team wants to extract the courier and preserve the dispatch.

The rogue's exact capability/opposition package belongs to Combat/World implementation authority.

No hidden faction/canon identity is invented here.

---

# 18. Decision Boundary 3 — contact response

This boundary is only presented when current positions/actions leave more than one legitimate response.

Again, due teammates resolve intent first.

Eligible teammate intent classes include:

- `protect_dispatch`;
- `extract_courier`;
- `support_contact`;
- `cover_retreat`;
- `watch_no_action`.

## Exact protagonist choices

### `agen_m01_contact_hold_line_v1`

**Hold the line.**

Meaning:

The protagonist commits to stopping the hostile advance. If current factual state requires direct combat, call the owning Battle resolver.

### `agen_m01_contact_extract_under_cover_v1`

**Get the courier moving.**

Meaning:

The protagonist prioritises extraction while participant actions determine who covers, carries, guards or disengages where legally possible.

This can call a pursuit/evasion/field resolver rather than Battle.

### `agen_m01_contact_use_ravine_route_v1`

**Break contact through the ravine path.**

Meaning:

The protagonist uses current geography to deny a clean approach and move the objective away from contact.

This calls a field/traversal resolver. It is not guaranteed success and does not imply the protagonist knows the safest route automatically.

---

# 19. Battle seam

Battle is optional.

A Battle is authorised only when current participant positions and selected intents make direct combat factual.

Battle caller must consume exact current participants.

Battle does not automatically include every present teammate.

A teammate already extracting the courier/protecting the dispatch may remain a Story participant outside the Battle caller when current state supports that separation.

## Battle victory

Victory may:

- stop/impose control on the rogue;
- preserve current dispatch custody;
- reopen clean extraction.

Victory != Promotion.

## Battle defeat / withdrawal

Defeat or withdrawal does **not automatically end the assessment**.

After Battle, Story consumes exact factual return state:

- who is still present;
- courier condition/location;
- dispatch holder/seal state;
- whether a teammate already moved the objective;
- rogue state;
- protagonist/team injuries/capability;
- whether extraction remains possible.

### Required viable post-loss family

If a teammate or courier/other authorised participant had already moved/secured the dispatch outside the protagonist's Battle custody, protagonist Battle defeat does not magically teleport the dispatch to the rogue.

The team may still extract, recover the protagonist, and complete the mission if factual state permits.

### Required failure family

If the owning Battle/World resolver commits that the rogue obtains the dispatch and escapes beyond current legal pursuit, the formal mission objective fails.

The occurrence still retains:

- Battle history;
- discovered location/evidence;
- courier outcome;
- teammate actions;
- Knowledge;
- legitimate Development/evidence;
- factual failure.

Failure != erased Chronicle.

---

# 20. Non-Battle extraction seam

`agen_m01_contact_extract_under_cover_v1` and `agen_m01_contact_use_ravine_route_v1` may avoid Battle when participant actions/current geography make that plausible.

The owning field resolver may return:

- `clean_extraction`;
- `pressured_extraction`;
- `contact_reengaged`;
- `courier_cannot_continue`;
- `dispatch_lost`;
- another already-authorised factual result.

Writing does not guarantee a non-Battle success merely because the player selected an avoidance intent.

If contact re-engages, Battle may become factual later.

---

# 21. Objective resolution states

## Full mission success

Minimum factual state:

- courier located;
- dispatch secured;
- dispatch seal remains intact;
- dispatch returned to examiner at `KON-P01`;
- courier recovered/extracted alive or transferred to legitimate Konoha assistance under current World/medical authority;
- factual debrief completed;
- no safety/integrity abort.

Set scenario mission objective state:

`missionObjectiveCompleted = true`

Rank still decides Promotion.

## Viable imperfect success

A mission may still complete when:

- search took the slower waypoint-first route;
- courier condition worsened before recovery;
- protagonist lost/withdrew from Battle but the dispatch remained factually secured;
- team returned with injuries/setbacks;
- some hostile participant escaped;
- candidate openly reports a mistaken route assumption or Battle setback.

Do not convert “imperfect” into “failed” if the formal objective was actually completed.

## Objective failure

Examples:

- dispatch is lost beyond current legal recovery;
- courier is never located before the authored occurrence closes;
- team returns without the dispatch after recovery is no longer actionable;
- subject withdraws and the objective remains unresolved at terminal closure.

Set:

`missionObjectiveCompleted = false`

Promotion cannot PASS if Rank requires the formal objective, but all factual history persists.

---

# 22. Honest report / debrief

The debrief is not a morality quiz.

The subject reports what they know happened:

- chosen search route;
- evidence followed;
- courier condition when found;
- dispatch custody/seal state;
- hostile contact;
- Battle result if any;
- teammate actions the subject legitimately observed;
- objective outcome;
- important uncertainty.

A mistaken route choice reported accurately remains an honest factual report.

Do not invent a universal `Honest Failure` Rank primitive. Current binding Rank authority evaluates the six readiness domains and mission objective from committed evidence.

If later Rank/CE authority introduces a separately named failure-evidence primitive, it must consume exact facts from this occurrence rather than infer honesty from failure alone.

---

# 23. Supported package / evidence-opportunity matrix

The scenario supports all six current package IDs because every required domain has at least one legitimate evidence opportunity.

| Rank domain | Legitimate authored opportunities in this scenario | Important non-guarantee |
|---|---|---|
| `mission_comprehension` | understand/retain briefing objective; distinguish courier recovery from dispatch custody; return sealed dispatch; factual debrief | accepting mission or reaching woods alone does not guarantee evidence |
| `judgement_under_pressure` | courier-vs-dispatch-vs-approach priority; contact response; post-Battle continuation/withdrawal; deciding when mission is no longer recoverable | Battle victory alone does not guarantee judgement evidence |
| `information_use` | read fresh trail vs scheduled route evidence; use waypoint absence; consume courier testimony; adapt to new evidence | clicking “follow trail” alone does not guarantee evidence |
| `team_coordination` | observe teammate-first intents; adapt protagonist plan around autonomous teammate action; combine extraction/protection/contact roles without commanding exact behavior | teammate presence alone does not guarantee evidence |
| `combat_readiness` | hostile-contact preparation; `hold_line` Battle seam; Battle conduct/withdrawal; protecting mission state during combat | Battle victory is not required and is not sufficient by itself |
| `objective_protection` | secure dispatch; preserve seal; maintain factual custody through contact/Battle/extraction; return the same sealed object | simply possessing the dispatch once does not guarantee evidence |

## Package coverage

- `academy_genin_fr_pkg_information_team_v1` — supported;
- `academy_genin_fr_pkg_information_combat_v1` — supported;
- `academy_genin_fr_pkg_information_objective_v1` — supported;
- `academy_genin_fr_pkg_team_combat_v1` — supported;
- `academy_genin_fr_pkg_team_objective_v1` — supported;
- `academy_genin_fr_pkg_combat_objective_v1` — supported.

Evidence opportunity != evidence satisfaction.

Writing does not define evidence weights/counts.

Rank decides whether committed occurrence facts satisfy each domain.

---

# 24. Machine-facing factual receipts available to Rank/CE

These are scenario-local factual receipts/anchors, not hidden Rank-success booleans.

Common attempt:

- `agen_m01_attempt_committed_v1`;
- `agen_m01_briefing_received_v1`;
- `agen_m01_departed_konoha_v1`;
- `agen_m01_entered_whisper_woods_v1`;
- `agen_m01_north_ravine_search_started_v1`.

Search:

- `agen_m01_search_follow_fresh_sign_v1`;
- `agen_m01_search_check_waypoint_v1`;
- `agen_m01_waypoint_no_arrival_confirmed_v1` where factual;
- `agen_m01_courier_found_early_v1` or `agen_m01_courier_found_delayed_v1`.

Participant-first:

- exact teammate intent receipts by stable participant ID + decision boundary;
- exact protagonist intent receipt;
- exact visible teammate action/result where committed.

Courier/objective:

- `agen_m01_courier_located_v1`;
- exact courier condition state;
- exact dispatch holder/custody transitions;
- exact dispatch seal state;
- `agen_m01_dispatch_secured_v1` where factual;
- `agen_m01_dispatch_returned_to_examiner_v1` where factual.

Pressure/contact:

- `agen_m01_rogue_contact_confirmed_v1` where factual;
- exact contact intent;
- Battle occurrence IDs/results when Battle occurs;
- exact post-Battle participant/objective state;
- exact non-Battle extraction resolver result when used.

Closure:

- `agen_m01_returned_konoha_v1` where factual;
- `agen_m01_debrief_committed_v1`;
- `agen_m01_objective_completed_v1` or `agen_m01_objective_failed_v1`;
- safety/integrity state;
- reward transaction refs from owning Rewards authority;
- Rank result/evidence refs from owning Rank authority.

Receipt existence does not itself mean Rank domain satisfied.

---

# 25. Safety / integrity abort conditions

## Integrity abort

The assessment may enter an authored integrity-abort state if the subject deliberately:

- opens/breaks the sealed dispatch without a separately authorised emergency basis;
- alters/falsifies the dispatch or seal;
- knowingly substitutes a different object while presenting it as the assigned dispatch;
- falsifies the formal debrief after factual contradiction is established by legitimate institutional evidence.

## Safety abort

The assessment may enter an authored safety-abort state if the subject deliberately attacks the courier, examiner or current teammate outside a separately authorised hostile/confusion/resolver state.

Ordinary tactical mistakes, Battle defeat, injury, retreat or choosing the slower route are **not** integrity/safety disqualifications by themselves.

Owning Combat/World authority resolves whether a disputed action actually occurred and was legal before Rank consumes an abort fact.

---

# 26. Rewards boundary

This is a real formal mission and may award normal legitimate mission rewards through World / Missions / Events / Rewards authority.

Possible visible categories remain owner-controlled, for example:

- Ryō;
- items/materials;
- Development/EXP where authorised;
- other exact mission entitlements.

Writing does not set reward amounts in this contract.

Promotion selection/evaluation must never optimise for:

- higher Ryō;
- rarer items;
- more Development;
- a “best rewards” route.

Reward result != Rank result.

The Promotion Chronicle Receipt must project exact committed visible rewards when they exist.

---

# 27. Changed World / Chronicle state

A completed occurrence may leave durable history including:

- a courier was actually lost/recovered or lost beyond rescue in that occurrence;
- the subject/current team travelled through the field route;
- current participants made autonomous decisions;
- a hostile contact occurred or was avoided;
- the sealed dispatch was protected, lost or returned;
- Battle happened or did not;
- participant injuries/custody/escape facts where owned systems commit them;
- subject/team shared history;
- assessment result;
- requirement disclosure if Rank legitimately reveals it;
- rewards/development actually earned;
- future route/contact/location Knowledge actually discovered.

No morality score is created.

No teammate's private Chronicle becomes protagonist Knowledge merely because they shared the occurrence.

---

# 28. Promotion Chronicle Receipt — available projection facts

Every terminal attempt produces one read-only Promotion Chronicle Receipt from committed facts.

Where non-empty and observer-safe, project:

## YOUR DECISIONS

- search choice;
- immediate-priority choice;
- contact response;
- withdrawal/continuation choice where applicable.

## TEAM / PARTICIPANT ACTIONS

- teammate actions the protagonist actually observed/learned;
- courier actions relevant to outcome;
- hostile action only to observer-safe extent.

## WHAT HAPPENED

- route taken;
- courier found/not found;
- courier condition;
- dispatch seal/custody/final state;
- Battle/evasion factual result;
- return/debrief outcome.

## PROMOTION RESULT

Authoritative Rank result only.

Do not reconstruct it from mission success.

## HISTORY CREATED

Exact occurrence/shared-history facts.

## DEVELOPMENT / EVIDENCE

Only player-visible Development/evidence and legitimately revealed requirement rationale.

Hidden satisfied/unsatisfied domains remain hidden until authorised reveal.

## REWARDS

Exact committed visible reward facts from owning systems.

## NEWLY ACTIONABLE

Where authorised:

- Genin roster transition after Promotion success;
- retry;
- another compatible authorised assessment;
- return to Konoha/continue free play;
- newly known opportunity/location/contact actually created by this occurrence.

Opening/reopening Receipt cannot recommit anything.

---

# 29. Retry / alternate assessment / no-reroll

The following never reroll the subject's fixed Academy → Genin package:

- retry;
- mission failure;
- Battle loss;
- withdrawal;
- choosing another compatible assessment;
- team changes;
- requirement discovery;
- requirement satisfaction;
- UI reopen;
- save/load;
- browser refresh.

Retry of this scenario creates:

- a new `assessmentAttemptId`;
- a new World occurrence lineage;
- a new scenario-local courier/dispatch occurrence instance;

while preserving:

- `assessmentScenarioId = academy_genin_missing_courier_dispatch_v1`;
- stable Character identity;
- Rank transition identity;
- immutable Chronicle-root-derived package truth;
- previous attempt history.

Do not literally rewind/delete the prior courier occurrence from Chronicle history.

Alternate assessment may be offered only when it supports the already-fixed package.

---

# 30. Causal preflight — major branches

## A. Follow fresh trail

**Trigger:** fresh deviation evidence exists at last-confirmed route point.  
**Direct observers:** subject + current physically present teammates.  
**Safe inference:** someone left the ordinary route recently; not yet proof it was the courier.  
**Current wants:** team wants courier/dispatch; autonomous teammates may favour trail, waypoint or security.  
**Why now:** courier is overdue and evidence is physically present.  
**Change:** courier is found earlier; courier condition is better; threat is farther away.  
**Battle implication:** none automatically; later contact remains possible.

## B. Check waypoint first

**Trigger:** scheduled waypoint remains a legitimate unverified route endpoint.  
**Direct observers:** subject + current team.  
**Safe inference:** courier may have continued normally; only checking can confirm.  
**Current wants:** verify route before abandoning procedure.  
**Why now:** team is at the fork in evidence.  
**Change:** waypoint absence becomes Knowledge; team backtracks; courier condition worsens and hostile pressure is closer.  
**Battle implication:** later contact is more compressed but Battle is still not automatically forced.

## C. Secure dispatch first

**Trigger:** courier/dispatch located under approaching pressure.  
**Direct observers:** current scene participants.  
**Safe inference:** sealed object is still intact and vulnerable while courier is immobile.  
**Current wants:** preserve formal objective; courier also needs help.  
**Why now:** first moment of physical access to objective.  
**Change:** custody moves if resolver permits; courier stabilization may be delayed unless teammate already acts.  
**Battle implication:** dispatch may remain outside protagonist Battle custody later.

## D. Stabilize courier first

**Trigger:** courier injury is immediately visible.  
**Direct observers:** current team/courier.  
**Safe inference:** courier may not survive/complete extraction safely without assistance; exact medical severity depends on resolver.  
**Current wants:** make courier extractable while objective remains present.  
**Why now:** team has just reached injured courier.  
**Change:** courier state may improve; dispatch remains exposed unless another participant secures it.  
**Battle implication:** later contact places more pressure on objective custody.

## E. Hold line / Battle

**Trigger:** hostile pursuer enters actionable contact and courier identifies them.  
**Direct observers:** physically present team/courier/rogue.  
**Safe inference:** same hostile pursued the courier's satchel; intent remains current because they continue closing/trying to seize it.  
**Current wants:** rogue wants satchel/escape; team wants extraction/objective safety.  
**Why now:** pursuer has finally reacquired the courier.  
**Change:** owning Battle resolves control/position/injury without deciding Rank.  
**Battle return:** exact dispatch/courier state survives Battle; loss does not automatically transfer off-Battle objective custody.

## F. Extract / break contact

**Trigger:** current geometry/teammate actions leave a viable movement option.  
**Direct observers:** current team/courier/rogue as present.  
**Safe inference:** contact can potentially be denied without winning a fight.  
**Current wants:** preserve courier/dispatch and leave the hostile's effective reach.  
**Why now:** threat is active but route space still exists.  
**Change:** field resolver returns clean/pressured/re-engaged/failure state.  
**Battle implication:** Battle occurs only if contact becomes factual again.

## G. Battle loss but mission continues

**Trigger:** protagonist loses/withdraws from a factual Battle.  
**Direct observers:** Battle/current Story participants.  
**Safe inference:** protagonist lost the fight; nothing more may be inferred about dispatch holder unless resolver says so.  
**Current wants:** surviving team participants still want extraction/objective recovery.  
**Why now:** Battle has returned committed state to Story.  
**Change:** if dispatch/courier remain secured elsewhere, mission may continue imperfectly; if objective was lost, failure path begins.  
**Battle implication:** no second invented punishment; consume exact return state.

## H. Objective failure / return

**Trigger:** dispatch lost beyond legal recovery or occurrence otherwise reaches terminal mission failure.  
**Direct observers:** exact participants who know the facts.  
**Safe inference:** formal objective was not completed.  
**Current wants:** survive/return/report truthfully; institution needs factual result.  
**Why now:** no legitimate current action remains that can satisfy the mission objective.  
**Change:** failed occurrence becomes durable Chronicle history; Rank resolves unsuccessful Promotion result from evidence/objective truth.  
**Battle implication:** prior Battle facts remain; failure does not erase them.

**CAUSAL PREFLIGHT: GREEN.**

---

# 31. Voice / tone constraints

The Promotion mission should feel like the first time Academy characters are trusted with a real field responsibility, not like children completing a multiple-choice worksheet.

Preserve:

- examiner: concise, institutional, observant, not theatrical;
- current teammates: exact Character voices/history, no generic “teamwork dialogue”;
- courier: field-professional under injury/stress, not a tutorial narrator;
- hostile rogue: goal-directed, not a morality puppet or exposition source;
- protagonist: player-owned intent;
- CE: derives current situation/participant action from committed history, not unrestricted plot invention.

Do not make every teammate praise or criticise the player's choice.

Disagreement can remain unresolved.

Stillness/no-line can be the correct participant response.

---

# 32. Acceptance checklist

The scenario is Writing-complete when implementation can truthfully prove:

- exact scenario ID is stable;
- explicit assessment subject/attempt commit occurs before mission;
- briefing is a Story scene, not only panel text;
- team physically travels `KON-P01 → KON-P10 → whisper_woods → fire_whisper_woods_north_ravine` and back;
- no unsupported teleport substitutes for field travel;
- at least one participant-first intent boundary occurs before protagonist choice;
- at least two meaningful protagonist decisions occur;
- route choice changes courier timing/condition/pressure;
- second pressure tests judgement under current factual state;
- Battle is optional and Battle victory != Promotion;
- at least one factual Battle loss/withdrawal family can continue when objective state permits;
- at least one objective-failure family preserves Chronicle value;
- all six package IDs have legitimate evidence opportunities;
- hidden Rank truth remains hidden until authorised reveal;
- exact dispatch object/seal/custody is tracked;
- return/debrief occurs;
- Rank owns final result;
- Promotion Chronicle Receipt projects all visible committed facts/rewards;
- success enters existing Genin roster transition;
- unsuccessful attempt exposes only authorised retry/alternate/return actions;
- save/load/UI reopen does not reroll scenario/package/participant intents/result.

Target player experience:

> **I received a real mission, travelled into the field with my actual team, made decisions, dealt with risk, brought back what I could, and only afterward learned how Konoha judged whether I was ready to become Genin.**

---

# Final lock

> **Academy → Genin Mission 1 is a real courier-recovery operation in existing Konoha/Whisper Woods geography. The player is not selecting readiness-domain answers. They are solving a field problem with autonomous teammates while Rank quietly evaluates the exact facts that occurred. Search decisions change time and pressure; courier/dispatch priorities change custody and risk; combat is possible but not mandatory; Battle loss is not automatically mission failure; mission failure remains history; and the hidden New-Game-seeded Promotion package never rerolls.**
