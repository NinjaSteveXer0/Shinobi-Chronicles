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
  await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_){};globalThis.SC_DISABLE_FIRST_PL_BATTLE_TUTORIAL_QA=true;});
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
    await choose(page,"WATCH THE HANDOFF","v2_watch_exchange");

    const watchOpening=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const mi=root.querySelector('.kv2-actor[data-slot="mi"]');
      const actions=root.querySelector(".kv2-actions");
      return{
        cue:getAcademyKakashiV2TransitionState36040()?.cueIndex,
        cueCount:getAcademyKakashiV2TransitionState36040()?.cueCount||0,
        miWithheld:mi?.dataset.kv2CueWithheld==="true",
        miOpacity:mi?Number(getComputedStyle(mi).opacity):1,
        actionsVisible:actions?getComputedStyle(actions).display!=="none":false,
        canAdvance:root.dataset.canAdvance,
        hasChoices:root.dataset.hasChoices
      };
    });
    assert.strictEqual(watchOpening.cue,0);
    assert(watchOpening.cueCount>=12,"#312 WATCH authority no longer reaches required reveal/breakaway checkpoints: "+JSON.stringify(watchOpening));
    assert.strictEqual(watchOpening.miWithheld,true,"#312 MI must be visually withheld until the authored surprise-entry cue");
    assert(watchOpening.miOpacity<=0.01,"#312 MI is visible before her authored entrance: "+watchOpening.miOpacity);
    assert.strictEqual(watchOpening.actionsVisible,false,"#312 choices appeared before WATCH narration completed");
    assert.strictEqual(watchOpening.canAdvance,"true");
    assert.strictEqual(watchOpening.hasChoices,"false");

    async function advanceWatchCue(index){
      const result=await page.evaluate(()=>advanceAcademyKakashiV236040());
      assert(result?.success&&result.semanticBeatUnchanged===true&&result.cueIndex===index,JSON.stringify(result));
    }

    await advanceWatchCue(1);
    await page.waitForTimeout(80);
    const watchEarly=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const mi=root.querySelector('.kv2-actor[data-slot="mi"]');
      const style=mi?getComputedStyle(mi):null;
      return{cue:getAcademyKakashiV2TransitionState36040()?.cueIndex,hidden:mi?.hidden===true,withheld:mi?.dataset.kv2CueWithheld==="true",display:style?.display||null,opacity:style?Number(style.opacity):1};
    });
    assert.strictEqual(watchEarly.cue,1);
    assert.strictEqual(watchEarly.hidden,true,"#312 MI became mounted-visible during early WATCH narration");
    assert.strictEqual(watchEarly.withheld,true,"#312 MI lost authored withholding before surprise entrance");
    assert(watchEarly.display==="none"||watchEarly.opacity<=0.01,"#312 MI is visible during early WATCH narration: "+JSON.stringify(watchEarly));

    for(let i=2;i<=5;i++)await advanceWatchCue(i);
    await page.waitForTimeout(430);
    let watch=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const amt=root.querySelector('.kv2-actor[data-slot="amt"]');
      return{cue:getAcademyKakashiV2TransitionState36040()?.cueIndex,amtAnchor:amt?.dataset.scStageAnchor};
    });
    assert.strictEqual(watch.cue,5);
    assert.strictEqual(watch.amtAnchor,"PLAYER_LEFT","#312 'first man moving away' did not move AMT left");

    await advanceWatchCue(6);
    await page.waitForTimeout(430);
    watch=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const ps=root.querySelector('.kv2-actor[data-slot="ps"]');
      const token=root.querySelector('[data-story-object-id="PACKAGE"]');
      return{psAnchor:ps?.dataset.scStageAnchor,packageAnchor:token?.dataset.packageAnchor,packageHolder:token?.dataset.packageHolder};
    });
    assert.strictEqual(watch.psAnchor,"OPPONENT_RIGHT","#312 Package Smuggler did not separate right with the package");
    assert.strictEqual(watch.packageHolder,"PS");
    assert.strictEqual(watch.packageAnchor,"OPPONENT_RIGHT","#312 package presentation did not travel with Package Smuggler");

    await advanceWatchCue(7);await advanceWatchCue(8);await advanceWatchCue(9);await page.waitForTimeout(260);
    const anticipation=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      return{cue:getAcademyKakashiV2TransitionState36040()?.cueIndex,miWithheld:root.querySelector('.kv2-actor[data-slot="mi"]')?.dataset.kv2CueWithheld==="true",animations:[...root.querySelectorAll(".kv2-actor")].map(n=>getComputedStyle(n).animationName),transitions:[...root.querySelectorAll(".kv2-actor")].map(n=>getComputedStyle(n).transitionDuration)};
    });
    assert.strictEqual(anticipation.cue,9);assert.strictEqual(anticipation.miWithheld,true);
    assert(anticipation.animations.every(x=>x==="none"),"#312 Kakashi actor animation survived at WATCH cue 9: "+JSON.stringify(anticipation));
    assert(anticipation.transitions.every(x=>x==="0s"),"#312 Kakashi actor tween survived at WATCH cue 9: "+JSON.stringify(anticipation));

    await advanceWatchCue(10);
    const revealMotion=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");const mi=root.querySelector('.kv2-actor[data-slot="mi"]');const amt=root.querySelector('.kv2-actor[data-slot="amt"]');const style=mi?getComputedStyle(mi):null;
      return{miAnchor:mi?.dataset.scStageAnchor,miWithheld:mi?.dataset.kv2CueWithheld==="true",miHidden:mi?.hidden===true,miOpacity:style?Number(style.opacity):0,miAnimation:style?.animationName||null,miTransform:style?.transform||null,miActive:mi?.dataset.scChoreographyActive||null,amtLeft:amt?.getBoundingClientRect().left||0,ghostCount:root.querySelectorAll(".kv2-actor-ghost,.kv2-departure-ghost,.kv2-outgoing-hold-ghost").length};
    });
    assert.strictEqual(revealMotion.miAnchor,"CENTER");assert.strictEqual(revealMotion.miWithheld,false);assert.strictEqual(revealMotion.miHidden,false);assert.strictEqual(revealMotion.miTransform,"none");
    assert(/kv2SafeSurprise36030|kv2SafeStrike36030/.test(String(revealMotion.miAnimation||""))||["SURPRISE_ENTRY","LUNGE"].includes(revealMotion.miActive));assert.strictEqual(revealMotion.ghostCount,0);
    await page.waitForTimeout(620);
    watch=await page.evaluate(()=>{const root=document.getElementById("kakashi-v2-scene-board");const mi=root.querySelector('.kv2-actor[data-slot="mi"]');const ps=root.querySelector('.kv2-actor[data-slot="ps"]');const style=mi?getComputedStyle(mi):null;const peerStyle=ps?getComputedStyle(ps):null;return{miOpacity:style?Number(style.opacity):0,peerOpacity:peerStyle?Number(peerStyle.opacity):0,miTransform:style?.transform||null,active:root.querySelectorAll("[data-sc-choreography-active]").length,rootCount:document.querySelectorAll("#kakashi-v2-scene-board").length};});
    assert(watch.miOpacity>=0.9&&Math.abs(watch.miOpacity-watch.peerOpacity)<=0.03);assert.strictEqual(watch.miTransform,"none");assert.strictEqual(watch.active,0);assert.strictEqual(watch.rootCount,1);
    await shot(page,"02-story-handoff-motion-reveal.png","#kakashi-v2-scene-board");

    await advanceWatchCue(11);
    let breakaway=await page.evaluate(()=>{const root=document.getElementById("kakashi-v2-scene-board");const amt=root.querySelector('.kv2-actor[data-slot="amt"]');const ps=root.querySelector('.kv2-actor[data-slot="ps"]');const style=amt?getComputedStyle(amt):null;return{amtDeparted:amt?.classList.contains("kv2-cue-departed")===true,amtOpacity:style?Number(style.opacity):1,amtAnimation:style?.animationName||null,amtTransform:style?.transform||null,amtActive:amt?.dataset.scChoreographyActive||null,psAnchor:ps?.dataset.scStageAnchor,ghostCount:root.querySelectorAll(".kv2-actor-ghost,.kv2-departure-ghost,.kv2-outgoing-hold-ghost").length};});
    assert.strictEqual(breakaway.amtTransform,"none");assert(/kv2SafeFlee36030/.test(String(breakaway.amtAnimation||""))||breakaway.amtActive==="FLEE");assert.strictEqual(breakaway.ghostCount,0);assert.strictEqual(breakaway.psAnchor,"OPPONENT_RIGHT");
    await page.waitForTimeout(420);
    breakaway=await page.evaluate(()=>{const root=document.getElementById("kakashi-v2-scene-board");const amt=root.querySelector('.kv2-actor[data-slot="amt"]');const style=amt?getComputedStyle(amt):null;return{amtDeparted:amt?.classList.contains("kv2-cue-departed")===true,amtOpacity:style?Number(style.opacity):1,amtAnimation:style?.animationName||null,amtTransition:style?.transitionDuration||null,amtTransform:style?.transform||null,active:root.querySelectorAll("[data-sc-choreography-active]").length,ghostCount:root.querySelectorAll(".kv2-actor-ghost,.kv2-departure-ghost,.kv2-outgoing-hold-ghost").length};});
    assert.strictEqual(breakaway.amtDeparted,true);assert(breakaway.amtOpacity<=0.01);assert.strictEqual(breakaway.amtAnimation,"none");assert.strictEqual(breakaway.amtTransition,"0s");assert.strictEqual(breakaway.amtTransform,"none");assert.strictEqual(breakaway.active,0);assert.strictEqual(breakaway.ghostCount,0);

    for(let i=12;i<watchOpening.cueCount;i++)await advanceWatchCue(i);
    const choiceLayout=await page.evaluate(()=>{const root=document.getElementById("kakashi-v2-scene-board");const box=root.querySelector(".kv2-actions");const buttons=[...box.querySelectorAll("button")];return{count:buttons.length,labels:buttons.map(b=>b.textContent.trim()),icons:buttons.map(b=>b.dataset.intentIcon||""),scrollHeight:box.scrollHeight,clientHeight:box.clientHeight,overflowY:getComputedStyle(box).overflowY,hasChoices:root.dataset.hasChoices,canAdvance:root.dataset.canAdvance,narrationRadius:getComputedStyle(root.querySelector(".kv2-dialogue")).borderRadius};});
    assert.strictEqual(choiceLayout.count,5);assert(choiceLayout.icons.every(Boolean));assert(choiceLayout.scrollHeight<=choiceLayout.clientHeight+2);assert.notStrictEqual(choiceLayout.overflowY,"scroll");assert.strictEqual(choiceLayout.hasChoices,"true");assert.strictEqual(choiceLayout.canAdvance,"false");assert(parseFloat(choiceLayout.narrationRadius)>=10);

    const start=Date.now();await choose(page,"INTERCEPT THE MASKED ATTACKER","v2_stop_assassin_setup");const elapsed=Date.now()-start;assert(elapsed<900);
    const stop=await page.evaluate(()=>{const root=document.getElementById("kakashi-v2-scene-board");return{beat:getActiveStorySceneRuntime()?.beatId,anchors:[...root.querySelectorAll(".kv2-actors > .kv2-actor")].map(n=>({slot:n.dataset.slot,anchor:n.dataset.scStageAnchor,width:n.getBoundingClientRect().width,transform:getComputedStyle(n).transform,animation:getComputedStyle(n).animationName,transition:getComputedStyle(n).transitionDuration,pending:n.dataset.scChoreographyPendingEntry==="true"})),ghostCount:root.querySelectorAll(".kv2-actor-ghost,.kv2-departure-ghost,.kv2-outgoing-hold-ghost").length,transition:runAcademyKakashiV2Transition36040Diagnostics(),renderer:runAcademyKakashiV2Renderer36030Diagnostics()};});
    assert.strictEqual(stop.beat,"v2_stop_assassin_setup");assert.deepStrictEqual(stop.anchors.map(x=>x.anchor),["PLAYER_LEFT","OPPONENT_RIGHT"]);assert(stop.anchors.every(a=>a.width>=245));assert.strictEqual(stop.ghostCount,0);assert(stop.anchors.every(a=>a.pending===false));assert(stop.anchors.every(a=>a.animation==="none"&&a.transition==="0s"));assert(stop.transition.pass);assert(stop.renderer.pass);
    await page.waitForFunction(()=>{const curtain=document.getElementById("sc-story-hard-transition-33900");return !curtain||(!curtain.classList.contains("is-covered")&&!curtain.classList.contains("is-releasing"));},null,{timeout:3000});
    await shot(page,"03-story-stop-assassin-static.png","#kakashi-v2-scene-board");

    const launched=await page.evaluate(()=>{
      const rt=getActiveStorySceneRuntime();rt.beatId="v2_battle_mi_package_second";rt.pendingBattle=null;rt.battleResume=null;resetAcademyKakashiV2Transition36040();
      const returnContext={type:"story_scene",sceneId:rt.sceneId,sceneInstanceId:rt.instanceId,sourceBeatId:"v2_battle_mi_package_second",victoryBeatId:"v2_mi_package_second_win",defeatBeatId:"v2_mi_package_second_loss",postBattleBeatId:null,exposeFinisher:false};
      const out=launchAcademyKakashiV2Battle36010({battleConfigId:"academy_kakashi_origin_battle_seq_mi",storyOccurrenceId:"issue312_browser_benchmark",sourceAnchorRef:"AK_SA_015",bindingRef:"mi_package_second",returnContext});renderAcademyKakashiV236030();return{out,config:currentBattle?.kakashiV2?.battleConfigId||null,enemy:getBattleDeploymentParticipant("enemy",1)?.id||null};
    });
    assert(launched.out?.success&&launched.config==="academy_kakashi_origin_battle_seq_mi");assert.strictEqual(launched.enemy,"academy_kakashi_origin_masked_interceptor");await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});

    const formationOpening=await page.evaluate(()=>{const stage=document.querySelector(".alpha-code-battle-stage");const row=stage?.querySelector(".battle-live-action-family-row");const primary=[...row.querySelectorAll("button")];const withdraw=stage?.querySelector(".battle2-formation-withdraw");const active=[...stage.querySelectorAll(".battle-live-active-card-player,.battle-live-active-card-enemy")];const visibleSupport=[...stage.querySelectorAll(".battle2-formation-support")].filter(n=>getComputedStyle(n).display!=="none");return{formationStage:stage?.dataset.formationStage,mode:stage?.dataset.formationMode,playerCount:stage?.dataset.playerFormationCount,enemyCount:stage?.dataset.enemyFormationCount,tray:stage?.dataset.formationTray,primaryCount:primary.length,primaryLabels:primary.map(b=>b.textContent.trim()),primaryDataset:row?.dataset.primaryFamilies||"",withdrawOutsideDock:!!withdraw&&withdraw.parentElement===stage&&!row.contains(withdraw),withdrawHandler:withdraw?.getAttribute("onclick")||"",activeCount:active.length,activePortraits:active.map(n=>({side:n.dataset.side,path:n.querySelector("img")?.getAttribute("src")||"",formationPortrait:n.querySelector("img")?.dataset.formationPortrait||null})),visibleSupportCount:visibleSupport.length};});
    assert.strictEqual(formationOpening.formationStage,"true");assert.strictEqual(formationOpening.mode,"duel");assert.strictEqual(formationOpening.playerCount,"1");assert.strictEqual(formationOpening.enemyCount,"1");assert.strictEqual(formationOpening.tray,"closed");assert.strictEqual(formationOpening.primaryCount,3);assert.deepStrictEqual(formationOpening.primaryLabels,["SKILLS","ITEMS","SUMMONS"]);assert.strictEqual(formationOpening.primaryDataset,"SKILLS|ITEMS|SUMMONS");assert.strictEqual(formationOpening.withdrawOutsideDock,true);assert(formationOpening.withdrawHandler.includes("invokeBattleWithdrawAction"));assert.strictEqual(formationOpening.activeCount,2);assert(formationOpening.activePortraits.every(row=>row.path));assert.strictEqual(formationOpening.visibleSupportCount,0);

    const rewardProjection=await page.evaluate(()=>{const priorOutcome=currentBattle.outcome?cloneBattleRuntimeValue(currentBattle.outcome):null;const priorRewards=currentBattle.rewards?cloneBattleRuntimeValue(currentBattle.rewards):null;currentBattle.outcome={type:"victory",completedAt:Date.now(),finishingShinobiId:"academy_kakashi"};const ensured=ensureAcademyKakashiV2BattleRewardProjection36015();const host=document.createElement("div");host.style.position="fixed";host.style.left="-10000px";host.style.top="0";document.body.appendChild(host);renderVictoryOverlay(host);const text=String(host.textContent||"").replace(/\s+/g," ").trim();const projected=cloneBattleRuntimeValue(currentBattle.rewards);host.remove();currentBattle.outcome=priorOutcome;currentBattle.rewards=priorRewards;return{ensured,projected,text};});
    assert.strictEqual(rewardProjection.projected.ryo,50);assert.strictEqual(rewardProjection.projected.exp,0);assert.deepStrictEqual(rewardProjection.projected.items.map(row=>row.name),["Field Recovery Pill"]);assert(rewardProjection.text.includes("50")&&rewardProjection.text.includes("Field Recovery Pill"));

    await page.locator('.battle-live-action-family-row button[data-formation-family="skills"]').click();
    await page.waitForFunction(()=>{const stage=document.querySelector(".alpha-code-battle-stage");const deck=stage&&stage.querySelector(".battle-live-skill-deck");return stage?.dataset.formationTray==="skills"&&!!deck&&getComputedStyle(deck).display!=="none";},null,{timeout:3000});
    const skillTray=await page.evaluate(()=>{const stage=document.querySelector(".alpha-code-battle-stage"),deck=stage.querySelector(".battle-live-skill-deck"),details=stage.querySelector(".battle-live-skill-details");const sr=stage.getBoundingClientRect(),dr=deck.getBoundingClientRect(),ir=details?.getBoundingClientRect();return{tray:stage.dataset.formationTray,deck:{left:dr.left-sr.left,top:dr.top-sr.top,width:dr.width,height:dr.height},inspector:ir?{left:ir.left-sr.left,top:ir.top-sr.top,width:ir.width,height:ir.height}:null,stageHeight:sr.height};});
    assert.strictEqual(skillTray.tray,"skills");assert(skillTray.deck.top>skillTray.stageHeight*.62);await page.locator('.battle-live-action-family-row button[data-formation-family="skills"]').click();await page.waitForFunction(()=>document.querySelector(".alpha-code-battle-stage")?.dataset.formationTray==="closed",null,{timeout:3000});

    const seed=async(kind)=>page.evaluate(kind=>{const runtime=ensureBattleRuntimeState(),battleId=currentBattle.battleId;const actorPlayer={side:"player",participantId:"academy_kakashi"};const actorEnemy={side:"enemy",participantId:"academy_kakashi_origin_masked_interceptor"};const push=def=>recordBattleEvidence(def);if(kind==="substitution"){const actionId="issue312_substitution";push({eventType:"action_attempted",actionId,actorRef:actorEnemy,targetRef:actorPlayer,skillId:"enemy_decoy_assassin_decoy_substitution",data:{actionClass:"enemy_context_technique"}});push({eventType:"enemy_authored_action_completed",committedOccurrence:true,actionId,actorRef:actorEnemy,targetRef:actorPlayer,skillId:"enemy_decoy_assassin_decoy_substitution",data:{resolved:true}});}else if(kind==="hit"){const actionId="issue312_hit";push({eventType:"action_attempted",actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_taijutsu",data:{actionClass:"prepared_skill"}});push({eventType:"damage_resolved",actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_taijutsu",data:{primaryDiscipline:"Taijutsu",finalDamage:7,remainingBattlePLBefore:14,remainingBattlePLAfter:7,flatGuards:[],ratioGuards:[]}});push({eventType:"skill_action_completed",committedOccurrence:true,actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_taijutsu",data:{resolved:true,damageApplied:true,finalDamage:7}});}else{const actionId="issue312_defeat";push({eventType:"damage_resolved",actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_finish",data:{primaryDiscipline:"Taijutsu",finalDamage:7,remainingBattlePLBefore:7,remainingBattlePLAfter:0,flatGuards:[],ratioGuards:[]}});push({eventType:"skill_action_completed",committedOccurrence:true,actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_finish",data:{resolved:true,damageApplied:true,finalDamage:7}});}openOverlay("combat");return{kind,battleId,evidenceCount:runtime.evidence.length};},kind);

    await seed("substitution");await page.waitForSelector('.battle2-performance-stage[data-result="SUBSTITUTION"]',{state:"visible",timeout:8000});
    const substitution=await page.evaluate(()=>{const p=resolveBattlePerformanceProjection33000(),lane=document.querySelector(".battle2-performance-stage"),stage=document.querySelector(".alpha-code-battle-stage");const actor=stage?.querySelector(".battle2-performance-role-actor"),target=stage?.querySelector(".battle2-performance-role-target"),center=lane?.querySelector(".battle2-performance-center");const chip=stage?.querySelector(".battle2-performance-result-chip");const rect=node=>{const r=node?.getBoundingClientRect();return r?{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}:null;};const overlaps=(a,b)=>!!a&&!!b&&!(a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom);const actorRect=rect(actor),targetRect=rect(target),centerRect=rect(center),stageRect=rect(stage);return{p,performancePortraits:lane?.querySelectorAll("img").length||0,canonicalCards:stage?.querySelectorAll(".battle-live-active-card-player,.battle-live-active-card-enemy").length||0,actorRoles:stage?.querySelectorAll(".battle2-performance-role-actor").length||0,targetRoles:stage?.querySelectorAll(".battle2-performance-role-target").length||0,resultChips:stage?.querySelectorAll(".battle2-performance-result-chip").length||0,resultChipOnExactTarget:!!(chip&&target&&chip.parentElement===target),performanceActive:stage?.classList.contains("battle2-performance-active")||false,centerWidthRatio:centerRect&&stageRect&&stageRect.width?centerRect.width/stageRect.width:null,centerOverlapsActor:overlaps(centerRect,actorRect),centerOverlapsTarget:overlaps(centerRect,targetRect)};});
    assert.strictEqual(substitution.p.result,"SUBSTITUTION");assert.strictEqual(substitution.p.finalDamage,0);assert.strictEqual(substitution.p.exactTarget,true);assert.strictEqual(substitution.performancePortraits,0);assert.strictEqual(substitution.canonicalCards,2);assert.strictEqual(substitution.actorRoles,1);assert.strictEqual(substitution.targetRoles,1);assert.strictEqual(substitution.resultChips,1);assert.strictEqual(substitution.resultChipOnExactTarget,true);assert.strictEqual(substitution.performanceActive,true);assert(substitution.centerWidthRatio!==null&&substitution.centerWidthRatio<=0.14);assert.strictEqual(substitution.centerOverlapsActor,false);assert.strictEqual(substitution.centerOverlapsTarget,false);
    const battlePaint=await page.evaluate(()=>{const selectors=["#story-scene-presentation-layer","#screen-overlay",".overlay-content-box","#overlay-content-container",".battle-live-screen",".alpha-code-battle-stage",".battle2-performance-host",".battle2-performance-stage",".battle-live-active-card-player",".battle-live-active-card-enemy"];const describe=selector=>{const node=document.querySelector(selector);if(!node)return{selector,missing:true};const cs=getComputedStyle(node),r=node.getBoundingClientRect();return{selector,tag:node.tagName,className:node.className,rect:{x:r.x,y:r.y,width:r.width,height:r.height},display:cs.display,visibility:cs.visibility,opacity:cs.opacity,zIndex:cs.zIndex,backgroundColor:cs.backgroundColor,backgroundImage:cs.backgroundImage,transform:cs.transform,filter:cs.filter,overflow:cs.overflow,childCount:node.children.length,htmlLength:node.innerHTML.length};};const stage=document.querySelector(".alpha-code-battle-stage");const r=stage&&stage.getBoundingClientRect();const center=r?{x:r.left+r.width/2,y:r.top+r.height/2}:null;const stack=center?document.elementsFromPoint(center.x,center.y).slice(0,12).map(node=>{const cs=getComputedStyle(node);return{tag:node.tagName,id:node.id,className:node.className,opacity:cs.opacity,display:cs.display,visibility:cs.visibility,zIndex:cs.zIndex,backgroundColor:cs.backgroundColor};}):[];return{currentOverlayType:typeof currentOverlayType!=="undefined"?currentOverlayType:null,screenOverlayClass:document.getElementById("screen-overlay")?.className||null,screenOverlayInline:document.getElementById("screen-overlay")?.getAttribute("style")||null,nodes:selectors.map(describe),center,stack};});
    fs.writeFileSync(path.join(OUT,"battle-paint-diagnostic.json"),JSON.stringify(battlePaint,null,2));
    const storyPaint=battlePaint.nodes.find(row=>row.selector==="#story-scene-presentation-layer");const stagePaint=battlePaint.nodes.find(row=>row.selector===".alpha-code-battle-stage");assert(storyPaint&&(storyPaint.display==="none"||storyPaint.visibility==="hidden"));assert(stagePaint&&stagePaint.opacity==="1"&&stagePaint.display!=="none"&&String(stagePaint.backgroundImage).includes("gradient"));assert(!battlePaint.stack.some(row=>row.id==="story-scene-presentation-layer"));
    await page.screenshot({path:path.join(OUT,"04-battle-full-page.png"),fullPage:false,timeout:12000});await shot(page,"04-battle-overlay.png","#screen-overlay");await shot(page,"04-battle-performance-only.png",".battle2-performance-stage");await shot(page,"04-battle-substitution-performance.png",".alpha-code-battle-stage");await page.waitForTimeout(1050);
    const settledBattle=await page.evaluate(()=>{const stage=document.querySelector(".alpha-code-battle-stage");return{active:stage?.classList.contains("battle2-performance-active")||false,roles:stage?.querySelectorAll(".battle2-performance-role-actor,.battle2-performance-role-target").length||0,resultChips:stage?.querySelectorAll(".battle2-performance-result-chip").length||0,actionLabelOpacity:Number(getComputedStyle(stage?.querySelector(".battle2-performance-stage")).opacity||0)};});assert.strictEqual(settledBattle.active,false);assert.strictEqual(settledBattle.roles,0);assert.strictEqual(settledBattle.resultChips,0);assert(settledBattle.actionLabelOpacity<=0.01);

    await seed("hit");await page.waitForSelector('.battle2-performance-stage[data-result="HIT"]',{state:"visible",timeout:8000});const hit=await page.evaluate(()=>resolveBattlePerformanceProjection33000());assert(hit.result==="HIT"&&hit.finalDamage===7&&hit.beforePL===14&&hit.afterPL===7);assert(hit.actorRef.participantId==="academy_kakashi"&&hit.targetRef.participantId==="academy_kakashi_origin_masked_interceptor");await shot(page,"05-battle-hit-performance.png",".alpha-code-battle-stage");
    await seed("defeat");await page.waitForSelector('.battle2-performance-stage[data-result="WITHDRAWAL"]',{state:"visible",timeout:8000});const defeat=await page.evaluate(()=>resolveBattlePerformanceProjection33000());assert(defeat.result==="WITHDRAWAL"&&defeat.presentationClass==="DEFEAT"&&defeat.afterPL===0);assert(!JSON.stringify(defeat).toLowerCase().includes("death"));await shot(page,"06-battle-withdrawal-performance.png",".alpha-code-battle-stage");

    const squadLaunch=await page.evaluate(()=>{const rt=getActiveStorySceneRuntime();const returnContext={type:"story_scene",sceneId:rt.sceneId,sceneInstanceId:rt.instanceId,sourceBeatId:"v2_battle_mi_package_second",victoryBeatId:"v2_mi_package_second_win",defeatBeatId:"v2_mi_package_second_loss",postBattleBeatId:null,exposeFinisher:false};const out=launchAcademyKakashiV2Battle36010({battleConfigId:"academy_kakashi_origin_battle_ps_mi_2v1",storyOccurrenceId:"issue312_browser_formation_2v1",sourceAnchorRef:"ISSUE312_FORMATION_STAGE",bindingRef:"ps_mi_2v1",returnContext});return{out,playerIds:[1,2,3,4].map(slot=>getBattleDeploymentParticipant("player",slot)?.id||null).filter(Boolean),enemyIds:[1,2,3,4].map(slot=>getBattleDeploymentParticipant("enemy",slot)?.id||null).filter(Boolean)};});
    assert(squadLaunch.out?.success===true);assert.deepStrictEqual(squadLaunch.playerIds,["academy_kakashi"]);assert.deepStrictEqual(squadLaunch.enemyIds,["academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"]);
    await page.waitForFunction(()=>{const stage=document.querySelector(".alpha-code-battle-stage");return stage?.dataset.formationMode==="wedge"&&stage?.dataset.enemyFormationCount==="2";},null,{timeout:8000});
    const squadOpening=await page.evaluate(()=>{const stage=document.querySelector(".alpha-code-battle-stage");const support=[...stage.querySelectorAll('.battle2-formation-support:not([data-formation-hidden="true"])')];const dock=stage.querySelector(".battle-live-action-family-row");const rect=node=>{const r=node?.getBoundingClientRect();return r?{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}:null;};const overlaps=(a,b)=>!!a&&!!b&&!(a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom);const dockRect=rect(dock);return{mode:stage.dataset.formationMode,playerCount:stage.dataset.playerFormationCount,enemyCount:stage.dataset.enemyFormationCount,support:support.map(node=>({id:node.dataset.participantId,side:node.dataset.formationSide,slot:node.dataset.formationSlot,image:node.querySelector("img")?.getAttribute("src")||"",rect:rect(node),overlapsDock:overlaps(rect(node),dockRect)})),primaryFamilies:[...dock.querySelectorAll("button[data-formation-family]")].map(b=>b.textContent.trim())};});
    assert.strictEqual(squadOpening.mode,"wedge");assert.strictEqual(squadOpening.playerCount,"1");assert.strictEqual(squadOpening.enemyCount,"2");assert.strictEqual(squadOpening.support.length,1);assert.strictEqual(squadOpening.support[0].id,"academy_kakashi_origin_masked_interceptor");assert.strictEqual(squadOpening.support[0].side,"enemy");assert.strictEqual(squadOpening.support[0].slot,"2");assert(squadOpening.support[0].image);assert.strictEqual(squadOpening.support[0].overlapsDock,false);assert.deepStrictEqual(squadOpening.primaryFamilies,["SKILLS","ITEMS","SUMMONS"]);await shot(page,"07-battle-formation-wedge-2v1.png",".alpha-code-battle-stage");

    const offSlotFixture=await page.evaluate(()=>{const actorRef={side:"player",participantId:"academy_kakashi"};const targetRef={side:"enemy",participantId:"academy_kakashi_origin_masked_interceptor"};const actionId="issue312_qa_offslot_target";recordBattleEvidence({eventType:"action_attempted",actionId,actorRef,targetRef,skillId:"issue312_qa_exact_target",data:{actionClass:"qa_presentation_fixture"}});recordBattleEvidence({eventType:"damage_resolved",actionId,actorRef,targetRef,skillId:"issue312_qa_exact_target",data:{primaryDiscipline:"Taijutsu",finalDamage:1,remainingBattlePLBefore:14,remainingBattlePLAfter:13,flatGuards:[],ratioGuards:[],qaPresentationFixture:true}});recordBattleEvidence({eventType:"skill_action_completed",committedOccurrence:true,actionId,actorRef,targetRef,skillId:"issue312_qa_exact_target",data:{resolved:true,damageApplied:true,finalDamage:1,qaPresentationFixture:true}});openOverlay("combat");return resolveBattlePerformanceProjection33000();});assert.strictEqual(offSlotFixture.targetRef.participantId,"academy_kakashi_origin_masked_interceptor");
    await page.waitForFunction(()=>{const stage=document.querySelector(".alpha-code-battle-stage");const support=[...stage.querySelectorAll(".battle2-formation-support")].find(n=>n.dataset.participantId==="academy_kakashi_origin_masked_interceptor");return !!support&&support.classList.contains("battle2-performance-role-target");},null,{timeout:3000});
    const offSlotFocus=await page.evaluate(()=>{const stage=document.querySelector(".alpha-code-battle-stage");const activeEnemy=stage.querySelector(".battle-live-active-card-enemy");const target=[...stage.querySelectorAll(".battle2-formation-support")].find(n=>n.dataset.participantId==="academy_kakashi_origin_masked_interceptor");const chip=target?.querySelector(".battle2-performance-result-chip");return{activeEnemyId:activeEnemy?.dataset.participantId||null,targetId:target?.dataset.participantId||null,targetRole:target?.classList.contains("battle2-performance-role-target")||false,chipLocal:!!chip&&chip.parentElement===target};});
    assert.strictEqual(offSlotFocus.activeEnemyId,"academy_kakashi_origin_package_smuggler");assert.strictEqual(offSlotFocus.targetId,"academy_kakashi_origin_masked_interceptor");assert.strictEqual(offSlotFocus.targetRole,true);assert.strictEqual(offSlotFocus.chipLocal,true);await shot(page,"08-battle-formation-offslot-target.png",".alpha-code-battle-stage");

    const amtLifecycleLaunch=await page.evaluate(()=>{const rt=getActiveStorySceneRuntime();const returnContext={type:"story_scene",sceneId:rt.sceneId,sceneInstanceId:rt.instanceId,sourceBeatId:"v2_battle_amt_stop",victoryBeatId:"v2_amt_stop_win",defeatBeatId:"v2_amt_stop_loss",postBattleBeatId:null,exposeFinisher:false};const beforeEnemyTurns=globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400&&typeof globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.getEnemyTurnsScheduled==="function"?globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.getEnemyTurnsScheduled():null;const out=launchAcademyKakashiV2Battle36010({battleConfigId:"academy_kakashi_origin_battle_amt_1v1",storyOccurrenceId:"issue312_manual_red_regression",sourceAnchorRef:"ISSUE312_MANUAL_RED",bindingRef:"amt_second_skill_lifecycle",returnContext});return{out,beforeEnemyTurns,schedulerBefore:typeof evaluateEnemyActionScheduler==="function"?evaluateEnemyActionScheduler():null,playerOpportunityBefore:getBattleActionOpportunityIndex("player","academy_kakashi"),enemyOpportunityBefore:getBattleActionOpportunityIndex("enemy","academy_kakashi_origin_amt")};});
    assert(amtLifecycleLaunch.out?.success===true);assert.strictEqual(amtLifecycleLaunch.schedulerBefore?.ready,true);
    await page.waitForFunction(()=>{const stage=document.querySelector(".alpha-code-battle-stage");return stage?.dataset.formationMode==="duel"&&stage?.dataset.enemyFormationCount==="1";},null,{timeout:8000});
    const duelComposition=await page.evaluate(()=>{const stage=document.querySelector(".alpha-code-battle-stage");const player=stage?.querySelector(".battle-live-active-card-player");const enemy=stage?.querySelector(".battle-live-active-card-enemy");const vs=stage?.querySelector(".battle-code-vs");const playerPower=stage?.querySelector(".battle-live-power-player"),enemyPower=stage?.querySelector(".battle-live-power-enemy");const playerName=player?.querySelector(".battle-live-active-nameplate"),enemyName=enemy?.querySelector(".battle-live-active-nameplate");const ticker=stage?.querySelector(".battle2-live-ticker"),status=stage?.querySelector(".battle-live-status");const sr=stage?.getBoundingClientRect(),pr=player?.getBoundingClientRect(),er=enemy?.getBoundingClientRect();const ppr=playerPower?.getBoundingClientRect(),epr=enemyPower?.getBoundingClientRect(),tr=ticker?.getBoundingClientRect();const visibleSupports=[...stage.querySelectorAll(".battle2-formation-support")].filter(node=>{const style=getComputedStyle(node),rect=node.getBoundingClientRect();return style.display!=="none"&&style.visibility!=="hidden"&&rect.width>0&&rect.height>0;}).length;return{stageWidth:sr?.width||0,stageHeight:sr?.height||0,playerWidthRatio:sr&&pr?pr.width/sr.width:0,enemyWidthRatio:sr&&er?er.width/sr.width:0,confrontationGapRatio:sr&&pr&&er?(er.left-(pr.left+pr.width))/sr.width:1,playerPowerCenterRatio:sr&&ppr?(ppr.left+ppr.width/2-sr.left)/sr.width:0,enemyPowerCenterRatio:sr&&epr?(epr.left+epr.width/2-sr.left)/sr.width:1,playerPowerCenterYRatio:sr&&ppr?(ppr.top+ppr.height/2-sr.top)/sr.height:1,enemyPowerCenterYRatio:sr&&epr?(epr.top+epr.height/2-sr.top)/sr.height:1,playerNameDisplay:playerName?getComputedStyle(playerName).display:null,enemyNameDisplay:enemyName?getComputedStyle(enemyName).display:null,statusDisplay:status?getComputedStyle(status).display:null,tickerBottomRatio:sr&&tr?(tr.bottom-sr.top)/sr.height:1,playerTopRatio:sr&&pr?(pr.top-sr.top)/sr.height:0,playerTransition:getComputedStyle(player).transitionProperty,visibleSupports,vsOpacity:vs?Number(getComputedStyle(vs).opacity):0};});
    assert(duelComposition.playerWidthRatio>=0.33&&duelComposition.enemyWidthRatio>=0.33);assert(duelComposition.confrontationGapRatio<=0.17);assert.strictEqual(duelComposition.visibleSupports,0);assert(duelComposition.playerPowerCenterRatio>=0.425&&duelComposition.playerPowerCenterRatio<=0.445);assert(duelComposition.enemyPowerCenterRatio>=0.555&&duelComposition.enemyPowerCenterRatio<=0.575);assert(duelComposition.playerPowerCenterYRatio>=0.46&&duelComposition.playerPowerCenterYRatio<=0.50);assert(duelComposition.enemyPowerCenterYRatio>=0.46&&duelComposition.enemyPowerCenterYRatio<=0.50);assert.strictEqual(duelComposition.playerNameDisplay,"none");assert.notStrictEqual(duelComposition.enemyNameDisplay,"none");assert.strictEqual(duelComposition.statusDisplay,"none");assert(duelComposition.tickerBottomRatio<=duelComposition.playerTopRatio+0.01);assert(!String(duelComposition.playerTransition||"").includes("transform")&&!String(duelComposition.playerTransition||"").includes("left")&&!String(duelComposition.playerTransition||"").includes("top"));assert(duelComposition.vsOpacity>=0.5);

    const amtSkillsButton=page.locator('.battle-live-action-family-row button[data-formation-family="skills"]');await amtSkillsButton.click();await page.waitForFunction(()=>document.querySelector(".alpha-code-battle-stage")?.dataset.formationTray==="skills",null,{timeout:3000});
    const amtPreparedIds=await page.evaluate(()=>[...document.querySelectorAll(".battle-live-skill-deck .battle-dev-skill-card:not(.is-empty)")].map(node=>node.dataset.skillId||null));assert.strictEqual(amtPreparedIds[1],"academy_kakashi_clone_feint");
    const secondSkill=page.locator(".battle-live-skill-deck .battle-dev-skill-card:not(.is-empty)").nth(1);await secondSkill.click();
    await page.waitForFunction(()=>{const battleId=currentBattle?.battleId;const rows=ensureBattleRuntimeState()?.evidence||[];return rows.some(row=>row&&row.battleId===battleId&&row.eventType==="enemy_authored_action_completed"&&row.actorRef?.participantId==="academy_kakashi_origin_amt");},null,{timeout:5000});
    const amtLifecycleAfterFirst=await page.evaluate(beforeEnemyTurns=>{const battleId=currentBattle.battleId;const rows=(ensureBattleRuntimeState().evidence||[]).filter(row=>row&&row.battleId===battleId);const playerCompletions=rows.filter(row=>row.eventType==="skill_action_completed"&&row.actorRef?.participantId==="academy_kakashi");const enemyCompletions=rows.filter(row=>row.eventType==="enemy_authored_action_completed"&&row.actorRef?.participantId==="academy_kakashi_origin_amt");const afterEnemyTurns=globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400&&typeof globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.getEnemyTurnsScheduled==="function"?globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.getEnemyTurnsScheduled():null;const state=syncBattleActionRegionState();const stage=document.querySelector(".alpha-code-battle-stage");return{playerCompletions:playerCompletions.map(row=>({actionId:row.actionId,skillId:row.skillId,resolved:row.data?.resolved})),enemyCompletions:enemyCompletions.map(row=>({actionId:row.actionId,skillId:row.skillId,resolved:row.data?.resolved})),enemyTurnDelta:beforeEnemyTurns===null||afterEnemyTurns===null?null:afterEnemyTurns-beforeEnemyTurns,playerOpportunity:getBattleActionOpportunityIndex("player","academy_kakashi"),enemyOpportunity:getBattleActionOpportunityIndex("enemy","academy_kakashi_origin_amt"),selectedSkillId:state.selectedSkillId,selectedTargetRef:state.selectedTargetRef,tray:stage?.dataset.formationTray||null,schedulerAfter:evaluateEnemyActionScheduler(),amtConditions:getBattleParticipantConditions("player","academy_kakashi").map(row=>({key:row.conditionKey,id:row.conditionId}))};},amtLifecycleLaunch.beforeEnemyTurns);
    assert.strictEqual(amtLifecycleAfterFirst.playerCompletions.length,1);assert.strictEqual(amtLifecycleAfterFirst.playerCompletions[0].skillId,"academy_kakashi_clone_feint");assert.strictEqual(amtLifecycleAfterFirst.enemyCompletions.length,1);assert.strictEqual(amtLifecycleAfterFirst.enemyCompletions[0].skillId,"enemy_anbu_style_operative_wire_capture");assert.strictEqual(amtLifecycleAfterFirst.enemyCompletions[0].resolved,true);assert.strictEqual(amtLifecycleAfterFirst.enemyTurnDelta,1);assert.strictEqual(amtLifecycleAfterFirst.playerOpportunity,amtLifecycleLaunch.playerOpportunityBefore+1);assert.strictEqual(amtLifecycleAfterFirst.enemyOpportunity,amtLifecycleLaunch.enemyOpportunityBefore+1);assert.strictEqual(amtLifecycleAfterFirst.selectedSkillId,"academy_kakashi_clone_feint");assert(amtLifecycleAfterFirst.selectedTargetRef&&amtLifecycleAfterFirst.selectedTargetRef.participantId==="academy_kakashi_origin_amt");assert.strictEqual(amtLifecycleAfterFirst.tray,"skills");

    await page.waitForFunction(()=>{const stage=document.querySelector(".alpha-code-battle-stage");const deck=stage?.querySelector(".battle-live-skill-deck");return stage?.dataset.formationTray==="skills"&&!!deck&&getComputedStyle(deck).display!=="none";},null,{timeout:3000});
    const amtPersistent=await page.evaluate(()=>{const stage=document.querySelector(".alpha-code-battle-stage");const state=syncBattleActionRegionState();const cards=[...stage.querySelectorAll(".battle-live-skill-deck .battle-dev-skill-card:not(.is-empty)")];return{tray:stage.dataset.formationTray,selectedSkillId:state.selectedSkillId,readySkillIds:cards.filter(node=>!node.disabled).map(node=>node.dataset.skillId||null)};});assert.strictEqual(amtPersistent.tray,"skills");assert.strictEqual(amtPersistent.selectedSkillId,"academy_kakashi_clone_feint");assert(amtPersistent.readySkillIds.length>0);
    const nextReadyId=amtPersistent.readySkillIds.find(id=>id!==amtPersistent.selectedSkillId)||amtPersistent.readySkillIds[0];await page.locator('.battle-live-skill-deck .battle-dev-skill-card[data-skill-id="'+nextReadyId+'"]').click();
    await page.waitForFunction(()=>{const battleId=currentBattle?.battleId;const rows=(ensureBattleRuntimeState()?.evidence||[]).filter(row=>row&&row.battleId===battleId);return rows.filter(row=>row.eventType==="enemy_authored_action_completed"&&row.actorRef?.participantId==="academy_kakashi_origin_amt").length>=2;},null,{timeout:5000});
    const amtLifecycleAfterSecond=await page.evaluate(()=>{const battleId=currentBattle.battleId;const rows=(ensureBattleRuntimeState().evidence||[]).filter(row=>row&&row.battleId===battleId);const playerCompletions=rows.filter(row=>row.eventType==="skill_action_completed"&&row.actorRef?.participantId==="academy_kakashi");const enemyCompletions=rows.filter(row=>row.eventType==="enemy_authored_action_completed"&&row.actorRef?.participantId==="academy_kakashi_origin_amt");const scheduler=evaluateEnemyActionScheduler();return{playerCompletions:playerCompletions.map(row=>({skillId:row.skillId,resolved:row.data?.resolved})),enemyCompletions:enemyCompletions.map(row=>({skillId:row.skillId,resolved:row.data?.resolved})),playerOpportunity:getBattleActionOpportunityIndex("player","academy_kakashi"),enemyOpportunity:getBattleActionOpportunityIndex("enemy","academy_kakashi_origin_amt"),tray:document.querySelector(".alpha-code-battle-stage")?.dataset.formationTray||null,schedulerReady:scheduler?.ready===true,schedulerEligibleIds:(scheduler?.eligibleActionIds||[]).slice()};});
    assert.strictEqual(amtLifecycleAfterSecond.playerCompletions.length,2);assert.strictEqual(amtLifecycleAfterSecond.enemyCompletions.length,2);assert.strictEqual(amtLifecycleAfterSecond.enemyCompletions[1].skillId,"enemy_anbu_style_operative_tanto_flash");assert.strictEqual(amtLifecycleAfterSecond.enemyCompletions[1].resolved,true);assert.strictEqual(amtLifecycleAfterSecond.playerOpportunity,amtLifecycleLaunch.playerOpportunityBefore+2);assert.strictEqual(amtLifecycleAfterSecond.enemyOpportunity,amtLifecycleLaunch.enemyOpportunityBefore+2);assert.strictEqual(amtLifecycleAfterSecond.tray,"skills");assert.strictEqual(amtLifecycleAfterSecond.schedulerReady,true);assert(amtLifecycleAfterSecond.schedulerEligibleIds.includes("enemy_anbu_style_operative_silent_body_flicker"));

    await page.waitForFunction(()=>{const stage=document.querySelector(".alpha-code-battle-stage");const deck=stage?.querySelector(".battle-live-skill-deck");return stage?.dataset.formationTray==="skills"&&!!deck&&getComputedStyle(deck).display!=="none";},null,{timeout:3000});

    const psVictoryOverlay=await page.evaluate(async()=>{
      const dep=currentBattle.kakashiV2;
      const prior={battleConfigId:dep.battleConfigId,battleOccurrenceId:dep.battleOccurrenceId,storyOccurrenceId:dep.storyOccurrenceId,encounterId:currentBattle.encounterId,active:currentBattle.active,battleOver:currentBattle.battleOver,outcome:currentBattle.outcome?cloneBattleRuntimeValue(currentBattle.outcome):null,rewards:currentBattle.rewards?cloneBattleRuntimeValue(currentBattle.rewards):null};
      dep.battleConfigId="academy_kakashi_origin_battle_seq_ps";dep.battleOccurrenceId="issue312_ps_reward_overlay";dep.storyOccurrenceId="issue312_ps_reward_story";currentBattle.encounterId="academy_kakashi_origin_battle_seq_ps";currentBattle.active=false;currentBattle.battleOver=true;currentBattle.outcome={type:"victory",completedAt:Date.now(),finishingShinobiId:"academy_kakashi"};currentBattle.rewards={generated:true,claimed:false,ryo:0,exp:0,items:[],rareDrops:[]};
      try{delete currentBattle.__battleTerminalResultPresentation54400;}catch(_error){}
      try{globalThis.hardSettleBattlePresentationQueue33000?.("issue312_ps_reward_overlay");}catch(_error){}
      presentCommittedBattleTerminalResult54400("victory",{source:"issue312_ps_reward_overlay"});
      await new Promise(resolve=>setTimeout(resolve,80));
      const text=String(document.getElementById("screen-overlay")?.textContent||"").replace(/\s+/g," ").trim();const reward=cloneBattleRuntimeValue(currentBattle.rewards);
      dep.battleConfigId=prior.battleConfigId;dep.battleOccurrenceId=prior.battleOccurrenceId;dep.storyOccurrenceId=prior.storyOccurrenceId;currentBattle.encounterId=prior.encounterId;currentBattle.active=prior.active;currentBattle.battleOver=prior.battleOver;currentBattle.outcome=prior.outcome;currentBattle.rewards=prior.rewards;try{delete currentBattle.__battleTerminalResultPresentation54400;}catch(_error){}openOverlay("combat");return{reward,text};
    });
    assert.strictEqual(psVictoryOverlay.reward.ryo,50,"#312 PS Victory overlay did not consume the locked 50 Ryō reward: "+JSON.stringify(psVictoryOverlay));assert.strictEqual(psVictoryOverlay.reward.exp,0);assert.deepStrictEqual(psVictoryOverlay.reward.items,[]);assert(psVictoryOverlay.text.includes("50"));

    const errors=await runtimeErrorGate.assertClean("issue312_story_battle_benchmark");
    const result={pass:true,issue:312,story:{rooftop,watch,stop,semanticChoiceElapsedMs:elapsed,staticGoldenMotion:true},battle:{config:launched.config,substitution:substitution.p,settledBattle,hit,defeat,squadOpening,offSlotFixture,offSlotFocus},browserErrors:errors,sourceHeadlessGreenClaimed:false,automatedBrowserGreen:true,manualBrowserValidated:false,browserGoldenClaimed:false};
    fs.writeFileSync(path.join(OUT,"results.json"),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
  }finally{await context.close();await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});