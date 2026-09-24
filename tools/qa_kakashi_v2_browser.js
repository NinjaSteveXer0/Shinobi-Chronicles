#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const crypto=require("crypto");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BUILD_MANIFEST=JSON.parse(fs.readFileSync(path.join(__dirname,"fixtures/runtime_build_manifest_303.json"),"utf8"));

const BASE=process.env.KAKASHI_V2_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.KAKASHI_V2_BROWSER_OUT||"artifacts/kakashi-v2-browser";
fs.mkdirSync(OUT,{recursive:true});

function pause(ms){return new Promise(resolve=>setTimeout(resolve,ms));}

async function boot(browser){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const runtimeErrorGate=await installBrowserRuntimeErrorGate(page);
  await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_){}});
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof globalThis.getRuntimeBuildFingerprint==="function",null,{timeout:10000});
  const runtimeFingerprint=await page.evaluate(()=>globalThis.getRuntimeBuildFingerprint());
  assert.deepStrictEqual(runtimeFingerprint,BUILD_MANIFEST,"installed browser runtime fingerprint does not match committed manifest");
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
  return{context,page,runtimeFingerprint,runtimeErrorGate};
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

async function waitCurtainClear(page,label="transition"){
  await page.waitForFunction(()=>{
    const curtain=document.getElementById("sc-story-hard-transition-33900");
    return !curtain||(!curtain.classList.contains("is-covered")&&!curtain.classList.contains("is-releasing")&&getComputedStyle(curtain).visibility==="hidden");
  },null,{timeout:3000});
  const row=await page.evaluate(()=>{
    const curtain=document.getElementById("sc-story-hard-transition-33900");
    return{exists:!!curtain,classes:curtain?.className||"",owner:curtain?.dataset?.scStoryTransitionOwner||null,opacity:curtain?Number(getComputedStyle(curtain).opacity):0,visibility:curtain?getComputedStyle(curtain).visibility:"hidden"};
  });
  assert(row.visibility==="hidden"||row.opacity<=0.01,label+" curtain remained visibly opaque: "+JSON.stringify(row));
  if(row.exists)assert.strictEqual(row.owner,"story.transition.presentation.shared",label+" curtain owner drifted");
  return row;
}

async function waitVisualReady(page,label="scene"){
  const result=await page.evaluate(async()=>{
    const p=globalThis.getAcademyKakashiV2Presentation36020&&globalThis.getAcademyKakashiV2Presentation36020(getActiveStorySceneRuntime()?.beatId);
    if(!p)return{success:false,reason:"projection_missing"};
    const sources=[p.backdrop,...(p.actors||[]).map(a=>a&&a.image)].filter(Boolean);
    const rows=await Promise.all(sources.map(src=>new Promise(resolve=>{
      const img=new Image();
      let settled=false;
      const done=ok=>{if(settled)return;settled=true;resolve({src,ok,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight});};
      img.onload=()=>done(true);img.onerror=()=>done(false);img.src=src;
      if(img.complete)setTimeout(()=>done(img.naturalWidth>0),0);
    })));
    if(globalThis.renderAcademyKakashiV236030)globalThis.renderAcademyKakashiV236030();
    return{success:rows.every(r=>r.ok&&r.naturalWidth>0&&r.naturalHeight>0),rows};
  });
  assert(result&&result.success===true,label+" assets not ready: "+JSON.stringify(result));
  await page.waitForFunction(()=>{
    const root=document.getElementById("kakashi-v2-scene-board");if(!root)return false;
    return [...root.querySelectorAll(".kv2-actor img")].every(img=>img.complete&&img.naturalWidth>0&&img.naturalHeight>0);
  },null,{timeout:12000});
  await pause(60);
  return result;
}

async function shot(page,name,{skipReady=false}={}){
  if(!skipReady)await waitVisualReady(page,name);
  await page.locator("#kakashi-v2-scene-board").screenshot({path:path.join(OUT,name)});
}

async function inspect(page,label){
  const row=await page.evaluate(()=>{
    const root=document.getElementById("kakashi-v2-scene-board");
    const visible=n=>!!n&&n.getClientRects().length>0&&getComputedStyle(n).display!=="none"&&getComputedStyle(n).visibility!=="hidden"&&Number(getComputedStyle(n).opacity)!==0;
    const legacy=[...document.querySelectorAll("#story-scene-presentation-layer .sc-story-panel,#story-scene-presentation-layer .sc-chronicle-layout,.sc-dialogue-panel-33910,.sc-narration-panel-33910")].filter(visible);
    const canonicalRoots=[...document.querySelectorAll("#kakashi-v2-scene-board")].filter(visible);
    const dialogue=root&&root.querySelector(".kv2-dialogue");
    const speech=root&&root.querySelector(".kv2-speech");
    const receipt=root&&root.querySelector(".kv2-receipt");
    return{
      beatId:getActiveStorySceneRuntime()?.beatId||null,
      preset:root?.dataset.preset||null,
      cueKind:root?.dataset.cueKind||null,
      geometry:runAcademyKakashiV2Geometry36030(),
      renderer:runAcademyKakashiV2Renderer36030Diagnostics(),
      transition:runAcademyKakashiV2Transition36040Diagnostics(),
      visibleCanonicalRoots:canonicalRoots.length,
      visibleLegacyStorySurfaces:legacy.length,
      visibleNarrationSurfaces:visible(dialogue)?1:0,
      visibleSpeechSurfaces:visible(speech)?1:0,
      receiptVisible:visible(receipt)
    };
  });
  assert(row.renderer.pass,label+" renderer: "+JSON.stringify(row.renderer));
  assert(row.transition.pass,label+" transition: "+JSON.stringify(row.transition));
  assert.strictEqual(row.visibleCanonicalRoots,1,label+" canonical Story root cardinality");
  assert.strictEqual(row.visibleLegacyStorySurfaces,0,label+" legacy Story surface visible");
  if(row.preset==="chronicle_receipt"){
    assert.strictEqual(row.visibleNarrationSurfaces+row.visibleSpeechSurfaces,0,label+" receipt must replace Story text surfaces");
    assert.strictEqual(row.receiptVisible,true,label+" receipt not visible");
  }else{
    assert(row.geometry.pass,label+" geometry: "+JSON.stringify(row.geometry));
    assert.strictEqual(row.visibleNarrationSurfaces+row.visibleSpeechSurfaces,1,label+" exactly one narration/speech surface must be visible");
    if(row.cueKind==="dialogue")assert.strictEqual(row.visibleSpeechSurfaces,1,label+" dialogue must use actor-linked speech surface");
    else assert.strictEqual(row.visibleNarrationSurfaces,1,label+" narration must use compact narration surface");
  }
  return row;
}


