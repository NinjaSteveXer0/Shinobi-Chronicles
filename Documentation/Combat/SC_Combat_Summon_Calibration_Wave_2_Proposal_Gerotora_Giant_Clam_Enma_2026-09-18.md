# Shinobi Chronicles — Summon Calibration Wave 2 Proposal: Gerotora, Giant Clam, Monkey King Enma

**Date:** 2026-09-18  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **PROPOSED FOR STEPHEN SIGN-OFF — NOT YET BINDING COMBAT CLOSURE**  
**Parent:** #235

Consumes existing Registry/PL anchors:

- `key_gero` — **Gerotora** — Stats `34 / 20 / 8 / 62 / 38 / 28 / 32` — PL **53**
- `mirage_clam` — **Giant Clam** — Stats `44 / 24 / 10 / 52 / 32 / 74 / 58` — PL **66**
- `mk_enma` — **Monkey King Enma** — Stats `68 / 78 / 62 / 24 / 50 / 30 / 84` — PL **77**

No Entity PL transfers wholesale to a controller.

---

# 1. Gerotora / Key Gero — `key_gero`

## Canon anchor

Gerotora is a scroll toad trusted with the key to Naruto's Eight Trigrams Seal. The key can strengthen or deliberately loosen that exact seal. Gerotora is a keeper/administrator of sealing access, not a conventional damage-focused battle animal.

## Proposed lifecycle

Gerotora is a **support Summon**.

Default active mode:

- attached/contract support source;
- no second deployment slot;
- no independent recurring Battle turn;
- no second Battle PL ledger while attached;
- Gerotora-assisted actions consume the controller's normal action opportunity;
- no passive Stat or PL donation.

If a future Story occurrence manifests Gerotora as an independently targetable participant, that occurrence may give him his own PL53 ledger, but this wave does not make ordinary Gerotora use a free extra battle body by default.

## Proposed assisted actions

### `key_gero_seal_integrity_read` — **Seal Integrity Check**

INFO / self or one exact compatible seal source

> Check whether a compatible seal is stable, weakened or being tampered with.

- deals no damage;
- records only legitimately available seal-condition evidence;
- does not reveal an unknown full formula, hidden identity or unrelated Fūinjutsu Knowledge.

### `key_gero_emergency_reinforcement` — **Emergency Reseal**

SUPPORT / exact compatible hosted-beast seal / once per Battle

> Reinforce a weakening beast seal and stop one forced-release escalation.

- remove one exact compatible source-owned seal-destabilisation / forced-release escalation marker;
- does not heal Battle PL;
- does not erase legitimate already-committed History;
- does not permanently strengthen the seal;
- does not grant control over the hosted beast.

### `key_gero_key_lock` — **Lock the Seal**

DEFENSE / relationship / once per Battle

> Block one hostile attempt to force open or tamper with the linked beast seal.

- one compatible hostile seal-opening / forced-control / extraction-adjacent attempt must resolve as blocked by the key lock;
- voluntary host/beast cooperation is not blocked;
- not universal extraction immunity.

### `key_gero_measured_release` — **Measured Release**

SETUP / self / once per Battle

> Open the seal only as far as your current beast relationship already allows.

Requirements:

- exact compatible hosted-beast seal;
- legitimate current hosted source;
- the actor already has the required learned Skill/access.

Effect:

- establish one `gerotora_measured_release` marker;
- the actor's next exact compatible hosted-beast Skill that is blocked **only by the seal-aperture state** may resolve;
- this does not grant a new Skill, new relationship level, beast cooperation, Stats, PL, transformation or second action;
- marker is consumed by that action and expires at Battle end.

## Relationship package

No passive stats.

Gerotora's value is **seal control**:

- diagnose;
- reinforce;
- lock against hostile tampering;
- deliberately open a legitimate existing access route.

Player-facing shorthand:

> **Gerotora manages Tailed-Beast seals. He can reinforce a weakening seal, block hostile tampering, or carefully open access you have already earned.**

---

# 2. Giant Clam — `mirage_clam`

## Canon anchor

Gengetsu's Giant Clam produces the mist used for Demonic Illusion: Steaming Multistoried Building. The collaboration creates highly convincing mirages that conceal the real location of both summoner and clam. Destroying/finding the real clam breaks the effect. The shell is notably durable.

## Proposed lifecycle

Full independent manifested Summon:

- own PL66 Battle ledger;
- independently targetable;
- own action opportunity;
- no PL/Stat donation to the summoner.

The full mirage requires **both**:

1. manifested Giant Clam; and
2. a controller with an exact compatible learned mirage/genjutsu collaboration.

The Clam does not grant Genjutsu mastery merely by being owned.

## Proposed own actions

### `mirage_clam_mist_exhalation` — **Mirage Mist**

SETUP / battlefield

> Fill the battlefield with the mist needed for a mirage.

- deals no damage;
- establish `giant_clam_mist_source`;
- lasts until Clam is depleted/dismissed or the source is explicitly cleared;
- by itself, mist does not create the full mirage.

### `mirage_clam_shell_bastion` — **Shell Bastion**

DEFENSE / self

> Close the shell and absorb the next direct hit.

- 50% pre-Stamina prevention on the next qualifying direct Attack-PL packet;
- consumed by that packet;
- if unused, expires at Clam's next action opportunity.

### `mirage_clam_mist_screen` — **Thick Mist**

CONTROL / up to 2 hostiles

> Obscure the field and make movement-based attacks harder to execute.

- no damage;
- through each target's next action opportunity, actions whose exact definition requires precise reposition-to-target are unavailable;
- not Stun;
- does not block ordinary direct attacks that do not require reposition.

### `mirage_clam_shell_slam` — **Shell Slam**

