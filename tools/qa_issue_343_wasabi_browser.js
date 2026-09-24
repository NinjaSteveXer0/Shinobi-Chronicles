#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BUILD_MANIFEST=JSON.parse(fs.readFileSync(path.join(__dirname,"fixtures/runtime_build_manifest_303.json"),"utf8"));
const BASE=process.env.ISSUE_343_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_343_BROWSER_OUT||"artifacts/issue-343-wasabi-browser";
fs.mkdirSync(OUT,{recursive:true});

const SCENE_ID="origin_academy_izuno_prologue";
const TRACKING_OCC="occ_origin_izuno_pursuit_tracking_resolution";
const INTERCEPT_OCC="occ_origin_izuno_intercept_prediction_resolution";
const COOP_OCC="occ_origin_izuno_pursuit_cooperation_resolution";
const ROGUE_OCC="occ_origin_izuno_rogue_genin_interruption_resolution";
const BATTLE_CONFIG="academy_izuno_origin_rogue_genin_step_in_battle";
const ENCOUNTER="origin_academy_izuno_rogue_genin_step_in";
const PLAYER="academy_izuno";
const HISTORICAL="wasabi_origin_rogue_genin_01";

function safeName(value){return String(value||"route").replace(/[^a-z0-9_-]+/gi,"-").toLowerCase();}

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
  await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_){}});
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof globalThis.getRuntimeBuildFingerprint==="function",null,{timeout:20000});
  assert.deepStrictEqual(await page.evaluate(()=>getRuntimeBuildFingerprint()),BUILD_MANIFEST,label+" runtime fingerprint mismatch");
  await page.waitForFunction(()=>!!(
    globalThis.SC_ALPHA_ORIGIN_32900&&
    globalThis.SC_ACADEMY_WASABI_WRITING_GOLDEN_34300&&
    globalThis.SC_ACADEMY_WASABI_BATTLE_34300&&
    typeof globalThis.selectChronicleOrigin==="function"&&
    typeof globalThis.beginAlphaChronicleOriginPrologue==="function"&&
    typeof globalThis.getActiveStorySceneRuntime==="function"&&
    typeof globalThis.getCurrentStorySceneBeat==="function"&&
    typeof globalThis.setBattleRemainingPL==="function"
  ),null,{timeout:30000});

  const started=await page.evaluate(()=>{
    const selected=selectChronicleOrigin("academy_izuno","issue_343_installed_browser");
    const launched=beginAlphaChronicleOriginPrologue();
    return{selected,launched};
  });
  assert(started.selected&&started.selected.success===true,label+" select failed: "+JSON.stringify(started));
  assert(started.launched&&started.launched.success===true,label+" start failed: "+JSON.stringify(started));
  await releaseFrontDoor(page);
  await page.waitForFunction(scene=>{
    const rt=getActiveStorySceneRuntime(),root=document.getElementById("story-scene-presentation-layer");
    return !!rt&&rt.sceneId===scene&&!!root&&root.dataset.sceneId===scene&&root.style.display!=="none";
  },SCENE_ID,{timeout:15000});
  return{context,page,runtimeErrorGate};
}

async function info(page){
  return page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime(),beat=getCurrentStorySceneBeat();
    const root=document.getElementById("story-scene-presentation-layer");
    const visible=node=>{
      if(!node)return false;
      const s=getComputedStyle(node);
      return node.getClientRects().length>0&&s.display!=="none"&&s.visibility!=="hidden"&&Number(s.opacity)!==0;
    };
    const battle=document.querySelector(".alpha-code-battle-stage");
    return{
      sceneId:rt?.sceneId||null,beatId:rt?.beatId||null,mode:beat?.mode||null,
      text:root?.querySelector(".sc-story-text")?.textContent?.trim()||"",
      speaker:root?.querySelector(".sc-story-name")?.textContent?.trim()||"",
      choices:[...(root?.querySelectorAll(".sc-story-choice")||[])].filter(visible).map(n=>n.textContent.trim()),
      primaryLabels:[...(root?.querySelectorAll(".sc-chronicle-primary,.sc-story-actions > .sc-story-action:not(.sc-story-choice)")||[])].filter(visible).map(n=>n.textContent.trim()),
      rootVisible:visible(root),battleVisible:visible(battle),
      localContext:rt&&rt.localContext?JSON.parse(JSON.stringify(rt.localContext)):{}
    };
  });
}

