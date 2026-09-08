# Shinobi Chronicles — Selected Shinobi Loadout / Inventory UI Queue

Date: 8 September 2026

Status: **PRE-ALPHA QUEUE / HIGH-LEVEL UX ROLE CLOSED / FINAL UI + RUNTIME NOT DESIGNED OR IMPLEMENTED**

---

# Purpose

Preserve the next intended UI/Assets surface so it is not lost when the legacy UI / Assets workspace is archived.

Entry route:

`My Clan → Selected Shinobi → LOADOUT / MANAGE SHINOBI`

This document is **not** a final production presentation contract and must not be treated as authorisation for Coding to invent a finished interface.

---

# High-level role

The deeper Selected Shinobi management shell should consume separate existing/future authorities for:

- Equipment / Weapons where authorised;
- Techniques / Skills;
- Summons;
- other exact character-management domains later approved for Alpha.

Canonical rule:

> **one management UI ≠ one merged semantic authority**

My Clan remains the roster/formation surface. Selected Shinobi management is the deeper configuration destination.

---

# Inventory direction

Current Alpha direction is:

**text-first / compact**

Do not assume Alpha requires a giant image-grid inventory.

Existing item images may remain useful for Codex/notable-item presentation, but an Alpha item does not require a bespoke image merely to exist in Inventory.

Preserve existing runtime/Equipment distinctions:

> **item definition ≠ persistent Inventory instance ≠ equipped instance**

> **exact instance identity must not fall back to generic item identity**

Do not invent durability, additional slots, mutation rules or new Equipment semantics from UI layout needs.

---

# Current non-decisions

Not yet closed:

- final screen geometry;
- exact tabs/sections;
- final inventory row/card component;
- exact Equipment presentation;
- exact Techniques/Skills presentation;
- exact Summons presentation;
- drag/drop behavior;
- controller/keyboard behavior;
- item-image policy beyond text-first Alpha direction;
- exact runtime route implementation;
- browser validation/Golden.

These require later UI / Assets design against current domain authority.

---

# Alpha priority boundary

This surface becomes pre-Alpha implementation work only if the Alpha player flow genuinely requires direct loadout/configuration before freeze.

Do not turn speculative rich inventory polish or future crafting/gallery ideas into an Alpha blocker.

---

# Final queue statement

> **Preserve a compact Selected Shinobi management surface reached from My Clan, but do not design or implement semantics by inference. Equipment, Skills and Summons remain separately owned domains projected into one future UI.**
