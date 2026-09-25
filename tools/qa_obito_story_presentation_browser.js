#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.OBITO_STORY_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.OBITO_STORY_BROWSER_OUT||"artifacts/obito-story-presentation-browser";
const SCENE_ID="origin_academy_obito_journey_to_training";
fs.mkdirSync(OUT,{recursive:true});

const CHOICES=[
  ["obi_furniture_choice","HELP HER","KEEP GOING"],
  ["obi_vegetables_choice","HELP HER","KEEP GOING"],
  ["obi_equipment_choice","HELP SEARCH","KEEP GOING"],
  ["obi_delivery_choice","HELP WITH THE DELIVERY","KEEP MOVING"],
  ["obi_cart_choice","STOP AND HELP","GO TO TRAINING"]
];
const EXPECTED_BACKDROP={
  obi_depart:"Obito Origin Backdrop/konoha_main_street.png",
  obi_furniture_choice:"Obito Origin Backdrop/quiet_residential_lane.png",
  obi_equipment_choice:"Obito Origin Backdrop/academy_approach_sloped_lane.png",
  obi_cart_choice:"Obito Origin Backdrop/academy_approach_sloped_lane.png",
  obi_arrival:"Obito Origin Backdrop/training_grounds_day.png",
  obi_home:"Obito Origin Backdrop/obito_home_interior.png",
  obi_reflect:"Obito Origin Backdrop/obito_home_interior.png"
};

async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_){}
    const game=document.querySelector(".game-container");if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function boot(browser,label){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!globalThis.SC_ALPHA_ORIGIN_32900&&typeof selectChronicleOrigin==="function"&&typeof beginAlphaChronicleOriginPrologue==="function"&&typeof getActiveStorySceneRuntime==="function",null,{timeout:30000});
  const started=await page.evaluate(()=>({selected:selectChronicleOrigin("academy_obito","obito_story_presentation_browser"),launched:beginAlphaChronicleOriginPrologue()}));
  assert(started.selected?.success===true,label+" select failed "+JSON.stringify(started));
  assert(started.launched?.success===true,label+" launch failed "+JSON.stringify(started));
  await releaseFrontDoor(page);
  await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene&&document.getElementById("story-scene-presentation-layer")?.style.display!=="none",SCENE_ID,{timeout:15000});
  await page.waitForFunction(()=>typeof runAcademyObitoFinal331Diagnostics==="function"&&typeof runStorySceneBoard33900Diagnostics==="function",null,{timeout:12000});
  return{context,page,gate};
}
async function state(page){
  return page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime(),beat=getCurrentStorySceneBeat(),layer=document.getElementById("story-scene-presentation-layer");
    const stage=layer?.querySelector(".sc-chronicle-stage")||layer?.querySelector(".sc-story-stage");
    const visible=n=>!!n&&n.getClientRects().length>0&&getComputedStyle(n).display!=="none"&&getComputedStyle(n).visibility!=="hidden";
    const panel=layer?.querySelector(".sc-story-panel"),actor=layer?.querySelector(".sc-scene-board-33900__actor");
    const pr=panel?.getBoundingClientRect(),ar=actor?.getBoundingClientRect();
    const overlap=pr&&ar?Math.max(0,Math.min(pr.right,ar.right)-Math.max(pr.left,ar.left))*Math.max(0,Math.min(pr.bottom,ar.bottom)-Math.max(pr.top,ar.top)):0;
    return{
      beatId:rt?.beatId||null,mode:beat?.mode||null,text:layer?.querySelector(".sc-story-text")?.textContent?.trim()||"",
      backdrop:stage?.style.getPropertyValue("--sc-scene-board-backdrop")||"",dedicated:stage?.dataset.scSceneBoardBackdrop||null,
      actors:[...(layer?.querySelectorAll(".sc-scene-board-33900__actor")||[])].map(n=>({id:n.dataset.actorId,img:n.querySelector("img")?.getAttribute("src")||""})),
      objective:layer?.querySelector(".sc-scene-board-33900__objective")?.textContent?.replace(/\s+/g," ").trim()||"",
      choices:[...(layer?.querySelectorAll(".sc-story-choice")||[])].filter(visible).map(n=>({label:n.textContent.trim(),icon:n.getAttribute("data-intent-icon")||""})),
      panelRadius:panel?parseFloat(getComputedStyle(panel).borderRadius):0,
      panelActorOverlapArea:overlap,
      storyLayerBackground:layer?getComputedStyle(layer).backgroundColor:"",
      storyLayerCoversViewport:!!layer&&(()=>{const r=layer.getBoundingClientRect();return r.left<=0&&r.top<=0&&r.right>=innerWidth&&r.bottom>=innerHeight;})()
    };
  });
}
async function waitBeat(page,id){await page.waitForFunction(({scene,id})=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId===id,{scene:SCENE_ID,id},{timeout:12000});}
async function advance(page){
  const before=await state(page);
  assert.notStrictEqual(before.mode,"choice","advance attempted on choice "+before.beatId);
  let button=page.locator("#story-scene-presentation-layer .sc-chronicle-primary").first();
  if(await button.count()===0)button=page.locator("#story-scene-presentation-layer .sc-story-actions > .sc-story-action:not(.sc-story-choice)").first();
  await button.waitFor({state:"visible",timeout:8000});await button.click();
  await page.waitForFunction(old=>{
    const layer=document.getElementById("story-scene-presentation-layer");
    return getActiveStorySceneRuntime()?.beatId!==old.beat||layer?.querySelector(".sc-story-text")?.textContent?.trim()!==old.text;
  },{beat:before.beatId,text:before.text},{timeout:8000});
}
async function toBeat(page,target,max=220){
  for(let i=0;i<max;i++){const s=await state(page);if(s.beatId===target)return s;if(s.mode==="choice")throw new Error("unexpected choice "+s.beatId+" before "+target);await advance(page);}
  throw new Error("guard exceeded "+target);
}
async function choose(page,label,next){
  const s=await state(page);assert.strictEqual(s.mode,"choice","expected choice @ "+s.beatId);
  const hit=s.choices.filter(x=>x.label===label);assert.strictEqual(hit.length,1,"missing choice "+label+" @ "+s.beatId+" "+JSON.stringify(s.choices));
  assert(hit[0].icon,"choice icon missing "+label);
  await page.locator("#story-scene-presentation-layer").click({position:{x:80,y:80}});
  await page.waitForTimeout(80);
  assert.strictEqual((await state(page)).beatId,s.beatId,"click-anywhere activated a choice");
  await page.getByRole("button",{name:label,exact:true}).click();
  if(next)await waitBeat(page,next);
}
async function assertBackdrop(page,beat,pathExpected){
  const s=await state(page);assert.strictEqual(s.beatId,beat);assert.strictEqual(s.dedicated,"dedicated",beat+" dedicated backdrop flag");
  assert(s.backdrop.includes(pathExpected),beat+" backdrop mismatch "+s.backdrop);
}
async function screenshot(page,label){await page.locator("#story-scene-presentation-layer").screenshot({path:path.join(OUT,label+".png"),timeout:12000});}

