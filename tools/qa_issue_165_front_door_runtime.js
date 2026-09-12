#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const vm=require("vm");

const root=path.resolve(__dirname,"..");
const source=fs.readFileSync(path.join(root,"runtime","alpha-front-door-33300.js"),"utf8");

class MemoryStorage{
  constructor(){this.map=new Map();}
  getItem(key){return this.map.has(key)?this.map.get(key):null;}
  setItem(key,value){this.map.set(key,String(value));}
  removeItem(key){this.map.delete(key);}
  clear(){this.map.clear();}
}

const elements=new Map();
class Element{
  constructor(tag){
    this.tagName=String(tag||"div").toUpperCase();
    this.children=[];
    this.dataset={};
    this.attributes={};
    this.style={};
    this._id="";
    this.innerHTML="";
    this.tabIndex=0;
    this.inert=false;
    this.listeners={};
  }
  set id(value){
    if(this._id)elements.delete(this._id);
    this._id=String(value||"");
    if(this._id)elements.set(this._id,this);
  }
  get id(){return this._id;}
  appendChild(child){this.children.push(child);child.parentNode=this;if(child.id)elements.set(child.id,child);return child;}
  remove(){if(this.id)elements.delete(this.id);if(this.parentNode)this.parentNode.children=this.parentNode.children.filter(item=>item!==this);}
  setAttribute(key,value){this.attributes[key]=String(value);}
  removeAttribute(key){delete this.attributes[key];}
  addEventListener(type,fn){this.listeners[type]=fn;}
  querySelector(){return null;}
  querySelectorAll(){return [];}
  closest(){return null;}
  focus(){}
  blur(){}
}

const gameContainer=new Element("div");
gameContainer.dataset={};
const head=new Element("head");
const body=new Element("body");
const document={
  readyState:"complete",
  head,
  body,
  activeElement:null,
  createElement(tag){return new Element(tag);},
  getElementById(id){return elements.get(id)||null;},
  querySelector(selector){return selector===".game-container"?gameContainer:null;}
};

const localStorage=new MemoryStorage();
const sessionStorage=new MemoryStorage();
let selectCalls=0;
let prologueCalls=0;
let reloadCalls=0;
const originIds=[
  "academy_hinata","academy_izuno","academy_mirai","academy_menma","academy_kushina",
  "academy_kurenai","academy_iwabee","academy_metal_lee","academy_kakashi","academy_obito"
];
const sceneIds=Object.fromEntries(originIds.map(id=>[id,`origin_scene_${id}`]));
const entries=originIds.map((variantId,index)=>({variantId,name:`Origin ${index+1}`,rank:"Academy",basePL:5+index,cardPath:`Assets/${variantId}.png`}));

const context={
  console,
  document,
  localStorage,
  sessionStorage,
  location:{reload(){reloadCalls+=1;}},
  setTimeout(fn){fn();return 1;},
  clearTimeout(){},
  SC_ALPHA_ORIGIN_SCENE_IDS:sceneIds,
  getAlphaChronicleOriginSelectionEntries(){return entries.map(item=>({...item}));},
  selectChronicleOrigin(variantId,sourceEventId){selectCalls+=1;return {success:true,variantId,sourceEventId};},
  beginAlphaChronicleOriginPrologue(){prologueCalls+=1;return {success:true,sceneId:"stub_scene"};},
  getStorySceneDefinition(sceneId){return Object.values(sceneIds).includes(sceneId)?{sceneId}:null;},
  Object,Array,String,Number,Boolean,RegExp,JSON,Date,Map,Set,Math,Error,TypeError
};
context.globalThis=context;
context.window=context;
vm.createContext(context);

function plain(value){return JSON.parse(JSON.stringify(value));}
function assert(name,value,details=null){
  if(!value)throw new Error(`${name}:${JSON.stringify(details)}`);
  console.log(`PASS ${name}`);
}

