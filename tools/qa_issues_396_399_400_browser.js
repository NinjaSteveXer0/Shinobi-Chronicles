#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUES_396_399_400_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUES_396_399_400_BROWSER_OUT||"artifacts/issues-396-399-400-browser";
const BUILD=JSON.parse(fs.readFileSync(path.join(__dirname,"fixtures/runtime_build_manifest_303.json"),"utf8"));
fs.mkdirSync(OUT,{recursive:true});

const NAMES={
 academy_hinata:{academy_hinata_gentle_palm:"Gentle Fist: Flowing Palm",academy_hinata_twin_palm_guard:"Gentle Fist: Twin Palm Ward",academy_hinata_palm_counter:"Gentle Fist: Reversal Palm",academy_hinata_academy_shuriken:"Silent Arc Shuriken",academy_hinata_gentle_step:"Gentle Step: Flowing Circle"},
 academy_izuno:{academy_izuno_pouncing_palm:"Cat Fang Palm",academy_izuno_shuriken_pounce:"Prowling Shuriken",academy_izuno_catstep_feint:"Cat's Paw Feint",academy_izuno_wall_spring:"Clawstep Rebound",academy_izuno_clone_pounce:"Phantom Pounce"},
 academy_mirai:{academy_mirai_twin_kunai:"Twin Fang Kunai",academy_mirai_wire_trip:"Crosswire Bind",academy_mirai_false_footstep:"Phantom Footfall",academy_mirai_guarding_blade:"Crossblade Guard",academy_mirai_crossing_strike:"Crossing Fang"},
 academy_kushina:{academy_kushina_red_whirlwind:"Crimson Whirlwind",academy_kushina_beginner_binding_formula:"Uzumaki Binding Script",academy_kushina_iron_will_brace:"Iron-Heart Guard",academy_kushina_headstrong_counter:"Crimson Reversal",academy_kushina_seal_tag_toss:"Spiral Seal Tag"},
 academy_kurenai:{academy_kurenai_false_opening:"Petal Mirage",academy_kurenai_feinting_kunai:"Mirage Kunai",academy_kurenai_false_step_genjutsu:"Phantom Petal Step",academy_kurenai_veiled_guard:"Petal Veil",academy_kurenai_genjutsu_release:"Veilbreak"},
 academy_iwabee:{academy_iwabee_iron_staff_smash:"Stonebreaker Staff",academy_iwabee_staff_sweep:"Bedrock Sweep",academy_iwabee_earth_style_rising_wall:"Earth Style: Rising Rampart",academy_iwabee_stone_snare:"Earth Style: Stone Grasp",academy_iwabee_grounded_stance:"Bedrock Stance"},
 academy_metal_lee:{academy_metal_lee_leaf_rising_kick:"Leaf Rising Heel",academy_metal_lee_training_flurry:"Leaf Driving Barrage",academy_metal_lee_pressure_rhythm:"Fighting Spirit",academy_metal_lee_guarded_footwork:"Iron Footwork",academy_metal_lee_conditioned_endurance:"Ironbody Conditioning"},
 academy_obito:{academy_obito_fire_style_ember_burst:"Fire Style: Cinder Burst",academy_obito_headlong_rush:"Hot-Blooded Charge",academy_obito_uchiha_shuriken_rush:"Uchiha Shuriken Storm",academy_obito_protective_intercept:"Comrade Guard",academy_obito_determined_stand:"Uchiha Resolve"}
};

async function boot(browser,label,origin=null){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!(
    globalThis.SC_ACADEMY_METAL_ORIGIN_RUNTIME_396&&
    globalThis.SC_ROGUE_GENIN_OPPOSITION_PACKAGE_399&&
    globalThis.SC_ACADEMY_IWABEE_ORIGIN_RUNTIME_399&&
    globalThis.SC_ALPHA_ORIGIN_SKILL_DISPLAY_NAMES_400&&
    typeof globalThis.getRuntimeBuildFingerprint==="function"
  ),null,{timeout:30000});
  assert.deepStrictEqual(await page.evaluate(()=>getRuntimeBuildFingerprint()),BUILD,label+" fingerprint mismatch");
  if(origin){
    const started=await page.evaluate(({origin,label})=>{
      const selected=selectChronicleOrigin(origin,label);
      const launched=beginAlphaChronicleOriginPrologue();
      return{selected,launched,scene:getActiveStorySceneRuntime()?.sceneId||null};
    },{origin,label});
    assert.strictEqual(started.selected?.success,true,label+" select failed "+JSON.stringify(started));
    assert.strictEqual(started.launched?.success,true,label+" launch failed "+JSON.stringify(started));
  }
  return{context,page,gate};
}

