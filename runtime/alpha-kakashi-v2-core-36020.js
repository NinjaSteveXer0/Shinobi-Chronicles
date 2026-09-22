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
const D=globalThis.SC_STORY_DECISION_REALISATION_34000;
const F=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
if(!D||!F)throw new Error("kakashi_v2_requires_story_decision_and_factual_resolver");

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
 minato:Object.freeze({id:"kage_minato",label:"MINATO",image:"Assets/Kage/kage_minato.png"})
});
const N=text=>Object.freeze({kind:"narration",text:String(text)});
const Q=(speaker,text)=>Object.freeze({kind:"dialogue",speakerName:String(speaker),text:String(text)});
const RECORD=text=>Object.freeze({kind:"record",speakerName:"CHRONICLE RECEIPT",text:String(text)});
const C=(choiceId,label,nextBeatId,{available=null,patch=null}={})=>{
  const row={choiceId,label,nextBeatId};
  if(available)row.availability=()=>({available:available(),knownBlocker:available()?null:"CURRENT FACTUAL STATE DOES NOT PERMIT THIS ACTION"});
  if(patch)row.consequenceRequests=[{requestId:`kakashi_v2_choice_${choiceId}_${nextBeatId}`,kind:"domain",resolve:()=>{patch();return{success:true};}}];
  return row;
};

const manifest={};
const beats=[];
function addBeat(id,{mode="narration",cues=[],backdrop=B.sakura,location="KONOHA · NIGHT",objective=null,actors=[],preset="standard",choices=[],battle=null,nextBeatId=null,onEnter=null,onAdvance=null,transition=null,receipt=false,exitScene=false}={}){
  manifest[id]=Object.freeze({id,cues,backdrop,location,objective,actors,preset,transition,receipt});
  const row={beatId:id,mode,text:"",choices,nextBeatId,exitScene};
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
    version:2,sceneInstanceId:rt.instanceId||null,routeHistory:[],
    package:{holder:"AMT",recovered:false,returned:false,neutral:false},
    participants:{MI:{state:"UNSEEN"},PS:{state:"AVAILABLE"},AMT:{state:"AVAILABLE"}},
    pakkun:{present:false,departed:false,knownByKakashiAsName:false},
    knowledge:{getCloserContingency:false,askWhere:false,downstreamDestinationKnown:false},
    resolvers:{},battles:{},fieldSecured:[],rewards:{sources:[],terminalCommitted:false},terminal:{}
  };
  return rt.localContext.kakashiV2;
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
function addField(ref){const key=participantKey(ref);return mutate(s=>{if(!s.fieldSecured.includes(key))s.fieldSecured.push(key);if(!s.participants[key])s.participants[key]={state:"AVAILABLE"};s.participants[key].state="FIELD_SECURED_PENDING_COLLECTION";});}
function dispose(ref,kind){
  const key=participantKey(ref);
  return mutate(s=>{
    const row=s.participants[key]||(s.participants[key]={});
    if(kind==="KILL")row.state="DEAD";
    else if(kind==="ANBU")row.state="ANBU_CUSTODY";
    else if(kind==="POLICE")row.state="POLICE_CUSTODY";
    else if(kind==="RELEASE")row.state="RELEASED";
    else if(kind==="FIELD") {row.state="FIELD_SECURED_PENDING_COLLECTION";if(!s.fieldSecured.includes(key))s.fieldSecured.push(key);}
    row.disposition=kind;
  });
}
function disposeGroup(kind,refs=[AMT,PS,MI]){return mutate(s=>refs.forEach(ref=>{const key=participantKey(ref);const row=s.participants[key]||(s.participants[key]={});row.disposition=kind;row.state=kind==="KILL"?"DEAD":kind==="ANBU"?"ANBU_CUSTODY":kind==="POLICE"?"POLICE_CUSTODY":"RELEASED";}));}
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
 amtPursuitAfterMI:{binding:"academy_kakashi.v2.amt_pursuit_after_mi",outcomes:[
  {outcomeRef:"AMT_PURSUIT_SUCCESS",resultPayloadTemplate:{outcomeClass:"AMT_PURSUIT_SUCCESS"}},
  {outcomeRef:"AMT_PURSUIT_FAILURE",resultPayloadTemplate:{outcomeClass:"AMT_PURSUIT_FAILURE"}}
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
 ]}
};
for(const row of Object.values(factualDefs)){
  const reg=F.registerStoryFactualResolverBinding(row.binding,{ownerRef:PATCH_ID,authorityVersionRefs:["Academy_Kakashi_Origin_100_Percent_Writing_Closure_2026-09-20"],outcomes:row.outcomes,metadata:{storyUnitRef:ORIGIN_ID,cleanRoomV2:true}});
  if(!reg||reg.success!==true)throw new Error(`kakashi_v2_factual_binding_failed:${row.binding}`);
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

function dynamicTerminalCues(){
  const s=state();if(!s)return[N("No Chronicle state is available.")];
  const cues=[N("Kakashi returns to the rooftop. The ANBU operative is waiting."),Q("ANBU OPERATIVE","Report.")];
  if(s.package.returned||s.package.holder==="ANBU")cues.push(Q("KAKASHI","The package is back with you."));
  else if(s.package.holder==="KAKASHI")cues.push(Q("KAKASHI","I recovered the package."));
  else if(s.package.holder==="PS")cues.push(Q("KAKASHI","Package Smuggler got away with it."));
  else if(s.package.holder==="AMT")cues.push(Q("KAKASHI","The original carrier escaped with it."));
  else if(s.package.holder==="MI")cues.push(Q("KAKASHI","Masked Interceptor took it."));
  else if(s.package.neutral)cues.push(Q("KAKASHI","The package was separated from the carrier."));
  else cues.push(Q("KAKASHI","I couldn't recover the package."));
  for(const [ref,label] of [["MI","Masked Interceptor"],["PS","Package Smuggler"],["AMT","ANBU Marked Target"]]){
    const row=s.participants[ref];if(!row||row.state==="UNSEEN")continue;
    const text=row.state==="DEAD"?`${label} is dead.`:row.state==="ANBU_CUSTODY"?`${label} was transferred to ANBU custody.`:row.state==="POLICE_CUSTODY"?`${label} was transferred to the Uchiha Police Force.`:row.state==="FIELD_SECURED_PENDING_COLLECTION"?`${label} is restrained in the field for collection.`:row.state==="RELEASED"?`${label} was released.`:row.state==="ESCAPED"?`${label} escaped.`:row.state==="BATTLE_DEFEATED"?`${label} was defeated and left alive.`:`${label}: ${row.state}.`;
    cues.push(Q("KAKASHI",text));
  }
  if(s.knowledge.getCloserContingency)cues.push(Q("KAKASHI","I heard the handoff contingency before I moved."));
  if(s.knowledge.askWhere)cues.push(Q("KAKASHI","The original carrier's role ended at the handoff. The receiver was meant to carry it onward. He did not know the final destination."));
  if(s.pakkun.present)cues.push(N("The unfamiliar ninken remains nearby while the factual report closes."));
  cues.push(Q("ANBU OPERATIVE","Understood."));
  return cues;
}
function minatoCues(){
  const s=state();const deaths=Object.values(s.participants).filter(r=>r&&r.state==="DEAD").length;
  const cues=[N("The report moves upward without Kakashi."),N("Later, inside the Hokage Administration, Minato reviews the field record with the ANBU operative.")];
  if(s.package.recovered||s.package.returned||s.package.holder==="ANBU")cues.push(Q("MINATO","He recovered the objective."));
  else cues.push(Q("MINATO","The objective was not recovered."));
  if(deaths)cues.push(Q("MINATO",deaths===1?"He also chose to end one life after the fighting stopped.":`He also chose to end ${deaths} lives after the fighting stopped.`));
  if(s.fieldSecured.length)cues.push(Q("ANBU OPERATIVE",`${s.fieldSecured.length} field-secured captive${s.fieldSecured.length===1?" remains":"s remain"} for collection.`));
  cues.push(Q("MINATO","Record what happened. Not what we wish had happened."));
  cues.push(N("The evaluation remains outside Kakashi's Knowledge."));
  return cues;
}
function receiptCues(){
  const s=state();const lines=["ACADEMY KAKASHI ORIGIN — FIELD RECORD"];
  lines.push(s.package.returned||s.package.holder==="ANBU"?"Package — Returned to ANBU.":s.package.holder==="KAKASHI"?"Package — Recovered by Kakashi.":s.package.holder==="PS"?"Package — Lost with Package Smuggler.":s.package.holder==="AMT"?"Package — Lost with ANBU Marked Target.":s.package.holder==="MI"?"Package — Taken from Kakashi by Masked Interceptor.":s.package.neutral?"Package — Recovered from neutral ground / secured objective state.":"Package — Not recovered.");
  const label={MI:"Masked Interceptor",PS:"Package Smuggler",AMT:"ANBU Marked Target"};
  for(const ref of ["MI","PS","AMT"]){const row=s.participants[ref];if(!row||row.state==="UNSEEN")continue;const suffix=row.state==="DEAD"?"Killed by Kakashi after Battle.":row.state==="FIELD_SECURED_PENDING_COLLECTION"?"Field-secured alive.":row.state==="ANBU_CUSTODY"?"Transferred to ANBU custody.":row.state==="POLICE_CUSTODY"?"Transferred to Uchiha Police custody.":row.state==="RELEASED"?"Deliberately released.":row.state==="ESCAPED"?"Escaped.":row.state==="BATTLE_DEFEATED"?"Defeated; left alive and unrestrained.":row.state;lines.push(`${label[ref]} — ${suffix}`);}
  if(s.knowledge.getCloserContingency)lines.push("Knowledge — Handoff contingency observed before intervention.");
  if(s.knowledge.askWhere)lines.push("Knowledge — Carrier role ended at handoff; receiver intended onward; downstream destination not learned.");
  return[RECORD(lines.join("\n"))];
}

// ---------------------------------------------------------------------------
// OPENING — exact current verbatim locks.
// ---------------------------------------------------------------------------
addBeat("v2_scene01_rooftop",{backdrop:B.rooftop,location:"KONOHA ROOFTOP · NIGHT",objective:"Stop the package from falling into the wrong hands.",actors:["kakashi","anbu"],preset:"rooftop_2_person",transition:"wipe",onEnter:()=>mutate(()=>{}),cues:[
 N("Kakashi stands alone on a Konoha rooftop, the village lights spread out below him. A masked ANBU operative lands behind him without warning."),
 Q("ANBU OPERATIVE","Kakashi Hatake."),N("Kakashi turns to face him."),
 Q("ANBU OPERATIVE","You have orders. Stop this package from falling into the wrong hands."),
 N("The operative holds out a sealed envelope."),N("Kakashi crosses the rooftop and takes it."),
 Q("KAKASHI","Why are you coming to me with this?"),Q("ANBU OPERATIVE","Hokage's orders."),
 N("Kakashi looks down at the seal."),N("He breaks it. A target photograph waits inside.")
],nextBeatId:"v2_scene02_tail"});

addBeat("v2_scene02_tail",{mode:"choice",backdrop:B.alley,location:"KONOHA ALLEYWAY · NIGHT",objective:"Follow the target without being seen.",actors:["kakashi","amt"],preset:"tail",cues:[
 N("Kakashi did not need long to find the man from the envelope."),
 N("The difficult part was making sure the man never realised he had been found."),
 N("Konoha changed shape when Kakashi followed someone through it. Streets stopped being streets and became sightlines. Crowds became cover. Roof edges became distances to clear before the person below could turn his head."),
 N("ANBU Marked Target moved without the nervous scanning of someone who expected immediate pursuit."),
 N("Kakashi kept it that way."),
 N("He followed from above until the route tightened into older streets and narrower angles, then dropped lower when the rooftops would have made him too obvious."),
 N("The target never looked directly at him."),N("Not once."),N("That did not make Kakashi relax."),N("It made him wonder who the man expected to meet."),
 N("By the time the route bent toward the Sakura tree and the alley beyond it, Kakashi had his answer."),N("Someone was waiting.")
],choices:[
 C("watch_exchange","WATCH THE EXCHANGE","v2_watch_exchange",{patch:()=>history("WATCH_THE_EXCHANGE")}),
 C("move_in_closer","MOVE IN CLOSER","v2_get_closer_resolver",{patch:()=>history("MOVE_IN_CLOSER")}),
 C("strike_before_handoff","STRIKE BEFORE THE HANDOFF","v2_direct_strike_setup",{patch:()=>history("STRIKE_BEFORE_THE_HANDOFF")}),
 C("slip_for_package","SLIP IN FOR THE PACKAGE","v2_direct_pickpocket_resolver",{patch:()=>history("SLIP_IN_FOR_THE_PACKAGE")})
]});

addBeat("v2_watch_exchange",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · MAIN STREET · NIGHT",objective:"Retrieve the package.",actors:["amt","ps","mi"],preset:"sakura_3_person",onEnter:()=>{packageState("PS");participant("MI",{state:"AVAILABLE"});return history("HANDOFF_COMPLETED");},cues:[
 N("Kakashi stays where he is."),N("Not passive."),N("Watching."),
 N("ANBU Marked Target shifts the package from beneath his clothing and places it into Package Smuggler's hand."),
 N("The moment custody changes, the whole problem changes with it."),N("Kakashi's eye follows the package."),
 N("ANBU Marked Target is already moving away."),N("Package Smuggler turns in the opposite direction."),
 N("Kakashi has one additional fact now—who received the package—and less control over the situation than he had a few seconds earlier."),
 N("The trade was information for escalation."),N("Then the darkness beside the alley moved."),N("Not slowly."),
 N("A figure tore out of it like a lightning streak."),N("Masked Interceptor hit the new situation at speed, driving straight toward Package Smuggler and forcing him to react before he had properly cleared the exchange."),
 N("ANBU Marked Target broke away."),N("Package Smuggler tightened around the package."),N("Masked Interceptor cut across his escape line."),
 N("And Kakashi, still unseen for one more heartbeat, had to choose what mattered most now.")
],choices:[
 C("stop_assassin","STOP THE ASSASSIN","v2_stop_assassin_setup",{patch:()=>history("STOP_THE_ASSASSIN")}),
 C("secure_package","SECURE THE PACKAGE","v2_secure_package_setup",{patch:()=>history("SECURE_THE_PACKAGE")}),
 C("secure_before_assassin","SECURE THE PACKAGE BEFORE THE ASSASSIN","v2_secure_before_resolver",{patch:()=>history("SECURE_PACKAGE_BEFORE_ASSASSIN")}),
 C("assassin_then_package","DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE","v2_assassin_then_package_setup",{patch:()=>history("DEFEAT_ASSASSIN_THEN_SECURE")}),
 C("go_original_target","GO AFTER THE ORIGINAL TARGET","v2_go_amt_pursuit_resolver",{patch:()=>history("GO_AFTER_ORIGINAL_TARGET")})
]});

