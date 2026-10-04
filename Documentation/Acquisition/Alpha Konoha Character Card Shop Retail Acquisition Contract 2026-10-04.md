# Shinobi Chronicles — Alpha Konoha Character Card Shop Retail Acquisition Contract

**Date:** 2026-10-04  
**Owner:** Acquisition / Character Systems  
**Status:** **CLOSED ALPHA RETAIL ACQUISITION AUTHORITY — CODING IMPLEMENTATION / BROWSER VALIDATION SEPARATE**  
**Source handoff:** GitHub #520  
**Master execution:** GitHub #449 Step 5

## 1. Purpose

This contract closes the first bounded Alpha **Character Card Shop / Acquisition** tranche for Konoha.

It does not create a new ownership model. Coding must reuse the existing generic Character acquisition authority, including:

`commitCharacterAcquisition(...)`

and the current canonical Ryō / activity-history / save-load systems already proven by #517.

Canonical separation:

> **shop listing != purchase intent != ownership commit != assignment != deployment**

The Character Card Shop is a deterministic retail acquisition route. It is not gacha, not a Registry scan, not a Genin-candidate generator, and not a team-assignment screen.

## 2. Exact first-production shop identity

Stable shop ID:

`konoha_character_card_shop`

Stable catalogue policy ID:

`alpha_konoha_character_card_shop_v1`

Retail acquisition route passed to the generic acquisition commit:

`retail_character_card_shop`

Current Konoha retail host/location:

`KON-P09` — Central Commercial District.

This may share the existing Commercial District host used by the bounded Basic Item Shop. Acquisition does not create a duplicate map location or new geography.

## 3. Access gate

The first Alpha Character Card Shop becomes purchase-enabled only after:

1. the selected Academy Origin has sealed/completed;
2. the Chronicle has entered Active Konoha;
3. mandatory **Academy Team Formation is complete**.

This prevents retail ownership from interfering with the mandatory opening formation transaction.

There is **no additional** Rank, relationship, Knowledge, Story-route, PL, rarity, or hidden reputation gate for the exact ten rows in this v1 catalogue.

A row may still be non-purchasable because that exact representation is already owned, the Registry entry is unavailable/invalid, or the player lacks the fixed Ryō price.

## 4. Exact v1 catalogue and prices

The first catalogue is the complete **ten-representation Academy Origin cohort**, and nothing outside it.

| Representation ID | Fixed retail price |
|---|---:|
| `academy_hinata` | **100 Ryō** |
| `academy_izuno` | **100 Ryō** |
| `academy_kushina` | **100 Ryō** |
| `academy_menma` | **100 Ryō** |
| `academy_mirai` | **100 Ryō** |
| `academy_kurenai` | **100 Ryō** |
| `academy_iwabee` | **100 Ryō** |
| `academy_metal_lee` | **100 Ryō** |
| `academy_kakashi` | **100 Ryō** |
| `academy_obito` | **100 Ryō** |

### Why these ten are legitimate

These exact Academy representations are already the closed first-cohort content used by Academy Origin selection and mandatory Academy Team Formation. Existing Acquisition authority establishes that, after excluding the selected protagonist, the other nine exact Academy Origin representations are legitimate Active-Konoha formation candidates.

The retail route now separately authorises the same exact **Academy-stage collectible representations** for deterministic post-formation purchase.

This does **not** mean:

- every Registry Character is purchasable;
- every Academy/Genin/Jōnin Character is purchasable;
- formation eligibility and retail acquisition are the same transaction;
- buying a Character proves friendship, Shared History, recruitment dialogue, institutional assignment, or Story presence.

### Pricing law

**100 Ryō is an authored fixed v1 onboarding retail price, not a formula.**

It is deliberately aligned to the already-authorised universal **100-Ryō Origin Starting Purse**, whose stated purpose includes seeding early Character-card acquisition and other economy choices.

Therefore every completed Origin can truthfully choose to spend its untouched starting purse on exactly one additional v1 Academy representation, or spend that money on Items/other services instead.

Do not infer future Character prices from:

- Base PL;
- Current PL;
- formal Rank;
- rarity;
- fame;
- card art;
- Registry order;
- future power;
- this 100-Ryō starter price.

Any future shop catalogue or higher-stage representation requires separately authored pricing/availability authority.

## 5. Catalogue visibility and already-owned rows

