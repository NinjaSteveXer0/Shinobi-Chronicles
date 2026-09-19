// ============================================================================
// ACADEMY KAKASHI — MOVE IN CLOSER DOWNSTREAM CLOSURE — 35930
//
// Completes the Writing-closed downstream choices left blocked by 34120:
// SUCCESS -> STRIKE BEFORE THE HANDOFF
// SUCCESS -> ATTEMPT THE PICKPOCKET
// FAILURE -> STOP PACKAGE SMUGGLER
// FAILURE -> CUT THEM OFF AT THE SAKURA TREE
//
// STAY ON THE PACKAGE remains owned by 34120/35300.
// ============================================================================
(function installAcademyKakashiMoveCloserClosure35930(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_MOVE_CLOSER_CLOSURE_35930)return;
const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
const BATTLE=globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300;
const ROUTE=globalThis.SC_ALPHA_KAKASHI_KONOHA_ROUTE_CLOSURE_35910;
const FIELD=globalThis.SC_ALPHA_KAKASHI_FIELD_SECURED_35920;
if(!A||!CORE||!KAK||!PROVIDER||!BATTLE||!ROUTE||!FIELD)throw new Error("kakashi_move_closer_35930_dependencies_missing");

const PATCH_ID="alpha_kakashi_move_closer_closure_35930_v2_2026_09_20";
const ORIGIN="academy_kakashi",SCENE="origin_academy_kakashi_anbu_retrieval";
const KAKASHI="academy_kakashi",AMT="academy_kakashi_origin_amt",PS="academy_kakashi_origin_package_smuggler",MI="academy_kakashi_origin_masked_interceptor",PAKKUN="pakkun_origin_unfamiliar_ninken";
const PACKAGE="kakashi_origin_outer_route_packet";
const SUCCESS_BEAT="kak_get_closer_success",FAILURE_BEAT="kak_get_closer_failure",TERMINAL="kak_seq_debrief_pending";
const BIND=Object.freeze({
 strike:"academy_kakashi.resolver.strike_before_handoff",
 improved:"academy_kakashi.resolver.pickpocket_improved",
 stopPs:"academy_kakashi.battle.stop_package_smuggler",
 cutOff:"academy_kakashi.battle.cut_off_sakura"
});
const CONFIG=Object.freeze({
 two:"academy_kakashi_origin_battle_amt_ps_2v1",
 ps:"academy_kakashi_origin_battle_ps_1v1"
});
const AUTH=Object.freeze({
 moveCloser:"874900f9aa7a8cad3dd48e404c5a9e1cfe7d74fb",
 writing100:"21e0407a0c371310ff06096905fd1fce4107ece8",
 twoTarget:"7efacbb01328a91e5fe4cebb051e48d884ab52fd",
 psDisposition:"ea3752e0023b8c5cbd838a749f40353af8157184",
 field:"77d351e6f8d4eefaea0f8a6db82dec686391e1c0"
});
const E=Object.freeze({
 improvedIntro:"kak_move_closer_improved_pickpocket_intro_35930",
 improvedBattle:"kak_move_closer_improved_pickpocket_battle_35930",
 improvedReturn:"kak_move_closer_improved_pickpocket_return_35930",
 improvedGroup:"kak_move_closer_improved_pickpocket_group_35930",
 psIntro:"kak_move_closer_failure_ps_intro_35930",
 psBattle:"kak_move_closer_failure_ps_battle_35930",
 psReturn:"kak_move_closer_failure_ps_return_35930",
 psDisposition:"kak_move_closer_failure_ps_disposition_35930",
 cutIntro:"kak_move_closer_failure_cutoff_intro_35930",
 cutBattle:"kak_move_closer_failure_cutoff_battle_35930",
 cutReturn:"kak_move_closer_failure_cutoff_return_35930",
 cutGroup:"kak_move_closer_failure_cutoff_group_35930"
});
const SAKURA={assetId:"kakashi_origin_sakura_tree_night"};
const PS_ALT={assetId:"kakashi_origin_ps_battle_alt_night"};

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE):null;}catch(_e){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_e){}}
function occurrence(id){try{return id?A.findOccurrence(String(id)):null;}catch(_e){return null;}}
function factOf(row){return row&&(row.fact||row.data)||{};}
function stable(prefix,payload){return PROVIDER.stableRef(prefix,payload);}
function clone(v){return CORE.clone(v);}
function normalized(def,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(def,index):def;}
function available(v=true,knownBlocker=null){return()=>({available:v===true,knownBlocker:v===true?null:knownBlocker});}
function latestResult(){const rt=active(),resume=rt&&rt.battleResume&&typeof rt.battleResume==="object"?rt.battleResume:null;for(const row of resume?[resume.authored,resume.projected,resume.result,resume.battleResult]:[])if(row&&row.battleConfigId&&row.bindingRef)return row;try{const row=typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult():null;if(row&&row.battleConfigId)return row;}catch(_e){}return null;}
function parent(rt=active(),expected=null){
 const id=String(rt&&rt.localContext&&rt.localContext.kakashiGetCloserOccurrenceId||"");const row=occurrence(id),f=factOf(row);
 if(!rt||rt.sceneId!==SCENE||!id||!row)return{success:false,reason:"move_closer_parent_missing"};
 if(expected&&String(f.selectedOutcomeRef||"")!==expected)return{success:false,reason:"move_closer_parent_outcome_mismatch",expected,actual:String(f.selectedOutcomeRef||"")};
 return{success:true,id,row,fact:f};
}
function existingReceipt(contextStateRef,choiceId,bindingRef){
 const s=CORE.getStoryUnitSnapshot(ORIGIN)||{};
 return Object.values(s.decisionReceipts||{}).find(x=>x&&x.storyDecisionContextId===contextStateRef&&x.selectedChoiceId===choiceId&&x.resolverBindingRef===bindingRef)||null;
}
function ensureIntent(decisionPointRef,choiceId,bindingRef,parentId,beatRef){
 const old=existingReceipt(parentId,choiceId,bindingRef);if(old)return{success:true,idempotent:true,receipt:old};
 const rt=active(),known=String(rt&&rt.localContext&&rt.localContext.kakashiGetCloserSuccessorChoiceSetId||"");
 let setId=known;
 if(!setId){const opened=KAK.openDecisionPoint(decisionPointRef,{committedStateRef:parentId,beatRef,sourceOccurrenceRefs:[parentId]});if(!opened||opened.success!==true)return opened||{success:false,reason:"move_closer_choice_set_open_failed"};setId=opened.choiceSet.choiceSetId;}
 const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN,choiceSetId:setId,choiceId});return committed&&committed.success===true?{success:true,receipt:committed.receipt,choiceSetId:setId}:committed||{success:false,reason:"move_closer_intent_commit_failed"};
}
function commitOnce(id,fact,outcome,participants=[],sourceRefs=[]){
 const old=occurrence(id);if(old)return{success:true,idempotent:true,occurrenceId:id,record:old};
 const out=A.commitOccurrence(ORIGIN,id,fact,[],{type:"origin_story_factual_occurrence",outcome,participantRefs:participants,sourceRefs});
 return out&&out.success===true?{success:true,occurrenceId:id,record:out.record}:out||{success:false,reason:"move_closer_occurrence_commit_failed"};
}
function material(pkg,stateRef,anchor){
 return CORE.recordMaterialState({storyUnitRef:ORIGIN,materialRef:PACKAGE,resolved:true,stateRef,value:{custodyClass:String(pkg.currentHolderClass||pkg.custodyClass||""),custodianRef:pkg.custodianRef||null,locationClass:pkg.locationClass||null,sourceAnchorRef:anchor}});
}
function classify(ref,state,resultRef){return CORE.recordParticipantClassification({storyUnitRef:ORIGIN,participantRef:ref,stateClass:state,resultRef});}
function bridge(resultRef,result,successor=null,consequenceRefs=[]){return{success:true,resolverResultRef:String(resultRef),consequenceRefs:[...new Set([resultRef,...consequenceRefs].filter(Boolean).map(String))],stateDeltaRefs:[],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],successorSituationRef:successor,result:clone(result)};}
function dispatch(receipt,binding,result){return CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN,receiptId:receipt.storyDecisionReceiptId,state:{resolverResults:{[binding]:result}},context:{sceneRef:SCENE,originId:ORIGIN,storySceneInstanceId:String(active()&&active().instanceId||""),selectedChoiceId:receipt.selectedChoiceId}});}
function launch(config,binding,anchor,source,returnBeat,ctx={}){
 const cfg=BATTLE.configs&&BATTLE.configs[config]||null,rt=active();
 const supplied=ctx&&ctx.returnContext&&typeof ctx.returnContext==="object"?ctx.returnContext:null;
 const rc={...(supplied||{}),type:"story_scene",sceneId:SCENE,sceneInstanceId:String(rt&&rt.instanceId||""),postBattleBeatId:returnBeat};
 return BATTLE.launchAcademyKakashiOriginPlBattle({storyOccurrenceId:String(source||rt&&rt.instanceId||""),sourceAnchorRef:anchor,bindingRef:binding,battleConfigId:config,returnToken:String(rt&&rt.instanceId||"")+":"+binding,returnContext:rc,pakkunAuthorized:!!(cfg&&cfg.pakkun===true)});
}
function participant(r,ref){return Array.isArray(r&&r.participants)?r.participants.find(x=>x&&x.participantRef===ref)||null:null;}
function defeated(r,refs){return refs.every(ref=>{const x=participant(r,ref);return !!x&&x.battleStatus==="defeated"&&x.lifeState==="unresolved"&&x.custodyState==="unresolved";});}
function explicitPakkunDeparture(parentId,routeRef){
 const rt=active(),id=stable("occ_origin_kakashi_move_closer_pakkun_departure",{instance:String(rt&&rt.instanceId||""),parentId,routeRef});
 const fact={factClass:"academy_kakashi_pakkun_explicit_departure",authorityCommit:AUTH.moveCloser,storySceneInstanceId:String(rt&&rt.instanceId||""),participantRef:PAKKUN,parentOccurrenceRef:parentId,routeRef,participantState:{presenceState:"DEPARTED",ownershipGranted:false,nameKnowledgeGranted:false}};
 const out=commitOnce(id,fact,"PAKKUN_DEPARTED",[ORIGIN,PAKKUN],[{type:"origin_occurrence",id:parentId}]);if(!out.success)return out;
 const cl=classify(PAKKUN,"DEPARTED",id);if(!cl.success)return cl;rt.localContext={...(rt.localContext||{}),kakashiKonohaPakkunPresent:false,kakashiPostMiPakkunPresent:false};save();return{success:true,occurrenceId:id};
}

