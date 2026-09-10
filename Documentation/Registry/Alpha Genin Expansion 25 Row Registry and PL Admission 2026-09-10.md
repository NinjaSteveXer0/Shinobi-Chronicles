# Shinobi Chronicles — Alpha Genin Expansion 25-Row Registry and PL Admission

**Date:** 2026-09-10  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING REGISTRY / PL / RANK ADMISSION — 25/25 SEMANTIC ROWS CLOSED / PRODUCTION ACTIVATION PENDING DOWNSTREAM ASSET + CE VERSIONING**  
**Source handoff:** GitHub issue #70  
**Parent coordination:** GitHub issue #69

## 1. Scope and authority consumed

This document closes the Registry / PL / Rank side of Stephen's commissioned 25-row Konoha Genin expansion.

Consumed authority:

- `Documentation/Coordination/Genin Expansion Alpha Admission and Candidate Versioning Decision 2026-09-10.md` — commit `1b8f8442c4a3d5b33a1df8c38c25b189a9b92e36`;
- `Documentation/Coordination/First Production Genin Roster Candidate Content Authority 2026-09-10.md` — current policy `alpha_genin_roster_first_production_content_v1`;
- GitHub issue #70;
- current source asset wave commit `5b75fa2c8d3f1a3841dc0007523116a22a55b09d` (`brand new genin cards`).

This admission does **not** mutate the existing v1 candidate-content policy in place. It supplies the exact stable-person linkage, representation IDs, Rank baseline and Base numerical packages CE needs to publish a later versioned expanded candidate-content policy after production asset projection is ready.

Preserve:

**persistent person ≠ representation**  
**representation ≠ production activation**  
**Registry admission ≠ candidate-policy membership**  
**candidate eligibility ≠ ownership ≠ assignment ≠ deployment**  
**formal Rank ≠ PL**  
**new candidate-content version ≠ historical v1 snapshot rewrite**

---

## 2. Stable-person linkage model

For this wave Registry publishes one exact `stablePersonKey` per represented person.

`stablePersonKey` is **collision/linkage metadata**, not a second Character or Entity Registry record and not a collectible identity. It exists so different representations of the same person can be excluded from simultaneous embodied use across protagonist, retained teammate, replacement-candidate and leader/teacher roles.

A future representation of one of these same people must reuse the same `stablePersonKey` unless later authoritative evidence proves that it is intentionally a different Chronicle person.

Current Registry-authority audit found **no already-admitted alternate Character representation** for these 25 `stablePersonKey` values. Some people already exist in Story/world continuity as factual people; that does not mint a second person here. These Genin representations attach to the same underlying person identity.

Canonical rule:

> **same `stablePersonKey` → same persistent person for embodied-collision purposes, even when representation IDs differ.**

Runtime field naming may adapt to an existing equivalent schema, but the exact linkage values and same-person semantics below must not change for convenience.

---

## 3. PL formula and calibration boundary

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Formula v1.0:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

All 25 Base PL values below are derived from that formula with **no direct or hidden PL bonus**.

These are exact **Genin representation baselines**. Adult titles, future feats, later Rank, reputation, famous lineage and eventual endgame power do not back-propagate into these Base packages.

Stats do not independently author Skills, bloodline Access, transformation packages, equipment, Summons, Hosted Entities, resolver effects or mastery.

---

## 4. Exact 25-row Registry / PL admission table

