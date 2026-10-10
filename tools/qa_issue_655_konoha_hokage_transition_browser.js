#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_655_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_655_OUT||"artifacts/issue-655-konoha-hokage-transition";
fs.mkdirSync(OUT,{recursive:true});

async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110&&
    globalThis.SC_HOKAGE_OFFICE_CHRONICLE_DISPATCH_53300&&
    globalThis.SC_PHASE2_LIVE_HUD_49900&&
    typeof globalThis.openHokageOffice53300==="function"&&
    typeof globalThis.returnFromHokageOffice53300==="function"&&
    typeof globalThis.runHokageOfficeChronicleDispatch53300Diagnostics==="function"&&
    typeof globalThis.openOverlay==="function"
  ),null,{timeout:30000});
}

async function nextPaint(page){
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>resolve())));
}

async function runViewport(browser,viewport){
  const label=`${viewport.width}x${viewport.height}`;
  const context=await browser.newContext({viewport,deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await releaseFrontDoor(page);

    const opened=await page.evaluate(()=>openOverlay("village"));
    assert.notStrictEqual(opened,false,label+" Village open refused");
    await page.waitForSelector(".village-map-screen",{state:"visible",timeout:12000});
    await nextPaint(page);

    const before=await page.evaluate(()=>{
      const node=document.querySelector(".village-map-screen");
      const container=document.getElementById("overlay-content-container");
      if(!node||!container)return null;
      globalThis.__qa655VillageNode=node;
      const rect=node.getBoundingClientRect();
      const style=getComputedStyle(node);
      return{
        rect:{left:rect.left,top:rect.top,width:rect.width,height:rect.height},
        transform:style.transform,
        overlayType:typeof currentOverlayType==="undefined"?null:currentOverlayType,
        scrollTop:container.scrollTop,
        semantic:JSON.stringify({
          history:Array.isArray(playerData?.activityHistory)?playerData.activityHistory:null,
          currentTeam:typeof getChronicleCurrentTeam43600==="function"?getChronicleCurrentTeam43600():null,
          ryo:playerData?.ryo,
          acquisition:playerData?.acquisition||null
        })
      };
    });
    assert(before,label+" Village snapshot missing");
    assert.strictEqual(before.overlayType,"village",label+" precondition overlay not Village");

    const officeResult=await page.evaluate(()=>openHokageOffice53300({callerRef:"qa655_round_trip",presenceMode:"physical",returnMode:"village"}));
    assert.strictEqual(officeResult?.success,true,label+" Office did not open: "+JSON.stringify(officeResult));
    await page.waitForSelector(".alpha533-office",{state:"visible",timeout:8000});

    const officePaint1=await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>resolve({
      officeVisible:!!document.querySelector(".alpha533-office"),
      villageInDocument:!!document.querySelector(".village-map-screen"),
      overlayType:typeof currentOverlayType==="undefined"?null:currentOverlayType
    }))));
    const officePaint2=await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>resolve({
      officeVisible:!!document.querySelector(".alpha533-office"),
      villageInDocument:!!document.querySelector(".village-map-screen"),
      overlayType:typeof currentOverlayType==="undefined"?null:currentOverlayType
    }))));
    for(const paint of [officePaint1,officePaint2]){
      assert.strictEqual(paint.officeVisible,true,label+" Office disappeared during paint");
      assert.strictEqual(paint.villageInDocument,false,label+" preserved Village leaked under Office");
      assert.strictEqual(paint.overlayType,"hokage_office",label+" Office overlay truth drifted");
    }

    const returned=await page.evaluate(()=>returnFromHokageOffice53300());
    assert.strictEqual(returned?.success,true,label+" return failed: "+JSON.stringify(returned));
    assert.strictEqual(returned?.presentationRestored,true,label+" Village was not restored from preserved presentation");
    assert.strictEqual(returned?.remounted,false,label+" Village was remounted");
    await page.waitForSelector(".village-map-screen",{state:"visible",timeout:8000});

    const afterFrames=[];
    for(let i=0;i<3;i+=1){
      afterFrames.push(await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>{
        const node=document.querySelector(".village-map-screen");
        const container=document.getElementById("overlay-content-container");
        const rect=node?.getBoundingClientRect();
        resolve({
          sameNode:node===globalThis.__qa655VillageNode,
          rect:rect?{left:rect.left,top:rect.top,width:rect.width,height:rect.height}:null,
          transform:node?getComputedStyle(node).transform:null,
          overlayType:typeof currentOverlayType==="undefined"?null:currentOverlayType,
          scrollTop:container?.scrollTop??null,
          semantic:JSON.stringify({
            history:Array.isArray(playerData?.activityHistory)?playerData.activityHistory:null,
            currentTeam:typeof getChronicleCurrentTeam43600==="function"?getChronicleCurrentTeam43600():null,
            ryo:playerData?.ryo,
            acquisition:playerData?.acquisition||null
          })
        });
      }))));
    }

    const epsilon=.5;
    const fields=["left","top","width","height"];
    for(const [index,frame] of afterFrames.entries()){
      assert.strictEqual(frame.sameNode,true,label+` frame ${index+1}: Village DOM identity changed`);
      assert.strictEqual(frame.overlayType,"village",label+` frame ${index+1}: overlay truth not Village`);
      assert(frame.rect,label+` frame ${index+1}: Village rect missing`);
      for(const field of fields){
        assert(Math.abs(frame.rect[field]-before.rect[field])<=epsilon,
          label+` frame ${index+1}: ${field} shifted ${before.rect[field]} -> ${frame.rect[field]}`);
      }
      assert.strictEqual(frame.transform,before.transform,label+` frame ${index+1}: transform changed`);
      assert.strictEqual(frame.scrollTop,before.scrollTop,label+` frame ${index+1}: container scroll changed`);
      assert.strictEqual(frame.semantic,before.semantic,label+` frame ${index+1}: semantic state changed`);
    }

    const diagnostics=await page.evaluate(()=>runHokageOfficeChronicleDispatch53300Diagnostics());
    assert.strictEqual(diagnostics.pass,true,label+" #533 diagnostics RED: "+JSON.stringify(diagnostics));
    assert.strictEqual(diagnostics.checks.villageRoundTripPreservesMountedDom,true,label+" preservation diagnostic missing");
    assert.strictEqual(diagnostics.checks.villageRestorePrecedesRemountFallback,true,label+" remount fallback ordering diagnostic missing");
    assert.strictEqual(diagnostics.checks.transitionFixAddsNoTimerOrObserver,true,label+" transition helper introduced timer/observer");

    const gateEvidence=await gate.assertClean(`issue-655-${label}`);
    assert.strictEqual(gateEvidence.unexpectedCount,0,label+" unexpected browser runtime errors");
    const result={
      viewport:label,
      pass:true,
      exactVillageDomIdentityPreserved:true,
      geometryStableAcrossThreePaints:true,
      semanticStateUnchanged:true,
      noTransitionTimerOrObserverAdded:true,
      browserRuntimeErrors:gateEvidence.unexpectedCount,
      browserGoldenClaimed:false,
      before,
      afterFrames,
      diagnostics
    };
    fs.writeFileSync(path.join(OUT,`viewport-${viewport.width}x${viewport.height}.json`),JSON.stringify(result,null,2));
    return result;
  }finally{
    await context.close();
  }
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const results=[];
    for(const viewport of [{width:1366,height:768},{width:1920,height:1080}])results.push(await runViewport(browser,viewport));
    const summary={pass:results.every(row=>row.pass===true),issue:655,results,browserGoldenClaimed:false};
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2));
    console.log(JSON.stringify(summary,null,2));
  }finally{
    await browser.close();
  }
})().catch(error=>{
  console.error(error&&error.stack||error);
  process.exit(1);
});
