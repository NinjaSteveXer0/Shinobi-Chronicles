# Shinobi Chronicles — Academy Kakashi Origin Battle Config Composition Gap Addendum

**Date:** 2026-09-15  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING COMBAT CONFIG ADDENDUM — CODING IMPLEMENTATION / RUNTIME / GOLDEN VALIDATION SEPARATE**

## 1. Purpose

This addendum closes the exact all-route Battle-composition gap reported by Coding on GitHub issue `#201` and in:

`Documentation/Coding/Academy_Kakashi_Combat_Config_Consumption_Gap_2026-09-15.md`

It extends, and does not replace, the existing Combat contract:

`Documentation/Combat/SC_Combat_Academy_Kakashi_Origin_Runtime_Battle_Deployment_and_Result_Contract_2026-09-15.md`

All participant source profiles, action packages, AI, Battle-entry rules, Pakkun semantics, launch/idempotence rules and result semantics from that contract remain unchanged unless this addendum says otherwise.

Preserve:

- Story label != Combat config;
- exact encounter composition != approximate substitute;
- participant presence != deployment;
- sequential timing role != universal timing role;
- Battle victory != Story objective success;
- design closed != implemented != runtime validated != Golden GREEN.

---

## 2. New stable direct/non-sequential Battle config IDs

The following three configs are now binding:

| Config ID | Player side | Opposition side | Timing role | Purpose |
|---|---|---|---|---|
| `academy_kakashi_origin_battle_ps_mi_2v1` | Kakashi | Package Smuggler + Masked Interceptor | **No sequential timing gate** | Exact direct/non-sequential 2-v-1 required by Observe -> `GO FOR THE PACKAGE` |
| `academy_kakashi_origin_battle_mi_1v1` | Kakashi | Masked Interceptor | **No sequential timing gate** | Exact direct/non-sequential MI-only confrontation |
| `academy_kakashi_origin_battle_ps_1v1` | Kakashi | Package Smuggler | **No sequential timing gate** | Exact direct/non-sequential PS-only confrontation |

These are stable Combat configuration identities. Coding must not synthesize them by substituting participants into another config at runtime.

### 2.1 `academy_kakashi_origin_battle_ps_mi_2v1`

Deployed participants:

- player: `academy_kakashi`
- opposition: `academy_kakashi_origin_package_smuggler`
- opposition: `academy_kakashi_origin_masked_interceptor`

Source profiles remain exactly:

- Package Smuggler -> `fuinjutsu_smuggler`, Stats `29 / 24 / 27 / 38 / 33 / 22 / 31`, Base PL `36`
- Masked Interceptor -> `decoy_assassin`, Stats `43 / 44 / 46 / 24 / 38 / 42 / 41`, Base PL `45`

Each opponent uses its already-closed action package and deterministic AI from the parent Combat contract. No new pair-only passive, combo bonus, shared PL pool, hidden scaling, extra turn, or automatic custody/package effect is created by this composition.

This config is the exact Battle composition for the Writing-closed Observe -> `GO FOR THE PACKAGE` route when that route authorises Kakashi vs Package Smuggler + Masked Interceptor.

### 2.2 `academy_kakashi_origin_battle_mi_1v1`

Deployed participants:

- player: `academy_kakashi`
- opposition: `academy_kakashi_origin_masked_interceptor`

Masked Interceptor uses the exact existing `decoy_assassin` source profile/action package. This config carries **no** `<=4` sequential benchmark merely because the same opponent also appears in the sequential stage-1 config.

### 2.3 `academy_kakashi_origin_battle_ps_1v1`

Deployed participants:

- player: `academy_kakashi`
- opposition: `academy_kakashi_origin_package_smuggler`

Package Smuggler uses the exact existing `fuinjutsu_smuggler` source profile/action package. This config carries **no** `<=3` sequential benchmark merely because the same opponent also appears in the sequential stage-2 config.

---

## 3. Sequential config reuse law — CLOSED

The existing sequential IDs are **not reusable as generic direct/non-sequential configs**:

- `academy_kakashi_origin_battle_seq_mi`
- `academy_kakashi_origin_battle_seq_ps`
- `academy_kakashi_origin_battle_seq_amt_pakkun`

They are role-bearing sequential configuration identities.

Binding law:

1. `academy_kakashi_origin_battle_seq_mi` retains the sequential stage-1 Kakashi/controller action benchmark `<=4`.
2. `academy_kakashi_origin_battle_seq_ps` retains the fresh sequential stage-2 Kakashi/controller action benchmark `<=3`.
3. `academy_kakashi_origin_battle_seq_amt_pakkun` remains sequential stage 3 and inherits no hidden MI/PS countdown beyond the already-closed sequential contract.
4. A non-sequential direct MI-only caller must use `academy_kakashi_origin_battle_mi_1v1`.
5. A non-sequential direct PS-only caller must use `academy_kakashi_origin_battle_ps_1v1`.
6. Coding must not disable, strip, null, reinterpret or caller-toggle the sequential timing role on a `battle_seq_*` config in order to reuse that config elsewhere.
7. Encounter composition is part of config identity. Runtime must fail closed rather than substitute `AMT + PS` for `PS + MI`, or any other approximate opponent set.

This keeps config identity factual and prevents timing semantics from becoming caller-dependent hidden state.

---

## 4. Route legality delta

The parent contract section on route/config legality is extended with these bindings:

- Observe -> `GO FOR THE PACKAGE` exact 2-v-1 route -> `academy_kakashi_origin_battle_ps_mi_2v1`;
- exact direct/non-sequential Masked Interceptor-only confrontation -> `academy_kakashi_origin_battle_mi_1v1`;
- exact direct/non-sequential Package Smuggler-only confrontation -> `academy_kakashi_origin_battle_ps_1v1`;
- sequential stage 1 remains -> `academy_kakashi_origin_battle_seq_mi`;
- sequential stage 2 remains -> `academy_kakashi_origin_battle_seq_ps`;
- sequential stage 3 remains -> `academy_kakashi_origin_battle_seq_amt_pakkun`.

The previously published configs remain valid for their authored compositions:

- `academy_kakashi_origin_battle_amt_1v1`
- `academy_kakashi_origin_battle_amt_ps_2v1`
- `academy_kakashi_origin_battle_amt_ps_mi_3v1`
- `academy_kakashi_origin_battle_kakashi_pakkun_vs_amt`
- the three `battle_seq_*` configs above.

The Academy Kakashi Origin Combat configuration surface therefore contains **ten** binding stable config IDs after this addendum.

---

## 5. Acceptance requirements for Coding

Minimum deterministic checks for this delta:

1. `academy_kakashi_origin_battle_ps_mi_2v1` deploys exactly Kakashi vs Package Smuggler + Masked Interceptor.
2. That 2-v-1 config does not deploy ANBU Marked Target.
3. `academy_kakashi_origin_battle_mi_1v1` has no sequential `<=4` benchmark metadata/effect.
4. `academy_kakashi_origin_battle_ps_1v1` has no sequential `<=3` benchmark metadata/effect.
5. `academy_kakashi_origin_battle_seq_mi` still applies the exact already-closed sequential stage-1 timing metric.
6. `academy_kakashi_origin_battle_seq_ps` still applies the exact already-closed sequential stage-2 timing metric.
7. A direct caller attempting to use a `battle_seq_*` ID as an untimed substitute is rejected or never authored by the route map; runtime does not silently strip timing semantics.
8. Existing opponent Stats/Base PL/action packages/AI remain byte-for-byte or semantically equivalent to parent Combat authority; this addendum creates no replacement packages.
9. No new Battle config produces automatic Story success, package custody, death, KO, capture, loot, Inventory ownership, Summon ownership, Rank, Ryō or Progression.
10. Save/load and repeated bridge evaluation preserve the original parent idempotence contract.

---

## 6. Closure

Combat owner delta requested by issue `#201` is now closed.

Coding may consume the ten-config Battle surface directly. Unsupported or mismatched compositions remain fail-closed.

This closure is **design authority only**. Implementation, installed-browser runtime validation and Golden/regression GREEN remain separate evidence gates.
