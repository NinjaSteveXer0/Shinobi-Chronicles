#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const cp=require("child_process");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const ROOT=path.resolve(__dirname,"..");
const BASE_SHA="3f9c1268120bb937d82398e1a954b6567bd6b4d3";
const TARGET_SHA="64307beb7243ce51d1c0aa345cf04a8492ce9cfc";
const BASE_URL=process.env.ISSUE_539_LANE_I_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_539_LANE_I_OUT||path.join(ROOT,"artifacts/issue-539-lane-i-adversarial");
fs.mkdirSync(OUT,{recursive:true});

function sh(args){
  const result=cp.spawnSync("git",args,{cwd:ROOT,encoding:"utf8"});
  if(result.status!==0)throw new Error(`git ${args.join(" ")} failed: ${result.stderr||result.stdout}`);
  return String(result.stdout||"").trim();
}
function read(rel){return fs.readFileSync(path.join(ROOT,rel),"utf8");}
function exists(rel){return fs.existsSync(path.join(ROOT,rel));}
function filesBetween(a,b){return sh(["diff","--name-only",`${a}..${b}`]).split(/\r?\n/).filter(Boolean);}

function staticProof(){
  sh(["cat-file","-e",`${TARGET_SHA}^{commit}`]);
  const candidate=filesBetween(BASE_SHA,TARGET_SHA).sort();
  assert.deepStrictEqual(candidate,[
    ".github/workflows/issue-539-activity-contamination-impl.yml",
    "runtime/alpha-phase2-konoha-player-surfaces-43110.js",
    "tools/qa_issue_539_activity_contamination_browser_impl.js",
    "tools/qa_issue_539_activity_contamination_impl.js"
  ].sort(),"PR #634 candidate scope drifted");

  const laneIDelta=filesBetween(TARGET_SHA,"HEAD");
  const allowed=new Set([
    ".github/workflows/qa-539-lane-i-adversarial.yml",
    "tools/qa_issue_539_lane_i_adversarial.js",
    "tools/qa_issue_539_lane_i_adversarial_v2.js"
  ]);
  assert(laneIDelta.length>0&&laneIDelta.every(file=>allowed.has(file)),`Lane I touched non-QA path: ${laneIDelta.join(", ")}`);

  const runtime=read("runtime/alpha-phase2-konoha-player-surfaces-43110.js");
  assert(!runtime.includes("UI/exams.png")&&!runtime.includes("UI/practical.png"),"canonical 43110 owner still names stale raster");
  assert(runtime.includes("function ensureStyles()"),"canonical 43110 presentation owner missing");
  assert(runtime.includes("background-image:radial-gradient("),"canonical 43110 owner lacks code-owned replacement");
  assert(runtime.includes('historicalRasterObservation="OBSERVED_BUT_WRONG"'),"contamination observation marker missing");

  const ownerDiff=sh(["diff",BASE_SHA,TARGET_SHA,"--","runtime/alpha-phase2-konoha-player-surfaces-43110.js"]);
  assert(ownerDiff.includes('UI/practical.png')&&ownerDiff.includes('UI/exams.png'),"source diff does not prove stale bindings were removed at 43110 owner");
  assert(exists("UI/exams.png")&&exists("UI/practical.png"),"historical raster evidence was deleted");
  assert.strictEqual(sh(["diff","--name-only",BASE_SHA,TARGET_SHA,"--","runtime/alpha-browser-polish-32700.js"]),"","My Clan owner changed in #539 candidate");

  const myClan=read("runtime/alpha-browser-polish-32700.js");
  assert(myClan.includes("background-image:none!important"),"My Clan code-owned negative control missing");
  assert(myClan.includes("myClanLiteralMasterNotRequired")&&myClan.includes("myClanCodeFirst"),"My Clan negative diagnostics missing");

  return{candidateFiles:candidate,laneIQaFiles:laneIDelta,historicalAssetsPreserved:true,canonicalOwnerCorrection:true,myClanNoTouch:true};
}

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_CHRONICLE_STATE_MANIFEST_43600&&
    globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110&&
    typeof globalThis.openKonohaPracticalFromVillage==="function"&&
    typeof globalThis.openKonohaExamFromVillage==="function"&&
    typeof globalThis.getKonohaSelectableCharacters==="function"&&
    typeof globalThis.getPhase2KonohaActivityTeam43110==="function"&&
    typeof globalThis.runPhase2KonohaPlayerSurfaces43110Diagnostics==="function"
  ),null,{timeout:30000});
}
async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{globalThis.releaseAlphaFrontDoor33300?.();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function setupTeam(page,label){
  return page.evaluate(label=>{
    localStorage.clear();sessionStorage.clear();
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma",label+"_origin");
    const completed=completeChronicleOriginPrologue("academy_menma",[label+"_complete"]);
    const wanted=["academy_hinata","academy_kakashi"];
    const snapshot=getAcademyTeamFormationSnapshot();
    if(!wanted.every(id=>snapshot.eligibleCandidateVariantIds.includes(id)))return{error:"candidates_missing",eligible:snapshot.eligibleCandidateVariantIds};
    const one=selectAcademyTeamFormationTeammate(1,wanted[0]);
    const two=selectAcademyTeamFormationTeammate(2,wanted[1]);
    const formed=confirmAcademyTeamFormation(label+"_team",wanted);
    const continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({sandboxPopupSeen:true,trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true},{save:true});
    savePlayerData();
    return{selected,completed,one,two,formed,continued,team:getChronicleCurrentTeam43600()};
  },label);
}
function historical(url){
  return /(?:^|\/)ui\/(?:exams|practical)\.png(?:$|[?#])/i.test(String(url||"").replace(/\\/g,"/"));
}

async function inspect(page,service,expectedTeam,requests){
  requests.length=0;
  await page.evaluate(()=>performance.clearResourceTimings());
  await page.evaluate(service=>service==="exams"?openKonohaExamFromVillage():openKonohaPracticalFromVillage(),service);
  const selector=`#konoha-activity-screen[data-service-id="${service}"]`;
  await page.waitForSelector(selector,{state:"visible",timeout:10000});
  await page.waitForTimeout(250);
  const aria=await page.locator(selector).ariaSnapshot();

  const e=await page.evaluate(service=>{
    const root=document.querySelector(`#konoha-activity-screen[data-service-id="${service}"]`);
    const visible=node=>{
      if(!node||!node.getClientRects?.().length)return false;
      const cs=getComputedStyle(node),r=node.getBoundingClientRect();
      return cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0&&r.width>1&&r.height>1;
    };
    const all=[root,...root.querySelectorAll("*")];
    const historical=/UI\/(?:exams|practical)\.png/i;
    const dormantRules=[];
    const activeHistoricalRules=[];
    const walkRules=rules=>{
      for(const rule of rules||[]){
        if(rule.cssRules){walkRules(rule.cssRules);continue;}
        const css=String(rule.cssText||"");
        if(!historical.test(css))continue;
        const row={selector:rule.selectorText||null,css};
        dormantRules.push(row);
        if(!rule.selectorText)continue;
        let matched=[];
        try{matched=all.filter(node=>visible(node)&&node.matches?.(rule.selectorText)).map(node=>({tag:node.tagName,id:node.id||null,className:String(node.className||"").slice(0,120)}));}catch(_error){}
        if(matched.length)activeHistoricalRules.push({...row,matched});
      }
    };
    for(const sheet of document.styleSheets){try{walkRules(sheet.cssRules);}catch(_error){}}

    const liveHistorical=[];
    for(const node of all){
      if(!visible(node))continue;
      const cs=getComputedStyle(node);
      for(const value of [cs.backgroundImage,node.getAttribute?.("src"),node.currentSrc]){
        if(historical.test(String(value||"")))liveHistorical.push({tag:node.tagName,id:node.id||null,value:String(value)});
      }
    }
    const metadata=all.flatMap(node=>["aria-label","aria-labelledby","alt","title","src","style","data-character-id","data-variant-id"].map(name=>({name,value:node.getAttribute?.(name)})).filter(row=>row.value));
    const ui=service==="exams"?getKonohaExamUIScreenData():getKonohaPracticalUIScreenData();
    const primary=root.querySelector(".alpha-activity-primary");
    const notifications=root.querySelector(".alpha-activity-notifications");
    const result=root.querySelector(".alpha-activity-result-stage");
    return{
      text:root.innerText,
      html:root.outerHTML,
      rootBackground:getComputedStyle(root).backgroundImage,
      dataset:{...root.dataset},
      resources:performance.getEntriesByType("resource").map(row=>row.name),
      liveHistorical,
      dormantRules,
      activeHistoricalRules,
      metadata,
      selectable:getKonohaSelectableCharacters().map(row=>row.id),
      helper:getPhase2KonohaActivityTeam43110().map(row=>row.id),
      uiTeam:ui.characters.map(row=>row.id),
      selectedCharacterId:ui.selectedCharacterId,
      primary:{present:!!primary,visible:visible(primary),text:(primary?.innerText||"").trim()},
      notifications:{present:!!notifications,visible:visible(notifications)},
      result:{present:!!result,visible:visible(result),text:(result?.innerText||"").trim(),ariaLive:result?.getAttribute("aria-live")},
      disciplines:[...root.querySelectorAll(".alpha-activity-discipline[data-discipline-id]")].map(node=>node.dataset.disciplineId).filter(Boolean),
      diagnostics:runPhase2KonohaPlayerSurfaces43110Diagnostics(),
      myClanDiagnostics:typeof runAlphaBrowserPolish32700Diagnostics==="function"?runAlphaBrowserPolish32700Diagnostics():null
    };
  },service);

  const fixture=/kage[_\s-]*naruto|jonin[_\s-]*sasuke|jōnin[_\s-]*sasuke/i;
  const resourceHits=e.resources.filter(historical);
  const requestHits=requests.filter(historical);
  const metadataLeaks=e.metadata.filter(row=>fixture.test(row.value));

  assert.deepStrictEqual(e.selectable,expectedTeam,`${service}: selectable roster != committed Current Team`);
  assert.deepStrictEqual(e.helper,expectedTeam,`${service}: 43110 helper != committed Current Team`);
  assert.deepStrictEqual(e.uiTeam,expectedTeam,`${service}: UI roster != committed Current Team`);
  assert(expectedTeam.includes(e.selectedCharacterId),`${service}: selected character outside Current Team`);
  assert.strictEqual(resourceHits.length,0,`${service}: historical raster resource requested`);
  assert.strictEqual(requestHits.length,0,`${service}: historical raster network request observed`);
  assert.strictEqual(e.liveHistorical.length,0,`${service}: historical raster has visible live consumer`);
  assert.strictEqual(e.activeHistoricalRules.length,0,`${service}: historical raster CSS rule actively matches visible activity DOM: ${JSON.stringify(e.activeHistoricalRules)}`);
  assert(!/url\s*\(/i.test(e.rootBackground),`${service}: root computed background is URL ${e.rootBackground}`);
  assert(!fixture.test(e.text)&&!fixture.test(e.html)&&!fixture.test(aria),`${service}: historical fixture identity leaked into presentation/DOM/accessibility tree`);
  assert.strictEqual(metadataLeaks.length,0,`${service}: historical fixture identity leaked through element metadata`);
  assert.strictEqual(e.dataset.currentTeamProjection,"canonical",`${service}: canonical team projection marker missing`);
  assert.strictEqual(e.dataset.historicalRasterObservation,"OBSERVED_BUT_WRONG",`${service}: contamination classification marker missing`);
  assert(e.primary.present&&e.primary.visible&&e.primary.text,`${service}: primary/Begin action lost`);
  assert(e.notifications.present,`${service}: notification region lost`);
  assert(e.result.present&&e.result.visible&&/RESULT STAGE|TRAINING RESULT|ASSESSMENT RESULT/i.test(e.result.text),`${service}: Result Stage lost`);
  assert.strictEqual(e.result.ariaLive,"polite",`${service}: Result Stage accessibility contract changed`);
  assert(e.disciplines.length>0&&new Set(e.disciplines).size===e.disciplines.length,`${service}: discipline presentation missing/collapsed`);
  assert.strictEqual(e.diagnostics?.pass,true,`${service}: 43110 diagnostics failed`);
  assert.strictEqual(e.diagnostics?.historicalFixtureObservationClassification,"OBSERVED_BUT_WRONG",`${service}: diagnostic classification changed`);
  assert.strictEqual(e.myClanDiagnostics?.checks?.myClanCodeFirst,true,`${service}: My Clan code-first negative control failed`);
  assert.strictEqual(e.myClanDiagnostics?.checks?.myClanLiteralMasterNotRequired,true,`${service}: My Clan literal-master negative control failed`);

  return{
    service,
    team:e.uiTeam,
    selectedCharacterId:e.selectedCharacterId,
    rootBackground:e.rootBackground,
    historicalRasterRequests:[...new Set([...resourceHits,...requestHits])],
    historicalRasterLiveConsumers:e.liveHistorical,
    dormantHistoricalRuleCount:e.dormantRules.length,
    dormantHistoricalRules:e.dormantRules,
    activeHistoricalRules:e.activeHistoricalRules,
    fixtureMetadataLeaks:metadataLeaks,
    disciplines:e.disciplines,
    primary:e.primary,
    notifications:e.notifications,
    result:e.result,
    diagnosticsPass:e.diagnostics.pass
  };
}

async function viewportRun(browser,viewport,index){
  const context=await browser.newContext({viewport,deviceScaleFactor:1});
  const page=await context.newPage();
  const requests=[];
  page.on("request",req=>requests.push(req.url()));
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_error){}});
    await page.goto(BASE_URL,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await releaseFrontDoor(page);
    const setup=await setupTeam(page,`lane_i_v2_${viewport.width}x${viewport.height}`);
    assert(!setup.error,JSON.stringify(setup));
    for(const key of ["selected","completed","one","two","formed","continued"])assert.strictEqual(setup[key]?.success,true,`${key} setup failed`);
    const team=["academy_menma","academy_hinata","academy_kakashi"];
    assert.deepStrictEqual(setup.team.teamVariantIds,team,"committed Current Team setup drifted");
    const practical=await inspect(page,"practical",team,requests);
    await page.locator('#konoha-activity-screen[data-service-id="practical"]').screenshot({path:path.join(OUT,`${index}-practical-${viewport.width}x${viewport.height}.png`)});
    const exams=await inspect(page,"exams",team,requests);
    await page.locator('#konoha-activity-screen[data-service-id="exams"]').screenshot({path:path.join(OUT,`${index}-exams-${viewport.width}x${viewport.height}.png`)});
    const runtime=await gate.assertClean(`issue-539-lane-i-v2-${viewport.width}x${viewport.height}`);
    assert.strictEqual(runtime.unexpectedCount,0,"browser runtime errors detected");
    return{viewport,team,practical,exams,browserRuntimeErrors:runtime.unexpectedCount};
  }finally{await context.close();}
}

(async()=>{
  const source=staticProof();
  const browser=await chromium.launch({headless:true});
  const viewports=[];
  try{
    for(const [i,v] of [{width:1366,height:768},{width:1920,height:1080}].entries())viewports.push(await viewportRun(browser,v,i+1));
  }finally{await browser.close();}
  const report={pass:true,issue:539,role:"lane_i_independent_adversarial_qa",targetPr:634,exactTargetSha:TARGET_SHA,laneIQaHead:sh(["rev-parse","HEAD"]),source,viewports,conclusions:{historicalRastersRemainEvidence:true,historicalRasterRequested:false,historicalRasterLiveConsumption:false,activeHistoricalRasterCss:false,fixtureIdentityLeak:false,canonicalCurrentTeamPreserved:true,selectedCharacterPreserved:true,disciplinePresentationPreserved:true,beginControlsPreserved:true,notificationsPreserved:true,resultStagePreserved:true,myClanNegativeControlPreserved:true,antiPatchLawSatisfied:true,productionEditedByLaneI:false,browserGoldenClaimed:false}};
  fs.writeFileSync(path.join(OUT,"report.json"),JSON.stringify(report,null,2)+"\n");
  console.log(JSON.stringify(report,null,2));
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
