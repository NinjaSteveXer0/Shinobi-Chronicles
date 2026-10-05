#!/usr/bin/env node
"use strict";

const assert=require("assert");
const path=require("path");
const ROOT=path.resolve(__dirname,"..");
const manifest=require(path.join(ROOT,"qa/production_consumption_manifest_528.json"));
const matrix=require(path.join(ROOT,"qa/production_change_impact_matrix_528.json"));
const gate=require("./qa_production_conformance_528.js");

function clone(value){return JSON.parse(JSON.stringify(value));}

const schemaErrors=gate.validateManifestAndMatrix(manifest,matrix);
assert.deepStrictEqual(schemaErrors,[],"live #528 manifest/matrix must validate: "+schemaErrors.join(" | "));

const rowStates=gate.evaluateRowStates(manifest);
assert(rowStates.some(row=>row.id==="battle_pouch_discoverability_463"&&row.computed==="INTENTIONALLY_QUEUED"),"#463 must remain intentionally queued");
assert(rowStates.some(row=>row.id==="stats_skills_exams_combat_519"&&row.computed==="INTENTIONALLY_QUEUED"),"#519 must remain intentionally queued");
assert(rowStates.filter(row=>row.computed==="CURRENT").length>=7,"expected current production canaries are missing");
assert(!rowStates.some(row=>row.computed==="BROKEN"||row.computed==="INDETERMINATE"),"live manifest contains blocking state");

const depthPlan=gate.buildPlan(manifest,matrix,{mode:"pr",changedFiles:["runtime/alpha-story-scene-board-33900.js"]});
assert(depthPlan.laneIds.includes("issue32_static"),"#32 static canary not selected");
assert(depthPlan.laneIds.includes("issue32_browser"),"#32 browser canary not selected");
assert.strictEqual(depthPlan.unclassifiedChanges.length,0,"#32 change must be classified");

const infraPlan=gate.buildPlan(manifest,matrix,{mode:"pr",changedFiles:["tools/qa_production_conformance_528.js"]});
for(const lane of ["issue461_static","issue499_static","issue517_static","issue524_static","issue32_browser","issue469_browser","issue532_browser"]){
  assert(infraPlan.laneIds.includes(lane),"firewall bootstrap missing lane "+lane);
}
assert.strictEqual(infraPlan.browserRequired,true,"firewall bootstrap should request representative browser proof");

const schedulePlan=gate.buildPlan(manifest,matrix,{mode:"scheduled",changedFiles:[]});
assert(schedulePlan.laneIds.includes("issue32_browser"),"scheduled sweep must include Chronicle depth browser canary");
assert(schedulePlan.laneIds.includes("issue469_browser"),"scheduled sweep must include CE hotspot browser canary");
assert(schedulePlan.laneIds.includes("issue532_browser"),"scheduled sweep must include team assignment browser canary");
assert(!schedulePlan.laneIds.includes("issue461_browser"),"scheduled sweep must remain representative rather than blanket browser regression");
assert(!schedulePlan.laneIds.includes("issue524_browser"),"scheduled sweep must remain representative rather than blanket browser regression");

const unknownPlan=gate.buildPlan(manifest,matrix,{mode:"pr",changedFiles:["runtime/new-unclassified-production-owner.js"]});
assert.deepStrictEqual(unknownPlan.unclassifiedChanges,["runtime/new-unclassified-production-owner.js"],"unknown production change must fail closed as indeterminate");

const duplicate=clone(manifest);duplicate.rows.push(clone(duplicate.rows[0]));
assert(gate.validateManifestAndMatrix(duplicate,matrix,{skipFileChecks:true}).some(error=>error.includes("duplicate manifest row id")),"duplicate manifest row must be rejected");

const queuedWithoutReason=clone(manifest);queuedWithoutReason.rows.find(row=>row.id==="battle_pouch_discoverability_463").queue_reason="";
assert(gate.validateManifestAndMatrix(queuedWithoutReason,matrix,{skipFileChecks:true}).some(error=>error.includes("queued row requires queue_reason")),"queued state without reason must be rejected");

const badLane=clone(matrix);badLane.rules[0].required_lane_ids.push("does_not_exist");
assert(gate.validateManifestAndMatrix(manifest,badLane,{skipFileChecks:true}).some(error=>error.includes("unknown lane does_not_exist")),"unknown lane must be rejected");

const queuedIsNotBroken=rowStates.filter(row=>row.computed==="INTENTIONALLY_QUEUED").every(row=>!row.reasons.some(reason=>/^missing:/.test(reason)));
assert(queuedIsNotBroken,"queued rows must not be converted into missing-production failures");

console.log(JSON.stringify({
  pass:true,
  issue:528,
  stateModel:["CURRENT","BROKEN","INTENTIONALLY_QUEUED","INDETERMINATE"],
  liveCurrentRows:rowStates.filter(row=>row.computed==="CURRENT").map(row=>row.id),
  intentionallyQueued:rowStates.filter(row=>row.computed==="INTENTIONALLY_QUEUED").map(row=>row.id),
  targetedDepthSelection:true,
  unknownProductionFailsClosed:true,
  scheduledRepresentativeNotBlanket:true,
  duplicateManifestRejected:true,
  invalidQueuedStateRejected:true,
  invalidLaneRejected:true
},null,2));
