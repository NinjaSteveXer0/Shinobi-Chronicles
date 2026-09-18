# Shinobi Chronicles — Tailed Beast Pair, Snake, and Pakkun PL / Registry Reconciliation

**Date:** 2026-09-18  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING PL / REGISTRY CLOSURE — SOURCE-AUDITED CORRECTION — ISSUE #236 CONSUMED**  
**Source issue:** #236  
**Combat master:** #235  
**Current live source baseline inspected:** `99257fa50b016a87f34deb7bf82e09ea8058b85b`  
**Current `game.js` blob inspected:** `9a95e018ac76b993c22b62ed6aa02be5520e97b1`

## 1. Scope and supersession

This document closes the PL / Registry dependency opened by Combat master #235 for:

- `shukaku.png` + `one_tail.png`;
- `matatabi.png` + `two_tails.png`;
- `isobu.png` + `three_tails.png`;
- `chomei.png` + `seven_tails.png`;
- `Assets/Summons/snake.png`;
- the Pakkun PL16 vs PL48 discrepancy.

This revision **supersedes the blanket paired-card rule** introduced by commit
`0a51aae9e7c8ccf2c9b5d513bc934e7152b4e478`.

That earlier revision correctly preserved one persistent beast per canonical numbered/name pair, but it incorrectly generalized Stephen's Isobu/Three-Tails relationship-history rule to Shukaku, Matatabi and Chōmei without pair-specific authority.

The correction below is deliberately evidence-specific.

It does **not** author Combat actions, acquisition routes, automatic manifestation, live admission, runtime implementation, or a universal Tailed-Beast friendship mechanic.

Canonical Stat order remains:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Formula v1.0 remains:

`round(0.60 × highest + 0.25 × average(top 3) + 0.15 × average(all 7))`

No direct or hidden PL bonuses are authorised.

---

## 2. Source-first and Canon Research First audit

### 2.1 Current SC source state

At the source baseline above:

- active production Registry = **97 Characters + 18 Entities = 115**;
- Teen Nagato is retired from the live runtime projection;
- none of `one_tail`, `shukaku`, `two_tails`, `matatabi`, `three_tails`, `isobu`, `chomei`, `seven_tails`, or `snake` is present in the live `entityRegistry` / `ALPHA_PRODUCTION_ENTITY_IDS`;
- Pakkun remains outside the live 115 and is represented in `AWAITING_OUTSIDE_116_STAGING_MANIFEST` at PL16;
- physical card/portrait presence remains separate from Registry admission and runtime implementation.

Therefore every new calibration in this document is **durable PL/Registry authority only** until a separate implementation/admission owner consumes it.

### 2.2 Canon identity anchors

Official NARUTO material confirms the canonical numbered/name relationships:

- One Tail = Shukaku;
- Two Tails = Matatabi;
- Three Tails = Isobu;
- Seven Tails = Chōmei.

Official material also distinguishes generic summoned/ninja snakes from named snakes such as Aoda. SC therefore does not need to reinterpret every generic snake asset as Manda/Aoda.

Canon identity equivalence does **not** itself decide SC collectible-representation semantics.

Preserve:

**same canonical beast != automatically one exact collectible representation**

**two physical cards != automatically two Registry representations**

### 2.3 Pair-specific SC evidence recovered

#### Shukaku / One-Tail

Stephen previously defined:

> "One Tail is the unfriendly version and the named version, ie, Shukaku, is the friendly version"

This is sufficient to retain two exact collectible representations of one persistent Shukaku identity.

It does **not** authorize copying Isobu's exact relationship-history threshold.

#### Matatabi / Two-Tails

Recovered Character Creation authoring evidence explicitly defined the personal-name card as the **named/friendly Matatabi**, contrasted with the hostile **Two-Tails encounter representation**.

This is sufficient to retain two exact collectible representations of one persistent Matatabi identity.

It does **not** authorize copying Isobu's exact relationship-history threshold.

#### Isobu / Three-Tails

Stephen explicitly closed the current distinction:

- `three_tails` = wild / uncooperative representation before sufficient relationship history;
- `isobu` = friendly / cooperative representation after sufficient relationship history;
- both are the same persistent being.

Relationship history is therefore an explicit eligibility/access distinction for this pair.

