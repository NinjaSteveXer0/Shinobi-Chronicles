// ============================================================================
// ACADEMY KAKASHI V2 — CLEAN-ROOM STORY / STATE CORE — 36020
//
// No DOM. No card positioning. No animation.
// Story decides what happened; this module owns only the Academy Kakashi V2
// route/state contract and delegates Battle/presentation to their owners.
// ============================================================================
(function installAcademyKakashiV2Core36020(){
"use strict";
if(globalThis.SC_ACADEMY_KAKASHI_V2_CORE_36020)return;

const PATCH_ID="academy_kakashi_v2_core_36020_2026_09_22";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const ORIGIN_ID="academy_kakashi";
const AMT="academy_kakashi_origin_amt",PS="academy_kakashi_origin_package_smuggler",MI="academy_kakashi_origin_masked_interceptor",PAKKUN="pakkun_origin_unfamiliar_ninken";
const STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS=3;
const D=globalThis.SC_STORY_DECISION_REALISATION_34000;
const F=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
const WCAT=globalThis.SC_ACADEMY_KAKASHI_V2_CONTENT_36000;
const WG=globalThis.SC_ACADEMY_KAKASHI_WRITING_GOLDEN_36100;
const E=globalThis.SC_ALPHA_SPECIAL_JONIN_EVIDENCE_PRODUCER_34700;
if(!D||!F||!WCAT||!WG||!E)throw new Error("kakashi_v2_requires_story_decision_factual_evidence_and_authoritative_content");
function G(sectionKey){return Object.freeze(WG.get(sectionKey).map(cleanWrittenCue));}
function cleanWrittenCue(row){
  const next={...(row||{})};
  if(next.kind==="dialogue"&&typeof next.text==="string")next.text=next.text.replace(/^“/,"").replace(/”$/,"");
  return Object.freeze(next);
}
function W(routeKey,sectionKey){return Object.freeze(WCAT.get(routeKey,sectionKey).map(cleanWrittenCue));}
function WC(...sets){return Object.freeze(sets.flatMap(([routeKey,sectionKey])=>W(routeKey,sectionKey)));}

const B=Object.freeze({
 rooftop:"Kakashi Origin Backdrop/rooftop_night.png",
 alley:"Kakashi Origin Backdrop/konoha_alleyway.png",
 alleyAlt:"Kakashi Origin Backdrop/konoha_alleyway_alt_night.png",
 endAlley:"Kakashi Origin Backdrop/end_of_alleyway.png",
 sakura:"Kakashi Origin Backdrop/sakura_tree_night.png",
 fight:"Kakashi Origin Backdrop/fight_at_sakura_tree.png",
 intercept:"Kakashi Origin Backdrop/alleyway_konoha_night.png",
 police:"Kakashi Origin Backdrop/uchiha_police_exterior_night.png",
 hokage:"Kakashi Origin Backdrop/hokage_administration_interior_night.png"
});
const A=Object.freeze({
 kakashi:Object.freeze({id:ORIGIN_ID,label:"KAKASHI",image:"Assets/Academy Student/academy_kakashi.png"}),
 anbu:Object.freeze({id:"konoha_anbu_operational_contact",label:"ANBU OPERATIVE",image:"NPC/konoha_anbu.png"}),
 amt:Object.freeze({id:AMT,label:"ANBU MARKED TARGET",image:"NPC/anbu_marked_target.png"}),
 ps:Object.freeze({id:PS,label:"PACKAGE SMUGGLER",image:"NPC/package_smuggler.png"}),
 mi:Object.freeze({id:MI,label:"MASKED INTERCEPTOR",image:"NPC/masked_interceptor.png"}),
 pakkun:Object.freeze({id:PAKKUN,label:"PAKKUN",image:"Assets/Summons/pakkun.png"}),
 minato:Object.freeze({id:"kage_minato",label:"MINATO",image:"Assets/Kage/kage_minato.png"}),
 policeMiMale:Object.freeze({id:"kakashi_upf_mi_male",label:"UCHIHA POLICE OFFICER",image:"NPC/uchiha_police_force_member_male.png"}),
 policeMiFemale:Object.freeze({id:"kakashi_upf_mi_female",label:"UCHIHA POLICE OFFICER",image:"NPC/uchiha_police_force_member_female.png"}),
 policePsMale:Object.freeze({id:"kakashi_upf_ps_male",label:"UCHIHA POLICE OFFICER",image:"NPC/uchiha_police_force_male_alt_1.png"}),
 policePsFemale:Object.freeze({id:"kakashi_upf_ps_female",label:"UCHIHA POLICE OFFICER",image:"NPC/uchiha_police_force_female_alt_1.png"}),
 policeAmtMale:Object.freeze({id:"kakashi_upf_amt_male",label:"UCHIHA POLICE OFFICER",image:"NPC/uchiha_police_force_male_alt_2.png"}),
 policeAmtFemale:Object.freeze({id:"kakashi_upf_amt_female",label:"UCHIHA POLICE OFFICER",image:"NPC/uchiha_police_force_female_alt_2.png"})
});
const N=text=>Object.freeze({kind:"narration",text:String(text)});
const Q=(speaker,text)=>Object.freeze({kind:"dialogue",speakerName:String(speaker),text:String(text)});
const RECORD=text=>Object.freeze({kind:"record",speakerName:"CHRONICLE RECEIPT",text:String(text)});
const C=(choiceId,label,nextBeatId,{available=null,patch=null}={})=>{
  const row={choiceId,label,nextBeatId};
  if(available)row.availability=()=>({available:available(),knownBlocker:available()?null:"CURRENT FACTUAL STATE DOES NOT PERMIT THIS ACTION"});
  if(patch)row.consequenceRequests=[{requestId:`kakashi_v2_choice_${choiceId}_${nextBeatId}`,kind:"domain",resolve:()=>{const result=patch();return result&&result.success===false?result:{success:true,result:result||null};}}];
  return row;
};

const manifest={};
const beats=[];
function addBeat(id,{mode="narration",cues=[],backdrop=B.sakura,location="KONOHA · NIGHT",objective=null,actors=[],preset="standard",choices=[],battle=null,nextBeatId=null,onEnter=null,onAdvance=null,transition=null,receipt=false,exitScene=false,presentationPackageHolder=null,machineResolved=false}={}){
  manifest[id]=Object.freeze({id,cues,backdrop,location,objective,actors,preset,transition,receipt,presentationPackageHolder,machineResolved});
  const row={beatId:id,mode,text:"",choices,nextBeatId,exitScene,machineResolved:machineResolved===true,uiHints:machineResolved===true?{kakashiMachineResolved:true}:{}};
  if(onEnter)row.onEnterConsequences=[{requestId:`kakashi_v2_enter_${id}`,kind:"domain",resolve:ctx=>onEnter(ctx)}];
  if(onAdvance)row.onAdvanceConsequences=[{requestId:`kakashi_v2_advance_${id}`,kind:"domain",resolve:ctx=>onAdvance(ctx)}];
  if(battle)row.battle=battle;
  beats.push(row);return row;
}
function active(){return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}
function state(){
  const rt=active();if(!rt)return null;
  if(!rt.localContext||typeof rt.localContext!=="object")rt.localContext={};
  if(!rt.localContext.kakashiV2)rt.localContext.kakashiV2={
    version:3,sceneInstanceId:rt.instanceId||null,routeHistory:[],
    package:{holder:"AMT",recovered:false,returned:false,neutral:false},
    participants:{MI:{state:"UNSEEN"},PS:{state:"AVAILABLE"},AMT:{state:"AVAILABLE"}},
    pakkun:{present:false,departed:false,knownByKakashiAsName:false},
    knowledge:{getCloserContingency:false,askWhere:false,downstreamDestinationKnown:false},
    resolvers:{},battles:{},rewards:{sources:[],terminalCommitted:false},terminal:{}
  };
  const s=rt.localContext.kakashiV2;
  migrateLegacyDispositionState(s);
  return s;
}
function save(){try{savePlayerData();}catch(_e){}}
function mutate(fn){const s=state();if(!s)return{success:false,reason:"kakashi_v2_state_missing"};fn(s);save();return{success:true};}
function history(label,data={}){return mutate(s=>s.routeHistory.push({label,...data}));}
function participantKey(ref){
  if(ref==="AMT"||ref===AMT)return "AMT";
  if(ref==="PS"||ref===PS)return "PS";
  if(ref==="MI"||ref===MI)return "MI";
  return String(ref||"");
}
function participant(ref,next){const key=participantKey(ref);return mutate(s=>{s.participants[key]={...(s.participants[key]||{}),...next};});}
function packageState(holder,{recovered=null,returned=null,neutral=null}={}){return mutate(s=>{s.package.holder=holder;if(recovered!==null)s.package.recovered=!!recovered;if(returned!==null)s.package.returned=!!returned;if(neutral!==null)s.package.neutral=!!neutral;});}
function setPakkun(present=true){return mutate(s=>{s.pakkun.present=present;s.pakkun.departed=!present;});}
function fieldLocationFor(key){return key==="MI"?"beneath the Sakura tree":key==="PS"?"in the side street":key==="AMT"?"in the alley":"at the committed field location";}
function restartAmbiguousLegacyKakashiOccurrence(s,reasons){
  const rt=active(),fresh={
    version:3,sceneInstanceId:rt&&rt.instanceId||s&&s.sceneInstanceId||null,routeHistory:[],
    package:{holder:"AMT",recovered:false,returned:false,neutral:false},
    participants:{MI:{state:"UNSEEN"},PS:{state:"AVAILABLE"},AMT:{state:"AVAILABLE"}},
    pakkun:{present:false,departed:false,knownByKakashiAsName:false},
    knowledge:{getCloserContingency:false,askWhere:false,downstreamDestinationKnown:false},
    resolvers:{},battles:{},rewards:{sources:[],terminalCommitted:false},terminal:{},
    migration:{restartedAffectedOccurrence:true,reason:"legacy_disposition_ambiguous",retiredFacts:[...new Set(reasons)]}
  };
  for(const key of Object.keys(s||{}))delete s[key];
  Object.assign(s,fresh);
  if(rt){rt.beatId="v2_scene01_rooftop";rt.battleResume=null;}
  try{savePlayerData();}catch(_error){}
  return true;
}
function migrateLegacyDispositionState(s){
  if(!s||typeof s!=="object")return false;
  const legacyField=Array.isArray(s.fieldSecured)?s.fieldSecured.map(participantKey):[];
  const ambiguous=[];
  for(const key of ["MI","PS","AMT"]){
    const row=s.participants&&s.participants[key];if(!row)continue;
    if(["DEAD","FIELD_SECURED_PENDING_COLLECTION","COLLECTED_ACTIVE_ESCORT"].includes(row.state))ambiguous.push(`${key}:${row.state}`);
  }
  for(const key of legacyField)ambiguous.push(`${key}:fieldSecured`);
  if(ambiguous.length)return restartAmbiguousLegacyKakashiOccurrence(s,ambiguous);
  let changed=false;
  if(Object.prototype.hasOwnProperty.call(s,"fieldSecured")){delete s.fieldSecured;changed=true;}
  if(Number(s.version)<3){s.version=3;changed=true;}
  if(changed)try{savePlayerData();}catch(_error){}
  return changed;
}
function restrainedParticipantKeys(s=state()){return ["MI","PS","AMT"].filter(key=>s&&s.participants&&s.participants[key]&&s.participants[key].state==="RESTRAINED");}
function canDirectDisposition(row,kind){
  if(!row)return false;
  if(kind==="RELEASE")return row.state==="BATTLE_DEFEATED";
  return row.state==="BATTLE_DEFEATED"||row.state==="RESTRAINED";
}
function dispose(ref,kind){
  if(!["ANBU","POLICE","RELEASE"].includes(kind))return{success:false,reason:"kakashi_v2_direct_disposition_kind_forbidden",kind};
  const key=participantKey(ref),s=state(),row=s&&s.participants&&s.participants[key];
  if(!canDirectDisposition(row,kind))return{success:false,reason:"kakashi_v2_direct_disposition_state_forbidden",participant:key,state:row&&row.state||null,kind};
  return mutate(stateRow=>{
    const target=stateRow.participants[key]||(stateRow.participants[key]={});
    target.state=kind==="ANBU"?"ANBU_CUSTODY":kind==="POLICE"?"POLICE_CUSTODY":"RELEASED";
    target.disposition=kind;
    if(kind==="ANBU"||kind==="POLICE"){target.deliveredAlive=true;target.deliveredInstitution=kind;target.collected=true;}
  });
}
function disposeGroup(kind,refs=[AMT,PS,MI]){
  if(!["ANBU","POLICE","RELEASE"].includes(kind))return{success:false,reason:"kakashi_v2_direct_group_disposition_kind_forbidden",kind};
  const keys=[...new Set((refs||[]).map(participantKey))],s=state();
  const invalid=keys.find(key=>!canDirectDisposition(s&&s.participants&&s.participants[key],kind));
  if(invalid)return{success:false,reason:"kakashi_v2_direct_group_disposition_state_forbidden",participant:invalid,state:s&&s.participants&&s.participants[invalid]&&s.participants[invalid].state||null,kind};
  return mutate(stateRow=>keys.forEach(key=>{
    const target=stateRow.participants[key]||(stateRow.participants[key]={});
    target.disposition=kind;target.state=kind==="ANBU"?"ANBU_CUSTODY":kind==="POLICE"?"POLICE_CUSTODY":"RELEASED";
    if(kind==="ANBU"||kind==="POLICE"){target.deliveredAlive=true;target.deliveredInstitution=kind;target.collected=true;}
  }));
}
function occurrenceId(kind,key){const rt=active();return `occ_academy_kakashi_v2_${String(rt&&rt.instanceId||"unknown")}_${String(kind)}_${String(key)}`;}
function commitKakashiOccurrence(kind,key,data={}){
  const rt=active(),id=occurrenceId(kind,key);
  if(!rt||typeof playerData==="undefined"||!playerData||typeof playerData!=="object")return{success:false,reason:"kakashi_v2_activity_history_unavailable"};
  if(!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];
  const existing=playerData.activityHistory.find(row=>row&&row.committed===true&&String(row.sourceOccurrenceId||row.occurrenceId||row.id||"")===id);
  if(existing)return{success:true,idempotent:true,record:existing};
  const record={id,occurrenceId:id,sourceOccurrenceId:id,type:`academy_kakashi_v2_${kind}`,activity:"origin_chronicle",actorVariantId:ORIGIN_ID,protagonistParticipantId:ORIGIN_ID,sceneId:SCENE_ID,storySceneInstanceId:rt.instanceId,committed:true,completed:true,data:{...data},timestamp:Date.now()};
  playerData.activityHistory.push(record);try{activityHistory=playerData.activityHistory;}catch(_error){}save();
  return{success:true,idempotent:false,record};
}
function projectKakashiEvidence(sourceRecord,{qualificationId,tags,significance,activityFamilyId,causalRootKey,targetRefs=[],context={}}){
  if(!sourceRecord||sourceRecord.committed!==true||typeof globalThis.projectSpecialJoninContextualEvidence34700!=="function")return{success:false,reason:"kakashi_v2_evidence_producer_unavailable"};
  const root=commitKakashiOccurrence("evidence_root",causalRootKey,{qualificationId,causalRootKey,context:"contextual_special_jonin_evidence"});
  if(!root||root.success!==true)return root||{success:false,reason:"kakashi_v2_evidence_root_commit_failed"};
  const causalRootOccurrenceId=root.record&&String(root.record.sourceOccurrenceId||root.record.occurrenceId||"");
  return globalThis.projectSpecialJoninContextualEvidence34700({
    subjectVariantId:ORIGIN_ID,sourceOccurrenceId:sourceRecord.sourceOccurrenceId||sourceRecord.occurrenceId,
    qualificationId,tags,significance,category:"chronicle_origin",activityFamilyId,
    causalRootOccurrenceId,targetRefs,
    verified:true,specialistLevel:false,capstoneAuthorized:false,
    context:{originId:ORIGIN_ID,sceneId:SCENE_ID,...context}
  });
}
function commitRouteInterceptEvidence(){
  const source=commitKakashiOccurrence("specialist_work","route_intercept_execution",{route:"sakura_cutoff",predictionEstablished:true,interceptExecuted:true});
  if(!source.success)return source;
  return projectKakashiEvidence(source.record,{
    qualificationId:"reconnaissance.tracker_nin",
    tags:["reconnaissance.tracker_nin:route_intercept_execution"],
    significance:2,activityFamilyId:"academy_kakashi_origin_route_intercept",
    causalRootKey:"route_intercept",targetRefs:["AMT","PS"],
    context:{stage:"sakura_cutoff",predictionEstablished:true,interceptExecuted:true}
  });
}
function commitAskWhereEvidence(){
  const source=commitKakashiOccurrence("specialist_work","ask_where_information_extraction",{
    interaction:"ask_where_package_going",
    attributableQuestioning:true,relevantInformationObtained:true,
    informationScope:"original_carrier_role_ended_at_handoff_downstream_destination_unknown",
    completeness:"limited_incomplete"
  });
  if(!source.success)return source;
  return projectKakashiEvidence(source.record,{
    qualificationId:"intelligence.interrogator",
    tags:["intelligence.interrogator:information_extraction"],
    significance:1,activityFamilyId:"academy_kakashi_origin_interrogation",
    causalRootKey:"ask_where_interrogation",targetRefs:["AMT"],
    context:{stage:"information_extraction",limitedIncomplete:true,downstreamDestinationKnown:false}
  });
}
function getOutcome(key){const s=state();return s&&s.resolvers[key]&&s.resolvers[key].selectedOutcomeRef||null;}
function battleRow(key){const s=state();return s&&s.battles[key]||null;}
function battleActions(key){const row=battleRow(key);return row?Number(row.playerActionOpportunityCount)||0:0;}
function captureBattle(key,ctx,after){
  const safe=ctx&&ctx.sceneContext&&ctx.sceneContext.battleResume||active()&&active().battleResume||null;
  if(!safe)return{success:false,reason:"kakashi_v2_battle_resume_missing"};
  return mutate(s=>{
    s.battles[key]={outcome:safe.outcome,battleId:safe.battle_id||null,encounterId:safe.encounter_id||null,...(safe.authored||{})};
    if(typeof after==="function")after(s,s.battles[key]);
  });
}
function battle(configId,key,victoryBeatId,defeatBeatId,anchor){
  return {
    encounterId:configId,victoryBeatId,defeatBeatId,
    resultProjector:()=>globalThis.projectAcademyKakashiV2BattleResult36010?globalThis.projectAcademyKakashiV2BattleResult36010():null,
    actionLabel:"BEGIN PL BATTLE",
    launchResolver:({active:returnActive,returnContext})=>{
      if(!globalThis.launchAcademyKakashiV2Battle36010)return{success:false,reason:"kakashi_v2_battle_adapter_missing"};
      return globalThis.launchAcademyKakashiV2Battle36010({battleConfigId:configId,returnContext,storyOccurrenceId:returnActive.instanceId,sourceAnchorRef:anchor||key,bindingRef:`academy_kakashi.v2.battle.${key}`,returnToken:key});
    }
  };
}

const factualDefs={
 getCloser:{binding:"academy_kakashi.v2.get_closer",outcomes:[
  {outcomeRef:"GET_CLOSER_SUCCESS",resultPayloadTemplate:{outcomeClass:"GET_CLOSER_SUCCESS"}},
  {outcomeRef:"GET_CLOSER_FAILURE",resultPayloadTemplate:{outcomeClass:"GET_CLOSER_FAILURE"}}
 ]},
 directPickpocket:{binding:"academy_kakashi.v2.pickpocket_direct",outcomes:[
  {outcomeRef:"PICKPOCKET_DIRECT_SUCCESS",resultPayloadTemplate:{outcomeClass:"PICKPOCKET_DIRECT_SUCCESS"}},
  {outcomeRef:"PICKPOCKET_DIRECT_FAILURE",resultPayloadTemplate:{outcomeClass:"PICKPOCKET_DIRECT_FAILURE"}}
 ]},
 improvedPickpocket:{binding:"academy_kakashi.v2.pickpocket_improved",outcomes:[
  {outcomeRef:"PICKPOCKET_IMPROVED_SUCCESS",resultPayloadTemplate:{outcomeClass:"PICKPOCKET_IMPROVED_SUCCESS"}},
  {outcomeRef:"PICKPOCKET_IMPROVED_FAILURE",resultPayloadTemplate:{outcomeClass:"PICKPOCKET_IMPROVED_FAILURE"}}
 ]},
 secureBefore:{binding:"academy_kakashi.v2.secure_before_assassin",outcomes:[
  {outcomeRef:"SECURE_BEFORE_SUCCESS",resultPayloadTemplate:{outcomeClass:"SECURE_BEFORE_SUCCESS"}},
  {outcomeRef:"SECURE_BEFORE_FAILURE",resultPayloadTemplate:{outcomeClass:"SECURE_BEFORE_FAILURE"}}
 ]},
 psPursuit:{binding:"academy_kakashi.v2.ps_pursuit",outcomes:[
  {outcomeRef:"PS_PURSUIT_SUCCESS",resultPayloadTemplate:{outcomeClass:"PS_PURSUIT_SUCCESS"}},
  {outcomeRef:"PS_PURSUIT_FAILURE",resultPayloadTemplate:{outcomeClass:"PS_PURSUIT_FAILURE"}}
 ]},
 amtPursuitRoot:{binding:"academy_kakashi.v2.amt_pursuit_root",outcomes:[
  {outcomeRef:"AMT_PURSUIT_SUCCESS",resultPayloadTemplate:{outcomeClass:"AMT_PURSUIT_SUCCESS"}},
  {outcomeRef:"AMT_PURSUIT_FAILURE",resultPayloadTemplate:{outcomeClass:"AMT_PURSUIT_FAILURE"}}
 ]},
 secureAmtPursuit:{binding:"academy_kakashi.v2.secure_amt_pursuit",outcomes:[
  {outcomeRef:"SECURE_AMT_PURSUIT_SUCCESS",resultPayloadTemplate:{outcomeClass:"SECURE_AMT_PURSUIT_SUCCESS"}},
  {outcomeRef:"SECURE_AMT_PURSUIT_FAILURE",resultPayloadTemplate:{outcomeClass:"SECURE_AMT_PURSUIT_FAILURE"}}
 ]},
 stayPackagePursuit:{binding:"academy_kakashi.v2.stay_package_pursuit",outcomes:[
  {outcomeRef:"STAY_PACKAGE_PURSUIT_SUCCESS",resultPayloadTemplate:{outcomeClass:"STAY_PACKAGE_PURSUIT_SUCCESS"}},
  {outcomeRef:"STAY_PACKAGE_PURSUIT_FAILURE",resultPayloadTemplate:{outcomeClass:"STAY_PACKAGE_PURSUIT_FAILURE"}}
 ]},
 dispositionKill:{binding:"academy_kakashi.v2.disposition.kill",outcomes:[
  {outcomeRef:"KILLED",resultPayloadTemplate:{outcomeClass:"KILLED"}},
  {outcomeRef:"ESCAPED",resultPayloadTemplate:{outcomeClass:"ESCAPED"}}
 ]},
 dispositionRestrain:{binding:"academy_kakashi.v2.disposition.restrain",outcomes:[
  {outcomeRef:"RESTRAINED",resultPayloadTemplate:{outcomeClass:"RESTRAINED"}},
  {outcomeRef:"ESCAPED",resultPayloadTemplate:{outcomeClass:"ESCAPED"}}
 ]}
};
for(const row of Object.values(factualDefs)){
  const reg=F.registerStoryFactualResolverBinding(row.binding,{ownerRef:PATCH_ID,authorityVersionRefs:["Academy_Kakashi_Origin_100_Percent_Writing_Closure_2026-09-20"],outcomes:row.outcomes,metadata:{storyUnitRef:ORIGIN_ID,cleanRoomV2:true}});
  if(!reg||reg.success!==true)throw new Error(`kakashi_v2_factual_binding_failed:${row.binding}`);
}
const dispositionParticipantBindings=Object.freeze({
  KILL:Object.freeze({
    MI:"academy_kakashi.v2.disposition.kill.mi",
    PS:"academy_kakashi.v2.disposition.kill.ps",
    AMT:"academy_kakashi.v2.disposition.kill.amt"
  }),
  RESTRAIN:Object.freeze({
    MI:"academy_kakashi.v2.disposition.restrain.mi",
    PS:"academy_kakashi.v2.disposition.restrain.ps",
    AMT:"academy_kakashi.v2.disposition.restrain.amt"
  })
});
for(const intent of ["KILL","RESTRAIN"]){
  const def=intent==="KILL"?factualDefs.dispositionKill:factualDefs.dispositionRestrain;
  for(const [participantRef,bindingRef] of Object.entries(dispositionParticipantBindings[intent])){
    const reg=F.registerStoryFactualResolverBinding(bindingRef,{
      ownerRef:PATCH_ID,
      authorityVersionRefs:[
        "9861bdc3bf2bbe2ebccae598035f868871d09c29",
        "469de7c67ece78364c947953abef07e32856c1ba"
      ],
      outcomes:def.outcomes,
      metadata:{storyUnitRef:ORIGIN_ID,cleanRoomV2:true,dispositionIntent:intent,participantRef,independentParticipantOutcome:true}
    });
    if(!reg||reg.success!==true)throw new Error(`kakashi_v2_disposition_binding_failed:${bindingRef}`);
  }
}
function resolveFactual(key){
  const def=factualDefs[key];if(!def)return{success:false,reason:"kakashi_v2_factual_key_unknown"};
  const rt=active(),s=state();if(!rt||!s)return{success:false,reason:"kakashi_v2_state_missing"};
  if(s.resolvers[key])return{success:true,idempotent:true,...s.resolvers[key]};
  const contextStateRef=`${rt.instanceId}:${key}`;
  const opened=D.openSemanticChoiceSet({storyUnitRef:ORIGIN_ID,storyUnitType:"origin",decisionPointRef:`academy_kakashi.v2.${key}`,contextStateRef,choices:[{choiceId:key,intentType:key,resolverBindingRef:def.binding,presentationLabel:key}]});
  if(!opened.success)return opened;
  let committed=D.commitStoryIntent({storyUnitRef:ORIGIN_ID,choiceSetId:opened.choiceSet.choiceSetId,choiceId:key});
  if(!committed.success&&committed.reason!=="story_intent_already_committed")return committed;
  if(!committed.success){
    const root=playerData.storyDecisionRealisation34000&&playerData.storyDecisionRealisation34000.receipts||{};
    const existing=Object.values(root).find(r=>r&&r.choiceSetId===opened.choiceSet.choiceSetId&&r.choiceId===key);
    if(!existing)return committed;committed={success:true,receipt:existing};
  }
  const factual=F.resolveStoryFactualAction({storyDecisionReceiptId:committed.receipt.storyDecisionReceiptId,bindingRef:def.binding,actorRef:ORIGIN_ID,intentCommitRef:committed.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:F.stableRef("kakashi-v2",{sceneInstanceId:rt.instanceId,key}),authorityVersionRefs:["Academy_Kakashi_Origin_100_Percent_Writing_Closure_2026-09-20"],continuityLineageRef:rt.instanceId,committedAtOccurrenceRef:contextStateRef,context:{sceneId:SCENE_ID,beatId:rt.beatId}});
  if(!factual.success)return factual;
  s.resolvers[key]={selectedOutcomeRef:factual.receipt.selectedOutcomeRef,receiptId:factual.receipt.storyFactualResolverReceiptId,resolutionMode:factual.receipt.resolutionMode};
  save();return{success:true,...s.resolvers[key]};
}
function resolverEnter(key){const r=resolveFactual(key);return r&&r.success?r:{success:false,reason:r&&r.reason||"kakashi_v2_resolver_failed"};}
function dispositionIntentReceipt(intent,causalKey,targetKeys){
  const rt=active();if(!rt)return{success:false,reason:"kakashi_v2_state_missing"};
  const binding=intent==="KILL"?factualDefs.dispositionKill.binding:factualDefs.dispositionRestrain.binding;
  const choiceId=`disposition_${String(intent).toLowerCase()}_${String(causalKey)}`;
  const contextStateRef=`${rt.instanceId}:disposition:${causalKey}`;
  const opened=D.openSemanticChoiceSet({
    storyUnitRef:ORIGIN_ID,storyUnitType:"origin",decisionPointRef:`academy_kakashi.v2.disposition.${causalKey}`,
    contextStateRef,choices:[{choiceId,intentType:intent,resolverBindingRef:binding,presentationLabel:intent}],
    metadata:{targetKeys:[...targetKeys],causalParent:true}
  });
  if(!opened.success)return opened;
  let committed=D.commitStoryIntent({storyUnitRef:ORIGIN_ID,choiceSetId:opened.choiceSet.choiceSetId,choiceId});
  if(!committed.success&&committed.reason!=="story_intent_already_committed")return committed;
  if(!committed.success){
    const root=playerData.storyDecisionRealisation34000&&playerData.storyDecisionRealisation34000.receipts||{};
    const existing=Object.values(root).find(r=>r&&r.choiceSetId===opened.choiceSet.choiceSetId&&r.choiceId===choiceId);
    if(!existing)return committed;committed={success:true,receipt:existing};
  }
  return{success:true,binding,receipt:committed.receipt,contextStateRef};
}
function resolveDispositionTarget(intent,ref,{causalKey,sharedIntent=null}={}){
  const key=participantKey(ref),s=state(),rt=active();
  if(!s||!rt||!["MI","PS","AMT"].includes(key))return{success:false,reason:"kakashi_v2_disposition_target_invalid",key};
  const row=s.participants[key]||(s.participants[key]={state:"AVAILABLE"});
  const existing=row.dispositionResolution;
  if(existing&&existing.intent===intent&&["KILLED","RESTRAINED","ESCAPED"].includes(existing.outcome))return{success:true,idempotent:true,...existing};
  if(existing)return{success:false,reason:"kakashi_v2_disposition_already_resolved",key,existing};
  const intentReceipt=sharedIntent&&sharedIntent.success?sharedIntent:dispositionIntentReceipt(intent,causalKey,[key]);
  if(!intentReceipt.success)return intentReceipt;
  const binding=dispositionParticipantBindings[intent]&&dispositionParticipantBindings[intent][key];
  if(!binding)return{success:false,reason:"kakashi_v2_disposition_binding_missing",intent,key};
  const factual=F.resolveStoryFactualAction({
    storyDecisionReceiptId:intentReceipt.receipt.storyDecisionReceiptId,bindingRef:binding,actorRef:ORIGIN_ID,
    intentCommitRef:intentReceipt.receipt.intentCommitRef,attemptOrdinal:1,
    idempotenceKey:F.stableRef("kakashi-v2-disposition",{sceneInstanceId:rt.instanceId,causalKey,target:key,intent}),
    authorityVersionRefs:["Academy_Kakashi_Kill_and_Restrain_Two_Outcome_Resolver_and_Scene_Authority_2026-09-23"],
    continuityLineageRef:rt.instanceId,committedAtOccurrenceRef:`${intentReceipt.contextStateRef}:${key}`,
    context:{sceneId:SCENE_ID,beatId:rt.beatId,targetParticipantRef:key,causalKey,intent}
  });
  if(!factual.success)return factual;
  const outcome=factual.receipt.selectedOutcomeRef;
  if(intent==="KILL"&&!["KILLED","ESCAPED"].includes(outcome))return{success:false,reason:"kakashi_v2_kill_outcome_invalid",outcome};
  if(intent==="RESTRAIN"&&!["RESTRAINED","ESCAPED"].includes(outcome))return{success:false,reason:"kakashi_v2_restrain_outcome_invalid",outcome};
  row.state=outcome;row.disposition=intent;row.lethalIntent=intent==="KILL";row.restrainIntent=intent==="RESTRAIN";
  row.dispositionResolution={intent,outcome,causalKey,receiptId:factual.receipt.storyFactualResolverReceiptId,resolutionMode:factual.receipt.resolutionMode};
  if(outcome==="RESTRAINED"){row.fieldLocation=row.fieldLocation||fieldLocationFor(key);row.collected=false;}
  const occ=commitKakashiOccurrence("disposition",`${causalKey}_${key}`,{
    targetParticipantRef:key,intent,outcome,causalKey,resolverReceiptId:factual.receipt.storyFactualResolverReceiptId,
    packageHolder:s.package&&s.package.holder||null,packageRecovered:!!(s.package&&s.package.recovered)
  });
  row.dispositionResolution.sourceOccurrenceId=occ&&occ.record&&(occ.record.sourceOccurrenceId||occ.record.occurrenceId)||null;
  save();
  return{success:true,...row.dispositionResolution,sourceOccurrenceId:row.dispositionResolution.sourceOccurrenceId};
}
function resolveDisposition(intent,ref,causalKey){
  return resolveDispositionTarget(intent,ref,{causalKey:String(causalKey||`${intent}_${participantKey(ref)}`)});
}
function resolveGroupKill(refs,causalKey){
  const targetKeys=[...new Set((refs||[]).map(participantKey).filter(key=>["MI","PS","AMT"].includes(key)))];
  if(!targetKeys.length)return{success:false,reason:"kakashi_v2_group_kill_targets_missing"};
  const shared=dispositionIntentReceipt("KILL",causalKey,targetKeys);if(!shared.success)return shared;
  const parent=commitKakashiOccurrence("group_disposition",causalKey,{intent:"KILL",targetParticipantRefs:targetKeys,childSourceOccurrenceIds:[],outcomes:{},resolutionStatus:"resolving"});
  if(!parent||parent.success!==true)return parent||{success:false,reason:"kakashi_v2_group_kill_parent_commit_failed"};
  const parentOccurrenceId=parent.record&&String(parent.record.sourceOccurrenceId||parent.record.occurrenceId||"");
  const results=targetKeys.map(key=>resolveDispositionTarget("KILL",key,{causalKey,sharedIntent:shared}));
  if(results.some(r=>!r.success))return{success:false,reason:"kakashi_v2_group_kill_child_failed",parentOccurrenceId,results};
  parent.record.data={
    ...(parent.record.data||{}),
    intent:"KILL",targetParticipantRefs:targetKeys,
    childSourceOccurrenceIds:results.map(r=>r.sourceOccurrenceId),
    outcomes:Object.fromEntries(results.map((r,i)=>[targetKeys[i],r.outcome])),
    resolutionStatus:"resolved"
  };
  for(const result of results){
    const child=playerData.activityHistory.find(row=>row&&String(row.sourceOccurrenceId||row.occurrenceId||"")===String(result.sourceOccurrenceId||""));
    if(child){child.causalParentOccurrenceId=parentOccurrenceId;child.data={...(child.data||{}),causalParentOccurrenceId:parentOccurrenceId};}
  }
  save();
  return{success:true,causalKey,results,parentOccurrenceId};
}
function dispositionOutcome(ref){const key=participantKey(ref),s=state(),row=s&&s.participants&&s.participants[key];return row&&row.dispositionResolution&&row.dispositionResolution.outcome||row&&row.state||null;}
function packageRecoveredForDisposition(){const s=state();return !!(s&&s.package&&(s.package.recovered===true||["KAKASHI","ANBU"].includes(s.package.holder)));}
function killedCues(ref){
  const key=participantKey(ref);
  if(key==="MI")return W("dispositionResolvers","mi_killed");
  if(key==="PS")return W("dispositionResolvers","ps_killed");
  if(key==="AMT")return W("dispositionResolvers","amt_killed");
  throw new Error("kakashi_v2_killed_cue_participant_unmapped:"+String(key));
}
function singleDispositionCues(ref,intent){
  const key=participantKey(ref),outcome=dispositionOutcome(key);
  if(intent==="KILL"){
    if(outcome==="KILLED")return killedCues(key);
    if(key==="MI")return W("dispositionResolvers","mi_kill_escaped");
    if(key==="PS")return W("dispositionResolvers",packageRecoveredForDisposition()?"ps_kill_escaped_package_recovered":"ps_kill_escaped_package_missing");
    if(key==="AMT")return W("dispositionResolvers",packageRecoveredForDisposition()?"amt_kill_escaped_package_recovered":"amt_kill_escaped_package_missing");
  }
  if(intent==="RESTRAIN"){
    if(key==="MI")return W("dispositionResolvers",outcome==="RESTRAINED"?"mi_restrained":"mi_restrain_escaped");
    if(key==="PS"){
      if(outcome==="RESTRAINED")return W("dispositionResolvers",packageRecoveredForDisposition()?"ps_restrained_package_recovered":"ps_restrained_package_missing");
      return W("dispositionResolvers",packageRecoveredForDisposition()?"ps_restrain_escaped_package_recovered":"ps_restrain_escaped_package_missing");
    }
    if(key==="AMT")return W("dispositionResolvers",outcome==="RESTRAINED"?"amt_restrained":"amt_restrain_escaped");
  }
  throw new Error("kakashi_v2_disposition_cue_unmapped:"+String(intent)+":"+String(key)+":"+String(outcome));
}
function groupKillSection(refs){
  const keys=(refs||[]).map(participantKey),out=Object.fromEntries(keys.map(key=>[key,dispositionOutcome(key)]));
  if(keys.length===2){
    if(out.AMT==="KILLED"&&out.PS==="KILLED")return"group2_both_killed";
    if(out.AMT==="KILLED"&&out.PS==="ESCAPED")return"group2_amt_killed_ps_escaped";
    if(out.AMT==="ESCAPED"&&out.PS==="KILLED")return"group2_amt_escaped_ps_killed";
    return"group2_both_escaped";
  }
  const killed=key=>out[key]==="KILLED",escaped=key=>out[key]==="ESCAPED";
  if(killed("MI")&&killed("PS")&&killed("AMT"))return"group3_all_killed";
  if(escaped("MI")&&killed("PS")&&killed("AMT"))return"group3_mi_escaped_ps_amt_killed";
  if(escaped("PS")&&killed("MI")&&killed("AMT"))return"group3_ps_escaped_mi_amt_killed";
  if(escaped("AMT")&&killed("MI")&&killed("PS"))return"group3_amt_escaped_mi_ps_killed";
  if(killed("MI")&&escaped("PS")&&escaped("AMT"))return"group3_mi_killed_ps_amt_escaped";
  if(killed("PS")&&escaped("MI")&&escaped("AMT"))return"group3_ps_killed_mi_amt_escaped";
  if(killed("AMT")&&escaped("MI")&&escaped("PS"))return"group3_amt_killed_mi_ps_escaped";
  return"group3_all_escaped";
}
function groupKillCues(refs){return W("dispositionResolvers",groupKillSection(refs));}
function transferIntent(refs,institution,key){
  const keys=[...new Set((Array.isArray(refs)?refs:[refs]).map(participantKey))];
  return history("INSTITUTIONAL_TRANSFER_INTENT",{participantKeys:keys,institution,key});
}
function completeDirectTransfer(ref,institution,key){
  const participant=participantKey(ref),result=dispose(participant,institution);
  if(!result.success)return result;
  const occ=commitKakashiOccurrence("delivery",`${String(institution).toLowerCase()}_${key}_${participant.toLowerCase()}`,{participantRefs:[participant],institution,deliveredLivingCount:1,directTransfer:true});
  if(!occ.success)return occ;
  history(institution==="ANBU"?"DIRECT_TO_ANBU":"DIRECT_TO_POLICE",{participantKey:participant,sourceOccurrenceId:occ.record&&occ.record.sourceOccurrenceId||null});
  return{success:true,participantKey:participant,institution,sourceOccurrenceId:occ.record&&occ.record.sourceOccurrenceId||null};
}
function completeDirectGroupTransfer(refs,institution,key){
  const keys=[...new Set((refs||[]).map(participantKey))],result=disposeGroup(institution,keys);
  if(!result.success)return result;
  const occ=commitKakashiOccurrence("delivery",`${String(institution).toLowerCase()}_${key}_group`,{participantRefs:keys,institution,deliveredLivingCount:keys.length,directTransfer:true});
  if(!occ.success)return occ;
  history(institution==="ANBU"?"GROUP_TO_ANBU":"GROUP_TO_POLICE",{participantKeys:keys,sourceOccurrenceId:occ.record&&occ.record.sourceOccurrenceId||null});
  return{success:true,participantKeys:keys,institution,sourceOccurrenceId:occ.record&&occ.record.sourceOccurrenceId||null};
}
function directTransferFieldCues(ref,institution){
  const key=participantKey(ref),recovered=packageRecoveredForDisposition(),prefix=key==="MI"?"mi":key==="PS"?"ps":"amt",suffix=String(institution).toLowerCase();
  if(key==="PS"&&institution==="ANBU")return W("custodyGolden06B",`ps_anbu_depart_${recovered?"recovered":"missing"}`);
  if(key==="AMT"&&institution==="ANBU")return W("custodyGolden06B",`amt_anbu_depart_${recovered?"recovered":"missing"}`);
  return W("custodyGolden06B",`${prefix}_${suffix}_depart`);
}
function directTransferHandoffCues(ref,institution){
  const key=participantKey(ref),recovered=packageRecoveredForDisposition(),prefix=key==="MI"?"mi":key==="PS"?"ps":"amt",suffix=String(institution).toLowerCase();
  if(institution==="POLICE"&&key==="PS")return W("custodyGolden06B",`ps_police_handoff_${recovered?"recovered":"missing"}`);
  if(institution==="POLICE"&&key==="AMT")return W("custodyGolden06B",`amt_police_handoff_${recovered?"recovered":"missing"}`);
  return W("custodyGolden06B",`${prefix}_${suffix}_handoff`);
}
function policePairForParticipantKeys(refs=[]){
  const keys=[...new Set((refs||[]).map(participantKey))].sort();
  if(keys.length===1){
    if(keys[0]==="MI")return["policeMiMale","policeMiFemale"];
    if(keys[0]==="PS")return["policePsMale","policePsFemale"];
    return["policeAmtMale","policeAmtFemale"];
  }
  // Multi-captive handoffs deliberately mix cards so the receiving pair is not
  // a duplicate of any of the three dedicated single-target officer pairings.
  if(keys.length>=3)return["policeAmtMale","policeMiFemale"];
  return["policePsMale","policeAmtFemale"];
}
function directTransferActors(ref,institution,handoff=false){
  const key=participantKey(ref),actors=["kakashi",key==="MI"?"mi":key==="PS"?"ps":"amt"],s=state();
  if(s&&s.pakkun.present&&key==="AMT")actors.push("pakkun");
  if(handoff&&institution==="ANBU")actors.push("anbu");
  if(handoff&&institution==="POLICE")actors.push(...policePairForParticipantKeys([key]));
  return [...new Set(actors)];
}
function groupTransferActors(refs,institution,handoff=false){
  const keys=(refs||[]).map(participantKey),actors=["kakashi",...keys.map(key=>key==="MI"?"mi":key==="PS"?"ps":"amt")],s=state();
  if(s&&s.pakkun.present)actors.push("pakkun");
  if(handoff&&institution==="ANBU")actors.push("anbu");
  if(handoff&&institution==="POLICE")actors.push(...policePairForParticipantKeys(keys));
  return [...new Set(actors)];
}
function groupTransferCues(size,institution,stage){
  return W("custodyGolden06B",`group${Number(size)}_${String(institution).toLowerCase()}_${stage}`);
}
function collectedParticipantKeys(s=state()){return restrainedParticipantKeys(s).filter(key=>s&&s.participants[key]&&s.participants[key].collected===true);}
function collectedHandoffCues(institution){
  const keys=collectedParticipantKeys(),kind=String(institution).toLowerCase();
  if(keys.length===1)return directTransferHandoffCues(keys[0],institution);
  return groupTransferCues(keys.length>=3?3:2,institution,"handoff");
}
function collectedHandoffActors(institution){
  const participantKeys=collectedParticipantKeys(),keys=participantKeys.map(key=>key==="MI"?"mi":key==="PS"?"ps":"amt"),actors=["kakashi",...keys],s=state();
  if(s&&s.pakkun.present)actors.push("pakkun");
  if(institution==="ANBU")actors.push("anbu");
  if(institution==="POLICE")actors.push(...policePairForParticipantKeys(participantKeys));
  return [...new Set(actors)];
}
function finalRestraintCues(ref){
  const key=participantKey(ref);
  return W("custodyGolden06B",key==="MI"?"final_restrained_mi":key==="PS"?"final_restrained_ps":"final_restrained_amt");
}
function reportRestraintCues(ref){
  const out=[...singleDispositionCues(ref,"RESTRAIN")];
  if(dispositionOutcome(ref)==="RESTRAINED")out.push(...finalRestraintCues(ref));
  return out;
}
function projectExtractionPlanning(ref,result,causalKey){
  if(!result||result.success!==true)return result;
  const sourceId=result.sourceOccurrenceId,source=playerData.activityHistory.find(r=>r&&String(r.sourceOccurrenceId||r.occurrenceId||"")===String(sourceId));
  if(!source)return{success:false,reason:"kakashi_v2_extraction_source_missing"};
  const significance=result.outcome==="RESTRAINED"?2:1;
  return projectKakashiEvidence(source,{
    qualificationId:"covert_operations.extraction_specialist",
    tags:["covert_operations.extraction_specialist:extraction_planning"],
    significance,activityFamilyId:"academy_kakashi_origin_extraction",
    causalRootKey:"extraction",targetRefs:[participantKey(ref)],
    context:{stage:"extraction_planning",dispositionOutcome:result.outcome,causalKey}
  });
}


function hasHistory(s,label){return !!(s.routeHistory||[]).some(r=>r&&r.label===label);}
function participantName(ref){return ref==="MI"?"masked shinobi":ref==="PS"?"receiver":"original target";}
function participantPronoun(ref){return ref==="MI"?"her":"him";}
function restrainedState(row){return !!row&&row.state==="RESTRAINED";}
function lethalIntentRefs(s){return ["MI","PS","AMT"].filter(ref=>{const row=s.participants&&s.participants[ref];return !!row&&(row.disposition==="KILL"||row.lethalIntent===true);});}
function routeReportCues(s){
  const out=[];
  const first=(s.routeHistory||[]).find(r=>r&&["WATCH_THE_EXCHANGE","MOVE_IN_CLOSER","STRIKE_BEFORE_THE_HANDOFF","SLIP_IN_FOR_THE_PACKAGE"].includes(r.label));
  if(!first)return out;
  if(first.label==="STRIKE_BEFORE_THE_HANDOFF"){
    const firstFight=battleRow("direct_strike_2v1"),secondFight=battleRow("direct_mi");
    out.push(
      Q("ANBU OPERATIVE","You moved before the handoff."),
      Q("KAKASHI","Yes."),
      N("The operative waits. Kakashi understands what he is asking for and gives him the part that changed the assignment.")
    );
    if(firstFight&&firstFight.outcome==="victory")out.push(
      Q("KAKASHI","Both men fought me. I put them down and recovered the package.")
    );
    else if(firstFight)out.push(
      Q("KAKASHI","Both men fought me. I lost the fight before I could recover the package.")
    );
    if(secondFight&&secondFight.outcome==="victory")out.push(
      Q("KAKASHI","The masked shinobi came for it afterward. I fought her too."),
      Q("ANBU OPERATIVE","And won again."),
      Q("KAKASHI","Yes.")
    );
    else if(secondFight)out.push(
      Q("KAKASHI","The masked shinobi came for it afterward. I lost the second fight."),
      N("The operative's attention shifts immediately to the package outcome.")
    );
    return out;
  }
  if(first.label==="SLIP_IN_FOR_THE_PACKAGE"){
    const clean=s.resolvers.directPickpocket&&s.resolvers.directPickpocket.selectedOutcomeRef==="PICKPOCKET_DIRECT_SUCCESS";
    out.push(Q("ANBU OPERATIVE","You tried to take it without opening the fight."));
    if(clean)out.push(
      Q("KAKASHI","I took it before the handoff. They didn't catch me."),
      N("For the first time in the report, the operative's posture eases by a fraction.")
    );
    else{
      out.push(
        Q("KAKASHI","They caught the attempt."),
        N("Kakashi gives the rest without dressing it up.")
      );
      const fight=battleRow("pickpocket_3v1");
      if(fight)out.push(
        Q("KAKASHI",fight.outcome==="victory"?"All three turned on me. I won the fight.":"All three turned on me. I lost the fight.")
      );
    }
    return out;
  }
  if(first.label==="MOVE_IN_CLOSER"){
    out.push(
      Q("ANBU OPERATIVE","You closed the distance before committing."),
      Q("KAKASHI","I wanted a better read before I moved.")
    );
    if(s.knowledge.getCloserContingency)out.push(
      N("That answer is enough to bring the operative to the information Kakashi carried out with him.")
    );
    else out.push(
      N("Whatever the closer position bought Kakashi, he reports only what he can actually prove.")
    );
    return out;
  }
  if(first.label==="WATCH_THE_EXCHANGE"){
    out.push(
      Q("ANBU OPERATIVE","You let the exchange develop."),
      Q("KAKASHI","Long enough to see the handoff."),
      N("Kakashi keeps the answer narrow. Seeing more did not make the street simpler; it gave him more moving pieces to account for.")
    );
  }
  return out;
}
function packageReportCues(s){
  if(s.package.returned===true||s.package.holder==="ANBU")return[
    N("Kakashi takes the package from where he secured it and places it between them."),
    N("The weight leaves his hand. The responsibility does not."),
    Q("KAKASHI","Recovered."),
    N("The operative checks the seal, turns the package once under the rooftop light, and takes possession."),
    Q("ANBU OPERATIVE","Seal is intact.")
  ];
  const holder=s.package.holder==="PS"?"receiver":s.package.holder==="AMT"?"original target":s.package.holder==="MI"?"masked shinobi":null;
  if(holder)return[
    Q("ANBU OPERATIVE","Where is the package now?"),
    Q("KAKASHI",holder==="receiver"?"The receiver got away with it.":holder==="original target"?"The original target still had it when he escaped.":"The masked shinobi took it from me."),
    N("The operative does not soften the failure by moving on too quickly."),
    Q("ANBU OPERATIVE","Last confirmed holder?"),
    Q("KAKASHI",holder==="receiver"?"The receiver.":holder==="original target"?"The original target.":"The masked shinobi.")
  ];
  return[
    Q("ANBU OPERATIVE","Where is the package now?"),
    Q("KAKASHI","I lost track of it."),
    N("The operative's expression changes very little, but the silence after the answer does."),
    Q("ANBU OPERATIVE","Last confirmed holder?"),
    Q("KAKASHI","I can't say.")
  ];
}
function participantReportCues(s,ref){
  const row=s.participants&&s.participants[ref];if(!row||["UNSEEN","KILLED","AVAILABLE"].includes(row.state))return[];
  const out=[],subject=ref==="MI"?"The masked shinobi":ref==="PS"?"The receiver":"The original target";
  out.push(Q("ANBU OPERATIVE",subject+"?"));
  if(row.state==="ESCAPED"){
    const lethal=row.disposition==="KILL"||row.lethalIntent===true;
    if(lethal)out.push(
      Q("KAKASHI",ref==="MI"?"I tried to kill her. She got away.":"I tried to kill him. He got away."),
      N("The operative marks the failed attempt beside the escape and does not confuse one for the other.")
    );
    else if(ref==="AMT"&&Object.values(s.battles||{}).some(b=>b&&b.outcome==="defeat"&&String(b.encounterId||"").includes("amt")))out.push(
      Q("KAKASHI","He beat me and got away."),
      Q("ANBU OPERATIVE","So he left under his own power."),
      Q("KAKASHI","Yes.")
    );
    else out.push(
      Q("KAKASHI",ref==="MI"?"She got away.":"He got away."),
      Q("ANBU OPERATIVE","You saw the escape yourself?"),
      Q("KAKASHI","Yes.")
    );
  }else if(restrainedState(row)){
    out.push(
      Q("KAKASHI","Restrained. Alive."),
      Q("ANBU OPERATIVE","Location?"),
      Q("KAKASHI",row.fieldLocation||(ref==="MI"?"Beneath the Sakura tree.":ref==="PS"?"The side street.":"The alley.")),
      Q("ANBU OPERATIVE","We'll recover "+participantPronoun(ref)+".")
    );
  }else if(row.state==="ANBU_CUSTODY"){
    out.push(
      Q("KAKASHI","Alive. Already in ANBU custody."),
      N("The operative gives one small nod. That fact is already confirmed on his side of the report.")
    );
  }else if(row.state==="POLICE_CUSTODY"){
    out.push(
      Q("KAKASHI",ref==="MI"?"I handed her to the Uchiha Police. Alive.":"I handed him to the Uchiha Police. Alive."),
      Q("ANBU OPERATIVE","You chose the Police after you had custody."),
      Q("KAKASHI","Yes."),
      N("The operative writes Uchiha Police beside the name and underlines it once.")
    );
  }else if(row.state==="RELEASED"){
    out.push(
      Q("KAKASHI",ref==="MI"?"I let her go.":"I let him go."),
      Q("ANBU OPERATIVE","After you had the choice to keep "+participantPronoun(ref)+"?"),
      Q("KAKASHI","Yes."),
      N("The operative holds Kakashi's gaze for a second. His pen pauses before it starts moving again.")
    );
  }else if(row.state==="BATTLE_DEFEATED"){
    out.push(
      Q("KAKASHI",ref==="MI"?"Alive when I left. I didn't restrain her.":"Alive when I left. I didn't restrain him."),
      Q("ANBU OPERATIVE","Then custody was never completed."),
      Q("KAKASHI","No.")
    );
  }else out.push(Q("KAKASHI",String(row.state||"Unknown.")));
  return out;
}
function nonlethalParticipantReportCues(s){
  const refs=["MI","PS","AMT"].filter(ref=>s.participants&&s.participants[ref]&&!["UNSEEN","KILLED","AVAILABLE"].includes(s.participants[ref].state));
  if(!refs.length)return[];
  const states=refs.map(ref=>s.participants[ref].state);
  const same=states.every(x=>x===states[0]);
  if(same&&refs.length>1&&states[0]==="ANBU_CUSTODY")return[
    Q("ANBU OPERATIVE",refs.length===3?"And the three you brought back?":"And the prisoners you brought back?"),
    Q("KAKASHI","Alive. Your people have them."),
    N("The operative glances toward the access point where the custody transfer disappeared from view."),
    Q("ANBU OPERATIVE","All accounted for?"),
    Q("KAKASHI","Yes.")
  ];
  if(same&&refs.length>1&&states[0]==="POLICE_CUSTODY")return[
    Q("ANBU OPERATIVE","The others?"),
    Q("KAKASHI",refs.length===3?"I took all three to the Uchiha Police. Alive.":"I took them to the Uchiha Police. Alive."),
    Q("ANBU OPERATIVE","Your decision?"),
    Q("KAKASHI","Yes."),
    N("The operative writes the Police transfer beside each name before moving on.")
  ];
  if(same&&refs.length>1&&states[0]==="RELEASED")return[
    Q("ANBU OPERATIVE","The others?"),
    Q("KAKASHI",refs.length===3?"I let all three go.":"I let them go."),
    N("The operative stops writing."),
    Q("ANBU OPERATIVE","Deliberately."),
    Q("KAKASHI","Yes."),
    N("The pen starts moving again, one separate note beside each name.")
  ];
  if(same&&refs.length>1&&restrainedState(s.participants[refs[0]]))return[
    Q("ANBU OPERATIVE","The people you restrained?"),
    Q("KAKASHI",refs.length===3?"All three are alive and restrained.":"They're alive and restrained."),
    Q("ANBU OPERATIVE","Locations are in the report?"),
    Q("KAKASHI","Yes."),
    Q("ANBU OPERATIVE","We'll recover them.")
  ];
  if(same&&refs.length>1&&states[0]==="BATTLE_DEFEATED")return[
    Q("ANBU OPERATIVE","The others from the fight?"),
    Q("KAKASHI","Alive when I left. I hadn't taken custody."),
    Q("ANBU OPERATIVE","Both of them?"),
    Q("KAKASHI","Yes."),
    N("The operative adds that to the chronology before asking anything else.")
  ];
  const out=[];
  for(const ref of refs)out.push(...participantReportCues(s,ref));
  return out;
}
function knowledgeReportCues(s){
  const out=[];
  if(s.knowledge.getCloserContingency)out.push(
    N("The operative returns to the moment Kakashi moved closer."),
    Q("ANBU OPERATIVE","What did you actually hear?"),
    Q("KAKASHI","Clear street: handoff. Compromised street: the carrier keeps moving."),
    Q("ANBU OPERATIVE","Destination?"),
    Q("KAKASHI","Never named."),
    N("The operative writes that down without filling the gap for him.")
  );
  if(s.knowledge.askWhere)out.push(
    N("Kakashi adds the part he learned from the original carrier."),
    Q("KAKASHI","His part ended at the handoff. The receiver had the next leg."),
    Q("ANBU OPERATIVE","He knew where it went after that?"),
    Q("KAKASHI","No. He'd asked and wasn't told."),
    Q("ANBU OPERATIVE","So that's the edge of his knowledge."),
    Q("KAKASHI","Yes.")
  );
  return out;
}
function pakkunReportAndDepartureCues(s){
  if(!s.pakkun.present)return[];
  return[
    N("Only after the field report is complete does the operative look down at the ninken beside Kakashi."),
    Q("ANBU OPERATIVE","And him?"),
    Q("KAKASHI","He helped at the interception."),
    Q("PAKKUN","Temporarily."),
    N("The operative accepts that without trying to turn temporary help into ownership."),
    Q("ANBU OPERATIVE","Anything I need from you?"),
    Q("PAKKUN","No."),
    N("Pakkun gets to his feet."),
    Q("PAKKUN","Then I'm leaving."),
    Q("KAKASHI","Thanks."),
    N("Pakkun gives him a brief nod and heads for the roof edge.")
  ];
}
function lethalReportCues(s){
  const attempted=lethalIntentRefs(s);
  if(!attempted.length)return[];
  const out=[
    N("The operative reaches the dispositions and stops writing for the first time."),
    Q("ANBU OPERATIVE",attempted.length>1?"You made lethal choices after the fights.":"You made a lethal choice after the fight."),
    Q("KAKASHI","Yes.")
  ];
  for(const ref of attempted){
    const row=s.participants[ref]||{},name=participantName(ref);
    if(row.state==="KILLED")out.push(Q("KAKASHI","The "+name+" is dead."));
    else if(row.state==="ESCAPED")out.push(Q("KAKASHI","The "+name+" escaped."));
    else out.push(...participantReportCues(s,ref));
  }
  const killed=attempted.filter(ref=>s.participants[ref]&&s.participants[ref].state==="KILLED").length;
  if(killed===attempted.length)out.push(
    N("The operative looks back over the Battle results before speaking."),
    Q("ANBU OPERATIVE",killed>1?"They were alive when the fights ended.":"The target was alive when the fight ended."),
    Q("KAKASHI","Yes."),
    N("That answer remains separate from the victories themselves.")
  );
  else out.push(
    N("The operative writes the result beside the attempt before continuing.")
  );
  return out;
}
function reportClosingCues(s){
  const out=[
    N("The operative reads the last line back in silence, checking the sequence against the package, the people and what Kakashi actually knew."),
    Q("ANBU OPERATIVE","Anything you left out because you weren't sure?"),
    Q("KAKASHI","No."),
    Q("ANBU OPERATIVE","Anything you're guessing?"),
    Q("KAKASHI","No.")
  ];
  if(s.package.returned||s.package.holder==="ANBU")out.push(
    N("The recovered package sits between them now, no longer Kakashi's to guard.")
  );
  else out.push(
    N("The space where the package should have been feels more obvious after the report is finished.")
  );
  out.push(
    Q("ANBU OPERATIVE","All right."),
    N("He closes the field notes, but not the report."),
    Q("ANBU OPERATIVE","You're done here. I'm taking this upstairs."),
    N("Kakashi gives one short nod. Whatever judgement comes next will happen without him in the room.")
  );
  return out;
}
function dynamicTerminalCues(){
  const s=state();if(!s)return[];
  const cues=[
    N("By the time Kakashi reaches the rooftop, the village below has settled into the quieter part of the night."),
    N("The ANBU operative is already waiting. His attention goes first to Kakashi, then immediately to what Kakashi did—or did not—bring back.")
  ];
  if(s.pakkun.present)cues.push(N("Pakkun comes up beside Kakashi and sits near the roof edge, present without pretending the report belongs to him."));
  cues.push(Q("ANBU OPERATIVE","Report."));
  cues.push(...routeReportCues(s),...packageReportCues(s));
  if(lethalIntentRefs(s).length)cues.push(...lethalReportCues(s));
  else cues.push(...nonlethalParticipantReportCues(s));
  cues.push(...knowledgeReportCues(s),...pakkunReportAndDepartureCues(s),...reportClosingCues(s));
  return cues;
}
function minatoOpeningCues(s){
  const out=[
    N("Later, the same report is open beneath the lamplight in the Hokage Administration."),
    N("Minato does not begin with the result. He reads the sequence twice: once for what happened, and once for what Kakashi knew when he chose."),
    Q("MINATO","Start with his first decision.")
  ];
  const first=(s.routeHistory||[]).find(r=>r&&["WATCH_THE_EXCHANGE","MOVE_IN_CLOSER","STRIKE_BEFORE_THE_HANDOFF","SLIP_IN_FOR_THE_PACKAGE"].includes(r.label));
  if(!first)return out;
  if(first.label==="WATCH_THE_EXCHANGE")out.push(
    Q("ANBU OPERATIVE","He watched the exchange long enough for the handoff to develop."),
    Q("MINATO","So he chose information before intervention."),
    N("Minato's finger rests on the next line."),
    Q("MINATO","What did that decision force him to deal with afterward?")
  );
  else if(first.label==="MOVE_IN_CLOSER")out.push(
    Q("ANBU OPERATIVE","He closed the distance before committing."),
    Q("MINATO","More risk for a better read."),
    Q("ANBU OPERATIVE",s.knowledge.getCloserContingency?"He did come out with the contingency they discussed.":"Nothing additional was verified from the closer position."),
    Q("MINATO","Good. Keep what he learned separate from what we wish he'd learned.")
  );
  else if(first.label==="STRIKE_BEFORE_THE_HANDOFF")out.push(
    Q("ANBU OPERATIVE","He interrupted before the handoff completed."),
    Q("MINATO","He traded observation time for control of the moment."),
    N("There is no praise or criticism in Minato's voice yet. He is locating the decision before he judges the result.")
  );
  else if(first.label==="SLIP_IN_FOR_THE_PACKAGE"){
    const clean=s.resolvers.directPickpocket&&s.resolvers.directPickpocket.selectedOutcomeRef==="PICKPOCKET_DIRECT_SUCCESS";
    out.push(
      Q("ANBU OPERATIVE","He tried to remove the package without opening the fight."),
      Q("MINATO",clean?"And nobody detected him.":"And the attempt was detected."),
      Q("ANBU OPERATIVE","Correct."),
      Q("MINATO",clean?"Then the restraint was choosing not to turn success into a fight.":"Then the failure tells us as much as the idea did. Continue.")
    );
  }
  return out;
}
function minatoPackageCues(s,{lethal=false}={}){
  const recovered=s.package.recovered||s.package.returned||s.package.holder==="ANBU";
  if(recovered){
    const count=Object.keys(s.battles||{}).length;
    return[
      Q("ANBU OPERATIVE","The package was recovered and returned."),
      N("Minato looks at that line, then past it to everything that followed."),
      Q("MINATO",lethal?"Good. Now keep the recovered objective separate from the deaths.":"Good. Now tell me what it cost him to bring it back."),
      Q("ANBU OPERATIVE",count?String(count)+" fight"+(count===1?"":"s")+" occurred before the report closed.":"No fight was required."),
      Q("MINATO","Then keep both facts. Success is not a reason to erase the cost.")
    ];
  }
  const lost=s.package.holder==="PS"?"with the receiver":s.package.holder==="AMT"?"with the original target":s.package.holder==="MI"?"to the masked shinobi":"without a confirmed final holder";
  return[
    Q("ANBU OPERATIVE","The package was lost "+lost+"."),
    N("Minato does not move past the line."),
    Q("MINATO","Then the objective failed."),
    Q("ANBU OPERATIVE","Yes."),
    Q("MINATO",lethal?"And deaths after that do not turn it into a success.":"Keep going. A failed objective doesn't make the rest of the report meaningless.")
  ];
}
function minatoDispositionCues(s,{lethal=false}={}){
  const out=[];
  const refs=["MI","PS","AMT"].filter(ref=>s.participants[ref]&&s.participants[ref].state!=="UNSEEN");
  if(lethal){
    const attempted=lethalIntentRefs(s),killed=attempted.filter(ref=>s.participants[ref]&&s.participants[ref].state==="KILLED"),escaped=attempted.filter(ref=>s.participants[ref]&&s.participants[ref].state==="ESCAPED");
    out.push(
      Q("MINATO",attempted.length>1?"Those lethal decisions were made after the fights?":"The lethal decision was made after the fight?"),
      Q("ANBU OPERATIVE","Yes. The fight results and later dispositions are separate in the report.")
    );
    if(killed.length)out.push(Q("MINATO",killed.length===1?"One confirmed death.":String(killed.length)+" confirmed deaths."));
    if(escaped.length)out.push(Q("ANBU OPERATIVE",escaped.length===1?"One target escaped the lethal attempt.":String(escaped.length)+" targets escaped the lethal attempts."));
    if(killed.length&&escaped.length)out.push(
      N("Minato studies the split outcome rather than reducing it to a body count."),
      Q("MINATO","Same intent. Different facts. Keep both.")
    );
    else if(killed.length)out.push(
      N("Minato's expression grows quieter, not harder."),
      Q("MINATO","He knew the fights were over before he made those choices."),
      Q("ANBU OPERATIVE","Yes."),
      Q("MINATO","Then that's what I need preserved.")
    );
    else out.push(
      N("Minato reads the failed lethal outcomes once more."),
      Q("MINATO","No deaths does not make the intent disappear."),
      Q("ANBU OPERATIVE","It remains in the report.")
    );
    return out;
  }
  const anbu=refs.filter(ref=>s.participants[ref].state==="ANBU_CUSTODY").length;
  const police=refs.filter(ref=>s.participants[ref].state==="POLICE_CUSTODY").length;
  const restrained=refs.filter(ref=>restrainedState(s.participants[ref])).length;
  const released=refs.filter(ref=>s.participants[ref].state==="RELEASED").length;
  const escaped=refs.filter(ref=>s.participants[ref].state==="ESCAPED").length;
  const defeated=refs.filter(ref=>s.participants[ref].state==="BATTLE_DEFEATED").length;
  if(anbu)out.push(
    Q("MINATO",anbu>1?"He brought people back alive.":"He brought someone back alive."),
    Q("ANBU OPERATIVE",anbu>1?String(anbu)+" were transferred into ANBU custody.":"One was transferred into ANBU custody."),
    Q("MINATO","Then write capture as a choice, not as an unfinished kill.")
  );
  if(police)out.push(
    Q("MINATO","He used the Police for custody."),
    Q("ANBU OPERATIVE",police>1?String(police)+" were transferred alive.":"One was transferred alive."),
    N("Minato considers the institutional choice rather than treating every lawful destination as interchangeable."),
    Q("MINATO","Keep the destination in the record.")
  );
  if(restrained)out.push(
    Q("ANBU OPERATIVE",restrained>1?String(restrained)+" remained restrained alive when Kakashi moved on.":"One remained restrained alive when Kakashi moved on."),
    Q("MINATO","Then he chose to secure them and keep moving. Keep both parts of that decision.")
  );
  if(released)out.push(
    Q("MINATO",released>1?"He had control and released them.":"He had control and chose release."),
    Q("ANBU OPERATIVE","Deliberately."),
    Q("MINATO","Then don't write that as escape.")
  );
  if(escaped)out.push(
    Q("ANBU OPERATIVE",escaped>1?String(escaped)+" got away.":"One got away."),
    Q("MINATO","After which decision?"),
    Q("ANBU OPERATIVE","The report preserves the sequence."),
    Q("MINATO","Good. An escape without its cause tells me almost nothing.")
  );
  if(defeated)out.push(
    Q("ANBU OPERATIVE",defeated>1?String(defeated)+" were defeated and left alive without completed custody.":"One was defeated and left alive without completed custody."),
    Q("MINATO","Then victory ended the fight, not the decision that followed.")
  );
  return out;
}
function minatoKnowledgeCues(s){
  const out=[];
  if(s.knowledge.getCloserContingency)out.push(
    Q("ANBU OPERATIVE","He reported the contingency exactly: clear street meant handoff; compromised street meant the carrier kept moving. No destination was named."),
    Q("MINATO","And he didn't invent one."),
    Q("ANBU OPERATIVE","No."),
    Q("MINATO","Good. Restraint in what you claim matters as much as restraint in what you do.")
  );
  if(s.knowledge.askWhere)out.push(
    Q("ANBU OPERATIVE","He questioned the carrier. The man's part ended at the handoff; he had asked about the next destination and wasn't told."),
    N("Minato traces the point where verified information stops."),
    Q("MINATO","Then Kakashi found the edge of the man's knowledge and stopped there."),
    Q("ANBU OPERATIVE","Yes.")
  );
  return out;
}
function minatoClosingCues(s){
  return[
    N("For a moment Minato says nothing. His attention settles on Kakashi's name at the top of the report rather than the result at the bottom."),
    Q("MINATO","He's capable. That isn't the same thing as being ready for every problem we can put in front of him."),
    Q("ANBU OPERATIVE","No."),
    Q("MINATO","And if we send someone that young into an adult problem, the responsibility for the outcome isn't his alone."),
    N("The operative lets that stand."),
    Q("MINATO","Keep the sequence intact: what happened, what he knew, what he chose, and what it caused."),
    Q("ANBU OPERATIVE","Understood."),
    N("Minato closes the report only after the distinctions are clear.")
  ];
}
function minatoCues(){
  const s=state();if(!s)return[];
  const lethal=lethalIntentRefs(s).length>0;
  return[
    ...minatoOpeningCues(s),
    ...minatoPackageCues(s,{lethal}),
    ...minatoDispositionCues(s,{lethal}),
    ...minatoKnowledgeCues(s),
    ...minatoClosingCues(s)
  ];
}
function firstActionReceipt(s){
  const labels={WATCH_THE_EXCHANGE:"WATCH THE HANDOFF",MOVE_IN_CLOSER:"GET CLOSER",STRIKE_BEFORE_THE_HANDOFF:"INTERRUPT THE HANDOFF",SLIP_IN_FOR_THE_PACKAGE:"SLIP IN AND TAKE IT"};
  const row=(s.routeHistory||[]).find(r=>r&&labels[r.label]);return row?labels[row.label]:"Not recorded";
}
function packageReceiptLine(s){
  if(s.package.returned===true||s.package.holder==="ANBU")return"Package — Recovered by Kakashi and returned to ANBU.";
  if(s.package.holder==="PS")return"Package — Lost with Package Smuggler.";
  if(s.package.holder==="AMT")return"Package — Lost with ANBU Marked Target.";
  if(s.package.holder==="MI")return"Package — Taken from Kakashi by Masked Interceptor.";
  return"Package — Not recovered by Kakashi.";
}
function participantReceiptLine(s,ref){
  const row=s.participants[ref];if(!row||row.state==="UNSEEN")return null;
  const name=ref==="MI"?"Masked Interceptor":ref==="PS"?"Package Smuggler":"ANBU Marked Target";
  if(row.state==="KILLED")return`${name} — Killed by Kakashi after defeat.`;
  if(row.state==="RESTRAINED")return`${name} — Restrained alive.`;
  if(row.state==="ANBU_CUSTODY")return`${name} — Transferred to ANBU custody.`;
  if(row.state==="POLICE_CUSTODY")return`${name} — Transferred to Uchiha Police custody.`;
  if(row.state==="RELEASED")return`${name} — Deliberately released.`;
  if(row.state==="BATTLE_DEFEATED")return`${name} — Defeated; left alive without completed custody.`;
  if(row.state==="AVAILABLE")return`${name} — No direct confrontation or custody outcome recorded.`;
  if(row.state==="ESCAPED"){
    if(row.disposition==="KILL"||row.lethalIntent===true)return`${name} — Escaped after Kakashi chose a lethal action.`;
    if(row.disposition==="RESTRAIN"||row.restrainIntent===true)return`${name} — Escaped during Kakashi\'s restraint attempt.`;
    if(ref==="PS")return`${name} — Escaped ${s.package.holder==="PS"?"with":"without"} package.`;
    if(ref==="AMT"){
      const lostBattle=Object.values(s.battles||{}).some(b=>b&&b.outcome==="defeat"&&String(b.encounterId||"").includes("amt"));
      return lostBattle?`${name} — Defeated Kakashi and escaped.`:`${name} — Escaped after pursuit failed.`;
    }
    return`${name} — Escaped.`;
  }
  return`${name} — ${row.state}.`;
}
function battleReceiptLines(s){
  const names={
    academy_kakashi_origin_battle_mi_1v1:"Kakashi vs Masked Interceptor",
    academy_kakashi_origin_battle_seq_mi:"Kakashi vs Masked Interceptor",
    academy_kakashi_origin_battle_ps_1v1:"Kakashi vs Package Smuggler",
    academy_kakashi_origin_battle_seq_ps:"Kakashi vs Package Smuggler",
    academy_kakashi_origin_battle_amt_1v1:"Kakashi vs ANBU Marked Target",
    academy_kakashi_origin_battle_kakashi_pakkun_vs_amt:"Kakashi + temporary ninken support vs ANBU Marked Target",
    academy_kakashi_origin_battle_seq_amt_pakkun:"Kakashi + temporary ninken support vs ANBU Marked Target",
    academy_kakashi_origin_battle_amt_ps_2v1:"Kakashi vs ANBU Marked Target + Package Smuggler",
    academy_kakashi_origin_battle_ps_mi_2v1:"Kakashi vs Package Smuggler + Masked Interceptor",
    academy_kakashi_origin_battle_amt_ps_mi_3v1:"Kakashi vs ANBU Marked Target + Package Smuggler + Masked Interceptor"
  };
  return Object.values(s.battles||{}).map(row=>`${names[row.encounterId]||"Kakashi Battle"} — ${row.outcome==="victory"?"Victory":"Defeat"}.`);
}
function receiptCues(){
  const s=state();const lines=[
    "ASSIGNMENT","Hokage-authorised limited retrieval operation.","",
    "FIRST ACTION",firstActionReceipt(s),"",
    "PACKAGE",packageReceiptLine(s),"",
    "PARTICIPANTS"
  ];
  for(const ref of ["MI","PS","AMT"]){const line=participantReceiptLine(s,ref);if(line)lines.push(line);}
  lines.push("","BATTLES",...battleReceiptLines(s),"","REPORT","ANBU report — completed from Kakashi-observed facts.");
  if(s.pakkun.present||s.pakkun.departed)lines.push("","NINKEN","Temporary ninken intervention — Present.","Permanent Summon ownership — None.");
  if(s.knowledge.getCloserContingency)lines.push("","INTELLIGENCE","Handoff contingency overheard.","Downstream package destination — Unknown.");
  if(s.knowledge.askWhere)lines.push("","INTELLIGENCE","Original carrier's role ended at handoff.","Downstream destination — Unknown to original carrier.");
  const killed=["MI","PS","AMT"].filter(ref=>s.participants[ref]&&s.participants[ref].state==="KILLED");
  const lethalEscaped=["MI","PS","AMT"].filter(ref=>s.participants[ref]&&s.participants[ref].state==="ESCAPED"&&(s.participants[ref].disposition==="KILL"||s.participants[ref].lethalIntent===true));
  if(killed.length||lethalEscaped.length)lines.push("","LETHAL HISTORY",...killed.map(ref=>participantReceiptLine(s,ref)),...lethalEscaped.map(ref=>participantReceiptLine(s,ref)),`Confirmed kills: ${killed.length}`,`Failed lethal attempts: ${lethalEscaped.length}`);
  const result=s.rewards&&s.rewards.terminalResult||null;
  const receipts=result&&Array.isArray(result.sourceReceipts)?result.sourceReceipts:[];
  if(receipts.length)lines.push("","REWARDS");
  const why={
    kak_origin_ryo_terminal_debrief:"terminal factual ANBU debrief and Chronicle Receipt completed",
    kak_origin_ryo_package_recovered:"package returned to the authorised Konoha side",
    kak_origin_ryo_actionable_intelligence:"new verified package-route intelligence reported",
    kak_origin_ryo_live_custody:"at least one relevant participant delivered alive to legitimate authority",
    kak_origin_ryo_exceptional_field_execution:"authorised exceptional field-execution benchmark met",
    kak_origin_battle_mi_victory_ryo_01:"solo Masked Interceptor Battle victory",
    kak_origin_battle_ps_victory_ryo_01:"solo Package Smuggler Battle victory",
    kak_origin_battle_amt_victory_ryo_01:"solo ANBU Marked Target Battle victory"
  };
  for(const receipt of receipts){
    if(receipt.rewardClass==="battle_cash"||receipt.rewardClass==="terminal_cash")lines.push(`${receipt.ryo} Ryō — ${why[receipt.sourceId]||receipt.sourceId}.`);
    if(receipt.itemId==="field_recovery_pill")lines.push(`Field Recovery Pill ×1 — ${receipt.metadata&&receipt.metadata.timing==="immediate_solo_mi_victory"?"solo Masked Interceptor victory resupply":"PL Battle participation resupply at terminal debrief"}.`);
    if(receipt.itemId==="academy_training_tanto")lines.push("Academy Training Tantō ×1 — exceptional field-evaluation award.");
  }
  lines.push("","DEVELOPMENT","Discipline/Stamina development derives from committed Battle actions; no generic Character EXP or direct PL is granted by the debrief.");
  return[RECORD(lines.join("\n"))];
}

// ---------------------------------------------------------------------------
// OPENING — exact current verbatim locks.
// ---------------------------------------------------------------------------
addBeat("v2_scene01_rooftop",{backdrop:B.rooftop,location:"KONOHA ROOFTOP · NIGHT",objective:"Stop the package from falling into the wrong hands.",actors:["kakashi","anbu"],preset:"rooftop_2_person",transition:"wipe",onEnter:()=>mutate(()=>{}),cues:G("f01.rooftop"),nextBeatId:"v2_scene02_tail"});

addBeat("v2_scene02_tail",{mode:"choice",backdrop:B.alley,location:"KONOHA ALLEYWAY · NIGHT",objective:"Follow the target without being seen.",actors:["kakashi","amt"],preset:"tail",cues:G("f01.tail"),choices:[
 C("watch_exchange","WATCH THE HANDOFF","v2_watch_exchange",{patch:()=>history("WATCH_THE_EXCHANGE")}),
 C("move_in_closer","GET CLOSER","v2_get_closer_resolver",{patch:()=>history("MOVE_IN_CLOSER")}),
 C("strike_before_handoff","INTERRUPT THE HANDOFF","v2_direct_strike_setup",{patch:()=>history("STRIKE_BEFORE_THE_HANDOFF")}),
 C("slip_for_package","SLIP IN AND TAKE IT","v2_direct_pickpocket_resolver",{patch:()=>history("SLIP_IN_FOR_THE_PACKAGE")})
]});

addBeat("v2_watch_exchange",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · MAIN STREET · NIGHT",objective:"Retrieve the package.",actors:["amt","ps","mi"],preset:"sakura_3_person",onEnter:()=>{packageState("PS");participant("MI",{state:"AVAILABLE"});return history("HANDOFF_COMPLETED");},cues:G("f01.watch_handoff"),choices:[
 C("stop_assassin","INTERCEPT THE MASKED ATTACKER","v2_stop_assassin_setup",{patch:()=>history("STOP_THE_ASSASSIN")}),
 C("secure_package","GO FOR THE PACKAGE","v2_secure_package_setup",{patch:()=>history("SECURE_THE_PACKAGE")}),
 C("secure_before_assassin","BEAT HER TO THE PACKAGE","v2_secure_before_resolver",{patch:()=>history("SECURE_PACKAGE_BEFORE_ASSASSIN")}),
 C("assassin_then_package","DEAL WITH HER FIRST","v2_assassin_then_package_setup",{patch:()=>history("DEFEAT_ASSASSIN_THEN_SECURE")}),
 C("go_original_target","CHASE THE MAN FROM THE PHOTO","v2_go_amt_pursuit_resolver",{patch:()=>history("GO_AFTER_ORIGINAL_TARGET")})
]});

