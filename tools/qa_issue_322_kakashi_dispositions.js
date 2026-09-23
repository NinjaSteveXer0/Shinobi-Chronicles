#!/usr/bin/env node
"use strict";
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const ROOT=process.cwd();
const CONTENT="runtime/academy-kakashi-v2-content-36000.js";
const CORE="runtime/alpha-kakashi-v2-core-36020.js";
const REWARDS="runtime/alpha-kakashi-v2-rewards-36015.js";
const PRODUCER="runtime/alpha-special-jonin-evidence-producer-34700.js";
const contentSource=fs.readFileSync(CONTENT,"utf8");
const coreSource=fs.readFileSync(CORE,"utf8");
const rewardSource=fs.readFileSync(REWARDS,"utf8");
const producerSource=fs.readFileSync(PRODUCER,"utf8");

function makeCoreHarness(){
  const scenes=new Map();
  let active=null,factualCalls=0,factualArgs=[],evidencePackets=[],outcomeByTarget={};
  const playerData={activityHistory:[]};
  const D={
    openSemanticChoiceSet:({decisionPointRef})=>({success:true,choiceSet:{choiceSetId:"set:"+decisionPointRef}}),
    commitStoryIntent:({choiceSetId,choiceId})=>({success:true,receipt:{storyDecisionReceiptId:"decision:"+choiceSetId+":"+choiceId,intentCommitRef:"intent:"+choiceSetId+":"+choiceId,choiceSetId,choiceId}})
  };
  const F={
    stableRef:(prefix,payload)=>prefix+":"+JSON.stringify(payload),
    registerStoryFactualResolverBinding:()=>({success:true}),
    resolveStoryFactualAction:args=>{
      factualCalls++;factualArgs.push(JSON.parse(JSON.stringify(args)));
      const target=args.context&&args.context.targetParticipantRef;
      let selectedOutcomeRef=outcomeByTarget[target];
      if(!selectedOutcomeRef){
        if(String(args.bindingRef).includes("disposition.kill"))selectedOutcomeRef="KILLED";
        else if(String(args.bindingRef).includes("disposition.restrain"))selectedOutcomeRef="RESTRAINED";
        else selectedOutcomeRef="QA_SUCCESS";
      }
      return{success:true,receipt:{selectedOutcomeRef,storyFactualResolverReceiptId:"fact:"+factualCalls,resolutionMode:"qa_forced"}};
    }
  };
  const ctx={
    console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,
    playerData,activityHistory:playerData.activityHistory,
    savePlayerData:()=>true,
    SC_STORY_DECISION_REALISATION_34000:D,
    SC_STORY_FACTUAL_RESOLVER_34600:F,
    SC_ALPHA_SPECIAL_JONIN_EVIDENCE_PRODUCER_34700:{patchId:"qa"},
    projectSpecialJoninContextualEvidence34700:packet=>{evidencePackets.push(JSON.parse(JSON.stringify(packet)));return{success:true,record:packet};},
    SC_ACADEMY_KAKASHI_V2_BATTLE_36010:{configs:{
      a:{},b:{},c:{},d:{},e:{},f:{},g:{},h:{},i:{},j:{}
    }},
    commitAcademyKakashiV2TerminalRewards36015:()=>({success:true,sourceReceipts:[]}),
    unregisterStoryScene:id=>scenes.delete(id),
    registerStoryScene:def=>{const row={...def,beatMap:new Map((def.beats||[]).map(b=>[b.beatId,b]))};scenes.set(def.sceneId,row);return{success:true};},
    getStorySceneDefinition:id=>scenes.get(id)||null,
    getActiveStorySceneRuntime:()=>active,
    completeChronicleOriginPrologue:()=>({success:true})
  };
  ctx.globalThis=ctx;vm.createContext(ctx);
  vm.runInContext(contentSource,ctx,{filename:CONTENT});
  vm.runInContext(coreSource,ctx,{filename:CORE});
  const def=scenes.get("origin_academy_kakashi_anbu_retrieval");
  assert(def,"Kakashi scene not registered");
  function reset(instanceId="qa_instance"){
    playerData.activityHistory=[];ctx.activityHistory=playerData.activityHistory;
    active={sceneId:def.sceneId,instanceId,beatId:def.entryBeatId,localContext:{}};
    factualCalls=0;factualArgs=[];evidencePackets=[];outcomeByTarget={};
    return active;
  }
  function state(){return ctx.getAcademyKakashiV2State36020();}
  function choice(beatId,choiceId,outcomes={}){
    active.beatId=beatId;outcomeByTarget={...outcomes};
    const beat=def.beatMap.get(beatId);assert(beat,"missing beat "+beatId);
    const row=(beat.choices||[]).find(c=>c.choiceId===choiceId);assert(row,"missing choice "+beatId+"/"+choiceId);
    const req=(row.consequenceRequests||[])[0];assert(req,"choice consequence missing "+choiceId);
    const result=req.resolve();assert(result&&result.success===true,JSON.stringify(result));
    return{row,result};
  }
  function enter(beatId){
    active.beatId=beatId;const beat=def.beatMap.get(beatId);assert(beat,"missing beat "+beatId);
    for(const req of beat.onEnterConsequences||[]){const r=req.resolve();assert(r&&r.success===true,JSON.stringify(r));}
    return beat;
  }
  return{
    ctx,def,reset,state,choice,enter,playerData,
    setActive:v=>{active=v;},
    getActive:()=>active,
    getFactualCalls:()=>factualCalls,
    getFactualArgs:()=>factualArgs,
    getEvidence:()=>evidencePackets
  };
}

