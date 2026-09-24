#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BUILD_MANIFEST=JSON.parse(fs.readFileSync(path.join(__dirname,"fixtures/runtime_build_manifest_303.json"),"utf8"));
const BASE=process.env.ISSUE_340_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_340_BROWSER_OUT||"artifacts/issue-340-hinata-browser";
fs.mkdirSync(OUT,{recursive:true});

const SCENE_ID="origin_academy_hinata_prologue";
const SPAR_OCC="occ_origin_hinata_controlled_hyuga_spar_resolution";
const YOUNG_OCC="occ_origin_hinata_younger_student_practice_resolution";

function safeName(value){return String(value||"route").replace(/[^a-z0-9_-]+/gi,"-").toLowerCase();}

async function visibleBattle(page){
  return page.evaluate(()=>{
    const n=document.querySelector(".alpha-code-battle-stage");
    if(!n)return false;
    const s=getComputedStyle(n);
    return n.getClientRects().length>0&&s.display!=="none"&&s.visibility!=="hidden"&&Number(s.opacity)!==0;
  });
}

async function releaseFrontDoor(page){
  return page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_){}
    try{
      if(globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400&&typeof globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.release==="function"){
        globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.release();
      }
    }catch(_){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){
      const node=document.getElementById(id);if(node)node.remove();
    }
    return true;
  });
}

async function boot(browser,label){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const runtimeErrorGate=await installBrowserRuntimeErrorGate(page);
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof globalThis.getRuntimeBuildFingerprint==="function",null,{timeout:20000});
  assert.deepStrictEqual(await page.evaluate(()=>getRuntimeBuildFingerprint()),BUILD_MANIFEST,label+" runtime fingerprint mismatch");
  await page.waitForFunction(()=>!!(
    globalThis.SC_ALPHA_ORIGIN_32900&&
    typeof globalThis.selectChronicleOrigin==="function"&&
    typeof globalThis.beginAlphaChronicleOriginPrologue==="function"&&
    typeof globalThis.getActiveStorySceneRuntime==="function"&&
    typeof globalThis.getCurrentStorySceneBeat==="function"
  ),null,{timeout:30000});

  const started=await page.evaluate(()=>{
    const selected=selectChronicleOrigin("academy_hinata","issue_340_installed_browser");
    const launched=beginAlphaChronicleOriginPrologue();
    return{selected,launched};
  });
  assert(started.selected&&started.selected.success===true,label+" select failed: "+JSON.stringify(started));
  assert(started.launched&&started.launched.success===true,label+" start failed: "+JSON.stringify(started));
  await releaseFrontDoor(page);
  await page.waitForFunction(scene=>{
    const rt=getActiveStorySceneRuntime();
    const root=document.getElementById("story-scene-presentation-layer");
    return !!rt&&rt.sceneId===scene&&!!root&&root.dataset.sceneId===scene&&root.style.display!=="none";
  },SCENE_ID,{timeout:15000});
  return{context,page,runtimeErrorGate};
}

async function info(page){
  return page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime();
    const beat=getCurrentStorySceneBeat();
    const root=document.getElementById("story-scene-presentation-layer");
    const visible=node=>{
      if(!node)return false;
      const s=getComputedStyle(node);
      return node.getClientRects().length>0&&s.display!=="none"&&s.visibility!=="hidden"&&Number(s.opacity)!==0;
    };
    const battle=document.querySelector(".alpha-code-battle-stage");
    return{
      sceneId:rt?.sceneId||null,
      beatId:rt?.beatId||null,
      mode:beat?.mode||null,
      localContext:rt&&rt.localContext?JSON.parse(JSON.stringify(rt.localContext)):{},
      text:root?.querySelector(".sc-story-text")?.textContent?.trim()||"",
      speaker:root?.querySelector(".sc-story-name")?.textContent?.trim()||"",
      choices:[...(root?.querySelectorAll(".sc-story-choice")||[])].filter(visible).map(n=>n.textContent.trim()),
      primaryCount:[...(root?.querySelectorAll(".sc-chronicle-primary,.sc-story-actions > .sc-story-action:not(.sc-story-choice)")||[])].filter(visible).length,
      rootVisible:visible(root),
      battleVisible:visible(battle)
    };
  });
}