// ---------------------------------------------------------------------------
// INTERCEPT THE MASKED ATTACKER.
// ---------------------------------------------------------------------------
addBeat("v2_stop_assassin_setup",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"battle_pair",cues:G("f01.intercept_masked"),nextBeatId:"v2_battle_mi_stop"});

addBeat("v2_battle_mi_stop",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Defeat Masked Interceptor.",actors:["kakashi","mi"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_mi_1v1","mi_stop","v2_mi_stop_win","v2_mi_stop_loss","AK_SA_009")});

addBeat("v2_mi_stop_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:ctx=>captureBattle("mi_stop",ctx,s=>{s.participants.MI.state="ESCAPED";s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:G("f01.mi_loss"),nextBeatId:"v2_report"});

addBeat("v2_mi_stop_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"post_battle",onEnter:ctx=>captureBattle("mi_stop",ctx,s=>{s.participants.MI.state="BATTLE_DEFEATED";}),cues:()=>battleActions("mi_stop")<=STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS?G("f01.mi_fast_win"):G("f01.mi_slow_win"),choices:[
 C("mi_pursue_ps","CHASE THE PACKAGE","v2_ps_pursuit_resolver",{available:()=>battleActions("mi_stop")<=STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS,patch:()=>history("PURSUE_PS_AFTER_MI")}),
 C("mi_kill","KILL HER","v2_mi_kill_result",{patch:()=>{const r=resolveDisposition("KILL","MI","mi_kill");if(!r.success)return r;history("KILL_MI",{outcome:r.outcome});return r;}}),
 C("mi_anbu","BRING HER TO ANBU","v2_mi_anbu_depart",{patch:()=>transferIntent("MI","ANBU","mi_anbu")}),
 C("mi_police","TAKE HER TO THE UCHIHA POLICE","v2_mi_police_depart",{patch:()=>transferIntent("MI","POLICE","mi_police")}),
 C("mi_restrain","RESTRAIN HER AND KEEP MOVING","v2_mi_restrained_next",{available:()=>battleActions("mi_stop")<=STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS,patch:()=>{const r=resolveDisposition("RESTRAIN","MI","mi_restrain");if(!r.success)return r;projectExtractionPlanning("MI",r,"mi_restrain");history("RESTRAIN_MI_CONTINUE",{outcome:r.outcome});return r;}})
]});
addBeat("v2_mi_restrained_next",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"post_battle",cues:()=>singleDispositionCues("MI","RESTRAIN"),onAdvance:()=>history("PURSUE_PS_AFTER_RESTRAIN_MI",{miOutcome:dispositionOutcome("MI")}),nextBeatId:"v2_ps_pursuit_resolver"});

