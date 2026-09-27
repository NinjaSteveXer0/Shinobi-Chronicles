# Shinobi Chronicles — RESET v2 Source 11 Proposal: Shukaku / One-Tail

**Date:** 2026-09-27  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons / Tailed Beasts  
**Status:** **PROPOSED — AWAITING STEPHEN SIGN-OFF**  
**Parent:** #235  
**Reset authority:** `Documentation/Combat/SC_Combat_Summons_Tailed_Beasts_Full_Calibration_RESET_v2_2026-09-18.md`  
**Canon research:** `Documentation/Combat/SC_Combat_Tailed_Beasts_Canon_Research_Shukaku_Matatabi_Isobu_Chomei_2026-09-27.md`  
**PL / Registry authority:** `Documentation/Registry/Tailed Beast Pair Snake and Pakkun PL Registry Reconciliation 2026-09-18.md`

---

# A. Identity / PL

Persistent Entity key:

`beast_shukaku`

Accepted exact representations:

## `one_tail` — One-Tail

Relationship state:

**unfriendly / non-cooperative**

Base Stats:

- Ninjutsu **94**
- Taijutsu **86**
- Bukijutsu **52**
- Fūinjutsu **96**
- Kinjutsu **100**
- Genjutsu **44**
- Stamina **108**

Base PL:

**103**

## `shukaku` — Shukaku

Relationship state:

**friendly / cooperative named representation**

Base Stats:

- Ninjutsu **100**
- Taijutsu **90**
- Bukijutsu **54**
- Fūinjutsu **108**
- Kinjutsu **102**
- Genjutsu **50**
- Stamina **112**

Base PL:

**107**

Same persistent beast.

The two exact representations reserve against simultaneous duplicate use.

No Entity PL transfers wholesale to a host.

---

# B. Canon fingerprint

Shukaku's secure canon identity is:

**SAND / WIND / FŪINJUTSU / DEFENSIVE SEALING**

Secure anchors consumed before mechanics:

- Shukaku is the One-Tail;
- sand-based body and sand manipulation are central to the source;
- Wind Release: Drilling Air Bullet is manga-supported;
- Shukaku possesses strong sealing capability through its natural cursed markings;
- Shukaku is proud of its defence;
- Shukaku + Gaara cooperative Wind Release: Sand Buckshot is manga-supported;
- Earth Release / Magnet Release are part of Shukaku's canon nature capability, but host access is NOT inferred automatically;
- Shukaku is not cleanly shown personally using Tailed Beast Ball in the manga.

Do not infer:

- Gaara's entire sand repertoire;
- blanket physical immunity;
- infinite sand regeneration;
- automatic Magnet Release access for a host;
- generic sleep mechanics;
- a personal Shukaku Tailed Beast Ball button merely because Tailed Beast Ball is a family technique.

---

# C. Representation design law

The two cards share one beast and therefore share the same **core manifested own-action identity**.

Their key difference is relationship access:

## One-Tail

`one_tail` represents a non-cooperative Shukaku relationship.

It receives:

- Shukaku's own manifested action package when an exact lifecycle legitimately manifests the beast;
- **no automatic host-facing cooperative Enhancement**;
- **no cooperative Sand Buckshot host assist**.

This is deliberate.

RESET v2 does not require Combat to invent a fake passive bonus for a beast that is not cooperating.

Any future coercive/partial-access Jinchūriki package must be separately authored through the future Tailed-Beast host/control system.

## Shukaku

`shukaku` represents genuine cooperative relationship state.

It receives:

- the same Shukaku own-action package;
- the **Living Seal Markings** host Enhancement;
- access to the exact cooperative **Wind Release: Sand Buckshot** assist when the host also has legitimate sand-manipulation capability.

Preserve:

> **same beast != same relationship access**

> **non-cooperative manifestation != cooperative host Enhancement**

---

# D. Lifecycle / action economy

Tailed Beast is not an ordinary Summon.