async function assertSceneHealthy(page,label){
  const row=await info(page);
  assert.strictEqual(row.sceneId,SCENE_ID,label+" scene identity drift");
  assert.strictEqual(row.rootVisible,true,label+" Story surface missing");
  assert.strictEqual(row.battleVisible,false,label+" illegally exposed a PL Battle surface");
  return row;
}

async function waitBeat(page,beatId){
  await page.waitForFunction(({scene,beatId})=>{
    const rt=getActiveStorySceneRuntime();
    const root=document.getElementById("story-scene-presentation-layer");
    return !!rt&&rt.sceneId===scene&&rt.beatId===beatId&&root?.dataset.beatId===beatId&&root.style.display!=="none";
  },{scene:SCENE_ID,beatId},{timeout:12000});
}

async function clickContinue(page){
  const before=await info(page);
  assert.notStrictEqual(before.mode,"choice","continue called on choice "+before.beatId);
  assert.strictEqual(before.battleVisible,false,"Battle visible before continue "+before.beatId);
  const root=page.locator("#story-scene-presentation-layer");
  let button=root.locator(".sc-chronicle-primary").first();
  if(await button.count()===0)button=root.locator(".sc-story-actions > .sc-story-action:not(.sc-story-choice)").first();
  await button.waitFor({state:"visible",timeout:8000});
  await button.click();
  if(before.beatId){
    await page.waitForFunction(old=>{
      const rt=getActiveStorySceneRuntime();
      return !rt||rt.beatId!==old;
    },before.beatId,{timeout:8000});
  }
}

async function continueTo(page,target,{max=180,collect=null}={}){
  for(let i=0;i<max;i++){
    const row=await assertSceneHealthy(page,"continueTo:"+target);
    if(row.beatId===target)return row;
    if(collect)collect.push(row.text);
    if(row.mode==="choice")throw new Error("unexpected player choice before "+target+" @ "+row.beatId+" "+JSON.stringify(row.choices));
    await clickContinue(page);
  }
  throw new Error("continueTo guard exceeded "+target);
}

async function choiceLabels(page){
  const row=await assertSceneHealthy(page,"choiceLabels");
  assert.strictEqual(row.mode,"choice","expected choice beat @ "+row.beatId);
  return row.choices;
}

async function choose(page,label,expectedBeat=null){
  const before=await assertSceneHealthy(page,"choose:"+label);
  assert.strictEqual(before.mode,"choice","choice requested outside choice beat "+before.beatId);
  assert(before.choices.includes(label),"missing visible choice "+label+" @ "+before.beatId+": "+JSON.stringify(before.choices));
  const root=page.locator("#story-scene-presentation-layer");
  const button=root.getByRole("button",{name:label,exact:true});
  assert.strictEqual(await button.count(),1,"choice cardinality "+label);
  await button.click();
  await page.waitForFunction(old=>{
    const rt=getActiveStorySceneRuntime();
    return !!rt&&rt.beatId!==old;
  },before.beatId,{timeout:8000});
  if(expectedBeat)await waitBeat(page,expectedBeat);
  return assertSceneHealthy(page,"after:"+label);
}

async function shot(page,label,name){
  const root=page.locator("#story-scene-presentation-layer");
  await root.waitFor({state:"visible",timeout:8000});
  await root.screenshot({path:path.join(OUT,safeName(label+"-"+name)+".png"),timeout:12000});
}

async function historyEvidence(page){
  return page.evaluate(({spar,young})=>{
    const rows=Array.isArray(playerData.activityHistory)?playerData.activityHistory:[];
    const exact=id=>rows.filter(r=>r&&r.occurrenceId===id&&r.sourceOccurrenceId===id);
    const s=exact(spar),y=exact(young);
    const acq=ensurePlayerAcquisitionState();
    return{
      sparCount:s.length,
      youngCount:y.length,
      spar:s[0]?JSON.parse(JSON.stringify(s[0])):null,
      young:y[0]?JSON.parse(JSON.stringify(y[0])):null,
      prologueCompleted:acq.chronicleOrigin?.prologueCompleted===true,
      teamFormationRequired:acq.academyTeamFormation?.required===true,
      activeStory:getActiveStorySceneRuntime()?JSON.parse(JSON.stringify(getActiveStorySceneRuntime())):null,
      bodyText:document.body.innerText||""
    };
  },{spar:SPAR_OCC,young:YOUNG_OCC});
}

