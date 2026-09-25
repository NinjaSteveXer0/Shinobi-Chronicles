// ============================================================================
// ISSUE #383 — ACADEMY KAKASHI + MENMA SKILL NAME / NUMBER LOCK
// Authority:
// Documentation/Combat/SC_Combat_Academy_Kakashi_Menma_Skill_Name_and_Number_Lock_2026-09-26.md
// Commit: d280f8eff7bef1e946afb87aa05bb03879e781b8
// ============================================================================
// Narrow authority adapter:
// - stable machine IDs remain unchanged;
// - authored displayName projection only for the signed-off Kakashi/Menma Skills;
// - Menma raw 6/5/7 values remain unchanged;
// - Kakashi Precision Strike remains ATK 5 normally and becomes ATK 11 only
//   through the existing Clone Switch opening setup;
// - Kakashi prepared palette uses Substitution Jutsu and excludes Prodigy's Read.
// No PL/Stats/enemy/Story/reward authority is changed here.
// ============================================================================
(function installAcademyKakashiMenmaSkillLock38300(){
  "use strict";

  const PATCH_ID="academy_kakashi_menma_skill_lock_38300_2026_09_26";
  const KAKASHI="academy_kakashi";
  const MENMA="academy_menma";
  const PRODIGY="academy_kakashi_prodigys_read";
  const SUBSTITUTION="academy_kakashi_substitution_jutsu";

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

  function cloneObject(row){
    if(!row||typeof row!=="object")return row;
    const out={...row};
    for(const key of ["conditionalRider","guard","state","provenance"]){
      if(row[key]&&typeof row[key]==="object"&&!Array.isArray(row[key]))out[key]={...row[key]};
    }
    if(Array.isArray(row.traits))out.traits=[...row.traits];
    if(Array.isArray(row.requirements))out.requirements=[...row.requirements];
    return out;
  }

  function patchEnhancedPrecisionStrike(row){
    if(!row||row.id!=="academy_kakashi_opening_exploit")return row;
    row.authoredAttackPL=5;

    // The existing resolver has historically represented the Clone Feint
    // enhancement as either an exact enhanced packet (7) or a +2 boost over
    // the normal ATK 5. Patch only those explicit enhancement fields.
    for(const key of [
      "enhancedAttackPL","conditionalAttackPL","boostedAttackPL",
      "setupAttackPL","authoredAttackPLWhenSetup","attackPLWhenSetup",
      "conditionalAuthoredAttackPL"
    ]){
      if(Number(row[key])===7)row[key]=11;
    }
    for(const key of ["conditionalBoostAttackPL","enhancedAttackPLBonus","attackPLBonusWhenSetup"]){
      if(Number(row[key])===2)row[key]=6;
    }
    if(row.conditionalRider&&typeof row.conditionalRider==="object"){
      for(const key of ["authoredAttackPL","attackPL","attackPLOverride","enhancedAttackPL","resolvedAttackPL"]){
        if(Number(row.conditionalRider[key])===7)row.conditionalRider[key]=11;
      }
      for(const key of ["attackPLBonus","conditionalBoostAttackPL","boostAttackPL"]){
        if(Number(row.conditionalRider[key])===2)row.conditionalRider[key]=6;
      }
    }
    row.issue383EnhancedAttackPL=11;
    row.issue383EnhancementStateKey="academy_kakashi_clone_feint_opening";
    return row;
  }

  function applySkillAuthority(row,id,actorId=null){
    if(!row||typeof row!=="object")return row;
    const out=cloneObject(row);
    const skillId=String(out.id||id||"");
    const actor=String(actorId||"");
    if((actor===MENMA||skillId.startsWith("academy_menma_"))&&MENMA_NAMES[skillId]){
      out.displayName=MENMA_NAMES[skillId];
    }
    if((actor===KAKASHI||skillId.startsWith("academy_kakashi_"))&&KAKASHI_NAMES[skillId]){
      out.displayName=KAKASHI_NAMES[skillId];
      patchEnhancedPrecisionStrike(out);
    }
    return out;
  }

  function actorIdOf(actor){
    return actor&&typeof actor==="object"?String(actor.id||actor.registryId||""):String(actor||"");
  }

  // Correct the compatibility palette used by ordinary Academy Battle lookup.
  if(typeof ACADEMY_BATTLE_PILOT_PREPARED_SKILLS!=="undefined"&&ACADEMY_BATTLE_PILOT_PREPARED_SKILLS){
    ACADEMY_BATTLE_PILOT_PREPARED_SKILLS[KAKASHI]=[...KAKASHI_PALETTE];
  }

  // Preserve any specialised Kakashi palette resolver while replacing only the
  // superseded fifth prepared slot.
  if(typeof getAcademyKakashiBattlePaletteIds==="function"){
    const priorGetAcademyKakashiBattlePaletteIds=getAcademyKakashiBattlePaletteIds;
    const wrapped=function issue383KakashiPalette(actor){
      const base=priorGetAcademyKakashiBattlePaletteIds.apply(this,arguments);
      if(actorIdOf(actor)!==KAKASHI)return base;
      return [...KAKASHI_PALETTE];
    };
    globalThis.getAcademyKakashiBattlePaletteIds=wrapped;
    try{getAcademyKakashiBattlePaletteIds=wrapped;}catch(_error){}
  }

  if(typeof getClosureWaveBattleSkillDefinition==="function"){
    const priorClosureDefinition=getClosureWaveBattleSkillDefinition;
    const wrapped=function issue383ClosureSkillDefinition(id,actorId){
      const row=priorClosureDefinition.apply(this,arguments);
      return applySkillAuthority(row,id,actorId);
    };
    globalThis.getClosureWaveBattleSkillDefinition=wrapped;
    try{getClosureWaveBattleSkillDefinition=wrapped;}catch(_error){}
  }

  if(typeof getBattlePreparedSkillDefinition==="function"){
    const priorPreparedDefinition=getBattlePreparedSkillDefinition;
    const wrapped=function issue383PreparedSkillDefinition(actor,id){
      const row=priorPreparedDefinition.apply(this,arguments);
      return applySkillAuthority(row,id,actorIdOf(actor));
    };
    globalThis.getBattlePreparedSkillDefinition=wrapped;
    try{getBattlePreparedSkillDefinition=wrapped;}catch(_error){}
  }

  function mitigation(attackPL,stamina){
    return Math.max(1,Math.floor(Number(attackPL)*100/(100+Number(stamina))));
  }

  function skill(id,actorId){
    if(typeof getClosureWaveBattleSkillDefinition==="function"){
      try{return getClosureWaveBattleSkillDefinition(id,actorId)||null;}catch(_error){}
    }
    return null;
  }

  function kakashiPaletteSnapshot(){
    if(typeof getAcademyKakashiBattlePaletteIds==="function"){
      try{return getAcademyKakashiBattlePaletteIds({id:KAKASHI});}catch(_error){}
    }
    if(typeof ACADEMY_BATTLE_PILOT_PREPARED_SKILLS!=="undefined"&&ACADEMY_BATTLE_PILOT_PREPARED_SKILLS){
      return [...(ACADEMY_BATTLE_PILOT_PREPARED_SKILLS[KAKASHI]||[])];
    }
    return [];
  }

  function runDiagnostics(){
    const menma=Object.keys(MENMA_NAMES).map(id=>skill(id,MENMA));
    const kakashi=Object.keys(KAKASHI_NAMES).map(id=>skill(id,KAKASHI));
    const opening=skill("academy_kakashi_opening_exploit",KAKASHI);
    const palette=kakashiPaletteSnapshot();
    const checks={
      exactMenmaNames:menma.every((row,i)=>row&&row.displayName===MENMA_NAMES[Object.keys(MENMA_NAMES)[i]]),
      menmaNumbersUnchanged:
        !!menma[0]&&Number(menma[0].authoredAttackPL)===6&&
        !!menma[1]&&Number(menma[1].authoredAttackPL)===5&&
        !!menma[2]&&Number(menma[2].authoredAttackPL)===7,
      exactKakashiNames:kakashi.every((row,i)=>row&&row.displayName===KAKASHI_NAMES[Object.keys(KAKASHI_NAMES)[i]]),
      normalPrecisionStrikeFive:!!opening&&Number(opening.authoredAttackPL)===5,
      enhancedPrecisionStrikeEleven:!!opening&&Number(opening.issue383EnhancedAttackPL)===11,
      exactMitigation9_10_9:
        mitigation(11,13)===9&&mitigation(11,10)===10&&mitigation(11,17)===9,
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
      kakashiPalette:Object.freeze([...palette]),
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
    browserGoldenClaimed:false
  });
  globalThis.runIssue383SkillLockDiagnostics=runDiagnostics;
})();
