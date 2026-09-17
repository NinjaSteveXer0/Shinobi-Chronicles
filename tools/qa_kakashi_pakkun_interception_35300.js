"use strict";
const fs=require("fs");
const assert=require("assert");
const path=require("path");
const vm=require("vm");
const ROOT=process.cwd();
const read=p=>fs.readFileSync(path.join(ROOT,p),"utf8");
const consumer=read("runtime/alpha-kakashi-pakkun-interception-35300.js");
const loader=read("runtime/alpha-kakashi-final-origin-adapter-34100.js");
const adapterCore=read("runtime/alpha-kakashi-final-origin-adapter-34100-core.js");
const core=read("runtime/alpha-story-decision-realisation-34000.js");
const factual=read("runtime/alpha-kakashi-factual-state-commit-34120.js");

assert(consumer.includes('PATCH_ID="alpha_kakashi_pakkun_interception_35300_v1_2026_09_17"'),"35300 patch identity missing");
assert(consumer.includes('ENTRY_BEAT="kak_get_closer_failure_stay_package_intercept"'),"35300 must bind the factual pursuit-success interception beat");
assert(consumer.includes('CONFIG="academy_kakashi_origin_battle_kakashi_pakkun_vs_amt"'),"35300 must use exact Pakkun + Kakashi vs AMT config");
assert(consumer.includes('BINDING.demand')&&consumer.includes('"AK_SA_009"'),"Demand must consume AK_SA_009");
assert(consumer.includes('DEMAND_PACKAGE_REFUSAL'),"Demand must commit fixed refusal before Battle");
assert(!consumer.includes("package-compliance"),"Demand must not invent package-compliance resolver");
assert(consumer.includes('currentHolderClass:"NEUTRAL_CONTESTED"'),"Take Him Down must make package neutral before Battle");
assert(consumer.includes('CORE.consumeNextAutonomy'),"Take Him Down must consume neutral participant-first autonomy");
assert(consumer.includes('dueAnchorIds:["AK_SA_011"]'),"Take Him Down must consume AK_SA_011 autonomy window");
assert(consumer.includes('autonomyPhase:"pre_battle"'),"mixed Story/Battle autonomy must explicitly identify the pre-Battle phase");
assert(core.includes('preBattleMixedAutonomy'),"34000 must allow only explicit pre-Battle mixed autonomy");
assert(core.includes('state.battleLive===true||(anchor.battleOwned===true&&!preBattleMixedAutonomy)'),"34000 must still block live Battle and pure Battle-owned autonomy");
assert(core.includes('autonomyPhaseRef:String(state.autonomyPhase||"pre_story")'),"34000 autonomy receipt must persist phase provenance");
assert(adapterCore.includes('const participantAutonomy=spec.classes.includes(A.PARTICIPANT_AUTONOMY);'),"34100 must identify mixed participant/Battle autonomy anchors");
assert(adapterCore.includes('resolve:(!battleOwned||participantAutonomy)?({state})=>autonomyResultFor(spec.anchorId,state):null'),"34100 must register the resolver used by pre-Battle mixed autonomy");
assert(consumer.includes('selectionPolicyRef:"academy_kakashi.alpha.pakkun_exposed_objective_priority.v1"'),"Pakkun Alpha selection policy provenance missing");
assert(consumer.includes('participantAutonomyReceiptId'),"Take Him Down must persist autonomy receipt provenance");
const resolveTakeStart=consumer.indexOf('function resolveTake(choice)');
const resolveAskStart=consumer.indexOf('function resolveAsk(choice)');
assert(resolveTakeStart>=0&&resolveAskStart>resolveTakeStart,"resolveTake function boundary missing");
const resolveTakeSource=consumer.slice(resolveTakeStart,resolveAskStart);
assert(!resolveTakeSource.includes('attemptAcademyKakashiPakkunBattleAction'),"pre-Battle autonomy must not grant a free Battle action");
assert(consumer.includes('priorPackageOccurrenceRef'),"Take Him Down defeat must consume prior committed package state");
assert(consumer.includes('packageOutcomeConsumedFromCommittedAutonomyState:!victory'),"Take Him Down defeat may not fabricate package recovery");
assert(consumer.includes('amtKnowsDownstreamDestination:false'),"Ask Destination must preserve AMT downstream ignorance");
assert(consumer.includes('packageSmugglerDisclosedDownstreamDestination:false'),"Ask Destination must preserve no downstream disclosure");
const closeBattleStart=consumer.indexOf('function closeBattleIntent(');
assert(resolveAskStart>=0&&closeBattleStart>resolveAskStart,"resolveAsk function boundary missing");
const resolveAskSource=consumer.slice(resolveAskStart,closeBattleStart);
assert(!resolveAskSource.includes('verifiedActionableIntelligence:true'),"Ask Destination must not silently grant intelligence reward predicate");
assert(consumer.includes('decisionPointRef:"AK_SA_018_RECONVERGENCE"'),"Ask Destination must reconverge through a new semantic choice set");
assert(consumer.includes('KAK.openDecisionPoint("AK_SA_013"'),"victory must open existing four-way disposition semantic family");
assert(consumer.includes('availability:available(false,blocker)'),"disposition execution must remain fail-closed until its exact runtime owner is bound");
assert(consumer.includes('ownershipGranted:false')&&consumer.includes('nameKnowledgeGranted:false'),"temporary Pakkun participation must not leak ownership or name Knowledge");
assert(consumer.includes('browserGoldenClaimed:false'),"35300 must not claim browser Golden");
assert(loader.includes('runtime/alpha-kakashi-pakkun-interception-35300.js'),"34100 must production-load 35300");
assert(loader.includes('const BUILD="kakashi-final-20260917-18";'),"34100 build generation must remain 18 for this semantic fix");
assert(core.includes('alpha-kakashi-final-origin-adapter-34100.js?sc=kakashi-final-20260917-18'),"34000 parent cache identity must request generation 18");
assert(factual.includes('interceptChoicesExactAndGuarded'),"34120 remains the fail-closed producer that 35300 deliberately releases");

