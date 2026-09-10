# Shinobi Chronicles — Capability-Responsive Event Eligibility and Compound Route Reconciliation

**Date:** 2026-09-10  
**Owner:** CE / Codex / Coordination  
**Status:** **COORDINATION AUTHORITY — WORLD v2 CONSUMED / RUNTIME INTEGRATION REMAINS QUEUED**

## 1. Source authority consumed

World v2 addendum:

`Documentation/World/Capability_Responsive_Event_Ecology_v2_Eligibility_and_Compound_Routes_2026-09-10.md`

commit:

`7db77f9d6b558d21c678eb95f9ab2adba51d0f2d`

Earlier World contract remains in force except where v2 explicitly supersedes its assumption that dedicated specialist events should generally remain encounterable by Characters who do not possess that route:

`Documentation/World/Capability Responsive Event Ecology and False Identity Opportunity Pack 2026-09-10.md`
commit `c4f5ceb92d3c841654b20738bb6e67c14e2a0d2f`.

Combat contextual Skill authority remains:

`Documentation/Combat/SC_Combat_Contextual_Passive_Active_Skill_Surface_2026-09-10.md`.

Queued runtime coordination remains GitHub #86.

## 2. CE ruling

The v2 correction is accepted.

Capability-responsive World content may operate at **two distinct layers**:

1. **route-level affordance** — a broadly eligible occurrence exists independently, while an exact capability/history opens an additional legitimate route inside it;
2. **occurrence-level eligibility** — the event/mission/quest/follow-up itself enters the candidate set only because exact authored capability/history/Knowledge/relationship/object/world predicates are satisfied.

These must not collapse.

A Character without False Identity does not need to encounter a dedicated False-Identity occurrence merely so the UI can hide or disable the interesting option. That occurrence may be absent from that Chronicle entirely while another legitimate Tracking, Medical, Fūinjutsu, Weapons, Hosted-Entity, Bloodline, underworld, relationship, Knowledge or ordinary-world candidate occupies the same geography/time instead.

Core rule:

> **something for everyone ≠ everything for everyone**

and:

> **different histories should create different verbs and, where authored, different eligible occurrences.**

## 3. Eligibility modes accepted

World's five authoring modes are accepted as content semantics, without requiring these exact strings to become mandatory engine enum names:

- `baseline_world`
- `single_path_responsive`
- `multi_path_any`
- `compound_path_synergy`
- `history_generated_followup`

They describe authored eligibility behavior, not ownership of the underlying capability truth.

## 4. Selection boundary

The legitimate conceptual sequence is:

`authored local candidates`
→ factual World/Story eligibility
→ location/participant/object availability
→ prior occurrence/expiry/suppression history
→ observer Knowledge/discovery predicates
→ capability/relationship/object/recognition predicates
→ **semantically eligible candidate set**
→ bounded CE/World selection/surfacing
→ observer-safe discovery/actionability projection
→ occurrence resolution
→ committed history.

Therefore:

- randomness/weighting may choose among already eligible possibilities;
- randomness never manufactures eligibility;
- eligible candidate != selected occurrence;
- selected occurrence != discovered;
- discovered != actionable;
- capability predicate != success;
- event existence != Skill ownership;
- Skill ownership != guaranteed event occurrence.

This is consistent with existing CE Opportunity Lineage / Historical Affordance direction and does not create a new Alpha engine subsystem by itself.

## 5. Multiple routes and compound paths

A Character with multiple legitimate paths receives the **union of authored eligible pools**, subject to ordinary World/Story/time/history constraints.

Where specifically authored, rare `compound_path_synergy` opportunities may require two or more independent legitimate histories/capabilities together.

Examples include False Identity + Counter-Surveillance, Tracking + Evidence Reconstruction, Fūinjutsu + Barrier Recognition, Medical + Poison Recognition, Echo relationship + Recall awareness, or weapon expertise + provenance Knowledge.

