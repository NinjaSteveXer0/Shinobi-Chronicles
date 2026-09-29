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
    {
      kind:"shortcut",
      startBeatId:"mir_shortcut_battle_pre_01",
      battleBeatId:"mir_shortcut_battle",
      callerId:"academy_mirai_origin_shortcut_battle",
      victoryBeatId:"mir_shortcut_victory_01",
      defeatBeatId:"mir_shortcut_defeat_end_01"
    },
    {
      kind:"confrontation",
      startBeatId:"mir_confront_battle",
      battleBeatId:"mir_confront_battle",
      callerId:"academy_mirai_origin_confrontation_battle",
      victoryBeatId:"mir_confront_reveal_01",
      defeatBeatId:"mir_confront_defeat_end_01"
    }
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
      const rt=globalThis.getActiveStorySceneRuntime?.();
      if(rt&&String(beatId).startsWith("mir_shortcut_")){
        rt.localContext=rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};
        rt.localContext.mirTalked=true;
        rt.localContext.mirShortcut="follow";
      }
      const jump=globalThis.setStorySceneBeat?.(beatId);
      return{select,launch,jump};
    },test.startBeatId);
    assert.strictEqual(setup.select?.success,true,"Mirai #338 select failed "+JSON.stringify(setup));
    assert.strictEqual(setup.launch?.success,true,"Mirai #338 Story launch failed "+JSON.stringify(setup));
    assert.strictEqual(setup.jump?.success,true,"Mirai #338 test beat unavailable "+JSON.stringify(setup));
    await release(page);

    if(test.kind==="shortcut"){
      const buildup=await advanceUntilBeat(page,test.battleBeatId,100);
      const buildupText=buildup.seen.map(x=>x.text).join("\n");
      for(const line of [
        "Because you followed me.",
        "Your instructor gave me one extra job.",
        "See what you do if the person you're escorting stops cooperating.",
        "This is part of the assessment.",
        "Then stop me."
      ])assert(buildupText.includes(line),"Mirai shortcut pre-Battle causality line missing: "+line);
    }
    await page.waitForFunction(beatId=>globalThis.getActiveStorySceneRuntime?.()?.beatId===beatId,test.battleBeatId,{timeout:8000});
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
        config:currentBattle?.battleConfigId||null,
        encounter:currentBattle?.encounterId||null,
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
    assert.strictEqual(state.sourceBeatId,test.battleBeatId,"Mirai #338 return source drift");
    assert.strictEqual(state.victoryBeatId,test.victoryBeatId,"Mirai #338 victory direct return drift");
    assert.strictEqual(state.defeatBeatId,test.defeatBeatId,"Mirai #338 defeat direct return drift");

    if(test.kind==="shortcut"){
      const rewardPresentation=await page.evaluate(()=>{
        currentBattle.outcome={type:"victory"};
        currentBattle.rewards={
          generated:true,claimed:false,ryo:50,exp:0,items:[],rareDrops:[],
          mirai338FixedReward:true,
          requiresExplicitPostClaimContinue:false
        };
        const host=document.createElement("div");
        host.innerHTML='<span class="victory-ryo-number">50</span><span class="victory-exp-number">0</span>';
        const result=globalThis.runVictoryRevealAnimations?.(host,currentBattle.rewards);
        return{
          result,
          ryo:host.querySelector(".victory-ryo-number")?.textContent||"",
          animated:host.querySelector(".victory-ryo-number")?.dataset.rewardAnimated||""
        };
      });
      assert.strictEqual(rewardPresentation.ryo,"50","Mirai Victory Ryō did not remain static at 50");
      assert.strictEqual(rewardPresentation.animated,"false","Mirai Victory Ryō still advertises animation");
      assert.strictEqual(rewardPresentation.result?.animated,false,"Mirai Victory reveal still animates fixed 50 Ryō");

      await page.evaluate(beatId=>globalThis.setStorySceneBeat?.(beatId),test.victoryBeatId);
      await release(page);
      const winReturn=await snapshot(page);
      assert.strictEqual(winReturn.beatId,"mir_shortcut_victory_01","Mirai shortcut victory did not enter authored post-Battle Story directly");
      assert.strictEqual(winReturn.text,"The Traveller is the first to lower his guard.","Mirai shortcut victory continuity opening drift");
      assert.notStrictEqual(winReturn.primary,"CONTINUE","Mirai win still exposes redundant post-Battle CONTINUE");
      const road=await advanceUntilBeat(page,"mir_road_talk_memory_01",100);
      const postBattleText=road.seen.map(x=>x.text).join("\n");
      assert(postBattleText.includes("We're done with your route.")&&postBattleText.includes("The escort continues."),"Mirai shortcut victory bridge missing");
      assert(!postBattleText.includes("No attack comes."),"Mirai shortcut victory still denies the Battle with 'No attack comes.'");
    }

    await gate.assertClean("academy_mirai-338-"+test.kind);
    receipts.push({kind:test.kind,callerId:state.callerId,victoryBeatId:test.victoryBeatId,defeatBeatId:test.defeatBeatId});
    await context.close();
  }
  return{cases:receipts,strictOneVsOne:true,observerSafeDisguise:true,staticRyo50:true,directPostBattleReturns:true,shortcutBuildup:true};
}


