# Shinobi Chronicles — Energy, Participation Counters, Evolution Chamber and Alpha Monetisation Foundation

**Date:** 2026-09-13  
**Owner:** CE / Codex / Coordination — cross-system reconciliation  
**Status:** **BINDING SC DESIGN FOUNDATION — IMPLEMENTATION / ECONOMY QA / LIVE-COMMERCE INTEGRATION PENDING**

## Purpose

This document closes the current Shinobi Chronicles foundation for:

- player Energy;
- Arena participation;
- Staged Battle participation;
- Promotion and Village Tournament participation boundaries;
- the Origin-character Evolution Chamber;
- Chronicle Engine involvement in Origin evolution;
- the initial real-money purchase philosophy and Alpha Supporter early-access model.

This is intentionally a cross-system contract. It does **not** create a second Stamina, Chakra, PL, Progression, Rank, Battle, Acquisition, Story, World or Chronicle system.

The design was informed by Stephen's long-term experience with Ninja Manager, especially the parts worth preserving — renewable action pacing, quick Arena participation, long-term Origin attachment and visible evolution — while explicitly rejecting multi-day refill pacing and monetisation built around making normal play deliberately miserable.

---

# 1. Canonical Energy meaning

Shinobi Chronicles has **one global resource named `Energy`** for ordinary Chronicle-facing gameplay.

Energy is a **player/account pacing resource**.

It is **not** an in-world physiological state and does not represent a shinobi's chakra reserves, physical fatigue, injury or combat capability.

Preserve:

**Energy != Stamina**  
**Energy != Chakra**  
**Energy != Base PL**  
**Energy != Developed PL**  
**Energy != Effective PL**  
**Energy != Battle PL**  
**Energy != Progression**

Running out of Energy means only that the player cannot begin another Energy-bearing gameplay action until enough Energy regenerates or is restored.

It does not mean the protagonist is canonically exhausted, injured, out of chakra or unable to exist in Story.

---

# 2. Energy capacity and regeneration — Alpha baseline

The current Alpha baseline is:

- **maximum Energy: 150**;
- Energy regenerates while online or offline;
- **normal regeneration: +1 Energy every 3 minutes**;
- theoretical empty-to-full natural refill: **7 hours 30 minutes**;
- new players receive a transparent temporary accelerated regeneration period;
- **Rookie Momentum: 2x Energy regeneration for the first 7 days**;
- during Rookie Momentum, empty-to-full natural refill is approximately **3 hours 45 minutes**;
- the UI should expose current/max Energy and enough timing information for the player to understand the next regeneration point / refill cadence.

These values are the current Alpha balance baseline. Balance testing may tune exact numerical values without reopening the semantic contract that Energy is a single renewable action budget with substantially shorter recovery than the inspiration game's roughly day-long full refill.

The intended experience is that a player may have several meaningful play sessions in one day rather than being locked out for 24–28 hours after ordinary play.

---

# 3. Real-world regeneration does not advance Chronicle time

Real-world waiting used to regenerate Energy does **not** by itself advance in-world Story, World, Chronicle, candidate-team or event time.

Example:

A player who closes the game with 0 Energy and returns four hours later may have more Energy, but CE must not infer that four in-world hours passed, that candidates were assigned elsewhere, that events expired, that NPCs completed activities or that Story advanced merely because wall-clock time passed.

Preserve:

**real-time Energy regeneration != Chronicle time progression**  
**offline wait != occurrence**  
**refill != world-state mutation**

Only legitimate authored/runtime occurrences may advance semantic game state.

---

# 4. What consumes Energy

Energy gates **meaningful gameplay actions**, not presentation interactions.

Energy-bearing categories may include, where the owning system authorises them:

- Story / Mission action packages;
- training;
- practical / training-ground activity;
- World event / hotspot commitments;
- ordinary standalone PvE encounters;
- rare / Forbidden encounters;
- investigations and similar meaningful World activity;
- other actions that materially create development, rewards, history, consequence or world progression.

