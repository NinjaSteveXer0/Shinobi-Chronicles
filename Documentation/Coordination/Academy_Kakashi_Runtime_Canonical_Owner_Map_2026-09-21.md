# Academy Kakashi Runtime Canonical Owner Map — 2026-09-21

Status: **Alpha production consolidation authority**  
Scope: Academy Kakashi Origin only, from Origin selection through Academy free play.  
Machine-readable companion: `tools/fixtures/academy_kakashi_runtime_owner_map_36100.json`  
Executable gate: `tools/qa_academy_kakashi_runtime_owner_map_36100.js`

This document records runtime ownership after the Gen91 consolidation. It does not reopen Writing. The current 100% Writing Closure and Path Variation Audit remain the narrative authority.

## Production delivery line

`alpha-origin-scenes-32900-integrator.js`
→ `alpha-story-decision-realisation-34000.js?sc=story-decision-20260921-19`
→ `alpha-kakashi-final-origin-adapter-34100.js?sc=kakashi-final-20260921-91`

Kakashi Scene Board delivery:
`alpha-traversal-bridge-33200.js`
→ `alpha-kakashi-original-origin-restoration-33800.js?sc=scene-board-20260921-15`
→ `alpha-story-scene-board-33900.js`
→ `alpha-kakashi-scene-board-polish-33910.js`

## Canonical ownership

| Responsibility | Classification | Canonical owner(s) | Caller | State written | Next consumer |
|---|---|---|---|---|---|
| Origin registration/materialisation | CANONICAL | 32900 core/integrator | Origin dispatcher | Origin + active Story runtime | 34000 / 34100 |
| Story choice semantics / guard | CANONICAL | 34100-core, 34200 | Story choice runtime | choice availability, semantic intent provenance | 34600 / route owners |
| Factual resolver / commits | CANONICAL | 34600, 34700, 34120 | committed Story intent | factual occurrences, package/participant/Knowledge facts | route owners / 35100 |
| Battle deployment | CANONICAL | 34300 | authorised Story Battle beats | exact config/caller/deployment, `battleResume.authored` | 32600 / 33100 |
| Battle browser interaction | REQUIRED COMPATIBILITY | 34500 | Combat overlay | Battle presentation interaction only | Combat resolver |
| Substitution integration | REQUIRED COMPATIBILITY | 34900 | active Kakashi Battle | Battle-only interaction/runtime state | Combat runtime |
| Battle CLAIM / same-Story return | CANONICAL | 32600, 33100 | Battle result surface | claimed result + exact caller return | exact route return beat |
| WATCH secure/sequential chain | CANONICAL | 34410, 35600 | Observe choices / Battle returns | timing/package/Battle facts | later pursuit / terminal |
| Direct STRIKE / SLIP-IN | CANONICAL | 34710, 35910 | direct root choice | direct intent, package/participant facts | Battle / terminal |
| STOP THE ASSASSIN chain | CANONICAL | 35700, 35710, 35730, 35750 | WATCH route | route beat, Battle timing, pursuit eligibility, loss facts | 35760 / 35830 / 35100 |
| Lethal/non-lethal continuation | CANONICAL | 35760, 35770, 35780, 35810 | post-Battle disposition | life/outcome/report facts | terminal |
| Immediate ANBU / Police custody | CANONICAL | 35800 | post-MI custody choice | institutional custody/handoff/hidden-review facts | 35100 |
| Loss ending | CANONICAL | 35820 | Scene05A-L RETURN TO ANBU | truthful report + hidden failure review | 35100 |
| Post-MI PS/AMT pursuit | CANONICAL | 35830 | post-MI pursuit choices | pursuit/package/disposition/Pakkun facts | 35900 / 35920 / 35100 |
| Pakkun interception | CANONICAL | 35300 | eligible package pursuit | temporary participation + departure | Battle / terminal |
| CE256 AMT package closure | CANONICAL | 35900 | AMT factual return | package factual occurrence + Pakkun autonomy | 35100 |
| WATCH/direct downstream route closure | CANONICAL | 35910 | route choice | route intent/factual continuation | Battle / terminal |
| Field restraint / collection / group transfer | CANONICAL | 35920 | restraint/collect choices | FIELD_SECURED → COLLECTED_ACTIVE_ESCORT → institutional custody | terminal |
| MOVE IN CLOSER closure | CANONICAL | 35930 | factual resolver result | downstream route/Battle/package/participant facts | terminal |
| Immediate rewards / development | CANONICAL | 34800, 35740 | Battle CLAIM / terminal projection | Ryō, items, action-derived development | result UI / Receipt |
| Terminal semantics | CANONICAL | **35100** | all route terminal boundaries | ANBU report, package return, Pakkun departure, Receipt/reward evidence, Origin completion | 35940 / game.js |
| Terminal projection | CANONICAL | 35940 | terminal presentation | presentation only | 33910 |
| Approved Kakashi Story backdrop registry | CANONICAL | **33800** | Scene Board bootstrap | presentation asset registry only | 33900 |
| Scene Board + full-screen backdrop lifecycle | CANONICAL | **33900** | shared Story renderer | presentation DOM only | 33910 / route render hooks |
| Dialogue geometry / Objective sizing / terminal actor projection | CANONICAL | **33910** | 33900 / shared Story renderer | presentation DOM/CSS only | browser |
| Teammate formation / first Konoha / free play | CANONICAL | game.js, 35000 | completed Origin | ownership/team/onboarding state | normal game shell |

