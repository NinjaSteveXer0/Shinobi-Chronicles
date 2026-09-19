#!/usr/bin/env node
"use strict";
const fs=require("fs"),vm=require("vm"),path=require("path"),assert=require("assert");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const HOLD="kak_scene06a_w2c_scene7_pending";
const store=new Map();
let active=null,saves=0,debriefs=0,receipts=0,completions=0;
globalThis.playerData={};
globalThis.savePlayerData=()=>{saves++;return true;};
globalThis.SC_ALPHA_ORIGIN_32900={
  commitOccurrence(originId,occurrenceId,fact,links,meta){
    if(store.has(occurrenceId))return{success:true,idempotent:true,record:store.get(occurrenceId)};
    const record={originId,occurrenceId,fact,data:fact,links,meta,storySceneInstanceId:active&&active.instanceId||null};store.set(occurrenceId,record);return{success:true,record};
  },
  findOccurrence(id){return store.get(String(id||""))||null;}
};
load("runtime/alpha-story-decision-realisation-34000.js");
const definition={sceneId:SCENE_ID,beatMap:new Map()};
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>true;
globalThis.advanceStoryScene=()=>({success:true,type:"base"});
globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100={
  commitTerminalDebrief(){debriefs++;return{success:true,idempotent:false};},
  commitChronicleReceiptAndRewards(){receipts++;return{success:true,idempotent:false};},
  guardedOriginCompletion(){completions++;return{success:true,idempotent:false};}
};

load("runtime/alpha-kakashi-w2c-nonkill-35780.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_W2C_NONKILL_35780;
assert(MOD,"non-kill ending module missing");
assert.strictEqual(MOD.diagnostics().pass,true,"35780 diagnostics failed: "+JSON.stringify(MOD.diagnostics().failed));
assert.deepStrictEqual([...MOD.outcomeRefs],["LETHAL_ATTEMPT_SURVIVED","LETHAL_ATTEMPT_INTERRUPTED","LETHAL_ATTEMPT_ESCAPED"]);

const cases=[
  {outcome:"LETHAL_ATTEMPT_SURVIVED",first:"Kakashi reappears at her side.",report:"She survived.",officeLast:"Just an answer.",ledger:{lethalStrikeConnected:true,attemptInterrupted:false,briefMaskedInterceptorPursuit:false}},
  {outcome:"LETHAL_ATTEMPT_INTERRUPTED",first:"Kakashi moves.",report:"A patrol came through.",officeLast:"Good.",ledger:{lethalStrikeConnected:false,attemptInterrupted:true,briefMaskedInterceptorPursuit:false}},
  {outcome:"LETHAL_ATTEMPT_ESCAPED",first:"Kakashi disappears.",report:"Not far enough.",officeLast:"Then she leaves.",ledger:{lethalStrikeConnected:false,attemptInterrupted:false,briefMaskedInterceptorPursuit:true}}
];

for(let n=0;n<cases.length;n++){
  const spec=cases[n],instance="qa-nonkill-"+n,resolverId="qa-resolver-"+n;
  active={sceneId:SCENE_ID,instanceId:instance,beatId:HOLD,localContext:{kakashiScene06AW2COutcomeRef:spec.outcome,kakashiScene06AW2CResolutionOccurrenceId:resolverId,kakashiScene05AWTurnCount:4,kakashiScene05AWPursuitEligible:false}};
  store.set(resolverId,{occurrenceId:resolverId,storySceneInstanceId:instance,fact:{factClass:"academy_kakashi_scene06aw2c_lethal_attempt_resolution",selectedOutcomeRef:spec.outcome,lethalIntentCommitted:true,packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"PACKAGE_SMUGGLER",recovered:false,available:false}}});

  assert.strictEqual(MOD.beginOutcome(spec.outcome),true,"presentation did not start for "+spec.outcome);
  assert.strictEqual(active.beatId,MOD.aftermathBeatId);
  let perf=globalThis.getStoryScenePerformance33900();
  assert.strictEqual(perf.cue.text,spec.first);

  const ledger=store.get(active.localContext.kakashiScene06W2CNonKillLedgerOccurrenceId);
  assert(ledger,"non-kill ledger missing for "+spec.outcome);
  assert.strictEqual(ledger.fact.selectedOutcomeRef,spec.outcome);
  assert.strictEqual(ledger.fact.maskedInterceptorState,"ALIVE");
  assert.strictEqual(ledger.fact.failedLethalAttempt,true);
  assert.strictEqual(ledger.fact.mercyOutcome,false);
  assert.strictEqual(ledger.fact.packagePursuitReopened,false);
  assert.strictEqual(ledger.fact.anbuMarkedTargetPursuitReopened,false);
  assert.strictEqual(ledger.fact.pakkunPresent,false);
  assert.strictEqual(ledger.fact.lethalStrikeConnected,spec.ledger.lethalStrikeConnected);
  assert.strictEqual(ledger.fact.attemptInterrupted,spec.ledger.attemptInterrupted);
  assert.strictEqual(ledger.fact.briefMaskedInterceptorPursuit,spec.ledger.briefMaskedInterceptorPursuit);

  let guard=0;
  while(active.beatId===MOD.aftermathBeatId&&guard++<100){const out=globalThis.advanceStoryScene();assert.strictEqual(out.success,true);}
  assert.strictEqual(active.beatId,MOD.scene07BeatId,"aftermath did not reach rooftop for "+spec.outcome);
  const reportRows=MOD.data[spec.outcome].report;
  assert(reportRows.some(x=>x.text===spec.report));
  assert(reportRows.some(x=>x.text==="Those weren’t your orders."));
  assert(reportRows.some(x=>x.text==="That was my choice."));

  guard=0;
  while(active.beatId===MOD.scene07BeatId&&guard++<100){const out=globalThis.advanceStoryScene();assert.strictEqual(out.success,true);}
  assert.strictEqual(active.beatId,MOD.scene08BeatId,"rooftop did not reach office for "+spec.outcome);
  const report=store.get(active.localContext.kakashiScene07W2CNonKillReportOccurrenceId);
  assert(report);
  assert.strictEqual(report.fact.failedLethalAttemptTruthfullyReported,true);
  assert.strictEqual(report.fact.lethalDecisionExplanation,"That was my choice.");
  assert.strictEqual(report.fact.pakkunPresent,false);

  const hidden=store.get(active.localContext.kakashiScene08W2CNonKillOccurrenceId);
  assert(hidden);
  assert.strictEqual(hidden.fact.maskedInterceptorState,"ALIVE");
  assert.strictEqual(hidden.fact.maskedInterceptorPresent,true);
  assert.strictEqual(hidden.fact.hiddenOperationPackageRecoveredAfterward,true);
  assert.strictEqual(hidden.fact.kakashiMissionPackageRecovered,false);
  assert.strictEqual(hidden.fact.kakashiPresent,false);
  assert.strictEqual(hidden.fact.kakashiKnowledgeGranted,false);
  assert.strictEqual(hidden.fact.kakashiLearnsHiddenOperationTruth,false);
  assert.strictEqual(hidden.fact.sharedHistoryPersists,true);
  assert.strictEqual(hidden.fact.guaranteedRetaliation,false);

  const officeRows=MOD.data[spec.outcome].office;
  assert.strictEqual(officeRows[officeRows.length-1].text,spec.officeLast);

  guard=0;
  while(active.beatId===MOD.scene08BeatId&&guard++<120){const out=globalThis.advanceStoryScene();assert.strictEqual(out.success,true);}
  assert.strictEqual(active.beatId,MOD.receiptBeatId,"office did not reach receipt for "+spec.outcome);
  const out=MOD.completeToKonoha();
  assert.strictEqual(out.success,true);
  assert.strictEqual(out.destination,"konoha_village");
}

