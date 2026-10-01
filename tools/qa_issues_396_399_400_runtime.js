#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const read=rel=>fs.readFileSync(path.join(ROOT,rel),"utf8");

const metal=read("runtime/alpha-metal-origin-runtime-396.js");
const rogue=read("runtime/alpha-rogue-genin-opposition-399.js");
const iwabee=read("runtime/alpha-iwabee-origin-runtime-399.js");
const names=read("runtime/alpha-origin-skill-display-names-400.js");
const story=read("runtime/alpha-origin-scenes-32900-b.js");
const index=read("index.html");

for(const [file,src] of Object.entries({metal,rogue,iwabee,names,story})){
  assert.doesNotThrow(()=>new Function(src),file+" syntax failure");
}

const metalActions=[
  "metal_origin_inviting_genin_sparring_jab",
  "metal_origin_inviting_genin_turning_kick",
  "metal_origin_inviting_genin_guarded_stance",
  "metal_origin_inviting_genin_feint_entry",
  "metal_origin_inviting_genin_committed_lunge"
];
metalActions.forEach(id=>assert(metal.includes(id),"missing Metal action "+id));
assert(metal.includes('stats:Object.freeze({nin:12,tai:16,buki:11,fuin:6,kin:7,gen:8,stamina:15})'));
assert(metal.includes('pl:15'));
assert(metal.includes('const BATTLE_PORTRAIT="NPC portrait/metal_classmate_1.png"'));
assert(metal.includes('const FIXED_VICTORY_RYO=50'));
assert(metal.includes('const REWARD_SOURCE_ID="metal_origin_controlled_spar_victory_ryo_01"'));
assert(metal.includes('const LEGACY_REWARD_SOURCE_ID="metal_origin_controlled_spar_battle_victory_ryo_01"'));
assert(metal.includes('requiresExplicitPostClaimContinue=false'));
assert(metal.includes('const START_MAX=13'));
assert(metal.includes('ratio>0.50?"strong":ratio>=0.25?"mixed":"rough"'));
assert(metal.includes('makeEnemyRatioGuardAction(id,0.25'));
assert(metal.includes('contextualAttackPL:Object.freeze({normal:6,afterFeint:7})'));
assert(metal.includes('academy_metal_lee_origin_protective_response_v1'));
assert(metal.includes('academy_metal_origin_training_dummy_hazard_v1'));
assert(metal.includes('redirect_dummy:{statKey:"tai",statLabel:"Taijutsu",successMin:14,partialMin:11}'));
assert(metal.includes('take_impact:{statKey:"stamina",statLabel:"Stamina",successMin:14,partialMin:11}'));
assert(metal.includes('destroy_dummy:{statKey:"tai",statLabel:"Taijutsu",successMin:15,partialMin:12}'));
{
  const start=metal.indexOf("globalThis.chooseEnemyAuthoredBattleAction=function chooseMetal396EnemyAction");
  const end=metal.indexOf("try{chooseEnemyAuthoredBattleAction=globalThis.chooseEnemyAuthoredBattleAction;}",start);
  assert(start>=0&&end>start,"Metal deterministic chooser source missing");
  const chooser=metal.slice(start,end);
  assert(!chooser.includes("Math.random"),"Metal deterministic AI introduced RNG");
}

assert(rogue.includes('makeEnemyRatioGuardAction(FEINT_ID,0.40'));
assert(rogue.includes('m.feintUsed!==true'));
assert(rogue.includes('now>created'));
{
  const start=rogue.indexOf("function build({participantId,metaGetter}={})");
  const end=rogue.indexOf("function diagnostics()",start);
  assert(start>=0&&end>start,"Reusable Rogue Genin builder source missing");
  const builder=rogue.slice(start,end);
  assert(!builder.includes("iwabee_origin_rogue_genin_01"),"Reusable Rogue package hardcodes Iwabee historical identity");
  assert(!builder.includes("wasabi_origin_rogue_genin_01"),"Reusable Rogue package hardcodes Wasabi historical identity");
}

assert(iwabee.includes('stats:Object.freeze({nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24})'));
assert(iwabee.includes('oppositionTemplateId:TEMPLATE'));
assert(iwabee.includes('buildReusableRogueGeninOppositionActions399'));
assert(iwabee.includes('const FIXED_VICTORY_RYO=50;'));
assert(iwabee.includes('const REWARD_SOURCE_ID="iwabee_origin_rogue_genin_battle_victory_ryo_01";'));
assert(iwabee.includes('fixedVictoryReward:'));
assert(!iwabee.includes('iwabee399NoReward:true'));
assert(!iwabee.includes('noReward:true'));
assert(iwabee.includes('battleResultDoesNotEstablishDisposition:true'));
assert(!iwabee.includes('earthReleaseUsedToConstrainRogueGenin:true'),"Battle adapter illegally owns IWA-02");
assert(!iwabee.includes('rogueDisposition:'),"Battle adapter illegally owns World disposition");

