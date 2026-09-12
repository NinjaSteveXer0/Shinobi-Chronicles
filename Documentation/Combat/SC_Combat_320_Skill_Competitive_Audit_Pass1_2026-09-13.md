# Shinobi Chronicles — 320-Skill Competitive Audit Pass 1

**Date:** 2026-09-13  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING AUDIT FINDINGS + STACKING SAFETY GATES / EXACT PER-SKILL RETUNES SEPARATE**

## 1. Scope

This pass consumes all eight current Skill catalogue waves (1–320) and revisits them as parts of assembled competitive builds rather than isolated definitions.

Sources:
- `Alpha_Skill_Catalogue_v1_Wave1_001-050.md`
- `Alpha_Skill_Catalogue_v1_Wave2_051-100.md`
- `Alpha_Skill_Catalogue_v1_Wave3_101-150.md`
- `Alpha_Skill_Catalogue_v1_Wave4_151-200.md`
- `Alpha_Skill_Catalogue_v1_Wave5_201-230_Kinjutsu_Echo.md`
- `Alpha_Skill_Catalogue_v1_Wave6_231-260_Menma_Echo_TailedBeast.md`
- `Alpha_Skill_Catalogue_v1_Wave7_261-290_Passive_Contextual.md`
- `Alpha_Skill_Catalogue_v1_Wave8_291-320_Active_Hybrid_Contextual.md`

This is the **first interaction pass**, not a claim that all numerical values are final PvP-balanced.

---

## 2. Immediate cross-catalogue finding — setup-amplifier superstack risk

The catalogue contains many deliberate setup actions that improve a later action, including examples such as:

- Chakra Focus +4;
- Clone Feint +3;
- Team Signal +3;
- Wire Reversal +4;
- Weapon Feint +5;
- Genjutsu setup markers +4/+5/+6;
- Wood Clone +5;
- Partial Expansion +6;
- Kinjutsu Chakra Overclock +8 with self-cost;
- Source Brand +5 compatible marker;
- Echo Parallel Intention +6;
- Menma Echo Pressure Rewrite +7;
- Reciprocal Overdrive +10 with self-cost;
- Three-Source Synchronisation +8;
- other source-specific setup/effect-strength markers.

Individually these are reasonable because they normally cost an action/setup. In an assembled build, however, silently allowing several live generic setup markers to all apply to one direct action can create an unintended `setup for several turns -> one absurd packet` loop whose ceiling is determined by catalogue archaeology rather than authored compatibility.

### Binding safety gate — explicit setup compatibility

From this audit forward:

> **Multiple distinct setup/amplifier markers do not automatically stack onto one resolving action merely because each marker's text could grammatically apply.**

A resolving action may consume:

1. its own exact same-source prerequisite/branch marker; and
2. at most one **generic external output amplifier** by default.

More than one external setup amplifier may apply only when the resolving action or an exact combination contract explicitly declares those sources compatible.

This does **not** delete setup Skills or make them mutually exclusive globally. It prevents silent accidental superstacking.

Examples:
- Echo Route Burst may consume its exact same-source Echo route-read marker and may also receive one compatible generic external amplifier if legitimate.
- Menma/Echo/Kurama Triple-Thread Burst does not automatically take Chakra Focus + Weapon Feint + Chakra Overclock + Pressure Rewrite + Reciprocal Overdrive + Three-Source Sync together.
- an exact future `three-source` package may explicitly author which same-source preparation markers combine.

Failed/unused incompatible setup markers remain governed by their own expiry semantics; they are not automatically consumed unless selected/applied.

This rule requires Coding implementation only when the affected Skills become live; catalogue ownership/access remains unchanged.

---

## 3. Direct-output band audit

### Core/Taijutsu/Bukijutsu

Observed authored single-target direct band:
- basic/normal roughly PL11–16;
- common roughly PL15–22;
- rare roughly PL17–27;
- legendary finishers around PL24–32.

This is internally coherent as a **catalogue baseline**, but weapon/Bukijutsu rows require whole-build testing because equipped weapon Effective-Bukijutsu modifiers, proficiency, Fūin, Provenance and conditional Skill setup can all coexist.

No immediate base-output retune is locked in this pass.

### Five basic elemental families

The initial catalogue intentionally mirrors a common progression template:
- low single target PL14/16/20;
- common single target PL22/24/28;
- rare single target around PL30/32;
- common/rare multi-target packets;
- rare corridor up to three targets at PL34 each;
- legendary three-target capstone PL40 each.

This symmetry is useful as a baseline but is **not sufficient for the final competitive game** because advanced element identity is now expected to diverge qualitatively.