try{
  vm.runInContext(source,context,{filename:"runtime/alpha-front-door-33300.js"});
  const runtime=context.SC_ALPHA_FRONT_DOOR_33300;
  assert("front_door_runtime_exported",!!runtime);
  assert("fresh_boot_lands_on_landing",runtime.state.stage==="landing");
  assert("underlying_game_is_inert",gameContainer.inert===true&&gameContainer.dataset.alphaFrontDoorLocked==="true");
  const layer=document.getElementById("sc-alpha-front-door-33300");
  assert("landing_layer_created",!!layer&&layer.innerHTML.includes("BEGIN CHRONICLE"));

  const diag=plain(context.runAlphaFrontDoor33300Diagnostics());
  assert("internal_diagnostics_green",diag.pass===true,diag);
  assert("browser_golden_not_claimed",diag.browserGolden===false);

  // Existing save must present deliberate continue/new choices instead of
  // allowing the already-restored underlying overlay to be the visual front.
  localStorage.setItem("shinobiChroniclesPlayerSave",JSON.stringify({fixture:true}));
  context.openAlphaFrontDoor33300("landing");
  const savedLanding=document.getElementById("sc-alpha-front-door-33300");
  assert("saved_boot_has_continue",savedLanding.innerHTML.includes("CONTINUE CHRONICLE"));
  assert("saved_boot_has_new_chronicle",savedLanding.innerHTML.includes("NEW CHRONICLE"));

  // Choose-Ninja projection must consume exactly the existing ten entries.
  runtime.state.ninjaId="ShadowFox";
  runtime.state.villageId="konoha";
  runtime.state.selectedVariantId="academy_menma";
  context.openAlphaFrontDoor33300("ninja");
  const ninjaLayer=document.getElementById("sc-alpha-front-door-33300");
  assert("choose_ninja_projects_exact_ten",(ninjaLayer.innerHTML.match(/data-origin-id=/g)||[]).length===10);
  assert("konoha_profile_summary_present",ninjaLayer.innerHTML.includes("HIDDEN LEAF"));

  // The harness now removes the fixture save so the existing origin authority
  // can be called exactly once. No second acquisition implementation exists in
  // 33300; this is verified both functionally and by internal diagnostics.
  localStorage.removeItem("shinobiChroniclesPlayerSave");
  const confirmed=plain(context.confirmAlphaFrontDoorNinja33300());
  assert("origin_confirmation_delegates_once",confirmed.success===true&&selectCalls===1,confirmed);
  assert("origin_prologue_dispatches_once",prologueCalls===1);
  assert("front_door_releases_after_prologue",gameContainer.inert===false&&!document.getElementById("sc-alpha-front-door-33300"));
  const profile=JSON.parse(localStorage.getItem("shinobiChroniclesFrontDoorProfileV1"));
  assert("profile_is_presentation_only",profile.ninjaId==="ShadowFox"&&profile.villageId==="konoha"&&profile.presentationOnly===true);

  // Reset is exact-key removal + reload request, never blanket storage.clear().
  localStorage.setItem("shinobiChroniclesPlayerSave","fixture");
  localStorage.setItem("unrelatedDeveloperKey","preserve-me");
  sessionStorage.setItem("shinobiTestState","stale-menma-resume");
  const reset=plain(context.resetAlphaChronicleFromFrontDoor33300());
  assert("reset_requests_reload",reset.success===true&&reloadCalls===1);
  assert("reset_clears_player_save",localStorage.getItem("shinobiChroniclesPlayerSave")===null);
  assert("reset_clears_front_door_profile",localStorage.getItem("shinobiChroniclesFrontDoorProfileV1")===null);
  assert("reset_clears_stale_session_resume",sessionStorage.getItem("shinobiTestState")===null);
  assert("reset_preserves_unrelated_storage",localStorage.getItem("unrelatedDeveloperKey")==="preserve-me");

  console.log("Issue #165 front-door runtime QA: PASS");
}catch(error){
  console.error("Issue #165 front-door runtime QA: FAIL");
  console.error(error&&error.stack||error);
  process.exit(1);
}
