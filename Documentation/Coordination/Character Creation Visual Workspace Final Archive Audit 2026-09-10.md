# Shinobi Chronicles — Character Creation / Visuals Final Pre-Alpha Archive Audit

**Date:** 2026-09-10  
**Owner:** Character Creation / Visuals  
**Baseline inspected:** current `main` at `4d1c90c17f15acf1197babc6b1383c342b1268fa` plus accessible workspace archaeology and current open GitHub handoffs.  
**Purpose:** final archaeological recovery before retirement/archive of the long-running Character Creation / Visuals workspace.

Production authority order preserved throughout:

`current GitHub source/authority > durable CE/SC documents > current specialist decisions > Project memory > legacy chat archaeology`

This audit does **not** promote visual discussion into mechanics, Registry admission, acquisition, progression, Battle semantics, save/load truth, or Story canon merely because art was generated.

---

# Executive verdict

The workspace produced a large amount of production art and several durable semantic lessons, but most of the dangerous historical uncertainty has already been reconciled by current live authority.

The most important current conclusions are:

1. **The old 97-card/identity snapshot is historical asset genealogy only.** Current production authority is the final **98 Characters + 18 Entities = 116** gate.
2. **Production `uiPortrait` masters are 1024×1024.** The older 512×512 preference is superseded for Alpha masters.
3. **The live-116 representation mapping is closed.** Character Creation already returned **NO FURTHER REMAP REQUIRED FOR ALPHA**. Coding must not infer mappings from folders, filenames, or card art.
4. **Physical live-116 portrait QA is still a wider Alpha blocker, but it is already owned by UI / Assets issue #45, followed by Coding issue #16.** Do not duplicate that traffic.
5. **Issue #27 is now stale as an open Character Creation blocker.** Its requested Menma/Echo/Ren/M11 visual representation package was subsequently designed, generated, committed, and semantically ratified elsewhere. It should close with evidence rather than remain as phantom traffic.
6. **Issue #33 is no longer a 41-portrait generation backlog.** The production wave was substantially completed and committed, but the current `Enemies/` versus `Enemies Portraits/` trees expose a small finite reconciliation tail: one apparently missing `fuinjutsu_smuggler` portrait and two filename/key drifts (`beast_handler_rogue` vs `beast_hunter_rogue`, `trap_network_controller` vs `trap_network_specialist`). That exact tail should remain queued and be resolved without Coding inference.
7. The hard visual doctrines recovered from this workspace — **location ≠ affiliation**, **collectibleCard ≠ uiPortrait**, **visual approval ≠ mechanics**, **observer-safe presentation must not reveal hidden allegiance**, **representation state ≠ persistent person**, **surgical edit ≠ redesign**, and **source-card fidelity is provenance, not loose inspiration** — should survive archive. This audit records them durably.
8. No new Chronicle Engine subsystem is required from this workspace. The reusable CE value is mostly reinforcement of existing identity/provenance/observer-knowledge/composite-history doctrine.

---

# Status legend

For each recovered item:

- **DISCUSSION** — explored only; not binding by itself.
- **DESIGN CLOSED** — specialist visual/semantic decision is closed.
- **DURABLE AUTHORITY** — recorded in current GitHub source/docs/issues/accepted assets.
- **IMPLEMENTED** — projected into current source/runtime/production tree where applicable.
- **RUNTIME VALIDATED** — exercised in runtime/browser/consumer rather than merely committed.
- **GOLDEN / REGRESSION GREEN** — explicit regression/Golden proof exists.

A visual asset being present in GitHub can satisfy neither Registry admission nor runtime validation by itself.

---

# 1. Character Creation / visual production authority

## 1.1 Premium collectible-card standard

**Recovered rule:** premium SC collectible cards use **980×1400**, ratio **0.70:1**, premium cinematic fantasy-anime rendering, strong character readability, unique frame, unique top-left icon, unique pose/expression/background, and requested nameplate-only presentation unless a specific card contract says otherwise.

The workspace repeatedly strengthened this rule after low-value repetition: a new card must not merely reuse the same bottom gem, frame ornaments, pose, lighting, or generic shinobi silhouette with a recolour.

**Quality benchmark:** Kage Madara-level finish became the practical minimum benchmark for premium cards.

Status:

- DISCUSSION: historical iterations exist.
- DESIGN CLOSED: **YES**.
- DURABLE AUTHORITY: **YES — recorded here and reflected by current asset corpus**.
- IMPLEMENTED: **YES — many production assets use it**.
- RUNTIME VALIDATED: **N/A as a pure art-layout rule unless a consumer checks dimensions/projection**.
- GOLDEN / REGRESSION GREEN: **NO general collectible-card visual Golden identified by this audit**.

## 1.2 Battle / UI portrait contract

**Current Alpha contract:**

- **1024×1024** master;
- square;
- frameless;
- no card frame;
- no nameplate/text;
- no decorative top-left card icon;
- purpose-composed for Battle/UI readability;
- exact represented character/state fidelity;
- approved collectible card may be used as representation reference, **not as a crop source**.