Opening a screen, reading dialogue, inspecting a hotspot, browsing a map, viewing cards, reviewing Chronicle history, checking inventory, inspecting My Clan, reading Codex material or examining an objective costs **0 Energy** unless a distinct semantic action is actually committed.

Canonical rule:

> **Energy pays for committing to gameplay, not for reading or navigating the game.**

---

# 5. One factual activity = one Energy transaction

Energy must be charged at meaningful activity boundaries rather than every resolver/UI boundary.

Example:

`Mission action -> dialogue -> player choice -> owning resolver -> Battle -> aftermath -> committed consequence`

may legitimately be one Energy-bearing activity package.

If the Mission action already paid for the Battle as part of the same factual activity, Battle must not charge Energy a second time merely because another system resolved it.

Preserve:

**Story action != automatic extra Battle charge**  
**nested resolver != second Energy purchase**  
**presentation beat != Energy action**  
**Section != Energy charge automatically**

This is especially important because Story Sections are structural addresses; some are connective and explicitly create no new historical fact.

---

# 6. Energy transaction / failure behaviour

Energy consumption must be persistent and idempotent.

The implementation should support a stable operation/action identity so the same committed activity cannot be charged twice through retry, save/load, refresh, Battle return or UI reopening.

Expected conceptual sequence:

`eligibility -> Energy availability check -> activity commitment/reservation -> owning resolver -> occurrence/result commit -> Energy charge receipt`

Exact transaction architecture is Coding-owned, but the following semantics are binding:

- inspecting an unavailable action costs 0;
- failing an eligibility/prerequisite check costs 0;
- UI navigation costs 0;
- a legitimate attempted action may still consume Energy if the Character fails in-world;
- a runtime/technical failure before the activity legitimately commits must not silently eat Energy;
- resuming the same committed Battle/activity after reload must not charge again;
- retrying a genuinely new failed attempt may incur a new cost when the owning activity allows another attempt.

---

# 7. Opening onboarding is Energy-free

The mandatory fresh-player opening is **not Energy-gated**.

The following must be playable without an Energy stop:

`Origin selection -> exact Origin Prologue -> committed opening consequences -> YOUR CHRONICLE BEGINS -> Academy Team Formation -> exactly two legitimate Academy teammates -> first directed Konoha/tutorial continuation -> ordinary Academy free-play boundary`

Energy becomes relevant only once the player has reached the authorised ordinary-play boundary or another explicitly designed post-tutorial activation point.

A new player must never be interrupted halfway through their Origin/tutorial because a renewable account resource hit zero.

---

# 8. Arena PvP uses attempts, not Energy

Ordinary asynchronous Arena PvP does **not** consume global Energy.

Arena uses a separate participation counter:

- **Arena Attempts**;
- baseline maximum: **3 attempts**;
- baseline regeneration: **+1 attempt every 40 minutes**;
- theoretical empty-to-full refill: **2 hours**.

These values are an Alpha baseline and may be balance-tuned without collapsing Arena into Energy.

Arena Attempts exist so competitive quick-play does not consume the player's Story/training/world action budget.

Arena rewards may remain relatively modest/repeatable and are owned by the relevant Combat/economy authority.

Preserve:

**Arena Attempt != Energy**  
**Arena attempt count != Character fatigue**  
**PvP participation != World/Story Energy drain**

---

# 9. Staged Battles use an independent participation count

Arena **Staged Battles** are a distinct challenge lane and do not automatically consume global Energy or ordinary Arena Attempts.

They use their own independent count / attempt policy.

Binding semantic lock:

> **Arena Attempts != Staged Battle Attempts != Energy.**

The exact Staged Battle maximum and regeneration cadence remain **BALANCE OPEN** and should be closed when the Staged Battle Alpha economy is actively implemented.

This keeps authored/challenge content from competing directly with Story/training Energy and keeps ordinary PvP availability separate from staged challenge availability.

---

# 10. Promotion attempts are penalty-free

Formal Promotion assessments do **not** consume Energy and do **not** require a renewable attempt ticket merely to participate.

Binding rule:

> **Promotion attempts consume neither Energy nor a limited participation counter.**

