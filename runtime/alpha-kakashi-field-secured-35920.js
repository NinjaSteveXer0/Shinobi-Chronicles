// ============================================================================
// ACADEMY KAKASHI — FIELD-SECURED / COLLECTION / GROUP TRANSFER — 35920
// Consumes closed CE #244 / Writing #281 semantics.
// ============================================================================
(function installAcademyKakashiFieldSecured35920(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_FIELD_SECURED_35920)return;
const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const TERMINAL=globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100;
if(!A||!CORE||!TERMINAL)throw new Error("kakashi_field_secured_35920_dependencies_missing");

const PATCH_ID="alpha_kakashi_field_secured_35920_v1_2026_09_20";
const ORIGIN="academy_kakashi",SCENE="origin_academy_kakashi_anbu_retrieval";
const KAK="academy_kakashi",MI="academy_kakashi_origin_masked_interceptor",PS="academy_kakashi_origin_package_smuggler",AMT="academy_kakashi_origin_amt",PAKKUN="pakkun_origin_unfamiliar_ninken";
const PACKAGE="kakashi_origin_outer_route_packet";
const AUTH_FIELD="77d351e6f8d4eefaea0f8a6db82dec686391e1c0";
const AUTH_WRITING="964d173ede554f5379f36d08f42aa97ebcb919c5";
const TERMINAL_BEAT="kak_seq_debrief_pending";
const BEAT=Object.freeze({
 collectPs:"kak_konoha_collect_ps_35920",
 collectMi:"kak_konoha_collect_mi_35920",
 disposition:"kak_konoha_collection_disposition_35920"
});
const LOC=Object.freeze({
 [MI]:"KAKASHI_SAKURA_TREE_FIGHT_LOCATION",
 [PS]:"KAKASHI_PS_ALT_NIGHT_STREET",
 [AMT]:"KAKASHI_AMT_ALLEY"
});
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE):null;}catch(_e){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_e){}}
function stable(prefix,payload){return CORE.stableRef(prefix,payload);}
function occurrence(id){try{return id?A.findOccurrence(String(id)):null;}catch(_e){return null;}}
function snap(){return CORE.getStoryUnitSnapshot(ORIGIN)||{};}
function stateClass(ref){const s=snap(),r=s.participantStates&&s.participantStates[ref];return String(r&&r.stateClass||"");}
function packageState(){const s=snap(),r=s.materialStates&&s.materialStates[PACKAGE];return r&&r.value?CORE.clone(r.value):{custodyClass:"UNRESOLVED",locationClass:null};}
function commitOnce(id,fact,outcome,participantRefs=[],sourceRefs=[]){
 const old=occurrence(id);if(old)return{success:true,idempotent:true,occurrenceId:id,record:old};
 const out=A.commitOccurrence(ORIGIN,id,fact,[],{type:"origin_story_factual_occurrence",outcome,participantRefs,sourceRefs});
 return out&&out.success===true?{success:true,occurrenceId:id,record:out.record}:out||{success:false,reason:"field_secured_occurrence_commit_failed"};
}
function classify(ref,state,resultRef){return CORE.recordParticipantClassification({storyUnitRef:ORIGIN,participantRef:ref,stateClass:state,resultRef});}
function fieldSecuredRefs(){
 return [MI,PS,AMT].filter(ref=>stateClass(ref)==="FIELD_SECURED_PENDING_COLLECTION");
}
function escortRefs(){
 return [MI,PS,AMT].filter(ref=>stateClass(ref)==="COLLECTED_ACTIVE_ESCORT");
}
function commitFieldSecured(participantRef,spec={}){
 const rt=active();if(!rt||rt.sceneId!==SCENE)return{success:false,reason:"field_secured_story_context_missing"};
 const ref=String(participantRef||"");if(![MI,PS,AMT].includes(ref))return{success:false,reason:"field_secured_participant_invalid"};
 const source=String(spec.sourceOccurrenceId||spec.parentOccurrenceId||rt.localContext&&rt.localContext.kakashiScene05AWBattleOccurrenceId||rt.localContext&&rt.localContext.kakashiPostMiPsBattleOccurrenceId||rt.localContext&&rt.localContext.kakashiPostMiAmtBattleOccurrenceId||"");
 const locationRef=String(spec.locationRef||LOC[ref]||"");
 if(!source||!locationRef)return{success:false,reason:"field_secured_source_or_location_missing"};
 const id=stable("occ_origin_kakashi_field_secured",{instance:String(rt.instanceId||""),participantRef:ref,source,locationRef});
 const fact={factClass:"academy_kakashi_field_secured_participant",authorityCommit:AUTH_FIELD,writingAuthority:AUTH_WRITING,storySceneInstanceId:String(rt.instanceId||""),participantRef:ref,
  participantState:{status:"FIELD_SECURED_PENDING_COLLECTION",securedByActorRef:KAK,securedAtLocationRef:locationRef,restraintOccurrenceRef:id,alive:true,escortState:"NOT_ESCORTED",institutionalCustodyHolderRef:null,collectionState:"PENDING",restraintSkillId:"academy_kakashi_wire_snare",restraintPresentation:"Wire Snare",physicalMethod:"ninja wire",noPassiveEscapeTimer:true,noHiddenRestraintReroll:true},
  worldFacts:{pursuitTimingPenaltyAdded:false,fieldSecuredNotInstitutionalCustody:true,fieldSecuredNotActiveEscort:true}};
 const out=commitOnce(id,fact,"FIELD_SECURED_PENDING_COLLECTION",[ORIGIN,ref],[{type:"source_occurrence",id:source},{type:"writing_authority",id:AUTH_WRITING},{type:"coordination_authority",id:AUTH_FIELD}]);if(!out.success)return out;
 const cl=classify(ref,"FIELD_SECURED_PENDING_COLLECTION",id);if(!cl||cl.success!==true)return cl||{success:false,reason:"field_secured_classification_failed"};
 rt.localContext={...(rt.localContext||{}),kakashiKonohaLastFieldSecuredOccurrenceId:id,kakashiKonohaFieldSecuredByRef:{...(rt.localContext&&rt.localContext.kakashiKonohaFieldSecuredByRef||{}),[ref]:id}};save();
 return{success:true,idempotent:out.idempotent===true,occurrenceId:id,participantRef:ref,stateClass:"FIELD_SECURED_PENDING_COLLECTION",locationRef};
}
function commitCollected(participantRef,manifestId){
 const rt=active(),ref=String(participantRef||"");if(!rt||rt.sceneId!==SCENE)return{success:false,reason:"collection_story_context_missing"};
 if(stateClass(ref)!=="FIELD_SECURED_PENDING_COLLECTION")return{success:true,skipped:true,participantRef:ref,currentState:stateClass(ref)};
 const fieldId=String(rt.localContext&&rt.localContext.kakashiKonohaFieldSecuredByRef&&rt.localContext.kakashiKonohaFieldSecuredByRef[ref]||"");
 const id=stable("occ_origin_kakashi_collect_captive",{instance:String(rt.instanceId||""),participantRef:ref,fieldId,manifestId:String(manifestId||"")});
 const fact={factClass:"academy_kakashi_collect_field_secured_captive",authorityCommit:AUTH_FIELD,writingAuthority:AUTH_WRITING,storySceneInstanceId:String(rt.instanceId||""),participantRef:ref,
  previousState:"FIELD_SECURED_PENDING_COLLECTION",participantState:{status:"COLLECTED_ACTIVE_ESCORT",alive:true,collectionOccurrenceRef:id,escortPartyRefs:[KAK],institutionalCustodyHolderRef:null},securedAtLocationRef:LOC[ref],manifestId:String(manifestId||"")};
 const out=commitOnce(id,fact,"COLLECTED_ACTIVE_ESCORT",[ORIGIN,ref],[{type:"field_secured_occurrence",id:fieldId},{type:"collection_manifest",id:String(manifestId||"")}]);if(!out.success)return out;
 const cl=classify(ref,"COLLECTED_ACTIVE_ESCORT",id);if(!cl||cl.success!==true)return cl;
 return{success:true,occurrenceId:id,participantRef:ref,stateClass:"COLLECTED_ACTIVE_ESCORT"};
}
function beginCollectionFromAmt(spec={}){
 const rt=active();if(!rt||rt.sceneId!==SCENE)return{success:false,reason:"collection_amt_story_context_missing"};
 const earlier=fieldSecuredRefs().filter(ref=>ref!==AMT);if(!earlier.length)return{success:false,reason:"collection_requires_earlier_field_secured_captive"};
 const source=String(spec.sourceOccurrenceId||rt.localContext&&rt.localContext.kakashiPostMiAmtBattleOccurrenceId||rt.localContext&&rt.localContext.kakashiKonohaOriginalTargetAmtVictoryOccurrenceId||"");
 if(!source)return{success:false,reason:"collection_amt_source_missing"};
 const manifestId=stable("occ_origin_kakashi_collection_manifest",{instance:String(rt.instanceId||""),source,candidates:[AMT,...earlier].sort()});
 const manifestFact={factClass:"academy_kakashi_captive_collection_manifest",authorityCommit:AUTH_FIELD,writingAuthority:AUTH_WRITING,storySceneInstanceId:String(rt.instanceId||""),collectionManifestId:manifestId,
  candidateParticipantRefs:[AMT,...earlier],collectedParticipantRefs:[AMT],unavailableParticipantRefs:[],collectionOccurrenceRefs:[],escortPartyRefs:[KAK,PAKKUN],destinationIntentRef:null};
 const manifest=commitOnce(manifestId,manifestFact,"COLLECTION_MANIFEST_OPEN",[ORIGIN,AMT,...earlier],[{type:"source_occurrence",id:source},{type:"writing_authority",id:AUTH_WRITING}]);if(!manifest.success)return manifest;
 const amtId=stable("occ_origin_kakashi_collect_amt_active_escort",{instance:String(rt.instanceId||""),source,manifestId});
 const amtFact={factClass:"academy_kakashi_amt_collected_active_escort",authorityCommit:AUTH_FIELD,storySceneInstanceId:String(rt.instanceId||""),participantRef:AMT,previousState:stateClass(AMT)||"BATTLE_DEFEATED_UNRESOLVED",participantState:{status:"COLLECTED_ACTIVE_ESCORT",alive:true,collectionOccurrenceRef:amtId,escortPartyRefs:[KAK,PAKKUN],institutionalCustodyHolderRef:null},manifestId};
 const amt=commitOnce(amtId,amtFact,"COLLECTED_ACTIVE_ESCORT",[ORIGIN,AMT,PAKKUN],[{type:"collection_manifest",id:manifestId},{type:"source_occurrence",id:source}]);if(!amt.success)return amt;
 const cl=classify(AMT,"COLLECTED_ACTIVE_ESCORT",amtId);if(!cl||cl.success!==true)return cl;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaCollectionManifestId:manifestId,kakashiKonohaCollectionAmtOccurrenceId:amtId,kakashiKonohaPakkunPresent:true};
 save();return{success:true,manifestId,amtOccurrenceId:amtId,nextBeatId:BEAT.collectPs};
}
function collectPsOnEnter(){
 const rt=active(),manifestId=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaCollectionManifestId||"");if(!manifestId)return{success:false,reason:"collection_manifest_missing"};
 const out=commitCollected(PS,manifestId);rt.localContext={...(rt.localContext||{}),kakashiKonohaCollectionPsOccurrenceId:out&&out.occurrenceId||null};save();return out;
}
function collectMiOnEnter(){
 const rt=active(),manifestId=String(rt&&rt.localContext&&rt.localContext.kakashiKonohaCollectionManifestId||"");if(!manifestId)return{success:false,reason:"collection_manifest_missing"};
 const out=commitCollected(MI,manifestId);rt.localContext={...(rt.localContext||{}),kakashiKonohaCollectionMiOccurrenceId:out&&out.occurrenceId||null};save();return out;
}
function commitPakkunDeparture(parentId,destination){
 const rt=active(),id=stable("occ_origin_kakashi_pakkun_departure_after_collection",{instance:String(rt&&rt.instanceId||""),parentId,destination});
 const fact={factClass:"academy_kakashi_pakkun_explicit_departure",authorityCommit:AUTH_WRITING,storySceneInstanceId:String(rt&&rt.instanceId||""),participantRef:PAKKUN,parentTransferOccurrenceId:parentId,destination,participantState:{presenceState:"DEPARTED",ownershipGranted:false,nameKnowledgeGranted:false}};
 const out=commitOnce(id,fact,"PAKKUN_DEPARTED",[ORIGIN,PAKKUN],[{type:"group_transfer",id:parentId}]);if(!out.success)return out;
 const cl=classify(PAKKUN,"DEPARTED",id);if(!cl||cl.success!==true)return cl;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaPakkunPresent:false,kakashiPostMiPakkunPresent:false,kakashiKonohaPakkunDepartureOccurrenceId:id};save();return{success:true,occurrenceId:id};
}
function commitGroupTransfer(destination){
 const rt=active();if(!rt||rt.sceneId!==SCENE||rt.beatId!==BEAT.disposition)return{success:false,reason:"group_transfer_context_missing"};
 const dest=String(destination||"").toUpperCase();if(!["ANBU","UCHIHA_POLICE"].includes(dest))return{success:false,reason:"group_transfer_destination_invalid"};
 const members=escortRefs();if(members.length<2)return{success:false,reason:"group_transfer_requires_multiple_escort_members",members};
 const manifestId=String(rt.localContext&&rt.localContext.kakashiKonohaCollectionManifestId||"");if(!manifestId)return{success:false,reason:"group_transfer_manifest_missing"};
 const parentId=stable("occ_origin_kakashi_group_transfer",{instance:String(rt.instanceId||""),manifestId,destination:dest,members:[...members].sort()});
 const parentFact={factClass:"academy_kakashi_group_transfer",authorityCommit:AUTH_FIELD,writingAuthority:AUTH_WRITING,storySceneInstanceId:String(rt.instanceId||""),collectionManifestId:manifestId,destinationIntentRef:dest,eligibleParticipantRefs:[...members],transactionState:"OPEN"};
 const parent=commitOnce(parentId,parentFact,"GROUP_TRANSFER_"+dest,[ORIGIN,...members],[{type:"collection_manifest",id:manifestId},{type:"writing_authority",id:AUTH_WRITING}]);if(!parent.success)return parent;
 const state=dest==="ANBU"?"ANBU_INSTITUTIONAL_CUSTODY":"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY",childRefs=[];
 for(const ref of members){
  const childId=stable("occ_origin_kakashi_group_transfer_child",{parentId,participantRef:ref,destination:dest});
  const childFact={factClass:"academy_kakashi_group_transfer_child",authorityCommit:AUTH_FIELD,storySceneInstanceId:String(rt.instanceId||""),parentTransferOccurrenceId:parentId,participantRef:ref,previousState:"COLLECTED_ACTIVE_ESCORT",participantState:{status:state,alive:true,institutionalCustodyHolderRef:dest}};
  const child=commitOnce(childId,childFact,state,[ORIGIN,ref],[{type:"group_transfer",id:parentId},{type:"collection_manifest",id:manifestId}]);if(!child.success)return child;
  const cl=classify(ref,state,childId);if(!cl||cl.success!==true)return cl;childRefs.push(childId);
 }
 if(dest==="ANBU"){
  const pkg=packageState();if(String(pkg.custodyClass||"")==="KAKASHI"){
   const mat=CORE.recordMaterialState({storyUnitRef:ORIGIN,materialRef:PACKAGE,resolved:true,stateRef:parentId,value:{...pkg,previousCustodyClass:"KAKASHI",custodyClass:"ANBU",currentHolderClass:"ANBU",locationClass:"ANBU_ROOFTOP"}});if(!mat||mat.success!==true)return mat;
  }
 }
 const depart=commitPakkunDeparture(parentId,dest);if(!depart||depart.success!==true)return depart;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaGroupTransferOccurrenceId:parentId,kakashiKonohaGroupTransferChildOccurrenceIds:childRefs,kakashiKonohaGroupTransferDestination:dest};save();
 return{success:true,parentOccurrenceId:parentId,childOccurrenceIds:childRefs,destination:dest,nextBeatId:TERMINAL_BEAT};
}
function commitSingleInstitutionalTransfer(participantRef,destination,spec={}){
 const rt=active(),ref=String(participantRef||""),dest=String(destination||"").toUpperCase();if(!rt||rt.sceneId!==SCENE)return{success:false,reason:"single_transfer_story_context_missing"};
 if(![MI,PS,AMT].includes(ref)||!["ANBU","UCHIHA_POLICE"].includes(dest))return{success:false,reason:"single_transfer_invalid"};
 const source=String(spec.sourceOccurrenceId||rt.localContext&&rt.localContext.kakashiPostMiAmtBattleOccurrenceId||rt.localContext&&rt.localContext.kakashiPostMiPsBattleOccurrenceId||"");if(!source)return{success:false,reason:"single_transfer_source_missing"};
 const id=stable("occ_origin_kakashi_single_institutional_transfer",{instance:String(rt.instanceId||""),participantRef:ref,destination:dest,source});
 const state=dest==="ANBU"?"ANBU_INSTITUTIONAL_CUSTODY":"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY";
 const fact={factClass:"academy_kakashi_single_institutional_transfer",authorityCommit:AUTH_FIELD,writingAuthority:AUTH_WRITING,storySceneInstanceId:String(rt.instanceId||""),participantRef:ref,sourceOccurrenceId:source,participantState:{status:state,alive:true,institutionalCustodyHolderRef:dest}};
 const out=commitOnce(id,fact,state,[ORIGIN,ref],[{type:"source_occurrence",id:source},{type:"writing_authority",id:AUTH_WRITING}]);if(!out.success)return out;
 const cl=classify(ref,state,id);if(!cl||cl.success!==true)return cl;return{success:true,occurrenceId:id,stateClass:state,nextBeatId:TERMINAL_BEAT};
}
function installBeats(){
 const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;if(!m)return{success:false,reason:"field_secured_scene_missing"};
 m.set(BEAT.collectPs,{beatId:BEAT.collectPs,mode:"narration",environmentRef:{assetId:"kakashi_origin_ps_battle_alt_night"},text:"Kakashi retraces the pursuit route. Package Smuggler is collected only if his field-secured state is still current.",nextBeatId:BEAT.collectMi,onEnterConsequences:[{requestId:"kakashi_collect_ps_35920",kind:"domain",resolve:collectPsOnEnter}],exitScene:false,allowPresentationClose:false,choices:[]});
 m.set(BEAT.collectMi,{beatId:BEAT.collectMi,mode:"narration",environmentRef:{assetId:"kakashi_origin_fight_at_sakura_tree"},text:"Kakashi returns to the Sakura tree and collects Masked Interceptor only if she remains field-secured there.",nextBeatId:BEAT.disposition,onEnterConsequences:[{requestId:"kakashi_collect_mi_35920",kind:"domain",resolve:collectMiOnEnter}],exitScene:false,allowPresentationClose:false,choices:[]});
 m.set(BEAT.disposition,{beatId:BEAT.disposition,mode:"choice",environmentRef:{assetId:"kakashi_origin_rooftop_night"},text:"Every still-legitimate field-secured captive has been collected. Institutional transfer remains participant-specific.",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[
  {choiceId:"kak_collection_all_anbu",label:"TAKE THEM ALL BACK TO ANBU",nextBeatId:TERMINAL_BEAT,availability:()=>({available:escortRefs().length>=2,knownBlocker:escortRefs().length>=2?null:"MULTIPLE COLLECTED CAPTIVES REQUIRED"}),knownBlocker:null,consequenceRequests:[{requestId:"kak_collection_all_anbu_35920",kind:"domain",resolve:()=>commitGroupTransfer("ANBU")}]},
  {choiceId:"kak_collection_all_police",label:"TAKE THEM ALL TO THE UCHIHA POLICE FORCE",nextBeatId:TERMINAL_BEAT,availability:()=>({available:escortRefs().length>=2,knownBlocker:escortRefs().length>=2?null:"MULTIPLE COLLECTED CAPTIVES REQUIRED"}),knownBlocker:null,consequenceRequests:[{requestId:"kak_collection_all_police_35920",kind:"domain",resolve:()=>commitGroupTransfer("UCHIHA_POLICE")}]}
 ]});
 return{success:true};
}
const installed=installBeats();if(!installed||installed.success!==true)throw new Error("kakashi_field_secured_35920_install_failed");
function diagnostics(){
 const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;
 const checks={
  patchId:PATCH_ID==="alpha_kakashi_field_secured_35920_v1_2026_09_20",
  authorityPinned:AUTH_FIELD==="77d351e6f8d4eefaea0f8a6db82dec686391e1c0",
  writingPinned:AUTH_WRITING==="964d173ede554f5379f36d08f42aa97ebcb919c5",
  exactStateClasses:commitFieldSecured.toString().includes("FIELD_SECURED_PENDING_COLLECTION")&&commitCollected.toString().includes("COLLECTED_ACTIVE_ESCORT"),
  noPassiveEscape:commitFieldSecured.toString().includes("noPassiveEscapeTimer:true")&&commitFieldSecured.toString().includes("noHiddenRestraintReroll:true"),
  noRestraintTimePenalty:commitFieldSecured.toString().includes("pursuitTimingPenaltyAdded:false"),
  collectionParticipantSpecific:commitCollected.toString().includes("participantRef")&&!commitCollected.toString().includes("captives ="),
  groupTransferChildren:commitGroupTransfer.toString().includes("group_transfer_child")&&commitGroupTransfer.toString().includes("for(const ref of members)"),
  pakkunDepartureExplicit:commitGroupTransfer.toString().includes("commitPakkunDeparture"),
  beatsInstalled:!!m&&Object.values(BEAT).every(id=>m.has(id)),
  browserGoldenClaimed:false
 };
 const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
 return{pass:failed.length===0,checks,failed,fieldSecuredRefs:fieldSecuredRefs(),escortRefs:escortRefs(),browserGoldenClaimed:false};
}
globalThis.commitAcademyKakashiFieldSecured35920=commitFieldSecured;
globalThis.getAcademyKakashiFieldSecuredRefs35920=fieldSecuredRefs;
globalThis.beginAcademyKakashiCollectionFromAmt35920=beginCollectionFromAmt;
globalThis.commitAcademyKakashiSingleTransfer35920=commitSingleInstitutionalTransfer;
globalThis.SC_ALPHA_KAKASHI_FIELD_SECURED_35920=Object.freeze({patchId:PATCH_ID,authorityCommit:AUTH_FIELD,writingAuthority:AUTH_WRITING,beats:BEAT,commitFieldSecured,fieldSecuredRefs,escortRefs,beginCollectionFromAmt,commitCollected,commitGroupTransfer,commitSingleInstitutionalTransfer,diagnostics,browserGoldenClaimed:false});
globalThis.runAcademyKakashiFieldSecured35920Diagnostics=diagnostics;
})();