async function diagnostics(page){
  return page.evaluate(({NAMES})=>{
    const rows={};
    for(const [owner,map] of Object.entries(NAMES)){
      rows[owner]={};
      for(const [id,expected] of Object.entries(map)){
        const skill=getClosureWaveBattleSkillDefinition(id,owner);
        rows[owner][id]={
          expected,
          id:skill?.id||null,
          owner:skill?.ownerRegistryId||null,
          displayName:skill?.displayName||null,
          uiTitle:skill&&typeof getBattleSkillYouthSummary33000==="function"?getBattleSkillYouthSummary33000(skill)?.title||null:null
        };
      }
    }
    return{
      metal:runAcademyMetalOriginRuntime396Diagnostics(),
      rogue:runReusableRogueGeninOppositionPackage399Diagnostics(),
      iwabee:runAcademyIwabeeOriginRuntime399Diagnostics(),
      names:runAcademyOriginSkillDisplayNames400Diagnostics(),
      rows
    };
  },{NAMES});
}

async function runMetalBattle(browser,remaining,expectedClass){
  const label="metal-"+expectedClass;
  const {context,page,gate}=await boot(browser,label,"academy_metal_lee");
  try{
    const launch=await page.evaluate(()=>{
      const set=setStorySceneBeat("met_spar_battle",{render:false});
      const battle=launchStorySceneBattle();
      const stage=document.querySelector(".alpha-code-battle-stage.battle2-modern");
      return{set,battle,battleId:currentBattle?.battleId||null,enemy:currentBattle?.enemy?.id||null,portrait:currentBattle?.enemy?.image||null,meta:JSON.parse(JSON.stringify(currentBattle?.metal396||null)),environmentPath:currentBattle?.presentationEnvironmentPath||currentBattle?.environmentPath||null,stageEnvironmentPath:stage?.dataset?.battleEnvironmentPath||null,stageBackground:stage?getComputedStyle(stage).backgroundImage:""};
    });
    assert.strictEqual(launch.set?.success,true,label+" set Battle beat");
    assert.strictEqual(launch.battle?.success,true,label+" Battle launch "+JSON.stringify(launch));
    assert.strictEqual(launch.enemy,"metal_origin_inviting_genin");
    assert.strictEqual(launch.portrait,"NPC portrait/metal_classmate_1.png");
    assert.strictEqual(launch.environmentPath,"Scene backdrops/academy_training_ground_courtyard.png",label+" authored Battle environment drift");
    assert.strictEqual(launch.stageEnvironmentPath,launch.environmentPath,label+" shared Battle stage did not consume Metal Story environment");
    assert(launch.stageBackground.includes("academy_training_ground_courtyard.png"),label+" Metal Story environment is not visibly painted "+JSON.stringify(launch));
    assert.strictEqual(launch.meta?.startingUnderlyingMaximum,13);
    const finished=await page.evaluate(async ({remaining})=>{
      const prior=globalThis.getBattleRemainingPL;
      globalThis.getBattleRemainingPL=(side,id)=>{
        if(side==="player"&&id==="academy_metal_lee")return remaining;
        if(side==="enemy"&&id==="metal_origin_inviting_genin")return 0;
        return prior(side,id);
      };
      try{
        currentBattle.outcome={type:"victory",committed:true,completedAt:Date.now(),finishingShinobiId:"academy_metal_lee"};
        currentBattle.battleOver=true;currentBattle.active=false;
        const walletBefore=Math.max(0,Number(playerData.ryo)||0);
        const rewards=generateBattleRewards();
        try{openOverlay("victory");}catch(_error){}
        await new Promise(resolve=>setTimeout(resolve,120));
        const ryoNode=document.querySelector(".victory-ryo-number");
        const victoryProjection=ryoNode?{
          text:String(ryoNode.textContent||"").trim(),
          presentation:ryoNode.dataset.rewardPresentation||null,
          animated:ryoNode.dataset.rewardAnimated||null
        }:null;
        const firstClaim=claimCurrentBattleRewards();
        const walletAfterFirst=Math.max(0,Number(playerData.ryo)||0);
        const secondClaim=claimCurrentBattleRewards();
        const walletAfterSecond=Math.max(0,Number(playerData.ryo)||0);
        const rewardReceipts=(playerData.activityHistory||[]).filter(x=>x&&x.rewardSourceId==="metal_origin_controlled_spar_victory_ryo_01");
        const resumed=resumeBattleCallerAfterCompletion("victory");
        const rt=getActiveStorySceneRuntime();
        const row=(playerData.activityHistory||[]).find(x=>x&&x.occurrenceId==="occ_origin_metal_pressured_performance_resolution");
        return{rewards:JSON.parse(JSON.stringify(rewards||null)),victoryProjection,firstClaim,secondClaim,walletDeltaFirst:walletAfterFirst-walletBefore,walletDeltaSecond:walletAfterSecond-walletBefore,rewardReceiptCount:rewardReceipts.length,rewardReceipt:JSON.parse(JSON.stringify(rewardReceipts[0]||null)),resumed,beatId:rt?.beatId||null,local:JSON.parse(JSON.stringify(rt?.localContext||{})),fact:JSON.parse(JSON.stringify(row?.fact||null))};
      }finally{globalThis.getBattleRemainingPL=prior;}
    },{remaining});
    assert.strictEqual(finished.rewards?.ryo,50,label+" reward projection");
    assert.strictEqual(finished.rewards?.exp,0,label+" reward EXP");
    assert.strictEqual(finished.rewards?.requiresExplicitPostClaimContinue,false,label+" redundant post-claim Continue returned");
    assert.deepStrictEqual(finished.victoryProjection,{text:"50",presentation:"static_earned_amount",animated:"false"},label+" Victory Ryō is not a static earned amount");
    assert.strictEqual(finished.firstClaim,true,label+" first reward claim");
    assert.strictEqual(finished.secondClaim,true,label+" idempotent reward re-claim");
    assert.strictEqual(finished.walletDeltaFirst,50,label+" wallet reward delta");
    assert.strictEqual(finished.walletDeltaSecond,50,label+" duplicate claim duplicated Ryō");
    assert.strictEqual(finished.rewardReceiptCount,1,label+" duplicate reward receipt");
    assert.strictEqual(finished.rewardReceipt?.ryo,50,label+" reward receipt Ryō");
    assert.strictEqual(finished.resumed?.success,true,label+" caller resume");
    assert.strictEqual(finished.beatId,"met_spar_"+expectedClass+"_01",label+" performance route");
    assert.strictEqual(finished.local.metalSparPerformanceClass,expectedClass);
    assert.strictEqual(finished.fact?.pressuredPerformanceClass,expectedClass,label+" MET-02 class");
    assert.strictEqual(finished.fact?.startingUnderlyingMaximum,13,label+" fixed denominator");
    await gate.assertClean(label);
    return{label,battleId:launch.battleId,remaining,expectedClass};
  }finally{await context.close();}
}