async function finishRoute(page,{label,youngLabel,youngId,expectedResponses}){
  await continueTo(page,"hin_young_choice");
  const youngerLabels=await choiceLabels(page);
  assert.deepStrictEqual(youngerLabels,["SHOW HER ONCE","TELL HER WHAT YOU SAW","LEAVE THEM TO THEIR PRACTICE","WATCH ONE MORE EXCHANGE"],label+" younger choice surface");
  await shot(page,label,"younger-choice");
  await choose(page,youngLabel);
  await continueTo(page,"hin_close_1");
  const closeTexts=[];
  for(let i=0;i<5;i++){
    const row=await assertSceneHealthy(page,label+":close");
    closeTexts.push(row.text);
    if(i<4)await clickContinue(page);
  }
  assert(closeTexts.includes("Tomorrow…"),label+" missing Tomorrow…");
  assert(closeTexts.includes("I'll try again."),label+" missing I'll try again.");
  await shot(page,label,"closing");
  await clickContinue(page);
  await page.waitForFunction(()=>ensurePlayerAcquisitionState().chronicleOrigin?.prologueCompleted===true,null,{timeout:12000});
  await page.waitForFunction(()=>/YOUR CHRONICLE BEGINS/i.test(document.body.innerText||""),null,{timeout:12000});
  const evidence=await historyEvidence(page);
  assert.strictEqual(evidence.sparCount,1,label+" duplicate/missing spar occurrence");
  assert.strictEqual(evidence.youngCount,1,label+" duplicate/missing younger occurrence");
  assert.deepStrictEqual(evidence.spar.fact?.demonstratedResponses,expectedResponses,label+" demonstrated response history");
  assert.strictEqual(evidence.spar.fact?.controlledSparCompleted,true,label+" spar completion fact");
  assert.strictEqual(evidence.young.fact?.youngerStudentChoice,youngId,label+" younger choice fact");
  assert.strictEqual(evidence.young.fact?.selfTaijutsuLearningOccurred,youngId==="stay_and_watch",label+" self-learning fact");
  assert.strictEqual(evidence.young.fact?.youngerStudentParticipantRef,null,label+" participant placeholder must remain null");
  assert.strictEqual(evidence.prologueCompleted,true,label+" Origin not completed");
  assert.strictEqual(evidence.teamFormationRequired,true,label+" Academy Team Formation not required");
  assert.strictEqual(evidence.activeStory,null,label+" Story runtime still active after completion");
  assert(/YOUR CHRONICLE BEGINS/i.test(evidence.bodyText),label+" shared continuity surface missing");
  assert.strictEqual(await visibleBattle(page),false,label+" Battle surface visible after completion");
  await page.screenshot({path:path.join(OUT,safeName(label+"-chronicle-begins")+".png"),fullPage:false,timeout:12000});
  return evidence;
}

