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

async function settle(page,ms=360){
  await page.evaluate(()=>{try{refreshUnobstructedMapCanvas55700();}catch(_error){}});
  await page.waitForTimeout(ms);
}

async function openVillage(page){
  await page.evaluate(()=>openOverlay("village"));
  await page.waitForFunction(()=>{
    const root=document.getElementById("sc-phase2-live-hud-49900");
    const map=document.querySelector(".village-map-screen");
    return !!(root&&root.dataset.surface==="village"&&root.dataset.map557==="true"&&map&&map.getBoundingClientRect().width>0);
  },null,{timeout:15000});
  await settle(page);
}

async function openRegion(page){
  await page.evaluate(()=>openRegionHub("fire"));
  await page.waitForFunction(()=>{
    const root=document.getElementById("sc-phase2-live-hud-49900");
    const map=document.querySelector(".region-map-pane");
    return !!(root&&root.dataset.surface==="region"&&root.dataset.map557==="true"&&map&&map.getBoundingClientRect().width>0);
  },null,{timeout:15000});
  await settle(page);
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

function assertNoIntersection(row,label){
  if(!row)return;
  assert.strictEqual(row.intersection,0,`${label} overlaps map by ${row.intersection}px²: ${JSON.stringify(row)}`);
}

async function geometry(page,surface){
  return page.evaluate(surface=>{
    const root=document.getElementById("sc-phase2-live-hud-49900");
    const map=document.querySelector(surface==="region"?".region-map-pane":".village-map-screen");
    if(!root||!map)return null;
    const mr=map.getBoundingClientRect();
    const asRect=node=>{
      if(!node)return null;
      const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
      if(!(r.width>0&&r.height>0)||cs.display==="none"||cs.visibility==="hidden"||Number(cs.opacity||1)<=0)return null;
      const area=Math.max(0,Math.min(r.right,mr.right)-Math.max(r.left,mr.left))*Math.max(0,Math.min(r.bottom,mr.bottom)-Math.max(r.top,mr.top));
      return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height,intersection:area};
    };
    return{
      viewport:[innerWidth,innerHeight],surface,
      map:{left:mr.left,right:mr.right,top:mr.top,bottom:mr.bottom,width:mr.width,height:mr.height},
      rootMap557:root.dataset.map557||null,
      hud:{
        state:asRect(root.querySelector(".sc-hud499-state-cluster")),
        team:asRect(root.querySelector(".sc-hud499-team")),
        tools:asRect(root.querySelector(".sc-hud499-tools")),
        context:asRect(root.querySelector('.sc-hud499-context[data-active="true"]')),
        compass:asRect(root.querySelector(".sc-hud499-map-nav"))
      },
      regionControls:surface==="region"?{
        close:asRect(map.querySelector(".region-world-close")),
        infoToggle:asRect(map.querySelector(".region-info-toggle")),
        infoDrawer:asRect(map.querySelector(".region-info-drawer.open")),
        knownDestinations:asRect(map.querySelector(".region-known-destinations")),
        eventDrawer:asRect(map.querySelector(".region-event-drawer")),
        worldMap:asRect(map.querySelector(".region-world-map-button"))
      }:{},
      villageControls:surface==="village"?{
        returnToRegion:asRect(map.querySelector(".village-map-return")),
        infoToggle:asRect(map.querySelector(".village-info-toggle")),
        infoDrawer:asRect(map.querySelector(".village-info-drawer.open"))
      }:{},
      mapEcho:(()=>{
        const echo=document.getElementById("sc-hud499-stage-echo");
        return echo?{pointerEvents:getComputedStyle(echo).pointerEvents,hotspots:echo.querySelectorAll("button,[data-hotspot-id],[data-village-hotspot-id]").length}:null;
      })(),
      legacyRegionHoverVisible:surface==="region"&&[...map.querySelectorAll(".hotspot-hover-card")].some(node=>{
        const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
        return r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0;
      })
    };
  },surface);
}

