# Shinobi Chronicles — Academy Origins NPC Card + Backdrop Projection Manifest

**Date:** 2026-09-27  
**Owner:** Writing / Story — Konoha  
**Status:** **CURRENT PRESENTATION INPUT / LIVE-MAIN ASSET AUDIT**  
**Purpose:** bind Story-visible participants to approved card assets and exact backdrops without changing Story semantics.

---

# 1. Universal projection rules

## Story card vs Battle portrait

For a physical participant present in Story:
- use an approved **Character/NPC/Enemy card** asset.

For a Battle participant:
- use the approved **Battle portrait** / enemy portrait asset required by Battle presentation.

Do not silently substitute one for the other where a dedicated projection exists.

## Physical presence

A card should be visible only when the person is physically present in that Story beat unless explicit presentation authority says otherwise.

Participant identity != constant on-screen projection.

## Internal / remote speakers

An internal voice does not become a physical actor card.

Example:
- Menma's Nine-Tails may speak internally;
- do not project a physical Nine-Tails card into the forest merely because the dialogue occurs.

## Hidden identity / disguise

Presentation follows **legitimate observer-facing identity**, not hidden World Truth.

Example:
- Mirai's apparent Escort is secretly the Academy instructor after substitution;
- until the reveal, presentation must preserve the apparent Escort/Traveller identity;
- do not display `NPC/mirai_instructor.png` during the concealed-disguise phase merely because Registry knows the underlying person.

## Stable unnamed NPCs

An NPC may remain unnamed to the player while still using a stable visual identity.

Unnamed != disposable.

If that participant recurs later, reuse the same stable actor/card when Chronicle continuity requires it.

## Exits / withdrawal

When a participant:
- leaves;
- flees;
- is removed from the scene;
- withdraws from Battle and is no longer physically projected;

their card must leave the Story board unless the exact scene requires them to remain visible.

## Missing live-main asset

If Writing knows the actor/backdrop should exist but the file is not visible on live GitHub `main`:

> **ASSET NOT YET VISIBLE ON LIVE MAIN — DO NOT GUESS PATH**

Coding must not invent a filename or silently use the wrong character.

---

# 2. Protagonist base cards

Current live-main Academy cards:

- Hinata: `Assets/Academy Student/academy_hinata.png`
- Wasabi Izuno: `Assets/Academy Student/academy_izuno.png`
- Mirai: `Assets/Academy Student/academy_mirai.png`
- Menma: `Assets/Academy Student/academy_menma.png`
- Kushina: `Assets/Academy Student/academy_kushina.png`
- Kurenai: `Assets/Academy Student/academy_kurenai.png`
- Iwabee: `Assets/Academy Student/academy_iwabe.png`
- Metal Lee: `Assets/Academy Student/academy_metal.png`
- Kakashi: `Assets/Academy Student/academy_kakashi.png`
- Obito: `Assets/Academy Student/academy_obito.png`

---

# 3. Academy Hinata

## Backdrops — live main

- `Hinata Origin Backdrop/hyuga_compound.png`
- `Hinata Origin Backdrop/hyuga_compound_alt_angle.png`

Use the alternate angle for the later/closing scene according to current presentation authority.

## NPC cards — live main

- Hyūga instructor:
  `NPC/hyuga_instructor.png`
- sparring partner:
  `NPC/hyuga_sparring_partner.png`

## Additional speaking actor

Current GOLDEN also contains:
- **YOUNGER STUDENT**

No dedicated younger-student NPC card is visible on live main under an obvious stable path.

Status:
**ASSET NOT YET VISIBLE ON LIVE MAIN — verify latest asset sync before Coding binds this actor.**

---

# 4. Academy Wasabi Izuno

## Backdrops — live main

- `Izuno Origin Backdrop/practical_ground_day.png`
- `Izuno Origin Backdrop/training_grounds_day.png`
- `Izuno Origin Backdrop/konoha_main_street.png`
- `Izuno Origin Backdrop/konoha_alleyway_day.png`
- `Izuno Origin Backdrop/konoha_rooftop_pursuit_day.png`
- `Izuno Origin Backdrop/river_route_day.png`
- `Izuno Origin Backdrop/konoha_narrow_yard.png`

Exact scene-by-scene use is now closed by:

`Documentation/Story/Academy_Wasabi_Izuno_Origin_Backdrop_Projection_Binding_2026-09-27.md`

