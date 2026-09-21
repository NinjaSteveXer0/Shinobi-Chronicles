#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),vm=require("vm"),path=require("path");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE="origin_academy_kakashi_anbu_retrieval";
const KAK="academy_kakashi",MI="academy_kakashi_origin_masked_interceptor",PS="academy_kakashi_origin_package_smuggler",AMT="academy_kakashi_origin_amt",PAKKUN="pakkun_origin_unfamiliar_ninken",PACKAGE="kakashi_origin_outer_route_packet";

globalThis.playerData={activityHistory:[]};
globalThis.savePlayerData=()=>true;
load("runtime/alpha-story-decision-realisation-34000.js");

const occurrences=new Map();
globalThis.SC_ALPHA_ORIGIN_32900={findOccurrence(id){return occurrences.get(String(id||""))||null;}};

const terminalBeats=[
 "kak_seq_debrief_pending","kak_terminal_debrief_report_35100","kak_terminal_debrief_summary_35100",
 "kak_terminal_pakkun_departure_1_35100","kak_terminal_pakkun_departure_2_35100","kak_terminal_pakkun_departure_3_35100","kak_terminal_pakkun_departure_exit_35100",
 "kak_terminal_minato_private_evaluation_35100","kak_terminal_chronicle_receipt_35100"
];
const routeBeats={directReturn:"qa-direct-return",directMiReturn:"qa-direct-mi-return",originalReturn:"qa-original-return"};
const moveBeats={improvedReturn:"qa-improved-return",psReturn:"qa-ps-return",cutReturn:"qa-cut-return"};
const postBeats={psReturn:"qa-post-ps-return",amtReturn:"qa-post-amt-return"};
const beatMap=new Map(terminalBeats.map(id=>[id,{beatId:id,onEnterConsequences:[],choices:[]}]));
for(const id of [...Object.values(routeBeats),...Object.values(moveBeats),...Object.values(postBeats)])beatMap.set(id,{beatId:id,onEnterConsequences:[]});
const definition={sceneId:SCENE,beatMap};
let active={sceneId:SCENE,instanceId:"qa-terminal",beatId:"kak_seq_debrief_pending",localContext:{},battleResume:null};
globalThis.getStorySceneDefinition=id=>id===SCENE?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;

const captures=[];
globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100={
 patchId:"alpha_kakashi_terminal_debrief_35100_v12_2026_09_21",
 deriveTerminalFacts(){return{success:true,packageRecovered:false,packageState:{holderClass:"ANBU_MARKED_TARGET",stateRef:"qa-pkg"},pakkunPresentAtDebrief:false,battleFacts:[]};},
 captureBattleResult(config){captures.push(config);return{success:true,battle:{battleConfigId:config}};},
 commitChronicleReceiptAndRewards(){return{success:true};},
 guardedOriginCompletion(){return{success:true};}
};
globalThis.SC_ALPHA_KAKASHI_KONOHA_ROUTE_CLOSURE_35910={beats:routeBeats};
globalThis.SC_ALPHA_KAKASHI_MOVE_CLOSER_CLOSURE_35930={beats:moveBeats};
globalThis.SC_ALPHA_KAKASHI_POST_MI_DEATH_PURSUIT_35830={beats:postBeats};

