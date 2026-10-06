# Shinobi Chronicles — Starting Skill Breadth Reauthoring: Academy 2 / Genin 3 / Jōnin 4

**Date:** 2026-10-07  
**Owner:** Combat / Skills / Items / Weapons  
**Coordination:** CE / Codex / Coordination  
**Parent:** #519  
**Status:** **COMBAT DESIGN CLOSED — ACADEMY EXACT 2-SKILL PACKAGES CORRECTED + GENIN EXACT 3-SKILL PACKAGES PRESERVED; JŌNIN BREADTH CLOSED / EXACT ROWS NOT YET AUTHORED; IMPLEMENTATION SEPARATE**

---

## 1. Correction notice

The first #573 pass was wrong.

It treated the numeric breadth target as if **"exactly two Skills"** could outrank the mandatory representation-identity requirement. That produced three owner-visible failures and several source-integrity defects:

- Academy Menma had no actual Kinjutsu starting Skill;
- Academy Obito omitted his already-authoritative Fire attack;
- Academy Iwabee used a defensive Earth wall as if it satisfied the required offensive Earth expression;
- the first table also introduced non-authoritative/fabricated Academy stable IDs for Wasabi Izuno, Kurenai and Obito instead of consuming the locked IDs already on main.

This document supersedes those rows.

Canonical correction:

> **Breadth and identity are co-required. The count never outranks the identity anchor.**

> **A fresh package is invalid until its exact stage-authentic identity anchor is inside the package.**

> **"Known but omitted from the starting two" is not acceptable when the omitted capability is the representation's required identity anchor.**

> **If the current old palette cannot satisfy the required anchor, Combat must author or bind a legitimate Skill rather than filling the slot with an unrelated generic action.**

---

## 2. Locked stage-breadth law

The owner-approved breadth remains:

- **Academy representation: exactly 2 fresh starting Skills**
- **Genin representation: exactly 3 fresh starting Skills**
- **Jōnin representation: exactly 4 fresh starting Skills**

This is a fresh-representation starting contract only.

It is not:

- a lifetime learned-Skill limit;
- a Potential Skill Roster size;
- a permanent prepared-slot ceiling;
- a Mastery ceiling;
- permission to delete persistent learned Skills on Promotion.

Preserve:

> **starting package != learned roster != Potential Skill Roster != prepared ceiling != Mastery**

> **Rank/stage influences starting breadth; Character identity decides the contents.**

> **same Rank != same Skill template.**

---

## 3. Provenance + identity test — binding

Every fresh starting Skill must survive both tests below.

### 3.1 Provenance

For each proposed Skill ask:

1. Did this exact representation possess/use/know the capability before Origin scene 1?  
   - yes -> eligible starting capability;
2. Is it only justified by a committed occurrence/reward during the Origin?  
   - yes -> not a starting Skill;
3. Is canon only a later-stage precedent that SC is moving earlier?  
   - require explicit SC stage/backstory authority rather than silent leakage;
4. Is the name character-authentic while the mechanics are merely filler?  
   - redesign/remove; a themed label is not enough.

### 3.2 Identity

Every fresh package must contain at least one Skill that visibly expresses an exact defining lane for that representation, such as:

- elemental Nature;
- Taijutsu style;
- Bukijutsu/weapon identity;
- Genjutsu;
- Fūinjutsu;
- Kinjutsu;
- Bloodline/clan capability;
- exact source/Summon relationship where actually authorised;
- another exact Character-defining capability.

Elemental Nature is not universally mandatory. It is mandatory only where that exact representation requires it.

For the current owner correction specifically:

- **Menma must visibly start with Kinjutsu;**
- **Obito must visibly start with Fire Release;**
- **Iwabee must visibly start with an offensive Earth Release attack.**

---

# 4. Corrected Academy exact two-Skill packages

## 4.1 Academy Hinata — PASS

Fresh starting two:

1. `academy_hinata_gentle_palm` — **Gentle Fist: Flowing Palm**
2. `academy_hinata_twin_palm_guard` — **Gentle Fist: Twin Palm Ward**