Binding direction:
- ordinary catalogue rows may keep this baseline template;
- advanced elemental expressions must not simply continue `PL44 -> PL48 -> PL52` versions of the same pattern;
- future apex mechanics use the four-grade rule-changing package and PvP matrix.

### Multi-target scaling flag

The highest ordinary elemental corridor/capstone rows can produce nominal aggregate output far above same-tier single-target rows when three valid hostiles exist.

That is not automatically broken because:
- damage is split into separate target packets;
- each target has its own Stamina/defence;
- team PvP naturally values AoE differently from duels.

But these rows receive **high S10 team-scaling priority**. PvP simulations must test them in 3v3/4v4 conditions, not only 1v1.

---

## 4. Pursuit/conditional action audit

Many elemental and martial Skills gain validity after target movement/reposition since the user's previous action.

This is healthy counterplay because the opponent can sometimes choose whether movement is worth enabling the response.

Risk occurs when combined with:
- movement-forcing ally control;
- Dead Air suction;
- Earth/Water route control;
- Causal Space-Time forced endpoint effects.

Binding rule:

> **A teammate forcing/causing target movement satisfies a pursuit predicate only when the committed occurrence is actually tagged as movement/reposition by the owning resolver. Presentation displacement alone is insufficient.**

No hidden combo trigger from animation.

---

## 5. Movement-control saturation audit

The catalogue contains many one-action movement/reposition restrictions across Taijutsu, Bukijutsu, elemental control, Fūinjutsu, Wood Release, Nara, Uzumaki, Echo and Hosted routes.

Individually they are deliberately `not Stun`.

The major PvP risk is **chain denial**: several team members repeatedly applying movement lock while another mechanic punishes remaining stationary.

Binding safety requirement:
- control states continue to block only exact tagged action families;
- they do not silently block direct/support/guard actions;
- a target under movement restriction still has meaningful non-movement actions unless an entirely separate exact control effect legitimately applies;
- future team simulation must test `movement lock + pursuit punishment + Dead Air/terrain hazard` specifically.

Do not solve this by adding generic diminishing returns yet. Tune exact sources only after simulation evidence.

---

## 6. Guard/prevention audit

Catalogue prevention values include roughly:
- 20%;
- 25%;
- 30%;
- 35%;
- 40%;
- 45% for advanced Hosted/Echo states.

Most protect against one next qualifying direct packet and cost an action/setup.

### Binding safety gate — one primary prevention resolver per packet by default

Because several allies, gear/Fūin sources and transformation states may eventually place prevention on the same participant:

> **Multiple percentage pre-Stamina prevention states do not automatically multiply or add together on the same packet.**

Default resolution:
- apply the **single strongest eligible percentage prevention state** to that packet;
- consume/expire only the state that actually resolves against the packet;
- other eligible prevention states remain only if their own authored duration has not expired;
- an exact Skill/combination contract may deliberately author layered prevention and define order.

This avoids accidental `45% + 35% + 30%` near-immunity without banning defensive team composition.

Non-percentage defensive mechanics (redirection, packet invalidation, exact guard-break interaction, causal displacement) remain separate and require their own ordering authority.

---

## 7. Recovery-stack audit

Current catalogue contains many recoveries:
- core recovery 4/5;
- medical 6/8/10/12/16;
- Kinjutsu 10/12 with exact costs/routes;
- Echo 8/12;
- Hosted/Tailed-Beast 14;
- Menma/Echo/Kurama Compensatory Veil includes 8 after prevention;
- consumables add further recovery.

The immediate risk is not one heal; it is a specialist carrying several independently once-per-Battle heals plus consumables/team healers.

### Binding audit rule — recovery provenance and use identity

Every recovery commit must expose:
- source Skill/item;
- actor;
- target;
- exact once-per-Battle/once-per-target key;
- amount restored;
- cap before/after;
- self-cost after commit where any.

Different recovery Skills remain allowed to affect the same Character unless exact authority says otherwise. This pass does **not** invent a universal healing cap.

However, recovery-heavy compositions are now a mandatory stress-test archetype. If simulation shows indefinite/stale Battle pacing, tune the smallest correct sources or prepared-palette opportunity cost rather than installing an unexplained global anti-heal rule.

High-priority combinations:
- Advanced Mystical Palm + Emergency Chakra Transfer + recovery pill;
- Hosted Beast Regenerative Surge + high-Stamina gear;
- Echo recovery + Kinjutsu stitch + consumables;
- Compensatory Veil combined with other prevention/recovery sources.

---

## 8. Kinjutsu risk/reward audit

