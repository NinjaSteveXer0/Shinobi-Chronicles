# Shinobi Chronicles — Konoha Phase-2 Live HUD Minimum Information + Navigation Contract

Date: 2026-10-01
Owner: Stephen / CE / Codex / Coordination
Status: PHASE-2 UI DIRECTION — DESIGN MAY PROCEED; CODING CONSUMES AFTER APPROVED UI

## Core rule

The Konoha / regional / World map HUD is a live coded projection of current Chronicle state.

Do not bake dynamic state into map artwork.

## Minimum always-useful information

HUD should communicate, compactly:
- current protagonist portrait / selected active identity;
- player-facing name;
- current formal Rank;
- village / current allegiance where legitimate;
- current Ryō;
- current team summary / quick access;
- current Journey / Story objective summary where one exists;
- quick Shinobi Record access;
- quick My Clan access;
- quick Inventory access;
- map/navigation return/region controls as appropriate.

Energy may occupy a reserved slot later when #433 activates, but the HUD must not fabricate Energy before runtime authority is active.

## Portrait / Ninja ID relation

The HUD may visually evolve the earlier Ninja ID concept.

Large/full Ninja ID inspection and compact map HUD are two presentation depths over the same current identity/state; do not create separate semantic owners.

Origin/active Character portrait may be changeable where current player-state authority permits.

## What does NOT belong in prime HUD space by default

Do not crowd the main HUD with:
- Enemies Defeated;
- total Events Completed;
- giant Achievement counts;
- full Stat block;
- full Inventory counts;
- raw PL formula;
- hidden requirements;
- developer diagnostics.

These belong in Shinobi Record / My Clan / deeper screens unless later UI testing proves a compact counter is genuinely useful.

## Current-team quick access

HUD team element should reflect exact committed currentTeam, not owned roster and not legacy playerTeam fixture state.

Selecting team access may open My Clan / current-team management but must not silently mutate assignment.

## Journey / Story locator

HUD may show one concise current objective / Journey locator.

It must not expose future Story, secret hotspots or hidden CE event identities.

## Quick actions

Minimum recommended actions:
- MY CLAN
- INVENTORY
- SHINOBI RECORD
- current JOURNEY / MISSIONS

Additional contextual controls may appear by location but must not become universal clutter.

## Responsiveness

HUD should preserve the map as the visual focus.

Prefer edge/corner docking, collapsible detail, hover/focus expansion or compact chips rather than a permanent giant dashboard covering Konoha.

## Final lock

> Konoha HUD is the player's live Chronicle dashboard: identity, Rank, Ryō, current team, current Journey and direct access to My Clan, Inventory and Shinobi Record. It is a coded projection of canonical state, not a second state store and not baked map art.