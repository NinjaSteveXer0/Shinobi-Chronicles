# Shinobi Chronicles — World Map v2 Country and Secret Reservation Calibration

**Date:** 9 September 2026  
**Owner:** UI / Assets  
**Primary consumers:** World / Missions / Events / Hotspots; Coding after World consumes the final binding  
**Status:** **FINAL WORLD MAP V2 PRODUCTION GEOMETRY AUTHORITY — BINARY PROMOTED / REVALIDATED**

---

## 1. Purpose

This document is the final UI / Assets spatial authority for the **16 named countries** and the current high-profile **secret-area reservations** on the production World Map v2 terrain master.

It exists so World / Missions / Events / Hotspots and downstream Coding can author against stable spatial addresses instead of guessing from chat, filenames, or visual appearance.

Preserve:

> **geographic placement envelope != political border**
>
> **country anchor != capital / Hidden Village location**
>
> **secret reservation != discovered identity**
>
> **world truth != observer Knowledge != presentation**
>
> **visible `????` halo != secret name disclosure**
>
> **final asset committed != runtime validated != Golden GREEN**

---

## 2. Exact final production-image binding

The final World Map v2 terrain master is now the exact binary already present at the established runtime path:

- **Authoritative production asset:** `Backgrounds/WorldMap.png`
- **Git blob:** `102ff62f8849bce76b83424140091b37f235401b`
- **Native canvas:** **1672 × 941 px**
- **Coordinate origin:** top-left `(0,0)`
- **SHA-256 of exact production PNG bytes:**  
  `309445068decdf433b6011d8254b127cf3e358890972c584ba8278a99f2eedeb`
- **Production-ingest commit:**  
  `48e7954ce77ec9590f0b9e9dad34b6493af425c7` — `new world map and all enemy battle portraits`
- **Original UI / Assets workspace filename / source provenance:**  
  `a_wide_cinematic_high_detail_fantasy_realistic_c.png`

The repository `Backgrounds/WorldMap.png` bytes are the exact calibrated candidate bytes: the repository Git blob matches the locally calculated Git blob for the 3,134,576-byte candidate, and the native dimensions + SHA-256 match the original calibration binding exactly.

Therefore no crop, resize, recompression, or replacement occurred between candidate calibration and final production ingestion.

Any future terrain replacement, crop, resize, or binary supersession requires a fresh UI / Assets geometry revalidation before these coordinates can be carried forward.

For responsive projection:

`renderedX = imageLeft + (nativeX / 1672) × renderedImageWidth`

`renderedY = imageTop + (nativeY / 941) × renderedImageHeight`

Coding must project against the actual rendered image-content box, including any contain/letterbox offsets, rather than browser viewport percentages.

All rectangles below use `x1,y1 → x2,y2`.

### 2.1 Final revalidation result

The candidate calibration was visually rechecked against the exact repository production binary before promotion to final geometry authority.

Result:

- **16 / 16 country placement envelopes:** revalidated;
- **16 / 16 country anchors:** revalidated;
- **7 / 7 physical secret reservation regions:** revalidated;
- **7 / 7 gold-halo / suspicion anchors:** revalidated;
- **1 / 1 non-physical realm reservation (`world:S08`):** confirmed to retain **no terrain anchor**;
- **0 coordinate changes required.**

The final repository binary is byte-for-byte the image for which these coordinates were originally authored, and each anchor remains visually aligned with its intended geographic role.

---

## 3. Country-placement contract

The sixteen country regions below are **placement envelopes** over the final production terrain master. They establish where each country belongs geographically and where its macro-map label/focus anchor centres.

They do **not** establish:

- final political-border polygons;
- exact border checkpoints;
- capital locations;
- Hidden Village locations;
- mission ownership;
- travel-route legality;
- territorial accessibility;
- alliance/hostility state.

World may author exact political-border semantics later, but should preserve these macro placements unless a real canon or final-terrain contradiction is found.

### 3.1 Sixteen named countries

