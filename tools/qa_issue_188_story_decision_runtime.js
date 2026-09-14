#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const assert=require("assert");

function load(path){
  vm.runInThisContext(fs.readFileSync(path,"utf8"),{filename:path});
}
function freshPlayer(){
  globalThis.playerData={};
  globalThis.savePlayerData=()=>{};
}
function choice(choiceId,intentType,resolverBindingRef,presentationLabel=choiceId){
  return{choiceId,intentType,resolverBindingRef,presentationLabel};
}

freshPlayer();
load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-kakashi-final-origin-adapter-34100.js");

const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
assert(CORE,"34000 core missing");
assert(KAK,"34100 Kakashi adapter missing");

const coreDiag=globalThis.runStoryDecisionRealisation34000Diagnostics();
assert.strictEqual(coreDiag.pass,true,`34000 diagnostics failed: ${coreDiag.failed.join(",")}`);
const kakDiag=globalThis.runAlphaKakashiFinal34100Diagnostics();
assert.strictEqual(kakDiag.pass,true,`34100 diagnostics failed: ${kakDiag.failed.join(",")}`);
assert.strictEqual(kakDiag.anchorCount,32,"Kakashi must expose all 32 final autonomy anchors");

// ---------------------------------------------------------------------------
// Stable unresolved semantic set + save/load anti-reroll.
// ---------------------------------------------------------------------------
const initialState={committedStateRef:"kak-state-initial-001"};
const opened=KAK.openDecisionPoint("AK_SA_001",initialState);
assert.strictEqual(opened.success,true,"Kakashi initial decision should open");
assert.strictEqual(opened.choiceSet.choices.length,4,"Kakashi initial decision family must stay four-way");
const firstChoiceSetId=opened.choiceSet.choiceSetId;
const reopened=KAK.openDecisionPoint("AK_SA_001",initialState);
assert.strictEqual(reopened.success,true);
assert.strictEqual(reopened.idempotent,true);
assert.strictEqual(reopened.choiceSet.choiceSetId,firstChoiceSetId,"same committed state rerolled semantic choice set");
const saved=JSON.parse(JSON.stringify(globalThis.playerData));
globalThis.playerData=saved;
const afterLoad=KAK.openDecisionPoint("AK_SA_001",initialState);
assert.strictEqual(afterLoad.success,true);
assert.strictEqual(afterLoad.choiceSet.choiceSetId,firstChoiceSetId,"JSON save/load changed unresolved semantic choice set");

// ---------------------------------------------------------------------------
// Same committed state cannot silently drift to a different semantic set.
// ---------------------------------------------------------------------------
const driftSpec={
  storyUnitRef:"qa_drift_unit",storyUnitType:"origin",decisionPointRef:"qa_decision",contextStateRef:"qa_state_1",
  choices:[choice("a","intent_a","qa.resolver.a")]
};
const driftOpen=CORE.openSemanticChoiceSet(driftSpec);
assert.strictEqual(driftOpen.success,true);
const driftReplay=CORE.openSemanticChoiceSet(driftSpec);
assert.strictEqual(driftReplay.success,true);
assert.strictEqual(driftReplay.choiceSet.choiceSetId,driftOpen.choiceSet.choiceSetId);
const driftChanged=CORE.openSemanticChoiceSet({...driftSpec,choices:[choice("b","intent_b","qa.resolver.b")]});
assert.strictEqual(driftChanged.success,false);
assert.strictEqual(driftChanged.reason,"semantic_choice_set_drift_same_committed_state");

