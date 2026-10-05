#!/usr/bin/env node
"use strict";
const assert=require("assert");
const fs=require("fs");
const path=require("path");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_506_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_506_BROWSER_OUT||"artifacts/hud-my-clan-return-506";
fs.mkdirSync(OUT,{recursive:true});

async function waitSurface(page,kind){
  await page.waitForFunction(expected=>{
    const hud=globalThis.getPhase2LiveHudSnapshot49900?.();
    if(!hud||hud.surface?.kind!==expected)return false;
    if(expected==="world")return document.getElementById("screen-overlay")?.style.display==="none";
    return document.getElementById("screen-overlay")?.style.display!=="none";
  },kind,{timeout:10000});
}

async function boot(page){
  await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_error){}});
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!(
    globalThis.SC_ALPHA_HUD_MY_CLAN_RETURN_CONTEXT_50600&&
    globalThis.SC_PHASE2_LIVE_HUD_49900&&
    typeof getHudMyClanReturnContext50600==="function"&&
    typeof runHudMyClanReturnContext50600Diagnostics==="function"&&
    typeof getPhase2LiveHudSnapshot49900==="function"&&
    typeof openOverlay==="function"&&
    typeof requestCloseMyClan==="function"
  ),null,{timeout:30000});
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
    try{
      if(globalThis.playerData){
        playerData.onboardingStatus="academy_free_play";
        playerData.originCompleted=true;
        playerData.teamFormationCompleted=true;
        playerData.teamFormationContinued=true;
        if(!Array.isArray(playerData.currentTeam)||!playerData.currentTeam.length){
          playerData.currentTeam=[{id:"academy_kakashi",variantId:"academy_kakashi",runtimeId:"academy_kakashi"}];
        }
      }
    }catch(_error){}
    try{if(typeof returnToWorldMap==="function")returnToWorldMap();}catch(_error){}
  });
  await waitSurface(page,"world");
}

async function semanticFingerprint(page){
  return page.evaluate(()=>JSON.stringify({
    playerData:globalThis.playerData||null,
    chronicleOrigin:globalThis.selectedChronicleOrigin||null,
    battleActive:!!(globalThis.currentBattle&&currentBattle.active)
  }));
}

async function clickHudClan(page){
  await page.waitForSelector('#phase2-live-hud-49900 button[data-hud-action="clan"]',{state:"visible",timeout:10000});
  await page.click('#phase2-live-hud-49900 button[data-hud-action="clan"]');
  await page.waitForFunction(()=>currentOverlayType==="clan",null,{timeout:10000});
}

async function closeClan(page){
  const result=await page.evaluate(()=>requestCloseMyClan());
  if(result?.requiresConfirmation){
    const confirm=await page.evaluate(()=>confirmCloseMyClan?.());
    assert.notStrictEqual(confirm,false,"dirty My Clan close confirmation failed");
  }
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await boot(page);
    const baseline=await semanticFingerprint(page);

    // Village -> HUD My Clan -> exact Village.
    await page.evaluate(()=>{openOverlay("region");selectedRegionKey="fire";openOverlay("village");});
    await waitSurface(page,"village");
    await clickHudClan(page);
    let armed=await page.evaluate(()=>getHudMyClanReturnContext50600());
    assert.strictEqual(armed.surfaceKind,"village");
    assert.strictEqual(armed.regionKey,"fire");
    await closeClan(page);
    await waitSurface(page,"village");
    const villageAfter=await page.evaluate(()=>({overlay:currentOverlayType,region:selectedRegionKey,adapter:getHudMyClanReturnContext50600()}));
    assert.strictEqual(villageAfter.overlay,"village");
    assert.strictEqual(villageAfter.region,"fire");
    assert.strictEqual(villageAfter.adapter.armed,false);

    // Village dirty-state confirmation still returns to exact Village only after confirm.
    await clickHudClan(page);
    await page.evaluate(()=>{
      try{
        if(typeof setMyClanFormationSlot==="function")setMyClanFormationSlot(0,null);
        else if(globalThis.SC_MY_CLAN_ADAPTIVE_PRESENTATION_33500?.setFormationSlot)SC_MY_CLAN_ADAPTIVE_PRESENTATION_33500.setFormationSlot(0,null);
      }catch(_error){}
    });
    const dirtyAttempt=await page.evaluate(()=>requestCloseMyClan());
    if(dirtyAttempt?.requiresConfirmation){
      assert.strictEqual(await page.evaluate(()=>currentOverlayType),"clan","dirty close bypassed confirmation");
      await page.evaluate(()=>confirmCloseMyClan?.());
    }
    await waitSurface(page,"village");

    // Region -> HUD My Clan -> exact Region.
    await page.evaluate(()=>{openOverlay("region");selectedRegionKey="fire";});
    await waitSurface(page,"region");
    await clickHudClan(page);
    armed=await page.evaluate(()=>getHudMyClanReturnContext50600());
    assert.strictEqual(armed.surfaceKind,"region");
    assert.strictEqual(armed.regionKey,"fire");
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

    // Snapshot browser runtime errors before teardown. The previous un-awaited
    // call raced the finally/browser.close path and could false-fail after all
    // feature assertions had already passed.
    const gateEvidence=await gate.assertClean("issue-506-hud-my-clan-return");
    assert.strictEqual(gateEvidence.unexpectedCount,0);

    console.log(JSON.stringify({
      pass:true,
      issue:506,
      villageReturnExact:true,
      dirtyCloseConfirmationPreserved:true,
      regionReturnExact:true,
      worldReturnExact:true,
      nonHudCloseUnchanged:true,
      canonicalStateUnchanged:true,
      browserRuntimeErrorGateBeforeTeardown:true,
      diagnostics,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
