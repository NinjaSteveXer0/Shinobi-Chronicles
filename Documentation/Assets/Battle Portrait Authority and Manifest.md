# Shinobi Chronicles — Battle Portrait Authority and Manifest

Date: 4 September 2026

Status: **CHARACTER CREATION / ASSETS MAPPING CLOSED — 102/102 PATHS ASSIGNED; REGISTRY RATIFICATION + FRESH BINARY QA NEXT**

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

## Character Creation / Assets closure

Character Creation / Assets now explicitly selects the **102 portrait files listed below** as the current `uiPortrait` projections to be ratified by Registry.

This is an affirmative asset-authority decision. The mappings below are **not inferred** from filename similarity, directory order, collectible-card mappings or generic participant image data.

Current repository paths were reconciled against the live `main` tree. The production Registry gate is **85 Characters + 17 Entities = 102**, and this manifest contains exactly **102 unique Registry IDs mapped to 102 unique portrait paths**.

Preserve:

> **Registry representation ID ≠ portrait filename.**

> **collectible Character Card ≠ `uiPortrait`.**

> **physical file presence alone ≠ approval; this document is the Assets approval record.**

> **Assets approval ≠ Registry ratification ≠ Coding implementation.**

The repository root is:

`Assets/Portraits/`

The current live folder name for transformation portraits is singular:

`Assets/Portraits/Transformation/`

Do not silently rewrite that to the older/plural `Transformations` spelling.

Do not invent:

`Assets/Portraits/Battle/`

or

`Assets/Portraits/Arena/`

---

## QA / dimension provenance

Historical Character Creation portrait QA closed the pre-expansion **97-portrait** set with no bad/corrupt dimensions, no exact pixel duplicate groups, no basename collisions, no missing portraits, and required oversized portraits normalised to the **1024 × 1024** portrait contract.

The five Academy additions that moved the production gate from 97 to 102 are now explicitly included in this Assets manifest:

- `academy_kurenai`
- `academy_iwabee`
- `academy_metal_lee`
- `academy_kakashi`
- `academy_obito`

All 102 current portrait paths exist in the live repository tree. The current connector used for this closure can enumerate binary files and exact paths but cannot independently decode the current PNG blobs for a fresh 102-file pixel-dimension recheck. Therefore:

> **Asset selection/path authority is CLOSED.**

> **Required portrait dimensions remain 1024 × 1024.**

> **A fresh current-repository 102-file binary dimension/corruption check remains a Coding/CI QA step before Alpha freeze; it does not reopen which portrait file Assets selected.**

If that QA finds a non-conforming file, the mapping stays attributable but the file must be repaired/replaced through explicit asset supersession rather than silently swapped by runtime.

---

## Authoritative Assets-side `uiPortrait` mapping

### Academy Student (10)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `academy_hinata` | `academy_student_hinata.png` | `Assets/Portraits/Academy Student/academy_student_hinata.png` | **ACTIVE — Assets approved** |
| `academy_iwabee` | `academy_student_iwabe.png` | `Assets/Portraits/Academy Student/academy_student_iwabe.png` | **ACTIVE — Assets approved** |
| `academy_izuno` | `academy_student_izuno.png` | `Assets/Portraits/Academy Student/academy_student_izuno.png` | **ACTIVE — Assets approved** |
| `academy_kakashi` | `academy_student_kakashi.png` | `Assets/Portraits/Academy Student/academy_student_kakashi.png` | **ACTIVE — Assets approved** |
| `academy_kurenai` | `academy_student_kurenai.png` | `Assets/Portraits/Academy Student/academy_student_kurenai.png` | **ACTIVE — Assets approved** |
| `academy_kushina` | `academy_student_kushina.png` | `Assets/Portraits/Academy Student/academy_student_kushina.png` | **ACTIVE — Assets approved** |
| `academy_menma` | `academy_student_menma.png` | `Assets/Portraits/Academy Student/academy_student_menma.png` | **ACTIVE — Assets approved** |
| `academy_metal_lee` | `academy_student_metal.png` | `Assets/Portraits/Academy Student/academy_student_metal.png` | **ACTIVE — Assets approved** |
| `academy_mirai` | `academy_student_mirai.png` | `Assets/Portraits/Academy Student/academy_student_mirai.png` | **ACTIVE — Assets approved** |
| `academy_obito` | `academy_student_obito.png` | `Assets/Portraits/Academy Student/academy_student_obito.png` | **ACTIVE — Assets approved** |

