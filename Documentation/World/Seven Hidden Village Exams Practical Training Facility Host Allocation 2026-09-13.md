# Shinobi Chronicles — Seven Hidden Village Exams / Practical / Training Facility Host Allocation

**Date:** 2026-09-13  
**Owner:** World / Missions / Events / Rewards  
**Source:** GitHub #57  
**Status:** **BINDING WORLD SERVICE-HOST AUTHORITY — SEMANTIC HOSTS CLOSED; NON-KONOHA PIXEL CALIBRATION / RUNTIME CONSUMPTION SEPARATE**

---

## 1. Purpose

This document closes the physical World-host question for the existing **EXAMS**, **PRACTICAL**, sparring, mentorship and weapons-proficiency surfaces across the seven production Hidden Villages:

- Konohagakure;
- Sunagakure;
- Iwagakure;
- Kirigakure;
- Kumogakure;
- Amegakure;
- Kusagakure.

It does **not** create new Exams/Practical/Progression systems.

Core structure:

`Village Academy / shinobi instruction campus`
→ `Examination Hall / Archive` service host
→ eligible discipline-exam opportunity

and separately:

`Village General Training Grounds`
→ `Practical Compound` / sparring / mentorship / weapons-proficiency subcontexts
→ currently eligible training opportunity.

Preserve:

> **location != opportunity != exam attempt != development != Promotion**

---

## 2. Canon Research First note

Current official Naruto/Boruto material was checked before this cross-village allocation.

Relevant baseline anchors:

- NARUTO Official identifies the Hidden Sand, Hidden Stone, Hidden Mist and Hidden Cloud as distinct major Hidden Villages with their own Kage/institutional identities in Five-Kage material:  
  `https://naruto-official.com/en/news/01_1321`
- NARUTO Official depicts the Hidden Rain as a distinct infiltrated village with its own controlled village geography:  
  `https://naruto-official.com/en/anime/naruto2/list/01_573`
- BORUTO Official depicts an Academy class travelling to the Hidden Mist, reinforcing that `Academy` is a genuine shinobi-training institution in the setting while not proving that every village uses the exact same campus/facility layout:  
  `https://naruto-official.com/en/anime/boruto/list/01_969`
- Original-series official Story material establishes inter-village Chūnin Exam participation, but this contract deliberately does **not** treat the current Shinobi Exams UI as the Chūnin Exams or formal Rank Promotion:  
  `https://naruto-official.com/en/anime/naruto1/list/01_244`

The exact non-Konoha Academy/Training facility names below are therefore **Shinobi Chronicles functional World geography**, not claims that manga canon gave each village an identically named building.

Rule:

> **canon anchors the institutional ninja-world premise; Shinobi Chronicles authors the reusable service geography.**

---

## 3. Stable semantic address grammar

Non-Konoha facility identities use stable semantic refs that survive later pixel recalibration:

```text
village:<village>:academy
village:<village>:academy:examination_archive
village:<village>:training_grounds
village:<village>:training_grounds:practical_compound
village:<village>:training_grounds:sparring_court
village:<village>:training_grounds:mentorship_area
village:<village>:training_grounds:weapons_range
village:<village>:training_grounds:terrain_practice
```

These are **World semantic service addresses**, not a claim that each subcontext requires a separate building, icon or marker.

Later village hotspot calibration may bind these semantic refs to village-specific `P/A/O/...` IDs without changing the service identity.

Konoha already has stronger exact local IDs; §5 maps the generic grammar to those existing authorities.

---

## 4. Universal service-host semantics

### 4.1 Academy

Default state:

- stable public/ordinary institutional geography once the village itself is legitimately known and accessible;
- location identity may be known without any current Exam opportunity;
- ordinary Academy access does not automatically grant every record, room, exam or instructor interaction.

### 4.2 Examination Hall / Archive

Default state:

- internal Academy service host;
- not automatically a separate top-level village-map marker;
- may be projected in Academy detail/navigation when current observer/access state permits;
- current discipline Exam opportunities appear only when the owning Exams/Progression authority makes them eligible/actionable.

Hard boundary:

**Shinobi Exams service != Chūnin Exam != Rank Promotion.**

### 4.3 General Training Grounds

Default public training geography for:

- Practical;
- routine sparring;
- default mentorship meetings/drills;
- weapons proficiency;
- ordinary obstacle/movement/terrain training where appropriate.

A single compound may contain all these contexts without becoming one universal action.

### 4.4 Practical Compound

Practical is a dedicated **subcontext** of the General Training Grounds, not the Academy Exam room.

Opening the Practical UI is presentation/action routing into an already-authorised service context. It does not itself commit training/development.

