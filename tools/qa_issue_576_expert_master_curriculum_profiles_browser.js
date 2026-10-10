#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_576_BASE_URL||"http://127.0.0.1:8080/index.html";
const MODULE_URL=new URL("runtime/alpha-discipline-curriculum-profiles-57600.js",BASE).href;
const OUT=process.env.ISSUE_576_OUT||"artifacts/issue-576-expert-master-curriculum";
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
  assert.strictEqual(before.loaded,false,"#576 was already loaded before isolated QA injection");
  assert.strictEqual(before.productionScript,false,"production loader unexpectedly includes #576 before integration tail");
  await page.evaluate(()=>{globalThis.__qa576TrainingWriter=globalThis.performDisciplineTraining;});
  await page.addScriptTag({url:MODULE_URL});
  await page.waitForFunction(()=>!!globalThis.SC_DISCIPLINE_CURRICULUM_PROFILES_57600,null,{timeout:10000});
  const after=await page.evaluate(()=>({
    diagnostics:globalThis.runDisciplineCurriculumProfiles576Diagnostics(),
    trainingWriterPreserved:globalThis.performDisciplineTraining===globalThis.__qa576TrainingWriter,
    profileIds:globalThis.getDisciplineCurriculumProfiles576().map(row=>row.id)
  }));
  assert.strictEqual(after.diagnostics.pass,true,JSON.stringify(after.diagnostics));
  assert.strictEqual(after.trainingWriterPreserved,true,"#576 replaced the Training Grounds writer in-browser");
  assert.deepStrictEqual(after.profileIds,[
    "discipline_curriculum_nin_expert_v1","discipline_curriculum_gen_expert_v1","discipline_curriculum_fuin_expert_v1",
    "discipline_curriculum_nin_master_v1","discipline_curriculum_gen_master_v1","discipline_curriculum_fuin_master_v1"
  ]);
  return{before,after};
}
async function setupTeam(page){
  return page.evaluate(()=>{
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma","qa576_origin");
    const completed=completeChronicleOriginPrologue("academy_menma",["qa576_complete"]);
    const snapshot=getAcademyTeamFormationSnapshot();
    const expected=["academy_hinata","academy_kakashi"];
    if(!expected.every(id=>snapshot.eligibleCandidateVariantIds.includes(id)))return{error:"expected_candidates_missing",eligible:snapshot.eligibleCandidateVariantIds};
    selectAcademyTeamFormationTeammate(1,expected[0]);
    selectAcademyTeamFormationTeammate(2,expected[1]);
    const formed=confirmAcademyTeamFormation("qa576_team",expected);
    const continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({sandboxPopupSeen:true,practicalTipSeen:true,examsTipSeen:true},{save:true});
    savePlayerData();
    return{selected,completed,formed,continued,team:getChronicleCurrentTeam43600()};
  });
}
async function setDiscipline(page,characterId,disciplineId,stat,exp=0){
  return page.evaluate(({characterId,disciplineId,stat,exp})=>{
    const c=getPlayerCharacter(characterId);if(!c)return{error:"character_missing"};
    const p=getCharacterDisciplineProgression(characterId,disciplineId);if(!p)return{error:"progression_missing"};
    c.stats[disciplineId]=stat;p.exp=exp;p.level=Math.max(1,Number(p.level)||1);p.statLevelApplied=Math.max(1,Number(p.statLevelApplied)||1);
    savePlayerData();
    return{stat:c.stats[disciplineId],exp:p.exp,pl:calculateCurrentPL(c)};
  },{characterId,disciplineId,stat,exp});
}
async function openExam(page,disciplineId="nin"){
  await page.evaluate(id=>{openKonohaExamFromVillage();selectKonohaExamDiscipline(id);},disciplineId);
  await page.waitForSelector("#konoha-activity-screen[data-service-id='exams']",{state:"visible",timeout:10000});
  return page.evaluate(()=>{
    const root=document.getElementById("konoha-activity-screen"),data=getKonohaExamUIScreenData();
    return{data:JSON.parse(JSON.stringify(data)),text:root?.innerText||"",html:root?.innerHTML||""};
  });
}
async function openPractical(page,disciplineId="nin"){
  await page.evaluate(id=>{openKonohaPracticalFromVillage();selectKonohaPracticalDiscipline(id);},disciplineId);
  await page.waitForSelector("#konoha-activity-screen[data-service-id='practical']",{state:"visible",timeout:10000});
  return page.evaluate(()=>{
    const root=document.getElementById("konoha-activity-screen"),data=getKonohaPracticalUIScreenData();
    return{data:JSON.parse(JSON.stringify(data)),text:root?.innerText||"",html:root?.innerHTML||""};
  });
}
async function deterministicAttempt(page,{host="exam",characterId="academy_menma",disciplineId="nin",pass=true}={}){
  return page.evaluate(({host,characterId,disciplineId,pass})=>{
    const old=Math.random;Math.random=()=>pass?0.999999:0;
    try{
      const beforeRyo=Number(playerData.ryo)||0;
      const result=host==="exam"?executeKonohaExamAttempt(characterId,disciplineId):executeKonohaPracticalAttempt(characterId,disciplineId);
      return{result:JSON.parse(JSON.stringify(result)),beforeRyo,afterRyo:Number(playerData.ryo)||0};
    }finally{Math.random=old;}
  },{host,characterId,disciplineId,pass});
}
async function deterministicBatch(page,{host="exam",characterId="academy_menma",disciplineId="nin",size=10,pass=true}={}){
  return page.evaluate(({host,characterId,disciplineId,size,pass})=>{
    const old=Math.random;Math.random=()=>pass?0.999999:0;
    try{
      if(host==="exam"){
        const results=executeKonohaExamBatch(characterId,disciplineId,size);
        return{results:JSON.parse(JSON.stringify(results)),meta:JSON.parse(JSON.stringify(KONOHA_EXAM_ATTEMPT_STATE.lastBatchMeta||null))};
      }
      selectKonohaPracticalDiscipline(disciplineId);setKonohaPracticalBatchSize(size);
      const batch=executeKonohaPracticalTraining();
      return{batch:JSON.parse(JSON.stringify(batch)),meta:JSON.parse(JSON.stringify(getKonohaPracticalAttemptState()?.lastBatchMeta||null))};
    }finally{Math.random=old;}
  },{host,characterId,disciplineId,size,pass});
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitBaseRuntime(page);await release(page);
    const injection=await injectCandidate(page);
    const setup=await setupTeam(page);
    assert(!setup.error,JSON.stringify(setup));
    assert.strictEqual(setup.selected?.success,true);assert.strictEqual(setup.completed?.success,true);assert.strictEqual(setup.formed?.success,true);
    assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);

    // Academy Kakashi enters Expert Ninjutsu directly from canonical Current NIN 16; resolution is read-only.
    const kakashi=await page.evaluate(()=>{
      const before=(playerData.activityHistory||[]).length;
      const c=getPlayerCharacter("academy_kakashi");
      const resolved=resolveDisciplineCurriculumProfile576(c.id,"nin","exam");
      return{stat:c.stats.nin,resolved:JSON.parse(JSON.stringify(resolved)),before,after:(playerData.activityHistory||[]).length};
    });
    assert.strictEqual(kakashi.stat,16,"current Registry authority no longer has Academy Kakashi NIN 16");
    assert.strictEqual(kakashi.resolved.allowed,true);assert.strictEqual(kakashi.resolved.tier,"expert");
    assert.strictEqual(kakashi.resolved.activityProfileId,"discipline_curriculum_nin_expert_v1");
    assert.strictEqual(kakashi.after,kakashi.before,"Kakashi Expert resolution fabricated history");

    // Real Exams UI consumes the injected Expert profile.
    await setDiscipline(page,"academy_menma","nin",16,0);
    let exam=await openExam(page,"nin");
    let nin=exam.data.disciplines.find(row=>row.id==="nin");
    assert(nin,"Ninjutsu missing from Exams");
    assert.strictEqual(nin.currentStat,16);assert.strictEqual(nin.curriculumTier,"expert");
    assert.strictEqual(nin.activityProfileId,"discipline_curriculum_nin_expert_v1");
    assert.strictEqual(nin.developmentCeilingStat,30);assert.strictEqual(nin.developmentAvailable,true);
    assert(exam.text.includes("EXPERT NINJUTSU CURRICULUM"),"Expert curriculum label missing from Exams UI");
    assert(exam.text.includes("EFFECTIVE THROUGH STAT 30"),"Expert source ceiling missing from Exams UI");
    await page.screenshot({path:path.join(OUT,"01-exams-expert-ninjutsu.png"),fullPage:true});

    // Real Practical UI also exposes advanced Ninjutsu despite its Foundation discipline list being different.
    let practical=await openPractical(page,"nin");
    nin=practical.data.disciplines.find(row=>row.id==="nin");
    assert(nin,"Ninjutsu Expert curriculum not added to Practical host");
    assert.strictEqual(nin.curriculumTier,"expert");assert.strictEqual(nin.activityProfileId,"discipline_curriculum_nin_expert_v1");
    assert(practical.text.includes("EXPERT NINJUTSU CURRICULUM"),"Expert curriculum label missing from Practical UI");
    await page.screenshot({path:path.join(OUT,"02-practical-expert-ninjutsu.png"),fullPage:true});

    // Committed material failure +1, effective execution +2, same #448 writer, no Ryō surcharge.
    const fail=await deterministicAttempt(page,{host:"exam",pass:false});
    assert.strictEqual(fail.result.completed,true);assert.strictEqual(fail.result.success,false);assert.strictEqual(fail.result.developmentExp,1);
    assert.strictEqual(fail.result.activityProfileId,"discipline_curriculum_nin_expert_v1");assert.strictEqual(fail.afterRyo,fail.beforeRyo);
    const pass=await deterministicAttempt(page,{host:"exam",pass:true});
    assert.strictEqual(pass.result.completed,true);assert.strictEqual(pass.result.success,true);assert.strictEqual(pass.result.developmentExp,2);
    assert.strictEqual(pass.result.activityProfileId,"discipline_curriculum_nin_expert_v1");assert.strictEqual(pass.afterRyo,pass.beforeRyo);
    const provenance=await page.evaluate(()=>{
      const rows=playerData.activityHistory||[];
      return rows.filter(row=>row&&row.activityProfileId==="discipline_curriculum_nin_expert_v1").map(row=>({
        type:row.type,receiptId:row.receiptId||null,sourceOccurrenceId:row.sourceOccurrenceId||null,grantedExp:row.grantedExp??null,curriculumTier:row.curriculumTier||null
      }));
    });
    assert(provenance.some(row=>row.type==="discipline_curriculum_attempt"&&row.sourceOccurrenceId),"curriculum attempt provenance missing");
    assert(provenance.some(row=>row.type==="discipline_development"&&Number(row.grantedExp)>0),"shared #448 development receipt missing curriculum provenance");

    // x10 is locked to the starting Expert source and must stop immediately when Stat 30 is reached.
    await setDiscipline(page,"academy_menma","nin",29,19);
    const expertCeiling=await deterministicBatch(page,{host:"exam",size:10,pass:true});
    assert.strictEqual(expertCeiling.results.length,1,"Expert x10 silently converted remaining repetitions to Master");
    assert.strictEqual(expertCeiling.results[0].activityProfileId,"discipline_curriculum_nin_expert_v1");
    assert.strictEqual(expertCeiling.meta?.stoppedAtCeiling,true,"Expert x10 did not report source-ceiling stop");
    let state=await page.evaluate(()=>({
      stat:getPlayerCharacter("academy_menma").stats.nin,
      exp:getCharacterDisciplineProgression("academy_menma","nin").exp,
      resolved:resolveDisciplineCurriculumProfile576("academy_menma","nin","exam")
    }));
    assert.strictEqual(state.stat,30);assert.strictEqual(state.exp,1);assert.strictEqual(state.resolved.tier,"master");
    assert.strictEqual(state.resolved.activityProfileId,"discipline_curriculum_nin_master_v1");

    exam=await openExam(page,"nin");nin=exam.data.disciplines.find(row=>row.id==="nin");
    assert.strictEqual(nin.curriculumTier,"master");assert.strictEqual(nin.developmentCeilingStat,50);
    assert(exam.text.includes("MASTER NINJUTSU CURRICULUM"),"Master curriculum label missing from Exams UI");
    assert(exam.text.includes("EFFECTIVE THROUGH STAT 50"),"Master source ceiling missing from Exams UI");
    await page.screenshot({path:path.join(OUT,"03-exams-master-ninjutsu.png"),fullPage:true});

    // Master x10 likewise stops at 50; exhaustion is source-scoped, not a global Stat cap.
    await setDiscipline(page,"academy_menma","nin",49,29);
    const masterCeiling=await deterministicBatch(page,{host:"exam",size:10,pass:true});
    assert.strictEqual(masterCeiling.results.length,1,"Master x10 continued after structured source exhaustion");
    assert.strictEqual(masterCeiling.results[0].activityProfileId,"discipline_curriculum_nin_master_v1");
    assert.strictEqual(masterCeiling.meta?.stoppedAtCeiling,true,"Master x10 did not report source-ceiling stop");
    state=await page.evaluate(()=>({
      stat:getPlayerCharacter("academy_menma").stats.nin,
      exp:getCharacterDisciplineProgression("academy_menma","nin").exp,
      resolved:resolveDisciplineCurriculumProfile576("academy_menma","nin","exam")
    }));
    assert.strictEqual(state.stat,50);assert.strictEqual(state.exp,1);assert.strictEqual(state.resolved.allowed,false);assert.strictEqual(state.resolved.tier,"exhausted");
    assert.strictEqual(state.resolved.reason,"structured_curriculum_source_exhausted");
    exam=await openExam(page,"nin");
    assert(exam.text.includes("MASTER CURRICULUM SOURCE EXHAUSTED"),"source-exhausted label missing");
    assert(exam.text.includes("not a global Stat cap"),"source exhaustion does not explicitly preserve uncapped Stat semantics");
    assert(!/MAX STAT 50|DISCIPLINE MAXED|STAT COMPLETE/i.test(exam.text),"global-cap wording visible at Master source exhaustion");
    await page.screenshot({path:path.join(OUT,"04-master-source-exhausted.png"),fullPage:true});

    // Real Practical execution uses the same advanced source contract.
    await setDiscipline(page,"academy_menma","gen",16,0);
    await openPractical(page,"gen");
    const practicalPass=await deterministicAttempt(page,{host:"practical",disciplineId:"gen",pass:true});
    assert.strictEqual(practicalPass.result.completed,true);assert.strictEqual(practicalPass.result.success,true);assert.strictEqual(practicalPass.result.developmentExp,2);
    assert.strictEqual(practicalPass.result.activityProfileId,"discipline_curriculum_gen_expert_v1");

    // Persist Master-source provenance and reload the real shell; reinject only for isolated-candidate QA.
    await setDiscipline(page,"academy_menma","fuin",30,0);
    const masterPersist=await deterministicAttempt(page,{host:"exam",disciplineId:"fuin",pass:true});
    assert.strictEqual(masterPersist.result.activityProfileId,"discipline_curriculum_fuin_master_v1");
    const beforeReload=await page.evaluate(()=>{
      savePlayerData();
      const c=getPlayerCharacter("academy_menma"),rows=playerData.activityHistory||[];
      return{
        stat:c.stats.fuin,exp:getCharacterDisciplineProgression(c.id,"fuin").exp,pl:calculateCurrentPL(c),
        attemptReceipts:rows.filter(row=>row?.type==="discipline_curriculum_attempt"&&row?.activityProfileId==="discipline_curriculum_fuin_master_v1").length,
        developmentReceipts:rows.filter(row=>row?.type==="discipline_development"&&row?.activityProfileId==="discipline_curriculum_fuin_master_v1").length
      };
    });
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});await waitBaseRuntime(page);await release(page);await injectCandidate(page);
    const afterReload=await page.evaluate(()=>{
      const c=getPlayerCharacter("academy_menma"),rows=playerData.activityHistory||[];
      return{
        stat:c.stats.fuin,exp:getCharacterDisciplineProgression(c.id,"fuin").exp,pl:calculateCurrentPL(c),
        resolved:resolveDisciplineCurriculumProfile576(c.id,"fuin","exam"),
        attemptReceipts:rows.filter(row=>row?.type==="discipline_curriculum_attempt"&&row?.activityProfileId==="discipline_curriculum_fuin_master_v1").length,
        developmentReceipts:rows.filter(row=>row?.type==="discipline_development"&&row?.activityProfileId==="discipline_curriculum_fuin_master_v1").length
      };
    });
    assert.strictEqual(afterReload.stat,beforeReload.stat);assert.strictEqual(afterReload.exp,beforeReload.exp);assert.strictEqual(afterReload.pl,beforeReload.pl);
    assert.strictEqual(afterReload.resolved.tier,"master");assert.strictEqual(afterReload.resolved.activityProfileId,"discipline_curriculum_fuin_master_v1");
    assert.strictEqual(afterReload.attemptReceipts,beforeReload.attemptReceipts,"reload duplicated/lost curriculum attempt provenance");
    assert.strictEqual(afterReload.developmentReceipts,beforeReload.developmentReceipts,"reload duplicated/lost #448 development provenance");

    // A stale/non-member subject must fail closed rather than training against a prior team snapshot.
    const staleTeam=await page.evaluate(()=>{
      const prior=globalThis.getChronicleCurrentTeam43600;
      const real=prior();
      globalThis.getChronicleCurrentTeam43600=()=>({...real,committed:true,teamVariantIds:real.teamVariantIds.filter(id=>id!=="academy_menma")});
      try{return JSON.parse(JSON.stringify(resolveDisciplineCurriculumProfile576("academy_menma","fuin","exam")));}
      finally{globalThis.getChronicleCurrentTeam43600=prior;}
    });
    assert.strictEqual(staleTeam.allowed,false);assert.strictEqual(staleTeam.reason,"subject_not_in_committed_current_team");

    await gate.assertClean("issue-576-expert-master-curriculum-isolated-browser");
    const summary={
      pass:true,issue:576,candidateMode:"isolated_browser_injection",productionLoaderUntouched:true,
      exactProfiles:injection.after.profileIds,kakashiImmediateExpert:true,
      examsExpertProjection:true,practicalExpertProjection:true,materialFailureDevelopment:1,effectiveExecutionDevelopment:2,
      expertBatchStopsAt30:true,masterBatchStopsAt50:true,masterSourceExhaustionNotGlobalCap:true,
      provenanceSaveReload:true,staleTeamFailsClosed:true,trainingGroundsWriterPreserved:true,browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2));
    console.log(JSON.stringify(summary));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
