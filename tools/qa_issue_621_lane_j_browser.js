#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE621_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE621_J_OUT||"artifacts/issue-621-lane-j-independent";
const TARGET=process.env.ISSUE621_TARGET_SHA||null;
const TOLERANCE=.30;
fs.mkdirSync(OUT,{recursive:true});

const sleep=(page,ms)=>page.waitForTimeout(ms);
function drift(a,b){return Math.abs(Number(a||0)-Number(b||0));}

async function boot(page){
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!(
    globalThis.SC_PHASE2_LIVE_HUD_49900&&
    globalThis.SC_MAP_CANVAS_UNOBSTRUCTED_55700&&
    typeof globalThis.getUnobstructedMapCanvas55700SchedulerSnapshot==="function"&&
    typeof globalThis.runUnobstructedMapCanvas55700Diagnostics==="function"
  ),null,{timeout:45000});
  await page.evaluate(()=>{
    try{releaseAlphaFrontDoor33300?.();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}

async function seed(page){
  const result=await page.evaluate(()=>{
    localStorage.clear();
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma","qa621j_origin");
    const identity=commitChronicleRunIdentity43600({runId:"sc_run_v1_qa621j_00000000-0000-4000-8000-000000000621",creationKind:"NEW_START"});
    const completed=completeChronicleOriginPrologue("academy_menma",["qa621j_complete"]);
    const formation=getAcademyTeamFormationSnapshot();
    const desired=["academy_kakashi","academy_mirai"];
    if(!desired.every(id=>formation.eligibleCandidateVariantIds.includes(id)))return{error:"required_team_missing",eligible:formation.eligibleCandidateVariantIds};
    selectAcademyTeamFormationTeammate(1,desired[0]);
    selectAcademyTeamFormationTeammate(2,desired[1]);
    const formed=confirmAcademyTeamFormation("qa621j_team",desired);
    const continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({
      sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore",
      trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,
      arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true
    },{save:true});
    playerData.ryo=621;savePlayerData();
    return{selected,identity,completed,formed,continued,team:getChronicleCurrentTeam43600()};
  });
  assert(!result.error,JSON.stringify(result));
  for(const key of ["selected","identity","completed","formed","continued"])assert.strictEqual(result[key].success,true,`${key}: ${JSON.stringify(result[key])}`);
  assert.deepStrictEqual(result.team.teamVariantIds,["academy_menma","academy_kakashi","academy_mirai"]);
}

async function semanticFingerprint(page){
  return page.evaluate(()=>JSON.stringify({
    team:getChronicleCurrentTeam43600(),
    ryo:playerData.ryo,
    acquisition:playerData.acquisition||null,
    characterOwnership:playerData.characterOwnership||null,
    activityHistory:Array.isArray(playerData.activityHistory)?playerData.activityHistory:null,
    worldEventRuntime:playerData.worldEventRuntime||null,
    chronicleRunIdentity:playerData.chronicleRunIdentity||null,
    chronicleJourney:playerData.chronicleJourney||null,
    discovery:playerData.discovery||playerData.worldDiscovery||null
  }));
}

async function openSurface(page,surface){
  if(surface==="region")await page.evaluate(()=>openRegionHub("fire"));
  else if(surface==="village")await page.evaluate(()=>openOverlay("village"));
  else await page.evaluate(()=>{if(typeof returnToWorldMap==="function")returnToWorldMap();else if(typeof closeOverlay==="function")closeOverlay();});
  await page.waitForFunction(surface=>{
    const root=document.getElementById("sc-phase2-live-hud-49900");
    if(!root||root.hidden||root.dataset.surface!==surface)return false;
    if(surface==="world")return root.dataset.map557!=="true";
    const map=document.querySelector(surface==="region"?".region-map-pane":".village-map-screen");
    return !!(map&&map.getBoundingClientRect().width>0&&root.dataset.map557==="true");
  },surface,{timeout:15000});
  await sleep(page,1100);
}

async function snapshot(page,surface){
  return page.evaluate(surface=>{
    const root=document.getElementById("sc-phase2-live-hud-49900");
    const map=surface==="world"?null:document.querySelector(surface==="region"?".region-map-pane":".village-map-screen");
    const rect=node=>{
      if(!node)return null;
      const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
      if(!(r.width>0&&r.height>0)||cs.display==="none"||cs.visibility==="hidden"||Number(cs.opacity||1)<=0)return null;
      return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};
    };
    const mr=rect(map);
    const rows={
      map:mr,
      state:rect(root?.querySelector(".sc-hud499-state-cluster")),
      team:rect(root?.querySelector(".sc-hud499-team")),
      tools:rect(root?.querySelector(".sc-hud499-tools")),
      compass:rect(root?.querySelector(".sc-hud499-map-nav")),
      context:rect(root?.querySelector('.sc-hud499-context[data-active="true"]')),
      eventDrawer:surface==="region"?rect(document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer")):null
    };
    const intersection=row=>{
      if(!row||!mr)return 0;
      return Math.max(0,Math.min(row.right,mr.right)-Math.max(row.left,mr.left))*Math.max(0,Math.min(row.bottom,mr.bottom)-Math.max(row.top,mr.top));
    };
    const scheduler=getUnobstructedMapCanvas55700SchedulerSnapshot();
    return{
      surface,viewport:[innerWidth,innerHeight],map557:root?.dataset.map557||null,
      map557RegionInfoOpen:root?.dataset.map557RegionInfoOpen||null,
      activeBox:!!document.querySelector(".overlay-content-box.sc-map557-active"),
      rows,
      intersections:Object.fromEntries(Object.entries(rows).filter(([k])=>k!=="map").map(([k,row])=>[k,intersection(row)])),
      scheduler,
      diagnostics:runUnobstructedMapCanvas55700Diagnostics()
    };
  },surface);
}

function assertNoDrift(samples,label){
  assert(samples.length>=24,`${label}: insufficient temporal samples ${samples.length}`);
  for(const key of ["map","state","team","tools","compass","eventDrawer"]){
    const rows=samples.map(s=>s.rows[key]).filter(Boolean);
    if(rows.length<2)continue;
    const first=rows[0];let max=0;
    for(const row of rows.slice(1))for(const prop of ["left","top","right","bottom","width","height"])max=Math.max(max,drift(row[prop],first[prop]));
    assert(max<=TOLERANCE,`${label}: ${key} temporal drift ${max.toFixed(3)}px > ${TOLERANCE}px`);
  }
  const last=samples.at(-1);
  for(const [key,area] of Object.entries(last.intersections))assert.strictEqual(area,0,`${label}: ${key} overlaps map by ${area}px²`);
  assert.strictEqual(last.diagnostics.pass,true,`${label}: diagnostics RED ${JSON.stringify(last.diagnostics.failed)}`);
  assert.strictEqual(last.scheduler.periodicTimer,false,`${label}: periodic timer active`);
  assert.strictEqual(last.scheduler.bodyWideMutationObserver,false,`${label}: body-wide observer active`);
  assert.strictEqual(last.scheduler.mode,"signal_coalesced",`${label}: wrong scheduler mode`);
}

async function proveQuiet(page,surface,label,ms=3800){
  await sleep(page,900);
  const before=await page.evaluate(()=>getUnobstructedMapCanvas55700SchedulerSnapshot());
  const samples=[];const started=Date.now();
  while(Date.now()-started<ms){samples.push(await snapshot(page,surface));await sleep(page,90);}
  const after=await page.evaluate(()=>getUnobstructedMapCanvas55700SchedulerSnapshot());
  assertNoDrift(samples,label);
  assert(after.syncCount-before.syncCount<=1,`${label}: idle sync churn ${JSON.stringify({before,after})}`);
  assert(after.scheduleCount-before.scheduleCount<=2,`${label}: idle schedule churn ${JSON.stringify({before,after})}`);
  assert.strictEqual(after.writeCount,before.writeCount,`${label}: unchanged geometry kept writing ${JSON.stringify({before,after})}`);
  assert.strictEqual(after.pendingRaf,false,`${label}: scheduler never went quiescent`);
  return{before,after,samples:samples.length};
}

async function proveIdempotentRefresh(page,label){
  const result=await page.evaluate(()=>{
    const before=getUnobstructedMapCanvas55700SchedulerSnapshot();
    for(let i=0;i<6;i++)refreshUnobstructedMapCanvas55700();
    const after=getUnobstructedMapCanvas55700SchedulerSnapshot();
    return{before,after};
  });
  assert.strictEqual(result.after.writeCount,result.before.writeCount,`${label}: repeated explicit sync rewrote unchanged geometry`);
  assert.strictEqual(result.after.syncCount-result.before.syncCount,6,`${label}: explicit sync accounting mismatch`);
  return result;
}

async function visibleHotspots(page){
  return page.evaluate(()=>[...document.querySelectorAll('.region-hotspot[data-hotspot-id][data-region-key="fire"]')].map(node=>{
    const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
    const points=[
      [r.left+r.width/2,r.top+r.height/2],
      [r.left+Math.min(8,r.width/3),r.top+Math.min(8,r.height/3)],
      [r.right-Math.min(8,r.width/3),r.bottom-Math.min(8,r.height/3)]
    ];
    const hitPoints=points.filter(([x,y])=>{
      if(x<0||x>=innerWidth||y<0||y>=innerHeight)return false;
      const top=document.elementFromPoint(x,y);
      return !!top&&(top===node||node.contains(top)||(top.closest&&top.closest('.region-hotspot[data-hotspot-id][data-region-key="fire"]')===node));
    });
    const projection=typeof getHotspotProjection==="function"?getHotspotProjection("fire",node.dataset.hotspotId):null;
    return{
      id:node.dataset.hotspotId,label:projection?.knownLabel||null,
      visible:r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0,
      reachable:hitPoints.length>0,clickPoint:hitPoints[0]||null,
      hasOpportunity:Array.isArray(projection?.opportunities)&&projection.opportunities.length>0,
      bandit:/bandit\s+hideout/i.test(JSON.stringify(projection||{}))
    };
  }).filter(row=>row.visible));
}

async function openContextByPointer(page,label){
  const hotspots=await visibleHotspots(page);
  assert(hotspots.length>0,`${label}: no visible Region hotspots`);
  const blocked=hotspots.filter(row=>!row.reachable);
  assert.deepStrictEqual(blocked,[],`${label}: map presentation blocked hotspot(s) at all contract hit points: ${JSON.stringify(blocked)}`);
  const target=hotspots.find(row=>row.bandit)||hotspots.find(row=>row.hasOpportunity);
  assert(target&&target.clickPoint,`${label}: no deterministic pointer-reachable selected-context hotspot`);
  await page.mouse.click(target.clickPoint[0],target.clickPoint[1]);
  await page.waitForFunction(()=>{
    const drawer=document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer");
    if(!drawer)return false;const r=drawer.getBoundingClientRect(),cs=getComputedStyle(drawer);
    return r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden";
  },null,{timeout:5000});
  await sleep(page,1000);
  return target;
}

async function closeContextByPointer(page,label){
  const center=await page.evaluate(()=>{
    const drawer=document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer");
    const button=drawer?.querySelector('.alpha328-event__close,button[aria-label="Close"],button[aria-label="Close event drawer"]');
    if(!button)return null;const r=button.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};
  });
  assert(center,`${label}: context close control unavailable`);
  await page.mouse.click(center.x,center.y);
  await page.waitForFunction(()=>!document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer"),null,{timeout:4000});
  await sleep(page,1000);
}

async function worldNegative(page,label){
  const first=await snapshot(page,"world");
  assert.strictEqual(first.map557,null,`${label}: #557 marker active on World`);
  assert.strictEqual(first.map557RegionInfoOpen,null,`${label}: Region marker leaked onto World`);
  assert.strictEqual(first.activeBox,false,`${label}: #557 active class leaked onto World`);
  const before=first.scheduler;await sleep(page,2600);
  const after=await page.evaluate(()=>getUnobstructedMapCanvas55700SchedulerSnapshot());
  assert(after.syncCount-before.syncCount<=1,`${label}: World kept resyncing`);
  assert(after.scheduleCount-before.scheduleCount<=2,`${label}: World kept rescheduling`);
  assert.strictEqual(after.writeCount,before.writeCount,`${label}: World kept geometry writing`);
  assert.strictEqual(after.pendingRaf,false,`${label}: World scheduler pending rAF after idle`);
  return{before,after};
}

async function resizeAndProve(page,surface,width,height,label){
  await page.setViewportSize({width,height});
  await sleep(page,1150);
  const snap=await snapshot(page,surface);
  assert.deepStrictEqual(snap.viewport,[width,height],`${label}: viewport did not commit`);
  return proveQuiet(page,surface,label,2400);
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const context=await browser.newContext({viewport:{width:1366,height:768}});
    const page=await context.newPage();
    const errors=await installBrowserRuntimeErrorGate(page);
    await boot(page);await seed(page);
    const semanticBefore=await semanticFingerprint(page);
    const results=[];

    await openSurface(page,"world");
    results.push({label:"world-initial",negative:await worldNegative(page,"world-initial-1366x768")});

    await openSurface(page,"region");
    results.push({label:"region-idle-1366",quiet:await proveQuiet(page,"region","region-idle-1366x768",4200)});
    results.push({label:"region-idempotence",refresh:await proveIdempotentRefresh(page,"region-idempotence")});

    const target=await openContextByPointer(page,"region-pointer-context");
    results.push({label:"region-selected",target,quiet:await proveQuiet(page,"region","region-selected-context",3400)});
    await closeContextByPointer(page,"region-pointer-context");
    results.push({label:"region-after-close",quiet:await proveQuiet(page,"region","region-after-context-close",2800)});

    results.push({label:"region-1920",quiet:await resizeAndProve(page,"region",1920,1080,"region-resize-1920x1080")});
    results.push({label:"region-1600",quiet:await resizeAndProve(page,"region",1600,900,"region-resize-1600x900")});
    results.push({label:"region-back-1366",quiet:await resizeAndProve(page,"region",1366,768,"region-resize-back-1366x768")});

    await openSurface(page,"village");
    results.push({label:"village-idle-1366",quiet:await proveQuiet(page,"village","village-idle-1366x768",4200)});
    results.push({label:"village-idempotence",refresh:await proveIdempotentRefresh(page,"village-idempotence")});
    results.push({label:"village-1920",quiet:await resizeAndProve(page,"village",1920,1080,"village-resize-1920x1080")});
    results.push({label:"village-1600",quiet:await resizeAndProve(page,"village",1600,900,"village-resize-1600x900")});
    results.push({label:"village-back-1366",quiet:await resizeAndProve(page,"village",1366,768,"village-resize-back-1366x768")});

    await openSurface(page,"region");
    results.push({label:"region-reentry",quiet:await proveQuiet(page,"region","region-reentry-after-village",2600)});
    await openSurface(page,"world");
    results.push({label:"world-final",negative:await worldNegative(page,"world-final-1366x768")});
    await page.setViewportSize({width:1920,height:1080});await sleep(page,1200);
    results.push({label:"world-resized",negative:await worldNegative(page,"world-resized-1920x1080")});

    assert.strictEqual(await semanticFingerprint(page),semanticBefore,"#621 presentation-only verification mutated team/Ryō/Chronicle/World/acquisition truth");
    await errors.assertClean("#621 Lane J independent verifier");
    await page.screenshot({path:path.join(OUT,"final-world-1920x1080.png"),fullPage:true});
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({pass:true,issue:621,lane:"J",target:TARGET,tolerancePx:TOLERANCE,results,browserGoldenClaimed:false},null,2));
    console.log(JSON.stringify({pass:true,issue:621,lane:"J",target:TARGET,tolerancePx:TOLERANCE,checks:results.map(r=>r.label),browserGoldenClaimed:false},null,2));
    await context.close();
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