| ID | Country | Tier | Placement envelope | Country anchor | Normalised anchor | Geographic role on v2 production master |
|---|---|---|---|---|---|---|
| `world:C01` | **Land of Earth** | Five Great | `30,70 → 520,365` | `285,225` | `17.0%, 23.9%` | North-western continental plateau, canyon and stone highlands. |
| `world:C02` | **Land of Wind** | Five Great | `20,380 → 540,760` | `285,555` | `17.0%, 59.0%` | South-western desert/canyon expanse with harsh exposed approaches. |
| `world:C03` | **Land of Snow** | Smaller | `515,0 → 915,185` | `705,95` | `42.2%, 10.1%` | Far-northern glacial/snow country; cold and expansive rather than merely Iron-with-snow. |
| `world:C04` | **Land of Iron** | Smaller | `540,130 → 900,280` | `720,205` | `43.1%, 21.8%` | Severe alpine belt immediately south of Snow; naturally defensible high-country approaches. |
| `world:C05` | **Land of Sound** | Smaller | `420,170 → 650,320` | `535,245` | `32.0%, 26.0%` | Rugged inland basins/ravines between Earth/Iron and the central lowlands; no literalised musical terrain. |
| `world:C06` | **Land of Grass** | Smaller | `380,285 → 660,450` | `520,360` | `31.1%, 38.3%` | Fertile west-central transition corridor linking larger powers. |
| `world:C07` | **Land of Rain** | Smaller | `585,300 → 830,475` | `705,400` | `42.2%, 42.5%` | River-heavy geopolitical crossroads between western and central powers. |
| `world:C08` | **Land of Fire** | Five Great | `690,275 → 1040,575` | `855,420` | `51.1%, 44.6%` | Central fertile heartland: broad plains, forests, river systems and multiple strategic approaches. |
| `world:C09` | **Land of Valleys** | Smaller | `500,450 → 800,650` | `660,555` | `39.5%, 59.0%` | South-central enclosed valleys, foothills and river corridors. |
| `world:C10` | **Land of Rivers** | Smaller | `690,505 → 980,675` | `835,585` | `49.9%, 62.2%` | Central-southern watershed, floodplain and branching-river country. |
| `world:C11` | **Land of Hot Water** | Smaller | `930,205 → 1135,365` | `1035,285` | `61.9%, 30.3%` | North-eastern transition country with volcanic/geothermal foothills and coastward routes. |
| `world:C12` | **Land of Lightning** | Five Great | `1040,55 → 1335,245` | `1175,150` | `70.3%, 15.9%` | North-eastern mountain/coastal power: high ridges, vertical approaches and ocean access. |
| `world:C13` | **Land of Waterfall** | Smaller | `1080,255 → 1320,420` | `1195,340` | `71.5%, 36.1%` | East-central escarpments, descending watersheds and waterfall/river country. |
| `world:C14` | **Land of Tea** | Smaller | `950,660 → 1240,880` | `1095,765` | `65.5%, 81.3%` | Warm south-eastern maritime/coastal trade territory with calmer harbour opportunities. |
| `world:C15` | **Land of Whirlpool** | Smaller | `1325,410 → 1590,645` | `1450,520` | `86.7%, 55.3%` | Far-eastern violent-current island chain around the major vortex approaches. |
| `world:C16` | **Land of Water** | Five Great | `1390,165 → 1665,390` | `1520,270` | `90.9%, 28.7%` | Eastern mist archipelago / rugged maritime country with dangerous channels and large-island identity. |

### 3.2 Intended macro adjacency

The final production master should be consumed as:

- **Earth** dominates the north-western stone/plateau system;
- **Wind** dominates the south-western arid system;
- **Fire** occupies the central fertile continental hinge;
- **Lightning** occupies the north-eastern high-mountain/coastal system;
- **Water** occupies the far-eastern maritime archipelago;
- **Sound / Grass / Rain / Iron / Hot Water / Waterfall** form strategically meaningful pressure/corridor territories between or beside the Great Countries rather than decorative leftovers;
- **Valleys / Rivers** structure the south-central continental approaches;
- **Tea / Whirlpool** make the eastern and south-eastern seas politically and economically meaningful;
- **Snow** gives the northern world substantial cold-country geography independent from Iron.

Country terrain is not required to be one biome per polity. Natural terrain may cross later political borders.

---

## 4. High-profile secret-area reservation contract

The following are **authorised strategic secret reservations** for the World Map v2 surface.

Stephen's current UI direction is that the listed physical secret areas should be intentionally **teased before identity/access requirements are met**.

### `KNOWN_UNKNOWN_LOCKED` presentation

- render a **golden halo/ring** at the authorised secret anchor;
- render player-facing label **`????`**;
- do **not** reveal the secret's canonical identity/name through visible text, tooltip, DOM label, accessible name, URL, data attribute, focus text, or hidden description;
- the player is allowed to know **that a special unknown destination/opportunity exists in this vicinity**;
- the player does not yet know its canonical identity and cannot enter merely because the halo is visible;
- Skills / Story / World / Progression / Acquisition or other owning systems determine the actual reveal/access requirements;
- UI consumes those requirements and never invents them.

This state is **not** the same as a truly unknown concealed location. Other secrets may still use zero-response/no-leak presentation where authoritative World/Story rules require it.

When the authoritative reveal gate is met, `????` may transition to the proper discovered identity. **Discovered identity != actionable access**; a further access gate may still exist.

### 4.1 Physical secret reservations

