#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const game = fs.readFileSync(path.join(root, "game.js"), "utf8");
const sprint = fs.readFileSync(path.join(root, "runtime", "alpha-alpha-sprint-33100.js"), "utf8");

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
const silentConsole = { log(){}, info(){}, warn(){}, error(){}, table(){} };
const context = {
  console: silentConsole,
  localStorage: storageShim(storage),
  sessionStorage: storageShim(sessionStore),
  document: {
    getElementById(){ return null; }, querySelector(){ return null; }, querySelectorAll(){ return []; },
    createElement(){ return dummy(); }, body: dummy(),
    addEventListener(){}, removeEventListener(){},
  },
  requestAnimationFrame(){ return 0; }, cancelAnimationFrame(){},
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
  check("m1_whisper_woods_diagnostic", m1Whisper.pass === true, m1Whisper);

  const m1Contact = call("runAlphaArc1M1WhisperMajorContactStoryCallerDiagnostics");
  check("m1_major_contact_story_caller_diagnostic", m1Contact.pass === true, m1Contact);

  const m5 = call("runAlphaMission5FemaleOperatorEncounterDiagnostics");
  check("m5_female_operator_diagnostic", m5.pass === true, m5);

  const m1112 = call("runAlphaIssue41SourceDiagnostics");
  check("m11_m12_source_runtime_diagnostic", m1112.pass === true, m1112);

  const m1112Hardening = call("runAlphaBrick5499DeliveryHardeningDiagnostics");
  check("m11_m12_delivery_hardening_diagnostic", m1112Hardening.pass === true, m1112Hardening);

  // Replace only the caller-return and legacy-continue functions before loading
  // 33100. The sprint must capture these spies exactly as a browser runtime
  // would capture the preceding implementations in parser order.
  run(`
    globalThis.__issue141ReturnCalls=[];
    globalThis.__issue141LegacyContinueCalls=0;
    resumeBattleCallerAfterCompletion=function(outcome){
      globalThis.__issue141ReturnCalls.push(outcome);
      return {success:true,outcome,destination:"same_story_scene"};
    };
    continueAfterVictory=function(){
      globalThis.__issue141LegacyContinueCalls += 1;
      return {success:true,legacy:true};
    };
    openOverlay=function(type){ return {success:true,type}; };
  `, "issue141-return-spies.js");

  run(sprint, "runtime/alpha-alpha-sprint-33100.js");

  const sprintDiag = call("runAlphaPlayableSprint33100Diagnostics");
  check("33100_internal_diagnostic", sprintDiag.pass === true && sprintDiag.browserGoldenClaimed === false, sprintDiag);

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
    victory && victory.success === true && victory.alpha33100StoryReturnPriority === true &&
      victoryCalls.length === 1 && victoryCalls[0] === "victory" && context.__issue141LegacyContinueCalls === 0,
    { victory, victoryCalls, legacyCalls: context.__issue141LegacyContinueCalls }
  );

  // Without claimed rewards, the wrapper must not consume the Story return;
  // predecessor lifecycle remains authoritative.
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

  // Setback uses the same exact caller mechanism but with factual defeat. The
  // 33100 source diagnostic separately pins Battle-PL withdrawal != injury/death.
  const setback = plain(run(`
    currentBattle={
      active:false,battleOver:true,
      outcome:{type:"defeat",battlePLWithdrawal:true,injuryInferred:false,deathInferred:false},
      rewards:{claimed:false},
      returnContext:{type:"story_scene",missionId:"fixture_mission",sceneId:"fixture_scene"}
    };
    continueAfterSetback33100();
  `, "issue141-setback-return.js"));
  check(
    "story_setback_returns_exact_caller",
    setback && setback.success === true && setback.alpha33100SetbackReturn === true &&
      context.__issue141ReturnCalls.length === 2 && context.__issue141ReturnCalls[1] === "defeat",
    { setback, returnCalls: plain(context.__issue141ReturnCalls) }
  );

  check(
    "setback_semantics_no_injury_death_inference",
    sprintDiag.checks && sprintDiag.checks.defeatIsBattlePLWithdrawal === true && sprintDiag.checks.defeatDoesNotInferInjuryOrDeath === true,
    sprintDiag.checks
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
