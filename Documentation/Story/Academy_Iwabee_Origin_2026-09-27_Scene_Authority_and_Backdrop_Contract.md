# Academy Iwabee Origin — Scene Authority + Backdrop Contract

**Date:** 2026-09-27  
**Owner:** Stephen / Writing — Konoha  
**Status:** **CURRENT SPECIALIST SUCCESSOR AUTHORITY — PLAYER-FACING REWRITE INPUT**  
**Origin:** `academy_iwabee`

## Governing durable authority

Consumes:

- CE: `Games/Shinobi Chronicles/Academy Iwabee Origin - Final Practical Reshaping Writing Lock.md`
  - blob `88fcaf1b645b0904ce789819599110dfb0a8cec1`;
- SC Writing source binding for IWA-01;
- World source binding for IWA-02;
- current UI backdrop coverage audit;
- universal #333 player-facing Story quality gate;
- universal Story-box segmentation authority.

Core semantic:

> **poor formal/written performance != poor shinobi capability**

---

# 1. Setting / backdrop

Primary location:

**Academy yard / practical training ground — daytime.**

Approved reusable backdrop:

`Scene backdrops/academy_training_ground_courtyard.png`

UI authority explicitly records Academy Iwabee as covered by this asset.

Occurrence-specific damaged/reshaped terrain is **scene state**, not a reason to create a bespoke damaged-ground backdrop.

Every Origin scene remains on this same practical ground unless later explicit successor authority changes it.

---

# 2. Scene 1 — Practical frustration

Iwabee enters already frustrated by his weak formal/written Academy performance.

The instructor gives him a direct practical task instead.

Player-facing objective:

> **Make the area usable again.**

The scene should establish:
- Iwabee knows he struggles with written/formal work;
- he is already irritated by what that struggle seems to say about him;
- the practical gives him a different kind of problem.

Do not have the narrator explain:
- capability/performance doctrine;
- institutional measurement theory;
- personality labels.

Show the contrast through what Iwabee can actually do.

### Backdrop
`Scene backdrops/academy_training_ground_courtyard.png`

---

# 3. Scene 2 — Earth Release practical

Locked terrain choices:

1. **RAISE THE COLLAPSED SECTION**
2. **FLATTEN THE DAMAGED GROUND**
3. **BUILD A STABLE PATH THROUGH IT**
4. **REINFORCE THE WEAKEST SECTION**

These are contextual uses of Iwabee's Earth Release / Ninjutsu capability.

They are:
- not new Technique identities merely because prose names the action;
- not attacks;
- not Battle actions by default.

Each choice must produce a factual corresponding terrain change.

All four choices complete the formal practical objective unless a later explicit resolver says otherwise.

IWA-01:

`occ_origin_iwabee_training_ground_reshape_resolution`

Required fact:

`trainingGroundReshapeObjectiveCompletedByIwabee = true`

### Backdrop
continue `Scene backdrops/academy_training_ground_courtyard.png`

---

# 4. Scene 3 — Unexpected exposure

Iwabee's terrain change exposes:

**Rogue Genin**

Stable World ref:

`iwabee_origin_rogue_genin_01`

The Rogue Genin:
- was already concealed in/around the damaged area;
- is not part of the Academy exercise;
- was not planted by the instructor;
- is not a morality-test actor.

The causal chain is:

> **Iwabee changes the terrain -> the changed terrain removes concealment -> the Rogue Genin is exposed.**

Do not imply the Rogue was created/spawned by the Earth Release itself.

### Backdrop
continue same backdrop.

---

# 5. Scene 4 — Rogue Genin response

Locked response choices:

1. **CONFRONT HIM**
2. **BLOCK HIS ESCAPE WITH EARTH RELEASE**
3. **CALL THE INSTRUCTOR**
4. **FINISH THE PRACTICAL**

These are actual decisions, not personality labels.

## Confront him

Iwabee directly challenges the Rogue Genin.

This may launch a short PL Battle if the encounter contract establishes combat.

Battle exists because the confrontation produced one.

## Block his escape with Earth Release

Iwabee reshapes the environment again to constrain the Rogue Genin's route.

This is the only branch that can satisfy IWA-02's specific:

`earthReleaseUsedToConstrainRogueGenin = true`

The encounter resolver may produce:
- surrender/capture;
- constrained confrontation;
- PL Battle;

according to the current World/Combat contract.

Writing does not guess the resolver.

## Call the instructor

Iwabee escalates the unexpected hostile to the responsible adult.

Do not infer:
- cowardice;
- incompetence;
- inability to fight.

The practical objective remains separately complete.

## Finish the practical

Iwabee chooses not to divert from the assigned objective.

He completes/retains the training-ground success.

The Rogue Genin may:
- escape;
- be dealt with by another legitimate actor;

according to the World resolver.

Do not rewrite this as:
- moral failure;
- incompetence;
- total Origin failure.

### Backdrop
continue same backdrop.

---

# 6. Scene 5 — Conditional PL Battle

There is **no mandatory Battle** in this Origin.

Battle is legal only when the Rogue Genin encounter genuinely produces a confrontation requiring Battle.

Current CE contract closes the direct confrontation as:

Config:
`academy_iwabee_origin_rogue_confrontation`

Encounter:
`origin_academy_iwabee:rogue_genin_confrontation`

Historical participant:
`iwabee_origin_rogue_genin_01`

Reusable Battle template:
`rogue_genin`

