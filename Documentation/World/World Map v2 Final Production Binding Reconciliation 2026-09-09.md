# Shinobi Chronicles — World Map v2 Final Production Binding Reconciliation

**Date:** 9 September 2026  
**Owner:** World / Missions / Events / Rewards  
**Status:** **FINAL PRODUCTION BINDING CONSUMED — WORLD MAP V2 READY FOR CODING IMPLEMENTATION**

---

## 1. Purpose

This document consumes the final UI / Assets production binding returned through GitHub issue #53 and promotes the already-closed World Map v2 country/secret projection semantics from candidate geometry to the exact production binary.

No World semantic decision is reopened by this reconciliation.

Preserve:

> final terrain asset committed != runtime implemented != browser/Golden GREEN

> country placement envelope != political border

> country marker != travel access

> secret reservation != discovered identity

> `????` halo != access

> world truth != observer Knowledge != presentation

---

## 2. Final production asset authority

Authoritative production path:

`Backgrounds/WorldMap.png`

Exact binding:

- native canvas: **1672 × 941**;
- Git blob: `102ff62f8849bce76b83424140091b37f235401b`;
- SHA-256: `309445068decdf433b6011d8254b127cf3e358890972c584ba8278a99f2eedeb`;
- production-ingest commit: `48e7954ce77ec9590f0b9e9dad34b6493af425c7`;
- original UI / Assets source filename: `a_wide_cinematic_high_detail_fantasy_realistic_c.png`.

UI / Assets confirmed the production repository binary is byte-for-byte the exact candidate against which the original v2 calibration was authored. No crop, resize, recompression or replacement occurred between candidate calibration and production ingest.

Therefore the old World-side candidate/binary blocker is retired.

---

## 3. Final geometry authority

Durable spatial authority:

`Documentation/Maps/World Map v2 Country and Secret Reservation Calibration.md`

Final promotion/revalidation commit:

`64ed1dc8a2e1bcb055b196c41221ef3317cf8af1`

Validated against the exact production `Backgrounds/WorldMap.png` binary:

- **16 / 16 country placement envelopes GREEN**;
- **16 / 16 country anchors GREEN**;
- **7 / 7 physical secret reservation regions GREEN**;
- **7 / 7 gold-halo / suspicion anchors GREEN**;
- `world:S08` Infinite Tsukuyomi World remains **non-physical / no terrain anchor**;
- **0 coordinate changes required**.

Stable spatial addresses remain:

- countries: `world:C01` → `world:C16`;
- physical high-profile secret reservations: `world:S01` → `world:S07`;
- realm reservation: `world:S08`, no ordinary terrain anchor.

---

## 4. World semantic authority retained unchanged

Primary World contract:

`Documentation/World/World Map v2 Country and Secret Projection Alpha Contract.md`

Authority commit:

`6aa40efaa1164525d5713948fcafb0a9b7a0038f`

This reconciliation changes **no semantic IDs, reveal semantics, country-access semantics or secret-access semantics** from that contract.

### Countries

All sixteen named countries are ordinary known geographic identities.

Five Great Country runtime region bindings remain only where existing runtime/access authority already supports them:

- Land of Earth → `earth`
- Land of Wind → `wind`
- Land of Fire → `fire`
- Land of Lightning → `lightning`
- Land of Water → `water`

Smaller countries remain:

`KNOWN_GEOGRAPHY / NOT_YET_ACTIONABLE`

unless separate World/Story/runtime authority supplies travel or a regional surface.

Known country existence does not create:

- Hidden Village access;
- capital access;
- mission eligibility;
- political-border certainty;
- event ownership;
- hostile/friendly state;
- country-specific standing pool;
- regional-map implementation.

### High-profile physical secrets

`world:S01`–`world:S07` begin:

`KNOWN_UNKNOWN_LOCKED`

Player-facing treatment:

- gold halo/ring at the authoritative anchor;
- visible label `????`;
- no canonical secret identity leakage through visible text, tooltip, DOM, accessible metadata, URL, dataset or hidden description;
- no access action merely because the halo is visible.

A later owning-system gate may transition:

`KNOWN_UNKNOWN_LOCKED`
→ `DISCOVERED_IDENTITY`
→ `ACTIONABLE`

but discovered identity and actionable access remain separate unless exact authority intentionally closes both together.

### Non-physical realm

`world:S08` Infinite Tsukuyomi World receives no ordinary geographic marker or anchor.

Any eventual reveal/access must use an authorised special realm-layer/transition presentation.

---

## 5. Runtime integration boundary

The World Map v2 implementation may now consume the exact final binary and exact revalidated coordinates.

Coding should reuse the existing World Map runtime and navigation architecture rather than creating a new world-navigation subsystem.

World authorises implementation of:

1. current `Backgrounds/WorldMap.png` final production binary;
2. all 16 known country markers at the v2 country anchors;
3. current country placement envelopes for hit/focus/presentation geometry where the existing World Map consumer requires them;
4. `KNOWN_UNKNOWN_LOCKED` gold-halo + `????` projection for `world:S01`–`world:S07`;
5. zero ordinary terrain marker for `world:S08`;
6. region navigation only where current runtime and access state already authorise it;
7. smaller-country presentation without fabricated navigation/actionability;
8. semantic non-leakage for secret identities;
9. responsive alignment against the actual rendered image-content box rather than viewport percentages.

The World Map must not become a second country event pool. Country-specific standing events remain owned by regional World/Event contracts such as the separate Land of Fire ecology.

---

## 6. Implementation validation requirements

World requires runtime/browser evidence for at least:

1. `Backgrounds/WorldMap.png` is the actual rendered World Map source.
2. Projection is based on native 1672 × 941 coordinates and actual rendered image-content bounds.
3. All 16 country markers align responsively with their production anchors.
4. Five Great Country selections route only where current access/runtime permits.
5. Smaller-country markers remain known-but-non-actionable absent separate authority.
6. `world:S01`–`world:S07` render gold halo + `????` in `KNOWN_UNKNOWN_LOCKED` state.
7. Secret canonical names do not leak via visible UI, DOM, pointer/focus, tooltip, accessibility metadata, URL or data attributes.
8. Locked secret halo selection does not create travel/access.
9. `world:S08` has no ordinary terrain marker.
10. save/load preserves discovery/reveal/access state without semantic reroll.
11. keyboard/pointer/focus behaviour remains aligned and non-leaking.
12. World Map runtime changes do not mutate regional event eligibility or create standing events merely from country markers.
13. existing region-map navigation remains intact.
14. browser/Golden/regression result is reported separately from design/implementation completion.

---

## 7. Status

**Final terrain binary:** CLOSED / COMMITTED

**Final country/secret geometry:** CLOSED / REVALIDATED

**World country/secret semantics:** CLOSED

**World candidate/binary blocker:** RETIRED

**Coding implementation:** READY / NOT YET PROVEN

**Browser/Golden/regression:** NOT YET GREEN

No additional World decision is required before Coding implements the final World Map v2 projection.