// SUCCESS -> STRIKE: semantic intent is new, physical chain is reused.
function resolveSuccessStrike(choice){
 const rt=active(),p=parent(rt,"GET_CLOSER_SUCCESS");if(!p.success||rt.beatId!==SUCCESS_BEAT)return p.success?{success:false,reason:"move_closer_success_strike_context_required"}:p;
 const intent=ensureIntent("AK_SA_005","strike_before_handoff",BIND.strike,p.id,SUCCESS_BEAT);if(!intent.success)return intent;
 const begun=ROUTE.beginReusedDirectStrikePhysical({receipt:intent.receipt,bindingRef:BIND.strike,parentOccurrenceId:p.id,routeRef:"move_closer_success_strike",anchorRef:"AK_SA_029",authorityCommit:AUTH.moveCloser,knowledgeStateRef:p.id});
 if(!begun||begun.success!==true)return begun||{success:false,reason:"move_closer_reused_strike_begin_failed"};
 choice.nextBeatId=ROUTE.beats.directIntro;rt.localContext={...(rt.localContext||{}),kakashiMoveCloserStrikeReceiptId:intent.receipt.storyDecisionReceiptId,kakashiMoveCloserKnowledgeStateRef:p.id};save();return{success:true,nextBeatId:choice.nextBeatId,occurrenceId:begun.occurrenceId};
}