Rogue Base PL:
**23**

Iwabee Base PL remains:
**13**

Caller:
after `iwa_confront_05`

Return:
`iwa_confront_return_01`

Earth Release practical remains Story.

Environmental constraint remains Story unless/until World/Combat transitions into Battle.

0 Battle PL remains withdrawal, not automatic injury/death/capture/escape.

Direct Battle victory does not satisfy IWA-02 by itself and does not determine final World disposition.

No reward is currently authorised.

### Backdrop / Battle environment
`Scene backdrops/academy_training_ground_courtyard.png`

---

# 7. Scene 6 — Instructor evaluation

The instructor evaluates two separate things:

1. what Iwabee did with the damaged training ground;
2. what Iwabee chose to do when the Rogue Genin appeared.

Locked dialogue meaning:

**INSTRUCTOR:** “You know what your problem is, Iwabee?”

**IWABEE:** “Yeah. Written tests.”

**INSTRUCTOR:** “No. You keep acting like the only things that count are the things you're bad at.”

The instructor does not pretend Iwabee's weaknesses are irrelevant.

The point is that Iwabee is treating those weaknesses as if they invalidate everything else he can do.

The evaluation should react naturally to the actual Rogue Genin route:
- confrontation;
- Earth-Release constraint;
- instructor escalation;
- practical-only completion.

Do not reduce all four to the same generic praise/reprimand.

### Backdrop
continue same backdrop.

---

# 8. Scene 7 — Final self-interpretation

Locked choices:

1. **“I know what I'm good at.”**
2. **“I still need to get better at the rest.”**
3. **“Maybe the Academy tests the wrong things.”**
4. **“I don't care what they think.”**

These are things this Iwabee thinks/says now.

They do not automatically create:
- CONFIDENT;
- HARD-WORKING;
- ANTI-ACADEMY;
- DEFIANT;
- alignment;
- permanent Trait;
- permanent Progression state.

Preserve exact chosen intent as ordinary Chronicle Story history.

---

# 9. Scene 8 — Origin close

After the final self-interpretation:

**YOUR CHRONICLE BEGINS**

Then shared Origin -> Active Konoha continuity.

No OriginSuccess boolean may erase:
- terrain solution;
- Rogue response;
- conditional Battle result;
- Iwabee's final self-interpretation.

---

# 10. IWA source preservation

## IWA-01

`occ_origin_iwabee_training_ground_reshape_resolution`

Commit when the formal terrain-reshaping objective has resolved and it is factual whether Iwabee completed it.

## IWA-02

`occ_origin_iwabee_rogue_genin_response_resolution`

Stable participant:

`iwabee_origin_rogue_genin_01`

Required source facts include:
- `rogueGeninParticipantRef`;
- `earthReleaseUsedToConstrainRogueGenin`.

Battle victory alone does not satisfy IWA-02.

---

# 11. Character capability rule

Iwabee's Earth Release changes the verbs available in Story.

It supports:
- raising terrain;
- flattening terrain;
- creating a stable path;
- reinforcing terrain;
- blocking an escape route.

This does not make Iwabee merely “the Earth Release character.”

His frustration, pride, bluntness, judgement and self-interpretation determine how those capabilities are used.

---

# 12. Story-box segmentation

Every ordinary narration/dialogue unit must obey:

> **one Story box = one readable paragraph / dramatic beat**

No scroll-dependent narration.

Choices appear only after the complete preceding beat.

---

# 13. Current implementation status

CE has closed both scoped semantics.

## CONFRONT HIM

Exact Battle shape:
- config `academy_iwabee_origin_rogue_confrontation`;
- encounter `origin_academy_iwabee:rogue_genin_confrontation`;
- Iwabee vs stable `iwabee_origin_rogue_genin_01`;
- stable Rogue consumes reusable `rogue_genin` template;
- Base PL23;
- caller after `iwa_confront_05`;
- return `iwa_confront_return_01`;
- no reward;
- 0 PL = withdrawal only.

Combat owns exact action-package viability / AI.

World owns post-Battle escape/custody/surrender/unresolved state.

## BLOCK HIS ESCAPE WITH EARTH RELEASE

At the authored environmental-constraint boundary, commit exactly once:

`earthReleaseUsedToConstrainRogueGenin = true`

and preserve:

`rogueGeninParticipantRef = iwabee_origin_rogue_genin_01`

That boundary commits IWA-02.

Constraint means:
- escape route narrowed/blocked;
- not automatic immobilisation;
- not Stun;
- not capture;
- no PL damage;
- no starting-PL reduction;
- no first-turn bonus;
- no hidden Battle modifier.

If a later Battle occurs, ordinary starting state applies unless Combat separately authorises exact context.

## Remaining downstream

Registry/PL mapping is now durable:
`Documentation/Registry/Academy Iwabee Origin Rogue Genin Registry and PL Mapping 2026-09-27.md`

Combat -> World -> Coding still own the remaining implementation chain.

Writing must not invent the final Rogue disposition.

---

# FINAL LOCK

> **Iwabee succeeds at a real practical task before the unexpected Rogue Genin response is judged.**

> **Terrain success and Rogue resolution are separate facts.**

> **Earth Release is environmental capability, not merely an attack button.**

> **Calling the instructor and finishing the practical are legitimate responses, not personality failures.**

> **Every scene uses `Scene backdrops/academy_training_ground_courtyard.png`.**
