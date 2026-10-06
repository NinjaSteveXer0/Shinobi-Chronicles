# Shinobi Chronicles — Story Backdrop Authoring Catalogue

**Date:** 2026-10-07  
**Owner:** UI / Assets  
**Tracker:** #490  
**Status:** **ACTIVE DURABLE CATALOGUE — INITIAL SOURCE-FIRST TRANCHE; INCOMPLETE BY DESIGN**

This catalogue implements the durable Writing-facing backdrop metadata requirement from:

`Documentation/Coordination/Story_Performance_and_Backdrop_Authoring_Interface_2026-10-02.md`

It is intentionally source-first.

Unknown metadata stays UNKNOWN. A physical file existing in the repository does not create a Story binding.

---

## 1. Status vocabulary

- `BOUND` — exact scene/Story binding already closed by durable authority.
- `AVAILABLE SAME-LOCATION VARIANT` — approved alternate view of the same physical place/time.
- `AVAILABLE REUSABLE ENVIRONMENT` — approved reusable environment, not tied to one exact scene.
- `CANDIDATE / NEEDS CONFIRMATION` — plausible, but binding/approval is not yet durable enough for Writing/Coding to assume.
- `UNBOUND / UNKNOWN` — insufficient authority. Do not guess.

Canonical:

> **asset exists != Story binding**

> **approved useful backdrop exists != Writing should ignore it and author around a blank imaginary stage**

---

# 2. Academy practical/training courtyard family

## `Scene backdrops/academy_training_ground_courtyard.png`

**Status:** `BOUND`  
**Environment family:** Konoha Ninja Academy exterior practical/training ground  
**Sub-location/viewpoint:** practical training courtyard / training-yard master  
**Time / lighting:** daytime  
**Camera relation:** reusable master view  
**Continuity family:** Academy exterior practical/training-ground family  
**Same-place transition relation:** scenes may remain on this backdrop across consecutive beats; occurrence-specific terrain changes do not require a new backdrop.

### Durable Story bindings

#### Academy Iwabee Origin — `academy_iwabee`

Binding authority:

`Documentation/Story/Academy_Iwabee_Origin_2026-09-27_Scene_Authority_and_Backdrop_Contract.md`

Durable rule:

- every Origin scene remains on the same Academy practical ground;
- terrain reshaping/damage is occurrence state, not a bespoke damaged-ground backdrop;
- conditional Rogue Genin Battle still uses this environment family.

**Writing-safe visible/location facts:**
- Academy yard / practical training ground;
- outdoor daytime training context;
- terrain may be narratively reshaped, but the static backdrop does not itself commit the reshaping result.

**Restriction:** do not bake `trainingGroundReshapeObjectiveCompletedByIwabee`, Rogue disposition, capture/escape, or any branch-specific terrain truth into the backdrop.

#### Academy Metal Lee Origin — `academy_metal_lee`

Binding authority:

`Documentation/Story/Academy_Metal_Lee_Origin_2026-09-27_Scene_Authority_and_Backdrop_Contract.md`

Durable rule:

- every Origin scene uses the same daytime Academy practical/training-ground environment unless later successor authority changes it;
- no Metal-specific new backdrop is required.

**Writing-safe visible/location facts:**
- Academy practical/training context;
- outdoor daytime training environment.

**Restriction:** do not use a new background merely to represent contextual performance, anxiety, confidence or spar outcome.

#### Academy Kushina Origin — `academy_kushina`

Binding authority:

`Documentation/Story/Academy_Kushina_Origin_2026-09-27_Scene_Authority_and_Backdrop_Contract.md`

Stable environment identity:

`konoha_academy_courtyard_day`

Durable rule:

- whole Origin occurs in Konoha Ninja Academy exterior practical training courtyard, daytime;
- exact approved physical backdrop is this file;
- Coding must not substitute the indoor Academy classroom or a generic dark shell.

**Writing-safe visible/location facts:**
- Konoha Ninja Academy exterior;
- practical training courtyard;
- daytime.

#### Academy Kurenai Origin — `academy_kurenai`

Binding authority:

