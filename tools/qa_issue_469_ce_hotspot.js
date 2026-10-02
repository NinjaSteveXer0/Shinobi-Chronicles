#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const src=fs.readFileSync(path.join(ROOT,"runtime/alpha-phase2-ce-hotspot-46900.js"),"utf8");
const manifest=fs.readFileSync(path.join(ROOT,"runtime/alpha-chronicle-state-manifest-43600.js"),"utf8");
const traversal=fs.readFileSync(path.join(ROOT,"runtime/alpha-traversal-bridge-33200.js"),"utf8");
const writing=fs.readFileSync(path.join(ROOT,"Documentation/Story/Kakashi_Masked_Interceptor_First_Live_CE_Hotspot_Production_Scene_2026-10-02.md"),"utf8");

for(const exact of [
  'const EVENT_ID="konoha_ce_kakashi_masked_interceptor_admin_crossing_v1"',
  'const HOST_ID="KON-P01"',
  'const ORIGIN_ID="academy_kakashi"',
  'const MI_ID="academy_kakashi_origin_masked_interceptor"',
  'const CONTINUITY_KEY=ORIGIN_ID+"::"+MI_ID'
])assert(src.includes(exact),"#469 stable identity missing: "+exact);

assert(manifest.includes('stateDomainId:"originParticipantContinuity"'),"#436 continuity domain missing");
assert(manifest.includes("getOriginParticipantContinuityStore43600"),"#436 continuity access seam missing");
assert(src.includes("PRE_COMPLETE_ORIGIN.apply"),"#469 does not delegate frozen Origin completion");
assert(!src.includes("getAcademyKakashiV2State36020().participants.MI.state="),"#469 appears to rewrite frozen Kakashi state");

const families=[
  "lethal_attempt","police_transfer","restraint_or_anbu","deliberate_release",
  "mi_defeated_kakashi","kakashi_defeated_mi","material_encounter"
];
for(const family of families)assert(src.includes(family),"history family missing: "+family);
const familyFn=src.slice(src.indexOf("function historyFamily("),src.indexOf("function resolvedRecord("));
let last=-1;
for(const needle of ["lethalAttempt","policeTransfer","restraintOrAnbu","deliberateRelease","miDefeatedKakashi","kakashiDefeatedMi"]){
  const pos=familyFn.indexOf(needle);
  assert(pos>last,"history precedence drift at "+needle);
  last=pos;
}
assert(src.includes('fieldDispositionState==="KILLED"'),"KILLED terminal exclusion missing");
assert(src.includes('fieldDispositionState==="UNSEEN"'),"UNSEEN exclusion missing");
assert(src.includes("hiddenPostTestReviewReached"),"hidden post-test review continuity requirement missing");
assert(src.includes('postTestTruthClass:"staged_konoha_test_participant"')||src.includes('"staged_konoha_test_participant"'),"post-test World truth class missing");

for(const api of ["registerAutonomyAnchor","consumeNextAutonomy","openDecisionAfterAutonomy","resolveStoryChoice"]){
  assert(src.includes(api),"#34000 participant-first/intent API not consumed: "+api);
}
for(const teammate of [
  "academy_hinata","academy_izuno","academy_mirai","academy_menma","academy_kushina",
  "academy_kurenai","academy_iwabee","academy_metal_lee","academy_obito"
])assert(src.includes(teammate),"authored teammate family missing: "+teammate);
for(const line of [
  "She recognised you.","She changed pace when she saw you.","Kakashi. Who is she?","Problem?","Wait—you know her?"
])assert(src.includes(line),"strong teammate line missing: "+line);

const exactChoices=[
  "Tell her you remember her.",
  "Ask what she is doing here.",
  "Watch her pass.",
  "Keep moving."
];
for(const label of exactChoices){
  assert(src.includes(label),"exact Kakashi choice missing: "+label);
  assert(writing.includes(label),"runtime choice not grounded in Writing authority: "+label);
}
const choicesSection=src.slice(src.indexOf("const CHOICES="),src.indexOf("function clone("));
assert(!/\bATTACK\b/i.test(choicesSection),"ATTACK leaked into #469 choice surface");

for(const authored of [
  "Not here.",
  "I remember you.",
  "I know.",
  "What are you doing here?",
  "Delivery. Finished.",
  "Seen leaving Hokage Administration after a document handoff. Administration staff did not challenge her presence.",
  "Previously encountered during the Academy package incident.",
  'properName:"Unknown"'
])assert(src.includes(authored),"Writing/Record authority missing: "+authored);

assert(src.includes('sourceKind:"story"'),"#469 opportunity is not authored Story source");
assert(src.includes("randomPoolEligible:false"),"#469 leaked into random pool");
assert(src.includes("registerWorldEventOpportunity"),"existing World opportunity authority not consumed");
assert(src.includes("routeWorldOpportunityInteraction"),"KON-P01 does not route existing World interaction authority");
assert(src.includes("registerStoryScene"),"shared Story Scene runtime not consumed");
assert(src.includes("registerStorySceneBoardDefinition"),"shared Scene Board presentation not consumed");
assert(src.includes("resolvedRecord()"),"finite no-reroll record guard missing");
assert(src.includes("setOpportunityResolution"),"World resolution commit missing");
assert(src.includes("setWorldEventLifecycle"),"World lifecycle commit missing");
assert(src.includes("hiddenTestTruthGranted:false"),"observer-safe hidden-truth firewall receipt missing");
assert(src.includes("properNameKnowledgeGranted:false"),"proper-name firewall receipt missing");
assert(src.includes("anbuMembershipKnowledgeGranted:false"),"ANBU inference firewall receipt missing");
assert(src.includes("moralityScalarCreated:false")&&src.includes("friendshipScalarCreated:false"),"relationship/morality scalar firewall missing");
assert(!src.includes("Math.random"),"#469 history/participant behavior must be deterministic");
assert(!src.includes("addItemToInventory(")&&!src.includes("grantReward("),"#469 must not grant material rewards");
assert(traversal.includes("runtime/alpha-phase2-ce-hotspot-46900.js"),"#469 missing from production dynamic chain");
assert(traversal.indexOf("alpha-kakashi-v2-transition-36040.js")<traversal.indexOf("alpha-phase2-ce-hotspot-46900.js"),"#469 must load after frozen Kakashi V2 terminal chain");

console.log(JSON.stringify({
  pass:true,
  issue:469,
  eventId:"konoha_ce_kakashi_masked_interceptor_admin_crossing_v1",
  host:"KON-P01",
  sevenHistoryFamilies:true,
  killedTerminal:true,
  unseenIneligible:true,
  exactNineTeammateFamilies:true,
  participantFirst34000:true,
  exactFourChoices:true,
  attackAbsent:true,
  observerSafeRecord:true,
  noRandomHistory:true,
  finiteNoReroll:true,
  frozenOriginNotRewritten:true,
  browserGoldenClaimed:false
},null,2));