Compound eligibility must use exact independently legitimate predicates. It must not infer one capability from another, fabricate ownership, or award the missing half because the event exists.

## 6. Anti-clutter / anti-build-matching

More unlocked capabilities expand the eligible possibility reservoir; they do not require every eligible possibility to appear simultaneously.

Current World pacing guidance of roughly **4–7 simultaneously actionable non-Story opportunities where legitimate candidates exist** is accepted as content guidance, not a universal CE constant.

Selection should continue to mix:

- ordinary unrelated world life;
- Story/Arc-sensitive pressure;
- capability-responsive opportunities;
- history-generated follow-ups;
- occasional locations with no current opportunity.

The runtime must not behave as `learn capability -> immediately spawn matching quest` unless an exact authored/history trigger genuinely requires that result.

## 7. False Identity correction

False Identity remains the flagship example, not the universal pattern.

A general checkpoint inspection may be broadly eligible with a conditional False Identity route.

A dedicated identity-contradiction chain may instead require exact False Identity / Identity Rebinding / prior false-profile history and should be absent from Chronicles that do not satisfy those predicates.

False Identity still does not:

- rewrite stable identity or World Truth;
- forge Rank, citizenship, clearance, ownership or permissions;
- erase prior witness Knowledge or Shared History;
- universally conceal chakra, Hosted Entities, Bloodlines or equipment;
- guarantee success.

## 8. History-generated follow-up

`history_generated_followup` is especially aligned with CE's differentiating direction.

A prior committed occurrence, action or non-action may create a later eligible candidate. The later occurrence must consume preserved factual history/provenance rather than infer a fictional prerequisite from current presentation.

Examples include:

- prior alias use creating later identity contradiction;
- spared hostile becoming a witness/contact/threat;
- evidence left untouched later being recovered by another participant;
- a stabilised civilian becoming a future source;
- an ignored threat being resolved by another team, creating different Knowledge/relationship/history rather than a punishment score.

This is causal continuation, not morality scoring.

## 9. Runtime sequencing

No new bespoke False Identity event engine is authorised.

When #86's contextual-Skill runtime lane is activated, Coding should support the generic evaluation/dispatcher needed by exact World consumers, including:

- side-effect-free eligibility checks;
- exact capability/history/source predicates;
- occurrence-level candidate filtering;
- route-level conditional affordances;
- bounded selection among eligible candidates;
- compound predicates where explicitly authored;
- history-generated follow-up predicates;
- save/load/idempotent occurrence identity;
- no UI-refresh/reload rerolls;
- observer-safe projection;
- factual occurrence commit only after material participation/resolution.

Only Alpha-consumed slices should be integrated. Do not bulk-activate the entire contextual Skill catalogue merely because it exists.

## 10. Ownership preservation

World owns event/quest/mission/follow-up definitions, occurrence eligibility predicates, factual locations/objects/participants/context, recurrence/expiry/suppression rules and consequence envelopes.

Other owners continue to own the truth of capabilities, development Access, Registry identity, Acquisition/ownership, Inventory objects, Combat/Skill effects, Rank, PL and other domain facts.

CE/World selects only among legitimately authored and semantically eligible candidates.

Coding implements evaluation, persistence, selection, projection and tests.

Preserve:

- World opportunity != Skill;
- Skill != event;
- event definition != occurrence;
- capability history != guaranteed event occurrence;
- random selection != eligibility creation;
- specialist route != objectively correct route;
- more capabilities != map-marker spam;
- non-action != punishment;
- Knowledge != Access != Competence != Power != Mastery;
- authored != implemented != runtime validated != Golden GREEN.

## 11. Coordination disposition

The reopened #87 contains genuine new evidence and is therefore not duplicate traffic.

This reconciliation consumes the v2 correction durably.

No additional downstream handoff is required now because GitHub #86 already owns the queued generic contextual-Skill runtime integration lane. The World v2 contract should be consumed together with #86 when that lane becomes active.

**Current routing:** QUEUED through existing #86; no Stephen relay.