function clearRuntimeGlobals(){
  delete globalThis.SC_STORY_DECISION_REALISATION_34000;
  delete globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
  delete globalThis.runStoryDecisionRealisation34000Diagnostics;
  delete globalThis.runAlphaKakashiFinal34100Diagnostics;
}
function loadNeutralRuntime(savedPlayerData={}){
  clearRuntimeGlobals();
  globalThis.playerData=savedPlayerData;
  globalThis.savePlayerData=()=>{};
  vm.runInThisContext(core,{filename:"runtime/alpha-story-decision-realisation-34000.js"});
  vm.runInThisContext(adapterCore,{filename:"runtime/alpha-kakashi-final-origin-adapter-34100-core.js"});
  return globalThis.SC_STORY_DECISION_REALISATION_34000;
}
function takeAutonomyState(participantIntentRef="pakkun.secure_exposed_mission_objective"){
  return{
    committedStateRef:"qa_take_neutral_state",
    battleLive:false,
    autonomyPhase:"pre_battle",
    dueAnchorIds:["AK_SA_011"],
    autonomyResults:{
      AK_SA_011:{
        success:true,
        participantIntentRef,
        resolverResultRef:`qa_result:${participantIntentRef}`,
        consequenceRefs:["qa_take_package_consequence"],
        result:{
          selectionPolicyRef:"academy_kakashi.alpha.pakkun_exposed_objective_priority.v1",
          selectedActionClass:"SECURE_EXPOSED_OBJECTIVE",
          eligibleIntentRefs:["secure_objective","guard_objective","support_kakashi","hold_position"],
          custodianRef:"pakkun_origin_unfamiliar_ninken",
          ownershipGranted:false,
          nameKnowledgeGranted:false
        }
      }
    }
  };
}

