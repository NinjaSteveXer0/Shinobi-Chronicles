#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const path=require("path");
const assert=require("assert");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}
function choice(choiceId,label,nextBeatId){return{choiceId,label,nextBeatId,availability:()=>({available:true,knownBlocker:null}),knownBlocker:null,consequenceRequests:[]};}

const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const major={beatId:"kak_original_major_choice",mode:"choice",environmentRef:{assetId:"kakashi_origin_sakura_tree_night"},text:"",choices:[
  choice("stop_assassin","STOP THE ASSASSIN","kak_original_major_choice"),
  choice("secure_package","SECURE THE PACKAGE","kak_original_major_choice"),
  choice("secure_package_before_assassin","SECURE THE PACKAGE BEFORE THE ASSASSIN","kak_original_major_choice"),
  choice("defeat_assassin_then_secure","DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE","kak_original_major_choice"),
  choice("go_after_original_target","GO AFTER THE ORIGINAL TARGET","kak_original_major_choice")
],onEnterConsequences:[]};
const definition={sceneId:SCENE_ID,beatMap:new Map([[major.beatId,major]])};
const active={sceneId:SCENE_ID,instanceId:"qa-scene04a",beatId:major.beatId,localContext:{kakashiObserveScene03AOccurrenceId:"occ_scene03a_committed"},committedChoiceKeys:[]};
let saves=0,renders=0,launchSpec=null,storyBattleLaunchCount=0;
const backdropPaths={};

globalThis.playerData={};
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>{renders+=1;return true;};
globalThis.registerSceneBackdropAssetPath=(id,p)=>{backdropPaths[id]=p;return true;};
globalThis.getSceneBackdropAssetPath=id=>backdropPaths[id]||null;
globalThis.advanceStoryScene=function baseAdvance(choiceId=null){
  const beat=definition.beatMap.get(active.beatId);if(!beat)return{success:false,reason:"qa_beat_missing"};
  if(beat.mode==="choice"){
    const row=beat.choices.find(x=>x.choiceId===choiceId);if(!row)return{success:false,reason:"qa_choice_missing"};
    for(const req of row.consequenceRequests||[]){const result=req.resolve();if(!result||result.success!==true)return result||{success:false,reason:"qa_choice_consequence_failed"};}
    active.beatId=row.nextBeatId;return{success:true,beatId:active.beatId};
  }
  if(beat.mode==="narration"){
    if(!beat.nextBeatId)return{success:false,reason:"qa_no_next"};active.beatId=beat.nextBeatId;return{success:true,beatId:active.beatId};
  }
  return{success:false,reason:"qa_base_advance_not_supported",mode:beat.mode};
};
globalThis.launchAcademyKakashiOriginPlBattle=spec=>{launchSpec=spec;return{success:true,battleId:"qa-battle",encounterId:spec.battleConfigId};};
globalThis.launchStorySceneBattle=()=>{
  storyBattleLaunchCount+=1;
  const beat=definition.beatMap.get(active.beatId);
  if(!beat||beat.mode!=="battle_transition"||!beat.battle)return{success:false,reason:"qa_not_battle_transition"};
  const returnContext={type:"story_scene",sceneId:SCENE_ID,sceneInstanceId:active.instanceId,sourceBeatId:beat.beatId,postBattleBeatId:beat.battle.postBattleBeatId};
  const launched=beat.battle.launchResolver({active:{...active,localContext:{...active.localContext}},returnContext});
  if(!launched||launched.success!==true)return launched||{success:false,reason:"qa_launch_failed"};
  active.pendingBattle={battleId:launched.battleId,encounterId:launched.encounterId,postBattleBeatId:beat.battle.postBattleBeatId};
  return{success:true,type:"battle_transition",battleId:launched.battleId,encounterId:launched.encounterId};
};
globalThis.projectAcademyKakashiOriginBattleResult=()=>({battleConfigId:"academy_kakashi_origin_battle_mi_1v1",battleOccurrenceId:"qa-battle-occ",storyOccurrenceId:active.instanceId,sourceAnchorRef:"AK_SA_019",bindingRef:"academy_kakashi.battle.stop_assassin",resultState:"player_side_victory",participants:[{participantRef:"academy_kakashi",battleStatus:"active",lifeState:"unresolved",custodyState:"unresolved"},{participantRef:"academy_kakashi_origin_masked_interceptor",battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}],packageCustodyDelta:"none",participantDeathCommitted:false,participantCustodyCommitted:false,storyObjectiveCommitted:false});

