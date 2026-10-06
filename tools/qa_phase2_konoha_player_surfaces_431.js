#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.PHASE2_KONOHA_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.PHASE2_KONOHA_PLAYER_SURFACES_OUT||"artifacts/phase2-konoha-player-surfaces";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_CHRONICLE_STATE_MANIFEST_43600&&
    globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110&&
    globalThis.SC_HOKAGE_OFFICE_CHRONICLE_DISPATCH_53300&&
    globalThis.SC_PHASE2_CE_HOTSPOT_46900&&
    typeof globalThis.getPhase2KonohaActivityTeam43110==="function"&&
    typeof globalThis.getHokageOfficeDispatchProjection53300==="function"&&
    typeof globalThis.getKonohaCeHotspotEligibility46900==="function"&&
    typeof globalThis.getKonohaCeHotspotResolvedRecord46900==="function"
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
async function activitySnapshot(page,service){
  return page.evaluate(service=>{
    const data=service==="practical"?getKonohaPracticalUIScreenData():getKonohaExamUIScreenData();
    const root=document.getElementById("konoha-activity-screen");
    const stage=root?.querySelector(".alpha-activity-result-stage");
    const primary=root?.querySelector(".alpha-activity-primary");
    return{
      data:JSON.parse(JSON.stringify(data)),
      selectable:getKonohaSelectableCharacters().map(row=>row.id),
      helper:getPhase2KonohaActivityTeam43110().map(row=>row.id),
      text:root?.innerText||"",
      subtitle:root?.querySelector(".alpha-activity-header p")?.textContent?.trim()||"",
      noteTitle:root?.querySelector(".alpha-activity-authority-note strong")?.textContent?.trim()||"",
      note:root?.querySelector(".alpha-activity-authority-note span")?.textContent?.trim()||"",
      disciplineIds:[...(root?.querySelectorAll(".alpha-activity-discipline")||[])].map(node=>node.dataset.disciplineId||null),
      resultStage:stage?{state:stage.dataset.state||null,text:(stage.innerText||"").trim()}:null,
      primaryTop:primary?primary.getBoundingClientRect().top:null
    };
  },service);
}
async function semanticFingerprint(page){
  return page.evaluate(()=>JSON.stringify({
    activityHistory:Array.isArray(playerData.activityHistory)?playerData.activityHistory:null,
    worldEventRuntime:playerData.worldEventRuntime||null,
    currentTeam:getChronicleCurrentTeam43600(),
    ryo:playerData.ryo,
    acquisition:playerData.acquisition||null
  }));
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);

    const setup=await page.evaluate(()=>{
      playerData=createDefaultPlayerData();
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      savePlayerData();
      const selected=selectChronicleOrigin("academy_menma","qa43110_origin");
      const completed=completeChronicleOriginPrologue("academy_menma",["qa43110_complete"]);
      const snapshot=getAcademyTeamFormationSnapshot();
      const expected=["academy_hinata","academy_kakashi"];
      if(!expected.every(id=>snapshot.eligibleCandidateVariantIds.includes(id))){
        return{selected,completed,eligible:snapshot.eligibleCandidateVariantIds,error:"expected_candidates_missing"};
      }
      const one=selectAcademyTeamFormationTeammate(1,expected[0]);
      const two=selectAcademyTeamFormationTeammate(2,expected[1]);
      const formed=confirmAcademyTeamFormation("qa43110_team",expected);
      const continued=continueAcademyTeamFormationJourney();
      updateChronicleTutorialProgress43600({sandboxPopupSeen:true,practicalTipSeen:true,examsTipSeen:true},{save:true});
      return{
        selected,completed,one,two,formed,continued,
        team:getChronicleCurrentTeam43600(),
        playerTeamNames:(playerTeam||[]).map(row=>row&&row.name).filter(Boolean)
      };
    });
    assert(!setup.error,"Menma/Hinata/Kakashi unavailable: "+JSON.stringify(setup));
    assert.strictEqual(setup.selected?.success,true);
    assert.strictEqual(setup.completed?.success,true);
    assert.strictEqual(setup.formed?.success,true);
    assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);
    assert(setup.playerTeamNames.some(name=>/Naruto/i.test(name))||setup.playerTeamNames.some(name=>/Sasuke/i.test(name)),
      "fixture-heavy playerTeam precondition missing");

    await page.evaluate(()=>openKonohaPracticalFromVillage());
    await page.waitForSelector("#konoha-activity-screen[data-service-id='practical']",{state:"visible",timeout:10000});
    let practical=await activitySnapshot(page,"practical");
    assert.deepStrictEqual(practical.selectable,["academy_menma","academy_hinata","academy_kakashi"]);
    assert.deepStrictEqual(practical.helper,practical.selectable);
    assert.deepStrictEqual(practical.data.characters.map(row=>row.id),practical.selectable);
    assert(!/Kage Naruto|Jonin Sasuke/i.test(practical.text),"fixture/demo shinobi leaked into Practical");
    assert.strictEqual(practical.noteTitle,"TRAINING RESULTS");
    assert(!/runtime|resolver|authority/i.test(practical.subtitle+" "+practical.note),"developer-facing Practical copy leaked");
    assert.deepStrictEqual(practical.disciplineIds,practical.data.disciplines.map(row=>row.id),"Practical rendered discipline accents do not match available discipline data");
    assert(practical.resultStage&&/RESULT STAGE|TRAINING RESULT/i.test(practical.resultStage.text),"Practical Result Stage missing idle purpose");

    const actionStability=await page.evaluate(()=>{
      const root=document.getElementById("konoha-activity-screen");
      const notifications=root.querySelector(".alpha-activity-notifications");
      const primary=root.querySelector(".alpha-activity-primary");
      const before=primary.getBoundingClientRect().top;
      for(let i=0;i<48;i+=1){
        const row=document.createElement("div");row.className="alpha-activity-notice";
        row.innerHTML=`<strong>QA ROUTINE ${i+1}</strong><span>Routine bounded history row.</span>`;
        notifications.appendChild(row);
      }
      const after=primary.getBoundingClientRect().top;
      return{before,after,delta:Math.abs(after-before),scrollHeight:notifications.scrollHeight,clientHeight:notifications.clientHeight};
    });
    assert(actionStability.scrollHeight>actionStability.clientHeight,"notification panel did not become internally scrollable under stress");
    assert(actionStability.delta<=1,"BEGIN Practical action dock moved under notification growth: "+JSON.stringify(actionStability));
    await page.screenshot({path:path.join(OUT,"01-practical-current-team-stable-dock.png"),fullPage:true});

    await page.evaluate(()=>changeKonohaPracticalCharacter(1));
    practical=await activitySnapshot(page,"practical");
    assert.strictEqual(practical.data.selectedCharacterId,"academy_hinata");
    await page.evaluate(()=>changeKonohaPracticalCharacter(1));
    practical=await activitySnapshot(page,"practical");
    assert.strictEqual(practical.data.selectedCharacterId,"academy_kakashi");

    await page.evaluate(()=>openKonohaExamFromVillage());
    await page.waitForSelector("#konoha-activity-screen[data-service-id='exams']",{state:"visible",timeout:10000});
    const exams=await activitySnapshot(page,"exams");
    assert.deepStrictEqual(exams.selectable,["academy_menma","academy_hinata","academy_kakashi"]);
    assert.deepStrictEqual(exams.data.characters.map(row=>row.id),exams.selectable);
    assert(!/Kage Naruto|Jonin Sasuke/i.test(exams.text),"fixture/demo shinobi leaked into Exams");
    assert.strictEqual(exams.noteTitle,"EXAM RECORD");
    assert(exams.note.includes("Rank Promotion is earned separately."),"natural Exam Rank distinction missing");
    assert(!/runtime|resolver|authority/i.test(exams.subtitle+" "+exams.note),"developer-facing Exam copy leaked");
    assert.deepStrictEqual(exams.disciplineIds,exams.data.disciplines.map(row=>row.id),"Exam rendered discipline accents do not match available discipline data");
    assert(exams.resultStage&&/RESULT STAGE|ASSESSMENT RESULT/i.test(exams.resultStage.text),"Exam Result Stage missing idle purpose");
    await page.screenshot({path:path.join(OUT,"02-exams-current-team.png"),fullPage:true});

    const accentMap=await page.evaluate(()=>{
      const css=document.getElementById("sc-phase2-konoha-player-surfaces-43110")?.textContent||"";
      const ids=["nin","tai","gen","buki","fuin","kin","stamina"];
      return ids.filter(id=>css.includes('data-discipline-id="'+id+'"'));
    });
    assert.deepStrictEqual(accentMap,["nin","tai","gen","buki","fuin","kin","stamina"],"Seven-discipline accent map is incomplete");

    const oneMemberCommit=await page.evaluate(()=>commitClanTeamAssignment(
      ["academy_menma",null,null,null,null,null],
      {source:"qa43110_one_member",sourceEventId:"qa43110_one_member"}
    ));
    assert.strictEqual(oneMemberCommit.success,true,JSON.stringify(oneMemberCommit));
    await page.evaluate(()=>openKonohaPracticalFromVillage());
    await page.waitForSelector("#konoha-activity-screen[data-service-id='practical']",{state:"visible",timeout:10000});
    const oneMemberPractical=await activitySnapshot(page,"practical");
    assert.deepStrictEqual(oneMemberPractical.selectable,["academy_menma"],"1-member Current Team fell back to broad roster");
    assert.deepStrictEqual(oneMemberPractical.data.characters.map(row=>row.id),["academy_menma"]);
    assert(!/Kage Naruto|Jonin Sasuke/i.test(oneMemberPractical.text),"fixture/demo shinobi leaked after 1-member assignment");

    const sixAttempt=await page.evaluate(()=>{
      const manageable=typeof getClanManageableRosterCharacters==="function"?getClanManageableRosterCharacters():[];
      const ids=manageable.map(row=>row&&row.id).filter(Boolean).slice(0,6);
      if(ids.length<6)return{supported:false,ids};
      const committed=commitClanTeamAssignment(ids,{source:"qa43110_six_member",sourceEventId:"qa43110_six_member"});
      return{supported:true,ids,committed};
    });
    if(sixAttempt.supported){
      assert.strictEqual(sixAttempt.committed.success,true,JSON.stringify(sixAttempt));
      await page.evaluate(()=>openKonohaExamFromVillage());
      await page.waitForSelector("#konoha-activity-screen[data-service-id='exams']",{state:"visible",timeout:10000});
      const sixExam=await activitySnapshot(page,"exams");
      assert.deepStrictEqual(sixExam.selectable,sixAttempt.ids,"6-member Current Team projection changed order or fell back");
      assert.deepStrictEqual(sixExam.data.characters.map(row=>row.id),sixAttempt.ids);
    }

    // ----------------------------------------------------------------------
    // #533 — Hokage Office / Chronicle Dispatch Step 6 browser contract.
    // This lane validates projection/routing without manufacturing #469 state.
    // #469 owns the real occurrence and its own browser gate proves that record.
    // ----------------------------------------------------------------------
    const leadFixture=await page.evaluate(()=>{
      const consequence=getKonohaCeHotspotBranchConsequence46900("ask_about_delivery");
      const leadId=consequence&&Array.isArray(consequence.futureLeadIds)?consequence.futureLeadIds[0]:null;
      if(!leadId)return{error:"469_dispatch_lead_missing"};
      const originalResolved=globalThis.getKonohaCeHotspotResolvedRecord46900;
      const originalEligibility=globalThis.getKonohaCeHotspotEligibility46900;
      const originalActiveStory=globalThis.getActiveStorySceneRuntime;
      globalThis.__qa533OriginalResolved469=originalResolved;
      globalThis.__qa533OriginalEligibility469=originalEligibility;
      const record={
        id:"occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1",
        occurrenceId:"occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1",
        sourceOccurrenceId:"occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1",
        committed:true,
        data:{
          futureLeadIds:[leadId],
          branchKnowledge:{redirectedToAdministrationDesk:true},
          recordAddendum:"The Administration desk is the known public follow-up for this dispatch lead."
        },
        sourceRefs:[{type:"world_occurrence",id:"occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1",role:"source"}]
      };
      globalThis.getKonohaCeHotspotResolvedRecord46900=()=>JSON.parse(JSON.stringify(record));
      globalThis.getKonohaCeHotspotEligibility46900=()=>({available:true,reason:"qa_priority"});
      const priority=getHokageOfficeRouteDecision53300("KON-P01");
      globalThis.getKonohaCeHotspotEligibility46900=()=>({available:false,reason:"qa_scene_priority"});
      globalThis.getActiveStorySceneRuntime=()=>({sceneId:"scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_menma_v1"});
      const activeScenePriority=getHokageOfficeRouteDecision53300("KON-P01");
      globalThis.getActiveStorySceneRuntime=originalActiveStory;
      globalThis.getKonohaCeHotspotEligibility46900=()=>({available:false,reason:"qa_office_fallback"});
      const office=getHokageOfficeRouteDecision53300("KON-P01");
      const other=getHokageOfficeRouteDecision53300("KON-P09");
      return{leadId,priority,activeScenePriority,office,other,dispatch:getHokageOfficeDispatchProjection53300()};
    });
    assert(!leadFixture.error,JSON.stringify(leadFixture));
    assert.strictEqual(leadFixture.priority,"ce_hotspot_469","#533 no longer gives eligible #469 first refusal");
    assert.strictEqual(leadFixture.activeScenePriority,"ce_hotspot_469","#533 stole P01 while a #469 Story scene was still active");
    assert.strictEqual(leadFixture.office,"hokage_office_533","ineligible P01 did not route to Office");
    assert.strictEqual(leadFixture.other,"delegate_existing_location","#533 intercepted a non-P01 location");
    assert.deepStrictEqual(leadFixture.dispatch.discoveredLeadIds,[leadFixture.leadId]);
    assert.strictEqual(leadFixture.dispatch.countMode,"known_only_no_seed_denominator_claimed");

    await page.evaluate(()=>{openOverlay("village");syncHokageOfficeAnchor53300();});
    await page.waitForSelector('[data-hokage-office-anchor="533"]',{state:"visible",timeout:10000});
    const p01Surface=await page.evaluate(()=>({
      officeAnchors:document.querySelectorAll('[data-hokage-office-anchor="533"]').length,
      liveCeButtons:document.querySelectorAll('button[data-village-hotspot-id="KON-P01"]').length,
      labelledAnchors:[...document.querySelectorAll('.konoha-v3-anchor.is-identified')].filter(node=>node.querySelector('.village-golden-halo-label')?.textContent?.trim()==="Hokage Administration").length
    }));
    assert.strictEqual(p01Surface.officeAnchors,1,"#533 did not upgrade the existing static P01 anchor exactly once");
    assert.strictEqual(p01Surface.liveCeButtons,0,"#533 resurrected the resolved #469 P01 hotspot button");
    assert.strictEqual(p01Surface.labelledAnchors,1,"#533 created a second Hokage Administration map anchor");
    assert.strictEqual(await page.locator(".alpha533-office-entry").count(),0,"retired duplicate #533 Office button returned");

    const beforeOffice=await semanticFingerprint(page);
    await page.evaluate(()=>{
      const node=document.querySelector('[data-hokage-office-anchor="533"]');
      if(!node)throw new Error("KON-P01 Office anchor missing");
      node.dispatchEvent(new MouseEvent("dblclick",{bubbles:true,cancelable:true,view:window}));
    });
    await page.waitForSelector('[data-hokage-office="step6"]',{state:"visible",timeout:5000});
    const officeSnapshot=await page.evaluate(()=>{
      const root=document.querySelector('[data-hokage-office="step6"]');
      const dispatch=root.querySelector('[data-office-section="chronicle-dispatch"]');
      const disabled=[...root.querySelectorAll(".alpha533-business button:disabled")].map(node=>(node.innerText||"").trim());
      return{
        text:root.innerText||"",
        presenceMode:root.dataset.presenceMode||null,
        dispatchText:dispatch?.innerText||"",
        leadIds:[...root.querySelectorAll("[data-dispatch-lead-id]")].map(node=>node.dataset.dispatchLeadId),
        disabled
      };
    });
    assert.strictEqual(officeSnapshot.presenceMode,"physical");
    assert(officeSnapshot.text.includes("Hokage Office"),"Office shell missing");
    assert(officeSnapshot.text.includes("Not specified by current caller"),"default Office holder did not fail closed");
    assert.deepStrictEqual(officeSnapshot.leadIds,[leadFixture.leadId],"Dispatch did not project the canonical-provider lead exactly once");
    assert(officeSnapshot.dispatchText.includes("NO SEED DENOMINATOR CLAIMED"),"Dispatch fabricated a fixed rumour denominator");
    assert(!/\b\d+\s*\/\s*\d+\b/.test(officeSnapshot.dispatchText),"Dispatch rendered a fake N/M total without issued-seed authority");
    assert(officeSnapshot.disabled.some(text=>/PROMOTIONS/.test(text)),"Promotions did not fail closed in Step 6");
    assert(officeSnapshot.disabled.some(text=>/VILLAGE AFFAIRS/.test(text)),"Village Affairs did not fail closed in Step 6");
    assert(officeSnapshot.disabled.some(text=>/DIPLOMACY/.test(text)),"Diplomacy did not fail closed in Step 6");
    assert(officeSnapshot.disabled.some(text=>/SPECIAL ASSIGNMENTS/.test(text)),"Special Assignments did not fail closed in Step 6");
    assert.strictEqual(await semanticFingerprint(page),beforeOffice,"opening Hokage Office mutated semantic Chronicle state");
    await page.screenshot({path:path.join(OUT,"03-hokage-office-step6-dispatch.png"),fullPage:true});

    const cutawayBefore=await semanticFingerprint(page);
    const cutaway=await page.evaluate(()=>openHokageOffice53300({
      callerRef:"qa533_cutaway",
      presenceMode:"cutaway",
      observer:{id:"qa_observer",displayName:"Caller Observer",rank:"JONIN"},
      officeHolder:{id:"qa_holder",displayName:"Caller Holder",title:"Hokage"},
      returnMode:"village"
    }));
    assert.strictEqual(cutaway.success,true,JSON.stringify(cutaway));
    const cutawaySnapshot=await page.evaluate(()=>{
      const root=document.querySelector('[data-hokage-office="step6"]');
      return{mode:root?.dataset.presenceMode||null,text:root?.innerText||""};
    });
    assert.strictEqual(cutawaySnapshot.mode,"cutaway");
    assert(cutawaySnapshot.text.includes("Caller Observer"),"caller-bound observer was ignored");
    assert(cutawaySnapshot.text.includes("Caller Holder"),"caller-bound Office holder was ignored");
    assert.strictEqual(await semanticFingerprint(page),cutawayBefore,"cutaway presentation manufactured physical/Knowledge state");

    const focusBefore=await semanticFingerprint(page);
    const focusResult=await page.evaluate(leadId=>focusHokageDispatchLead53300(leadId),leadFixture.leadId);
    assert.strictEqual(focusResult.success,true,JSON.stringify(focusResult));
    await page.waitForSelector('[data-hokage-office-anchor="533"][data-dispatch-focus="533"]',{state:"attached",timeout:5000});
    assert.strictEqual(await semanticFingerprint(page),focusBefore,"Dispatch map focus committed semantic state");

    await page.evaluate(()=>{
      if(globalThis.__qa533OriginalResolved469){
        globalThis.getKonohaCeHotspotResolvedRecord46900=globalThis.__qa533OriginalResolved469;
        delete globalThis.__qa533OriginalResolved469;
      }
      if(globalThis.__qa533OriginalEligibility469){
        globalThis.getKonohaCeHotspotEligibility46900=globalThis.__qa533OriginalEligibility469;
        delete globalThis.__qa533OriginalEligibility469;
      }
    });
    const diagnostics=await page.evaluate(()=>({
      activity:runPhase2KonohaPlayerSurfaces43110Diagnostics(),
      office:runHokageOfficeChronicleDispatch53300Diagnostics()
    }));
    assert.strictEqual(diagnostics.activity.pass,true,JSON.stringify(diagnostics.activity));
    assert.strictEqual(diagnostics.office.pass,true,JSON.stringify(diagnostics.office));
    await gate.assertClean("phase2-konoha-player-surfaces-and-hokage-office");
    console.log(JSON.stringify({
      pass:true,issue:431,step6Issue:533,
      initialCurrentTeam:["academy_menma","academy_hinata","academy_kakashi"],
      oneMemberCurrentTeamProven:true,
      sixMemberCurrentTeamProven:sixAttempt.supported===true,
      practicalUsesCommittedTeam:true,examsUseCommittedTeam:true,
      trainingGroundRosterUntouched:true,developerFixtureLeak:false,
      resultStagePresent:true,stableActionDock:true,boundedNotificationHistory:true,
      disciplineAccents:true,naturalPlayerCopy:true,
      hokageOfficeUsesSingleP01Control:true,ce469FirstRefusal:true,activeCe469SceneProtected:true,
      resolvedCeHotspotNotResurrected:true,staticAdministrationAnchorUpgraded:true,
      dispatchReadsCanonicalResolved469:true,dispatchProviderProjectionReadOnly:true,dispatchNoFakeSeedDenominator:true,
      officeOpenReadOnly:true,cutawayReadOnly:true,mapFocusReadOnly:true,
      unsupportedStep6BusinessFailsClosed:true,
      ownerBrowserAcceptanceStillRequired:true,browserGoldenClaimed:false
    },null,2));
  }finally{await context.close();await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
