#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_32_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_32_BROWSER_OUT||"artifacts/issue-32-chronicle-depth";
const SCENE_ID="origin_academy_obito_journey_to_training";
const CHOICE_BEAT="obi_furniture_choice";
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

async function boot(page){
  await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_error){}});
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!(
    globalThis.SC_ALPHA_ORIGIN_32900&&
    globalThis.SC_STORY_SCENE_BOARD_33900&&
    typeof selectChronicleOrigin==="function"&&
    typeof beginAlphaChronicleOriginPrologue==="function"&&
    typeof setStoryScenePresentationDepth==="function"&&
    typeof getActiveChronicleInteractionDepth==="function"&&
    typeof runStorySceneBoard33900Diagnostics==="function"
  ),null,{timeout:30000});
  const started=await page.evaluate(()=>({
    selected:selectChronicleOrigin("academy_obito","issue_32_depth_browser"),
    launched:beginAlphaChronicleOriginPrologue()
  }));
  assert.strictEqual(started.selected?.success,true,JSON.stringify(started));
  assert.strictEqual(started.launched?.success,true,JSON.stringify(started));
  await releaseFrontDoor(page);
  await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene&&document.getElementById("story-scene-presentation-layer")?.style.display!=="none",SCENE_ID,{timeout:15000});
  await page.waitForFunction(()=>document.getElementById("story-scene-presentation-layer")?.dataset.scSceneBoard==="true",null,{timeout:12000});
}

async function semanticSnapshot(page){
  return page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime(),beat=getCurrentStorySceneBeat();
    const choices=(beat?.choices||[]).map(choice=>{
      let available=true,knownBlocker=null;
      try{
        const result=typeof choice.availability==="function"?choice.availability():null;
        if(result&&typeof result==="object"){
          if(result.available===false)available=false;
          knownBlocker=result.knownBlocker||result.known_blocker||null;
        }
      }catch(_error){}
      return{choiceId:choice.choiceId||choice.id||null,label:choice.label||null,available,knownBlocker};
    });
    const stable=v=>{try{return JSON.stringify(v??null);}catch(_error){return String(v??null);}};
    return{
      sceneId:rt?.sceneId||null,
      beatId:rt?.beatId||null,
      mode:beat?.mode||null,
      occurrenceId:rt?.occurrenceId||rt?.sceneInstanceId||rt?.instanceId||rt?.runInstanceId||null,
      choices,
      activityHistory:stable(playerData?.activityHistory||null),
      knowledge:stable(playerData?.knowledge||playerData?.knowledgeState||null),
      battleActive:!!(globalThis.currentBattle&&currentBattle.active)
    };
  });
}

async function presentationSnapshot(page){
  return page.evaluate(()=>{
    const layer=document.getElementById("story-scene-presentation-layer");
    const stage=layer?.querySelector(".sc-chronicle-stage")||layer?.querySelector(".sc-story-stage");
    const visible=node=>!!node&&node.getClientRects().length>0&&getComputedStyle(node).display!=="none"&&getComputedStyle(node).visibility!=="hidden"&&Number(getComputedStyle(node).opacity||1)>0;
    const sublabels=[...(layer?.querySelectorAll(".sc-scene-board-33900__actor-tag small")||[])];
    return{
      depth:layer?.dataset.scPresentationDepth||null,
      activeDepth:typeof getActiveChronicleInteractionDepth==="function"?getActiveChronicleInteractionDepth():null,
      boardVisible:visible(layer?.querySelector(".sc-scene-board-33900")),
      topVisible:visible(layer?.querySelector(".sc-scene-board-33900__top")),
      contextVisible:visible(layer?.querySelector(".sc-scene-board-33900__context")),
      contextText:layer?.querySelector(".sc-scene-board-33900__context")?.textContent?.replace(/\s+/g," ").trim()||"",
      objective:layer?.querySelector(".sc-scene-board-33900__objective")?.textContent?.replace(/\s+/g," ").trim()||"",
      actorIds:[...(layer?.querySelectorAll(".sc-scene-board-33900__actor")||[])].map(node=>node.dataset.actorId||null),
      visibleActorSublabels:sublabels.filter(visible).length,
      objectCallouts:[...(layer?.querySelectorAll(".sc-scene-board-33900__object")||[])].filter(visible).length,
      visibleChoices:[...(layer?.querySelectorAll(".sc-story-choice")||[])].filter(visible).map(node=>node.textContent.trim()),
      backdrop:stage?.style.getPropertyValue("--sc-scene-board-backdrop")||"",
      convoBitmapVisible:[...(layer?.querySelectorAll('img[src*="UI/convo.png"],img[src*="UI%2Fconvo.png"]')||[])].filter(visible).length,
      diagnostics:runStorySceneBoard33900Diagnostics()
    };
  });
}

