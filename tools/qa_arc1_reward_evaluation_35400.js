'use strict';
const fs=require('fs');
const vm=require('vm');
const assert=require('assert');
const runtime=fs.readFileSync('runtime/alpha-arc1-reward-evaluation-35400.js','utf8');

function harness(saved=null){
  const playerData=saved?JSON.parse(JSON.stringify(saved)):{ryo:100,inventory:[],rank:'Genin',powerLevel:77,stats:{nin:9},skills:{tracking:12},specialisations:{fieldcraft:4},specialJoninEvidence:{x:1},techniques:['substitution']};
  const items={utility_kit:{id:'utility_kit',name:'Utility Kit'}};
  const ctx={console,playerData,savePlayerData(){},saveTestState(){},getItemDefinition(id){return items[id]?JSON.parse(JSON.stringify(items[id])):null;},addItemToInventory(def){playerData.inventory.push({...def,quantity:1});}};
  ctx.globalThis=ctx;vm.createContext(ctx);vm.runInContext(runtime,ctx,{filename:'alpha-arc1-reward-evaluation-35400.js'});return ctx;
}
function baseInput(ref='chronicle-a'){
  return {chronicleRef:ref,committedStateRef:`state-${ref}`,arcCompleted:true,facts:{battles:[],objectiveResults:[],preservedValueOccurrences:[],investigationEvidenceOccurrences:[],specialistApplicationOccurrences:[],liveCustodyProtectionOccurrences:[],noncombatResolutionOccurrences:[],alreadyGrantedMaterialEntitlementRefs:[]}};
}
function battle(ref,over={}){return{occurrenceRef:ref,protagonistEntered:true,defeated:false,withdrew:false,adverseResult:false,materiallyDangerousStoryBattle:false,...over};}
function inv(ref,mission,confirmed=false){return{occurrenceRef:ref,missionRef:mission,material:true,preservedOrConfirmedBeyondUncorroboratedTestimony:confirmed};}
function spec(ref,mission,outside=false){return{occurrenceRef:ref,missionRef:mission,material:true,authorised:true,outsideOrdinaryDirectBattleDamage:outside};}