// Exact single-target two-outcome semantics.
{
  const h=makeCoreHarness();
  const cases=[
    ["MI","v2_mi_stop_win","mi_kill","KILL","KILLED"],
    ["MI","v2_mi_stop_win","mi_kill","KILL","ESCAPED"],
    ["MI","v2_mi_stop_win","mi_restrain","RESTRAIN","RESTRAINED"],
    ["MI","v2_mi_stop_win","mi_restrain","RESTRAIN","ESCAPED"],
    ["PS","v2_ps_seq_win","ps_kill","KILL","KILLED"],
    ["PS","v2_ps_seq_win","ps_kill","KILL","ESCAPED"],
    ["PS","v2_ps_seq_win","ps_restrain_continue","RESTRAIN","RESTRAINED"],
    ["PS","v2_ps_seq_win","ps_restrain_continue","RESTRAIN","ESCAPED"],
    ["AMT","v2_amt_missing_win","amt_missing_kill","KILL","KILLED"],
    ["AMT","v2_amt_missing_win","amt_missing_kill","KILL","ESCAPED"],
    ["AMT","v2_amt_missing_win","amt_missing_restrain","RESTRAIN","RESTRAINED"],
    ["AMT","v2_amt_missing_win","amt_missing_restrain","RESTRAIN","ESCAPED"]
  ];
  for(const [target,beat,choice,intent,outcome] of cases){
    h.reset("single_"+target+"_"+intent+"_"+outcome);
    h.choice(beat,choice,{[target]:outcome});
    const row=h.state().participants[target];
    assert.strictEqual(row.state,outcome,beat+"/"+choice+" state");
    assert.strictEqual(row.disposition,intent,beat+"/"+choice+" intent");
    assert.strictEqual(row.dispositionResolution.outcome,outcome);
    if(intent==="KILL")assert(!h.getEvidence().some(e=>e.qualificationId==="covert_operations.assassin"),"KILL/KILLED alone manufactured Assassin evidence");
  }
}

// Same committed disposition must survive a save/load-shaped localContext round trip without reroll.
{
  const h=makeCoreHarness();h.reset("save_load");
  h.choice("v2_mi_stop_win","mi_kill",{MI:"ESCAPED"});
  const calls=h.getFactualCalls(),snapshot=JSON.parse(JSON.stringify(h.getActive().localContext));
  h.setActive({sceneId:h.def.sceneId,instanceId:"save_load",beatId:"v2_mi_stop_win",localContext:snapshot});
  h.choice("v2_mi_stop_win","mi_kill",{MI:"KILLED"});
  assert.strictEqual(h.state().participants.MI.state,"ESCAPED","save/load rerolled disposition");
  assert.strictEqual(h.getFactualCalls(),calls,"save/load repeated factual resolver");
}

