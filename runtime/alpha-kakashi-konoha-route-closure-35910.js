// ============================================================================
// ACADEMY KAKASHI — KONOHA ROUTE CLOSURE — 35910
//
// Consumes Writing/Story 100% closure for route families that were still
// selectable-but-blocked after gen68:
// - direct STRIKE BEFORE THE HANDOFF fixed 2v1 -> MI 1v1 chain;
// - OBSERVE -> SECURE THE PACKAGE BEFORE THE ASSASSIN factual resolver;
// - OBSERVE -> GO AFTER THE ORIGINAL TARGET factual resolver;
// - MOVE IN CLOSER -> LET THE HANDOFF HAPPEN reconvergence.
//
// Battle owns win/loss only. Story owns package, participant disposition,
// Knowledge, Pakkun continuity, and terminal projection.
// ============================================================================
(function installAcademyKakashiKonohaRouteClosure35910(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_KONOHA_ROUTE_CLOSURE_35910)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
const BATTLE=globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300;
const SEQ=globalThis.SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410;
const CLOSURE=globalThis.SC_ALPHA_KAKASHI_KONOHA_CLOSURE_35900;
if(!A||!CORE||!KAK||!PROVIDER||!BATTLE||!SEQ||!CLOSURE)throw new Error("kakashi_konoha_route_closure_35910_dependencies_missing");

const PATCH_ID="alpha_kakashi_konoha_route_closure_35910_v3_2026_09_20";
const ORIGIN="academy_kakashi";
const SCENE="origin_academy_kakashi_anbu_retrieval";
const KAKASHI="academy_kakashi";
const AMT="academy_kakashi_origin_amt";
const PS="academy_kakashi_origin_package_smuggler";
const MI="academy_kakashi_origin_masked_interceptor";
const PAKKUN="pakkun_origin_unfamiliar_ninken";
const PACKAGE="kakashi_origin_outer_route_packet";
const ACTION_BEAT="kak_original_action";
const OBSERVE_BEAT="kak_original_major_choice";
const TERMINAL="kak_seq_debrief_pending";
const SAKURA={assetId:"kakashi_origin_sakura_tree_night"};
const ALLEY={assetId:"kakashi_origin_pakkun_interception_alley"};

const AUTH=Object.freeze({
 writing100:"21e0407a0c371310ff06096905fd1fce4107ece8",
 directStrike:"4de4e7d0d4e26e71510db635a75d6d867bdaffb7",
 secureBefore:"3b68732b4d4a8a4ca589470174441ca1dcf370ef",
 originalTarget:"64e25dc6d53c2e88e9e27b671db7e0e148051289",
 factualProvider:"f2291162085cb3a35fc2a8e49df7ed905c214c85",
 ce256:"09db8ff4efc28ee608d41c828af48efc023d324f",
 fieldSecured:"77d351e6f8d4eefaea0f8a6db82dec686391e1c0"
});

const DIRECT_BINDING="academy_kakashi.resolver.attack";
const SECURE_BEFORE_BINDING="academy_kakashi.resolver.secure_package_before_assassin";
const ORIGINAL_TARGET_BINDING="academy_kakashi.resolver.pursue_original_target";
const DIRECT_2V1="academy_kakashi_origin_battle_amt_ps_2v1";
const DIRECT_MI="academy_kakashi_origin_battle_mi_1v1";
const SECURE_2V1="academy_kakashi_origin_battle_ps_mi_2v1";
const AMT_PAKKUN="academy_kakashi_origin_battle_seq_amt_pakkun";

const D=Object.freeze({
 directIntro:"kak_konoha_direct_strike_intro_35910",
 directBattle:"kak_konoha_direct_strike_2v1_battle_35910",
 directReturn:"kak_konoha_direct_strike_2v1_return_35910",
 directMiArrival:"kak_konoha_direct_strike_mi_arrival_35910",
 directMiBattle:"kak_konoha_direct_strike_mi_battle_35910",
 directMiReturn:"kak_konoha_direct_strike_mi_return_35910",
 directGroup:"kak_konoha_direct_strike_group_disposition_35910",
 secureBeforeIntro:"kak_konoha_secure_before_intro_35910",
 secureBeforeBattle:"kak_konoha_secure_before_2v1_battle_35910",
 secureBeforeReturn:"kak_konoha_secure_before_2v1_return_35910",
 originalIntro:"kak_konoha_original_target_intro_35910",
 originalPakkun:"kak_konoha_original_target_pakkun_35910",
 originalBattle:"kak_konoha_original_target_amt_battle_35910",
 originalReturn:"kak_konoha_original_target_amt_return_35910",
 originalDisposition:"kak_konoha_original_target_disposition_35910"
});

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE):null;}catch(_e){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_e){}}
function clone(v){return CORE.clone(v);}
function occurrence(id){try{return id?A.findOccurrence(String(id)):null;}catch(_e){return null;}}
function factOf(row){return row&&(row.fact||row.data)||{};}
function stable(prefix,payload){return PROVIDER.stableRef(prefix,payload);}
function normalized(def,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(def,index):def;}
function available(v=true,blocker=null){return()=>({available:v===true,knownBlocker:v===true?null:blocker});}
function latestResult(){const rt=active();const resume=rt&&rt.battleResume&&typeof rt.battleResume==="object"?rt.battleResume:null;for(const row of resume?[resume.authored,resume.projected,resume.result,resume.battleResult]:[])if(row&&row.battleConfigId&&row.bindingRef)return row;try{const row=typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult():null;if(row&&row.battleConfigId)return row;}catch(_e){}return null;}
function material(pkg,stateRef,anchorRef){
 return CORE.recordMaterialState({storyUnitRef:ORIGIN,materialRef:PACKAGE,resolved:true,stateRef,value:{
  custodyClass:String(pkg.currentHolderClass||pkg.custodyClass||""),custodianRef:pkg.custodianRef||null,locationClass:pkg.locationClass||null,sourceAnchorRef:anchorRef||null
 }});
}
function commitOnce(id,fact,outcome,participants=[],sourceRefs=[]){
 const prior=occurrence(id);if(prior)return{success:true,idempotent:true,occurrenceId:id,record:prior};
 const out=A.commitOccurrence(ORIGIN,id,fact,[],{type:"origin_story_factual_occurrence",outcome,participantRefs:participants,sourceRefs});
 return out&&out.success===true?{success:true,occurrenceId:id,record:out.record}:out||{success:false,reason:"kakashi_konoha_route_occurrence_commit_failed"};
}
function classify(participantRef,stateClass,resultRef){
 return CORE.recordParticipantClassification({storyUnitRef:ORIGIN,participantRef,stateClass,resultRef});
}
function bridge(occurrenceId,result,successorSituationRef=null,stateDeltaRefs=[]){
 return{success:true,resolverResultRef:occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs,knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],successorSituationRef,result:clone(result)};
}
function dispatch(receipt,bindingRef,bridgeResult){
 return CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN,receiptId:receipt.storyDecisionReceiptId,state:{resolverResults:{[bindingRef]:bridgeResult}},context:{sceneRef:SCENE,originId:ORIGIN,storySceneInstanceId:String(active()&&active().instanceId||"")}});
}
function rootContext(rt){return stable("sc34120-kakashi-get-closer-entry",{sceneId:SCENE,storySceneInstanceId:String(rt&&rt.instanceId||""),beatId:ACTION_BEAT});}
function existingReceipt(contextStateRef,choiceId,bindingRef){
 const snap=CORE.getStoryUnitSnapshot(ORIGIN)||{};
 return Object.values(snap.decisionReceipts||{}).find(row=>row&&row.storyDecisionContextId===contextStateRef&&row.selectedChoiceId===choiceId&&row.resolverBindingRef===bindingRef)||null;
}
function ensureDecisionIntent({decisionPointRef,choiceId,bindingRef,contextStateRef,beatRef,choiceSetId=null,sourceOccurrenceRefs=[]}){
 let receipt=existingReceipt(contextStateRef,choiceId,bindingRef);
 if(receipt)return{success:true,idempotent:true,receipt,contextStateRef};
 let setId=String(choiceSetId||"");
 if(!setId){
  const opened=KAK.openDecisionPoint(decisionPointRef,{committedStateRef:contextStateRef,beatRef,sourceOccurrenceRefs});
  if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_konoha_route_choice_set_open_failed"};
  setId=opened.choiceSet.choiceSetId;
 }
 const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN,choiceSetId:setId,choiceId});
 if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_konoha_route_intent_commit_failed"};
 return{success:true,receipt:committed.receipt,contextStateRef,choiceSetId:setId};
}
function observeIntent(choiceId,bindingRef){
 const rt=active();if(!rt||rt.sceneId!==SCENE||rt.beatId!==OBSERVE_BEAT)return{success:false,reason:"kakashi_observe_route_context_required"};
 const stateRef=String(rt.localContext&&rt.localContext.kakashiObserveScene03AOccurrenceId||rt.localContext&&rt.localContext.kakashiGetCloserHandoffOccurrenceId||"");
 const choiceSetId=String(rt.localContext&&rt.localContext.kakashiObserveEscalationChoiceSetId||"");
 if(!stateRef||!choiceSetId)return{success:false,reason:"kakashi_observe_route_semantic_context_missing"};
 return ensureDecisionIntent({decisionPointRef:"OBSERVE_ESCALATION",choiceId,bindingRef,contextStateRef:stateRef,beatRef:OBSERVE_BEAT,choiceSetId,sourceOccurrenceRefs:[stateRef]});
}
function beginSharedObserveBattleChoice35910(choiceId,bindingRef,receiptKey,intentKey,nextBeatId){
 const rt=active(),intent=observeIntent(choiceId,bindingRef);
 if(!intent||intent.success!==true)return intent||{success:false,reason:"kakashi_shared_observe_intent_failed"};
 rt.localContext={...(rt.localContext||{}),[receiptKey]:String(intent.receipt&&intent.receipt.storyDecisionReceiptId||""),[intentKey]:String(intent.receipt&&intent.receipt.intentCommitRef||"")};
 save();
 return{success:true,choiceId,bindingRef,storyDecisionReceiptId:rt.localContext[receiptKey],intentCommitRef:rt.localContext[intentKey],nextBeatId};
}
function launch(config,binding,anchor,storyOccurrenceId,returnBeat,token,ctx={}){
 const rt=active(),cfg=BATTLE.configs&&BATTLE.configs[config]||null;
 const supplied=ctx&&ctx.returnContext&&typeof ctx.returnContext==="object"?ctx.returnContext:null;
 const returnContext={...(supplied||{}),type:"story_scene",sceneId:SCENE,sceneInstanceId:String(rt&&rt.instanceId||""),postBattleBeatId:returnBeat};
 return BATTLE.launchAcademyKakashiOriginPlBattle({
  battleConfigId:config,
  storyOccurrenceId:String(storyOccurrenceId||rt&&rt.instanceId||""),
  sourceAnchorRef:anchor,
  bindingRef:binding,
  returnToken:token,
  returnContext,
  pakkunAuthorized:!!(cfg&&cfg.pakkun===true)
 });
}
function participant(result,ref){return Array.isArray(result&&result.participants)?result.participants.find(row=>row&&row.participantRef===ref)||null:null;}
function defeatedUnresolved(result,refs){
 return refs.every(ref=>{const row=participant(result,ref);return !!row&&row.battleStatus==="defeated"&&row.lifeState==="unresolved"&&row.custodyState==="unresolved";});
}
function setNext(beatId,nextBeatId){const d=scene(),b=d&&d.beatMap instanceof Map?d.beatMap.get(beatId):null;if(b)b.nextBeatId=nextBeatId;return !!b;}
function directChainBinding(rt=active()){return String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeBindingRef||DIRECT_BINDING);}
function directChainAnchor(rt=active()){return String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeAnchorRef||"AK_SA_003");}
function directChainAuthority(rt=active()){return String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeAuthorityCommit||AUTH.directStrike);}
function directChainRoute(rt=active()){return String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeRouteRef||"direct_root");}
function beginReusedDirectStrikePhysical35910({receipt,bindingRef=DIRECT_BINDING,parentOccurrenceId="",routeRef="direct_root",anchorRef="AK_SA_003",authorityCommit=AUTH.directStrike,knowledgeStateRef=null}={}){
 const rt=active();if(!rt||rt.sceneId!==SCENE)return{success:false,reason:"direct_strike_reuse_story_context_required"};
 if(!receipt||!receipt.storyDecisionReceiptId)return{success:false,reason:"direct_strike_reuse_decision_receipt_required"};
 const binding=String(bindingRef||DIRECT_BINDING),anchor=String(anchorRef||"AK_SA_003"),authority=String(authorityCommit||AUTH.directStrike);
 const id=stable("occ_origin_kakashi_direct_strike_entry",{instance:String(rt.instanceId||""),receipt:String(receipt.storyDecisionReceiptId),binding,routeRef:String(routeRef||"")});
 const fact={factClass:"academy_kakashi_direct_strike_entry",anchorRef:anchor,authorityCommit:authority,storySceneInstanceId:String(rt.instanceId||""),storyDecisionReceiptId:String(receipt.storyDecisionReceiptId),parentOccurrenceRef:String(parentOccurrenceId||"")||null,routeRef:String(routeRef||"direct_root"),knowledgeStateRef:knowledgeStateRef?String(knowledgeStateRef):null,
  packageState:{objectRef:PACKAGE,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_PERSON",handoffCompleted:false},
  participantStateByRef:{[AMT]:{presenceState:"PRESENT"},[PS]:{presenceState:"PRESENT"},[MI]:{presenceState:"UNSEEN"},[PAKKUN]:{presenceState:"NOT_PRESENT"}},
  worldFacts:{handoffInterrupted:true,maskedInterceptorVisible:false,pakkunPresent:false,battleRequired:true,battleConfigId:DIRECT_2V1,retainsGetCloserKnowledge:!!knowledgeStateRef}};
 const committed=commitOnce(id,fact,"DIRECT_STRIKE_ENTRY",[ORIGIN,AMT,PS],[{type:"story_decision_receipt",id:String(receipt.storyDecisionReceiptId)},{type:"world_object",id:PACKAGE},{type:"writing_authority",id:authority}].concat(parentOccurrenceId?[{type:"origin_occurrence",id:String(parentOccurrenceId),role:"route_parent"}]:[]));if(!committed.success)return committed;
 const mat=material(fact.packageState,id,anchor);if(!mat||mat.success!==true)return mat;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaDirectStrikeOccurrenceId:id,kakashiKonohaDirectStrikeReceiptId:String(receipt.storyDecisionReceiptId),kakashiKonohaDirectStrikeBindingRef:binding,kakashiKonohaDirectStrikeAnchorRef:anchor,kakashiKonohaDirectStrikeAuthorityCommit:authority,kakashiKonohaDirectStrikeRouteRef:String(routeRef||"direct_root"),kakashiKonohaDirectStrikeKnowledgeStateRef:knowledgeStateRef?String(knowledgeStateRef):null,kakashiKonohaPackageOccurrenceId:id};save();
 return{success:true,occurrenceId:id,nextBeatId:D.directIntro,bindingRef:binding,anchorRef:anchor,routeRef:String(routeRef||"direct_root")};
}

