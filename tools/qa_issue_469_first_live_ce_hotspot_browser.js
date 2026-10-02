#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE469_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE469_OUT||"artifacts/issue-469-first-live-ce-hotspot";
fs.mkdirSync(OUT,{recursive:true});

async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{releaseAlphaFrontDoor33300?.();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_FIRST_LIVE_CE_HOTSPOT_46900&&
    globalThis.SC_CHRONICLE_STATE_MANIFEST_43600&&
    typeof globalThis.getOriginParticipantContinuity46900==="function"&&
    typeof globalThis.evaluateFirstLiveCEHotspotEligibility46900==="function"
  ),null,{timeout:30000});
}
async function waitKakashiRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_ACADEMY_KAKASHI_V2_CORE_36020&&
    typeof globalThis.getAcademyKakashiV2State36020==="function"
  ),null,{timeout:30000});
}
async function setupCommittedKakashiChronicle(page){
  return page.evaluate(()=>{
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();

    const selected=selectChronicleOrigin("academy_kakashi","qa469_first_live_ce_hotspot");
    const launched=beginAlphaChronicleOriginPrologue();
    const s=getAcademyKakashiV2State36020();
    if(!s||!s.participants||!s.participants.MI)return{error:"kakashi_v2_state_missing",selected,launched};

    // Test fixture enters the already-Golden Origin at its exact completion boundary.
    // #469 itself still consumes the real production completion writer and captures
    // continuity before the Story runtime is cleared.
    s.participants.MI.state="RELEASED";
    s.participants.MI.disposition="RELEASE";
    s.participants.MI.lethalIntent=false;
    s.participants.MI.restrainIntent=false;
    s.participants.MI.deliveredInstitution=null;
    s.participants.MI.collected=false;
    s.terminal=s.terminal||{};
    s.terminal.reportReached=true;
    s.terminal.hiddenTestReviewReached=true;
    s.terminal.receiptReached=true;

    const completed=completeChronicleOriginPrologue("academy_kakashi",["qa469_committed_origin_boundary"]);
    if(playerData.storySceneRuntime)playerData.storySceneRuntime.active=null;
    savePlayerData();

    const formation=getAcademyTeamFormationSnapshot();
    const ids=["academy_hinata","academy_obito"];
    if(!ids.every(id=>formation.eligibleCandidateVariantIds.includes(id))){
      return{error:"expected_team_candidates_missing",eligible:formation.eligibleCandidateVariantIds,selected,launched,completed};
    }
    const first=selectAcademyTeamFormationTeammate(1,ids[0]);
    const second=selectAcademyTeamFormationTeammate(2,ids[1]);
    const confirmed=confirmAcademyTeamFormation("qa469_team",ids);
    const continued=continueAcademyTeamFormationJourney();
    if(typeof updateChronicleTutorialProgress43600==="function"){
      updateChronicleTutorialProgress43600({sandboxPopupSeen:true,openingChoice:"explore",recommendedRouteEnabled:false},{save:true});
    }
    const synced=syncFirstLiveCEHotspot46900({save:true});
    return{
      selected,launched,completed,first,second,confirmed,continued,synced,
      continuity:getOriginParticipantContinuity46900(),
      gate:evaluateFirstLiveCEHotspotEligibility46900(),
      team:getChronicleCurrentTeam43600()
    };
  });
}
async function projection(page){
  return page.evaluate(()=>typeof createStorySceneObserverSafeProjection==="function"?createStorySceneObserverSafeProjection():null);
}
async function advance(page){
  return page.evaluate(()=>advanceStoryScene());
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1536,height:1024},deviceScaleFactor:1});
  const page=await context.newPage();
  const runtimeErrors=await installBrowserRuntimeErrorGate(page);
  try{
    await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_error){}});
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await waitKakashiRuntime(page);
    await releaseFrontDoor(page);

    const setup=await setupCommittedKakashiChronicle(page);
    assert(!setup.error,JSON.stringify(setup));
    assert.strictEqual(setup.selected?.success,true);
    assert.strictEqual(setup.completed?.success,true);
    assert.strictEqual(setup.confirmed?.success,true);
    assert.strictEqual(setup.continued?.success,true);
    assert.deepStrictEqual(setup.team?.teamVariantIds,["academy_kakashi","academy_hinata","academy_obito"]);
    assert.strictEqual(setup.continuity?.stableParticipantId,"academy_kakashi_origin_masked_interceptor");
    assert.strictEqual(setup.continuity?.fieldDispositionState,"RELEASED");
    assert.strictEqual(setup.continuity?.rememberedHistoryFamily,"deliberate_release");
    assert.strictEqual(setup.continuity?.hiddenPostTestReviewReached,true);
    assert.strictEqual(setup.continuity?.protagonistKnowsTestTruth,false);
    assert.strictEqual(setup.gate?.eligible,true,JSON.stringify(setup.gate));

    await page.evaluate(()=>openOverlay("village"));
    await page.waitForSelector('[data-village-hotspot-id="KON-P01"]',{state:"visible",timeout:15000});
    const host=page.locator('[data-village-hotspot-id="KON-P01"]');
    assert((await host.getAttribute("class")||"").includes("sc-ce-hotspot-469"),"eligible KON-P01 was not decorated as the Chronicle-reactive hotspot");
    assert((await host.innerText()).includes("CHRONICLE EVENT"),"KON-P01 did not expose the event affordance");
    await page.screenshot({path:path.join(OUT,"01-konoha-kon-p01-event-available.png"),fullPage:true});

    await host.dblclick();
    await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:15000});
    await page.waitForFunction(()=>getActiveStorySceneRuntime()?.sceneId==="konoha_ce_kakashi_masked_interceptor_admin_crossing_v1__scene",null,{timeout:10000});

    const actors=await page.locator('.sc-scene-board-33900 [data-actor-id]').evaluateAll(nodes=>nodes.map(node=>node.getAttribute("data-actor-id")));
    for(const id of ["academy_kakashi","academy_kakashi_origin_masked_interceptor","academy_hinata","academy_obito"]){
      assert(actors.includes(id),"Scene Board missing exact current participant "+id+": "+JSON.stringify(actors));
    }
    await page.screenshot({path:path.join(OUT,"02-hotspot-opening.png"),fullPage:true});

    const observed=[];
    for(let guard=0;guard<20;guard+=1){
      const p=await projection(page);
      assert(p,"Story projection disappeared before Kakashi choice");
      observed.push({beat:p.beat_id,mode:p.mode,speaker:p.speaker_name,text:p.text,choices:p.choices});
      if(p.mode==="choice")break;
      const result=await advance(page);
      assert(result&&result.success!==false,JSON.stringify(result));
    }
    const choiceProjection=observed[observed.length-1];
    assert.strictEqual(choiceProjection.mode,"choice","Kakashi choice surface never appeared");
    assert(observed.some(row=>String(row.text||"").includes("A small inclination of her head is the only acknowledgement.")),"exact deliberate-release MI reaction family missing");
    assert(observed.some(row=>row.speaker==="HINATA"&&row.text==="She recognised you."),"Hinata participant-first reaction missing");
    assert(observed.some(row=>String(row.text||"").includes("Obito's eyebrows climb high enough")),"Obito authored fallback missing");
    assert.deepStrictEqual(choiceProjection.choices.map(row=>row.label),[
      "Tell her you remember her.","Ask what she is doing here.","Watch her pass.","Keep moving."
    ]);
    assert(!choiceProjection.choices.some(row=>/attack/i.test(row.label)),"ATTACK leaked into non-hostile hotspot");
    await page.screenshot({path:path.join(OUT,"03-kakashi-choice-surface.png"),fullPage:true});

    const chosen=await page.evaluate(()=>applyStorySceneChoice("ask_why_here"));
    assert(chosen&&chosen.success!==false,JSON.stringify(chosen));
    const branchTexts=[];
    for(let guard=0;guard<12;guard+=1){
      const p=await projection(page);
      if(!p)break;
      branchTexts.push({beat:p.beat_id,speaker:p.speaker_name,text:p.text});
      const result=await advance(page);
      if(result&&result.success===false)throw new Error(JSON.stringify(result));
      const active=await page.evaluate(()=>getActiveStorySceneRuntime());
      if(!active)break;
    }
    assert(branchTexts.some(row=>row.speaker==="KAKASHI"&&row.text==="What are you doing here."));
    assert(branchTexts.some(row=>row.speaker==="MASKED INTERCEPTOR"&&row.text==="Delivery. Finished."));
    assert(branchTexts.some(row=>String(row.text||"").includes("already dealing with somebody else.")));

    const closed=await page.evaluate(()=>({
      gate:evaluateFirstLiveCEHotspotEligibility46900(),
      continuity:getOriginParticipantContinuity46900(),
      resolution:getWorldEventDimensionState("resolutionByOpportunityId","konoha_ce_kakashi_masked_interceptor_admin_crossing_v1"),
      records:playerData.activityHistory.filter(row=>row&&row.id==="konoha_ce_hotspot_masked_interceptor_admin_crossing::1::shinobi_record"),
      allHotspotRecords:playerData.activityHistory.filter(row=>row&&String(row.id||row.occurrenceId||"").includes("konoha_ce_hotspot_masked_interceptor_admin_crossing"))
    }));
    assert.strictEqual(closed.gate.eligible,false);
    assert(closed.gate.reasons.includes("hotspot_occurrence_already_resolved"));
    assert.strictEqual(closed.resolution.everClosed,true);
    assert.strictEqual(closed.resolution.rememberedHistoryFamily,"deliberate_release");
    assert.strictEqual(closed.resolution.protagonistIntent,"ASK_WHY_SHE_IS_HERE");
    assert.deepStrictEqual(closed.resolution.currentTeamRefs,["academy_kakashi","academy_hinata","academy_obito"]);
    assert.strictEqual(closed.records.length,1);
    assert.strictEqual(closed.records[0].title,"Hokage Administration Crossing");
    assert.strictEqual(closed.records[0].outcome,"Seen leaving Hokage Administration after a document handoff. Administration staff did not challenge her presence.");
    assert.strictEqual(closed.records[0].data.knownPerson,"Masked Interceptor");
    assert.strictEqual(closed.records[0].data.priorConnection,"Previously encountered during the Academy package incident.");
    assert.strictEqual(closed.records[0].data.properName,"Unknown");
    assert(!JSON.stringify(closed.records[0]).includes("staged_konoha_test_participant"),"hidden Minato/test truth leaked into Record history");

    await page.evaluate(()=>openShinobiRecord("chronicle","academy_kakashi"));
    await page.waitForSelector('.shinobi-record-screen[data-tab="chronicle"]',{state:"visible",timeout:10000});
    const recordText=await page.locator(".shinobi-record-screen").innerText();
    assert(recordText.includes("HOKAGE ADMINISTRATION CROSSING"),"Shinobi Record missing hotspot occurrence");
    assert(recordText.includes("Seen leaving Hokage Administration after a document handoff. Administration staff did not challenge her presence."),"Shinobi Record missing exact observer-safe lead");
    await page.screenshot({path:path.join(OUT,"04-shinobi-record-lead.png"),fullPage:true});

    const beforeReload=await page.evaluate(()=>({
      continuity:getOriginParticipantContinuity46900(),
      resolution:getWorldEventDimensionState("resolutionByOpportunityId","konoha_ce_kakashi_masked_interceptor_admin_crossing_v1"),
      recordCount:playerData.activityHistory.filter(row=>row&&row.id==="konoha_ce_hotspot_masked_interceptor_admin_crossing::1::shinobi_record").length
    }));
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await releaseFrontDoor(page);
    const afterReload=await page.evaluate(()=>({
      continuity:getOriginParticipantContinuity46900(),
      gate:evaluateFirstLiveCEHotspotEligibility46900(),
      resolution:getWorldEventDimensionState("resolutionByOpportunityId","konoha_ce_kakashi_masked_interceptor_admin_crossing_v1"),
      recordCount:playerData.activityHistory.filter(row=>row&&row.id==="konoha_ce_hotspot_masked_interceptor_admin_crossing::1::shinobi_record").length
    }));
    assert.strictEqual(afterReload.recordCount,1,"reload duplicated #469 Record entry");
    assert.strictEqual(afterReload.gate.eligible,false,"resolved #469 occurrence rerolled after reload");
    assert(afterReload.gate.reasons.includes("hotspot_occurrence_already_resolved"));
    assert.strictEqual(afterReload.continuity.rememberedHistoryFamily,beforeReload.continuity.rememberedHistoryFamily);
    assert.strictEqual(afterReload.resolution.rememberedHistoryFamily,beforeReload.resolution.rememberedHistoryFamily);
    assert.deepStrictEqual(afterReload.resolution.teammateReactionReceipts,beforeReload.resolution.teammateReactionReceipts);
    assert.strictEqual(afterReload.resolution.protagonistIntent,beforeReload.resolution.protagonistIntent);

    await page.evaluate(()=>openOverlay("village"));
    await page.waitForSelector('[data-village-hotspot-id="KON-P01"]',{state:"visible",timeout:10000});
    assert.strictEqual(await page.locator(".sc-ce-hotspot-469").count(),0,"resolved KON-P01 event affordance returned after reload");

    const diag=await page.evaluate(()=>runFirstLiveCEHotspot46900Diagnostics());
    assert.strictEqual(diag.pass,true,JSON.stringify(diag));
    await runtimeErrors.assertClean("issue-469-first-live-ce-hotspot");

    console.log(JSON.stringify({
      pass:true,issue:469,
      productionBrowser:true,
      committedKakashiChronicleBoundary:true,
      exactCurrentTeam:true,
      konP01Host:true,
      sameMaskedInterceptor:true,
      historySensitiveReaction:true,
      participantFirstReactions:true,
      exactFourChoices:true,
      noAttack:true,
      noBattle:true,
      observerSafeRecord:true,
      oneRecordEntry:true,
      saveLoadNoReroll:true,
      finiteClosure:true,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