async function proveMiraiDefeatContinuations(browser){
  const cases=[
    {
      kind:"shortcut",
      firstBeatId:"mir_shortcut_defeat_end_01",
      lastBattleLocationBeatId:"mir_shortcut_defeat_end_13",
      debriefBeatId:"mir_defeat_debrief_shortcut_01",
      reflectionBeatId:"mir_defeat_reflection_shortcut",
      callerId:"academy_mirai_origin_shortcut_battle"
    },
    {
      kind:"confrontation",
      firstBeatId:"mir_confront_defeat_end_01",
      lastBattleLocationBeatId:"mir_confront_defeat_end_12",
      debriefBeatId:"mir_defeat_debrief_confront_01",
      reflectionBeatId:"mir_defeat_reflection_confront",
      callerId:"academy_mirai_origin_confrontation_battle"
    }
  ];
  const proofs=[];
  for(const test of cases){
    const context=await browser.newContext({viewport:{width:1440,height:900}});
    const page=await context.newPage();
    const gate=await installBrowserRuntimeErrorGate(page);
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>!!globalThis.SC_ALPHA_ORIGIN_WRITING_GOLDEN_105&&!!globalThis.SC_STORY_MACHINE_RESOLVER_343&&!!globalThis.SC_STORY_SCENE_BOARD_33900,null,{timeout:30000});
    const setup=await page.evaluate(spec=>{
      const select=selectChronicleOrigin("academy_mirai","issue_105_mirai_defeat_termination");
      const launch=beginAlphaChronicleOriginPrologue();
      const rt=globalThis.getActiveStorySceneRuntime?.();
      if(rt){
        rt.localContext=rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};
        if(spec.kind==="shortcut"){
          rt.localContext.mirTalked=true;
          rt.localContext.mirShortcut="follow";
        }else{
          rt.localContext.mirConfronted=true;
        }
        rt.battleResume={authored:{
          battleResult:"defeat",
          callerId:spec.callerId,
          miraiBattlePLDepleted:true,
          instructorBattlePLDepleted:false,
          identityRevealedByBattle:false
        }};
      }
      const jump=globalThis.setStorySceneBeat?.(spec.firstBeatId);
      const after=globalThis.getActiveStorySceneRuntime?.();
      const occ=globalThis.SC_ALPHA_ORIGIN_32900?.findOccurrence?.("occ_origin_mirai_checkpoint_escort_resolution")||null;
      return{
        select,launch,jump,
        beatId:after?.beatId||null,
        local:{...(after?.localContext||{})},
        occurrence:occ&&occ.fact?{...occ.fact}:null
      };
    },test);
    assert.strictEqual(setup.select?.success,true,"Mirai defeat proof select failed "+JSON.stringify(setup));
    assert.strictEqual(setup.launch?.success,true,"Mirai defeat proof launch failed "+JSON.stringify(setup));
    assert.strictEqual(setup.jump?.success,true,"Mirai direct defeat Story return failed "+JSON.stringify(setup));
    assert.strictEqual(setup.beatId,test.firstBeatId,"Mirai defeat did not land directly on authored defeat Story "+JSON.stringify(setup));
    assert.strictEqual(setup.local.miraiEscortAssessmentResult,"not_completed_battle_defeat","Mirai defeat did not record assessment failure");
    assert.strictEqual(setup.local.miraiEscortDutyActive,false,"Mirai defeat left escort duty active");
    assert.strictEqual(setup.local.miraiReachedCheckpointAsActiveEscort,false,"Mirai defeat falsely records active-escort checkpoint arrival");
    assert.strictEqual(setup.local.scenePurpose,"post_assessment_debrief","Mirai defeat did not reserve Checkpoint Three for debrief");
    if(setup.occurrence){
      assert.strictEqual(setup.occurrence.miraiEscortAssessmentResult,"not_completed_battle_defeat","Mirai defeat Chronicle fact drift");
      assert.strictEqual(setup.occurrence.personTravellingWithMiraiReachedCheckpointProtected,false,"Mirai defeat falsely committed protected checkpoint success");
    }

    await release(page);
    const releasedBeatId=await page.evaluate(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId||null);
    assert.strictEqual(releasedBeatId,test.firstBeatId,"Mirai defeat beat changed during presentation release "+JSON.stringify({setup,releasedBeatId}));
    let row=await snapshot(page);
    assert.strictEqual(row.beatId,test.firstBeatId,"Mirai defeat did not enter authored assessment-termination cutscene");
    assert.notStrictEqual(row.primary,"CONTINUE","Mirai loss still exposes redundant post-Battle CONTINUE");

    if(test.kind==="shortcut"){
      assert.strictEqual(row.text,"Mirai's guard gives first.","Mirai shortcut defeat opening drift");
      const enough=await advanceUntilBeat(page,"mir_shortcut_defeat_end_02",10);
      assert.strictEqual(enough.row.speaker,"TRAVELLER","Shortcut defeat Traveller does not own Enough.");
      assert.strictEqual(enough.row.text,"Enough.","Shortcut defeat Enough. drift");
      const notDone=await advanceUntilBeat(page,"mir_shortcut_defeat_end_04",14);
      assert.strictEqual(notDone.row.speaker,"MIRAI","Shortcut defeat Mirai does not own persistence line");
      assert.strictEqual(notDone.row.text,"I'm not done.","Shortcut defeat persistence line drift");
      const exercise=await advanceUntilBeat(page,"mir_shortcut_defeat_end_05",8);
      assert.strictEqual(exercise.row.speaker,"TRAVELLER","Shortcut defeat Traveller does not end the exercise");
      assert.strictEqual(exercise.row.text,"The exercise is.","Shortcut defeat assessment termination line drift");
      const smoke=await advanceUntilBeat(page,"mir_shortcut_defeat_end_06",10);
      assert(!smoke.row.actors.some(a=>a.image==="NPC/mirai_instructor.png"),"Shortcut defeat revealed instructor before Story smoke/reveal beat");
      const reveal=await advanceUntilBeat(page,"mir_shortcut_defeat_end_07",10);
      assert(reveal.row.actors.some(a=>a.image==="NPC/mirai_instructor.png"),"Shortcut defeat Story reveal did not project female instructor");
      const safe=await advanceUntilBeat(page,"mir_shortcut_defeat_end_09",10);
      assert.strictEqual(safe.row.speaker,"ACADEMY INSTRUCTOR","Shortcut defeat safe confirmation not instructor-owned");
      assert.strictEqual(safe.row.text,"Checkpoint Three. Safe.","Shortcut defeat safe confirmation drift");
      const ended=await advanceUntilBeat(page,"mir_shortcut_defeat_end_10",10);
      const endedPages=[ended.row.text];
      for(let i=0;i<8&&(await snapshot(page)).beatId==="mir_shortcut_defeat_end_10";i++){
        const next=await advanceOne(page);
        if(next.beatId==="mir_shortcut_defeat_end_10")endedPages.push(next.text);
      }
      assert(endedPages.includes("The assignment is not.")&&endedPages.includes("It ended here."),"Shortcut defeat does not state that the assignment ended at the Battle location "+JSON.stringify(endedPages));
    }else{
      assert.strictEqual(row.text,"Mirai's guard breaks before the Traveller's does.","Mirai confrontation defeat opening drift");
      const done=await advanceUntilBeat(page,"mir_confront_defeat_end_02",10);
      assert.strictEqual(done.row.speaker,"TRAVELLER","Confrontation defeat Traveller does not own Done?");
      assert.strictEqual(done.row.text,"Done?","Confrontation defeat Done? drift");
      const no=await advanceUntilBeat(page,"mir_confront_defeat_end_03",8);
      assert.strictEqual(no.row.speaker,"MIRAI","Confrontation defeat Mirai does not own No.");
      assert.strictEqual(no.row.text,"No.","Confrontation defeat No. drift");
      const keep=await advanceUntilBeat(page,"mir_confront_defeat_end_05",10);
      assert.strictEqual(keep.row.text,"I can keep asking.","Confrontation defeat persistence line drift");
      const good=await advanceUntilBeat(page,"mir_confront_defeat_end_07",10);
      assert.strictEqual(good.row.speaker,"TRAVELLER","Confrontation defeat Traveller does not own Good.");
      assert.strictEqual(good.row.text,"Good.","Confrontation defeat Good. drift");
      const reveal=await advanceUntilBeat(page,"mir_confront_defeat_end_08",10);
      assert(reveal.row.actors.some(a=>a.image==="NPC/mirai_instructor.png"),"Confrontation defeat Story reveal did not project female instructor");
      const safe=await advanceUntilBeat(page,"mir_confront_defeat_end_10",10);
      assert.strictEqual(safe.row.text,"Checkpoint Three. Safe.","Confrontation defeat safe confirmation drift");
      const distinction=await advanceUntilBeat(page,"mir_confront_defeat_end_12",10);
      assert.strictEqual(distinction.row.speaker,"ACADEMY INSTRUCTOR","Confrontation defeat result distinction not instructor-owned");
      assert.strictEqual(distinction.row.text,"About the switch.","Confrontation defeat first result distinction drift");
    }

    const atLast=await advanceUntilBeat(page,test.lastBattleLocationBeatId,24);
    assert.strictEqual(atLast.row.backdrop,test.kind==="shortcut"
      ?"Mirai Origin Backdrop/konoha_storehouse_side_lane.png"
      :"Mirai Origin Backdrop/konoha_main_street.png","Mirai defeat changed backdrop before assessment-termination scene finished");

    while((await snapshot(page)).beatId===test.lastBattleLocationBeatId){
      await advanceOne(page);
    }
    const transition=await page.evaluate(()=>globalThis.getStoryHardSceneTransitionState33900?.()||null);
    assert(transition&&transition.reason==="scene_board_authored_hard_cut","Mirai defeat did not invoke shared black wipe");
    assert.strictEqual(transition.toBeatId,test.debriefBeatId,"Mirai defeat black wipe did not target the later Checkpoint Three debrief");
    await page.waitForFunction(()=>!globalThis.getStoryHardSceneTransitionState33900?.().active,null,{timeout:3000});

    row=await snapshot(page);
    assert.strictEqual(row.beatId,test.debriefBeatId,"Mirai defeat did not route directly to later Checkpoint Three debrief");
    assert.strictEqual(row.text,"LATER — CHECKPOINT THREE","Mirai defeat missing explicit LATER — CHECKPOINT THREE transition card");
    assert.strictEqual(row.backdrop,"Mirai Origin Backdrop/checkpoint_three_day.png","Mirai defeat debrief backdrop drift");
    assert(row.actors.some(a=>a.image==="NPC/mirai_instructor.png"),"Mirai defeat debrief missing female instructor");
    assert(row.actors.some(a=>a.image==="NPC/traveller.png"),"Mirai defeat debrief missing real Traveller");

    const reflection=await advanceUntilBeat(page,test.reflectionBeatId,80);
    assert.strictEqual(reflection.row.mode,"choice","Mirai defeat did not reach route-specific reflection");
    assert.strictEqual(reflection.row.choices.length,4,"Mirai defeat reflection does not contain four authored interpretations");
    const firstChoice=page.locator("#story-scene-presentation-layer .sc-story-choice:not(:disabled)").first();
    await firstChoice.click();
    await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId==="mir_defeat_close_01",null,{timeout:8000});
    const receipt=await advanceUntilBeat(page,"mir_receipt",60);
    assert.strictEqual(receipt.row.cueKind,"record","Mirai defeat did not reach Chronicle Receipt");
    assert(receipt.row.text.includes("The escort assessment ended where Mirai was Battle-depleted."),"Mirai defeat Receipt does not record assessment termination");
    assert(receipt.row.text.includes("post-assessment debrief"),"Mirai defeat Receipt does not distinguish later Checkpoint Three debrief");
    assert(!receipt.row.text.includes("Completed the Academy escort assessment."),"Mirai defeat Receipt falsely claims normal escort completion");

    const forbidden=reflection.seen.map(x=>x.beatId);
    assert(!forbidden.some(id=>String(id).startsWith("mir_road_post_defeat_")),"Mirai defeat resumed retired Scene 5 road flow");
    assert(!forbidden.includes("mir_checkpoint_missed_01"),"Mirai defeat entered normal checkpoint-success flow");
    const finalState=await page.evaluate(()=>({
      local:{...(globalThis.getActiveStorySceneRuntime?.()?.localContext||{})},
      battle:{...(globalThis.getActiveStorySceneRuntime?.()?.battleResume?.authored||{})}
    }));
    assert.strictEqual(finalState.local.miraiEscortDutyActive,false,"Mirai defeat reactivated escort duty");
    assert.strictEqual(finalState.local.miraiReachedCheckpointAsActiveEscort,false,"Mirai defeat later debrief mutated into active escort arrival");
    assert.strictEqual(finalState.battle.identityRevealedByBattle,false,"Mirai Battle engine improperly revealed instructor identity");

    proofs.push({
      kind:test.kind,
      first:test.firstBeatId,
      assessmentResult:finalState.local.miraiEscortAssessmentResult,
      blackWipe:true,
      debrief:test.debriefBeatId,
      reflection:test.reflectionBeatId,
      receipt:true,
      resumedEscort:false
    });
    await gate.assertClean("academy_mirai-defeat-"+test.kind);
    await context.close();
  }
  return{cases:proofs,battleDefeatIsMissionFailure:false,escortAssessmentEndsOnDefeat:true,browserGoldenClaimed:false};
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
      }else if(variant==="academy_kurenai"){
        assert.strictEqual(row.beatId,"kur_pre_01","Kurenai did not start at expanded After Class opening");
        assert(row.text.includes("Most of the Academy has already emptied out."),"Kurenai expanded opening prose missing "+JSON.stringify(row));
        const instructor=row.actors.find(a=>a.id==="kurenai_academy_instructor");
        assert(instructor&&instructor.image==="NPC/kurenai_instructor.png","Kurenai female instructor card missing "+JSON.stringify(row.actors));
        const opening=await advanceUntilBeat(page,"kur_approach",80);
        row=opening.row;
        assert.deepStrictEqual(row.choices,["SEND A FALSE KURENAI","HIDE MY REAL MOVEMENT","DISTORT HER SENSE OF DISTANCE","MAKE THE DIRECT APPROACH LOOK REAL"],"Kurenai single meaningful Bell choice drift");
        const direct=page.locator("#story-scene-presentation-layer .sc-story-choice").filter({hasText:"MAKE THE DIRECT APPROACH LOOK REAL"}).first();
        await direct.click();
        await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId==="kur_complete_01",null,{timeout:8000});
        const aftermath=await advanceUntilBeat(page,"kur_after_win_01",120);
        const coreText=aftermath.seen.map(x=>x.text).join("\n");
        for(const line of ["Got you.","Have you?","You were saying?","Genjutsu isn't only making somebody believe something false.","It's knowing what stays true after both of you start lying."]){
          assert(coreText.includes(line),"Kurenai preserved Bell Test/evaluation line missing: "+line);
        }
        const leave=await advanceUntilBeat(page,"kur_leave_win_01",100);
        const leaveText=leave.seen.map(x=>x.text).join("\n");
        assert(leaveText.includes("Same exercise tomorrow?"),"Kurenai complete-win aftermath expansion missing");
        const receipt=await advanceUntilBeat(page,"kur_receipt",80);
        const terminalText=receipt.seen.map(x=>x.text).join("\n");
        assert(terminalText.includes("Change the trick."),"Kurenai complete-win leaving expansion missing");
        await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId==="kur_receipt"&&document.getElementById("story-scene-presentation-layer")?.dataset.scCueKind==="record",null,{timeout:8000});
        row=await snapshot(page);
        assert.strictEqual(row.beatId,"kur_receipt","Kurenai terminal runtime did not remain on Chronicle Receipt");
        assert.strictEqual(row.cueKind,"record","Kurenai terminal presentation is not Chronicle Receipt");
        assert.strictEqual(row.actors.length,0,"Kurenai Receipt still stages Story actors");
        assert(row.text.includes("ACADEMY KURENAI")&&row.text.includes("Made the direct approach look real."),"Kurenai Receipt route summary missing "+JSON.stringify(row));
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
    console.log(JSON.stringify({pass:true,issue:105,cases:CASES.map(x=>x[0]),legacyFallbackRejected:true,clickAnywhereProven:true,miraiWritingGoldenProven:true,miraiBattle338,miraiDefeatContinuations,menmaWritingGoldenOpeningProven:true,menmaNineTailsDialoguePortraitProven:true,menmaPostBattleSegmentationProven:true,kurenaiExpansionBrowserProven:true,miraiTerminal,goldenSaveReloadResumeProven:true,browserGoldenClaimed:false},null,2));
  }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exit(1);});