// Group KILL resolves exact children independently and binds the authored mixed section.
{
  const h=makeCoreHarness();h.reset("group2");
  h.choice("v2_cutoff_win","cutoff_kill",{AMT:"KILLED",PS:"ESCAPED"});
  assert.strictEqual(h.state().participants.AMT.state,"KILLED");
  assert.strictEqual(h.state().participants.PS.state,"ESCAPED");
  const group2ChildCalls=h.getFactualArgs().filter(args=>args.context&&["AMT","PS"].includes(args.context.targetParticipantRef));
  assert.strictEqual(group2ChildCalls.length,2,"2-target group KILL did not resolve two factual children");
  assert.strictEqual(new Set(group2ChildCalls.map(args=>args.bindingRef)).size,2,"2-target group KILL reused one stable-draw binding and correlated child outcomes");
  assert(group2ChildCalls.every(args=>String(args.bindingRef).endsWith("."+String(args.context.targetParticipantRef).toLowerCase())),"2-target child binding is not participant-specific");
  let parents=h.playerData.activityHistory.filter(r=>r.type==="academy_kakashi_v2_group_disposition");
  assert.strictEqual(parents.length,1,"2-target group KILL did not retain one causal parent");
  h.getActive().beatId="v2_group2_kill_result";
  const group2=h.ctx.getAcademyKakashiV2Cues36020("v2_group2_kill_result");
  assert(group2.length>0&&JSON.stringify(group2).includes("Package Smuggler"),"2-target mixed resolver scene not bound");

  h.reset("group3");
  h.choice("v2_direct_mi_win","direct_group_kill",{AMT:"ESCAPED",PS:"KILLED",MI:"ESCAPED"});
  assert.strictEqual(h.state().participants.AMT.state,"ESCAPED");
  assert.strictEqual(h.state().participants.PS.state,"KILLED");
  assert.strictEqual(h.state().participants.MI.state,"ESCAPED");
  const group3ChildCalls=h.getFactualArgs().filter(args=>args.context&&["AMT","PS","MI"].includes(args.context.targetParticipantRef));
  assert.strictEqual(group3ChildCalls.length,3,"3-target group KILL did not resolve three factual children");
  assert.strictEqual(new Set(group3ChildCalls.map(args=>args.bindingRef)).size,3,"3-target group KILL reused a stable-draw binding across children");
  parents=h.playerData.activityHistory.filter(r=>r.type==="academy_kakashi_v2_group_disposition");
  assert.strictEqual(parents.length,1,"3-target group KILL did not retain one causal parent");
  h.getActive().beatId="v2_group3_kill_result";
  assert(h.ctx.getAcademyKakashiV2Cues36020("v2_group3_kill_result").length>0,"3-target mixed resolver scene not bound");
}

// Sequential all-three RESTRAINED -> collect -> delivery; partial subset exclusion.
function restrainThreeAndDeliver(institution){
  const h=makeCoreHarness();h.reset("three_"+institution);
  h.choice("v2_mi_stop_win","mi_restrain",{MI:"RESTRAINED"});
  h.choice("v2_ps_seq_win","ps_restrain_continue",{PS:"RESTRAINED"});
  h.choice("v2_amt_seq_win","amt_seq_collect",{AMT:"RESTRAINED"});
  h.enter("v2_group_collect");
  const id=institution==="ANBU"?"group_all_anbu":"group_all_police";
  h.choice("v2_group_collect",id,{});
  for(const key of ["MI","PS","AMT"])assert.strictEqual(h.state().participants[key].state,institution+"_CUSTODY");
  const extraction=h.getEvidence().filter(e=>e.qualificationId==="covert_operations.extraction_specialist");
  assert(extraction.some(e=>e.significance===3&&e.tags.includes("covert_operations.extraction_specialist:subject_recovery")&&e.tags.includes("covert_operations.extraction_specialist:extraction_planning")),"all-three extraction did not reach authorised significance 3");
  return h;
}
restrainThreeAndDeliver("ANBU");
restrainThreeAndDeliver("POLICE");
{
  const h=makeCoreHarness();h.reset("partial_collect");
  h.choice("v2_mi_stop_win","mi_restrain",{MI:"RESTRAINED"});
  h.enter("v2_group_collect");
  h.choice("v2_group_collect","group_all_anbu",{});
  assert.strictEqual(h.state().participants.MI.state,"ANBU_CUSTODY");
  assert.notStrictEqual(h.state().participants.PS.state,"ANBU_CUSTODY");
  assert.notStrictEqual(h.state().participants.AMT.state,"ANBU_CUSTODY");
}

// Pursuit timing/topology stays authored after RESTRAIN result.
{
  const h=makeCoreHarness();
  assert.strictEqual(h.def.beatMap.get("v2_mi_restrained_next").nextBeatId,"v2_ps_pursuit_resolver");
  assert.strictEqual(h.def.beatMap.get("v2_ps_restrain_continue_result").nextBeatId,"v2_amt_after_ps");
}

