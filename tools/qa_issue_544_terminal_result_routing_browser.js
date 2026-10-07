#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_544_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_544_BROWSER_OUT||"artifacts/issue-544-terminal-result-routing";
const CANDIDATE_PATH=process.env.ISSUE_544_CANDIDATE_MODULE||"";
const CANDIDATE=CANDIDATE_PATH&&fs.existsSync(CANDIDATE_PATH)?fs.readFileSync(CANDIDATE_PATH,"utf8"):"";
fs.mkdirSync(OUT,{recursive:true});

const clone=v=>JSON.parse(JSON.stringify(v));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_e){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_e){}
    const game=document.querySelector(".game-container");if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){const n=document.getElementById(id);if(n)n.remove();}
  });
}

async function boot(browser,label,{candidate=false}={}){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  const assetResponses=[];
  page.on("response",response=>{
    const url=response.url();
    if(/\/UI\/(victory|setback)\.png(?:\?|$)/.test(url))assetResponses.push({url,status:response.status()});
  });
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof selectChronicleOrigin==="function"&&typeof launchStorySceneBattle==="function"&&typeof completeBattleVictoryFromDamage==="function"&&typeof completeBattleDefeat==="function"&&!!globalThis.SC_ACADEMY_IWABEE_ORIGIN_RUNTIME_399,null,{timeout:30000});
  await page.evaluate(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_e){}});
  await page.reload({waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof selectChronicleOrigin==="function"&&typeof launchStorySceneBattle==="function"&&!!globalThis.SC_ACADEMY_IWABEE_ORIGIN_RUNTIME_399,null,{timeout:30000});
  await releaseFrontDoor(page);
  if(candidate){
    assert(CANDIDATE,"candidate source missing");
    await page.addScriptTag({content:CANDIDATE});
    await page.waitForFunction(()=>typeof globalThis.presentCommittedBattleTerminalResult54400==="function",null,{timeout:5000});
  }
  await installTrace(page,label);
  return{context,page,gate,assetResponses};
}

async function installTrace(page,label){
  await page.evaluate(label=>{
    const visible=n=>!!n&&n.getClientRects().length>0&&getComputedStyle(n).display!=="none"&&getComputedStyle(n).visibility!=="hidden"&&Number(getComputedStyle(n).opacity)!==0;
    const surface=()=>{
      const victory=[...document.querySelectorAll(".alpha-victory-code-screen,.victory-screen")].find(visible)||null;
      const setback=[...document.querySelectorAll(".alpha331-setback")].find(visible)||null;
      return{type:victory?"victory":setback?"setback":null,victory:!!victory,setback:!!setback,text:(victory||setback)?.textContent?.trim().slice(0,220)||""};
    };
    const trace=globalThis.__ISSUE_544_TRACE={label,events:[],surface};
    const push=(kind,data={})=>trace.events.push({ordinal:trace.events.length+1,kind,at:Date.now(),surface:surface(),...(data||{})});
    const priorResume=globalThis.resumeBattleCallerAfterCompletion;
    if(typeof priorResume==="function"){
      const wrapped=function(outcome){push("caller_resume_attempt",{outcome,returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null});const r=priorResume.apply(this,arguments);push("caller_resume_return",{outcome,result:r&&typeof r==="object"?JSON.parse(JSON.stringify(r)):r});return r;};
      globalThis.resumeBattleCallerAfterCompletion=wrapped;try{resumeBattleCallerAfterCompletion=wrapped;}catch(_e){}
    }
    const priorClaim=globalThis.claimCurrentBattleRewards;
    if(typeof priorClaim==="function"){
      const wrapped=function(){push("reward_claim_attempt",{outcome:currentBattle?.outcome?.type||null});const r=priorClaim.apply(this,arguments);push("reward_claim_return",{result:r});return r;};
      globalThis.claimCurrentBattleRewards=wrapped;try{claimCurrentBattleRewards=wrapped;}catch(_e){}
    }
    const observer=new MutationObserver(()=>{
      const now=surface();if(!now.type)return;
      const last=trace.events[trace.events.length-1];
      if(!last||last.kind!=="terminal_surface_visible"||last.surface?.type!==now.type)push("terminal_surface_visible",{terminalType:now.type});
    });
    observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["style","class"]});
    trace.observer=observer;push("trace_installed");
  },label);
}

