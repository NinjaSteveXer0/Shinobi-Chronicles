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
if(!D||!F||!WCAT)throw new Error("kakashi_v2_requires_story_decision_factual_and_authoritative_content");
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
function addField(ref){const key=participantKey(ref);return mutate(s=>{if(!s.fieldSecured.includes(key))s.fieldSecured.push(key);if(!s.participants[key])s.participants[key]={state:"AVAILABLE"};s.participants[key].state="FIELD_SECURED_PENDING_COLLECTION";s.participants[key].fieldLocation=key==="MI"?"beneath the Sakura tree":key==="PS"?"in the side street":key==="AMT"?"in the alley":"at the committed field location";});}
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

function packageReportCues(s){
  if(s.package.returned===true||s.package.holder==="ANBU")return[
    N("Kakashi takes out the package and sets it between them."),
    Q("KAKASHI","Recovered."),
    N("The operative checks the seal before taking it.")
  ];
  if(s.package.holder==="PS")return[
    Q("ANBU OPERATIVE","Package?"),
    Q("KAKASHI","The receiver got away with it.")
  ];
  if(s.package.holder==="AMT")return[
    Q("ANBU OPERATIVE","Package?"),
    Q("KAKASHI","The original target still had it when he escaped.")
  ];
  if(s.package.holder==="MI")return[
    Q("ANBU OPERATIVE","Package?"),
    Q("KAKASHI","The masked shinobi took it from me.")
  ];
  return[
    Q("ANBU OPERATIVE","Package?"),
    Q("KAKASHI","Lost track of it."),
    Q("ANBU OPERATIVE","To whom?"),
    Q("KAKASHI","I can't say.")
  ];
}
function participantReportCues(s,ref){
  const row=s.participants&&s.participants[ref];if(!row||row.state==="UNSEEN")return[];
  const out=[];
  if(ref==="MI"){
    if(row.state==="DEAD")return out;
    if(row.state==="ESCAPED")out.push(Q("KAKASHI","The masked shinobi got away."));
    else if(row.state==="FIELD_SECURED_PENDING_COLLECTION")out.push(Q("KAKASHI","She's bound under the Sakura tree. Alive."),Q("ANBU OPERATIVE","We'll collect her."));
    else if(row.state==="ANBU_CUSTODY")out.push(Q("KAKASHI","She's already in ANBU custody."));
    else if(row.state==="POLICE_CUSTODY")out.push(Q("KAKASHI","I handed her to the Uchiha Police. Alive."));
    else if(row.state==="RELEASED")out.push(Q("KAKASHI","I let her go."),Q("ANBU OPERATIVE","You had control?"),Q("KAKASHI","Yes."));
    else if(row.state==="BATTLE_DEFEATED")out.push(Q("KAKASHI","She was alive when I left. I didn't restrain her."));
  }else if(ref==="PS"){
    if(row.state==="DEAD")return out;
    if(row.state==="ESCAPED"&&s.package.holder==="PS")out.push(Q("KAKASHI","The receiver escaped with the package."));
    else if(row.state==="ESCAPED")out.push(Q("KAKASHI","The receiver got away."));
    else if(row.state==="FIELD_SECURED_PENDING_COLLECTION")out.push(Q("KAKASHI","He's restrained in the side street."),Q("ANBU OPERATIVE","Exact location?"),Q("KAKASHI",row.fieldLocation||"The side street."));
    else if(row.state==="ANBU_CUSTODY")out.push(Q("KAKASHI","He's in ANBU custody."));
    else if(row.state==="POLICE_CUSTODY")out.push(Q("KAKASHI","I handed him to the Uchiha Police."));
    else if(row.state==="RELEASED")out.push(Q("KAKASHI","I let him go."),Q("ANBU OPERATIVE","After you had control?"),Q("KAKASHI","Yes."));
    else if(row.state==="BATTLE_DEFEATED")out.push(Q("KAKASHI","He was alive when I left. Unrestrained."));
  }else if(ref==="AMT"){
    const lostBattle=Object.values(s.battles||{}).some(b=>b&&b.outcome==="defeat"&&String(b.encounterId||"").includes("amt"));
    if(row.state==="DEAD")return out;
    if(row.state==="ESCAPED"&&lostBattle){
      out.push(Q("KAKASHI","The original target beat me and got away."));
      if(s.pakkun.present)out.push(Q("PAKKUN","He did."));
    }else if(row.state==="ESCAPED")out.push(Q("KAKASHI","The original target got away."));
    else if(row.state==="FIELD_SECURED_PENDING_COLLECTION")out.push(Q("KAKASHI","He's restrained in the alley. Alive."),Q("ANBU OPERATIVE","We'll send a team."));
    else if(row.state==="ANBU_CUSTODY")out.push(Q("KAKASHI","He's in ANBU custody."));
    else if(row.state==="POLICE_CUSTODY")out.push(Q("KAKASHI","I handed him to the Uchiha Police. Alive."));
    else if(row.state==="RELEASED")out.push(Q("KAKASHI","I let him go."),Q("ANBU OPERATIVE","Deliberately?"),Q("KAKASHI","Yes."));
    else if(row.state==="BATTLE_DEFEATED")out.push(Q("KAKASHI","He was alive when I left. Unrestrained."));
  }
  return out;
}
function knowledgeReportCues(s){
  const out=[];
  if(s.knowledge.getCloserContingency)out.push(
    Q("ANBU OPERATIVE","You heard them before you moved in."),
    Q("KAKASHI","If the street stayed clear, the carrier handed it over. If it didn't, he kept moving."),
    Q("ANBU OPERATIVE","Destination?"),
    Q("KAKASHI","They never said.")
  );
  if(s.knowledge.askWhere)out.push(
    Q("KAKASHI","I questioned the original carrier."),
    Q("ANBU OPERATIVE","What did he know?"),
    Q("KAKASHI","His part ended at the handoff. The receiver had the next leg."),
    Q("ANBU OPERATIVE","Where to?"),
    Q("KAKASHI","He didn't know. He'd asked too.")
  );
  return out;
}
function pakkunReportAndDepartureCues(s){
  if(!s.pakkun.present)return[];
  return[
    N("The operative's attention shifts to the ninken beside Kakashi."),
    Q("ANBU OPERATIVE","Yours?"),
    Q("PAKKUN","No."),
    Q("KAKASHI","He helped."),
    N("Pakkun gives Kakashi a sideways look."),
    Q("PAKKUN","Temporarily."),
    N("The operative accepts that and returns to the report."),
    N("When there is nothing left for him to add, Pakkun gets to his feet."),
    Q("PAKKUN","That's me done."),
    Q("KAKASHI","Thanks."),
    N("Pakkun nods once and leaves without waiting for anything else.")
  ];
}
function lethalReportCues(s){
  const dead=["MI","PS","AMT"].filter(ref=>s.participants[ref]&&s.participants[ref].state==="DEAD");
  if(dead.length===3)return[
    Q("ANBU OPERATIVE","The other three?"),
    Q("KAKASHI","Dead."),
    N("The operative holds Kakashi's gaze."),
    Q("ANBU OPERATIVE","During the fights?"),
    Q("KAKASHI","After."),
    N("That is the part that changes the room."),
    Q("ANBU OPERATIVE","All three were deliberate."),
    Q("KAKASHI","Yes.")
  ];
  const out=[];
  if(dead.length===2){
    const names=dead.map(ref=>ref==="MI"?"masked shinobi":ref==="PS"?"receiver":"original target");

    out.push(Q("KAKASHI",`The ${names[0]} and the ${names[1]} are dead.`));
    const survivor=["MI","PS","AMT"].find(ref=>!dead.includes(ref));
    out.push(...participantReportCues(s,survivor));

    out.push(N("The operative does not reduce the night to a body count. He waits until Kakashi has finished the third person's outcome too."));
    return out;
  }
  if(dead.length===1){
    const ref=dead[0],name=ref==="MI"?"masked shinobi":ref==="PS"?"receiver":"original target";
    out.push(Q("KAKASHI",`The ${name} is dead.`));
    for(const other of ["MI","PS","AMT"])if(other!==ref)out.push(...participantReportCues(s,other));
    return out;
  }
  return out;
}
function dynamicTerminalCues(){
  const s=state();if(!s)return[];
  const cues=[N("Kakashi reaches the rooftop. The ANBU operative is already waiting.")];
  if(s.pakkun.present)cues.push(N("Pakkun comes up beside him and sits without invitation."));
  cues.push(Q("ANBU OPERATIVE","Report."));
  cues.push(...packageReportCues(s));
  const deaths=["MI","PS","AMT"].filter(ref=>s.participants[ref]&&s.participants[ref].state==="DEAD").length;
  if(deaths)cues.push(...lethalReportCues(s));
  else for(const ref of ["MI","PS","AMT"])cues.push(...participantReportCues(s,ref));
  cues.push(...knowledgeReportCues(s),...pakkunReportAndDepartureCues(s));
  return cues;
}
function minatoPackageCues(s,{lethal=false}={}){
  const recovered=s.package.recovered||s.package.returned||s.package.holder==="ANBU";
  if(lethal){
    if(recovered)return[
      Q("MINATO","And the package?"),
      Q("ANBU OPERATIVE","Recovered."),
      N("Minato nods once."),
      Q("MINATO","Keep that separate from the deaths.")
    ];
    return[
      Q("MINATO","Package?"),
      Q("ANBU OPERATIVE",s.package.holder==="PS"?"Lost with the receiver.":s.package.holder==="AMT"?"Lost with the original target.":s.package.holder==="MI"?"Taken by the masked shinobi.":"Not recovered."),
      N("Minato looks back at the report."),
      Q("MINATO","Then don't let the body count make the objective look successful.")
    ];
  }
  if(recovered)return[
    Q("MINATO","He brought the package back."),
    Q("ANBU OPERATIVE","Yes."),
    Q("MINATO","What did he give up to do it?")
  ];
  return[
    Q("MINATO","He lost the package."),
    Q("ANBU OPERATIVE","Yes."),
    Q("MINATO","What did he come back with?")
  ];
}
function lethalMinatoCues(s){
  const dead=["MI","PS","AMT"].filter(ref=>s.participants[ref]&&s.participants[ref].state==="DEAD");
  const out=[N("The ANBU operative finishes the report. Minato stays quiet long enough to make sure there is nothing else coming.")];
  if(dead.length===3)out.push(
    Q("MINATO","Three deaths. None of them in the fight itself."),
    Q("ANBU OPERATIVE","Correct."),
    N("Minato looks down at the report."),
    Q("MINATO","So he knew when each fight was over."),
    Q("ANBU OPERATIVE","Yes."),
    Q("MINATO","And still made the same decision three times."),
    Q("ANBU OPERATIVE","Yes."),
    N("Minato closes the file halfway."),
    Q("MINATO","Then that's the part I care about. Not the number.")
  );
  else if(dead.length===2){
    const survivor=["MI","PS","AMT"].find(ref=>!dead.includes(ref));
    const survivorState=s.participants[survivor]&&s.participants[survivor].state;

    out.push(Q("MINATO","Two deliberate deaths."));
    if(survivorState==="RELEASED")out.push(Q("MINATO","And he let the third person walk."));
    else if(["ANBU_CUSTODY","POLICE_CUSTODY","FIELD_SECURED_PENDING_COLLECTION"].includes(survivorState))out.push(Q("MINATO","But he kept the third person alive."));
    else out.push(Q("MINATO","The third outcome wasn't his to finish."));

    out.push(N("Minato lets the difference sit before moving on."));
  }else if(dead.length===1){
    const ref=dead[0];
    if(ref==="MI")out.push(Q("MINATO","The masked shinobi is the one he chose to kill."),N("Minato reads what came before and after it."),Q("MINATO","One death only matters if we understand when he decided on it."));
    else if(ref==="PS")out.push(Q("MINATO","The receiver is dead."),N("Minato's finger stops on the package line."),Q("MINATO","Don't merge that with whether he recovered the objective."));
    else out.push(Q("MINATO","The original target is the one who died."),N("Minato looks back to the first line of the assignment."),Q("MINATO","He began the night following that man and ended it deciding whether he lived."));
  }
  out.push(...minatoPackageCues(s,{lethal:true}));
  return out;
}
function nonlethalMinatoCues(s){
  const out=[N("The ANBU operative finishes the report."),...minatoPackageCues(s)];
  const states=Object.values(s.participants||{}).map(r=>r&&r.state);
  if(states.includes("ANBU_CUSTODY"))out.push(
    Q("MINATO","He brought someone back alive."),
    Q("ANBU OPERATIVE","Yes."),
    Q("MINATO","Because he couldn't finish the fight?"),
    Q("ANBU OPERATIVE","No."),
    Q("MINATO","Then custody was part of the decision.")
  );
  else if(states.includes("POLICE_CUSTODY"))out.push(
    Q("MINATO","He chose the Police instead of bringing them here."),
    Q("ANBU OPERATIVE","Yes."),
    N("Minato considers that."),
    Q("MINATO","He wanted the handoff outside ANBU. Record it that way.")
  );
  else if(states.includes("FIELD_SECURED_PENDING_COLLECTION"))out.push(
    Q("MINATO","He restrained them and kept moving."),
    Q("ANBU OPERATIVE","Yes."),
    Q("MINATO","Then he treated custody as something to manage, not something that ended the mission.")
  );
  else if(states.includes("RELEASED")){
    const released=states.filter(x=>x==="RELEASED").length;
    if(released>1)out.push(
      Q("MINATO","He had them under control and let them go."),
      Q("ANBU OPERATIVE","Yes."),
      Q("MINATO","Then that wasn't an escape. It was his decision.")
    );
    else out.push(
      Q("MINATO","He had control and chose release."),
      Q("ANBU OPERATIVE","Yes."),
      Q("MINATO",s.package.recovered||s.package.returned?"The objective was already secure.":"And the mission wasn't.")
    );
  }
  const clean=(s.resolvers.directPickpocket&&s.resolvers.directPickpocket.selectedOutcomeRef==="PICKPOCKET_DIRECT_SUCCESS")||(s.resolvers.improvedPickpocket&&s.resolvers.improvedPickpocket.selectedOutcomeRef==="PICKPOCKET_IMPROVED_SUCCESS");
  if(clean)out.push(
    Q("MINATO","No fight?"),
    Q("ANBU OPERATIVE","No."),
    Q("MINATO","And the package still came back."),
    Q("ANBU OPERATIVE","Yes."),
    N("A faint approval reaches Minato's expression."),
    Q("MINATO","Good. Not every successful mission needs to become a battle.")
  );
  if(s.knowledge.getCloserContingency)out.push(
    Q("MINATO","He stayed long enough to hear the contingency."),
    Q("ANBU OPERATIVE","Yes."),
    Q("MINATO","And reported the part they never said as unknown."),
    Q("ANBU OPERATIVE","Yes."),
    Q("MINATO","Good.")
  );
  if(s.knowledge.askWhere)out.push(
    Q("MINATO","He questioned the carrier before committing to the fight."),
    Q("ANBU OPERATIVE","Yes."),
    Q("MINATO","And learned where the carrier's knowledge ended."),
    Q("ANBU OPERATIVE","At the handoff."),
    N("Minato nods."),
    Q("MINATO","That's useful even without a destination.")
  );
  return out;
}
function minatoCues(){
  const s=state();const deaths=Object.values(s.participants||{}).filter(r=>r&&r.state==="DEAD").length;
  return deaths?lethalMinatoCues(s):nonlethalMinatoCues(s);
}
function firstActionReceipt(s){
  const labels={WATCH_THE_EXCHANGE:"WATCH THE EXCHANGE",MOVE_IN_CLOSER:"MOVE IN CLOSER",STRIKE_BEFORE_THE_HANDOFF:"STRIKE BEFORE THE HANDOFF",SLIP_IN_FOR_THE_PACKAGE:"SLIP IN FOR THE PACKAGE"};
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
  if(row.state==="DEAD")return`${name} — Killed by Kakashi after defeat.`;
  if(row.state==="FIELD_SECURED_PENDING_COLLECTION")return`${name} — Field-secured alive.`;
  if(row.state==="ANBU_CUSTODY")return`${name} — Transferred to ANBU custody.`;
  if(row.state==="POLICE_CUSTODY")return`${name} — Transferred to Uchiha Police custody.`;
  if(row.state==="RELEASED")return`${name} — Deliberately released.`;
  if(row.state==="BATTLE_DEFEATED")return`${name} — Defeated; left alive and unrestrained.`;
  if(row.state==="ESCAPED"){
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
  const dead=["MI","PS","AMT"].filter(ref=>s.participants[ref]&&s.participants[ref].state==="DEAD");
  if(dead.length)lines.push("","LETHAL HISTORY",...dead.map(ref=>participantReceiptLine(s,ref)),`Confirmed kills: ${dead.length}`,"Failed lethal attempts: 0");
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
addBeat("v2_scene01_rooftop",{backdrop:B.rooftop,location:"KONOHA ROOFTOP · NIGHT",objective:"Stop the package from falling into the wrong hands.",actors:["kakashi","anbu"],preset:"rooftop_2_person",transition:"wipe",onEnter:()=>mutate(()=>{}),cues:W("scene01","scene_01_exact"),nextBeatId:"v2_scene02_tail"});

addBeat("v2_scene02_tail",{mode:"choice",backdrop:B.alley,location:"KONOHA ALLEYWAY · NIGHT",objective:"Follow the target without being seen.",actors:["kakashi","amt"],preset:"tail",cues:W("scene02","scene_02_exact"),choices:[
 C("watch_exchange","WATCH THE EXCHANGE","v2_watch_exchange",{patch:()=>history("WATCH_THE_EXCHANGE")}),
 C("move_in_closer","MOVE IN CLOSER","v2_get_closer_resolver",{patch:()=>history("MOVE_IN_CLOSER")}),
 C("strike_before_handoff","STRIKE BEFORE THE HANDOFF","v2_direct_strike_setup",{patch:()=>history("STRIKE_BEFORE_THE_HANDOFF")}),
 C("slip_for_package","SLIP IN FOR THE PACKAGE","v2_direct_pickpocket_resolver",{patch:()=>history("SLIP_IN_FOR_THE_PACKAGE")})
]});

addBeat("v2_watch_exchange",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · MAIN STREET · NIGHT",objective:"Retrieve the package.",actors:["amt","ps","mi"],preset:"sakura_3_person",onEnter:()=>{packageState("PS");participant("MI",{state:"AVAILABLE"});return history("HANDOFF_COMPLETED");},cues:W("watch","scene_03a_exact"),choices:[
 C("stop_assassin","STOP THE ASSASSIN","v2_stop_assassin_setup",{patch:()=>history("STOP_THE_ASSASSIN")}),
 C("secure_package","SECURE THE PACKAGE","v2_secure_package_setup",{patch:()=>history("SECURE_THE_PACKAGE")}),
 C("secure_before_assassin","SECURE THE PACKAGE BEFORE THE ASSASSIN","v2_secure_before_resolver",{patch:()=>history("SECURE_PACKAGE_BEFORE_ASSASSIN")}),
 C("assassin_then_package","DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE","v2_assassin_then_package_setup",{patch:()=>history("DEFEAT_ASSASSIN_THEN_SECURE")}),
 C("go_original_target","GO AFTER THE ORIGINAL TARGET","v2_go_amt_pursuit_resolver",{patch:()=>history("GO_AFTER_ORIGINAL_TARGET")})
]});

