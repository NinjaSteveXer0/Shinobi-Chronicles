#!/usr/bin/env node
"use strict";
const fs=require("fs"),vm=require("vm"),path=require("path"),assert=require("assert");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}
const SCENE_ID="origin_academy_kakashi_anbu_retrieval",SOURCE_BEAT="kak_scene05a_l_choice";
const store=new Map();let saves=0,debrief=0,receipt=0;
globalThis.playerData={activityHistory:[]};
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.SC_ALPHA_ORIGIN_32900={
 commitOccurrence(originId,occurrenceId,fact,links,meta){if(store.has(occurrenceId))return{success:true,idempotent:true,record:store.get(occurrenceId)};const record={originId,occurrenceId,fact,links,meta};store.set(occurrenceId,record);globalThis.playerData.activityHistory.push(record);return{success:true,record};},
 findOccurrence(id){return store.get(String(id||""))||null;}
};
globalThis.SC_STORY_DECISION_REALISATION_34000={stableRef(prefix,payload){return prefix+"::"+JSON.stringify(payload||{});}};
globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100={
 commitTerminalDebrief(){debrief+=1;return{success:true,occurrenceId:"terminal-"+debrief};},
 commitChronicleReceiptAndRewards(){receipt+=1;return{success:true,receiptOccurrenceId:"receipt-"+receipt};},
 enterCanonicalReceipt(){debrief+=1;receipt+=1;active.beatId="kak_terminal_chronicle_receipt_35100";return{success:true,beatId:active.beatId,terminalDebriefOccurrenceId:"terminal-"+debrief,receiptOccurrenceId:"receipt-"+receipt};},
 guardedOriginCompletion(){return{success:true};}
};
const lossId="occ-loss-qa";
globalThis.SC_ALPHA_ORIGIN_32900.commitOccurrence("academy_kakashi",lossId,{factClass:"academy_kakashi_stop_assassin_defeat_closure",packageSmugglerEscapedWithPackage:true,anbuMarkedTargetEscaped:true,maskedInterceptorPackageSmugglerOutcomeKnownToKakashi:false},[],{});
const sourceBeat={beatId:SOURCE_BEAT,mode:"choice",choices:[{choiceId:"scene05al_return_to_anbu",label:"RETURN TO ANBU",nextBeatId:"kak_seq_debrief_pending",availability:()=>({available:true}),consequenceRequests:[{requestId:"old_scene05al",kind:"domain",resolve:()=>{active.localContext.kakashiScene05ALReturnToAnbuChosen=true;return{success:true,occurrenceId:lossId};}}]}]};
const definition={sceneId:SCENE_ID,beatMap:new Map([[SOURCE_BEAT,sourceBeat]])};
const active={sceneId:SCENE_ID,instanceId:"qa-loss-ending",beatId:SOURCE_BEAT,localContext:{kakashiScene05ALPackageOccurrenceId:lossId,kakashiScene05ALObjective:"Return to ANBU."},battleResume:{authored:null}};
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>true;
globalThis.advanceStoryScene=function baseAdvance(choiceId=null){
 const beat=definition.beatMap.get(active.beatId);if(!beat)return{success:true,beatId:active.beatId};
 if(beat.mode==="choice"){
  const row=(beat.choices||[]).find(x=>x&&x.choiceId===choiceId);if(!row)return{success:false,reason:"qa_choice_missing"};
  for(const req of row.consequenceRequests||[]){const out=req.resolve();if(!out||out.success!==true)return out||{success:false,reason:"qa_choice_consequence_failed"};}
  active.beatId=row.nextBeatId;return{success:true,beatId:active.beatId};
 }
 return{success:true,beatId:active.beatId};
};
load("runtime/alpha-kakashi-loss-ending-35820.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_LOSS_ENDING_35820;
assert(MOD,"loss ending module missing");
const diag=globalThis.runAcademyKakashiLossEnding35820Diagnostics();
assert.strictEqual(diag.pass,true,"35820 diagnostics failed: "+JSON.stringify(diag.failed));
assert.strictEqual(diag.checks.revisedOfficeExact,true,"revised 137-cue loss-office authority not consumed exactly");
assert.strictEqual(diag.checks.staleClippedExchangeRemoved,true,"stale clipped interrogation dialogue remains in loss office");
assert.strictEqual(diag.checks.dialogueGeometryDelegatedTo33910,true,"loss route still owns dialogue geometry");
assert.strictEqual(diag.checks.liveStateCallout,true,"loss-office recovered package must use a Live State Callout");
assert.strictEqual(MOD.authorities.officeFact,"d0d29a18ae2104b0cd29c1ca29b1f5a88fef71ab","loss hidden-review factual authority must remain unchanged");
assert.strictEqual(MOD.authorities.officeExpression,"362f72b8f20f50fec1b8e11e483e40cf5030364c","revised Writing expression authority missing");
MOD.wireSource();
let out=globalThis.advanceStoryScene("scene05al_return_to_anbu");
assert.strictEqual(out.success,true,"RETURN TO ANBU failed: "+JSON.stringify(out));
assert.strictEqual(active.beatId,MOD.reportBeatId);

let safety=0;
while(active.beatId===MOD.reportBeatId&&safety++<40){
 out=globalThis.advanceStoryScene();
 assert(out&&out.success===true,"loss report advance failed: "+JSON.stringify(out));
}
assert.strictEqual(active.beatId,MOD.officeBeatId,"loss report did not reach hidden Hokage Office");
const report=store.get(active.localContext.kakashiScene06ALReportOccurrenceId);
assert(report,"loss report occurrence missing");
assert.strictEqual(report.fact.truthfulReport,true);
assert.strictEqual(report.fact.maskedInterceptorDefeatedKakashi,true);
assert.strictEqual(report.fact.maskedInterceptorPackageSmugglerAftermathKnownToKakashi,false);
assert.strictEqual(report.fact.lethalActionCommitted,false);
assert.strictEqual(report.fact.participantCustodyCommitted,false);
assert.strictEqual(report.fact.pakkunPresent,false);
assert.strictEqual(report.fact.missionObjectiveResultFromKakashiKnowledge,"FAILED");
assert.strictEqual(active.localContext.kakashiScene05ALObjective,null,"Return to ANBU objective must be removed after report");
assert(debrief>=1,"terminal debrief was not committed after factual report");

safety=0;
while(active.beatId===MOD.officeBeatId&&safety++<180){
 out=globalThis.advanceStoryScene();
 assert(out&&out.success===true,"hidden office advance failed: "+JSON.stringify(out));
}
assert.strictEqual(active.beatId,"kak_terminal_chronicle_receipt_35100","hidden office did not reach canonical 35100 Chronicle Receipt");
const hidden=store.get(active.localContext.kakashiScene07ALHiddenOccurrenceId);
assert(hidden,"hidden loss review occurrence missing");
assert.strictEqual(hidden.fact.kakashiMissionResult,"FAILURE");
assert.strictEqual(hidden.fact.hiddenOperationPackageRecoveredAfterward,true);
assert.strictEqual(hidden.fact.kakashiMissionPackageRecovered,false);
assert.strictEqual(hidden.fact.kakashiPresent,false);
assert.strictEqual(hidden.fact.kakashiKnowledgeGranted,false);
assert.strictEqual(hidden.fact.maskedInterceptorState,"ALIVE");
assert.strictEqual(hidden.fact.packageSmugglerState,"ALIVE");
assert.strictEqual(hidden.fact.anbuMarkedTargetState,"ALIVE");
assert.strictEqual(hidden.fact.participantCustodyCommitted,false);
assert.strictEqual(hidden.fact.lethalActionCommitted,false);
assert.strictEqual(hidden.fact.pakkunPresent,false);
assert.strictEqual(hidden.fact.minatoEvaluation.moralScoreCollapsed,false);
assert.strictEqual(hidden.fact.authorityCommit,"d0d29a18ae2104b0cd29c1ca29b1f5a88fef71ab","expression rewrite must not mutate hidden-review fact provenance");
assert(receipt>=1,"Chronicle Receipt was not committed");

assert(receipt>=1,"canonical Chronicle Receipt was not entered");
const source=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-loss-ending-35820.js"),"utf8");
const polishSource=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-scene-board-polish-33910.js"),"utf8");
assert(source.includes("362f72b8f20f50fec1b8e11e483e40cf5030364c"),"revised loss-office Writing expression authority missing");
assert(source.includes("d0d29a18ae2104b0cd29c1ca29b1f5a88fef71ab"),"original hidden-review factual authority missing");
assert(source.includes("He followed the handoff. Lost the original target. Saw her go after the receiver and stepped in."),"revised character-driven office opening missing");
assert(!source.includes('text:"He couldn’t follow?"')&&!source.includes('text:"No excuse?"'),"superseded clipped office exchange still present");
assert(source.includes(".sc-chronicle-layout{display:none!important}")&&source.includes("scBoardUiMode"),"generic Chronicle dialogue panel can still reassert over Minato");
assert(!source.includes("sc-dialogue-panel-33910"),"loss route must not own Kakashi dialogue geometry");
assert(polishSource.includes("top:4%!important"),"canonical 33910 dialogue lane missing");
assert(source.includes("sc-live-state-callout-33900")&&source.includes("RECOVERED · HIDDEN OPERATION"),"loss office package state callout missing");
assert(source.includes("TERMINAL.enterCanonicalReceipt()"),"loss ending must hand off to canonical 35100 Receipt");
assert(!source.includes('document.body.appendChild(n)'),"stale route-local loss Receipt renderer remains active");
assert(!source.includes('openOverlay("village")'),"loss ending still bypasses canonical post-Receipt onboarding");
assert(saves>0,"loss route never persisted state");
console.log("Academy Kakashi loss ending 35820 QA: PASS");
console.log("- RETURN TO ANBU reaches exact rooftop report");
console.log("- report commits only observer-known failure facts and removes the objective");
console.log("- black-wipe continuation reaches exact hidden Hokage Office");
console.log("- MI / PS / AMT remain alive; Kakashi stays absent and gains no hidden-operation Knowledge");
console.log("- hidden package recovery never rewrites Kakashi's mission failure");
console.log("- hidden office hands off to canonical 35100 Chronicle Receipt; route-local Konoha exit is retired");
