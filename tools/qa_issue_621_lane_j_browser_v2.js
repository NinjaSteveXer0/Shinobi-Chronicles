#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.ISSUE621_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE621_J_OUT||"artifacts/issue-621-lane-j-independent-v2";
const TARGET=process.env.ISSUE621_TARGET_SHA||null,TOL=.30;
fs.mkdirSync(OUT,{recursive:true});
const sleep=(p,ms)=>p.waitForTimeout(ms);

async function boot(page){
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!(globalThis.SC_PHASE2_LIVE_HUD_49900&&globalThis.SC_MAP_CANVAS_UNOBSTRUCTED_55700&&globalThis.getUnobstructedMapCanvas55700SchedulerSnapshot&&globalThis.runUnobstructedMapCanvas55700Diagnostics),null,{timeout:45000});
  await page.evaluate(()=>{
    try{releaseAlphaFrontDoor33300?.();}catch(_e){} try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_e){}
    const game=document.querySelector(".game-container"); if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function seed(page){
  const r=await page.evaluate(()=>{
    localStorage.clear(); playerData=createDefaultPlayerData(); setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership); savePlayerData();
    const selected=selectChronicleOrigin("academy_menma","qa621j2_origin");
    const identity=commitChronicleRunIdentity43600({runId:"sc_run_v1_qa621j2_00000000-0000-4000-8000-000000000621",creationKind:"NEW_START"});
    const completed=completeChronicleOriginPrologue("academy_menma",["qa621j2_complete"]);
    const desired=["academy_kakashi","academy_mirai"],formation=getAcademyTeamFormationSnapshot();
    if(!desired.every(id=>formation.eligibleCandidateVariantIds.includes(id)))return{error:"required_team_missing",eligible:formation.eligibleCandidateVariantIds};
    selectAcademyTeamFormationTeammate(1,desired[0]); selectAcademyTeamFormationTeammate(2,desired[1]);
    const formed=confirmAcademyTeamFormation("qa621j2_team",desired),continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore",trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true},{save:true});
    playerData.ryo=621;savePlayerData(); return{selected,identity,completed,formed,continued,team:getChronicleCurrentTeam43600()};
  });
  assert(!r.error,JSON.stringify(r)); for(const k of ["selected","identity","completed","formed","continued"])assert.strictEqual(r[k].success,true,`${k}: ${JSON.stringify(r[k])}`);
  assert.deepStrictEqual(r.team.teamVariantIds,["academy_menma","academy_kakashi","academy_mirai"]);
}
async function fingerprint(page){return page.evaluate(()=>JSON.stringify({team:getChronicleCurrentTeam43600(),ryo:playerData.ryo,acquisition:playerData.acquisition||null,ownership:playerData.characterOwnership||null,activity:Array.isArray(playerData.activityHistory)?playerData.activityHistory:null,world:playerData.worldEventRuntime||null,run:playerData.chronicleRunIdentity||null,journey:playerData.chronicleJourney||null,discovery:playerData.discovery||playerData.worldDiscovery||null}));}
async function openSurface(page,surface){
  if(surface==="region")await page.evaluate(()=>openRegionHub("fire")); else if(surface==="village")await page.evaluate(()=>openOverlay("village")); else await page.evaluate(()=>{if(typeof returnToWorldMap==="function")returnToWorldMap();else closeOverlay?.();});
  await page.waitForFunction(surface=>{const root=document.getElementById("sc-phase2-live-hud-49900");if(!root||root.hidden||root.dataset.surface!==surface)return false;if(surface==="world")return root.dataset.map557!=="true";const map=document.querySelector(surface==="region"?".region-map-pane":".village-map-screen");return !!(map&&map.getBoundingClientRect().width>0&&root.dataset.map557==="true");},surface,{timeout:15000});
  await sleep(page,1000);
}
async function snap(page,surface){return page.evaluate(surface=>{
  const root=document.getElementById("sc-phase2-live-hud-49900"),map=surface==="world"?null:document.querySelector(surface==="region"?".region-map-pane":".village-map-screen");
  const rect=n=>{if(!n)return null;const r=n.getBoundingClientRect(),cs=getComputedStyle(n);if(!(r.width>0&&r.height>0)||cs.display==="none"||cs.visibility==="hidden"||Number(cs.opacity||1)<=0)return null;return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
  const mr=rect(map),rows={map:mr,state:rect(root?.querySelector(".sc-hud499-state-cluster")),team:rect(root?.querySelector(".sc-hud499-team")),tools:rect(root?.querySelector(".sc-hud499-tools")),compass:rect(root?.querySelector(".sc-hud499-map-nav")),context:rect(root?.querySelector('.sc-hud499-context[data-active="true"]')),eventDrawer:surface==="region"?rect(document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer")):null};
  const area=row=>!row||!mr?0:Math.max(0,Math.min(row.right,mr.right)-Math.max(row.left,mr.left))*Math.max(0,Math.min(row.bottom,mr.bottom)-Math.max(row.top,mr.top));
  return{surface,viewport:[innerWidth,innerHeight],map557:root?.dataset.map557||null,regionInfo:root?.dataset.map557RegionInfoOpen||null,activeBox:!!document.querySelector(".overlay-content-box.sc-map557-active"),rows,intersections:Object.fromEntries(Object.entries(rows).filter(([k])=>k!=="map").map(([k,v])=>[k,area(v)])),scheduler:getUnobstructedMapCanvas55700SchedulerSnapshot(),diagnostics:runUnobstructedMapCanvas55700Diagnostics()};
},surface);}
function stable(samples,label){
  assert(samples.length>=16,`${label}: insufficient temporal samples`);
  for(const key of ["map","state","team","tools","compass","eventDrawer"]){const rows=samples.map(s=>s.rows[key]).filter(Boolean);if(rows.length<2)continue;const first=rows[0];let max=0;for(const row of rows.slice(1))for(const p of ["left","top","right","bottom","width","height"])max=Math.max(max,Math.abs((row[p]||0)-(first[p]||0)));assert(max<=TOL,`${label}: ${key} drift ${max.toFixed(3)}px`);}
  const last=samples.at(-1);for(const [k,v] of Object.entries(last.intersections))assert.strictEqual(v,0,`${label}: ${k} overlaps map ${v}px²`);assert.strictEqual(last.diagnostics.pass,true,`${label}: diagnostics RED ${JSON.stringify(last.diagnostics.failed)}`);assert.strictEqual(last.scheduler.periodicTimer,false,`${label}: periodic timer`);assert.strictEqual(last.scheduler.bodyWideMutationObserver,false,`${label}: body observer`);assert.strictEqual(last.scheduler.mode,"signal_coalesced",`${label}: scheduler mode`);
}
async function quiet(page,surface,label,ms=2600){
  await sleep(page,700);const before=await page.evaluate(()=>getUnobstructedMapCanvas55700SchedulerSnapshot()),samples=[],start=Date.now();while(Date.now()-start<ms){samples.push(await snap(page,surface));await sleep(page,100);}const after=await page.evaluate(()=>getUnobstructedMapCanvas55700SchedulerSnapshot());stable(samples,label);assert(after.syncCount-before.syncCount<=1,`${label}: idle sync churn ${JSON.stringify({before,after})}`);assert(after.scheduleCount-before.scheduleCount<=2,`${label}: idle schedule churn ${JSON.stringify({before,after})}`);assert.strictEqual(after.writeCount,before.writeCount,`${label}: idle rewrite churn`);assert.strictEqual(after.pendingRaf,false,`${label}: pending rAF`);return{before,after,samples:samples.length};
}
async function idempotent(page,label){const r=await page.evaluate(()=>{const before=getUnobstructedMapCanvas55700SchedulerSnapshot();for(let i=0;i<6;i++)refreshUnobstructedMapCanvas55700();return{before,after:getUnobstructedMapCanvas55700SchedulerSnapshot()};});assert.strictEqual(r.after.writeCount,r.before.writeCount,`${label}: unchanged explicit refresh rewrote geometry`);assert.strictEqual(r.after.syncCount-r.before.syncCount,6,`${label}: explicit refresh accounting`);return r;}
async function proveReachabilityAndSelect(page){
  const r=await page.evaluate(()=>{
    const rows=[...document.querySelectorAll('.region-hotspot[data-hotspot-id][data-region-key="fire"]')].map(node=>{const rect=node.getBoundingClientRect(),cs=getComputedStyle(node),projection=typeof getHotspotProjection==="function"?getHotspotProjection("fire",node.dataset.hotspotId):null;const points=[[rect.left+rect.width/2,rect.top+rect.height/2],[rect.left+Math.min(8,rect.width/3),rect.top+Math.min(8,rect.height/3)],[rect.right-Math.min(8,rect.width/3),rect.bottom-Math.min(8,rect.height/3)]];const hits=points.filter(([x,y])=>{if(x<0||x>=innerWidth||y<0||y>=innerHeight)return false;const top=document.elementFromPoint(x,y);return !!top&&(top===node||node.contains(top)||(top.closest&&top.closest('.region-hotspot[data-hotspot-id][data-region-key="fire"]')===node));});return{id:node.dataset.hotspotId,visible:rect.width>0&&rect.height>0&&cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0,reachable:hits.length>0,bandit:/bandit\s+hideout/i.test(JSON.stringify(projection||{})),hasOpportunity:Array.isArray(projection?.opportunities)&&projection.opportunities.length>0};}).filter(x=>x.visible);
    const blocked=rows.filter(x=>!x.reachable),target=rows.find(x=>x.bandit)||rows.find(x=>x.hasOpportunity);if(!target)return{rows,blocked,target:null,selected:null};const selected=selectMapNode("fire",target.id);return{rows,blocked,target,selected:selected?{hotspotId:target.id,knownLabel:selected.knownLabel||null}:null};
  });
  assert(r.rows.length>0,"Region: no visible hotspots");assert.deepStrictEqual(r.blocked,[],`Region: hotspot unreachable at all #557 contract hit-points ${JSON.stringify(r.blocked)}`);assert(r.target&&r.selected,`Region: canonical selected-context target unavailable ${JSON.stringify(r)}`);
  await page.waitForFunction(()=>{const d=document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer");if(!d)return false;const r=d.getBoundingClientRect(),cs=getComputedStyle(d);return r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden";},null,{timeout:5000});await sleep(page,850);return r;
}
async function closeContext(page){const ok=await page.evaluate(()=>{const d=document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer"),b=d?.querySelector('.alpha328-event__close,button[aria-label="Close"],button[aria-label="Close event drawer"]');if(!b)return false;b.click();return true;});assert.strictEqual(ok,true,"Region: context close control unavailable");await page.waitForFunction(()=>!document.querySelector(".region-map-pane .alpha328-event,.region-map-pane .region-event-drawer"),null,{timeout:4000});await sleep(page,800);}
async function resize(page,surface,w,h,label){await page.setViewportSize({width:w,height:h});await sleep(page,1050);assert.deepStrictEqual((await snap(page,surface)).viewport,[w,h],`${label}: viewport`);return quiet(page,surface,label,2200);}
async function worldNegative(page,label){const first=await snap(page,"world");assert.strictEqual(first.map557,null,`${label}: map557 leaked`);assert.strictEqual(first.regionInfo,null,`${label}: Region info marker leaked`);assert.strictEqual(first.activeBox,false,`${label}: active box leaked`);const before=first.scheduler;await sleep(page,2200);const after=await page.evaluate(()=>getUnobstructedMapCanvas55700SchedulerSnapshot());assert(after.syncCount-before.syncCount<=1,`${label}: sync churn`);assert(after.scheduleCount-before.scheduleCount<=2,`${label}: schedule churn`);assert.strictEqual(after.writeCount,before.writeCount,`${label}: write churn`);assert.strictEqual(after.pendingRaf,false,`${label}: pending rAF`);return{before,after};}
(async()=>{const browser=await chromium.launch({headless:true});try{const context=await browser.newContext({viewport:{width:1366,height:768}}),page=await context.newPage(),errors=await installBrowserRuntimeErrorGate(page);await boot(page);await seed(page);const semanticBefore=await fingerprint(page),results=[];
  await openSurface(page,"world");results.push({label:"world-initial",data:await worldNegative(page,"world-initial-1366")});
  await openSurface(page,"region");results.push({label:"region-idle",data:await quiet(page,"region","region-idle-1366",3600)});results.push({label:"region-idempotence",data:await idempotent(page,"region-idempotence")});const selection=await proveReachabilityAndSelect(page);results.push({label:"region-selected",selection,data:await quiet(page,"region","region-selected-context",2800)});await closeContext(page);results.push({label:"region-after-close",data:await quiet(page,"region","region-after-close",2200)});
  results.push({label:"region-1920",data:await resize(page,"region",1920,1080,"region-1920")});results.push({label:"region-1600",data:await resize(page,"region",1600,900,"region-1600")});results.push({label:"region-back-1366",data:await resize(page,"region",1366,768,"region-back-1366")});
  await openSurface(page,"village");results.push({label:"village-idle",data:await quiet(page,"village","village-idle-1366",3400)});results.push({label:"village-idempotence",data:await idempotent(page,"village-idempotence")});results.push({label:"village-1920",data:await resize(page,"village",1920,1080,"village-1920")});results.push({label:"village-1600",data:await resize(page,"village",1600,900,"village-1600")});results.push({label:"village-back-1366",data:await resize(page,"village",1366,768,"village-back-1366")});
  await openSurface(page,"region");results.push({label:"region-reentry",data:await quiet(page,"region","region-reentry",2200)});await openSurface(page,"world");results.push({label:"world-final",data:await worldNegative(page,"world-final-1366")});await page.setViewportSize({width:1920,height:1080});await sleep(page,1000);results.push({label:"world-resized",data:await worldNegative(page,"world-1920")});
  assert.strictEqual(await fingerprint(page),semanticBefore,"#621 presentation-only verification mutated team/Ryō/Chronicle/World/discovery/acquisition truth");await errors.assertClean("#621 Lane J independent verifier v2");await page.screenshot({path:path.join(OUT,"final-world-1920x1080.png"),fullPage:true});fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({pass:true,issue:621,lane:"J",target:TARGET,tolerancePx:TOL,results,browserGoldenClaimed:false},null,2));console.log(JSON.stringify({pass:true,issue:621,lane:"J",target:TARGET,tolerancePx:TOL,checks:results.map(r=>r.label),browserGoldenClaimed:false},null,2));await context.close();}finally{await browser.close();}})().catch(e=>{console.error(e&&e.stack||e);process.exit(1);});