async function assertSingleAdvancePaths(page){
  const before=await page.evaluate(()=>({
    beatId:getActiveStorySceneRuntime()?.beatId||null,
    state:getAcademyKakashiV2TransitionState36040()
  }));
  assert(before.state&&before.state.cueCount>=3,"single-advance fixture needs at least three cues");

  await page.locator("#kakashi-v2-scene-board").click({position:{x:720,y:180}});
  await pause(70);
  const afterClick=await page.evaluate(()=>({
    beatId:getActiveStorySceneRuntime()?.beatId||null,
    state:getAcademyKakashiV2TransitionState36040()
  }));
  const singleAdvanceClick=afterClick.beatId===before.beatId&&afterClick.state.cueIndex===before.state.cueIndex+1;
  assert.strictEqual(singleAdvanceClick,true,"one non-interactive stage click must advance exactly one cue: "+JSON.stringify({before,afterClick}));

  await page.keyboard.press("Enter");
  await pause(70);
  const afterKeyboard=await page.evaluate(()=>({
    beatId:getActiveStorySceneRuntime()?.beatId||null,
    state:getAcademyKakashiV2TransitionState36040()
  }));
  const singleAdvanceKeyboard=afterKeyboard.beatId===before.beatId&&afterKeyboard.state.cueIndex===afterClick.state.cueIndex+1;
  assert.strictEqual(singleAdvanceKeyboard,true,"one keyboard action must advance exactly one cue: "+JSON.stringify({afterClick,afterKeyboard}));

  const reset=await page.evaluate(()=>globalThis.resetAcademyKakashiV2Transition36040());
  assert(reset&&reset.success===true,JSON.stringify(reset));
  const resetState=await page.evaluate(()=>getAcademyKakashiV2TransitionState36040());
  assert.strictEqual(resetState.cueIndex,0,"single-advance fixture failed to reset cursor");
  return{singleAdvanceClick,singleAdvanceKeyboard};
}

async function assertSingleChoiceSurface(page,label){
  await drain(page);
  const row=await page.evaluate(()=>{
    const visible=n=>!!n&&n.getClientRects().length>0&&getComputedStyle(n).display!=="none"&&getComputedStyle(n).visibility!=="hidden"&&Number(getComputedStyle(n).opacity)!==0;
    const root=document.getElementById("kakashi-v2-scene-board");
    const canonical=[...root.querySelectorAll(".kv2-actions")].filter(n=>visible(n)&&n.querySelectorAll("button").length>0);
    const legacy=[...document.querySelectorAll("#story-scene-presentation-layer .sc-chronicle-actions,#story-scene-presentation-layer .sc-story-choice")].filter(visible);
    return{canonicalChoiceSurfaces:canonical.length,legacyChoiceSurfaces:legacy.length,choiceButtons:canonical.reduce((n,box)=>n+box.querySelectorAll("button").length,0)};
  });
  assert.strictEqual(row.canonicalChoiceSurfaces,1,label+" canonical choice surface cardinality");
  assert.strictEqual(row.legacyChoiceSurfaces,0,label+" legacy choice surface visible");
  assert(row.choiceButtons>0,label+" expected at least one authored choice");
  return{label,...row};
}

async function fastDrain(page){
  const result=await page.evaluate(()=>{
    const rt=globalThis.getActiveStorySceneRuntime&&globalThis.getActiveStorySceneRuntime();
    if(!rt)return{success:false,reason:"story_runtime_missing"};
    const p=globalThis.getAcademyKakashiV2Presentation36020&&globalThis.getAcademyKakashiV2Presentation36020(rt.beatId);
    const count=p&&Array.isArray(p.cues)?p.cues.length:0;
    if(!rt.localContext||typeof rt.localContext!=="object")rt.localContext={};
    rt.localContext.__kakashiV2Presentation36040={beatId:rt.beatId,cueIndex:Math.max(0,count-1),settled:true};
    if(typeof savePlayerData==="function")savePlayerData();
    if(typeof renderAcademyKakashiV236030==="function")renderAcademyKakashiV236030();
    return{success:true,beatId:rt.beatId,cueCount:count};
  });
  assert(result&&result.success===true,JSON.stringify(result));
  return result;
}

async function waitBeatChange(page,oldBeat,expected=null){
  await page.waitForFunction(({oldBeat,expected})=>{
    const rt=globalThis.getActiveStorySceneRuntime&&globalThis.getActiveStorySceneRuntime();
    const t=globalThis.getAcademyKakashiV2TransitionState36040&&globalThis.getAcademyKakashiV2TransitionState36040();
    if(!rt||!t||t.locked!==false)return false;
    return expected?rt.beatId===expected:rt.beatId!==oldBeat;
  },{oldBeat,expected},{timeout:12000});
}

async function chooseLabel(page,label,expected=null){
  await fastDrain(page);
  const before=await currentBeat(page);
  const selected=await page.evaluate(label=>{
    const beat=globalThis.getCurrentStorySceneBeat&&globalThis.getCurrentStorySceneBeat();
    if(!beat)return{success:false,reason:"beat_missing"};
    const rows=(beat.choices||[]).filter(row=>row&&row.label===label);
    const row=rows.find(candidate=>typeof candidate.availability!=="function"||candidate.availability().available===true);
    if(!row)return{success:false,reason:"choice_unavailable",label,available:(beat.choices||[]).map(x=>x.label)};
    const result=globalThis.advanceAcademyKakashiV236040(row.choiceId);
    return{success:!!result&&result.success===true,result,choiceId:row.choiceId};
  },label);
  assert(selected&&selected.success===true,JSON.stringify(selected));
  await waitBeatChange(page,before,expected);
  return selected;
}

async function nextSemantic(page,expected=null){
  await fastDrain(page);
  const before=await currentBeat(page);
  const result=await page.evaluate(()=>globalThis.advanceAcademyKakashiV236040());
  assert(result&&result.success===true,JSON.stringify(result));
  await waitBeatChange(page,before,expected);
  return result;
}

async function seedResolver(page,key,outcome){
  const result=await page.evaluate(({key,outcome})=>{
    const s=globalThis.getAcademyKakashiV2State36020&&globalThis.getAcademyKakashiV2State36020();
    if(!s)return{success:false,reason:"state_missing"};
    s.resolvers[key]={selectedOutcomeRef:outcome,receiptId:`browser_matrix:${key}:${outcome}`,resolutionMode:"installed_browser_matrix_fixture"};
    if(typeof savePlayerData==="function")savePlayerData();
    return{success:true,key,outcome};
  },{key,outcome});
  assert(result&&result.success===true,JSON.stringify(result));
}

async function advanceTo(page,target,{max=18}={}){
  for(let i=0;i<max;i++){
    const id=await currentBeat(page);
    if(id===target)return id;
    const meta=await page.evaluate(()=>{
      const beat=globalThis.getCurrentStorySceneBeat&&globalThis.getCurrentStorySceneBeat();
      if(!beat)return null;
      const available=(beat.choices||[]).filter(c=>typeof c.availability!=="function"||c.availability().available===true).map(c=>({choiceId:c.choiceId,label:c.label}));
      return{beatId:beat.beatId,mode:beat.mode||null,available,nextBeatId:beat.nextBeatId||null};
    });
    assert(meta,"story beat metadata missing while advancing to "+target);
    if(meta.mode==="battle_transition")throw new Error(`unexpected Battle ${meta.beatId} while advancing to ${target}`);
    if(meta.mode==="choice"){
      assert.strictEqual(meta.available.length,1,`ambiguous choice at ${meta.beatId} while advancing to ${target}: ${JSON.stringify(meta.available)}`);
      assert.strictEqual(meta.available[0].label,"CONTINUE",`non-CONTINUE choice requires explicit route decision at ${meta.beatId}`);
      await chooseLabel(page,"CONTINUE");
    }else{
      await nextSemantic(page);
    }
  }
  throw new Error(`advanceTo guard exceeded: target=${target}, current=${await currentBeat(page)}`);
}