async function setDepth(page,depth){
  const result=await page.evaluate(value=>setStoryScenePresentationDepth(value),depth);
  assert.strictEqual(result?.success,true,JSON.stringify(result));
  await page.waitForFunction(value=>document.getElementById("story-scene-presentation-layer")?.dataset.scPresentationDepth===value,depth,{timeout:8000});
  return presentationSnapshot(page);
}

async function clickAnywhere(page){
  const layer=page.locator("#story-scene-presentation-layer");
  const stage=layer.locator(".sc-chronicle-stage,.sc-story-stage").first();
  await stage.waitFor({state:"visible",timeout:8000});
  await stage.click({position:{x:30,y:30}});
}

async function toFirstChoice(page){
  for(let guard=0;guard<40;guard+=1){
    const semantic=await semanticSnapshot(page);
    if(semantic.beatId===CHOICE_BEAT)return;
    assert.notStrictEqual(semantic.mode,"choice","unexpected earlier choice before "+CHOICE_BEAT+": "+semantic.beatId);
    const before=await page.evaluate(()=>({
      beat:getActiveStorySceneRuntime()?.beatId||null,
      text:document.querySelector("#story-scene-presentation-layer .sc-story-text")?.textContent?.trim()||"",
      perf:typeof getStoryScenePerformance33900==="function"?getStoryScenePerformance33900()?.index:null
    }));
    await clickAnywhere(page);
    await page.waitForFunction(old=>{
      const rt=getActiveStorySceneRuntime();
      const text=document.querySelector("#story-scene-presentation-layer .sc-story-text")?.textContent?.trim()||"";
      const perf=typeof getStoryScenePerformance33900==="function"?getStoryScenePerformance33900()?.index:null;
      return rt?.beatId!==old.beat||text!==old.text||perf!==old.perf;
    },before,{timeout:8000});
  }
  throw new Error("guard exceeded before "+CHOICE_BEAT);
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await boot(page);

    // Ordinary dialogue/narration remains click-anywhere. Changing depth first must
    // not advance the Story; the subsequent stage click advances only presentation.
    const openingBefore=await semanticSnapshot(page);
    const openingPresentationBefore=await setDepth(page,"standard");
    const openingAfterDepth=await semanticSnapshot(page);
    assert.deepStrictEqual(openingAfterDepth,openingBefore,"depth switch advanced or mutated opening Story state");
    const openingTextBefore=await page.locator("#story-scene-presentation-layer .sc-story-text").textContent();
    await clickAnywhere(page);
    await page.waitForFunction(text=>document.querySelector("#story-scene-presentation-layer .sc-story-text")?.textContent!==text,openingTextBefore,{timeout:8000});
    const openingAfterClick=await semanticSnapshot(page);
    assert.strictEqual(openingAfterClick.sceneId,openingBefore.sceneId);
    assert.strictEqual(openingAfterClick.beatId,openingBefore.beatId,"ordinary click-anywhere unexpectedly skipped semantic beat");
    assert.strictEqual(openingPresentationBefore.boardVisible,true);

    await toFirstChoice(page);

    // Supply one presentation-only authority-context canary through the existing
    // canonical context seam. No Story beat, choice, history or Knowledge is edited.
    const canary=await page.evaluate(()=>{
      const original=globalThis.getStorySceneAuthoritySuppliedContextItems;
      if(typeof original!=="function")return{success:false,reason:"context_authority_missing"};
      if(!globalThis.__ISSUE_32_ORIGINAL_CONTEXT_AUTHORITY)globalThis.__ISSUE_32_ORIGINAL_CONTEXT_AUTHORITY=original;
      globalThis.getStorySceneAuthoritySuppliedContextItems=function(model){
        const base=globalThis.__ISSUE_32_ORIGINAL_CONTEXT_AUTHORITY(model);
        return [{id:"issue32_browser_canary",label:"CURRENT SITUATION",value:"Authority-provided browser canary"},...(Array.isArray(base)?base:[])];
      };
      if(typeof renderStorySceneBoard33900==="function")renderStorySceneBoard33900();
      return{success:true};
    });
    assert.strictEqual(canary.success,true,JSON.stringify(canary));

    const semanticBaseline=await semanticSnapshot(page);
    assert.strictEqual(semanticBaseline.sceneId,SCENE_ID);
    assert.strictEqual(semanticBaseline.beatId,CHOICE_BEAT);
    assert.strictEqual(semanticBaseline.mode,"choice");
    assert.strictEqual(semanticBaseline.choices.length,2);

    const quick=await setDepth(page,"quick");
    const semanticQuick=await semanticSnapshot(page);
    await page.locator("#story-scene-presentation-layer").screenshot({path:path.join(OUT,"01-quick.png")});

    const standard=await setDepth(page,"standard");
    const semanticStandard=await semanticSnapshot(page);
    await page.locator("#story-scene-presentation-layer").screenshot({path:path.join(OUT,"02-standard.png")});

    const full=await setDepth(page,"full");
    const semanticFull=await semanticSnapshot(page);
    await page.locator("#story-scene-presentation-layer").screenshot({path:path.join(OUT,"03-full.png")});

    assert.deepStrictEqual(semanticQuick,semanticBaseline,"Quick changed semantic Story state");
    assert.deepStrictEqual(semanticStandard,semanticBaseline,"Standard changed semantic Story state");
    assert.deepStrictEqual(semanticFull,semanticBaseline,"Full changed semantic Story state");

    assert.strictEqual(quick.depth,"quick");
    assert.strictEqual(standard.depth,"standard");
    assert.strictEqual(full.depth,"full");
    assert.strictEqual(quick.topVisible,false,"Quick did not suppress secondary top context");
    assert.strictEqual(quick.contextVisible,false,"Quick rendered Full context");
    assert.strictEqual(quick.visibleActorSublabels,0,"Quick retained secondary actor-state sublabels");
    assert.strictEqual(standard.topVisible,true,"Standard lost current Scene Board baseline top treatment");
    assert.strictEqual(standard.contextVisible,false,"Standard incorrectly rendered Full context panel");
    assert.strictEqual(full.topVisible,true,"Full lost baseline location/objective treatment");
    assert.strictEqual(full.contextVisible,true,"Full did not project authority-supplied context");
    assert(full.contextText.includes("Authority-provided browser canary"),"Full context did not consume canonical authority seam");
    assert.strictEqual(quick.visibleChoices.length,semanticBaseline.choices.length);
    assert.deepStrictEqual(quick.visibleChoices,standard.visibleChoices);
    assert.deepStrictEqual(standard.visibleChoices,full.visibleChoices);
    assert.strictEqual(full.boardVisible,true);
    assert(full.actorIds.length>0,"staged Character Cards disappeared");
    assert(full.backdrop,"Scene Board backdrop missing");
    assert.strictEqual(full.convoBitmapVisible,0,"UI/convo.png was introduced as literal Story renderer");
    assert.strictEqual(full.diagnostics?.pass,true,JSON.stringify(full.diagnostics));

    // Meaningful choices remain explicit: clicking the stage must not commit one.
    const choiceBefore=await semanticSnapshot(page);
    await clickAnywhere(page);
    await page.waitForTimeout(100);
    const choiceAfterBackground=await semanticSnapshot(page);
    assert.deepStrictEqual(choiceAfterBackground,choiceBefore,"click-anywhere committed meaningful choice");

    const firstChoice=page.locator("#story-scene-presentation-layer .sc-story-choice").first();
    await firstChoice.click();
    await page.waitForFunction(oldBeat=>getActiveStorySceneRuntime()?.beatId!==oldBeat,choiceBefore.beatId,{timeout:8000});

    // Critical #528 lesson: snapshot runtime errors before page/context teardown.
    const gateEvidence=await gate.assertClean("issue-32-chronicle-depth");
    assert.strictEqual(gateEvidence.unexpectedCount,0);

    console.log(JSON.stringify({
      pass:true,
      issue:32,
      sceneId:SCENE_ID,
      comparedBeat:CHOICE_BEAT,
      sameSemanticStateAcrossDepths:true,
      quickLean:true,
      standardBaseline:true,
      fullAuthorityContext:true,
      clickAnywhereOrdinaryDialogue:true,
      explicitMeaningfulChoices:true,
      backdropAndActorsPreserved:true,
      literalConvoBitmapRenderer:false,
      browserRuntimeErrorGateBeforeTeardown:true,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
