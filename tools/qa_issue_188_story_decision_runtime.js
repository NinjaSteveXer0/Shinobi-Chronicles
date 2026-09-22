#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const assert=require("assert");

globalThis.playerData={};
globalThis.savePlayerData=()=>{};
vm.runInThisContext(fs.readFileSync("runtime/alpha-story-decision-realisation-34000.js","utf8"),{filename:"runtime/alpha-story-decision-realisation-34000.js"});

const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
assert(CORE,"neutral Story Decision core missing");
const diagnostics=globalThis.runStoryDecisionRealisation34000Diagnostics();
assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics,null,2));
assert.strictEqual(diagnostics.browserGoldenClaimed,false);

// Stable unresolved semantic set + anti-reroll.
const spec={
  storyUnitRef:"qa_story_unit",
  storyUnitType:"origin",
  decisionPointRef:"qa_opening",
  contextStateRef:"qa_state_001",
  choices:[
    {choiceId:"inspect",intentType:"inspect",resolverBindingRef:"qa.resolve.inspect",presentationLabel:"Inspect"},
    {choiceId:"wait",intentType:"wait",resolverBindingRef:"qa.resolve.wait",presentationLabel:"Wait"}
  ]
};
const opened=CORE.openSemanticChoiceSet(spec);
assert.strictEqual(opened.success,true);
const replay=CORE.openSemanticChoiceSet(spec);
assert.strictEqual(replay.success,true);
assert.strictEqual(replay.idempotent,true);
assert.strictEqual(replay.choiceSet.choiceSetId,opened.choiceSet.choiceSetId);
const drift=CORE.openSemanticChoiceSet({...spec,choices:[{choiceId:"other",intentType:"other",resolverBindingRef:"qa.resolve.other"}]});
assert.strictEqual(drift.success,false);
assert.strictEqual(drift.reason,"semantic_choice_set_drift_same_committed_state");

// Intent provenance survives a missing resolver, then resumes once the owner is registered.
const committed=CORE.commitStoryIntent({storyUnitRef:"qa_story_unit",choiceSetId:opened.choiceSet.choiceSetId,choiceId:"inspect"});
assert.strictEqual(committed.success,true);
assert.strictEqual(committed.receipt.status,"intent_committed");
const blocked=CORE.dispatchCommittedIntent({storyUnitRef:"qa_story_unit",receiptId:committed.receipt.storyDecisionReceiptId,state:{committedStateRef:"qa_state_001"}});
assert.strictEqual(blocked.success,false);
assert.strictEqual(blocked.reason,"resolver_binding_not_registered");
assert(CORE.registerResolver("qa.resolve.inspect",()=>({success:true,resolverResultRef:"qa_result_inspect",stateDeltaRefs:["qa_state_delta"],successorSituationRef:"qa_next"}),{owner:"qa"}).success);
const resolved=CORE.dispatchCommittedIntent({storyUnitRef:"qa_story_unit",receiptId:committed.receipt.storyDecisionReceiptId,state:{committedStateRef:"qa_state_001"}});
assert.strictEqual(resolved.success,true);
assert.strictEqual(resolved.receipt.status,"resolved");
assert.strictEqual(resolved.receipt.resolverResultRef,"qa_result_inspect");
assert.strictEqual(resolved.receipt.successorSituationRef,"qa_next");

// Participant-first autonomy remains stable and Battle-owned action economy remains protected.
assert(CORE.registerAutonomyAnchor("qa_autonomy_unit",{anchorId:"qa_actor_move",classes:["PARTICIPANT_AUTONOMY"],actorRef:"qa_actor",priority:10,due:()=>true,resolve:()=>({success:true,participantIntentRef:"qa_move",resolverResultRef:"qa_move_result"})}).success);
const autonomy=CORE.consumeNextAutonomy({storyUnitRef:"qa_autonomy_unit",state:{committedStateRef:"qa_auto_state"}});
assert.strictEqual(autonomy.success,true);
const autonomyReplay=CORE.consumeNextAutonomy({storyUnitRef:"qa_autonomy_unit",state:{committedStateRef:"qa_auto_state"}});
assert.strictEqual(autonomyReplay.success,true);
assert.strictEqual(autonomyReplay.idempotent,true);

assert(CORE.registerAutonomyAnchor("qa_battle_unit",{anchorId:"qa_battle_actor",classes:["BATTLE_OWNED_AUTONOMY"],actorRef:"qa_battle_actor",priority:10,due:()=>true,battleOwned:true,resolve:()=>({success:true})}).success);
const battleOwned=CORE.consumeNextAutonomy({storyUnitRef:"qa_battle_unit",state:{committedStateRef:"qa_battle_state"}});
assert.strictEqual(battleOwned.success,false);
assert.strictEqual(battleOwned.reason,"battle_owns_action_economy");

assert(CORE.registerAutonomyAnchor("qa_contested",{anchorId:"A",classes:["PARTICIPANT_AUTONOMY"],actorRef:"actor_a",priority:10,due:()=>true,resolve:()=>({success:true})}).success);
assert(CORE.registerAutonomyAnchor("qa_contested",{anchorId:"B",classes:["PARTICIPANT_AUTONOMY"],actorRef:"actor_b",priority:10,due:()=>true,resolve:()=>({success:true})}).success);
const contested=CORE.evaluateDueAutonomy("qa_contested",{committedStateRef:"qa_contested_state"});
assert.strictEqual(contested.success,false);
assert.strictEqual(contested.reason,"contested_autonomy_order_requires_authority");

// Terminal semantic guard blocks unresolved material facts and opens only after owner state is committed.
const terminalBlocked=CORE.terminalSemanticGuard({storyUnitRef:"qa_terminal_unit",requiredMaterialRefs:["qa_material"],state:{committedStateRef:"qa_terminal_state"}});
assert.strictEqual(terminalBlocked.success,false);
assert.strictEqual(terminalBlocked.reason,"terminal_projection_blocked_unresolved_material_state");
assert(CORE.recordMaterialState({storyUnitRef:"qa_terminal_unit",materialRef:"qa_material",resolved:true,stateRef:"qa_material_committed",value:{holderRef:"qa_holder"}}).success);
const terminalAllowed=CORE.terminalSemanticGuard({storyUnitRef:"qa_terminal_unit",requiredMaterialRefs:["qa_material"],state:{committedStateRef:"qa_terminal_state"}});
assert.strictEqual(terminalAllowed.success,true);
assert.strictEqual(terminalAllowed.terminalProjectionAllowed,true);

console.log(JSON.stringify({
  pass:true,
  corePatch:CORE.patchId,
  stableSemanticChoiceSet:true,
  explicitResolverDispatch:true,
  participantFirstAutonomy:true,
  battleOwnedAutonomyNoFreeAction:true,
  contestedAutonomyFailsClosed:true,
  terminalSemanticGuard:true,
  browserGoldenClaimed:false
},null,2));
