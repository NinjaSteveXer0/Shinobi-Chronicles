# Shinobi Chronicles — Coding / Runtime Scope Locality and Minimal Inspection Addendum

**Date:** 2026-09-17  
**Owner:** CE / Codex / Coordination  
**Status:** **MANDATORY ADDENDUM TO CODING / RUNTIME ANTI-STALL CHARTER**  
**Applies to:** **EVERY current and future Coding / Runtime workspace**  
**Parent authority:** `Documentation/Coordination/Coding_Runtime_Mandatory_Execution_Consolidation_and_Anti_Stall_Charter_2026-09-17.md` / standing issue #219  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

---

## 1. Purpose

Long Coding sessions must not become broad repository scans.

The project has enough durable authority and named runtime ownership that most implementation work should begin from the exact subsystem, symbol, file or production path that owns the requested behavior.

Canonical rule:

> **Inspect the minimum sufficient scope needed to change and prove the requested behavior. Expand only when evidence requires it.**

A long execution session means sustained repair and validation of the active path. It does **not** mean reading every file in the repository before making a change.

---

## 2. Scope-first law

Before opening source files, Coding must classify the task into the smallest justified scope:

### LEVEL A — SINGLE-FILE / SINGLE-OWNER
Use when the requested change is already known to be owned by one file or one canonical block.

Examples:
- a CSS-only visual adjustment where the selector/class is already known;
- a text/localisation correction in one catalogue;
- one exact reward predicate in the canonical reward adapter;
- one exact Scene Board projection already bound to a known presentation owner.

Default behavior:
- inspect the target file;
- inspect the exact affected section;
- make the change;
- run the narrowest relevant validation;
- do not inspect unrelated HTML, JavaScript, runtime modules or documents merely because they exist.

### LEVEL B — DIRECT DEPENDENCY EDGE
Use when one owner depends on one or two direct callers/loaders/bindings.

Examples:
- a runtime owner plus its production loader;
- a Story choice owner plus its exact resolver binding;
- a CSS selector whose DOM class/ID binding is uncertain;
- a reward adapter plus its exact terminal caller.

Default behavior:
- inspect the canonical owner;
- inspect only the direct dependency needed to prove consumption;
- stop expanding once the causal edge is proven.

### LEVEL C — SUBSYSTEM PATH
Use when a defect crosses a known production path such as:

`Story -> Battle -> same-Story return`

or:

`terminal facts -> rewards -> Receipt`.

Default behavior:
- inspect only the files/modules on that exact causal path;
- use targeted symbol/file searches to identify those files;
- do not scan unrelated runtime families.

### LEVEL D — BROAD / REPOSITORY ARCHAEOLOGY
This is exceptional.

Allowed only when:
- canonical ownership is genuinely unknown;
- duplicate/mixed-generation owners must be located for a retirement tranche;
- a dynamic loader/global/save dependency cannot be resolved locally;
- a formal deep-sweep / migration / retirement task explicitly requires it;
- targeted inspection has produced evidence that the defect crosses unknown boundaries.

A normal implementation request must not begin at Level D.

---

## 3. No speculative file reading

Before inspecting a file outside the initial target scope, Coding must have a concrete reason tied to the active defect.

Valid reasons include:
- this file directly imports/loads/calls the target owner;
- the target symbol is defined or rebound here;
- production evidence shows this file overrides the target behavior;
- a failing test points here;
- save/load or dynamic registration for the active state is owned here;
- the exact selector/DOM binding cannot otherwise be proven.

Invalid reasons include:
- `it might be related`;
- `I want the full picture`;
- `I should understand the whole codebase first`;
- scanning every runtime file before changing one known owner;
- opening `game.js`, `index.html`, runtime families or unrelated CSS merely because they are central files.

Canonical rule:

> **Every extra file inspected must earn its place in the active causal chain.**

---

## 4. Concrete CSS example

If Stephen requests a change that is known to be wholly controlled by `style.css`, Coding should work in `style.css`.

It should **not** inspect `game.js`, `index.html`, every runtime module or unrelated documents first.