| # | Display | `stablePersonKey` | Genin representation ID | Baseline formal Rank | Base Stats `N/T/B/F/K/G/S` | Base PL | Registry semantic state |
|---:|---|---|---|---|---|---:|---|
| 1 | Genin Hashirama | `person_hashirama_senju` | `genin_hashirama` | Genin | `36/30/25/18/18/21/39` | **36** | ADMITTED / production inactive pending downstream |
| 2 | Genin Hiruzen | `person_hiruzen_sarutobi` | `genin_hiruzen` | Genin | `34/29/31/22/20/28/32` | **33** | ADMITTED / production inactive pending downstream |
| 3 | Genin Mito Uzumaki | `person_mito_uzumaki` | `genin_mito` | Genin | `27/20/18/34/22/24/35` | **33** | ADMITTED / production inactive pending downstream |
| 4 | Genin Tsunade | `person_tsunade` | `genin_tsunade` | Genin | `24/32/18/16/20/17/34` | **31** | ADMITTED / production inactive pending downstream |
| 5 | Genin Sakumo | `person_sakumo_hatake` | `genin_sakumo` | Genin | `30/32/36/17/18/22/31` | **34** | ADMITTED / production inactive pending downstream |
| 6 | Genin Might Duy | `person_might_duy` | `genin_duy` | Genin | `16/29/20/10/12/12/31` | **28** | ADMITTED / production inactive pending downstream |
| 7 | Genin Might Guy | `person_might_guy` | `genin_guy` | Genin | `18/33/22/11/12/14/34` | **31** | ADMITTED / production inactive pending downstream |
| 8 | Genin Rin | `person_rin_nohara` | `genin_rin` | Genin | `25/20/18/22/17/22/26` | **25** | ADMITTED / production inactive pending downstream |
| 9 | Genin Dan Katō | `person_dan_kato` | `genin_dan` | Genin | `26/23/21/17/18/28/25` | **27** | ADMITTED / production inactive pending downstream |
| 10 | Genin Nawaki | `person_nawaki` | `genin_nawaki` | Genin | `20/20/18/13/14/16/22` | **21** | ADMITTED / production inactive pending downstream |
| 11 | Genin Shizune | `person_shizune` | `genin_shizune` | Genin | `26/21/19/19/22/21/27` | **26** | ADMITTED / production inactive pending downstream |
| 12 | Genin Yamato | `person_yamato` | `genin_yamato` | Genin | `31/25/23/22/23/21/32` | **30** | ADMITTED / production inactive pending downstream |
| 13 | Genin Sai | `person_sai` | `genin_sai` | Genin | `28/25/31/19/18/24/28` | **30** | ADMITTED / production inactive pending downstream |
| 14 | Genin Kagami Uchiha | `person_kagami_uchiha` | `genin_kagami` | Genin | `31/29/26/18/19/30/29` | **30** | ADMITTED / production inactive pending downstream |
| 15 | Genin Danzō | `person_danzo_shimura` | `genin_danzo` | Genin | `29/25/27/24/28/22/30` | **29** | ADMITTED / production inactive pending downstream |
| 16 | Genin Torifu Akimichi | `person_torifu_akimichi` | `genin_torifu` | Genin | `22/28/25/16/18/17/31` | **29** | ADMITTED / production inactive pending downstream |
| 17 | Genin Inoichi Yamanaka | `person_inoichi_yamanaka` | `genin_inoichi` | Genin | `25/20/18/16/17/30/24` | **28** | ADMITTED / production inactive pending downstream |
| 18 | Genin Chōza Akimichi | `person_choza_akimichi` | `genin_choza` | Genin | `22/29/25/16/18/16/32` | **30** | ADMITTED / production inactive; visual unresolved |
| 19 | Genin Shibi Aburame | `person_shibi_aburame` | `genin_shibi` | Genin | `27/21/20/18/20/27/29` | **28** | ADMITTED / production inactive pending downstream |
| 20 | Genin Tsume Inuzuka | `person_tsume_inuzuka` | `genin_tsume` | Genin | `22/30/28/14/16/18/31` | **29** | ADMITTED / production inactive pending downstream |
| 21 | Genin Hiashi Hyūga | `person_hiashi_hyuga` | `genin_hiashi` | Genin | `24/33/25/18/17/27/31` | **31** | ADMITTED / production inactive pending downstream |
| 22 | Genin Yūgao Uzuki | `person_yugao_uzuki` | `genin_yugao` | Genin | `21/27/31/15/16/22/27` | **29** | ADMITTED / production inactive pending downstream |
| 23 | Genin Hayate Gekkō | `person_hayate_gekko` | `genin_hayate` | Genin | `22/26/30/16/16/23/26` | **28** | ADMITTED / production inactive pending downstream |
| 24 | Genin Mukai Kohinata | `person_mukai_kohinata` | `genin_mukai` | Genin | `24/31/27/17/18/23/30` | **30** | ADMITTED / production inactive pending downstream |
| 25 | Genin Kosuke Maruboshi | `person_kosuke_maruboshi` | `genin_kosuke` | Genin | `24/26/29/16/17/20/28` | **28** | ADMITTED / production inactive; collectible card missing |

