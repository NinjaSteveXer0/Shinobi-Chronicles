# Shinobi Chronicles — Runtime Projection over UI Master Art Contract

Date: 9 September 2026

Status: **BINDING ALPHA UI IMPLEMENTATION CONTRACT — LOCKED**

## Core rule

> **Production UI masters show what a surface can look like; they do not prescribe what runtime must recreate.**

> **UI master art defines composition, atmosphere, framing and placement guidance. DOM/runtime owns mutable, semantic and interactive content.**

A raster UI master may be used as a visual/coordinate reference layer. Coding must not rebuild decorative content already present in the master, and must not treat baked placeholder geometry as semantic authority.

## Placement-only master principle

Where a production UI master exists, Coding should treat it as a spatial composition reference and define runtime placement zones over it, preferably as normalized coordinates/percentages relative to the rendered master rectangle rather than brittle absolute viewport pixels.

The master may guide placement for zones such as:

- formation slots;
- roster viewport;
- selected-character viewport;
- filters/search/sort controls;
- details panels;
- action/button wells;
- dialogue/source/context/action zones.

The master does not own the contents of those zones.

## Runtime ownership

DOM/runtime owns all mutable or semantic objects, including where applicable:

- collectible cards;
- uiPortraits;
- names and identity fields;
- PL/Stats;
- ownership/eligibility state;
- formation occupants/order;
- search/filter/sort values;
- scrolling;
- selected/hover/disabled/dirty states;
- buttons and click/drag/drop behavior;
- inventory/equipment/technique/summon content;
- Story text/choices/actions;
- save/apply/reset behavior;
- runtime animation and feedback.

If Coding can reliably implement an element without baking it into raster art, Coding should own it.

## Baked/static ownership

Raster/master art may own:

- background/environment;
- decorative frames and borders;
- ornamentation;
- atmosphere/lighting/textures;
- non-semantic empty wells;
- static separators;
- fixed decorative labels/headings where useful.

Baked placeholders must never establish runtime capacity, ownership, eligibility or exact slot count unless separately ratified by the owning gameplay system.

## Do not duplicate the master

Coding must not render a second decorative UI on top of a master that already contains that visual furniture.

Examples of prohibited duplication include:

- coded slot frames over baked slot frames;
- coded static START/NEXT/RESERVE labels over baked labels;
- duplicate Save/Clear controls when the master already provides the visual control well;
- duplicate search/filter/sort bars;
- generic EMPTY icons/text when the empty master well already communicates vacancy.

Runtime should project only the changing content and interactive hit areas required by the actual system.

## Responsive coordinate rule

When runtime content must align to a production master, placement should be defined relative to the rendered master rectangle, for example:

`x = masterX / masterWidth`

`y = masterY / masterHeight`

`w = zoneWidth / masterWidth`

`h = zoneHeight / masterHeight`

This keeps runtime projection attached to the composition across supported viewport sizes.

Inside large content zones, ordinary responsive layout systems such as CSS Grid/Flex and scrolling should own content placement. Individual roster cards or inventory items should not be assigned one baked coordinate each unless the design explicitly requires it.

## Semantic non-collapse

Preserve all existing specialist boundaries. In particular:

- asset slot != occupant authority;
- presentation selection != ownership mutation;
- owned != assigned != deployed;
- collectibleCard != uiPortrait;
- displayed choice != committed history;
- UI visibility != Knowledge/presence/Battle authority;
- decorative placeholder count != gameplay capacity;
- UI master != gameplay system authority.

## Removability requirement

A UI master should be removable or replaceable later without destroying the underlying semantic/interactive system.

Canonical implementation goal:

> **Remove the image, keep the coded system.**

Loss of the raster master may reduce polish and composition guidance, but must not erase ownership, formation, inventory, Story, choice, save/load or other runtime behavior.

## Surface guidance

### My Clan

- `UI/my_clan_browse.png` and `UI/my_clan_inspection.png` are placement/composition masters.
- Formation occupants are runtime uiPortraits.
- Roster is a runtime responsive grid of full collectible cards.
- Search/filter/sort/save/clear are runtime controls aligned to master wells/regions, not duplicated decorative panels.

### Loadout / Inventory

- `UI/loadout.png` is a placement/composition master.
- Exact Equipment/Technique/Summon slots and capacities come from owning systems.
- Available inventory is a runtime viewport/grid.
- Details and staged transaction state are runtime.

### Chronicle Interaction

- `UI/convo.png` is a placement/composition master for Full/Standard/Quick projections where appropriate.
- Story/source/context/choices/actions remain runtime projections from existing Story/Chronicle authority.
- Scene/environment art may remain more visually important where narrative context benefits from it.

### Maps / Story environments

Interactive maps and Story/environment surfaces may rely more heavily on authored background/environment art because geography, atmosphere and scene location are themselves important presentation content. Even there, runtime markers, participants, choices, interaction state and semantics remain code-owned unless explicitly authored otherwise.

## Alpha implementation rule

For Alpha, prefer implementation velocity and runtime robustness over recreating every visual detail in DOM.

Use the master to guide placement. Do not let the master constrain semantics. Do not create speculative systems to fill empty art.

Until browser-proven:

**master landed != runtime projected correctly != browser validated != Golden GREEN**.

## Final contract

> **Shinobi Chronicles UI masters are optional visual composition layers. They show what a screen can look like, while DOM/runtime owns the actual game interface. Coding should use masters for placement and polish, never as semantic authority, and the coded system must remain functional even if the master image is later removed.**