// ---------------------------------------------------------------------------
// DIRECT STRIKE BEFORE THE HANDOFF
// ---------------------------------------------------------------------------
function resolveDirectStrikeEntry(choice){
 const rt=active();if(!rt||rt.sceneId!==SCENE||rt.beatId!==ACTION_BEAT)return{success:false,reason:"direct_strike_context_required"};
 const contextStateRef=rootContext(rt);
 const intent=ensureDecisionIntent({decisionPointRef:"AK_SA_001",choiceId:"attack",bindingRef:DIRECT_BINDING,contextStateRef,beatRef:ACTION_BEAT});
 if(!intent||intent.success!==true)return intent;
 const begun=beginReusedDirectStrikePhysical35910({receipt:intent.receipt,bindingRef:DIRECT_BINDING,parentOccurrenceId:"",routeRef:"direct_root",anchorRef:"AK_SA_003",authorityCommit:AUTH.directStrike});
 if(!begun||begun.success!==true)return begun||{success:false,reason:"direct_strike_physical_chain_begin_failed"};
 choice.nextBeatId=D.directIntro;return begun;
}
function launchDirect2v1(ctx={}){
 const rt=active(),source=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeOccurrenceId||"");
 if(!source)return{success:false,reason:"direct_strike_entry_occurrence_missing"};
 return launch(DIRECT_2V1,directChainBinding(rt),directChainAnchor(rt),source,D.directReturn,"direct_strike_2v1",ctx);
}
function consumeDirect2v1(){
 const rt=active(),r=latestResult();if(!rt||rt.beatId!==D.directReturn)return{success:false,reason:"direct_strike_return_context_required"};
 const binding=directChainBinding(rt),anchor=directChainAnchor(rt),authority=directChainAuthority(rt),routeRef=directChainRoute(rt);
 if(!r||String(r.battleConfigId||"")!==DIRECT_2V1||String(r.bindingRef||"")!==binding)return{success:false,reason:"direct_strike_battle_receipt_mismatch"};
 const receiptId=String(rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeReceiptId||"");const snap=CORE.getStoryUnitSnapshot(ORIGIN)||{},receipt=snap.decisionReceipts&&snap.decisionReceipts[receiptId];if(!receipt)return{success:false,reason:"direct_strike_story_receipt_missing"};
 const win=String(r.resultState||"")==="player_side_victory";
 const id=stable("occ_origin_kakashi_direct_strike_2v1_return",{instance:String(rt.instanceId||""),battle:String(r.battleOccurrenceId||""),win});
 let fact;
 if(win){
  if(!defeatedUnresolved(r,[AMT,PS]))return{success:false,reason:"direct_strike_2v1_victory_participant_state_invalid"};
  fact={factClass:"academy_kakashi_direct_strike_2v1_victory",anchorRef:anchor,authorityCommit:authority,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),
   packageState:{objectRef:PACKAGE,previousHolderClass:"ANBU_MARKED_TARGET",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",handoffCompleted:false},
   participantStateByRef:{[AMT]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[PS]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[MI]:{presenceState:"UNSEEN"}},
   worldFacts:{handoffInterrupted:true,packageRecovered:true,maskedInterceptorVisible:false,pakkunPresent:false,participantDeathCommitted:false,participantCustodyCommitted:false}};
 }else{
  fact={factClass:"academy_kakashi_direct_strike_2v1_defeat",anchorRef:anchor,authorityCommit:authority,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),
   packageState:{objectRef:PACKAGE,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_ESCAPED_WITH_PACKAGE",handoffCompleted:false},
   participantStateByRef:{[AMT]:{presenceState:"ESCAPED",controlState:"FREE"},[PS]:{presenceState:"ESCAPED",controlState:"FREE"},[MI]:{presenceState:"UNSEEN"}},
   worldFacts:{handoffInterrupted:true,amtEscaped:true,packageSmugglerEscaped:true,maskedInterceptorVisible:false,pakkunPresent:false,participantDeathCommitted:false,participantCustodyCommitted:false}};
 }
 const committed=commitOnce(id,fact,win?"DIRECT_STRIKE_2V1_VICTORY":"DIRECT_STRIKE_2V1_DEFEAT",[ORIGIN,AMT,PS],[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"writing_authority",id:authority}]);if(!committed.success)return committed;
 const mat=material(fact.packageState,id,anchor);if(!mat||mat.success!==true)return mat;
 if(win){for(const ref of [AMT,PS]){const cl=classify(ref,"BATTLE_DEFEATED_UNRESOLVED",stable("sc35910-direct-defeated",{id,ref}));if(!cl.success)return cl;}}
 else{for(const ref of [AMT,PS]){const cl=classify(ref,"ESCAPED",stable("sc35910-direct-escaped",{id,ref}));if(!cl.success)return cl;}}
 const dispatched=dispatch(receipt,binding,bridge(id,{outcomeClass:win?"DIRECT_STRIKE_2V1_VICTORY_PACKAGE_SECURED":"DIRECT_STRIKE_2V1_DEFEAT_AMT_PS_ESCAPE",packageState:fact.packageState,battleResultState:r.resultState,routeRef},win?"academy_kakashi.direct_strike.mi_arrival":"academy_kakashi.debrief"));
 if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"direct_strike_semantic_dispatch_failed"};
 rt.localContext={...(rt.localContext||{}),kakashiKonohaDirectStrike2v1OccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};setNext(D.directReturn,win?D.directMiArrival:TERMINAL);save();
 return{success:true,victory:win,occurrenceId:id,nextBeatId:win?D.directMiArrival:TERMINAL};
}
function launchDirectMi(ctx={}){
 const rt=active(),source=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrike2v1OccurrenceId||"");if(!source)return{success:false,reason:"direct_strike_mi_parent_missing"};
 return launch(DIRECT_MI,"academy_kakashi.battle.direct_strike_mi",directChainAnchor(rt),source,D.directMiReturn,"direct_strike_mi_1v1",ctx);
}
function consumeDirectMi(){
 const rt=active(),r=latestResult();if(!rt||rt.beatId!==D.directMiReturn)return{success:false,reason:"direct_strike_mi_return_context_required"};
 if(!r||String(r.battleConfigId||"")!==DIRECT_MI||String(r.bindingRef||"")!=="academy_kakashi.battle.direct_strike_mi")return{success:false,reason:"direct_strike_mi_receipt_mismatch"};
 const win=String(r.resultState||"")==="player_side_victory",anchor=directChainAnchor(rt),authority=directChainAuthority(rt),routeRef=directChainRoute(rt);
 const id=stable("occ_origin_kakashi_direct_strike_mi_return",{instance:String(rt.instanceId||""),battle:String(r.battleOccurrenceId||""),win,routeRef});
 const pkg=win
  ?{objectRef:PACKAGE,currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON"}
  :{objectRef:PACKAGE,previousHolderClass:"KAKASHI",currentHolderClass:"MASKED_INTERCEPTOR",custodyClass:"MASKED_INTERCEPTOR",locationClass:"MI_ESCAPED_WITH_PACKAGE"};
 const fact={factClass:win?"academy_kakashi_direct_strike_mi_victory":"academy_kakashi_direct_strike_mi_defeat",anchorRef:anchor,authorityCommit:authority,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),packageState:pkg,
  participantStateByRef:{[AMT]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[PS]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[MI]:win?{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}:{presenceState:"ESCAPED",controlState:"FREE"}},
  worldFacts:{packageCustody:pkg.currentHolderClass,maskedInterceptorEscaped:!win,pakkunPresent:false,participantDeathCommitted:false,participantCustodyCommitted:false}};
 const committed=commitOnce(id,fact,win?"DIRECT_STRIKE_MI_VICTORY":"DIRECT_STRIKE_MI_DEFEAT",[ORIGIN,AMT,PS,MI],[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"writing_authority",id:authority}]);if(!committed.success)return committed;
 const mat=material(pkg,id,anchor);if(!mat||mat.success!==true)return mat;
 const cl=classify(MI,win?"BATTLE_DEFEATED_UNRESOLVED":"ESCAPED",stable("sc35910-direct-mi",{id,win}));if(!cl.success)return cl;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaDirectStrikeMiOccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};setNext(D.directMiReturn,win?D.directGroup:TERMINAL);save();
 return{success:true,victory:win,occurrenceId:id,nextBeatId:win?D.directGroup:TERMINAL};
}
function commitDirectGroupDisposition(kind){
 const rt=active(),parent=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaDirectStrikeMiOccurrenceId||"");if(!rt||rt.beatId!==D.directGroup||!parent)return{success:false,reason:"direct_strike_group_context_required"};
 const authority=directChainAuthority(rt),anchor=directChainAnchor(rt);
 const stateByKind={POLICE:"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY",ANBU:"ANBU_INSTITUTIONAL_CUSTODY",KILL:"DEAD",RELEASE:"DELIBERATELY_RELEASED"};
 const stateClass=stateByKind[kind];if(!stateClass)return{success:false,reason:"direct_strike_group_disposition_unknown"};
 const id=stable("occ_origin_kakashi_direct_strike_group_disposition",{instance:String(rt.instanceId||""),parent,kind});
 const participantStateByRef={};const participantStateDeltaRefs=[];
 for(const ref of [AMT,PS,MI]){participantStateByRef[ref]={stateClass,lifeState:kind==="KILL"?"DEAD":"ALIVE",custodyDestination:kind==="POLICE"?"UCHIHA_POLICE":kind==="ANBU"?"ANBU":null};}
 const pkg=kind==="ANBU"?{objectRef:PACKAGE,previousHolderClass:"KAKASHI",currentHolderClass:"ANBU",custodyClass:"ANBU",locationClass:"ANBU_ROOFTOP"}:{objectRef:PACKAGE,currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON"};
 const fact={factClass:"academy_kakashi_direct_strike_group_disposition",authorityCommit:authority,anchorRef:anchor,storySceneInstanceId:String(rt.instanceId||""),parentOccurrenceRef:parent,routeRef:directChainRoute(rt),selectedDisposition:kind,packageState:pkg,participantStateByRef,
  worldFacts:{deterministicPostBattleKills:kind==="KILL"?3:0,groupReleased:kind==="RELEASE",groupInstitutionalTransfer:kind==="POLICE"||kind==="ANBU",pakkunPresent:false}};
 const committed=commitOnce(id,fact,"DIRECT_STRIKE_GROUP_"+kind,[ORIGIN,AMT,PS,MI],[{type:"origin_occurrence",id:parent},{type:"writing_authority",id:authority}]);if(!committed.success)return committed;
 for(const ref of [AMT,PS,MI]){const resultRef=stable("sc35910-direct-group-state",{id,ref,stateClass});const cl=classify(ref,stateClass,resultRef);if(!cl.success)return cl;participantStateDeltaRefs.push(resultRef);}
 const mat=material(pkg,id,anchor);if(!mat||mat.success!==true)return mat;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaDirectStrikeDispositionOccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};save();
 return{success:true,occurrenceId:id,nextBeatId:TERMINAL,participantStateDeltaRefs};
}

