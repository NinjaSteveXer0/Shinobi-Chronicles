#!/usr/bin/env node
"use strict";
const fs=require("fs");
const path="tools/qa_issue_343_wasabi_browser.js";
let src=fs.readFileSync(path,"utf8");
function once(before,after,label){
  const n=src.split(before).length-1;
  if(n!==1)throw new Error(`${label}: expected 1 anchor, found ${n}`);
  src=src.replace(before,after);
  console.log(`UPDATED ${label}`);
}
once(
'  const result=await page.evaluate(({outcome,wasabi,rogue})=>{',
'  const result=await page.evaluate(async({outcome,wasabi,rogue})=>{',
'Wasabi terminal evaluate async'
);
once(
`      let projected=null,firstClaim=null,secondClaim=null;\n      if(outcome==="victory"){\n        projected=JSON.parse(JSON.stringify(generateBattleRewards(enemyDatabase[rogue],getPlayerCharacter(wasabi))));\n        firstClaim=claimCurrentBattleRewards();\n        secondClaim=claimCurrentBattleRewards();\n      }\n      const ryoAfter=Number(playerData.ryo)||0;\n      const receipts=(playerData.activityHistory||[]).filter(row=>row&&row.rewardSourceId==="wasabi_origin_rogue_genin_battle_victory_ryo_01").map(row=>JSON.parse(JSON.stringify(row)));\n      const resumed=resumeBattleCallerAfterCompletion(outcome);\n      return{...resumed,rewardAudit:{ryoBefore,ryoAfter,projected,firstClaim,secondClaim,receipts}};`,
`      let projected=null,firstClaim=null,secondClaim=null,terminalPresented=null,victoryVisible=false;\n      if(outcome==="victory"){\n        projected=JSON.parse(JSON.stringify(generateBattleRewards(enemyDatabase[rogue],getPlayerCharacter(wasabi))));\n        try{globalThis.hardSettleBattlePresentationQueue33000?.("qa343_wasabi_victory_terminal_result");}catch(_error){}\n        terminalPresented=globalThis.presentCommittedBattleTerminalResult54400?.("victory",{source:"qa343_wasabi_victory"})||null;\n        await Promise.resolve();\n        const victoryNode=document.querySelector(".alpha544-victory");\n        victoryVisible=!!(victoryNode&&victoryNode.getClientRects().length>0&&getComputedStyle(victoryNode).display!=="none"&&getComputedStyle(victoryNode).visibility!=="hidden");\n        const claimAction=continueAfterVictory();\n        firstClaim=!!(claimAction&&claimAction.success===true&&currentBattle?.rewards?.claimed===true);\n        secondClaim=claimCurrentBattleRewards();\n      }\n      const ryoAfter=Number(playerData.ryo)||0;\n      const receipts=(playerData.activityHistory||[]).filter(row=>row&&row.rewardSourceId==="wasabi_origin_rogue_genin_battle_victory_ryo_01").map(row=>JSON.parse(JSON.stringify(row)));\n      const resumed=outcome==="victory"?continueAfterVictory():resumeBattleCallerAfterCompletion(outcome);\n      return{...resumed,terminalPresented:JSON.parse(JSON.stringify(terminalPresented||null)),victoryVisible,rewardAudit:{ryoBefore,ryoAfter,projected,firstClaim,secondClaim,receipts}};`,
'Wasabi Victory CLAIM/CONTINUE chronology'
);
once(
`  if(outcome==="victory"){\n    assert.strictEqual(result.rewardAudit.projected?.ryo,50,label+" Victory projection amount drift");`,
`  if(outcome==="victory"){\n    assert.strictEqual(result.terminalPresented?.success,true,label+" committed Victory was not accepted by #544 presenter");\n    assert.strictEqual(result.victoryVisible,true,label+" Victory surface was not visible before CLAIM");\n    assert.strictEqual(result.rewardAudit.projected?.ryo,50,label+" Victory projection amount drift");`,
'Wasabi visible Victory assertion'
);
fs.writeFileSync(path,src);