### Genin (9)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `genin_boruto` | `genin_boruto.png` | `Assets/Portraits/Genin/genin_boruto.png` | **ACTIVE — Assets approved** |
| `genin_chocho` | `genin_chocho.png` | `Assets/Portraits/Genin/genin_chocho.png` | **ACTIVE — Assets approved** |
| `genin_himawari` | `genin_himawari.png` | `Assets/Portraits/Genin/genin_himawari.png` | **ACTIVE — Assets approved** |
| `genin_hoki` | `genin_hoki.png` | `Assets/Portraits/Genin/genin_hoki.png` | **ACTIVE — Assets approved** |
| `genin_karin` | `genin_karin.png` | `Assets/Portraits/Genin/genin_karin.png` | **ACTIVE — Assets approved** |
| `genin_mitsuki` | `genin_mitsuki.png` | `Assets/Portraits/Genin/genin_mitsuki.png` | **ACTIVE — Assets approved** |
| `genin_naruto` | `genin_naruto.png` | `Assets/Portraits/Genin/genin_naruto.png` | **ACTIVE — Assets approved** |
| `genin_sarada` | `genin_sarada.png` | `Assets/Portraits/Genin/genin_sarada.png` | **ACTIVE — Assets approved** |
| `genin_sasuke` | `genin_sasuke.png` | `Assets/Portraits/Genin/genin_sasuke.png` | **ACTIVE — Assets approved** |

### Chunin (5)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `chunin_boruto` | `chunin_boruto.png` | `Assets/Portraits/Chunin/chunin_boruto.png` | **ACTIVE — Assets approved** |
| `chunin_jiraiya` | `chunin_jiraiya.png` | `Assets/Portraits/Chunin/chunin_jiraiya.png` | **ACTIVE — Assets approved** |
| `chunin_mitsuki` | `chunin_mitsuki.png` | `Assets/Portraits/Chunin/chunin_mitsuki.png` | **ACTIVE — Assets approved** |
| `chunin_shikadai` | `chunin_shikadai.png` | `Assets/Portraits/Chunin/chunin_shikadai.png` | **ACTIVE — Assets approved** |
| `chunin_shinki` | `chunin_shinki.png` | `Assets/Portraits/Chunin/chunin_shinki.png` | **ACTIVE — Assets approved** |

### Akatsuki (4)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `akatsuki_deva` | `akatsuki_deva.png` | `Assets/Portraits/Akatsuki/akatsuki_deva.png` | **ACTIVE — Assets approved** |
| `akatsuki_itachi` | `akatsuki_itachi.png` | `Assets/Portraits/Akatsuki/akatsuki_itachi.png` | **ACTIVE — Assets approved** |
| `akatsuki_sasuke` | `akatsuki_sasuke.png` | `Assets/Portraits/Akatsuki/akatsuki_sasuke.png` | **ACTIVE — Assets approved** |
| `akatsuki_teen_naruto` | `akatsuki_naruto.png` | `Assets/Portraits/Akatsuki/akatsuki_naruto.png` | **ACTIVE — Assets approved** |

### Anbu (4)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `anbu_ino` | `anbu_leader_ino.png` | `Assets/Portraits/Anbu/anbu_leader_ino.png` | **ACTIVE — Assets approved** |
| `anbu_menma` | `anbu_menma.png` | `Assets/Portraits/Anbu/anbu_menma.png` | **ACTIVE — Assets approved** |
| `anbu_naruto` | `anbu_naruto.png` | `Assets/Portraits/Anbu/anbu_naruto.png` | **ACTIVE — Assets approved** |
| `anbu_sasuke` | `anbu_sasuke.png` | `Assets/Portraits/Anbu/anbu_sasuke.png` | **ACTIVE — Assets approved** |

