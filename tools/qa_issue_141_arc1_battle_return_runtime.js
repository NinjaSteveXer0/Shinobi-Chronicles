#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const game = fs.readFileSync(path.join(root, "game.js"), "utf8");
const sprint = fs.readFileSync(path.join(root, "runtime", "alpha-alpha-sprint-33100.js"), "utf8");
const terminalResult = fs.readFileSync(path.join(root, "runtime", "alpha-battle-terminal-result-54400.js"), "utf8");

const storage = new Map();
const sessionStore = new Map();
const storageShim = map => ({
  getItem: key => map.has(key) ? map.get(key) : null,
  setItem: (key, value) => map.set(key, String(value)),
  removeItem: key => map.delete(key),
  clear: () => map.clear(),
});
const dummy = () => ({
  style: {}, dataset: {}, classList: { add(){}, remove(){}, toggle(){} },
  appendChild(){}, remove(){}, setAttribute(){}, getAttribute(){ return null; },
  querySelector(){ return null; }, querySelectorAll(){ return []; },
  addEventListener(){}, removeEventListener(){}, focus(){}, click(){},
  innerHTML: "", textContent: "", value: "", checked: false, disabled: false,
});
const overlayHost = dummy();
const overlayContainer = dummy();
const documentHead = dummy();
const silentConsole = { log(){}, info(){}, warn(){}, error(){}, table(){} };
const context = {
  console: silentConsole,
  localStorage: storageShim(storage),
  sessionStorage: storageShim(sessionStore),
  document: {
    head: documentHead,
    getElementById(id){
      if(id === "screen-overlay") return overlayHost;
      if(id === "overlay-content-container") return overlayContainer;
      return null;
    },
    querySelector(){ return null; }, querySelectorAll(){ return []; },
    createElement(){ return dummy(); }, body: dummy(),
    addEventListener(){}, removeEventListener(){},
  },
  requestAnimationFrame(){ return 0; }, cancelAnimationFrame(){},
  queueMicrotask(fn){ fn(); },
  alert(){}, confirm(){ return true; }, prompt(){ return null; },
  Image: function(){ return dummy(); }, navigator: { userAgent: "node-issue141-arc1" },
  location: { reload(){}, href: "http://localhost/" }, addEventListener(){}, removeEventListener(){},
  setTimeout, clearTimeout, setInterval, clearInterval, Date, Math, JSON, Object, Array, Set, Map,
  Number, String, Boolean, RegExp, Error, TypeError, parseInt, parseFloat, Infinity, NaN,
};
context.window = context;
context.globalThis = context;
vm.createContext(context);

function run(source, filename){ return vm.runInContext(source, context, { filename }); }
function plain(value){ return JSON.parse(JSON.stringify(value)); }
function call(name){
  const value = run(`typeof ${name} === "function" ? ${name}() : ({pass:false,missing:"${name}"})`, `call-${name}.js`);
  return plain(value);
}

try {
  run(game, "game.js");
} catch (error) {
  console.error("Issue #141 Arc-1 runtime closure could not load game.js:", error && error.stack || error);
  process.exit(1);
}

const rows = {};
function check(name, condition, details=null){
  rows[name] = { pass: !!condition, details };
  if(!condition) throw new Error(`${name}:${JSON.stringify(details)}`);
}

