# Shinobi Chronicles — Character Card Acquisition Source Portfolio and Availability Contract

**Date:** 2026-10-07  
**Owner:** Acquisition / Character Systems  
**Status:** **BINDING ACQUISITION PORTFOLIO — SOURCE TAXONOMY + FIRST BOUNDED EXACT MATRIX CLOSED / FUTURE ROW AUTHORING SEPARATE**  
**Source handoff:** GitHub #540

## 1. Purpose

This contract closes the project-wide Character Card acquisition-source gap exposed by #540.

The first Alpha Character Card Shop remains valid, but it is only **one** acquisition source.

Canonical:

> **Character Cards must not all be attainable in a Shop.**

> **Registry existence != acquisition availability != source eligibility != currently available != owned != assigned != deployed.**

This contract defines the reusable source-family taxonomy, authoring state model, provenance law, and the first exact production matrix that current Alpha/pre-Alpha systems can consume without inventing routes for the rest of the Registry.

It consumes and preserves:

- #520 / `Documentation/Acquisition/Alpha Konoha Character Card Shop Retail Acquisition Contract 2026-10-04.md`;
- #522 / `Documentation/Coordination/Chronicle_Protagonist_Lineage_Promotion_and_Team_Separation_Contract_2026-10-05.md`;
- `Documentation/Acquisition/Dynamic Genin Roster Candidate and CE Team Preparation Contract 2026-09-10.md`;
- `Documentation/Acquisition/Genin Roster Transition Recruitment and Retention Edge Closure 2026-09-10.md`;
- `Documentation/Coordination/Genin Roster Candidate Content Policy v2 2026-09-11.md`;
- generic `commitCharacterAcquisition(...)` ownership semantics;
- one-owned-copy-per-exact-representation default;
- Canon Research First protocol #134 for any future canon-derived source authoring.

This document does **not** assign every Registry Character an acquisition route.

Where no exact route exists, the correct state is:

`UNASSIGNED / NOT YET AUTHORED`

not a guessed Shop listing, mission reward, relationship unlock, or generic progression grant.

---

# 2. Acquisition source-family taxonomy

The following source-family IDs are the reusable Acquisition classification layer. A concrete Character representation may have zero, one, or several independently authorised source rows.

## `origin_selection`

The exact selected Origin representation becomes the Chronicle protagonist lineage through the authoritative Origin-start transaction.

This is a Character ownership source.

It does not imply that the other Origin representations occurred.

## `formation_recruitment`

A formal team/formation transaction may acquire exact selected Characters when the formation contract explicitly authorises acquisition.

Current Alpha example:

- mandatory Academy Team Formation acquires exactly the two confirmed non-Origin Academy teammates.

Formation candidacy alone does not create ownership.

## `retail_purchase`

An exact authored Shop catalogue may sell exact Character representations at exact authored prices and access gates.

Current Alpha concrete route:

`retail_character_card_shop`

Retail membership is explicit and never derived from Registry, Rank, PL, rarity, card art, or UI order.

## `contextual_recruitment`

An exact current Story/World/Mission/team-state context may expose a recruitment opportunity for an exact representation.

Recruitment requires its own explicit acceptance/commit boundary and current eligibility validation.

Current Alpha concrete route:

`genin_roster_transition_recruitment`

Contextual recruitment creates/reuses ownership but does not automatically assign or deploy the Character.

## `story_chronicle_award`

An exact Story / Chronicle outcome may create a Character acquisition entitlement or direct acquisition consequence **only when that exact consequence is authored**.

Story completion, dialogue, mercy, kill, capture, romance, friendship, or branch choice do not create Character ownership by implication.

## `mission_institutional_award`

An exact Mission, Village, faction, command, examination, or institutional outcome may award or make available an exact Character representation when a durable reward/acquisition contract explicitly says so.

Mission completion by itself is not a Character acquisition source.

## `world_event_recruitment`

An exact World opportunity, hotspot, encounter, hidden event, or persistent-contact occurrence may create recruitment availability or ownership when explicitly authored.

Encountering a Character does not itself make them collectible.

## `relationship_recruitment`

Relationship / Shared History / trust / allegiance facts may be prerequisites for an authored recruitment opportunity.