### Jonin (5)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `jonin_hanabi` | `jonin_hanabi.png` | `Assets/Portraits/Jonin/jonin_hanabi.png` | **ACTIVE — Assets approved** |
| `jonin_inojin` | `jonin_inojin.png` | `Assets/Portraits/Jonin/jonin_inojin.png` | **ACTIVE — Assets approved** |
| `jonin_konohamaru` | `jonin_kono.png` | `Assets/Portraits/Jonin/jonin_kono.png` | **ACTIVE — Assets approved** |
| `jonin_sasuke` | `jonin_sasuke.png` | `Assets/Portraits/Jonin/jonin_sasuke.png` | **ACTIVE — Assets approved** |
| `jonin_shino` | `jonin_shino.png` | `Assets/Portraits/Jonin/jonin_shino.png` | **ACTIVE — Assets approved** |

### Special Jonin (3)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `sj_ebisu` | `sj_ebisu.png` | `Assets/Portraits/Special Jonin/sj_ebisu.png` | **ACTIVE — Assets approved** |
| `sj_genma` | `sj_genma.png` | `Assets/Portraits/Special Jonin/sj_genma.png` | **ACTIVE — Assets approved** |
| `sj_ibiki` | `sj_ibiki.png` | `Assets/Portraits/Special Jonin/sj_ibiki.png` | **ACTIVE — Assets approved** |

### Sannin (2)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `sannin_sakura` | `sannin_sakura.png` | `Assets/Portraits/Sannin/sannin_sakura.png` | **ACTIVE — Assets approved** |
| `sannin_shikamaru` | `sannin_shika.png` | `Assets/Portraits/Sannin/sannin_shika.png` | **ACTIVE — Assets approved** |

### Kage (5)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `kage_itachi` | `kage_itachi.png` | `Assets/Portraits/Kage/kage_itachi.png` | **ACTIVE — Assets approved** |
| `kage_kakashi` | `kage_kaka.png` | `Assets/Portraits/Kage/kage_kaka.png` | **ACTIVE — Assets approved** |
| `kage_menma` | `kage_menma.png` | `Assets/Portraits/Kage/kage_menma.png` | **ACTIVE — Assets approved** |
| `kage_naruto` | `kage_naruto.png` | `Assets/Portraits/Kage/kage_naruto.png` | **ACTIVE — Assets approved** |
| `kage_sarada` | `kage_sarada.png` | `Assets/Portraits/Kage/kage_sarada.png` | **ACTIVE — Assets approved** |

### Rare Cards (4)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `black_gold_naruto` | `dark_naruto_kcm.png` | `Assets/Portraits/Rare Cards/dark_naruto_kcm.png` | **ACTIVE — Assets approved** |
| `black_sun_himawari` | `black_sun_himawari.png` | `Assets/Portraits/Rare Cards/black_sun_himawari.png` | **ACTIVE — Assets approved** |
| `serpent_ascendant` | `serpent_ascended.png` | `Assets/Portraits/Rare Cards/serpent_ascended.png` | **ACTIVE — Assets approved** |
| `shisui` | `village_guardian_shisui.png` | `Assets/Portraits/Rare Cards/village_guardian_shisui.png` | **ACTIVE — Assets approved** |