// PS pursuit after MI.
addBeat("v2_ps_pursuit_resolver",{mode:"choice",machineResolved:true,backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Recover the package.",actors:["kakashi","ps"],preset:"pursuit",onEnter:()=>resolverEnter("psPursuit"),cues:[N("Kakashi moves before Package Smuggler can disappear completely."),N("The Sakura tree drops behind him as the chase cuts through a narrow street and up across the roofs."),N("The receiver already has a lead, but Kakashi can still see the package tucked tight against his side."),N("Package Smuggler is not searching for a hiding place. He is trying to build enough distance that he will never need one."),N("Kakashi increases his pace.")],choices:[
 C("ps_pursuit_success","RESOLVE RESULT","v2_ps_pursuit_success",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_SUCCESS"}),
 C("ps_pursuit_failure","RESOLVE RESULT","v2_ps_pursuit_failure",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_FAILURE"})
]});
addBeat("v2_ps_pursuit_failure",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>mutate(s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[N("Kakashi reaches the next junction and finds three ways forward."),N("He takes the roofline first. Nothing."),N("Drops back to the street. Still nothing."),N("The ordinary night sounds begin filling the space where Package Smuggler should have been: shutters, distant voices, sandals somewhere too far away to separate from the rest."),N("Kakashi checks one last roof edge and finds no movement carrying the package."),N("The receiver has enough distance now that pursuit would be choosing a direction and hoping."),N("ANBU Marked Target has had even longer."),N("Kakashi stays at the junction for one more second, fixing the failure in his memory instead of pretending the trail is still there."),N("Then he turns back toward ANBU.")],nextBeatId:"v2_report"});
addBeat("v2_ps_pursuit_success",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Package Smuggler turns into the next street and finds Kakashi landing ahead of him."),N("He stops hard and checks the road behind him."),Q("PACKAGE SMUGGLER","You should've stayed with the woman you put down."),Q("KAKASHI","You were counting on that."),N("Package Smuggler's grip tightens around the package."),Q("PACKAGE SMUGGLER","You don't even know what you're carrying."),Q("KAKASHI","No. I know who handed it over, and who ANBU sent me to follow."),Q("PACKAGE SMUGGLER","You think taking it back fixes this?"),Q("KAKASHI","It gets the package back."),N("Package Smuggler's free hand drops toward his weapon. Kakashi shifts with him.")],nextBeatId:"v2_battle_ps_seq"});
addBeat("v2_battle_ps_seq",{mode:"battle_transition",backdrop:B.alleyAlt,location:"KONOHA · PL BATTLE",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_seq_ps","ps_seq","v2_ps_seq_win","v2_ps_seq_loss","AK_SA_022")});
addBeat("v2_ps_seq_loss",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_seq",ctx,s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[N("Package Smuggler finds the opening first."),N("Kakashi reaches for the arm protecting the package and misses by inches."),N("The receiver drives past him instead of staying to finish the fight."),N("Kakashi turns and gives chase, but the first corner costs him sight of the package and the second costs him the man."),N("He reaches the crossing with his breathing still too high and listens."),N("Nothing separates itself from the village around him."),N("Package Smuggler is gone with the objective. ANBU Marked Target has had the whole fight to disappear as well."),N("Kakashi looks once down each empty route, then heads back to report exactly that.")],nextBeatId:"v2_report"});
addBeat("v2_ps_seq_win",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:null,actors:["kakashi","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_seq",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[N("Package Smuggler goes down."),N("Kakashi stays on him long enough to make sure the fight is finished, then reaches for the package."),N("He checks the seal and secures it against himself."),N("Only then does he look toward the route ANBU Marked Target took.")],choices:[
 C("ps_go_amt","CHASE THE MAN FROM THE PHOTO","v2_amt_after_ps",{available:()=>battleActions("ps_seq")<=3,patch:()=>history("PS_FAST_CONTINUE_AMT")}),
 C("ps_kill","KILL HIM","v2_ps_kill_result",{patch:()=>{const r=resolveDisposition("KILL","PS","ps_kill");if(!r.success)return r;history("KILL_PS",{outcome:r.outcome});return r;}}),
 C("ps_restrain_continue","RESTRAIN HIM AND KEEP MOVING","v2_ps_restrain_continue_result",{available:()=>battleActions("ps_seq")<=3,patch:()=>{const r=resolveDisposition("RESTRAIN","PS","ps_restrain_continue");if(!r.success)return r;projectExtractionPlanning("PS",r,"ps_restrain_continue");history("RESTRAIN_PS_CONTINUE",{outcome:r.outcome});return r;}}),
 C("ps_anbu","BRING HIM TO ANBU","v2_ps_anbu_depart",{patch:()=>transferIntent("PS","ANBU","ps_anbu")}),
 C("ps_police","TAKE HIM TO THE UCHIHA POLICE","v2_ps_police_depart",{patch:()=>transferIntent("PS","POLICE","ps_police")}),
 C("ps_report","RETURN TO ANBU","v2_report",{patch:()=>history("RETURN_AFTER_PS")})
]});
addBeat("v2_amt_after_ps",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>{participant("AMT",{state:"AVAILABLE"});setPakkun(true);return history("PAKKUN_INTERCEPT_AFTER_PS");},cues:[N("Kakashi leaves Package Smuggler behind with the recovered package secured against him."),N("The other trail is thin, but not gone."),N("He cuts across the roofs, drops through a side street, and catches movement ahead."),N("ANBU Marked Target is still running."),N("The man reaches the next street and stops short. A small ninken is already standing in the route ahead."),Q("PAKKUN","This the one?"),N("Kakashi lands on the far side of the street."),Q("KAKASHI","Yes."),N("ANBU Marked Target notices the recovered package."),Q("ANBU MARKED TARGET","You got it back."),Q("KAKASHI","I did."),Q("KAKASHI","You're still coming back with me."),Q("ANBU MARKED TARGET","You think carrying that means you understand what happened?"),Q("KAKASHI","No."),N("Pakkun shifts off the centreline without being asked."),Q("ANBU MARKED TARGET","Then what exactly are you planning to do with me?"),Q("KAKASHI","Stop you first. Decide after.")],nextBeatId:"v2_battle_amt_seq_pakkun"});
addBeat("v2_battle_amt_seq_pakkun",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_seq_amt_pakkun","amt_seq","v2_amt_seq_win","v2_amt_seq_loss","AK_SA_022")});
addBeat("v2_amt_seq_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_seq",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:[N("ANBU Marked Target finds the opening first and wins the fight."),N("The package stays secured against Kakashi, so the man looks at it once and chooses the open route instead."),N("By the time Kakashi can move again, he is gone."),Q("PAKKUN","You kept the package."),Q("KAKASHI","I lost him."),N("Pakkun looks down the empty street."),Q("PAKKUN","Then report him lost.")],nextBeatId:"v2_report"});
addBeat("v2_amt_seq_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_seq",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:[N("ANBU Marked Target hits the ground and stays there."),N("Kakashi remains close enough to stop another escape attempt."),N("Pakkun watches the alley mouth."),N("The package is secure. The man is beaten."),N("What happens to him now is a separate decision.")],choices:[
 C("amt_seq_police","TAKE HIM TO THE UCHIHA POLICE","v2_amt_police_depart",{patch:()=>transferIntent("AMT","POLICE","amt_seq_police")}),
 C("amt_seq_release","LET HIM GO","v2_amt_release_result",{patch:()=>{const r=dispose("AMT","RELEASE");if(!r.success)return r;return history("RELEASE_AMT");}}),
 C("amt_seq_kill","KILL HIM","v2_amt_kill_result",{patch:()=>{const r=resolveDisposition("KILL","AMT","amt_seq_kill");if(!r.success)return r;history("KILL_AMT",{outcome:r.outcome});return r;}}),
 C("amt_seq_anbu","BRING HIM TO ANBU","v2_amt_anbu_depart",{patch:()=>transferIntent("AMT","ANBU","amt_seq_anbu")}),
 C("amt_seq_collect","RESTRAIN HIM AND GO BACK FOR THE OTHERS","v2_amt_restrain_collect_result",{available:()=>restrainedParticipantKeys().length>0,patch:()=>{const r=resolveDisposition("RESTRAIN","AMT","amt_seq_collect");if(!r.success)return r;projectExtractionPlanning("AMT",r,"amt_seq_collect");history("COLLECT_ALL_RESTRAINED",{outcome:r.outcome});return r;}})
]});
function groupCollectActorKeys(){
 const s=state(),keys=["kakashi"];
 if(s&&s.participants.MI&&s.participants.MI.state==="RESTRAINED")keys.push("mi");
 if(s&&s.participants.PS&&s.participants.PS.state==="RESTRAINED")keys.push("ps");
 if(s&&s.participants.AMT&&s.participants.AMT.state==="RESTRAINED")keys.push("amt");
 if(s&&s.pakkun.present)keys.push("pakkun");
 return keys;
}
function groupCollectCues(){
 const s=state(),restrained=new Set(restrainedParticipantKeys(s)),out=[...W("custodyGolden06B","collection_open")];
 if(restrained.has("AMT"))out.push(...W("custodyGolden06B","collection_amt"));
 if(restrained.has("PS"))out.push(...W("custodyGolden06B","collection_ps"));
 if(restrained.has("MI"))out.push(...W("custodyGolden06B","collection_mi"));
 return out;
}
function collectRestrainedParticipants(){
 const keys=restrainedParticipantKeys(),s=state();
 if(!s)return{success:false,reason:"kakashi_v2_state_missing"};
 const result=mutate(stateRow=>keys.forEach(key=>{const row=stateRow.participants[key];row.collected=true;row.collectionLocation="mobile_escort";}));
 if(!result.success)return result;
 const occ=commitKakashiOccurrence("collection","restrained_group",{participantRefs:keys,collectionBegan:keys.length>0});
 if(keys.length&&occ.success)projectKakashiEvidence(occ.record,{
   qualificationId:"covert_operations.extraction_specialist",
   tags:["covert_operations.extraction_specialist:subject_recovery"],
   significance:1,activityFamilyId:"academy_kakashi_origin_extraction",causalRootKey:"extraction",targetRefs:keys,
   context:{stage:"subject_recovery_begins",livingRestrainedCount:keys.length}
 });
 return{success:true,participantKeys:keys,sourceOccurrenceId:occ&&occ.record&&(occ.record.sourceOccurrenceId||occ.record.occurrenceId)||null};
}
function deliverRestrainedGroup(kind){
 const keys=restrainedParticipantKeys().filter(key=>state().participants[key]&&state().participants[key].collected===true);
 if(!keys.length)return{success:false,reason:"kakashi_v2_no_collected_restrained_participants"};
 const transfer=disposeGroup(kind,keys);if(!transfer.success)return transfer;
 const occ=commitKakashiOccurrence("delivery",`${String(kind).toLowerCase()}_restrained_group`,{participantRefs:keys,institution:kind,deliveredLivingCount:keys.length});
 if(occ.success){
   const allThree=keys.length===3;
   projectKakashiEvidence(occ.record,{
     qualificationId:"covert_operations.extraction_specialist",
     tags:allThree?["covert_operations.extraction_specialist:extraction_planning","covert_operations.extraction_specialist:subject_recovery"]:["covert_operations.extraction_specialist:subject_recovery"],
     significance:allThree?3:2,activityFamilyId:"academy_kakashi_origin_extraction",causalRootKey:"extraction",targetRefs:keys,
     context:{stage:"institutional_delivery",institution:kind,deliveredLivingCount:keys.length,allThree}
   });
 }
 history(kind==="ANBU"?"GROUP_TO_ANBU":"GROUP_TO_POLICE",{participantKeys:keys});
 return{success:true,participantKeys:keys,institution:kind};
}
addBeat("v2_group_collect",{backdrop:B.alleyAlt,location:"KONOHA · COLLECTION",objective:"Collect the restrained participants.",actors:()=>groupCollectActorKeys(),preset:"escort",onAdvance:()=>collectRestrainedParticipants(),cues:()=>groupCollectCues(),nextBeatId:"v2_group_collect_choice"});
addBeat("v2_group_collect_choice",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · COLLECTION",objective:"Transfer the restrained participants.",actors:()=>groupCollectActorKeys(),preset:"escort",cues:[],choices:[
 C("collect_one_mi_anbu","BRING HER TO ANBU","v2_collected_anbu_handoff",{available:()=>{const k=collectedParticipantKeys();return k.length===1&&k[0]==="MI";},patch:()=>transferIntent("MI","ANBU","collect_one_mi_anbu")}),
 C("collect_one_mi_police","TAKE HER TO THE UCHIHA POLICE","v2_collected_police_handoff",{available:()=>{const k=collectedParticipantKeys();return k.length===1&&k[0]==="MI";},patch:()=>transferIntent("MI","POLICE","collect_one_mi_police")}),
 C("collect_one_ps_anbu","BRING HIM TO ANBU","v2_collected_anbu_handoff",{available:()=>{const k=collectedParticipantKeys();return k.length===1&&k[0]==="PS";},patch:()=>transferIntent("PS","ANBU","collect_one_ps_anbu")}),
 C("collect_one_ps_police","TAKE HIM TO THE UCHIHA POLICE","v2_collected_police_handoff",{available:()=>{const k=collectedParticipantKeys();return k.length===1&&k[0]==="PS";},patch:()=>transferIntent("PS","POLICE","collect_one_ps_police")}),
 C("collect_one_amt_anbu","BRING HIM TO ANBU","v2_collected_anbu_handoff",{available:()=>{const k=collectedParticipantKeys();return k.length===1&&k[0]==="AMT";},patch:()=>transferIntent("AMT","ANBU","collect_one_amt_anbu")}),
 C("collect_one_amt_police","TAKE HIM TO THE UCHIHA POLICE","v2_collected_police_handoff",{available:()=>{const k=collectedParticipantKeys();return k.length===1&&k[0]==="AMT";},patch:()=>transferIntent("AMT","POLICE","collect_one_amt_police")}),
 C("collect_group_anbu","BRING THEM TO ANBU","v2_collected_anbu_handoff",{available:()=>collectedParticipantKeys().length>=2,patch:()=>transferIntent(collectedParticipantKeys(),"ANBU","collect_group_anbu")}),
 C("collect_group_police","TAKE THEM TO THE UCHIHA POLICE","v2_collected_police_handoff",{available:()=>collectedParticipantKeys().length>=2,patch:()=>transferIntent(collectedParticipantKeys(),"POLICE","collect_group_police")})
]});

// Direct AMT pursuit after MI.
addBeat("v2_amt_direct_pursuit_fail",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>mutate(s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";}),cues:W("originalTarget","2_pursuit_failure"),nextBeatId:"v2_report"});
addBeat("v2_amt_direct_intercept",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:W("originalTarget","3_pursuit_success_pakkun_corners_amt"),nextBeatId:"v2_battle_amt_direct_pakkun"});
addBeat("v2_battle_amt_direct_pakkun",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","amt_direct","v2_amt_missing_win","v2_amt_missing_loss","AK_SA_021")});
addBeat("v2_amt_missing_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_direct",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:W("originalTarget","5_amt_defeats_kakashi_pakkun"),nextBeatId:"v2_report"});
addBeat("v2_amt_missing_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_direct",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:W("originalTarget","6_kakashi_pakkun_defeat_amt"),choices:[
 C("amt_missing_kill","KILL HIM","v2_amt_kill_result",{patch:()=>resolveDisposition("KILL","AMT","amt_missing_kill")}),
 C("amt_missing_restrain","RESTRAIN HIM","v2_amt_restrain_report_result",{patch:()=>{const r=resolveDisposition("RESTRAIN","AMT","amt_missing_restrain");if(!r.success)return r;projectExtractionPlanning("AMT",r,"amt_missing_restrain");return r;}}),
 C("amt_missing_anbu","BRING HIM TO ANBU","v2_amt_anbu_depart",{patch:()=>transferIntent("AMT","ANBU","amt_missing_anbu")}),
 C("amt_missing_police","TAKE HIM TO THE UCHIHA POLICE","v2_amt_police_depart",{patch:()=>transferIntent("AMT","POLICE","amt_missing_police")})
]});

// ---------------------------------------------------------------------------
// SECURE THE PACKAGE.
// ---------------------------------------------------------------------------
addBeat("v2_secure_package_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","ps","mi"],preset:"sakura_3_person",cues:W("securePackage","1_secure_the_package"),nextBeatId:"v2_battle_ps_mi"});
addBeat("v2_battle_ps_mi",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Retrieve the package.",actors:["kakashi","ps","mi"],preset:"battle_trio",cues:[N("Kakashi Hatake vs Package Smuggler + Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_ps_mi_2v1","ps_mi","v2_ps_mi_win","v2_ps_mi_loss","AK_SA_014")});
addBeat("v2_ps_mi_loss",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:ctx=>captureBattle("ps_mi",ctx,s=>{s.participants.PS.state="ESCAPED";s.participants.MI.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:W("securePackage","3_kakashi_loses_the_2_v_1"),nextBeatId:"v2_report"});
addBeat("v2_ps_mi_win",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","ps","mi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_mi",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";s.participants.MI.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:W("securePackage","4_kakashi_wins_the_2_v_1"),choices:[
 C("secure_stay_first","CHASE THE MAN FROM THE PHOTO","v2_secure_amt_pursuit_resolver",{patch:()=>history("SECURE_PACKAGE_STAY_FIRST")}),
 C("secure_return","RETURN TO ANBU","v2_report",{patch:()=>history("SECURE_PACKAGE_RETURN_REPORT")})
]});
addBeat("v2_secure_amt_pursuit_resolver",{mode:"choice",machineResolved:true,backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch the first man.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>resolverEnter("secureAmtPursuit"),cues:[
 N("Kakashi leaves the two defeated shinobi behind."),N("Not because they no longer matter."),N("Because the first man is still moving."),N("The package is secure now."),
 N("That changes the calculation."),N("Kakashi can chase without wondering whether every step is taking him farther from the objective."),
 N("He takes the rooftops."),N("The trail is thinner than it was before the fight."),N("Still there."),N("For now.")
],choices:[
 C("secure_amt_success","RESOLVE RESULT","v2_secure_amt_intercept",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_SUCCESS"}),
 C("secure_amt_fail","RESOLVE RESULT","v2_secure_amt_fail",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_FAILURE"})
]});
addBeat("v2_secure_amt_fail",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>participant("AMT",{state:"ESCAPED"}),cues:[
 N("Kakashi clears another rooftop."),N("Nothing."),N("He drops to street level."),N("Checks the crossing."),N("The route has split too many times."),
 N("Whatever lead remained after the fight is gone."),N("He stops chasing before guesswork becomes a substitute for a trail."),
 N("The package is still secured against him."),N("The first man is gone."),N("Those facts can both be true.")
],nextBeatId:"v2_report"});
addBeat("v2_secure_amt_intercept",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:[N("ANBU Marked Target cuts into the next alley."),N("Then stops."),N("A small ninken is sitting in the route ahead of him."),N("Kakashi lands behind."),Q("PAKKUN","This the one?"),Q("KAKASHI","Yes."),Q("ANBU MARKED TARGET","You got it back."),Q("KAKASHI","I did."),Q("ANBU MARKED TARGET","Then why are you still following me?"),Q("KAKASHI","You were still part of it."),Q("PAKKUN","He'll run if you let him."),Q("KAKASHI","I know."),Q("ANBU MARKED TARGET","You don't even know each other."),Q("PAKKUN","Doesn't matter.")],nextBeatId:"v2_battle_secure_amt"});
addBeat("v2_battle_secure_amt",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","secure_amt","v2_secure_amt_win","v2_secure_amt_loss","AK_SA_025")});
addBeat("v2_secure_amt_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("secure_amt",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:[N("ANBU Marked Target finds the opening first."),N("Kakashi loses the fight."),N("He does not lose the package with it."),Q("PAKKUN","You kept the package."),Q("KAKASHI","I lost him."),Q("PAKKUN","Then report both.")],nextBeatId:"v2_report"});
addBeat("v2_secure_amt_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("secure_amt",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:[
 N("ANBU Marked Target goes down."),N("Kakashi stays on him until the fight is unquestionably over."),N("Pakkun stays where he can see both of them."),
 N("The package remains secure."),N("The man does not."),N("Not yet.")
],choices:[
 C("secure_amt_police","TAKE HIM TO THE UCHIHA POLICE","v2_amt_police_depart",{patch:()=>transferIntent("AMT","POLICE","secure_amt_police")}),
 C("secure_amt_release","LET HIM GO","v2_amt_release_result",{patch:()=>{const r=dispose("AMT","RELEASE");if(!r.success)return r;return history("RELEASE_AMT");}}),
 C("secure_amt_kill","KILL HIM","v2_amt_kill_result",{patch:()=>resolveDisposition("KILL","AMT","secure_amt_kill")}),
 C("secure_amt_anbu","BRING HIM TO ANBU","v2_amt_anbu_depart",{patch:()=>transferIntent("AMT","ANBU","secure_amt_anbu")})
]});

// Secure before assassin resolver.
addBeat("v2_secure_before_resolver",{mode:"choice",machineResolved:true,backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","ps","mi"],preset:"sakura_3_person",onEnter:()=>resolverEnter("secureBefore"),cues:W("secureBeforeAssassin","1_secure_the_package_before_the_assassin"),choices:[
 C("secure_before_success","RESOLVE RESULT","v2_secure_before_success",{available:()=>getOutcome("secureBefore")==="SECURE_BEFORE_SUCCESS"}),
 C("secure_before_failure","RESOLVE RESULT","v2_secure_package_setup",{available:()=>getOutcome("secureBefore")==="SECURE_BEFORE_FAILURE"})
]});
addBeat("v2_secure_before_success",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:()=>mutate(s=>{s.package.holder="KAKASHI";s.package.recovered=true;s.participants.AMT.state="ESCAPED";s.participants.PS.state="AVAILABLE";s.participants.MI.state="AVAILABLE";}),cues:W("secureBeforeAssassin","2_resolver_success_clean_extraction"),nextBeatId:"v2_report"});