Relationship state alone does not create ownership.

Unless an exact route explicitly commits ownership as the relationship consequence, there must still be a distinct acquisition/recruitment commit.

## `challenge_achievement_entitlement`

An exact challenge, achievement, difficulty completion, tournament, special objective, or similar authored accomplishment may create a Character acquisition entitlement where separately authorised.

This family is available to future authoring but has **no new exact Alpha Character rows assigned by this contract**.

Achievement existence does not imply a Character reward.

## `lineage_promotion_transition`

This is included in the portfolio because #522 permits an owned Character lineage to advance into an authorised rank-stage representation.

It is **not a fresh ownership grant**.

Canonical:

- ownership cardinality delta = **0**;
- persistent lineage/history/provenance remains the same;
- formal Rank authority comes from Promotion;
- representation-stage transition requires exact authorised target mapping;
- `commitCharacterAcquisition(...)` must not mint a second lineage merely because Promotion changes representation stage.

No exact Academy→Genin representation target mapping is newly authored by this document.

## `direct_authored_grant`

A narrowly authored system may grant an exact Character directly when no more specific source family fits.

This is an escape hatch for explicit production authority, **not** a fallback for missing design.

It requires exact representation, causal source, commit boundary, and provenance.

## `unassigned_not_yet_authored`

The exact representation has no current acquisition source authored.

It may exist in Registry, assets, Story, combat, candidate research, or future planning while remaining unavailable for player ownership.

This is a first-class valid state.

---

# 3. Things that are NOT acquisition sources by default

None of the following creates Character ownership without a separate exact acquisition row:

- Registry admission;
- collectible-card asset existence;
- UI portrait existence;
- Rank;
- PL;
- rarity;
- currentTeam need;
- same-person representation existence;
- being seen in Story/World;
- Battle victory;
- defeating/capturing/sparing/killing somebody;
- mission completion;
- event eligibility;
- relationship / Shared History existence;
- candidate-snapshot inclusion;
- Jōnin/Special-Jōnin leader assignment;
- Battle deployment;
- Promotion alone;
- Evolution alone;
- reward preview;
- Shop browse/listing/hover/selection;
- UI presentation.

Canonical:

> **availability needs an authored source; ownership needs a committed acquisition or lineage-preserving transition.**

---

# 4. Source-row state model

Every exact Character acquisition row must resolve one of these authoring states:

## `AUTHORISED_ACTIVE`

The source is authored and its current gates can be evaluated now.

## `AUTHORISED_CONDITIONAL`

The source is authored, but current availability depends on an exact Chronicle/world/snapshot/relationship/institutional predicate.

## `ENTITLEMENT_PENDING_COMMIT`

A qualifying source has created an entitlement, but ownership has not committed yet.

## `OWNED`

The exact representation/lineage is already owned. Default cardinality is one owned copy per exact representation ID unless a future explicit exception says otherwise.

## `LINEAGE_TRANSITION_ONLY`

The route changes an already-owned lineage's representation stage and creates no additional owned copy.

## `UNASSIGNED_NOT_YET_AUTHORED`

No acquisition source exists yet.

## `EXPLICITLY_UNAVAILABLE`

Current authority deliberately makes the exact representation unavailable for the relevant source/context.

`EXPLICITLY_UNAVAILABLE` requires attributable authority; do not use it as a generic unexplained boolean.

---

# 5. Required source-row schema

A production acquisition-source row must preserve enough authority to answer why ownership is possible and why it committed.

Minimum semantic fields/concepts:

- exact `representationId`;
- `sourceFamily`;
- exact route/source ID where one exists;
- authoring status;
- current availability gates / predicate refs;
- causal occurrence / transaction / entitlement ref where applicable;
- explicit player acceptance where the route requires it;
- ownership commit mode:
  - `fresh_or_reuse_exact_representation`, or
  - `lineage_transition_no_new_copy`;
- ownership commit owner / consuming system;
- idempotency identity;
- acquisition provenance;
- implementation status;
- authority version/policy ID when relevant.

Presentation can explain a source row. Presentation cannot create one.

---

# 6. Universal ownership / idempotence law

Default collectible cardinality remains:

> **one owned copy per exact representation ID unless an explicit future exception says otherwise.**