// ---------------------------------------------------------------------------
// SECURE THE PACKAGE BEFORE THE ASSASSIN
// ---------------------------------------------------------------------------
function commitSecureBefore({receipt,request,result}){
 const rt=active();if(!rt||rt.sceneId!==SCENE)return{success:false,reason:"secure_before_story_context_missing"};
 const selected=String(receipt&&receipt.selectedOutcomeRef||"");const success=selected==="SECURE_BEFORE_SUCCESS_CLEAN_EXTRACTION",failure=selected==="SECURE_BEFORE_FAILURE_COLLAPSE_TO_2V1";if(!success&&!failure)return{success:false,reason:"secure_before_outcome_unknown"};
 const id=String(request&&request.committedAtOccurrenceRef||stable("occ_origin_kakashi_secure_before",{instance:String(rt.instanceId||""),receipt:String(receipt&&receipt.storyDecisionReceiptId||""),selected}));
 const pkg=success?{objectRef:PACKAGE,previousHolderClass:"PACKAGE_SMUGGLER",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",handoffCompleted:true}:{objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PS_PERSON",handoffCompleted:true};
 const fact={factClass:"academy_kakashi_secure_package_before_assassin_factual_state",anchorRef:"AK_SA_020",authorityCommit:AUTH.secureBefore,storySceneInstanceId:String(rt.instanceId||""),storyDecisionReceiptId:String(receipt&&receipt.storyDecisionReceiptId||""),storyFactualResolverReceiptId:String(receipt&&receipt.storyFactualResolverReceiptId||""),selectedOutcomeRef:selected,packageState:pkg,
  participantStateByRef:{[AMT]:{presenceState:"ESCAPED"},[PS]:{presenceState:"PRESENT"},[MI]:{presenceState:"PRESENT"},[PAKKUN]:{presenceState:"NOT_PRESENT"}},
  knowledgeStateByObserver:{[KAKASHI]:{laterPsMiOutcomeKnown:false}},worldFacts:{cleanExtractionSucceeded:success,battleRequired:failure,pakkunPresent:false,participantCustodyCommitted:false,participantDeathCommitted:false}};
 const committed=commitOnce(id,fact,selected,[ORIGIN,AMT,PS,MI],[{type:"story_decision_receipt",id:String(receipt&&receipt.storyDecisionReceiptId||"")},{type:"writing_authority",id:AUTH.secureBefore},{type:"world_object",id:PACKAGE}]);if(!committed.success)return committed;
 const mat=material(pkg,id,"AK_SA_020");if(!mat||mat.success!==true)return mat;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaSecureBeforeOccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};save();
 return{success:true,occurrenceId:id,consequenceRefs:[id],stateDeltaRefs:[id],objectCustodyDeltaRefs:success?[id]:[],participantStateDeltaRefs:[],successorSituationRef:success?"academy_kakashi.debrief":"battle_transition"};
}
const secureBeforeRegistration=PROVIDER.registerStoryFactualResolverBinding(SECURE_BEFORE_BINDING,{ownerRef:"academy_kakashi.konoha_route_closure.secure_before",authorityVersionRefs:[AUTH.secureBefore,AUTH.writing100,AUTH.factualProvider],outcomes:[
 {outcomeRef:"SECURE_BEFORE_SUCCESS_CLEAN_EXTRACTION",authoredOrder:0,resultPayloadTemplate:{outcomeClass:"SECURE_BEFORE_SUCCESS_CLEAN_EXTRACTION",cleanExtractionSucceeded:true,battleRequired:false}},
 {outcomeRef:"SECURE_BEFORE_FAILURE_COLLAPSE_TO_2V1",authoredOrder:1,resultPayloadTemplate:{outcomeClass:"SECURE_BEFORE_FAILURE_COLLAPSE_TO_2V1",cleanExtractionSucceeded:false,battleRequired:true,battleConfigId:SECURE_2V1}}
],commitResult:commitSecureBefore,metadata:{storyUnitRef:ORIGIN,anchorRef:"AK_SA_020",failureReconvergesToSharedBattle:true}});
if(!secureBeforeRegistration.success)throw new Error("secure_before_binding_registration_failed");

