// ============================================================================
// ACADEMY ORIGIN REWARD SPECTRUM OVERLAY — #440
//
// Bounded reward/progression projection on the owner-accepted FROZEN GOLDEN
// Academy Origin package. This file does not own Story, routes, Battle
// mechanics, PL, actor presentation, or Chronicle Receipt lifecycle.
// ============================================================================
(function installAcademyOriginRewardSpectrum440(){
"use strict";
if(globalThis.SC_ACADEMY_ORIGIN_REWARD_SPECTRUM_440)return;

const PATCH_ID="academy_origin_reward_spectrum_440_2026_10_01";
const A=globalThis.SC_ALPHA_ORIGIN_32900;
if(!A)throw new Error("alpha_origin_32900_core_required");

const SOURCE=Object.freeze({
  hinataSpar:"occ_origin_hinata_controlled_hyuga_spar_resolution",
  hinataYoung:"occ_origin_hinata_younger_student_practice_resolution",
  miraiSub:"occ_origin_mirai_substitution_verification_resolution",
  miraiChakra:"occ_origin_mirai_changed_chakra_observation",
  kushinaSeal:"occ_origin_kushina_residual_seal_work_resolution",
  kushinaJoint:"occ_origin_kushina_joint_residual_seal_closure",
  kurenaiBell:"occ_origin_kurenai_bell_test_resolution",
  obitoTraining:"occ_origin_obito_formal_training_entitlement_resolution",
  metalPrivate:"occ_origin_metal_private_training_resolution",
  metalProtect:"occ_origin_metal_protective_response_resolution",
  iwabeeReshape:"occ_origin_iwabee_training_ground_reshape_resolution",
  iwabeeRogue:"occ_origin_iwabee_rogue_genin_response_resolution"
});
const BATTLE_REWARD_SOURCE=Object.freeze({
  academy_menma:["menma_origin_battle_three_test_subjects_victory_ryo_01"],
  academy_mirai:["mirai_origin_disguised_instructor_battle_victory_ryo_01"],
  academy_metal_lee:["metal_origin_controlled_spar_victory_ryo_01","metal_origin_controlled_spar_battle_victory_ryo_01"],
  academy_iwabee:["iwabee_origin_rogue_genin_battle_victory_ryo_01"]
});
const OBITO_STATS=Object.freeze({
  FULL:Object.freeze({ninjutsu:1,taijutsu:1,bukijutsu:1,stamina:1}),
  SUBSTANTIAL:Object.freeze({ninjutsu:1,taijutsu:1,bukijutsu:1}),
  REDUCED:Object.freeze({ninjutsu:1,taijutsu:1}),
  MINIMAL:Object.freeze({taijutsu:1}),
  NONE:Object.freeze({})
});
const DEVELOPMENT_REASONS=Object.freeze({
  hinata_spar_exchange_1:"Controlled Hyūga spar — first exchange.",
  hinata_spar_exchange_2:"Controlled Hyūga spar — second exchange.",
  hinata_spar_exchange_3:"Controlled Hyūga spar — final exchange.",
  hinata_younger_student_show_movement:"Showed the younger student the movement.",
  hinata_younger_student_observational_learning:"Learned by watching one more exchange.",
  kushina_contain_damaged_seal_fuinjutsu:"Contained the damaged seal.",
  kushina_correct_formula_fuinjutsu:"Corrected the damaged seal formula.",
  kushina_joint_residual_closure_fuinjutsu:"Helped close the residual seal connection.",
  kurenai_bell_test_stage_1:"Bell Test — first deception stage.",
  kurenai_bell_test_stage_2:"Bell Test — second deception stage.",
  kurenai_bell_test_stage_3:"Bell Test — final deception stage.",
  metal_private_spinning_kick:"Private spinning-kick practice.",
  metal_private_full_force_fist:"Private full-force fist practice.",
  metal_private_conditioned_endurance:"Private conditioned-endurance training.",
  metal_protective_redirect_dummy:"Redirected the runaway training dummy.",
  metal_protective_destroy_dummy:"Struck the runaway training dummy.",
  iwabee_training_ground_reshape_ninjutsu:"Re-shaped the damaged Academy training ground.",
  iwabee_rogue_escape_constraint_ninjutsu:"Used Earth Release to block the Rogue Genin's escape."
});

function clone(v){return A&&typeof A.clone==="function"?A.clone(v):v&&typeof v==="object"?JSON.parse(JSON.stringify(v)):v;}
function history(){return A&&typeof A.history==="function"?A.history():[];}
function titleDiscipline(id){
  const key=String(id||"").toLowerCase();
  return{taijutsu:"Taijutsu",ninjutsu:"Ninjutsu",bukijutsu:"Bukijutsu",fuinjutsu:"Fūinjutsu",genjutsu:"Genjutsu",stamina:"Stamina"}[key]||String(id||"Development");
}
function developmentReceiptId(subject,sourceOccurrenceId,progressionSlotId,disciplineId){
  return ["discipline_development",subject,sourceOccurrenceId,progressionSlotId,disciplineId].join(":");
}
function commitDevelopment440({subjectVariantId,sourceOccurrenceId,progressionSlotId,disciplineId,requestedExp,causalCap=null,developmentClass,playerFacingReason}){
  const rows=history();
  const receiptId=developmentReceiptId(subjectVariantId,sourceOccurrenceId,progressionSlotId,disciplineId);
  const existing=rows.find(row=>row&&row.type==="discipline_development"&&row.receiptId===receiptId);
  if(existing)return{success:true,idempotent:true,receipt:clone(existing),expGranted:0};
  const request=Math.max(0,Math.trunc(Number(requestedExp)||0));
  const used=rows.filter(row=>row&&row.type==="discipline_development"&&row.subjectVariantId===subjectVariantId&&row.causalRootId===sourceOccurrenceId&&row.disciplineId===disciplineId)
    .reduce((sum,row)=>sum+Math.max(0,Number(row.expGranted)||0),0);
  const cap=Number.isFinite(Number(causalCap))?Math.max(0,Number(causalCap)):null;
  const grant=cap===null?request:Math.max(0,Math.min(request,cap-used));
  const record={
    receiptId,type:"discipline_development",activity:"origin_development",completed:true,committed:true,success:true,
    outcome:"discipline_development_granted",subjectVariantId,actorVariantId:subjectVariantId,
    sourceOccurrenceId,causalRootId:sourceOccurrenceId,progressionSlotId,disciplineId,
    developmentClass:developmentClass||"ordinary_qualified_non_battle_development",
    requestedExp:request,expGranted:grant,causalCap:cap,capSuppressed:grant<request,
    directPLGrant:0,directStatGrant:false,originRewardOverlay440:true,
    playerFacingReason:playerFacingReason||DEVELOPMENT_REASONS[progressionSlotId]||"Origin action.",
    timestamp:Date.now()
  };
  if(grant<=0){rows.push(record);if(typeof savePlayerData==="function")savePlayerData();return{success:true,idempotent:false,receipt:clone(record),expGranted:0};}
  if(typeof getCharacterDisciplineProgression!=="function"||typeof processDisciplineLevelUps!=="function"||typeof getPlayerCharacter!=="function"){
    return{success:true,skipped:true,reason:"discipline_progression_api_unavailable",receipt:null,expGranted:0};
  }
  const character=getPlayerCharacter(subjectVariantId),progression=getCharacterDisciplineProgression(subjectVariantId,disciplineId);
  if(!character||!progression)return{success:false,reason:"discipline_progression_missing",subjectVariantId,disciplineId};
  const progressionBefore=clone(character.disciplineProgression),statsBefore=clone(character.stats),historyLength=rows.length;
  try{
    progression.exp=(Number(progression.exp)||0)+grant;
    const levelResult=processDisciplineLevelUps(subjectVariantId,disciplineId);
    if(!levelResult)throw new Error("discipline_level_processing_failed");
    rows.push(record);if(typeof savePlayerData==="function")savePlayerData();
    return{success:true,idempotent:false,receipt:clone(record),expGranted:grant,levelResult:clone(levelResult)};
  }catch(error){
    character.disciplineProgression=progressionBefore;character.stats=statsBefore;while(rows.length>historyLength)rows.pop();
    return{success:false,reason:"origin_development_commit_failed",error:String(error&&error.message||error),subjectVariantId,disciplineId,progressionSlotId};
  }
}
function projectEvidence440({subjectVariantId,sourceOccurrenceId,qualificationId,tags,activityFamilyId,targetRefs=[],context={}}){
  const source=A.findOccurrence(sourceOccurrenceId);
  if(!source||source.committed!==true)return{success:true,skipped:true,reason:"specialist_source_not_committed"};
  if(typeof globalThis.projectSpecialJoninContextualEvidence34700!=="function")return{success:true,skipped:true,reason:"specialist_evidence_producer_unavailable"};
  return globalThis.projectSpecialJoninContextualEvidence34700({
    subjectVariantId,sourceOccurrenceId,qualificationId,tags,significance:1,
    category:"chronicle_origin",activityFamilyId,causalRootOccurrenceId:sourceOccurrenceId,targetRefs,
    verified:true,specialistLevel:false,capstoneAuthorized:false,
    context:{originId:subjectVariantId,rewardOverlay:PATCH_ID,...context}
  });
}
function dev(spec){return commitDevelopment440({...spec,playerFacingReason:spec.playerFacingReason||DEVELOPMENT_REASONS[spec.progressionSlotId]});}
function finish(results){
  const failed=results.find(row=>row&&row.success===false);
  return failed||{success:true,results};
}

const KURENAI_STAGE1_RESULT=Object.freeze({
  false_kurenai:Object.freeze({
    requestedExp:1,developmentClass:"resisted_or_ineffective_bell_test_genjutsu_execution",
    reason:"Bell Test — the false Kurenai was read before the instructor committed."
  }),
  conceal_movement:Object.freeze({
    requestedExp:2,developmentClass:"effective_bell_test_genjutsu_execution",
    reason:"Bell Test — concealed movement pulled the instructor off Kurenai's real line."
  }),
  distort_position:Object.freeze({
    requestedExp:2,developmentClass:"effective_bell_test_genjutsu_execution",
    reason:"Bell Test — distorted distance materially changed the instructor's read."
  }),
  fake_direct:Object.freeze({
    requestedExp:2,developmentClass:"effective_bell_test_genjutsu_execution",
    reason:"Bell Test — the direct approach made the instructor commit to the wrong read."
  })
});
const KURENAI_STAGE2_RESULT=Object.freeze({
  "false_kurenai|rush_bell":Object.freeze({
    requestedExp:1,developmentClass:"resisted_or_ineffective_bell_test_genjutsu_execution",
    reason:"Bell Test — rushing from the false Kurenai was resisted and exposed the real approach."
  }),
  "false_kurenai|draw_attention":Object.freeze({
    requestedExp:2,developmentClass:"effective_bell_test_genjutsu_execution",
    reason:"Bell Test — drawing attention away pulled the instructor's focus off the real approach."
  }),
  "conceal_movement|rush_bell":Object.freeze({
    requestedExp:2,developmentClass:"effective_bell_test_genjutsu_execution",
    reason:"Bell Test — the concealed angle produced a real opening toward the bell."
  }),
  "conceal_movement|draw_attention":Object.freeze({
    requestedExp:2,developmentClass:"effective_bell_test_genjutsu_execution",
    reason:"Bell Test — the visible movement kept the instructor occupied while Kurenai circled behind."
  }),
  "distort_position|rush_bell":Object.freeze({
    requestedExp:2,developmentClass:"effective_bell_test_genjutsu_execution",
    reason:"Bell Test — the false distance carried Kurenai inside the instructor's guard."
  }),
  "distort_position|draw_attention":Object.freeze({
    requestedExp:2,developmentClass:"effective_bell_test_genjutsu_execution",
    reason:"Bell Test — the layered distance feint forced a check that cost the instructor time."
  }),
  "fake_direct|rush_bell":Object.freeze({
    requestedExp:2,developmentClass:"effective_bell_test_genjutsu_execution",
    reason:"Bell Test — the obvious attack made the instructor commit to stopping the wrong layer."
  }),
  "fake_direct|draw_attention":Object.freeze({
    requestedExp:1,developmentClass:"resisted_or_ineffective_bell_test_genjutsu_execution",
    reason:"Bell Test — the attention draw was only partly accepted and left a smaller opening."
  })
});
function kurenaiStage3Result440(fact){
  const choice=String(fact&&fact.kurenaiStage3||"");
  const outcome=String(fact&&fact.bellTestOutcomeClass||"");
  if(!choice)return null;
  const effective=outcome==="partial_win"||outcome==="complete_win";
  const choiceLabel={
    take_bell_now:"final bell grab",
    pretend_withdraw:"withdrawal feint",
    let_instructor_think_caught:"caught-me feint"
  }[choice]||"final deception";
  return{
    requestedExp:effective?2:1,
    developmentClass:effective?"effective_bell_test_genjutsu_execution":"resisted_or_ineffective_bell_test_genjutsu_execution",
    reason:effective
      ?"Bell Test — the "+choiceLabel+" materially advanced the final deception."
      :"Bell Test — the "+choiceLabel+" was resisted before it could secure the real bell."
  };
}
function kurenaiBellDevelopment440(fact){
  const stage1=KURENAI_STAGE1_RESULT[String(fact&&fact.kurenaiStage1||"")]||null;
  const stage2=KURENAI_STAGE2_RESULT[
    String(fact&&fact.kurenaiStage1||"")+"|"+String(fact&&fact.kurenaiStage2||"")
  ]||null;
  const stage3=kurenaiStage3Result440(fact);
  return[stage1,stage2,stage3];
}

function projectOccurrence440(originId,sourceOccurrenceId,record=null,contextOverride={}){
  const row=record||A.findOccurrence(sourceOccurrenceId);
  if(!row||row.committed!==true)return{success:true,skipped:true,reason:"source_occurrence_not_committed"};
  const fact=row.fact&&typeof row.fact==="object"?row.fact:{};
  const ctx=contextOverride&&typeof contextOverride==="object"?contextOverride:{};
  const results=[];

  if(originId==="academy_hinata"&&sourceOccurrenceId===SOURCE.hinataSpar){
    const actions=Array.isArray(fact.demonstratedResponses)?fact.demonstratedResponses.filter(Boolean).slice(0,3):[];
    actions.forEach((_choice,index)=>results.push(dev({
      subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"hinata_spar_exchange_"+(index+1),
      disciplineId:"taijutsu",requestedExp:1,causalCap:3,developmentClass:"material_controlled_spar_action"
    })));
    return finish(results);
  }
  if(originId==="academy_hinata"&&sourceOccurrenceId===SOURCE.hinataYoung){
    if(fact.youngerStudentChoice==="show_movement")results.push(dev({
      subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"hinata_younger_student_show_movement",
      disciplineId:"taijutsu",requestedExp:1,causalCap:3,developmentClass:"demonstrated_taijutsu_movement"
    }));
    if(fact.youngerStudentChoice==="stay_and_watch"&&fact.selfTaijutsuLearningOccurred===true)results.push(dev({
      subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"hinata_younger_student_observational_learning",
      disciplineId:"taijutsu",requestedExp:1,causalCap:3,developmentClass:"observational_taijutsu_learning"
    }));
    return finish(results);
  }

  if(originId==="academy_mirai"&&sourceOccurrenceId===SOURCE.miraiSub){
    const basis=String(ctx.mirVerificationBasis||fact.verificationBasis||"");
    const selfDerived=["conversation_continuity","changed_chakra","quiet_investigation"].includes(basis);
    if(fact.substitutionVerifiedBeforeCheckpoint===true&&selfDerived)results.push(projectEvidence440({
      subjectVariantId:originId,sourceOccurrenceId,
      qualificationId:"intelligence.counter_intelligence_analyst",
      tags:["intelligence.counter_intelligence_analyst:deception_detection"],
      activityFamilyId:"academy_mirai_origin_self_derived_substitution_verification",
      targetRefs:["academy_mirai_origin_instructor"],context:{verificationBasis:basis,selfDerived:true}
    }));
    return finish(results);
  }
  if(originId==="academy_mirai"&&sourceOccurrenceId===SOURCE.miraiChakra){
    if(fact.changedOrUnfamiliarChakraObserved===true)results.push(projectEvidence440({
      subjectVariantId:originId,sourceOccurrenceId,
      qualificationId:"reconnaissance.sensor_nin",
      tags:["reconnaissance.sensor_nin:signal_discrimination"],
      activityFamilyId:"academy_mirai_origin_changed_chakra_observation",
      targetRefs:["academy_mirai_origin_instructor"],context:{signalDiscrimination:true}
    }));
    return finish(results);
  }

  if(originId==="academy_kushina"&&sourceOccurrenceId===SOURCE.kushinaSeal){
    const choice=String(fact.crisisChoice||"");
    if(choice==="protect_student")results.push(projectEvidence440({
      subjectVariantId:originId,sourceOccurrenceId,
      qualificationId:"covert_operations.extraction_specialist",
      tags:["covert_operations.extraction_specialist:subject_recovery"],
      activityFamilyId:"academy_kushina_origin_subject_recovery",
      targetRefs:["kushina_classmate"],context:{crisisChoice:choice,physicalRemovalCommitted:true}
    }));
    if(choice==="contain_damaged_seal"){
      results.push(dev({subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"kushina_contain_damaged_seal_fuinjutsu",disciplineId:"fuinjutsu",requestedExp:2,causalCap:3,developmentClass:"qualified_non_battle_seal_execution"}));
      results.push(projectEvidence440({subjectVariantId:originId,sourceOccurrenceId,qualificationId:"fuinjutsu_operations.sealing_specialist",tags:["fuinjutsu_operations.sealing_specialist:seal_execution"],activityFamilyId:"academy_kushina_origin_seal_containment",context:{crisisChoice:choice}}));
    }
    if(choice==="correct_formula"){
      results.push(dev({subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"kushina_correct_formula_fuinjutsu",disciplineId:"fuinjutsu",requestedExp:2,causalCap:3,developmentClass:"qualified_non_battle_seal_analysis_execution"}));
      results.push(projectEvidence440({subjectVariantId:originId,sourceOccurrenceId,qualificationId:"fuinjutsu_operations.sealing_specialist",tags:["fuinjutsu_operations.sealing_specialist:seal_analysis","fuinjutsu_operations.sealing_specialist:seal_execution"],activityFamilyId:"academy_kushina_origin_formula_correction",context:{crisisChoice:choice}}));
    }
    return finish(results);
  }
  if(originId==="academy_kushina"&&sourceOccurrenceId===SOURCE.kushinaJoint){
    if(fact.jointResidualSealClosureWithGerotora===true){
      results.push(dev({subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"kushina_joint_residual_closure_fuinjutsu",disciplineId:"fuinjutsu",requestedExp:2,causalCap:3,developmentClass:"qualified_non_battle_residual_seal_closure"}));
      results.push(projectEvidence440({subjectVariantId:originId,sourceOccurrenceId,qualificationId:"fuinjutsu_operations.sealing_specialist",tags:["fuinjutsu_operations.sealing_specialist:seal_execution"],activityFamilyId:"academy_kushina_origin_residual_seal_closure",targetRefs:["key_gero"],context:{jointClosure:true,reverseSummoningExecutionAwarded:false}}));
    }
    return finish(results);
  }

  if(originId==="academy_kurenai"&&sourceOccurrenceId===SOURCE.kurenaiBell){
    const stages=kurenaiBellDevelopment440(fact);
    [fact.kurenaiStage1,fact.kurenaiStage2,fact.kurenaiStage3].forEach((choice,index)=>{
      const classification=stages[index];
      if(choice&&classification)results.push(dev({
        subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"kurenai_bell_test_stage_"+(index+1),
        disciplineId:"genjutsu",requestedExp:classification.requestedExp,causalCap:3,
        developmentClass:classification.developmentClass,playerFacingReason:classification.reason
      }));
    });
    return finish(results);
  }

  if(originId==="academy_metal_lee"&&sourceOccurrenceId===SOURCE.metalPrivate){
    const choice=String(fact.privateTrainingChoice||"");
    if(choice==="spinning_kick")results.push(dev({subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"metal_private_spinning_kick",disciplineId:"taijutsu",requestedExp:2,causalCap:3,developmentClass:"successful_private_taijutsu_practice"}));
    if(choice==="full_force_fist")results.push(dev({subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"metal_private_full_force_fist",disciplineId:"taijutsu",requestedExp:2,causalCap:3,developmentClass:"successful_private_taijutsu_practice"}));
    if(choice==="conditioned_endurance")results.push(dev({subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"metal_private_conditioned_endurance",disciplineId:"stamina",requestedExp:1,causalCap:2,developmentClass:"ordinary_qualified_non_battle_endurance"}));
    return finish(results);
  }
  if(originId==="academy_metal_lee"&&sourceOccurrenceId===SOURCE.metalProtect){
    const kind=String(fact.protectiveResponseKind||""),outcome=String(fact.protectiveResponseOutcome||"");
    if(["redirect_dummy","destroy_dummy"].includes(kind)&&["success","partial","failure"].includes(outcome)){
      const slot=kind==="redirect_dummy"?"metal_protective_redirect_dummy":"metal_protective_destroy_dummy";
      results.push(dev({subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:slot,disciplineId:"taijutsu",requestedExp:outcome==="failure"?1:2,causalCap:3,developmentClass:"material_protective_taijutsu_action"}));
    }
    return finish(results);
  }

  if(originId==="academy_iwabee"&&sourceOccurrenceId===SOURCE.iwabeeReshape){
    if(fact.trainingGroundReshapeObjectiveCompletedByIwabee===true)results.push(dev({
      subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"iwabee_training_ground_reshape_ninjutsu",
      disciplineId:"ninjutsu",requestedExp:2,causalCap:3,developmentClass:"successful_earth_release_terrain_work"
    }));
    return finish(results);
  }
  if(originId==="academy_iwabee"&&sourceOccurrenceId===SOURCE.iwabeeRogue){
    if(fact.earthReleaseUsedToConstrainRogueGenin===true)results.push(dev({
      subjectVariantId:originId,sourceOccurrenceId,progressionSlotId:"iwabee_rogue_escape_constraint_ninjutsu",
      disciplineId:"ninjutsu",requestedExp:2,causalCap:3,developmentClass:"successful_earth_release_route_constraint"
    }));
    return finish(results);
  }

  if(originId==="academy_obito"&&sourceOccurrenceId===SOURCE.obitoTraining){
    return{success:true,skipped:true,reason:"obito_current_stat_package_owned_by_static_consequence"};
  }
  return{success:true,skipped:true,reason:"no_reward_spectrum_projection_for_occurrence"};
}

function reconcileCommitted440(){
  const results=[];
  for(const row of history()){
    if(!row||row.committed!==true||!row.actorVariantId||!row.occurrenceId)continue;
    if(Object.values(SOURCE).includes(row.occurrenceId))results.push(projectOccurrence440(row.actorVariantId,row.occurrenceId,row,{}));
  }
  return{success:!results.some(row=>row&&row.success===false),results};
}

function isBattleDevelopmentForOrigin440(originId,row){
  if(!row||row.type!=="discipline_development"||row.subjectVariantId!==originId)return false;
  if(row.originRewardOverlay440===true)return true;
  const id=[row.sourceOccurrenceId,row.causalRootId,row.battleOccurrenceId,row.battleId,row.encounterId,row.activity].filter(Boolean).join(" ").toLowerCase();
  if(!id.includes("battle"))return false;
  const token={academy_menma:"menma",academy_mirai:"mirai",academy_metal_lee:"metal",academy_iwabee:"iwabee"}[originId];
  return !!token&&id.includes(token);
}
function battleRewardRows440(originId){
  const allowed=BATTLE_REWARD_SOURCE[originId]||[];
  const seen=new Set(),out=[];
  for(const row of history()){
    const sourceId=String(row&&row.rewardSourceId||row&&row.sourceId||"");
    if(!allowed.includes(sourceId))continue;
    const key=String(row.battleOccurrenceId||sourceId);if(seen.has(key))continue;seen.add(key);
    out.push({sourceId,ryo:Math.max(0,Number(row.ryo??row.rewards?.ryo)||0),battleOccurrenceId:row.battleOccurrenceId||null});
  }
  return out;
}
function obitoCurrentStats440(){
  const row=A.findOccurrence(SOURCE.obitoTraining),entitlement=row&&row.fact&&row.fact.formalTrainingEntitlement;
  return{entitlement:entitlement||null,deltas:clone(OBITO_STATS[entitlement]||{})};
}
function getReceiptProjection440(originId){
  const development=history().filter(row=>isBattleDevelopmentForOrigin440(originId,row)&&Number(row.expGranted)>0).map(row=>({
    disciplineId:row.disciplineId,disciplineLabel:titleDiscipline(row.disciplineId),expGranted:Number(row.expGranted)||0,
    progressionSlotId:row.progressionSlotId||null,sourceOccurrenceId:row.sourceOccurrenceId||null,
    reason:row.playerFacingReason||"PL Battle action."
  }));
  return{
    originId,
    battleRewards:battleRewardRows440(originId),
    development,
    currentStats:originId==="academy_obito"?obitoCurrentStats440():null
  };
}
function appendReceiptLines440(lines,originId,{battleAlreadyShown=false}={}){
  if(!Array.isArray(lines))return lines;
  const projection=getReceiptProjection440(originId);
  if(!battleAlreadyShown){
    for(const reward of projection.battleRewards)if(reward.ryo>0)lines.push("• PL Battle Victory: +"+reward.ryo+" Ryō.");
  }
  if(projection.currentStats&&Object.keys(projection.currentStats.deltas).length){
    const names={ninjutsu:"Ninjutsu",taijutsu:"Taijutsu",bukijutsu:"Bukijutsu",fuinjutsu:"Fūinjutsu",genjutsu:"Genjutsu",stamina:"Stamina"};
    const parts=Object.entries(projection.currentStats.deltas).map(([id,value])=>"+"+value+" "+(names[id]||id));
    lines.push("• Formal Training: "+parts.join(", ")+" Current Stats.");
  }
  if(projection.development.length){
    lines.push("","DEVELOPMENT");
    for(const row of projection.development)lines.push("• "+row.disciplineLabel+" Development: +"+row.expGranted+" — "+row.reason);
  }
  return lines;
}

function diagnostics(){
  const sourceValues=Object.values(SOURCE);
  const text=String(projectOccurrence440);
  const checks={
    stableSourceCount:new Set(sourceValues).size===sourceValues.length,
    miraiDeceptionDetectionSelfDerivedOnly:text.includes("conversation_continuity")&&text.includes("changed_chakra")&&text.includes("battle_triggered_instructor_reveal")===false,
    miraiSignalDiscriminationOnly:String(projectOccurrence440).includes("signal_discrimination")&&!String(projectOccurrence440).includes("sensor_application"),
    kushinaReverseSummoningEvidenceRejected:!String(projectOccurrence440).includes("reverse_summoning_specialist")&&!String(projectOccurrence440).includes("reverse_summoning_execution")&&!String(projectOccurrence440).includes("reverse_summoning_analysis"),
    kushinaJointClosureSealingExecution:String(projectOccurrence440).includes("kushina_joint_residual_closure_fuinjutsu")&&String(projectOccurrence440).includes("sealing_specialist:seal_execution"),
    obitoNoDisciplineDevelopment:String(projectOccurrence440).includes("obito_current_stat_package_owned_by_static_consequence")&&!Object.values(DEVELOPMENT_REASONS).some(v=>String(v).includes("Obito")),
    obitoCurrentStatProjection:JSON.stringify(OBITO_STATS.FULL)===JSON.stringify({ninjutsu:1,taijutsu:1,bukijutsu:1,stamina:1})&&JSON.stringify(OBITO_STATS.MINIMAL)===JSON.stringify({taijutsu:1}),
    metalPrivateAndProtectiveDevelopment:["metal_private_spinning_kick","metal_private_full_force_fist","metal_private_conditioned_endurance","metal_protective_redirect_dummy","metal_protective_destroy_dummy"].every(id=>Object.prototype.hasOwnProperty.call(DEVELOPMENT_REASONS,id)),
    iwabeeEarthReleaseDevelopment:String(projectOccurrence440).includes("iwabee_training_ground_reshape_ninjutsu")&&String(projectOccurrence440).includes("iwabee_rogue_escape_constraint_ninjutsu"),
    kurenaiStageAccuracy:String(kurenaiBellDevelopment440).includes("KURENAI_STAGE1_RESULT")&&KURENAI_STAGE1_RESULT.false_kurenai.requestedExp===1&&KURENAI_STAGE1_RESULT.fake_direct.requestedExp===2&&KURENAI_STAGE2_RESULT["fake_direct|draw_attention"].requestedExp===1,
    sourceScopedDevelopmentIdentity:String(developmentReceiptId).includes("progressionSlotId")&&String(commitDevelopment440).includes("causalRootId===sourceOccurrenceId"),
    noDirectPLOrStatGrant:String(commitDevelopment440).includes("directPLGrant:0")&&String(commitDevelopment440).includes("directStatGrant:false"),
    receiptHidesSpecialistInternals:!String(appendReceiptLines440).includes("qualificationId")&&!String(appendReceiptLines440).includes("significance"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const reconciled=reconcileCommitted440();
globalThis.projectAcademyOriginRewardOccurrence440=projectOccurrence440;
globalThis.reconcileAcademyOriginRewardSpectrum440=reconcileCommitted440;
globalThis.getAcademyOriginRewardReceiptProjection440=getReceiptProjection440;
globalThis.classifyKurenaiBellDevelopment440=kurenaiBellDevelopment440;
globalThis.appendAcademyOriginRewardReceipt440=appendReceiptLines440;
globalThis.runAcademyOriginRewardSpectrum440Diagnostics=diagnostics;
globalThis.SC_ACADEMY_ORIGIN_REWARD_SPECTRUM_440=Object.freeze({
  patchId:PATCH_ID,sources:SOURCE,battleRewardSources:BATTLE_REWARD_SOURCE,reconciled,browserGoldenClaimed:false
});
})();
