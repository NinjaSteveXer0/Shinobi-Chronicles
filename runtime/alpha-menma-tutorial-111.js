// =========================================================
// ISSUE #111 — ACADEMY MENMA TUTORIAL / ALPHA-ACTIVE COMBAT
// Authority: Documentation/Combat/
// SC_Combat_Academy_Menma_Tutorial_Start_State_and_Alpha_Active_Content_Slice_2026-09-11.md
// Stable policy: alpha_combat_content_projection_v1_2026_09_11
// =========================================================
(function installAcademyMenmaTutorial111(){
  "use strict";

  const POLICY_ID="alpha_combat_content_projection_v1_2026_09_11";
  const EXACT_INITIAL_PALETTE=Object.freeze([
    "academy_menma_chakra_knuckle",
    "academy_menma_crescent_kunai",
    "academy_menma_guard_breaker",
    "academy_menma_shadow_clone_feint",
    "academy_menma_shadowstep"
  ]);
  const LEGACY_KURAMA_GATED=Object.freeze([
    "academy_menma_yin_chakra_pulse",
    "academy_menma_fox_chakra_strike",
    "academy_menma_kuramas_guidance"
  ]);

  // The old pilot table remains a compatibility surface elsewhere in runtime.
  // Correct only Academy Menma's stale row; do not bulk-activate catalogue rows.
  if (typeof ACADEMY_BATTLE_PILOT_PREPARED_SKILLS!=="undefined") {
    ACADEMY_BATTLE_PILOT_PREPARED_SKILLS.academy_menma=[...EXACT_INITIAL_PALETTE];
  }

  // Ordinary Menma must restore to the ratified five-action production palette,
  // not the pre-closure three-action Kurama-gated pilot row.
  if (typeof getAcademyMenmaBattlePaletteIds==="function") {
    const priorGetAcademyMenmaBattlePaletteIds=getAcademyMenmaBattlePaletteIds;
    getAcademyMenmaBattlePaletteIds=function issue111MenmaPalette(actor){
      if (!actor||actor.id!=="academy_menma") return priorGetAcademyMenmaBattlePaletteIds(actor);
      const mantleKey=typeof createEffectiveStateProjectionKey==="function"
        ? createEffectiveStateProjectionKey("academy_menma","yin_chakra_mantle_academy","active_transformation")
        : null;
      const mantleActive=mantleKey&&typeof getBattleEffectiveStateProjection==="function"
        ? !!getBattleEffectiveStateProjection(mantleKey,"player",actor.id)
        : false;
      if (mantleActive && typeof ACADEMY_MENMA_MANTLE_PREPARED_SKILLS!=="undefined") {
        return [...ACADEMY_MENMA_MANTLE_PREPARED_SKILLS];
      }
      return [...EXACT_INITIAL_PALETTE];
    };
  }

  function hasLegitimateShadowstepRoute(){
    const factKeys=[
      "academy_menma_shadowstep_route",
      "legitimate_reposition_route",
      "legitimate_route"
    ];
    if (typeof getBattleContextFact==="function" && factKeys.some(key=>getBattleContextFact(key)===true)) return true;
    const tagKeys=[
      "academy_menma_shadowstep_route",
      "legitimate_reposition_route",
      "legitimate_route"
    ];
    return typeof battleContextHasTag==="function" && tagKeys.some(tag=>battleContextHasTag(tag));
  }

  // Shadowstep is prepared, but a request with no legitimate current route must
  // reject before action-envelope/history creation. attemptClosureWaveBattleSkill
  // already asks availability before createBattleActionEnvelope/begin resolution.
  if (typeof evaluateClosureWaveSkillAvailability==="function") {
    const priorEvaluateClosureWaveSkillAvailability=evaluateClosureWaveSkillAvailability;
    evaluateClosureWaveSkillAvailability=function issue111Availability(skill,actor,target=null){
      const base=priorEvaluateClosureWaveSkillAvailability(skill,actor,target);
      if (!base||base.available!==true) return base;
      if (skill&&skill.id==="academy_menma_shadowstep"&&!hasLegitimateShadowstepRoute()) {
        return {available:false,reason:"legitimate_current_route_required",precommit:true,noActionHistory:true};
      }
      return base;
    };
  }

  function skill(id){
    return typeof getClosureWaveBattleSkillDefinition==="function"
      ? getClosureWaveBattleSkillDefinition(id,"academy_menma")
      : null;
  }

  function runDiagnostics(){
    const palette=typeof getAcademyMenmaBattlePaletteIds==="function"
      ? getAcademyMenmaBattlePaletteIds({id:"academy_menma"})
      : [];
    const knuckle=skill("academy_menma_chakra_knuckle");
    const kunai=skill("academy_menma_crescent_kunai");
    const breaker=skill("academy_menma_guard_breaker");
    const feint=skill("academy_menma_shadow_clone_feint");
    const shadowstep=skill("academy_menma_shadowstep");
    const attemptSource=typeof attemptClosureWaveBattleSkill==="function"?attemptClosureWaveBattleSkill.toString():"";
    const checks={
      policyIdStable:POLICY_ID==="alpha_combat_content_projection_v1_2026_09_11",
      exactFreshPreparedFive:JSON.stringify(palette)===JSON.stringify(EXACT_INITIAL_PALETTE),
      staleKuramaThreeAbsent:LEGACY_KURAMA_GATED.every(id=>!palette.includes(id)),
      noGenericBasicOrGuard:palette.every(id=>!/basic_attack|basic_guard|generic_guard/i.test(id)),
      chakraKnuckleExact:!!knuckle&&Number(knuckle.authoredAttackPL)===6&&(knuckle.requirements||[]).length===0,
      crescentKunaiExactNoInventoryRequirement:!!kunai&&Number(kunai.authoredAttackPL)===5&&(kunai.requirements||[]).length===0,
      guardBreakerParentExact:!!breaker&&Number(breaker.authoredAttackPL)===7&&(breaker.requirements||[]).length===0&&!!breaker.conditionalRider&&breaker.conditionalRider.automatic===false,
      cloneFeintStateNoParticipant:!!feint&&feint.resolutionKind==="transient_state"&&feint.state&&feint.state.stateKey==="academy_menma_clone_feint"&&(feint.traits||[]).includes("temporary_clone_construct_not_participant"),
      shadowstepPreparedAndContextual:!!shadowstep&&palette.includes(shadowstep.id)&&(shadowstep.traits||[]).includes("requires_legitimate_route"),
      shadowstepRejectsPrecommit:typeof evaluateClosureWaveSkillAvailability==="function"&&evaluateClosureWaveSkillAvailability.toString().includes("legitimate_current_route_required")&&attemptSource.indexOf("evaluateClosureWaveSkillAvailability")<attemptSource.indexOf("createBattleActionEnvelope"),
      noKuramaBootstrapByPalette:LEGACY_KURAMA_GATED.every(id=>!palette.includes(id)),
      noDefaultKinjutsuObservation:[knuckle,kunai,breaker,feint,shadowstep].every(row=>row&&row.primaryDiscipline!=="Kinjutsu"&&!(row.traits||[]).includes("kinjutsu_observation_qualifying")),
      exactFourAlphaEquipment:typeof ALPHA_PRODUCTION_EQUIPMENT_IDS!=="undefined"&&JSON.stringify(ALPHA_PRODUCTION_EQUIPMENT_IDS)===JSON.stringify(["kunai","shuriken_set","ninja_wire","bandit_captains_tanto"]),
      exactThreeBattlePouch:typeof getLiveBattlePouchItemIds==="function"&&JSON.stringify(getLiveBattlePouchItemIds())===JSON.stringify(["field_recovery_pill","standard_antidote","burn_treatment"]),
      noImageDependency:![...EXACT_INITIAL_PALETTE,POLICY_ID].some(value=>/\.png|Assets\/|Portraits\//.test(value)),
      authoredCatalogueNotBulkPrepared:palette.length===5
    };
    const failed=Object.entries(checks).filter(([,value])=>value!==true).map(([key])=>key);
    return {policyId:POLICY_ID,pass:failed.length===0,checks,failed,preparedSkillIds:[...palette]};
  }

  window.SC_ALPHA_COMBAT_CONTENT_PROJECTION_POLICY_ID=POLICY_ID;
  window.SC_ISSUE_111_MENMA_INITIAL_PALETTE=[...EXACT_INITIAL_PALETTE];
  window.runIssue111AcademyMenmaTutorialDiagnostics=runDiagnostics;
})();