// ---------------------------------------------------------------------------
// STOP THE ASSASSIN.
// ---------------------------------------------------------------------------
addBeat("v2_stop_assassin_setup",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"battle_pair",cues:W("stopAssassin","scene_04a_exact"),nextBeatId:"v2_battle_mi_stop"});

addBeat("v2_battle_mi_stop",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Defeat Masked Interceptor.",actors:["kakashi","mi"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_mi_1v1","mi_stop","v2_mi_stop_win","v2_mi_stop_loss","AK_SA_009")});

addBeat("v2_mi_stop_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:ctx=>captureBattle("mi_stop",ctx,s=>{s.participants.MI.state="ESCAPED";s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:W("stopLoss","scene_05a_l_exact"),nextBeatId:"v2_report"});

addBeat("v2_mi_stop_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"post_battle",onEnter:ctx=>captureBattle("mi_stop",ctx,s=>{s.participants.MI.state="BATTLE_DEFEATED";}),cues:({state:s})=>{
 const fast=battleActions("mi_stop")<=STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS;
 return fast?[N("Masked Interceptor hits the stone beneath the Sakura tree. Kakashi lands a few steps away and immediately looks past her."),N("Package Smuggler is crossing the far end of the street with the package still tucked against him."),N("Higher up, ANBU Marked Target flashes across a distant roofline—farther away, but not gone yet."),N("Kakashi has beaten the threat in front of him and bought himself one decision. He cannot take every trail at once.")]:
 [N("Kakashi searches the rooftops, the alleys and the next junction."),N("Nothing moves."),N("Package Smuggler had too much time; he and the package are gone, and ANBU Marked Target is gone as well."),N("There is no pursuit left to take. Only Masked Interceptor remains in front of Kakashi.")];
},choices:[
 C("mi_pursue_ps","GO AFTER PACKAGE SMUGGLER","v2_ps_pursuit_resolver",{available:()=>battleActions("mi_stop")<=STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS,patch:()=>history("PURSUE_PS_AFTER_MI")}),
 C("mi_kill","KILL HER","v2_report",{patch:()=>{dispose("MI","KILL");history("KILL_MI");}}),
 C("mi_anbu","TAKE HER BACK TO ANBU","v2_report",{patch:()=>{dispose("MI","ANBU");history("MI_TO_ANBU");}}),
 C("mi_police","TAKE HER TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>{dispose("MI","POLICE");history("MI_TO_POLICE");}}),
 C("mi_restrain","RESTRAIN HER AND CONTINUE","v2_mi_restrained_next",{available:()=>battleActions("mi_stop")<=STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS,patch:()=>{addField("MI");history("RESTRAIN_MI_CONTINUE");}})
]});
addBeat("v2_mi_restrained_next",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"post_battle",cues:[
 N("Kakashi looks toward the route the package took."),N("Then back to Masked Interceptor."),N("Going after it means leaving her here."),N("Leaving her free is not an option."),
 N("He reaches for the ninja wire at his side."),N("Masked Interceptor notices immediately."),Q("MASKED INTERCEPTOR","So you're still going after them."),Q("KAKASHI","Yes."),
 N("He moves before she can reposition."),N("The wire passes around her wrists, tightens, and folds her arms into a secure bind."),N("A second length fixes the restraint against the Sakura tree."),
 N("Kakashi checks the tension once more. Masked Interceptor follows the wire with her eyes, then looks back at him."),
 Q("MASKED INTERCEPTOR","You're leaving me tied to a tree."),Q("KAKASHI","I'm leaving you here while I finish what I started."),
 N("Something shifts behind the mask—not quite amusement, but close enough that Kakashi notices."),Q("MASKED INTERCEPTOR","That's a very confident use of the word finish."),
 N("Kakashi rises."),N("His eye moves toward the rooftops."),Q("KAKASHI","I'll let you know."),N("He leaves her beneath the Sakura tree.")
],choices:[
 C("restrained_mi_ps","GO AFTER PACKAGE SMUGGLER","v2_ps_pursuit_resolver",{patch:()=>history("PURSUE_PS_AFTER_RESTRAIN_MI")}),
]});