// Assassin then package reuses sequential chain, but records intent.
addBeat("v2_assassin_then_package_setup",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"battle_pair",onEnter:()=>history("ASSASSIN_THEN_PACKAGE_SEQUENCE"),cues:W("assassinThenPackage","1_entry_deal_with_her_first"),nextBeatId:"v2_battle_mi_package_second"});
addBeat("v2_battle_mi_package_second",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Defeat Masked Interceptor.",actors:["kakashi","mi"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_seq_mi","mi_package_second","v2_mi_package_second_win","v2_mi_package_second_loss","AK_SA_015")});
addBeat("v2_mi_package_second_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("mi_package_second",ctx,s=>{s.participants.MI.state="AVAILABLE";s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:W("assassinThenPackage","2_mi_battle_defeat"),nextBeatId:"v2_report"});
addBeat("v2_mi_package_second_win",{mode:"choice",machineResolved:true,backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Catch the package.",actors:["kakashi","mi"],preset:"post_battle",onEnter:ctx=>captureBattle("mi_package_second",ctx,s=>{s.participants.MI.state="BATTLE_DEFEATED";}),cues:()=>battleActions("mi_package_second")<=4?[N("Masked Interceptor goes down."),N("Footsteps are still carrying through the next street."),N("Kakashi looks once at her."),N("Then runs."),N("The package is moving ahead of him.")]:[N("Masked Interceptor goes down."),N("Kakashi turns immediately."),N("Listens."),N("Nothing."),N("He takes the roof anyway."),N("One building."),N("Then another."),N("No package."),N("No running footsteps."),N("No line worth following."),N("Kakashi stops."),N("Looks back once toward the Sakura tree."),N("Then turns toward ANBU.")],choices:[
 C("package_second_fast_resolve","RESOLVE RESULT","v2_package_second_ps_pursuit",{available:()=>battleActions("mi_package_second")<=4,patch:()=>history("PACKAGE_SECOND_CHASE_PS")}),
 C("package_second_slow_resolve","RESOLVE RESULT","v2_report",{available:()=>battleActions("mi_package_second")>4,patch:()=>{participant("PS",{state:"ESCAPED"});participant("AMT",{state:"ESCAPED"});history("PACKAGE_SECOND_TOO_SLOW");}})
]});
addBeat("v2_package_second_ps_pursuit",{mode:"choice",machineResolved:true,backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch the package.",actors:["kakashi","ps"],preset:"pursuit",onEnter:()=>resolverEnter("psPursuit"),cues:[N("Masked Interceptor goes down quickly enough that the next problem is still audible."),N("Footsteps."),N("Fading."),N("Not gone."),N("Kakashi looks once at the masked woman."),N("His attention snaps back to the package route."),N("Package Smuggler has a lead."),N("Not an insurmountable one."),N("Kakashi moves.")],choices:[
 C("package_second_ps_reached","RESOLVE RESULT","v2_package_second_ps_reached",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_SUCCESS"}),
 C("package_second_ps_lost","RESOLVE RESULT","v2_package_second_ps_lost",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_FAILURE"})
]});
addBeat("v2_package_second_ps_lost",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>mutate(s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:W("assassinThenPackage","5_ps_catch_up_failure"),nextBeatId:"v2_report"});
addBeat("v2_package_second_ps_reached",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:W("assassinThenPackage","6_ps_catch_up_success"),nextBeatId:"v2_battle_ps_package_second"});
addBeat("v2_battle_ps_package_second",{mode:"battle_transition",backdrop:B.alleyAlt,location:"KONOHA · PL BATTLE",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_seq_ps","ps_package_second","v2_ps_package_second_win","v2_ps_package_second_loss","AK_SA_015")});
addBeat("v2_ps_package_second_loss",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_package_second",ctx,s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[N("Package Smuggler gets through him."),N("For a moment Kakashi is still close enough to see the package striking against the man's side as he runs."),N("Then the next turn takes both of them out of sight."),N("Kakashi forces himself after him anyway."),N("The trail survives one roof, then half of another, then disappears into the village."),N("This was Kakashi's second fight over the same objective tonight."),N("The second loss costs more than the package. Whatever chance remained of reaching ANBU Marked Target is gone with the time spent here."),N("Kakashi stops chasing when the route becomes guesswork and turns back toward ANBU.")],nextBeatId:"v2_report"});
addBeat("v2_ps_package_second_win",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:null,actors:["kakashi","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_package_second",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[
 N("Package Smuggler goes down."),N("Kakashi stays on him long enough to know the fight is finished."),N("Then his attention moves to the objective."),
 N("He takes the package from the defeated man's reach."),N("Checks the seal."),N("Secures it against himself."),N("Only then does he look farther down the route.")
],choices:[
 C("package_second_stay_amt","CHASE THE MAN FROM THE PHOTO","v2_package_second_amt_pursuit",{available:()=>battleActions("ps_package_second")<=3,patch:()=>history("PACKAGE_SECOND_STAY_AMT")}),
 C("package_second_return","RETURN TO ANBU","v2_report",{patch:()=>history("PACKAGE_SECOND_RETURN_REPORT")})
]});
addBeat("v2_package_second_amt_pursuit",{mode:"choice",machineResolved:true,backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch the first man.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>resolverEnter("secureAmtPursuit"),cues:[N("Kakashi leaves Package Smuggler behind."),N("The package is secured."),N("The first man's trail is thin."),N("Still usable."),N("Kakashi takes it.")],choices:[
 C("package_second_amt_success","RESOLVE RESULT","v2_package_second_amt_intercept",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_SUCCESS"}),
 C("package_second_amt_failure","RESOLVE RESULT","v2_secure_amt_fail",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_FAILURE"})
]});
addBeat("v2_package_second_amt_intercept",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:[
 N("ANBU Marked Target cuts into the next alley."),N("Then stops."),N("A small ninken is sitting in the route ahead of him."),N("The man looks at it."),N("The ninken looks past him."),
 N("Kakashi lands behind."),N("Pakkun's ears lift."),Q("PAKKUN","This the one?"),N("Kakashi keeps his eye on the man between them."),Q("KAKASHI","Yes."),
 N("ANBU Marked Target notices the package secured against Kakashi."),Q("ANBU MARKED TARGET","You got it back."),Q("KAKASHI","I did."),
 Q("ANBU MARKED TARGET","Then why are you still following me?"),N("Kakashi shifts his stance."),Q("KAKASHI","You were the first man in the exchange."),
 Q("ANBU MARKED TARGET","And that matters more than finishing the assignment?"),Q("KAKASHI","The assignment is here."),N("Kakashi touches the package once."),N("Then looks back at him."),
  Q("KAKASHI","You were still part of it."),N("Pakkun rises as ANBU Marked Target glances toward the alley mouth."),
  Q("PAKKUN","He'll run if you let him."),Q("KAKASHI","I know."),Q("ANBU MARKED TARGET","You don't even know each other."),Q("PAKKUN","Doesn't matter.")
],nextBeatId:"v2_battle_amt_package_second"});
addBeat("v2_battle_amt_package_second",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_seq_amt_pakkun","amt_package_second","v2_amt_package_second_win","v2_amt_package_second_loss","AK_SA_015")});
addBeat("v2_amt_package_second_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_package_second",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:[
 N("ANBU Marked Target finds the opening first."),N("Kakashi loses the fight."),N("He does not lose the package with it."),
 N("The recovered objective was secured before this confrontation began."),N("ANBU Marked Target looks once toward it."),N("Then toward the route out."),N("He chooses distance."),
 N("By the time Kakashi can force himself back into the pursuit, the man is gone."),N("Pakkun remains nearby."),N("Quiet for once."),
  Q("PAKKUN","You kept the package."),N("Kakashi looks down at it."),Q("KAKASHI","I lost him."),
  Q("PAKKUN","Then report both.")
],nextBeatId:"v2_report"});
addBeat("v2_amt_package_second_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_package_second",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:[
 N("ANBU Marked Target goes down."),N("Kakashi stays on him until the fight is unquestionably over."),N("Pakkun stays where he can see both of them."),
 N("The package remains secure."),N("The man does not."),N("Not yet.")
],choices:[
 C("package_second_amt_police","TAKE HIM TO THE UCHIHA POLICE","v2_amt_police_depart",{patch:()=>transferIntent("AMT","POLICE","package_second_amt_police")}),
 C("package_second_amt_release","LET HIM GO","v2_amt_release_result",{patch:()=>{const r=dispose("AMT","RELEASE");if(!r.success)return r;return history("RELEASE_AMT");}}),
 C("package_second_amt_kill","KILL HIM","v2_amt_kill_result",{patch:()=>resolveDisposition("KILL","AMT","package_second_amt_kill")}),
 C("package_second_amt_anbu","BRING HIM TO ANBU","v2_amt_anbu_depart",{patch:()=>transferIntent("AMT","ANBU","package_second_amt_anbu")})
]});

// ---------------------------------------------------------------------------
// GO AFTER ORIGINAL TARGET from WATCH.
// ---------------------------------------------------------------------------
addBeat("v2_go_amt_pursuit_resolver",{mode:"choice",machineResolved:true,backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch ANBU Marked Target.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>{participant("PS",{state:"ESCAPED"});return resolverEnter("amtPursuitRoot");},cues:W("originalTarget","1_go_after_the_original_target"),choices:[
 C("go_amt_success","RESOLVE RESULT","v2_amt_direct_intercept",{available:()=>getOutcome("amtPursuitRoot")==="AMT_PURSUIT_SUCCESS"}),
 C("go_amt_failure","RESOLVE RESULT","v2_amt_direct_pursuit_fail",{available:()=>getOutcome("amtPursuitRoot")==="AMT_PURSUIT_FAILURE"})
]});

// ---------------------------------------------------------------------------
// MOVE IN CLOSER.
// ---------------------------------------------------------------------------
addBeat("v2_get_closer_resolver",{mode:"choice",machineResolved:true,backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Learn more without exposing yourself.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>resolverEnter("getCloser"),cues:[N("From deeper in the alley, Kakashi can see the meeting but cannot hear enough of it."),N("He leaves the safer distance behind and moves along the darker wall, avoiding the strips of lantern light on the wet stone."),N("One doorway gives him the next. Then another."),N("The Sakura tree grows larger beyond the alley mouth."),N("So do the voices.")],choices:[
 C("closer_success","RESOLVE RESULT","v2_get_closer_success",{available:()=>getOutcome("getCloser")==="GET_CLOSER_SUCCESS"}),
 C("closer_failure","RESOLVE RESULT","v2_get_closer_failure",{available:()=>getOutcome("getCloser")==="GET_CLOSER_FAILURE"})
]});
addBeat("v2_get_closer_success",{mode:"choice",backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Choose what to do with the handoff.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>mutate(s=>{s.knowledge.getCloserContingency=true;}),cues:[N("Neither man looks toward Kakashi."),N("He settles into the shadow near the end of the alley, close enough to hear them clearly."),Q("ANBU MARKED TARGET","You said once I hand it over, I'm done."),Q("PACKAGE SMUGGLER","You are."),Q("ANBU MARKED TARGET","And if somebody followed me?"),N("Package Smuggler glances along the main street."),Q("PACKAGE SMUGGLER","Then you keep walking."),Q("ANBU MARKED TARGET","With it?"),N("Now Package Smuggler looks at him."),Q("PACKAGE SMUGGLER","Until I say otherwise."),Q("ANBU MARKED TARGET","That wasn't the plan."),Q("PACKAGE SMUGGLER","Plans are for empty streets."),Q("ANBU MARKED TARGET","And if the street is empty?"),N("Package Smuggler holds out his hand."),Q("PACKAGE SMUGGLER","Then I take it, and you disappear."),Q("ANBU MARKED TARGET","Where does it go after you?"),N("The hint of a smile reaches Package Smuggler."),Q("PACKAGE SMUGGLER","Away from you."),N("Kakashi has what he came closer for: the carrier's role ends at the handoff, unless the street stops being safe."),N("What happens after Package Smuggler takes the package is still unknown."),N("The waiting hand remains between the two men. Kakashi has only a few seconds to decide whether to let it happen.")],choices:[
 C("closer_handoff","WAIT FOR THE HANDOFF","v2_closer_handoff",{patch:()=>history("CLOSER_LET_HANDOFF")}),
 C("closer_strike","INTERRUPT THE HANDOFF","v2_direct_strike_setup",{patch:()=>history("CLOSER_STRIKE")}),
 C("closer_pick","SLIP IN AND TAKE IT","v2_improved_pickpocket_resolver",{patch:()=>history("CLOSER_PICKPOCKET")})
]});
addBeat("v2_closer_handoff",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · MAIN STREET · NIGHT",objective:"Retrieve the package.",actors:["amt","ps","mi"],preset:"sakura_3_person",onEnter:()=>{packageState("PS");participant("MI",{state:"AVAILABLE"});return history("CLOSER_HANDOFF_COMPLETED");},cues:W("getCloserDownstream","3_success_let_the_handoff_happen"),choices:[
 C("closer_watch_stop","INTERCEPT THE MASKED ATTACKER","v2_stop_assassin_setup",{patch:()=>history("STOP_THE_ASSASSIN_AFTER_CLOSER")}),
 C("closer_watch_secure","GO FOR THE PACKAGE","v2_secure_package_setup",{patch:()=>history("SECURE_PACKAGE_AFTER_CLOSER")}),
 C("closer_watch_before","BEAT HER TO THE PACKAGE","v2_secure_before_resolver",{patch:()=>history("SECURE_BEFORE_AFTER_CLOSER")}),
 C("closer_watch_sequence","DEAL WITH HER FIRST","v2_assassin_then_package_setup",{patch:()=>history("ASSASSIN_THEN_PACKAGE_AFTER_CLOSER")}),
 C("closer_watch_amt","CHASE THE MAN FROM THE PHOTO","v2_go_amt_pursuit_resolver",{patch:()=>history("GO_ORIGINAL_AFTER_CLOSER")})
]});

addBeat("v2_get_closer_failure",{mode:"choice",backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Stop the package from escaping.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>mutate(s=>{s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:[N("Kakashi moves closer along the darker side of the alley until the voices begin to carry."),Q("ANBU MARKED TARGET","You said once I hand it over, I'm done."),Q("PACKAGE SMUGGLER","You are."),Q("ANBU MARKED TARGET","And if somebody followed me?"),Q("PACKAGE SMUGGLER","Then you keep walking."),Q("ANBU MARKED TARGET","With it?"),N("Package Smuggler does not answer. His eyes drop to a thin pool of rainwater along the street."),N("Lantern light trembles across the reflection—and so does Kakashi's movement in the alley."),Q("PACKAGE SMUGGLER","Hold it."),N("ANBU Marked Target freezes with one hand still over the package."),Q("ANBU MARKED TARGET","What?"),Q("PACKAGE SMUGGLER","Someone's close."),N("The target starts to turn."),Q("PACKAGE SMUGGLER","Don't. Keep it."),Q("PACKAGE SMUGGLER","Main street. Go."),N("ANBU Marked Target moves immediately, taking the package toward the Sakura tree."),N("Package Smuggler stays behind and turns toward the alley."),N("He has not found Kakashi's exact position yet, but he is walking toward it."),N("Kakashi wanted more information. Instead, he changed the handoff."),N("Now he has to choose which consequence to chase.")],choices:[
 C("failure_stay","CHASE THE PACKAGE","v2_stay_package_pursuit_resolver",{patch:()=>history("STAY_ON_PACKAGE")}),
 C("failure_stop_ps","CONFRONT THE RECEIVER","v2_stop_ps_setup",{patch:()=>history("STOP_PACKAGE_SMUGGLER")}),
 C("failure_cutoff","CUT THEM OFF","v2_cutoff_setup",{patch:()=>history("CUT_OFF_SAKURA")})
]});

addBeat("v2_stay_package_pursuit_resolver",{mode:"choice",machineResolved:true,backdrop:B.sakura,location:"SAKURA TREE · PURSUIT",objective:"Catch ANBU Marked Target.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>resolverEnter("stayPackagePursuit"),cues:[N("ANBU Marked Target is already moving away with the package. Kakashi goes after him."),N("Package Smuggler catches the movement at the alley mouth."),Q("PACKAGE SMUGGLER","There!"),N("The carrier looks back and sees Kakashi for the first time."),Q("ANBU MARKED TARGET","A kid?"),N("Kakashi runs straight past Package Smuggler's reach."),Q("PACKAGE SMUGGLER","Don't stop!"),Q("ANBU MARKED TARGET","You said I was done!"),Q("PACKAGE SMUGGLER","Not while you're holding it!"),N("That gives Kakashi one more useful fact: the carrier was never meant to keep the package."),N("The chase breaks into the open around the Sakura tree."),Q("ANBU MARKED TARGET","What do you want?"),Q("KAKASHI","The package."),N("The man gives a short, breathless laugh and changes direction around the tree."),N("Kakashi stops trying to match his speed and starts reading the exits instead.")],choices:[
 C("stay_success","RESOLVE RESULT","v2_stay_package_intercept",{available:()=>getOutcome("stayPackagePursuit")==="STAY_PACKAGE_PURSUIT_SUCCESS"}),
 C("stay_failure","RESOLVE RESULT","v2_stay_package_failure",{available:()=>getOutcome("stayPackagePursuit")==="STAY_PACKAGE_PURSUIT_FAILURE"})
]});
addBeat("v2_stay_package_failure",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:()=>mutate(s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";}),cues:[N("Kakashi cuts inside the target's route, using the Sakura tree to shorten the distance."),N("For several seconds they lose sight of each other."),N("Kakashi hears footsteps change direction and moves to intercept."),N("Wrong exit."),N("By the time he reaches the far side, ANBU Marked Target is already at the edge of the square with the package still under his arm."),N("Two late-night pedestrians step between them."),N("Kakashi changes line. The target uses the interruption and disappears between the buildings."),N("Kakashi reaches the corner seconds later to find three empty routes and nothing he can separate from the ordinary sounds of Konoha."),N("Package Smuggler is gone too."),N("Kakashi stays still long enough to fix the mistake in his memory, then turns back toward ANBU.")],nextBeatId:"v2_report"});
addBeat("v2_stay_package_intercept",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:[N("Kakashi cuts inside the target's route."),N("ANBU Marked Target reaches the far side of the alley and stops."),N("A small ninken is standing in the exit."),Q("ANBU MARKED TARGET","You blocked both exits."),N("Kakashi arrives behind him."),Q("PAKKUN","This the one?"),Q("KAKASHI","Yes."),Q("KAKASHI","Thanks."),Q("ANBU MARKED TARGET","You've been chasing this thing all night."),Q("KAKASHI","You've been running with it."),N("The target glances between Kakashi and the ninken."),Q("ANBU MARKED TARGET","And now?"),N("Kakashi's eye settles on the package."),Q("KAKASHI","Now you stop.")],choices:[
 C("demand_package","DEMAND THE PACKAGE","v2_battle_demand_amt",{patch:()=>history("DEMAND_PACKAGE")}),
 C("take_him_down","TAKE HIM DOWN","v2_take_down_setup",{patch:()=>history("TAKE_HIM_DOWN")}),
 C("ask_where","ASK WHERE IT WAS GOING","v2_ask_where",{patch:()=>history("ASK_WHERE_PACKAGE_GOING")})
]});
addBeat("v2_ask_where",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>{const m=mutate(s=>{s.knowledge.askWhere=true;s.knowledge.downstreamDestinationKnown=false;});if(!m.success)return m;const e=commitAskWhereEvidence();return e&&e.success===false?e:{success:true};},cues:[N("ANBU Marked Target keeps one hand close to the package while Pakkun holds the escape line."),N("He is waiting for Kakashi to demand it."),Q("KAKASHI","Where was it going?"),N("The question catches him off guard."),Q("ANBU MARKED TARGET","You think they told me?"),Q("KAKASHI","You asked."),N("The man gives him a tired look."),Q("ANBU MARKED TARGET","I carry it to him. He carries it somewhere else."),Q("KAKASHI","Where?"),Q("ANBU MARKED TARGET","I asked the same thing."),N("Kakashi remembers Package Smuggler's answer: away from you."),Q("KAKASHI","He didn't tell you."),Q("ANBU MARKED TARGET","Now you're caught up."),N("Pakkun keeps his attention on the blocked exit. He has the answer he needed.")],choices:[
 C("ask_then_demand","DEMAND THE PACKAGE","v2_battle_demand_amt"),
 C("ask_then_take","TAKE HIM DOWN","v2_take_down_setup")
]});
addBeat("v2_battle_demand_amt",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","demand_amt","v2_demand_win","v2_demand_loss","AK_SA_008")});
addBeat("v2_demand_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("demand_amt",ctx,s=>{s.participants.AMT.state="ESCAPED";s.package.holder="AMT";}),cues:[N("The alley comes back into focus with Kakashi on one knee and ANBU Marked Target still standing."),N("The man is breathing hard, but the package is still secured against him."),N("Pakkun recovers a few paces away."),Q("ANBU MARKED TARGET","You asked."),N("He adjusts the package beneath his clothing."),Q("ANBU MARKED TARGET","I answered."),N("He starts backing toward the far end of the alley."),N("Pakkun rises, but stays with Kakashi rather than chasing on his own."),N("ANBU Marked Target reaches the corner and looks back once."),N("Then he is gone with the package."),Q("PAKKUN","He's gone."),Q("KAKASHI","I know."),N("Kakashi listens down the empty street anyway."),Q("PAKKUN","You've lost the trail."),Q("PAKKUN","Then report it."),N("Kakashi waits one more second, then turns back toward the ANBU meeting point. Pakkun follows.")],nextBeatId:"v2_report"});
addBeat("v2_demand_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("demand_amt",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[N("ANBU Marked Target ends the fight on one knee."),N("The package came loose during the exchange and lies several feet away."),N("Both men see it."),N("ANBU Marked Target moves first. Pakkun steps into his path."),N("Kakashi reaches the package, checks the seal, and secures it."),Q("ANBU MARKED TARGET","So that's it."),Q("KAKASHI","That part is."),N("The man's eyes move toward the open end of the alley."),N("Pakkun shifts half a step and closes the exit again. ANBU Marked Target checks the other side, finds Kakashi there, and stops looking for a clean way out."),N("Kakashi approaches."),Q("ANBU MARKED TARGET","You got what you wanted."),Q("KAKASHI","The package."),N("Kakashi does not leave."),N("Recognition reaches the man's face."),Q("ANBU MARKED TARGET","Ah."),N("The package is secure and the target is beaten."),N("What happens to him now is Kakashi's choice.")],choices:[
 C("demand_police","TAKE HIM TO THE UCHIHA POLICE","v2_amt_police_depart",{patch:()=>transferIntent("AMT","POLICE","demand_police")}),
 C("demand_release","LET HIM GO","v2_amt_release_result",{patch:()=>{const r=dispose("AMT","RELEASE");if(!r.success)return r;return history("RELEASE_AMT");}}),
 C("demand_kill","KILL HIM","v2_amt_kill_result",{patch:()=>resolveDisposition("KILL","AMT","demand_kill")}),
 C("demand_anbu","BRING HIM TO ANBU","v2_amt_anbu_depart",{patch:()=>transferIntent("AMT","ANBU","demand_anbu")})
]});
addBeat("v2_take_down_setup",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>packageState("NEUTRAL",{neutral:true}),cues:[N("ANBU Marked Target keeps one hand over the package."),N("Kakashi stops watching the package and starts watching the man's balance instead."),N("The target notices too late."),N("Kakashi attacks his footing without warning."),N("ANBU Marked Target twists away and reaches instinctively for the package."),N("Pakkun reacts on his own, lunging across that hand."),N("The target jerks aside to save his leg and the package tears loose, skidding across the wet stone."),N("All three turn toward it."),Q("ANBU MARKED TARGET","You've got to be kidding me."),N("Kakashi cuts him off from one side while Pakkun blocks the nearest route to the package."),N("For the first time all night, nobody has it."),N("ANBU Marked Target stops looking for an exit. Now he has to fight his way back to the package.")],nextBeatId:"v2_battle_take_down_amt"});
addBeat("v2_battle_take_down_amt",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Control the target and the neutral package.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","take_down_amt","v2_take_down_win","v2_take_down_loss","AK_SA_008")});
addBeat("v2_take_down_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("take_down_amt",ctx,s=>{s.participants.AMT.state="ESCAPED";s.package.holder="KAKASHI";s.package.recovered=true;s.package.neutral=false;}),cues:[N("ANBU Marked Target wins the fight and moves for the loose package before Kakashi can recover his footing."),N("Pakkun gets there first."),N("The ninken snaps across the man's route, forcing him to choose between the objective and the open end of the alley."),N("He chooses the exit."),N("By the time Kakashi reaches the package, ANBU Marked Target is already on the wall and climbing."),N("Kakashi checks the seal, secures the package and looks up at an empty roofline."),N("Pakkun comes back to his side."),Q("PAKKUN","You kept it."),Q("KAKASHI","Not him."),N("Pakkun looks toward the route the man used."),Q("PAKKUN","No."),N("Kakashi holds the recovered package a little tighter and turns back toward ANBU.")],nextBeatId:"v2_report"});
addBeat("v2_take_down_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("take_down_amt",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;s.package.neutral=false;}),cues:[N("ANBU Marked Target goes down."),N("Pakkun remains between him and the loose package while Kakashi retrieves it."),N("The seal is intact."),N("Kakashi secures the package and turns back to the defeated man."),N("The objective is recovered. What happens to the target is still a choice.")],choices:[
 C("take_police","TAKE HIM TO THE UCHIHA POLICE","v2_amt_police_depart",{patch:()=>transferIntent("AMT","POLICE","take_police")}),
 C("take_release","LET HIM GO","v2_amt_release_result",{patch:()=>{const r=dispose("AMT","RELEASE");if(!r.success)return r;return history("RELEASE_AMT");}}),
 C("take_kill","KILL HIM","v2_amt_kill_result",{patch:()=>resolveDisposition("KILL","AMT","take_kill")}),
 C("take_anbu","BRING HIM TO ANBU","v2_amt_anbu_depart",{patch:()=>transferIntent("AMT","ANBU","take_anbu")})
]});

addBeat("v2_stop_ps_setup",{backdrop:B.alleyAlt,location:"KONOHA ALLEYWAY · NIGHT",objective:"Stop Package Smuggler.",actors:["kakashi","ps"],preset:"battle_pair",onEnter:()=>mutate(s=>{s.participants.AMT.state="ESCAPED";s.package.holder="AMT";}),cues:[N("ANBU Marked Target is already leaving with the package."),N("Package Smuggler is moving toward the alley instead."),N("Kakashi gives the disappearing package one look, then steps out to meet the man in front of him."),Q("PACKAGE SMUGGLER","Wrong one."),Q("KAKASHI","You were waiting for it."),N("Package Smuggler glances toward the street the carrier used."),Q("PACKAGE SMUGGLER","Was."),Q("KAKASHI","Then you know where it was going."),N("A faint smile reaches the man's face."),Q("PACKAGE SMUGGLER","And you chose me instead of following it."),Q("KAKASHI","I chose to stop you."),N("The smile disappears. Package Smuggler reaches for his weapon."),Q("PACKAGE SMUGGLER","Then stop me.")],nextBeatId:"v2_battle_ps_direct"});
addBeat("v2_battle_ps_direct",{mode:"battle_transition",backdrop:B.fight,location:"KONOHA · PL BATTLE",objective:"Stop Package Smuggler.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_ps_1v1","ps_direct","v2_ps_missing_win","v2_ps_missing_loss","AK_SA_016")});
addBeat("v2_ps_missing_loss",{backdrop:B.fight,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_direct",ctx,s=>{s.participants.PS.state="ESCAPED";}),cues:[N("Package Smuggler wins the fight and does not waste the opening."),N("He disappears into the side street before Kakashi can get back to his feet."),N("Kakashi listens for pursuit cues and finds none worth trusting."),N("The package is not with the man who just escaped him. ANBU Marked Target carried it away before this fight ever started."),N("Kakashi chose to stop the receiver instead of following the objective."),N("Now he has neither."),N("There is nothing left to do honestly except return and report the choice with the result.")],nextBeatId:"v2_report"});
addBeat("v2_ps_missing_win",{mode:"choice",backdrop:B.fight,location:"KONOHA · NIGHT",objective:null,actors:["kakashi","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_direct",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";}),cues:[N("Package Smuggler goes down."),N("The package is still gone with ANBU Marked Target."),N("The man Kakashi chose to stop is beaten and still within reach."),N("What happens to him now will not recover the package.")],choices:[
 C("ps_missing_kill","KILL HIM","v2_ps_kill_result",{patch:()=>resolveDisposition("KILL","PS","ps_missing_kill")}),
 C("ps_missing_restrain","RESTRAIN HIM","v2_ps_restrain_report_result",{patch:()=>{const r=resolveDisposition("RESTRAIN","PS","ps_missing_restrain");if(!r.success)return r;projectExtractionPlanning("PS",r,"ps_missing_restrain");return r;}}),
 C("ps_missing_anbu","BRING HIM TO ANBU","v2_ps_anbu_depart",{patch:()=>transferIntent("PS","ANBU","ps_missing_anbu")}),
 C("ps_missing_police","TAKE HIM TO THE UCHIHA POLICE","v2_ps_police_depart",{patch:()=>transferIntent("PS","POLICE","ps_missing_police")})
]});
addBeat("v2_cutoff_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Stop the package.",actors:["kakashi","amt","ps","pakkun"],preset:"sakura_group",onEnter:()=>{const p=setPakkun(true);if(!p.success)return p;const e=commitRouteInterceptEvidence();return e&&e.success===false?e:{success:true};},cues:[N("Kakashi does not follow either man. He cuts across both routes toward the Sakura tree."),N("ANBU Marked Target sees what he is doing first."),Q("PACKAGE SMUGGLER","Don't let him get in front of you!"),N("Too late."),N("Kakashi reaches the remaining exit line."),N("ANBU Marked Target turns and finds a small ninken already standing in the street ahead."),Q("ANBU MARKED TARGET","You cut off both routes."),N("Pakkun looks past him toward Kakashi."),Q("PAKKUN","This the one?"),Q("KAKASHI","Yes."),N("Package Smuggler reaches the choke point behind them."),N("No one has a clean way out.")],nextBeatId:"v2_battle_cutoff"});
addBeat("v2_battle_cutoff",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Stop the package.",actors:["kakashi","amt","ps"],preset:"battle_trio",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_amt_ps_2v1","cutoff","v2_cutoff_win","v2_cutoff_loss","AK_SA_017")});
addBeat("v2_cutoff_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("cutoff",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";}),cues:[N("The choke point lasts until it doesn't."),N("ANBU Marked Target breaks through first with the package still secured against him."),N("Package Smuggler tears free in the opposite direction a heartbeat later."),N("Kakashi turns toward the package route."),N("Too late. The first man already has the roofline."),N("Pakkun starts after the other escape, checks himself and comes back instead of splitting the pursuit on his own."),N("Two routes empty at once."),Q("PAKKUN","Which one?"),N("Kakashi listens, searches the roofs and finds that the decision has already been made for him by distance."),Q("KAKASHI","Neither."),N("Pakkun says nothing else. They turn back toward ANBU with the package gone.")],nextBeatId:"v2_report"});
addBeat("v2_cutoff_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("cutoff",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;s.groupParticipants=["AMT","PS"];}),cues:W("getCloserDownstream","9_failure_cut_them_off_at_the_sakura_tree"),choices:[
 C("cutoff_police","TAKE THEM TO THE UCHIHA POLICE","v2_group2_police_depart",{patch:()=>transferIntent([AMT,PS],"POLICE","cutoff_police")}),
 C("cutoff_anbu","BRING THEM TO ANBU","v2_group2_anbu_depart",{patch:()=>transferIntent([AMT,PS],"ANBU","cutoff_anbu")}),
 C("cutoff_kill","KILL THEM","v2_group2_kill_result",{patch:()=>resolveGroupKill([AMT,PS],"cutoff_kill")}),
 C("cutoff_release","LET THEM GO","v2_group2_release",{patch:()=>{const r=disposeGroup("RELEASE",[AMT,PS]);if(!r.success)return r;return history("RELEASE_GROUP",{participantKeys:["AMT","PS"]});}})
]});

