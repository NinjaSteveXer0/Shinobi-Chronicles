#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const file=path.join(root,"runtime","alpha-kakashi-battle-interaction-hotfix-34500.js");
const src=fs.readFileSync(file,"utf8");

// Source contract: late DOM, both card generations, presentation-only hover,
// capture-owned click, and no replacement Battle resolver.
assert(src.includes('battle-live-skill-card:not(.is-empty)'),"live Battle cards must be covered");
assert(src.includes('battle-dev-skill-card:not(.is-empty)'),"legacy/dev Battle cards must be covered");
assert(src.includes('new MutationObserver'),"late/replaced Battle card DOM must be observed");
assert(src.includes('data-battle-skill-id'),"battleSkillId dataset generation must be accepted");
assert(src.includes('data-skill-id'),"skillId dataset generation must be accepted");
assert(src.includes('visibleBattleSkills34500'),"listener-driven cards need active-actor Skill fallback");
assert(src.includes('renderTemporaryBattleSkillGuide'),"hover/focus must use the native Skill Guide renderer");
assert(!src.match(/function renderGuide34500[\s\S]*?\n  }[\s\S]*?selectBattlePreparedSkill\(/),"hover must not select a Skill");
assert(src.includes('activateBattlePreparedSkillCard'),"click should prefer the existing one-click Battle bridge");
assert(src.includes('confirmSelectedBattleSkill'),"fallback click must still reach native Battle confirmation");
assert(src.includes('stopImmediatePropagation'),"capture click must suppress competing select-only listeners");
assert(src.includes('addEventListener("click",act,true)'),"Kakashi click must own capture phase");
for(const forbidden of ["resolveBattleDamagePacket(","applyBattleDamage(","recordBattleEvidence("]){
  assert(!src.includes(forbidden),`34500 must not replace Battle resolution: ${forbidden}`);
}
assert(src.includes('browserGoldenClaimed:false'),"browser Golden must remain unclaimed");

// Headless semantic bridge: preview is non-mutating; click prefers the native
// activator, then falls back to select -> confirm if that bridge is absent.
delete global.SC_ALPHA_KAKASHI_BATTLE_INTERACTION_34500;
global.currentBattle={
  active:true,battleOver:false,
  kakashiOriginDeployment:{controllerParticipantId:"academy_kakashi"},
  selectedSkillId:null
};
let guideCalls=0,activateCalls=0,selectCalls=0,confirmCalls=0;
global.renderTemporaryBattleSkillGuide=skillId=>{guideCalls+=1;assert.strictEqual(skillId,"academy_kakashi_kunai_quickdraw");};
global.activateBattlePreparedSkillCard=skillId=>{activateCalls+=1;return{success:true,executed:true,skillId};};
global.selectBattlePreparedSkill=skillId=>{selectCalls+=1;currentBattle.selectedSkillId=skillId;return{success:true,skillId,branchSelectionRequired:false};};
global.confirmSelectedBattleSkill=()=>{confirmCalls+=1;return{success:true,executed:true};};
global.document=undefined;
vm.runInThisContext(src,{filename:file});

const preview=global.previewAcademyKakashiBattleSkill34500("academy_kakashi_kunai_quickdraw");
assert.strictEqual(preview.success,true,"preview must succeed through native guide renderer");
assert.strictEqual(guideCalls,1,"preview must render guide once");
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

currentBattle.kakashiOriginDeployment.controllerParticipantId="other_controller";
const blocked=global.activateAcademyKakashiBattleSkill34500("academy_kakashi_kunai_quickdraw");
assert.strictEqual(blocked.success,false,"repair must not leak outside Academy Kakashi Battle");

const diag=global.runAcademyKakashiBattleInteraction34500Diagnostics();
assert.strictEqual(diag.browserGoldenClaimed,false,"browser Golden must remain false");

console.log(JSON.stringify({
  pass:true,
  patch:"34500-v2",
  lateDOMObserved:true,
  bothCardGenerationsCovered:true,
  hoverIsPresentationOnly:true,
  nativeActivatorPreferred:true,
  selectConfirmFallback:true,
  captureClickOwnsAction:true,
  resolverSemanticsUntouched:true,
  browserGoldenClaimed:false
},null,2));
