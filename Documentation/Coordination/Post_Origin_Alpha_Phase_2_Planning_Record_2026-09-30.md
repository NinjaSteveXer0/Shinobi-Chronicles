# Shinobi Chronicles — Post-Origin Alpha Phase 2 Planning Record

**Date:** 2026-09-30  
**Owner:** Stephen / CE / Codex / Coordination  
**Status:** **DISCUSSION / CANDIDATE PLANNING — NOT BINDING IMPLEMENTATION AUTHORITY**  
**Primary priority remains:** Finish all 10 Academy Origins GOLDEN before activating this plan.

## Purpose

Preserve Stephen's current post-Origin Alpha planning direction while the final Origin/Battle-System polish is still active.

This record deliberately separates:

- ideas worth preserving;
- current durable authority that already exists;
- CE recommendations/disagreements;
- open decisions that Stephen and CE still need to settle.

Nothing here should interrupt the active ten-Origin Golden push unless a live Origin blocker depends on it.

---

## 1. Proposed post-Origin spine

Current durable opening authority already supports:

`Origin -> YOUR CHRONICLE BEGINS -> Academy Team Formation -> First Konoha Orientation -> academy_free_play -> voluntary Genin Promotion -> Genin roster finalisation -> Current Journey -> Arc 1`

Candidate Phase-2 production sequence:

1. ten-Origin Golden seal / freeze;
2. first-Konoha tutorial/browser acceptance;
3. Konoha free-play/world/hotspot presentation upgrade;
4. first meaningful spend/economy;
5. durable weapon provenance runtime;
6. Training / Practical / Exams current-team + persistent development;
7. CE hotspot/event stress-test;
8. voluntary Genin Promotion;
9. Genin roster finalisation;
10. Current Journey / Arc 1 browser implementation and polish;
11. Energy activation/balance pass after ordinary play loop is stable;
12. later-difficulty design closure only where it does not block Alpha.

---

## 2. Tutorial direction — OPEN DESIGN

Stephen's proposed direction:

After:
`YOUR CHRONICLE BEGINS -> select two Academy teammates`

the player should not simply land on the Konoha map with no direction.

Candidate guided tutorial may introduce key top-level Alpha surfaces such as:

- Training Grounds;
- Exams;
- Practical;
- Arena;

with Arena receiving a deeper explanation of its current subareas.

Candidate closing message:

> You can take the Promotion now, or go and explore what Konoha has to offer.

CE preliminary view:

- preserve the existing one-shot First Team Orientation contract as the semantic onboarding boundary;
- consider widening its *presentation* from one isolated Training Ground task into a short guided village orientation;
- avoid a long sequence of modal text boxes that becomes a mandatory UI lecture;
- prefer interactive map highlights / guided objectives / one-click explanation cards;
- keep the final choice explicit:
  - pursue Promotion now;
  - remain Academy-ranked and explore/free-play.

Important existing Rank authority:
Academy -> Genin Promotion must become available after authored opening prerequisites; there is no mandatory Academy grind requirement.

OPEN:
- exact tutorial stops;
- whether Training / Exams / Practical each require one action or only inspection;
- exact Arena four-area explanation;
- whether tutorial is skippable after first Chronicle;
- exact tutorial close wording.

---

## 3. Weapon provenance — HIGH PRIORITY PHASE-2 FOUNDATION

Current durable authority already closes provenance semantics but runtime/UI remain unimplemented under #148.

Current Kakashi Origin already has one concrete exceptional weapon reward:

`academy_training_tanto`
source:
`kak_origin_weapon_exceptional_training_tanto`

The current Acquisition contract still treats this as catalogue ownership rather than automatically minting a unique crafted-instance identity.

Stephen's concern is valid:
provenance cannot remain theoretical while rewarded/purchased/crafted weapons begin entering the game.

Candidate CE direction:

- activate provenance before or alongside broader post-Origin economy;
- use the Academy Training Tantō as the first rewarded-weapon provenance integration case;
- then prove the same durable-instance layer with:
  - purchased weapon;
  - rewarded weapon;
  - crafted weapon;
  - later modification/Fūin attachment;
