#!/usr/bin/env node
"use strict";
const fs=require("fs");
const vm=require("vm");
const path=require("path");
const assert=require("assert");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const SOURCE_BEAT="kak_scene05a_w_choice";
const SOURCE_CHOICE="scene05aw_lethal";
const SCENE_BEAT="kak_scene06a_w2c_attempt_kill";
const HOLD_BEAT="kak_scene06a_w2c_scene7_pending";
const MI="academy_kakashi_origin_masked_interceptor";
const store=new Map();
let saves=0,renders=0;

globalThis.playerData={};
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.SC_ALPHA_ORIGIN_32900={
  commitOccurrence(originId,occurrenceId,fact,links,meta){
    if(store.has(occurrenceId))return{success:true,idempotent:true,record:store.get(occurrenceId)};
    const record={originId,occurrenceId,fact,links,meta,storySceneInstanceId:fact&&fact.storySceneInstanceId||null};
    store.set(occurrenceId,record);return{success:true,record};
  },
  findOccurrence(id){return store.get(String(id||""))||null;}
};
const choiceBeat={beatId:SOURCE_BEAT,mode:"choice",environmentRef:{assetId:"kakashi_origin_fight_at_sakura_tree"},text:"",choices:[
  {choiceId:SOURCE_CHOICE,label:"ATTEMPT TO KILL HER",nextBeatId:SOURCE_BEAT,availability:()=>({available:true}),consequenceRequests:[{requestId:"qa-old-fail-closed",kind:"domain",resolve:()=>({success:false,reason:"kakashi_scene05aw_successor_authority_not_implemented"})}]}
]};
const definition={sceneId:SCENE_ID,beatMap:new Map([[SOURCE_BEAT,choiceBeat]])};
const active={sceneId:SCENE_ID,instanceId:"qa-scene06aw2c",beatId:SOURCE_BEAT,localContext:{kakashiScene05AWPursuitEligible:false,kakashiScene05AWTurnCount:4,kakashiScene05AWBattleOccurrenceId:"battle-mi-qa"},battleResume:{authored:null}};
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>{renders+=1;return true;};
globalThis.advanceStoryScene=function baseAdvance(choiceId=null){
  const beat=definition.beatMap.get(active.beatId);
  if(!beat)return{success:false,reason:"qa_beat_missing"};
  if(beat.mode==="choice"){
    const row=(beat.choices||[]).find(x=>x&&x.choiceId===choiceId);
    if(!row)return{success:false,reason:"qa_choice_missing"};
    for(const req of row.consequenceRequests||[]){const out=req.resolve();if(!out||out.success!==true)return out||{success:false,reason:"qa_choice_consequence_failed"};}
    active.beatId=row.nextBeatId;return{success:true,beatId:active.beatId};
  }
  if(beat.mode==="narration"&&beat.nextBeatId){active.beatId=beat.nextBeatId;return{success:true,beatId:active.beatId};}
  return{success:false,reason:"qa_no_transition"};
};
globalThis.SC_ALPHA_KAKASHI_SCENE05AW_35730={patchId:"qa-scene05aw"};

load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-story-factual-resolver-34600.js");
globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",participantRef:MI,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-mi-defeated"});
load("runtime/alpha-kakashi-scene06a-w2c-35760.js");

const MOD=globalThis.SC_ALPHA_KAKASHI_SCENE06AW2C_35760;
assert(MOD,"Scene 06A-W2C module missing");
assert.strictEqual(MOD.authority,"820917031000c15e62f0a4cea7535397d3ad9e50");
assert.strictEqual(MOD.actionContract,"778fc612d21beae9d3b96d8ace70ab10ad467237");
assert.strictEqual(MOD.bindingRef,"academy_kakashi.lethal.attempt_kill");
assert.strictEqual(MOD.cueCount,17);
assert.strictEqual(MOD.objective,"Retrieve the package.");
assert.deepStrictEqual([...MOD.outcomeRefs],["LETHAL_ATTEMPT_KILLED","LETHAL_ATTEMPT_SURVIVED","LETHAL_ATTEMPT_INTERRUPTED","LETHAL_ATTEMPT_ESCAPED"]);
const diag=globalThis.runAcademyKakashiScene06AW2C35760Diagnostics();
assert.strictEqual(diag.pass,true,"Scene 06A-W2C diagnostics failed: "+JSON.stringify(diag.failed));

const exact=[
  "Kakashi watches Masked Interceptor push herself upright.",
  "One hand braces against the stone.",
  "The other stays close to her weapon.",
  "She is hurt.",
  "Still dangerous.",
  "Kakashi studies her for a heartbeat.",
  "Package Smuggler has already disappeared into Konoha.",
  "There is no sound of pursuit.",
  "No movement from the route ANBU Marked Target took.",
  "Only the two of them remain beneath the Sakura tree.",
  "Masked Interceptor steadies herself.",
  "Kakashi reaches for his kunai.",
  "She sees his hand move.",
  "Whatever she expected him to do next, this was not it.",
  "Her stance changes.",
  "Kakashi lowers his centre of gravity.",
  "Then disappears from where he was standing."
];

MOD.wireSourceChoice();
let entered=globalThis.advanceStoryScene(SOURCE_CHOICE);
assert.strictEqual(entered.success,true,"late ATTEMPT TO KILL HER did not enter Scene 06A-W2C through the normal choice consequence path: "+JSON.stringify(entered));
assert.strictEqual(active.beatId,SCENE_BEAT);
const afterIntent=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
const intentReceipt=afterIntent.decisionReceipts[active.localContext.kakashiScene06AW2CIntentReceiptId];
assert(intentReceipt,"lethal intent receipt missing");
assert.strictEqual(intentReceipt.status,"intent_committed","lethal intent must be committed before factual resolution");
assert.strictEqual(intentReceipt.selectedIntent.intentType,"ATTEMPT_TO_KILL");
assert.strictEqual(intentReceipt.selectedIntent.intentPayload.targetRef,MI);

