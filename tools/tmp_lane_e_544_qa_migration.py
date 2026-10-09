from pathlib import Path


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected snippet once, found {count}")
    p.write_text(text.replace(old, new, 1), encoding="utf-8")


def replace_between(path, start, end, new):
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    if text.count(start) != 1 or text.count(end) != 1:
        raise SystemExit(f"{path}: markers not unique")
    a = text.index(start)
    b = text.index(end, a)
    p.write_text(text[:a] + new + text[b:], encoding="utf-8")


# #141: migrate synthetic return fixture to present -> claim -> explicit Continue.
p = "tools/qa_issue_141_arc1_battle_return_runtime.js"
replace_once(
    p,
    '    globalThis.__issue141LegacyContinueCalls=0;\n    globalThis.__issue141OverlayCalls=[];',
    '    globalThis.__issue141LegacyContinueCalls=0;\n    globalThis.__issue141RewardClaimCalls=0;\n    globalThis.__issue141OverlayCalls=[];'
)
replace_once(
    p,
    '''    continueAfterVictory=function(){
      globalThis.__issue141LegacyContinueCalls += 1;
      return {success:true,legacy:true};
    };
    openOverlay=function(type){''',
    '''    continueAfterVictory=function(){
      globalThis.__issue141LegacyContinueCalls += 1;
      return {success:true,legacy:true};
    };
    claimCurrentBattleRewards=function(){
      globalThis.__issue141RewardClaimCalls += 1;
      if(!currentBattle||!currentBattle.rewards)return false;
      currentBattle.rewards.claimed=true;
      return true;
    };
    openOverlay=function(type){'''
)
replace_once(p, '"54400_canonical_terminal_owner_loaded"', '"54400_terminal_candidate_loaded"')
replace_between(
    p,
    '''  // Exact Story caller victory must outrank the legacy fallback after rewards
  // have been claimed. No mission-specific outcome is fabricated here.
''',
    '''  // A broken authored Story continuation must fail closed on Victory. It must
''',
    '''  // Victory must present before CLAIM; CLAIM must stop before caller resume;
  // the later explicit Continue restores the exact Story caller once.
  const victory = plain(run(`
    currentBattle={
      active:false,battleOver:true,
      outcome:{type:"victory"},
      rewards:{claimed:false},
      returnContext:{type:"story_scene",missionId:"fixture_mission",sceneId:"fixture_scene"}
    };
    const presented=presentCommittedBattleTerminalResult54400("victory",{source:"issue141_runtime_qa"});
    const projectionBeforeClaim=getBattleTerminalResultPresentation54400();
    const claimOnly=continueAfterVictory();
    const callerAfterClaim=currentBattle.returnContext;
    const returnCallsAfterClaim=globalThis.__issue141ReturnCalls.slice();
    const continued=continueAfterVictory();
    ({presented,projectionBeforeClaim,claimOnly,callerAfterClaim,returnCallsAfterClaim,continued});
  `, "issue141-victory-return.js"));
  const victoryCalls = plain(context.__issue141ReturnCalls);
  check(
    "story_victory_claim_then_explicit_continue",
    victory && victory.projectionBeforeClaim && victory.projectionBeforeClaim.status === "presented" &&
      victory.claimOnly && victory.claimOnly.success === true && victory.claimOnly.rewardClaimed === true &&
      victory.claimOnly.callerResumeWithheldUntilExplicitContinue === true &&
      victory.callerAfterClaim && victory.callerAfterClaim.type === "story_scene" &&
      victory.returnCallsAfterClaim.length === 0 &&
      victory.continued && victory.continued.success === true && victory.continued.terminalResultOwner54400 === true &&
      victory.continued.terminalOutcome === "victory" && victoryCalls.length === 1 && victoryCalls[0] === "victory" &&
      context.__issue141RewardClaimCalls === 1 && context.__issue141LegacyContinueCalls === 0,
    { victory, victoryCalls, rewardClaimCalls:context.__issue141RewardClaimCalls, legacyCalls:context.__issue141LegacyContinueCalls }
  );

'''
)
replace_once(
    p,
    '''    const result=continueAfterVictory();
    const attemptedReturnCalls=globalThis.__issue141ReturnCalls.slice(returnCallsBefore.length);''',
    '''    presentCommittedBattleTerminalResult54400("victory",{source:"issue141_runtime_qa_failure"});
    const result=continueAfterVictory();
    const attemptedReturnCalls=globalThis.__issue141ReturnCalls.slice(returnCallsBefore.length);'''
)
replace_between(
    p,
    '''  // Without claimed rewards, #544 must delegate to the predecessor lifecycle;
  // it must not consume the Story return itself.
''',
    '''  // Setback is first projected from the already-committed factual defeat, then
''',
    '''  // A fresh unclaimed Victory is a claim-only action. It must preserve the
  // caller envelope and must not satisfy the later explicit Continue.
  const unclaimed = plain(run(`
    const callsBefore=globalThis.__issue141ReturnCalls.length;
    currentBattle={
      active:false,battleOver:true,
      outcome:{type:"victory"},
      rewards:{claimed:false},
      returnContext:{type:"story_scene",missionId:"fixture_mission",sceneId:"fixture_scene"}
    };
    presentCommittedBattleTerminalResult54400("victory",{source:"issue141_runtime_qa_claim_only"});
    const result=continueAfterVictory();
    ({result,caller:currentBattle.returnContext,returnCallsAdded:globalThis.__issue141ReturnCalls.length-callsBefore});
  `, "issue141-unclaimed-return.js"));
  check(
    "unclaimed_victory_claims_without_story_return",
    unclaimed && unclaimed.result && unclaimed.result.success === true && unclaimed.result.rewardClaimed === true &&
      unclaimed.result.callerResumeWithheldUntilExplicitContinue === true && unclaimed.caller &&
      unclaimed.caller.type === "story_scene" && unclaimed.returnCallsAdded === 0 && context.__issue141LegacyContinueCalls === 0,
    { unclaimed, returnCalls: plain(context.__issue141ReturnCalls), legacyCalls: context.__issue141LegacyContinueCalls }
  );

'''
)