// PS pursuit after MI.
addBeat("v2_ps_pursuit_resolver",{mode:"choice",backdrop:B.sakura,location:"KONOHA · PURSUIT",objective:"Recover the package.",actors:["kakashi","ps"],preset:"pursuit",onEnter:()=>resolverEnter("psPursuit"),cues:[
 N("Kakashi moves before Package Smuggler disappears completely."),N("The Sakura tree drops behind him."),N("A turn."),N("A narrow street."),N("Another roofline."),
 N("Package Smuggler is already well ahead."),N("But Kakashi can still see him."),N("The package is tucked close against the man's side."),N("He is running hard now."),
 N("Not looking for somewhere to hide."),N("Looking for enough distance that he will not need to."),N("Kakashi increases his pace.")
],choices:[
 C("ps_pursuit_success","CONTINUE","v2_ps_pursuit_success",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_SUCCESS"}),
 C("ps_pursuit_failure","CONTINUE","v2_ps_pursuit_failure",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_FAILURE"})
]});
addBeat("v2_ps_pursuit_failure",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>mutate(s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[
 N("Kakashi clears the next junction."),N("Nothing."),N("He takes the roofline instead."),N("Still nothing."),N("The trail has stretched too far."),
 N("Package Smuggler is gone."),N("And the package has gone with him."),N("Whatever lead Kakashi had on ANBU Marked Target is gone with the time he spent here."),N("There is no second pursuit left to take.")
],nextBeatId:"v2_report"});
addBeat("v2_ps_pursuit_success",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:[
 N("Package Smuggler turns into the next street."),N("Kakashi lands ahead of him."),N("The man stops sharply."),N("His eyes go first to Kakashi."),N("Then back the way he came."),
 N("Masked Interceptor is not coming."),N("His grip tightens around the package."),Q("PACKAGE SMUGGLER","You should've stayed with the woman you put down."),
 Q("KAKASHI","That was what you were counting on. She bought you distance. She just didn't buy you enough."),N("Package Smuggler glances toward the nearest side street."),
 N("Kakashi shifts with him before he can commit to it."),Q("PACKAGE SMUGGLER","You don't even know what you're carrying."),
 Q("KAKASHI","Maybe not. But I know it was handed over in the middle of the night by a man ANBU sent me to follow. That's enough reason to take it back."),
 Q("PACKAGE SMUGGLER","You think taking it back fixes this?"),Q("KAKASHI","No. It fixes the part in your hands."),
 N("The man's free hand drops toward his weapon."),N("Kakashi's posture changes with it.")
],nextBeatId:"v2_battle_ps_seq"});
addBeat("v2_battle_ps_seq",{mode:"battle_transition",backdrop:B.fight,location:"KONOHA · PL BATTLE",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_seq_ps","ps_seq","v2_ps_seq_win","v2_ps_seq_loss","AK_SA_022")});
addBeat("v2_ps_seq_loss",{backdrop:B.fight,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_seq",ctx,s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[
 N("Package Smuggler finds the opening first."),N("Kakashi tries to close it."),N("Too late."),N("The man breaks past him."),
 N("The package goes with Package Smuggler."),N("By the time Kakashi can move after him again, the street ahead is empty.")
],nextBeatId:"v2_report"});
addBeat("v2_ps_seq_win",{mode:"choice",backdrop:B.fight,location:"KONOHA · NIGHT",objective:null,actors:["kakashi","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_seq",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[
 N("Package Smuggler goes down."),N("For a moment, Kakashi stays on him."),N("Makes sure he is not getting straight back up."),N("Then his attention moves."),N("To the package."),
 N("Package Smuggler is down."),N("Kakashi's eye goes to the package."),N("He takes it from the defeated man's reach, checks it once, and secures it against his body."),
 N("Only then does he look toward the route ANBU Marked Target took.")
],choices:[
 C("ps_go_amt","GO AFTER ANBU MARKED TARGET","v2_amt_after_ps",{available:()=>battleActions("ps_seq")<=3,patch:()=>history("PS_FAST_CONTINUE_AMT")}),
 C("ps_kill","KILL HIM","v2_report",{patch:()=>{dispose("PS","KILL");history("KILL_PS");}}),
 C("ps_restrain_continue","RESTRAIN HIM AND CONTINUE","v2_amt_after_ps",{available:()=>battleActions("ps_seq")<=3,patch:()=>{addField("PS");history("RESTRAIN_PS_CONTINUE");}}),
 C("ps_anbu","TAKE HIM BACK TO ANBU","v2_report",{patch:()=>{dispose("PS","ANBU");history("PS_TO_ANBU");}}),
 C("ps_police","TAKE HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>{dispose("PS","POLICE");history("PS_TO_POLICE");}}),
 C("ps_report","RETURN TO ANBU","v2_report",{patch:()=>history("RETURN_AFTER_PS")})
]});
addBeat("v2_amt_after_ps",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>{participant("AMT",{state:"AVAILABLE"});setPakkun(true);return history("PAKKUN_INTERCEPT_AFTER_PS");},cues:[
 N("Kakashi leaves Package Smuggler behind."),N("The recovered package is secured against him."),N("The other trail is thinner now."),N("Not gone."),
 N("He takes the roofs."),N("Cuts across a side street."),N("Drops to ground level again."),N("Movement ahead."),N("ANBU Marked Target."),N("Still running."),N("Kakashi closes."),
 N("The man reaches the next street and stops short. A small ninken is already standing in the route ahead, looking past him toward Kakashi."),
 Q("PAKKUN","This yours?"),N("Kakashi slows beside the far end of the street."),N("His eye stays on ANBU Marked Target."),Q("KAKASHI","Apparently."),
 N("ANBU Marked Target looks between them."),N("Then at the package secured against Kakashi."),Q("ANBU MARKED TARGET","You recovered it."),Q("KAKASHI","I did."),
 N("His eyes return to the man in front of him."),Q("KAKASHI","And you're still coming back with me."),
 Q("ANBU MARKED TARGET","You think carrying that package means you understand what happened?"),
 Q("KAKASHI","No. It means I recovered what I was sent to recover. You're a separate problem."),
 N("Pakkun shifts off the centreline without waiting for an instruction."),
 Q("ANBU MARKED TARGET","And what exactly are you planning to do with me?"),N("Kakashi watches his stance."),
 Q("KAKASHI","That depends on how difficult you make the next few seconds.")
],nextBeatId:"v2_battle_amt_seq_pakkun"});
addBeat("v2_battle_amt_seq_pakkun",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_seq_amt_pakkun","amt_seq","v2_amt_seq_win","v2_amt_seq_loss","AK_SA_022")});
addBeat("v2_amt_seq_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_seq",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:[
 N("ANBU Marked Target finds the opening first."),N("Kakashi loses the fight."),N("He does not lose the package with it."),
 N("The recovered objective was secured before this confrontation began."),N("ANBU Marked Target looks once toward it."),N("Then toward the route out."),N("He chooses distance."),
 N("By the time Kakashi can force himself back into the pursuit, the man is gone."),N("Pakkun remains nearby."),N("Quiet for once."),
 Q("PAKKUN","You kept the important part."),N("Kakashi looks down at the package."),Q("KAKASHI","I lost him."),Q("PAKKUN","I noticed."),
 N("A beat."),N("Pakkun's voice is drier when he continues."),Q("PAKKUN","Both things can be true.")
],nextBeatId:"v2_report"});
addBeat("v2_amt_seq_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_seq",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:[N("ANBU Marked Target hits the ground hard enough to stay there."),N("Kakashi does not immediately move away."),N("Neither does Pakkun."),N("The man does not."),N("Not yet.")],choices:[
 C("amt_seq_police","BRING HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>{dispose("AMT","POLICE");history("AMT_TO_POLICE");}}),
 C("amt_seq_release","LET HIM GO","v2_report",{patch:()=>{dispose("AMT","RELEASE");history("RELEASE_AMT");}}),
 C("amt_seq_kill","KILL HIM","v2_report",{patch:()=>{dispose("AMT","KILL");history("KILL_AMT");}}),
 C("amt_seq_anbu","TAKE HIM BACK TO THE ANBU","v2_report",{patch:()=>{dispose("AMT","ANBU");history("AMT_TO_ANBU");}}),
 C("amt_seq_collect","RESTRAIN HIM AND COLLECT THE OTHERS","v2_group_collect",{available:()=>state().fieldSecured.length>0,patch:()=>{addField("AMT");history("COLLECT_ALL_FIELD_SECURED");}})
]});
function groupCollectActorKeys(){
 const s=state(),keys=["kakashi"];
 if(s&&s.fieldSecured.includes("MI"))keys.push("mi");
 if(s&&s.fieldSecured.includes("PS"))keys.push("ps");
 keys.push("amt");
 if(s&&s.pakkun.present)keys.push("pakkun");
 return keys;
}
function groupCollectCues(){
 const s=state(),out=[
  N("ANBU Marked Target remains on the ground."),N("Kakashi looks back the way they came."),N("There are still people waiting behind him."),N("Pakkun follows his eye."),
  Q("PAKKUN","We're going back."),Q("KAKASHI","I left prisoners behind."),Q("PAKKUN","I noticed."),N("Kakashi draws out the ninja wire."),
  N("ANBU Marked Target sees it."),Q("ANBU MARKED TARGET","You've been doing this all night?"),N("Kakashi secures his wrists."),Q("KAKASHI","More than I expected."),
  N("Pakkun gives the wire a look."),Q("PAKKUN","You're going to need more of that."),N("Kakashi checks what remains."),Q("KAKASHI","I know."),
  N("Pakkun starts down the street."),Q("PAKKUN","Good. I wasn't offering mine."),N("Kakashi looks at him."),N("Pakkun keeps walking.")
 ];
 if(s&&s.fieldSecured.includes("PS"))out.push(
  N("Package Smuggler is exactly where Kakashi left him."),N("His eyes move first to Kakashi."),N("Then to ANBU Marked Target under restraint."),N("Then to Pakkun."),
  Q("PACKAGE SMUGGLER","You actually came back."),Q("KAKASHI","I said I would."),N("Package Smuggler looks at ANBU Marked Target."),Q("PACKAGE SMUGGLER","And you brought company."),
  Q("ANBU MARKED TARGET","Don't."),Q("PACKAGE SMUGGLER","I haven't said anything yet."),Q("ANBU MARKED TARGET","That was the warning."),
  N("Pakkun looks between them."),Q("PAKKUN","This is going well."),N("Kakashi releases Package Smuggler from the fixed anchor without removing his restraints."),
  N("He brings him into the escort."),Q("PACKAGE SMUGGLER","I'm starting to miss the tree."),Q("KAKASHI","You weren't at the tree."),
  N("Package Smuggler looks at him."),Q("PACKAGE SMUGGLER","You know what I mean.")
 );
 if(s&&s.fieldSecured.includes("MI"))out.push(
  N("Masked Interceptor is still beneath the Sakura tree."),N("Her attention settles on Kakashi first."),N("Then the restrained people with him."),
  ...(s.fieldSecured.includes("PS")?[N("Package Smuggler, if present, notices the look."),Q("PACKAGE SMUGGLER","Don't."),N("Masked Interceptor says nothing."),Q("PACKAGE SMUGGLER","You were going to say something."),Q("MASKED INTERCEPTOR","I didn't need to."),N("Pakkun gives Package Smuggler a brief look."),Q("PAKKUN","She really didn't.")]:[]),
  N("Kakashi removes the line fixing Masked Interceptor to the tree."),N("The restraint around her remains."),N("She joins the escort."),N("Her eyes move to Kakashi."),
  Q("MASKED INTERCEPTOR","You got all the way back."),Q("KAKASHI","I said I would."),Q("MASKED INTERCEPTOR","No."),N("She looks over the group."),
  Q("MASKED INTERCEPTOR","You said you'd finish what you started."),N("A moment."),Q("MASKED INTERCEPTOR","This is certainly one interpretation."),
  N("Kakashi starts walking."),Q("KAKASHI","Keep moving."),N("This time the faint amusement behind her mask is obvious.")
 );
 return out;
}
addBeat("v2_group_collect",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · COLLECTION",objective:"Transfer the restrained participants.",actors:()=>groupCollectActorKeys(),preset:"escort",cues:()=>groupCollectCues(),choices:[
 C("group_all_anbu","TAKE THEM ALL BACK TO ANBU","v2_report",{patch:()=>{disposeGroup("ANBU",["MI","PS","AMT"].filter(r=>state().fieldSecured.includes(r)));history("GROUP_TO_ANBU");}}),
 C("group_all_police","TAKE THEM ALL TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>{disposeGroup("POLICE",["MI","PS","AMT"].filter(r=>state().fieldSecured.includes(r)));history("GROUP_TO_POLICE");}})
]});

// Direct AMT pursuit after MI.
addBeat("v2_amt_direct_pursuit_fail",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>mutate(s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";}),cues:W("originalTarget","2_pursuit_failure"),nextBeatId:"v2_report"});
addBeat("v2_amt_direct_intercept",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:W("originalTarget","3_pursuit_success_pakkun_corners_amt"),nextBeatId:"v2_battle_amt_direct_pakkun"});
addBeat("v2_battle_amt_direct_pakkun",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Secure ANBU Marked Target.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","amt_direct","v2_amt_missing_win","v2_amt_missing_loss","AK_SA_021")});
addBeat("v2_amt_missing_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_direct",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:W("originalTarget","5_amt_defeats_kakashi_pakkun"),nextBeatId:"v2_report"});
addBeat("v2_amt_missing_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_direct",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:W("originalTarget","6_kakashi_pakkun_defeat_amt"),choices:[
 C("amt_missing_kill","KILL HIM","v2_report",{patch:()=>dispose("AMT","KILL")}),
 C("amt_missing_restrain","RESTRAIN HIM","v2_report",{patch:()=>addField("AMT")}),
 C("amt_missing_anbu","BRING HIM TO THE ANBU","v2_report",{patch:()=>dispose("AMT","ANBU")}),
 C("amt_missing_police","TAKE HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("AMT","POLICE")})
]});

// ---------------------------------------------------------------------------
// SECURE THE PACKAGE.
// ---------------------------------------------------------------------------
addBeat("v2_secure_package_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","ps","mi"],preset:"sakura_3_person",cues:W("securePackage","1_secure_the_package"),nextBeatId:"v2_battle_ps_mi"});
addBeat("v2_battle_ps_mi",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Retrieve the package.",actors:["kakashi","ps","mi"],preset:"battle_trio",cues:[N("Kakashi Hatake vs Package Smuggler + Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_ps_mi_2v1","ps_mi","v2_ps_mi_win","v2_ps_mi_loss","AK_SA_014")});
addBeat("v2_ps_mi_loss",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:ctx=>captureBattle("ps_mi",ctx,s=>{s.participants.PS.state="ESCAPED";s.participants.MI.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:W("securePackage","3_kakashi_loses_the_2_v_1"),nextBeatId:"v2_report"});
addBeat("v2_ps_mi_win",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","ps","mi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_mi",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";s.participants.MI.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:W("securePackage","4_kakashi_wins_the_2_v_1"),choices:[
 C("secure_stay_first","STAY ON THE FIRST MAN","v2_secure_amt_pursuit_resolver",{patch:()=>history("SECURE_PACKAGE_STAY_FIRST")}),
 C("secure_return","RETURN AND REPORT","v2_report",{patch:()=>history("SECURE_PACKAGE_RETURN_REPORT")})
]});
addBeat("v2_secure_amt_pursuit_resolver",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch the first man.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>resolverEnter("secureAmtPursuit"),cues:[
 N("Kakashi leaves the two defeated shinobi behind."),N("Not because they no longer matter."),N("Because the first man is still moving."),N("The package is secure now."),
 N("That changes the calculation."),N("Kakashi can chase without wondering whether every step is taking him farther from the objective."),
 N("He takes the rooftops."),N("The trail is thinner than it was before the fight."),N("Still there."),N("For now.")
],choices:[
 C("secure_amt_success","CONTINUE","v2_secure_amt_intercept",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_SUCCESS"}),
 C("secure_amt_fail","CONTINUE","v2_secure_amt_fail",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_FAILURE"})
]});
addBeat("v2_secure_amt_fail",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>participant("AMT",{state:"ESCAPED"}),cues:[
 N("Kakashi clears another rooftop."),N("Nothing."),N("He drops to street level."),N("Checks the crossing."),N("The route has split too many times."),
 N("Whatever lead remained after the fight is gone."),N("He stops chasing before guesswork becomes a substitute for a trail."),
 N("The package is still secured against him."),N("The first man is gone."),N("Those facts can both be true.")
],nextBeatId:"v2_report"});
addBeat("v2_secure_amt_intercept",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:[N("ANBU Marked Target cuts into the next alley."),N("Then stops."),N("A small ninken is sitting in the route ahead of him."),N("Kakashi lands behind."),Q("PAKKUN","This yours?"),Q("KAKASHI","Apparently."),Q("ANBU MARKED TARGET","You got it back."),Q("KAKASHI","I did."),Q("ANBU MARKED TARGET","Then why are you still following me?"),Q("KAKASHI","You're the part I haven't finished."),Q("PAKKUN","He's thinking about running."),Q("KAKASHI","I know."),Q("ANBU MARKED TARGET","You two always this irritating?"),Q("PAKKUN","We just met.")],nextBeatId:"v2_battle_secure_amt"});
addBeat("v2_battle_secure_amt",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","secure_amt","v2_secure_amt_win","v2_secure_amt_loss","AK_SA_025")});
addBeat("v2_secure_amt_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("secure_amt",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:[N("ANBU Marked Target finds the opening first."),N("Kakashi loses the fight."),N("He does not lose the package with it."),Q("PAKKUN","You kept the important part."),Q("KAKASHI","I lost him."),Q("PAKKUN","I noticed."),Q("PAKKUN","Both things can be true.")],nextBeatId:"v2_report"});
addBeat("v2_secure_amt_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("secure_amt",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:[
 N("ANBU Marked Target goes down."),N("Kakashi stays on him until the fight is unquestionably over."),N("Pakkun stays where he can see both of them."),
 N("The package remains secure."),N("The man does not."),N("Not yet.")
],choices:[
 C("secure_amt_police","BRING HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("AMT","POLICE")}),
 C("secure_amt_release","LET HIM GO","v2_report",{patch:()=>dispose("AMT","RELEASE")}),
 C("secure_amt_kill","KILL HIM","v2_report",{patch:()=>dispose("AMT","KILL")}),
 C("secure_amt_anbu","TAKE HIM BACK TO THE ANBU","v2_report",{patch:()=>dispose("AMT","ANBU")})
]});

// Secure before assassin resolver.
addBeat("v2_secure_before_resolver",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","ps","mi"],preset:"sakura_3_person",onEnter:()=>resolverEnter("secureBefore"),cues:W("secureBeforeAssassin","1_secure_the_package_before_the_assassin"),choices:[
 C("secure_before_success","CONTINUE","v2_secure_before_success",{available:()=>getOutcome("secureBefore")==="SECURE_BEFORE_SUCCESS"}),
 C("secure_before_failure","CONTINUE","v2_secure_package_setup",{available:()=>getOutcome("secureBefore")==="SECURE_BEFORE_FAILURE"})
]});
addBeat("v2_secure_before_success",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:()=>mutate(s=>{s.package.holder="KAKASHI";s.package.recovered=true;s.participants.AMT.state="ESCAPED";s.participants.PS.state="AVAILABLE";s.participants.MI.state="AVAILABLE";}),cues:W("secureBeforeAssassin","2_resolver_success_clean_extraction"),nextBeatId:"v2_report"});