- provenance records causal history but creates no generic hidden power;
- reward/source owner grants entitlement;
- Acquisition/Inventory commits ownership;
- durable weapon-instance layer records exact acquisition provenance;
- Combat/equipment consumes current authorised effects;
- Shinobi Record projects observer-safe history.

OPEN:
- exact instance schema for rewarded catalogue weapons;
- whether every durable weapon mints an instance immediately or only once provenance-relevant state exists;
- first Alpha shop/weapon selection to exercise the system.

---

## 4. World / hotspot content + location UI

Current 500-seed policy says:

- 500 total authored seeds;
- 140 Alpha activation candidates;
- 214 Alpha content reserve;
- 146 post-Alpha reserve;
- 500 seeds designed != 500 quests implemented;
- activation is selective.

Current Konoha executable World package already includes a bounded activated set.

Stephen wants the prototype location UI upgraded before large-scale hotspot use.

CE agrees.

Candidate location-screen v2 should make clear:

- location identity / backdrop;
- current team/party presence where relevant;
- current Story objective/locator;
- active World opportunity/hotspot;
- available services;
- training/exam/practical actions where hosted;
- known people currently present where authorised;
- recently changed/Chronicle-reactive state where relevant;
- exit/map navigation.

Do not dump every possible event into a static list.

OPEN:
- exact UI layout;
- active-opportunity count/presentation;
- how CE hotspot conversations enter/exit this surface;
- how multiple simultaneous eligible events are selected/projected.

---

## 5. Ninja ID redesign — ALPHA RELEASE BLOCKER, NOT IMMEDIATE BLOCKER

Stephen reference direction:

- large left portrait/photo of selected Origin Character;
- portrait changeable later;
- compact status text to right;
- small action/control area.

Candidate CE information hierarchy:

Primary identity/status:
- current portrait;
- Ninja / display identity;
- formal Rank;
- Village;
- Current Team;
- Current Journey / Story Arc;
- Ryō.

Secondary record metrics should be chosen carefully.

Potential metrics:
- completed World events;
- Battles won / Battle record;
- recruited/owned shinobi;
- Chronicle milestones;
- current Energy once activated.

CE preliminary disagreement:
`Enemies Defeated` should probably not be one of the most prominent identity-card metrics because it overweights combat/lethality relative to investigation, protection, diplomacy and Chronicle play.

OPEN:
- exact 3–5 visible fields;
- whether Rank/Village are baked header identity rather than counted lines;
- portrait-change rules;
- whether button opens Shinobi Record, profile customisation, or both.

---

## 6. CE live stress-test event — Kakashi survivor re-entry

Stephen proposes one real event used as a CE stress test:

After Kakashi Origin, if at least one of:
- Masked Interceptor (MI);
- ANBU Marked Target (AMT);
- Package Smuggler (PS)

survived Kakashi's attempt to kill, a later hotspot event may reintroduce one as a named character.

CE agrees with the concept but adds a stricter eligibility rule:

`survived lethal attempt` alone is insufficient.

The event must consume exact terminal state such as:

- survived + escaped / remains at large;
- survived + released;
- survived + captured/delivered;
- survived + field-secured pending collection;
- other exact custody/location state.

A participant still in legitimate custody must not randomly appear in a street hotspot.

Candidate CE test objectives:

- history-sensitive eligibility;
- stable participant identity across generic/named presentation;
- legitimate naming/reveal;
- observer Knowledge safety;
- current location/custody validation;
- relationship/memory carry-forward;
- different conversation based on Kakashi's exact Origin action;
- optional escalation without forced Battle;
- save/load/idempotence;
- hotspot conversation causal-spine validation;
- meaningful future consequence.

This event should become real production content after the test passes rather than remaining developer-only.

OPEN:
- which of MI / AMT / PS is the first benchmark;
- exact route/outcome prerequisite;
- exact later location;
- when/how their proper name becomes known;
- whether the first recurrence can become Battle.

---

## 7. Energy — IMPLEMENT LATE, DESIGN ALREADY CLOSED

Current design foundation already closes:

- 150 max Energy;
- +1 per 3 minutes;
- Rookie Momentum = 2x regen for first 7 days;
- onboarding through ordinary Academy free-play boundary is Energy-free;
- Arena uses separate Attempts;
- Promotion uses neither Energy nor attempts;
- meaningful gameplay actions consume Energy, navigation/reading does not.