# #105/#442: Mirai Victory uses the same explicit result Continue as defeat.
p = "tools/qa_issue_105_origin_presentation_browser.js"
replace_once(
    p,
    '''    }else{
      assert.strictEqual(returned.result?.success,true,"Mirai #338 caller return failed "+JSON.stringify(returned));
    }
    assert.strictEqual(returned.beatId,expectedReturnBeat,"Mirai #338 caller returned to wrong Story beat "+JSON.stringify(returned));''',
    '''    }else{
      assert.strictEqual(returned.result?.callerResumeWithheldUntilTerminalResultContinue,true,"Mirai victory bypassed #544 terminal presentation guard "+JSON.stringify(returned));
      await page.waitForSelector(".alpha-victory-code-screen,.victory-screen",{state:"visible",timeout:12000});
      const gate=await page.evaluate(()=>({overlay:typeof currentOverlayType==="undefined"?null:currentOverlayType,outcome:currentBattle?.outcome?.type||null}));
      assert.strictEqual(gate.outcome,"victory","Mirai Victory surface mutated terminal outcome");
      const continued=await page.evaluate(()=>globalThis.continueAfterVictory?.());
      assert.strictEqual(continued?.success,true,"Victory Continue authority failed "+JSON.stringify(continued));
      await page.waitForFunction(expected=>globalThis.getActiveStorySceneRuntime?.()?.beatId===expected,expectedReturnBeat,{timeout:12000});
      returned={...returned,result:continued,beatId:await page.evaluate(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId||null)};
    }
    assert.strictEqual(returned.beatId,expectedReturnBeat,"Mirai #338 caller returned to wrong Story beat "+JSON.stringify(returned));'''
)

# #396/#399/#400: Metal Victory caller resume belongs to explicit #544 Continue.
p = "tools/qa_issues_396_399_400_browser.js"
replace_once(
    p,
    '''        const resumed=resumeBattleCallerAfterCompletion("victory");
        const rt=getActiveStorySceneRuntime();''',
    '''        const earlyResume=resumeBattleCallerAfterCompletion("victory");
        const resumed=continueAfterVictory();
        const rt=getActiveStorySceneRuntime();'''
)
replace_once(
    p,
    '''        return{rewards:JSON.parse(JSON.stringify(rewards||null)),victoryProjection,firstClaim,secondClaim,walletDeltaFirst:walletAfterFirst-walletBefore,walletDeltaSecond:walletAfterSecond-walletBefore,rewardReceiptCount:rewardReceipts.length,rewardReceipt:JSON.parse(JSON.stringify(rewardReceipts[0]||null)),resumed,beatId:rt?.beatId||null,local:JSON.parse(JSON.stringify(rt?.localContext||{})),fact:JSON.parse(JSON.stringify(row?.fact||null))};''',
    '''        return{rewards:JSON.parse(JSON.stringify(rewards||null)),victoryProjection,firstClaim,secondClaim,walletDeltaFirst:walletAfterFirst-walletBefore,walletDeltaSecond:walletAfterSecond-walletBefore,rewardReceiptCount:rewardReceipts.length,rewardReceipt:JSON.parse(JSON.stringify(rewardReceipts[0]||null)),earlyResume,resumed,beatId:rt?.beatId||null,local:JSON.parse(JSON.stringify(rt?.localContext||{})),fact:JSON.parse(JSON.stringify(row?.fact||null))};'''
)
replace_once(
    p,
    '    assert.strictEqual(finished.resumed?.success,true,label+" caller resume");',
    '    assert.strictEqual(finished.earlyResume?.callerResumeWithheldUntilTerminalResultContinue,true,label+" early caller resume was not withheld");\n    assert.strictEqual(finished.resumed?.success,true,label+" explicit Victory Continue caller resume");'
)

