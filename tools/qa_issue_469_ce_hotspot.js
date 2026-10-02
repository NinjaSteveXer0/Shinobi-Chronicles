#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const src=fs.readFileSync(path.join(ROOT,"runtime/alpha-phase2-ce-hotspot-46900.js"),"utf8");
const manifest=fs.readFileSync(path.join(ROOT,"runtime/alpha-chronicle-state-manifest-43600.js"),"utf8");
const traversal=fs.readFileSync(path.join(ROOT,"runtime/alpha-traversal-bridge-33200.js"),"utf8");
const game=fs.readFileSync(path.join(ROOT,"game.js"),"utf8");
const writing=fs.readFileSync(path.join(ROOT,"Documentation/Story/Kakashi_Masked_Interceptor_First_Live_CE_Hotspot_Production_Scene_2026-10-02.md"),"utf8");
const privateWriting=fs.readFileSync(path.join(ROOT,"Documentation/Story/Kakashi_MI_Private_History_Emergence_Non_Kakashi_Protagonist_Scene_Family_2026-10-02.md"),"utf8");
const privateProfile=fs.readFileSync(path.join(ROOT,"Documentation/Story/Academy_Kakashi_Autonomous_Origin_Intent_Profile_2026-10-02.md"),"utf8");
const battle=fs.readFileSync(path.join(ROOT,"runtime/alpha-kakashi-v2-battle-36010.js"),"utf8");
const board=fs.readFileSync(path.join(ROOT,"runtime/alpha-story-scene-board-33900.js"),"utf8");

for(const exact of [
  'const EVENT_ID="konoha_ce_kakashi_masked_interceptor_admin_crossing_v1"',
  'const HOST_ID="KON-P01"',
  'const ORIGIN_ID="academy_kakashi"',
  'const MI_ID="academy_kakashi_origin_masked_interceptor"',
  'const CONTINUITY_KEY=ORIGIN_ID+"::"+MI_ID'
])assert(src.includes(exact),"#469 stable identity missing: "+exact);

assert(manifest.includes('stateDomainId:"originParticipantContinuity"'),"#436 continuity domain missing");
assert(manifest.includes("getOriginParticipantContinuityStore43600"),"#436 continuity access seam missing");
assert(manifest.includes('stateDomainId:"privateOriginHistory"'),"#471/#478 private Origin history domain missing");
assert(manifest.includes("getPrivateOriginHistoryStore43600"),"private Origin history access seam missing");
assert(manifest.includes('stateDomainId:"chronicleRunIdentity"'),"#494 Chronicle run identity domain missing");
assert(manifest.includes('stableIdentityKey:"playerData.phase2ChronicleState.chronicleRunIdentity.runId"'),"#494 canonical runId path missing");
assert(manifest.includes("ensureChronicleRunIdentity43600"),"#494 run identity ensure seam missing");
assert(manifest.includes("allocateChronicleRunId43600"),"#494 run identity allocator missing");
assert(src.includes('const PRIVATE_ORIGIN_SCHEMA="sc.privateOriginHistory.v1"'),"private Origin semantic identity missing");
assert(src.includes('resolutionMode:"AUTONOMOUS_PRIVATE"'),"autonomous private Kakashi history mode missing");
assert(src.includes('resolutionMode:"PLAYER_EXPERIENCED"'),"player-experienced Kakashi private history mode missing");
assert(src.includes("sc.parallelOriginHistoryMigration.v1"),"one-shot old-save migration semantic missing");
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

