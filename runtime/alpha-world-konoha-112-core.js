// ============================================================================
// ISSUE #112 — KONOHA WORLD INFO / MARKERS / STORY LOCATOR / ACTIVATION WAVE 1
// Authority: Documentation/World/Alpha Village Region Info Marker Story Locator
// and Executable Activation Package 2026-09-11.md
//
// Recovery note (2026-09-13): the original 112 core blob was byte-corrupted
// inside KOH-X24 and could not parse. This file reconstructs the same closed
// World contract against the existing worldEventRuntime + Konoha v3 consumers.
// It does not create a second World, Story, Skill, reward or map subsystem.
// ============================================================================
(function installKonohaWorld112(){
  "use strict";

  const INFO_SCHEMA="sc.worldInfoProjection.v1";
  const LOCATOR_SCHEMA="sc.worldStoryLocator.v1";
  const MANIFEST_ID="sc_world_alpha_activation_konoha_v1_2026_09_11";
  const STANDING="konoha_alpha_standing_pool_v1";
  const PRESSURE="konoha_arc1_pressure_pool_v1";
  const RESPONSIVE="konoha_capability_responsive_pool_v1";
  const ACTIVATION_RECEIPT="world_activation_konoha_v1_2026_09_11";
  const ARC2_WITHHELD="story_locator_arc2_m2_the_leak_pending";

  const LABELS=Object.freeze({
    konoha_alpha_gate_delivery_assistance:"Gate Delivery Assistance",
    konoha_alpha_market_lost_parcel:"Lost Market Parcel",
    konoha_alpha_hospital_supply_run:"Hospital Supply Run",
    konoha_alpha_river_satchel_recovery:"River Satchel Recovery",
    konoha_alpha_crafts_shipment_delay:"Craftsmen Shipment Delay",
    konoha_alpha_messenger_roost_delay:"Messenger Roost Delay",
    konoha_alpha_storehouse_inventory_discrepancy:"Storehouse Inventory Discrepancy",
    konoha_alpha_pump_maintenance_alarm:"Pump Maintenance Alarm",
    konoha_alpha_veterinary_runaway_animal:"Veterinary Runaway Animal",
    konoha_alpha_memorial_record_request:"Memorial Record Request",
    konoha_alpha_academy_lost_equipment:"Academy Lost Equipment",
    konoha_alpha_training_observation_drill:"Observation Drill",
    fire_arc1_pressure_marked_residence:"Arc-1 Marked Residence",
    fire_arc1_pressure_records_tampering:"Arc-1 Records Tampering",
    fire_arc1_pressure_rooftop_observer:"Arc-1 Rooftop Observer",
    fire_arc1_pressure_false_patrol:"Arc-1 False Patrol at the Gate",
    konoha_resp_false_identity_gate_ledger:"The Name on the Gate Ledger",
    konoha_resp_false_identity_counterwatch:"The Watcher Who Logged the Wrong Person",
    konoha_resp_false_identity_fuin_ward:"A Name Written Into the Ward",
    konoha_resp_medical_poison_recovery:"The Patient Who Should Be Recovering",
    konoha_resp_tracking_evidence_three_trails:"Three Trails, One Body",
    konoha_resp_fuin_barrier_service_ward:"Old Service Ward Handshake",
    konoha_resp_byakugan_peripheral_discrepancy:"Hyūga Peripheral Discrepancy",
    konoha_alpha_eastern_drainage_trace:"Eastern Drainage Trace"
  });

  const ROWS=Object.freeze([
    {id:"konoha_alpha_gate_delivery_assistance",pool:STANDING,host:"KON-P10",category:"SIDE_OCCURRENCE",reward:120,rewardAction:"complete_delivery",actions:["verify_destination","complete_delivery","return_sender","decline"]},
    {id:"konoha_alpha_market_lost_parcel",pool:STANDING,host:"KON-P09",category:"INVESTIGATION",reward:100,rewardAction:"return_parcel",actions:["inspect_last_known","ask_witnesses","locate_parcel","return_parcel","leave"]},
    {id:"konoha_alpha_hospital_supply_run",pool:STANDING,host:"KON-P03",category:"SIDE_OCCURRENCE",reward:150,rewardAction:"deliver_supplies",actions:["accept_delivery","verify_destination","deliver_supplies","report_delay","decline"]},
    {id:"konoha_alpha_river_satchel_recovery",pool:STANDING,host:"KON-O03",category:"INVESTIGATION",reward:100,rewardAction:"return_satchel",actions:["assess_current","recover_safe","report_location","return_satchel","leave"]},
    {id:"konoha_alpha_crafts_shipment_delay",pool:STANDING,host:"KON-P04",secondary:"KON-O19",category:"INVESTIGATION",reward:180,rewardAction:"complete_logistics",actions:["inspect_paperwork","check_storehouse","locate_shipment","complete_logistics","report_discrepancy","decline"]},
    {id:"konoha_alpha_messenger_roost_delay",pool:STANDING,host:"KON-O18",category:"INVESTIGATION",reward:140,rewardAction:"assist_dispatch",actions:["hear_report","inspect_dispatch","check_route","assist_dispatch","report","leave"]},
    {id:"konoha_alpha_storehouse_inventory_discrepancy",pool:STANDING,host:"KON-O19",category:"INVESTIGATION",reward:220,rewardAction:"formal_report",actions:["compare_records","inspect_count","ask_custodians","preserve_discrepancy","formal_report","decline"]},
    {id:"konoha_alpha_pump_maintenance_alarm",pool:STANDING,host:"KON-O20",category:"INVESTIGATION",reward:180,rewardAction:"complete_civic_assistance",actions:["inspect_surface","identify_fault","warn_workers","request_specialist","complete_civic_assistance","report","leave"]},
    {id:"konoha_alpha_veterinary_runaway_animal",pool:STANDING,host:"KON-O21",category:"INVESTIGATION",reward:120,rewardAction:"return_animal",actions:["ask_handler","inspect_tracks","search","return_animal","report","decline"]},
    {id:"konoha_alpha_memorial_record_request",pool:STANDING,host:"KON-O04",category:"INVESTIGATION",reward:0,actions:["locate_inscription","compare_reference","listen","decline"]},
    {id:"konoha_alpha_academy_lost_equipment",pool:STANDING,host:"KON-P06",secondary:"KON-O17",category:"INVESTIGATION",reward:0,actions:["hear_report","inspect_last_known","recover_equipment","return_equipment","report","decline"]},
    {id:"konoha_alpha_training_observation_drill",pool:STANDING,host:"KON-P07",category:"TRAINING_DEVELOPMENT",reward:0,actions:["accept","observe","record_details","report","end"]},
    {id:"fire_arc1_pressure_marked_residence",pool:PRESSURE,host:"KON-P09",category:"INVESTIGATION",reward:0,finite:true,actions:["inspect_mark","watch","ask_occupant","remove_or_alter","report","ignore"]},
    {id:"fire_arc1_pressure_records_tampering",pool:PRESSURE,host:"KON-P01",category:"INVESTIGATION",reward:0,finite:true,actions:["inspect_entry","compare_record","question_custodian","preserve_tamper","report"]},
    {id:"fire_arc1_pressure_rooftop_observer",pool:PRESSURE,host:"KON-P09",category:"INVESTIGATION",reward:0,finite:true,actions:["approach","flank_if_route","pretend_unaware","observe_target","report","leave"]},
    {id:"fire_arc1_pressure_false_patrol",pool:PRESSURE,host:"KON-P10",category:"INVESTIGATION",reward:0,finite:true,actions:["accept_explanation","verify_credentials","route_question","observe_or_follow","challenge","report_or_leave"]},
    {id:"konoha_resp_false_identity_gate_ledger",pool:RESPONSIVE,host:"KON-P10",category:"INVESTIGATION",reward:0,finite:true,requires:["skill_false_identity","false_profile"],actions:["answer_ordinary","use_false_profile","preserve_contradiction","leave"]},
    {id:"konoha_resp_false_identity_counterwatch",pool:RESPONSIVE,host:"KON-P09",alternate:"KON-O15",category:"INVESTIGATION",reward:0,finite:true,requires:["skill_false_identity","false_profile","skill_counter_surveillance_habit"],actions:["observe_tail","preserve_alias","misdirect_legal","confront","report","leave"]},
    {id:"konoha_resp_false_identity_fuin_ward",pool:RESPONSIVE,host:"KON-P05",category:"DISCOVERY",reward:0,finite:true,requires:["skill_false_identity","false_profile","skill_seal_pattern_literacy"],actions:["inspect_ward","profile_query","compare_structure","leave_unchanged","report_discrepancy"]},
    {id:"konoha_resp_medical_poison_recovery",pool:RESPONSIVE,host:"KON-P03",category:"INVESTIGATION",reward:0,finite:true,requires:["skill_medical_triage_instinct","skill_poison_symptom_recognition"],actions:["assess","recognise_possible_poison","preserve_sample","call_authority","decline"]},
    {id:"konoha_resp_tracking_evidence_three_trails",pool:RESPONSIVE,host:"KON-O15",category:"INVESTIGATION",reward:0,finite:true,requires:["skill_scent_pursuit","skill_evidence_thread_reconstruction","evidence_2_3"],actions:["pursue_scent","compare_evidence","reconstruct_sequence","report","stop"]},
    {id:"konoha_resp_fuin_barrier_service_ward",pool:RESPONSIVE,host:"KON-O20",category:"DISCOVERY",reward:0,finite:true,requires:["skill_seal_pattern_literacy","skill_barrier_recognition_intuition"],actions:["inspect_pattern","observe_recognition","record_response","report","leave"]},
    {id:"konoha_resp_byakugan_peripheral_discrepancy",pool:RESPONSIVE,host:"KON-O09",category:"TRAINING_DEVELOPMENT",reward:0,finite:true,requires:["skill_byakugan_peripheral_detail","active_byakugan_context"],actions:["authorised_observation","report_peripheral_detail","compare_ordinary_view","end_observation"]},
    {id:"konoha_alpha_eastern_drainage_trace",pool:STANDING,host:"KON-O16",category:"DISCOVERY",reward:0,finite:true,actions:["inspect_trace","preserve_report","follow_public_route","leave"]}
  ]);

  const FINAL_ACTIONS=new Set([
    "complete_delivery","return_sender","decline","return_parcel","leave","deliver_supplies","report_delay","return_satchel","report_location",
    "complete_logistics","report_discrepancy","assist_dispatch","report","formal_report","complete_civic_assistance","return_animal","end","ignore",
    "report_or_leave","stop","call_authority","leave_unchanged","preserve_report"
  ]);
  const PUBLIC_HOST=/^KON-P(?:0[1-9]|1[0-2])$/;
  const clone=value=>{try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}catch(_){return value;}};
  const history=()=>playerData&&Array.isArray(playerData.activityHistory)?playerData.activityHistory:[];
  const runtimeState=(id,dimension)=>typeof getWorldEventDimensionState==="function"?(getWorldEventDimensionState(dimension,id)||{}):{};
  const hasCommitted=id=>history().some(row=>row&&row.committed===true&&(row.id===id||row.occurrenceId===id||row.sourceEventId===id));
  const save=()=>{if(typeof savePlayerData==="function")savePlayerData();else if(typeof saveTestState==="function")saveTestState();};

  function getLocation(locationId){return typeof getAlphaKonohaV3Location==="function"?getAlphaKonohaV3Location(locationId):null;}
  function knowledgeState(locationId){
    if(PUBLIC_HOST.test(String(locationId||"")))return"identified";
    if(typeof getAlphaKonohaV3ExplicitKnowledgeState!=="function")return null;
    return getAlphaKonohaV3ExplicitKnowledgeState(locationId)||null;
  }
  function hostKnownAccessible(locationId){
    const state=knowledgeState(locationId);
    return ["identified","actionable"].includes(state)||PUBLIC_HOST.test(String(locationId||""));
  }
  function freePlayAvailable(){
    try{
      const acquisition=typeof ensurePlayerAcquisitionState==="function"?ensurePlayerAcquisitionState():null;
      if(typeof isAcademyTeamFormationJourneyBlockingFreePlay==="function"&&isAcademyTeamFormationJourneyBlockingFreePlay(acquisition))return false;
      if(typeof isGeninRosterTransitionPending==="function"&&isGeninRosterTransitionPending())return false;
    }catch(_){return false;}
    return true;
  }

  function capability(ref){
    if(typeof globalThis.SC_KONOHA_WORLD_112_CAPABILITY_RESOLVER==="function"){
      try{return globalThis.SC_KONOHA_WORLD_112_CAPABILITY_RESOLVER(ref)===true;}catch(_){return false;}
    }
    const candidates=["hasSkillAccess","playerHasSkillAccess","hasLearnedSkill","isSkillLearned"];
    if(String(ref).startsWith("skill_")){
      for(const name of candidates){const fn=globalThis[name];if(typeof fn==="function"){try{if(fn(ref)===true)return true;}catch(_){}}}
      return false;
    }
    if(ref==="false_profile")return history().some(r=>r&&r.committed===true&&((r.data&&r.data.falseProfileActive===true)||r.type==="false_profile_committed"||r.sourceEventId==="false_profile"));
    if(ref==="active_byakugan_context")return history().some(r=>r&&r.committed===true&&r.data&&r.data.activeByakuganContext===true&&r.data.active!==false);
    if(ref==="evidence_2_3"){
      const evidence=new Set();history().forEach(r=>{if(!r||r.committed!==true)return;const refs=[...(r.evidenceRefs||[]),...((r.data&&r.data.evidenceRefs)||[])];refs.filter(Boolean).forEach(x=>evidence.add(typeof x==="string"?x:(x.id||x.ref||JSON.stringify(x))));});
      return evidence.size>=2&&evidence.size<=3;
    }
    return false;
  }
  function rowEligible(row){
    if(!row||!freePlayAvailable()||!hostKnownAccessible(row.host))return false;
    if(row.pool===PRESSURE&&!(typeof isAlphaArc1Mission1Complete==="function"&&isAlphaArc1Mission1Complete()===true))return false;
    return !(row.requires||[]).some(ref=>!capability(ref));
  }

  function isActive(row){
    const life=runtimeState(row.id,"worldLifecycleByEventId"),action=runtimeState(row.id,"actionabilityByOpportunityId"),resolution=runtimeState(row.id,"resolutionByOpportunityId");
    return life.projectable===true&&action.available!==false&&resolution.closed!==true;
  }
  function nextOccurrence(row){const prior=runtimeState(row.id,"resolutionByOpportunityId");const sequence=(Number(prior.sequence)||0)+1;return{prior,sequence,occurrenceId:`${row.id}::${sequence}`};}
  function appendHistory(record){
    if(!playerData||!Array.isArray(playerData.activityHistory))return false;
    if(record.id&&history().some(r=>r&&r.committed===true&&(r.id===record.id||r.occurrenceId===record.id)))return false;
    playerData.activityHistory.push(record);return true;
  }

  function setActiveOccurrence(row,{saveState=false}={}){
    if(!rowEligible(row)||isActive(row))return false;
    const {prior,sequence,occurrenceId}=nextOccurrence(row);
    if(row.finite===true&&prior.everClosed===true)return false;
    setWorldEventLifecycle(row.id,{projectable:true,active:true,manifestId:MANIFEST_ID},{save:false});
    setOpportunityDiscovery(row.id,{level:"discovered",label:LABELS[row.id]||row.id},{save:false});
    setOpportunityActionability(row.id,{available:true,reason:null,reasonVisible:false},{save:false});
    setOpportunityResolution(row.id,{occurrenceId,sequence,closed:false,visibleState:"active",rewardGranted:false,everClosed:prior.everClosed===true},{save:false});
    setOpportunityTracking(row.id,{tracked:false,leadState:"active",mandatory:false},{save:false});
    appendHistory({id:`${occurrenceId}:known`,occurrenceId:`${occurrenceId}:known`,committed:true,type:"opportunity_known",locationId:row.host,data:{opportunityId:row.id,worldOccurrenceId:occurrenceId,manifestId:MANIFEST_ID},sourceRefs:[{type:"world_opportunity",id:row.id,role:"activation"},{type:"location",id:row.host,role:"host"}],timestamp:Date.now()});
    if(saveState)save();
    return true;
  }

  function baselineActivation({saveState=true}={}){
    if(!freePlayAvailable())return{success:false,reason:"konoha_free_play_not_available",activated:0};
    let count=ROWS.filter(row=>row.pool===STANDING&&isActive(row)).length;
    const hostCounts=new Map();ROWS.filter(row=>row.pool===STANDING&&isActive(row)).forEach(row=>hostCounts.set(row.host,(hostCounts.get(row.host)||0)+1));
    let activated=0;
    for(const row of ROWS.filter(row=>row.pool===STANDING&&!isActive(row))){
      if(count>=4)break;if(!rowEligible(row)||(hostCounts.get(row.host)||0)>=2)continue;
      if(setActiveOccurrence(row)){count++;activated++;hostCounts.set(row.host,(hostCounts.get(row.host)||0)+1);}
    }
    if(saveState&&activated)save();
    return{success:true,activated,activeStanding:count};
  }
  function responsiveActivation({saveState=true}={}){
    let count=ROWS.filter(row=>row.pool===RESPONSIVE&&isActive(row)).length,activated=0;
    for(const row of ROWS.filter(row=>row.pool===RESPONSIVE&&!isActive(row))){if(count>=2)break;if(setActiveOccurrence(row)){count++;activated++;}}
    if(saveState&&activated)save();return{success:true,activated,activeResponsive:count};
  }

  function resolveAction(row,actionId){
    if(!row||!row.actions.includes(actionId))return{success:false,reason:"world_action_not_authored"};
    if(!isActive(row))return{success:false,reason:"world_opportunity_not_active"};
    const resolution=runtimeState(row.id,"resolutionByOpportunityId");
    const occurrenceId=resolution.occurrenceId||`${row.id}::${Number(resolution.sequence)||1}`;
    const actionReceipt=`${occurrenceId}:action:${actionId}`;
    const duplicate=history().some(r=>r&&r.committed===true&&(r.id===actionReceipt||r.occurrenceId===actionReceipt));
    if(!duplicate)appendHistory({id:actionReceipt,occurrenceId:actionReceipt,committed:true,type:"world_opportunity_action",locationId:row.host,data:{opportunityId:row.id,worldOccurrenceId:occurrenceId,actionId,manifestId:MANIFEST_ID},sourceRefs:[{type:"world_opportunity",id:row.id,role:"action"}],timestamp:Date.now()});

    let rewardGranted=false,rewardAmount=0;
    if(row.reward>0&&row.rewardAction===actionId&&resolution.rewardGranted!==true){
      playerData.ryo=(Number(playerData.ryo)||0)+row.reward;
      rewardGranted=true;rewardAmount=row.reward;
    }
    const finalAction=actionId===row.rewardAction||FINAL_ACTIONS.has(actionId);
    if(finalAction){
      setWorldEventLifecycle(row.id,{projectable:false,active:false,manifestId:MANIFEST_ID},{save:false});
      setOpportunityActionability(row.id,{available:false,reason:"occurrence_closed",reasonVisible:true},{save:false});
      setOpportunityResolution(row.id,{occurrenceId,sequence:Number(resolution.sequence)||1,closed:true,visibleState:"closed",rewardGranted:resolution.rewardGranted===true||rewardGranted,everClosed:true,closedByActionId:actionId},{save:false});
      setOpportunityTracking(row.id,{tracked:false,leadState:"closed",mandatory:false},{save:false});
      appendHistory({id:`${occurrenceId}:closed`,occurrenceId:`${occurrenceId}:closed`,committed:true,type:"opportunity_resolved",locationId:row.host,data:{opportunityId:row.id,worldOccurrenceId:occurrenceId,actionId,rewardGranted,rewardAmount,manifestId:MANIFEST_ID},sourceRefs:[{type:"world_opportunity",id:row.id,role:"resolution"}],timestamp:Date.now()});
    } else {
      setOpportunityResolution(row.id,{occurrenceId,sequence:Number(resolution.sequence)||1,closed:false,visibleState:"active",rewardGranted:resolution.rewardGranted===true||rewardGranted,everClosed:resolution.everClosed===true,lastActionId:actionId},{save:false});
    }
    save();
    return{success:true,opportunityId:row.id,occurrenceId,actionId,closed:finalAction,rewardGranted,rewardAmount,worldOnly:true};
  }

  function registerRow(row){
    if(typeof registerWorldEventOpportunity!=="function")return{success:false,reason:"world_opportunity_registry_missing"};
    const family=row.pool===PRESSURE?"Known Threat":row.category==="TRAINING_DEVELOPMENT"?"Development":row.category==="DISCOVERY"?"Discovery":"World Activity";
    return registerWorldEventOpportunity({
      opportunityId:row.id,eventId:row.id,hotspotId:`konoha112_${row.id}`,locationId:"konohagakure",regionKey:"fire",sourceKind:"authored",randomPoolEligible:row.pool!==PRESSURE,
      defaultDiscoveryLevel:"undiscovered",presentation:{family,category:row.category,label:LABELS[row.id]||row.id,summary:"A current Konoha opportunity recorded by World authority.",showUnknownMarker:false},
      evaluateProjection:()=>isActive(row)&&rowEligible(row),
      interactions:row.actions.map(actionId=>({id:actionId,label:actionId.replaceAll("_"," ").toUpperCase(),kind:row.category==="TRAINING_DEVELOPMENT"?"training":row.category==="DISCOVERY"?"discovery":"investigation",evaluateAvailability:()=>({available:isActive(row)&&rowEligible(row)}),resolve:()=>resolveAction(row,actionId)}))
    });
  }
  ROWS.forEach(registerRow);

  function currentKnownRows(){return ROWS.filter(row=>{const d=runtimeState(row.id,"observerDiscoveryByOpportunityId"),r=runtimeState(row.id,"resolutionByOpportunityId");return d.level&&d.level!=="undiscovered"||r.everClosed===true;});}
  function getWorldInfoProjection112(surfaceId="konohagakure"){
    if(String(surfaceId)!=="konohagakure")return null;
    const extraKnown=[],extraVerified=[];
    if(typeof ALPHA_KONOHA_V3_AUTHORITY!=="undefined"){
      [...(ALPHA_KONOHA_V3_AUTHORITY.optionalLocations||[]),...(ALPHA_KONOHA_V3_AUTHORITY.secretLocations||[]).slice(1)].forEach(location=>{
        const state=knowledgeState(location.id);if(!state||state==="unrecognised"||state==="known_unknown"||state==="known_restricted")return;
        extraKnown.push(location.id);if(["identified","actionable"].includes(state))extraVerified.push(location.id);
      });
    }
    const knownRows=currentKnownRows(),closedRows=knownRows.filter(row=>{const r=runtimeState(row.id,"resolutionByOpportunityId");return r.closed===true||r.everClosed===true;});
    const active=ROWS.filter(row=>isActive(row)&&rowEligible(row));
    const leadAdded=new Set(),leadClosed=new Set();
    const allowedFeed=new Set(["location_known","location_identified","location_verified","known_unknown_detected","opportunity_known","opportunity_resolved","lead_added","lead_closed","knowledge_recorded","access_changed","story_locator_changed"]);
    history().forEach(r=>{if(!r||r.committed!==true)return;if(r.type==="lead_added")leadAdded.add(r.data&&r.data.leadId||r.id);if(r.type==="lead_closed")leadClosed.add(r.data&&r.data.leadId||r.id);});
    const tracked=ROWS.filter(row=>runtimeState(row.id,"trackingByOpportunityId").tracked===true).map(row=>row.id);
    return{
      schemaVersion:INFO_SCHEMA,surfaceId:"konohagakure",surfaceKind:"village",surfaceDisplayName:"Hidden Leaf Village",projectionRevision:MANIFEST_ID,
      publicLandmarks:{knownCount:12,legalPublicTotal:12},
      knownLocationProgress:{verifiedCount:12+extraVerified.length,currentKnownRecordCount:12+extraKnown.length},
      knownRestrictedCount:typeof getAlphaKonohaV3ExplicitKnowledgeState==="function"?["KON-S01"].filter(id=>["known_restricted","identified","actionable"].includes(knowledgeState(id))).length:1,
      activeOpportunityCount:active.length,
      knownOpportunityProgress:{closedCount:closedRows.length,currentKnownRecordCount:knownRows.length},
      knownLeadProgress:{closedCount:leadClosed.size,currentKnownLeadCount:new Set([...leadAdded,...leadClosed]).size},
      recentRecordUpdates:history().filter(r=>r&&r.committed===true&&allowedFeed.has(r.type)).slice(-8).map(clone),
      trackedOpportunityRefs:tracked
    };
  }

  const LOCATORS=Object.freeze({
    2:{locatorRef:"story_locator_arc1_m2_warehouse",host:"KON-O19",local:"arc1_m2_warehouse_site_01"},
    3:{locatorRef:"story_locator_arc1_m3_hospital",host:"KON-P03",local:"arc1_m3_hospital_reference_room_01"},
    4:{locatorRef:"story_locator_arc1_m4_relay_four",host:"KON-O20",local:"arc1_m4_relay_four_site_01"},
    5:{locatorRef:"story_locator_arc1_m5_third_bell",host:"KON-P06",local:"arc1_m5_third_bell_chamber_01"},
    6:{locatorRef:"story_locator_arc1_m6_archive",host:"KON-P01",local:"arc1_m6_archive_site_01"},
    7:{locatorRef:"story_locator_arc1_m7_dead_transfer",host:"KON-O19",local:"arc1_m7_dead_transfer_site_01"},
    9:{locatorRef:"story_locator_arc1_m9_veterinary_lead",host:"KON-O21",local:"arc1_veterinary_ward_facility_01"},
    10:{locatorRef:"story_locator_arc1_m10_veterinary_facility",host:"KON-O21",local:"arc1_veterinary_ward_facility_01"},
    11:{locatorRef:"story_locator_arc1_m11_pump_four",host:"KON-O20",local:"arc1_m11_pump_four_lower_service_instance"},
    12:{locatorRef:"story_locator_arc1_m12_better_host",host:"KON-O20",local:"arc1_m12_better_host_lower_chamber_instance"}
  });
  function noFocus(missionId=null){return{schemaVersion:LOCATOR_SCHEMA,locatorRef:missionId?`story_locator_${missionId}_no_current_focus`:"story_locator_none",missionId,locatorState:"NO_CURRENT_MAP_FOCUS",surfaceId:null,hostLocationRef:null,localInstanceRef:null,focusMode:"none",knowledgeGateRefs:[],accessGateRefs:[],storyResumeSceneId:null,currentChoiceId:null};}
  function getCurrentWorldStoryLocator112(){
    if(typeof getAlphaTailedBeastJourneyState!=="function")return noFocus(null);
    let journey=null;try{journey=getAlphaTailedBeastJourneyState();}catch(_){return noFocus(null);}if(!journey)return noFocus(null);
    if(journey.arc2MissionId==="arc2_m2_the_leak"||journey.storyStateClass==="authoring_checkpoint")return{schemaVersion:LOCATOR_SCHEMA,locatorRef:ARC2_WITHHELD,missionId:"arc2_m2_the_leak",locatorState:"WITHHELD_AUTHORING_CHECKPOINT",surfaceId:null,hostLocationRef:null,localInstanceRef:null,focusMode:"none",knowledgeGateRefs:[],accessGateRefs:[],storyResumeSceneId:null,currentChoiceId:null};
    if(journey.arc1Complete)return{...noFocus("arc1_story_complete"),locatorState:"COMPLETED",locatorRef:"story_locator_arc1_completed"};
    if(!journey.operationalGenin)return noFocus(null);
    const mission=Number(journey.nextMission)||1;
    if(mission===1){
      const actionable=typeof Mission1WhisperApproachActionable==="function"&&Mission1WhisperApproachActionable(journey.originId)===true;
      if(!actionable)return noFocus("arc1_m1_whisper_woods");
      return{schemaVersion:LOCATOR_SCHEMA,locatorRef:"story_locator_arc1_m1_whisper_woods",missionId:"arc1_m1_whisper_woods",locatorState:"ACTIVE_LOCAL_INSTANCE",surfaceId:"fire",hostLocationRef:"fire:O21",localInstanceRef:"whisper_woods",focusMode:"local_instance",knowledgeGateRefs:["arc1_m1_caravan_three_person_trace_confirmed"],accessGateRefs:["Mission1WhisperApproachActionable"],storyResumeSceneId:null,currentChoiceId:null};
    }
    if(mission===8)return noFocus("arc1_m8_sanitisation_chain");
    const def=LOCATORS[mission];if(!def)return noFocus(`arc1_m${mission}`);
    if(!hostKnownAccessible(def.host))return noFocus(`arc1_m${mission}`);
    return{schemaVersion:LOCATOR_SCHEMA,locatorRef:def.locatorRef,missionId:`arc1_m${mission}`,locatorState:"ACTIVE_LOCAL_INSTANCE",surfaceId:"konoha",hostLocationRef:def.host,localInstanceRef:def.local,focusMode:"host_and_local_instance",knowledgeGateRefs:[def.host],accessGateRefs:[],storyResumeSceneId:null,currentChoiceId:null};
  }

  function overlayClass(row){if(row.pool===PRESSURE)return"KNOWN_THREAT";if(row.category==="TRAINING_DEVELOPMENT")return"DEVELOPMENT";if(row.category==="DISCOVERY"||row.category==="INVESTIGATION")return"RECORD_DISCOVERY";return"WORLD_ACTIVE";}
  function getKonohaWorldOverlayProjection112(){
    const opportunities=ROWS.filter(row=>isActive(row)&&rowEligible(row)).map(row=>({opportunityId:row.id,hostLocationRef:row.host,label:LABELS[row.id]||row.id,overlayClass:overlayClass(row),category:row.category,pool:row.pool}));
    const locator=getCurrentWorldStoryLocator112();
    const story=locator&&locator.surfaceId==="konoha"&&locator.hostLocationRef?{hostLocationRef:locator.hostLocationRef,overlayClass:"MAIN_STORY",locatorRef:locator.locatorRef,label:"CURRENT STORY"}:null;
    return{schemaVersion:"sc.konohaWorldOverlayProjection.v1",opportunities,story};
  }

  function commitKonohaS02SuspicionTrace112({worldOccurrenceId=null,sourceRefs=[],worldTruthSupportsSuspicion=false}={}){
    if(worldTruthSupportsSuspicion!==true||!worldOccurrenceId)return{success:false,reason:"exact_world_truth_support_required"};
    const row=ROWS.find(r=>r.id==="konoha_alpha_eastern_drainage_trace"),resolution=runtimeState(row.id,"resolutionByOpportunityId");
    if(String(resolution.occurrenceId||"")!==String(worldOccurrenceId))return{success:false,reason:"eastern_drainage_occurrence_mismatch"};
    const id=`${worldOccurrenceId}:konoha_s02_suspicion_trace`;
    if(hasCommitted(id))return{success:true,idempotent:true,occurrenceId:id};
    appendHistory({id,occurrenceId:id,committed:true,type:"known_unknown_detected",locationId:"KON-S02",data:{konohaSpatialKnowledgeState:"known_unknown",clueId:"konoha_s02_suspicion_trace",canonicalIdentityRevealed:false,accessGranted:false},sourceRefs:[{type:"world_opportunity",id:row.id,role:"source"},...clone(sourceRefs)],timestamp:Date.now()});
    save();return{success:true,idempotent:false,occurrenceId:id};
  }

  function ensureInitialActivation(){
    if(hasCommitted(ACTIVATION_RECEIPT))return{success:true,idempotent:true};
    if(!freePlayAvailable())return{success:false,reason:"konoha_free_play_not_available"};
    const baseline=baselineActivation({saveState:false});responsiveActivation({saveState:false});
    appendHistory({id:ACTIVATION_RECEIPT,occurrenceId:ACTIVATION_RECEIPT,committed:true,type:"world_activation",locationId:"konohagakure",data:{manifestId:MANIFEST_ID,activatedStanding:baseline.activated},sourceRefs:[{type:"world_manifest",id:MANIFEST_ID,role:"authority"}],timestamp:Date.now()});
    save();return{success:true,idempotent:false,baseline};
  }
  ensureInitialActivation();

  function runIssue112RecoveredCoreDiagnostics(){
    const ids=ROWS.map(r=>r.id),checks={
      schemas:INFO_SCHEMA==="sc.worldInfoProjection.v1"&&LOCATOR_SCHEMA==="sc.worldStoryLocator.v1",
      manifest:MANIFEST_ID==="sc_world_alpha_activation_konoha_v1_2026_09_11",
      exact24Rows:ROWS.length===24&&new Set(ids).size===24,
      exactPools:ROWS.filter(r=>r.pool===STANDING).length===13&&ROWS.filter(r=>r.pool===PRESSURE).length===4&&ROWS.filter(r=>r.pool===RESPONSIVE).length===7,
      easternDrainagePresent:ids.includes("konoha_alpha_eastern_drainage_trace")&&ROWS.find(r=>r.id==="konoha_alpha_eastern_drainage_trace").host==="KON-O16",
      noBattleActions:ROWS.every(r=>r.actions.every(a=>!/battle|engage|attack/i.test(a))),
      rewardRowsExact:ROWS.filter(r=>r.reward>0).length===9,
      arc2Withheld:getCurrentWorldStoryLocator112.toString().includes("WITHHELD_AUTHORING_CHECKPOINT"),
      knownUnknownRequiresExactCommit:commitKonohaS02SuspicionTrace112.toString().includes("worldTruthSupportsSuspicion!==true"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
    return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false,recoveredFromCorruptBlob:true};
  }

  globalThis.SC_KONOHA_ALPHA_WORLD_ROWS=ROWS;
  globalThis.SC_KONOHA_ALPHA_WORLD_MANIFEST_ID=MANIFEST_ID;
  globalThis.getKonohaAlphaWorldInfoProjection=getWorldInfoProjection112;
  globalThis.getAlphaVillageRegionInfoProjection=getWorldInfoProjection112;
  globalThis.getCurrentWorldStoryLocator=getCurrentWorldStoryLocator112;
  globalThis.getKonohaWorldOverlayProjection112=getKonohaWorldOverlayProjection112;
  globalThis.commitKonohaS02SuspicionTrace112=commitKonohaS02SuspicionTrace112;
  globalThis.ensureKonohaAlphaWorldInitialActivation112=ensureInitialActivation;
  globalThis.runIssue112RecoveredCoreDiagnostics=runIssue112RecoveredCoreDiagnostics;
})();
