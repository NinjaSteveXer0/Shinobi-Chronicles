#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm");

class Element{
  constructor(tag){this.tagName=String(tag||"div").toUpperCase();this.children=[];this.listeners={};this.attributes={};this.dataset={};this.style={};this.parentNode=null;this._id="";this.textContent="";this.innerHTML="";this.disabled=false;}
  set id(value){this._id=String(value||"");if(this._id)elements.set(this._id,this);} get id(){return this._id;}
  appendChild(child){this.children.push(child);child.parentNode=this;if(child.id)elements.set(child.id,child);return child;}
  remove(){if(this.id)elements.delete(this.id);if(this.parentNode)this.parentNode.children=this.parentNode.children.filter(x=>x!==this);}
  addEventListener(type,fn){(this.listeners[type]||(this.listeners[type]=[])).push(fn);}
  dispatchEvent(event){event.target=this;for(const fn of this.listeners[event.type]||[])fn.call(this,event);return true;}
  click(){return this.dispatchEvent({type:"click"});}
  setAttribute(k,v){this.attributes[k]=String(v);} getAttribute(k){return this.attributes[k]??null;} removeAttribute(k){delete this.attributes[k];}
}
const elements=new Map();
const head=new Element("head"),body=new Element("body"),storyLayer=new Element("div");storyLayer.id="story-scene-presentation-layer";body.appendChild(storyLayer);
const document={readyState:"complete",head,body,activeElement:null,createElement:t=>new Element(t),getElementById:id=>elements.get(id)||null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){}};

const scenes=new Map();let active=null;let render={beatId:null,text:"",buttons:[]};const history=[];const completions=[];
const playerData={activityHistory:history,acquisition:{chronicleOriginVariantId:null,chronicleOrigin:{prologueCompleted:false}}};
let activityHistory=history;

function clone(v){return v===undefined?undefined:JSON.parse(JSON.stringify(v));}
function registerStoryScene(def){const copy={...def,beats:(def.beats||[])};copy.beatMap=new Map(copy.beats.map(b=>[b.beatId,b]));scenes.set(copy.sceneId,copy);return{success:true,sceneId:copy.sceneId};}
function unregisterStoryScene(id){scenes.delete(id);return true;}
function getStorySceneDefinition(id){return scenes.get(id)||null;}
function getActiveStorySceneRuntime(){return active;}
function currentBeat(){return active?scenes.get(active.sceneId).beatMap.get(active.beatId)||null:null;}
function resolveRequest(req,key){if(!req||typeof req.resolve!=="function")return;active.processed=active.processed||new Set();const token=`${active.instanceId}:${active.beatId}:${key}:${req.requestId||"request"}`;if(active.processed.has(token))return;const out=req.resolve();if(!out||out.success!==true)throw new Error(`request failed ${key}: ${JSON.stringify(out)}`);active.processed.add(token);}
function enterBeat(){const beat=currentBeat();(beat&&beat.onEnterConsequences||[]).forEach((req,i)=>resolveRequest(req,`enter${i}`));renderStoryScenePresentationLayer();}
function startStoryScene(sceneId,options={}){const def=scenes.get(sceneId);if(!def)return{success:false,reason:"story_scene_not_registered"};active={sceneId,instanceId:`inst_${sceneId}_${Date.now()}`,beatId:options.entryBeatId||def.entryBeatId,localContext:clone(options.context||{}),processed:new Set()};enterBeat();return{success:true,sceneId,beatId:active.beatId};}
function finishScene(){const def=scenes.get(active.sceneId);(def.onCompleteConsequences||[]).forEach((req,i)=>resolveRequest(req,`complete${i}`));active=null;render={beatId:null,text:"",buttons:[]};return{success:true,completed:true};}
function advanceStoryScene(choiceId=null){const beat=currentBeat();if(!beat)return{success:false,reason:"story_scene_not_active"};if(beat.mode==="choice"){
  if(!choiceId)return{success:false,reason:"story_choice_required"};const c=(beat.choices||[]).find(x=>x.choiceId===choiceId);if(!c)return{success:false,reason:"story_choice_invalid"};
  if(typeof c.availability==="function"){const av=c.availability();if(!av||av.available!==true)return{success:false,reason:"story_choice_unavailable"};}
  if(c.contextPatch)Object.assign(active.localContext,clone(c.contextPatch));active.beatId=c.nextBeatId||beat.nextBeatId;enterBeat();return{success:true,beatId:active.beatId,choiceId};
}
if(beat.nextBeatId){active.beatId=beat.nextBeatId;enterBeat();return{success:true,beatId:active.beatId};}
if(beat.exitScene)return finishScene();return{success:false,reason:"story_transition_missing"};}
function renderStoryScenePresentationLayer(){const beat=currentBeat();if(!beat){render={beatId:null,text:"",buttons:[]};return false;}const projected=typeof beat.presentationResolver==="function"?(beat.presentationResolver()||{}):{};const text=projected.text||beat.text||"";const buttons=[];
  if(beat.mode==="choice")for(const c of beat.choices||[]){const b=new Element("button");b.dataset.choiceId=c.choiceId;b.textContent=c.label;b.addEventListener("click",()=>advanceStoryScene(c.choiceId));buttons.push(b);}
  else {const b=new Element("button");b.textContent="CONTINUE";b.addEventListener("click",()=>advanceStoryScene());buttons.push(b);}
  render={beatId:beat.beatId,text,buttons};return true;}