Historical 512×512 guidance is **SUPERSEDED for the Alpha master**. A future derived 512 asset may exist only under a separate explicit optimisation/consumer contract and may not replace the 1024 master authority.

Status:

- DESIGN CLOSED: **YES**.
- DURABLE AUTHORITY: **YES** — live portrait authority/manifest and issues #12/#16/#45.
- IMPLEMENTED: **YES** — manifest-backed runtime resolver and large portrait tree exist.
- RUNTIME VALIDATED: **PARTIAL / downstream proof still open**.
- GOLDEN / REGRESSION GREEN: **NO final 116-wide Green yet while #45/#16 remain open**.

## 1.3 Representation provenance rule

The enemy portrait production wave exposed a failure mode: generating from a filename or role archetype caused wrong people, repeated silhouettes, wrong masks/equipment, and label confusion.

The corrected production method is binding visual practice:

> **exact approved representation source → identify visual anchors → generate purpose-built portrait → explicit filename/mapping → QC**

Never substitute:

> filename similarity / generic archetype / card crop / “looks close enough”

for representation authority.

For batch production, “batch of six” means **six separate assets**, not a six-person composite sheet.

Status:

- DESIGN CLOSED: **YES**.
- DURABLE AUTHORITY: **YES — issue #33 plus this audit**.
- IMPLEMENTED: **YES in the later corrected enemy batches**.
- RUNTIME VALIDATED: **not implied**.

---

# 2. Affiliation / Knowledge / observer-safe presentation

## 2.1 Location does not imply affiliation

Hard visual rule recovered from this workspace:

> **Location ≠ affiliation.**

And the production shorthand:

> **Konoha is a location, not a watermark.**

Do not add Leaf/village/clan/faction insignia, headbands, banners, wall emblems, clothing marks, architecture branding, or decorative faction filler merely because a character or scene is located in Konoha.

Before physically placing a faction symbol, there must be an established fact requiring that exact symbol to exist on that person/object/location.

The collectible card's decorative affiliation/category icon is a separate presentation layer from in-world evidence.

This rule is especially important for covert, infiltrated, compromised, criminal, experimental, hidden, observer-safe, or contested scenes.

Status:

- DESIGN CLOSED: **YES**.
- DURABLE AUTHORITY: **YES — issue #33 explicitly records `Location ≠ affiliation`; this audit preserves the stronger workspace formulation**.
- IMPLEMENTED: **visual-production practice, yes**.
- RUNTIME VALIDATED: **N/A**.

## 2.2 Observer-safe art must respect Knowledge boundaries

The workspace repeatedly required that artwork not reveal hidden allegiance, programme ownership, Kurama identity, or faction truth that the current observer does not know.

This aligns with durable CE/SC doctrine:

> **World Truth ≠ observer Knowledge ≠ presentation**

and:

> **observed additional chakra signature ≠ identity Knowledge**

Therefore art may depict established visible evidence while deliberately withholding the true causal/faction explanation.

Examples include Unknown Man, Female Operator, Reika, Mizue Kagawa, Recall Medic, Field Operative, and the Sanitisation Operatives.

Status:

- DESIGN CLOSED: **YES**.
- DURABLE AUTHORITY: **YES** — current Arc 1 CE/Registry/Story contracts plus this visual audit.
- IMPLEMENTED: **YES in observer-safe cards/portraits**.
- RUNTIME VALIDATED: **presentation consumer-specific; not established merely by image existence**.

**CE differentiation:** **REINFORCEMENT / VALIDATION — NO NEW ACTION.** This is a direct visual-projection application of CE epistemic separation, not a new engine subsystem.

---

# 3. Identity / representation / Hosted Entity non-collapse

The visual workspace materially reinforced several semantic boundaries that are now durable elsewhere.

## 3.1 Menma representation split

Current durable Arc 1 model:

- `genin_menma` — Base Genin Menma; **no Chronicle-specific Identity Rebinding arm seal implied**;
- `cipher_menma` — Identity Rebinding / False Identity seal-state representation;
- `echo_menma` — permanent reciprocal Echo cooperation representation;
- `arc1_m12_menma_echo_borrowed_kurama` — occurrence-owned temporary climax projection, not a new person and not a permanent combined unlock.

Preserve:

- Menma person identity ≠ representation package;
- Echo Menma ≠ Cipher Menma;
- Echo Menma ≠ permanent Kurama access;
- temporary Kurama loan ≠ persistent unlock;
- visual difference ≠ mandatory Base PL difference.

The workspace's working art title **Resonant Menma** may exist as a visual/catalogue asset label, but current Registry authority for the temporary climax remains the runtime projection key above and explicitly rejects minting a new persistent Character identity solely from the occurrence.

Status:

- DESIGN CLOSED: **YES**.
- DURABLE AUTHORITY: **YES** — CE contract, Registry ratification, Story authority.
- VISUAL ASSETS: **YES** — `Assets/Transformations/echo_menma.png`, `Assets/Transformations/resonant_menma.png`; portraits also committed.
- RUNTIME IMPLEMENTED: **do not infer from assets**; Arc 1 M11/12 runtime ownership remains outside Character Creation.
- GOLDEN: **not established here**.