Once the shop access gate is satisfied, the catalogue may display all ten authorised rows.

If the exact representation is already owned — including the selected Origin protagonist or either Academy teammate acquired during Team Formation — the row must project:

`OWNED`

or an equivalent clearly non-purchasable state.

Already-owned exact representation behavior:

- purchasing is disabled in the normal UI;
- a fresh direct transaction attempt returns `already_owned`;
- **0 Ryō** is debited;
- no duplicate Character ownership is minted;
- no compensation Ryō, shards, duplicate currency, upgrade, alternate Character, EXP, Skill, or progression reward is created.

Exact representation remains the ownership unit. Owning another representation of the same persistent person does not automatically count as owning this exact Academy representation; same-person collision remains an assignment/deployment concern, not a reason to collapse distinct representation ownership.

## 6. Purchase intent and commit boundary

Browsing, opening the shop, hovering, focusing, selecting a card, or opening a confirmation surface does **not** mutate Ryō or ownership.

The semantic commit boundary is the final deliberate purchase confirmation for one exact catalogue row.

Each attempted committed purchase must carry a stable `purchaseIntentId`.

Recommended source identity pattern, compatible with #517:

`konoha_character_card_shop_purchase::<purchaseIntentId>`

The exact string implementation may vary only if the runtime preserves the same stable semantic identity.

The acquisition call must consume at minimum:

```js
commitCharacterAcquisition({
  variantId,
  route: "retail_character_card_shop",
  sourceEventId: purchaseOccurrenceId,
  context: {
    shopId: "konoha_character_card_shop",
    locationId: "KON-P09",
    catalogueId: "alpha_konoha_character_card_shop_v1",
    purchaseIntentId,
    priceRyo: 100,
    assignmentCommitted: false
  },
  provenance: {
    authority: "deliberate_retail_character_purchase",
    retailDoesNotAssign: true,
    catalogueId: "alpha_konoha_character_card_shop_v1"
  }
})
```

Runtime field names may map to existing equivalents, but the semantic facts must survive.

## 7. Atomic retail transaction

One valid purchase is one atomic transaction:

`validate -> debit 100 Ryō -> commit exact Character acquisition -> record purchase receipt -> save`

Before mutation validate all of:

1. shop access gate is satisfied;
2. exact `variantId` is in `alpha_konoha_character_card_shop_v1`;
3. exact Registry/production Character definition exists;
4. exact representation is not already owned, except same-intent retry handling below;
5. stable purchase intent exists;
6. current canonical Ryō is at least **100**.

If any validation fails:

- debit **0 Ryō**;
- grant **0 ownership**;
- create no successful purchase receipt;
- do not assign or deploy anything.

If the purchase transaction fails after mutation begins, Coding must restore the pre-purchase canonical Ryō/ownership/history state rather than leave a paid-but-unowned or owned-but-unpaid partial commit.

No UI layer may become money or ownership authority.

## 8. Idempotence and retry law

The stable purchase intent / source event is the idempotency key.

### Same committed intent replay

If the exact `purchaseIntentId` / purchase source already committed successfully:

- return the prior successful transaction as idempotent;
- debit **0 additional Ryō**;
- mint **0 additional ownership**;
- do not replace the historical receipt.

This check has precedence over generic `already_owned` so retrying the same purchase reports the already-committed purchase rather than pretending it is a new failed purchase.

### Fresh intent for already-owned representation

If a different/fresh purchase intent targets an exact representation already owned from any legitimate source:

- return `already_owned`;
- debit **0 Ryō**;
- create no second acquisition;
- create no successful retail receipt.

### Save/load

Save/load must preserve:

- exact owned representation;
- exact Ryō after purchase;
- exact acquisition provenance;
- exact retail receipt/source event.

Reloading or reopening the shop does not generate a new purchase intent automatically and cannot repeat a committed purchase.

## 9. Minimum retail receipt / provenance

A successful Character Card Shop purchase must leave one durable transaction receipt sufficient to diagnose why the representation is owned.

Minimum semantic fields:

- `type = character_card_shop_purchase` or exact runtime equivalent;
- `shopId = konoha_character_card_shop`;
- `locationId = KON-P09`;
- `catalogueId = alpha_konoha_character_card_shop_v1`;
- stable `purchaseIntentId`;
- stable `purchaseOccurrenceId/sourceEventId`;
- `variantId`;
- `route = retail_character_card_shop`;
- `unitPriceRyo = 100`;
- `totalPriceRyo = 100`;
- canonical Ryō before;
- canonical Ryō after;
- acquisition result / ownership identity;
- `assignmentCommitted = false`;
- source refs for location, shop, catalogue and Character representation;
- timestamp as metadata only, never the semantic idempotency identity.

