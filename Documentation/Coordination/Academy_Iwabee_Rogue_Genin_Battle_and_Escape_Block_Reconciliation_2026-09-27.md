# Shinobi Chronicles — Academy Iwabee Rogue Genin Battle + Escape-Block Reconciliation

**Date:** 2026-09-27  
**Owner:** CE / Codex / Coordination  
**Incoming handoff:** #390  
**Status:** **CE CONTRACT CLOSED / PL-REGISTRY REQUIRED / COMBAT FOLLOWS / WORLD FOLLOWS / CODING NOT YET RELEASED**

## 1. Scope

This contract closes the reusable semantic seams for Academy Iwabee's two currently fail-closed Rogue Genin branches:

1. **CONFRONT HIM** -> conditional one-on-one PL Battle;
2. **BLOCK HIS ESCAPE WITH EARTH RELEASE** -> environmental constraint followed by World-owned Rogue response.

It does not invent:
- Rogue PL/Stats;
- Rogue Skills;
- surrender/custody;
- reward;
- injury/death;
- morality/personality.

Current Writing authority remains:
- Documentation/Story/Academy_Iwabee_Origin_2026-09-27_Scene_Authority_and_Backdrop_Contract.md
- Documentation/Story/Academy_Iwabee_Origin_333_Player_Facing_Rewrite_Candidate_2026-09-27.md

Backdrop remains:

Scene backdrops/academy_training_ground_courtyard.png

## 2. Existing Iwabee authority consumed

Live Registry / Combat authority already closes Academy Iwabee.

Registry ID:

academy_iwabee

Base Stats:
- Ninjutsu 14
- Taijutsu 11
- Bukijutsu 13
- Fūinjutsu 6
- Kinjutsu 5
- Genjutsu 5
- Stamina 14

Base PL:

13

Prepared Battle palette:
- academy_iwabee_iron_staff_smash
- academy_iwabee_staff_sweep
- academy_iwabee_earth_style_rising_wall
- academy_iwabee_stone_snare
- academy_iwabee_grounded_stance

Current Combat semantics include:
- Iron Staff Smash = fixed Bukijutsu Attack PL 6;
- Staff Sweep = authored area Bukijutsu Attack PL 4, max two targets;
- Stone Snare = Ninjutsu physical/control resolver;
- Earth Style: Rising Wall = 35% ratio guard;
- Grounded Stance = categorical displacement-resistance state.

Do not rename Writing's environmental verbs into new Battle Skills.

## 3. Stable Rogue identity

World already closes:

sourceOccurrenceId:
occ_origin_iwabee_rogue_genin_response_resolution

stable participant ref:
iwabee_origin_rogue_genin_01

Player-facing display may remain:

ROGUE GENIN

Stable participant identity != Battle Registry representation.

Current production source has no Battle-capable Registry/PL representation for this Rogue.

CE therefore does not invent one.

PL / Registry / Rank must close:
- exact Battle representation ID / mapping;
- canonical seven Base Stats;
- Base PL under current formula;
- Rank/category metadata;
- Current/Effective initialization;
- representation guard;
- Story-scoped/non-owned status;
- save/load identity continuity.

Combat then closes the exact legal Rogue palette/action package.

# BRANCH A — CONFRONT HIM

## 4. Battle identity

Stable config ID:

academy_iwabee_origin_rogue_confrontation

Stable encounter ID:

origin_academy_iwabee:rogue_genin_confrontation

Participants:

PLAYER:
- academy_iwabee

OPPOSITION:
- iwabee_origin_rogue_genin_01 through the exact PL/Registry Battle mapping supplied downstream.

Environment:

Scene backdrops/academy_training_ground_courtyard.png

This is a one-on-one evolved PL Battle.

No instructor is a Battle participant merely because they are physically present in Story.

## 5. Caller / return

Writing-owned pre-Battle sequence ends at:

iwa_confront_05

After that beat, launch the exact confrontation Battle.

Battle returns once to:

iwa_confront_return_01

The return envelope must expose factual Battle result and the stable Rogue participant identity.

Story then continues to:

iwa_eval_route_confront

Do not bypass the authored return beat.

## 6. Battle terminal truth

Ordinary PL law applies.

0 Remaining Battle PL = withdrawal.

If the Rogue reaches 0 first:
- player-side Battle victory is factual;
- Rogue Battle withdrawal is factual;
- capture/detention/escape is **not** inferred.

If Iwabee reaches 0 first:
- opposition-side Battle victory is factual;
- Iwabee withdrawal is factual;
- injury/death is not inferred;
- Rogue escape/custody is not inferred.