load("runtime/alpha-kakashi-dynamic-terminal-35940.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_DYNAMIC_TERMINAL_35940;
assert(MOD,"35940 missing");
let diag=globalThis.runAcademyKakashiDynamicTerminal35940Diagnostics();
assert.strictEqual(diag.pass,true,"35940 diagnostics failed: "+JSON.stringify(diag.failed));

// Capture hooks cover all gen69 route-return configs.
for(const [beatId,expected] of [
 [routeBeats.directReturn,"academy_kakashi_origin_battle_amt_ps_2v1"],
 [routeBeats.directMiReturn,"academy_kakashi_origin_battle_mi_1v1"],
 [routeBeats.originalReturn,"academy_kakashi_origin_battle_seq_amt_pakkun"],
 [moveBeats.improvedReturn,"academy_kakashi_origin_battle_amt_ps_2v1"],
 [moveBeats.psReturn,"academy_kakashi_origin_battle_ps_1v1"],
 [moveBeats.cutReturn,"academy_kakashi_origin_battle_amt_ps_2v1"],
 [postBeats.psReturn,"academy_kakashi_origin_battle_seq_ps"],
 [postBeats.amtReturn,"academy_kakashi_origin_battle_seq_amt_pakkun"]
]){
 const req=beatMap.get(beatId).onEnterConsequences.find(x=>x.requestId==="kakashi_terminal_capture_35940::"+beatId);
 assert(req&&typeof req.resolve==="function","capture hook missing for "+beatId);
 const out=req.resolve();assert.strictEqual(out.success,true);
 assert.strictEqual(captures.at(-1),expected);
}

// THREE KILLS: identity-aware lethal projection, package remains independent.
const tripleSnapshot={
 participantStates:{
  [MI]:{participantRef:MI,stateClass:"DEAD",resultRef:"kill-mi"},
  [PS]:{participantRef:PS,stateClass:"DEAD",resultRef:"kill-ps"},
  [AMT]:{participantRef:AMT,stateClass:"DEAD",resultRef:"kill-amt"},
  [PAKKUN]:{participantRef:PAKKUN,stateClass:"PRESENT",resultRef:"pakkun-present"}
 },
 materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-amt",value:{currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET"}}},
 decisionReceipts:{"r1":{selectedChoiceId:"observe",createdAt:1}}
};
const tripleHistory=[
 {occurrenceId:"kill-mi",fact:{participantRef:MI,targetRef:MI,targetDeathConfirmed:true,storySceneInstanceId:"qa-terminal"}},
 {occurrenceId:"kill-ps",fact:{participantRef:PS,targetRef:PS,targetDeathConfirmed:true,storySceneInstanceId:"qa-terminal"}},
 {occurrenceId:"kill-amt",fact:{participantRef:AMT,targetRef:AMT,targetDeathConfirmed:true,storySceneInstanceId:"qa-terminal"}}
];
const tripleFacts={success:true,packageRecovered:false,packageState:{holderClass:"ANBU_MARKED_TARGET",stateRef:"pkg-amt"},pakkunPresentAtDebrief:true,battleFacts:[
 {battleConfigId:"academy_kakashi_origin_battle_mi_1v1",resultState:"player_side_victory",capturedAt:1},
 {battleConfigId:"academy_kakashi_origin_battle_ps_1v1",resultState:"player_side_victory",capturedAt:2},
 {battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",resultState:"player_side_victory",capturedAt:3}
]};
let state=MOD.buildProjectionState({snapshot:tripleSnapshot,history:tripleHistory,terminalFacts:tripleFacts,localContext:{kakashiKonohaPakkunPresent:true}});
let report=MOD.reportText(state),receipt=MOD.receiptText(state),minato=MOD.minatoText(state);
let reportPerformance=MOD.reportPerformance(state);
assert(Array.isArray(reportPerformance)&&reportPerformance.length>2,"structured ANBU report performance missing");
assert.strictEqual(reportPerformance[0].kind,"narration");
assert.strictEqual(reportPerformance[0].text,"Kakashi returns to the rooftop.");
assert.strictEqual(reportPerformance[1].kind,"dialogue");
assert.strictEqual(reportPerformance[1].speakerName,"ANBU OPERATIVE");
assert.strictEqual(reportPerformance[1].text,"Report.");
assert.strictEqual(reportPerformance.map(cue=>cue.kind==="dialogue"?cue.speakerName+": “"+cue.text+"”":cue.text).join("\n\n"),report,"report performance rewrote or reordered factual report text");
assert(report.includes("All three by you."));
assert(report.includes("After the fights?"));
assert(report.includes("original target still had it when he escaped"));
assert(receipt.includes("Confirmed kills: 3"));
assert(receipt.includes("Masked Interceptor — Killed by Kakashi after defeat."));
assert(receipt.includes("Package Smuggler — Killed by Kakashi after defeat."));
assert(receipt.includes("ANBU Marked Target — Killed by Kakashi after defeat."));
assert(receipt.includes("Package — Lost with ANBU Marked Target."));
assert(receipt.includes("Temporary ninken intervention — Involved."));
assert(receipt.includes("Status at ANBU report — Present."));
assert(receipt.includes("Permanent Summon ownership — None."));
assert(minato.includes("Three confirmed deaths."));
assert(minato.includes("Battle casualties?"));
assert(!minato.includes("\\n\\n"),"Minato fallback text must contain real line breaks, not escaped newline literals");
let minatoPerformance=MOD.minatoPerformance(state);
assert(Array.isArray(minatoPerformance)&&minatoPerformance.length>=8,"structured Minato performance missing for triple-kill projection");
assert.strictEqual(minatoPerformance[0].kind,"narration");
assert(minatoPerformance.some(cue=>cue.kind==="dialogue"&&cue.speakerName==="MINATO"&&cue.text==="Three confirmed deaths."));
assert(minatoPerformance.some(cue=>cue.kind==="dialogue"&&cue.speakerName==="ANBU OPERATIVE"&&cue.text==="Yes."));
assert(!/merciless|ruthless|alignment/i.test(report+receipt+minato));

// Pakkun may already have explicitly departed on a route-specific handoff; do not resurrect him at terminal.
const departedSnapshot={
 participantStates:{[PAKKUN]:{participantRef:PAKKUN,stateClass:"DEPARTED",resultRef:"pakkun-departed"}},
 materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-anbu-departed",value:{currentHolderClass:"ANBU",custodyClass:"ANBU"}}},
 decisionReceipts:{"r1":{selectedChoiceId:"get_closer",createdAt:1}}
};
state=MOD.buildProjectionState({snapshot:departedSnapshot,history:[{occurrenceId:"pakkun-involved",fact:{storySceneInstanceId:"qa-terminal",worldFacts:{pakkunPresent:true}}}],terminalFacts:{success:true,packageRecovered:true,packageState:{holderClass:"ANBU",stateRef:"pkg-anbu-departed"},pakkunPresentAtDebrief:false,battleFacts:[]},localContext:{kakashiKonohaPakkunPresent:false}});
receipt=MOD.receiptText(state);report=MOD.reportText(state);
assert(receipt.includes("Temporary ninken intervention — Involved."));
assert(receipt.includes("Status at ANBU report — Explicitly departed."));
assert(!report.includes("And the ninken?"),"terminal report resurrected a departed Pakkun");

// TWO KILLS + Police survivor + recovered package keeps survivor identity visible.
occurrences.set("police-ps",{occurrenceId:"police-ps",fact:{participantRef:PS,participantState:{status:"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY"},storySceneInstanceId:"qa-terminal"}});
const mixedSnapshot={
 participantStates:{
  [MI]:{participantRef:MI,stateClass:"DEAD",resultRef:"kill-mi"},
  [PS]:{participantRef:PS,stateClass:"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY",resultRef:"police-ps"},
  [AMT]:{participantRef:AMT,stateClass:"DEAD",resultRef:"kill-amt"}
 },
 materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-anbu",value:{currentHolderClass:"ANBU",custodyClass:"ANBU",previousCustodyClass:"KAKASHI"}}},
 decisionReceipts:{"r1":{selectedChoiceId:"get_closer",createdAt:1}}
};
const mixedHistory=[
 {occurrenceId:"kill-mi",fact:{targetRef:MI,targetDeathConfirmed:true,storySceneInstanceId:"qa-terminal"}},
 {occurrenceId:"kill-amt",fact:{targetRef:AMT,targetDeathConfirmed:true,storySceneInstanceId:"qa-terminal"}},
 {occurrenceId:"get-closer",fact:{selectedOutcomeRef:"GET_CLOSER_SUCCESS",worldFacts:{retainsGetCloserKnowledge:true},storySceneInstanceId:"qa-terminal"}}
];
const mixedFacts={success:true,packageRecovered:true,packageState:{holderClass:"ANBU",stateRef:"pkg-anbu"},pakkunPresentAtDebrief:false,battleFacts:[{battleConfigId:"academy_kakashi_origin_battle_amt_ps_2v1",resultState:"player_side_victory",capturedAt:1}]};
state=MOD.buildProjectionState({snapshot:mixedSnapshot,history:mixedHistory,terminalFacts:mixedFacts,localContext:{kakashiMoveCloserKnowledgeStateRef:"get-closer"}});
report=MOD.reportText(state);receipt=MOD.receiptText(state);minato=MOD.minatoText(state);
assert(report.includes("I turned the receiver over to the Uchiha Police Force."));
assert(report.includes("So two died."));
assert(report.includes("If the street stayed clear"));
assert(receipt.includes("FIRST ACTION\nMOVE IN CLOSER"));
assert(receipt.includes("Package — Recovered by Kakashi and returned to ANBU."));
assert(receipt.includes("Package Smuggler — Transferred to Uchiha Police custody."));
assert(receipt.includes("Handoff contingency overheard."));
assert(receipt.includes("Downstream package destination — Unknown."));
assert(minato.includes("The surviving result remains separate: Package Smuggler: in Uchiha Police custody."));
assert(minato.includes("He chose the Police."));
minatoPerformance=MOD.minatoPerformance(state);
assert(minatoPerformance.some(cue=>cue.kind==="dialogue"&&cue.speakerName==="MINATO"&&cue.text==="He chose the Police."));
assert(minatoPerformance.some(cue=>cue.kind==="dialogue"&&cue.speakerName==="ANBU OPERATIVE"&&cue.text==="Yes."));

// Field-secured location is reported exactly; no fictional institutional custody.
occurrences.set("field-ps",{occurrenceId:"field-ps",fact:{participantRef:PS,participantState:{status:"FIELD_SECURED_PENDING_COLLECTION",securedAtLocationRef:"KAKASHI_PS_ALT_NIGHT_STREET"},storySceneInstanceId:"qa-terminal"}});
const fieldSnapshot={
 participantStates:{[PS]:{participantRef:PS,stateClass:"FIELD_SECURED_PENDING_COLLECTION",resultRef:"field-ps"}},
 materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-ps",value:{currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER"}}},
 decisionReceipts:{"r1":{selectedChoiceId:"get_closer",createdAt:1}}
};
state=MOD.buildProjectionState({snapshot:fieldSnapshot,history:[],terminalFacts:{success:true,packageRecovered:false,packageState:{holderClass:"PACKAGE_SMUGGLER",stateRef:"pkg-ps"},pakkunPresentAtDebrief:false,battleFacts:[]},localContext:{}});
report=MOD.reportText(state);receipt=MOD.receiptText(state);minato=MOD.minatoText(state);
assert(report.includes("KAKASHI_PS_ALT_NIGHT_STREET"));
assert(receipt.includes("Package Smuggler — Field-secured alive."));
assert(minato.includes("He left them secured and kept moving."));
assert(!report.includes("in ANBU custody"));