### 4.5 Sparring

Sparring court/open field is a separate activity context. Sparring availability depends on legitimate partners/caller state and any owning Battle/Progression requirements.

### 4.6 Mentorship

The default mentorship area is a convenient stable training host, not a rule that every mentor scene occurs there.

An authored mentor may legitimately train elsewhere when Story/World context supports it.

### 4.7 Weapons proficiency

Weapons range/target lane is a service context for proficiency training.

It is not:

- the Forge;
- equipment ownership;
- crafting;
- weapon repair;
- automatic weapon Skill Access.

### 4.8 Terrain practice

A village may use local terrain vocabulary inside/adjacent to its training complex—sand, rock, water, elevation, rain-slick urban geometry, vegetation, etc.—without converting environment art into automatic Skill mechanics.

Exact Technique/Skill effects remain owner-authorised.

---

# PART II — VILLAGE ALLOCATION

## 5. Konohagakure

Production master:

`Backgrounds/konoha.png`

Existing Konoha v3 authority remains primary.

| Function | Stable World host |
|---|---|
| Academy | `KON-P06` Shinobi Academy / alias `village:konoha:academy` |
| Exams | `KON-A01` Academy Examination Hall / alias `village:konoha:academy:examination_archive` |
| General Training | `KON-P07` General Training Ground / alias `village:konoha:training_grounds` |
| Practical | `KON-A02` Practical Training Compound |
| Sparring | `KON-A03` Sparring and Mentorship Court |
| Mentorship | `KON-A03` default, with authored alternate locations permitted |
| Weapons proficiency | `KON-P08` Weapons Training Ground + `KON-A04` Weapons Proficiency Range |
| Terrain practice | contextual space inside `KON-P07/P08`; no new location required |
| Formal Arena | `KON-P02` Konoha Arena; separate from routine training |
| Restricted special training | `KON-S01` Forest of Death / Training Ground 44 only when exact Story/exam/mission/institutional access authorises it |

No Konoha art revision required.

---

## 6. Sunagakure

Production village master exists at:

`Backgrounds/suna.png`

Binding semantic hosts:

| Function | Stable ref | SC physical interpretation |
|---|---|---|
| Academy | `village:suna:academy` | Sunagakure shinobi Academy/instruction campus within ordinary village institutional geography |
| Exams | `village:suna:academy:examination_archive` | internal Examination Hall / records room |
| General Training | `village:suna:training_grounds` | dedicated village training compound/terrace |
| Practical | `village:suna:training_grounds:practical_compound` | practical training court within compound |
| Sparring | `village:suna:training_grounds:sparring_court` | open sparring court |
| Mentorship | `village:suna:training_grounds:mentorship_area` | shaded/instruction area or equivalent compound subcontext |
| Weapons | `village:suna:training_grounds:weapons_range` | target/tool/weapon practice lane |
| Terrain | `village:suna:training_grounds:terrain_practice` | sand/hard-ground/canyon-edge training context where local geometry permits |

Arena relationship: no separate top-level Sunagakure Arena identity is created by this contract. Formal competitions may use a separately authored future venue or a temporary controlled training-ground configuration without redefining routine training.

Restricted-special relationship: none created by default. Do not invent a Suna equivalent of the Forest of Death merely for symmetry.

Art disposition: **reuse current village master; no revision request.** Exact pixel anchors are deferred to village hotspot calibration.

---

## 7. Iwagakure

Production village master exists at:

`Backgrounds/iwa.png`

| Function | Stable ref | SC physical interpretation |
|---|---|---|
| Academy | `village:iwa:academy` | Iwagakure Academy/instruction campus |
| Exams | `village:iwa:academy:examination_archive` | internal Examination Hall / archive |
| General Training | `village:iwa:training_grounds` | dedicated training terrace/compound |
| Practical | `village:iwa:training_grounds:practical_compound` | practical court |
| Sparring | `village:iwa:training_grounds:sparring_court` | reinforced/open sparring area |
| Mentorship | `village:iwa:training_grounds:mentorship_area` | instruction subcontext |
| Weapons | `village:iwa:training_grounds:weapons_range` | target/weapon lane |
| Terrain | `village:iwa:training_grounds:terrain_practice` | rock/elevation/obstacle practice where local geometry permits |

Arena relationship: no new top-level Arena identity in this contract.

Restricted-special relationship: none by default; quarry/canyon/cave-style future special training must be separately authored and Knowledge/access-gated rather than inferred from terrain art.

Art disposition: **reuse current village master; no revision request.**

---

## 8. Kirigakure

Production village master exists at:

`Backgrounds/kiri.png`