# #362: after durable receipt rehydrate, present terminal Victory before explicit Continue.
p = "tools/qa_issue_362_menma_reward_browser.js"
replace_once(
    p,
    '''    // CLAIM is complete before Story return; CONTINUE resumes exact Menma Story.
    const returned=await page.evaluate(()=>continueAfterVictory());
    await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId==="menma_after_01",SCENE,{timeout:10000});''',
    '''    // CLAIM is complete before Story return; present Victory, then explicit CONTINUE resumes exact Menma Story.
    await page.evaluate(()=>{
      try{globalThis.hardSettleBattlePresentationQueue33000?.("issue_362_terminal_result");}catch(_error){}
      return globalThis.presentCommittedBattleTerminalResult54400?.("victory",{source:"issue_362_reward_reload"});
    });
    await page.waitForSelector(".alpha-victory-code-screen,.victory-screen",{state:"visible",timeout:12000});
    const returned=await page.evaluate(()=>continueAfterVictory());
    assert.strictEqual(returned?.success,true,"Menma explicit Victory Continue failed "+JSON.stringify(returned));
    await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId==="menma_after_01",SCENE,{timeout:10000});'''
)

# #312 browser: synthetic PS terminal probe must actually commit terminal Battle state and enter #544.
p = "tools/qa_issue_312_browser.js"
replace_once(p, 'const psVictoryOverlay=await page.evaluate(()=>{', 'const psVictoryOverlay=await page.evaluate(async()=>{')
replace_once(
    p,
    '''        encounterId:currentBattle.encounterId,
        outcome:currentBattle.outcome?cloneBattleRuntimeValue(currentBattle.outcome):null,
        rewards:currentBattle.rewards?cloneBattleRuntimeValue(currentBattle.rewards):null
      };''',
    '''        encounterId:currentBattle.encounterId,
        active:currentBattle.active,
        battleOver:currentBattle.battleOver,
        outcome:currentBattle.outcome?cloneBattleRuntimeValue(currentBattle.outcome):null,
        rewards:currentBattle.rewards?cloneBattleRuntimeValue(currentBattle.rewards):null
      };'''
)
replace_once(
    p,
    '''      currentBattle.encounterId="academy_kakashi_origin_battle_seq_ps";
      currentBattle.outcome={type:"victory",completedAt:Date.now(),finishingShinobiId:"academy_kakashi"};
      currentBattle.rewards={generated:true,claimed:false,ryo:0,exp:0,items:[],rareDrops:[]};
      openOverlay("victory");
      const text=String(document.getElementById("screen-overlay")?.textContent||"").replace(/\\s+/g," ").trim();''',
    '''      currentBattle.encounterId="academy_kakashi_origin_battle_seq_ps";
      currentBattle.active=false;currentBattle.battleOver=true;
      currentBattle.outcome={type:"victory",completedAt:Date.now(),finishingShinobiId:"academy_kakashi"};
      currentBattle.rewards={generated:true,claimed:false,ryo:0,exp:0,items:[],rareDrops:[]};
      try{delete currentBattle.__battleTerminalResultPresentation54400;}catch(_error){}
      presentCommittedBattleTerminalResult54400("victory",{source:"issue312_ps_reward_overlay"});
      await new Promise(resolve=>setTimeout(resolve,80));
      const text=String(document.getElementById("screen-overlay")?.textContent||"").replace(/\\s+/g," ").trim();'''
)
replace_once(
    p,
    '''      currentBattle.encounterId=prior.encounterId;
      currentBattle.outcome=prior.outcome;
      currentBattle.rewards=prior.rewards;
      openOverlay("combat");''',
    '''      currentBattle.encounterId=prior.encounterId;
      currentBattle.active=prior.active;currentBattle.battleOver=prior.battleOver;
      currentBattle.outcome=prior.outcome;
      currentBattle.rewards=prior.rewards;
      try{delete currentBattle.__battleTerminalResultPresentation54400;}catch(_error){}
      openOverlay("combat");'''
)

print("Lane E #544 QA migration replacements applied")