// MI package-taking module is distinct from generic package loss.
state=MOD.buildProjectionState({
 snapshot:{participantStates:{[MI]:{participantRef:MI,stateClass:"ESCAPED",resultRef:"mi-escape"}},materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-mi",value:{currentHolderClass:"MASKED_INTERCEPTOR",custodyClass:"MASKED_INTERCEPTOR"}}},decisionReceipts:{"r1":{selectedChoiceId:"attack",createdAt:1}}},
 history:[],terminalFacts:{success:true,packageRecovered:false,packageState:{holderClass:"MASKED_INTERCEPTOR",stateRef:"pkg-mi"},pakkunPresentAtDebrief:false,battleFacts:[]},localContext:{}
});
assert(MOD.reportText(state).includes("The masked shinobi took it."));
assert(MOD.receiptText(state).includes("Package — Taken from Kakashi by Masked Interceptor."));

// Surgical tranche regressions: committed root identity beats reconvergence-local compatibility flags.
state=MOD.buildProjectionState({
 snapshot:{participantStates:{},materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-root",value:{currentHolderClass:"ANBU",custodyClass:"ANBU"}}},decisionReceipts:{"root":{selectedChoiceId:"get_closer",createdAt:1},"later":{selectedChoiceId:"observe",createdAt:2}}},
 history:[],terminalFacts:{success:true,packageRecovered:true,packageState:{holderClass:"ANBU",stateRef:"pkg-root"},pakkunPresentAtDebrief:false,battleFacts:[]},localContext:{kakashiOriginalAction:"observe"}
});
assert(MOD.receiptText(state).includes("FIRST ACTION\nMOVE IN CLOSER"),"reconvergence overwrote committed root choice");

// Canonical 35300 ask-destination Knowledge shape must survive terminal projection.
state=MOD.buildProjectionState({
 snapshot:{participantStates:{},materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-ask",value:{currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET"}}},decisionReceipts:{"root":{selectedChoiceId:"get_closer",createdAt:1}}},
 history:[{occurrenceId:"ask-destination",fact:{factClass:"academy_kakashi_ask_destination_knowledge_state",storySceneInstanceId:"qa-terminal",knowledgeStateByObserver:{[KAK]:{amtRoleEndedAtHandoff:true,amtKnowsDownstreamDestination:false}}}}],
 terminalFacts:{success:true,packageRecovered:false,packageState:{holderClass:"ANBU_MARKED_TARGET",stateRef:"pkg-ask"},pakkunPresentAtDebrief:false,battleFacts:[]},localContext:{}
});
assert(MOD.reportText(state).includes("His job ended at the handoff."),"ask-destination report Knowledge missing");
assert(MOD.receiptText(state).includes("Unknown to original carrier."),"ask-destination Receipt Knowledge missing");
assert(MOD.minatoText(state).includes("where the original carrier's Knowledge ended"),"ask-destination Minato Knowledge missing");