let runtime=loadNeutralRuntime({});
const first=runtime.consumeNextAutonomy({storyUnitRef:"academy_kakashi",state:takeAutonomyState()});
assert.strictEqual(first.success,true,`AK_SA_011 pre-Battle autonomy must resolve: ${JSON.stringify(first)}`);
assert.strictEqual(first.noneDue,undefined,"AK_SA_011 must be consumed, not reported as none due");
assert.strictEqual(first.receipt.anchorId,"AK_SA_011","wrong autonomy anchor consumed");
assert.strictEqual(first.receipt.actorRef,"pakkun_origin_unfamiliar_ninken","Pakkun must own AK_SA_011 autonomy receipt");
assert.strictEqual(first.receipt.autonomyPhaseRef,"pre_battle","pre-Battle phase provenance must persist");
assert.strictEqual(first.receipt.participantIntentRef,"pakkun.secure_exposed_mission_objective","selected semantic participant intent must persist");
const firstReceiptId=first.receipt.autonomyReceiptId;

const changedSelection=takeAutonomyState("pakkun.hold_position");
const repeat=runtime.consumeNextAutonomy({storyUnitRef:"academy_kakashi",state:changedSelection});
assert.strictEqual(repeat.success,true,"repeat autonomy consume must succeed idempotently");
assert.strictEqual(repeat.idempotent,true,"same committed autonomy window must not reroll");
assert.strictEqual(repeat.receipt.autonomyReceiptId,firstReceiptId,"repeat must preserve the same autonomy receipt");
assert.strictEqual(repeat.receipt.participantIntentRef,"pakkun.secure_exposed_mission_objective","repeat must preserve original selected intent instead of rerolling");

const persisted=JSON.parse(JSON.stringify(globalThis.playerData));
runtime=loadNeutralRuntime(persisted);
const afterReload=runtime.consumeNextAutonomy({storyUnitRef:"academy_kakashi",state:changedSelection});
assert.strictEqual(afterReload.success,true,"save/reload autonomy consume must succeed");
assert.strictEqual(afterReload.idempotent,true,"save/reload must not reroll a consumed autonomy window");
assert.strictEqual(afterReload.receipt.autonomyReceiptId,firstReceiptId,"save/reload must preserve autonomy receipt identity");
assert.strictEqual(afterReload.receipt.participantIntentRef,"pakkun.secure_exposed_mission_objective","save/reload must preserve original participant intent");

const liveBattleState=takeAutonomyState();
liveBattleState.committedStateRef="qa_take_live_battle_state";
liveBattleState.battleLive=true;
const liveBattle=runtime.consumeNextAutonomy({storyUnitRef:"academy_kakashi",state:liveBattleState});
assert.strictEqual(liveBattle.success,false,"Story autonomy must not execute inside live Battle");
assert.strictEqual(liveBattle.reason,"battle_owns_action_economy","live Battle must retain action-economy ownership");

const pureBattleOwned={
  committedStateRef:"qa_demand_pre_battle_state",
  battleLive:false,
  autonomyPhase:"pre_battle",
  dueAnchorIds:["AK_SA_009"],
  autonomyResults:{AK_SA_009:{success:true,participantIntentRef:"invalid.free_story_battle_action"}}
};
const pureBattle=runtime.consumeNextAutonomy({storyUnitRef:"academy_kakashi",state:pureBattleOwned});
assert.strictEqual(pureBattle.success,false,"pure Battle-owned anchor must not leak through the mixed pre-Battle exception");
assert.strictEqual(pureBattle.reason,"battle_owns_action_economy","pure Battle-owned anchor must remain Combat-owned");

console.log(JSON.stringify({
  pass:true,
  consumer:"35300",
  build:"kakashi-final-20260917-18",
  preBattleMixedAutonomy:true,
  executableMixedAutonomy:true,
  autonomyReceiptId:firstReceiptId,
  saveReloadIdempotent:true,
  liveBattleOwnershipGuard:true,
  browserGoldenClaimed:false
},null,2));