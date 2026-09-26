#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const vm=require("vm");

const ROOT=path.resolve(__dirname,"..");
const RUNTIME="runtime/alpha-combat-skill-lock-38300.js";
const source=fs.readFileSync(path.join(ROOT,RUNTIME),"utf8");
const index=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");

new vm.Script(source,{filename:RUNTIME});
assert(index.includes('<script src="runtime/alpha-combat-skill-lock-38300.js"></script>'),"#383 runtime adapter is not production-loaded");

const DB={
  academy_menma_chakra_knuckle:{id:"academy_menma_chakra_knuckle",ownerRegistryId:"academy_menma",authoredAttackPL:6},
  academy_menma_crescent_kunai:{id:"academy_menma_crescent_kunai",ownerRegistryId:"academy_menma",authoredAttackPL:5},
  academy_menma_guard_breaker:{id:"academy_menma_guard_breaker",ownerRegistryId:"academy_menma",authoredAttackPL:7,conditionalRider:{automatic:false}},
  academy_menma_shadow_clone_feint:{id:"academy_menma_shadow_clone_feint",ownerRegistryId:"academy_menma",resolutionKind:"transient_state"},
  academy_menma_shadowstep:{id:"academy_menma_shadowstep",ownerRegistryId:"academy_menma",resolutionKind:"categorical_evidence"},
  academy_kakashi_kunai_quickdraw:{id:"academy_kakashi_kunai_quickdraw",ownerRegistryId:"academy_kakashi",authoredAttackPL:5,resolutionKind:"direct_damage"},
  academy_kakashi_clone_feint:{id:"academy_kakashi_clone_feint",ownerRegistryId:"academy_kakashi",resolutionKind:"transient_state",state:{stateKey:"academy_kakashi_clone_feint_opening"}},
  academy_kakashi_opening_exploit:{id:"academy_kakashi_opening_exploit",ownerRegistryId:"academy_kakashi",resolutionKind:"contextual_state_damage",contextualStateDamage:{stateKey:"academy_kakashi_clone_feint_opening",normalAttackPL:5,enhancedAttackPL:7,sourceMustBeActor:true,consume:true}},
  academy_kakashi_wire_snare:{id:"academy_kakashi_wire_snare",ownerRegistryId:"academy_kakashi",resolutionKind:"dynamic_control"}
};
const originalClone=DB.academy_kakashi_clone_feint;
const productionPalette={
  academy_kakashi:[
    "academy_kakashi_kunai_quickdraw",
    "academy_kakashi_clone_feint",
    "academy_kakashi_opening_exploit",
    "academy_kakashi_wire_snare",
    "academy_kakashi_prodigys_read"
  ]
};
const registry={
  academy_kakashi:{id:"academy_kakashi",exactPreparedSkillIds:[...productionPalette.academy_kakashi]}
};
const currentBattle={active:true,battleOver:false,runtime:{evidence:[]}};

