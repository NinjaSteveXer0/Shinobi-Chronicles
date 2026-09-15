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
function resolveStorySceneEnvironmentProjection(){return{mode:"inherit_current",asset_id:null,asset_path:null,location_id:null,world_identity_unchanged:true};}
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
  registerSceneBackdropAssetPath,getSceneBackdropAssetPath,resolveStorySceneEnvironmentProjection,renderStoryScenePresentationLayer};
context.globalThis=context;context.window=context;
vm.createContext(context);
function load(rel){vm.runInContext(fs.readFileSync(path.join(process.cwd(),rel),"utf8"),context,{filename:rel});}
function read(rel){return fs.readFileSync(path.join(process.cwd(),rel),"utf8");}
function assert(name,value,details=null){if(!value)throw new Error(`${name}: ${JSON.stringify(details)}`);console.log(`PASS ${name}`);}
function projection(beatId,ctx={}){active.beatId=beatId;active.localContext={...ctx};return context.resolveStorySceneBoardProjection(active.sceneId,beatId,active);}
try{
  const terminalSource=read("runtime/alpha-traversal-bridge-33200.js");
  const restorationSource=read("runtime/alpha-kakashi-original-origin-restoration-33800.js");
  const sceneBoardSource=read("runtime/alpha-story-scene-board-33900.js");
  const kakashiV2Source=read("runtime/alpha-kakashi-scene-board-polish-33910.js");

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
  assert("restoration_activates_generic_board_then_kakashi_v2",
    restorationSource.includes('runtime/alpha-story-scene-board-33900.js')&&
    restorationSource.includes('runtime/alpha-kakashi-scene-board-polish-33910.js'));

  load("runtime/alpha-kakashi-original-origin-restoration-33800.js");
  const rooftopEnvironment=context.resolveStorySceneEnvironmentProjection({environmentRef:{assetId:"kakashi_origin_rooftop_night"}},null,null,active);
  const unknownEnvironment=context.resolveStorySceneEnvironmentProjection({environmentRef:{assetId:"not_a_kakashi_origin_asset"}},null,null,active);
  assert("kakashi_rooftop_resolves_dedicated_backdrop",
    rooftopEnvironment&&rooftopEnvironment.mode==="dedicated_backdrop"&&
    rooftopEnvironment.asset_id==="kakashi_origin_rooftop_night"&&
    rooftopEnvironment.asset_path==="Kakashi Origin Backdrop/rooftop_night.png"&&
    rooftopEnvironment.world_identity_unchanged===true,rooftopEnvironment);
  assert("non_kakashi_environment_delegates_to_core",unknownEnvironment&&unknownEnvironment.mode==="inherit_current",unknownEnvironment);

  load("runtime/alpha-story-scene-board-33900.js");
  const d338=context.runAlphaKakashiOriginal33800Diagnostics();
  const d339=context.runStorySceneBoard33900Diagnostics();
  assert("33800_diagnostics_green",d338.pass===true,d338);
  assert("33900_generic_bridge_diagnostics_green_before_final_consumer",d339.pass===true,d339);
  assert("scene_board_reads_exact_rooftop_backdrop",
    context.resolveStorySceneBoardBackdropPath(active)==="Kakashi Origin Backdrop/rooftop_night.png",
    context.resolveStorySceneBoardBackdropPath(active));
  assert("scene_board_neutralizes_opaque_master_shell",
    sceneBoardSource.includes('.sc-chronicle-stage.is-master-art-off{background:transparent!important;box-shadow:none!important;}'));
  assert("scene_board_mirrors_authoritative_backdrop_onto_stage",
    sceneBoardSource.includes('[data-sc-scene-board-backdrop="dedicated"]')&&sceneBoardSource.includes('var(--sc-scene-board-backdrop)'));

  // 33910 is the final Kakashi presentation consumer. Tests below deliberately
  // stop asserting the retired Rogue/Cipher/Decoy benchmark embedded in 33900.
  load("runtime/alpha-kakashi-scene-board-polish-33910.js");
  assert("kakashi_v2_exact_patch_id",kakashiV2Source.includes('kakashi_scene_board_model_v2_33910_2026_09_15'));
  assert("kakashi_v2_cards_are_pushed_apart",
    kakashiV2Source.includes('justify-content:space-between!important')&&kakashiV2Source.includes('padding:0 5.4%!important'));
  assert("kakashi_v2_diagonal_dialogue_surfaces",
    kakashiV2Source.includes('.sc-dialogue-panel-33910.is-left')&&
    kakashiV2Source.includes('.sc-dialogue-panel-33910.is-right')&&
    kakashiV2Source.includes('previousDialogue(performance)'));
  assert("kakashi_v2_compact_narration_surface",kakashiV2Source.includes('.sc-narration-panel-33910')&&kakashiV2Source.includes('width:min(66%,900px)'));
  assert("kakashi_v2_tactical_choice_deck",
    kakashiV2Source.includes('data-sc-board-ui-mode="decision"')&&
    kakashiV2Source.includes('sc-tactical-choice-33910')&&
    kakashiV2Source.includes('sc-tactical-glyph-33910')&&
    kakashiV2Source.includes('sc-tactical-intent-33910'));
  assert("kakashi_v2_hides_debug_choice_blocker_copy",
    kakashiV2Source.includes('button.textContent=""')&&kakashiV2Source.includes('locked.textContent="UNAVAILABLE"'));
  assert("kakashi_v2_exact_final_story_card_assets",
    kakashiV2Source.includes('NPC/anbu_marked_target.png')&&
    kakashiV2Source.includes('NPC/package_smuggler.png')&&
    kakashiV2Source.includes('NPC/masked_interceptor.png')&&
    !kakashiV2Source.includes('rogue_chunin.png')&&
    !kakashiV2Source.includes('cipher_handler.png')&&
    !kakashiV2Source.includes('decoy_assassin.png'));
  assert("kakashi_v2_exact_extended_backdrops",
    backdrops.get("kakashi_origin_end_of_alleyway")==="Kakashi Origin Backdrop/end_of_alleyway.png"&&
    backdrops.get("kakashi_origin_pakkun_interception_alley")==="Kakashi Origin Backdrop/alleyway_konoha_night.png",[...backdrops]);
  assert("kakashi_v2_transition_mutates_under_full_cover",
    kakashiV2Source.includes('mutateCovered')&&kakashiV2Source.includes('transitionend')&&kakashiV2Source.includes('sc-kakashi-wipe-33910'));

  // Live rooftop is one performance beat. Exercise the actual root performance
  // cursor rather than the retired intermediate semantic beat projection.
  const roof=projection("kak_original_rooftop",{
    __storyPerformanceCursor33900:{beatId:"kak_original_rooftop",index:2}
  });
  assert("rooftop_performance_has_character_card_and_anbu_assets",
    roof.actors.some(a=>a.image==="Assets/Academy Student/academy_kakashi.png")&&
    roof.actors.some(a=>a.image==="NPC/konoha_anbu.png"),roof);
  assert("conversation_focuses_current_speaker",
    roof.mode==="conversation"&&roof.actors.find(a=>a.label==="ANBU OPERATIVE").focus===true,roof);

  const action=projection("kak_original_action");
  assert("choice_stages_final_exchange_participants",
    action.mode==="encounter"&&action.actors.length===3&&
    action.actors.some(a=>a.label==="ANBU MARKED TARGET"&&a.image==="NPC/anbu_marked_target.png")&&
    action.actors.some(a=>a.label==="PACKAGE SMUGGLER"&&a.image==="NPC/package_smuggler.png")&&
    action.objects.some(x=>x.state==="EXCHANGE IN PROGRESS"),action);

  const transfer=projection("kak_original_transfer",{
    kakashiOriginalAction:"observe",
    __storyPerformanceCursor33900:{beatId:"kak_original_transfer",index:2}
  });
  assert("masked_interceptor_enters_after_package_smuggler_receives_package",
    transfer.actors.some(a=>a.label==="MASKED INTERCEPTOR"&&a.state==="VISIBLE"&&a.entering===true)&&
    transfer.actors.some(a=>a.label==="ANBU MARKED TARGET"&&a.state==="LEAVING")&&
    transfer.objects.some(x=>x.state==="PACKAGE SMUGGLER HAS PACKAGE"),transfer);

  const scene=scenes.get(active.sceneId);
  assert("story_beat_backdrop_sequence_base_exact",
    scene.beatMap.get("kak_original_rooftop").environmentRef.assetId==="kakashi_origin_rooftop_night"&&
    scene.beatMap.get("kak_original_tail").environmentRef.assetId==="kakashi_origin_konoha_alleyway"&&
    scene.beatMap.get("kak_original_transfer").environmentRef.assetId==="kakashi_origin_sakura_tree_night",
    scene.beats.map(b=>({beatId:b.beatId,environmentRef:b.environmentRef||null})));

  const major=scene.beatMap.get("kak_original_major_choice");
  assert("legacy_battle_stubs_remain_fail_closed_until_final_runtime_rebind",
    major.choices.find(c=>c.choiceId==="fight_assassin").availability().available===false&&
    major.choices.find(c=>c.choiceId==="defeat_assassin_then_recover").availability().available===false);

  active.localContext={kakashiOriginalAction:"attack",kakashiRetrievalChoice:"secure_package"};
  active.beatId="kak_original_secured";
  const securedBeat=scene.beatMap.get(active.beatId),receipt=securedBeat.onEnterConsequences[0].resolve();
  assert("secure_choice_commits_existing_exact_occurrence",
    receipt.success===true&&receipt.record.sourceOccurrenceId==="occ_origin_kakashi_anbu_retrieval_resolution"&&receipt.record.fact.packageDisposition==="secured",receipt);
  const secured=projection("kak_original_secured",active.localContext);
  assert("committed_fact_is_visibly_projected",
    secured.committed===true&&secured.objects.some(x=>x.state==="SECURED BY KAKASHI")&&secured.reaction.includes("PACKAGE CUSTODY SECURED"),secured);
  assert("source_occurrence_not_derived_or_renamed",history.length===1&&history[0].sourceOccurrenceId==="occ_origin_kakashi_anbu_retrieval_resolution",history);
  assert("browser_golden_not_claimed",
    d338.browserGoldenClaimed===false&&d339.browserGoldenClaimed===false&&
    context.SC_KAKASHI_SCENE_BOARD_POLISH_33910.browserGoldenClaimed===false);

  console.log(JSON.stringify({pass:true,kind:"kakashi_scene_board_v2_final_actor_and_presentation_contract",browserGoldenClaimed:false},null,2));
}catch(error){console.error(error&&error.stack||error);process.exit(1);}
