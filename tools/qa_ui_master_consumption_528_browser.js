#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_528_UI_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_528_UI_OUT||"artifacts/issue-528-ui-master-consumption";
fs.mkdirSync(OUT,{recursive:true});

async function release(page){
  await page.evaluate(()=>{
    try{releaseAlphaFrontDoor33300?.();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_ALPHA_PLAYABILITY_SPRINT_33100_ID&&
    globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110&&
    typeof globalThis.openKonohaPracticalFromVillage==="function"&&
    typeof globalThis.openKonohaExamFromVillage==="function"&&
    typeof globalThis.runAlphaPlayableSprint33100Diagnostics==="function"&&
    globalThis.__battleTerminalResultPresentation54400Installed===true&&
    typeof globalThis.presentCommittedBattleTerminalResult54400==="function"&&
    typeof globalThis.getBattleTerminalResultPresentation54400==="function"
  ),null,{timeout:30000});
}

async function setupKonohaTeam(page){
  return page.evaluate(()=>{
    localStorage.clear();
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma","issue528_ui_origin");
    const completed=completeChronicleOriginPrologue("academy_menma",["issue528_ui_complete"]);
    const desired=["academy_hinata","academy_kakashi"];
    const one=selectAcademyTeamFormationTeammate(1,desired[0]);
    const two=selectAcademyTeamFormationTeammate(2,desired[1]);
    const formed=confirmAcademyTeamFormation("issue528_ui_team",desired);
    const continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({
      sandboxPopupSeen:true,
      practicalTipSeen:true,
      examsTipSeen:true,
      trainingTipSeen:true,
      arenaTipSeen:true,
      arenaCompletionChoiceSeen:true,
      shinobiRecordTipSeen:true
    },{save:true});
    savePlayerData();
    return{selected,completed,one,two,formed,continued,team:getChronicleCurrentTeam43600()};
  });
}

async function assetProbe(page,assetPath){
  const probe=await page.evaluate(async assetPath=>{
    const canonical=String(assetPath).replace(/\\/g,"/");
    const file=canonical.split("/").pop();
    const visible=node=>{
      if(!node||!node.getClientRects||node.getClientRects().length===0)return false;
      const style=getComputedStyle(node);
      const rect=node.getBoundingClientRect();
      return style.display!=="none"&&style.visibility!=="hidden"&&Number(style.opacity||1)>0&&rect.width>1&&rect.height>1;
    };
    const matchesValue=value=>String(value||"").replace(/\\/g,"/").includes(canonical)||String(value||"").includes(file);
    const hits=[];
    for(const node of document.querySelectorAll("body *")){
      if(!visible(node))continue;
      const style=getComputedStyle(node);
      if(matchesValue(style.backgroundImage)||matchesValue(node.getAttribute&&node.getAttribute("src"))||matchesValue(node.currentSrc)){
        const rect=node.getBoundingClientRect();
        hits.push({tag:node.tagName,id:node.id||null,className:String(node.className||"").slice(0,180),width:rect.width,height:rect.height,opacity:style.opacity,backgroundImage:style.backgroundImage});
      }
      for(const pseudo of ["::before","::after"]){
        const ps=getComputedStyle(node,pseudo);
        if(matchesValue(ps.backgroundImage)){
          const rect=node.getBoundingClientRect();
          hits.push({tag:node.tagName+pseudo,id:node.id||null,className:String(node.className||"").slice(0,180),width:rect.width,height:rect.height,opacity:ps.opacity,backgroundImage:ps.backgroundImage});
        }
      }
    }
    const image=await new Promise(resolve=>{
      const img=new Image();let settled=false;
      const done=ok=>{if(settled)return;settled=true;resolve({ok,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,src:img.src});};
      img.onload=()=>done(true);img.onerror=()=>done(false);img.src=canonical;
      if(img.complete)setTimeout(()=>done(img.naturalWidth>0),0);
      setTimeout(()=>done(false),5000);
    });
    const resourceSeen=performance.getEntriesByType("resource").some(entry=>matchesValue(entry.name));
    return{assetPath:canonical,visible:hits.length>0,hits:hits.slice(0,8),image,resourceSeen};
  },assetPath);
  assert.strictEqual(probe.image.ok,true,assetPath+" did not load: "+JSON.stringify(probe));
  assert(probe.image.naturalWidth>0&&probe.image.naturalHeight>0,assetPath+" has no rendered dimensions");
  assert.strictEqual(probe.visible,true,assetPath+" is loaded but not visibly consumed: "+JSON.stringify(probe));
  return probe;
}

async function openMyClanAndProbe(page){
  await page.evaluate(()=>openOverlay("clan"));
  await page.waitForSelector(".my-clan-stage",{state:"visible",timeout:10000});
  await page.waitForFunction(()=>typeof CLAN_UI_STATE!=="undefined"&&CLAN_UI_STATE.viewMode==="browse",null,{timeout:8000});
  const browse=await page.evaluate(()=>{
    const stage=document.querySelector(".my-clan-stage");
    const diagnostic=typeof runAlphaBrowserPolish32700Diagnostics==="function"?runAlphaBrowserPolish32700Diagnostics():null;
    return{backgroundImage:getComputedStyle(stage).backgroundImage,diagnostic};
  });
  assert(!/my_clan_browse\.png|my_clan_inspection\.png/i.test(browse.backgroundImage),"My Clan browse still consumes literal reference master: "+JSON.stringify(browse));
  assert.strictEqual(browse.diagnostic?.checks?.myClanCodeFirst,true,JSON.stringify(browse.diagnostic));
  assert.strictEqual(browse.diagnostic?.checks?.myClanLiteralMasterNotRequired,true,JSON.stringify(browse.diagnostic));
  await page.locator("#overlay-content-container").screenshot({path:path.join(OUT,"01-my-clan-code-first-browse.png")});

  const selected=await page.evaluate(()=>{
    const team=getChronicleCurrentTeam43600?.();
    const id=team?.teamVariantIds?.[0]||"academy_menma";
    return selectMyClanCharacterForInspection(id);
  });
  assert.strictEqual(selected?.success,true,JSON.stringify(selected));
  await page.waitForFunction(()=>CLAN_UI_STATE.viewMode==="inspection",null,{timeout:8000});
  await page.waitForSelector(".my-clan-inspection-panel",{state:"visible",timeout:8000});
  const inspection=await page.evaluate(()=>{
    const stage=document.querySelector(".my-clan-stage");
    const panel=document.querySelector(".my-clan-inspection-panel");
    const rect=panel.getBoundingClientRect();
    return{backgroundImage:getComputedStyle(stage).backgroundImage,width:rect.width,height:rect.height,text:(panel.innerText||"").trim()};
  });
  assert(!/my_clan_browse\.png|my_clan_inspection\.png/i.test(inspection.backgroundImage),"My Clan inspection still consumes literal reference master: "+JSON.stringify(inspection));
  assert(inspection.width>=320&&inspection.height>=360,"Selected Shinobi inspector is not large enough for readable inspection: "+JSON.stringify(inspection));
  assert(inspection.text.length>20,"Selected Shinobi inspector rendered no meaningful text");
  await page.locator("#overlay-content-container").screenshot({path:path.join(OUT,"02-my-clan-code-first-inspection.png")});
  return{browse,inspection};
}

async function openActivitiesAndProbe(page){
  await page.evaluate(()=>openKonohaPracticalFromVillage());
  await page.waitForSelector("#konoha-activity-screen[data-service-id='practical']",{state:"visible",timeout:10000});
  const practical=await assetProbe(page,"UI/practical.png");
  await page.locator("#konoha-activity-screen").screenshot({path:path.join(OUT,"03-practical.png")});

  await page.evaluate(()=>openKonohaExamFromVillage());
  await page.waitForSelector("#konoha-activity-screen[data-service-id='exams']",{state:"visible",timeout:10000});
  const exams=await assetProbe(page,"UI/exams.png");
  await page.locator("#konoha-activity-screen").screenshot({path:path.join(OUT,"04-exams.png")});
  return{practical,exams};
}

async function openSetbackAndProbe(page){
  const setup=await page.evaluate(()=>{
    const actor=typeof getPlayerCharacter==="function"?getPlayerCharacter("academy_menma"):null;
    globalThis.currentBattle={
      active:false,battleOver:true,
      activePlayer:actor||{id:"academy_menma",name:"Menma"},
      enemy:{id:"issue528_setback_probe",name:"QA Opposition"},
      outcome:{type:"defeat",resultClass:"deployment_exhausted"},
      rewards:{generated:true,claimed:false,ryo:0,items:[]},
      returnContext:null
    };
    try{currentBattle=globalThis.currentBattle;}catch(_error){}
    return openOverlay("setback");
  });
  assert(setup&&setup.success===true,JSON.stringify(setup));
  const selector='[data-terminal-result-owner="54400"].alpha544-setback';
  await page.waitForSelector(selector,{state:"visible",timeout:10000});
  const semantic=await page.evaluate(selector=>({
    text:document.querySelector(selector)?.innerText||"",
    outcome:JSON.parse(JSON.stringify(globalThis.currentBattle?.outcome||null)),
    terminal:getBattleTerminalResultPresentation54400()
  }),selector);
  assert.strictEqual(semantic.outcome?.type,"defeat");
  assert.strictEqual(semantic.terminal?.committedOutcome,"defeat",JSON.stringify(semantic.terminal));
  assert.strictEqual(semantic.terminal?.status,"presented",JSON.stringify(semantic.terminal));
  assert.strictEqual(semantic.terminal?.presentationOnly,true,JSON.stringify(semantic.terminal));
  assert.strictEqual(semantic.terminal?.semanticWrite,false,JSON.stringify(semantic.terminal));
  assert.strictEqual(semantic.terminal?.terminalSurfaceVisible,true,JSON.stringify(semantic.terminal));
  const setback=await assetProbe(page,"UI/setback.png");
  await page.locator(selector).screenshot({path:path.join(OUT,"05-setback.png")});
  return{setback,semantic};
}

async function openVictoryAndProbe(page){
  const setup=await page.evaluate(()=>{
    const actor=typeof getPlayerCharacter==="function"?getPlayerCharacter("academy_menma"):null;
    const enemy={id:"issue528_victory_probe",name:"QA Opposition",rank:"Academy"};
    globalThis.currentBattle={
      active:false,battleOver:true,
      activePlayer:actor||{id:"academy_menma",name:"Menma"},
      enemy,
      outcome:{type:"victory",completedAt:Date.now(),finishingShinobiId:"academy_menma"},
      rewards:{generated:true,claimed:false,ryo:50,exp:0,items:[]},
      returnContext:null
    };
    try{currentBattle=globalThis.currentBattle;}catch(_error){}
    try{selectedEnemy=enemy;}catch(_error){}
    return openOverlay("victory");
  });
  assert(setup!==false,"Victory overlay refused bounded QA fixture");
  await page.waitForSelector(".alpha-victory-code-screen,.victory-screen",{state:"visible",timeout:10000});
  const victory=await assetProbe(page,"UI/victory.png");
  await page.locator(".alpha-victory-code-screen,.victory-screen").first().screenshot({path:path.join(OUT,"06-victory.png")});
  return{victory};
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_error){}});
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await release(page);
    const setup=await setupKonohaTeam(page);
    for(const key of ["selected","completed","one","two","formed","continued"])assert.strictEqual(setup[key]?.success,true,key+" setup failed: "+JSON.stringify(setup[key]));
    assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);

    const clan=await openMyClanAndProbe(page);
    const activities=await openActivitiesAndProbe(page);
    const setback=await openSetbackAndProbe(page);
    const victory=await openVictoryAndProbe(page);

    const referenceGuard=await page.evaluate(()=>({
      literalConvo:[...document.querySelectorAll('img[src*="UI/convo.png"],img[src*="UI%2Fconvo.png"]')].filter(node=>node.getClientRects().length>0).length,
      loadoutVisible:[...document.querySelectorAll('img[src*="UI/loadout.png"],img[src*="UI%2Floadout.png"]')].filter(node=>node.getClientRects().length>0).length
    }));
    assert.strictEqual(referenceGuard.literalConvo,0,"REFERENCE UI/convo.png became a literal current renderer");
    assert.strictEqual(referenceGuard.loadoutVisible,0,"QUEUED UI/loadout.png was silently promoted to live presentation");

    const gateEvidence=await gate.assertClean("issue-528-ui-master-consumption");
    assert.strictEqual(gateEvidence.unexpectedCount,0);

    console.log(JSON.stringify({
      pass:true,
      issue:528,
      activeProductionMasters:{
        practical:activities.practical.visible,
        exams:activities.exams.visible,
        victory:victory.victory.visible,
        setback:setback.setback.visible
      },
      referenceCompositionMasters:{
        myClanBrowseLiteral:false,
        myClanInspectionLiteral:false,
        myClanCodeFirst:true,
        inspectorReadable:clan.inspection.width>=320&&clan.inspection.height>=360
      },
      referenceCompositionConvoNotLiteral:true,
      queuedLoadoutNotSilentlyPromoted:true,
      victorySetbackSemanticsRemainCodeOwned:true,
      browserRuntimeErrorGateBeforeTeardown:true,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});