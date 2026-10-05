#!/usr/bin/env node
"use strict";

const assert=require("assert");
const path=require("path");
const ROOT=path.resolve(__dirname,"..");
const manifest=require(path.join(ROOT,"qa/production_consumption_manifest_528.json"));
const matrix=require(path.join(ROOT,"qa/production_change_impact_matrix_528.json"));
const ledger=require(path.join(ROOT,"qa/production_browser_canary_ledger_528.json"));
const gate=require("./qa_production_conformance_528.js");

function clone(value){return JSON.parse(JSON.stringify(value));}

const schemaErrors=gate.validateManifestAndMatrix(manifest,matrix);
assert.deepStrictEqual(schemaErrors,[],"live #528 manifest/matrix must validate: "+schemaErrors.join(" | "));
const ledgerErrors=gate.validateLedger(manifest,ledger);
assert.deepStrictEqual(ledgerErrors,[],"live #528 browser ledger must validate: "+ledgerErrors.join(" | "));
assert.deepStrictEqual(gate.LIFECYCLE_STAGE_ORDER,["DECLARED","REFERENCED","LOADED","REACHABLE","EFFECTIVE","OBSERVED","GOLDEN"]);

const rowStates=gate.evaluateRowStates(manifest);
assert(rowStates.some(row=>row.id==="battle_pouch_discoverability_463"&&row.computed==="INTENTIONALLY_QUEUED"),"#463 must remain intentionally queued");
assert(rowStates.some(row=>row.id==="stats_skills_exams_combat_519"&&row.computed==="INTENTIONALLY_QUEUED"),"#519 must remain intentionally queued");
for(const id of ["konoha_activity_surfaces_431","victory_setback_results_141","ui_active_masters_526","promotion_transition_141_63","frozen_origin_shared_runtime"]){
  assert(rowStates.some(row=>row.id===id&&row.computed==="CURRENT"),"missing tranche-2 current row "+id);
}
assert(rowStates.filter(row=>row.computed==="CURRENT").length>=12,"expected current production canaries are missing");
assert(!rowStates.some(row=>row.computed==="BROKEN"||row.computed==="INDETERMINATE"),"live manifest contains blocking state");
assert(rowStates.find(row=>row.id==="promotion_transition_141_63").lifecycleStage==="EFFECTIVE","Promotion must not pretend browser OBSERVED before that canary exists");

const queueRecords=new Map((manifest.queue_activation_records||[]).map(row=>[row.id,row]));
assert(queueRecords.has("expressive_scene_board_polish_490"),"#490 activation watch missing");
assert(queueRecords.has("battle_pouch_polish_463"),"#463 activation watch missing");
assert(queueRecords.has("stats_skills_exams_combat_519"),"#519 activation watch missing");
assert(queueRecords.has("selected_shinobi_loadout_526"),"loadout design activation watch missing");

const depthPlan=gate.buildPlan(manifest,matrix,{mode:"pr",changedFiles:["runtime/alpha-story-scene-board-33900.js"]});
assert(depthPlan.laneIds.includes("issue32_static"),"#32 static canary not selected");
assert(depthPlan.laneIds.includes("issue32_browser"),"#32 browser canary not selected");
assert(depthPlan.laneIds.includes("save_compatibility"),"frozen Origin shared-runtime save guard not selected");
assert(depthPlan.directInvalidatedRows.includes("chronicle_interaction_depth_32"),"#32 watched-path invalidation missing");
assert(depthPlan.directInvalidatedRows.includes("frozen_origin_shared_runtime"),"frozen Origin watched-path invalidation missing");
assert.strictEqual(depthPlan.unclassifiedChanges.length,0,"#32 change must be classified");

const pendingFreshness=gate.computeEvidenceFreshness(manifest,depthPlan,{pass:true,ledger:[]},{executeRequested:false});
assert(pendingFreshness.every(row=>row.state==="STALE_PENDING_RERUN"),"watched-path change must stale prior evidence before rerun");
const simulatedExecution={pass:true,ledger:depthPlan.laneIds.map(laneId=>({laneId,status:"CURRENT"}))};
const revalidatedFreshness=gate.computeEvidenceFreshness(manifest,depthPlan,simulatedExecution,{executeRequested:true});
assert(revalidatedFreshness.every(row=>row.state==="REVALIDATED"),"GREEN required lanes must revalidate only directly stale contracts");

const uiPlan=gate.buildPlan(manifest,matrix,{mode:"pr",changedFiles:["UI/victory.png"]});
assert(uiPlan.laneIds.includes("ui_master_browser"),"active UI master browser proof not selected");
assert(uiPlan.directInvalidatedRows.includes("ui_active_masters_526"),"UI master row not invalidated");
assert(uiPlan.directInvalidatedRows.includes("victory_setback_results_141"),"Victory/Setback row not invalidated");
assert.strictEqual(uiPlan.unclassifiedChanges.length,0,"active UI master change must be classified");

