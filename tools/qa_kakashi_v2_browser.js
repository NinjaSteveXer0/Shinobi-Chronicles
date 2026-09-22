#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const crypto=require("crypto");
const {chromium}=require("playwright");

const BASE=process.env.KAKASHI_V2_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.KAKASHI_V2_BROWSER_OUT||"artifacts/kakashi-v2-browser";
fs.mkdirSync(OUT,{recursive:true});

function pause(ms){return new Promise(resolve=>setTimeout(resolve,ms));}

async function boot(browser){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_){}});
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!(
    globalThis.SC_ACADEMY_KAKASHI_V2_CONTENT_36000&&
    globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010&&
    globalThis.SC_ACADEMY_KAKASHI_V2_REWARDS_36015&&
    globalThis.SC_ACADEMY_KAKASHI_V2_CORE_36020&&
    globalThis.SC_ACADEMY_KAKASHI_V2_RENDERER_36030&&
    globalThis.SC_ACADEMY_KAKASHI_V2_TRANSITION_36040
  ),null,{timeout:30000});
  const result=await page.evaluate(()=>{
    const selected=selectChronicleOrigin("academy_kakashi","kakashi_v2_browser_acceptance");
    const launched=beginAlphaChronicleOriginPrologue();
    const released33300=typeof releaseAlphaFrontDoor33300==="function"?releaseAlphaFrontDoor33300():null;
    const released33400=globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400&&typeof globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.release==="function"?globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.release():null;
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){
      const front=document.getElementById(id);if(front&&front.isConnected)front.remove();
    }
    return{selected,launched,released33300,released33400};
  });
  assert(result.selected&&result.selected.success===true,JSON.stringify(result));
  assert(result.launched&&result.launched.success===true,JSON.stringify(result));
  await page.waitForSelector("#kakashi-v2-scene-board",{state:"visible",timeout:15000});
  assert.strictEqual(await page.locator("#sc-alpha-front-door-33300,#sc-alpha-front-door-33400").count(),0,"front-door presentation still covers Kakashi V2");
  return{context,page};
}

async function currentBeat(page){
  return page.evaluate(()=>{const r=getActiveStorySceneRuntime();return r&&r.beatId||null;});
}

async function waitUnlocked(page,expected){
  await page.waitForFunction(beat=>{
    const t=globalThis.getAcademyKakashiV2TransitionState36040&&globalThis.getAcademyKakashiV2TransitionState36040();
    const r=globalThis.getActiveStorySceneRuntime&&globalThis.getActiveStorySceneRuntime();
    return !!t&&t.locked===false&&(!beat||(r&&r.beatId===beat));
  },expected||null,{timeout:12000});
}

async function drain(page){
  for(let i=0;i<600;i++){
    const t=await page.evaluate(()=>globalThis.getAcademyKakashiV2TransitionState36040());
    if(t.atEnd)return t;
    const r=await page.evaluate(()=>globalThis.advanceAcademyKakashiV236040());
    assert(r&&r.success===true,JSON.stringify(r));
  }
  throw new Error("cue drain guard exceeded");
}

async function go(page,expected,choice){
  const r=await page.evaluate(c=>globalThis.advanceAcademyKakashiV236040(c),choice===undefined?null:choice);
  assert(r&&r.success===true,JSON.stringify(r));
  await waitUnlocked(page,expected);
  return r;
}

async function shot(page,name){
  await page.locator("#kakashi-v2-scene-board").screenshot({path:path.join(OUT,name)});
}

async function inspect(page,label){
  const row=await page.evaluate(()=>{
    const root=document.getElementById("kakashi-v2-scene-board");
    const visible=n=>!!n&&n.getClientRects().length>0&&getComputedStyle(n).display!=="none"&&getComputedStyle(n).visibility!=="hidden"&&Number(getComputedStyle(n).opacity)!==0;
    const legacy=[...document.querySelectorAll("#story-scene-presentation-layer .sc-story-panel,#story-scene-presentation-layer .sc-chronicle-layout")].filter(visible);
    const dialogue=root&&root.querySelector(".kv2-dialogue");
    const receipt=root&&root.querySelector(".kv2-receipt");
    return{
      beatId:getActiveStorySceneRuntime()?.beatId||null,
      preset:root?.dataset.preset||null,
      geometry:runAcademyKakashiV2Geometry36030(),
      renderer:runAcademyKakashiV2Renderer36030Diagnostics(),
      transition:runAcademyKakashiV2Transition36040Diagnostics(),
      visibleLegacyStorySurfaces:legacy.length,
      visibleDialogueSurfaces:visible(dialogue)?1:0,
      receiptVisible:visible(receipt)
    };
  });
  assert(row.renderer.pass,label+" renderer: "+JSON.stringify(row.renderer));
  assert(row.transition.pass,label+" transition: "+JSON.stringify(row.transition));
  assert.strictEqual(row.visibleLegacyStorySurfaces,0,label+" legacy Story surface visible");
  if(row.preset==="chronicle_receipt"){
    assert.strictEqual(row.visibleDialogueSurfaces,0,label+" receipt must replace dialogue");
    assert.strictEqual(row.receiptVisible,true,label+" receipt not visible");
  }else{
    assert(row.geometry.pass,label+" geometry: "+JSON.stringify(row.geometry));
    assert.strictEqual(row.visibleDialogueSurfaces,1,label+" visible dialogue count");
  }
  return row;
}

