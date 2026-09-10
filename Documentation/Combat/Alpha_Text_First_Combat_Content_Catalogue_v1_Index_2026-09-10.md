# Shinobi Chronicles — Alpha Text-First Combat Content Catalogue v1 — Index

**Date:** 2026-09-10  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **CONTENT INDEX — 416 DEFINITIONS AUTHORED / ACTIVATION AND GOLDEN SEPARATE**

## 1. Current authored catalogue

The text-first catalogue now contains exactly:

- **320 Skills / Techniques**;
- **24 Consumables**;
- **28 Weapons**;
- **28 Gear pieces**;
- **16 crafting/training Materials**;
- **416 total authored definitions**.

These are durable definitions, not automatic ownership/access and not a claim that all rows are runtime implemented or Golden.

## 2. Presentation / rarity

Binding rarity/presentation authority:
`Documentation/Combat/Alpha_Text_First_Items_Weapons_Gear_Rarity_Contract_2026-09-10.md`
commit `7c4f65f1fdf1d68502d93b25228c283117e0ff74`

Rarity ladder:
`normal -> common -> rare -> legendary`

No dedicated image asset is required for Skills, Items, Weapons or Gear in Alpha. Rarity is presentation/classification, not an automatic power/access multiplier.

## 3. Skill catalogue waves

- **001–050** — `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave1_001-050.md` — commit `b833b146aa72da7c311f6dc649fe547715f7e873` — core shinobi, Taijutsu, Bukijutsu, opening Fire.
- **051–100** — `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave2_051-100.md` — commit `241aad55fe7f0069e82f5836f313b9a69f97b340` — Fire/Water/Wind/opening Lightning.
- **101–150** — `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave3_101-150.md` — commit `dcad377e58c4eb2ad7a444793ce7afa55fb1fdf1` — Lightning/Earth/Genjutsu.
- **151–200** — `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave4_151-200.md` — commit `65203534e11ac855859f6b59a353558a3bcd0ecb` — Fūinjutsu, medical/sensory, Wood Release, clan/bloodline-gated examples.
- **201–230** — `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave5_201-230_Kinjutsu_Echo.md` — commit `4076279ffb4bc09539183f7ec56088af4b0e208c` — general Kinjutsu + Echo-interface Kinjutsu.
- **231–260** — `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave6_231-260_Menma_Echo_TailedBeast.md` — commit `7f9716480ab2fb6bb904cc16c306516ef0a51542` — Menma/Echo development + Hosted Tailed-Beast/Kurama/three-source techniques.
- **261–290** — `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave7_261-290_Passive_Contextual.md` — commit `7ad174525d46b44e548592e2ebed8c43fbb2a774` — passive contextual/event Skills; flagship `skill_false_identity`.
- **291–320** — `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave8_291-320_Active_Hybrid_Contextual.md` — commit `098a6af4ee43ecd2a695bbc04cd7747a79c2b542` — active/hybrid contextual/event Skills including Recognition Substitution, barrier/seal investigation, traversal, Echo interaction and Kurama negotiation.

All catalogue rows preserve stable identity, rarity, source/acquisition family, access predicate and exact effect. Catalogue presence never grants the Skill.

## 4. Contextual Skill surface

Binding contextual execution authority:
`Documentation/Combat/SC_Combat_Contextual_Passive_Active_Skill_Surface_2026-09-10.md`
commit `8d9e29bac13adaf9868f4f09f960f61e366b73ff`

Modes:
- `battle_active`;
- `passive_contextual`;
- `active_contextual`;
- `hybrid_contextual`.

Core rules:
- passive eligibility checks are side-effect-free;
- event/context existence remains Story/World/Mission/Event authority;
- passive/event Skills may expose bounded evidence/options but do not manufacture Story conclusions;
- active contextual Skills require an exact current caller-supplied opportunity/target/query;
- contextual actions outside Battle do not consume Battle turns;
- invocation inside Battle consumes the ordinary Character action unless exact authority says otherwise;
- contextual occurrence history commits only when the Skill materially participates in a factual resolution.

### False Identity

