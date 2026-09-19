#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const path=require("path");
const assert=require("assert");

function load(rel){const abs=path.resolve(process.cwd(),rel);vm.runInThisContext(fs.readFileSync(abs,"utf8"),{filename:rel});}
function choice(choiceId,label,nextBeatId){return{choiceId,label,nextBeatId,availability:null,knownBlocker:null,consequenceRequests:[],contextPatch:null};}
function freshDefinition(){
  const action={beatId:"kak_original_action",mode:"choice",environmentRef:{assetId:"qa_alley"},choices:[
    choice("observe","WATCH THE EXCHANGE","kak_original_transfer"),
    choice("get_closer","MOVE IN CLOSER","kak_original_transfer"),
    choice("attack","STRIKE BEFORE THE HANDOFF","kak_original_transfer"),
    choice("attempt_pickpocket","SLIP IN FOR THE PACKAGE","kak_original_transfer")
  ]};
  const transfer={beatId:"kak_original_transfer",mode:"narration",environmentRef:{assetId:"qa_sakura"},text:"legacy transfer prose",nextBeatId:"kak_original_major_choice",onEnterConsequences:[]};
  const major={beatId:"kak_original_major_choice",mode:"choice",environmentRef:{assetId:"qa_sakura"},text:"legacy major prose",choices:[
    choice("fight_assassin","CUT HER OFF","kak_original_major_choice"),
    choice("secure_package","GO FOR THE PACKAGE","kak_original_secured"),
    choice("defeat_assassin_then_recover","DEAL WITH HER FIRST, THEN CHASE THE PACKAGE","kak_original_major_choice"),
    choice("pursue_original_target","STAY ON THE FIRST MAN","kak_original_pursue")
  ],onEnterConsequences:[]};
  const secured={beatId:"kak_original_secured",mode:"narration",exitScene:true,onEnterConsequences:[]};
  const pursue={beatId:"kak_original_pursue",mode:"narration",exitScene:true,onEnterConsequences:[]};
  return{sceneId:"origin_academy_kakashi_anbu_retrieval",entryBeatId:"kak_original_action",beatMap:new Map([[action.beatId,action],[transfer.beatId,transfer],[major.beatId,major],[secured.beatId,secured],[pursue.beatId,pursue]]),onCompleteConsequences:[]};
}

let definition=freshDefinition();
let active={sceneId:definition.sceneId,instanceId:"qa-kakashi-scene03a",beatId:"kak_original_action",localContext:{},committedChoiceKeys:[]};
let saves=0,renders=0;

globalThis.playerData={activityHistory:[]};
globalThis.activityHistory=globalThis.playerData.activityHistory;
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.ensurePlayerAcquisitionState=()=>({chronicleOriginVariantId:"academy_kakashi"});
globalThis.getStorySceneDefinition=sceneId=>sceneId===definition.sceneId?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.renderStoryScenePresentationLayer=()=>{renders+=1;return true;};
globalThis.normalizeStorySceneBeat=(beat,index)=>({...beat,authoredIndex:index,choices:Array.isArray(beat.choices)?beat.choices.map(row=>({...row,consequenceRequests:Array.isArray(row.consequenceRequests)?row.consequenceRequests:[],contextPatch:row.contextPatch||null})):[],onEnterConsequences:Array.isArray(beat.onEnterConsequences)?beat.onEnterConsequences:[]});

const legacyCue={cueId:"legacy",kind:"narration",text:"legacy transfer",focusActorRef:"academy_kakashi"};
globalThis.getStoryScenePerformance33900=()=>active.beatId==="kak_original_transfer"?{sequence:[legacyCue],index:0,cue:legacyCue,atEnd:true}:null;
globalThis.advanceStoryScene=function baseAdvance(){
  const beat=definition.beatMap.get(active.beatId);if(!beat||!beat.nextBeatId)return{success:false,reason:"qa_no_next_beat"};
  active.beatId=beat.nextBeatId;
  const next=definition.beatMap.get(active.beatId);
  for(const request of next&&Array.isArray(next.onEnterConsequences)?next.onEnterConsequences:[]){const result=typeof request.resolve==="function"?request.resolve():{success:true};if(!result||result.success!==true)return result||{success:false,reason:"qa_on_enter_failed"};}
  return{success:true,beatId:active.beatId};
};

load("runtime/alpha-origin-scenes-32900-core.js");
load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-kakashi-final-origin-adapter-34100-core.js");
load("runtime/alpha-kakashi-final-authority-guard-34200.js");
load("runtime/alpha-story-factual-resolver-34600.js");
load("runtime/alpha-kakashi-scene03a-35700.js");