// Improved-position Pickpocket.
addBeat("v2_improved_pickpocket_resolver",{mode:"choice",machineResolved:true,backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Take the package cleanly.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>resolverEnter("improvedPickpocket"),cues:[N("Kakashi has already shortened the distance and heard the contingency."),N("ANBU Marked Target's hand is still over the package. Package Smuggler is waiting."),N("Kakashi uses the closer position to try to remove the package before the handoff can finish.")],choices:[
 C("improved_pick_success","RESOLVE RESULT","v2_pickpocket_clean_success",{available:()=>getOutcome("improvedPickpocket")==="PICKPOCKET_IMPROVED_SUCCESS"}),
 C("improved_pick_fail","RESOLVE RESULT","v2_improved_pick_fail_setup",{available:()=>getOutcome("improvedPickpocket")==="PICKPOCKET_IMPROVED_FAILURE"})
]});
addBeat("v2_improved_pick_fail_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","ps"],preset:"battle_trio",onEnter:()=>mutate(s=>{s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:[N("Kakashi reaches the package, but ANBU Marked Target catches the movement."),N("Package Smuggler reacts immediately."),N("The theft fails and the quiet handoff fails with it."),N("Masked Interceptor never enters this version of the exchange."),Q("PACKAGE SMUGGLER","You should've stayed in the alley."),Q("KAKASHI","You noticed me there too."),Q("PACKAGE SMUGGLER","Eventually."),N("Both men turn on Kakashi.")],nextBeatId:"v2_battle_improved_2v1"});
addBeat("v2_battle_improved_2v1",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Recover the package.",actors:["kakashi","amt","ps"],preset:"battle_trio",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_amt_ps_2v1","improved_2v1","v2_improved_2v1_win","v2_improved_2v1_loss","AK_SA_030")});
addBeat("v2_improved_2v1_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("improved_2v1",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";}),cues:[N("The closer position gets Kakashi into the fight. It does not get him out of it."),N("ANBU Marked Target and Package Smuggler force the opening together."),N("The original carrier keeps the package as they break away."),N("Kakashi reaches the Sakura-tree edge in time to see them separate into the next stretch of Konoha."),N("He follows far enough to confirm the truth, not far enough to pretend he still has them."),N("The handoff never happened. Masked Interceptor never appeared. The package is still gone."),N("Kakashi turns back through the quiet left behind by the failed interception and heads for ANBU.")],nextBeatId:"v2_report"});
addBeat("v2_improved_2v1_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("improved_2v1",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[N("Both men go down."),N("Kakashi goes to ANBU Marked Target first and recovers the package."),N("He secures it, then turns back to the two defeated men."),N("No masked shinobi appears."),N("The package is safe. The two men are still Kakashi's decision.")],choices:[
 C("improved_police","TAKE THEM TO THE UCHIHA POLICE","v2_group2_police_depart",{patch:()=>transferIntent([AMT,PS],"POLICE","improved_police")}),
 C("improved_anbu","BRING THEM TO ANBU","v2_group2_anbu_depart",{patch:()=>transferIntent([AMT,PS],"ANBU","improved_anbu")}),
 C("improved_kill","KILL THEM","v2_group2_kill_result",{patch:()=>resolveGroupKill([AMT,PS],"improved_kill")}),
 C("improved_release","LET THEM GO","v2_group2_release",{patch:()=>{const r=disposeGroup("RELEASE",[AMT,PS]);if(!r.success)return r;return history("RELEASE_GROUP",{participantKeys:["AMT","PS"]});}})
]});

