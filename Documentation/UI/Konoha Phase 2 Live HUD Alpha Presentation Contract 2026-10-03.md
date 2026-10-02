# Shinobi Chronicles — Konoha Phase-2 Live HUD Alpha Presentation Contract

**Date:** 2026-10-03  
**Owner:** UI / Assets  
**Status:** **APPROVED ALPHA PRESENTATION CONTRACT — DESIGN CLOSED / CODING MAY IMPLEMENT AFTER MASTER #449 STEP-3 SAFE CLOSURE**  
**Source issue:** #497  
**Master queue:** #449 Step 4  
**Semantic authority:** `Documentation/Coordination/Konoha_Phase_2_Live_HUD_Minimum_Information_and_Navigation_Contract_2026-10-01.md`

---

# 1. Purpose

This contract closes the smallest player-facing HUD presentation required for Konoha / regional / World-map play in Phase 2.

The HUD is a **read-only live projection of canonical Chronicle state** plus navigation into existing player surfaces.

It is not:
- a second state store;
- a new team manager;
- a new Journey owner;
- a new Inventory owner;
- a new Shinobi Record owner;
- a new map renderer;
- a full Ninja ID replacement;
- a permanent dashboard covering the map.

Canonical:

> **The map remains the visual focus. The HUD lives around it.**

> **HUD display != semantic ownership.**

---

# 2. Visual direction

Use the established Shinobi Chronicles presentation language:
- dark charcoal / blue-black translucent surfaces;
- restrained gold structure / identity accents;
- cyan for current/live focus where useful;
- warm gold for Ryō;
- compact uppercase labels;
- thin borders and shallow shadow;
- no giant opaque dashboard;
- no baked dynamic state in map artwork.

The HUD should feel like a lightweight shinobi field interface layered around the live map, not a menu screen pasted over it.

Do not require new image generation.

---

# 3. Desktop composition

Primary Alpha target remains landscape desktop, approximately 1366×768 through 1920×1080.

