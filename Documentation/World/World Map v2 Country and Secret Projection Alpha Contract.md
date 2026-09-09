# Shinobi Chronicles — World Map v2 Country and Secret Projection Alpha Contract

**Date:** 9 September 2026  
**Owner:** World / Missions / Events / Rewards  
**Status:** **WORLD SEMANTIC AUTHORITY — V2 COUNTRY / SECRET PROJECTION CLOSED; FINAL TERRAIN BINARY STILL UI-ASSETS OWNED**

## 1. Purpose

This contract consumes `Documentation/Maps/World Map v2 Country and Secret Reservation Calibration.md` and closes the World-side semantics for the World Map v2 surface.

The map is a macro world-navigation / world-state presentation surface. It is not a global quest board and it does not replace the country/regional interactive maps.

Preserve:

- country != region-map implementation;
- country anchor != capital / Hidden Village;
- country placement envelope != final political border;
- world-map marker != event;
- world-map marker != opportunity;
- secret reservation != discovered identity;
- visible `????` != access;
- world truth != observer Knowledge != presentation;
- Story overlay != ownership of geography.

## 2. Spatial authority consumed

Candidate geometry source:

`Documentation/Maps/World Map v2 Country and Secret Reservation Calibration.md`

Authority commit:

`1cd0b7f0c0888d541419dff19d705eb4a66c631a`

Bound candidate:

- native canvas `1672 × 941`;
- candidate SHA-256 `309445068decdf433b6011d8254b127cf3e358890972c584ba8278a99f2eedeb`;
- calibrated country addresses `world:C01` → `world:C16`;
- calibrated physical secret reservations `world:S01` → `world:S07`;
- `world:S08` non-physical realm reservation.

These coordinates are planning authority until UI / Assets promotes/revalidates the final production `Backgrounds/WorldMap.png` binary.

World does not silently transfer the coordinates to a different crop or replacement image.

## 3. Country identity / Alpha macro presentation

All sixteen named countries are ordinary known geographic identities for the Alpha World Map.

Knowing that a country exists and where it broadly lies does **not** imply:

- current travel access;
- a regional map exists;
- its Hidden Village is known;
- its capital is known;
- missions are available;
- political borders are exact;
- the country is friendly/hostile;
- every route through it is actionable.

Stable World Map country identities:

| Address | World marker ID | Display identity | Tier |
|---|---|---|---|
| `world:C01` | `world_country_earth` | Land of Earth | Five Great |
| `world:C02` | `world_country_wind` | Land of Wind | Five Great |
| `world:C03` | `world_country_snow` | Land of Snow | Smaller |
| `world:C04` | `world_country_iron` | Land of Iron | Smaller |
| `world:C05` | `world_country_sound` | Land of Sound | Smaller |
| `world:C06` | `world_country_grass` | Land of Grass | Smaller |
| `world:C07` | `world_country_rain` | Land of Rain | Smaller |
| `world:C08` | `world_country_fire` | Land of Fire | Five Great |
| `world:C09` | `world_country_valleys` | Land of Valleys | Smaller |
| `world:C10` | `world_country_rivers` | Land of Rivers | Smaller |
| `world:C11` | `world_country_hot_water` | Land of Hot Water | Smaller |
| `world:C12` | `world_country_lightning` | Land of Lightning | Five Great |
| `world:C13` | `world_country_waterfall` | Land of Waterfall | Smaller |
| `world:C14` | `world_country_tea` | Land of Tea | Smaller |
| `world:C15` | `world_country_whirlpool` | Land of Whirlpool | Smaller |
| `world:C16` | `world_country_water` | Land of Water | Five Great |

These IDs are stable macro-map presentation/navigation addresses. They do not create new Registry Entities or World Event occurrences.

## 4. Country actionability rule

Country presentation and country actionability are separate.

### Existing regional-map countries

Where current runtime has an authoritative region surface and access is legal, the corresponding World Map marker may expose `EXPLORE` / region navigation through the existing region-key route.

Current intended Great-Country bindings are:

- `world_country_earth` → region key `earth`;
- `world_country_wind` → region key `wind`;
- `world_country_fire` → region key `fire`;
- `world_country_lightning` → region key `lightning`;
- `world_country_water` → region key `water`.

This does not override any progression/access guard already present in runtime.

### Countries without an implemented regional surface

The remaining eleven countries may appear as known geographic markers/labels but must not fabricate an empty regional map, fake missions, or generic travel action.

Their macro state is:

`KNOWN_GEOGRAPHY / NOT_YET_ACTIONABLE`

until a later authority supplies a legitimate travel/region surface or exact Story transition.

UI may present a bounded locked/unavailable state. It must not imply a canonical reason that World has not authored.

## 5. World Map is not the standing-event pool

Standing free-play activity remains hosted primarily by the relevant country/regional map, e.g. Land of Fire's `fire_alpha_standing_pool_v1`.

Do **not** populate the World Map itself with the Land of Fire broken-wagon/courier/training/etc. standing pool.

A country marker may later carry a world-scale Story, known-threat, war-state, route-disruption or Chronicle consequence overlay when separately authored.

That future overlay remains an opportunity/event projected on the country geography; it does not mutate the country identity.

## 6. High-profile secret reservations

The seven physical high-profile secret reservations are intentionally **known-unknown locked** on the v2 World Map.

