#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),vm=require("vm"),path=require("path");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const AMT_RETURN="kak_stop_postmi_amt_return_35830";
const PS_REPORT="kak_stop_postmi_ps_report_boundary_35830";
const AMT_REPORT="kak_stop_postmi_amt_report_boundary_35830";
const DKILL_REPORT="kak_scene06a_w2c_deterministic_kill_report_pending_35810";
const TERMINAL="kak_seq_debrief_pending";
const PACKAGE="kakashi_origin_outer_route_packet";
const PS="academy_kakashi_origin_package_smuggler";
const AMT="academy_kakashi_origin_amt";
const PAKKUN="pakkun_origin_unfamiliar_ninken";

let saves=0;
globalThis.playerData={};
globalThis.savePlayerData=()=>{saves+=1;return true;};

// Load the real neutral semantic/autonomy core, Kakashi anchor registrations,
// and neutral factual resolver provider used by the browser chain.
load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-kakashi-final-origin-adapter-34100-core.js");
load("runtime/alpha-story-factual-resolver-34600.js");

const occurrenceStore=new Map();
globalThis.SC_ALPHA_ORIGIN_32900={
  commitOccurrence(originId,occurrenceId,fact,links,meta){
    if(occurrenceStore.has(occurrenceId))return{success:true,idempotent:true,record:occurrenceStore.get(occurrenceId)};
    const row={originId,occurrenceId,fact,links,meta};
    occurrenceStore.set(occurrenceId,row);
    return{success:true,record:row};
  },
  findOccurrence(id){return occurrenceStore.get(String(id||""))||null;}
};
globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300={patchId:"qa-battle-deployment"};
globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100={patchId:"qa-terminal-35100"};

let victoryDelegateCalls=0;
globalThis.SC_ALPHA_KAKASHI_POST_MI_DEATH_PURSUIT_35830={
  patchId:"qa-postmi-35830",
  beats:{amtReturn:AMT_RETURN,psReport:PS_REPORT,amtReport:AMT_REPORT},
  consumeAmtReturn(){victoryDelegateCalls+=1;return{success:true,victory:true,delegated:true};}
};

const definition={sceneId:SCENE_ID,beatMap:new Map([
  [AMT_RETURN,{beatId:AMT_RETURN,mode:"narration",onEnterConsequences:[]}],
  [PS_REPORT,{beatId:PS_REPORT,mode:"narration"}],
  [AMT_REPORT,{beatId:AMT_REPORT,mode:"narration"}],
  [DKILL_REPORT,{beatId:DKILL_REPORT,mode:"narration"}],
  [TERMINAL,{beatId:TERMINAL,mode:"narration"}]
])};
let active=null;
globalThis.normalizeStorySceneBeat=(def)=>def;
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>true;
globalThis.advanceStoryScene=function qaBaseAdvance(){return{success:false,reason:"qa_base_advance"};};