// 1. Undefeated + investigation-heavy.
{
  const c=harness(),input=baseInput();input.facts.battles=[battle('b1',{materiallyDangerousStoryBattle:true}),battle('b2')];input.facts.investigationEvidenceOccurrences=[inv('i1','m1',true),inv('i2','m1'),inv('i3','m2'),inv('i4','m3')];
  const r=c.SC_ARC1_REWARD_EVALUATION_35400.evaluateArc1Entitlement(input);assert.equal(r.success,true);assert.equal(r.snapshot.performanceComponentId,'ARC1_PERF_EXCEPTIONAL_BATTLE_RECORD');assert.equal(r.snapshot.methodComponentId,'ARC1_METHOD_INVESTIGATION_EVIDENCE');assert.equal(r.snapshot.totalRyo,2400);assert.equal(r.snapshot.entitlements.some(x=>x.type==='ITEM'),false);
}
// 2. Mixed loss + factual preserved value => adaptive recovery.
{
  const c=harness(),input=baseInput();input.facts.battles=[battle('loss',{defeated:true,adverseResult:true,materiallyDangerousStoryBattle:true})];input.facts.preservedValueOccurrences=[{occurrenceRef:'p1',sourceAdverseOccurrenceRef:'loss',material:true,valueKind:'EVIDENCE'}];
  const r=c.SC_ARC1_REWARD_EVALUATION_35400.evaluateArc1Entitlement(input);assert.equal(r.snapshot.performanceComponentId,'ARC1_PERF_ADAPTIVE_RECOVERY');assert.equal(r.snapshot.totalRyo,1800);
}
// 3. Specialist-heavy history never re-grants action-time development/evidence.
{
  const c=harness(),before=JSON.stringify({skills:c.playerData.skills,specialisations:c.playerData.specialisations,specialJoninEvidence:c.playerData.specialJoninEvidence,techniques:c.playerData.techniques});const input=baseInput();input.facts.specialistApplicationOccurrences=[spec('s1','m1',true),spec('s2','m2'),spec('s3','m3')];
  const committed=c.SC_ARC1_REWARD_EVALUATION_35400.commitArc1EntitlementSnapshot(input);assert.equal(committed.snapshot.methodComponentId,'ARC1_METHOD_SPECIALIST_APPLICATION');const g=c.SC_ARC1_REWARD_EVALUATION_35400.grantArc1Entitlement('chronicle-a');assert.equal(g.success,true);assert.equal(JSON.stringify({skills:c.playerData.skills,specialisations:c.playerData.specialisations,specialJoninEvidence:c.playerData.specialJoninEvidence,techniques:c.playerData.techniques}),before);
}
// 4. Ordinary completion => base + field reliability, no method package.
{
  const c=harness(),r=c.SC_ARC1_REWARD_EVALUATION_35400.evaluateArc1Entitlement(baseInput());assert.equal(r.snapshot.performanceComponentId,'ARC1_PERF_FIELD_RELIABILITY');assert.equal(r.snapshot.methodComponentId,null);assert.equal(r.snapshot.totalRyo,1450);
}
// 5. Same committed snapshot survives UI reopen/save-load/replay and later fact input.
{
  const c=harness(),input=baseInput();const first=c.SC_ARC1_REWARD_EVALUATION_35400.commitArc1EntitlementSnapshot(input);const saved=JSON.parse(JSON.stringify(c.playerData));const c2=harness(saved);const changed=baseInput();changed.facts.battles=[battle('b-danger',{materiallyDangerousStoryBattle:true})];const second=c2.SC_ARC1_REWARD_EVALUATION_35400.commitArc1EntitlementSnapshot(changed);assert.equal(second.idempotent,true);assert.deepEqual(JSON.parse(JSON.stringify(second.snapshot)),JSON.parse(JSON.stringify(first.snapshot)));assert.deepEqual(JSON.parse(JSON.stringify(c2.SC_ARC1_REWARD_EVALUATION_35400.projectArc1Debrief('chronicle-a').snapshot)),JSON.parse(JSON.stringify(first.snapshot)));
}
// 6. Grant is one-shot.
{
  const c=harness();c.SC_ARC1_REWARD_EVALUATION_35400.commitArc1EntitlementSnapshot(baseInput());const before=c.playerData.ryo;const one=c.SC_ARC1_REWARD_EVALUATION_35400.grantArc1Entitlement('chronicle-a');const after=c.playerData.ryo;const two=c.SC_ARC1_REWARD_EVALUATION_35400.grantArc1Entitlement('chronicle-a');assert.equal(one.idempotent,false);assert.equal(two.idempotent,true);assert.equal(after-before,1450);assert.equal(c.playerData.ryo,after);
}
// 7. Missing/ineligible/already-granted pool entries use exact authored fallback.
{
  const c=harness();assert.equal(c.SC_ARC1_REWARD_EVALUATION_35400.registerRewardPoolResolver('wrong',()=>({})).success,false);c.SC_ARC1_REWARD_EVALUATION_35400.registerRewardPoolResolver('Combat/Items',()=>({success:true,itemId:'utility_kit',legal:false,alphaActive:true,authorityOwner:'Combat/Items'}));const input=baseInput();input.facts.battles=[battle('b1',{materiallyDangerousStoryBattle:true})];let r=c.SC_ARC1_REWARD_EVALUATION_35400.evaluateArc1Entitlement(input);assert.equal(r.snapshot.totalRyo,1900);input.facts.alreadyGrantedMaterialEntitlementRefs=['utility_kit'];c.SC_ARC1_REWARD_EVALUATION_35400.registerRewardPoolResolver('Combat/Items',()=>({success:true,itemId:'utility_kit',legal:true,alphaActive:true,authorityOwner:'Combat/Items'}));r=c.SC_ARC1_REWARD_EVALUATION_35400.evaluateArc1Entitlement(input);assert.equal(r.snapshot.totalRyo,1900);assert.equal(r.snapshot.entitlements.some(x=>x.itemId==='utility_kit'),false);
}
// 8. Later catalogue/resolver changes cannot reroll a committed snapshot.
{
  const c=harness(),input=baseInput();input.facts.battles=[battle('b1',{materiallyDangerousStoryBattle:true})];const first=c.SC_ARC1_REWARD_EVALUATION_35400.commitArc1EntitlementSnapshot(input);c.SC_ARC1_REWARD_EVALUATION_35400.registerRewardPoolResolver('Combat/Items',()=>({success:true,itemId:'utility_kit',legal:true,alphaActive:true,authorityOwner:'Combat/Items'}));const second=c.SC_ARC1_REWARD_EVALUATION_35400.commitArc1EntitlementSnapshot(input);assert.equal(second.idempotent,true);assert.deepEqual(JSON.parse(JSON.stringify(second.snapshot)),JSON.parse(JSON.stringify(first.snapshot)));
}
// 9. Separate Chronicle provenance can earn its own entitlement.
{
  const c=harness();c.SC_ARC1_REWARD_EVALUATION_35400.commitArc1EntitlementSnapshot(baseInput('chronicle-a'));c.SC_ARC1_REWARD_EVALUATION_35400.commitArc1EntitlementSnapshot(baseInput('chronicle-b'));const a=c.SC_ARC1_REWARD_EVALUATION_35400.grantArc1Entitlement('chronicle-a');const b=c.SC_ARC1_REWARD_EVALUATION_35400.grantArc1Entitlement('chronicle-b');assert.equal(a.idempotent,false);assert.equal(b.idempotent,false);assert.notEqual(a.receipt.grantRef,b.receipt.grantRef);
}
// 10. No Rank/Promotion/PL/Stat/Skill/ownership mutation.
{
  const c=harness(),sentinel=JSON.stringify({rank:c.playerData.rank,powerLevel:c.playerData.powerLevel,stats:c.playerData.stats,skills:c.playerData.skills,specialisations:c.playerData.specialisations,specialJoninEvidence:c.playerData.specialJoninEvidence,techniques:c.playerData.techniques});c.SC_ARC1_REWARD_EVALUATION_35400.commitArc1EntitlementSnapshot(baseInput());c.SC_ARC1_REWARD_EVALUATION_35400.grantArc1Entitlement('chronicle-a');assert.equal(JSON.stringify({rank:c.playerData.rank,powerLevel:c.playerData.powerLevel,stats:c.playerData.stats,skills:c.playerData.skills,specialisations:c.playerData.specialisations,specialJoninEvidence:c.playerData.specialJoninEvidence,techniques:c.playerData.techniques}),sentinel);
}
// Deterministic method tie order + malformed committed facts fail closed.
{
  const c=harness(),input=baseInput();input.facts.specialistApplicationOccurrences=[spec('s1','m1',true),spec('s2','m2'),spec('s3','m3'),spec('s4','m4')];input.facts.investigationEvidenceOccurrences=[inv('i1','m1',true),inv('i2','m1'),inv('i3','m2'),inv('i4','m3')];const r=c.SC_ARC1_REWARD_EVALUATION_35400.evaluateArc1Entitlement(input);assert.equal(r.snapshot.methodComponentId,'ARC1_METHOD_INVESTIGATION_EVIDENCE');const bad=baseInput('bad');bad.facts.battles=[{occurrenceRef:'x',protagonistEntered:true}];assert.equal(c.SC_ARC1_REWARD_EVALUATION_35400.evaluateArc1Entitlement(bad).success,false);assert.equal(c.SC_ARC1_REWARD_EVALUATION_35400.diagnostics().pass,true);
}
console.log('Issue #151 Arc-1 reward snapshot QA: PASS');