async function surface(page){return page.evaluate(()=>globalThis.__ISSUE_544_TRACE?.surface?.()||{type:null});}
async function waitSurface(page,type,timeout=1800){
  const expected=type==="defeat"?"setback":type;
  const end=Date.now()+timeout;
  while(Date.now()<end){const row=await surface(page);if(row.type===expected)return row;await sleep(40);}
  return surface(page);
}
async function trace(page){return page.evaluate(()=>JSON.parse(JSON.stringify(globalThis.__ISSUE_544_TRACE?.events||[])));}

async function launchIwabee(page,label){
  const launched=await page.evaluate(label=>{
    const selected=selectChronicleOrigin("academy_iwabee",label);
    const story=beginAlphaChronicleOriginPrologue();
    const set=setStorySceneBeat("iwa_confront_battle",{render:false});
    const battle=launchStorySceneBattle();
    return{selected,story,set,battle,battleId:currentBattle?.battleId||null,returnContext:JSON.parse(JSON.stringify(currentBattle?.returnContext||null)),sceneId:getActiveStorySceneRuntime()?.sceneId||null,beatId:getActiveStorySceneRuntime()?.beatId||null};
  },label);
  assert.strictEqual(launched.selected?.success,true,label+" origin select failed "+JSON.stringify(launched));
  assert.strictEqual(launched.story?.success,true,label+" origin launch failed "+JSON.stringify(launched));
  assert.strictEqual(launched.set?.success,true,label+" Battle beat set failed "+JSON.stringify(launched));
  assert.strictEqual(launched.battle?.success,true,label+" Battle launch failed "+JSON.stringify(launched));
  assert.strictEqual(launched.returnContext?.type,"story_scene",label+" not a real Story caller envelope");
  return launched;
}

async function commitIwabee(page,outcome){
  return page.evaluate(outcome=>{
    const IWABEE="academy_iwabee",ROGUE="iwabee_origin_rogue_genin_01";
    const walletBefore=Math.max(0,Number(playerData.ryo)||0);
    const historyBefore=(playerData.activityHistory||[]).length;
    if(outcome==="victory"){
      const rec=getBattleRemainingPLRecord("enemy",ROGUE);setBattleRemainingPLRecord("enemy",ROGUE,0,rec?.maximum||rec?.max||23);
      const actor=getBattleParticipantByIdentity("player",IWABEE)||currentBattle.activePlayer||getPlayerCharacter(IWABEE);
      completeBattleVictoryFromDamage(actor,null,ROGUE);
    }else{
      const rec=getBattleRemainingPLRecord("player",IWABEE);setBattleRemainingPLRecord("player",IWABEE,0,rec?.maximum||rec?.max||13);
      completeBattleDefeat(IWABEE,null,"issue_544_adversarial_qa");
    }
    return{
      walletBefore,historyBefore,battleId:currentBattle?.battleId||null,
      outcome:JSON.parse(JSON.stringify(currentBattle?.outcome||null)),
      returnContext:JSON.parse(JSON.stringify(currentBattle?.returnContext||null)),
      rewards:JSON.parse(JSON.stringify(currentBattle?.rewards||null)),
      terminal:typeof getBattleTerminalResultPresentation54400==="function"?getBattleTerminalResultPresentation54400():null
    };
  },outcome);
}

