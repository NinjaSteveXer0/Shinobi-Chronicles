# Shinobi Chronicles — Capability-Responsive Event Ecology v2

**Date:** 2026-09-10  
**Owner:** World / Missions / Events / Rewards  
**Status:** **BINDING WORLD CONTENT ADDENDUM — OCCURRENCE ELIGIBILITY / COMPOUND ROUTES CLOSED; IMPLEMENTATION SEPARATE**

## 1. Purpose

This addendum sharpens and partially supersedes the first Capability-Responsive Event Ecology contract.

The intended player experience is not merely that an ordinary event appears for everybody and then quietly exposes a specialist dialogue option.

For distinctive Chronicle-developed routes, the world should also contain **events, quest chains, missions, encounters and follow-ups whose very occurrence eligibility depends on who this Character has become**.

A Character without False Identity should not be selected into a dedicated False Identity event chain merely so the UI can hide the interesting option. A tracker should instead become eligible for tracking-shaped opportunities. A medical specialist should be more likely to enter medical-response histories. A Character with both may be eligible for both pools **and** rare compound opportunities that meaningfully consume both histories.

Core doctrine:

> **something for everyone ≠ everything for everyone**

> **build/history-responsive content should sometimes be event-level eligibility, not merely route-level affordance**

> **more capabilities increase the eligible possibility space; they do not make every map show every possibility at once**

## 2. Authority boundary

World / Missions / Events authors:

- event/quest/chain definitions;
- factual locations, participants, objects and systems;
- exact occurrence-eligibility predicates;
- Knowledge/discovery requirements;
- capability/history affordance tags;
- factual route options and consequences;
- recurrence/expiry/suppression/transform rules;
- reward/consequence envelopes.

Progression / Skills / Registry / Acquisition and other owners author the truth of whether the Character actually has the required capability, qualification, relationship, object, representation, ownership or Access.

CE / World selection may filter/select only among **already semantically eligible authored candidates** using committed Character/world history.

Coding implements evaluation, persistence, selection, projection and tests.

Preserve:

**Skill != event creator**  
**event definition != occurrence**  
**capability predicate != success**  
**eligibility != discovery**  
**discovery != actionability**  
**specialist event != guaranteed specialist victory**  
**randomness among eligible possibilities != randomness manufacturing eligibility**

## 3. Five event-eligibility modes

World content may use the following authoring modes. These are design semantics, not mandatory engine enum names.

### A. `baseline_world`

The occurrence is eligible from ordinary world/history/location conditions and does not require a specialist path.

A learned capability may still expose a conditional route inside it.

Example: a caravan accident can occur for anyone; Medical Triage may reveal that one victim is deteriorating.

### B. `single_path_responsive`

The occurrence itself requires one exact capability/history family.

If the Character does not satisfy it, **this event is not in their candidate set at all**.

Example: a legacy recognition apparatus begins producing identity discrepancies only after the Character has a legitimate False Identity / identity-rebinding history worth querying.

### C. `multi_path_any`

The event is eligible if **any** of several authored path families are satisfied, but the actual route and information exposed depend on which one(s) are present.

Example: a sealed border ruin may become relevant to a Fūinjutsu specialist, investigator with the right document history, or shinobi carrying a legitimate old key. Different entrants do not receive identical information.

### D. `compound_path_synergy`

A rarer occurrence/branch requires **two or more exact independent histories/capabilities together**.

These are where broad Chronicles become wonderfully unpredictable.

Examples:

- False Identity + Counter-Surveillance;
- False Identity + Underworld Contact;
- Tracking + Evidence Reconstruction;
- Medical + Poison Recognition;
- Fūinjutsu + Barrier Recognition;
- Fūinjutsu + False Identity;
- Echo relationship + Recall-pressure awareness;
- Hosted Entity relationship + Tailed-Beast negotiation;
- Bukijutsu expertise + rare weapon provenance Knowledge;
- Bloodline capability + clan-history Knowledge.

