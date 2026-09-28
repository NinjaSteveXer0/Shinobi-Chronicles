// ============================================================================
// ACADEMY ORIGIN — EIGHT PALETTE DISPLAY NAME LOCK — #400
//
// Combat authority:
// Documentation/Combat/SC_Combat_Academy_Origin_Eight_Palette_Display_Name_Lock_2026-09-27.md
//
// Display projection only. Stable IDs, prepared-slot order and mechanics remain
// owned by the existing shared Combat definitions in game.js.
// ============================================================================
(function installAcademyOriginSkillDisplayNames400(){
"use strict";
if(globalThis.SC_ALPHA_ORIGIN_SKILL_DISPLAY_NAMES_400)return;

const PATCH_ID="academy_origin_skill_display_names_400_2026_09_27";
const NAMES=Object.freeze({
  academy_hinata:Object.freeze({
    academy_hinata_gentle_palm:"Gentle Fist: Flowing Palm",
    academy_hinata_twin_palm_guard:"Gentle Fist: Twin Palm Ward",
    academy_hinata_palm_counter:"Gentle Fist: Reversal Palm",
    academy_hinata_academy_shuriken:"Silent Arc Shuriken",
    academy_hinata_gentle_step:"Gentle Step: Flowing Circle"
  }),
  academy_izuno:Object.freeze({
    academy_izuno_pouncing_palm:"Cat Fang Palm",
    academy_izuno_shuriken_pounce:"Prowling Shuriken",
    academy_izuno_catstep_feint:"Cat's Paw Feint",
    academy_izuno_wall_spring:"Clawstep Rebound",
    academy_izuno_clone_pounce:"Phantom Pounce"
  }),
  academy_mirai:Object.freeze({
    academy_mirai_twin_kunai:"Twin Fang Kunai",
    academy_mirai_wire_trip:"Crosswire Bind",
    academy_mirai_false_footstep:"Phantom Footfall",
    academy_mirai_guarding_blade:"Crossblade Guard",
    academy_mirai_crossing_strike:"Crossing Fang"
  }),
  academy_kushina:Object.freeze({
    academy_kushina_red_whirlwind:"Crimson Whirlwind",
    academy_kushina_beginner_binding_formula:"Uzumaki Binding Script",
    academy_kushina_iron_will_brace:"Iron-Heart Guard",
    academy_kushina_headstrong_counter:"Crimson Reversal",
    academy_kushina_seal_tag_toss:"Spiral Seal Tag"
  }),
  academy_kurenai:Object.freeze({
    academy_kurenai_false_opening:"Petal Mirage",
    academy_kurenai_feinting_kunai:"Mirage Kunai",
    academy_kurenai_false_step_genjutsu:"Phantom Petal Step",
    academy_kurenai_veiled_guard:"Petal Veil",
    academy_kurenai_genjutsu_release:"Veilbreak"
  }),
  academy_iwabee:Object.freeze({
    academy_iwabee_iron_staff_smash:"Stonebreaker Staff",
    academy_iwabee_staff_sweep:"Bedrock Sweep",
    academy_iwabee_earth_style_rising_wall:"Earth Style: Rising Rampart",
    academy_iwabee_stone_snare:"Earth Style: Stone Grasp",
    academy_iwabee_grounded_stance:"Bedrock Stance"
  }),
  academy_metal_lee:Object.freeze({
    academy_metal_lee_leaf_rising_kick:"Leaf Rising Heel",
    academy_metal_lee_training_flurry:"Leaf Driving Barrage",
    academy_metal_lee_pressure_rhythm:"Fighting Spirit",
    academy_metal_lee_guarded_footwork:"Iron Footwork",
    academy_metal_lee_conditioned_endurance:"Ironbody Conditioning"
  }),
  academy_obito:Object.freeze({
    academy_obito_fire_style_ember_burst:"Fire Style: Cinder Burst",
    academy_obito_headlong_rush:"Hot-Blooded Charge",
    academy_obito_uchiha_shuriken_rush:"Uchiha Shuriken Storm",
    academy_obito_protective_intercept:"Comrade Guard",
    academy_obito_determined_stand:"Uchiha Resolve"
  })
});

const PALETTE_BEFORE=Object.freeze(Object.fromEntries(
  Object.keys(NAMES).map(owner=>[owner,Object.freeze([...(PRODUCTION_PREPARED_SKILL_PALETTES[owner]||[])])])
));

function canonicalSkill(owner,id){
  return typeof getClosureWaveBattleSkillDefinition==="function"
    ? getClosureWaveBattleSkillDefinition(id,owner)
    : null;
}

function install(){
  const missing=[];
  Object.entries(NAMES).forEach(([owner,map])=>{
    Object.entries(map).forEach(([id,displayName])=>{
      const skill=canonicalSkill(owner,id);
      if(!skill){missing.push({owner,id});return;}
      // #400 is deliberately presentation-only.
      skill.displayName=displayName;
    });
  });
  return{success:missing.length===0,missing};
}

function diagnostics(){
  const rows=[];
  Object.entries(NAMES).forEach(([owner,map])=>{
    Object.entries(map).forEach(([id,displayName])=>{
      const skill=canonicalSkill(owner,id);
      rows.push({owner,id,expected:displayName,actual:skill&&skill.displayName||null});
    });
  });
  const checks={
    exactEightOwners:Object.keys(NAMES).length===8,
    exactFortyNames:rows.length===40,
    everyCanonicalSkillExists:rows.every(row=>!!canonicalSkill(row.owner,row.id)),
    everyDisplayNameExact:rows.every(row=>row.actual===row.expected),
    paletteOrderUnchanged:Object.keys(NAMES).every(owner=>
      JSON.stringify(PRODUCTION_PREPARED_SKILL_PALETTES[owner]||[])===JSON.stringify(PALETTE_BEFORE[owner]||[])
    ),
    stableIdsPreserved:rows.every(row=>canonicalSkill(row.owner,row.id).id===row.id),
    stoneGraspNameOnly:(()=>{
      const skill=canonicalSkill("academy_iwabee","academy_iwabee_stone_snare");
      return !!skill&&skill.displayName==="Earth Style: Stone Grasp";
    })(),
    menmaExcluded:!Object.prototype.hasOwnProperty.call(NAMES,"academy_menma"),
    kakashiExcluded:!Object.prototype.hasOwnProperty.call(NAMES,"academy_kakashi"),
    authoredDisplayNameWins:typeof renderTemporaryBattleSkillDeck==="function"&&
      String(renderTemporaryBattleSkillDeck).includes("skill.displayName||getFactorySkillDisplayName(skill.id)")
  };
  const failed=Object.entries(checks).filter(([,value])=>value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,rows,paletteBefore:PALETTE_BEFORE};
}

const installed=install();
if(!installed.success)throw new Error("origin_skill_display_name_authority_missing:"+JSON.stringify(installed.missing));

globalThis.runAcademyOriginSkillDisplayNames400Diagnostics=diagnostics;
globalThis.SC_ALPHA_ORIGIN_SKILL_DISPLAY_NAMES_400=Object.freeze({
  patchId:PATCH_ID,
  ownerIds:Object.freeze(Object.keys(NAMES)),
  displayNameCount:40,
  stableIdsUnchanged:true,
  mechanicsUnchanged:true,
  paletteOrderUnchanged:true
});
})();
