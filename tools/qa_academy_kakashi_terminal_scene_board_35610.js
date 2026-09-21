#!/usr/bin/env node
"use strict";

const assert=require("assert");
const fs=require("fs");
const path=require("path");
const vm=require("vm");

const sourcePath=path.resolve(process.cwd(),"runtime/alpha-kakashi-terminal-scene-board-35610.js");
const source=fs.readFileSync(sourcePath,"utf8");

assert(source.includes("alpha_kakashi_terminal_scene_board_35610_v4_2026_09_21"),"35610 v4 compatibility patch id missing");
assert(!source.includes("new MutationObserver")&&!source.includes("observer.observe("),"retired terminal scene-board module must not install a DOM mutation observer");
assert(!source.includes("innerHTML="),"retired terminal scene-board module must not rewrite terminal board DOM");
assert(!source.includes("renderStorySceneBoard33900="),"retired terminal scene-board module must not wrap the live scene-board renderer");
assert(!source.includes(".environmentRef=ENV_REF"),"retired terminal scene-board module must not overwrite 35100 beat environments");

const registrations=[];
globalThis.registerSceneBackdropAssetPath=(id,asset)=>{registrations.push({id,asset});return{success:true,id,asset};};

vm.runInThisContext(source,{filename:"runtime/alpha-kakashi-terminal-scene-board-35610.js"});

const mod=globalThis.SC_ALPHA_KAKASHI_TERMINAL_SCENE_BOARD_35610;
assert(mod,"35610 compatibility module missing");
assert.strictEqual(mod.compatibilityOnly,true,"35610 must remain presentation compatibility only");
assert.strictEqual(mod.presentationOwner,"kakashi_scene_board_model_v15_33910_2026_09_21");
assert.strictEqual(mod.terminalOwner,"alpha_kakashi_terminal_debrief_35100_v10_2026_09_20");
assert(registrations.some(row=>row.id==="kakashi_origin_hokage_administration_interior_night"&&row.asset==="Kakashi Origin Backdrop/hokage_administration_interior_night.png"),"approved Hokage backdrop registration missing");

const diag=globalThis.runAcademyKakashiTerminalSceneBoard35610Diagnostics();
assert.strictEqual(diag.pass,true,"35610 diagnostics failed: "+JSON.stringify(diag.failed));

console.log("Academy Kakashi terminal scene-board 35610 compatibility QA: PASS");
console.log("- obsolete body MutationObserver render loop retired");
console.log("- 35100 remains terminal environment owner");
console.log("- 33910 remains terminal actor/presentation owner");