## Retired owners

The following files are retained only as inert archaeological tombstones and **must not be production-loaded**:

- `alpha-kakashi-story-presentation-compat-33920.js` — DEAD/UNREACHABLE. CSS/click/observer compatibility behavior migrated to 33900/33910.
- `alpha-kakashi-terminal-scene-board-35610.js` — DEAD/UNREACHABLE. Hokage backdrop registration migrated to 33800; terminal projection remains 33910.
- `alpha-kakashi-objective-presentation-35720.js` — DEAD/UNREACHABLE. Objective sizing moved to 33910; Rooftop reveal timing remains 35700.
- `alpha-kakashi-browser-acceptance-35950.js` — DEAD/UNREACHABLE. Observe bindings migrated to 35910; Move-In-Closer binding remains 35930.

There are **no authorised SUPERSEDED BUT STILL LIVE or UNKNOWN Kakashi presentation/finaliser owners** on this completion line.

## Presentation ownership rules

1. Route modules may author actor/card choreography and performance data.
2. Route modules must not assign `globalThis.renderStoryScenePresentationLayer`.
3. Route modules must not own `.sc-dialogue-panel-33910` geometry.
4. 33800 owns approved Kakashi Story backdrop identities.
5. 33900 owns Story backdrop application/lifetime and route render-hook execution.
6. 33910 owns Kakashi dialogue geometry, Objective sizing and terminal Scene Board projection.
7. Combat-only overlay hooks remain Combat responsibilities and do not become Story Scene Board owners.

## Semantic completion rules

- 35100 is the **sole live Kakashi owner permitted to call `completeChronicleOriginPrologue(...)`**.
- 35940 is projection-only and must not commit occurrences, mutate participant classifications, or save gameplay state.
- Battle victory never implies package custody, participant custody, death, Promotion, ownership, or terminal completion.
- Package custody and participant custody remain independent.
- Field restraint is not institutional custody.
- Pakkun temporary Battle participation never grants ownership or reciprocal name Knowledge.
- Presentation refresh never recommits semantic state.

## Regression authority

The owner map is enforced by:
- `tools/qa_academy_kakashi_runtime_owner_map_36100.js`
- Issue #188 Story Decision QA
- Issue #141 Pre-Alpha Runtime Closure

Browser Golden remains separate and must not be inferred from source/headless GREEN.
