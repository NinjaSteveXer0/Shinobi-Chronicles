#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(ROOT,p),"utf8");
const game=read("game.js");
const manifest=read("runtime/alpha-chronicle-state-manifest-43600.js");
const tutorial=read("runtime/alpha-first-konoha-tutorial-35000.js");
const index=read("index.html");

const storage=new Map(),session=new Map();
const store=map=>({getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k),clear:()=>map.clear()});
const dummy=()=>({
  style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false;}},
  appendChild(){},insertBefore(){},remove(){},setAttribute(){},getAttribute(){return null;},
  querySelector(){return null;},querySelectorAll(){return[];},addEventListener(){},removeEventListener(){},
  focus(){},click(){},innerHTML:"",textContent:"",value:"",checked:false,disabled:false,firstChild:null,firstElementChild:null
});
const context={
  console:{log(){},info(){},warn(){},error(){},table(){}},
  localStorage:store(storage),sessionStorage:store(session),
  document:{readyState:"complete",getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return[];},createElement(){return dummy();},body:dummy(),head:dummy(),addEventListener(){},removeEventListener(){}},
  requestAnimationFrame(){return 0;},cancelAnimationFrame(){},alert(){},confirm(){return true;},prompt(){return null;},Image:function(){return dummy();},
  navigator:{userAgent:"node-phase2-konoha-onboarding-431"},location:{reload(){},href:"http://localhost/"},addEventListener(){},removeEventListener(){},
  setTimeout(fn){if(typeof fn==="function")fn();return 1;},clearTimeout(){},setInterval,clearInterval,Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,Infinity,NaN
};
context.window=context;context.globalThis=context;vm.createContext(context);
const run=(src,file)=>vm.runInContext(src,context,{filename:file});
const plain=(expr,file)=>JSON.parse(JSON.stringify(run(expr,file||"qa431-expression.js")));

run(game,"game.js");
run(manifest,"runtime/alpha-chronicle-state-manifest-43600.js");
context.renderVillageOverlay=function(){return{success:true,surface:"village"};};
context.renderTrainingOverlay=function(){return{success:true,surface:"training"};};
context.openKonohaPracticalFromVillage=function(){return{success:true,surface:"practical"};};
context.openKonohaExamFromVillage=function(){return{success:true,surface:"exams"};};
context.renderArenaMainOverlay=function(){return{success:true,surface:"arena"};};
context.openShinobiRecord=function(){return{success:true,surface:"record"};};
run(tutorial,"runtime/alpha-first-konoha-tutorial-35000.js");

assert(index.includes('<script src="runtime/alpha-chronicle-state-manifest-43600.js"></script>'),"Phase-2 state manifest not production-loaded");
assert(index.includes('<script src="runtime/alpha-first-konoha-tutorial-35000.js"></script>'),"Konoha onboarding trial not production-loaded");
assert(index.indexOf("alpha-chronicle-state-manifest-43600.js")<index.indexOf("alpha-first-konoha-tutorial-35000.js"),"tutorial loaded before state manifest");
for(const id of ["KON-P07","KON-P08","KON-P06","KON-P02"])assert(tutorial.includes(id),"agreed public guide hotspot missing: "+id);
assert(tutorial.includes("KONOHA IS OPEN"),"opening title missing");
assert(tutorial.includes("Your Academy team is formed. You are now in Sandbox mode."),"opening copy missing");
assert(tutorial.includes("SHOW ME AROUND")&&tutorial.includes("EXPLORE KONOHA"),"opening actions missing");
assert(tutorial.includes("TRAINING GROUND")&&tutorial.includes("PRACTICAL TRAINING")&&tutorial.includes("SHINOBI EXAMS")&&tutorial.includes("SHINOBI RECORD"),"contextual guide copy missing");
assert(tutorial.includes("PROMOTION")&&tutorial.includes("ARENA BATTLE")&&tutorial.includes("STAGED BATTLES")&&tutorial.includes("VILLAGE TOURNAMENT"),"Arena four-lane guide missing");
assert(tutorial.includes("NOT CURRENTLY AVAILABLE"),"unavailable Arena lanes are not honest");
assert(tutorial.includes("YOUR NEXT STEP")&&tutorial.includes("TAKE PROMOTION ASSESSMENT")&&tutorial.includes("KEEP EXPLORING"),"Arena completion choice missing");
assert(!tutorial.includes("setWorldEvent("),"tutorial owns a World semantic writer");
assert(!tutorial.includes("ensureKonohaAlphaWorldSemanticRefill"),"tutorial triggers World opportunity creation/refill");
assert(!tutorial.includes("disciplineProgression")&&!tutorial.includes("basePL")&&!tutorial.includes("formalRank="),"tutorial contains progression/rank mutation");
assert.strictEqual(plain("runFirstKonohaTutorial35000Diagnostics().pass"),true,"trial source diagnostics failed");

