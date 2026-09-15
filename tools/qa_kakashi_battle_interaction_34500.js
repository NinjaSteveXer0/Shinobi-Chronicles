#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const runtimePath=path.join(root,"runtime","alpha-kakashi-battle-interaction-hotfix-34500.js");
const gamePath=path.join(root,"game.js");
const originPath=path.join(root,"runtime","alpha-origin-scenes-32900-integrator.js");
const decisionPath=path.join(root,"runtime","alpha-story-decision-realisation-34000.js");
const adapterPath=path.join(root,"runtime","alpha-kakashi-final-origin-adapter-34100.js");
const src=fs.readFileSync(runtimePath,"utf8");
const gameSrc=fs.readFileSync(gamePath,"utf8");
const originSrc=fs.readFileSync(originPath,"utf8");
const decisionSrc=fs.readFileSync(decisionPath,"utf8");
const adapterSrc=fs.readFileSync(adapterPath,"utf8");

const exactFive=[
  "academy_kakashi_kunai_quickdraw",
  "academy_kakashi_clone_feint",
  "academy_kakashi_opening_exploit",
  "academy_kakashi_wire_snare",
  "academy_kakashi_prodigys_read"
];

// Source contract: browser interaction only. 34500 may route a rendered card to
// native Battle selection/confirmation, but may never become a damage/state
// resolver itself.
assert(src.includes('const VERSION="34500-v4"'),"34500 v4 not active");
assert(src.includes('document.addEventListener("click",delegatedClick34500,true)'),"document capture delegation missing");
assert(src.includes('resolveDelegatedCard34500'),"rendered-card delegation missing");
assert(src.includes('stopImmediatePropagation'),"competing select-only handlers must be suppressed");
assert(src.includes('activateBattlePreparedSkillCard'),"native one-click Battle bridge must remain preferred");
assert(src.includes('confirmSelectedBattleSkill'),"native select/confirm fallback must remain available");
assert(src.includes('renderTemporaryBattleSkillGuide'),"hover/focus must remain native presentation");
assert(src.includes('launchAcademyKakashiOriginPlBattle'),"post-deployment hardening must remain bound");
for(const forbidden of ["resolveBattleDamagePacket(","applyBattleDamage(","recordBattleEvidence(","consumeBattleActionOpportunity("]){
  assert(!src.includes(forbidden),`34500 must not own Battle semantics: ${forbidden}`);
}
for(const id of exactFive)assert(gameSrc.includes(id),`game.js missing Kakashi authored Skill ${id}`);
assert(gameSrc.includes("function confirmSelectedBattleSkill()"),"native confirm owner missing");
assert(gameSrc.includes("const result=attemptBattlePreparedSkill(skillId,targetParticipantId,options)"),"native confirm no longer dispatches through Battle skill authority");
assert(gameSrc.includes("function attemptClosureWaveBattleSkill("),"factory/closure Battle resolver missing");

// Delivery identity: a changed child is not browser-visible if an unchanged
// versioned parent can serve an older 34100/34500 chain.
assert(originSrc.includes('runtime/alpha-story-decision-realisation-34000.js?sc=story-decision-20260916-4'),
  "32900 must request current 34000 cache identity");
assert(decisionSrc.includes('runtime/alpha-kakashi-final-origin-adapter-34100.js?sc=kakashi-final-20260916-12'),
  "34000 must request current 34100 cache identity");
assert(adapterSrc.includes('const BUILD="kakashi-final-20260916-12";'),
  "34100 must request current 34500 child cache identity");

function makeClassList(classes=[]){
  const set=new Set(classes);
  return{contains:name=>set.has(name),add:name=>set.add(name),remove:name=>set.delete(name)};
}

