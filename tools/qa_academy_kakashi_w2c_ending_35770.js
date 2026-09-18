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
const active={sceneId:SCENE_ID,instanceId:"qa-w2c-ending",beatId:"kak_scene06a_w2c_scene7_pending",localContext:{kakashiScene05AWTurnCount:4,kakashiScene05AWPursuitEligible:false,kakashiScene06AW2COutcomeRef:"LETHAL_ATTEMPT_KILLED"}};
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>true;
globalThis.advanceStoryScene=()=>({success:true,type:"base"});
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

let out=MOD.beginConfirmedKill();
assert.strictEqual(out,true);
assert.strictEqual(active.beatId,MOD.aftermathBeatId);
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
console.log("Academy Kakashi W2C ending 35770 QA: PASS");
console.log("- confirmed resolver death -> stylised kill presentation -> exact aftermath");
console.log("- rooftop ANBU report -> Hokage office with hidden-operation Knowledge boundary");
console.log("- separate committed Chronicle Receipt -> Konoha destination");
