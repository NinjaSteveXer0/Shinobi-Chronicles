# Academy Kakashi Player-Facing Cue Manifest — Checkpoint 01: Rooftop to Alley

Status: **STEPHEN-APPROVED RECOVERED / LOCKED PLAYER-FACING CUE AUTHORITY — CHECKPOINT 01**

Purpose: provide Coding/Runtime with an exact, machine-addressable player-facing cue sequence for the restored Academy Kakashi rooftop assignment, while preventing semantic/runtime identity from depending on mutable display prose.

This is an expression/cue repair only. It does not alter Kakashi Origin facts, semantic IDs, resolver ownership, World Truth, Knowledge, Battle seams, rewards, custody, progression, or Chronicle history.

## Binding presentation contract

Each player-facing cue has four independent concerns:

1. `cueId` — stable presentation identity.
2. `stateAnchor` — the authoritative Story situation in which the cue occurs.
3. `presentationKind` — `NARRATION | ACTION | DIALOGUE | DECISION | TRANSITION`.
4. `displayText` — exact player-facing prose for this checkpoint.

For `DIALOGUE`, `speakerId` is mandatory. For `NARRATION`, `ACTION`, and `TRANSITION`, `speakerId` is null.

**Runtime predicates, progression, choice eligibility, resolver lookup, consequence routing, save/load, and Chronicle history MUST NOT key from `displayText`.** Display prose is presentation data. The renderer must consume explicit `presentationKind` / `speakerId`; it must not infer presentation kind from wording.

Changing only `displayText` while retaining `cueId`, semantic/state bindings and presentation metadata must not alter Story behaviour.

## Exact recovered sequence

| Cue ID | State anchor | Kind | Speaker | Exact display text | Status |
|---|---|---|---|---|---|
| `AK_ORIGIN_CUE_001` | `academy_kakashi.rooftop.opening` | NARRATION | — | `Kakashi watched Konoha from the rooftop.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_002` | `academy_kakashi.rooftop.presence_registered` | NARRATION | — | `A presence registered behind him.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_003` | `academy_kakashi.rooftop.presence_registered` | NARRATION | — | `His eye shifted.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_004` | `academy_kakashi.rooftop.anbu_present` | NARRATION | — | `An ANBU operative stood several paces back, masked and motionless.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_005` | `academy_kakashi.rooftop.anbu_addresses_kakashi` | DIALOGUE | `ANBU_OPERATIVE` | `Kakashi Hatake.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_006` | `academy_kakashi.rooftop.kakashi_reacts` | ACTION | — | `Kakashi turned his head slightly.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_007` | `academy_kakashi.rooftop.order_given` | DIALOGUE | `ANBU_OPERATIVE` | `You have orders. Stop this package from falling into the wrong hands.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_008` | `academy_kakashi.rooftop.envelope_presented` | ACTION | — | `The operative raised a sealed envelope.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_009` | `academy_kakashi.rooftop.kakashi_approaches` | ACTION | — | `Kakashi studied him for a moment, then moved from his position and walked over.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_010` | `academy_kakashi.rooftop.kakashi_questions_assignment` | DIALOGUE | `KAKASHI` | `Why are you coming to me with this?` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_011` | `academy_kakashi.rooftop.envelope_taken` | ACTION | — | `He took the envelope.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_012` | `academy_kakashi.rooftop.hokage_authority_revealed` | DIALOGUE | `ANBU_OPERATIVE` | `Hokage's orders.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_013` | `academy_kakashi.rooftop.hokage_authority_reaction` | NARRATION | — | `Kakashi's attention sharpened.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_014` | `academy_kakashi.rooftop.seal_attention` | ACTION | — | `His eye dropped to the seal in his hand.` | RECOVERED / STEPHEN-APPROVED |
| `AK_ORIGIN_CUE_015` | `academy_kakashi.rooftop_to_alley` | TRANSITION | — | — | HARD CUT TO ALLEY |

## Rejected drift / prohibited substitutions

The following observed/runtime variants are **not** current Writing authority for this sequence:

- `Hatake Kakashi.` — reject; authoritative line is `Kakashi Hatake.`
- `The operative held out a sealed envelope.` rendered as ANBU dialogue — reject; envelope presentation is ACTION.
- `He broke the seal. A target photograph was waiting inside.` rendered as Kakashi dialogue — reject; physical/object handling is not Kakashi speech, and this compressed insertion must not displace the recovered exchange.
- `Why bring this to me?` rendered as narration/action — reject; authoritative Kakashi dialogue is `Why are you coming to me with this?`
- `The Hokage approved you to assist us. The man in that photograph is carrying something important. Don't let it fall into the wrong hands.` — reject as a replacement for the recovered order/question/Hokage-authority exchange.
- any target-photograph inspection staging that deletes, reorders, or absorbs `Why are you coming to me with this?` / `Hokage's orders.` — reject.

## Runtime acceptance for Checkpoint 01

Checkpoint 01 is correctly consumed only when:

- the rooftop scene projects the cues above in the stated order;
- spoken lines are speaker-owned and physical actions are not projected as dialogue;
- `Kakashi Hatake.` is preserved exactly;
- the question / Hokage-answer exchange remains intact;
- no semantic route, progression, resolver result or choice availability depends on any cue's display string;
- changing one test-only display string while retaining the same cue/semantic identity leaves Story behaviour unchanged;
- the final cue produces the existing hard cut into the alley continuation rather than a replacement summary screen.

This checkpoint makes no claim of runtime consumption, installed-browser validation, or Golden/regression GREEN.

## Provenance

Consumes the restored Academy Kakashi rooftop/Hokage-order authority and installed-browser correction recorded under Writing issue #170, including the Stephen-approved opening sequence captured in issue comment `5655175043`. It also preserves the later Writing-closed Kakashi graph and current player-facing choice-label authority.