async function continueIwabee(page,outcome,baselineFailure=false){
  return page.evaluate(({outcome,baselineFailure})=>{
    const wallet0=Math.max(0,Number(playerData.ryo)||0);
    let claim1=null,claim2=null,resume=null;
    if(outcome==="victory"){
      claim1=claimCurrentBattleRewards();claim2=claimCurrentBattleRewards();
      resume=resumeBattleCallerAfterCompletion("victory");
    }else if(baselineFailure){
      resume=resumeBattleCallerAfterCompletion("defeat");
    }else{
      resume=typeof continueAfterSetback33100==="function"?continueAfterSetback33100():resumeBattleCallerAfterCompletion("defeat");
    }
    const rt=getActiveStorySceneRuntime();
    return{
      claim1,claim2,resume,walletAfter:Math.max(0,Number(playerData.ryo)||0),walletDeltaFromContinue:Math.max(0,Number(playerData.ryo)||0)-wallet0,
      sceneId:rt?.sceneId||null,beatId:rt?.beatId||null,localContext:JSON.parse(JSON.stringify(rt?.localContext||{})),
      rewardReceipts:(playerData.activityHistory||[]).filter(r=>r&&r.rewardSourceId==="iwabee_origin_rogue_genin_battle_victory_ryo_01").map(r=>JSON.parse(JSON.stringify(r))),
      sourceOccurrenceCount:(playerData.activityHistory||[]).filter(r=>r&&r.occurrenceId==="occ_origin_iwabee_rogue_genin_response_resolution").length,
      terminal:typeof getBattleTerminalResultPresentation54400==="function"?getBattleTerminalResultPresentation54400():null
    };
  },{outcome,baselineFailure});
}

async function runIwabeeRoute(browser,outcome,candidate){
  const label=`iwabee-${outcome}-${candidate?"candidate":"baseline"}`;
  const {context,page,gate,assetResponses}=await boot(browser,label,{candidate});
  try{
    const launch=await launchIwabee(page,label);
    const committed=await commitIwabee(page,outcome);
    assert.strictEqual(committed.outcome?.type,outcome,label+" semantic outcome drift");
    const firstSurface=await waitSurface(page,outcome,2200);
    const expectedType=outcome==="defeat"?"setback":"victory";
    if(candidate){
      assert.strictEqual(firstSurface.type,expectedType,label+" candidate terminal surface missing "+JSON.stringify({firstSurface,committed}));
      const duplicate=await page.evaluate(outcome=>({a:presentCommittedBattleTerminalResult(outcome,{source:"qa_duplicate_a"}),b:presentCommittedBattleTerminalResult(outcome,{source:"qa_duplicate_b"}),state:getBattleTerminalResultPresentation54400()}),outcome);
      await sleep(80);
      assert.strictEqual(duplicate.state.status,"presented",label+" terminal state not presented");
    }else if(outcome==="defeat"){
      assert.notStrictEqual(firstSurface.type,"setback",label+" baseline unexpectedly already has Setback; baseline expectation must be refreshed");
    }
    const continued=await continueIwabee(page,outcome,!candidate&&outcome==="defeat");
    assert.strictEqual(continued.resume?.success,true,label+" exact caller resume failed "+JSON.stringify(continued.resume));
    assert.strictEqual(continued.sceneId,launch.sceneId,label+" caller returned to wrong Story scene");
    assert.notStrictEqual(continued.beatId,"iwa_confront_battle",label+" caller did not leave Battle beat");
    assert(continued.sourceOccurrenceCount<=1,label+" duplicate Story occurrence commit");
    if(outcome==="victory"){
      assert.strictEqual(continued.walletDeltaFromContinue,50,label+" Victory did not grant exactly +50 Ryō once");
      assert.strictEqual(continued.rewardReceipts.length,1,label+" Victory reward receipt missing/duplicated");
    }else{
      assert.strictEqual(continued.walletDeltaFromContinue,0,label+" Setback/defeat claimed a reward");
      assert.strictEqual(continued.rewardReceipts.length,0,label+" defeat wrote Victory reward receipt");
    }
    const events=await trace(page);
    const resumeAttempt=events.find(e=>e.kind==="caller_resume_attempt");
    if(candidate)assert(resumeAttempt?.surface?.type===expectedType,label+" caller resume outran result presentation "+JSON.stringify(events));
    if(!candidate&&outcome==="defeat")assert(resumeAttempt?.surface?.type!=="setback",label+" baseline defeat did not reproduce direct resume before Setback");
    await sleep(250);
    if(candidate){
      const wanted=`/UI/${outcome==="defeat"?"setback":"victory"}.png`;
      assert(assetResponses.some(r=>r.url.includes(wanted)&&r.status===200),label+" approved lowercase result asset did not resolve HTTP 200 "+JSON.stringify(assetResponses));
    }
    const errors=await gate.assertClean(label);
    return{label,candidate,launch,committed,firstSurface,continued,events,assetResponses:clone(assetResponses),errors,browserGoldenClaimed:false};
  }finally{await context.close();}
}