Therefore:

- two different legitimate routes may target the same exact representation;
- the first successful route may create ownership;
- a later legitimate route must not mint a duplicate exact representation merely because its own source occurred;
- the later source may still commit its own factual Chronicle/reward/recruitment history where appropriate;
- same-intent/source retry must return the prior ownership result idempotently;
- acquiring one representation does not grant another representation of the same person;
- distinct representations of the same person may coexist as separate owned lineages under #522;
- singular external sources remain governed by their own anti-duplication/reservation rules.

---

# 7. First bounded exact representation matrix — Academy cohort

All ten Academy Origin representations currently have multiple legitimate acquisition paths.

| exact representation | acquisition status | authorised source family/families | availability / gates | ownership commit owner | required provenance | implemented? |
|---|---|---|---|---|---|---|
| `academy_hinata` | AUTHORISED_ACTIVE | `origin_selection`; `formation_recruitment`; `retail_purchase` | Origin only if selected; Formation only if selected as one of exact two teammates; Retail after Origin + Active Konoha + Academy Team Formation | Acquisition / existing opening or retail transaction | exact Origin selection OR formation occurrence OR retail purchase occurrence | YES — current opening + retail runtime; Golden status not reasserted here |
| `academy_izuno` | AUTHORISED_ACTIVE | `origin_selection`; `formation_recruitment`; `retail_purchase` | same cohort gates | Acquisition / existing opening or retail transaction | exact Origin selection OR formation occurrence OR retail purchase occurrence | YES |
| `academy_kushina` | AUTHORISED_ACTIVE | `origin_selection`; `formation_recruitment`; `retail_purchase` | same cohort gates | Acquisition / existing opening or retail transaction | exact Origin selection OR formation occurrence OR retail purchase occurrence | YES |
| `academy_menma` | AUTHORISED_ACTIVE | `origin_selection`; `formation_recruitment`; `retail_purchase` | same cohort gates | Acquisition / existing opening or retail transaction | exact Origin selection OR formation occurrence OR retail purchase occurrence | YES |
| `academy_mirai` | AUTHORISED_ACTIVE | `origin_selection`; `formation_recruitment`; `retail_purchase` | same cohort gates | Acquisition / existing opening or retail transaction | exact Origin selection OR formation occurrence OR retail purchase occurrence | YES |
| `academy_kurenai` | AUTHORISED_ACTIVE | `origin_selection`; `formation_recruitment`; `retail_purchase` | same cohort gates | Acquisition / existing opening or retail transaction | exact Origin selection OR formation occurrence OR retail purchase occurrence | YES |
| `academy_iwabee` | AUTHORISED_ACTIVE | `origin_selection`; `formation_recruitment`; `retail_purchase` | same cohort gates | Acquisition / existing opening or retail transaction | exact Origin selection OR formation occurrence OR retail purchase occurrence | YES |
| `academy_metal_lee` | AUTHORISED_ACTIVE | `origin_selection`; `formation_recruitment`; `retail_purchase` | same cohort gates | Acquisition / existing opening or retail transaction | exact Origin selection OR formation occurrence OR retail purchase occurrence | YES |
| `academy_kakashi` | AUTHORISED_ACTIVE | `origin_selection`; `formation_recruitment`; `retail_purchase` | same cohort gates | Acquisition / existing opening or retail transaction | exact Origin selection OR formation occurrence OR retail purchase occurrence | YES |
| `academy_obito` | AUTHORISED_ACTIVE | `origin_selection`; `formation_recruitment`; `retail_purchase` | same cohort gates | Acquisition / existing opening or retail transaction | exact Origin selection OR formation occurrence OR retail purchase occurrence | YES |

### Academy retail specifics remain unchanged

Retail policy:

`alpha_konoha_character_card_shop_v1`

Retail route:

`retail_character_card_shop`

Retail price:

**100 Ryō each**

This contract does not expand that Shop beyond the exact ten rows.

---

# 8. First bounded exact representation matrix — Genin v2 recruitment universe

The following exact 38 representations are authorised for the **conditional** source family `contextual_recruitment` through the existing production route:

`genin_roster_transition_recruitment`