### Jinchuriki (12)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `sakura_avatar` | `jsakura_ava.png` | `Assets/Portraits/Jinchuriki/jsakura_ava.png` | **ACTIVE — Assets approved** |
| `sakura_manifestation` | `jsakura_mani.png` | `Assets/Portraits/Jinchuriki/jsakura_mani.png` | **ACTIVE — Assets approved** |
| `sakura_resonance` | `jsakura_res.png` | `Assets/Portraits/Jinchuriki/jsakura_res.png` | **ACTIVE — Assets approved** |
| `shikamaru_avatar_yang` | `jshika_ava.png` | `Assets/Portraits/Jinchuriki/jshika_ava.png` | **ACTIVE — Assets approved** |
| `shikamaru_avatar_yin` | `jshika_ava_yin.png` | `Assets/Portraits/Jinchuriki/jshika_ava_yin.png` | **ACTIVE — Assets approved** |
| `shikamaru_manifestation_yang` | `jshika_mani.png` | `Assets/Portraits/Jinchuriki/jshika_mani.png` | **ACTIVE — Assets approved** |
| `shikamaru_manifestation_yin` | `jshika_mani_yin.png` | `Assets/Portraits/Jinchuriki/jshika_mani_yin.png` | **ACTIVE — Assets approved** |
| `shikamaru_resonance_yang` | `jshika_res.png` | `Assets/Portraits/Jinchuriki/jshika_res.png` | **ACTIVE — Assets approved** |
| `shikamaru_resonance_yin` | `jshika_res_yin.png` | `Assets/Portraits/Jinchuriki/jshika_res_yin.png` | **ACTIVE — Assets approved** |
| `tobirama_avatar` | `jtobi_ava.png` | `Assets/Portraits/Jinchuriki/jtobi_ava.png` | **ACTIVE — Assets approved** |
| `tobirama_manifestation` | `jtobi_mani.png` | `Assets/Portraits/Jinchuriki/jtobi_mani.png` | **ACTIVE — Assets approved** |
| `tobirama_resonance` | `jtobi_res.png` | `Assets/Portraits/Jinchuriki/jtobi_res.png` | **ACTIVE — Assets approved** |

### Transformation (9)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `baryon_mode` | `bayron_mode.png` | `Assets/Portraits/Transformation/bayron_mode.png` | **ACTIVE — Assets approved** |
| `cs_anko` | `cs1_anko.png` | `Assets/Portraits/Transformation/cs1_anko.png` | **ACTIVE — Assets approved** |
| `cs_sasuke` | `cs1_sasuke.png` | `Assets/Portraits/Transformation/cs1_sasuke.png` | **ACTIVE — Assets approved** |
| `curse_mark_hinata` | `cs1_hinata.png` | `Assets/Portraits/Transformation/cs1_hinata.png` | **ACTIVE — Assets approved** |
| `l2_anko` | `cs2_anko.png` | `Assets/Portraits/Transformation/cs2_anko.png` | **ACTIVE — Assets approved** |
| `mangekyo_sarada` | `ms_sarada.png` | `Assets/Portraits/Transformation/ms_sarada.png` | **ACTIVE — Assets approved** |
| `naruto_v1` | `naruto_v1.png` | `Assets/Portraits/Transformation/naruto_v1.png` | **ACTIVE — Assets approved** |
| `naruto_v2` | `naruto_v2.png` | `Assets/Portraits/Transformation/naruto_v2.png` | **ACTIVE — Assets approved** |
| `sharingan_sasuke` | `sharingan_sasuke.png` | `Assets/Portraits/Transformation/sharingan_sasuke.png` | **ACTIVE — Assets approved** |

### Variants (8)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `breakout_kurama` | `outbreak_kurama.png` | `Assets/Portraits/Variants/outbreak_kurama.png` | **ACTIVE — Assets approved** |
| `coercive_cloak` | `coercive_cloak.png` | `Assets/Portraits/Variants/coercive_cloak.png` | **ACTIVE — Assets approved** |
| `kurama_dominion` | `kurama_dominion.png` | `Assets/Portraits/Variants/kurama_dominion.png` | **ACTIVE — Assets approved** |
| `kurama_sovereign` | `kurama_sovreign.png` | `Assets/Portraits/Variants/kurama_sovreign.png` | **ACTIVE — Assets approved** |
| `six_tail_dominion` | `dominion_six_tails.png` | `Assets/Portraits/Variants/dominion_six_tails.png` | **ACTIVE — Assets approved** |
| `stolen_chakra` | `stolen_chakra.png` | `Assets/Portraits/Variants/stolen_chakra.png` | **ACTIVE — Assets approved** |
| `teen_nagato` | `teen_nagato.png` | `Assets/Portraits/Variants/teen_nagato.png` | **ACTIVE — Assets approved** |
| `three_tail_dominion` | `dominion_three_tails.png` | `Assets/Portraits/Variants/dominion_three_tails.png` | **ACTIVE — Assets approved** |