async function launchAndReturnBattle(page,{outcome="victory",actions=1,expectedBeat=null,assertVisible=false}={}){
  const battleBeat=await currentBeat(page);
  const meta=await page.evaluate(()=>{const b=getCurrentStorySceneBeat();return b?{mode:b.mode,encounterId:b.battle&&b.battle.encounterId||null}:null;});
  assert(meta&&meta.mode==="battle_transition",`expected Battle transition at ${battleBeat}: ${JSON.stringify(meta)}`);
  await fastDrain(page);
  const launched=await page.evaluate(()=>globalThis.advanceAcademyKakashiV236040());
  assert(launched&&launched.success===true,JSON.stringify(launched));
  await page.waitForFunction(()=>!!(typeof currentBattle!=="undefined"&&currentBattle&&currentBattle.returnContext&&currentBattle.returnContext.type==="story_scene"),null,{timeout:12000});
  await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});
  if(assertVisible){
    await page.waitForFunction(()=>{
      const visible=node=>!!node&&node.getClientRects().length>0&&getComputedStyle(node).display!=="none"&&getComputedStyle(node).visibility!=="hidden";
      return visible(document.querySelector(".alpha-code-battle-stage"))&&!visible(document.getElementById("kakashi-v2-scene-board"));
    },null,{timeout:12000});
  }
  const resumed=await page.evaluate(({outcome,actions})=>{
    const prior=globalThis.getBattleActionOpportunityIndex;
    globalThis.getBattleActionOpportunityIndex=(side,participantId)=>{
      if(side==="player"&&participantId==="academy_kakashi")return actions;
      return typeof prior==="function"?prior(side,participantId):0;
    };
    try{
      currentBattle.outcome={...(currentBattle.outcome||{}),type:outcome,completedAt:Date.now(),finishingShinobiId:outcome==="victory"?"academy_kakashi":null};
      currentBattle.battleOver=true;
      currentBattle.active=false;
      return resumeBattleCallerAfterCompletion(outcome);
    }finally{
      globalThis.getBattleActionOpportunityIndex=prior;
    }
  },{outcome,actions});
  assert(resumed&&resumed.success===true,JSON.stringify(resumed));
  await page.waitForSelector("#kakashi-v2-scene-board",{state:"visible",timeout:12000});
  await page.evaluate(()=>resetAcademyKakashiV2Transition36040());
  await waitUnlocked(page,expectedBeat);
  if(expectedBeat)assert.strictEqual(await currentBeat(page),expectedBeat);
  const authored=await page.evaluate(()=>getActiveStorySceneRuntime()?.battleResume?.authored||null);
  assert(authored&&Number(authored.playerActionOpportunityCount)===actions,`Battle action count did not round-trip: expected ${actions}, got ${JSON.stringify(authored)}`);
  return{battleBeat,outcome,actions,expectedBeat,resumed};
}

async function toScene02Root(page){
  assert.strictEqual(await currentBeat(page),"v2_scene01_rooftop");
  await nextSemantic(page,"v2_scene02_tail");
  assert.strictEqual(await currentBeat(page),"v2_scene02_tail");
}

async function stateSnapshot(page){
  return page.evaluate(()=>JSON.parse(JSON.stringify(getAcademyKakashiV2State36020())));
}


function percentile(values,p){
  if(!values.length)return 0;
  const sorted=[...values].sort((a,b)=>a-b);
  return sorted[Math.min(sorted.length-1,Math.max(0,Math.ceil(sorted.length*p)-1))];
}

async function clickThroughTerminalBeat(page,{label,expectedBeat,nextBeat,expectedCueCount=null,minCueCount=15}){
  assert.strictEqual(await currentBeat(page),expectedBeat,label+" terminal beat mismatch");
  await waitVisualReady(page,label);
  const initial=await page.evaluate(()=>{
    const root=document.getElementById("kakashi-v2-scene-board");
    const state=getAcademyKakashiV2TransitionState36040();
    const visible=node=>!!node&&node.getClientRects().length>0&&getComputedStyle(node).display!=="none"&&getComputedStyle(node).visibility!=="hidden"&&Number(getComputedStyle(node).opacity)>0;
    const textNode=[root?.querySelector(".kv2-speech"),root?.querySelector(".kv2-dialogue")].find(visible)||null;
    globalThis.__kv2TerminalCadenceRoot=root;
    return{
      cueIndex:state?.cueIndex??null,
      cueCount:state?.cueCount??0,
      text:textNode?.textContent?.trim()||"",
      rootMounted:!!root
    };
  });
  assert.strictEqual(initial.rootMounted,true,label+" Scene Board missing");
  assert(initial.cueCount>=minCueCount,label+" terminal beat is underwritten: "+JSON.stringify(initial));
  if(expectedCueCount!==null)assert.strictEqual(initial.cueCount,expectedCueCount,label+" cue count drifted from current Writing authority");
  assert(initial.text.length>0,label+" initial terminal cue is blank");

  const texts=[initial.text],timings=[];
  let previousIndex=initial.cueIndex;
  while(previousIndex<initial.cueCount-1){
    const started=Date.now();
    await page.locator("#kakashi-v2-scene-board").click({position:{x:720,y:180}});
    await page.waitForFunction(({beat,index})=>{
      const rt=getActiveStorySceneRuntime(),state=getAcademyKakashiV2TransitionState36040();
      return !!rt&&rt.beatId===beat&&!!state&&state.cueIndex===index+1;
    },{beat:expectedBeat,index:previousIndex},{timeout:3000});
    timings.push(Date.now()-started);
    const frame=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const state=getAcademyKakashiV2TransitionState36040();
      const visible=node=>!!node&&node.getClientRects().length>0&&getComputedStyle(node).display!=="none"&&getComputedStyle(node).visibility!=="hidden"&&Number(getComputedStyle(node).opacity)>0;
      const textNode=[root?.querySelector(".kv2-speech"),root?.querySelector(".kv2-dialogue")].find(visible)||null;
      return{
        cueIndex:state?.cueIndex??null,
        text:textNode?.textContent?.trim()||"",
        sameRoot:globalThis.__kv2TerminalCadenceRoot===root,
        canonicalRoots:[...document.querySelectorAll("#kakashi-v2-scene-board")].filter(visible).length,
        legacyVisible:[...document.querySelectorAll("#story-scene-presentation-layer .sc-story-panel,#story-scene-presentation-layer .sc-chronicle-layout,.sc-dialogue-panel-33910,.sc-narration-panel-33910")].filter(visible).length
      };
    });
    assert.strictEqual(frame.sameRoot,true,label+" cue advance remounted the Scene Board");
    assert.strictEqual(frame.canonicalRoots,1,label+" cue advance duplicated the canonical Scene Board");
    assert.strictEqual(frame.legacyVisible,0,label+" cue advance exposed a legacy Story surface");
    assert(frame.text.length>0,label+" cue "+frame.cueIndex+" is blank");
    texts.push(frame.text);
    previousIndex=frame.cueIndex;
  }

  for(let i=1;i<texts.length;i++){
    assert.notStrictEqual(texts[i],texts[i-1],label+" repeats the exact same adjacent player-facing cue");
  }

  const oldBeat=await currentBeat(page);
  await page.locator("#kakashi-v2-scene-board").click({position:{x:720,y:180}});
  await waitBeatChange(page,oldBeat,nextBeat);
  return{
    beatId:expectedBeat,
    cueCount:initial.cueCount,
    displayedCueCount:texts.length,
    p50CueAdvanceMs:percentile(timings,.50),
    p95CueAdvanceMs:percentile(timings,.95),
    maxCueAdvanceMs:timings.length?Math.max(...timings):0,
    rootPreservedAcrossCues:true,
    adjacentExactDuplicates:0,
    nextBeat
  };
}

