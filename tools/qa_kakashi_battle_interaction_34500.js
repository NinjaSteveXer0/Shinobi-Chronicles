#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const src=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-battle-interaction-hotfix-34500.js"),"utf8");

assert(src.includes('activateBattlePreparedSkillCard|selectBattlePreparedSkill'),"card parser must accept both Battle card handler generations");
assert(src.includes('card.onmouseenter=()=>preview34500(skillId)'),"hover must project the Skill Guide");
assert(src.includes('card.onfocus=()=>preview34500(skillId)'),"focus must project the Skill Guide");
assert(src.includes('previewBattlePreparedSkill33000(skillId)'),"hover/focus must reuse the existing Battle 2.0 inspector");
assert(src.includes('const selected=selectBattlePreparedSkill(skillId);'),"click must use the existing selection authority");
assert(src.includes('const committed=confirmSelectedBattleSkill();'),"legal click must use the existing Battle action commit path");
assert(src.includes('selected.branchSelectionRequired===true'),"genuine branch/mode choices must remain explicit");
assert(src.includes('card.removeAttribute("onclick")'),"stale inline select-only handler must be displaced on Kakashi Origin cards");
assert(src.includes('refreshBattleActionRegionPresentation34500'),"rerenders must rebind the interaction contract");
for(const forbidden of ["resolveBattleDamagePacket(","applyBattleDamage(","recordBattleEvidence("]){
  assert(!src.includes(forbidden),`34500 must not replace Battle resolution: ${forbidden}`);
}
assert(src.includes('browserGoldenClaimed:false'),"browser Golden must remain unclaimed");

console.log(JSON.stringify({
  pass:true,
  patch:"34500",
  hoverFocusUsesExistingInspector:true,
  clickUsesSelectThenConfirm:true,
  acceptsBothCardHandlerGenerations:true,
  resolverSemanticsUntouched:true,
  browserGoldenClaimed:false
},null,2));