// ---------------------------------------------------------------------------
// Intent commits before factual result; missing owner result fails closed but
// preserves committed intent provenance, then an authorised result can resume.
// ---------------------------------------------------------------------------
const attackCommit=CORE.commitStoryIntent({storyUnitRef:"academy_kakashi",choiceSetId:firstChoiceSetId,choiceId:"attack"});
assert.strictEqual(attackCommit.success,true);
assert.strictEqual(attackCommit.receipt.status,"intent_committed");
assert.strictEqual(attackCommit.receipt.selectedIntent.intentType,"attack");
assert.strictEqual(attackCommit.receipt.resolverResultRef,null);
const attackBlocked=CORE.dispatchCommittedIntent({storyUnitRef:"academy_kakashi",receiptId:attackCommit.receipt.storyDecisionReceiptId,state:{committedStateRef:"kak-state-initial-001"}});
assert.strictEqual(attackBlocked.success,false);
assert.strictEqual(attackBlocked.reason,"owning_resolver_result_not_supplied");
const blockedSnapshot=CORE.getStoryUnitSnapshot("academy_kakashi");
assert.strictEqual(blockedSnapshot.decisionReceipts[attackCommit.receipt.storyDecisionReceiptId].selectedIntent.intentType,"attack");
assert.strictEqual(blockedSnapshot.decisionReceipts[attackCommit.receipt.storyDecisionReceiptId].status,"resolver_blocked");
const attackBinding="academy_kakashi.resolver.attack";
const attackResolved=CORE.dispatchCommittedIntent({
  storyUnitRef:"academy_kakashi",receiptId:attackCommit.receipt.storyDecisionReceiptId,
  state:{committedStateRef:"kak-state-initial-001",resolverResults:{[attackBinding]:{success:true,resolverResultRef:"qa_attack_result",stateDeltaRefs:["qa_attack_state"],successorSituationRef:"qa_attack_successor"}}}
});
assert.strictEqual(attackResolved.success,true);
assert.strictEqual(attackResolved.receipt.status,"resolved");
assert.strictEqual(attackResolved.receipt.resolverResultRef,"qa_attack_result");
assert.strictEqual(attackResolved.receipt.successorSituationRef,"qa_attack_successor");

// ---------------------------------------------------------------------------
// Deterministic KILL means DEAD. Non-death is rejected, then a DEAD owner
// result is accepted without converting the choice into resolver-lethal intent.
// ---------------------------------------------------------------------------
const killOpen=KAK.openDecisionPoint("AK_SA_013",{committedStateRef:"kak-state-disposition-001"});
assert.strictEqual(killOpen.success,true);
const killCommit=CORE.commitStoryIntent({storyUnitRef:"academy_kakashi",choiceSetId:killOpen.choiceSet.choiceSetId,choiceId:"kill"});
assert.strictEqual(killCommit.success,true);
assert.strictEqual(killCommit.receipt.selectedIntent.intentType,"kill_deterministic");
const killBinding="academy_kakashi.lethal.kill_deterministic";
const killRejected=CORE.dispatchCommittedIntent({
  storyUnitRef:"academy_kakashi",receiptId:killCommit.receipt.storyDecisionReceiptId,
  state:{resolverResults:{[killBinding]:{success:true,resolverResultRef:"qa_bad_kill",outcomeClass:"SURVIVED"}}}
});
assert.strictEqual(killRejected.success,false);
assert.strictEqual(killRejected.reason,"deterministic_kill_result_must_commit_dead");
const killAccepted=CORE.dispatchCommittedIntent({
  storyUnitRef:"academy_kakashi",receiptId:killCommit.receipt.storyDecisionReceiptId,
  state:{resolverResults:{[killBinding]:{success:true,resolverResultRef:"qa_dead",outcomeClass:"DEAD",stateDeltaRefs:["amt_dead"]}}}
});
assert.strictEqual(killAccepted.success,true);
assert.strictEqual(killAccepted.receipt.resolverResultRef,"qa_dead");