A compound opportunity is not automatically stronger loot. Its value is often unique history, access, Knowledge, relationships, provenance or an unusual future chain.

### E. `history_generated_followup`

The event exists because a prior committed occurrence/action/non-action created the factual prerequisite.

This is the strongest Chronicle mode.

Examples:

- a false profile used hours ago becomes evidence in a later investigation;
- a spared hostile later becomes a witness/contact/threat;
- evidence left untouched is later recovered by somebody else;
- a civilian the player stabilised becomes a future source;
- a parcel delivered under an alias creates a future recognition contradiction;
- a threat the player ignored is solved by another team, producing a different observer/history network rather than a punishment score.

## 4. Selection model — personalised candidate ecology

For a given map/location/time/world state, the candidate set should conceptually be:

`authored local candidates`

→ filter by factual world/Story state

→ filter by exact location/route/participant availability

→ filter by prior occurrence/expiry/suppression history

→ filter by Knowledge/discovery predicates

→ filter by capability/relationship/object/recognition predicates

→ resulting **eligible candidate set**

→ CE/World may choose/surface a bounded subset

→ UI projects only legitimate discovered/actionable state.

A broad Character therefore gets **more eligible possibilities**, not a cluttered map containing every event simultaneously.

Current standing-map guidance remains roughly **4–7 simultaneously actionable non-Story opportunities where legitimate candidates exist**. A player with many specialist paths should rotate through a richer candidate reservoir rather than receive 30 pulsing markers at once.

## 5. Relevance without deterministic build matching

CE/World should not behave like a vending machine that says:

> player learned Tracking → spawn wolf-tracking quest immediately.

Responsive opportunities should feel like the world noticing accumulated history rather than a tutorial checklist.

Selection should preserve:

- ordinary unrelated village/world life;
- Story/Arc-contextual pressure;
- capability-responsive opportunities;
- history-generated follow-ups;
- occasional no-current-opportunity locations.

A Character may go several play sessions without a particular specialist route becoming relevant, then encounter a chain where it matters repeatedly.

## 6. False Identity — corrected occurrence policy

The first False Identity pack remains useful, but the earlier statement that every seed should remain generally playable without False Identity is **superseded for dedicated False Identity occurrences**.

There are now two legitimate uses of False Identity in World content:

### General event + False Identity route

The base event is independently legitimate for any Character, and False Identity is merely one conditional route.

Example: an ordinary border inspection may happen to anybody.

### Dedicated False Identity occurrence/chain

The occurrence exists specifically because the Character has:

- `skill_false_identity`; or
- `IdentityRebindingAccessSatisfied(actor)` with a legitimate current/previous false-profile history; or
- a prior committed identity-recognition event that creates a later factual follow-up.

A Character without those prerequisites **does not encounter that dedicated occurrence**.

They may have completely different events occupying the same geography.

## 7. False Identity pack v1 — revised eligibility classification

The original FI seeds are retained with corrected event-level eligibility:

| Seed | Revised eligibility mode | Minimum authored trigger family |
|---|---|---|
| FI-01 The Name on the Gate Ledger | `single_path_responsive` variant of generic checkpoint ecology | False Identity/current recognised false profile OR prior identity-rebinding use |
| FI-02 A Face Someone Almost Knows | `history_generated_followup` | prior false-profile presentation / identity-confusion history |
| FI-03 The Borrowed Patient Record | `single_path_responsive` | current/previous false profile + legitimate medical/archive context |
| FI-04 Rain Registry Echo | `single_path_responsive` | False Identity/identity-rebinding access + Amegakure recognition context |
| FI-05 Grass Border Census | `single_path_responsive` | False Identity/current false profile + Grass movement context |
| FI-06 The Wrong Bounty Sketch | `history_generated_followup` or `multi_path_any` | prior recognised-profile history, mistaken-identity history, or specific bounty resemblance evidence |
| FI-07 The Black-Market Introducer | `multi_path_any` with compound upgrade | False Identity OR underworld-contact eligibility; `False Identity + underworld` enables unique compound history |
| FI-08 Orochimaru's Forgotten Laboratory: Subject Index | `multi_path_any` / compound | lab discovered + at least one relevant route; False Identity is one possible identity-classification route, while Fūinjutsu/investigation/key-history may generate different lab opportunities |
| FI-09 ANBU Dead Drop Without a Name | `compound_path_synergy` | ANBU/dead-drop Knowledge or entitlement + False Identity/recognition route where appropriate |
| FI-10 The Returning Witness | `history_generated_followup` | prior witness + false-profile/identity contradiction history |
| FI-11 The Sealed Parcel Recipient | `single_path_responsive` or history follow-up | recognised false-profile/alias history tied to recipient query |
| FI-12 The Person Who Never Arrived | `history_generated_followup` | prior false-profile use in the relevant district/window |

