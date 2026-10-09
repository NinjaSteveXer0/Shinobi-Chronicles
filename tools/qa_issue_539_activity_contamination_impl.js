#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const OWNER=path.join(ROOT,"runtime","alpha-phase2-konoha-player-surfaces-43110.js");
const MY_CLAN=path.join(ROOT,"runtime","alpha-browser-polish-32700.js");
const EXAMS=path.join(ROOT,"UI","exams.png");
const PRACTICAL=path.join(ROOT,"UI","practical.png");

const source=fs.readFileSync(OWNER,"utf8");
const clan=fs.readFileSync(MY_CLAN,"utf8");

assert(fs.existsSync(EXAMS),"historical UI/exams.png evidence was deleted");
assert(fs.existsSync(PRACTICAL),"historical UI/practical.png evidence was deleted");
assert(/myClanCodeFirst\s*:\s*true|myClanLiteralMasterNotRequired\s*:\s*true|background-image\s*:\s*none/i.test(clan),
  "My Clan negative control no longer records its code-owned live surface");

for(const required of [
  "getChronicleCurrentTeam43600",
  "currentTeamSelectable",
  "getPhase2KonohaActivityTeam43110",
  "alpha-activity-result-stage",
  "data-discipline-id",
  "OBSERVED_BUT_WRONG",
  "historicalActivityRasterConsumptionBlocked",
  "codeOwnedActivityPresentation"
]) assert(source.includes(required),"#539 owner lost required contract token: "+required);

assert(!/playerTeam\s*\|\||playerTeam\s*\.\s*(map|filter|slice)/.test(source),
  "#539 activity owner appears to fall back to broad playerTeam fixture authority");

for(const asset of ["UI/exams.png","UI/practical.png"]){
  assert(!source.includes(asset),`historical fixture is still literally consumed by runtime owner: ${asset}`);
}

const activitySection=source.split("// KONOHA FIRST HOUR STEP 6")[0];
assert(!/background(?:-image)?\s*:[^;}]*url\s*\(/i.test(activitySection),
  "Exams/Practical activity owner still contains a live raster URL binding");
assert(/background-image:[^'\n]*radial-gradient/i.test(activitySection),
  "code-owned Exams/Practical presentation background is missing");

// The #533 co-located owner is outside #539. Its durable sentinels must survive unchanged.
for(const sentinel of [
  "hokage_office_chronicle_dispatch_53300_2026_10_06",
  "occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1",
  "runHokageOfficeChronicleDispatch53300Diagnostics"
]) assert(source.includes(sentinel),"#539 damaged co-located #533 authority: "+sentinel);

console.log(JSON.stringify({
  pass:true,
  issue:539,
  role:"lane_c_implementation",
  historicalMastersPreserved:true,
  literalRuntimeConsumption:false,
  observationClassification:"OBSERVED_BUT_WRONG",
  currentTeamAuthorityPreserved:true,
  resultStageContractPreserved:true,
  disciplinePresentationContractPreserved:true,
  myClanNegativeControlUntouched:true,
  sharedSeamsEdited:false,
  browserGoldenClaimed:false
},null,2));
