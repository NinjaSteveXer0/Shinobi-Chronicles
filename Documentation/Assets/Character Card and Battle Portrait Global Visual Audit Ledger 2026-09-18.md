# Shinobi Chronicles — Character Card + Battle Portrait Global Visual Audit Ledger

**Status:** ACTIVE / DURABLE CHARACTER CREATION VISUAL QA LEDGER  
**Established:** 2026-09-18  
**Owner:** Character Creation / Visuals  
**Audit issue:** #233  
**Card snapshot authority:** `2a0d727771311031052eab807a4cb50dfb84c419` — Stephen-supplied frozen current ninja Character Card baseline  
**Portrait repository cross-reference:** `12ec215b8674439449d64bdc4aa27e5e7ece5a62` — current `main` HEAD at ledger creation  
**Image generation authority:** NONE. This ledger does not authorize generation.

---

## 1. Global benchmark lock

### GENIN MENMA = CURRENT GLOBAL PREMIUM CHARACTER CARD BENCHMARK

`Assets/Genin/genin_menma.png` is the current minimum comparison authority for premium Character Card rendering and authored presence.

The benchmark is not merely "high quality anime art." Its distinguishing target is:

- believable human presence inside the premium fantasy-anime language;
- dimensional facial construction rather than a flat painted/template face;
- convincing skin, hair, fabric, metal and material response;
- authored expression and personality;
- strong camera presence and silhouette;
- sophisticated lighting, depth and environment integration;
- premium frame/icon/nameplate finish;
- exact identity/state fidelity;
- no generic carbon-copy feeling.

### FUTURE ACCEPTANCE GATE — STEPHEN DIRECT

For a **new Character Card or a remaster/upgrade**, Genin Menma is the acceptance floor.

Future result states:

- **BELOW MENMA** — reject;
- **NEAR MENMA** — reject;
- **MEETS MENMA** — acceptable final quality, subject to the ordinary identity/rule/Stephen approval gates;
- **EXCEEDS MENMA** — acceptable final quality and triggers a **GOLDEN ALERT** for benchmark discussion.

This does not retroactively delete or invalidate existing accepted cards. The audit records where they sit relative to the benchmark and identifies remaster candidates.

### 🚨 GOLDEN ALERT protocol

When Character Creation judges a generated card to **EXCEED GENIN MENMA**:

1. explicitly issue **🚨 GOLDEN ALERT**;
2. preserve the exact binary/version;
3. do not silently promote it as the new benchmark;
4. compare it against Genin Menma on face/human presence, rendering, composition, identity, frame/icon/nameplate, lighting/materials and overall cohesion;
5. discuss with Stephen whether it becomes the new global benchmark;
6. only Stephen can ratify benchmark supersession.

Until that discussion closes, **Genin Menma remains the benchmark**.

---

## 2. Live rule authority

Before every future image generation/edit, consume live GitHub authority per #231.

Minimum relevant authority includes:

- #134 — Canon Research First where canon-derived identity is involved;
- #138 — Character Creation Image Prompt Fidelity and Generation Discipline;
- #207 — Genin Menma global premium Character Card benchmark;
- #231 — refresh live Character Creation visual rules before every generation;
- current representation-specific Registry / Story / visual authority;
- `Documentation/Coordination/Character Creation Visual Workspace Final Archive Audit 2026-09-12.md`.

Hard Character Card gates include:

- 980x1400 / exact 0.70:1 forward master;
- exact identity, age, stage, form and SC divergence;
- unique top-left icon;
- unique frame architecture;
- unique pose, expression, environment, lighting/composition rhythm;
- facial staging uniqueness where alternates/families apply;
- Title / Name only unless exact active authority explicitly overrides;
- no random Japanese text, stats, quotes, body copy or unnecessary footer;
- hard-count geometry where relevant;
- location != affiliation;
- beautiful wrong = failed.

Battle/UI portrait gates include:

- 1024x1024 square master;
- frameless;
- no card border, top-left icon, nameplate, title, text or baked UI;
- purpose-composed rather than a collectible-card crop;
- exact representation fidelity to the approved visual authority;
- face/upper body readable at Battle/UI scale.

---

## 3. Audit verdict vocabulary

| Verdict | Meaning |
|---|---|
| **GREEN** | Hard rules and reviewed visual requirements pass. |
| **GREEN — PHYSICAL NORMALIZATION REQUIRED** | Visual/semantic asset is accepted; binary size/ratio still needs normalization only. |
| **PASS WITH NOTES / REMASTER CANDIDATE** | Usable existing asset, but materially behind current benchmark or has non-blocking visual debt. |
| **FAIL — HARD RULE** | Violates identity, text, geometry, portrait contamination, count, age, or another locked rule. |
| **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | Path/blob/source is verified but pixels have not yet been fully reviewed. |
| **BENCHMARK** | Current comparison authority. |
| **LOCKED / DO NOT REMASTER** | Stephen-direct preservation authority exists unless explicitly superseded. |

### Menma benchmark column

Allowed values:

`BELOW` / `NEAR` / `MEETS` / `EXCEEDS` / `BENCHMARK` / `N/A` / `PENDING`

No false precision score is used.

---

## 4. Required audit data fields

Every audited asset should ultimately record:

| Field | Purpose |
|---|---|
| Registry / Asset ID | Stable identity or exact file-derived asset key |
| Display Title | Exact upper-line title shown on card |
| Display Name | Exact main-line name |
| Asset Class | Character Card / Battle Portrait / NPC Card / etc. |
| Representation | Exact age/rank/state/form/AU identity |
| Source Path | Exact GitHub or accepted source path |
| Blob / Commit | Exact binary/version being judged |
| Dimensions | Actual pixel dimensions |
| Geometry Status | 980x1400 / 0.70 card or 1024x1024 portrait compliance |
| Identity Fidelity | Correct person/state and recognisability |
| Age Fidelity | Child/adolescent/adult visual correctness |
| Face / Human Presence | Dimensional, specific, believable vs painted/template |
| Facial Staging | Head turn, eye-line, chin angle, expression geometry, family duplication |
| Expression | Character-specific personality/read |
| Pose / Silhouette | Strength, uniqueness and readability |
| Camera / Composition | Perspective, crop, prominence, visual hierarchy |
| Render Quality | Skin/hair/fabric/metal/anatomy/material sophistication |
| Lighting Quality | Direction, volume, contrast, separation |
| Environment | Specificity, storytelling and subject integration |
| Frame Design | Unique, premium and subject-specific |
| Top-left Icon | Correct, meaningful, unique |
| Text Compliance | Title / Name only unless explicitly overridden |
| Hard Geometry | Counts: tails/tomoe/wings/limbs/weapons/etc. |
| Card ↔ Portrait Fidelity | Same approved representation |
| Portrait Purpose Compliance | Frameless, purpose-composed, readable |
| Menma Benchmark | BELOW / NEAR / MEETS / EXCEEDS / BENCHMARK / N/A |
| Primary Defect | Main blocker |
| Secondary Notes | Non-blocking observations |
| Required Action | None / normalize / surgical edit / remaster / regenerate |
| Audit Verdict | One of the controlled verdicts above |
| Golden Alert | YES only on EXCEEDS |
| Stephen Status | Pending / Accepted / Locked / Rejected / Superseded |

---

## 5. Source package receipts

### Character Card pixel-audit bundles received

- `academy student - jinchuriki.zip` — 387,287,470 bytes
- `jonin - variants(3).zip` — 247,950,405 bytes

These were supplied by Stephen as the current Character Card pixel source, split to avoid transfer issues.

### Battle Portrait pixel-audit bundles received

- `academy - jinchuriki(4).zip` — 298,802,307 bytes
- `jonin - variants(4).zip` — 176,121,887 bytes

These were supplied by Stephen as the complete Battle Portrait pixel source, split to avoid transfer issues.

**Important:** package receipt != per-file audit completion. Each extracted binary must be matched to its exact representation/path before a visual verdict is recorded.

---

## 6. Character Card inventory — frozen snapshot 2a0d727

**Inventory count: 141 ninja Character Cards.**

The inventory itself is source-verified. Pixel verdicts are populated only when the exact binary has been reviewed.

