#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.SC490_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.SC490_OUT||"artifacts/scene-board-490";
const RUNTIME_SOURCE=fs.readFileSync(path.join(__dirname,"../runtime/alpha-story-scene-board-expressive-49000.js"),"utf8");
fs.mkdirSync(OUT,{recursive:true});

async function waitBaseRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_STORY_SCENE_BOARD_33900&&
    globalThis.SC_PHASE2_CE_HOTSPOT_46900&&
    typeof globalThis.getKonohaCeHotspotEligibility46900==="function"&&
    typeof globalThis.renderStoryScenePresentationLayer==="function"
  ),null,{timeout:45000});
}
async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function inject490(page){
  await page.addScriptTag({content:RUNTIME_SOURCE});
  const diag=await page.evaluate(()=>runStorySceneBoardExpressive49000Diagnostics());
  assert.strictEqual(diag.pass,true,"#490 diagnostics failed: "+JSON.stringify(diag.failed));
  assert.strictEqual(diag.browserGoldenClaimed,false);
}
async function setupMenmaBenchmark(page,runId){
  const result=await page.evaluate((fixtureRunId)=>{
    localStorage.clear();
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma","qa490_origin");
    const identity=commitChronicleRunIdentity43600({runId:fixtureRunId,creationKind:"NEW_START"});
    const completed=completeChronicleOriginPrologue("academy_menma",["qa490_menma_origin"]);
    const snapshot=getAcademyTeamFormationSnapshot();
    const desired=["academy_hinata","academy_kakashi"];
    if(!desired.every(id=>snapshot.eligibleCandidateVariantIds.includes(id)))return{error:"required_team_missing",eligible:snapshot.eligibleCandidateVariantIds};
    const one=selectAcademyTeamFormationTeammate(1,desired[0]);
    const two=selectAcademyTeamFormationTeammate(2,desired[1]);
    const formed=confirmAcademyTeamFormation("qa490_team",desired);
    const continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({
      sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore",
      trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,
      arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true
    },{save:true});
    const continuityStore=getOriginParticipantContinuityStore43600({create:true});
    continuityStore.byKey["academy_kakashi::academy_kakashi_origin_masked_interceptor"]={
      schemaVersion:1,
      originId:"academy_kakashi",
      stableParticipantId:"academy_kakashi_origin_masked_interceptor",
      observerLabel:"Masked Interceptor",
      originOccurrenceRef:"qa490_private_origin_fixture",
      storySceneInstanceId:"qa490_private_origin_fixture",
      encounteredByProtagonist:true,
      fieldDispositionState:"AVAILABLE",
      fieldDispositionOccurrenceRef:"qa490_material_ref",
      survivedOrigin:true,
      hiddenPostTestReviewReached:true,
      postTestTruthClass:"staged_konoha_test_participant",
      protagonistKnowsTestTruth:false,
      materialHistory:{
        lethalAttempt:false,policeTransfer:false,restraintOrAnbu:false,deliberateRelease:false,
        miDefeatedKakashi:false,kakashiDefeatedMi:false,otherMaterialEncounter:true
      },
      materialHistoryRefs:["qa490_material_ref"],
      captureMode:"qa_fixture_exact",
      capturedAt:1
    };
    savePlayerData();
    return{selected,identity,completed,one,two,formed,continued,team:getChronicleCurrentTeam43600(),eligibility:getKonohaCeHotspotEligibility46900()};
  },runId);
  assert(!result.error,JSON.stringify(result));
  assert.strictEqual(result.selected.success,true);
  assert.strictEqual(result.identity.success,true);
  assert.strictEqual(result.completed.success,true);
  assert.strictEqual(result.formed.success,true,JSON.stringify(result.formed));
  assert.strictEqual(result.continued.success,true);
  assert.deepStrictEqual(result.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);
  assert.strictEqual(result.eligibility.available,true,JSON.stringify(result.eligibility));
  assert.strictEqual(result.eligibility.mode,"menma_private_history_emergence");
}
async function openBenchmark(page){
  await page.evaluate(()=>openOverlay("village"));
  await page.waitForSelector('button[data-village-hotspot-id="KON-P01"]',{state:"visible",timeout:10000});
  await page.locator('button[data-village-hotspot-id="KON-P01"]').dblclick();
  await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.sceneId==="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_menma_v1",null,{timeout:10000});
  await page.waitForSelector("#story-scene-presentation-layer .sc-scene-board-33900",{state:"visible",timeout:10000});
  await page.evaluate(()=>syncStorySceneBoardBenchmark49000());
}
async function stageSnapshot(page){
  return page.evaluate(()=>{
    const board=document.querySelector(".sc-scene-board-33900");
    const nodes=[...document.querySelectorAll(".sc-scene-board-33900__actor")];
    const rows=nodes.map(node=>{
      const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
      return{
        id:node.dataset.actorId,label:node.dataset.actorLabel,anchor:node.dataset.scStageAnchor,
        x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom,
        opacity:Number(cs.opacity),filter:cs.filter,transform:cs.transform,
        translate:cs.translate,rotate:cs.rotate,scale:cs.scale,
        benchmarkAnchor:node.dataset.sc490BenchmarkAnchor||null
      };
    });
    const br=board.getBoundingClientRect();
    return{board:{x:br.x,y:br.y,width:br.width,height:br.height,right:br.right,bottom:br.bottom},rows};
  });
}
function overlap(a,b){return Math.max(0,Math.min(a.right,b.right)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y));}
async function advanceBeat(page,beatId,max=20){
  for(let i=0;i<max;i++){
    const active=await page.evaluate(()=>globalThis.getActiveStorySceneRuntime?.());
    if(!active||active.beatId!==beatId)return;
    const result=await page.evaluate(()=>advanceStoryScene());
    assert(result&&result.success===true,"advance failed for "+beatId+": "+JSON.stringify(result));
    await page.waitForTimeout(25);
  }
  throw new Error("beat did not advance: "+beatId);
}
async function runScenario(browser,{viewport,reducedMotion,label}){
  const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:reducedMotion?"reduce":"no-preference"});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitBaseRuntime(page);
    await releaseFrontDoor(page);
    await inject490(page);
    await setupMenmaBenchmark(page,"sc_run_v1_qa490_"+label.replace(/[^a-z0-9]+/gi,"_").toLowerCase());
    await openBenchmark(page);

    const semanticBefore=await page.evaluate(()=>JSON.stringify({
      activityHistory:playerData.activityHistory||[],ryo:playerData.ryo,inventory:playerData.inventory,
      record:getKonohaCeHotspotResolvedRecord46900?.()||null
    }));
    const first=await stageSnapshot(page);
    const ids=first.rows.map(row=>row.id);
    for(const id of ["academy_menma","academy_hinata","academy_kakashi","academy_kakashi_origin_masked_interceptor"]){
      assert(ids.includes(id),label+" missing benchmark actor "+id+": "+JSON.stringify(first.rows));
    }
    assert.strictEqual(first.rows.length,4,label+" must render exactly four benchmark actors");
    for(const row of first.rows){
      assert(row.opacity>=0.99,label+" faded present actor "+row.id);
      assert(row.filter==="none"||row.filter==="none none",label+" desaturated present actor "+row.id+": "+row.filter);
      assert.strictEqual(row.benchmarkAnchor,"true",label+" actor missing benchmark anchor "+row.id);
    }
    for(let i=0;i<first.rows.length;i++)for(let j=i+1;j<first.rows.length;j++){
      assert(overlap(first.rows[i],first.rows[j])<1,label+" actor overlap: "+first.rows[i].id+" / "+first.rows[j].id);
    }

    const primitive=await page.evaluate(()=>{
      const root=document.querySelector(".sc-scene-board-33900");
      const result=playStoryExpressivePrimitive49000(root,{kind:"SMALL_RECOIL",actorId:"academy_kakashi",durationMs:190,direction:-1});
      const node=root.querySelector('[data-actor-id="academy_kakashi"]');
      const animation=node.getAnimations()[0];
      const frames=animation&&animation.effect&&animation.effect.getKeyframes?animation.effect.getKeyframes():[];
      return{result,frames,anchorTransform:getComputedStyle(node).transform};
    });
    assert.strictEqual(primitive.result.success,true);
    assert(primitive.frames.length>=2,label+" primitive produced no animation frames");
    assert(primitive.frames.every(frame=>!Object.prototype.hasOwnProperty.call(frame,"transform")||!frame.transform),label+" expressive primitive animated transform");
    assert(primitive.frames.some(frame=>String(frame.translate||"").includes("vw"))||reducedMotion,label+" normal-motion recoil lacked translate longhand");
    if(reducedMotion){
      assert(primitive.result.durationMs<=100,label+" reduced motion exceeded 100ms");
      assert(primitive.frames.every(frame=>String(frame.translate||"0 0")==="0 0"||String(frame.translate||"")==="none"),label+" reduced motion retained spatial recoil");
    }else{
      assert.strictEqual(primitive.result.durationMs,190,label+" normal duration drifted");
    }

    await advanceBeat(page,"ce478_opening");
    await advanceBeat(page,"ce478_history");
    await advanceBeat(page,"ce478_kakashi_response");
    await advanceBeat(page,"ce478_hinata_response");
    const choices=await page.locator("#story-scene-presentation-layer .sc-story-choice").allInnerTexts();
    assert.deepStrictEqual(choices,[
      "Ask Kakashi what happened.",
      "Ask her how she knows Kakashi.",
      "Let Kakashi handle it.",
      "Keep moving."
    ],label+" Story choice text changed");
    const choiceStage=await stageSnapshot(page);
    assert(choiceStage.rows.every(row=>row.opacity>=0.99),label+" speaker focus dimmed listeners");
    const semanticAfter=await page.evaluate(()=>JSON.stringify({
      activityHistory:playerData.activityHistory||[],ryo:playerData.ryo,inventory:playerData.inventory,
      record:getKonohaCeHotspotResolvedRecord46900?.()||null
    }));
    const before=JSON.parse(semanticBefore),after=JSON.parse(semanticAfter);
    assert.deepStrictEqual(after.activityHistory,before.activityHistory,label+" choreography wrote CE/Story history");
    assert.strictEqual(after.ryo,before.ryo,label+" choreography changed Ryō");
    assert.deepStrictEqual(after.inventory,before.inventory,label+" choreography changed inventory");
    assert.strictEqual(after.record,before.record,label+" choreography committed hotspot resolution");

    await page.screenshot({path:path.join(OUT,label+".png"),fullPage:true});
    gate.assertClean();
    return{label,viewport,reducedMotion,actorIds:choiceStage.rows.map(row=>row.id),choices,primitive:primitive.result};
  }finally{
    await context.close();
  }
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const results=[];
    results.push(await runScenario(browser,{viewport:{width:1366,height:768},reducedMotion:false,label:"1366x768"}));
    results.push(await runScenario(browser,{viewport:{width:1920,height:1080},reducedMotion:false,label:"1920x1080"}));
    results.push(await runScenario(browser,{viewport:{width:1366,height:768},reducedMotion:true,label:"1366x768-reduced-motion"}));
    console.log(JSON.stringify({pass:true,results,browserGoldenClaimed:false},null,2));
  }finally{
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