Battle result != World disposition.

After terminal Battle settle, World must resolve the Rogue's occurrence-specific post-confrontation state.

Allowed World result families remain whatever current World authority explicitly closes, for example:
- detained/captured;
- escaped;
- still present/unresolved;
- transferred to responsible Academy authority;
- another exact factual resolution.

CE does not select among those without World authority.

## 7. IWA-02 non-collapse

Direct confrontation does not satisfy IWA-02 merely because Iwabee wins or uses Earth Release during Battle.

IWA-02 requires the exact World/source fact:

earthReleaseUsedToConstrainRogueGenin = true

under:

occ_origin_iwabee_rogue_genin_response_resolution

Therefore:
- Battle victory != IWA-02;
- ordinary Battle Earth-Release damage/guard/control != automatically the Story escape-block occurrence;
- only the authored escape-block branch commits the required environmental constraint fact unless later exact World authority says otherwise.

## 8. Battle reward

No current durable authority grants a reward for this Rogue confrontation.

Therefore:

> **ROGUE CONFRONTATION REWARD = NONE under current authority.**

Coding must not invent:
- Ryō;
- items;
- Character EXP;
- Stat gains;
- hidden development payout;
- bounty.

IWA-02 itself already records adaptive Earth-Release evidence with no additional Origin development payout.

## 9. Battle save/load and idempotence

Persist:
- encounter/config ID;
- Rogue stable/Registry mapping;
- Remaining Battle PL;
- turn/action-opportunity state;
- transient Combat state;
- committed action receipts;
- terminal Battle result;
- Story caller/return lineage.

Reload must not:
- restart a terminal Battle;
- change the Rogue stable identity;
- duplicate IWA source occurrences;
- reroll a committed action;
- fabricate capture/escape from Battle result.

# BRANCH B — BLOCK HIS ESCAPE WITH EARTH RELEASE

## 10. Environmental action truth

The Writing beat establishes an actual environmental action:

Iwabee raises earth across the Rogue's escape route.

This action is:
- Story/world environmental capability;
- legitimate current Earth Release use;
- not automatically a Battle attack;
- not a PL mutation;
- not automatic restraint/capture;
- not injury.

When the wall/terrain constraint successfully exists as authored, commit:

earthReleaseUsedToConstrainRogueGenin = true

rogueGeninParticipantRef = iwabee_origin_rogue_genin_01

under:

occ_origin_iwabee_rogue_genin_response_resolution

IWA-02 commits at this factual environmental-constraint boundary.

It does **not** wait for later Battle victory/capture/surrender.

## 11. Meaning of "constrained"

For this branch:

> **CONSTRAINED = THE AUTHORED ESCAPE ROUTE HAS BEEN PHYSICALLY BLOCKED / MOBILITY OPTIONS HAVE BEEN NARROWED.**

It does **not** automatically mean:
- immobilized;
- bound;
- stunned;
- captured;
- detained;
- unable to fight;
- 0 PL.

Do not translate the Story wall into Stone Snare, Stun, or another Combat condition unless Combat separately authorises an exact transition.

## 12. No hidden Battle advantage

Under current authority, the environmental constraint changes Story/world position only.

It grants no automatic:
- PL damage;
- Attack PL bonus;
- first-turn bonus;
- Stun;
- target lock;
- action denial;
- guard penalty;
- reduced Starting PL;
- forced surrender.

If World selects a confrontation that transitions into Battle, that Battle uses the same exact Rogue Battle representation/package as the direct confrontation branch and normal starting PL/state unless Combat later authors a specific contextual state.

No such Battle modifier is authorised by this CE contract.

## 13. World response resolver owns what happens next

After IWA-02 has factually committed, World / Missions / Events must close the Rogue's next occurrence state.

World must define exact eligibility/outcome conditions among the authorised factual families, including whether the Rogue:
- surrenders;
- is detained/captured by a legitimate actor;
- initiates/continues confrontation into PL Battle;
- remains constrained but unresolved;
- escapes through another legitimate route if World establishes one;
- is otherwise resolved by an already-authorised actor.

CE does not invent a surrender probability, morale stat, cowardice/bravery system or custody actor.

## 14. If World chooses Battle after escape-block

Use the same Battle IDs/package as the direct confrontation unless World/Combat requires a distinct config solely to preserve the pre-Battle occurrence fact.

At semantic minimum:
- same Rogue Registry representation;
- same Rogue Base/current PL;
- same prepared palette;
- same Iwabee legal palette;
- same PL withdrawal rules;
- same no-injury/death inference.