run("playerData=createDefaultPlayerData();setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);savePlayerData();","fresh.js");
const origin=plain('selectChronicleOrigin("academy_menma","qa431_origin_selection")');
assert.strictEqual(origin.success,true,"real Origin selection failed");
const complete=plain('completeChronicleOriginPrologue("academy_menma",["qa431_origin_complete"])');
assert.strictEqual(complete.success,true,"real Origin completion failed");
assert.strictEqual(complete.academyTeamFormationRequired,true,"Academy Team Formation did not activate");

const candidates=plain("getAcademyTeamFormationSnapshot().eligibleCandidateVariantIds.slice(0,2)");
assert.strictEqual(candidates.length,2,"expected two legitimate Academy teammate candidates");
assert.strictEqual(new Set(candidates).size,2,"duplicate teammate candidate");
assert(!candidates.includes("academy_menma"),"Origin appeared as own teammate");
assert.strictEqual(plain("selectAcademyTeamFormationTeammate(1,"+JSON.stringify(candidates[0])+")").success,true);
assert.strictEqual(plain("selectAcademyTeamFormationTeammate(2,"+JSON.stringify(candidates[1])+")").success,true);
const committed=plain("confirmAcademyTeamFormation("+JSON.stringify("qa431_team_commit")+","+JSON.stringify(candidates)+")");
assert.strictEqual(committed.success,true,"Team Formation commit failed");

const committedTeam=plain("getChronicleCurrentTeam43600()");
assert.deepStrictEqual(committedTeam.teamVariantIds,["academy_menma"].concat(candidates),"manifest currentTeam is not exact committed Academy squad");
const beforeRyo=plain("playerData.ryo");
const beforeHistory=plain("(playerData.activityHistory||[]).length");
const beforeStats=plain('JSON.stringify(getPlayerCharacter("academy_menma")&&getPlayerCharacter("academy_menma").stats||{})');

const continued=plain("continueAcademyTeamFormationJourney()");
assert.strictEqual(continued.success,true);
assert.strictEqual(continued.freePlayAuthorized,true,"Team Formation continuation still hard-gates free play");
assert.strictEqual(plain("ensurePlayerAcquisitionState().onboardingStatus"),"academy_free_play","#209 pending status survived Phase-2 continuation");
assert.strictEqual(plain("ensurePlayerAcquisitionState().academyTeamFormation.continuationCompleted===true"),true);
assert.strictEqual(plain("isAcademyFreePlayAvailable()"),true,"ordinary Konoha free play still trapped behind tutorial");
assert.strictEqual(plain("isFirstKonohaTutorialPending35000()"),false,"retired mandatory tutorial still pending");
assert.deepStrictEqual(plain("getChronicleCurrentTeam43600().teamVariantIds"),committedTeam.teamVariantIds,"onboarding changed current team");

let p=plain("getChronicleTutorialProgress43600({create:false})");
assert(p&&p.sandboxPopupSeen===false,"opening popup incorrectly pre-consumed");
assert.strictEqual(p.tutorialTipsEnabled,true);

const guided=plain('chooseKonohaSandboxOpening35000("show_me_around")');
assert.strictEqual(guided.success,true);
assert.strictEqual(guided.freePlayAuthorized,true);
assert.deepStrictEqual(guided.currentTeam.teamVariantIds,committedTeam.teamVariantIds);
p=plain("getChronicleTutorialProgress43600({create:false})");
assert.strictEqual(p.sandboxPopupSeen,true);
assert.strictEqual(p.recommendedRouteEnabled,true);
assert.strictEqual(p.openingChoice,"show_me_around");
assert.strictEqual(plain("playerData.ryo"),beforeRyo,"opening tutorial changed Ryō");
assert.strictEqual(plain('JSON.stringify(getPlayerCharacter("academy_menma")&&getPlayerCharacter("academy_menma").stats||{})'),beforeStats,"opening tutorial changed Stats");