// Bounded migration reads old Alpha save fields once and writes only final semantics.
{
  const h=makeCoreHarness();h.reset("migration");
  h.getActive().localContext.kakashiV2={
    version:2,routeHistory:[],package:{holder:"KAKASHI",recovered:true,returned:false,neutral:false},
    participants:{MI:{state:"DEAD"},PS:{state:"FIELD_SECURED_PENDING_COLLECTION"},AMT:{state:"COLLECTED_ACTIVE_ESCORT"}},
    pakkun:{present:false,departed:false,knownByKakashiAsName:false},knowledge:{},resolvers:{},battles:{},fieldSecured:["PS"],rewards:{},terminal:{}
  };
  const st=h.state();
  assert.strictEqual(st.participants.MI.state,"KILLED");
  assert.strictEqual(st.participants.PS.state,"RESTRAINED");
  assert.strictEqual(st.participants.AMT.state,"RESTRAINED");
  assert.strictEqual(st.participants.AMT.collected,true);
  assert(!Object.prototype.hasOwnProperty.call(st,"fieldSecured"),"legacy fieldSecured survived migration");
}

// Tracker and Interrogator exact catalogue-valid producer packets.
{
  const h=makeCoreHarness();h.reset("specialist");
  h.enter("v2_cutoff_setup");
  let rows=h.getEvidence();
  const tracker=rows.find(e=>e.qualificationId==="reconnaissance.tracker_nin");
  assert(tracker&&tracker.significance===2&&tracker.tags.includes("reconnaissance.tracker_nin:route_intercept_execution"),"Tracker route intercept projection incorrect");
  h.enter("v2_ask_where");
  rows=h.getEvidence();
  const interrogation=rows.find(e=>e.qualificationId==="intelligence.interrogator");
  assert(interrogation&&interrogation.significance===1&&interrogation.tags.length===1&&interrogation.tags[0]==="intelligence.interrogator:information_extraction","ASK WHERE evidence must stay limited/incomplete without invented credibility tag");
  assert(rows.every(e=>e.significance<=3&&e.specialistLevel===false&&e.capstoneAuthorized===false),"Kakashi emitted forbidden significance/capstone state");
}

// Shared producer: committed-source gate + same-causal-root upsert instead of fake breadth.
{
  const definition={
    qualificationId:"covert_operations.extraction_specialist",familyId:"covert_operations",
    requiredEvidenceTags:["covert_operations.extraction_specialist:specialist_work"],
    mandatoryCompetencyGroups:[
      {groupId:"covert_operations.extraction_specialist:competency_a",anyTags:["covert_operations.extraction_specialist:extraction_planning"]},
      {groupId:"covert_operations.extraction_specialist:competency_b",anyTags:["covert_operations.extraction_specialist:subject_recovery"]}
    ],
    optionalSupportingTags:[],permittedEvidenceCategories:[],capacityRequirements:[],capstoneRequirement:{requiredTags:["covert_operations.extraction_specialist:capstone"]}
  };
  const playerData={activityHistory:[
    {sourceOccurrenceId:"src1",committed:true,type:"qa"},{sourceOccurrenceId:"src2",committed:true,type:"qa"},{sourceOccurrenceId:"src3",committed:true,type:"qa"}
  ]};
  const ctx={
    console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,playerData,
    savePlayerData:()=>true,
    getSpecialJoninQualificationDefinition:id=>id===definition.qualificationId?definition:null,
    normalizeSpecialistEvidenceRecord:r=>JSON.parse(JSON.stringify(r)),
    evaluateSpecialJoninQualification:(id,rows)=>({qualified:false,qualificationId:id,rows})
  };ctx.globalThis=ctx;vm.createContext(ctx);vm.runInContext(producerSource,ctx,{filename:PRODUCER});
  assert.strictEqual(ctx.runAlphaSpecialJoninEvidenceProducer34700Diagnostics().pass,true);
  const base={subjectVariantId:"academy_kakashi",qualificationId:definition.qualificationId,category:"chronicle_origin",activityFamilyId:"academy_kakashi_origin_extraction",causalRootOccurrenceId:"root1",verified:true,specialistLevel:false};
  assert.strictEqual(ctx.projectSpecialJoninContextualEvidence34700({...base,sourceOccurrenceId:"missing",tags:["covert_operations.extraction_specialist:extraction_planning"],significance:1}).success,false,"uncommitted source accepted");
  assert(ctx.projectSpecialJoninContextualEvidence34700({...base,sourceOccurrenceId:"src1",tags:["covert_operations.extraction_specialist:extraction_planning"],significance:1}).success);
  assert(ctx.projectSpecialJoninContextualEvidence34700({...base,sourceOccurrenceId:"src2",tags:["covert_operations.extraction_specialist:extraction_planning"],significance:2}).success);
  assert(ctx.projectSpecialJoninContextualEvidence34700({...base,sourceOccurrenceId:"src3",tags:["covert_operations.extraction_specialist:subject_recovery"],significance:3}).success);
  const rows=ctx.getSpecialJoninContextualEvidence34700("academy_kakashi",definition.qualificationId);
  assert.strictEqual(rows.length,1,"same causal root counterfeited evidence breadth");
  assert.strictEqual(rows[0].significance,3);
  assert(rows[0].tags.includes("covert_operations.extraction_specialist:extraction_planning")&&rows[0].tags.includes("covert_operations.extraction_specialist:subject_recovery"));
  assert.strictEqual(rows[0].specialistLevel,false);
}

