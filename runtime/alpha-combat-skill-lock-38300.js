// ============================================================================
// ISSUE #383 — ACADEMY KAKASHI + MENMA SKILL NAME / NUMBER LOCK
// Authority:
// Documentation/Combat/SC_Combat_Academy_Kakashi_Menma_Skill_Name_and_Number_Lock_2026-09-26.md
// Authority commit: d280f8eff7bef1e946afb87aa05bb03879e781b8
// ============================================================================
// Narrow shared-Combat authority consumption:
// - preserves stable Skill machine IDs;
// - updates authored displayName on the canonical closure Skill objects;
// - preserves Menma raw 6 / 5 / 7 Attack PL;
// - changes only Kakashi Precision Strike's existing Clone Switch enhanced
//   contextual packet from ATK 7 to ATK 11 (normal ATK 5 unchanged);
// - consumes the already-closed Substitution Jutsu replacement authority using
//   the existing ratio-guard resolver;
// - updates the ordinary Kakashi prepared palette from Prodigy's Read to
//   Substitution Jutsu;
// - never clones canonical closure Skills, because resolver routing intentionally
//   uses their object identity.
// No Stats/Base PL, enemy calibration, Story, reward or generic Battle resolver
// authority is changed here.
// ============================================================================
(function installAcademyKakashiMenmaSkillLock38300(){
  "use strict";

  const PATCH_ID="academy_kakashi_menma_skill_lock_38300_2026_09_26";
  const KAKASHI="academy_kakashi";
  const MENMA="academy_menma";
  const PRODIGY="academy_kakashi_prodigys_read";
  const SUBSTITUTION="academy_kakashi_substitution_jutsu";
  const SUBSTITUTION_STATE="academy_kakashi_substitution_guard";

  const MENMA_NAMES=Object.freeze({
    academy_menma_chakra_knuckle:"Driving Chakra Fist",
    academy_menma_crescent_kunai:"Crescent Fang",
    academy_menma_guard_breaker:"Shattering Blow",
    academy_menma_shadow_clone_feint:"Shadow Clone Ambush",
    academy_menma_shadowstep:"Vanishing Step"
  });
  const KAKASHI_NAMES=Object.freeze({
    academy_kakashi_kunai_quickdraw:"Flash Kunai",
    academy_kakashi_clone_feint:"Clone Switch",
    academy_kakashi_opening_exploit:"Precision Strike",
    academy_kakashi_wire_snare:"Wire Fang",
    academy_kakashi_substitution_jutsu:"Substitution Jutsu"
  });
  const KAKASHI_PALETTE=Object.freeze([
    "academy_kakashi_kunai_quickdraw",
    "academy_kakashi_clone_feint",
    "academy_kakashi_opening_exploit",
    "academy_kakashi_wire_snare",
    SUBSTITUTION
  ]);

  function canonical(id,owner){
    if(typeof getClosureWaveBattleSkillDefinition!=="function")return null;
    try{return getClosureWaveBattleSkillDefinition(id,owner)||null;}catch(_error){return null;}
  }

  function setCanonicalDisplayNames(){
    for(const [id,name] of Object.entries(MENMA_NAMES)){
      const row=canonical(id,MENMA);
      if(row)row.displayName=name;
    }
    for(const [id,name] of Object.entries(KAKASHI_NAMES)){
      const row=canonical(id,KAKASHI);
      if(row)row.displayName=name;
    }
  }

  function installSubstitution(){
    let row=canonical(SUBSTITUTION,KAKASHI);
    if(!row&&typeof makeFactoryRatioGuardSkill==="function"&&typeof registerProductionFactorySkill==="function"){
      row=registerProductionFactorySkill(
        makeFactoryRatioGuardSkill(SUBSTITUTION,KAKASHI,0.50,{
          stateKey:SUBSTITUTION_STATE,
          oneUse:true,
          traits:["once_per_battle","direct_damage_packet_only"]
        })
      );
    }
    if(!row&&typeof CLOSURE_WAVE_1_BATTLE_SKILL_DATABASE!=="undefined"){
      CLOSURE_WAVE_1_BATTLE_SKILL_DATABASE[SUBSTITUTION]={
        id:SUBSTITUTION,
        displayName:"Substitution Jutsu",
        ownerRegistryId:KAKASHI,
        primaryDiscipline:null,
        targetMode:"self",
        actionClass:"defensive_technique",
        resolutionKind:"ratio_guard_state",
        staminaMitigation:null,
        traits:["once_per_battle","direct_damage_packet_only"],
        requirements:[],
        sourceRefs:[],
        guard:{
          stateKey:SUBSTITUTION_STATE,
          preventionRatio:0.50,
          attackMultiplier:0.50,
          oneUse:true
        }
      };
      row=CLOSURE_WAVE_1_BATTLE_SKILL_DATABASE[SUBSTITUTION];
    }
    if(row){
      row.displayName="Substitution Jutsu";
      row.ownerRegistryId=KAKASHI;
      row.primaryDiscipline=null;
      row.targetMode="self";
      row.actionClass="defensive_technique";
      row.resolutionKind="ratio_guard_state";
      row.staminaMitigation=null;
      row.traits=[...new Set([...(row.traits||[]),"once_per_battle","direct_damage_packet_only"])];
      row.requirements=Array.isArray(row.requirements)?row.requirements:[];
      row.guard={
        ...(row.guard||{}),
        stateKey:SUBSTITUTION_STATE,
        preventionRatio:0.50,
        attackMultiplier:0.50,
        oneUse:true
      };
    }
    return row;
  }

  function applyPrecisionStrikeNumber(){
    const row=canonical("academy_kakashi_opening_exploit",KAKASHI);
    if(!row||!row.contextualStateDamage)return null;
    row.contextualStateDamage={
      ...row.contextualStateDamage,
      stateKey:"academy_kakashi_clone_feint_opening",
      normalAttackPL:5,
      enhancedAttackPL:11,
      sourceMustBeActor:true,
      consume:true
    };
    return row;
  }

  function installKakashiPalette(){
    if(typeof PRODUCTION_PREPARED_SKILL_PALETTES!=="undefined"&&PRODUCTION_PREPARED_SKILL_PALETTES){
      PRODUCTION_PREPARED_SKILL_PALETTES[KAKASHI]=[...KAKASHI_PALETTE];
    }
    if(typeof characterRegistry!=="undefined"&&characterRegistry&&characterRegistry[KAKASHI]){
      characterRegistry[KAKASHI].exactPreparedSkillIds=[...KAKASHI_PALETTE];
    }
    if(typeof ACADEMY_BATTLE_PILOT_PREPARED_SKILLS!=="undefined"&&ACADEMY_BATTLE_PILOT_PREPARED_SKILLS){
      ACADEMY_BATTLE_PILOT_PREPARED_SKILLS[KAKASHI]=[...KAKASHI_PALETTE];
    }
  }

  function hasCommittedSubstitution(){
    try{
      const evidence=currentBattle&&currentBattle.runtime&&Array.isArray(currentBattle.runtime.evidence)
        ?currentBattle.runtime.evidence
        :[];
      return evidence.some(row=>
        row&&
        row.eventType==="skill_action_completed"&&
        row.committedOccurrence===true&&
        row.skillId===SUBSTITUTION&&
        row.actorRef&&row.actorRef.side==="player"&&
        row.actorRef.participantId===KAKASHI
      );
    }catch(_error){return false;}
  }

  function installSubstitutionOncePerBattleAvailability(){
    if(typeof evaluateClosureWaveSkillAvailability!=="function")return false;
    if(evaluateClosureWaveSkillAvailability.__issue383Wrapped===true)return true;
    const prior=evaluateClosureWaveSkillAvailability;
    const wrapped=function issue383ClosureAvailability(skill,actor,target=null){
      const base=prior.apply(this,arguments);
      if(!base||base.available!==true)return base;
      if(skill&&skill.id===SUBSTITUTION&&hasCommittedSubstitution()){
        return{
          ...base,
          available:false,
          reason:"once_per_battle_already_used",
          oncePerBattle:true
        };
      }
      return base;
    };
    wrapped.__issue383Wrapped=true;
    wrapped.__issue383Prior=prior;
    globalThis.evaluateClosureWaveSkillAvailability=wrapped;
    try{evaluateClosureWaveSkillAvailability=wrapped;}catch(_error){}
    return true;
  }

  function mitigation(attackPL,stamina){
    return Math.max(1,Math.floor(Number(attackPL)*100/(100+Number(stamina))));
  }

  installSubstitution();
  setCanonicalDisplayNames();
  applyPrecisionStrikeNumber();
  installKakashiPalette();
  installSubstitutionOncePerBattleAvailability();

  function paletteSnapshot(){
    if(typeof getProductionPreparedSkillIds==="function"){
      try{
        const ids=getProductionPreparedSkillIds(KAKASHI);
        if(Array.isArray(ids)&&ids.length)return ids;
      }catch(_error){}
    }
    if(typeof PRODUCTION_PREPARED_SKILL_PALETTES!=="undefined"&&PRODUCTION_PREPARED_SKILL_PALETTES){
      const ids=PRODUCTION_PREPARED_SKILL_PALETTES[KAKASHI];
      if(Array.isArray(ids))return [...ids];
    }
    if(typeof ACADEMY_BATTLE_PILOT_PREPARED_SKILLS!=="undefined"&&ACADEMY_BATTLE_PILOT_PREPARED_SKILLS){
      return [...(ACADEMY_BATTLE_PILOT_PREPARED_SKILLS[KAKASHI]||[])];
    }
    return [];
  }

  function runDiagnostics(){
    const menma=Object.keys(MENMA_NAMES).map(id=>canonical(id,MENMA));
    const kakashi=Object.keys(KAKASHI_NAMES).map(id=>canonical(id,KAKASHI));
    const opening=canonical("academy_kakashi_opening_exploit",KAKASHI);
    const substitution=canonical(SUBSTITUTION,KAKASHI);
    const palette=paletteSnapshot();
    const checks={
      exactMenmaNames:menma.every((row,i)=>row&&row.displayName===MENMA_NAMES[Object.keys(MENMA_NAMES)[i]]),
      menmaNumbersUnchanged:
        !!menma[0]&&Number(menma[0].authoredAttackPL)===6&&
        !!menma[1]&&Number(menma[1].authoredAttackPL)===5&&
        !!menma[2]&&Number(menma[2].authoredAttackPL)===7,
      exactKakashiNames:kakashi.every((row,i)=>row&&row.displayName===KAKASHI_NAMES[Object.keys(KAKASHI_NAMES)[i]]),
      normalPrecisionStrikeFive:!!opening&&!!opening.contextualStateDamage&&Number(opening.contextualStateDamage.normalAttackPL)===5,
      enhancedPrecisionStrikeEleven:!!opening&&!!opening.contextualStateDamage&&Number(opening.contextualStateDamage.enhancedAttackPL)===11,
      exactMitigation9_10_9:
        mitigation(11,13)===9&&mitigation(11,10)===10&&mitigation(11,17)===9,
      substitutionCanonical:
        !!substitution&&
        substitution.ownerRegistryId===KAKASHI&&
        substitution.resolutionKind==="ratio_guard_state"&&
        substitution.targetMode==="self"&&
        Number(substitution.guard&&substitution.guard.preventionRatio)===0.50&&
        Number(substitution.guard&&substitution.guard.attackMultiplier)===0.50&&
        substitution.guard&&substitution.guard.oneUse===true,
      substitutionOncePerBattleGate:
        typeof evaluateClosureWaveSkillAvailability==="function"&&
        evaluateClosureWaveSkillAvailability.__issue383Wrapped===true,
      substitutionPrepared:palette.includes(SUBSTITUTION),
      prodigysReadNotPrepared:!palette.includes(PRODIGY),
      exactKakashiFive:JSON.stringify(palette)===JSON.stringify(KAKASHI_PALETTE)
    };
    const failed=Object.entries(checks).filter(([,value])=>value!==true).map(([key])=>key);
    return Object.freeze({
      patchId:PATCH_ID,
      pass:failed.length===0,
      checks:Object.freeze(checks),
      failed:Object.freeze(failed),
      actualMenmaDisplayNames:Object.freeze(Object.fromEntries(Object.keys(MENMA_NAMES).map((id,i)=>[id,menma[i]&&menma[i].displayName||null]))),
      actualKakashiDisplayNames:Object.freeze(Object.fromEntries(Object.keys(KAKASHI_NAMES).map((id,i)=>[id,kakashi[i]&&kakashi[i].displayName||null]))),
      kakashiPalette:Object.freeze([...palette]),
      precisionStrike:Object.freeze({
        normalAttackPL:opening&&opening.contextualStateDamage?Number(opening.contextualStateDamage.normalAttackPL):null,
        enhancedAttackPL:opening&&opening.contextualStateDamage?Number(opening.contextualStateDamage.enhancedAttackPL):null
      }),
      substitution:Object.freeze({
        present:!!substitution,
        preventionRatio:substitution&&substitution.guard?Number(substitution.guard.preventionRatio):null,
        oneUse:!!(substitution&&substitution.guard&&substitution.guard.oneUse===true),
        oncePerBattleTrait:!!(substitution&&Array.isArray(substitution.traits)&&substitution.traits.includes("once_per_battle"))
      }),
      expectedMitigatedDamage:Object.freeze({maskedInterceptor:9,packageSmuggler:10,anbuMarkedTarget:9}),
      browserGoldenClaimed:false
    });
  }

  globalThis.SC_ISSUE_383_SKILL_LOCK=Object.freeze({
    patchId:PATCH_ID,
    menmaNames:MENMA_NAMES,
    kakashiNames:KAKASHI_NAMES,
    kakashiPalette:KAKASHI_PALETTE,
    enhancedPrecisionStrikeAttackPL:11,
    substitutionPreventionRatio:0.50,
    browserGoldenClaimed:false
  });
  globalThis.runIssue383SkillLockDiagnostics=runDiagnostics;
})();
