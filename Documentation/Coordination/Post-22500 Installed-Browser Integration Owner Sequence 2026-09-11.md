# Shinobi Chronicles — Post-22500 Installed-Browser Integration Owner Sequence

**Date:** 2026-09-11  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING ALPHA COORDINATION — #106 CONSUMED / OWNER SEQUENCE ACTIVE**  
**Source:** GitHub issue #106 + Stephen clarification comment  
**Installed review baseline:** `51f6d71847224998fc0178e8fc89e0b378018ce5` (`22500-27499`)

## 1. Coordination decision

Issue #106 is an integration umbrella, not one implementation package.

The installed-browser review is accepted as evidence that Exams, Practical, Missions, Training, Battle and the current interactive-map direction are viable code-owned surfaces. The remaining work is finite cross-owner authority/content integration.

Do not reopen baked-UI architecture.

Preserve:

- `location != event != opportunity`;
- `World Truth != observer Knowledge != presentation`;
- Story destination != automatic travel/access;
- Promotion difficulty != direct PL bonus;
- authored content != active content != owned/prepared content;
- Battle PL != HP/injury;
- current actor PL != team PL sum;
- code-owned surface != baked-asset dependency.

## 2. 🔴 SEND NOW — Combat / Skills tutorial action wall

The first downstream owner is **Combat / Skills / Items / Weapons**.

Installed-browser evidence shows `academy_menma` can enter the Origin tutorial Battle with only cooperative-Nine-Tails-gated actions visible and disabled. This can create a no-usable-action playability wall.

Current Combat authority confirms:

- tutorial deployment is exactly `academy_menma` vs `test_subject_altered_shinobi`;
- Menma receives no automatic Nine-Tails Battle assistance;
- the opponent has an exact Combat package;
- Coding must not invent generic Basic Attack / Guard fallbacks or silently swap prepared palettes.

Combat must therefore return the exact legal baseline prepared action set for `academy_menma` in this tutorial and the exact Alpha-active Combat-content slice that Coding may surface now.

This is the current SEND NOW dependency because it can block actual Alpha play.

## 3. 🟠 QUEUED — PL / Registry / Rank difficulty-aware Promotion readiness

Stephen's clarification **supersedes the Academy→Genin example in the original #106 body**.

### Academy Student → Genin — no difficulty grind gate

`Academy Student → Genin` becomes **available/unlocked automatically** once the authored opening/prologue prerequisites are legitimately complete.

Preserve:

- assessment availability != forced attempt;
- automatic availability != automatic Promotion;
- no mandatory Academy grind;
- Origin/opening completion may satisfy the authored prerequisite boundary, but does not itself manufacture Promotion;
- Battle victory != Promotion;
- mission completion != Promotion.

Do **not** apply difficulty-scaled requirement counts to Academy→Genin.

### Later Rank transitions — difficulty-aware breadth

Difficulty-aware requirement scaling begins on later authorised transitions, for example:

- Genin → Chūnin;
- higher Rank transitions;
- ANBU → Kage or another exact later transition only where Rank authority permits it.

PL / Registry / Rank owns the exact Promotion-readiness contract, with CE semantic guardrails.

Required closure must define:

- difficulty profile IDs / authority;
- which Rank transitions actually use difficulty-aware readiness breadth;
- requirement budget/range by authorised transition and difficulty;
- whether evidence families must be distinct;
- legitimate evidence families;
- eligibility/availability vs attempt vs success/failure;
- provenance-bearing factual evidence, never one hidden grind score;
- no direct/hidden PL bonus;
- save/load/idempotence.

The original review's `2–3` and `5–6` values remain **illustrative only** and must not be hard-coded, especially not onto Academy→Genin.

This work is Alpha-relevant but does not outrank the current tutorial playability wall.

## 4. 🟠 QUEUED — Writing / Story current-mission recall metadata

The Missions surface is repurposed to **Current Story Mission / Story Recall** rather than a side-mission selector.

Writing must publish compact machine-facing recall inputs for current Story state, including where legitimately authored:

- Arc ID/name;
- Mission ID/title;
- concise factual recap inputs/anchor;
- current objective / unresolved immediate pressure;
- safe completed-history recap metadata;
- explicit boundary against fabricated summary/history.

Writing does not own map access or World location identity.

After Writing returns, World owns the exact locator reference and current Main Story opportunity projection.

## 5. 🟠 QUEUED — World consolidated map/discovery/activation package

After the preceding exact inputs are available, route **one consolidated World package**, not multiple overlapping issues.

That package must close:

### A. Village / Region Info projection — Knowledge-relative denominator

The denominator is the currently legitimate **known Shinobi Record set**, not hidden World Truth.

Intended behavior:

- if the currently known/recorded set is fully resolved, a category may show `12 / 12`;
- when a new location/opportunity/event legitimately enters the player's Shinobi Record as known but unresolved/unvisited/incomplete, the denominator may increase first, e.g. `12 / 13`;
- once that newly known entry is legitimately resolved/completed, the projection may become `13 / 13`;
- hidden reservations do not contribute to the denominator merely to create a completion percentage.

Prefer separate counters where semantics differ rather than collapsing locations, opportunities, Record leads and other categories into one misleading total.

Define read-only projection fields for:

