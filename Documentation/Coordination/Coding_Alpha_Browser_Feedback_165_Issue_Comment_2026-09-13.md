## Issue #165 V2 browser correction — source/headless GREEN

Follow-up to the earlier 33300 implementation: Stephen's installed-browser pass showed the first version still treated the startup-created `chronicle_origin_pending` save shell as an existing Chronicle and did not provide the complete requested Register/Login → Introduction flow. The same browser pass also exposed the missing enemy-turn invocation and PL-circle calibration issue.

Coding correction is now durable:

- `10e970db73b34f4e784c5fd9f8af259c03e79b5b` — `runtime/alpha-browser-onboarding-fixes-33400.js`
  - unbegun pending save shell is no longer an existing Chronicle;
  - real browser-local `REGISTER / LOGIN` front door;
  - new-player route: `Register/New → Ninja ID → Hidden Leaf → Choose Ninja → Introduction → BEGIN → existing Origin prologue`;
  - Ninja selection remains presentation-only until BEGIN;
  - BEGIN reuses `selectChronicleOrigin(...)` and `beginAlphaChronicleOriginPrologue()`;
  - exact-key reset only; unrelated browser storage preserved;
  - completed player action opportunity invokes exactly one existing authored enemy action when eligible;
  - enemy action recursion is blocked and battle-over prevents extra action;
  - modern Battle PL circles lowered to `top:50.2%`.
- `483594371de3883aa821bd36a9651ba5175d6fe3` — terminal loader chains 33300 → 33400.
- `b222191f130e0451ee159b90bf3aa8671bedb604` — V2 runtime harness.
- `8a49147992c8b4f07b762f8f596b7647a35695bd` — V2 source gate.
- `8d89ccbfe72684671d593d84e4d2d7a1aa5b5dae` — dedicated #165 CI executes source, legacy regression, and V2 harness.
- `1a33ea2dc347daadd1b32476410ce2aa4bd1baf9` — static QA false-positive fix, scoped to the actual reset function only; runtime semantics unchanged.

Dedicated #165 Actions run `34724006590` at head `1a33ea2dc347daadd1b32476410ce2aa4bd1baf9`: **SUCCESS**.

All three substantive steps are GREEN:
- Source and load-seam gate — SUCCESS
- Legacy front-door regression harness — SUCCESS
- Real new-player and enemy-turn V2 harness — SUCCESS

Issue #141 Pre-Alpha Runtime Closure run `34724006601` at the same head is also **SUCCESS**.

Durable reconciliation record: `Documentation/Coordination/Coding_Alpha_Browser_Feedback_2026-09-13.md` (`844ed972aa3d75ee28b5691ba0e39c498a9512ab`).

**Installed-browser Golden remains pending.** Keep #165 open until Stephen pulls/current-main hard-refreshes and traverses the corrected flow in the actual browser.

The Menma narrative bridge, Altered Shinobi battle asset, and tutorial reward authority are intentionally not invented by Coding; they are routed as the single SEND NOW coordination packet in #166.

Routing: SEND NOW → CE / CODEX / COORDINATION