function resolveSecureBeforeChoice(choice){
 const rt=active(),intent=observeIntent("secure_package_before_assassin",SECURE_BEFORE_BINDING);if(!intent||intent.success!==true)return intent;
 const occurrenceId=stable("occ_origin_kakashi_secure_before",{instance:String(rt.instanceId||""),receipt:intent.receipt.storyDecisionReceiptId});
 const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef:SECURE_BEFORE_BINDING,actorRef:KAKASHI,intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:stable("sc35910-secure-before",{instance:String(rt.instanceId||""),receipt:intent.receipt.storyDecisionReceiptId}),authorityVersionRefs:[AUTH.secureBefore,AUTH.writing100],inputStateRefs:[intent.contextStateRef],continuityLineageRef:String(rt.instanceId||""),committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:String(rt.instanceId||""),sceneId:SCENE,beatId:rt.beatId}});
 if(!factual||factual.success!==true)return factual||{success:false,reason:"secure_before_factual_resolution_failed"};
 const dispatched=dispatch(intent.receipt,SECURE_BEFORE_BINDING,{success:true,resolverResultRef:factual.receipt.storyFactualResolverReceiptId,consequenceRefs:factual.receipt.consequenceRefs||[],stateDeltaRefs:factual.receipt.stateDeltaRefs||[],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],successorSituationRef:factual.receipt.successorSituationRef,result:clone(factual.result)});if(!dispatched.success)return dispatched;
 const success=String(factual.receipt.selectedOutcomeRef||"")==="SECURE_BEFORE_SUCCESS_CLEAN_EXTRACTION";
 choice.nextBeatId=success?TERMINAL:D.secureBeforeIntro;save();
 return{success:true,selectedOutcomeRef:factual.receipt.selectedOutcomeRef,nextBeatId:choice.nextBeatId};
}
function ensureSecureBeforeSharedBattleIntent35910(){
 const rt=active(),stateRef=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaSecureBeforeOccurrenceId||"");
 if(!rt||!stateRef)return{success:false,reason:"secure_before_shared_battle_parent_missing"};
 const existingId=String(rt.localContext&&rt.localContext.kakashiObserveSecurePackageStoryDecisionReceiptId||"");
 if(existingId){const snap=CORE.getStoryUnitSnapshot(ORIGIN)||{},row=snap.decisionReceipts&&snap.decisionReceipts[existingId];if(row&&row.resolverBindingRef==="academy_kakashi.battle.secure_package")return{success:true,idempotent:true,receipt:row};}
 const opened=CORE.openSemanticChoiceSet({storyUnitRef:ORIGIN,storyUnitType:"origin",decisionPointRef:"AK_SA_020_FAILURE_RECONVERGENCE",contextStateRef:stateRef,sceneRef:SCENE,beatRef:D.secureBeforeBattle,sourceOccurrenceRefs:[stateRef],choices:[{choiceId:"secure_package",intentType:"secure_package",intentPayload:{reconvergedFrom:"secure_package_before_assassin_failure"},eligibilityBasisRefs:[stateRef],resolverBindingRef:"academy_kakashi.battle.secure_package",presentationLabel:"SECURE THE PACKAGE"}]});
 if(!opened||opened.success!==true)return opened||{success:false,reason:"secure_before_shared_battle_choice_set_failed"};
 const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN,choiceSetId:opened.choiceSet.choiceSetId,choiceId:"secure_package"});
 if(!committed||committed.success!==true)return committed||{success:false,reason:"secure_before_shared_battle_intent_failed"};
 rt.localContext={...(rt.localContext||{}),kakashiGetCloserHandoffOccurrenceId:stateRef,kakashiObserveSecurePackageStoryDecisionReceiptId:committed.receipt.storyDecisionReceiptId,kakashiObserveSecurePackageIntentCommitRef:committed.receipt.intentCommitRef,kakashiObserveSecurePackageReconvergedFromSecureBefore:true};save();
 return{success:true,receipt:committed.receipt};
}
function launchSecureBeforeBattle(ctx={}){
 const rt=active(),source=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaSecureBeforeOccurrenceId||"");if(!source)return{success:false,reason:"secure_before_resolver_occurrence_missing"};
 const intent=ensureSecureBeforeSharedBattleIntent35910();if(!intent||intent.success!==true)return intent;
 return launch(SECURE_2V1,"academy_kakashi.battle.secure_package","AK_SA_014",source,"kak_observe_secure_package_return","secure_before_shared_2v1",ctx);
}
function consumeSecureBeforeBattle(){
 const rt=active(),r=latestResult();if(!rt||rt.beatId!==D.secureBeforeReturn)return{success:false,reason:"secure_before_return_context_required"};
 if(!r||String(r.battleConfigId||"")!==SECURE_2V1||String(r.bindingRef||"")!==SECURE_BEFORE_BINDING)return{success:false,reason:"secure_before_battle_receipt_mismatch"};
 const win=String(r.resultState||"")==="player_side_victory";const id=stable("occ_origin_kakashi_secure_before_battle_return",{instance:String(rt.instanceId||""),battle:String(r.battleOccurrenceId||""),win});
 const pkg=win?{objectRef:PACKAGE,previousHolderClass:"PACKAGE_SMUGGLER",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",handoffCompleted:true}:{objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PS_ESCAPED_WITH_PACKAGE",handoffCompleted:true};
 const fact={factClass:win?"academy_kakashi_secure_before_shared_2v1_victory":"academy_kakashi_secure_before_shared_2v1_defeat",anchorRef:"AK_SA_025",authorityCommit:AUTH.secureBefore,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),packageState:pkg,
  participantStateByRef:win?{[PS]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[MI]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[AMT]:{presenceState:"ESCAPED"}}:{[PS]:{presenceState:"ESCAPED"},[MI]:{presenceState:"LEFT_IN_APPARENT_PURSUIT"},[AMT]:{presenceState:"ESCAPED"}},
  knowledgeStateByObserver:{[KAKASHI]:{laterPsMiOutcomeKnown:false}},worldFacts:{packageCustody:pkg.currentHolderClass,pakkunPresent:false,participantDeathCommitted:false,participantCustodyCommitted:false}};
 const committed=commitOnce(id,fact,win?"SECURE_BEFORE_2V1_VICTORY":"SECURE_BEFORE_2V1_DEFEAT",[ORIGIN,AMT,PS,MI],[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"writing_authority",id:AUTH.secureBefore}]);if(!committed.success)return committed;
 const mat=material(pkg,id,"AK_SA_025");if(!mat||mat.success!==true)return mat;
 if(win){
  for(const ref of [PS,MI]){const cl=classify(ref,"BATTLE_DEFEATED_UNRESOLVED",stable("sc35910-secure-before-defeated",{id,ref}));if(!cl.success)return cl;}
  rt.localContext={...(rt.localContext||{}),kakashiObserveSecurePackagePostBattleOutcome:"player_side_victory",kakashiObserveSecurePackagePostResolutionCommitted:true,kakashiObserveSecurePackageOccurrenceId:id,kakashiObserveSecurePackageContinuationStateRef:id,kakashiObserveSecurePackageContinuationReady:true,kakashiObserveSecurePackageDueAutonomyClear:true,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};
  setNext(D.secureBeforeReturn,"kak_observe_secure_package_return");
 }else{
  classify(PS,"ESCAPED",stable("sc35910-secure-before-ps-escaped",{id}));classify(MI,"LEFT_KAKASHI_SIGHT",stable("sc35910-secure-before-mi-left",{id}));classify(AMT,"ESCAPED",stable("sc35910-secure-before-amt-escaped",{id}));
  rt.localContext={...(rt.localContext||{}),kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};setNext(D.secureBeforeReturn,TERMINAL);
 }
 save();return{success:true,victory:win,occurrenceId:id,nextBeatId:win?"kak_observe_secure_package_return":TERMINAL};
}