// ---------------------------------------------------------------------------
// DIRECT STRIKE BEFORE THE HANDOFF.
// ---------------------------------------------------------------------------
addBeat("v2_direct_strike_setup",{backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Stop the handoff.",actors:["kakashi","amt","ps"],preset:"battle_trio",onEnter:()=>mutate(s=>{s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:G("f05.interrupt"),nextBeatId:"v2_battle_direct_strike_2v1"});
addBeat("v2_battle_direct_strike_2v1",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Stop the handoff.",actors:["kakashi","amt","ps"],preset:"battle_trio",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_amt_ps_2v1","direct_strike_2v1","v2_direct_strike_2v1_win","v2_direct_strike_2v1_loss","AK_SA_003")});
addBeat("v2_direct_strike_2v1_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("direct_strike_2v1",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:G("f05.interrupt_loss"),nextBeatId:"v2_report"});
addBeat("v2_direct_strike_2v1_win",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Keep the recovered package.",actors:["kakashi","amt","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("direct_strike_2v1",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:G("f05.interrupt_win"),nextBeatId:"v2_battle_direct_mi"});
addBeat("v2_battle_direct_mi",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Keep the package.",actors:["kakashi","mi"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_mi_1v1","direct_mi","v2_direct_mi_win","v2_direct_mi_loss","AK_SA_003")});
addBeat("v2_direct_mi_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("direct_mi",ctx,s=>{s.participants.MI.state="ESCAPED";s.package.holder="MI";s.package.recovered=false;}),cues:G("f05.mi_loss"),nextBeatId:"v2_report"});
addBeat("v2_direct_mi_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps","mi"],preset:"sakura_group",onEnter:ctx=>captureBattle("direct_mi",ctx,s=>{s.participants.MI.state="BATTLE_DEFEATED";}),cues:G("f05.double_win"),choices:[
 C("direct_group_police","TAKE THEM TO THE UCHIHA POLICE","v2_group3_police_depart",{patch:()=>transferIntent([AMT,PS,MI],"POLICE","direct_group_police")}),
 C("direct_group_anbu","BRING THEM TO ANBU","v2_group3_anbu_depart",{patch:()=>transferIntent([AMT,PS,MI],"ANBU","direct_group_anbu")}),
 C("direct_group_kill","KILL THEM","v2_group3_kill_result",{patch:()=>resolveGroupKill([AMT,PS,MI],"direct_group_kill")}),
 C("direct_group_release","LET THEM GO","v2_group3_release",{patch:()=>{const r=disposeGroup("RELEASE",[AMT,PS,MI]);if(!r.success)return r;return history("RELEASE_GROUP",{participantKeys:["AMT","PS","MI"]});}})
]});