// SUCCESS -> improved Pickpocket.
function resolveImprovedPickpocket(choice){
 const rt=active(),p=parent(rt,"GET_CLOSER_SUCCESS");if(!p.success||rt.beatId!==SUCCESS_BEAT)return p.success?{success:false,reason:"move_closer_improved_pickpocket_context_required"}:p;
 const intent=ensureIntent("AK_SA_005","attempt_pickpocket",BIND.improved,p.id,SUCCESS_BEAT);if(!intent.success)return intent;
 const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef:BIND.improved,actorRef:KAKASHI,intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:stable("sc35930-improved-pickpocket",{instance:String(rt.instanceId||""),receipt:intent.receipt.storyDecisionReceiptId}),authorityVersionRefs:[AUTH.moveCloser,AUTH.writing100],inputStateRefs:[p.id],continuityLineageRef:String(rt.instanceId||""),context:{storySceneInstanceId:String(rt.instanceId||""),sceneId:SCENE,beatId:rt.beatId,parentOccurrenceRef:p.id}});
 if(!factual||factual.success!==true)return factual||{success:false,reason:"move_closer_improved_pickpocket_resolution_failed"};
 const selected=String(factual.receipt&&factual.receipt.selectedOutcomeRef||""),success=selected==="PICKPOCKET_IMPROVED_SUCCESS_CLEAN_EXTRACTION",failure=selected==="PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1";if(!success&&!failure)return{success:false,reason:"move_closer_improved_pickpocket_unknown_outcome"};
 const id=stable("occ_origin_kakashi_improved_pickpocket",{instance:String(rt.instanceId||""),receipt:intent.receipt.storyDecisionReceiptId,selected});
 const pkg=success?{objectRef:PACKAGE,previousHolderClass:"ANBU_MARKED_TARGET",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",handoffCompleted:false}:{objectRef:PACKAGE,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_PERSON",handoffCompleted:false};
 const fact={factClass:"academy_kakashi_improved_pickpocket_factual_state",anchorRef:"AK_SA_030",authorityCommit:AUTH.moveCloser,storySceneInstanceId:String(rt.instanceId||""),parentOccurrenceRef:p.id,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,storyFactualResolverReceiptId:String(factual.receipt&&factual.receipt.storyFactualResolverReceiptId||""),selectedOutcomeRef:selected,knowledgeStateRef:p.id,packageState:pkg,
  participantStateByRef:{[AMT]:{presenceState:"PRESENT"},[PS]:{presenceState:"PRESENT"},[MI]:{presenceState:"UNSEEN"},[PAKKUN]:{presenceState:"NOT_PRESENT"}},knowledgeStateByObserver:{[KAKASHI]:{getCloserSuccessKnowledgeRetained:true}},worldFacts:{cleanExtractionSucceeded:success,battleRequired:failure,maskedInterceptorVisible:false,pakkunPresent:false,retainsGetCloserKnowledge:true}};
 const committed=commitOnce(id,fact,selected,[ORIGIN,AMT,PS],[{type:"origin_occurrence",id:p.id},{type:"story_decision_receipt",id:intent.receipt.storyDecisionReceiptId},{type:"writing_authority",id:AUTH.moveCloser}]);if(!committed.success)return committed;
 const mat=material(pkg,id,"AK_SA_030");if(!mat.success)return mat;
 const dispatched=dispatch(intent.receipt,BIND.improved,{success:true,resolverResultRef:String(factual.receipt&&factual.receipt.storyFactualResolverReceiptId||id),consequenceRefs:[id],stateDeltaRefs:[id],knowledgeDeltaRefs:[p.id],relationshipHistoryRefs:[],objectiveDeltaRefs:[],successorSituationRef:success?"academy_kakashi.debrief":"battle_transition",result:clone(factual.result)});if(!dispatched.success)return dispatched;
 rt.localContext={...(rt.localContext||{}),kakashiMoveCloserImprovedOccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id,kakashiMoveCloserKnowledgeStateRef:p.id};choice.nextBeatId=success?TERMINAL:E.improvedIntro;save();
 return{success:true,selectedOutcomeRef:selected,occurrenceId:id,nextBeatId:choice.nextBeatId};
}
function launchImprovedBattle(ctx={}){const rt=active(),source=String(rt&&rt.localContext&&rt.localContext.kakashiMoveCloserImprovedOccurrenceId||"");if(!source)return{success:false,reason:"improved_pickpocket_parent_missing"};return launch(CONFIG.two,"academy_kakashi.battle.pickpocket_improved_failure","AK_SA_030",source,E.improvedReturn,ctx);}
function consumeImprovedBattle(){
 const rt=active(),r=latestResult();if(!rt||rt.beatId!==E.improvedReturn)return{success:false,reason:"improved_pickpocket_return_context_required"};
 if(!r||String(r.battleConfigId||"")!==CONFIG.two||String(r.bindingRef||"")!=="academy_kakashi.battle.pickpocket_improved_failure")return{success:false,reason:"improved_pickpocket_battle_receipt_mismatch"};
 const win=String(r.resultState||"")==="player_side_victory",id=stable("occ_origin_kakashi_improved_pickpocket_battle",{instance:String(rt.instanceId||""),battle:String(r.battleOccurrenceId||""),win});
 const pkg=win?{objectRef:PACKAGE,previousHolderClass:"ANBU_MARKED_TARGET",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON"}:{objectRef:PACKAGE,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_ESCAPED_WITH_PACKAGE"};
 const fact={factClass:win?"academy_kakashi_improved_pickpocket_battle_victory":"academy_kakashi_improved_pickpocket_battle_defeat",anchorRef:"AK_SA_030",authorityCommit:AUTH.moveCloser,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(r.battleOccurrenceId||""),knowledgeStateRef:String(rt.localContext&&rt.localContext.kakashiMoveCloserKnowledgeStateRef||""),packageState:pkg,
  participantStateByRef:win?{[AMT]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[PS]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[MI]:{presenceState:"UNSEEN"}}:{[AMT]:{presenceState:"ESCAPED_WITH_PACKAGE"},[PS]:{presenceState:"ESCAPED"},[MI]:{presenceState:"UNSEEN"}},
  worldFacts:{retainsGetCloserKnowledge:true,maskedInterceptorVisible:false,pakkunPresent:false,participantDeathCommitted:false,participantCustodyCommitted:false}};
 const committed=commitOnce(id,fact,win?"IMPROVED_PICKPOCKET_2V1_VICTORY":"IMPROVED_PICKPOCKET_2V1_DEFEAT",[ORIGIN,AMT,PS],[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"writing_authority",id:AUTH.moveCloser}]);if(!committed.success)return committed;
 const mat=material(pkg,id,"AK_SA_030");if(!mat.success)return mat;
 for(const ref of [AMT,PS]){const cl=classify(ref,win?"BATTLE_DEFEATED_UNRESOLVED":"ESCAPED",stable("sc35930-improved-participant",{id,ref,win}));if(!cl.success)return cl;}
 rt.localContext={...(rt.localContext||{}),kakashiMoveCloserTwoTargetOccurrenceId:id,kakashiMoveCloserTwoTargetPakkunPresent:false,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};const b=scene().beatMap.get(E.improvedReturn);if(b)b.nextBeatId=win?E.improvedGroup:TERMINAL;save();
 return{success:true,victory:win,occurrenceId:id,nextBeatId:win?E.improvedGroup:TERMINAL};
}