| Function | Stable ref | SC physical interpretation |
|---|---|---|
| Academy | `village:kiri:academy` | Kirigakure Academy/instruction campus |
| Exams | `village:kiri:academy:examination_archive` | internal Examination Hall / archive |
| General Training | `village:kiri:training_grounds` | village training compound |
| Practical | `village:kiri:training_grounds:practical_compound` | practical training court |
| Sparring | `village:kiri:training_grounds:sparring_court` | sparring area |
| Mentorship | `village:kiri:training_grounds:mentorship_area` | instruction subcontext |
| Weapons | `village:kiri:training_grounds:weapons_range` | weapons lane |
| Terrain | `village:kiri:training_grounds:terrain_practice` | water/wet-ground/visibility practice where actual local geometry and owning mechanics permit |

Historical/canon brutality associated with particular eras of Kirigakure must **not** be inferred as the current SC Academy curriculum merely from village identity. Exact era/Recorded History outranks stereotype.

Arena relationship: no new top-level Arena identity here.

Restricted-special relationship: none by default. Any dangerous historical testing ground requires separate authored current-state authority.

Art disposition: **reuse current village master; no revision request.**

---

## 9. Kumogakure

Production village master exists at:

`Backgrounds/kumo.png`

| Function | Stable ref | SC physical interpretation |
|---|---|---|
| Academy | `village:kumo:academy` | Kumogakure Academy/instruction campus |
| Exams | `village:kumo:academy:examination_archive` | internal Examination Hall / archive |
| General Training | `village:kumo:training_grounds` | stable training terrace/compound |
| Practical | `village:kumo:training_grounds:practical_compound` | practical court |
| Sparring | `village:kumo:training_grounds:sparring_court` | sparring area |
| Mentorship | `village:kumo:training_grounds:mentorship_area` | instruction subcontext |
| Weapons | `village:kumo:training_grounds:weapons_range` | weapons lane |
| Terrain | `village:kumo:training_grounds:terrain_practice` | elevation/ridge/vertical-movement practice where actual geometry/mechanics permit |

Arena relationship: no new top-level Arena identity here.

Restricted-special relationship: none by default. Dangerous mountain/pass training is separately authored content, not automatically accessible because the village is mountainous.

Art disposition: **reuse current village master; no revision request.**

---

## 10. Amegakure

Production village master exists at:

`Backgrounds/ame.png`

The current SC functional institution is deliberately named without asserting that canon supplied an identical campus layout.

| Function | Stable ref | SC physical interpretation |
|---|---|---|
| Academy | `village:ame:academy` | Amegakure shinobi instruction/Academy host |
| Exams | `village:ame:academy:examination_archive` | internal Examination Hall / records host |
| General Training | `village:ame:training_grounds` | controlled village training compound |
| Practical | `village:ame:training_grounds:practical_compound` | practical court |
| Sparring | `village:ame:training_grounds:sparring_court` | covered/open sparring area as local layout supports |
| Mentorship | `village:ame:training_grounds:mentorship_area` | instruction subcontext |
| Weapons | `village:ame:training_grounds:weapons_range` | target/weapon lane |
| Terrain | `village:ame:training_grounds:terrain_practice` | rain-slick/urban/elevation practice only where current conditions and mechanics permit |

Arena relationship: no new top-level Arena identity.

Restricted-special relationship: none by default. Hidden-Rain surveillance/security history must not become a generic secret-training permission system.

Art disposition: **reuse current village master; no revision request.**

---

## 11. Kusagakure

Production village master exists at:

`Backgrounds/kusa.png`

The exact training campus is SC-authored service geography unless later canon research closes a more specific retained anchor.

| Function | Stable ref | SC physical interpretation |
|---|---|---|
| Academy | `village:kusa:academy` | Kusagakure shinobi Academy/instruction host |
| Exams | `village:kusa:academy:examination_archive` | internal Examination Hall / archive |
| General Training | `village:kusa:training_grounds` | village training compound/field |
| Practical | `village:kusa:training_grounds:practical_compound` | practical court |
| Sparring | `village:kusa:training_grounds:sparring_court` | sparring area |
| Mentorship | `village:kusa:training_grounds:mentorship_area` | instruction subcontext |
| Weapons | `village:kusa:training_grounds:weapons_range` | target/weapon lane |
| Terrain | `village:kusa:training_grounds:terrain_practice` | vegetation/field/obstacle practice where actual geometry permits |

Arena relationship: no new top-level Arena identity.

Restricted-special relationship: none by default. Forest/grassland geography does not become secret or restricted simply because it visually exists.

Art disposition: **reuse current village master; no revision request.**

---

# PART III — KNOWLEDGE / ACCESS / ACTIONABILITY

