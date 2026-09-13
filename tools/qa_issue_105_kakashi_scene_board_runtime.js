#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm");
const scenes=new Map(),backdrops=new Map(),history=[];
let active={sceneId:"origin_academy_kakashi_anbu_retrieval",instanceId:"test_kakashi",beatId:"kak_original_rooftop",localContext:{}};
function clone(v){return v===undefined?undefined:JSON.parse(JSON.stringify(v));}
function registerStoryScene(def){const copy={...def,beats:(def.beats||[])};copy.beatMap=new Map(copy.beats.map(b=>[b.beatId,b]));scenes.set(copy.sceneId,copy);return{success:true,sceneId:copy.sceneId};}
function unregisterStoryScene(id){scenes.delete(id);return true;}
function getStorySceneDefinition(id){return scenes.get(id)||null;}
function getActiveStorySceneRuntime(){return active;}
function registerSceneBackdropAssetPath(id,asset){backdrops.set(id,asset);return{success:true};}
function renderStoryScenePresentationLayer(){return true;}
const A={
  sceneByVariant:{academy_kakashi:"origin_academy_kakashi_anbu_retrieval"},
  local:()=>active.localContext,
  findOccurrence:id=>history.find(row=>row.sourceOccurrenceId===id)||null,
  choice:(choiceId,label,nextBeatId,contextPatch=null,extra={})=>({choiceId,label,nextBeatId,contextPatch,...extra}),
  unavailableBattle:(_scene,label)=>()=>({available:false,knownBlocker:label}),
  commitRequest:(requestId,originId,occurrenceId,factResolver,rowIds,options)=>({requestId,kind:"domain",resolve:()=>{
    let record=history.find(row=>row.sourceOccurrenceId===occurrenceId);
    if(record)return{success:true,idempotent:true,record};
    const fact=typeof factResolver==="function"?factResolver(clone(active.localContext)):clone(factResolver||{});
    record={originId,occurrenceId,sourceOccurrenceId:occurrenceId,fact,rowIds:clone(rowIds),options:clone(options)};
    history.push(record);return{success:true,record};
  }}),
  completionRequest:(originId,evidence)=>({requestId:`complete_${originId}`,kind:"domain",resolve:()=>({success:true,originId,evidence})}),
  register:def=>registerStoryScene(def)
};
const context={console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Error,TypeError,RegExp,Date,
  globalThis:null,window:null,SC_ALPHA_ORIGIN_32900:A,cloneProgressionData:clone,
  registerStoryScene,unregisterStoryScene,getStorySceneDefinition,getActiveStorySceneRuntime,registerSceneBackdropAssetPath,
  renderStoryScenePresentationLayer};
context.globalThis=context;context.window=context;
vm.createContext(context);
function load(rel){vm.runInContext(fs.readFileSync(path.join(process.cwd(),rel),"utf8"),context,{filename:rel});}
function assert(name,value,details=null){if(!value)throw new Error(`${name}: ${JSON.stringify(details)}`);console.log(`PASS ${name}`);}
function projection(beatId,ctx={}){active.beatId=beatId;active.localContext={...ctx};return context.resolveStorySceneBoardProjection(active.sceneId,beatId,active);}
try{
  load("runtime/alpha-kakashi-original-origin-restoration-33800.js");
  load("runtime/alpha-story-scene-board-33900.js");
  const d338=context.runAlphaKakashiOriginal33800Diagnostics();
  const d339=context.runStorySceneBoard33900Diagnostics();
  assert("33800_diagnostics_green",d338.pass===true,d338);
  assert("33900_diagnostics_green",d339.pass===true,d339);
  assert("current_rooftop_binding_preserved",backdrops.get("konoha_rooftop_day")==="Scene backdrops/hokage_district_exterior.png",[...backdrops]);
  assert("current_alley_binding_preserved",backdrops.get("konoha_exchange_alley_day")==="Scene backdrops/broken_exchange_lane.png",[...backdrops]);

  const roof=projection("kak_original_anbu");
  assert("rooftop_has_exact_two_stage_assets",roof.actors.some(a=>a.image==="Portraits/Academy Student/academy_student_kakashi.png")&&roof.actors.some(a=>a.image==="NPC/konoha_anbu.png"),roof);
  assert("conversation_focuses_current_speaker",roof.mode==="conversation"&&roof.actors.find(a=>a.label==="ANBU OPERATIVE").focus===true,roof);
  assert("scene_board_does_not_invent_time_of_day",roof.location==="KONOHA ROOFTOP"&&!roof.location.includes("NIGHT")&&!roof.location.includes("DAY"),roof);

  const action=projection("kak_original_action");
  assert("choice_is_staged_encounter_not_text_only",action.mode==="encounter"&&action.actors.length===3&&action.objects.some(x=>x.state==="EXCHANGE IN PROGRESS"),action);
  const transfer=projection("kak_original_transfer",{kakashiOriginalAction:"attack"});
  assert("player_action_changes_visible_scene_state",transfer.reaction==="BOTH MEN REACT EARLY"&&transfer.objects.some(x=>x.state==="SECOND MAN HAS PACKAGE"),transfer);

  const scene=scenes.get(active.sceneId),major=scene.beatMap.get("kak_original_major_choice");
  assert("battle_branches_remain_fail_closed",major.choices.find(c=>c.choiceId==="fight_assassin").availability().available===false&&major.choices.find(c=>c.choiceId==="defeat_assassin_then_recover").availability().available===false);

  active.localContext={kakashiOriginalAction:"attack",kakashiRetrievalChoice:"secure_package"};
  active.beatId="kak_original_secured";
  const securedBeat=scene.beatMap.get(active.beatId);
  const receipt=securedBeat.onEnterConsequences[0].resolve();
  assert("secure_choice_commits_existing_exact_occurrence",receipt.success===true&&receipt.record.sourceOccurrenceId==="occ_origin_kakashi_anbu_retrieval_resolution"&&receipt.record.fact.packageDisposition==="secured",receipt);
  const secured=projection("kak_original_secured",active.localContext);
  assert("committed_fact_is_visibly_projected",secured.committed===true&&secured.objects.some(x=>x.state==="SECURED BY KAKASHI")&&secured.reaction.includes("PACKAGE CUSTODY SECURED"),secured);
  assert("source_occurrence_not_derived_or_renamed",history.length===1&&history[0].sourceOccurrenceId==="occ_origin_kakashi_anbu_retrieval_resolution",history);
  assert("browser_golden_not_claimed",d338.browserGoldenClaimed===false&&d339.browserGoldenClaimed===false);

  console.log(JSON.stringify({pass:true,kind:"kakashi_story_scene_board_benchmark",browserGoldenClaimed:false},null,2));
}catch(error){console.error(error&&error.stack||error);process.exit(1);}