// ---------------------------------------------------------------------------
// STOP THE ASSASSIN.
// ---------------------------------------------------------------------------
addBeat("v2_stop_assassin_setup",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"battle_pair",cues:[
 N("Kakashi moves."),N("Not toward ANBU Marked Target."),N("Not toward the package."),N("Toward Masked Interceptor."),
 N("She is already closing on Package Smuggler when Kakashi drops between them."),N("Package Smuggler sees the opening immediately."),N("He turns and runs."),N("The package goes with him."),
 N("Kakashi does not follow."),N("Masked Interceptor changes direction without hesitation."),N("Her attention settles on Kakashi."),N("He has made himself the obstacle now."),N("She comes straight through him."),N("Kakashi meets her head-on.")
],nextBeatId:"v2_battle_mi_seq"});

addBeat("v2_battle_mi_seq",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Defeat Masked Interceptor.",actors:["kakashi","mi"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_seq_mi","mi_seq","v2_mi_seq_win","v2_mi_seq_loss","AK_SA_009")});

addBeat("v2_mi_seq_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:ctx=>captureBattle("mi_seq",ctx,s=>{s.participants.MI.state="ESCAPED";s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[
 N("The opening is small."),N("Masked Interceptor takes it."),N("Kakashi hits the stone beneath the Sakura tree."),N("Before he can recover, she is on him."),
 N("His arm is forced behind his back."),N("His shoulder pinned."),N("Kakashi twists once."),N("She tightens the hold."),N("Enough to stop him."),
 N("Then her attention shifts."),N("Not to Kakashi."),N("Down the street."),N("Toward the route Package Smuggler took."),N("The pressure disappears."),
 N("Kakashi turns his head just in time to see Masked Interceptor break away."),N("She runs."),N("Fast."),N("After Package Smuggler."),N("Kakashi forces himself back to his feet."),
 N("By then she is gone."),N("So is Package Smuggler."),N("The package went with him."),N("ANBU Marked Target disappeared even earlier."),N("Kakashi looks down the empty street."),
 N("No trail."),N("No one left to follow."),N("The package is beyond his reach now.")
],nextBeatId:"v2_report"});

