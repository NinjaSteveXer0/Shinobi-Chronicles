#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const game = fs.readFileSync(path.join(root, "game.js"), "utf8");
const roster = fs.readFileSync(path.join(root, "runtime", "alpha-genin-roster-63.js"), "utf8");
const bridge = fs.readFileSync(path.join(root, "runtime", "alpha-traversal-bridge-33200.js"), "utf8");

const store = new Map();
const routes = [];
let rosterResumeCalls = 0;
const dummy = () => ({
  style: {}, dataset: {}, classList: { add(){}, remove(){}, toggle(){} },
  appendChild(){}, remove(){}, setAttribute(){}, querySelector(){ return null; },
  querySelectorAll(){ return []; }, addEventListener(){}, removeEventListener(){},
  getContext(){ return {}; }, focus(){}, click(){}, innerHTML: "", textContent: "",
  value: "", checked: false, disabled: false,
});
const silentConsole = { log(){}, info(){}, warn(){}, error(){}, table(){} };
const context = {
  console: silentConsole,
  localStorage: {
    getItem: key => store.has(key) ? store.get(key) : null,
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: key => store.delete(key),
    clear: () => store.clear(),
  },
  document: {
    getElementById(){ return null; }, querySelector(){ return null; }, querySelectorAll(){ return []; },
    createElement(){ return dummy(); }, body: dummy(), documentElement: dummy(),
    addEventListener(){}, removeEventListener(){},
  },
  requestAnimationFrame(){ return 0; }, cancelAnimationFrame(){},
  alert(){}, confirm(){ return true; }, prompt(){ return null; },
  Image: function(){ return dummy(); }, navigator: { userAgent: "node-issue141-traversal" },
  location: { reload(){}, href: "http://localhost/" }, addEventListener(){}, removeEventListener(){},
  setTimeout, clearTimeout, setInterval, clearInterval, Date, Math, JSON, Object, Array, Set, Map,
  Number, String, Boolean, RegExp, Error, TypeError, parseInt, parseFloat, Infinity, NaN,
};
context.window = context;
context.globalThis = context;
vm.createContext(context);

function run(source, filename){ vm.runInContext(source, context, { filename }); }
run(game, "game.js");
run(roster, "runtime/alpha-genin-roster-63.js");

// The bridge is navigation-only. Replace the browser-facing prior routes with
// deterministic spies after the authoritative #63 runtime has loaded, so this
// harness tests the bridge's decision seam without pretending to be a browser.
context.openOverlay = function(route){ routes.push(route); return { success: true, route }; };
context.openGeninRosterTransitionUI = function(){ rosterResumeCalls += 1; return { success: true, destination: "genin_roster" }; };
context.openArenaPromotionSurface = function(subjectId){ return { success: true, destination: "promotion", subjectId: subjectId || null }; };
run(bridge, "runtime/alpha-traversal-bridge-33200.js");