function buildContext({nativeActivator=true}={}){
  const listeners={};
  const cardListeners={};
  const actor={id:"academy_kakashi"};
  const definitions=Object.fromEntries(exactFive.map(id=>[id,{id,displayName:id,ownerRegistryId:"academy_kakashi"}]));
  const card={
    disabled:false,dataset:{skillId:exactFive[0]},classList:makeClassList(["battle-dev-skill-card","is-ready"]),textContent:"Academy Kakashi Kunai Quickdraw",
    getAttribute(name){return name==="onclick"?`selectBattlePreparedSkill('${exactFive[0]}')`:null;},
    setAttribute(){},removeAttribute(){},querySelector(){return null;},
    addEventListener(type,fn){(cardListeners[type]||(cardListeners[type]=[])).push(fn);},
    closest(){return card;}
  };
  const stage={
    querySelector(){return null;},querySelectorAll(){return[card];},contains(node){return node===card;},matches(sel){return sel===".alpha-code-battle-stage";}
  };
  const document={
    body:{},documentElement:{dataset:{}},head:{},
    addEventListener(type,fn,capture){(listeners[type]||(listeners[type]=[])).push({fn,capture});},
    querySelector(selector){return selector===".alpha-code-battle-stage"?stage:null;},
    getElementById(){return null;}
  };
  let nativeCalls=0,selectCalls=0,confirmCalls=0,guideCalls=0,launchCalls=0;
  const context={
    console,document,window:null,globalThis:null,WeakSet,Set,Map,Object,Array,String,Number,Boolean,RegExp,Date,Math,JSON,Error,
    queueMicrotask(fn){fn();},setTimeout(fn){fn();return 1;},clearTimeout(){},MutationObserver:undefined,
    currentBattle:{active:true,battleOver:false,kakashiOriginDeployment:{controllerParticipantId:"academy_kakashi"},selectedSkillId:null},
    getBattleDeploymentParticipant(side,slot){return side==="player"&&slot===1?actor:null;},
    getBattleUISkillPalettePresentation(){return{skillIds:[...exactFive]};},
    getBattlePreparedSkillDefinition(row,id){assert.strictEqual(row,actor);return definitions[id]||null;},
    renderTemporaryBattleSkillGuide(id){guideCalls+=1;assert(exactFive.includes(id));},
    selectBattlePreparedSkill(id){selectCalls+=1;context.currentBattle.selectedSkillId=id;return{success:true,skillId:id};},
    confirmSelectedBattleSkill(){confirmCalls+=1;context.currentBattle.selectedSkillId=null;return{success:true,executed:true};},
    launchAcademyKakashiOriginPlBattle(){launchCalls+=1;return{success:true};}
  };
  if(nativeActivator){
    context.activateBattlePreparedSkillCard=id=>{nativeCalls+=1;context.currentBattle.selectedSkillId=null;return{success:true,executed:true,skillId:id};};
  }
  context.window=context;context.globalThis=context;
  vm.createContext(context);
  vm.runInContext(src,context,{filename:"runtime/alpha-kakashi-battle-interaction-hotfix-34500.js"});
  return{
    context,card,stage,listeners,cardListeners,
    counts:()=>({nativeCalls,selectCalls,confirmCalls,guideCalls,launchCalls}),
    dispatchClick(){
      let prevented=0,stopped=0,immediate=0,lastResult=null;
      const event={target:card,preventDefault(){prevented+=1;},stopPropagation(){stopped+=1;},stopImmediatePropagation(){immediate+=1;}};
      for(const row of listeners.click||[])lastResult=row.fn(event);
      return{prevented,stopped,immediate,lastResult};
    }
  };
}

// The prior QA only called the exported activator directly. This is the browser
// regression that matters: a rendered card exists, 34500 installs document
// capture, and an actual click delivered through that listener reaches the
// native action bridge exactly once.
const delegated=buildContext({nativeActivator:true});
assert((delegated.listeners.click||[]).some(row=>row.capture===true),"document capture click listener not installed");
const click=delegated.dispatchClick();
assert.strictEqual(click.prevented,1,"delegated click must prevent select-only default path");
assert.strictEqual(click.stopped,1,"delegated click must stop bubbling competitor");
assert.strictEqual(click.immediate,1,"delegated click must stop same-target competitor");
assert.strictEqual(delegated.counts().nativeCalls,1,"rendered click must reach native one-click Battle bridge exactly once");
assert.strictEqual(delegated.counts().selectCalls,0,"native bridge path must not double-select");
assert.strictEqual(delegated.counts().confirmCalls,0,"native bridge path must not double-confirm");
assert.strictEqual(click.lastResult.success,true,"rendered delegated click must report action success");

// If 32700's convenience activator is absent, the same rendered click must still
// traverse the canonical select -> confirm path exactly once.
const fallback=buildContext({nativeActivator:false});
const fallbackClick=fallback.dispatchClick();
assert.strictEqual(fallbackClick.lastResult.success,true,"rendered fallback click failed");
assert.strictEqual(fallback.counts().selectCalls,1,"rendered fallback click must select exactly once");
assert.strictEqual(fallback.counts().confirmCalls,1,"rendered fallback click must confirm exactly once");

// Hover/focus remains presentation only and must never commit a Battle action.
for(const fn of delegated.cardListeners.mouseenter||[])fn({target:delegated.card});
assert.strictEqual(delegated.counts().guideCalls,1,"hover must reach native guide once");
assert.strictEqual(delegated.counts().nativeCalls,1,"hover must not execute a Skill");

// Scope must fail closed outside the exact Kakashi Origin deployment.
delegated.context.currentBattle.kakashiOriginDeployment.controllerParticipantId="other_controller";
const blocked=delegated.context.activateAcademyKakashiBattleSkill34500(exactFive[0]);
assert.strictEqual(blocked.success,false,"34500 must not leak outside Kakashi Origin Battle");

const diagnostics=JSON.parse(JSON.stringify(fallback.context.runAcademyKakashiBattleInteraction34500Diagnostics()));
assert.strictEqual(diagnostics.pass,true,`34500 diagnostics failed: ${(diagnostics.failed||[]).join(",")}`);
assert.strictEqual(diagnostics.browserGoldenClaimed,false);

console.log(JSON.stringify({
  pass:true,
  patch:"34500-v4",
  exactFiveSkillsCanonical:true,
  renderedDomClickExercised:true,
  documentCaptureDelegation:true,
  nativeOneClickExactlyOnce:true,
  selectConfirmFallbackExactlyOnce:true,
  hoverPresentationOnly:true,
  resolverSemanticsUntouched:true,
  cacheDeliveryIdentityCurrent:true,
  browserGoldenClaimed:false
},null,2));
