# Shinobi Chronicles — Chronicle Run-Instance Identity Contract

**Date:** 2026-10-02  
**Owner:** CE / Codex / Coordination  
**Tracker:** #494  
**Status:** **BINDING ALPHA / REUSABLE START-IDENTITY CONTRACT — DESIGN CLOSED / IMPLEMENTATION SEPARATE**

---

# 1. Core distinction

Shinobi Chronicles must distinguish:

> **Chronicle protagonist/person identity != Chronicle run-instance identity.**

`academy_menma`, `academy_kakashi`, owned-character IDs, Registry person identity, player-facing Ninja ID and Origin variant identity answer **who** the Chronicle is centred on / which representation was selected.

They do not answer:

> **Which distinct Chronicle run / historical namespace is this?**

Two genuinely separate Menma Chronicles may choose the same Origin, produce the same early choices and use the same teammates while still being different Chronicle instances.

Canonical:

> **same protagonist + same Origin + same early evidence != same Chronicle run**

> **same save content fingerprint != same Chronicle instance by definition**

---

# 2. Canonical runtime field

Add one dedicated state domain:

`stateDomainId: chronicleRunIdentity`

Canonical save path:

`playerData.phase2ChronicleState.chronicleRunIdentity`

Canonical stable key:

`playerData.phase2ChronicleState.chronicleRunIdentity.runId`

Conceptual shape:

```js
{
  schemaVersion: 1,
  runId: "sc_run_v1_<opaque-unique-id>",
  creationKind: "NEW_START" | "INHERITANCE_CARRYOVER" | "LEGACY_RESTART" | "LEGACY_SAVE_MIGRATION",
  startManifestRef: null | "<stable start manifest id>",
  parentRunRef: null | "<prior Chronicle runId>",
  donorRunRefs: [],
  migrationSourceRefs: []
}
```

Exact storage helpers remain Coding-owned.

The semantic identity is `runId`.

Do not use the metadata fields above as alternate run identities.

---

# 3. Semantic owner

Semantic owner:

> **CE / Historical Scope + Meta-History — Chronicle namespace / run-instance identity**

Runtime persistence writer:

> **Coding / Start-commit + save/migration infrastructure**

Acquisition remains owner of:
- selected Origin/person;
- owned Character identity;
- representation/roster acquisition.

Registry remains owner of person/representation identity.

Player-facing Ninja ID remains profile/presentation identity.

Canonical non-collapse:

> **runId != Registry person ID**

> **runId != ownedCharacterId**

> **runId != Origin variant ID**

> **runId != Ninja ID**

> **runId != Team Formation commit ID**

> **runId != hotspot occurrence ID**

> **runId != save-session ID**

> **runId != startManifestId**

The Start Manifest may reference/bind the run identity, but the manifest occurrence/package and the Chronicle historical namespace are not the same semantic object.

---

# 4. Creation boundary

## Future full start pipeline (#222)

A new `runId` is allocated exactly once when a new Chronicle Start Manifest is successfully committed.

That applies to:
- `NEW_START`;
- `INHERITANCE_CARRYOVER`;
- `LEGACY_RESTART`.

All three create a **new Chronicle historical namespace**, even when they reference prior/donor Chronicles.

Therefore each gets a fresh `runId`.

Lineage is expressed by explicit parent/donor references, not by reusing the old run identity.

## Current Alpha front door (#165 compatibility)

Until the full #222 Start Manifest runtime exists, the current Alpha creation boundary is the successful front-door `BEGIN` commit that locks the selected Chronicle Origin and begins the Origin Prologue.

Required order:

`uncommitted onboarding preview`
-> `allocate candidate runId`
-> `commit Origin/start state + run identity durably as one logical start boundary`
-> `only after successful persistence may downstream CE generation consume runId`.

If the start commit fails, the candidate identity must not become a usable committed Chronicle identity.

---

# 5. Run-ID allocation

`runId` is an opaque identity token.

It is not a gameplay roll and does not encode player choice, moral state, Origin result or reward.

