# Shinobi Chronicles — Coding Alpha Browser Feedback Closure — 2026-09-13

Status: SOURCE / HEADLESS GREEN; INSTALLED-BROWSER GOLDEN PENDING

## Browser findings received

Stephen's installed-browser pass exposed these concrete defects:

- the local browser save shell was being treated as an already-begun Chronicle, making a first-time player land on Continue/My Clan instead of a proper new-game flow;
- desired entry flow is `Register/Login → Create Ninja ID → Choose Village → Choose Ninja → Introduction → BEGIN → Origin Prologue`;
- Academy Menma's prologue currently lacks the narrative bridge from classroom departure to the woods/fighting/Nine-Tails sequence;
- Battle PL circles need a small vertical correction;
- `test_subject_altered_shinobi` has no approved battle presentation asset in source;
- Altered Shinobi was not taking an enemy action after Menma acted;
- the tutorial victory currently yields zero reward because the enemy's authored reward table is explicitly zero-valued.

## Coding-owned runtime correction

Implemented in `runtime/alpha-browser-onboarding-fixes-33400.js` and terminally loaded after the existing 33300 front-door layer.

The correction:

- distinguishes an unbegun `chronicle_origin_pending` save shell from a committed Chronicle;
- presents a real browser-local Register/Login entry surface;
- routes new players through Ninja ID, Konoha, exact existing 10-Ninja Origin selection, Introduction, then explicit BEGIN;
- keeps Ninja ID presentation-only and creates no second Registry/Acquisition/Rank/PL/Story identity authority;
- defers the actual Origin commit until BEGIN and reuses `selectChronicleOrigin(...)` plus `beginAlphaChronicleOriginPrologue()`;
- resets only the exact onboarding/player/session keys for New Chronicle and preserves unrelated browser storage;
- wraps the shared completed player action-opportunity seam so the existing enemy scheduler executes exactly one authored enemy action when eligible, with a recursion guard and battle-over fail-closed behavior;
- lowers the modern Battle PL-circle presentation to `top:50.2%`.

## Durable implementation evidence

- `10e970db73b34f4e784c5fd9f8af259c03e79b5b` — browser onboarding + enemy-turn + PL calibration runtime correction.
- `483594371de3883aa821bd36a9651ba5175d6fe3` — terminal loader chain: 33300 then 33400.
- `b222191f130e0451ee159b90bf3aa8671bedb604` — V2 runtime harness.
- `8a49147992c8b4f07b762f8f596b7647a35695bd` — source gate updated for V2 correction.
- `8d89ccbfe72684671d593d84e4d2d7a1aa5b5dae` — dedicated #165 workflow executes legacy and V2 gates.
- `1a33ea2dc347daadd1b32476410ce2aa4bd1baf9` — scopes exact-reset static check to the reset function, removing a diagnostic-string false positive without weakening runtime semantics.

Dedicated Issue #165 Actions run `34724006590`, head `1a33ea2dc347daadd1b32476410ce2aa4bd1baf9`: SUCCESS.

Successful job steps:

- Source and load-seam gate — SUCCESS
- Legacy front-door regression harness — SUCCESS
- Real new-player and enemy-turn V2 harness — SUCCESS

Issue #141 Pre-Alpha Runtime Closure run `34724006601` at the same head: SUCCESS.

No installed-browser Golden is claimed by these checks.

## Non-Coding dependencies

Issue #166 is the single active SEND NOW coordination packet for:

1. Writing: exact Menma narrative bridge beats/text.
2. UI / Assets: exact approved `test_subject_altered_shinobi` battle asset/path; current runtime has `image:null` and Coding will not substitute a premium card or standard portrait.
3. Tutorial reward authority: current enemy reward table is explicitly zero. Coding will not invent Ryō/EXP/item values or ownership semantics.

Until #166 returns closed authority, those three items remain owner-gated rather than Coding defects.

## Installed-browser retest target

After pulling/updating current `main` and hard-refreshing Live Server, verify:

`REGISTER / LOGIN → REGISTER / NEW NINJA → Ninja ID → Hidden Leaf → Choose Ninja → Introduction → BEGIN → Academy Menma prologue`

Then verify in the tutorial Battle that:

- one player action is followed by exactly one Altered Shinobi action while Battle remains active;
- PL circles sit lower than the prior browser capture;
- no duplicate enemy action occurs;
- Victory lifecycle still separates Claim from Story Continue.

The Menma bridge prose, Altered Shinobi asset, and non-zero tutorial reward remain pending #166 and should not be evaluated as closed until that authority lands.