async function cleanRoute(browser){
  const {context,page}=await boot(browser);
  const checkpoints=[];
  assert.strictEqual(await currentBeat(page),"v2_scene01_rooftop");
  checkpoints.push(await inspect(page,"rooftop"));
  await shot(page,"01-rooftop.png");

  await page.evaluate(()=>{globalThis.__kv2RootRef=document.getElementById("kakashi-v2-scene-board");});
  const first=await page.evaluate(()=>globalThis.advanceAcademyKakashiV236040());
  assert(first&&first.success===true&&first.semanticBeatUnchanged===true,JSON.stringify(first));
  assert.strictEqual(await page.evaluate(()=>globalThis.__kv2RootRef===document.getElementById("kakashi-v2-scene-board")),true,"cue advance remounted renderer root");

  await drain(page);
  const promise=page.evaluate(()=>globalThis.advanceAcademyKakashiV236040());
  await pause(90);
  const animation=await page.evaluate(()=>{
    const ghosts=[...document.querySelectorAll("#kakashi-v2-scene-board .kv2-actor-ghost")];
    return{count:ghosts.length,classes:ghosts.map(n=>n.className)};
  });
  assert(animation.count>=1,"rooftop actor exit ghost missing: "+JSON.stringify(animation));
  await shot(page,"02-rooftop-exit-animation.png");
  const transitionResult=await promise;
  assert(transitionResult&&transitionResult.success===true,JSON.stringify(transitionResult));
  await waitUnlocked(page,"v2_scene02_tail");
  checkpoints.push(await inspect(page,"tail"));
  await shot(page,"03-alley-tail.png");

  await page.evaluate(()=>{
    const s=getAcademyKakashiV2State36020();
    s.resolvers.directPickpocket={selectedOutcomeRef:"PICKPOCKET_DIRECT_SUCCESS",receiptId:"browser_fixture",resolutionMode:"browser_acceptance_fixture"};
    savePlayerData();
  });
  await drain(page);
  await go(page,"v2_direct_pickpocket_resolver","slip_for_package");
  await drain(page);
  await go(page,"v2_pickpocket_clean_success","direct_pick_success");
  checkpoints.push(await inspect(page,"clean_pickpocket"));
  await shot(page,"04-clean-pickpocket.png");

  await drain(page);
  await go(page,"v2_report");
  checkpoints.push(await inspect(page,"anbu_report"));
  await shot(page,"05-anbu-report.png");

  await drain(page);
  await go(page,"v2_minato");
  checkpoints.push(await inspect(page,"hokage_report"));
  await shot(page,"06-hokage-report.png");

  await drain(page);
  await go(page,"v2_receipt");
  checkpoints.push(await inspect(page,"receipt"));
  const receiptText=await page.locator("#kakashi-v2-scene-board .kv2-receipt pre").innerText();
  assert(receiptText.includes("REWARDS"),"Receipt missing rewards");
  assert(receiptText.toUpperCase().includes("PACKAGE"),"Receipt missing package result");
  await shot(page,"07-chronicle-receipt.png");

  await drain(page);
  await go(page,"v2_complete");
  await drain(page);
  const final=await page.evaluate(()=>globalThis.advanceAcademyKakashiV236040());
  assert(final&&final.success===true,JSON.stringify(final));
  await page.waitForFunction(()=>ensurePlayerAcquisitionState().chronicleOrigin?.prologueCompleted===true,null,{timeout:12000});
  const completion=await page.evaluate(()=>{
    const a=ensurePlayerAcquisitionState();
    return{
      prologueCompleted:a.chronicleOrigin?.prologueCompleted===true,
      academyTeamFormationRequired:a.academyTeamFormation?.required===true,
      activeStory:getActiveStorySceneRuntime(),
      ryo:playerData.ryo,
      rewards:getAcademyKakashiV2RewardReceipts36015()
    };
  });
  assert.strictEqual(completion.prologueCompleted,true);
  assert.strictEqual(completion.academyTeamFormationRequired,true);
  assert.strictEqual(completion.activeStory,null);
  assert(completion.rewards.length>=2,"material reward receipts missing: "+JSON.stringify(completion));
  await context.close();
  return{checkpoints,animation,completion};
}

