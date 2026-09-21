#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const source=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-sequential-post-ps-recovery-35600.js"),"utf8");
const occurrences=new Map(),materials=new Map(),classifications=[];
let active={sceneId:"origin_academy_kakashi_anbu_retrieval",instanceId:"qa-post-mi-instance",beatId:"qa-return",localContext:{}};
const beatMap=new Map([
 ["kak_seq_ps_battle",{beatId:"kak_seq_ps_battle",mode:"battle_transition",battle:{postBattleBeatId:"kak_seq_ps_return"}}],
 ["kak_seq_ps_return",{beatId:"kak_seq_ps_return",mode:"narration"}]
]);
const A={
 findOccurrence:id=>occurrences.get(String(id))||null,
 commitOccurrence(_story,id,fact,_unused,meta){
  const record={occurrenceId:String(id),fact:JSON.parse(JSON.stringify(fact)),meta:JSON.parse(JSON.stringify(meta||{}))};
  occurrences.set(String(id),record);return{success:true,record};
 }
};
const CORE={
 stableRef(prefix,payload){return prefix+"::"+Buffer.from(JSON.stringify(payload||{})).toString("base64url");},
 recordParticipantClassification(row){classifications.push(JSON.parse(JSON.stringify(row)));return{success:true,resultRef:row.resultRef,stateClass:row.stateClass};},
 recordMaterialState(row){materials.set(row.materialRef,JSON.parse(JSON.stringify(row)));return{success:true,stateRef:row.stateRef};}
};
const context={console,Buffer,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,Date,Math,
 SC_ALPHA_ORIGIN_32900:A,SC_STORY_DECISION_REALISATION_34000:CORE,
 getStorySceneDefinition:id=>id==="origin_academy_kakashi_anbu_retrieval"?{sceneId:id,beatMap}:null,
 getActiveStorySceneRuntime:()=>active,
 normalizeStorySceneBeat:row=>row,
 savePlayerData(){},
 globalThis:null
};
context.globalThis=context;vm.createContext(context);vm.runInContext(source,context,{filename:"runtime/alpha-kakashi-sequential-post-ps-recovery-35600.js"});

function occurrence(id,holder){
 occurrences.set(id,{occurrenceId:id,fact:{storySceneInstanceId:active.instanceId,packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:holder,custodyClass:holder,locationClass:holder+"_PLACE"}}});
}
function result(binding,battleId){
 return{battleConfigId:"academy_kakashi_origin_battle_seq_ps",bindingRef:binding,battleOccurrenceId:battleId,resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:"academy_kakashi_origin_package_smuggler",battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]};
}

// Reproduce the real browser-save hazard: an old Get-Closer occurrence still
// exists, but the current STOP post-MI route has just committed a newer factual
// Package-Smuggler parent. The newer route parent must win.
occurrence("stale-get-closer","KAKASHI");
occurrence("fresh-post-mi","PACKAGE_SMUGGLER");
active.localContext={
 kakashiGetCloserHandoffOccurrenceId:"stale-get-closer",
 kakashiSequentialPackageOccurrenceId35100:"fresh-post-mi",
 kakashiSequentialPackageOccurrenceId:"fresh-post-mi",
 kakashiPostMiPackageOccurrenceId:"fresh-post-mi"
};
let out=context.resolveAcademyKakashiSequentialPostPsPackageRecovery35600(result("academy_kakashi.battle.stop_assassin_post_mi_ps","qa-post-mi-battle"));
assert.strictEqual(out.success,true,"STOP post-MI recovery was blocked by stale legacy history: "+JSON.stringify(out));
const postMi=occurrences.get(out.packageOccurrenceId);
assert(postMi,"post-MI recovery occurrence missing");
assert.strictEqual(postMi.fact.parentOccurrenceRef,"fresh-post-mi","STOP post-MI recovery consumed stale Get-Closer provenance");
assert.strictEqual(postMi.fact.packageState.currentHolderClass,"KAKASHI");
assert(classifications.some(row=>row.participantRef==="academy_kakashi_origin_package_smuggler"&&row.stateClass==="BATTLE_DEFEATED_UNRESOLVED"),"PS victory did not commit canonical unrestrained defeat classification");

// PS Battle defeat preserves prior package custody but must classify PS as escaped.
occurrences.clear();materials.clear();classifications.length=0;
active={sceneId:"origin_academy_kakashi_anbu_retrieval",instanceId:"qa-post-mi-loss",beatId:"qa-return",localContext:{kakashiSequentialPackageOccurrenceId35100:"qa-loss-parent",kakashiSequentialPackageOccurrenceId:"qa-loss-parent",kakashiPostMiPackageOccurrenceId:"qa-loss-parent"}};
occurrence("qa-loss-parent","PACKAGE_SMUGGLER");
const lossResult={battleConfigId:"academy_kakashi_origin_battle_seq_ps",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_ps",battleOccurrenceId:"qa-post-mi-loss-battle",resultState:"opposition_side_victory",participants:[]};
out=context.resolveAcademyKakashiSequentialPostPsPackageRecovery35600(lossResult);
assert.strictEqual(out.success,true,"PS defeat resolution failed: "+JSON.stringify(out));
assert.strictEqual(out.recovered,false);
assert(classifications.some(row=>row.participantRef==="academy_kakashi_origin_package_smuggler"&&row.stateClass==="ESCAPED"),"PS defeat did not commit escape classification");

// Original sequential Observe route retains its valid Get-Closer handoff parent.
occurrences.clear();materials.clear();classifications.length=0;
active={sceneId:"origin_academy_kakashi_anbu_retrieval",instanceId:"qa-sequential-instance",beatId:"qa-return",localContext:{kakashiGetCloserHandoffOccurrenceId:"legacy-valid-parent"}};
occurrence("legacy-valid-parent","PACKAGE_SMUGGLER");
out=context.resolveAcademyKakashiSequentialPostPsPackageRecovery35600(result("academy_kakashi.battle.defeat_assassin_then_secure","qa-sequential-battle"));
assert.strictEqual(out.success,true,"legacy sequential recovery regressed: "+JSON.stringify(out));
const legacy=occurrences.get(out.packageOccurrenceId);
assert.strictEqual(legacy.fact.parentOccurrenceRef,"legacy-valid-parent","legacy sequential route lost its authored parent");

const diag=context.runAcademyKakashiSequentialPostPsRecovery35600Diagnostics();
assert.strictEqual(diag.pass,true,"35600 diagnostics failed: "+JSON.stringify(diag.failed));
assert(source.includes("binding===STOP_ASSASSIN_POST_MI_PS_BINDING"),"source lost binding-aware parent selection");
assert(source.includes("rejectedParentCandidates"),"source lost invalid-parent fallthrough");
console.log("Academy Kakashi post-PS recovery 35600 QA PASS");
