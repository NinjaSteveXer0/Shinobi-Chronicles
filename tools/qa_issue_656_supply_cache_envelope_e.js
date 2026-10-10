#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),path=require("path");
const {chromium}=require("playwright");
const BASE=process.env.ISSUE_656_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_656_OUT||"artifacts/issue-656-supply-cache-envelope-e";
fs.mkdirSync(OUT,{recursive:true});
async function release(page){await page.evaluate(()=>{try{releaseAlphaFrontDoor33300?.();}catch(_){};try{SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_){};const g=document.querySelector('.game-container');if(g){g.removeAttribute('data-alpha-front-door-locked');g.inert=false;}for(const id of ['sc-alpha-front-door-33300','sc-alpha-front-door-33400'])document.getElementById(id)?.remove();});}
async function boot(browser){const c=await browser.newContext({viewport:{width:1366,height:768}}),p=await c.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForFunction(()=>typeof routeWorldOpportunityInteraction==='function'&&typeof getOpportunityDefinitionIncludingLegacy==='function'&&typeof resumeBattleCallerAfterCompletion==='function'&&typeof continueAfterSetback54400==='function'&&typeof completeBattleVictoryFromDamage==='function',null,{timeout:30000});await release(p);return{c,p};}
async function prepare(page){return page.evaluate(()=>{
  try{selectChronicleOrigin?.('academy_kakashi','issue656_supply_cache_probe');}catch(_){}
  try{if(typeof setOpportunityDiscovery==='function')setOpportunityDiscovery('hidden_supply_cache',{level:'discovered'},{save:false});}catch(_){}
  // The free-play journey gate is not the subject of this proof. Bypass only that gate
  // so the production opportunity router/definition/Battle launcher remain untouched.
  try{globalThis.isAcademyTeamFormationJourneyBlockingFreePlay=()=>false;}catch(_){}
  const d=getOpportunityDefinitionIncludingLegacy('hidden_supply_cache');
  if(!d)return{definition:null};
  const interactions=Array.isArray(d.interactions)?d.interactions.map(x=>({id:x.id||null,type:x.type||null,kind:x.kind||null,enemyId:x.enemyId||null,encounterId:x.encounterId||null,returnContext:x.returnContext||null})):[];
  return{definition:{id:d.id||d.opportunityId||null,name:d.name||null,regionKey:d.regionKey||null,missionAreaId:d.missionAreaId||null,locationId:d.locationId||null,hotspotId:d.hotspotId||null,opportunityId:d.opportunityId||d.id||null,interactions},routerSource:String(routeWorldOpportunityInteraction).slice(0,7000)};
});}
async function launch(page){return page.evaluate(()=>{
  const d=getOpportunityDefinitionIncludingLegacy('hidden_supply_cache');
  const interactions=Array.isArray(d?.interactions)?d.interactions:[];
  const action=interactions.find(x=>x&&(x.type==='battle'||x.kind==='battle'||x.enemyId||x.encounterId))||interactions[0];
  if(!action)return{success:false,reason:'supply_cache_action_missing',definition:d||null};
  const result=routeWorldOpportunityInteraction('hidden_supply_cache',action.id);
  return{action:{id:action.id||null,type:action.type||null,kind:action.kind||null,enemyId:action.enemyId||null,encounterId:action.encounterId||null,authoredReturnContext:action.returnContext||null},result,returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null,battleId:currentBattle?.battleId||null,encounterId:currentBattle?.encounterId||null,active:currentBattle?.active===true,battleOver:currentBattle?.battleOver===true};
});}
async function terminal(page,outcome){return page.evaluate(async outcome=>{
  try{hardSettleBattlePresentationQueue33000?.('issue656_supply_cache_probe');}catch(_){}
  let complete=null;
  if(outcome==='victory')complete=completeBattleVictoryFromDamage();else complete=completeBattleDefeat();
  const start=Date.now();
  while(Date.now()-start<5000){
    const visible=outcome==='victory'?document.querySelector('.alpha-victory-code-screen,.victory-screen'):document.querySelector('.alpha544-setback,.battle-terminal-setback');
    if(visible)break;
    await new Promise(r=>setTimeout(r,25));
  }
  const before={overlay:globalThis.currentOverlayType||null,returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null,battleOver:currentBattle?.battleOver===true,outcome:currentBattle?.outcome?.type||null};
  let continuation=null;
  if(outcome==='victory'){
    try{if(currentBattle?.rewards&&currentBattle.rewards.claimed!==true&&typeof claimVictoryRewardsFromOverlay==='function')claimVictoryRewardsFromOverlay();}catch(_){}
    continuation=continueAfterVictory();
  }else continuation=continueAfterSetback54400();
  return{complete,before,continuation,after:{overlay:globalThis.currentOverlayType||null,returnContext:currentBattle?.returnContext||null,selectedRegionKey:globalThis.selectedRegionKey||null,selectedMissionAreaId:globalThis.selectedMissionAreaId||null,selectedHotspotId:globalThis.selectedHotspotId||null,selectedOpportunityId:globalThis.selectedOpportunityId||null}};
},outcome);}
(async()=>{const browser=await chromium.launch({headless:true});const summary={candidate:process.env.GITHUB_SHA||null};try{
  for(const outcome of ['victory','defeat']){const {c,p}=await boot(browser);try{const prep=await prepare(p);assert(prep.definition,'Supply Cache definition missing');const launched=await launch(p);summary.definition=prep.definition;summary[outcome]={launched};assert.strictEqual(launched.result?.success,true,`${outcome} launch failed ${JSON.stringify(launched)}`);assert(launched.returnContext,`${outcome} returnContext missing`);assert(['region_hotspot','mission_area_hotspot'].includes(launched.returnContext.type),`${outcome} unexpected return type ${JSON.stringify(launched.returnContext)}`);const result=await terminal(p,outcome);summary[outcome].terminal=result;assert.strictEqual(result.before.outcome,outcome,`${outcome} semantic outcome mismatch`);assert.strictEqual(result.continuation?.success,true,`${outcome} continuation failed ${JSON.stringify(result.continuation)}`);}finally{await c.close();}}
  summary.pass=true;summary.browserGoldenClaimed=false;fs.writeFileSync(path.join(OUT,'summary.json'),JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify(summary,null,2));
}catch(e){summary.pass=false;summary.error=String(e&&e.stack||e);fs.writeFileSync(path.join(OUT,'summary.json'),JSON.stringify(summary,null,2)+'\n');console.error(summary.error);process.exitCode=1;}finally{await browser.close();}})();
