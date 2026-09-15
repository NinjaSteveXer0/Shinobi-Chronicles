// ============================================================================
// ISSUE #188 / #201 — ACADEMY KAKASHI SEQUENTIAL STORY->BATTLE CONSUMER — 34410
//
// Consumes the closed Observe -> DEAL WITH HER FIRST, THEN CHASE THE PACKAGE
// route through the existing Story/Battle return seam and Combat 34300.
//
// This is deliberately narrow:
// - enables only the exact sequential Battle choice that current Combat
//   authority fully supplies;
// - MI qualifying victory <=4 controller actions -> PS remains reachable;
// - PS qualifying victory <=3 controller actions -> AMT remains reachable;
// - reaching AMT makes temporary Pakkun presence explicit and launches the
//   authorised Kakashi+Pakkun vs AMT config;
// - Battle defeat means withdrawal/lost continuation pressure, not death;
// - Battle victory does NOT invent package custody, participant custody, death,
//   loot, rewards or Story success.
//
// Other stale 33800 choices remain fail-closed until their exact resolver or
// Combat configuration authority is supplied. No second Story/Battle engine.
// ============================================================================
(function installAcademyKakashiSequentialConsumer34410(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410)return;

const PATCH_ID="alpha_kakashi_final_sequential_consumer_34410_2026_09_15";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const SAKURA={assetId:"kakashi_origin_sakura_tree_night"};
const CONFIG=Object.freeze({
  mi:"academy_kakashi_origin_battle_seq_mi",
  ps:"academy_kakashi_origin_battle_seq_ps",
  amt:"academy_kakashi_origin_battle_seq_amt_pakkun"
});
const BINDING="academy_kakashi.battle.defeat_assassin_then_secure";

function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_e){return null;}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function latestResult(){const rt=active();return rt&&rt.sceneId===SCENE_ID&&rt.battleResume&&rt.battleResume.authored&&typeof rt.battleResume.authored==="object"?rt.battleResume.authored:null;}
function isVictory(result){return !!result&&result.resultState==="player_side_victory";}
function within(result,max){return isVictory(result)&&Number(result.playerActionOpportunityCount)<=max;}
function available(value,knownBlocker=null){return()=>({available:value===true,knownBlocker:value===true?null:knownBlocker});}
function dynamicAvailability(test,blocker){return()=>({available:test()===true,knownBlocker:test()===true?null:blocker});}
function normalizedBeat(def,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(def,index):def;}

function launchStage(stage,{active:rt,returnContext}={}){
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_sequential_story_occurrence_missing"};
  if(typeof launchAcademyKakashiOriginPlBattle!=="function")return{success:false,reason:"kakashi_combat_deployment_34300_missing"};
  const spec=stage==="mi"
    ?{anchor:"AK_SA_015",config:CONFIG.mi,pakkun:false}
    :stage==="ps"
      ?{anchor:"AK_SA_022",config:CONFIG.ps,pakkun:false}
      :stage==="amt"
        ?{anchor:"AK_SA_022",config:CONFIG.amt,pakkun:true}
        :null;
  if(!spec)return{success:false,reason:"kakashi_sequential_stage_unknown"};
  return launchAcademyKakashiOriginPlBattle({
    storyOccurrenceId:rt.instanceId,
    sourceAnchorRef:spec.anchor,
    bindingRef:BINDING,
    battleConfigId:spec.config,
    returnToken:`${rt.instanceId}:sequential:${stage}`,
    returnContext,
    pakkunAuthorized:spec.pakkun
  });
}
function projector(){return typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult():null;}

