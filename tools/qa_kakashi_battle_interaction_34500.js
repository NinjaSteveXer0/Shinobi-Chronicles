#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const file=path.join(root,"runtime","alpha-kakashi-battle-interaction-hotfix-34500.js");
const gameFile=path.join(root,"game.js");
const src=fs.readFileSync(file,"utf8");
const gameSrc=fs.readFileSync(gameFile,"utf8");

const exactFive=[
  "academy_kakashi_kunai_quickdraw",
  "academy_kakashi_clone_feint",
  "academy_kakashi_opening_exploit",
  "academy_kakashi_wire_snare",
  "academy_kakashi_prodigy_read"
];

// Source contract: canonical five-skill source first, late DOM/deployment repair,
// both card generations, presentation-only hover, capture-owned click, and no
// replacement Battle resolver.
assert(src.includes('battle-live-skill-card:not(.is-empty)'),"live Battle cards must be covered");
assert(src.includes('battle-dev-skill-card:not(.is-empty)'),"legacy/dev Battle cards must be covered");
assert(src.includes('new MutationObserver'),"late/replaced Battle card DOM must be observed");
assert(src.includes('data-battle-skill-id'),"battleSkillId dataset generation must be accepted");
assert(src.includes('data-skill-id'),"skillId dataset generation must be accepted");
assert(src.includes('getBattleUISkillPalettePresentation'),"bridge must read the canonical Battle palette");
assert(src.includes('getBattlePreparedSkillDefinition'),"bridge must resolve canonical Battle definitions");
assert(src.includes('launchAcademyKakashiOriginPlBattle'),"bridge must harden after exact Kakashi deployment attachment");
assert(src.includes('visibleBattleSkills34500'),"listener-driven cards need active-actor Skill fallback");
assert(src.includes('renderTemporaryBattleSkillGuide'),"hover/focus must use the native Skill Guide renderer");
const guideBody=src.slice(src.indexOf("function renderGuide34500"),src.indexOf("function activate34500"));
assert(guideBody.length>0&&!guideBody.includes("selectBattlePreparedSkill("),"hover must not select a Skill");
assert(src.includes('activateBattlePreparedSkillCard'),"click should prefer an existing one-click Battle bridge");
assert(src.includes('confirmSelectedBattleSkill'),"fallback click must still reach native Battle confirmation");
assert(src.includes('stopImmediatePropagation'),"capture click must suppress competing select-only listeners");
assert(src.includes('addEventListener("click",act,true)'),"Kakashi click must own capture phase");
for(const forbidden of ["resolveBattleDamagePacket(","applyBattleDamage(","recordBattleEvidence("]){
  assert(!src.includes(forbidden),`34500 must not replace Battle resolution: ${forbidden}`);
}
assert(src.includes('browserGoldenClaimed:false'),"browser Golden must remain unclaimed");
for(const id of exactFive){
  assert(gameSrc.includes(id),`canonical game.js Battle authority must contain ${id}`);
}

// Headless semantic bridge. The exact Kakashi launcher deliberately attaches
// deployment metadata only when it returns; 34500 must wrap that seam without
// changing its result. The canonical palette exposes all five authored Skills.
delete global.SC_ALPHA_KAKASHI_BATTLE_INTERACTION_34500;
global.currentBattle={active:true,battleOver:false,kakashiOriginDeployment:null,selectedSkillId:null};
const actor={id:"academy_kakashi"};
const definitions=Object.fromEntries(exactFive.map(id=>[id,{id,name:id.replace(/_/g," ")}]))
let launchCalls=0,guideCalls=0,activateCalls=0,selectCalls=0,confirmCalls=0;
global.getBattleDeploymentParticipant=(side,slot)=>side==="player"&&slot===1?actor:null;
global.getBattleUISkillPalettePresentation=row=>{
  assert.strictEqual(row,actor,"palette must resolve for the active player actor");
  return{skillIds:[...exactFive]};
};
global.getBattlePreparedSkillDefinition=(row,id)=>{
  assert.strictEqual(row,actor,"definition lookup must use active player actor");
  return definitions[id]||null;
};
global.launchAcademyKakashiOriginPlBattle=()=>{
  launchCalls+=1;
  currentBattle.kakashiOriginDeployment={controllerParticipantId:"academy_kakashi"};
  return{success:true,battleConfigId:"academy_kakashi_origin_battle_mi_1v1"};
};
global.renderTemporaryBattleSkillGuide=skillId=>{guideCalls+=1;assert(exactFive.includes(skillId),"guide must receive one of the exact five Skill IDs");};
global.activateBattlePreparedSkillCard=skillId=>{activateCalls+=1;return{success:true,executed:true,skillId};};
global.selectBattlePreparedSkill=skillId=>{
  selectCalls+=1;
  currentBattle.selectedSkillId=skillId;
  return{success:true,skillId,branchSelectionRequired:skillId==="academy_kakashi_clone_feint"};
};
global.confirmSelectedBattleSkill=()=>{confirmCalls+=1;return{success:true,executed:true};};
global.document=undefined;
vm.runInThisContext(src,{filename:file});