## 3.2 Echo Entity

Stable Entity ID:

`arc1_menma_echo`

Stable host relationship:

`host_rel_menma_arc1_echo`

Programme/class term: **Echo**.

A Chronicle-relative player-selected personal name is display/history metadata for the same Entity and never replaces its stable Registry address.

Appearance recovered by the workspace: a small low lean chakra organism barely longer than a forearm, four narrow legs with gripping hand-like feet, long flexible tail, translucent/layered chakra membrane, moving inner light-lines, narrow triangular head, two small rear ridges, four dark reflective eyes; strange/intelligent rather than cute, majestic, fox-like, or a Kurama reskin.

Preserve:

- player-defined personal name ≠ stable Registry ID;
- programme class ≠ personal identity;
- visible Hosted manifestation ≠ independent Battle participant;
- Hosted Entity ≠ host person;
- attachment ≠ ownership/mastery;
- co-hosting ≠ fusion;
- co-hosting ≠ additive PL.

Status:

- DESIGN CLOSED: **YES**.
- DURABLE AUTHORITY: **YES**.
- VISUAL ASSET: **YES** — `Assets/Hosted Entity/hosted_entity_echo.png`.
- INDEPENDENT BATTLE IMPLEMENTATION: **NO / not authorised by current Alpha closure**.

## 3.3 Ren stages

Stable person:

`arc1_ren`

One persistent Ren across:

- Base / Better Host;
- `arc1_ren_stage_1_conditioned_echo` — Conditioned Echo;
- `arc1_ren_stage_2_advanced_optimisation` — Advanced Optimisation;
- `arc1_ren_stage_3_terminal_optimisation` — Terminal Optimisation.

Stable conditioned Hosted Entity:

`arc1_ren_conditioned_echo`

Relationship:

`host_rel_arc1_ren_conditioned_echo`

The visual rule was explicit: escalation must preserve recognisable teenage Ren. Stage progression is invasive optimisation/routing, not replacing him with unrelated giant-monster anatomy. Stage Three retains unmistakable **human rage** rather than erasing Ren's agency into a generic monster effect.

Preserve:

- one Ren person ≠ four people;
- stage Effective state ≠ Base identity mutation;
- damaged-pathway rerouting ≠ healing;
- emotional suppression/escalation is authored state, not a new identity.

Status:

- DESIGN CLOSED: **YES**.
- DURABLE AUTHORITY: **YES** — Registry/PL and Combat/Story follow-up.
- VISUAL ASSETS: **YES** — Better Host + three stage cards and portraits committed.
- RUNTIME/GOLDEN: **outside visual authority; do not infer from card presence**.

**CE differentiation:** **REINFORCEMENT / VALIDATION — NO NEW ACTION.** This is a strong example of persistent identity with occurrence/state projection rather than identity duplication.

---

# 4. Female Operator / Unleashed and escalation semantics

Recovered hard visual/semantic distinction:

> **Unleashed ≠ transformation.**

The Female Operator remains the same woman. “Unleashed” means escalation from controlled operational restraint into full combat commitment after the calibration breakthrough, expressed through posture, output, environmental reaction, fixation and technique intensity — not horns, mutation, a convenient secret chakra form, or a new person.

Current runtime source later gained a stable participant and two observer projections for the same person, reinforcing the visual decision:

- stable participant: `arc1_female_operator`
- observer projection: `observer_projection_female_operator`
- unleashed observer projection: `observer_projection_female_operator_unleashed`

Status:

- DESIGN CLOSED: **YES**.
- DURABLE AUTHORITY: **YES**.
- VISUAL ASSETS: **YES**.
- RUNTIME IMPLEMENTED: **YES — current source contains the Mission 5 Female Operator encounter package**.
- RUNTIME VALIDATED / GOLDEN: **not claimed by this visual audit without explicit current regression evidence**.

Reusable rule:

> **commitment-state escalation ≠ ontological transformation by default**

**CE differentiation:** RECORD ONLY. Useful state/identity example; no new subsystem.

---

# 5. Relationship / Shared History / composite identity archaeology

Older visual discussions around Duo/Group cards produced a useful reusable distinction:

- meaningful Shared History may justify a recognised composite identity;
- ordinary co-presence does not automatically create one;
- participant ownership/access does not imply composite ownership/access;
- runtime combination does not itself create persistent composite identity;
- multi-character collectible selection identity ≠ participant set ≠ deployment capacity footprint;
- representation multiplicity ≠ ontological duplication.

Current CE authority already contains this in the **Composite Identity Framework**. The old visual workspace must not be treated as a missing architecture owner.

Status:

- DESIGN CLOSED at CE level: **YES**.
- DURABLE AUTHORITY: **YES**.
- SC-specific multi-character deployment-footprint implementation: **consumer-triggered future work**.

