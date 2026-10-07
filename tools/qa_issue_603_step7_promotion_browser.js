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
  await page.evaluate(()=>{
    try{globalThis.releaseAlphaFrontDoor33300?.();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    document.querySelector(".game-container")?.removeAttribute("data-alpha-front-door-locked");
    document.getElementById("sc-alpha-front-door-33300")?.remove();
    document.getElementById("sc-alpha-front-door-33400")?.remove();
  });
}
async function openPromotionInspection(page){
  await page.evaluate(()=>globalThis.openOverlay?.("arena"));
  const arena=page.locator("#overlay-content-container");await arena.waitFor({state:"visible",timeout:15000});
  const promotion=arena.getByRole("button",{name:/promotion/i}).first();
  if(await promotion.count()===0)throw new Error("promotion_entry_control_missing");
  await promotion.click();
  await page.waitForTimeout(150);
  const body=(await arena.innerText()).toUpperCase();
  assert(body.includes("PROMOTION"),"Promotion inspection did not render");
  return arena;
}
function normalizeHiddenDom(rows){
  return rows.map(r=>({text:r.text,aria:r.aria,role:r.role,classes:r.classes,data:r.data}));
}
async function hiddenProjectionRows(page){
  return page.locator('#overlay-content-container [data-promotion-requirement-slot], #overlay-content-container .promotion-readiness-slot, #overlay-content-container [class*="readiness"]')
    .evaluateAll(nodes=>nodes.map(node=>({
      text:(node.textContent||"").trim(),aria:node.getAttribute("aria-label"),role:node.getAttribute("role"),classes:node.className,
      data:Object.fromEntries([...node.attributes].filter(a=>a.name.startsWith("data-")).map(a=>[a.name,a.value]))
    })));
}
async function viewportScenario(browser,width,height,label){
  const context=await browser.newContext({viewport:{width,height}});const page=await context.newPage();const errors=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});await releaseFrontDoor(page);
    await page.waitForFunction(()=>typeof globalThis.openOverlay==="function",null,{timeout:30000});
    const before=await page.evaluate(semanticSnapshotScript());
    const arena=await openPromotionInspection(page);
    const afterInspection=await page.evaluate(semanticSnapshotScript());
    assert.strictEqual(afterInspection,before,"inspection mutated semantic state / committed attempt");

    const hidden=normalizeHiddenDom(await hiddenProjectionRows(page));
    assert(hidden.every(row=>!JSON.stringify(row).match(/information_use|team_coordination|combat_readiness|objective_protection|academy_genin_fr_pkg_/i)),"hidden requirement truth leaked to DOM/accessibility metadata: "+JSON.stringify(hidden));

    // Adversarial twin fixture: only hidden satisfaction differs. Public model + actual DOM/ARIA must be byte-identical.
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

    const attemptButton=arena.getByRole("button",{name:/begin|start|commit|accept.*assessment|attempt/i}).first();
    assert(await attemptButton.count()>0,"explicit attempt-commit control missing");
    await attemptButton.click();await page.waitForTimeout(200);
    const attemptTruth=await page.evaluate(()=>{
      const roots=[globalThis.SC_PROMOTION_CORE_60300,globalThis.SC_ACADEMY_GENIN_PROMOTION_CORE_60300,globalThis.playerData?.promotion603,globalThis.playerData?.promotionRuntime].filter(Boolean);
      const json=JSON.stringify(roots);
      const ids=json.match(/assessment[_A-Za-z0-9:-]*603[_A-Za-z0-9:-]*|assessmentAttemptId[^,}\]]*/g)||[];
      return{roots:roots.length,ids};
    });
    assert(attemptTruth.roots>0,"no discoverable committed Promotion state after explicit attempt commit");

    await page.screenshot({path:path.join(OUT,label+"-inspection-attempt.png"),fullPage:true});
    await errors.assertClean(label);
    return{label,viewport:{width,height},inspectionMutation:false,hiddenRows:hidden.length,hiddenSatisfiedUnsatisfiedIndistinguishable:true,attemptStateRoots:attemptTruth.roots};
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
