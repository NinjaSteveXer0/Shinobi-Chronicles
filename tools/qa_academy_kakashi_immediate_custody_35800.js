#!/usr/bin/env node
"use strict";
const assert=require("assert");
const fs=require("fs");
const vm=require("vm");
const path=require("path");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const SOURCE_BEAT="kak_scene05a_w_choice";
const ANBU_CHOICE="scene05aw_take_her_back_to_anbu";
const POLICE_CHOICE="scene05aw_take_her_to_uchiha_police";
const MI="academy_kakashi_origin_masked_interceptor";
const store=new Map();
let current=null,saves=0,debriefCalls=0,receiptCalls=0;
globalThis.playerData={activityHistory:[]};
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.SC_ALPHA_ORIGIN_32900={
  commitOccurrence(originId,occurrenceId,fact,links,meta){
    if(store.has(occurrenceId))return{success:true,idempotent:true,record:store.get(occurrenceId)};
    const row={originId,occurrenceId,fact,links,meta,committed:true,storySceneInstanceId:fact&&fact.storySceneInstanceId||null};
    store.set(occurrenceId,row);globalThis.playerData.activityHistory.push(row);return{success:true,record:row};
  },
  findOccurrence(id){return store.get(String(id||""))||null;}
};
let ref=0;
let snapshotMiState="DEFEATED_BUT_NOT_CONTROLLED";
globalThis.SC_STORY_DECISION_REALISATION_34000={
  stableRef(prefix,payload){return prefix+":"+String(payload&&payload.instance||payload&&payload.source||payload&&payload.transfer||"ref")+":"+(++ref);},
  getStoryUnitSnapshot(){return{participantStates:{[MI]:{participantRef:MI,stateClass:snapshotMiState}}};},
  recordParticipantClassification({participantRef,stateClass}){assert.strictEqual(participantRef,MI);snapshotMiState=stateClass;return{success:true,participantRef,stateClass};}
};
globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100={
  commitTerminalDebrief(){debriefCalls+=1;return{success:true,occurrenceId:"qa-terminal-"+debriefCalls};},
  commitChronicleReceiptAndRewards(){receiptCalls+=1;return{success:true,receiptOccurrenceId:"qa-receipt-"+receiptCalls};},
  enterCanonicalReceipt(){debriefCalls+=1;receiptCalls+=1;current.beatId="kak_terminal_chronicle_receipt_35100";return{success:true,beatId:current.beatId,terminalDebriefOccurrenceId:"qa-terminal-"+debriefCalls,receiptOccurrenceId:"qa-receipt-"+receiptCalls};},
  guardedOriginCompletion(){return{success:true};}
};