**Classification:** **REINFORCEMENT / VALIDATION — NO NEW ACTION** for CE architecture.

---

# 6. Coercive / Kurama / transformation series

Visual production established/updated representations including:

- `coercive_cloak`
- `three_tail_dominion`
- `six_tail_dominion`
- `breakout_kurama`
- `nine_tails`
- `menma_nine_tails`
- `black_sun_himawari`
- `curse_mark_hinata`
- `triple_rashomon`
- `iron_maiden`
- `hosted_entity_black_zetsu`
- `kurama_reborn`
- `kage_madara`
- `pakkun`

The broad live-116 visual audit later explicitly retained the high-risk supersession rows and returned **NO FURTHER REMAP REQUIRED FOR ALPHA**.

Important ownership boundary:

> **approved card/portrait representation ≠ mechanics ≠ acquisition ≠ progression ≠ persistent access**

The existence of coercive-series cards does not author a complete coercive-route unlock chain, simultaneous Bloodline rule, permanent Kurama control, or forced-manifestation Combat transition.

The prior legacy reconciliation formally prevents unused wider-route semantics from becoming speculative Alpha blockers merely because art exists.

Status:

- VISUAL DESIGN: **closed for the accepted live representations**.
- DURABLE REPRESENTATION AUTHORITY: **YES**.
- FULL ROUTE MECHANICS: **not created by Character Creation**.
- POST-ALPHA unless a current caller explicitly requires them: wider coercive sequencing / generic forced-breakout bridge / unused future transition choreography.

---

# 7. Shadow of Indra genealogy

Recovered canonical visual/boss genealogy:

`fallen_hokage_sasuke -> shadow_of_indra -> sixth_shadow`

`Perfect Susanoo` as the Stage-Two name is **SUPERSEDED**.

Current Combat authority already closes individual `shadow_of_indra_black_mirror` semantics, but the art lineage does not by itself require the entire three-stage boss choreography to be callable in Alpha.

Classification:

- canonical naming: **DURABLE**;
- full staged runtime progression: **POST-ALPHA / caller-triggered unless Story makes it Alpha-callable**;
- no new Character Creation blocker.

---

# 8. Enemy portrait backlog — current finite reconciliation

Issue #33 originally listed 41 enemy/opposition card keys requiring portrait coverage audit and controlled generation.

The workspace subsequently generated the backlog in batches, corrected multiple wrong-representation attempts by using the actual source cards, and committed a broad portrait wave (`48e7954ce77ec9590f0b9e9dad34b6493af425c7`, followed by `201f673fc6747d8a08e9c35e9303790fe3245157` for the altered-shinobi correction).

Current `Enemies Portraits/` tree is now large and includes the produced batch set. However exact machine-facing reconciliation still exposes a finite tail:

| Enemy card/source key | Current portrait tree key | Audit disposition |
|---|---|---|
| `beast_handler_rogue` | `beast_hunter_rogue` | **LIKELY FILENAME/KEY DRIFT — resolve under Assets/authoritative mapping; do not make Coding infer** |
| `trap_network_controller` | `trap_network_specialist` | **LIKELY FILENAME/KEY DRIFT — generated from controller source card; resolve exact approved key/path** |
| `fuinjutsu_smuggler` | no same-name portrait found | **REAL MISSING/UNRESOLVED COVERAGE — requires exact portrait or proof of an authoritative differently-named mapping** |
| historical `altered_shinobi` | `test_subject_altered_shinobi` | **SUPERSEDED key wording; current card/portrait are `test_subject_altered_shinobi`** |
| `Bandit`, `BanditLeader`, `Scout`, `ScoutReborn` | lowercase/underscore portrait filenames | **normalisation/casing genealogy; do not infer runtime mappings from this alone** |

This means #33 should **not** remain described as a giant untouched 41-image backlog, but it also should not close yet without the finite tail being reconciled.

Status:

- broad visual generation: **substantially implemented/committed**;
- exact backlog closure: **NOT YET DURABLY CLOSED**;
- runtime mapping: **must remain Assets/Registry/Coding-authoritative, never inferred here**;
- Golden: **not established by tree presence**.

**Classification:** REAL PRE-ALPHA WORK / QUEUE. It is an Alpha asset-completeness requirement, but not a reason to reopen unrelated architecture.

---

# 9. Live-116 portrait wall — current implementation/validation gap

This workspace's representation responsibility is already closed by issue #12 / `Documentation/Assets/Live 116 Battle Portrait Representation Audit 2026-09-07.md`:

> **NO FURTHER REMAP REQUIRED FOR ALPHA**

The remaining live-116 problem is physical binary/runtime validation, already routed:

- **#45 → UI / Assets**: physical binary/tree QA, 1024×1024, PNG decode, exact approved paths;
- **#16 → Coding**: downstream browser/runtime resolver proof after physical QA.

Current #45 evidence records a partial repair commit:

`e80032e89a198873a2da1812e71e3eac1e260dec`

and CI run:

`34343058712`