| ID | Authoring identity | Reservation region | Halo / suspicion anchor | Normalised anchor | Default v2 presentation | Geographic intent |
|---|---|---|---|---|---|---|
| `world:S01` | **Ryūchi Cave** | `455,275 → 590,385` | `520,330` | `31.1%, 35.1%` | `KNOWN_UNKNOWN_LOCKED` | Remote west-central karst/cavern opportunity in rugged transition country. Terrain may imply caves/ravines; entrance must not be baked. |
| `world:S02` | **Mount Myōboku** | `875,75 → 1030,215` | `955,145` | `57.1%, 15.4%` | `KNOWN_UNKNOWN_LOCKED` | Isolated northern highland basin behind severe approaches. Do not bake a literal frog landmark. |
| `world:S03` | **Shikkotsu Forest** | `900,430 → 1060,575` | `975,505` | `58.3%, 53.7%` | `KNOWN_UNKNOWN_LOCKED` | Deep old-growth forest reservation east/south-east of Fire's heartland. The forest is geographic truth; the secret identity is not. |
| `world:S04` | **Akatsuki Hideout** | `330,245 → 470,365` | `400,305` | `23.9%, 32.4%` | `KNOWN_UNKNOWN_LOCKED` | Remote rocky basin/ravine in the western pressure belt. Hideout structure/entrance must remain runtime/content-driven. |
| `world:S05` | **Jinchūriki Temple** | `850,735 → 1010,875` | `925,800` | `55.3%, 85.0%` | `KNOWN_UNKNOWN_LOCKED` | Remote south-central island/highland reservation. Do not bake a visible temple icon or imply ownership/access. |
| `world:S06` | **Valley of the End** | `1085,285 → 1255,405` | `1170,345` | `70.0%, 36.7%` | `KNOWN_UNKNOWN_LOCKED` | Major east-central gorge/waterfall reservation. Underlying valley geography may be visible; historical identity/statues/Story state are separate. |
| `world:S07` | **Tomb of the Sage of Six Paths** | `730,105 → 865,235` | `800,170` | `47.8%, 18.1%` | `KNOWN_UNKNOWN_LOCKED` | Remote northern mountain/plateau tomb reservation. Tomb/entrance itself must not be baked. |

### 4.2 Non-physical realm reservation

| ID | Authoring identity | Terrain anchor | Default treatment |
|---|---|---|---|
| `world:S08` | **Infinite Tsukuyomi World** | **NONE — non-physical realm** | Do not place a geographic halo on the ordinary terrain master. If/when revealed, project it through a dedicated realm-layer / special-transition UI treatment supplied by Story/World authority. |

`world:S08` must not acquire an arbitrary island, mountain, ocean point, or country merely so it can participate in the same marker system.

---

## 5. Golden-halo UI rule

For `KNOWN_UNKNOWN_LOCKED` reservations, the current World Map v2 UI projection target is:

- premium **gold halo / illuminated ring**;
- restrained pulse/glow suitable for the existing dark-metal + gold + chakra-teal UI family;
- centred on the calibrated secret anchor;
- visible `????` only;
- no secret-specific emblem;
- no secret-specific portrait/art;
- no canonical name leak;
- no implication that the location is currently enterable;
- runtime owns whether the halo exists at all, whether requirements have been met, and the transition to discovered/actionable states.

Suggested state progression for these specific high-profile reservations:

`KNOWN_UNKNOWN_LOCKED (gold halo + ????)`
→ `DISCOVERED_IDENTITY (proper name/marker)`
→ `ACTIONABLE (valid current enter/travel/action controls)`

The middle and final states may coincide only if the owning system explicitly says the reveal gate also grants access.

---

## 6. Consumer rules for World / Missions / Events / Hotspots

1. Use `world:C##` as **macro country placement addresses**, not exact political-border polygons.
2. Use `world:S##` as **secret reservation addresses**, not automatic mission/event ownership.
3. Do not infer Hidden Village, capital, mission, encounter, acquisition, Skill, Summon, Progression, Battle or reward semantics from an anchor alone.
4. Do not turn the golden `????` halo into proof that the player satisfies access requirements.
5. Do not expose the canonical secret identity in hidden DOM/accessibility metadata while the presentation state is `KNOWN_UNKNOWN_LOCKED`.
6. A Story/event occurrence may use a region without owning the permanent geography.
7. A route may pass through a country/secret region without becoming its content owner.
8. Country labels/borders, villages, travel routes, checkpoints, sea lanes, missions, discoveries, hostility, accessibility and Chronicle-specific world-state overlays remain runtime/UI projection.
9. If World needs a more exact country border or secret interaction polygon, author that downstream against these placement envelopes rather than silently moving the macro geography.
10. If the terrain master changes, return to UI / Assets for coordinate revalidation before carrying the numbers forward.

---

## 7. Authority status / what this closes

This document now closes the production UI / Assets ambiguity for:

- the exact **World Map v2 terrain master**;
- the exact production path / Git blob / dimensions / SHA-256 binding;
- all **16 named country placement envelopes and anchors**;
- all **7 physical high-profile secret reservation regions and halo anchors**;
- `world:S08` remaining non-physical;
- the `KNOWN_UNKNOWN_LOCKED` gold-halo + `????` projection geometry.

It does **not** close:

- final political-border polygons;
- exact country shapes beyond the macro placement envelopes;
- capital/Hidden Village coordinates;
- runtime implementation;
- reveal/access requirements for secret areas;
- exact World/Story content packages at the secret areas;
- browser/runtime validation;
- Golden/regression validation.

No further UI / Assets terrain generation or refinement is required for the Alpha World Map v2 unless a genuine implementation or canon contradiction emerges.

---

## 8. Routing

**Routing: SEND NOW → World / Missions / Events / Rewards**

Consume the final production binding above, then route the consolidated implementation packet to Coding under World ownership. UI / Assets geometry is no longer the blocker.