async function runIwabeeBattle(browser,outcome){
  const label="iwabee-"+outcome;
  const {context,page,gate}=await boot(browser,label,"academy_iwabee");
  try{
    const launch=await page.evaluate(()=>{
      const set=setStorySceneBeat("iwa_confront_battle",{render:false});
      const battle=launchStorySceneBattle();
      const stage=document.querySelector(".alpha-code-battle-stage.battle2-modern");
      return{set,battle,battleId:currentBattle?.battleId||null,enemy:currentBattle?.enemy?.id||null,template:currentBattle?.oppositionTemplateId||null,environmentPath:currentBattle?.presentationEnvironmentPath||currentBattle?.environmentPath||null,stageEnvironmentPath:stage?.dataset?.battleEnvironmentPath||null,stageBackground:stage?getComputedStyle(stage).backgroundImage:""};
    });
    assert.strictEqual(launch.set?.success,true);
    assert.strictEqual(launch.battle?.success,true,label+" Battle launch "+JSON.stringify(launch));
    assert.strictEqual(launch.enemy,"iwabee_origin_rogue_genin_01");
    assert.strictEqual(launch.environmentPath,"Scene backdrops/academy_training_ground_courtyard.png",label+" authored Battle environment drift");
    assert.strictEqual(launch.stageEnvironmentPath,launch.environmentPath,label+" shared Battle stage did not consume Iwabee Story environment");
    assert(launch.stageBackground.includes("academy_training_ground_courtyard.png"),label+" Iwabee Story environment is not visibly painted "+JSON.stringify(launch));
    assert.strictEqual(launch.template,"rogue_genin");
    const result=await page.evaluate(({outcome})=>{
      const prior=globalThis.getBattleRemainingPL;
      globalThis.getBattleRemainingPL=(side,id)=>{
        if(side==="player"&&id==="academy_iwabee")return outcome==="defeat"?0:5;
        if(side==="enemy"&&id==="iwabee_origin_rogue_genin_01")return outcome==="victory"?0:12;
        return prior(side,id);
      };
      try{
        currentBattle.outcome={type:outcome,committed:true,completedAt:Date.now(),finishingShinobiId:outcome==="victory"?"academy_iwabee":null};
        currentBattle.battleOver=true;currentBattle.active=false;
        const walletBefore=Math.max(0,Number(playerData.ryo)||0);
        const rewards=generateBattleRewards();
        const firstClaim=outcome==="victory"?claimCurrentBattleRewards():null;
        const walletAfterFirst=Math.max(0,Number(playerData.ryo)||0);
        const secondClaim=outcome==="victory"?claimCurrentBattleRewards():null;
        const walletAfterSecond=Math.max(0,Number(playerData.ryo)||0);
        const rewardReceipts=(playerData.activityHistory||[]).filter(x=>x&&x.rewardSourceId==="iwabee_origin_rogue_genin_battle_victory_ryo_01");
        const resumed=resumeBattleCallerAfterCompletion(outcome);
        if(outcome==="defeat"){
          // The frozen natural-voice Story can paginate one authored beat across
          // multiple presentation cues. Advance the real Story until the
          // canonical World consequence commits instead of assuming five clicks.
          for(let i=0;i<24;i++){
            const committed=(playerData.activityHistory||[]).find(x=>x&&x.occurrenceId==="occ_origin_iwabee_rogue_genin_response_resolution");
            if(committed&&committed.fact&&committed.fact.rogueDisposition)break;
            advanceStoryScene();
          }
        }
        const rt=getActiveStorySceneRuntime();
        const row=(playerData.activityHistory||[]).find(x=>x&&x.occurrenceId==="occ_origin_iwabee_rogue_genin_response_resolution");
        return{rewards:JSON.parse(JSON.stringify(rewards||null)),firstClaim,secondClaim,walletDeltaFirst:walletAfterFirst-walletBefore,walletDeltaSecond:walletAfterSecond-walletBefore,rewardReceiptCount:rewardReceipts.length,rewardReceipt:JSON.parse(JSON.stringify(rewardReceipts[0]||null)),resumed,beatId:rt?.beatId||null,local:JSON.parse(JSON.stringify(rt?.localContext||{})),fact:JSON.parse(JSON.stringify(row?.fact||null))};
      }finally{globalThis.getBattleRemainingPL=prior;}
    },{outcome});
    assert.strictEqual(result.resumed?.success,true,label+" caller resume");
    assert.strictEqual(result.rewards?.ryo,outcome==="victory"?50:0,label+" Battle reward projection");
    assert.strictEqual(result.rewards?.exp,0,label+" Battle reward EXP");
    if(outcome==="victory"){
      assert.strictEqual(result.firstClaim,true,label+" first reward claim");
      assert.strictEqual(result.secondClaim,true,label+" idempotent reward re-claim");
      assert.strictEqual(result.walletDeltaFirst,50,label+" wallet reward delta");
      assert.strictEqual(result.walletDeltaSecond,50,label+" duplicate claim duplicated Ryō");
      assert.strictEqual(result.rewardReceiptCount,1,label+" duplicate Iwabee reward receipt");
      assert.strictEqual(result.rewardReceipt?.ryo,50,label+" Iwabee reward receipt Ryō");
      assert.strictEqual(result.rewardReceipt?.rewardSourceId,"iwabee_origin_rogue_genin_battle_victory_ryo_01",label+" Iwabee reward source");

      assert.strictEqual(result.fact?.rogueDisposition,"DETAINED_AFTER_ROGUE_BATTLE_WITHDRAWAL");
      assert.strictEqual(result.fact?.custodyState,"TEMPORARY_INSTRUCTOR_DETENTION");
      assert.strictEqual(result.fact?.instructorIntervention,"SECURE_WITHDRAWN_ROGUE");
      assert.strictEqual(result.fact?.rogueBattleWithdrawn,true);
    }else{
      assert.strictEqual(result.fact?.rogueDisposition,"ESCAPED_AFTER_IWABEE_WITHDRAWAL");
      assert.strictEqual(result.fact?.custodyState,"NONE");
      assert.strictEqual(result.fact?.instructorIntervention,"PROTECT_WITHDRAWN_STUDENT_NO_PURSUIT");
      assert.strictEqual(result.fact?.iwabeeBattleWithdrawn,true);
    }
    assert.strictEqual(result.fact?.earthReleaseUsedToConstrainRogueGenin,false);
    assert.strictEqual(result.fact?.originFailure,false);
    assert.strictEqual(result.fact?.injuryInferred,false);
    assert.strictEqual(result.fact?.deathInferred,false);
    await gate.assertClean(label);
    return{label,battleId:launch.battleId,disposition:result.fact.rogueDisposition};
  }finally{await context.close();}
}