// Assassin then package reuses sequential chain, but records intent.
addBeat("v2_assassin_then_package_setup",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Retrieve the package.",actors:["kakashi","mi"],preset:"battle_pair",onEnter:()=>history("ASSASSIN_THEN_PACKAGE_SEQUENCE"),cues:W("assassinThenPackage","1_entry_deal_with_her_first"),nextBeatId:"v2_battle_mi_package_second"});
addBeat("v2_battle_mi_package_second",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Defeat Masked Interceptor.",actors:["kakashi","mi"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_seq_mi","mi_package_second","v2_mi_package_second_win","v2_mi_package_second_loss","AK_SA_015")});
addBeat("v2_mi_package_second_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("mi_package_second",ctx,s=>{s.participants.MI.state="AVAILABLE";s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:W("assassinThenPackage","2_mi_battle_defeat"),nextBeatId:"v2_report"});
addBeat("v2_mi_package_second_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Catch the package.",actors:["kakashi","mi"],preset:"post_battle",onEnter:ctx=>captureBattle("mi_package_second",ctx,s=>{s.participants.MI.state="BATTLE_DEFEATED";}),cues:()=>battleActions("mi_package_second")<=4?[N("Masked Interceptor goes down quickly enough that the next problem is still audible."),N("Footsteps."),N("Fading."),N("Not gone."),N("Kakashi looks once at the masked woman."),N("His attention snaps back to the package route."),N("Package Smuggler has a lead."),N("Not an insurmountable one.")]:[N("Masked Interceptor goes down."),N("Too late."),N("Kakashi listens toward the route Package Smuggler took."),N("Nothing."),N("Package Smuggler has had too much time."),N("Winning here does not pull him back into reach.")],choices:[
 C("package_second_chase_ps","CHASE THE PACKAGE SMUGGLER","v2_package_second_ps_pursuit",{available:()=>battleActions("mi_package_second")<=4,patch:()=>history("PACKAGE_SECOND_CHASE_PS")}),
 C("package_second_report","RETURN TO ANBU","v2_report",{available:()=>battleActions("mi_package_second")>4,patch:()=>{participant("PS",{state:"ESCAPED"});participant("AMT",{state:"ESCAPED"});history("PACKAGE_SECOND_TOO_SLOW");}})
]});
addBeat("v2_package_second_ps_pursuit",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch the package.",actors:["kakashi","ps"],preset:"pursuit",onEnter:()=>resolverEnter("psPursuit"),cues:[N("Masked Interceptor goes down quickly enough that the next problem is still audible."),N("Footsteps."),N("Fading."),N("Not gone."),N("Kakashi looks once at the masked woman."),N("His attention snaps back to the package route."),N("Package Smuggler has a lead."),N("Not an insurmountable one."),N("Kakashi moves.")],choices:[
 C("package_second_ps_reached","CONTINUE","v2_package_second_ps_reached",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_SUCCESS"}),
 C("package_second_ps_lost","CONTINUE","v2_package_second_ps_lost",{available:()=>getOutcome("psPursuit")==="PS_PURSUIT_FAILURE"})
]});
addBeat("v2_package_second_ps_lost",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"pursuit",onEnter:()=>mutate(s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:W("assassinThenPackage","5_ps_catch_up_failure"),nextBeatId:"v2_report"});
addBeat("v2_package_second_ps_reached",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:W("assassinThenPackage","6_ps_catch_up_success"),nextBeatId:"v2_battle_ps_package_second"});
addBeat("v2_battle_ps_package_second",{mode:"battle_transition",backdrop:B.alleyAlt,location:"KONOHA · PL BATTLE",objective:"Recover the package.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_seq_ps","ps_package_second","v2_ps_package_second_win","v2_ps_package_second_loss","AK_SA_015")});
addBeat("v2_ps_package_second_loss",{backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_package_second",ctx,s=>{s.participants.PS.state="ESCAPED";s.participants.AMT.state="ESCAPED";s.package.holder="PS";}),cues:[N("Package Smuggler gets through him."),N("The package stays with him."),N("Kakashi has fought twice for the same objective tonight."),N("The second loss closes what little trail remained.")],nextBeatId:"v2_report"});
addBeat("v2_ps_package_second_win",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · NIGHT",objective:null,actors:["kakashi","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_package_second",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[
 N("Package Smuggler goes down."),N("Kakashi stays on him long enough to know the fight is finished."),N("Then his attention moves to the objective."),
 N("He takes the package from the defeated man's reach."),N("Checks the seal."),N("Secures it against himself."),N("Only then does he look farther down the route.")
],choices:[
 C("package_second_stay_amt","STAY ON THE FIRST MAN","v2_package_second_amt_pursuit",{available:()=>battleActions("ps_package_second")<=3,patch:()=>history("PACKAGE_SECOND_STAY_AMT")}),
 C("package_second_return","RETURN AND REPORT","v2_report",{patch:()=>history("PACKAGE_SECOND_RETURN_REPORT")})
]});
addBeat("v2_package_second_amt_pursuit",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch the first man.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>resolverEnter("secureAmtPursuit"),cues:[N("Kakashi leaves Package Smuggler behind."),N("The package is secured."),N("The first man's trail is thin."),N("Still usable."),N("Kakashi takes it.")],choices:[
 C("package_second_amt_success","CONTINUE","v2_package_second_amt_intercept",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_SUCCESS"}),
 C("package_second_amt_failure","CONTINUE","v2_secure_amt_fail",{available:()=>getOutcome("secureAmtPursuit")==="SECURE_AMT_PURSUIT_FAILURE"})
]});
addBeat("v2_package_second_amt_intercept",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:[
 N("ANBU Marked Target cuts into the next alley."),N("Then stops."),N("A small ninken is sitting in the route ahead of him."),N("The man looks at it."),N("The ninken looks past him."),
 N("Kakashi lands behind."),N("Pakkun's ears lift."),Q("PAKKUN","This yours?"),N("Kakashi keeps his eye on the man between them."),Q("KAKASHI","Apparently."),
 N("ANBU Marked Target notices the package secured against Kakashi."),Q("ANBU MARKED TARGET","You got it back."),Q("KAKASHI","I did."),
 Q("ANBU MARKED TARGET","Then why are you still following me?"),N("Kakashi shifts his stance."),Q("KAKASHI","You were the first man in the exchange."),
 Q("ANBU MARKED TARGET","And that matters more than finishing the assignment?"),Q("KAKASHI","The assignment is here."),N("Kakashi touches the package once."),N("Then looks back at him."),
 Q("KAKASHI","You're the part I haven't finished."),N("Pakkun rises."),N("ANBU Marked Target glances toward the alley mouth."),N("Pakkun notices."),
 Q("PAKKUN","He's thinking about running."),Q("KAKASHI","I know."),Q("ANBU MARKED TARGET","You two always this irritating?"),N("Pakkun gives him a flat look."),Q("PAKKUN","We just met.")
],nextBeatId:"v2_battle_amt_package_second"});
addBeat("v2_battle_amt_package_second",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Catch the first man.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_seq_amt_pakkun","amt_package_second","v2_amt_package_second_win","v2_amt_package_second_loss","AK_SA_015")});
addBeat("v2_amt_package_second_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_package_second",ctx,s=>{s.participants.AMT.state="ESCAPED";}),cues:[
 N("ANBU Marked Target finds the opening first."),N("Kakashi loses the fight."),N("He does not lose the package with it."),
 N("The recovered objective was secured before this confrontation began."),N("ANBU Marked Target looks once toward it."),N("Then toward the route out."),N("He chooses distance."),
 N("By the time Kakashi can force himself back into the pursuit, the man is gone."),N("Pakkun remains nearby."),N("Quiet for once."),
 Q("PAKKUN","You kept the important part."),N("Kakashi looks down at the package."),Q("KAKASHI","I lost him."),Q("PAKKUN","I noticed."),
 N("A beat."),N("Pakkun's voice is drier when he continues."),Q("PAKKUN","Both things can be true.")
],nextBeatId:"v2_report"});
addBeat("v2_amt_package_second_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("amt_package_second",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";}),cues:[
 N("ANBU Marked Target goes down."),N("Kakashi stays on him until the fight is unquestionably over."),N("Pakkun stays where he can see both of them."),
 N("The package remains secure."),N("The man does not."),N("Not yet.")
],choices:[
 C("package_second_amt_police","BRING HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("AMT","POLICE")}),
 C("package_second_amt_release","LET HIM GO","v2_report",{patch:()=>dispose("AMT","RELEASE")}),
 C("package_second_amt_kill","KILL HIM","v2_report",{patch:()=>dispose("AMT","KILL")}),
 C("package_second_amt_anbu","TAKE HIM BACK TO THE ANBU","v2_report",{patch:()=>dispose("AMT","ANBU")})
]});

