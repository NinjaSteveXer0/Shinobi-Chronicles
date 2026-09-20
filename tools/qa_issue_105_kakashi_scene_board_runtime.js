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
  sceneByVariant:{academy_kakashi:"origin_academy_kakashi_anbu_retrieval"},local:()=>active.localContext,
  findOccurrence:id=>history.find(row=>row.sourceOccurrenceId===id)||null,
  choice:(choiceId,label,nextBeatId,contextPatch=null,extra={})=>({choiceId,label,nextBeatId,contextPatch,...extra}),
  unavailableBattle:(_scene,label)=>()=>({available:false,knownBlocker:label}),
  commitRequest:(requestId,originId,occurrenceId,factResolver,rowIds,options)=>({requestId,kind:"domain",resolve:()=>{let record=history.find(row=>row.sourceOccurrenceId===occurrenceId);if(record)return{success:true,idempotent:true,record};const fact=typeof factResolver==="function"?factResolver(clone(active.localContext)):clone(factResolver||{});record={originId,occurrenceId,sourceOccurrenceId:occurrenceId,fact,rowIds:clone(rowIds),options:clone(options)};history.push(record);return{success:true,record};}}),
  completionRequest:(originId,evidence)=>({requestId:`complete_${originId}`,kind:"domain",resolve:()=>({success:true,originId,evidence})}),register:def=>registerStoryScene(def)
};
const context={console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Error,TypeError,RegExp,Date,globalThis:null,window:null,SC_ALPHA_ORIGIN_32900:A,cloneProgressionData:clone,registerStoryScene,unregisterStoryScene,getStorySceneDefinition,getActiveStorySceneRuntime,registerSceneBackdropAssetPath,getSceneBackdropAssetPath,resolveStorySceneEnvironmentProjection,renderStoryScenePresentationLayer};
context.globalThis=context;context.window=context;vm.createContext(context);
function load(rel){vm.runInContext(fs.readFileSync(path.join(process.cwd(),rel),"utf8"),context,{filename:rel});}
function read(rel){return fs.readFileSync(path.join(process.cwd(),rel),"utf8");}
function assert(name,value,details=null){if(!value)throw new Error(`${name}: ${JSON.stringify(details)}`);console.log(`PASS ${name}`);}
function projection(beatId,ctx={}){active.beatId=beatId;active.localContext={...ctx};return context.resolveStorySceneBoardProjection(active.sceneId,beatId,active);}
try{
  const terminalSource=read("runtime/alpha-traversal-bridge-33200.js");
  const restorationSource=read("runtime/alpha-kakashi-original-origin-restoration-33800.js");
  const sceneBoardSource=read("runtime/alpha-story-scene-board-33900.js");
  const kakashiV4Source=read("runtime/alpha-kakashi-scene-board-polish-33910.js");

  assert("production_terminal_chain_references_336_337_338",terminalSource.includes('runtime/alpha-early-story-modernization-33600.js')&&terminalSource.includes('runtime/alpha-origin-screen-first-33700.js')&&terminalSource.includes('runtime/alpha-kakashi-original-origin-restoration-33800.js'));
  assert("scene_board_delivery_generation_coherent",terminalSource.includes('const SCENE_BOARD_BUILD="scene-board-20260919-11";')&&restorationSource.includes('const BUILD="scene-board-20260919-11";'));
  assert("restoration_activates_generic_board_then_kakashi_v4",restorationSource.includes('runtime/alpha-story-scene-board-33900.js')&&restorationSource.includes('runtime/alpha-kakashi-scene-board-polish-33910.js'));
  assert("scene_board_quick_read_labels_inside_panel",sceneBoardSource.includes("speakerLabel")&&sceneBoardSource.includes('cue.speakerName||cue.speaker')&&sceneBoardSource.includes('panel.contains(name)')&&sceneBoardSource.includes('"NARRATION"'));
  assert("scene_board_overlay_reads_w2c_speaker_field",kakashiV4Source.includes("cueSpeaker33910")&&kakashiV4Source.includes("cue.speakerName||cue.speaker")&&kakashiV4Source.includes("panel.dataset.speakerId=speakerId")&&kakashiV4Source.includes('key==="MINATO"'));

  load("runtime/alpha-kakashi-original-origin-restoration-33800.js");
  const rooftopEnvironment=context.resolveStorySceneEnvironmentProjection({environmentRef:{assetId:"kakashi_origin_rooftop_night"}},null,null,active);
  assert("kakashi_rooftop_resolves_dedicated_backdrop",rooftopEnvironment&&rooftopEnvironment.mode==="dedicated_backdrop"&&rooftopEnvironment.asset_path==="Kakashi Origin Backdrop/rooftop_night.png",rooftopEnvironment);
  load("runtime/alpha-story-scene-board-33900.js");
  const d338=context.runAlphaKakashiOriginal33800Diagnostics();
  const d339=context.runStorySceneBoard33900Diagnostics();
  assert("33800_diagnostics_green",d338.pass===true,d338);
  assert("33900_generic_bridge_diagnostics_green_before_final_consumer",d339.pass===true,d339);
  assert("scene_board_reads_exact_rooftop_backdrop",context.resolveStorySceneBoardBackdropPath(active)==="Kakashi Origin Backdrop/rooftop_night.png",context.resolveStorySceneBoardBackdropPath(active));
  assert("scene_board_neutralizes_opaque_master_shell",sceneBoardSource.includes('.sc-chronicle-stage.is-master-art-off{background:transparent!important;box-shadow:none!important;}'));
  assert("live_state_callout_is_compact_content_sized_hud",sceneBoardSource.includes(".sc-scene-board-33900__objects{position:absolute;left:3.2%;right:auto")&&sceneBoardSource.includes("width:max-content;max-width:min(31%,390px)")&&sceneBoardSource.includes("height:auto!important;min-height:0!important;max-height:none!important")&&sceneBoardSource.includes("align-items:flex-start")&&sceneBoardSource.includes(".sc-scene-board-33900__object{position:relative;display:inline-block"));

  load("runtime/alpha-kakashi-scene-board-polish-33910.js");
  const d33910=context.runKakashiSceneBoardPolish33910Diagnostics();
  assert("kakashi_v4_diagnostics_green",d33910.pass===true,d33910);
  assert("kakashi_v12_exact_patch_id",kakashiV4Source.includes('kakashi_scene_board_model_v12_33910_2026_09_20'));
  assert("terminal_report_stages_anbu",kakashiV4Source.includes('kak_seq_debrief_pending')&&kakashiV4Source.includes('terminalReportProjection33910')&&kakashiV4Source.includes('konoha_anbu_contact'));
  assert("terminal_hokage_scene_staged",kakashiV4Source.includes('kak_terminal_minato_private_evaluation_35100')&&kakashiV4Source.includes('Assets/Kage/kage_minato.png')&&kakashiV4Source.includes('Kakashi Origin Backdrop/hokage_administration_interior_night.png')&&kakashiV4Source.includes('HOKAGE ADMINISTRATION · NIGHT'));
  assert("terminal_minato_performance_bridge",kakashiV4Source.includes("terminalMinatoPerformance33910")&&kakashiV4Source.includes("SC_ALPHA_KAKASHI_DYNAMIC_TERMINAL_35940")&&kakashiV4Source.includes('return"hokage_minato"'));
  assert("watch_exchange_expanded_projection",d33910.checks&&d33910.checks.expandedWatchExchangeProjection===true,d33910);

  assert("scene1_authority_pinned",kakashiV4Source.includes('d11aa0f4f8e1ee203d3b63cee9a1b0d2fa88ea91'));
  const exactScene1=[
    "Kakashi stands alone on a Konoha rooftop, the village lights spread out below him. A masked ANBU operative lands behind him without warning.",
    "Kakashi Hatake.",
    "Kakashi turns to face him.",
    "You have orders. Stop this package from falling into the wrong hands.",
    "The operative holds out a sealed envelope.",
    "Kakashi crosses the rooftop and takes it.",
    "Why are you coming to me with this?",
    "Hokage's orders.",
    "Kakashi looks down at the seal.",
    "He breaks it. A target photograph waits inside."
  ];
  for(const [index,line] of exactScene1.entries())assert(`scene1_verbatim_${index+1}`,kakashiV4Source.includes(line));
  assert("scene1_prohibited_stale_copy_absent",d33910.checks&&d33910.checks.prohibitedStaleRooftopCopyAbsent===true,d33910);
  assert("scene1_dialogue_narration_boundary_is_explicit",kakashiV4Source.includes('cue.kind!=="dialogue"'));

  assert("scene2_authority_pinned",kakashiV4Source.includes('6e87a8c3364e22e696e0a9c120c51bc0c57e9881'));
  const exactScene2=[
    "Kakashi did not need long to find the man from the envelope.",
    "The difficult part was making sure the man never realised he had been found.",
    "Konoha changed shape when Kakashi followed someone through it. Streets stopped being streets and became sightlines. Crowds became cover. Roof edges became distances to clear before the person below could turn his head.",
    "ANBU Marked Target moved without the nervous scanning of someone who expected immediate pursuit.",
    "Kakashi kept it that way.",
    "He followed from above until the route tightened into older streets and narrower angles, then dropped lower when the rooftops would have made him too obvious.",
    "The target never looked directly at him.",
    "Not once.",
    "That did not make Kakashi relax.",
    "It made him wonder who the man expected to meet.",
    "By the time the route bent toward the Sakura tree and the alley beyond it, Kakashi had his answer.",
    "Someone was waiting."
  ];
  for(const [index,line] of exactScene2.entries())assert(`scene2_verbatim_${index+1}`,kakashiV4Source.includes(line));
  assert("scene2_runtime_diagnostics_contract",d33910.checks&&d33910.checks.scene02TwelveCues===true&&d33910.checks.scene02Verbatim===true&&d33910.checks.scene02NarrationOnly===true&&d33910.checks.scene02NoChoices===true&&d33910.checks.scene02AlleyBackdrop===true&&d33910.checks.scene02NoPrematureExchangeReveal===true,d33910);

  const roof=projection("kak_original_rooftop",{__storyPerformanceCursor33900:{beatId:"kak_original_rooftop",index:1}});
  assert("rooftop_performance_has_character_card_and_anbu_assets",roof.actors.some(a=>a.image==="Assets/Academy Student/academy_kakashi.png")&&roof.actors.some(a=>a.image==="NPC/konoha_anbu.png"),roof);
  assert("scene1_anbu_spoken_cue_focuses_anbu",roof.mode==="conversation"&&roof.actors.find(a=>a.label==="ANBU OPERATIVE").focus===true,roof);

  const tailEarly=projection("kak_original_tail",{__storyPerformanceCursor33900:{beatId:"kak_original_tail",index:3}});
  assert("scene2_tail_projects_only_kakashi_and_marked_target",tailEarly.location==="KONOHA ALLEY"&&tailEarly.actors.length===2&&tailEarly.actors.some(a=>a.label==="KAKASHI")&&tailEarly.actors.some(a=>a.label==="ANBU MARKED TARGET")&&!tailEarly.actors.some(a=>a.label==="PACKAGE SMUGGLER")&&tailEarly.objects.length===0,tailEarly);
  const tailFinal=projection("kak_original_tail",{__storyPerformanceCursor33900:{beatId:"kak_original_tail",index:11}});
  assert("scene2_final_cue_keeps_waiting_contact_unrevealed",tailFinal.actors.length===2&&!tailFinal.actors.some(a=>a.label==="PACKAGE SMUGGLER")&&tailFinal.objects.length===0,tailFinal);
  const scene=scenes.get(active.sceneId);
  const tailBeat=scene.beatMap.get("kak_original_tail");
  assert("scene2_has_no_dialogue_or_choices",tailBeat.mode==="narration"&&(!Array.isArray(tailBeat.choices)||tailBeat.choices.length===0));
  assert("scene2_uses_konoha_alley_backdrop",tailBeat.environmentRef&&tailBeat.environmentRef.assetId==="kakashi_origin_konoha_alleyway");

  assert("kakashi_v4_exact_final_story_card_assets",kakashiV4Source.includes('NPC/anbu_marked_target.png')&&kakashiV4Source.includes('NPC/package_smuggler.png')&&kakashiV4Source.includes('NPC/masked_interceptor.png'));
  assert("kakashi_v4_exact_extended_backdrops",backdrops.get("kakashi_origin_end_of_alleyway")==="Kakashi Origin Backdrop/end_of_alleyway.png"&&backdrops.get("kakashi_origin_pakkun_interception_alley")==="Kakashi Origin Backdrop/alleyway_konoha_night.png",[...backdrops]);

  const action=projection("kak_original_action");
  assert("choice_stages_final_exchange_participants",action.mode==="encounter"&&action.actors.length===3&&action.actors.some(a=>a.label==="ANBU MARKED TARGET"&&a.image==="NPC/anbu_marked_target.png")&&action.actors.some(a=>a.label==="PACKAGE SMUGGLER"&&a.image==="NPC/package_smuggler.png")&&action.objects.some(x=>x.state==="EXCHANGE IN PROGRESS"),action);

  const transfer=projection("kak_original_transfer",{kakashiOriginalAction:"observe",__storyPerformanceCursor33900:{beatId:"kak_original_transfer",index:2}});
  assert("masked_interceptor_enters_as_amt_breaks_away",transfer.actors.length===3&&transfer.actors.some(a=>a.label==="MASKED INTERCEPTOR"&&a.state==="BURSTING FROM SHADOW"&&a.entering===true)&&transfer.actors.some(a=>a.label==="ANBU MARKED TARGET"&&a.state==="BREAKING AWAY")&&transfer.actors.some(a=>a.label==="PACKAGE SMUGGLER"&&a.state==="HAS PACKAGE")&&!transfer.actors.some(a=>a.label==="KAKASHI")&&transfer.objects.length===0,transfer);

  const majorProjection=projection("kak_original_major_choice");
  assert("watch_exchange_choice_keeps_only_ps_and_mi_after_amt_breakaway",majorProjection.actors.length===2&&majorProjection.actors.some(a=>a.label==="PACKAGE SMUGGLER"&&a.state==="HAS PACKAGE")&&majorProjection.actors.some(a=>a.label==="MASKED INTERCEPTOR"&&a.state==="BLOCKING ESCAPE")&&!majorProjection.actors.some(a=>a.label==="ANBU MARKED TARGET"||a.label==="KAKASHI")&&majorProjection.objects.length===0,majorProjection);

  const major=scene.beatMap.get("kak_original_major_choice");
  assert("legacy_battle_stubs_remain_fail_closed_until_current_scene_binding",major.choices.find(c=>c.choiceId==="fight_assassin").availability().available===false&&major.choices.find(c=>c.choiceId==="defeat_assassin_then_recover").availability().available===false);
  assert("browser_golden_not_claimed",d338.browserGoldenClaimed===false&&d339.browserGoldenClaimed===false&&d33910.browserGoldenClaimed===false);

  console.log(JSON.stringify({pass:true,kind:"kakashi_scene1_scene2_verbatim_scene_board_v9",scene1Authority:"d11aa0f4f8e1ee203d3b63cee9a1b0d2fa88ea91",scene2Authority:"6e87a8c3364e22e696e0a9c120c51bc0c57e9881",browserGoldenClaimed:false},null,2));
}catch(error){console.error(error&&error.stack||error);process.exit(1);}