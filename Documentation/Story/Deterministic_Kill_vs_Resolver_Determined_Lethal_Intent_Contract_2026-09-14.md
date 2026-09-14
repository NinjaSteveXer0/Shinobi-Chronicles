# Shinobi Chronicles — Deterministic Kill vs Resolver-Determined Lethal Intent Contract

**Date:** 2026-09-14  
**Status:** **BINDING STORY / CE / CODING CLARIFICATION**  
**Authority:** Stephen direct product decision; clarifies `Documentation/Story/Interactive_Scene_Performance_and_Branch_Realization_Doctrine_2026-09-14.md`.

## Purpose

The existing Story doctrine correctly establishes the default rule:

> **Choice = protagonist intent. Resolver = factual truth.**

Stephen has now clarified an important authored exception/precision for lethal choices.

A Story option explicitly authored as a deterministic **`KILL`** is not interchangeable with **`ATTEMPT TO KILL`**, **`ATTACK WITH LETHAL INTENT`**, or another resolver-determined lethal attempt.

This distinction must be preserved by Writing, Chronicle Engine semantics, Coding/runtime, and presentation.

---

## 1. `KILL` — guaranteed authored outcome

When Writing explicitly marks a choice as **`KILL` with guaranteed/deterministic outcome semantics**, and that option is legitimately available to the player, selecting it means:

> **the target dies.**

Coding must not silently reinterpret that authored choice as merely `attempt_to_kill`.

CE/runtime may still own the commit path, occurrence/history write, death-state mutation, witness/reaction propagation, and downstream consequence handling. The resolver in this case is **deterministic by authored contract** rather than probabilistic or success-contested.

The runtime sequence remains structurally clean:

`authorised KILL choice -> deterministic owning resolver -> death committed -> cinematic kill realization -> aftermath / Chronicle state`

If the deterministic kill cannot legitimately happen because prerequisite authority has changed, the option should be unavailable or the authored contract should be revised before presentation. Do **not** display an authoritative `KILL` option and then silently downgrade its meaning after selection.

### Kakashi Origin benchmark

For Kakashi's Origin, where Stephen/Writing authors a choice whose semantic meaning is **KILL**, then **kill means kill**. The branch should commit the target's death and present the corresponding cinematic aftermath.

This is a deliberate Story outcome contract, not an `attempted murder` roll disguised by wording.

---

## 2. `ATTEMPT TO KILL` / lethal intent — resolver-determined outcome

When the authored choice expresses lethal intent but does **not** guarantee the result, Writing should author it explicitly as an attempt/intent family, for example:

- `Attempt to Kill`
- `Strike to Kill`
- `Attack with Lethal Intent`
- another context-appropriate wording whose contract remains resolver-determined.

The semantic sequence is:

`lethal intent -> owning resolver -> factual result -> visible aftermath`

Possible results may include:

- target dies;
- target survives;
- attack is interrupted;
- target escapes;
- substitution/deflection occurs where legitimate;
- another actor intervenes;
- injury occurs without death;
- the attempt fails but still creates attempted-murder / hostility / witness / relationship / legal / Chronicle history.

The Story presentation must follow the **resolved fact**, not assume death in advance.

---

## 3. Writing authoring requirement

For every materially lethal Story choice, Writing must identify which semantic class it belongs to before production sign-off:

### A. Deterministic outcome

`KILL — GUARANTEED`

Writing is declaring that, if the choice is available and selected, death is the intended and authoritative branch result.

### B. Resolver-determined lethal intent

`ATTEMPT TO KILL — RESOLVER-DETERMINED`

Writing is declaring lethal protagonist intent while leaving the factual outcome to the owning resolver.

Do not use `KILL` as decorative wording when the actual contract is only an attempt.

Do not use `ATTEMPT TO KILL` when Writing actually intends a guaranteed scripted death.

The visible label, branch notes, and semantic contract should agree.

---

## 4. Coding / CE implementation requirement

Coding/CE must preserve the authored class rather than collapsing both into one generic attack action.

Recommended neutral contract shape:

- `intent = lethal`
- `outcomeMode = deterministic | resolver_determined`
- `target = <authoritative entity ref>`
- `resolver = <owning resolver>`

Exact field names are implementation-owned; the semantic distinction is binding.

For `deterministic`:

- validate eligibility;
- commit death through the owning authority;
- preserve idempotence/save-load/retry semantics;
- project the confirmed death cinematically;
- propagate legitimate aftermath/history.

For `resolver_determined`:

- commit only lethal intent before resolution;
- let the owning resolver determine factual outcome;
- project the correct success/failure/interruption result;
- preserve attempted-murder history where meaningful even if death does not occur.

No Story button should directly mutate unrelated PL, Stats, Rank, ownership, or other domains.

---

## 5. Presentation requirement

The reusable cinematic kill presentation should occur **after the relevant factual result is known**.

For deterministic `KILL`, confirmation is guaranteed by the authored branch contract once eligibility is satisfied, so the full kill cinematic may play as part of that branch's committed realization.

For resolver-determined lethal intent, presentation must branch after resolution:

- confirmed death -> full kill cinematic;
- survival/injury -> impact/survival variant;
- interruption -> interrupted-action variant;
- escape/substitution -> corresponding visible result.

Preferred Shinobi Chronicles kill presentation remains stylised rather than gratuitously graphic:

`attacker commitment -> rapid directional movement / impact cut -> black or diagonal slash transition -> brief silence -> scene returns with death visibly established -> aftermath narration/reaction`

The purpose is dramatic clarity, not gore.

---

## 6. Canonical shorthand

> **KILL means KILL when Writing marks it as a deterministic authored outcome.**

> **ATTEMPT TO KILL means lethal intent; the resolver decides whether death actually occurs.**

> **Do not silently downgrade one semantic class into the other.**

> **Writing names the branch contract. CE/runtime commits factual truth. Presentation dramatizes the committed result.**
