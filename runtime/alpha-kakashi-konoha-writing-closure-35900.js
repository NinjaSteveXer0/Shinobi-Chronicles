// ============================================================================
// ACADEMY KAKASHI — KONOHA WRITING CLOSURE / CE #256 CONSUMER — 35900
//
// Purpose:
// - consume Writing/Story Konoha 100% closure without reopening semantics;
// - close CE #256 AMT-defeats-Kakashi/Pakkun package + Pakkun factual state;
// - retire historical post-MI / deterministic-kill report stops now superseded
//   by exact terminal authorities;
// - provide a last-loaded closure layer so older source remains regression
//   addressable while current player-facing runtime no longer exposes stale
//   Writing blockers.
//
// This is an extension consumer, not a Story engine. It reuses:
// 32900 occurrence authority, 34000 semantic/autonomy core,
// 34300 Battle deployment, 34600 neutral factual resolver,
// 35100 terminal/debrief, and the existing 35830 post-MI route.
// ============================================================================
(function installAcademyKakashiKonohaClosure35900(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_KONOHA_CLOSURE_35900)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const BATTLE=globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300;
const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
const TERMINAL=globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100;
const POSTMI=globalThis.SC_ALPHA_KAKASHI_POST_MI_DEATH_PURSUIT_35830;
if(!A||!CORE||!BATTLE||!PROVIDER||!TERMINAL||!POSTMI)throw new Error("kakashi_konoha_closure_35900_dependencies_missing");

const PATCH_ID="alpha_kakashi_konoha_closure_35900_v2_2026_09_20";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const KAK="academy_kakashi";
const AMT="academy_kakashi_origin_amt";
const PAKKUN="pakkun_origin_unfamiliar_ninken";
const PACKAGE="kakashi_origin_outer_route_packet";
const TERMINAL_PENDING="kak_seq_debrief_pending";
const AMT_CONFIG="academy_kakashi_origin_battle_seq_amt_pakkun";
const AMT_SECURE_PACKAGE_CONFIG="academy_kakashi_origin_battle_kakashi_pakkun_vs_amt";
const AMT_BINDING="academy_kakashi.battle.stop_assassin_post_mi_amt";
const CE256_AMT_BATTLE_CONFIGS=Object.freeze([AMT_CONFIG,AMT_SECURE_PACKAGE_CONFIG]);
const CE256_BINDING="academy_kakashi.resolver.post_amt_defeat_package_reach";
const CE256_PACKAGE_AUTHORITY="09db8ff4efc28ee608d41c828af48efc023d324f";
const CE256_DIRECT_AUTHORITY="7a95637765a58b8f12b0bac877032625266830f6";
const CE244_AUTHORITY="77d351e6f8d4eefaea0f8a6db82dec686391e1c0";
const WRITING_100_AUTHORITY="21e0407a0c371310ff06096905fd1fce4107ece8";
const TERMINAL_AUTHORITY="a3cad415ea74a4fe8b3965b1136522aceab81047";
const AMT_RETURN=POSTMI.beats&&POSTMI.beats.amtReturn||"kak_stop_postmi_amt_return_35830";
const AMT_AFTERMATH="kak_konoha_amt_defeat_aftermath_35900";
const REPORT_BEATS=new Set([
  POSTMI.beats&&POSTMI.beats.psReport||"kak_stop_postmi_ps_report_boundary_35830",
  POSTMI.beats&&POSTMI.beats.amtReport||"kak_stop_postmi_amt_report_boundary_35830",
  "kak_scene06a_w2c_deterministic_kill_report_pending_35810"
]);
const CURSOR="__kakashiKonohaClosure35900Cursor";

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_e){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_e){}}
function clone(v){try{return CORE.clone(v);}catch(_e){try{return JSON.parse(JSON.stringify(v));}catch(_e2){return v;}}}
function factOf(row){return row&&(row.fact||row.data)||{};}
function occurrence(id){try{return id?A.findOccurrence(String(id)):null;}catch(_e){return null;}}
function stable(prefix,payload){return PROVIDER.stableRef(prefix,payload);}
function normalizedBeat(def,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(def,index):def;}
function latestResult(){
 const rt=active(),resume=rt&&rt.battleResume&&typeof rt.battleResume==="object"?rt.battleResume:null;
 const candidates=resume?[resume.authored,resume.projected,resume.result,resume.battleResult]:[];
 for(const row of candidates)if(row&&typeof row==="object"&&row.battleConfigId&&row.bindingRef)return row;
 try{const row=typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult():null;if(row&&row.battleConfigId&&row.bindingRef)return row;}catch(_e){}
 return null;
}
function packageOccurrenceId(rt=active()){
 const l=rt&&rt.localContext||{};
 return String(l.kakashiKonohaPackageOccurrenceId||l.kakashiPostMiPackageOccurrenceId||l.kakashiSequentialPackageOccurrenceId35100||l.kakashiSequentialPackageOccurrenceId||l.kakashiObserveSecurePackageOccurrenceId||l.kakashiGetCloserStayPackagePursuitOccurrenceId||"");
}
function packageState(rt=active()){
 const id=packageOccurrenceId(rt),row=occurrence(id),f=factOf(row),pkg=f.packageState||{};
 if(String(pkg.objectRef||"")===PACKAGE)return clone(pkg);
 return{objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PS_PERSON"};
}
function commitOnce(id,fact,outcome,participants=[],sourceRefs=[]){
 const prior=occurrence(id);
 if(prior)return{success:true,idempotent:true,occurrenceId:id,record:prior};
 const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_factual_occurrence",outcome:String(outcome||""),participantRefs:participants,sourceRefs});
 return out&&out.success===true?{success:true,occurrenceId:id,record:out.record}:out||{success:false,reason:"kakashi_konoha_35900_occurrence_commit_failed"};
}
function recordPackageMaterial(stateRef,pkg){
 if(typeof CORE.recordMaterialState!=="function")return{success:false,reason:"kakashi_konoha_material_state_api_missing"};
 return CORE.recordMaterialState({storyUnitRef:ORIGIN_ID,materialRef:PACKAGE,resolved:true,stateRef:String(stateRef),value:{
  custodyClass:String(pkg.currentHolderClass||pkg.custodyClass||""),
  custodianRef:pkg.custodianRef||null,
  locationClass:pkg.locationClass||null,
  guardedByRef:pkg.guardedByRef||null,
  sourceAnchorRef:"AK_SA_027"
 }});
}
function ce256Eligibility(kind){
 return({state})=>{
  const pkg=state&&state.packageState||{};
  const holder=String(pkg.currentHolderClass||pkg.custodyClass||"");
  if(kind==="UNCHANGED_ELSEWHERE")return{eligible:holder!=="KAKASHI",predicateRefs:["package_holder_not_kakashi"]};
  return{eligible:holder==="KAKASHI",predicateRefs:["package_physically_with_defeated_kakashi"]};
 };
}
function ce256Result(kind){
 return({state})=>{
  const pkg=clone(state&&state.packageState||{objectRef:PACKAGE});
  if(kind==="AMT_RECLAIMS")return{
   outcomeClass:"AMT_ESCAPE_PACKAGE_RECLAIMED",
   packageState:{...pkg,objectRef:PACKAGE,previousHolderClass:String(pkg.currentHolderClass||pkg.custodyClass||"KAKASHI"),currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_PERSON",guardedByRef:null},
   amtEscapes:true,packageTakenByAmt:true
  };
  return{outcomeClass:"AMT_ESCAPE_PACKAGE_UNCHANGED",packageState:pkg,amtEscapes:true,packageTakenByAmt:false};
 };
}
function commitCe256Package({receipt,request,result}){
 const rt=active();if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"ce256_story_instance_missing"};
 const battle=latestResult();if(!battle||String(battle.battleOccurrenceId||"")!==String(request&&request.context&&request.context.battleOccurrenceId||""))return{success:false,reason:"ce256_battle_receipt_mismatch"};
 const id=stable("occ_origin_kakashi_ce256_amt_defeat_package",{
  scene:String(rt.instanceId||""),battle:String(battle.battleOccurrenceId||""),selected:String(receipt&&receipt.selectedOutcomeRef||"")
 });
 const pkg=clone(result&&result.packageState||packageState(rt));
 const fact={
  factClass:"academy_kakashi_amt_defeats_kakashi_package_resolution",
  anchorRef:"AK_SA_027",
  authorityCommit:CE256_PACKAGE_AUTHORITY,
  storySceneInstanceId:String(rt.instanceId||""),
  battleOccurrenceId:String(battle.battleOccurrenceId||""),
  battleResultState:String(battle.resultState||""),
  storyFactualResolverReceiptId:String(receipt&&receipt.storyFactualResolverReceiptId||""),
  selectedOutcomeRef:String(receipt&&receipt.selectedOutcomeRef||""),
  packageState:pkg,
  worldFacts:{amtEscapes:true,packageTakenByAmt:result&&result.packageTakenByAmt===true,battleVictoryDidNotImplyPackageCustody:true}
 };
 const committed=commitOnce(id,fact,fact.selectedOutcomeRef,[ORIGIN_ID,AMT],[{type:"battle_occurrence",id:String(battle.battleOccurrenceId||"")},{type:"world_object",id:PACKAGE},{type:"writing_authority",id:CE256_PACKAGE_AUTHORITY}]);if(!committed.success)return committed;
 const material=recordPackageMaterial(id,pkg);if(!material||material.success!==true)return material||{success:false,reason:"ce256_package_material_commit_failed"};
 rt.localContext={...(rt.localContext||{}),kakashiKonohaPackageOccurrenceId:id,kakashiPostMiPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id,kakashiCe256PackageOccurrenceId:id,kakashiCe256PackageOutcomeRef:fact.selectedOutcomeRef};save();
 return{success:true,occurrenceId:id,consequenceRefs:[id],stateDeltaRefs:[id],objectCustodyDeltaRefs:[id],participantStateDeltaRefs:[],successorSituationRef:String(request&&request.context&&request.context.successorSituationRef||AMT_AFTERMATH)};
}
const ce256Registration=PROVIDER.registerStoryFactualResolverBinding(CE256_BINDING,{
 ownerRef:"academy_kakashi.konoha_closure.ce256",
 authorityVersionRefs:[CE256_PACKAGE_AUTHORITY,CE256_DIRECT_AUTHORITY,WRITING_100_AUTHORITY],
 outcomes:[
  {outcomeRef:"AMT_ESCAPE_PACKAGE_UNCHANGED_ELSEWHERE",authoredOrder:0,eligibility:ce256Eligibility("UNCHANGED_ELSEWHERE"),resultPayloadTemplate:ce256Result("UNCHANGED")},
  {outcomeRef:"AMT_ESCAPE_PACKAGE_UNCHANGED_KAKASHI_SIDE",authoredOrder:1,eligibility:ce256Eligibility("KAKASHI"),resultPayloadTemplate:ce256Result("UNCHANGED")},
  {outcomeRef:"AMT_ESCAPE_PACKAGE_RECLAIMED_BY_AMT",authoredOrder:2,eligibility:ce256Eligibility("KAKASHI"),resultPayloadTemplate:ce256Result("AMT_RECLAIMS")}
 ],
 commitResult:commitCe256Package,
 metadata:{storyUnitRef:ORIGIN_ID,anchorRef:"AK_SA_027",battleDoesNotOwnPackage:true,pakkunResolvesAfterPackage:true}
});
if(!ce256Registration||ce256Registration.success!==true)throw new Error("kakashi_ce256_binding_registration_failed");

function consumePakkunAfterCe256(packageResolution){
 const rt=active();if(!rt)return{success:false,reason:"ce256_pakkun_story_missing"};
 const pkg=clone(packageResolution&&packageResolution.packageState||packageState(rt));
 const holder=String(pkg.currentHolderClass||pkg.custodyClass||"");
 const guard=holder==="KAKASHI";
 const stateRef=String(rt.localContext&&rt.localContext.kakashiCe256PackageOccurrenceId||packageOccurrenceId(rt)||"");
 if(!stateRef)return{success:false,reason:"ce256_pakkun_state_ref_missing"};
 const autonomyResult={
  success:true,
  participantIntentRef:guard?"pakkun_guard_exposed_mission_object":"pakkun_stay_with_kakashi_after_amt_escape",
  resolverResultRef:stable("sc35900-pakkun-autonomy",{stateRef,guard,scene:String(rt.instanceId||"")}),
  consequenceRefs:[stateRef],
  result:{presenceState:"PRESENT",actionClass:guard?"GUARD_PACKAGE":"REMAIN_PRESENT",temporaryParticipationOnly:true,ownershipGranted:false,nameKnowledgeGranted:false}
 };
 const consumed=CORE.consumeNextAutonomy({storyUnitRef:ORIGIN_ID,state:{committedStateRef:stateRef,battleLive:false,dueAnchorIds:["AK_SA_012"],autonomyResults:{AK_SA_012:autonomyResult}}});
 if(!consumed||consumed.success!==true)return consumed||{success:false,reason:"ce256_pakkun_autonomy_failed"};
 const finalPkg=guard?{...pkg,guardedByRef:PAKKUN,locationClass:pkg.locationClass||"KAKASHI_PERSON"}:pkg;
 const id=stable("occ_origin_kakashi_ce256_pakkun_post_amt_defeat",{scene:String(rt.instanceId||""),stateRef,guard,autonomyReceipt:String(consumed.receipt&&consumed.receipt.autonomyReceiptId||consumed.receipt&&consumed.receipt.resolverResultRef||"")});
 const fact={
  factClass:"academy_kakashi_amt_defeat_pakkun_autonomy_resolution",
  anchorRef:"AK_SA_012",
  authorityCommit:CE256_PACKAGE_AUTHORITY,
  storySceneInstanceId:String(rt.instanceId||""),
  parentPackageOccurrenceId:stateRef,
  packageState:finalPkg,
  participantStateByRef:{[PAKKUN]:{presenceState:"PRESENT",autonomyState:guard?"GUARDING_PACKAGE":"REMAINING_WITH_KAKASHI",temporaryParticipationOnly:true,ownershipGranted:false,nameKnowledgeGranted:false}},
  worldFacts:{pakkunPresent:true,pakkunGuardingPackage:guard,amtEscaped:true}
 };
 const committed=commitOnce(id,fact,guard?"PAKKUN_GUARDS_PACKAGE":"PAKKUN_REMAINS_PRESENT",[ORIGIN_ID,AMT,PAKKUN],[{type:"origin_occurrence",id:stateRef,role:"package_resolution"},{type:"story_autonomy_anchor",id:"AK_SA_012"},{type:"writing_authority",id:CE256_PACKAGE_AUTHORITY}]);if(!committed.success)return committed;
 const material=recordPackageMaterial(id,finalPkg);if(!material||material.success!==true)return material;
 rt.localContext={...(rt.localContext||{}),kakashiKonohaPackageOccurrenceId:id,kakashiPostMiPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId35100:id,kakashiCe256PakkunOccurrenceId:id,kakashiKonohaPakkunPresent:true,kakashiPostMiPakkunPresent:true,kakashiCe256PakkunState:guard?"GUARDING_PACKAGE":"PRESENT"};save();
 return{success:true,occurrenceId:id,packageState:finalPkg,pakkunState:guard?"GUARDING_PACKAGE":"PRESENT"};
}
function resolveAmtDefeatFacts35900(options={}){
 const rt=active(),battle=options.battleResult&&typeof options.battleResult==="object"?options.battleResult:latestResult();
 if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"ce256_amt_story_context_required"};
 if(!battle||!battle.battleOccurrenceId||!CE256_AMT_BATTLE_CONFIGS.includes(String(battle.battleConfigId||"")))return{success:false,reason:"ce256_amt_battle_receipt_mismatch"};
 if(String(battle.resultState||"")!=="opposition_side_victory")return{success:false,reason:"ce256_amt_defeat_result_required",resultState:String(battle.resultState||"")};
 rt.localContext=rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};
 const suppliedPackageOccurrenceId=String(options.packageOccurrenceId||"");
 if(suppliedPackageOccurrenceId)rt.localContext.kakashiKonohaPackageOccurrenceId=suppliedPackageOccurrenceId;
 const inputPackageOccurrenceId=packageOccurrenceId(rt);
 const routeRef=String(options.routeRef||battle.bindingRef||battle.battleConfigId||"amt_pakkun");
 const existingFinalId=stable("occ_origin_kakashi_ce256_amt_defeat_complete",{scene:String(rt.instanceId||""),battle:String(battle.battleOccurrenceId||""),routeRef});
 const existing=occurrence(existingFinalId);
 if(existing){
  const ef=factOf(existing),pkg=clone(ef.packageState||packageState(rt)),pakkunState=String(ef.participantStateByRef&&ef.participantStateByRef[PAKKUN]&&ef.participantStateByRef[PAKKUN].autonomyState||"PRESENT");
  return{success:true,idempotent:true,occurrenceId:existingFinalId,packageState:pkg,pakkunState,routeRef};
 }

 const pkg=packageState(rt);
 const parent=String(options.parentRef||rt.localContext.kakashiPostMiPursuitSelectionOccurrenceId||rt.localContext.kakashiPostMiPakkunReachOccurrenceId||rt.localContext.kakashiObserveSecurePackageAmtPursuitOccurrenceId||battle.battleOccurrenceId||"");
 const factual=PROVIDER.resolveStoryFactualAction({
  storyDecisionReceiptId:parent,
  bindingRef:CE256_BINDING,
  actorRef:AMT,
  intentCommitRef:parent,
  attemptOrdinal:1,
  idempotenceKey:stable("sc35900-ce256-amt-defeat",{scene:String(rt.instanceId||""),battle:String(battle.battleOccurrenceId||""),packageOccurrence:inputPackageOccurrenceId,routeRef}),
  inputStateRefs:[String(battle.battleOccurrenceId||""),inputPackageOccurrenceId].filter(Boolean),
  continuityLineageRef:String(rt.instanceId||""),
  state:{packageState:pkg,pakkunPresent:rt.localContext.kakashiKonohaPakkunPresent===true||rt.localContext.kakashiPostMiPakkunPresent===true},
  context:{storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(battle.battleOccurrenceId||""),beatId:String(options.returnBeatId||rt.beatId||""),routeRef,successorSituationRef:String(options.successorSituationRef||"")}
 });
 if(!factual||factual.success!==true)return factual||{success:false,reason:"ce256_package_resolution_failed"};
 const pakkun=consumePakkunAfterCe256(factual.result);if(!pakkun||pakkun.success!==true)return pakkun||{success:false,reason:"ce256_pakkun_resolution_failed"};
 const finalId=stable("occ_origin_kakashi_ce256_amt_defeat_complete",{scene:String(rt.instanceId||""),battle:String(battle.battleOccurrenceId||""),routeRef});
 const fact={
  factClass:"academy_kakashi_amt_defeats_kakashi_pakkun_complete",
  anchorRef:"AK_SA_027",
  authorityCommit:CE256_PACKAGE_AUTHORITY,
  storySceneInstanceId:String(rt.instanceId||""),
  routeRef,
  battleOccurrenceId:String(battle.battleOccurrenceId||""),
  battleConfigId:String(battle.battleConfigId||""),
  battleBindingRef:String(battle.bindingRef||""),
  battleResultState:"opposition_side_victory",
  packageState:clone(pakkun.packageState),
  participantStateByRef:{[AMT]:{presenceState:"ESCAPED",controlState:"FREE"},[PAKKUN]:{presenceState:"PRESENT",autonomyState:pakkun.pakkunState,temporaryParticipationOnly:true,ownershipGranted:false,nameKnowledgeGranted:false}},
  worldFacts:{amtEscaped:true,pakkunPresent:true,noInjuryInferred:true,packageCustodyDerivedFromResolver:true,battleVictoryDidNotImplyPackageCustody:true}
 };
 const committed=commitOnce(finalId,fact,"AMT_BATTLE_DEFEAT_FACTS_RESOLVED",[ORIGIN_ID,AMT,PAKKUN],[{type:"battle_occurrence",id:String(battle.battleOccurrenceId||"")},{type:"origin_occurrence",id:pakkun.occurrenceId,role:"pakkun_autonomy"},{type:"writing_authority",id:CE256_PACKAGE_AUTHORITY}]);if(!committed.success)return committed;
 rt.localContext={...(rt.localContext||{}),kakashiCe256LastAmtDefeatOccurrenceId:finalId,kakashiKonohaPackageOccurrenceId:pakkun.occurrenceId,kakashiPostMiPackageOccurrenceId:pakkun.occurrenceId,kakashiSequentialPackageOccurrenceId35100:pakkun.occurrenceId,kakashiKonohaPakkunPresent:true};save();
 return{success:true,idempotent:false,occurrenceId:finalId,packageState:clone(pakkun.packageState),pakkunState:pakkun.pakkunState,routeRef};
}
function resolveCe256AmtDefeat(){
 const rt=active(),battle=latestResult();
 if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==AMT_RETURN)return{success:false,reason:"ce256_amt_return_context_required"};
 if(!battle||String(battle.battleConfigId||"")!==AMT_CONFIG||String(battle.bindingRef||"")!==AMT_BINDING)return{success:false,reason:"ce256_amt_battle_receipt_mismatch"};
 if(String(battle.resultState||"")==="player_side_victory")return POSTMI.consumeAmtReturn();
 if(String(battle.resultState||"")!=="opposition_side_victory")return{success:false,reason:"ce256_amt_battle_result_unresolved"};
 if(rt.localContext&&rt.localContext.kakashiCe256AmtDefeatProcessed===true)return{success:true,idempotent:true,beatId:rt.beatId};
 const resolved=resolveAmtDefeatFacts35900({
  battleResult:battle,
  packageOccurrenceId:packageOccurrenceId(rt),
  parentRef:String(rt.localContext&&rt.localContext.kakashiPostMiPursuitSelectionOccurrenceId||rt.localContext&&rt.localContext.kakashiPostMiPakkunReachOccurrenceId||battle.battleOccurrenceId||""),
  routeRef:"stop_assassin_post_mi_amt",
  returnBeatId:AMT_RETURN,
  successorSituationRef:AMT_AFTERMATH
 });
 if(!resolved||resolved.success!==true)return resolved||{success:false,reason:"ce256_amt_defeat_fact_resolution_failed"};
 rt.localContext={...(rt.localContext||{}),kakashiCe256AmtDefeatProcessed:true,kakashiCe256AmtDefeatOccurrenceId:resolved.occurrenceId,kakashiPostMiPackageOccurrenceId:String(rt.localContext.kakashiKonohaPackageOccurrenceId||""),kakashiSequentialPackageOccurrenceId35100:String(rt.localContext.kakashiKonohaPackageOccurrenceId||""),kakashiPostMiAmtReturnProcessed:true,[CURSOR]:0};
 rt.beatId=AMT_AFTERMATH;save();
 return{...resolved,victory:false,nextBeatId:AMT_AFTERMATH};
}