for(let i=0;i<exact.length;i++){
  const p=globalThis.getStoryScenePerformance33900();
  assert(p,"performance missing at "+i);
  assert.strictEqual(p.index,i);
  assert.strictEqual(p.cue.kind,"narration");
  assert.strictEqual(p.cue.text,exact[i]);
  assert.strictEqual(p.cue.speakerName,undefined);
  if(i<exact.length-1){
    const out=globalThis.advanceStoryScene();
    assert.strictEqual(out.success,true,"cue advance failed at "+i+": "+JSON.stringify(out));
    assert.strictEqual(active.beatId,SCENE_BEAT);
  }
}
assert.strictEqual(store.size,0,"factual outcome committed before final narration cue");

const resolved=globalThis.advanceStoryScene();
assert.strictEqual(resolved.success,true,"lethal factual resolver failed: "+JSON.stringify(resolved));
assert.strictEqual(resolved.scene7Pending,true);
assert.strictEqual(active.beatId,HOLD_BEAT);
assert(MOD.outcomeRefs.includes(resolved.selectedOutcomeRef),"resolver selected unauthorised outcome");
assert.strictEqual(store.size,1,"expected exactly one lethal-resolution occurrence");
const occurrence=[...store.values()][0],fact=occurrence.fact;
assert.strictEqual(fact.semanticClass,"ATTEMPT TO KILL — RESOLVER-DETERMINED");
assert.strictEqual(fact.lethalIntentCommitted,true);
assert.strictEqual(fact.targetRef,MI);
assert.strictEqual(fact.selectedOutcomeRef,resolved.selectedOutcomeRef);
assert.strictEqual(fact.packageState.currentHolderClass,"PACKAGE_SMUGGLER");
assert.strictEqual(fact.packageState.recovered,false);
assert.strictEqual(fact.packageState.available,false);
assert.strictEqual(fact.worldFacts.packageSmugglerAvailable,false);
assert.strictEqual(fact.worldFacts.packageAvailable,false);
assert.strictEqual(fact.worldFacts.anbuMarkedTargetAvailable,false);
assert.strictEqual(fact.worldFacts.pursuitAvailable,false);
assert.strictEqual(fact.worldFacts.pakkunPresent,false);

const afterResolve=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
assert.strictEqual(afterResolve.decisionReceipts[intentReceipt.storyDecisionReceiptId].status,"resolved","semantic intent receipt not resolved after factual resolver");
const repeat=MOD.resolveLethalAttempt();
assert.strictEqual(repeat.success,true);
assert.strictEqual(repeat.idempotent,true);
assert.strictEqual(store.size,1,"replay duplicated lethal-resolution occurrence");
const blocked=globalThis.advanceStoryScene();
assert.strictEqual(blocked.success,false);
assert.strictEqual(blocked.reason,"kakashi_scene06aw2c_scene7_authority_pending");
assert.strictEqual(active.beatId,HOLD_BEAT);
assert(!JSON.stringify([...definition.beatMap.values()]).includes("kak_seq_debrief_pending"),"Scene 06A-W2C invented automatic debrief");

globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",participantRef:MI,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-fast-reset"});
active.beatId=SOURCE_BEAT;active.localContext={kakashiScene05AWPursuitEligible:true,kakashiScene05AWTurnCount:3,kakashiScene05AWBattleOccurrenceId:"battle-mi-fast"};
const fast=globalThis.advanceStoryScene(SOURCE_CHOICE);
assert.strictEqual(fast.success,false);
assert.strictEqual(fast.reason,"kakashi_scene05aw_successor_authority_not_implemented","1-3 turn lethal route must remain fail-closed here");
assert.strictEqual(active.beatId,SOURCE_BEAT);

globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",participantRef:MI,stateClass:"CONTROLLED_DEFEATED",resultRef:"qa-controlled"});
active.beatId=SOURCE_BEAT;active.localContext={kakashiScene05AWPursuitEligible:false,kakashiScene05AWTurnCount:4,kakashiScene05AWBattleOccurrenceId:"battle-mi-controlled"};
const controlled=globalThis.advanceStoryScene(SOURCE_CHOICE);
assert.strictEqual(controlled.success,false);
assert.strictEqual(controlled.reason,"kakashi_scene05aw_successor_authority_not_implemented","controlled deterministic KILL route must not enter ATTEMPT TO KILL Scene 06A-W2C");
assert(saves>0,"Scene 06A-W2C never persisted state");

console.log("Academy Kakashi Scene 06A-W2C 35760 QA: PASS");
console.log("- exact 17-line locked narration / no dialogue / no post-commit player choice");
console.log("- exact late 4+ STOP THE ASSASSIN entry only; fast and controlled variants remain fail-closed");
console.log("- lethal intent commits before resolver selection");
console.log("- resolver commits only the four Writing-authorised factual outcomes, idempotently");
console.log("- package / PS / AMT pursuit stay closed; no Pakkun");
console.log("- Scene 7 expression and automatic debrief remain fail-closed pending Writing authority");
const scene06Source=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-scene06a-w2c-35760.js"),"utf8");
assert(scene06Source.includes('addEventListener("click"'),"installed-browser choice capture seam missing");
assert(scene06Source.includes("stopImmediatePropagation"),"browser choice capture must pre-empt stale fail-closed handler");
