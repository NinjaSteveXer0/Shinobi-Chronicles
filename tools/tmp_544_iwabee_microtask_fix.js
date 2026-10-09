#!/usr/bin/env node
"use strict";
const fs=require("fs");
const path="tools/qa_issues_396_399_400_browser.js";
let src=fs.readFileSync(path,"utf8");
const beforeEval='    let result=await page.evaluate(({outcome})=>{';
const afterEval='    let result=await page.evaluate(async({outcome})=>{';
const evalCount=src.split(beforeEval).length-1;
if(evalCount!==1)throw new Error(`Iwabee evaluate anchor expected 1, found ${evalCount}`);
src=src.replace(beforeEval,afterEval);
const beforePresent='          terminalPresented=globalThis.presentCommittedBattleTerminalResult54400?.("victory",{source:"qa396_iwabee_victory"})||null;\n          claimAction=continueAfterVictory();';
const afterPresent='          terminalPresented=globalThis.presentCommittedBattleTerminalResult54400?.("victory",{source:"qa396_iwabee_victory"})||null;\n          await Promise.resolve();\n          claimAction=continueAfterVictory();';
const presentCount=src.split(beforePresent).length-1;
if(presentCount!==1)throw new Error(`Iwabee presentation anchor expected 1, found ${presentCount}`);
src=src.replace(beforePresent,afterPresent);
fs.writeFileSync(path,src);
console.log("UPDATED Iwabee #544 Victory presenter timing fixture");