async function reachableHotspots(page,surface){
  return page.evaluate(surface=>{
    const selector=surface==="region"?".region-hotspot[data-hotspot-id][data-region-key]":"[data-village-hotspot-id]";
    return [...document.querySelectorAll(selector)].map((node,index)=>{
      const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
      const visible=r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0;
      const points=visible?[
        [r.left+r.width/2,r.top+r.height/2],
        [r.left+Math.min(8,r.width/3),r.top+Math.min(8,r.height/3)],
        [r.right-Math.min(8,r.width/3),r.bottom-Math.min(8,r.height/3)]
      ]:[];
      const reachable=points.some(([x,y])=>{
        const hit=document.elementFromPoint(x,y);
        return !!(hit&&(hit===node||node.contains(hit)||(hit.closest&&hit.closest(selector)===node)));
      });
      return{index,id:node.dataset.hotspotId||node.dataset.villageHotspotId||null,visible,reachable,bound:node.dataset.hud499ContextBound==="true"};
    });
  },surface);
}

async function assertAllHotspotsReachable(page,surface,label){
  const rows=await reachableHotspots(page,surface);
  const visible=rows.filter(row=>row.visible);
  assert(visible.length>0,`${label}: no visible map hotspots`);
  assert.deepStrictEqual(visible.filter(row=>!row.reachable),[],`${label}: visible hotspot(s) blocked by presentation: ${JSON.stringify(visible)}`);
}

async function activateContext(page,surface,label){
  const rows=await reachableHotspots(page,surface);
  const target=rows.find(row=>row.visible&&row.reachable&&row.bound)||rows.find(row=>row.visible&&row.reachable);
  assert(target,`${label}: no visible pointer-reachable hotspot for #499 context proof: ${JSON.stringify(rows)}`);
  const selector=surface==="region"?".region-hotspot[data-hotspot-id][data-region-key]":"[data-village-hotspot-id]";
  const node=page.locator(selector).nth(target.index);
  await node.dispatchEvent("mouseenter");
  await page.waitForFunction(()=>{
    const panel=document.querySelector('#sc-phase2-live-hud-49900 .sc-hud499-context[data-active="true"]');
    return !!(panel&&String(panel.innerText||"").trim().length);
  },null,{timeout:1800});
  return page.evaluate(()=>String(document.querySelector('#sc-phase2-live-hud-49900 .sc-hud499-context[data-active="true"]')?.innerText||"").trim());
}

async function contextVisibility(page){
  return page.evaluate(()=>{
    const panel=document.querySelector('#sc-phase2-live-hud-49900 .sc-hud499-context');
    if(!panel)return null;
    const cs=getComputedStyle(panel);return{opacity:Number(cs.opacity),visibility:cs.visibility};
  });
}

async function openSelectedRegionLocationCard(page,label){
  const before=await semanticFingerprint(page);
  const selected=await page.evaluate(()=>{
    const rows=[...document.querySelectorAll(".region-hotspot[data-hotspot-id][data-region-key]")].map((node,index)=>{
      const p=getHotspotProjection(node.dataset.regionKey,node.dataset.hotspotId);
      const r=node.getBoundingClientRect(),hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
      return{node,index,p,reachable:!!(hit&&(hit===node||node.contains(hit)||(hit.closest&&hit.closest(".region-hotspot[data-hotspot-id]")===node)))};
    });
    const row=rows.find(item=>item.reachable&&item.p&&item.p.knownLabel&&item.p.knownLabel!=="???"&&Array.isArray(item.p.opportunities)&&item.p.opportunities.length>0)
      ||rows.find(item=>item.p&&item.p.knownLabel&&item.p.knownLabel!=="???"&&Array.isArray(item.p.opportunities)&&item.p.opportunities.length>0);
    if(!row)return null;
    const result=selectMapNode(row.node.dataset.regionKey,row.node.dataset.hotspotId);
    return result?{hotspotId:result.hotspotId||row.node.dataset.hotspotId,label:result.knownLabel||row.p.knownLabel}:null;
  });
  assert(selected,`${label}: no known Region location available for selected-card proof`);
  await page.waitForFunction(()=>{
    const drawer=document.querySelector(".region-map-pane .region-event-drawer");
    if(!drawer)return false;
    const r=drawer.getBoundingClientRect(),cs=getComputedStyle(drawer);
    return r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden";
  },null,{timeout:2500});
  await settle(page,240);
  const g=await geometry(page,"region");
  assert(g&&g.regionControls.eventDrawer,`${label}: selected Region location/info card did not render`);
  assertNoIntersection(g.regionControls.eventDrawer,`${label} selected Region location/info card`);
  const visibility=await contextVisibility(page);
  assert(visibility&&visibility.opacity===0&&visibility.visibility==="hidden",`${label}: selected location card collided with #499 context panel`);
  await assertAllHotspotsReachable(page,"region",`${label} with selected location card`);
  await page.evaluate(()=>closeRegionEventDrawer());
  await settle(page,240);
  assert.strictEqual(await semanticFingerprint(page),before,`${label}: selected location presentation mutated Chronicle state`);
}