addBeat("v2_mi_seq_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"post_battle",onEnter:ctx=>captureBattle("mi_seq",ctx,s=>{s.participants.MI.state="BATTLE_DEFEATED";}),cues:({state:s})=>{
 const fast=battleActions("mi_seq")<=4;
 return fast?[N("Masked Interceptor hits the stone beneath the Sakura tree."),N("Kakashi lands a few steps away."),N("For a moment, the street is still."),N("Then his eye moves past her."),N("Toward the routes the others took."),N("Package Smuggler cuts across the far end of the street."),N("Still moving."),N("The package is still with him."),N("Higher up, movement flashes across a distant roofline."),N("ANBU Marked Target."),N("Farther away."),N("But not gone."),N("Not yet."),N("Three problems."),N("Not enough time for all of them at once.")]:
 [N("The street ahead is empty."),N("Kakashi searches the rooftops."),N("The alleys."),N("The next junction."),N("Nothing."),N("Package Smuggler had too much time."),N("The package is gone with him."),N("ANBU Marked Target is gone as well."),N("The pursuit is over."),N("What happens to Masked Interceptor is the only decision left here.")];
},choices:[
 C("mi_pursue_ps","GO AFTER PACKAGE SMUGGLER","v2_ps_pursuit_resolver",{available:()=>battleActions("mi_seq")<=4,patch:()=>history("PURSUE_PS_AFTER_MI")}),
 C("mi_pursue_amt","GO AFTER ANBU MARKED TARGET","v2_amt_pursuit_resolver",{available:()=>battleActions("mi_seq")<=4,patch:()=>history("PURSUE_AMT_AFTER_MI")}),
 C("mi_kill","KILL HER","v2_report",{patch:()=>{dispose("MI","KILL");history("KILL_MI");}}),
 C("mi_anbu","TAKE HER BACK TO ANBU","v2_report",{patch:()=>{dispose("MI","ANBU");history("MI_TO_ANBU");}}),
 C("mi_police","TAKE HER TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>{dispose("MI","POLICE");history("MI_TO_POLICE");}}),
 C("mi_restrain","RESTRAIN HER AND CONTINUE","v2_mi_restrained_next",{available:()=>battleActions("mi_seq")<=4,patch:()=>{addField("MI");history("RESTRAIN_MI_CONTINUE");}})
]});
addBeat("v2_mi_restrained_next",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"post_battle",cues:[N("Kakashi takes out the ninja wire."),N("Wire Snare becomes a physical restraint after the Battle, not a hidden Battle-finisher requirement."),N("Masked Interceptor is field-secured at the Sakura tree."),N("Kakashi looks toward the two routes still within reach.")],choices:[
 C("restrained_mi_ps","GO AFTER PACKAGE SMUGGLER","v2_ps_pursuit_resolver",{patch:()=>history("PURSUE_PS_AFTER_RESTRAIN_MI")}),
 C("restrained_mi_amt","GO AFTER ANBU MARKED TARGET","v2_amt_pursuit_resolver",{patch:()=>history("PURSUE_AMT_AFTER_RESTRAIN_MI")})
]});