Identity proof:
- both are existing locked stable IDs;
- Gentle Fist is the visible Hyūga/Taijutsu identity anchor;
- one attack + one defensive expression gives useful breadth without granting later marquee Hyūga techniques.

No Byakugan capability is inferred merely from these Skill names.

---

## 4.2 Academy Wasabi Izuno — PASS / stable-ID correction

Fresh starting two:

1. `academy_izuno_pouncing_palm` — **Cat Fang Palm**
2. `academy_izuno_clone_pounce` — **Phantom Pounce**

Identity proof:
- feline movement/pounce language is already locked as Wasabi's Academy combat identity;
- the package visibly expresses her own cat-style path rather than a generic Academy template.

Correction from the first #573 draft:
- `academy_izuno_cat_claw_palm` was not the locked stable ID and is removed;
- `academy_izuno_pouncing_palm` is the durable ID from the signed-off display-name authority.

---

## 4.3 Academy Mirai — PASS

Fresh starting two:

1. `academy_mirai_twin_kunai` — **Twin Fang Kunai**
2. `academy_mirai_false_footstep` — **Phantom Footfall**

Identity proof:
- Twin Fang Kunai preserves her weapon/Bukijutsu identity;
- Phantom Footfall preserves the already-authored deception/Genjutsu aptitude lane;
- the two slots therefore express two authentic parts of Mirai rather than duplicate direct attacks.

---

## 4.4 Academy Menma — CORRECTED / actual Kinjutsu required

Fresh starting two:

1. `academy_menma_forced_chakra_drive` — **Kinjutsu: Forced Chakra Drive**
2. `academy_menma_chakra_knuckle` — **Driving Chakra Fist**

### New exact Academy Menma Kinjutsu Skill

Stable ID:

`academy_menma_forced_chakra_drive`

Display:

**Kinjutsu: Forced Chakra Drive**

Discipline:

`kinjutsu`

Class:

`direct:one hostile`

Authored Attack PL:

**7**

Resolution:

- one direct mitigable Attack-PL packet;
- ordinary Stamina mitigation;
- after a successful committed use, Menma loses **1 underlying Remaining Battle PL** as the exact authored Technique cost;
- the self-cost is Battle capability cost, not Injury;
- it does not mutate Base PL, Current PL outside the Battle ledger, Stats, or persistent development;
- invalid/precommit rejection pays no self-cost;
- the self-cost creates no second enemy damage packet;
- if the exact self-cost reaches 0 Remaining Battle PL, ordinary Battle capability withdrawal semantics apply;
- no Kurama, Nine-Tails, Echo, Hosted-Entity, Fūinjutsu or Transformation source is implied or required.

Kinjutsu-observation semantics:

- a valid committed use is an **actual Kinjutsu action**;
- where the existing Menma/Anko observation contract supplies legitimate observer access/perceptibility and no blocker, it can satisfy the Kinjutsu-observed evidence requirement;
- definition, prepared state, hover, rejected selection or mere Kinjutsu Stat never creates that evidence.

Provenance lock:

- #519 owner correction explicitly requires fresh Academy Menma to possess an actual Kinjutsu starting Skill;
- therefore this exact Skill is authored as **pre-Origin learned Academy Menma capability**;
- it is not an Origin reward and is not backfilled from later Echo/Kurama content;
- Wave-5 generic Kinjutsu rows remain their own rare/restricted catalogue entries and are not auto-granted here;
- Wave-6 Menma Echo/Tailed-Beast rows remain later source/development content and are not used to solve this starting-package requirement.

Why the older five are insufficient:

- Driving Chakra Fist, Crescent Fang, Shattering Blow, Shadow Clone Ambush and Vanishing Step were explicitly non-Kinjutsu under earlier durable authority;
- merely relabelling one of those old generic actions as Kinjutsu would fail the #519 identity/provenance rule;
- the new action therefore has its own stable ID and exact Kinjutsu cost semantics.

