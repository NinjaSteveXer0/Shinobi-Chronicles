#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.SC609_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.SC609_OUT||"artifacts/issue-609-player-controls";
const TARGET=process.env.SC609_TARGET_SHA||"2d76f08158d7875b26034cabc3fa24c41b464b2a";
fs.mkdirSync(OUT,{recursive:true});

const forbiddenAdvanceNames=[
  "commitBriefing","advanceJourney","resolveSearch","resolvePriority","confirmHostileContact",
  "launchHoldLineBattle","resolveNonBattleContact","beginExtraction","handoffDispatch","commitDebrief",
  "commitTerminal","executePlayerMissionAction","finalize"
];

async function releaseFrontDoor(page){
  await page.waitForTimeout(80);
  const login=page.locator('[data-afd2-action="login"]');
  if(await login.count()&&await login.isVisible().catch(()=>false)&&await login.isEnabled().catch(()=>false)){
    await login.click();await page.waitForTimeout(120);return;
  }
  await page.evaluate(()=>{
    try{globalThis.releaseAlphaFrontDoor33300?.();}catch(_){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.removeAttribute("aria-hidden");game.inert=false;}
    document.getElementById("sc-alpha-front-door-33300")?.remove();
    document.getElementById("sc-alpha-front-door-33400")?.remove();
  });
}
async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_PROMOTION_INSTALLED_60330&&globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310&&
    globalThis.SC_PROMOTION_CORE_60300&&typeof globalThis.openOverlay==="function"&&
    typeof globalThis.getChronicleCurrentTeam43600==="function"
  ),null,{timeout:30000});
}
async function bootstrapAcademy(page,label){
  return page.evaluate(sourceLabel=>{
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
    globalThis.SC_DISABLE_FIRST_PL_BATTLE_TUTORIAL_QA=true;
    return{selected,completed,one,two,formed,continued,team:getChronicleCurrentTeam43600()};
  },label);
}
async function newEnv(browser,width,height,label){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await waitRuntime(page);await releaseFrontDoor(page);
  const setup=await bootstrapAcademy(page,`qa609:${label}`);
  for(const key of ["selected","completed","one","two","formed","continued"])assert.strictEqual(setup[key]?.success,true,`${label} bootstrap ${key} failed ${JSON.stringify(setup[key])}`);
  await releaseFrontDoor(page);
  return{context,page,gate};
}
async function openPromotionViaVisibleArena(page){
  // Opening the Arena overlay is bootstrap/navigation setup. From the Arena onward,
  // every route-changing action in this verifier is an actual visible control click.
  await page.evaluate(()=>globalThis.openOverlay("arena"));
  const arena=page.locator("#overlay-content-container");
  await arena.waitFor({state:"visible",timeout:15000});
  const guide=page.locator("#sc-konoha-onboarding-35000");
  if(await guide.count()&&await guide.isVisible().catch(()=>false)){
    const cont=guide.getByRole("button",{name:/^continue$/i}).first();
    if(await cont.count()){await cont.click();await page.waitForTimeout(100);}
    const take=page.locator("#sc-konoha-onboarding-35000").getByRole("button",{name:/take promotion assessment/i}).first();
    if(await take.count())await take.click();
  }else{
    const promotion=arena.getByRole("button",{name:/promotion/i}).first();
    assert(await promotion.count()>0,"Arena does not expose a visible Promotion control");
    await promotion.click();
  }
  const stage=page.locator("#overlay-content-container .sc60320-stage");
  await stage.waitFor({state:"visible",timeout:15000});
  return stage;
}
async function clickVisible(page,name){
  const stage=page.locator("#overlay-content-container .sc60320-stage");
  await stage.waitFor({state:"visible",timeout:15000});
  const button=stage.getByRole("button",{name}).first();
  await button.waitFor({state:"visible",timeout:10000});
  assert(await button.isEnabled(),`visible player control disabled: ${name}`);
  await button.click();
  await page.waitForTimeout(140);
}
async function inspectAndEnter(page){
  const stage=await openPromotionViaVisibleArena(page);
  const before=await protectedSnapshot(page);
  await clickVisible(page,/inspect readiness/i);
  const rows=await stage.locator(".sc60320-slot").evaluateAll(nodes=>nodes.map(n=>({text:n.textContent,aria:n.getAttribute("aria-label"),state:n.getAttribute("data-state")})));
  assert.strictEqual(rows.length,4);
  assert(rows.some(x=>x.state==="HIDDEN"),"inspection exposed no hidden readiness slots");
  assert(!JSON.stringify(rows).match(/information_use|team_coordination|combat_readiness|objective_protection|academy_genin_fr_pkg_/i),"hidden readiness leaked into DOM/ARIA");
  assert.strictEqual(await protectedSnapshot(page),before,"inspection mutated protected topology");
  await clickVisible(page,/enter assessment/i);
  await page.waitForFunction(()=>!!globalThis.SC_PROMOTION_INSTALLED_60330.activeAttempt(),null,{timeout:10000});
  return observeAttempt(page);
}
async function observeAttempt(page){
  return page.evaluate(()=>{
    const api=SC_PROMOTION_INSTALLED_60330,got=api.getController(),snap=got.row.core.getDiagnosticSnapshot();
    const id=api.activeAttempt()||snap.state.attempts.at(-1)?.assessmentAttemptId||null;
    const occ=id?SC_PROMOTION_COURIER_ASSESSMENT_60310.getOccurrence(id):null;
    return{id,packageId:snap.state.promotionRequirementPackageId,attempts:snap.state.attempts.map(x=>({id:x.assessmentAttemptId,status:x.status,number:x.attemptNumber})),occ};
  });
}
async function protectedSnapshot(page){
  return page.evaluate(()=>JSON.stringify({
    team:getChronicleCurrentTeam43600(),
    ownership:playerData.characterOwnership,
    assignment:playerData.clan?.currentTeamAssignment||null,
    deployment:currentBattle?.active?currentBattle.deployment:null
  }));
}
async function rewards(page){
  return page.evaluate(()=>({
    ryo:Number(playerData.ryo)||0,
    pill:(playerData.inventory||[]).filter(x=>x&&x.id==="field_recovery_pill").reduce((n,x)=>n+Math.max(1,Number(x.quantity)||1),0),
    rows:(playerData.activityHistory||[]).filter(x=>x&&x.type==="promotion_assessment_reward").map(x=>({key:x.idempotenceKey,source:x.rewardSourceId,cause:x.cause,ryo:x.rewards?.ryo||0}))
  }));
}
async function clickOutboundToContact(page,{priority=/secure the dispatch first/i}={}){
  for(const name of [
    /receive examiner briefing/i,/leave for the village gate/i,/enter whisper woods/i,
    /continue to the north ravine/i,/follow the fresh trail/i,priority,/respond to the approaching rogue/i
  ])await clickVisible(page,name);
}
async function clickReturnAndResolve(page){
  const candidates=[
    /begin extraction to konoha/i,/return through whisper woods/i,/return to the village gate/i,
    /report back to administration/i,/return the sealed dispatch/i,/report what happened/i,
    /receive the examiner decision/i
  ];
  for(const name of candidates){
    const stage=page.locator("#overlay-content-container .sc60320-stage");
    const b=stage.getByRole("button",{name}).first();
    await b.waitFor({state:"visible",timeout:10000});await b.click();await page.waitForTimeout(150);
  }
}
async function nonBattle(browser,width,height,label){
  const {context,page,gate}=await newEnv(browser,width,height,label);
  try{
    const beforeR=await rewards(page),beforeP=await protectedSnapshot(page),start=await inspectAndEnter(page);
    await clickOutboundToContact(page,{});
    await clickVisible(page,/get the courier moving/i);
    await clickReturnAndResolve(page);
    await page.waitForFunction(()=>!!SC_PROMOTION_INSTALLED_60330.getTruth()?.outcome,null,{timeout:10000});
    const end=await page.evaluate(()=>({truth:SC_PROMOTION_INSTALLED_60330.getTruth(),rank:getOwnedCharacterFormalRank("owned_character_academy_menma"),history:JSON.stringify(playerData.activityHistory||[])}));
    const afterR=await rewards(page),afterP=await protectedSnapshot(page);
    assert.strictEqual(afterR.ryo-beforeR.ryo,250,"non-Battle visible route did not award exact 250 Ryō mission value");
    assert.strictEqual(afterR.pill-beforeR.pill,1,"non-Battle visible route did not award Field Recovery Pill");
    assert.strictEqual(afterR.rows.filter(x=>String(x.key||"").startsWith("battle_reward::")).length,0,"non-Battle visible route manufactured Battle reward");
    assert.strictEqual(afterP,beforeP,"visible non-Battle route mutated unrelated topology");
    assert(!/arc1_m1_whisper_major_contact(?:_event)?|scene_arc1_m1_whisper_major_contact/.test(end.history),"North Ravine collided with Arc-1 major contact");
    assert(["PASS","FAIL"].includes(end.truth.outcome),`visible non-Battle route did not resolve: ${JSON.stringify(end.truth)}`);
    if(end.truth.outcome==="PASS")assert.strictEqual(String(end.rank).toLowerCase(),"genin","valid PASS did not perform Origin Genin transition");
    else assert.notStrictEqual(String(end.rank).toLowerCase(),"genin","non-PASS manufactured Origin Genin transition");
    await page.screenshot({path:path.join(OUT,`${label}-${width}x${height}-nonbattle.png`),fullPage:true});
    await gate.assertClean(`${label}-nonbattle`);
    return{start,end,afterR};
  }finally{await context.close();}
}
async function withdrawalReload(browser){
  const {context,page,gate}=await newEnv(browser,1366,768,"withdraw-reload");
  try{
    const first=await inspectAndEnter(page);
    await clickVisible(page,/receive examiner briefing/i);
    await clickVisible(page,/leave for the village gate/i);
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await releaseFrontDoor(page);
    await openPromotionViaVisibleArena(page);
    const loaded=await observeAttempt(page);
    assert.strictEqual(loaded.id,first.id,"active attempt identity changed after reload");
    assert.strictEqual(loaded.packageId,first.packageId,"reload rerolled immutable package");
    await clickVisible(page,/^withdraw$/i);
    const withdrawn=await page.evaluate(()=>({truth:SC_PROMOTION_INSTALLED_60330.getTruth(),rank:getOwnedCharacterFormalRank("owned_character_academy_menma")}));
    assert.strictEqual(withdrawn.truth.outcome,"WITHDRAWN","visible Withdraw did not commit historical WITHDRAWN state");
    assert.notStrictEqual(String(withdrawn.rank).toLowerCase(),"genin","withdrawal manufactured Genin transition");
    await clickVisible(page,/enter assessment/i);
    const retry=await observeAttempt(page);
    assert.notStrictEqual(retry.id,first.id,"visible retry reused attempt ID");
    assert.strictEqual(retry.packageId,first.packageId,"visible retry rerolled package");
    assert.strictEqual(retry.attempts.length,2,"retry lineage incorrect");
    await gate.assertClean("withdraw-reload");
    return{first,retry};
  }finally{await context.close();}
}
async function clickBattleSkill(page){
  const stage=page.locator(".alpha-code-battle-stage.battle2-modern");
  await stage.waitFor({state:"visible",timeout:15000});
  const skills=stage.locator('button[data-formation-family="skills"]').first();
  await skills.waitFor({state:"visible",timeout:10000});
  if(await skills.isEnabled())await skills.click();
  const deck=stage.locator(".battle-live-skill-deck");
  await deck.waitFor({state:"visible",timeout:10000});
  let card=deck.locator(".battle-dev-skill-card.is-ready").first();
  if(await card.count()===0)card=deck.locator(".battle-dev-skill-card:not([disabled])").first();
  await card.waitFor({state:"visible",timeout:10000});
  await card.click();
  await page.waitForTimeout(900);
}
async function finishBattleViaControls(page){
  for(let i=0;i<20;i++){
    const over=await page.evaluate(()=>!!currentBattle?.battleOver);
    if(over)break;
    try{await clickBattleSkill(page);}catch(_){await page.waitForTimeout(500);}
  }
  const terminal=await page.evaluate(()=>({over:!!currentBattle?.battleOver,outcome:currentBattle?.outcome?.type||null}));
  assert(terminal.over&&["victory","defeat"].includes(terminal.outcome),`Battle did not reach terminal through visible Skill controls: ${JSON.stringify(terminal)}`);
  const visibleContinue=page.getByRole("button",{name:/continue|return/i}).filter({visible:true}).first();
  await visibleContinue.waitFor({state:"visible",timeout:15000});
  await visibleContinue.click();
  await page.locator("#overlay-content-container .sc60320-stage").waitFor({state:"visible",timeout:15000});
  return terminal;
}
async function holdLine(browser){
  const {context,page,gate}=await newEnv(browser,1920,1080,"hold-line");
  try{
    const first=await inspectAndEnter(page);await clickOutboundToContact(page,{});
    await clickVisible(page,/hold the line/i);
    await page.waitForFunction(()=>currentBattle?.active===true,null,{timeout:15000});
    const battleBefore=await page.evaluate(()=>({attempt:SC_PROMOTION_INSTALLED_60330.activeAttempt(),returnAttempt:currentBattle?.returnContext?.assessmentAttemptId||null,config:currentBattle?.battleConfigId||null}));
    assert.strictEqual(battleBefore.attempt,first.id);assert.strictEqual(battleBefore.returnAttempt,first.id);
    assert.strictEqual(battleBefore.config,"battle_cfg_academy_genin_missing_courier_hold_line_v1");
    const terminal=await finishBattleViaControls(page);
    const after=await observeAttempt(page);
    assert.strictEqual(after.id,first.id,"Battle Continue did not return to same assessment attempt");
    const missionText=(await page.locator("#overlay-content-container .sc60320-mission").innerText()).replace(/\s+/g," ");
    assert(/assessment in progress|field assignment|extraction|return/i.test(missionText),"same-assessment mission did not resume visibly after Battle");
    await page.screenshot({path:path.join(OUT,"hold-line-1920x1080.png"),fullPage:true});
    await gate.assertClean("hold-line");
    return{first,terminal,after};
  }finally{await context.close();}
}
async function closeToKonoha(browser){
  const {context,page,gate}=await newEnv(browser,1366,768,"close-konoha");
  try{
    await openPromotionViaVisibleArena(page);
    const close=page.locator("#overlay-content-container .sc60320-close");
    await close.waitFor({state:"visible",timeout:10000});
    assert.strictEqual(await close.getAttribute("aria-label"),"Return to Konoha");
    await close.click();await page.waitForTimeout(200);
    assert.strictEqual(await page.locator("#overlay-content-container .sc60320-stage").count(),0,"Promotion stage remained after visible close");
    const text=(await page.locator("#overlay-content-container").innerText()).replace(/\s+/g," ");
    assert(/konoha/i.test(text),`visible close did not return to Konoha Village context: ${text.slice(0,300)}`);
    await gate.assertClean("close-konoha");return{text:text.slice(0,300)};
  }finally{await context.close();}
}

(async()=>{
  const source=fs.readFileSync(__filename,"utf8");
  for(const name of forbiddenAdvanceNames){
    const direct=new RegExp(`SC_PROMOTION_(?:INSTALLED_60330|COURIER_ASSESSMENT_60310)\\.${name}\\s*\\(`);
    assert(!direct.test(source),`verifier itself contains forbidden direct route-advance API call: ${name}`);
  }
  const browser=await chromium.launch({headless:true});
  try{
    const results={target:TARGET};
    results.nonbattle1366=await nonBattle(browser,1366,768,"viewport-a");
    results.nonbattle1920=await nonBattle(browser,1920,1080,"viewport-b");
    results.withdrawReload=await withdrawalReload(browser);
    results.holdLine=await holdLine(browser);
    results.close=await closeToKonoha(browser);
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(results,null,2));
    console.log(JSON.stringify({pass:true,target:TARGET,playerControlsOnly:true,browserGoldenClaimed:false,results},null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
