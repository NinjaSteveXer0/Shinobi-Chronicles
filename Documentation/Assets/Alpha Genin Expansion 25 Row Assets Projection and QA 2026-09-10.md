# Shinobi Chronicles — Alpha Genin Expansion 25 Row Assets Projection and QA

**Date:** 2026-09-10  
**Owner:** UI / Assets  
**Parent handoff:** GitHub #74  
**Registry / PL authority:** `Documentation/Registry/Alpha Genin Expansion 25 Row Registry and PL Admission 2026-09-10.md`  
**Registry authority commit:** `fc8281fd81c92cf47e63c20dd097b7402d17a492`  
**Source collectible upload:** `5b75fa2c8d3f1a3841dc0007523116a22a55b09d` (`brand new genin cards`)  
**Physical QA script:** `tools/qa_genin_expansion_assets.py`  
**QA script commit:** `0837387a88a85b8b4d49c271f92fda5242f2f343`  
**CI workflow:** `.github/workflows/genin-expansion-assets-qa.yml`  
**Workflow commit:** `50f98de793aabb7fc2d507fb9ed2f4c984d062c2`  
**First CI run:** `34470411341` — **FAILURE**

## Authority boundary

This document is an Assets projection / physical-QA record. It does not create or alter Registry identity, Base Stats, Base PL, Rank, candidate eligibility, ownership, assignment, deployment, or current v1 candidate policy.

Preserve:

- `collectibleCard != uiPortrait`
- Registry representation ID != filename inference
- generated art != Registry admission
- physical presence != representation authority
- candidate eligibility != ownership != assignment != deployment
- wrong dimensions != permission to remap
- a collectible card is a visual provenance source for a purpose-composed portrait, **not a crop source**

Current candidate policy `alpha_genin_roster_first_production_content_v1` remains untouched while the v2 asset gate is incomplete.

## Production format contract

- collectible card master: **980×1400 PNG**, ratio 0.70:1
- Battle/UI portrait master: **1024×1024 PNG**, frameless, no card border/icon/nameplate/text, purpose-composed for UI readability

## First deterministic physical QA result

Run `34470411341` checked the exact 25 Registry representation IDs and returned:

- collectible-card physical/authority GREEN: **0/25**
- uiPortrait physical GREEN: **0/25**
- blocking row/channels: **50**
- 23 accepted collectible representations are present but physically **1049×1499** and require normalization to 980×1400
- `genin_tsunade` and `genin_dan` are present at **1049×1500** and require normalization to 980×1400
- `genin_choza` is present at **1049×1499** but is additionally **representation-authority rejected** and must be replaced, not normalized into authority
- `genin_kosuke` collectible card is missing
- all 25 exact target `Portraits/Genin/{registry_id}.png` uiPortrait paths are missing

The failing state is expected and useful: this creates a deterministic production gate rather than allowing candidate activation from file presence alone.

## Exact 25-row projection / QA table

