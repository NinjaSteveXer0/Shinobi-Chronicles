# Shinobi Chronicles — Land of Fire Regional Hotspot Calibration v2

**Date:** 9 September 2026  
**Owner:** UI / Assets  
**Status:** **CURRENT PRODUCTION MAP / HOTSPOT GEOMETRY AUTHORITY — FIRE (10) REVALIDATED**

## Status and master contract

- **Authoritative production asset:** `Backgrounds/inside_LOF.png`
- **Git blob:** `b1300c48e786981f610f7a46c82d92c245da2d1c`
- **Later-master identity:** Fire `(10)`
- **Exact native canvas:** **1536 × 1024 px**
- **Coordinate origin:** top-left, `(0,0)`
- **Artwork changes in this calibration:** none
- **Purpose:** current-master spatial authority for discovery-aware regional interaction
- **Supersedes for production geometry:** `Land_of_Fire_Regional_Hotspot_Calibration_v1.md`
- **v1 historical binding retained:** `inside_LOF(9).PNG`, 1536 × 1024

All rectangles use `x1,y1 → x2,y2`. Anchors are independent from interaction regions. A region may exist with no marker, label, focus target, pointer response, or accessibility disclosure.

## Fire (10) revalidation result

The current repository binary was matched to the exact later Fire `(10)` master before coordinates were promoted. The production file remains `Backgrounds/inside_LOF.png`, native **1536 × 1024**, with Git blob `b1300c48e786981f610f7a46c82d92c245da2d1c`.

Repository lineage confirms the current binary entered the interactive-map line at commit `94cddaf818d2b2c873ecd4ad7d53c6f0a116b851` (`map update, added new interactive maps`) and was later moved to the current `Backgrounds/` path without binary change at commit `04975a8d3f837509c0eb3b79aac1c33fec9e2b26`.

The v1 geometry was then revalidated against this exact Fire `(10)` artwork rather than copied by assumption. Result:

- **14 / 14 regional zones:** revalidated;
- **12 / 12 public destinations:** anchor and interaction region revalidated;
- **6 / 6 service anchors:** revalidated within their host destination regions;
- **20 / 20 optional destinations:** anchor and interaction region revalidated;
- **28 / 28 concealed/event reservations:** suspicion anchor and interaction region revalidated;
- **12 / 12 travel corridors:** ordered control-point chains revalidated;
- **0 coordinate changes required.**

The current art retains the geometry the v1 coordinates were describing: central Konohagakure, the north-central monument forest, north-eastern Fire-emblem caldera, western training plateau, north-western lake/watchtower, Verdant Falls, eastern cavern range, eastern shrine/pilgrim country, southern border fortress, southern civic/Fire Capital territory, Naka river network, and south-eastern harbour/coast.

This is therefore a **revalidated carry-forward of geometry onto a newly proven source binding**, not a claim that coordinates are artwork-independent.

> **v1 remains historical provenance for `inside_LOF(9).PNG`. v2 is the current production geometry authority for Fire `(10)` / `Backgrounds/inside_LOF.png`.**

## Runtime projection rule

Coordinates in this document are authored on the native **1536 × 1024** image canvas. Runtime must project them against the actual rendered image-content box, not against an assumed browser viewport.

For an uncropped render:

`renderedX = imageLeft + (nativeX / 1536) × renderedImageWidth`

`renderedY = imageTop + (nativeY / 1024) × renderedImageHeight`

If CSS introduces letterboxing, containment, or any other offset, Coding must use the actual displayed image-content bounds. Runtime scaling must keep anchors, interaction regions, and route points aligned to the same image transform.

Responsive alignment being specified here does **not** mean runtime validation is complete. Responsive, keyboard/focus, pointer, accessibility, and unknown-location non-leakage checks remain implementation verification work after integration.

## Locked regional interaction contract

1. The illustrated map is immutable presentation artwork.
2. World existence, player knowledge, discovery record, presentation state, available actions, and results remain separate.
3. Interaction regions are generous responsive areas; visual anchors are independently configurable.
4. Public destinations may begin known when the Land of Fire becomes accessible.
5. Optional destinations begin iconless unless legitimately discovered.
6. A concealed location may produce no response, an unlabelled perceptible-anomaly treatment, partial identification, or a confirmed destination according to authoritative state.
7. A truly unknown secret must not leak through DOM presence, pointer changes, focus order, tooltips, accessible names, or cursor behaviour.
8. Hover, focus, selection, discovery effects, icons, labels, fog treatment, and route emphasis are live UI only—never baked into the map.
9. Routes are contextual travel territories, not fixed content buckets. They may host repeatable activities, missions, NPC encounters, discoveries, ambush contexts, or temporary Chronicle events when an authoritative system supplies them.
10. The map presents authored environmental and encounter context; it does not invent universal weather, ambush, Skill, or discovery mechanics.
11. Public Hospital, Workshop, Shop, and available Fūinjutsu services expose specialist actions but do not own the persistent domains they affect.
12. Summon encounters create acquisition opportunities; meeting a Summon does not automatically grant access.