// PS pursuit after MI.
addBeat("v2_ps_pursuit_resolver",{mode:"choice",backdrop:B.sakura,location:"KONOHA · PURSUIT",objective:"Catch Package Smuggler.",actors:["kakashi","ps"],preset:"pursuit",onEnter:()=>resolverEnter("psPursuit"),cues:[N("Kakashi commits to the route Package Smuggler took."),N("Catching him remains a factual pursuit result, not a guarantee created by the choice.")],choices:[
 C("ps_pursuit_success","CONTINUE","v2_ps_pursuit_success",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_SUCCESS"}),
 C("ps_pursuit_failure","CONTINUE","v2_ps_pursuit_failure",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_FAILURE"})
]});
addBeat("v2_ps_pursuit_failure",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>mutate(s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[N("The route breaks apart in front of Kakashi."),N("By the time he reaches the next junction, Package Smuggler is gone."),N("The package is gone with him."),N("Whatever lead remained on ANBU Marked Target is gone with the time spent here.")],nextBeatId:"v2_report"});
addBeat("v2_ps_pursuit_success",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Kakashi catches Package Smuggler before the route can split again."),Q("PACKAGE SMUGGLER","You really don't give up."),Q("KAKASHI","Give me the package."),Q("PACKAGE SMUGGLER","That would make this much less interesting.")],nextBeatId:"v2_battle_ps_seq"});
addBeat("v2_battle_ps_seq",{mode:"battle_transition",backdrop:B.fight,location:"KONOHA · PL BATTLE",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_seq_ps","ps_seq","v2_ps_seq_win","v2_ps_seq_loss","AK_SA_022")});
addBeat("v2_ps_seq_loss",{backdrop:B.fight,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_seq",ctx,s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[N("Package Smuggler creates enough space to escape."),N("Kakashi loses the fight and the package leaves with him."),N("ANBU Marked Target is no longer reachable.")],nextBeatId:"v2_report"});
addBeat("v2_ps_seq_win",{mode:"choice",backdrop:B.fight,location:"KONOHA · NIGHT",objective:null,actors:["kakashi","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_seq",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[N("Package Smuggler goes down."),N("Kakashi recovers the package before he looks toward the route ANBU Marked Target took."),N("The package problem is solved."),N("The remaining people are not.")],choices:[
 C("ps_go_amt","GO AFTER ANBU MARKED TARGET","v2_amt_after_ps",{available:()=>battleActions("ps_seq")<=3,patch:()=>history("PS_FAST_CONTINUE_AMT")}),
 C("ps_kill","KILL HIM","v2_report",{patch:()=>{dispose("PS","KILL");history("KILL_PS");}}),
 C("ps_restrain_continue","RESTRAIN HIM AND CONTINUE","v2_amt_after_ps",{available:()=>battleActions("ps_seq")<=3,patch:()=>{addField("PS");history("RESTRAIN_PS_CONTINUE");}}),
 C("ps_anbu","TAKE HIM BACK TO ANBU","v2_report",{patch:()=>{dispose("PS","ANBU");history("PS_TO_ANBU");}}),
 C("ps_police","TAKE HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>{dispose("PS","POLICE");history("PS_TO_POLICE");}}),
 C("ps_report","RETURN TO ANBU","v2_report",{patch:()=>history("RETURN_AFTER_PS")})
]});
addBeat("v2_amt_after_ps",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>{participant("AMT",{state:"AVAILABLE"});setPakkun(true);return history("PAKKUN_INTERCEPT_AFTER_PS");},cues:[N("Kakashi takes the thinner trail toward ANBU Marked Target."),N("A small ninken closes the other exit before Kakashi reaches him."),Q("PAKKUN","This yours?"),Q("KAKASHI","Apparently."),N("No introduction. No names exchanged."),N("ANBU Marked Target looks between them and understands the shape of the problem.")],nextBeatId:"v2_battle_amt_seq_pakkun"});
addBeat("v2_battle_amt_seq_pakkun",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake with temporary Story-authorised Pakkun vs ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_seq_amt_pakkun","amt_seq","v2_amt_seq_win","v2_amt_seq_loss","AK_SA_022")});
addBeat("v2_amt_seq_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_seq",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:[N("ANBU Marked Target forces the opening."),N("Kakashi loses the fight."),N("The man escapes."),Q("PAKKUN","You kept the important part."),Q("KAKASHI","I lost him."),Q("PAKKUN","Both things can be true.")],nextBeatId:"v2_report"});
addBeat("v2_amt_seq_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_seq",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:[N("ANBU Marked Target hits the ground hard enough to stay there."),N("Kakashi keeps control of the field."),N("Battle victory does not decide what happens to him.")],choices:[
 C("amt_seq_police","BRING HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>{dispose("AMT","POLICE");history("AMT_TO_POLICE");}}),
 C("amt_seq_release","LET HIM GO","v2_report",{patch:()=>{dispose("AMT","RELEASE");history("RELEASE_AMT");}}),
 C("amt_seq_kill","KILL HIM","v2_report",{patch:()=>{dispose("AMT","KILL");history("KILL_AMT");}}),
 C("amt_seq_anbu","TAKE HIM BACK TO THE ANBU","v2_report",{patch:()=>{dispose("AMT","ANBU");history("AMT_TO_ANBU");}}),
 C("amt_seq_collect","RESTRAIN HIM AND COLLECT THE OTHERS","v2_group_collect",{available:()=>state().fieldSecured.length>0,patch:()=>{addField("AMT");history("COLLECT_ALL_FIELD_SECURED");}})
]});
addBeat("v2_group_collect",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · COLLECTION",objective:"Transfer the restrained participants.",actors:["kakashi","amt","ps"],preset:"escort",cues:[N("Kakashi secures ANBU Marked Target with ninja wire."),N("He retraces the route and collects every earlier field-secured captive who remains available."),N("Each restraint remains a separate participant state."),N("Now the group has to be transferred to legitimate institutional custody.")],choices:[
 C("group_all_anbu","TAKE THEM ALL BACK TO ANBU","v2_report",{patch:()=>{disposeGroup("ANBU",["MI","PS","AMT"].filter(r=>state().fieldSecured.includes(r)));history("GROUP_TO_ANBU");}}),
 C("group_all_police","TAKE THEM ALL TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>{disposeGroup("POLICE",["MI","PS","AMT"].filter(r=>state().fieldSecured.includes(r)));history("GROUP_TO_POLICE");}})
]});

// Direct AMT pursuit after MI.
addBeat("v2_amt_pursuit_resolver",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch ANBU Marked Target.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>resolverEnter("amtPursuitAfterMI"),cues:[N("Kakashi chooses the original carrier and closes Package Smuggler's route behind him."),N("Reaching ANBU Marked Target remains a factual pursuit result.")],choices:[
 C("amt_pursuit_success","CONTINUE","v2_amt_direct_intercept",{available:()=>getOutcome("amtPursuitAfterMI")==="AMT_PURSUIT_SUCCESS"}),
 C("amt_pursuit_failure","CONTINUE","v2_amt_direct_pursuit_fail",{available:()=>getOutcome("amtPursuitAfterMI")==="AMT_PURSUIT_FAILURE"})
]});
addBeat("v2_amt_direct_pursuit_fail",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>mutate(s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";}),cues:[N("ANBU Marked Target breaks the pursuit."),N("Kakashi reaches the next route too late."),N("Package Smuggler's route was closed by the choice to pursue the first man."),N("There is nobody left within reach.")],nextBeatId:"v2_report"});
addBeat("v2_amt_direct_intercept",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:[N("ANBU Marked Target rounds the next corner."),N("A small ninken blocks the remaining exit."),Q("PAKKUN","This yours?"),Q("KAKASHI","Apparently."),N("Kakashi never gives Pakkun a name and Pakkun never gives Kakashi one."),N("The target shifts his weight toward an exit."),N("Kakashi and the ninken close the geometry around him.")],nextBeatId:"v2_battle_amt_direct_pakkun"});
addBeat("v2_battle_amt_direct_pakkun",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake with temporary Story-authorised Pakkun vs ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","amt_direct","v2_amt_missing_win","v2_amt_missing_loss","AK_SA_021")});
addBeat("v2_amt_missing_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_direct",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:[N("ANBU Marked Target breaks Kakashi's control of the fight."),N("He uses the opening to get away."),N("The package remains outside Kakashi's control."),N("Pakkun stays nearby through the connected return.")],nextBeatId:"v2_report"});
addBeat("v2_amt_missing_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_direct",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:[N("The fight ends with ANBU Marked Target on the ground."),N("The package is still missing with Package Smuggler."),N("Package failure and AMT disposition remain separate facts.")],choices:[
 C("amt_missing_kill","KILL HIM","v2_report",{patch:()=>dispose("AMT","KILL")}),
 C("amt_missing_restrain","RESTRAIN HIM","v2_report",{patch:()=>addField("AMT")}),
 C("amt_missing_anbu","BRING HIM TO THE ANBU","v2_report",{patch:()=>dispose("AMT","ANBU")}),
 C("amt_missing_police","TAKE HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("AMT","POLICE")})
]});

// ---------------------------------------------------------------------------
// SECURE THE PACKAGE.
// ---------------------------------------------------------------------------
addBeat("v2_secure_package_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","ps","mi"],preset:"sakura_3_person",cues:[
 N("Kakashi moves before Package Smuggler can turn the exchange into distance."),N("ANBU Marked Target is already breaking away."),N("Kakashi lets him."),N("For now."),
 N("The package is the part of the mission he can still put his hand on."),N("He drops into the street and goes straight for the man carrying it."),
 N("Package Smuggler sees him coming."),N("So does Masked Interceptor."),N("Her line changes immediately."),Q("MASKED INTERCEPTOR","Move."),
 N("Kakashi does not."),Q("PACKAGE SMUGGLER","I was having enough trouble before you joined in."),Q("KAKASHI","Give me the package."),Q("PACKAGE SMUGGLER","That's not really the mood here."),
 Q("MASKED INTERCEPTOR","Last warning."),Q("KAKASHI","I heard the first one."),N("The decision to go for the package has become a fight with both of them.")
],nextBeatId:"v2_battle_ps_mi"});
addBeat("v2_battle_ps_mi",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Retrieve the package.",actors:["kakashi","ps","mi"],preset:"battle_trio",cues:[N("Kakashi Hatake vs Package Smuggler + Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_ps_mi_2v1","ps_mi","v2_ps_mi_win","v2_ps_mi_loss","AK_SA_014")});
addBeat("v2_ps_mi_loss",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:ctx=>captureBattle("ps_mi",ctx,s=>{s.participants.PS.state="ESCAPED";s.participants.MI.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[N("Kakashi loses the opening."),N("Package Smuggler does not waste it."),N("The package moves away with him."),N("Masked Interceptor binds Kakashi long enough to make the result clear, then leaves after Package Smuggler."),N("By the time Kakashi gets free, the street is empty.")],nextBeatId:"v2_report"});
addBeat("v2_ps_mi_win",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","ps","mi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_mi",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";s.participants.MI.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[N("The fight ends with both immediate opponents down."),N("Kakashi's attention goes to the package first."),N("He takes it from Package Smuggler, checks the seal and secures it against his body."),N("For the first time since the exchange, the mission objective is secure.")],choices:[
 C("secure_stay_first","STAY ON THE FIRST MAN","v2_secure_amt_pursuit_resolver",{patch:()=>history("SECURE_PACKAGE_STAY_FIRST")}),
 C("secure_return","RETURN AND REPORT","v2_report",{patch:()=>history("SECURE_PACKAGE_RETURN_REPORT")})
]});
addBeat("v2_secure_amt_pursuit_resolver",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch the first man.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>resolverEnter("secureAmtPursuit"),cues:[N("Kakashi leaves the two defeated shinobi behind."),N("The package is secure now."),N("He takes the rooftops after the first man."),N("Selection of the pursuit does not guarantee success.")],choices:[
 C("secure_amt_success","CONTINUE","v2_secure_amt_intercept",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_SUCCESS"}),
 C("secure_amt_fail","CONTINUE","v2_secure_amt_fail",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_FAILURE"})
]});
addBeat("v2_secure_amt_fail",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>participant("AMT",{state:"ESCAPED"}),cues:[N("Kakashi clears another rooftop."),N("Nothing."),N("The route has split too many times."),N("Whatever lead remained is gone."),N("The package is still secured against him."),N("The first man is gone."),N("Those facts can both be true.")],nextBeatId:"v2_report"});
addBeat("v2_secure_amt_intercept",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:[N("ANBU Marked Target cuts into the next alley."),N("Then stops."),N("A small ninken is sitting in the route ahead of him."),N("Kakashi lands behind."),Q("PAKKUN","This yours?"),Q("KAKASHI","Apparently."),Q("ANBU MARKED TARGET","You got it back."),Q("KAKASHI","I did."),Q("ANBU MARKED TARGET","Then why are you still following me?"),Q("KAKASHI","You're the part I haven't finished."),Q("PAKKUN","He's thinking about running."),Q("KAKASHI","I know."),Q("ANBU MARKED TARGET","You two always this irritating?"),Q("PAKKUN","We just met.")],nextBeatId:"v2_battle_secure_amt"});
addBeat("v2_battle_secure_amt",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake with temporary Story-authorised Pakkun vs ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","secure_amt","v2_secure_amt_win","v2_secure_amt_loss","AK_SA_025")});
addBeat("v2_secure_amt_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("secure_amt",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:[N("ANBU Marked Target finds the opening first."),N("Kakashi loses the fight."),N("He does not lose the package with it."),Q("PAKKUN","You kept the important part."),Q("KAKASHI","I lost him."),Q("PAKKUN","I noticed."),Q("PAKKUN","Both things can be true.")],nextBeatId:"v2_report"});
addBeat("v2_secure_amt_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("secure_amt",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:[N("ANBU Marked Target goes down."),N("Kakashi stays on him until the fight is unquestionably over."),N("The package remains secure."),N("The man does not. Not yet.")],choices:[
 C("secure_amt_police","BRING HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("AMT","POLICE")}),
 C("secure_amt_release","LET HIM GO","v2_report",{patch:()=>dispose("AMT","RELEASE")}),
 C("secure_amt_kill","KILL HIM","v2_report",{patch:()=>dispose("AMT","KILL")}),
 C("secure_amt_anbu","TAKE HIM BACK TO THE ANBU","v2_report",{patch:()=>dispose("AMT","ANBU")})
]});

// Secure before assassin resolver.
addBeat("v2_secure_before_resolver",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","ps","mi"],preset:"sakura_3_person",onEnter:()=>resolverEnter("secureBefore"),cues:[N("Masked Interceptor moves."),N("Package Smuggler reacts."),N("Kakashi sees the gap between them and commits to beating both of them to the objective.")],choices:[
 C("secure_before_success","CONTINUE","v2_secure_before_success",{available:()=>getOutcome("secureBefore")==="SECURE_BEFORE_SUCCESS"}),
 C("secure_before_failure","CONTINUE","v2_secure_package_setup",{available:()=>getOutcome("secureBefore")==="SECURE_BEFORE_FAILURE"})
]});
addBeat("v2_secure_before_success",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:()=>mutate(s=>{s.package.holder="KAKASHI";s.package.recovered=true;s.participants.PS.state="AVAILABLE";s.participants.MI.state="AVAILABLE";}),cues:[N("Kakashi reaches the package before the fight around it can close."),N("The objective comes free."),N("He uses the opening to withdraw instead of turning the moment into another fight."),N("Package recovery does not manufacture custody over anybody left behind.")],nextBeatId:"v2_report"});

// Assassin then package reuses sequential chain, but records intent.
addBeat("v2_assassin_then_package_setup",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"battle_pair",onEnter:()=>history("ASSASSIN_THEN_PACKAGE_SEQUENCE"),cues:[N("Package Smuggler is already moving away with the objective."),N("ANBU Marked Target is farther ahead."),N("Masked Interceptor is the immediate violent pressure."),N("Kakashi makes the priority explicit."),N("Her first."),N("The package second."),N("He turns into Masked Interceptor's line instead of chasing Package Smuggler."),N("Every second Kakashi spends here becomes distance somewhere else."),N("Masked Interceptor commits."),N("So does Kakashi.")],nextBeatId:"v2_battle_mi_package_second"});
addBeat("v2_battle_mi_package_second",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Defeat Masked Interceptor.",actors:["kakashi","mi"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_seq_mi","mi_package_second","v2_mi_package_second_win","v2_mi_package_second_loss","AK_SA_015")});
addBeat("v2_mi_package_second_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("mi_package_second",ctx,s=>{s.participants.MI.state="AVAILABLE";s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[N("Masked Interceptor wins the exchange between them."),N("That is enough."),N("Package Smuggler had already been buying distance with every second of the fight."),N("Now the distance is gone from recoverable to unknown."),N("ANBU Marked Target is gone."),N("Package Smuggler is gone with the objective."),N("Kakashi does not invent what happens after he loses sight of them.")],nextBeatId:"v2_report"});
addBeat("v2_mi_package_second_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Catch the package.",actors:["kakashi","mi"],preset:"post_battle",onEnter:ctx=>captureBattle("mi_package_second",ctx,s=>{s.participants.MI.state="BATTLE_DEFEATED";}),cues:()=>battleActions("mi_package_second")<=4?[N("Masked Interceptor goes down quickly enough that the next problem is still audible."),N("Footsteps."),N("Fading."),N("Not gone."),N("Kakashi looks once at the masked woman."),N("His attention snaps back to the package route."),N("Package Smuggler has a lead."),N("Not an insurmountable one.")]:[N("Masked Interceptor goes down."),N("Too late."),N("Kakashi listens toward the route Package Smuggler took."),N("Nothing."),N("Package Smuggler has had too much time."),N("Winning here does not pull him back into reach.")],choices:[
 C("package_second_chase_ps","CHASE THE PACKAGE SMUGGLER","v2_package_second_ps_pursuit",{available:()=>battleActions("mi_package_second")<=4,patch:()=>history("PACKAGE_SECOND_CHASE_PS")}),
 C("package_second_report","RETURN TO ANBU","v2_report",{available:()=>battleActions("mi_package_second")>4,patch:()=>{participant("PS",{state:"ESCAPED"});participant("AMT",{state:"ESCAPED"});history("PACKAGE_SECOND_TOO_SLOW");}})
]});
addBeat("v2_package_second_ps_pursuit",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch the package.",actors:["kakashi","ps"],preset:"pursuit",onEnter:()=>resolverEnter("psPursuit"),cues:[N("Kakashi moves."),N("The package route is the only immediate priority on this branch."),N("A fast Masked Interceptor victory created a pursuit opportunity, not automatic recovery.")],choices:[
 C("package_second_ps_reached","CONTINUE","v2_package_second_ps_reached",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_SUCCESS"}),
 C("package_second_ps_lost","CONTINUE","v2_package_second_ps_lost",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_FAILURE"})
]});
addBeat("v2_package_second_ps_lost",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>mutate(s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[N("Kakashi takes the next junction too late."),N("Package Smuggler has disappeared into the village with the objective."),N("The opening Kakashi preserved was real."),N("So was the possibility of losing it.")],nextBeatId:"v2_report"});
addBeat("v2_package_second_ps_reached",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Kakashi catches sight of Package Smuggler at the next junction."),Q("PACKAGE SMUGGLER","You again."),Q("KAKASHI","Me again."),N("Package Smuggler reaches for his weapon."),Q("PACKAGE SMUGGLER","Neither of us is very good at taking advice.")],nextBeatId:"v2_battle_ps_package_second"});
addBeat("v2_battle_ps_package_second",{mode:"battle_transition",backdrop:B.alleyAlt,location:"KONOHA · PL BATTLE",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_seq_ps","ps_package_second","v2_ps_package_second_win","v2_ps_package_second_loss","AK_SA_015")});
addBeat("v2_ps_package_second_loss",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_package_second",ctx,s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[N("Package Smuggler gets through him."),N("The package stays with him."),N("Kakashi has fought twice for the same objective tonight."),N("The second loss closes what little trail remained.")],nextBeatId:"v2_report"});
addBeat("v2_ps_package_second_win",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:null,actors:["kakashi","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_package_second",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[N("Package Smuggler goes down."),N("Kakashi takes the package from the defeated man's reach."),N("Checks the seal."),N("Secures it against himself."),N("Only then does he look farther down the route.")],choices:[
 C("package_second_stay_amt","STAY ON THE FIRST MAN","v2_package_second_amt_pursuit",{available:()=>battleActions("ps_package_second")<=3,patch:()=>history("PACKAGE_SECOND_STAY_AMT")}),
 C("package_second_return","RETURN AND REPORT","v2_report",{patch:()=>history("PACKAGE_SECOND_RETURN_REPORT")})
]});
addBeat("v2_package_second_amt_pursuit",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch the first man.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>resolverEnter("secureAmtPursuit"),cues:[N("Kakashi leaves Package Smuggler behind."),N("The package is secured."),N("The first man's trail is thin."),N("Still usable."),N("Kakashi takes it.")],choices:[
 C("package_second_amt_success","CONTINUE","v2_package_second_amt_intercept",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_SUCCESS"}),
 C("package_second_amt_failure","CONTINUE","v2_secure_amt_fail",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_FAILURE"})
]});
addBeat("v2_package_second_amt_intercept",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:[N("Kakashi legitimately reaches ANBU Marked Target."),N("A small ninken closes the other exit."),Q("PAKKUN","This yours?"),Q("KAKASHI","Apparently."),N("The package remains secured to Kakashi."),N("The first man is the remaining problem.")],nextBeatId:"v2_battle_amt_package_second"});
addBeat("v2_battle_amt_package_second",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake with temporary Story-authorised Pakkun vs ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_seq_amt_pakkun","amt_package_second","v2_amt_package_second_win","v2_amt_package_second_loss","AK_SA_015")});
addBeat("v2_amt_package_second_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_package_second",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:[N("ANBU Marked Target wins the final fight and escapes."),N("The package remains secured to Kakashi."),N("Earlier victories and package recovery are not erased by the later loss.")],nextBeatId:"v2_report"});
addBeat("v2_amt_package_second_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_package_second",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:[N("ANBU Marked Target is defeated."),N("The package remains secure."),N("The final participant still requires an authored disposition.")],choices:[
 C("package_second_amt_police","BRING HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("AMT","POLICE")}),
 C("package_second_amt_release","LET HIM GO","v2_report",{patch:()=>dispose("AMT","RELEASE")}),
 C("package_second_amt_kill","KILL HIM","v2_report",{patch:()=>dispose("AMT","KILL")}),
 C("package_second_amt_anbu","TAKE HIM BACK TO THE ANBU","v2_report",{patch:()=>dispose("AMT","ANBU")})
]});

// ---------------------------------------------------------------------------
// GO AFTER ORIGINAL TARGET from WATCH.
// ---------------------------------------------------------------------------
addBeat("v2_go_amt_pursuit_resolver",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch ANBU Marked Target.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>{participant("PS",{state:"ESCAPED"});return resolverEnter("amtPursuitRoot");},cues:[N("Kakashi leaves the package holder and commits to the original target."),N("Package Smuggler continues away with the objective."),N("Kakashi's target is the first man now.")],choices:[
 C("go_amt_success","CONTINUE","v2_amt_direct_intercept",{available:()=>getOutcome("amtPursuitRoot")==="AMT_PURSUIT_SUCCESS"}),
 C("go_amt_failure","CONTINUE","v2_amt_direct_pursuit_fail",{available:()=>getOutcome("amtPursuitRoot")==="AMT_PURSUIT_FAILURE"})
]});

// ---------------------------------------------------------------------------
// MOVE IN CLOSER.
// ---------------------------------------------------------------------------
addBeat("v2_get_closer_resolver",{mode:"choice",backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Learn more without exposing yourself.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>resolverEnter("getCloser"),cues:[N("Kakashi leaves the safer distance behind and moves toward the end of the alley."),N("The move can preserve concealment and expose the contingency conversation—or expose Kakashi and abort the handoff."),N("The factual result is committed once and cannot reroll on refresh.")],choices:[
 C("closer_success","CONTINUE","v2_get_closer_success",{available:()=>getOutcome("getCloser")==="GET_CLOSER_SUCCESS"}),
 C("closer_failure","CONTINUE","v2_get_closer_failure",{available:()=>getOutcome("getCloser")==="GET_CLOSER_FAILURE"})
]});
addBeat("v2_get_closer_success",{mode:"choice",backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Choose what to do with the handoff.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>mutate(s=>{s.knowledge.getCloserContingency=true;}),cues:[N("Kakashi keeps the concealment."),N("From the closer position, he hears enough to understand the contingency: if the street is not clear, ANBU Marked Target keeps the package moving instead of completing the handoff."),N("No downstream destination is stated."),N("Kakashi now knows more, but he still has to decide what to do with it.")],choices:[
 C("closer_handoff","LET THE HANDOFF HAPPEN","v2_closer_handoff",{patch:()=>history("CLOSER_LET_HANDOFF")}),
 C("closer_strike","STRIKE BEFORE THE HANDOFF","v2_direct_strike_setup",{patch:()=>history("CLOSER_STRIKE")}),
 C("closer_pick","ATTEMPT THE PICKPOCKET","v2_improved_pickpocket_resolver",{patch:()=>history("CLOSER_PICKPOCKET")})
]});
addBeat("v2_closer_handoff",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · MAIN STREET · NIGHT",objective:"Retrieve the package.",actors:["amt","ps","mi"],preset:"sakura_3_person",onEnter:()=>{packageState("PS");participant("MI",{state:"AVAILABLE"});return history("CLOSER_HANDOFF_COMPLETED");},cues:[N("Kakashi stays where the shadows still cover him."),N("He has already heard enough to know what the two men expect to happen."),N("ANBU Marked Target takes the package from beneath his clothing."),N("Package Smuggler's hand is still waiting."),N("The transfer completes."),N("The instant it does, Kakashi's earlier information becomes fact."),N("ANBU Marked Target starts to leave."),N("Package Smuggler turns with the objective."),N("Then the darkness beside the street moves."),N("A masked figure tears into the exchange line toward Package Smuggler."),N("Kakashi moved closer to learn more."),N("Now he has more information—and one more person.")],choices:[
 C("closer_watch_stop","STOP THE ASSASSIN","v2_stop_assassin_setup",{patch:()=>history("STOP_THE_ASSASSIN_AFTER_CLOSER")}),
 C("closer_watch_secure","SECURE THE PACKAGE","v2_secure_package_setup",{patch:()=>history("SECURE_PACKAGE_AFTER_CLOSER")}),
 C("closer_watch_before","SECURE THE PACKAGE BEFORE THE ASSASSIN","v2_secure_before_resolver",{patch:()=>history("SECURE_BEFORE_AFTER_CLOSER")}),
 C("closer_watch_sequence","DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE","v2_assassin_then_package_setup",{patch:()=>history("ASSASSIN_THEN_PACKAGE_AFTER_CLOSER")}),
 C("closer_watch_amt","GO AFTER THE ORIGINAL TARGET","v2_go_amt_pursuit_resolver",{patch:()=>history("GO_ORIGINAL_AFTER_CLOSER")})
]});

addBeat("v2_get_closer_failure",{mode:"choice",backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Stop the package from escaping.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>mutate(s=>{s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:[N("Package Smuggler catches the movement before Kakashi reaches the position he wanted."),N("The handoff aborts."),N("ANBU Marked Target keeps the package."),N("Package Smuggler starts toward the compromised observation point."),N("Masked Interceptor never becomes visibly eligible because the transfer never happened.")],choices:[
 C("failure_stay","STAY ON THE PACKAGE","v2_stay_package_pursuit_resolver",{patch:()=>history("STAY_ON_PACKAGE")}),
 C("failure_stop_ps","STOP PACKAGE SMUGGLER","v2_stop_ps_setup",{patch:()=>history("STOP_PACKAGE_SMUGGLER")}),
 C("failure_cutoff","CUT THEM OFF AT THE SAKURA TREE","v2_cutoff_setup",{patch:()=>history("CUT_OFF_SAKURA")})
]});

addBeat("v2_stay_package_pursuit_resolver",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · PURSUIT",objective:"Catch ANBU Marked Target.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>resolverEnter("stayPackagePursuit"),cues:[N("Package Smuggler is coming toward the alley."),N("ANBU Marked Target is going the other way."),N("The package goes with him."),N("Kakashi runs straight past Package Smuggler."),Q("PACKAGE SMUGGLER","There!"),Q("ANBU MARKED TARGET","A kid?"),Q("KAKASHI","The package."),N("Kakashi stops trying to run faster and starts cutting the route instead.")],choices:[
 C("stay_success","CONTINUE","v2_stay_package_intercept",{available:()=>getOutcome("stayPackagePursuit")==="STAY_PACKAGE_PURSUIT_SUCCESS"}),
 C("stay_failure","CONTINUE","v2_stay_package_failure",{available:()=>getOutcome("stayPackagePursuit")==="STAY_PACKAGE_PURSUIT_FAILURE"})
]});
addBeat("v2_stay_package_failure",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:()=>mutate(s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";}),cues:[N("Kakashi cuts inside the target's route."),N("The target is not there."),N("By the time Kakashi reaches the far side of the tree, ANBU Marked Target is already at the edge of the square."),N("A turn between buildings."),N("Gone."),N("Three possible routes."),N("No movement."),N("The package is still in the wrong hands."),N("Pakkun never appears on a timeline where Kakashi never reaches the target.")],nextBeatId:"v2_report"});
addBeat("v2_stay_package_intercept",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:[N("Kakashi cuts inside the target's route."),N("ANBU Marked Target comes around the far side and sees him."),N("Too late."),N("A small ninken stands in the middle of the exit."),Q("ANBU MARKED TARGET","Seriously?"),N("Kakashi arrives behind him."),Q("PAKKUN","This yours?"),Q("KAKASHI","Apparently."),Q("KAKASHI","Thanks."),N("No introduction."),N("No names exchanged."),Q("ANBU MARKED TARGET","You've been chasing this thing all night."),Q("KAKASHI","You've been running with it."),Q("ANBU MARKED TARGET","Fair."),Q("PAKKUN","Trouble?"),Q("KAKASHI","Probably."),Q("PAKKUN","Useful."),N("The pursuit is over."),N("The package problem isn't.")],choices:[
 C("demand_package","DEMAND THE PACKAGE","v2_demand_setup",{patch:()=>history("DEMAND_PACKAGE")}),
 C("take_him_down","TAKE HIM DOWN","v2_take_down_setup",{patch:()=>history("TAKE_HIM_DOWN")}),
 C("ask_where","ASK WHERE THE PACKAGE WAS GOING","v2_ask_where",{patch:()=>history("ASK_WHERE_PACKAGE_GOING")})
]});
addBeat("v2_ask_where",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>mutate(s=>{s.knowledge.askWhere=true;s.knowledge.downstreamDestinationKnown=false;}),cues:[N("ANBU Marked Target keeps one hand close to the package."),N("He waits for Kakashi to demand it."),N("Kakashi asks something else."),Q("KAKASHI","Where was the package going after the handoff?"),N("The question surprises him."),Q("ANBU MARKED TARGET","My part ended there."),Q("KAKASHI","The receiver was taking it onward."),Q("ANBU MARKED TARGET","That was the plan."),Q("KAKASHI","Where?"),Q("ANBU MARKED TARGET","I asked the same thing."),N("Kakashi gets information, but not a destination."),N("The carrier's role ended at the handoff. Package Smuggler was meant to carry it onward. ANBU Marked Target did not know where.")],choices:[
 C("ask_then_demand","DEMAND THE PACKAGE","v2_demand_setup"),
 C("ask_then_take","TAKE HIM DOWN","v2_take_down_setup")
]});
addBeat("v2_demand_setup",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"intercept",cues:[Q("KAKASHI","Give me the package."),N("ANBU Marked Target does not surrender it."),N("The demand becomes a fight without changing package custody before Battle.")],nextBeatId:"v2_battle_demand_amt"});
addBeat("v2_battle_demand_amt",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake with temporary Story-authorised Pakkun vs ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","demand_amt","v2_demand_win","v2_demand_loss","AK_SA_008")});
addBeat("v2_demand_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("demand_amt",ctx,s=>{s.participants.AMT.state="ESCAPED";s.package.holder="AMT";}),cues:[N("Kakashi loses the Battle."),N("ANBU Marked Target remains standing."),Q("ANBU MARKED TARGET","You asked."),N("He escapes with the package."),N("There is no disposition choice."),N("Pakkun remains factually present through the connected return until an explicit departure.")],nextBeatId:"v2_report"});
addBeat("v2_demand_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("demand_amt",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[N("Kakashi and Pakkun win the Battle."),N("Kakashi recovers the package."),N("ANBU Marked Target survives and remains physically available."),N("Battle victory does not select his disposition.")],choices:[
 C("demand_police","BRING HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("AMT","POLICE")}),
 C("demand_release","LET HIM GO","v2_report",{patch:()=>dispose("AMT","RELEASE")}),
 C("demand_kill","KILL HIM","v2_report",{patch:()=>dispose("AMT","KILL")}),
 C("demand_anbu","TAKE HIM BACK TO THE ANBU","v2_report",{patch:()=>dispose("AMT","ANBU")})
]});
addBeat("v2_take_down_setup",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>packageState("NEUTRAL",{neutral:true}),cues:[N("No demand."),N("Kakashi moves first."),N("The opening intervention knocks the package out of ANBU Marked Target's custody before the main Battle state forms."),N("The package hits the ground."),N("Pakkun cuts off the simplest route back to it."),N("ANBU Marked Target is now fighting to regain the objective, not merely keep it.")],nextBeatId:"v2_battle_take_down_amt"});
addBeat("v2_battle_take_down_amt",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Control the target and the neutral package.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake with temporary Story-authorised Pakkun vs ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","take_down_amt","v2_take_down_win","v2_take_down_loss","AK_SA_008")});
addBeat("v2_take_down_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("take_down_amt",ctx,s=>{s.participants.AMT.state="ESCAPED";s.package.holder="KAKASHI";s.package.recovered=true;s.package.neutral=false;}),cues:[N("Kakashi loses the fight."),N("The result does not rewind the opening intervention."),N("ANBU Marked Target uses the escape window instead of recovering the package."),N("The mission objective remains behind."),N("Kakashi loses the target but recovers the package."),N("Both facts remain true.")],nextBeatId:"v2_report"});
addBeat("v2_take_down_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("take_down_amt",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;s.package.neutral=false;}),cues:[N("Kakashi controls the fight and secures the package from the ground."),N("ANBU Marked Target survives."),N("What happens to him next remains a separate choice.")],choices:[
 C("take_police","BRING HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("AMT","POLICE")}),
 C("take_release","LET HIM GO","v2_report",{patch:()=>dispose("AMT","RELEASE")}),
 C("take_kill","KILL HIM","v2_report",{patch:()=>dispose("AMT","KILL")}),
 C("take_anbu","TAKE HIM BACK TO THE ANBU","v2_report",{patch:()=>dispose("AMT","ANBU")})
]});

addBeat("v2_stop_ps_setup",{backdrop:B.alleyAlt,location:"KONOHA ALLEYWAY · NIGHT",objective:"Stop Package Smuggler.",actors:["kakashi","ps"],preset:"battle_pair",onEnter:()=>mutate(s=>{s.participants.AMT.state="ESCAPED";s.package.holder="AMT";}),cues:[N("Kakashi turns on Package Smuggler instead of following the objective carrier."),N("ANBU Marked Target uses the choice to leave with the package."),N("Masked Interceptor remains unseen."),N("Package Smuggler is the only opponent Kakashi commits to here.")],nextBeatId:"v2_battle_ps_direct"});
addBeat("v2_battle_ps_direct",{mode:"battle_transition",backdrop:B.fight,location:"KONOHA · PL BATTLE",objective:"Stop Package Smuggler.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_ps_1v1","ps_direct","v2_ps_missing_win","v2_ps_missing_loss","AK_SA_016")});
addBeat("v2_ps_missing_loss",{backdrop:B.fight,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_direct",ctx,s=>{s.participants.PS.state="ESCAPED";}),cues:[N("Package Smuggler wins the fight and gets away."),N("ANBU Marked Target already escaped with the package."),N("Masked Interceptor never appeared.")],nextBeatId:"v2_report"});
addBeat("v2_ps_missing_win",{mode:"choice",backdrop:B.fight,location:"KONOHA · NIGHT",objective:null,actors:["kakashi","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_direct",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";}),cues:[N("Package Smuggler is defeated."),N("The package is still missing with ANBU Marked Target."),N("Package failure does not remove Kakashi's post-Battle agency over the defeated man.")],choices:[
 C("ps_missing_kill","KILL HIM","v2_report",{patch:()=>dispose("PS","KILL")}),
 C("ps_missing_restrain","RESTRAIN HIM","v2_report",{patch:()=>addField("PS")}),
 C("ps_missing_anbu","BRING HIM TO THE ANBU","v2_report",{patch:()=>dispose("PS","ANBU")}),
 C("ps_missing_police","TAKE HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("PS","POLICE")})
]});
addBeat("v2_cutoff_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Stop the package.",actors:["kakashi","amt","ps","pakkun"],preset:"sakura_group",onEnter:()=>setPakkun(true),cues:[N("Kakashi cuts the route toward the Sakura tree."),N("ANBU Marked Target and Package Smuggler are forced into the same confrontation."),N("Pakkun is present in Story because Kakashi legitimately reaches the AMT interception space."),N("This exact AMT+PS Battle config does not grant Pakkun independent Battle actions.")],nextBeatId:"v2_battle_cutoff"});
addBeat("v2_battle_cutoff",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Stop the package.",actors:["kakashi","amt","ps"],preset:"battle_trio",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_amt_ps_2v1","cutoff","v2_cutoff_win","v2_cutoff_loss","AK_SA_017")});
addBeat("v2_cutoff_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("cutoff",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";}),cues:[N("Kakashi loses the two-target fight."),N("ANBU Marked Target escapes with the package."),N("Package Smuggler escapes separately."),N("Pakkun's Story presence does not manufacture a non-authorised Battle action or custody result.")],nextBeatId:"v2_report"});
addBeat("v2_cutoff_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("cutoff",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;s.groupParticipants=["AMT","PS"];}),cues:[N("Both opponents are down."),N("Kakashi secures the package."),N("A simultaneous defeated set receives a readable group disposition instead of a combinatorial per-target button explosion.")],choices:[
 C("cutoff_police","TAKE THEM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>disposeGroup("POLICE",[AMT,PS])}),
 C("cutoff_anbu","TAKE THEM TO THE ANBU","v2_report",{patch:()=>disposeGroup("ANBU",[AMT,PS])}),
 C("cutoff_kill","KILL THEM","v2_report",{patch:()=>disposeGroup("KILL",[AMT,PS])}),
 C("cutoff_release","TAKE THE PACKAGE AND LET THEM GO","v2_report",{patch:()=>disposeGroup("RELEASE",[AMT,PS])})
]});

