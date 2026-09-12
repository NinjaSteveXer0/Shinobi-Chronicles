#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const vm=require("vm");

const root=path.resolve(__dirname,"..");
const source=fs.readFileSync(path.join(root,"runtime","alpha-browser-onboarding-fixes-33400.js"),"utf8");

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
    this.listeners={};
    this._id="";
    this.innerHTML="";
    this.tabIndex=0;
    this.inert=false;
    this.disabled=false;
    this.value="";
    this.parentNode=null;
  }
  set id(value){if(this._id)elements.delete(this._id);this._id=String(value||"");if(this._id)elements.set(this._id,this);}
  get id(){return this._id;}
  appendChild(child){this.children.push(child);child.parentNode=this;if(child.id)elements.set(child.id,child);return child;}
  remove(){if(this.id)elements.delete(this.id);if(this.parentNode)this.parentNode.children=this.parentNode.children.filter(item=>item!==this);this.parentNode=null;}
  setAttribute(key,value){this.attributes[key]=String(value);}
  getAttribute(key){return Object.prototype.hasOwnProperty.call(this.attributes,key)?this.attributes[key]:null;}
  removeAttribute(key){delete this.attributes[key];}
  addEventListener(type,fn){this.listeners[type]=fn;}
  querySelector(){return null;}
  querySelectorAll(){return [];}
  closest(){return null;}
  focus(){}
  blur(){}
}

const gameContainer=new Element("div");
const oldFront=new Element("div");oldFront.id="sc-alpha-front-door-33300";
const head=new Element("head");
const body=new Element("body");body.appendChild(oldFront);
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
let reloadCalls=0;
let selectCalls=0;
let prologueCalls=0;
let baseConsumeCalls=0;
let enemyCalls=0;

const originIds=[
  "academy_hinata","academy_izuno","academy_mirai","academy_menma","academy_kushina",
  "academy_kurenai","academy_iwabee","academy_metal_lee","academy_kakashi","academy_obito"
];
const sceneIds=Object.fromEntries(originIds.map(id=>[id,`origin_${id}_prologue`]));
const entries=originIds.map((variantId,index)=>({variantId,name:`Origin ${index+1}`,rank:"Academy",basePL:5+index,cardPath:`Assets/${variantId}.png`}));

const context={
  console,document,localStorage,sessionStorage,
  location:{reload(){reloadCalls+=1;}},
  setTimeout(fn){fn();return 1;},clearTimeout(){},
  currentBattle:{active:true,battleOver:false},
  SC_ALPHA_ORIGIN_SCENE_IDS:sceneIds,
  getAlphaChronicleOriginSelectionEntries(){return entries.map(row=>({...row}));},
  getStorySceneDefinition(sceneId){return Object.values(sceneIds).includes(sceneId)?{sceneId}:null;},
  selectChronicleOrigin(variantId,sourceEventId){selectCalls+=1;return {success:true,variantId,sourceEventId};},
  beginAlphaChronicleOriginPrologue(){prologueCalls+=1;return {success:true,sceneId:"stub_prologue"};},
  consumeBattleActionOpportunity(side,participantId,actionId,reason){baseConsumeCalls+=1;return {side,participantId,actionId,reason};},
  evaluateEnemyActionScheduler(){return context.currentBattle.active&&!context.currentBattle.battleOver?{ready:true}:{ready:false};},
  executeEnemyAuthoredActionOpportunity(){enemyCalls+=1;context.consumeBattleActionOpportunity("enemy","altered_shinobi",`enemy_${enemyCalls}`,"enemy_action_completed");return {success:true};},
  Object,Array,String,Number,Boolean,RegExp,JSON,Date,Map,Set,Math,Error,TypeError
};
context.globalThis=context;
context.window=context;
vm.createContext(context);

function plain(value){return JSON.parse(JSON.stringify(value));}
function assert(name,value,details=null){if(!value)throw new Error(`${name}:${JSON.stringify(details)}`);console.log(`PASS ${name}`);}

