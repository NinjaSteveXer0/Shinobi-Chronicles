# Shinobi Chronicles — Battle Portrait Authority and Manifest

Date: 4 September 2026

Status: **ASSET / PRESENTATION AUTHORITY — MANIFEST POPULATION IN PROGRESS; DO NOT FABRICATE MAPPINGS**

---

## Core contract

Shinobi Chronicles preserves separate image authorities for premium collectible cards and square UI/Battle portraits.

> **collectible Character Card ≠ `uiPortrait` ≠ battlefield Entity/representation**

Current production presentation contract:

- `collectibleCard`: exact **980 × 1400** premium framed card asset;
- `uiPortrait`: exact **1024 × 1024**, frameless square portrait asset.

A collectible-card asset must not be silently cropped or substituted as `uiPortrait` merely because both represent the same Registry identity.

A generic participant image field must not become permanent `uiPortrait` authority by convenience.

---

## Repository-state correction

The dedicated portrait hierarchy **does currently exist** in the production repository under:

`Assets/Portraits/`

It contains rank/family subdirectories including `Academy Student`, `Genin`, `Chunin`, `Special Jonin`, `Jonin`, `Anbu`, `Kage`, `Sannin`, `Akatsuki`, `Jinchuriki`, `Boss Cards`, `Rare Cards`, `Summons`, `Transformation` and others present in the repository tree.

Therefore the unresolved production problem is **not absence of the physical `Assets/Portraits/` hierarchy**.

The unresolved problem is the lack of one explicit, authoritative Registry-ID → `uiPortrait` manifest/resolver contract consumed consistently by Battle, Stage Battles, Arena/Tournament and other approved square-portrait surfaces.

This statement supersedes any older wording implying that the portrait files themselves still need to be supplied before the hierarchy exists. The core Decision 012 non-collapse remains binding.

---

## Resolver contract

Once a row is approved in the manifest, runtime should resolve:

`stable Registry representation ID`

→ `approved uiPortrait filename`

→ `exact repository path`

→ `asset status`

Runtime must not:

- invent a file path from the Registry ID;
- rename files merely to make card and portrait names match;
- infer approval from filename similarity;
- silently fall back to collectible-card artwork;
- silently accept a superseded/rejected portrait;
- treat a missing mapping as permission to use arbitrary generic participant imagery.

If the authoritative mapping is absent, expose a missing-authority/asset condition for development diagnostics rather than fabricating a path.

---

## Initial Alpha Origin physical inventory

The following files physically exist in `Assets/Portraits/Academy Student/` and correspond by established production identity/name context to the ten selectable Origin representations. **Physical presence is not, by itself, a substitute for final visual/dimension approval.**

| Registry identity | Physical portrait file | Repository path | Expected contract | Approval state |
|---|---|---|---|---|
| `academy_hinata` | `academy_student_hinata.png` | `Assets/Portraits/Academy Student/academy_student_hinata.png` | `uiPortrait`, 1024×1024 frameless | **PENDING explicit asset validation** |
| `academy_izuno` | `academy_student_izuno.png` | `Assets/Portraits/Academy Student/academy_student_izuno.png` | `uiPortrait`, 1024×1024 frameless | **PENDING explicit asset validation** |
| `academy_mirai` | `academy_student_mirai.png` | `Assets/Portraits/Academy Student/academy_student_mirai.png` | `uiPortrait`, 1024×1024 frameless | **PENDING explicit asset validation** |
| `academy_menma` | `academy_student_menma.png` | `Assets/Portraits/Academy Student/academy_student_menma.png` | `uiPortrait`, 1024×1024 frameless | **PENDING explicit asset validation** |
| `academy_kushina` | `academy_student_kushina.png` | `Assets/Portraits/Academy Student/academy_student_kushina.png` | `uiPortrait`, 1024×1024 frameless | **PENDING explicit asset validation** |
| `academy_kurenai` | `academy_student_kurenai.png` | `Assets/Portraits/Academy Student/academy_student_kurenai.png` | `uiPortrait`, 1024×1024 frameless | **PENDING explicit asset validation** |
| `academy_iwabee` | `academy_student_iwabe.png` | `Assets/Portraits/Academy Student/academy_student_iwabe.png` | `uiPortrait`, 1024×1024 frameless | **PENDING explicit asset validation** |
| `academy_metal_lee` | `academy_student_metal.png` | `Assets/Portraits/Academy Student/academy_student_metal.png` | `uiPortrait`, 1024×1024 frameless | **PENDING explicit asset validation** |
| `academy_kakashi` | `academy_student_kakashi.png` | `Assets/Portraits/Academy Student/academy_student_kakashi.png` | `uiPortrait`, 1024×1024 frameless | **PENDING explicit asset validation** |
| `academy_obito` | `academy_student_obito.png` | `Assets/Portraits/Academy Student/academy_student_obito.png` | `uiPortrait`, 1024×1024 frameless | **PENDING explicit asset validation** |

Identity correction preserved:

> **`academy_izuno` = Wasabi Izuno.**

> **display/source name ≠ machine ID.**

The portrait filename does not need to equal the Registry ID exactly.

---

## Approval fields for full manifest

For every Alpha-required representation, Assets/UI must ultimately record:

- stable Registry identity;
- approved portrait filename;
- exact current repository path;
- validated dimensions;
- frameless/square conformance;
- active vs superseded/rejected status;
- replacement/supersession reference where applicable.

Do not mark an asset `ACTIVE` merely because it exists in Git history or in the current directory.

---

## Runtime regression requirements

After Coding wires the dedicated resolver, regression coverage should prove:

1. collectible-card mapping and `uiPortrait` mapping remain independent;
2. different filenames can map correctly through the same stable Registry identity;
3. no fabricated-path fallback occurs;
4. superseded/rejected portraits are not selected;
5. unresolved mappings fail visibly in diagnostics rather than silently substituting a card/generic image;
6. approved `uiPortrait` can be reused across Battle / Stage / Arena / Tournament where UI authorises the same projection;
7. future distinct portrait projections require explicit UI/Assets authority rather than filename heuristics.

---

## Ownership

- **Registry** owns stable representation identity.
- **Assets/UI** owns approved portrait asset, filename/path, visual status and presentation role.
- **Coding** owns the resolver/manifest implementation and runtime consumption.
- **Battle/Arena/Stage UI** consumes the approved `uiPortrait`; it does not derive one.