### Boss Cards (6)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `black_madara` | `black_madara.png` | `Assets/Portraits/Boss Cards/black_madara.png` | **ACTIVE — Assets approved** |
| `failed_god_madara` | `failed_god_madara.png` | `Assets/Portraits/Boss Cards/failed_god_madara.png` | **ACTIVE — Assets approved** |
| `fallen_hokage_sasuke` | `fallen_hokage.png` | `Assets/Portraits/Boss Cards/fallen_hokage.png` | **ACTIVE — Assets approved** |
| `shadow_of_indra` | `shadow_of_indra.png` | `Assets/Portraits/Boss Cards/shadow_of_indra.png` | **ACTIVE — Assets approved** |
| `sixth_shadow` | `the_sixth_shadow.png` | `Assets/Portraits/Boss Cards/the_sixth_shadow.png` | **ACTIVE — Assets approved** |
| `undying_madara` | `undying_madara.png` | `Assets/Portraits/Boss Cards/undying_madara.png` | **ACTIVE — Assets approved** |

### Summons (16)

| Registry representation ID | Approved portrait file | Exact repository path | Assets status |
|---|---|---|---|
| `de_baku` | `baku.png` | `Assets/Portraits/Summons/baku.png` | **ACTIVE — Assets approved** |
| `gamakichi` | `gamakichi.png` | `Assets/Portraits/Summons/gamakichi.png` | **ACTIVE — Assets approved** |
| `ibuse` | `ibuse.png` | `Assets/Portraits/Summons/ibuse.png` | **ACTIVE — Assets approved** |
| `iron_maiden` | `maiden.png` | `Assets/Portraits/Summons/maiden.png` | **ACTIVE — Assets approved** |
| `key_gero` | `geratora.png` | `Assets/Portraits/Summons/geratora.png` | **ACTIVE — Assets approved** |
| `koto_crow` | `koto_crow.png` | `Assets/Portraits/Summons/koto_crow.png` | **ACTIVE — Assets approved** |
| `kurama_complete` | `kurama_complete.png` | `Assets/Portraits/Summons/kurama_complete.png` | **ACTIVE — Assets approved** |
| `menma_kurama` | `menma_kurama.png` | `Assets/Portraits/Summons/menma_kurama.png` | **ACTIVE — Assets approved** |
| `menma_nine_tails` | `menma_nine_tails.png` | `Assets/Portraits/Summons/menma_nine_tails.png` | **ACTIVE — Assets approved** |
| `mirage_clam` | `mirage_clam.png` | `Assets/Portraits/Summons/mirage_clam.png` | **ACTIVE — Assets approved** |
| `mk_enma` | `monkey_king_enma.png` | `Assets/Portraits/Summons/monkey_king_enma.png` | **ACTIVE — Assets approved** |
| `nine_tails` | `naruto_nine_tails.png` | `Assets/Portraits/Summons/naruto_nine_tails.png` | **ACTIVE — Assets approved** |
| `triple_rashomon` | `rashomon.png` | `Assets/Portraits/Summons/rashomon.png` | **ACTIVE — Assets approved** |
| `wr_kamatari` | `kamatari.png` | `Assets/Portraits/Summons/kamatari.png` | **ACTIVE — Assets approved** |
| `yang_kurama` | `kurama_yang.png` | `Assets/Portraits/Summons/kurama_yang.png` | **ACTIVE — Assets approved** |
| `yin_kurama` | `kurama_yin.png` | `Assets/Portraits/Summons/kurama_yin.png` | **ACTIVE — Assets approved** |

---

