#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.ISSUE_544_KAKASHI_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_544_KAKASHI_OUT||"artifacts/issue-544-kakashi-real-actions";
fs.mkdirSync(OUT,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function boot(browser){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  const assets=[];
  page.on("response",r=>{if(/\/UI\/(victory|setback)\.png(?:\?|$)/.test(r.url()))assets.push({url:r.url(),status:r.status()});});
  await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_){}});
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!(
    globalThis.SC_ACADEMY_KAKASHI_V2_CONTENT_36000&&
    globalThis.SC_ACADEMY_KAKASHI_V2_CORE_36020&&
    globalThis.SC_ACADEMY_KAKASHI_V2_TRANSITION_36040&&
    typeof globalThis.presentCommittedBattleTerminalResult54400==="function"&&
    typeof attemptBattlePreparedSkill==="function"
  ),null,{timeout:30000});
  const started=await page.evaluate(()=>{
    const selected=selectChronicleOrigin("academy_kakashi","issue_544_kakashi_real_action");
    const launched=beginAlphaChronicleOriginPrologue();
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_e){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_e){}
    const game=document.querySelector(".game-container");if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){const n=document.getElementById(id);if(n)n.remove();}
    return{selected,launched,beatId:getActiveStorySceneRuntime()?.beatId||null};
  });
  assert.strictEqual(started.selected?.success,true,JSON.stringify(started));
  assert.strictEqual(started.launched?.success,true,JSON.stringify(started));
  await page.waitForSelector("#kakashi-v2-scene-board",{state:"visible",timeout:15000});
  await gate.reset();
  return{context,page,gate,assets};
}