async function validateTerminalCadence(page,label,{expectedReportCount=null,expectedMinatoCount=null}={}){
  assert.strictEqual(await currentBeat(page),"v2_report",label+" must enter at ANBU report");
  const stateAtReport=await stateSnapshot(page);
  await shot(page,"terminal-"+label+"-report.png");
  const report=await clickThroughTerminalBeat(page,{
    label:label+":report",
    expectedBeat:"v2_report",
    nextBeat:"v2_minato",
    expectedCueCount:expectedReportCount,
    minCueCount:15
  });
  await shot(page,"terminal-"+label+"-minato.png");
  const minato=await clickThroughTerminalBeat(page,{
    label:label+":minato",
    expectedBeat:"v2_minato",
    nextBeat:"v2_receipt",
    expectedCueCount:expectedMinatoCount,
    minCueCount:15
  });
  const receipt=await inspect(page,label+":receipt");
  return{stateAtReport,report,minato,receipt};
}

async function terminalStoryBrowserValidation(browser){
  const results=[];

  async function scenario(name,run,expectations={}){
    const {context,page,runtimeErrorGate}=await boot(browser);
    try{
      await toScene02Root(page);
      const detail=await run(page)||{};
      assert.strictEqual(await currentBeat(page),"v2_report",name+" did not reach ANBU report");
      const cadence=detail.skipTerminalCadence?null:await validateTerminalCadence(page,name,expectations);
      const browserErrors=await runtimeErrorGate.assertClean("terminal-story:"+name);
      results.push({name,success:true,cadence,...detail,browserErrors});
    }finally{
      await context.close();
    }
  }

  await scenario("clean-pickpocket-success",async page=>{
    await seedResolver(page,"directPickpocket","PICKPOCKET_DIRECT_SUCCESS");
    await chooseLabel(page,"SLIP IN FOR THE PACKAGE","v2_direct_pickpocket_resolver");
    await advanceTo(page,"v2_pickpocket_clean_success");
    await nextSemantic(page,"v2_report");
    const st=await stateSnapshot(page);
    assert.strictEqual(st.package.holder,"ANBU");
    assert.strictEqual(st.package.returned,true);
    assert.strictEqual(st.participants.MI.state,"UNSEEN");
  },{expectedReportCount:21,expectedMinatoCount:20});

  await scenario("direct-strike-2v1-loss",async page=>{
    await chooseLabel(page,"STRIKE BEFORE THE HANDOFF","v2_direct_strike_setup");
    await advanceTo(page,"v2_battle_direct_strike_2v1");
    await launchAndReturnBattle(page,{outcome:"defeat",actions:4,expectedBeat:"v2_direct_strike_2v1_loss"});
    await nextSemantic(page,"v2_report");
    const st=await stateSnapshot(page);
    assert.strictEqual(st.package.holder,"AMT");
    assert.strictEqual(st.participants.AMT.state,"ESCAPED");
    assert.strictEqual(st.participants.PS.state,"ESCAPED");
  },{expectedReportCount:30,expectedMinatoCount:23});

  await scenario("direct-strike-win-then-mi-loss",async page=>{
    await chooseLabel(page,"STRIKE BEFORE THE HANDOFF","v2_direct_strike_setup");
    await advanceTo(page,"v2_battle_direct_strike_2v1");
    await launchAndReturnBattle(page,{outcome:"victory",actions:3,expectedBeat:"v2_direct_strike_2v1_win"});
    await nextSemantic(page,"v2_battle_direct_mi");
    await launchAndReturnBattle(page,{outcome:"defeat",actions:4,expectedBeat:"v2_direct_mi_loss"});
    await nextSemantic(page,"v2_report");
    const st=await stateSnapshot(page);
    assert.strictEqual(st.package.holder,"MI");
    assert.strictEqual(st.package.recovered,false);
    assert.strictEqual(st.participants.MI.state,"ESCAPED");
  });

  await scenario("direct-strike-double-win-live-anbu-custody",async page=>{
    await chooseLabel(page,"STRIKE BEFORE THE HANDOFF","v2_direct_strike_setup");
    await advanceTo(page,"v2_battle_direct_strike_2v1");
    await launchAndReturnBattle(page,{outcome:"victory",actions:3,expectedBeat:"v2_direct_strike_2v1_win"});
    await nextSemantic(page,"v2_battle_direct_mi");
    await launchAndReturnBattle(page,{outcome:"victory",actions:2,expectedBeat:"v2_direct_mi_win"});
    await chooseLabel(page,"BRING THEM TO ANBU","v2_group3_anbu_depart");
    let st=await stateSnapshot(page);
    for(const ref of ["AMT","PS","MI"])assert.strictEqual(st.participants[ref].state,"BATTLE_DEFEATED","custody committed before group handoff");
    await advanceTo(page,"v2_group3_anbu_handoff");
    await nextSemantic(page,"v2_report");
    st=await stateSnapshot(page);
    for(const ref of ["AMT","PS","MI"])assert.strictEqual(st.participants[ref].state,"ANBU_CUSTODY");
    return{skipTerminalCadence:true,knownTerminalBlocker:"kakashi_v2_terminal_cap_policy_unresolved"};
  },{expectedReportCount:30,expectedMinatoCount:22});

  await scenario("police-ending",async page=>{
    await seedResolver(page,"getCloser","GET_CLOSER_SUCCESS");
    await seedResolver(page,"improvedPickpocket","PICKPOCKET_IMPROVED_FAILURE");
    await chooseLabel(page,"MOVE IN CLOSER","v2_get_closer_resolver");
    await advanceTo(page,"v2_get_closer_success");
    await chooseLabel(page,"ATTEMPT THE PICKPOCKET","v2_improved_pickpocket_resolver");
    await advanceTo(page,"v2_battle_improved_2v1");
    await launchAndReturnBattle(page,{outcome:"victory",actions:3,expectedBeat:"v2_improved_2v1_win"});
    await chooseLabel(page,"TAKE THEM TO THE UCHIHA POLICE","v2_group2_police_depart");
    let st=await stateSnapshot(page);
    assert.strictEqual(st.participants.AMT.state,"BATTLE_DEFEATED");
    assert.strictEqual(st.participants.PS.state,"BATTLE_DEFEATED");
    await advanceTo(page,"v2_group2_police_handoff");
    await nextSemantic(page,"v2_report");
    st=await stateSnapshot(page);
    assert.strictEqual(st.participants.AMT.state,"POLICE_CUSTODY");
    assert.strictEqual(st.participants.PS.state,"POLICE_CUSTODY");
    assert.strictEqual(st.participants.MI.state,"UNSEEN");
  });

  await scenario("deliberate-release-ending",async page=>{
    await seedResolver(page,"directPickpocket","PICKPOCKET_DIRECT_FAILURE");
    await chooseLabel(page,"SLIP IN FOR THE PACKAGE","v2_direct_pickpocket_resolver");
    await advanceTo(page,"v2_battle_pickpocket_3v1");
    await launchAndReturnBattle(page,{outcome:"victory",actions:3,expectedBeat:"v2_pickpocket_3v1_win"});
    await chooseLabel(page,"LET THEM GO","v2_group3_release");
    let st=await stateSnapshot(page);
    for(const ref of ["AMT","PS","MI"])assert.strictEqual(st.participants[ref].state,"RELEASED");
    await nextSemantic(page,"v2_report");
    st=await stateSnapshot(page);
    assert.strictEqual(st.package.holder,"ANBU");
  });

  await scenario("package-loss-ending",async page=>{
    await seedResolver(page,"amtPursuitRoot","AMT_PURSUIT_FAILURE");
    await chooseLabel(page,"WATCH THE EXCHANGE","v2_watch_exchange");
    await chooseLabel(page,"GO AFTER THE ORIGINAL TARGET","v2_go_amt_pursuit_resolver");
    await advanceTo(page,"v2_amt_direct_pursuit_fail");
    await nextSemantic(page,"v2_report");
    const st=await stateSnapshot(page);
    assert.strictEqual(st.package.returned,false);
    assert.notStrictEqual(st.package.holder,"ANBU");
  });

  await scenario("pakkun-amt-ending",async page=>{
    await seedResolver(page,"psPursuit","PS_PURSUIT_SUCCESS");
    await chooseLabel(page,"WATCH THE EXCHANGE","v2_watch_exchange");
    await chooseLabel(page,"STOP THE ASSASSIN","v2_stop_assassin_setup");
    await advanceTo(page,"v2_battle_mi_stop");
    await launchAndReturnBattle(page,{outcome:"victory",actions:3,expectedBeat:"v2_mi_stop_win"});
    await chooseLabel(page,"GO AFTER PACKAGE SMUGGLER","v2_ps_pursuit_resolver");
    await advanceTo(page,"v2_battle_ps_seq");
    await launchAndReturnBattle(page,{outcome:"victory",actions:3,expectedBeat:"v2_ps_seq_win"});
    await chooseLabel(page,"GO AFTER ANBU MARKED TARGET","v2_amt_after_ps");
    await advanceTo(page,"v2_battle_amt_seq_pakkun");
    await launchAndReturnBattle(page,{outcome:"defeat",actions:4,expectedBeat:"v2_amt_seq_loss"});
    await nextSemantic(page,"v2_report");
    const st=await stateSnapshot(page);
    assert.strictEqual(st.pakkun.present,true);
    assert.strictEqual(st.participants.AMT.state,"ESCAPED");
    assert.strictEqual(st.package.returned,true);
  });

  assert.strictEqual(results.length,8);
  return{
    pass:true,
    issue:105,
    authority:"Academy_Kakashi_Ending_Cohesion_AMBER_Repair_2026-09-23",
    routesValidated:results.length,
    post322DispositionManualRoutesPending:[
      "KILL -> KILLED",
      "KILL -> ESCAPED",
      "RESTRAIN -> RESTRAINED",
      "RESTRAIN -> ESCAPED"
    ],
    post322Reason:"Replacement semantics are implemented and source-regressed; exact installed-browser acceptance for all four factual outcomes remains a separate manual/browser subgate.",
    results
  };
}