// ---------------------------------------------------------------------------
// GO AFTER THE ORIGINAL TARGET
// ---------------------------------------------------------------------------
function commitOriginalTarget({receipt,request,result}){
 const rt=active();if(!rt||rt.sceneId!==SCENE)return{success:false,reason:"original_target_story_context_missing"};
 const selected=String(receipt&&receipt.selectedOutcomeRef||"");const reached=selected==="ORIGINAL_TARGET_PURSUIT_SUCCESS_REACHED",escaped=selected==="ORIGINAL_TARGET_PURSUIT_FAILURE_ESCAPED";if(!reached&&!escaped)return{success:false,reason:"original_target_outcome_unknown"};
 const id=String(request&&request.committedAtOccurrenceRef||stable("occ_origin_kakashi_original_target",{instance:String(rt.instanceId||""),receipt:String(receipt&&receipt.storyDecisionReceiptId||""),selected}));
 const pkg={objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PS_ESCAPED_WITH_PACKAGE",handoffCompleted:true};
 const fact={factClass:"academy_kakashi_original_target_pursuit_factual_state",anchorRef:"AK_SA_021",authorityCommit:AUTH.originalTarget,storySceneInstanceId:String(rt.instanceId||""),storyDecisionReceiptId:String(receipt&&receipt.storyDecisionReceiptId||""),storyFactualResolverReceiptId:String(receipt&&receipt.storyFactualResolverReceiptId||""),selectedOutcomeRef:selected,packageState:pkg,
  participantStateByRef:{[AMT]:{reachState:reached?"REACHED":"ESCAPED"},[PS]:{presenceState:"ESCAPED_WITH_PACKAGE"},[MI]:{laterState:"UNKNOWN_TO_KAKASHI"},[PAKKUN]:{presenceState:reached?"PRESENT":"NOT_PRESENT"}},
  knowledgeStateByObserver:{[KAKASHI]:{packageHolderKnown:"PACKAGE_SMUGGLER",laterPsMiOutcomeKnown:false}},worldFacts:{packageSmugglerPursuitClosed:true,amtReached:reached,amtEscaped:escaped,pakkunPresent:reached,packageCustody:"PACKAGE_SMUGGLER"}};
 const committed=commitOnce(id,fact,selected,[ORIGIN,AMT,PS].concat(reached?[PAKKUN]:[]),[{type:"story_decision_receipt",id:String(receipt&&receipt.storyDecisionReceiptId||"")},{type:"writing_authority",id:AUTH.originalTarget},{type:"world_object",id:PACKAGE}]);if(!committed.success)return committed;
 const mat=material(pkg,id,"AK_SA_021");if(!mat||mat.success!==true)return mat;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaOriginalTargetOccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id,kakashiKonohaPakkunPresent:reached,kakashiPostMiPakkunPresent:reached};save();
 return{success:true,occurrenceId:id,consequenceRefs:[id],stateDeltaRefs:[id],participantStateDeltaRefs:[],objectCustodyDeltaRefs:[],successorSituationRef:reached?"academy_kakashi.pakkun_intercept":"academy_kakashi.debrief"};
}
const originalRegistration=PROVIDER.registerStoryFactualResolverBinding(ORIGINAL_TARGET_BINDING,{ownerRef:"academy_kakashi.konoha_route_closure.original_target",authorityVersionRefs:[AUTH.originalTarget,AUTH.writing100,AUTH.factualProvider],outcomes:[
 {outcomeRef:"ORIGINAL_TARGET_PURSUIT_SUCCESS_REACHED",authoredOrder:0,resultPayloadTemplate:{outcomeClass:"ORIGINAL_TARGET_PURSUIT_SUCCESS_REACHED",amtReached:true,pakkunPresent:true,packageCustody:"PACKAGE_SMUGGLER"}},
 {outcomeRef:"ORIGINAL_TARGET_PURSUIT_FAILURE_ESCAPED",authoredOrder:1,resultPayloadTemplate:{outcomeClass:"ORIGINAL_TARGET_PURSUIT_FAILURE_ESCAPED",amtReached:false,pakkunPresent:false,packageCustody:"PACKAGE_SMUGGLER"}}
],commitResult:commitOriginalTarget,metadata:{storyUnitRef:ORIGIN,anchorRef:"AK_SA_021",packagePursuitClosedOnCommit:true}});
if(!originalRegistration.success)throw new Error("original_target_binding_registration_failed");

