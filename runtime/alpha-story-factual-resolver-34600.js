// ============================================================================
// ISSUE #188 / #175 — NEUTRAL STORY FACTUAL RESOLVER PROVIDER — 34600
//
// Binding authority:
// Documentation/Coordination/Neutral Story Factual Resolver Provider and Stable Outcome Selection Contract 2026-09-15.md
// commit f2291162085cb3a35fc2a8e49df7ed905c214c85
//
// Semantic provider ID: ce.neutral_story_factual_resolver.v1
//
// Responsibilities:
// - register authorised non-Battle factual outcome envelopes;
// - resolve only after Story intent is committed;
// - apply eligibility before selection;
// - use owner policy when supplied, otherwise stable occurrence-scoped draw;
// - persist selected factual receipt before downstream consequence commits;
// - replay the same idempotence key without reroll across refresh/save-load/retry.
//
// This provider does NOT own Battle, World Truth, Knowledge, custody, Rank,
// Progression, Acquisition, Mission completion or Story presentation.
// ============================================================================
(function installStoryFactualResolver34600(){
"use strict";
if(globalThis.SC_STORY_FACTUAL_RESOLVER_34600)return;

const PATCH_ID="story_factual_resolver_34600_2026_09_15";
const PROVIDER_ID="ce.neutral_story_factual_resolver.v1";
const AUTHORITY="f2291162085cb3a35fc2a8e49df7ed905c214c85";
const bindings=new Map();

function clone(value){
  if(value===undefined)return undefined;
  try{if(globalThis.SC_STORY_DECISION_REALISATION_34000&&typeof globalThis.SC_STORY_DECISION_REALISATION_34000.clone==="function")return globalThis.SC_STORY_DECISION_REALISATION_34000.clone(value);}catch(_error){}
  try{return JSON.parse(JSON.stringify(value));}catch(_error){return value;}
}
function playerRecord(){
  if(typeof playerData!=="undefined"&&playerData&&typeof playerData==="object")return playerData;
  if(!globalThis.playerData||typeof globalThis.playerData!=="object")globalThis.playerData={};
  return globalThis.playerData;
}
function ensureRoot(){
  const pd=playerRecord();
  if(!pd.storyFactualResolver34600||typeof pd.storyFactualResolver34600!=="object"){
    pd.storyFactualResolver34600={version:1,providerId:PROVIDER_ID,receipts:{},createdAt:Date.now()};
  }
  const root=pd.storyFactualResolver34600;
  if(!root.receipts||typeof root.receipts!=="object")root.receipts={};
  return root;
}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function canonical(value){
  if(value===null||typeof value!=="object")return JSON.stringify(value);
  if(Array.isArray(value))return`[${value.map(canonical).join(",")}]`;
  const keys=Object.keys(value).sort();
  return`{${keys.map(key=>`${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
}
function hash(value){
  const input=canonical(value);let h=2166136261;
  for(let i=0;i<input.length;i++){h^=input.charCodeAt(i);h=Math.imul(h,16777619);}
  return(h>>>0).toString(16).padStart(8,"0");
}
function stableRef(prefix,payload){return`${prefix}:${hash(payload)}`;}
function refs(value){return[...new Set((Array.isArray(value)?value:[]).filter(Boolean).map(String))].sort();}
function positiveWeight(value){const n=Number(value);return Number.isFinite(n)&&n>0?n:1;}

function normalizeOutcome(outcome,index){
  if(!outcome||typeof outcome!=="object"||!outcome.outcomeRef)throw new Error("story_factual_outcome_ref_required");
  return Object.freeze({
    outcomeRef:String(outcome.outcomeRef),
    eligibilityPredicateRefs:refs(outcome.eligibilityPredicateRefs),
    eligibility:typeof outcome.eligibility==="function"?outcome.eligibility:null,
    resultPayloadTemplate:outcome.resultPayloadTemplate===undefined?null:outcome.resultPayloadTemplate,
    consequenceRequestRefs:refs(outcome.consequenceRequestRefs),
    successorSituationRef:outcome.successorSituationRef?String(outcome.successorSituationRef):null,
    successorRule:typeof outcome.successorRule==="function"?outcome.successorRule:null,
    weight:positiveWeight(outcome.weight),
    authoredOrder:Number.isFinite(Number(outcome.authoredOrder))?Number(outcome.authoredOrder):index
  });
}
function normalizeBinding(bindingRef,bindingSpec={}){
  const outcomes=(Array.isArray(bindingSpec.outcomes)?bindingSpec.outcomes:[]).map(normalizeOutcome);
  if(!outcomes.length)throw new Error(`story_factual_binding_requires_outcomes:${bindingRef}`);
  if(new Set(outcomes.map(row=>row.outcomeRef)).size!==outcomes.length)throw new Error(`story_factual_duplicate_outcome_ref:${bindingRef}`);
  return Object.freeze({
    bindingRef:String(bindingRef),
    ownerRef:bindingSpec.ownerRef?String(bindingSpec.ownerRef):null,
    authorityVersionRefs:refs(bindingSpec.authorityVersionRefs),
    outcomes:Object.freeze(outcomes),
    resolutionPolicy:typeof bindingSpec.resolutionPolicy==="function"?bindingSpec.resolutionPolicy:null,
    resolutionPolicyRef:bindingSpec.resolutionPolicyRef?String(bindingSpec.resolutionPolicyRef):null,
    commitResult:typeof bindingSpec.commitResult==="function"?bindingSpec.commitResult:null,
    metadata:Object.freeze(clone(bindingSpec.metadata||{}))
  });
}

function registerStoryFactualResolverBinding(bindingRef,bindingSpec={}){
  if(!bindingRef)return{success:false,reason:"story_factual_binding_ref_required"};
  try{
    const normalized=normalizeBinding(bindingRef,bindingSpec);
    bindings.set(normalized.bindingRef,normalized);
    return{success:true,bindingRef:normalized.bindingRef,outcomeRefs:normalized.outcomes.map(row=>row.outcomeRef)};
  }catch(error){return{success:false,reason:"story_factual_binding_invalid",detail:String(error&&error.message||error)};}
}

function evaluateOutcomeEligibility(binding,outcome,request){
  const explicit=Array.isArray(request.eligibleOutcomeRefs)?new Set(request.eligibleOutcomeRefs.map(String)):null;
  const blocked=Array.isArray(request.ineligibleOutcomeRefs)?new Set(request.ineligibleOutcomeRefs.map(String)):null;
  if(explicit&&!explicit.has(outcome.outcomeRef))return{eligible:false,reason:"not_in_explicit_eligible_set",predicateRefs:[]};
  if(blocked&&blocked.has(outcome.outcomeRef))return{eligible:false,reason:"explicitly_ineligible",predicateRefs:[]};
  if(!outcome.eligibility)return{eligible:true,reason:null,predicateRefs:outcome.eligibilityPredicateRefs};
  try{
    const result=outcome.eligibility({request:clone(request),state:clone(request.state||{}),context:clone(request.context||{}),outcomeRef:outcome.outcomeRef});
    if(result&&typeof result==="object")return{eligible:result.eligible===true,reason:result.reason||null,predicateRefs:refs([...(outcome.eligibilityPredicateRefs||[]),...(result.predicateRefs||[])])};
    return{eligible:result===true,reason:result===true?null:"eligibility_predicate_false",predicateRefs:outcome.eligibilityPredicateRefs};
  }catch(error){return{eligible:false,reason:"eligibility_predicate_exception",detail:String(error&&error.message||error),predicateRefs:outcome.eligibilityPredicateRefs};}
}

function stableDraw(binding,eligible,request){
  const provenance={
    providerId:PROVIDER_ID,
    storyDecisionReceiptId:String(request.storyDecisionReceiptId||""),
    bindingRef:binding.bindingRef,
    attemptOrdinal:Number.isFinite(Number(request.attemptOrdinal))?Number(request.attemptOrdinal):1,
    authorityVersionRefs:refs([AUTHORITY,...binding.authorityVersionRefs,...(request.authorityVersionRefs||[])]),
    continuityLineageRef:request.continuityLineageRef?String(request.continuityLineageRef):null
  };
  const ordered=[...eligible].sort((a,b)=>a.outcome.authoredOrder-b.outcome.authoredOrder||a.outcome.outcomeRef.localeCompare(b.outcome.outcomeRef));
  const total=ordered.reduce((sum,row)=>sum+positiveWeight(row.outcome.weight),0);
  const seed=parseInt(hash(provenance),16)>>>0;
  const point=total>0?(seed/0xffffffff)*total:0;
  let cursor=0,selected=ordered[ordered.length-1];
  for(const row of ordered){cursor+=positiveWeight(row.outcome.weight);if(point<=cursor){selected=row;break;}}
  return{selected,resolutionMode:"stable_draw",selectionProvenanceRef:stableRef("sc346-selection",provenance),provenance};
}

function selectOutcome(binding,eligible,request){
  if(eligible.length===1)return{success:true,selected:eligible[0],resolutionMode:"deterministic_single",selectionProvenanceRef:null,resolverPolicyRef:null};
  if(binding.resolutionPolicy){
    let policyResult=null;
    try{policyResult=binding.resolutionPolicy({request:clone(request),eligibleOutcomeRefs:eligible.map(row=>row.outcome.outcomeRef),state:clone(request.state||{}),context:clone(request.context||{})});}
    catch(error){return{success:false,reason:"story_factual_owner_policy_exception",detail:String(error&&error.message||error)};}
    const selectedRef=typeof policyResult==="string"?policyResult:policyResult&&policyResult.outcomeRef;
    const selected=eligible.find(row=>row.outcome.outcomeRef===String(selectedRef||""));
    if(!selected)return{success:false,reason:"story_factual_owner_policy_selected_ineligible_outcome",selectedOutcomeRef:selectedRef||null};
    return{success:true,selected,resolutionMode:"owner_policy",selectionProvenanceRef:policyResult&&policyResult.selectionProvenanceRef||null,resolverPolicyRef:binding.resolutionPolicyRef||policyResult&&policyResult.resolverPolicyRef||null};
  }
  return{success:true,...stableDraw(binding,eligible,request),resolverPolicyRef:null};
}

function materializeResult(outcome,request){
  if(typeof outcome.resultPayloadTemplate==="function")return clone(outcome.resultPayloadTemplate({request:clone(request),state:clone(request.state||{}),context:clone(request.context||{})}));
  return clone(outcome.resultPayloadTemplate);
}
function successorFor(outcome,request,result){
  if(outcome.successorRule){
    try{return outcome.successorRule({request:clone(request),result:clone(result),state:clone(request.state||{}),context:clone(request.context||{})})||null;}catch(_error){return null;}
  }
  return outcome.successorSituationRef||null;
}
function receiptKey(request){
  if(request.idempotenceKey)return String(request.idempotenceKey);
  if(!request.storyDecisionReceiptId||!request.bindingRef)return null;
  return stableRef("sc346-idempotence",{storyDecisionReceiptId:String(request.storyDecisionReceiptId),bindingRef:String(request.bindingRef),attemptOrdinal:Number.isFinite(Number(request.attemptOrdinal))?Number(request.attemptOrdinal):1});
}
function findOutcome(binding,outcomeRef){return binding&&binding.outcomes.find(row=>row.outcomeRef===outcomeRef)||null;}

function finalizeSelectedReceipt(binding,receipt,request){
  if(receipt.status==="resolved")return{success:true,idempotent:true,receipt:clone(receipt),result:clone(receipt.result)};
  const outcome=findOutcome(binding,receipt.selectedOutcomeRef);
  if(!outcome)return{success:false,reason:"story_factual_selected_outcome_definition_missing",receipt:clone(receipt)};
  if(!binding.commitResult){
    receipt.status="resolved";receipt.resolvedAt=Date.now();ensureRoot().receipts[receipt.idempotenceKey]=receipt;save();
    return{success:true,receipt:clone(receipt),result:clone(receipt.result)};
  }
  let committed;
  try{committed=binding.commitResult({receipt:clone(receipt),request:clone(request),outcome:clone(outcome),result:clone(receipt.result)});}
  catch(error){committed={success:false,reason:"story_factual_commit_exception",detail:String(error&&error.message||error)};}
  if(!committed||committed.success!==true){
    receipt.status="selected_pending_commit";receipt.commitBlocker=committed&&committed.reason||"story_factual_downstream_commit_failed";
    receipt.commitBlockerDetail=committed&&committed.detail||null;ensureRoot().receipts[receipt.idempotenceKey]=receipt;save();
    return{success:false,reason:receipt.commitBlocker,receipt:clone(receipt),selectionPreserved:true};
  }
  receipt.consequenceRefs=refs([...(receipt.consequenceRefs||[]),...(committed.consequenceRefs||[])]);
  receipt.stateDeltaRefs=refs([...(receipt.stateDeltaRefs||[]),...(committed.stateDeltaRefs||[])]);
  receipt.knowledgeDeltaRefs=refs([...(receipt.knowledgeDeltaRefs||[]),...(committed.knowledgeDeltaRefs||[])]);
  receipt.relationshipHistoryRefs=refs([...(receipt.relationshipHistoryRefs||[]),...(committed.relationshipHistoryRefs||[])]);
  receipt.objectiveDeltaRefs=refs([...(receipt.objectiveDeltaRefs||[]),...(committed.objectiveDeltaRefs||[])]);
  receipt.objectCustodyDeltaRefs=refs([...(receipt.objectCustodyDeltaRefs||[]),...(committed.objectCustodyDeltaRefs||[])]);
  receipt.participantStateDeltaRefs=refs([...(receipt.participantStateDeltaRefs||[]),...(committed.participantStateDeltaRefs||[])]);
  if(committed.successorSituationRef)receipt.successorSituationRef=String(committed.successorSituationRef);
  receipt.status="resolved";receipt.commitBlocker=null;receipt.commitBlockerDetail=null;receipt.resolvedAt=Date.now();
  ensureRoot().receipts[receipt.idempotenceKey]=receipt;save();
  return{success:true,receipt:clone(receipt),result:clone(receipt.result),commitResult:clone(committed)};
}

function resolveStoryFactualAction(request={}){
  const bindingRef=String(request.bindingRef||"");
  const storyDecisionReceiptId=String(request.storyDecisionReceiptId||"");
  if(!bindingRef||!storyDecisionReceiptId)return{success:false,reason:"story_factual_request_incomplete"};
  const binding=bindings.get(bindingRef);
  if(!binding)return{success:false,reason:"story_factual_binding_not_registered",bindingRef};
  const key=receiptKey(request);if(!key)return{success:false,reason:"story_factual_idempotence_key_unavailable"};
  const root=ensureRoot(),existing=root.receipts[key];
  if(existing)return finalizeSelectedReceipt(binding,existing,{...request,idempotenceKey:key});

  const evaluated=binding.outcomes.map(outcome=>({outcome,evaluation:evaluateOutcomeEligibility(binding,outcome,request)}));
  const eligible=evaluated.filter(row=>row.evaluation.eligible===true);
  if(!eligible.length){
    return{success:false,reason:"story_factual_zero_eligible_outcomes",bindingRef,idempotenceKey:key,evaluations:evaluated.map(row=>({outcomeRef:row.outcome.outcomeRef,...clone(row.evaluation)}))};
  }
  const selection=selectOutcome(binding,eligible,request);if(!selection.success)return selection;
  const outcome=selection.selected.outcome;
  const result=materializeResult(outcome,request);
  const successorSituationRef=successorFor(outcome,request,result);
  const receipt={
    storyFactualResolverReceiptId:stableRef("sc346-factual",{idempotenceKey:key,selectedOutcomeRef:outcome.outcomeRef}),
    providerId:PROVIDER_ID,storyDecisionReceiptId,bindingRef,actorRef:request.actorRef?String(request.actorRef):null,
    intentCommitRef:request.intentCommitRef?String(request.intentCommitRef):null,attemptOrdinal:Number.isFinite(Number(request.attemptOrdinal))?Number(request.attemptOrdinal):1,
    idempotenceKey:key,authorityVersionRefs:refs([AUTHORITY,...binding.authorityVersionRefs,...(request.authorityVersionRefs||[])]),
    inputStateRefs:refs(request.inputStateRefs),eligibleOutcomeRefs:eligible.map(row=>row.outcome.outcomeRef),
    resolutionMode:selection.resolutionMode,selectedOutcomeRef:outcome.outcomeRef,resolverPolicyRef:selection.resolverPolicyRef||null,
    selectionProvenanceRef:selection.selectionProvenanceRef||null,result,
    consequenceRefs:refs(outcome.consequenceRequestRefs),stateDeltaRefs:[],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],
    objectCustodyDeltaRefs:[],participantStateDeltaRefs:[],successorSituationRef:successorSituationRef?String(successorSituationRef):null,
    committedAtOccurrenceRef:request.committedAtOccurrenceRef?String(request.committedAtOccurrenceRef):null,
    status:"selected_pending_commit",createdAt:Date.now(),resolvedAt:null
  };
  root.receipts[key]=receipt;save();
  return finalizeSelectedReceipt(binding,receipt,{...request,idempotenceKey:key});
}

function getStoryFactualResolverReceipt(idempotenceKey){
  const key=String(idempotenceKey||"");if(!key)return null;
  const row=ensureRoot().receipts[key];return row?clone(row):null;
}
function getRegisteredStoryFactualBindings(){return[...bindings.values()].map(row=>({bindingRef:row.bindingRef,ownerRef:row.ownerRef,authorityVersionRefs:[...row.authorityVersionRefs],outcomeRefs:row.outcomes.map(outcome=>outcome.outcomeRef),resolutionPolicyRef:row.resolutionPolicyRef||null}));}
function clearStoryFactualResolverReceiptsForDiagnostics(){ensureRoot().receipts={};save();return true;}

function runStoryFactualResolver34600Diagnostics(){
  const source=resolveStoryFactualAction.toString();
  const checks={
    patchId:PATCH_ID==="story_factual_resolver_34600_2026_09_15",
    semanticProviderId:PROVIDER_ID==="ce.neutral_story_factual_resolver.v1",
    authorityPinned:AUTHORITY==="f2291162085cb3a35fc2a8e49df7ed905c214c85",
    eligibilityBeforeSelection:source.indexOf("evaluateOutcomeEligibility")<source.indexOf("selectOutcome"),
    receiptPersistedBeforeCommit:source.indexOf("root.receipts[key]=receipt;save()")<source.indexOf("finalizeSelectedReceipt"),
    noMathRandom:!resolveStoryFactualAction.toString().includes("Math.random")&&!stableDraw.toString().includes("Math.random"),
    idempotenceLookupBeforeSelection:source.indexOf("existing=root.receipts[key]")<source.indexOf("evaluateOutcomeEligibility"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,registeredBindingCount:bindings.size,browserGoldenClaimed:false};
}

const api=Object.freeze({
  patchId:PATCH_ID,providerId:PROVIDER_ID,authorityCommit:AUTHORITY,
  registerStoryFactualResolverBinding,resolveStoryFactualAction,getStoryFactualResolverReceipt,getRegisteredStoryFactualBindings,
  stableRef,hash,clone,browserGoldenClaimed:false
});
globalThis.registerStoryFactualResolverBinding=registerStoryFactualResolverBinding;
globalThis.resolveStoryFactualAction=resolveStoryFactualAction;
globalThis.getStoryFactualResolverReceipt=getStoryFactualResolverReceipt;
globalThis.SC_STORY_FACTUAL_RESOLVER_34600=api;
globalThis.runStoryFactualResolver34600Diagnostics=runStoryFactualResolver34600Diagnostics;
})();
