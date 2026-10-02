#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const src=fs.readFileSync(path.join(ROOT,"runtime/alpha-phase2-ce-hotspot-46900.js"),"utf8");
const manifest=fs.readFileSync(path.join(ROOT,"runtime/alpha-chronicle-state-manifest-43600.js"),"utf8");
const traversal=fs.readFileSync(path.join(ROOT,"runtime/alpha-traversal-bridge-33200.js"),"utf8");
const game=fs.readFileSync(path.join(ROOT,"game.js"),"utf8");
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
  "Ask about the delivery.",
  "Watch what she does.",
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
  "I remember you too.",
  "They weren't there.",
  "What did you deliver?",
  "A dispatch.",
  "From who?",
  "Ask the desk.",
  "Seen leaving Hokage Administration after completing a stamped document handoff through the public intake.",
  "Previously encountered during the Academy package incident.",
  'properName:"Unknown"'
])assert(src.includes(authored),"Writing/Record authority missing: "+authored);

for(const stale of [
  "No alarm follows her. No one moves to stop her.",
  "Ask what she is doing here.",
  "Watch her pass.",
  "Delivery. Finished."
])assert(!src.includes(stale),"rejected owner-run copy remains in runtime: "+stale);

for(const receipt of [
  "mi_admin_crossing_base_lead_v1",
  "mi_mutual_recognition_explicit_v1",
  "kakashi_mi_prior_connection_observed_v1",
  "kakashi_mi_prior_history_openly_acknowledged_v1",
  "mi_dispatch_task_confirmed_v1",
  "kakashi_questioned_mi_current_admin_business_v1",
  "mi_admin_dispatch_inquiry_lead_v1",
  "mi_public_intake_process_observed_v1",
  "kakashi_observed_mi_without_confrontation_v1",
  "mi_noticed_kakashi_observation_v1",
  "mi_admin_intake_process_lead_v1",
  "kakashi_declined_mi_contact_v1"
])assert(src.includes(receipt),"branch consequence receipt missing: "+receipt);

assert(src.includes("const BRANCH_CONSEQUENCES=Object.freeze({"),"branch consequence matrix missing");
assert(src.includes("const consequence=branchConsequence(choiceId);"),"final record does not consume selected branch consequence");
assert(src.includes("branchFactualReceiptId:consequence.factualReceiptId"),"branch factual delta not persisted");
assert(src.includes("sharedHistoryReceiptIds:[...consequence.sharedHistoryReceiptIds]"),"shared-history delta not persisted");
assert(src.includes("futureLeadIds:[...consequence.futureLeadIds]"),"future lead delta not persisted");
assert(src.includes("recordAddendum:consequence.recordAddendum||null"),"branch-specific Shinobi Record addendum missing");

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
assert(
  game.includes("storyDecisionRuntime34000:")&&game.includes("parsedData.storyDecisionRuntime34000"),
  "#34000 participant/protagonist intent receipts are not preserved by loadPlayerData"
);
assert(traversal.includes("runtime/alpha-phase2-ce-hotspot-46900.js"),"#469 missing from production dynamic chain");
assert(
  traversal.includes('function load36040(){loadOne("sc-kakashi-v2-transition-36040-script","runtime/alpha-kakashi-v2-transition-36040.js",()=>!!globalThis.SC_ACADEMY_KAKASHI_V2_TRANSITION_36040,load46900);}')&&
  traversal.includes('function load46900(){loadOne("sc-phase2-ce-hotspot-46900-script","runtime/alpha-phase2-ce-hotspot-46900.js",()=>!!globalThis.SC_PHASE2_CE_HOTSPOT_46900);}'),
  "#469 must load only from the frozen Kakashi V2 terminal transition callback"
);

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
  distinctBranchConsequences:true,
  attackAbsent:true,
  observerSafeRecord:true,
  noRandomHistory:true,
  finiteNoReroll:true,
  frozenOriginNotRewritten:true,
  browserGoldenClaimed:false
},null,2));