function resolveOriginalTargetChoice(choice){
 const rt=active(),intent=observeIntent("go_after_original_target",ORIGINAL_TARGET_BINDING);if(!intent||intent.success!==true)return intent;
 const occurrenceId=stable("occ_origin_kakashi_original_target",{instance:String(rt.instanceId||""),receipt:intent.receipt.storyDecisionReceiptId});
 const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef:ORIGINAL_TARGET_BINDING,actorRef:KAKASHI,intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:stable("sc35910-original-target",{instance:String(rt.instanceId||""),receipt:intent.receipt.storyDecisionReceiptId}),authorityVersionRefs:[AUTH.originalTarget,AUTH.writing100],inputStateRefs:[intent.contextStateRef],continuityLineageRef:String(rt.instanceId||""),committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:String(rt.instanceId||""),sceneId:SCENE,beatId:rt.beatId}});
 if(!factual||factual.success!==true)return factual||{success:false,reason:"original_target_factual_resolution_failed"};
 const dispatched=dispatch(intent.receipt,ORIGINAL_TARGET_BINDING,{success:true,resolverResultRef:factual.receipt.storyFactualResolverReceiptId,consequenceRefs:factual.receipt.consequenceRefs||[],stateDeltaRefs:factual.receipt.stateDeltaRefs||[],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],successorSituationRef:factual.receipt.successorSituationRef,result:clone(factual.result)});if(!dispatched.success)return dispatched;
 const reached=String(factual.receipt.selectedOutcomeRef||"")==="ORIGINAL_TARGET_PURSUIT_SUCCESS_REACHED";choice.nextBeatId=reached?D.originalIntro:TERMINAL;save();
 return{success:true,selectedOutcomeRef:factual.receipt.selectedOutcomeRef,nextBeatId:choice.nextBeatId};
}
function launchOriginalAmt(ctx={}){
 const rt=active(),source=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaOriginalTargetOccurrenceId||"");if(!source)return{success:false,reason:"original_target_pursuit_occurrence_missing"};
 return launch(AMT_PAKKUN,"academy_kakashi.battle.original_target_amt","AK_SA_021",source,D.originalReturn,"original_target_amt_pakkun",ctx);
}
function consumeOriginalAmt(){
 const rt=active(),r=latestResult();if(!rt||rt.beatId!==D.originalReturn)return{success:false,reason:"original_target_amt_return_context_required"};
 if(!r||String(r.battleConfigId||"")!==AMT_PAKKUN||String(r.bindingRef||"")!=="academy_kakashi.battle.original_target_amt")return{success:false,reason:"original_target_amt_battle_receipt_mismatch"};
 const win=String(r.resultState||"")==="player_side_victory";
 if(!win){
  const resolved=CLOSURE.resolveAmtDefeatFacts({battleResult:r,packageOccurrenceId:String(rt.localContext&&rt.localContext.kakashiKonohaPackageOccurrenceId||""),parentRef:String(rt.localContext&&rt.localContext.kakashiKonohaOriginalTargetOccurrenceId||""),routeRef:"observe_original_target",returnBeatId:D.originalReturn,successorSituationRef:TERMINAL});
  if(!resolved||resolved.success!==true)return resolved||{success:false,reason:"original_target_ce256_resolution_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiKonohaOriginalTargetAmtDefeatOccurrenceId:resolved.occurrenceId};setNext(D.originalReturn,TERMINAL);save();return{success:true,victory:false,occurrenceId:resolved.occurrenceId,nextBeatId:TERMINAL};
 }
 if(!defeatedUnresolved(r,[AMT]))return{success:false,reason:"original_target_amt_victory_participant_state_invalid"};
 const id=stable("occ_origin_kakashi_original_target_amt_victory",{instance:String(rt.instanceId||""),battle:String(r.battleOccurrenceId||"")});
 const parentPkg=factOf(occurrence(rt.localContext&&rt.localContext.kakashiKonohaPackageOccurrenceId)).packageState||{objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER"};
 const fact={factClass:"academy_kakashi_original_target_amt_battle_victory",anchorRef:"AK_SA_021",authorityCommit:AUTH.originalTarget,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),packageState:clone(parentPkg),
  participantStateByRef:{[AMT]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[PAKKUN]:{presenceState:"PRESENT",temporaryParticipationOnly:true,ownershipGranted:false}},
  worldFacts:{packageStillMissing:true,pakkunPresent:true,participantDeathCommitted:false,participantCustodyCommitted:false}};
 const committed=commitOnce(id,fact,"ORIGINAL_TARGET_AMT_BATTLE_VICTORY",[ORIGIN,AMT,PAKKUN],[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"writing_authority",id:AUTH.originalTarget}]);if(!committed.success)return committed;
 const cl=classify(AMT,"BATTLE_DEFEATED_UNRESOLVED",stable("sc35910-original-amt-defeated",{id}));if(!cl.success)return cl;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaOriginalTargetAmtVictoryOccurrenceId:id,kakashiKonohaPakkunPresent:true,kakashiPostMiPakkunPresent:true};setNext(D.originalReturn,D.originalDisposition);save();
 return{success:true,victory:true,occurrenceId:id,nextBeatId:D.originalDisposition};
}
function commitOriginalDisposition(kind){
 const rt=active(),parent=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaOriginalTargetAmtVictoryOccurrenceId||"");if(!rt||rt.beatId!==D.originalDisposition||!parent)return{success:false,reason:"original_target_disposition_context_required"};
 const map={KILL:"DEAD",RESTRAIN:"FIELD_SECURED_PENDING_COLLECTION",ANBU:"ANBU_INSTITUTIONAL_CUSTODY",POLICE:"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY"};const stateClass=map[kind];if(!stateClass)return{success:false,reason:"original_target_disposition_unknown"};
 const id=stable("occ_origin_kakashi_original_target_disposition",{instance:String(rt.instanceId||""),parent,kind});
 const pkg=factOf(occurrence(rt.localContext&&rt.localContext.kakashiKonohaPackageOccurrenceId)).packageState||{objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER"};
 const fact={factClass:"academy_kakashi_original_target_post_battle_disposition",anchorRef:"AK_SA_021",authorityCommit:kind==="RESTRAIN"?AUTH.fieldSecured:AUTH.originalTarget,storySceneInstanceId:String(rt.instanceId||""),parentOccurrenceRef:parent,selectedDisposition:kind,packageState:clone(pkg),
  participantStateByRef:{[AMT]:{stateClass,alive:kind!=="KILL",restraintMethod:kind==="RESTRAIN"?"WIRE_SNARE":null,securedAtLocationRef:kind==="RESTRAIN"?"KAKASHI_AMT_ALLEY":null}},
  worldFacts:{packageStillMissing:true,pakkunPresent:true,deterministicPostBattleKill:kind==="KILL",fieldSecured:kind==="RESTRAIN"}};
 const committed=commitOnce(id,fact,"ORIGINAL_TARGET_"+kind,[ORIGIN,AMT,PAKKUN],[{type:"origin_occurrence",id:parent},{type:"writing_authority",id:kind==="RESTRAIN"?AUTH.fieldSecured:AUTH.originalTarget}]);if(!committed.success)return committed;
 const cl=classify(AMT,stateClass,stable("sc35910-original-disposition",{id,stateClass}));if(!cl.success)return cl;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaOriginalTargetDispositionOccurrenceId:id};save();return{success:true,occurrenceId:id,nextBeatId:TERMINAL};
}