async function runRoute(browser,{label,helpSet,expectedDelay,expectedEntitlement}){
  const {context,page,gate}=await boot(browser,label);
  try{
    let s=await state(page);
    assert.strictEqual(s.beatId,"obi_depart");assert(s.text.includes("The first thing Obito notices is the time."));
    assert.strictEqual(s.storyLayerCoversViewport,true,label+" Story layer does not own full viewport");
    assert(!["transparent","rgba(0, 0, 0, 0)"].includes(s.storyLayerBackground),label+" Story layer exposes World Map through transparent letterbox");
    assert(s.actors.some(a=>a.id==="academy_obito"&&/academy_obito\.png/.test(a.img)),label+" Obito card missing");
    assert(/GET TO TRAINING/.test(s.objective),label+" objective missing");
    assert(s.panelRadius>=10,label+" narration panel is not benchmark-rounded");
    assert.strictEqual(s.panelActorOverlapArea,0,label+" opening panel overlaps Obito card");
    await assertBackdrop(page,"obi_depart",EXPECTED_BACKDROP.obi_depart);
    const firstText=s.text;
    await page.locator("#story-scene-presentation-layer").click({position:{x:100,y:100}});
    await page.waitForFunction(old=>document.querySelector("#story-scene-presentation-layer .sc-story-text")?.textContent?.trim()!==old,firstText,{timeout:5000});
    assert.strictEqual((await state(page)).beatId,"obi_depart",label+" click-anywhere skipped semantic beat");

    for(let i=0;i<CHOICES.length;i++){
      const [beat,help,keep]=CHOICES[i];await toBeat(page,beat);
      if(EXPECTED_BACKDROP[beat])await assertBackdrop(page,beat,EXPECTED_BACKDROP[beat]);
      s=await state(page);assert.strictEqual(s.choices.length,2,beat+" binary choice cardinality");
      assert(s.choices.every(x=>x.icon),beat+" intent icon missing");
      if(beat==="obi_furniture_choice"){assert.strictEqual(s.actors.length,2,label+" furniture two-actor board missing");await screenshot(page,label+"-furniture");}
      const selected=helpSet.has(i)?help:keep;
      const next=["obi_furniture_help","obi_vegetables_help","obi_equipment_help","obi_delivery_help","obi_cart_help"][i];
      const nextKeep=["obi_furniture_continue","obi_vegetables_continue","obi_equipment_continue","obi_delivery_continue","obi_cart_continue"][i];
      await choose(page,selected,helpSet.has(i)?next:nextKeep);
    }

    await toBeat(page,"obi_arrival");await assertBackdrop(page,"obi_arrival",EXPECTED_BACKDROP.obi_arrival);
    const entitlement=await page.evaluate(()=>getAcademyObitoFinalEntitlement331());
    assert.strictEqual(entitlement,expectedEntitlement,label+" entitlement changed");
    const history=await page.evaluate(()=>playerData.activityHistory.filter(r=>r&&/^occ_origin_obito_/.test(r.occurrenceId||"")).map(r=>({id:r.occurrenceId,fact:r.fact})));
    const diversionRows=history.filter(r=>/furniture|vegetables|equipment|delivery|cart/.test(r.id));
    assert.strictEqual(diversionRows.length,5,label+" diversion occurrence cardinality");
    assert.strictEqual(diversionRows.reduce((sum,r)=>sum+Number(r.fact?.journeyDelayMinutes||0),0),expectedDelay,label+" journey delay changed");

    await toBeat(page,"obi_end_day");
    let end=await state(page);assert(end.backdrop.includes("training_grounds_late_afternoon.png"),label+" end-day should begin in training yard");
    await advance(page);end=await state(page);
    if(end.beatId==="obi_end_day"&&end.backdrop.includes("training_grounds_late_afternoon.png"))await advance(page);
    end=await state(page);assert.strictEqual(end.beatId,"obi_end_day");assert(end.backdrop.includes("konoha_street_late_afternoon.png"),label+" end-day did not move to street");

    await toBeat(page,"obi_home");await assertBackdrop(page,"obi_home",EXPECTED_BACKDROP.obi_home);
    await toBeat(page,"obi_reflect");s=await state(page);
    assert.deepStrictEqual(s.choices.map(x=>x.label),["I'm not going to stop helping people.","I need to take training more seriously.","I need to get better at both.","Maybe I'm looking at this wrong. I need to figure out what matters most to me."]);
    assert(s.choices.every(x=>x.icon),label+" reflection choice icon missing");
    await screenshot(page,label+"-reflection");
    await choose(page,"I need to get better at both.","obi_ending_balance");
    await toBeat(page,"obi_close");await assertBackdrop(page,"obi_close",EXPECTED_BACKDROP.obi_home);
    await advance(page);
    await page.waitForFunction(()=>ensurePlayerAcquisitionState().chronicleOrigin?.prologueCompleted===true,null,{timeout:12000});
    const completion=await page.evaluate(()=>({
      active:getActiveStorySceneRuntime(),complete:ensurePlayerAcquisitionState().chronicleOrigin?.prologueCompleted===true,
      obito:runAcademyObitoFinal331Diagnostics(),board:runStorySceneBoard33900Diagnostics()
    }));
    assert.strictEqual(completion.active,null,label+" Story runtime remained active");
    assert.strictEqual(completion.complete,true,label+" Origin did not complete");
    assert.strictEqual(completion.obito.pass,true,JSON.stringify(completion.obito));
    assert.strictEqual(completion.board.pass,true,JSON.stringify(completion.board));
    const errors=await gate.assertClean(label);
    return{label,expectedDelay,expectedEntitlement,errors};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  try{
    const results=[];
    results.push(await runRoute(browser,{label:"zero-help",helpSet:new Set(),expectedDelay:0,expectedEntitlement:"FULL"}));
    results.push(await runRoute(browser,{label:"mixed-help",helpSet:new Set([0,2]),expectedDelay:15,expectedEntitlement:"REDUCED"}));
    results.push(await runRoute(browser,{label:"five-help",helpSet:new Set([0,1,2,3,4]),expectedDelay:35,expectedEntitlement:"MINIMAL"}));
    const summary={pass:true,kind:"obito_story_presentation_installed_browser",routes:results.map(r=>({label:r.label,delay:r.expectedDelay,entitlement:r.expectedEntitlement})),browserGoldenClaimed:false};
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n");
    console.log(JSON.stringify(summary,null,2));
  }finally{await browser.close();}
})().catch(err=>{console.error(err&&err.stack||err);process.exitCode=1;});
