#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_576_BASE_URL||"http://127.0.0.1:8080/index.html";
const MODULE_URL=new URL("runtime/alpha-discipline-curriculum-profiles-57600.js",BASE).href;
const OUT=process.env.ISSUE_576_REAL_SURFACE_OUT||"artifacts/issue-576-expert-master-curriculum-real-surface";
fs.mkdirSync(OUT,{recursive:true});

async function waitBaseRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_CHRONICLE_STATE_MANIFEST_43600&&
    globalThis.SC_PHASE2_DISCIPLINE_STAT_GROWTH_44800&&
    globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110&&
    typeof globalThis.commitDisciplineDevelopment448==="function"&&
    typeof globalThis.openKonohaExamFromVillage==="function"&&
    typeof globalThis.openKonohaPracticalFromVillage==="function"
  ),null,{timeout:30000});
}
async function release(page){
  await page.evaluate(()=>{
    try{releaseAlphaFrontDoor33300?.();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function injectCandidate(page){
  const before=await page.evaluate(()=>({
    loaded:!!globalThis.SC_DISCIPLINE_CURRICULUM_PROFILES_57600,
    productionScript:[...document.scripts].some(script=>String(script.src||"").includes("alpha-discipline-curriculum-profiles-57600.js"))
  }));
  assert.strictEqual(before.loaded,false,"#576 unexpectedly production-loaded before QA injection");
  assert.strictEqual(before.productionScript,false,"production loader unexpectedly includes #576 before integration tail");
  await page.evaluate(()=>{globalThis.__qa576RealSurfaceTrainingWriter=globalThis.performDisciplineTraining;});
  await page.addScriptTag({url:MODULE_URL});
  await page.waitForFunction(()=>!!globalThis.SC_DISCIPLINE_CURRICULUM_PROFILES_57600,null,{timeout:10000});
  const after=await page.evaluate(()=>({
    diagnostics:runDisciplineCurriculumProfiles576Diagnostics(),
    trainingWriterPreserved:performDisciplineTraining===globalThis.__qa576RealSurfaceTrainingWriter
  }));
  assert.strictEqual(after.diagnostics.pass,true,JSON.stringify(after.diagnostics));
  assert.strictEqual(after.trainingWriterPreserved,true,"#576 replaced Training Grounds writer");
  return{before,after};
}
async function setupTeam(page){
  return page.evaluate(()=>{
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma","qa576_real_surface_origin");
    const completed=completeChronicleOriginPrologue("academy_menma",["qa576_real_surface_complete"]);
    const snapshot=getAcademyTeamFormationSnapshot();
    const expected=["academy_hinata","academy_kakashi"];
    if(!expected.every(id=>snapshot.eligibleCandidateVariantIds.includes(id)))return{error:"expected_candidates_missing",eligible:snapshot.eligibleCandidateVariantIds};
    selectAcademyTeamFormationTeammate(1,expected[0]);
    selectAcademyTeamFormationTeammate(2,expected[1]);
    const formed=confirmAcademyTeamFormation("qa576_real_surface_team",expected);
    const continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({sandboxPopupSeen:true,practicalTipSeen:true,examsTipSeen:true},{save:true});
    savePlayerData();
    return{selected,completed,formed,continued,team:getChronicleCurrentTeam43600()};
  });
}
async function setDiscipline(page,characterId,disciplineId,stat,exp){
  const result=await page.evaluate(({characterId,disciplineId,stat,exp})=>{
    const c=getPlayerCharacter(characterId),p=getCharacterDisciplineProgression(characterId,disciplineId);
    if(!c||!p)return{error:"subject_or_progression_missing"};
    c.stats[disciplineId]=stat;p.exp=exp;p.level=Math.max(1,Number(p.level)||1);p.statLevelApplied=Math.max(1,Number(p.statLevelApplied)||1);
    savePlayerData();
    return{stat:c.stats[disciplineId],exp:p.exp};
  },{characterId,disciplineId,stat,exp});
  assert(!result.error,JSON.stringify(result));
  return result;
}
async function rootText(page){return page.locator("#konoha-activity-screen").innerText();}
async function inventory(page,scope="body"){
  return page.locator(scope).evaluate(root=>[...root.querySelectorAll("button,a,[role='button'],[onclick],[tabindex]")].map((el,index)=>({
    index,tag:el.tagName,text:(el.innerText||el.textContent||"").trim().replace(/\s+/g," "),aria:el.getAttribute("aria-label")||"",title:el.getAttribute("title")||"",className:String(el.className||""),display:getComputedStyle(el).display,visibility:getComputedStyle(el).visibility
  })).filter(row=>row.display!=="none"&&row.visibility!=="hidden"));
}
async function firstVisibleClickable(page,regex,scope="body"){
  const nodes=page.locator(`${scope} button,${scope} a,${scope} [role='button'],${scope} [onclick],${scope} [tabindex]`);
  const count=await nodes.count();
  for(let i=0;i<count;i++){
    const node=nodes.nth(i);if(!(await node.isVisible().catch(()=>false)))continue;
    const label=await node.evaluate(el=>[(el.innerText||el.textContent||"").trim(),el.getAttribute("aria-label")||"",el.getAttribute("title")||""].join(" ").replace(/\s+/g," "));
    if(regex.test(label))return node;
  }
  throw new Error(`No visible clickable matched ${regex}; inventory=${JSON.stringify(await inventory(page,scope))}`);
}
async function selectDisciplineCard(page,id){
  const card=page.locator(`#konoha-activity-screen .alpha-activity-discipline[data-discipline-id='${id}']`).first();
  await card.waitFor({state:"visible",timeout:10000});await card.click();
  await page.waitForTimeout(50);
  const cls=await card.getAttribute("class")||"";
  assert(/selected|active/i.test(cls),`discipline ${id} did not visibly select: ${cls}`);
}
async function selectBatch(page,size){
  const buttons=page.locator("#konoha-activity-screen .alpha-activity-batch");
  const count=await buttons.count();let button=null;
  for(let i=0;i<count;i++){
    const candidate=buttons.nth(i);if(!(await candidate.isVisible().catch(()=>false)))continue;
    const label=(await candidate.innerText()).replace(/\s+/g,"").toLowerCase();
    if(label===`×${size}`||label===`x${size}`){button=candidate;break;}
  }
  assert(button,`No visible batch control matched x${size}; inventory=${JSON.stringify(await inventory(page,"#konoha-activity-screen"))}`);
  await button.click();await page.waitForTimeout(50);
  const state=await button.evaluate(el=>({className:String(el.className||""),pressed:el.getAttribute("aria-pressed"),selected:el.getAttribute("data-selected")}));
  const runtime=await page.evaluate(()=>({
    exam:typeof getKonohaExamBatchSize==="function"?getKonohaExamBatchSize():null,
    practical:typeof getKonohaPracticalBatchSize==="function"?getKonohaPracticalBatchSize():null
  }));
  assert(state.pressed==="true"||state.selected==="true"||/selected|active/i.test(state.className)||runtime.exam===size||runtime.practical===size,`x${size} click did not bind visible/runtime selection: ${JSON.stringify({state,runtime})}`);
  return{state,runtime};
}
async function deterministicSurfaceAction(page,host,pass,waitFor){
  const begin=await firstVisibleClickable(page,host==="exam"?/BEGIN\s+EXAM/i:/BEGIN\s+TRAINING/i,"#konoha-activity-screen");
  const before=await page.evaluate(()=>({history:(playerData.activityHistory||[]).length,ryo:Number(playerData.ryo)||0}));
  await page.evaluate(value=>{globalThis.__qa576OldRandom=Math.random;Math.random=()=>value?0.999999:0;},pass);
  try{
    await begin.click();
    if(waitFor)await page.waitForFunction(waitFor,null,{timeout:10000});
    else await page.waitForFunction(n=>(playerData.activityHistory||[]).length>n,before.history,{timeout:10000});
  }finally{
    await page.evaluate(()=>{if(globalThis.__qa576OldRandom){Math.random=globalThis.__qa576OldRandom;delete globalThis.__qa576OldRandom;}});
  }
  const after=await page.evaluate(()=>({history:(playerData.activityHistory||[]).length,ryo:Number(playerData.ryo)||0,text:document.getElementById("konoha-activity-screen")?.innerText||""}));
  assert(after.history>before.history,"visible action did not commit history");
  assert.strictEqual(after.ryo,before.ryo,"#576 curriculum surface charged Ryō");
  return{before,after};
}
async function clickSubjectNextUntil(page,name,max=4){
  for(let attempt=0;attempt<max;attempt++){
    const subject=page.locator("#konoha-activity-screen .alpha-activity-subject");
    const text=await subject.innerText();if(new RegExp(name,"i").test(text))return true;
    const buttons=subject.locator("button");
    const count=await buttons.count();assert(count>=1,`subject next control missing; inventory=${JSON.stringify(await inventory(page,"#konoha-activity-screen .alpha-activity-subject"))}`);
    let rightmost=null,right=-Infinity;
    for(let i=0;i<count;i++){
      const button=buttons.nth(i);if(!(await button.isVisible().catch(()=>false)))continue;
      const box=await button.boundingBox();if(box&&box.x>right){right=box.x;rightmost=button;}
    }
    assert(rightmost,"no visible subject navigation control");await rightmost.click();await page.waitForTimeout(80);
  }
  throw new Error(`subject ${name} not reached by visible next control`);
}
async function backToKonoha(page){
  const back=await firstVisibleClickable(page,/KONOHA/i,"#konoha-activity-screen");
  await back.click();
  await page.waitForFunction(()=>{const root=document.getElementById("konoha-activity-screen");return !root||getComputedStyle(root).display==="none"||!root.offsetParent;},null,{timeout:10000});
}
async function openFromVillage(page,kind){
  const re=kind==="exams"?/SHINOBI\s+ACADEMY/i:/PRACTICAL\s+TRAINING\s+COMPOUND/i;
  const entry=await firstVisibleClickable(page,re,"body");
  const label=await entry.evaluate(el=>[(el.innerText||el.textContent||"").trim(),el.getAttribute("aria-label")||"",el.getAttribute("title")||""].join(" ").replace(/\s+/g," "));
  await entry.dblclick();
  await page.waitForSelector(`#konoha-activity-screen[data-service-id='${kind}']`,{state:"visible",timeout:10000});
  return label;
}
async function batchMeta(page,host){
  return page.evaluate(host=>host==="exam"
    ?JSON.parse(JSON.stringify({rows:KONOHA_EXAM_ATTEMPT_STATE.lastBatch||[],meta:KONOHA_EXAM_ATTEMPT_STATE.lastBatchMeta||null}))
    :JSON.parse(JSON.stringify({rows:getKonohaPracticalAttemptState()?.lastBatch||[],meta:getKonohaPracticalAttemptState()?.lastBatchMeta||null})),host);
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});await waitBaseRuntime(page);await release(page);
    const injection=await injectCandidate(page),setup=await setupTeam(page);
    assert(!setup.error,JSON.stringify(setup));assert.strictEqual(setup.formed?.success,true);assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);

    // Bootstrap only: enter Exams with the existing router, then all curriculum interaction is visible-control driven.
    await setDiscipline(page,"academy_menma","nin",14,14);
    await page.evaluate(()=>openKonohaExamFromVillage());
    await page.waitForSelector("#konoha-activity-screen[data-service-id='exams']",{state:"visible",timeout:10000});
    await selectDisciplineCard(page,"nin");
    let text=await rootText(page);assert(/FOUNDATION DEVELOPMENT RANGE/i.test(text),"Foundation source not visible before transition");

    // Visible x5 + BEGIN EXAM must stop Foundation at 15, not silently spend into Expert.
    await selectBatch(page,5);
    await deterministicSurfaceAction(page,"exam",true,()=>getPlayerCharacter("academy_menma")?.stats?.nin===15);
    let examBatch=await batchMeta(page,"exam");
    assert.strictEqual(examBatch.rows.length,1,"visible x5 crossed Foundation ceiling instead of stopping");
    assert.strictEqual(examBatch.meta?.stoppedAtCeiling,true,"visible x5 did not report Foundation ceiling stop");
    text=await rootText(page);assert(/EXPERT NINJUTSU CURRICULUM/i.test(text),"Foundation -> Expert transition did not refresh on visible Exams surface");
    await page.screenshot({path:path.join(OUT,"01-click-x5-foundation-to-expert.png"),fullPage:true});

    // Visible subject navigation must reach Academy Kakashi and project immediate Expert Ninjutsu at canonical NIN 16.
    await clickSubjectNextUntil(page,"Kakashi");await selectDisciplineCard(page,"nin");
    text=await rootText(page);assert(/KAKASHI/i.test(text),"Kakashi not visible after subject navigation");assert(/CURRENT STAT\s*16/i.test(text),"Kakashi canonical NIN 16 not visible");assert(/EXPERT NINJUTSU CURRICULUM/i.test(text),"Kakashi immediate Expert Ninjutsu missing from visible Exams surface");
    await page.screenshot({path:path.join(OUT,"02-kakashi-immediate-expert-visible.png"),fullPage:true});

    // Return through the visible Konoha control, then re-enter Exams from the Village surface.
    await backToKonoha(page);
    await setDiscipline(page,"academy_menma","nin",29,19);
    const examsVillageLabel=await openFromVillage(page,"exams");
    await selectDisciplineCard(page,"nin");
    await selectBatch(page,10);
    await deterministicSurfaceAction(page,"exam",true,()=>getPlayerCharacter("academy_menma")?.stats?.nin===30);
    examBatch=await batchMeta(page,"exam");
    assert.strictEqual(examBatch.rows.length,1,"visible x10 silently converted Expert remainder into Master");assert.strictEqual(examBatch.meta?.stoppedAtCeiling,true);
    text=await rootText(page);assert(/MASTER NINJUTSU CURRICULUM/i.test(text),"Expert -> Master transition did not refresh on visible Exams surface");
    await page.screenshot({path:path.join(OUT,"03-click-x10-expert-to-master.png"),fullPage:true});

    // Visible Master x10 must stop at 50 and present source exhaustion without a fake global cap.
    await backToKonoha(page);await setDiscipline(page,"academy_menma","nin",49,29);await openFromVillage(page,"exams");await selectDisciplineCard(page,"nin");await selectBatch(page,10);
    await deterministicSurfaceAction(page,"exam",true,()=>getPlayerCharacter("academy_menma")?.stats?.nin===50);
    examBatch=await batchMeta(page,"exam");assert.strictEqual(examBatch.rows.length,1);assert.strictEqual(examBatch.meta?.stoppedAtCeiling,true);
    text=await rootText(page);assert(/MASTER CURRICULUM SOURCE EXHAUSTED/i.test(text),"visible Master exhaustion copy missing");assert(/not a global Stat cap/i.test(text),"visible exhaustion does not preserve uncapped Stat truth");assert(!/MAX STAT|STAT COMPLETE|DISCIPLINE MAXED/i.test(text),"visible surface manufactures global cap truth");
    await page.screenshot({path:path.join(OUT,"04-click-master-source-exhausted.png"),fullPage:true});

    // Visible Village -> Practical -> Genjutsu -> x1 -> BEGIN TRAINING must commit Expert Genjutsu through the shared #448 writer.
    await backToKonoha(page);await setDiscipline(page,"academy_menma","gen",16,0);
    const practicalVillageLabel=await openFromVillage(page,"practical");
    await selectDisciplineCard(page,"gen");text=await rootText(page);assert(/EXPERT GENJUTSU CURRICULUM/i.test(text),"Expert Genjutsu missing from visible Practical surface");
    await selectBatch(page,1);
    await deterministicSurfaceAction(page,"practical",true);
    const practicalReceipt=await page.evaluate(()=>{
      const rows=playerData.activityHistory||[];
      return rows.filter(row=>row?.type==="discipline_development"&&row?.activityProfileId==="discipline_curriculum_gen_expert_v1").slice(-1)[0]||null;
    });
    assert(practicalReceipt,"visible Practical Expert Genjutsu did not commit shared #448 provenance");assert.strictEqual(Number(practicalReceipt.grantedExp),2);
    await page.screenshot({path:path.join(OUT,"05-click-practical-gen-expert-result.png"),fullPage:true});

    // Save/reload must preserve the click-authored provenance exactly; candidate remains QA-injected only after reload.
    const beforeReload=await page.evaluate(()=>{savePlayerData();const rows=playerData.activityHistory||[];return{count:rows.filter(row=>row?.activityProfileId==="discipline_curriculum_gen_expert_v1").length,gen:getPlayerCharacter("academy_menma").stats.gen,exp:getCharacterDisciplineProgression("academy_menma","gen").exp};});
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});await waitBaseRuntime(page);await release(page);await injectCandidate(page);
    const afterReload=await page.evaluate(()=>{const rows=playerData.activityHistory||[];return{count:rows.filter(row=>row?.activityProfileId==="discipline_curriculum_gen_expert_v1").length,gen:getPlayerCharacter("academy_menma").stats.gen,exp:getCharacterDisciplineProgression("academy_menma","gen").exp};});
    assert.deepStrictEqual(afterReload,beforeReload,"click-authored Expert provenance/stat state changed across reload");

    await gate.assertClean("issue-576-expert-master-curriculum-real-surface-browser");
    const summary={
      pass:true,issue:576,candidateMode:"isolated_qa_injection_real_surface",productionLoaderUntouched:true,
      villageExamEntryClicked:true,villageExamLabel:examsVillageLabel,villagePracticalEntryClicked:true,villagePracticalLabel:practicalVillageLabel,
      disciplineCardsClicked:true,subjectNavigationClicked:true,beginExamClicked:true,beginTrainingClicked:true,
      x5FoundationStopsAt15:true,kakashiImmediateExpertVisible:true,x10ExpertStopsAt30:true,x10MasterStopsAt50:true,
      masterExhaustionVisibleNotGlobalCap:true,practicalGenExpertClickCommit:true,clickProvenanceSaveReload:true,
      trainingGroundsWriterPreserved:injection.after.trainingWriterPreserved,browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2));
    fs.writeFileSync(path.join(OUT,"final-clickable-inventory.json"),JSON.stringify(await inventory(page),null,2));
    console.log(JSON.stringify(summary));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