const BASE_CUES=Object.freeze([
 {kind:"narration",text:"The fight breaks first."},
 {kind:"narration",text:"Kakashi hits the ground and loses the opening."},
 {kind:"narration",text:"ANBU Marked Target does not waste it."},
 {kind:"narration",text:"He moves."},
 {kind:"narration",text:"Fast."},
 {kind:"narration",text:"Not toward Kakashi."},
 {kind:"narration",text:"Toward whatever the committed state says still matters to him."},
 {kind:"narration",text:"Kakashi forces himself upright."},
 {kind:"narration",text:"Too late to stop the escape."},
 {kind:"narration",text:"ANBU Marked Target is already leaving the alley."}
]);
function aftermathCues(rt=active()){
 const pkg=packageState(rt),holder=String(pkg.currentHolderClass||pkg.custodyClass||""),pakkun=String(rt&&rt.localContext&&rt.localContext.kakashiCe256PakkunState||"PRESENT");
 const cues=[...BASE_CUES];
 if(holder==="ANBU_MARKED_TARGET"){
  cues.push({kind:"narration",text:"The package goes with him."},{kind:"narration",text:"Not because he won the Battle."},{kind:"narration",text:"Because the factual package resolver gave him a legitimate opening to reclaim it."});
 }else if(holder==="KAKASHI"){
  cues.push({kind:"narration",text:"The target is gone."},{kind:"narration",text:"The package is not with him."});
  if(pakkun==="GUARDING_PACKAGE"){
   cues.push({kind:"narration",text:"Pakkun has stayed on the exposed objective by his own decision."},{kind:"dialogue",speakerName:"PAKKUN",text:"You kept the important part."},{kind:"dialogue",speakerName:"KAKASHI",text:"I lost him."},{kind:"dialogue",speakerName:"PAKKUN",text:"I noticed."},{kind:"narration",text:"A beat."},{kind:"dialogue",speakerName:"PAKKUN",text:"Both things can be true."});
  }else{
   cues.push({kind:"dialogue",speakerName:"PAKKUN",text:"You kept the important part."},{kind:"dialogue",speakerName:"KAKASHI",text:"I lost him."},{kind:"dialogue",speakerName:"PAKKUN",text:"Also true."});
  }
 }else{
  cues.push({kind:"narration",text:"The target disappears into the village."},{kind:"narration",text:"The package does not go with him."},{kind:"narration",text:"Its real holder and location remain unchanged."},{kind:"dialogue",speakerName:"PAKKUN",text:"He didn't take it."},{kind:"dialogue",speakerName:"KAKASHI",text:"No."},{kind:"dialogue",speakerName:"PAKKUN",text:"Doesn't mean you have it."},{kind:"dialogue",speakerName:"KAKASHI",text:"I know."});
 }
 return cues;
}
function performance35900(rt=active()){
 if(!rt||rt.beatId!==AMT_AFTERMATH)return null;
 const seq=aftermathCues(rt),raw=Number(rt.localContext&&rt.localContext[CURSOR]||0),index=Number.isInteger(raw)?Math.max(0,Math.min(seq.length-1,raw)):0;
 return{sequence:seq,index,cue:seq[index],atEnd:index>=seq.length-1};
}
function installBeat(){
 const def=scene();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_konoha_scene_missing"};
 const beat=normalizedBeat({beatId:AMT_AFTERMATH,mode:"narration",environmentRef:{assetId:"kakashi_origin_pakkun_interception_alley"},text:"The post-Battle package and Pakkun facts resolve before the aftermath is projected.",exitScene:false,allowPresentationClose:false},35900);
 if(!beat)return{success:false,reason:"kakashi_konoha_amt_aftermath_normalize_failed"};
 def.beatMap.set(AMT_AFTERMATH,beat);
 const amtReturn=def.beatMap.get(AMT_RETURN);
 if(!amtReturn)return{success:false,reason:"kakashi_konoha_amt_return_beat_missing"};
 amtReturn.onEnterConsequences=[{requestId:"kakashi_ce256_amt_defeat_consume_35900",kind:"domain",resolve:resolveCe256AmtDefeat}];
 return{success:true,beatId:AMT_AFTERMATH};
}
const installed=installBeat();if(!installed||installed.success!==true)throw new Error("kakashi_konoha_35900_install_failed:"+(installed&&installed.reason||"unknown"));

