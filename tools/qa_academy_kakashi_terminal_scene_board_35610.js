#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
const retired=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-terminal-scene-board-35610.js"),"utf8");
const loader=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-final-origin-adapter-34100.js"),"utf8");
const origin=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-original-origin-restoration-33800.js"),"utf8");
const polish=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-scene-board-polish-33910.js"),"utf8");
assert(retired.includes("RETIRED — 2026-09-21"),"35610 retirement tombstone missing");
assert(retired.includes("Intentionally no runtime side effects."),"35610 must be inert");
assert(!retired.includes("MutationObserver")&&!retired.includes("innerHTML=")&&!retired.includes("registerSceneBackdropAssetPath("),"35610 still owns runtime behavior");
assert(!loader.includes("alpha-kakashi-terminal-scene-board-35610.js"),"35610 still production-loaded");
assert(origin.includes('[hokage.assetId]:"Kakashi Origin Backdrop/hokage_administration_interior_night.png"'),"Hokage backdrop was not migrated to 33800");
assert(polish.includes('HOKAGE ADMINISTRATION · NIGHT')&&polish.includes('Assets/Kage/kage_minato.png'),"terminal actor/presentation ownership missing from 33910");
console.log("Academy Kakashi 35610 retirement QA: PASS");
console.log("- 35610 inert and de-loaded; backdrop migrated to 33800; terminal presentation remains 33910");