async function assertStory(page,label){
  const row=await info(page);
  assert.strictEqual(row.sceneId,SCENE_ID,label+" scene identity drift");
  assert.strictEqual(row.rootVisible,true,label+" Story surface missing");
  assert.strictEqual(row.battleVisible,false,label+" Battle surface illegally visible");
  return row;
}

async function waitBeat(page,beatId){
  await page.waitForFunction(({scene,beatId})=>{
    const rt=getActiveStorySceneRuntime(),root=document.getElementById("story-scene-presentation-layer");
    return !!rt&&rt.sceneId===scene&&rt.beatId===beatId&&root?.dataset.beatId===beatId&&root.style.display!=="none";
  },{scene:SCENE_ID,beatId},{timeout:12000});
}

async function clickContinue(page){
  const before=await assertStory(page,"continue");
  assert.notStrictEqual(before.mode,"choice","continue called on choice "+before.beatId);
  assert.notStrictEqual(before.mode,"battle_transition","continue called on Battle transition "+before.beatId);
  const root=page.locator("#story-scene-presentation-layer");
  let button=root.locator(".sc-chronicle-primary").first();
  if(await button.count()===0)button=root.locator(".sc-story-actions > .sc-story-action:not(.sc-story-choice)").first();
  await button.waitFor({state:"visible",timeout:8000});
  await button.click();
  await page.waitForFunction(old=>{
    const rt=getActiveStorySceneRuntime();
    return !rt||rt.beatId!==old;
  },before.beatId,{timeout:8000});
}

async function continueTo(page,target,{max=240}={}){
  for(let i=0;i<max;i++){
    const row=await assertStory(page,"continueTo:"+target);
    if(row.beatId===target)return row;
    if(row.mode==="choice")throw new Error("unexpected choice before "+target+" @ "+row.beatId+" "+JSON.stringify(row.choices));
    if(row.mode==="battle_transition")throw new Error("unexpected Battle before "+target+" @ "+row.beatId);
    await clickContinue(page);
  }
  throw new Error("continueTo guard exceeded "+target);
}

async function choose(page,label,expectedBeat=null){
  const before=await assertStory(page,"choose:"+label);
  assert.strictEqual(before.mode,"choice","choice requested outside choice beat "+before.beatId);
  assert(before.choices.includes(label),"missing visible choice "+label+" @ "+before.beatId+": "+JSON.stringify(before.choices));
  const button=page.locator("#story-scene-presentation-layer").getByRole("button",{name:label,exact:true});
  assert.strictEqual(await button.count(),1,"choice cardinality "+label);
  await button.click();
  await page.waitForFunction(old=>getActiveStorySceneRuntime()?.beatId!==old,before.beatId,{timeout:8000});
  if(expectedBeat)await waitBeat(page,expectedBeat);
}

async function shotStory(page,label){
  await page.locator("#story-scene-presentation-layer").screenshot({path:path.join(OUT,safeName(label)+".png"),timeout:12000});
}
async function shotBattle(page,label){
  await page.locator("#screen-overlay").screenshot({path:path.join(OUT,safeName(label)+".png"),timeout:12000});
}

