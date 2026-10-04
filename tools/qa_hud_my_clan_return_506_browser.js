#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.PHASE2_506_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.PHASE2_506_OUT||"artifacts/hud-my-clan-return-506";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_PHASE2_LIVE_HUD_49900&&
    globalThis.SC_HUD_MY_CLAN_RETURN_50600&&
    typeof globalThis.getHudMyClanReturnContext50600==="function"
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
async function waitSurface(page,kind){
  await page.waitForFunction(kind=>{
    const snap=globalThis.getPhase2LiveHudSnapshot49900?.();
    return !!(snap&&snap.visible===true&&snap.surface&&snap.surface.kind===kind);
  },kind,{timeout:10000});
}
async function clickHudClan(page){
  const button=page.locator('#sc-phase2-live-hud-49900 [data-hud499-action="clan"]').first();
  await button.waitFor({state:"visible",timeout:10000});
  await button.click();
  await page.waitForFunction(()=>typeof currentOverlayType!=="undefined"&&currentOverlayType==="clan",null,{timeout:10000});
}
async function closeClan(page){
  const close=page.locator(".my-clan-screen-close");
  await close.waitFor({state:"visible",timeout:10000});
  await close.click();
}
async function semanticFingerprint(page){
  return page.evaluate(()=>JSON.stringify({
    ryo:playerData.ryo,
    team:getChronicleCurrentTeam43600(),
    acquisition:playerData.acquisition,
    history:playerData.activityHistory,
    worldEventRuntime:playerData.worldEventRuntime
  }));
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1366,height:768},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await release(page);

    const setup=await page.evaluate(()=>{
      localStorage.clear();
      playerData=createDefaultPlayerData();
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      savePlayerData();

      const selected=selectChronicleOrigin("academy_menma","qa506_origin");
      const runIdentity=commitChronicleRunIdentity43600({
        runId:"sc_run_v1_qa506_00000000-0000-4000-8000-000000000506",
        creationKind:"NEW_START"
      });
      const completed=completeChronicleOriginPrologue("academy_menma",["qa506_complete"]);
      const desired=["academy_kakashi","academy_mirai"];
      const one=selectAcademyTeamFormationTeammate(1,desired[0]);
      const two=selectAcademyTeamFormationTeammate(2,desired[1]);
      const formed=confirmAcademyTeamFormation("qa506_team",desired);
      const continued=continueAcademyTeamFormationJourney();
      updateChronicleTutorialProgress43600({
        sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore",
        trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,
        arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true
      },{save:true});
      savePlayerData();
      return{selected,runIdentity,completed,one,two,formed,continued,team:getChronicleCurrentTeam43600()};
    });
    for(const key of ["selected","runIdentity","completed","one","two","formed","continued"]){
      assert(setup[key]&&setup[key].success===true,key+" setup failed: "+JSON.stringify(setup[key]));
    }
    assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_kakashi","academy_mirai"]);

    const baseline=await semanticFingerprint(page);

    // Village -> HUD My Clan -> exact same Village.
    await page.evaluate(()=>openOverlay("village"));
    await waitSurface(page,"village");
    const villageBefore=await page.evaluate(()=>({
      overlay:currentOverlayType,
      region:selectedRegionKey,
      location:selectedLocationNode&&selectedLocationNode.id||null
    }));
    assert.strictEqual(villageBefore.overlay,"village");
    assert.strictEqual(villageBefore.region,"fire");
    assert.strictEqual(villageBefore.location,"konohagakure");

    await clickHudClan(page);
    let armed=await page.evaluate(()=>getHudMyClanReturnContext50600());
    assert.strictEqual(armed.armed,true,"Village HUD My Clan did not arm return context");
    assert.strictEqual(armed.surfaceKind,"village");
    await closeClan(page);
    await waitSurface(page,"village");
    const villageAfter=await page.evaluate(()=>({
      overlay:currentOverlayType,
      region:selectedRegionKey,
      location:selectedLocationNode&&selectedLocationNode.id||null,
      adapter:getHudMyClanReturnContext50600()
    }));
    assert.deepStrictEqual(
      {overlay:villageAfter.overlay,region:villageAfter.region,location:villageAfter.location},
      villageBefore,
      "My Clan close did not restore exact Village caller"
    );
    assert.strictEqual(villageAfter.adapter.armed,false);
    assert.strictEqual(villageAfter.adapter.restoreCount,1);

    // Dirty-close confirmation remains authoritative; DISCARD then returns Village.
    await clickHudClan(page);
    await page.evaluate(()=>{CLAN_UI_STATE.formationDirty=true;});
    await closeClan(page);
    await page.waitForSelector(".my-clan-unsaved-dialog",{state:"visible",timeout:10000});
    const held=await page.evaluate(()=>({
      overlay:currentOverlayType,
      armed:getHudMyClanReturnContext50600().armed
    }));
    assert.strictEqual(held.overlay,"clan","dirty close escaped My Clan before confirmation");
    assert.strictEqual(held.armed,true,"dirty close consumed return context too early");
    await page.locator(".my-clan-unsaved-dialog .is-danger").click();
    await waitSurface(page,"village");
    const dirtyReturned=await page.evaluate(()=>({
      overlay:currentOverlayType,
      region:selectedRegionKey,
      location:selectedLocationNode&&selectedLocationNode.id||null,
      adapter:getHudMyClanReturnContext50600()
    }));
    assert.strictEqual(dirtyReturned.overlay,"village");
    assert.strictEqual(dirtyReturned.region,"fire");
    assert.strictEqual(dirtyReturned.location,"konohagakure");
    assert.strictEqual(dirtyReturned.adapter.armed,false);
    assert.strictEqual(dirtyReturned.adapter.restoreCount,2);

    // Region -> HUD My Clan -> exact same Region.
    await page.evaluate(()=>openRegionHub("fire"));
    await waitSurface(page,"region");
    await clickHudClan(page);
    armed=await page.evaluate(()=>getHudMyClanReturnContext50600());
    assert.strictEqual(armed.surfaceKind,"region");
    await closeClan(page);
    await waitSurface(page,"region");
    const regionAfter=await page.evaluate(()=>({overlay:currentOverlayType,region:selectedRegionKey,adapter:getHudMyClanReturnContext50600()}));
    assert.strictEqual(regionAfter.overlay,"region");
    assert.strictEqual(regionAfter.region,"fire");
    assert.strictEqual(regionAfter.adapter.armed,false);

    // World -> HUD My Clan -> canonical World Map.
    await page.evaluate(()=>returnToWorldMap());
    await waitSurface(page,"world");
    await clickHudClan(page);
    armed=await page.evaluate(()=>getHudMyClanReturnContext50600());
    assert.strictEqual(armed.surfaceKind,"world");
    await closeClan(page);
    await waitSurface(page,"world");
    const worldAfter=await page.evaluate(()=>({
      staleOverlayType:currentOverlayType,
      overlayVisible:document.getElementById("screen-overlay")?.style.display!=="none",
      hudSurface:getPhase2LiveHudSnapshot49900()?.surface?.kind||null,
      adapter:getHudMyClanReturnContext50600()
    }));
    assert.strictEqual(worldAfter.overlayVisible,false,"canonical World return left the screen overlay visible");
    assert.strictEqual(worldAfter.hudSurface,"world","canonical World return did not restore the accepted #499 World surface");
    assert.strictEqual(worldAfter.adapter.armed,false);

    // Non-HUD My Clan entry keeps legacy close behavior and never arms #506.
    await page.evaluate(()=>{openOverlay("village");openOverlay("clan");});
    await page.waitForFunction(()=>currentOverlayType==="clan");
    const direct=await page.evaluate(()=>getHudMyClanReturnContext50600());
    assert.strictEqual(direct.armed,false,"non-HUD My Clan entry incorrectly armed #506");
    await page.evaluate(()=>requestCloseMyClan());
    await page.waitForFunction(()=>currentOverlayType==="region",null,{timeout:10000});
    const directAfter=await page.evaluate(()=>({overlay:currentOverlayType,region:selectedRegionKey}));
    assert.strictEqual(directAfter.overlay,"region");
    assert.strictEqual(directAfter.region,"fire");

    const after=await semanticFingerprint(page);
    assert.strictEqual(after,baseline,"#506 presentation routing mutated canonical gameplay state");

    const diagnostics=await page.evaluate(()=>runHudMyClanReturnContext50600Diagnostics());
    assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics));

    await page.screenshot({path:path.join(OUT,"final-region-after-nonhud-control.png"),fullPage:true});
    gate.assertClean();

    console.log(JSON.stringify({
      pass:true,
      issue:506,
      villageReturnExact:true,
      dirtyCloseConfirmationPreserved:true,
      regionReturnExact:true,
      worldReturnExact:true,
      nonHudCloseUnchanged:true,
      canonicalStateUnchanged:true,
      diagnostics,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