const context={
  console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,
  globalThis:null,
  CLOSURE_WAVE_1_BATTLE_SKILL_DATABASE:DB,
  PRODUCTION_PREPARED_SKILL_PALETTES:productionPalette,
  characterRegistry:registry,
  ACADEMY_BATTLE_PILOT_PREPARED_SKILLS:{academy_kakashi:[...productionPalette.academy_kakashi]},
  currentBattle,
  getCharacterRegistryId:value=>typeof value==="string"?value:(value&&value.id)||null,
  getClosureWaveBattleSkillDefinition:(id,owner)=>{
    const registryId=typeof owner==="string"?owner:(owner&&owner.id)||null;
    return Object.values(DB).find(row=>row&&row.id===id&&(!registryId||row.ownerRegistryId===registryId))||null;
  },
  getProductionPreparedSkillIds:owner=>[...(productionPalette[typeof owner==="string"?owner:owner.id]||[])],
  makeFactoryRatioGuardSkill:(id,ownerRegistryId,preventionRatio,options={})=>({
    id,ownerRegistryId,primaryDiscipline:null,targetMode:"self",actionClass:"defensive_technique",
    resolutionKind:"ratio_guard_state",staminaMitigation:null,traits:[...(options.traits||[])],
    requirements:[],sourceRefs:[],guard:{stateKey:options.stateKey||id,preventionRatio,attackMultiplier:1-preventionRatio,oneUse:options.oneUse!==false}
  }),
  registerProductionFactorySkill:def=>{DB[def.id]={displayName:def.id,...def};return DB[def.id];},
  evaluateClosureWaveSkillAvailability:(skill,actor)=>({
    available:!!skill&&!!actor&&skill.ownerRegistryId===actor.id,
    reason:skill&&actor&&skill.ownerRegistryId===actor.id?null:"wrong_skill_owner"
  })
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
assert.strictEqual(DB.academy_menma_chakra_knuckle.authoredAttackPL,6);
assert.strictEqual(DB.academy_menma_crescent_kunai.authoredAttackPL,5);
assert.strictEqual(DB.academy_menma_guard_breaker.authoredAttackPL,7);

for(const [id,name] of Object.entries(expectedKakashi)){
  const row=context.getClosureWaveBattleSkillDefinition(id,"academy_kakashi");
  assert(row,id+" missing");
  assert.strictEqual(row.displayName,name,id+" displayName drift");
}

assert.strictEqual(
  context.getClosureWaveBattleSkillDefinition("academy_kakashi_clone_feint","academy_kakashi"),
  originalClone,
  "#383 cloned a canonical closure Skill and would break resolver identity routing"
);

const precision=DB.academy_kakashi_opening_exploit;
assert.strictEqual(precision.contextualStateDamage.normalAttackPL,5,"Precision Strike normal ATK must remain 5");
assert.strictEqual(precision.contextualStateDamage.enhancedAttackPL,11,"Clone Switch enhanced packet must be ATK 11");

const substitution=DB.academy_kakashi_substitution_jutsu;
assert(substitution,"Substitution Jutsu was not registered in the canonical closure database");
assert.strictEqual(substitution.ownerRegistryId,"academy_kakashi");
assert.strictEqual(substitution.resolutionKind,"ratio_guard_state");
assert.strictEqual(substitution.targetMode,"self");
assert.strictEqual(substitution.guard.preventionRatio,0.5);
assert.strictEqual(substitution.guard.attackMultiplier,0.5);
assert.strictEqual(substitution.guard.oneUse,true);

const expectedPalette=[
  "academy_kakashi_kunai_quickdraw",
  "academy_kakashi_clone_feint",
  "academy_kakashi_opening_exploit",
  "academy_kakashi_wire_snare",
  "academy_kakashi_substitution_jutsu"
];
assert.deepStrictEqual(Array.from(productionPalette.academy_kakashi),expectedPalette);
assert.deepStrictEqual(Array.from(registry.academy_kakashi.exactPreparedSkillIds),expectedPalette);
assert(!productionPalette.academy_kakashi.includes("academy_kakashi_prodigys_read"),"Prodigy's Read remains prepared");

const first=context.evaluateClosureWaveSkillAvailability(substitution,{id:"academy_kakashi"},null);
assert.strictEqual(first.available,true,"Substitution should be available before first committed use");
currentBattle.runtime.evidence.push({
  eventType:"skill_action_completed",committedOccurrence:true,skillId:"academy_kakashi_substitution_jutsu",
  actorRef:{side:"player",participantId:"academy_kakashi"}
});
const second=context.evaluateClosureWaveSkillAvailability(substitution,{id:"academy_kakashi"},null);
assert.strictEqual(second.available,false,"Substitution did not become unavailable after one committed use");
assert.strictEqual(second.reason,"once_per_battle_already_used");

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
    canonicalIdentityPreserved:true,
    exactMenmaNames:true,
    menmaRawNumbersPreserved:true,
    exactKakashiNames:true,
    precisionNormalFive:true,
    precisionEnhancedEleven:true,
    mitigation9_10_9:true,
    substitutionCanonicalRatioGuard:true,
    substitutionOncePerBattle:true,
    substitutionPrepared:true,
    prodigysReadAbsent:true
  },
  browserGoldenClaimed:false
},null,2));