async function openRegionEventDisambiguation(page,label){
  const before=await semanticFingerprint(page);
  const activated=await page.evaluate(()=>{
    const rows=[...document.querySelectorAll(".region-hotspot[data-hotspot-id][data-region-key]")].map(node=>({
      node,projection:getHotspotProjection(node.dataset.regionKey,node.dataset.hotspotId)
    }));
    const sourceRow=rows.find(row=>row.projection&&row.projection.knownLabel&&row.projection.knownLabel!=="???"&&Array.isArray(row.projection.opportunities)&&row.projection.opportunities.length>0)
      ||rows.find(row=>row.projection&&Array.isArray(row.projection.opportunities)&&row.projection.opportunities.length>0);
    if(!sourceRow)return null;
    const regionKey=sourceRow.node.dataset.regionKey,hotspotId=sourceRow.node.dataset.hotspotId;
    const original=getHotspotProjection,clone=value=>JSON.parse(JSON.stringify(value));
    const fixture=clone(sourceRow.projection),first=clone(fixture.opportunities[0]),second=clone(first);
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
    return{regionKey,hotspotId,result};
  });
  assert(activated&&activated.result,`${label}: could not activate Region event-disambiguation fixture`);
  assert.strictEqual(activated.result.success,true,`${label}: Region event activation failed: ${JSON.stringify(activated)}`);
  assert.strictEqual(activated.result.type,"event_drawer",`${label}: activation did not route to selected-event drawer: ${JSON.stringify(activated)}`);
  assert.strictEqual(activated.result.reason,"multiple_opportunities",`${label}: exact multiple-opportunity branch not reached: ${JSON.stringify(activated)}`);
  await page.waitForFunction(()=>{
    const drawer=document.querySelector(".region-map-pane .region-event-drawer");
    if(!drawer||!String(drawer.innerText||"").includes("OPPORTUNITIES AT THIS HOTSPOT"))return false;
    const r=drawer.getBoundingClientRect(),cs=getComputedStyle(drawer);
    return r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden";
  },null,{timeout:2500});
  await settle(page,240);
  const proof=await page.evaluate(()=>{
    const drawer=document.querySelector(".region-map-pane .region-event-drawer");
    return drawer?{text:String(drawer.innerText||""),buttons:[...drawer.querySelectorAll("button")].filter(button=>!String(button.getAttribute("aria-label")||"").toLowerCase().includes("close")).length}:null;
  });
  assert(proof&&proof.text.includes("OPPORTUNITIES AT THIS HOTSPOT"),`${label}: selected-event disambiguation presentation missing`);
  assert(proof.buttons>=2,`${label}: selected-event disambiguation did not expose multiple known possibilities`);
  const g=await geometry(page,"region");
  assert(g&&g.regionControls.eventDrawer,`${label}: selected-event drawer missing from geometry`);
  assertNoIntersection(g.regionControls.eventDrawer,`${label} selected-event drawer`);
  await assertAllHotspotsReachable(page,"region",`${label} with selected-event drawer`);
  const visibility=await contextVisibility(page);
  assert(visibility&&visibility.opacity===0&&visibility.visibility==="hidden",`${label}: selected-event drawer collided with #499 context panel`);
  const shot=label.startsWith("1366")?"05-region-selected-event-1366x768.png":"06-region-selected-event-1920x1080.png";
  await page.screenshot({path:path.join(OUT,shot),fullPage:true});
  await page.evaluate(()=>{
    const original=globalThis.__qa557OriginalGetHotspotProjection;
    if(original){globalThis.getHotspotProjection=original;try{getHotspotProjection=original;}catch(_error){}delete globalThis.__qa557OriginalGetHotspotProjection;}
    closeRegionEventDrawer();
  });
  await settle(page,240);
  assert.strictEqual(await semanticFingerprint(page),before,`${label}: selected-event presentation mutated Chronicle/World state`);
}