Driving Chakra Fist remains the safe ordinary direct alternative and retains its previously signed-off Attack PL **6**.

---

## 4.5 Academy Kushina — PASS

Fresh starting two:

1. `academy_kushina_red_whirlwind` — **Crimson Whirlwind**
2. `academy_kushina_beginner_binding_formula` — **Uzumaki Binding Script**

Identity proof:
- Uzumaki Binding Script is the visible Fūinjutsu/sealing identity anchor;
- Crimson Whirlwind preserves her forceful physical identity;
- no Adamantine Sealing Chains or later mastered Fūinjutsu package is granted early.

---

## 4.6 Academy Kurenai — PASS / stable-ID correction

Fresh starting two:

1. `academy_kurenai_false_step_genjutsu` — **Phantom Petal Step**
2. `academy_kurenai_feinting_kunai` — **Mirage Kunai**

Identity proof:
- the first Skill is explicitly the Genjutsu identity anchor;
- the second gives an ordinary attack lane without replacing her specialist identity.

Correction from the first #573 draft:
- `academy_kurenai_mirage_strike` is not one of the durable signed-off stable IDs and is removed;
- the corrected pair consumes IDs from the existing Academy Kurenai authority.

---

## 4.7 Academy Iwabee — CORRECTED / offensive Earth required

Fresh starting two:

1. `skill_earth_style_stone_shot` — **Earth Style: Stone Shot**
2. `academy_iwabee_iron_staff_smash` — **Stonebreaker Staff**

Identity proof:
- Stone Shot is an existing stable catalogue Skill with discipline `earth`, rarity `normal`, acquisition family `element_training`, and direct Attack PL **14**;
- this fresh Academy Iwabee package explicitly grants the learned access required for that exact catalogue row based on his already-established pre-Origin Earth Release identity;
- Stonebreaker Staff preserves his second defining lane: staff/Bukijutsu-grounded physical combat.

Why Rising Rampart is not sufficient:

- `academy_iwabee_earth_style_rising_wall` / **Earth Style: Rising Rampart** remains a legitimate defensive Earth Skill;
- however #519's owner correction expressly requires an **offensive Earth attack** in Iwabee's exact starting two;
- a defensive wall therefore cannot occupy the mandatory offensive-Earth identity slot.

No duplicate Academy-only Stone Shot ID is created. The existing catalogue Skill is reused with exact Iwabee learned/prepared authority rather than inventing a near-duplicate action.

This change may materially alter the old fresh-Iwabee Origin Battle viability analysis because that analysis assumed his previous five-action package and best direct packet of ATK 6. That older viability proof must not be reused after this package is implemented without recalculation. Combat design here does not silently claim the Battle is now Golden.

---

## 4.8 Academy Metal Lee — PASS

Fresh starting two:

1. `academy_metal_lee_leaf_rising_kick` — **Leaf Rising Heel**
2. `academy_metal_lee_conditioned_endurance` — **Ironbody Conditioning**

Identity proof:
- direct Taijutsu/Strong-Fist lineage expression plus conditioning;
- no later marquee technique is granted merely to make the package look stronger.

---

## 4.9 Academy Obito — CORRECTED / Fire is mandatory

Fresh starting two:

1. `academy_obito_fire_style_ember_burst` — **Fire Style: Cinder Burst**
2. `academy_obito_uchiha_shuriken_rush` — **Uchiha Shuriken Storm**

Identity proof:
- Cinder Burst is the required early Fire Release identity anchor;
- Uchiha Shuriken Storm preserves the second pre-existing Uchiha combat lane.

Provenance proof:
- Cinder Burst is already in the durable Academy Obito prepared palette;
- current World reward authority grants Stat Development for the formal-training route and explicitly does not grant a new Technique;
- therefore Cinder Burst remains pre-Origin/starting capability and must not be removed from the exact two on the theory that he merely "still knows it somewhere".

Correction from the first #573 draft:
- omitting Fire from the exact two was wrong;
- `academy_obito_hot_blooded_charge` was also not the durable machine ID; the old palette uses `academy_obito_headlong_rush` for Hot-Blooded Charge;
- neither error survives this corrected package.