#### Chōmei / Seven-Tails

No pair-specific SC authority was found that defines `chomei` and `seven_tails` as different wild/cooperative, historical/body, relationship-history, or other exact representation states.

Recovered project evidence uses Chōmei / Seven-Tails as names for the same beast rather than defining two states.

Therefore PL / Registry must **not mint two numerical representations merely because both PNGs exist**.

---

## 3. Exact persistent-identity / representation closure

### 3.1 Shukaku

Persistent Entity key:

`beast_shukaku`

Accepted exact representations:

- `one_tail` — One-Tail — **unfriendly / non-cooperative representation**;
- `shukaku` — Shukaku — **friendly / cooperative named representation**.

Same persistent beast; both exact representations reserve against simultaneous duplicate use.

No Isobu-style numeric relationship threshold is authored here.

### 3.2 Matatabi

Persistent Entity key:

`beast_matatabi`

Accepted exact representations:

- `two_tails` — Two-Tails — **hostile encounter representation**;
- `matatabi` — Matatabi — **named / friendly / cooperative representation**.

Same persistent beast; both exact representations reserve against simultaneous duplicate use.

No Isobu-style numeric relationship threshold is authored here.

### 3.3 Isobu

Persistent Entity key:

`beast_isobu`

Accepted exact representations:

- `three_tails` — Three-Tails — **wild / pre-cooperation representation**;
- `isobu` — Isobu — **friendly / cooperative high-relationship representation**.

Same persistent beast; both exact representations reserve against simultaneous duplicate use.

This pair alone currently carries Stephen's explicit relationship-history eligibility rule.

### 3.4 Chōmei

Persistent Entity key:

`beast_chomei`

Accepted exact Registry representation:

- `chomei` — Chōmei / Seven-Tails.

`Assets/Tailed Beasts/chomei.png` and `Assets/Tailed Beasts/seven_tails.png` are both physical presentation sources for the same canonical beast family, but current authority does **not** establish a second exact `seven_tails` Registry representation.

Therefore:

- `seven_tails` is **NOT** a separately calibrated Registry ID in this closure;
- the prior PL103 `seven_tails` row is **RETIRED / SUPERSEDED**;
- physical `seven_tails.png` remains an unratified alternate presentation asset until Assets/Registry authority explicitly gives it a distinct representation purpose or maps it as alternate art;
- no second Chōmei ownership record, persistent beast, PL ledger, or simultaneous slot is created.

This is a pair-specific reconciliation, not a global rule for numbered/name Tailed-Beast assets.

---

## 4. Accepted Tailed Beast Base Stats / Base PL

All accepted rows below are:

- Registry parent type: **Entity**;
- family: **Tailed Beast**;
- durable PL calibration: **CLOSED**;
- current live-production admission: **NO**;
- current runtime Entity Registry implementation: **NO**;
- current runtime staging-manifest implementation: **NO**;
- Entity PL transfer to host: **FORBIDDEN**.

| Persistent beast key | Exact representation ID | Display | Exact representation state | Base Stats N/T/B/F/K/G/S | Base PL | Physical card |
|---|---|---|---|---|---:|---|
| `beast_shukaku` | `one_tail` | One-Tail | unfriendly / non-cooperative | `94/86/52/96/100/44/108` | **103** | `Assets/Tailed Beasts/one_tail.png` |
| `beast_shukaku` | `shukaku` | Shukaku | friendly / cooperative named | `100/90/54/108/102/50/112` | **107** | `Assets/Tailed Beasts/shukaku.png` |
| `beast_matatabi` | `two_tails` | Two-Tails | hostile encounter | `98/106/48/54/104/46/108` | **103** | `Assets/Tailed Beasts/two_tails.png` |
| `beast_matatabi` | `matatabi` | Matatabi | named / friendly / cooperative | `104/112/50/58/108/52/112` | **108** | `Assets/Tailed Beasts/matatabi.png` |
| `beast_isobu` | `three_tails` | Three-Tails | wild / pre-cooperation | `92/88/58/56/98/48/112` | **104** | `Assets/Tailed Beasts/three_tails.png` |
| `beast_isobu` | `isobu` | Isobu | friendly / cooperative high-relationship | `98/94/60/62/102/54/116` | **108** | `Assets/Tailed Beasts/isobu.png` |
| `beast_chomei` | `chomei` | Chōmei / Seven-Tails | single accepted exact representation; no second state authored | `104/108/48/58/104/68/112` | **107** | `Assets/Tailed Beasts/chomei.png`; `seven_tails.png` remains alternate/unratified |

