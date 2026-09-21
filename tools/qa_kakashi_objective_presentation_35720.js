#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
const retired=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-objective-presentation-35720.js"),"utf8");
const loader=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-final-origin-adapter-34100.js"),"utf8");
const polish=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-scene-board-polish-33910.js"),"utf8");
const scene03=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-scene03a-35700.js"),"utf8");
assert(retired.includes("RETIRED — 2026-09-21"),"35720 retirement tombstone missing");
assert(retired.includes("Intentionally no runtime side effects."),"35720 must be inert");
assert(!loader.includes("alpha-kakashi-objective-presentation-35720.js"),"35720 still production-loaded");
assert(polish.includes("min-width:310px!important")&&polish.includes("min-height:62px!important")&&polish.includes("font-size:18px!important"),"Objective sizing was not migrated to 33910");
assert(scene03.includes('rt.beatId!=="kak_original_rooftop"')&&scene03.includes("Number(p.index)>=8"),"Rooftop Objective reveal gate is not owned by 35700");
assert(scene03.includes("registerStorySceneBoardRenderHook"),"35700 objective sync is not delegated through canonical 33900 render hook");
console.log("Kakashi Objective retirement QA: PASS");
console.log("- 35720 inert and de-loaded; sizing is 33910-owned and reveal timing remains 35700 semantic presentation");
