#!/usr/bin/env node
"use strict";
const fs=require("fs"),vm=require("vm"),path=require("path"),assert=require("assert");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const store=new Map();
let saves=0,debriefs=0,receipts=0,completions=0;
globalThis.playerData={};
globalThis.savePlayerData=()=>{saves++;return true;};
globalThis.SC_ALPHA_ORIGIN_32900={
  commitOccurrence(originId,occurrenceId,fact,links,meta){
    if(store.has(occurrenceId))return{success:true,idempotent:true,record:store.get(occurrenceId)};
    const record={originId,occurrenceId,fact,data:fact,links,meta};store.set(occurrenceId,record);return{success:true,record};
  },
  findOccurrence(id){return store.get(String(id||""))||null;}
};
load("runtime/alpha-story-decision-realisation-34000.js");
const definition={sceneId:SCENE_ID,beatMap:new Map()};
const active={sceneId:SCENE_ID,instanceId:"qa-w2c-ending",beatId:"kak_scene06a_w2c_attempt_kill",localContext:{kakashiScene05AWTurnCount:4,kakashiScene05AWPursuitEligible:false,kakashiScene06AW2COutcomeRef:"LETHAL_ATTEMPT_KILLED"}};
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>true;
globalThis.advanceStoryScene=()=>{
  if(active.beatId==="kak_scene06a_w2c_attempt_kill"){
    active.beatId="kak_scene06a_w2c_scene7_pending";
    return{success:true,type:"qa_scene06_resolver_completed",scene7Pending:true,selectedOutcomeRef:"LETHAL_ATTEMPT_KILLED"};
  }
  return{success:true,type:"base"};
};
globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100={
  commitTerminalDebrief(){debriefs++;return{success:true,idempotent:debriefs>1};},
  commitChronicleReceiptAndRewards(){receipts++;return{success:true,idempotent:receipts>1};},
  guardedOriginCompletion(){completions++;return{success:true,idempotent:completions>1};}
};
const resolverId="qa-resolver-kill";
store.set(resolverId,{occurrenceId:resolverId,fact:{selectedOutcomeRef:"LETHAL_ATTEMPT_KILLED",targetDeathConfirmed:true,packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"PACKAGE_SMUGGLER",recovered:false}}});
active.localContext.kakashiScene06AW2CResolutionOccurrenceId=resolverId;