// ---------------------------------------------------------------------------
// GO AFTER ORIGINAL TARGET from WATCH.
// ---------------------------------------------------------------------------
addBeat("v2_go_amt_pursuit_resolver",{mode:"choice",backdrop:B.alleyAlt,location:"KONOHA · PURSUIT",objective:"Catch ANBU Marked Target.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>{participant("PS",{state:"ESCAPED"});return resolverEnter("amtPursuitRoot");},cues:W("originalTarget","1_go_after_the_original_target"),choices:[
 C("go_amt_success","CONTINUE","v2_amt_direct_intercept",{available:()=>getOutcome("amtPursuitRoot")==="AMT_PURSUIT_SUCCESS"}),
 C("go_amt_failure","CONTINUE","v2_amt_direct_pursuit_fail",{available:()=>getOutcome("amtPursuitRoot")==="AMT_PURSUIT_FAILURE"})
]});

// ---------------------------------------------------------------------------
// MOVE IN CLOSER.
// ---------------------------------------------------------------------------
addBeat("v2_get_closer_resolver",{mode:"choice",backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Learn more without exposing yourself.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>resolverEnter("getCloser"),cues:[N("The Sakura tree is still some distance ahead."),N("From deeper in the alley, Kakashi can see the meeting."),N("He cannot hear enough of it."),N("That is the problem."),N("Kakashi leaves the safer distance behind."),N("He stays low in the darker side of the alley, where lantern light does not quite reach the walls."),N("Wet stone catches everything else — moonlight, windows, the warm glow beyond the alley mouth."),N("He avoids all of it."),N("One doorway."),N("Then another."),N("Closer."),N("The Sakura tree grows larger beyond the entrance."),N("So do the voices.")],choices:[
 C("closer_success","CONTINUE","v2_get_closer_success",{available:()=>getOutcome("getCloser")==="GET_CLOSER_SUCCESS"}),
 C("closer_failure","CONTINUE","v2_get_closer_failure",{available:()=>getOutcome("getCloser")==="GET_CLOSER_FAILURE"})
]});
addBeat("v2_get_closer_success",{mode:"choice",backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Choose what to do with the handoff.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>mutate(s=>{s.knowledge.getCloserContingency=true;}),cues:[
 N("Neither man looks toward Kakashi."),N("Good."),N("He settles into the shadow near the end of the alley."),N("Close enough now."),
 N("ANBU Marked Target keeps one hand against the package beneath his clothing."),N("Package Smuggler stands opposite him."),N("No hurry in either man's posture."),N("Too little hurry, considering what they are doing."),
 N("Then Kakashi hears them clearly."),Q("ANBU MARKED TARGET","You said once I hand it over, I'm done."),N("Package Smuggler barely looks at him."),Q("PACKAGE SMUGGLER","You are."),
 N("The target does not seem reassured."),N("His eyes flick toward the main street."),Q("ANBU MARKED TARGET","And if somebody followed me?"),
 N("Package Smuggler's expression changes."),N("Not fear."),N("Annoyance."),Q("PACKAGE SMUGGLER","Then you keep walking."),N("A pause."),N("The target's hand remains over the package."),
 Q("ANBU MARKED TARGET","With it?"),N("Now Package Smuggler looks at him."),Q("PACKAGE SMUGGLER","Until I say otherwise."),N("The answer bothers him."),N("Kakashi can tell from the way his fingers tighten against the cloth."),
 Q("ANBU MARKED TARGET","That wasn't the plan."),N("Package Smuggler glances once along the street."),N("Not toward Kakashi."),N("Just checking."),Q("PACKAGE SMUGGLER","Plans are for empty streets."),
 N("The target's mouth tightens."),Q("ANBU MARKED TARGET","And if the street is empty?"),N("Package Smuggler holds out his hand."),Q("PACKAGE SMUGGLER","Then I take it."),
 N("His fingers remain open between them."),Q("PACKAGE SMUGGLER","And you disappear."),N("The target looks at the waiting hand."),Q("ANBU MARKED TARGET","Where does it go after you?"),
 N("Package Smuggler's expression almost becomes a smile."),N("Almost."),Q("PACKAGE SMUGGLER","Away from you."),N("Kakashi's eye narrows."),
 N("That was more useful than anything either of them had said from a distance."),N("The arrangement is clearer now."),N("If the handoff happens, ANBU Marked Target walks away."),
 N("Package Smuggler leaves with the objective."),N("If they believe somebody is following them, the handoff does not happen at all."),N("Kakashi has moved closer without changing the scene."),
 N("For now."),N("Package Smuggler's hand is still waiting."),N("ANBU Marked Target begins to move his own."),N("The decision has become smaller."),N("And more immediate.")
],choices:[
 C("closer_handoff","LET THE HANDOFF HAPPEN","v2_closer_handoff",{patch:()=>history("CLOSER_LET_HANDOFF")}),
 C("closer_strike","STRIKE BEFORE THE HANDOFF","v2_direct_strike_setup",{patch:()=>history("CLOSER_STRIKE")}),
 C("closer_pick","ATTEMPT THE PICKPOCKET","v2_improved_pickpocket_resolver",{patch:()=>history("CLOSER_PICKPOCKET")})
]});
addBeat("v2_closer_handoff",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · MAIN STREET · NIGHT",objective:"Retrieve the package.",actors:["amt","ps","mi"],preset:"sakura_3_person",onEnter:()=>{packageState("PS");participant("MI",{state:"AVAILABLE"});return history("CLOSER_HANDOFF_COMPLETED");},cues:W("getCloserDownstream","3_success_let_the_handoff_happen"),choices:[
 C("closer_watch_stop","STOP THE ASSASSIN","v2_stop_assassin_setup",{patch:()=>history("STOP_THE_ASSASSIN_AFTER_CLOSER")}),
 C("closer_watch_secure","SECURE THE PACKAGE","v2_secure_package_setup",{patch:()=>history("SECURE_PACKAGE_AFTER_CLOSER")}),
 C("closer_watch_before","SECURE THE PACKAGE BEFORE THE ASSASSIN","v2_secure_before_resolver",{patch:()=>history("SECURE_BEFORE_AFTER_CLOSER")}),
 C("closer_watch_sequence","DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE","v2_assassin_then_package_setup",{patch:()=>history("ASSASSIN_THEN_PACKAGE_AFTER_CLOSER")}),
 C("closer_watch_amt","GO AFTER THE ORIGINAL TARGET","v2_go_amt_pursuit_resolver",{patch:()=>history("GO_ORIGINAL_AFTER_CLOSER")})
]});