`Documentation/Story/Academy_Kurenai_Origin_2026-09-27_Scene_Authority_and_Backdrop_Contract.md`

Durable rule:

- location is Academy training ground/training yard, daytime;
- this file is the current implementation-safe exact physical asset on main;
- later approved same-location Kurenai alternate angle may replace selected evaluation/aftermath presentation without changing semantic scene identity.

**Writing-safe visible/location facts:**
- Academy training yard;
- daytime;
- outdoor practical/evaluation context.

**Restriction:** do not guess an uncommitted Kurenai alternate filename.

### Staging / card-safe notes

Current durable source does not close exact card-safe pixel zones for this asset in this catalogue tranche.

Until separately audited:

- keep lower centre reasonably calm for Story dialogue;
- preserve left/right actor staging space;
- do not write dialogue that depends on a tiny visual landmark unless a later catalogue entry explicitly records it.

**Provenance:** production file present on main; exact bindings above are source-confirmed.

---

# 3. Physical inventory discovered but not yet semantically classified

The following files are physically present in the current `Scene backdrops/` directory, but this initial catalogue tranche does not yet assert exact Story binding or safe authoring metadata for them:

| Asset path | Current catalogue status | Notes |
|---|---|---|
| `Scene backdrops/academy_classroom.png` | `UNBOUND / UNKNOWN` | Physical file confirmed. Exact current Story bindings/time/viewpoint restrictions not yet audited in this catalogue. |
| `Scene backdrops/alleyway_konoha_night.png` | `UNBOUND / UNKNOWN` | Physical file confirmed. Do not infer exact Kakashi/other route binding from filename alone. |
| `Scene backdrops/arena_concourse.png` | `UNBOUND / UNKNOWN` | Physical file confirmed. Arena presentation/gameplay authority remains separate. |
| `Scene backdrops/arena_ring.png` | `UNBOUND / UNKNOWN` | Physical file confirmed. Do not infer active tournament/Battle occurrence from art. |
| `Scene backdrops/broken_exchange_lane.png` | `UNBOUND / UNKNOWN` | Physical file confirmed. Exact Story bindings still require source audit. |
| `Scene backdrops/civilian_common_room.png` | `UNBOUND / UNKNOWN` | Physical file confirmed. Exact location family/use not yet classified here. |
| `Scene backdrops/covert_interior.png` | `UNBOUND / UNKNOWN` | Physical file confirmed. Exact Story binding/use not yet classified here. |
| `Scene backdrops/end_of_alleyway.png` | `UNBOUND / UNKNOWN` | Physical file confirmed. Exact Story binding/use not yet classified here. |
| `Scene backdrops/forest_clearing_day.png` | `UNBOUND / UNKNOWN` | Physical file confirmed. Time-of-day is filename-evident; exact Story binding still unknown here. |
| `Scene backdrops/forest_clearing_night.png` | `UNBOUND / UNKNOWN` | Physical file confirmed. Time-of-day is filename-evident; exact Story binding still unknown here. |
| `Scene backdrops/forest_path_night.png` | `UNBOUND / UNKNOWN` | Physical file confirmed. Exact Story binding/use not yet classified here. |

This table is not the complete directory inventory. It records the first audited tranche only.

---

# 4. Authoring rules for Writing

Writing may rely on a backdrop's:

- exact physical place;
- time/lighting;
- camera/viewpoint;
- visible landmarks;
- same-place continuity;

only when this catalogue or another named durable Story/UI authority says that fact is safe.

Writing must not infer from a filename:

- who is present;
- what happened;
- whether an event succeeded;
- ownership/custody;
- Battle result;
- mission state;
- relationship state;
- current Rank;
- route history.

A same-location alternate angle may change presentation rhythm without changing Story geography/time/causality.

---

# 5. Next catalogue tranche

Continue source-first through current Origin/Story backdrop contracts and classify:

1. all currently bound Origin backdrops;
2. approved same-location alternate angles already committed to live authority;
3. reusable Konoha Village / Hokage Office / rooftop / alley / market / checkpoint / storehouse families;
4. remaining unbound physical inventory.

Do not block the #490 first choreography benchmark on completion of the entire catalogue.
