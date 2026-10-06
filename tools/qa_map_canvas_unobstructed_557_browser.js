#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.ISSUE557_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE557_OUT||"artifacts/issue-557-unobstructed-map-canvas";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_PHASE2_LIVE_HUD_49900&&
    globalThis.SC_MAP_CANVAS_UNOBSTRUCTED_55700&&
    typeof globalThis.runUnobstructedMapCanvas55700Diagnostics==="function"
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
async function seed(page){
  const setup=await page.evaluate(()=>{
    localStorage.clear();
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma","qa557_origin");
    const runIdentity=commitChronicleRunIdentity43600({
      runId:"sc_run_v1_qa557_00000000-0000-4000-8000-000000000557",
      creationKind:"NEW_START"
    });
    const completed=completeChronicleOriginPrologue("academy_menma",["qa557_complete"]);
    const formation=getAcademyTeamFormationSnapshot();
    const desired=["academy_kakashi","academy_mirai"];
    if(!desired.every(id=>formation.eligibleCandidateVariantIds.includes(id))){
      return{error:"expected_candidates_missing",eligible:formation.eligibleCandidateVariantIds};
    }
    selectAcademyTeamFormationTeammate(1,desired[0]);
    selectAcademyTeamFormationTeammate(2,desired[1]);
    const formed=confirmAcademyTeamFormation("qa557_team",desired);
    const continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({
      sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore",
      trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,
      arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true
    },{save:true});
    playerData.ryo=557;
    savePlayerData();
    return{selected,runIdentity,completed,formed,continued,team:getChronicleCurrentTeam43600()};
  });
  assert(!setup.error,JSON.stringify(setup));
  for(const key of ["selected","runIdentity","completed","formed","continued"]){
    assert.strictEqual(setup[key].success,true,`${key} failed: ${JSON.stringify(setup[key])}`);
  }
  assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_kakashi","academy_mirai"]);
}
async function openVillage(page){
  await page.evaluate(()=>openOverlay("village"));
  await page.waitForFunction(()=>{
    const root=document.getElementById("sc-phase2-live-hud-49900");
    const map=document.querySelector(".village-map-screen");
    return !!(root&&root.dataset.surface==="village"&&root.dataset.map557==="true"&&map&&map.getBoundingClientRect().width>0);
  },null,{timeout:15000});
  await page.evaluate(()=>refreshUnobstructedMapCanvas55700());
  await page.waitForTimeout(180);
}
async function openRegion(page){
  await page.evaluate(()=>openRegionHub("fire"));
  await page.waitForFunction(()=>{
    const root=document.getElementById("sc-phase2-live-hud-49900");
    const map=document.querySelector(".region-map-pane");
    return !!(root&&root.dataset.surface==="region"&&root.dataset.map557==="true"&&map&&map.getBoundingClientRect().width>0);
  },null,{timeout:15000});
  await page.evaluate(()=>refreshUnobstructedMapCanvas55700());
  await page.waitForTimeout(180);
}
function assertNoIntersection(row,label){
  if(!row)return;
  assert.strictEqual(row.intersection,0,`${label} overlaps map by ${row.intersection}px²: ${JSON.stringify(row)}`);
}
async function semanticFingerprint(page){
  return page.evaluate(()=>JSON.stringify({
    activityHistory:Array.isArray(playerData.activityHistory)?playerData.activityHistory:null,
    worldEventRuntime:playerData.worldEventRuntime||null,
    currentTeam:getChronicleCurrentTeam43600(),
    ryo:playerData.ryo,
    acquisition:playerData.acquisition||null
  }));
}
async function geometry(page,surface){
  return page.evaluate(surface=>{
    const root=document.getElementById("sc-phase2-live-hud-49900");
    const map=document.querySelector(surface==="region"?".region-map-pane":".village-map-screen");
    const mr=map.getBoundingClientRect();
    const asRect=node=>{
      if(!node)return null;
      const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
      if(!(r.width>0&&r.height>0)||cs.display==="none"||cs.visibility==="hidden"||Number(cs.opacity||1)<=0)return null;
      const area=Math.max(0,Math.min(r.right,mr.right)-Math.max(r.left,mr.left))*Math.max(0,Math.min(r.bottom,mr.bottom)-Math.max(r.top,mr.top));
      return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height,intersection:area};
    };
    const hud={
      state:asRect(root.querySelector(".sc-hud499-state-cluster")),
      team:asRect(root.querySelector(".sc-hud499-team")),
      tools:asRect(root.querySelector(".sc-hud499-tools")),
      context:asRect(root.querySelector('.sc-hud499-context[data-active="true"]')),
      compass:asRect(root.querySelector(".sc-hud499-map-nav"))
    };
    const regionControls=surface==="region"?{
      close:asRect(map.querySelector(".region-world-close")),
      infoToggle:asRect(map.querySelector(".region-info-toggle")),
      infoDrawer:asRect(map.querySelector(".region-info-drawer.open")),
      knownDestinations:asRect(map.querySelector(".region-known-destinations")),
      eventDrawer:asRect(map.querySelector(".region-event-drawer")),
      worldMap:asRect(map.querySelector(".region-world-map-button"))
    }:{};
    const villageControls=surface==="village"?{
      returnToRegion:asRect(map.querySelector(".village-map-return")),
      infoToggle:asRect(map.querySelector(".village-info-toggle")),
      infoDrawer:asRect(map.querySelector(".village-info-drawer.open"))
    }:{};
    const echo=document.getElementById("sc-hud499-stage-echo");
    return{
      viewport:[innerWidth,innerHeight],surface,
      map:{left:mr.left,right:mr.right,top:mr.top,bottom:mr.bottom,width:mr.width,height:mr.height},
      hud,regionControls,villageControls,
      rootMap557:root.dataset.map557||null,
      mapEcho:echo?{pointerEvents:getComputedStyle(echo).pointerEvents,hotspots:echo.querySelectorAll("button,[data-hotspot-id],[data-village-hotspot-id]").length}:null,
      legacyRegionHoverVisible:surface==="region"&&[...map.querySelectorAll(".hotspot-hover-card")].some(node=>{
        const r=node.getBoundingClientRect(),cs=getComputedStyle(node);return r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0;
      })
    };
  },surface);
}
async function assertAllHotspotsReachable(page,surface,label){
  const rows=await page.evaluate(surface=>{
    const selector=surface==="region"?".region-hotspot[data-hotspot-id]":"[data-village-hotspot-id]";
    return [...document.querySelectorAll(selector)].map(node=>{
      const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
      const visible=r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0;
      if(!visible)return{id:node.dataset.hotspotId||node.dataset.villageHotspotId||null,visible:false,reachable:true};
      const points=[
        [r.left+r.width/2,r.top+r.height/2],
        [r.left+Math.min(8,r.width/3),r.top+Math.min(8,r.height/3)],
        [r.right-Math.min(8,r.width/3),r.bottom-Math.min(8,r.height/3)]
      ];
      const reachable=points.some(([x,y])=>{
        const hit=document.elementFromPoint(x,y);
        return !!(hit&&(hit===node||node.contains(hit)||(hit.closest&&hit.closest(selector)===node)));
      });
      return{id:node.dataset.hotspotId||node.dataset.villageHotspotId||null,visible:true,reachable,rect:{left:r.left,top:r.top,width:r.width,height:r.height}};
    });
  },surface);
  const visible=rows.filter(row=>row.visible);
  assert(visible.length>0,`${label}: no visible map hotspots`);
  const blocked=visible.filter(row=>!row.reachable);
  assert.deepStrictEqual(blocked,[],`${label}: visible hotspot(s) blocked by presentation: ${JSON.stringify(blocked)}`);
}
async function contextVisibility(page){
  return page.evaluate(()=>{
    const panel=document.querySelector('#sc-phase2-live-hud-49900 .sc-hud499-context');
    if(!panel)return null;
    const cs=getComputedStyle(panel);return{opacity:Number(cs.opacity),visibility:cs.visibility};
  });
}
async function activateContext(page,surface){
  const selector=surface==="region"?".region-hotspot[data-hotspot-id]":"[data-village-hotspot-id]";
  const node=page.locator(selector).first();
  assert(await node.count(),`${surface}: no hotspot for context proof`);
  await node.focus();
  await page.waitForTimeout(220);
  return page.evaluate(()=>{
    const panel=document.querySelector('#sc-phase2-live-hud-49900 .sc-hud499-context[data-active="true"]');
    return panel?String(panel.innerText||"").trim():null;
  });
}
async function openSelectedRegionLocationCard(page,label){
  const before=await semanticFingerprint(page);
  const selected=await page.evaluate(()=>{
    const nodes=[...document.querySelectorAll(".region-hotspot[data-hotspot-id][data-region-key]")];
    const row=nodes.map(node=>({node,projection:getHotspotProjection(node.dataset.regionKey,node.dataset.hotspotId)}))
      .find(item=>item.projection&&item.projection.knownLabel&&item.projection.knownLabel!=="???"&&Array.isArray(item.projection.opportunities)&&item.projection.opportunities.length>0);
    if(!row)return null;
    const result=selectMapNode(row.node.dataset.regionKey,row.node.dataset.hotspotId);
    return result?{hotspotId:result.hotspotId||row.node.dataset.hotspotId,label:result.knownLabel||row.projection.knownLabel}:null;
  });
  assert(selected,`${label}: no known Region location available for selected-card proof`);
  await page.waitForSelector(".region-map-pane .region-event-drawer",{state:"visible",timeout:5000});
  await page.evaluate(()=>refreshUnobstructedMapCanvas55700());
  await page.waitForTimeout(180);
  const g=await geometry(page,"region");
  assert(g.regionControls.eventDrawer,`${label}: selected Region location/info card did not render`);
  assertNoIntersection(g.regionControls.eventDrawer,`${label} selected Region location/info card`);
  const visibility=await contextVisibility(page);
  assert(visibility&&visibility.opacity===0&&visibility.visibility==="hidden",`${label}: selected location card collided with #499 context panel`);
  await assertAllHotspotsReachable(page,"region",`${label} with selected location card`);
  await page.evaluate(()=>closeRegionEventDrawer());
  await page.waitForTimeout(180);
  assert.strictEqual(await semanticFingerprint(page),before,`${label}: selected location presentation mutated Chronicle state`);
}
async function openRegionEventDisambiguation(page,label){
  const before=await semanticFingerprint(page);
  const activated=await page.evaluate(()=>{
    const nodes=[...document.querySelectorAll(".region-hotspot[data-hotspot-id][data-region-key]")];
    const sourceRow=nodes.map(node=>({
      node,
      projection:getHotspotProjection(node.dataset.regionKey,node.dataset.hotspotId)
    })).find(row=>row.projection&&Array.isArray(row.projection.opportunities)&&row.projection.opportunities.length>0);
    if(!sourceRow)return null;

    const regionKey=sourceRow.node.dataset.regionKey;
    const hotspotId=sourceRow.node.dataset.hotspotId;
    const original=getHotspotProjection;
    const clone=value=>JSON.parse(JSON.stringify(value));
    const fixture=clone(sourceRow.projection);
    const first=clone(fixture.opportunities[0]);
    const second=clone(first);
    second.opportunity_id=String(first.opportunity_id||"qa557_opportunity")+"__qa557_disambiguation";
    second.known_label=String(first.known_label||"KNOWN OPPORTUNITY")+" — SECOND KNOWN POSSIBILITY";
    fixture.opportunities=[first,second];
    fixture.opportunityIds=[first.opportunity_id,second.opportunity_id];
    fixture.aggregationCount=2;

    globalThis.__qa557OriginalGetHotspotProjection=original;
    const replacement=(r,h)=>String(r)===String(regionKey)&&String(h)===String(hotspotId)?fixture:original(r,h);
    globalThis.getHotspotProjection=replacement;
    try{getHotspotProjection=replacement;}catch(_error){}

    const result=activateAlphaRegionHotspot(null,regionKey,hotspotId);
    return{regionKey,hotspotId,result,fixtureOpportunityIds:fixture.opportunityIds};
  });
  assert(activated&&activated.result,`${label}: could not activate Region event-disambiguation fixture`);
  assert.strictEqual(activated.result.success,true,`${label}: Region event activation failed: ${JSON.stringify(activated)}`);
  assert.strictEqual(activated.result.type,"event_drawer",`${label}: activation did not route to event drawer: ${JSON.stringify(activated)}`);
  assert.strictEqual(activated.result.reason,"multiple_opportunities",`${label}: exact multiple-opportunity disambiguation branch not reached: ${JSON.stringify(activated)}`);

  await page.waitForSelector(".region-map-pane .region-event-drawer",{state:"visible",timeout:5000});
  await page.waitForFunction(()=>{
    const drawer=document.querySelector(".region-map-pane .region-event-drawer");
    return !!(drawer&&String(drawer.innerText||"").includes("OPPORTUNITIES AT THIS HOTSPOT"));
  },null,{timeout:5000});
  await page.evaluate(()=>refreshUnobstructedMapCanvas55700());
  await page.waitForTimeout(180);

  const eventProof=await page.evaluate(()=>{
    const drawer=document.querySelector(".region-map-pane .region-event-drawer");
    return drawer?{
      text:String(drawer.innerText||""),
      opportunityButtons:[...drawer.querySelectorAll("button")].filter(button=>!String(button.getAttribute("aria-label")||"").toLowerCase().includes("close")).length
    }:null;
  });
  assert(eventProof&&eventProof.text.includes("OPPORTUNITIES AT THIS HOTSPOT"),`${label}: event drawer lacks disambiguation presentation`);
  assert(eventProof.opportunityButtons>=2,`${label}: event drawer did not expose multiple possibilities`);

  const g=await geometry(page,"region");
  assert(g.regionControls.eventDrawer,`${label}: Region event-disambiguation drawer missing from geometry`);
  assertNoIntersection(g.regionControls.eventDrawer,`${label} Region event-disambiguation drawer`);
  await assertAllHotspotsReachable(page,"region",`${label} with Region event-disambiguation drawer`);
  const visibility=await contextVisibility(page);
  assert(visibility&&visibility.opacity===0&&visibility.visibility==="hidden",`${label}: event drawer collided with #499 context panel`);

  const shot=label.startsWith("1366")?"05-region-event-disambiguation-1366x768.png":"06-region-event-disambiguation-1920x1080.png";
  await page.screenshot({path:path.join(OUT,shot),fullPage:true});

  await page.evaluate(()=>{
    const original=globalThis.__qa557OriginalGetHotspotProjection;
    if(original){
      globalThis.getHotspotProjection=original;
      try{getHotspotProjection=original;}catch(_error){}
      delete globalThis.__qa557OriginalGetHotspotProjection;
    }
    closeRegionEventDrawer();
  });
  await page.waitForTimeout(180);
  assert.strictEqual(await semanticFingerprint(page),before,`${label}: event-disambiguation presentation mutated Chronicle/World state`);
}
async function assertVillageLegacyChrome(page,label){
  let g=await geometry(page,"village");
  for(const [key,row] of Object.entries(g.villageControls))assertNoIntersection(row,`${label} Village ${key}`);
  const toggle=page.locator(".village-info-toggle");
  if(await toggle.count()){
    await toggle.click();
    await page.waitForTimeout(180);
    await page.evaluate(()=>refreshUnobstructedMapCanvas55700());
    await page.waitForTimeout(120);
    g=await geometry(page,"village");
    assert(g.villageControls.infoDrawer,`${label}: Village info drawer did not open`);
    assertNoIntersection(g.villageControls.infoDrawer,`${label} Village open info drawer`);
    const visibility=await contextVisibility(page);
    assert(visibility&&visibility.opacity===0&&visibility.visibility==="hidden",`${label}: Village info drawer collided with #499 context panel`);
    await assertAllHotspotsReachable(page,"village",`${label} with Village info drawer`);
    await toggle.click();
    await page.waitForTimeout(120);
  }
}
async function assertSurface(page,surface,label){
  const before=await semanticFingerprint(page);
  await assertAllHotspotsReachable(page,surface,label);
  const contextText=await activateContext(page,surface);
  assert(contextText&&contextText.length>0,`${label}: observer-safe #499 context failed to activate`);
  await page.evaluate(()=>refreshUnobstructedMapCanvas55700());
  await page.waitForTimeout(120);
  let g=await geometry(page,surface);
  assert.strictEqual(g.rootMap557,"true",`${label}: #557 layout flag missing`);
  assert(g.map.width>=g.viewport[0]*0.60,`${label}: map lost dominance: ${JSON.stringify(g.map)}`);
  for(const [key,row] of Object.entries(g.hud))assertNoIntersection(row,`${label} HUD ${key}`);
  assert(g.mapEcho&&g.mapEcho.pointerEvents==="none"&&g.mapEcho.hotspots===0,`${label}: map echo became interactive: ${JSON.stringify(g.mapEcho)}`);

  if(surface==="village"){
    await assertVillageLegacyChrome(page,label);
  }
  if(surface==="region"){
    assert.strictEqual(g.legacyRegionHoverVisible,false,`${label}: retired Region hover card still covers map`);
    for(const [key,row] of Object.entries(g.regionControls))assertNoIntersection(row,`${label} Region ${key}`);
    const toggle=page.locator(".region-info-toggle");
    if(await toggle.count()){
      await toggle.click();
      await page.waitForTimeout(180);
      await page.evaluate(()=>refreshUnobstructedMapCanvas55700());
      await page.waitForTimeout(120);
      g=await geometry(page,surface);
      assert(g.regionControls.infoDrawer,`${label}: Region info drawer did not open`);
      assertNoIntersection(g.regionControls.infoDrawer,`${label} Region open info drawer`);
      const visibility=await contextVisibility(page);
      assert(visibility&&visibility.opacity===0&&visibility.visibility==="hidden",`${label}: Region info drawer collided with #499 context panel`);
      await assertAllHotspotsReachable(page,"region",`${label} with Region info drawer`);
      await toggle.click();
      await page.waitForTimeout(120);
    }
    await openSelectedRegionLocationCard(page,label);
    await openRegionEventDisambiguation(page,label);
  }
  const after=await semanticFingerprint(page);
  assert.strictEqual(after,before,`${label}: layout/context interaction mutated Chronicle state`);
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1366,height:768},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);await seed(page);

    await openVillage(page);
    const diagVillage=await page.evaluate(()=>runUnobstructedMapCanvas55700Diagnostics());
    assert.strictEqual(diagVillage.pass,true,`Village #557 diagnostics failed: ${JSON.stringify(diagVillage)}`);
    await assertSurface(page,"village","1366x768 Village");
    await page.screenshot({path:path.join(OUT,"01-village-1366x768.png"),fullPage:true});

    await openRegion(page);
    const diagRegion=await page.evaluate(()=>runUnobstructedMapCanvas55700Diagnostics());
    assert.strictEqual(diagRegion.pass,true,`Region #557 diagnostics failed: ${JSON.stringify(diagRegion)}`);
    await assertSurface(page,"region","1366x768 Region");
    await page.screenshot({path:path.join(OUT,"02-region-1366x768.png"),fullPage:true});

    await page.setViewportSize({width:1920,height:1080});
    await openVillage(page);await assertSurface(page,"village","1920x1080 Village");
    await page.screenshot({path:path.join(OUT,"03-village-1920x1080.png"),fullPage:true});
    await openRegion(page);await assertSurface(page,"region","1920x1080 Region");
    await page.screenshot({path:path.join(OUT,"04-region-1920x1080.png"),fullPage:true});

    await page.evaluate(()=>openOverlay("inventory"));
    await page.waitForSelector(".sc-inventory-core",{state:"visible",timeout:10000});
    assert.strictEqual(await page.evaluate(()=>getPhase2LiveHudSnapshot49900().visible),false,"deep-surface HUD suppression regressed");

    const finalDiag=await page.evaluate(()=>({hud:runPhase2LiveHud49900Diagnostics(),map:runUnobstructedMapCanvas55700Diagnostics()}));
    assert.strictEqual(finalDiag.hud.pass,true,`#499 regression diagnostics failed: ${JSON.stringify(finalDiag.hud)}`);
    assert.strictEqual(finalDiag.map.checks.browserGoldenClaimed,false,"#557 may not self-claim browser GOLDEN");

    await gate.assertNoUnexpectedErrors();
    console.log(JSON.stringify({
      pass:true,
      issue:557,
      viewports:["1366x768","1920x1080"],
      surfaces:["village","region"],
      selectedLocationInfoOutboard:true,
      eventDisambiguationOutboard:true,
      exactEventDisambiguationRoute:"multiple_opportunities",
      regionKnownDestinationsMeasured:true,
      villageLegacyChromeMeasured:true,
      persistentOverlapPixels:0,
      hotspotReachability:"GREEN",
      semanticMutation:false,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