try {
  // Execute the live game.js diagnostics that own the major Arc-1 seams. These
  // are runtime calls, not text scans, and deliberately reuse existing package
  // authority rather than creating a parallel mission implementation.
  const m1Trace = call("runAlphaIssue90PreWhisperTraceDiagnostics");
  check("m1_three_person_trace_diagnostic", m1Trace.pass === true, m1Trace);

  const m1Whisper = call("runAlphaArc1M1WhisperWoodsContentDiagnostics");
  const whisperChecks = m1Whisper && m1Whisper.checks ? m1Whisper.checks : {};
  const whisperSemanticChecks = Object.entries(whisperChecks)
    .filter(([name]) => name !== "storyCallerReusable")
    .every(([, value]) => value === true);
  check(
    "m1_whisper_woods_semantics",
    m1Whisper && m1Whisper.error == null && whisperSemanticChecks,
    m1Whisper
  );

  // The original Whisper diagnostic predates the later Alpha mission-command
  // wrapper around resumeStorySceneReturnContext. The wrapper is legitimate:
  // it handles its one new return type and delegates all other contexts to the
  // pre-wrapper generic function. Test that architecture directly rather than
  // accepting the legacy diagnostic's brittle current-wrapper toString check.
  const storyCallerArchitecture = plain(run(`({
    wrapperDelegates: resumeStorySceneReturnContext.toString().includes("ALPHA_PRE12500_RESUME_STORY_RETURN_CONTEXT"),
    genericStoryCase: typeof ALPHA_PRE12500_RESUME_STORY_RETURN_CONTEXT === "function" && ALPHA_PRE12500_RESUME_STORY_RETURN_CONTEXT.toString().includes('case "story_scene"'),
    callerFactoryPresent: typeof createActiveStorySceneCallerContext === "function"
  })`, "issue141-story-caller-architecture.js"));
  check(
    "m1_story_caller_wrapper_delegates_generic",
    storyCallerArchitecture.wrapperDelegates === true &&
      storyCallerArchitecture.genericStoryCase === true &&
      storyCallerArchitecture.callerFactoryPresent === true,
    storyCallerArchitecture
  );

  const m1Contact = call("runAlphaArc1M1WhisperMajorContactStoryCallerDiagnostics");
  check("m1_major_contact_story_caller_diagnostic", m1Contact.pass === true, m1Contact);

  const m5 = call("runAlphaMission5FemaleOperatorEncounterDiagnostics");
  check("m5_female_operator_diagnostic", m5.pass === true, m5);

  const m1112 = call("runAlphaIssue41SourceDiagnostics");
  check("m11_m12_source_runtime_diagnostic", m1112.pass === true, m1112);

  const m1112Hardening = call("runAlphaBrick5499DeliveryHardeningDiagnostics");
  check("m11_m12_delivery_hardening_diagnostic", m1112Hardening.pass === true, m1112Hardening);

  // Replace only the caller-return, legacy-continue and overlay functions before
  // loading #33100 and then #544. #544 must capture these preceding authorities
  // exactly as the production parser order does.
  run(`
    globalThis.__issue141ReturnCalls=[];
    globalThis.__issue141LegacyContinueCalls=0;
    globalThis.__issue141OverlayCalls=[];
    globalThis.__issue141ForceReturnFailure=false;
    resumeBattleCallerAfterCompletion=function(outcome){
      globalThis.__issue141ReturnCalls.push(outcome);
      if(globalThis.__issue141ForceReturnFailure)return {success:false,reason:"fixture_story_return_failed"};
      return {success:true,outcome,destination:"same_story_scene"};
    };
    continueAfterVictory=function(){
      globalThis.__issue141LegacyContinueCalls += 1;
      return {success:true,legacy:true};
    };
    openOverlay=function(type){
      globalThis.__issue141OverlayCalls.push(type);
      return {success:true,type};
    };
  `, "issue141-return-spies.js");

  run(sprint, "runtime/alpha-alpha-sprint-33100.js");

  const sprintDiag = call("runAlphaPlayableSprint33100Diagnostics");
  check("33100_internal_diagnostic", sprintDiag.pass === true && sprintDiag.browserGoldenClaimed === false, sprintDiag);

  run(terminalResult, "runtime/alpha-battle-terminal-result-54400.js");
  const terminalOwner = plain(run(`({
    presenter: typeof presentCommittedBattleTerminalResult54400 === "function",
    setbackContinue: typeof continueAfterSetback54400 === "function",
    victoryContinue: typeof continueAfterVictory === "function" && continueAfterVictory.toString().includes("terminalResultOwner54400"),
    diagnostic: typeof getBattleTerminalResultPresentation54400 === "function"
  })`, "issue141-terminal-owner.js"));
  check(
    "54400_canonical_terminal_owner_loaded",
    terminalOwner.presenter === true && terminalOwner.setbackContinue === true && terminalOwner.victoryContinue === true && terminalOwner.diagnostic === true,
    terminalOwner
  );

  // Exact Story caller victory must outrank the legacy fallback after rewards
  // have been claimed. No mission-specific outcome is fabricated here.
  const victory = plain(run(`
    currentBattle={
      active:false,battleOver:true,
      outcome:{type:"victory"},
      rewards:{claimed:true},
      returnContext:{type:"story_scene",missionId:"fixture_mission",sceneId:"fixture_scene"}
    };
    continueAfterVictory();
  `, "issue141-victory-return.js"));
  const victoryCalls = plain(context.__issue141ReturnCalls);
  check(
    "story_victory_returns_before_legacy",
    victory && victory.success === true && victory.terminalResultOwner54400 === true && victory.terminalOutcome === "victory" &&
      victoryCalls.length === 1 && victoryCalls[0] === "victory" && context.__issue141LegacyContinueCalls === 0,
    { victory, victoryCalls, legacyCalls: context.__issue141LegacyContinueCalls }
  );

  // A broken authored Story continuation must fail closed on Victory. It must
  // never drop the player into the generic Combat Arena.
  const failedVictory = plain(run(`
    globalThis.__issue141ForceReturnFailure=true;
    const returnCallsBefore=globalThis.__issue141ReturnCalls.slice();
    const legacyBefore=globalThis.__issue141LegacyContinueCalls;
    const overlayBefore=globalThis.__issue141OverlayCalls.length;
    currentBattle={
      active:false,battleOver:true,
      outcome:{type:"victory"},
      rewards:{claimed:true},
      returnContext:{type:"story_scene",missionId:"fixture_mission",sceneId:"fixture_scene"}
    };
    const result=continueAfterVictory();
    const attemptedReturnCalls=globalThis.__issue141ReturnCalls.slice(returnCallsBefore.length);
    globalThis.__issue141ReturnCalls=returnCallsBefore;
    globalThis.__issue141ForceReturnFailure=false;
    ({result,attemptedReturnCalls,legacyBefore,legacyAfter:globalThis.__issue141LegacyContinueCalls,overlayCalls:globalThis.__issue141OverlayCalls.slice(overlayBefore)});
  `, "issue141-victory-return-fail-closed.js"));
  check(
    "story_victory_return_failure_never_opens_generic_arena",
    failedVictory && failedVictory.result && failedVictory.result.success === false &&
      failedVictory.result.reason === "fixture_story_return_failed" &&
      failedVictory.attemptedReturnCalls.length === 1 && failedVictory.attemptedReturnCalls[0] === "victory" &&
      failedVictory.legacyAfter === failedVictory.legacyBefore &&
      failedVictory.overlayCalls.includes("victory") && !failedVictory.overlayCalls.includes("battle"),
    failedVictory
  );

  // Without claimed rewards, #544 must delegate to the predecessor lifecycle;
  // it must not consume the Story return itself.
  const unclaimed = plain(run(`
    currentBattle={
      active:false,battleOver:true,
      outcome:{type:"victory"},
      rewards:{claimed:false},
      returnContext:{type:"story_scene",missionId:"fixture_mission",sceneId:"fixture_scene"}
    };
    continueAfterVictory();
  `, "issue141-unclaimed-return.js"));
  check(
    "unclaimed_victory_delegates_without_story_return",
    unclaimed && unclaimed.legacy === true && context.__issue141LegacyContinueCalls === 1 && context.__issue141ReturnCalls.length === 1,
    { unclaimed, returnCalls: plain(context.__issue141ReturnCalls), legacyCalls: context.__issue141LegacyContinueCalls }
  );

  // Setback is first projected from the already-committed factual defeat, then
  // Continue delegates to the exact caller through #544.
  const setback = plain(run(`
    currentBattle={
      active:false,battleOver:true,
      outcome:{type:"defeat"},
      rewards:{claimed:false},
      returnContext:{type:"story_scene",missionId:"fixture_mission",sceneId:"fixture_scene"}
    };
    const presented=presentCommittedBattleTerminalResult54400("defeat",{source:"issue141_runtime_qa"});
    const projection=getBattleTerminalResultPresentation54400();
    const continued=continueAfterSetback54400();
    ({presented,projection,continued});
  `, "issue141-setback-return.js"));
  check(
    "story_setback_returns_exact_caller",
    setback && setback.continued && setback.continued.success === true && setback.continued.terminalResultOwner54400 === true &&
      setback.continued.terminalOutcome === "defeat" && setback.projection && setback.projection.status === "presented" &&
      context.__issue141ReturnCalls.length === 2 && context.__issue141ReturnCalls[1] === "defeat",
    { setback, returnCalls: plain(context.__issue141ReturnCalls) }
  );

  const failedSetback = plain(run(`
    globalThis.__issue141ForceReturnFailure=true;
    const setbackOverlayBefore=globalThis.__issue141OverlayCalls.length;
    currentBattle={
      active:false,battleOver:true,
      outcome:{type:"defeat"},
      rewards:{claimed:false},
      returnContext:{type:"story_scene",missionId:"fixture_mission",sceneId:"fixture_scene"}
    };
    presentCommittedBattleTerminalResult54400("defeat",{source:"issue141_runtime_qa_failure"});
    const setbackFailResult=continueAfterSetback54400();
    const projection=getBattleTerminalResultPresentation54400();
    globalThis.__issue141ForceReturnFailure=false;
    ({result:setbackFailResult,projection,overlayCalls:globalThis.__issue141OverlayCalls.slice(setbackOverlayBefore)});
  `, "issue141-setback-return-fail-closed.js"));
  check(
    "story_setback_return_failure_never_opens_generic_arena",
    failedSetback && failedSetback.result && failedSetback.result.success === false &&
      failedSetback.result.reason === "fixture_story_return_failed" &&
      failedSetback.projection && failedSetback.projection.status === "presented" &&
      !failedSetback.overlayCalls.includes("battle"),
    failedSetback
  );

  check(
    "setback_semantics_no_injury_death_inference",
    failedSetback && failedSetback.projection && failedSetback.projection.committedOutcome === "defeat" &&
      failedSetback.projection.presentationOnly === true && failedSetback.projection.semanticWrite === false,
    failedSetback && failedSetback.projection
  );

  check(
    "no_browser_golden_claim",
    sprintDiag.browserGoldenClaimed === false,
    { browserGoldenClaimed: sprintDiag.browserGoldenClaimed }
  );
} catch (error) {
  console.error("Issue #141 Arc-1/Battle return runtime QA FAIL:", error && error.stack || error);
  for(const [name,row] of Object.entries(rows)) console.error(`${row.pass ? "PASS" : "FAIL"} ${name}`);
  process.exit(1);
}

const failed = Object.entries(rows).filter(([,row]) => !row.pass).map(([name]) => name);
const result = {
  issue: 141,
  pass: failed.length === 0,
  checks: Object.fromEntries(Object.entries(rows).map(([name,row]) => [name,row.pass])),
  failed,
  checkCount: Object.keys(rows).length,
  browserGoldenClaimed: false,
  authorityCreated: false,
};
console.log("Issue #141 Arc-1/Battle return runtime QA:", `${result.checkCount - failed.length}/${result.checkCount} PASS`);
console.log(JSON.stringify(result, null, 2));
if(failed.length) process.exit(1);