`skill_false_identity` is the passive contextual surface of earned Identity Rebinding capability for current Arc-1 Menma. It may present an exact legitimate current recognised false-identity profile to a compatible recognition query. The target system still resolves normally.

It does not rewrite stable identity/World Truth, forge legal authority, make informed humans forget Menma, universally hide Hosted Entities/chakra or guarantee bypass.

`skill_false_identity_recognition_substitution` is the separate deliberate active evolution. Historical Mission-11 action `arc1_m11_menma_recognition_substitution` remains its exact historical action ID and may link to the reusable catalogue Skill without being renamed/recommitted.

## 5. Kinjutsu / Echo / Tailed-Beast boundary

`Documentation/Combat/SC_Combat_Kinjutsu_Echo_Tailed_Beast_Catalogue_Boundary_2026-09-10.md`
commit `c7f80c56b1ec364386947a8cf7f01b66d58e5e84`

Preserve:
- Kinjutsu Stat != repertoire;
- Echo relationship != every Echo Skill;
- Hosted Entity PL != host PL;
- source participation != second turn;
- prior Kurama-loan experience != current Kurama access;
- new Menma/Echo/Kurama actions require their exact current source predicates.

Existing Mission-12 Echo Menma / borrowed-Kurama actions remain unchanged.

## 6. Item / Weapon / Gear / Material catalogue

- **001–048** — `Documentation/Combat/Alpha_Item_Weapon_Gear_Catalogue_v1_Wave1_001-048.md` — commit `d690875a738c75b0bba69ffc2f60b6286e8e953c` — 24 Consumables + first 24 Weapons.
- **049–096** — `Documentation/Combat/Alpha_Item_Weapon_Gear_Catalogue_v1_Wave2_049-096.md` — commit `7409b9a5d32da23bfd99e37364252d26a7ca2a14` — final 4 Weapons +28 Gear +16 Materials.

Existing already-live Alpha rows remain unchanged. New catalogue-only rows require legitimate acquisition/runtime activation.

## 7. Hashirama / Yamato Wood Release

`Documentation/SC_Combat_Genin_Hashirama_Yamato_Wood_Release_Possession_Access_Boundary_2026-09-10.md`
commit `1bc85d3fb16088da72df9712e0b8494b3d2a3b9a`

`genin_hashirama` and `genin_yamato` possess Wood Release from representation start, while executable Access remains requirement-gated. Possession does not mutate Base Stats/PL or automatically prepare Wood Release Skills.

## 8. Production strategy

1. Author stable distinct definitions.
2. Story/World/Training/Missions provide legitimate opportunities/sources.
3. Progression supplies learned/development/access authority.
4. Acquisition/Inventory supplies ownership where applicable.
5. Combat/Skills supplies exact effect/compatibility.
6. Coding implements reusable resolver/evaluator families.
7. Runtime/Golden proves only activated slices; catalogue breadth itself is not a GREEN claim.

The next major character consumer remains the 25-Genin prepared-palette wave after CE's repertoire/capability audit.

## 9. Status distinction

- text-first Alpha presentation: **DESIGN CLOSED**;
- rarity ladder: **DESIGN CLOSED**;
- **320 Skill definitions: AUTHORED / DURABLE**;
- **96 Item/Weapon/Gear/Material definitions: AUTHORED / DURABLE**;
- contextual passive/active Skill modes: **DESIGN CLOSED**;
- False Identity passive semantics: **COMBAT/SKILLS CLOSED**;
- Kinjutsu/Echo/Tailed-Beast boundary: **CLOSED**;
- catalogue-wide source/acquisition binding: **NOT CLAIMED**;
- catalogue-wide implementation: **NOT CLAIMED**;
- catalogue-wide runtime/Golden: **NOT CLAIMED**.

## 10. Non-collapse

- catalogue != ownership/access/prepared palette;
- passive evaluation != committed history;
- event eligibility != event success;
- contextual Skill != Battle action automatically;
- False Identity != stable identity rewrite or universal bypass;
- Recognition Substitution != passive False Identity;
- request != consent;
- rarity != power automatically;
- authored != implemented != runtime validated != Golden GREEN.
