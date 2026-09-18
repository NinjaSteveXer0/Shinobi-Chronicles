#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const path=require("path");
const assert=require("assert");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const RETURN_BEAT="kak_scene04a_stop_assassin_return";
const WIN_BEAT="kak_scene05a_w_victory";
const CHOICE_BEAT="kak_scene05a_w_choice";
const MI="academy_kakashi_origin_masked_interceptor";
const BATTLE_CONFIG="academy_kakashi_origin_battle_mi_1v1";
const BINDING="academy_kakashi.battle.stop_assassin";
const SOURCE_ANCHOR="AK_SA_019";

const returnBeat={beatId:RETURN_BEAT,mode:"post_battle",environmentRef:{assetId:"kakashi_origin_fight_at_sakura_tree"},text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,onEnterConsequences:[{requestId:"kakashi_scene04a_stop_assassin_return_35710",kind:"domain",resolve:()=>({success:true})}],choices:[]};
const definition={sceneId:SCENE_ID,beatMap:new Map([[RETURN_BEAT,returnBeat]])};
const active={sceneId:SCENE_ID,instanceId:"qa-scene05aw",beatId:RETURN_BEAT,localContext:{kakashiScene04ABattleIntentResolved:true},battleResume:{authored:null}};
let saves=0,renders=0;
globalThis.playerData={};
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>{renders+=1;return true;};
globalThis.advanceStoryScene=function baseAdvance(choiceId=null){
  const beat=definition.beatMap.get(active.beatId);
  if(!beat)return{success:false,reason:"qa_beat_missing"};
  if(beat.mode==="narration"){
    if(!beat.nextBeatId)return{success:false,reason:"qa_next_missing"};
    active.beatId=beat.nextBeatId;
    return{success:true,beatId:active.beatId};
  }
  if(beat.mode==="choice"){
    const row=(beat.choices||[]).find(x=>x&&x.choiceId===choiceId);
    if(!row)return{success:false,reason:"qa_choice_missing"};
    for(const req of row.consequenceRequests||[]){
      const out=req.resolve();
      if(!out||out.success!==true)return out||{success:false,reason:"qa_choice_consequence_failed"};
    }
    active.beatId=row.nextBeatId;
    return{success:true,beatId:active.beatId};
  }
  return{success:false,reason:"qa_mode_not_supported",mode:beat.mode};
};
globalThis.SC_ALPHA_KAKASHI_SCENE04A_35710={patchId:"qa-scene04a"};

load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-kakashi-scene05a-w-35730.js");

const MOD=globalThis.SC_ALPHA_KAKASHI_SCENE05AW_35730;
assert(MOD,"Scene 05A-W module missing");
assert.strictEqual(MOD.authority,"7dd9f248003604c15674d5e8eafb56abea029b1b");
assert.strictEqual(MOD.cueCount,17);
assert.strictEqual(MOD.objective,"Retrieve the package.");
assert.strictEqual(MOD.battleConfigId,BATTLE_CONFIG);
assert.strictEqual(MOD.bindingRef,BINDING);
assert.strictEqual(MOD.sourceAnchorRef,SOURCE_ANCHOR);

const diag=globalThis.runAcademyKakashiScene05AW35730Diagnostics();
assert.strictEqual(diag.pass,true,"Scene 05A-W diagnostics failed: "+JSON.stringify(diag.failed));

const exact=[
  "Masked Interceptor hits the stone beneath the Sakura tree.",
  "Kakashi lands a few steps away.",
  "His eye is already off her.",
  "Searching.",
  "Package Smuggler fled with the package while they fought.",
  "ANBU Marked Target went the other way.",
  "If Kakashi ended this quickly, neither trail is dead yet.",
  "He can still move.",
  "Still choose which one to follow.",
  "But every second he spends here gives both men more distance.",
  "Kakashi looks back at Masked Interceptor.",
  "She lies where he put her.",
  "The package is getting farther away.",
  "The original target is getting farther away.",
  "And the woman at Kakashi's feet is still his problem to resolve.",
  "He cannot do everything.",
  "Not anymore."
];
const entry=returnBeat.onEnterConsequences.find(x=>x&&x.requestId==="kakashi_scene05aw_victory_entry_35730");
assert(entry,"Scene 05A-W victory entry hook missing");

function battleResult(resultState,turns,opts={}){
  const custodyState=opts.custodyState||"unresolved";
  return{
    battleConfigId:BATTLE_CONFIG,battleOccurrenceId:"qa-mi-"+resultState+"-"+turns,storyOccurrenceId:active.instanceId,
    sourceAnchorRef:SOURCE_ANCHOR,bindingRef:BINDING,resultState,
    playerActionOpportunityCount:turns,
    participants:[
      {participantRef:"academy_kakashi",side:"player",battleStatus:resultState==="player_side_victory"?"active":"defeated",lifeState:"unresolved",custodyState:"unresolved"},
      {participantRef:MI,side:"opposition",battleStatus:resultState==="player_side_victory"?"defeated":"active",lifeState:"unresolved",custodyState}
    ],
    participantDeathCommitted:false,participantCustodyCommitted:false,packageCustodyDelta:"none"
  };
}

// Defeat must not enter the victory scene.
active.beatId=RETURN_BEAT;
active.localContext={kakashiScene04ABattleIntentResolved:true};
active.battleResume.authored=battleResult("opposition_side_victory",3);
let routed=entry.resolve();
assert.strictEqual(routed.success,true);
assert.strictEqual(routed.routed,false);
assert.strictEqual(active.beatId,RETURN_BEAT);

