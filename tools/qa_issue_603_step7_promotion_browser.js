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
function semanticSnapshotScript(){
  return ()=>JSON.stringify({
    ryo:globalThis.playerData?.ryo??null,
    currentTeam:globalThis.playerData?.chronicleStateManifest?.currentTeam??globalThis.playerData?.currentTeam??null,
    ownership:globalThis.playerData?.characterOwnership??null,
    assignment:globalThis.playerData?.teamAssignments??globalThis.playerData?.assignments??null,
    battleDeployment:globalThis.currentBattle?.deployment??null,
    activityHistory:globalThis.playerData?.activityHistory??null,
    inventory:globalThis.playerData?.inventory??null
  });
}
async function releaseFrontDoor(page){
  await page.waitForFunction(()=>!!globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400||!!document.getElementById("sc-alpha-front-door-33400"),null,{timeout:10000}).catch(()=>{});
  await page.evaluate(()=>{
    try{globalThis.releaseAlphaFrontDoor33300?.();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    document.getElementById("sc-alpha-front-door-33300")?.remove();
    document.getElementById("sc-alpha-front-door-33400")?.remove();
  });
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
    return{selected,completed,one,two,formed,continued,team:typeof getChronicleCurrentTeam43600==="function"?getChronicleCurrentTeam43600():null,origin:ensurePlayerAcquisitionState().chronicleOriginOwnedCharacterId};
  },label);
  for(const key of ["selected","completed","one","two","formed","continued"])assert(result[key]&&result[key].success===true,`${label} Academy setup ${key} failed: ${JSON.stringify(result[key])}`);
  assert.strictEqual(result.origin,"owned_character_academy_menma",`${label} wrong Promotion subject lineage`);
  assert.deepStrictEqual(result.team&&result.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"],`${label} wrong current team fixture`);
  return result;
}
async function openPromotionInspection(page){
  await releaseFrontDoor(page);
  await page.evaluate(()=>globalThis.openOverlay?.("arena"));
  const arena=page.locator("#overlay-content-container");await arena.waitFor({state:"visible",timeout:15000});
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
    if(await promotion.count()===0)throw new Error("promotion_entry_control_missing");
    await promotion.click();
  }
  await page.locator("#overlay-content-container .sc60320-stage").waitFor({state:"visible",timeout:15000});
  const inspect=arena.getByRole("button",{name:/inspect readiness/i}).first();
  assert(await inspect.count()>0,"explicit read-only inspection control missing");
  await inspect.click();
  await page.waitForTimeout(150);
  const body=(await arena.innerText()).toUpperCase();
  assert(body.includes("FIELD READINESS ASSESSMENT"),"Promotion inspection did not render canonical #603 UI");
  return arena;
}
function normalizeHiddenDom(rows){
  return rows.map(r=>({text:r.text,aria:r.aria,role:r.role,classes:r.classes,data:r.data}));
}
async function hiddenProjectionRows(page){
  return page.locator('#overlay-content-container .sc60320-slot')
    .evaluateAll(nodes=>nodes.map(node=>({
      text:(node.textContent||"").trim(),aria:node.getAttribute("aria-label"),role:node.getAttribute("role"),classes:node.className,
      data:Object.fromEntries([...node.attributes].filter(a=>a.name.startsWith("data-")).map(a=>[a.name,a.value]))
    })));
}
async function viewportScenario(browser,width,height,label){
  const context=await browser.newContext({viewport:{width,height}});const page=await context.newPage();const errors=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>typeof globalThis.openOverlay==="function"&&typeof globalThis.openInstalledPromotion60330==="function",null,{timeout:30000});
    await releaseFrontDoor(page);
    await seedPlayableAcademy(page,`qa603:${label}`);
    await releaseFrontDoor(page);
    const before=await page.evaluate(semanticSnapshotScript());
    const arena=await openPromotionInspection(page);
    const afterInspection=await page.evaluate(semanticSnapshotScript());
    assert.strictEqual(afterInspection,before,"inspection mutated protected semantic state / committed attempt");

    const hidden=normalizeHiddenDom(await hiddenProjectionRows(page));
    assert.strictEqual(hidden.length,4,"Promotion UI did not render exactly four readiness slots");
    assert(hidden.every(row=>!JSON.stringify(row).match(/information_use|team_coordination|combat_readiness|objective_protection|academy_genin_fr_pkg_/i)),"hidden requirement truth leaked to DOM/accessibility metadata: "+JSON.stringify(hidden));

    const hiddenTwin=await page.evaluate(async()=>{
      if(typeof globalThis.normalizePromotionArenaTruth60320!=="function"||typeof globalThis.mountPromotionArenaUI60320!=="function")return{available:false};
      const makeTruth=satisfied=>({phase:"INSPECTION",currentRankLabel:"Academy Student",targetRankLabel:"Genin",canInspect:true,canEnterAssessment:false,readinessSlots:[
        {revealed:true,publicLabel:"Mission comprehension",satisfied:false},
        {revealed:false,publicLabel:"SHOULD_NOT_LEAK",domain:"judgement_under_pressure",satisfied},
        {revealed:false,publicLabel:"SHOULD_NOT_LEAK",domain:"combat_readiness",satisfied},
        {revealed:false,publicLabel:"SHOULD_NOT_LEAK",domain:"objective_protection",satisfied}
      ]});
      async function capture(satisfied){
        const host=document.createElement("div");host.setAttribute("data-qa603-hidden-twin","true");document.body.appendChild(host);
        const truth=makeTruth(satisfied);
        const normalized=normalizePromotionArenaTruth60320(truth);
        const controller=mountPromotionArenaUI60320(host,{truth});
        if(typeof globalThis.refreshPromotionArenaUI60320==="function")await refreshPromotionArenaUI60320(controller,{announce:false});
        await new Promise(resolve=>requestAnimationFrame(()=>resolve()));
        const rows=[...host.querySelectorAll(".sc60320-slot")].map(node=>({
          text:(node.textContent||"").replace(/\s+/g," ").trim(),
          aria:node.getAttribute("aria-label"),
          role:node.getAttribute("role"),
          state:node.getAttribute("data-state"),
          attrs:[...node.attributes].map(a=>[a.name,a.value]).sort()
        }));
        const html=host.innerHTML;
        globalThis.unmountPromotionArenaUI60320?.(controller);host.remove();
        return{normalized:JSON.stringify(normalized),rows:JSON.stringify(rows),html};
      }
      return{available:true,unsatisfied:await capture(false),satisfied:await capture(true)};
    });
    assert.strictEqual(hiddenTwin.available,true,"Promotion UI hidden-twin API unavailable");
    assert.strictEqual(hiddenTwin.satisfied.normalized,hiddenTwin.unsatisfied.normalized,"hidden satisfied/unsatisfied public truth differs");
    assert.strictEqual(hiddenTwin.satisfied.rows,hiddenTwin.unsatisfied.rows,"hidden satisfied/unsatisfied DOM/accessibility differs");
    assert.strictEqual(hiddenTwin.satisfied.html,hiddenTwin.unsatisfied.html,"hidden satisfied/unsatisfied rendered markup differs");

    const attemptButton=arena.getByRole("button",{name:/enter assessment/i}).first();
    assert(await attemptButton.count()>0,"explicit attempt-commit control missing");
    assert.strictEqual(await attemptButton.isEnabled(),true,"explicit attempt-commit control remained disabled after inspection");
    await attemptButton.click();await page.waitForTimeout(200);
    const attemptTruth=await page.evaluate(()=>{
      const api=globalThis.SC_PROMOTION_INSTALLED_60330;
      const attemptId=api&&typeof api.activeAttempt==="function"?api.activeAttempt():null;
      const truth=api&&typeof api.getTruth==="function"?api.getTruth():null;
      return{attemptId,truth};
    });
    assert(attemptTruth.attemptId,"no committed assessmentAttemptId after explicit attempt commit");
    assert.strictEqual(attemptTruth.truth&&attemptTruth.truth.phase,"COMMITTED","Promotion truth did not enter COMMITTED phase");

    await page.screenshot({path:path.join(OUT,label+"-inspection-attempt.png"),fullPage:true});
    await errors.assertClean(label);
    return{label,viewport:{width,height},inspectionMutation:false,hiddenRows:hidden.length,hiddenSatisfiedUnsatisfiedIndistinguishable:true,assessmentAttemptId:attemptTruth.attemptId};
  }finally{await context.close();}
}

(async()=>{
  if(!integratedFilesPresent()){
    const result={pass:!REQUIRE,skipped:true,reason:"#603 production modules not all present; browser cases are integration-only",required:REQUIRE,browserGoldenClaimed:false};
    console.log(JSON.stringify(result,null,2));if(REQUIRE)process.exit(2);return;
  }
  const browser=await chromium.launch({headless:true});
  try{
    const results=[];
    results.push(await viewportScenario(browser,1366,768,"1366x768"));
    results.push(await viewportScenario(browser,1920,1080,"1920x1080"));
    console.log(JSON.stringify({pass:true,results,browserGoldenClaimed:false,integrationCoveragePending:[
      "non-Battle route","Hold-Line Battle participant subset/return","mission/Battle reward idempotence","partial unsuccessful attempt","PASS/FAIL/abort/withdrawal Receipt","save/reload mid-attempt/mid-Battle","valid-PASS-only Genin transition","North Ravine collision"
    ]},null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});