async function routeToRogueChoice(page,{initial="LOOK FOR SOMETHING BETTER"}={}){
  await continueTo(page,"izu_initial_choice");
  assert.deepStrictEqual((await info(page)).choices,[
    "TAKE THE OBVIOUS TRAIL","LOOK FOR SOMETHING BETTER","WORK WITH THE OTHERS","FORGET THE TRAIL — WHERE ARE THEY GOING?"
  ]);
  await choose(page,initial);
  const split=initial==="WORK WITH THE OTHERS"?"izu_split_choice_coop":"izu_split_choice";
  await continueTo(page,split);
  assert.deepStrictEqual((await info(page)).choices,["TAKE THE RIVER","FOLLOW THE STRONGER TRAIL","CHECK THE SHOUTING","CUT FOR THE INTERCEPT"]);
  await choose(page,"CHECK THE SHOUTING");
  const rogue=initial==="WORK WITH THE OTHERS"?"izu_rogue_choice_coop":"izu_rogue_choice";
  await continueTo(page,rogue);
  assert.deepStrictEqual((await info(page)).choices,["STEP IN","CALL FOR HELP","KEEP PURSUING"]);
  return rogue;
}

async function exactOccurrenceRows(page,occurrenceId){
  return page.evaluate(occurrenceId=>{
    const rows=Array.isArray(playerData.activityHistory)?playerData.activityHistory:[];
    return rows.filter(row=>row&&row.occurrenceId===occurrenceId&&row.sourceOccurrenceId===occurrenceId).map(row=>JSON.parse(JSON.stringify(row)));
  },occurrenceId);
}

async function finishOrigin(page,label){
  await continueTo(page,"izu_reflect");
  assert.deepStrictEqual((await info(page)).choices,[
    "Next time I'm trusting the trail.",
    "Next time I'm trusting what I notice.",
    "Sometimes the fastest path isn't the obvious one.",
    "Catching them wasn't the only thing that mattered."
  ]);
  await choose(page,"Catching them wasn't the only thing that mattered.");
  for(let i=0;i<80;i++){
    const active=await page.evaluate(()=>getActiveStorySceneRuntime()?true:false);
    if(!active)break;
    const row=await assertStory(page,label+":close");
    if(row.mode==="choice")throw new Error("unexpected terminal choice "+JSON.stringify(row));
    await clickContinue(page);
  }
  await page.waitForFunction(()=>ensurePlayerAcquisitionState().chronicleOrigin?.prologueCompleted===true,null,{timeout:12000});
  await page.waitForFunction(()=>/YOUR CHRONICLE BEGINS/i.test(document.body.innerText||""),null,{timeout:12000});
  const final=await page.evaluate(()=>({
    prologueCompleted:ensurePlayerAcquisitionState().chronicleOrigin?.prologueCompleted===true,
    teamFormationRequired:ensurePlayerAcquisitionState().academyTeamFormation?.required===true,
    activeStory:getActiveStorySceneRuntime(),
    bodyText:document.body.innerText||""
  }));
  assert.strictEqual(final.prologueCompleted,true,label+" Origin not completed");
  assert.strictEqual(final.teamFormationRequired,true,label+" Team Formation not required");
  assert.strictEqual(final.activeStory,null,label+" Story runtime still active");
  assert(/YOUR CHRONICLE BEGINS/i.test(final.bodyText),label+" shared continuity missing");
  await page.screenshot({path:path.join(OUT,safeName(label+"-chronicle-begins")+".png"),fullPage:false,timeout:12000});
  return{...final,bodyText:"YOUR CHRONICLE BEGINS visible"};
}

