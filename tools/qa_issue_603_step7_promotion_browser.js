#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const ROOT=path.resolve(__dirname,"..");
const BASE=process.env.SC603_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.SC603_OUT||"artifacts/promotion-603";
const REQUIRE=process.env.SC603_REQUIRE_INTEGRATION==="1";
const CORE_PATH=path.join(ROOT,"runtime/alpha-promotion-core-60300.js");
const COURIER_PATH=path.join(ROOT,"runtime/alpha-promotion-courier-assessment-60310.js");
const UI_PATH=path.join(ROOT,"runtime/alpha-promotion-arena-ui-60320.js");
fs.mkdirSync(OUT,{recursive:true});

function integratedFilesPresent(){return[CORE_PATH,COURIER_PATH,UI_PATH].every(fs.existsSync);}

async function releaseFrontDoor(page){
  await page.waitForFunction(()=>!!globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400||!!document.getElementById("sc-alpha-front-door-33400"),null,{timeout:10000}).catch(()=>{});
  await page.evaluate(()=>{
    try{globalThis.releaseAlphaFrontDoor33300?.();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.removeAttribute("aria-hidden");game.inert=false;}
    document.getElementById("sc-alpha-front-door-33300")?.remove();
    document.getElementById("sc-alpha-front-door-33400")?.remove();
  });
}
async function clearTutorialChrome(page){
  await page.evaluate(()=>document.getElementById("sc-konoha-onboarding-35000")?.remove());
}

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    typeof globalThis.openOverlay==="function"&&
    typeof globalThis.openInstalledPromotion60330==="function"&&
    globalThis.SC_PROMOTION_INSTALLED_60330&&
    globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310&&
    globalThis.SC_PROMOTION_CORE_60300&&
    typeof globalThis.getChronicleCurrentTeam43600==="function"
  ),null,{timeout:30000});
}

async function seedPlayableAcademy(page,label){
  const result=await page.evaluate(sourceLabel=>{
    localStorage.clear();
    playerData=createDefaultPlayerData();
    if(typeof setCharacterOwnershipRuntimeAuthority==="function")setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma",`${sourceLabel}:origin`);
    const completed=completeChronicleOriginPrologue("academy_menma",[`${sourceLabel}:origin_complete`]);
    const one=selectAcademyTeamFormationTeammate(1,"academy_hinata");
    const two=selectAcademyTeamFormationTeammate(2,"academy_kakashi");
    const formed=confirmAcademyTeamFormation(`${sourceLabel}:team`,["academy_hinata","academy_kakashi"]);
    const continued=continueAcademyTeamFormationJourney();
    return{selected,completed,one,two,formed,continued,team:getChronicleCurrentTeam43600(),origin:ensurePlayerAcquisitionState().chronicleOriginOwnedCharacterId};
  },label);
  for(const key of ["selected","completed","one","two","formed","continued"])assert.strictEqual(result[key]?.success,true,`${label} Academy setup ${key} failed: ${JSON.stringify(result[key])}`);
  assert.strictEqual(result.origin,"owned_character_academy_menma");
  assert.deepStrictEqual(result.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);
  return result;
}

async function freshPage(browser,width,height,label){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await waitRuntime(page);
  await releaseFrontDoor(page);
  await seedPlayableAcademy(page,`qa603:${label}`);
  await releaseFrontDoor(page);
  return{context,page,gate,label};
}

async function openViaArenaGuide(page){
  await releaseFrontDoor(page);
  await page.evaluate(()=>globalThis.openOverlay("arena"));
  const arena=page.locator("#overlay-content-container");
  await arena.waitFor({state:"visible",timeout:15000});
  await releaseFrontDoor(page);
  const guide=page.locator("#sc-konoha-onboarding-35000");
  if(await guide.count()>0&&await guide.isVisible()){
    const continueButton=guide.getByRole("button",{name:/^continue$/i}).first();
    if(await continueButton.count()>0){await continueButton.click();await page.waitForTimeout(80);}
    const takePromotion=page.locator("#sc-konoha-onboarding-35000").getByRole("button",{name:/take promotion assessment/i}).first();
    assert(await takePromotion.count()>0,"Arena guide did not expose TAKE PROMOTION ASSESSMENT");
    await takePromotion.click();
  }else{
    const promotion=arena.getByRole("button",{name:/promotion/i}).first();
    assert(await promotion.count()>0,"promotion_entry_control_missing");
    await promotion.click();
  }
  await page.locator("#overlay-content-container .sc60320-stage").waitFor({state:"visible",timeout:15000});
  return arena;
}

async function openInstalled(page){
  await clearTutorialChrome(page);
  const opened=await page.evaluate(()=>globalThis.openInstalledPromotion60330());
  assert.strictEqual(opened?.success,true,`installed Promotion open failed: ${JSON.stringify(opened)}`);
  await clearTutorialChrome(page);
  await page.locator("#overlay-content-container .sc60320-stage").waitFor({state:"visible",timeout:15000});
  return page.locator("#overlay-content-container");
}