Preferred Alpha implementation:

`crypto.randomUUID()` (or an equivalent collision-resistant UUID source available at the start/migration commit boundary), namespaced as `sc_run_v1_<uuid>`.

Important:

> **identity entropy at Chronicle creation != gameplay randomness**

The prohibition is against creating random/timestamp salt **inside hotspot/private-history eligibility** or rerolling until a desired result appears.

Do not use:
- `Math.random()` inside #469;
- `Date.now()` as the sole identity;
- hotspot open time;
- Team Formation commit ID;
- current teammate composition;
- repeated Origin completion evidence;
- a content hash of Origin choices as the only run identity.

Once committed, the opaque run ID is stable forever for that Chronicle.

---

# 6. Reset / replacement boundary

A committed `runId` survives:
- save/load;
- browser refresh;
- Continue Chronicle;
- Team Formation;
- team changes permitted by later systems;
- map open/close;
- hotspot open/close;
- Story replay/presentation reconstruction;
- Shinobi Record open/close;
- Battle retry semantics that remain inside the same Chronicle;
- representation changes;
- Rank/Promotion;
- ordinary migration/schema upgrades.

A new `runId` is created only when a **new Chronicle namespace** is explicitly committed.

Current/future triggers:
- explicit `NEW CHRONICLE` -> next successful new-start commit creates a new run ID;
- `NEW_START` -> new run ID;
- `INHERITANCE_CARRYOVER` -> new run ID + donor/source refs;
- `LEGACY_RESTART` -> new run ID + parent Chronicle ref;
- authorised Chronicle Renewal that creates a new Chronicle/world namespace -> new run ID + lineage ref.

`CONTINUE CHRONICLE` never changes `runId`.

Deleting/resetting the old player save before a new Chronicle begins does not itself create the new identity; the new identity is created at the new start commit.

---

# 7. #222 start-mode behaviour

## NEW_START

- fresh `runId`;
- no parent by default;
- no donor by default;
- fresh World/Knowledge/Relationship history according to #222.

## INHERITANCE_CARRYOVER

- fresh `runId`;
- donor/source Chronicle run ID(s) referenced through Start Manifest provenance;
- inherited entries remain explicit bridges/carryover;
- donor run history does not become the destination run's history wholesale.

## LEGACY_RESTART

- fresh `runId`;
- `parentRunRef = prior Chronicle runId` where that parent is authoritatively known;
- parent remains historically addressable/read-only according to Legacy/Meta-History authority;
- current World/history is the new Chronicle, not a reset continuation of the parent namespace.

Canonical:

> **lineage != identity continuity**

> **inheritance != same run**

> **Legacy Restart != reuse parent runId**

---

# 8. Migration for existing saves without run identity

Existing Alpha saves predate this field.

Migration must preserve their committed history and must not reroll private histories already sealed.

Required algorithm:

1. If a valid persisted `chronicleRunIdentity.runId` exists, reuse it exactly.
2. If the save lacks `runId`, detect whether a Chronicle has genuinely begun (locked Origin/start evidence).
3. If no begun Chronicle exists, do not create a committed run ID yet; wait for the normal start commit.
4. If a begun Chronicle exists, perform one explicit **LEGACY_SAVE_MIGRATION** identity commit.
5. Allocate one opaque `runId`, persist it once, and record available stable migration source refs (Origin lock / Start Manifest if present / other exact start evidence).
6. Expose the new run identity to CE consumers only after persistence succeeds.
7. If persistence fails, fail closed for consumers that require a durable run identity; do not silently seed with a transient candidate.

Important purity boundary:

The existing Phase-2 compatibility reader / pure migration helper must remain pure.

Therefore random/unique run-ID allocation belongs to a separate explicit persistence migration step such as:
`ensureChronicleRunIdentity...()`

not inside the pure read adapter.

---

# 9. Existing sealed private history migration

If an existing save already contains a sealed autonomous private-Origin history produced before `runId` existed:

> **that private history is already authoritative and must NOT be regenerated from the new runId.**