const test = `
(function(){
  const rows = {};
  function check(name, condition, details=null){
    rows[name] = { pass: !!condition, details };
    if(!condition) throw new Error(name + ":" + JSON.stringify(details));
  }

  resetAlphaDiagnosticPlayerToFreshSave();
  for(const id of ["academy_menma", "academy_hinata", "academy_kushina"]){
    const r = commitCharacterAcquisition({ variantId:id, route:"diagnostic", sourceEventId:"issue141:"+id });
    check("acquire_"+id, r.success, r);
  }
  const s = ensurePlayerAcquisitionState();
  s.chronicleOriginVariantId = "academy_menma";
  s.chronicleOriginOwnedCharacterId = "owned_character_academy_menma";
  s.chronicleOrigin = { ...(s.chronicleOrigin||{}), variantId:"academy_menma", ownedCharacterId:"owned_character_academy_menma", prologueCompleted:true, activeKonohaEntered:true };
  s.academyTeamFormation = {
    ...(s.academyTeamFormation||{}), unlocked:true, required:false, completed:true,
    selectedTeammateIds:["academy_hinata","academy_kushina"],
    eligibleCandidateVariantIds:["academy_hinata","academy_kushina"],
    completedAt:1000, confirmationReceipt:{ receiptId:"issue141_academy_team_receipt" },
    continuationCompleted:true, continuedAt:1001
  };

  const promotion = recordOwnedCharacterGeninPromotion("owned_character_academy_menma", ["issue141_promotion"]);
  check("promotion_committed", promotion.success, promotion);

  let transition = getGeninRosterTransitionState();
  check("promotion_unlocks_roster_transition", transition.unlocked===true && transition.required===true && transition.completed!==true, transition);
  const snapshotResult = ensureAlphaFirstProductionGeninCandidateSnapshot();
  transition = getGeninRosterTransitionState();
  check("fresh_lineage_snapshot", snapshotResult.success && !!transition.candidateSnapshotId, snapshotResult);
  const snapshotId = transition.candidateSnapshotId;

  const recruit = commitGeninRosterTransitionRecruitment({ variantId:"genin_hashirama", expectedSnapshotId:snapshotId });
  check("explicit_recruitment_only", recruit.success && recruit.assignmentCommitted===false, recruit);
  check("select_recruited_teammate", selectGeninRosterTransitionTeammate(1, "genin_hashirama", snapshotId).success);
  check("retain_academy_teammate", selectGeninRosterTransitionTeammate(2, "academy_kushina", snapshotId).success);
  check("select_institutional_leader", selectGeninRosterTransitionJoninLeader("sj_anko", snapshotId).success);

  const save = saveGeninRosterTransitionReservations({ expectedSnapshotId:snapshotId });
  check("save_reserves_not_assigns", save.success && save.assignmentCommitted===false && getGeninRosterTransitionState().completed!==true, save);

  const promotionResume = openArenaPromotionSurface("owned_character_academy_menma");
  check("arena_promotion_resumes_incomplete_roster", promotionResume.success && promotionResume.alpha33200PromotionResume===true && promotionResume.destination==="genin_roster", promotionResume);

  const beforeReload = getGeninRosterTransitionState();
  reloadAlphaDiagnosticPlayerFromSave();
  const afterReload = getGeninRosterTransitionState();
  check(
    "reload_preserves_snapshot_and_reservations",
    beforeReload.candidateSnapshotId===afterReload.candidateSnapshotId &&
      afterReload.reservedGeninVariantIds.includes("genin_hashirama") &&
      afterReload.reservedLeaderVariantId==="sj_anko",
    { before:beforeReload.candidateSnapshotId, after:afterReload.candidateSnapshotId, reserved:afterReload.reservedGeninVariantIds, leader:afterReload.reservedLeaderVariantId }
  );

  const final = confirmGeninRosterTransition();
  transition = getGeninRosterTransitionState();
  check("continue_finalises_exact_transition", final.success && transition.completed===true && transition.finalisationState==="FINALIZED", final);
  check("leader_not_collectible_owned", !isCharacterRegistryOwned("sj_anko"));

  const acquisitionBeforeJourney = JSON.stringify(ensurePlayerAcquisitionState());
  const journey = openGeninRosterTransitionUI();
  check("completed_roster_routes_current_journey", journey.success && journey.destination==="missions" && journey.alpha33200===true, journey);
  const journeyAgain = openGeninRosterTransitionUI();
  check("journey_reentry_idempotent", journeyAgain.success && journeyAgain.destination==="missions", journeyAgain);
  const acquisitionAfterJourney = JSON.stringify(ensurePlayerAcquisitionState());
  check("navigation_does_not_mutate_acquisition", acquisitionBeforeJourney===acquisitionAfterJourney);

  const diag = runAlphaTraversalBridge33200Diagnostics();
  check("bridge_diagnostics_green", diag.pass===true && diag.browserGoldenClaimed===false, diag);

  globalThis.__issue141Traversal = {
    pass:true, rows, bridgeDiagnostic:diag,
    browserGoldenClaimed:false,
    authorityCreated:false
  };
})();
`;

let result;
try {
  run(test, "issue141-traversal-runtime-test.js");
  result = context.__issue141Traversal;
} catch (error) {
  console.error("Issue #141 traversal runtime QA FAIL:", error && error.stack || error);
  process.exit(1);
}

const failures = Object.entries(result.rows).filter(([, row]) => !row.pass).map(([name]) => name);
console.log(`Issue #141 traversal runtime QA: ${Object.keys(result.rows).length - failures.length}/${Object.keys(result.rows).length} PASS`);
console.log(`Roster resume calls: ${rosterResumeCalls} · Journey routes: ${routes.join(" -> ") || "none"}`);
console.log(`Bridge diagnostic: ${result.bridgeDiagnostic.pass ? "PASS" : "FAIL"} · browser Golden claimed: ${result.browserGoldenClaimed}`);
if(failures.length){
  console.error("Failed:", failures.join(", "));
  process.exit(1);
}