The generic Character acquisition provenance and the retail purchase receipt must agree on the same source transaction.

## 10. Ownership consequence

Successful retail purchase grants/reuses only:

> **collectible / My Clan ownership of the exact purchased representation**

It does **not** automatically:

- mutate `currentTeam`;
- add the Character to a Story/mission team;
- make them a Genin roster candidate;
- fill a Genin roster slot;
- assign a Jōnin leader;
- deploy them into Battle;
- create Shared History;
- create friendship/relationship history;
- create participant presence;
- grant protagonist Knowledge about events they did not witness;
- change Rank;
- change Stats/PL;
- grant Progression;
- grant Skills/Technique access;
- evolve/replace another representation.

The currentTeam and later deliberate roster/team-assignment tranche remain separate.

## 11. Relation to Genin roster transition

This shop is **not** a shortcut around dynamic Genin candidate authority.

Preserve:

- Academy retail ownership != Genin candidate eligibility;
- owning an `academy_*` representation != owning a distinct `genin_*` representation;
- shop catalogue != `teammateCandidateVariantIds`;
- shop ownership != retention eligibility;
- purchase != Promotion;
- purchase != representation evolution.

If an exact future Genin candidate route legitimately requires acquisition, that route continues to consume its own current snapshot/acquisition authority.

## 12. Scope boundary

This v1 tranche authorises only the retail ownership transaction.

Explicitly out of scope:

- deliberate team assignment UI/semantics;
- protagonist/currentTeam lifetime composition rules currently being reconciled separately;
- Genin/Jōnin/Chūnin/Special-Jōnin/higher shop catalogues;
- Character selling;
- buyback;
- refunds after a successful deliberate purchase;
- duplicate/shard economy;
- rarity-based Character pricing;
- rotating/random shop stock;
- gacha;
- Character evolution;
- Rank/Promotion;
- Crafting/Forge/Fūin Craft;
- equipment/loadout;
- Battle deployment.

## 13. Coding regression minimum

Coding should prove at least:

1. shop purchase gate unavailable before mandatory Academy Team Formation completion;
2. after formation, all ten v1 rows resolve from exact catalogue authority;
3. protagonist/current two teammates project as already owned when applicable;
4. at least one of the seven ordinarily unowned Academy rows can be purchased for exactly 100 Ryō;
5. successful purchase debits canonical Ryō exactly once;
6. successful purchase commits exact Character ownership through existing generic acquisition authority;
7. My Clan/owned-roster projection sees the new Character naturally;
8. currentTeam remains unchanged by purchase;
9. same intent retry causes no second debit or ownership commit;
10. fresh intent for already-owned exact representation returns `already_owned` with no mutation;
11. insufficient Ryō mutates neither money nor ownership;
12. unlisted representation fails closed;
13. shop open/close/render/hover/selection causes no ownership mutation;
14. save/load preserves exact Ryō, ownership and provenance;
15. purchase creates no Shared History, Rank, PL/Stat, Skill, Progression or Battle deployment consequence;
16. Genin candidate snapshots are not modified by merely purchasing an Academy card;
17. no Registry scan expands the v1 catalogue beyond the exact ten IDs;
18. #517 Item Shop and existing Inventory/ownership regressions remain GREEN.

## 14. Canonical lock

> **The first Alpha Konoha Character Card Shop is a deterministic post-Academy-Team-Formation retail route at KON-P09. Catalogue v1 contains exactly the ten Academy Origin representations at a fixed authored price of 100 Ryō each. The price is an onboarding retail choice aligned to the universal 100-Ryō Origin starting purse and is not a Rank/PL/rarity formula. A deliberate purchase atomically debits canonical Ryō and commits exact Character ownership through the existing generic acquisition function with stable retail provenance. Same-intent retry is idempotent; a fresh purchase of an already-owned exact representation fails with no debit. Purchase grants My Clan/collectible ownership only and never silently changes currentTeam, roster candidacy, Story participants, Battle deployment, Rank, Stats/PL, Progression, Skills or Shared History.**
