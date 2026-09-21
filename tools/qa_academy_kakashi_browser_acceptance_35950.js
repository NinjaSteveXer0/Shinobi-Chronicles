#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
const retired=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-browser-acceptance-35950.js"),"utf8");
const loader=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-final-origin-adapter-34100.js"),"utf8");
const route=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-konoha-route-closure-35910.js"),"utf8");
const move=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-move-closer-closure-35930.js"),"utf8");
assert(retired.includes("RETIRED — 2026-09-21"),"35950 retirement tombstone missing");
assert(retired.includes("Intentionally no runtime side effects."),"35950 must be inert");
assert(!loader.includes("alpha-kakashi-browser-acceptance-35950.js"),"35950 still production-loaded");
for(const token of ["kakashi_observe_secure_package_bridge_35910","kakashi_observe_sequential_bridge_35910","kakashi_secure_before_resolve_35910","kakashi_original_target_resolve_35910"])assert(route.includes(token),"35910 missing migrated Observe owner "+token);
for(const token of ["kakashi_move_closer_strike_35930","kakashi_move_closer_improved_pickpocket_35930","kakashi_move_closer_stop_ps_35930","kakashi_move_closer_cutoff_35930"])assert(move.includes(token),"35930 missing canonical Move-In-Closer owner "+token);
console.log("Academy Kakashi 35950 retirement QA: PASS");
console.log("- duplicate browser finaliser inert/de-loaded; Observe and Move-In-Closer bindings live in canonical route owners");
