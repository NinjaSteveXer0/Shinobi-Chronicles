# Shinobi Chronicles — Character Creation / Visuals Asset Vault VCS Workflow

**Date:** 2026-09-29  
**Owner:** Stephen / Character Creation / Visuals  
**Coordination status:** **LOCKED PRODUCTION WORKFLOW**  
**Dedicated branch:** `visuals/asset-vault`

## Purpose

Provide one isolated, durable intake lane for approved:

- Character Cards;
- NPC Cards;
- Battle Portraits.

The asset-vault branch is the permanent visual-asset publication lane. It separates approved binary intake from Coding/runtime work and removes reliance on Stephen manually synchronising visual files through whatever Coding checkout he is currently testing.

## Locked process

1. Character Creation / Visuals creates the requested Character Card, NPC Card or Battle Portrait.
2. Stephen reviews the exact visual.
3. **Nothing is uploaded or published until Stephen explicitly signs off / approves it.**
4. After Stephen signs off, Character Creation / Visuals:
   - locks the exact approved PNG identity;
   - specifies the correct permanent project asset path;
   - specifies asset type, intended entity/character, implementation consumer and locked usage rules;
   - creates/routes an **Asset Vault Intake** record to CE / Codex / Coordination when its active workspace cannot publish binary files remotely.
5. The designated CE / Codex / Coordination remote intake bridge:
   - receives the exact approved PNG;
   - publishes that exact PNG to `visuals/asset-vault` through remote GitHub tooling;
   - commits only the approved asset file(s);
   - does not include runtime, documentation, QA, HTML or unrelated files;
   - records the exact repository path + commit SHA.
6. After successful publication, the intake bridge creates the GitHub implementation issue for the approved asset.
7. The implementation issue records:
   - exact asset name;
   - asset type: Character Card / NPC Card / Battle Portrait;
   - exact repository path;
   - exact commit SHA containing the approved asset;
   - intended character/entity;
   - intended implementation consumer;
   - all locked presentation/usage rules.
8. The implementation issue is routed to the intended consumer in normal GitHub handoff form, for example:

`Routing: SEND NOW → CODING / RUNTIME (#XXX)`

## Ownership boundaries

### Character Creation / Visuals

Owns:
- approved Character Card intake;
- approved NPC Card intake;
- approved Battle Portrait intake;
- exact approved-image identity;
- intended permanent repository path;
- asset type / entity / consumer / usage metadata;
- creation/routing of the Asset Vault Intake record when binary publication must be performed by the remote coordination bridge.

Does **not**:
- edit Coding/runtime files;
- merge the asset-vault branch into Coding;
- publish before Stephen approval;
- substitute or reconstruct an approved image that cannot be accessed.

### Coding / Runtime

Consumes the exact approved asset identified by the implementation issue.

Coding must not:
- merge `visuals/asset-vault` wholesale;
- infer another image;
- rename/substitute the approved file without separate authority;
- turn asset consumption into unrelated runtime/file churn.

### Stephen

Stephen's explicit approval is the publication trigger.

Stephen is not required to act as the transport layer between visual production and Coding once the approved asset has been committed and its implementation issue has been created.

## Battle Portrait repository-root authority

Stephen clarified the current repository portrait taxonomy on 2026-09-29.

Shinobi Chronicles has **three distinct Battle Portrait lanes**:

- `Enemies Portraits/` — Battle portraits for enemy representations;
- `NPC portrait/` — Battle portraits for NPC representations;
- `Portraits/` — Battle portraits for standard Character Card / Registry-character representations that are neither enemies nor NPCs.

These are parallel production roots. Do **not** collapse them into one universal `Portraits/` root.

Historical `Assets/Portraits/...` references remain superseded for current production wiring.

Asset class and participant role determine the portrait lane; collectibility, Registry identity, NPC status and enemy status must not be inferred from filename convenience.

For the Academy Metal stable inviting Genin asset tracked by #424:

- participant: `metal_origin_inviting_genin`;
- role: Story NPC / controlled-spar participant;
- asset type: Battle Portrait;
- exact permanent path:

`NPC portrait/metal_classmate_1.png`

This path decision does not create collectible ownership, acquisition, My Clan admission or a new Registry identity.

---

## Presentation boundaries

- **Battle Portraits** are Battle/Arena assets only.
- **Character Cards / NPC Cards** are Story/presentation assets as appropriate.
- Story card != Battle portrait.
- A consumer must use the exact approved representation for its authorised surface.

## Stephen transport / terminal prohibition

The asset-vault workflow exists specifically to remove Stephen from routine Git transport.

Therefore Character Creation / Visuals must **not** make Stephen perform normal approved-asset publication by giving him:

- PowerShell commands;
- Git Bash commands;
- terminal `git add / commit / push` instructions;
- VS Code Source Control upload steps;
- manual branch-switch / merge / cherry-pick instructions.

Those are not the normal asset-vault workflow.

After Stephen approves an exact asset, CC/V owns the **visual intake authority**, but not a capability its active workspace does not possess.

If CC/V can genuinely publish the binary remotely through approved GitHub tooling, it may do so.

If CC/V cannot publish binary files remotely, it must **not** give Stephen Git / PowerShell / local-VCS instructions. Instead it creates/routes the Asset Vault Intake record to CE / Codex / Coordination.

Because conversation workspaces cannot be assumed to transfer image bytes to one another automatically, Stephen may need to attach the exact approved PNG once to the CE / Codex / Coordination intake conversation. That is a binary-access workaround only; Stephen does not switch branches, stage, commit, push, merge, stash, reset or otherwise operate Git.

The CE / Codex / Coordination intake bridge then performs the GitHub binary publication remotely.

Canonical rule:

> **Stephen may provide the exact approved PNG when cross-workspace binary access requires it. Stephen is never the Git transport layer.**

---

## Failure rule

If Character Creation / Visuals cannot publish the exact approved image binary remotely:

> **DO NOT FALL BACK TO LOCAL GIT. ROUTE TO THE REMOTE ASSET-VAULT INTAKE BRIDGE.**

Do not:
- reconstruct it;
- regenerate it;
- choose a near-match;
- substitute an older version;
- publish an unapproved derivative.

The standing Project image lock remains unchanged: no image generation occurs unless Stephen uses the exact phrase **generate now**.

## Branch law

`visuals/asset-vault` is the permanent isolated asset lane.

Therefore:

- do not use `main` as the working lane for new approved visual assets;
- do not use a Coding test checkout as the visual asset publication lane;
- do not mix visual publication commits with runtime/documentation/QA changes;
- do not merge the whole vault into a Coding branch.

An implementation consumer should consume only the exact approved asset identified by path + commit evidence.

## Historical compatibility

Assets already committed to `main` before this workflow became effective remain valid durable project assets unless separately superseded or rejected.

This workflow governs **new approved visual-asset intake from 2026-09-29 onward**. It does not retroactively invalidate the earlier Academy Origin NPC sync or other previously committed approved assets.

## Production shorthand

> **CREATE → OWNER APPROVAL → REMOTE ASSET-VAULT INTAKE → IMPLEMENTATION ISSUE → CODING CONSUMES EXACT ASSET ONLY**

This is the locked visual VCS workflow for Shinobi Chronicles.