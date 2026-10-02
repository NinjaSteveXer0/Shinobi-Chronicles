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

    const ce478Variance=await page.evaluate(()=>{
      playerData=createDefaultPlayerData();
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      const originalSave=globalThis.savePlayerData;
      const originalDecision=JSON.parse(JSON.stringify(playerData.storyDecisionRuntime34000||null));
      const originalFactual=JSON.parse(JSON.stringify(playerData.storyFactualResolver34600||null));
      const ryoBefore=Number(playerData.ryo)||0;
      const inventoryBefore=JSON.stringify(playerData.inventory||{});
      const familyOf=history=>{
        const c=history&&history.miContinuity||{},m=c.materialHistory||{};
        if(c.fieldDispositionState==="KILLED"||c.survivedOrigin===false)return"KILLED";
        if(c.fieldDispositionState==="UNSEEN"||c.encounteredByProtagonist!==true)return"UNSEEN";
        if(m.lethalAttempt===true)return"lethal_attempt";
        if(m.policeTransfer===true||c.fieldDispositionState==="POLICE_CUSTODY")return"police_transfer";
        if(m.restraintOrAnbu===true||["RESTRAINED","ANBU_CUSTODY"].includes(c.fieldDispositionState))return"restraint_or_anbu";
        if(m.deliberateRelease===true||c.fieldDispositionState==="RELEASED")return"deliberate_release";
        if(m.miDefeatedKakashi===true)return"mi_defeated_kakashi";
        if(m.kakashiDefeatedMi===true||c.fieldDispositionState==="BATTLE_DEFEATED")return"kakashi_defeated_mi";
        return"material_encounter";
      };
      const signature=history=>JSON.stringify({
        choices:(history.exactMaterialChoiceIntentReceipts||[]).map(r=>[r.boundaryId,r.choiceId]),
        facts:(history.exactFactualResolverReceipts||[]).map(r=>[r.key,r.selectedOutcomeRef]),
        battles:(history.exactBattleOutcomeRefs||[]).map(r=>[r.battleConfigId,r.outcome,r.playerActionOpportunityCount]),
        final:history.exactFinalOriginState,
        continuity:{
          fieldDispositionState:history.miContinuity&&history.miContinuity.fieldDispositionState,
          survivedOrigin:history.miContinuity&&history.miContinuity.survivedOrigin,
          materialHistory:history.miContinuity&&history.miContinuity.materialHistory
        }
      });
      const resetSemanticRoots=()=>{
        playerData.storyDecisionRuntime34000=originalDecision?JSON.parse(JSON.stringify(originalDecision)):undefined;
        playerData.storyFactualResolver34600=originalFactual?JSON.parse(JSON.stringify(originalFactual)):undefined;
      };
      globalThis.savePlayerData=()=>true;
      try{savePlayerData=globalThis.savePlayerData;}catch(_error){}
      const required=new Set([
        "lethal_attempt","police_transfer","restraint_or_anbu","deliberate_release",
        "mi_defeated_kakashi","kakashi_defeated_mi","material_encounter","KILLED","UNSEEN"
      ]);
      const examples={};
      let deterministicSameSeed=false;
      for(let i=0;i<2200&&Object.keys(examples).length<required.size;i++){
        resetSemanticRoots();
        const runId="sc_run_v1_qa478_variance_"+String(i).padStart(4,"0");
        const seed=["sc.privateOriginHistory.v1",runId,"academy_kakashi","academy_kakashi_v2","v3"].join("::");
        const first=previewAutonomousKakashiPrivateOrigin46900(seed);
        if(!first||first.success!==true||!first.history)continue;
        const family=familyOf(first.history);
        if(required.has(family)&&!examples[family])examples[family]={runId,seed,signature:signature(first.history)};
        if(!deterministicSameSeed&&i%31===0){
          const sig1=signature(first.history);
          resetSemanticRoots();
          const second=previewAutonomousKakashiPrivateOrigin46900(seed);
          deterministicSameSeed=!!(second&&second.success===true&&signature(second.history)===sig1);
        }
      }
      resetSemanticRoots();
      globalThis.savePlayerData=originalSave;
      try{savePlayerData=originalSave;}catch(_error){}
      return{
        required:[...required],
        found:Object.keys(examples),
        examples:Object.fromEntries(Object.entries(examples).map(([k,v])=>[k,{runId:v.runId,seed:v.seed}])),
        deterministicSameSeed,
        ryoBefore,ryoAfter:Number(playerData.ryo)||0,
        inventoryBefore,inventoryAfter:JSON.stringify(playerData.inventory||{})
      };
    });
    for(const required of ce478Variance.required)assert(ce478Variance.found.includes(required),"#478 autonomous-history variance missing "+required+": "+JSON.stringify(ce478Variance));
    assert.strictEqual(ce478Variance.deterministicSameSeed,true,"same private-Origin seed did not reproduce the same semantic history");
    assert.strictEqual(ce478Variance.ryoAfter,ce478Variance.ryoBefore,"variance preview mutated player Ryō");
    assert.strictEqual(ce478Variance.inventoryAfter,ce478Variance.inventoryBefore,"variance preview mutated player inventory");
    const positiveRunIds=Object.entries(ce478Variance.examples)
      .filter(([family])=>family!=="KILLED"&&family!=="UNSEEN")
      .map(([,value])=>value.runId);
    assert(positiveRunIds.length>=2,"#494 variance scan did not produce two positive run IDs: "+JSON.stringify(ce478Variance));

    const setup=await page.evaluate(()=>{
      localStorage.clear();
      playerData=createDefaultPlayerData();
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      savePlayerData();

      const selected=selectChronicleOrigin("academy_kakashi","qa469_origin");
      const runIdentity=commitChronicleRunIdentity43600({runId:"sc_run_v1_qa469_kakashi_matrix_0001",creationKind:"NEW_START"});
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
        selected,runIdentity,completed,one,two,formed,continued,
        team:getChronicleCurrentTeam43600(),
        currentRunIdentity:getChronicleRunIdentity43600(),
        freePlay:isAcademyFreePlayAvailable(),
        ownedCharacterId:ensurePlayerAcquisitionState().chronicleOriginOwnedCharacterId,
        ryo:Number(playerData.ryo)||0
      };
    });
    assert(!setup.error,JSON.stringify(setup));
    assert.strictEqual(setup.selected.success,true);
    assert.strictEqual(setup.runIdentity.success,true);
    assert.strictEqual(setup.currentRunIdentity.runId,"sc_run_v1_qa469_kakashi_matrix_0001");
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
    const activeBackdrop=await page.evaluate(()=>getActiveStorySceneBackdropPath33900());
    assert(activeBackdrop&&activeBackdrop.includes("hokage_district_exterior.png"),"KON-P01 Administration exterior backdrop missing: "+activeBackdrop);
    assert.strictEqual(await page.locator('#story-scene-presentation-layer img[src*="masked_interceptor.png"]').count()>0,true,"existing Masked Interceptor visual not projected");
    await page.screenshot({path:path.join(OUT,"02-arrival-stamped-receipt.png"),fullPage:true});

    const opening=await advanceThroughBeat(page,"ce469_opening");
    const openingText=opening.join(" ");
    assert(openingText.includes("clerk presses a stamp onto a narrow receipt"));
    assert(openingText.includes("clerk calls the next visitor forward"));
    assert(openingText.includes("The woman from the package incident."));
    assert(openingText.includes("She looks up and sees him."));
    assert(!openingText.includes("No alarm follows her"),"rejected semantic-predicate narration returned");

    const historyTexts=await advanceThroughBeat(page,"ce469_history");
    const historyText=historyTexts.join(" ");
    assert(historyText.includes("gaze drops once to Kakashi's hands"));
    assert(historyText.includes("One wrist turns inside her sleeve"));
    assert(!historyText.includes("Minato"));
    assert(!historyText.includes("staged test"));

    const team1=await advanceThroughBeat(page,"ce469_team_1");
    assert(team1.join(" ").includes("She recognised you."),"Hinata strong participant-first reaction missing");
    const team2=await advanceThroughBeat(page,"ce469_team_2");
    assert(team2.join(" ").includes("Menma's eyes move from the stamped receipt"),"Menma NO STRONG STANCE reaction missing");

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
      "Ask about the delivery.",
      "Watch what she does.",
      "Keep moving."
    ]);
    assert(!choiceLabels.some(label=>/attack/i.test(label)),"ATTACK leaked into live choice UI");
    await page.screenshot({path:path.join(OUT,"03-kakashi-choice-surface.png"),fullPage:true});

    const branchMatrix=await page.evaluate(()=>({
      acknowledge:getKonohaCeHotspotBranchConsequence46900("acknowledge_recognition"),
      question:getKonohaCeHotspotBranchConsequence46900("ask_about_delivery"),
      observe:getKonohaCeHotspotBranchConsequence46900("observe_intake_and_departure"),
      disengage:getKonohaCeHotspotBranchConsequence46900("disengage_keep_moving")
    }));
    assert.strictEqual(branchMatrix.acknowledge.factualReceiptId,"mi_mutual_recognition_explicit_v1");
    assert.strictEqual(branchMatrix.question.factualReceiptId,"mi_dispatch_task_confirmed_v1");
    assert.strictEqual(branchMatrix.observe.factualReceiptId,"mi_public_intake_process_observed_v1");
    assert.strictEqual(branchMatrix.disengage.factualReceiptId,"kakashi_declined_mi_contact_v1");
    assert.deepStrictEqual(branchMatrix.question.futureLeadIds,["mi_admin_dispatch_inquiry_lead_v1"]);
    assert.deepStrictEqual(branchMatrix.observe.futureLeadIds,["mi_admin_intake_process_lead_v1"]);
    assert.deepStrictEqual(branchMatrix.disengage.futureLeadIds,[]);
    assert.strictEqual(branchMatrix.disengage.privateMiFollowupEligible,false);

    const askChoice=page.locator("#story-scene-presentation-layer .sc-story-choice").filter({hasText:"Ask about the delivery."});
    assert.strictEqual(await askChoice.count(),1,"Ask-delivery choice control missing or duplicated");
    await askChoice.click();
    await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId==="ce469_branch_ask_about_delivery",null,{timeout:10000});
    const branchTexts=await advanceThroughBeat(page,"ce469_branch_ask_about_delivery");
    const branchText=branchTexts.join(" ");
    assert(branchText.includes("What did you deliver?"));
    assert(branchText.includes("A dispatch."));
    assert(branchText.includes("From who?"));
    assert(branchText.includes("Ask the desk."));
    assert(branchText.includes("clerk is already working through the next visitor's papers"));
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
    assert.strictEqual(resolved.decisions[0].selectedChoiceId,"ask_about_delivery");
    assert.strictEqual(resolved.world.resolved,true);
    assert.strictEqual(resolved.eligibility.available,false);
    assert.strictEqual(resolved.eligibility.reason,"hotspot_already_resolved");
    assert.strictEqual(resolved.record.data.rememberedHistoryFamily,"restraint_or_anbu");
    assert.deepStrictEqual(resolved.record.data.originMaterialHistorySourceRefs,["qa469_origin_restrain_ref"]);
    assert.strictEqual(resolved.record.data.properName,"Unknown");
    assert.strictEqual(resolved.record.data.commonFactualReceiptId,"mi_admin_crossing_base_lead_v1");
    assert.strictEqual(resolved.record.data.branchFactualReceiptId,"mi_dispatch_task_confirmed_v1");
    assert.strictEqual(resolved.record.data.branchKnowledge.documentTaskClass,"dispatch");
    assert.strictEqual(resolved.record.data.branchKnowledge.dispatchSourceKnown,false);
    assert.strictEqual(resolved.record.data.branchKnowledge.sourceDisclosureRefused,true);
    assert.strictEqual(resolved.record.data.branchKnowledge.redirectedToAdministrationDesk,true);
    assert.deepStrictEqual(resolved.record.data.sharedHistoryReceiptIds,["kakashi_questioned_mi_current_admin_business_v1"]);
    assert.deepStrictEqual(resolved.record.data.futureLeadIds,["mi_admin_dispatch_inquiry_lead_v1"]);
    assert.strictEqual(resolved.record.data.privateMiFollowupEligible,true);
    assert.strictEqual(resolved.record.data.recordAddendum,"She described the document as a dispatch and redirected the source question to the Administration desk.");
    assert.deepStrictEqual(resolved.record.data.teammateKnowledgeParticipantRefs,["academy_hinata","academy_menma"]);
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
      "seen leaving hokage administration after completing a stamped document handoff through the public intake",
      "previously encountered during the academy package incident",
      "she described the document as a dispatch and redirected the source question to the administration desk",
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

    // -----------------------------------------------------------------------
    // #478 CURRENT-TEAM VARIANCE — MENMA + OBITO + KAKASHI
    // Regression for owner report: the same Kakashi-private-history hotspot
    // must remain enterable when Menma's other committed teammate is Obito.
    // -----------------------------------------------------------------------
    await page.evaluate(()=>localStorage.clear());
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await releaseFrontDoor(page);

    const obitoTeamSetup=await page.evaluate(()=>{
      playerData=createDefaultPlayerData();
      playerData.chronicleId="qa478_live_chronicle_0009";
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      savePlayerData();

      const selected=selectChronicleOrigin("academy_menma","qa478_obito_origin");
      const completed=completeChronicleOriginPrologue("academy_menma",["qa478_menma_origin_obito_team"]);
      const snapshot=getAcademyTeamFormationSnapshot();
      const desired=["academy_obito","academy_kakashi"];
      if(!desired.every(id=>snapshot.eligibleCandidateVariantIds.includes(id))){
        return{error:"qa478_obito_team_required_teammates_missing",eligible:snapshot.eligibleCandidateVariantIds};
      }
      const one=selectAcademyTeamFormationTeammate(1,desired[0]);
      const two=selectAcademyTeamFormationTeammate(2,desired[1]);
      const formed=confirmAcademyTeamFormation("qa478_obito_team",desired);
      const continued=continueAcademyTeamFormationJourney();
      updateChronicleTutorialProgress43600({
        sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore",
        trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,
        arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true
      },{save:true});
      savePlayerData();
      return{
        selected,completed,one,two,formed,continued,
        team:getChronicleCurrentTeam43600(),
        secondTeammate:getMenmaSecondTeammateRef46900(),
        eligibility:getKonohaCeHotspotEligibility46900(),
        plan:getKonohaCeHotspotPlan46900()
      };
    });
    assert(!obitoTeamSetup.error,JSON.stringify(obitoTeamSetup));
    assert.strictEqual(obitoTeamSetup.formed.success,true,JSON.stringify(obitoTeamSetup.formed));
    assert.strictEqual(obitoTeamSetup.continued.success,true);
    assert.deepStrictEqual(obitoTeamSetup.team.teamVariantIds,["academy_menma","academy_obito","academy_kakashi"]);
    assert.strictEqual(obitoTeamSetup.secondTeammate,"academy_obito");
    assert.strictEqual(obitoTeamSetup.eligibility.available,true,"Menma + Obito + Kakashi was incorrectly blocked: "+JSON.stringify(obitoTeamSetup.eligibility));
    assert.strictEqual(obitoTeamSetup.plan.success,true,JSON.stringify(obitoTeamSetup.plan));
    assert.deepStrictEqual(obitoTeamSetup.plan.teammateOrder,["academy_kakashi","academy_obito"]);

    await page.evaluate(()=>openOverlay("village"));
    await page.waitForSelector('button[data-village-hotspot-id="KON-P01"]',{state:"visible",timeout:10000});
    const obitoP01=page.locator('button[data-village-hotspot-id="KON-P01"]');
    await obitoP01.dblclick();
    await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.sceneId==="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_menma_v1",null,{timeout:10000});
    await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:10000});

    const obitoStarted=await beat(page);
    assert.deepStrictEqual(obitoStarted.localContext.teamVariantIds,["academy_menma","academy_obito","academy_kakashi"]);
    assert.deepStrictEqual(obitoStarted.localContext.teammateOrder,["academy_kakashi","academy_obito"]);

    const obitoOpening=await advanceThroughBeat(page,"ce478_opening");
    assert(obitoOpening.join(" ").includes("Menma is crossing the forecourt with Obito and Kakashi"),"Menma opening did not project exact second teammate");
    await advanceThroughBeat(page,"ce478_history");
    await advanceThroughBeat(page,"ce478_kakashi_response");
    const obitoResponse=await advanceThroughBeat(page,"ce478_hinata_response");
    assert(obitoResponse.join(" ").includes("Wait—you know her?"),"Obito authored current-evidence reaction did not replace stale Hinata branch");

    const obitoChoiceState=await beat(page);
    assert.strictEqual(obitoChoiceState.beatId,"ce478_menma_choice");
    const obitoStage=await page.evaluate(()=>[...document.querySelectorAll(".sc-scene-board-33900__actor")].map(node=>({label:node.dataset.actorLabel,anchor:node.dataset.scStageAnchor,opacity:getComputedStyle(node).opacity,filter:getComputedStyle(node).filter})));
    const obitoLabels=obitoStage.map(row=>row.label);
    for(const expected of ["MENMA","OBITO","KAKASHI","MASKED WOMAN"])assert(obitoLabels.includes(expected),"Menma + Obito stage missing "+expected+": "+JSON.stringify(obitoStage));
    assert(!obitoLabels.includes("HINATA"),"Hinata ghost participant leaked into Menma + Obito current team");
    const obitoAnchors=Object.fromEntries(obitoStage.map(row=>[row.label,row.anchor]));
    assert.deepStrictEqual(obitoAnchors,{MENMA:"PLAYER_LEFT",OBITO:"INNER_LEFT",KAKASHI:"INNER_RIGHT","MASKED WOMAN":"OPPONENT_RIGHT"},"Obito team did not consume semantic Scene Board anchors");
    assert(obitoStage.every(row=>Number(row.opacity)>=0.99&&row.filter==="none"),"Obito team listener cards are faded/desaturated: "+JSON.stringify(obitoStage));
    const obitoChoiceLabels=await page.locator("#story-scene-presentation-layer .sc-story-choice").allInnerTexts();
    assert.deepStrictEqual(obitoChoiceLabels,[
      "Ask Kakashi what happened.",
      "Ask her how she knows Kakashi.",
      "Let Kakashi handle it.",
      "Keep moving."
    ]);
    await page.screenshot({path:path.join(OUT,"05b-menma-obito-kakashi-hotspot.png"),fullPage:true});

    // -----------------------------------------------------------------------
    // #478 LIVE CE BENCHMARK — MENMA ORIGIN + HINATA + KAKASHI
    // Proves Kakashi arrives as a teammate with one already-lived private
    // Origin history, then acts autonomously before Menma receives control.
    // -----------------------------------------------------------------------
    await page.evaluate(()=>localStorage.clear());
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await releaseFrontDoor(page);

    const menmaSetup=await page.evaluate(()=>{
      playerData=createDefaultPlayerData();
      playerData.chronicleId="qa478_live_chronicle_0009";
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      savePlayerData();

      const selected=selectChronicleOrigin("academy_menma","qa478_origin");
      const completed=completeChronicleOriginPrologue("academy_menma",["qa478_menma_origin_3"]);
      const snapshot=getAcademyTeamFormationSnapshot();
      const desired=["academy_hinata","academy_kakashi"];
      if(!desired.every(id=>snapshot.eligibleCandidateVariantIds.includes(id))){
        return{error:"qa478_required_teammates_missing",eligible:snapshot.eligibleCandidateVariantIds};
      }
      const one=selectAcademyTeamFormationTeammate(1,desired[0]);
      const two=selectAcademyTeamFormationTeammate(2,desired[1]);
      const privateBeforeConfirm=getKakashiPrivateOriginHistory46900();
      const ryoBeforeConfirm=Number(playerData.ryo)||0;
      const inventoryBeforeConfirm=JSON.stringify(playerData.inventory||{});
      const formed=confirmAcademyTeamFormation("qa478_team",desired);
      const privateAfterConfirm=getKakashiPrivateOriginHistory46900();
      const ryoAfterConfirm=Number(playerData.ryo)||0;
      const inventoryAfterConfirm=JSON.stringify(playerData.inventory||{});
      const continued=continueAcademyTeamFormationJourney();
      updateChronicleTutorialProgress43600({
        sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore",
        trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,
        arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true
      },{save:true});
      savePlayerData();
      return{
        selected,completed,one,two,formed,continued,
        privateBeforeConfirm,privateAfterConfirm,
        ryoBeforeConfirm,ryoAfterConfirm,inventoryBeforeConfirm,inventoryAfterConfirm,
        team:getChronicleCurrentTeam43600(),
        freePlay:isAcademyFreePlayAvailable(),
        eligibility:getKonohaCeHotspotEligibility46900(),
        ownedCharacterId:ensurePlayerAcquisitionState().chronicleOriginOwnedCharacterId
      };
    });
    assert(!menmaSetup.error,JSON.stringify(menmaSetup));
    assert.strictEqual(menmaSetup.selected.success,true);
    assert.strictEqual(menmaSetup.completed.success,true);
    assert.strictEqual(menmaSetup.privateBeforeConfirm,null,"Team selection pre-resolved Kakashi private Origin");
    assert.strictEqual(menmaSetup.formed.success,true,JSON.stringify(menmaSetup.formed));
    assert.strictEqual(menmaSetup.continued.success,true);
    assert.deepStrictEqual(menmaSetup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);
    assert.strictEqual(menmaSetup.freePlay,true);
    assert(menmaSetup.privateAfterConfirm,"Team Formation did not select an already-lived Kakashi");
    assert.strictEqual(menmaSetup.privateAfterConfirm.semanticType,"sc.privateOriginHistory.v1");
    assert.strictEqual(menmaSetup.privateAfterConfirm.subjectStableId,"academy_kakashi");
    assert.strictEqual(menmaSetup.privateAfterConfirm.resolutionMode,"AUTONOMOUS_PRIVATE");
    assert.strictEqual(menmaSetup.privateAfterConfirm.commitState,"COMMITTED");
    assert.strictEqual(menmaSetup.privateAfterConfirm.profileCoverage.meaningfulBoundaryCount,23);
    assert.strictEqual(menmaSetup.privateAfterConfirm.profileCoverage.legalPlayerFacingChoiceCount,93);
    assert.strictEqual(menmaSetup.privateAfterConfirm.profileCoverage.machineResolveResultChoicesExcluded,true);
    assert.strictEqual(menmaSetup.privateAfterConfirm.terminalConvergence.reportReached,true);
    assert.strictEqual(menmaSetup.privateAfterConfirm.terminalConvergence.hiddenTestReviewReached,true);
    assert.strictEqual(menmaSetup.privateAfterConfirm.terminalConvergence.receiptReached,true);
    assert.strictEqual(menmaSetup.privateAfterConfirm.terminalConvergence.originCompleted,true);
    assert(menmaSetup.privateAfterConfirm.exactFactualResolverReceipts.length>=0);
    assert(menmaSetup.privateAfterConfirm.exactFinalOriginState.terminal.originCompleted===true);
    assert(menmaSetup.privateAfterConfirm.exactFinalOriginState.semanticTrace.some(row=>String(row).startsWith("terminal:v2_report>v2_hidden_review>v2_receipt:")));
    if(menmaSetup.privateAfterConfirm.filteredChronicleRewardPreview){
      assert.strictEqual(menmaSetup.privateAfterConfirm.filteredChronicleRewardPreview.grantAppliedToPlayer,false);
    }
    assert.strictEqual(menmaSetup.privateAfterConfirm.exactMaterialChoiceIntentReceipts[0].choiceId,"watch_exchange");
    assert(menmaSetup.privateAfterConfirm.exactBattleOutcomeRefs.length>=1,"autonomous Kakashi Origin produced no Battle fact");
    assert.strictEqual(menmaSetup.privateAfterConfirm.economyFirewall.duplicateStartingPurseGranted,false);
    assert.strictEqual(menmaSetup.privateAfterConfirm.economyFirewall.autonomousPlayerVictoryBattleRyoGranted,false);
    assert.strictEqual(menmaSetup.privateAfterConfirm.economyFirewall.blanketInventoryRewardsGranted,false);
    assert.strictEqual(menmaSetup.privateAfterConfirm.economyFirewall.playerEconomyMutation,false);
    assert.strictEqual(menmaSetup.ryoAfterConfirm,menmaSetup.ryoBeforeConfirm,"private Kakashi Origin granted player Ryō during Team Formation");
    assert.strictEqual(menmaSetup.inventoryAfterConfirm,menmaSetup.inventoryBeforeConfirm,"private Kakashi Origin mutated player inventory during Team Formation");
    assert.strictEqual(menmaSetup.eligibility.available,true,JSON.stringify(menmaSetup.eligibility));
    assert.strictEqual(menmaSetup.eligibility.mode,"menma_private_history_emergence");
    assert.strictEqual(menmaSetup.eligibility.protagonistVariantId,"academy_menma");

    const sealedBeforeScene=JSON.stringify(menmaSetup.privateAfterConfirm);
    await page.evaluate(()=>openOverlay("village"));
    await page.waitForSelector('button[data-village-hotspot-id="KON-P01"]',{state:"visible",timeout:10000});
    const menmaP01=page.locator('button[data-village-hotspot-id="KON-P01"]');
    await menmaP01.dblclick();
    await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.sceneId==="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_menma_v1",null,{timeout:10000});
    await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:10000});

    const menmaStarted=await beat(page);
    assert.strictEqual(menmaStarted.localContext.protagonistVariantId,"academy_menma");
    assert.strictEqual(menmaStarted.localContext.mode,"menma_private_history_emergence");
    assert.deepStrictEqual(menmaStarted.localContext.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);
    assert.strictEqual(menmaStarted.localContext.privateOriginHistoryRef,menmaSetup.privateAfterConfirm.privateOriginHistoryId);
    assert([
      "lethal_attempt","police_transfer","restraint_or_anbu","deliberate_release",
      "mi_defeated_kakashi","kakashi_defeated_mi","material_encounter"
    ].includes(menmaStarted.localContext.historyFamily),"unexpected private-history family: "+menmaStarted.localContext.historyFamily);

    const menmaBoard=(await page.locator("#story-scene-presentation-layer").innerText());
    assert(menmaBoard.includes("HOKAGE ADMINISTRATION · PUBLIC APPROACH"));
    assert(menmaBoard.includes("MASKED WOMAN"),"Menma-facing board did not use observer-safe label");
    assert(!menmaBoard.includes("MASKED INTERCEPTOR"),"Kakashi historical role label leaked into Menma-facing board");
    const menmaBackdrop=await page.evaluate(()=>getActiveStorySceneBackdropPath33900());
    assert(menmaBackdrop&&menmaBackdrop.includes("hokage_district_exterior.png"),"Menma scene missing Administration backdrop");
    await page.screenshot({path:path.join(OUT,"06-menma-private-history-arrival.png"),fullPage:true});

    const menmaOpening=await advanceThroughBeat(page,"ce478_opening");
    assert(menmaOpening.every(text=>!String(text).includes("\n\n")),"Menma narration pagination collapsed multiple paragraphs into one Story box");
        const menmaOpeningText=menmaOpening.join(" ");
    assert(menmaOpeningText.includes("Menma is crossing the forecourt with Hinata and Kakashi"));
    assert(menmaOpeningText.includes("Her attention fixes on him before it touches either of the others."));

    const menmaHistory=await advanceThroughBeat(page,"ce478_history");
    const menmaHistoryText=menmaHistory.join(" ");
    assert(!/Minato|staged test|employer|ANBU membership/i.test(menmaHistoryText),"private hidden truth leaked through MI remembered-history reaction");
    assert(!menmaHistoryText.includes("Masked Interceptor"),"historical role label leaked into Menma history projection");

    const kakashiResponse=await advanceThroughBeat(page,"ce478_kakashi_response");
    assert(kakashiResponse.join(" ").length>0,"Kakashi private-history autonomous response missing");
    const hinataResponse=await advanceThroughBeat(page,"ce478_hinata_response");
    assert(hinataResponse.join(" ").length>0,"Hinata current-evidence reaction missing");

    const preChoice=await page.evaluate(()=>{
      const snap=getMenmaPrivateHistoryDecisionSnapshot46900();
      const autonomy=Object.values(snap.autonomyReceipts||{}).filter(row=>row.committedStateRef==="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1");
      return{autonomy};
    });
    assert.strictEqual(preChoice.autonomy.length,2,"Menma received control before Kakashi + Hinata autonomy completed");
    assert(preChoice.autonomy.some(row=>row.actorRef==="academy_kakashi"&&String(row.participantIntentRef).includes("kakashi_current_response:")),"Kakashi current response autonomy receipt missing");
    assert(preChoice.autonomy.some(row=>row.actorRef==="academy_hinata"&&String(row.participantIntentRef).includes("second_teammate_current_evidence:academy_hinata:")),"Hinata current-evidence autonomy receipt missing");

    const menmaChoiceState=await beat(page);
    assert.strictEqual(menmaChoiceState.beatId,"ce478_menma_choice");
    const menmaActorStage=await page.evaluate(()=>{
      const nodes=[...document.querySelectorAll(".sc-scene-board-33900__actor")];
      return{
        labels:nodes.map(node=>node.dataset.actorLabel),
        count:nodes.length,
        opacity:nodes.map(node=>getComputedStyle(node).opacity),
        filters:nodes.map(node=>getComputedStyle(node).filter),
        entries:nodes.map(node=>{const r=node.getBoundingClientRect();return{label:node.dataset.actorLabel,anchor:node.dataset.scStageAnchor,left:r.left,right:r.right,top:r.top,bottom:r.bottom};})
      };
    });
    assert.strictEqual(menmaActorStage.count,4,"four-person CE scene truncated a physical participant");
    for(const expected of ["MENMA","HINATA","KAKASHI","MASKED WOMAN"])assert(menmaActorStage.labels.includes(expected),"four-person stage missing "+expected);
    assert(menmaActorStage.opacity.every(value=>Number(value)>=0.99),"non-speaking Story cards are still faded: "+JSON.stringify(menmaActorStage));
    assert(menmaActorStage.filters.every(value=>value==="none"),"non-speaking Story cards are still filtered/greyed: "+JSON.stringify(menmaActorStage));
    const menmaAnchorMap=Object.fromEntries(menmaActorStage.entries.map(row=>[row.label,row.anchor]));
    assert.deepStrictEqual(menmaAnchorMap,{MENMA:"PLAYER_LEFT",HINATA:"INNER_LEFT",KAKASHI:"INNER_RIGHT","MASKED WOMAN":"OPPONENT_RIGHT"},"#486 semantic anchor hierarchy drifted");
    for(let i=0;i<menmaActorStage.entries.length;i++)for(let j=i+1;j<menmaActorStage.entries.length;j++){
      const a=menmaActorStage.entries[i],b=menmaActorStage.entries[j];
      const overlapX=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left));
      const overlapY=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
      assert(!(overlapX>2&&overlapY>2),"#486 actor collision detected: "+JSON.stringify({a,b,overlapX,overlapY}));
    }
        const menmaChoiceLabels=await page.locator("#story-scene-presentation-layer .sc-story-choice").allInnerTexts();
    assert.deepStrictEqual(menmaChoiceLabels,[
      "Ask Kakashi what happened.",
      "Ask her how she knows Kakashi.",
      "Let Kakashi handle it.",
      "Keep moving."
    ]);
    assert(!menmaChoiceLabels.some(label=>/attack/i.test(label)),"ATTACK leaked into Menma live choice surface");
    await page.screenshot({path:path.join(OUT,"07-menma-choice-surface.png"),fullPage:true});

    const yieldChoice=page.locator("#story-scene-presentation-layer .sc-story-choice").filter({hasText:"Let Kakashi handle it."});
    assert.strictEqual(await yieldChoice.count(),1);
    await yieldChoice.click();
    await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId==="ce478_branch_menma_yield_to_kakashi",null,{timeout:10000});
    const yieldTexts=await advanceThroughBeat(page,"ce478_branch_menma_yield_to_kakashi");
    const yieldText=yieldTexts.join(" ");
    assert(yieldText.includes("Your mess."),"Menma yield branch prose missing");
    assert(!yieldText.includes("Masked Interceptor"),"historical role label leaked into Menma yield branch");
    assert(!/Minato|staged test|employer|ANBU membership/i.test(yieldText),"private hidden truth leaked through nested Kakashi autonomy");

    await page.waitForFunction(()=>!globalThis.getActiveStorySceneRuntime?.(),null,{timeout:10000});
    const menmaExitTransition=await page.evaluate(()=>getStoryHardSceneTransitionState33900());
    assert.strictEqual(menmaExitTransition.reason,"story_scene_exit_black_wipe","Menma scene returned to Konoha without shared black-wipe exit");
    const menmaResolved=await page.evaluate(()=>({
      privateHistory:getKakashiPrivateOriginHistory46900(),
      nested:getMenmaNestedKakashiIntent46900(),
      record:getKonohaCeHotspotResolvedRecord46900(),
      snapshot:getMenmaPrivateHistoryDecisionSnapshot46900(),
      participants:getShinobiRecordParticipants(getKonohaCeHotspotResolvedRecord46900()),
      eligibility:getKonohaCeHotspotEligibility46900(),
      count:playerData.activityHistory.filter(row=>(row.occurrenceId||row.id)==="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1").length,
      ryo:Number(playerData.ryo)||0,
      inventory:JSON.stringify(playerData.inventory||{})
    }));
    assert.strictEqual(JSON.stringify(menmaResolved.privateHistory),sealedBeforeScene,"private Kakashi Origin rerolled during current event");
    assert(["acknowledge_recognition","ask_about_delivery","observe_intake_and_departure","disengage_keep_moving"].includes(menmaResolved.nested),"nested Kakashi current intent not committed");
    assert(menmaResolved.record);
    assert.strictEqual(menmaResolved.record.protagonistParticipantId,"academy_menma");
    assert.strictEqual(menmaResolved.record.data.observerRef,"academy_menma");
    assert.strictEqual(menmaResolved.record.data.knownPerson,"Masked Woman");
    assert.strictEqual(menmaResolved.record.data.privateOriginTranscriptGranted,false);
    assert.strictEqual(menmaResolved.record.data.kakashiPrivateChoiceIdsGranted,false);
    assert.strictEqual(menmaResolved.record.data.branchFactualReceiptId,"menma_yielded_private_history_collision_to_kakashi_v1");
    assert.strictEqual(menmaResolved.record.data.nestedKakashiIntent,menmaResolved.nested);
    assert(menmaResolved.record.data.sharedHistoryReceiptIds.includes("menma_deferred_to_kakashi_on_private_connection_v1"));
    assert.strictEqual(menmaResolved.record.data.hiddenTestTruthGranted,false);
    assert.strictEqual(menmaResolved.record.data.properNameKnowledgeGranted,false);
    assert.strictEqual(menmaResolved.record.data.anbuMembershipKnowledgeGranted,false);
    assert.strictEqual(menmaResolved.record.data.rewardsGranted,false);
    assert.deepStrictEqual(menmaResolved.participants,["Menma","Hinata","Kakashi","Masked Woman"]);
    assert.strictEqual(menmaResolved.count,1);
    assert.strictEqual(menmaResolved.eligibility.available,false);
    assert.strictEqual(menmaResolved.eligibility.reason,"hotspot_already_resolved");
    const menmaDecisions=Object.values(menmaResolved.snapshot.decisionReceipts||{}).filter(row=>row.status==="resolved");
    const menmaAutonomy=Object.values(menmaResolved.snapshot.autonomyReceipts||{}).filter(row=>row.committedStateRef==="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1");
    assert.strictEqual(menmaDecisions.length,1);
    assert.strictEqual(menmaDecisions[0].selectedChoiceId,"menma_yield_to_kakashi");
    assert.strictEqual(menmaAutonomy.length,3,"nested Kakashi autonomy did not produce the third participant receipt");
    assert.strictEqual(menmaResolved.ryo,menmaSetup.ryoAfterConfirm,"current #478 hotspot granted Ryō");
    assert.strictEqual(menmaResolved.inventory,menmaSetup.inventoryAfterConfirm,"current #478 hotspot mutated inventory");

    await page.evaluate(ownedId=>openShinobiRecord("chronicle",ownedId),menmaSetup.ownedCharacterId);
    await page.waitForSelector(".shinobi-record-screen",{state:"visible",timeout:10000});
    const menmaRecordText=(await page.locator(".shinobi-record-screen").innerText()).toLowerCase();
    assert(menmaRecordText.includes("hokage administration crossing"));
    assert(menmaRecordText.includes("masked woman"));
    assert(!menmaRecordText.includes("masked interceptor"),"Menma Shinobi Record leaked Kakashi's historical observer label");
    assert(!menmaRecordText.includes("minato"),"Menma Shinobi Record leaked hidden Minato truth");
    assert(!menmaRecordText.includes("staged test"),"Menma Shinobi Record leaked hidden staged-test truth");
    await page.screenshot({path:path.join(OUT,"08-menma-observer-safe-record.png"),fullPage:true});

    const before478Reload=await page.evaluate(()=>({
      privateHistory:JSON.stringify(getKakashiPrivateOriginHistory46900()),
      record:JSON.stringify(getKonohaCeHotspotResolvedRecord46900()),
      decision:JSON.stringify(getMenmaPrivateHistoryDecisionSnapshot46900()),
      nested:getMenmaNestedKakashiIntent46900(),
      count:playerData.activityHistory.filter(row=>(row.occurrenceId||row.id)==="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1").length,
      ryo:Number(playerData.ryo)||0,
      inventory:JSON.stringify(playerData.inventory||{})
    }));
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await releaseFrontDoor(page);
    const after478Reload=await page.evaluate(()=>({
      privateHistory:JSON.stringify(getKakashiPrivateOriginHistory46900()),
      record:JSON.stringify(getKonohaCeHotspotResolvedRecord46900()),
      decision:JSON.stringify(getMenmaPrivateHistoryDecisionSnapshot46900()),
      nested:getMenmaNestedKakashiIntent46900(),
      count:playerData.activityHistory.filter(row=>(row.occurrenceId||row.id)==="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1").length,
      eligibility:getKonohaCeHotspotEligibility46900(),
      ryo:Number(playerData.ryo)||0,
      inventory:JSON.stringify(playerData.inventory||{})
    }));
    assert.strictEqual(after478Reload.privateHistory,before478Reload.privateHistory,"sealed Kakashi private Origin changed after reload");
    assert.strictEqual(after478Reload.record,before478Reload.record,"Menma occurrence changed after reload");
    assert.strictEqual(after478Reload.decision,before478Reload.decision,"Menma/Kakashi autonomy receipts changed after reload");
    assert.strictEqual(after478Reload.nested,before478Reload.nested,"nested Kakashi current intent rerolled after reload");
    assert.strictEqual(after478Reload.count,1);
    assert.strictEqual(after478Reload.eligibility.available,false);
    assert.strictEqual(after478Reload.eligibility.reason,"hotspot_already_resolved");
    assert.strictEqual(after478Reload.ryo,before478Reload.ryo);
    assert.strictEqual(after478Reload.inventory,before478Reload.inventory);

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
      fieldCustodyNotPermanentBlock:true,
      exactCurrentTeam:true,
      participantFirstReceipts:true,
      exactFourChoices:true,
      distinctBranchConsequences:true,
      attackAbsent:true,
      writingDelivery:true,
      observerSafeRecord:true,
      saveReloadNoReroll:true,
      duplicateOccurrence:false,
      rewardsGranted:false,
      privateOriginHistorySealed:true,
      teamFormationDidNotResolveAtSelection:true,
      autonomousBattleOwned:true,
      menmaObserverRelativeKnowledge:true,
      nestedKakashiAutonomy:true,
      privateHistoryReloadNoReroll:true,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