Failure already has its legitimate consequence: the subject was not promoted.

The player may train, develop, change tactics or retry where the actual Promotion contract permits it, but the game must not turn failed Promotion into a real-time waiting/payment penalty by default.

Preserve:

**Promotion != Progression grind**  
**Promotion failure != Energy punishment**  
**Battle victory != Promotion**

---

# 11. Village Tournament is independently governed

Village Tournament participation does not automatically consume global Energy.

Tournament access/entry/run structure must be governed by its own institutional/competitive participation contract — for example qualification, tournament cycle, bracket/run state or other authorised entry logic.

This prevents a player from purchasing large quantities of Energy and thereby directly purchasing substantially more competitive tournament entries than another player.

Exact Tournament participation rules remain **SYSTEM-SPECIFIC / OPEN** until the Tournament owner closes them.

Preserve:

**Tournament participation != Energy sink automatically**  
**Energy purchase != tournament-entry purchase automatically**

---

# 12. Zero-Energy game access

0 Energy does not make the entire application unusable.

Players may continue to perform non-Energy-bearing inspection, management and presentation activity, including legitimate examples such as:

- inspect My Clan;
- manage non-semantic presentation/loadout state where authorised;
- read Codex material;
- inspect Chronicle / Shinobi Record history;
- review missions/current objectives;
- browse known maps without committing an Energy-bearing activity;
- inspect characters/cards;
- inspect inventory;
- inspect relationships/records;
- other non-advancing interfaces.

The player is blocked only from committing a new Energy-bearing action until Energy becomes available.

---

# 13. Evolution Chamber — purpose

Shinobi Chronicles keeps the **Evolution Chamber** concept as a later-game development lane focused on the player's **Origin Character**.

The chamber is not a generic Character-level grind and does not replace normal Training, Exams, Practicals, Progression or Chronicle development.

Core fantasy:

> **The Character you began the Chronicle as can undergo a major later-game maturation/development event shaped by what that Character has actually become.**

The stable person/identity remains the same Character.

Evolution does not delete/recreate the Character, erase their Origin history, fabricate Rank, rewrite relationships or manufacture a different person's Chronicle.

Preserve:

**stable identity != current visual representation**  
**Evolution != new person**  
**Evolution != Promotion**  
**Evolution != direct hidden PL bonus**

---

# 14. Evolution Chamber — four developmental routes

When an authorised Origin Evolution milestone is reached, the player may choose among four developmental philosophies:

## A. Fortify Weaknesses

Prioritise the Character's weakest Stats with comparatively larger raw increases.

## B. Sharpen Strengths

Prioritise the Character's strongest Stats with smaller/focused increases because top-Stat development affects PL more aggressively under the existing formula.

## C. Balanced Growth

Apply a smaller broad increase across all seven Stats.

## D. Directed Development

Allow the player to choose a bounded custom package, currently envisioned as something in the shape of **2 Major + 2 Minor Stat increases**.

Exact numeric values are **Progression-calibration work** and are not fixed here.

They must be balanced against the existing PL formula rather than assuming equal raw Stat points are equal value.

Current PL remains derived from Stats; Evolution may not create a direct or hidden PL bonus.

The current Base/Developed/Effective/Battle separation remains authoritative. Evolution's persistent growth belongs in the legitimate persistent-development layer, not Effective/Battle-only modifiers and not an arbitrary Base rewrite unless current Progression authority explicitly defines otherwise.

---

# 15. Chronicle Engine involvement in Evolution

Origin Evolution is a real Chronicle occurrence.

CE records that the Origin Character underwent the Evolution Chamber milestone and which developmental philosophy was chosen.

Example historical meaning:

`Menma underwent Origin Evolution — Directed Development.`

The occurrence may retain exact development package/provenance refs without collapsing presentation language into mechanic ownership.

Later Story/World/relationship content may recognise this history only where the relevant authoring legitimately consumes it.

Preserve:

**Evolution choice != personality inference**  
**Evolution occurrence != automatic later dialogue everywhere**  
**recorded history != forced outcome**

