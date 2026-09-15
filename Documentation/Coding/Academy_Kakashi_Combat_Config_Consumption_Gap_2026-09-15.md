# Academy Kakashi — Combat Config Consumption Gap

**Date:** 2026-09-15  
**Owner:** Coding / Runtime  
**Status:** **IMPLEMENTATION AUDIT — EXACT COMBAT CONFIG GAP**

Coding consumed `Documentation/Combat/SC_Combat_Academy_Kakashi_Origin_Runtime_Battle_Deployment_and_Result_Contract_2026-09-15.md` at commit `6c0037db3531d38890447a4e86c2e7e8c80e6e2e` against final Writing authority.

The seven published configs close several required encounters but do not currently provide a legal config for every Writing-closed Battle route.

Confirmed exact mismatch:

- Final Writing: Observe -> `GO FOR THE PACKAGE` reaches a 2-v-1 PL Battle **Kakashi vs Package Smuggler + Masked Interceptor**.
- Published Combat 2-v-1 config: `academy_kakashi_origin_battle_amt_ps_2v1` = **Kakashi vs ANBU Marked Target + Package Smuggler**.
- Coding must not substitute AMT for Masked Interceptor or silently reuse the wrong encounter composition.

Additional config-identity review is required before treating sequential configs as generic substitutes:

- `academy_kakashi_origin_battle_seq_mi` carries the authored sequential MI <=4 controller-action timing role and must not automatically impose that timing role on a non-sequential direct MI confrontation unless Combat explicitly declares reuse legal.
- `academy_kakashi_origin_battle_seq_ps` similarly carries the sequential PS <=3 role and must not automatically impose it on a non-sequential Package Smuggler confrontation unless explicitly authorised.

Coding will implement the seven published configurations exactly as authored and keep unsupported compositions fail-closed. Full Kakashi all-route runtime completion requires Combat to either:

1. publish the missing stable config(s), including PS+MI 2-v-1; or
2. explicitly declare which existing config IDs are reusable outside their sequential timing role and how the timing metadata is disabled/omitted on those callers.

Preserve:

- Story label != Combat config;
- encounter composition != approximate substitute;
- participant presence != deployment;
- sequential timing role != universal timing role;
- Battle victory != Story objective success;
- design closed != implemented != validated.
