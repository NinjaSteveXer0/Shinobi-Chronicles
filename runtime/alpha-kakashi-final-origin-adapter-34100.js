// ============================================================================
// ISSUES #188 + #192 — ACADEMY KAKASHI FINAL ADAPTER LOADER — 34100
//
// The final semantic adapter is preserved byte-for-byte in the 34100 core file.
// This stable front-door loads that core first, then the fail-closed 34200
// final-authority guard. Browser and headless QA therefore consume the same
// adapter without copying or re-authoring its semantics.
// ============================================================================
(function activateAlphaKakashiFinal34100(){
"use strict";

const CORE_PATH="runtime/alpha-kakashi-final-origin-adapter-34100-core.js";
const GUARD_PATH="runtime/alpha-kakashi-final-authority-guard-34200.js";
const BUILD="kakashi-final-20260915-2";

function loadHeadless(path){
  if(typeof require!=="function")return false;
  const fs=require("fs"),vm=require("vm"),pathModule=require("path");
  const absolute=pathModule.resolve(process.cwd(),path);
  vm.runInThisContext(fs.readFileSync(absolute,"utf8"),{filename:path});
  return true;
}

if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function"){
  if(!globalThis.SC_ALPHA_KAKASHI_FINAL_34100)loadHeadless(CORE_PATH);
  if(!globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200)loadHeadless(GUARD_PATH);
  return;
}

function loadGuard(){
  if(globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200||document.getElementById("sc-alpha-kakashi-final-authority-guard-34200-script"))return;
  const guard=document.createElement("script");
  guard.id="sc-alpha-kakashi-final-authority-guard-34200-script";
  guard.src=`${GUARD_PATH}?sc=${BUILD}`;
  guard.async=false;
  document.head.appendChild(guard);
}

if(globalThis.SC_ALPHA_KAKASHI_FINAL_34100){loadGuard();return;}
const existing=document.getElementById("sc-alpha-kakashi-final-34100-core-script");
if(existing){existing.addEventListener("load",loadGuard,{once:true});return;}
const core=document.createElement("script");
core.id="sc-alpha-kakashi-final-34100-core-script";
core.src=`${CORE_PATH}?sc=${BUILD}`;
core.async=false;
core.addEventListener("load",loadGuard,{once:true});
document.head.appendChild(core);
})();