async function inspectAndCommit(page,{arenaGuide=false}={}){
  const host=arenaGuide?await openViaArenaGuide(page):await openInstalled(page);
  const before=await page.evaluate(()=>JSON.stringify({
    ryo:playerData.ryo,
    team:getChronicleCurrentTeam43600(),
    ownership:playerData.characterOwnership,
    assignment:playerData.clan?.currentTeamAssignment||null,
    inventory:playerData.inventory
  }));
  const inspect=host.getByRole("button",{name:/inspect readiness/i}).first();
  assert(await inspect.count()>0,"Inspect Readiness missing");
  await inspect.click();await page.waitForTimeout(120);
  const afterInspection=await page.evaluate(()=>JSON.stringify({
    ryo:playerData.ryo,
    team:getChronicleCurrentTeam43600(),
    ownership:playerData.characterOwnership,
    assignment:playerData.clan?.currentTeamAssignment||null,
    inventory:playerData.inventory
  }));
  assert.strictEqual(afterInspection,before,"inspection mutated protected semantic state");
  const rows=await page.locator("#overlay-content-container .sc60320-slot").evaluateAll(nodes=>nodes.map(node=>({text:node.textContent,aria:node.getAttribute("aria-label"),state:node.getAttribute("data-state")})));
  assert.strictEqual(rows.length,4,"exactly four readiness slots required");
  assert(rows.every(row=>!JSON.stringify(row).match(/information_use|team_coordination|combat_readiness|objective_protection|academy_genin_fr_pkg_/i)),"hidden readiness leaked: "+JSON.stringify(rows));

  const twin=await page.evaluate(async()=>{
    const make=satisfied=>({phase:"INSPECTION",currentRankLabel:"Academy Student",targetRankLabel:"Genin",canInspect:true,canEnterAssessment:false,readinessSlots:[
      {revealed:true,publicLabel:"Mission comprehension",satisfied:false},
      {revealed:false,publicLabel:"NO_LEAK",domain:"judgement_under_pressure",satisfied},
      {revealed:false,publicLabel:"NO_LEAK",domain:"combat_readiness",satisfied},
      {revealed:false,publicLabel:"NO_LEAK",domain:"objective_protection",satisfied}
    ]});
    async function capture(satisfied){
      const host=document.createElement("div");document.body.appendChild(host);
      const truth=make(satisfied),normalized=normalizePromotionArenaTruth60320(truth),controller=mountPromotionArenaUI60320(host,{truth});
      await refreshPromotionArenaUI60320(controller,{announce:false});
      await new Promise(resolve=>requestAnimationFrame(resolve));
      const result={normalized:JSON.stringify(normalized),html:host.innerHTML,rows:JSON.stringify([...host.querySelectorAll(".sc60320-slot")].map(n=>({text:n.textContent,aria:n.getAttribute("aria-label"),state:n.getAttribute("data-state")})))};
      unmountPromotionArenaUI60320(controller);host.remove();return result;
    }
    return{a:await capture(false),b:await capture(true)};
  });
  assert.deepStrictEqual(twin.a,twin.b,"hidden satisfied/unsatisfied projections differ");

  const enter=host.getByRole("button",{name:/enter assessment/i}).first();
  assert(await enter.count()>0&&await enter.isEnabled(),"Enter Assessment unavailable after inspection");
  await enter.click();
  await page.waitForFunction(()=>!!globalThis.SC_PROMOTION_INSTALLED_60330.activeAttempt(),null,{timeout:10000});
  return page.evaluate(()=>{
    const api=SC_PROMOTION_INSTALLED_60330,got=api.getController(),snap=got.row.core.getDiagnosticSnapshot();
    return{attemptId:api.activeAttempt(),packageId:snap.state.promotionRequirementPackageId,attempts:snap.state.attempts.map(x=>({id:x.assessmentAttemptId,status:x.status,number:x.attemptNumber}))};
  });
}

async function protectedSnapshot(page){
  return page.evaluate(()=>{
    const a=ensurePlayerAcquisitionState();
    return JSON.stringify({
      team:getChronicleCurrentTeam43600(),
      ownership:Object.values(a.ownedCharactersByVariantId||{}).map(x=>x&&x.ownedCharacterId).filter(Boolean).sort(),
      assignment:playerData.clan?.currentTeamAssignment||null,
      deployment:currentBattle?.active?currentBattle.deployment:null
    });
  });
}

