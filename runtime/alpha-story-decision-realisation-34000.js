// ============================================================================
// ISSUE #188 — NEUTRAL STORY DECISION REALISATION CORE — 34000
//
// Binding authority:
// - Documentation/Coordination/Neutral Story Decision Realisation Runtime Contract 2026-09-14.md
//   commit aa01e819183cb0a16ccca9f61dc8ca253c409022
// - Documentation/Coordination/Participant First Story Autonomy Runtime Ordering and Battle Boundary Contract 2026-09-15.md
//   commit 06566ee81fe7c7856fd513d0225e621273f4bfaa
//
// This module is deliberately neutral. It owns Story decision provenance,
// stable unresolved semantic choice state, explicit resolver dispatch,
// participant-autonomy ordering/receipts and terminal semantic guards.
// It does NOT own World Truth, Battle truth, Knowledge, custody, Rank,
// Progression, Acquisition, Origin completion, Mission completion or UI truth.
// ============================================================================
(function installStoryDecisionRealisation34000(){
"use strict";
if(globalThis.SC_STORY_DECISION_REALISATION_34000)return;

const PATCH_ID="story_decision_realisation_34000_2026_09_15";
const AUTHORITY=Object.freeze({
  neutralDecision:"aa01e819183cb0a16ccca9f61dc8ca253c409022",
  participantFirst:"06566ee81fe7c7856fd513d0225e621273f4bfaa"
});
const adapters=new Map();
const resolvers=new Map();
const anchorsByStoryUnit=new Map();

function clone(value){
  if(value===undefined)return undefined;
  try{
    if(typeof cloneProgressionData==="function")return cloneProgressionData(value);
  }catch(_error){}
  try{return JSON.parse(JSON.stringify(value));}catch(_error){return value;}
}
function playerRecord(){
  if(typeof playerData!=="undefined"&&playerData&&typeof playerData==="object")return playerData;
  if(!globalThis.playerData||typeof globalThis.playerData!=="object")globalThis.playerData={};
  return globalThis.playerData;
}
function ensureRoot(){
  const pd=playerRecord();
  if(!pd.storyDecisionRuntime34000||typeof pd.storyDecisionRuntime34000!=="object"){
    pd.storyDecisionRuntime34000={version:1,storyUnits:{},createdAt:Date.now()};
  }
  const root=pd.storyDecisionRuntime34000;
  if(!root.storyUnits||typeof root.storyUnits!=="object")root.storyUnits={};
  return root;
}
function unitStore(storyUnitRef){
  const root=ensureRoot();
  const key=String(storyUnitRef||"");
  if(!key)throw new Error("story_unit_ref_required");
  if(!root.storyUnits[key]||typeof root.storyUnits[key]!=="object"){
    root.storyUnits[key]={choiceSets:{},decisionReceipts:{},autonomyReceipts:{},participantStates:{},materialStates:{},createdAt:Date.now()};
  }
  const store=root.storyUnits[key];
  for(const field of ["choiceSets","decisionReceipts","autonomyReceipts","participantStates","materialStates"]){
    if(!store[field]||typeof store[field]!=="object")store[field]={};
  }
  return store;
}
function save(){
  try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
}
function canonical(value){
  if(value===null||typeof value!=="object")return JSON.stringify(value);
  if(Array.isArray(value))return`[${value.map(canonical).join(",")}]`;
  const keys=Object.keys(value).sort();
  return`{${keys.map(k=>`${JSON.stringify(k)}:${canonical(value[k])}`).join(",")}}`;
}
function hash(value){
  const input=canonical(value);
  let h=2166136261;
  for(let i=0;i<input.length;i++){
    h^=input.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return(h>>>0).toString(16).padStart(8,"0");
}
function stableRef(prefix,payload){return`${prefix}:${hash(payload)}`;}
function normalizeRefs(values){return[...new Set((Array.isArray(values)?values:[]).filter(Boolean).map(String))];}
function normalizeChoice(choice,index){
  if(!choice||typeof choice!=="object")throw new Error("semantic_choice_object_required");
  if(!choice.choiceId)throw new Error(`semantic_choice_id_required:${choice.choiceId}`);
  if(!choice.intentType)throw new Error(`semantic_intent_type_required:${choice.choiceId}`);
  if(!choice.resolverBindingRef)throw new Error(`resolver_binding_required:${choice.choiceId}`);
  return{
    choiceId:String(choice.choiceId),
    intentType:String(choice.intentType),
    intentPayload:clone(choice.intentPayload||null),
    eligibilityBasisRefs:normalizeRefs(choice.eligibilityBasisRefs),
    resolverBindingRef:String(choice.resolverBindingRef),
    presentationKey:choice.presentationKey?String(choice.presentationKey):null,
    presentationLabel:choice.presentationLabel?String(choice.presentationLabel):null,
    authoredOrder:Number.isFinite(choice.authoredOrder)?Number(choice.authoredOrder):index
  };
}
function unresolvedChoiceSets(store,decisionPointRef){
  return Object.values(store.choiceSets).filter(row=>row&&row.decisionPointRef===decisionPointRef&&row.status==="unresolved");
}
function openSemanticChoiceSet(spec={}){
  const storyUnitRef=String(spec.storyUnitRef||"");
  const decisionPointRef=String(spec.decisionPointRef||"");
  const contextStateRef=String(spec.contextStateRef||"");
  if(!storyUnitRef||!decisionPointRef||!contextStateRef)return{success:false,reason:"story_decision_context_incomplete"};
  const choices=(Array.isArray(spec.choices)?spec.choices:[]).map(normalizeChoice);
  if(!choices.length)return{success:false,reason:"semantic_choice_set_empty"};
  if(new Set(choices.map(row=>row.choiceId)).size!==choices.length)return{success:false,reason:"duplicate_semantic_choice_id"};
  const store=unitStore(storyUnitRef);
  const unresolved=unresolvedChoiceSets(store,decisionPointRef);
  const semanticShape={storyUnitRef,decisionPointRef,contextStateRef,choices:choices.map(row=>({choiceId:row.choiceId,intentType:row.intentType,intentPayload:row.intentPayload,eligibilityBasisRefs:row.eligibilityBasisRefs,resolverBindingRef:row.resolverBindingRef,authoredOrder:row.authoredOrder}))};
  const semanticHash=hash(semanticShape);
  const same=unresolved.find(row=>row.contextStateRef===contextStateRef);
  if(same){
    if(same.semanticHash!==semanticHash)return{success:false,reason:"semantic_choice_set_drift_same_committed_state",choiceSetId:same.choiceSetId};
    return{success:true,idempotent:true,choiceSet:clone(same)};
  }
  if(unresolved.length){
    return{success:false,reason:"unresolved_choice_set_requires_explicit_supersession",existingChoiceSetIds:unresolved.map(row=>row.choiceSetId)};
  }
  const choiceSetId=stableRef("sc340-choice",semanticShape);
  const row={
    choiceSetId,storyUnitRef,storyUnitType:String(spec.storyUnitType||"other"),decisionPointRef,contextStateRef,
    sceneRef:spec.sceneRef?String(spec.sceneRef):null,beatRef:spec.beatRef?String(spec.beatRef):null,
    authorityVersionRefs:normalizeRefs(spec.authorityVersionRefs),sourceOccurrenceRefs:normalizeRefs(spec.sourceOccurrenceRefs),
    observerRef:spec.observerRef?String(spec.observerRef):null,choices,excludedIntentRefs:normalizeRefs(spec.excludedIntentRefs),
    semanticHash,status:"unresolved",createdAt:Date.now(),selectedChoiceId:null,supersededBy:null
  };
  store.choiceSets[choiceSetId]=row;save();
  return{success:true,choiceSet:clone(row)};
}
function supersedeSemanticChoiceSet(spec={}){
  const store=unitStore(spec.storyUnitRef);
  const row=store.choiceSets[String(spec.choiceSetId||"")];
  if(!row)return{success:false,reason:"choice_set_not_found"};
  if(row.status!=="unresolved")return{success:false,reason:"choice_set_not_unresolved",status:row.status};
  if(!spec.committedStateRef)return{success:false,reason:"supersession_requires_new_committed_state_ref"};
  row.status="superseded";
  row.supersededBy=String(spec.committedStateRef);
  row.supersededAt=Date.now();save();
  return{success:true,choiceSet:clone(row)};
}
function registerStoryAdapter(def={}){
  if(!def.storyUnitRef)return{success:false,reason:"story_unit_ref_required"};
  const key=String(def.storyUnitRef);
  adapters.set(key,Object.freeze({...def,storyUnitRef:key}));
  return{success:true,storyUnitRef:key};
}
function registerResolver(bindingRef,fn,options={}){
  if(!bindingRef||typeof fn!=="function")return{success:false,reason:"resolver_binding_and_function_required"};
  const key=String(bindingRef);
  resolvers.set(key,Object.freeze({bindingRef:key,resolve:fn,owner:options.owner||null,battleOwned:options.battleOwned===true}));
  return{success:true,bindingRef:key};
}
function commitStoryIntent(spec={}){
  const store=unitStore(spec.storyUnitRef);
  const set=store.choiceSets[String(spec.choiceSetId||"")];
  if(!set)return{success:false,reason:"choice_set_not_found"};
  if(set.status!=="unresolved"){
    if(set.selectedChoiceId&&set.selectedChoiceId===spec.choiceId){
      const existing=Object.values(store.decisionReceipts).find(r=>r&&r.choiceSetId===set.choiceSetId&&r.selectedChoiceId===set.selectedChoiceId);
      return existing?{success:true,idempotent:true,receipt:clone(existing)}:{success:false,reason:"choice_set_already_committed_without_receipt"};
    }
    return{success:false,reason:"choice_set_not_selectable",status:set.status};
  }
  const choice=set.choices.find(row=>row.choiceId===String(spec.choiceId||""));
  if(!choice)return{success:false,reason:"semantic_choice_not_in_set"};
  const intentCommitRef=stableRef("sc340-intent",{storyUnitRef:set.storyUnitRef,choiceSetId:set.choiceSetId,choiceId:choice.choiceId,intentType:choice.intentType,intentPayload:choice.intentPayload});
  const receiptId=stableRef("sc340-receipt",{intentCommitRef,resolverBindingRef:choice.resolverBindingRef});
  const receipt={
    storyDecisionReceiptId:receiptId,storyDecisionContextId:set.contextStateRef,storyUnitRef:set.storyUnitRef,
    choiceSetId:set.choiceSetId,selectedChoiceId:choice.choiceId,selectedIntent:{intentType:choice.intentType,intentPayload:clone(choice.intentPayload)},
    intentCommitRef,resolverBindingRef:choice.resolverBindingRef,resolverRequestRef:null,resolverResultRef:null,
    sourceOccurrenceRefs:clone(set.sourceOccurrenceRefs||[]),consequenceRefs:[],stateDeltaRefs:[],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],
    successorSituationRef:null,status:"intent_committed",createdAt:Date.now(),resolvedAt:null
  };
  set.status="intent_committed";set.selectedChoiceId=choice.choiceId;set.intentCommitRef=intentCommitRef;
  store.decisionReceipts[receiptId]=receipt;save();
  return{success:true,receipt:clone(receipt),choice:clone(choice)};
}
function dispatchCommittedIntent(spec={}){
  const store=unitStore(spec.storyUnitRef);
  const receipt=store.decisionReceipts[String(spec.receiptId||"")];
  if(!receipt)return{success:false,reason:"decision_receipt_not_found"};
  if(receipt.status==="resolved")return{success:true,idempotent:true,receipt:clone(receipt)};
  if(receipt.status!=="intent_committed"&&receipt.status!=="resolver_blocked")return{success:false,reason:"decision_receipt_not_dispatchable",status:receipt.status};
  const resolver=resolvers.get(receipt.resolverBindingRef);
  if(!resolver){receipt.status="resolver_blocked";receipt.blocker="resolver_binding_not_registered";save();return{success:false,reason:"resolver_binding_not_registered",resolverBindingRef:receipt.resolverBindingRef,receipt:clone(receipt)};}
  const resolverRequestRef=stableRef("sc340-resolver-request",{receiptId:receipt.storyDecisionReceiptId,resolverBindingRef:receipt.resolverBindingRef});
  receipt.resolverRequestRef=resolverRequestRef;
  let result;
  try{
    result=resolver.resolve({
      storyUnitRef:receipt.storyUnitRef,
      receipt:clone(receipt),
      context:clone(spec.context||{}),
      state:clone(spec.state||{}),
      adapter:clone(adapters.get(receipt.storyUnitRef)||null)
    });
  }catch(error){
    receipt.status="resolver_blocked";receipt.blocker="resolver_exception";receipt.blockerDetail=String(error&&error.message||error);save();
    return{success:false,reason:"resolver_exception",error:receipt.blockerDetail,receipt:clone(receipt)};
  }
  if(!result||result.success!==true){
    receipt.status="resolver_blocked";receipt.blocker=result&&result.reason||"resolver_failed";save();
    return{success:false,reason:receipt.blocker,result:clone(result),receipt:clone(receipt)};
  }
  receipt.status="resolved";receipt.blocker=null;
  receipt.resolverResultRef=String(result.resolverResultRef||stableRef("sc340-resolver-result",{resolverRequestRef,result:result.result||result.outcome||null}));
  receipt.consequenceRefs=normalizeRefs(result.consequenceRefs);
  receipt.stateDeltaRefs=normalizeRefs(result.stateDeltaRefs);
  receipt.knowledgeDeltaRefs=normalizeRefs(result.knowledgeDeltaRefs);
  receipt.relationshipHistoryRefs=normalizeRefs(result.relationshipHistoryRefs);
  receipt.objectiveDeltaRefs=normalizeRefs(result.objectiveDeltaRefs);
  receipt.successorSituationRef=result.successorSituationRef?String(result.successorSituationRef):null;
  receipt.resolvedAt=Date.now();
  const set=store.choiceSets[receipt.choiceSetId];if(set)set.status="resolved";
  save();
  return{success:true,receipt:clone(receipt),result:clone(result)};
}
function resolveStoryChoice(spec={}){
  const committed=commitStoryIntent(spec);if(!committed.success)return committed;
  return dispatchCommittedIntent({storyUnitRef:spec.storyUnitRef,receiptId:committed.receipt.storyDecisionReceiptId,context:spec.context,state:spec.state});
}
function registerAutonomyAnchor(storyUnitRef,anchor={}){
  const key=String(storyUnitRef||"");
  if(!key||!anchor.anchorId)return{success:false,reason:"story_unit_and_anchor_id_required"};
  const row=Object.freeze({
    anchorId:String(anchor.anchorId),classes:normalizeRefs(anchor.classes),actorRef:anchor.actorRef?String(anchor.actorRef):null,
    priority:Number.isFinite(anchor.priority)?Number(anchor.priority):100,orderRef:anchor.orderRef?String(anchor.orderRef):null,
    battleOwned:anchor.battleOwned===true||normalizeRefs(anchor.classes).includes("BATTLE_OWNED_AUTONOMY"),
    material:anchor.material!==false,
    due:typeof anchor.due==="function"?anchor.due:()=>false,
    resolve:typeof anchor.resolve==="function"?anchor.resolve:null,
    metadata:clone(anchor.metadata||{})
  });
  if(!anchorsByStoryUnit.has(key))anchorsByStoryUnit.set(key,new Map());
  anchorsByStoryUnit.get(key).set(row.anchorId,row);
  return{success:true,anchorId:row.anchorId};
}
function autonomyWindowKey(storyUnitRef,anchor,state={}){
  const stateRef=String(state.committedStateRef||state.stateRef||"unversioned");
  return stableRef("sc340-autonomy",{storyUnitRef,anchorId:anchor.anchorId,actorRef:anchor.actorRef,stateRef});
}
function evaluateDueAutonomy(storyUnitRef,state={}){
  const map=anchorsByStoryUnit.get(String(storyUnitRef||""));
  if(!map)return{success:true,due:[],contested:false};
  const due=[];
  for(const anchor of map.values()){
    let isDue=false;
    try{isDue=anchor.due(clone(state))===true;}catch(_error){isDue=false;}
    if(isDue)due.push(anchor);
  }
  due.sort((a,b)=>a.priority-b.priority||String(a.orderRef||a.anchorId).localeCompare(String(b.orderRef||b.anchorId)));
  if(due.length>1&&due[0].priority===due[1].priority){
    const samePriority=due.filter(row=>row.priority===due[0].priority);
    const explicit=samePriority.every(row=>!!row.orderRef)&&new Set(samePriority.map(row=>row.orderRef)).size===samePriority.length;
    if(!explicit)return{success:false,reason:"contested_autonomy_order_requires_authority",contested:true,due:due.map(row=>({anchorId:row.anchorId,actorRef:row.actorRef,priority:row.priority}))};
  }
  return{success:true,contested:false,due:due.map(row=>({anchorId:row.anchorId,actorRef:row.actorRef,priority:row.priority,orderRef:row.orderRef,battleOwned:row.battleOwned,classes:clone(row.classes)}))};
}
function consumeNextAutonomy(spec={}){
  const storyUnitRef=String(spec.storyUnitRef||"");
  const state=clone(spec.state||{});
  const evaluation=evaluateDueAutonomy(storyUnitRef,state);if(!evaluation.success)return evaluation;
  if(!evaluation.due.length)return{success:true,noneDue:true};
  const next=evaluation.due[0];
  const anchor=anchorsByStoryUnit.get(storyUnitRef).get(next.anchorId);
  if(anchor.battleOwned===true||state.battleLive===true){
    return{success:false,reason:"battle_owns_action_economy",anchorId:anchor.anchorId,battleOwned:true};
  }
  const store=unitStore(storyUnitRef);
  const windowKey=autonomyWindowKey(storyUnitRef,anchor,state);
  const existing=store.autonomyReceipts[windowKey];
  if(existing&&existing.status==="resolved")return{success:true,idempotent:true,receipt:clone(existing)};
  if(typeof anchor.resolve!=="function")return{success:false,reason:"autonomy_resolver_not_registered",anchorId:anchor.anchorId};
  let result;
  try{result=anchor.resolve({storyUnitRef,anchorId:anchor.anchorId,actorRef:anchor.actorRef,state:clone(state)});}catch(error){return{success:false,reason:"autonomy_resolver_exception",anchorId:anchor.anchorId,error:String(error&&error.message||error)};}
  if(!result||result.success!==true)return{success:false,reason:result&&result.reason||"autonomy_resolver_failed",anchorId:anchor.anchorId,result:clone(result)};
  const receipt={
    autonomyReceiptId:windowKey,storyUnitRef,anchorId:anchor.anchorId,actorRef:anchor.actorRef,
    committedStateRef:String(state.committedStateRef||state.stateRef||"unversioned"),
    participantIntentRef:result.participantIntentRef?String(result.participantIntentRef):null,
    resolverResultRef:String(result.resolverResultRef||stableRef("sc340-autonomy-result",{windowKey,result:result.result||result.outcome||null})),
    consequenceRefs:normalizeRefs(result.consequenceRefs),status:"resolved",createdAt:Date.now()
  };
  store.autonomyReceipts[windowKey]=receipt;save();
  return{success:true,receipt:clone(receipt),result:clone(result)};
}
function openDecisionAfterAutonomy(spec={}){
  const evaluation=evaluateDueAutonomy(spec.storyUnitRef,spec.state||{});
  if(!evaluation.success)return evaluation;
  if(evaluation.due.length)return{success:false,reason:"participant_autonomy_due_before_protagonist",due:evaluation.due};
  return openSemanticChoiceSet(spec);
}
function recordParticipantClassification(spec={}){
  if(!spec.storyUnitRef||!spec.participantRef||!spec.stateClass)return{success:false,reason:"participant_classification_incomplete"};
  const store=unitStore(spec.storyUnitRef),key=String(spec.participantRef);
  store.participantStates[key]={participantRef:key,stateClass:String(spec.stateClass),resultRef:spec.resultRef?String(spec.resultRef):null,updatedAt:Date.now()};save();
  return{success:true,state:clone(store.participantStates[key])};
}
function recordMaterialState(spec={}){
  if(!spec.storyUnitRef||!spec.materialRef)return{success:false,reason:"material_state_ref_required"};
  const store=unitStore(spec.storyUnitRef),key=String(spec.materialRef);
  store.materialStates[key]={materialRef:key,resolved:spec.resolved===true,stateRef:spec.stateRef?String(spec.stateRef):null,value:clone(spec.value),updatedAt:Date.now()};save();
  return{success:true,state:clone(store.materialStates[key])};
}
function terminalSemanticGuard(spec={}){
  const storyUnitRef=String(spec.storyUnitRef||"");
  const store=unitStore(storyUnitRef);
  const due=evaluateDueAutonomy(storyUnitRef,spec.state||{});
  if(!due.success)return{success:false,reason:due.reason,due:due.due||[]};
  if(due.due.length)return{success:false,reason:"terminal_projection_blocked_due_autonomy",due:due.due};
  const unresolvedReceipts=Object.values(store.decisionReceipts).filter(row=>row&&["intent_committed","resolver_blocked"].includes(row.status));
  if(unresolvedReceipts.length)return{success:false,reason:"terminal_projection_blocked_unresolved_decision_receipt",receiptIds:unresolvedReceipts.map(row=>row.storyDecisionReceiptId)};
  const required=normalizeRefs(spec.requiredMaterialRefs);
  const missing=required.filter(ref=>!store.materialStates[ref]||store.materialStates[ref].resolved!==true);
  if(missing.length)return{success:false,reason:"terminal_projection_blocked_unresolved_material_state",materialRefs:missing};
  return{success:true,terminalProjectionAllowed:true};
}
function getStoryUnitSnapshot(storyUnitRef){return clone(unitStore(storyUnitRef));}
function getRegisteredAnchorInventory(storyUnitRef){
  const map=anchorsByStoryUnit.get(String(storyUnitRef||""));
  return map?[...map.values()].map(row=>({anchorId:row.anchorId,classes:clone(row.classes),actorRef:row.actorRef,priority:row.priority,orderRef:row.orderRef,battleOwned:row.battleOwned,material:row.material,metadata:clone(row.metadata)})):[];
}
function runStoryDecisionRealisation34000Diagnostics(){
  const checks={
    patchId:PATCH_ID==="story_decision_realisation_34000_2026_09_15",
    neutralAuthorityPinned:AUTHORITY.neutralDecision==="aa01e819183cb0a16ccca9f61dc8ca253c409022",
    participantFirstAuthorityPinned:AUTHORITY.participantFirst==="06566ee81fe7c7856fd513d0225e621273f4bfaa",
    stableHashDeterministic:hash({b:2,a:1})===hash({a:1,b:2}),
    noMissionStorageDependency:!unitStore.toString().includes("missionId")&&!unitStore.toString().includes("ceMissionChoice121"),
    battleBoundaryExplicit:consumeNextAutonomy.toString().includes("battle_owns_action_economy"),
    terminalGuardExists:typeof terminalSemanticGuard==="function",
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,authority:clone(AUTHORITY),pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const api=Object.freeze({
  patchId:PATCH_ID,authority:AUTHORITY,
  registerStoryAdapter,registerResolver,registerAutonomyAnchor,
  openSemanticChoiceSet,supersedeSemanticChoiceSet,commitStoryIntent,dispatchCommittedIntent,resolveStoryChoice,
  evaluateDueAutonomy,consumeNextAutonomy,openDecisionAfterAutonomy,
  recordParticipantClassification,recordMaterialState,terminalSemanticGuard,
  getStoryUnitSnapshot,getRegisteredAnchorInventory,
  stableRef,hash,clone,browserGoldenClaimed:false
});
globalThis.SC_STORY_DECISION_REALISATION_34000=api;
globalThis.runStoryDecisionRealisation34000Diagnostics=runStoryDecisionRealisation34000Diagnostics;

// Academy Kakashi is the first required neutral Story consumer. 34000 may load
// before the later 33800/33900 cinematic chain, so wait for both without
// mutating their load order. This remains browser-only activation; headless QA
// may load the adapter directly.
(function scheduleKakashiFinalAdapter34100(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;
  let attempts=0;
  const tryLoad=()=>{
    if(globalThis.SC_ALPHA_KAKASHI_FINAL_34100)return;
    if(globalThis.SC_ALPHA_KAKASHI_ORIGINAL_33800&&globalThis.SC_STORY_SCENE_BOARD_33900){
      const id="sc-alpha-kakashi-final-34100-script";
      if(document.getElementById(id))return;
      const script=document.createElement("script");script.id=id;script.async=false;
      script.src="runtime/alpha-kakashi-final-origin-adapter-34100.js?sc=kakashi-final-20260915-10";
      document.head.appendChild(script);return;
    }
    attempts+=1;if(attempts<240&&typeof setTimeout==="function")setTimeout(tryLoad,50);
  };
  tryLoad();
})();
})();
