# Shinobi Chronicles — My Clan Adaptive Presentation Contract

Date: 8 September 2026

Status: **BINDING ALPHA UI PRESENTATION CONTRACT — DESIGN CLOSED / PRODUCTION MASTERS LANDED / EXACT RUNTIME INTEGRATION + BROWSER GOLDEN SEPARATE**

Production assets:

- `UI/my_clan_browse.png`
- `UI/my_clan_inspection.png`

Asset commit:

`9b9987621b7ba6f13117cf20958f0824991665d2`

---

# 1. Purpose

My Clan is one roster/formation management surface with two adaptive presentation states:

1. **Browse**
2. **Inspection**

These are presentation states of the same My Clan system, not separate roster systems.

Preserve:

> **My Clan ≠ Codex**

> **owned ≠ assigned ≠ deployed**

> **collectibleCard ≠ uiPortrait**

---

# 2. Formation structure

The authoritative six-position formation order is:

`START → NEXT 1 → NEXT 2 → NEXT 3 → RESERVE 1 → RESERVE 2`

Formation slots use the approved exact-character `uiPortrait` projection.

Preserve:

> **START ≠ protagonist ≠ clan leader**

START is the first formation position. It does not by itself establish story protagonist identity, clan leadership, Origin ownership or any other semantic role.

Formation assignment must consume authoritative owned/eligible character state and must not fabricate ownership, recruitment, Shared History or deployment truth.

---

# 3. Roster presentation

The My Clan roster uses the complete approved `collectibleCard` representation.

Do not return to superseded half-card/cropped-thumbnail experiments merely to fit more rows.

Canonical rule:

> **roster collectibleCard ≠ formation uiPortrait**

A character may have both presentations because they serve different UI purposes; one must not silently substitute for the other.

---

# 4. Browse state

Browse is the default roster-focused state.

Locked presentation intent:

- responsive large **full collectible cards**;
- target roughly 5–6 cards across where current browser width permits readable approved cards;
- vertical scrolling for the owned roster;
- no baked permanent card-slot art pretending to own runtime roster occupancy;
- no permanent Selected Shinobi workspace consuming the right side while nothing is selected.

The exact responsive card count may vary with viewport, but card legibility and full-card identity must be preserved.

---

# 5. Inspection state

Selecting a shinobi transitions the same My Clan surface into Inspection state.

Locked presentation intent:

- same six-position formation remains available;
- roster responsively narrows;
- roughly 4–5 full cards may remain visible across where readability permits;
- a **Selected Shinobi** workspace opens on the right;
- **Current Loadout** is a read-only summary in this surface;
- `LOADOUT` / `MANAGE SHINOBI` routes to the deeper character-configuration surface rather than turning My Clan into a full Equipment/Skills/Summons editor.

Preserve:

> **inspection ≠ deep configuration**

> **My Clan navigation ≠ ownership of Equipment / Skills / Summons semantics**

---

# 6. Interaction contract

Locked interaction intent:

- **single-click** on a roster card = inspect/select that shinobi;
- **drag** = formation assignment/reordering interaction where the target is valid;
- **double-click** = Codex shortcut for that exact representation/person where Codex routing is authorised;
- formation editing is staged rather than silently committed on every drag;
- edited formation produces a dirty/unsaved state;
- `SAVE FORMATION` explicitly commits the staged formation through authoritative formation state;
- `CLEAR FORMATION` explicitly clears the staged formation according to current formation rules.

Invalid drag/selection must not create false assignment/deployment history.

---

# 7. Runtime vs baked ownership

The production masters define visual composition, not roster truth.

Do not bake authoritative runtime state into the background asset, including:

- character cards;
- portraits;
- current formation occupants;
- selected character identity;
- current equipment;
- owned counts;
- PL/stat values;
- dirty/save state;
- eligibility;
- Codex access state.

Those are runtime projections supplied from owning systems.

Preserve:

> **asset slot ≠ occupant authority**

> **presentation selection ≠ ownership mutation**

---

# 8. Ownership / assignment / deployment non-collapse

My Clan must preserve distinct states:

- **owned** — the player legitimately owns/has acquired the character/representation according to Acquisition authority;
- **assigned** — the character is staged/committed into a formation position;
- **deployed** — the character actually participates in a specific Battle/event according to that caller's participation rules.

None may be inferred from the other merely because the same portrait/card is visible.

---

# 9. Loadout route boundary

`LOADOUT` / `MANAGE SHINOBI` is an explicit route to a deeper management surface.

My Clan may display Current Loadout as summary only.

The deeper surface must consume separate authorities for, where implemented:

- Equipment / Weapons;
- Techniques / Skills;
- Summons;
- other exact character configuration domains.

Do not merge those domains into a new My Clan-owned semantic model.

The detailed Loadout/Inventory UI remains separately queued and is not closed by this contract.

---

# 10. Superseded My Clan concepts

Do not restore older concepts containing any of the following merely because old assets/chat fragments survive:

- opponent queue;
- Team PL prominence;
- Auto Order;
- giant `Confirm Team & Enter Battle` control;
- giant equal-weight subsystem tabs;
- half-card/thumbnail roster experiments;
- generic RPG class/type filters;
- levels/SSR/stars;
- giant fake PL values;
- `32/200` roster cap;
- `Inherit / Evolve / Transcend` controls;
- vague Quick Assign behavior without exact semantics.

The two-state Browse / Inspection design in this contract supersedes those directions.

---

# 11. Coding integration requirements

Current source may still contain legacy `YOUR CLAN`, `openOverlay('clan')` and `.clan-roster-grid` structures. Their existence is not proof that the approved adaptive UI is implemented.

Implementation must consume the two production masters and bind dynamic content without treating the masters as semantic truth.

Required validation includes:

- Browse and Inspection states both render from one My Clan system;
- exact 6-position formation order;
- formation uses `uiPortrait`;
- roster uses full `collectibleCard`;
- responsive card density remains legible;
- single-click inspect;
- valid drag assignment/reordering;
- double-click Codex route where authorised;
- dirty state appears after staged edits;
- save commits exactly once through formation authority;
- clear obeys formation rules and does not fabricate ownership changes;
- selected Current Loadout is read-only summary;
- `LOADOUT` / `MANAGE SHINOBI` routes without collapsing domain authority;
- save/load preserves committed formation and does not commit unsaved staged state by accident;
- browser validation at Alpha target viewports.

Until proven:

**asset landed ≠ implemented ≠ browser validated ≠ Golden GREEN**.

---

# Final contract

> **My Clan is one adaptive roster/formation surface: Browse prioritises the full collectible-card roster; Inspection adds a selected-shinobi workspace while preserving the same formation. Formation uses portraits, roster uses full cards, edits are staged and explicitly saved, and My Clan never collapses ownership, assignment, deployment, Codex or deeper loadout authority.**
