# Shinobi Chronicles — Tailed Beast Pair, Snake, and Pakkun PL / Registry Reconciliation

**Date:** 2026-09-18  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING PL / REGISTRY CLOSURE — ISSUE #236 CONSUMED**  
**Source issue:** #236  
**Combat master:** #235  
**Current source baseline inspected:** `12ec215b8674439449d64bdc4aa27e5e7ece5a62`

## 1. Scope

This document closes the PL / Registry dependency opened by Combat master #235 for:

- `shukaku.png` + `one_tail.png`;
- `matatabi.png` + `two_tails.png`;
- `isobu.png` + `three_tails.png`;
- `chomei.png` + `seven_tails.png`;
- `Assets/Summons/snake.png`;
- the Pakkun PL16 vs PL48 discrepancy.

It does **not** author Combat actions, relationship unlock thresholds, acquisition routes, automatic manifestation, live admission, or runtime implementation.

Canonical Stat order remains:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Formula v1.0 remains:

`round(0.60 × highest + 0.25 × average(top 3) + 0.15 × average(all 7))`

No direct or hidden PL bonuses are authorised.

---

## 2. Canon Research First consumed

Canon research was performed before numerical authoring.

Official Naruto material confirms the numbered-name relationships:

- One-Tail = Shukaku;
- Two-Tails = Matatabi;
- Three-Tails = Isobu;
- Seven-Tails = Chōmei.

Canon capability anchors used only to shape Stat emphasis:

- **Shukaku:** sand manipulation, Wind/Earth/Magnet Release, sealing capability and strong defence;
- **Matatabi:** blue-flame Fire Release, high agility/reflexes, powerful physical strikes;
- **Isobu:** Water Release, coral production, heavy shell defence, rolling/spiked-body offence and strong swimming mobility;
- **Chōmei:** flight, scale-powder/blinding utility, insect-like aerial attacks and high durability;
- ordinary Naruto summoning snakes exist separately from named snakes such as Manda and Aoda.

SC-specific authored divergence controls the paired-card meaning below.

---

## 3. Paired Tailed Beast representation rule — CLOSED

Stephen clarified the intended SC distinction using Isobu:

> **Three-Tails** is the wild/pre-cooperation representation.  
> **Isobu** is the friendly/cooperative representation unlocked only after sufficient relationship history.  
> They are the same historical being.

PL / Registry applies that same paired-card structure consistently to the current four numbered/name asset pairs.

### Hard identity rule

Each pair is:

**one persistent Tailed Beast identity + two exact collectible representations**

not two beasts.

The numbered representation is the **wild / pre-cooperation** form.

The personal-name representation is the **cooperative / high-relationship** form.

The numerical difference is not a generic friendship multiplier and does not mean relationship history biologically mutates the beast. Each row is the Base package of that **exact authored representation state**.

Relationship history determines representation eligibility through the owning systems. It does not grant an unlisted +PL bonus.

Persistent beast identity must reserve against simultaneous use of both representations of the same beast.

---

## 4. Exact Tailed Beast Registry / PL closure

All eight rows below are:

- Registry type: **Entity**;
- ontology / lifecycle family: **Tailed Beast**;
- calibrated: **YES**;
- current live-production admission: **NO**;
- production state: **STAGED / CALIBRATED / NOT LIVE**;
- acquisition/relationship unlock: **separately owned**;
- Entity PL transfer to host: **FORBIDDEN**.

| Persistent beast key | Exact representation ID | Display | Relationship state | Base Stats N/T/B/F/K/G/S | Base PL | Collectible card |
|---|---|---|---|---|---:|---|
| `beast_shukaku` | `one_tail` | One-Tail | wild / pre-cooperation | `94/86/52/96/100/44/108` | **103** | `Assets/Tailed Beasts/one_tail.png` |
| `beast_shukaku` | `shukaku` | Shukaku | cooperative / high-relationship | `100/90/54/108/102/50/112` | **107** | `Assets/Tailed Beasts/shukaku.png` |
| `beast_matatabi` | `two_tails` | Two-Tails | wild / pre-cooperation | `98/106/48/54/104/46/108` | **103** | `Assets/Tailed Beasts/two_tails.png` |
| `beast_matatabi` | `matatabi` | Matatabi | cooperative / high-relationship | `104/112/50/58/108/52/112` | **108** | `Assets/Tailed Beasts/matatabi.png` |
| `beast_isobu` | `three_tails` | Three-Tails | wild / pre-cooperation | `92/88/58/56/98/48/112` | **104** | `Assets/Tailed Beasts/three_tails.png` |
| `beast_isobu` | `isobu` | Isobu | cooperative / high-relationship | `98/94/60/62/102/54/116` | **108** | `Assets/Tailed Beasts/isobu.png` |
| `beast_chomei` | `seven_tails` | Seven-Tails | wild / pre-cooperation | `98/102/46/54/100/58/108` | **103** | `Assets/Tailed Beasts/seven_tails.png` |
| `beast_chomei` | `chomei` | Chōmei | cooperative / high-relationship | `104/108/48/58/104/68/112` | **107** | `Assets/Tailed Beasts/chomei.png` |

