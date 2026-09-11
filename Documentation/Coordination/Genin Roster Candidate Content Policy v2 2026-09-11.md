# Shinobi Chronicles — Genin Roster Candidate Content Policy v2

**Date:** 2026-09-11  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING ALPHA CANDIDATE-CONTENT AUTHORITY — v2 PUBLISHED / CODING ACTIVATION + RUNTIME VALIDATION PENDING**  
**Source handoff:** GitHub issue #107  
**Upstream chain:** #104 ← #81 ← #74 ← #73 ← #70 ← #69

## 1. Decision

The commissioned 25-row Konoha Genin expansion has now passed every prerequisite required for CE candidate-content publication:

- Registry / PL semantic admission: **25/25 CLOSED**;
- production collectibleCard + uiPortrait asset gate: **25/25 GREEN**;
- Combat / Skills baseline prepared-palette gate: **25/25 CLOSED**.

CE therefore publishes the new versioned candidate-content policy:

`alpha_genin_roster_first_production_content_v2`

This is an **expanded** teammate-candidate universe. It does not replace or delete the 13 existing v1 Genin candidates.

Exact v2 teammate authored universe size:

`13 existing v1 rows + 25 commissioned expansion rows = 38 representations`

The existing leader/teacher authored universe remains unchanged at 13 representations.

Preserve:

**candidate universe ≠ concrete snapshot**  
**candidate eligibility ≠ ownership ≠ assignment ≠ deployment**  
**Registry admission ≠ ownership**  
**asset GREEN ≠ ownership**  
**prepared Skill access ≠ ownership / assignment / deployment**  
**new content policy ≠ historical snapshot rewrite**

---

## 2. Version lineage

### Historical/current runtime content policy before v2 activation

`alpha_genin_roster_first_production_content_v1`

v1 remains authoritative for every historical or currently unresolved snapshot lineage that was created under v1.

### New published content policy

`alpha_genin_roster_first_production_content_v2`

v2 becomes the candidate-content source for **new `geninRosterTransition` lineages only after Coding explicitly activates this policy in production runtime**.

Publishing this document closes the CE content-authority dependency. It does **not** prove that deployed runtime has switched from v1 to v2.

The Acquisition/dynamic-candidate semantics marker remains separately:

`alpha_genin_roster_dynamic_candidate_policy_v1`

No second roster system or second candidate-state machine is created.

---

## 3. Exact v2 teammate candidate universe — 38 representations

The authored replacement-candidate universe for `alpha_genin_roster_first_production_content_v2` is exactly the following ordered list.

### A. Existing v1 candidates — retained unchanged

1. `genin_boruto`
2. `genin_chocho`
3. `genin_himawari`
4. `genin_hinata`
5. `genin_hoki`
6. `genin_karin`
7. `genin_menma`
8. `genin_mikoto`
9. `genin_mitsuki`
10. `genin_naruto`
11. `genin_orochimaru`
12. `genin_sarada`
13. `genin_sasuke`

### B. Commissioned 25-row expansion — activated only through v2

14. `genin_hashirama`
15. `genin_hiruzen`
16. `genin_mito`
17. `genin_tsunade`
18. `genin_sakumo`
19. `genin_duy`
20. `genin_guy`
21. `genin_rin`
22. `genin_dan`
23. `genin_nawaki`
24. `genin_shizune`
25. `genin_yamato`
26. `genin_sai`
27. `genin_kagami`
28. `genin_danzo`
29. `genin_torifu`
30. `genin_inoichi`
31. `genin_choza`
32. `genin_shibi`
33. `genin_tsume`
34. `genin_hiashi`
35. `genin_yugao`
36. `genin_hayate`
37. `genin_mukai`
38. `genin_kosuke`

This exact list is authored content authority.

Coding must not derive or extend it by scanning Registry Rank, asset folders, filenames, card order, Skill ownership, or future source additions.

A concrete snapshot is still a Chronicle-relative filtered subset of this authored universe.

---

## 4. Exact v2 leader / teacher universe — unchanged from v1

v2 does not change the first-production leader/teacher authored universe.

### Formal Jōnin

1. `jonin_hanabi`
2. `jonin_inojin`
3. `jonin_konohamaru`
4. `jonin_kushina`
5. `jonin_sasuke`
6. `jonin_shikaku`
7. `jonin_shino`

### Formal Special Jōnin