// Improved-position Pickpocket.
addBeat("v2_improved_pickpocket_resolver",{mode:"choice",backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Take the package cleanly.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>resolverEnter("improvedPickpocket"),cues:[N("Kakashi uses the closer position to attempt the package before the handoff."),N("Success is a clean extraction."),N("Failure exposes him to ANBU Marked Target and Package Smuggler; Masked Interceptor remains unseen because the handoff never completed.")],choices:[
 C("improved_pick_success","CONTINUE","v2_pickpocket_clean_success",{available:()=>getOutcome("improvedPickpocket")==="PICKPOCKET_IMPROVED_SUCCESS"}),
 C("improved_pick_fail","CONTINUE","v2_improved_pick_fail_setup",{available:()=>getOutcome("improvedPickpocket")==="PICKPOCKET_IMPROVED_FAILURE"})
]});
addBeat("v2_improved_pick_fail_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","ps"],preset:"battle_trio",onEnter:()=>mutate(s=>{s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:[N("The improved-position theft fails."),N("ANBU Marked Target keeps the package."),N("Package Smuggler joins the confrontation."),N("Masked Interceptor remains unseen."),N("The result is the exact AMT + PS 2-v-1 Battle.")],nextBeatId:"v2_battle_improved_2v1"});
addBeat("v2_battle_improved_2v1",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Recover the package.",actors:["kakashi","amt","ps"],preset:"battle_trio",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_amt_ps_2v1","improved_2v1","v2_improved_2v1_win","v2_improved_2v1_loss","AK_SA_030")});
addBeat("v2_improved_2v1_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("improved_2v1",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";}),cues:[N("Kakashi loses the two-target fight."),N("The package remains with ANBU Marked Target."),N("Both opponents withdraw."),N("The extra Knowledge from getting closer remains part of the Chronicle even after failure.")],nextBeatId:"v2_report"});
addBeat("v2_improved_2v1_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("improved_2v1",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[N("Kakashi wins the two-target Battle and secures the package."),N("The failed covert attempt remains part of the history."),N("The defeated pair now receive one authored group disposition.")],choices:[
 C("improved_police","TAKE THEM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>disposeGroup("POLICE",[AMT,PS])}),
 C("improved_anbu","TAKE THEM TO THE ANBU","v2_report",{patch:()=>disposeGroup("ANBU",[AMT,PS])}),
 C("improved_kill","KILL THEM","v2_report",{patch:()=>disposeGroup("KILL",[AMT,PS])}),
 C("improved_release","TAKE THE PACKAGE AND LET THEM GO","v2_report",{patch:()=>disposeGroup("RELEASE",[AMT,PS])})
]});

