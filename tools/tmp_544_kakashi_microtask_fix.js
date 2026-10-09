#!/usr/bin/env node
"use strict";
const fs=require("fs");
const path="tools/qa_kakashi_v2_browser.js";
let src=fs.readFileSync(path,"utf8");
function replaceOnce(before,after,label){
  const i=src.indexOf(before);
  if(i<0)throw new Error(label+": anchor missing");
  if(src.indexOf(before,i+1)>=0)throw new Error(label+": anchor not unique");
  src=src.slice(0,i)+after+src.slice(i+before.length);
  console.log("UPDATED "+label);
}
replaceOnce(
`    resumed=await page.evaluate(({outcome,actions})=>{`,
`    resumed=await page.evaluate(async({outcome,actions})=>{`,
"route-helper-async"
);
replaceOnce(
`        const presented=globalThis.presentCommittedBattleTerminalResult54400?.(outcome,{source:"kakashi_v2_route_fixture"});\n        if(!(presented&&presented.success===true))return presented||{success:false,reason:"terminal_result_presentation_failed"};\n        let continued=outcome==="victory"?continueAfterVictory():globalThis.continueAfterSetback54400?.();`,
`        const presented=globalThis.presentCommittedBattleTerminalResult54400?.(outcome,{source:"kakashi_v2_route_fixture"});\n        if(!(presented&&presented.success===true))return presented||{success:false,reason:"terminal_result_presentation_failed"};\n        await Promise.resolve();\n        let continued=outcome==="victory"?continueAfterVictory():globalThis.continueAfterSetback54400?.();`,
"route-helper-await-presentation"
);
const standalone=`  const resumed=await page.evaluate(()=>{\n    currentBattle.outcome={type:"victory",committed:true,completedAt:Date.now(),finishingShinobiId:"academy_kakashi"};\n    currentBattle.battleOver=true;\n    currentBattle.active=false;\n    try{globalThis.hardSettleBattlePresentationQueue33000?.("kakashi_v2_standalone_terminal_result");}catch(_error){}\n    const presented=globalThis.presentCommittedBattleTerminalResult54400?.("victory",{source:"kakashi_v2_standalone_fixture"});\n    if(!(presented&&presented.success===true))return presented||{success:false,reason:"terminal_result_presentation_failed"};\n    let continued=continueAfterVictory();`;
const standaloneFixed=`  const resumed=await page.evaluate(async()=>{\n    currentBattle.outcome={type:"victory",committed:true,completedAt:Date.now(),finishingShinobiId:"academy_kakashi"};\n    currentBattle.battleOver=true;\n    currentBattle.active=false;\n    try{globalThis.hardSettleBattlePresentationQueue33000?.("kakashi_v2_standalone_terminal_result");}catch(_error){}\n    const presented=globalThis.presentCommittedBattleTerminalResult54400?.("victory",{source:"kakashi_v2_standalone_fixture"});\n    if(!(presented&&presented.success===true))return presented||{success:false,reason:"terminal_result_presentation_failed"};\n    await Promise.resolve();\n    let continued=continueAfterVictory();`;
const count=src.split(standalone).length-1;
if(count!==2)throw new Error("standalone anchors expected 2, found "+count);
src=src.split(standalone).join(standaloneFixed);
fs.writeFileSync(path,src);
console.log("UPDATED standalone-await-presentation x2");