async function worldDiscoveryProbe(browser){
  const {context,page,gate}=await boot(browser,"world-bandit-discovery",{candidate:false});
  try{
    const probe=await page.evaluate(()=>{
      const needle=/alpha_bandit_hideout_battle|bandit_hideout/i,functions=[];
      for(const name of Object.getOwnPropertyNames(globalThis)){
        let value;try{value=globalThis[name];}catch(_e){continue;}
        if(typeof value!=="function")continue;
        let source="";try{source=Function.prototype.toString.call(value);}catch(_e){}
        if(needle.test(source))functions.push({name,source:source.slice(0,2400)});
      }
      const matches=[];
      const seen=new WeakSet();
      function walk(value,path,depth){
        if(depth>7||value==null)return;
        if(typeof value==="string"){if(needle.test(value))matches.push({path,value});return;}
        if(typeof value!=="object"&&typeof value!=="function")return;
        if((typeof value==="object"||typeof value==="function")&&seen.has(value))return;
        if(typeof value==="object"||typeof value==="function")seen.add(value);
        for(const key of Object.keys(value).slice(0,120)){
          let next;try{next=value[key];}catch(_e){continue;}
          if(typeof next==="function"){
            let src="";try{src=Function.prototype.toString.call(next);}catch(_e){}
            if(needle.test(src))matches.push({path:path+"."+key,value:"[function] "+src.slice(0,1200)});
          }else walk(next,path+"."+key,depth+1);
          if(matches.length>=80)return;
        }
      }
      try{if(typeof worldRegions!=="undefined")walk(worldRegions,"worldRegions",0);}catch(_e){}
      try{if(typeof worldRegionDefinitions!=="undefined")walk(worldRegionDefinitions,"worldRegionDefinitions",0);}catch(_e){}
      try{if(typeof regionEvents!=="undefined")walk(regionEvents,"regionEvents",0);}catch(_e){}
      return{functions,matches,globals:Object.getOwnPropertyNames(globalThis).filter(n=>/bandit|region.*battle|battle.*region|hotspot.*battle/i.test(n)).sort()};
    });
    await gate.assertClean("world-bandit-discovery");
    return probe;
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const results={issue:544,lane:"F",candidateHead:"803bfb270a2f43c16243da522ae534b0e67954a7",browserGoldenClaimed:false,routes:[],worldProbe:null};
  try{
    results.routes.push(await runIwabeeRoute(browser,"victory",false));
    results.routes.push(await runIwabeeRoute(browser,"defeat",false));
    if(CANDIDATE){
      results.routes.push(await runIwabeeRoute(browser,"victory",true));
      results.routes.push(await runIwabeeRoute(browser,"defeat",true));
    }
    results.worldProbe=await worldDiscoveryProbe(browser);
    fs.writeFileSync(path.join(OUT,"browser-evidence.json"),JSON.stringify(results,null,2));
    console.log(JSON.stringify(results,null,2));
    console.log("PASS #544 Origin real-route baseline/candidate chronology; World Bandit route discovery evidence captured; browserGoldenClaimed=false");
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