async function rewardSnapshot(page){
  return page.evaluate(()=>({
    ryo:Number(playerData.ryo)||0,
    pill:(Array.isArray(playerData.inventory)?playerData.inventory:[]).filter(row=>row&&row.id==="field_recovery_pill").reduce((n,row)=>n+Math.max(1,Number(row.quantity)||1),0),
    rows:(Array.isArray(playerData.activityHistory)?playerData.activityHistory:[]).filter(row=>row&&row.type==="promotion_assessment_reward").map(row=>({key:row.idempotenceKey,source:row.rewardSourceId,cause:row.cause,ryo:row.rewards?.ryo||0,items:row.rewards?.items||[]}))
  }));
}

async function routeToNorthRavine(page,{recordTeammate=true,secureDispatch=true}={}){
  return page.evaluate(({recordTeammate,secureDispatch})=>{
    const api=SC_PROMOTION_INSTALLED_60330,c=SC_PROMOTION_COURIER_ASSESSMENT_60310,id=api.activeAttempt();
    const ok=(name,value)=>{if(!value||value.success!==true)throw new Error(name+":"+JSON.stringify(value));return value;};
    ok("briefing",api.commitBriefing());
    ok("gate",api.advanceJourney("KON-P10"));
    ok("woods",api.advanceJourney("whisper_woods"));
    ok("ravine",api.advanceJourney("fire_whisper_woods_north_ravine"));
    ok("search",api.resolveSearch("agen_m01_search_follow_fresh_sign_v1"));
    let occ=c.getOccurrence(id);const subject=occ.assessmentSubjectBattleParticipantRef;const teammate=occ.attemptParticipantRefs.find(ref=>ref!==subject)||null;
    if(recordTeammate&&teammate)ok("participant",api.recordParticipantFact({participantRef:teammate,boundaryId:"north_ravine_contact",intentClass:"support_positioning",actionClass:"cover",resultRef:"maintained_contact_cover",observedBySubject:true}));
    if(secureDispatch)ok("priority",api.resolvePriority("agen_m01_priority_secure_dispatch_v1"));
    else ok("priority",api.resolvePriority("agen_m01_priority_stabilize_courier_v1",{resolverResult:"stabilized_extractable"}));
    occ=c.getOccurrence(id);
    return{id,subject,teammate,participantRefs:occ.attemptParticipantRefs};
  },{recordTeammate,secureDispatch});
}

async function confirmContact(page,subsetMode="subject_teammate"){
  return page.evaluate(mode=>{
    const api=SC_PROMOTION_INSTALLED_60330,c=SC_PROMOTION_COURIER_ASSESSMENT_60310,id=api.activeAttempt(),o=c.getOccurrence(id),subject=o.assessmentSubjectBattleParticipantRef;
    const teammate=o.attemptParticipantRefs.find(ref=>ref!==subject)||null;
    const refs=mode==="subject_only"?[subject]:[subject,teammate].filter(Boolean);
    const result=api.confirmHostileContact({directContactParticipantRefs:refs});
    if(!result||result.success!==true)throw new Error("contact:"+JSON.stringify(result));
    return{subject,teammate,refs};
  },subsetMode);
}

async function completeReturnRoute(page,{courierOutcome="recovered_with_team",handoff=true,debrief=true}={}){
  return page.evaluate(({courierOutcome,handoff,debrief})=>{
    const api=SC_PROMOTION_INSTALLED_60330,c=SC_PROMOTION_COURIER_ASSESSMENT_60310;
    const ok=(name,value)=>{if(!value||value.success!==true)throw new Error(name+":"+JSON.stringify(value));return value;};
    ok("extract",api.beginExtraction({courierOutcome}));
    ok("return woods",api.advanceJourney("whisper_woods"));
    ok("return gate",api.advanceJourney("KON-P10"));
    ok("return village",api.advanceJourney("KON-P01"));
    if(handoff)ok("handoff",api.handoffDispatch());
    if(debrief)ok("debrief",api.commitDebrief({reportRef:"qa603_browser_report"}));
    return c.getOccurrence(api.activeAttempt());
  },{courierOutcome,handoff,debrief});
}