The Chamber records what actually happened; it does not decide what the Character's personality 'must' be because of the selection.

---

# 16. Evolution Chamber collectible visual reward

Evolution may also unlock an exclusive **Evolved Origin collectible visual representation** such as an evolved portrait/card presentation.

This collectible visual reward is separate from the persistent mechanical development package.

Unlocking evolved art does not automatically:

- create a new stable Registry person;
- replace every runtime portrait;
- change formal Rank;
- grant ownership of an unrelated Character variant;
- grant direct PL;
- overwrite historical Origin art.

The intended reward is that the player's starter visibly gains a prestigious collectible representation tied to the milestone while remaining the same person with the same lived Chronicle.

Exact art and activation rules are Character Creation / UI / Registry integration work when deliberately activated.

---

# 17. Monetisation philosophy

Shinobi Chronicles monetisation should primarily monetise **enthusiasm and convenience**, not deliberate frustration.

Canonical principle:

> **Players should buy an accelerator because they are excited to keep playing, not because normal pacing was intentionally made miserable so the shop can sell the cure.**

Examples of desirable purchase motivation:

- a player reaches a Story reveal and wants to continue tonight;
- a player wants more training before a difficult boss;
- a player has a free day and wants a longer SC session;
- a player wants convenient Ryō rather than waiting to accumulate it naturally;
- an Alpha Supporter wants earlier access to a special collectible/Combo Card that later players can still earn/access through normal game availability.

Premium spending may accelerate legitimate play but should not create a superior hidden ruleset.

---

# 18. Real-money purchase categories — current approved foundation

The current approved real-money purchase foundation includes:

## A. Energy Pills

Energy-restoration consumables may be sold for real money.

Exact product sizes and prices are **COMMERCIAL BALANCE OPEN**. Candidate formats may include partial restores and/or a full restore, but no exact SKU is locked here.

Energy Pills may also be obtainable through legitimate gameplay/reward channels where later economy design authorises them.

Paid Energy restores **time/access to play**. It must not directly grant Stats, PL, Rank, Story outcome or better resolver odds merely because the Energy was purchased.

## B. Ryō

Players may purchase transparent fixed quantities of in-game **Ryō** for real money.

Exact pack sizes/prices are **COMMERCIAL BALANCE OPEN**.

Ryō remains the same in-game currency whether earned or purchased. Purchased Ryō does not become a separate superior currency with different semantic authority.

## C. Alpha Supporter early-access Combo Cards

Shinobi Chronicles may offer **three Alpha Supporter purchase tiers at £10, £20 and £50** tied to early access to the **first three Combo Cards**.

Binding commercial meaning:

- these are **early-access/supporter entitlements**, not permanent pay-only exclusives;
- players who do not buy them must later have a legitimate non-supporter acquisition/access route;
- later players or players who choose to wait may receive access after a longer availability window / later progression or release condition;
- the exact three Combo Card identities, exact card-to-tier mapping, whether higher tiers are cumulative, and exact standard-release timing remain **CONTENT / COMMERCIAL IMPLEMENTATION OPEN** until explicitly closed;
- supporter access must not rewrite Registry identity, Chronicle history or ownership semantics beyond the actual authorised acquisition/entitlement transaction.

This preserves supporter value while preventing the first three Combo Cards from becoming permanently inaccessible to non-paying players.

---

# 19. What is not currently approved for direct real-money purchase

Unless a later explicit commercial authority reopens these boundaries, the current foundation does **not** approve direct purchase of:

- formal Rank / Promotion;
- direct Base PL;
- hidden PL bonuses;
- raw permanent Stat points detached from gameplay authority;
- guaranteed Evolution route outcome beyond legitimately reaching/using the Chamber;
- Bloodline mastery/power solely because money was spent;
- Story outcomes;
- CE choices/results;
- World Truth / Knowledge;
- guaranteed Battle victory;
- direct competitive Village Tournament entries through Energy conversion;
- permanent pay-only access to the first three Alpha Supporter Combo Cards.

Future cosmetics, supporter badges, presentation items or other convenience products may be considered later, but they are not created by this document.

---