Rows 201–215 are healthier competitively than ordinary flat buffs because several exchange Battle capability for immediate power.

Examples:
- Chakra Overclock: +8 next direct, then user loses 4;
- Vital Path Compression: 40% prevention, then user loses 3;
- Forbidden Pulse: two-target PL22, user loses 4;
- Life-Force Conversion: ally +12, user -7;
- Last Reserve: +10 at <=25%, once/Battle.

These are good design anchors for SC advanced power: **strong effect + visible cost + strategic timing**.

Audit warning:
- self-cost occurs after the successful commit as authored;
- cost must not itself become a hostile damage packet, trigger enemy on-hit riders or pass through Stamina;
- self-cost cannot reduce below whatever current Battle incapacity boundary the core resolver authorises without that consequence resolving normally;
- self-cost does not create Injury by itself.

No immediate numeric retune is locked.

---

## 9. Genjutsu audit

Current Genjutsu rows largely attack **action selection/information** rather than inventing a separate mind-health system.

Strength:
- False Footfall blocks movement-prediction tagged actions;
- Distorted Distance blocks precision-range actions;
- Whispered Doubt blocks morale/command support;
- Broken Rhythm blocks combo/sequence action;
- Stolen Moment blocks setup only;
- Shattered Perception blocks precision for up to 3.

This preserves meaningful Genjutsu investment and is a useful comparison point for new Yin design.

Key rule:

> **Yin schema powers must not duplicate these action-selection/perception controls unless an exact interaction explicitly bridges them.**

PvP risk is team chain-control, not raw direct damage. Test Genjutsu alongside Fūinjutsu/control teams.

---

## 10. Fūinjutsu audit

Fūinjutsu catalogue design is structurally healthy because most control is route-specific or compatibility-gated rather than universal dispel/seal lock.

Highest interaction risks:
- Restriction Script + another movement lock;
- Suppression Tag against Hosted/Bloodline routes;
- Counterseal combined with newly craftable Fūin attachments;
- Grand Binding Formula in team focus-fire.

Binding requirement:

> **Fūin Craft attachment effects and active Fūinjutsu Skills remain separately sourced. Owning a strong attached seal does not make the wearer competent to use Counterseal/Release Key/etc.**

Causal Space-Time interactions must target one exact active relationship rather than becoming a blanket superior Counterseal.

---

## 11. Information Skill audit

Sensory, Echo, Hosted, Sharingan, Byakugan and contextual Skills consistently emit **bounded evidence** rather than World Truth.

This is strategically valuable and must survive PvP implementation.

Competitive information can affect:
- target selection;
- route choice;
- recognition of setup;
- counter timing;
- hazard/ambush avoidance;
- exact Causal/Provenance predicates.

But it must not silently become:
- hit chance bonus;
- free action;
- enemy full build reveal;
- exact hidden Stats/PL;
- identity revelation without comparison evidence.

High-end PvP should reward Knowledge and readable setup without turning every information Skill into a numeric buff.

---

## 12. Wood Release audit

Current Wood rows mix control, guard and direct output.

High-risk combinations:
- Deep Forest multi-target restraint + allied AoE;
- Wood Clone setup + Wood Dragon;
- Flowering Barrier team prevention;
- future environmental/contextual restraint route.

The new apex elemental framework must not accidentally treat Wood as merely `Earth + Water with higher numbers`.

No current Base PL/Stats mutation is authorised from Wood possession/access.

---

## 13. Clan/capability Skill audit

Important distinction survives:
- Sharingan Motion Read = evidence, not future sight;
- Sharingan Feint Counter requires legitimate read;
- Byakugan Chakra Read = bounded network evidence;
- Gentle Fist disruption requires compatible target;
- Shadow Possession requires shadow context;
- Kikaichū source gets no independent turn;
- Adamantine Chains do not auto-suppress Tailed Beasts;
- First Gate row opens exact temporary package only; modifiers remain separate authority.

These rows are strong examples of **capability access creating verbs rather than automatic hidden multipliers**.

---

## 14. Echo/Menma/Hosted/Tailed-Beast audit

Rows 216–260 carry the catalogue's highest concentration of source-aware advanced mechanics and therefore the highest stacking risk.

### Critical interaction risks

1. **same-source setup stacking** — addressed by explicit setup-compatibility gate;
2. **high prevention + recovery** — addressed by strongest-percentage-prevention default plus recovery audit;
3. **high output + temporary Hosted modifiers** — must be tested using actual Effective state, not just Skill PL;
4. **relationship controls** — must remain route-specific rather than global Hosted shutdown;
5. **three-source actions** — one packet despite multiple causal sources;
6. **temporary Kurama source** — current willingness/source remains required; history alone never grants standing power.

