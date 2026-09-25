#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const vm=require("vm");

const ROOT=path.resolve(__dirname,"..");
const RUNTIME="runtime/alpha-kakashi-menma-skill-lock-38300.js";
const INDEX="index.html";
const source=fs.readFileSync(path.join(ROOT,RUNTIME),"utf8");
const index=fs.readFileSync(path.join(ROOT,INDEX),"utf8");

new vm.Script(source,{filename:RUNTIME});
assert(index.includes('<script src="runtime/alpha-kakashi-menma-skill-lock-38300.js"></script>'),"#383 runtime adapter is not production-loaded");

const MENMA={
  academy_menma_chakra_knuckle:{id:"academy_menma_chakra_knuckle",authoredAttackPL:6},
  academy_menma_crescent_kunai:{id:"academy_menma_crescent_kunai",authoredAttackPL:5},
  academy_menma_guard_breaker:{id:"academy_menma_guard_breaker",authoredAttackPL:7,conditionalRider:{automatic:false}},
  academy_menma_shadow_clone_feint:{id:"academy_menma_shadow_clone_feint",authoredAttackPL:0,resolutionKind:"transient_state"},
  academy_menma_shadowstep:{id:"academy_menma_shadowstep",authoredAttackPL:0,resolutionKind:"movement"}
};
const KAKASHI={
  academy_kakashi_kunai_quickdraw:{id:"academy_kakashi_kunai_quickdraw",authoredAttackPL:5},
  academy_kakashi_clone_feint:{id:"academy_kakashi_clone_feint",authoredAttackPL:0,resolutionKind:"transient_state"},
  academy_kakashi_opening_exploit:{
    id:"academy_kakashi_opening_exploit",
    authoredAttackPL:5,
    conditionalRider:{stateKey:"academy_kakashi_clone_feint_opening",authoredAttackPL:7},
    conditionalBoostAttackPL:2
  },
  academy_kakashi_wire_snare:{id:"academy_kakashi_wire_snare",authoredAttackPL:0,resolutionKind:"dynamic_control"},
  academy_kakashi_substitution_jutsu:{id:"academy_kakashi_substitution_jutsu",authoredAttackPL:0,resolutionKind:"ratio_guard_state",guard:{preventionRatio:.5,oneUse:true}}
};
const all={...MENMA,...KAKASHI};
const context={
  console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,
  globalThis:null,
  ACADEMY_BATTLE_PILOT_PREPARED_SKILLS:{
    academy_kakashi:[
      "academy_kakashi_kunai_quickdraw",
      "academy_kakashi_clone_feint",
      "academy_kakashi_opening_exploit",
      "academy_kakashi_wire_snare",
      "academy_kakashi_prodigys_read"
    ]
  },
  getClosureWaveBattleSkillDefinition:(id)=>all[id]?JSON.parse(JSON.stringify(all[id])):null,
  getBattlePreparedSkillDefinition:(actor,id)=>all[id]?JSON.parse(JSON.stringify(all[id])):null
};
context.globalThis=context;
vm.createContext(context);
vm.runInContext(source,context,{filename:RUNTIME});

const expectedMenma={
  academy_menma_chakra_knuckle:"Driving Chakra Fist",
  academy_menma_crescent_kunai:"Crescent Fang",
  academy_menma_guard_breaker:"Shattering Blow",
  academy_menma_shadow_clone_feint:"Shadow Clone Ambush",
  academy_menma_shadowstep:"Vanishing Step"
};
const expectedKakashi={
  academy_kakashi_kunai_quickdraw:"Flash Kunai",
  academy_kakashi_clone_feint:"Clone Switch",
  academy_kakashi_opening_exploit:"Precision Strike",
  academy_kakashi_wire_snare:"Wire Fang",
  academy_kakashi_substitution_jutsu:"Substitution Jutsu"
};

for(const [id,name] of Object.entries(expectedMenma)){
  const row=context.getClosureWaveBattleSkillDefinition(id,"academy_menma");
  assert(row,id+" missing");
  assert.strictEqual(row.displayName,name,id+" displayName drift");
}
assert.strictEqual(context.getClosureWaveBattleSkillDefinition("academy_menma_chakra_knuckle","academy_menma").authoredAttackPL,6);
assert.strictEqual(context.getClosureWaveBattleSkillDefinition("academy_menma_crescent_kunai","academy_menma").authoredAttackPL,5);
assert.strictEqual(context.getClosureWaveBattleSkillDefinition("academy_menma_guard_breaker","academy_menma").authoredAttackPL,7);

for(const [id,name] of Object.entries(expectedKakashi)){
  const row=context.getClosureWaveBattleSkillDefinition(id,"academy_kakashi");
  assert(row,id+" missing");
  assert.strictEqual(row.displayName,name,id+" displayName drift");
}
const precision=context.getClosureWaveBattleSkillDefinition("academy_kakashi_opening_exploit","academy_kakashi");
assert.strictEqual(precision.authoredAttackPL,5,"Precision Strike normal ATK must remain 5");
assert.strictEqual(precision.conditionalRider.authoredAttackPL,11,"Clone Switch enhanced packet must be ATK 11");
assert.strictEqual(precision.conditionalBoostAttackPL,6,"legacy +2 boost representation must become +6 over ATK 5");

const palette=context.ACADEMY_BATTLE_PILOT_PREPARED_SKILLS.academy_kakashi;
assert.deepStrictEqual(Array.from(palette),[
  "academy_kakashi_kunai_quickdraw",
  "academy_kakashi_clone_feint",
  "academy_kakashi_opening_exploit",
  "academy_kakashi_wire_snare",
  "academy_kakashi_substitution_jutsu"
]);
assert(!palette.includes("academy_kakashi_prodigys_read"),"Prodigy's Read remains prepared");

const diag=context.runIssue383SkillLockDiagnostics();
assert.strictEqual(diag.pass,true,JSON.stringify(diag,null,2));
assert.deepStrictEqual(JSON.parse(JSON.stringify(diag.expectedMitigatedDamage)),{
  maskedInterceptor:9,
  packageSmuggler:10,
  anbuMarkedTarget:9
});

console.log(JSON.stringify({
  pass:true,
  issue:383,
  kind:"source_skill_lock",
  checks:{
    productionLoaded:true,
    exactMenmaNames:true,
    menmaRawNumbersPreserved:true,
    exactKakashiNames:true,
    precisionNormalFive:true,
    precisionEnhancedEleven:true,
    mitigation9_10_9:true,
    substitutionPrepared:true,
    prodigysReadAbsent:true
  },
  browserGoldenClaimed:false
},null,2));
