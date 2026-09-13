const fs=require('fs');
const vm=require('vm');
const assert=require('assert');

const engineSource=fs.readFileSync('runtime/alpha-mission-choice-generation-121.js','utf8');
const bindingSource=fs.readFileSync('runtime/alpha-mission-choice-production-bindings-121.js','utf8');

function makeStoryBeat(){
  return {
    beatId:'m11_recall_intent',
    mode:'choice',
    text:'The Recall contact is a separate factual protocol.',
    choices:[
      {choiceId:'STATIC_SHOULD_NOT_PROJECT',label:'STATIC SHOULD NOT PROJECT'},
      {choiceId:'STATIC_SECOND',label:'STATIC SECOND'}
    ]
  };
}

const beat=makeStoryBeat();
const scene={
  sceneId:'scene_arc1_m11_moroboshi_confrontation',
  eventId:'arc1_m11_the_man_who_signed_the_night_shift',
  beatMap:new Map([['m11_recall_intent',beat]])
};
let accessGranted=false;
let protagonist='genin_menma';
let resolverCalls=[];

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
  playerData:{storySceneRuntime:{version:1,sequence:1,active:{sceneId:scene.sceneId,instanceId:'story_instance_A',beatId:'m11_recall_intent'},lastFeedbackReceipt:null}},
  saveWrites:0,
  savePlayerData(){sandbox.saveWrites+=1;},
  ensureStorySceneRuntimeState(){return sandbox.playerData.storySceneRuntime;},
  getStorySceneDefinition(id){return id===scene.sceneId?scene:null;},
  getActiveStorySceneRuntime(){return sandbox.playerData.storySceneRuntime.active;},
  getCurrentStorySceneBeat(){return beat;},
  completeStoryScene(){return {success:true,completed:true};},
  getAlphaM11M12Protagonist(){return protagonist;},
  IdentityRebindingAccessSatisfied(id){return id===protagonist&&accessGranted===true;},
  commitAlphaM11RecallIntent(options){
    const requested=options&&options.recognitionSubstitutionRequested===true;
    resolverCalls.push(requested);
    return {success:true,occurrenceId:requested?'occ_m11_recall_sub':'occ_m11_recall_plain'};
  }
};
sandbox.globalThis=sandbox;
vm.createContext(sandbox);
vm.runInContext(engineSource,sandbox,{filename:'alpha-mission-choice-generation-121.js'});
vm.runInContext(bindingSource,sandbox,{filename:'alpha-mission-choice-production-bindings-121.js'});

assert.ok(sandbox.SC_ALPHA_MISSION_CHOICE_121,'#121 engine missing');
assert.ok(sandbox.SC_ALPHA_MISSION_CHOICE_BINDINGS_121,'production binding status missing');
assert.strictEqual(sandbox.SC_ALPHA_MISSION_CHOICE_BINDINGS_121.success,true,JSON.stringify(sandbox.SC_ALPHA_MISSION_CHOICE_BINDINGS_121));

// Low-history Chronicle: no Identity Rebinding Access. The live Story beat must
// project only the base Recall intent and must not leak either static placeholder.
let projected=sandbox.getCurrentStorySceneBeat();
assert.deepStrictEqual(Array.from(projected.choices,c=>c.choiceId),['permit_recall']);
assert.ok(!projected.choices.some(c=>String(c.choiceId).startsWith('STATIC_')),'static authored placeholder leaked through production binding');
let lowSet=sandbox.SC_ALPHA_MISSION_CHOICE_BINDINGS_121.inspectCurrentChoiceSet().choiceSet;
assert.strictEqual(lowSet.choices.length,1);
const lowChoiceSetId=lowSet.choiceSetId;

// Simulate the canonical JSON save/load boundary. The unresolved semantic choice
// set must survive and project with the same identity after reload/reopen.
const serialized=JSON.stringify(sandbox.playerData);
sandbox.playerData=JSON.parse(serialized);
projected=sandbox.getCurrentStorySceneBeat();
let reloadedLow=sandbox.SC_ALPHA_MISSION_CHOICE_BINDINGS_121.inspectCurrentChoiceSet().choiceSet;
assert.strictEqual(reloadedLow.choiceSetId,lowChoiceSetId,'unresolved M11 choice set rerolled across save/load');
assert.deepStrictEqual(Array.from(projected.choices,c=>c.choiceId),['permit_recall']);

// New access becoming visible while the old set is unresolved does not silently
// reroll presentation. New committed history may supersede only explicitly.
accessGranted=true;
projected=sandbox.getCurrentStorySceneBeat();
assert.deepStrictEqual(Array.from(projected.choices,c=>c.choiceId),['permit_recall'],'live presentation silently rerolled unresolved choice set');

// Resolve the low-history intent through the exact existing M11 resolver.
const lowResolve=projected.choices[0].consequenceRequests[0].resolve();
assert.strictEqual(lowResolve.success,true);
assert.deepStrictEqual(resolverCalls,[false]);

// Fresh committed scene instance with Identity Rebinding Access: both legitimate
// intents should now be generated. This models a different Chronicle/history.
sandbox.playerData={storySceneRuntime:{version:1,sequence:2,active:{sceneId:scene.sceneId,instanceId:'story_instance_B',beatId:'m11_recall_intent'},lastFeedbackReceipt:null}};
resolverCalls=[];
accessGranted=true;
projected=sandbox.getCurrentStorySceneBeat();
assert.deepStrictEqual(Array.from(projected.choices,c=>c.choiceId),['permit_recall','permit_recall_substitute']);
const highSet=sandbox.SC_ALPHA_MISSION_CHOICE_BINDINGS_121.inspectCurrentChoiceSet().choiceSet;
assert.strictEqual(highSet.choices.length,2);
assert.ok(highSet.choices.find(c=>c.intentId==='permit_recall_substitute').eligibilityBasis.includes('access:identity_rebinding'));

// Select substitution. Selection commits protagonist intent; the owning M11
// resolver receives the existing factual option and remains outcome authority.
const subChoice=projected.choices.find(c=>c.choiceId==='permit_recall_substitute');
const highResolve=subChoice.consequenceRequests[0].resolve();
assert.strictEqual(highResolve.success,true);
assert.deepStrictEqual(resolverCalls,[true]);
const receipt=Object.values(sandbox.playerData.storySceneRuntime.ceMissionChoice121.receipts)[0];
assert.strictEqual(receipt.selectedProtagonistIntent.intentId,'permit_recall_substitute');
assert.strictEqual(receipt.selectedProtagonistIntent.intentType,'permit_recall_with_recognition_substitution');
assert.strictEqual(receipt.resolverResultRef,'occ_m11_recall_sub');
assert.strictEqual(receipt.status,'resolved');

const diag=sandbox.runIssue121ProductionBindingDiagnostics();
assert.strictEqual(diag.pass,true,JSON.stringify(diag.failed));
assert.strictEqual(diag.checks.browserGoldenClaimed,false);

console.log(JSON.stringify({
  pass:true,
  lowChoiceSetId,
  lowChoiceCount:1,
  highChoiceCount:2,
  selectedIntent:receipt.selectedProtagonistIntent,
  resolverResultRef:receipt.resolverResultRef,
  saveWrites:sandbox.saveWrites,
  browserGoldenClaimed:false
},null,2));