addBeat("v2_get_closer_failure",{mode:"choice",backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Stop the package from escaping.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>mutate(s=>{s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:[
 N("The Sakura tree is still some distance ahead."),N("Kakashi can see the meeting."),N("He cannot hear enough of it."),N("He starts forward."),N("Quietly."),
 N("The darker side of the alley gives him more cover than the lantern-lit street ahead. He slips past one doorway, then another, keeping the two men framed between the buildings."),
 N("Closer."),N("The voices begin to carry."),N("Kakashi catches the beginning of the conversation."),
 Q("ANBU MARKED TARGET","You said once I hand it over, I'm done."),Q("PACKAGE SMUGGLER","You are."),N("The target looks toward the main street."),
 Q("ANBU MARKED TARGET","And if somebody followed me?"),Q("PACKAGE SMUGGLER","Then you keep walking."),N("The target frowns."),Q("ANBU MARKED TARGET","With it?"),
 N("Package Smuggler does not answer."),N("His eyes have moved."),N("Not toward Kakashi."),N("Down."),N("A thin pool of rainwater lies along the edge of the street."),
 N("Lantern light trembles across it."),N("So does something else."),N("Movement where the reflected alley should have been empty."),N("Package Smuggler's hand rises."),N("Not for the package."),N("A warning."),
 Q("PACKAGE SMUGGLER","Hold it."),N("ANBU Marked Target freezes."),N("His hand never leaves his clothing."),N("The package remains with him."),Q("ANBU MARKED TARGET","What?"),
 N("Package Smuggler keeps staring into the alley."),N("Kakashi does not move."),N("Too late."),N("The man's posture has already changed."),Q("PACKAGE SMUGGLER","Someone's close."),
 N("The target finally starts to turn."),Q("PACKAGE SMUGGLER","Don't."),N("He stops."),N("Package Smuggler's voice hardens."),Q("PACKAGE SMUGGLER","Keep it."),N("A beat."),
 Q("PACKAGE SMUGGLER","Main street. Go."),N("ANBU Marked Target does not argue this time."),N("He moves."),N("Fast."),N("Toward the Sakura tree and the open street beyond it."),
 N("The package goes with him."),N("Package Smuggler stays behind."),N("For one second he watches the target leave."),N("Then he turns toward the alley."),N("Toward Kakashi."),
 N("Not his exact hiding place."),N("Not yet."),N("But close enough that the difference will not last."),N("Kakashi's eye shifts past him."),N("ANBU Marked Target is already gaining distance."),
 N("The package is still secure beneath his clothing."),N("Package Smuggler is walking toward the person who ruined the handoff."),N("Kakashi wanted more information."),N("He got some."),
 N("He also changed the scene."),N("Now he has to decide which consequence matters more.")
],choices:[
 C("failure_stay","STAY ON THE PACKAGE","v2_stay_package_pursuit_resolver",{patch:()=>history("STAY_ON_PACKAGE")}),
 C("failure_stop_ps","STOP PACKAGE SMUGGLER","v2_stop_ps_setup",{patch:()=>history("STOP_PACKAGE_SMUGGLER")}),
 C("failure_cutoff","CUT THEM OFF AT THE SAKURA TREE","v2_cutoff_setup",{patch:()=>history("CUT_OFF_SAKURA")})
]});

addBeat("v2_stay_package_pursuit_resolver",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · PURSUIT",objective:"Catch ANBU Marked Target.",actors:["kakashi","amt"],preset:"pursuit",onEnter:()=>resolverEnter("stayPackagePursuit"),cues:[
 N("Package Smuggler is coming toward the alley."),N("ANBU Marked Target is going the other way."),N("The package goes with him."),N("Kakashi doesn't need longer than that."),N("He moves."),
 N("Package Smuggler catches the motion at the edge of the alley."),N("His head snaps around."),N("There."),N("For the first time, he actually sees the person who spoiled the exchange."),
 N("For half a heartbeat, surprise shows."),N("Kakashi is younger than he expected."),N("It lasts half a heartbeat."),Q("PACKAGE SMUGGLER","There!"),
 N("ANBU Marked Target looks back."),N("His expression changes when he sees Kakashi burst into the open."),Q("ANBU MARKED TARGET","A kid?"),N("Kakashi doesn't answer."),
 N("He runs straight past Package Smuggler."),N("The man reaches for him."),N("Too slow."),N("Kakashi slips outside the grab and keeps moving."),Q("PACKAGE SMUGGLER","Don't stop!"),
 N("The target is already crossing toward the Sakura tree."),N("He shouts without looking back."),Q("ANBU MARKED TARGET","You said I was done!"),N("Package Smuggler's answer follows him across the street."),
 Q("PACKAGE SMUGGLER","Not while you're holding it!"),N("That lands."),N("Kakashi's eye sharpens."),N("Another piece of the arrangement."),N("The man ahead had not been meant to keep the package."),N("Now he had no choice."),
 N("The alley falls away behind Kakashi."),N("The Sakura tree fills the square ahead."),N("Lantern light catches wet stone beneath it. Petals move through the glow as ANBU Marked Target cuts across the open space."),
 N("Kakashi follows."),N("The target glances back again."),N("This time he sees how quickly the distance is shrinking."),N("He swears under his breath."),Q("ANBU MARKED TARGET","What do you want?"),
 N("Kakashi's answer is immediate."),Q("KAKASHI","The package."),N("The target gives a short, breathless laugh."),N("No humour in it."),Q("ANBU MARKED TARGET","Of course."),
 N("His hand presses against it beneath his clothing."),N("Still there."),N("Still his."),N("He changes direction around the Sakura tree."),N("Kakashi watches the turn."),N("Not the man."),N("The route."),
 N("There are three ways out of the square."),N("The target chooses one."),N("Kakashi starts cutting toward another."),N("He isn't trying to run faster anymore."),N("He's trying to arrive first.")
],choices:[
 C("stay_success","CONTINUE","v2_stay_package_intercept",{available:()=>getOutcome("stayPackagePursuit")==="STAY_PACKAGE_PURSUIT_SUCCESS"}),
 C("stay_failure","CONTINUE","v2_stay_package_failure",{available:()=>getOutcome("stayPackagePursuit")==="STAY_PACKAGE_PURSUIT_FAILURE"})
]});
addBeat("v2_stay_package_failure",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:()=>mutate(s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";}),cues:[
 N("Kakashi cuts inside the target's route."),N("For several seconds the Sakura tree blocks them from one another."),N("Kakashi listens."),N("Footsteps."),N("Fast."),N("Then slowing."),
 N("Kakashi changes direction."),N("The target isn't there."),N("His eye moves across the square."),N("A shadow disappears beyond one of the lanterns."),N("Wrong exit."),N("Kakashi turns immediately."),
 N("By the time he reaches the far side of the tree, ANBU Marked Target is already at the edge of the square."),N("He looks back once."),N("Their eyes meet across the distance."),
 N("The package is still pressed beneath his arm."),N("Then two late-night pedestrians step into the street between them."),N("Kakashi changes line."),N("The target doesn't."),N("He uses the interruption."),
 N("A turn between buildings."),N("Gone."),N("Kakashi reaches the corner seconds later."),N("Empty street."),N("Three possible routes."),N("No movement."),N("No sound he can separate from the rest of Konoha."),
 N("Kakashi stands still."),N("Listens again."),N("Nothing."),N("His visible eye narrows."),N("He looks back toward the Sakura tree."),N("Package Smuggler isn't there either."),N("Of course he isn't."),
 N("Kakashi had chosen the package."),N("The other man had used the choice."),N("For the first time since the ANBU operative handed him the assignment, Kakashi has neither person in sight."),
 N("And the package is still in the wrong hands."),N("He remains there for another second."),N("Not because he expects the street to give the answer back."),
 N("Because committing the mistake to memory takes less time than repeating it."),N("Then he turns toward the only place left where somebody is expecting him."),N("ANBU.")
],nextBeatId:"v2_report"});
addBeat("v2_stay_package_intercept",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>setPakkun(true),cues:[N("Kakashi cuts inside the target's route."),N("ANBU Marked Target comes around the far side and sees him."),N("Too late."),N("A small ninken stands in the middle of the exit."),Q("ANBU MARKED TARGET","Seriously?"),N("Kakashi arrives behind him."),Q("PAKKUN","This yours?"),Q("KAKASHI","Apparently."),Q("KAKASHI","Thanks."),N("No introduction."),N("No names exchanged."),Q("ANBU MARKED TARGET","You've been chasing this thing all night."),Q("KAKASHI","You've been running with it."),Q("ANBU MARKED TARGET","Fair."),Q("PAKKUN","Trouble?"),Q("KAKASHI","Probably."),Q("PAKKUN","Useful."),N("The pursuit is over."),N("The package problem isn't.")],choices:[
 C("demand_package","DEMAND THE PACKAGE","v2_battle_demand_amt",{patch:()=>history("DEMAND_PACKAGE")}),
 C("take_him_down","TAKE HIM DOWN","v2_take_down_setup",{patch:()=>history("TAKE_HIM_DOWN")}),
 C("ask_where","ASK WHERE THE PACKAGE WAS GOING","v2_ask_where",{patch:()=>history("ASK_WHERE_PACKAGE_GOING")})
]});
addBeat("v2_ask_where",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>mutate(s=>{s.knowledge.askWhere=true;s.knowledge.downstreamDestinationKnown=false;}),cues:[
 N("ANBU Marked Target keeps one hand close to the package."),N("Kakashi notices."),N("He does not reach for it."),N("Not yet."),N("Pakkun stays in the man's escape line and watches both of them."),
 N("ANBU Marked Target looks at Kakashi."),N("Waiting for the demand."),N("Kakashi asks something else."),Q("KAKASHI","Where was it going?"),N("The man's expression changes."),
 N("Not surprise at the question."),N("Surprise that Kakashi asked it first."),Q("ANBU MARKED TARGET","You think they told me?"),N("Kakashi says nothing."),
 N("The man looks toward the blocked street behind him."),N("Pakkun is still there."),N("No opening."),Q("ANBU MARKED TARGET","You heard us."),Q("KAKASHI","Enough."),
 Q("ANBU MARKED TARGET","I carry it to him."),N("He glances at the package."),Q("ANBU MARKED TARGET","He carries it somewhere else."),Q("KAKASHI","Where?"),
 N("The man gives Kakashi a tired look."),Q("ANBU MARKED TARGET","I asked the same thing."),N("Kakashi remembers the answer from the interrupted exchange."),N("Away from you."),
 N("His eye narrows."),Q("KAKASHI","He didn't tell you."),Q("ANBU MARKED TARGET","Now you're caught up."),N("Pakkun looks between them."),Q("PAKKUN","Efficient organisation."),
 N("Kakashi glances toward him."),Q("KAKASHI","Apparently."),N("ANBU Marked Target exhales through his nose."),Q("ANBU MARKED TARGET","You two always like this?"),
 N("Pakkun looks at Kakashi."),N("Kakashi looks at Pakkun."),N("Neither answers him.")
],choices:[
 C("ask_then_demand","DEMAND THE PACKAGE","v2_battle_demand_amt"),
 C("ask_then_take","TAKE HIM DOWN","v2_take_down_setup")
]});
addBeat("v2_battle_demand_amt",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","demand_amt","v2_demand_win","v2_demand_loss","AK_SA_008")});
addBeat("v2_demand_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("demand_amt",ctx,s=>{s.participants.AMT.state="ESCAPED";s.package.holder="AMT";}),cues:[
 N("The alley comes back into focus slowly."),N("Kakashi is on one knee."),N("One hand against the wet stone."),N("His breathing is heavier than he wants it to be."),
 N("Across from him, ANBU Marked Target is still standing."),N("Barely comfortably."),N("But standing."),N("The package remains secured against him."),
 N("Pakkun is several paces away, recovering his footing and watching the man with narrowed eyes."),N("Nobody speaks for a moment."),N("ANBU Marked Target looks at Kakashi."),N("Not triumphant."),N("Just tired."),
 Q("ANBU MARKED TARGET","You asked."),N("Kakashi lifts his eye."),N("The man adjusts the package beneath his clothing."),Q("ANBU MARKED TARGET","I answered."),
 N("He starts backing toward the far end of the alley."),N("Pakkun rises fully."),N("The target sees it."),N("His stance changes immediately."),N("Ready again if it has to."),
 N("Pakkun looks at him."),N("Then at Kakashi."),N("Then back toward the growing distance between them."),N("He could chase."),N("For a moment, it looks like he might."),
 N("Instead, he stays."),N("His decision."),N("Not Kakashi's command."),N("ANBU Marked Target reaches the corner."),N("Stops once."),N("Looks back."),
 N("Kakashi is already pushing himself upright."),N("Their eyes meet."),N("Then the man disappears."),N("Footsteps fade into Konoha."),N("The package goes with him."),
 N("Kakashi stands."),N("Too late."),N("Pakkun looks toward the empty corner."),Q("PAKKUN","Persistent."),N("Kakashi brushes water from one glove."),
 Q("KAKASHI","So was I."),N("Pakkun glances up at him."),Q("PAKKUN","Was?"),N("Kakashi looks down the street."),N("Nothing left to follow."),N("No sound."),
 N("No useful trail he can separate from the village around it."),N("His eye narrows."),Q("KAKASHI","Tonight."),N("Pakkun gives a quiet huff."),N("Could be amusement."),
 N("Could be approval."),N("Could be neither."),N("Kakashi doesn't ask."),N("The facts are simple enough."),N("ANBU Marked Target escaped."),
 N("The package escaped with him."),N("Kakashi lost the Battle."),N("There is no custody."),N("There is no disposition choice."),N("And there is no second roll pretending the result didn't matter."),
 N("The only honest thing left is the report."),N("Kakashi turns back toward the ANBU meeting point."),N("After a moment, Pakkun follows.")
],nextBeatId:"v2_report"});
addBeat("v2_demand_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("demand_amt",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[
 N("The alley returns around Kakashi in pieces."),N("Rainwater."),N("Lantern light."),N("Hard breathing."),N("ANBU Marked Target is down on one knee."),
 N("Not unconscious."),N("Not dead."),N("Finished."),N("The package lies several feet away where it came loose during the fight."),N("The man's eyes find it."),N("So does Kakashi."),
 N("He moves first."),N("ANBU Marked Target pushes off the ground—"),N("Pakkun steps into his path."),N("No growl this time."),N("He doesn't need one."),N("The man stops."),
 N("Looks down at the ninken."),N("Then past him at Kakashi."),N("Kakashi picks up the package."),N("Turns it once in his hand."),N("Checks the seal."),N("Still intact."),
 N("The tension that has followed him since the rooftop doesn't disappear."),N("It changes."),N("The package is secure."),N("Finally."),
 Q("ANBU MARKED TARGET","So that's it."),N("Kakashi slips the package safely away."),Q("KAKASHI","That part is."),N("The man's expression tightens."),
 N("He looks toward the open end of the alley."),N("Pakkun notices."),N("Moves half a step."),N("The exit closes again."),Q("PAKKUN","You really like running."),
 N("ANBU Marked Target looks at him."),Q("ANBU MARKED TARGET","You really like getting in the way."),N("Pakkun considers that."),Q("PAKKUN","Seems to be working."),
 N("Kakashi approaches."),N("The target's attention shifts back to him."),N("His hands are empty now."),N("Kakashi still watches them."),Q("ANBU MARKED TARGET","You got what you wanted."),
 Q("KAKASHI","Yeah."),N("The man waits."),N("Kakashi doesn't leave."),N("A small change reaches his face."),N("Recognition."),Q("ANBU MARKED TARGET","Ah."),
 N("Kakashi takes hold of his arm."),N("The target tests the grip once."),N("Not seriously."),N("Enough to confirm what it means."),N("Kakashi secures him."),
 N("Pakkun watches the restraint settle into place."),N("The chase is over."),N("The package is no longer in the wrong hands."),N("And ANBU Marked Target is now in Kakashi's custody."),
 N("The package is secure and the target is beaten."),N("What happens to the man next is still Kakashi's choice.")
],choices:[
 C("demand_police","BRING HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("AMT","POLICE")}),
 C("demand_release","LET HIM GO","v2_report",{patch:()=>dispose("AMT","RELEASE")}),
 C("demand_kill","KILL HIM","v2_report",{patch:()=>dispose("AMT","KILL")}),
 C("demand_anbu","TAKE HIM BACK TO THE ANBU","v2_report",{patch:()=>dispose("AMT","ANBU")})
]});
addBeat("v2_take_down_setup",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","pakkun"],preset:"intercept",onEnter:()=>packageState("NEUTRAL",{neutral:true}),cues:[
 N("ANBU Marked Target's hand remains over the package."),N("Kakashi watches it."),N("Then his attention leaves the package."),N("Moves to the man's stance instead."),
 N("ANBU Marked Target notices."),N("His hand tightens instinctively over the objective."),N("Too late."),N("Kakashi moves."),N("No demand."),N("No warning."),
 N("He attacks the man's balance first."),N("ANBU Marked Target twists away and catches the strike on his forearm."),
 N("Pakkun reacts at the same moment—not because Kakashi ordered him to."),N("Because the target's other hand is already moving toward the package."),
 N("Pakkun lunges."),N("The man jerks sideways to avoid him."),N("The movement saves his leg."),N("Costs him the package."),
 N("It tears loose from beneath his clothing and skids across the wet stone."),N("All three see it."),N("The target's expression changes immediately."),N("So does the fight."),
 N("He starts toward it."),N("Kakashi cuts him off."),N("Pakkun moves the other way and plants himself between the package and the nearest escape route."),
 N("ANBU Marked Target looks from Kakashi—"),N("to Pakkun—"),N("to the package lying several metres away."),Q("ANBU MARKED TARGET","You've got to be kidding me."),
 N("Pakkun's ears lift."),Q("PAKKUN","Nope."),N("Kakashi settles into position."),N("For the first time all night, the objective isn't in anyone's hands."),
 N("That matters."),N("The target knows it too."),N("He stops trying to run."),N("Now he has to win it back.")
],nextBeatId:"v2_battle_take_down_amt"});
addBeat("v2_battle_take_down_amt",{mode:"battle_transition",backdrop:B.intercept,location:"KONOHA ALLEYWAY · PL BATTLE",objective:"Control the target and the neutral package.",actors:["kakashi","amt","pakkun"],preset:"battle_trio",cues:[N("Kakashi Hatake and the ninken face ANBU Marked Target.")],battle:battle("academy_kakashi_origin_battle_kakashi_pakkun_vs_amt","take_down_amt","v2_take_down_win","v2_take_down_loss","AK_SA_008")});
addBeat("v2_take_down_loss",{backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:"Return to ANBU.",actors:["kakashi","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("take_down_amt",ctx,s=>{s.participants.AMT.state="ESCAPED";s.package.holder="KAKASHI";s.package.recovered=true;s.package.neutral=false;}),cues:[N("Kakashi loses the fight.")],nextBeatId:"v2_report"});
addBeat("v2_take_down_win",{mode:"choice",backdrop:B.intercept,location:"KONOHA ALLEYWAY · NIGHT",objective:null,actors:["kakashi","amt","pakkun"],preset:"post_battle",onEnter:ctx=>captureBattle("take_down_amt",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;s.package.neutral=false;}),cues:[N("ANBU Marked Target goes down.")],choices:[
 C("take_police","BRING HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("AMT","POLICE")}),
 C("take_release","LET HIM GO","v2_report",{patch:()=>dispose("AMT","RELEASE")}),
 C("take_kill","KILL HIM","v2_report",{patch:()=>dispose("AMT","KILL")}),
 C("take_anbu","TAKE HIM BACK TO THE ANBU","v2_report",{patch:()=>dispose("AMT","ANBU")})
]});

addBeat("v2_stop_ps_setup",{backdrop:B.alleyAlt,location:"KONOHA ALLEYWAY · NIGHT",objective:"Stop Package Smuggler.",actors:["kakashi","ps"],preset:"battle_pair",onEnter:()=>mutate(s=>{s.participants.AMT.state="ESCAPED";s.package.holder="AMT";}),cues:[
 N("ANBU Marked Target is already moving away."),N("The package goes with him."),N("Package Smuggler is coming toward Kakashi instead."),N("Kakashi looks once toward the Sakura tree."),N("Then stops looking."),
 N("He steps out of the alley."),N("Package Smuggler slows."),Q("PACKAGE SMUGGLER","Wrong one."),N("Kakashi's eye settles on him."),Q("KAKASHI","You were waiting for it."),
 N("The man glances toward the street where ANBU Marked Target disappeared."),Q("PACKAGE SMUGGLER","Was."),Q("KAKASHI","Then you know where it was going."),N("A faint smile."),
 Q("PACKAGE SMUGGLER","And you chose me instead of following it."),N("Kakashi shifts his footing."),Q("KAKASHI","I chose to stop you."),N("The smile disappears."),
 N("Package Smuggler reaches for his weapon."),Q("PACKAGE SMUGGLER","Then stop me.")
],nextBeatId:"v2_battle_ps_direct"});
addBeat("v2_battle_ps_direct",{mode:"battle_transition",backdrop:B.fight,location:"KONOHA · PL BATTLE",objective:"Stop Package Smuggler.",actors:["kakashi","ps"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_ps_1v1","ps_direct","v2_ps_missing_win","v2_ps_missing_loss","AK_SA_016")});
addBeat("v2_ps_missing_loss",{backdrop:B.fight,location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_direct",ctx,s=>{s.participants.PS.state="ESCAPED";}),cues:[
 N("Package Smuggler gets away."),N("ANBU Marked Target is already gone with the objective."),N("Kakashi ends with neither package nor prisoner.")
],nextBeatId:"v2_report"});
addBeat("v2_ps_missing_win",{mode:"choice",backdrop:B.fight,location:"KONOHA · NIGHT",objective:null,actors:["kakashi","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("ps_direct",ctx,s=>{s.participants.PS.state="BATTLE_DEFEATED";}),cues:[
 N("The package is still gone with ANBU Marked Target."),N("Package Smuggler is down and still within Kakashi's reach.")
],choices:[
 C("ps_missing_kill","KILL HIM","v2_report",{patch:()=>dispose("PS","KILL")}),
 C("ps_missing_restrain","RESTRAIN HIM","v2_report",{patch:()=>addField("PS")}),
 C("ps_missing_anbu","BRING HIM TO THE ANBU","v2_report",{patch:()=>dispose("PS","ANBU")}),
 C("ps_missing_police","TAKE HIM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>dispose("PS","POLICE")})
]});
addBeat("v2_cutoff_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Stop the package.",actors:["kakashi","amt","ps","pakkun"],preset:"sakura_group",onEnter:()=>setPakkun(true),cues:[
 N("Kakashi does not follow either man."),N("He cuts across both of them."),N("Straight for the Sakura tree."),N("ANBU Marked Target sees him first."),
 N("Package Smuggler sees what Kakashi is doing half a second later."),Q("PACKAGE SMUGGLER","Don't let him get in front of you!"),N("Too late."),
 N("Kakashi reaches the remaining exit line."),N("ANBU Marked Target turns—"),N("and stops."),N("A small ninken is standing in the street he was about to use."),
 N("The man stares down at him."),Q("ANBU MARKED TARGET","Oh, come on."),N("Pakkun looks past him."),N("At Kakashi."),Q("PAKKUN","This yours?"),
 N("Kakashi reaches the other side of the choke point."),N("Package Smuggler arrives behind him."),N("Kakashi looks at ANBU Marked Target."),Q("KAKASHI","Apparently."),
 N("A beat."),Q("KAKASHI","Thanks."),N("No names are exchanged.")
],nextBeatId:"v2_battle_cutoff"});
addBeat("v2_battle_cutoff",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Stop the package.",actors:["kakashi","amt","ps"],preset:"battle_trio",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_amt_ps_2v1","cutoff","v2_cutoff_win","v2_cutoff_loss","AK_SA_017")});
addBeat("v2_cutoff_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("cutoff",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";}),cues:[
 N("Both men break containment."),N("AMT escapes with package."),N("PS escapes."),N("Pakkun remains with Kakashi after the field clears.")
],nextBeatId:"v2_report"});
addBeat("v2_cutoff_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("cutoff",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;s.groupParticipants=["AMT","PS"];}),cues:W("getCloserDownstream","9_failure_cut_them_off_at_the_sakura_tree"),choices:[
 C("cutoff_police","TAKE THEM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>disposeGroup("POLICE",[AMT,PS])}),
 C("cutoff_anbu","TAKE THEM TO THE ANBU","v2_report",{patch:()=>disposeGroup("ANBU",[AMT,PS])}),
 C("cutoff_kill","KILL THEM","v2_report",{patch:()=>disposeGroup("KILL",[AMT,PS])}),
 C("cutoff_release","TAKE THE PACKAGE AND LET THEM GO","v2_report",{patch:()=>disposeGroup("RELEASE",[AMT,PS])})
]});

