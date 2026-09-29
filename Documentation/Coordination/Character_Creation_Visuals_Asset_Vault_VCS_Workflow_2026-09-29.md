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
   - places the exact approved PNG on `visuals/asset-vault`;
   - uses the correct permanent project asset path;
   - commits only the approved asset file(s);
   - does not include runtime, documentation, QA, HTML or unrelated files.
5. Character Creation / Visuals immediately creates a GitHub implementation issue for the approved asset.
6. The implementation issue records:
   - exact asset name;
   - asset type: Character Card / NPC Card / Battle Portrait;
   - exact repository path;
   - exact commit SHA containing the approved asset;
   - intended character/entity;
   - intended implementation consumer;
   - all locked presentation/usage rules.
7. Character Creation / Visuals returns the issue number to Stephen in routing form, for example:

`Routing: SEND NOW → CODING / RUNTIME (#XXX)`

## Ownership boundaries

### Character Creation / Visuals

Owns:
- approved Character Card intake;
- approved NPC Card intake;
- approved Battle Portrait intake;
- publication of the exact approved PNG to `visuals/asset-vault`;
- exact path/commit evidence;
- creation of the implementation issue.

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

After Stephen approves an exact asset, CC/V owns the GitHub publication operation.

If CC/V has access to the exact approved PNG bytes, it must publish the asset itself through the available GitHub tooling to `visuals/asset-vault`, commit only the approved asset file(s), and create the implementation issue.

If CC/V **cannot access the exact approved PNG bytes**, it must stop and say so plainly.

The permitted Stephen-side recovery action is limited to making the exact approved file accessible to CC/V — for example, uploading that exact approved PNG back into the Character Creation / Visuals chat when required.

Once the exact approved file is accessible, CC/V resumes ownership and performs the GitHub commit/issue workflow itself.

Canonical rule:

> **Stephen may supply the exact approved file when tool access requires it. Stephen is not the Git transport layer.**

---

## Failure rule

If Character Creation / Visuals cannot access the exact approved image file for upload:

> **STOP AND TELL STEPHEN.**

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

> **CREATE → OWNER APPROVAL → ASSET VAULT → IMPLEMENTATION ISSUE → CODING CONSUMES EXACT ASSET ONLY**

This is the locked visual VCS workflow for Shinobi Chronicles.