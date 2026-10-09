#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const OUT=process.env.ISSUE_544_OUT||path.join(ROOT,"artifacts","issue-544-terminal-result-routing");
const TARGET=process.env.ISSUE_544_TARGET_SHA||null;
fs.mkdirSync(OUT,{recursive:true});
const read=p=>fs.readFileSync(path.join(ROOT,p),"utf8");
const count=(s,re)=>(s.match(re)||[]).length;
const executableAssignment=(source,name)=>source.split(/\r?\n/).some(line=>new RegExp(`^\\s*globalThis\\.${name}\\s*=`).test(line));

const term=read("runtime/alpha-battle-terminal-result-54400.js");
const old=read("runtime/alpha-alpha-sprint-33100.js");
const modern=read("runtime/alpha-battle-modern-33000.js");
const dynamic=read("runtime/alpha-alpha-sprint-33200.js");
const kakashiRewards=read("runtime/alpha-kakashi-v2-rewards-36015.js");
const index=read("index.html");
const browser=read("tools/qa_issue_544_terminal_result_routing_browser.js");

assert(term.includes("presentCommittedBattleTerminalResult54400"),"#544 presenter missing");
assert(term.includes("continueAfterVictory54400"),"#544 Victory continuation missing");
assert(term.includes("continueAfterSetback54400"),"#544 Setback continuation missing");
assert(term.includes("wrappedOpenOverlay54400"),"#544 openOverlay terminal interceptor missing");
assert(term.includes("wrappedCompleteVictory54400"),"#544 Victory completion wrapper missing");
assert(term.includes("wrappedCompleteDefeat54400"),"#544 Defeat completion wrapper missing");
assert(term.includes("wrappedResumeCaller54400"),"#544 caller-resume guard missing");
assert(term.includes("UI/victory.png"),"lowercase Victory asset projection missing");
assert(term.includes("UI/setback.png"),"lowercase Setback asset projection missing");
assert(term.includes("pendingBattlePresentation33000"),"#544 does not consume #33000 queue state");
assert(term.includes("hardSettleBattlePresentationQueue33000"),"#544 defensive #33000 settle API missing");
assert(term.includes("enumerable:false"),"#544 presentation marker is not non-enumerable");

assert(!old.includes("continueAfterSetback33100"),"retired #33100 Setback continuation reactivated");
assert(!old.includes("renderSetback33100"),"retired #33100 Setback renderer reactivated");
assert(!old.includes(".alpha331-setback"),"retired #33100 Setback surface reactivated");
assert(!/function\s+openOverlay36015\b/.test(kakashiRewards),"36015 broad openOverlay wrapper remains");
assert(!executableAssignment(kakashiRewards,"openOverlay"),"36015 still assigns globalThis.openOverlay");
assert(kakashiRewards.includes("projectAcademyKakashiV2BattleRewardsForVictory36015"),"narrow Kakashi Victory projection API missing");

for(const name of ["completeBattleVictoryFromDamage","completeBattleDefeat","resumeBattleCallerAfterCompletion"]){
  assert(!new RegExp(`globalThis\\.${name}\\s*=`).test(dynamic),`#33200 child rewrites terminal authority ${name}`);
}
assert(modern.includes("pendingBattlePresentation33000"),"#33000 queue authority API missing");
assert(count(index,/runtime\/alpha-battle-terminal-result-54400\.js/g)===1,"#544 loader must appear exactly once");
assert(index.indexOf("runtime/alpha-battle-terminal-result-54400.js")>index.indexOf("runtime/alpha-alpha-sprint-33100.js"),"#544 must load after #33100");

const forbidden=["completeBattle"+"VictoryFromDamage(","completeBattle"+"Defeat("];
for(const token of forbidden)assert(!browser.includes(token),`Lane F acceptance harness contains forbidden terminal helper call ${token}`);
assert(browser.includes("attemptBattlePreparedSkill"),"Lane F acceptance harness does not drive production Battle actions");
assert(browser.includes("caller resumed during reward claim"),"Lane F chronology gate does not explicitly reject CLAIM-as-CONTINUE");
assert(browser.includes("alpha544-setback"),"Lane F does not target #544-owned Setback surface");

const evidence={
  pass:true,issue:544,lane:"F",productionTarget:TARGET,
  exactTreeRequired:true,terminalHelpersCalledByAcceptanceHarness:false,
  retired331TerminalSlice:true,kakashi36015BroadOpenOverlayOwner:false,
  queue33000Distinct:true,dynamic33200DoesNotRewriteTerminalGlobals:true,
  loader544Count:count(index,/runtime\/alpha-battle-terminal-result-54400\.js/g),
  browserGoldenClaimed:false
};
fs.writeFileSync(path.join(OUT,"source-evidence.json"),JSON.stringify(evidence,null,2));
console.log(JSON.stringify(evidence,null,2));