Stephen wants Energy implemented late so it does not hinder development/browser testing.

CE agrees with implementation timing but recommends:
- implement before final Alpha economy/pacing certification;
- keep an explicit developer/owner unlimited-Energy bypass for testing;
- do not tune content duration by making Energy oppressive.

---

## 8. Academy Student duration / later difficulty

Current Rank authority explicitly says:
Academy -> Genin availability has no mandatory Academy grind/duration gate.

Current future Genin-difficulty concept is queued and not an Alpha blocker.

Stephen wants Academy Student difficulty to contain enough game to occupy players for months while Beta/later difficulties are prepared.

CE preliminary disagreement:
Do not manufacture months of duration through:
- Energy starvation;
- inflated stat grind;
- mandatory repetitive training;
- artificial Promotion lock.

Preferred source of longevity:
- Arc 1+ Story;
- World/hotspot ecosystem;
- team building;
- Character/Summon acquisition;
- Training/Practical/Exams;
- weapons/items/crafting;
- provenance/equipment development;
- achievements/Shinobi Record;
- Arena/Staged content;
- CE-responsive follow-ups;
- optional discoveries / relationship/event chains.

Later Genin difficulty should be predesigned through strict inheritance/route safeguards, but not implemented broadly until Academy Student Alpha is stable.

OPEN:
- exact Academy Student completion boundary;
- how much Main Story ships in Alpha;
- which systems must be repeatable at launch;
- what later-difficulty content can be generated from deterministic templates vs requires authored content.

---

## 9. Training / Exams / Practical — CURRENT MAJOR GAMEPLAY GAP

Current World host authority exists for:

- Exams;
- General Training;
- Practical;
- Sparring;
- Mentorship;
- Weapons proficiency;
- Terrain practice.

But opening those surfaces does not itself commit development.

Current Progression authority already supports action-derived persistent development/evidence, with save/load/idempotence requirements.

Stephen reports current player-facing gaps:

- Exams/Practical not consuming the current team properly;
- no clear persistent Stat-growth loop usable for testing;
- Main Story testing risks leaving player at starter-level strength.

Candidate Phase-2 requirement:

Before serious Arc-1 browser balance testing, establish at least one legitimate persistent development loop that:
- uses current player/team state;
- visibly increases appropriate persistent development;
- survives save/load;
- changes derived PL only through Stats/development authority;
- cannot be farmed by UI refresh/replay of one committed occurrence.

OPEN:
- exact Training activity packages;
- exact Stat-development thresholds;
- team member participation/selection;
- Exams vs Practical vs Training semantic differences;
- speed of Academy-level development.

---

## 10. Main Story — CONCURRENT IMPLEMENTATION

Arc 1 is not blank:
- M1–M12 deterministic source/headless path exists;
- M11/M12 Battle package is implemented;
- Arc-1 reward evaluator is implemented;
- mission-choice runtime has early M2–M5 and later bindings;
- installed-browser Golden remains unproven.

Candidate coordination rule:

After the post-Origin opening/free-play/development loop is stable enough to provide a real player state, Main Story browser implementation/polish proceeds concurrently with:
- World/UI;
- economy/provenance;
- Training/Progression;
- CE hotspot testing.

Do not wait for every free-play system to be perfect before beginning Arc-1 browser work.

Do not use synthetic starter state as the only Arc-1 acceptance once persistent development exists.

---

## 11. Candidate Phase-2 workstreams

A. Opening Journey / tutorial  
B. Konoha map + location UI v2  
C. CE hotspot/event benchmark  
D. Persistent development / current-team Training-Practical-Exams  
E. Weapon provenance + first real economy  
F. Promotion + Genin roster browser Golden  
G. Arc 1 browser implementation/polish  
H. Ninja ID redesign  
I. Energy implementation + pacing certification  
J. Later-difficulty design pack (planning only unless Alpha requires more)

These should not all become SEND NOW simultaneously.

---

## 12. Current planning principle

> **After 10/10 Origins are GOLDEN, Phase 2 should prove that Shinobi Chronicles is a living game rather than ten excellent prologues: the player can orient themselves, explore Konoha, spend rewards, develop persistent capability, experience Chronicle-reactive events, promote, build a team and enter Arc 1 with state that actually matters.**