// ---------------------------------------------------------------------------
// DIRECT STRIKE BEFORE THE HANDOFF.
// ---------------------------------------------------------------------------
addBeat("v2_direct_strike_setup",{backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Stop the handoff.",actors:["kakashi","amt","ps"],preset:"battle_trio",onEnter:()=>mutate(s=>{s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:[N("ANBU Marked Target starts to move the package toward Package Smuggler's waiting hand."),N("Kakashi decides not to let the handoff happen."),N("He leaves cover at speed."),Q("PACKAGE SMUGGLER","So much for the empty street."),N("ANBU Marked Target pulls the package back."),Q("ANBU MARKED TARGET","Then you know I keep it."),Q("KAKASHI","For now."),N("Masked Interceptor is not part of this first Battle.")],nextBeatId:"v2_battle_direct_strike_2v1"});
addBeat("v2_battle_direct_strike_2v1",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Stop the handoff.",actors:["kakashi","amt","ps"],preset:"battle_trio",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_amt_ps_2v1","direct_strike_2v1","v2_direct_strike_2v1_win","v2_direct_strike_2v1_loss","AK_SA_003")});
addBeat("v2_direct_strike_2v1_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("direct_strike_2v1",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:[N("Kakashi loses the first fight."),N("ANBU Marked Target and Package Smuggler withdraw with the package."),N("Masked Interceptor never enters Kakashi's fight on this chronology.")],nextBeatId:"v2_report"});
addBeat("v2_direct_strike_2v1_win",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Keep the recovered package.",actors:["kakashi","amt","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("direct_strike_2v1",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[N("Kakashi wins the two-target Battle."),N("The package is secured to Kakashi."),N("Then the darkness moves."),N("Masked Interceptor appears specifically to take the recovered package."),N("She was not a participant in the first Battle.")],nextBeatId:"v2_battle_direct_mi"});
addBeat("v2_battle_direct_mi",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Keep the package.",actors:["kakashi","mi"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_mi_1v1","direct_mi","v2_direct_mi_win","v2_direct_mi_loss","AK_SA_003")});
addBeat("v2_direct_mi_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("direct_mi",ctx,s=>{s.participants.MI.state="ESCAPED";s.package.holder="MI";s.package.recovered=false;}),cues:[N("Masked Interceptor wins the second fight."),N("She takes the package from Kakashi and escapes."),N("The earlier defeat of ANBU Marked Target and Package Smuggler remains historical fact; it is not erased by the later loss.")],nextBeatId:"v2_report"});
addBeat("v2_direct_mi_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps","mi"],preset:"sakura_group",onEnter:ctx=>captureBattle("direct_mi",ctx,s=>{s.participants.MI.state="BATTLE_DEFEATED";}),cues:[N("Masked Interceptor goes down."),N("All three opponents are now defeated."),N("The package remains with Kakashi."),N("One group decision closes the simultaneous defeated set.")],choices:[
 C("direct_group_police","TAKE THEM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>disposeGroup("POLICE")}),
 C("direct_group_anbu","TAKE THEM TO THE ANBU","v2_report",{patch:()=>disposeGroup("ANBU")}),
 C("direct_group_kill","KILL THEM","v2_report",{patch:()=>disposeGroup("KILL")}),
 C("direct_group_release","TAKE THE PACKAGE AND LET THEM GO","v2_report",{patch:()=>disposeGroup("RELEASE")})
]});