function install(){
  const def=scene();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_story_definition_missing"};
  const major=def.beatMap.get("kak_original_major_choice");
  if(!major||!Array.isArray(major.choices))return{success:false,reason:"kakashi_major_choice_missing"};
  const sequential=major.choices.find(c=>c&&c.choiceId==="defeat_assassin_then_recover");
  if(!sequential)return{success:false,reason:"kakashi_sequential_choice_missing"};

  sequential.label="DEAL WITH HER FIRST, THEN CHASE THE PACKAGE";
  sequential.nextBeatId="kak_seq_mi_battle";
  sequential.availability=available(true);
  sequential.knownBlocker=null;

  const beats=[
    {beatId:"kak_seq_mi_battle",mode:"battle_transition",environmentRef:SAKURA,
      text:"The Masked Interceptor cuts across Kakashi's line. If he wants the package trail, he has to get through her now.",
      battle:{encounterId:CONFIG.mi,launchResolver:ctx=>launchStage("mi",ctx),postBattleBeatId:"kak_seq_mi_return",resultProjector:projector,actionLabel:"CUT THROUGH THE INTERCEPTOR"}},
    {beatId:"kak_seq_mi_return",mode:"choice",environmentRef:SAKURA,
      presentationResolver:()=>{const r=latestResult();if(!r)return{text:"The confrontation has not returned a factual result."};if(!isVictory(r))return{text:"Kakashi is forced out of the confrontation. The package trail keeps moving while he withdraws."};if(within(r,4))return{text:`The Masked Interceptor is Battle-defeated in ${Number(r.playerActionOpportunityCount)||0} action opportunities. The Package Smuggler is still within reach.`};return{text:`Kakashi wins, but the fight costs ${Number(r.playerActionOpportunityCount)||0} action opportunities. The Package Smuggler has opened too much distance.`};},
      text:"The first confrontation returns to Story.",choices:[
        {choiceId:"kak_seq_chase_ps",label:"CHASE THE PACKAGE SMUGGLER",nextBeatId:"kak_seq_ps_battle",availability:dynamicAvailability(()=>within(latestResult(),4),"THE PACKAGE SMUGGLER IS NO LONGER WITHIN THE QUALIFYING WINDOW")},
        {choiceId:"kak_seq_report_after_mi",label:"RETURN AND REPORT",nextBeatId:"kak_seq_debrief_pending",availability:dynamicAvailability(()=>{const r=latestResult();return !!r&&!within(r,4);},"THE PACKAGE TRAIL IS STILL REACHABLE")}
      ]},
    {beatId:"kak_seq_ps_battle",mode:"battle_transition",environmentRef:SAKURA,
      text:"Kakashi catches the Package Smuggler before the trail closes.",
      battle:{encounterId:CONFIG.ps,launchResolver:ctx=>launchStage("ps",ctx),postBattleBeatId:"kak_seq_ps_return",resultProjector:projector,actionLabel:"STOP THE PACKAGE SMUGGLER"}},
    {beatId:"kak_seq_ps_return",mode:"choice",environmentRef:SAKURA,
      presentationResolver:()=>{const r=latestResult();if(!r)return{text:"The confrontation has not returned a factual result."};if(!isVictory(r))return{text:"Kakashi is forced to withdraw from the second confrontation. The first man keeps moving."};if(within(r,3))return{text:`The Package Smuggler is Battle-defeated in ${Number(r.playerActionOpportunityCount)||0} action opportunities. The original target is still reachable.`};return{text:`Kakashi wins, but ${Number(r.playerActionOpportunityCount)||0} action opportunities were consumed. The original target gets beyond the qualifying pursuit window.`};},
      text:"The second confrontation returns to Story.",choices:[
        {choiceId:"kak_seq_stay_amt",label:"STAY ON THE FIRST MAN",nextBeatId:"kak_seq_pakkun_arrival",availability:dynamicAvailability(()=>within(latestResult(),3),"THE ORIGINAL TARGET IS NO LONGER WITHIN THE QUALIFYING WINDOW")},
        {choiceId:"kak_seq_report_after_ps",label:"RETURN AND REPORT",nextBeatId:"kak_seq_debrief_pending",availability:dynamicAvailability(()=>{const r=latestResult();return !!r&&!within(r,3);},"THE ORIGINAL TARGET IS STILL REACHABLE")}
      ]},
    {beatId:"kak_seq_pakkun_arrival",mode:"dialogue",environmentRef:SAKURA,speakerName:"PAKKUN",
      text:"You're still on him. Move.",nextBeatId:"kak_seq_amt_battle"},
    {beatId:"kak_seq_amt_battle",mode:"battle_transition",environmentRef:SAKURA,
      text:"Kakashi and the unfamiliar ninken catch the ANBU-marked target. Pakkun is present as a temporary action source, not an owned summon.",
      battle:{encounterId:CONFIG.amt,launchResolver:ctx=>launchStage("amt",ctx),postBattleBeatId:"kak_seq_amt_return",resultProjector:projector,actionLabel:"CONFRONT THE ORIGINAL TARGET"}},
    {beatId:"kak_seq_amt_return",mode:"narration",environmentRef:SAKURA,
      presentationResolver:()=>{const r=latestResult();if(!r)return{text:"The final confrontation has not returned a factual result."};return isVictory(r)?{text:"The original target is Battle-defeated. His life, custody and the package remain separate Story facts; the Battle does not decide them automatically."}:{text:"Kakashi is forced to withdraw from the final confrontation. Battle defeat does not mean injury or death, and no custody or package result is invented."};},
      text:"The final confrontation returns to Story.",nextBeatId:"kak_seq_debrief_pending"},
    {beatId:"kak_seq_debrief_pending",mode:"narration",environmentRef:SAKURA,
      text:"Kakashi turns back toward the ANBU rendezvous. The factual debrief must consume the Battle ledger and separately resolved package and participant states before the Origin can close.",exitScene:false,allowPresentationClose:false}
  ];
  beats.forEach((b,i)=>{const n=normalizedBeat(b,900+i);if(n)def.beatMap.set(n.beatId,n);});
  return{success:true,beatIds:beats.map(b=>b.beatId),choiceId:sequential.choiceId};
}