let hooksInstalled=false,hookAttempts=0;
function installHooks(){
 if(hooksInstalled)return true;
 if(typeof globalThis.advanceStoryScene!=="function"||typeof globalThis.getStoryScenePerformance33900!=="function")return false;
 const PRE_ADVANCE=globalThis.advanceStoryScene,PRE_GET=globalThis.getStoryScenePerformance33900,PRE_RENDER=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
 globalThis.getStoryScenePerformance33900=function getStoryScenePerformance35900(){
  const p=performance35900();return p||PRE_GET.apply(this,arguments);
 };
 globalThis.advanceStoryScene=function advanceStoryScene35900(choiceId=null){
  const rt=active();
  if(rt&&rt.sceneId===SCENE_ID&&REPORT_BEATS.has(String(rt.beatId||""))&&(choiceId===null||choiceId===undefined)){
   rt.beatId=TERMINAL_PENDING;rt.localContext={...(rt.localContext||{}),[CURSOR]:0};save();try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_e){}
   return{success:true,type:"kakashi_konoha_closed_report_to_terminal",beatId:TERMINAL_PENDING,authority:TERMINAL_AUTHORITY};
  }
  if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===AMT_AFTERMATH&&(choiceId===null||choiceId===undefined)){
   const p=performance35900(rt);
   if(p&&!p.atEnd){const next=p.index+1;rt.localContext={...(rt.localContext||{}),[CURSOR]:next};save();try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_e){}return{success:true,type:"kakashi_konoha_ce256_cue_advanced",beatId:AMT_AFTERMATH,cueIndex:next,semanticBeatUnchanged:true};}
   rt.beatId=TERMINAL_PENDING;if(rt.localContext)delete rt.localContext[CURSOR];save();try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_e){}
   return{success:true,type:"kakashi_konoha_ce256_to_terminal",beatId:TERMINAL_PENDING,authority:TERMINAL_AUTHORITY};
  }
  return PRE_ADVANCE.apply(this,arguments);
 };
 try{advanceStoryScene=globalThis.advanceStoryScene;getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;}catch(_e){}
 if(PRE_RENDER){
  globalThis.renderStoryScenePresentationLayer=function renderStoryScenePresentationLayer35900(){return PRE_RENDER.apply(this,arguments);};
  try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_e){}
 }
 hooksInstalled=true;return true;
}
function ensureHooks(){if(installHooks())return;if(typeof setTimeout==="function"&&hookAttempts++<120)setTimeout(ensureHooks,25);}
ensureHooks();