// Clean extraction uses the locked no-fight terminal lens and remains Battle-free.
state=MOD.buildProjectionState({
 snapshot:{participantStates:{},materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-clean",value:{currentHolderClass:"ANBU",custodyClass:"ANBU"}}},decisionReceipts:{"root":{selectedChoiceId:"attempt_pickpocket",createdAt:1}}},
 history:[{occurrenceId:"clean",fact:{factClass:"academy_kakashi_direct_pickpocket_factual_state",storySceneInstanceId:"qa-terminal",worldFacts:{cleanExtractionSucceeded:true}}}],
 terminalFacts:{success:true,packageRecovered:true,packageState:{holderClass:"ANBU",stateRef:"pkg-clean"},pakkunPresentAtDebrief:false,battleFacts:[]},localContext:{}
});
assert(MOD.reportText(state).includes("Clean enough."),"clean-extraction ANBU report module missing");
assert(MOD.minatoText(state).includes("Sometimes the cleanest decision leaves the least to discuss."),"clean-extraction Minato lens missing");
assert(MOD.receiptText(state).includes("No PL Battle materially resolved."),"clean extraction invented a Battle");

// Legacy defeated-but-not-controlled is normalized to the locked unrestrained wording.
state=MOD.buildProjectionState({
 snapshot:{participantStates:{[PS]:{participantRef:PS,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"legacy-ps"}},materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-legacy",value:{currentHolderClass:"ANBU",custodyClass:"ANBU"}}},decisionReceipts:{"root":{selectedChoiceId:"observe",createdAt:1}}},
 history:[],terminalFacts:{success:true,packageRecovered:true,packageState:{holderClass:"ANBU",stateRef:"pkg-legacy"},pakkunPresentAtDebrief:false,battleFacts:[]},localContext:{}
});
assert(MOD.receiptText(state).includes("Package Smuggler — Defeated; left alive and unrestrained."),"legacy defeated state leaked internal wording");

// Exact escape modules distinguish package holder and AMT Battle defeat.
state=MOD.buildProjectionState({
 snapshot:{participantStates:{[PS]:{participantRef:PS,stateClass:"ESCAPED",resultRef:"ps-escape"},[AMT]:{participantRef:AMT,stateClass:"ESCAPED",resultRef:"amt-escape"}},materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-ps-escape",value:{currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER"}}},decisionReceipts:{"root":{selectedChoiceId:"attack",createdAt:1}}},
 history:[],terminalFacts:{success:true,packageRecovered:false,packageState:{holderClass:"PACKAGE_SMUGGLER",stateRef:"pkg-ps-escape"},pakkunPresentAtDebrief:false,battleFacts:[{battleConfigId:"academy_kakashi_origin_battle_amt_ps_2v1",resultState:"opposition_side_victory",capturedAt:1}]},localContext:{}
});
receipt=MOD.receiptText(state);
assert(receipt.includes("Package Smuggler — Escaped with package."),"PS package escape was flattened");
assert(receipt.includes("ANBU Marked Target — Defeated Kakashi and escaped."),"AMT Battle-defeat escape was flattened");