const MOD=globalThis.SC_ALPHA_KAKASHI_SCENE03A_35700;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
assert(MOD&&CORE,"Scene 03A dependencies did not install");
const diag=globalThis.runAcademyKakashiScene03A35700Diagnostics();
assert.strictEqual(diag.pass,true,`35700 diagnostics failed: ${JSON.stringify(diag.failed)}`);
assert.strictEqual(diag.checks.watchExchangeMotionStages,true,"Watch the Exchange motion stage mapping missing");
assert.strictEqual(diag.checks.watchExchangeMotionLanguage,true,"Watch the Exchange motion language missing");
const scene03Source=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-scene03a-35700.js"),"utf8");
assert(scene03Source.includes("scWatchMiBurst35700"),"MI burst animation missing");
assert(scene03Source.includes("scWatchAmtBreakaway35700"),"AMT breakaway animation missing");
assert(scene03Source.includes("sc-watch-handoff-giver-35700"),"package handoff animation missing");
assert(scene03Source.includes("sc-watch-mi-cutoff-35700"),"MI interception animation missing");
assert(scene03Source.includes("sc-watch-ps-turn-35700")&&!scene03Source.includes("sc-watch-ps-escape-35700"),"Package Smuggler must hold the exchange lane before branch-specific escape");
assert(scene03Source.includes("right:27%!important")&&scene03Source.includes("scWatchAmtBreakaway35700"),"MI must enter the PS lane while AMT breaks away");
assert.strictEqual(MOD.cueCount,18,"Scene 03A cue count drifted");
assert.deepStrictEqual(MOD.objectives,{initial:"Stop the package from falling into the wrong hands.",postHandoff:"Retrieve the package."},"Scene 03A objective wording drifted");
assert.strictEqual(diag.checks.objectiveChangesAtPackageTransfer,true,"Scene 03A objective does not change at exact package-transfer cue");

const action=definition.beatMap.get("kak_original_action");
const observe=action.choices.find(row=>row.choiceId==="observe");
assert(observe,"WATCH THE EXCHANGE missing");
assert.strictEqual(observe.label,"WATCH THE EXCHANGE");
assert.strictEqual(observe.nextBeatId,"kak_original_transfer");
assert(observe.consequenceRequests.some(row=>row.requestId==="kakashi_scene03a_observe_intent_35700"),"Observe semantic intent request missing");

const intentResult=observe.consequenceRequests.find(row=>row.requestId==="kakashi_scene03a_observe_intent_35700").resolve();
assert.strictEqual(intentResult.success,true,`Observe intent commit failed: ${JSON.stringify(intentResult)}`);
assert(active.localContext.kakashiObserveScene03AStoryDecisionReceiptId,"Observe decision receipt not persisted");
active.localContext.kakashiOriginalAction="observe";
active.beatId="kak_original_transfer";

const expected=[
  "Kakashi stays where he is.","Not passive.","Watching.","ANBU Marked Target shifts the package from beneath his clothing and places it into Package Smuggler's hand.","The moment custody changes, the whole problem changes with it.","Kakashi's eye follows the package.","ANBU Marked Target is already moving away.","Package Smuggler turns in the opposite direction.","Kakashi has one additional fact now—who received the package—and less control over the situation than he had a few seconds earlier.","The trade was information for escalation.","Then the darkness beside the alley moved.","Not slowly.","A figure tore out of it like a lightning streak.","Masked Interceptor hit the new situation at speed, driving straight toward Package Smuggler and forcing him to react before he had properly cleared the exchange.","ANBU Marked Target broke away.","Package Smuggler tightened around the package.","Masked Interceptor cut across his escape line.","And Kakashi, still unseen for one more heartbeat, had to choose what mattered most now."
];
for(let i=0;i<expected.length;i++){
  const p=globalThis.getStoryScenePerformance33900();
  assert(p,"Scene 03A performance missing");
  assert.strictEqual(p.index,i,`Scene 03A cue index drift at ${i}`);
  assert.strictEqual(p.cue.kind,"narration",`Scene 03A cue ${i} is not narration`);
  assert.strictEqual(p.cue.text,expected[i],`Scene 03A cue ${i} text drift`);
  if(i<expected.length-1){const advanced=globalThis.advanceStoryScene();assert.strictEqual(advanced.success,true,`Scene 03A cue ${i} failed to advance`);assert.strictEqual(active.beatId,"kak_original_transfer","Scene 03A advanced semantic beat before final cue");}
}

const finalAdvance=globalThis.advanceStoryScene();
assert.strictEqual(finalAdvance.success,true,`Scene 03A final semantic advance failed: ${JSON.stringify(finalAdvance)}`);
assert.strictEqual(active.beatId,"kak_original_major_choice","Scene 03A did not reach exact five-way decision beat");
assert.strictEqual(globalThis.playerData.activityHistory.length,1,"Scene 03A should commit exactly one factual occurrence");
const occurrence=globalThis.playerData.activityHistory[0];
assert.strictEqual(occurrence.committed,true);
assert.strictEqual(occurrence.fact.factClass,"academy_kakashi_observe_exchange_scene03a_factual_state");
assert.strictEqual(occurrence.fact.packageState.previousHolderClass,"ANBU_MARKED_TARGET");
assert.strictEqual(occurrence.fact.packageState.currentHolderClass,"PACKAGE_SMUGGLER");
assert.strictEqual(occurrence.fact.packageState.handoffCompleted,true);
assert.strictEqual(occurrence.fact.participantStateByRole.masked_interceptor.visibilityState,"VISIBLE_AFTER_COMPLETED_TRANSFER");
assert.strictEqual(occurrence.fact.knowledgeStateByObserver.academy_kakashi.packageRecipientObserved,true);
assert.strictEqual(occurrence.fact.knowledgeStateByObserver.academy_kakashi.maskedInterceptorVisible,true);
assert.strictEqual(occurrence.fact.nextDecisionPointRef,"OBSERVE_ESCALATION");

