#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.PHASE2_524_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.PHASE2_524_OUT||"artifacts/phase2-character-card-shop-524";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_PHASE2_CHARACTER_CARD_SHOP_52400&&
    globalThis.SC_PHASE2_BASIC_ITEM_SHOP_51700&&
    typeof globalThis.commitPhase2CharacterCardShopPurchase52400==="function"&&
    typeof globalThis.getChronicleCurrentTeam43600==="function"
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
async function semanticSnapshot(page){
  return page.evaluate(()=>{
    const copy=v=>JSON.parse(JSON.stringify(v==null?null:v));
    const pd=copy(playerData);
    const state=pd.acquisition||{};
    const strippedAcq=copy(state);
    delete strippedAcq.records;
    delete strippedAcq.processedRecordKeys;
    delete strippedAcq.ownedCharactersByVariantId;
    const ownership=copy(pd.characterOwnership||{});
    delete ownership.ownedRegistryIds;
    return{
      ryo:pd.ryo,
      currentTeam:getChronicleCurrentTeam43600(),
      clan:pd.clan,
      geninRosterTransition:state.geninRosterTransition,
      acquisitionInvariant:strippedAcq,
      ownershipInvariant:ownership,
      activityHistory:pd.activityHistory||[],
      phase2ChronicleState:pd.phase2ChronicleState||null,
      worldEventRuntime:pd.worldEventRuntime||null,
      progression:pd.progression||null,
      relationships:pd.relationships||null,
      sharedHistory:pd.sharedHistory||null,
      skills:pd.skills||null
    };
  });
}
function invariantOnly(snapshot){
  const copy=JSON.parse(JSON.stringify(snapshot));
  delete copy.ryo;
  delete copy.activityHistory;
  return copy;
}
async function openCharacterShopViaCommercialDistrict(page){
  await page.evaluate(()=>openOverlay("village"));
  await page.waitForSelector('.village-map-screen[data-village-id="konohagakure"]',{state:"visible",timeout:10000});
  await page.waitForSelector('[data-shop517-location="KON-P09"]',{state:"visible",timeout:10000});
  await page.dblclick('[data-shop517-location="KON-P09"]');
  await page.waitForSelector(".sc-shop517",{state:"visible",timeout:10000});
  await page.waitForSelector("[data-charshop524-entry]",{state:"visible",timeout:10000});
  await page.click("[data-charshop524-entry]");
  await page.waitForSelector(".sc-charshop524",{state:"visible",timeout:10000});
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

    const init=await page.evaluate(()=>{
      localStorage.clear();
      playerData=createDefaultPlayerData();
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      savePlayerData();
      return{
        selected:selectChronicleOrigin("academy_menma","qa524_origin"),
        ryo:playerData.ryo
      };
    });
    assert.strictEqual(init.selected.success,true);
    assert.strictEqual(init.ryo,0,"fresh direct Origin selection should not synthesize the completion purse");

    // 1. Pre-Team-Formation fails closed with no mutation.
    const preBefore=await semanticSnapshot(page);
    const preAttempt=await page.evaluate(()=>commitPhase2CharacterCardShopPurchase52400("academy_izuno","qa524:preformation"));
    assert.strictEqual(preAttempt.success,false);
    assert.strictEqual(preAttempt.reason,"origin_not_complete");
    const preAfter=await semanticSnapshot(page);
    assert.deepStrictEqual(preAfter,preBefore,"pre-formation purchase attempt mutated state");

    // Complete Origin and mandatory Team Formation with Hinata + Kakashi.
    const setup=await page.evaluate(()=>{
      const completed=completeChronicleOriginPrologue("academy_menma",["qa524_origin_complete"]);
      const formationBefore=getAcademyTeamFormationSnapshot();
      const one=selectAcademyTeamFormationTeammate(1,"academy_hinata");
      const two=selectAcademyTeamFormationTeammate(2,"academy_kakashi");
      const formed=confirmAcademyTeamFormation("qa524_team",["academy_hinata","academy_kakashi"]);
      const continued=continueAcademyTeamFormationJourney();
      if(typeof updateChronicleTutorialProgress43600==="function"){
        updateChronicleTutorialProgress43600({sandboxPopupSeen:true,openingChoice:"explore",recommendedRouteEnabled:false},{save:true});
      }
      return{completed,formationBefore,one,two,formed,continued,access:getPhase2CharacterCardShopAccess52400(),team:getChronicleCurrentTeam43600()};
    });
    assert.strictEqual(setup.completed.success,true);
    assert.strictEqual(setup.one.success,true);
    assert.strictEqual(setup.two.success,true);
    assert.strictEqual(setup.formed.success,true);
    assert.strictEqual(setup.continued.success,true);
    assert.strictEqual(setup.access.available,true);
    assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);

    const beforeShop=await semanticSnapshot(page);
    assert.strictEqual(beforeShop.ryo,100);
    const geninBefore=JSON.stringify(beforeShop.geninRosterTransition);
    const teamBefore=JSON.stringify(beforeShop.currentTeam);

    // 2-3. Exact ten rows; starter three visibly OWNED/non-purchasable.
    await openCharacterShopViaCommercialDistrict(page);
    const rows=page.locator("[data-charshop524-row]");
    assert.strictEqual(await rows.count(),10);
    const rowIds=await rows.evaluateAll(nodes=>nodes.map(node=>node.getAttribute("data-charshop524-row")));
    assert.deepStrictEqual(rowIds,[
      "academy_hinata","academy_izuno","academy_kushina","academy_menma","academy_mirai",
      "academy_kurenai","academy_iwabee","academy_metal_lee","academy_kakashi","academy_obito"
    ]);
    for(const id of ["academy_menma","academy_hinata","academy_kakashi"]){
      const row=page.locator('[data-charshop524-row="'+id+'"]');
      assert((await row.innerText()).includes("OWNED"),id+" did not project OWNED");
      assert.strictEqual(await row.locator("button").isDisabled(),true,id+" remained purchasable");
    }
    await page.screenshot({path:path.join(OUT,"01-exact-catalogue-owned-starters.png"),fullPage:true});

    // 13. Once the legitimate Village/CE entry effects have settled, Shop
    // render/inspection/hover must remain read-only.
    const shopOpenBaseline=await semanticSnapshot(page);
    await page.hover('[data-charshop524-row="academy_izuno"]');
    const afterBrowse=await semanticSnapshot(page);
    assert.deepStrictEqual(afterBrowse,shopOpenBaseline,"shop render/hover mutated canonical state");

    // 4-8. Buy one ordinary unowned representation for exactly 100 Ryō.
    await page.click('[data-charshop524-buy="academy_izuno"]');
    await page.waitForFunction(()=>playerData.ryo===0&&isCharacterRegistryOwned("academy_izuno")===true,null,{timeout:10000});
    const afterPurchase=await semanticSnapshot(page);
    assert.strictEqual(afterPurchase.ryo,0);
    assert.strictEqual(JSON.stringify(afterPurchase.currentTeam),teamBefore,"Character retail mutated currentTeam");
    assert.strictEqual(JSON.stringify(afterPurchase.geninRosterTransition),geninBefore,"Character retail mutated Genin snapshot/state");
    assert.deepStrictEqual(invariantOnly(afterPurchase),invariantOnly(shopOpenBaseline),"Character retail caused forbidden side effects outside permitted ownership/acquisition/history changes");

    const purchaseRecord=await page.evaluate(()=>({
      receipt:(playerData.activityHistory||[]).find(row=>row&&row.type==="character_card_shop_purchase"&&row.variantId==="academy_izuno"),
      acquisition:(playerData.acquisition.records||[]).find(row=>row&&row.route==="retail_character_card_shop"&&row.variantId==="academy_izuno"),
      owned:playerData.acquisition.ownedCharactersByVariantId.academy_izuno||null,
      ownershipIds:[...(playerData.characterOwnership.ownedRegistryIds||[])]
    }));
    assert(purchaseRecord.receipt,"retail receipt missing");
    assert(purchaseRecord.acquisition,"generic acquisition record missing");
    assert(purchaseRecord.owned,"owned character record missing");
    assert(purchaseRecord.ownershipIds.includes("academy_izuno"));
    assert.strictEqual(purchaseRecord.receipt.totalPriceRyo,100);
    assert.strictEqual(purchaseRecord.receipt.assignmentCommitted,false);
    assert.strictEqual(purchaseRecord.acquisition.sourceEventId,purchaseRecord.receipt.sourceEventId);
    assert.strictEqual(purchaseRecord.acquisition.context.catalogueId,"alpha_konoha_character_card_shop_v1");
    assert.strictEqual(purchaseRecord.acquisition.provenance.retailDoesNotAssign,true);

    // 7. My Clan naturally sees ownership. Prove the canonical derived roster
    // first, then inspect the transient ALL presentation filter explicitly.
    const clanProjection=await page.evaluate(()=>({
      roster:getClanManageableRosterCharacters().map(character=>({
        id:character.id,
        registryId:getCharacterRegistryId(character),
        name:character.name
      })),
      ownership:[...(playerData.characterOwnership.ownedRegistryIds||[])],
      runtime:getRuntimeCharacterByRegistryId("academy_izuno")
        ? {id:getRuntimeCharacterByRegistryId("academy_izuno").id,name:getRuntimeCharacterByRegistryId("academy_izuno").name}
        : null
    }));
    assert(clanProjection.roster.some(row=>row.registryId==="academy_izuno"),
      "My Clan derived roster omitted newly owned Academy Izuno: "+JSON.stringify(clanProjection));
    await page.evaluate(()=>openOverlay("clan"));
    await page.waitForFunction(()=>currentOverlayType==="clan",null,{timeout:10000});
    await page.evaluate(()=>setClanFilter("all"));
    const izunoClanCard=page.locator('.my-clan-card-hitbox[aria-label="Inspect Academy Izuno"]');
    assert.strictEqual(await izunoClanCard.count(),1,
      "My Clan ALL view did not project exactly one newly owned Academy Izuno card: "+JSON.stringify(clanProjection));
    assert.strictEqual(await izunoClanCard.locator('img[alt="Academy Izuno collectible card"]').count(),1,
      "My Clan Academy Izuno collectible-card presentation missing");
    await page.screenshot({path:path.join(OUT,"02-my-clan-new-ownership.png"),fullPage:true});

    // 9. Same-intent retry is idempotent: no second debit/ownership/receipt.
    const intent=purchaseRecord.receipt.purchaseIntentId;
    const digestBeforeRetry=await page.evaluate(()=>JSON.stringify({
      ryo:playerData.ryo,
      ids:playerData.characterOwnership.ownedRegistryIds,
      records:playerData.acquisition.records,
      history:playerData.activityHistory
    }));
    const retry=await page.evaluate(intent=>commitPhase2CharacterCardShopPurchase52400("academy_izuno",intent),intent);
    assert.strictEqual(retry.success,true);
    assert.strictEqual(retry.idempotent,true);
    const digestAfterRetry=await page.evaluate(()=>JSON.stringify({
      ryo:playerData.ryo,
      ids:playerData.characterOwnership.ownedRegistryIds,
      records:playerData.acquisition.records,
      history:playerData.activityHistory
    }));
    assert.strictEqual(digestAfterRetry,digestBeforeRetry,"same-intent retry duplicated state");

    // 10. Fresh already-owned attempt: no mutation.
    const alreadyBefore=digestAfterRetry;
    const already=await page.evaluate(()=>commitPhase2CharacterCardShopPurchase52400("academy_izuno","qa524:fresh-owned"));
    assert.strictEqual(already.success,false);
    assert.strictEqual(already.reason,"already_owned");
    const alreadyAfter=await page.evaluate(()=>JSON.stringify({
      ryo:playerData.ryo,ids:playerData.characterOwnership.ownedRegistryIds,
      records:playerData.acquisition.records,history:playerData.activityHistory
    }));
    assert.strictEqual(alreadyAfter,alreadyBefore);

    // 11. Insufficient funds: no mutation.
    const poorBefore=alreadyAfter;
    const poor=await page.evaluate(()=>commitPhase2CharacterCardShopPurchase52400("academy_kushina","qa524:poor"));
    assert.strictEqual(poor.success,false);
    assert.strictEqual(poor.reason,"insufficient_ryo");
    const poorAfter=await page.evaluate(()=>JSON.stringify({
      ryo:playerData.ryo,ids:playerData.characterOwnership.ownedRegistryIds,
      records:playerData.acquisition.records,history:playerData.activityHistory
    }));
    assert.strictEqual(poorAfter,poorBefore);

    // 12. Unlisted representation: fail closed.
    const unlisted=await page.evaluate(()=>commitPhase2CharacterCardShopPurchase52400("genin_sasuke","qa524:unlisted"));
    assert.strictEqual(unlisted.success,false);
    assert.strictEqual(unlisted.reason,"character_not_in_alpha_shop_catalogue");
    const unlistedAfter=await page.evaluate(()=>JSON.stringify({
      ryo:playerData.ryo,ids:playerData.characterOwnership.ownedRegistryIds,
      records:playerData.acquisition.records,history:playerData.activityHistory
    }));
    assert.strictEqual(unlistedAfter,poorBefore);

    // 14. Save/reload preserves exact ownership, Ryō and receipt/provenance.
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await release(page);
    await page.waitForFunction(()=>playerData.ryo===0&&isCharacterRegistryOwned("academy_izuno")===true,null,{timeout:15000});
    const persisted=await page.evaluate(()=>({
      ryo:playerData.ryo,
      owned:isCharacterRegistryOwned("academy_izuno"),
      receipt:(playerData.activityHistory||[]).find(row=>row&&row.type==="character_card_shop_purchase"&&row.variantId==="academy_izuno"),
      acquisition:(playerData.acquisition.records||[]).find(row=>row&&row.route==="retail_character_card_shop"&&row.variantId==="academy_izuno"),
      team:getChronicleCurrentTeam43600(),
      genin:playerData.acquisition.geninRosterTransition
    }));
    assert.strictEqual(persisted.ryo,0);
    assert.strictEqual(persisted.owned,true);
    assert(persisted.receipt&&persisted.acquisition);
    assert.strictEqual(persisted.acquisition.sourceEventId,persisted.receipt.sourceEventId);
    assert.strictEqual(JSON.stringify(persisted.team),teamBefore);
    assert.strictEqual(JSON.stringify(persisted.genin),geninBefore);

    const diagnostics=await page.evaluate(()=>runPhase2CharacterCardShop52400Diagnostics());
    assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics));
    await gate.assertClean("phase2-character-card-shop-524");

    console.log(JSON.stringify({
      pass:true,
      issue:524,
      preFormationFailClosed:true,
      exactTenRowCatalogue:true,
      ownedStartersNonPurchasable:true,
      exactPurchasePriceRyo:100,
      canonicalRyoDebitExactlyOnce:true,
      genericAcquisitionOwnershipCommit:true,
      myClanProjection:true,
      currentTeamUnchanged:true,
      sameIntentIdempotent:true,
      freshAlreadyOwnedNoMutation:true,
      insufficientFundsNoMutation:true,
      unlistedNoMutation:true,
      browseRenderNoMutation:true,
      saveReloadStable:true,
      forbiddenSideEffectsAbsent:true,
      geninSnapshotUnchanged:true,
      registryScanExpansionAbsent:true,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
