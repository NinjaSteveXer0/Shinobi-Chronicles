#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_576_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_576_PRODUCTION_OUT||"artifacts/issue-576-production-integration";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_CHRONICLE_STATE_MANIFEST_43600&&
    globalThis.SC_PHASE2_DISCIPLINE_STAT_GROWTH_44800&&
    globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110&&
    globalThis.SC_DISCIPLINE_CURRICULUM_PROFILES_57600&&
    typeof globalThis.resolveDisciplineCurriculumProfile576==="function"&&
    typeof globalThis.executeKonohaExamBatch==="function"&&
    typeof globalThis.executeKonohaPracticalAttempt==="function"
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
async function setupTeam(page){
  return page.evaluate(()=>{
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma","qa576_prod_origin");
    const completed=completeChronicleOriginPrologue("academy_menma",["qa576_prod_complete"]);
    const snapshot=getAcademyTeamFormationSnapshot();
    const expected=["academy_hinata","academy_kakashi"];
    if(!expected.every(id=>snapshot.eligibleCandidateVariantIds.includes(id)))return{error:"expected_candidates_missing",eligible:snapshot.eligibleCandidateVariantIds};
    selectAcademyTeamFormationTeammate(1,expected[0]);
    selectAcademyTeamFormationTeammate(2,expected[1]);
    const formed=confirmAcademyTeamFormation("qa576_prod_team",expected);
    const continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({sandboxPopupSeen:true,practicalTipSeen:true,examsTipSeen:true},{save:true});
    savePlayerData();
    return{selected,completed,formed,continued,team:getChronicleCurrentTeam43600()};
  });
}
async function setDiscipline(page,disciplineId,stat,exp=0){
  return page.evaluate(({disciplineId,stat,exp})=>{
    const c=getPlayerCharacter("academy_menma"),p=getCharacterDisciplineProgression("academy_menma",disciplineId);
    if(!c||!p)return{error:"subject_or_progression_missing"};
    c.stats[disciplineId]=stat;p.exp=exp;p.level=Math.max(1,Number(p.level)||1);p.statLevelApplied=Math.max(1,Number(p.statLevelApplied)||1);
    savePlayerData();return{stat:c.stats[disciplineId],exp:p.exp};
  },{disciplineId,stat,exp});
}
async function batch(page,disciplineId,stat,exp,size){
  await setDiscipline(page,disciplineId,stat,exp);
  return page.evaluate(({disciplineId,size})=>{
    const old=Math.random;Math.random=()=>0.999999;
    try{
      const results=executeKonohaExamBatch("academy_menma",disciplineId,size);
      return{results:JSON.parse(JSON.stringify(results)),meta:JSON.parse(JSON.stringify(KONOHA_EXAM_ATTEMPT_STATE.lastBatchMeta||null)),stat:getPlayerCharacter("academy_menma").stats[disciplineId],resolved:JSON.parse(JSON.stringify(resolveDisciplineCurriculumProfile576("academy_menma",disciplineId,"exam")))};
    }finally{Math.random=old;}
  },{disciplineId,size});
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);

    const loaded=await page.evaluate(()=>({
      script:[...document.scripts].some(s=>String(s.src||"").includes("alpha-discipline-curriculum-profiles-57600.js")),
      module:!!globalThis.SC_DISCIPLINE_CURRICULUM_PROFILES_57600,
      diagnostics:runDisciplineCurriculumProfiles576Diagnostics(),
      profiles:getDisciplineCurriculumProfiles576().map(row=>row.id),
      fingerprint:typeof getRuntimeBuildFingerprint==="function"?getRuntimeBuildFingerprint():null
    }));
    assert.strictEqual(loaded.script,true,"#576 module is not present in production loader");
    assert.strictEqual(loaded.module,true,"#576 module did not install from production loader");
    assert.strictEqual(loaded.diagnostics.pass,true,JSON.stringify(loaded.diagnostics));
    assert.strictEqual(loaded.profiles.length,6,"six advanced curriculum profiles are not installed");
    assert(loaded.fingerprint?.majorRuntimeFeatures?.includes("expert-master-discipline-curriculum-576"),"runtime fingerprint does not register #576");

    const setup=await setupTeam(page);assert(!setup.error,JSON.stringify(setup));assert.strictEqual(setup.formed?.success,true);assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);

    const kakashi=await page.evaluate(()=>({stat:getPlayerCharacter("academy_kakashi").stats.nin,resolved:JSON.parse(JSON.stringify(resolveDisciplineCurriculumProfile576("academy_kakashi","nin","exam")))}));
    assert.strictEqual(kakashi.stat,16);assert.strictEqual(kakashi.resolved.allowed,true);assert.strictEqual(kakashi.resolved.tier,"expert");assert.strictEqual(kakashi.resolved.activityProfileId,"discipline_curriculum_nin_expert_v1");

    const foundation=await batch(page,"nin",14,14,5);assert.strictEqual(foundation.results.length,1);assert.strictEqual(foundation.meta?.stoppedAtCeiling,true);assert.strictEqual(foundation.stat,15);assert.strictEqual(foundation.resolved.tier,"expert");
    const expert=await batch(page,"nin",29,19,10);assert.strictEqual(expert.results.length,1);assert.strictEqual(expert.meta?.stoppedAtCeiling,true);assert.strictEqual(expert.stat,30);assert.strictEqual(expert.resolved.tier,"master");
    const master=await batch(page,"nin",49,29,10);assert.strictEqual(master.results.length,1);assert.strictEqual(master.meta?.stoppedAtCeiling,true);assert.strictEqual(master.stat,50);assert.strictEqual(master.resolved.allowed,false);assert.strictEqual(master.resolved.reason,"structured_curriculum_source_exhausted");

    await setDiscipline(page,"gen",16,0);
    await page.evaluate(()=>{openKonohaPracticalFromVillage();selectKonohaPracticalDiscipline("gen");});
    await page.waitForSelector("#konoha-activity-screen[data-service-id='practical']",{state:"visible",timeout:10000});
    const genCard=page.locator("#konoha-activity-screen .alpha-activity-discipline[data-discipline-id='gen']").first();
    await genCard.waitFor({state:"visible",timeout:10000});await genCard.click();
    const practical=await page.evaluate(()=>{
      const selected=getKonohaPracticalSelectedDisciplineId();
      const old=Math.random;Math.random=()=>0.999999;
      try{return{selected,result:JSON.parse(JSON.stringify(executeKonohaPracticalAttempt("academy_menma","gen")))};}finally{Math.random=old;}
    });
    assert.strictEqual(practical.selected,"gen");assert.strictEqual(practical.result.completed,true);assert.strictEqual(practical.result.success,true);assert.strictEqual(practical.result.developmentExp,2);assert.strictEqual(practical.result.activityProfileId,"discipline_curriculum_gen_expert_v1");
    await page.screenshot({path:path.join(OUT,"01-production-practical-gen-expert.png"),fullPage:true});

    await setDiscipline(page,"fuin",30,0);
    const persisted=await page.evaluate(()=>{
      const old=Math.random;Math.random=()=>0.999999;
      try{const result=executeKonohaExamAttempt("academy_menma","fuin");savePlayerData();const rows=playerData.activityHistory||[];return{result:JSON.parse(JSON.stringify(result)),attempts:rows.filter(r=>r?.type==="discipline_curriculum_attempt"&&r?.activityProfileId==="discipline_curriculum_fuin_master_v1").length,dev:rows.filter(r=>r?.type==="discipline_development"&&r?.activityProfileId==="discipline_curriculum_fuin_master_v1").length};}finally{Math.random=old;}
    });
    assert.strictEqual(persisted.result.activityProfileId,"discipline_curriculum_fuin_master_v1");
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});await waitRuntime(page);await release(page);
    const reloaded=await page.evaluate(()=>{const rows=playerData.activityHistory||[];return{resolved:JSON.parse(JSON.stringify(resolveDisciplineCurriculumProfile576("academy_menma","fuin","exam"))),attempts:rows.filter(r=>r?.type==="discipline_curriculum_attempt"&&r?.activityProfileId==="discipline_curriculum_fuin_master_v1").length,dev:rows.filter(r=>r?.type==="discipline_development"&&r?.activityProfileId==="discipline_curriculum_fuin_master_v1").length};});
    assert.strictEqual(reloaded.resolved.tier,"master");assert.strictEqual(reloaded.attempts,persisted.attempts);assert.strictEqual(reloaded.dev,persisted.dev);

    const stale=await page.evaluate(()=>{const prior=globalThis.getChronicleCurrentTeam43600,real=prior();globalThis.getChronicleCurrentTeam43600=()=>({...real,committed:true,teamVariantIds:real.teamVariantIds.filter(id=>id!=="academy_menma")});try{return JSON.parse(JSON.stringify(resolveDisciplineCurriculumProfile576("academy_menma","fuin","exam")));}finally{globalThis.getChronicleCurrentTeam43600=prior;}});
    assert.strictEqual(stale.allowed,false);assert.strictEqual(stale.reason,"subject_not_in_committed_current_team");

    await gate.assertClean("issue-576-production-integration-browser");
    const summary={pass:true,issue:576,candidateMode:"production_loaded",productionLoaderIntegrated:true,kakashiImmediateExpert:true,foundationStopsAt15:true,expertStopsAt30:true,masterStopsAt50:true,masterSourceExhaustionNotGlobalCap:true,practicalGenExpertClickCommit:true,provenanceSaveReload:true,staleTeamFailsClosed:true,browserGoldenClaimed:false};
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2));console.log(JSON.stringify(summary));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