async function fullNonBattleScenario(browser){
  const env=await freshPage(browser,1366,768,"nonbattle");const {page,context,gate}=env;
  try{
    const before=await rewardSnapshot(page),committed=await inspectAndCommit(page,{arenaGuide:true});
    await routeToNorthRavine(page,{recordTeammate:true,secureDispatch:true});
    await confirmContact(page);
    const contact=await page.evaluate(()=>SC_PROMOTION_INSTALLED_60330.resolveNonBattleContact("agen_m01_contact_extract_under_cover_v1","clean_extraction"));
    assert.strictEqual(contact?.success,true,JSON.stringify(contact));
    await completeReturnRoute(page,{courierOutcome:"recovered_with_team",handoff:true,debrief:true});
    const final=await page.evaluate(()=>{
      const api=SC_PROMOTION_INSTALLED_60330,c=SC_PROMOTION_COURIER_ASSESSMENT_60310,id=api.activeAttempt();
      const terminal=api.commitTerminal(c.terminalStates.COMPLETE);if(!terminal?.success)throw new Error(JSON.stringify(terminal));
      const sync=api.syncQualifiedEvidence();if(!sync?.success)throw new Error(JSON.stringify(sync));
      const resolved=api.finalize();if(!resolved?.success)throw new Error(JSON.stringify(resolved));
      return{resolved,truth:api.getTruth(),occurrence:c.getOccurrence(id),rank:getOwnedCharacterFormalRank("owned_character_academy_menma")};
    });
    const after=await rewardSnapshot(page);
    assert.strictEqual(after.ryo-before.ryo,250,"legal non-Battle route must award exactly 250 Ryō mission value");
    assert.strictEqual(after.pill-before.pill,1,"legal non-Battle route must award one Field Recovery Pill");
    assert.strictEqual(after.rows.filter(r=>String(r.key).startsWith("battle_reward::")).length,0,"non-Battle route manufactured Battle reward");
    assert(final.occurrence.missionObjectiveCompleted===true,"non-Battle mission objective not completed");
    assert(["PASS","FAIL"].includes(final.truth.outcome),"non-Battle assessment did not resolve factually");
    const arc1=await page.evaluate(()=>JSON.stringify(playerData.activityHistory||[]));
    assert(!/arc1_m1_whisper_major_contact(?:_event)?|scene_arc1_m1_whisper_major_contact/.test(arc1),"North Ravine route collided with Arc-1 major contact");
    await page.screenshot({path:path.join(OUT,"03-nonbattle-complete.png"),fullPage:true});
    await gate.assertClean("603-nonbattle");
    return{attemptId:committed.attemptId,packageId:committed.packageId,outcome:final.truth.outcome,ryoDelta:250,pillDelta:1};
  }finally{await context.close();}
}

async function partialRetryReloadScenario(browser){
  const env=await freshPage(browser,1366,768,"partial-retry");const {page,context,gate}=env;
  try{
    const before=await rewardSnapshot(page),first=await inspectAndCommit(page);
    await routeToNorthRavine(page,{recordTeammate:false,secureDispatch:true});
    await confirmContact(page,"subject_only");
    const partial=await page.evaluate(()=>SC_PROMOTION_INSTALLED_60330.resolveNonBattleContact("agen_m01_contact_extract_under_cover_v1","courier_cannot_continue"));
    assert.strictEqual(partial?.success,true,JSON.stringify(partial));
    await completeReturnRoute(page,{courierOutcome:"unrecovered",handoff:true,debrief:true});
    const failed=await page.evaluate(()=>{
      const api=SC_PROMOTION_INSTALLED_60330,c=SC_PROMOTION_COURIER_ASSESSMENT_60310,id=api.activeAttempt();
      const terminal=api.commitTerminal(c.terminalStates.FAILED);if(!terminal?.success)throw new Error(JSON.stringify(terminal));
      const resolved=api.finalize();if(!resolved?.success)throw new Error(JSON.stringify(resolved));
      return{truth:api.getTruth(),snap:api.getController().row.core.getDiagnosticSnapshot(),occ:c.getOccurrence(id)};
    });
    assert.strictEqual(failed.truth.outcome,"FAIL","partial-value attempt must resolve FAIL");
    const partialRewards=await rewardSnapshot(page);
    assert.strictEqual(partialRewards.ryo-before.ryo,150,"dispatch-only partial attempt should preserve 150 Ryō value");
    assert.strictEqual(partialRewards.pill-before.pill,0,"partial attempt awarded full-completion Pill");
    assert.strictEqual(partialRewards.rows.filter(r=>r.cause==="courier_recovered_alive").length,0,"partial attempt manufactured courier reward");

    const host=await openInstalled(page);
    const failText=(await host.innerText()).replace(/\s+/g," ");
    assert(/FAIL/.test(failText)&&/150 Ryō/.test(failText),"FAIL Assessment Record / Receipt missing partial reward projection");
    const enter=host.getByRole("button",{name:/enter assessment/i}).first();
    assert(await enter.isEnabled(),"retry was not offered after FAIL");await enter.click();
    await page.waitForFunction(previous=>{const id=SC_PROMOTION_INSTALLED_60330.activeAttempt();return !!id&&id!==previous;},first.attemptId,{timeout:10000});
    const retry=await page.evaluate(()=>{const api=SC_PROMOTION_INSTALLED_60330,s=api.getController().row.core.getDiagnosticSnapshot();return{attemptId:api.activeAttempt(),packageId:s.state.promotionRequirementPackageId,attempts:s.state.attempts.map(x=>({id:x.assessmentAttemptId,status:x.status,number:x.attemptNumber}))};});
    assert.notStrictEqual(retry.attemptId,first.attemptId,"retry reused assessmentAttemptId");
    assert.strictEqual(retry.packageId,first.packageId,"retry rerolled immutable Promotion package");
    await page.evaluate(()=>{const r=SC_PROMOTION_INSTALLED_60330.commitBriefing();if(!r?.success)throw new Error(JSON.stringify(r));savePlayerData();});
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});await waitRuntime(page);await releaseFrontDoor(page);await clearTutorialChrome(page);
    const loaded=await page.evaluate(()=>{const api=SC_PROMOTION_INSTALLED_60330,s=api.getController().row.core.getDiagnosticSnapshot();return{attemptId:api.activeAttempt(),packageId:s.state.promotionRequirementPackageId,attempts:s.state.attempts.map(x=>({id:x.assessmentAttemptId,status:x.status,number:x.attemptNumber}))};});
    assert.strictEqual(loaded.attemptId,retry.attemptId,"save/reload lost active retry attempt lineage");
    assert.strictEqual(loaded.packageId,first.packageId,"save/reload rerolled immutable package");
    assert.strictEqual(loaded.attempts.length,2,"save/reload duplicated or lost attempt history");
    const reloadedRewards=await rewardSnapshot(page);
    assert.strictEqual(reloadedRewards.ryo,partialRewards.ryo,"save/reload duplicated partial rewards");

    const rehost=await openInstalled(page);const withdraw=rehost.getByRole("button",{name:/^withdraw$/i}).first();
    assert(await withdraw.count()>0&&await withdraw.isVisible(),"active retry did not expose Withdraw");await withdraw.click();await page.waitForTimeout(120);
    const withdrawn=await page.evaluate(()=>({truth:SC_PROMOTION_INSTALLED_60330.getTruth(),snap:SC_PROMOTION_INSTALLED_60330.getController().row.core.getDiagnosticSnapshot()}));
    assert.strictEqual(withdrawn.truth.outcome,"WITHDRAWN","retry withdrawal did not remain historical truth");
    assert.strictEqual(withdrawn.snap.state.attempts.length,2);
    await page.screenshot({path:path.join(OUT,"04-partial-fail-retry-reload-withdraw.png"),fullPage:true});
    await gate.assertClean("603-partial-retry");
    return{firstAttempt:first.attemptId,retryAttempt:retry.attemptId,packageId:first.packageId,partialRyo:150,reloadStable:true,withdrawn:true};
  }finally{await context.close();}
}