const infraPlan=gate.buildPlan(manifest,matrix,{mode:"pr",changedFiles:["tools/qa_production_conformance_528.js"]});
for(const lane of ["issue461_static","issue499_static","issue517_static","issue524_static","promotion_static","issue32_browser","issue469_browser","issue532_browser","ui_master_browser","issue431_browser"]){
  assert(infraPlan.laneIds.includes(lane),"firewall bootstrap missing lane "+lane);
}
assert.strictEqual(infraPlan.browserRequired,true,"firewall bootstrap should request representative browser proof");

const schedulePlan=gate.buildPlan(manifest,matrix,{mode:"scheduled",changedFiles:[]});
assert(schedulePlan.laneIds.includes("issue32_browser"),"scheduled sweep must include Chronicle depth browser canary");
assert(schedulePlan.laneIds.includes("issue469_browser"),"scheduled sweep must include CE hotspot browser canary");
assert(schedulePlan.laneIds.includes("issue532_browser"),"scheduled sweep must include team assignment browser canary");
assert(schedulePlan.laneIds.includes("ui_master_browser"),"scheduled sweep must include active UI master observable proof");
assert(!schedulePlan.laneIds.includes("issue461_browser"),"scheduled sweep must remain representative rather than blanket browser regression");
assert(!schedulePlan.laneIds.includes("issue524_browser"),"scheduled sweep must remain representative rather than blanket browser regression");

const unknownPlan=gate.buildPlan(manifest,matrix,{mode:"pr",changedFiles:["runtime/new-unclassified-production-owner.js"]});
assert.deepStrictEqual(unknownPlan.unclassifiedChanges,["runtime/new-unclassified-production-owner.js"],"unknown production change must fail closed as indeterminate");

const duplicate=clone(manifest);duplicate.rows.push(clone(duplicate.rows[0]));
assert(gate.validateManifestAndMatrix(duplicate,matrix,{skipFileChecks:true}).some(error=>error.includes("duplicate manifest row id")),"duplicate manifest row must be rejected");

const queuedWithoutReason=clone(manifest);queuedWithoutReason.rows.find(row=>row.id==="battle_pouch_discoverability_463").queue_reason="";
assert(gate.validateManifestAndMatrix(queuedWithoutReason,matrix,{skipFileChecks:true}).some(error=>error.includes("queued row requires queue_reason")),"queued state without reason must be rejected");

const badLifecycle=clone(manifest);badLifecycle.rows.find(row=>row.id==="inventory_core_461").lifecycle_stage="MAGIC";
assert(gate.validateManifestAndMatrix(badLifecycle,matrix,{skipFileChecks:true}).some(error=>error.includes("invalid or missing lifecycle_stage")),"invalid lifecycle stage must be rejected");

const badLane=clone(matrix);badLane.rules[0].required_lane_ids.push("does_not_exist");
assert(gate.validateManifestAndMatrix(manifest,badLane,{skipFileChecks:true}).some(error=>error.includes("unknown lane does_not_exist")),"unknown lane must be rejected");

const badLedger=clone(ledger);badLedger.canaries[0].contract_ids.push("does_not_exist");
assert(gate.validateLedger(manifest,badLedger,{skipFileChecks:true}).some(error=>error.includes("unknown manifest contract does_not_exist")),"browser canary may not cite orphan contract");

const goldenLedger=clone(ledger);goldenLedger.canaries[0].golden_claimed=true;
assert(gate.validateLedger(manifest,goldenLedger,{skipFileChecks:true}).some(error=>error.includes("may not claim Golden")),"automation may not promote owner Golden");

const queuedIsNotBroken=rowStates.filter(row=>row.computed==="INTENTIONALLY_QUEUED").every(row=>!row.reasons.some(reason=>/^missing:/.test(reason)));
assert(queuedIsNotBroken,"queued rows must not be converted into missing-production failures");

console.log(JSON.stringify({
  pass:true,
  issue:528,
  stateModel:["CURRENT","BROKEN","INTENTIONALLY_QUEUED","INDETERMINATE"],
  lifecycleDiagnosticOrder:gate.LIFECYCLE_STAGE_ORDER,
  liveCurrentRows:rowStates.filter(row=>row.computed==="CURRENT").map(row=>row.id),
  intentionallyQueued:rowStates.filter(row=>row.computed==="INTENTIONALLY_QUEUED").map(row=>row.id),
  browserCanaryCount:ledger.canaries.length,
  queueActivationWatchCount:(manifest.queue_activation_records||[]).length,
  targetedDepthSelection:true,
  targetedStaleEvidence:true,
  activeUiMasterSelection:true,
  unknownProductionFailsClosed:true,
  scheduledRepresentativeNotBlanket:true,
  duplicateManifestRejected:true,
  invalidQueuedStateRejected:true,
  invalidLifecycleRejected:true,
  invalidLaneRejected:true,
  orphanBrowserContractRejected:true,
  automatedGoldenPromotionRejected:true
},null,2));