async function visualAndBattle(browser){
  const {context,page}=await boot(browser);
  await page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime();
    rt.beatId="v2_watch_exchange";
    resetAcademyKakashiV2Transition36040();
  });
  await waitUnlocked(page,"v2_watch_exchange");
  const watch=await inspect(page,"watch_exchange");
  const actorCount=await page.locator("#kakashi-v2-scene-board .kv2-actor").count();
  assert.strictEqual(actorCount,3,"WATCH THE EXCHANGE actor count");
  await shot(page,"08-watch-exchange.png");

  await page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime();
    rt.beatId="v2_mi_stop_win";
    const s=getAcademyKakashiV2State36020();
    s.participants.MI.state="BATTLE_DEFEATED";
    s.battles.mi_stop={outcome:"victory",playerActionOpportunityCount:4,encounterId:"academy_kakashi_origin_battle_mi_1v1"};
    rt.localContext.__kakashiV2Presentation36040={beatId:"v2_mi_stop_win",cueIndex:999,settled:true};
    renderAcademyKakashiV236030();
  });
  await drain(page);
  const killPromise=page.evaluate(()=>globalThis.advanceAcademyKakashiV236040("mi_kill"));
  await pause(90);
  const kill=await page.evaluate(()=>{
    const ghost=document.querySelector("#kakashi-v2-scene-board .kv2-actor-ghost");
    return{exists:!!ghost,falling:!!ghost&&ghost.classList.contains("is-falling"),classes:ghost?.className||null};
  });
  assert(kill.exists&&kill.falling,"kill fall animation missing: "+JSON.stringify(kill));
  await shot(page,"09-kill-fall-animation.png");
  const killResult=await killPromise;
  assert(killResult&&killResult.success===true,JSON.stringify(killResult));
  await waitUnlocked(page,"v2_report");

  await page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime();
    rt.beatId="v2_battle_mi_stop";
    rt.localContext.__kakashiV2Presentation36040={beatId:"v2_battle_mi_stop",cueIndex:999,settled:true};
    renderAcademyKakashiV236030();
  });
  await drain(page);
  const launched=await page.evaluate(()=>globalThis.advanceAcademyKakashiV236040());
  assert(launched&&launched.success===true,JSON.stringify(launched));
  await page.waitForFunction(()=>!!(typeof currentBattle!=="undefined"&&currentBattle&&currentBattle.returnContext&&currentBattle.returnContext.type==="story_scene"),null,{timeout:12000});
  await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});
  const battle=await page.evaluate(()=>({
    config:currentBattle.kakashiV2?.battleConfigId||null,
    returnType:currentBattle.returnContext?.type||null,
    sceneId:currentBattle.returnContext?.sceneId||null,
    activePlayer:currentBattle.activePlayer?.id||null
  }));
  assert.strictEqual(battle.config,"academy_kakashi_origin_battle_mi_1v1");
  assert.strictEqual(battle.returnType,"story_scene");
  assert.strictEqual(battle.sceneId,"origin_academy_kakashi_anbu_retrieval");
  assert.strictEqual(battle.activePlayer,"academy_kakashi");
  await page.locator("#screen-overlay").screenshot({path:path.join(OUT,"10-pl-battle-launch.png")});

  const resumed=await page.evaluate(()=>{
    currentBattle.outcome={type:"victory",completedAt:Date.now(),finishingShinobiId:"academy_kakashi"};
    currentBattle.battleOver=true;
    currentBattle.active=false;
    return resumeBattleCallerAfterCompletion("victory");
  });
  assert(resumed&&resumed.success===true,JSON.stringify(resumed));
  await page.waitForSelector("#kakashi-v2-scene-board",{state:"visible",timeout:12000});
  await page.evaluate(()=>resetAcademyKakashiV2Transition36040());
  await waitUnlocked(page,"v2_mi_stop_win");
  const post=await page.evaluate(()=>({
    beatId:getActiveStorySceneRuntime()?.beatId||null,
    pendingBattle:getActiveStorySceneRuntime()?.pendingBattle||null,
    battleResume:getActiveStorySceneRuntime()?.battleResume||null
  }));
  assert.strictEqual(post.beatId,"v2_mi_stop_win");
  assert.strictEqual(post.pendingBattle,null);
  assert(post.battleResume&&post.battleResume.outcome==="victory",JSON.stringify(post));
  await shot(page,"11-story-return-after-battle.png");
  await context.close();
  return{watch,kill,battle,post};
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  try{
    const clean=await cleanRoute(browser);
    const visualBattle=await visualAndBattle(browser);
    const pngs=fs.readdirSync(OUT).filter(name=>name.endsWith(".png")).sort();
    const hashes=pngs.map(name=>crypto.createHash("sha256").update(fs.readFileSync(path.join(OUT,name))).digest("hex"));
    const uniqueScreenshots=new Set(hashes).size;
    assert(pngs.length>=11,"installed-browser evidence screenshots missing");
    assert(uniqueScreenshots>=8,"browser evidence is visually static/occluded: "+JSON.stringify({pngs,uniqueScreenshots}));
    const result={pass:true,clean,visualBattle,pngCount:pngs.length,uniqueScreenshots,browserGoldenClaimed:false};
    fs.writeFileSync(path.join(OUT,"results.json"),JSON.stringify(result,null,2));
    console.log(JSON.stringify(result,null,2));
  }finally{
    await browser.close();
  }
})().catch(error=>{
  console.error(error&&error.stack||error);
  process.exitCode=1;
});
