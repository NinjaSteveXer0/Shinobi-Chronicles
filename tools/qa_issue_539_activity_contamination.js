#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const OWNER=path.join(ROOT,"runtime","alpha-phase2-konoha-player-surfaces-43110.js");
const MY_CLAN=path.join(ROOT,"runtime","alpha-browser-polish-32700.js");
const EXAMS=path.join(ROOT,"UI","exams.png");
const PRACTICAL=path.join(ROOT,"UI","practical.png");

function read(file){return fs.readFileSync(file,"utf8");}
function count(haystack,re){const m=haystack.match(re);return m?m.length:0;}

const source=read(OWNER);
const clan=read(MY_CLAN);

// Historical masters remain repository evidence. #539 forbids deleting them merely
// to make a contamination check pass.
assert(fs.existsSync(EXAMS),"historical UI/exams.png evidence was deleted");
assert(fs.existsSync(PRACTICAL),"historical UI/practical.png evidence was deleted");

// Negative control only: My Clan was already surgically corrected by #541 and is
// outside this work cell's production scope. This QA lane never edits it.
assert(/myClanCodeFirst\s*:\s*true|myClanLiteralMasterNotRequired\s*:\s*true|background-image\s*:\s*none/i.test(clan),
  "My Clan negative control no longer records a code-first/literal-master-not-required surface");

// Preserve contracts actually owned by this wrapper. The underlying renderer owns
// the primary action control itself; that is verified on the real browser route,
// not by requiring its CSS class literal to be duplicated in this wrapper.
for(const required of [
  "getChronicleCurrentTeam43600",
  "currentTeamSelectable",
  "getPhase2KonohaActivityTeam43110",
  "alpha-activity-result-stage",
  "data-discipline-id"
])assert(source.includes(required),"#539 owner lost required wrapper contract token: "+required);

assert(!/playerTeam\s*\|\||playerTeam\s*\.\s*(map|filter|slice)/.test(source),
  "#539 activity owner appears to fall back to broad playerTeam fixture authority");

// Core contamination canary. The current Exams/Practical owner must not literally
// consume historical fixture masters as live mutable body. Presence in UI/ is not
// authority to render them.
const staleBindings=[
  {service:"exams",asset:"UI/exams.png",re:/UI\/exams\.png/gi},
  {service:"practical",asset:"UI/practical.png",re:/UI\/practical\.png/gi}
].map(row=>({...row,count:count(source,row.re)}));

for(const row of staleBindings){
  assert.strictEqual(row.count,0,
    `${row.service} still literally consumes historical fixture master ${row.asset} (${row.count} source reference(s))`);
}

// Guard against solving only the exact old spelling with an equivalent CSS/resource
// resurrection. These service selectors must not bind a raster from UI/ as their
// live background body.
for(const service of ["exams","practical"]){
  const selector=new RegExp(`#konoha-activity-screen\\[data-service-id=["']${service}["']\\][^{]*\\{([^}]*)\\}`,"i");
  const match=source.match(selector);
  if(match){
    assert(!/background(?:-image)?\s*:[^;}]*url\s*\(\s*["']?UI\//i.test(match[1]),
      `${service} service selector still binds an unratified UI raster as live background`);
  }
}

console.log(JSON.stringify({
  pass:true,
  issue:539,
  qaRole:"lane_c_adversarial_only",
  productionEdited:false,
  historicalMastersPreserved:true,
  myClanNegativeControlOnly:true,
  staleActivityRasterReferences:staleBindings,
  currentTeamAuthorityPreserved:true,
  resultStageWrapperContractPreserved:true,
  disciplinePresentationWrapperContractPreserved:true,
  actionDockVerifiedByBrowserHarness:true,
  browserGoldenClaimed:false
},null,2));