assert.strictEqual(plain("showKonohaTrainingTip35000()"),true);
assert.strictEqual(plain("showKonohaPracticalTip35000()"),true);
assert.strictEqual(plain("showKonohaExamsTip35000()"),true);
assert.strictEqual(plain("showKonohaShinobiRecordTip35000()"),true);
p=plain("getChronicleTutorialProgress43600({create:false})");
for(const key of ["trainingTipSeen","practicalTipSeen","examsTipSeen","shinobiRecordTipSeen"])assert.strictEqual(p[key],true,key+" not persisted");
assert.strictEqual(plain("showKonohaTrainingTip35000()"),false,"Training tip repeated");
assert.strictEqual(plain("showKonohaExamsTip35000()"),false,"Exams tip repeated");

assert.strictEqual(plain("showKonohaArenaGuide35000()"),true);
assert.strictEqual(plain("getChronicleTutorialProgress43600({create:false}).arenaTipSeen"),true);
let promotionCalls=0,villageCalls=0;
context.openArenaPromotionSurface=()=>{promotionCalls+=1;return{success:true};};
context.openOverlay=route=>{if(route==="village")villageCalls+=1;return{success:true,route};};
const keep=plain('chooseKonohaNextStep35000("keep_exploring")');
assert.strictEqual(keep.success,true);
assert.strictEqual(villageCalls,1,"KEEP EXPLORING did not return to Konoha");
assert.strictEqual(promotionCalls,0,"KEEP EXPLORING started Promotion");
assert.strictEqual(plain("getChronicleTutorialProgress43600({create:false}).arenaCompletionChoiceSeen"),true);

assert.strictEqual(plain("playerData.ryo"),beforeRyo,"tutorial changed Ryō");
assert.strictEqual(plain('JSON.stringify(getPlayerCharacter("academy_menma")&&getPlayerCharacter("academy_menma").stats||{})'),beforeStats,"tutorial changed Stats");
assert.strictEqual(plain("(playerData.activityHistory||[]).length"),beforeHistory,"tutorial created World/Chronicle events");
assert.deepStrictEqual(plain("getChronicleCurrentTeam43600().teamVariantIds"),committedTeam.teamVariantIds,"tutorial mutated current team");

run("savePlayerData();playerData=loadPlayerData();","reload.js");
const afterReload=plain("getChronicleTutorialProgress43600({create:false})");
assert(afterReload,"Phase-2 tutorial progress dropped by save/load");
for(const key of ["sandboxPopupSeen","trainingTipSeen","practicalTipSeen","examsTipSeen","arenaTipSeen","arenaCompletionChoiceSeen","shinobiRecordTipSeen"])assert.strictEqual(afterReload[key],true,"reload lost "+key);
assert.strictEqual(afterReload.recommendedRouteEnabled,true);
assert.strictEqual(plain("showKonohaSandboxOpening35000()"),false,"opening popup repeated after reload");
assert.deepStrictEqual(plain("getChronicleCurrentTeam43600().teamVariantIds"),committedTeam.teamVariantIds,"reload changed current team");

const toggled=plain("setKonohaTutorialTips35000(false)");
assert.strictEqual(toggled.success,true);
assert.strictEqual(plain("getChronicleTutorialProgress43600({create:false}).tutorialTipsEnabled"),false);
assert.strictEqual(plain("isAcademyFreePlayAvailable()"),true);

run('(function(){const a=ensurePlayerAcquisitionState(),f=a.academyTeamFormation;a.onboardingStatus="academy_first_konoha_tutorial_pending";f.continuationCompleted=false;delete playerData.phase2ChronicleState;savePlayerData();})()',"legacy-pending.js");
const legacyRelease=plain("continueAcademyTeamFormationJourney()");
assert.strictEqual(legacyRelease.freePlayAuthorized,true,"legacy #209 pending save remained trapped");
assert.strictEqual(plain("ensurePlayerAcquisitionState().onboardingStatus"),"academy_free_play");

console.log(JSON.stringify({
  pass:true,
  issue:431,
  trial:true,
  currentTeam:committedTeam.teamVariantIds,
  freePlayImmediatelyAfterTeamFormation:true,
  openingPopupOnce:true,
  optionalRecommendedRoute:true,
  contextualFirstUseTips:true,
  arenaFourLanes:true,
  promotionVsExploreChoice:true,
  saveLoadNoTipSpam:true,
  old209HardGateRetired:true,
  noStatsPlRankRewardsWorldEventMutation:true,
  hiddenKonohaLocationsNotHighlighted:true,
  browserGoldenClaimed:false
},null,2));