async function finishTerminalBrowser(page,label){
  await advanceTo(page,"v2_report",{max:20});
  const report=await inspect(page,label+":report");
  await nextSemantic(page,"v2_minato");
  await nextSemantic(page,"v2_receipt");
  const receipt=await inspect(page,label+":receipt");
  await nextSemantic(page,"v2_complete");
  await fastDrain(page);
  const final=await page.evaluate(()=>globalThis.advanceAcademyKakashiV236040());
  assert(final&&final.success===true,label+" completion: "+JSON.stringify(final));
  await page.waitForFunction(()=>ensurePlayerAcquisitionState().chronicleOrigin?.prologueCompleted===true,null,{timeout:12000});
  const completed=await page.evaluate(()=>({
    originComplete:ensurePlayerAcquisitionState().chronicleOrigin?.prologueCompleted===true,
    teamFormationRequired:ensurePlayerAcquisitionState().academyTeamFormation?.required===true,
    activeStory:getActiveStorySceneRuntime()
  }));
  assert.strictEqual(completed.originComplete,true);
  assert.strictEqual(completed.teamFormationRequired,true);
  assert.strictEqual(completed.activeStory,null);
  return{report,receipt,completed};
}

async function cleanRoute(browser){
  const {context,page,runtimeErrorGate}=await boot(browser);
  const checkpoints=[];
  assert.strictEqual(await currentBeat(page),"v2_scene01_rooftop");
  checkpoints.push(await inspect(page,"rooftop"));
  await shot(page,"01-rooftop.png");
  checkpoints.push(await assertSingleAdvancePaths(page));

  await page.evaluate(()=>{globalThis.__kv2RootRef=document.getElementById("kakashi-v2-scene-board");});
  const first=await page.evaluate(()=>globalThis.advanceAcademyKakashiV236040());
  assert(first&&first.success===true&&first.semanticBeatUnchanged===true,JSON.stringify(first));
  assert.strictEqual(await page.evaluate(()=>globalThis.__kv2RootRef===document.getElementById("kakashi-v2-scene-board")),true,"cue advance remounted renderer root");

  await drain(page);
  const transitionResult=await page.evaluate(()=>globalThis.advanceAcademyKakashiV236040());
  assert(transitionResult&&transitionResult.success===true,JSON.stringify(transitionResult));
  const transitionProbe=await page.evaluate(()=>{
    const root=document.getElementById("kakashi-v2-scene-board"),curtain=document.getElementById("sc-story-hard-transition-33900");
    const actorRows=[...(root?.querySelectorAll(".kv2-actor")||[])].map(node=>({
      animationName:getComputedStyle(node).animationName,
      transitionDuration:getComputedStyle(node).transitionDuration,
      transform:getComputedStyle(node).transform
    }));
    return{
      ghostCount:root?.querySelectorAll(".kv2-actor-ghost").length||0,
      curtainCovered:!!curtain&&curtain.classList.contains("is-covered"),
      actorRows
    };
  });
  assert.strictEqual(transitionProbe.ghostCount,0,"rooftop transition created actor ghosts: "+JSON.stringify(transitionProbe));
  assert.strictEqual(transitionProbe.curtainCovered,true,"hard scene change did not use the global curtain: "+JSON.stringify(transitionProbe));
  assert(transitionProbe.actorRows.every(row=>row.animationName==="none"&&row.transitionDuration==="0s"),"actor animation/tween survived Golden motion kill-switch: "+JSON.stringify(transitionProbe));
  await waitUnlocked(page,"v2_scene02_tail");
  checkpoints.push(await waitCurtainClear(page,"rooftop-to-alley"));
  checkpoints.push(await inspect(page,"tail"));
  await shot(page,"03-alley-tail.png");
  checkpoints.push(await assertSingleChoiceSurface(page,"tail choices"));

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
  const browserErrors=await runtimeErrorGate.assertClean("cleanRoute");
  await context.close();
  return{checkpoints,transitionProbe,completion,browserErrors};
}