## Presentation states

| State | Map response |
|---|---|
| Unknown | No response and no information leak |
| Perceptible anomaly | Unlabelled anomaly treatment when authorised; no canonical hidden identity |
| Suspicious | Uncertain visual treatment and investigable action |
| Partially recognised | Limited descriptor; identity still withheld |
| Discovered | Stable marker and known label |
| Actionable | Discovered presentation plus valid current actions |
| Temporarily active | Event/NPC treatment layered onto its host region |

Current colour/material treatment for anomaly, discovery, Story, and known-destination states belongs to the live UI theme. This calibration owns **state and geometry**, not a permanent anomaly colour.

Normal-map density target: **9–14 known markers**, **0–3 anomalies**, and **0–3 temporary event treatments** at once.

## Regional zones

Zones support atmosphere, travel context, reusable mission placement, and broad exploration. They are lower priority than specific destinations.

| ID | Zone | Interaction region | Anchor |
|---|---|---|---|
| Z01 | Konoha Heartland | `500,280 → 970,570` | `748,410` |
| Z02 | Hokage Monument Forest | `520,120 → 900,320` | `720,215` |
| Z03 | Western Training Country | `80,220 → 470,470` | `270,335` |
| Z04 | Northwestern Lakes | `350,60 → 610,300` | `495,165` |
| Z05 | Firewatch Caldera | `900,20 → 1280,235` | `1090,125` |
| Z06 | Verdant Falls Basin | `880,175 → 1210,410` | `1040,285` |
| Z07 | Eastern Cavern Range | `1240,150 → 1535,420` | `1400,285` |
| Z08 | Fire Temple & Pilgrim Country | `1060,390 → 1460,690` | `1280,525` |
| Z09 | Southern Riverlands | `430,520 → 930,850` | `650,685` |
| Z10 | Fire Capital Territory | `760,680 → 1060,960` | `905,835` |
| Z11 | Southern Borderlands | `400,800 → 870,1023` | `650,920` |
| Z12 | Emberfall Coast | `1160,690 → 1535,1023` | `1380,870` |
| Z13 | Southwestern Forest Settlements | `0,430 → 470,920` | `220,680` |
| Z14 | Naka River Network | `420,390 → 990,850` | `650,680` |

## Public destinations

| ID | Destination | Interaction region | Visual anchor | Initial presentation |
|---|---|---|---|---|
| P01 | Konohagakure | `535,290 → 955,550` | `748,410` | Known |
| P02 | Fire Capital | `785,720 → 1035,950` | `905,835` | Known |
| P03 | Fire Temple | `1135,400 → 1435,665` | `1280,520` | Known |
| P04 | Tanzaku Quarters | `20,660 → 355,915` | `180,790` | Known |
| P05 | Emberfall Harbour | `1190,710 → 1535,1010` | `1380,870` | Known |
| P06 | Southern Border Fortress | `435,820 → 850,1023` | `650,920` | Known |
| P07 | Western Training Plateau | `105,245 → 445,430` | `270,330` | Known |
| P08 | Naka River Crossing | `480,555 → 845,805` | `650,680` | Known |
| P09 | Firewatch Caldera | `925,30 → 1260,225` | `1090,120` | Known |
| P10 | Verdant Falls Basin | `900,180 → 1190,405` | `1040,270` | Known |
| P11 | Eastern Pilgrim Road | `1015,425 → 1380,720` | `1195,575` | Known |
| P12 | Beacon Lake Watchtower | `410,75 → 585,275` | `495,160` | Known |

## Public specialist-service anchors

These services share their host destination's broader interaction region while retaining independently configurable live anchors. At distant zoom they collapse into the host marker.

| ID | Service | Host | Visual anchor | Initial presentation |
|---|---|---|---|---|
| SV01 | Konoha Hospital | P01 | `690,445` | Known |
| SV02 | Tenten's Forge and Equipment Workshop | P01 | `790,450` | Known |
| SV03 | Konoha Fūinjutsu Guidance and Service | P01 | `835,405` | Known if publicly available |
| SV04 | Fire Capital Hospital | P02 | `875,850` | Known |
| SV05 | Emberfall Maritime Repair Yard | P05 | `1390,900` | Known |
| SV06 | Southern Border Caravan Workshop | P06 | `660,945` | Known |

## Optional destinations