The generic geography remains available to other Characters; the dedicated FI occurrence does not.

## 8. Initial responsive quest-chain families

World should reserve authored chains for at least the following route families as their Alpha-accessible slices become real:

1. **False Identity / Recognition** — alias history, system recognition, witnesses, records, contradictory identity networks.
2. **Fūinjutsu / Barrier Work** — wards, damaged formulae, seal services, old infrastructure, containment, counterseal investigations.
3. **Tracking / Scent / Trace** — missing people, fugitive routes, animal trails, false trails, weather-damaged evidence, route reconstruction.
4. **Investigation / Evidence** — crime scenes, archival contradictions, evidence custody, reconstruction, source disagreement.
5. **Medical / Stabilisation** — civilian emergencies, poisons, post-Battle care, evacuation, scarce treatment choices, medical-source histories.
6. **Counter-Surveillance / Infiltration** — tails, watchers, dead drops, covert meetings, suspicious patrol patterns, safehouse chains.
7. **Weapons / Bukijutsu** — unusual weapon provenance, broken heirlooms, training challenges, forge commissions, battlefield recovery.
8. **Crafting / Materials** — rare-material provenance, damaged equipment, Forge/Fūin Craft commissions, material substitution and recovery.
9. **Summon Relationships** — source-specific requests, habitat problems, contracts/relationships where actually authorised, summon-mediated Knowledge.
10. **Hosted Entity / Echo** — cooperation/refusal, pressure, Recall, communication, source-specific consequences.
11. **Tailed Beast / Jinchūriki** — relationship-driven requests, trust, containment, chakra negotiation, temple/fusion-hosting content only when owning authority closes prerequisites.
12. **Bloodline / Clan History** — observer-specific recognition, old sites, documents, compatible capability observations, clan consequence chains.
13. **Service / Special Jōnin Qualification** — specialist work whose occurrence can produce exact qualification evidence, never generic Specialisation XP.
14. **Underworld / Political / Reputation** — invitations, introductions, debts, rumours, conflicting observer networks, institutional trust/distrust without morality score.
15. **Rare Knowledge / Secret Representation** — chains where accumulated history may eventually create eligibility evidence for special Character representations without World directly granting ownership.

## 9. Compound-path examples

When a Character satisfies multiple meaningful histories, World is explicitly allowed to become a **free-for-all of legitimate possibilities** while remaining bounded by map/actionable-slot pacing.

Examples to author over time:

### False Identity + Counter-Surveillance — `The Watcher Who Logged the Wrong Person`

The player detects surveillance while a municipal/security system records their current false profile. They may preserve the alias, deliberately lead the watcher, expose the watcher, or create contradictory observer histories.

### False Identity + Fūinjutsu — `A Name Written Into the Ward`

A damaged ward stores recognised-profile information in a seal layer. False Identity can affect the query; Fūinjutsu can inspect the layer. Having both may reveal that the system accepted the alias but wrote an unstable provenance trace. Neither route alone reveals the whole picture.

### Tracking + Evidence Reconstruction — `Three Trails, One Body`

Physical tracks, a moved object and a witness timeline disagree. Tracking follows route continuity; reconstruction compares committed evidence. Having both may prove there were two movers without magically identifying either.

