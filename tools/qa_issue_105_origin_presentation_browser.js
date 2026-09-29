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
      speaker:root?.querySelector(".sc-story-name")?.textContent?.trim()||"",
      hint:root?.querySelector(".sc-performance-hint-33900")?.textContent?.trim()||"",
      receiptVisible:root?.dataset.scCueKind==="record",
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
    const text=root?.querySelector(".sc-story-text")?.textContent?.trim()||"";
    return rt?.beatId===expected&&root?.dataset.scSceneBoard==="true"&&root?.dataset.scPerformance==="true"&&text.length>0;
  },beatId,{timeout:15000});
  const after=await snapshot(page);
  assert.strictEqual(after.beatId,beatId,"save/reload resumed a different Story beat");
  assert.strictEqual(after.text,before.text,"save/reload changed the current GOLDEN cue");
  return after;
}

async function proveMiraiBattle338(browser){
  const cases=[
    {beatId:"mir_shortcut_battle",callerId:"academy_mirai_origin_shortcut_battle",returnBeatId:"mir_shortcut_battle_return"},
    {beatId:"mir_confront_battle",callerId:"academy_mirai_origin_confrontation_battle",returnBeatId:"mir_confrontation_battle_return"}
  ];
  const receipts=[];
  for(const test of cases){
    const context=await browser.newContext({viewport:{width:1440,height:900}});
    const page=await context.newPage();
    const gate=await installBrowserRuntimeErrorGate(page);
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>!!globalThis.SC_ACADEMY_MIRAI_DISGUISED_INSTRUCTOR_BATTLE_338&&!!globalThis.SC_ALPHA_ORIGIN_WRITING_GOLDEN_105&&!!globalThis.SC_STORY_SCENE_BOARD_33900,null,{timeout:30000});
    const setup=await page.evaluate(beatId=>{
      const select=selectChronicleOrigin("academy_mirai","issue_105_mirai_338");
      const launch=beginAlphaChronicleOriginPrologue();
      const jump=globalThis.setStorySceneBeat?.(beatId);
      return{select,launch,jump};
    },test.beatId);
    assert.strictEqual(setup.select?.success,true,"Mirai #338 select failed "+JSON.stringify(setup));
    assert.strictEqual(setup.launch?.success,true,"Mirai #338 Story launch failed "+JSON.stringify(setup));
    assert.strictEqual(setup.jump?.success,true,"Mirai #338 test beat unavailable "+JSON.stringify(setup));
    await release(page);
    await page.waitForFunction(beatId=>globalThis.getActiveStorySceneRuntime?.()?.beatId===beatId,test.beatId,{timeout:8000});
    const pre=await snapshot(page);
    assert.strictEqual(pre.mode,"battle_transition","Mirai #338 seam is not a Battle transition");
    assert.strictEqual(pre.primary,"Start PL Battle","Mirai #338 CTA drifted");
    const launched=await page.evaluate(()=>globalThis.launchStorySceneBattle?.());
    assert.strictEqual(launched?.success,true,"Mirai #338 Battle launch failed "+JSON.stringify(launched));
    const state=await page.evaluate(()=> {
      const enemy=typeof getBattleDeploymentParticipant==="function"?getBattleDeploymentParticipant("enemy",1):null;
      const player=typeof getBattleDeploymentParticipant==="function"?getBattleDeploymentParticipant("player",1):null;
      const profile=typeof enemyDatabase==="object"&&enemyDatabase?enemyDatabase.academy_mirai_origin_instructor:null;
      const meta=typeof currentBattle==="object"&&currentBattle?currentBattle.mirai338:null;
      const rc=typeof currentBattle==="object"&&currentBattle?currentBattle.returnContext:null;
      return{
        config:typeof currentBattle==="object"&&currentBattle?currentBattle.battleConfigId||null:null,
        encounter:typeof currentBattle==="object"&&currentBattle?currentBattle.encounterId||null:null,
        playerId:player?.id||null,
        enemyId:enemy?.id||null,
        enemyName:profile?.name||null,
        enemyImage:profile?.image||null,
        enemyPL:profile?.calibratedBasePL??null,
        actionIds:(profile?.authoredBattleActions||[]).map(a=>a.id),
        callerId:meta?.callerId||null,
        observerPresentation:meta?.observerPresentation||null,
        underlyingIdentity:meta?.underlyingIdentity||null,
        identityRevealedByBattle:meta?.identityRevealedByBattle,
        sourceBeatId:rc?.sourceBeatId||null,
        victoryBeatId:rc?.victoryBeatId||null,
        defeatBeatId:rc?.defeatBeatId||null
      };
    });
    assert.strictEqual(state.config,"academy_mirai_origin_disguised_instructor_battle","Mirai #338 config drift");
    assert.strictEqual(state.encounter,"origin_academy_mirai_disguised_instructor_assessment","Mirai #338 encounter drift");
    assert.strictEqual(state.playerId,"academy_mirai","Mirai #338 player deployment drift");
    assert.strictEqual(state.enemyId,"academy_mirai_origin_instructor","Mirai #338 opponent deployment drift");
    assert.strictEqual(state.enemyName,"TRAVELLER","Mirai #338 leaked instructor identity before reveal");
    assert.strictEqual(state.enemyImage,"NPC portrait/mirai_instructor_disguised.png","Mirai #338 Battle portrait drift");
    assert.strictEqual(state.enemyPL,16,"Mirai #338 opponent PL drift");
    assert.deepStrictEqual(state.actionIds,["academy_mirai_instructor_testing_strike","academy_mirai_instructor_substitution_guard","academy_mirai_instructor_turning_sweep"],"Mirai #338 action loop drift");
    assert.strictEqual(state.callerId,test.callerId,"Mirai #338 caller identity drift");
    assert.strictEqual(state.observerPresentation,"male_traveller_escort_disguise","Mirai #338 disguise presentation drift");
    assert.strictEqual(state.underlyingIdentity,"female_academy_instructor","Mirai #338 underlying identity drift");
    assert.strictEqual(state.identityRevealedByBattle,false,"Mirai #338 Battle revealed hidden identity");
    assert.strictEqual(state.sourceBeatId,test.beatId,"Mirai #338 return source drift");
    assert.strictEqual(state.victoryBeatId,test.returnBeatId,"Mirai #338 victory return drift");
    assert.strictEqual(state.defeatBeatId,test.returnBeatId,"Mirai #338 defeat return drift");
    await gate.assertClean("academy_mirai-338-"+test.beatId);
    receipts.push({beatId:test.beatId,callerId:state.callerId,returnBeatId:test.returnBeatId});
    await context.close();
  }
  return{cases:receipts,strictOneVsOne:true,observerSafeDisguise:true};
}