| Asset ID | Source Path | Blob SHA | Dimensions | Geometry | Menma Benchmark | Audit Verdict | Golden | Notes / Required Action |
|---|---|---|---|---|---|---|---|---|
| `academy_hinata` | `Assets/Academy Student/academy_hinata.png` | `06315be0e02f13dd334260a26a58b30af8eacd11` | PENDING (machine-read) | PENDING | **BELOW** | **PASS WITH NOTES / REMASTER CANDIDATE** | NO | Direct user-uploaded pixel review complete. Correct youthful read, distinctive hand/Byakugan icon, strong training-environment storytelling. Face/eyes/skin remain flatter and more illustration-like than Genin Menma; human-presence/material depth below benchmark. Exact uploaded-byte↔repo-blob match and dimensions still pending backend recovery. |
| `academy_iwabe` | `Assets/Academy Student/academy_iwabe.png` | `364388051c4b250dee9ddb59107418735f99cd5e` | PENDING (machine-read) | PENDING | **NEAR** | **FAIL — HARD RULE** | NO | Direct pixel review: excellent action, rock/material depth and environmental scale; face still less dimensional/specific than Genin Menma. Top-left icon visibly uses Japanese/kanji text (`体`) without recorded exact authority, conflicting with no-random-Japanese/text discipline. Age/build should be rechecked against exact Academy representation authority before remaster. |
| `academy_izuno` | `Assets/Academy Student/academy_izuno.png` | `97d3fbb395018815a007f6edfdc4789085e7de6b` | PENDING (machine-read) | PENDING | **NEAR** | **PASS WITH NOTES / REMASTER CANDIDATE** | NO | Direct pixel review: strong age read, expressive personality, distinct paw icon/frame language and excellent kinetic environment. Large-eye/anime facial construction keeps human presence below Menma; otherwise one of the stronger Academy compositions. |
| `academy_kakashi` | `Assets/Academy Student/academy_kakashi.png` | `c021b04d33efd3db9bcdb96991987384ac7673f1` | PENDING (machine-read) | PENDING | **NEAR** | **PASS WITH NOTES / REMASTER CANDIDATE** | NO | Direct pixel review: strong silhouette, night lighting and readable Kakashi identity. Facial rendering is still cleaner/flatter than Genin Menma and the frame architecture materially overlaps the Academy Kurenai premium-gold family; exact Academy-age fidelity should be checked against representation authority. |
| `academy_kurenai` | `Assets/Academy Student/academy_kurenai.png` | `ed9746570d6f004d882d03558044b911ccd532dc` | PENDING (machine-read) | PENDING | **BELOW** | **FAIL — HARD RULE** | NO | Direct pixel review: attractive lighting/environment, but subject reads materially older/more mature than an Academy-stage child/early adolescent and face is idealized/doll-like versus Menma's human presence. Gold frame architecture also overlaps Academy Kakashi's family. Requires representation/age correction before benchmark work. |
| `academy_kushina` | `Assets/Academy Student/academy_kushina.png` | `36cdef54ddcbea06fc2bf55152c6fce1316944b2` | PENDING (machine-read) | PENDING | **NEAR** | **PASS WITH NOTES / REMASTER CANDIDATE** | NO | Direct pixel review: excellent youthful energy, dirt/skin detail, strong foreshortening, expressive Kushina personality and unique red/maple frame. Still more anime-illustrated in facial planes/eyes than Genin Menma; strong remaster base. |
| `academy_menma` | `Assets/Academy Student/academy_menma.png` | `f7b9e56831b26eceb74cc6029a7601bf8a9a7c4d` | PENDING (machine-read) | PENDING | **NEAR** | **FAIL — HARD RULE** | NO | Direct pixel review: strongest overall human-presence/render contender in this Academy batch; excellent black/red identity, depth, face specificity and authored pose, but still below Genin Menma's more believable living-person read. Visible Japanese text tags (`狐`) exceed the locked Title/Name-only/no-random-Japanese contract. |
| `academy_metal` | `Assets/Academy Student/academy_metal.png` | `7d43742e4ea83e1ac998ef8c3d2683dc6a02216b` | PENDING (machine-read) | PENDING | **BELOW** | **FAIL — HARD RULE** | NO | Direct pixel review: strong action/material/environment rendering and good age silhouette, but exaggerated cartoon eye/facial construction falls well below Menma human-presence standard. Top-left icon visibly uses Japanese/kanji text (`体`) without recorded exact authority. |
| `academy_mirai` | `Assets/Academy Student/academy_mirai.png` | `71c1fccfbe59a829fb13ea5fce3cb8ec330a3a86` | PENDING (machine-read) | PENDING | **NEAR** | **PASS WITH NOTES / REMASTER CANDIDATE** | NO | Direct pixel review: clean child/early-adolescent read, coherent autumn training setting, distinct pose and frame. Face/skin/eyes remain smooth and anime-flat relative to Menma; human presence and material separation need remaster uplift. |
| `academy_obito` | `Assets/Academy Student/academy_obito.png` | `3c7559ef5162a3a62433e9169541e213c1e0a9a1` | PENDING (machine-read) | PENDING | **NEAR** | **FAIL — HARD RULE** | NO | Direct pixel review: strong Obito identity, goggles, youthful action, lighting and foreshortening; face/material read is still below Menma. Visible Japanese text appears both in the top-left glyph icon (`土`) and background signage, conflicting with the locked no-random-Japanese / Title-Name-only rule absent explicit authority. |
| `akatsuki_deva` | `Assets/Akatsuki/akatsuki_deva.png` | `c99bc291cc2bb45e0708a4c0a899b87b3c45c738` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `akatsuki_itachi` | `Assets/Akatsuki/akatsuki_itachi.png` | `2a7edf7bc7da08ccbde70e510aceaff2b04f778a` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `akatsuki_kakuzu` | `Assets/Akatsuki/akatsuki_kakuzu.png` | `5ca182ab12e2c5a8d353477f50b472948b75edb4` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `akatsuki_naruto` | `Assets/Akatsuki/akatsuki_naruto.png` | `48eee9bcdafc34bace4945c3986b23a146e565ce` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `akatsuki_sasuke` | `Assets/Akatsuki/akatsuki_sasuke.png` | `d54114dbb231b83839d52b1badb34395e484d39c` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `anbu_ino` | `Assets/Anbu/anbu_ino.png` | `f40dde565f8139f17edfb80f4c8d10a8222ac62a` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `anbu_menma` | `Assets/Anbu/anbu_menma.png` | `b54175c525af34d7746fc714346ea20877c48880` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `anbu_naruto` | `Assets/Anbu/anbu_naruto.png` | `fa9f0c11a4c677b542734ba7107ed9c90bba77f6` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `anbu_sasuke` | `Assets/Anbu/anbu_sasuke.png` | `4d56c1e093e94c21d0ee06a4283c1fb7d5306ffb` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `anbu_torune` | `Assets/Anbu/anbu_torune.png` | `cad2193bb57da9988756b95f909941d28c8ed4b5` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `advanced_optimisation_ren` | `Assets/Boss Cards/advanced_optimisation_ren.png` | `754849120a1f704ecaa8689c8b6d031a5c60ae2c` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `black_madara` | `Assets/Boss Cards/black_madara.png` | `0f48acb78e8e12927064b260c5c233d447b1a2b9` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `conditioned_echo_ren` | `Assets/Boss Cards/conditioned_echo_ren.png` | `9b02c5f1470620be197ef53a390d895e69017ecd` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `failed_god_madara` | `Assets/Boss Cards/failed_god_madara.png` | `935322407f72de2ffe9e604cec88eaf197c8f13b` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `fallen_hokage_sasuke` | `Assets/Boss Cards/fallen_hokage_sasuke.png` | `3b3fc2a3f7b45c7660f753d1c47905d99fca5831` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `shadow_of_indra` | `Assets/Boss Cards/shadow_of_indra.png` | `776dc9f253c3d583b2d42bb160811db7491003e3` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sixth_shadow` | `Assets/Boss Cards/sixth_shadow.png` | `0b9d0b5c4924a6211a1c674584692435a4339163` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `terminal_optimisation_ren` | `Assets/Boss Cards/terminal_optimisation_ren.png` | `08a2ce6352c1b6bd09c30cc7a450ccf000ebfa38` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `undying_madara` | `Assets/Boss Cards/undying_madara.png` | `3350f8235a78be64f6591d98a5e14b33bbdabcbc` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `chunin_boruto` | `Assets/Chunin/chunin_boruto.png` | `6e25118c1fa47891d3aad4305311f3cea3288585` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `chunin_fugaku` | `Assets/Chunin/chunin_fugaku.png` | `ba86cc1d58b54b50b8e9aca5aa592a781248e951` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `chunin_iruka` | `Assets/Chunin/chunin_iruka.png` | `412e88d744724954f4a9f52b12dc6a30469081f9` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `chunin_itama` | `Assets/Chunin/chunin_itama.png` | `1cc88253bdca826227b0aa14751831fb1f2f7e18` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `chunin_jiraiya` | `Assets/Chunin/chunin_jiraiya.png` | `7b87ca6c7b791dc82548edc8681be0386c82e94b` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `chunin_mitsuki` | `Assets/Chunin/chunin_mitsuki.png` | `8ca055bd72f0937f695fd7e4a1f3845254699d22` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `chunin_shikadai` | `Assets/Chunin/chunin_shikadai.png` | `ae07558bdb3e3b74386f9dfbbdaae280af538acd` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `chunin_shinki` | `Assets/Chunin/chunin_shinki.png` | `9c3afc0a1f06007149d7c6b55c8241084094ccc9` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_boruto` | `Assets/Genin/genin_boruto.png` | `0fa5cbd0e730cce393aa72e39294fa41dd88ea76` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_chocho` | `Assets/Genin/genin_chocho.png` | `aec71a7e58c4e62b52d92d75b9afeefe90329ce2` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_choza` | `Assets/Genin/genin_choza.png` | `892c6ee5267ca27c26d34858fc947b6e3d1040fb` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_dan` | `Assets/Genin/genin_dan.png` | `89dbf1d1def0c9c83093d9df0e13240f74ebf7e0` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_danzo` | `Assets/Genin/genin_danzo.png` | `1ccc6db066e4a09803c86ddcd7e8827c2cc8b6e8` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_duy` | `Assets/Genin/genin_duy.png` | `c349b2bde380cf23840fa2d67efbe9023792790e` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_guy` | `Assets/Genin/genin_guy.png` | `a651389e7b4bfb70c279d4818211b6eca013bd00` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_hashirama` | `Assets/Genin/genin_hashirama.png` | `436a5ddf50aef8c32c9191b2e4231712726dd4c8` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_hayate` | `Assets/Genin/genin_hayate.png` | `38a4f778d05ff52c2e968b8e7098f8e52d40c111` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_hiashi` | `Assets/Genin/genin_hiashi.png` | `2b4d0e763e719fb54d8ffc7e2fe7492be06fa182` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_himawari` | `Assets/Genin/genin_himawari.png` | `c656376b5be80452d79798138916642150ddc82f` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_hinata` | `Assets/Genin/genin_hinata.png` | `1aef07faa9299273dcf54125b1ff1dea026f7daf` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_hiruzen` | `Assets/Genin/genin_hiruzen.png` | `032b7ebbc69119643b6eabaf51edb59318b3c882` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_hoki` | `Assets/Genin/genin_hoki.png` | `e103588c1930e626be87674fb764e691493362ae` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_inoichi` | `Assets/Genin/genin_inoichi.png` | `86ddbf8fc858e5a114f97a8cde3e47053df35be7` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_kagami` | `Assets/Genin/genin_kagami.png` | `d811636c06c21b28f4760683948ec88fdf9a546d` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_karin` | `Assets/Genin/genin_karin.png` | `45697c077d396a5a90e16414dbf5dc20a9ce0ae4` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_kosuke` | `Assets/Genin/genin_kosuke.png` | `73259f0e551d4f5d93d55f303bf83947820c81bd` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_menma` | `Assets/Genin/genin_menma.png` | `c048001c0bad2becd0e87458598c6c948ff284ad` | PENDING | PENDING | **BENCHMARK** | **BENCHMARK** | NO | Global premium Character Card benchmark. Future new/remaster acceptance requires EXCEEDS, not merely MEETS. |
| `genin_mikoto` | `Assets/Genin/genin_mikoto.png` | `7225698fd74148cac8452cc3dc902ef68ba4fd09` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_mito` | `Assets/Genin/genin_mito.png` | `dfff229f0f3702b099e6ac534358527e9df85870` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_mitsuki` | `Assets/Genin/genin_mitsuki.png` | `30aa81ff855b3f658b18a383fb3a6b7212981d72` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_mukai` | `Assets/Genin/genin_mukai.png` | `ca65646195cb14e32deb86b800aba60e966b0643` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_naruto` | `Assets/Genin/genin_naruto.png` | `84032cf83bf07f0ff4728a543e88e503fadd3db3` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_nawaki` | `Assets/Genin/genin_nawaki.png` | `7a801519aaa42fc4084d4d65c7f121c79c7f1cce` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_orochimaru` | `Assets/Genin/genin_orochimaru.png` | `5000160832a37f204cea9bc9a04754fb18ed0a2f` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_rin` | `Assets/Genin/genin_rin.png` | `ea772588672ef7fc4e80c399fb707e3375ee052b` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_sai` | `Assets/Genin/genin_sai.png` | `58f3c6d3aca7514fb1ce50401f73c34214a2263c` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_sakumo` | `Assets/Genin/genin_sakumo.png` | `8ce54def7d782dc9c7acc756f6ff05d02cf2edc3` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_sarada` | `Assets/Genin/genin_sarada.png` | `04faa5e020017392857b62c72843138921ae6b1e` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_sasuke` | `Assets/Genin/genin_sasuke.png` | `8d3c403d1481be088c87481ab7520fdb9bea5ee4` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `genin_shibi` | `Assets/Genin/genin_shibi.png` | `c995ead38dcc2d5e1c33078ea871a2aa5892b802` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_shizune` | `Assets/Genin/genin_shizune.png` | `6f07e8df2b560c7d1a8258b17139ac490aada492` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_torifu` | `Assets/Genin/genin_torifu.png` | `4720119dad2515514c22f5131ab53c11d8f9d8da` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_tsume` | `Assets/Genin/genin_tsume.png` | `eb96319a76800b00b9d56d62bbf18a3b9df83245` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_tsunade` | `Assets/Genin/genin_tsunade.png` | `cba700ff967545d6e4105364896eb6819928db39` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_yamato` | `Assets/Genin/genin_yamato.png` | `acdf12a1d19ef3046a84287fbc718fd9294a7cea` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `genin_yugao` | `Assets/Genin/genin_yugao.png` | `b2ccd1109d8c7077677386f1c1a905e811b2e35a` | 980x1400 (proven by #74 normalization gate) | GREEN | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Physical gate proven GREEN at normalization commit 21b8952... and blob unchanged at supplied snapshot; visual Menma benchmark review remains pending. |
| `rin_avatar` | `Assets/Jinchuriki/rin_avatar.png` | `158cbd7e15ec9ed3d8d250fe1c788101234e2797` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `rin_manifestation` | `Assets/Jinchuriki/rin_manifestation.png` | `1ace4107baea9b212f19795ac83d6b09d13f0045` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `rin_resonance` | `Assets/Jinchuriki/rin_resonance.png` | `f352e78ce49543c49da59f4181bd05b13cbfec62` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sakura_avatar` | `Assets/Jinchuriki/sakura_avatar.png` | `1919a63ea5365ca0217cd2e7726908e53cd047cc` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sakura_manifestation` | `Assets/Jinchuriki/sakura_manifestation.png` | `19fd98edd88b9a7b3df705eace8c30f64b56b6f6` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sakura_resonance` | `Assets/Jinchuriki/sakura_resonance.png` | `6547a27702ff479d45f519546a830e1083368c19` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `shikamaru_avatar_yang` | `Assets/Jinchuriki/shikamaru_avatar_yang.png` | `dfcf273ca7c0a81b5e6aefd5887d5706d53fa50c` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `shikamaru_avatar_yin` | `Assets/Jinchuriki/shikamaru_avatar_yin.png` | `9ffd0e66363a637eb37823c471fce3d09918499c` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `shikamaru_manifestation_yang` | `Assets/Jinchuriki/shikamaru_manifestation_yang.png` | `47c3a4aed6353fffa8c1eb8be04e2b1453b58842` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `shikamaru_manifestation_yin` | `Assets/Jinchuriki/shikamaru_manifestation_yin.png` | `c10402c10c7a4a68dd34178e7111f9a4ac74e936` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `shikamaru_resonance_yang` | `Assets/Jinchuriki/shikamaru_resonance_yang.png` | `0e65146426a44a65cc13445506d0387e36fb307a` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `shikamaru_resonance_yin` | `Assets/Jinchuriki/shikamaru_resonance_yin.png` | `276d6ac4f13f5913bd74cb08131189705be8f163` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `tobirama_avatar` | `Assets/Jinchuriki/tobirama_avatar.png` | `1041cdfe0ff19eefdc999de88436cb982cccf67d` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `tobirama_manifestation` | `Assets/Jinchuriki/tobirama_manifestation.png` | `4971a188275f4aa03b05d03b1948d5477e232083` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `tobirama_resonance` | `Assets/Jinchuriki/tobirama_resonance.png` | `232ee18857cc7fb4570a88f050d7d1b9a370b492` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `jonin_hanabi` | `Assets/Jonin/jonin_hanabi.png` | `de225fe6eb9ef7cad08686081000600a70a6d96f` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `jonin_inojin` | `Assets/Jonin/jonin_inojin.png` | `eec756bd89d770f06b719b7ec6474553d2522e49` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `jonin_konohamaru` | `Assets/Jonin/jonin_konohamaru.png` | `820681188cf449be850deaea552e77c57f93815b` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `jonin_kushina` | `Assets/Jonin/jonin_kushina.png` | `493df910853599939931886e7c3c09d3fbdea38e` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `jonin_sasuke` | `Assets/Jonin/jonin_sasuke.png` | `4182205636ffda7c6404c8a4ffb5a5d30f4235cb` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `jonin_shikaku` | `Assets/Jonin/jonin_shikaku.png` | `633ab7b99320d434fa8ddc7be71cba5ac615137e` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `jonin_shino` | `Assets/Jonin/jonin_shino.png` | `4a4db264afe745697c5bdf2b20b9b7ef8c115b9a` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `kage_itachi` | `Assets/Kage/kage_itachi.png` | `573c7065ecd29a9593ce0252b090c7cb15de1aea` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `kage_kakashi` | `Assets/Kage/kage_kakashi.png` | `8d1e9f1975ded49c56de8d2349d759310350e564` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `kage_madara` | `Assets/Kage/kage_madara.png` | `d0d549cd654ff7a001e83191a5cbdad2a8f8bae7` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `kage_menma` | `Assets/Kage/kage_menma.png` | `8aacfa07974a082e4fb15bb702c0e0d1f3c5c7a8` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `kage_minato` | `Assets/Kage/kage_minato.png` | `f66c8688d3c09dd1a472002b1a4ebdebf27b4a32` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `kage_naruto` | `Assets/Kage/kage_naruto.png` | `c4d3391ba442fbe6b59971a6b5d5e71610876ad2` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `kage_sarada` | `Assets/Kage/kage_sarada.png` | `0d917d092016151eb2e0ac95a859a75d00e6cb24` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `black_gold_naruto` | `Assets/Rare Cards/black_gold_naruto.png` | `b2e9e6ffb5c9a8bddb5c0e9e679b6ce31361f92f` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `black_sun_himawari` | `Assets/Rare Cards/black_sun_himawari.png` | `ebe19d5b2dc44ad395f78046b3ddeb12cc8de843` | PENDING | PENDING | **PENDING** | **LOCKED / DO NOT REMASTER** | NO | Stephen-direct historical KEEP THIS CARD authority. Audit may record facts but must not cosmetically remaster absent explicit supersession. |
| `kurama_resonance_himawari` | `Assets/Rare Cards/kurama_resonance_himawari.png` | `f2c08c47b6f4bd2f593531a559c687f68d304b34` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `serpent_ascendant` | `Assets/Rare Cards/serpent_ascendant.png` | `b690c1bd2423926f067e51896dcecc95bdeeff4d` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `shisui` | `Assets/Rare Cards/shisui.png` | `e21acfd23ca43837f7a24b98c0c268eaa15ff6ae` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sannin_hinata` | `Assets/Sannin/sannin_hinata.png` | `8c85a0dab239ed979eede5d5299fe8db375ed23f` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sannin_jiraiya` | `Assets/Sannin/sannin_jiraiya.png` | `556210a731db6612f77deef901930ad4b605b7d3` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sannin_sakura` | `Assets/Sannin/sannin_sakura.png` | `b09a124047418bda88cc3341e69f62d6b05d9a2b` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sannin_shikamaru` | `Assets/Sannin/sannin_shikamaru.png` | `3a679e7311e520c8c890ff2ed30f88926a4db49b` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sannin_sumire` | `Assets/Sannin/sannin_sumire.png` | `2c6093cd2faa29526297852b2fc792fae565c011` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sannin_tenten` | `Assets/Sannin/sannin_tenten.png` | `be5c1d1cb045fea9dc26f88c8e139f8817514880` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sj_anko` | `Assets/Special Jonin/sj_anko.png` | `ffd06f4f01fd9201cc457bae7bfa22de8a172458` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sj_ebisu` | `Assets/Special Jonin/sj_ebisu.png` | `c0cd92df8b815d464ce35f73a117bb2345d9a0ba` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sj_genma` | `Assets/Special Jonin/sj_genma.png` | `1dc445eedac9e37f644b0aa57321019e79e7c692` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sj_ibiki` | `Assets/Special Jonin/sj_ibiki.png` | `c58151c5ed385d275b40037a0aaa96df936df655` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sj_kiba` | `Assets/Special Jonin/sj_kiba.png` | `2f5a76864e4f5e48cb3bd7b5d0c791cf17d30867` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sj_nono` | `Assets/Special Jonin/sj_nono.png` | `a801050653fef780ee97a585457cf1d7c1824ab3` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `baryon_mode` | `Assets/Transformations/baryon_mode.png` | `7285ff16b28c65052647f601d4e711833af6f78c` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `cipher_menma` | `Assets/Transformations/cipher_menma.png` | `5a2a73cbb3228c0548b777861c3625ff3a920749` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `cs_anko` | `Assets/Transformations/cs_anko.png` | `610463a12e33362eb64564aabbb261f647842922` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `cs_sasuke` | `Assets/Transformations/cs_sasuke.png` | `b86786be57e0e0bb57b0e135115c18a9c5d60fb8` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `curse_mark_hinata` | `Assets/Transformations/curse_mark_hinata.png` | `1098d2f504b05f9d14ddcad7a6338e4fb4e0ec84` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `echo_menma` | `Assets/Transformations/echo_menma.png` | `4f5d9f98a197e11633dbf740f1828ad0ecb96ba8` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `l2_anko` | `Assets/Transformations/l2_anko.png` | `216f44aba398ef0223e30d7582594a04fee87d45` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `mangekyo_sarada` | `Assets/Transformations/mangekyo_sarada.png` | `049bf7104454b474b5b2870ca6d769676ed24ab4` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `naruto_v1` | `Assets/Transformations/naruto_v1.png` | `3c44b20cbbb0ea62b1863105629745dbf71d517b` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `naruto_v2` | `Assets/Transformations/naruto_v2.png` | `887bd82b3de385b6276f74bf312d87011c24ef66` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `one_tailed_chakra_cloak_menma` | `Assets/Transformations/one_tailed_chakra_cloak_menma.png` | `9b5bd6e6c3516d18cd2c7eb7812b5090ae86653f` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `resonant_menma` | `Assets/Transformations/resonant_menma.png` | `efb7f893d3646864b1838aa7df9e44086f76a9c0` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sharingan_mikoto` | `Assets/Transformations/sharingan_mikoto.png` | `f376a3e98e7f6eb7fc231fe37001108bee02b06e` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `sharingan_sasuke` | `Assets/Transformations/sharingan_sasuke.png` | `6d48a37eb27bb1246e7620aef1682df101e2a3d9` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `coercive_cloak` | `Assets/Variant/coercive_cloak.png` | `0c6b18476cfc613188458bd21db0f2f96fdd4fb9` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `kurama_dominion` | `Assets/Variant/kurama_dominion.png` | `2de9843087b19f6e47eb7921e509ac3fd5cb9610` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `kurama_sovereign` | `Assets/Variant/kurama_sovereign.png` | `57e63be77070a8e929440cbed0231bd7a15d128e` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `six_tail_dominion` | `Assets/Variant/six_tail_dominion.png` | `7355008401b74a3134cc62c555f88740579c2791` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `stolen_chakra` | `Assets/Variant/stolen_chakra.png` | `3bbe857e57d7dc754410c7ba9932f65aabf5bf87` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |
| `three_tail_dominion` | `Assets/Variant/three_tail_dominion.png` | `56a09a6232783273e99e52bb604b881756faf621` | PENDING | PENDING | **PENDING** | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | NO | Exact source row verified; pixel audit pending. |

---

## 6A. Academy Student direct-pixel audit — 2026-09-18

**Source:** ten individual PNGs uploaded directly by Stephen after ZIP extraction proved unreliable. These images were visually inspected at full user-supplied resolution in the active workspace.

**Binary caution:** visual review is complete for these ten supplied images, but exact uploaded-file hash/dimension extraction and byte-for-byte match against the frozen GitHub blobs remain pending while the local binary execution backend is unavailable. Do not conflate that machine-data gap with visual-review status.

### Cohort verdict

- **0 / 10 currently reach Genin Menma's human-presence benchmark.**
- The strongest visual bases are **Academy Menma, Academy Kushina, Academy Izuno, and Academy Obito**, but each still falls short of Genin Menma's living-person dimensionality and at least two carry hard text-rule defects.
- The cohort's recurring weakness is **face construction**: environments, frames and effects are often premium, while faces remain smoother, more template/anime-painted and less materially dimensional than Genin Menma.
- The recurring hard-rule defect is **extra Japanese/kanji text** used as icon/signage on Iwabee, Academy Menma, Metal Lee and Obito without currently recorded exact authority.
- Academy Kurenai has a separate **age/representation fidelity** problem and should not be treated as a simple render-quality remaster.

| Asset | Identity / Age | Human Presence | Facial Staging | Pose / Composition | Materials / Lighting | Frame / Icon | Text | Menma | Verdict | Primary Action |
|---|---|---|---|---|---|---|---|---|---|---|
| Academy Hinata | GREEN | BELOW | Good restrained training focus | Strong | Strong environment; flatter face | Distinct hand/Byakugan language | GREEN | **BELOW** | REMASTER CANDIDATE | Lift facial anatomy, skin/eye/material dimensionality while preserving concept |
| Academy Iwabee | REVIEW age/build | NEAR | Direct determined stare | Excellent | Excellent rock/action depth | Strong, but kanji icon | **FAIL concern: `体`** | **NEAR** | HARD-RULE FAIL | Replace/authorize text-based icon; preserve action concept |
| Academy Izuno | GREEN | NEAR | Distinct playful forward engagement | Excellent | Strong | Distinct paw/rope/bell architecture | GREEN | **NEAR** | REMASTER CANDIDATE | Humanize face/eyes/skin without losing personality |
| Academy Kakashi | REVIEW exact Academy age | NEAR | Focused side-forward combat read | Strong | Strong night depth | Frame-family overlap with Kurenai | GREEN | **NEAR** | REMASTER CANDIDATE | More human facial rendering; differentiate frame architecture further |
| Academy Kurenai | **FAIL / age reads too mature** | BELOW | Elegant but mature/glamourized | Strong illustration, wrong stage read | Strong | Frame-family overlap with Kakashi | GREEN | **BELOW** | **HARD-RULE FAIL** | Re-author Academy-age representation first, then benchmark rendering |
| Academy Kushina | GREEN | NEAR | Aggressive frontal drive | Excellent | Excellent dirt/water/chakra/lighting | Highly specific red/maple frame | GREEN | **NEAR** | REMASTER CANDIDATE | Preserve composition; uplift face/skin/eyes to Menma human presence |
| Academy Menma | GREEN | NEAR | Excellent predatory forward stare | Excellent | Excellent black/red depth | Highly specific fox architecture | **FAIL: visible `狐` tags** | **NEAR** | **HARD-RULE FAIL** | Remove unauthorized Japanese text; then facial/material uplift toward Genin Menma |
| Academy Metal Lee | GREEN | BELOW | Distinct frontal training intensity | Strong | Strong | Good green training frame; kanji icon | **FAIL concern: `体`** | **BELOW** | **HARD-RULE FAIL** | Humanize facial proportions/eyes and replace/authorize text icon |
| Academy Mirai | GREEN | BELOW-to-NEAR | Distinct lateral targeting/action | Strong | Good | Distinct autumn training frame | GREEN | **NEAR** | REMASTER CANDIDATE | Improve facial plane depth, eye realism, skin/material response |
| Academy Obito | GREEN | NEAR | Strong forward reach and determined squint | Excellent | Excellent sunset depth | Distinct earth/gold frame but text glyph | **FAIL: `土` + background Japanese signage** | **NEAR** | **HARD-RULE FAIL** | Remove unauthorized text; preserve pose/environment; uplift face to Menma |

### Menma-comparison note

The decisive gap is not raw detail density. Several Academy cards have **more visual effects, more frame ornament, or more environmental spectacle** than Genin Menma. They still fall short because Genin Menma's face, anatomy, skin/material response, camera presence and expression combine into a more believable **specific person** rather than a polished anime illustration.

That distinction is now a durable audit criterion.

---

## 7. Battle/UI portrait inventory — repository cross-reference at 12ec215

### Active portrait authority consumed

Current durable Assets authority states:

- live Battle/UI portrait projection is **116/116**;
- `collectibleCard` and `uiPortrait` remain separate authorities;
- approved production portrait root is `Portraits/`;
- the corrected physical portrait tree does **not** authorize filename-derived remaps;
- Character Creation's 2026-09-07 representation audit found **NO FURTHER REMAP REQUIRED FOR ALPHA**;
- exact active mappings remain those already ratified by Assets/Registry/runtime authority;
- pixel/dimension/content QA is separate from mapping authority.

Therefore this audit must never convert a visual-quality finding into an identity/path remap by convenience. Repair or supersede the exact approved portrait through Assets authority if needed.


**Repository cross-reference count: 185 PNGs under `Portraits/`.**

This table is a path/blob cross-reference for matching the newly supplied portrait ZIP binaries. A repo path row is **not** automatically a production-manifest claim. Final Battle portrait authority still comes from the current explicit UI portrait projection/Registry authority.

| Asset ID | Source Path | Blob SHA | Dimensions | Portrait Contract | Card ↔ Portrait Fidelity | Audit Verdict | Golden | Notes / Required Action |
|---|---|---|---|---|---|---|---|---|
| `academy_student_hinata` | `Portraits/Academy Student/academy_student_hinata.png` | `33d96887e7095e0c4617201b336706d2ea4665df` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `academy_student_iwabe` | `Portraits/Academy Student/academy_student_iwabe.png` | `3ac0673c500d93f225b33b82a62e5d1d91b35c51` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `academy_student_izuno` | `Portraits/Academy Student/academy_student_izuno.png` | `956810d27d1a292866b4357c92610a752e164a46` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `academy_student_kakashi` | `Portraits/Academy Student/academy_student_kakashi.png` | `1af63a19b7467bf800385becda36765066beed6b` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `academy_student_kurenai` | `Portraits/Academy Student/academy_student_kurenai.png` | `27f74363381d333156a6958ac1489a39a9bb9f31` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `academy_student_kushina` | `Portraits/Academy Student/academy_student_kushina.png` | `9fa6336982599e09d7f36ac4e5dbcc4d0236703b` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `academy_student_menma` | `Portraits/Academy Student/academy_student_menma.png` | `1d5ddbfb0472cfcf20df1a17108b49d2d4b29e43` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `academy_student_metal` | `Portraits/Academy Student/academy_student_metal.png` | `cfbd87c523d534645864d835c36c18da15dff5ce` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `academy_student_mirai` | `Portraits/Academy Student/academy_student_mirai.png` | `843f00f9346ce3d50466851eca4cd1470c693b74` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `academy_student_obito` | `Portraits/Academy Student/academy_student_obito.png` | `952f201d4691517ef93ec3f038c48b69e326ba86` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `akatsuki_deva` | `Portraits/Akatsuki/akatsuki_deva.png` | `a67709656e4c1324c6999c5f48063bd2e5eef76d` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `akatsuki_itachi` | `Portraits/Akatsuki/akatsuki_itachi.png` | `b6779252a2428029dc97b21e55df7916cf7b6572` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `akatsuki_kakuzu` | `Portraits/Akatsuki/akatsuki_kakuzu.png` | `39a9d92151b4f54d4c4c35659438af163839a0e9` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `akatsuki_naruto` | `Portraits/Akatsuki/akatsuki_naruto.png` | `f28122e0589e68fa7079e9fbdbd319433a701a5d` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `akatsuki_sasuke` | `Portraits/Akatsuki/akatsuki_sasuke.png` | `06b94e452494b7cc7c4b10b5b94e2ac5f5ae3413` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `anbu_leader_ino` | `Portraits/Anbu/anbu_leader_ino.png` | `83a6ecfbf8c1552f2b047db92304e74691998cbd` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `anbu_menma` | `Portraits/Anbu/anbu_menma.png` | `a126db44f2467a8f0d0349c79420f20b87a27feb` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `anbu_naruto` | `Portraits/Anbu/anbu_naruto.png` | `fbaaec753058ac4b6812246167fc9e9660f6bd22` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `anbu_sasuke` | `Portraits/Anbu/anbu_sasuke.png` | `8b5c14563a7f16e6fb70c767d3df00e30eb8b1d6` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `advanced_optimisation_ren` | `Portraits/Boss Cards/advanced_optimisation_ren.png` | `61a4f16736bbb1d63b8101a25e933a7e17c5c241` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `black_madara` | `Portraits/Boss Cards/black_madara.png` | `bfa299ac2ed7927d96979ae053c67f14180c5a18` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `conditioned_echo_ren` | `Portraits/Boss Cards/conditioned_echo_ren.png` | `7c5d2043b50e7a70ecaa0a4425d46042e66ce407` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `failed_god_madara` | `Portraits/Boss Cards/failed_god_madara.png` | `8180254ca5449de3e5c7734fc1234edea138ffa7` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `fallen_hokage` | `Portraits/Boss Cards/fallen_hokage.png` | `1d4de52b059477f1479f7aa4c81d6d7e1603aed4` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `shadow_of_indra` | `Portraits/Boss Cards/shadow_of_indra.png` | `3885af8ef115fb5597acfcce28204019bbe162fa` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `terminal_optimisation_ren` | `Portraits/Boss Cards/terminal_optimisation_ren.png` | `76f4897d16842f5bfb5e27c996dbc435130ba282` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `the_sixth_shadow` | `Portraits/Boss Cards/the_sixth_shadow.png` | `d824a29bca75190755f8eddd0770c3cb8d1d770c` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `undying_madara` | `Portraits/Boss Cards/undying_madara.png` | `22198457caa92b83356a3b418614258da090607f` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `chunin_boruto` | `Portraits/Chunin/chunin_boruto.png` | `7a405fd98a5072ea13265c2bca15986e6efa5999` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `chunin_fugaku` | `Portraits/Chunin/chunin_fugaku.png` | `08a5fde51dca3dd1a72b4d8bc36cb49d7db43235` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `chunin_iruka` | `Portraits/Chunin/chunin_iruka.png` | `c97b850d70804647c5f2a31ea7350d4b53e0b243` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `chunin_Itama` | `Portraits/Chunin/chunin_Itama.png` | `dfdcc8e95799ba1fdb434a3f3aecf252dda0e0e6` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `chunin_jiraiya` | `Portraits/Chunin/chunin_jiraiya.png` | `b03716d14601b80fd80680e6d23326e41ea0c762` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `chunin_mitsuki` | `Portraits/Chunin/chunin_mitsuki.png` | `3177d51d2d0ead444ea3374fd8336dca4a9298a2` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `chunin_shikadai` | `Portraits/Chunin/chunin_shikadai.png` | `6a601c8db432fb4b7b638e2bbe75d11ea0e5698b` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `chunin_shinki` | `Portraits/Chunin/chunin_shinki.png` | `4d0d22ee407f4451827195cf863502e8aad7ec1c` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `iron_maiden` | `Portraits/Constructs/iron_maiden.png` | `a23698347de739dbb7a109f96fb0edb09c8a41b6` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `triple_rashomon` | `Portraits/Constructs/triple_rashomon.png` | `07543d0c820709fe6c5ec7d2d61542b9cca57d0b` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `koto_crow` | `Portraits/Familiars/koto_crow.png` | `5bc173d493d4ec59c079b71f473865787f364beb` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `breakout_kurama` | `Portraits/Forced Manifestations/breakout_kurama.png` | `3dedcecd6910eed84991695ddf02724f359de746` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_boruto` | `Portraits/Genin/genin_boruto.png` | `a4d005107d448055d2797c6825c63bf99386b295` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_chocho` | `Portraits/Genin/genin_chocho.png` | `a3432eaf89797f80c55b595d01b7aca0b870dd75` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_choza` | `Portraits/Genin/genin_choza.png` | `47ea9e994f3a44b4666d77511c0ef17ae6d77104` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_dan` | `Portraits/Genin/genin_dan.png` | `2526f9ed781febce35679c719dd4e38744ead6b7` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_danzo` | `Portraits/Genin/genin_danzo.png` | `5d70d6eb4a1ab2c4cb168c92fc766075fe0622c0` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_duy` | `Portraits/Genin/genin_duy.png` | `85b10cb4a34f2446eaefa3fa85c931d89aa1136b` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_guy` | `Portraits/Genin/genin_guy.png` | `0f3369a4501ee1046fc8d9dfa9ecb61a34ba50e6` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_hashirama` | `Portraits/Genin/genin_hashirama.png` | `f2078d0bc35edcf70c521e475424346884086c7d` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_hayate` | `Portraits/Genin/genin_hayate.png` | `ab82979020a5ffbb6f56ec44ba1e89833ed02bad` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_hiashi` | `Portraits/Genin/genin_hiashi.png` | `6f3d025c9ca8a7d37c681193d94834f3915acf46` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_himawari` | `Portraits/Genin/genin_himawari.png` | `bc61c119a38d9364e68876bec4af2ed9fff6ec77` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_hinata` | `Portraits/Genin/genin_hinata.png` | `bbb110ebf9b2c608c4d308fefe043faa2d366dd2` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_hiruzen` | `Portraits/Genin/genin_hiruzen.png` | `7e3804ddd9552faedfc86b8d6b18364d21448f10` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_hoki` | `Portraits/Genin/genin_hoki.png` | `5813b46f4333685c99b72228e9068e3346b21f86` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_inoichi` | `Portraits/Genin/genin_inoichi.png` | `c6ec13a5d659b7f80c73cf0aa42478fad1517181` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_kagami` | `Portraits/Genin/genin_kagami.png` | `8ce6f94ec3b2244b63212c3be0bec4eec084e999` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_karin` | `Portraits/Genin/genin_karin.png` | `cdb62747bfea6e19ddf6e9d8e00aa1644507bf0d` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_kosuke` | `Portraits/Genin/genin_kosuke.png` | `a6e3934d7fd0c993e07d74d646ce0fcc13efbf1b` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_menma` | `Portraits/Genin/genin_menma.png` | `394102047ead3fc2582fb6cce8fb1c373ba9990f` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_mikoto` | `Portraits/Genin/genin_mikoto.png` | `3c0f627bda2f06cc84b3828eb17c582822da1ec6` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_mito` | `Portraits/Genin/genin_mito.png` | `aa1edcf23716e0a1f230ded7582e964ee02b2a3d` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_mitsuki` | `Portraits/Genin/genin_mitsuki.png` | `fe69810fcc05e1855d815b10346ea322d0bcfd01` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_mukai` | `Portraits/Genin/genin_mukai.png` | `070b647171688591c0a47f8d8c872728d0f475b5` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_naruto` | `Portraits/Genin/genin_naruto.png` | `20c3704cab7d5768a617f009c0dee4f8b9933dbe` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_nawaki` | `Portraits/Genin/genin_nawaki.png` | `15dd831e92e6942a1ba913178c4920b82124de2b` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_orochimaru` | `Portraits/Genin/genin_orochimaru.png` | `0eeea8f5cdc8727105bfb3e42fb56588d339f52c` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_rin` | `Portraits/Genin/genin_rin.png` | `ae16970451c398350ba241ac169ab658b80c759b` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_sai` | `Portraits/Genin/genin_sai.png` | `6b7611602b995f2a4990591c15d8a78c94eaf28c` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_sakumo` | `Portraits/Genin/genin_sakumo.png` | `085767df4530e1997083340e42021e880cf0f289` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_sarada` | `Portraits/Genin/genin_sarada.png` | `9317bb596cf100ba91b860ab832548631f836ee4` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_sasuke` | `Portraits/Genin/genin_sasuke.png` | `7c69706119d2e99ae5f4caac05d2ba26d53334e3` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `genin_shibi` | `Portraits/Genin/genin_shibi.png` | `775c724d243402869b8483a2051af12db1d18706` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_shizune` | `Portraits/Genin/genin_shizune.png` | `ca1f580b26fd3a5a334e6fc6509196d150e4f7f6` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_torifu` | `Portraits/Genin/genin_torifu.png` | `a1dc942cbc87aa25db1cb9ebb444b5cf409a333f` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_tsume` | `Portraits/Genin/genin_tsume.png` | `c34972881256a724632f2edaf4563e97d5230ad9` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_tsunade` | `Portraits/Genin/genin_tsunade.png` | `2b2196a1c927e58ae44b350220fabb91998c650f` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_yamato` | `Portraits/Genin/genin_yamato.png` | `5d53b75f3195be9964c6924327f72a0c3edcedd1` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `genin_yugao` | `Portraits/Genin/genin_yugao.png` | `66062489300c951270922f3fa08bc9f45f28cfdc` | 1024x1024 (proven by #74 normalization gate) | PHYSICAL GREEN | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Physical 1024x1024 gate proven GREEN at normalization commit 21b8952... and historically unchanged through supplied card snapshot; visual purpose/fidelity audit remains separate. |
| `hosted_entity_black_zetsu` | `Portraits/Hosted Entity/hosted_entity_black_zetsu.png` | `e5044cfe23cef984ceffbc9bfe9dda0504c8874b` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `hosted_entity_reborn_kurama` | `Portraits/Hosted Entity/hosted_entity_reborn_kurama.png` | `041e71004e905b8c135276688281141fb072b9fc` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jsakura_ava` | `Portraits/Jinchuriki/jsakura_ava.png` | `deb2ab54e3929a4c7c87cf708dda275aad195e44` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jsakura_mani` | `Portraits/Jinchuriki/jsakura_mani.png` | `254fda2ece772dfa2873166ccab2d9957eb99101` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jsakura_res` | `Portraits/Jinchuriki/jsakura_res.png` | `739ad5f75593d5dfb60a69a126c7afdc093d6da7` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jshika_ava_yin` | `Portraits/Jinchuriki/jshika_ava_yin.png` | `a82402ca1c1a2c3dd15196a7dac03df93aa4d60c` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jshika_ava` | `Portraits/Jinchuriki/jshika_ava.png` | `d3a47b5ff37a07f7f1eac1f6787d7484adc1641d` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jshika_mani_yin` | `Portraits/Jinchuriki/jshika_mani_yin.png` | `4e77767e121df4e99ee409b6e9db88fd7395e7c5` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jshika_mani` | `Portraits/Jinchuriki/jshika_mani.png` | `4b67cfca745297732fb3e0c23bf1867a5366ac49` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jshika_res_yin` | `Portraits/Jinchuriki/jshika_res_yin.png` | `93c21fd259a31cf99dab5e5c0c6a484706c2510f` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jshika_res` | `Portraits/Jinchuriki/jshika_res.png` | `d5561f082bd86ef1af7d889dc3a73e7b52a04592` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jtobi_ava` | `Portraits/Jinchuriki/jtobi_ava.png` | `3891ea75cf4a7864f59f1c37b53ad13105c332af` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jtobi_mani` | `Portraits/Jinchuriki/jtobi_mani.png` | `d338d50bdd7c02d4ccf3ea572a0cbef8883805c9` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jtobi_res` | `Portraits/Jinchuriki/jtobi_res.png` | `ba45d6a5f6304f3d180cbee50b9e9142b3858d1f` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `rin_avatar` | `Portraits/Jinchuriki/rin_avatar.png` | `158cbd7e15ec9ed3d8d250fe1c788101234e2797` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `rin_manifestation` | `Portraits/Jinchuriki/rin_manifestation.png` | `1ace4107baea9b212f19795ac83d6b09d13f0045` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `rin_resonance` | `Portraits/Jinchuriki/rin_resonance.png` | `f352e78ce49543c49da59f4181bd05b13cbfec62` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jonin_hanabi` | `Portraits/Jonin/jonin_hanabi.png` | `3bdbf255892654e93fa62ab1f4ef5a5f81d7ead9` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jonin_inojin` | `Portraits/Jonin/jonin_inojin.png` | `ea34074bc6836f52405bb895ffaaa166ecebaae7` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jonin_kono` | `Portraits/Jonin/jonin_kono.png` | `ae546aae9b03aa254f7a26274f53fe5fbf527a40` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jonin_kushina` | `Portraits/Jonin/jonin_kushina.png` | `72636679da129920cd44248b619274cdd1d9a570` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jonin_sasuke` | `Portraits/Jonin/jonin_sasuke.png` | `6ebf5268ecfd39313973bdf73ed3ac1b61200a54` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `jonin_shino` | `Portraits/Jonin/jonin_shino.png` | `416b77ba6178f3eb182c8135ee94beee3ec9c4ce` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kage_itachi` | `Portraits/Kage/kage_itachi.png` | `46563e1af2e1963cac29ad381e8e8d906b0619ea` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kage_kaka` | `Portraits/Kage/kage_kaka.png` | `59384c139715369bd9f74102c6391aaf7acf6ec3` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kage_madara` | `Portraits/Kage/kage_madara.png` | `0298921db72cd20d740aa262e47fff31e83e9358` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kage_menma` | `Portraits/Kage/kage_menma.png` | `d09b2056100247cc1b74d9a87d3b1e3ed252545b` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kage_minato` | `Portraits/Kage/kage_minato.png` | `7c6a3a2738124d8cad28abc87c1bc7a06ecdb342` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kage_naruto` | `Portraits/Kage/kage_naruto.png` | `5787146b797009cdc43fb8746068e52583034737` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kage_sarada` | `Portraits/Kage/kage_sarada.png` | `04e5ff22d419b1f4749bf965b1a5b6c98b85444e` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `better_host_ren` | `Portraits/Others/better_host_ren.png` | `1d689ab2dfe2e39c92b15a7b7c0220db0cb3749b` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `female_operator_unleashed` | `Portraits/Others/female_operator_unleashed.png` | `5f09378024b65a650c161515ef27bab7bd43fdd6` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `female_operator` | `Portraits/Others/female_operator.png` | `b661f8490a866cc997641327bbf39729a3205c01` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kaien_shigure` | `Portraits/Others/kaien_shigure.png` | `5c8059c2e909c0ee32628be52e2edb054f169e32` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `mizue_kagawa` | `Portraits/Others/mizue_kagawa.png` | `6427494562dd4fee8008128b183a17dfafbe26a5` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `mizukage_aide_obito` | `Portraits/Others/mizukage_aide_obito.png` | `1b9413d69bf30d568e4b869f9b9cae317e3f54e5` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `reika` | `Portraits/Others/reika.png` | `1a74855e42b1824585d5e44f5856ebc0c7dc022d` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `shiori_kuroda` | `Portraits/Others/shiori_kuroda.png` | `1376df44974041a626e2bb65f0fc825d5701f671` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `unknown_man` | `Portraits/Others/unknown_man.png` | `2241356133014508be7251bdab35282ad44d581e` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `unknown_root_operative` | `Portraits/Others/unknown_root_operative.png` | `ba1e2b267c07e760e9cdc763c9ac56bb020cd915` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `black_sun_himawari` | `Portraits/Rare Cards/black_sun_himawari.png` | `98e877de57e20a25a77d2f2344e44c573fa631e1` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `dark_naruto_kcm` | `Portraits/Rare Cards/dark_naruto_kcm.png` | `860ed8facf8847f6f47be935a45560928e37496a` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kurama_resonance_himawari` | `Portraits/Rare Cards/kurama_resonance_himawari.png` | `83e8118bbca9f228ecf423ee5c9361fc715a3a1b` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `serpent_ascended` | `Portraits/Rare Cards/serpent_ascended.png` | `35acf7ecb0137ba3e07d85bc098859dc6bcaa4a0` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `village_guardian_shisui` | `Portraits/Rare Cards/village_guardian_shisui.png` | `17dabce4fae1c9aaaf9032b12221a0df11a59810` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sannin_hinata` | `Portraits/Sannin/sannin_hinata.png` | `b9ff0640d1f1e6a1fabf5eaefb933292f716a153` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sannin_sakura` | `Portraits/Sannin/sannin_sakura.png` | `b75cad4c9d656e00455659f9db24ec294d66798b` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sannin_shika` | `Portraits/Sannin/sannin_shika.png` | `48531e9cc40eb37c381e3ac202be284de1dbbbaf` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sannin_sumire` | `Portraits/Sannin/sannin_sumire.png` | `ccffd8d34ae1d106dcffad8251e9035a67136668` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sannin_tenten` | `Portraits/Sannin/sannin_tenten.png` | `a0bc724d0779c699dad8dab11987ad7a893ff60f` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sj_anko` | `Portraits/Special Jonin/sj_anko.png` | `6015ebceb8735900872fd0849d3b4806d880ce5d` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sj_ebisu` | `Portraits/Special Jonin/sj_ebisu.png` | `5e17cb83981e4a68767306599c9c77d79fdfa559` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sj_genma` | `Portraits/Special Jonin/sj_genma.png` | `0c754e73cbd48db94ad8ccbdf84adc9b3bbe1aa6` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sj_ibiki` | `Portraits/Special Jonin/sj_ibiki.png` | `9f2392605f973f44f6d4171a8e5f3ed25dc43f05` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sj_kiba` | `Portraits/Special Jonin/sj_kiba.png` | `ff84bb2f585c2c900fdaa342d97d29fd4a99bc73` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sj_nono` | `Portraits/Special Jonin/sj_nono.png` | `87d5d2b2309176ca8bf77b809a415218e72542d0` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `baku` | `Portraits/Summons/baku.png` | `fa1bc2fd3509ba8ef6d78bfdf7d830e2263bd9ee` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `de_baku` | `Portraits/Summons/de_baku.png` | `fa1bc2fd3509ba8ef6d78bfdf7d830e2263bd9ee` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `gamakichi` | `Portraits/Summons/gamakichi.png` | `7f775a4f3cd1afc3528f728ac3e6943ff22534bb` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `geratora` | `Portraits/Summons/geratora.png` | `d10c15f482c87c2109661a81d760d3e4b3def00a` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `ibuse` | `Portraits/Summons/ibuse.png` | `98ea09f3c6f4fbf6a8c0131dc0d4c985b7ac8849` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kamatari` | `Portraits/Summons/kamatari.png` | `7fc95c2fa09d955846136588acd3cf845f8f73d2` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `key_gero` | `Portraits/Summons/key_gero.png` | `d10c15f482c87c2109661a81d760d3e4b3def00a` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `koto_crow` | `Portraits/Summons/koto_crow.png` | `5bc173d493d4ec59c079b71f473865787f364beb` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kurama_complete` | `Portraits/Summons/kurama_complete.png` | `7b1074282c3d633393759416f721fd67421da662` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kurama_yang` | `Portraits/Summons/kurama_yang.png` | `4c6c8085397b2f5d140d1712f7ae93ab82e76b5d` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kurama_yin` | `Portraits/Summons/kurama_yin.png` | `79ffccea3090d64d10bff216ad8fcf61c9230a53` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `menma_kurama` | `Portraits/Summons/menma_kurama.png` | `15c846b3e1ade44f6b03319cd3e5c3dff7470841` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `mirage_clam` | `Portraits/Summons/mirage_clam.png` | `27d14c9d912f79174c4b66e2cc1214be5f3d8fe5` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `mk_enma` | `Portraits/Summons/mk_enma.png` | `1ebdc12bd0afdd2a823a68323e5f5d2a0d95d452` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `monkey_king_enma` | `Portraits/Summons/monkey_king_enma.png` | `1ebdc12bd0afdd2a823a68323e5f5d2a0d95d452` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `nue` | `Portraits/Summons/nue.png` | `f80c640ae6a5afdbaf6f74221107ba326066a948` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `pakkun` | `Portraits/Summons/pakkun.png` | `bf63a775d4641ea4aad6d1f32a1447fdf57ea7f5` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `snake` | `Portraits/Summons/snake.png` | `2a5515a8141a5b99aa53902a183b98ba2d211238` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `wr_kamatari` | `Portraits/Summons/wr_kamatari.png` | `7fc95c2fa09d955846136588acd3cf845f8f73d2` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kurama_complete` | `Portraits/Tailed Beasts/kurama_complete.png` | `7b1074282c3d633393759416f721fd67421da662` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `menma_kurama` | `Portraits/Tailed Beasts/menma_kurama.png` | `15c846b3e1ade44f6b03319cd3e5c3dff7470841` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `menma_nine_tails` | `Portraits/Tailed Beasts/menma_nine_tails.png` | `9e97d70bdb96712fdcd5ef3d01cef86b715406d2` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `naruto_nine_tails` | `Portraits/Tailed Beasts/naruto_nine_tails.png` | `efba60df27603a942411dee90f33c2087f24e0ac` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `nine_tails` | `Portraits/Tailed Beasts/nine_tails.png` | `f1982471555bf8894d4c117e0cc7a54673257a4e` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `three_tails_isobu` | `Portraits/Tailed Beasts/three_tails_isobu.png` | `11da28d3353a0c9218a29cf5c647a19e896ed49b` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `three_tails` | `Portraits/Tailed Beasts/three_tails.png` | `3bb8847f8bf2456d61b8f42070936a085855a764` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `yang_kurama` | `Portraits/Tailed Beasts/yang_kurama.png` | `4c6c8085397b2f5d140d1712f7ae93ab82e76b5d` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `yin_kurama` | `Portraits/Tailed Beasts/yin_kurama.png` | `79ffccea3090d64d10bff216ad8fcf61c9230a53` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `bayron_mode` | `Portraits/Transformation/bayron_mode.png` | `eb3598c90ea549b4aec09834d7024d72980947be` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `cipher_menma` | `Portraits/Transformation/cipher_menma.png` | `062c752f62242b5aa6b0d1bcd0288aa6c46919a1` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `cs1_anko` | `Portraits/Transformation/cs1_anko.png` | `afc33af2bb7864981ff669ce45240cd6b125fe9d` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `cs1_hinata` | `Portraits/Transformation/cs1_hinata.png` | `2bbd46f7ee1c959452e195ac504fe1276c497741` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `cs1_sasuke` | `Portraits/Transformation/cs1_sasuke.png` | `e942ea92a4b38d3fb7558d0842e0dbf2df8adddb` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `cs2_anko` | `Portraits/Transformation/cs2_anko.png` | `53ef2d498d54379f5fd9bac09b7ba580f5181d27` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `curse_mark_hinata` | `Portraits/Transformation/curse_mark_hinata.png` | `e94aecf9dfb950a5bb221771e1d3cec2aaf6ba26` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `echo_menma` | `Portraits/Transformation/echo_menma.png` | `9f2aa761bfdccd28120a8313c2719cda3100ec3e` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `ms_sarada` | `Portraits/Transformation/ms_sarada.png` | `73b93a3ad78a9d9c77f46eaacc4318c155bf5e8e` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `naruto_v1` | `Portraits/Transformation/naruto_v1.png` | `684435a5db70b7417df53bddca0e7643b6cbd17b` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `naruto_v2` | `Portraits/Transformation/naruto_v2.png` | `e0de4faea70c8cff7b19e092cf0acdc4f636dc93` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `one_tailed_chakra_cloak_menma` | `Portraits/Transformation/one_tailed_chakra_cloak_menma.png` | `f5142c15c70cc51adc7f433ea3c2989e8520fc5e` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `resonant_menma` | `Portraits/Transformation/resonant_menma.png` | `1a5eed73f914885b10a8f41d13915d1a538d4dd0` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sharingan_mikoto` | `Portraits/Transformation/sharingan_mikoto.png` | `56daceb8cf97735f52c9dcfe8d820a09f0d47615` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `sharingan_sasuke` | `Portraits/Transformation/sharingan_sasuke.png` | `a177b4604c0a3286188803a9cdf8a650134eca20` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `coercive_cloak` | `Portraits/Variants/coercive_cloak.png` | `9126d008c86be5f407f5ab209d9bd9f5ae910e11` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `dominion_six_tails` | `Portraits/Variants/dominion_six_tails.png` | `277c87ba95c96c01e2a802085c032cd3827287fd` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `dominion_three_tails` | `Portraits/Variants/dominion_three_tails.png` | `e9b506d82b177e6c3a1340bed31ab37fd1df4f07` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kurama_dominion` | `Portraits/Variants/kurama_dominion.png` | `af6bd242338350c3946d995ca932e0bb2d9d35e4` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `kurama_sovreign` | `Portraits/Variants/kurama_sovreign.png` | `092699f83c6622ec47670548bd594a0a32b53584` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `six_tail_dominion` | `Portraits/Variants/six_tail_dominion.png` | `9c58d88d5109366ed9d1ea49619f7f727cc5cd33` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `stolen_chakra` | `Portraits/Variants/stolen_chakra.png` | `7293afb077810fc817618daf43c6505a47109ee6` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |
| `three_tail_dominion` | `Portraits/Variants/three_tail_dominion.png` | `7c5c4099f51cf097d267db5bf17cf95e48dff621` | PENDING | PENDING | PENDING | **VISUAL REVIEW REQUIRED / SOURCE-ONLY VERIFIED** | N/A | Repo cross-reference only; match against supplied portrait bundle before visual verdict. |

---

## 8. Visual-review discipline

### Existing cards

The audit may identify an existing card as BELOW/NEAR/MEETS/EXCEEDS Menma. This classification is descriptive; it does not itself authorize regeneration.

### New cards / upgrades

A future new or upgraded card must be compared against the current benchmark before acceptance.

**Stephen's acceptance gate:** **MEETS MENMA or EXCEEDS MENMA** is eligible for final acceptance.

If it EXCEEDS Menma, issue a **🚨 GOLDEN ALERT** and preserve the exact version for benchmark discussion.

### Golden Alert

`EXCEEDS` => `Golden Alert = YES` => explicit **🚨 GOLDEN ALERT** in chat => Stephen benchmark discussion.

No automatic benchmark promotion.

---

## 9. Update discipline

- This ledger is append/update authority for visual audit findings.
- Never downgrade an exact previously-approved binary based only on filename archaeology.
- Record exact blob/version whenever possible.
- Separate physical normalization from visual redesign.
- Separate semantic/identity failures from aesthetic benchmark debt.
- Do not infer mechanics, PL, ownership, acquisition or runtime truth from art.
- No image generation from this ledger alone; exact `generate now` remains mandatory.

