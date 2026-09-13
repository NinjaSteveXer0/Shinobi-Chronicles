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
function getSceneBackdropAssetPath(id){return backdrops.get(id)||null;}
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
  registerStoryScene,unregisterStoryScene,getStorySceneDefinition,getActiveStorySceneRuntime,
  registerSceneBackdropAssetPath,getSceneBackdropAssetPath,renderStoryScenePresentationLayer};
context.globalThis=context;context.window=context;
vm.createContext(context);
function load(rel){vm.runInContext(fs.readFileSync(path.join(process.cwd(),rel),"utf8"),context,{filename:rel});}
function read(rel){return fs.readFileSync(path.join(process.cwd(),rel),"utf8");}
function assert(name,value,details=null){if(!value)throw new Error(`${name}: ${JSON.stringify(details)}`);console.log(`PASS ${name}`);}
function projection(beatId,ctx={}){active.beatId=beatId;active.localContext={...ctx};return context.resolveStorySceneBoardProjection(active.sceneId,beatId,active);}
try{
  const terminalSource=read("runtime/alpha-traversal-bridge-33200.js");
  const restorationSource=read("runtime/alpha-kakashi-original-origin-restoration-33800.js");
  assert("production_terminal_chain_references_336_337_338",
    terminalSource.includes('runtime/alpha-early-story-modernization-33600.js')&&
    terminalSource.includes('runtime/alpha-origin-screen-first-33700.js')&&
    terminalSource.includes('runtime/alpha-kakashi-original-origin-restoration-33800.js'));
  assert("production_337_waits_for_336",
    terminalSource.includes('if(globalThis.SC_ALPHA_EARLY_STORY_MODERNIZATION_33600){load33700();return;}')&&
    terminalSource.includes('prior.addEventListener("load",load33700,{once:true})'));
  assert("production_338_waits_for_337",
    terminalSource.includes('if(globalThis.SC_ALPHA_ORIGIN_SCREEN_FIRST_33700){load33800();return;}')&&
    terminalSource.includes('script.addEventListener("load",load33800,{once:true})'));
  assert("restoration_activates_33900",restorationSource.includes('runtime/alpha-story-scene-board-33900.js'),null);

  load("runtime/alpha-kakashi-original-origin-restoration-33800.js");
  load("runtime/alpha-story-scene-board-33900.js");
  const d338=context.runAlphaKakashiOriginal33800Diagnostics();
  const d339=context.runStorySceneBoard33900Diagnostics();
  assert("33800_diagnostics_green",d338.pass===true,d338);
  assert("33900_diagnostics_green",d339.pass===true,d339);
  assert("kakashi_rooftop_backdrop_exact",backdrops.get("kakashi_origin_rooftop_night")==="Kakashi Origin Backdrop/rooftop_night.png",[...backdrops]);
  assert("kakashi_alley_backdrop_exact",backdrops.get("kakashi_origin_konoha_alleyway")==="Kakashi Origin Backdrop/konoha_alleyway.png",[...backdrops]);
  assert("kakashi_sakura_backdrop_exact",backdrops.get("kakashi_origin_sakura_tree_night")==="Kakashi Origin Backdrop/sakura_tree_night.png",[...backdrops]);

  const scene=scenes.get(active.sceneId);
  assert("story_beat_backdrop_sequence_exact",
    scene.beatMap.get("kak_original_rooftop").environmentRef.assetId==="kakashi_origin_rooftop_night"&&
    scene.beatMap.get("kak_original_tail").environmentRef.assetId==="kakashi_origin_konoha_alleyway"&&
    scene.beatMap.get("kak_original_transfer").environmentRef.assetId==="kakashi_origin_sakura_tree_night",
    scene.beats.map(b=>({beatId:b.beatId,environmentRef:b.environmentRef||null})));

  const roof=projection("kak_original_anbu");
  assert("rooftop_has_exact_two_stage_assets",roof.actors.some(a=>a.image==="Portraits/Academy Student/academy_student_kakashi.png")&&roof.actors.some(a=>a.image==="NPC/konoha_anbu.png"),roof);
  assert("conversation_focuses_current_speaker",roof.mode==="conversation"&&roof.actors.find(a=>a.label==="ANBU OPERATIVE").focus===true,roof);

  const action=projection("kak_original_action");
  assert("choice_is_staged_encounter_not_text_only",action.mode==="encounter"&&action.actors.length===3&&action.objects.some(x=>x.state==="EXCHANGE IN PROGRESS"),action);
  const transfer=projection("kak_original_transfer",{kakashiOriginalAction:"attack"});
  assert("player_action_changes_visible_scene_state",transfer.reaction==="BOTH MEN REACT EARLY"&&transfer.objects.some(x=>x.state==="SECOND MAN HAS PACKAGE"),transfer);

  const major=scene.beatMap.get("kak_original_major_choice");
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

  console.log(JSON.stringify({pass:true,kind:"kakashi_story_scene_board_benchmark_with_production_activation",browserGoldenClaimed:false},null,2));
}catch(error){console.error(error&&error.stack||error);process.exit(1);}
