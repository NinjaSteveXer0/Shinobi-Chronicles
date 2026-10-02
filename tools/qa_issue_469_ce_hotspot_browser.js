#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.CE469_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.CE469_OUT||"artifacts/phase2-ce-hotspot-469";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_PHASE2_CE_HOTSPOT_46900&&
    globalThis.SC_STORY_DECISION_REALISATION_34000&&
    globalThis.SC_STORY_SCENE_BOARD_33900&&
    typeof globalThis.getKonohaCeHotspotEligibility46900==="function"
  ),null,{timeout:45000});
}
async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function beat(page){
  return page.evaluate(()=>{
    const a=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
    return a?{sceneId:a.sceneId,beatId:a.beatId,localContext:JSON.parse(JSON.stringify(a.localContext||{}))}:null;
  });
}
async function advanceThroughBeat(page,beatId,max=20){
  const texts=[];
  for(let i=0;i<max;i++){
    const active=await beat(page);
    if(!active||active.beatId!==beatId)break;
    const text=await page.locator("#story-scene-presentation-layer .sc-story-text").innerText().catch(()=> "");
    if(text)texts.push(text.trim());
    const result=await page.evaluate(()=>advanceStoryScene());
    assert(result&&result.success===true,"advance failed in "+beatId+": "+JSON.stringify(result));
    await page.waitForTimeout(35);
  }
  const after=await beat(page);
  assert(!after||after.beatId!==beatId,"beat did not advance: "+beatId);
  return texts;
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await releaseFrontDoor(page);

    const setup=await page.evaluate(()=>{
      localStorage.clear();
      playerData=createDefaultPlayerData();
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      savePlayerData();

      const selected=selectChronicleOrigin("academy_kakashi","qa469_origin");
      const completed=completeChronicleOriginPrologue("academy_kakashi",["kakashi_v2:qa469_origin_instance"]);
      const snapshot=getAcademyTeamFormationSnapshot();
      const desired=["academy_hinata","academy_menma"];
      if(!desired.every(id=>snapshot.eligibleCandidateVariantIds.includes(id))){
        return{error:"required_authored_teammates_missing",eligible:snapshot.eligibleCandidateVariantIds};
      }
      const one=selectAcademyTeamFormationTeammate(1,desired[0]);
      const two=selectAcademyTeamFormationTeammate(2,desired[1]);
      const formed=confirmAcademyTeamFormation("qa469_team",desired);
      const continued=continueAcademyTeamFormationJourney();
      updateChronicleTutorialProgress43600({
        sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore",
        trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,
        arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true
      },{save:true});

      const store=getOriginParticipantContinuityStore43600({create:true});
      const base={
        schemaVersion:1,
        originId:"academy_kakashi",
        stableParticipantId:"academy_kakashi_origin_masked_interceptor",
        observerLabel:"Masked Interceptor",
        originOccurrenceRef:"kakashi_v2:qa469_origin_instance",
        storySceneInstanceId:"qa469_origin_instance",
        encounteredByProtagonist:true,
        fieldDispositionState:"AVAILABLE",
        fieldDispositionOccurrenceRef:"qa469_origin_material_ref",
        survivedOrigin:true,
        hiddenPostTestReviewReached:true,
        postTestTruthClass:"staged_konoha_test_participant",
        protagonistKnowsTestTruth:false,
        materialHistory:{
          lethalAttempt:false,policeTransfer:false,restraintOrAnbu:false,deliberateRelease:false,
          miDefeatedKakashi:false,kakashiDefeatedMi:false,otherMaterialEncounter:true
        },
        materialHistoryRefs:["qa469_origin_material_ref"],
        captureMode:"qa_fixture_exact",
        capturedAt:1
      };
      store.byKey["academy_kakashi::academy_kakashi_origin_masked_interceptor"]=base;
      savePlayerData();
      return{
        selected,completed,one,two,formed,continued,
        team:getChronicleCurrentTeam43600(),
        freePlay:isAcademyFreePlayAvailable(),
        ownedCharacterId:ensurePlayerAcquisitionState().chronicleOriginOwnedCharacterId,
        ryo:Number(playerData.ryo)||0
      };
    });
    assert(!setup.error,JSON.stringify(setup));
    assert.strictEqual(setup.selected.success,true);
    assert.strictEqual(setup.completed.success,true);
    assert.strictEqual(setup.formed.success,true);
    assert.strictEqual(setup.continued.success,true);
    assert.strictEqual(setup.freePlay,true);
    assert.deepStrictEqual(setup.team.teamVariantIds,["academy_kakashi","academy_hinata","academy_menma"]);

    const matrix=await page.evaluate(()=>{
      const key="academy_kakashi::academy_kakashi_origin_masked_interceptor";
      const store=getOriginParticipantContinuityStore43600({create:true});
      const original=JSON.parse(JSON.stringify(store.byKey[key]));
      const family=(field,patch)=>{
        store.byKey[key]={
          ...JSON.parse(JSON.stringify(original)),
          fieldDispositionState:field,
          materialHistory:{
            lethalAttempt:false,policeTransfer:false,restraintOrAnbu:false,deliberateRelease:false,
            miDefeatedKakashi:false,kakashiDefeatedMi:false,otherMaterialEncounter:true,
            ...patch
          }
        };
        const p=getKonohaCeHotspotPlan46900();
        return p.success?p.historyFamily:"BLOCKED:"+p.reason;
      };
      const rows={
        lethal:family("ESCAPED",{lethalAttempt:true}),
        police:family("POLICE_CUSTODY",{policeTransfer:true}),
        restraint:family("ANBU_CUSTODY",{restraintOrAnbu:true}),
        release:family("RELEASED",{deliberateRelease:true}),
        miVictory:family("ESCAPED",{miDefeatedKakashi:true}),
        kakashiVictory:family("BATTLE_DEFEATED",{kakashiDefeatedMi:true}),
        material:family("AVAILABLE",{})
      };

      store.byKey[key]={...JSON.parse(JSON.stringify(original)),fieldDispositionState:"KILLED",survivedOrigin:false,materialHistory:{...original.materialHistory,lethalAttempt:true}};
      rows.killed=getKonohaCeHotspotEligibility46900();

      store.byKey[key]={...JSON.parse(JSON.stringify(original)),fieldDispositionState:"UNSEEN",encounteredByProtagonist:false};
      rows.unseen=getKonohaCeHotspotEligibility46900();

      const savedOrigin=playerData.acquisition.chronicleOriginVariantId;
      playerData.acquisition.chronicleOriginVariantId="academy_menma";
      rows.noKakashiOrigin=getKonohaCeHotspotEligibility46900();
      playerData.acquisition.chronicleOriginVariantId=savedOrigin;

      store.byKey[key]={...JSON.parse(JSON.stringify(original)),fieldDispositionState:"POLICE_CUSTODY",materialHistory:{...original.materialHistory,policeTransfer:true}};
      rows.policeSurvivorEligible=getKonohaCeHotspotEligibility46900();

      store.byKey[key]={...JSON.parse(JSON.stringify(original)),fieldDispositionState:"ANBU_CUSTODY",materialHistory:{...original.materialHistory,restraintOrAnbu:true}};
      rows.anbuSurvivorEligible=getKonohaCeHotspotEligibility46900();

      playerData.activityHistory.push({id:"occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1",occurrenceId:"occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1",committed:true});
      rows.alreadyResolved=getKonohaCeHotspotEligibility46900();
      playerData.activityHistory.pop();

      store.byKey[key]={
        ...JSON.parse(JSON.stringify(original)),
        fieldDispositionState:"ANBU_CUSTODY",
        materialHistory:{...original.materialHistory,restraintOrAnbu:true},
        materialHistoryRefs:["qa469_origin_restrain_ref"]
      };
      savePlayerData();
      return rows;
    });

    assert.strictEqual(matrix.lethal,"lethal_attempt");
    assert.strictEqual(matrix.police,"police_transfer");
    assert.strictEqual(matrix.restraint,"restraint_or_anbu");
    assert.strictEqual(matrix.release,"deliberate_release");
    assert.strictEqual(matrix.miVictory,"mi_defeated_kakashi");
    assert.strictEqual(matrix.kakashiVictory,"kakashi_defeated_mi");
    assert.strictEqual(matrix.material,"material_encounter");
    assert.strictEqual(matrix.killed.available,false);
    assert.strictEqual(matrix.killed.reason,"masked_interceptor_killed");
    assert.strictEqual(matrix.unseen.available,false);
    assert.strictEqual(matrix.unseen.reason,"masked_interceptor_unseen");
    assert.strictEqual(matrix.noKakashiOrigin.available,false);
    assert.strictEqual(matrix.noKakashiOrigin.reason,"academy_kakashi_origin_required");
    assert.strictEqual(matrix.policeSurvivorEligible.available,true,"historical Police custody incorrectly blocked current World appearance");
    assert.strictEqual(matrix.anbuSurvivorEligible.available,true,"historical ANBU custody incorrectly blocked current World appearance");
    assert.strictEqual(matrix.alreadyResolved.available,false);
    assert.strictEqual(matrix.alreadyResolved.reason,"hotspot_already_resolved");

    await page.evaluate(()=>openOverlay("village"));
    await page.waitForSelector('button[data-village-hotspot-id="KON-P01"]',{state:"visible",timeout:10000});
    const p01=page.locator('button[data-village-hotspot-id="KON-P01"]');
    assert((await p01.getAttribute("aria-label")||"").includes("Hokage Administration"),"KON-P01 accessible identity missing");
    await p01.hover();
    const p01Label=p01.locator(".village-golden-halo-label");
    await p01Label.waitFor({state:"visible",timeout:5000});
    assert((await p01Label.innerText()).includes("Hokage Administration"),"KON-P01 visible hover label missing");
    await page.screenshot({path:path.join(OUT,"01-kon-p01-live-hotspot.png"),fullPage:true});

    await p01.dblclick();
    await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.sceneId==="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1",null,{timeout:10000});
    await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:10000});

    const started=await beat(page);
    assert.strictEqual(started.localContext.historyFamily,"restraint_or_anbu");
    assert.deepStrictEqual(started.localContext.teamVariantIds,["academy_kakashi","academy_hinata","academy_menma"]);
    assert.deepStrictEqual(started.localContext.teammateOrder,["academy_hinata","academy_menma"]);
    const openingBoard=await page.locator("#story-scene-presentation-layer").innerText();
    assert(openingBoard.includes("HOKAGE ADMINISTRATION · PUBLIC APPROACH"));
    assert(openingBoard.includes("STAMPED RECEIPT"));
    assert.strictEqual(await page.locator('#story-scene-presentation-layer img[src*="masked_interceptor.png"]').count()>0,true,"existing Masked Interceptor visual not projected");
    await page.screenshot({path:path.join(OUT,"02-arrival-stamped-receipt.png"),fullPage:true});

    const opening=await advanceThroughBeat(page,"ce469_opening");
    const openingText=opening.join(" ");
    assert(openingText.includes("stamped receipt"));
    assert(openingText.includes("No alarm follows her"));
    assert(openingText.includes("Then she sees Kakashi."));

    const historyTexts=await advanceThroughBeat(page,"ce469_history");
    const historyText=historyTexts.join(" ");
    assert(historyText.includes("gaze drops once to Kakashi's hands"));
    assert(historyText.includes("One wrist turns inside her sleeve"));
    assert(!historyText.includes("Minato"));
    assert(!historyText.includes("staged test"));

    const team1=await advanceThroughBeat(page,"ce469_team_1");
    assert(team1.join(" ").includes("She recognised you."),"Hinata strong participant-first reaction missing");
    const team2=await advanceThroughBeat(page,"ce469_team_2");
    assert(team2.join(" ").includes("Menma looks from the receipt"),"Menma NO STRONG STANCE reaction missing");

    const reactions=await page.evaluate(()=>({
      reactions:getKonohaCeHotspotTeammateReactions46900(),
      snapshot:SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("konoha_ce_kakashi_masked_interceptor_admin_crossing_v1")
    }));
    assert.strictEqual(reactions.reactions.length,2);
    assert.deepStrictEqual(reactions.reactions.map(row=>row.actorRef),["academy_hinata","academy_menma"]);
    assert.strictEqual(Object.values(reactions.snapshot.autonomyReceipts).filter(row=>row.committedStateRef==="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1").length,2);

    const choiceState=await beat(page);
    assert.strictEqual(choiceState.beatId,"ce469_choice");
    const choiceLabels=await page.locator("#story-scene-presentation-layer .sc-story-choice").allInnerTexts();
    assert.deepStrictEqual(choiceLabels,[
      "Tell her you remember her.",
      "Ask what she is doing here.",
      "Watch her pass.",
      "Keep moving."
    ]);
    assert(!choiceLabels.some(label=>/attack/i.test(label)),"ATTACK leaked into live choice UI");
    await page.screenshot({path:path.join(OUT,"03-kakashi-choice-surface.png"),fullPage:true});

    await page.getByRole("button",{name:"Ask what she is doing here.",exact:true}).click();
    await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId==="ce469_branch_ask_business",null,{timeout:10000});
    const branchTexts=await advanceThroughBeat(page,"ce469_branch_ask_business");
    const branchText=branchTexts.join(" ");
    assert(branchText.includes("What are you doing here?"));
    assert(branchText.includes("Delivery. Finished."));
    assert(branchText.includes("public intake window that has already moved on"));
    assert(!/Minato|staged test|employer|ANBU membership/i.test(branchText),"hidden truth leaked into player-facing branch");
    await page.screenshot({path:path.join(OUT,"04-ask-branch.png"),fullPage:true});

    await page.waitForFunction(()=>!globalThis.getActiveStorySceneRuntime?.(),null,{timeout:10000});
    const resolved=await page.evaluate(()=>{
      const record=getKonohaCeHotspotResolvedRecord46900();
      const snap=SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("konoha_ce_kakashi_masked_interceptor_admin_crossing_v1");
      const autonomy=Object.values(snap.autonomyReceipts||{}).filter(row=>row.committedStateRef==="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1");
      const decisions=Object.values(snap.decisionReceipts||{}).filter(row=>row.status==="resolved");
      const world=getWorldEventDimensionState("resolutionByOpportunityId","konoha_ce_kakashi_masked_interceptor_admin_crossing_v1");
      return{
        record,autonomy,decisions,world,
        eligibility:getKonohaCeHotspotEligibility46900(),
        recordCount:playerData.activityHistory.filter(row=>(row.occurrenceId||row.id)==="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1").length,
        ryo:Number(playerData.ryo)||0
      };
    });
    assert(resolved.record);
    assert.strictEqual(resolved.recordCount,1);
    assert.strictEqual(resolved.autonomy.length,2);
    assert.strictEqual(resolved.decisions.length,1);
    assert.strictEqual(resolved.decisions[0].selectedChoiceId,"ask_business");
    assert.strictEqual(resolved.world.resolved,true);
    assert.strictEqual(resolved.eligibility.available,false);
    assert.strictEqual(resolved.eligibility.reason,"hotspot_already_resolved");
    assert.strictEqual(resolved.record.data.rememberedHistoryFamily,"restraint_or_anbu");
    assert.deepStrictEqual(resolved.record.data.originMaterialHistorySourceRefs,["qa469_origin_restrain_ref"]);
    assert.strictEqual(resolved.record.data.properName,"Unknown");
    assert.strictEqual(resolved.record.data.hiddenTestTruthGranted,false);
    assert.strictEqual(resolved.record.data.anbuMembershipKnowledgeGranted,false);
    assert.strictEqual(resolved.record.data.moralityScalarCreated,false);
    assert.strictEqual(resolved.record.data.friendshipScalarCreated,false);
    assert.strictEqual(resolved.record.data.rewardsGranted,false);
    assert.strictEqual(resolved.ryo,setup.ryo,"hotspot granted Ryō");

    await page.evaluate(()=>openOverlay("village"));
    await page.waitForTimeout(120);
    assert.strictEqual(await page.locator('button[data-village-hotspot-id="KON-P01"]').count(),0,"resolved P01 remained live/actionable");

    await page.evaluate(ownedId=>openShinobiRecord("chronicle",ownedId),setup.ownedCharacterId);
    await page.waitForSelector(".shinobi-record-screen",{state:"visible",timeout:10000});
    const recordText=(await page.locator(".shinobi-record-screen").innerText()).toLowerCase();
    for(const phrase of [
      "hokage administration crossing",
      "masked interceptor",
      "seen leaving hokage administration after a document handoff",
      "administration staff did not challenge her presence",
      "previously encountered during the academy package incident",
      "proper name: unknown"
    ])assert(recordText.includes(phrase),"Shinobi Record missing observer-safe fact: "+phrase);
    assert(!recordText.includes("minato"),"hidden Minato truth leaked into Shinobi Record");
    assert(!recordText.includes("staged test"),"hidden staged-test truth leaked into Shinobi Record");
    await page.screenshot({path:path.join(OUT,"05-shinobi-record.png"),fullPage:true});

    const beforeReload=await page.evaluate(()=>({
      record:JSON.stringify(getKonohaCeHotspotResolvedRecord46900()),
      continuity:JSON.stringify(getOriginParticipantContinuity46900()),
      decision:JSON.stringify(SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("konoha_ce_kakashi_masked_interceptor_admin_crossing_v1")),
      count:playerData.activityHistory.filter(row=>(row.occurrenceId||row.id)==="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1").length,
      ryo:Number(playerData.ryo)||0
    }));

    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await releaseFrontDoor(page);

    const afterReload=await page.evaluate(()=>({
      record:JSON.stringify(getKonohaCeHotspotResolvedRecord46900()),
      continuity:JSON.stringify(getOriginParticipantContinuity46900()),
      decision:JSON.stringify(SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("konoha_ce_kakashi_masked_interceptor_admin_crossing_v1")),
      count:playerData.activityHistory.filter(row=>(row.occurrenceId||row.id)==="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1").length,
      eligibility:getKonohaCeHotspotEligibility46900(),
      ryo:Number(playerData.ryo)||0
    }));
    assert.strictEqual(afterReload.record,beforeReload.record,"resolved occurrence changed after reload");
    assert.strictEqual(afterReload.continuity,beforeReload.continuity,"participant continuity changed after reload");
    assert.strictEqual(afterReload.decision,beforeReload.decision,"participant/protagonist receipts changed after reload");
    assert.strictEqual(afterReload.count,1);
    assert.strictEqual(afterReload.eligibility.available,false);
    assert.strictEqual(afterReload.eligibility.reason,"hotspot_already_resolved");
    assert.strictEqual(afterReload.ryo,beforeReload.ryo);

    await page.evaluate(()=>openOverlay("village"));
    await page.waitForTimeout(120);
    assert.strictEqual(await page.locator('button[data-village-hotspot-id="KON-P01"]').count(),0,"resolved hotspot respawned after reload");
    const reroute=await page.evaluate(()=>activateAlphaKonohaV3PublicLocation(null,"KON-P01"));
    assert.strictEqual(reroute.success,false,"resolved P01 unexpectedly relaunched the occurrence");
    const finalCount=await page.evaluate(()=>playerData.activityHistory.filter(row=>(row.occurrenceId||row.id)==="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1").length);
    assert.strictEqual(finalCount,1,"reopen/reroute duplicated the occurrence");

    const diag=await page.evaluate(()=>runPhase2CeHotspot46900Diagnostics());
    assert.strictEqual(diag.pass,true,JSON.stringify(diag));
    await gate.assertClean("phase2-ce-hotspot-469");

    console.log(JSON.stringify({
      pass:true,
      issue:469,
      exactEvent:true,
      sevenHistoryFamilies:true,
      killedNegative:true,
      unseenNegative:true,
      noOriginNegative:true,
      fieldCustodyNotPermanentBlock:true,
      exactCurrentTeam:true,
      participantFirstReceipts:true,
      exactFourChoices:true,
      attackAbsent:true,
      writingDelivery:true,
      observerSafeRecord:true,
      saveReloadNoReroll:true,
      duplicateOccurrence:false,
      rewardsGranted:false,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
