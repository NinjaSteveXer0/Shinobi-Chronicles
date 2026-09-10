# Shinobi Chronicles — Alpha Genin Expansion 25 Row Assets Projection and QA

**Date:** 2026-09-10  
**Owner:** UI / Assets  
**Parent handoff:** GitHub #74  
**Registry / PL authority:** `Documentation/Registry/Alpha Genin Expansion 25 Row Registry and PL Admission 2026-09-10.md`  
**Registry authority commit:** `fc8281fd81c92cf47e63c20dd097b7402d17a492`  
**Initial collectible upload:** `5b75fa2c8d3f1a3841dc0007523116a22a55b09d` (`brand new genin cards`)  
**Current 25-row portrait + Kosuke upload:** `1d9c5576270e753fc416feac72eb6ec40457d02f` (`updated genin and genin portraits`)  
**Physical QA script:** `tools/qa_genin_expansion_assets.py`  
**Current QA-script reconciliation commit:** `67bf4a41e7dfc95dd66aa48a2cdb21abe499f8c3`  
**CI workflow:** `.github/workflows/genin-expansion-assets-qa.yml`  
**Workflow commit:** `50f98de793aabb7fc2d507fb9ed2f4c984d062c2`  
**Initial CI run:** `34470411341` — **FAILURE**  
**Current-main re-audit CI run:** `34497672094` — **FAILURE: dimensions only**

## Authority boundary

This document is an Assets projection / physical-QA record. It does not create or alter Registry identity, Base Stats, Base PL, Rank, candidate eligibility, ownership, assignment, deployment, or current v1 candidate policy.

Preserve:

- `collectibleCard != uiPortrait`
- Registry representation ID != filename inference
- generated art != Registry admission
- physical presence != representation authority
- candidate eligibility != ownership != assignment != deployment
- wrong dimensions != permission to remap
- a collectible card is visual provenance for a purpose-composed portrait, **not a crop source**

Current candidate policy `alpha_genin_roster_first_production_content_v1` remains untouched while the v2 asset gate is incomplete.

## Production format contract

- collectible card master: **980×1400 PNG**, ratio 0.70:1
- Battle/UI portrait master: **1024×1024 PNG**, frameless, no card border/icon/nameplate/text, purpose-composed for UI readability

## Authority correction after Character Creation return

Character Creation / Visuals issue #83 is **COMPLETE / CLOSED** and current authority supersedes the stale initial rejection/missing snapshot:

- current `Assets/Genin/genin_choza.png` is Stephen-confirmed approved Chōza representation; preserve the current river/rope-bridge binary and do **not** regenerate it;
- `Assets/Genin/genin_kosuke.png` exists in `1d9c5576270e753fc416feac72eb6ec40457d02f`;
- all 25 exact `Portraits/Genin/{registry_id}.png` portrait paths exist in that same commit;
- no further Character Creation generation is required for this 25-row gate.

Accordingly the QA script was corrected in `67bf4a41e7dfc95dd66aa48a2cdb21abe499f8c3` so superseded Chōza rejection state is no longer hard-coded into physical QA.

## Current deterministic physical QA result

Fresh current-main run `34497672094` checked all exact 25 rows and returned:

- collectible-card physical GREEN: **0/25**
- uiPortrait physical GREEN: **0/25**
- blocking row/channels: **50**
- missing files: **0/50**
- decode/PNG-format failures: **0/50**
- all 25 collectible cards are present and decode as PNG, but all require exact-size normalization to **980×1400**;
- all 25 dedicated portraits are present and decode as PNG, but all are **1254×1254** and require exact-size normalization to **1024×1024**.

Current collectible dimensions:

- **1049×1500:** `genin_tsunade`, `genin_dan`, `genin_inoichi`
- **1049×1499:** the other 22 rows, including approved Chōza and current Kosuke

Therefore the entire remaining #74 blocker is now an **Assets-owned physical normalization pass**. There is no remaining visual-authoring dependency for these 25 rows.

## Exact 25-row projection / QA table — current main

