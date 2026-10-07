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
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){
      document.getElementById(id)?.remove();
    }
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
      sandboxPopupSeen:true,
      recommendedRouteEnabled:false,
      openingChoice:"explore",
      trainingTipSeen:true,
      practicalTipSeen:true,
      examsTipSeen:true,
      arenaTipSeen:true,
      arenaCompletionChoiceSeen:true,
      shinobiRecordTipSeen:true
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

async function settle(page,ms=260){
  await page.evaluate(()=>{try{refreshUnobstructedMapCanvas55700();}catch(_error){}});
  await page.waitForTimeout(ms);
}

async function openSurface(page,surface){
  if(surface==="village")await page.evaluate(()=>openOverlay("village"));
  else await page.evaluate(()=>openRegionHub("fire"));

  await page.waitForFunction(surface=>{
    const root=document.getElementById("sc-phase2-live-hud-49900");
    const map=document.querySelector(surface==="region"?".region-map-pane":".village-map-screen");
    return !!(root&&root.dataset.surface===surface&&root.dataset.map557==="true"&&map&&map.getBoundingClientRect().width>0);
  },surface,{timeout:15000});
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
    const rect=node=>{
      if(!node)return null;
      const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
      if(!(r.width>0&&r.height>0)||cs.display==="none"||cs.visibility==="hidden"||Number(cs.opacity||1)<=0)return null;
      const intersection=Math.max(0,Math.min(r.right,mr.right)-Math.max(r.left,mr.left))*Math.max(0,Math.min(r.bottom,mr.bottom)-Math.max(r.top,mr.top));
      return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height,intersection};
    };
    const echo=document.getElementById("sc-hud499-stage-echo");
    return{
      viewport:[innerWidth,innerHeight],
      map:{left:mr.left,right:mr.right,top:mr.top,bottom:mr.bottom,width:mr.width,height:mr.height},
      rootMap557:root.dataset.map557||null,
      hud:{
        state:rect(root.querySelector(".sc-hud499-state-cluster")),
        team:rect(root.querySelector(".sc-hud499-team")),
        tools:rect(root.querySelector(".sc-hud499-tools")),
        context:rect(root.querySelector('.sc-hud499-context[data-active="true"]')),
        compass:rect(root.querySelector(".sc-hud499-map-nav"))
      },
      region:surface==="region"?{
        close:rect(map.querySelector(".region-world-close")),
        infoToggle:rect(map.querySelector(".region-info-toggle")),
        infoDrawer:rect(map.querySelector(".region-info-drawer.open")),
        knownDestinations:rect(map.querySelector(".region-known-destinations")),
        eventDrawer:rect(map.querySelector(".region-event-drawer")),
        worldMap:rect(map.querySelector(".region-world-map-button"))
      }:{},
      village:surface==="village"?{
        returnToRegion:rect(map.querySelector(".village-map-return")),
        infoToggle:rect(map.querySelector(".village-info-toggle")),
        infoDrawer:rect(map.querySelector(".village-info-drawer.open"))
      }:{},
      mapEcho:echo?{
        pointerEvents:getComputedStyle(echo).pointerEvents,
        hotspots:echo.querySelectorAll("button,[data-hotspot-id],[data-village-hotspot-id]").length
      }:null,
      legacyRegionHoverVisible:surface==="region"&&[...map.querySelectorAll(".hotspot-hover-card")].some(node=>{
        const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
        return r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0;
      })
    };
  },surface);
}

async function hotspotRows(page,surface){
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
      return{
        index,
        id:node.dataset.hotspotId||node.dataset.villageHotspotId||null,
        visible,
        reachable,
        contextBound:node.dataset.hud499ContextBound==="true"
      };
    });
  },surface);
}

async function assertHotspotsReachable(page,surface,label){
  const rows=await hotspotRows(page,surface);
  const visible=rows.filter(row=>row.visible);
  assert(visible.length>0,`${label}: no visible map hotspots`);
  assert.deepStrictEqual(visible.filter(row=>!row.reachable),[],`${label}: map presentation blocked hotspot(s): ${JSON.stringify(visible)}`);
}