Authoritative summary:
- Scene 1 HEAD START -> `practical_ground_day.png`
- Scene 2 THE TRAIL + its four first-choice route beats -> `konoha_rooftop_pursuit_day.png`
- Scene 3 THE SPLIT -> `konoha_main_street.png`
- Scene 4A RIVER -> `river_route_day.png`
- Scene 4B STRONGER TRAIL -> `konoha_narrow_yard.png`
- Scene 4C SHOUTING / STEP IN / CALL FOR HELP / KEEP PURSUING -> `konoha_alleyway_day.png`
- STEP IN PL Battle environment -> `konoha_alleyway_day.png`
- post-Battle Story return -> `konoha_alleyway_day.png`
- Scene 4D INTERCEPT -> `konoha_main_street.png`
- Scenes 5–7 finish/evaluation/reflection -> `training_grounds_day.png`
- ORIGIN CLOSE -> `konoha_main_street.png`

Do not infer a different route mapping from filenames.

## NPC / enemy cards — live main

- Academy instructor:
  `NPC/izuno_instructor.png`
- Rogue Genin Story/enemy card:
  `Enemies/rogue_genin.png`
- Rogue Genin Battle portrait:
  `Enemies Portraits/rogue_genin.png`

## Additional speaking actors in GOLDEN

- ACADEMY STUDENT
- ACADEMY STUDENT 2
- PROCTOR
- TARGET

No dedicated stable NPC card paths for those four speaking roles are visible on live main under obvious filenames.

Status:
**VERIFY LATEST ASSET SYNC before final Coding projection.**

---

# 5. Academy Mirai

## Backdrops — live main

- `Mirai Origin Backdrop/academy_training_ground_courtyard.png`
- `Mirai Origin Backdrop/konoha_main_street.png`
- `Mirai Origin Backdrop/konoha_covered_market.png`
- `Mirai Origin Backdrop/konoha_storehouse_side_lane.png`
- `Mirai Origin Backdrop/checkpoint_three_day.png`

These should replace generic backdrop inference.

## NPC cards — live main

- Academy instructor:
  `NPC/mirai_instructor.png`
- Traveller:
  `NPC/traveller.png`
- Escort:
  `NPC/escort.png`

## Disguise safeguard

The GOLDEN Story establishes:
- the real Escort/Traveller is a separate person;
- the Academy instructor switches places with him during the market separation;
- the substituted person is still **presenting as the Escort** until the reveal.

Therefore card projection must follow current apparent identity.

Do not show `NPC/mirai_instructor.png` merely because hidden Registry truth knows the disguised person is the instructor.

The exact `traveller.png` vs `escort.png` visual assignment through the substitution should be bound from the current asset/identity presentation contract, not guessed by Writing from filenames alone.

## Additional speakers

GOLDEN contains:
- PORTER
- CHECKPOINT INSTRUCTOR

No obvious dedicated live-main NPC paths are currently visible for those roles.

---

# 6. Academy Menma

## Dedicated backdrops — live main

- `Menma Origin Backdrop/academy_classroom.png`
- `Menma Origin Backdrop/whisper_woods_forest_route.png`
- `Menma Origin Backdrop/forest_clearing_day.png`
- `Menma Origin Backdrop/forest_clearing_alt_angle.png`
- `Menma Origin Backdrop/whisper_woods_rise.png`

Current Writing binding:
- Scene 1 -> classroom
- Scenes 2–3 -> forest route
- Scenes 4–7 / Battle / party-defeat return -> forest clearing day
- Scenes 8–9 victory aftermath/parting -> forest clearing alternate angle
- Scene 10 -> whisper-woods rise

## Actor cards — live main

- Academy instructor:
  `NPC/menma_instructor.png`
- Anko Story:
  `Assets/Special Jonin/sj_anko.png`
- Anko Battle:
  `Portraits/Special Jonin/sj_anko.png`
- Altered Shinobi:
  - `Enemies/test_subject_altered_shinobi.png`
  - `Enemies Portraits/test_subject_altered_shinobi.png`
- Brute:
  - `Enemies/test_subject_brute.png`
  - `Enemies Portraits/test_subject_brute.png`
- Unstable:
  - `Enemies/test_subject_unstable.png`
  - `Enemies Portraits/test_subject_unstable.png`

Nine-Tails:
- internal speaker only;
- no physical Story card projection.

This binding is already added to the current Menma candidate and scene authority.