load("runtime/alpha-kakashi-konoha-writing-closure-35900.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_KONOHA_CLOSURE_35900;
assert(MOD,"35900 closure module missing");
const diag=globalThis.runAcademyKakashiKonohaClosure35900Diagnostics();
assert.strictEqual(diag.pass,true,"35900 diagnostics failed: "+JSON.stringify(diag.failed));
assert.strictEqual(MOD.ce256BindingRef,"academy_kakashi.resolver.post_amt_defeat_package_reach");
assert.strictEqual(diag.checks.neutralProviderExact,true);
assert.strictEqual(diag.checks.packageBeforePakkunOrdering,true);
assert.strictEqual(diag.checks.pakkunAutonomyConsumed,true);
assert.strictEqual(diag.checks.sharedAmtPakkunConfigsExact,true);
assert.strictEqual(diag.checks.sharedAmtDefeatOwnerExported,true);
assert.deepStrictEqual(MOD.amtBattleConfigs,[
  "academy_kakashi_origin_battle_seq_amt_pakkun",
  "academy_kakashi_origin_battle_kakashi_pakkun_vs_amt"
]);

function commitPackageOccurrence(id,holder,location){
  occurrenceStore.set(id,{occurrenceId:id,fact:{
    factClass:"qa_package_state",
    packageState:{
      objectRef:PACKAGE,
      currentHolderClass:holder,
      custodyClass:holder,
      locationClass:location,
      packageRecovered:holder==="KAKASHI"
    }
  }});
}
function amtLossRuntime(instanceId,packageOccurrenceId,battleOccurrenceId){
  return{
    sceneId:SCENE_ID,
    instanceId,
    beatId:AMT_RETURN,
    localContext:{
      kakashiPostMiPackageOccurrenceId:packageOccurrenceId,
      kakashiSequentialPackageOccurrenceId35100:packageOccurrenceId,
      kakashiPostMiPursuitSelectionOccurrenceId:"qa-pursuit-"+instanceId,
      kakashiPostMiPakkunPresent:true,
      kakashiPostMiAmtReturnProcessed:false
    },
    battleResume:{authored:{
      battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",
      bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_amt",
      battleOccurrenceId,
      resultState:"opposition_side_victory",
      playerActionOpportunityCount:2,
      participants:[]
    }}
  };
}
function consumeAmtReturn(){
  const beat=definition.beatMap.get(AMT_RETURN);
  const row=(beat.onEnterConsequences||[]).find(x=>x&&x.requestId==="kakashi_ce256_amt_defeat_consume_35900");
  assert(row&&typeof row.resolve==="function","35900 did not own AMT return");
  return row.resolve();
}
function drainToTerminal(max=100){
  let n=0;
  while(active.beatId!==TERMINAL&&n++<max){
    const out=globalThis.advanceStoryScene();
    assert(out&&out.success===true,"35900 aftermath advance failed: "+JSON.stringify(out));
  }
  assert.strictEqual(active.beatId,TERMINAL,"35900 aftermath did not converge to terminal");
}

// CE #256 deterministic eligibility: if the package is physically elsewhere,
// AMT cannot receive it merely because he won the Battle.
commitPackageOccurrence("qa-package-elsewhere",PS,"PS_PERSON");
active=amtLossRuntime("qa-ce256-elsewhere","qa-package-elsewhere","qa-amt-loss-elsewhere");
let out=consumeAmtReturn();
assert.strictEqual(out.success,true,"CE #256 package-elsewhere resolution failed: "+JSON.stringify(out));
assert.strictEqual(active.beatId,MOD.amtAftermathBeatId);
assert.strictEqual(out.packageState.currentHolderClass,PS,"AMT Battle victory fabricated package custody");
assert.strictEqual(out.pakkunState,"PRESENT","Pakkun must remain present when the package is elsewhere");
assert.strictEqual(active.localContext.kakashiPostMiPakkunPresent,true);
assert(active.localContext.kakashiCe256PackageOccurrenceId,"CE #256 package occurrence missing");
assert(active.localContext.kakashiCe256PakkunOccurrenceId,"CE #256 Pakkun autonomy occurrence missing");
let snapParticipants=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi").participantStates;
assert.strictEqual(snapParticipants[AMT].stateClass,"ESCAPED","CE #256 AMT defeat did not classify AMT as escaped");
const elsewherePackage=occurrenceStore.get(active.localContext.kakashiCe256PackageOccurrenceId);
assert.strictEqual(elsewherePackage.fact.worldFacts.battleVictoryDidNotImplyPackageCustody,true);
const snapElsewhere=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
assert(snapElsewhere.autonomyReceipts&&Object.keys(snapElsewhere.autonomyReceipts).length>=1,"AK_SA_012 autonomy receipt was not persisted");
drainToTerminal();

// If package is on Kakashi, the neutral provider owns the factual reach result.
// Whichever stable outcome is selected must be persisted and replayable.
commitPackageOccurrence("qa-package-kakashi","KAKASHI","KAKASHI_PERSON");
active=amtLossRuntime("qa-ce256-kakashi","qa-package-kakashi","qa-amt-loss-kakashi");
out=consumeAmtReturn();
assert.strictEqual(out.success,true,"CE #256 package-on-Kakashi resolution failed: "+JSON.stringify(out));
assert(["KAKASHI","ANBU_MARKED_TARGET"].includes(out.packageState.currentHolderClass),"unexpected CE #256 package holder");
if(out.packageState.currentHolderClass==="KAKASHI"){
  assert.strictEqual(out.pakkunState,"GUARDING_PACKAGE","Pakkun must guard the exposed retained objective");
}else{
  assert.strictEqual(out.pakkunState,"PRESENT","Pakkun must remain present after AMT factually reclaims package");
}
const firstOutcome=active.localContext.kakashiCe256PackageOutcomeRef;
const firstPackageOccurrence=active.localContext.kakashiCe256PackageOccurrenceId;
assert(firstOutcome&&firstPackageOccurrence,"CE #256 stable outcome provenance missing");

// Re-run the same factual provider request key directly: no reroll.
const provider=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
const firstReceipt=Object.values(globalThis.playerData.storyFactualResolver34600.receipts)
  .find(r=>r&&r.bindingRef===MOD.ce256BindingRef&&r.selectedOutcomeRef===firstOutcome);
assert(firstReceipt,"CE #256 provider receipt missing");
const replay=provider.resolveStoryFactualAction({
  storyDecisionReceiptId:firstReceipt.storyDecisionReceiptId,
  bindingRef:firstReceipt.bindingRef,
  actorRef:AMT,
  intentCommitRef:firstReceipt.intentCommitRef,
  attemptOrdinal:firstReceipt.attemptOrdinal,
  idempotenceKey:firstReceipt.idempotenceKey,
  inputStateRefs:firstReceipt.inputStateRefs,
  continuityLineageRef:"qa-ce256-kakashi",
  state:{packageState:{objectRef:PACKAGE,currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON"}},
  context:{storySceneInstanceId:"qa-ce256-kakashi",battleOccurrenceId:"qa-amt-loss-kakashi",beatId:AMT_RETURN}
});
assert.strictEqual(replay.success,true,"CE #256 factual replay failed");
assert.strictEqual(replay.receipt.selectedOutcomeRef,firstOutcome,"CE #256 factual replay rerolled");
drainToTerminal();

// The same CE #256 owner must also consume the Secure-Package AMT+Pakkun
// Battle config. Package custody is still resolved independently of Battle.
commitPackageOccurrence("qa-package-secure-route","KAKASHI","KAKASHI_PERSON");
active={
  sceneId:SCENE_ID,instanceId:"qa-ce256-secure-route",beatId:"kak_observe_secure_package_amt_return",
  localContext:{
    kakashiKonohaPackageOccurrenceId:"qa-package-secure-route",
    kakashiObserveSecurePackageAmtPursuitOccurrenceId:"qa-secure-amt-pursuit",
    kakashiKonohaPakkunPresent:true
  },
  battleResume:{authored:{
    battleConfigId:"academy_kakashi_origin_battle_kakashi_pakkun_vs_amt",
    bindingRef:"academy_kakashi.battle.secure_package_amt_pursuit",
    battleOccurrenceId:"qa-secure-amt-loss",
    resultState:"opposition_side_victory",
    participants:[]
  }}
};
out=globalThis.resolveAcademyKakashiAmtDefeatFacts35900({
  packageOccurrenceId:"qa-package-secure-route",
  parentRef:"qa-secure-amt-pursuit",
  routeRef:"secure_package_amt_pursuit",
  returnBeatId:"kak_observe_secure_package_amt_return",
  successorSituationRef:TERMINAL
});
assert.strictEqual(out.success,true,"shared CE #256 secure-route resolution failed: "+JSON.stringify(out));
assert(["KAKASHI","ANBU_MARKED_TARGET"].includes(out.packageState.currentHolderClass),"shared CE #256 returned impossible holder");
assert(active.localContext.kakashiCe256LastAmtDefeatOccurrenceId,"shared CE #256 completion occurrence missing");

// Player victory still delegates to the established 35830 winner owner.
active={
  sceneId:SCENE_ID,instanceId:"qa-ce256-victory",beatId:AMT_RETURN,
  localContext:{kakashiPostMiPackageOccurrenceId:"qa-package-kakashi"},
  battleResume:{authored:{
    battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",
    bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_amt",
    battleOccurrenceId:"qa-amt-win",
    resultState:"player_side_victory",
    participants:[{participantRef:AMT,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]
  }}
};
out=consumeAmtReturn();
assert.strictEqual(out.success,true);
assert.strictEqual(out.delegated,true);
assert.strictEqual(victoryDelegateCalls,1,"35900 must preserve established AMT victory owner");

// Historical report boundaries are now runtime superseded by closed terminal authority.
for(const beatId of [PS_REPORT,AMT_REPORT,DKILL_REPORT]){
  active={sceneId:SCENE_ID,instanceId:"qa-report-"+beatId,beatId,localContext:{},battleResume:null};
  out=globalThis.advanceStoryScene();
  assert.strictEqual(out.success,true,"closed report boundary did not advance: "+beatId);
  assert.strictEqual(active.beatId,TERMINAL,"closed report boundary did not converge to terminal: "+beatId);
}

assert(saves>0,"closure QA expected persistent state writes");
console.log("Academy Kakashi Konoha closure 35900 QA: PASS");
console.log("- CE #256 package resolution runs through neutral factual provider before Pakkun autonomy");
console.log("- package elsewhere cannot be fabricated into AMT custody");
console.log("- package-on-Kakashi branch persists and replays one stable factual outcome without reroll");
console.log("- AK_SA_012 Pakkun autonomy is persisted through the real 34000/34100 anchor stack");
console.log("- retained package makes Pakkun guard the exposed objective; otherwise he remains present");
console.log("- shared CE #256 owner consumes both sequential and secure-package AMT+Pakkun Battle configs");
console.log("- established AMT victory owner remains delegated");
console.log("- historical post-MI / deterministic-kill report stops converge to the existing terminal owner");
console.log("- Browser Golden is intentionally NOT claimed by this headless harness");
