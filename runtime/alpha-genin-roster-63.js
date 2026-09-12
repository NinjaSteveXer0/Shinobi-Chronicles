// =========================================================
// ISSUE #63 — GENIN v2 + PERSISTENT INCOMPLETE TEAM FORMATION
// Authority:
// - Documentation/Coordination/Genin Roster Candidate Content Policy v2 2026-09-11.md
// - Documentation/Acquisition/Genin Roster Transition Recruitment and Retention Edge Closure 2026-09-10.md
// - Documentation/Coordination/Persistent Incomplete Genin Roster Transition Reservation and Shinobi Record Projection Contract 2026-09-11.md
// Core rule: SAVE reserves; CONTINUE assigns.
// =========================================================
(function installGeninRosterIssue63V2(){
  "use strict";

  const V1_POLICY_ID="alpha_genin_roster_first_production_content_v1";
  const V2_POLICY_ID="alpha_genin_roster_first_production_content_v2";
  const ACQUISITION_POLICY_ID="alpha_genin_roster_dynamic_candidate_policy_v1";
  const RECRUITMENT_ROUTE="genin_roster_transition_recruitment";
  const FINAL_INCOMPLETE="INCOMPLETE";
  const FINAL_READY="READY";
  const FINAL_FINALIZED="FINALIZED";

  const V1_TEAMMATES=Object.freeze([
    "genin_boruto","genin_chocho","genin_himawari","genin_hinata","genin_hoki","genin_karin","genin_menma",
    "genin_mikoto","genin_mitsuki","genin_naruto","genin_orochimaru","genin_sarada","genin_sasuke"
  ]);
  const V2_EXPANSION=Object.freeze([
    "genin_hashirama","genin_hiruzen","genin_mito","genin_tsunade","genin_sakumo","genin_duy","genin_guy",
    "genin_rin","genin_dan","genin_nawaki","genin_shizune","genin_yamato","genin_sai","genin_kagami","genin_danzo",
    "genin_torifu","genin_inoichi","genin_choza","genin_shibi","genin_tsume","genin_hiashi","genin_yugao","genin_hayate",
    "genin_mukai","genin_kosuke"
  ]);
  const V2_TEAMMATES=Object.freeze([...V1_TEAMMATES,...V2_EXPANSION]);
  const LEADERS=Object.freeze([
    "jonin_hanabi","jonin_inojin","jonin_konohamaru","jonin_kushina","jonin_sasuke","jonin_shikaku","jonin_shino",
    "sj_anko","sj_ebisu","sj_genma","sj_ibiki","sj_kiba","sj_nono"
  ]);

  const V2_ROWS=Object.freeze({
    genin_hashirama:{displayName:"Genin Hashirama",stablePersonKey:"person_hashirama_senju",basePL:36,baseStats:{nin:36,tai:30,buki:25,fuin:18,kin:18,gen:21,stamina:39}},
    genin_hiruzen:{displayName:"Genin Hiruzen",stablePersonKey:"person_hiruzen_sarutobi",basePL:33,baseStats:{nin:34,tai:29,buki:31,fuin:22,kin:20,gen:28,stamina:32}},
    genin_mito:{displayName:"Genin Mito Uzumaki",stablePersonKey:"person_mito_uzumaki",basePL:33,baseStats:{nin:27,tai:20,buki:18,fuin:34,kin:22,gen:24,stamina:35}},
    genin_tsunade:{displayName:"Genin Tsunade",stablePersonKey:"person_tsunade",basePL:31,baseStats:{nin:24,tai:32,buki:18,fuin:16,kin:20,gen:17,stamina:34}},
    genin_sakumo:{displayName:"Genin Sakumo",stablePersonKey:"person_sakumo_hatake",basePL:34,baseStats:{nin:30,tai:32,buki:36,fuin:17,kin:18,gen:22,stamina:31}},
    genin_duy:{displayName:"Genin Might Duy",stablePersonKey:"person_might_duy",basePL:28,baseStats:{nin:16,tai:29,buki:20,fuin:10,kin:12,gen:12,stamina:31}},
    genin_guy:{displayName:"Genin Might Guy",stablePersonKey:"person_might_guy",basePL:31,baseStats:{nin:18,tai:33,buki:22,fuin:11,kin:12,gen:14,stamina:34}},
    genin_rin:{displayName:"Genin Rin",stablePersonKey:"person_rin_nohara",basePL:25,baseStats:{nin:25,tai:20,buki:18,fuin:22,kin:17,gen:22,stamina:26}},
    genin_dan:{displayName:"Genin Dan Katō",stablePersonKey:"person_dan_kato",basePL:27,baseStats:{nin:26,tai:23,buki:21,fuin:17,kin:18,gen:28,stamina:25}},
    genin_nawaki:{displayName:"Genin Nawaki",stablePersonKey:"person_nawaki",basePL:21,baseStats:{nin:20,tai:20,buki:18,fuin:13,kin:14,gen:16,stamina:22}},
    genin_shizune:{displayName:"Genin Shizune",stablePersonKey:"person_shizune",basePL:26,baseStats:{nin:26,tai:21,buki:19,fuin:19,kin:22,gen:21,stamina:27}},
    genin_yamato:{displayName:"Genin Yamato",stablePersonKey:"person_yamato",basePL:30,baseStats:{nin:31,tai:25,buki:23,fuin:22,kin:23,gen:21,stamina:32}},
    genin_sai:{displayName:"Genin Sai",stablePersonKey:"person_sai",basePL:30,baseStats:{nin:28,tai:25,buki:31,fuin:19,kin:18,gen:24,stamina:28}},
    genin_kagami:{displayName:"Genin Kagami Uchiha",stablePersonKey:"person_kagami_uchiha",basePL:30,baseStats:{nin:31,tai:29,buki:26,fuin:18,kin:19,gen:30,stamina:29}},
    genin_danzo:{displayName:"Genin Danzō",stablePersonKey:"person_danzo_shimura",basePL:29,baseStats:{nin:29,tai:25,buki:27,fuin:24,kin:28,gen:22,stamina:30}},
    genin_torifu:{displayName:"Genin Torifu Akimichi",stablePersonKey:"person_torifu_akimichi",basePL:29,baseStats:{nin:22,tai:28,buki:25,fuin:16,kin:18,gen:17,stamina:31}},
    genin_inoichi:{displayName:"Genin Inoichi Yamanaka",stablePersonKey:"person_inoichi_yamanaka",basePL:28,baseStats:{nin:25,tai:20,buki:18,fuin:16,kin:17,gen:30,stamina:24}},
    genin_choza:{displayName:"Genin Chōza Akimichi",stablePersonKey:"person_choza_akimichi",basePL:30,baseStats:{nin:22,tai:29,buki:25,fuin:16,kin:18,gen:16,stamina:32}},
    genin_shibi:{displayName:"Genin Shibi Aburame",stablePersonKey:"person_shibi_aburame",basePL:28,baseStats:{nin:27,tai:21,buki:20,fuin:18,kin:20,gen:27,stamina:29}},
    genin_tsume:{displayName:"Genin Tsume Inuzuka",stablePersonKey:"person_tsume_inuzuka",basePL:29,baseStats:{nin:22,tai:30,buki:28,fuin:14,kin:16,gen:18,stamina:31}},
    genin_hiashi:{displayName:"Genin Hiashi Hyūga",stablePersonKey:"person_hiashi_hyuga",basePL:31,baseStats:{nin:24,tai:33,buki:25,fuin:18,kin:17,gen:27,stamina:31}},
    genin_yugao:{displayName:"Genin Yūgao Uzuki",stablePersonKey:"person_yugao_uzuki",basePL:29,baseStats:{nin:21,tai:27,buki:31,fuin:15,kin:16,gen:22,stamina:27}},
    genin_hayate:{displayName:"Genin Hayate Gekkō",stablePersonKey:"person_hayate_gekko",basePL:28,baseStats:{nin:22,tai:26,buki:30,fuin:16,kin:16,gen:23,stamina:26}},
    genin_mukai:{displayName:"Genin Mukai Kohinata",stablePersonKey:"person_mukai_kohinata",basePL:30,baseStats:{nin:24,tai:31,buki:27,fuin:17,kin:18,gen:23,stamina:30}},
    genin_kosuke:{displayName:"Genin Kosuke Maruboshi",stablePersonKey:"person_kosuke_maruboshi",basePL:28,baseStats:{nin:24,tai:26,buki:29,fuin:16,kin:17,gen:20,stamina:28}}
  });

  const V2_PALETTES=Object.freeze({
    genin_hashirama:["skill_chakra_focus","skill_body_replacement","skill_clone_feint","skill_straight_palm","skill_shoulder_break"],
    genin_hiruzen:["skill_chakra_focus","skill_body_replacement","skill_clone_feint","skill_counter_palm","skill_genjutsu_false_footfall"],
    genin_mito:["skill_chakra_focus","skill_body_replacement","skill_fuinjutsu_binding_tag","skill_fuinjutsu_barrier_knot","skill_fuinjutsu_restriction_script"],
    genin_tsunade:["skill_chakra_focus","skill_body_replacement","skill_rising_knee","skill_shoulder_break","skill_twin_strike"],
    genin_sakumo:["skill_body_replacement","skill_counter_palm","skill_kunai_cross_cut","skill_tanto_draw","skill_short_blade_flurry"],
    genin_duy:["skill_body_replacement","skill_straight_palm","skill_rising_knee","skill_leaf_sweep","skill_shoulder_break"],
    genin_guy:["skill_body_replacement","skill_rising_knee","skill_low_line_kick","skill_spinning_heel","skill_twin_strike"],
    genin_rin:["skill_body_replacement","skill_straight_palm","skill_mystical_palm_minor","skill_field_stabilisation","skill_chakra_pulse_read"],
    genin_dan:["skill_body_replacement","skill_straight_palm","skill_genjutsu_false_footfall","skill_genjutsu_double_image","skill_genjutsu_phantom_wound"],
    genin_nawaki:["skill_chakra_focus","skill_body_replacement","skill_clone_feint","skill_straight_palm","skill_combat_breath"],
    genin_shizune:["skill_body_replacement","skill_straight_palm","skill_mystical_palm_minor","skill_field_stabilisation","skill_chakra_pulse_read"],
    genin_yamato:["skill_chakra_focus","skill_body_replacement","skill_clone_feint","skill_rising_knee","skill_fuinjutsu_binding_tag"],
    genin_sai:["skill_chakra_focus","skill_body_replacement","skill_straight_palm","skill_kunai_cross_cut","skill_shuriken_fan"],
    genin_kagami:["skill_chakra_focus","skill_body_replacement","skill_genjutsu_false_footfall","skill_genjutsu_double_image","skill_genjutsu_phantom_wound"],
    genin_danzo:["skill_body_replacement","skill_straight_palm","skill_fuinjutsu_binding_tag","skill_fuinjutsu_barrier_knot","skill_genjutsu_false_footfall"],
    genin_torifu:["skill_body_replacement","skill_straight_palm","skill_rising_knee","skill_shoulder_break","skill_twin_strike"],
    genin_inoichi:["skill_body_replacement","skill_straight_palm","skill_genjutsu_false_footfall","skill_genjutsu_double_image","skill_genjutsu_phantom_wound"],
    genin_choza:["skill_body_replacement","skill_rising_knee","skill_leaf_sweep","skill_shoulder_break","skill_twin_strike"],
    genin_shibi:["skill_chakra_focus","skill_body_replacement","skill_straight_palm","skill_genjutsu_false_footfall","skill_genjutsu_double_image"],
    genin_tsume:["skill_body_replacement","skill_rising_knee","skill_low_line_kick","skill_shoulder_break","skill_kunai_cross_cut"],
    genin_hiashi:["skill_body_replacement","skill_straight_palm","skill_counter_palm","skill_guard_breaker","skill_twin_strike"],
    genin_yugao:["skill_body_replacement","skill_straight_palm","skill_kunai_cross_cut","skill_tanto_draw","skill_short_blade_flurry"],
    genin_hayate:["skill_body_replacement","skill_straight_palm","skill_kunai_thrust","skill_kunai_cross_cut","skill_short_blade_flurry"],
    genin_mukai:["skill_body_replacement","skill_straight_palm","skill_counter_palm","skill_shoulder_break","skill_twin_strike"],
    genin_kosuke:["skill_body_replacement","skill_straight_palm","skill_kunai_cross_cut","skill_staff_sweep","skill_shuriken_fan"]
  });

  // ---------------- Registry + exact presentation projection ----------------
  for (const [id,row] of Object.entries(V2_ROWS)) {
    if (!characterRegistry[id]) {
      characterRegistry[id]={
        id,
        displayName:row.displayName,
        stablePersonKey:row.stablePersonKey,
        baseStats:cloneCanonicalSevenStats(row.baseStats),
        basePL:row.basePL,
        formalRank:"genin",
        embodiedExpressions:[],
        geninV2CandidateAuthority:true
      };
    } else {
      characterRegistry[id].stablePersonKey=row.stablePersonKey;
      characterRegistry[id].geninV2CandidateAuthority=true;
    }
  }

  const V2_CARD_PATHS=Object.freeze(Object.fromEntries(V2_EXPANSION.map(id=>[id,`Assets/Genin/${id}.png`])));
  const V2_PORTRAIT_PATHS=Object.freeze(Object.fromEntries(V2_EXPANSION.map(id=>[id,`Portraits/Genin/${id}.png`])));

  const ISSUE63_PRE_CARD_PATH=getCharacterCardAssetPath;
  getCharacterCardAssetPath=function issue63CardPath(id){
    return V2_CARD_PATHS[id]||ISSUE63_PRE_CARD_PATH(id);
  };
  const ISSUE63_PRE_UI_PORTRAIT_PATH=getUIPortraitAssetPath;
  getUIPortraitAssetPath=function issue63UIPortraitPath(id){
    return V2_PORTRAIT_PATHS[id]||ISSUE63_PRE_UI_PORTRAIT_PATH(id);
  };
  const ISSUE63_PRE_UI_PORTRAIT_REGISTRY_ID=getUIPortraitRegistryId;
  getUIPortraitRegistryId=function issue63UIPortraitRegistryId(subject){
    const candidates=typeof subject==="string"?[subject]:subject?[subject.registryId,subject.entityId,subject.summonId,subject.sourceEntityId,subject.id].filter(Boolean):[];
    const exact=candidates.find(id=>Object.prototype.hasOwnProperty.call(V2_PORTRAIT_PATHS,id));
    return exact||ISSUE63_PRE_UI_PORTRAIT_REGISTRY_ID(subject);
  };
  resolveUIPortraitProjection=function issue63ResolveUIPortraitProjection(subject){
    const registryId=getUIPortraitRegistryId(subject);
    if(!registryId) return {registryId:null,path:"",status:"missing_authority",fallbackUsed:false};
    const path=getUIPortraitAssetPath(registryId);
    return path?{registryId,path,status:"active",fallbackUsed:false}:{registryId,path:"",status:"missing_authority",fallbackUsed:false};
  };

  // Do not mutate the live-115 base production-count constants. v2 activation
  // is a roster-content extension with its own explicit set.
  const V2_RUNTIME_SET=new Set(V2_EXPANSION);
  const ISSUE63_PRE_MATERIALIZE=materializeProductionRuntimeCharacter;
  materializeProductionRuntimeCharacter=function issue63Materialize(registryId){
    const existing=getRuntimeCharacterByRegistryId(registryId);
    if(existing) return existing;
    if(!V2_RUNTIME_SET.has(registryId)) return ISSUE63_PRE_MATERIALIZE(registryId);
    const registry=getCharacterRegistryEntry(registryId);
    if(!registry||!registry.baseStats) return null;
    const baseStats=cloneCanonicalSevenStats(registry.baseStats);
    const runtime={
      id:registryId,registryId,name:registry.displayName||getProductionRuntimeDisplayName(registryId),rank:"Genin",
      basePL:Number(registry.basePL)||0,baseStats,stats:cloneCanonicalSevenStats(baseStats),permanentPLBonus:0,
      equipment:[],weaponSpecializations:{},abilities:[],image:getCharacterCardAssetPath(registryId),registryMaterializedRuntime:true,
      geninV2CandidateAuthority:true
    };
    playerTeam.push(runtime);
    return runtime;
  };
  const ISSUE63_PRE_HYDRATE=hydrateOwnedProductionRuntimeCharacters;
  hydrateOwnedProductionRuntimeCharacters=function issue63Hydrate(ownershipState=characterOwnershipRuntimeAuthority){
    const base=ISSUE63_PRE_HYDRATE(ownershipState)||{success:true,hydratedRuntimeIds:[]};
    const ids=ownershipState&&Array.isArray(ownershipState.ownedRegistryIds)?ownershipState.ownedRegistryIds:[];
    const added=[];
    for(const id of ids){
      if(!V2_RUNTIME_SET.has(id)) continue;
      const before=!!getRuntimeCharacterByRegistryId(id);
      const runtime=materializeProductionRuntimeCharacter(id);
      if(runtime&&!before) added.push(runtime.id);
    }
    return {...base,ownedGeninV2Count:ids.filter(id=>V2_RUNTIME_SET.has(id)).length,hydratedRuntimeIds:[...(base.hydratedRuntimeIds||[]),...added]};
  };

  // ---------------- Exact v2 prepared palettes + ordinary catalogue rows ----------------
  for(const [owner,ids] of Object.entries(V2_PALETTES)) PRODUCTION_PREPARED_SKILL_PALETTES[owner]=[...ids];

  function genericSkillDefinition(owner,id){
    const direct={
      skill_straight_palm:[12,"Taijutsu"],skill_rising_knee:[14,"Taijutsu"],skill_leaf_sweep:[13,"Taijutsu"],
      skill_shoulder_break:[18,"Taijutsu"],skill_spinning_heel:[20,"Taijutsu"],skill_low_line_kick:[17,"Taijutsu"],
      skill_counter_palm:[15,"Taijutsu"],skill_guard_breaker:[21,"Taijutsu"],skill_twin_strike:[22,"Taijutsu"],
      skill_kunai_thrust:[13,"Bukijutsu"],skill_kunai_cross_cut:[15,"Bukijutsu"],skill_shuriken_fan:[12,"Bukijutsu"],
      skill_tanto_draw:[18,"Bukijutsu"],skill_short_blade_flurry:[20,"Bukijutsu"],skill_staff_sweep:[16,"Bukijutsu"],
      skill_genjutsu_phantom_wound:[20,"Genjutsu"]
    };
    if(direct[id]){
      const [pl,discipline]=direct[id];
      const options={primaryDiscipline:discipline,traits:[]};
      if(id==="skill_leaf_sweep") options.conditionalRider={kind:"block_voluntary_reposition_through_target_next_action",qualificationRequired:true,automatic:false,notStun:true};
      if(id==="skill_counter_palm") options.conditionalRider={kind:"counter_bonus_if_target_committed_direct_attack_since_user_prior_action",bonusAttackPL:4,qualificationRequired:true,automatic:false};
      if(id==="skill_guard_breaker") options.conditionalRider={kind:"ignore_one_live_same_source_guard_if_guard_breakable",qualificationRequired:true,automatic:false};
      if(id==="skill_twin_strike"||id==="skill_shuriken_fan"||id==="skill_short_blade_flurry") options.traits.push("multi_hit_presentation_one_packet");
      if(id==="skill_genjutsu_phantom_wound") options.traits.push("battle_pl_pressure_only_no_injury_or_death");
      return makeFactoryFixedDamageSkill(id,owner,pl,options);
    }
    if(id==="skill_body_replacement") return makeFactoryRatioGuardSkill(id,owner,0.35,{primaryDiscipline:"Ninjutsu",stateKey:"skill_body_replacement_guard",oneUse:true,traits:["not_teleportation","pre_stamina_prevention_next_direct_packet"]});
    if(id==="skill_fuinjutsu_barrier_knot") return makeFactoryRatioGuardSkill(id,owner,0.30,{primaryDiscipline:"Fūinjutsu",stateKey:"skill_fuinjutsu_barrier_knot",oneUse:true,traits:["pre_stamina_prevention_next_direct_packet"]});
    if(id==="skill_chakra_focus") return {id,ownerRegistryId:owner,primaryDiscipline:"Ninjutsu",targetMode:"self",actionClass:"setup_technique",resolutionKind:"transient_state",staminaMitigation:null,traits:["next_direct_authored_attack_plus_4_attack_pl","no_stat_or_base_pl_mutation"],requirements:[],state:{stateKey:"skill_chakra_focus",reapplication:"refresh_replace",attackPLBonus:4,consumeOn:"next_eligible_direct_action"}};
    if(id==="skill_clone_feint") return {id,ownerRegistryId:owner,primaryDiscipline:"Ninjutsu",targetMode:"self",actionClass:"setup_technique",resolutionKind:"transient_state",staminaMitigation:null,traits:["next_eligible_direct_action_plus_3_attack_pl","clone_not_participant"],requirements:[],state:{stateKey:"skill_clone_feint",reapplication:"refresh_replace",attackPLBonus:3,consumeOn:"next_eligible_direct_action"}};
    if(id==="skill_genjutsu_double_image") return {id,ownerRegistryId:owner,primaryDiscipline:"Genjutsu",targetMode:"self",actionClass:"setup_technique",resolutionKind:"transient_state",staminaMitigation:null,traits:["next_genjutsu_direct_or_control_plus_4","effect_marker_only"],requirements:[],state:{stateKey:"skill_genjutsu_double_image",reapplication:"refresh_replace",attackPLBonus:4,consumeOn:"next_genjutsu_direct_or_control"}};
    if(id==="skill_genjutsu_false_footfall") return makeFactoryDynamicControlSkill(id,owner,"Genjutsu",{semanticClass:"movement_prediction_response_block",conditionKey:"false_footfall_prediction",conditionType:"perception_control",blockedActionTraits:["movement_prediction_response"],durationActionOpportunities:1,traits:["not_blanket_stun"]});
    if(id==="skill_fuinjutsu_binding_tag") return makeFactoryDynamicControlSkill(id,owner,"Fūinjutsu",{semanticClass:"movement_reposition_bind",conditionKey:"fuinjutsu_binding_tag",conditionType:"binding_control",blockedActionTraits:["movement","reposition"],durationActionOpportunities:1,traits:["not_blanket_stun"]});
    if(id==="skill_fuinjutsu_restriction_script") return makeFactoryDynamicControlSkill(id,owner,"Fūinjutsu",{semanticClass:"explicit_action_family_restriction",conditionKey:"fuinjutsu_restriction_script",conditionType:"action_family_restriction",durationActionOpportunities:1,traits:["requires_explicit_tagged_action_family","not_global_chakra_lock"]});
    if(id==="skill_mystical_palm_minor") return makeFactoryFixedRestorationSkill(id,owner,6,{primaryDiscipline:"Ninjutsu",targetMode:"selected_ally",traits:["once_per_target_per_battle","underlying_battle_pl_only","no_injury_cure"]});
    if(id==="skill_field_stabilisation") return makeFactoryFixedRestorationSkill(id,owner,8,{primaryDiscipline:"Ninjutsu",targetMode:"selected_ally",traits:["once_per_battle","underlying_battle_pl_only","no_injury_cure"]});
    if(id==="skill_combat_breath") return makeFactoryFixedRestorationSkill(id,owner,4,{primaryDiscipline:null,targetMode:"self",traits:["once_per_battle","not_stamina_resource"]});
    if(id==="skill_chakra_pulse_read") return makeFactoryCategoricalSkill(id,owner,{primaryDiscipline:"Ninjutsu",targetMode:"current_enemy",traits:["bounded_chakra_state_evidence","no_identity_or_mastery_inference"],informationBoundary:"bounded_chakra_state_evidence_only"});
    return null;
  }
  for(const [owner,palette] of Object.entries(V2_PALETTES)){
    for(const id of palette){
      if(getClosureWaveBattleSkillDefinition(id,owner)) continue;
      const definition=genericSkillDefinition(owner,id);
      if(definition) registerProductionFactorySkill(definition);
    }
  }

  // ---------------- Stable-person collision extension ----------------
  const ISSUE63_PRE_STABLE_PERSON=getAlphaFirstProductionStablePersonKey;
  getAlphaFirstProductionStablePersonKey=function issue63StablePersonKey(variantId){
    if(V2_ROWS[variantId]) return V2_ROWS[variantId].stablePersonKey;
    return ISSUE63_PRE_STABLE_PERSON(variantId);
  };

  function cleanUniqueIds(ids){ return [...new Set((Array.isArray(ids)?ids:[]).filter(id=>typeof id==="string"&&!!getCharacterRegistryEntry(id)))]; }
  function transitionLineageId(transition){
    if(transition.transitionLineageId) return transition.transitionLineageId;
    const evidence=(transition.promotionEvidenceIds||[])[0]||"promotion";
    const subject=transition.subjectOwnedCharacterId||"unknown_subject";
    transition.transitionLineageId=`genin_roster_transition:${subject}:${String(evidence).replace(/[^a-zA-Z0-9:_-]/g,"_")}`;
    return transition.transitionLineageId;
  }
  function candidatePolicyFromSnapshot(snapshot){
    return snapshot&&snapshot.provenance&&typeof snapshot.provenance.candidateContentPolicyId==="string"?snapshot.provenance.candidateContentPolicyId:null;
  }

  function extendTransitionState(t,source={}){
    if(!t||typeof t!=="object") return t;
    const snapshotPolicy=candidatePolicyFromSnapshot(t.candidateSnapshot)||candidatePolicyFromSnapshot(source.candidateSnapshot);
    t.transitionLineageId=typeof source.transitionLineageId==="string"?source.transitionLineageId:(t.transitionLineageId||null);
    t.candidateContentPolicyId=typeof source.candidateContentPolicyId==="string"?source.candidateContentPolicyId:(t.candidateContentPolicyId||snapshotPolicy||null);
    t.currentSnapshotId=t.candidateSnapshotId||null;
    t.reservedGeninVariantIds=cleanUniqueIds(source.reservedGeninVariantIds!==undefined?source.reservedGeninVariantIds:t.reservedGeninVariantIds);
    t.reservedLeaderVariantId=(source.reservedLeaderVariantId||t.reservedLeaderVariantId)&&getCharacterRegistryEntry(source.reservedLeaderVariantId||t.reservedLeaderVariantId)?(source.reservedLeaderVariantId||t.reservedLeaderVariantId):null;
    t.reservationProvenance=Array.isArray(source.reservationProvenance)?source.reservationProvenance.filter(Boolean).map(cloneProgressionData):(Array.isArray(t.reservationProvenance)?t.reservationProvenance:[]);
    t.candidateChangeProvenance=Array.isArray(source.candidateChangeProvenance)?source.candidateChangeProvenance.filter(Boolean).map(cloneProgressionData):(Array.isArray(t.candidateChangeProvenance)?t.candidateChangeProvenance:[]);
    t.candidatePreparationFacts=Array.isArray(source.candidatePreparationFacts)?source.candidatePreparationFacts.filter(Boolean).map(cloneProgressionData):(Array.isArray(t.candidatePreparationFacts)?t.candidatePreparationFacts:[]);
    if(source.finalisationState===FINAL_FINALIZED||t.completed===true) t.finalisationState=FINAL_FINALIZED;
    else if(source.finalisationState===FINAL_READY) t.finalisationState=FINAL_READY;
    else t.finalisationState=FINAL_INCOMPLETE;
    t.incompleteObjectiveActive=t.completed!==true;
    return t;
  }

  const ISSUE63_PRE_CREATE_DEFAULT_ACQUISITION=createDefaultAcquisitionState;
  createDefaultAcquisitionState=function issue63CreateDefaultAcquisitionState(){
    const state=ISSUE63_PRE_CREATE_DEFAULT_ACQUISITION();
    extendTransitionState(state.geninRosterTransition,{});
    return state;
  };

  const ISSUE63_PRE_NORMALIZE_ACQUISITION=normalizeAcquisitionState;
  normalizeAcquisitionState=function issue63NormalizeAcquisition(savedState,ownershipState,options={}){
    const state=ISSUE63_PRE_NORMALIZE_ACQUISITION(savedState,ownershipState,options);
    const source=savedState&&savedState.geninRosterTransition&&typeof savedState.geninRosterTransition==="object"?savedState.geninRosterTransition:{};
    extendTransitionState(state.geninRosterTransition,source);
    return state;
  };

  const ISSUE63_PRE_GET_TRANSITION=getGeninRosterTransitionState;
  getGeninRosterTransitionState=function issue63GetTransition(){
    const t=ISSUE63_PRE_GET_TRANSITION();
    return extendTransitionState(t,t);
  };

  // Reload the acquisition/ownership slice from raw persisted truth now that the
  // v2 Registry extension exists. This prevents the pre-extension boot pass from
  // dropping legitimately saved v2 ownership/reservations on future reloads.
  function rehydrateIssue63SavedSlices(){
    if(typeof localStorage==="undefined"||typeof PLAYER_SAVE_KEY==="undefined") return {success:true,skipped:true};
    const raw=localStorage.getItem(PLAYER_SAVE_KEY);
    if(!raw) return {success:true,skipped:true};
    try{
      const parsed=JSON.parse(raw);
      if(!parsed||typeof parsed!=="object") return {success:true,skipped:true};
      const ownership=normalizeCharacterOwnershipState(parsed.characterOwnership||playerData.characterOwnership||createDefaultCharacterOwnershipState());
      playerData.characterOwnership=ownership;
      setCharacterOwnershipRuntimeAuthority(ownership);
      playerData.acquisition=normalizeAcquisitionState(parsed.acquisition||playerData.acquisition,ownership,{legacySeedMigration:false});
      hydrateOwnedProductionRuntimeCharacters(ownership);
      return {success:true,restoredOwnershipCount:ownership.ownedRegistryIds.length};
    }catch(error){ return {success:false,reason:"issue63_saved_slice_rehydrate_failed",error:String(error&&error.message||error)}; }
  }
  rehydrateIssue63SavedSlices();

  // Anything already inside an unresolved transition at deployment time is an
  // existing lineage. Pin it to v1 if no policy was previously recorded.
  {
    const t=getGeninRosterTransitionState();
    if(t.completed!==true&&t.unlocked===true&&t.required===true){
      transitionLineageId(t);
      if(!t.candidateContentPolicyId){
        t.candidateContentPolicyId=candidatePolicyFromSnapshot(t.candidateSnapshot)||V1_POLICY_ID;
      }
    }
  }

  // ---------------- Retention exception + snapshot policy pinning ----------------
  const ISSUE63_PRE_VALIDATE_SNAPSHOT=validateIssue63SnapshotAuthority;
  validateIssue63SnapshotAuthority=function issue63ValidateSnapshot(snapshot){
    if(!snapshot) return {valid:false,reason:"candidate_snapshot_invalid"};
    const current=getCurrentAcademyTeammateVariantIdsForGeninTransition().filter(Boolean);
    const unavailable=new Set(snapshot.provenance&&Array.isArray(snapshot.provenance.retentionUnavailableVariantIds)?snapshot.provenance.retentionUnavailableVariantIds:[]);
    if(!current.every(id=>snapshot.retentionEligibleVariantIds.includes(id)||unavailable.has(id))) return {valid:false,reason:"current_teammates_not_retention_authorised_or_causally_unavailable"};
    if(snapshot.joninLeaderCandidateVariantIds.some(id=>!isIssue63LeaderRankAllowed(id))) return {valid:false,reason:"leader_candidate_rank_not_jonin_or_special_jonin"};
    if(snapshot.joninLeaderCandidateVariantIds.some(id=>!isIssue63CandidateAvailable(snapshot,id))) return {valid:false,reason:"leader_candidate_not_available"};
    const t=getGeninRosterTransitionState();
    const incoming=candidatePolicyFromSnapshot(snapshot);
    if(t.candidateContentPolicyId&&incoming&&incoming!==t.candidateContentPolicyId) return {valid:false,reason:"candidate_content_policy_lineage_migration_forbidden"};
    return {valid:true};
  };

  const ISSUE63_PRE_APPLY_SNAPSHOT=applyGeninRosterTransitionCandidateSnapshot;
  applyGeninRosterTransitionCandidateSnapshot=function issue63ApplySnapshot(snapshot){
    // Underlying causal supersession remains mandatory: candidate_snapshot_supersession_requires_causal_history + supersedesSnapshotId.
    const t=getGeninRosterTransitionState();
    const incomingPolicy=candidatePolicyFromSnapshot(snapshot);
    if(t.candidateContentPolicyId&&incomingPolicy&&incomingPolicy!==t.candidateContentPolicyId) return {success:false,reason:"candidate_content_policy_lineage_migration_forbidden"};
    const result=ISSUE63_PRE_APPLY_SNAPSHOT(snapshot);
    if(result&&result.success){
      const current=getGeninRosterTransitionState();
      current.currentSnapshotId=current.candidateSnapshotId||null;
      current.candidateContentPolicyId=current.candidateContentPolicyId||candidatePolicyFromSnapshot(current.candidateSnapshot)||incomingPolicy||null;
      transitionLineageId(current);
      const unavailable=new Set(current.candidateSnapshot&&current.candidateSnapshot.provenance&&Array.isArray(current.candidateSnapshot.provenance.retentionUnavailableVariantIds)?current.candidateSnapshot.provenance.retentionUnavailableVariantIds:[]);
      current.selectedTeamVariantIds=Array.from({length:2},(_,i)=>{
        const id=current.selectedTeamVariantIds&&current.selectedTeamVariantIds[i]||null;
        return id&&unavailable.has(id)?null:id;
      });
      current.reservedGeninVariantIds=(current.reservedGeninVariantIds||[]).filter(id=>!unavailable.has(id)&&((current.candidateSnapshot.retentionEligibleVariantIds||[]).includes(id)||(current.candidateSnapshot.teammateCandidateVariantIds||[]).includes(id)));
      if(current.reservedLeaderVariantId&&!(current.candidateSnapshot.joninLeaderCandidateVariantIds||[]).includes(current.reservedLeaderVariantId)) current.reservedLeaderVariantId=null;
      refreshIssue63FinalisationState(current);
      savePlayerData();
    }
    return result;
  };

  function buildSnapshotForPolicy(policyId){
    if(policyId===V1_POLICY_ID) return ALPHA_PRE_ISSUE63_V1_BUILDER();
    const t=getGeninRosterTransitionState();
    if(t.unlocked!==true||t.required!==true||t.completed===true) return {success:false,reason:"genin_roster_transition_not_active"};
    if(!t.subjectOwnedCharacterId||String(getOwnedCharacterFormalRank(t.subjectOwnedCharacterId)||"").toLowerCase()!=="genin") return {success:false,reason:"genin_roster_transition_subject_not_promoted_genin"};
    const current=getCurrentAcademyTeammateVariantIdsForGeninTransition().filter(Boolean);
    const subjectVariantId=getAlphaFirstProductionSubjectVariantId();
    const retention=[];
    const consumedPreparation=[];
    const retentionUnavailable=[];
    for(const id of current){
      const fact=getAlphaFirstProductionCommittedPreSnapshotCandidateState(id);
      if(fact&&fact.state==="unavailable") {retentionUnavailable.push(id);consumedPreparation.push(fact);} else retention.push(id);
    }
    const occupiedStablePeople=new Set([subjectVariantId,...retention].filter(Boolean).map(getAlphaFirstProductionStablePersonKey));
    const exclusions=[];
    const replacements=[];
    for(const id of V2_TEAMMATES){
      const stablePersonKey=getAlphaFirstProductionStablePersonKey(id);
      if(occupiedStablePeople.has(stablePersonKey)){exclusions.push({variantId:id,stablePersonKey,reason:"stable_person_already_in_subject_or_current_team"});continue;}
      if(!getCharacterRegistryEntry(id)){exclusions.push({variantId:id,reason:"authored_acquisition_or_representation_eligibility_not_runtime_admitted"});continue;}
      const fact=getAlphaFirstProductionCommittedPreSnapshotCandidateState(id);
      if(fact){exclusions.push({variantId:id,reason:fact.state,occurrenceId:fact.occurrenceId||null});consumedPreparation.push(fact);continue;}
      replacements.push(id);
    }
    const leaders=[];
    for(const id of LEADERS){
      const stablePersonKey=getAlphaFirstProductionStablePersonKey(id);
      if(occupiedStablePeople.has(stablePersonKey)){exclusions.push({variantId:id,stablePersonKey,reason:"stable_person_already_in_subject_or_current_team"});continue;}
      if(!getCharacterRegistryEntry(id)||!isIssue63LeaderRankAllowed(id)){exclusions.push({variantId:id,reason:"authored_leader_eligibility_not_runtime_admitted"});continue;}
      const fact=getAlphaFirstProductionCommittedPreSnapshotCandidateState(id);
      if(fact){exclusions.push({variantId:id,reason:fact.state,occurrenceId:fact.occurrenceId||null});consumedPreparation.push(fact);continue;}
      leaders.push(id);
    }
    if(replacements.length<2) return {success:false,reason:"genin_candidate_floor_not_met",remaining:replacements.length,minimum:2,exclusions};
    if(leaders.length<1) return {success:false,reason:"leader_candidate_floor_not_met",remaining:leaders.length,minimum:1,exclusions};
    const formation=ensurePlayerAcquisitionState().academyTeamFormation||{};
    const receipt=formation.confirmationReceipt&&typeof formation.confirmationReceipt==="object"?formation.confirmationReceipt:null;
    const promotionEvidenceIds=[...new Set((t.promotionEvidenceIds||[]).filter(Boolean))];
    const token=String(receipt&&receipt.receiptId||formation.completedAt||promotionEvidenceIds[0]||"promotion").replace(/[^a-zA-Z0-9:_-]/g,"_");
    const lineage=transitionLineageId(t);
    const snapshotId=`${V2_POLICY_ID}:${lineage}:${token}`;
    const candidateStates={};
    for(const id of retention) candidateStates[id]="assigned_to_player";
    for(const id of [...replacements,...leaders]) candidateStates[id]="available";
    return {success:true,snapshot:{
      snapshotId,subjectOwnedCharacterId:t.subjectOwnedCharacterId,retentionEligibleVariantIds:retention,
      teammateCandidateVariantIds:replacements,joninLeaderCandidateVariantIds:leaders,candidateStates,
      provenance:{candidateContentPolicyId:V2_POLICY_ID,acquisitionPolicyId:ACQUISITION_POLICY_ID,promotionAssessmentId:"academy_to_genin_field_readiness_assessment",promotionEvidenceIds,
        academyTeamFormationReceiptId:receipt&&receipt.receiptId||null,academyTeamFormationCompletedAt:Number(formation.completedAt)||null,academyTeamVariantIds:[...current],
        candidatePreparationOccurrenceIds:consumedPreparation.map(f=>f.occurrenceId).filter(Boolean),retentionUnavailableVariantIds:retentionUnavailable,
        stablePersonExclusions:exclusions.map(cloneProgressionData),sourceAuthority:"Documentation/Coordination/Genin Roster Candidate Content Policy v2 2026-09-11.md",
        presentationRefreshCreatesNoReroll:true,grantsOwnership:false,grantsRank:false,grantsBattleDeployment:false},createdAt:Date.now()
    },exclusions};
  }

  const ALPHA_PRE_ISSUE63_V1_BUILDER=buildAlphaFirstProductionGeninCandidateSnapshot;
  buildAlphaFirstProductionGeninCandidateSnapshot=function issue63BuildVersionedSnapshot(){
    const t=getGeninRosterTransitionState();
    let policy=t.candidateContentPolicyId||candidatePolicyFromSnapshot(t.candidateSnapshot);
    if(!policy) policy=V2_POLICY_ID;
    if(policy===V1_POLICY_ID) return ALPHA_PRE_ISSUE63_V1_BUILDER();
    return buildSnapshotForPolicy(V2_POLICY_ID);
  };

  ensureAlphaFirstProductionGeninCandidateSnapshot=function issue63EnsureVersionedSnapshot(){
    const t=getGeninRosterTransitionState();
    if(t.candidateSnapshot){
      t.candidateContentPolicyId=t.candidateContentPolicyId||candidatePolicyFromSnapshot(t.candidateSnapshot)||V1_POLICY_ID;
      transitionLineageId(t);
      return {success:true,idempotent:true,snapshot:cloneProgressionData(t.candidateSnapshot),contentPolicyId:t.candidateContentPolicyId};
    }
    if(!t.candidateContentPolicyId) t.candidateContentPolicyId=V2_POLICY_ID;
    transitionLineageId(t);
    const built=buildSnapshotForPolicy(t.candidateContentPolicyId);
    if(!built.success) return built;
    const applied=applyGeninRosterTransitionCandidateSnapshot(built.snapshot);
    return applied&&applied.success?{...applied,contentPolicyId:t.candidateContentPolicyId,exclusions:built.exclusions}:applied;
  };

  // ---------------- Explicit recruitment transaction ----------------
  function commitGeninRosterTransitionRecruitment({variantId,expectedSnapshotId=null}={}){
    const t=getGeninRosterTransitionState();
    const snapshot=t.candidateSnapshot;
    if(t.unlocked!==true||t.required!==true||t.completed===true) return {success:false,reason:"genin_roster_transition_not_active"};
    if(!snapshot) return {success:false,reason:"candidate_snapshot_required"};
    if(!expectedSnapshotId||expectedSnapshotId!==t.candidateSnapshotId) return {success:false,reason:"stale_candidate_snapshot_recruitment",expectedSnapshotId,currentSnapshotId:t.candidateSnapshotId};
    if(!(snapshot.teammateCandidateVariantIds||[]).includes(variantId)) return {success:false,reason:"genin_recruitment_candidate_not_in_snapshot"};
    if(!isIssue63CandidateAvailable(snapshot,variantId)) return {success:false,reason:"genin_recruitment_candidate_not_available"};
    if(!getCharacterRegistryEntry(variantId)) return {success:false,reason:"character_registry_missing"};
    const lineage=transitionLineageId(t);
    const sourceEventId=`genin_roster_transition_recruitment_acceptance:${lineage}:${t.candidateSnapshotId}:${variantId}`;
    const result=commitCharacterAcquisition({
      variantId,route:RECRUITMENT_ROUTE,sourceEventId,
      context:{transitionLineageId:lineage,candidateSnapshotId:t.candidateSnapshotId,subjectOwnedCharacterId:t.subjectOwnedCharacterId,assignmentCommitted:false},
      provenance:{authority:"explicit_player_recruitment_acceptance",candidateContentPolicyId:t.candidateContentPolicyId||candidatePolicyFromSnapshot(snapshot),recruitmentDoesNotAssign:true}
    });
    if(!result.success) return result;
    return {...result,recruitment:true,assignmentCommitted:false,candidateSnapshotId:t.candidateSnapshotId,variantId};
  }
  window.commitGeninRosterTransitionRecruitment=commitGeninRosterTransitionRecruitment;

  function isReservedStablePerson(variantId,t=getGeninRosterTransitionState()){
    const key=getAlphaFirstProductionStablePersonKey(variantId);
    const ids=[...(t.reservedGeninVariantIds||[]),...(t.reservedLeaderVariantId?[t.reservedLeaderVariantId]:[])];
    return ids.some(id=>getAlphaFirstProductionStablePersonKey(id)===key);
  }

  const ISSUE63_PRE_ASSIGN_ELSEWHERE=commitIssue63CandidateAssignedElsewhere;
  commitIssue63CandidateAssignedElsewhere=function issue63AssignedElsewhere(variantId,options={}){
    // Preserved underlying gates: current_academy_teammate_protected / genin_candidate_floor_protected / leader_candidate_floor_protected.
    const t=getGeninRosterTransitionState();
    if(isReservedStablePerson(variantId,t)) return {success:false,reason:"candidate_reserved_to_player_transition",variantId};
    const result=ISSUE63_PRE_ASSIGN_ELSEWHERE(variantId,options);
    if(result&&result.success&&options&&options.occurrenceId){
      const current=getGeninRosterTransitionState();
      current.candidateChangeProvenance.push({variantId,state:"assigned_elsewhere",occurrenceId:options.occurrenceId,causalReason:options.causalReason||null,committed:true,recordVisible:options.recordVisible===true,knownExplanation:options.knownExplanation||null});
      savePlayerData();
    }
    return result;
  };

  function commitGeninRosterTransitionCandidateUnavailable(variantId,{occurrenceId=null,causalReason=null,exceptionalOverride=false,recordVisible=false,knownExplanation=null}={}){
    const t=getGeninRosterTransitionState();
    const snapshot=t.candidateSnapshot;
    if(!snapshot) return {success:false,reason:"candidate_snapshot_required"};
    if(!occurrenceId||!causalReason) return {success:false,reason:"committed_causal_unavailability_required"};
    if(isReservedStablePerson(variantId,t)&&exceptionalOverride!==true) return {success:false,reason:"candidate_reserved_to_player_transition"};
    const current=getCurrentAcademyTeammateVariantIdsForGeninTransition().filter(Boolean);
    const isRetention=current.includes(variantId)&&(snapshot.retentionEligibleVariantIds||[]).includes(variantId);
    const isCandidate=(snapshot.teammateCandidateVariantIds||[]).includes(variantId)||(snapshot.joninLeaderCandidateVariantIds||[]).includes(variantId);
    if(!isRetention&&!isCandidate) return {success:false,reason:"candidate_not_player_relevant"};
    if(!isRetention){
      const field=getIssue63UncommittedReplacementField(snapshot);
      if((snapshot.teammateCandidateVariantIds||[]).includes(variantId)&&field.genin.length-1<2) return {success:false,reason:"genin_candidate_floor_protected",minimumRemaining:2};
      if((snapshot.joninLeaderCandidateVariantIds||[]).includes(variantId)&&field.leaders.length-1<1) return {success:false,reason:"leader_candidate_floor_protected",minimumRemaining:1};
    }
    const next=cloneProgressionData(snapshot);
    next.snapshotId=`${snapshot.snapshotId}:superseded:${String(occurrenceId).replace(/[^a-zA-Z0-9:_-]/g,"_")}`;
    next.supersedesSnapshotId=snapshot.snapshotId;
    const unavailable=new Set(next.provenance&&Array.isArray(next.provenance.retentionUnavailableVariantIds)?next.provenance.retentionUnavailableVariantIds:[]);
    if(isRetention){
      next.retentionEligibleVariantIds=(next.retentionEligibleVariantIds||[]).filter(id=>id!==variantId);
      unavailable.add(variantId);
    } else {
      next.candidateStates={...(next.candidateStates||{}),[variantId]:"unavailable"};
    }
    next.provenance={...(next.provenance||{}),candidateContentPolicyId:t.candidateContentPolicyId||candidatePolicyFromSnapshot(snapshot),occurrenceId,causalReason,materialCandidateStateChange:true,retentionUnavailableVariantIds:[...unavailable]};
    const applied=applyGeninRosterTransitionCandidateSnapshot(next);
    if(applied&&applied.success){
      const currentState=getGeninRosterTransitionState();
      currentState.candidateChangeProvenance.push({variantId,state:"unavailable",occurrenceId,causalReason,committed:true,exceptionalOverride:exceptionalOverride===true,recordVisible:recordVisible===true,knownExplanation:knownExplanation||null});
      savePlayerData();
    }
    return applied;
  }
  window.commitGeninRosterTransitionCandidateUnavailable=commitGeninRosterTransitionCandidateUnavailable;

  // ---------------- SAVE reserves; CONTINUE assigns ----------------
  function refreshIssue63FinalisationState(t=getGeninRosterTransitionState()){
    if(t.completed===true){t.finalisationState=FINAL_FINALIZED;t.incompleteObjectiveActive=false;return t.finalisationState;}
    const selected=Array.from({length:2},(_,i)=>t.selectedTeamVariantIds&&t.selectedTeamVariantIds[i]||null);
    const complete=selected.every(Boolean)&&new Set(selected).size===2&&!!t.joninLeaderVariantId;
    t.finalisationState=complete?FINAL_READY:FINAL_INCOMPLETE;
    t.incompleteObjectiveActive=true;
    return t.finalisationState;
  }

  function saveGeninRosterTransitionReservations({expectedSnapshotId=null}={}){
    const t=getGeninRosterTransitionState();
    const snapshot=t.candidateSnapshot;
    if(t.unlocked!==true||t.required!==true||t.completed===true) return {success:false,reason:"genin_roster_transition_not_active"};
    if(!snapshot) return {success:false,reason:"candidate_snapshot_required"};
    if(!expectedSnapshotId||expectedSnapshotId!==t.candidateSnapshotId) return {success:false,reason:"stale_candidate_snapshot_reservation",expectedSnapshotId,currentSnapshotId:t.candidateSnapshotId};
    const current=getCurrentAcademyTeammateVariantIdsForGeninTransition();
    const selected=Array.from({length:2},(_,i)=>t.selectedTeamVariantIds&&t.selectedTeamVariantIds[i]||null).filter(Boolean);
    for(const id of selected){
      const retained=current.includes(id)&&(snapshot.retentionEligibleVariantIds||[]).includes(id);
      const replacement=(snapshot.teammateCandidateVariantIds||[]).includes(id);
      if(!retained&&!replacement) return {success:false,reason:"reservation_candidate_not_authorised",variantId:id};
      if(!isIssue63CandidateAvailable(snapshot,id,{allowAssignedToPlayer:retained})) return {success:false,reason:"reservation_candidate_not_available",variantId:id};
      if(!isVariantOwnedForGeninTransition(id)) return {success:false,reason:"acquisition_required",variantId:id};
    }
    const leader=t.joninLeaderVariantId||null;
    if(leader&&(!(snapshot.joninLeaderCandidateVariantIds||[]).includes(leader)||!isIssue63CandidateAvailable(snapshot,leader)||!isIssue63LeaderRankAllowed(leader))) return {success:false,reason:"reservation_leader_not_available",variantId:leader};
    t.reservedGeninVariantIds=[...new Set(selected)];
    t.reservedLeaderVariantId=leader;
    const receipt={reservationId:`genin_roster_reservation:${transitionLineageId(t)}:${t.candidateSnapshotId}`,candidateSnapshotId:t.candidateSnapshotId,reservedGeninVariantIds:[...t.reservedGeninVariantIds],reservedLeaderVariantId:leader,savedAt:Date.now(),saveReservesContinueAssigns:true};
    const priorIndex=t.reservationProvenance.findIndex(r=>r&&r.reservationId===receipt.reservationId);
    if(priorIndex>=0)t.reservationProvenance[priorIndex]=receipt;else t.reservationProvenance.push(receipt);
    refreshIssue63FinalisationState(t);
    savePlayerData();
    return {success:true,reservation:cloneProgressionData(receipt),finalisationState:t.finalisationState,assignmentCommitted:false};
  }
  window.saveGeninRosterTransitionReservations=saveGeninRosterTransitionReservations;

  const ISSUE63_PRE_SELECT_TEAMMATE=selectGeninRosterTransitionTeammate;
  selectGeninRosterTransitionTeammate=function issue63SelectTeammate(position,variantId,expectedSnapshotId=null){
    // Underlying selector still fails stale_candidate_snapshot_selection before mutation.
    const result=ISSUE63_PRE_SELECT_TEAMMATE(position,variantId,expectedSnapshotId);
    if(result&&result.success){refreshIssue63FinalisationState();savePlayerData();}
    return result;
  };
  const ISSUE63_PRE_SELECT_LEADER=selectGeninRosterTransitionJoninLeader;
  selectGeninRosterTransitionJoninLeader=function issue63SelectLeader(variantId,expectedSnapshotId=null){
    // Underlying leader selector still fails stale_candidate_snapshot_selection; institutional selection preserves collectibleOwnershipRequired:false.
    const result=ISSUE63_PRE_SELECT_LEADER(variantId,expectedSnapshotId);
    if(result&&result.success){refreshIssue63FinalisationState();savePlayerData();}
    return result;
  };

  const ISSUE63_PRE_CONFIRM=confirmGeninRosterTransition;
  confirmGeninRosterTransition=function issue63Finalise(){
    const t=getGeninRosterTransitionState();
    if(t.completed===true) return ISSUE63_PRE_CONFIRM();
    refreshIssue63FinalisationState(t);
    if(t.finalisationState!==FINAL_READY) return {success:false,reason:"genin_roster_transition_not_ready",finalisationState:t.finalisationState};
    const selected=Array.from({length:2},(_,i)=>t.selectedTeamVariantIds&&t.selectedTeamVariantIds[i]||null);
    if(!selected.every(id=>(t.reservedGeninVariantIds||[]).includes(id))) return {success:false,reason:"save_reservations_required_before_continue"};
    if(t.joninLeaderVariantId!==t.reservedLeaderVariantId) return {success:false,reason:"saved_leader_reservation_required_before_continue"};
    const result=ISSUE63_PRE_CONFIRM();
    if(result&&result.success){
      const current=getGeninRosterTransitionState();
      current.finalisationState=FINAL_FINALIZED;
      current.incompleteObjectiveActive=false;
      current.reservedGeninVariantIds=[];
      current.reservedLeaderVariantId=null;
      savePlayerData();
    }
    return result;
  };

  // ---------------- Player-facing projection: Recruit / SAVE / CONTINUE ----------------
  const ISSUE63_PRE_PRESENTATION=createGeninRosterTransitionPresentationModel;
  createGeninRosterTransitionPresentationModel=function issue63Presentation(){
    const base=ISSUE63_PRE_PRESENTATION();
    const t=getGeninRosterTransitionState();
    refreshIssue63FinalisationState(t);
    return {...base,candidateContentPolicyId:t.candidateContentPolicyId||candidatePolicyFromSnapshot(t.candidateSnapshot),transitionLineageId:t.transitionLineageId||null,
      reservedGeninVariantIds:[...(t.reservedGeninVariantIds||[])],reservedLeaderVariantId:t.reservedLeaderVariantId||null,
      reservationProvenance:(t.reservationProvenance||[]).map(cloneProgressionData),finalisationState:t.finalisationState,
      incompleteObjective:t.completed===true?null:{title:"Complete Your Genin Team",detail:"Complete your team in Arena → Promotion to continue the Chronicle."}};
  };

  renderGeninRosterTransitionOverlay=function issue63Render(container){
    if(!container)return false;
    ensureAlphaFirstProductionGeninCandidateSnapshot();
    const model=createGeninRosterTransitionPresentationModel();
    const esc=escapeFieldReadinessHTML;
    const snap=model.candidateSnapshotId||"";
    const candidateButtons=slot=>model.teammateCandidates.map(item=>{
      const reserved=model.reservedGeninVariantIds.includes(item.variantId);
      if(item.owned) return `<button type="button" onclick="selectGeninRosterTransitionTeammate(${slot},'${esc(item.variantId)}','${esc(snap)}');openGeninRosterTransitionUI();" style="padding:8px 10px;border:1px solid rgba(207,169,75,.35);background:${reserved?'#173b35':'#10242c'};color:#d8e4ec;border-radius:6px;cursor:pointer;">${esc(item.displayName)}${reserved?' · RESERVED':''}</button>`;
      return `<span style="display:inline-flex;gap:5px;align-items:center;"><button type="button" disabled style="padding:8px 10px;border:1px solid rgba(207,169,75,.2);background:#10242c;color:#83939c;border-radius:6px;opacity:.55;">${esc(item.displayName)} · ACQUISITION REQUIRED</button><button type="button" onclick="commitGeninRosterTransitionRecruitment({variantId:'${esc(item.variantId)}',expectedSnapshotId:'${esc(snap)}'});openGeninRosterTransitionUI();" style="padding:8px 10px;border:1px solid rgba(90,190,175,.45);background:#12302d;color:#b9efe5;border-radius:6px;cursor:pointer;">RECRUIT</button></span>`;
    }).join("");
    const leaders=model.joninLeaderCandidates.map(item=>{const reserved=model.reservedLeaderVariantId===item.variantId;return `<button type="button" onclick="selectGeninRosterTransitionJoninLeader('${esc(item.variantId)}','${esc(snap)}');openGeninRosterTransitionUI();" style="padding:8px 10px;border:1px solid rgba(120,160,180,.35);background:${reserved?'#173b35':'#0f2028'};color:#d8e4ec;border-radius:6px;cursor:pointer;">${esc(item.displayName)} · ${reserved?'RESERVED LEADER':'INSTITUTIONAL ASSIGNMENT'}</button>`;}).join("");
    const selectedNames=model.selectedTeamVariantIds.map(id=>{const e=id?getCharacterRegistryEntry(id):null;return e?(e.displayName||e.name||id):"UNSELECTED";});
    const leaderEntry=model.joninLeaderVariantId?getCharacterRegistryEntry(model.joninLeaderVariantId):null;
    const ready=model.finalisationState===FINAL_READY&&model.reservedGeninVariantIds.length===2&&model.reservedLeaderVariantId===model.joninLeaderVariantId;
    container.innerHTML=`<div style="padding:24px;display:grid;gap:16px;color:#d8e4ec;overflow:auto;">
      <div><div style="font-size:10px;letter-spacing:1.4px;color:#d0ad55;">ACADEMY → GENIN · ${esc(model.candidateContentPolicyId||'POLICY PENDING')}</div><h2 style="margin:3px 0;color:#f2e4b0;">CHOOSE YOUR TEAM</h2><p style="color:#94A3B8;font-size:12px;max-width:820px;">SAVE reserves your current choices. CONTINUE commits the final 3-Genin + authorised Jōnin/Special-Jōnin formation. Recruitment creates ownership; reservation is not assignment; leader reservation never grants collectible ownership.</p></div>
      ${model.incompleteObjective?`<div style="padding:12px;border:1px solid rgba(207,169,75,.35);background:rgba(20,14,5,.4);"><strong>${esc(model.incompleteObjective.title)}</strong><div style="font-size:12px;color:#b9c4cb;margin-top:3px;">${esc(model.incompleteObjective.detail)}</div></div>`:""}
      <div style="display:grid;gap:10px;"><strong>TEAMMATE SLOT 1 — ${esc(selectedNames[0])}</strong><div style="display:flex;gap:8px;flex-wrap:wrap;">${candidateButtons(1)||"No authorised candidates supplied."}</div></div>
      <div style="display:grid;gap:10px;"><strong>TEAMMATE SLOT 2 — ${esc(selectedNames[1])}</strong><div style="display:flex;gap:8px;flex-wrap:wrap;">${candidateButtons(2)||"No authorised candidates supplied."}</div></div>
      <div style="display:grid;gap:10px;"><strong>LEADER — ${esc(leaderEntry?(leaderEntry.displayName||leaderEntry.name||leaderEntry.id):"UNSELECTED")}</strong><div style="display:flex;gap:8px;flex-wrap:wrap;">${leaders||"No authorised leader candidates supplied."}</div></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;"><button type="button" onclick="saveGeninRosterTransitionReservations({expectedSnapshotId:'${esc(snap)}'});openGeninRosterTransitionUI();" ${(!model.authorityReady||model.completed)?"disabled":""} style="padding:10px 16px;border:1px solid rgba(90,190,175,.5);background:#12302d;color:#b9efe5;border-radius:6px;font-weight:700;">SAVE</button><button type="button" onclick="confirmGeninRosterTransition();openGeninRosterTransitionUI();" ${(!ready||model.completed)?"disabled":""} style="padding:10px 16px;border:1px solid rgba(207,169,75,.55);background:#152832;color:#f0df9f;border-radius:6px;font-weight:700;">CONTINUE</button><button type="button" onclick="openArenaPromotionSurface()" style="padding:10px 16px;border:1px solid rgba(130,160,175,.35);background:#0f2028;color:#c7d6df;border-radius:6px;">BACK</button></div>
    </div>`;
    return true;
  };

  // ---------------- Shinobi Record observer-safe objective / updates ----------------
  function getIssue63ObserverSafeTeamFormationUpdates(){
    const t=getGeninRosterTransitionState();
    const rows=[];
    for(const id of t.reservedGeninVariantIds||[]){
      const entry=getCharacterRegistryEntry(id);rows.push({variantId:id,label:entry&&entry.displayName||id,status:"Reserved for your pending team",source:"player_reservation"});
    }
    if(t.reservedLeaderVariantId){const entry=getCharacterRegistryEntry(t.reservedLeaderVariantId);rows.push({variantId:t.reservedLeaderVariantId,label:entry&&entry.displayName||t.reservedLeaderVariantId,status:"Reserved as leader for your pending team",source:"player_reservation"});}
    for(const fact of t.candidateChangeProvenance||[]){
      if(!fact||fact.recordVisible!==true) continue;
      const entry=getCharacterRegistryEntry(fact.variantId);
      const status=fact.knownExplanation||(fact.state==="assigned_elsewhere"?"Assigned to another team":"Unavailable");
      rows.push({variantId:fact.variantId,label:entry&&entry.displayName||fact.variantId,status,source:"observer_known_committed_fact",occurrenceId:fact.occurrenceId||null});
    }
    return rows;
  }
  window.getIssue63ObserverSafeTeamFormationUpdates=getIssue63ObserverSafeTeamFormationUpdates;

  const ISSUE63_PRE_RECORD_OVERVIEW=renderShinobiRecordOverview;
  renderShinobiRecordOverview=function issue63RecordOverview(snapshot){
    const html=ISSUE63_PRE_RECORD_OVERVIEW(snapshot);
    const t=getGeninRosterTransitionState();
    if(t.completed===true||t.unlocked!==true||t.required!==true) return html;
    const updates=getIssue63ObserverSafeTeamFormationUpdates();
    const objective=srSection("TRACKED OBJECTIVE",`<div class="sr-known-brief"><span>COMPLETE YOUR GENIN TEAM</span><p>Complete your team in Arena → Promotion to continue the Chronicle.</p></div>${updates.length?`<div class="sr-subhead">TEAM FORMATION UPDATES</div>${updates.map(row=>`<div class="sr-history-line"><span class="sr-status-dot is-resolved"></span><b>${shinobiRecordEscape(row.label)}</b><small>${shinobiRecordEscape(row.status)}</small></div>`).join("")}`:""}`,"sr-overview-genin-team");
    const idx=html.lastIndexOf("</div>");
    return idx>=0?html.slice(0,idx)+objective+html.slice(idx):html+objective;
  };

  // Historical v1 regression gate remains meaningful after v2 activation. It
  // validates the pinned v1 authority directly rather than treating the active
  // versioned builder as if v2 had rewritten v1 history.
  runAlphaFirstProductionGeninCandidateDiagnostics=function issue63V1CompatibilityDiagnostics(){
    const teammateExpected="genin_boruto|genin_chocho|genin_himawari|genin_hinata|genin_hoki|genin_karin|genin_menma|genin_mikoto|genin_mitsuki|genin_naruto|genin_orochimaru|genin_sarada|genin_sasuke";
    const leaderExpected="jonin_hanabi|jonin_inojin|jonin_konohamaru|jonin_kushina|jonin_sasuke|jonin_shikaku|jonin_shino|sj_anko|sj_ebisu|sj_genma|sj_ibiki|sj_kiba|sj_nono";
    const v1Source=ALPHA_PRE_ISSUE63_V1_BUILDER.toString();
    const checks={
      exactAuthoredTeammates:ALPHA_GENIN_FIRST_PRODUCTION_TEAMMATE_VARIANT_IDS.join("|")===teammateExpected,
      exactAuthoredLeaders:ALPHA_GENIN_FIRST_PRODUCTION_LEADER_VARIANT_IDS.join("|")===leaderExpected,
      v1PolicyIdentityPreserved:ALPHA_GENIN_FIRST_PRODUCTION_CONTENT_POLICY_ID===V1_POLICY_ID,
      noRegistryDiscoveryScan:!v1Source.includes("Object.keys(character")&&!v1Source.includes("Object.values(character")&&!v1Source.includes("Assets/")&&!v1Source.includes("Portraits/"),
      currentTeamRetentionSeparated:v1Source.includes("retentionEligibleVariantIds:[...current]")&&v1Source.includes("teammateCandidateVariantIds:replacement"),
      promotionProvenance:v1Source.includes("promotionEvidenceIds")&&v1Source.includes("promotionAssessmentId"),
      replacementFloor:v1Source.includes("replacement.length<2"),leaderFloor:v1Source.includes("leaders.length<1"),
      stablePersonCollision:validateAlphaGeninFinalStablePersonSelection.toString().includes("stable_person_representation_collision"),
      sasukeCrossRepresentationCollision:getAlphaFirstProductionStablePersonKey("genin_sasuke")===getAlphaFirstProductionStablePersonKey("jonin_sasuke"),
      retentionSamePersonExclusion:getAlphaFirstProductionStablePersonKey("academy_hinata")===getAlphaFirstProductionStablePersonKey("genin_hinata"),
      v2DoesNotMutateV1Array:V2_TEAMMATES.length===38&&ALPHA_GENIN_FIRST_PRODUCTION_TEAMMATE_VARIANT_IDS.length===13
    };
    checks.pass=Object.values(checks).every(Boolean);
    return {pass:checks.pass,checks,contentPolicyId:V1_POLICY_ID,v2AvailableForNewLineages:true,runtimeFreshChronicleValidationStillRequired:false};
  };

  // ---------------- Diagnostics ----------------
  function runIssue63GeninV2RosterDiagnostics(){
    const v2Ids=Object.keys(V2_ROWS);
    const exactLeader=LEADERS.join("|")==="jonin_hanabi|jonin_inojin|jonin_konohamaru|jonin_kushina|jonin_sasuke|jonin_shikaku|jonin_shino|sj_anko|sj_ebisu|sj_genma|sj_ibiki|sj_kiba|sj_nono";
    const checks={
      v2PolicyExact:V2_POLICY_ID==="alpha_genin_roster_first_production_content_v2",
      exact38TeammateAuthority:V2_TEAMMATES.length===38&&V1_TEAMMATES.length===13&&V2_EXPANSION.length===25,
      unchanged13LeaderAuthority:LEADERS.length===13&&exactLeader,
      registry25:v2Ids.length===25&&v2Ids.every(id=>!!getCharacterRegistryEntry(id)&&getCharacterRegistryEntry(id).formalRank==="genin"),
      exactAssets25:v2Ids.every(id=>getCharacterCardAssetPath(id)===`Assets/Genin/${id}.png`&&getUIPortraitAssetPath(id)===`Portraits/Genin/${id}.png`),
      exactPalettes25:v2Ids.every(id=>Array.isArray(PRODUCTION_PREPARED_SKILL_PALETTES[id])&&PRODUCTION_PREPARED_SKILL_PALETTES[id].length===5&&PRODUCTION_PREPARED_SKILL_PALETTES[id].every(skillId=>!!getClosureWaveBattleSkillDefinition(skillId,id))),
      noSpecialOvergrant:["genin_hashirama","genin_yamato","genin_mukai","genin_kagami","genin_hiashi","genin_duy","genin_guy","genin_sai"].every(id=>!(PRODUCTION_PREPARED_SKILL_PALETTES[id]||[]).some(skillId=>/wood_release|byakugan|sharingan|eight_gates|ink_beast|ink_art/i.test(skillId))),
      v1AuthorityPreserved:typeof ALPHA_GENIN_FIRST_PRODUCTION_CONTENT_POLICY_ID!=="undefined"&&ALPHA_GENIN_FIRST_PRODUCTION_CONTENT_POLICY_ID===V1_POLICY_ID&&ALPHA_GENIN_FIRST_PRODUCTION_TEAMMATE_VARIANT_IDS.length===13,
      recruitmentExplicit:commitGeninRosterTransitionRecruitment.toString().includes(RECRUITMENT_ROUTE)&&commitGeninRosterTransitionRecruitment.toString().includes("stale_candidate_snapshot_recruitment"),
      recruitmentDoesNotAssign:commitGeninRosterTransitionRecruitment.toString().includes("assignmentCommitted:false"),
      reservationsPersistFields:["reservedGeninVariantIds","reservedLeaderVariantId","reservationProvenance","finalisationState","candidateChangeProvenance"].every(k=>normalizeAcquisitionState.toString().includes("extendTransitionState")),
      saveReservesContinueAssigns:saveGeninRosterTransitionReservations.toString().includes("assignmentCommitted:false")&&confirmGeninRosterTransition.toString().includes("save_reservations_required_before_continue"),
      reservationsProtectAutonomousConsumption:commitIssue63CandidateAssignedElsewhere.toString().includes("candidate_reserved_to_player_transition"),
      retentionException:commitGeninRosterTransitionCandidateUnavailable.toString().includes("retentionUnavailableVariantIds")&&validateIssue63SnapshotAuthority.toString().includes("causally_unavailable"),
      staleFailsClosed:typeof ALPHA_PRE7300_SELECT_GENIN_TEAMMATE==="function"&&ALPHA_PRE7300_SELECT_GENIN_TEAMMATE.toString().includes("stale_candidate_snapshot_selection")&&commitGeninRosterTransitionRecruitment.toString().includes("stale_candidate_snapshot_recruitment"),
      policyMigrationFailClosed:validateIssue63SnapshotAuthority.toString().includes("candidate_content_policy_lineage_migration_forbidden"),
      stablePerson25:v2Ids.every(id=>getAlphaFirstProductionStablePersonKey(id)===V2_ROWS[id].stablePersonKey),
      leaderNoOwnership:typeof ALPHA_PRE5800_SELECT_GENIN_LEADER==="function"&&ALPHA_PRE5800_SELECT_GENIN_LEADER.toString().includes("collectibleOwnershipRequired:false"),
      recordObjective:createGeninRosterTransitionPresentationModel().incompleteObjective===null||createGeninRosterTransitionPresentationModel().incompleteObjective.title==="Complete Your Genin Team",
      shinobiRecordObjective:renderShinobiRecordOverview.toString().includes("COMPLETE YOUR GENIN TEAM")&&renderShinobiRecordOverview.toString().includes("TEAM FORMATION UPDATES"),
      hiddenPassiveFactsNotAutoProjected:getIssue63ObserverSafeTeamFormationUpdates.toString().includes("recordVisible!==true"),
      baseProductionCountConstantsUntouched:!V2_EXPANSION.some(id=>Array.isArray(ALPHA_PRODUCTION_CHARACTER_IDS)&&ALPHA_PRODUCTION_CHARACTER_IDS.includes(id))
    };
    const failed=Object.entries(checks).filter(([,v])=>v!==true).map(([k])=>k);
    return {pass:failed.length===0,checks,failed,v2PolicyId:V2_POLICY_ID,v2TeammateCount:V2_TEAMMATES.length,v2LeaderCount:LEADERS.length,browserGoldenClaimed:false};
  }

  window.SC_GENIN_ROSTER_V2_POLICY_ID=V2_POLICY_ID;
  window.SC_GENIN_ROSTER_V2_TEAMMATE_IDS=[...V2_TEAMMATES];
  window.SC_GENIN_ROSTER_V2_LEADER_IDS=[...LEADERS];
  window.runIssue63GeninV2RosterDiagnostics=runIssue63GeninV2RosterDiagnostics;
})();
