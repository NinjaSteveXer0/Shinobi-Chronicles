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
  "academy_kakashi_substitution_jutsu"
];

assert(src.includes('const VERSION="34500-v6"'),"34500 v6 not active");
assert(!/new\s+MutationObserver\s*\(/.test(src),"34500 must not use a DOM MutationObserver");
assert(!src.includes("card.style.setProperty"),"34500 must not use per-card inline style overrides");
assert(src.includes("buildActionPresentation34500")&&src.includes("captureBattleEvidence34500")&&src.includes("renderKakashiBattlePresentation34500"),"factual Battle presentation chain missing");
assert(src.includes('document.addEventListener(\n      "pointerover",'),"delegated pointer hover missing");
assert(src.includes('document.addEventListener(\n      "focusin",'),"delegated focus learning missing");
assert(src.includes('document.addEventListener(\n      "click",'),"delegated click missing");
assert(src.includes('resolveDelegatedCard34500'),"rendered-card delegation missing");
assert(src.includes('stopImmediatePropagation'),"competing select-only handlers must be suppressed");
assert(src.includes('previewBattlePreparedSkill33000'),"modern exact-id Skill Guide path missing");
assert(src.includes('renderTemporaryBattleSkillGuide'),"native Skill Guide fallback missing");
assert(src.includes('selectBattlePreparedSkill'),"native Battle selection authority missing");
assert(src.includes('confirmSelectedBattleSkill'),"native Battle confirmation authority missing");
assert(src.includes('launchAcademyKakashiOriginPlBattle'),"post-deployment hardening must remain bound");
for(const forbidden of ["resolveBattleDamagePacket(","applyBattleDamage(","consumeBattleActionOpportunity("]){
  assert(!src.includes(forbidden),`34500 must not own Battle semantics: ${forbidden}`);
}
for(const id of exactFive.filter(id=>id!=="academy_kakashi_substitution_jutsu"))assert(gameSrc.includes(id),`game.js missing Kakashi authored Skill ${id}`);
const substitutionSrc=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-substitution-34900.js"),"utf8");
assert(substitutionSrc.includes('const SKILL_ID="academy_kakashi_substitution_jutsu"'),"34900 substitution authority missing");
assert(!/new\s+MutationObserver\s*\(/.test(substitutionSrc),"34900 must not race 34500 with another DOM observer");
assert(substitutionSrc.includes("activateAcademyKakashiBattleSkill34500"),"34900 interaction must delegate to 34500");
assert(gameSrc.includes("function confirmSelectedBattleSkill()"),"native confirm owner missing");
assert(gameSrc.includes("const result=attemptBattlePreparedSkill(skillId,targetParticipantId,options)"),"native confirm no longer dispatches through Battle skill authority");
assert(gameSrc.includes("function attemptClosureWaveBattleSkill("),"factory/closure Battle resolver missing");

// Browser RED on the Story/continuation lane proved the production parent URLs
// must advance with the Kakashi children. Keep the Battle interaction layer on
// that same coherent delivery generation until the next deliberate cache bump.
assert(originSrc.includes('runtime/alpha-story-decision-realisation-34000.js?sc=story-decision-20260922-24'),
  "32900 Story-decision parent identity is stale");
assert(decisionSrc.includes('runtime/alpha-kakashi-final-origin-adapter-34100.js?sc=kakashi-final-20260922-96'),
  "34000 Kakashi adapter parent identity is stale");
assert(adapterSrc.includes('const BUILD="kakashi-final-20260922-96";'),
  "34100 must request current Kakashi child cache identity");
assert(adapterSrc.includes('script.id=id;script.src=`${path}?sc=${BUILD}`;script.async=false;'),
  "34100 generic child loader must version children by current Kakashi BUILD");
assert(adapterSrc.includes('appendScript("sc-alpha-kakashi-battle-interaction-hotfix-34500-script",BATTLE_INTERACTION_PATH,loadFactualProvider);'),
  "34500 child is not routed through the BUILD-versioned generic loader");

function makeClassList(classes=[]){
  const set=new Set(classes);
  return{contains:name=>set.has(name),add:name=>set.add(name),remove:name=>set.delete(name)};
}

function buildContext(){
  const listeners={};
  const cardListeners={};
  const actor={id:"academy_kakashi"};
  const definitions=Object.fromEntries(exactFive.map(id=>[id,{id,displayName:id,ownerRegistryId:"academy_kakashi"}]));
  const style={setProperty(){}};
  const card={
    disabled:false,dataset:{skillId:exactFive[0]},classList:makeClassList(["battle-dev-skill-card","is-ready"]),textContent:"Academy Kakashi Kunai Quickdraw",style,
    getAttribute(name){return name==="onclick"?`selectBattlePreparedSkill('${this.dataset.skillId}')`:null;},
    setAttribute(){},removeAttribute(){},querySelector(){return null;},contains(node){return node===this;},
    addEventListener(type,fn){(cardListeners[type]||(cardListeners[type]=[])).push(fn);},
    closest(){return card;}
  };
  const stage={
    classList:makeClassList(),
    querySelector(){return null;},querySelectorAll(){return[card];},contains(node){return node===card;},matches(sel){return sel===".alpha-code-battle-stage";}
  };
  const document={
    body:{},documentElement:{dataset:{}},head:{},
    addEventListener(type,fn,capture){(listeners[type]||(listeners[type]=[])).push({fn,capture});},
    querySelector(selector){return selector===".alpha-code-battle-stage"?stage:null;},
    getElementById(){return null;}
  };
  let selectCalls=0,confirmCalls=0,guideCalls=0,launchCalls=0;
  const context={
    console,document,window:null,globalThis:null,WeakSet,Set,Map,Object,Array,String,Number,Boolean,RegExp,Date,Math,JSON,Error,
    queueMicrotask(fn){fn();},setTimeout(fn){fn();return 1;},clearTimeout(){},MutationObserver:undefined,
    currentBattle:{active:true,battleOver:false,battleId:"qa_kakashi_battle",kakashiOriginDeployment:{controllerParticipantId:"academy_kakashi"},selectedSkillId:null,runtime:{evidence:[]}},
    getBattleDeploymentParticipant(side,slot){return side==="player"&&slot===1?actor:null;},
    getBattleUISkillPalettePresentation(){return{skillIds:[...exactFive]};},
    getBattlePreparedSkillDefinition(row,id){assert.strictEqual(row,actor);return definitions[id]||null;},
    getBattlePreparedSkillDefaultTarget(){return{participant:{id:"masked_interceptor"}};},
    getBattleParticipantByIdentity(side,id){return{id,name:id==="academy_kakashi"?"Kakashi":id==="masked_interceptor"?"Masked Interceptor":id};},
    evaluateBattlePreparedSkillAvailability(){return{available:true};},
    previewBattlePreparedSkill33000(id){guideCalls+=1;assert(exactFive.includes(id));return true;},
    renderTemporaryBattleSkillGuide(id){guideCalls+=1;assert(exactFive.includes(id));},
    selectBattlePreparedSkill(id){selectCalls+=1;context.currentBattle.selectedSkillId=id;return{success:true,skillId:id};},
    syncBattleActionRegionState(){return{selectedSkillId:context.currentBattle.selectedSkillId};},
    confirmSelectedBattleSkill(){confirmCalls+=1;const id=context.currentBattle.selectedSkillId;context.currentBattle.selectedSkillId=null;return{success:true,executed:true,skillId:id};},
    launchAcademyKakashiOriginPlBattle(){launchCalls+=1;return{success:true};},
    recordBattleEvidence(row){const out={...row,evidenceId:`qa_ev_${context.currentBattle.runtime.evidence.length+1}`};context.currentBattle.runtime.evidence.push(out);return out;}
  };
  context.window=context;context.globalThis=context;
  vm.createContext(context);
  vm.runInContext(src,context,{filename:"runtime/alpha-kakashi-battle-interaction-hotfix-34500.js"});
  function dispatch(type,{relatedTarget=null}={}){
    let prevented=0,stopped=0,immediate=0,lastResult=null;
    const event={target:card,relatedTarget,preventDefault(){prevented+=1;},stopPropagation(){stopped+=1;},stopImmediatePropagation(){immediate+=1;}};
    for(const row of listeners[type]||[])lastResult=row.fn(event);
    return{prevented,stopped,immediate,lastResult};
  }
  return{
    context,card,stage,listeners,cardListeners,
    counts:()=>({selectCalls,confirmCalls,guideCalls,launchCalls}),
    dispatch
  };
}

const delegated=buildContext();
assert((delegated.listeners.pointerover||[]).some(row=>row.capture===true),"document capture pointerover listener not installed");
assert((delegated.listeners.focusin||[]).some(row=>row.capture===true),"document capture focusin listener not installed");
assert((delegated.listeners.click||[]).some(row=>row.capture===true),"document capture click listener not installed");

delegated.card.dataset.skillId=exactFive[2];
const hover=delegated.dispatch("pointerover");
assert.strictEqual(delegated.counts().guideCalls,1,"delegated hover must render exactly one Skill Guide");
assert.strictEqual(delegated.counts().selectCalls,0,"hover must not select a Skill");
assert.strictEqual(delegated.counts().confirmCalls,0,"hover must not commit a Skill");
assert(hover.lastResult&&hover.lastResult.success===true,"hover must report presentation success");

delegated.card.dataset.skillId=exactFive[4];
const focus=delegated.dispatch("focusin");
assert.strictEqual(delegated.counts().guideCalls,2,"delegated focus must render the focused Skill Guide");
assert.strictEqual(delegated.counts().selectCalls,0,"focus must not select a Skill");
assert.strictEqual(delegated.counts().confirmCalls,0,"focus must not commit a Skill");
assert(focus.lastResult&&focus.lastResult.success===true,"focus must report presentation success");

delegated.card.dataset.skillId=exactFive[0];
const click=delegated.dispatch("click");
assert.strictEqual(click.prevented,1,"delegated click must prevent select-only default path");
assert.strictEqual(click.stopped,1,"delegated click must stop bubbling competitor");
assert.strictEqual(click.immediate,1,"delegated click must stop same-target competitor");
assert.strictEqual(delegated.counts().selectCalls,1,"rendered click must select exactly once");
assert.strictEqual(delegated.counts().confirmCalls,1,"rendered click must confirm exactly once");
assert.strictEqual(click.lastResult.success,true,"rendered delegated click must report action success");
assert.strictEqual(delegated.context.currentBattle.selectedSkillId,null,"committed direct click must not leave stale selected Skill state");

const actionId="qa_action_1";
delegated.context.recordBattleEvidence({eventType:"damage_resolved",actionId,actorRef:{side:"player",participantId:"academy_kakashi"},targetRef:{side:"enemy",participantId:"masked_interceptor"},skillId:exactFive[0],data:{absorbedPL:12,finalDamage:12,preDefenseAttackPL:15,resolvedAttackPL:15,staminaMitigationAmount:3}});
delegated.context.recordBattleEvidence({eventType:"skill_action_completed",committedOccurrence:true,actionId,actorRef:{side:"player",participantId:"academy_kakashi"},targetRef:{side:"enemy",participantId:"masked_interceptor"},skillId:exactFive[0],stateRefs:[],data:{resolved:true,damageApplied:true,finalDamage:12}});
assert.strictEqual(delegated.context.currentBattle.kakashiOriginPresentation34500.plLoss,12,"Battle presentation must project committed Battle PL loss");
assert.strictEqual(delegated.context.currentBattle.kakashiOriginPresentation34500.actorName,"Kakashi","Battle presentation actor must come from Battle participant state");
assert.strictEqual(delegated.context.currentBattle.kakashiOriginPresentation34500.targetName,"Masked Interceptor","Battle presentation target must come from Battle participant state");
assert(delegated.context.currentBattle.kakashiOriginPresentation34500.resultText.includes("12 BATTLE PL LOST"),"Battle presentation must make factual impact legible");

delegated.card.onmouseenter=()=>{};
delegated.card.onfocus=()=>{};
delegated.context.hardenAcademyKakashiBattleDOM34500(delegated.stage);
assert.strictEqual(delegated.card.onmouseenter,null,"harden pass must clear competing mouseenter handler");
assert.strictEqual(delegated.card.onfocus,null,"harden pass must clear competing focus handler");

delegated.context.currentBattle.kakashiOriginDeployment.controllerParticipantId="other_controller";
const blocked=delegated.context.activateAcademyKakashiBattleSkill34500(exactFive[0]);
assert.strictEqual(blocked.success,false,"34500 must not leak outside Kakashi Origin Battle");

const diagnostics=JSON.parse(JSON.stringify(delegated.context.runAcademyKakashiBattleInteraction34500Diagnostics()));
assert.strictEqual(diagnostics.pass,true,`34500 diagnostics failed: ${(diagnostics.failed||[]).join(",")}`);
assert.strictEqual(diagnostics.browserGoldenClaimed,false);

console.log(JSON.stringify({
  pass:true,
  patch:"34500-v6",
  exactFiveSkillsCanonical:true,
  renderedDomHoverExercised:true,
  renderedDomFocusExercised:true,
  renderedDomClickExercised:true,
  documentCaptureDelegation:true,
  explicitSelectConfirmExactlyOnce:true,
  hoverPresentationOnly:true,
  rerenderHandlerHardening:true,
  factualActionImpactPresentation:true,
  singleBattleInteractionOwner:true,
  resolverSemanticsUntouched:true,
  kakashiChildCacheIdentity:"kakashi-final-20260922-96",
  browserGoldenClaimed:false
},null,2));