8. `sj_anko`
9. `sj_ebisu`
10. `sj_genma`
11. `sj_ibiki`
12. `sj_kiba`
13. `sj_nono`

Allowed formal Rank source set remains exactly:

`{ jonin, special_jonin }`

The compatibility field `joninLeaderCandidateVariantIds` may remain. Its semantics remain the legitimate union of exact Jōnin + Special Jōnin candidate authority.

The 25 new Genin rows are **teammate candidate content**, not new leader/teacher rows.

---

## 5. Upstream semantic authority consumed for the 25 new rows

### Registry / PL / stable-person authority

`Documentation/Registry/Alpha Genin Expansion 25 Row Registry and PL Admission 2026-09-10.md`

commit:

`fc8281fd81c92cf47e63c20dd097b7402d17a492`

This authority owns for the exact 25 rows:

- representation ID;
- `stablePersonKey`;
- baseline formal Rank = Genin;
- seven Base Stats;
- Base PL;
- same-person collision semantics;
- representation/possession boundaries such as Mukai's visible single Byakugan and Hashirama/Yamato Wood Release possession.

CE does not duplicate or recalculate those values here.

### Assets authority

Production normalization commit:

`21b8952ec68bf278500d18f003a41c14cdee828c`

Exact gate result:

- collectibleCard physical GREEN: **25/25**;
- uiPortrait physical GREEN: **25/25**;
- cards: exact **980×1400**;
- portraits: exact **1024×1024**;
- blocking rows/channels: **0**.

For each new representation, consume the approved production projections under the existing exact paths:

- `Assets/Genin/{representationId}.png` for collectibleCard;
- `Portraits/Genin/{representationId}.png` for uiPortrait.

Do not replace dedicated portraits with collectible-card crops.

### Combat / Skills authority

`Documentation/Combat/SC_Combat_Genin_v2_25_Row_Baseline_Prepared_Palette_Closure_2026-09-11.md`

commit:

`fc1013e62d258588f1ca2cd15c67e18d38aa35ad`

For each of the 25 exact representations this authority owns:

- exactly five baseline prepared Skill IDs;
- `baselineSkillAccess = granted` only for those exact listed IDs;
- existing stable Skill catalogue rows as resolver/numeric authority;
- possessed-but-locked special capability facts where applicable;
- explicit exclusion of unauthorised future/adult/Bloodline/clan/signature packages;
- at least one non-special direct executable action per row.

CE does not restate or broaden those prepared palettes here.

---

## 6. Capability hard boundaries preserved by v2

Candidate inclusion does not create capability authority.

In particular:

- `genin_hashirama` / `genin_yamato`: Wood Release possession is preserved, executable Access remains false at baseline;
- `genin_mukai`: visible single Byakugan remains possession/representation fact only, not active Byakugan Access;
- `genin_kagami`: no automatic Sharingan;
- `genin_hiashi`: no automatic active Byakugan or Gentle Fist;
- `genin_shibi`: no automatic independently acting kikaichū package;
- `genin_torifu` / `genin_choza`: no automatic Akimichi Expansion;
- `genin_inoichi`: no automatic Mind Transfer;
- `genin_tsume`: no automatic Inuzuka companion/beast-arts package;
- `genin_duy` / `genin_guy`: no Eight Gates Access;
- `genin_sai`: no Ink Arts Access;
- `genin_mito`: no Uzumaki Chains Access;
- no elemental nature, adult reputation, later Rank, Transformation, Summon, Hosted Entity, equipment, signature Skill or famous-future package is inferred from identity or art.

Preserve:

**Knowledge ≠ Access ≠ Competence ≠ Power ≠ Mastery**  
**possession ≠ executable Access**  
**Stats ≠ Skills**

---

## 7. Concrete snapshot derivation under v2

The existing deterministic `geninRosterTransition` semantics remain unchanged except for the versioned teammate authored universe.

For the first unresolved post-Promotion snapshot of a transition lineage that begins under v2:

1. begin from the exact 38-ID teammate universe in section 3;
2. begin from the unchanged exact 13-ID leader/teacher universe in section 4;
3. exclude any representation whose underlying stable Chronicle person is the promoted subject;
4. exclude replacement representations whose stable person is one of the current pre-Promotion Academy teammates; those teammates belong in `retentionEligibleVariantIds` while retention remains legitimate;
5. exclude exact `assigned_elsewhere` / `unavailable` candidates from committed authority;
6. exclude candidates whose current recruitment/acquisition or leader/teacher eligibility is not satisfied;
7. consume committed CE/world/institutional candidate-preparation facts that occurred before snapshot creation;
8. enforce stable-person collision safety across protagonist, retained teammates, replacement candidates and leader/teacher roles;
9. project surviving replacement candidates into `teammateCandidateVariantIds`;
10. project surviving leader/teacher candidates into `joninLeaderCandidateVariantIds`;
11. preserve retention separately;
12. preserve exact policy/provenance sufficient to explain every exclusion and later supersession.

Immediate-Promotion baseline must not fabricate candidates as `assigned_elsewhere` simply to make the field appear dynamic.

---

## 8. Recruitment / ownership semantics apply unchanged to v2 rows

Binding Acquisition closure:

`Documentation/Acquisition/Genin Roster Transition Recruitment and Retention Edge Closure 2026-09-10.md`

commit:

`ed0f9235a8f10ebbeaba02d83009237892813df0`

The production route remains:

`genin_roster_transition_recruitment`

A snapshot-authorised, currently available, unowned v2 replacement may use the same explicit recruitment transaction semantics as v1.

Semantic API equivalent:

```text
commitGeninRosterTransitionRecruitment({
  variantId,
  expectedSnapshotId
})
```

Preserve:

- candidate inclusion → recruitment opportunity may be available;
- candidate inclusion ≠ ownership grant;
- recruitment creates/reuses ownership but does not assign;
- stale snapshot fails closed before acquisition;
- already-owned exact representation is reused, not duplicated;
- recruit then change mind leaves legitimate ownership/history intact;
- later assignment unavailability does not roll back prior legitimate acquisition;
- card preview/click/UI refresh never silently grants ownership.

Retention remains:

`current pre-Promotion Academy teammates MINUS exact teammates made unavailable by separately committed authoritative occurrence/state`.

Historical Academy assignment does not force future Genin retention when legitimate later unavailability exists.

---

## 9. No-deadlock floor remains unchanged

Autonomous candidate preparation may not reduce the surviving uncommitted field below:

```text
remaining eligible uncommitted Genin replacement candidates >= 2
remaining eligible leader/teacher candidates from {jonin,special_jonin} >= 1
```

Retained Academy teammates do not count toward the two-Genin replacement floor.

The larger v2 universe does not authorize more aggressive autonomous consumption merely because more candidates exist.

The floor prevents deadlock; it does not guarantee favourite-character availability.

---

## 10. Snapshot policy pinning / non-retroactivity

This section is binding for v1→v2 runtime migration.

### Historical and unresolved v1 lineages

Any snapshot already created with:

`candidateContentPolicyId = alpha_genin_roster_first_production_content_v1`

remains a v1 snapshot permanently.

If later legitimate candidate-affecting history supersedes that unresolved snapshot inside the same `geninRosterTransition` lineage, the successor snapshot remains pinned to **v1**.

A deployed code/content update alone is not a Chronicle occurrence and must not inject the 25 new candidates into an already-existing transition lineage.

### New lineages after runtime activation

Only a `geninRosterTransition` whose first snapshot is created after production runtime has explicitly activated v2 uses:

`candidateContentPolicyId = alpha_genin_roster_first_production_content_v2`.

Once that lineage is v2, its successor snapshots remain v2 unless a later explicit version-migration contract says otherwise.

### Presentation/load behavior

None of the following changes policy version or candidate truth:

- UI open/close;
- map navigation;
- card preview;
- save/load;
- browser refresh;
- hover/focus;
- presentation re-render.

Canonical rule:

> **Candidate-content version is pinned by transition lineage, not by whichever build happens to render the screen today.**

---

## 11. Required v2 snapshot provenance

A v2 snapshot must preserve at minimum:

- `candidateContentPolicyId = alpha_genin_roster_first_production_content_v2`;
- Acquisition semantics/version, including `alpha_genin_roster_dynamic_candidate_policy_v1` where current runtime uses it;
- exact successful Promotion assessment/result occurrence;
- exact Academy Team Formation/team-state source used for retention;
- exact candidate-preparation / assigned-elsewhere / unavailability occurrences consumed;
- exact stable-person collision/exclusion reason where applicable;
- `supersedesSnapshotId` + exact cause for legitimate later supersession;
- enough source-version authority to distinguish v1 vs v2 without inferring from array length.