Use four compact edge-owned regions:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [IDENTITY DOCK]          [CURRENT JOURNEY / OBJECTIVE]         [RYŌ]        │
│ portrait / name / Rank        compact 1–2 line locator        status chip   │
│ village/allegiance                                                           │
│                                                                             │
│ [CURRENT TEAM]                                                     MAP /     │
│ 3 compact portraits                                                REGION   │
│ + TEAM label                                                       NAV      │
│                                                                             │
│                                                                             │
│                          LIVE MAP / HOTSPOTS                                │
│                                                                             │
│                                                                             │
│ [MY CLAN] [INVENTORY] [SHINOBI RECORD] [JOURNEY]              [BACK/WORLD] │
└─────────────────────────────────────────────────────────────────────────────┘
```

The centre of the screen remains clear for:
- map art;
- location labels;
- hotspot markers;
- World/CE opportunity markers;
- player map interaction.

HUD surfaces must use edge/corner docking and compact expansion rather than consuming the central field.

---

# 4. Identity Dock — top left

## Visible compact state

Show:
- current protagonist / active identity portrait;
- player-facing name;
- current formal Rank;
- village / current allegiance where legitimate.

Recommended presentation:
- portrait approximately 48–64px square on desktop;
- name as the strongest text;
- Rank and village as small secondary chips/lines;
- one compact grouped surface, not four detached badges.

Do not show:
- full Stats;
- PL formula;
- hidden identity truth;
- developer IDs;
- private affiliation inference;
- historical Rank assumptions.

## Portrait rule

Use the current approved identity/portrait resolver.

Do not:
- crop a collectible Character Card as a HUD portrait when an approved UI portrait exists;
- create a HUD-only identity mapping;
- infer a different representation because a prettier asset exists.

## Full Ninja ID relation

Compact HUD identity and any future/full Ninja ID are two presentation depths over the same canonical state.

If a full Ninja ID/identity inspection route is currently available, clicking/focusing the Identity Dock may open it.

If that route is not yet implemented, the compact Identity Dock remains valid and read-only; do not invent a placeholder semantic owner just to make the dock clickable.

---

# 5. Ryō / future Energy — top right

Show current committed **Ryō** as one compact status chip.

Presentation:
- warm-gold currency accent;
- numeric value readable at a glance;
- no giant economy panel.

## Energy

Reserve layout capability for a future adjacent Energy chip, but:

> **Do not render live Energy, 0/0 Energy, a fake bar, regeneration timer or placeholder value before #433 activates authoritative Energy state.**

The current Alpha HUD may simply leave the future slot unrendered.

Reserved layout capacity != visible fake system.

---

# 6. Current Journey / objective — top centre

Show one concise observer-safe current Journey / Story locator when legitimate.

Presentation:
- compact centred chip/strip;
- approximately one short line, maximum two lines on ordinary desktop;
- title/label may read `CURRENT JOURNEY` or `OBJECTIVE`;
- selected text is current observer-safe player-facing objective copy only;
- clicking opens the existing Journey / Missions surface.

Do not expose:
- future Story beats;
- hidden mission branches;
- secret hotspots;
- hidden CE event identities;
- private NPC truth;
- eligibility diagnostics;
- undiscovered locations.

If there is no legitimate current objective:
- collapse/hide the objective text surface cleanly;
- JOURNEY navigation remains available in the quick-action dock.

Do not manufacture a filler objective.

---

# 7. Current Team Dock — left edge

Show the **exact committed currentTeam**, not the owned roster and not a legacy team fixture.

For the current Academy/Konoha Alpha team this normally means three committed members.

Presentation:
- compact vertical or shallow stacked dock at the left edge below Identity;
- label `CURRENT TEAM`;
- up to three approved compact participant portraits;
- protagonist may be visually first if current team authority orders it that way; do not reorder team semantics for aesthetics;
- optional hover/focus expansion may reveal player-facing names;
- no permanent full card display.

## Team portrait source

Prefer the same approved compact/UI portrait authority used for formation-style presentation where available.

Do not silently crop collectible cards or invent substitute NPC images.

## Interaction

Click/focus on the Team Dock may open:
- My Clan;
- or an existing current-team inspection/management entry point if one is already authoritative.

Opening Team access must not:
- mutate assignment;
- auto-save a formation;
- replace currentTeam;
- infer ownership;
- deploy a character.

Canonical:

> **HUD team visibility != roster ownership != assignment mutation != deployment.**

---

# 8. Quick Action Dock — bottom left / bottom centre

Provide four persistent compact actions on Konoha / regional / World-map surfaces:

- **MY CLAN**
- **INVENTORY**
- **SHINOBI RECORD**
- **JOURNEY**

Presentation:
- one compact horizontal dock where width permits;
- text remains visible at normal desktop target;
- restrained glyph/icon support is optional;
- no new image asset is required;
- active/hover/focus state may use cyan;
- default border/structure may use muted gold/steel.

These are navigation controls only.

They do not:
- alter team assignment;
- grant Items;
- create Record entries;
- advance Story;
- resolve Missions.

Each action opens its current canonical surface.

Do not duplicate those surfaces inside the HUD.

---

# 9. Map / region navigation — right edge / bottom right

HUD may expose only navigation that is legitimate from the current map depth.

Examples of valid control roles:
- BACK;
- VILLAGE / REGION;
- WORLD MAP;
- current region return.

Exact labels/routes must come from current navigation authority.

Do not invent a new geographical hierarchy merely to fill the dock.

Presentation:
- compact right-edge or bottom-right cluster;
- visually separate from player-state actions;
- current-map depth may be shown as a small context label;
- inactive/unavailable routes should be omitted or disabled only when current navigation truth says so.

Navigation controls must not:
- mutate Story;
- reveal undiscovered/secret locations;
- bypass access gates.

---

# 10. Map visual priority / safe zones

The map remains the primary visual object.

Desktop HUD budget:
- top strip: approximately 72–92px maximum visual occupation;
- left team dock: approximately 70–96px wide when collapsed;
- bottom quick-action dock: approximately 44–58px high;
- right navigation cluster: compact, content-sized.

These are presentation targets, not semantic dimensions.

The central map interaction field must remain visibly dominant.

Requirements:
- HUD containers should be translucent enough to preserve environmental context but opaque enough for text legibility;
- no full-width opaque banner across the centre;
- no permanent side panel consuming 25–35% of the map;
- no hover expansion should cover a currently focused hotspot if a safe alternative exists;
- use pointer events only on actual HUD controls/surfaces so transparent HUD space does not block map interaction.

---

# 11. Expansion behaviour

The default HUD is compact.

Allowed expansion:
- hover/focus may expand Rank/village text;
- Team Dock may expose member names;
- Journey chip may expose one additional short line;
- navigation may expose labels beside compact controls.

Expansion must:
- remain bounded;
- collapse naturally on blur/pointer exit where appropriate;
- support keyboard focus;
- support touch/click without hover dependence;
- not become a second modal dashboard.

Any deeper information belongs in the destination surface.

---

# 12. Responsive behaviour

## Standard desktop / wide landscape

Show:
- full compact Identity Dock;
- Journey chip;
- Ryō chip;
- currentTeam portrait dock;
- four labeled quick actions;
- map navigation cluster.

## Narrow landscape / tablet-width browser

Prefer:
- slightly smaller portrait/docks;
- quick-action labels may compress but remain identifiable;
- Journey chip may truncate to one line with accessible full text;
- Team portraits may stack more tightly.

## Small width

Do not solve crowding by covering the map.

Allowed:
- convert the four quick actions into a compact expandable navigation rail;
- reduce secondary village/allegiance copy;
- keep identity name, Rank, Ryō and Journey access reachable;
- keep currentTeam access reachable.

Do not hide critical navigation behind hover-only behaviour.

---

# 13. Accessibility

Required:
- all HUD controls keyboard focusable;
- visible focus state;
- semantic button/link labels;
- portrait-only controls require accessible names;
- current Journey text readable by assistive technology even when visually truncated;
- colour is not the only distinction between interactive states;
- reduced motion does not remove information.

HUD hover expansion must have keyboard/focus equivalent.

---

# 14. State ownership / data projection

HUD must read from existing canonical authority only.

Minimum projection domains:
- active/protagonist identity;
- player-facing name;
- formal Rank;
- legitimate village/allegiance;
- current Ryō;
- committed currentTeam;
- current observer-safe Journey/objective;
- current map/navigation depth.

The HUD owns none of those values.

Do not create:
- `hudPlayerState`;
- `hudTeam`;
- `hudJourney`;
- `hudRyo`;
- a mirrored save blob;
- a HUD-local currentTeam cache treated as truth.

A render cache may exist for performance, but it must be disposable projection only and reconstructable from canonical state.

---

# 15. Refresh / persistence behaviour

The HUD should refresh after authoritative changes such as:
- Ryō transaction;
- legitimate Rank change;
- currentTeam commit;
- active identity/representation change where authorised;
- Journey/objective change;
- map-depth/navigation change.

Refresh does not commit new history.

Save/load must reconstruct the same visible HUD from source state.

HUD redraw must not:
- duplicate transactions;
- recommit team state;
- advance Journey;
- create Shinobi Record history.

---

# 16. Contextual HUD suppression

The live map HUD belongs on:
- Konoha village map;
- regional map surfaces;
- World-map surfaces where the same information remains useful.

It should not remain fully overlaid during:
- Story Scene Board;
- Battle;
- full-screen My Clan;
- full-screen Inventory;
- full-screen Shinobi Record;
- full Journey/Mission detail;
- other modal/deep management surfaces.

Those surfaces own their own presentation.

On return to a map surface, the HUD reconstructs from current canonical state.

---

# 17. Explicit Alpha non-goals

This Step-4 HUD does not add:
- live Energy before #433;
- complete Stats;
- raw PL calculation;
- Achievements dashboard;
- Enemies Defeated counter;
- Events Completed counter;
- giant notification feed;
- generic quest tracker with multiple pinned quests;
- minimap;
- compass;
- chat;
- Shop controls;
- Crafting controls;
- Battle Pouch editing;
- formation editing inside the HUD;
- full Ninja ID implementation if not already present;
- new map artwork.

Do not expand Step 4 merely because the HUD could host these later.

---

# 18. Player-facing visual hierarchy

At a glance, the player should be able to answer:

1. **Who am I playing?**
2. **What is my current Rank / village context?**
3. **How much Ryō do I have?**
4. **Who is with me right now?**
5. **What am I currently doing / where should I look next?**
6. **How do I reach My Clan, Inventory, Shinobi Record and Journey?**
7. **How do I move back through map depth?**

Anything beyond those questions belongs in deeper surfaces unless separately authorised.

---

# 19. Coding acceptance checklist

Step 4 implementation is presentation-correct when browser proof shows:

1. compact Identity Dock projects current canonical identity/name/Rank/village;
2. Ryō projects exact current committed value;
3. no fake Energy appears;
4. Team Dock projects exact committed currentTeam only;
5. team access does not mutate assignment;
6. observer-safe current Journey/objective projects without secret/future leakage;
7. MY CLAN opens the canonical My Clan surface;
8. INVENTORY opens the canonical Inventory surface;
9. SHINOBI RECORD opens the canonical Record surface;
10. JOURNEY opens the canonical Journey/Missions surface;
11. appropriate map/region/world navigation works without bypassing access;
12. centre map/hotspots remain visually dominant and clickable;
13. HUD does not persist over Battle/Story/deep overlays;
14. state changes refresh projection without creating history;
15. save/load reconstructs HUD with no duplicate mutation;
16. keyboard/focus/touch interaction remains usable;
17. current Alpha target viewport does not suffer overlap/clipping that obscures core map interaction.

Browser Golden remains separate from design closure.

---

# 20. Final lock

> **Konoha Phase-2 HUD is a compact edge-docked live Chronicle projection: Identity, Rank, village context, Ryō, exact currentTeam and current Journey remain glanceable while the map stays visually dominant; My Clan, Inventory, Shinobi Record and Journey remain one action away; map navigation remains contextual; and the HUD never becomes a second owner of state.**

> **Energy is reserved, not fabricated.**

> **CurrentTeam is shown, not silently changed.**

> **Journey guides the player without leaking what the Chronicle does not know.**

> **Step 4 is intentionally small.**