async function assertRepeatedBattleReentry(page){
  // Repeat the same Story -> Battle -> Story seam after one successful cycle.
  await page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime();
    rt.beatId="v2_battle_mi_stop";
    rt.pendingBattle=null;
    rt.battleResume=null;
    rt.localContext.__kakashiV2Presentation36040={beatId:"v2_battle_mi_stop",cueIndex:999,settled:true};
    renderAcademyKakashiV236030();
  });
  await drain(page);
  const launched=await page.evaluate(()=>globalThis.advanceAcademyKakashiV236040());
  assert(launched&&launched.success===true,JSON.stringify(launched));
  await page.waitForFunction(()=>!!(typeof currentBattle!=="undefined"&&currentBattle&&currentBattle.returnContext&&currentBattle.returnContext.type==="story_scene"),null,{timeout:12000});
  const resumed=await page.evaluate(()=>{
    currentBattle.outcome={type:"victory",completedAt:Date.now(),finishingShinobiId:"academy_kakashi"};
    currentBattle.battleOver=true;
    currentBattle.active=false;
    return resumeBattleCallerAfterCompletion("victory");
  });
  assert(resumed&&resumed.success===true,JSON.stringify(resumed));
  await page.waitForSelector("#kakashi-v2-scene-board",{state:"visible",timeout:12000});
  await waitCurtainClear(page,"battle-to-story");
  await page.evaluate(()=>resetAcademyKakashiV2Transition36040());
  await waitUnlocked(page,"v2_mi_stop_win");

  const stableBefore=await page.evaluate(()=>({
    state:JSON.stringify(getAcademyKakashiV2State36020()),
    rootCount:document.querySelectorAll("#kakashi-v2-scene-board").length,
    renderer:runAcademyKakashiV2Renderer36030Diagnostics(),
    transition:runAcademyKakashiV2Transition36040Diagnostics()
  }));
  await pause(350);
  const stableAfter=await page.evaluate(()=>({
    state:JSON.stringify(getAcademyKakashiV2State36020()),
    rootCount:document.querySelectorAll("#kakashi-v2-scene-board").length,
    renderer:runAcademyKakashiV2Renderer36030Diagnostics(),
    transition:runAcademyKakashiV2Transition36040Diagnostics()
  }));
  assert.strictEqual(stableBefore.rootCount,1,"re-entry duplicate Story root before settle");
  assert.strictEqual(stableAfter.rootCount,1,"re-entry duplicate Story root after settle");
  assert.strictEqual(stableAfter.state,stableBefore.state,"stale timer/listener recommitted semantic state after re-entry");
  assert(stableBefore.renderer.pass&&stableAfter.renderer.pass,JSON.stringify({stableBefore,stableAfter}));
  assert(stableBefore.transition.pass&&stableAfter.transition.pass,JSON.stringify({stableBefore,stableAfter}));

  // Re-prove one physical action -> one presentation cue after repeated Battle return.
  await page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime();
    rt.beatId="v2_scene01_rooftop";
    rt.pendingBattle=null;
    rt.battleResume=null;
    resetAcademyKakashiV2Transition36040();
    renderAcademyKakashiV236030();
  });
  await waitUnlocked(page,"v2_scene01_rooftop");
  const singleAdvance=await assertSingleAdvancePaths(page);
  return{
    repeatedBattleReturns:2,
    rootCardinalityStable:true,
    semanticStateStableAfterSettle:true,
    rendererDiagnosticsGreen:true,
    transitionDiagnosticsGreen:true,
    oneClickOneCueAfterReentry:singleAdvance.singleAdvanceClick===true,
    oneKeyboardOneCueAfterReentry:singleAdvance.singleAdvanceKeyboard===true
  };
}

async function visualAndBattle(browser){
  const {context,page,runtimeErrorGate}=await boot(browser);
  await drain(page);
  await go(page,"v2_scene02_tail");
  await drain(page);
  await go(page,"v2_watch_exchange","watch_exchange");
  await waitVisualReady(page,"watch_exchange");
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
  await waitVisualReady(page,"mi_stop_win");
  await drain(page);
  const killResult=await page.evaluate(()=>globalThis.advanceAcademyKakashiV236040("mi_kill"));
  assert(killResult&&killResult.success===true,JSON.stringify(killResult));
  const killTransition=await page.evaluate(()=>{
    const root=document.getElementById("kakashi-v2-scene-board"),curtain=document.getElementById("sc-story-hard-transition-33900");
    const actorRows=[...(root?.querySelectorAll(".kv2-actor")||[])].map(node=>({
      animationName:getComputedStyle(node).animationName,
      transitionDuration:getComputedStyle(node).transitionDuration,
      transform:getComputedStyle(node).transform
    }));
    const state=getAcademyKakashiV2State36020();
    return{
      beatId:getActiveStorySceneRuntime()?.beatId||null,
      dispositionOutcome:state?.participants?.MI?.state||null,
      ghostCount:root?.querySelectorAll(".kv2-actor-ghost,.kv2-departure-ghost,.kv2-outgoing-hold-ghost").length||0,
      curtainCovered:!!curtain&&curtain.classList.contains("is-covered"),
      actorRows
    };
  });
  assert.strictEqual(killTransition.beatId,"v2_mi_kill_result","kill semantic result did not enter exact resolver-result beat");
  assert(["KILLED","ESCAPED"].includes(killTransition.dispositionOutcome),"kill resolver produced invalid final outcome: "+JSON.stringify(killTransition));
  assert.strictEqual(killTransition.ghostCount,0,"kill result created actor/hold ghosts: "+JSON.stringify(killTransition));
  assert.strictEqual(killTransition.curtainCovered,false,"same-environment kill result incorrectly invoked hard curtain: "+JSON.stringify(killTransition));
  assert(killTransition.actorRows.every(row=>row.animationName==="none"&&row.transitionDuration==="0s"),"kill-result actor animation survived static Golden policy: "+JSON.stringify(killTransition));
  await nextSemantic(page,"v2_report");
  await waitCurtainClear(page,"kill-to-report");
  await shot(page,"09-kill-report-after-curtain.png");
  const killCleanup=await page.evaluate(()=>{
    const root=document.getElementById("kakashi-v2-scene-board"),curtain=document.getElementById("sc-story-hard-transition-33900");
    return{
      ghostCount:root?.querySelectorAll(".kv2-actor-ghost,.kv2-departure-ghost,.kv2-outgoing-hold-ghost").length||0,
      transitionActive:root?.dataset.transitionActive||null,
      curtainClasses:curtain?.className||""
    };
  });
  assert.strictEqual(killCleanup.ghostCount,0,"ghost presentation survived after hard transition");
  assert.strictEqual(killCleanup.transitionActive,null,"root transition flag survived into report");
  assert.strictEqual(killCleanup.curtainClasses,"","global curtain failed to settle after report reveal");

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
  await page.waitForFunction(()=>{
    const stage=document.querySelector(".alpha-code-battle-stage");
    const root=document.getElementById("kakashi-v2-scene-board");
    const visible=node=>!!node&&node.getClientRects().length>0&&getComputedStyle(node).display!=="none"&&getComputedStyle(node).visibility!=="hidden";
    return visible(stage)&&!visible(root);
  },null,{timeout:12000});
  await waitCurtainClear(page,"story-to-battle");
  const battle=await page.evaluate(()=>{
    const visible=node=>!!node&&node.getClientRects().length>0&&getComputedStyle(node).display!=="none"&&getComputedStyle(node).visibility!=="hidden";
    return{
      config:currentBattle.kakashiV2?.battleConfigId||null,
      returnType:currentBattle.returnContext?.type||null,
      sceneId:currentBattle.returnContext?.sceneId||null,
      activePlayer:currentBattle.activePlayer?.id||null,
      battleStageVisible:visible(document.querySelector(".alpha-code-battle-stage")),
      kakashiStoryRootVisible:visible(document.getElementById("kakashi-v2-scene-board"))
    };
  });
  assert.strictEqual(battle.config,"academy_kakashi_origin_battle_mi_1v1");
  assert.strictEqual(battle.returnType,"story_scene");
  assert.strictEqual(battle.sceneId,"origin_academy_kakashi_anbu_retrieval");
  assert.strictEqual(battle.activePlayer,"academy_kakashi");
  assert.strictEqual(battle.battleStageVisible,true,"PL Battle stage is not player-visible");
  assert.strictEqual(battle.kakashiStoryRootVisible,false,"Kakashi Scene Board still covers active PL Battle");
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
  const lifecycleReentry=await assertRepeatedBattleReentry(page);
  const browserErrors=await runtimeErrorGate.assertClean("visualAndBattle");
  await context.close();
  return{watch,killTransition,killCleanup,battle,post,lifecycleReentry,browserErrors};
}