Escalate beyond `style.css` only if evidence shows one of the following:
- the selector/class/ID is uncertain or generated dynamically;
- another stylesheet or inline style overrides it;
- the requested element is not receiving the expected class;
- the browser result proves the CSS change is not reaching the intended element;
- production delivery of the stylesheet itself is in question.

Even then, inspect only the direct binding/delivery file required to resolve that evidence.

---

## 5. Concrete runtime example

If the task is `wire Kakashi terminal rewards`, Coding should start with:
- the canonical terminal factual/debrief owner;
- the canonical Kakashi reward adapter;
- the exact production loader/caller that connects them;
- the focused reward/debrief QA.

It should not read every Origin file, every Battle file, every World file, `game.js`, all CSS and the full repository before making the connection.

If those exact files expose a stale parent loader or competing owner, expand only to that direct competing owner and its load edge.

---

## 6. Targeted search before broad reading

When the exact file is not known, use targeted code search first.

Prefer searches for:
- exact function/global names;
- exact semantic IDs;
- exact scene/choice/battle/reward IDs;
- exact CSS selector/class/ID;
- exact error string;
- exact loader/cache identity;
- exact occurrence/anchor ID.

Then fetch the small set of matching files.

Do not use repository-wide file-by-file reading as a substitute for a targeted search.

---

## 7. Expansion ladder

Coding must expand scope one step at a time:

`known owner`
-> `direct caller/loader`
-> `direct competing owner`
-> `subsystem path`
-> `broad archaeology only if still unresolved`.

Do not jump from one known file directly to `inspect the whole repo`.

If three newly opened files in a row do not materially narrow the active defect, stop expanding and tighten the search/query before reading more.

---

## 8. Long-session rule clarified

The standing long-session rule remains active, but its meaning is:

> **Stay with the active causal problem until it is materially fixed; do not stay busy by widening the search unnecessarily.**

Long session != broad scan.

Long session != read all files.

Long session != reread unchanged authority already linked by the active issue unless a contradiction requires it.

A good long session may touch only one or two files repeatedly if those files genuinely own the defect.

---

## 9. Validation scope must also be proportional

Validation should begin narrowly and expand only as needed.

Examples:
- CSS-only change -> targeted browser/render check; no unrelated runtime suite required merely by habit.
- one pure helper -> focused unit/source test first.
- Story->Battle return change -> focused path test + relevant integration gate.
- production loader change -> focused loader assertion + affected player path.
- canonical owner retirement -> broader regression because ownership changed.

Do not run expensive unrelated suites before the narrow change is proven locally unless the changed responsibility is known to be cross-cutting.

Broader #141/#105/Golden gates remain required at the appropriate milestone; they are not a reason to perform broad source archaeology for every surgical edit.

---

## 10. Mandatory session reporting addition

At a valid Coding stop, the completion report should include the **actual scope inspected/changed** when useful:

- target owner(s);
- direct dependency files inspected;
- why any scope expansion was necessary;
- files changed;
- tests run.

This is not paperwork for its own sake. It allows CE/Stephen to detect when a supposedly surgical task expanded into unnecessary repository archaeology.

---

## 11. Relationship to consolidation / legacy retirement

Canonical-owner consolidation sometimes requires wider inspection than a normal fix because Coding must prove that an old layer is safe to de-load.

Even then, the search must remain responsibility-scoped.

Example:

To retire an old Kakashi Story-choice owner, search for that owner’s exact globals/functions/loader references/save IDs/tests. Do **not** audit unrelated Arena, Crafting, World Map, localisation or CSS systems unless evidence links them to that owner.

Retirement proof is broad enough to prove the responsibility is safely migrated, not broad enough to become a general repo review.

---

## 12. Final lock

> **Coding starts narrow. Read only the files that own or directly consume the requested behavior. Expand one dependency edge at a time and only on evidence. A known `style.css` task stays in `style.css` unless the browser or source proves a direct external dependency. A long Coding session means sustained execution on the active problem—not scanning the entire repository.**

**Stephen relay:** NONE. GitHub is the durable execution authority.