#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.PHASE2_KONOHA_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.PHASE2_KONOHA_BROWSER_OUT||"artifacts/phase2-konoha-onboarding";
fs.mkdirSync(OUT,{recursive:true});

async function waitTrial(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_CHRONICLE_STATE_MANIFEST_43600&&
    globalThis.SC_FIRST_KONOHA_TUTORIAL_35000&&
    typeof globalThis.continueAcademyTeamFormationJourney==="function"
  ),null,{timeout:30000});
}
async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){
      const node=document.getElementById(id);if(node)node.remove();
    }
  });
}
async function snapshot(page){
  return page.evaluate(()=>({
    team:globalThis.getChronicleCurrentTeam43600?JSON.parse(JSON.stringify(getChronicleCurrentTeam43600())):null,
    progress:globalThis.getChronicleTutorialProgress43600?JSON.parse(JSON.stringify(getChronicleTutorialProgress43600({create:false}))):null,
    onboardingStatus:typeof ensurePlayerAcquisitionState==="function"?ensurePlayerAcquisitionState().onboardingStatus:null,
    freePlay:typeof isAcademyFreePlayAvailable==="function"?isAcademyFreePlayAvailable():null,
    ryo:Number(playerData&&playerData.ryo)||0,
    historyCount:Array.isArray(playerData&&playerData.activityHistory)?playerData.activityHistory.length:0,
    overlay:typeof currentOverlayType!=="undefined"?currentOverlayType:null
  }));
}
async function expectGuide(page,title){
  await page.waitForSelector("#sc-konoha-onboarding-35000",{state:"visible",timeout:10000});
  const text=await page.locator("#sc-konoha-onboarding-35000").innerText();
  assert(text.includes(title),"expected guide "+title+" got "+text);
  return text;
}
async function clickGuide(page,label){
  await page.getByRole("button",{name:label,exact:true}).click();
  await page.waitForTimeout(60);
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitTrial(page);
    await releaseFrontDoor(page);

    const start=await page.evaluate(()=>{
      playerData=createDefaultPlayerData();
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      savePlayerData();
      const selected=selectChronicleOrigin("academy_menma","qa431_browser_origin");
      const completed=completeChronicleOriginPrologue("academy_menma",["qa431_browser_complete"]);
      const candidates=getAcademyTeamFormationSnapshot().eligibleCandidateVariantIds.slice(0,2);
      const one=selectAcademyTeamFormationTeammate(1,candidates[0]);
      const two=selectAcademyTeamFormationTeammate(2,candidates[1]);
      const formed=confirmAcademyTeamFormation("qa431_browser_team",candidates);
      const continued=continueAcademyTeamFormationJourney();
      return{selected,completed,candidates,one,two,formed,continued,team:getChronicleCurrentTeam43600(),ryo:playerData.ryo};
    });
    assert.strictEqual(start.selected.success,true,"Origin selection failed");
    assert.strictEqual(start.completed.success,true,"Origin completion failed");
    assert.strictEqual(start.formed.success,true,"Team Formation failed");
    assert.strictEqual(start.continued.success,true,"Team continuation failed");
    assert.strictEqual(start.continued.freePlayAuthorized,true,"Konoha free play still tutorial-gated");
    assert.strictEqual(start.team.teamVariantIds.length,3,"currentTeam is not three members");
    assert.deepStrictEqual(start.team.teamVariantIds,["academy_menma"].concat(start.candidates),"browser currentTeam does not match committed team");

    await page.evaluate(()=>openOverlay("village"));
    const opening=await expectGuide(page,"KONOHA IS OPEN");
    assert(opening.includes("Your Academy team is formed. You are now in Sandbox mode."),"exact opening copy missing");
    assert(opening.includes("SHOW ME AROUND")&&opening.includes("EXPLORE KONOHA"),"opening actions missing");
    await page.screenshot({path:path.join(OUT,"01-konoha-is-open.png"),fullPage:true});

    await clickGuide(page,"SHOW ME AROUND");
    let s=await snapshot(page);
    assert.strictEqual(s.onboardingStatus,"academy_free_play");
    assert.strictEqual(s.freePlay,true);
    assert.strictEqual(s.progress.sandboxPopupSeen,true);
    assert.strictEqual(s.progress.recommendedRouteEnabled,true);
    assert.deepStrictEqual(s.team.teamVariantIds,start.team.teamVariantIds);
    const highlights=await page.evaluate(()=>[...document.querySelectorAll("[data-konoha-guide-step]")].map(node=>({id:node.dataset.villageHotspotId,step:node.dataset.konohaGuideStep})));
    for(const id of ["KON-P07","KON-P06","KON-P02"])assert(highlights.some(row=>row.id===id),"recommended public hotspot not highlighted: "+id);
    assert(highlights.every(row=>/^KON-P\d+$/.test(row.id||"")),"hidden Konoha location leaked through recommended highlights");

    await page.evaluate(()=>openTrainingGrounds("hub"));
    await expectGuide(page,"TRAINING GROUND");
    await page.screenshot({path:path.join(OUT,"02-training-tip.png"),fullPage:true});
    await clickGuide(page,"CONTINUE");

    await page.evaluate(()=>openKonohaPracticalFromVillage());
    await expectGuide(page,"PRACTICAL TRAINING");
    await clickGuide(page,"CONTINUE");
    const practicalSurface=await page.evaluate(()=>({
      selectable:getKonohaSelectableCharacters().map(row=>row.id),
      selected:getKonohaActivityUISessionState().characterId,
      text:document.getElementById("konoha-activity-screen")?.innerText||"",
      tones:[...document.querySelectorAll("#konoha-activity-screen .alpha-activity-discipline")].map(node=>node.dataset.disciplineId||null).filter(Boolean)
    }));
    assert.deepStrictEqual(practicalSurface.selectable,start.team.teamVariantIds,"Practical selector leaked outside committed currentTeam");
    assert(start.team.teamVariantIds.includes(practicalSurface.selected),"Practical selected a non-team shinobi");
    assert(!/runtime-owned|live progression authority|PRACTICAL AUTHORITY|No weapon EXP/i.test(practicalSurface.text),"Practical still exposes developer-facing runtime copy");
    assert.deepStrictEqual([...new Set(practicalSurface.tones)].sort(),["buki","fuin","gen","kin","nin","stamina","tai"].sort(),"Practical discipline colour identities missing");
    await page.screenshot({path:path.join(OUT,"03-practical-current-team.png"),fullPage:true});

    await page.evaluate(()=>openKonohaExamFromVillage());
    await expectGuide(page,"SHINOBI EXAMS");
    await clickGuide(page,"CONTINUE");
    const examSurface=await page.evaluate(()=>({
      selectable:getKonohaSelectableCharacters().map(row=>row.id),
      selected:getKonohaActivityUISessionState().characterId,
      text:document.getElementById("konoha-activity-screen")?.innerText||"",
      tones:[...document.querySelectorAll("#konoha-activity-screen .alpha-activity-discipline")].map(node=>node.dataset.disciplineId||null).filter(Boolean)
    }));
    assert.deepStrictEqual(examSurface.selectable,start.team.teamVariantIds,"Exam selector leaked outside committed currentTeam");
    assert(start.team.teamVariantIds.includes(examSurface.selected),"Exam selected a non-team shinobi");
    assert(!/runtime-owned|EXAM AUTHORITY|does not itself grant Promotion or Rank/i.test(examSurface.text),"Exam still exposes developer-facing runtime copy");
    assert.deepStrictEqual([...new Set(examSurface.tones)].sort(),["buki","fuin","gen","kin","nin","stamina","tai"].sort(),"Exam discipline colour identities missing");
    await page.screenshot({path:path.join(OUT,"04-exams-current-team.png"),fullPage:true});

    await page.evaluate(()=>openOverlay("arena"));
    const arena=await expectGuide(page,"KONOHA ARENA");
    for(const lane of ["PROMOTION","ARENA BATTLE","STAGED BATTLES","VILLAGE TOURNAMENT"])assert(arena.includes(lane),"Arena guide missing "+lane);
    assert(arena.includes("NOT CURRENTLY AVAILABLE"),"inactive Arena lanes are presented as available");
    await page.screenshot({path:path.join(OUT,"03-arena-guide.png"),fullPage:true});
    await clickGuide(page,"CONTINUE");

    const next=await expectGuide(page,"YOUR NEXT STEP");
    assert(next.includes("TAKE PROMOTION ASSESSMENT")&&next.includes("KEEP EXPLORING"),"next-step actions missing");
    await clickGuide(page,"KEEP EXPLORING");
    s=await snapshot(page);
    assert.strictEqual(s.overlay,"village","KEEP EXPLORING did not return to Konoha");
    assert.strictEqual(s.progress.arenaCompletionChoiceSeen,true);
    assert.strictEqual(s.progress.recommendedRouteEnabled,false,"recommended-route halos remained active after YOUR NEXT STEP");
    assert.strictEqual(await page.locator("[data-konoha-guide-step]").count(),0,"recommended-route halo DOM attributes remained after YOUR NEXT STEP");

    await page.evaluate(()=>openShinobiRecord("overview"));
    await expectGuide(page,"SHINOBI RECORD");
    await clickGuide(page,"CONTINUE");

    const beforeReload=await snapshot(page);
    assert.strictEqual(beforeReload.ryo,start.ryo,"tutorial changed Ryō");
    assert.deepStrictEqual(beforeReload.team.teamVariantIds,start.team.teamVariantIds,"tutorial changed currentTeam");
    for(const key of ["trainingTipSeen","practicalTipSeen","examsTipSeen","arenaTipSeen","arenaCompletionChoiceSeen","shinobiRecordTipSeen"])assert.strictEqual(beforeReload.progress[key],true,"browser did not persist "+key);

    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitTrial(page);
    await releaseFrontDoor(page);
    const afterReload=await snapshot(page);
    assert.deepStrictEqual(afterReload.team.teamVariantIds,start.team.teamVariantIds,"reload changed committed currentTeam");
    assert.strictEqual(afterReload.progress.sandboxPopupSeen,true);
    assert.strictEqual(afterReload.progress.trainingTipSeen,true);
    assert.strictEqual(afterReload.progress.arenaTipSeen,true);

    await page.evaluate(()=>openOverlay("village"));
    await page.waitForTimeout(120);
    assert.strictEqual(await page.locator("#sc-konoha-onboarding-35000").count(),0,"opening popup repeated after reload");

    await page.evaluate(()=>openTrainingGrounds("hub"));
    await page.waitForTimeout(120);
    assert.strictEqual(await page.locator("#sc-konoha-onboarding-35000").count(),0,"Training tip repeated after reload");

    // Prove Promotion action still delegates to the existing Promotion surface.
    await page.evaluate(()=>{
      updateChronicleTutorialProgress43600({arenaCompletionChoiceSeen:false,arenaTipSeen:true,recommendedRouteEnabled:true},{save:true});
      openOverlay("arena");
    });
    await expectGuide(page,"YOUR NEXT STEP");
    await clickGuide(page,"TAKE PROMOTION ASSESSMENT");
    await page.waitForTimeout(120);
    const promotionState=await page.evaluate(()=>({
      overlay:typeof currentOverlayType!=="undefined"?currentOverlayType:null,
      progress:getChronicleTutorialProgress43600({create:false})
    }));
    assert.strictEqual(promotionState.progress.arenaCompletionChoiceSeen,true);
    assert.strictEqual(promotionState.progress.recommendedRouteEnabled,false,"Promotion choice did not retire recommended-route halos");
    assert.notStrictEqual(promotionState.overlay,"village","Promotion action incorrectly returned to village");

    await gate.assertClean("phase2-konoha-onboarding");
    console.log(JSON.stringify({
      pass:true,
      issues:[431,436],
      trial:true,
      exactCommittedTeam:start.team.teamVariantIds,
      freePlayAfterFormation:true,
      openingPopupOnce:true,
      optionalRouteHighlights:true,
      contextualFirstUseTips:true,
      practicalAndExamUseCommittedTeam:true,
      activityCopyPlayerFacing:true,
      disciplineColourIdentities:true,
      arenaFourLanes:true,
      keepExploringReturnsVillage:true,
      promotionUsesExistingSurface:true,
      saveReloadNoSpam:true,
      noRyoMutation:true,
      hiddenLocationHighlightLeak:false,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