// Improved-position Pickpocket.
addBeat("v2_improved_pickpocket_resolver",{mode:"choice",backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Take the package cleanly.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>resolverEnter("improvedPickpocket"),cues:[
 N("Kakashi has already shortened the distance."),N("Now he uses it."),N("ANBU Marked Target's hand is still over the package."),N("Package Smuggler is waiting."),
 N("Kakashi knows exactly what happens if the street stays quiet."),N("He tries to remove the package before either man can find out that it will not.")
],choices:[
 C("improved_pick_success","CONTINUE","v2_pickpocket_clean_success",{available:()=>getOutcome("improvedPickpocket")==="PICKPOCKET_IMPROVED_SUCCESS"}),
 C("improved_pick_fail","CONTINUE","v2_improved_pick_fail_setup",{available:()=>getOutcome("improvedPickpocket")==="PICKPOCKET_IMPROVED_FAILURE"})
]});
addBeat("v2_improved_pick_fail_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","ps"],preset:"battle_trio",onEnter:()=>mutate(s=>{s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:[
 N("Kakashi reaches the package."),N("ANBU Marked Target catches the movement."),N("Package Smuggler reacts to him immediately."),N("The theft fails."),N("The clean handoff fails with it."),
 N("Masked Interceptor does not appear."),N("This is no longer a stealth problem."),N("It is two men who know exactly where Kakashi is."),
 Q("PACKAGE SMUGGLER","You should've stayed in the alley."),Q("KAKASHI","You noticed me there too."),Q("PACKAGE SMUGGLER","Eventually.")
],nextBeatId:"v2_battle_improved_2v1"});
addBeat("v2_battle_improved_2v1",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Recover the package.",actors:["kakashi","amt","ps"],preset:"battle_trio",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_amt_ps_2v1","improved_2v1","v2_improved_2v1_win","v2_improved_2v1_loss","AK_SA_030")});
addBeat("v2_improved_2v1_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("improved_2v1",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";}),cues:[
 N("ANBU Marked Target and Package Smuggler break away after the fight."),N("AMT keeps the package."),N("The failed handoff never becomes the Observe handoff."),N("MI remains unseen.")
],nextBeatId:"v2_report"});
addBeat("v2_improved_2v1_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("improved_2v1",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:[
 N("Both men go down."),N("Kakashi goes to ANBU Marked Target first."),N("The package is still there."),N("He takes it."),N("Secures it."),
 N("Then looks at the two defeated men."),N("No masked shinobi appears."),N("This route never gave her a visible opening."),N("The package is safe."),N("The two men are still Kakashi's decision.")
],choices:[
 C("improved_police","TAKE THEM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>disposeGroup("POLICE",[AMT,PS])}),
 C("improved_anbu","TAKE THEM TO THE ANBU","v2_report",{patch:()=>disposeGroup("ANBU",[AMT,PS])}),
 C("improved_kill","KILL THEM","v2_report",{patch:()=>disposeGroup("KILL",[AMT,PS])}),
 C("improved_release","TAKE THE PACKAGE AND LET THEM GO","v2_report",{patch:()=>disposeGroup("RELEASE",[AMT,PS])})
]});