No Sharingan, Kamui, Wood Release or later Obito capability is inferred.

---

## 4.10 Academy Kakashi — PASS

Fresh starting two:

1. `academy_kakashi_clone_feint` — **Clone Switch**
2. `academy_kakashi_opening_exploit` — **Precision Strike**

Identity proof:
- Clone Switch is a Ninjutsu setup;
- Precision Strike is the exact synergistic finisher whose enhanced packet is already separately signed off;
- the pair expresses Academy Kakashi's tactical Ninjutsu/prodigy identity rather than simply selecting his two highest raw-damage buttons.

Existing signed-off numbers remain:
- Precision Strike normal ATK **5**;
- Clone Switch-enhanced Precision Strike ATK **11**.

---

# 5. Ten-Origin identity audit result

| Academy representation | Exact identity anchor inside starting two | Result |
|---|---|---|
| Hinata | Gentle Fist: Flowing Palm / Hyūga Gentle Fist | PASS |
| Wasabi Izuno | Cat Fang Palm / feline Taijutsu | PASS |
| Mirai | Phantom Footfall + Twin Fang Kunai / Genjutsu-deception + weapons | PASS |
| Menma | Kinjutsu: Forced Chakra Drive | **CORRECTED PASS** |
| Kushina | Uzumaki Binding Script / Fūinjutsu | PASS |
| Kurenai | Phantom Petal Step / Genjutsu | PASS |
| Iwabee | Earth Style: Stone Shot / offensive Earth Release | **CORRECTED PASS** |
| Metal Lee | Leaf Rising Heel / Taijutsu | PASS |
| Obito | Fire Style: Cinder Burst / Fire Release | **CORRECTED PASS** |
| Kakashi | Clone Switch / Ninjutsu tactical prodigy | PASS |

This table is the required whole-roster re-audit. The three owner-called defects are fixed, and the source-integrity defects in Wasabi/Kurenai/Obito IDs are also corrected.

---

# 6. Academy old-five preservation / supersession boundary

The old five-Skill Academy palettes remain useful as historical source evidence and Potential/learned capability evidence where separately legitimate, but they no longer define the fresh starting package.

Do not infer:

- a Skill omitted from the fresh two is erased from all possible future access;
- old five-palette order determines the new two;
- old five-palette membership automatically guarantees current learned ownership after a fresh-start migration if the exact migration contract says otherwise;
- a newly introduced fresh Skill grants unrelated catalogue rows.

For persistent existing saves, migration must preserve legitimately committed learned history. This document is not permission to delete player-earned Skills.

---

# 7. Genin exact three-Skill packages — preserved from first #573 pass

The 25-row Genin-v2 set remains exactly three fresh starting Skills per representation:

| Representation | Exact fresh starting three |
|---|---|
| `genin_hashirama` | `skill_ninjutsu_chakra_focus`; `skill_ninjutsu_clone_feint`; `skill_taijutsu_shoulder_break` |
| `genin_hiruzen` | `skill_ninjutsu_chakra_focus`; `skill_taijutsu_counter_palm`; `skill_genjutsu_false_footfall` |
| `genin_mito` | `skill_ninjutsu_chakra_focus`; `skill_fuinjutsu_binding_tag`; `skill_fuinjutsu_restriction_script` |
| `genin_tsunade` | `skill_ninjutsu_chakra_focus`; `skill_taijutsu_rising_knee`; `skill_taijutsu_shoulder_break` |
| `genin_sakumo` | `skill_taijutsu_counter_palm`; `skill_bukijutsu_tanto_draw`; `skill_bukijutsu_short_blade_flurry` |
| `genin_duy` | `skill_ninjutsu_body_replacement`; `skill_taijutsu_rising_knee`; `skill_taijutsu_leaf_sweep` |
| `genin_guy` | `skill_ninjutsu_body_replacement`; `skill_taijutsu_rising_knee`; `skill_taijutsu_spinning_heel` |
| `genin_rin` | `skill_taijutsu_straight_palm`; `skill_medical_mystical_palm_minor`; `skill_medical_chakra_pulse_read` |
| `genin_dan` | `skill_taijutsu_straight_palm`; `skill_genjutsu_false_footfall`; `skill_genjutsu_phantom_wound` |
| `genin_nawaki` | `skill_taijutsu_straight_palm`; `skill_ninjutsu_clone_feint`; `skill_progression_combat_breath` |
| `genin_shizune` | `skill_taijutsu_straight_palm`; `skill_medical_mystical_palm_minor`; `skill_medical_field_stabilisation` |
| `genin_yamato` | `skill_ninjutsu_chakra_focus`; `skill_taijutsu_rising_knee`; `skill_fuinjutsu_binding_tag` |
| `genin_sai` | `skill_taijutsu_straight_palm`; `skill_bukijutsu_kunai_cross_cut`; `skill_bukijutsu_shuriken_fan` |
| `genin_kagami` | `skill_ninjutsu_chakra_focus`; `skill_genjutsu_false_footfall`; `skill_genjutsu_phantom_wound` |
| `genin_danzo` | `skill_taijutsu_straight_palm`; `skill_fuinjutsu_binding_tag`; `skill_genjutsu_false_footfall` |
| `genin_torifu` | `skill_ninjutsu_body_replacement`; `skill_taijutsu_rising_knee`; `skill_taijutsu_shoulder_break` |
| `genin_inoichi` | `skill_taijutsu_straight_palm`; `skill_genjutsu_false_footfall`; `skill_genjutsu_phantom_wound` |
| `genin_choza` | `skill_taijutsu_rising_knee`; `skill_taijutsu_leaf_sweep`; `skill_taijutsu_shoulder_break` |
| `genin_shibi` | `skill_ninjutsu_chakra_focus`; `skill_taijutsu_straight_palm`; `skill_genjutsu_false_footfall` |
| `genin_tsume` | `skill_taijutsu_rising_knee`; `skill_taijutsu_low_line_kick`; `skill_bukijutsu_kunai_cross_cut` |
| `genin_hiashi` | `skill_taijutsu_straight_palm`; `skill_taijutsu_counter_palm`; `skill_taijutsu_guard_breaker` |
| `genin_yugao` | `skill_taijutsu_straight_palm`; `skill_bukijutsu_tanto_draw`; `skill_bukijutsu_short_blade_flurry` |
| `genin_hayate` | `skill_taijutsu_straight_palm`; `skill_bukijutsu_kunai_thrust`; `skill_bukijutsu_short_blade_flurry` |
| `genin_mukai` | `skill_taijutsu_straight_palm`; `skill_taijutsu_counter_palm`; `skill_taijutsu_shoulder_break` |
| `genin_kosuke` | `skill_taijutsu_straight_palm`; `skill_bukijutsu_staff_sweep`; `skill_bukijutsu_shuriken_fan` |

This correction pass did not receive new owner evidence invalidating those 25 rows, so they are preserved rather than churned.

---

# 8. Jōnin boundary

Fresh Jōnin breadth remains:

**exactly 4 starting Skills**.

The current source-first audit still does not expose one consolidated current Jōnin prepared-palette authority comparable to the Academy and Genin source sets.

Therefore this document does **not** fabricate exact Jōnin row contents.

Status:
- Jōnin count = CLOSED;
- Jōnin exact representation rows = NOT YET CLOSED BY THIS DOCUMENT.

---

# 9. Coding contract — after CE reconciliation

Coding must not implement this as catalogue-order truncation.

Forbidden examples:

```js
skills.slice(0, 2)
skills.slice(0, 3)
skills.slice(0, 4)
```

or any equivalent "take first N" logic.

Required implementation shape:

1. explicit per-representation authored starting-Skill allowlists;
2. exact stable IDs from this authority;
3. exact Menma new Skill semantics from section 4.4;
4. explicit Iwabee learned/prepared access to existing `skill_earth_style_stone_shot`;
5. exact Obito Fire Skill in the fresh two;
6. no automatic exposure of omitted catalogue/old-palette Skills;
7. persistent learned history preserved across migration/promotion;
8. temporary Story/source actions remain separate from persistent learned ownership;
9. save/load must not reroll or reorder authored starting packages.

Coding must not infer Stats, PL, rewards or Progression changes from this document.

---

# 10. Deterministic QA requirements

At minimum prove:

1. every fresh Academy representation starts with exactly two authored Skills;
2. all ten exact packages match section 4, not source-array order;
3. Menma starts with `academy_menma_forced_chakra_drive` and it is genuinely discipline `kinjutsu`;
4. a valid Menma Forced Chakra Drive use resolves one ATK7 packet and then exact self-cost 1; invalid precommit pays no cost;
5. Menma Forced Chakra Drive requires no Kurama/Echo/Hosted source and can create Kinjutsu-observation evidence only through valid execution + legitimate observer access;
6. Obito starts with `academy_obito_fire_style_ember_burst` / Fire Style: Cinder Burst;
7. Iwabee starts with `skill_earth_style_stone_shot` / Earth Style: Stone Shot and the action is an offensive direct Earth packet;
8. Wasabi uses `academy_izuno_pouncing_palm`, not the fabricated `academy_izuno_cat_claw_palm`;
9. Kurenai uses durable IDs including `academy_kurenai_false_step_genjutsu`, not fabricated `academy_kurenai_mirage_strike`;
10. Obito's machine ID remains `academy_obito_fire_style_ember_burst` even though the locked display name is Cinder Burst;
11. every Genin-v2 fresh package contains exactly three authored IDs from section 7;
12. no omitted learned Skill is deleted from a persistent Character merely because fresh-start breadth is smaller;
13. promotion does not delete legitimately learned Skills;
14. save/load preserves exact authored learned/prepared state;
15. no `.slice(...)`, object-enumeration order or catalogue order decides representation identity;
16. old Iwabee viability assertions are not reused without recalculation after his offensive Earth starting attack is implemented;
17. Battle action-bar projection shows only currently prepared/legally projectable actions, not every authored catalogue row.

---

# 11. Domain firewall

This Combat document changes only:

- fresh starting Skill identity/content;
- one exact new Academy Menma Kinjutsu action;
- explicit fresh Iwabee learned/prepared binding to an existing Earth catalogue Skill.

It does **not** author:

- Base Stats;
- Formula PL;
- Rank/Promotion semantics;
- Origin rewards;
- acquisition ownership;
- broader Progression gates;
- Story occurrence outcomes;
- World truth;
- UI layout;
- implementation/runtime success.

PL / Registry / Rank issue #582 remains the numeric owner for the separate Academy Stat recalibration.

---

# 12. Final lock

> **Academy fresh representations start with exactly two authored Skills, but two is never allowed to erase identity. Menma's exact two now include a genuine pre-Origin Kinjutsu Skill; Obito's exact two include his already-authoritative Fire Style: Cinder Burst; Iwabee's exact two include an offensive Earth Release attack. All ten Academy packages have been re-audited against the identity-anchor law, and incorrect/fabricated stable IDs from the first #573 pass have been removed. Genin remains exactly three from the preserved 25-row authority. Jōnin remains exactly four, with exact Jōnin row contents still requiring source authority rather than fabrication. Persistent learned history survives migration/promotion; fresh breadth is not a lifetime ceiling.**

Status distinction:

- Academy breadth rule: **CLOSED**
- Academy exact two-Skill Combat design: **CORRECTED / CLOSED**
- Genin breadth + exact 25-row fresh packages: **CLOSED / PRESERVED**
- Jōnin breadth: **CLOSED**
- Jōnin exact rows: **NOT CLOSED HERE**
- CE reconciliation/consumption: **REQUIRED**
- implementation: **NOT YET PROVEN**
- runtime validation: **NOT YET PROVEN**
- Golden/regression: **NOT YET PROVEN**