globalThis.SC_ALPHA_ORIGIN_32900={};
load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-kakashi-final-origin-adapter-34100-core.js");
globalThis.SC_ALPHA_KAKASHI_SCENE03A_35700={patchId:"qa-scene03a"};

const opened=globalThis.SC_ALPHA_KAKASHI_FINAL_34100.openDecisionPoint("OBSERVE_ESCALATION",{committedStateRef:"occ_scene03a_committed",beatRef:"kak_original_major_choice",sourceOccurrenceRefs:["occ_scene03a_committed"]});
assert.strictEqual(opened.success,true,`Observe escalation choice set failed: ${JSON.stringify(opened)}`);
active.localContext.kakashiObserveEscalationChoiceSetId=opened.choiceSet.choiceSetId;

load("runtime/alpha-kakashi-scene04a-35710.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_SCENE04A_35710;
assert(MOD,"Scene 04A module missing");
const diag=globalThis.runAcademyKakashiScene04A35710Diagnostics();
assert.strictEqual(diag.pass,true,`Scene 04A diagnostics failed: ${JSON.stringify(diag.failed)}`);
assert.strictEqual(MOD.authority,"64966fb33590d09e7ae16a33d51d0e7262b5891d");
assert.strictEqual(MOD.cueCount,14);
assert.strictEqual(MOD.battleConfigId,"academy_kakashi_origin_battle_mi_1v1");
assert.strictEqual(MOD.bindingRef,"academy_kakashi.battle.stop_assassin");
assert.strictEqual(MOD.sourceAnchorRef,"AK_SA_019");
assert.strictEqual(MOD.fightBackdropId,"kakashi_origin_fight_at_sakura_tree");
assert.strictEqual(MOD.fightBackdropPath,"Kakashi Origin Backdrop/fight_at_sakura_tree.png");
assert.strictEqual(backdropPaths.kakashi_origin_fight_at_sakura_tree,"Kakashi Origin Backdrop/fight_at_sakura_tree.png");

const stop=major.choices.find(row=>row.choiceId==="stop_assassin");
assert.strictEqual(stop.nextBeatId,"kak_scene04a_stop_assassin");
assert(stop.consequenceRequests.some(row=>row.requestId==="kakashi_scene04a_stop_assassin_intent_35710"));
const selected=globalThis.advanceStoryScene("stop_assassin");
assert.strictEqual(selected.success,true,`STOP THE ASSASSIN selection failed: ${JSON.stringify(selected)}`);
assert.strictEqual(active.beatId,"kak_scene04a_stop_assassin");
assert(active.localContext.kakashiScene04AStoryDecisionReceiptId,"Scene 04A Story receipt missing before Battle");
let semantic=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
let receipt=semantic.decisionReceipts[active.localContext.kakashiScene04AStoryDecisionReceiptId];
assert(receipt&&receipt.status==="intent_committed","Stop Assassin intent must commit before Battle result");
assert.strictEqual(receipt.resolverBindingRef,"academy_kakashi.battle.stop_assassin");

const sceneBeat=definition.beatMap.get("kak_scene04a_stop_assassin");
const battleBeat=definition.beatMap.get("kak_scene04a_stop_assassin_battle");
const returnBeat=definition.beatMap.get("kak_scene04a_stop_assassin_return");
for(const beat of [sceneBeat,battleBeat,returnBeat])assert.strictEqual(beat.environmentRef.assetId,"kakashi_origin_fight_at_sakura_tree","Scene 04A family must use fight_at_sakura_tree backdrop");

const exact=["Kakashi moves.","Not toward ANBU Marked Target.","Not toward the package.","Toward Masked Interceptor.","She is already closing on Package Smuggler when Kakashi drops between them.","Package Smuggler sees the opening immediately.","He turns and runs.","The package goes with him.","Kakashi does not follow.","Masked Interceptor changes direction without hesitation.","Her attention settles on Kakashi.","He has made himself the obstacle now.","She comes straight through him.","Kakashi meets her head-on."];
for(let i=0;i<exact.length;i++){
  const p=globalThis.getStoryScenePerformance33900();assert(p,`Scene 04A performance missing at ${i}`);assert.strictEqual(p.index,i);assert.strictEqual(p.cue.text,exact[i]);assert.strictEqual(p.cue.kind,"narration");
  if(i<exact.length-1){const advanced=globalThis.advanceStoryScene();assert.strictEqual(advanced.success,true);assert.strictEqual(active.beatId,"kak_scene04a_stop_assassin");}
}
const launched=globalThis.advanceStoryScene();
assert.strictEqual(launched.success,true,`Final Scene 04A cue did not launch Battle: ${JSON.stringify(launched)}`);
assert.strictEqual(launched.autoLaunchedFromScene04A,true,"Scene 04A final cue must auto-launch canonical Story Battle");
assert.strictEqual(active.beatId,"kak_scene04a_stop_assassin_battle");
assert.strictEqual(storyBattleLaunchCount,1,"Scene 04A should call the generic Story Battle launcher exactly once");
assert(launchSpec,"Scene 04A Battle launch spec missing");
assert.strictEqual(launchSpec.sourceAnchorRef,"AK_SA_019");assert.strictEqual(launchSpec.bindingRef,"academy_kakashi.battle.stop_assassin");assert.strictEqual(launchSpec.battleConfigId,"academy_kakashi_origin_battle_mi_1v1");assert.strictEqual(launchSpec.pakkunAuthorized,false);
assert.strictEqual(battleBeat.text,"PL BATTLE: Kakashi Hatake vs Masked Interceptor");

active.beatId="kak_scene04a_stop_assassin_return";
active.pendingBattle=null;
active.battleResume={authored:globalThis.projectAcademyKakashiOriginBattleResult()};
const consumed=returnBeat.onEnterConsequences[0].resolve();assert.strictEqual(consumed.success,true,`Scene 04A Battle return failed: ${JSON.stringify(consumed)}`);
semantic=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");receipt=semantic.decisionReceipts[active.localContext.kakashiScene04AStoryDecisionReceiptId];
assert(receipt&&receipt.status==="resolved","Scene 04A semantic receipt did not resolve from factual Battle result");
assert.strictEqual(receipt.resolverResultRef,"qa-battle-occ");
assert.strictEqual(receipt.successorSituationRef,"academy_kakashi.scene04a.stop_assassin_battle_return");
assert.strictEqual(active.localContext.kakashiScene04ABattleResultState,"player_side_victory");
assert.strictEqual(active.localContext.kakashiScene04ABattleOccurrenceId,"qa-battle-occ");
assert(saves>0,"Scene 04A never persisted runtime state");

const scene04Source=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-scene04a-35710.js"),"utf8");
assert(scene04Source.includes("kakashiMiEnterRightward35710"),"MI directional arrival animation missing");
assert(scene04Source.includes("present actors stay vivid")&&scene04Source.includes("opacity:1!important;filter:none!important"),"Scene 04A live actors must not inherit generic greyed non-focus presentation");
assert(scene04Source.includes('index===0')&&scene04Source.includes("sc-kakashi-state-exit-left-35710")&&scene04Source.includes('index===3&&isNarration?"sc-kakashi-mi-enter-rightward-35710"')&&scene04Source.includes('index===6&&isNarration?"sc-kakashi-state-exit-right-35710"'),"Scene 04A choreography must remain AMT out -> MI in -> PS out");
assert(scene04Source.includes("kakashi-blocks-line"),"Kakashi blocking-line staging missing");
assert(scene04Source.includes('name.textContent="NARRATION"'),"narration quick-read label missing");
console.log("Academy Kakashi Scene 04A 35710 QA: PASS");
console.log("- exact 14 narration cues / no dialogue / no authored choices");
console.log("- fight_at_sakura_tree backdrop bound before and after PL Battle");
console.log("- STOP THE ASSASSIN intent commits before Battle");
console.log("- final narration cue auto-launches canonical Story PL Battle");
console.log("- exact PL Battle: Kakashi vs Masked Interceptor, 1-v-1");
console.log("- config academy_kakashi_origin_battle_mi_1v1 / AK_SA_019 / no Pakkun");
console.log("- factual Battle return resolves semantic receipt without death/custody/package inference");
