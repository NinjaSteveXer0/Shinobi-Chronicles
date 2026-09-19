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
const active={sceneId:SCENE_ID,instanceId:"qa-scene06aw2c",beatId:SOURCE_BEAT,localContext:{kakashiScene05AWEntered:true,kakashiScene05AWPursuitEligible:false,kakashiScene05AWTurnCount:4,kakashiScene05AWBattleOccurrenceId:"battle-mi-qa"},battleResume:{authored:null}};
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
assert.strictEqual(MOD.authority,"bef78d90ccdea0206199ca0cdd06593ce3a0adb1");
assert.strictEqual(MOD.actionContract,"778fc612d21beae9d3b96d8ace70ab10ad467237");
assert.strictEqual(MOD.bindingRef,"academy_kakashi.lethal.attempt_kill");
assert.strictEqual(MOD.cueCount,18);
assert.strictEqual(MOD.closedCueCount,13);
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
  "Masked Interceptor steadies herself.",
  "Kakashi reaches for his kunai.",
  "She sees his hand move.",
  "Whatever she expected him to do next, this was not it.",
  "Her stance changes.",
  "Kakashi lowers his centre of gravity.",
  "Then disappears from where he was standing."
];
const exactOpen=[
  "Kakashi watches Masked Interceptor push herself upright.",
  "One hand braces against the stone.",
  "The other stays close to her weapon.",
  "She is hurt.",
  "Still dangerous.",
  "Kakashi studies her for a heartbeat.",
  "His eye shifts toward the street.",
  "Package Smuggler is still moving.",
  "Somewhere beyond him, ANBU Marked Target is getting farther away.",
  "Kakashi could move now.",
  "Instead, he looks back at Masked Interceptor.",
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
active.beatId=SOURCE_BEAT;active.localContext={kakashiScene05AWEntered:true,kakashiScene05AWPursuitEligible:true,kakashiScene05AWTurnCount:3,kakashiScene05AWBattleOccurrenceId:"battle-mi-fast"};
MOD.wireSourceChoice();
const fast=globalThis.advanceStoryScene(SOURCE_CHOICE);
assert.strictEqual(fast.success,true,"1-4 pursuit-eligible ATTEMPT TO KILL must still enter Scene 06A-W2C: "+JSON.stringify(fast));
assert.strictEqual(active.beatId,SCENE_BEAT);

assert.strictEqual(active.localContext.kakashiScene06AW2CPursuitWasOpenAtIntent,true,"lethal intent must preserve the pre-action pursuit window for factual recalculation");
for(let i=0;i<exactOpen.length;i++){
  const p=globalThis.getStoryScenePerformance33900();
  assert.strictEqual(p.cue.text,exactOpen[i],"open-pursuit lethal narration mismatch at "+i);
  if(i<exactOpen.length-1){const out=globalThis.advanceStoryScene();assert.strictEqual(out.success,true);}
}

globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",participantRef:MI,stateClass:"CONTROLLED_DEFEATED",resultRef:"qa-controlled"});
active.beatId=SOURCE_BEAT;active.localContext={kakashiScene05AWEntered:true,kakashiScene05AWPursuitEligible:true,kakashiScene05AWTurnCount:4,kakashiScene05AWBattleOccurrenceId:"battle-mi-controlled"};
const controlled=globalThis.advanceStoryScene(SOURCE_CHOICE);
assert.strictEqual(controlled.success,false);
assert.strictEqual(controlled.reason,"kakashi_scene05aw_successor_authority_not_implemented","controlled deterministic KILL route must not enter ATTEMPT TO KILL Scene 06A-W2C");
assert(saves>0,"Scene 06A-W2C never persisted state");

console.log("Academy Kakashi Scene 06A-W2C 35760 QA: PASS");
console.log("- exact pursuit-closed and pursuit-open Writing narration variants");
console.log("- ATTEMPT TO KILL remains live inside the corrected 1-4 pursuit window; controlled deterministic KILL stays separate");
console.log("- lethal intent commits before resolver selection");
console.log("- resolver commits only the four Writing-authorised factual outcomes, idempotently");
console.log("- lethal intent itself does not close pursuit; factual result owns recalculation; no Pakkun is invented");
console.log("- pursuit-preserved KILLED state is kept out of the old terminal W2C ending");
const scene06Source=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-scene06a-w2c-35760.js"),"utf8");
assert(scene06Source.includes('addEventListener("click"'),"installed-browser choice capture seam missing");
assert(scene06Source.includes("stopImmediatePropagation"),"browser choice capture must pre-empt stale fail-closed handler");
assert(scene06Source.includes("fast_confirmed_kill_preserves_committed_pursuit_window"),"qualifying KILLED pursuit preservation rule missing");
assert(scene06Source.includes("kakashiScene06AW2CPursuitWasOpenAtIntent"),"pre-lethal pursuit snapshot missing");
assert(scene06Source.includes("GO AFTER PACKAGE SMUGGLER")&&scene06Source.includes("GO AFTER ANBU MARKED TARGET"),"state-derived post-lethal pursuit choices missing");
assert(scene06Source.includes("kakashiScene06AW2CPursuitPresentationReady===true")&&scene06Source.includes("return null"),"installed-browser kill continuation must release narration after the lethal animation so pursuit choices can paint");

