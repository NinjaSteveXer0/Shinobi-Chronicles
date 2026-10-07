#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE621_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE621_OUT||"artifacts/issue-621-region-hud-stability";
fs.mkdirSync(OUT,{recursive:true});
const TOLERANCE=.35;

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
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){document.getElementById(id)?.remove();}
  });
}

async function seed(page){
  const result=await page.evaluate(()=>{
    localStorage.clear();
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma","qa621_origin");
    const identity=commitChronicleRunIdentity43600({runId:"sc_run_v1_qa621_00000000-0000-4000-8000-000000000621",creationKind:"NEW_START"});
    const completed=completeChronicleOriginPrologue("academy_menma",["qa621_complete"]);
    const formation=getAcademyTeamFormationSnapshot();
    const desired=["academy_kakashi","academy_mirai"];
    if(!desired.every(id=>formation.eligibleCandidateVariantIds.includes(id)))return{error:"required_team_missing",eligible:formation.eligibleCandidateVariantIds};
    selectAcademyTeamFormationTeammate(1,desired[0]);
    selectAcademyTeamFormationTeammate(2,desired[1]);
    const formed=confirmAcademyTeamFormation("qa621_team",desired);
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

async function fingerprint(page){
  return page.evaluate(()=>JSON.stringify({
    team:getChronicleCurrentTeam43600(),
    ryo:playerData.ryo,
    acquisition:playerData.acquisition||null,
    activityHistory:Array.isArray(playerData.activityHistory)?playerData.activityHistory:null,
    worldEventRuntime:playerData.worldEventRuntime||null
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
  await page.evaluate(()=>{try{refreshUnobstructedMapCanvas55700();}catch(_error){}});
  await page.waitForTimeout(850);
}

async function geometry(page,surface){
  return page.evaluate(surface=>{
    const root=document.getElementById("sc-phase2-live-hud-49900");
    const map=surface==="world"?null:document.querySelector(surface==="region"?".region-map-pane":".village-map-screen");
    const rect=node=>{
      if(!node)return null;
      const r=node.getBoundingClientRect(),cs=getComputedStyle(node);
      if(!(r.width>0&&r.height>0)||cs.display==="none"||cs.visibility==="hidden"||Number(cs.opacity||1)<=0)return null;
      return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};
    };
    const mr=map?rect(map):null;
    const intersection=row=>{
      if(!row||!mr)return 0;
      return Math.max(0,Math.min(row.right,mr.right)-Math.max(row.left,mr.left))*Math.max(0,Math.min(row.bottom,mr.bottom)-Math.max(row.top,mr.top));
    };
    const rows={
      map:mr,
      state:rect(root&&root.querySelector(".sc-hud499-state-cluster")),
      team:rect(root&&root.querySelector(".sc-hud499-team")),
      tools:rect(root&&root.querySelector(".sc-hud499-tools")),
      compass:rect(root&&root.querySelector(".sc-hud499-map-nav")),
      context:rect(root&&root.querySelector('.sc-hud499-context[data-active="true"]')),
      eventDrawer:surface==="region"?rect(document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer")):null
    };
    return{
      viewport:[innerWidth,innerHeight],surface,
      map557:root&&root.dataset.map557||null,
      rows,
      intersections:Object.fromEntries(Object.entries(rows).filter(([key])=>key!=="map").map(([key,row])=>[key,intersection(row)])),
      scheduler:getUnobstructedMapCanvas55700SchedulerSnapshot(),
      diagnostics:runUnobstructedMapCanvas55700Diagnostics()
    };
  },surface);
}

function delta(a,b){return Math.abs((Number(a)||0)-(Number(b)||0));}
function assertStableSamples(samples,label){
  assert(samples.length>=10,`${label}: insufficient samples`);
  const keys=["map","state","team","tools","compass","eventDrawer"];
  for(const key of keys){
    const rows=samples.map(sample=>sample.rows[key]).filter(Boolean);
    if(rows.length<2)continue;
    const first=rows[0];
    let max=0;
    for(const row of rows.slice(1))for(const prop of ["left","top","right","bottom","width","height"])max=Math.max(max,delta(row[prop],first[prop]));
    assert(max<=TOLERANCE,`${label}: ${key} drifted ${max.toFixed(3)}px across idle temporal samples`);
  }
  const final=samples[samples.length-1];
  for(const [key,value] of Object.entries(final.intersections))assert.strictEqual(value,0,`${label}: ${key} overlaps live map by ${value}px²`);
  assert.strictEqual(final.diagnostics.pass,true,`${label}: #557 diagnostics failed ${JSON.stringify(final.diagnostics.failed)}`);
}

async function proveTemporalStability(page,surface,label,ms=3200){
  const before=await page.evaluate(()=>getUnobstructedMapCanvas55700SchedulerSnapshot());
  const samples=[];
  const started=Date.now();
  while(Date.now()-started<ms){samples.push(await geometry(page,surface));await page.waitForTimeout(120);}
  const after=await page.evaluate(()=>getUnobstructedMapCanvas55700SchedulerSnapshot());
  assertStableSamples(samples,label);
  assert(after.syncCount-before.syncCount<=1,`${label}: #557 kept resyncing while idle: ${JSON.stringify({before,after})}`);
  assert.strictEqual(after.writeCount,before.writeCount,`${label}: #557 kept writing geometry while idle: ${JSON.stringify({before,after})}`);
  return{before,after,samples:samples.length};
}

async function selectContextCard(page){
  return page.evaluate(()=>{
    const nodes=[...document.querySelectorAll('.region-hotspot[data-hotspot-id][data-region-key="fire"]')];
    const projections=nodes.map(node=>({node,projection:typeof getHotspotProjection==="function"?getHotspotProjection("fire",node.dataset.hotspotId):null}));
    let target=projections.find(row=>/bandit\s+hideout/i.test(JSON.stringify(row.projection||{})));
    if(!target)target=projections.find(row=>row.projection&&row.projection.knownLabel&&row.projection.knownLabel!=="???"&&Array.isArray(row.projection.opportunities)&&row.projection.opportunities.length);
    if(!target)return null;
    const result=selectMapNode("fire",target.node.dataset.hotspotId);
    return result?{hotspotId:target.node.dataset.hotspotId,knownLabel:result.knownLabel||target.projection.knownLabel||null,bandit:/bandit\s+hideout/i.test(JSON.stringify(target.projection||{}))}:null;
  });
}

async function proveSelectedContext(page,label){
  const selected=await selectContextCard(page);
  assert(selected,`${label}: no deterministic Region context card target available`);
  await page.waitForFunction(()=>{
    const drawer=document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer");
    if(!drawer)return false;const r=drawer.getBoundingClientRect(),cs=getComputedStyle(drawer);
    return r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden";
  },null,{timeout:5000});
  await page.waitForTimeout(850);
  const stability=await proveTemporalStability(page,"region",`${label}-selected-context`,2200);
  const closed=await page.evaluate(()=>{
    const drawer=document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer");
    const button=drawer&&drawer.querySelector('.alpha328-event__close,button[aria-label="Close"],button[aria-label="Close event drawer"]');
    if(!button)return false;button.click();return true;
  });
  assert.strictEqual(closed,true,`${label}: selected Region context close control unavailable`);
  await page.waitForFunction(()=>!document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer"),null,{timeout:3000});
  await page.waitForTimeout(850);
  const afterClose=await proveTemporalStability(page,"region",`${label}-after-context-close`,1600);
  return{selected,stability,afterClose};
}

async function assertWorldNegative(page,label){
  const first=await geometry(page,"world");
  assert.strictEqual(first.map557,null,`${label}: #557 remained active on World`);
  const before=first.scheduler;await page.waitForTimeout(1400);
  const after=await page.evaluate(()=>getUnobstructedMapCanvas55700SchedulerSnapshot());
  assert(after.syncCount-before.syncCount<=1,`${label}: World negative control kept #557 scheduler active`);
  assert.strictEqual(after.writeCount,before.writeCount,`${label}: World negative control kept #557 writing`);
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const context=await browser.newContext({viewport:{width:1366,height:768}});
    const page=await context.newPage();
    const errors=await installBrowserRuntimeErrorGate(page);
    await boot(page);await seed(page);
    const semanticBefore=await fingerprint(page);
    const results=[];

    await openSurface(page,"world");await assertWorldNegative(page,"world-1366x768");

    await openSurface(page,"region");
    results.push({label:"region-1366x768",stability:await proveTemporalStability(page,"region","region-1366x768")});
    results.push({label:"region-context",context:await proveSelectedContext(page,"region-1366x768")});

    await page.setViewportSize({width:1600,height:900});await page.waitForTimeout(900);
    results.push({label:"region-1600x900",stability:await proveTemporalStability(page,"region","region-1600x900",1800)});
    await page.setViewportSize({width:1920,height:1080});await page.waitForTimeout(900);
    results.push({label:"region-1920x1080",stability:await proveTemporalStability(page,"region","region-1920x1080",1800)});

    await openSurface(page,"village");
    results.push({label:"village-1920x1080",stability:await proveTemporalStability(page,"village","village-1920x1080",2200)});
    await page.setViewportSize({width:1366,height:768});await page.waitForTimeout(900);
    results.push({label:"village-1366x768",stability:await proveTemporalStability(page,"village","village-1366x768",1800)});

    assert.strictEqual(await fingerprint(page),semanticBefore,"#621 presentation-only stability pass mutated Chronicle/World/team/economy truth");
    await errors.assertClean("#621 Region/Village HUD stability");
    await page.screenshot({path:path.join(OUT,"final-village-1366x768.png"),fullPage:true});
    console.log(JSON.stringify({pass:true,issue:621,tolerancePx:TOLERANCE,results,browserGoldenClaimed:false},null,2));
    await context.close();
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});