---

# 7. Academy Kushina

## Current live-main backdrop visibility

Current live main exposes:
- `Scene backdrops/academy_training_ground_courtyard.png`

Current Writing authority uses the Academy courtyard for the entire Origin.

Stephen has stated that all current Kushina backdrops, including the reverse-summon alternate, now exist in VCS.

However no dedicated Kushina Origin backdrop folder / distinct reverse-summon alternate is visible on live GitHub `main` in this audit.

Status:
**WAITING FOR LIVE-MAIN ASSET SYNC / EXACT PATH.**

Do not guess the reverse-summon backdrop filename.

## Actor cards — live main

- Kushina:
  `Assets/Academy Student/academy_kushina.png`
- Gerotora / key_gero Story card:
  `Assets/Summons/key_gero.png`
- Gerotora Battle/support portrait if ever required:
  `Portraits/Summons/key_gero.png`

## Missing visible NPC cards

Current Story also physically uses:
- Academy instructor;
- Academy classmate.

No obvious Kushina-specific instructor/classmate NPC card path is visible on live main.

Stephen reports instructor cards now exist in VCS.

Status:
**WAITING FOR LIVE-MAIN ASSET SYNC / EXACT PATH.**

---

# 8. Academy Kurenai

## Current live-main backdrop visibility

Current Writing safely uses:
`Scene backdrops/academy_training_ground_courtyard.png`

Stephen has stated that the Kurenai aftermath/evaluation alternate now exists in VCS.

No dedicated Kurenai Origin backdrop folder / alternate-angle asset is visible on live GitHub `main` in this audit.

Status:
**WAITING FOR LIVE-MAIN ASSET SYNC / EXACT PATH.**

## Actor cards — live main

- Kurenai:
  `Assets/Academy Student/academy_kurenai.png`
- Academy instructor:
  `NPC/kurenai_instructor.png`

Kurenai currently has no Battle participant card requirement because the Bell Test remains Story / deception resolution, not PL Battle.

---

# 9. Academy Metal Lee

## Current live-main backdrop visibility

Current Writing safely uses:
`Scene backdrops/academy_training_ground_courtyard.png`

Stephen has stated that Metal's current Origin backdrops exist in VCS.

No dedicated Metal Origin backdrop folder / observer-edge-spar alternate is visible on live GitHub `main` in this audit.

Status:
**WAITING FOR LIVE-MAIN ASSET SYNC / EXACT PATH.**

## Actor cards — live main

- Metal:
  `Assets/Academy Student/academy_metal.png`

## Stable inviting Genin

Stable Story/Registry participant:
`metal_origin_inviting_genin`

A dedicated NPC/Story card for that participant is **not visible on live main under an obvious path**.

Registry also previously refused to invent an asset mapping.

Stephen reports current NPC cards now exist in VCS.

Status:
**WAITING FOR LIVE-MAIN ASSET SYNC / EXACT PATH.**

## Additional actor

Demonstration hazard uses a threatened Academy student.

No dedicated stable student card path is visible on live main under an obvious filename.

---

# 10. Academy Iwabee

## Current live-main backdrop visibility

Current Writing safely uses:
`Scene backdrops/academy_training_ground_courtyard.png`

Stephen has stated Iwabee's current Origin backdrops exist in VCS.

No dedicated Iwabee Origin backdrop folder / alternate scene asset is visible on live GitHub `main` in this audit.

Status:
**WAITING FOR LIVE-MAIN ASSET SYNC / EXACT PATH.**

## Actor / enemy cards — live main

- Iwabee:
  `Assets/Academy Student/academy_iwabe.png`
- Rogue Genin Story/enemy card:
  `Enemies/rogue_genin.png`
- Rogue Genin Battle portrait:
  `Enemies Portraits/rogue_genin.png`

## Missing visible instructor card

Current Story physically uses the Academy instructor.

No obvious Iwabee-specific instructor card is visible on live main.

Stephen reports instructor cards now exist in VCS.

Status:
**WAITING FOR LIVE-MAIN ASSET SYNC / EXACT PATH.**

## Defeat projection

Current direct-confrontation loss authority:

`Documentation/Story/Academy_Iwabee_Direct_Confrontation_Defeat_Story_Bridge_2026-09-27.md`

On fresh expected defeat:
- Iwabee remains physically present;
- Rogue remains physically present while World state says he does;
- no injury/death projection;
- exact instructor/Rogue movement after the bridge waits on #398 World disposition.