assert.strictEqual(global.launchAcademyKakashiOriginPlBattle.__scKakashiBattleInteraction34500,true,"exact Kakashi launcher must be wrapped for post-deployment hardening");
const launched=global.launchAcademyKakashiOriginPlBattle();
assert.strictEqual(launched.success,true,"launcher result must be preserved");
assert.strictEqual(launchCalls,1,"launcher must run exactly once");
assert.strictEqual(currentBattle.kakashiOriginDeployment.controllerParticipantId,"academy_kakashi","launcher remains deployment authority");

for(const id of exactFive){
  const preview=global.previewAcademyKakashiBattleSkill34500(id);
  assert.strictEqual(preview.success,true,`preview must succeed for ${id}`);
}
assert.strictEqual(guideCalls,5,"all five exact Skills must reach the guide renderer");
assert.strictEqual(selectCalls,0,"preview must never select a Skill");

const direct=global.activateAcademyKakashiBattleSkill34500("academy_kakashi_kunai_quickdraw");
assert.strictEqual(direct.success,true,"native one-click bridge must execute");
assert.strictEqual(activateCalls,1,"native activator must be used exactly once");
assert.strictEqual(selectCalls,0,"34500 must not double-select when native activator exists");
assert.strictEqual(confirmCalls,0,"34500 must not double-confirm when native activator exists");

delete global.activateBattlePreparedSkillCard;
const fallback=global.activateAcademyKakashiBattleSkill34500("academy_kakashi_kunai_quickdraw");
assert.strictEqual(fallback.success,true,"fallback select/confirm bridge must execute");
assert.strictEqual(selectCalls,1,"fallback must select once");
assert.strictEqual(confirmCalls,1,"fallback must confirm once");

const branch=global.activateAcademyKakashiBattleSkill34500("academy_kakashi_clone_feint");
assert.strictEqual(branch.success,true,"branch Skill selection must succeed");
assert.strictEqual(branch.awaitingExplicitMode,true,"branch Skill must wait for explicit authored mode");
assert.strictEqual(branch.actionCommitted,false,"branch Skill must not auto-commit");
assert.strictEqual(confirmCalls,1,"branch-required Skill must not auto-confirm");

currentBattle.kakashiOriginDeployment.controllerParticipantId="other_controller";
const blocked=global.activateAcademyKakashiBattleSkill34500("academy_kakashi_kunai_quickdraw");
assert.strictEqual(blocked.success,false,"repair must not leak outside Academy Kakashi Battle");

const diag=global.runAcademyKakashiBattleInteraction34500Diagnostics();
assert.strictEqual(diag.pass,true,`34500 diagnostics failed: ${(diag.failed||[]).join(", ")}`);
assert.strictEqual(diag.checks.canonicalPaletteFirst,true,"diagnostics must prove canonical palette ownership");
assert.strictEqual(diag.checks.postDeploymentLaunchHardening,true,"diagnostics must prove post-deployment hardening");
assert.strictEqual(diag.browserGoldenClaimed,false,"browser Golden must remain false");

console.log(JSON.stringify({
  pass:true,
  patch:"34500-v3",
  exactFiveSkillsCanonical:true,
  lateDOMObserved:true,
  postDeploymentHardening:true,
  bothCardGenerationsCovered:true,
  hoverIsPresentationOnly:true,
  nativeActivatorPreferred:true,
  selectConfirmFallback:true,
  explicitBranchPreserved:true,
  captureClickOwnsAction:true,
  resolverSemanticsUntouched:true,
  browserGoldenClaimed:false
},null,2));