### Representation-specific calibration intent

#### Shukaku
Shukaku is Fūinjutsu/Kinjutsu/Stamina-forward because sealing, sand control, defence and Magnet/Wind expression are unusually defining for this beast. The cooperative row gains controlled Ninjutsu/Fūinjutsu use and modestly improved total operational expression; this is not a hidden relationship modifier.

#### Matatabi
Matatabi is Taijutsu/Kinjutsu/Stamina-forward, reflecting agility, powerful physical strikes and blue-flame Fire Release. Cooperative Matatabi represents more controlled movement/fire application rather than a new beast.

#### Isobu
Isobu is Stamina/Kinjutsu/Ninjutsu-forward, with the strongest defensive envelope of this four-beast batch and material body-weapon capability through shell/tails. `three_tails` is the wild representation; `isobu` is the exact friendly/cooperative representation Stephen explicitly established.

#### Chōmei
Chōmei is aerial Ninjutsu/Taijutsu/Stamina-forward, with comparatively higher Genjutsu-facing utility to reflect blinding scale-powder and perception-denial expression without treating it as a conventional Genjutsu specialist.

### Formula checks

- `one_tail` raw 102.5619... → **103**
- `shukaku` raw 107.2333... → **107**
- `two_tails` raw 103.3857... → **103**
- `matatabi` raw 107.6381... → **108**
- `three_tails` raw 104.1952... → **104**
- `isobu` raw 108.4905... → **108**
- `seven_tails` raw 102.7619... → **103**
- `chomei` raw 107.1000... → **107**

---

## 5. Tailed Beast presentation / asset status

Current physical card presence does not create live admission.

Current physical portrait evidence at source baseline:

- `three_tails` → `Portraits/Tailed Beasts/three_tails.png` exists;
- `isobu` → `Portraits/Tailed Beasts/three_tails_isobu.png` exists.

Those physical portrait files do not become ratified production mappings merely from presence.

No current dedicated portrait path was located for:

- `one_tail`;
- `shukaku`;
- `two_tails`;
- `matatabi`;
- `seven_tails`;
- `chomei`.

This does not block Combat package authoring under #235.

---

## 6. Generic Snake Summon — CLOSED

Current asset:

`Assets/Summons/snake.png`

Current portrait:

`Portraits/Summons/snake.png`

Exact Registry representation ID:

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

The stable `snake` row represents an ordinary combat-capable summoned snake profile. Individual manifestations may be different ordinary snakes; the collectible row is therefore a generic representation, not proof that every manifestation is one immortal historical snake.

### Base Stats

`30 / 52 / 38 / 12 / 20 / 12 / 48`

### Base PL

**47**

Formula raw result:

`47.242857...` → **47**

Calibration intent:

- Taijutsu/Stamina lead because generic summoned snakes primarily contribute speed, constriction, body movement and physical field pressure;
- Bukijutsu is moderate only as body-weapon/striking utility, not formal weapon mastery;
- Ninjutsu is secondary;
- no named-snake strength, Sage power, venom package, shedding package or special loyalty contract is inherited automatically.

Production state:

**STAGED / CALIBRATED / NOT LIVE**

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

This package is supported by both:

- `Documentation/Registry/Awaiting Placement Additions - Kage Madara and Pakkun.md`;
- current source `AWAITING_OUTSIDE_116_STAGING_MANIFEST`.

Therefore the PL48 row previously reproduced in the max-length successor audit is confirmed **stale reconstruction drift** and is superseded.

### Academy Kakashi relationship

The Academy Kakashi Pakkun Battle source is:

**the same exact Pakkun representation**

not an occurrence-specific weaker Pakkun and not a second Entity identity.

Therefore:

**Pakkun = PL16 everywhere unless a future separately-authored representation is explicitly created.**

No two incompatible PL ledgers may coexist under `pakkun`.

Current production state remains:

**STAGED / NOT LIVE** outside the live-116 production gate, notwithstanding authorised Story/Battle occurrence use.

---

## 8. Host / Jinchūriki anti-double-count rule

For every row in this document:

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

PL / Registry has now closed the #236 blocker required by Combat master #235:

- four persistent Tailed Beast identities reconciled;
- eight exact relationship-state representations calibrated;
- `snake` identity/ontology/Stats/Base PL closed;
- Pakkun PL16 made sole current authoritative package;
- PL48 Pakkun drift retired;
- no new live admission inferred.

Combat may now author exact own-action, relationship/enhancement, manifestation and control packages against these exact representations.

Combat must preserve:

- numbered vs personal-name representation distinction;
- same-beast identity reservation;
- no generic friendship multiplier;
- no wholesale PL transfer;
- no dedicated-host double counting;
- `snake` != Manda/Aoda;
- Pakkun PL16.

---

## 10. Final lock

> **The four new Tailed Beast pairs are not duplicate beasts: each pair is one persistent beast with a wild numbered representation and a cooperative personal-name representation. All eight rows are now calibrated but staged/not-live. `snake` is a generic Summon representation at PL47, not Manda/Aoda. Pakkun is authoritatively PL16 everywhere under exact ID `pakkun`; the old PL48 row is retired as stale reconstruction drift.**