Stable World authoring addresses:

| Address | Internal World identity | Locked player-facing identity | Initial state |
|---|---|---|---|
| `world:S01` | Ryūchi Cave | `????` | `KNOWN_UNKNOWN_LOCKED` |
| `world:S02` | Mount Myōboku | `????` | `KNOWN_UNKNOWN_LOCKED` |
| `world:S03` | Shikkotsu Forest | `????` | `KNOWN_UNKNOWN_LOCKED` |
| `world:S04` | Akatsuki Hideout | `????` | `KNOWN_UNKNOWN_LOCKED` |
| `world:S05` | Jinchūriki Temple | `????` | `KNOWN_UNKNOWN_LOCKED` |
| `world:S06` | Valley of the End | `????` | `KNOWN_UNKNOWN_LOCKED` |
| `world:S07` | Tomb of the Sage of Six Paths | `????` | `KNOWN_UNKNOWN_LOCKED` |

`world:S08` Infinite Tsukuyomi World remains non-physical and must not receive a terrain anchor.

### `KNOWN_UNKNOWN_LOCKED` semantics

The player may legitimately know:

> a special unknown location / destination exists in this vicinity.

They do **not** thereby know:

- its canonical name;
- its exact nature;
- who controls it;
- how to enter;
- what reward/content it contains;
- whether they currently qualify for access.

The initial World Map projection for `world:S01`–`world:S07` is therefore:

- approved gold halo/ring;
- visible label exactly `????`;
- no canonical identity leak in tooltip, DOM, accessibility name, URL, dataset, hidden description or focus text;
- no `ENTER` / `TRAVEL` / `BATTLE` / `RECRUIT` action by default.

The marker may be selectable for focus/presentation, but selection must not create Knowledge beyond the known-unknown fact and must not grant access.

## 7. Secret state progression

For the seven physical reservations:

`KNOWN_UNKNOWN_LOCKED`
→ `DISCOVERED_IDENTITY`
→ `ACTIONABLE`

The second and third states may coincide only where the owning reveal/access contract explicitly says identity discovery also grants immediate access.

World Map v2 does **not** itself author those reveal/access predicates.

Later owners may include Story, World, Progression, Skills, Acquisition or another exact authority depending on the secret.

Until such predicates are durable, the seven reservations remain `KNOWN_UNKNOWN_LOCKED`.

No RNG roll may reveal or grant access without authored eligibility.

## 8. Truly unknown secrets remain possible

The seven gold-halo reservations are a deliberate special presentation family.

They do not create a universal rule that every secret must advertise itself.

Other undiscovered world locations may still use:

`UNKNOWN / ZERO-LEAK`

with no marker, pointer response, focus entry, tooltip, accessible name or DOM disclosure.

## 9. Country envelopes / borders

The `world:C##` rectangles remain geographic placement envelopes only.

World does **not** currently author exact political-border polygons for Alpha.

Therefore runtime/UI must not use the rectangle edges as canonical national borders, border-crossing triggers or checkpoint lines.

If exact borders become necessary for Arc 2 travel, invasion pressure or cross-country mission legality, World will author a separate border/route contract against the final terrain master.

## 10. Story / Arc integration

### Arc 1

Arc 1 remains principally Konoha / Land of Fire focused. World Map v2 may establish the broader geopolitical world visually, but the presence of all sixteen country labels does not require Arc 1 travel to them.

### Arc 2+

The World Map v2 country addresses are the macro anchors for later multi-country Story pressure and travel.

Story may activate a country or country-level overlay only from exact committed narrative/world state.

No country becomes hostile, invaded, accessible or mission-bearing merely because it has an anchor.

## 11. Runtime projection requirements after final binary promotion

Once UI / Assets promotes the exact final World Map v2 production binary, Coding should consume:

- the final asset path/blob/dimensions;
- UI's revalidated `world:C##` and `world:S##` geometry;
- this World semantic contract.

Implementation must preserve:

1. country presentation != actionability;
2. all sixteen country identities without creating fake region surfaces;
3. existing Five-Great-Country region navigation where legally available;
4. seven physical `????` halos with zero canonical-name leakage;
5. no ordinary terrain anchor for `world:S08`;
6. actual rendered-image-content-box coordinate projection rather than viewport percentages;
7. Story/world overlays as separate projection layers;
8. save/load stability of discovered secret identity/access state once later predicates are implemented.

## 12. Current blocker / next owner

World semantic consumption of GitHub #48 is complete.

The only current production blocker for World Map v2 integration is:

**UI / Assets must promote or supersede the 1672×941 candidate as the final repository World Map background and revalidate the calibration against that exact binary.**

Until then:

- World may author against `world:C##` / `world:S##` semantic addresses;
- Coding must not treat candidate pixel geometry as final runtime authority.

## 13. Status

**Country semantic identities:** CLOSED  
**Alpha country presentation/actionability separation:** CLOSED  
**Seven high-profile secret initial presentation state:** CLOSED  
**S08 non-physical treatment:** CLOSED  
**World Map standing-event boundary:** CLOSED  
**Exact political borders:** NOT REQUIRED FOR CURRENT ALPHA / FUTURE WORLD WORK  
**Final World Map v2 production binary:** WAITING ON UI / ASSETS  
**Runtime integration:** WAITING ON FINAL BINARY + GEOMETRY REVALIDATION