function diagnostics(){
 const def=scene(),amtReturn=def&&def.beatMap instanceof Map?def.beatMap.get(AMT_RETURN):null,aftermath=def&&def.beatMap instanceof Map?def.beatMap.get(AMT_AFTERMATH):null;
 const registered=PROVIDER.getRegisteredStoryFactualBindings().find(row=>row.bindingRef===CE256_BINDING)||null;
 const checks={
  patchId:PATCH_ID==="alpha_kakashi_konoha_closure_35900_v2_2026_09_20",
  writing100Pinned:WRITING_100_AUTHORITY==="21e0407a0c371310ff06096905fd1fce4107ece8",
  ce256AuthorityPinned:CE256_PACKAGE_AUTHORITY==="09db8ff4efc28ee608d41c828af48efc023d324f",
  ce244ClosedAuthorityPinned:CE244_AUTHORITY==="77d351e6f8d4eefaea0f8a6db82dec686391e1c0",
  neutralProviderExact:PROVIDER.providerId==="ce.neutral_story_factual_resolver.v1",
  ce256BindingRegistered:!!registered&&registered.outcomeRefs.join("|")==="AMT_ESCAPE_PACKAGE_UNCHANGED_ELSEWHERE|AMT_ESCAPE_PACKAGE_UNCHANGED_KAKASHI_SIDE|AMT_ESCAPE_PACKAGE_RECLAIMED_BY_AMT",
  noBattlePackageInference:resolveAmtDefeatFacts35900.toString().includes("resolveStoryFactualAction")&&commitCe256Package.toString().includes("battleVictoryDidNotImplyPackageCustody:true"),
  packageBeforePakkunOrdering:resolveAmtDefeatFacts35900.toString().indexOf("resolveStoryFactualAction")<resolveAmtDefeatFacts35900.toString().indexOf("consumePakkunAfterCe256"),
  sharedAmtPakkunConfigsExact:CE256_AMT_BATTLE_CONFIGS.join("|")==="academy_kakashi_origin_battle_seq_amt_pakkun|academy_kakashi_origin_battle_kakashi_pakkun_vs_amt",
  sharedAmtDefeatOwnerExported:typeof resolveAmtDefeatFacts35900==="function"&&resolveAmtDefeatFacts35900.toString().includes("routeRef"),
  pakkunAutonomyConsumed:consumePakkunAfterCe256.toString().includes("consumeNextAutonomy")&&consumePakkunAfterCe256.toString().includes("AK_SA_012"),
  pakkunNoOwnershipLeak:consumePakkunAfterCe256.toString().includes("ownershipGranted:false")&&consumePakkunAfterCe256.toString().includes("nameKnowledgeGranted:false"),
  amtReturnOverridden:!!amtReturn&&Array.isArray(amtReturn.onEnterConsequences)&&amtReturn.onEnterConsequences.some(row=>row&&row.requestId==="kakashi_ce256_amt_defeat_consume_35900"),
  exactAftermathBeat:!!aftermath,
  oldReportStopsSuperseded:globalThis.advanceStoryScene.toString().includes("REPORT_BEATS")&&globalThis.advanceStoryScene.toString().includes("kakashi_konoha_closed_report_to_terminal"),
  terminalStillOwnedBy35100:TERMINAL.patchId&&TERMINAL_PENDING==="kak_seq_debrief_pending",
  browserGoldenClaimed:false
 };
 const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
 return{pass:failed.length===0,checks,failed,ce256Binding:registered,amtAftermathBeatId:AMT_AFTERMATH,browserGoldenClaimed:false};
}

globalThis.resolveAcademyKakashiAmtDefeatFacts35900=resolveAmtDefeatFacts35900;
globalThis.resolveAcademyKakashiCe256AmtDefeat35900=resolveCe256AmtDefeat;
globalThis.runAcademyKakashiKonohaClosure35900Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_KONOHA_CLOSURE_35900=Object.freeze({
 patchId:PATCH_ID,writing100Authority:WRITING_100_AUTHORITY,ce256Authority:CE256_PACKAGE_AUTHORITY,ce244Authority:CE244_AUTHORITY,
 ce256BindingRef:CE256_BINDING,amtAftermathBeatId:AMT_AFTERMATH,amtBattleConfigs:CE256_AMT_BATTLE_CONFIGS,resolveAmtDefeatFacts:resolveAmtDefeatFacts35900,resolveCe256AmtDefeat,diagnostics,browserGoldenClaimed:false
});
})();