// ---------------------------------------------------------------------------
// MOVE IN CLOSER SUCCESS -> LET HANDOFF HAPPEN reconvergence.
// ---------------------------------------------------------------------------
function patchGetCloserHandoff(){
 const d=scene(),beat=d&&d.beatMap instanceof Map?d.beatMap.get("kak_get_closer_success"):null;if(!beat||!Array.isArray(beat.choices))return false;
 const choice=beat.choices.find(row=>row&&row.choiceId==="let_handoff_happen");if(!choice||!Array.isArray(choice.consequenceRequests)||!choice.consequenceRequests[0]||typeof choice.consequenceRequests[0].resolve!=="function")return false;
 if(choice.__konoha35910Wrapped===true)return true;
 const prior=choice.consequenceRequests[0].resolve;
 choice.consequenceRequests[0].resolve=function reconvergeGetCloserHandoff35910(){
  const out=prior.apply(this,arguments);if(!out||out.success!==true)return out;
  const rt=active(),occurrenceId=String(out.occurrenceId||rt&&rt.localContext&&rt.localContext.kakashiGetCloserHandoffOccurrenceId||"");if(!rt||!occurrenceId)return{success:false,reason:"get_closer_handoff_reconvergence_occurrence_missing"};
  rt.localContext={...(rt.localContext||{}),kakashiOriginalAction:"observe",kakashiObserveScene03AOccurrenceId:occurrenceId,kakashiObserveEscalationChoiceSetId:String(out.successorChoiceSetId||rt.localContext&&rt.localContext.kakashiObserveEscalationChoiceSetId||"")};
  choice.nextBeatId=OBSERVE_BEAT;save();
  return{...out,nextBeatId:OBSERVE_BEAT,reconvergedToObserveEscalation:true};
 };
 choice.nextBeatId=OBSERVE_BEAT;choice.__konoha35910Wrapped=true;return true;
}

// ---------------------------------------------------------------------------
// Beat/choice install.
// ---------------------------------------------------------------------------
function install(){
 const d=scene();if(!d||!(d.beatMap instanceof Map))return{success:false,reason:"kakashi_route_scene_missing"};
 const beats=[
  {beatId:D.directIntro,mode:"narration",environmentRef:SAKURA,objectiveText:"Stop the handoff.",text:"ANBU Marked Target reaches for the package. Package Smuggler shifts forward. Kakashi moves before either man can finish. The quiet handoff is over before it can happen.",nextBeatId:D.directBattle},
  {beatId:D.directBattle,mode:"battle_transition",environmentRef:SAKURA,text:"Kakashi faces ANBU Marked Target and Package Smuggler before the handoff can complete.",battle:{encounterId:DIRECT_2V1,launchResolver:launchDirect2v1,postBattleBeatId:D.directReturn,resultProjector:()=>latestResult(),actionLabel:"STRIKE BEFORE THE HANDOFF"}},
  {beatId:D.directReturn,mode:"narration",environmentRef:SAKURA,onEnterConsequences:[{requestId:"kakashi_direct_strike_2v1_return_35910",kind:"domain",resolve:consumeDirect2v1}],text:"The first fight returns to Story. Package custody and participant states resolve separately from Battle.",nextBeatId:D.directMiArrival},
  {beatId:D.directMiArrival,mode:"dialogue",environmentRef:SAKURA,objectiveText:"Protect the package.",speakerName:"MASKED INTERCEPTOR",text:"Not for what I came for.",nextBeatId:D.directMiBattle},
  {beatId:D.directMiBattle,mode:"battle_transition",environmentRef:SAKURA,text:"Masked Interceptor arrives specifically for the package now held by Kakashi.",battle:{encounterId:DIRECT_MI,launchResolver:launchDirectMi,postBattleBeatId:D.directMiReturn,resultProjector:()=>latestResult(),actionLabel:"PROTECT THE PACKAGE"}},
  {beatId:D.directMiReturn,mode:"narration",environmentRef:SAKURA,onEnterConsequences:[{requestId:"kakashi_direct_strike_mi_return_35910",kind:"domain",resolve:consumeDirectMi}],text:"The second fight returns to Story. The package and all three participant states remain separately committed.",nextBeatId:D.directGroup},
  {beatId:D.directGroup,mode:"choice",environmentRef:SAKURA,text:"All three shinobi are defeated. The package is secure. Kakashi decides what happens next.",choices:[
   {choiceId:"direct_group_police",label:"TAKE THEM TO THE UCHIHA POLICE FORCE",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"direct_group_police_35910",kind:"domain",resolve:()=>commitDirectGroupDisposition("POLICE")}]},
   {choiceId:"direct_group_anbu",label:"TAKE THEM TO THE ANBU",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"direct_group_anbu_35910",kind:"domain",resolve:()=>commitDirectGroupDisposition("ANBU")}]},
   {choiceId:"direct_group_kill",label:"KILL THEM",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"direct_group_kill_35910",kind:"domain",resolve:()=>commitDirectGroupDisposition("KILL")}]},
   {choiceId:"direct_group_release",label:"TAKE THE PACKAGE AND LET THEM GO",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"direct_group_release_35910",kind:"domain",resolve:()=>commitDirectGroupDisposition("RELEASE")}]}
  ]},
  {beatId:D.secureBeforeIntro,mode:"narration",environmentRef:SAKURA,objectiveText:"Retrieve the package.",text:"Kakashi is half a step late. There is no clean extraction anymore. The race collapses into the existing Package Smuggler + Masked Interceptor fight.",nextBeatId:D.secureBeforeBattle},
  {beatId:D.secureBeforeBattle,mode:"battle_transition",environmentRef:SAKURA,text:"Resolver failure reconverges into the shared PS + MI 2-v-1 without replaying branch setup.",battle:{encounterId:SECURE_2V1,launchResolver:launchSecureBeforeBattle,postBattleBeatId:"kak_observe_secure_package_return",resultProjector:()=>latestResult(),actionLabel:"SECURE THE PACKAGE"}},
  {beatId:D.originalIntro,mode:"narration",environmentRef:ALLEY,objectiveText:"Catch the original target.",text:"ANBU Marked Target rounds the next corner and stops. A small ninken is sitting in the street ahead of him. Kakashi lands behind.",nextBeatId:D.originalPakkun},
  {beatId:D.originalPakkun,mode:"dialogue",environmentRef:ALLEY,speakerName:"PAKKUN",text:"This yours?",nextBeatId:D.originalBattle},
  {beatId:D.originalBattle,mode:"battle_transition",environmentRef:ALLEY,text:"Kakashi and temporary Story-authorised Pakkun confront ANBU Marked Target. The package remains elsewhere.",battle:{encounterId:AMT_PAKKUN,launchResolver:launchOriginalAmt,postBattleBeatId:D.originalReturn,resultProjector:()=>latestResult(),actionLabel:"CONFRONT THE ORIGINAL TARGET"}},
  {beatId:D.originalReturn,mode:"narration",environmentRef:ALLEY,onEnterConsequences:[{requestId:"kakashi_original_target_amt_return_35910",kind:"domain",resolve:consumeOriginalAmt}],text:"The AMT confrontation returns to Story. Battle never grants package custody.",nextBeatId:D.originalDisposition},
  {beatId:D.originalDisposition,mode:"choice",environmentRef:ALLEY,text:"ANBU Marked Target is Battle-defeated. The package is still missing.",choices:[
   {choiceId:"original_kill",label:"KILL HIM",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"original_kill_35910",kind:"domain",resolve:()=>commitOriginalDisposition("KILL")}]},
   {choiceId:"original_restrain",label:"RESTRAIN HIM",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"original_restrain_35910",kind:"domain",resolve:()=>commitOriginalDisposition("RESTRAIN")}]},
   {choiceId:"original_anbu",label:"BRING HIM TO THE ANBU",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"original_anbu_35910",kind:"domain",resolve:()=>commitOriginalDisposition("ANBU")}]},
   {choiceId:"original_police",label:"TAKE HIM TO THE UCHIHA POLICE FORCE",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"original_police_35910",kind:"domain",resolve:()=>commitOriginalDisposition("POLICE")}]}
  ]}
 ];
 beats.forEach((b,i)=>{const n=normalized(b,35910+i);if(n)d.beatMap.set(n.beatId,n);});

 const action=d.beatMap.get(ACTION_BEAT),attack=action&&Array.isArray(action.choices)?action.choices.find(row=>row&&row.choiceId==="attack"):null;
 if(!attack)return{success:false,reason:"direct_strike_source_choice_missing"};
 attack.label="STRIKE BEFORE THE HANDOFF";attack.nextBeatId=D.directIntro;attack.availability=available(true);attack.knownBlocker=null;attack.consequenceRequests=[{requestId:"kakashi_direct_strike_entry_35910",kind:"domain",resolve:()=>resolveDirectStrikeEntry(attack)}];

 const observe=d.beatMap.get(OBSERVE_BEAT),secure=observe&&Array.isArray(observe.choices)?observe.choices.find(row=>row&&row.choiceId==="secure_package_before_assassin"):null,original=observe&&Array.isArray(observe.choices)?observe.choices.find(row=>row&&row.choiceId==="go_after_original_target"):null;
 if(!secure||!original)return{success:false,reason:"observe_route_choices_missing"};
 secure.label="SECURE THE PACKAGE BEFORE THE ASSASSIN";secure.nextBeatId=D.secureBeforeIntro;secure.availability=available(true);secure.knownBlocker=null;secure.consequenceRequests=[{requestId:"kakashi_secure_before_resolve_35910",kind:"domain",resolve:()=>resolveSecureBeforeChoice(secure)}];
 original.label="GO AFTER THE ORIGINAL TARGET";original.nextBeatId=D.originalIntro;original.availability=available(true);original.knownBlocker=null;original.consequenceRequests=[{requestId:"kakashi_original_target_resolve_35910",kind:"domain",resolve:()=>resolveOriginalTargetChoice(original)}];

 patchGetCloserHandoff();
 return{success:true,directStrike:true,secureBefore:true,originalTarget:true,getCloserHandoffReconvergence:true};
}
const installed=install();if(!installed||installed.success!==true)throw new Error("kakashi_konoha_route_closure_35910_install_failed:"+(installed&&installed.reason||"unknown"));

