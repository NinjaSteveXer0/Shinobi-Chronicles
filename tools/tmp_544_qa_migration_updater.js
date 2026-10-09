#!/usr/bin/env node
"use strict";

const fs=require("fs");

function replaceOnce(path,before,after,label){
  const src=fs.readFileSync(path,"utf8");
  const first=src.indexOf(before);
  if(first<0)throw new Error(label+": source anchor missing in "+path);
  if(src.indexOf(before,first+1)>=0)throw new Error(label+": source anchor is not unique in "+path);
  fs.writeFileSync(path,src.slice(0,first)+after+src.slice(first+before.length));
  console.log("UPDATED "+label+" -> "+path);
}

// #399 browser QA: use the real Battle completion owner for Iwabee Victory
// instead of fabricating a terminal currentBattle state and then asking #544
// to restore a caller that the Battle owner never completed.
replaceOnce(
  "tools/qa_issues_396_399_400_browser.js",
`        }else{\n          currentBattle.outcome={type:"victory",committed:true,completedAt:Date.now(),finishingShinobiId:"academy_iwabee"};\n          currentBattle.battleOver=true;currentBattle.active=false;\n        }`,
`        }else{\n          const actionId="qa396_iwabee_finisher";\n          setBattleRemainingPL("enemy","iwabee_origin_rogue_genin_01",0);\n          const iwabee=getBattleParticipantByIdentity("player","academy_iwabee");\n          const envelope={\n            actionId,\n            actorRef:createBattleParticipantRef("player","academy_iwabee"),\n            targetRef:createBattleParticipantRef("enemy","iwabee_origin_rogue_genin_01")\n          };\n          handleBattleParticipantAtZeroPL("enemy","iwabee_origin_rogue_genin_01",iwabee,envelope);\n        }`,
  "iwabee-authoritative-victory"
);

// #362 browser QA: the player-facing terminal surface is now owned by #544,
// not direct legacy openOverlay("victory").
replaceOnce(
  "tools/qa_issue_362_menma_reward_browser.js",
`    await page.evaluate(()=>openOverlay("victory"));\n    await page.waitForSelector(".alpha-victory-code-screen",{state:"visible",timeout:8000});`,
`    await page.evaluate(()=>{\n      try{globalThis.hardSettleBattlePresentationQueue33000?.("issue_362_reward_victory");}catch(_error){}\n      return globalThis.presentCommittedBattleTerminalResult54400?.("victory",{source:"issue_362_reward_victory"});\n    });\n    await page.waitForSelector(".alpha-victory-code-screen,.victory-screen",{state:"visible",timeout:8000});`,
  "menma-544-victory-presentation"
);

// Kakashi helper: all ordinary synthetic route fixtures must cross the visible
// terminal-result owner and then use the explicit Continue seam. CLAIM remains
// distinct from CONTINUE when a Victory reward is still unclaimed.
replaceOnce(
  "tools/qa_kakashi_v2_browser.js",
`      try{\n        currentBattle.outcome={...(currentBattle.outcome||{}),type:outcome,completedAt:Date.now(),finishingShinobiId:outcome==="victory"?"academy_kakashi":null};\n        currentBattle.battleOver=true;\n        currentBattle.active=false;\n        return resumeBattleCallerAfterCompletion(outcome);\n      }finally{\n        globalThis.getBattleActionOpportunityIndex=prior;\n      }`,
`      try{\n        currentBattle.outcome={...(currentBattle.outcome||{}),type:outcome,committed:true,completedAt:Date.now(),finishingShinobiId:outcome==="victory"?"academy_kakashi":null};\n        currentBattle.battleOver=true;\n        currentBattle.active=false;\n        try{globalThis.hardSettleBattlePresentationQueue33000?.("kakashi_v2_route_fixture_terminal_result");}catch(_error){}\n        const presented=globalThis.presentCommittedBattleTerminalResult54400?.(outcome,{source:"kakashi_v2_route_fixture"});\n        if(!(presented&&presented.success===true))return presented||{success:false,reason:"terminal_result_presentation_failed"};\n        let continued=outcome==="victory"?continueAfterVictory():globalThis.continueAfterSetback54400?.();\n        if(outcome==="victory"&&continued&&continued.callerResumeWithheldUntilExplicitContinue===true){\n          continued=continueAfterVictory();\n        }\n        return continued;\n      }finally{\n        globalThis.getBattleActionOpportunityIndex=prior;\n      }`,
  "kakashi-helper-explicit-terminal-continue"
);

const standaloneBefore=`  const resumed=await page.evaluate(()=>{\n    currentBattle.outcome={type:"victory",completedAt:Date.now(),finishingShinobiId:"academy_kakashi"};\n    currentBattle.battleOver=true;\n    currentBattle.active=false;\n    return resumeBattleCallerAfterCompletion("victory");\n  });`;
const standaloneAfter=`  const resumed=await page.evaluate(()=>{\n    currentBattle.outcome={type:"victory",committed:true,completedAt:Date.now(),finishingShinobiId:"academy_kakashi"};\n    currentBattle.battleOver=true;\n    currentBattle.active=false;\n    try{globalThis.hardSettleBattlePresentationQueue33000?.("kakashi_v2_standalone_terminal_result");}catch(_error){}\n    const presented=globalThis.presentCommittedBattleTerminalResult54400?.("victory",{source:"kakashi_v2_standalone_fixture"});\n    if(!(presented&&presented.success===true))return presented||{success:false,reason:"terminal_result_presentation_failed"};\n    let continued=continueAfterVictory();\n    if(continued&&continued.callerResumeWithheldUntilExplicitContinue===true)continued=continueAfterVictory();\n    return continued;\n  });`;
{
  const path="tools/qa_kakashi_v2_browser.js";
  let src=fs.readFileSync(path,"utf8");
  const matches=src.split(standaloneBefore).length-1;
  if(matches!==2)throw new Error("kakashi-standalone-explicit-terminal-continue: expected 2 anchors, found "+matches);
  src=src.split(standaloneBefore).join(standaloneAfter);
  fs.writeFileSync(path,src);
  console.log("UPDATED kakashi-standalone-explicit-terminal-continue x2 -> "+path);
}

console.log("#544 bounded QA migration updater complete");