which reduced physical failures from 40 to 24 while leaving manifest/resolver/no-card-fallback checks GREEN. #45 remains open until 116/116 decode, 116/116 exact dimensions and zero missing approved paths.

**Do not create another Character Creation remap issue.** Current UI / Assets already explicitly recorded that Character Creation authority remains **NO FURTHER REMAP REQUIRED**.

Status:

- representation design: **CLOSED**;
- mapping authority: **DURABLE / CLOSED**;
- physical binary QA: **NOT GREEN**;
- browser/runtime proof: **OPEN downstream**;
- final Golden: **NOT GREEN**.

**Classification:** existing Alpha blocker traffic, already owned; **NO NEW HANDOFF**.

---

# 10. Issue #27 — stale Character Creation traffic

Issue #27 asked Character Creation to define/correct:

- Base Genin Menma;
- Cipher Menma;
- Echo Menma;
- Hosted Entity Echo;
- temporary Echo + Borrowed Kurama preview;
- Ren Base/Stages 1–3;
- Mizue Kagawa;
- Recall Medic;
- Field Operative.

Subsequent durable authority and assets now exist:

- Story source: `Documentation/Story/Arc1_Konoha_Story_Skeleton_and_Choice_Authority_2026-09-09.md`;
- CE semantics: `Documentation/Coordination/Menma Multiple Hosted Entity and Echo Arc 1 Contract 2026-09-09.md`, commit `6020deb4f81b74d84c0c9acf28b6cfb920c0f10a`;
- Registry/PL: `Documentation/Registry/Arc 1 Echo Mission 11 12 Registry and PL Ratification.md`, commit `074ad7bd2f3435e7e88dd1d04f1ee45867a4fefe`;
- visual assets: commit `490294d66de92e90807db7794b6cec0e43b675f0`;
- corresponding portraits: commit `08944a46dfb8c155845ab233b0a4dbb5d557ed9a`;
- current `Assets/Genin/genin_menma.png` exists and the Registry contract explicitly distinguishes it from Cipher/Echo states.

Therefore the original Character Creation request is **consumed**. Any remaining M11/M12 runtime implementation belongs to current Combat/Coding traffic, not to #27 visual definition.

**Classification:** SUPERSEDED / STALE OPEN TRAFFIC — close with evidence; do not resend.

---

# 11. Late visual additions: Kage Minato / Jōnin Kushina

Current source contains:

- `Assets/Kage/kage_minato.png`
- `Assets/Jonin/jonin_kushina.png`

Story authority separately confirms Minato Namikaze as the intended current Fourth Hokage in the active continuity and preserves wider Uzumaki/Kushina continuity.

However this audit does **not** find textual evidence sufficient to conclude that the existence of these exact late card files by itself changes the final 116 admission gate, grants PL packages, creates new collectible acquisition, or proves Battle/runtime consumption.

Therefore:

> **physical card asset ≠ Registry admission ≠ PL ≠ acquisition ≠ runtime use**

If they are already covered by current Registry/admission authority, consume that authority. If not, their physical presence is an awaiting-placement/content asset and **must not become an Alpha blocker merely because the art was generated**.

Classification: **RECORD ONLY / consumer-triggered admission check**, not speculative SEND NOW.

---

# 12. Surgical-edit doctrine

A major production lesson from this workspace must survive archive because repeated tiny Minato/nameplate edits burned generations through accidental full-image reinterpretation.

When a request is explicitly a **SURGICAL EDIT**:

- change only the named region/content;
- preserve canvas size, crop, geometry, subject, pose, expression, lighting, background, frame, panels, spacing and all unaffected typography;
- reconstruct only the pixels directly beneath removed baked content;
- do not rebalance/redesign/clean up/improve surrounding material;
- if live coded UI is intended to occupy an intentionally cleared region, leave that region empty as requested.

Canonical production distinction:

> **surgical presentation edit ≠ semantic redesign / reroll / recommit**

Status:

- DESIGN CLOSED: **YES**.
- DURABLE AUTHORITY: **YES — this audit**.
- RUNTIME: **N/A**.

**CE differentiation:** RECORD ONLY. This reinforces the broader doctrine that presentation refresh/edit must not silently mutate semantic state.

---

# 13. Generated/contextual dialogue and narrative material

Character-card prompts often contained Story-facing dialogue, encounter descriptions, motivations, or suggested emotional reads. These were valid visual briefs, but they are not automatically Writing authority.

Preserve:

> **visual brief/contextual dialogue ≠ canonical Story occurrence unless Writing authority adopts it**

Likewise:

> **card title ≠ stable machine ID unless Registry ratifies it**

and:

> **observer-facing label ≠ persistent identity / true faction / hidden allegiance**

This is particularly relevant to names such as Unknown Man, Female Operator, Recall Medic, Field Operative and temporary representation labels.

Classification: **REINFORCEMENT / provenance guard — NO NEW ACTION**.

---

# 14. Items / Battle Pouch archaeology

Older visual/mockup references to `Soldier Pill`, `Antidote`, and `Medical Kit` do not create Item authority.

