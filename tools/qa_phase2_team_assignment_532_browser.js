#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.PHASE2_532_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.PHASE2_532_OUT||"artifacts/phase2-team-assignment-532";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    typeof globalThis.commitClanTeamAssignment==="function"&&
    typeof globalThis.saveMyClanStagedFormation==="function"&&
    typeof globalThis.getChronicleCurrentTeam43600==="function"&&
    typeof globalThis.commitPhase2CharacterCardShopPurchase52400==="function"&&
    typeof globalThis.getPhase2LiveHudSnapshot49900==="function"
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
async function protectedSnapshot(page){
  return page.evaluate(()=>{
    const clone=v=>JSON.parse(JSON.stringify(v==null?null:v));
    const origin=playerData.acquisition&&playerData.acquisition.chronicleOriginOwnedCharacterId;
    const runtime=getRuntimeCharacterByRegistryId("academy_menma");
    return{
      originIdentity:clone(getChronicleIdentity43600()),
      originRank:getOwnedCharacterFormalRank(origin),
      surfaceRank:getAlphaSurfaceTruthRankLabel(),
      ownership:[...(playerData.characterOwnership&&playerData.characterOwnership.ownedRegistryIds||[])].sort(),
      originStats:clone(runtime&&runtime.stats),
      originBasePL:runtime&&runtime.basePL,
      originPermanentPL:runtime&&runtime.permanentPLBonus,
      skills:clone(playerData.skills||null),
      progression:clone(playerData.progression||null),
      storyParticipants:clone(globalThis.activeStorySceneRuntime&&activeStorySceneRuntime.participants||null),
      battleActive:!!(globalThis.currentBattle&&currentBattle.active),
      battleDeployment:clone(globalThis.currentBattle&&currentBattle.deployment||null),
      genin:clone(playerData.acquisition&&playerData.acquisition.geninRosterTransition||null)
    };
  });
}
(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
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
      const selected=selectChronicleOrigin("academy_menma","qa532_origin");
      const completed=completeChronicleOriginPrologue("academy_menma",["qa532_origin_complete"]);
      const one=selectAcademyTeamFormationTeammate(1,"academy_hinata");
      const two=selectAcademyTeamFormationTeammate(2,"academy_kakashi");
      const formed=confirmAcademyTeamFormation("qa532_team",["academy_hinata","academy_kakashi"]);
      const beforeContinue=getChronicleCurrentTeam43600();
      const illegalEarly=commitClanTeamAssignment(
        ["academy_hinata","academy_kakashi",null,null,null,null],
        {source:"qa532_early_omit",sourceEventId:"qa532_early_omit"}
      );
      const continued=continueAcademyTeamFormationJourney();
      return{selected,completed,one,two,formed,beforeContinue,illegalEarly,continued};
    });
    assert.strictEqual(setup.selected.success,true);
    assert.strictEqual(setup.completed.success,true);
    assert.strictEqual(setup.formed.success,true);
    assert.deepStrictEqual(setup.beforeContinue.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);
    assert.strictEqual(setup.illegalEarly.success,false);
    assert.strictEqual(setup.illegalEarly.reason,"chronicle_protagonist_required_until_opening_restriction_complete");
    assert.strictEqual(setup.continued.success,true);

    const beforePurchaseTeam=await page.evaluate(()=>JSON.stringify(getChronicleCurrentTeam43600()));
    const purchase=await page.evaluate(()=>commitPhase2CharacterCardShopPurchase52400("academy_izuno","qa532:purchase"));
    assert.strictEqual(purchase.success,true,JSON.stringify(purchase));
    const afterPurchase=await page.evaluate(()=>({
      team:JSON.stringify(getChronicleCurrentTeam43600()),
      owned:isCharacterRegistryOwned("academy_izuno"),
      assignment:playerData.clan.currentTeamAssignment,
      personName:getProductionRuntimePersonName("academy_menma"),
      cardTitle:getProductionRuntimeDisplayName("academy_menma")
    }));
    assert.strictEqual(afterPurchase.owned,true);
    assert.strictEqual(afterPurchase.team,beforePurchaseTeam,"purchase assigned Character implicitly");
    assert.strictEqual(afterPurchase.personName,"Menma");
    assert.strictEqual(afterPurchase.cardTitle,"Academy Menma");

    const protectedBefore=await protectedSnapshot(page);
    await page.evaluate(()=>openOverlay("clan"));
    await page.waitForFunction(()=>currentOverlayType==="clan",null,{timeout:10000});
    await page.evaluate(()=>setClanFilter("all"));
    const izunoCard=page.locator('.my-clan-card-hitbox[aria-label="Inspect Izuno"]');
    assert.strictEqual(await izunoCard.count(),1,"newly owned Izuno not visible as person-facing My Clan entry");
    await izunoCard.hover();
    const hoverTeam=await page.evaluate(()=>JSON.stringify(getChronicleCurrentTeam43600()));
    assert.strictEqual(hoverTeam,beforePurchaseTeam,"hover mutated currentTeam");
    await izunoCard.click();
    const inspectTeam=await page.evaluate(()=>JSON.stringify(getChronicleCurrentTeam43600()));
    assert.strictEqual(inspectTeam,beforePurchaseTeam,"inspection mutated currentTeam");
    await page.screenshot({path:path.join(OUT,"01-owned-unassigned-my-clan.png"),fullPage:true});

    const staged=await page.evaluate(()=>{
      openMyClanBrowseView();
      const result=stageMyClanCharacterToSlot(1,"academy_izuno");
      return{
        result,
        committed:getChronicleCurrentTeam43600(),
        staged:[...CLAN_UI_STATE.stagedTeamSlots],
        dirty:CLAN_UI_STATE.formationDirty
      };
    });
    assert.strictEqual(staged.result.success,true,JSON.stringify(staged));
    assert.deepStrictEqual(staged.committed.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"],"staging committed before Save Formation");
    assert.strictEqual(staged.staged[0],"academy_izuno");
    assert.strictEqual(staged.dirty,true);

    const cancelled=await page.evaluate(()=>{
      resetMyClanStagedFormation();
      return{
        committed:getChronicleCurrentTeam43600(),
        staged:[...CLAN_UI_STATE.stagedTeamSlots],
        dirty:CLAN_UI_STATE.formationDirty
      };
    });
    assert.deepStrictEqual(cancelled.committed.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"],"cancel/reset mutated currentTeam");
    assert.strictEqual(cancelled.dirty,false);

    const duplicate=await page.evaluate(()=>commitClanTeamAssignment(
      ["academy_izuno","academy_izuno","academy_kakashi",null,null,null],
      {source:"qa532_duplicate",sourceEventId:"qa532_duplicate"}
    ));
    assert.strictEqual(duplicate.success,false);
    assert.strictEqual(duplicate.reason,"duplicate_exact_owned_lineage_assignment");

    const committed=await page.evaluate(()=>{
      stageMyClanCharacterToSlot(1,"academy_izuno");
      const saved=saveMyClanStagedFormation();
      return{
        saved,
        team:getChronicleCurrentTeam43600(),
        assignment:playerData.clan.currentTeamAssignment,
        origin:getChronicleIdentity43600(),
        rank:getAlphaSurfaceTruthRankLabel()
      };
    });
    assert.strictEqual(committed.saved.success,true,JSON.stringify(committed.saved));
    assert.strictEqual(committed.saved.committed,true);
    assert.deepStrictEqual(committed.team.teamVariantIds,["academy_izuno","academy_hinata","academy_kakashi"]);
    assert.deepStrictEqual(committed.team.teamLineageIds,[
      "owned_character_academy_izuno",
      "owned_character_academy_hinata",
      "owned_character_academy_kakashi"
    ]);
    assert.strictEqual(committed.team.originVariantId,"academy_menma");
    assert.strictEqual(committed.team.protagonistLineageId,"owned_character_academy_menma");
    assert.strictEqual(committed.team.protagonistPresent,false);
    assert.strictEqual(committed.origin.variantId,"academy_menma");
    assert.strictEqual(committed.rank,"ACADEMY");
    assert.strictEqual(committed.assignment.source,"my_clan_save_formation");
    assert.deepStrictEqual(committed.assignment.teamVariantIds.slice(0,3),["academy_izuno","academy_hinata","academy_kakashi"]);

    const protectedAfter=await protectedSnapshot(page);
    assert.deepStrictEqual(protectedAfter,protectedBefore,"team assignment mutated protected non-assignment domains");

    await page.evaluate(()=>{
      try{forceCloseMyClanOverlay();}catch(_error){try{closeOverlay();}catch(_error2){}}
      openOverlay("village");
      refreshPhase2LiveHud49900();
    });
    await page.waitForFunction(()=>getPhase2LiveHudSnapshot49900().surface.kind==="village",null,{timeout:10000});
    const hud=await page.evaluate(()=>getPhase2LiveHudSnapshot49900());
    assert.deepStrictEqual(hud.team.map(row=>row.id),["academy_izuno","academy_hinata","academy_kakashi"]);
    assert.strictEqual(hud.identity.variantId,"academy_menma");
    assert.strictEqual(hud.identity.name,"Menma");
    assert.strictEqual(hud.identity.rank,"ACADEMY");
    await page.screenshot({path:path.join(OUT,"02-hud-current-team-without-protagonist.png"),fullPage:true});

    const persistedBefore=await page.evaluate(()=>({
      assignmentId:getChronicleCurrentTeam43600().assignmentId,
      lineages:[...getChronicleCurrentTeam43600().teamLineageIds],
      variants:[...getChronicleCurrentTeam43600().teamVariantIds],
      origin:getChronicleIdentity43600(),
      rank:getAlphaSurfaceTruthRankLabel()
    }));
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await release(page);
    const persistedAfter=await page.evaluate(()=>({
      assignmentId:getChronicleCurrentTeam43600().assignmentId,
      lineages:[...getChronicleCurrentTeam43600().teamLineageIds],
      variants:[...getChronicleCurrentTeam43600().teamVariantIds],
      origin:getChronicleIdentity43600(),
      rank:getAlphaSurfaceTruthRankLabel()
    }));
    assert.deepStrictEqual(persistedAfter,persistedBefore,"save/load changed exact assigned lineage order or protagonist identity/Rank");

    const gateEvidence=await gate.assertClean("phase2-team-assignment-532");
    assert.strictEqual(gateEvidence.unexpectedCount,0);

    console.log(JSON.stringify({
      pass:true,
      issue:532,
      purchasedCharacterInitiallyUnassigned:true,
      deliberateSaveFormationCommit:true,
      stagingHoverInspectionReadOnly:true,
      openingRestrictionPreserved:true,
      protagonistMayBeAbsentAfterOpening:true,
      protagonistIdentityAndRankIndependent:true,
      duplicateExactOwnedLineageRejected:true,
      exactLineageOrderingReloadStable:true,
      ownershipStatsPlSkillsStoryBattleFirewalled:true,
      hudConsumesCurrentAssignment:true,
      personNameSeparatedFromCardTitle:true,
      browserRuntimeErrorGateBeforeTeardown:true,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
