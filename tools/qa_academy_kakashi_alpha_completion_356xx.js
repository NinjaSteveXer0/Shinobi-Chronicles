#!/usr/bin/env node
"use strict";

// RETIRED COMPLETION HARNESS — 2026-09-21
//
// This historical 356xx harness encoded obsolete Kakashi delivery generations
// and a superseded Minato asset path. Keeping those assertions as a second
// "completion" proof would violate the Coding/Runtime one-swoop campaign's
// single-completion-line rule.
//
// Current authority:
// - tools/fixtures/academy_kakashi_end_to_end_route_manifest_36000.json
// - tools/qa_academy_kakashi_end_to_end_route_matrix_36000.js
// - tools/qa_academy_kakashi_completion_tail_36000.js
//
// This tombstone is intentionally non-authoritative and must not be used to
// promote Kakashi to Browser Golden.

const fs=require("fs"),path=require("path"),assert=require("assert");
const root=path.resolve(__dirname,"..");
for(const rel of [
 "tools/fixtures/academy_kakashi_end_to_end_route_manifest_36000.json",
 "tools/qa_academy_kakashi_end_to_end_route_matrix_36000.js",
 "tools/qa_academy_kakashi_completion_tail_36000.js"
]){
 assert(fs.existsSync(path.join(root,rel)),"replacement Kakashi completion proof missing: "+rel);
}
const manifest=JSON.parse(fs.readFileSync(path.join(root,"tools/fixtures/academy_kakashi_end_to_end_route_manifest_36000.json"),"utf8"));
assert.strictEqual(manifest.browserGoldenClaimed,false);
assert.strictEqual(manifest.routes.length,13);

console.log(JSON.stringify({
 pass:true,
 retired:true,
 formerHarness:"qa_academy_kakashi_alpha_completion_356xx",
 replacedBy:"qa_academy_kakashi_end_to_end_route_matrix_36000",
 routeManifest:"academy_kakashi_end_to_end_route_manifest_36000",
 browserGoldenClaimed:false
},null,2));