const definition={sceneId:SCENE_ID,beatMap:new Map()};
definition.beatMap.set(SOURCE_BEAT,{beatId:SOURCE_BEAT,mode:"choice",nextBeatId:null,choices:[
  {choiceId:ANBU_CHOICE,label:"TAKE HER BACK TO ANBU",nextBeatId:SOURCE_BEAT,availability:()=>({available:true}),consequenceRequests:[{requestId:"old_anbu_pending_35730",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]},
  {choiceId:POLICE_CHOICE,label:"TAKE HER TO THE UCHIHA POLICE FORCE",nextBeatId:SOURCE_BEAT,availability:()=>({available:true}),consequenceRequests:[{requestId:"old_police_pending_35730",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]}
]});
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>current;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>true;
globalThis.advanceStoryScene=function baseAdvance(choiceId=null){
  const beat=definition.beatMap.get(current.beatId);
  if(!beat)return{success:false,reason:"qa_beat_missing",beatId:current.beatId};
  if(beat.mode==="choice"){
    const row=(beat.choices||[]).find(x=>x&&x.choiceId===choiceId);
    if(!row)return{success:false,reason:"qa_choice_missing"};
    for(const req of row.consequenceRequests||[]){const out=req.resolve();if(!out||out.success!==true)return out||{success:false,reason:"qa_choice_consequence_failed"};}
    current.beatId=row.nextBeatId;return{success:true,beatId:current.beatId};
  }
  return{success:false,reason:"qa_base_no_transition",beatId:current.beatId};
};

function fresh(instance){
  return{sceneId:SCENE_ID,instanceId:instance,beatId:SOURCE_BEAT,localContext:{
    kakashiScene05AWEntered:true,kakashiScene05AWPursuitEligible:true,kakashiScene05AWPackagePursuitEligible:true,kakashiScene05AWAmtPursuitEligible:true,
    kakashiScene05AWBattleOccurrenceId:"battle-"+instance,kakashiScene05AWTurnCount:3,kakashiScene05AWMiStateClass:"DEFEATED_BUT_NOT_CONTROLLED"
  },battleResume:{authored:null}};
}
function drainUntil(target,max=200){
  let n=0;
  while(current.beatId!==target&&n++<max){
    const out=globalThis.advanceStoryScene();
    assert(out&&out.success===true,"advance failed before "+target+": "+JSON.stringify(out));
  }
  assert.strictEqual(current.beatId,target,"did not reach "+target);
}
function fact(id){const row=globalThis.SC_ALPHA_ORIGIN_32900.findOccurrence(id);assert(row,"missing occurrence "+id);return row.fact;}

current=fresh("qa-anbu");
load("runtime/alpha-kakashi-immediate-custody-35800.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_IMMEDIATE_CUSTODY_35800;
assert(MOD,"35800 module missing");
const diag=globalThis.runAcademyKakashiImmediateCustody35800Diagnostics();
assert.strictEqual(diag.pass,true,"35800 diagnostics failed: "+JSON.stringify(diag.failed));
assert.strictEqual(diag.checks.dialogueGeometryDelegatedTo33910,true,"immediate-custody route still owns dialogue geometry");
assert.strictEqual(diag.checks.directCustodyEntrypoint,true,"immediate custody choices must own a direct runtime entrypoint");
assert.strictEqual(diag.checks.sourceUsesCurrentBattleClassification,true,"current Scene05 battle classification must outrank stale global participant state");
assert.strictEqual(MOD.wireChoices(),true);
snapshotMiState="DEAD"; // stale prior-run snapshot must not disable the current battle's live classification

let out=globalThis.advanceStoryScene(ANBU_CHOICE);
assert.strictEqual(out.success,true,"ANBU source choice failed: "+JSON.stringify(out));
assert.strictEqual(current.beatId,MOD.anbuFirstBeat);
snapshotMiState="DEFEATED_BUT_NOT_CONTROLLED";
assert.strictEqual(current.localContext.kakashiScene05AWPackagePursuitEligible,false);
assert.strictEqual(current.localContext.kakashiScene05AWAmtPursuitEligible,false);
let start=fact(current.localContext.kakashiScene06W2DCustodyOccurrenceId);
assert.strictEqual(start.custodyDisposition,"KAKASHI");
assert.strictEqual(start.custodyTransferPending,"ANBU");
assert.strictEqual(start.packageState.currentHolderClass,"PACKAGE_SMUGGLER");
assert.strictEqual(start.packageState.recovered,false);

drainUntil("kak_scene07a_w2d_anbu_handoff");
drainUntil("kak_scene08a_w2d_hokage_office");
let transfer=fact(current.localContext.kakashiScene07W2DTransferOccurrenceId);
assert.strictEqual(transfer.custodyDisposition,"ANBU");
assert.strictEqual(transfer.participantAlive,true);
let hidden=fact(current.localContext.kakashiScene08W2DHiddenOccurrenceId);
assert.strictEqual(hidden.maskedInterceptorPresent,true);
assert.strictEqual(hidden.maskedInterceptorCustody,"ANBU");
assert.strictEqual(hidden.kakashiKnowledgeGranted,false);
drainUntil("kak_terminal_chronicle_receipt_35100");
assert.strictEqual(snapshotMiState,"ANBU_INSTITUTIONAL_CUSTODY","ANBU transfer did not update canonical MI classification");
assert(debriefCalls>=1,"ANBU route never committed terminal debrief");
assert(receiptCalls>=1,"ANBU route never entered canonical Chronicle Receipt");

current=fresh("qa-police");
assert.strictEqual(MOD.wireChoices(),true);
out=globalThis.advanceStoryScene(POLICE_CHOICE);
assert.strictEqual(out.success,true,"Police source choice failed: "+JSON.stringify(out));
assert.strictEqual(current.beatId,MOD.policeFirstBeat);
start=fact(current.localContext.kakashiScene06W2ECustodyOccurrenceId);
assert.strictEqual(start.custodyDisposition,"KAKASHI");
assert.strictEqual(start.custodyTransferPending,"UCHIHA_POLICE");
assert.strictEqual(current.localContext.kakashiScene05AWPursuitEligible,false);

drainUntil("kak_scene07a_w2e_police_handoff");
drainUntil("kak_scene08a_w2e_anbu_report");
transfer=fact(current.localContext.kakashiScene07W2ETransferOccurrenceId);
assert.strictEqual(transfer.custodyDisposition,"UCHIHA_POLICE","Police custody collapsed into a different institutional holder");
assert.strictEqual(transfer.custodyTransferredTo,"UCHIHA_POLICE");
drainUntil("kak_scene09a_w2e_hokage_office");
hidden=fact(current.localContext.kakashiScene09W2EHiddenOccurrenceId);
assert.strictEqual(hidden.maskedInterceptorPresent,false,"MI must not teleport into Police-custody Hokage Office");
assert.strictEqual(hidden.maskedInterceptorCustody,"UCHIHA_POLICE");
assert.strictEqual(hidden.kakashiKnowledgeGranted,false);
drainUntil("kak_terminal_chronicle_receipt_35100");
assert.strictEqual(snapshotMiState,"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY","Police transfer did not update canonical MI classification");
assert(debriefCalls>=2,"Police route never committed terminal debrief");
assert(receiptCalls>=2,"Police route never entered canonical Chronicle Receipt");

const source=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-immediate-custody-35800.js"),"utf8");
const polishSource=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-scene-board-polish-33910.js"),"utf8");
assert(source.includes("Kakashi Origin Backdrop/uchiha_police_exterior_night.png"),"approved Police backdrop path missing");
assert(source.includes("NPC/uchiha_police_force_member_female.png"),"approved MI Police member variant missing");
assert(source.includes("NPC/uchiha_police_force_male_alt_1.png"),"approved MI Police alternate member variant missing");
assert(source.includes("He brought you back himself."),"W2D office verbatim anchor missing");
assert(source.includes("She remains in Police custody until that custody is properly resolved."),"W2E office verbatim custody anchor missing");
assert(!source.includes("sc-dialogue-panel-33910"),"immediate-custody route must not own Kakashi dialogue geometry");
assert(polishSource.includes("top:4%!important"),"canonical 33910 dialogue lane missing");
assert(source.includes("beginImmediateCustodyChoice35800")&&source.includes("rt.beatId=route.firstBeat"),"TAKE HER BACK TO ANBU / Police must not depend on a fragile generic choice chain");
assert(source.includes("recordParticipantClassification")&&source.includes("ANBU_INSTITUTIONAL_CUSTODY")&&source.includes("UCHIHA_POLICE_INSTITUTIONAL_CUSTODY"),"immediate custody must commit canonical participant classification");
assert(source.includes("TERMINAL.enterCanonicalReceipt()"),"immediate custody must hand off to canonical 35100 Receipt");
assert(!source.includes('document.body.appendChild(node)'),"stale route-local immediate-custody Receipt renderer remains active");
assert(source.includes("sc-live-state-callout-33900")&&source.includes("RECOVERED · HIDDEN OPERATION"),"custody office package truth must use the persistent Live State Callout");
assert(source.includes('card(MINATO,"MINATO","Assets/Kage/kage_minato.png","HOKAGE"'),"Minato nameplate must remain actor-local rather than carrying package state");

const terminalSource=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-terminal-debrief-35100.js"),"utf8");
assert(terminalSource.includes("kakashiScene06W2DCustodyOccurrenceId"),"terminal package-state adapter missing W2D custody source");
assert(terminalSource.includes("kakashiScene06W2ECustodyOccurrenceId"),"terminal package-state adapter missing W2E custody source");

assert(saves>0,"custody runtime never persisted state");
console.log("Academy Kakashi immediate custody 35800 QA: PASS");
console.log("- W2D immediate ANBU custody reaches handoff, hidden office and canonical 35100 Chronicle Receipt");
console.log("- W2E Police custody reaches Police handoff, bounded ANBU report, MI-absent hidden office and canonical 35100 Chronicle Receipt");
console.log("- immediate transfer closes PS/AMT pursuit and does not create Pakkun");
console.log("- Police custody remains Police custody; hidden operation Knowledge remains unavailable to Kakashi");
console.log("- approved Police backdrop and route-specific approved Police card pairing are present");
console.log("- dialogue geometry is exclusively owned by canonical 33910; custody route retains actor/card staging only");
