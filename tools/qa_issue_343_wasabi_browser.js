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
const RIVER="occ_origin_izuno_river_endurance_resolution";
const PURSE_SOURCE="origin_completion_starting_purse_ryo_01";
const BATTLE_REWARD_SOURCE="wasabi_origin_rogue_genin_battle_victory_ryo_01";
const BACKDROPS=Object.freeze({
  practical:"Izuno Origin Backdrop/practical_ground_day.png",
  rooftop:"Izuno Origin Backdrop/konoha_rooftop_pursuit_day.png",
  mainStreet:"Izuno Origin Backdrop/konoha_main_street.png",
  river:"Izuno Origin Backdrop/river_route_day.png",
  narrowYard:"Izuno Origin Backdrop/konoha_narrow_yard.png",
  alley:"Izuno Origin Backdrop/konoha_alleyway_day.png",
  training:"Izuno Origin Backdrop/training_grounds_day.png"
});

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
  await page.waitForFunction(()=>typeof getRuntimeBuildFingerprint==="function"&&!!globalThis.SC_ALPHA_SPECIAL_JONIN_EVIDENCE_PRODUCER_34700&&!!globalThis.SC_ACADEMY_WASABI_WRITING_GOLDEN_343&&!!globalThis.SC_ACADEMY_WASABI_ROGUE_BATTLE_343&&!!globalThis.SC_ALPHA_ORIGIN_32900,null,{timeout:30000});
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
  await assertBackdrop(page,BACKDROPS.practical,label+" HEAD START");
  let opening=await info(page);
  assert.strictEqual(opening.performanceLabels.filter(x=>x==="NARRATION").length,1,label+" duplicate NARRATION labels "+JSON.stringify(opening.performanceLabels));
  await assertStoryPresentationBenchmark(page,"narration",label+" opening narration");
  assert.deepStrictEqual(opening.actors.map(x=>[x.id,x.image]),[
    ["academy_izuno","Assets/Academy Student/academy_izuno.png"],
    ["wasabi_academy_instructor","NPC/izuno_instructor.png"]
  ],label+" HEAD START actor cards drift");
  assert(opening.actors.every(x=>x.tag===""),label+" baked actor identity was duplicated by coded tag "+JSON.stringify(opening.actors));
  await continueTo(page,"izu_open_5");
  let dialogue=await info(page);
  assert.strictEqual(dialogue.speaker,"WASABI",label+" Wasabi speaker attribution missing");
  assert.strictEqual(dialogue.speakerActorId,"academy_izuno",label+" Wasabi dialogue not anchored to Wasabi card");
  assert.strictEqual(dialogue.speakerSide,"player",label+" Wasabi dialogue side drift");
  assert.strictEqual(dialogue.actors.find(x=>x.id==="academy_izuno")?.focus,true,label+" Wasabi speaker card not focused");
  await assertStoryPresentationBenchmark(page,"dialogue",label+" Wasabi dialogue");
  await continueTo(page,"izu_open_7");
  dialogue=await info(page);
  assert.strictEqual(dialogue.speaker,"ACADEMY INSTRUCTOR",label+" Instructor speaker attribution missing");
  assert.strictEqual(dialogue.speakerActorId,"wasabi_academy_instructor",label+" Instructor dialogue not anchored to Instructor card");
  assert.strictEqual(dialogue.speakerSide,"opposition",label+" Instructor dialogue side drift");
  assert.strictEqual(dialogue.actors.find(x=>x.id==="wasabi_academy_instructor")?.focus,true,label+" Instructor speaker card not focused");
  await assertStoryPresentationBenchmark(page,"dialogue",label+" Instructor dialogue");
  return{context,page,runtimeErrorGate};
}
async function info(page){
  return page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime(),beat=getCurrentStorySceneBeat(),root=document.getElementById("story-scene-presentation-layer");
    const visible=n=>!!n&&n.getClientRects().length>0&&getComputedStyle(n).display!=="none"&&getComputedStyle(n).visibility!=="hidden"&&Number(getComputedStyle(n).opacity)!==0;
    const performanceLabels=[...(root?.querySelectorAll(".sc-story-kicker,.sc-story-name")||[])].filter(visible).map(n=>n.textContent.trim()).filter(Boolean);
    const actors=[...(root?.querySelectorAll(".sc-scene-board-33900__actor")||[])].map(n=>({
      id:n.dataset.actorId||"",label:n.dataset.actorLabel||"",focus:n.classList.contains("is-focus"),
      image:n.querySelector("img")?.getAttribute("src")||"",tag:n.querySelector(".sc-scene-board-33900__actor-tag")?.textContent?.trim()||""
    }));
    return{
      sceneId:rt?.sceneId||null,beatId:rt?.beatId||null,mode:beat?.mode||null,machineResolved:beat?.machineResolved===true,
      cueKind:root?.dataset.scCueKind||null,
      localContext:rt?.localContext?JSON.parse(JSON.stringify(rt.localContext)):{},
      text:root?.querySelector(".sc-story-text")?.textContent?.trim()||"",
      speaker:root?.querySelector(".sc-story-name")?.textContent?.trim()||"",
      speakerSide:root?.dataset.scCueSpeakerSide||null,speakerActorId:root?.dataset.scCueSpeakerActorId||null,
      performanceLabels,actors,
      choices:[...(root?.querySelectorAll(".sc-story-choice")||[])].filter(visible).map(n=>n.textContent.trim()),
      rootVisible:visible(root),battleVisible:visible(document.querySelector(".alpha-code-battle-stage"))
    };
  });
}
async function assertStoryPresentationBenchmark(page,kind,label){
  const row=await page.evaluate(kind=>{
    const root=document.getElementById("story-scene-presentation-layer");
    const stage=root?.querySelector(".sc-chronicle-stage")||root?.querySelector(".sc-story-stage")||root;
    const layout=root?.querySelector(".sc-chronicle-layout"),panel=root?.querySelector(".sc-story-panel");
    const rr=n=>{const r=n?.getBoundingClientRect();return r?{left:r.left,top:r.top,width:r.width,height:r.height,right:r.right,bottom:r.bottom}:null;};
    const actorId=root?.dataset.scCueSpeakerActorId||null;
    const actor=[...(root?.querySelectorAll(".sc-scene-board-33900__actor")||[])].find(n=>n.dataset.actorId===actorId)||null;
    const stageRect=rr(stage),layoutRect=rr(layout),panelRect=rr(panel),actorRect=rr(actor);
    const css=panel?getComputedStyle(panel):null;
    const nameNode=root?.querySelector(".sc-story-name"),textNode=root?.querySelector(".sc-story-text"),primary=root?.querySelector(".sc-chronicle-primary");
    const hint=root?.querySelector(".sc-performance-hint-33900"),progress=root?.querySelector(".sc-performance-progress-33900");
    const nameCss=nameNode?getComputedStyle(nameNode):null,textCss=textNode?getComputedStyle(textNode):null,primaryCss=primary?getComputedStyle(primary):null;
    const hintCss=hint?getComputedStyle(hint):null,progressCss=progress?getComputedStyle(progress):null;
    const tailRaw=layout?.style.getPropertyValue("--sc-cue-speech-tail")||"";
    const tail=parseFloat(tailRaw)||0;
    const pointerX=layoutRect&&tail?layoutRect.left+layoutRect.width*(tail/100):null;
    const actorCenter=actorRect?actorRect.left+actorRect.width/2:null;
    return{
      kind,cueKind:root?.dataset.scCueKind||null,stageRect,layoutRect,panelRect,actorRect,
      actorId,speechX:layout?.style.getPropertyValue("--sc-cue-speech-x")||"",tailRaw,pointerX,actorCenter,
      borderRadius:css?.borderRadius||"",borderColor:css?.borderColor||"",
      tailBorderTopColor:kind==="dialogue"&&panel?getComputedStyle(panel,"::after").borderTopColor:"",
      recordBoardDisplay:getComputedStyle(root?.querySelector(".sc-scene-board-33900")||root).display,
      primaryText:primary?.textContent?.trim()||"",primaryDisplay:primaryCss?.display||"",
      nameFontSize:nameCss?.fontSize||"",textFontSize:textCss?.fontSize||"",
      hintText:hint?.textContent?.trim()||"",hintDisplay:hintCss?.display||"",
      progressText:progress?.textContent?.trim()||"",progressDisplay:progressCss?.display||""
    };
  },kind);
  assert.strictEqual(row.cueKind,kind,label+" cue kind drift "+JSON.stringify(row));
  assert(row.stageRect&&row.layoutRect&&row.panelRect,label+" presentation geometry missing "+JSON.stringify(row));
  if(kind==="narration"){
    assert(row.layoutRect.width<=row.stageRect.width*.74,label+" narration remains oversized "+JSON.stringify(row));
    assert(parseFloat(row.borderRadius)>=15,label+" narration panel not on Kakashi rounded treatment "+JSON.stringify(row));
    assert(row.borderColor.includes("93, 215, 225"),label+" narration outline is not canonical cyan "+JSON.stringify(row));
    assert.strictEqual(row.primaryDisplay,"none",label+" legacy narration arrow button is still visible "+JSON.stringify(row));
    assert.strictEqual(row.hintText,"CLICK ANYWHERE TO CONTINUE",label+" narration click-anywhere hint drift "+JSON.stringify(row));
    assert.notStrictEqual(row.hintDisplay,"none",label+" narration click-anywhere hint hidden "+JSON.stringify(row));
    assert(/^\d+ \/ \d+$/.test(row.progressText)&&row.progressDisplay!=="none",label+" narration cue counter missing "+JSON.stringify(row));
    assert.strictEqual(row.nameFontSize,"8px",label+" narration label typography drift "+JSON.stringify(row));
    assert(parseFloat(row.textFontSize)>=12&&parseFloat(row.textFontSize)<=15.1,label+" narration body typography drift "+JSON.stringify(row));
  }else if(kind==="dialogue"){
    assert(row.actorId&&row.actorRect,label+" dialogue speaker actor missing "+JSON.stringify(row));
    assert(row.speechX&&row.tailRaw,label+" dialogue speaker geometry variables missing "+JSON.stringify(row));
    assert(Math.abs(row.pointerX-row.actorCenter)<=36,label+" dialogue pointer misses speaker "+JSON.stringify(row));
    assert(row.layoutRect.width<=Math.min(510,row.stageRect.width*.72),label+" dialogue panel too wide "+JSON.stringify(row));
    assert(row.borderColor.includes("103, 221, 230"),label+" dialogue outline is not canonical cyan "+JSON.stringify(row));
    assert(row.tailBorderTopColor.includes("103, 221, 230"),label+" dialogue pointer outline is not canonical cyan "+JSON.stringify(row));
    assert.strictEqual(row.primaryDisplay,"none",label+" legacy dialogue arrow button is still visible "+JSON.stringify(row));
    assert(row.hintDisplay==="none"&&row.progressDisplay==="none",label+" narration hint/progress leaked into dialogue "+JSON.stringify(row));
    assert.strictEqual(row.nameFontSize,"8px",label+" dialogue speaker-label typography drift "+JSON.stringify(row));
    assert(parseFloat(row.textFontSize)>=12&&parseFloat(row.textFontSize)<=16.1,label+" dialogue body typography drift "+JSON.stringify(row));
  }else if(kind==="record"){
    const stageCenterX=row.stageRect.left+row.stageRect.width/2,stageCenterY=row.stageRect.top+row.stageRect.height/2;
    const layoutCenterX=row.layoutRect.left+row.layoutRect.width/2,layoutCenterY=row.layoutRect.top+row.layoutRect.height/2;
    assert(Math.abs(layoutCenterX-stageCenterX)<=8&&Math.abs(layoutCenterY-stageCenterY)<=8,label+" Receipt not centered "+JSON.stringify(row));
    assert(row.layoutRect.width<=790,label+" Receipt width drift "+JSON.stringify(row));
    assert.strictEqual(row.recordBoardDisplay,"none",label+" Story tableau still visible behind Receipt");
    assert.strictEqual(row.primaryText,"CONTINUE",label+" Receipt continuation control drift");
  }
  return row;
}
async function assertBattlePLRings(page,label){
  const rows=await page.evaluate(()=>[...document.querySelectorAll(".battle-live-power.alpha-battle-pl-radial")].map(power=>{
    const ring=power.querySelector(".alpha-battle-pl-ring"),core=ring?.querySelector(".alpha-battle-pl-core"),current=core?.querySelector("strong"),maximum=core?.querySelector("small"),tag=core?.querySelector("em");
    const rr=n=>{const r=n?.getBoundingClientRect();return r?{left:r.left,top:r.top,width:r.width,height:r.height}:null;};
    const ringRect=rr(ring),currentRect=rr(current);
    const centerDelta=ringRect&&currentRect?{
      x:Math.abs((ringRect.left+ringRect.width/2)-(currentRect.left+currentRect.width/2)),
      y:Math.abs((ringRect.top+ringRect.height/2)-(currentRect.top+currentRect.height/2))
    }:null;
    const contained=!!(ringRect&&currentRect&&currentRect.left>=ringRect.left+7&&currentRect.top>=ringRect.top+7&&currentRect.left+currentRect.width<=ringRect.left+ringRect.width-7&&currentRect.top+currentRect.height<=ringRect.top+ringRect.height-7);
    return{className:power.className,ring:!!ring,core:!!core,current:current?.textContent?.trim()||"",maximum:maximum?.textContent?.trim()||"",tag:tag?.textContent?.trim()||"",fill:ring?.style.getPropertyValue("--battle-pl-fill")||"",centerDelta,contained};
  }));
  assert.strictEqual(rows.length,2,label+" expected two active radial PL rings "+JSON.stringify(rows));
  for(const row of rows){
    assert(row.ring&&row.core&&/^\d+$/.test(row.current),label+" radial PL core corrupted "+JSON.stringify(row));
    assert(/^\/\s*\d+$/.test(row.maximum),label+" radial PL maximum corrupted "+JSON.stringify(row));
    assert.strictEqual(row.tag,"BATTLE PL",label+" radial PL label drift");
    assert(row.fill.endsWith("%"),label+" radial PL fill missing");
    assert(row.contained,label+" PL number escapes inner circle "+JSON.stringify(row));
    assert(row.centerDelta&&row.centerDelta.x<=14&&row.centerDelta.y<=12,label+" PL number materially off-center inside circle "+JSON.stringify(row));
  }
  return rows;
}
async function waitBeat(page,id){
  await page.waitForFunction(({scene,id})=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId===id,{scene:SCENE,id},{timeout:12000});
}
async function assertBackdrop(page,expected,label){
  await page.waitForFunction(expectedPath=>{
    const layer=document.getElementById("story-scene-presentation-layer");
    const stage=layer?.querySelector(".sc-chronicle-stage")||layer?.querySelector(".sc-story-stage");
    const resolved=typeof resolveStorySceneBoardBackdropPath==="function"?resolveStorySceneBoardBackdropPath():null;
    return resolved===expectedPath&&stage?.dataset.scSceneBoardBackdrop==="dedicated"&&String(stage?.style.getPropertyValue("--sc-scene-board-backdrop")||"").includes(expectedPath);
  },expected,{timeout:8000});
  const actual=await page.evaluate(()=>{
    const layer=document.getElementById("story-scene-presentation-layer");
    const stage=layer?.querySelector(".sc-chronicle-stage")||layer?.querySelector(".sc-story-stage");
    return{
      beatId:getActiveStorySceneRuntime()?.beatId||null,
      resolved:typeof resolveStorySceneBoardBackdropPath==="function"?resolveStorySceneBoardBackdropPath():null,
      dedicated:stage?.dataset.scSceneBoardBackdrop||null,
      css:stage?.style.getPropertyValue("--sc-scene-board-backdrop")||""
    };
  });
  assert.strictEqual(actual.resolved,expected,label+" backdrop resolver drift");
  assert.strictEqual(actual.dedicated,"dedicated",label+" dedicated backdrop flag missing");
  assert(actual.css.includes(expected),label+" live backdrop CSS drift "+JSON.stringify(actual));
  return actual;
}
async function clickContinue(page){
  const before=await info(page);
  assert(before.rootVisible&&!before.battleVisible,"Story continue surface invalid @ "+before.beatId);
  assert.notStrictEqual(before.mode,"choice","continue called on choice "+before.beatId);
  const root=page.locator("#story-scene-presentation-layer");
  const button=root.locator(".sc-chronicle-primary").first();
  if(await button.count()&&await button.isVisible())await button.click();
  else{
    const stage=root.locator(".sc-chronicle-stage,.sc-story-stage").first();
    await stage.waitFor({state:"visible",timeout:8000});
    await stage.click({position:{x:30,y:30}});
  }
  await page.waitForFunction(old=>{
    const rt=getActiveStorySceneRuntime();
    const root=document.getElementById("story-scene-presentation-layer");
    const text=root?.querySelector(".sc-story-text")?.textContent?.trim()||"";
    return !rt||rt.beatId!==old.beatId||text!==old.text;
  },{beatId:before.beatId,text:before.text},{timeout:8000});
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
  const trace=[];
  for(let i=0;i<max;i++){
    const row=await info(page);
    trace.push({sceneId:row.sceneId,beatId:row.beatId,mode:row.mode,text:row.text,choices:row.choices,localContext:row.localContext});
    if(row.sceneId!==SCENE)throw new Error("scene drift while seeking "+target+" "+JSON.stringify({row,trace:trace.slice(-12)}));
    if(row.beatId===target)return row;
    if(row.mode==="choice")throw new Error("unexpected choice before "+target+" @ "+row.beatId+" "+JSON.stringify({choices:row.choices,trace:trace.slice(-12)}));
    if(row.mode==="battle_transition")throw new Error("unexpected Battle before "+target+" @ "+row.beatId+" "+JSON.stringify({trace:trace.slice(-12)}));
    if(row.mode==="resolver")await advanceResolver(page);else await clickContinue(page);
  }
  throw new Error("continueTo guard exceeded "+target+" "+JSON.stringify({trace:trace.slice(-12)}));
}
async function choose(page,label,expected=null){
  const before=await info(page);
  assert.strictEqual(before.mode,"choice","choice requested outside choice beat "+before.beatId);
  assert(before.choices.includes(label),"missing choice "+label+" @ "+before.beatId+" "+JSON.stringify(before.choices));
  const button=page.locator("#story-scene-presentation-layer").locator(".sc-story-choice").filter({hasText:label});
  assert.strictEqual(await button.count(),1,"choice cardinality "+label);
  assert.strictEqual((await button.first().textContent()).trim(),label,"choice text drift "+label);
  await button.first().click();
  await page.waitForFunction(old=>getActiveStorySceneRuntime()?.beatId!==old,before.beatId,{timeout:8000});
  if(expected)await waitBeat(page,expected);
}
async function shot(page,label,name,selector="#story-scene-presentation-layer"){
  const loc=page.locator(selector);await loc.waitFor({state:"visible",timeout:10000});
  await loc.screenshot({path:path.join(OUT,slug(label+"-"+name)+".png"),timeout:12000});
}
async function startToInitial(page){
  await continueTo(page,"izu_initial_choice");
  await assertBackdrop(page,BACKDROPS.rooftop,"THE TRAIL");
  assert.deepStrictEqual((await info(page)).choices,["TAKE THE OBVIOUS TRAIL","LOOK FOR SOMETHING BETTER","WORK WITH THE OTHERS","FORGET THE TRAIL — WHERE ARE THEY GOING?"]);
}
async function toSplit(page,opening){
  await startToInitial(page);await choose(page,opening);
  await continueTo(page,"izu_split_choice");
  await assertBackdrop(page,BACKDROPS.mainStreet,"THE SPLIT");
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
      ryo:Number(playerData.ryo)||0,
      rewardReceipts:rows.filter(r=>r&&["origin_completion_reward","origin_battle_reward"].includes(r.type)).map(r=>JSON.parse(JSON.stringify(r))),
      developmentReceipts:rows.filter(r=>r&&r.type==="discipline_development").map(r=>JSON.parse(JSON.stringify(r))),
      specialEvidence:Array.isArray(playerData.specialJoninContextualEvidence)?JSON.parse(JSON.stringify(playerData.specialJoninContextualEvidence)):[],
      stamina:typeof getCharacterDisciplineProgression==="function"?JSON.parse(JSON.stringify(getCharacterDisciplineProgression("academy_izuno","stamina"))):null,
      bodyText:document.body.innerText||""
    };
  },{ids:[TRACKING,INTERCEPT,COOP,ROGUE_OCC,RIVER]});
}
async function finishFromCurrent(page,label,{reflectionBeat,reflection,choices,battleRyo=0,river=false}){
  await continueTo(page,reflectionBeat);
  assert.deepStrictEqual((await info(page)).choices,choices,label+" route-relative reflection choices drift");
  await shot(page,label,"reflection");
  await choose(page,reflection,"izu_close_1");
  await assertBackdrop(page,BACKDROPS.mainStreet,label+" ORIGIN CLOSE");
  const closeStart=await info(page);
  assert.strictEqual(closeStart.text,"Wasabi leaves the training ground and finds the pursuit target walking ahead with one of the Academy students.",label+" Origin Close setup drift");
  assert(!closeStart.text.includes("The exercise is over."),label+" retired Origin Close leaked");
  await continueTo(page,"izu_receipt");
  const receipt=await info(page);
  assert.strictEqual(receipt.cueKind,"record",label+" Chronicle Receipt presentation mode missing");
  assert.strictEqual(receipt.speaker,"CHRONICLE RECEIPT",label+" Chronicle Receipt heading missing");
  await assertStoryPresentationBenchmark(page,"record",label+" Chronicle Receipt");
  for(const heading of ["YOUR ORIGIN","ACADEMY WASABI IZUNO","RECORDED IN YOUR CHRONICLE","YOUR DECISIONS","WHAT HAPPENED","HISTORY CREATED","REWARDS"]){
    assert(receipt.text.includes(heading),label+" Chronicle Receipt missing "+heading);
  }
  assert(receipt.text.includes("Origin Starting Purse: +100 Ryō."),label+" Chronicle Receipt missing committed starting purse");
  assert.strictEqual(receipt.text.includes("Rogue Genin Battle Victory: +50 Ryō."),Number(battleRyo)===50,label+" Battle reward Receipt projection drift");
  assert.strictEqual(receipt.text.includes("Stamina Development: +1."),river===true,label+" River development Receipt projection drift");
  for(const forbidden of ["occ_origin_","sjctx","specialistLevel","independentSourceId","significance","Chronicle Engine"])assert(!receipt.text.includes(forbidden),label+" Receipt leaked hidden machinery "+forbidden);
  const committed=await history(page);
  assert.strictEqual(committed.prologueCompleted,true,label+" Origin completion did not commit before Receipt projection");
  const purse=committed.rewardReceipts.filter(r=>r.rewardSourceId===PURSE_SOURCE);
  assert.strictEqual(purse.length,1,label+" starting purse missing/duplicated at Receipt");
  assert.strictEqual(purse[0].ryo,100,label+" starting purse amount drift");
  const battleCash=committed.rewardReceipts.filter(r=>r.rewardSourceId===BATTLE_REWARD_SOURCE);
  assert.strictEqual(battleCash.length,Number(battleRyo)===50?1:0,label+" Battle cash receipt count drift");
  assert(!committed.rewardReceipts.some(r=>r.actorVariantId===WASABI&&Number(r.ryo)===25),label+" retired +25 route cash returned");
  const beforeRepeat=committed.ryo;
  const repeat=await page.evaluate(()=>completeChronicleOriginPrologue("academy_izuno",[]));
  assert.strictEqual(repeat.success,true,label+" repeated Origin completion failed");
  assert.strictEqual(repeat.originStartingPurseIdempotent,true,label+" starting purse repeat not idempotent");
  assert.strictEqual(repeat.originStartingPurseRyoGranted,0,label+" starting purse repeated cash");
  assert.strictEqual((await history(page)).ryo,beforeRepeat,label+" repeated completion changed Ryō");
  if(river===true){
    const riverRows=committed.developmentReceipts.filter(r=>r.subjectVariantId===WASABI&&r.sourceOccurrenceId===RIVER&&r.disciplineId==="stamina");
    assert.strictEqual(riverRows.length,1,label+" River Stamina receipt missing/duplicated");
    assert.strictEqual(riverRows[0].expGranted,1,label+" River Stamina amount drift");
  }
  assert.strictEqual(receipt.actors.length,0,label+" Chronicle Receipt incorrectly stages Story actors");
  assert.strictEqual(receipt.performanceLabels.filter(x=>x==="CHRONICLE RECEIPT").length,1,label+" duplicate Chronicle Receipt labels");
  await shot(page,label,"chronicle-receipt");
  await clickContinue(page);
  await page.waitForFunction(()=>!getActiveStorySceneRuntime(),null,{timeout:12000});
  await page.waitForFunction(()=>ensurePlayerAcquisitionState().chronicleOrigin?.prologueCompleted===true,null,{timeout:12000});
  await page.waitForFunction(()=>/YOUR CHRONICLE BEGINS/i.test(document.body.innerText||""),null,{timeout:12000});
  const h=await history(page);
  assert.strictEqual(h.prologueCompleted,true,label+" Origin incomplete");
  assert.strictEqual(h.teamFormationRequired,true,label+" Team Formation not required");
  assert.strictEqual(h.activeStory,null,label+" Story still active");
  assert(/YOUR CHRONICLE BEGINS/i.test(h.bodyText),label+" shared continuity missing");
  return h;
}
function reflectionFixture(route,rogueChoice=null){
  if(route==="TAKE THE RIVER")return{reflectionBeat:"izu_reflect_river",choices:["I caught them the hard way.","Next time I beat that time.","Give them a bigger head start.","I want the rematch."],reflection:"I want the rematch.",river:true};
  if(route==="CUT FOR THE INTERCEPT")return{reflectionBeat:"izu_reflect_intercept",choices:["Why chase from behind if I can get there first?","The route mattered more than the trail.","I trusted my read. It worked.","Next time I cut them off sooner."],reflection:"I trusted my read. It worked.",river:false};
  if(route==="FOLLOW THE STRONGER TRAIL")return{reflectionBeat:"izu_reflect_false",choices:["They got me with that one.","I saw the trick. Just too late.","Next time I check what doesn't fit.","They'll need a better trick next time."],reflection:"They'll need a better trick next time.",river:false};
  if(rogueChoice==="CALL FOR HELP")return{reflectionBeat:"izu_reflect_call_for_help",choices:["Calling the instructor was faster.","I got the student moving.","Next time I hand it off sooner.","I can watch the chase and the people in it."],reflection:"Next time I hand it off sooner.",river:false};
  if(rogueChoice==="KEEP PURSUING")return{reflectionBeat:"izu_reflect_keep_pursuing",choices:["I chose the target.","I waited too long before I moved.","Next time I decide immediately.","Give me another shot at the chase."],reflection:"Next time I decide immediately.",river:false};
  throw new Error("missing route-relative reflection fixture "+route+" / "+rogueChoice);
}
async function runNonBattle(browser,{label,opening,route,rogueChoice=null,checks}){
  const {context,page,runtimeErrorGate}=await boot(browser,label);
  try{
    await toSplit(page,opening);
    await choose(page,route);
    const routeBackdrop={
      "TAKE THE RIVER":BACKDROPS.river,
      "FOLLOW THE STRONGER TRAIL":BACKDROPS.narrowYard,
      "CHECK THE SHOUTING":BACKDROPS.alley,
      "CUT FOR THE INTERCEPT":BACKDROPS.mainStreet
    }[route];
    assert(routeBackdrop,label+" route backdrop fixture missing");
    await assertBackdrop(page,routeBackdrop,label+" route "+route);
    if(route==="TAKE THE RIVER"){
      await continueTo(page,"izu_river_18");
      const riverTarget=await info(page);
      assert.strictEqual(riverTarget.text,"The target appears ahead where the path curves back toward extraction.",label+" river target proof cue drift");
      assert.deepStrictEqual(riverTarget.actors.map(x=>[x.id,x.image]),[
        ["academy_izuno","Assets/Academy Student/academy_izuno.png"],
        ["wasabi_origin_pursuit_target_01","NPC/pursuit_target.png"]
      ],label+" pursuit target missing from live river chase");
      await shot(page,label,"river-target-visible");
      await continueTo(page,"izu_finish_river_4");
      const riverFinish=await info(page);
      assert.strictEqual(riverFinish.text,"You took the long route.",label+" river direct-catch finish proof cue drift");
      assert.deepStrictEqual(riverFinish.actors.map(x=>[x.id,x.image]),[
        ["academy_izuno","Assets/Academy Student/academy_izuno.png"],
        ["wasabi_origin_pursuit_target_01","NPC/pursuit_target.png"],
        ["wasabi_origin_proctor","NPC/proctor.png"]
      ],label+" pursuit target missing from river extraction finish");
      await shot(page,label,"river-target-finish-visible");
    }
    if(route==="CHECK THE SHOUTING"){
      await continueTo(page,"izu_rogue_choice");
      assert.deepStrictEqual((await info(page)).choices,["STEP IN","CALL FOR HELP","KEEP PURSUING"]);
      await shot(page,label,"rogue-choice");
      await choose(page,rogueChoice);
    }
    const reflect=reflectionFixture(route,rogueChoice);
    await continueTo(page,reflect.reflectionBeat);
    await assertBackdrop(page,BACKDROPS.training,label+" AFTER");
    const before=await history(page);
    await checks(page,before);
    const completed=await finishFromCurrent(page,label,{...reflect,battleRyo:0});
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
    environmentPath:currentBattle.environmentPath||null,presentationEnvironmentPath:currentBattle.presentationEnvironmentPath||null,
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
  assert.strictEqual(battle.environmentPath,BACKDROPS.alley,label+" Battle environment drift");
  assert.strictEqual(battle.presentationEnvironmentPath,BACKDROPS.alley,label+" Battle presentation environment drift");
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
  await assertBattlePLRings(page,label+" initial Battle");
  await shot(page,label,"battle",".alpha-code-battle-stage");
  return battle;
}
async function reloadBattle(page,battle,label){
  await page.reload({waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!globalThis.SC_ACADEMY_WASABI_ROGUE_BATTLE_343,null,{timeout:30000});
  try{
    await page.waitForFunction(id=>currentBattle&&currentBattle.battleId===id&&currentBattle.wasabi343,battle.battleId,{timeout:20000});
  }catch(error){
    const trace=await page.evaluate(expectedBattleId=>{
      let saved=null;
      try{
        const raw=sessionStorage.getItem("shinobiTestState");
        saved=raw?JSON.parse(raw):null;
      }catch(parseError){
        saved={parseError:String(parseError)};
      }
      const b=typeof currentBattle==="object"&&currentBattle?currentBattle:null;
      return{
        expectedBattleId,
        readyState:document.readyState,
        adapterLoaded:!!globalThis.SC_ACADEMY_WASABI_ROGUE_BATTLE_343,
        saveHook:typeof saveTestState==="function"?saveTestState.name:null,
        restoreHook:typeof restoreTestState==="function"?restoreTestState.name:null,
        live:b?{
          battleId:b.battleId||null,
          encounterId:b.encounterId||null,
          battleConfigId:b.battleConfigId||null,
          active:b.active===true,
          battleOver:b.battleOver===true,
          hasWasabi343:!!b.wasabi343,
          wasabi343:b.wasabi343||null,
          playerSlots:(b.deployment?.player?.slots||[]).map(s=>s.participantId).filter(Boolean),
          enemySlots:(b.deployment?.enemy?.slots||[]).map(s=>s.participantId).filter(Boolean)
        }:null,
        saved:saved?{
          keys:Object.keys(saved).sort(),
          battleId:saved.battleId||null,
          encounterId:saved.encounterId||null,
          battleConfigId:saved.battleConfigId||null,
          wasabi343BattleActive:saved.wasabi343BattleActive===true,
          wasabi343BattleId:saved.wasabi343BattleId||null,
          wasabi343:saved.wasabi343||null
        }:null,
        launchStore:playerData&&playerData.wasabi343BattleLaunches||null
      };
    },battle.battleId);
    throw new Error(label+" Wasabi Battle reload restore timeout "+JSON.stringify(trace)+"\n"+String(error&&error.stack||error));
  }
  await releaseFrontDoor(page);
  await page.evaluate(()=>{try{if(currentBattle?.active)openOverlay("combat");}catch(_){ }});
  await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});
  const after=await page.evaluate(()=>({
    battleId:currentBattle.battleId,
    environmentPath:currentBattle.environmentPath||null,presentationEnvironmentPath:currentBattle.presentationEnvironmentPath||null,
    playerSlots:(currentBattle.deployment?.player?.slots||[]).map(s=>s.participantId).filter(Boolean),
    enemySlots:(currentBattle.deployment?.enemy?.slots||[]).map(s=>s.participantId).filter(Boolean),
    meta:JSON.parse(JSON.stringify(currentBattle.wasabi343||null)),
    store:JSON.parse(JSON.stringify(playerData.wasabi343BattleLaunches||{}))
  }));
  assert.strictEqual(after.battleId,battle.battleId,label+" Battle occurrence changed on reload");
  assert.strictEqual(after.environmentPath,BACKDROPS.alley,label+" reloaded Battle environment drift");
  assert.strictEqual(after.presentationEnvironmentPath,BACKDROPS.alley,label+" reloaded Battle presentation environment drift");
  assert.deepStrictEqual(after.playerSlots,[WASABI]);assert.deepStrictEqual(after.enemySlots,[ROGUE]);
  await assertBattlePLRings(page,label+" reloaded Battle");
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
      const ryoBefore=Number(playerData.ryo)||0;
      currentBattle.outcome={...(currentBattle.outcome||{}),type:outcome,committed:true,completedAt:Date.now(),finishingShinobiId:outcome==="victory"?wasabi:null};
      currentBattle.battleOver=true;currentBattle.active=false;
      let projected=null,firstClaim=null,secondClaim=null;
      if(outcome==="victory"){
        projected=JSON.parse(JSON.stringify(generateBattleRewards(enemyDatabase[rogue],getPlayerCharacter(wasabi))));
        firstClaim=claimCurrentBattleRewards();
        secondClaim=claimCurrentBattleRewards();
      }
      const ryoAfter=Number(playerData.ryo)||0;
      const receipts=(playerData.activityHistory||[]).filter(row=>row&&row.rewardSourceId==="wasabi_origin_rogue_genin_battle_victory_ryo_01").map(row=>JSON.parse(JSON.stringify(row)));
      const resumed=resumeBattleCallerAfterCompletion(outcome);
      return{...resumed,rewardAudit:{ryoBefore,ryoAfter,projected,firstClaim,secondClaim,receipts}};
    }finally{globalThis.getBattleRemainingPL=prior;}
  },{outcome,wasabi:WASABI,rogue:ROGUE});
  assert(result?.success===true,label+" caller return failed "+JSON.stringify(result));
  if(outcome==="victory"){
    assert.strictEqual(result.rewardAudit.projected?.ryo,50,label+" Victory projection amount drift");
    assert.strictEqual(result.rewardAudit.projected?.exp,0,label+" Victory generic EXP returned");
    assert.deepStrictEqual(result.rewardAudit.projected?.items||[],[],label+" Victory fixed loot returned");
    assert.strictEqual(result.rewardAudit.firstClaim,true,label+" Victory CLAIM failed");
    assert.strictEqual(result.rewardAudit.secondClaim,false,label+" duplicate Victory CLAIM succeeded");
    assert.strictEqual(result.rewardAudit.ryoAfter-result.rewardAudit.ryoBefore,50,label+" Victory did not grant exactly +50 Ryō");
    assert.strictEqual(result.rewardAudit.receipts.length,1,label+" Victory reward receipt missing/duplicated");
  }else{
    assert.strictEqual(result.rewardAudit.ryoAfter-result.rewardAudit.ryoBefore,0,label+" Defeat granted Battle cash");
    assert.strictEqual(result.rewardAudit.receipts.length,0,label+" Defeat wrote Victory reward receipt");
  }
  await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:12000});
  await waitBeat(page,"izu_rogue_step_in_return_1");
  await assertBackdrop(page,BACKDROPS.alley,label+" post-Battle alley return");
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
    await clickContinue(page);
    await waitBeat(page,"izu_finish_secondary_1");
    await assertBackdrop(page,BACKDROPS.training,label+" Scene 5 convergence");
    await continueTo(page,"izu_reflect_step_in");
    await assertBackdrop(page,BACKDROPS.training,label+" AFTER");
    let h=await history(page);
    assert.strictEqual(h.exact[ROGUE_OCC].length,1,label+" IZU-04 missing/duplicated");
    assert.strictEqual(h.exact[ROGUE_OCC][0].fact?.rogueGeninResponse,"intervene");
    assert.strictEqual(h.exact[ROGUE_OCC][0].fact?.rogueGeninInterruptionResolvedByWasabiAction,true);
    assert.deepStrictEqual(h.exact[ROGUE_OCC][0].fact?.battleOccurrenceIds,[battle.battleId]);
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>getActiveStorySceneRuntime()?.sceneId==="origin_academy_izuno_prologue"&&getActiveStorySceneRuntime()?.beatId==="izu_reflect_step_in",null,{timeout:20000});
    await releaseFrontDoor(page);
    await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:12000});
    h=await history(page);
    assert.strictEqual(h.exact[ROGUE_OCC].length,1,label+" reload duplicated IZU-04");
    const completed=await finishFromCurrent(page,label,{reflectionBeat:"izu_reflect_step_in",choices:["I'd step in again.","Next time I end the fight faster.","The target got away. I still finished what I started.","I need to know how much time a fight really costs."],reflection:"The target got away. I still finished what I started.",battleRyo:outcome==="victory"?50:0,river:false});
    const errors=await runtimeErrorGate.assertClean(label);
    return{label,battle,reloaded,returnedOutcome:outcome,completed,errors};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:false}),results=[];
  try{
    results.push(await runNonBattle(browser,{
      label:"obvious-river",opening:"TAKE THE OBVIOUS TRAIL",route:"TAKE THE RIVER",
      checks:async(_page,h)=>{assert.strictEqual(h.exact[TRACKING].length,1);assert.strictEqual(h.exact[TRACKING][0].fact?.pursuitOutcome,"direct_catch");assert.strictEqual(h.exact[RIVER].length,1);assert.strictEqual(h.exact[RIVER][0].fact?.sustainedEnduranceExertion,true);assert.strictEqual(h.developmentReceipts.filter(r=>r.sourceOccurrenceId===RIVER&&r.disciplineId==="stamina").length,1);assert.strictEqual(h.exact[ROGUE_OCC].length,0);}
    }));
    results.push(await runNonBattle(browser,{
      label:"better-stronger",opening:"LOOK FOR SOMETHING BETTER",route:"FOLLOW THE STRONGER TRAIL",
      checks:async(_page,h)=>{assert.strictEqual(h.exact[TRACKING][0].fact?.reliableEnvironmentalTrackingEstablished,true);assert.strictEqual(h.exact[TRACKING][0].fact?.falseTrailCorrectlyDiscovered,true);assert.strictEqual(h.exact[TRACKING][0].fact?.academyTrackingRecommendation,true);assert.strictEqual(h.exact[TRACKING][0].fact?.pursuitOutcome,"false_trail_discovered");const tracker=h.specialEvidence.find(r=>r.qualificationId==="reconnaissance.tracker_nin"&&r.independentSourceId===TRACKING),ci=h.specialEvidence.find(r=>r.qualificationId==="intelligence.counter_intelligence_analyst"&&r.independentSourceId===TRACKING);assert(tracker?.tags?.includes("reconnaissance.tracker_nin:trail_analysis"));assert(ci?.tags?.includes("intelligence.counter_intelligence_analyst:deception_detection"));assert.strictEqual(tracker.significance,1);assert.strictEqual(ci.significance,1);assert.strictEqual(tracker.specialistLevel,false);assert.strictEqual(ci.specialistLevel,false);assert(!ci.tags.includes("intelligence.counter_intelligence_analyst:counter_intelligence_response"));}
    }));
    results.push(await runNonBattle(browser,{
      label:"predict-intercept",opening:"FORGET THE TRAIL — WHERE ARE THEY GOING?",route:"CUT FOR THE INTERCEPT",
      checks:async(_page,h)=>{assert.strictEqual(h.exact[INTERCEPT][0].fact?.interceptReachedByPrediction,true);assert.strictEqual(h.exact[INTERCEPT][0].fact?.academyTrackingRecommendation,true);assert.strictEqual(h.exact[INTERCEPT][0].fact?.pursuitOutcome,"intercept_before_extraction");const tracker=h.specialEvidence.find(r=>r.qualificationId==="reconnaissance.tracker_nin"&&r.independentSourceId===INTERCEPT);assert(tracker?.tags?.includes("reconnaissance.tracker_nin:route_intercept_execution"));assert.strictEqual(tracker.significance,1);}
    }));
    results.push(await runNonBattle(browser,{
      label:"cooperate-call-help",opening:"WORK WITH THE OTHERS",route:"CHECK THE SHOUTING",rogueChoice:"CALL FOR HELP",
      checks:async(_page,h)=>{assert.strictEqual(h.exact[COOP][0].fact?.cooperatedWithAcademyStudents,true);assert.deepStrictEqual(h.exact[COOP][0].fact?.cooperatingParticipantRefs,["wasabi_origin_pursuit_student_roof_01","wasabi_origin_pursuit_student_street_02"]);assert.strictEqual(h.exact[ROGUE_OCC].length,1);assert.strictEqual(h.exact[ROGUE_OCC][0].fact?.rogueGeninResponse,"call_for_help");assert.strictEqual(h.exact[ROGUE_OCC][0].fact?.affectedStudentPhysicallyRemoved,true);assert.deepStrictEqual(h.exact[ROGUE_OCC][0].fact?.battleOccurrenceIds,[]);const strategic=h.specialEvidence.find(r=>r.qualificationId==="intelligence.strategic_intelligence_analyst"&&r.independentSourceId===COOP),comms=h.specialEvidence.find(r=>r.qualificationId==="communications_and_cryptography.battlefield_communications_specialist"&&r.independentSourceId===COOP),extract=h.specialEvidence.find(r=>r.qualificationId==="covert_operations.extraction_specialist"&&r.independentSourceId===ROGUE_OCC);assert(strategic?.tags?.includes("intelligence.strategic_intelligence_analyst:multi_source_analysis"));assert(comms?.tags?.includes("communications_and_cryptography.battlefield_communications_specialist:communications_planning"));assert(extract?.tags?.includes("covert_operations.extraction_specialist:subject_recovery"));assert.strictEqual(strategic.significance,1);assert.strictEqual(comms.significance,1);assert.strictEqual(extract.significance,1);assert.strictEqual(strategic.independentSourceId,comms.independentSourceId);assert(!strategic.tags.includes("intelligence.strategic_intelligence_analyst:strategic_assessment"));assert(!comms.tags.includes("communications_and_cryptography.battlefield_communications_specialist:communications_continuity"));assert(!extract.tags.includes("covert_operations.extraction_specialist:extraction_planning"));}
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
      exactSourceOccurrences:[TRACKING,INTERCEPT,COOP,ROGUE_OCC,RIVER],
      strictOneVsOneBattle:true,battleSaveReload:true,bothBattleOutcomesReturn:true,
      fixedBattleVictoryRyo:50,sharedOriginStartingPurseRyo:100,claimSeparateFromContinue:true,exactBackdropContract:true,postBattleAlleyReturn:true,exactBattleEnvironment:true,
      acceptedProgressionMappings409:true,riverStaminaDevelopment:true,visibleWasabiInstructorCards:true,visiblePursuitTargetOnRiverAndFinish:true,speakerOwnedDialogue:true,speakerLinkedDialoguePointer:true,kakashiNarrationGeometry:true,singleNarrationLabel:true,originChronicleReceipt:true,kakashiReceiptGeometry:true,radialPLCoreCentered:true,
      rewardSpectrum409Consumed:true,originToChronicleBegins:true,browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({summary,results},null,2));
    console.log(JSON.stringify(summary,null,2));
  }catch(error){
    try{fs.writeFileSync(path.join(OUT,"failure.txt"),String(error&&error.stack||error));}catch(_){}
    console.error(error&&error.stack||error);process.exitCode=1;
  }finally{await browser.close();}
})();