The earlier reconciliation established that the Battle Pouch is live presentation over Inventory/Combat authority, and no mockup label may invent quantity, target rules, effects, consumption, save/load truth or action economy.

Classification:

- exact legacy item labels: **NOT Alpha authority from this workspace**;
- if Items/Combat promotes them later: Assets/UI may project them;
- otherwise: **POST-ALPHA / DEFERRED — DO NOT BLOCK ALPHA**.

---

# 15. Presentation asset ≠ mechanic / causal-source boundary

Across the entire workspace, one rule repeatedly prevented semantic collapse:

> **visual approval does not author mechanics**

Examples:

- Bloodline/curse/transformation art does not author simultaneous activation rules;
- hosted-entity art does not create ownership/mastery/additive PL;
- Summon art does not automatically author acquisition or deployment;
- boss-stage art does not automatically make the stage reachable;
- card title does not define Rank/Promotion;
- Battle portrait does not create the participant;
- environmental affiliation art must not invent institutional ownership;
- generated enemy role art does not invent faction truth;
- temporary climax art does not create persistent unlock.

This is a provenance rule: every gameplay claim must be owned by its causal source and specialist authority.

**CE differentiation:** **REINFORCEMENT / VALIDATION — NO NEW ACTION.** Strongly consistent with Chronicle Engine causal provenance / explainability direction.

---

# 16. Superseded / rejected / duplicate archaeology

The following must not re-enter production merely because they remain visible in chat history or old files:

- old **97** active-identity count as a current production gate — **SUPERSEDED by 116**;
- **512×512** as the Alpha portrait master — **SUPERSEDED by 1024×1024**;
- blanket portrait remap from filenames/folders — **REJECTED / superseded by exact manifest authority**;
- collectible-card crop as `uiPortrait` — **REJECTED**;
- generic enemy archetype generation from filename — **REJECTED production method**;
- `Perfect Susanoo` as the Stage-Two Shadow-of-Indra name — **SUPERSEDED**;
- `Divided Vessel` as an active representation — **REMOVED / do not restore**;
- `altered_shinobi` as the current enemy card key where the production asset is `test_subject_altered_shinobi` — **historical wording only**;
- any old wrong Decoy Assassin / Evidence Burner / Ambush Captain / ANBU-Style Operative / Beast Handler portrait attempts that were replaced after source-card correction — **REJECTED visual fossils**;
- repeated generic Leaf branding because a scene is in Konoha — **REJECTED**.

Rejected/superseded visual fossils may remain historical provenance, but they are not active production authority.

---

# 17. Consolidated status matrix

| Recovered area | Design closed | Durable authority | Implemented / committed | Runtime validated | Golden / regression GREEN |
|---|---:|---:|---:|---:|---:|
| Premium card 980×1400 / unique treatment | YES | YES | YES, broad asset corpus | N/A | no universal art Golden identified |
| `uiPortrait` 1024×1024 contract | YES | YES | YES | PARTIAL | **NO — #45/#16 open** |
| live-116 representation mapping | YES | YES | YES | representation audit YES; browser proof pending | NO final end-to-end Green |
| anti-affiliation-leak visual doctrine | YES | YES | used in cards | N/A | N/A |
| Base/Cipher/Echo/temporary Menma split | YES | YES | assets committed | runtime owned elsewhere | not proven here |
| Echo stable Entity / relationship semantics | YES | YES | card asset committed | independent Battle participation not authorised | N/A |
| Ren one-person stage sequence | YES | YES | cards/portraits committed | runtime owned elsewhere | not proven here |
| Female Operator normal vs Unleashed | YES | YES | assets + runtime package | implementation exists | explicit Golden not proven here |
| Sanitisation trio visuals | YES | asset corpus + enemy portraits | YES | mission runtime owned elsewhere | not proven here |
| Enemy portrait backlog | mostly YES | issue #33 | broad wave committed | exact tail unresolved | NO final closure proof |
| Kage Minato / Jōnin Kushina late cards | visual YES | physical assets exist; semantic admission not inferred | committed in current tree | unknown/not inferred | unknown |
| composite identity / Shared History doctrine | CE CLOSED | CE Bible | consumer-specific | consumer-specific | consumer-specific |
| coercive wider route | individual reps closed | current authority | individual assets | wider route not inferred | not Alpha blocker by art existence |
| Battle Pouch mockup item names | NO mechanic authority | presentation archaeology only | N/A | N/A | N/A |

---

# FINAL CONSOLIDATED PACKET

## 📤 CHARACTER CREATION / VISUALS → CE / CODEX / COORDINATION

### A. ALPHA BLOCKERS / SEND NOW

**No new Character Creation SEND NOW dependency is created by this audit.**

Existing blocker traffic remains authoritative and must not be duplicated:

1. **#45 → UI / Assets** — live-116 physical portrait QA remains open; current partial evidence is 24 physical failures after commit `e80032e89a198873a2da1812e71e3eac1e260dec` / run `34343058712`.
2. **#16 → Coding** — downstream browser/runtime resolver proof after #45 closes.