// FAILURE -> STOP PACKAGE SMUGGLER.
function beginFailureBattle(choice,kind){
 const rt=active(),p=parent(rt,"GET_CLOSER_FAILURE");if(!p.success||rt.beatId!==FAILURE_BEAT)return p.success?{success:false,reason:"move_closer_failure_choice_context_required"}:p;
 const isPs=kind==="stop_ps",choiceId=isPs?"stop_package_smuggler":"cut_off_sakura",binding=isPs?BIND.stopPs:BIND.cutOff;
 const intent=ensureIntent("AK_SA_006",choiceId,binding,p.id,FAILURE_BEAT);if(!intent.success)return intent;
 const id=stable("occ_origin_kakashi_move_closer_failure_battle_entry",{instance:String(rt.instanceId||""),parent:p.id,kind,receipt:intent.receipt.storyDecisionReceiptId});
 const pkg={objectRef:PACKAGE,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_PERSON",handoffCompleted:false};
 const pakkun=!isPs;
 const fact={factClass:isPs?"academy_kakashi_move_closer_failure_stop_ps_entry":"academy_kakashi_move_closer_failure_cutoff_entry",anchorRef:isPs?"AK_SA_016":"AK_SA_017",authorityCommit:AUTH.moveCloser,storySceneInstanceId:String(rt.instanceId||""),parentOccurrenceRef:p.id,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,packageState:pkg,
  participantStateByRef:{[AMT]:{presenceState:"PRESENT",packageHolder:true},[PS]:{presenceState:"PRESENT"},[MI]:{presenceState:"UNSEEN"},[PAKKUN]:{presenceState:pakkun?"PRESENT":"NOT_PRESENT",temporaryParticipationOnly:pakkun,ownershipGranted:false,nameKnowledgeGranted:false}},
  knowledgeStateByObserver:{[KAKASHI]:{getCloserOutcome:"FAILURE",fullContingencyConversationKnown:false}},worldFacts:{maskedInterceptorVisible:false,pakkunPresent:pakkun,pakkunBattleActionAuthorized:false,battleRequired:true,battleConfigId:isPs?CONFIG.ps:CONFIG.two}};
 const committed=commitOnce(id,fact,isPs?"MOVE_CLOSER_FAILURE_STOP_PS":"MOVE_CLOSER_FAILURE_CUT_OFF",[ORIGIN,AMT,PS].concat(pakkun?[PAKKUN]:[]),[{type:"origin_occurrence",id:p.id},{type:"story_decision_receipt",id:intent.receipt.storyDecisionReceiptId},{type:"writing_authority",id:AUTH.moveCloser}]);if(!committed.success)return committed;
 const mat=material(pkg,id,isPs?"AK_SA_016":"AK_SA_017");if(!mat.success)return mat;
 rt.localContext={...(rt.localContext||{}),kakashiMoveCloserFailureEntryOccurrenceId:id,kakashiMoveCloserFailureReceiptId:intent.receipt.storyDecisionReceiptId,kakashiMoveCloserFailureBindingRef:binding,kakashiMoveCloserFailureKind:kind,kakashiMoveCloserFailurePakkunPresent:pakkun,kakashiKonohaPakkunPresent:pakkun,kakashiKonohaPackageOccurrenceId:id};choice.nextBeatId=isPs?E.psIntro:E.cutIntro;save();
 return{success:true,occurrenceId:id,nextBeatId:choice.nextBeatId};
}
function launchFailurePs(ctx={}){const rt=active(),source=String(rt&&rt.localContext&&rt.localContext.kakashiMoveCloserFailureEntryOccurrenceId||"");return source?launch(CONFIG.ps,BIND.stopPs,"AK_SA_016",source,E.psReturn,ctx):{success:false,reason:"move_closer_stop_ps_entry_missing"};}
function launchFailureCut(ctx={}){const rt=active(),source=String(rt&&rt.localContext&&rt.localContext.kakashiMoveCloserFailureEntryOccurrenceId||"");return source?launch(CONFIG.two,BIND.cutOff,"AK_SA_017",source,E.cutReturn,ctx):{success:false,reason:"move_closer_cutoff_entry_missing"};}
function consumeFailureBattle(kind){
 const rt=active(),isPs=kind==="stop_ps",returnBeat=isPs?E.psReturn:E.cutReturn,binding=isPs?BIND.stopPs:BIND.cutOff,config=isPs?CONFIG.ps:CONFIG.two;
 const r=latestResult();if(!rt||rt.beatId!==returnBeat)return{success:false,reason:"move_closer_failure_return_context_required"};
 if(!r||String(r.battleConfigId||"")!==config||String(r.bindingRef||"")!==binding)return{success:false,reason:"move_closer_failure_battle_receipt_mismatch"};
 const receiptId=String(rt.localContext&&rt.localContext.kakashiMoveCloserFailureReceiptId||""),s=CORE.getStoryUnitSnapshot(ORIGIN)||{},receipt=s.decisionReceipts&&s.decisionReceipts[receiptId];if(!receipt)return{success:false,reason:"move_closer_failure_receipt_missing"};
 const win=String(r.resultState||"")==="player_side_victory";if(win&&!defeated(r,isPs?[PS]:[AMT,PS]))return{success:false,reason:"move_closer_failure_victory_participant_state_invalid"};
 const id=stable("occ_origin_kakashi_move_closer_failure_battle_return",{instance:String(rt.instanceId||""),kind,battle:String(r.battleOccurrenceId||""),win});
 let pkg,states;
 if(isPs){
  pkg={objectRef:PACKAGE,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_ESCAPED_WITH_PACKAGE"};
  states=win?{[AMT]:{presenceState:"ESCAPED_WITH_PACKAGE"},[PS]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[MI]:{presenceState:"UNSEEN"}}:{[AMT]:{presenceState:"ESCAPED_WITH_PACKAGE"},[PS]:{presenceState:"ESCAPED"},[MI]:{presenceState:"UNSEEN"}};
 }else{
  pkg=win?{objectRef:PACKAGE,previousHolderClass:"ANBU_MARKED_TARGET",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON"}:{objectRef:PACKAGE,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_ESCAPED_WITH_PACKAGE"};
  states=win?{[AMT]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[PS]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[MI]:{presenceState:"UNSEEN"},[PAKKUN]:{presenceState:"PRESENT",temporaryParticipationOnly:true}}:{[AMT]:{presenceState:"ESCAPED_WITH_PACKAGE"},[PS]:{presenceState:"ESCAPED"},[MI]:{presenceState:"UNSEEN"},[PAKKUN]:{presenceState:"PRESENT",temporaryParticipationOnly:true}};
 }
 const fact={factClass:"academy_kakashi_move_closer_failure_battle_return",anchorRef:isPs?"AK_SA_016":"AK_SA_017",authorityCommit:AUTH.moveCloser,storySceneInstanceId:String(rt.instanceId||""),routeKind:kind,battleOccurrenceId:String(r.battleOccurrenceId||""),battleResultState:String(r.resultState||""),packageState:pkg,participantStateByRef:states,
  worldFacts:{maskedInterceptorVisible:false,pakkunPresent:!isPs,pakkunBattleActionAuthorized:false,participantDeathCommitted:false,participantCustodyCommitted:false}};
 const committed=commitOnce(id,fact,win?"MOVE_CLOSER_FAILURE_BATTLE_VICTORY":"MOVE_CLOSER_FAILURE_BATTLE_DEFEAT",[ORIGIN,AMT,PS].concat(isPs?[]:[PAKKUN]),[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"writing_authority",id:AUTH.moveCloser}]);if(!committed.success)return committed;
 const mat=material(pkg,id,isPs?"AK_SA_016":"AK_SA_017");if(!mat.success)return mat;
 if(isPs){
  classify(AMT,"ESCAPED",stable("sc35930-stopps-amt",{id}));
  classify(PS,win?"BATTLE_DEFEATED_UNRESOLVED":"ESCAPED",stable("sc35930-stopps-ps",{id,win}));
 }else for(const ref of [AMT,PS]){const cl=classify(ref,win?"BATTLE_DEFEATED_UNRESOLVED":"ESCAPED",stable("sc35930-cutoff-participant",{id,ref,win}));if(!cl.success)return cl;}
 const dispatched=dispatch(receipt,binding,bridge(id,{outcomeClass:win?"BATTLE_VICTORY":"BATTLE_DEFEAT",routeKind:kind,packageState:pkg,pakkunPresent:!isPs},win?"academy_kakashi.post_battle_disposition":"academy_kakashi.debrief"));if(!dispatched.success)return dispatched;
 rt.localContext={...(rt.localContext||{}),kakashiMoveCloserFailureBattleOccurrenceId:id,kakashiKonohaPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id};
 let next;
 if(win)next=isPs?E.psDisposition:E.cutGroup;else{next=TERMINAL;if(!isPs){const dep=explicitPakkunDeparture(id,"move_closer_failure_cutoff_loss");if(!dep.success)return dep;}}
 const b=scene().beatMap.get(returnBeat);if(b)b.nextBeatId=next;save();return{success:true,victory:win,occurrenceId:id,nextBeatId:next};
}
function consumeFailurePs(){return consumeFailureBattle("stop_ps");}
function consumeFailureCut(){return consumeFailureBattle("cut_off");}

function commitPsDisposition(kind){
 const rt=active(),parentId=String(rt&&rt.localContext&&rt.localContext.kakashiMoveCloserFailureBattleOccurrenceId||"");if(!rt||rt.beatId!==E.psDisposition||!parentId)return{success:false,reason:"move_closer_ps_disposition_context_required"};
 let out;
 if(kind==="RESTRAIN")out=FIELD.commitFieldSecured(PS,{sourceOccurrenceId:parentId,locationRef:"KAKASHI_PS_ALT_NIGHT_STREET",routeRef:"move_closer_failure_stop_ps"});
 else if(kind==="ANBU"||kind==="POLICE")out=FIELD.commitSingleInstitutionalTransfer(PS,kind==="ANBU"?"ANBU":"UCHIHA_POLICE",{sourceOccurrenceId:parentId});
 else if(kind==="KILL"){
  const id=stable("occ_origin_kakashi_move_closer_ps_kill",{instance:String(rt.instanceId||""),parentId});
  const fact={factClass:"academy_kakashi_package_missing_ps_deterministic_kill",authorityCommit:AUTH.psDisposition,storySceneInstanceId:String(rt.instanceId||""),parentOccurrenceRef:parentId,targetRef:PS,targetDeathConfirmed:true,semanticClass:"KILL — GUARANTEED",packageCustodyChanged:false};
  out=commitOnce(id,fact,"CONFIRMED_KILL",[ORIGIN,PS],[{type:"origin_occurrence",id:parentId},{type:"writing_authority",id:AUTH.psDisposition}]);if(out.success){const cl=classify(PS,"DEAD",id);if(!cl.success)return cl;}
 }else return{success:false,reason:"move_closer_ps_disposition_unknown"};
 if(!out||out.success!==true)return out||{success:false,reason:"move_closer_ps_disposition_failed"};
 rt.localContext={...(rt.localContext||{}),kakashiMoveCloserPsDispositionOccurrenceId:String(out.occurrenceId||"")};save();return{success:true,occurrenceId:String(out.occurrenceId||""),nextBeatId:TERMINAL};
}
function commitTwoTargetDisposition(kind){
 const rt=active(),parentId=String(rt&&rt.localContext&&(rt.localContext.kakashiMoveCloserTwoTargetOccurrenceId||rt.localContext.kakashiMoveCloserFailureBattleOccurrenceId)||"");if(!rt||!parentId||![E.improvedGroup,E.cutGroup].includes(rt.beatId))return{success:false,reason:"move_closer_two_target_disposition_context_required"};
 const pakkun=rt.beatId===E.cutGroup||rt.localContext&&rt.localContext.kakashiMoveCloserTwoTargetPakkunPresent===true;
 const id=stable("occ_origin_kakashi_move_closer_two_target_disposition",{instance:String(rt.instanceId||""),parentId,kind,pakkun});
 const fact={factClass:"academy_kakashi_amt_ps_two_target_disposition",authorityCommit:AUTH.twoTarget,storySceneInstanceId:String(rt.instanceId||""),parentOccurrenceRef:parentId,selectedDisposition:kind,participantRefs:[AMT,PS],pakkunPresent:pakkun,packageState:{objectRef:PACKAGE,currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON"}};
 const parentCommit=commitOnce(id,fact,"AMT_PS_"+kind,[ORIGIN,AMT,PS].concat(pakkun?[PAKKUN]:[]),[{type:"origin_occurrence",id:parentId},{type:"writing_authority",id:AUTH.twoTarget}]);if(!parentCommit.success)return parentCommit;
 if(kind==="ANBU"||kind==="POLICE"){
  const dest=kind==="ANBU"?"ANBU":"UCHIHA_POLICE";
  for(const ref of [AMT,PS]){const tr=FIELD.commitSingleInstitutionalTransfer(ref,dest,{sourceOccurrenceId:id});if(!tr||tr.success!==true)return tr||{success:false,reason:"move_closer_two_target_transfer_failed"};}
  if(kind==="ANBU"){const mat=CORE.recordMaterialState({storyUnitRef:ORIGIN,materialRef:PACKAGE,resolved:true,stateRef:id,value:{previousCustodyClass:"KAKASHI",currentHolderClass:"ANBU",custodyClass:"ANBU",locationClass:"ANBU_ROOFTOP",sourceAnchorRef:"MOVE_CLOSER_TWO_TARGET"}});if(!mat.success)return mat;}
 }else{
  const state=kind==="KILL"?"DEAD":kind==="RELEASE"?"DELIBERATELY_RELEASED":null;if(!state)return{success:false,reason:"move_closer_two_target_disposition_unknown"};
  for(const ref of [AMT,PS]){
   const childId=stable("occ_origin_kakashi_move_closer_two_target_child",{parentId:id,participantRef:ref,kind});
   const childFact={factClass:kind==="KILL"?"academy_kakashi_two_target_deterministic_kill_child":"academy_kakashi_two_target_release_child",authorityCommit:AUTH.twoTarget,storySceneInstanceId:String(rt.instanceId||""),parentDispositionOccurrenceId:id,participantRef:ref,stateClass:state,deterministicPostBattleKill:kind==="KILL"};
   const child=commitOnce(childId,childFact,state,[ORIGIN,ref],[{type:"group_disposition",id}]);if(!child.success)return child;
   const cl=classify(ref,state,childId);if(!cl.success)return cl;
  }
 }
 if(pakkun){const dep=explicitPakkunDeparture(id,"move_closer_two_target_"+kind.toLowerCase());if(!dep.success)return dep;}
 rt.localContext={...(rt.localContext||{}),kakashiMoveCloserTwoTargetDispositionOccurrenceId:id};save();return{success:true,occurrenceId:id,nextBeatId:TERMINAL};
}
function groupChoices(prefix){
 return[
  {choiceId:prefix+"_police",label:"TAKE THEM TO THE UCHIHA POLICE FORCE",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:prefix+"_police_35930",kind:"domain",resolve:()=>commitTwoTargetDisposition("POLICE")}]},
  {choiceId:prefix+"_anbu",label:"TAKE THEM TO THE ANBU",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:prefix+"_anbu_35930",kind:"domain",resolve:()=>commitTwoTargetDisposition("ANBU")}]},
  {choiceId:prefix+"_kill",label:"KILL THEM",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:prefix+"_kill_35930",kind:"domain",resolve:()=>commitTwoTargetDisposition("KILL")}]},
  {choiceId:prefix+"_release",label:"TAKE THE PACKAGE AND LET THEM GO",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:prefix+"_release_35930",kind:"domain",resolve:()=>commitTwoTargetDisposition("RELEASE")}]}
 ];
}