Migration links the newly assigned Chronicle run identity to the already-committed private history.

Use `runId` only for private histories / deterministic CE selections that are still genuinely uncommitted.

Preserve:

> **new identity field != permission to reroll old history**

---

# 10. Deterministic CE seed consumption

#469 / #478 may consume `runId` immediately after this contract is implemented.

Preferred deterministic seed input:

`PRIVATE_ORIGIN_SCHEMA`
+ `chronicleRunIdentity.runId`
+ `subject stable identity`
+ `Origin definition / resolver identity`
+ `resolver/schema version`

Then:
- same Chronicle -> same deterministic private history;
- reload -> same private history;
- team change -> same private history;
- hotspot reopen -> same private history;
- different fresh Chronicle -> independent deterministic seed space;
- existing committed private history -> no re-resolution.

Canonical:

> **deterministic within one Chronicle != identical across separate Chronicles**

---

# 11. Save-slot / account boundary

`runId` identifies a Chronicle historical namespace, not a storage slot.

A future system may:
- archive one Chronicle;
- keep multiple Chronicle saves;
- copy/export/import a save;
- maintain Meta-History across several runs.

Those features must not infer Chronicle identity purely from file path or slot number.

If a save is duplicated as a literal backup/resume of the same Chronicle, retaining the same run ID is correct.

If the product deliberately forks that backup into a **new historical Chronicle**, the fork operation must mint a new run ID and record explicit lineage/fork provenance.

---

# 12. Chronicle State Manifest registration

Add a distinct Phase-2 manifest row:

```text
stateDomainId: chronicleRunIdentity
semanticOwner: CE / Historical Scope + Meta-History
canonicalWritePath: Chronicle start commit / explicit legacy-save identity migration
stableIdentityKey: playerData.phase2ChronicleState.chronicleRunIdentity.runId
savePath: playerData.phase2ChronicleState.chronicleRunIdentity
schemaVersion: 1
sourceOccurrenceIdFormat: chronicle_start::<runId> OR migration::<runId>
idempotenceKeyFormat: runId
migrationRule: explicit one-time persisted identity assignment for begun legacy saves; never inside pure compatibility reader
resetRule: replace only when a new Chronicle namespace is explicitly committed
difficultyScope: all
inheritanceRule: new Chronicle gets new runId; lineage references source/parent run IDs rather than inheriting identity
devOverridePolicy: fixtures may inject explicit run IDs; ordinary player runtime never regenerates a committed runId
```

Existing `chronicleIdentity` remains Acquisition/Origin identity and is NOT renamed or repurposed.

---

# 13. QA / acceptance

Minimum tests:

## Identity non-collapse
- two fresh Menma Chronicles receive different run IDs;
- both still have the same Menma Origin/person identity where selected;
- Ninja ID does not affect run ID semantics;
- Team Formation commit is not run identity.

## Stability
- save/load preserves exact run ID;
- browser refresh preserves exact run ID;
- Continue Chronicle preserves exact run ID;
- map/hotspot/Record operations preserve exact run ID.

## Replacement
- New Chronicle -> next successful start commit gets a new run ID;
- Inheritance Carryover -> new run ID + donor reference;
- Legacy Restart -> new run ID + parent reference.

## Migration
- begun legacy save lacking run ID receives exactly one persisted migration identity;
- second load reuses it;
- pure compatibility read does not mint it;
- persistence failure does not expose transient identity to deterministic consumers.

## Private-history determinism
- same run ID + same subject/resolver version -> same private history;
- different run IDs can produce different legitimate private histories;
- private history already committed before migration is preserved exactly;
- no reroll-until-positive behaviour;
- KILLED / UNSEEN remain legitimate outcomes.

---

# Final lock

> **A Chronicle run is its own historical namespace. Who the protagonist is does not identify which run this is. Mint one stable run identity exactly once when a new Chronicle is committed, preserve it for the life of that Chronicle, mint a new one for every genuinely new Chronicle, and use explicit lineage rather than identity reuse when histories inherit from one another.**