| # | Registry representation ID | Display target | collectibleCard target | Card authority / physical state | uiPortrait target | Portrait state | Source visual / provenance | Unresolved action |
|---:|---|---|---|---|---|---|---|---|
| 1 | `genin_hashirama` | Genin Hashirama | `Assets/Genin/genin_hashirama.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_hashirama.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author dedicated 1024×1024 portrait |
| 2 | `genin_hiruzen` | Genin Hiruzen | `Assets/Genin/genin_hiruzen.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_hiruzen.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 3 | `genin_mito` | Genin Mito Uzumaki | `Assets/Genin/genin_mito.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_mito.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 4 | `genin_tsunade` | Genin Tsunade | `Assets/Genin/genin_tsunade.png` | accepted source; 1049×1500 PNG → **NORMALIZE** | `Portraits/Genin/genin_tsunade.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 5 | `genin_sakumo` | Genin Sakumo | `Assets/Genin/genin_sakumo.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_sakumo.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 6 | `genin_duy` | Genin Might Duy | `Assets/Genin/genin_duy.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_duy.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 7 | `genin_guy` | Genin Might Guy | `Assets/Genin/genin_guy.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_guy.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 8 | `genin_rin` | Genin Rin | `Assets/Genin/genin_rin.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_rin.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 9 | `genin_dan` | Genin Dan Katō | `Assets/Genin/genin_dan.png` | accepted source; 1049×1500 PNG → **NORMALIZE** | `Portraits/Genin/genin_dan.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 10 | `genin_nawaki` | Genin Nawaki | `Assets/Genin/genin_nawaki.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_nawaki.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 11 | `genin_shizune` | Genin Shizune | `Assets/Genin/genin_shizune.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_shizune.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 12 | `genin_yamato` | Genin Yamato | `Assets/Genin/genin_yamato.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_yamato.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 13 | `genin_sai` | Genin Sai | `Assets/Genin/genin_sai.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_sai.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 14 | `genin_kagami` | Genin Kagami Uchiha | `Assets/Genin/genin_kagami.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_kagami.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 15 | `genin_danzo` | Genin Danzō | `Assets/Genin/genin_danzo.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_danzo.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 16 | `genin_torifu` | Genin Torifu Akimichi | `Assets/Genin/genin_torifu.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_torifu.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 17 | `genin_inoichi` | Genin Inoichi Yamanaka | `Assets/Genin/genin_inoichi.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_inoichi.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 18 | `genin_choza` | Genin Chōza Akimichi | `Assets/Genin/genin_choza.png` | **REJECTED REPRESENTATION**; 1049×1499 physical fossil | `Portraits/Genin/genin_choza.png` | **MISSING / WAIT FOR REPLACEMENT CARD** | rejected source from `5b75fa2...`; correction authority #69/#74 | Character Creation author replacement 980×1400 card, then dedicated portrait |
| 19 | `genin_shibi` | Genin Shibi Aburame | `Assets/Genin/genin_shibi.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_shibi.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 20 | `genin_tsume` | Genin Tsume Inuzuka | `Assets/Genin/genin_tsume.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_tsume.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 21 | `genin_hiashi` | Genin Hiashi Hyūga | `Assets/Genin/genin_hiashi.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_hiashi.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 22 | `genin_yugao` | Genin Yūgao Uzuki | `Assets/Genin/genin_yugao.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_yugao.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 23 | `genin_hayate` | Genin Hayate Gekkō | `Assets/Genin/genin_hayate.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_hayate.png` | **MISSING** | card upload `5b75fa2...` | Assets normalize card; Character Creation author portrait |
| 24 | `genin_mukai` | Genin Mukai Kohinata | `Assets/Genin/genin_mukai.png` | accepted source; 1049×1499 PNG → **NORMALIZE** | `Portraits/Genin/genin_mukai.png` | **MISSING** | card upload `5b75fa2...`; single Byakugan is representation fact only | Assets normalize card; Character Creation author portrait; do not infer Byakugan mechanics |
| 25 | `genin_kosuke` | Genin Kosuke Maruboshi | `Assets/Genin/genin_kosuke.png` | **MISSING** | `Portraits/Genin/genin_kosuke.png` | **MISSING** | no accepted physical source yet | Character Creation author collectible card + dedicated portrait |

## Chōza correction authority

The rejected Chōza binary must not be normalized into production authority. Replacement direction remains:

- clearly Genin-aged / youthful;
- thinner and shorter than adult Chōza while remaining naturally broad;
- Chōza-specific facial identity and markings; **not Chōji's red spiral cheek markings**;
- not Torifu;
- do not reuse the oversized-hand-through-exploding-rocks Akimichi composition;
- substantially different environment/composition from rejected attempts.

## Mukai hard preserve

Mukai's visible single Byakugan is representation/possession fact only. This Assets projection does not author Bloodline Access, Competence, Power, Mastery, active Stat modifiers, Battle actions, or hidden PL.

## Incidental Genin Menma same-path replacement

Commit `5b75fa2...` also replaced `Assets/Genin/genin_menma.png`, but `genin_menma` is **not one of this 25-row expansion**. #74 therefore does not ratify, remap, or create a new Menma identity/candidate row. The stable Base Genin Menma representation remains semantically distinct from Cipher/Echo/temporary Arc 1 projection states. Any visual supersession review for that incidental same-path replacement is separate from this 25-row activation gate.

## Closure gate

#74 may close only when all of the following are true:

1. **25/25** collectible-card target rows are representation-authoritative, present, decodable PNG and exactly 980×1400.
2. **25/25** dedicated uiPortrait target rows are present, decodable PNG and exactly 1024×1024.
3. `collectibleCard != uiPortrait` remains true for every row; no card crop is substituted as portrait authority.
4. This exact table is updated with final binary/QC evidence and deterministic paths.
5. No Registry ID, PL, Rank or current-v1 candidate-policy mutation is introduced by Assets.
6. Fresh `Alpha Genin Expansion 25 Asset QA` CI is GREEN.

After the gate is GREEN, UI / Assets returns #74 to **CE / CODEX / COORDINATION**. CE owns publication of the versioned expanded candidate-content authority and the minimum downstream Coding handoff.