## 12. Observer-safe projection

For each village:

### Academy / Training Grounds identity

When the village's ordinary civic/shinobi geography is legitimately known:

- Academy and General Training Grounds may be treated as stable known institutional destinations once their specific location identity is learned through ordinary village Knowledge;
- they do not require an active opportunity to remain known;
- exact map marker/pixel projection remains village-calibration/runtime authority.

### Service subcontexts

Exam Hall, Practical Compound, sparring court, mentorship area and weapons range are normally internal service contexts.

They need not all appear as permanent village-map markers.

Opening a known parent destination may expose legal internal actions/subhosts according to current Access.

### Actionability

A visible/known service host does not mean every action is usable.

Examples:

- Exam Hall known + no eligible discipline exam → no active exam opportunity;
- Practical Compound known + development route unavailable → no eligible practical action;
- Training Grounds known + no mentor available → mentorship action absent/not actionable;
- Weapons Range known + weapon/proficiency prerequisites missing → exact specialist action absent/not actionable.

Do not expose hidden prerequisites as greyed recipe text unless another UI/Progression authority explicitly authorises that disclosure.

---

## 13. Access model

Recommended World access classes:

- `PUBLIC_INSTITUTIONAL` — ordinary village civic/shinobi access where current visitor/service rules allow;
- `SERVICE_CONDITIONAL` — parent location accessible but the particular activity requires owner-authorised eligibility;
- `STORY_TEMPORARY` / `ESCORTED_TEMPORARY` — exact Story route provides temporary access without changing general return entitlement;
- `RESTRICTED_SPECIAL` — special dangerous/restricted ground requiring an exact authored access source.

Academy/Training public geography does not bypass village-level travel/security/access state.

---

## 14. Arena rule

Only Konoha currently has a fully calibrated World Arena host in this contract (`KON-P02`).

For the other six villages:

- do not mint a permanent Arena merely for symmetry;
- formal competitions may later bind to a separately calibrated venue if one exists;
- an authored temporary competition may use controlled Training Grounds only if World/Story explicitly binds it;
- the generic Shinobi Exams service does not require an Arena.

---

## 15. Restricted-special geography rule

Only Konoha's already-authoritative `KON-S01` Forest of Death / Training Ground 44 is bound here as a restricted-special training destination.

For other villages:

- no automatic mirror equivalent;
- future dangerous training sites must have their own World identity, Knowledge, access and occurrence contracts;
- dramatic terrain on an image does not create restricted geography or opportunity truth.

---

## 16. Art / geometry disposition

Current production village masters are present on `main`:

- `Backgrounds/konoha.png`
- `Backgrounds/suna.png`
- `Backgrounds/iwa.png`
- `Backgrounds/kiri.png`
- `Backgrounds/kumo.png`
- `Backgrounds/ame.png`
- `Backgrounds/kusa.png`

This semantic allocation intentionally reuses existing village geography and does **not** require each internal service to be visibly represented by a unique baked building.

Therefore current World disposition is:

> **NO UI/ASSETS REVISION REQUESTED BY #57.**

Non-Konoha exact pixel anchors/interaction regions remain a later village hotspot-calibration task. If that physical calibration proves a specific master genuinely cannot host a believable Academy or training compound, only then should World create a narrow UI/Assets revision request with exact evidence.

Do not regenerate village art pre-emptively.

---

## 17. Runtime routing rule

Convenience functions such as Konoha Exam/Practical navigation may remain temporary presentation routes, but long-term world-facing routing should resolve:

`current village`
→ exact known/access-authorised Academy or Training Grounds semantic host
→ exact internal service context
→ owning Exams/Practical/Training surface.

That route must not:

- create a location merely by clicking the UI;
- grant village access;
- grant Exam/Practical eligibility;
- commit development;
- trigger Promotion;
- reroll opportunities.

---

## 18. Completion status

Closed by this document:

- stable Academy semantic host for all seven villages;
- stable Exam subhost for all seven villages;
- stable General Training / Practical host for all seven villages;
- default sparring / mentorship / weapons contexts;
- Konoha Arena and Forest-of-Death relationships;
- non-Konoha no-symmetry Arena/restricted-site rule;
- Knowledge/access/actionability semantics;
- current no-art-revision disposition.

Separate:

- non-Konoha village pixel hotspot calibration;
- Coding world-facing service routing;
- exact Exams/Practical eligibility and development consequences;
- formal Rank/Promotion content;
- Battle/sparring semantics;
- UI/Assets revision only if later calibration proves a real visual blocker.

Canonical shorthand:

> **Reuse the village. Reuse the campus. Keep the activities distinct.**