async function proveObserverContext(page,surface,label){
  const selector=surface==="region"?".region-hotspot[data-hotspot-id][data-region-key]":"[data-village-hotspot-id]";
  await page.waitForFunction(selector=>[...document.querySelectorAll(selector)].some(node=>{
    if(node.dataset.hud499ContextBound!=="true")return false;
    const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
    return r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0;
  }),selector,{timeout:5000});

  const rows=await hotspotRows(page,surface);
  const target=rows.find(row=>row.visible&&row.reachable&&row.contextBound);
  assert(target,`${label}: no bound pointer-reachable hotspot for observer-context proof`);
  await page.locator(selector).nth(target.index).dispatchEvent("mouseenter");
  await page.waitForFunction(()=>{
    const panel=document.querySelector('#sc-phase2-live-hud-49900 .sc-hud499-context[data-active="true"]');
    return !!(panel&&String(panel.innerText||"").trim());
  },null,{timeout:3000});
}

async function contextVisibility(page){
  return page.evaluate(()=>{
    const panel=document.querySelector('#sc-phase2-live-hud-49900 .sc-hud499-context');
    if(!panel)return null;
    const cs=getComputedStyle(panel);
    return{opacity:Number(cs.opacity),visibility:cs.visibility};
  });
}

async function proveInfoDrawer(page,surface,label){
  const selector=surface==="region"?".region-info-toggle":".village-info-toggle";
  const toggle=page.locator(selector);
  if(!(await toggle.count()))return;
  await toggle.click();
  await settle(page);
  const g=await geometry(page,surface);
  const drawer=surface==="region"?g.region.infoDrawer:g.village.infoDrawer;
  assert(drawer,`${label}: info drawer did not open`);
  assertNoIntersection(drawer,`${label} info drawer`);
  const visibility=await contextVisibility(page);
  assert(visibility&&visibility.opacity===0&&visibility.visibility==="hidden",`${label}: info drawer collided with #499 context panel`);
  await assertHotspotsReachable(page,surface,`${label} with info drawer`);
  await toggle.click();
  await settle(page,180);
}

async function proveDeliberateRegionInteractionContract(page,label){
  const proof=await page.evaluate(()=>{
    const source=String(renderRegionHotspot);
    return{
      ordinarySingleClickDoesNotOpenDrawer:!source.includes('onclick="selectMapNode'),
      deliberateDoubleClickRoute:source.includes("ondblclick")&&typeof activateAlphaRegionHotspot==="function"
    };
  });
  assert.strictEqual(proof.ordinarySingleClickDoesNotOpenDrawer,true,`${label}: stale single-click selected-card route returned`);
  assert.strictEqual(proof.deliberateDoubleClickRoute,true,`${label}: deliberate Region activation route missing`);
}

async function proveOwnerSelectedRegionEventCard(page,label){
  const before=await semanticFingerprint(page);
  const selected=await page.evaluate(()=>{
    const regionKey="fire";
    const preferredId="hotspot_fire_konohagakure";
    const preferred=getHotspotProjection(regionKey,preferredId);
    const fallback=[...document.querySelectorAll('.region-hotspot[data-hotspot-id][data-region-key="fire"]')]
      .map(node=>getHotspotProjection(regionKey,node.dataset.hotspotId))
      .find(hotspot=>hotspot&&hotspot.knownLabel&&hotspot.knownLabel!=="???"&&Array.isArray(hotspot.opportunities)&&hotspot.opportunities.some(item=>Array.isArray(item.legal_actions)&&item.legal_actions.some(action=>action&&action.label==="ENTER LOCATION")));
    const target=preferred&&Array.isArray(preferred.opportunities)&&preferred.opportunities.length?preferred:fallback;
    if(!target)return null;
    const result=selectMapNode(regionKey,target.hotspotId);
    return result?{
      regionKey,
      hotspotId:result.hotspotId,
      locationId:result.locationId,
      knownLabel:result.knownLabel,
      opportunityIds:result.opportunityIds
    }:null;
  });

  assert(selected,`${label}: canonical Konohagakure selected-event card target unavailable`);
  await page.waitForFunction(()=>{
    const drawer=document.querySelector(".region-map-pane .region-event-drawer");
    if(!drawer)return false;
    const r=drawer.getBoundingClientRect(),cs=getComputedStyle(drawer);
    return r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden";
  },null,{timeout:5000});
  await settle(page);

  const presentation=await page.evaluate(()=>{
    const drawer=document.querySelector(".region-map-pane .region-event-drawer");
    if(!drawer)return null;
    return{
      text:String(drawer.innerText||""),
      selectedHotspotId:typeof selectedHotspotId!=="undefined"?selectedHotspotId:null,
      selectedOpportunityId:typeof selectedOpportunityId!=="undefined"?selectedOpportunityId:null
    };
  });
  assert(presentation,`${label}: owner-visible Region selected-event card did not render`);
  assert(/Konohagakure/i.test(presentation.text),`${label}: selected-event card is not the owner-visible Konohagakure card: ${JSON.stringify(presentation)}`);
  assert(/ENTER LOCATION/i.test(presentation.text),`${label}: selected-event card lost its real ENTER LOCATION action: ${JSON.stringify(presentation)}`);
  assert(/DISCOVERY/i.test(presentation.text),`${label}: selected-event card lost its observer-safe Discovery presentation: ${JSON.stringify(presentation)}`);

  const g=await geometry(page,"region");
  assert(g&&g.region.eventDrawer,`${label}: selected-event card geometry missing`);
  assertNoIntersection(g.region.eventDrawer,`${label} owner-visible selected-event card`);
  await assertHotspotsReachable(page,"region",`${label} with owner-visible selected-event card`);
  const context=await contextVisibility(page);
  assert(context&&context.opacity===0&&context.visibility==="hidden",`${label}: selected-event card collided with #499 contextual reserve`);

  const shot=label.startsWith("1366")?"05-region-selected-event-1366x768.png":"06-region-selected-event-1920x1080.png";
  await page.screenshot({path:path.join(OUT,shot),fullPage:true});

  await page.evaluate(()=>closeRegionEventDrawer());
  await settle(page,180);
  assert.strictEqual(await semanticFingerprint(page),before,`${label}: selected-event presentation mutated Chronicle/World state`);
}

