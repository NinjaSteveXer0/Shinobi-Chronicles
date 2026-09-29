# Shinobi Chronicles — Academy Wasabi Izuno Final Reflection Route-State Correction

**Date:** 2026-09-29  
**Owner:** Stephen / Writing — Konoha  
**Status:** **OWNER-DIRECT PLAYER-FACING STORY CORRECTION — BINDING NOW**  
**Production Origin:** `academy_izuno`

## Defect

Installed-browser review shows the current runtime still renders the legacy universal final reflection set:

- `Next time I'm trusting the trail.`
- `Next time I'm trusting what I notice.`
- `Sometimes the fastest path isn't the obvious one.`
- `Catching them wasn't the only thing that mattered.`

This shared set is invalid.

It incorrectly makes successful routes — especially the owner-restored River direct catch — read as if Wasabi lost or needs a consolation lesson.

## Hard correction

Delete the universal four-choice reflection set.

Final reflection choices must be selected from the committed factual route/result.

No successful route may consume a failure reflection family.

## Exact player-facing replacements

### River success — `river_route -> direct_catch`

1. **“I caught them the hard way.”**
2. **“Next time I beat that time.”**
3. **“Give them a bigger head start.”**
4. **“I want the rematch.”**

This is a success family.

Do not append:
- `You lost`;
- `catching them wasn't the only thing that mattered`;
- any near-miss/failure lesson.

### Intercept success — `intercept_prediction -> intercept_before_extraction`

1. **“Why chase from behind if I can get there first?”**
2. **“The route mattered more than the trail.”**
3. **“I trusted my read. It worked.”**
4. **“Next time I cut them off sooner.”**

This is also a success family.

### False-trail result — `stronger_trail -> false_trail_discovered`

1. **“They got me with that one.”**
2. **“I saw the trick. Just too late.”**
3. **“Next time I check what doesn't fit.”**
4. **“They'll need a better trick next time.”**

### Rogue STEP IN

1. **“I'd step in again.”**
2. **“Next time I end the fight faster.”**
3. **“The target got away. I still finished what I started.”**
4. **“I need to know how much time a fight really costs.”**

### Rogue CALL FOR HELP

1. **“Calling the instructor was faster.”**
2. **“I got the student moving.”**
3. **“Next time I hand it off sooner.”**
4. **“I can watch the chase and the people in it.”**

### Rogue KEEP PURSUING

1. **“I chose the target.”**
2. **“I waited too long before I moved.”**
3. **“Next time I decide immediately.”**
4. **“Give me another shot at the chase.”**

## Preserve

This correction does not change:
- scene count;
- backdrop mapping;
- actors;
- pursuit target;
- Rogue Genin;
- PL Battle;
- IZU-01..04;
- River +1 Stamina Development EXP;
- rewards;
- morality/personality scoring.

## Implementation rule

The runtime must branch the final reflection family from the actual committed route/result.

Do not reuse one shared reflection array and merely change the preceding narration.

## Final lock

> **Wasabi's final four choices must describe what actually happened. River and Intercept are successes and must read like successes. The legacy universal four-choice set is retired.**
