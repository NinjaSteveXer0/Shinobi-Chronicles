const fs=require('fs');
const vm=require('vm');
const assert=require('assert');

globalThis.playerData={};
globalThis.savePlayerData=()=>true;
vm.runInThisContext(fs.readFileSync('runtime/alpha-story-factual-resolver-34600.js','utf8'),{filename:'runtime/alpha-story-factual-resolver-34600.js'});

const API=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
assert(API,'provider missing');
assert.strictEqual(API.providerId,'ce.neutral_story_factual_resolver.v1');

function req(bindingRef,id,extra={}){
  return {bindingRef,storyDecisionReceiptId:`decision:${id}`,intentCommitRef:`intent:${id}`,actorRef:'academy_kakashi',attemptOrdinal:1,idempotenceKey:`idem:${id}`,...extra};
}

assert(registerStoryFactualResolverBinding('qa.zero',{
  ownerRef:'qa',outcomes:[
    {outcomeRef:'A',eligibility:()=>false,resultPayloadTemplate:{value:'A'}},
    {outcomeRef:'B',eligibility:()=>false,resultPayloadTemplate:{value:'B'}}
  ]
}).success);
const zero=resolveStoryFactualAction(req('qa.zero','zero'));
assert.strictEqual(zero.success,false);
assert.strictEqual(zero.reason,'story_factual_zero_eligible_outcomes');
assert.strictEqual(getStoryFactualResolverReceipt('idem:zero'),null);

assert(registerStoryFactualResolverBinding('qa.single',{
  ownerRef:'qa',outcomes:[
    {outcomeRef:'ONLY',resultPayloadTemplate:{value:1},successorSituationRef:'next'}
  ]
}).success);
const single=resolveStoryFactualAction(req('qa.single','single'));
assert.strictEqual(single.success,true);
assert.strictEqual(single.receipt.resolutionMode,'deterministic_single');
assert.strictEqual(single.receipt.selectedOutcomeRef,'ONLY');
assert.strictEqual(single.receipt.successorSituationRef,'next');
assert.strictEqual(single.receipt.status,'resolved');

assert(registerStoryFactualResolverBinding('qa.draw',{
  ownerRef:'qa',authorityVersionRefs:['qa-authority'],outcomes:[
    {outcomeRef:'ALPHA',resultPayloadTemplate:{value:'alpha'}},
    {outcomeRef:'BETA',resultPayloadTemplate:{value:'beta'}},
    {outcomeRef:'GAMMA',resultPayloadTemplate:{value:'gamma'}}
  ]
}).success);
const first=resolveStoryFactualAction(req('qa.draw','draw',{continuityLineageRef:'lineage-1'}));
assert.strictEqual(first.success,true);
assert.strictEqual(first.receipt.resolutionMode,'stable_draw');
assert(first.receipt.selectionProvenanceRef);
const selected=first.receipt.selectedOutcomeRef;
const replay=resolveStoryFactualAction(req('qa.draw','draw',{continuityLineageRef:'lineage-1',eligibleOutcomeRefs:['ALPHA']}));
assert.strictEqual(replay.success,true);
assert.strictEqual(replay.idempotent,true);
assert.strictEqual(replay.receipt.selectedOutcomeRef,selected,'same idempotence key rerolled');
assert.strictEqual(replay.receipt.storyFactualResolverReceiptId,first.receipt.storyFactualResolverReceiptId);

assert(registerStoryFactualResolverBinding('qa.policy',{
  ownerRef:'qa',resolutionPolicyRef:'qa.policy.fixed',resolutionPolicy:({eligibleOutcomeRefs})=>eligibleOutcomeRefs.includes('B')?'B':eligibleOutcomeRefs[0],outcomes:[
    {outcomeRef:'A',resultPayloadTemplate:{value:'A'}},
    {outcomeRef:'B',resultPayloadTemplate:{value:'B'}}
  ]
}).success);
const policy=resolveStoryFactualAction(req('qa.policy','policy'));
assert.strictEqual(policy.success,true);
assert.strictEqual(policy.receipt.resolutionMode,'owner_policy');
assert.strictEqual(policy.receipt.selectedOutcomeRef,'B');
assert.strictEqual(policy.receipt.resolverPolicyRef,'qa.policy.fixed');

let commitAttempts=0;
assert(registerStoryFactualResolverBinding('qa.retry',{
  ownerRef:'qa',outcomes:[
    {outcomeRef:'LEFT',resultPayloadTemplate:{side:'left'}},
    {outcomeRef:'RIGHT',resultPayloadTemplate:{side:'right'}}
  ],
  commitResult:({receipt})=>{
    commitAttempts+=1;
    if(commitAttempts===1)return{success:false,reason:'simulated_transport_failure'};
    return{success:true,stateDeltaRefs:[`state:${receipt.selectedOutcomeRef}`]};
  }
}).success);
const pending=resolveStoryFactualAction(req('qa.retry','retry'));
assert.strictEqual(pending.success,false);
assert.strictEqual(pending.selectionPreserved,true);
const pendingReceipt=getStoryFactualResolverReceipt('idem:retry');
assert.strictEqual(pendingReceipt.status,'selected_pending_commit');
const pendingSelected=pendingReceipt.selectedOutcomeRef;
const recovered=resolveStoryFactualAction(req('qa.retry','retry',{eligibleOutcomeRefs:[pendingSelected==='LEFT'?'RIGHT':'LEFT']}));
assert.strictEqual(recovered.success,true);
assert.strictEqual(recovered.receipt.selectedOutcomeRef,pendingSelected,'retry rerolled selected outcome');
assert.strictEqual(recovered.receipt.status,'resolved');
assert.deepStrictEqual(recovered.receipt.stateDeltaRefs,[`state:${pendingSelected}`]);
assert.strictEqual(commitAttempts,2);

const diagnostics=runStoryFactualResolver34600Diagnostics();
assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics,null,2));
assert.strictEqual(diagnostics.browserGoldenClaimed,false);

console.log(JSON.stringify({pass:true,providerId:API.providerId,stableDrawSelected:selected,retrySelected:pendingSelected,diagnostics},null,2));
