#!/usr/bin/env node
"use strict";
const fs=require("fs"),vm=require("vm"),path=require("path"),assert=require("assert");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const SOURCE_BEAT="kak_scene05a_w_choice";
const SOURCE_CHOICE="scene05aw_lethal";
const SCENE_BEAT="kak_scene06a_w2c_attempt_kill";
const HOLD_BEAT="kak_scene06a_w2c_scene7_pending";
const MI="academy_kakashi_origin_masked_interceptor";
const store=new Map();
let saves=0,baseAdvanceCalls=0;

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
const originalRequest={requestId:"current-deterministic-kill-owner",kind:"domain",resolve:()=>({success:true,type:"current_kill_owner"})};
const sourceChoice={choiceId:SOURCE_CHOICE,label:"KILL HER",nextBeatId:"qa_current_kill",availability:()=>({available:true}),consequenceRequests:[originalRequest]};
const definition={sceneId:SCENE_ID,beatMap:new Map([
  [SOURCE_BEAT,{beatId:SOURCE_BEAT,mode:"choice",environmentRef:{assetId:"kakashi_origin_fight_at_sakura_tree"},text:"",choices:[sourceChoice]}],
  ["qa_current_kill",{beatId:"qa_current_kill",mode:"narration",text:"current owner"}]
])};
const active={sceneId:SCENE_ID,instanceId:"qa-scene06aw2c-compat",beatId:SOURCE_BEAT,localContext:{kakashiScene05AWEntered:true,kakashiScene05AWTurnCount:4,kakashiScene05AWBattleOccurrenceId:"battle-mi-qa"}};
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>true;
globalThis.registerStorySceneBoardRenderHook=()=>true;
globalThis.advanceStoryScene=function baseAdvance(choiceId=null){
  baseAdvanceCalls+=1;
  const beat=definition.beatMap.get(active.beatId);
  if(!beat)return{success:false,reason:"qa_beat_missing"};
  if(beat.mode==="choice"){
    const row=(beat.choices||[]).find(x=>x&&x.choiceId===choiceId);
    if(!row)return{success:false,reason:"qa_choice_missing"};
    for(const req of row.consequenceRequests||[]){const out=req.resolve();if(!out||out.success!==true)return out||{success:false,reason:"qa_choice_consequence_failed"};}
    active.beatId=row.nextBeatId;return{success:true,type:"qa_base_current_owner",beatId:active.beatId};
  }
  return{success:false,reason:"qa_no_transition"};
};
globalThis.SC_ALPHA_KAKASHI_SCENE05AW_35730={patchId:"qa-scene05aw"};

load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-story-factual-resolver-34600.js");
globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",participantRef:MI,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-mi-defeated"});
load("runtime/alpha-kakashi-scene06a-w2c-35760.js");

const MOD=globalThis.SC_ALPHA_KAKASHI_SCENE06AW2C_35760;
assert(MOD,"35760 compatibility module missing");
assert.strictEqual(MOD.patchId,"alpha_kakashi_scene06aw2c_35760_v9_legacy_resume_only_2026_09_22");
const diag=globalThis.runAcademyKakashiScene06AW2C35760Diagnostics();
assert.strictEqual(diag.pass,true,"35760 diagnostics failed: "+JSON.stringify(diag.failed));
assert.strictEqual(diag.checks.currentEntryRetired,true);
assert.strictEqual(diag.checks.sourceChoiceNotMutated,true);
assert.strictEqual(diag.checks.browserChoiceCaptureRetired,true);

assert.strictEqual(MOD.wireSourceChoice(),false,"35760 must not rewrite the current post-Battle choice");
assert.strictEqual(sourceChoice.label,"KILL HER");
assert.strictEqual(sourceChoice.nextBeatId,"qa_current_kill");
assert.strictEqual(sourceChoice.consequenceRequests.length,1);
assert.strictEqual(sourceChoice.consequenceRequests[0],originalRequest);

const beforeSnapshot=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
const beforeReceipts=Object.keys(beforeSnapshot.decisionReceipts||{}).length;
const current=globalThis.advanceStoryScene(SOURCE_CHOICE);
assert.strictEqual(current.success,true,"current deterministic owner did not receive source choice");
assert.strictEqual(current.type,"qa_base_current_owner");
assert.strictEqual(active.beatId,"qa_current_kill");
assert.strictEqual(baseAdvanceCalls,1,"35760 intercepted current source choice");
const afterSnapshot=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
assert.strictEqual(Object.keys(afterSnapshot.decisionReceipts||{}).length,beforeReceipts,"35760 minted a new obsolete ATTEMPT intent");

active.beatId=SCENE_BEAT;
active.localContext={kakashiScene06AW2CEntered:true,kakashiScene06AW2CPursuitWasOpenAtIntent:false,__kakashiScene06AW2C35760Cursor:0};
const legacy=globalThis.getStoryScenePerformance33900();
assert(legacy&&legacy.cue&&legacy.cue.text==="Kakashi watches Masked Interceptor push herself upright.","persisted legacy Scene 06A-W2C no longer projects");
const advanced=globalThis.advanceStoryScene();
assert.strictEqual(advanced.success,true,"persisted legacy Scene 06A-W2C cue cannot advance");
assert.strictEqual(advanced.semanticBeatUnchanged,true);
assert.strictEqual(active.beatId,SCENE_BEAT);

active.beatId=HOLD_BEAT;
active.localContext={kakashiScene06AW2CEntered:true,kakashiScene06AW2CPursuitAvailable:false,kakashiScene06AW2COutcomeRef:"LETHAL_ATTEMPT_SURVIVED"};
const hold=globalThis.advanceStoryScene();
assert.strictEqual(hold.success,false);
assert.strictEqual(hold.reason,"kakashi_scene06aw2c_scene7_authority_pending","legacy unresolved hold must remain fail-closed rather than inventing a successor");

const src=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-scene06a-w2c-35760.js"),"utf8");
assert(!src.includes('document.__scKakashiScene06AW2CCapture35760=true'),"retired browser input capture resurfaced");
assert(!src.includes('if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===SOURCE_BEAT&&choiceId===SOURCE_CHOICE&&lateEntryEligible(rt))'),"retired source-beat advance interception resurfaced");
assert(src.includes("Current post-Battle entry was superseded by the global player-agency rule"),"supersession provenance missing");

console.log(JSON.stringify({
  pass:true,
  patch:MOD.patchId,
  currentEntryRetired:true,
  currentKillOwnerDelegated:true,
  obsoleteAttemptIntentNotMinted:true,
  sourceChoiceNotMutated:true,
  browserInputCaptureRetired:true,
  persistedLegacySceneResumePreserved:true,
  unresolvedLegacyHoldFailsClosed:true,
  browserGoldenClaimed:false
},null,2));
