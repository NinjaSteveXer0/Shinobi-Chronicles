# Shinobi Chronicles — Summon Calibration Wave 2 Proposal: Gerotora, Giant Clam, Monkey King Enma

**Date:** 2026-09-18  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **PROPOSED FOR STEPHEN SIGN-OFF — NOT YET BINDING COMBAT CLOSURE**  
**Parent:** #235

Consumes existing Registry/PL anchors:

- `key_gero` — **Gerotora** — Stats `34 / 20 / 8 / 62 / 38 / 28 / 32` — PL **53**
- `mirage_clam` — **Giant Clam** — current source Base PL **76**
- `mk_enma` — **Monkey King Enma** — current source Base PL **83**

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

Gerotora has **exactly three Battle abilities**.

The kit stays deliberately simple:

1. open the seal;
2. close the seal;
3. emergency-close it if V2 Cloak causes the Mindless Jinchūriki state.

No diagnostic button and no extra seal-management vocabulary.

### `key_gero_open_the_seal` — **Open the Seal**

SUPPORT / linked Tailed-Beast seal

> **Force the linked Tailed-Beast seal open. You can use Tailed-Beast powers you have already unlocked.**

Effect:

- set the exact linked seal state to **OPEN**;
- while OPEN, the actor may use exact Tailed-Beast Skills / transformations they already legitimately own and satisfy;
- does **not** teach a new Skill;
- does **not** create cooperation;
- does **not** add the beast's PL or Stats;
- consumes the actor's normal action opportunity.

Player card text:

**OPEN THE SEAL**  
**Force the seal open. Use Tailed-Beast powers you have already unlocked.**

### `key_gero_close_the_seal` — **Close the Seal**

SUPPORT / linked Tailed-Beast seal

> **Force the linked Tailed-Beast seal closed. Tailed-Beast powers stop until the seal is opened again.**

Effect:

- set the exact linked seal state to **CLOSED**;
- immediately end any current seal-dependent release/cloak/access state that requires the seal to remain open;
- while CLOSED, seal-dependent Tailed-Beast Skills / transformations cannot be started;
- does not undo damage or effects that already resolved;
- does not erase Chronicle history;
- consumes the actor's normal action opportunity.

Player card text:

**CLOSE THE SEAL**  
**Force the seal closed. Tailed-Beast powers stop until it is opened again.**


### `key_gero_emergency_reseal` — **Emergency Reseal**

EMERGENCY / linked Tailed-Beast seal / once per Battle

> **If V2 Cloak makes you lose control, Gerotora slams the seal shut and brings you back.**

Trigger:

- the linked player enters the exact **Mindless Jinchūriki** state caused by V2 Cloak.

Effect:

- triggers automatically; it does **not** wait for the mindless player to choose an action;
- force the linked seal to **CLOSED**;
- immediately end the active V2 Cloak / Mindless Jinchūriki state that depends on that open seal;
- return ordinary player control;
- the player does **not** gain an extra action from being restored;
- does not undo damage or other effects that already resolved;
- does not heal Battle PL;
- once used, Emergency Reseal is unavailable for the rest of that Battle.

Player card text:

**EMERGENCY RESEAL**  
**If V2 Cloak makes you lose control, Gerotora automatically shuts the seal and brings you back.**

## Relationship package

Gerotora provides **no passive Stats and no attack package**.

His entire Battle purpose is deliberately simple:

- **Open the Seal** — turn Tailed-Beast access on;
- **Close the Seal** — turn Tailed-Beast access off;
- **Emergency Reseal** — once per Battle, automatically shut the seal if V2 Cloak causes the Mindless Jinchūriki state.

Player-facing shorthand:

> **Gerotora controls the Tailed-Beast seal. Open it to use powers you already have. Close it to shut them off. If V2 Cloak makes you lose control, Emergency Reseal automatically brings you back once per Battle.**

---

# 2. Giant Clam — `mirage_clam`

## Canon anchor

Gengetsu's Giant Clam produces the mist used for Demonic Illusion: Steaming Multistoried Building. The collaboration creates highly convincing mirages that conceal the real location of both summoner and clam. Destroying/finding the real clam breaks the effect. The shell is notably durable.

## Proposed lifecycle

Full independent manifested Summon:

- own PL76 Battle ledger;
- independently targetable;
- own action opportunity;
- no PL/Stat donation to the summoner.

The full mirage requires **both**:

1. manifested Giant Clam; and
2. a controller with an exact compatible learned mirage/genjutsu collaboration.

The Clam does not grant Genjutsu mastery merely by being owned.

## Proposed own actions

### `mirage_clam_mist_exhalation` — **Mirage Mist**

CONTROL / battlefield / up to **2 hostiles**

> Flood the field with dense mist. Weaken each affected enemy's next direct attack and enable the full Mirage Field technique.

- deals no damage;
- establish persistent source state `giant_clam_mist_source` until Clam is depleted/dismissed or the source is explicitly cleared;
- each selected hostile receives one `giant_clam_mist_obscured` marker;
- that hostile's next qualifying direct Attack-PL packet against any target is reduced by **25% before Stamina**, then its marker is consumed;
- an unused marker expires at that hostile's next action opportunity;
- this is visibility/position interference, not Stun, accuracy Stat loss or a random miss roll;
- if `Mirage Field` is activated while an enemy still has an unused 25% mist marker, the weaker marker is replaced by the Mirage Field's stronger false-position protection rather than stacking.

So `Mirage Mist` is immediately useful even when the controller does not know the full collaboration technique, while also establishing the source required for `Mirage Field`.

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
- own PL83 ledger;
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
