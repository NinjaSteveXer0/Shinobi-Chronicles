# Academy Kakashi Origin — Backdrop Asset Inventory and Writing Binding

**Date:** 2026-09-19  
**Owner:** Writing / Story — Konoha consuming live asset inventory  
**Status:** **BINDING WRITING-SIDE ASSET REFERENCE — EXACT FILENAMES REQUIRED**  
**Source inspected:** live `main` Kakashi Origin Backdrop directory.

## Purpose

Writing must not refer to Kakashi Origin environments only with vague labels such as `Konoha street — night`, `approved alleyway`, or `junction backdrop` when an exact approved asset already exists.

Ambiguous backdrop wording can cause Runtime to select the wrong environment even when the Story scene itself is otherwise correct.

Canonical rule:

> **When a Kakashi-specific backdrop exists, Writing names the exact asset path.**

Do not treat similarly named assets as interchangeable.

---

## Live Kakashi Origin backdrop inventory

The current live directory contains exactly these eight Kakashi-specific backdrop assets:

1. `Kakashi Origin Backdrop/alleyway_konoha_night.png`
2. `Kakashi Origin Backdrop/end_of_alleyway.png`
3. `Kakashi Origin Backdrop/fight_at_sakura_tree.png`
4. `Kakashi Origin Backdrop/hokage_administration_interior_night.png`
5. `Kakashi Origin Backdrop/konoha_alleyway.png`
6. `Kakashi Origin Backdrop/rooftop_night.png`
7. `Kakashi Origin Backdrop/sakura_tree_night.png`
8. `Kakashi Origin Backdrop/uchiha_police_exterior_night.png`

---

## Current explicit binding added 2026-09-19

For the STOP THE ASSASSIN direct ANBU Marked Target pursuit, the Pakkun-intercept / AMT encounter scene shown after Kakashi legitimately reaches ANBU Marked Target uses:

`Kakashi Origin Backdrop/alleyway_konoha_night.png`

This exact binding is also written into:

`Documentation/Story/Academy_Kakashi_Stop_Assassin_Post_MI_Death_Go_After_ANBU_Marked_Target_Verbatim_Lock_2026-09-19.md`

Do not substitute:

`Kakashi Origin Backdrop/konoha_alleyway.png`

or any generic Konoha street environment unless a later Stephen-approved scene lock explicitly changes the scene.

---

## Usage discipline

For future Kakashi Origin scene writing:

- inspect this inventory before specifying a backdrop;
- use the exact path where the intended asset is known;
- do not infer that two alleyway assets represent the same camera angle or scene;
- do not invent a new filename from a visual description;
- if the required view is not in this inventory, mark the asset requirement explicitly rather than silently substituting another backdrop;
- a Runtime fallback or visually similar environment does not override the Story lock.

Availability does not itself assign an asset to every scene.

Only exact current Story/UI authority or Stephen approval establishes scene-to-backdrop binding.

---

## Final lock

> **Kakashi Origin backdrop selection is exact-asset-driven, not description-driven.**
>
> **`alleyway_konoha_night.png` and `konoha_alleyway.png` are distinct assets and must not be treated as synonyms.**