async function courierOnlyScenario(browser){
  const env=await freshPage(browser,1366,768,"courier-only");const {page,context,gate}=env;
  try{
    const before=await rewardSnapshot(page);await inspectAndCommit(page);
    await routeToNorthRavine(page,{recordTeammate:false,secureDispatch:false});
    await confirmContact(page,"subject_only");
    const lost=await page.evaluate(()=>SC_PROMOTION_INSTALLED_60330.resolveNonBattleContact("agen_m01_contact_extract_under_cover_v1","dispatch_lost"));
    assert.strictEqual(lost?.success,true,JSON.stringify(lost));
    await completeReturnRoute(page,{courierOutcome:"recovered_with_team",handoff:false,debrief:true});
    await page.evaluate(()=>{const api=SC_PROMOTION_INSTALLED_60330,c=SC_PROMOTION_COURIER_ASSESSMENT_60310;const t=api.commitTerminal(c.terminalStates.FAILED);if(!t?.success)throw new Error(JSON.stringify(t));const f=api.finalize();if(!f?.success)throw new Error(JSON.stringify(f));});
    const after=await rewardSnapshot(page);
    assert.strictEqual(after.ryo-before.ryo,100,"courier-only partial attempt should preserve exactly 100 Ryō");
    assert.strictEqual(after.rows.filter(r=>r.cause==="dispatch_returned_intact").length,0,"lost dispatch manufactured dispatch reward");
    await gate.assertClean("603-courier-only");return{ryoDelta:100};
  }finally{await context.close();}
}

async function battleAction(page){
  return page.evaluate(()=>{
    if(!currentBattle?.active||currentBattle.battleOver)return{success:false,terminal:true,outcome:currentBattle?.outcome?.type||null};
    const actor=currentBattle.activePlayer?.id||getBattleDeploymentParticipant?.("player",1)?.id||currentBattle.characterId||null;
    const ids=typeof getProductionPreparedSkillIds==="function"?getProductionPreparedSkillIds(actor):[];
    const ranked=[...ids].map(id=>{let def=null;try{def=getClosureWaveBattleSkillDefinition(id,actor);}catch(_error){}return{id,attack:Number(def?.authoredAttackPL||def?.contextualStateDamage?.normalAttackPL||0)};}).sort((a,b)=>b.attack-a.attack);
    const failures=[];
    for(const row of ranked){
      try{const result=attemptBattlePreparedSkill(row.id);if(result&&result.success===true)return{success:true,skillId:row.id,actor,result:JSON.parse(JSON.stringify(result))};failures.push({id:row.id,result});}catch(error){failures.push({id:row.id,error:String(error&&error.message||error)});}
    }
    return{success:false,terminal:false,actor,ids,failures};
  });
}

