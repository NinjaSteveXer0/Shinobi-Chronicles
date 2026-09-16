#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const game=read("game.js");
const worldCore=read("runtime/alpha-world-konoha-112-core.js");
const worldFix=read("runtime/alpha-world-konoha-112-fix.js");
const tutorial=read("runtime/alpha-first-konoha-tutorial-35000.js");
const worldLoader=read("runtime/alpha-world-konoha-112.js");

const storage=new Map(),session=new Map();
const store=map=>({getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k),clear:()=>map.clear()});
const dummy=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},insertBefore(){},remove(){},setAttribute(){},getAttribute(){return null;},querySelector(){return null;},querySelectorAll(){return[];},addEventListener(){},removeEventListener(){},focus(){},click(){},innerHTML:"",textContent:"",value:"",checked:false,disabled:false,firstChild:null,firstElementChild:null});
const context={
  console:{log(){},info(){},warn(){},error(){},table(){}},
  localStorage:store(storage),sessionStorage:store(session),
  document:{readyState:"complete",getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return[];},createElement(){return dummy();},body:dummy(),head:dummy(),addEventListener(){},removeEventListener(){}},
  requestAnimationFrame(){return 0;},cancelAnimationFrame(){},alert(){},confirm(){return true;},prompt(){return null;},Image:function(){return dummy();},
  navigator:{userAgent:"node-issue-209-first-konoha-tutorial"},location:{reload(){},href:"http://localhost/"},addEventListener(){},removeEventListener(){},
  setTimeout,clearTimeout,setInterval,clearInterval,Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,Infinity,NaN
};
context.window=context;context.globalThis=context;vm.createContext(context);
const run=(src,file)=>vm.runInContext(src,context,{filename:file});
const plain=(expr,file="qa209-expression.js")=>JSON.parse(JSON.stringify(run(expr,file)));
const evalPlain=expr=>plain(`(()=>(${expr}))()`);

run(game,"game.js");
run(worldCore,"runtime/alpha-world-konoha-112-core.js");
run(worldFix,"runtime/alpha-world-konoha-112-fix.js");
run(tutorial,"runtime/alpha-first-konoha-tutorial-35000.js");

function reloadAuthoritativeSave(label){
  return plain(`(()=>{savePlayerData();playerData=loadPlayerData();if(typeof setCharacterOwnershipRuntimeAuthority==="function")setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);if(typeof hydrateOwnedProductionRuntimeCharacters==="function")hydrateOwnedProductionRuntimeCharacters(playerData.characterOwnership);const s=ensurePlayerAcquisitionState(),f=s.academyTeamFormation||{};return{label:${JSON.stringify(label)},status:s.onboardingStatus,continuationCompleted:f.continuationCompleted===true,receipt:f.confirmationReceipt||null,tutorial:typeof getFirstKonohaTutorialSnapshot35000==="function"?getFirstKonohaTutorialSnapshot35000():null,freePlay:typeof isAcademyFreePlayAvailable==="function"?isAcademyFreePlayAvailable():false};})()`,`${label}.js`);
}
function teamState(){
  return plain(`(()=>{const s=ensurePlayerAcquisitionState(),f=s.academyTeamFormation||{},r=f.confirmationReceipt||null;return{status:s.onboardingStatus,formationCompleted:f.completed===true,continuationCompleted:f.continuationCompleted===true,receipt:r,teamVariantIds:r&&Array.isArray(r.teamVariantIds)?[...r.teamVariantIds]:[],records:(s.records||[]).length,owned:[...(playerData.characterOwnership&&playerData.characterOwnership.ownedRegistryIds||[])].sort(),clan:[...(playerData.clan&&playerData.clan.teamSlots||[])],history:(playerData.activityHistory||[]).map(x=>({id:x&&x.id,type:x&&x.type,committed:x&&x.committed,data:x&&x.data}))};})()`);
}
function completionHistoryCount(){
  return run(`(playerData.activityHistory||[]).filter(x=>x&&x.committed===true&&String(x.id||"").startsWith("konoha_onboarding_first_team_orientation_completed_v1::")).length`);
}
function standingSnapshot(){
  return plain(`(()=>{const rows=Array.isArray(SC_KONOHA_ALPHA_WORLD_ROWS)?SC_KONOHA_ALPHA_WORLD_ROWS.filter(r=>r.pool==="konoha_alpha_standing_pool_v1"):[];const active=rows.filter(r=>{const l=getWorldEventDimensionState("worldLifecycleByEventId",r.id)||{},a=getWorldEventDimensionState("actionabilityByOpportunityId",r.id)||{},z=getWorldEventDimensionState("resolutionByOpportunityId",r.id)||{};return l.projectable===true&&a.available!==false&&z.closed!==true;});return{rowCount:rows.length,activeIds:active.map(r=>r.id),activeCount:active.length};})()`);
}

