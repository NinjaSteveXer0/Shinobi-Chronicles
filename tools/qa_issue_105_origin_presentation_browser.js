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
      choices:[...(root?.querySelectorAll(".sc-story-choice")||[])].map(n=>n.textContent.trim()).filter(Boolean),
      legacyContinue:[...(root?.querySelectorAll("button")||[])].some(n=>n.textContent.trim()==="CONTINUE"&&!n.classList.contains("sc-chronicle-primary"))
    };
  });
}
async function advanceOne(page){
  const before=await snapshot(page);
  assert.notStrictEqual(before.mode,"choice","advanceOne called on choice "+before.beatId);
  const stage=page.locator("#story-scene-presentation-layer .sc-chronicle-stage,#story-scene-presentation-layer .sc-story-stage").first();
  await stage.waitFor({state:"visible",timeout:8000});
  await stage.click({position:{x:30,y:30}});
  await page.waitForFunction(old=>{
    const rt=globalThis.getActiveStorySceneRuntime?.(),root=document.getElementById("story-scene-presentation-layer");
    const text=root?.querySelector(".sc-story-text")?.textContent?.trim()||"";
    return !rt||rt.beatId!==old.beatId||text!==old.text;
  },{beatId:before.beatId,text:before.text},{timeout:8000});
  return snapshot(page);
}
async function advanceUntilBeat(page,target,max=120){
  const seen=[];
  for(let i=0;i<max;i++){
    const row=await snapshot(page);
    seen.push({beatId:row.beatId,text:row.text});
    if(row.beatId===target)return{row,seen};
    if(row.mode==="choice")throw new Error("choice reached before "+target+": "+row.beatId);
    await advanceOne(page);
  }
  throw new Error("advanceUntilBeat guard exceeded "+target);
}
async function reloadAtExactBeat(page,beatId){
  const before=await snapshot(page);
  assert.strictEqual(before.beatId,beatId,"reload proof started from wrong beat");
  await page.reload({waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!globalThis.SC_ALPHA_ORIGIN_SCENE_BOARD_BINDINGS_105&&!!globalThis.SC_STORY_SCENE_BOARD_33900&&!!globalThis.SC_ALPHA_ORIGIN_32900,null,{timeout:30000});
  await release(page);
  await page.waitForFunction(expected=>{
    const rt=globalThis.getActiveStorySceneRuntime?.();
    const root=document.getElementById("story-scene-presentation-layer");
    return rt?.beatId===expected&&root?.dataset.scSceneBoard==="true";
  },beatId,{timeout:15000});
  const after=await snapshot(page);
  assert.strictEqual(after.beatId,beatId,"save/reload resumed a different Story beat");
  assert.strictEqual(after.text,before.text,"save/reload changed the current GOLDEN cue");
  return after;
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
      await page.waitForFunction(()=>document.getElementById("story-scene-presentation-layer")?.dataset.scSceneBoard==="true",null,{timeout:15000});
      let row=await snapshot(page);
      assert.strictEqual(row.board,"true",variant+" fell back to legacy black Story surface");
      if(row.mode==="choice"){
        assert(row.choices.length>0,variant+" shared choice presentation has no visible choices "+JSON.stringify(row));
      }else{
        assert.strictEqual(row.performance,"true",variant+" did not enter shared performance presentation");
        assert(["narration","dialogue","record"].includes(row.cueKind),variant+" shared cue kind missing "+JSON.stringify(row));
      }
      assert(row.actors.length>=1,variant+" has no visible Scene Board actors");
      assert(row.actors.some(a=>a.image===protagonist),variant+" protagonist card missing "+JSON.stringify(row.actors));
      assert(row.backdrop,variant+" has no resolved Story backdrop");
      assert.strictEqual(row.legacyContinue,false,variant+" legacy CONTINUE panel leaked into Scene Board");

      if(variant==="academy_mirai"){
        assert.strictEqual(row.beatId,"mir_assignment_01","Mirai did not start at Writing-GOLDEN Assignment");
        assert(row.text.includes("Mirai arrives early"),"Mirai GOLDEN opening prose missing "+JSON.stringify(row));
        const assignmentWalk=await advanceUntilBeat(page,"mir_walk_choice",120);
        const walkText=assignmentWalk.seen.map(x=>x.text).join("\n");
        assert(walkText.includes("You're aware this doesn't start for another ten minutes."),"Mirai Assignment instructor exchange skipped");
        assert(walkText.includes("I'm guessing she's mine."),"Mirai Assignment Traveller exchange skipped");
        assert(walkText.includes("Should I be ducking?")&&walkText.includes("Terrifying.")&&walkText.includes("I won't report you."),"Mirai Walk conversation was compressed or skipped");
        row=assignmentWalk.row;
        assert.deepStrictEqual(row.choices,["TALK TO HIM","KEEP YOUR ATTENTION ON THE ESCORT"],"Mirai GOLDEN walk choice drift");
        const talk=page.locator("#story-scene-presentation-layer .sc-story-choice").filter({hasText:"TALK TO HIM"}).first();
        await talk.click();
        await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId==="mir_talk_01",null,{timeout:8000});
        await reloadAtExactBeat(page,"mir_talk_01");
        const talkRoute=await advanceUntilBeat(page,"mir_market_talk_01",120);
        const talkText=talkRoute.seen.map(x=>x.text).join("\n");
        assert(talkText.includes("Have you been here before?")&&talkText.includes("…First time."),"Mirai authored Traveller branch dialogue missing");
        assert(talkText.includes("It's fruit pretending it belongs in tea."),"Mirai authored plum-tea conversation missing");
        row=talkRoute.row;
      }else if(variant==="academy_menma"){
        assert.strictEqual(row.beatId,"menma_open_01","Menma did not start at Writing-GOLDEN menma_open_01");
        assert(row.text.includes("practice sheet lands on Menma's desk"),"Menma GOLDEN opening prose missing "+JSON.stringify(row));
        const preReload=await advanceUntilBeat(page,"menma_open_08",120);
        await reloadAtExactBeat(page,"menma_open_08");
        const postReload=await advanceUntilBeat(page,"menma_forest_01",120);
        const opening={row:postReload.row,seen:[...preReload.seen,...postReload.seen]};
        const seenIds=new Set(opening.seen.map(x=>x.beatId));
        for(let n=1;n<=15;n++)assert(seenIds.has("menma_open_"+String(n).padStart(2,"0")),"Menma GOLDEN opening skipped menma_open_"+String(n).padStart(2,"0"));
        const openingText=opening.seen.map(x=>x.text).join("\n");
        for(const line of ["Again?","Again.","You already know I can do it.","I know you can do this one.","Then give me something harder.","That's all anybody says.","Class isn't finished.","Mine is.","If you walk out, that's your decision.","I know."]){
          assert(openingText.includes(line),"Menma GOLDEN Academy exchange missing: "+line);
        }
        row=opening.row;
      }else if(row.mode!=="choice"){
        row=await advanceOne(page);
      }
      await page.locator("#story-scene-presentation-layer").screenshot({path:path.join(OUT,variant+".png")});
      await gate.assertClean(variant);
      await context.close();
    }
    console.log(JSON.stringify({pass:true,issue:105,cases:CASES.map(x=>x[0]),legacyFallbackRejected:true,clickAnywhereProven:true,miraiWritingGoldenProven:true,menmaWritingGoldenOpeningProven:true,goldenSaveReloadResumeProven:true,browserGoldenClaimed:false},null,2));
  }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exit(1);});