assert.strictEqual(debriefs,3);
assert.strictEqual(receipts,3);
assert.strictEqual(completions,3);
assert(saves>0);

const source=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-w2c-nonkill-35780.js"),"utf8");
assert(source.includes("14c091f1620eef0275b5e713f782b6c99c8a9abc"));
assert(source.includes("84894e148e55b57ec74707690ca0b067b6b1e366"));
assert(source.includes("ecf8f813232d9d72e5c7c08ec544a20dbc2fa2a7"));
assert(source.includes("f0a4f162f976093a334be9f034067bf1a542bae8"));
assert(source.includes("896b8fcc9d5c5dd6b019d2f51a5fbccdaee66a25"));
assert(source.includes("851244e7b5a0911ee7faddd44923115294a0e4a7"));
assert(source.includes("5c6389d8c4bc53f27bf55cf269a2b66ee5e3848c"));
assert(source.includes("b52ed9670ddc369fb115d3a61147c496fc75155f"));
assert(source.includes("4e679e92e6c97968bcf970a83b9ba88e19d96355"));
assert(!MOD.data.LETHAL_ATTEMPT_ESCAPED.office.some(row=>row&&row.text==="A beat."),"updated ESCAPED office must remove stray beat narration");
assert(source.includes("PATROL_ASSET_PATHS=Object.freeze([])"),"unapproved patrol asset path was introduced");
assert(source.includes("playAcademyKakashiLethalAttemptAnimation35770"),"non-kill outcomes must consume the shared lethal-attempt animation");
assert(source.includes("w2cNonKillEnterLeft35780"),"Hokage Office ANBU entry motion missing");
assert(source.includes("left:28%!important")&&source.includes("left:41%!important")&&source.includes("left:54%!important")&&source.includes("left:67%!important")&&source.includes("bottom:23.5%!important"),"non-kill Hokage Office AMT / MI / ANBU / PS table-row placement missing");
assert(source.includes("sc-live-state-callout-33900")&&source.includes("RECOVERED · HIDDEN OPERATION"),"Recovered-package state must use the persistent Live State Callout");
assert(source.includes('card(MINATO,"MINATO","Assets/Kage/kage_minato.png","HOKAGE"'),"Minato nameplate must show actor status rather than package state");
assert(!source.includes('<div class="sc-kakashi-w2c-nonkill-package">'),"Standalone non-kill recovered-package banner markup must be removed");
assert(source.includes("sc-dialogue-panel-33910.is-current"),"non-kill Hokage Office dialogue must use negative-space placement");
assert(source.includes("transform:none!important;width:min(28%,400px)!important"),"non-kill office side-lane dialogue must cancel the generic centered transform");
assert(source.includes("performance_narration")&&source.includes("sc-dialogue-panel-33910{display:none!important}"),"office narration must suppress stale dialogue overlay");
assert(source.includes('name.style.display="block"'),"speaker/narration quick-read label must remain visible in panel");

console.log("Academy Kakashi W2C non-kill ending 35780 QA: PASS");
console.log("- SURVIVED / INTERRUPTED / ESCAPED exact locked scene chains consumed");
console.log("- failed lethal intent preserved; no mercy rewrite; PS/AMT pursuit stays closed");
console.log("- rooftop report -> hidden Hokage review -> Chronicle Receipt -> Konoha");
console.log("- hidden-operation Knowledge boundary and no-Pakkun guard preserved");
