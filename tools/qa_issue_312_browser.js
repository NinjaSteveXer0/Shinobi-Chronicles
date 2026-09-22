#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BUILD_MANIFEST=JSON.parse(fs.readFileSync(path.join(__dirname,"fixtures/runtime_build_manifest_303.json"),"utf8"));
const BASE=process.env.ISSUE_312_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_312_BROWSER_OUT||"artifacts/issue-312-browser";
fs.mkdirSync(OUT,{recursive:true});

async function boot(browser){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const runtimeErrorGate=await installBrowserRuntimeErrorGate(page);
  await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_){}});
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof globalThis.getRuntimeBuildFingerprint==="function",null,{timeout:15000});
  assert.deepStrictEqual(await page.evaluate(()=>getRuntimeBuildFingerprint()),BUILD_MANIFEST,"#312 runtime fingerprint mismatch");
  await page.waitForFunction(()=>!!(
    globalThis.SC_STORY_SCENE_BOARD_33900&&
    globalThis.SC_BATTLE_PRESENTATION_33000&&
    globalThis.SC_ACADEMY_KAKASHI_V2_CORE_36020&&
    globalThis.SC_ACADEMY_KAKASHI_V2_RENDERER_36030&&
    globalThis.SC_ACADEMY_KAKASHI_V2_TRANSITION_36040
  ),null,{timeout:30000});
  const started=await page.evaluate(()=>{
    const selected=selectChronicleOrigin("academy_kakashi","issue_312_browser");
    const launched=beginAlphaChronicleOriginPrologue();
    if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();
    if(globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400&&typeof globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.release==="function")globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.release();
    const game=document.querySelector(".game-container");if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){const node=document.getElementById(id);if(node)node.remove();}
    return{selected,launched};
  });
  assert(started.selected?.success&&started.launched?.success,JSON.stringify(started));
  await page.waitForSelector("#kakashi-v2-scene-board",{state:"visible",timeout:15000});
  return{context,page,runtimeErrorGate};
}
async function currentBeat(page){return page.evaluate(()=>getActiveStorySceneRuntime()?.beatId||null);}
async function fastDrain(page){
  const result=await page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime(),p=rt&&getAcademyKakashiV2Presentation36020(rt.beatId);
    if(!rt||!p)return{success:false};
    const count=Array.isArray(p.cues)?p.cues.length:0;
    rt.localContext=rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};
    rt.localContext.__kakashiV2Presentation36040={beatId:rt.beatId,cueIndex:Math.max(0,count-1),settled:true};
    savePlayerData();renderAcademyKakashiV236030();
    return{success:true,count};
  });
  assert(result.success,JSON.stringify(result));
}
async function waitBeat(page,beat){
  await page.waitForFunction(id=>getActiveStorySceneRuntime()?.beatId===id&&getAcademyKakashiV2TransitionState36040()?.locked===false,beat,{timeout:12000});
}
async function nextSemantic(page,expected){
  await fastDrain(page);
  const result=await page.evaluate(()=>advanceAcademyKakashiV236040());
  assert(result?.success,JSON.stringify(result));
  await waitBeat(page,expected);
}
async function choose(page,label,expected){
  await fastDrain(page);
  const result=await page.evaluate(label=>{
    const beat=getCurrentStorySceneBeat();
    const row=(beat?.choices||[]).find(c=>c.label===label&&(typeof c.availability!=="function"||c.availability().available===true));
    if(!row)return{success:false,labels:(beat?.choices||[]).map(c=>c.label)};
    return advanceAcademyKakashiV236040(row.choiceId);
  },label);
  assert(result?.success,JSON.stringify(result));
  await waitBeat(page,expected);
}
async function shot(page,name,selector=null){
  if(selector){
    const exact=page.locator(selector).first();
    await exact.waitFor({state:"visible",timeout:12000});
    await exact.screenshot({path:path.join(OUT,name),timeout:12000});
    return;
  }
  await page.screenshot({path:path.join(OUT,name),fullPage:false,timeout:12000});
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  const {context,page,runtimeErrorGate}=await boot(browser);
  try{
    // STORY BENCHMARK — persistent semantic anchors + adaptive prominence.
    const rooftop=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const actors=[...root.querySelectorAll(".kv2-actor")].map(n=>({id:n.dataset.actorId,anchor:n.dataset.scStageAnchor,width:n.getBoundingClientRect().width}));
      return{beat:getActiveStorySceneRuntime()?.beatId,actors,diagnostic:runAcademyKakashiV2Renderer36030Diagnostics(),shared:runStorySceneBoard33900Diagnostics()};
    });
    assert.strictEqual(rooftop.beat,"v2_scene01_rooftop");
    assert.deepStrictEqual(rooftop.actors.map(a=>a.anchor),["PLAYER_LEFT","OPPONENT_RIGHT"]);
    assert(rooftop.actors.every(a=>a.width>=245),"#312 two-actor Story prominence too small: "+JSON.stringify(rooftop.actors));
    assert(rooftop.diagnostic.pass&&rooftop.shared.pass,JSON.stringify(rooftop));
    await shot(page,"01-story-rooftop-two-actor.png","#kakashi-v2-scene-board");

    await nextSemantic(page,"v2_scene02_tail");
    await choose(page,"WATCH THE EXCHANGE","v2_watch_exchange");
    await page.waitForSelector("#kakashi-v2-scene-board .sc-choreo-surprise-entry",{state:"attached",timeout:1800});
    const watch=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const token=root.querySelector('[data-story-object-id="PACKAGE"]');
      return{
        anchors:[...root.querySelectorAll(".kv2-actor")].map(n=>({slot:n.dataset.slot,anchor:n.dataset.scStageAnchor})),
        packageHolder:token?.dataset.packageHolder||null,
        packageHidden:!!token?.hidden,
        choreography:getStoryChoreographyState33900(root)
      };
    });
    assert.deepStrictEqual(watch.anchors.map(x=>x.anchor),["INNER_LEFT","CENTER","OPPONENT_RIGHT"]);
    assert.strictEqual(watch.packageHolder,"PS");
    assert.strictEqual(watch.packageHidden,false);
    assert(watch.choreography.scopeKey&&watch.choreography.state==="playing","#312 watch-exchange choreography not active");
    await shot(page,"02-story-handoff-surprise-entry.png","#kakashi-v2-scene-board");

    // Choice is not trapped by the running animation: semantic transition is immediate.
    const start=Date.now();
    await choose(page,"STOP THE ASSASSIN","v2_stop_assassin_setup");
    const elapsed=Date.now()-start;
    assert(elapsed<900,"#312 Story semantic choice waited for presentation animation: "+elapsed+"ms");
    await page.waitForFunction(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const state=root&&getStoryChoreographyState33900(root);
      return !!state&&Array.isArray(state.lastKinds)&&state.lastKinds.includes("LUNGE");
    },null,{timeout:2200});
    const stop=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      return{
        beat:getActiveStorySceneRuntime()?.beatId,
        anchors:[...document.querySelectorAll("#kakashi-v2-scene-board .kv2-actor")].map(n=>({slot:n.dataset.slot,anchor:n.dataset.scStageAnchor,width:n.getBoundingClientRect().width})),
        choreography:getStoryChoreographyState33900(root),
        transition:runAcademyKakashiV2Transition36040Diagnostics()
      };
    });
    assert.strictEqual(stop.beat,"v2_stop_assassin_setup");
    assert.deepStrictEqual(stop.anchors.map(x=>x.anchor),["PLAYER_LEFT","OPPONENT_RIGHT"]);
    assert(stop.anchors.every(a=>a.width>=245),"#312 battle-pair Story prominence too small");
    assert(stop.choreography.lastKinds.includes("FOCUS")&&stop.choreography.lastKinds.includes("LUNGE"),"#312 shared FOCUS -> LUNGE choreography receipt missing: "+JSON.stringify(stop.choreography));
    assert(stop.transition.pass,JSON.stringify(stop.transition));
    await page.waitForFunction(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      return !!root&&!root.classList.contains("is-wipe-covering");
    },null,{timeout:3000});
    await page.waitForTimeout(260);
    await shot(page,"03-story-stop-assassin-lunge.png","#kakashi-v2-scene-board");

    // BATTLE BENCHMARK — use the authorised sequential MI package against the
    // same current Story instance. This is a QA launcher only; Battle truth and
    // evidence remain canonical runtime structures.
    const launched=await page.evaluate(()=>{
      const rt=getActiveStorySceneRuntime();
      rt.beatId="v2_battle_mi_package_second";
      rt.pendingBattle=null;rt.battleResume=null;
      resetAcademyKakashiV2Transition36040();
      const returnContext={
        type:"story_scene",sceneId:rt.sceneId,sceneInstanceId:rt.instanceId,
        sourceBeatId:"v2_battle_mi_package_second",
        victoryBeatId:"v2_mi_package_second_win",defeatBeatId:"v2_mi_package_second_loss",
        postBattleBeatId:null,exposeFinisher:false
      };
      const out=launchAcademyKakashiV2Battle36010({
        battleConfigId:"academy_kakashi_origin_battle_seq_mi",
        storyOccurrenceId:"issue312_browser_benchmark",
        sourceAnchorRef:"AK_SA_015",
        bindingRef:"mi_package_second",
        returnContext
      });
      renderAcademyKakashiV236030();
      return{out,config:currentBattle?.kakashiV2?.battleConfigId||null,enemy:getBattleDeploymentParticipant("enemy",1)?.id||null};
    });
    assert(launched.out?.success&&launched.config==="academy_kakashi_origin_battle_seq_mi",JSON.stringify(launched));
    assert.strictEqual(launched.enemy,"academy_kakashi_origin_masked_interceptor");
    await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});

    const seed=async(kind)=>page.evaluate(kind=>{
      const runtime=ensureBattleRuntimeState(),battleId=currentBattle.battleId;
      const actorPlayer={side:"player",participantId:"academy_kakashi"};
      const actorEnemy={side:"enemy",participantId:"academy_kakashi_origin_masked_interceptor"};
      const push=def=>recordBattleEvidence(def);
      if(kind==="substitution"){
        const actionId="issue312_substitution";
        push({eventType:"action_attempted",actionId,actorRef:actorEnemy,targetRef:actorPlayer,skillId:"enemy_decoy_assassin_decoy_substitution",data:{actionClass:"enemy_context_technique"}});
        push({eventType:"enemy_authored_action_completed",committedOccurrence:true,actionId,actorRef:actorEnemy,targetRef:actorPlayer,skillId:"enemy_decoy_assassin_decoy_substitution",data:{resolved:true}});
      }else if(kind==="hit"){
        const actionId="issue312_hit";
        push({eventType:"action_attempted",actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_taijutsu",data:{actionClass:"prepared_skill"}});
        push({eventType:"damage_resolved",actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_taijutsu",data:{primaryDiscipline:"Taijutsu",finalDamage:7,remainingBattlePLBefore:14,remainingBattlePLAfter:7,flatGuards:[],ratioGuards:[]}});
        push({eventType:"skill_action_completed",committedOccurrence:true,actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_taijutsu",data:{resolved:true,damageApplied:true,finalDamage:7}});
      }else{
        const actionId="issue312_defeat";
        push({eventType:"damage_resolved",actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_finish",data:{primaryDiscipline:"Taijutsu",finalDamage:7,remainingBattlePLBefore:7,remainingBattlePLAfter:0,flatGuards:[],ratioGuards:[]}});
        push({eventType:"skill_action_completed",committedOccurrence:true,actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_finish",data:{resolved:true,damageApplied:true,finalDamage:7}});
      }
      openOverlay("combat");
      return{kind,battleId,evidenceCount:runtime.evidence.length};
    },kind);

    await seed("substitution");
    await page.waitForSelector('.battle2-performance-stage[data-result="SUBSTITUTION"]',{state:"visible",timeout:8000});
    const substitution=await page.evaluate(()=>{
      const p=resolveBattlePerformanceProjection33000(),stage=document.querySelector(".battle2-performance-stage");
      return{p,afterimages:stage?.querySelectorAll(".battle2-performance-afterimage").length||0,actorImages:stage?.querySelectorAll(".battle2-performance-actor img,.battle2-performance-target>img:not(.battle2-performance-afterimage)").length||0};
    });
    assert.strictEqual(substitution.p.result,"SUBSTITUTION");
    assert.strictEqual(substitution.p.finalDamage,0);
    assert.strictEqual(substitution.p.exactTarget,true);
    assert.strictEqual(substitution.afterimages,1);
    assert.strictEqual(substitution.actorImages,2);
    await shot(page,"04-battle-substitution-performance.png",".alpha-code-battle-stage");

    await seed("hit");
    await page.waitForSelector('.battle2-performance-stage[data-result="HIT"]',{state:"visible",timeout:8000});
    const hit=await page.evaluate(()=>resolveBattlePerformanceProjection33000());
    assert(hit.result==="HIT"&&hit.finalDamage===7&&hit.beforePL===14&&hit.afterPL===7,JSON.stringify(hit));
    assert(hit.actorRef.participantId==="academy_kakashi"&&hit.targetRef.participantId==="academy_kakashi_origin_masked_interceptor");
    await shot(page,"05-battle-hit-performance.png",".alpha-code-battle-stage");

    await seed("defeat");
    await page.waitForSelector('.battle2-performance-stage[data-result="DEFEAT"]',{state:"visible",timeout:8000});
    const defeat=await page.evaluate(()=>resolveBattlePerformanceProjection33000());
    assert(defeat.result==="DEFEAT"&&defeat.afterPL===0,JSON.stringify(defeat));
    assert(!JSON.stringify(defeat).toLowerCase().includes("death"),"#312 defeat presentation leaked death semantics");
    await shot(page,"06-battle-defeat-performance.png",".alpha-code-battle-stage");

    const errors=await runtimeErrorGate.assertClean("issue312_story_battle_benchmark");
    const result={
      pass:true,
      issue:312,
      story:{rooftop,watch,stop,semanticChoiceElapsedMs:elapsed},
      battle:{config:launched.config,substitution:substitution.p,hit,defeat},
      browserErrors:errors,
      sourceHeadlessGreenClaimed:false,
      automatedBrowserGreen:true,
      manualBrowserValidated:false,
      browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"results.json"),JSON.stringify(result,null,2));
    console.log(JSON.stringify(result,null,2));
  }finally{
    await context.close();await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