// ---------------------------------------------------------------------------
// DIRECT PICKPOCKET.
// ---------------------------------------------------------------------------
addBeat("v2_direct_pickpocket_resolver",{mode:"choice",machineResolved:true,backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Take the package cleanly.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>resolverEnter("directPickpocket"),cues:G("f05.slip"),choices:[
 C("direct_pick_success","RESOLVE RESULT","v2_pickpocket_clean_success",{available:()=>getOutcome("directPickpocket")==="PICKPOCKET_DIRECT_SUCCESS"}),
 C("direct_pick_failure","RESOLVE RESULT","v2_pickpocket_failure_setup",{available:()=>getOutcome("directPickpocket")==="PICKPOCKET_DIRECT_FAILURE"})
]});
addBeat("v2_pickpocket_clean_success",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:()=>mutate(s=>{s.package.holder="KAKASHI";s.package.recovered=true;s.participants.MI.state="UNSEEN";}),cues:G("f05.slip_success"),nextBeatId:"v2_report"});
addBeat("v2_pickpocket_failure_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","ps","mi"],preset:"sakura_group",onEnter:()=>{participant("MI",{state:"AVAILABLE"});packageState("AMT");return history("PICKPOCKET_DETECTED_3V1");},cues:G("f05.slip_caught"),nextBeatId:"v2_battle_pickpocket_3v1"});
addBeat("v2_battle_pickpocket_3v1",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Recover the package.",actors:["kakashi","amt","ps","mi"],preset:"sakura_group",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler + Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_amt_ps_mi_3v1","pickpocket_3v1","v2_pickpocket_3v1_win","v2_pickpocket_3v1_loss","AK_SA_028")});
addBeat("v2_pickpocket_3v1_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("pickpocket_3v1",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.participants.MI.state="ESCAPED";s.package.holder="AMT";}),cues:G("f05.slip_loss"),nextBeatId:"v2_report"});
addBeat("v2_pickpocket_3v1_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps","mi"],preset:"sakura_group",onEnter:ctx=>captureBattle("pickpocket_3v1",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.participants.MI.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:G("f05.slip_win"),choices:[
 C("pick_group_police","TAKE THEM TO THE UCHIHA POLICE","v2_group3_police_depart",{patch:()=>transferIntent([AMT,PS,MI],"POLICE","pick_group_police")}),
 C("pick_group_anbu","BRING THEM TO ANBU","v2_group3_anbu_depart",{patch:()=>transferIntent([AMT,PS,MI],"ANBU","pick_group_anbu")}),
 C("pick_group_kill","KILL THEM","v2_group3_kill_result",{patch:()=>resolveGroupKill([AMT,PS,MI],"pick_group_kill")}),
 C("pick_group_release","LET THEM GO","v2_group3_release",{patch:()=>{const r=disposeGroup("RELEASE",[AMT,PS,MI]);if(!r.success)return r;return history("RELEASE_GROUP",{participantKeys:["AMT","PS","MI"]});}})
]});