Do not use `candidate count == 38` as the policy-version identifier.

---

## 12. Coding consumption — minimum delta only

Coding must consume v2 through the **existing** candidate-roster, Registry, Acquisition, asset and Battle machinery.

Do not create:

- a second roster;
- a second candidate database;
- a second Skill system;
- representation-specific bespoke Battle resolvers;
- a v2-only ownership system;
- a v2-only save format.

Minimum implementation delta:

1. register the exact immutable v2 content-policy definition;
2. map v2 to the exact 38 teammate IDs + unchanged 13 leader IDs;
3. preserve v1 definition unchanged;
4. pin policy ID to transition lineage as section 10 requires;
5. consume exact Registry/stable-person authority for the 25 new rows;
6. consume exact collectibleCard/uiPortrait projections for the 25 new rows;
7. consume exact Combat prepared palettes for the 25 new rows;
8. allow the existing explicit recruitment transaction to operate on current-snapshot v2 candidates;
9. preserve current snapshot filtering, floor, ownership, assignment and supersession semantics;
10. validate fresh-save/browser behavior without rewriting existing v1 history.

---

## 13. Runtime / save-load / Golden evidence required

v2 is **durably published** by this document. It is not runtime GREEN until Coding proves all of the following.

### Policy and content ingestion

1. exact v2 policy ID is `alpha_genin_roster_first_production_content_v2`;
2. authored teammate universe is exactly **38** IDs: the 13 v1 IDs plus all exact 25 expansion IDs;
3. authored leader/teacher universe remains exactly **13** IDs;
4. production arrays come from explicit policy authority, never Registry/rank/asset scans.

### New-row integration

5. all 25 expansion representations resolve exact Registry/stable-person authority;
6. all 25 resolve approved collectibleCard + dedicated uiPortrait paths;
7. all 25 resolve their exact Combat baseline prepared palette without missing Skill IDs or invented special capability;
8. no Stats/Base PL/Rank mutation is introduced by candidate activation.

### Snapshot / history correctness

9. a new fresh transition lineage after v2 activation records `candidateContentPolicyId = ...v2`;
10. an existing unresolved v1 lineage remains v1 across code update, save/load and legitimate snapshot supersession;
11. same-person collisions fail/exclude correctly across protagonist, retained teammate, replacement teammate and leader roles;
12. UI/reload/save-load does not reroll candidates or migrate policy version.

### Acquisition / assignment

13. a snapshot-authorised unowned new-v2 candidate reaches explicit `genin_roster_transition_recruitment` rather than a dead end;
14. recruitment creates/reuses ownership once and does not assign automatically;
15. stale snapshot blocks recruitment before ownership grant;
16. candidate eligibility, ownership, assignment and Battle deployment remain separate.

### Battle-readiness

17. every new row has at least one legitimate non-special direct action available under its baseline Combat authority;
18. possessed-but-locked capability boundaries remain locked until their separate prerequisites are satisfied;
19. no generic Basic Attack/Guard or famous-future fallback is fabricated to repair a palette.

### Golden

20. fresh installed-browser post-Promotion flow can produce and persist a legitimate v2 candidate snapshot, recruit/select a lawful new v2 candidate through current machinery, save/load, complete team transition, and enter downstream playable state without semantic reroll or history corruption.

Until those runtime/browser checks are evidenced:

- **v2 design/content authority:** GREEN / CLOSED;
- **v2 durable publication:** GREEN;
- **v2 Coding integration:** NOT YET PROVEN;
- **v2 runtime validation:** NOT YET PROVEN;
- **v2 Golden/regression:** NOT YET GREEN.

---

## 14. Final Alpha lock

The new candidate-content authority is:

`alpha_genin_roster_first_production_content_v2`

with:

- **38 exact Genin teammate candidate representations**;
- **13 exact leader/teacher candidate representations**;
- existing dynamic candidate semantics unchanged;
- exact 25-row Registry/PL authority consumed;
- exact 25-row Assets authority GREEN and consumed;
- exact 25-row Combat prepared-palette authority consumed;
- historical/unresolved v1 snapshot lineages preserved unchanged;
- runtime/save-load/Golden proof still required before v2 is called playable/GREEN.

Canonical shorthand:

> **v2 expands the authored universe; the Chronicle still decides who is legitimately available, and history never changes version because the UI or build changed.**