async function launchStepInBattle(page,label){
  await choose(page,"STEP IN");
  const battleBeat=(await info(page)).beatId?.startsWith("izu_rogue_step_in_")?null:null;
  const target=(await page.evaluate(()=>getActiveStorySceneRuntime()?.beatId||null)).includes("_coop")?"izu_rogue_step_in_battle_coop":"izu_rogue_step_in_battle";
  await continueTo(page,target);
  const before=await assertStory(page,label+":battle-transition");
  assert.strictEqual(before.mode,"battle_transition");
  const root=page.locator("#story-scene-presentation-layer");
  let button=root.getByRole("button",{name:"BEGIN PL BATTLE",exact:true});
  if(await button.count()===0)button=root.locator(".sc-chronicle-primary").first();
  await button.waitFor({state:"visible",timeout:8000});
  await button.click();
  await page.waitForFunction(()=>!!(currentBattle&&currentBattle.active&&currentBattle.wasabiOrigin34300&&currentBattle.returnContext?.type==="story_scene"),null,{timeout:12000});
  await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});
  await page.waitForFunction(()=>{
    const n=document.querySelector(".alpha-code-battle-stage");if(!n)return false;
    const s=getComputedStyle(n);return n.getClientRects().length>0&&s.display!=="none"&&s.visibility!=="hidden";
  },null,{timeout:12000});

  const state=await page.evaluate(()=>({
    battleId:currentBattle.battleId,
    encounterId:currentBattle.encounterId,
    meta:JSON.parse(JSON.stringify(currentBattle.wasabiOrigin34300)),
    returnContext:JSON.parse(JSON.stringify(currentBattle.returnContext)),
    playerSlots:[1,2,3,4].map(slot=>getBattleDeploymentParticipant("player",slot)?.id||null),
    enemySlots:[1,2,3,4].map(slot=>getBattleDeploymentParticipant("enemy",slot)?.id||null),
    playerPL:getBattleRemainingPL("player","academy_izuno"),
    enemyPL:getBattleRemainingPL("enemy","wasabi_origin_rogue_genin_01"),
    enemyMax:getBattleMaximumPL("enemy","wasabi_origin_rogue_genin_01"),
    config:JSON.parse(JSON.stringify(SC_ACADEMY_WASABI_BATTLE_34300.config)),
    receiptCount:Object.keys(playerData.wasabiOriginBattle34300?.receipts||{}).length,
    receipt:JSON.parse(JSON.stringify(Object.values(playerData.wasabiOriginBattle34300?.receipts||{})[0]||null)),
    storyVisible:document.getElementById("story-scene-presentation-layer")?.getClientRects().length>0
  }));
  assert.strictEqual(state.encounterId,ENCOUNTER);
  assert.strictEqual(state.meta.battleConfigId,BATTLE_CONFIG);
  assert.strictEqual(state.meta.sourceOccurrenceId,ROGUE_OCC);
  assert.strictEqual(state.meta.historicalParticipantRef,HISTORICAL);
  assert.strictEqual(state.meta.oppositionTemplateId,"rogue_genin");
  assert.deepStrictEqual(state.playerSlots,[PLAYER,null,null,null]);
  assert.deepStrictEqual(state.enemySlots,[HISTORICAL,null,null,null]);
  assert(state.playerPL>0,label+" Wasabi entered with zero Battle PL");
  assert.strictEqual(state.enemyPL,23);
  assert.strictEqual(state.enemyMax,23);
  assert.strictEqual(state.config.rewards.ryo,0);
  assert.strictEqual(state.config.rewards.exp,0);
  assert.deepStrictEqual(state.config.rewards.items,[]);
  assert.deepStrictEqual(state.config.rewards.rareDrops,[]);
  assert.deepStrictEqual(state.meta.rewardEntitlement,{ryo:0,exp:0,items:[],rareDrops:[]});
  assert.strictEqual(state.receiptCount,1);
  assert.strictEqual(state.receipt.battleOccurrenceId,state.meta.battleOccurrenceId);
  assert.strictEqual(state.storyVisible,false,label+" Story surface covers active Battle");

  await page.waitForFunction(()=>!!document.querySelector(".battle2-formation-withdraw,.battle-live-withdraw-action"),null,{timeout:8000});
  const withdraw=await page.evaluate(()=>{
    const n=document.querySelector(".battle2-formation-withdraw,.battle-live-withdraw-action");
    return{exists:!!n,disabled:!!n?.disabled,text:n?.textContent?.trim()||""};
  });
  assert.strictEqual(withdraw.exists,true,label+" WITHDRAW control missing");
  assert.strictEqual(withdraw.disabled,true,label+" WITHDRAW must be unavailable in strict 1v1");
  await shotBattle(page,label+"-battle");
  return{state,withdraw,target};
}

