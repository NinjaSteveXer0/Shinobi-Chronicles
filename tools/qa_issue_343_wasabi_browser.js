#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BUILD=JSON.parse(fs.readFileSync(path.join(__dirname,"fixtures/runtime_build_manifest_303.json"),"utf8"));
const BASE=process.env.ISSUE_343_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_343_BROWSER_OUT||"artifacts/issue-343-wasabi-browser";
fs.mkdirSync(OUT,{recursive:true});

const SCENE="origin_academy_izuno_prologue";
const WASABI="academy_izuno";
const ROGUE="wasabi_origin_rogue_genin_01";
const TRACKING="occ_origin_izuno_pursuit_tracking_resolution";
const INTERCEPT="occ_origin_izuno_intercept_prediction_resolution";
const COOP="occ_origin_izuno_pursuit_cooperation_resolution";
const ROGUE_OCC="occ_origin_izuno_rogue_genin_interruption_resolution";

function slug(v){return String(v||"route").replace(/[^a-z0-9_-]+/gi,"-").toLowerCase();}
async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_){}
    const game=document.querySelector(".game-container");if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){const n=document.getElementById(id);if(n)n.remove();}
  });
}
async function boot(browser,label){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage(),runtimeErrorGate=await installBrowserRuntimeErrorGate(page);
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof getRuntimeBuildFingerprint==="function"&&!!globalThis.SC_ACADEMY_WASABI_WRITING_GOLDEN_343&&!!globalThis.SC_ACADEMY_WASABI_ROGUE_BATTLE_343&&!!globalThis.SC_ALPHA_ORIGIN_32900,null,{timeout:30000});
  assert.deepStrictEqual(await page.evaluate(()=>getRuntimeBuildFingerprint()),BUILD,label+" runtime fingerprint mismatch");
  const started=await page.evaluate(()=>{
    const selected=selectChronicleOrigin("academy_izuno","issue_343_installed_browser");
    const launched=beginAlphaChronicleOriginPrologue();
    return{selected,launched};
  });
  assert(started.selected?.success===true,label+" select failed "+JSON.stringify(started));
  assert(started.launched?.success===true,label+" launch failed "+JSON.stringify(started));
  await releaseFrontDoor(page);
  await page.waitForFunction(scene=>{
    const rt=getActiveStorySceneRuntime(),root=document.getElementById("story-scene-presentation-layer");
    return !!rt&&rt.sceneId===scene&&!!root&&root.dataset.sceneId===scene&&root.style.display!=="none";
  },SCENE,{timeout:15000});
  return{context,page,runtimeErrorGate};
}
async function info(page){
  return page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime(),beat=getCurrentStorySceneBeat(),root=document.getElementById("story-scene-presentation-layer");
    const visible=n=>!!n&&n.getClientRects().length>0&&getComputedStyle(n).display!=="none"&&getComputedStyle(n).visibility!=="hidden"&&Number(getComputedStyle(n).opacity)!==0;
    return{
      sceneId:rt?.sceneId||null,beatId:rt?.beatId||null,mode:beat?.mode||null,machineResolved:beat?.machineResolved===true,
      localContext:rt?.localContext?JSON.parse(JSON.stringify(rt.localContext)):{},
      text:root?.querySelector(".sc-story-text")?.textContent?.trim()||"",
      speaker:root?.querySelector(".sc-story-name")?.textContent?.trim()||"",
      choices:[...(root?.querySelectorAll(".sc-story-choice")||[])].filter(visible).map(n=>n.textContent.trim()),
      rootVisible:visible(root),battleVisible:visible(document.querySelector(".alpha-code-battle-stage"))
    };
  });
}
async function waitBeat(page,id){
  await page.waitForFunction(({scene,id})=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId===id,{scene:SCENE,id},{timeout:12000});
}
async function clickContinue(page){
  const before=await info(page);
  assert(before.rootVisible&&!before.battleVisible,"Story continue surface invalid @ "+before.beatId);
  assert.notStrictEqual(before.mode,"choice","continue called on choice "+before.beatId);
  const root=page.locator("#story-scene-presentation-layer");
  let button=root.locator(".sc-chronicle-primary").first();
  if(await button.count()===0)button=root.locator(".sc-story-actions > .sc-story-action:not(.sc-story-choice)").first();
  await button.waitFor({state:"visible",timeout:8000});
  await button.click();
  await page.waitForFunction(old=>!getActiveStorySceneRuntime()||getActiveStorySceneRuntime().beatId!==old, before.beatId,{timeout:8000});
}
async function advanceResolver(page){
  const before=await info(page);
  assert.strictEqual(before.mode,"resolver","resolver advance called @ "+before.beatId);
  assert.strictEqual(before.machineResolved,true,"resolver not machine-owned @ "+before.beatId);
  assert.deepStrictEqual(before.choices,[],"machine resolver leaked player choices @ "+before.beatId);
  const result=await page.evaluate(()=>advanceStoryScene());
  assert(result?.success===true,"resolver advance failed @ "+before.beatId+" "+JSON.stringify(result));
  await page.waitForFunction(old=>getActiveStorySceneRuntime()?.beatId!==old,before.beatId,{timeout:8000});
}
async function continueTo(page,target,{max=260}={}){
  for(let i=0;i<max;i++){
    const row=await info(page);
    assert.strictEqual(row.sceneId,SCENE,"scene drift while seeking "+target);
    if(row.beatId===target)return row;
    if(row.mode==="choice")throw new Error("unexpected choice before "+target+" @ "+row.beatId+" "+JSON.stringify(row.choices));
    if(row.mode==="battle_transition")throw new Error("unexpected Battle before "+target+" @ "+row.beatId);
    if(row.mode==="resolver")await advanceResolver(page);else await clickContinue(page);
  }
  throw new Error("continueTo guard exceeded "+target);
}
async function choose(page,label,expected=null){
  const before=await info(page);
  assert.strictEqual(before.mode,"choice","choice requested outside choice beat "+before.beatId);
  assert(before.choices.includes(label),"missing choice "+label+" @ "+before.beatId+" "+JSON.stringify(before.choices));
  const button=page.locator("#story-scene-presentation-layer").getByRole("button",{name:label,exact:true});
  assert.strictEqual(await button.count(),1,"choice cardinality "+label);
  await button.click();
  await page.waitForFunction(old=>getActiveStorySceneRuntime()?.beatId!==old,before.beatId,{timeout:8000});
  if(expected)await waitBeat(page,expected);
}
async function shot(page,label,name,selector="#story-scene-presentation-layer"){
  const loc=page.locator(selector);await loc.waitFor({state:"visible",timeout:10000});
  await loc.screenshot({path:path.join(OUT,slug(label+"-"+name)+".png"),timeout:12000});
}
async function startToInitial(page){
  await continueTo(page,"izu_initial_choice");
  assert.deepStrictEqual((await info(page)).choices,["TAKE THE OBVIOUS TRAIL","LOOK FOR SOMETHING BETTER","WORK WITH THE OTHERS","FORGET THE TRAIL — WHERE ARE THEY GOING?"]);
}
async function toSplit(page,opening){
  await startToInitial(page);await choose(page,opening);
  await continueTo(page,"izu_split_choice");
  assert.deepStrictEqual((await info(page)).choices,["TAKE THE RIVER","FOLLOW THE STRONGER TRAIL","CHECK THE SHOUTING","CUT FOR THE INTERCEPT"]);
}
async function history(page){
  return page.evaluate(({ids})=>{
    const rows=Array.isArray(playerData.activityHistory)?playerData.activityHistory:[];
    const exact={};
    for(const id of ids)exact[id]=rows.filter(r=>r&&r.occurrenceId===id&&r.sourceOccurrenceId===id).map(r=>JSON.parse(JSON.stringify(r)));
    const acq=ensurePlayerAcquisitionState();
    return{
      exact,prologueCompleted:acq.chronicleOrigin?.prologueCompleted===true,
      teamFormationRequired:acq.academyTeamFormation?.required===true,
      activeStory:getActiveStorySceneRuntime()?JSON.parse(JSON.stringify(getActiveStorySceneRuntime())):null,
      bodyText:document.body.innerText||""
    };
  },{ids:[TRACKING,INTERCEPT,COOP,ROGUE_OCC]});
}
async function finishFromCurrent(page,label,reflection="Sometimes the fastest path isn't the obvious one."){
  await continueTo(page,"izu_reflect");
  assert.deepStrictEqual((await info(page)).choices,[
    "Next time I'm trusting the trail.","Next time I'm trusting what I notice.","Sometimes the fastest path isn't the obvious one.","Catching them wasn't the only thing that mattered."
  ]);
  await shot(page,label,"reflection");
  await choose(page,reflection,"izu_close_1");
  for(let i=0;i<80;i++){
    const rt=await page.evaluate(()=>getActiveStorySceneRuntime()?{beatId:getActiveStorySceneRuntime().beatId}:null);
    if(!rt)break;
    const row=await info(page);
    if(row.mode==="resolver")await advanceResolver(page);else await clickContinue(page);
  }
  await page.waitForFunction(()=>ensurePlayerAcquisitionState().chronicleOrigin?.prologueCompleted===true,null,{timeout:12000});
  await page.waitForFunction(()=>/YOUR CHRONICLE BEGINS/i.test(document.body.innerText||""),null,{timeout:12000});
  const h=await history(page);
  assert.strictEqual(h.prologueCompleted,true,label+" Origin incomplete");
  assert.strictEqual(h.teamFormationRequired,true,label+" Team Formation not required");
  assert.strictEqual(h.activeStory,null,label+" Story still active");
  assert(/YOUR CHRONICLE BEGINS/i.test(h.bodyText),label+" shared continuity missing");
  return h;
}
async function runNonBattle(browser,{label,opening,route,rogueChoice=null,checks}){
  const {context,page,runtimeErrorGate}=await boot(browser,label);
  try{
    await toSplit(page,opening);
    await choose(page,route);
    if(route==="CHECK THE SHOUTING"){
      await continueTo(page,"izu_rogue_choice");
      assert.deepStrictEqual((await info(page)).choices,["STEP IN","CALL FOR HELP","KEEP PURSUING"]);
      await shot(page,label,"rogue-choice");
      await choose(page,rogueChoice);
    }
    await continueTo(page,"izu_reflect");
    const before=await history(page);
    await checks(page,before);
    const completed=await finishFromCurrent(page,label);
    const errors=await runtimeErrorGate.assertClean(label);
    return{label,before,completed,errors};
  }finally{await context.close();}
}
async function launchBattle(page,label){
  await continueTo(page,"izu_rogue_step_in_battle");
  const before=await info(page);
  assert.strictEqual(before.mode,"battle_transition");
  const root=page.locator("#story-scene-presentation-layer");
  let button=root.getByRole("button",{name:"BEGIN PL BATTLE",exact:true});
  if(await button.count()===0)button=root.locator(".sc-chronicle-primary").first();
  await button.waitFor({state:"visible",timeout:8000});
  await button.click();
  await page.waitForFunction(()=>currentBattle&&currentBattle.wasabi343&&currentBattle.active===true,null,{timeout:12000});
  await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});
  const battle=await page.evaluate(()=>({
    battleId:currentBattle.battleId,encounterId:currentBattle.encounterId,
    returnContext:JSON.parse(JSON.stringify(currentBattle.returnContext||null)),
    playerSlots:(currentBattle.deployment?.player?.slots||[]).map(s=>s.participantId).filter(Boolean),
    enemySlots:(currentBattle.deployment?.enemy?.slots||[]).map(s=>s.participantId).filter(Boolean),
    meta:JSON.parse(JSON.stringify(currentBattle.wasabi343||null)),
    rewards:JSON.parse(JSON.stringify(currentBattle.rewards||null)),
    enemy:{
      pl:enemyDatabase["wasabi_origin_rogue_genin_01"]?.calibratedBasePL,
      stats:enemyDatabase["wasabi_origin_rogue_genin_01"]?.baseStats,
      template:enemyDatabase["wasabi_origin_rogue_genin_01"]?.oppositionTemplateId,
      actions:(enemyDatabase["wasabi_origin_rogue_genin_01"]?.authoredBattleActions||[]).map(a=>({id:a.id,pl:a.authoredAttackPL??null,traits:a.traits||[]}))
    },
    buttons:[...document.querySelectorAll(".alpha-code-battle-stage button")].filter(n=>n.getClientRects().length>0).map(n=>n.textContent.trim())
  }));
  const instanceId=battle.returnContext?.sceneInstanceId||battle.returnContext?.storyInstanceId||battle.returnContext?.instanceId;
  assert.strictEqual(battle.battleId,"battle_occ_origin_izuno_rogue_genin_step_in:"+instanceId,label+" exact Battle occurrence");
  assert.strictEqual(battle.encounterId,"origin_academy_izuno_rogue_genin_step_in");
  assert.deepStrictEqual(battle.playerSlots,[WASABI]);assert.deepStrictEqual(battle.enemySlots,[ROGUE]);
  assert.strictEqual(battle.enemy.pl,23);assert.deepStrictEqual(battle.enemy.stats,{nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24});
  assert.strictEqual(battle.enemy.template,"rogue_genin");
  assert.deepStrictEqual(battle.enemy.actions.map(a=>[a.id,a.pl]),[
    ["enemy_rogue_genin_kunai_rush",9],["enemy_rogue_genin_shuriken_spread",7],["enemy_rogue_genin_substitution_feint",null]
  ]);
  assert.strictEqual(battle.rewards?.ryo,0);assert.strictEqual(battle.rewards?.exp,0);
  assert.deepStrictEqual(battle.rewards?.items||[],[]);assert.deepStrictEqual(battle.rewards?.rareDrops||[],[]);
  assert.strictEqual(battle.rewards?.requiresExplicitPostClaimContinue,true,"CLAIM collapsed into CONTINUE");
  assert(!battle.buttons.some(x=>/^WITHDRAW$/i.test(x)||/^SWITCH$/i.test(x)),"WITHDRAW/successor control visible in strict 1v1");
  await shot(page,label,"battle",".alpha-code-battle-stage");
  return battle;
}
async function reloadBattle(page,battle,label){
  await page.reload({waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(id=>currentBattle&&currentBattle.battleId===id&&currentBattle.wasabi343,null,battle.battleId,{timeout:20000});
  await releaseFrontDoor(page);
  await page.evaluate(()=>{try{if(currentBattle?.active)openOverlay("combat");}catch(_){ }});
  await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});
  const after=await page.evaluate(()=>({
    battleId:currentBattle.battleId,
    playerSlots:(currentBattle.deployment?.player?.slots||[]).map(s=>s.participantId).filter(Boolean),
    enemySlots:(currentBattle.deployment?.enemy?.slots||[]).map(s=>s.participantId).filter(Boolean),
    meta:JSON.parse(JSON.stringify(currentBattle.wasabi343||null)),
    store:JSON.parse(JSON.stringify(playerData.wasabi343BattleLaunches||{}))
  }));
  assert.strictEqual(after.battleId,battle.battleId,label+" Battle occurrence changed on reload");
  assert.deepStrictEqual(after.playerSlots,[WASABI]);assert.deepStrictEqual(after.enemySlots,[ROGUE]);
  assert(after.store[battle.battleId],label+" launch receipt missing after reload");
  return after;
}
async function terminateBattleToStory(page,outcome,label){
  const result=await page.evaluate(({outcome,wasabi,rogue})=>{
    const prior=globalThis.getBattleRemainingPL;
    globalThis.getBattleRemainingPL=(side,id)=>{
      if(outcome==="victory"&&side==="enemy"&&id===rogue)return 0;
      if(outcome==="defeat"&&side==="player"&&id===wasabi)return 0;
      return typeof prior==="function"?prior(side,id):1;
    };
    try{
      currentBattle.outcome={...(currentBattle.outcome||{}),type:outcome,completedAt:Date.now(),finishingShinobiId:outcome==="victory"?wasabi:null};
      currentBattle.battleOver=true;currentBattle.active=false;
      return resumeBattleCallerAfterCompletion(outcome);
    }finally{globalThis.getBattleRemainingPL=prior;}
  },{outcome,wasabi:WASABI,rogue:ROGUE});
  assert(result?.success===true,label+" caller return failed "+JSON.stringify(result));
  await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:12000});
  await waitBeat(page,"izu_rogue_step_in_return_1");
  const returned=await info(page);
  assert.strictEqual(returned.localContext.rogueGeninResponse,"intervene");
  assert.strictEqual(returned.localContext.rogueResolved,true);
  assert.strictEqual(returned.localContext.rogueBattleResult,outcome);
  assert.strictEqual(returned.localContext.outcome,"secondary_occurrence_costs_pursuit");
  assert.strictEqual(returned.localContext.battleOccurrenceIds.length,1);
  return returned;
}
async function runBattleRoute(browser,outcome){
  const label="step-in-"+outcome;
  const {context,page,runtimeErrorGate}=await boot(browser,label);
  try{
    await toSplit(page,outcome==="victory"?"LOOK FOR SOMETHING BETTER":"FORGET THE TRAIL — WHERE ARE THEY GOING?");
    await choose(page,"CHECK THE SHOUTING");
    await continueTo(page,"izu_rogue_choice");
    await choose(page,"STEP IN","izu_rogue_step_in_1");
    const battle=await launchBattle(page,label);
    const reloaded=await reloadBattle(page,battle,label);
    await terminateBattleToStory(page,outcome,label);
    await continueTo(page,"izu_reflect");
    let h=await history(page);
    assert.strictEqual(h.exact[ROGUE_OCC].length,1,label+" IZU-04 missing/duplicated");
    assert.strictEqual(h.exact[ROGUE_OCC][0].fact?.rogueGeninResponse,"intervene");
    assert.strictEqual(h.exact[ROGUE_OCC][0].fact?.rogueGeninInterruptionResolvedByWasabiAction,true);
    assert.deepStrictEqual(h.exact[ROGUE_OCC][0].fact?.battleOccurrenceIds,[battle.battleId]);
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>getActiveStorySceneRuntime()?.sceneId==="origin_academy_izuno_prologue"&&getActiveStorySceneRuntime()?.beatId==="izu_reflect",null,{timeout:20000});
    await releaseFrontDoor(page);
    await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:12000});
    h=await history(page);
    assert.strictEqual(h.exact[ROGUE_OCC].length,1,label+" reload duplicated IZU-04");
    const completed=await finishFromCurrent(page,label,"Catching them wasn't the only thing that mattered.");
    const errors=await runtimeErrorGate.assertClean(label);
    return{label,battle,reloaded,returnedOutcome:outcome,completed,errors};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:false}),results=[];
  try{
    results.push(await runNonBattle(browser,{
      label:"obvious-river",opening:"TAKE THE OBVIOUS TRAIL",route:"TAKE THE RIVER",
      checks:async(_page,h)=>{assert.strictEqual(h.exact[TRACKING].length,1);assert.strictEqual(h.exact[TRACKING][0].fact?.pursuitOutcome,"arrive_just_after_target");assert.strictEqual(h.exact[ROGUE_OCC].length,0);}
    }));
    results.push(await runNonBattle(browser,{
      label:"better-stronger",opening:"LOOK FOR SOMETHING BETTER",route:"FOLLOW THE STRONGER TRAIL",
      checks:async(_page,h)=>{assert.strictEqual(h.exact[TRACKING][0].fact?.reliableEnvironmentalTrackingEstablished,true);assert.strictEqual(h.exact[TRACKING][0].fact?.falseTrailCorrectlyDiscovered,true);assert.strictEqual(h.exact[TRACKING][0].fact?.pursuitOutcome,"false_trail_discovered");}
    }));
    results.push(await runNonBattle(browser,{
      label:"predict-intercept",opening:"FORGET THE TRAIL — WHERE ARE THEY GOING?",route:"CUT FOR THE INTERCEPT",
      checks:async(_page,h)=>{assert.strictEqual(h.exact[INTERCEPT][0].fact?.interceptReachedByPrediction,true);assert.strictEqual(h.exact[INTERCEPT][0].fact?.pursuitOutcome,"intercept_before_extraction");}
    }));
    results.push(await runNonBattle(browser,{
      label:"cooperate-call-help",opening:"WORK WITH THE OTHERS",route:"CHECK THE SHOUTING",rogueChoice:"CALL FOR HELP",
      checks:async(_page,h)=>{assert.strictEqual(h.exact[COOP][0].fact?.cooperatedWithAcademyStudents,true);assert.strictEqual(h.exact[ROGUE_OCC].length,1);assert.strictEqual(h.exact[ROGUE_OCC][0].fact?.rogueGeninResponse,"call_for_help");assert.deepStrictEqual(h.exact[ROGUE_OCC][0].fact?.battleOccurrenceIds,[]);}
    }));
    results.push(await runNonBattle(browser,{
      label:"obvious-keep-pursuing",opening:"TAKE THE OBVIOUS TRAIL",route:"CHECK THE SHOUTING",rogueChoice:"KEEP PURSUING",
      checks:async(_page,h)=>{assert.strictEqual(h.exact[ROGUE_OCC].length,0,"KEEP PURSUING counterfeited resolved IZU-04");const row=await info(_page);assert.strictEqual(row.localContext.rogueGeninResponse,"keep_pursuing");assert.strictEqual(row.localContext.rogueResolved,false);}
    }));
    results.push(await runBattleRoute(browser,"victory"));
    results.push(await runBattleRoute(browser,"defeat"));

    const summary={
      pass:true,issue:343,kind:"installed_browser_wasabi_writing_golden_rogue_battle",
      routeFamilies:["obvious_river","better_stronger","predict_intercept","cooperate_call_help","keep_pursuing","step_in_victory","step_in_defeat"],
      exactSourceOccurrences:[TRACKING,INTERCEPT,COOP,ROGUE_OCC],
      strictOneVsOneBattle:true,battleSaveReload:true,bothBattleOutcomesReturn:true,
      zeroBattleEntitlement:true,claimSeparateFromContinue:true,originToChronicleBegins:true,browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({summary,results},null,2));
    console.log(JSON.stringify(summary,null,2));
  }catch(error){
    try{fs.writeFileSync(path.join(OUT,"failure.txt"),String(error&&error.stack||error));}catch(_){}
    console.error(error&&error.stack||error);process.exitCode=1;
  }finally{await browser.close();}
})();
