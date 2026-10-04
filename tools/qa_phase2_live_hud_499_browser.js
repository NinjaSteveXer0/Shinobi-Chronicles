#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.PHASE2_499_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.PHASE2_499_OUT||"artifacts/phase2-live-hud-499";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_PHASE2_LIVE_HUD_49900&&
    typeof globalThis.getPhase2LiveHudSnapshot49900==="function"&&
    typeof globalThis.refreshPhase2LiveHud49900==="function"
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
async function openVillage(page){
  await page.evaluate(()=>openOverlay("village"));
  await page.waitForFunction(()=>getPhase2LiveHudSnapshot49900().visible===true&&getPhase2LiveHudSnapshot49900().surface.kind==="village",null,{timeout:10000});
  await page.waitForSelector("#sc-phase2-live-hud-49900:not([hidden])",{state:"visible",timeout:10000});
}
async function closeAndVillage(page){
  await page.evaluate(()=>{try{closeOverlay();}catch(_error){}});
  await page.waitForTimeout(80);
  await openVillage(page);
}
async function clickTool(page,action){
  await page.evaluate(action=>{
    const details=document.querySelector(".sc-hud499-tools");
    if(!details)throw new Error("Player Tools unavailable");
    details.open=true;
    const button=details.querySelector('[data-hud499-action="'+action+'"]');
    if(!button)throw new Error("Player Tool unavailable: "+action);
    button.click();
  },action);
}
async function captureHudLayout(page){
  return page.evaluate(()=>{
    const root=document.getElementById("sc-phase2-live-hud-49900");
    const rectNode=node=>{
      if(!node)return null;
      const r=node.getBoundingClientRect();
      return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};
    };
    const rect=selector=>rectNode(root&&root.querySelector(selector));
    const surface=root&&root.dataset.surface||null;
    const mapSelector=surface==="region"?".region-map-pane":surface==="village"?".village-map-screen":surface==="world"?".world-map-canvas":null;
    return{
      viewport:[innerWidth,innerHeight],
      surface,
      state:rect(".sc-hud499-state-cluster"),
      team:rect(".sc-hud499-team"),
      tools:rect(".sc-hud499-tools"),
      compass:rect(".sc-hud499-map-nav"),
      brand:rect(".sc-hud499-brand"),
      map:rectNode(mapSelector?document.querySelector(mapSelector):null)
    };
  });
}
function documentBodyLiteralNewline(text){return String(text||"").includes("\\n");}
function assertHudLayout(layout,label){
  const vw=layout.viewport[0],vh=layout.viewport[1];
  for(const key of ["state","team","tools","compass"]){
    const box=layout[key];
    assert(box,label+": missing "+key+" dock");
    assert(box.left>=-1&&box.top>=-1&&box.right<=vw+1&&box.bottom<=vh+1,label+": "+key+" clips viewport: "+JSON.stringify(layout));
  }
  assert(layout.state.height<=118,label+": unified player-state cluster is too tall: "+JSON.stringify(layout.state));
  assert(layout.team.width<=96,label+": Current Team rail exceeds compact width: "+JSON.stringify(layout.team));
  assert(layout.compass.bottom<=vh-48,label+": Chronicle Compass violates bottom safe reserve: "+JSON.stringify(layout.compass));
}
function assertMapGutterIntegration(layout,label){
  assert(["region","village"].includes(layout.surface),label+": wrong surface for gutter proof: "+JSON.stringify(layout));
  assert(layout.map&&layout.map.width>0&&layout.map.height>0,label+": map frame missing");
  const teamGap=layout.map.left-layout.team.right;
  const toolsGap=layout.tools.left-layout.map.right;
  const compassGap=layout.compass.left-layout.map.right;
  assert(teamGap>=-18&&teamGap<=24,label+": Current Team is detached from left map frame: "+JSON.stringify({teamGap,layout}));
  assert(toolsGap>=-30&&toolsGap<=24,label+": Player Tools is detached from right map frame: "+JSON.stringify({toolsGap,layout}));
  assert(compassGap>=-30&&compassGap<=24,label+": Chronicle Compass is detached from right map frame: "+JSON.stringify({compassGap,layout}));
  assert(Math.abs(layout.tools.left-layout.compass.left)<=2,label+": right-gutter widgets do not share an anchor: "+JSON.stringify(layout));
  assert(Math.abs(layout.tools.width-layout.compass.width)<=2,label+": right-gutter widgets do not share a width: "+JSON.stringify(layout));
  assert(layout.map.width>=layout.viewport[0]*0.60,label+": map lost dominance while reserving HUD gutters: "+JSON.stringify(layout));
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

    const setup=await page.evaluate(()=>{
      localStorage.clear();
      playerData=createDefaultPlayerData();
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      savePlayerData();

      const selected=selectChronicleOrigin("academy_menma","qa499_origin");
      const runIdentity=commitChronicleRunIdentity43600({
        runId:"sc_run_v1_qa499_00000000-0000-4000-8000-000000000499",
        creationKind:"NEW_START"
      });
      const completed=completeChronicleOriginPrologue("academy_menma",["qa499_complete"]);
      const formation=getAcademyTeamFormationSnapshot();
      const desired=["academy_kakashi","academy_mirai"];
      if(!desired.every(id=>formation.eligibleCandidateVariantIds.includes(id))){
        return{error:"expected_candidates_missing",eligible:formation.eligibleCandidateVariantIds};
      }
      const one=selectAcademyTeamFormationTeammate(1,desired[0]);
      const two=selectAcademyTeamFormationTeammate(2,desired[1]);
      const formed=confirmAcademyTeamFormation("qa499_team",desired);
      const continued=continueAcademyTeamFormationJourney();
      updateChronicleTutorialProgress43600({
        sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore",
        trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,
        arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true
      },{save:true});
      playerData.ryo=321;
      savePlayerData();
      return{
        selected,runIdentity,completed,one,two,formed,continued,
        team:getChronicleCurrentTeam43600(),
        historyCount:Array.isArray(playerData.activityHistory)?playerData.activityHistory.length:0
      };
    });
    assert(!setup.error,JSON.stringify(setup));
    assert.strictEqual(setup.selected.success,true);
    assert.strictEqual(setup.runIdentity.success,true);
    assert.strictEqual(setup.completed.success,true);
    assert.strictEqual(setup.formed.success,true);
    assert.strictEqual(setup.continued.success,true);
    assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_kakashi","academy_mirai"]);

    await openVillage(page);

    const initial=await page.evaluate(()=>{
      const snap=getPhase2LiveHudSnapshot49900();
      const root=document.getElementById("sc-phase2-live-hud-49900");
      const subject=getAlphaSurfaceTruthSubjectId();
      const chronicleIdentity=getChronicleIdentity43600();
      const presentationVariant=chronicleIdentity&&String(chronicleIdentity.ownedCharacterId||"")===String(subject)&&chronicleIdentity.variantId
        ?String(chronicleIdentity.variantId)
        :String(subject);
      const character=getPlayerCharacter(subject)||getPlayerCharacter(presentationVariant);
      const scalar=value=>{
        if(value==null)return null;
        if(typeof value==="string"||typeof value==="number")return String(value);
        for(const key of ["label","name","displayName","title","value"]){
          if(value&&value[key]!=null&&String(value[key]).trim())return String(value[key]);
        }
        return null;
      };
      return{
        snap,
        canonicalIdentity:{
          id:String(subject),
          variantId:presentationVariant,
          name:(()=>{
            const registry=(typeof globalThis.getCharacterRegistryEntry==="function"?globalThis.getCharacterRegistryEntry(presentationVariant):null)
              ||(typeof globalThis.getRegistryCharacter==="function"?globalThis.getRegistryCharacter(presentationVariant):null);
            return scalar(character&& (character.name||character.displayName||character.playerFacingName))
              ||scalar(registry&&registry.displayName)
              ||scalar(registry&&registry.name);
          })(),
          rank:scalar(getAlphaSurfaceTruthRankLabel(subject)),
          affiliation:scalar(getMyClanCharacterAffiliation(character))
        },
        text:root?.innerText||"",
        legacyHeaderDisplay:getComputedStyle(document.querySelector(".game-header")).display,
        legacySidebarDisplay:getComputedStyle(document.querySelector(".map-sidebar-left")).display,
        identityImage:root?.querySelector(".sc-hud499-identity img")?.getAttribute("src")||null,
        teamIds:[...(root?.querySelectorAll("[data-team-variant-id]")||[])].map(node=>node.dataset.teamVariantId),
        teamImageCount:root?.querySelectorAll(".sc-hud499-team-member img").length||0,
        rootPointerEvents:getComputedStyle(root).pointerEvents,
        focusable:[...(root?.querySelectorAll("button,summary")||[])].every(node=>!node.disabled&&node.tabIndex>=0),
        brandImage:root?.querySelector(".sc-hud499-brand img")?.getAttribute("src")||null
      };
    });
    assert.strictEqual(initial.snap.visible,true);
    assert.strictEqual(initial.snap.surface.kind,"village");
    assert.strictEqual(initial.snap.identity.id,initial.canonicalIdentity.id,"HUD identity does not match canonical active subject");
    assert.strictEqual(initial.snap.identity.variantId,initial.canonicalIdentity.variantId,"HUD presentation Variant does not match canonical Chronicle representation");
    assert.strictEqual(initial.snap.identity.name,initial.canonicalIdentity.name,"HUD player-facing name does not match canonical character projection");
    assert.strictEqual(initial.snap.identity.rank,initial.canonicalIdentity.rank,"HUD formal Rank does not match canonical Rank projection");
    assert.strictEqual(initial.snap.identity.affiliation,initial.canonicalIdentity.affiliation,"HUD affiliation does not match canonical affiliation projection");
    assert.strictEqual(initial.snap.ryo,321);
    assert.deepStrictEqual(initial.snap.team.map(row=>row.id),setup.team.teamVariantIds);
    assert(initial.snap.journey&&initial.snap.journey.label,"observer-safe Journey projection missing");
    assert.strictEqual(initial.snap.energy,null);
    assert(!/ENERGY/i.test(initial.text),"fake Energy leaked into HUD");
    assert.strictEqual(initial.legacyHeaderDisplay,"none","legacy header still competes with approved HUD");
    assert.strictEqual(initial.legacySidebarDisplay,"none","legacy sidebar still consumes map field");
    assert(initial.identityImage,"Identity Dock did not use approved portrait authority");
    assert.deepStrictEqual(initial.teamIds,setup.team.teamVariantIds);
    assert.strictEqual(initial.teamImageCount,3,"Current Team dock is missing approved portraits");
    assert.strictEqual(initial.rootPointerEvents,"none","transparent HUD root blocks map interaction");
    assert.strictEqual(initial.focusable,true,"HUD controls are not keyboard focusable");
    assert.strictEqual(initial.brandImage,null,"World-only masterbrand leaked onto Village surface");
    assert(!documentBodyLiteralNewline(await page.evaluate(()=>document.body.innerText||"")),"literal escaped newline leaked into rendered HUD page");

    const clickability=await page.evaluate(()=>{
      const buttons=[...document.querySelectorAll('button[data-village-hotspot-id]')].filter(node=>{
        const r=node.getBoundingClientRect();return r.width>0&&r.height>0;
      });
      for(const button of buttons){
        const r=button.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
        const hit=document.elementFromPoint(x,y);
        if(hit&&(hit===button||hit.closest('button[data-village-hotspot-id]')===button)){
          return{ok:true,id:button.dataset.villageHotspotId,x,y};
        }
      }
      return{ok:false,count:buttons.length};
    });
    assert.strictEqual(clickability.ok,true,"HUD blocks every visible Konoha hotspot: "+JSON.stringify(clickability));
    await page.screenshot({path:path.join(OUT,"01-village-live-hud.png"),fullPage:true});

    // Team access is navigation only.
    const teamBefore=await page.evaluate(()=>JSON.stringify(getChronicleCurrentTeam43600()));
    await page.click(".sc-hud499-team");
    await page.waitForFunction(()=>typeof currentOverlayType!=="undefined"&&currentOverlayType==="clan",null,{timeout:10000});
    const teamAfter=await page.evaluate(()=>JSON.stringify(getChronicleCurrentTeam43600()));
    assert.strictEqual(teamAfter,teamBefore,"Team HUD access mutated committed currentTeam");
    assert.strictEqual((await page.evaluate(()=>getPhase2LiveHudSnapshot49900().visible)),false,"HUD did not suppress on My Clan");
    await closeAndVillage(page);

    await clickTool(page,"inventory");
    await page.waitForSelector(".sc-inventory-core",{state:"visible",timeout:10000});
    assert.strictEqual(await page.evaluate(()=>getPhase2LiveHudSnapshot49900().visible),false,"HUD did not suppress on Inventory");
    await closeAndVillage(page);

    await clickTool(page,"record");
    await page.waitForFunction(()=>{
      const overlay=document.getElementById("screen-overlay");
      return overlay&&getComputedStyle(overlay).display!=="none"&&/SHINOBI RECORD/i.test(overlay.innerText||"");
    },null,{timeout:10000});
    assert.strictEqual(await page.evaluate(()=>getPhase2LiveHudSnapshot49900().visible),false,"HUD did not suppress on Shinobi Record");
    await closeAndVillage(page);

    await clickTool(page,"journey");
    await page.waitForSelector(".alpha328-journey",{state:"visible",timeout:10000});
    assert.strictEqual(await page.evaluate(()=>getPhase2LiveHudSnapshot49900().visible),false,"HUD did not suppress on Journey detail");
    await closeAndVillage(page);

    // Existing legal map navigation only.
    const villageNav=await page.evaluate(()=>getPhase2LiveHudSnapshot49900().navigation.map(row=>row.id));
    assert(villageNav.includes("world"),"Village HUD lacks existing World-map return");
    if(villageNav.includes("region")){
      await page.click('[data-hud499-action="region"]');
      await page.waitForFunction(()=>getPhase2LiveHudSnapshot49900().visible===true&&getPhase2LiveHudSnapshot49900().surface.kind==="region",null,{timeout:10000});
      assert.strictEqual(await page.evaluate(()=>getPhase2LiveHudSnapshot49900().surface.kind),"region");
      await page.click('[data-hud499-action="world"]');
      await page.waitForFunction(()=>getPhase2LiveHudSnapshot49900().visible===true&&getPhase2LiveHudSnapshot49900().surface.kind==="world",null,{timeout:10000});
    }else{
      await page.click('[data-hud499-action="world"]');
      await page.waitForFunction(()=>getPhase2LiveHudSnapshot49900().surface.kind==="world",null,{timeout:10000});
    }
    const worldDominance=await page.evaluate(()=>{
      const canvas=document.querySelector(".world-map-canvas");
      const display=document.querySelector(".world-map-display");
      const viewport=document.querySelector(".world-map-viewport");
      const cr=canvas&&canvas.getBoundingClientRect();
      const dr=display&&display.getBoundingClientRect();
      const vr=viewport&&viewport.getBoundingClientRect();
      return{
        viewport:[innerWidth,innerHeight],
        canvas:cr?{left:cr.left,top:cr.top,width:cr.width,height:cr.height,right:cr.right,bottom:cr.bottom}:null,
        display:dr?{left:dr.left,top:dr.top,width:dr.width,height:dr.height,right:dr.right,bottom:dr.bottom}:null,
        mapViewport:vr?{left:vr.left,top:vr.top,width:vr.width,height:vr.height,right:vr.right,bottom:vr.bottom}:null
      };
    });
    assert(worldDominance.canvas&&worldDominance.display&&worldDominance.mapViewport,"World Map geometry missing");
    assert(worldDominance.canvas.width>=worldDominance.viewport[0]*0.65,"World Map no longer visually dominates viewport: "+JSON.stringify(worldDominance));
    assert(worldDominance.canvas.height>=worldDominance.viewport[1]*0.50,"World Map height collapsed under HUD: "+JSON.stringify(worldDominance));
    assert(worldDominance.display.width>=worldDominance.viewport[0]*0.90,"World Map display remains trapped in retired sidebar track: "+JSON.stringify(worldDominance));
    await page.screenshot({path:path.join(OUT,"01b-world-map-live-hud.png"),fullPage:true});
    const worldBrand=await page.evaluate(()=>{
      const img=document.querySelector(".sc-hud499-brand img");
      return img?{src:img.getAttribute("src"),complete:img.complete,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight}:null;
    });
    assert(worldBrand&&worldBrand.src==="Logo/sc_title.png","World Map did not consume exact approved brand lockup: "+JSON.stringify(worldBrand));
    assert(worldBrand.complete&&worldBrand.naturalWidth>0&&worldBrand.naturalHeight>0,"World Map brand asset failed to load: "+JSON.stringify(worldBrand));

    const worldNav=await page.evaluate(()=>getPhase2LiveHudSnapshot49900().navigation.map(row=>row.id));
    assert(worldNav.includes("village"),"World HUD lacks legal Village return");
    await page.click('[data-hud499-action="village"]');
    await page.waitForFunction(()=>getPhase2LiveHudSnapshot49900().surface.kind==="village",null,{timeout:10000});

    // HUD redraw is presentation only and responds to authoritative state change.
    const refreshEvidence=await page.evaluate(async()=>{
      const historyBefore=JSON.stringify(playerData.activityHistory||[]);
      const teamBefore=JSON.stringify(getChronicleCurrentTeam43600());
      const oldRyo=Number(playerData.ryo)||0;
      refreshPhase2LiveHud49900();refreshPhase2LiveHud49900();
      playerData.ryo=oldRyo+7;
      savePlayerData();
      await new Promise(resolve=>setTimeout(resolve,450));
      return{
        historyBefore,
        historyAfter:JSON.stringify(playerData.activityHistory||[]),
        teamBefore,
        teamAfter:JSON.stringify(getChronicleCurrentTeam43600()),
        expectedRyo:oldRyo+7,
        domRyo:Number(document.querySelector("[data-hud499-ryo]")?.textContent||NaN)
      };
    });
    assert.strictEqual(refreshEvidence.historyAfter,refreshEvidence.historyBefore,"HUD refresh created Chronicle history");
    assert.strictEqual(refreshEvidence.teamAfter,refreshEvidence.teamBefore,"HUD refresh changed currentTeam");
    assert.strictEqual(refreshEvidence.domRyo,refreshEvidence.expectedRyo,"HUD did not refresh exact committed Ryō");

    // Actual Story/Battle truth suppresses the map HUD.
    const suppression=await page.evaluate(()=>{
      const originalStory=globalThis.getActiveStorySceneRuntime;
      globalThis.getActiveStorySceneRuntime=()=>({sceneId:"qa499_story"});
      refreshPhase2LiveHud49900();
      const storyHidden=getPhase2LiveHudSnapshot49900().visible===false&&document.getElementById("sc-phase2-live-hud-49900").hidden===true;
      globalThis.getActiveStorySceneRuntime=originalStory;

      const beforeBattle={active:currentBattle.active,battleOver:currentBattle.battleOver};
      currentBattle.active=true;currentBattle.battleOver=false;
      refreshPhase2LiveHud49900();
      const battleHidden=getPhase2LiveHudSnapshot49900().visible===false&&document.getElementById("sc-phase2-live-hud-49900").hidden===true;
      currentBattle.active=beforeBattle.active;currentBattle.battleOver=beforeBattle.battleOver;
      refreshPhase2LiveHud49900();
      return{storyHidden,battleHidden};
    });
    assert.strictEqual(suppression.storyHidden,true,"HUD remained visible during Story truth");
    assert.strictEqual(suppression.battleHidden,true,"HUD remained visible during Battle truth");

    const beforeReload=await page.evaluate(()=>getPhase2LiveHudSnapshot49900());
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);
    await openVillage(page);
    const afterReload=await page.evaluate(()=>getPhase2LiveHudSnapshot49900());
    assert.strictEqual(afterReload.identity.id,beforeReload.identity.id,"reload changed HUD identity");
    assert.strictEqual(afterReload.ryo,beforeReload.ryo,"reload changed HUD Ryō");
    assert.deepStrictEqual(afterReload.team.map(row=>row.id),beforeReload.team.map(row=>row.id),"reload changed HUD currentTeam");
    assert.strictEqual(afterReload.journey?.label,beforeReload.journey?.label,"reload changed observer-safe Journey projection");
    await page.screenshot({path:path.join(OUT,"02-village-live-hud-after-reload.png"),fullPage:true});

    const village1366=await captureHudLayout(page);
    assert.deepStrictEqual(village1366.viewport,[1366,768]);
    assert.strictEqual(village1366.surface,"village");
    assertHudLayout(village1366,"1366x768 Village");
    assertMapGutterIntegration(village1366,"1366x768 Village");
    assert.strictEqual(village1366.brand,null,"World-only brand leaked onto Village at 1366x768");
    await page.screenshot({path:path.join(OUT,"03-village-1366x768-gutter-hud.png"),fullPage:true});

    await page.click('[data-hud499-action="region"]');
    await page.waitForFunction(()=>getPhase2LiveHudSnapshot49900().surface.kind==="region",null,{timeout:10000});
    await page.waitForTimeout(120);
    const region1366=await captureHudLayout(page);
    assert.deepStrictEqual(region1366.viewport,[1366,768]);
    assertHudLayout(region1366,"1366x768 Region");
    assertMapGutterIntegration(region1366,"1366x768 Region");
    assert.strictEqual(region1366.brand,null,"World-only brand leaked onto Region at 1366x768");
    await page.screenshot({path:path.join(OUT,"03b-region-1366x768-gutter-hud.png"),fullPage:true});

    await page.click('[data-hud499-action="world"]');
    await page.waitForFunction(()=>getPhase2LiveHudSnapshot49900().surface.kind==="world",null,{timeout:10000});
    await page.waitForTimeout(120);
    const world1366=await captureHudLayout(page);
    assert.deepStrictEqual(world1366.viewport,[1366,768]);
    assertHudLayout(world1366,"1366x768 World");
    assert(world1366.brand&&world1366.brand.width>150,"World Map brand missing at 1366x768");
    assert(world1366.map&&world1366.map.width>=1366*0.65,"World Map lost dominance at 1366x768");
    await page.screenshot({path:path.join(OUT,"03c-world-1366x768-approved-composition.png"),fullPage:true});

    await page.setViewportSize({width:1920,height:1080});
    await page.waitForTimeout(180);
    await page.evaluate(()=>refreshPhase2LiveHud49900());
    const world1920=await captureHudLayout(page);
    assert.deepStrictEqual(world1920.viewport,[1920,1080]);
    assertHudLayout(world1920,"1920x1080 World");
    assert(world1920.brand&&world1920.brand.width>150,"World Map brand is absent or unreadably small at 1920x1080");
    assert(world1920.map&&world1920.map.width>=1920*0.65,"World Map lost dominance at 1920x1080");
    await page.screenshot({path:path.join(OUT,"04-world-1920x1080-chronicle-compass.png"),fullPage:true});

    await page.click('[data-hud499-action="village"]');
    await page.waitForFunction(()=>getPhase2LiveHudSnapshot49900().surface.kind==="village",null,{timeout:10000});
    await page.waitForTimeout(120);
    const village1920=await captureHudLayout(page);
    assertHudLayout(village1920,"1920x1080 Village");
    assertMapGutterIntegration(village1920,"1920x1080 Village");
    assert.strictEqual(village1920.brand,null,"World-only brand leaked onto Village at 1920x1080");
    await page.screenshot({path:path.join(OUT,"04b-village-1920x1080-gutter-hud.png"),fullPage:true});

    await page.click('[data-hud499-action="region"]');
    await page.waitForFunction(()=>getPhase2LiveHudSnapshot49900().surface.kind==="region",null,{timeout:10000});
    await page.waitForTimeout(120);
    const region1920=await captureHudLayout(page);
    assertHudLayout(region1920,"1920x1080 Region");
    assertMapGutterIntegration(region1920,"1920x1080 Region");
    assert.strictEqual(region1920.brand,null,"World-only brand leaked onto Region at 1920x1080");
    await page.screenshot({path:path.join(OUT,"04c-region-1920x1080-gutter-hud.png"),fullPage:true});

    const diagnostics=await page.evaluate(()=>runPhase2LiveHud49900Diagnostics());
    assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics));
    await gate.assertClean("phase2-live-hud-499");

    console.log(JSON.stringify({
      pass:true,
      issue:499,
      exactIdentityRankVillage:true,
      exactRyo:true,
      energyAbsent:true,
      exactCurrentTeam:true,
      teamAccessReadOnly:true,
      observerSafeJourney:true,
      quickActions:true,
      contextualMapNavigation:true,
      worldMapDominant:true,
      worldBrandExact:true,
      chronicleCompass:true,
      collapsiblePlayerTools:true,
      safeBottomReserve1366:true,
      safeBottomReserve1920:true,
      regionVillageGutterIntegration1366:true,
      regionVillageGutterIntegration1920:true,
      worldCompositionPreservedBothViewports:true,
      mapClickable:true,
      deepStoryBattleSuppression:true,
      refreshReadOnly:true,
      saveReloadStable:true,
      keyboardFocusable:true,
      alphaViewportClear:true,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