Character Creation representation authority remains:

**NO FURTHER REMAP REQUIRED FOR ALPHA.**

### B. REAL PRE-ALPHA WORK / QUEUE

1. **Issue #33 enemy portrait closure** — broad generation is largely done, but reconcile the finite tail before final Alpha asset closure:
   - `fuinjutsu_smuggler` — no same-name portrait found in current `Enemies Portraits/`; obtain exact approved portrait or prove authoritative alternate mapping;
   - `beast_handler_rogue` card vs `beast_hunter_rogue` portrait — resolve exact key/path;
   - `trap_network_controller` card vs `trap_network_specialist` portrait — resolve exact key/path.
   Coding must not infer these.
2. Close stale #27 with existing visual/semantic evidence rather than treating it as new work.

### C. DURABLE AUTHORITY GAPS

This audit closes the main workspace-local visual doctrine gaps by recording them durably:

- **Konoha/location ≠ affiliation watermark**;
- observer-safe visual projection must respect Knowledge;
- surgical edit ≠ redesign;
- source-card representation provenance is mandatory for derived portraits;
- visual brief/dialogue ≠ Story canon;
- visual asset/card title ≠ Registry admission/machine ID/mechanics.

No new CE architecture document is required solely from these rules.

### D. IMPLEMENTATION / VALIDATION GAPS

