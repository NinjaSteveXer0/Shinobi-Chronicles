const fs=require('fs');
const vm=require('vm');
const assert=require('assert');

const source=fs.readFileSync('runtime/alpha-mission-choice-generation-121.js','utf8');
const sandbox={
  console,
  Date,
  JSON,
  Map,
  Set,
  Object,
  Array,
  String,
  Number,
  Math,
  globalThis:null,
  playerData:{storySceneRuntime:{version:1,sequence:0,active:null,lastFeedbackReceipt:null}},
  saveWrites:0,
  savePlayerData(){sandbox.saveWrites+=1;},
  ensureStorySceneRuntimeState(){return sandbox.playerData.storySceneRuntime;}
};
sandbox.globalThis=sandbox;
vm.createContext(sandbox);
vm.runInContext(source,sandbox,{filename:'alpha-mission-choice-generation-121.js'});

assert.ok(sandbox.SC_ALPHA_MISSION_CHOICE_121,'API missing');
const diag=sandbox.runIssue121MissionChoiceDiagnostics();
assert.strictEqual(diag.pass,true,JSON.stringify(diag.failed));
assert.strictEqual(diag.checks.reopenNoReroll,true);
assert.strictEqual(diag.checks.explicitNewHistorySupersedes,true);
assert.strictEqual(diag.checks.mandatoryAnchorBlocksCompletion,true);
assert.strictEqual(diag.checks.authoredCompletionPredicateBlocks,true);
assert.strictEqual(diag.checks.npcIntentSeparate,true);
assert.strictEqual(diag.checks.browserGoldenClaimed,false);

const api=sandbox.SC_ALPHA_MISSION_CHOICE_121;
api.registerResolver('r_test',({receipt})=>({success:true,resultRef:'occ:'+receipt.selectedProtagonistIntent.intentId,consequenceRefs:['occ_result']}));
const reg=api.registerMissionSkeleton({
  arcId:'arc_test',missionId:'m1',version:'v1',mandatoryAnchors:['required_contact'],
  completionPredicate:({context})=>context.ready===true,
  decisions:[{decisionId:'d1',intents:[
    {intentId:'observe',intentType:'observe',presentationText:'Observe.',resolverId:'r_test'},
    {intentId:'known_route',intentType:'investigate',presentationText:'Follow what you know.',resolverId:'r_test',isEligible:c=>({available:c.knowledgeRefs.includes('lead_known'),basis:['knowledge:lead_known'],knownBlocker:null})}
  ]}]
});
assert.strictEqual(reg.success,true);
const low=api.ensureChoiceSet({arcId:'arc_test',missionId:'m1',decisionId:'d1',committedStateRef:'history:A',context:{knowledgeRefs:[]}});
assert.strictEqual(low.choiceSet.choices.length,1);
const lowAgain=api.ensureChoiceSet({arcId:'arc_test',missionId:'m1',decisionId:'d1',committedStateRef:'history:A',context:{knowledgeRefs:['lead_known']}});
assert.strictEqual(lowAgain.choiceSet.choiceSetId,low.choiceSet.choiceSetId,'same committed history rerolled');
const high=api.ensureChoiceSet({arcId:'arc_test',missionId:'m1',decisionId:'d1',committedStateRef:'history:B',allowCommittedStateSupersession:true,context:{knowledgeRefs:['lead_known']}});
assert.strictEqual(high.choiceSet.choices.length,2);
assert.notStrictEqual(high.choiceSet.choiceSetId,low.choiceSet.choiceSetId);
const intent=api.commitIntent(high.choiceSet.choiceSetId,'known_route');
assert.strictEqual(intent.success,true);
assert.strictEqual(intent.receipt.selectedProtagonistIntent.intentType,'investigate');
assert.strictEqual(intent.receipt.resolverResultRef,'occ:known_route');
assert.strictEqual(api.completeMission('arc_test','m1',{ready:true}).success,false,'completed without mandatory anchor');
assert.strictEqual(api.markMissionAnchor('arc_test','m1','required_contact',['occ_result']).success,true);
assert.strictEqual(api.completeMission('arc_test','m1',{ready:false}).success,false,'ignored authored completion predicate');
assert.strictEqual(api.completeMission('arc_test','m1',{ready:true}).success,true);

console.log(JSON.stringify({pass:true,diagnostics:diag.checks,saveWrites:sandbox.saveWrites},null,2));
