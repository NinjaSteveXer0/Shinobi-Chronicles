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
function listDiff(base,head){return sh(["diff","--name-only",`${base}..${head}`]).split(/\r?\n/).filter(Boolean);}

function staticAdversarialProof(){
  sh(["cat-file","-e",`${TARGET_SHA}^{commit}`]);
  sh(["cat-file","-e",`${BASE_SHA}^{commit}`]);

  const candidateFiles=listDiff(BASE_SHA,TARGET_SHA).sort();
  const expectedCandidateFiles=[
    ".github/workflows/issue-539-activity-contamination-impl.yml",
    "runtime/alpha-phase2-konoha-player-surfaces-43110.js",
    "tools/qa_issue_539_activity_contamination_browser_impl.js",
    "tools/qa_issue_539_activity_contamination_impl.js"
  ].sort();
  assert.deepStrictEqual(candidateFiles,expectedCandidateFiles,"candidate scope drifted from frozen four-file #539 assignment");

  const qaDelta=listDiff(TARGET_SHA,"HEAD");
  const allowedQa=new Set([
    ".github/workflows/qa-539-lane-i-adversarial.yml",
    "tools/qa_issue_539_lane_i_adversarial.js"
  ]);
  assert(qaDelta.length>=1,"QA branch has no durable QA delta");
  assert(qaDelta.every(file=>allowedQa.has(file)),`Lane I QA branch touched non-QA path(s): ${qaDelta.join(", ")}`);

  const runtime=read("runtime/alpha-phase2-konoha-player-surfaces-43110.js");
  assert(!runtime.includes("UI/exams.png"),"43110 still names UI/exams.png");
  assert(!runtime.includes("UI/practical.png"),"43110 still names UI/practical.png");
  assert(runtime.includes("function ensureStyles()"),"existing 43110 presentation owner missing");
  assert(runtime.includes('background-image:radial-gradient('),"43110 did not replace stale raster at its existing owner");
  assert(runtime.includes('historicalRasterObservation="OBSERVED_BUT_WRONG"'),"explicit contamination observation marker missing");
  assert(runtime.includes('historicalFixtureObservationClassification:"OBSERVED_BUT_WRONG"'),"diagnostic contamination classification missing");

  const ownerDiff=sh(["diff",BASE_SHA,TARGET_SHA,"--","runtime/alpha-phase2-konoha-player-surfaces-43110.js"]);
  assert(ownerDiff.includes('-    \'#konoha-activity-screen[data-service-id="practical"]{background-image:'),"source diff does not prove removal at canonical 43110 owner");
  assert(ownerDiff.includes('-    \'#konoha-activity-screen[data-service-id="exams"]{background-image:'),"source diff does not prove Exams stale binding removal at canonical 43110 owner");
  assert(!candidateFiles.some(file=>/override|wrapper/i.test(file)),"candidate introduced suspicious late override/wrapper file");

  assert(exists("UI/exams.png")&&exists("UI/practical.png"),"historical Exams/Practical evidence assets were deleted");

  const myClanChanged=sh(["diff","--name-only",BASE_SHA,TARGET_SHA,"--","runtime/alpha-browser-polish-32700.js"]);
  assert.strictEqual(myClanChanged,"","My Clan negative-control owner changed in #539 candidate");
  const myClan=read("runtime/alpha-browser-polish-32700.js");
  assert(myClan.includes("background-image:none!important"),"My Clan code-owned no-raster protection is missing");
  assert(myClan.includes("myClanLiteralMasterNotRequired"),"My Clan negative-consumption diagnostic is missing");
  assert(myClan.includes("myClanCodeFirst"),"My Clan code-first diagnostic is missing");
  const myClanStyleMatch=myClan.match(/style\.textContent=`([\s\S]*?)`;\s*document\.head\.appendChild\(style\)/);
  assert(myClanStyleMatch,"My Clan live presentation style block could not be isolated");
  const myClanPresentation=myClanStyleMatch[1];
  assert(!/UI\/my_clan_(?:browse|inspection)\.png/i.test(myClanPresentation),"My Clan live presentation CSS consumes a historical raster");

  return{candidateFiles,qaDelta,antiPatchLaw:true,historicalAssetsPreserved:true,myClanNegativeControl:true};
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

async function establishCommittedTeam(page,label){
  return page.evaluate(label=>{
    localStorage.clear();sessionStorage.clear();
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma",`${label}_origin`);
    const completed=completeChronicleOriginPrologue("academy_menma",[`${label}_complete`]);
    const wanted=["academy_hinata","academy_kakashi"];
    const snapshot=getAcademyTeamFormationSnapshot();
    if(!wanted.every(id=>snapshot.eligibleCandidateVariantIds.includes(id))){
      return{error:"expected_candidates_missing",eligible:snapshot.eligibleCandidateVariantIds};
    }
    const slot1=selectAcademyTeamFormationTeammate(1,wanted[0]);
    const slot2=selectAcademyTeamFormationTeammate(2,wanted[1]);
    const formed=confirmAcademyTeamFormation(`${label}_team`,wanted);
    const continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({sandboxPopupSeen:true,trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true},{save:true});
    savePlayerData();
    return{selected,completed,slot1,slot2,formed,continued,team:getChronicleCurrentTeam43600()};
  },label);
}

function isHistoricalAssetUrl(url){
  const value=String(url||"").replace(/\\/g,"/").toLowerCase();
  return /(?:^|\/)ui\/(?:exams|practical)\.png(?:$|[?#])/.test(value);
}

async function inspectService(page,service,expectedTeam,networkRequests){
  networkRequests.length=0;
  await page.evaluate(()=>performance.clearResourceTimings());
  await page.evaluate(service=>service==="exams"?globalThis.openKonohaExamFromVillage():globalThis.openKonohaPracticalFromVillage(),service);
  const selector=`#konoha-activity-screen[data-service-id="${service}"]`;
  await page.waitForSelector(selector,{state:"visible",timeout:10000});
  await page.waitForTimeout(250);

  const ariaSnapshot=await page.locator(selector).ariaSnapshot();
  const evidence=await page.evaluate(service=>{
    const root=document.querySelector(`#konoha-activity-screen[data-service-id="${service}"]`);
    const visible=node=>{
      if(!node||!node.getClientRects||!node.getClientRects().length)return false;
      const cs=getComputedStyle(node),r=node.getBoundingClientRect();
      return cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0&&r.width>1&&r.height>1;
    };
    const all=[...root.querySelectorAll("*")];
    const metadata=all.flatMap(node=>["aria-label","aria-labelledby","alt","title","src","style","data-character-id","data-variant-id"]
      .map(name=>({tag:node.tagName,name,value:node.getAttribute?.(name)})).filter(row=>row.value));
    const liveImages=all.filter(visible).flatMap(node=>{
      const cs=getComputedStyle(node);
      return [node.getAttribute?.("src"),node.currentSrc,cs.backgroundImage].filter(Boolean).map(value=>String(value));
    });
    const styles=[...document.styleSheets].flatMap(sheet=>{
      try{return [...sheet.cssRules].map(rule=>rule.cssText);}catch(_error){return[];}
    });
    const resources=performance.getEntriesByType("resource").map(entry=>entry.name);
    const selectable=getKonohaSelectableCharacters().map(row=>row.id);
    const helper=getPhase2KonohaActivityTeam43110().map(row=>row.id);
    const ui=service==="exams"?getKonohaExamUIScreenData():getKonohaPracticalUIScreenData();
    const primary=root.querySelector(".alpha-activity-primary");
    const notices=root.querySelector(".alpha-activity-notifications");
    const result=root.querySelector(".alpha-activity-result-stage");
    const disciplineIds=[...root.querySelectorAll(".alpha-activity-discipline[data-discipline-id]")].map(node=>node.dataset.disciplineId).filter(Boolean);
    return{
      html:root.outerHTML,
      text:root.innerText,
      metadata,
      liveImages,
      styles,
      resources,
      backgroundImage:getComputedStyle(root).backgroundImage,
      dataset:{...root.dataset},
      selectable,helper,
      uiCharacters:ui.characters.map(row=>row.id),
      selectedCharacterId:ui.selectedCharacterId,
      primary:{present:!!primary,visible:visible(primary),text:(primary?.innerText||"").trim(),disabled:!!primary?.disabled},
      notifications:{present:!!notices,visible:visible(notices)},
      result:{present:!!result,visible:visible(result),ariaLive:result?.getAttribute("aria-live"),text:(result?.innerText||"").trim()},
      disciplineIds,
      diagnostics:runPhase2KonohaPlayerSurfaces43110Diagnostics(),
      myClanDiagnostics:typeof runAlphaBrowserPolish32700Diagnostics==="function"?runAlphaBrowserPolish32700Diagnostics():null
    };
  },service);

  const forbidden=/kage[_\s-]*naruto|jonin[_\s-]*sasuke|jōnin[_\s-]*sasuke/i;
  const resourceAssetHits=evidence.resources.filter(isHistoricalAssetUrl);
  const networkAssetHits=networkRequests.filter(isHistoricalAssetUrl);
  const liveAssetHits=evidence.liveImages.filter(isHistoricalAssetUrl);
  const styleAssetHits=evidence.styles.filter(css=>/UI\/(?:exams|practical)\.png/i.test(css));
  const metadataLeaks=evidence.metadata.filter(row=>forbidden.test(row.value));

  assert.deepStrictEqual(evidence.selectable,expectedTeam,`${service}: selectable roster diverged from committed Current Team`);
  assert.deepStrictEqual(evidence.helper,expectedTeam,`${service}: 43110 helper diverged from committed Current Team`);
  assert.deepStrictEqual(evidence.uiCharacters,expectedTeam,`${service}: UI projection diverged from committed Current Team`);
  assert(expectedTeam.includes(evidence.selectedCharacterId),`${service}: selected character is outside committed Current Team`);
  assert.strictEqual(resourceAssetHits.length,0,`${service}: performance resources requested historical raster(s): ${resourceAssetHits.join(", ")}`);
  assert.strictEqual(networkAssetHits.length,0,`${service}: network requested historical raster(s): ${networkAssetHits.join(", ")}`);
  assert.strictEqual(liveAssetHits.length,0,`${service}: visible DOM consumed historical raster(s): ${liveAssetHits.join(", ")}`);
  assert.strictEqual(styleAssetHits.length,0,`${service}: stylesheet still contains historical Exams/Practical raster literal`);
  assert(!/url\s*\(/i.test(evidence.backgroundImage),`${service}: root background still resolves to URL: ${evidence.backgroundImage}`);
  assert(!forbidden.test(evidence.text),`${service}: fixture identity leaked through visible text`);
  assert(!forbidden.test(evidence.html),`${service}: fixture identity leaked through DOM markup/data`);
  assert(!forbidden.test(ariaSnapshot),`${service}: fixture identity leaked through accessibility tree`);
  assert.strictEqual(metadataLeaks.length,0,`${service}: fixture identity leaked through accessibility/element metadata`);
  assert.strictEqual(evidence.dataset.currentTeamProjection,"canonical",`${service}: canonical Current Team marker missing`);
  assert.strictEqual(evidence.dataset.historicalRasterObservation,"OBSERVED_BUT_WRONG",`${service}: contamination observation classification missing`);
  assert(evidence.primary.present&&evidence.primary.visible,`${service}: primary/Begin action is missing or hidden`);
  assert(evidence.primary.text.length>0,`${service}: primary/Begin action lost its label`);
  assert(evidence.notifications.present,`${service}: notifications region missing`);
  assert(evidence.result.present&&evidence.result.visible,`${service}: Result Stage missing or hidden`);
  assert.strictEqual(evidence.result.ariaLive,"polite",`${service}: Result Stage accessibility/live-region contract changed`);
  assert(/RESULT STAGE|TRAINING RESULT|ASSESSMENT RESULT/i.test(evidence.result.text),`${service}: Result Stage content no longer identifies result surface`);
  assert(evidence.disciplineIds.length>0,`${service}: discipline presentation disappeared`);
  assert.strictEqual(new Set(evidence.disciplineIds).size,evidence.disciplineIds.length,`${service}: discipline IDs collapsed/duplicated`);
  assert(evidence.diagnostics?.pass===true,`${service}: 43110 diagnostics failed: ${JSON.stringify(evidence.diagnostics)}`);
  assert.strictEqual(evidence.diagnostics?.historicalFixtureObservationClassification,"OBSERVED_BUT_WRONG",`${service}: diagnostic contamination classification changed`);
  assert(evidence.myClanDiagnostics?.checks?.myClanCodeFirst===true,`${service}: My Clan code-first negative control failed`);
  assert(evidence.myClanDiagnostics?.checks?.myClanLiteralMasterNotRequired===true,`${service}: My Clan literal-master negative control failed`);

  return{
    service,
    backgroundImage:evidence.backgroundImage,
    selectedCharacterId:evidence.selectedCharacterId,
    currentTeam:evidence.uiCharacters,
    disciplineIds:evidence.disciplineIds,
    primary:evidence.primary,
    notifications:evidence.notifications,
    result:evidence.result,
    historicalRasterRequests:[...new Set([...resourceAssetHits,...networkAssetHits])],
    historicalRasterLiveConsumers:liveAssetHits,
    fixtureMetadataLeaks:metadataLeaks,
    ariaSnapshotContainsFixture:forbidden.test(ariaSnapshot),
    observationClassification:evidence.dataset.historicalRasterObservation,
    diagnosticsPass:evidence.diagnostics.pass,
    myClanNegativeControl:true
  };
}

async function runViewport(browser,viewport,index){
  const context=await browser.newContext({viewport,deviceScaleFactor:1});
  const page=await context.newPage();
  const requests=[];
  page.on("request",request=>requests.push(request.url()));
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_error){}});
    await page.goto(BASE_URL,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await releaseFrontDoor(page);
    const setup=await establishCommittedTeam(page,`lane_i_${viewport.width}x${viewport.height}`);
    assert(!setup.error,JSON.stringify(setup));
    for(const key of ["selected","completed","slot1","slot2","formed","continued"]){
      assert.strictEqual(setup[key]?.success,true,`${key} setup failed: ${JSON.stringify(setup[key])}`);
    }
    const expectedTeam=["academy_menma","academy_hinata","academy_kakashi"];
    assert.deepStrictEqual(setup.team.teamVariantIds,expectedTeam,"legitimate committed Current Team setup drifted");

    const practical=await inspectService(page,"practical",expectedTeam,requests);
    await page.locator('#konoha-activity-screen[data-service-id="practical"]').screenshot({path:path.join(OUT,`${index}-practical-${viewport.width}x${viewport.height}.png`)});
    const exams=await inspectService(page,"exams",expectedTeam,requests);
    await page.locator('#konoha-activity-screen[data-service-id="exams"]').screenshot({path:path.join(OUT,`${index}-exams-${viewport.width}x${viewport.height}.png`)});

    const gateEvidence=await gate.assertClean(`issue-539-lane-i-${viewport.width}x${viewport.height}`);
    assert.strictEqual(gateEvidence.unexpectedCount,0,`browser runtime errors detected at ${viewport.width}x${viewport.height}`);
    return{viewport,team:expectedTeam,practical,exams,browserRuntimeErrors:gateEvidence.unexpectedCount};
  }finally{
    await context.close();
  }
}

(async()=>{
  const staticProof=staticAdversarialProof();
  const browser=await chromium.launch({headless:true});
  const viewports=[];
  try{
    for(const [index,viewport] of [{width:1366,height:768},{width:1920,height:1080}].entries()){
      viewports.push(await runViewport(browser,viewport,index+1));
    }
  }finally{
    await browser.close();
  }
  const report={
    pass:true,
    issue:539,
    role:"lane_i_independent_adversarial_qa",
    targetPr:634,
    exactTargetSha:TARGET_SHA,
    baseSha:BASE_SHA,
    staticProof,
    viewports,
    conclusions:{
      exactCandidateBehaviorGreen:true,
      historicalRastersRemainEvidence:true,
      historicalRasterRequested:false,
      historicalRasterLiveConsumption:false,
      fixtureIdentityLeak:false,
      canonicalCurrentTeamPreserved:true,
      selectedCharacterPreserved:true,
      disciplinePresentationPreserved:true,
      beginControlsPreserved:true,
      notificationsPreserved:true,
      resultStagePreserved:true,
      myClanNegativeControlPreserved:true,
      antiPatchLawSatisfied:true,
      sharedSeamsEditedByLaneI:false,
      browserGoldenClaimed:false
    }
  };
  fs.writeFileSync(path.join(OUT,"report.json"),JSON.stringify(report,null,2)+"\n");
  console.log(JSON.stringify(report,null,2));
})().catch(error=>{
  console.error(error&&error.stack||error);
  process.exit(1);
});