for(const value of [
  'rogueDisposition:"ESCAPED_AFTER_IWABEE_WITHDRAWAL"',
  'rogueDisposition:"DETAINED_AFTER_ROGUE_BATTLE_WITHDRAWAL"',
  'rogueDisposition:"SURRENDERED_AFTER_EARTH_ROUTE_CONSTRAINT"',
  'rogueDisposition:"ESCAPED_AFTER_INSTRUCTOR_ESCALATION"',
  'rogueDisposition:"ESCAPED_WHILE_IWABEE_FINISHED_PRACTICAL"',
  'instructorIntervention:"PROTECT_WITHDRAWN_STUDENT_NO_PURSUIT"',
  'instructorIntervention:"SECURE_WITHDRAWN_ROGUE"',
  'instructorIntervention:"ACCEPT_SURRENDER_AND_SECURE"',
  'instructorIntervention:"SHIELD_STUDENTS_NO_PURSUIT"'
])assert(story.includes(value),"missing Iwabee World fact "+value);
assert(story.includes('earthReleaseUsedToConstrainRogueGenin:true'));
assert(story.includes('alternateEscapeRouteAvailable:false'));
assert(story.includes('followupBattleOccurred:false'));
assert(story.includes('beatId:"iwa_confront_loss_01"'));
assert(story.includes('N("met_spar_strong_01"'));
assert(story.includes('N("met_spar_mixed_01"'));
assert(story.includes('N("met_spar_rough_01"'));
assert(story.includes('"Distort her sense of distance"'));
assert(story.includes('D("kur_result_complete_win_02","INSTRUCTOR","Got you."'));
assert(story.includes('N("kur_result_complete_win_05","The yard bends again.\\n\\nThe instructor is behind Kurenai.\\n\\nThe bell is back in her hand."'));
assert(!story.includes('"Distort his sense of distance"')&&!story.includes('"DISTORT HIS SENSE OF DISTANCE"'));
for(const prefix of ["met_redirect","met_impact","met_destroy"]){
  for(const outcome of ["success","partial","failure"])assert(story.includes('N("'+prefix+"_"+outcome+'_01"'),"missing MET-03 outcome "+prefix+" "+outcome);
}

const namePairs={
  academy_hinata_gentle_palm:"Gentle Fist: Flowing Palm",
  academy_izuno_pouncing_palm:"Cat Fang Palm",
  academy_mirai_twin_kunai:"Twin Fang Kunai",
  academy_kushina_red_whirlwind:"Crimson Whirlwind",
  academy_kurenai_false_opening:"Petal Mirage",
  academy_iwabee_earth_style_rising_wall:"Earth Style: Rising Rampart",
  academy_iwabee_stone_snare:"Earth Style: Stone Grasp",
  academy_metal_lee_leaf_rising_kick:"Leaf Rising Heel",
  academy_obito_fire_style_ember_burst:"Fire Style: Cinder Burst"
};
for(const [id,label] of Object.entries(namePairs)){
  assert(names.includes(id),"#400 id missing "+id);
  assert(names.includes(label),"#400 displayName missing "+label);
}
assert(names.includes("displayNameCount:40"));
assert(names.includes("stableIdsUnchanged:true"));
assert(names.includes("mechanicsUnchanged:true"));
assert(names.includes("paletteOrderUnchanged:true"));
assert(!names.includes('academy_menma:Object.freeze'),"#400 reopened Menma");
assert(!names.includes('academy_kakashi:Object.freeze'),"#400 reopened Kakashi");

const order=[
  "runtime/alpha-battle-modern-33000.js",
  "runtime/alpha-metal-origin-runtime-396.js",
  "runtime/alpha-rogue-genin-opposition-399.js",
  "runtime/alpha-iwabee-origin-runtime-399.js"
].map(x=>index.indexOf(x));
assert(order.every(x=>x>=0),"production loader missing new Battle modules");
assert(order.every((x,i)=>i===0||x>order[i-1]),"new Battle modules load in wrong order");
assert(index.indexOf("runtime/alpha-origin-skill-display-names-400.js")>index.indexOf("runtime/alpha-combat-skill-lock-38300.js"),"#400 must load after #383");

// game.js is deliberately frozen; #111/#63 enforce the audited core blob.
// #396 owns current MET-03 vocabulary only in the scoped runtime / Story authorities.
assert(metal.includes('met03ClosedVocabulary:!String(resolveProtectiveResponse).includes("attempt_committed")'),"MET-03 closed-vocabulary diagnostic missing");
assert(metal.includes('!String(resolveProtectiveResponse).includes(\'protectiveResponseKind:"intercept"\')'),"MET-03 intercept retirement diagnostic missing");
assert(metal.includes('!String(resolveProtectiveResponse).includes(\'protectiveResponseOutcome:"protected"\')'),"MET-03 protected-outcome retirement diagnostic missing");
assert(!story.includes('protectiveResponseKind:"intercept"'),"stale MET-03 intercept vocabulary remains in canonical Story owner");
assert(!story.includes('protectiveResponseOutcome:"protected"'),"stale MET-03 protected outcome remains in canonical Story owner");
assert(!story.includes('protectiveResponseOutcome:"attempt_committed"'),"stale MET-03 attempt_committed authority remains in canonical Story owner");
assert(metal.includes('attempted:true'));
assert(metal.includes('interventionRequired:!!intervention'));
assert(metal.includes('interventionParticipantRef:intervention'));

console.log(JSON.stringify({
  pass:true,
  issues:[396,399,400],
  checks:{
    metalExactOpponent:true,
    metalDeterministicFiveActionCycle:true,
    metalFixedPerformanceBands:true,
    met03ExactDeterministicThresholds:true,
    rogueCapabilitySeparatedFromHistoricalIdentity:true,
    iwabeeBattleWorldSeparation:true,
    iwabeeFiveDispositionOutcomes:true,
    iwabeeAuthoredDefeatBridge:true,
    eightPaletteDisplayNames:true,
    stableSkillIdsAndMechanics:true,
    productionLoadOrder:true,
    staleMet03VocabularyRetired:true
  },
  browserGoldenClaimed:false
},null,2));
