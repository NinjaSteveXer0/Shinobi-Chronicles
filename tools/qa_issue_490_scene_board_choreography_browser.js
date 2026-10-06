#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.SC490_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.SC490_OUT||"artifacts/scene-board-490";
const EXTENSION=fs.readFileSync(path.join(__dirname,"../runtime/alpha-story-scene-board-expressive-49000.js"),"utf8");
fs.mkdirSync(OUT,{recursive:true});

async function boot(page){
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!(globalThis.SC_STORY_SCENE_BOARD_33900&&globalThis.SC_PHASE2_CE_HOTSPOT_46900&&globalThis.renderStoryScenePresentationLayer),null,{timeout:45000});
  await page.evaluate(()=>{
    try{releaseAlphaFrontDoor33300?.();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    document.querySelector(".game-container")?.removeAttribute("data-alpha-front-door-locked");
    document.getElementById("sc-alpha-front-door-33300")?.remove();
    document.getElementById("sc-alpha-front-door-33400")?.remove();
  });
  await page.addScriptTag({content:EXTENSION});
  const diag=await page.evaluate(()=>runStorySceneBoardExpressive49000Diagnostics());
  assert.strictEqual(diag.pass,true,JSON.stringify(diag.failed));
}
async function setup(page,runId){
  const result=await page.evaluate(fixtureRunId=>{
    localStorage.clear();playerData=createDefaultPlayerData();setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);savePlayerData();
    const selected=selectChronicleOrigin("academy_menma","qa490_origin");
    const identity=commitChronicleRunIdentity43600({runId:fixtureRunId,creationKind:"NEW_START"});
    const completed=completeChronicleOriginPrologue("academy_menma",["qa490_menma_origin"]);
    const desired=["academy_hinata","academy_kakashi"],snapshot=getAcademyTeamFormationSnapshot();
    if(!desired.every(id=>snapshot.eligibleCandidateVariantIds.includes(id)))return{error:"required_team_missing",eligible:snapshot.eligibleCandidateVariantIds};
    selectAcademyTeamFormationTeammate(1,desired[0]);selectAcademyTeamFormationTeammate(2,desired[1]);
    const formed=confirmAcademyTeamFormation("qa490_team",desired),continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore",trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true},{save:true});
    getOriginParticipantContinuityStore43600({create:true}).byKey["academy_kakashi::academy_kakashi_origin_masked_interceptor"]={
      schemaVersion:1,originId:"academy_kakashi",stableParticipantId:"academy_kakashi_origin_masked_interceptor",observerLabel:"Masked Interceptor",
      originOccurrenceRef:"qa490_private_origin_fixture",storySceneInstanceId:"qa490_private_origin_fixture",encounteredByProtagonist:true,
      fieldDispositionState:"AVAILABLE",fieldDispositionOccurrenceRef:"qa490_material_ref",survivedOrigin:true,hiddenPostTestReviewReached:true,
      postTestTruthClass:"staged_konoha_test_participant",protagonistKnowsTestTruth:false,
      materialHistory:{lethalAttempt:false,policeTransfer:false,restraintOrAnbu:false,deliberateRelease:false,miDefeatedKakashi:false,kakashiDefeatedMi:false,otherMaterialEncounter:true},
      materialHistoryRefs:["qa490_material_ref"],captureMode:"qa_fixture_exact",capturedAt:1
    };savePlayerData();
    return{selected,identity,completed,formed,continued,team:getChronicleCurrentTeam43600(),gate:getKonohaCeHotspotEligibility46900()};
  },runId);
  assert(!result.error,JSON.stringify(result));assert.strictEqual(result.selected.success,true);assert.strictEqual(result.identity.success,true);
  assert.strictEqual(result.completed.success,true);assert.strictEqual(result.formed.success,true,JSON.stringify(result.formed));assert.strictEqual(result.continued.success,true);
  assert.deepStrictEqual(result.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);assert.strictEqual(result.gate.available,true,JSON.stringify(result.gate));
}
async function openScene(page){
  await page.evaluate(()=>openOverlay("village"));
  const p01=page.locator('button[data-village-hotspot-id="KON-P01"]');await p01.waitFor({state:"visible",timeout:10000});await p01.dblclick();
  await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.sceneId==="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_menma_v1",null,{timeout:10000});
  await page.waitForSelector(".sc-scene-board-33900",{state:"visible",timeout:10000});
  await page.evaluate(()=>syncStorySceneBoardBenchmark49000());
}
async function stage(page){return page.evaluate(()=>[...document.querySelectorAll(".sc-scene-board-33900__actor")].map(node=>{const r=node.getBoundingClientRect(),s=getComputedStyle(node);return{id:node.dataset.actorId,x:r.x,y:r.y,right:r.right,bottom:r.bottom,opacity:Number(s.opacity),filter:s.filter,benchmark:node.dataset.sc490BenchmarkAnchor||null};}));}
function overlap(a,b){return Math.max(0,Math.min(a.right,b.right)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y));}
async function advanceBeat(page,id){for(let i=0;i<20;i++){const beat=await page.evaluate(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId||null);if(beat!==id)return;const r=await page.evaluate(()=>advanceStoryScene());assert(r&&r.success===true,JSON.stringify(r));await page.waitForTimeout(25);}throw new Error("beat_stuck:"+id);}
async function scenario(browser,width,height,reduced,label){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:reduced?"reduce":"no-preference"});const page=await context.newPage();const errors=await installBrowserRuntimeErrorGate(page);
  try{
    await boot(page);await setup(page,"sc_run_v1_qa490_"+label.replace(/\W+/g,"_"));await openScene(page);await page.waitForTimeout(520);
    const rows=await stage(page),ids=rows.map(r=>r.id);
    assert.deepStrictEqual([...ids].sort(),["academy_hinata","academy_kakashi","academy_kakashi_origin_masked_interceptor","academy_menma"].sort());
    assert(rows.every(r=>r.opacity>=.99&&r.filter==="none"&&r.benchmark==="true"),label+" present-actor presentation drift: "+JSON.stringify(rows));
    for(let i=0;i<rows.length;i++)for(let j=i+1;j<rows.length;j++)assert(overlap(rows[i],rows[j])<1,label+" overlap "+rows[i].id+" / "+rows[j].id);

    const semanticBefore=await page.evaluate(()=>JSON.stringify({decision:playerData.storyDecisionRuntime34000||null,history:playerData.activityHistory||[],ryo:playerData.ryo,inventory:playerData.inventory}));
    const sync=await page.evaluate(()=>syncStorySceneBoardBenchmark49000());assert.strictEqual(sync.success,true);
    const semanticAfter=await page.evaluate(()=>JSON.stringify({decision:playerData.storyDecisionRuntime34000||null,history:playerData.activityHistory||[],ryo:playerData.ryo,inventory:playerData.inventory}));
    assert.strictEqual(semanticAfter,semanticBefore,label+" sync mutated semantic/player state");

    const primitive=await page.evaluate(()=>{const root=document.querySelector(".sc-scene-board-33900"),r=playStoryExpressivePrimitive49000(root,{kind:"SMALL_RECOIL",actorId:"academy_kakashi",durationMs:190,direction:-1}),node=root.querySelector('[data-actor-id="academy_kakashi"]'),a=node.getAnimations()[0];return{r,frames:a?.effect?.getKeyframes?.()||[]};});
    assert.strictEqual(primitive.r.success,true);assert(primitive.frames.length>=2);assert(primitive.frames.every(f=>!f.transform));
    if(reduced){assert(primitive.r.durationMs<=100);assert(primitive.frames.every(f=>!String(f.translate||"").includes("vw")));}else{assert.strictEqual(primitive.r.durationMs,190);assert(primitive.frames.some(f=>String(f.translate||"").includes("vw")));}

    for(const beat of ["ce478_opening","ce478_history","ce478_kakashi_response","ce478_hinata_response"])await advanceBeat(page,beat);
    const choices=await page.locator("#story-scene-presentation-layer .sc-story-choice").allInnerTexts();
    assert.deepStrictEqual(choices,["Ask Kakashi what happened.","Ask her how she knows Kakashi.","Let Kakashi handle it.","Keep moving."]);
    const listeners=await stage(page);assert(listeners.every(r=>r.opacity>=.99),label+" speaker focus dimmed listeners");
    await page.screenshot({path:path.join(OUT,label+".png"),fullPage:true});await errors.assertClean(label);
    return{label,viewport:{width,height},reducedMotion:reduced,choices,primitive:primitive.r};
  }finally{await context.close();}
}
(async()=>{const browser=await chromium.launch({headless:true});try{const results=[];results.push(await scenario(browser,1366,768,false,"1366x768"));results.push(await scenario(browser,1920,1080,false,"1920x1080"));results.push(await scenario(browser,1366,768,true,"1366x768-reduced-motion"));console.log(JSON.stringify({pass:true,results,browserGoldenClaimed:false},null,2));}finally{await browser.close();}})().catch(e=>{console.error(e&&e.stack||e);process.exit(1);});