## HOSTED / SEALED

An exact host relationship does not automatically create:

- a second Battle participant;
- a second turn;
- a second Battle PL ledger;
- Entity PL transfer.

Relationship-state Enhancements / assisted Skills use the host's normal action economy unless an exact action says otherwise.

## INDEPENDENT / MANIFESTED

Where an authored Battle/event lifecycle legitimately manifests Shukaku as an acting participant:

- Shukaku becomes independently targetable;
- use that exact representation's own Battle PL ledger;
- Shukaku receives the action opportunities authored by that manifestation lifecycle;
- own Entity actions below become executable;
- host does not also receive a duplicate independent Shukaku body/source package.

Exact Jinchūriki transformation/partial-cloak manifestation remains separately authored.

---

# E. Core manifested own Skill kit — shared by One-Tail and Shukaku

## 1. `shukaku_drilling_air_bullet` — **Wind Release: Drilling Air Bullet**

Class:

**ATTACK / WIND RELEASE**

Target:

one hostile

ATK:

**44**

Player text:

> **Blast one enemy with a compressed Wind projectile for 44 ATK.**

Rules:

- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- no automatic Stun;
- no automatic displacement;
- no invented accuracy roll;
- does not grant Wind Release to a host.

This is the reliable high-pressure ranged attack.

---

## 2. `shukaku_sand_binding_crush` — **Sand Binding Crush**

Class:

**ATTACK / SAND CONTROL**

Target:

one hostile

ATK:

**32**

Player text:

> **Crush one enemy with sand for 32 ATK. If it deals damage, their footing stays buried and they cannot reposition or escape on their next action.**

Rules:

- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- if positive final damage is dealt, apply `shukaku_buried_footing`;
- duration: through the target's next action opportunity;
- blocks ordinary movement / reposition / escape actions;
- attacks, defence and support that do not require substantial free movement remain legal;
- exact anti-restraint / space-time / superior-movement authority may override where explicitly authored;
- not Stun.

This expresses Shukaku's sand as battlefield control rather than generic bonus damage.

---

## 3. `shukaku_sandstorm_barrage` — **Sandstorm Barrage**

Class:

**ATTACK / AREA / SAND**

Target:

up to **3 legally exposed hostiles**

ATK:

**34 each**

Player text:

> **Drive a sandstorm through up to 3 exposed enemies for 34 ATK each.**

Rules:

- one direct packet per target;
- ordinary Stamina mitigation independently;
- no random miss;
- no automatic Blind;
- no automatic terrain destruction;
- does not target waiting/Benched/Reserve slots merely because it is area-capable.

This is Shukaku's broad pressure option without inventing a generic status rider.

---

## 4. `shukaku_cursed_seal_lock` — **Cursed Seal Lock**

Class:

**CONTROL / FŪINJUTSU**

Limit:

**once per Battle**

Target:

one hostile with a currently addressable transformation / manifestation / hosted-power activation route.

Player text:

> **Seal one enemy's transformation or hosted-power route. They cannot activate that route on their next action.**

Exact mechanics:

- no direct damage;
- on valid commit apply `shukaku_cursed_seal_lock`;
- duration: through target's next action opportunity;
- blocks activation of one exact legally addressable:
  - transformation route;
  - forced/voluntary manifestation route;
  - hosted-source activation route;
- ordinary attacks / defence / support remain available unless they independently require the blocked route;
- does not remove an already-active transformation unless an exact later Skill says so;
- exact superior seal-breaking / anti-Fūinjutsu authority may remove or override it;
- if target has no legally addressable qualifying route, this Skill is invalid precommit and the once-per-Battle use is not consumed.

This makes Shukaku's sealing identity mechanically distinct instead of turning Fūinjutsu into another damage type.

---

## 5. `shukaku_sand_reformation` — **Sand Reformation**

Class:

**REACTION / DEFENSE / BODY PROPERTY**

Limit:

**once per Battle**

Trigger:

Shukaku is targeted by one direct **Taijutsu or Bukijutsu** Attack-PL packet.

Player text:

> **Break Shukaku's body into sand around one physical hit, cutting that attack's ATK by 55%.**

Effect:

- reduce that qualifying direct Attack-PL packet by **55% pre-Stamina**;
- ordinary Stamina then resolves against the reduced packet;
- no effect against direct Ninjutsu / Kinjutsu packets, Genjutsu, control-only effects or Story consequences;
- no second capacity pool;
- no permanent physical immunity;
- no healing packet is created.

This converts Shukaku's sand body into bounded physical resilience without claiming infinite regeneration.

---

# F. Cooperative Shukaku Enhancement

Available only from the cooperative named representation:

`shukaku`

## `shukaku_living_seal_markings` — **Living Seal Markings**

Activation:

**HOSTED / BONDED / COOPERATIVE**

Player text:

> **While Shukaku is genuinely cooperating with you, gain +10 Fūinjutsu. Once per Battle, Shukaku can reinforce one successful Fūinjutsu control or containment effect so ordinary escape cannot break it early.**

### Effective Stat modifier

While the exact cooperative Shukaku relationship is active:

- controller **Effective Fūinjutsu +10**;
- source-owned modifier;
- recompute Effective PL normally from Stats;
- no Base Stat mutation;
- removal/loss of the valid source removes the modifier;
- no new Fūinjutsu technique access is granted.

### Seal Reinforcement

Limit:

**once per Battle**

Trigger:

- controller commits a legitimate Fūinjutsu **control / containment / restraint** action;
- that action successfully establishes its authored persistent control state.

Effect:

- mark that exact state `shukaku_reinforced_seal`;
- ordinary movement/escape cannot remove the state early if the underlying seal already prohibits that route;
- generic non-seal control-clear effects do not remove it merely by being generic clears;
- exact **seal-breaking / anti-Fūinjutsu / superior source-specific escape** may still remove or override it;
- the seal otherwise expires on its own authored duration;
- no duration extension is added unless the underlying technique already provides one;
- no additional damage packet is created.

Decision:

> **Use Shukaku's reinforcement on the seal that matters most, rather than receiving a permanent universal control bonus.**

### Explicit exclusions

Living Seal Markings does NOT grant:

- Magnet Release;
- sand manipulation;
- Gaara techniques;
- new Fūinjutsu Skills;
- a second action;
- Shukaku PL;
- generic immunity to seal breaking.

---

# G. Cooperative source-assisted Skill

## `shukaku_wind_release_sand_buckshot` — **Wind Release: Sand Buckshot**

Classification:

**COOPERATIVE HOST + SHUKAKU ASSISTED ATTACK**

Availability requirements:

- exact cooperative `shukaku` relationship is currently valid;
- controller already possesses legitimate **sand-manipulation / sand-control capability** from their own exact source/history;
- Shukaku is available as the cooperative causal source;
- exact future progression/access contract has not removed the Skill.

Limit:

**once per Battle**

Target:

up to **3 legally exposed hostiles**

ATK:

**38 each**

Player text:

> **If you can already control sand, combine it with Shukaku's Wind Release to blast up to 3 exposed enemies for 38 ATK each.**

Rules:

- host owns the action opportunity;
- Shukaku is a causal assisted source, not a second action;
- one direct Attack-PL packet per target;
- ordinary Stamina mitigation;
- classification: **Wind Release + sand-assisted Ninjutsu**;
- no automatic Bleed / Blind / Stun;
- no automatic battlefield destruction;
- no waiting-slot target bypass;
- no sand capability is granted by Shukaku merely to make this Skill usable;
- if the host lacks legitimate sand-control capability, the Skill is unavailable.

Canon basis:

Shukaku + Gaara cooperatively use Wind Release: Sand Buckshot.

SC adaptation:

The technique is available only when **both halves of the interaction are actually present**:
- a legitimate sand-controlling host;
- cooperative Shukaku supplying the Wind contribution.

---

# H. Counterplay / drawbacks

## One-Tail relationship state

The strongest drawback is relationship itself:

- no cooperative host Enhancement;
- no cooperative Sand Buckshot assist;
- future coerced/partial power must be authored separately rather than inferred.

## Sand control

- Sand Binding Crush is movement-specific, not Stun;
- exact anti-restraint / superior movement remains counterplay.

## Cursed Seal Lock

- only valid against an exact addressable transformation / manifestation / hosted-power route;
- does not remove an already-active state;
- exact anti-Fūinjutsu / seal-breaking can counter it.

## Sand Reformation

- one use per Battle;
- physical Tai/Buki packets only;
- Ninjutsu/Kinjutsu and non-packet control remain normal counterplay.

No arbitrary Water weakness, Lightning weakness or generic elemental chart is created.

---

# I. Persistent / non-Battle utility

No generic account-wide persistent bonus is proposed for Shukaku.

No speculative "sand treasure finder", seal-reading omniscience, desert travel immunity or automatic excavation capability is invented without World/Story authority.

Shukaku's meaningful persistent difference in this package is the **relationship-state access** to Living Seal Markings and the assisted Sand Buckshot technique.

---

# J. Dedicated representation / anti-double-count exclusions

Do not:

- add `one_tail` PL103 to a host;
- add `shukaku` PL107 to a host;
- stack both exact representations simultaneously;
- apply Living Seal Markings to a dedicated Character representation that already embodies this exact Shukaku relationship modifier package in its Base Stats/PL;
- apply the same assisted Sand Buckshot source package twice through both a dedicated Jinchūriki representation and attached Shukaku;
- infer Gaara's personal sand toolkit from Shukaku alone;
- infer Magnet Release on an arbitrary host;
- infer Tailed Beast Ball as a Shukaku own action from family membership alone.

Known project anti-double-count example:

- dedicated Shukaku Jinchūriki representations such as the existing Tobirama–Shukaku variant must be audited in Batch 5 before this relationship package can be layered onto them.

---

# K. Player-facing summary

## ONE-TAIL — NON-COOPERATIVE SAND / WIND / SEALING BEAST

> **Manifest One-Tail to use Shukaku's sand, Wind Release and sealing attacks. Because this representation is not cooperating with its host, it does not grant the cooperative Shukaku Enhancement or Sand Buckshot assist.**

## SHUKAKU — COOPERATIVE SAND / WIND / SEALING PARTNER

> **Cooperative Shukaku gives +10 Fūinjutsu and can reinforce one successful seal each Battle. Shukaku's own manifested kit controls movement, blocks transformation routes and resists one physical hit by reforming as sand. If the host already controls sand, the pair can use Wind Release: Sand Buckshot once per Battle.**

---

# L. Decision state

**Identity / Base Stats / Base PL:** CLOSED by PL / Registry.  
**Canon research:** COMPLETE.  
**Core own manifested kit:** PROPOSED.  
**One-Tail host Enhancement:** **NONE while non-cooperative — PROPOSED.**  
**Cooperative Shukaku Enhancement:** **Living Seal Markings — PROPOSED.**  
**Living Seal Markings Fūinjutsu modifier:** **+10 Effective Fūinjutsu — PROPOSED.**  
**Seal Reinforcement:** **once/Battle — PROPOSED.**  
**Cooperative assisted Skill:** **Wind Release: Sand Buckshot ATK38 each up to 3, once/Battle — PROPOSED.**  
**Tailed Beast Ball:** **NOT in proposed Shukaku own kit.**  
**Implementation:** NOT STARTED.  
**Runtime validation:** NOT CLAIMED.  
**Golden:** NOT CLAIMED.

**Awaiting Stephen sign-off / edits.**

**proposal != design closed != implemented != runtime validated != Golden GREEN**