async function driveBattleToTerminal(page){
  for(let i=0;i<16;i+=1){
    const state=await page.evaluate(()=>({active:!!currentBattle?.active,over:!!currentBattle?.battleOver,outcome:currentBattle?.outcome?.type||null,playerPL:typeof getBattleRemainingPL==="function"?getBattleRemainingPL("player",currentBattle?.characterId):null,enemyPL:typeof getBattleRemainingPL==="function"?getBattleRemainingPL("enemy",SC_PROMOTION_COURIER_ASSESSMENT_60310.rogueRef):null}));
    if(state.over)return state;
    const action=await battleAction(page);
    if(!action.success){await page.waitForTimeout(450);continue;}
    await page.waitForTimeout(950);
  }
  return page.evaluate(()=>({active:!!currentBattle?.active,over:!!currentBattle?.battleOver,outcome:currentBattle?.outcome?.type||null}));
}

async function continueTerminalResult(page,outcome,attemptId){
  if(outcome==="victory"){
    await page.waitForSelector(".alpha-victory-code-screen,.victory-screen",{state:"visible",timeout:15000});
    for(let i=0;i<4;i+=1){
      const resumed=await page.evaluate(id=>SC_PROMOTION_COURIER_ASSESSMENT_60310.getOccurrence(id)?.battle?.active===false,attemptId);
      if(resumed)return;
      const result=await page.evaluate(()=>typeof globalThis.continueAfterVictory==="function"?globalThis.continueAfterVictory():null);
      assert(result,"Victory Continue authority unavailable");await page.waitForTimeout(180);
    }
  }else{
    await page.waitForSelector('[data-terminal-result-owner="54400"].alpha544-setback,.battle-terminal-setback',{state:"visible",timeout:15000});
    const result=await page.evaluate(()=>typeof globalThis.continueAfterSetback54400==="function"?globalThis.continueAfterSetback54400():null);
    assert(result,"Setback Continue authority unavailable");await page.waitForTimeout(180);
  }
  await page.waitForFunction(id=>SC_PROMOTION_COURIER_ASSESSMENT_60310.getOccurrence(id)?.battle?.active===false,attemptId,{timeout:10000});
}