async function runWait(browser){
  const label="wait-show";
  const {context,page,runtimeErrorGate}=await boot(browser,label);
  try{
    await continueTo(page,"hin_ex1_choice");
    assert.deepStrictEqual(await choiceLabels(page),["WAIT FOR HIM TO COMMIT","STEP IN FIRST","BREAK AWAY AND RESET"]);
    await shot(page,label,"exchange1");
    await choose(page,"WAIT FOR HIM TO COMMIT","hin_ex1_wait_1");
    await continueTo(page,"hin_ex2_wait_choice");
    assert.deepStrictEqual(await choiceLabels(page),["DON'T BITE — HOLD YOUR GROUND","GIVE HIM AN OPENING","STOP WAITING AND GO FIRST"]);
    await choose(page,"GIVE HIM AN OPENING","hin_ex2_wait_open_1");
    await continueTo(page,"hin_ex3_wait_choice");
    assert.deepStrictEqual(await choiceLabels(page),["ANSWER WITH THE FORM YOU PRACTISED","TRUST WHAT YOU'VE SEEN IN THE SPAR","BREAK THE RHYTHM BEFORE HE CAN SET IT"]);
    await choose(page,"ANSWER WITH THE FORM YOU PRACTISED","hin_ex3_wait_form_1");
    await continueTo(page,"hin_eval_wait_1");
    const evalTexts=[];
    await continueTo(page,"hin_children_intro_1",{collect:evalTexts});
    assert(evalTexts.includes("Waiting worked."),label+" wait evaluation missing");
    assert(evalTexts.includes("Until it didn't."),label+" wait evaluation close missing");
    const evidence=await finishRoute(page,{label,youngLabel:"SHOW HER ONCE",youngId:"show_movement",expectedResponses:["wait_for_opening","wait_give_opening","answer_with_form"]});
    const errors=await runtimeErrorGate.assertClean(label);
    return{label,evidence,errors};
  }finally{await context.close();}
}

async function runPress(browser){
  const label="press-tell";
  const {context,page,runtimeErrorGate}=await boot(browser,label);
  try{
    await continueTo(page,"hin_ex1_choice");
    await choose(page,"STEP IN FIRST","hin_ex1_press_1");
    await continueTo(page,"hin_ex2_press_choice");
    assert.deepStrictEqual(await choiceLabels(page),["KEEP THE PRESSURE ON HIM","DRAW OUT HIS COUNTER","BACK OFF BEFORE HE CAN SET THE TRAP"]);
    await choose(page,"KEEP THE PRESSURE ON HIM","hin_ex2_press_keep_1");
    await continueTo(page,"hin_ex3_press_choice");
    await choose(page,"ANSWER WITH THE FORM YOU PRACTISED","hin_ex3_press_form_1");
    await continueTo(page,"hin_eval_press_1");
    const evalTexts=[];
    await continueTo(page,"hin_children_intro_1",{collect:evalTexts});
    assert(evalTexts.includes("You took more ground than I expected."),label+" press evaluation missing");
    const evidence=await finishRoute(page,{label,youngLabel:"TELL HER WHAT YOU SAW",youngId:"explain_error",expectedResponses:["attack_immediately","press_keep_pressure","answer_with_form"]});
    const errors=await runtimeErrorGate.assertClean(label);
    return{label,evidence,errors};
  }finally{await context.close();}
}

async function runReset(browser){
  const label="reset-leave";
  const {context,page,runtimeErrorGate}=await boot(browser,label);
  try{
    await continueTo(page,"hin_ex1_choice");
    await choose(page,"BREAK AWAY AND RESET","hin_ex1_reset_1");
    await continueTo(page,"hin_ex2_reset_choice");
    assert.deepStrictEqual(await choiceLabels(page),["MEET HIM BEFORE HE CLOSES THE SPACE","CIRCLE OUT","LET HIM THINK HE HAS YOU CORNERED"]);
    await choose(page,"CIRCLE OUT","hin_ex2_reset_circle_1");
    await continueTo(page,"hin_ex3_reset_choice");
    await choose(page,"ANSWER WITH THE FORM YOU PRACTISED","hin_ex3_reset_form_1");
    await continueTo(page,"hin_eval_reset_1");
    const evalTexts=[];
    await continueTo(page,"hin_children_intro_1",{collect:evalTexts});
    assert(evalTexts.includes("Distance is useful."),label+" reset evaluation missing");
    const evidence=await finishRoute(page,{label,youngLabel:"LEAVE THEM TO THEIR PRACTICE",youngId:"leave_them_to_figure_it_out",expectedResponses:["defensive_stance","reset_circle_out","answer_with_form"]});
    const errors=await runtimeErrorGate.assertClean(label);
    return{label,evidence,errors};
  }finally{await context.close();}
}