function install(){
 const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;if(!m)return{success:false,reason:"move_closer_scene_missing"};
 const beats=[
  {beatId:E.improvedIntro,mode:"narration",environmentRef:SAKURA,text:"The improved theft fails cleanly enough to preserve one fact: Masked Interceptor is still unseen. ANBU Marked Target and Package Smuggler turn on Kakashi.",nextBeatId:E.improvedBattle},
  {beatId:E.improvedBattle,mode:"battle_transition",environmentRef:SAKURA,text:"Kakashi faces ANBU Marked Target and Package Smuggler. The package remains on the original carrier at Battle entry.",battle:{encounterId:CONFIG.two,launchResolver:launchImprovedBattle,postBattleBeatId:E.improvedReturn,resultProjector:()=>latestResult(),actionLabel:"FIGHT THROUGH THE FAILED PICKPOCKET"}},
  {beatId:E.improvedReturn,mode:"narration",environmentRef:SAKURA,onEnterConsequences:[{requestId:"kakashi_move_closer_improved_return_35930",kind:"domain",resolve:consumeImprovedBattle}],text:"The failed-pickpocket Battle returns to Story. Masked Interceptor remains unseen.",nextBeatId:TERMINAL},
  {beatId:E.improvedGroup,mode:"choice",environmentRef:SAKURA,text:"ANBU Marked Target and Package Smuggler are defeated. Kakashi has the package. Masked Interceptor never entered this route.",choices:groupChoices("kak_improved_group")},
  {beatId:E.psIntro,mode:"narration",environmentRef:PS_ALT,text:"Kakashi chooses the man who detected him instead of the carrier escaping with the package.",nextBeatId:E.psBattle},
  {beatId:E.psBattle,mode:"battle_transition",environmentRef:PS_ALT,text:"Package Smuggler reaches for his weapon. ANBU Marked Target is already leaving with the package.",battle:{encounterId:CONFIG.ps,launchResolver:launchFailurePs,postBattleBeatId:E.psReturn,resultProjector:()=>latestResult(),actionLabel:"STOP PACKAGE SMUGGLER"}},
  {beatId:E.psReturn,mode:"narration",environmentRef:PS_ALT,onEnterConsequences:[{requestId:"kakashi_move_closer_stop_ps_return_35930",kind:"domain",resolve:consumeFailurePs}],text:"The Package Smuggler fight returns to Story. The missing package remains a separate fact.",nextBeatId:TERMINAL},
  {beatId:E.psDisposition,mode:"choice",environmentRef:PS_ALT,text:"Package Smuggler is defeated and physically available. The package is still gone with ANBU Marked Target.",choices:[
   {choiceId:"kak_stopps_kill",label:"KILL HIM",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"kak_stopps_kill_35930",kind:"domain",resolve:()=>commitPsDisposition("KILL")}]},
   {choiceId:"kak_stopps_restrain",label:"RESTRAIN HIM",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"kak_stopps_restrain_35930",kind:"domain",resolve:()=>commitPsDisposition("RESTRAIN")}]},
   {choiceId:"kak_stopps_anbu",label:"BRING HIM TO THE ANBU",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"kak_stopps_anbu_35930",kind:"domain",resolve:()=>commitPsDisposition("ANBU")}]},
   {choiceId:"kak_stopps_police",label:"TAKE HIM TO THE UCHIHA POLICE FORCE",nextBeatId:TERMINAL,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:"kak_stopps_police_35930",kind:"domain",resolve:()=>commitPsDisposition("POLICE")}]}
  ]},
  {beatId:E.cutIntro,mode:"narration",environmentRef:SAKURA,text:"Kakashi cuts across both men. Pakkun appears in Story at the choke point, but this exact Battle grants him no Combat action source.",nextBeatId:E.cutBattle},
  {beatId:E.cutBattle,mode:"battle_transition",environmentRef:SAKURA,text:"Kakashi faces ANBU Marked Target and Package Smuggler. Pakkun holds Story position only; the Battle remains the exact AMT + PS 2-v-1.",battle:{encounterId:CONFIG.two,launchResolver:launchFailureCut,postBattleBeatId:E.cutReturn,resultProjector:()=>latestResult(),actionLabel:"CUT THEM OFF"}},
  {beatId:E.cutReturn,mode:"narration",environmentRef:SAKURA,onEnterConsequences:[{requestId:"kakashi_move_closer_cutoff_return_35930",kind:"domain",resolve:consumeFailureCut}],text:"The choke-point Battle returns to Story. Pakkun remains present until an explicit departure.",nextBeatId:TERMINAL},
  {beatId:E.cutGroup,mode:"choice",environmentRef:SAKURA,text:"Both men are defeated inside the choke point. Kakashi recovered the package. Pakkun remains present in Story.",choices:groupChoices("kak_cutoff_group")}
 ];
 beats.forEach((b,i)=>{const n=normalized(b,35930+i);if(n)m.set(n.beatId,n);});
 const success=m.get(SUCCESS_BEAT),failure=m.get(FAILURE_BEAT);if(!success||!failure)return{success:false,reason:"move_closer_parent_choice_beats_missing"};
 const handoff=success.choices&&success.choices.find(x=>x&&x.choiceId==="let_handoff_happen"),strike=success.choices&&success.choices.find(x=>x&&x.choiceId==="strike_before_handoff"),pick=success.choices&&success.choices.find(x=>x&&x.choiceId==="attempt_pickpocket");
 const stay=failure.choices&&failure.choices.find(x=>x&&x.choiceId==="stay_on_package"),stop=failure.choices&&failure.choices.find(x=>x&&x.choiceId==="stop_package_smuggler"),cut=failure.choices&&failure.choices.find(x=>x&&x.choiceId==="cut_off_sakura");
 if(!handoff||!strike||!pick||!stay||!stop||!cut)return{success:false,reason:"move_closer_downstream_choice_missing"};
 handoff.label="LET THE HANDOFF HAPPEN";
 strike.label="STRIKE BEFORE THE HANDOFF";strike.availability=available(true);strike.knownBlocker=null;strike.nextBeatId=ROUTE.beats.directIntro;strike.consequenceRequests=[{requestId:"kakashi_move_closer_strike_35930",kind:"domain",resolve:()=>resolveSuccessStrike(strike)}];
 pick.label="ATTEMPT THE PICKPOCKET";pick.availability=available(true);pick.knownBlocker=null;pick.nextBeatId=E.improvedIntro;pick.consequenceRequests=[{requestId:"kakashi_move_closer_improved_pickpocket_35930",kind:"domain",resolve:()=>resolveImprovedPickpocket(pick)}];
 stay.label="STAY ON THE PACKAGE";
 stop.label="STOP PACKAGE SMUGGLER";stop.availability=available(true);stop.knownBlocker=null;stop.nextBeatId=E.psIntro;stop.consequenceRequests=[{requestId:"kakashi_move_closer_stop_ps_35930",kind:"domain",resolve:()=>beginFailureBattle(stop,"stop_ps")}];
 cut.label="CUT THEM OFF AT THE SAKURA TREE";cut.availability=available(true);cut.knownBlocker=null;cut.nextBeatId=E.cutIntro;cut.consequenceRequests=[{requestId:"kakashi_move_closer_cutoff_35930",kind:"domain",resolve:()=>beginFailureBattle(cut,"cut_off")}];
 return{success:true};
}
const installed=install();if(!installed||installed.success!==true)throw new Error("kakashi_move_closer_35930_install_failed:"+(installed&&installed.reason||"unknown"));

