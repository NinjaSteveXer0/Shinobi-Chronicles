#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.ISSUE_105_PRESENTATION_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_105_PRESENTATION_BROWSER_OUT||"artifacts/issue-105-origin-presentation";
fs.mkdirSync(OUT,{recursive:true});
const CASES=[
  ["academy_hinata","Assets/Academy Student/academy_hinata.png"],
  ["academy_mirai","Assets/Academy Student/academy_mirai.png"],
  ["academy_menma","Assets/Academy Student/academy_menma.png"],
  ["academy_kushina","Assets/Academy Student/academy_kushina.png"],
  ["academy_kurenai","Assets/Academy Student/academy_kurenai.png"],
  ["academy_iwabee","Assets/Academy Student/academy_iwabe.png"],
  ["academy_metal_lee","Assets/Academy Student/academy_metal.png"]
];
async function release(page){
  await page.evaluate(()=>{
    try{releaseAlphaFrontDoor33300?.();}catch(_){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_){}
    const game=document.querySelector(".game-container");if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function snapshot(page){
  return page.evaluate(()=>{
    const rt=globalThis.getActiveStorySceneRuntime?.(),beat=globalThis.getCurrentStorySceneBeat?.();
    const root=document.getElementById("story-scene-presentation-layer");
    const board=root?.querySelector(".sc-scene-board-33900");
    const actors=[...(board?.querySelectorAll(".sc-scene-board-33900__actor")||[])].map(n=>({
      id:n.dataset.actorId||"",image:n.querySelector("img")?.getAttribute("src")||"",
      silhouette:!!n.querySelector(".sc-scene-board-33900__actor-silhouette")
    }));
    const stage=root?.querySelector(".sc-chronicle-stage")||root?.querySelector(".sc-story-stage");
    return{
      sceneId:rt?.sceneId||null,beatId:rt?.beatId||null,mode:beat?.mode||null,
      text:root?.querySelector(".sc-story-text")?.textContent?.trim()||"",
      board:root?.dataset.scSceneBoard||null,performance:root?.dataset.scPerformance||null,
      cueKind:root?.dataset.scCueKind||null,actors,
      backdrop:globalThis.resolveStorySceneBoardBackdropPath?.()||null,
      dedicated:stage?.dataset.scSceneBoardBackdrop||null,
      primary:root?.querySelector(".sc-chronicle-primary")?.textContent?.trim()||"",
      legacyContinue:[...(root?.querySelectorAll("button")||[])].some(n=>n.textContent.trim()==="CONTINUE"&&!n.classList.contains("sc-chronicle-primary"))
    };
  });
}
(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    for(const [variant,protagonist] of CASES){
      const context=await browser.newContext({viewport:{width:1440,height:900}});
      const page=await context.newPage();
      const gate=await installBrowserRuntimeErrorGate(page);
      await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
      await page.waitForFunction(()=>!!globalThis.SC_ALPHA_ORIGIN_SCENE_BOARD_BINDINGS_105&&!!globalThis.SC_STORY_SCENE_BOARD_33900&&!!globalThis.SC_ALPHA_ORIGIN_32900,null,{timeout:30000});
      const start=await page.evaluate(v=>({select:selectChronicleOrigin(v,"issue_105_owner_regression"),launch:beginAlphaChronicleOriginPrologue()}),variant);
      assert.strictEqual(start.select?.success,true,variant+" select failed "+JSON.stringify(start));
      assert.strictEqual(start.launch?.success,true,variant+" launch failed "+JSON.stringify(start));
      await release(page);
      await page.waitForFunction(()=>document.getElementById("story-scene-presentation-layer")?.dataset.scSceneBoard==="true"&&document.getElementById("story-scene-presentation-layer")?.dataset.scPerformance==="true",null,{timeout:15000});
      const row=await snapshot(page);
      assert.strictEqual(row.board,"true",variant+" fell back to legacy black Story surface");
      assert.strictEqual(row.performance,"true",variant+" did not enter shared performance presentation");
      assert(["narration","dialogue","record"].includes(row.cueKind),variant+" shared cue kind missing "+JSON.stringify(row));
      assert(row.actors.length>=1,variant+" has no visible Scene Board actors");
      assert(row.actors.some(a=>a.image===protagonist),variant+" protagonist card missing "+JSON.stringify(row.actors));
      assert(row.backdrop,variant+" has no resolved Story backdrop");
      assert.strictEqual(row.legacyContinue,false,variant+" legacy CONTINUE panel leaked into Scene Board");
      if(row.mode!=="choice"){
        const before={beatId:row.beatId,text:row.text};
        const stage=page.locator("#story-scene-presentation-layer .sc-chronicle-stage").first();
        await stage.click({position:{x:30,y:30}});
        await page.waitForFunction(old=>{
          const rt=globalThis.getActiveStorySceneRuntime?.(),root=document.getElementById("story-scene-presentation-layer");
          const text=root?.querySelector(".sc-story-text")?.textContent?.trim()||"";
          return !rt||rt.beatId!==old.beatId||text!==old.text;
        },before,{timeout:8000});
      }
      await page.locator("#story-scene-presentation-layer").screenshot({path:path.join(OUT,variant+".png")});
      await gate.assertClean(variant);
      await context.close();
    }
    console.log(JSON.stringify({pass:true,issue:105,cases:CASES.map(x=>x[0]),legacyFallbackRejected:true,clickAnywhereProven:true,browserGoldenClaimed:false},null,2));
  }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exit(1);});