// Production wiring and semantic source guards.
assert(worldLoader.includes('alpha-world-konoha-112-core.js'),"World loader lost #112 core");
assert(worldLoader.includes('alpha-world-konoha-112-fix.js'),"World loader lost #112 correction");
assert(worldLoader.includes('alpha-first-konoha-tutorial-35000.js'),"World loader does not install #209 tutorial");
assert(worldFix.includes('academy_first_konoha_tutorial_pending'),"standing refill lacks #209 pending gate");
assert(worldFix.includes('if(isFirstTeamOrientationPending())return 0'),"standing refill does not fail closed while tutorial is pending");
assert(!tutorial.includes("KOH-X12"),"mandatory tutorial must not alias KOH-X12");
assert(worldCore.includes("konoha_alpha_training_observation_drill"),"independent free-play Observation Drill disappeared");
const operationalTransitions=run(`[continueAcademyTeamFormationJourney,focusFirstKonohaTutorialHost35000,enterFirstKonohaTutorialCompound35000,beginFirstKonohaTutorialOrientation35000,resolveFirstKonohaTutorialObservation35000,reportFirstKonohaTutorialReady35000].map(fn=>fn.toString()).join("\\n")`,`battle-guard-source.js`);
assert(!operationalTransitions.includes("startBattle("),"mandatory tutorial must not start Battle");
assert(!operationalTransitions.includes("resolveBattleDamagePacket("),"mandatory tutorial must not resolve Battle damage");
assert(!/\"KON-[OSD]\d+\"/.test(tutorial),"tutorial leaked concealed/optional Konoha location authority");

const diag=plain(`runFirstKonohaTutorial35000Diagnostics()`);
assert.strictEqual(diag.pass,true,`35000 diagnostics failed: ${diag.failed.join(",")}`);
assert.strictEqual(diag.checks.exactHosts,true);
assert.strictEqual(diag.checks.battleAbsent,true);

// Fresh-save traversal through the real Origin -> Active Konoha -> Team Formation owner.
run(`playerData=createDefaultPlayerData();setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);savePlayerData();`,`fresh-save.js`);
const origin=plain(`selectChronicleOrigin("academy_menma","qa209_origin_selection")`,`origin-select.js`);
assert.strictEqual(origin.success,true,"fresh Origin acquisition failed");
const originComplete=plain(`completeChronicleOriginPrologue("academy_menma",["qa209_origin_complete"])`,`origin-complete.js`);
assert.strictEqual(originComplete.success,true,"Origin completion / Active Konoha entry failed");
assert.strictEqual(originComplete.academyTeamFormationRequired,true,"Team Formation did not become mandatory");

const candidates=plain(`getAcademyTeamFormationSnapshot().eligibleCandidateVariantIds.slice(0,2)`);
assert.strictEqual(candidates.length,2,"expected two authoritative Academy teammate candidates");
assert.strictEqual(new Set(candidates).size,2,"candidate authority returned duplicates");
assert(!candidates.includes("academy_menma"),"Origin appeared as its own teammate candidate");
assert.strictEqual(plain(`selectAcademyTeamFormationTeammate(1,${JSON.stringify(candidates[0])})`).success,true);
assert.strictEqual(plain(`selectAcademyTeamFormationTeammate(2,${JSON.stringify(candidates[1])})`).success,true);

const beforeCommit=teamState();
const commit=plain(`confirmAcademyTeamFormation("qa209_team_commit",${JSON.stringify(candidates)})`,`team-commit.js`);
assert.strictEqual(commit.success,true,"Team Formation commit failed");
assert.strictEqual(commit.idempotent,false,"first Team Formation commit was incorrectly idempotent");
const afterCommit=teamState();
assert.strictEqual(afterCommit.formationCompleted,true);
assert.deepStrictEqual(afterCommit.teamVariantIds,["academy_menma",...candidates],"committed squad identity drifted");
assert.strictEqual(new Set(afterCommit.teamVariantIds).size,3,"Team Formation did not commit exactly three distinct shinobi");
assert.strictEqual(afterCommit.clan.filter(Boolean).length,3,"Clan team projection is not exactly three members");
assert(afterCommit.records>beforeCommit.records,"Team Formation did not commit teammate acquisition records");

const repeatCommit=plain(`confirmAcademyTeamFormation("qa209_team_commit_repeat",${JSON.stringify(candidates)})`,`team-repeat.js`);
const afterRepeatCommit=teamState();
assert.strictEqual(repeatCommit.success,true);
assert.strictEqual(repeatCommit.idempotent,true,"repeat Team Formation commit was not idempotent");
assert.strictEqual(afterRepeatCommit.records,afterCommit.records,"repeat Team Formation duplicated acquisition records");
assert.deepStrictEqual(afterRepeatCommit.owned,afterCommit.owned,"repeat Team Formation changed ownership");
assert.deepStrictEqual(afterRepeatCommit.clan,afterCommit.clan,"repeat Team Formation changed squad slots");
assert.strictEqual(afterRepeatCommit.receipt.commitId,afterCommit.receipt.commitId,"repeat Team Formation changed commit receipt");

// Reload before CONTINUE must retain exact receipt and squad while free play stays closed.
const beforeContinueReload=reloadAuthoritativeSave("qa209-reload-before-continue");
assert.strictEqual(beforeContinueReload.continuationCompleted,false);
assert.deepStrictEqual(beforeContinueReload.receipt.teamVariantIds,afterCommit.teamVariantIds);
assert.strictEqual(beforeContinueReload.freePlay,false,"reload before CONTINUE bypassed mandatory journey");

// CONTINUE now enters the mandatory tutorial pending state instead of academy_free_play.
const continued=plain(`continueAcademyTeamFormationJourney()`,`tutorial-continue.js`);
assert.strictEqual(continued.success,true);
assert.strictEqual(continued.freePlayAuthorized,false,"CONTINUE incorrectly authorised free play");
assert.strictEqual(continued.trackedDestination,"KON-P07","CONTINUE did not track General Training Ground");
let tutorialState=plain(`getFirstKonohaTutorialSnapshot35000()`);
assert.strictEqual(tutorialState.phase,"pending");
assert.strictEqual(tutorialState.hostLocationRef,"KON-P07");
assert.strictEqual(tutorialState.localHostRef,"KON-A02");
assert.deepStrictEqual(tutorialState.squadMemberRefs,afterCommit.teamVariantIds,"tutorial did not preserve actual committed squad");
assert.strictEqual(evalPlain(`ensurePlayerAcquisitionState().onboardingStatus`),"academy_first_konoha_tutorial_pending");
assert.strictEqual(evalPlain(`ensurePlayerAcquisitionState().academyTeamFormation.continuationCompleted===true`),false);
assert.strictEqual(evalPlain(`isAcademyFreePlayAvailable()`),false);

const pendingRefill=plain(`ensureKonohaAlphaWorldSemanticRefill({save:false})`,`pending-refill.js`);
assert.strictEqual(pendingRefill.standing,0,"ordinary standing pool refilled before tutorial completion");
assert.strictEqual(standingSnapshot().activeCount,0,"standing opportunities became actionable during onboarding");

// Map focus/select is navigation only: it may advance to host_focused, never complete.
const focused=plain(`focusFirstKonohaTutorialHost35000("KON-P07")`,`host-focus.js`);
assert.strictEqual(focused.success,true);
tutorialState=plain(`getFirstKonohaTutorialSnapshot35000()`);
assert.strictEqual(tutorialState.phase,"host_focused");
assert.strictEqual(tutorialState.completed,false,"map focus counted as tutorial completion");
assert.strictEqual(tutorialState.completionReceipt,null,"map focus fabricated completion receipt");
assert.strictEqual(evalPlain(`isAcademyFreePlayAvailable()`),false);

const duringReload=reloadAuthoritativeSave("qa209-reload-during-host-focus");
assert.strictEqual(duringReload.tutorial.phase,"host_focused","reload lost deterministic tutorial phase");
assert.deepStrictEqual(duringReload.tutorial.squadMemberRefs,afterCommit.teamVariantIds,"reload changed tutorial squad");
assert.strictEqual(duringReload.freePlay,false);

// Existing Training Grounds seam owns KON-P07; tutorial only supplies bounded local interaction.
const entered=plain(`enterFirstKonohaTutorialCompound35000("KON-A02")`,`compound-enter.js`);
assert.strictEqual(entered.success,true);
const begun=plain(`beginFirstKonohaTutorialOrientation35000()`,`orientation-begin.js`);
assert.strictEqual(begun.success,true);
assert.strictEqual(begun.battleStarted,false);
assert.strictEqual(begun.rewardGranted,false);
const orientationReload=reloadAuthoritativeSave("qa209-reload-orientation-started");
assert.strictEqual(orientationReload.tutorial.phase,"orientation_started");
assert.strictEqual(orientationReload.tutorial.orientationStarted,true);
assert.deepStrictEqual(orientationReload.tutorial.squadMemberRefs,afterCommit.teamVariantIds);

const observed=plain(`resolveFirstKonohaTutorialObservation35000()`,`orientation-observe.js`);
assert.strictEqual(observed.success,true);
assert.strictEqual(observed.battleStarted,false);
assert.strictEqual(observed.rewardGranted,false);
assert.strictEqual(observed.performanceFailure,false);
tutorialState=plain(`getFirstKonohaTutorialSnapshot35000()`);
assert.strictEqual(tutorialState.phase,"observation_resolved");
assert.strictEqual(tutorialState.completed,false,"bounded observation auto-completed tutorial");
assert.strictEqual(evalPlain(`isAcademyFreePlayAvailable()`),false,"free play opened before REPORT READY");

const preReady=teamState();
const ready=plain(`reportFirstKonohaTutorialReady35000()`,`report-ready.js`);
assert.strictEqual(ready.success,true);
assert.strictEqual(ready.idempotent,false);
assert.strictEqual(ready.freePlayAuthorized,true);
assert.strictEqual(ready.battleStarted,false);
assert.strictEqual(ready.rewardGranted,false);
assert.strictEqual(ready.completionReceipt.receiptId,"konoha_onboarding_first_team_orientation_completed_v1");
assert.strictEqual(ready.completionReceipt.hostLocationRef,"KON-P07");
assert.strictEqual(ready.completionReceipt.localHostRef,"KON-A02");
assert.deepStrictEqual(ready.completionReceipt.squadMemberRefs,afterCommit.teamVariantIds);
assert.strictEqual(ready.completionReceipt.developmentGranted,false);
assert.strictEqual(ready.completionReceipt.relationshipGranted,false);
assert.strictEqual(evalPlain(`ensurePlayerAcquisitionState().onboardingStatus`),"academy_free_play","academy_free_play did not wait for completion receipt");
assert.strictEqual(evalPlain(`ensurePlayerAcquisitionState().academyTeamFormation.continuationCompleted===true`),true);
assert.strictEqual(evalPlain(`isAcademyFreePlayAvailable()`),true);
assert.strictEqual(completionHistoryCount(),1,"completion history was not committed exactly once");

const postReady=teamState();
assert.strictEqual(postReady.records,preReady.records,"mandatory tutorial granted acquisition/development records");
assert.deepStrictEqual(postReady.owned,preReady.owned,"mandatory tutorial changed ownership");
assert.deepStrictEqual(postReady.clan,preReady.clan,"mandatory tutorial changed squad composition");
const standingAfterReady=standingSnapshot();
assert(standingAfterReady.activeCount>0,"ordinary standing opportunities did not release after completion receipt");

const readyAgain=plain(`reportFirstKonohaTutorialReady35000()`,`report-ready-again.js`);
assert.strictEqual(readyAgain.success,true);
assert.strictEqual(readyAgain.idempotent,true,"repeat REPORT READY duplicated completion");
assert.strictEqual(completionHistoryCount(),1,"repeat REPORT READY duplicated completion history");
assert.strictEqual(teamState().records,postReady.records,"repeat REPORT READY created progression records");

const afterReload=reloadAuthoritativeSave("qa209-reload-after-completion");
assert.strictEqual(afterReload.status,"academy_free_play");
assert.strictEqual(afterReload.continuationCompleted,true);
assert.strictEqual(afterReload.tutorial.phase,"completed");
assert.strictEqual(afterReload.tutorial.completed,true);
assert.strictEqual(afterReload.tutorial.completionReceipt.receiptId,"konoha_onboarding_first_team_orientation_completed_v1");
assert.deepStrictEqual(afterReload.tutorial.squadMemberRefs,afterCommit.teamVariantIds);
assert.strictEqual(afterReload.freePlay,true);
assert.strictEqual(completionHistoryCount(),1,"post-completion reload duplicated history");

const postReloadContinue=plain(`continueAcademyTeamFormationJourney()`,`post-reload-continue.js`);
assert.strictEqual(postReloadContinue.success,true);
assert.strictEqual(postReloadContinue.idempotent,true);
assert.strictEqual(postReloadContinue.freePlayAuthorized,true);
assert.strictEqual(completionHistoryCount(),1,"post-completion CONTINUE duplicated completion history");

console.log(JSON.stringify({
  pass:true,
  issue:209,
  teamFormationCommitExactlyOnce:true,
  tutorialPendingAfterContinue:true,
  trackedDestination:"KON-P07",
  localHost:"KON-A02",
  standingGatedUntilCompletion:true,
  mapFocusCannotComplete:true,
  deterministicReloadBeforeDuringAfter:true,
  exactThreePersonSquadPreserved:true,
  completionReceipt:"konoha_onboarding_first_team_orientation_completed_v1",
  completionHistoryExactlyOnce:true,
  freePlayOnlyAfterReceipt:true,
  battleAbsent:true,
  materialDevelopmentRelationshipGrantAbsent:true,
  independentObservationDrillPreserved:true,
  activeStandingAfterCompletion:standingAfterReady.activeCount,
  browserGoldenClaimed:false
},null,2));