// Capture tiers and unresolved legacy cap boundary.
{
  const itemDatabase={field_recovery_pill:{id:"field_recovery_pill",name:"Field Recovery Pill",type:"consumable",rarity:"Common",stackable:true}};
  const playerData={ryo:0,inventory:[]};
  const ctx={
    console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,itemDatabase,playerData,currentBattle:null,
    cloneProgressionData:v=>v===undefined?undefined:JSON.parse(JSON.stringify(v)),
    getItemDefinition:id=>itemDatabase[id]||null,
    addItemToInventory:item=>playerData.inventory.push({...item,quantity:1}),
    generateBattleRewards:()=>null,claimCurrentBattleRewards:()=>false,savePlayerData:()=>true,saveTestState:()=>true
  };ctx.globalThis=ctx;vm.createContext(ctx);vm.runInContext(rewardSource,ctx,{filename:REWARDS});
  const base={package:{},knowledge:{},resolvers:{},routeHistory:[],battles:{},terminal:{reportReached:true,minatoReached:true,receiptReached:true}};
  const plan=n=>ctx.previewAcademyKakashiV2TerminalRewards36015({...base,participants:Object.fromEntries(["MI","PS","AMT"].slice(0,n).map(k=>[k,{state:"ANBU_CUSTODY"}]))},"tier"+n);
  assert.strictEqual(plan(1).captureRyo,25);assert.strictEqual(plan(2).captureRyo,50);assert.strictEqual(plan(3).captureRyo,100);
  const kill=ctx.previewAcademyKakashiV2TerminalRewards36015({...base,participants:{MI:{state:"KILLED",disposition:"KILL"}}},"kill");
  const release=ctx.previewAcademyKakashiV2TerminalRewards36015({...base,participants:{MI:{state:"RELEASED",disposition:"RELEASE"}}},"release");
  assert.strictEqual(kill.captureRyo,0);assert.strictEqual(release.captureRyo,0);
  const rich={...base,package:{returned:true},knowledge:{askWhere:true},participants:{MI:{state:"ANBU_CUSTODY"},PS:{state:"ANBU_CUSTODY"},AMT:{state:"ANBU_CUSTODY"}},resolvers:{directPickpocket:{selectedOutcomeRef:"PICKPOCKET_DIRECT_SUCCESS"}}};
  const before=playerData.ryo,result=ctx.commitAcademyKakashiV2TerminalRewards36015(rich,"overcap");
  assert.strictEqual(result.success,false);assert.strictEqual(result.reason,"kakashi_v2_terminal_cap_policy_unresolved");
  assert.strictEqual(playerData.ryo,before,"unresolved cap mutated Currency before failure");
  assert(result.plan.rawTotalRyo>250,"cap boundary fixture did not actually exceed legacy cap");
}

// Old semantics may appear only in bounded migration, never in active writers/readers.
{
  const migrationStart=coreSource.indexOf("function migrateLegacyDispositionState(");
  const migrationEnd=coreSource.indexOf("function restrainedParticipantKeys(",migrationStart);
  assert(migrationStart>=0&&migrationEnd>migrationStart,"bounded migration missing");
  const operational=coreSource.slice(0,migrationStart)+coreSource.slice(migrationEnd);
  for(const token of ["FIELD_SECURED_PENDING_COLLECTION","COLLECTED_ACTIVE_ESCORT",'state="DEAD"',"s.fieldSecured","disposeGroup(\"KILL\"","dispose(\"MI\",\"KILL\"","dispose(\"PS\",\"KILL\"","dispose(\"AMT\",\"KILL\""]){
    assert(!operational.includes(token),"retired Kakashi semantic regained production ownership: "+token);
  }
}

console.log(JSON.stringify({
  pass:true,issue:322,
  singleTargetOutcomes:"KILL KILLED/ESCAPED + RESTRAIN RESTRAINED/ESCAPED",
  groupKill:"independent exact participant children",
  saveLoadIdempotence:"GREEN",
  collection:"exact RESTRAINED facts",
  captureTiers:"25/50/100 noncumulative",
  terminalCap:"explicit unresolved boundary; no silent clipping",
  specialistEvidence:"shared producer + Tracker/Interrogator/Extraction",
  assassinInference:"NONE without qualifying method fact",
  browserGoldenClaimed:false
},null,2));