function diagnostics(){
  const def=scene(),major=def&&def.beatMap instanceof Map?def.beatMap.get("kak_original_major_choice"):null;
  const c=major&&Array.isArray(major.choices)?major.choices.find(x=>x&&x.choiceId==="defeat_assassin_then_recover"):null;
  const ids=def&&def.beatMap instanceof Map?[...def.beatMap.keys()]:[];
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_final_sequential_consumer_34410_2026_09_15",
    exactChoiceEnabled:!!c&&c.nextBeatId==="kak_seq_mi_battle"&&typeof c.availability==="function"&&c.availability().available===true,
    exactThreeConfigs:[CONFIG.mi,CONFIG.ps,CONFIG.amt].every(Boolean),
    allInserted:["kak_seq_mi_battle","kak_seq_mi_return","kak_seq_ps_battle","kak_seq_ps_return","kak_seq_pakkun_arrival","kak_seq_amt_battle","kak_seq_amt_return","kak_seq_debrief_pending"].every(id=>ids.includes(id)),
    miGate4:within({resultState:"player_side_victory",playerActionOpportunityCount:4},4)&&!within({resultState:"player_side_victory",playerActionOpportunityCount:5},4),
    psGate3:within({resultState:"player_side_victory",playerActionOpportunityCount:3},3)&&!within({resultState:"player_side_victory",playerActionOpportunityCount:4},3),
    noTerminalFalseCommit:!JSON.stringify([...(def&&def.beatMap instanceof Map?def.beatMap.values():[]).filter(b=>String(b.beatId||"").startsWith("kak_seq_")).map(b=>({id:b.beatId,exit:b.exitScene,onEnter:b.onEnterConsequences}))]).includes("completeChronicleOriginPrologue"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const installed=install();
globalThis.runAcademyKakashiSequentialConsumer34410Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410=Object.freeze({patchId:PATCH_ID,installed,configs:CONFIG,browserGoldenClaimed:false});
})();