---

# 11. Academy Kakashi

## Dedicated backdrops — live main

- `Kakashi Origin Backdrop/rooftop_night.png`
- `Kakashi Origin Backdrop/konoha_alleyway.png`
- `Kakashi Origin Backdrop/alleyway_konoha_night.png`
- `Kakashi Origin Backdrop/konoha_alleyway_alt_night.png`
- `Kakashi Origin Backdrop/sakura_tree_night.png`
- `Kakashi Origin Backdrop/fight_at_sakura_tree.png`
- `Kakashi Origin Backdrop/end_of_alleyway.png`
- `Kakashi Origin Backdrop/uchiha_police_exterior_night.png`
- `Kakashi Origin Backdrop/hokage_administration_interior_night.png`

## Major actor cards — live main

- ANBU:
  `NPC/konoha_anbu.png`
- Masked Interceptor:
  `NPC/masked_interceptor.png`
- Package Smuggler:
  `NPC/package_smuggler.png`
- ANBU Marked Target:
  `NPC/anbu_marked_target.png`
- Uchiha Police members:
  `NPC/uchiha_police_force_member_male.png`
  `NPC/uchiha_police_force_member_female.png`
  plus approved alternates
- Pakkun:
  `Assets/Summons/pakkun.png`
- Minato:
  `Assets/Kage/kage_minato.png`

Kakashi GOLDEN prose is not reopened by this manifest.

---

# 12. Academy Obito

## Dedicated backdrops — live main

- `Obito Origin Backdrop/konoha_main_street.png`
- `Obito Origin Backdrop/quiet_residential_lane.png`
- `Obito Origin Backdrop/academy_approach_sloped_lane.png`
- `Obito Origin Backdrop/training_grounds_day.png`
- `Obito Origin Backdrop/training_grounds_late_afternoon.png`
- `Obito Origin Backdrop/training_grounds_dusk.png`
- `Obito Origin Backdrop/konoha_street_late_afternoon.png`
- `Obito Origin Backdrop/konoha_street_early_evening.png`
- `Obito Origin Backdrop/obito_home_interior.png`

## Speaking NPCs in current final Story

- CIVILIAN
- VENDOR
- CUSTODIAN
- DELIVERY WORKER
- ACADEMY INSTRUCTOR

No obvious dedicated live-main NPC card paths for these roles are visible in this audit.

Stephen reports instructor cards now exist in VCS.

Status:
**VERIFY LIVE-MAIN SYNC before final card projection.**

The Origin remains Writing-final; this is presentation binding only.

---

# 13. Current live-main asset gap summary

## Fully visible enough to bind now

- Menma — dedicated Story backdrops + instructor + Anko + all three hostile cards/portraits
- Mirai — dedicated backdrops + instructor + Traveller + Escort assets
- Hinata — dedicated backdrops + instructor/sparring-partner assets, with younger-student card still unverified
- Kakashi — dedicated backdrops + major active-cast cards
- Wasabi — dedicated backdrops + instructor + Rogue card, with minor student/proctor/target cards unverified
- Obito — dedicated backdrops, but dialogue-NPC card set not visible under obvious paths

## User says assets exist in VCS, but live main does not yet expose exact files in this audit

- Kushina dedicated/alternate backdrop set
- Kushina instructor/classmate card(s)
- Kurenai dedicated aftermath/evaluation backdrop
- Metal dedicated/alternate backdrop set
- Metal inviting-Genin card
- Iwabee dedicated/alternate backdrop set
- Iwabee instructor card
- Obito Academy instructor card if separately created
- other minor speaking-NPC cards listed above

---

# 14. What Writing needs from Stephen

Writing does **not** need new story design for these assets.

Only one production input is needed where files are not yet visible:

> **Push / merge / sync the latest NPC-card and Origin-backdrop asset tranche to live GitHub authority, or provide the exact branch/commit if it should be consumed before main.**

Once visible, Writing can bind the exact file paths without asking Stephen to manually describe every asset.

No screenshot/manual filename transcription is required if GitHub contains the files.

---

# FINAL LOCK

> **Every Origin implementation package must include both exact Story actor-card projection and exact scene backdrop projection.**

> **Writing owns who is present and what the player is allowed to perceive. Asset authority owns the approved image. Coding projects the exact approved asset; it does not infer identity or backdrop from prose.**