All 25 rows are **Character representations** for Registry semantics. This document does not activate them in the current live production gate or current candidate-content policy by itself.

---

## 5. Baseline formal Rank semantics

Every row above has Genin as its **baseline formal Rank at this exact representation's admission**.

This does not change the existing persistent-rank rule:

- formal Rank may later change through legitimate Chronicle Promotion/Recognition authority;
- representation does not auto-swap merely because formal Rank changes;
- selecting or owning a `genin_*` representation does not manufacture a Promotion occurrence;
- Genin Rank supplies no direct PL or Stat bonus.

---

## 6. Same-person collision authority

The roster transition must compare persistent-person linkage, not only representation IDs.

For every row in this document:

```text
candidate.stablePersonKey must differ from the stablePersonKey
of every simultaneously embodied protagonist / retained teammate /
selected replacement teammate / selected leader-teacher.
```

If another representation of the same person exists later, one representation may be selected according to legitimate candidate/ownership/assignment authority, but both cannot create two embodied slots at once.

This is the same semantic protection already required for examples such as Academy/Genin Hinata, Academy/Genin Menma and Genin/Jōnin Sasuke.

No second person is minted merely because a higher/lower Rank card is later admitted.

---

## 7. Capability / lineage hard boundaries

### Mukai Kohinata

`genin_mukai` visibly represents Mukai with a single Byakugan under existing CE/Story authority. That visible eye is a representation/possession fact only.

This admission does **not** grant:

- Bloodline Access;
- activation permission;
- Competence;
- Power;
- Mastery;
- Stat modifiers;
- direct PL bonus;
- Byakugan Battle actions;
- perception/accuracy/targeting effects.

His Base Stats `24/31/27/17/18/23/30` and Base PL30 contain **no hidden active-Byakugan package**.

### Other lineage/visual cues

The same rule applies across the wave. For example:

- `genin_kagami` does not gain an automatic Sharingan package from Uchiha lineage/name/card art;
- `genin_hiashi` does not gain an automatic active Byakugan package merely from Hyūga lineage/card art;
- `genin_hashirama` / `genin_yamato` Stats do not themselves author Wood Release Skills or active packages;
- `genin_shibi` Stats do not themselves author an independently acting kikaichū source package;
- Akimichi/Inuzuka/Yamanaka lineage does not create unlisted hidden modifiers.

Exact Skills, Bloodline activation, companions/sources, equipment and resolver effects remain with their owning systems.

---

## 8. Calibration intent

The wave deliberately occupies a varied Genin band rather than compressing every famous future shinobi into the same power value.

Important examples:

- Hashirama PL36 is a strong Genin baseline, not adult First-Hokage power projected backward.
- Hiruzen PL33 is broadly capable without using later Third-Hokage reputation as a multiplier.
- Mito PL33 is Fūinjutsu/Stamina-forward without turning Uzumaki heritage into an additive bonus.
- Tsunade PL31 is Taijutsu/Stamina-forward without adult Sannin/medical mastery.
- Sakumo PL34 is Bukijutsu/Taijutsu-forward without adult White-Fang reputation scaling.
- Duy/Guy are physical-specialist Genin baselines, not Eight-Gates output ledgers.
- Rin/Shizune are lower-power technical/support baselines rather than artificially inflated because of later narrative importance.
- Inoichi is Genjutsu/intelligence-leaning; weapon specialists Yūgao/Hayate/Kosuke peak in Bukijutsu.

Numerical equality never means semantic interchangeability.

---

## 9. Current source asset audit after admission handoff

After issue #70 was opened, source commit:

`5b75fa2c8d3f1a3841dc0007523116a22a55b09d` — `brand new genin cards`

landed on `main` (merge lineage includes `4ccaac297bdd0eaa87820462820765c8c5eac829`).