assert(src.includes("kakashi_current_presence_required"),"#478 Kakashi physical-presence eligibility missing");
assert(src.includes('reason:"chronicle_run_identity_required"'),"#494 stable run identity fail-closed gate missing");
assert(src.includes("getChronicleRunIdentity43600"),"#469 private history does not consume canonical Chronicle run identity");
assert(src.includes("ensureChronicleRunIdentity43600"),"#469 legacy begun save cannot receive persisted run identity");
assert(!src.includes("completionEvidenceIds)?origin.completionEvidenceIds"),"#494 private seed still fingerprints Origin completion evidence");
assert(!src.includes('fallback=[a&&a.chronicleOriginOwnedCharacterId'),"#494 private seed still collapses onto protagonist/person identity");
assert(src.includes("chronicleRunId:runId"),"#494 private Origin history does not record run-instance namespace");
const privateSeedSource=src.slice(src.indexOf("function privateSeedRef46900"),src.indexOf("function stablePick46900"));
assert(privateSeedSource.includes("runId"),"#494 private seed does not include runId");
assert(privateSeedSource.includes("PRIVATE_ORIGIN_SUBJECT")&&privateSeedSource.includes("PRIVATE_ORIGIN_DEFINITION")&&privateSeedSource.includes("PRIVATE_ORIGIN_VERSION"),"#494 private seed dropped subject/resolver/version identity");
assert(!privateSeedSource.includes("teamVariantIds")&&!privateSeedSource.includes("completionEvidence"),"#494 private seed improperly consumes team/evidence state");
const eligibilitySource=src.slice(src.indexOf("function eligibility(){"),src.indexOf("function eventPlan(){"));
assert(!eligibilitySource.includes('reason:"academy_kakashi_origin_required"'),"obsolete selected-Origin==Kakashi hotspot gate remains");
assert(src.includes("menma_private_history_emergence"),"Menma private-history emergence mode missing");
assert(!eligibilitySource.includes("menma_live_benchmark_requires_hinata"),"stale Hinata-only eligibility gate remains");
assert(eligibilitySource.includes("menmaSecondTeammateRef46900"),"Menma second teammate is not derived from committed current team");
assert(eligibilitySource.includes("menma_second_teammate_reaction_not_authored"),"Menma dynamic second-teammate reaction must fail closed when unauthorised");
assert(src.includes('text:"Wait—you know her?"'),"Obito authored current-evidence reaction missing");
assert(src.includes('second_teammate_current_evidence:'),"dynamic second-teammate observer receipt missing");
assert(src.includes('ce478_second_teammate_autonomy'),"Menma private-history scene still owns a Hinata-specific autonomy request");
assert(src.includes("secondTeammateCurrentResponseCues46900"),"Menma current-evidence presentation is not dynamic by second teammate");
assert(src.includes("participants:[...new Set([...(data.storyTeamParticipantRefs"),"Menma Record participants are not projected from exact current team");
assert(src.includes("getMenmaSecondTeammateRef46900"),"focused second-teammate diagnostic export missing");
assert(board.includes("scale(1.045)"),"#486 speaker focus scale must stay inside locked +3–5% band");
assert(!board.includes("scale(1.055)"),"#486 superseded speaker focus scale remains");
assert(board.includes("translateY(-10px)"),"#486 speaker focus raise is missing");
assert(board.includes("function resolveBoardActorStage33900"),"#486 semantic stage resolver missing");
assert(board.includes("data-sc-stage-anchor"),"#486 actor semantic anchor projection missing");
assert(!board.includes('.sc-scene-board-33900__actors[data-count="4"]>.sc-scene-board-33900__actor:nth-child'),"#486 four-person staging still depends on ordinal nth-child margins");
assert(board.includes("scChoreoReducedSettle33900"),"#486 reduced-motion non-exit settle grammar missing");
assert(board.includes("scChoreoReducedExit33900"),"#486 reduced-motion exit/flee opacity grammar missing");
assert(!board.includes("@keyframes scChoreoReduced33900{from{opacity:.72}to{opacity:1}}"),"#486 superseded reduced-motion blanket fade remains");
assert(src.includes('stageAnchor=id===MENMA_ID?"PLAYER_LEFT"'),"#469 Menma semantic stage anchor missing");
assert(src.includes('id===ORIGIN_ID?"INNER_RIGHT":id===MI_ID?"OPPONENT_RIGHT":"INNER_LEFT"'),"#469 four-person semantic stage hierarchy missing");
assert(src.includes('stageAnchor=id===ORIGIN_ID?"PLAYER_LEFT":id===MI_ID?"OPPONENT_RIGHT":"CENTER"'),"#469 Kakashi protagonist stage anchors missing");
assert(src.includes("confirmAcademyTeamFormation46900"),"private history is not sealed before Team Formation");
assert(src.includes("ensureAutonomousKakashiPrivateHistory46900"),"one-shot autonomous Kakashi history resolver missing");
const ensurePrivateSource=src.slice(src.indexOf("function ensureAutonomousKakashiPrivateHistory46900"),src.indexOf("function recordId("));
assert(ensurePrivateSource.indexOf("storedKakashiPrivateHistory")<ensurePrivateSource.indexOf('chronicleStableId46900({ensure:true})'),"#494 already-sealed private history is not checked before run identity seeding");
assert(src.includes("privateStoryUnitRef46900"),"private Origin choices are not namespaced through #34000");
assert(src.includes("D.openSemanticChoiceSet"),"private Origin does not consume #34000 semantic choice machinery");
assert(src.includes("D.commitStoryIntent"),"private Origin does not commit #34000 intent receipts");
assert(src.includes("F.resolveStoryFactualAction"),"private machine gates do not consume #34600 factual-result authority");
assert(src.includes("terminalConvergence:{reportReached:true,hiddenTestReviewReached:true,receiptReached:true,originCompleted:true"),"autonomous Kakashi private Origin does not prove terminal convergence");
assert(src.includes('semanticTrace.push("terminal:v2_report>v2_hidden_review>v2_receipt:"'),"private Origin terminal path does not match frozen Kakashi convergence");
assert(src.includes("previewAcademyKakashiV2TerminalRewards36015"),"private Origin does not consume Kakashi reward preview authority");
assert(!src.includes("commitAcademyKakashiV2TerminalRewards36015("),"private Origin must not commit Kakashi terminal rewards to player economy");
assert(src.includes('ownerProjectionNote:"No authorised Kakashi-specific Origin Development/Current-Stat mutation source is exposed'),"unsupported actor-local development is not explicitly fail-closed");