// Four-turn victory enters exact Scene 05A-W and classifies MI without inventing control.
active.beatId=RETURN_BEAT;
active.localContext={kakashiScene04ABattleIntentResolved:true};
active.battleResume.authored=battleResult("player_side_victory",4);
routed=entry.resolve();
assert.strictEqual(routed.success,true,"4-turn victory routing failed: "+JSON.stringify(routed));
assert.strictEqual(routed.routed,true);
assert.strictEqual(routed.turnCount,4);
assert.strictEqual(routed.pursuitEligible,true);
assert.strictEqual(routed.miStateClass,"DEFEATED_BUT_NOT_CONTROLLED");
assert.strictEqual(active.beatId,WIN_BEAT);

for(let i=0;i<exact.length;i++){
  const p=globalThis.getStoryScenePerformance33900();
  assert(p,"Scene 05A-W performance missing at "+i);
  assert.strictEqual(p.index,i);
  assert.strictEqual(p.cue.kind,"narration");
  assert.strictEqual(p.cue.text,exact[i]);
  assert.strictEqual(p.cue.speakerName,undefined);
  if(i<exact.length-1){
    const out=globalThis.advanceStoryScene();
    assert.strictEqual(out.success,true,"Narration advance "+i+" failed: "+JSON.stringify(out));
    assert.strictEqual(active.beatId,WIN_BEAT);
  }
}
let transitioned=globalThis.advanceStoryScene();
assert.strictEqual(transitioned.success,true);
assert.strictEqual(active.beatId,CHOICE_BEAT);

let choiceBeat=definition.beatMap.get(CHOICE_BEAT);
assert.strictEqual(choiceBeat.environmentRef.assetId,"kakashi_origin_fight_at_sakura_tree");
let labels=choiceBeat.choices.map(x=>x.label);
assert.deepStrictEqual(labels,[
  "GO AFTER PACKAGE SMUGGLER",
  "GO AFTER ANBU MARKED TARGET",
  "ATTEMPT TO KILL HER",
  "TAKE HER BACK TO ANBU",
  "TAKE HER TO THE UCHIHA POLICE FORCE"
]);
assert.strictEqual(choiceBeat.choices.length,5);
for(const row of choiceBeat.choices)assert.strictEqual(row.availability().available,true);
let blocked=globalThis.advanceStoryScene("scene05aw_go_after_package_smuggler");
assert.strictEqual(blocked.success,false);
assert.strictEqual(blocked.reason,"kakashi_scene05aw_successor_authority_not_implemented");
assert.strictEqual(active.beatId,CHOICE_BEAT,"Fail-closed successor must not move Story");

// A committed CONTROLLED_DEFEATED state switches the lethal label to deterministic KILL HER.
let classified=globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({
  storyUnitRef:"academy_kakashi",participantRef:MI,stateClass:"CONTROLLED_DEFEATED",resultRef:"qa-controlled-mi"
});
assert.strictEqual(classified.success,true);
globalThis.renderStoryScenePresentationLayer();
choiceBeat=definition.beatMap.get(CHOICE_BEAT);
labels=choiceBeat.choices.map(x=>x.label);
assert(labels.includes("KILL HER"),"Controlled MI must expose KILL HER");
assert(!labels.includes("ATTEMPT TO KILL HER"),"Controlled MI must not expose attempt wording");

// Five-turn victory removes both pursuit choices entirely, while retaining C/D/E.
classified=globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({
  storyUnitRef:"academy_kakashi",participantRef:MI,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-uncontrolled-mi"
});
assert.strictEqual(classified.success,true);
active.beatId=RETURN_BEAT;
active.localContext={kakashiScene04ABattleIntentResolved:true};
active.battleResume.authored=battleResult("player_side_victory",5);
routed=entry.resolve();
assert.strictEqual(routed.success,true);
assert.strictEqual(routed.routed,true);
assert.strictEqual(routed.pursuitEligible,false);
assert.strictEqual(routed.turnCount,5);
active.beatId=CHOICE_BEAT;
globalThis.renderStoryScenePresentationLayer();
choiceBeat=definition.beatMap.get(CHOICE_BEAT);
labels=choiceBeat.choices.map(x=>x.label);
assert.deepStrictEqual(labels,[
  "ATTEMPT TO KILL HER",
  "TAKE HER BACK TO ANBU",
  "TAKE HER TO THE UCHIHA POLICE FORCE"
]);
assert.strictEqual(choiceBeat.choices.length,3);
assert(!labels.includes("GO AFTER PACKAGE SMUGGLER"));
assert(!labels.includes("GO AFTER ANBU MARKED TARGET"));

// Exact Story constraints remain non-terminal and no automatic debrief exists.
assert.strictEqual(definition.beatMap.get(WIN_BEAT).exitScene,false);
assert.strictEqual(choiceBeat.exitScene,false);
assert.strictEqual(choiceBeat.nextBeatId,null);
assert(!JSON.stringify([definition.beatMap.get(WIN_BEAT),choiceBeat]).includes("kak_seq_debrief_pending"));
assert(saves>0,"Scene 05A-W state was never persisted");

console.log("Academy Kakashi Scene 05A-W 35730 QA: PASS");
console.log("- exact 17 locked narration cues / no dialogue");
console.log("- exact fight_at_sakura_tree backdrop / Retrieve the package objective");
console.log("- victory-only return; defeat never enters 05A-W");
console.log("- 1-4 turn win exposes both pursuits; 5+ removes both");
console.log("- MI post-resolution classification controls KILL HER vs ATTEMPT TO KILL HER");
console.log("- ANBU/Uchiha disposition choices preserved");
console.log("- successor branches fail closed; no automatic debrief or invented continuation");