// ---------------------------------------------------------------------------
// #333 GOLDEN FAMILY 06B — PHYSICAL CUSTODY / RELEASE / COLLECTION HANDOFFS.
// Choice selects intent; institutional custody commits only when the receiver
// physically takes control at the handoff beat.
// ---------------------------------------------------------------------------
addBeat("v2_mi_anbu_depart",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Bring Masked Interceptor to ANBU.",actors:()=>directTransferActors("MI","ANBU",false),preset:"escort",cues:()=>directTransferFieldCues("MI","ANBU"),nextBeatId:"v2_mi_anbu_handoff"});
addBeat("v2_mi_anbu_handoff",{backdrop:B.rooftop,location:"ANBU ROOFTOP · NIGHT",objective:"Transfer custody.",actors:()=>directTransferActors("MI","ANBU",true),preset:"anbu_report",cues:()=>directTransferHandoffCues("MI","ANBU"),onAdvance:()=>completeDirectTransfer("MI","ANBU","mi"),nextBeatId:"v2_report"});
addBeat("v2_mi_police_depart",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Take Masked Interceptor to the Uchiha Police.",actors:()=>directTransferActors("MI","POLICE",false),preset:"escort",cues:()=>directTransferFieldCues("MI","POLICE"),nextBeatId:"v2_mi_police_handoff"});
addBeat("v2_mi_police_handoff",{backdrop:B.police,location:"UCHIHA POLICE EXTERIOR · NIGHT",objective:"Transfer custody.",actors:()=>directTransferActors("MI","POLICE",true),preset:"police_handoff",cues:()=>directTransferHandoffCues("MI","POLICE"),onAdvance:()=>completeDirectTransfer("MI","POLICE","mi"),nextBeatId:"v2_report"});

addBeat("v2_ps_anbu_depart",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Bring Package Smuggler to ANBU.",actors:()=>directTransferActors("PS","ANBU",false),preset:"escort",cues:()=>directTransferFieldCues("PS","ANBU"),nextBeatId:"v2_ps_anbu_handoff"});
addBeat("v2_ps_anbu_handoff",{backdrop:B.rooftop,location:"ANBU ROOFTOP · NIGHT",objective:"Transfer custody.",actors:()=>directTransferActors("PS","ANBU",true),preset:"anbu_report",cues:()=>directTransferHandoffCues("PS","ANBU"),onAdvance:()=>completeDirectTransfer("PS","ANBU","ps"),nextBeatId:"v2_report"});
addBeat("v2_ps_police_depart",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Take Package Smuggler to the Uchiha Police.",actors:()=>directTransferActors("PS","POLICE",false),preset:"escort",cues:()=>directTransferFieldCues("PS","POLICE"),nextBeatId:"v2_ps_police_handoff"});
addBeat("v2_ps_police_handoff",{backdrop:B.police,location:"UCHIHA POLICE EXTERIOR · NIGHT",objective:"Transfer custody.",actors:()=>directTransferActors("PS","POLICE",true),preset:"police_handoff",cues:()=>directTransferHandoffCues("PS","POLICE"),onAdvance:()=>completeDirectTransfer("PS","POLICE","ps"),nextBeatId:"v2_report"});

addBeat("v2_amt_anbu_depart",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Bring ANBU Marked Target to ANBU.",actors:()=>directTransferActors("AMT","ANBU",false),preset:"escort",cues:()=>directTransferFieldCues("AMT","ANBU"),nextBeatId:"v2_amt_anbu_handoff"});
addBeat("v2_amt_anbu_handoff",{backdrop:B.rooftop,location:"ANBU ROOFTOP · NIGHT",objective:"Transfer custody.",actors:()=>directTransferActors("AMT","ANBU",true),preset:"anbu_report",cues:()=>directTransferHandoffCues("AMT","ANBU"),onAdvance:()=>completeDirectTransfer("AMT","ANBU","amt"),nextBeatId:"v2_report"});
addBeat("v2_amt_police_depart",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Take ANBU Marked Target to the Uchiha Police.",actors:()=>directTransferActors("AMT","POLICE",false),preset:"escort",cues:()=>directTransferFieldCues("AMT","POLICE"),nextBeatId:"v2_amt_police_handoff"});
addBeat("v2_amt_police_handoff",{backdrop:B.police,location:"UCHIHA POLICE EXTERIOR · NIGHT",objective:"Transfer custody.",actors:()=>directTransferActors("AMT","POLICE",true),preset:"police_handoff",cues:()=>directTransferHandoffCues("AMT","POLICE"),onAdvance:()=>completeDirectTransfer("AMT","POLICE","amt"),nextBeatId:"v2_report"});
addBeat("v2_amt_release_result",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:()=>state()&&state().pakkun.present?["kakashi","amt","pakkun"]:["kakashi","amt"],preset:"post_battle",cues:W("custodyGolden06B","amt_release"),nextBeatId:"v2_report"});

addBeat("v2_group2_anbu_depart",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Bring them to ANBU.",actors:()=>groupTransferActors([AMT,PS],"ANBU",false),preset:"escort",cues:W("custodyGolden06B","group2_anbu_depart"),nextBeatId:"v2_group2_anbu_handoff"});
addBeat("v2_group2_anbu_handoff",{backdrop:B.rooftop,location:"ANBU ROOFTOP · NIGHT",objective:"Transfer custody.",actors:()=>groupTransferActors([AMT,PS],"ANBU",true),preset:"anbu_report",cues:W("custodyGolden06B","group2_anbu_handoff"),onAdvance:()=>completeDirectGroupTransfer([AMT,PS],"ANBU","group2"),nextBeatId:"v2_report"});
addBeat("v2_group2_police_depart",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Take them to the Uchiha Police.",actors:()=>groupTransferActors([AMT,PS],"POLICE",false),preset:"escort",cues:W("custodyGolden06B","group2_police_depart"),nextBeatId:"v2_group2_police_handoff"});
addBeat("v2_group2_police_handoff",{backdrop:B.police,location:"UCHIHA POLICE EXTERIOR · NIGHT",objective:"Transfer custody.",actors:()=>groupTransferActors([AMT,PS],"POLICE",true),preset:"police_handoff",cues:W("custodyGolden06B","group2_police_handoff"),onAdvance:()=>completeDirectGroupTransfer([AMT,PS],"POLICE","group2"),nextBeatId:"v2_report"});
addBeat("v2_group2_release",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi","amt","ps"],preset:"post_battle",cues:W("custodyGolden06B","group2_release"),nextBeatId:"v2_report"});

addBeat("v2_group3_anbu_depart",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Bring them to ANBU.",actors:()=>groupTransferActors([AMT,PS,MI],"ANBU",false),preset:"escort",cues:W("custodyGolden06B","group3_anbu_depart"),nextBeatId:"v2_group3_anbu_handoff"});
addBeat("v2_group3_anbu_handoff",{backdrop:B.rooftop,location:"ANBU ROOFTOP · NIGHT",objective:"Transfer custody.",actors:()=>groupTransferActors([AMT,PS,MI],"ANBU",true),preset:"anbu_report",cues:W("custodyGolden06B","group3_anbu_handoff"),onAdvance:()=>completeDirectGroupTransfer([AMT,PS,MI],"ANBU","group3"),nextBeatId:"v2_report"});
addBeat("v2_group3_police_depart",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Take them to the Uchiha Police.",actors:()=>groupTransferActors([AMT,PS,MI],"POLICE",false),preset:"escort",cues:W("custodyGolden06B","group3_police_depart"),nextBeatId:"v2_group3_police_handoff"});
addBeat("v2_group3_police_handoff",{backdrop:B.police,location:"UCHIHA POLICE EXTERIOR · NIGHT",objective:"Transfer custody.",actors:()=>groupTransferActors([AMT,PS,MI],"POLICE",true),preset:"police_handoff",cues:W("custodyGolden06B","group3_police_handoff"),onAdvance:()=>completeDirectGroupTransfer([AMT,PS,MI],"POLICE","group3"),nextBeatId:"v2_report"});
addBeat("v2_group3_release",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi","amt","ps","mi"],preset:"post_battle",cues:W("custodyGolden06B","group3_release"),nextBeatId:"v2_report"});

addBeat("v2_collected_anbu_handoff",{backdrop:B.rooftop,location:"ANBU ROOFTOP · NIGHT",objective:"Transfer custody.",actors:()=>collectedHandoffActors("ANBU"),preset:"anbu_report",cues:()=>collectedHandoffCues("ANBU"),onAdvance:()=>deliverRestrainedGroup("ANBU"),nextBeatId:"v2_report"});
addBeat("v2_collected_police_handoff",{backdrop:B.police,location:"UCHIHA POLICE EXTERIOR · NIGHT",objective:"Transfer custody.",actors:()=>collectedHandoffActors("POLICE"),preset:"police_handoff",cues:()=>collectedHandoffCues("POLICE"),onAdvance:()=>deliverRestrainedGroup("POLICE"),nextBeatId:"v2_report"});

// ---------------------------------------------------------------------------
// FINAL TWO-OUTCOME DISPOSITION RESULT PRESENTATION.
// Semantic result is committed by the choice consequence before these beats.
// ---------------------------------------------------------------------------
addBeat("v2_mi_kill_result",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi","mi"],preset:"post_battle",cues:()=>singleDispositionCues("MI","KILL"),nextBeatId:"v2_report"});
addBeat("v2_ps_kill_result",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi","ps"],preset:"post_battle",cues:()=>singleDispositionCues("PS","KILL"),nextBeatId:"v2_report"});
addBeat("v2_ps_restrain_continue_result",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Continue the pursuit.",actors:["kakashi","ps"],preset:"post_battle",cues:()=>singleDispositionCues("PS","RESTRAIN"),nextBeatId:"v2_amt_after_ps"});
addBeat("v2_ps_restrain_report_result",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi","ps"],preset:"post_battle",cues:()=>reportRestraintCues("PS"),nextBeatId:"v2_report"});
addBeat("v2_amt_kill_result",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:()=>state()&&state().pakkun.present?["kakashi","amt","pakkun"]:["kakashi","amt"],preset:"post_battle",cues:()=>singleDispositionCues("AMT","KILL"),nextBeatId:"v2_report"});
addBeat("v2_amt_restrain_report_result",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:()=>state()&&state().pakkun.present?["kakashi","amt","pakkun"]:["kakashi","amt"],preset:"post_battle",cues:()=>reportRestraintCues("AMT"),nextBeatId:"v2_report"});
addBeat("v2_amt_restrain_collect_result",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Collect the restrained participants.",actors:()=>state()&&state().pakkun.present?["kakashi","amt","pakkun"]:["kakashi","amt"],preset:"post_battle",cues:()=>singleDispositionCues("AMT","RESTRAIN"),nextBeatId:"v2_group_collect"});
addBeat("v2_group2_kill_result",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi","amt","ps"],preset:"post_battle",cues:()=>groupKillCues([AMT,PS]),nextBeatId:"v2_report"});
addBeat("v2_group3_kill_result",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi","amt","ps","mi"],preset:"post_battle",cues:()=>groupKillCues([AMT,PS,MI]),nextBeatId:"v2_report"});


function hasTerminalTransferHistory(s,label){
  return !!(s&&Array.isArray(s.routeHistory)&&s.routeHistory.some(row=>row&&row.label===label));
}
function correctedTerminalReportCues(){
  const s=state();if(!s)return[];
  const cues=[];
  const alreadyAtMissionGiver=hasTerminalTransferHistory(s,"DIRECT_TO_ANBU")||hasTerminalTransferHistory(s,"GROUP_TO_ANBU")||hasTerminalTransferHistory(s,"COLLECTED_TO_ANBU");
  if(!alreadyAtMissionGiver)cues.push(...G("f07c.return_open"));
  else cues.push(Q("ANBU OPERATIVE","Report."));
  cues.push(...routeReportCues(s),...packageReportCues(s));
  if(lethalIntentRefs(s).length)cues.push(...lethalReportCues(s));
  else cues.push(...nonlethalParticipantReportCues(s));
  cues.push(...knowledgeReportCues(s),...pakkunReportAndDepartureCues(s),...G("f07c.report_close"));
  return cues;
}
function hiddenReviewSurvivorKeys(s=state()){
  return ["MI","PS","AMT"].filter(key=>s&&s.participants&&s.participants[key]&&s.participants[key].state!=="KILLED");
}
function hiddenReviewActors(){
  const map={MI:"mi",PS:"ps",AMT:"amt"};
  return["anbu","minato",...hiddenReviewSurvivorKeys().map(key=>map[key])];
}
function hiddenReviewCues(){
  const s=state();if(!s)return[];
  const alive=hiddenReviewSurvivorKeys(s),killed=["MI","PS","AMT"].filter(key=>!alive.includes(key)),out=[...G("f07c.hidden_open")];
  if(killed.length===0)out.push(...G("f07c.hidden_base_all_alive"));
  if(alive.length===3&&["MI","PS","AMT"].every(key=>s.participants[key]&&s.participants[key].state==="ANBU_CUSTODY"))out.push(...G("f07c.hidden_all3_anbu"));
  if(alive.some(key=>s.participants[key]&&s.participants[key].state==="POLICE_CUSTODY"))out.push(...G("f07c.hidden_police"));
  if(alive.some(key=>s.participants[key]&&s.participants[key].state==="RELEASED"))out.push(...G("f07c.hidden_release"));
  for(const key of alive){
    const row=s.participants[key]||{};
    if(row.state==="RESTRAINED")out.push(...G("f07c.hidden_restrained_"+key.toLowerCase()));
    if(row.state==="ESCAPED"&&(row.disposition==="RESTRAIN"||row.restrainIntent===true))out.push(...G("f07c.hidden_restrain_escape_"+key.toLowerCase()));
    if(row.state==="ESCAPED"&&(row.disposition==="KILL"||row.lethalIntent===true))out.push(...G("f07c.hidden_lethal_escape_"+key.toLowerCase()));
  }
  if(killed.includes("MI"))out.push(...G("f07c.hidden_mi_killed"));
  if(killed.includes("PS"))out.push(...G("f07c.hidden_ps_killed"));
  if(killed.includes("AMT"))out.push(...G("f07c.hidden_amt_killed"));
  if(killed.length===3)out.push(...G("f07c.hidden_all3_killed"));
  if(killed.length>0){
    if(alive.includes("AMT"))out.push(...G("f07c.reveal_question_amt"));
    else if(alive.includes("PS"))out.push(Q("PACKAGE SMUGGLER","Does Kakashi know?"),Q("MINATO","No."));
    else if(alive.includes("MI"))out.push(Q("MASKED INTERCEPTOR","Does Kakashi know?"),Q("MINATO","No."));
    else out.push(Q("ANBU OPERATIVE","Does Kakashi know?"),Q("MINATO","No."));
  }
  out.push(...(killed.length?G("f07c.close_high"):G("f07c.close_low")));
  return out;
}
function completeAndContinueAcademyKakashiV2Origin(){
  const result=completeAcademyKakashiV2Origin();
  if(!result||result.success!==true)return result;
  // The shared Journey/Formation owner remains authoritative. This call only
  // asks it to project the already-authorised post-Origin continuity surface.
  try{
    if(typeof openAcademyTeamFormationUI==="function"){
      const projected=openAcademyTeamFormationUI({showChronicleBegins:true});
      return{success:true,originCompletion:result.originCompletion||result,continuityProjection:projected||null};
    }
  }catch(_error){}
  return result;
}

// ---------------------------------------------------------------------------
// TERMINAL — factual report -> private evaluation -> Receipt -> Origin complete.
// ---------------------------------------------------------------------------
addBeat("v2_report",{backdrop:B.rooftop,location:"ANBU REPORT · KONOHA ROOFTOP · NIGHT",objective:"Report to ANBU.",actors:()=>{const s=state();return s&&s.pakkun.present?["kakashi","pakkun","anbu"]:["kakashi","anbu"];},preset:"anbu_report",transition:"wipe",onEnter:()=>mutate(s=>{if(s.package.holder==="KAKASHI"){s.package.holder="ANBU";s.package.returned=true;}s.terminal.reportReached=true;}),onAdvance:()=>mutate(s=>{if(s.pakkun.present){s.pakkun.present=false;s.pakkun.departed=true;}s.terminal.kakashiDismissed=true;}),cues:()=>correctedTerminalReportCues(),nextBeatId:"v2_hidden_review"});
function commitTerminalRewardsAtReceipt(){
  const s=state(),rt=active();if(!s||!rt)return{success:false,reason:"kakashi_v2_state_missing"};
  s.terminal.receiptReached=true;save();
  if(typeof globalThis.commitAcademyKakashiV2TerminalRewards36015!=="function")return{success:false,reason:"kakashi_v2_reward_adapter_missing"};
  const result=globalThis.commitAcademyKakashiV2TerminalRewards36015(s,rt.instanceId);
  if(!result||result.success!==true)return result||{success:false,reason:"kakashi_v2_terminal_reward_commit_failed"};
  s.rewards.terminalCommitted=true;
  s.rewards.sources=(result.sourceReceipts||[]).map(row=>row.sourceId);
  s.rewards.terminalResult=result;
  save();
  return{success:true,rewardResult:result};
}
function completeAcademyKakashiV2Origin(){
  const s=state(),rt=active();if(!s||!rt)return{success:false,reason:"kakashi_v2_state_missing"};
  if(s.rewards.terminalCommitted!==true)return{success:false,reason:"kakashi_v2_terminal_rewards_not_committed"};
  const result=typeof completeChronicleOriginPrologue==="function"?completeChronicleOriginPrologue(ORIGIN_ID,[`kakashi_v2:${rt.instanceId}`]):{success:false,reason:"origin_completion_api_missing"};
  return result&&result.success?{success:true,originCompletion:result}:result;
}
addBeat("v2_hidden_review",{backdrop:B.hokage,location:"HOKAGE ADMINISTRATION · NIGHT",objective:null,actors:()=>hiddenReviewActors(),preset:"hokage_test_review",transition:"wipe",presentationPackageHolder:"MINATO",onEnter:()=>mutate(s=>{s.terminal.minatoReached=true;s.terminal.hiddenTestReviewReached=true;}),cues:()=>hiddenReviewCues(),nextBeatId:"v2_receipt"});
addBeat("v2_receipt",{backdrop:B.hokage,location:"CHRONICLE RECEIPT",objective:null,actors:[],preset:"chronicle_receipt",transition:"wipe",receipt:true,onEnter:()=>commitTerminalRewardsAtReceipt(),cues:()=>receiptCues(),onAdvance:()=>completeAndContinueAcademyKakashiV2Origin(),exitScene:true});

// Register production scene.
try{unregisterStoryScene(SCENE_ID);}catch(_e){}
const registered=registerStoryScene({
 sceneId:SCENE_ID,eventId:SCENE_ID,title:"ACADEMY KAKASHI",entryBeatId:"v2_scene01_rooftop",
 participants:[],beats,defaultReturnContext:{type:"alpha_arc1_mission_command",stage:"origin_prologue"}
});
if(!registered||registered.success!==true)throw new Error("kakashi_v2_story_scene_registration_failed");

function cuesFor(beatId){
 const row=manifest[String(beatId||"")];if(!row)return[];
 const source=row.cues;const resolved=typeof source==="function"?source({state:state(),runtime:active()}):source;
 return Array.isArray(resolved)?resolved:[];
}
function projectionFor(beatId){
 const row=manifest[String(beatId||"")];if(!row)return null;
 const s=state(),cues=cuesFor(beatId);
 const actorKeys=typeof row.actors==="function"?row.actors({state:s,runtime:active()}):(row.actors||[]);
 return{...row,cues,state:s,actors:(actorKeys||[]).map(key=>A[key]||null).filter(Boolean)};
}
function diagnostics(){
 const def=getStorySceneDefinition(SCENE_ID);
 const root=def&&def.beatMap.get("v2_scene02_tail"),watch=def&&def.beatMap.get("v2_watch_exchange");
 const checks={
  sceneRegistered:!!def,
  exactRootChoices:!!root&&root.choices.map(c=>c.label).join("|")==="WATCH THE HANDOFF|GET CLOSER|INTERRUPT THE HANDOFF|SLIP IN AND TAKE IT",
  exactWatchChoices:!!watch&&watch.choices.map(c=>c.label).join("|")==="INTERCEPT THE MASKED ATTACKER|GO FOR THE PACKAGE|BEAT HER TO THE PACKAGE|DEAL WITH HER FIRST|CHASE THE MAN FROM THE PHOTO",
  tenBattleConfigsAvailable:!!globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010&&Object.keys(globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010.configs||{}).length===10,
  currentLethalLabels:JSON.stringify(beats).includes("KILL HER")&&JSON.stringify(beats).includes("KILL HIM")&&JSON.stringify(beats).includes("KILL THEM")&&!JSON.stringify(beats).includes("ATTEMPT"+" TO KILL"),
  stopAssassinUsesDirectMiConfig:!!def&&def.beatMap.get("v2_battle_mi_stop")?.battle?.encounterId==="academy_kakashi_origin_battle_mi_1v1",
  stopAssassinPackageOnlyCatchup:!!def&&def.beatMap.get("v2_mi_stop_win")?.choices?.some(c=>c.label==="CHASE THE PACKAGE")&&!def.beatMap.get("v2_mi_stop_win")?.choices?.some(c=>c.label==="CHASE THE MAN FROM THE PHOTO"),
  stopAssassinThreeActionGate:STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS===3,
  stableFactualResolver:Object.keys(factualDefs).length>=7,
  noDomOwnership:!String(addBeat).includes("document.")&&!String(resolveFactual).includes("querySelector"),
  terminalRewardsCommittedAtReceipt:String(commitTerminalRewardsAtReceipt).includes("commitAcademyKakashiV2TerminalRewards36015"),
  terminalCompleteCallsOrigin:String(completeAcademyKakashiV2Origin).includes("completeChronicleOriginPrologue"),
  correctedHiddenTestTerminal:!!def&&def.beatMap.has("v2_hidden_review")&&!def.beatMap.has("v2_complete")&&String(hiddenReviewCues).includes("f07c.hidden_base_all_alive"),
  receiptExitsDirectly:!!def&&def.beatMap.get("v2_receipt")?.exitScene===true&&String(completeAndContinueAcademyKakashiV2Origin).includes("showChronicleBegins:true"),
  policeCardsProjected:String(policePairForParticipantKeys).includes("policeMiMale")&&String(policePairForParticipantKeys).includes("policePsFemale")&&String(groupTransferActors).includes('institution==="POLICE"'),
  resolverPseudoChoicesRetired:!JSON.stringify(beats).includes('"CONTINUE"')&&beats.filter(b=>b.machineResolved===true).length===11&&beats.filter(b=>b.machineResolved===true).every(b=>b.mode==="choice"&&b.uiHints&&b.uiHints.kakashiMachineResolved===true&&b.choices.length===2&&b.choices.every(ch=>ch.label==="RESOLVE RESULT")),
  browserGoldenClaimed:false
 };
 const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
 return{pass:failed.length===0,checks,failed,beatCount:beats.length,browserGoldenClaimed:false};
}

globalThis.getAcademyKakashiV2State36020=state;
globalThis.getAcademyKakashiV2Presentation36020=projectionFor;
globalThis.getAcademyKakashiV2Cues36020=cuesFor;
globalThis.runAcademyKakashiV2Core36020Diagnostics=diagnostics;
globalThis.SC_ACADEMY_KAKASHI_V2_CORE_36020=Object.freeze({patchId:PATCH_ID,sceneId:SCENE_ID,originId:ORIGIN_ID,beatIds:Object.freeze(beats.map(b=>b.beatId)),backdrops:B,actors:A,browserGoldenClaimed:false});
})();