function diagnostics(){
 const d=scene(),s=d&&d.beatMap.get(SUCCESS_BEAT),f=d&&d.beatMap.get(FAILURE_BEAT);
 const checks={
  patchId:PATCH_ID==="alpha_kakashi_move_closer_closure_35930_v2_2026_09_20",
  authorityPinned:AUTH.moveCloser==="874900f9aa7a8cad3dd48e404c5a9e1cfe7d74fb",
  successChoicesExact:!!s&&JSON.stringify(s.choices.map(x=>x.label))===JSON.stringify(["LET THE HANDOFF HAPPEN","STRIKE BEFORE THE HANDOFF","ATTEMPT THE PICKPOCKET"]),
  failureChoicesExact:!!f&&JSON.stringify(f.choices.map(x=>x.label))===JSON.stringify(["STAY ON THE PACKAGE","STOP PACKAGE SMUGGLER","CUT THEM OFF AT THE SAKURA TREE"]),
  allNewChoicesLive:[...(s&&s.choices||[]).slice(1),...(f&&f.choices||[]).slice(1)].every(x=>x&&typeof x.availability==="function"&&x.availability().available===true&&x.knownBlocker===null),
  strikeReusesPhysicalChain:resolveSuccessStrike.toString().includes("beginReusedDirectStrikePhysical"),
  improvedExactResolver:resolveImprovedPickpocket.toString().includes("PICKPOCKET_IMPROVED_SUCCESS_CLEAN_EXTRACTION")&&resolveImprovedPickpocket.toString().includes("PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1"),
  improvedNoMi:consumeImprovedBattle.toString().includes("maskedInterceptorVisible:false")&&consumeImprovedBattle.toString().includes("pakkunPresent:false"),
  stopPsExactConfig:launchFailurePs.toString().includes("CONFIG.ps"),
  cutOffExactConfigNoPakkunBattleAction:launchFailureCut.toString().includes("CONFIG.two")&&beginFailureBattle.toString().includes("pakkunBattleActionAuthorized:false"),
  exactTwoTargetGroup:JSON.stringify(d.beatMap.get(E.improvedGroup).choices.map(x=>x.label))===JSON.stringify(["TAKE THEM TO THE UCHIHA POLICE FORCE","TAKE THEM TO THE ANBU","KILL THEM","TAKE THE PACKAGE AND LET THEM GO"]),
  exactPsDisposition:JSON.stringify(d.beatMap.get(E.psDisposition).choices.map(x=>x.label))===JSON.stringify(["KILL HIM","RESTRAIN HIM","BRING HIM TO THE ANBU","TAKE HIM TO THE UCHIHA POLICE FORCE"]),
  browserGoldenClaimed:false
 };
 const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
 return{pass:failed.length===0,checks,failed,beats:E,browserGoldenClaimed:false};
}
globalThis.SC_ALPHA_KAKASHI_MOVE_CLOSER_CLOSURE_35930=Object.freeze({patchId:PATCH_ID,authority:AUTH,beats:E,resolveSuccessStrike,resolveImprovedPickpocket,consumeImprovedBattle,beginFailureBattle,consumeFailurePs,consumeFailureCut,commitPsDisposition,commitTwoTargetDisposition,diagnostics,browserGoldenClaimed:false});
globalThis.runAcademyKakashiMoveCloserClosure35930Diagnostics=diagnostics;
})();