for(const api of ["registerAutonomyAnchor","consumeNextAutonomy","openDecisionAfterAutonomy","resolveStoryChoice"]){
  assert(src.includes(api),"#34000 participant-first/intent API not consumed: "+api);
}

const autonomousBoundaryBlock=src.slice(src.indexOf("const AUTONOMOUS_KAKASHI_BOUNDARIES="),src.indexOf("const MENMA_CHOICES="));
const boundaryIds=[...autonomousBoundaryBlock.matchAll(/B\d\d:Object\.freeze/g)].map(m=>m[0].slice(0,3));
assert.strictEqual(boundaryIds.length,23,"Kakashi autonomous profile must encode all 23 meaningful boundaries");
const profileChoiceIds=[...autonomousBoundaryBlock.matchAll(/choiceIds:Object\.freeze\(\[([^\]]+)\]\)/g)]
  .flatMap(m=>[...m[1].matchAll(/"([^"]+)"/g)].map(x=>x[1]));
assert.strictEqual(profileChoiceIds.length,93,"Kakashi autonomous profile must encode all 93 player-facing legal choices");
assert.strictEqual(new Set(profileChoiceIds).size,93,"autonomous Kakashi choice IDs must be unique across frozen boundaries");
assert(!profileChoiceIds.some(id=>/^machine::|resolve_result|machine_factual_resolution/i.test(id)),"machine RESOLVE RESULT choice leaked into autonomous Character profile");
assert(!autonomousBoundaryBlock.includes('intentType:"MACHINE_FACTUAL_RESOLUTION"'),"machine factual resolver intent leaked into Character boundary profile");
assert(privateProfile.includes("all 23 meaningful current Kakashi choice boundaries covered: **YES**"),"runtime profile is not grounded in Writing autonomous-intent authority");
assert(privateProfile.includes("all 93 current player-facing legal choice IDs represented: **YES**"),"Writing authority 93-choice audit missing");
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
const menmaChoices=[
  "Ask Kakashi what happened.",
  "Ask her how she knows Kakashi.",
  "Let Kakashi handle it.",
  "Keep moving."
];
for(const label of menmaChoices){
  assert(src.includes(label),"exact Menma choice missing: "+label);
  assert(privateWriting.includes(label),"Menma runtime choice not grounded in Writing authority: "+label);
}
const choicesSection=src.slice(src.indexOf("const CHOICES="),src.indexOf("function clone("));
assert(!/\bATTACK\b/i.test(choicesSection),"ATTACK leaked into #469 choice surface");
assert(src.includes('const MENMA_SCENE_ID="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_menma_v1"'),"Menma scene identity missing");
assert(src.includes('displayName:"Masked Woman"'),"Menma observer-safe current label missing");
assert(src.includes('knownPerson:"Masked Woman"'),"Menma Shinobi Record leaks stable historical role label");
assert(!src.includes('return["Menma","Hinata","Kakashi","Masked Woman"]'),"Menma Record participant projection still hardcodes Hinata");
assert(!src.includes('participants:[MENMA_ID,HINATA_ID,ORIGIN_ID,MI_ID]'),"Menma record still hardcodes Hinata as physically present");
assert(src.includes("privateOriginTranscriptGranted:false"),"Menma private-history transcript firewall missing");
assert(src.includes("kakashiPrivateChoiceIdsGranted:false"),"Menma private choice-ledger firewall missing");

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

for(const receipt of [
  "mi_private_history_emergence_base_v1",
  "menma_requested_kakashi_private_history_disclosure_v1",
  "menma_asked_kakashi_about_private_past_v1",
  "kakashi_disclosed_bounded_mi_history_to_current_team_v1",
  "menma_requested_mi_prior_connection_testimony_v1",
  "mi_disclosed_kakashi_private_history_in_front_of_team_v1",
  "menma_yielded_private_history_collision_to_kakashi_v1",
  "menma_deferred_to_kakashi_on_private_connection_v1",
  "menma_declined_private_history_inquiry_v1"
])assert(src.includes(receipt),"#478 Menma branch receipt missing: "+receipt);

assert(src.includes("playerControlled:false"),"nested Kakashi current intent may be player-controlled");
assert(src.includes("consumeMenmaAutonomy46900(\"nested_kakashi_intent\")"),"Branch C does not commit nested Kakashi autonomy");
assert(src.includes("source_attributed_testimony"),"disclosure branches do not preserve testimony attribution");

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
assert(src.includes("menmaSceneRegistration46900"),"Menma private-history scene not registered on shared Story runtime");
assert(src.includes("MENMA_ACTION_ID"),"same KON-P01 opportunity lacks Menma observer route");
assert(src.includes('actionId=gate.mode==="menma_private_history_emergence"?MENMA_ACTION_ID:ACTION_ID'),"KON-P01 route is not observer-mode driven");
assert(src.includes("registerStorySceneBoardDefinition"),"shared Scene Board presentation not consumed");
assert(src.includes('resolveBackdrop:()=>({assetPath:"Scene backdrops/hokage_district_exterior.png"})'),"KON-P01 Administration exterior backdrop not bound");
assert(src.includes('exitTransition:"black_wipe"'),"KON-P01 scene exit does not request shared black wipe");
const cueHelper=src.slice(src.indexOf("function cue(kind,text,speakerName=null)"),src.indexOf("function openingCues()"));
assert(!cueHelper.includes("singlePage:true"),"#469 forces multi-paragraph narration into one giant Story box");
assert(board.includes("slice(0,4)"),"shared Scene Board still truncates four-person scenes");
assert(board.includes('data-count="4"'),"shared Scene Board lacks four-actor staging");
assert(board.includes("opacity:1;transform:translateY(2px) scale(.98);filter:none"),"non-speaker cards are still greyed/dimmed");
assert(board.includes("scale(1.055)")&&board.includes("2px solid rgba(97,220,229,.96)"),"active speaker does not enlarge with coloured border");
assert(board.includes("SCENE COMPLETE · CLICK ANYWHERE TO RETURN"),"Story exit lacks explicit ending affordance");
assert(board.includes("playStorySoftSceneTransition33900"),"same-location soft transition owner missing from shared Scene Board");
assert(board.includes("story_scene_exit_black_wipe"),"Story exit does not dispatch shared black wipe");
assert(src.includes("resolvedRecord()"),"finite no-reroll record guard missing");
assert(src.includes("setOpportunityResolution"),"World resolution commit missing");
assert(src.includes("setWorldEventLifecycle"),"World lifecycle commit missing");
assert(src.includes("hiddenTestTruthGranted:false"),"observer-safe hidden-truth firewall receipt missing");
assert(src.includes("properNameKnowledgeGranted:false"),"proper-name firewall receipt missing");
assert(src.includes("anbuMembershipKnowledgeGranted:false"),"ANBU inference firewall receipt missing");
assert(src.includes("moralityScalarCreated:false")&&src.includes("friendshipScalarCreated:false"),"relationship/morality scalar firewall missing");
assert(!src.includes("Math.random"),"#469 history/participant behavior must be deterministic");
assert(src.includes("previewAutonomousKakashiPrivateOrigin46900"),"deterministic private-history preview seam missing");
const candidateFn=src.slice(src.indexOf("function privateBoundaryCandidates46900("),src.indexOf("function selectPrivateBoundaryChoice46900("));
assert(!candidateFn.includes("stableHash46900("),"stable seed is deciding Character/context preference membership instead of only equal-top tie selection");
assert(src.includes("stablePick46900(boundaryId,legal,seedRef)"),"stable tie selection missing after Character/context eligibility");
assert(src.includes("privateKakashiCapability46900"),"Character/context selection lacks current Kakashi capability input");
assert(src.includes("privateChoiceSevereEligible46900"),"severe lethal eligibility gate missing");

for(const boundary of Array.from({length:23},(_,i)=>"case\"B"+String(i+1).padStart(2,"0")+"\"")){
  assert(src.includes(boundary),"terminal walker missing boundary logic: "+boundary);
}
assert(battle.includes("resolveAutonomousPrivateBattle36010"),"Battle owner does not expose headless autonomous Kakashi result");
assert(battle.includes("rewardGranted:false")&&battle.includes("lootGranted:false")&&battle.includes("playerEconomyMutation:false"),"autonomous private Battle may mutate player rewards/economy");
assert(src.includes("duplicateStartingPurseGranted:false"),"private Origin duplicate starting-purse firewall missing");
assert(src.includes("autonomousPlayerVictoryBattleRyoGranted:false"),"autonomous private Battle Ryō firewall missing");
assert(src.includes("blanketInventoryRewardsGranted:false"),"autonomous private inventory firewall missing");
assert(!src.includes("addItemToInventory(")&&!src.includes("grantReward("),"#469 must not grant material rewards");
assert(
  game.includes("storyDecisionRuntime34000:")&&game.includes("parsedData.storyDecisionRuntime34000"),
  "#34000 participant/protagonist intent receipts are not preserved by loadPlayerData"
);
assert(traversal.includes("runtime/alpha-phase2-ce-hotspot-46900.js"),"#469/#478 missing from production dynamic chain");
assert(traversal.includes('kakashi-v2-writing-golden-20260924-7-ce478'),"#478 terminal cache key not activated");
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
  exactMenmaChoices:true,
  privateOriginHistory:true,
  autonomousProfile23x93:true,
  battleOwnedAutonomousResolution:true,
  observerRelativeLabel:true,
  nestedKakashiAutonomy:true,
  distinctBranchConsequences:true,
  attackAbsent:true,
  observerSafeRecord:true,
  noRandomHistory:true,
  finiteNoReroll:true,
  frozenOriginNotRewritten:true,
  browserGoldenClaimed:false
},null,2));