async function reloadActiveBattle(page,label,expectedOccurrenceId){
  const before=await page.evaluate(()=>({
    occurrenceId:currentBattle?.wasabiOrigin34300?.battleOccurrenceId||null,
    receiptCount:Object.keys(playerData.wasabiOriginBattle34300?.receipts||{}).length,
    enemyPL:getBattleRemainingPL("enemy","wasabi_origin_rogue_genin_01"),
    playerPL:getBattleRemainingPL("player","academy_izuno")
  }));
  assert.strictEqual(before.occurrenceId,expectedOccurrenceId);
  await page.evaluate(()=>{savePlayerData();saveTestState();return true;});
  await page.reload({waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof getRuntimeBuildFingerprint==="function"&&!!globalThis.SC_ACADEMY_WASABI_BATTLE_34300,null,{timeout:20000});
  assert.deepStrictEqual(await page.evaluate(()=>getRuntimeBuildFingerprint()),BUILD_MANIFEST,label+" reload fingerprint mismatch");
  await page.waitForFunction(()=>!!(currentBattle&&currentBattle.active&&currentBattle.wasabiOrigin34300),null,{timeout:20000});
  await releaseFrontDoor(page);
  await page.evaluate(()=>openOverlay("combat"));
  await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});
  const after=await page.evaluate(()=>({
    occurrenceId:currentBattle.wasabiOrigin34300.battleOccurrenceId,
    battleConfigId:currentBattle.wasabiOrigin34300.battleConfigId,
    receiptCount:Object.keys(playerData.wasabiOriginBattle34300?.receipts||{}).length,
    enemyPL:getBattleRemainingPL("enemy","wasabi_origin_rogue_genin_01"),
    playerPL:getBattleRemainingPL("player","academy_izuno")
  }));
  assert.deepStrictEqual(after,before,label+" active Battle/receipt changed across reload");
  return{before,after};
}

