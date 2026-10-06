# Shinobi Chronicles — Hokage Office / Chronicle Dispatch Interactive Hub Contract

**Date:** 2026-10-06  
**Owner:** CE / Codex / Coordination + Stephen  
**Status:** **BINDING SC ALPHA CONTRACT — DESIGN CLOSED**  
**Source:** #533  
**Consumes:** #449 Step 6, #515 discovery/rumour grammar, current Shinobi Record / Journey / World / Mission authority.

---

## 1. Core identity

The **Hokage Administration** is the institutional place/access context.

The **Hokage Office** is a real **interactive role / command surface** within that context. It is not merely a Story backdrop and is not a generic vendor screen.

**Chronicle Dispatch** is one function of that interactive office: the player's actionable rumour / lead / hotspot-navigation projection.

Preserve:

`location != interactive service != mission != opportunity != event occurrence`

---

## 2. Asset status

Recovered Hokage Office images are **REFERENCE / COMPOSITION MASTERS** for the interactive office.

They are not Scene backdrops and must not be treated as literal semantic state.

The masters contain baked example identities, Rank, reputation, assignments, reports and counts. Those values are illustrative only.

Canonical rule:

> **static office master = composition / visual blueprint**  
> **current Chronicle authority = dynamic office contents**

Do not leak example Sasuke/Minato/Naruto identity, Rank, assignments, reputation, reports or mission counts into ordinary runtime merely because a master contains them.

---

## 3. Entry and Story/role consumers

### Ordinary Konoha access

Step 6 may expose the Hokage Office through the existing Hokage Administration route/service when the player has legitimate access to that institutional surface.

Access to the office does not by itself grant access to every business tile inside it.

### Story / role access

Story, World or Mission callers may open the same office shell in a **caller-bound role context**.

The caller must supply or resolve authoritative context for:
- current office holder / Hokage identity where relevant;
- observer/player identity;
- role/institutional access;
- available business/actions;
- reports/assignments/dispatches visible to that observer;
- return/caller continuation.

Minato and Sasuke are confirmed legitimate **role/context variants**, not unconditional default office occupants.

Do not invent a Minato/Sasuke scene merely because those visual variants exist. A named office-holder presentation is legal only when current Story/World authority says that person occupies the relevant role in that occurrence/state.

A Story cutaway may use office presentation without making the player physically present or transferring Knowledge to the protagonist.

Preserve:

`player presentation != physical presence != observer Knowledge`

This closes the recovered Minato/Sasuke seam without requiring Step 6 to author future Story scenes that do not yet have an active caller.

---

## 4. Chronicle Dispatch role

> **Shinobi Record tells the Chronicle what has been learned/heard. Chronicle Dispatch helps the player act on sufficiently actionable known leads without blind map clicking.**

Separation:
- **Shinobi Record** — observer-bounded remembered Knowledge, rumours, evidence, hypotheses and provenance;
- **Chronicle Dispatch** — actionable attention/routing projection over legitimate known leads;
- **Journey** — committed current objective / journey state;
- **World Map** — spatial projection / navigation;
- **Mission / quest / side story / interaction / hotspot** — the actual content/occurrence type.

Dispatch owns none of those upstream truths.

It does not create rumours, events, missions or opportunities merely by opening/rendering.

---

## 5. Rumour-family counting

Visible `N/M` in Dispatch has one exact meaning:

> **N = distinct rumours in that family discovered by the relevant Chronicle/observer.**  
> **M = distinct rumour seeds currently issued for that family.**

Example:

`2/6` = 2 rumours found out of 6 currently issued.

`M` is not necessarily a hard cap.

A legitimate later Chronicle development may issue another related rumour seed, so:

`6/6 -> 6/7`

is legal without rewriting the six already discovered rumours.

A new seed may arise from a new witness/source, changed World Truth, connected event, provenance object, or a legitimate reseed after an earlier carrier/path becomes unavailable.

Presentation refresh/open/close cannot create a new seed or change `M`.

Preserve:

> **rumour-family completeness is provisional, not terminal.**

---

## 6. Dispatch read model / lifecycle

Chronicle Dispatch is a **projection**, not a new semantic state owner.

A projected dispatch row must be traceable to authoritative upstream refs sufficient to establish at least:
- stable dispatch projection key;
- rumour/opportunity family ref where applicable;
- issued rumour seed / source refs;
- observer-safe discovered/known state;
- current actionability;
- best legitimately known navigation target/precision;
- access state where known;
- underlying content/occurrence refs when they already exist;
- presentation attention state where required.

Exact runtime field names remain implementation-owned.

The only Dispatch-local persistence allowed by default is presentation/attention bookkeeping such as `viewed`, `acknowledged` or `pinned`, if needed for badges/navigation.

Such bookkeeping must not:
- discover a rumour;
- grant Knowledge;
- grant Access;
- commit an opportunity/event;
- change eligibility;
- reroll World Truth;
- clear an upstream rumour from history.

Upstream state changes recompute the projection.

---

## 7. Knowledge precision -> navigation precision

> **Knowledge precision determines navigation precision.**

A vague rumour may justify only a country/region focus.