async function proveMiraiDefeatContinuations(browser){
  const cases=[
    {kind:"shortcut",returnBeatId:"mir_shortcut_battle_return",firstBeatId:"mir_shortcut_defeat_01",callerId:"academy_mirai_origin_shortcut_battle"},
    {kind:"confrontation",returnBeatId:"mir_confrontation_battle_return",firstBeatId:"mir_confrontation_defeat_01",callerId:"academy_mirai_origin_confrontation_battle"}
  ];
  const proofs=[];
  for(const test of cases){
    const context=await browser.newContext({viewport:{width:1440,height:900}});
    const page=await context.newPage();
    const gate=await installBrowserRuntimeErrorGate(page);
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>!!globalThis.SC_ALPHA_ORIGIN_WRITING_GOLDEN_105&&!!globalThis.SC_STORY_MACHINE_RESOLVER_343&&!!globalThis.SC_STORY_SCENE_BOARD_33900,null,{timeout:30000});
    const setup=await page.evaluate(spec=>{
      const select=selectChronicleOrigin("academy_mirai","issue_105_mirai_defeat_continuation");
      const launch=beginAlphaChronicleOriginPrologue();
      const rt=globalThis.getActiveStorySceneRuntime?.();
      if(rt){
        rt.localContext=rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};
        if(spec.kind==="shortcut")rt.localContext.mirTalked=true;
        rt.battleResume={authored:{
          battleResult:"defeat",
          callerId:spec.callerId,
          miraiBattlePLDepleted:true,
          instructorBattlePLDepleted:false,
          identityRevealedByBattle:false
        }};
      }
      const jump=globalThis.setStorySceneBeat?.(spec.returnBeatId);
      return{select,launch,jump,beatId:globalThis.getActiveStorySceneRuntime?.()?.beatId||null};
    },test);
    assert.strictEqual(setup.select?.success,true,"Mirai defeat proof select failed "+JSON.stringify(setup));
    assert.strictEqual(setup.launch?.success,true,"Mirai defeat proof launch failed "+JSON.stringify(setup));
    assert.strictEqual(setup.jump?.success,true,"Mirai defeat return resolver failed "+JSON.stringify(setup));
    await release(page);
    await page.waitForFunction(expected=>globalThis.getActiveStorySceneRuntime?.()?.beatId===expected,test.firstBeatId,{timeout:8000});
    let row=await snapshot(page);
    assert.strictEqual(row.beatId,test.firstBeatId,"Mirai defeat did not enter authored cutscene");
    if(test.kind==="shortcut"){
      assert(row.text.includes("Mirai's footing gives first."),"Mirai shortcut defeat opening drift");
      const enough=await advanceUntilBeat(page,"mir_shortcut_defeat_02",8);
      assert.strictEqual(enough.row.speaker,"TRAVELLER","Shortcut defeat Traveller does not own Enough.");
      assert.strictEqual(enough.row.text,"Enough.","Shortcut defeat Enough. drift");
      const why=await advanceUntilBeat(page,"mir_shortcut_defeat_04",8);
      assert.strictEqual(why.row.speaker,"MIRAI","Shortcut defeat Mirai does not own question");
      assert.strictEqual(why.row.text,"Why did you stop?","Shortcut defeat question drift");
      const because=await advanceOne(page);
      assert.strictEqual(because.beatId,"mir_shortcut_defeat_05","Shortcut defeat reply routing drift");
      assert.strictEqual(because.speaker,"TRAVELLER","Shortcut defeat Traveller does not own reply");
      assert.strictEqual(because.text,"Because you did.","Shortcut defeat reply drift");
      const post=await advanceUntilBeat(page,"mir_road_post_defeat_talk_01",20);
      assert(post.row.text.includes("Mirai keeps the Traveller in front of her now."),"Shortcut defeat post-Battle Scene 5 variant missing");
      assert(!post.seen.some(x=>/Academy instructor stands where the traveller had been/i.test(x.text||"")),"Shortcut defeat revealed the instructor identity");
      proofs.push({kind:test.kind,first:test.firstBeatId,postBeat:post.row.beatId,identityRevealBeforeResume:false});
    }else{
      assert(row.text.includes("Mirai's guard breaks before the Traveller's does."),"Mirai confrontation defeat opening drift");
      const done=await advanceUntilBeat(page,"mir_confrontation_defeat_03",8);
      assert.strictEqual(done.row.speaker,"TRAVELLER","Confrontation defeat Traveller does not own Done?");
      assert.strictEqual(done.row.text,"Done?","Confrontation defeat Done? drift");
      const no=await advanceOne(page);
      assert.strictEqual(no.beatId,"mir_confrontation_defeat_04","Confrontation defeat No. routing drift");
      assert.strictEqual(no.speaker,"MIRAI","Confrontation defeat Mirai does not own No.");
      assert(no.text.startsWith("No."),"Confrontation defeat No. drift");
      const keep=await advanceUntilBeat(page,"mir_confrontation_defeat_06",8);
      assert.strictEqual(keep.row.text,"I can keep asking.","Confrontation defeat persistence line drift");
      const good=await advanceUntilBeat(page,"mir_confrontation_defeat_08",8);
      assert.strictEqual(good.row.speaker,"TRAVELLER","Confrontation defeat Traveller does not own Good.");
      assert.strictEqual(good.row.text,"Good.","Confrontation defeat Good. drift");
      const reveal=await advanceOne(page);
      assert.strictEqual(reveal.beatId,"mir_confront_reveal_01","Confrontation defeat did not enter existing reveal after cutscene");
      assert(reveal.text.includes("Smoke bursts across the road."),"Confrontation defeat reveal timing drift");
      assert(reveal.actors.some(a=>a.image==="NPC/mirai_instructor.png"),"Female Academy instructor card missing after confrontation defeat reveal");
      const where=await advanceOne(page);
      assert.strictEqual(where.beatId,"mir_confront_08","Confrontation defeat reveal did not resume existing flow");
      assert.strictEqual(where.speaker,"MIRAI","Mirai does not own post-reveal question");
      assert.strictEqual(where.text,"Where is he?","Post-reveal Mirai question drift");
      proofs.push({kind:test.kind,first:test.firstBeatId,revealBeat:reveal.beatId,whereBeat:where.beatId});
    }
    await gate.assertClean("academy_mirai-defeat-"+test.kind);
    await context.close();
  }
  return{cases:proofs,battleDefeatIsMissionFailure:false,browserGoldenClaimed:false};
}