async function runIwabeeWorldBranch(browser,beatId,expected){
  const label="iwabee-world-"+beatId;
  const {context,page,gate}=await boot(browser,label,"academy_iwabee");
  try{
    const row=await page.evaluate(({beatId})=>{
      const first=setStorySceneBeat(beatId,{render:false});
      const second=setStorySceneBeat(beatId,{render:false});
      const rows=(playerData.activityHistory||[]).filter(x=>x&&x.occurrenceId==="occ_origin_iwabee_rogue_genin_response_resolution");
      const r=rows[0]||null;
      return{first,second,receiptCount:rows.length,fact:JSON.parse(JSON.stringify(r?.fact||null))};
    },{beatId});
    assert.strictEqual(row.first?.success,true,label+" first set return beat");
    assert.strictEqual(row.second?.success,true,label+" idempotent re-entry");
    assert.strictEqual(row.receiptCount,1,label+" duplicated World disposition receipt");
    assert(row.fact,label+" missing World occurrence");
    for(const [key,value] of Object.entries(expected))assert.deepStrictEqual(row.fact[key],value,label+" "+key);
    await gate.assertClean(label);
    return{label,disposition:row.fact.rogueDisposition};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  const results=[];
  try{
    {
      const {context,page,gate}=await boot(browser,"diagnostics");
      const d=await diagnostics(page);
      assert.strictEqual(d.metal.pass,true,JSON.stringify(d.metal,null,2));
      assert.strictEqual(d.rogue.pass,true,JSON.stringify(d.rogue,null,2));
      assert.strictEqual(d.iwabee.pass,true,JSON.stringify(d.iwabee,null,2));
      assert.strictEqual(d.names.pass,true,JSON.stringify(d.names,null,2));
      for(const [owner,map] of Object.entries(NAMES))for(const [id,label] of Object.entries(map)){
        const row=d.rows[owner][id];
        assert.strictEqual(row.id,id,id+" stable ID drift");
        assert.strictEqual(row.owner,owner,id+" owner drift");
        assert.strictEqual(row.displayName,label,id+" displayName drift");
        assert.strictEqual(row.uiTitle,label,id+" Battle UI title drift");
      }
      assert.strictEqual(d.rows.academy_iwabee.academy_iwabee_stone_snare.displayName,"Earth Style: Stone Grasp");
      await page.screenshot({path:path.join(OUT,"loaded-diagnostics.png"),fullPage:false});
      await gate.assertClean("diagnostics");
      await context.close();
      results.push({diagnostics:true,skillNames:40});
    }

    results.push(await runMetalBattle(browser,8,"strong"));
    results.push(await runMetalBattle(browser,5,"mixed"));
    results.push(await runMetalBattle(browser,2,"rough"));

    {
      const {context,page,gate}=await boot(browser,"metal-met03","academy_metal_lee");
      const met03=await page.evaluate(()=>{
        const fresh={
          redirect:resolveAcademyMetalProtectiveResponse396("redirect_dummy"),
          impact:resolveAcademyMetalProtectiveResponse396("take_impact"),
          destroy:resolveAcademyMetalProtectiveResponse396("destroy_dummy")
        };
        const original=globalThis.getDevelopedEffectiveCharacterStats;
        const synthetic={};
        try{
          const run=(key,kind,tai,stamina)=>{
            globalThis.getDevelopedEffectiveCharacterStats=()=>({tai,stamina});
            synthetic[key]=resolveAcademyMetalProtectiveResponse396(kind);
          };
          run("redirect_success","redirect_dummy",14,0);
          run("redirect_partial","redirect_dummy",11,0);
          run("redirect_failure","redirect_dummy",10,0);
          run("impact_success","take_impact",0,14);
          run("impact_partial","take_impact",0,11);
          run("impact_failure","take_impact",0,10);
          run("destroy_success","destroy_dummy",15,0);
          run("destroy_partial","destroy_dummy",12,0);
          run("destroy_failure","destroy_dummy",11,0);
        }finally{
          globalThis.getDevelopedEffectiveCharacterStats=original;
        }
        const first=setStorySceneBeat("met_resolve_redirect",{render:false});
        const firstBeat=getActiveStorySceneRuntime()?.beatId||null;
        const firstRoute=advanceStoryScene();
        const firstRoutedBeat=getActiveStorySceneRuntime()?.beatId||null;
        const countAfterFirst=(playerData.activityHistory||[]).filter(x=>x&&x.occurrenceId==="occ_origin_metal_protective_response_resolution").length;
        const second=setStorySceneBeat("met_resolve_redirect",{render:false});
        const secondBeat=getActiveStorySceneRuntime()?.beatId||null;
        const secondRoute=advanceStoryScene();
        const secondRoutedBeat=getActiveStorySceneRuntime()?.beatId||null;
        const countAfterSecond=(playerData.activityHistory||[]).filter(x=>x&&x.occurrenceId==="occ_origin_metal_protective_response_resolution").length;
        const receipt=(playerData.activityHistory||[]).find(x=>x&&x.occurrenceId==="occ_origin_metal_protective_response_resolution");
        return{fresh,synthetic,first,firstBeat,firstRoute,firstRoutedBeat,countAfterFirst,second,secondBeat,secondRoute,secondRoutedBeat,countAfterSecond,receipt:JSON.parse(JSON.stringify(receipt?.fact||null))};
      });
      assert.strictEqual(met03.fresh.redirect.protectiveResponseOutcome,"partial");
      assert.strictEqual(met03.fresh.impact.protectiveResponseOutcome,"success");
      assert.strictEqual(met03.fresh.destroy.protectiveResponseOutcome,"partial");
      assert.strictEqual(met03.fresh.redirect.interventionParticipantRef,"metal_origin_inviting_genin");
      assert.strictEqual(met03.fresh.redirect.interventionRequired,true);
      assert.strictEqual(met03.fresh.impact.interventionRequired,false);
      assert.strictEqual(met03.fresh.impact.interventionParticipantRef,null);
      assert.strictEqual(met03.fresh.redirect.attempted,true);
      for(const key of ["redirect","impact","destroy"]){
        assert.strictEqual(met03.synthetic[key+"_success"].protectiveResponseOutcome,"success",key+" success threshold");
        assert.strictEqual(met03.synthetic[key+"_partial"].protectiveResponseOutcome,"partial",key+" partial threshold");
        assert.strictEqual(met03.synthetic[key+"_failure"].protectiveResponseOutcome,"failure",key+" failure threshold");
      }
      assert.strictEqual(met03.first?.success,true);
      assert.strictEqual(met03.firstBeat,"met_resolve_redirect","MET-03 authored action beat was skipped");
      assert.strictEqual(met03.firstRoute?.success,true,"MET-03 internal outcome route failed");
      assert.strictEqual(met03.firstRoutedBeat,"met_redirect_partial_01");
      assert.strictEqual(met03.countAfterFirst,1);
      assert.strictEqual(met03.second?.success,true);
      assert.strictEqual(met03.secondBeat,"met_resolve_redirect","MET-03 re-entry did not restore authored action beat");
      assert.strictEqual(met03.secondRoute?.success,true,"MET-03 re-entry outcome route failed");
      assert.strictEqual(met03.secondRoutedBeat,"met_redirect_partial_01");
      assert.strictEqual(met03.countAfterSecond,1,"MET-03 receipt duplicated on re-entry");
      assert.strictEqual(met03.receipt?.attempted,true);
      assert.strictEqual(met03.receipt?.protectiveResponseKind,"redirect_dummy");
      assert.strictEqual(met03.receipt?.protectiveResponseOutcome,"partial");
      assert.strictEqual(met03.receipt?.interventionRequired,true);
      assert.strictEqual(met03.receipt?.interventionParticipantRef,"metal_origin_inviting_genin");
      await gate.assertClean("metal-met03");
      await context.close();
      results.push({met03});
    }

    {
      const {context,page,gate}=await boot(browser,"metal-save-reload","academy_metal_lee");
      const proof=await page.evaluate(()=>{
        const set=setStorySceneBeat("met_spar_battle",{render:false});
        const battle=launchStorySceneBattle();
        if(!set?.success||!battle?.success)return{set,battle};
        const genin="metal_origin_inviting_genin";
        const runtime=ensureBattleRuntimeState();
        runtime.actionOpportunityState=runtime.actionOpportunityState||{counters:{player:{},enemy:{}},startedTokens:{}};
        runtime.actionOpportunityState.counters=runtime.actionOpportunityState.counters||{player:{},enemy:{}};
        runtime.actionOpportunityState.counters.enemy=runtime.actionOpportunityState.counters.enemy||{};
        runtime.actionOpportunityState.counters.enemy[genin]=4;
        const existing=findBattleTransientState({stateKey:"metal_origin_inviting_genin_feint_entry_ready",sourceSide:"enemy",sourceParticipantId:genin,targetSide:"enemy",targetParticipantId:genin});
        if(existing)removeBattleTransientState(existing.stateId);
        const state=addBattleTransientState({
          stateKey:"metal_origin_inviting_genin_feint_entry_ready",
          sourceSide:"enemy",sourceParticipantId:genin,targetSide:"enemy",targetParticipantId:genin,
          ownerRef:{type:"skill",id:"metal_origin_inviting_genin_feint_entry"},
          data:{sourceSkillId:"metal_origin_inviting_genin_feint_entry",feedsSkillId:"metal_origin_inviting_genin_committed_lunge",refreshReplace:true}
        });
        const beforeIndex=getBattleActionOpportunityIndex("enemy",genin);
        saveTestState();
        runtime.actionOpportunityState.counters.enemy[genin]=0;
        if(state)removeBattleTransientState(state.stateId);
        const restored=restoreTestState();
        const afterIndex=getBattleActionOpportunityIndex("enemy",genin);
        const restoredState=findBattleTransientState({stateKey:"metal_origin_inviting_genin_feint_entry_ready",sourceSide:"enemy",sourceParticipantId:genin,targetSide:"enemy",targetParticipantId:genin});
        const eligible=(enemyDatabase[genin]?.authoredBattleActions||[]).filter(Boolean);
        const choice=chooseEnemyAuthoredBattleAction({ready:true,enemyId:genin,eligibleActions:eligible});
        return{
          set,battle,restored,beforeIndex,afterIndex,
          restoredStateKey:restoredState?.stateKey||null,
          nextActionId:choice?.action?.id||null,
          battleId:currentBattle?.battleId||null
        };
      });
      assert.strictEqual(proof.set?.success,true,"Metal reload proof set Battle beat");
      assert.strictEqual(proof.battle?.success,true,"Metal reload proof launch");
      assert.strictEqual(proof.beforeIndex,4,"Metal pre-save deterministic action index");
      assert.strictEqual(proof.afterIndex,4,"Metal save/reload changed deterministic action index");
      assert.strictEqual(proof.restoredStateKey,"metal_origin_inviting_genin_feint_entry_ready","Metal Feint Entry transient did not restore");
      assert.strictEqual(proof.nextActionId,"metal_origin_inviting_genin_committed_lunge","Metal restored next AI action drift");
      await gate.assertClean("metal-save-reload");
      await context.close();
      results.push({metalSaveReload:proof});
    }

    results.push(await runIwabeeBattle(browser,"victory"));
    results.push(await runIwabeeBattle(browser,"defeat"));
    results.push(await runIwabeeWorldBranch(browser,"iwa_block_return_01",{
      rogueDisposition:"SURRENDERED_AFTER_EARTH_ROUTE_CONSTRAINT",
      academyInstructorRef:"iwabee_origin_practical_instructor_01",
      custodyState:"TEMPORARY_INSTRUCTOR_DETENTION",
      instructorIntervention:"ACCEPT_SURRENDER_AND_SECURE",
      earthReleaseUsedToConstrainRogueGenin:true,
      alternateEscapeRouteAvailable:false,
      followupBattleOccurred:false
    }));
    results.push(await runIwabeeWorldBranch(browser,"iwa_call_05",{
      rogueDisposition:"ESCAPED_AFTER_INSTRUCTOR_ESCALATION",
      academyInstructorRef:"iwabee_origin_practical_instructor_01",
      custodyState:"NONE",
      instructorIntervention:"SHIELD_STUDENTS_NO_PURSUIT",
      earthReleaseUsedToConstrainRogueGenin:false
    }));
    results.push(await runIwabeeWorldBranch(browser,"iwa_finish_05",{
      rogueDisposition:"ESCAPED_WHILE_IWABEE_FINISHED_PRACTICAL",
      academyInstructorRef:"iwabee_origin_practical_instructor_01",
      custodyState:"NONE",
      instructorIntervened:false,
      instructorIntervention:"NONE",
      earthReleaseUsedToConstrainRogueGenin:false
    }));

    const summary={
      pass:true,issues:[396,399,400],kind:"installed_browser_origin_runtime_handoffs",
      buildId:BUILD.buildId,
      checks:{
        exactFortyDisplayNamesReachBattleUI:true,
        metalExactPL15Opponent:true,
        metalStrongMixedRoughRuntimeRouting:true,
        metalFixed13Denominator:true,
        metalMet03FreshBaseOutcomes:true,
        metalMet03SyntheticThresholdMatrix:true,
        metalMet03IdempotentReceipt:true,
        metalSaveReloadRestoresNextAIAndFeint:true,
        iwabeeHistoricalRogueSeparatedFromTemplate:true,
        iwabeeVictoryDetention:true,
        iwabeeDefeatEscapeBridge:true,
        iwabeeBlockSurrender:true,
        iwabeeCallEscape:true,
        iwabeeFinishEscape:true,
        iwabeeDispositionReentryIdempotent:true,
        browserRuntimeErrorGateClean:true
      },
      results,browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n");
    console.log(JSON.stringify(summary,null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