const context={console,Date,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Error,TypeError,RegExp,document,globalThis:null,window:null,
  playerData,activityHistory,cloneProgressionData:clone,savePlayerData:()=>true,getCurrentChronicleOccurrenceHistoryScope:()=>({kind:"origin"}),
  registerStoryScene,unregisterStoryScene,getStorySceneDefinition,getActiveStorySceneRuntime,startStoryScene,advanceStoryScene,renderStoryScenePresentationLayer,
  openOverlay:()=>true,ensurePlayerAcquisitionState:()=>playerData.acquisition,
  consumeStaticOriginSourceOccurrence:()=>({success:true}),
  completeChronicleOriginPrologue:(id,evidence)=>{playerData.acquisition.chronicleOrigin.prologueCompleted=true;completions.push({id,evidence});return{success:true,id,evidence};},
  registerSceneBackdropAssetPath:()=>({success:true}),renderAlphaTailedBeastMissionCommand:()=>({success:true}),
  beginAlphaChronicleOriginPrologue:()=>({success:false,reason:"legacy"})
};context.globalThis=context;context.window=context;
vm.createContext(context);

function load(rel){vm.runInContext(fs.readFileSync(path.join(process.cwd(),rel),"utf8"),context,{filename:rel});}
function assert(name,value,details=null){if(!value)throw new Error(`${name}: ${JSON.stringify(details)}`);console.log(`PASS ${name}`);}
function clickChoice(id){const b=render.buttons.find(x=>x.dataset.choiceId===id);if(!b)throw new Error(`choice button missing ${id} @ ${render.beatId}`);b.click();}
function clickContinue(){const b=render.buttons.find(x=>!x.dataset.choiceId);if(!b)throw new Error(`continue button missing @ ${render.beatId}`);b.click();}
function selectOrigin(id){playerData.activityHistory.length=0;playerData.acquisition={chronicleOriginVariantId:id,chronicleOrigin:{prologueCompleted:false}};active=null;render={beatId:null,text:"",buttons:[]};}
function beginOrigin(id){selectOrigin(id);const r=context.beginAlphaChronicleOriginPrologue();if(!r||r.success!==true)throw new Error(`origin start failed ${id}: ${JSON.stringify(r)}`);return r;}