async function battlePassScenario(browser){
  const env=await freshPage(browser,1920,1080,"battle-pass");const {page,context,gate}=env;
  try{
    const beforeRewards=await rewardSnapshot(page),beforeProtected=await protectedSnapshot(page),committed=await inspectAndCommit(page);
    await routeToNorthRavine(page,{recordTeammate:true,secureDispatch:true});
    const contact=await confirmContact(page,"subject_teammate");
    await page.evaluate(()=>{globalThis.SC_DISABLE_FIRST_PL_BATTLE_TUTORIAL_QA=true;});
    const launched=await page.evaluate(()=>SC_PROMOTION_INSTALLED_60330.launchHoldLineBattle());
    assert.strictEqual(launched?.success,true,"Hold-Line launch failed: "+JSON.stringify(launched));
    assert.deepStrictEqual(launched.participantRefs,contact.refs,"Hold-Line Battle participant subset drift");
    assert(!launched.participantRefs.some(ref=>String(ref).includes("kakashi")),"non-contact Kakashi leaked into Hold-Line Battle");
    assert.strictEqual(launched.battleConfigId,"battle_cfg_academy_genin_missing_courier_hold_line_v1");
    assert.strictEqual(launched.encounterId,"enc_academy_genin_missing_courier_rogue_hold_line_v1");
    const battleIdentity=await page.evaluate(()=>({battleId:currentBattle?.battleId,returnContext:JSON.parse(JSON.stringify(currentBattle?.returnContext||null)),participantIds:(currentBattle?.deployment?.player?.slots||[]).map(x=>x&&x.participantId).filter(Boolean)}));
    assert.strictEqual(battleIdentity.returnContext?.type,"field_readiness_assessment");
    assert.strictEqual(battleIdentity.returnContext?.assessmentAttemptId,committed.attemptId);

    let firstAction=null;
    for(let i=0;i<6&&!firstAction?.success;i+=1){firstAction=await battleAction(page);if(!firstAction.success)await page.waitForTimeout(350);}
    assert(firstAction?.success,"no real Hold-Line Skill action could be committed: "+JSON.stringify(firstAction));
    await page.waitForTimeout(600);
    const beforeReload=await page.evaluate(id=>({
      attemptId:SC_PROMOTION_INSTALLED_60330.activeAttempt(),
      occurrence:SC_PROMOTION_COURIER_ASSESSMENT_60310.getOccurrence(id),
      battle:{active:!!currentBattle?.active,over:!!currentBattle?.battleOver,battleId:currentBattle?.battleId||null,config:currentBattle?.battleConfigId||null,meta:currentBattle?.promotionCourier60310||null},
      savedPlayer:savePlayerData(),savedSession:typeof saveTestState==="function"?saveTestState():null
    }),committed.attemptId);
    assert(beforeReload.battle.active&&!beforeReload.battle.over,"Battle terminated before mid-Battle persistence proof");
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    const returningLogin=page.locator('[data-afd2-action="login"]');
    if(await returningLogin.count()>0&&await returningLogin.isEnabled())await returningLogin.click();
    else await releaseFrontDoor(page);
    await clearTutorialChrome(page);
    const afterReload=await page.evaluate(id=>({
      attemptId:SC_PROMOTION_INSTALLED_60330.activeAttempt(),
      occurrence:SC_PROMOTION_COURIER_ASSESSMENT_60310.getOccurrence(id),
      battle:{active:!!currentBattle?.active,over:!!currentBattle?.battleOver,battleId:currentBattle?.battleId||null,config:currentBattle?.battleConfigId||null,meta:currentBattle?.promotionCourier60310||null}
    }),committed.attemptId);
    assert.strictEqual(afterReload.attemptId,committed.attemptId,"mid-Battle reload lost assessment lineage");
    assert.strictEqual(afterReload.occurrence?.battle?.battleOccurrenceId,beforeReload.occurrence?.battle?.battleOccurrenceId,"mid-Battle reload rerolled Battle occurrence");
    assert.strictEqual(afterReload.battle.active,true,"mid-Battle reload did not restore active Battle");
    assert.strictEqual(afterReload.battle.battleId,beforeReload.battle.battleId,"mid-Battle reload changed Battle identity");
    assert(afterReload.battle.meta&&afterReload.battle.meta.assessmentAttemptId===committed.attemptId,"mid-Battle reload lost #603 caller metadata");
    try{await page.evaluate(()=>globalThis.openOverlay?.("combat"));}catch(_error){}

    const terminal=await driveBattleToTerminal(page);
    assert.strictEqual(terminal.over,true,"Hold-Line Battle did not reach factual terminal result");
    assert(["victory","defeat"].includes(terminal.outcome),"real-action Hold-Line route produced invalid factual outcome: "+JSON.stringify(terminal));
    await continueTerminalResult(page,terminal.outcome,committed.attemptId);
    const returned=await page.evaluate(id=>SC_PROMOTION_COURIER_ASSESSMENT_60310.getOccurrence(id),committed.attemptId);
    assert.strictEqual(returned.battle.active,false,"canonical #544 Continue did not resume #603 caller");
    assert.strictEqual(returned.battle.returnEnvelope?.battleResult,terminal.outcome);
    assert(returned.battle.returnEnvelope?.subjectCombatEvidenceSummary?.subjectCommittedActionRefs?.length>0,"Hold-Line return lost subject committed action evidence");
    assert.strictEqual(returned.missionObjectiveCompleted,null,"Battle result manufactured mission completion");
    const battleRewards=(await rewardSnapshot(page)).rows.filter(r=>r.cause==="battle_victory");
    if(terminal.outcome==="victory"){assert.strictEqual(battleRewards.length,1,"Hold-Line Victory must award one separate 50 Ryō cause");assert.strictEqual(battleRewards[0].ryo,50);}
    else assert.strictEqual(battleRewards.length,0,"Hold-Line defeat manufactured Battle-victory reward");

    if(terminal.outcome==="defeat"){const postBattle=await page.evaluate(()=>SC_PROMOTION_INSTALLED_60330.resolveNonBattleContact("agen_m01_contact_extract_under_cover_v1","pressured_extraction"));assert.strictEqual(postBattle?.success,true,"post-defeat mission continuation was not actionable: "+JSON.stringify(postBattle));}
    await completeReturnRoute(page,{courierOutcome:"recovered_with_team",handoff:true,debrief:true});
    const beforeFinalize=await rewardSnapshot(page);
    const resolved=await page.evaluate(()=>{
      const api=SC_PROMOTION_INSTALLED_60330,c=SC_PROMOTION_COURIER_ASSESSMENT_60310,id=api.activeAttempt();
      const terminal=api.commitTerminal(c.terminalStates.COMPLETE);if(!terminal?.success)throw new Error(JSON.stringify(terminal));
      const sync=api.syncQualifiedEvidence();if(!sync?.success)throw new Error(JSON.stringify(sync));
      const final=api.finalize();if(!final?.success)throw new Error(JSON.stringify(final));
      return{final,truth:api.getTruth(),occurrence:c.getOccurrence(id),rank:getOwnedCharacterFormalRank("owned_character_academy_menma"),team:getChronicleCurrentTeam43600(),ownership:Object.values(ensurePlayerAcquisitionState().ownedCharactersByVariantId||{}).map(x=>x&&x.ownedCharacterId).filter(Boolean).sort()};
    });
    assert.strictEqual(resolved.truth.outcome,"PASS","full factual Battle route did not PASS");
    assert.strictEqual(String(resolved.rank).toLowerCase(),"genin","valid PASS did not invoke authorised Genin transition");
    const afterFinalize=await rewardSnapshot(page);
    const expectedRyo=terminal.outcome==="victory"?300:250;
    assert.strictEqual(afterFinalize.ryo-beforeRewards.ryo,expectedRyo,"Battle+mission route reward total drift");
    assert.strictEqual(afterFinalize.pill-beforeRewards.pill,1,"Battle+mission PASS missing Field Recovery Pill");
    assert.strictEqual(afterFinalize.ryo,beforeFinalize.ryo,"PASS itself granted extra Ryō");
    const causes=afterFinalize.rows.map(r=>r.cause).sort();
    for(const cause of ["courier_recovered_alive","dispatch_returned_intact","full_mission_objective_completion"])assert(causes.includes(cause),"missing reward cause "+cause+": "+JSON.stringify(causes));
    assert.strictEqual(causes.includes("battle_victory"),terminal.outcome==="victory","Battle reward cause did not match factual Battle result");
    const afterProtected=await protectedSnapshot(page);
    const beforeObj=JSON.parse(beforeProtected),afterObj=JSON.parse(afterProtected);
    assert.deepStrictEqual(afterObj.team.teamVariantIds,beforeObj.team.teamVariantIds,"Promotion PASS mutated current team assignment");
    assert.deepStrictEqual(afterObj.ownership,beforeObj.ownership,"Promotion PASS mutated ownership set");

    const historyCount=afterFinalize.rows.length,ryoBeforeReplay=afterFinalize.ryo;
    const replay=await page.evaluate(()=>SC_PROMOTION_INSTALLED_60330.finalize());
    assert.strictEqual(replay?.success,true,"resolved PASS replay should remain idempotent: "+JSON.stringify(replay));
    const replayRewards=await rewardSnapshot(page);
    assert.strictEqual(replayRewards.ryo,ryoBeforeReplay,"PASS replay duplicated rewards");
    assert.strictEqual(replayRewards.rows.length,historyCount,"Receipt reopen/replay duplicated reward transactions");
    const host=await openInstalled(page),receiptText=(await host.innerText()).replace(/\s+/g," ");
    assert(/PASS/.test(receiptText)&&/CHRONICLE RECEIPT/i.test(receiptText),"PASS Assessment Record / Chronicle Receipt missing");
    assert(/150 Ryō/.test(receiptText)&&/100 Ryō/.test(receiptText)&&/Field Recovery Pill/i.test(receiptText),"Receipt did not project exact mission reward causes");
    assert.strictEqual(/50 Ryō/.test(receiptText),terminal.outcome==="victory","Receipt Battle reward projection did not match factual outcome");
    await page.screenshot({path:path.join(OUT,"05-battle-pass-genin-receipt.png"),fullPage:true});
    await gate.assertClean("603-battle-pass");
    return{attemptId:committed.attemptId,packageId:committed.packageId,battleOutcome:terminal.outcome,midBattleReloadStable:true,pass:true,genin:true,ryoDelta:terminal.outcome==="victory"?300:250,pillDelta:1};
  }finally{await context.close();}
}