// ---------------------------------------------------------------------------
// DIRECT PICKPOCKET.
// ---------------------------------------------------------------------------
addBeat("v2_direct_pickpocket_resolver",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Take the package cleanly.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>resolverEnter("directPickpocket"),cues:[N("Kakashi does not wait for the handoff."),N("The package is still with ANBU Marked Target."),N("Package Smuggler is waiting to receive it."),N("Neither is looking for a third set of hands."),N("That is the opening."),N("Kakashi gets close enough to take it—if he is clean.")],choices:[
 C("direct_pick_success","CONTINUE","v2_pickpocket_clean_success",{available:()=>getOutcome("directPickpocket")==="PICKPOCKET_DIRECT_SUCCESS"}),
 C("direct_pick_failure","CONTINUE","v2_pickpocket_failure_setup",{available:()=>getOutcome("directPickpocket")==="PICKPOCKET_DIRECT_FAILURE"})
]});
addBeat("v2_pickpocket_clean_success",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:()=>mutate(s=>{s.package.holder="KAKASHI";s.package.recovered=true;s.participants.MI.state="UNSEEN";}),cues:[N("ANBU Marked Target reaches for the package."),N("Kakashi reaches it first."),N("Not with force."),N("With timing."),N("Two fingers catch the edge."),N("A turn of the wrist."),N("The package leaves one shinobi before the other ever receives it."),N("Kakashi is already moving when ANBU Marked Target's hand closes on empty cloth."),Q("PACKAGE SMUGGLER","Where is it?"),N("Kakashi is already gone."),N("By the time they understand that the exchange failed, the package is secured against his side."),N("No fight."),N("No pursuit."),N("No prisoner."),N("No body."),N("Just the objective.")],nextBeatId:"v2_report"});
addBeat("v2_pickpocket_failure_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","ps","mi"],preset:"sakura_group",onEnter:()=>{participant("MI",{state:"AVAILABLE"});packageState("AMT");return history("PICKPOCKET_DETECTED_3V1");},cues:[N("Kakashi gets a hand on the package."),N("ANBU Marked Target gets a hand on Kakashi."),N("Enough to ruin the theft."),Q("PACKAGE SMUGGLER","Thought we had company."),N("Then the darkness beside the street moves."),N("Masked Interceptor sees Kakashi too."),Q("MASKED INTERCEPTOR","You picked a crowded night."),Q("KAKASHI","I noticed."),Q("PACKAGE SMUGGLER","Can we all agree he started it?"),Q("ANBU MARKED TARGET","No."),N("Kakashi wanted the package without a fight."),N("He has managed to get everybody instead.")],nextBeatId:"v2_battle_pickpocket_3v1"});
addBeat("v2_battle_pickpocket_3v1",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Recover the package.",actors:["kakashi","amt","ps","mi"],preset:"sakura_group",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler + Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_amt_ps_mi_3v1","pickpocket_3v1","v2_pickpocket_3v1_win","v2_pickpocket_3v1_loss","AK_SA_028")});
addBeat("v2_pickpocket_3v1_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("pickpocket_3v1",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.participants.MI.state="ESCAPED";s.package.holder="AMT";}),cues:[N("Three opponents are too much."),N("The opening finally comes from ANBU Marked Target."),N("Kakashi goes down."),N("The package never reaches him."),N("Package Smuggler is the first to move away."),N("ANBU Marked Target follows with the package still secured."),Q("MASKED INTERCEPTOR","You nearly made that much more interesting."),N("Then she is gone too."),N("Three people entered the fight."),N("Three people leave it."),N("The package leaves with them.")],nextBeatId:"v2_report"});
addBeat("v2_pickpocket_3v1_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps","mi"],preset:"sakura_group",onEnter:ctx=>captureBattle("pickpocket_3v1",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.participants.MI.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[N("The last opponent hits the ground."),N("For the first time since Kakashi entered the exchange, nobody else is moving."),N("Three defeated shinobi."),N("One package."),N("Kakashi goes to the objective first."),N("He takes the package, checks the seal and secures it against himself."),N("Winning the fight solved the package problem."),N("It did not decide what happens to them.")],choices:[
 C("pick_group_police","TAKE THEM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>disposeGroup("POLICE")}),
 C("pick_group_anbu","TAKE THEM TO THE ANBU","v2_report",{patch:()=>disposeGroup("ANBU")}),
 C("pick_group_kill","KILL THEM","v2_report",{patch:()=>disposeGroup("KILL")}),
 C("pick_group_release","TAKE THE PACKAGE AND LET THEM GO","v2_report",{patch:()=>disposeGroup("RELEASE")})
]});

// ---------------------------------------------------------------------------
// TERMINAL — factual report -> private evaluation -> Receipt -> Origin complete.
// ---------------------------------------------------------------------------
addBeat("v2_report",{backdrop:B.rooftop,location:"ANBU REPORT · KONOHA ROOFTOP · NIGHT",objective:"Report to ANBU.",actors:["kakashi","anbu"],preset:"anbu_report",transition:"wipe",onEnter:()=>mutate(s=>{if(s.package.holder==="KAKASHI"){s.package.holder="ANBU";s.package.returned=true;}s.terminal.reportReached=true;}),cues:()=>dynamicTerminalCues(),nextBeatId:"v2_minato"});
addBeat("v2_minato",{backdrop:B.hokage,location:"HOKAGE ADMINISTRATION · NIGHT",objective:null,actors:["anbu","minato"],preset:"hokage_report",transition:"wipe",onEnter:()=>mutate(s=>{s.terminal.minatoReached=true;}),cues:()=>minatoCues(),nextBeatId:"v2_receipt"});
addBeat("v2_receipt",{backdrop:B.hokage,location:"CHRONICLE RECEIPT",objective:null,actors:[],preset:"chronicle_receipt",transition:"wipe",receipt:true,onEnter:()=>mutate(s=>{s.terminal.receiptReached=true;}),cues:()=>receiptCues(),nextBeatId:"v2_complete"});
addBeat("v2_complete",{backdrop:B.hokage,location:"CHRONICLE CLOSED",objective:null,actors:[],preset:"chronicle_receipt",cues:[RECORD("Origin occurrence sealed. Continue to Academy Team Formation.")],onAdvance:()=>{
  const s=state();if(!s)return{success:false,reason:"kakashi_v2_state_missing"};
  if(!s.rewards.terminalCommitted){s.rewards.terminalCommitted=true;save();}
  const result=typeof completeChronicleOriginPrologue==="function"?completeChronicleOriginPrologue(ORIGIN_ID,[`kakashi_v2:${active().instanceId}`]):{success:false,reason:"origin_completion_api_missing"};
  return result&&result.success?{success:true,originCompletion:result}:result;
},exitScene:true});

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
 return{...row,cues,state:s,actors:(row.actors||[]).map(key=>A[key]||null).filter(Boolean)};
}
function diagnostics(){
 const def=getStorySceneDefinition(SCENE_ID);
 const root=def&&def.beatMap.get("v2_scene02_tail"),watch=def&&def.beatMap.get("v2_watch_exchange");
 const checks={
  sceneRegistered:!!def,
  exactRootChoices:!!root&&root.choices.map(c=>c.label).join("|")==="WATCH THE EXCHANGE|MOVE IN CLOSER|STRIKE BEFORE THE HANDOFF|SLIP IN FOR THE PACKAGE",
  exactWatchChoices:!!watch&&watch.choices.map(c=>c.label).join("|")==="STOP THE ASSASSIN|SECURE THE PACKAGE|SECURE THE PACKAGE BEFORE THE ASSASSIN|DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE|GO AFTER THE ORIGINAL TARGET",
  tenBattleConfigsAvailable:!!globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010&&Object.keys(globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010.configs||{}).length===10,
  currentLethalLabels:JSON.stringify(beats).includes("KILL HER")&&JSON.stringify(beats).includes("KILL HIM")&&JSON.stringify(beats).includes("KILL THEM")&&!JSON.stringify(beats).includes("ATTEMPT TO KILL"),
  stableFactualResolver:Object.keys(factualDefs).length>=7,
  noDomOwnership:!String(addBeat).includes("document.")&&!String(resolveFactual).includes("querySelector"),
  terminalCompleteCallsOrigin:manifest.v2_complete&&String(beats.find(b=>b.beatId==="v2_complete").onAdvanceConsequences[0].resolve).includes("completeChronicleOriginPrologue"),
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