Later Knowledge may justify a village, district, location cluster or exact hotspot.

Dispatch may expose controls such as `FOLLOW RUMOUR`, `TRACE LEAD`, `VIEW AREA` or equivalent which focus the most precise location legitimately known.

It must not:
- fabricate an exact map pin from vague Knowledge;
- reveal hidden coordinates;
- bypass unavailable geography/access;
- teleport through blocked access;
- commit the event/opportunity;
- consume the opportunity merely by viewing/focusing it.

Preserve:

`rumour != exact location`

`location Knowledge != Access`

`hotspot identified != event guaranteed`

`eligibility != occurrence != success`

---

## 8. Step-6 Alpha office business

The recovered master contains more concepts than Step 6 is allowed to implement automatically.

### ACTIVE / REQUIRED FOR STEP 6

1. **Chronicle Dispatch** — actionable lead/hotspot navigation projection described above.
2. **Missions** — institutional front door into current authorised Mission/Main-Story assignment flows; it consumes existing Mission/Story authority and does not invent missions.
3. **Current / Active Assignment summary** — read-only projection of actual current Mission/Journey state where available.
4. **Your Information** — read-only current identity/formal Rank/other already-authoritative player facts; `Name != Card Title != Formal Rank`.

### ACTIVE ONLY WHEN REAL SOURCE DATA EXISTS

5. **Village Status / Village Reports** — read-only projections of exact current World/institutional state. Unknown/unimplemented metrics are omitted or shown unknown; never fabricated from the concept art.
6. **Office Announcements** — exact real notices from current authoritative systems only; no decorative fake alerts.
7. **Examinations** — may navigate to the existing Exams system where current access permits. It does not create a second Exams owner.
8. **Village Records / Shinobi Record access** — may route to the current appropriate record surface where authorised; Chronicle Dispatch remains distinct from the Record itself.

### NOT ACTIVATED BY #533 / STEP 6 ALONE

9. **Promotions** — Step 7 / Promotion authority; do not reactivate the old flat checklist as final simply because the tile exists.
10. **Village Affairs** — fail closed until exact authorised content exists.
11. **Diplomacy** — fail closed until exact authorised content exists.
12. **Special Assignments** — fail closed until exact authorised content exists.

A concept tile may be absent, disabled or clearly unavailable. The raster/master does not create gameplay authority.

---

## 9. Village Status / Reports ownership

Hokage Office is a consumer/projection only.

It must not create a second `villageState`, threat model, economy state, mission store, Rank source or reputation source.

Each displayed field must resolve to an existing authoritative owner.

If no authoritative owner/value exists, fail closed:
- omit field; or
- display `Unknown`/`Unavailable` where appropriate.

Never infer values from baked visual labels such as `Stable`, `High`, `Excellent`, `Low`, example mission counts or example reputation totals.

---

## 10. Role-specific presentation

The office shell is one semantic/presentation system with caller/state-driven variation.

Dynamic presentation may vary:
- office holder portrait/name/title;
- institutional banners/theme where current World/Story authority permits;
- available business;
- notices/reports;
- observer/player information;
- Chronicle Dispatch contents.

Do not create separate semantic Hokage Office systems for Minato, Sasuke, Naruto or future office holders.

The same office shell must remain able to project a Story cutaway, institutional hub, or role-specific command context without collapsing their presence/Knowledge semantics.

---

## 11. CE status

For Shinobi Chronicles, **Chronicle Dispatch is now design-closed as an SC gameplay surface**.

The reusable higher-order idea — emergent world developments surfacing into a role/location as actionable attention — remains a useful CE research/design pattern, but #533 does **not** by itself promote a generic `Chronicle Dispatch` UI/system into the reusable Chronicle Engine Bible.

Reusable CE promotion requires separate CE Research / Bible reconciliation.

This prevents game-specific UI terminology from becoming engine canon accidentally.

---

## 12. Step-6 Coding acceptance

Coding may implement one bounded Step-6 slice after this contract is merged.

Minimum proof:
- Hokage Administration can open one interactive Hokage Office shell;
- no literal baked office-master state becomes runtime truth;
- current office holder/observer data is caller/state driven;
- Missions routes through existing Mission authority;
- Chronicle Dispatch projects at least one real authorised known lead/rumour/hotspot source without creating it;
- `N/M` rumour count consumes real issued/discovered seed state where used;
- Dispatch map focus respects Knowledge precision and does not grant Access/commit the event;
- open/close/reload does not reroll or recommit World/rumour/Mission state;
- unsupported business tiles fail closed;
- save/load preserves legitimate upstream state and only permitted presentation-attention bookkeeping;
- Story/cutaway use does not imply protagonist physical presence or Knowledge transfer;
- no second Mission, Exams, Promotion, Shinobi Record, Journey or World-state owner is created.

Owner browser acceptance remains required before Step 6 is Golden.

---

## 13. Final lock

> **Hokage Office is a real interactive institutional/role surface. Chronicle Dispatch is the actionable navigation projection for legitimate known rumours/leads/hotspots. It helps the player find where to look without becoming an omniscient quest marker, a second Shinobi Record, a second Journey, or a generator of World Truth.**