- known public/static geography where legitimately Record-visible;
- Chronicle-relative known/discovered locations;
- known active/tracked opportunities;
- Shinobi Record / Knowledge discovery feed entries;
- resolved/completed members of each known Record category;
- legal denominators derived only from the current known Record set.

`KON-A##` service subhosts are not automatically independent map locations.
`KON-S##` zero-leak reservations remain zero-leak until legitimately known.

Information-route continuity rule:

> If an unresolved lead becomes unavailable because the sole factual information carrier dies, disappears or otherwise ceases to be a legitimate source, UI must not silently regenerate that same lead. Any later resurfacing requires a **new causal source/occurrence** and a corresponding Shinobi Record update.

World/CE must reconcile this with existing regeneration / replacement / suppression semantics.

### B. Minimal Alpha map marker / halo grammar

Preserve stable location marker identity separately from overlays.

Main Story, development/training, discovery/Shinobi Record, threat, rarity/special and known-unknown presentation may only project from exact semantic source fields.

Colour/icon/rim/pulse does not manufacture event type, rarity, Knowledge or actionability.

The existing golden `????` known-unknown treatment must not be reused as Main Story by convenience.

### C. Current Main Story locator

Consume Writing's current-mission recall metadata and publish the exact World destination/opportunity reference used by `RETURN TO MAIN MISSION` / `LOCATE STORY`.

Locator/focus may reveal only legitimately known/access-authorised map context. It does not teleport, fabricate access or invent geography.

### D. Versioned Alpha executable activation manifest

Consume the durable 500-seed reservoir policy and publish only the currently executable Alpha subset.

Each row requires stable event/opportunity ID, host, eligibility, Knowledge/actionability, reward/no-reward authority, dependencies and current geometry reference.

`500 seeds designed != 500 executable quests`.

Coding must not scrape prose and infer activation.

## 6. 🟠 QUEUED — UI / Assets optional atmosphere pack

UI / Assets work is optional visual enhancement behind code-owned gameplay.

Current requested audit/asset families:

- Arena: four art panels, recommended `1344×600` PNG source masters;
- Training: three portrait panels, recommended `1024×1664` PNG source masters;
- Story/Mission scene-backdrop physical coverage against declared runtime IDs, existing contract `1920×1080`, 16:9, lower 35% dialogue-safe.

No baked text, numbers, labels, controls, progression values or semantic markers.

**Project image lock remains binding:** no generation/edit invocation without Stephen's exact phrase `generate now` in the active visual workspace.

This is not allowed to block code-owned Alpha functionality unless an exact runtime surface proves a required physical asset is missing.

## 7. 🟢 RECORD ONLY — Battle circular Battle-PL presentation

Coding owns the requested presentation change unless Combat identifies a semantic collision:

- current player actor: blue circular Battle PL meter;
- current enemy actor: red circular Battle PL meter;
- current Battle PL number inside circle;
- optional radial depletion against current/max Battle PL;
- transition with active participant;
- never aggregate team Battle PL into one health value;
- Battle PL remains runtime capability/depletion, not injury/HP.

No CE handoff required.

## 8. 🟠 QUEUE / PENDING STEPHEN RATIFICATION — GROUP / DEFEND / KAGE

Current repository recovery still shows no implementation-ready durable contract defining these three labels as distinct systems.

Coding has proposed the following clean non-overlapping split for Stephen's consideration:

- `GROUP` = cooperative PvE Super-Boss raid organised through small asynchronous/randomised village strike cells contributing to one persistent boss depletion state;
- `DEFEND` = village-vs-village asynchronous war / weekly competitive event;
- `KAGE` = persistent intra-village king-of-the-hill office challenge.

This proposal is **not yet durable system authority**.

Therefore:

- the ideas are **not retired**;
- current Alpha behavior remains hidden/fail-closed;
- old labels do not author semantics;
- Coding's proposed split must not be implemented as fact until Stephen ratifies it and owning contracts are authored;
- no speculative Alpha blocker is created from these future systems.

Once Stephen ratifies or rejects the proposed split, CE records the resulting design ownership/contract path. Until then: **WAITING ON STEPHEN DECISION IN CODING CONTEXT**, not waiting on implementation.

## 9. Owner-return sequence

Current routing order:

```text
Combat / Skills — Academy Menma tutorial + Alpha-active Combat slice
    ↓
PL / Registry / Rank — later-Rank difficulty-aware Promotion readiness
    ↓
Writing / Story — current-mission recall metadata
    ↓
World — one consolidated info/marker/locator/executable-manifest package
    ↓
UI / Assets — optional atmosphere audit/assets after semantic fields are exact
    ↓
Coding / Runtime — consume exact returned authority and validate installed browser
```

The order is a coordination priority, not permission for an idle owner to ignore already-authorised independent work.

CE may advance a queued lane earlier if the current SEND NOW owner returns or if new evidence makes another lane a true blocker.

GROUP / DEFEND / KAGE remain outside this Alpha owner-return sequence pending Stephen's explicit design decision.

## 10. Closure of source handoff

GitHub issue #106 is consumed once:

1. this coordination authority is committed;
2. the immediate Combat dependency is routed directly;
3. #106 receives exact commit + downstream issue evidence.

The queued work remains durable here and does not require Stephen to relay packets manually.