load("runtime/alpha-kakashi-w2c-ending-35770.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_W2C_ENDING_35770;
assert(MOD,"ending module missing");
assert.strictEqual(MOD.diagnostics().pass,true,"ending diagnostics failed: "+JSON.stringify(MOD.diagnostics().failed));

let out=globalThis.advanceStoryScene();
assert.strictEqual(out.success,true);
assert.strictEqual(out.confirmedKillPresentationStarted,true,"final Scene 06 advance must immediately start confirmed-kill presentation");
assert.strictEqual(active.beatId,MOD.aftermathBeatId,"one final-cue advance must not strand runtime on Scene-7 pending hold");
assert(active.localContext.kakashiScene06W2CKillLedgerOccurrenceId);
const killLedger=store.get(active.localContext.kakashiScene06W2CKillLedgerOccurrenceId);
assert.strictEqual(killLedger.fact.maskedInterceptorState,"DEAD");
assert.strictEqual(killLedger.fact.lethalAttemptResult,"SUCCESS / CONFIRMED KILL");
assert.strictEqual(killLedger.fact.pursuitClosed,true);
assert.strictEqual(killLedger.fact.pakkunPresent,false);

for(let i=0;i<10;i++){out=globalThis.advanceStoryScene();assert.strictEqual(out.success,true);}
let perf=globalThis.getStoryScenePerformance33900();
assert.strictEqual(perf.cue.text,"Kakashi leaves the Sakura tree behind.");
assert.strictEqual(perf.cue.objective,"Report to ANBU.");
out=globalThis.advanceStoryScene();assert.strictEqual(out.success,true);
assert.strictEqual(active.beatId,MOD.scene07BeatId);

for(let i=0;i<22;i++){out=globalThis.advanceStoryScene();assert.strictEqual(out.success,true);}
perf=globalThis.getStoryScenePerformance33900();assert.strictEqual(perf.cue.text,"Understood.");
out=globalThis.advanceStoryScene();assert.strictEqual(out.success,true);
assert.strictEqual(active.beatId,MOD.scene08BeatId);
assert.strictEqual(debriefs,1);
const report=[...store.values()].find(x=>x.fact&&x.fact.factClass==="academy_kakashi_scene07_w2c_k_anbu_report");
assert(report);assert.strictEqual(report.fact.confirmedKillTruthfullyReported,true);assert.strictEqual(report.fact.lethalDecisionExplanation,"That was my choice.");

const hidden=[...store.values()].find(x=>x.fact&&x.fact.factClass==="academy_kakashi_scene08_w2c_k_hidden_review");
assert(hidden);assert.strictEqual(hidden.fact.maskedInterceptorPresent,false);assert.strictEqual(hidden.fact.kakashiPresent,false);assert.strictEqual(hidden.fact.kakashiKnowledgeGranted,false);assert.strictEqual(hidden.fact.hiddenOperationPackageRecoveredAfterward,true);assert.strictEqual(hidden.fact.kakashiMissionPackageRecovered,false);

for(let i=0;i<32;i++){out=globalThis.advanceStoryScene();assert.strictEqual(out.success,true);}
perf=globalThis.getStoryScenePerformance33900();assert.strictEqual(perf.cue.text,"I won’t have trouble with that.");
out=globalThis.advanceStoryScene();assert.strictEqual(out.success,true);
assert.strictEqual(active.beatId,MOD.receiptBeatId);
assert.strictEqual(receipts,1);

out=MOD.completeToKonoha();
assert.strictEqual(out.success,true);
assert.strictEqual(out.destination,"konoha_village");
assert.strictEqual(completions,1);
assert(saves>0);

const source=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-w2c-ending-35770.js"),"utf8");
assert(source.includes("sc-kakashi-kill-35770"),"kill animation CSS missing");
assert(source.includes("diagonal")===false,"presentation uses animation, not invented prose");
assert(source.includes("rooftop_night.png"),"rooftop backdrop missing");
assert(source.includes("hokage_administration_interior_night.png"),"Hokage backdrop missing");
assert(source.includes("RECORDED IN YOUR CHRONICLE"),"separate Chronicle Receipt screen missing");
assert(source.includes("maskedInterceptorPresent:false"),"Scene 08 must persist Masked Interceptor absence");
assert(source.includes("installBrowserFinalCueCapture"),"installed-browser final-cue capture seam missing");
assert(source.includes("stopImmediatePropagation"),"installed-browser final-cue capture must pre-empt the older 33900 lexical click handler");
assert(source.includes("confirmedKillPresentationStarted"),"post-delegate confirmed-kill transition seam missing");
assert(source.includes("beginAcademyKakashiConfirmedKill35770"),"direct Scene 06 confirmed-kill entrypoint missing");
assert(source.includes("installOutcomeWatchdog"),"confirmed-kill hold watchdog missing");
assert(source.includes("presentation owner unavailable"),"local non-kill resolver QA fallback indicator missing");
assert(source.includes("beginAcademyKakashiResolvedOutcome35780"),"non-kill presentation watchdog dispatch missing");
assert(source.includes("playAcademyKakashiLethalAttemptAnimation35770"),"shared lethal-attempt animation export missing");
assert(source.includes("document.body.appendChild(n)"),"lethal-attempt animation must live outside the re-rendered Chronicle stage");
assert(source.includes('classList.add("is-active")'),"lethal-attempt animation must receive an explicit painted start");
assert(source.includes("2147483400"),"lethal-attempt animation must sit above Scene Board overlays");
assert(source.includes("bottom:23.5%!important"),"Hokage Office lower cast must align to the table-row baseline");
assert(source.includes("sc-dialogue-panel-33910.is-current"),"Hokage Office dialogue must use negative-space placement");
assert(source.includes("transform:none!important;width:min(28%,400px)!important"),"Hokage Office side-lane dialogue must cancel the generic centered transform");
assert(source.includes("performance_narration")&&source.includes("sc-dialogue-panel-33910{display:none!important}"),"office narration must suppress stale dialogue overlay");
assert(source.includes("left:28%!important")&&source.includes("left:54%!important")&&source.includes("left:67%!important")&&source.includes("bottom:23.5%!important"),"Hokage Office AMT / ANBU / PS table-row placement missing");
assert(source.includes("sc-w2c-office-anbu-enter-35770"),"KILLED office ANBU slide-in missing");
assert(source.includes("sc-live-state-callout-33900")&&source.includes("RECOVERED · HIDDEN OPERATION"),"Recovered-package state must use the persistent Live State Callout");
assert(source.includes('card(MINATO,"MINATO","Assets/Kage/kage_minato.png","HOKAGE"'),"Minato nameplate must show actor status rather than package state");
assert(!source.includes('<div class="sc-kakashi-w2c-package-status">'),"Standalone recovered-package banner markup must be removed");
assert(source.includes('name.style.display="block"'),"speaker/narration quick-read label must remain visible in panel");
console.log("Academy Kakashi W2C ending 35770 QA: PASS");
console.log("- final Scene 06 click -> resolver hold -> direct/watchdog confirmed-kill presentation");
console.log("- rooftop ANBU report -> Hokage office with hidden-operation Knowledge boundary");
console.log("- separate committed Chronicle Receipt -> Konoha destination");