async function proveMiraiTerminalReceipt(browser){
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!globalThis.SC_ALPHA_ORIGIN_SCENE_BOARD_BINDINGS_105&&!!globalThis.SC_STORY_SCENE_BOARD_33900&&!!globalThis.SC_ALPHA_ORIGIN_32900,null,{timeout:30000});
  const start=await page.evaluate(()=>({select:selectChronicleOrigin("academy_mirai","issue_105_mirai_terminal_receipt"),launch:beginAlphaChronicleOriginPrologue()}));
  assert.strictEqual(start.select?.success,true,"Mirai terminal proof select failed");
  assert.strictEqual(start.launch?.success,true,"Mirai terminal proof launch failed");
  await release(page);
  const seen=[];
  let receipt=null;
  for(let i=0;i<520;i++){
    const row=await snapshot(page);
    seen.push({beatId:row.beatId,mode:row.mode,text:row.text,choices:row.choices});
    const body=(await page.locator("body").innerText()).trim();
    assert(!body.includes("#338"),"Mirai exposed GitHub issue #338 to the player at "+row.beatId);
    assert(!/Combat package/i.test(body),"Mirai exposed internal Combat-package text at "+row.beatId);
    assert(!row.choices.some(label=>label==="CONTINUE"),"Mirai exposed redundant CONTINUE choice at "+row.beatId+" "+JSON.stringify(row.choices));
    if(row.beatId==="mir_receipt"){receipt=row;break;}
    if(row.mode==="choice"){
      const enabled=page.locator("#story-scene-presentation-layer .sc-story-choice:not(:disabled)");
      const count=await enabled.count();
      assert(count>0,"Mirai route has no enabled authored choice at "+row.beatId);
      let selected=enabled.first();
      if(row.choices.includes("STAY ON THE ROUTE"))selected=enabled.filter({hasText:"STAY ON THE ROUTE"}).first();
      if(row.beatId==="mir_decision_choice")selected=enabled.filter({hasText:"ESCORT HIM THE REST OF THE WAY"}).first();
      const before=row.beatId;
      await selected.click();
      await page.waitForFunction(old=>globalThis.getActiveStorySceneRuntime?.()?.beatId!==old,before,{timeout:8000});
    }else{
      await advanceOne(page);
    }
  }
  assert(receipt,"Mirai did not reach Origin Chronicle Receipt");
  assert.strictEqual(receipt.cueKind,"record","Mirai Receipt is not a record cue");
  assert(receipt.text.includes("ACADEMY MIRAI")&&receipt.text.includes("REWARDS"),"Mirai Receipt content missing identity/reward summary");
  assert.strictEqual(receipt.primary,"CONTINUE","Mirai Receipt dedicated button missing");
  assert.strictEqual(receipt.hint,"USE CONTINUE TO CONFIRM","Mirai Receipt still instructs click-anywhere");
  const beforeReceipt=await snapshot(page);
  const stage=page.locator("#story-scene-presentation-layer .sc-chronicle-stage,#story-scene-presentation-layer .sc-story-stage").first();
  await stage.click({position:{x:28,y:28}});
  await page.waitForTimeout(180);
  const afterStage=await snapshot(page);
  assert.strictEqual(afterStage.beatId,"mir_receipt","stage click skipped Mirai Receipt");
  assert.strictEqual(afterStage.text,beforeReceipt.text,"stage click mutated Mirai Receipt");
  await page.evaluate(()=>{
    const prior=globalThis.advanceStoryScene;
    globalThis.__issue105ReceiptAdvanceCount=0;
    globalThis.__issue105ReceiptAdvancePrior=prior;
    globalThis.advanceStoryScene=function issue105ReceiptAdvanceProbe(){
      globalThis.__issue105ReceiptAdvanceCount++;
      return prior.apply(this,arguments);
    };
    try{advanceStoryScene=globalThis.advanceStoryScene;}catch(_error){}
  });
  const button=page.locator("#story-scene-presentation-layer .sc-chronicle-primary").first();
  await button.click();
  await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId!=="mir_receipt",null,{timeout:8000});
  const completion=await page.evaluate(()=>({
    active:globalThis.getActiveStorySceneRuntime?.()?.beatId||null,
    semanticAdvanceCount:Number(globalThis.__issue105ReceiptAdvanceCount)||0
  }));
  assert.notStrictEqual(completion.active,"mir_receipt","Receipt button failed to advance");
  assert.strictEqual(completion.semanticAdvanceCount,1,"Receipt button did not invoke exactly one semantic Story advance");
  await page.locator("body").screenshot({path:path.join(OUT,"academy_mirai-terminal-receipt.png")});
  await gate.assertClean("academy_mirai-terminal-receipt");
  await context.close();
  return{seenCount:seen.length,receiptStageLocked:true,receiptButtonSingleCompletion:true,noInternal338:true,noDuplicateContinue:true};
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
        const nineTails=await page.evaluate(()=>{
          const rt=globalThis.getActiveStorySceneRuntime?.();
          if(!rt.localContext||typeof rt.localContext!=="object")rt.localContext={};
          return globalThis.setStorySceneBeat?.("menma_fox_02");
        });
        assert.strictEqual(nineTails?.success,true,"Menma Nine-Tails test beat could not be entered");
        await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId==="menma_fox_02"&&document.getElementById("story-scene-presentation-layer")?.dataset.scCueKind==="dialogue",null,{timeout:8000});
        row=await snapshot(page);
        assert.strictEqual(row.cueKind,"dialogue","Nine-Tails spoken line rendered as narration");
        assert.strictEqual(row.speaker,"NINE-TAILS","Nine-Tails did not own its dialogue box");
        const fox=row.actors.find(a=>a.id==="menma_nine_tails");
        assert(fox&&fox.image==="Assets/Tailed Beasts/menma_nine_tails.png","Menma Nine-Tails exact portrait missing "+JSON.stringify(row.actors));
        assert(!row.text.includes("SOURCE"),"internal SOURCE label leaked into Nine-Tails dialogue");

        await page.evaluate(()=>{
          const rt=globalThis.getActiveStorySceneRuntime?.();
          rt.battleResume={authored:{performanceBucket:"low",observedKinjutsu:false}};
          globalThis.setStorySceneBeat?.("menma_after_04a");
        });
        const low=await advanceUntilBeat(page,"menma_after_low_02",30);
        row=low.row;
        assert.strictEqual(row.cueKind,"dialogue","Menma low-performance aftermath did not segment to dialogue");
        assert.strictEqual(row.speaker,"MENMA","Menma did not own “We won.”");
        assert.strictEqual(row.text,"We won.","Menma aftermath prose drift");
        row=await advanceOne(page);
        assert.strictEqual(row.speaker,"ANKO","Anko did not own her post-Battle reply");
        assert.strictEqual(row.text,"Yeah.","Anko aftermath prose drift");
        assert(!row.text.includes("MENMA:")&&!row.text.includes("ANKO:")&&!row.text.includes("SOURCE"),"post-Battle raw speaker/source text leaked");

        await page.evaluate(()=>{
          const rt=globalThis.getActiveStorySceneRuntime?.();
          rt.battleResume={authored:{performanceBucket:"standard",observedKinjutsu:false}};
          globalThis.setStorySceneBeat?.("menma_part_07");
        });
        const parting=await advanceUntilBeat(page,"menma_part_standard_01",20);
        row=parting.row;
        assert.strictEqual(row.speaker,"ANKO","Menma parting router did not select Anko dialogue");
        assert.strictEqual(row.text,"Try not to find another disaster before you get home.","Menma standard parting prose drift");

        await page.evaluate(()=>globalThis.setStorySceneBeat?.("menma_close_01"));
        await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId==="menma_close_01",null,{timeout:8000});
        row=await snapshot(page);
        assert(row.text.includes("Menma runs toward Konoha."),"Menma final GOLDEN prose is not visible");
      }else if(row.mode!=="choice"){
        row=await advanceOne(page);
      }
      await page.locator("#story-scene-presentation-layer").screenshot({path:path.join(OUT,variant+".png")});
      await gate.assertClean(variant);
      await context.close();
    }
    const miraiBattle338=await proveMiraiBattle338(browser);
    const miraiDefeatContinuations=await proveMiraiDefeatContinuations(browser);
    const miraiTerminal=await proveMiraiTerminalReceipt(browser);
    console.log(JSON.stringify({pass:true,issue:105,cases:CASES.map(x=>x[0]),legacyFallbackRejected:true,clickAnywhereProven:true,miraiWritingGoldenProven:true,miraiBattle338,miraiDefeatContinuations,menmaWritingGoldenOpeningProven:true,menmaNineTailsDialoguePortraitProven:true,menmaPostBattleSegmentationProven:true,miraiTerminal,goldenSaveReloadResumeProven:true,browserGoldenClaimed:false},null,2));
  }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exit(1);});