try{
  // Exact production Origin package order, then both browser-realisation layers.
  load("runtime/alpha-origin-scenes-32900-core.js");
  registerStoryScene({sceneId:"origin_academy_menma_prologue",entryBeatId:"menma",beats:[{beatId:"menma",mode:"narration",text:"Menma",exitScene:true}],onCompleteConsequences:[]});
  load("runtime/alpha-origin-scenes-32900-a.js");load("runtime/alpha-origin-scenes-32900-b.js");load("runtime/alpha-origin-scenes-32900-c.js");load("runtime/alpha-origin-scenes-32900-integrator.js");load("runtime/alpha-origin-browser-realisation-33500.js");load("runtime/alpha-origin-choice-reaction-33510.js");

  const diag=context.runAlphaOriginBrowserRealisation33500Diagnostics();
  const diag2=context.runAlphaOriginChoiceReaction33510Diagnostics();
  assert("33500_diagnostics_green",diag.pass===true,diag);
  assert("33510_diagnostics_green",diag2.pass===true,diag2);
  const style=document.getElementById("sc-alpha-origin-story-presentation-33500-style");
  assert("story_backdrop_stack_above_world",!!style&&style.textContent.includes("z-index:0!important")&&style.textContent.includes("z-index:2!important"));
  assert("browser_golden_not_claimed",diag.browserGoldenClaimed===false&&diag2.browserGoldenClaimed===false);

  // Public Origin dispatcher -> rendered DOM choice -> public advance handler.
  beginOrigin("academy_kushina");
  assert("kushina_real_entry_choice",render.beatId==="kus_crisis"&&render.buttons.length===4,render);
  clickChoice("correct_formula");
  assert("one_click_reaches_exact_next_beat",render.beatId==="kus_reverse"&&render.text.includes("reverse-summoning"),render);
  clickContinue();
  assert("continue_does_not_skip_multiple_beats",render.beatId==="kus_gero_1"&&render.text.includes("not where I was"),render);
  clickContinue();clickContinue();clickContinue();
  assert("kushina_second_choice_is_rendered",render.beatId==="kus_contact_choice"&&render.buttons.length===4,render);
  clickChoice("ask_who");
  assert("kushina_second_choice_has_visible_consequence",render.beatId==="kus_contact_result"&&render.text.includes("gives his name: Gerotora"),render);

  // Two materially different Kurenai player routes must produce visibly different DOM sequences.
  beginOrigin("academy_kurenai");clickContinue();clickChoice("false_kurenai");clickChoice("rush_bell");
  assert("kurenai_loss_has_distinct_visible_result",render.beatId==="kur_complete_loss_1"&&render.text.includes("does not obtain the bell"),render);
  const lossText=render.text;

  beginOrigin("academy_kurenai");clickContinue();clickChoice("fake_clumsy");clickChoice("rush_bell");clickChoice("let_him_think_caught");
  assert("kurenai_win_enters_full_authored_chain",render.beatId==="kur_complete_win_result_1",render);
  const winSequence=[];for(let i=0;i<6;i++){winSequence.push(render.text);clickContinue();}
  assert("kurenai_win_chain_contains_locked_dialogue",winSequence.some(t=>t.includes("Have you?"))&&winSequence.some(t=>t==="Yes.")&&winSequence.some(t=>t.includes("genuinely holding the bell")),winSequence);
  assert("kurenai_choices_do_not_reconverge_to_same_text",lossText!==winSequence[0]);

  // Hinata's rendered evaluation consumes the exact decisions selected through DOM buttons.
  beginOrigin("academy_hinata");clickContinue();clickChoice("study_movement");clickChoice("redirect_attack");clickChoice("trust_observation");
  assert("hinata_evaluation_reflects_selected_sequence",render.beatId==="hin_eval"&&render.text.includes("studied the opponent's movement")&&render.text.includes("redirected the attack")&&render.text.includes("trusted what she had observed"),render);

  // Mirai's earlier conversation changes the later observer-safe inconsistency projection.
  beginOrigin("academy_mirai");clickContinue();clickChoice("ask_route");
  assert("mirai_prior_choice_changes_later_evidence",render.beatId==="mir_inconsistent"&&render.text.includes("route the escort described"),render);

  // Wasabi route and Iwabee terrain choice both change visible successor realization.
  beginOrigin("academy_izuno");clickContinue();clickChoice("environmental_signs");clickChoice("stronger_trail");
  assert("wasabi_route_choice_has_visible_successor",render.beatId==="izu_route_result"&&render.text.includes("false trail"),render);
  beginOrigin("academy_iwabee");clickContinue();clickChoice("build_path");
  assert("iwabee_terrain_choice_changes_visible_world_result",render.beatId==="iwa_expose"&&render.text.includes("builds a stable path"),render);

  // Academy Kakashi legacy Origin is intentionally absent during the V2 clean-room rebuild.
  selectOrigin("academy_kakashi");
  const kakashiPending=context.beginAlphaChronicleOriginPrologue();
  assert("academy_kakashi_v2_fails_closed",kakashiPending&&kakashiPending.success===false&&kakashiPending.reason==="academy_kakashi_v2_pending",kakashiPending);

  console.log(JSON.stringify({pass:true,kind:"dom_event_public_story_handler_harness",browserGoldenClaimed:false},null,2));
}catch(error){console.error(error&&error.stack||error);process.exit(1);}