function diagnostics(){
 const d=scene(),action=d&&d.beatMap.get(ACTION_BEAT),attack=action&&action.choices&&action.choices.find(x=>x.choiceId==="attack"),observe=d&&d.beatMap.get(OBSERVE_BEAT),secure=observe&&observe.choices&&observe.choices.find(x=>x.choiceId==="secure_package_before_assassin"),original=observe&&observe.choices&&observe.choices.find(x=>x.choiceId==="go_after_original_target");
 const regs=PROVIDER.getRegisteredStoryFactualBindings();
 const checks={
  patchId:PATCH_ID==="alpha_kakashi_konoha_route_closure_35910_v3_2026_09_20",
  writing100Pinned:AUTH.writing100==="21e0407a0c371310ff06096905fd1fce4107ece8",
  directStrikeFixedChain:!!attack&&attack.label==="STRIKE BEFORE THE HANDOFF"&&attack.nextBeatId===D.directIntro&&d.beatMap.has(D.directBattle)&&d.beatMap.has(D.directMiBattle)&&d.beatMap.has(D.directGroup),
  directStrikeExactConfigs:!!(BATTLE.configs&&BATTLE.configs[DIRECT_2V1]&&BATTLE.configs[DIRECT_MI]),
  directGroupChoicesExact:JSON.stringify(d.beatMap.get(D.directGroup).choices.map(x=>x.label))===JSON.stringify(["TAKE THEM TO THE UCHIHA POLICE FORCE","TAKE THEM TO THE ANBU","KILL THEM","TAKE THE PACKAGE AND LET THEM GO"]),
  secureBeforeLive:!!secure&&secure.knownBlocker===null&&regs.some(x=>x.bindingRef===SECURE_BEFORE_BINDING),
  secureBeforeFailureUsesSharedBattleOwner:launchSecureBeforeBattle.toString().includes('"academy_kakashi.battle.secure_package"')&&launchSecureBeforeBattle.toString().includes('"kak_observe_secure_package_return"')&&ensureSecureBeforeSharedBattleIntent35910.toString().includes("AK_SA_020_FAILURE_RECONVERGENCE"),
  originalTargetLive:!!original&&original.knownBlocker===null&&regs.some(x=>x.bindingRef===ORIGINAL_TARGET_BINDING),
  originalDispositionExact:JSON.stringify(d.beatMap.get(D.originalDisposition).choices.map(x=>x.label))===JSON.stringify(["KILL HIM","RESTRAIN HIM","BRING HIM TO THE ANBU","TAKE HIM TO THE UCHIHA POLICE FORCE"]),
  ce256SharedOwnerUsed:consumeOriginalAmt.toString().includes("CLOSURE.resolveAmtDefeatFacts"),
  getCloserHandoffReconvergence:patchGetCloserHandoff()===true,
  battleDoesNotOwnDisposition:consumeDirectMi.toString().includes("participantDeathCommitted:false")&&consumeDirectMi.toString().includes("participantCustodyCommitted:false"),
  battleLaunchContractExact:launch.toString().includes('type:"story_scene"')&&launch.toString().includes("pakkunAuthorized")&&launch.toString().includes("cfg.pakkun===true"),
  directPhysicalChainReusable:beginReusedDirectStrikePhysical35910.toString().includes("bindingRef")&&launchDirect2v1.toString().includes("directChainBinding")&&consumeDirect2v1.toString().includes("directChainBinding"),
  browserGoldenClaimed:false
 };
 const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
 return{pass:failed.length===0,checks,failed,beats:D,browserGoldenClaimed:false};
}

globalThis.SC_ALPHA_KAKASHI_KONOHA_ROUTE_CLOSURE_35910=Object.freeze({
 patchId:PATCH_ID,authority:AUTH,beats:D,
 resolveDirectStrikeEntry,beginReusedDirectStrikePhysical:beginReusedDirectStrikePhysical35910,consumeDirect2v1,consumeDirectMi,commitDirectGroupDisposition,
 resolveSecureBeforeChoice,consumeSecureBeforeBattle,resolveOriginalTargetChoice,consumeOriginalAmt,commitOriginalDisposition,
 beginSharedObserveBattleChoice:beginSharedObserveBattleChoice35910,patchGetCloserHandoff,diagnostics,browserGoldenClaimed:false
});
globalThis.runAcademyKakashiKonohaRouteClosure35910Diagnostics=diagnostics;
})();