# 20. Economy fairness guardrails

The following commercial guardrails are binding at the design level:

1. Real-money products should be deterministic and clearly describe what is purchased wherever practical.
2. Normal free/natural play must remain viable; monetisation should not require intentionally oppressive refill pacing.
3. Energy purchases increase available play time, not resolver success probability.
4. Purchased Ryō is ordinary Ryō, not a second premium-stat currency.
5. Alpha Supporter Combo Cards are early access, not permanent exclusivity.
6. Competitive institutional modes may use their own participation rules rather than becoming raw Energy-spend contests.
7. No purchase silently mutates Chronicle history without the same legitimate semantic transaction that an earned acquisition would require.
8. Payment state is not character Knowledge, relationship, Rank, Progression or World Truth.

Canonical shorthand:

> **Pay to play more now / obtain convenience or early collectible access — not pay to rewrite the Chronicle's rules.**

---

# 21. Ownership boundaries

## CE / Codex / Coordination

Owns this cross-system semantic boundary and the non-collapse rules between Energy, real-time regeneration, Chronicle time, Evolution history and commercial entitlements.

## Progression / Development

Owns exact Evolution Chamber persistent-development packages, requirement calibration and the four-route Stat package balance.

## PL / Registry / Rank

Owns PL derivation, Registry identity/representation boundaries and formal Rank. Evolution cannot bypass these authorities.

## Combat / Arena

Owns Battle resolution and mode-specific Arena/Staged Battle participation semantics once exact implementation contracts are activated.

## World / Missions / Events

Declares legitimate Energy-bearing world/event/mission action costs and activity boundaries; it does not own the central Energy wallet.

## Writing / Story

May author player-facing context and later acknowledgement for Evolution/history but does not directly spend Energy or mutate Stats by prose.

## UI / Assets

Owns presentation of Energy, attempt counters, timers, Evolution Chamber UI and approved collectible visual projection. Presentation does not commit semantic purchases/development by itself.

## Coding / Runtime

Owns persistent Energy/attempt state, regeneration, idempotent charging, save/load, entitlement persistence, exact commerce transaction integration and runtime validation after implementation is deliberately scheduled.

## Acquisition / Character Systems

Owns actual Character/Card acquisition/ownership transaction semantics for supporter/Combo Card entitlements where applicable.

---

# 22. Implementation priority

This design closure does **not** interrupt the current highest-priority Alpha runtime recovery lanes (#105 / #121 / #141 and their direct successors).

Energy, Arena attempt counters, Staged Battle attempts, Evolution Chamber implementation and commercial checkout/entitlement integration should be scheduled deliberately rather than being injected opportunistically into the current Origin/Chronicle-engine repair.

Exact implementation traffic should be created when Stephen/CE deliberately promotes this foundation into active Alpha execution.

---

# Final lock

Current Shinobi Chronicles direction is:

> **One 150-point global Energy budget for meaningful Chronicle/development/world play, with fast offline regeneration and temporary Rookie Momentum. Arena PvP uses its own three-attempt regenerating counter. Staged Battles use an independent challenge count. Promotion attempts are free of Energy/attempt penalties. Village Tournaments are independently governed. The Evolution Chamber later lets the player's Origin Character undergo one of four persistent Stat-development philosophies, records that development as real Chronicle history, and may unlock a collectible evolved visual representation. Real-money monetisation begins with Energy Pills, Ryō and £10/£20/£50 Alpha Supporter early access to the first three Combo Cards, with those cards remaining obtainable later by non-paying players. Monetisation exists to let excited players play more or access convenience/early collectibles — not to manufacture suffering and sell the cure.**

Preserve throughout:

**Energy != Chakra != Stamina != PL**  
**real-time refill != Chronicle time**  
**Arena Attempts != Staged Battle Attempts != Energy**  
**Promotion != Energy sink**  
**Tournament entry != Energy purchase**  
**Evolution != direct PL bonus**  
**Evolution visual != new person**  
**payment != Chronicle authority**  
**early access != permanent paywall**  
**monetisation != intentionally broken normal pacing**