### Formula checks

- `one_tail` raw 102.5619... → **103**
- `shukaku` raw 107.2333... → **107**
- `two_tails` raw 103.3857... → **103**
- `matatabi` raw 107.6381... → **108**
- `three_tails` raw 104.1952... → **104**
- `isobu` raw 108.4905... → **108**
- `chomei` raw 107.1000... → **107**

The Stats above are exact representation Base packages, not additive relationship bonuses.

For Shukaku and Matatabi, the pair distinction is presentation/relationship-state authority but the exact acquisition/unlock gate remains separately owned.

For Isobu, relationship history is explicitly part of representation eligibility.

For Chōmei, no second state exists in current authority.

---

## 5. Current source anchors — stale handoff numerics corrected

Issue #236 and the opening Combat master reproduced several historical working anchors that no longer match current `game.js`.

Live source wins.

This section does **not** recalibrate those existing live Entities; it records their current source truth so downstream Combat does not freeze stale handoff numbers.

| Existing source | Current `game.js` Base PL |
|---|---:|
| `de_baku` | **64** |
| `gamakichi` | **71** |
| `ibuse` | **70** |
| `key_gero` | **53** |
| `mirage_clam` | **76** |
| `mk_enma` | **83** |
| `wr_kamatari` | **77** |
| `nue` | **100** |
| `kurama_complete` | **138** |
| `nine_tails` | **117** |
| `yang_kurama` | **122** |
| `yin_kurama` | **122** |
| `menma_kurama` | **124** |
| `menma_nine_tails` | **117** |
| `breakout_kurama` | **117** |

`reborn_kurama` remains outside the live 115 in the awaiting/staged source at **PL112**.

Consequences for Combat #235:

- a proposal using Mirage Clam PL66 is stale; current source is **PL76**;
- a proposal using Enma PL77 is stale; current source is **PL83**;
- Kamatari current source is **PL77**, not PL82;
- Kurama-family work must consume current source values above rather than the opening handoff list.

No PL/Registry document should silently rewrite current live source merely to preserve an older audit table.

---

## 6. Generic Snake Summon — CLOSED

Current physical sources:

- `Assets/Summons/snake.png`;
- `Portraits/Summons/snake.png`.

Project source history commit:

`dd7bac6cb3d8a31c8667b6f120d0dd51567b7725` — **"added snake summon and portrait"**

Exact stable Registry representation ID:

`snake`

Display:

**Snake**

Registry type:

**Entity**

Ontology / lifecycle:

**Summon**

Identity mode:

**generic summoned-snake representation**

This is **not**:

- Manda;
- Aoda;
- Manda II;
- another named Ryūchi Cave individual;
- a hidden alias for any named snake.

The project source history establishes that the asset was authored as a snake Summon. Canon independently supports generic snake summoning as distinct from named individual snakes.

### Base Stats

`30 / 52 / 38 / 12 / 20 / 12 / 48`

### Base PL

**47**

Formula raw result:

`47.242857...` → **47**

Calibration intent:

- Taijutsu/Stamina lead for physical movement, constriction and field pressure;
- Bukijutsu is moderate body-weapon utility, not formal weapon mastery;
- Ninjutsu is secondary;
- no named-snake strength, Sage package, venom package, shedding package, loyalty contract, or named-snake history is inherited automatically.

State:

**DURABLY CALIBRATED / NOT LIVE / RUNTIME REGISTRY NOT IMPLEMENTED**

Card/portrait presence does not create acquisition, ownership, contract access or automatic Battle manifestation.

---

## 7. Pakkun discrepancy — CLOSED / PL48 RETIRED

Exact stable Registry ID:

`pakkun`

Display:

**Pakkun**

Registry type:

**Entity**

Ontology:

**Summon**

Current authoritative Base Stats:

`13 / 16 / 6 / 4 / 4 / 9 / 18`

Current authoritative Base PL:

**16**

Formula raw result:

`16.2166...` → **16**

This package is supported by:

- `Documentation/Registry/Awaiting Placement Additions - Kage Madara and Pakkun.md`;
- `Documentation/SC_Combat_Pakkun_Summon_Action_Closure_2026-09-05.md`;
- `Documentation/Combat/SC_Combat_Academy_Kakashi_Sequential_AMT_Pakkun_Final_Viability_Closure_2026-09-16.md`;
- current source `AWAITING_OUTSIDE_116_STAGING_MANIFEST`.

Therefore the PL48 row previously reproduced in the max-length successor audit is confirmed **stale reconstruction drift** and is superseded.

### Academy Kakashi occurrence

The Academy Kakashi occurrence handle:

`pakkun_origin_unfamiliar_ninken`

does **not** create a second weaker Pakkun Registry representation.

It is an occurrence/access presentation for the same persistent `pakkun` source under temporary Story-authorised participation.

Therefore:

**Pakkun Base PL = 16 under exact Registry ID `pakkun`.**

The Academy occurrence may own temporary access/action-economy semantics without owning a second Base Stats/Base PL package.

No two incompatible PL ledgers may coexist under one exact Pakkun representation.

Current state:

**STAGED OUTSIDE LIVE 115 / NOT LIVE**

---

## 8. Host / Jinchūriki anti-double-count rule

For every Entity package in this document:

**Entity PL does not transfer wholesale to a host.**

Never:

`host PL + beast PL`

Relationship mechanics may later provide:

- source-owned Stat modifiers;
- exact assisted Skills;
- exact affinity/control/guard/recovery effects;
- independent manifestation using the Entity's own Battle PL/action economy;

only when Combat and the relevant relationship/access owner author them.

Dedicated Character representations that already embody a beast state must not receive that same beast relationship package again.

Existing examples include:

- `jinchuriki_sakura_chomei`;
- `jinchuriki_tobirama_shukaku`;
- `jinchuriki_shikamaru_yang`;
- `jinchuriki_shikamaru_yin`;
- `jinchuriki_naruto_v1`;
- `jinchuriki_naruto_v2`;
- `one_tailed_chakra_cloak_menma`;
- `kurama_resonance_himawari`.

---

## 9. Downstream Combat release

PL / Registry has now source-audited and closed the #236 dependency required by Combat master #235:

- Shukaku: one persistent beast, two evidenced exact representations, both calibrated;
- Matatabi: one persistent beast, two evidenced exact representations, both calibrated;
- Isobu: one persistent beast, two explicitly relationship-history representations, both calibrated;
- Chōmei: one persistent beast, **one accepted exact Registry representation**; unsupported second `seven_tails` PL row retired;
- `snake`: generic Summon identity/ontology/Stats/Base PL closed at PL47;
- Pakkun: PL16 is the sole current Base package; PL48 retired;
- current live Registry baseline confirmed at **97 Characters + 18 Entities = 115**;
- stale existing-Entity handoff PL values corrected to current `game.js` source truth;
- no new live admission inferred.

Combat may now author exact own-action, relationship/enhancement, manifestation and control packages against the accepted rows above.

Combat must preserve:

- pair-specific evidence rather than a universal numbered-vs-name rule;
- no Isobu relationship-history threshold copied to Shukaku or Matatabi without new authority;
- no second `seven_tails` PL package unless a genuinely distinct representation is later authored;
- same-beast identity reservation;
- no generic friendship multiplier;
- no wholesale PL transfer;
- no dedicated-host double counting;
- `snake` != Manda/Aoda;
- Pakkun PL16;
- current live source PL values, not stale master-plan anchor text.

---

## 10. Final lock

> **#236 is closed by pair-specific evidence, not by a universal naming pattern. Shukaku/One-Tail, Matatabi/Two-Tails, and Isobu/Three-Tails each retain two exact representations of one persistent beast because project authority supports those distinctions; only Isobu currently has an explicit relationship-history eligibility rule. Chōmei/Seven-Tails has no authored two-state distinction, so `chomei` is the sole accepted Registry representation at PL107 and the former separate `seven_tails` PL103 row is retired. `snake` is a generic Summon at PL47. Pakkun is PL16 under one exact Registry representation. Current live production remains 97 Characters + 18 Entities = 115, and downstream Combat must consume current `game.js` PL anchors rather than stale handoff numerics.**