try{
  vm.runInContext(source,context,{filename:"runtime/alpha-browser-onboarding-fixes-33400.js"});
  const runtime=context.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400;
  assert("v2_runtime_exported",!!runtime);
  assert("old_33300_visual_retired",!document.getElementById("sc-alpha-front-door-33300"));
  assert("account_is_real_front_door",runtime.state.stage==="account"&&document.getElementById("sc-alpha-front-door-33400").innerHTML.includes("REGISTER / LOGIN"));
  assert("new_player_register_visible",document.getElementById("sc-alpha-front-door-33400").innerHTML.includes("REGISTER / NEW NINJA"));
  assert("underlying_game_locked",gameContainer.inert===true&&gameContainer.dataset.alphaFrontDoorLocked==="33400");

  // A startup-created default/pending save is not a playable existing Chronicle.
  localStorage.setItem("shinobiChroniclesPlayerSave",JSON.stringify({
    acquisition:{chronicleOriginVariantId:null,ninjaIdentityVariantId:null,ninjaIdentityLocked:false,onboardingStatus:"chronicle_origin_pending",chronicleOrigin:{variantId:null}}
  }));
  const pending=plain(runtime.getSavedChronicleSnapshot());
  assert("pending_shell_not_existing_chronicle",pending.exists===true&&pending.begun===false&&pending.pendingShell===true,pending);

  // A committed locked Origin is eligible for returning-player login.
  localStorage.setItem("shinobiChroniclesPlayerSave",JSON.stringify({
    acquisition:{chronicleOriginVariantId:"academy_menma",ninjaIdentityVariantId:"academy_menma",ninjaIdentityLocked:true,onboardingStatus:"origin_prologue_active"}
  }));
  assert("locked_origin_counts_as_begun",runtime.hasBegunChronicle()===true);

  // Register/New must clear only owned onboarding keys and set a reload marker.
  localStorage.setItem("shinobiChroniclesFrontDoorProfileV1","old-profile");
  localStorage.setItem("unrelatedDeveloperKey","keep-me");
  sessionStorage.setItem("shinobiTestState","old-resume");
  const reset=plain(runtime.startNewChronicle());
  assert("register_requests_clean_reload",reset.success===true&&reloadCalls===1&&sessionStorage.getItem("shinobiChroniclesForceNewOnboardingV2")==="1",reset);
  assert("register_clears_player_and_resume",localStorage.getItem("shinobiChroniclesPlayerSave")===null&&localStorage.getItem("shinobiChroniclesFrontDoorProfileV1")===null&&sessionStorage.getItem("shinobiTestState")===null);
  assert("register_preserves_unrelated_storage",localStorage.getItem("unrelatedDeveloperKey")==="keep-me");

  // Selection is still presentation-only through the Introduction screen.
  runtime.state.ninjaId="ShadowFox";
  runtime.state.villageId="konoha";
  runtime.state.selectedVariantId="academy_menma";
  runtime.openStage("ninja");
  const ninjaHtml=document.getElementById("sc-alpha-front-door-33400").innerHTML;
  assert("exact_ten_origins_projected",(ninjaHtml.match(/data-origin-id=/g)||[]).length===10);
  assert("selection_has_not_committed",selectCalls===0&&prologueCalls===0);
  runtime.openStage("intro");
  const introHtml=document.getElementById("sc-alpha-front-door-33400").innerHTML;
  assert("introduction_precedes_commit",introHtml.includes("Welcome to Shinobi Chronicles")&&introHtml.includes(">BEGIN<")&&selectCalls===0);

  // BEGIN is the only V2 commit point and delegates to existing authorities.
  const begun=plain(runtime.beginSelectedOrigin());
  assert("begin_commits_existing_origin_once",begun.success===true&&selectCalls===1,begun);
  assert("begin_dispatches_existing_prologue_once",prologueCalls===1);
  assert("front_door_releases_after_begin",gameContainer.inert===false&&!document.getElementById("sc-alpha-front-door-33400"));
  const profile=JSON.parse(localStorage.getItem("shinobiChroniclesFrontDoorProfileV1"));
  assert("profile_remains_presentation_only",profile.ninjaId==="ShadowFox"&&profile.villageId==="konoha"&&profile.presentationOnly===true&&profile.authenticationScope==="alpha_browser_local_profile");

  // Completed player opportunity -> exactly one authored enemy opportunity.
  context.currentBattle.active=true;context.currentBattle.battleOver=false;
  context.consumeBattleActionOpportunity("player","academy_menma","player_action_1","valid_skill_completed");
  assert("one_enemy_turn_after_player_action",enemyCalls===1&&runtime.getEnemyTurnsScheduled()===1,{enemyCalls,scheduled:runtime.getEnemyTurnsScheduled()});
  assert("enemy_turn_does_not_recurse",baseConsumeCalls===2,{baseConsumeCalls,enemyCalls});

  // Battle end blocks any extra enemy action.
  context.currentBattle.battleOver=true;
  context.consumeBattleActionOpportunity("player","academy_menma","finishing_action","valid_skill_completed");
  assert("no_enemy_turn_after_battle_over",enemyCalls===1&&baseConsumeCalls===3,{baseConsumeCalls,enemyCalls});

  const battleStyle=document.getElementById("sc-alpha-battle-pl-calibration-33400");
  assert("pl_circles_lowered",!!battleStyle&&battleStyle.textContent.includes("top:50.2%"));
  assert("browser_golden_not_claimed",runtime.browserGoldenClaimed===false);

  console.log("Issue #165 V2 onboarding / tutorial browser-runtime QA: PASS");
}catch(error){
  console.error("Issue #165 V2 onboarding / tutorial browser-runtime QA: FAIL");
  console.error(error&&error.stack||error);
  process.exit(1);
}