async function browserRouteMatrix(browser){
  const results=[];

  async function scenario(name,run){
    const {context,page,runtimeErrorGate}=await boot(browser);
    try{
      await toScene02Root(page);
      const detail=await run(page);
      const browserErrors=await runtimeErrorGate.assertClean("matrix:"+name);
      results.push({name,success:true,...(detail||{}),browserErrors});
    }finally{
      await context.close();
    }
  }

  await scenario("failed_pickpocket_3v1_release",async page=>{
    await seedResolver(page,"directPickpocket","PICKPOCKET_DIRECT_FAILURE");
    await chooseLabel(page,"SLIP IN FOR THE PACKAGE","v2_direct_pickpocket_resolver");
    await advanceTo(page,"v2_battle_pickpocket_3v1");
    await launchAndReturnBattle(page,{outcome:"victory",actions:3,expectedBeat:"v2_pickpocket_3v1_win"});
    await chooseLabel(page,"LET THEM GO","v2_group3_release");
    let s=await stateSnapshot(page);
    for(const ref of ["AMT","PS","MI"])assert.strictEqual(s.participants[ref].state,"RELEASED");
    assert.strictEqual(s.package.holder,"KAKASHI");
    await nextSemantic(page,"v2_report");
    s=await stateSnapshot(page);
    assert.strictEqual(s.package.holder,"ANBU");
    return{terminal:await finishTerminalBrowser(page,"failed_pickpocket_3v1_release")};
  });

  await scenario("direct_strike_double_victory_kill_all",async page=>{
    await chooseLabel(page,"STRIKE BEFORE THE HANDOFF","v2_direct_strike_setup");
    await advanceTo(page,"v2_battle_direct_strike_2v1");
    await launchAndReturnBattle(page,{outcome:"victory",actions:3,expectedBeat:"v2_direct_strike_2v1_win"});
    await advanceTo(page,"v2_battle_direct_mi");
    await launchAndReturnBattle(page,{outcome:"victory",actions:2,expectedBeat:"v2_direct_mi_win"});
    await chooseLabel(page,"KILL THEM","v2_group3_kill_result");
    let s=await stateSnapshot(page);
    for(const ref of ["AMT","PS","MI"])assert.strictEqual(s.participants[ref].state,"KILLED");
    await nextSemantic(page,"v2_report");
    s=await stateSnapshot(page);
    assert.strictEqual(s.package.holder,"ANBU");
    return{terminal:await finishTerminalBrowser(page,"direct_strike_double_victory_kill_all")};
  });

  await scenario("closer_failure_ask_where_take_down_loss",async page=>{
    await seedResolver(page,"getCloser","GET_CLOSER_FAILURE");
    await seedResolver(page,"stayPackagePursuit","STAY_PACKAGE_PURSUIT_SUCCESS");
    await chooseLabel(page,"MOVE IN CLOSER","v2_get_closer_resolver");
    await advanceTo(page,"v2_get_closer_failure");
    await chooseLabel(page,"STAY ON THE PACKAGE","v2_stay_package_pursuit_resolver");
    await advanceTo(page,"v2_stay_package_intercept");
    await chooseLabel(page,"ASK WHERE THE PACKAGE WAS GOING");
    await chooseLabel(page,"TAKE HIM DOWN","v2_take_down_setup");
    await advanceTo(page,"v2_battle_take_down_amt");
    await launchAndReturnBattle(page,{outcome:"defeat",actions:4,expectedBeat:"v2_take_down_loss"});
    const s=await stateSnapshot(page);
    assert.strictEqual(s.package.holder,"KAKASHI");
    assert.strictEqual(s.package.recovered,true);
    assert.strictEqual(s.participants.AMT.state,"ESCAPED");
    assert.strictEqual(s.knowledge.askWhere,true);
    assert.strictEqual(s.knowledge.downstreamDestinationKnown,false);
    return{terminal:await finishTerminalBrowser(page,"closer_failure_ask_where_take_down_loss")};
  });

  await scenario("stop_assassin_fast_restrain_then_ps_loss",async page=>{
    await seedResolver(page,"psPursuit","PS_PURSUIT_SUCCESS");
    await chooseLabel(page,"WATCH THE EXCHANGE","v2_watch_exchange");
    await chooseLabel(page,"STOP THE ASSASSIN","v2_stop_assassin_setup");
    await advanceTo(page,"v2_battle_mi_stop");
    await launchAndReturnBattle(page,{outcome:"victory",actions:3,expectedBeat:"v2_mi_stop_win"});
    const labels=await page.evaluate(()=>getCurrentStorySceneBeat().choices.filter(c=>!c.availability||c.availability().available).map(c=>c.label));
    assert(labels.includes("GO AFTER PACKAGE SMUGGLER"),JSON.stringify(labels));
    assert(!labels.includes("GO AFTER ANBU MARKED TARGET"),JSON.stringify(labels));
    await chooseLabel(page,"RESTRAIN HER AND CONTINUE","v2_mi_restrained_next");
    await chooseLabel(page,"GO AFTER PACKAGE SMUGGLER","v2_ps_pursuit_resolver");
    await advanceTo(page,"v2_battle_ps_seq");
    const psBattleScene=await page.evaluate(()=>{
      const beatId=getActiveStorySceneRuntime()?.beatId||null;
      const p=getAcademyKakashiV2Presentation36020(beatId);
      return{beat:beatId,backdrop:p?.backdrop||null,location:p?.location||null};
    });
    assert.strictEqual(psBattleScene.backdrop,"Kakashi Origin Backdrop/konoha_alleyway_alt_night.png","PS pursuit Battle jumped back to the Sakura-tree arena: "+JSON.stringify(psBattleScene));
    await launchAndReturnBattle(page,{outcome:"defeat",actions:2,expectedBeat:"v2_ps_seq_loss"});
    const s=await stateSnapshot(page);
    assert.strictEqual(s.participants.MI.state,"RESTRAINED");
    assert.strictEqual(s.participants.PS.state,"ESCAPED");
    return{terminal:await finishTerminalBrowser(page,"stop_assassin_fast_restrain_then_ps_loss")};
  });

  await scenario("stop_assassin_slow_anbu_custody",async page=>{
    await chooseLabel(page,"WATCH THE EXCHANGE","v2_watch_exchange");
    await chooseLabel(page,"STOP THE ASSASSIN","v2_stop_assassin_setup");
    await advanceTo(page,"v2_battle_mi_stop");
    await launchAndReturnBattle(page,{outcome:"victory",actions:4,expectedBeat:"v2_mi_stop_win"});
    const labels=await page.evaluate(()=>getCurrentStorySceneBeat().choices.filter(c=>!c.availability||c.availability().available).map(c=>c.label));
    assert(!labels.includes("GO AFTER PACKAGE SMUGGLER"),JSON.stringify(labels));
    assert(!labels.includes("GO AFTER ANBU MARKED TARGET"),JSON.stringify(labels));
    assert(!labels.includes("RESTRAIN HER AND CONTINUE"),JSON.stringify(labels));
    await chooseLabel(page,"BRING HER TO ANBU","v2_mi_anbu_depart");
    let s=await stateSnapshot(page);
    assert.strictEqual(s.participants.MI.state,"BATTLE_DEFEATED","MI custody committed before ANBU handoff");
    await advanceTo(page,"v2_mi_anbu_handoff");
    await nextSemantic(page,"v2_report");
    s=await stateSnapshot(page);
    assert.strictEqual(s.participants.MI.state,"ANBU_CUSTODY");
    return{terminal:await finishTerminalBrowser(page,"stop_assassin_slow_anbu_custody")};
  });

  await scenario("assassin_then_package_full_sequence",async page=>{
    await seedResolver(page,"psPursuit","PS_PURSUIT_SUCCESS");
    await seedResolver(page,"secureAmtPursuit","SECURE_AMT_PURSUIT_SUCCESS");
    await chooseLabel(page,"WATCH THE EXCHANGE","v2_watch_exchange");
    await chooseLabel(page,"DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE","v2_assassin_then_package_setup");
    await advanceTo(page,"v2_battle_mi_package_second");
    await launchAndReturnBattle(page,{outcome:"victory",actions:4,expectedBeat:"v2_mi_package_second_win"});
    await chooseLabel(page,"CHASE THE PACKAGE SMUGGLER","v2_package_second_ps_pursuit");
    await advanceTo(page,"v2_battle_ps_package_second");
    await launchAndReturnBattle(page,{outcome:"victory",actions:3,expectedBeat:"v2_ps_package_second_win"});
    await chooseLabel(page,"STAY ON THE FIRST MAN","v2_package_second_amt_pursuit");
    await advanceTo(page,"v2_battle_amt_package_second");
    await launchAndReturnBattle(page,{outcome:"victory",actions:4,expectedBeat:"v2_amt_package_second_win"});
    await chooseLabel(page,"BRING HIM TO ANBU","v2_amt_anbu_depart");
    let s=await stateSnapshot(page);
    assert.strictEqual(s.participants.AMT.state,"BATTLE_DEFEATED","AMT custody committed before ANBU handoff");
    await advanceTo(page,"v2_amt_anbu_handoff");
    await nextSemantic(page,"v2_report");
    s=await stateSnapshot(page);
    assert.strictEqual(s.package.holder,"ANBU");
    assert.strictEqual(s.participants.AMT.state,"ANBU_CUSTODY");
    return{terminal:await finishTerminalBrowser(page,"assassin_then_package_full_sequence")};
  });

  await scenario("secure_package_return_report",async page=>{
    await chooseLabel(page,"WATCH THE EXCHANGE","v2_watch_exchange");
    await chooseLabel(page,"SECURE THE PACKAGE","v2_secure_package_setup");
    await advanceTo(page,"v2_battle_ps_mi");
    await launchAndReturnBattle(page,{outcome:"victory",actions:5,expectedBeat:"v2_ps_mi_win"});
    await chooseLabel(page,"RETURN AND REPORT","v2_report");
    const s=await stateSnapshot(page);
    assert.strictEqual(s.package.holder,"ANBU");
    assert.strictEqual(s.participants.PS.state,"BATTLE_DEFEATED");
    assert.strictEqual(s.participants.MI.state,"BATTLE_DEFEATED");
    return{terminal:await finishTerminalBrowser(page,"secure_package_return_report")};
  });

  await scenario("go_original_target_pursuit_failure",async page=>{
    await seedResolver(page,"amtPursuitRoot","AMT_PURSUIT_FAILURE");
    await chooseLabel(page,"WATCH THE EXCHANGE","v2_watch_exchange");
    await chooseLabel(page,"GO AFTER THE ORIGINAL TARGET","v2_go_amt_pursuit_resolver");
    await advanceTo(page,"v2_amt_direct_pursuit_fail");
    const s=await stateSnapshot(page);
    assert.strictEqual(s.package.holder,"PS");
    return{terminal:await finishTerminalBrowser(page,"go_original_target_pursuit_failure")};
  });

  await scenario("closer_success_improved_pickpocket",async page=>{
    await seedResolver(page,"getCloser","GET_CLOSER_SUCCESS");
    await seedResolver(page,"improvedPickpocket","PICKPOCKET_IMPROVED_SUCCESS");
    await chooseLabel(page,"MOVE IN CLOSER","v2_get_closer_resolver");
    await advanceTo(page,"v2_get_closer_success");
    await chooseLabel(page,"ATTEMPT THE PICKPOCKET","v2_improved_pickpocket_resolver");
    await advanceTo(page,"v2_pickpocket_clean_success");
    const s=await stateSnapshot(page);
    assert.strictEqual(s.knowledge.getCloserContingency,true);
    assert.strictEqual(s.package.holder,"KAKASHI");
    return{terminal:await finishTerminalBrowser(page,"closer_success_improved_pickpocket")};
  });

  await scenario("closer_failure_cutoff_police",async page=>{
    await seedResolver(page,"getCloser","GET_CLOSER_FAILURE");
    await chooseLabel(page,"MOVE IN CLOSER","v2_get_closer_resolver");
    await advanceTo(page,"v2_get_closer_failure");
    await chooseLabel(page,"CUT THEM OFF AT THE SAKURA TREE","v2_cutoff_setup");
    await advanceTo(page,"v2_battle_cutoff");
    await launchAndReturnBattle(page,{outcome:"victory",actions:4,expectedBeat:"v2_cutoff_win"});
    await chooseLabel(page,"TAKE THEM TO THE UCHIHA POLICE","v2_group2_police_depart");
    let s=await stateSnapshot(page);
    assert.strictEqual(s.participants.AMT.state,"BATTLE_DEFEATED");
    assert.strictEqual(s.participants.PS.state,"BATTLE_DEFEATED");
    await advanceTo(page,"v2_group2_police_handoff");
    await nextSemantic(page,"v2_report");
    s=await stateSnapshot(page);
    assert.strictEqual(s.package.holder,"ANBU");
    assert.strictEqual(s.participants.AMT.state,"POLICE_CUSTODY");
    assert.strictEqual(s.participants.PS.state,"POLICE_CUSTODY");
    assert.strictEqual(s.participants.MI.state,"UNSEEN");
    return{terminal:await finishTerminalBrowser(page,"closer_failure_cutoff_police")};
  });

  assert.strictEqual(results.length,10);
  return{pass:true,scenarioFamiliesValidated:results.length,results};
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  try{
    const clean=await cleanRoute(browser);
    const visualBattle=await visualAndBattle(browser);
    const browserMatrix=await browserRouteMatrix(browser);
    const terminalStory=await terminalStoryBrowserValidation(browser);
    const pngs=fs.readdirSync(OUT).filter(name=>name.endsWith(".png")).sort();
    const hashes=pngs.map(name=>crypto.createHash("sha256").update(fs.readFileSync(path.join(OUT,name))).digest("hex"));
    const uniqueScreenshots=new Set(hashes).size;
    assert(pngs.length>=11,"installed-browser evidence screenshots missing");
    assert(uniqueScreenshots>=8,"browser evidence is visually static/occluded: "+JSON.stringify({pngs,uniqueScreenshots}));
    const result={pass:true,clean,visualBattle,browserMatrix,terminalStory,pngCount:pngs.length,uniqueScreenshots,browserRuntimeErrorGate:"GREEN",browserGoldenClaimed:false};
    fs.writeFileSync(path.join(OUT,"results.json"),JSON.stringify(result,null,2));
    console.log(JSON.stringify(result,null,2));
  }finally{
    await browser.close();
  }
})().catch(error=>{
  console.error(error&&error.stack||error);
  process.exitCode=1;
});
