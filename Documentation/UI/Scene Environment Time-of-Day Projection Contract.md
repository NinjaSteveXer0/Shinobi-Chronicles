# Shinobi Chronicles — Scene Environment Time-of-Day Projection Contract

**Status:** Alpha UI / Assets presentation authority  
**Date:** 2026-09-05

## 1. Purpose

Obito's Alpha Origin requires limited environmental time progression without turning every Konoha backdrop into a combinatorial variant library.

World / Event / Mission supplies authoritative temporal context. UI / Assets owns how that context is presented.

The minimum Alpha temporal presentation bands are:

- `DAY`
- `LATE_AFTERNOON`
- `DUSK`

These are presentation projections, not new event states, mission states, or Chronicle occurrences.

Preserve:

**temporal/world context ≠ background asset identity**

**time-of-day projection ≠ event-specific scene truth**

**presentation variant ≠ new location**

## 2. Alpha presentation strategy

Use a controlled environment-variant approach.

A reusable Scene Environment family may have one or more explicitly approved temporal presentations. UI selects the approved presentation matching the authoritative temporal context supplied by World/Event/Coding.

For Alpha, only author temporal variants where a production scene materially depends on the changing light/time state. Do not automatically multiply every Konoha Scene Environment into Day / Late Afternoon / Dusk / Night variants.

Preferred minimum for Obito's required environment family/families:

`DAY` → normal readable daylight

`LATE_AFTERNOON` → warmer, lower-angle light; longer local shadows; still clearly daylight

`DUSK` → cooler/dimmer ambient light with remaining warm horizon light; readable foreground and dialogue-safe lower zone retained

The transition should feel like the same place at a later time, not three redesigned locations.

## 3. Runtime boundary

World/Event supplies authoritative temporal context.

Coding may expose that context through the existing Scene Environment consumer/resolver.

UI/Assets maps the supplied temporal band to an explicitly approved visual presentation.

UI must not infer time from mission progress, dialogue line number, Battle outcome, or elapsed real time unless an owning authority explicitly supplies that rule.

Preserve:

**World/Event owns when it is**

**UI/Assets owns how that time looks**

**Coding owns resolver/runtime wiring**

## 4. Asset rules

All approved temporal variants remain subject to the existing Scene Environment standard:

- 1920×1080 production canvas;
- upper ~65–70% environment-focused composition;
- lower ~30–35% dialogue-safe composition;
- no baked characters;
- no baked enemies;
- no baked dialogue;
- no baked objectives;
- no baked hotspots/markers;
- no baked PL/rewards;
- no baked event-specific state.

For Obito specifically, do not bake:

- Obito;
- groceries;
- grocery possession/state;
- hazard state;
- event participants;
- mission outcome;
- event-specific damage or obstruction;

into the reusable backgrounds.

Any authored physical/environmental change caused by an occurrence must remain a separate authoritative world/scene consequence, not be silently encoded as a generic time-of-day variant.

## 5. Visual continuity requirements

Temporal variants of the same environment must preserve recognisable geometry and camera composition closely enough that the player reads them as the same location progressing through time.

Do not redesign, relocate, or add/remove major landmarks merely to make a time band visually distinct.

Lighting changes may include:

- sun angle;
- shadow length/direction;
- sky colour/brightness;
- ambient warmth/coolness;
- practical/environmental light activation where appropriate;
- restrained atmospheric haze;
- subtle exposure changes.

Lighting treatment must preserve gameplay readability and the dialogue-safe lower area.

## 6. Existing explicit day/night environment IDs

Existing Scene Environment IDs that already encode an authored time state, such as `_day` or `_night`, remain valid production identities where already approved.

Do not automatically reinterpret every existing time-specific ID as a generic family plus runtime filter.

For new Obito production work, prefer the smallest presentation-safe solution that satisfies the authored DAY → LATE AFTERNOON → DUSK progression without creating unnecessary duplicate environment families.

If Coding later generalises temporal projection across more environments, that must preserve existing stable Scene Environment IDs and asset provenance rather than silently renaming or replacing them.

## 7. Alpha scope lock

Alpha requires support for:

**DAY → LATE AFTERNOON → DUSK**

where Obito's Origin/environmental storytelling needs it.

This does **not** authorize a project-wide weather/day-night simulation, automatic colour-filter system, or complete time-of-day matrix for every Konoha environment.

Future expansion may add further bands or weather states only when production content actually requires them.

## 8. Handoff back to World / Event / Mission

World/Event may author temporal progression using the three approved semantic bands:

- `DAY`
- `LATE_AFTERNOON`
- `DUSK`

World/Event should specify the authoritative temporal band at each scene transition and should not encode presentation-specific colour/exposure instructions unless a story-critical environmental fact requires them.

UI/Assets will provide the approved presentation projection and exact asset mapping once the relevant masters exist.

Preserve:

**same environment + later time ≠ new world location**

**temporal progression ≠ event-specific background baking**

**authoritative temporal context ≠ UI inference**