const semantic=CORE.getStoryUnitSnapshot("academy_kakashi");
const receipt=semantic.decisionReceipts[active.localContext.kakashiObserveScene03AStoryDecisionReceiptId];
assert(receipt,"Scene 03A semantic receipt missing after handoff commit");
assert.strictEqual(receipt.selectedChoiceId,"observe");
assert.strictEqual(receipt.resolverBindingRef,"academy_kakashi.story_fixed.observe_transfer");
assert.strictEqual(receipt.status,"resolved","Observe semantic intent did not resolve after factual Scene 03A commit");
assert.strictEqual(receipt.successorSituationRef,"academy_kakashi.decision.observe_escalation");
assert(receipt.stateDeltaRefs.includes(occurrence.occurrenceId),"Scene 03A factual occurrence not bridged as state delta");
assert(receipt.knowledgeDeltaRefs.includes(occurrence.occurrenceId),"Scene 03A Knowledge occurrence not bridged");
assert(receipt.objectiveDeltaRefs.includes(occurrence.occurrenceId),"Scene 03A objective change not bridged from handoff occurrence");

const major=definition.beatMap.get("kak_original_major_choice");
assert.strictEqual(major.text,"","Scene 03A choice beat retained unauthorised legacy prose");
assert.strictEqual(major.choices.map(row=>row.choiceId).join("|"),"stop_assassin|secure_package|secure_package_before_assassin|defeat_assassin_then_secure|go_after_original_target");
assert.strictEqual(major.choices.map(row=>row.label).join("|"),"STOP THE ASSASSIN|SECURE THE PACKAGE|SECURE THE PACKAGE BEFORE THE ASSASSIN|DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE|GO AFTER THE ORIGINAL TARGET");
assert(major.choices.every(row=>typeof row.availability==="function"&&row.availability().available===true&&row.knownBlocker===null),"Scene 03A five-way choice surface is not fully available");
assert(major.choices.every(row=>row.nextBeatId==="kak_original_major_choice"&&(!Array.isArray(row.consequenceRequests)||row.consequenceRequests.length===0)),"Scene 03A unlocked choice surface entered unauthorised successor content");
assert(active.localContext.kakashiObserveEscalationChoiceSetId,"Observe escalation semantic choice set not opened from committed Scene 03A state");
const choiceSet=semantic.choiceSets[active.localContext.kakashiObserveEscalationChoiceSetId];
assert(choiceSet&&choiceSet.decisionPointRef==="OBSERVE_ESCALATION","Observe escalation semantic choice set mismatch");
assert.strictEqual(choiceSet.choices.map(row=>row.choiceId).join("|"),"stop_assassin|secure_package|secure_package_before_assassin|defeat_assassin_then_secure|go_after_original_target");

const historyBefore=JSON.stringify(globalThis.playerData.activityHistory);
const receiptIdBefore=active.localContext.kakashiObserveScene03AStoryDecisionReceiptId;
const replay=major.onEnterConsequences.find(row=>row.requestId==="kakashi_scene03a_handoff_escalation_35700").resolve();
assert.strictEqual(replay.success,true,"Scene 03A on-enter replay failed");
assert.strictEqual(JSON.stringify(globalThis.playerData.activityHistory),historyBefore,"Scene 03A replay duplicated or drifted factual history");
assert.strictEqual(active.localContext.kakashiObserveScene03AStoryDecisionReceiptId,receiptIdBefore,"Scene 03A replay changed decision receipt identity");

assert(renders>=17,"Scene 03A cue progression did not exercise presentation re-render seam");
assert(saves>0,"Scene 03A progression never persisted runtime state");
console.log("Academy Kakashi Scene 03A 35700 QA: PASS");
console.log(`- exact narration cues: ${expected.length}`);
console.log("- dialogue: none");
console.log("- Watch the Exchange uses state-driven handoff / divergence / MI arrival / AMT breakaway / interception motion");
console.log("- factual handoff: ANBU Marked Target -> Package Smuggler");
console.log("- objective: Stop the package from falling into the wrong hands. -> Retrieve the package. at exact handoff cue");
console.log("- Masked Interceptor visibility commits after transfer");
console.log("- exact five-way choice surface installed and available; successor scenes remain contained");
console.log("- Observe semantic receipt resolves idempotently from committed Scene 03A state");