A row is currently recruitable only when the exact active `geninRosterTransition` snapshot contains that representation in `teammateCandidateVariantIds`, the candidate still resolves `available`, the expected snapshot is current, and all current recruitment/collision gates pass.

Candidate-universe membership alone does not grant ownership and does not guarantee inclusion in a concrete snapshot.

For historical v1 lineages, the first 13 rows remain the exact v1 universe. New transition lineages using published/activated v2 draw from all 38 before Chronicle-relative filtering.

| exact representation | acquisition status | authorised source family / route | availability / gates | ownership commit owner | required provenance | implemented? |
|---|---|---|---|---|---|---|
| `genin_boruto` | AUTHORISED_CONDITIONAL | `contextual_recruitment` / `genin_roster_transition_recruitment` | current authoritative snapshot inclusion + available + explicit recruit acceptance | Acquisition via `commitCharacterAcquisition(...)` | transition lineage + snapshot ID + recruitment acceptance occurrence + candidate policy | YES source/runtime; #63 validation lane remains separate |
| `genin_chocho` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_himawari` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_hinata` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_hoki` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_karin` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_menma` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_mikoto` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_mitsuki` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_naruto` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_orochimaru` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_sarada` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_sasuke` | AUTHORISED_CONDITIONAL | same | same | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_hashirama` | AUTHORISED_CONDITIONAL | same | v2 lineage + current snapshot inclusion + available + explicit recruit acceptance | same | same, pinned to v2 policy | YES source/runtime; #63 validation lane remains separate |
| `genin_hiruzen` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_mito` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_tsunade` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_sakumo` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_duy` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_guy` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_rin` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_dan` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_nawaki` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_shizune` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_yamato` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_sai` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_kagami` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_danzo` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_torifu` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_inoichi` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_choza` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_shibi` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_tsume` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_hiashi` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_yugao` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_hayate` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_mukai` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |
| `genin_kosuke` | AUTHORISED_CONDITIONAL | same | same v2 gates | same | same | YES source/runtime; #63 validation lane remains separate |

Recruitment semantics remain:

- inclusion -> opportunity may be available;
- inclusion != ownership;
- explicit recruit acceptance -> acquire/reuse exact representation;
- acquisition != assignment;
- stale snapshot -> no acquisition;
- already-owned -> reuse exact ownership, no duplicate;
- recruit then change mind -> ownership remains legitimate;
- later assignment failure does not roll back prior acquisition.

None of these 38 rows is added to the retail Shop by this contract.

---

# 9. Exact leader / teacher negative matrix — assignment is not acquisition

The v2 roster policy also has the following exact 13 leader/teacher representations.

Their inclusion/selection as a Jōnin/Special-Jōnin leader is **institutional assignment/access**, not Character acquisition.

Therefore the `geninRosterTransition` leader path is explicitly **not** an ownership source for these rows.

| exact representation | acquisition status in this portfolio | roster leader path | ownership result | currently implemented? |
|---|---|---|---|---|
| `jonin_hanabi` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `jonin_inojin` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `jonin_konohamaru` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `jonin_kushina` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `jonin_sasuke` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `jonin_shikaku` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `jonin_shino` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `sj_anko` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `sj_ebisu` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `sj_genma` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `sj_ibiki` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `sj_kiba` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |
| `sj_nono` | UNASSIGNED_NOT_YET_AUTHORED outside any separately existing source | assignment-only | no ownership grant | leader assignment runtime exists |

A future exact Shop, Story, Mission, World, relationship, challenge, direct grant, or lineage-transition contract may author acquisition for one of these representations. This matrix does not preclude that future work.

It only closes:

> **leader assignment != acquisition.**

---

# 10. Promotion / representation transition boundary

#522 now allows Promotion to advance an exact owned lineage into an authorised rank-stage representation while preserving lineage history.

This does not mean every apparent Academy→Genin pair is automatically mapped.

Before `lineage_promotion_transition` can operate for an exact Character, downstream authority must identify at minimum:

- source owned lineage;
- exact authorised target representation/stage definition;
- formal Rank transition authority;
- lineage/provenance preservation rule;
- any source compatibility/singular-source constraints;
- presentation projection.

Until such an exact mapping exists:

`Promotion != new Character Card ownership`

and:

`Promotion != inferred representation swap`

No exact transition mappings are fabricated here for `academy_* -> genin_*`.

---

# 11. Future exact route-authoring rule

When a currently unassigned representation is about to become obtainable, the owning content specialist supplies the **triggering occurrence**, while Acquisition supplies the ownership/source contract.

Typical ownership split:

- Writing / Story — authored Story occurrence / consequence facts;
- World / Missions / Events — world opportunity, mission/institutional reward source, contextual event;
- Progression / Development — persistent development gates where relevant;
- PL / Registry / Rank — exact representation identity, formal Rank / Promotion target authority;
- Combat / Skills / Items / Weapons — combat capability facts only where the acquisition predicate needs them;
- CE / Codex / Coordination — reusable semantics / cross-system collisions;
- Acquisition / Character Systems — source row, eligibility-to-own, acquisition transaction, idempotence, provenance, ownership consequence;
- Coding — implementation only after the source row and trigger authority are closed.

Do not open downstream work merely because a Registry Character currently has no route.

Create a handoff only when a concrete Alpha/pre-Alpha representation is actually being promoted into obtainability and another owner must supply missing trigger authority.

---

# 12. UI / presentation boundary

UI may project:

- source availability;
- Shop catalogue membership;
- recruit controls;
- earned entitlement;
- already-owned state;
- known requirements where observer-safe;
- unavailable state where it is legitimate to expose.

UI must never derive acquisition truth from:

- card art;
- Registry/rank filters;
- PL;
- rarity;
- filename/order;
- My Clan gaps;
- current team composition.

A greyed card, visible card, Shop tile, reward preview, or recruitment button is presentation of authority, not authority itself.

---

# 13. Canon Research First boundary

This portfolio does not invent new canon-derived recruitment facts for named Characters.

When a future exact route materially depends on canon affiliation, personality, relationship, faction history, teacher/student history, village status, or other canon-derived facts, consume #134 first:

> **Research first. Diverge deliberately. Preserve the result.**

Durable Shinobi Chronicles history still outranks baseline canon.

---

# 14. Current bounded portfolio status

### CLOSED / ACTIVE SOURCE FAMILIES WITH EXACT CURRENT ROWS

- `origin_selection` — 10 Academy Origin representations;
- `formation_recruitment` — 10 Academy cohort candidates, exact two acquired per initial formation;
- `retail_purchase` — exact same 10 Academy representations under `alpha_konoha_character_card_shop_v1`;
- `contextual_recruitment` — 38 Genin v2 candidate-universe representations, conditional through current authoritative `geninRosterTransition` snapshots and `genin_roster_transition_recruitment`.

### CLOSED NEGATIVE BOUNDARY

- the 13 current Jōnin/Special-Jōnin leader rows are assignment/access only in the Genin roster transition and receive no ownership from that role.

### TAXONOMY CLOSED / NO NEW EXACT ALPHA ROWS ASSIGNED HERE

- `story_chronicle_award`;
- `mission_institutional_award`;
- `world_event_recruitment`;
- `relationship_recruitment`;
- `challenge_achievement_entitlement`;
- `lineage_promotion_transition`;
- `direct_authored_grant`.

### ALL OTHER REGISTRY REPRESENTATIONS

`UNASSIGNED / NOT YET AUTHORED` by this contract unless another durable exact Acquisition source already exists.

Registry/source owners must not treat this catch-all as an invitation to invent routes from identity, Rank, PL, rarity, card art, or team need.

---

# 15. Final lock

> **Retail Shop is one authored Character Card source, not the universal acquisition model. Every exact representation needs an explicit acquisition-source row before it can enter player ownership. Current Alpha has three concrete ownership channels across the Academy cohort — Origin selection, Team Formation, and retail purchase — plus conditional Genin roster recruitment for the exact 38-ID v2 candidate universe. Jōnin/Special-Jōnin leader assignment does not grant ownership. Story, Mission, World, relationship, challenge, Promotion/lineage transition, and direct-grant families are valid authoring channels only when an exact representation receives an explicit causal contract. Anything else remains UNASSIGNED / NOT YET AUTHORED rather than being guessed into the Shop or another route.**