async function runMixedReload(browser){
  const label="mixed-watch-reload";
  const {context,page,runtimeErrorGate}=await boot(browser,label);
  try{
    await continueTo(page,"hin_ex1_choice");
    await choose(page,"STEP IN FIRST","hin_ex1_press_1");
    await continueTo(page,"hin_ex2_press_choice");
    await choose(page,"DRAW OUT HIS COUNTER","hin_ex2_press_draw_1");
    await continueTo(page,"hin_ex3_changed_choice");
    const beforeReload=await info(page);
    assert.strictEqual(beforeReload.localContext.h1,"attack_immediately");
    assert.strictEqual(beforeReload.localContext.h2,"press_draw_counter");
    assert.strictEqual(beforeReload.localContext.hinApproach1,"press");
    assert.strictEqual(beforeReload.localContext.hinApproach2,"wait");
    assert.strictEqual(beforeReload.localContext.hinChangedApproach,true);
    await shot(page,label,"before-reload");

    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>getActiveStorySceneRuntime()?.sceneId==="origin_academy_hinata_prologue"&&getActiveStorySceneRuntime()?.beatId==="hin_ex3_changed_choice",null,{timeout:20000});
    await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:12000});
    const afterReload=await assertSceneHealthy(page,label+":after-reload");
    assert.strictEqual(afterReload.beatId,"hin_ex3_changed_choice");
    assert.strictEqual(afterReload.localContext.h1,"attack_immediately");
    assert.strictEqual(afterReload.localContext.h2,"press_draw_counter");
    assert.strictEqual(afterReload.localContext.hinApproach1,"press");
    assert.strictEqual(afterReload.localContext.hinApproach2,"wait");
    assert.strictEqual(afterReload.localContext.hinChangedApproach,true);
    assert.deepStrictEqual(afterReload.choices,["ANSWER WITH THE FORM YOU PRACTISED","TRUST WHAT YOU'VE SEEN IN THE SPAR","BREAK THE RHYTHM BEFORE HE CAN SET IT"]);
    await shot(page,label,"after-reload");

    await choose(page,"TRUST WHAT YOU'VE SEEN IN THE SPAR","hin_ex3_changed_trust_1");
    await continueTo(page,"hin_eval_changed_1");
    const evalTexts=[];
    await continueTo(page,"hin_children_intro_1",{collect:evalTexts});
    for(const line of ["Your second exchange didn't look like your first.","Your third didn't look like either.","Harder."]){
      assert(evalTexts.includes(line),label+" mixed evaluation missing: "+line);
    }
    const evidence=await finishRoute(page,{label,youngLabel:"WATCH ONE MORE EXCHANGE",youngId:"stay_and_watch",expectedResponses:["attack_immediately","press_draw_counter","trust_spar"]});

    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>ensurePlayerAcquisitionState().chronicleOrigin?.prologueCompleted===true,null,{timeout:15000});
    const replayEvidence=await historyEvidence(page);
    assert.strictEqual(replayEvidence.sparCount,1,label+" spar occurrence duplicated after reload");
    assert.strictEqual(replayEvidence.youngCount,1,label+" younger occurrence duplicated after reload");
    const errors=await runtimeErrorGate.assertClean(label);
    return{label,beforeReload,afterReload,evidence,replayEvidence,errors};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  const results=[];
  try{
    results.push(await runWait(browser));
    results.push(await runPress(browser));
    results.push(await runReset(browser));
    results.push(await runMixedReload(browser));
    const summary={
      pass:true,
      issue:340,
      kind:"installed_browser_hinata_writing_golden",
      routes:["wait_show","press_tell","reset_leave","mixed_watch_reload"],
      exactSourceOccurrences:[SPAR_OCC,YOUNG_OCC],
      saveReloadMidSpar:true,
      plBattle:false,
      originToChronicleBegins:true,
      browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({summary,results},null,2));
    console.log(JSON.stringify(summary,null,2));
  }catch(error){
    try{fs.writeFileSync(path.join(OUT,"failure.txt"),String(error&&error.stack||error));}catch(_){}
    console.error(error&&error.stack||error);
    process.exitCode=1;
  }finally{
    await browser.close();
  }
})();