### Highest nominal direct rows

- Hosted Beast Bomb Compression PL48;
- Menma Echo/Kurama Triple-Thread Burst PL56;
- Menma Echo Route Lance PL40;
- Reciprocal Breaker PL43;
- various Echo setups can conditionally amplify later actions.

These should be expected to outperform basic catalogue attacks when their difficult relationship/development/source predicates are legitimately met. Balance is therefore about **build cost, setup, source availability and counterplay**, not forcing them down to Fireball output.

---

## 15. Passive contextual wave audit

Rows 261–290 are mostly low direct PvP power but potentially high **information/meta value**.

Binding PvP implementation rule:
- passive eligibility polling is side-effect-free;
- it does not consume/commit until material participation;
- it cannot secretly reveal hidden opponent build state just because the runtime knows it;
- observer knowledge remains bounded.

Important future interactions:
- False Identity versus recognition queries;
- Chakra Trace Awareness versus stealth/masking;
- trap/ambush awareness versus prepared fields;
- Hosted-route disturbance versus Causal/Fūinjutsu suppression;
- Sharingan Pattern Retention versus repeated action patterns;
- Byakugan Peripheral Detail versus geometry-based concealment.

These are competitive verbs even without direct Attack PL.

---

## 16. Active/hybrid contextual wave audit

Rows 291–320 make contextual capability a deliberate build axis.

PvP-relevant interactions include:
- Signature Masking / Trail Suppression versus sensors;
- Counterseal Diagnostic before exact dispel route;
- False Trail versus trackers;
- traversal Skills versus terrain control;
- Echo Recall Countermeasure versus retrieval/host pressure;
- Memory Partition versus exact Recall interfaces;
- Hosted cooperation/quieting/loan requests preserving Entity autonomy.

These must not be converted into passive free Battle bonuses merely to make them feel useful in PvP.

Objective-based PvP, scouting phases, pursuit/escape modes and Hotspot encounters are legitimate competitive value surfaces.

---

## 17. Pass-1 catalogue findings requiring later simulation, not immediate blanket nerf

### Priority A — setup stack ceiling

**Safety gate CLOSED in this pass.** Exact combinations still need authored compatibility.

### Priority B — multiple prevention states

**Safety gate CLOSED in this pass:** strongest eligible percentage prevention by default.

### Priority C — recovery composition

**OPEN FOR SIMULATION.** Do not add universal anti-heal rule without evidence.

### Priority D — three-target PL34/40 elemental rows

**OPEN FOR TEAM SIMULATION.** 1v1 cannot test them.

### Priority E — movement-lock + forced movement + pursuit payoff

**OPEN FOR TEAM SIMULATION.** Preserve tagged predicates.

### Priority F — Menma/Echo/Hosted high-end stacks

**OPEN FOR exact-source simulation.** Do not reduce them to generic Skills.

### Priority G — weapon/Bukijutsu amplifier chains

**OPEN FOR whole-build simulation** with weapon proficiency + gear + Fūin + Provenance + Skill setup.

### Priority H — elemental environmental networks

**OPEN FOR advanced-package simulation**, especially Lightning + wire/water/conductive weapon and Water network routing.

---

## 18. Runtime requirements created by this pass

When relevant Skills become live, Coding must eventually support:

1. explicit source identity on setup/amplifier markers;
2. resolution selection of one default generic external amplifier plus exact same-source prerequisite/branch markers;
3. exact opt-in combination contracts for multi-amplifier Skills;
4. percentage prevention arbitration using strongest eligible default;
5. non-resolving prevention states remaining only through their authored expiry;
6. exact recovery use keys/provenance;
7. movement/reposition predicates consuming factual occurrence tags, not animation;
8. no duplicate packet from multi-source provenance;
9. observer-safe information output.

This is **design authority only** until implementation/runtime tests exist.

---

## 19. Final conclusion

The 320-Skill catalogue does **not** presently require a wholesale numerical flattening. Its larger competitive risks are compositional:

- setup multipliers;
- layered percentage prevention;
- recovery density;
- team-scale multi-target output;
- chain movement control;
- equipment/Provenance/Hosted source stacking.

Two cross-catalogue safety gates are now closed because they prevent obvious accidental exponential behaviour without destroying build creativity:

1. **external setup amplifiers require explicit compatibility beyond one default external amplifier**;
2. **percentage pre-Stamina prevention defaults to the strongest eligible source per packet rather than silently stacking.**

The next balance stage is representative whole-build simulation, not random per-row nerfs.