### Medical + Poison Recognition — `The Patient Who Should Be Recovering`

The player can distinguish ordinary injury recovery from poisoning signs and decide whether to treat, investigate the source, preserve a sample, call authority or leave the medical owner to act.

### Weapon Expertise + Rare Provenance Knowledge — `The Blade Nobody Wanted`

An unremarkable damaged weapon is valuable because of its construction/history rather than raw stats. The player may restore it, return it, sell it, investigate its former owner or use the provenance to unlock a later chain.

### Echo + Recall Awareness — `A Knock From the Wrong Side`

A compatible Echo route experiences Recall pressure. One capability identifies the pressure; relationship history determines whether the Echo cooperates, refuses, warns the host or does nothing.

### Underworld + Service Recognition — `Two Names at One Table`

An institutional contact and underworld intermediary know the same Character through different histories. The event is not a morality test; it is an observer-network collision.

## 10. Reward doctrine for responsive content

Responsive content must not become a hidden build-tax or build-bonus multiplier.

Different routes may legitimately yield different combinations of:

- Ryō;
- items/materials;
- weapons/equipment;
- Knowledge;
- relationship/shared history;
- qualification/development evidence;
- recognition;
- access/contact/follow-up;
- secret-location discovery;
- Character-representation eligibility evidence;
- CE history/Echo-relevant provenance.

The specialist route may be more valuable **to that Character's future Chronicle** without being numerically richer than every baseline route.

Not possessing a capability gives no penalty. It simply means some authored occurrences never become eligible for that Chronicle, while other capability/history pools may.

## 11. Anti-clutter / anti-farming rules

- A newly learned capability does not immediately flood the map with dedicated events.
- Dedicated responsive events should have occurrence history, cooldown/expiry or one-shot semantics appropriate to their fiction.
- Reloading must not reroll capability eligibility or repeatedly grant first-time discovery/history.
- Repeated event families create new occurrences with new participants/context where fiction supports recurrence; do not replay identical history.
- Compound-path opportunities should be rarer than single-path opportunities.
- The system should prefer variety when many eligible candidates exist, without using variety weighting to make an ineligible event eligible.

## 12. Authoring workflow going forward

Whenever Writing, Combat, Progression, Registry, Acquisition, CE or World closes a genuinely expressive new route:

1. identify the exact durable capability/history predicate;
2. identify what factual world contexts can legitimately respond;
3. decide whether it deserves route-level support, event-level eligibility, a dedicated chain, or some combination;
4. retrofit a small number of existing seeds where natural;
5. author 2–6 dedicated responsive events only when they create qualitatively new gameplay;
6. author at least one history-generated follow-up for major flagship routes when worthwhile;
7. consider 1–3 compound-path events with other compatible major routes;
8. define CE-recordable factual outcomes and non-action handling;
9. define contextual rewards without morality scoring or double-grant;
10. activate only the Alpha slice justified by available runtime/content authority.

## 13. Non-collapse

**World opportunity != Skill**  
**Skill != event**  
**capability history != guaranteed event occurrence**  
**eligible candidate != selected occurrence**  
**selected occurrence != discovered**  
**discovered != actionable**  
**specialist route != objectively correct route**  
**more unlocked routes != map-marker spam**  
**non-action != punishment**  
**history-generated consequence != morality judgment**  
**Knowledge != Access != Competence != Power != Mastery**  
**False Identity != stable identity rewrite**  
**recognition != identity != authority != ownership**  
**authored != implemented != runtime validated != Golden GREEN**

## 14. Supersession note

This addendum supersedes only the parts of `Capability Responsive Event Ecology and False Identity Opportunity Pack 2026-09-10.md` that assumed a dedicated specialist event should generally remain encounterable by Characters who do not possess that route.

All compatible earlier doctrine remains in force, including bounded capability semantics, non-punitive alternatives, observer-relative Knowledge, reward diversity and no universal build superiority.