| ID | Destination | Interaction region | Visual anchor | Default |
|---|---|---|---|---|
| O01 | Cedar Smoke Village | `125,445 → 350,650` | `240,550` | Iconless |
| O02 | Riverstone Hamlet | `400,505 → 595,700` | `495,605` | Iconless |
| O03 | Foxglove Medicine House | `985,595 → 1155,755` | `1070,675` | Iconless |
| O04 | Charcoal Burners' Camp | `245,495 → 435,690` | `340,595` | Iconless |
| O05 | Konoha Courier Station | `555,535 → 725,685` | `640,610` | Iconless |
| O06 | Fireglass Mining Camp | `975,185 → 1165,365` | `1070,275` | Iconless |
| O07 | Old Pilgrims' Lodge | `1155,425 → 1325,595` | `1240,510` | Iconless |
| O08 | Waterfall Tea House | `975,295 → 1145,450` | `1060,370` | Iconless |
| O09 | Border Market | `555,820 → 765,985` | `660,900` | Iconless |
| O10 | Cedarwood Crafts Village | `295,645 → 485,825` | `390,735` | Iconless |
| O11 | Daimyō Hunting Estate | `775,645 → 985,835` | `880,740` | Iconless |
| O12 | Guardian Memorial Field | `1095,445 → 1265,615` | `1180,530` | Iconless |
| O13 | Stone Lantern Cemetery | `1215,545 → 1405,705` | `1310,625` | Iconless |
| O14 | Red Maple Grove | `595,445 → 765,615` | `680,530` | Iconless |
| O15 | Hunters' Relay Post | `345,325 → 525,505` | `435,415` | Iconless |
| O16 | Floodplain Rice Terraces | `695,675 → 905,845` | `800,760` | Iconless |
| O17 | Ashwind Observatory | `1165,95 → 1325,285` | `1245,190` | Iconless |
| O18 | Sealed Cargo Depot | `1245,775 → 1445,955` | `1345,865` | Iconless |
| O19 | Old Daimyō Road | `755,515 → 985,705` | `870,610` | Iconless |
| O20 | Riverside Summoning Ground | `735,575 → 925,755` | `830,665` | Iconless |

## Concealed and event-driven reservations

These names are authoring identities, not automatically player-facing labels. The suspicion anchor is where an authorised anomaly treatment may appear; it does not define the hit area.

| ID | Authoring identity | Interaction region | Suspicion anchor | Earliest allowed response |
|---|---|---|---|---|
| S01 | Orochimaru's Field Annex | `1315,375 → 1505,565` | `1410,470` | None |
| S02 | Root Border Safehouse | `345,145 → 535,325` | `440,235` | None |
| S03 | ANBU Dead-Drop Grove | `495,225 → 655,395` | `575,310` | None |
| S04 | Uchiha Wartime Storehouse | `1135,645 → 1305,815` | `1220,730` | None |
| S05 | Uzumaki Boundary Seal | `865,395 → 1035,565` | `950,480` | Perceptible anomaly |
| S06 | Twelve Guardians' Hidden Reliquary | `1185,345 → 1365,525` | `1275,435` | None |
| S07 | Forgotten Senju Muster Camp | `195,415 → 385,595` | `290,505` | Perceptible anomaly |
| S08 | White Zetsu Root-Cavern | `1255,205 → 1445,395` | `1350,300` | None |
| S09 | Foxfire Shrine | `1015,455 → 1175,625` | `1095,540` | Perceptible anomaly |
| S10 | Bandit King's Hollow | `35,495 → 215,705` | `125,600` | Perceptible anomaly |
| S11 | Black Market River Dock | `1365,755 → 1535,955` | `1450,855` | None |
| S12 | Burned Messenger Route | `415,615 → 595,795` | `505,705` | Suspicious |
| S13 | Hidden Battlefield Ossuary | `245,715 → 425,895` | `335,805` | None |
| S14 | Sealed Caldera Furnace | `1025,65 → 1185,235` | `1105,150` | Perceptible anomaly |
| S15 | Blue-Flame Cavern | `1315,175 → 1515,375` | `1415,275` | Perceptible anomaly |
| S16 | Drowned Shrine Passage | `975,215 → 1145,395` | `1060,305` | None |
| S17 | False Torii | `1115,465 → 1295,645` | `1205,555` | Suspicious |
| S18 | Daimyō Escape Residence | `825,755 → 995,925` | `910,840` | None |
| S19 | Abandoned Interrogation Farm | `65,695 → 255,880` | `160,790` | None |
| S20 | Nameless Battlefield Bell | `645,645 → 825,825` | `735,735` | Perceptible anomaly |
| S21 | Smouldering Stone Circle | `855,555 → 1025,725` | `940,640` | Perceptible anomaly |
| S22 | Ancient Summon Waystone | `725,565 → 885,725` | `805,645` | Perceptible anomaly |
| S23 | Buried Fire-Country Archive | `695,165 → 875,345` | `785,255` | None |
| S24 | Listening Forest | `5,245 → 195,475` | `100,360` | Suspicious |
| S25 | Lost Caravan of Embers | `465,735 → 695,925` | `580,830` | Event only |
| S26 | Underground Bounty Exchange | `245,545 → 425,725` | `335,635` | None |
| S27 | Sealed Plague Camp | `355,695 → 545,885` | `450,790` | None |
| S28 | Hollow Hokage Road | `545,315 → 735,515` | `640,415` | Suspicious |

