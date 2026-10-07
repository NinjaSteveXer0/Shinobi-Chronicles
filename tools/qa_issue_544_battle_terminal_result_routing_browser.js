#!/usr/bin/env node
"use strict";

const assert=require("assert");
const fs=require("fs");
const path=require("path");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const MODE=String(process.env.ISSUE_544_MODE||"probe").toLowerCase();
const BASE=process.env.ISSUE_544_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_544_BROWSER_OUT||"artifacts/issue-544-battle-result-routing";
assert(["probe","assert"].includes(MODE),"ISSUE_544_MODE must be probe or assert");
fs.mkdirSync(OUT,{recursive:true});

async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}

async function newPage(browser,label){
  const context=await browser.newContext({viewport:{width:1366,height:768},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  const assets=[];
  page.on("response",r=>{
    const u=r.url();
    if(/\/UI\/(?:victory|setback)\.png(?:\?|$)/.test(u))assets.push({url:u,status:r.status()});
  });
  await page.addInitScript(()=>{globalThis.SC_DISABLE_FIRST_PL_BATTLE_TUTORIAL_QA=true;});
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof selectChronicleOrigin==="function"&&typeof handleBattleParticipantAtZeroPL==="function"&&typeof resumeBattleCallerAfterCompletion==="function",null,{timeout:30000});
  await releaseFrontDoor(page);
  return{context,page,gate,assets,label};
}

async function installTrace(page){
  await page.evaluate(()=>{
    globalThis.__issue544Trace=[];
    const stamp=(kind,data={})=>globalThis.__issue544Trace.push({kind,t:performance.now(),...data});
    const originalOpen=globalThis.openOverlay;
    assert544(typeof originalOpen==="function","openOverlay unavailable");
    globalThis.openOverlay=function(type,...args){
      stamp("openOverlay",{type:String(type)});
      return originalOpen.call(this,type,...args);
    };
    const originalResume=globalThis.resumeBattleCallerAfterCompletion;
    assert544(typeof originalResume==="function","resumeBattleCallerAfterCompletion unavailable");
    globalThis.resumeBattleCallerAfterCompletion=function(outcome,...args){
      stamp("resume",{outcome:String(outcome),returnContext:JSON.parse(JSON.stringify(currentBattle?.returnContext||null))});
      return originalResume.call(this,outcome,...args);
    };
    function assert544(ok,msg){if(!ok)throw new Error("#544 trace install: "+msg);}
  });
}

async function snapshot(page){
  return page.evaluate(()=>({
    trace:JSON.parse(JSON.stringify(globalThis.__issue544Trace||[])),
    outcome:JSON.parse(JSON.stringify(currentBattle?.outcome||null)),
    returnContext:JSON.parse(JSON.stringify(currentBattle?.returnContext||null)),
    overlay:typeof currentOverlayType!=="undefined"?currentOverlayType:null,
    victoryVisible:!![...document.querySelectorAll(".alpha-victory-code-screen,.victory-screen,[aria-label*='Victory'],[aria-label*='victory']")].find(n=>{const s=getComputedStyle(n);return s.display!=="none"&&s.visibility!=="hidden"}),
    setbackVisible:!![...document.querySelectorAll(".alpha331-setback,[aria-label='Battle setback'],[aria-label*='Setback'],[aria-label*='setback']")].find(n=>{const s=getComputedStyle(n);return s.display!=="none"&&s.visibility!=="hidden"}),
    story:{sceneId:typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime()?.sceneId||null:null,beatId:typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime()?.beatId||null:null},
    historyCount:Array.isArray(playerData?.activityHistory)?playerData.activityHistory.length:null,
    ryo:Number(playerData?.ryo)||0
  }));
}

function indexOf(trace,kind,predicate=()=>true){return trace.findIndex(e=>e.kind===kind&&predicate(e));}
function requirePresentationBeforeResume(state,surface,outcome,label){
  const open=indexOf(state.trace,"openOverlay",e=>e.type===surface);
  const resume=indexOf(state.trace,"resume",e=>e.outcome===outcome);
  assert(open>=0,label+` missing openOverlay(${surface}) trace: `+JSON.stringify(state.trace));
  assert(resume<0||open<resume,label+" caller resumed before terminal result presentation: "+JSON.stringify(state.trace));
}

async function bootIwabee(browser,label){
  const env=await newPage(browser,label);
  const {page}=env;
  const started=await page.evaluate(()=>({selected:selectChronicleOrigin("academy_iwabee","issue_544_browser"),launched:beginAlphaChronicleOriginPrologue()}));
  assert.strictEqual(started.selected?.success,true,label+" select Iwabee failed "+JSON.stringify(started));
  assert.strictEqual(started.launched?.success,true,label+" launch Iwabee failed "+JSON.stringify(started));
  await page.evaluate(()=>setStorySceneBeat("iwa_confront_battle",{render:false}));
  const launch=await page.evaluate(()=>launchStorySceneBattle());
  assert.strictEqual(launch?.success,true,label+" Iwabee Battle launch failed "+JSON.stringify(launch));
  await page.waitForFunction(()=>currentBattle?.active===true&&currentBattle?.enemy?.id==="iwabee_origin_rogue_genin_01",null,{timeout:12000});
  await installTrace(page);
  return env;
}

async function iwabeeDefeat(browser){
  const env=await bootIwabee(browser,"iwabee-defeat");
  const {page,gate,context,assets}=env;
  try{
    const before=await snapshot(page);
    await page.evaluate(()=>{
      setBattleRemainingPL("player","academy_iwabee",0);
      const enemy=getBattleDeploymentParticipant("enemy",1)||currentBattle.enemy;
      handleBattleParticipantAtZeroPL("player","academy_iwabee",enemy,{actionId:"qa544_iwabee_defeat",actorRef:createBattleParticipantRef("enemy",enemy.id),targetRef:createBattleParticipantRef("player","academy_iwabee")});
    });
    await page.waitForTimeout(1200);
    const state=await snapshot(page);
    assert.strictEqual(state.outcome?.type,"defeat","Iwabee factual defeat not committed");
    assert.strictEqual(state.ryo,before.ryo,"Iwabee defeat changed Ryō before any authorised result action");
    if(MODE==="assert"){
      requirePresentationBeforeResume(state,"setback","defeat","Iwabee defeat");
      assert.strictEqual(state.setbackVisible,true,"Iwabee Setback presentation not visible");
      const resumeBefore=indexOf(state.trace,"resume",e=>e.outcome==="defeat");
      assert.strictEqual(resumeBefore,-1,"Iwabee caller resumed before player continued from Setback");
      const btn=page.locator(".alpha331-setback button,[aria-label='Battle setback'] button").first();
      await btn.waitFor({state:"visible",timeout:8000});
      await btn.click();
      await page.waitForFunction(()=>globalThis.__issue544Trace?.some(e=>e.kind==="resume"&&e.outcome==="defeat"),null,{timeout:8000});
    }
    await gate.assertClean("issue-544-iwabee-defeat");
    return{state,assets:[...assets]};
  }finally{await context.close();}
}

async function iwabeeVictory(browser){
  const env=await bootIwabee(browser,"iwabee-victory");
  const {page,gate,context,assets}=env;
  try{
    await page.evaluate(()=>{
      const enemy=getBattleDeploymentParticipant("enemy",1)||currentBattle.enemy;
      setBattleRemainingPL("enemy",enemy.id,0);
      handleBattleParticipantAtZeroPL("enemy",enemy.id,getBattleDeploymentParticipant("player",1),{actionId:"qa544_iwabee_victory",actorRef:createBattleParticipantRef("player","academy_iwabee"),targetRef:createBattleParticipantRef("enemy",enemy.id)});
    });
    await page.waitForTimeout(1500);
    const state=await snapshot(page);
    assert.strictEqual(state.outcome?.type,"victory","Iwabee factual victory not committed");
    if(MODE==="assert"){
      requirePresentationBeforeResume(state,"victory","victory","Iwabee victory");
      assert.strictEqual(state.victoryVisible,true,"Iwabee Victory presentation not visible");
      assert.strictEqual(indexOf(state.trace,"resume",e=>e.outcome==="victory"),-1,"Iwabee caller resumed before Victory player action");
    }
    await gate.assertClean("issue-544-iwabee-victory");
    return{state,assets:[...assets]};
  }finally{await context.close();}
}

async function bootMenma(browser){
  const env=await newPage(browser,"menma-defeat");
  const {page}=env;
  await page.waitForFunction(()=>!!globalThis.SC_MENMA_EVOLVED_PL_BATTLE_36900&&typeof advanceMenmaScriptedBattleAfterPresentation37300==="function",null,{timeout:30000});
  const started=await page.evaluate(()=>({selected:selectChronicleOrigin("academy_menma","issue_544_browser"),launched:beginAlphaChronicleOriginPrologue()}));
  assert.strictEqual(started.selected?.success,true,"Menma select failed "+JSON.stringify(started));
  assert.strictEqual(started.launched?.success,true,"Menma launch failed "+JSON.stringify(started));
  await page.evaluate(()=>setStorySceneBeat("tutorial_battle",{render:false}));
  const launch=await page.evaluate(()=>advanceStoryScene());
  assert.strictEqual(launch?.success,true,"Menma Story -> Battle launch failed "+JSON.stringify(launch));
  await page.waitForFunction(()=>currentBattle?.active===true&&currentBattle?.battleConfigId==="academy_menma_origin_three_test_subjects_with_anko",null,{timeout:12000});
  await installTrace(page);
  return env;
}

async function exhaustMenmaAlly(page,id,actionId){
  return page.evaluate(({id,actionId})=>{
    setBattleRemainingPL("player",id,0);
    const enemy=getBattleDeploymentParticipant("enemy",1)||currentBattle.enemy;
    const envelope={actionId,actorRef:createBattleParticipantRef("enemy",enemy.id),targetRef:createBattleParticipantRef("player",id)};
    const zero=handleBattleParticipantAtZeroPL("player",id,enemy,envelope);
    const settled=advanceMenmaScriptedBattleAfterPresentation37300({actionId});
    return{zero:JSON.parse(JSON.stringify(zero||null)),settled:JSON.parse(JSON.stringify(settled||null)),outcome:JSON.parse(JSON.stringify(currentBattle?.outcome||null))};
  },{id,actionId});
}

async function menmaDefeat(browser){
  const env=await bootMenma(browser);
  const {page,gate,context,assets}=env;
  try{
    await exhaustMenmaAlly(page,"sj_anko","qa544_menma_anko_zero");
    await page.waitForTimeout(100);
    await exhaustMenmaAlly(page,"academy_menma","qa544_menma_zero");
    await page.waitForTimeout(1200);
    const state=await snapshot(page);
    assert.strictEqual(state.outcome?.type,"defeat","Menma factual defeat not committed");
    assert.strictEqual(state.outcome?.partyDefeat,true,"Menma authored party-defeat fact missing");
    const setback=indexOf(state.trace,"openOverlay",e=>e.type==="setback");
    const resume=indexOf(state.trace,"resume",e=>e.outcome==="defeat");
    if(MODE==="probe"){
      assert(resume>=0,"#544 probe changed: Menma no longer directly resumes defeat caller; re-audit/switch to assert: "+JSON.stringify(state.trace));
      assert(setback<0||resume<setback,"#544 probe changed: Menma Setback now precedes caller resume; re-audit/switch to assert: "+JSON.stringify(state.trace));
    }else{
      requirePresentationBeforeResume(state,"setback","defeat","Menma defeat");
      assert.strictEqual(state.setbackVisible,true,"Menma Setback presentation not visible");
      assert.strictEqual(resume,-1,"Menma caller resumed before player continued from Setback");
      const btn=page.locator(".alpha331-setback button,[aria-label='Battle setback'] button").first();
      await btn.waitFor({state:"visible",timeout:8000});
      await btn.click();
      await page.waitForFunction(()=>globalThis.__issue544Trace?.some(e=>e.kind==="resume"&&e.outcome==="defeat"),null,{timeout:8000});
    }
    await gate.assertClean("issue-544-menma-defeat");
    return{state,assets:[...assets]};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const results={mode:MODE,menmaDefeat:await menmaDefeat(browser),iwabeeDefeat:await iwabeeDefeat(browser),iwabeeVictory:await iwabeeVictory(browser)};
    if(MODE==="assert"){
      const allAssets=[...results.menmaDefeat.assets,...results.iwabeeDefeat.assets,...results.iwabeeVictory.assets];
      for(const row of allAssets)assert.strictEqual(row.status,200,"result artwork failed HTTP 200: "+JSON.stringify(row));
      assert(allAssets.some(x=>/\/UI\/setback\.png/.test(x.url)),"no lowercase setback.png request observed");
      assert(allAssets.some(x=>/\/UI\/victory\.png/.test(x.url)),"no lowercase victory.png request observed");
    }
    fs.writeFileSync(path.join(OUT,`issue-544-${MODE}-result.json`),JSON.stringify(results,null,2));
    console.log(JSON.stringify({ok:true,issue:544,mode:MODE,summary:{menmaTrace:results.menmaDefeat.state.trace,iwabeeDefeatTrace:results.iwabeeDefeat.state.trace,iwabeeVictoryTrace:results.iwabeeVictory.state.trace}},null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