That commit contains 25 `Assets/Genin/*.png` file changes, but it is **not a clean one-to-one 25-target production projection**:

1. **23 of the intended 25 target rows currently have a physically present card binary that is not otherwise specifically rejected here.** Physical presence still requires downstream Assets projection/approval before production activation.
2. `Assets/Genin/genin_choza.png` is physically present, but upstream #69/#70 explicitly records Chōza's final visual as unresolved/rejected. Registry does **not** approve that binary or allow it to become production authority merely because it exists in source.
3. `Assets/Genin/genin_kosuke.png` is **absent** from the 25-file upload/current target set. `genin_kosuke` remains semantically admitted but its collectible card is pending.
4. The same upload changed `Assets/Genin/genin_menma.png`, which is an already-existing v1 representation and **not one of these 25 semantic admission rows**. This document creates no new Menma identity/PL/admission and does not ratify that same-path binary replacement as a side effect.
5. Current `Portraits/Genin/` authority contains the pre-existing Genin portrait set, not a complete 25-row expansion portrait wave. Dedicated 1024×1024 frameless `uiPortrait` projection remains pending for the new playable rows.

Therefore:

**physical card file ≠ approved collectible projection**  
**same-path binary change ≠ new identity**  
**rejected Chōza binary ≠ production representation**  
**Registry semantic admission ≠ portrait authority**

---

## 10. Candidate-content activation boundary

Current production authority remains:

`candidateContentPolicyId = alpha_genin_roster_first_production_content_v1`

with its existing 13 Genin replacement candidates.

None of the 25 rows in this document enters a concrete candidate snapshot merely because Registry has now admitted the semantic packages.

CE must publish a **new versioned candidate-content authority** after the required production asset projection is ready. Historical v1 snapshots remain interpretable under v1 and are not rewritten/rerolled.

No current live collectible count or runtime gate is changed by this document alone.

When downstream systems activate these rows, their admission is 25 Character representations, not 25 new ontological people manufactured independently of `stablePersonKey` linkage.

---

## 11. Exact return evidence for CE / Codex / Coordination

Registry returns the following closed authority for candidate versioning:

1. **25/25 exact representation IDs** — table in section 4;
2. **25/25 exact stable-person linkage keys** — table in section 4;
3. **25/25 baseline formal Rank = Genin**;
4. **25/25 seven-Stat Base packages + derived Base PL**;
5. semantic state = **Registry admitted / not yet production-active**;
6. same-person collision must consume `stablePersonKey` or an exact runtime equivalent;
7. no candidate inclusion until CE publishes a new versioned content policy;
8. asset blockers/requirements:
   - Chōza final collectible visual unresolved; current file not Registry-approved;
   - Kosuke collectible card missing;
   - complete expansion `uiPortrait` projection still required;
   - incidental `genin_menma.png` same-path binary change requires existing-identity Assets authority rather than being folded into this 25-row admission;
9. Mukai Byakugan remains possession/representation only with no active Stat/PL package;
10. current v1 policy remains untouched.

CE should now coordinate the minimum Assets/production-projection work, then publish the versioned expanded candidate-content policy and route Coding consumption. Registry does not route directly to Coding before that sequencing is complete.

---

## 12. Final Registry / PL / Rank status

### CLOSED

- exact 25-row semantic Registry admission;
- exact stable-person linkage;
- exact Genin representation IDs;
- baseline formal Rank authority;
- exact seven Base Stats;
- exact Base PL;
- same-person collision semantics;
- Mukai no-hidden-Byakugan boundary;
- candidate-policy non-mutation boundary.

### NOT YET PRODUCTION-ACTIVE

- expanded CE candidate-content policy;
- final collectible-card projection for all 25;
- Chōza accepted visual;
- Kosuke card binary;
- expansion 1024×1024 `uiPortrait` projection;
- Coding consumption;
- runtime/browser validation;
- Golden/regression GREEN.

> **PL / Registry / Rank has closed all 25 semantic Character rows. The expansion is now ready to return to CE / Codex / Coordination for asset reconciliation and versioned candidate-content promotion without destabilising current v1.**