async function assertVillageLegacyChrome(page,label){
  let g=await geometry(page,"village");
  for(const [key,row] of Object.entries(g.villageControls))assertNoIntersection(row,`${label} Village ${key}`);
  const toggle=page.locator(".village-info-toggle");
  if(await toggle.count()){
    await toggle.click();await settle(page,240);g=await geometry(page,"village");
    assert(g.villageControls.infoDrawer,`${label}: Village info drawer did not open`);
    assertNoIntersection(g.villageControls.infoDrawer,`${label} Village open info drawer`);
    const visibility=await contextVisibility(page);
    assert(visibility&&visibility.opacity===0&&visibility.visibility==="hidden",`${label}: Village info drawer collided with #499 context panel`);
    await assertAllHotspotsReachable(page,"village",`${label} with Village info drawer`);
    await toggle.click();await settle(page,180);
  }
}

async function assertRegionLegacyChrome(page,label){
  let g=await geometry(page,"region");
  assert.strictEqual(g.legacyRegionHoverVisible,false,`${label}: retired Region hover card still covers map`);
  for(const [key,row] of Object.entries(g.regionControls))assertNoIntersection(row,`${label} Region ${key}`);
  const toggle=page.locator(".region-info-toggle");
  if(await toggle.count()){
    await toggle.click();await settle(page,240);g=await geometry(page,"region");
    assert(g.regionControls.infoDrawer,`${label}: Region info drawer did not open`);
    assertNoIntersection(g.regionControls.infoDrawer,`${label} Region open info drawer`);
    const visibility=await contextVisibility(page);
    assert(visibility&&visibility.opacity===0&&visibility.visibility==="hidden",`${label}: Region info drawer collided with #499 context panel`);
    await assertAllHotspotsReachable(page,"region",`${label} with Region info drawer`);
    await toggle.click();await settle(page,180);
  }
  await openSelectedRegionLocationCard(page,label);
  await openRegionEventDisambiguation(page,label);
}

async function assertSurface(page,surface,label){
  const before=await semanticFingerprint(page);
  await assertAllHotspotsReachable(page,surface,label);
  const contextText=await activateContext(page,surface,label);
  assert(contextText&&contextText.length>0,`${label}: observer-safe #499 context failed to activate`);
  await settle(page,220);
  let g=await geometry(page,surface);
  assert(g,`${label}: geometry unavailable`);
  assert.strictEqual(g.rootMap557,"true",`${label}: #557 layout flag missing`);
  assert(g.map.width>=g.viewport[0]*0.60,`${label}: map lost dominance: ${JSON.stringify(g.map)}`);
  for(const [key,row] of Object.entries(g.hud))assertNoIntersection(row,`${label} HUD ${key}`);
  assert(g.mapEcho&&g.mapEcho.pointerEvents==="none"&&g.mapEcho.hotspots===0,`${label}: map echo became interactive: ${JSON.stringify(g.mapEcho)}`);
  if(surface==="village")await assertVillageLegacyChrome(page,label);
  else await assertRegionLegacyChrome(page,label);
  assert.strictEqual(await semanticFingerprint(page),before,`${label}: layout/context interaction mutated Chronicle state`);
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
    assert.strictEqual((await page.evaluate(()=>runUnobstructedMapCanvas55700Diagnostics())).pass,true,"Village #557 diagnostics failed");
    await assertSurface(page,"village","1366x768 Village");
    await page.screenshot({path:path.join(OUT,"01-village-1366x768.png"),fullPage:true});

    await openRegion(page);
    assert.strictEqual((await page.evaluate(()=>runUnobstructedMapCanvas55700Diagnostics())).pass,true,"Region #557 diagnostics failed");
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
      pass:true,issue:557,viewports:["1366x768","1920x1080"],surfaces:["village","region"],
      selectedLocationInfoOutboard:true,selectedEventOverlayOutboard:true,eventDisambiguationOutboard:true,
      exactEventDisambiguationRoute:"multiple_opportunities",regionKnownDestinationsMeasured:true,villageLegacyChromeMeasured:true,
      persistentOverlapPixels:0,hotspotReachability:"GREEN",semanticMutation:false,browserGoldenClaimed:false
    },null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