async function finishBattle(page,label,outcome){
  const result=await page.evaluate(({outcome,player,enemy})=>{
    if(outcome==="victory"){
      setBattleRemainingPL("enemy",enemy,0);
      if(getBattleRemainingPL("player",player)<=0)setBattleRemainingPL("player",player,Math.max(1,getBattleMaximumPL("player",player)));
    }else{
      setBattleRemainingPL("player",player,0);
      if(getBattleRemainingPL("enemy",enemy)<=0)setBattleRemainingPL("enemy",enemy,23);
    }
    currentBattle.outcome={type:outcome,completedAt:Date.now(),finishingShinobiId:outcome==="victory"?player:null};
    currentBattle.battleOver=true;
    currentBattle.active=false;
    const projected=projectAcademyWasabiRogueGeninBattleResult34300();
    const resumed=resumeBattleCallerAfterCompletion(outcome);
    return{projected,resumed};
  },{outcome,player:PLAYER,enemy:HISTORICAL});
  assert(result.resumed&&result.resumed.success===true,label+" Battle return failed: "+JSON.stringify(result));
  await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:12000});
  const expected="izu_rogue_step_in_return_1";
  await waitBeat(page,expected);
  const authored=await page.evaluate(()=>JSON.parse(JSON.stringify(getActiveStorySceneRuntime()?.battleResume?.authored||null)));
  assert(authored,label+" authored result missing");
  assert.deepStrictEqual(Object.keys(authored).sort(),[
    "battleOccurrenceId","battleResult","historicalParticipantRef","oppositionTemplateId","rogueGeninBattlePLDepleted","sourceOccurrenceId","wasabiBattlePLDepleted"
  ].sort());
  assert.strictEqual(authored.sourceOccurrenceId,ROGUE_OCC);
  assert.strictEqual(authored.historicalParticipantRef,HISTORICAL);
  assert.strictEqual(authored.oppositionTemplateId,"rogue_genin");
  assert.strictEqual(authored.battleResult,outcome);
  assert.strictEqual(authored.rogueGeninBattlePLDepleted,outcome==="victory");
  assert.strictEqual(authored.wasabiBattlePLDepleted,outcome==="defeat");
  assert(!/injur|morality|custody|death/i.test(JSON.stringify(authored)),label+" result leaked Story consequence semantics");

  const rows=await exactOccurrenceRows(page,ROGUE_OCC);
  assert.strictEqual(rows.length,1,label+" IZU-04 duplicate/missing after Battle return");
  assert.strictEqual(rows[0].fact?.rogueGeninResponse,"intervene");
  assert.strictEqual(rows[0].fact?.rogueGeninInterruptionResolvedByWasabiAction,true);
  assert.deepStrictEqual(rows[0].fact?.battleOccurrenceIds,[authored.battleOccurrenceId]);

  const receipt=await page.evaluate(()=>({
    count:Object.keys(playerData.wasabiOriginBattle34300?.receipts||{}).length,
    ryo:playerData.ryo,
    inventory:JSON.stringify(playerData.inventory||[])
  }));
  assert.strictEqual(receipt.count,1,label+" Battle launch receipt duplicated");
  await page.evaluate(()=>{
    try{renderStoryScenePresentationLayer(document.getElementById("overlay-content-container"));}catch(_){}
    try{renderStoryScenePresentationLayer(document.getElementById("overlay-content-container"));}catch(_){}
    savePlayerData();
  });
  assert.strictEqual((await exactOccurrenceRows(page,ROGUE_OCC)).length,1,label+" rerender duplicated IZU-04");
  return{authored,rows,receipt};
}

async function runNonBattleIntercept(browser){
  const label="non-battle-intercept";
  const {context,page,runtimeErrorGate}=await boot(browser,label);
  try{
    await continueTo(page,"izu_initial_choice");
    await choose(page,"FORGET THE TRAIL — WHERE ARE THEY GOING?");
    await continueTo(page,"izu_split_choice");
    await choose(page,"CUT FOR THE INTERCEPT");
    await continueTo(page,"izu_reflect");
    assert.strictEqual(await page.evaluate(()=>!!(currentBattle&&currentBattle.active)),false,label+" launched Battle");
    const intercept=await exactOccurrenceRows(page,INTERCEPT_OCC);
    assert.strictEqual(intercept.length,1,label+" IZU-02 missing");
    assert.strictEqual(intercept[0].fact?.interceptReachedByPrediction,true);
    assert.strictEqual((await exactOccurrenceRows(page,ROGUE_OCC)).length,0,label+" invented Rogue occurrence");
    await shotStory(page,label+"-reflection");
    const final=await finishOrigin(page,label);
    const errors=await runtimeErrorGate.assertClean(label);
    return{label,intercept,final,errors};
  }finally{await context.close();}
}

async function runHelp(browser){
  const label="call-for-help";
  const {context,page,runtimeErrorGate}=await boot(browser,label);
  try{
    await routeToRogueChoice(page);
    await choose(page,"CALL FOR HELP");
    await continueTo(page,"izu_reflect");
    assert.strictEqual(await page.evaluate(()=>!!(currentBattle&&currentBattle.active)),false,label+" launched Battle");
    const rows=await exactOccurrenceRows(page,ROGUE_OCC);
    assert.strictEqual(rows.length,1,label+" IZU-04 missing/duplicated");
    assert.strictEqual(rows[0].fact?.rogueGeninResponse,"call_for_help");
    assert.strictEqual(rows[0].fact?.rogueGeninInterruptionResolvedByWasabiAction,true);
    assert.deepStrictEqual(rows[0].fact?.battleOccurrenceIds,[]);
    await shotStory(page,label+"-reflection");
    const final=await finishOrigin(page,label);
    const errors=await runtimeErrorGate.assertClean(label);
    return{label,rows,final,errors};
  }finally{await context.close();}
}