// Two-target kill with MI unseen must not turn her absence into a Kakashi survivor decision.
state=MOD.buildProjectionState({
 snapshot:{participantStates:{[PS]:{participantRef:PS,stateClass:"DEAD",resultRef:"kill-ps"},[AMT]:{participantRef:AMT,stateClass:"DEAD",resultRef:"kill-amt"}},materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-two-kill",value:{currentHolderClass:"KAKASHI",custodyClass:"KAKASHI"}}},decisionReceipts:{"root":{selectedChoiceId:"get_closer",createdAt:1}}},
 history:[{occurrenceId:"unseen-mi",fact:{storySceneInstanceId:"qa-terminal",participantStateByRef:{[MI]:{presenceState:"UNSEEN"}}}},{occurrenceId:"kill-ps",fact:{storySceneInstanceId:"qa-terminal",targetRef:PS,targetDeathConfirmed:true}},{occurrenceId:"kill-amt",fact:{storySceneInstanceId:"qa-terminal",targetRef:AMT,targetDeathConfirmed:true}}],
 terminalFacts:{success:true,packageRecovered:true,packageState:{holderClass:"KAKASHI",stateRef:"pkg-two-kill"},pakkunPresentAtDebrief:false,battleFacts:[]},localContext:{}
});
minato=MOD.minatoText(state);
assert(minato.includes("The masked operative never entered his route."),"MI-unseen private projection missing");
assert(minato.includes("don't count her absence as a decision Kakashi made."),"MI-unseen decision law missing");

// Kakashi-facing Receipt must not expose Pakkun's name where name Knowledge was never granted.
state=MOD.buildProjectionState({snapshot:{participantStates:{[PAKKUN]:{participantRef:PAKKUN,stateClass:"DEPARTED",resultRef:"pakkun-departed"}},materialStates:{[PACKAGE]:{materialRef:PACKAGE,resolved:true,stateRef:"pkg-ninken",value:{currentHolderClass:"ANBU",custodyClass:"ANBU"}}},decisionReceipts:{"root":{selectedChoiceId:"observe",createdAt:1}}},history:[{occurrenceId:"pakkun-witness",fact:{storySceneInstanceId:"qa-terminal",worldFacts:{pakkunPresent:true}}}],terminalFacts:{success:true,packageRecovered:true,packageState:{holderClass:"ANBU",stateRef:"pkg-ninken"},pakkunPresentAtDebrief:false,battleFacts:[]},localContext:{kakashiKonohaPakkunPresent:false}});
receipt=MOD.receiptText(state);
assert(receipt.includes("\nNINKEN\nTemporary ninken intervention — Involved."),"ninken Receipt section missing");
assert(!receipt.includes("\nPAKKUN\n"),"Kakashi-facing Receipt leaked Pakkun identity");

// A branch-specific report takes precedence; 35940 does not narrate a second report.
state=MOD.buildProjectionState({
 snapshot:fieldSnapshot,
 history:[{occurrenceId:"specific-report",fact:{factClass:"academy_kakashi_scene07_w2d_anbu_report",truthfulReport:true,storySceneInstanceId:"qa-terminal"}}],
 terminalFacts:{success:true,packageRecovered:false,packageState:{holderClass:"PACKAGE_SMUGGLER",stateRef:"pkg-ps"},pakkunPresentAtDebrief:false,battleFacts:[]},localContext:{}
});
assert.strictEqual(state.specificReportAlreadyCommitted,true);
assert(MOD.reportText(state).includes("remains authoritative"));
assert(!MOD.reportText(state).includes("The receiver got away with it."));

// Installed 35100 expression beats are overridden, while completion ownership is untouched.
assert.strictEqual(typeof beatMap.get("kak_terminal_debrief_summary_35100").presentationResolver,"function");
assert.strictEqual(typeof beatMap.get("kak_terminal_minato_private_evaluation_35100").presentationResolver,"undefined","35940 must not independently render flattened Minato narration");
assert.strictEqual(typeof MOD.minatoPerformance,"function");
assert.strictEqual(typeof beatMap.get("kak_terminal_chronicle_receipt_35100").presentationResolver,"function");
assert.strictEqual(typeof globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100.guardedOriginCompletion,"function");

diag=globalThis.runAcademyKakashiDynamicTerminal35940Diagnostics();
assert.strictEqual(diag.pass,true);

console.log("Academy Kakashi dynamic terminal 35940 QA: PASS");
console.log("- terminal expression consumes committed state without creating package, custody, death, Knowledge or Pakkun facts");
console.log("- three-kill and mixed-lethal projections remain identity-aware and package-independent");
console.log("- field-secured exact location, Police/ANBU custody, release and unrestrained states remain distinct");
console.log("- Get-Closer contingency Knowledge is preserved without inventing downstream destination");
console.log("- Chronicle Receipt lists exact package, participant, Battle, lethal and Pakkun modules");
console.log("- branch-specific ANBU reports take precedence over the dynamic fallback");
console.log("- gen69 Battle returns are captured into the existing 35100 terminal owner");
console.log("- Browser Golden is intentionally NOT claimed by this headless harness");