ATTACK / Taijutsu / one hostile / ATK **20**

- one direct packet;
- ordinary Stamina;
- no automatic Stun or displacement.

### `mirage_clam_hold_position` — **Anchor the Clam**

DEFENSE / self / once per Battle

> Brace the real clam against forced movement or displacement.

- reject one compatible forced displacement/reposition occurrence targeting the Clam;
- no damage prevention unless the incoming action separately says so.

## Proposed collaboration action

### `mirage_clam_steaming_multistoried_building` — **Mirage Field**

CONTROL / battlefield / controller-owned collaboration

Requirements:

- `giant_clam_mist_source` active;
- exact compatible learned Genjutsu collaboration;
- Clam currently manifested.

Consumes the controller's normal action.

Effect:

- establish `giant_clam_mirage_field`;
- while active, the **first qualifying hostile direct Attack-PL packet each hostile participant commits against either the controller or the Clam** is reduced by **50% before Stamina**, representing a false-position strike;
- after an attacker has triggered that reduction once, that attacker has adjusted enough to attack normally for the rest of the current field;
- a legitimate exact locating/reveal action may also establish `real_clam_located` for that attacker and bypass its unused false-position reduction;
- field ends when the Clam is depleted/dismissed or its mist source is removed.

No random miss roll is created.

## Relationship package

No passive +Genjutsu.

The relationship benefit is access to the **Mirage Field collaboration**, provided the summoner legitimately knows the technique.

Player-facing shorthand:

> **The Giant Clam creates a battlefield mirage. Each enemy is likely to waste its first direct attack on a false position unless it finds the real clam first.**

---

# 3. Monkey King Enma — `mk_enma`

## Canon anchor

Enma is Hiruzen Sarutobi's veteran monkey summon, an exceptionally strong hand-to-hand fighter who can transform into the Adamantine Staff. In staff form he can extend/change size, remain aware, manifest body parts, and clone into the Adamantine Prison Wall.

## Proposed lifecycle

Enma has two explicit Battle modes.

### MONKEY MODE

- independent targetable Summon;
- own PL77 ledger;
- own action opportunity.

### ADAMANTINE STAFF MODE

- Enma transforms into an attached weapon-source for the authorised controller;
- his current Remaining Battle PL is preserved, not refreshed;
- he stops receiving an independent recurring action opportunity while in staff mode;
- he does not donate PL or Stats;
- the controller gains exact Enma staff actions;
- reverting returns the same Enma with the same remaining ledger.

This creates a real tactical trade:

**second independent fighter OR integrated weapon — never both at once.**

## Proposed Monkey Mode actions

### `mk_enma_monkey_king_strike` — **Monkey King Strike**

ATTACK / Taijutsu / one hostile / ATK **32**

- one direct packet;
- ordinary Stamina;
- no automatic Stun.

### `mk_enma_grappling_crush` — **Grappling Crush**

ATTACK / CONTROL / one hostile / ATK **24**

- ordinary Stamina;
- establish movement/reposition restriction through target's next action;
- not Stun.

### `mk_enma_adamantine_staff_transform` — **Adamantine Staff**

TRANSFORM / self-controller link

> Transform Enma into an indestructible staff for the controller.

- consumes Enma's action;
- enter staff mode;
- suspend independent Enma actions;
- does not heal or refill Enma.

### `mk_enma_guarding_intercept` — **Monkey Guard**

DEFENSE / one allied participant

- 35% pre-Stamina prevention on that ally's next qualifying direct packet;
- consumed once;
- expires at Enma's next action.

### `mk_enma_veteran_read` — **Veteran Read**

INFO / one visible hostile

- record bounded current evidence about a technique/action Enma has legitimately observed;
- no hidden Stat reveal;
- no automatic prediction or combat bonus.

## Proposed Staff Mode controller actions

### `mk_enma_adamantine_staff_strike` — **Adamantine Staff Strike**

ATTACK / Bukijutsu / one hostile / ATK **36**

- controller-owned action;
- Enma is causal weapon-source;
- ordinary Stamina;
- no second Enma packet.

### `mk_enma_extending_staff` — **Extending Staff**

ATTACK / Bukijutsu / up to 2 hostiles / ATK **28 each**

- one packet per affected target;
- no automatic displacement;
- extension is not hidden Speed.

### `mk_enma_adamantine_guard` — **Adamantine Guard**

DEFENSE / self

- 50% pre-Stamina prevention on next qualifying direct packet against controller;
- consumed once.

### `mk_enma_adamantine_prison_wall` — **Adamantine Prison Wall**

DEFENSE / up to 2 allied participants / once per Battle

- 55% pre-Stamina prevention on each selected ally's next qualifying direct packet;
- one packet per protected ally;
- no permanent barrier;
- no extra action.

### `mk_enma_revert_from_staff` — **Return to Enma**

TRANSFORM

- ends staff mode;
- Enma returns as an independently targetable participant with the same Remaining Battle PL he had before/during staff mode;
- Enma does not gain an immediate free action on re-entry.

## Relationship package

No generic +Bukijutsu or +PL is required.

The enhancement is the **entire Adamantine Staff action package** while Enma is in staff mode.

Player-facing shorthand:

> **Enma can fight beside you or transform into the Adamantine Staff. In staff form you lose his separate turn but gain powerful staff attacks and defenses.**

---

# 4. Wave 2 decision state

Awaiting Stephen sign-off:

- `key_gero` — Gerotora — sealing/support relationship package;
- `mirage_clam` — Giant Clam — mist + deterministic mirage collaboration;
- `mk_enma` — Monkey King Enma — independent fighter / Adamantine Staff mode tradeoff.

No runtime implementation is authorised by this proposal until Combat marks the wave CLOSED after Stephen approval.