// ---------------------------------------------------------------------------
// Participant-first: due autonomy blocks protagonist choice; non-Battle
// autonomy consumes once/idempotently; Battle-owned autonomy never free-acts.
// ---------------------------------------------------------------------------
const dueDecisionBlocked=KAK.openDecisionPoint("AK_SA_005",{committedStateRef:"kak-state-due-001",dueAnchorIds:["AK_SA_012"]});
assert.strictEqual(dueDecisionBlocked.success,false);
assert.strictEqual(dueDecisionBlocked.reason,"participant_autonomy_due_before_protagonist");
const autonomyState={
  committedStateRef:"kak-state-autonomy-001",dueAnchorIds:["AK_SA_012"],
  autonomyResults:{AK_SA_012:{success:true,participantIntentRef:"pakkun_hold_position",resolverResultRef:"qa_pakkun_autonomy",consequenceRefs:["qa_pakkun_consequence"]}}
};
const autonomyFirst=CORE.consumeNextAutonomy({storyUnitRef:"academy_kakashi",state:autonomyState});
assert.strictEqual(autonomyFirst.success,true);
assert.strictEqual(autonomyFirst.receipt.resolverResultRef,"qa_pakkun_autonomy");
const autonomyAgain=CORE.consumeNextAutonomy({storyUnitRef:"academy_kakashi",state:autonomyState});
assert.strictEqual(autonomyAgain.success,true);
assert.strictEqual(autonomyAgain.idempotent,true,"same autonomy window rerolled on replay");
const battleAutonomy=CORE.consumeNextAutonomy({storyUnitRef:"academy_kakashi",state:{committedStateRef:"kak-state-battle-001",dueAnchorIds:["AK_SA_011"]}});
assert.strictEqual(battleAutonomy.success,false);
assert.strictEqual(battleAutonomy.reason,"battle_owns_action_economy");

// Contested due autonomy at identical priority cannot be arbitrarily ordered.
CORE.registerAutonomyAnchor("qa_contested",{anchorId:"A",classes:["PARTICIPANT_AUTONOMY"],actorRef:"actor_a",due:()=>true,resolve:()=>({success:true})});
CORE.registerAutonomyAnchor("qa_contested",{anchorId:"B",classes:["PARTICIPANT_AUTONOMY"],actorRef:"actor_b",due:()=>true,resolve:()=>({success:true})});
const contested=CORE.evaluateDueAutonomy("qa_contested",{committedStateRef:"qa-contested-state"});
assert.strictEqual(contested.success,false);
assert.strictEqual(contested.reason,"contested_autonomy_order_requires_authority");

// ---------------------------------------------------------------------------
// Terminal guard: unresolved material fact blocks debrief/Receipt; after factual
// state commits, terminal projection is allowed. This is read-only gating.
// ---------------------------------------------------------------------------
const terminalBlocked=KAK.terminalGuard({committedStateRef:"kak-terminal-001",materiallyRelevantRefs:["package_custody"]});
assert.strictEqual(terminalBlocked.success,false);
assert.strictEqual(terminalBlocked.reason,"terminal_projection_blocked_unresolved_material_state");
const material=KAK.recordPostResolutionState({materialStates:[{materialRef:"package_custody",resolved:true,stateRef:"package_kakashi",value:{holderRef:"academy_kakashi"}}]});
assert.strictEqual(material.success,true);
const terminalAllowed=KAK.terminalGuard({committedStateRef:"kak-terminal-001",materiallyRelevantRefs:["package_custody"]});
assert.strictEqual(terminalAllowed.success,true);
assert.strictEqual(terminalAllowed.terminalProjectionAllowed,true);

// Final adapter must preserve current supersession: TAKE HIM DOWN does not
// hard-code package recovery and the browser Golden is still explicitly false.
assert.strictEqual(KAK.browserGoldenClaimed,false);
assert.strictEqual(CORE.browserGoldenClaimed,false);
assert(KAK.anchors.find(row=>row.anchorId==="AK_SA_024"),"AK_SA_024 missing");

const report={
  pass:true,
  corePatch:CORE.patchId,
  kakashiPatch:KAK.patchId,
  anchorCount:kakDiag.anchorCount,
  initialChoiceSetId:firstChoiceSetId,
  attackIntentCommittedBeforeResult:true,
  deterministicKillDeadOnly:true,
  participantFirstAutonomy:true,
  battleOwnedAutonomyNoFreeAction:true,
  contestedAutonomyFailsClosed:true,
  terminalSemanticGuard:true,
  browserGoldenClaimed:false
};
console.log(JSON.stringify(report,null,2));
