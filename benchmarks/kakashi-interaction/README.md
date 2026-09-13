# Kakashi Interaction Benchmark

Standalone visual/interaction benchmark for the proposed Shinobi Chronicles Story interaction presentation. It is intentionally isolated from the live game.

## Review target

- Moonlit rooftop interaction composition
- `Interaction / Story` scene context
- Kakashi dialogue hierarchy
- Single-choice response rhythm
- Click and `F` keyboard advance
- `Back` navigation
- Short transition between dialogue beats

## Deliberately not integrated

This benchmark does **not** write to saves, missions, unlocks, routing, Chronicle/Story state, or any other game system.

Integration begins only after this benchmark is reviewed and signed off.

The current character visual uses the existing Konoha ANBU NPC art as a **temporary composition placeholder** while the interaction treatment is being evaluated. It is not intended to redefine Kakashi's final visual asset.

## Run

From the repository root:

```bash
python -m http.server 8080
```

Then open:

`http://localhost:8080/benchmarks/kakashi-interaction/`

## Acceptance path

1. `...You're late.` → `Remain silent.`
2. Courier assignment → `Understood.`
3. Constraint/warning → `Accept the assignment.`
4. Completion line → `Replay benchmark`

Use the **Back** button to move to previous beats. Press **F** to advance.