The return envelope must additionally preserve:

earthReleaseUsedToConstrainRogueGenin = true

and the exact World pre-Battle state.

Battle result still does not itself determine custody/escape.

## 15. Custody actor

Current source authority does not establish who takes custody after a successful constraint or confrontation.

The Academy instructor is physically present in Story, but physical presence alone does not create custody authority.

World must close:
- whether the instructor is the responsible custody actor;
- whether another Academy/village actor intervenes;
- whether no custody occurs.

Coding must not infer "instructor captures Rogue" merely because the instructor is on scene.

# OTHER ROUTES

## 16. CALL THE INSTRUCTOR

This remains a legitimate escalation route.

World owns the Rogue's exact resolution after the instructor takes responsibility.

No cowardice/incompetence inference.

IWA-02 remains false unless Iwabee also factually performed the exact Earth-Release escape constraint.

## 17. FINISH THE PRACTICAL

This remains legitimate objective prioritisation.

IWA-01 remains complete.

World owns whether the Rogue:
- escapes;
- is intercepted by another actor;
- remains unresolved;
- reaches another factual state.

Iwabee does not receive Rogue-resolution credit merely because another actor resolves it.

# SOURCE / HISTORY

## 18. IWA-01 remains independent

IWA-01:

occ_origin_iwabee_training_ground_reshape_resolution

Fact:

trainingGroundReshapeObjectiveCompletedByIwabee = true

This is already complete before the Rogue response branch.

Terrain-task success != Rogue resolution.

## 19. IWA-02 exact commit

IWA-02:

occ_origin_iwabee_rogue_genin_response_resolution

Stable Rogue:

iwabee_origin_rogue_genin_01

Qualifying fact:

earthReleaseUsedToConstrainRogueGenin = true

Commit exactly once when the authored Earth-Release escape-route constraint becomes factual.

Do not recommit after Battle/capture/Story return.

World may attach additional resolved Rogue state to the same occurrence envelope, but IWA-02 qualification remains the narrow Earth-constraint fact.

# DOWNSTREAM OWNERSHIP

## 20. PL / Registry / Rank — first blocker

Must close Rogue Battle representation + PL before Combat can author the encounter package.

## 21. Combat — second owner

After PL/Registry closure, Combat must close:
- Rogue exact prepared palette;
- action values/semantics;
- AI legality;
- one-on-one compatibility;
- any exact contextual Battle state if it believes the escape-block wall legitimately requires one.

Default CE authority is **no hidden Battle modifier**.

Combat must not decide custody/surrender merely from Battle math.

## 22. World / Missions / Events — third owner

After the Battle package exists, World must close:
- post-confrontation Rogue disposition by factual Battle outcome;
- post-escape-block Rogue response conditions;
- surrender/capture/confrontation/unresolved/escape branches;
- exact custody actor, if any;
- exact World result fields passed back to Story;
- confirmation that no reward is granted unless World explicitly authors one.

World should then route the implementation-ready package directly to Coding/Runtime.

## 23. Coding release condition

Coding may not invent:
- Rogue Stats/PL;
- Rogue Skills;
- surrender logic;
- capture/custody;
- reward.

Once PL -> Combat -> World closes:
- implement direct confrontation caller/return;
- implement escape-block IWA-02 commit;
- implement World resolver;
- use same exact Rogue Battle package where Battle occurs;
- preserve save/load/idempotence;
- preserve Story return beats;
- prove 0 PL withdrawal without injury/death inference;
- prove direct Battle victory does not counterfeit IWA-02.

## 24. Final lock

> **Academy Iwabee's CONFRONT HIM branch is a real one-on-one evolved PL Battle between academy_iwabee and the stable Rogue participant iwabee_origin_rogue_genin_01 once PL/Registry supplies that participant's Battle representation. Ordinary 0-PL withdrawal ends the Battle but does not establish injury, death, escape, capture or custody. The BLOCK HIS ESCAPE WITH EARTH RELEASE branch commits IWA-02 as soon as the authored environmental wall/terrain constraint factually blocks/narrows the Rogue's escape route. That constraint is Story/world position only under current authority: it causes no PL damage, Stun, first-turn bonus or hidden Battle modifier. It does not itself mean capture. World owns the Rogue's next factual state and any custody actor. If World transitions the constrained branch into Battle, it uses the same Rogue Battle package and ordinary PL rules unless Combat explicitly closes a contextual state. IWA-01 terrain success, IWA-02 adaptive Earth-Release evidence and Rogue resolution remain separate facts.**
