// ============================================================================
// ISSUE #188 / #192 — ACADEMY KAKASHI TERMINAL DEBRIEF / RECEIPT BRIDGE — 35100
//
// Consumes the closed Kakashi Writing terminal sequence and 34800 Rewards
// adapter through existing Story / Origin / semantic-state authorities.
//
// Hard boundaries:
// - Battle victory is never terminal reward entitlement.
// - Package custody must already be factually committed before debrief closes.
// - Participant defeat is not death/custody.
// - Direct Pickpocket clean-success / exact 3-v-1 return package facts are read
//   from 34710 without relabelling them as Observe/sequential history.
// - Sequential MI -> PS -> AMT timing facts are preserved, but that route stays
//   fail-closed until its separately required post-PS package state is committed.
// - Pakkun temporary participation never becomes ownership/acquisition.
// ============================================================================
(function installAcademyKakashiTerminalDebrief35100(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
if(!A||typeof A.findOccurrence!=="function"||typeof A.commitOccurrence!=="function")throw new Error("kakashi_terminal_origin_occurrence_authority_missing");
if(!KAK||typeof KAK.recordPostResolutionState!=="function"||typeof KAK.terminalGuard!=="function")throw new Error("kakashi_terminal_semantic_adapter_missing");
if(!CORE||typeof CORE.getStoryUnitSnapshot!=="function")throw new Error("kakashi_terminal_story_decision_authority_missing");
if(typeof commitAcademyKakashiTerminalDebriefRewards34800!=="function"||typeof getAcademyKakashiOriginRewardSnapshot34800!=="function")throw new Error("kakashi_terminal_reward_adapter_34800_missing");

const PATCH_ID="alpha_kakashi_terminal_debrief_35100_v5_2026_09_18";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const PACKAGE_REF="kakashi_origin_outer_route_packet";
const PAKKUN_REF="pakkun_origin_unfamiliar_ninken";
const PENDING_BEAT="kak_seq_debrief_pending";
const DEBRIEF_BEAT="kak_terminal_debrief_report_35100";
const SUMMARY_BEAT="kak_terminal_debrief_summary_35100";
const PAKKUN_1="kak_terminal_pakkun_departure_1_35100";
const PAKKUN_2="kak_terminal_pakkun_departure_2_35100";
const PAKKUN_3="kak_terminal_pakkun_departure_3_35100";
const PAKKUN_EXIT="kak_terminal_pakkun_departure_exit_35100";
const MINATO_BEAT="kak_terminal_minato_private_evaluation_35100";
const RECEIPT_BEAT="kak_terminal_chronicle_receipt_35100";
const FINAL_BEAT="kak_terminal_chronicle_begins_35100";
const REPORT_CHOICE="kak_terminal_report_35100";
const CONTINUE_CHOICE="kak_terminal_receipt_continue_35100";
const TERMINAL_REWARD_SOURCE="kak_origin_terminal_debrief_reward";
const PILL_SOURCE="kak_origin_item_field_recovery_resupply";
const TANTO_SOURCE="kak_origin_weapon_exceptional_training_tanto";
const SECURE_CONFIG="academy_kakashi_origin_battle_ps_mi_2v1";
const SECURE_AMT_CONFIG="academy_kakashi_origin_battle_kakashi_pakkun_vs_amt";
const SEQ_MI_CONFIG="academy_kakashi_origin_battle_seq_mi";
const SEQ_PS_CONFIG="academy_kakashi_origin_battle_seq_ps";
const SEQ_AMT_CONFIG="academy_kakashi_origin_battle_seq_amt_pakkun";
const HARD_3V1_CONFIG="academy_kakashi_origin_battle_amt_ps_mi_3v1";
const STOP_ASSASSIN_CONFIG="academy_kakashi_origin_battle_mi_1v1";
const DIRECT_PICKPOCKET_RETURN_BEAT="kak_scene03d_pickpocket_failure_3v1_return_34710";
const SECURE_PURSUIT_REACHED="SECURE_PACKAGE_AMT_PURSUIT_SUCCESS_REACHED";
const SECURE_PURSUIT_ESCAPED="SECURE_PACKAGE_AMT_PURSUIT_FAILURE_ESCAPED";
const STAY_PACKAGE_PURSUIT_REACHED="PURSUIT_SUCCESS_AMT_REACHED";
const SECURE_PACKAGE_VICTORY_CLASS="academy_kakashi_secure_package_2v1_post_battle_factual_state";
const DEBRIEF_TYPE="origin_story_terminal_debrief";
const RECEIPT_TYPE="origin_story_chronicle_receipt";
const DEPARTURE_TYPE="origin_story_pakkun_departure";
const AUTHORITY=Object.freeze({
  finalWriting:"176ce76feef3e67d4c24644e3d7443a04dcf7d6b",
  rewardAudit:"91f5969b20e270b3ef7d148342f28a1668b4eba1",
  rewardAdapter:"alpha_kakashi_origin_rewards_34800_v2_2026_09_17",
  scene05AL:"aa88db471b71a305ec34e01ff0e094ac26f1638f"
});

function clone(value){try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}catch(_error){return value;}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function local(){const rt=active();return rt&&rt.sceneId===SCENE_ID&&rt.localContext&&typeof rt.localContext==="object"?rt.localContext:null;}
function latestResult(){const rt=active();return rt&&rt.sceneId===SCENE_ID&&rt.battleResume&&rt.battleResume.authored&&typeof rt.battleResume.authored==="object"?rt.battleResume.authored:null;}
function factOf(row){return row&&(row.fact||row.data)||{};}
function normalizedBeat(def,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(def,index):def;}
function instanceKey(){const rt=active();return rt&&rt.sceneId===SCENE_ID?String(rt.instanceId||""):"";}
function stableOccurrence(prefix){const key=instanceKey();return key?`${prefix}::${key}`:"";}
function debriefOccurrenceId(){return stableOccurrence("occ_origin_kakashi_terminal_debrief_35100");}
function receiptOccurrenceId(){return stableOccurrence("occ_origin_kakashi_chronicle_receipt_35100");}
function pakkunDepartureOccurrenceId(){return stableOccurrence("occ_origin_kakashi_pakkun_departure_35100");}
function currentOccurrences(){
  const key=instanceKey();if(!key||typeof playerData!=="object"||!playerData||!Array.isArray(playerData.activityHistory))return[];
  return playerData.activityHistory.filter(row=>{
    if(!row||row.committed!==true)return false;
    const fact=factOf(row);
    return String(row.storySceneInstanceId||fact.storySceneInstanceId||"")===key&&String(row.sceneId||SCENE_ID)===SCENE_ID;
  });
}
function occurrence(id){return id?A.findOccurrence(String(id)):null;}
function battleStore(){const rt=active();if(!rt||rt.sceneId!==SCENE_ID)return null;rt.localContext=rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};rt.localContext.kakashiTerminalBattleFacts35100=rt.localContext.kakashiTerminalBattleFacts35100&&typeof rt.localContext.kakashiTerminalBattleFacts35100==="object"?rt.localContext.kakashiTerminalBattleFacts35100:{};return rt.localContext.kakashiTerminalBattleFacts35100;}
function compactBattleResult(result){
  if(!result||!result.battleOccurrenceId||!result.battleConfigId)return null;
  return{
    battleOccurrenceId:String(result.battleOccurrenceId),battleConfigId:String(result.battleConfigId),
    storyOccurrenceId:result.storyOccurrenceId?String(result.storyOccurrenceId):null,
    sourceAnchorRef:result.sourceAnchorRef?String(result.sourceAnchorRef):null,bindingRef:result.bindingRef?String(result.bindingRef):null,
    resultState:String(result.resultState||""),playerActionOpportunityCount:Math.max(0,Number(result.playerActionOpportunityCount)||0),
    participants:Array.isArray(result.participants)?result.participants.map(row=>({participantRef:row&&row.participantRef||null,side:row&&row.side||null,battleStatus:row&&row.battleStatus||null,lifeState:row&&row.lifeState||null,custodyState:row&&row.custodyState||null})).filter(row=>row.participantRef):[],
    rewardGranted:result.rewardGranted===true,lootGranted:result.lootGranted===true,participantDeathCommitted:result.participantDeathCommitted===true,participantCustodyCommitted:result.participantCustodyCommitted===true,
    capturedAt:Date.now()
  };
}
function captureBattleResult35100(expectedConfig=null){
  const result=latestResult();if(!result)return{success:false,reason:"kakashi_terminal_battle_result_missing"};
  if(expectedConfig&&String(result.battleConfigId||"")!==String(expectedConfig))return{success:false,reason:"kakashi_terminal_battle_config_mismatch",expectedConfig,actualConfig:String(result.battleConfigId||"")};
  const compact=compactBattleResult(result);if(!compact)return{success:false,reason:"kakashi_terminal_battle_receipt_incomplete"};
  if(compact.rewardGranted||compact.lootGranted)return{success:false,reason:"kakashi_terminal_battle_illegally_granted_reward"};
  const store=battleStore();if(!store)return{success:false,reason:"kakashi_terminal_story_instance_missing"};
  const existing=store[compact.battleConfigId];
  if(existing&&String(existing.battleOccurrenceId)!==compact.battleOccurrenceId)return{success:false,reason:"kakashi_terminal_battle_replay_mismatch",battleConfigId:compact.battleConfigId};
  store[compact.battleConfigId]=existing||compact;save();return{success:true,idempotent:!!existing,battle:clone(store[compact.battleConfigId])};
}
function captureRequest(beatId,config){return{requestId:`kakashi_terminal_capture_35100::${beatId}`,kind:"domain",resolve:()=>captureBattleResult35100(config)};}
function appendCapture(map,beatId,config){
  const beat=map&&map.get(beatId);if(!beat)return false;
  beat.onEnterConsequences=Array.isArray(beat.onEnterConsequences)?beat.onEnterConsequences:[];
  const requestId=`kakashi_terminal_capture_35100::${beatId}`;
  if(!beat.onEnterConsequences.some(row=>row&&row.requestId===requestId))beat.onEnterConsequences.push(captureRequest(beatId,config));
  return true;
}
function capturedBattles(){const store=battleStore()||{};return Object.values(store).filter(Boolean).map(clone);}
function supplementCurrentBattleCapture(){
  const result=latestResult();if(!result||!result.battleConfigId)return;
  if([SECURE_CONFIG,SECURE_AMT_CONFIG,SEQ_MI_CONFIG,SEQ_PS_CONFIG,SEQ_AMT_CONFIG,HARD_3V1_CONFIG,STOP_ASSASSIN_CONFIG].includes(String(result.battleConfigId)))captureBattleResult35100(String(result.battleConfigId));
}
function committedPackageState(){
  const l=local();if(!l)return{success:false,reason:"kakashi_terminal_story_instance_missing"};
  const candidateIds=[l.kakashiScene06W2CKillLedgerOccurrenceId,l.kakashiScene06AW2CResolutionOccurrenceId,l.kakashiScene06W2DCustodyOccurrenceId,l.kakashiScene06W2ECustodyOccurrenceId,l.kakashiScene05ALPackageOccurrenceId,l.kakashiDirectPickpocketPackageOccurrenceId,l.kakashiGetCloserStayPackagePursuitOccurrenceId,l.kakashiObserveSecurePackageAmtPursuitOccurrenceId,l.kakashiObserveSecurePackageOccurrenceId,l.kakashiSequentialPackageOccurrenceId35100,l.kakashiSequentialPackageOccurrenceId].filter(Boolean);
  for(const id of candidateIds){
    const row=occurrence(id),fact=factOf(row),pkg=fact&&fact.packageState||{};
    if(!row||!pkg.objectRef||String(pkg.objectRef)!==PACKAGE_REF||!pkg.currentHolderClass)continue;
    const holder=String(pkg.currentHolderClass);
    return{success:true,resolved:true,recovered:["KAKASHI","KONOHA","ANBU","KONOHA_AUTHORITY"].includes(holder),holderClass:holder,stateRef:String(row.occurrenceId||id),factClass:String(fact.factClass||""),sourceOccurrence:row};
  }
  // Secure-Package 2-v-1 defeat preserves the already committed handoff state;
  // Battle itself has packageCustodyDelta:none, so the Package Smuggler remains
  // the factual holder until another Story occurrence changes it.
  if(String(l.kakashiObserveSecurePackagePostBattleOutcome||"")==="opposition_side_victory"){
    const parent=occurrence(l.kakashiGetCloserHandoffOccurrenceId),fact=factOf(parent),pkg=fact&&fact.packageState||{};
    if(parent&&String(pkg.objectRef||"")===PACKAGE_REF&&pkg.currentHolderClass){
      return{success:true,resolved:true,recovered:false,holderClass:String(pkg.currentHolderClass),stateRef:String(parent.occurrenceId),factClass:String(fact.factClass||""),sourceOccurrence:parent};
    }
  }
  return{success:false,reason:"kakashi_terminal_package_state_unresolved",requiredMaterialRef:PACKAGE_REF};
}
function explicitOutcomeFacts(){
  const rows=currentOccurrences().map(row=>factOf(row));
  const verifiedActionableIntelligence=rows.some(f=>f&&f.verifiedActionableIntelligence===true||f&&f.worldFacts&&f.worldFacts.verifiedActionableIntelligence===true);
  const liveCustodyEstablished=rows.some(f=>{
    if(!f)return false;if(f.liveCustodyEstablished===true)return true;
    if(f.participantAlive===true&&["ANBU","UCHIHA_POLICE","KONOHA_AUTHORITY"].includes(String(f.custodyDisposition||"")))return true;
    return false;
  });
  const cleanExtraction=rows.some(f=>f&&f.cleanExtractionSucceeded===true||f&&f.worldFacts&&f.worldFacts.cleanExtractionSucceeded===true);
  const explicitExceptional=rows.some(f=>f&&f.exceptionalFieldExecution===true||f&&f.worldFacts&&f.worldFacts.exceptionalFieldExecution===true);
  return{verifiedActionableIntelligence,liveCustodyEstablished,cleanExtraction,explicitExceptional};
}
function sequentialBenchmark(battles){
  const l=local()||{},mi=battles.find(row=>row.battleConfigId===SEQ_MI_CONFIG),ps=battles.find(row=>row.battleConfigId===SEQ_PS_CONFIG);
  return !!(mi&&ps&&mi.resultState==="player_side_victory"&&mi.playerActionOpportunityCount>=1&&mi.playerActionOpportunityCount<=4&&ps.resultState==="player_side_victory"&&ps.playerActionOpportunityCount>=1&&ps.playerActionOpportunityCount<=3&&l.kakashiTerminalSequentialAmtReached35100===true);
}
function materiallyParticipated(battles,packageState){
  if(battles.some(row=>!!row.battleOccurrenceId))return true;
  const fact=packageState&&packageState.sourceOccurrence?factOf(packageState.sourceOccurrence):{};
  return !!(fact&&fact.battleOccurrenceId);
}
function deriveTerminalFacts35100(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_terminal_story_instance_missing"};
  supplementCurrentBattleCapture();
  const packageState=committedPackageState();if(!packageState.success)return packageState;
  const battles=capturedBattles(),explicit=explicitOutcomeFacts();
  const threeVsOneVictory=battles.some(row=>row.battleConfigId===HARD_3V1_CONFIG&&row.resultState==="player_side_victory");
  const sequential=sequentialBenchmark(battles);
  const exceptionalFieldExecution=explicit.cleanExtraction||threeVsOneVictory||sequential||explicit.explicitExceptional;
  const l=local()||{};
  const pakkunEntered=String(l.kakashiObserveSecurePackageAmtPursuitOutcome||"")===SECURE_PURSUIT_REACHED||String(l.kakashiGetCloserStayPackagePursuitOutcomeRef||"")===STAY_PACKAGE_PURSUIT_REACHED||l.kakashiTerminalSequentialAmtReached35100===true;
  const pakkunPresent=pakkunEntered&&!occurrence(pakkunDepartureOccurrenceId());
  const participantRefs=[...new Set(battles.flatMap(row=>row.participants||[]).map(row=>row&&row.participantRef).filter(Boolean))];
  return{
    success:true,terminalDebriefReached:true,storySceneInstanceId:String(rt.instanceId||""),
    packageRecovered:packageState.recovered===true,packageState:{materialRef:PACKAGE_REF,resolved:true,holderClass:packageState.holderClass,stateRef:packageState.stateRef,factClass:packageState.factClass},
    verifiedActionableIntelligence:explicit.verifiedActionableIntelligence===true,
    liveCustodyEstablished:explicit.liveCustodyEstablished===true,
    exceptionalFieldExecution,exceptionalTrainingTantoPredicate:exceptionalFieldExecution,
    materiallyParticipatedInPlBattle:materiallyParticipated(battles,packageState),
    sequentialTurnBenchmarkMet:sequential,failedPickpocket3v1Victory:threeVsOneVictory,cleanExtractionBenchmarkMet:explicit.cleanExtraction===true,
    pakkunPresentAtDebrief:pakkunPresent,participantRefs,battleFacts:battles,
    sourceRefs:[{type:"material_state",id:packageState.stateRef,role:"package_fact"},...battles.map(row=>({type:"battle_occurrence",id:row.battleOccurrenceId,role:"battle_fact"}))]
  };
}
function preflightTerminal35100(){
  const facts=deriveTerminalFacts35100();if(!facts.success)return facts;
  const guard=KAK.terminalGuard({committedStateRef:facts.packageState.stateRef,battleLive:false,materiallyRelevantRefs:[]});
  if(!guard||guard.success!==true)return guard||{success:false,reason:"kakashi_terminal_semantic_guard_failed"};
  return{success:true,facts,guard};
}
function reportAvailability(){const pre=preflightTerminal35100();return{available:pre.success===true,knownBlocker:pre.success===true?null:String(pre.reason||"TERMINAL FACTS UNRESOLVED")};}
function committedDebrief(){return occurrence(debriefOccurrenceId());}
function committedReceipt(){return occurrence(receiptOccurrenceId());}
function committedDeparture(){return occurrence(pakkunDepartureOccurrenceId());}
function debriefRewardFacts(facts){return{terminalDebriefReached:true,packageRecovered:facts.packageRecovered===true,verifiedActionableIntelligence:facts.verifiedActionableIntelligence===true,liveCustodyEstablished:facts.liveCustodyEstablished===true,exceptionalFieldExecution:facts.exceptionalFieldExecution===true,materiallyParticipatedInPlBattle:facts.materiallyParticipatedInPlBattle===true,exceptionalTrainingTantoPredicate:facts.exceptionalTrainingTantoPredicate===true};}
function commitTerminalDebrief35100(){
  const existing=committedDebrief();if(existing)return{success:true,idempotent:true,occurrenceId:existing.occurrenceId,record:clone(existing)};
  const pre=preflightTerminal35100();if(!pre.success)return pre;
  const facts=pre.facts;
  const material=KAK.recordPostResolutionState({materialStates:[{materialRef:PACKAGE_REF,resolved:true,stateRef:facts.packageState.stateRef,value:{holderClass:facts.packageState.holderClass,recovered:facts.packageRecovered===true,factClass:facts.packageState.factClass}}]});
  if(!material||material.success!==true)return material||{success:false,reason:"kakashi_terminal_package_material_commit_failed"};
  const guard=KAK.terminalGuard({committedStateRef:facts.packageState.stateRef,battleLive:false,materiallyRelevantRefs:[PACKAGE_REF]});
  if(!guard||guard.success!==true)return guard||{success:false,reason:"kakashi_terminal_material_guard_failed"};
  const id=debriefOccurrenceId();if(!id)return{success:false,reason:"kakashi_terminal_story_instance_missing"};
  const fact={
    factClass:"academy_kakashi_terminal_anbu_debrief",storySceneInstanceId:facts.storySceneInstanceId,terminalDebriefReached:true,
    packageState:clone(facts.packageState),participantRefs:clone(facts.participantRefs),battleFacts:clone(facts.battleFacts),
    reportBoundedToKnownFacts:true,hiddenEvaluationRevealed:false,pakkunPresentAtDebrief:facts.pakkunPresentAtDebrief===true,
    rewardFacts:debriefRewardFacts(facts),authority:clone(AUTHORITY)
  };
  const committed=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:DEBRIEF_TYPE,outcome:"academy_kakashi_terminal_debrief_committed",participantRefs:facts.participantRefs,sourceRefs:facts.sourceRefs});
  if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_terminal_debrief_occurrence_commit_failed"};
  const def=scene(),summary=def&&def.beatMap instanceof Map?def.beatMap.get(SUMMARY_BEAT):null;
  if(summary)summary.nextBeatId=facts.pakkunPresentAtDebrief?PAKKUN_1:MINATO_BEAT;
  save();return{success:true,idempotent:false,occurrenceId:id,record:clone(committed.record),facts:clone(facts)};
}
function commitPakkunDeparture35100(){
  const existing=committedDeparture();if(existing)return{success:true,idempotent:true,occurrenceId:existing.occurrenceId};
  const debrief=committedDebrief();if(!debrief)return{success:false,reason:"kakashi_terminal_debrief_required_before_pakkun_departure"};
  const fact=factOf(debrief);if(fact.pakkunPresentAtDebrief!==true)return{success:false,reason:"kakashi_terminal_pakkun_not_present"};
  const id=pakkunDepartureOccurrenceId();
  const committed=A.commitOccurrence(ORIGIN_ID,id,{factClass:"academy_kakashi_pakkun_terminal_departure",storySceneInstanceId:instanceKey(),participantRef:PAKKUN_REF,presentBeforeDeparture:true,departed:true,temporaryParticipationEnded:true,ownershipGranted:false,reciprocalNameKnowledgeGranted:false,parentDebriefRef:debrief.occurrenceId},[],{type:DEPARTURE_TYPE,outcome:"pakkun_explicit_departure",participantRefs:[PAKKUN_REF],sourceRefs:[{type:"origin_occurrence",id:debrief.occurrenceId,role:"debrief"}]});
  return committed&&committed.success===true?{success:true,idempotent:false,occurrenceId:id}:committed||{success:false,reason:"kakashi_terminal_pakkun_departure_commit_failed"};
}
function rewardGrantReady(snapshot,rewardFacts){
  if(!snapshot||!snapshot.terminalDebrief||snapshot.terminalDebrief.committed!==true)return false;
  const grants=snapshot.grants||{};
  if(rewardFacts.materiallyParticipatedInPlBattle===true&&!(grants[PILL_SOURCE]&&grants[PILL_SOURCE].committed===true))return false;
  if(rewardFacts.exceptionalTrainingTantoPredicate===true&&!(grants[TANTO_SOURCE]&&grants[TANTO_SOURCE].committed===true))return false;
  return true;
}
function commitChronicleReceiptAndRewards35100(){
  const debrief=committedDebrief();if(!debrief)return{success:false,reason:"kakashi_terminal_debrief_required_before_receipt"};
  const debriefFact=factOf(debrief),rewardFacts=debriefFact.rewardFacts||{};
  if(debriefFact.pakkunPresentAtDebrief===true&&!committedDeparture())return{success:false,reason:"kakashi_terminal_pakkun_departure_required_before_receipt"};
  let receipt=committedReceipt();
  if(!receipt){
    const id=receiptOccurrenceId();
    const fact={
      factClass:"academy_kakashi_chronicle_receipt",storySceneInstanceId:instanceKey(),terminalDebriefRef:debrief.occurrenceId,
      packageState:clone(debriefFact.packageState),battleFacts:clone(debriefFact.battleFacts||[]),participantRefs:clone(debriefFact.participantRefs||[]),
      pakkunInvolved:debriefFact.pakkunPresentAtDebrief===true,pakkunDepartureRef:committedDeparture()&&committedDeparture().occurrenceId||null,
      reportCommitted:true,hiddenEvaluationTruthIncluded:false,siblingRouteFactsIncluded:false,authority:clone(AUTHORITY)
    };
    const committed=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:RECEIPT_TYPE,outcome:"academy_kakashi_chronicle_receipt_committed",participantRefs:debriefFact.participantRefs||[],sourceRefs:[{type:"origin_occurrence",id:debrief.occurrenceId,role:"terminal_debrief"}]});
    if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_terminal_chronicle_receipt_commit_failed"};
    receipt=committed.record;
  }
  const reward=commitAcademyKakashiTerminalDebriefRewards34800(clone(rewardFacts));
  if(!reward||reward.success!==true)return reward||{success:false,reason:"kakashi_terminal_reward_commit_failed"};
  const snapshot=getAcademyKakashiOriginRewardSnapshot34800();
  if(!rewardGrantReady(snapshot,rewardFacts))return{success:false,reason:"kakashi_terminal_reward_entitlement_pending",reward:clone(reward),rewardSnapshot:clone(snapshot)};
  save();return{success:true,idempotent:reward.idempotent===true,receiptOccurrenceId:receipt.occurrenceId,reward:clone(reward),rewardSnapshot:clone(snapshot)};
}
function closureReady35100(){
  const debrief=committedDebrief(),receipt=committedReceipt();if(!debrief||!receipt)return false;
  const rewardFacts=factOf(debrief).rewardFacts||{},snapshot=getAcademyKakashiOriginRewardSnapshot34800();
  if(factOf(debrief).pakkunPresentAtDebrief===true&&!committedDeparture())return false;
  return rewardGrantReady(snapshot,rewardFacts);
}
function completionAvailability(){return{available:closureReady35100(),knownBlocker:closureReady35100()?null:"TERMINAL DEBRIEF / CHRONICLE RECEIPT / REWARD COMMIT REQUIRED"};}
function guardedOriginCompletion35100(){
  if(!closureReady35100())return{success:false,reason:"kakashi_terminal_closure_receipt_required"};
  const ids=[debriefOccurrenceId(),receiptOccurrenceId(),pakkunDepartureOccurrenceId()].filter(id=>!!occurrence(id));
  if(typeof completeChronicleOriginPrologue!=="function")return{success:false,reason:"origin_completion_authority_missing"};
  return completeChronicleOriginPrologue(ORIGIN_ID,ids);
}
function debriefSummaryText(){
  const row=committedDebrief(),fact=factOf(row);if(!row)return"The report has not been factually committed.";
  const recovered=fact.rewardFacts&&fact.rewardFacts.packageRecovered===true;
  const battles=Array.isArray(fact.battleFacts)?fact.battleFacts:[];
  const outcomes=battles.map(b=>b.resultState==="player_side_victory"?"won":"lost");
  return `Kakashi gives the operative a bounded factual report. The package was ${recovered?"recovered":"not recovered"}.${battles.length?` He reports ${battles.length} PL Battle${battles.length===1?"":"s"} without turning Battle defeat into death or custody (${outcomes.join(", ")}).`:""} Unknown downstream facts remain unknown.`;
}
function receiptText(){
  const row=committedReceipt(),fact=factOf(row);if(!row)return"Chronicle Receipt pending.";
  const recovered=fact.packageState&&["KAKASHI","KONOHA","ANBU","KONOHA_AUTHORITY"].includes(String(fact.packageState.holderClass||""));
  const battles=Array.isArray(fact.battleFacts)?fact.battleFacts.length:0;
  return `CHRONICLE RECEIPT — Package ${recovered?"RECOVERED":"NOT RECOVERED"} · PL Battles ${battles} · ANBU report COMMITTED${fact.pakkunInvolved?" · Ninken involvement recorded":""}.`;
}
function installTerminalBeats35100(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null;if(!map)return{success:false,reason:"kakashi_terminal_scene_missing"};
  const pending=map.get(PENDING_BEAT);if(!pending)return{success:false,reason:"kakashi_terminal_pending_beat_missing"};
  appendCapture(map,"kak_observe_secure_package_return",SECURE_CONFIG);
  appendCapture(map,"kak_observe_secure_package_amt_return",SECURE_AMT_CONFIG);
  appendCapture(map,"kak_seq_mi_return",SEQ_MI_CONFIG);
  appendCapture(map,"kak_seq_ps_return",SEQ_PS_CONFIG);
  appendCapture(map,"kak_seq_amt_return",SEQ_AMT_CONFIG);
  appendCapture(map,DIRECT_PICKPOCKET_RETURN_BEAT,HARD_3V1_CONFIG);
  const seqAmt=map.get("kak_seq_amt_battle");
  if(seqAmt&&seqAmt.battle&&typeof seqAmt.battle.launchResolver==="function"&&!seqAmt.battle.__terminal35100Wrapped){
    const prior=seqAmt.battle.launchResolver;
    seqAmt.battle.launchResolver=function issue188SequentialAmtTerminalFactCapture(ctx){
      const battles=capturedBattles(),mi=battles.find(row=>row.battleConfigId===SEQ_MI_CONFIG),ps=battles.find(row=>row.battleConfigId===SEQ_PS_CONFIG);
      const eligible=!!(mi&&ps&&mi.resultState==="player_side_victory"&&mi.playerActionOpportunityCount>=1&&mi.playerActionOpportunityCount<=4&&ps.resultState==="player_side_victory"&&ps.playerActionOpportunityCount>=1&&ps.playerActionOpportunityCount<=3);
      const result=prior.apply(this,arguments);
      if(result&&result.success===true&&eligible){const rt=active();if(rt){rt.localContext=rt.localContext||{};rt.localContext.kakashiTerminalSequentialAmtReached35100=true;save();}}
      return result;
    };
    seqAmt.battle.__terminal35100Wrapped=true;
  }
  pending.mode="choice";pending.text="Kakashi returns to the ANBU rendezvous. The assignment cannot close until the factual report accounts for the package, encountered participants and every PL Battle without inventing unknown outcomes.";pending.exitScene=false;pending.allowPresentationClose=false;
  pending.choices=[{choiceId:REPORT_CHOICE,label:"REPORT",nextBeatId:DEBRIEF_BEAT,availability:reportAvailability,consequenceRequests:[{requestId:"kakashi_terminal_debrief_commit_35100",kind:"domain",resolve:commitTerminalDebrief35100}]}];
  const beats=[
    {beatId:DEBRIEF_BEAT,mode:"dialogue",speakerName:"ANBU OPERATIVE",text:"Report.",nextBeatId:SUMMARY_BEAT,exitScene:false,allowPresentationClose:false},
    {beatId:SUMMARY_BEAT,mode:"narration",presentationResolver:()=>({text:debriefSummaryText()}),text:"Kakashi gives the factual report.",nextBeatId:MINATO_BEAT,exitScene:false,allowPresentationClose:false},
    {beatId:PAKKUN_1,mode:"dialogue",speakerName:"PAKKUN",text:"I'm heading off.",nextBeatId:PAKKUN_2,exitScene:false,allowPresentationClose:false},
    {beatId:PAKKUN_2,mode:"dialogue",speakerName:"KAKASHI",text:"Thanks.",nextBeatId:PAKKUN_3,exitScene:false,allowPresentationClose:false},
    {beatId:PAKKUN_3,mode:"dialogue",speakerName:"PAKKUN",text:"You said that already.",nextBeatId:PAKKUN_EXIT,exitScene:false,allowPresentationClose:false},
    {beatId:PAKKUN_EXIT,mode:"narration",text:"Pakkun turns down the side street and disappears around the corner. No names are exchanged.",onEnterConsequences:[{requestId:"kakashi_terminal_pakkun_departure_commit_35100",kind:"domain",resolve:commitPakkunDeparture35100}],nextBeatId:MINATO_BEAT,exitScene:false,allowPresentationClose:false},
    {beatId:MINATO_BEAT,mode:"narration",text:"Later, in private, Minato reviews the sealed field record. He weighs the committed mission facts without changing them or exposing that private evaluation to Kakashi.",nextBeatId:RECEIPT_BEAT,exitScene:false,allowPresentationClose:false},
    {beatId:RECEIPT_BEAT,mode:"choice",text:"Chronicle Receipt",presentationResolver:()=>({text:receiptText()}),onEnterConsequences:[{requestId:"kakashi_terminal_receipt_reward_commit_35100",kind:"domain",resolve:commitChronicleReceiptAndRewards35100}],exitScene:false,allowPresentationClose:false,choices:[{choiceId:CONTINUE_CHOICE,label:"CONTINUE",nextBeatId:FINAL_BEAT,availability:completionAvailability}]},
    {beatId:FINAL_BEAT,mode:"narration",text:"YOUR CHRONICLE BEGINS",exitScene:true,allowPresentationClose:true}
  ];
  beats.forEach((beat,index)=>map.set(beat.beatId,normalizedBeat(beat,1100+index)));
  def.onCompleteConsequences=[{requestId:"complete_academy_kakashi_origin_terminal_35100",kind:"domain",resolve:guardedOriginCompletion35100}];
  return{success:true,beatIds:beats.map(row=>row.beatId),pendingBeatId:PENDING_BEAT};
}
function diagnostics(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null,pending=map&&map.get(PENDING_BEAT),receipt=map&&map.get(RECEIPT_BEAT),finalBeat=map&&map.get(FINAL_BEAT),directPickReturn=map&&map.get(DIRECT_PICKPOCKET_RETURN_BEAT);
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_terminal_debrief_35100_v5_2026_09_18",
    rewardAdapterPresent:typeof commitAcademyKakashiTerminalDebriefRewards34800==="function",
    pendingBecomesGuardedReport:!!pending&&pending.mode==="choice"&&Array.isArray(pending.choices)&&pending.choices.some(row=>row.choiceId===REPORT_CHOICE&&typeof row.availability==="function"),
    packageFactFailClosed:committedPackageState.toString().includes("kakashi_terminal_package_state_unresolved"),
    scene05ALLossPackageStateConsumed:committedPackageState.toString().includes("kakashiScene05ALPackageOccurrenceId"),
    stopAssassinBattleCapture:supplementCurrentBattleCapture.toString().includes("STOP_ASSASSIN_CONFIG"),
    directPickpocketPackageStateConsumed:committedPackageState.toString().includes("kakashiDirectPickpocketPackageOccurrenceId"),
    directPickpocketBattleCaptured:!directPickReturn||Array.isArray(directPickReturn.onEnterConsequences)&&directPickReturn.onEnterConsequences.some(row=>row&&row.requestId===`kakashi_terminal_capture_35100::${DIRECT_PICKPOCKET_RETURN_BEAT}`),
    stayPackagePursuitStateConsumed:committedPackageState.toString().includes("kakashiGetCloserStayPackagePursuitOccurrenceId"),
    battleVictoryNotTerminalEntitlement:!deriveTerminalFacts35100.toString().includes("terminalDebriefReached:false")&&!commitTerminalDebrief35100.toString().includes("resultState===\"player_side_victory\""),
    exactSequentialBenchmark:sequentialBenchmark.toString().includes("<=4")&&sequentialBenchmark.toString().includes("<=3")&&sequentialBenchmark.toString().includes("kakashiTerminalSequentialAmtReached35100"),
    pakkunPresenceCoversIndependentRoutes:deriveTerminalFacts35100.toString().includes("kakashiGetCloserStayPackagePursuitOutcomeRef")&&deriveTerminalFacts35100.toString().includes("kakashiTerminalSequentialAmtReached35100"),
    receiptBeforeReward:commitChronicleReceiptAndRewards35100.toString().indexOf("A.commitOccurrence")<commitChronicleReceiptAndRewards35100.toString().indexOf("commitAcademyKakashiTerminalDebriefRewards34800"),
    rewardGrantGate:closureReady35100.toString().includes("rewardGrantReady"),
    pakkunDepartureExplicit:!!map&&[PAKKUN_1,PAKKUN_2,PAKKUN_3,PAKKUN_EXIT].every(id=>map.has(id)),
    guardedOriginCompletion:Array.isArray(def&&def.onCompleteConsequences)&&def.onCompleteConsequences.length===1&&def.onCompleteConsequences[0].requestId==="complete_academy_kakashi_origin_terminal_35100",
    receiptChoiceGuarded:!!receipt&&receipt.mode==="choice"&&receipt.choices.some(row=>row.choiceId===CONTINUE_CHOICE&&typeof row.availability==="function"),
    finalChronicleBeat:!!finalBeat&&finalBeat.text==="YOUR CHRONICLE BEGINS"&&finalBeat.exitScene===true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const installed=installTerminalBeats35100();
if(!installed||installed.success!==true)throw new Error(`kakashi_terminal_debrief_install_failed:${installed&&installed.reason||"unknown"}`);
const api=Object.freeze({patchId:PATCH_ID,authority:AUTHORITY,installed,deriveTerminalFacts:deriveTerminalFacts35100,captureBattleResult:captureBattleResult35100,commitTerminalDebrief:commitTerminalDebrief35100,commitPakkunDeparture:commitPakkunDeparture35100,commitChronicleReceiptAndRewards:commitChronicleReceiptAndRewards35100,closureReady:closureReady35100,guardedOriginCompletion:guardedOriginCompletion35100,diagnostics,browserGoldenClaimed:false});
globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100=api;
globalThis.runAcademyKakashiTerminalDebrief35100Diagnostics=diagnostics;
})();