// ---------------------------------------------------------------------------
// DIRECT STRIKE BEFORE THE HANDOFF.
// ---------------------------------------------------------------------------
addBeat("v2_direct_strike_setup",{backdrop:B.endAlley,location:"END OF ALLEYWAY · NIGHT",objective:"Stop the handoff.",actors:["kakashi","amt","ps"],preset:"battle_trio",onEnter:()=>mutate(s=>{s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:W("directStrike","1_strike_before_the_handoff"),nextBeatId:"v2_battle_direct_strike_2v1"});
addBeat("v2_battle_direct_strike_2v1",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Stop the handoff.",actors:["kakashi","amt","ps"],preset:"battle_trio",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler.")],battle:battle("academy_kakashi_origin_battle_amt_ps_2v1","direct_strike_2v1","v2_direct_strike_2v1_win","v2_direct_strike_2v1_loss","AK_SA_003")});
addBeat("v2_direct_strike_2v1_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("direct_strike_2v1",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.package.holder="AMT";s.participants.MI.state="UNSEEN";}),cues:W("directStrike","3_kakashi_loses_the_2_v_1"),nextBeatId:"v2_report"});
addBeat("v2_direct_strike_2v1_win",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Keep the recovered package.",actors:["kakashi","amt","ps"],preset:"post_battle",onEnter:ctx=>captureBattle("direct_strike_2v1",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:WC(["directStrike","4_kakashi_wins_the_2_v_1"],["directStrike","5_masked_interceptor_arrives"]),nextBeatId:"v2_battle_direct_mi"});
addBeat("v2_battle_direct_mi",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Keep the package.",actors:["kakashi","mi"],preset:"battle_pair",cues:[N("Kakashi Hatake vs Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_mi_1v1","direct_mi","v2_direct_mi_win","v2_direct_mi_loss","AK_SA_003")});
addBeat("v2_direct_mi_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("direct_mi",ctx,s=>{s.participants.MI.state="ESCAPED";s.package.holder="MI";s.package.recovered=false;}),cues:W("directStrike","7_mi_defeats_kakashi"),nextBeatId:"v2_report"});
addBeat("v2_direct_mi_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps","mi"],preset:"sakura_group",onEnter:ctx=>captureBattle("direct_mi",ctx,s=>{s.participants.MI.state="BATTLE_DEFEATED";}),cues:W("directStrike","8_kakashi_defeats_mi"),choices:[
 C("direct_group_police","TAKE THEM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>disposeGroup("POLICE")}),
 C("direct_group_anbu","TAKE THEM TO THE ANBU","v2_report",{patch:()=>disposeGroup("ANBU")}),
 C("direct_group_kill","KILL THEM","v2_report",{patch:()=>disposeGroup("KILL")}),
 C("direct_group_release","TAKE THE PACKAGE AND LET THEM GO","v2_report",{patch:()=>disposeGroup("RELEASE")})
]});

// ---------------------------------------------------------------------------
// DIRECT PICKPOCKET.
// ---------------------------------------------------------------------------
addBeat("v2_direct_pickpocket_resolver",{mode:"choice",backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Take the package cleanly.",actors:["kakashi","amt","ps"],preset:"observe",onEnter:()=>resolverEnter("directPickpocket"),cues:W("directPickpocket","1_slip_in_for_the_package"),choices:[
 C("direct_pick_success","CONTINUE","v2_pickpocket_clean_success",{available:()=>getOutcome("directPickpocket")==="PICKPOCKET_DIRECT_SUCCESS"}),
 C("direct_pick_failure","CONTINUE","v2_pickpocket_failure_setup",{available:()=>getOutcome("directPickpocket")==="PICKPOCKET_DIRECT_FAILURE"})
]});
addBeat("v2_pickpocket_clean_success",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"sakura_kakashi_only",onEnter:()=>mutate(s=>{s.package.holder="KAKASHI";s.package.recovered=true;s.participants.MI.state="UNSEEN";}),cues:W("directPickpocket","2_resolver_success_the_package_disappears"),nextBeatId:"v2_report"});
addBeat("v2_pickpocket_failure_setup",{backdrop:B.sakura,location:"SAKURA TREE · NIGHT",objective:"Recover the package.",actors:["kakashi","amt","ps","mi"],preset:"sakura_group",onEnter:()=>{participant("MI",{state:"AVAILABLE"});packageState("AMT");return history("PICKPOCKET_DETECTED_3V1");},cues:W("directPickpocket","4_resolver_failure_caught_in_the_exchange"),nextBeatId:"v2_battle_pickpocket_3v1"});
addBeat("v2_battle_pickpocket_3v1",{mode:"battle_transition",backdrop:B.fight,location:"SAKURA TREE · PL BATTLE",objective:"Recover the package.",actors:["kakashi","amt","ps","mi"],preset:"sakura_group",cues:[N("Kakashi Hatake vs ANBU Marked Target + Package Smuggler + Masked Interceptor.")],battle:battle("academy_kakashi_origin_battle_amt_ps_mi_3v1","pickpocket_3v1","v2_pickpocket_3v1_win","v2_pickpocket_3v1_loss","AK_SA_028")});
addBeat("v2_pickpocket_3v1_loss",{backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:"Return to ANBU.",actors:["kakashi"],preset:"post_battle",onEnter:ctx=>captureBattle("pickpocket_3v1",ctx,s=>{s.participants.AMT.state="ESCAPED";s.participants.PS.state="ESCAPED";s.participants.MI.state="ESCAPED";s.package.holder="AMT";}),cues:W("directPickpocket","6_kakashi_loses_the_3_v_1"),nextBeatId:"v2_report"});
addBeat("v2_pickpocket_3v1_win",{mode:"choice",backdrop:B.fight,location:"SAKURA TREE · NIGHT",objective:null,actors:["kakashi","amt","ps","mi"],preset:"sakura_group",onEnter:ctx=>captureBattle("pickpocket_3v1",ctx,s=>{s.participants.AMT.state="BATTLE_DEFEATED";s.participants.PS.state="BATTLE_DEFEATED";s.participants.MI.state="BATTLE_DEFEATED";s.package.holder="KAKASHI";s.package.recovered=true;}),cues:W("directPickpocket","7_kakashi_wins_the_3_v_1"),choices:[
 C("pick_group_police","TAKE THEM TO THE UCHIHA POLICE FORCE","v2_report",{patch:()=>disposeGroup("POLICE")}),
 C("pick_group_anbu","TAKE THEM TO THE ANBU","v2_report",{patch:()=>disposeGroup("ANBU")}),
 C("pick_group_kill","KILL THEM","v2_report",{patch:()=>disposeGroup("KILL")}),
 C("pick_group_release","TAKE THE PACKAGE AND LET THEM GO","v2_report",{patch:()=>disposeGroup("RELEASE")})
]});

// ---------------------------------------------------------------------------
// TERMINAL — factual report -> private evaluation -> Receipt -> Origin complete.
// ---------------------------------------------------------------------------
addBeat("v2_report",{backdrop:B.rooftop,location:"ANBU REPORT · KONOHA ROOFTOP · NIGHT",objective:"Report to ANBU.",actors:()=>{const s=state();return s&&s.pakkun.present?["kakashi","pakkun","anbu"]:["kakashi","anbu"];},preset:"anbu_report",transition:"wipe",onEnter:()=>mutate(s=>{if(s.package.holder==="KAKASHI"){s.package.holder="ANBU";s.package.returned=true;}s.terminal.reportReached=true;}),onAdvance:()=>mutate(s=>{if(s.pakkun.present){s.pakkun.present=false;s.pakkun.departed=true;}}),cues:()=>dynamicTerminalCues(),nextBeatId:"v2_minato"});
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
addBeat("v2_minato",{backdrop:B.hokage,location:"HOKAGE ADMINISTRATION · NIGHT",objective:null,actors:["anbu","minato"],preset:"hokage_report",transition:"wipe",onEnter:()=>mutate(s=>{s.terminal.minatoReached=true;}),cues:()=>minatoCues(),nextBeatId:"v2_receipt"});
addBeat("v2_receipt",{backdrop:B.hokage,location:"CHRONICLE RECEIPT",objective:null,actors:[],preset:"chronicle_receipt",transition:"wipe",receipt:true,onEnter:()=>commitTerminalRewardsAtReceipt(),cues:()=>receiptCues(),nextBeatId:"v2_complete"});
addBeat("v2_complete",{backdrop:B.hokage,location:"CHRONICLE CLOSED",objective:null,actors:[],preset:"chronicle_receipt",cues:[RECORD("Origin occurrence sealed. Continue to Academy Team Formation.")],onAdvance:()=>completeAcademyKakashiV2Origin(),exitScene:true});

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
  exactRootChoices:!!root&&root.choices.map(c=>c.label).join("|")==="WATCH THE EXCHANGE|MOVE IN CLOSER|STRIKE BEFORE THE HANDOFF|SLIP IN FOR THE PACKAGE",
  exactWatchChoices:!!watch&&watch.choices.map(c=>c.label).join("|")==="STOP THE ASSASSIN|SECURE THE PACKAGE|SECURE THE PACKAGE BEFORE THE ASSASSIN|DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE|GO AFTER THE ORIGINAL TARGET",
  tenBattleConfigsAvailable:!!globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010&&Object.keys(globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010.configs||{}).length===10,
  currentLethalLabels:JSON.stringify(beats).includes("KILL HER")&&JSON.stringify(beats).includes("KILL HIM")&&JSON.stringify(beats).includes("KILL THEM")&&!JSON.stringify(beats).includes("ATTEMPT"+" TO KILL"),
  stopAssassinUsesDirectMiConfig:!!def&&def.beatMap.get("v2_battle_mi_stop")?.battle?.encounterId==="academy_kakashi_origin_battle_mi_1v1",
  stopAssassinPackageOnlyCatchup:!!def&&def.beatMap.get("v2_mi_stop_win")?.choices?.some(c=>c.label==="GO AFTER PACKAGE SMUGGLER")&&!def.beatMap.get("v2_mi_stop_win")?.choices?.some(c=>c.label==="GO AFTER ANBU MARKED TARGET"),
  stopAssassinThreeActionGate:STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS===3,
  stableFactualResolver:Object.keys(factualDefs).length>=7,
  noDomOwnership:!String(addBeat).includes("document.")&&!String(resolveFactual).includes("querySelector"),
  terminalRewardsCommittedAtReceipt:String(commitTerminalRewardsAtReceipt).includes("commitAcademyKakashiV2TerminalRewards36015"),
  terminalCompleteCallsOrigin:String(completeAcademyKakashiV2Origin).includes("completeChronicleOriginPrologue"),
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