## Deliberate non-matching filenames / path fossils

Several approved mappings deliberately demonstrate why runtime must consume the manifest rather than derive paths from IDs. Examples include:

- `academy_iwabee` → `academy_student_iwabe.png`;
- `academy_metal_lee` → `academy_student_metal.png`;
- `akatsuki_teen_naruto` → `akatsuki_naruto.png`;
- `anbu_ino` → `anbu_leader_ino.png`;
- `jonin_konohamaru` → `jonin_kono.png`;
- `kage_kakashi` → `kage_kaka.png`;
- `sannin_shikamaru` → `sannin_shika.png`;
- `black_gold_naruto` → `dark_naruto_kcm.png`;
- `serpent_ascendant` → `serpent_ascended.png`;
- `shisui` → `village_guardian_shisui.png`;
- `fallen_hokage_sasuke` → `fallen_hokage.png`;
- `sixth_shadow` → `the_sixth_shadow.png`;
- `baryon_mode` → `bayron_mode.png`;
- `kurama_sovereign` → `kurama_sovreign.png`;
- `breakout_kurama` → `outbreak_kurama.png`;
- `key_gero` → `geratora.png`;
- `de_baku` → `baku.png`;
- `iron_maiden` → `maiden.png`;
- `wr_kamatari` → `kamatari.png`;
- `mk_enma` → `monkey_king_enma.png`;
- `triple_rashomon` → `rashomon.png`;
- `nine_tails` → `naruto_nine_tails.png`.

These filenames are current physical path authority. Do **not** rename them merely to make strings prettier while wiring the resolver. Any later cleanup is an explicit asset migration/supersession operation.

---

## Registry handoff boundary

Registry may now ratify:

`Registry representation ID → approved uiPortrait`

using the exact 102 rows above.

Registry should not re-derive or rename the Assets-side selection. If Registry identifies an identity mismatch, return that exact row to Character Creation / Assets for adjudication rather than substituting a filename heuristic.

---

## UI consumption boundary

UI confirms one universal approved square `uiPortrait` projection may be reused across:

- normal Battle UI;
- Stage Battles;
- Arena / Tournament;
- other compact identity presentation explicitly using the same portrait contract.

This does not require separate `Battle/` or `Arena/` portrait directories.

---

## Coding boundary

Coding may wire the dedicated resolver **after Registry ratifies the identity → `uiPortrait` mapping**.

Runtime must not:

- invent a file path from a Registry ID;
- silently crop/use collectible-card artwork;
- infer from filename similarity;
- choose by directory order;
- use generic participant image data as permanent authority;
- silently select a different file when the approved path is missing;
- resurrect superseded portrait assets.

Missing approved assets must fail visibly in development diagnostics.

Recommended regression coverage:

1. 102 expected production IDs resolve exactly once;
2. 102 approved paths are unique and present;
3. every current PNG satisfies 1024 × 1024 and decodes successfully;
4. collectible-card and portrait mappings remain independent;
5. deliberate filename mismatches resolve correctly;
6. missing paths fail visibly;
7. superseded portrait files do not become active by filesystem presence;
8. Battle / Stage / Arena consume the same `uiPortrait` unless later UI authority explicitly creates another projection.

---

## Ownership

- **Character Creation / Assets** owns approved visual identity, selected portrait file/path and asset supersession.
- **Registry** owns stable identity and ratifies identity → `uiPortrait` projection.
- **UI** owns presentation surfaces and reuse contract.
- **Coding** owns resolver implementation, diagnostics and fresh binary QA.
- **Combat / PL / CE** do not derive mechanical authority from portrait selection.

---

## Closure state

**Assets-side Battle Portrait manifest: CLOSED — 102/102.**

Remaining downstream work:

`Assets mapping closed`

→ `Registry ratifies identity → uiPortrait`

→ `Coding runs fresh binary QA and wires resolver`

→ `UI/Battle/Stage/Arena consume resolver`

No portrait-generation task is created by this manifest unless the fresh binary QA or visual review identifies a genuine defect.