async function assertSurface(page,surface,label){
  const before=await semanticFingerprint(page);
  await assertHotspotsReachable(page,surface,label);
  await proveObserverContext(page,surface,label);
  await settle(page,180);

  const g=await geometry(page,surface);
  assert(g,`${label}: geometry unavailable`);
  assert.strictEqual(g.rootMap557,"true",`${label}: #557 layout flag missing`);
  assert(g.map.width>=g.viewport[0]*0.60,`${label}: map lost dominance: ${JSON.stringify(g.map)}`);
  for(const [key,row] of Object.entries(g.hud))assertNoIntersection(row,`${label} HUD ${key}`);
  assert(g.mapEcho&&g.mapEcho.pointerEvents==="none"&&g.mapEcho.hotspots===0,`${label}: map echo became interactive: ${JSON.stringify(g.mapEcho)}`);

  if(surface==="village"){
    for(const [key,row] of Object.entries(g.village))assertNoIntersection(row,`${label} Village ${key}`);
    await proveInfoDrawer(page,"village",label);
  }else{
    assert.strictEqual(g.legacyRegionHoverVisible,false,`${label}: retired Region hover card still covers map`);
    for(const [key,row] of Object.entries(g.region))assertNoIntersection(row,`${label} Region ${key}`);
    await proveInfoDrawer(page,"region",label);
    await proveDeliberateRegionInteractionContract(page,label);
    await proveOwnerSelectedRegionEventCard(page,label);
  }

  assert.strictEqual(await semanticFingerprint(page),before,`${label}: map presentation interaction mutated canonical state`);
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1366,height:768},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await release(page);
    await seed(page);

    await openSurface(page,"village");
    assert.strictEqual((await page.evaluate(()=>runUnobstructedMapCanvas55700Diagnostics())).pass,true,"1366 Village #557 diagnostics failed");
    await assertSurface(page,"village","1366x768 Village");
    await page.screenshot({path:path.join(OUT,"01-village-1366x768.png"),fullPage:true});

    await openSurface(page,"region");
    assert.strictEqual((await page.evaluate(()=>runUnobstructedMapCanvas55700Diagnostics())).pass,true,"1366 Region #557 diagnostics failed");
    await assertSurface(page,"region","1366x768 Region");
    await page.screenshot({path:path.join(OUT,"02-region-1366x768.png"),fullPage:true});

    await page.setViewportSize({width:1920,height:1080});
    await openSurface(page,"village");
    await assertSurface(page,"village","1920x1080 Village");
    await page.screenshot({path:path.join(OUT,"03-village-1920x1080.png"),fullPage:true});

    await openSurface(page,"region");
    await assertSurface(page,"region","1920x1080 Region");
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
      ordinarySingleClickDrawer:false,
      deliberateRegionActivation:true,
      ownerSelectedEventOverlayOutboard:true,
      selectedEventProof:"konohagakure_discovery_enter_location",
      persistentOverlapPixels:0,
      hotspotReachability:"GREEN",
      semanticMutation:false,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