async function currentBeat(page){return page.evaluate(()=>getActiveStorySceneRuntime()?.beatId||null);}
async function waitUnlocked(page,expected=null){
  await page.waitForFunction(expected=>{
    const t=getAcademyKakashiV2TransitionState36040?.(),r=getActiveStorySceneRuntime?.();
    return !!t&&t.locked===false&&(!expected||(r&&r.beatId===expected));
  },expected,{timeout:12000});
}
async function drain(page){
  for(let i=0;i<600;i++){
    const t=await page.evaluate(()=>getAcademyKakashiV2TransitionState36040());
    if(t.atEnd)return t;
    const r=await page.evaluate(()=>advanceAcademyKakashiV236040());
    assert.strictEqual(r?.success,true,JSON.stringify(r));
  }
  throw new Error("Kakashi cue drain guard exceeded");
}
async function fastDrain(page){
  const r=await page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime?.();if(!rt)return{success:false};
    const p=getAcademyKakashiV2Presentation36020?.(rt.beatId),count=Array.isArray(p?.cues)?p.cues.length:0;
    if(!rt.localContext||typeof rt.localContext!=="object")rt.localContext={};
    rt.localContext.__kakashiV2Presentation36040={beatId:rt.beatId,cueIndex:Math.max(0,count-1),settled:true};
    renderAcademyKakashiV236030?.();
    return{success:true,count};
  });
  assert.strictEqual(r?.success,true,JSON.stringify(r));
}
async function waitBeatChange(page,oldBeat,expected=null){
  await page.waitForFunction(({oldBeat,expected})=>{
    const rt=getActiveStorySceneRuntime?.(),t=getAcademyKakashiV2TransitionState36040?.();
    if(!rt||!t||t.locked!==false)return false;
    return expected?rt.beatId===expected:rt.beatId!==oldBeat;
  },{oldBeat,expected},{timeout:12000});
}
async function nextSemantic(page,expected=null){
  await drain(page);const before=await currentBeat(page);
  const r=await page.evaluate(()=>advanceAcademyKakashiV236040());
  assert(r?.success===true&&!r.semanticBeatUnchanged,JSON.stringify(r));
  await waitBeatChange(page,before,expected);return r;
}
async function chooseLabel(page,label,expected=null){
  await fastDrain(page);const before=await currentBeat(page);
  const r=await page.evaluate(label=>{
    const beat=getCurrentStorySceneBeat?.();
    const row=(beat?.choices||[]).find(c=>c?.label===label&&(typeof c.availability!=="function"||c.availability().available===true));
    if(!row)return{success:false,available:(beat?.choices||[]).map(c=>c.label)};
    return advanceAcademyKakashiV236040(row.choiceId);
  },label);
  assert.strictEqual(r?.success,true,JSON.stringify(r));
  await waitBeatChange(page,before,expected);return r;
}
async function advanceTo(page,target,max=18){
  for(let i=0;i<max;i++){
    if(await currentBeat(page)===target)return;
    const meta=await page.evaluate(()=>{
      const b=getCurrentStorySceneBeat?.();if(!b)return null;
      const available=(b.choices||[]).filter(c=>typeof c.availability!=="function"||c.availability().available===true).map(c=>c.label);
      return{mode:b.mode||null,machineResolved:b.machineResolved===true||b.uiHints?.kakashiMachineResolved===true,available};
    });
    assert(meta,"Kakashi beat missing");
    if(meta.mode==="battle_transition")throw new Error("unexpected earlier Kakashi Battle while advancing to "+target);
    if(meta.machineResolved)await nextSemantic(page);
    else if(meta.mode==="choice"){
      assert.deepStrictEqual(meta.available,["CONTINUE"],"ambiguous Kakashi choice while advancing: "+JSON.stringify(meta));
      await chooseLabel(page,"CONTINUE");
    }else await nextSemantic(page);
  }
  throw new Error("Kakashi advance guard exceeded target="+target+" beat="+await currentBeat(page));
}
async function routeToDirectStrikeBattle(page){
  assert.strictEqual(await currentBeat(page),"v2_scene01_rooftop");
  await nextSemantic(page,"v2_scene02_tail");
  await chooseLabel(page,"INTERRUPT THE HANDOFF","v2_direct_strike_setup");
  await advanceTo(page,"v2_battle_direct_strike_2v1");
  await fastDrain(page);
  const launched=await page.evaluate(()=>advanceAcademyKakashiV236040());
  assert.strictEqual(launched?.success,true,JSON.stringify(launched));
  await page.waitForFunction(()=>currentBattle?.active===true&&currentBattle?.returnContext?.type==="story_scene"&&!!document.querySelector(".alpha-code-battle-stage"),null,{timeout:15000});
  const state=await page.evaluate(()=>({
    beat:getActiveStorySceneRuntime()?.beatId||null,
    battleId:currentBattle?.battleId||null,
    config:currentBattle?.kakashiV2?.battleConfigId||null,
    returnContext:JSON.parse(JSON.stringify(currentBattle?.returnContext||null)),
    players:(currentBattle?.deployment?.player?.slots||[]).filter(x=>x?.participantId).map(x=>x.participantId),
    enemies:(currentBattle?.deployment?.enemy?.slots||[]).filter(x=>x?.participantId).map(x=>x.participantId)
  }));
  assert.strictEqual(state.config,"academy_kakashi_origin_battle_direct_2v1");
  assert.strictEqual(state.returnContext?.type,"story_scene");
  assert.strictEqual(state.returnContext?.sourceBeatId,"v2_battle_direct_strike_2v1");
  return state;
}
async function waitIdle(page){
  await page.waitForFunction(()=>{
    const stage=document.querySelector(".alpha-code-battle-stage");
    const busy=stage?.dataset.presentationQueueBusy==="true";
    const pending=typeof pendingBattlePresentation33000==="function"?pendingBattlePresentation33000():false;
    return !busy&&!pending;
  },null,{timeout:20000});
}
async function readySkill(page){
  await waitIdle(page);
  const skills=page.locator('button[data-formation-family="skills"]').first();
  if(await skills.count())await skills.click();
  await page.waitForFunction(()=>[...document.querySelectorAll(".battle-dev-skill-card")].some(c=>c.dataset.skillId&&!c.disabled&&!c.classList.contains("is-locked")&&!c.classList.contains("is-disabled")),null,{timeout:10000});
  return page.evaluate(()=>[...document.querySelectorAll(".battle-dev-skill-card")].find(c=>c.dataset.skillId&&!c.disabled&&!c.classList.contains("is-locked")&&!c.classList.contains("is-disabled"))?.dataset.skillId||null);
}
async function prepareTerminal(page,outcome,state){
  return page.evaluate(({outcome,state})=>{
    const touched=[];
    const set=(side,id,value)=>{
      const rec=getBattleRemainingPLRecord(side,id);if(!rec)return;
      const max=Number(rec.maximum||rec.max||rec.remaining||1)||1;
      setBattleRemainingPLRecord(side,id,value,max);touched.push({side,id,value,max});
    };
    if(outcome==="victory"){
      const active=currentBattle?.activeEnemy?.id||state.enemies[0];
      for(const id of state.enemies)set("enemy",id,id===active?1:0);
    }else{
      const active=currentBattle?.activePlayer?.id||"academy_kakashi";
      for(const id of state.players)set("player",id,id===active?1:0);
    }
    return{touched,activePlayer:currentBattle?.activePlayer?.id||null,activeEnemy:currentBattle?.activeEnemy?.id||null,evidenceBefore:currentBattle?.runtime?.evidence?.length||0};
  },{outcome,state});
}
async function executeUntilTerminal(page,outcome,label){
  const used=[];
  for(let i=0;i<5;i++){
    if(await page.evaluate(()=>currentBattle?.battleOver===true))break;
    const skillId=await readySkill(page);assert(skillId,label+" no ready Kakashi skill");used.push(skillId);
    const result=await page.evaluate(id=>attemptBattlePreparedSkill(id),skillId);
    assert.strictEqual(result?.success,true,label+" Kakashi production action failed "+skillId+" "+JSON.stringify(result));
    try{await page.waitForFunction(outcome=>currentBattle?.battleOver===true&&currentBattle?.outcome?.type===outcome,outcome,{timeout:6000});break;}catch(_e){await waitIdle(page);}
  }
  await page.waitForFunction(outcome=>currentBattle?.battleOver===true&&currentBattle?.outcome?.type===outcome,outcome,{timeout:22000});
  const selector=outcome==="victory"?".alpha-victory-code-screen,.victory-screen":".alpha331-setback";
  await page.waitForSelector(selector,{state:"visible",timeout:22000});
  const terminal=await page.evaluate(outcome=>({
    outcome:currentBattle?.outcome?.type||null,
    returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null,
    presenter:getBattleTerminalResultPresentation54400?.()||null,
    evidence:(currentBattle?.runtime?.evidence||[]).slice(-16).map(r=>({eventType:r?.eventType||null,skillId:r?.skillId||r?.data?.skillId||null,actionId:r?.actionId||null,actor:r?.actorRef?.participantId||null,committed:r?.committedOccurrence!==false})),
    rewards:currentBattle?.rewards?JSON.parse(JSON.stringify(currentBattle.rewards)):null
  }),outcome);
  assert.strictEqual(terminal.presenter?.committedOutcome,outcome,label+" presenter outcome drift");
  assert.strictEqual(terminal.presenter?.status,"presented",label+" presenter not visible/presented");
  assert(terminal.evidence.some(r=>r.committed&&(used.includes(r.skillId)||used.includes(r.actionId))),label+" no committed evidence from real Kakashi Skill action "+JSON.stringify({used,evidence:terminal.evidence}));
  return{used,terminal};
}
async function continueResult(page,outcome,expectedBeat,label){
  if(outcome==="victory"){
    const button=page.locator(".alpha-victory-code-screen .victory-continue").first();
    await button.waitFor({state:"visible",timeout:10000});
    assert(/CLAIM/i.test(await button.textContent()||""),label+" Victory did not expose CLAIM first");
    await button.click();
    await page.waitForFunction(()=>document.querySelector(".alpha-victory-code-screen .victory-continue")?.textContent?.trim()==="CONTINUE",null,{timeout:5000});
    await button.click();
  }else{
    const button=page.locator(".alpha331-setback button").first();await button.waitFor({state:"visible",timeout:10000});await button.click();
  }
  await page.waitForFunction(expected=>getActiveStorySceneRuntime()?.beatId===expected,expectedBeat,{timeout:20000});
  return page.evaluate(()=>({sceneId:getActiveStorySceneRuntime()?.sceneId||null,beatId:getActiveStorySceneRuntime()?.beatId||null,state:getAcademyKakashiV2State36020?.()||null}));
}
async function runRoute(browser,outcome,index){
  const label=`kakashi-origin-${outcome}-real-action`;
  const {context,page,gate,assets}=await boot(browser);
  try{
    const launch=await routeToDirectStrikeBattle(page);
    const setup=await prepareTerminal(page,outcome,launch);
    const driven=await executeUntilTerminal(page,outcome,label);
    assert.strictEqual(driven.terminal.returnContext?.type,"story_scene",label+" caller envelope consumed before result Continue");
    await page.screenshot({path:path.join(OUT,`${index}-${label}.png`),fullPage:false});
    const expected=outcome==="victory"?"v2_direct_strike_2v1_win":"v2_direct_strike_2v1_loss";
    const continued=await continueResult(page,outcome,expected,label);
    assert.strictEqual(continued.sceneId,"origin_academy_kakashi_anbu_retrieval",label+" wrong Story scene after Continue");
    const asset=outcome==="victory"?"/UI/victory.png":"/UI/setback.png";
    assert(assets.some(r=>r.url.includes(asset)&&r.status===200),label+" approved result asset did not resolve HTTP 200");
    const errors=await gate.assertClean(label);
    return{label,launch,setup,driven,continued,assets,errors};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const result={issue:544,lane:"F",kind:"kakashi_origin_real_battle_actions",exactCandidate:process.env.ISSUE_544_EXACT_CANDIDATE_SHA||null,terminalHelpersCalledByHarness:false,routes:[]};
    result.routes.push(await runRoute(browser,"victory","01"));
    result.routes.push(await runRoute(browser,"defeat","02"));
    result.browserGoldenClaimed=false;
    fs.writeFileSync(path.join(OUT,"evidence.json"),JSON.stringify(result,null,2));
    console.log(JSON.stringify(result,null,2));
    console.log("PASS #544 Kakashi Origin Victory/Setback through real Battle actions; browserGoldenClaimed=false");
  }finally{await browser.close();}
})().catch(err=>{console.error(err&&err.stack||err);process.exit(1);});
