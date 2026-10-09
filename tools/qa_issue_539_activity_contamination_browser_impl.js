#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_539_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_539_BROWSER_OUT||"artifacts/issue-539-activity-contamination-impl";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_CHRONICLE_STATE_MANIFEST_43600&&
    globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110&&
    typeof globalThis.openKonohaPracticalFromVillage==="function"&&
    typeof globalThis.openKonohaExamFromVillage==="function"&&
    typeof globalThis.getPhase2KonohaActivityTeam43110==="function"&&
    typeof globalThis.runPhase2KonohaPlayerSurfaces43110Diagnostics==="function"
  ),null,{timeout:30000});
}

async function release(page){
  await page.evaluate(()=>{
    try{releaseAlphaFrontDoor33300?.();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}

async function setupLegitimateTeam(page,label){
  return page.evaluate(label=>{
    localStorage.clear();sessionStorage.clear();
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma",label+"_origin");
    const completed=completeChronicleOriginPrologue("academy_menma",[label+"_complete"]);
    const expected=["academy_hinata","academy_kakashi"];
    const snapshot=getAcademyTeamFormationSnapshot();
    if(!expected.every(id=>snapshot.eligibleCandidateVariantIds.includes(id))){
      return{error:"expected_candidates_missing",eligible:snapshot.eligibleCandidateVariantIds};
    }
    const one=selectAcademyTeamFormationTeammate(1,expected[0]);
    const two=selectAcademyTeamFormationTeammate(2,expected[1]);
    const formed=confirmAcademyTeamFormation(label+"_team",expected);
    const continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({
      sandboxPopupSeen:true,trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,
      arenaTipSeen:true,arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true
    },{save:true});
    savePlayerData();
    return{selected,completed,one,two,formed,continued,team:getChronicleCurrentTeam43600()};
  },label);
}

async function openAndInspect(page,service,expectedTeam){
  const asset=service==="exams"?"UI/exams.png":"UI/practical.png";
  await page.evaluate(()=>performance.clearResourceTimings());
  await page.evaluate(service=>service==="exams"?openKonohaExamFromVillage():openKonohaPracticalFromVillage(),service);
  await page.waitForSelector(`#konoha-activity-screen[data-service-id='${service}']`,{state:"visible",timeout:10000});
  await page.waitForTimeout(160);

  const evidence=await page.evaluate(({service,asset})=>{
    const root=document.querySelector(`#konoha-activity-screen[data-service-id='${service}']`);
    const style=getComputedStyle(root);
    const visible=node=>{
      if(!node||!node.getClientRects||!node.getClientRects().length)return false;
      const cs=getComputedStyle(node),r=node.getBoundingClientRect();
      return cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0&&r.width>1&&r.height>1;
    };
    const normal=value=>String(value||"").replace(/\\/g,"/").toLowerCase();
    const assetNeedle=normal(asset),fileNeedle=assetNeedle.split("/").pop();
    const resourceHits=performance.getEntriesByType("resource").map(entry=>entry.name)
      .filter(name=>normal(name).includes(assetNeedle)||normal(name).endsWith("/"+fileNeedle));
    const liveAssetHits=[];
    for(const node of document.querySelectorAll("body *")){
      if(!visible(node))continue;
      const cs=getComputedStyle(node);
      for(const value of [cs.backgroundImage,node.getAttribute?.("src"),node.currentSrc]){
        if(normal(value).includes(assetNeedle)||normal(value).includes(fileNeedle)){
          liveAssetHits.push({tag:node.tagName,id:node.id||null,className:String(node.className||"").slice(0,160),value:String(value||"")});
        }
      }
    }
    const selectable=getKonohaSelectableCharacters().map(row=>row.id);
    const helper=getPhase2KonohaActivityTeam43110().map(row=>row.id);
    const data=service==="exams"?getKonohaExamUIScreenData():getKonohaPracticalUIScreenData();
    const result=root?.querySelector(".alpha-activity-result-stage");
    const primary=root?.querySelector(".alpha-activity-primary");
    const bodyText=(root?.innerText||"").trim();
    const accessibilityLeak=[...root.querySelectorAll("[aria-label],[title],img[alt]")]
      .map(node=>[node.getAttribute("aria-label"),node.getAttribute("title"),node.getAttribute("alt")].filter(Boolean).join(" "))
      .filter(value=>/Kage Naruto|Jonin Sasuke|Jōnin Sasuke/i.test(value));
    return{
      service,asset,
      backgroundImage:style.backgroundImage,
      rootDataset:{...root.dataset},
      liveAssetHits,resourceHits,
      selectable,helper,dataCharacters:data.characters.map(row=>row.id),selectedCharacterId:data.selectedCharacterId,
      bodyText,accessibilityLeak,
      resultStage:result?{state:result.dataset.state||null,text:(result.innerText||"").trim()}:null,
      primary:{present:!!primary,top:primary?.getBoundingClientRect().top||null},
      disciplineIds:[...root.querySelectorAll(".alpha-activity-discipline")].map(node=>node.dataset.disciplineId||null).filter(Boolean),
      diagnostics:runPhase2KonohaPlayerSurfaces43110Diagnostics()
    };
  },{service,asset});

  assert(!/url\s*\(/i.test(evidence.backgroundImage),`${service} background resurrected a raster URL: ${evidence.backgroundImage}`);
  assert.strictEqual(evidence.liveAssetHits.length,0,`${service} still has a visible consumer for ${asset}`);
  assert.strictEqual(evidence.resourceHits.length,0,`${service} requested historical fixture master ${asset}`);
  assert.deepStrictEqual(evidence.selectable,expectedTeam,`${service} selector no longer equals committed currentTeam`);
  assert.deepStrictEqual(evidence.helper,expectedTeam,`${service} helper no longer equals committed currentTeam`);
  assert.deepStrictEqual(evidence.dataCharacters,expectedTeam,`${service} UI data no longer equals committed currentTeam`);
  assert(expectedTeam.includes(evidence.selectedCharacterId),`${service} selected a non-team shinobi`);
  assert(!/Kage Naruto|Jonin Sasuke|Jōnin Sasuke/i.test(evidence.bodyText),`${service} leaked baked fixture identity into live text`);
  assert.strictEqual(evidence.accessibilityLeak.length,0,`${service} leaked fixture identity through accessible metadata`);
  assert.strictEqual(evidence.primary.present,true,`${service} action dock/primary action disappeared`);
  assert(evidence.resultStage&&/RESULT STAGE|TRAINING RESULT|ASSESSMENT RESULT/i.test(evidence.resultStage.text),`${service} Result Stage disappeared`);
  assert(evidence.disciplineIds.length>0&&new Set(evidence.disciplineIds).size===evidence.disciplineIds.length,`${service} discipline presentation missing or collapsed`);
  assert.strictEqual(evidence.rootDataset.currentTeamProjection,"canonical",`${service} lost canonical currentTeam projection marker`);
  assert.strictEqual(evidence.rootDataset.historicalRasterObservation,"OBSERVED_BUT_WRONG",`${service} lost explicit contamination classification`);
  assert.strictEqual(evidence.diagnostics.pass,true,`${service} activity diagnostics failed: ${JSON.stringify(evidence.diagnostics)}`);
  assert.strictEqual(evidence.diagnostics.historicalFixtureObservationClassification,"OBSERVED_BUT_WRONG");
  assert.strictEqual(evidence.diagnostics.checks.historicalActivityRasterConsumptionBlocked,true);
  assert.strictEqual(evidence.diagnostics.checks.codeOwnedActivityPresentation,true);

  return evidence;
}

async function runViewport(browser,viewport,index){
  const context=await browser.newContext({viewport,deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_error){}});
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);
    const setup=await setupLegitimateTeam(page,`issue539_impl_${viewport.width}x${viewport.height}`);
    assert(!setup.error,JSON.stringify(setup));
    for(const key of ["selected","completed","one","two","formed","continued"]){
      assert.strictEqual(setup[key]?.success,true,`${key} setup failed: ${JSON.stringify(setup[key])}`);
    }
    const team=["academy_menma","academy_hinata","academy_kakashi"];
    assert.deepStrictEqual(setup.team.teamVariantIds,team,"setup currentTeam differs from frozen QA team");

    const practical=await openAndInspect(page,"practical",team);
    await page.locator("#konoha-activity-screen").screenshot({path:path.join(OUT,`${index}-practical-${viewport.width}x${viewport.height}.png`)});
    const exams=await openAndInspect(page,"exams",team);
    await page.locator("#konoha-activity-screen").screenshot({path:path.join(OUT,`${index}-exams-${viewport.width}x${viewport.height}.png`)});
    const gateEvidence=await gate.assertClean(`issue-539-impl-${viewport.width}x${viewport.height}`);
    assert.strictEqual(gateEvidence.unexpectedCount,0,"browser runtime errors detected");
    return{viewport,team,practical,exams};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const results=[];
    for(const [index,viewport] of [{width:1366,height:768},{width:1920,height:1080}].entries()){
      results.push(await runViewport(browser,viewport,index+1));
    }
    console.log(JSON.stringify({
      pass:true,issue:539,role:"lane_c_implementation",exactInstalledRoute:true,
      viewports:results.map(row=>row.viewport),
      legitimateCurrentTeam:["academy_menma","academy_hinata","academy_kakashi"],
      historicalRasterLiveConsumers:0,fixtureIdentityLeak:false,
      actionDockPreserved:true,resultStagePreserved:true,disciplinePresentationPreserved:true,
      observationClassification:"OBSERVED_BUT_WRONG",browserRuntimeErrors:0,
      myClanTouched:false,sharedSeamsEdited:false,browserGoldenClaimed:false
    },null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
