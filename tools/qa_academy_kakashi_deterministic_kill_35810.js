#!/usr/bin/env node
"use strict";
const fs=require("fs"),vm=require("vm"),path=require("path"),assert=require("assert");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}
const SCENE_ID="origin_academy_kakashi_anbu_retrieval",SOURCE_BEAT="kak_scene05a_w_choice",MI="academy_kakashi_origin_masked_interceptor";
const store=new Map();let saves=0;
globalThis.playerData={};
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.SC_ALPHA_ORIGIN_32900={
 commitOccurrence(originId,occurrenceId,fact,links,meta){if(store.has(occurrenceId))return{success:true,idempotent:true,record:store.get(occurrenceId)};const record={originId,occurrenceId,fact,links,meta};store.set(occurrenceId,record);return{success:true,record};},
 findOccurrence(id){return store.get(String(id||""))||null;}
};
const definition={sceneId:SCENE_ID,beatMap:new Map([[SOURCE_BEAT,{beatId:SOURCE_BEAT,mode:"choice",choices:[{choiceId:"scene05aw_lethal",label:"KILL HER",nextBeatId:SOURCE_BEAT,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]}]}]])};
const active={sceneId:SCENE_ID,instanceId:"qa-dkill",beatId:SOURCE_BEAT,localContext:{kakashiScene05AWEntered:true,kakashiScene05AWPursuitEligible:true,kakashiScene05AWPackagePursuitEligible:true,kakashiScene05AWAmtPursuitEligible:true,kakashiScene05AWTurnCount:4,kakashiScene05AWBattleOccurrenceId:"battle-mi-controlled"},battleResume:{authored:null}};
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>true;
globalThis.advanceStoryScene=function base(choiceId=null){
 const beat=definition.beatMap.get(active.beatId);if(!beat)return{success:false,reason:"qa_beat_missing"};
 if(beat.mode==="choice"){
  const row=(beat.choices||[]).find(x=>x&&x.choiceId===choiceId);if(!row)return{success:false,reason:"qa_choice_missing"};
  for(const req of row.consequenceRequests||[]){const out=req.resolve();if(!out||out.success!==true)return out||{success:false,reason:"qa_choice_consequence_failed"};}
  active.beatId=row.nextBeatId;return{success:true,beatId:active.beatId};
 }
 return{success:false,reason:"qa_no_base_transition"};
};
load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-story-factual-resolver-34600.js");
let classified=globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",participantRef:MI,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-defeated"});
assert.strictEqual(classified.success,true);
load("runtime/alpha-kakashi-deterministic-kill-35810.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_DETERMINISTIC_KILL_35810;
assert(MOD,"deterministic KILL module missing");
const diag=globalThis.runAcademyKakashiDeterministicKill35810Diagnostics();
assert.strictEqual(diag.pass,true,"35810 diagnostics failed: "+JSON.stringify(diag.failed));
const source35810=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-deterministic-kill-35810.js"),"utf8");
assert(!source35810.includes('reason:"controlled_defeated_required"'),"direct KILL must not require hidden controlled-defeated state");
assert(!source35810.includes('"CONTROLLED_DEFEATED REQUIRED"'),"player-facing KILL availability must not expose old control gate");
MOD.wireSource();
let out=globalThis.advanceStoryScene("scene05aw_lethal");
assert.strictEqual(out.success,true,"KILL HER entry failed: "+JSON.stringify(out));
assert.strictEqual(active.beatId,MOD.sceneBeatId);
const snapIntent=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
const receipt=snapIntent.decisionReceipts[active.localContext.kakashiDeterministicKillIntentReceiptId];
assert(receipt,"deterministic lethal intent receipt missing");
assert.strictEqual(receipt.status,"intent_committed");
assert.strictEqual(receipt.selectedIntent.intentType,"KILL");
assert.strictEqual(receipt.selectedIntent.intentPayload.outcomeMode,"deterministic");

let safety=0;
while(active.beatId===MOD.sceneBeatId&&safety++<30){
 out=globalThis.advanceStoryScene();
 assert(out&&out.success===true,"deterministic scene advance failed: "+JSON.stringify(out));
}
assert.strictEqual(active.beatId,MOD.aftermathBeatId,"committed kill did not enter aftermath");
assert.strictEqual(store.size,1,"expected one deterministic death occurrence");
const death=[...store.values()][0];
assert.strictEqual(death.fact.semanticClass,"KILL — GUARANTEED");
assert.strictEqual(death.fact.targetDeathConfirmed,true);
assert.strictEqual(death.fact.confirmedKillCountDelta,1);
assert.strictEqual(death.fact.failedLethalAttemptCountDelta,0);
assert.strictEqual(death.fact.battleTurns,4);
assert.strictEqual(death.fact.packageState.currentHolderClass,"PACKAGE_SMUGGLER");
assert.strictEqual(death.fact.worldFacts.packageSmugglerAvailable,true);
assert.strictEqual(death.fact.worldFacts.pursuitAvailable,true);
assert.strictEqual(active.localContext.kakashiDeterministicKillPursuitAvailable,true);
assert.strictEqual(active.localContext.kakashiScene05AWPackagePursuitEligible,true);
const snapDeath=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
assert.strictEqual(snapDeath.participantStates[MI].stateClass,"DEAD");
assert.strictEqual(snapDeath.decisionReceipts[receipt.storyDecisionReceiptId].status,"resolved","intent must resolve only after death commit");

safety=0;
while(active.beatId===MOD.aftermathBeatId&&safety++<20){
 out=globalThis.advanceStoryScene();
 assert(out&&out.success===true,"aftermath advance failed: "+JSON.stringify(out));
}
assert.strictEqual(active.beatId,MOD.pursuitBeatId,"qualifying deterministic kill failed to preserve pursuit");
const pursuit=definition.beatMap.get(MOD.pursuitBeatId);
assert.deepStrictEqual(pursuit.choices.map(x=>x.label),["GO AFTER PACKAGE SMUGGLER","GO AFTER ANBU MARKED TARGET"]);
const blocked=globalThis.advanceStoryScene("scene06aw2c_dkill_go_after_package_smuggler");
assert.strictEqual(blocked.success,false);
assert.strictEqual(blocked.reason,"kakashi_stop_assassin_postkill_ps_successor_scene_not_yet_locked");
assert.strictEqual(active.beatId,MOD.pursuitBeatId,"fail-closed successor must preserve current pursuit state");

active.beatId=MOD.sceneBeatId;
const replay=MOD.commitDeath(active);
assert.strictEqual(replay.success,true);
assert.strictEqual(replay.idempotent,true);
assert.strictEqual(store.size,1,"save/reload style replay duplicated deterministic death occurrence");
assert(saves>0,"deterministic kill state never persisted");
console.log("Academy Kakashi deterministic KILL HER 35810 QA: PASS");
console.log("- valid living post-Battle defeat is sufficient; hidden control classification never gates direct KILL");
console.log("- death commits before cinematic realization and resolves the semantic intent receipt");
console.log("- exact battle turns/package holder are retained");
console.log("- qualifying turn-4 kill preserves Package Smuggler pursuit and exact target death across replay");
console.log("- post-kill successor remains fail-closed until its player-facing scene is durably authored");