async function runPursue(browser){
  const label="keep-pursuing";
  const {context,page,runtimeErrorGate}=await boot(browser,label);
  try{
    await routeToRogueChoice(page);
    await choose(page,"KEEP PURSUING");
    await continueTo(page,"izu_reflect");
    assert.strictEqual(await page.evaluate(()=>!!(currentBattle&&currentBattle.active)),false,label+" launched Battle");
    const rows=await exactOccurrenceRows(page,ROGUE_OCC);
    assert.strictEqual(rows.length,1,label+" Rogue occurrence missing/duplicated");
    assert.strictEqual(rows[0].fact?.rogueGeninResponse,"keep_pursuing");
    assert.strictEqual(rows[0].fact?.rogueGeninInterruptionResolvedByWasabiAction,false);
    assert.deepStrictEqual(rows[0].fact?.battleOccurrenceIds,[]);
    const final=await finishOrigin(page,label);
    const errors=await runtimeErrorGate.assertClean(label);
    return{label,rows,final,errors};
  }finally{await context.close();}
}

async function runStepIn(browser,{outcome,reload=false}){
  const label="step-in-"+outcome+(reload?"-reload":"");
  const {context,page,runtimeErrorGate}=await boot(browser,label);
  try{
    const materialBefore=await page.evaluate(()=>({ryo:playerData.ryo,inventory:JSON.stringify(playerData.inventory||[])}));
    await routeToRogueChoice(page);
    const launched=await launchStepInBattle(page,label);
    let reloadEvidence=null;
    if(reload)reloadEvidence=await reloadActiveBattle(page,label,launched.state.meta.battleOccurrenceId);
    const returned=await finishBattle(page,label,outcome);
    const materialAfter=await page.evaluate(()=>({ryo:playerData.ryo,inventory:JSON.stringify(playerData.inventory||[])}));
    assert.deepStrictEqual(materialAfter,materialBefore,label+" Battle granted standalone material reward");
    await continueTo(page,"izu_reflect");
    await shotStory(page,label+"-reflection");
    const final=await finishOrigin(page,label);
    const rowsAfterCompletion=await exactOccurrenceRows(page,ROGUE_OCC);
    assert.strictEqual(rowsAfterCompletion.length,1,label+" completion duplicated IZU-04");
    const receiptsAfterCompletion=await page.evaluate(()=>Object.keys(playerData.wasabiOriginBattle34300?.receipts||{}).length);
    assert.strictEqual(receiptsAfterCompletion,1,label+" completion duplicated Battle receipt");
    const errors=await runtimeErrorGate.assertClean(label);
    return{label,launched,reloadEvidence,returned,materialBefore,materialAfter,final,errors};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  const results=[];
  try{
    results.push(await runNonBattleIntercept(browser));
    results.push(await runHelp(browser));
    results.push(await runPursue(browser));
    results.push(await runStepIn(browser,{outcome:"victory",reload:true}));
    results.push(await runStepIn(browser,{outcome:"defeat",reload:false}));
    const summary={
      pass:true,issue:343,kind:"installed_browser_wasabi_writing_golden_rogue_battle",
      scenarios:["non_battle_intercept","call_for_help","keep_pursuing","step_in_victory_reload","step_in_defeat"],
      strictOneVsOne:true,rogueGeninBasePL:23,withdrawUnavailable:true,zeroStandaloneBattleReward:true,
      deterministicBattleOccurrenceReload:true,exactIzu04Once:true,originToChronicleBegins:true,browserGoldenClaimed:false
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