- `uiPortrait` physical QA is not final GREEN (#45).
- browser/runtime live-116 proof remains open (#16).
- enemy portrait tree presence is not runtime/Golden proof.
- M11/M12 Echo/Ren visual assets are committed, but Character Creation does not claim their Battle/runtime implementation or Golden status.
- late Minato/Kushina physical card files do not by themselves prove Registry admission/runtime use.

### E. SUPERSEDED / DUPLICATE TRAFFIC

- 97-current-production-count interpretation — SUPERSEDED by 116.
- 512×512 Alpha master portrait contract — SUPERSEDED by 1024×1024.
- broad Character Creation live-116 remap question — CLOSED, NO FURTHER REMAP REQUIRED.
- issue #27 visual-definition urgency — STALE/CONSUMED by later authority/assets.
- old generic/wrong enemy portrait attempts — REJECTED fossils.
- `Perfect Susanoo` Stage-Two naming — SUPERSEDED.
- `Divided Vessel` active representation — REMOVED.
- old `altered_shinobi` backlog key — superseded by `test_subject_altered_shinobi` production naming.

### F. REINFORCEMENT / RECORD ONLY

- World Truth ≠ observer Knowledge ≠ presentation.
- character/person identity ≠ representation state.
- Hosted Entity ≠ host person.
- co-hosting ≠ fusion / ownership / mastery / additive PL.
- visible Hosted manifestation ≠ independent Battle participant by default.
- temporary Kurama loan ≠ persistent unlock.
- visual approval ≠ mechanics.
- Registry identity ≠ asset filename/folder/history.
- collectibleCard ≠ uiPortrait.
- physical file presence ≠ representation authority.
- Shared History may ground a Composite Identity; co-presence alone does not.
- representation multiplicity ≠ ontological duplication.
- presentation edit/refresh ≠ semantic reroll/recommit.

### G. POST-ALPHA — DO NOT BLOCK ALPHA

Unless a current Alpha caller explicitly requires them:

- generic/full coercive-route transition sequencing beyond already-closed individual packages;
- generic mid-Battle Breakout Kurama bridge already deferred by current Combat closure;
- complete Fallen Hokage → Shadow of Indra → Sixth Shadow staged choreography if not callable in current Alpha Story;
- future composite/multi-character deployment-footprint consumer implementation;
- legacy mockup Items (`Soldier Pill`, `Antidote`, `Medical Kit`) absent explicit Item authority;
- optional future 512×512 derived portrait optimisation while 1024 masters remain authoritative;
- additional visual remastering merely for polish when current representation authority is already accepted.

### H. EXACT DURABLE FILES / COMMITS / IDS / PATHS

Key durable authority:

- `Documentation/Coordination/Specialist_GitHub_Handoff_Protocol.md`
- `Documentation/Coordination/Character Creation Visual Legacy Audit Reconciliation 2026-09-09.md`
  - commit `797b57e12f2b5650f262e759bbfb2f39898e3d7e`
- `Documentation/Assets/Live 116 Battle Portrait Representation Audit 2026-09-07.md`
  - commit `788a82435b2435ca8f805c81f84b9a0dc93473b0`
- corrected `Portraits/` physical tree lineage
  - commit `aa422f1d0f74f5d210e0d1678fd57c46a20b2277`
- `Documentation/Assets/Battle Portrait Authority and Manifest.md`
- `Documentation/Assets/Battle Portrait Registry Ratification.md`
- `Documentation/Registry/Final 116 Admission Audit and Coding Handoff.md`
- `Documentation/Registry/Final 116 Asset Projection Registry Ratification.md`
- `Documentation/Coordination/Menma Multiple Hosted Entity and Echo Arc 1 Contract 2026-09-09.md`
  - commit `6020deb4f81b74d84c0c9acf28b6cfb920c0f10a`
- `Documentation/Registry/Arc 1 Echo Mission 11 12 Registry and PL Ratification.md`
  - commit `074ad7bd2f3435e7e88dd1d04f1ee45867a4fefe`
- Arc 1 Story authority:
  - `Documentation/Story/Arc1_Konoha_Story_Skeleton_and_Choice_Authority_2026-09-09.md`
- new Arc 1 visual asset commit:
  - `490294d66de92e90807db7794b6cec0e43b675f0`
- corresponding portrait commit:
  - `08944a46dfb8c155845ab233b0a4dbb5d557ed9a`
- enemy portrait broad wave:
  - `48e7954ce77ec9590f0b9e9dad34b6493af425c7`
- altered-shinobi correction:
  - `201f673fc6747d8a08e9c35e9303790fe3245157`
- safe live-116 physical repair:
  - `e80032e89a198873a2da1812e71e3eac1e260dec`
  - CI `34343058712`

Exact Arc 1 IDs recovered:

- `arc1_menma_echo`
- `host_rel_menma_arc1_echo`
- `genin_menma`
- `cipher_menma`
- `echo_menma`
- `arc1_m12_menma_echo_borrowed_kurama`
- `mizue_kagawa`
- `arc1_m11_recall_medic_01`
- `observer_projection_recall_medic`
- `arc1_m11_field_operative_01`
- `observer_projection_field_operative`
- `arc1_ren`
- `arc1_ren_stage_1_conditioned_echo`
- `arc1_ren_stage_2_advanced_optimisation`
- `arc1_ren_stage_3_terminal_optimisation`
- `arc1_ren_conditioned_echo`
- `host_rel_arc1_ren_conditioned_echo`
- `arc1_dr_sazan`
- `arc1_female_operator`
- `observer_projection_female_operator`
- `observer_projection_female_operator_unleashed`

Key current physical asset examples:

- `Assets/Genin/genin_menma.png`
- `Assets/Transformations/echo_menma.png`
- `Assets/Transformations/resonant_menma.png`
- `Assets/Hosted Entity/hosted_entity_echo.png`
- `Assets/Boss Cards/conditioned_echo_ren.png`
- `Assets/Boss Cards/advanced_optimisation_ren.png`
- `Assets/Boss Cards/terminal_optimisation_ren.png`
- `Others/better_host_ren.png`
- `Others/mizue_kagawa.png`
- `Enemies/recall_medic.png`
- `Enemies/field_operative.png`
- `Assets/Kage/kage_minato.png`
- `Assets/Jonin/jonin_kushina.png`

Current enemy-tree reconciliation anchors:

- source cards under `Enemies/`
- dedicated portraits under `Enemies Portraits/`
- `Enemies/fuinjutsu_smuggler.png` exists while no same-name portrait was found in the inspected portrait tree;
- `Enemies/beast_handler_rogue.png` vs `Enemies Portraits/beast_hunter_rogue.png`;
- `Enemies/trap_network_controller.png` vs `Enemies Portraits/trap_network_specialist.png`.

---

# CE DIFFERENTIATION CHECK

**YES — this workspace reinforced reusable CE strategic direction, but did not reveal a missing engine subsystem.**

Reusable insights:

1. **Epistemic projection:** visual presentation must obey observer Knowledge and must not leak hidden affiliation/world truth.
2. **Provenance/explainability:** a portrait or representation must trace to exact authority; filename similarity and generic archetype inference are invalid causal provenance.
3. **Persistent identity vs state:** Menma/Ren/Operator examples reinforce one historical person with multiple authored representations or commitment states.
4. **Hosted-Entity causality:** manifestation/co-hosting does not imply ownership, fusion, additive PL or independent participation.
5. **Shared-history composite identity:** already represented in CE Composite Identity Framework.
6. **Presentation mutation boundary:** a surgical visual edit/presentation refresh must not silently become a semantic reroll/recommit.

**Disposition:** **RECORD ONLY / REINFORCEMENT**. Existing CE architecture already covers the reusable core. No new Alpha architecture blocker is justified.

---

# ARCHIVE READINESS

## **ARCHIVE READINESS: SAFE — once the existing issue records are reconciled, no new handoff is required.**

The workspace itself no longer needs to remain active as transport or authority because:

- its major legacy audit has already been reconciled against live authority;
- all reusable semantic conclusions are durable elsewhere or recorded in this final audit;
- live-116 remap authority is closed;
- remaining physical live-116 work is owned by #45 → #16;
- the only remaining Character Creation-specific pre-Alpha tail is already represented by #33 and can survive workspace retirement as GitHub issue traffic;
- #27 can be closed as consumed rather than requiring the old chat to remain alive.

Archiving this workspace **does not mean Alpha is globally GREEN**. It means there is no longer undocumented production-critical knowledge that requires this specific chat to remain open.

**Routing: RECORD ONLY**