async function viewportSmoke(browser,width,height,label){
  const env=await freshPage(browser,width,height,label);const {page,context,gate}=env;
  try{
    const committed=await inspectAndCommit(page,{arenaGuide:true});
    await page.screenshot({path:path.join(OUT,`${label}-inspection-attempt.png`),fullPage:true});
    await gate.assertClean(label);
    return{viewport:{width,height},attemptId:committed.attemptId,packageId:committed.packageId};
  }finally{await context.close();}
}

(async()=>{
  if(!integratedFilesPresent()){
    const result={pass:!REQUIRE,skipped:true,reason:"#603 production modules not all present",required:REQUIRE,browserGoldenClaimed:false};
    console.log(JSON.stringify(result,null,2));if(REQUIRE)process.exit(2);return;
  }
  const browser=await chromium.launch({headless:true});
  try{
    const results={};
    results.viewport1366=await viewportSmoke(browser,1366,768,"1366x768");
    results.viewport1920=await viewportSmoke(browser,1920,1080,"1920x1080");
    results.nonBattle=await fullNonBattleScenario(browser);
    results.partialRetryReload=await partialRetryReloadScenario(browser);
    results.courierOnly=await courierOnlyScenario(browser);
    results.battlePass=await battlePassScenario(browser);
    console.log(JSON.stringify({pass:true,results,coverage:{inspection:true,deliberateCommit:true,hiddenRevealedNonLeak:true,legalNonBattle:true,holdLineBattle:true,partialValue:true,passAndFail:true,retrySamePackage:true,saveReloadMidAttempt:true,saveReloadMidBattle:true,exactRewardCauses:true,receiptIdempotence:true,validPassOnlyGenin:true,northRavineFirewall:true},browserGoldenClaimed:false},null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});