## Travel corridors

Each route is an ordered centreline. Coding may create a forgiving invisible band around it; recommended starting half-width is **28–42 px**, widened at junctions. Route presentation is normally invisible.

| ID | Route | Ordered control points |
|---|---|---|
| R01 | Konoha → Fire Capital | `(748,410) → (700,560) → (680,680) → (805,760) → (905,835)` |
| R02 | Konoha → Fire Temple | `(748,410) → (900,490) → (1040,560) → (1180,540) → (1280,520)` |
| R03 | Konoha → Western Training Plateau | `(748,410) → (590,430) → (450,390) → (270,330)` |
| R04 | Konoha → Verdant Falls | `(748,410) → (870,360) → (960,320) → (1040,270)` |
| R05 | Fire Capital → Southern Border Fortress | `(905,835) → (820,865) → (735,900) → (650,920)` |
| R06 | Fire Capital → Emberfall Harbour | `(905,835) → (1060,820) → (1220,840) → (1380,870)` |
| R07 | Tanzaku Quarters → Konoha | `(180,790) → (330,720) → (470,620) → (600,520) → (748,410)` |
| R08 | Caldera Mining Route | `(1090,120) → (1050,200) → (1010,280) → (980,360)` |
| R09 | Eastern Pilgrim Road | `(1280,520) → (1170,590) → (1070,650) → (960,700)` |
| R10 | Naka River Route | `(480,420) → (520,520) → (600,620) → (650,680) → (760,760) → (900,835)` |
| R11 | Fire Capital → Tanzaku Quarters | `(905,835) → (745,800) → (585,770) → (415,780) → (180,790)` |
| R12 | Hidden Hokage Road | `(748,410) → (675,350) → (600,305) → (520,265) → (445,225)` |

R12 exists as world truth but begins unrecognised. Route discoveries and events should reference stable route IDs plus a segment or progress interval; they should not require another parallel hotspot system.

## Overlap resolution

When regions overlap, resolve presentation/input in this order:

1. Active temporary event
2. Confirmed actionable destination
3. Authorised anomaly or investigation
4. Route interaction
5. Regional zone response
6. Background map

Overlap never grants knowledge. If the higher-priority candidate is not authorised, continue evaluating eligible lower layers without revealing it.

## Alpha activation subset

Recommended first implementation:

- Konohagakure
- Fire Capital
- Fire Temple
- Tanzaku Quarters
- Emberfall Harbour
- Southern Border Fortress
- Western Training Plateau
- Verdant Falls Basin
- Foxglove Medicine House
- Cedarwood Crafts Village
- two optional settlements
- all twelve reusable route IDs
- four to six concealed locations spanning **no response**, **perceptible anomaly**, **suspicious**, and **discovered**

This subset tests public travel, specialist services, optional discovery, hidden perception, event hosting, and route-based recyclable content without flooding the map.

## ⚠️📜 Chronicle Engine alert — route continuity

> **REGIONAL TRAVEL CORRIDORS MUST REMAIN STABLE WORLD REFERENCES CAPABLE OF ACCUMULATING EVENT, MISSION, PARTICIPANT, DISCOVERY AND HISTORICAL ASSOCIATIONS.**
>
> A route is not just a clickable line and must not own those histories; it supplies the spatial context against which authoritative systems record them.

## Acceptance check

- Exact Fire (10) `Backgrounds/inside_LOF.png` / blob `b1300c48e786981f610f7a46c82d92c245da2d1c` / 1536×1024 binding retained
- No artwork modification
- Regions and anchors independently configurable
- No baked icons, glows, labels, fog, or selected states
- Unknown secrets create no interaction/accessibility leak
- Public, optional, secret, and temporary behaviours are distinct
- Generous interaction regions do not dictate marker size
- Route corridors support reusable content without becoming a second activity authority
- Specialist services expose actions without duplicating persistent domain ownership
- Summon opportunities do not equal automatic acquisition
- Marker-density limits preserve readable geography
- All dynamic eligibility comes from authoritative game state

## Production-validation boundary

This document closes **source binding + presentation geometry** for the current Fire (10) master. It does not by itself prove DOM implementation, save/load behaviour, browser responsive alignment, pointer/focus behaviour, accessibility non-leakage, event eligibility, or Golden/regression GREEN. Those require runtime implementation and verification by the appropriate owner.