| # | Registry representation ID | Display target | collectibleCard target | Current card physical state | uiPortrait target | Current portrait physical state | Current authority / provenance | Remaining action |
|---:|---|---|---|---|---|---|---|---|
| 1 | `genin_hashirama` | Genin Hashirama | `Assets/Genin/genin_hashirama.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_hashirama.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 2 | `genin_hiruzen` | Genin Hiruzen | `Assets/Genin/genin_hiruzen.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_hiruzen.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 3 | `genin_mito` | Genin Mito Uzumaki | `Assets/Genin/genin_mito.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_mito.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 4 | `genin_tsunade` | Genin Tsunade | `Assets/Genin/genin_tsunade.png` | PNG/decode GREEN; **1049×1500 → NORMALIZE** | `Portraits/Genin/genin_tsunade.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 5 | `genin_sakumo` | Genin Sakumo | `Assets/Genin/genin_sakumo.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_sakumo.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 6 | `genin_duy` | Genin Might Duy | `Assets/Genin/genin_duy.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_duy.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait; preserve Duy visual identity |
| 7 | `genin_guy` | Genin Might Guy | `Assets/Genin/genin_guy.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_guy.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait; preserve Guy visual identity |
| 8 | `genin_rin` | Genin Rin | `Assets/Genin/genin_rin.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_rin.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 9 | `genin_dan` | Genin Dan Katō | `Assets/Genin/genin_dan.png` | PNG/decode GREEN; **1049×1500 → NORMALIZE** | `Portraits/Genin/genin_dan.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 10 | `genin_nawaki` | Genin Nawaki | `Assets/Genin/genin_nawaki.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_nawaki.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 11 | `genin_shizune` | Genin Shizune | `Assets/Genin/genin_shizune.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_shizune.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 12 | `genin_yamato` | Genin Yamato | `Assets/Genin/genin_yamato.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_yamato.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 13 | `genin_sai` | Genin Sai | `Assets/Genin/genin_sai.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_sai.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 14 | `genin_kagami` | Genin Kagami Uchiha | `Assets/Genin/genin_kagami.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_kagami.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 15 | `genin_danzo` | Genin Danzō | `Assets/Genin/genin_danzo.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_danzo.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 16 | `genin_torifu` | Genin Torifu Akimichi | `Assets/Genin/genin_torifu.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_torifu.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 17 | `genin_inoichi` | Genin Inoichi Yamanaka | `Assets/Genin/genin_inoichi.png` | PNG/decode GREEN; **1049×1500 → NORMALIZE** | `Portraits/Genin/genin_inoichi.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 18 | `genin_choza` | Genin Chōza Akimichi | `Assets/Genin/genin_choza.png` | **APPROVED CURRENT REPRESENTATION**; PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_choza.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | Stephen-confirmed river/rope-bridge card `5b75fa2...`; portrait `1d9c557...`; #83 closed | Assets normalize card + portrait; **do not regenerate** |
| 19 | `genin_shibi` | Genin Shibi Aburame | `Assets/Genin/genin_shibi.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_shibi.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 20 | `genin_tsume` | Genin Tsume Inuzuka | `Assets/Genin/genin_tsume.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_tsume.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 21 | `genin_hiashi` | Genin Hiashi Hyūga | `Assets/Genin/genin_hiashi.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_hiashi.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 22 | `genin_yugao` | Genin Yūgao Uzuki | `Assets/Genin/genin_yugao.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_yugao.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 23 | `genin_hayate` | Genin Hayate Gekkō | `Assets/Genin/genin_hayate.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_hayate.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...` | Assets normalize card + portrait |
| 24 | `genin_mukai` | Genin Mukai Kohinata | `Assets/Genin/genin_mukai.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_mukai.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card `5b75fa2...`; portrait `1d9c557...`; single Byakugan remains representation fact only | Assets normalize card + portrait; do not infer Byakugan mechanics |
| 25 | `genin_kosuke` | Genin Kosuke Maruboshi | `Assets/Genin/genin_kosuke.png` | PNG/decode GREEN; **1049×1499 → NORMALIZE** | `Portraits/Genin/genin_kosuke.png` | PNG/decode GREEN; **1254×1254 → NORMALIZE** | card + portrait `1d9c557...`; #83 closed | Assets normalize card + portrait |

## Mukai hard preserve

Mukai's visible single Byakugan is representation/possession fact only. This Assets projection does not author Bloodline Access, Competence, Power, Mastery, active Stat modifiers, Battle actions, or hidden PL.

## Incidental Genin Menma same-path replacement

Commit `5b75fa2...` also replaced `Assets/Genin/genin_menma.png`, but `genin_menma` is **not one of this 25-row expansion**. #74 therefore does not ratify, remap, or create a new Menma identity/candidate row. The stable Base Genin Menma representation remains semantically distinct from Cipher/Echo/temporary Arc 1 projection states. Any visual supersession review for that incidental same-path replacement is separate from this 25-row activation gate.

## Remaining execution gate

#74 now has one finite owner-local task: normalize the already-approved 25 collectible cards and 25 already-authored portraits to their locked production master sizes without changing their representation identity or composition intent.

Under the active Project image lock, UI / Assets will not perform pixel-changing normalization until Stephen uses the exact phrase `generate now` in the active interaction. That authorization does not reopen visual design; this is a physical-format repair only.

## Closure gate

#74 may close only when all of the following are true:

1. **25/25** collectible-card target rows are representation-authoritative, present, decodable PNG and exactly 980×1400.
2. **25/25** dedicated uiPortrait target rows are present, decodable PNG and exactly 1024×1024.
3. `collectibleCard != uiPortrait` remains true for every row; no card crop is substituted as portrait authority.
4. This exact table is updated with final binary/QC evidence and deterministic paths.
5. No Registry ID, PL, Rank or current-v1 candidate-policy mutation is introduced by Assets.
6. Fresh `Alpha Genin Expansion 25 Asset QA` CI is GREEN.

After the gate is GREEN, UI / Assets returns #74 to **CE / CODEX / COORDINATION**. Per CE sequencing correction, Assets GREEN is followed by the exact 25-row Combat / Skills readiness gate before v2 candidate-content publication; `Assets GREEN != Combat readiness`.
