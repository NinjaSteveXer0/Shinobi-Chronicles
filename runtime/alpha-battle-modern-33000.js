// ============================================================================
// ALPHA BATTLE 2.0 PRESENTATION LAYER — 33000
// User-approved interaction contract:
//   HOVER / FOCUS = LEARN
//   CLICK = ACT
// Genuine second-order choices (branch/mode/target) remain explicit.
//
// Presentation only. Reuses the existing Battle resolver, Skill availability,
// target selection, repeat-use legality, Battle PL, conditions, reward commit,
// caller restoration and Chronicle history. No resolver semantics are replaced.
// ============================================================================
(function installAlphaBattleModern33000(){
  "use strict";

  const PATCH_ID="alpha_battle_modern_33000_2026_09_23_formation_stage";
  const YOUTH_READING_TARGET="12-13";
  const KNOWN_SETUP_LABELS=Object.freeze({
    academy_menma_clone_feint:"SHADOW CLONE FEINT"
  });

  function esc(value){
    if(typeof escapeStorySceneHTML==="function")return escapeStorySceneHTML(String(value??""));
    return String(value??"").replace(/[&<>\"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
  }

  function getActiveBattleActor33000(){
    try{
      if(currentBattle&&currentBattle.activePlayer)return currentBattle.activePlayer;
      if(typeof getBattleDeploymentParticipant==="function")return getBattleDeploymentParticipant("player",1)||null;
    }catch(_error){}
    return null;
  }

  function getActiveBattleEnemy33000(){
    try{
      if(typeof getBattleDeploymentParticipant==="function"){
        const participant=getBattleDeploymentParticipant("enemy",1);
        if(participant)return participant;
      }
      return currentBattle&&currentBattle.enemy||selectedEnemy||null;
    }catch(_error){return null;}
  }

  function skillKind33000(skill){
    if(!skill)return "TECHNIQUE";
    const kind=String(skill.resolutionKind||"");
    if(kind==="direct_damage"||kind==="area_damage"||kind==="damage_with_persistent_state"||kind==="branch_damage")return "DAMAGE";
    if(kind==="ratio_guard_state")return "DEFENSE";
    if(kind==="restore_underlying_battle_pl")return "RECOVERY";
    if(kind==="dynamic_control"||kind==="condition_remove")return "CONTROL";
    if(kind==="transient_state"||kind==="categorical_evidence")return "SETUP";
    return String(skill.actionClass||skill.type||"TECHNIQUE").replaceAll("_"," ").toUpperCase();
  }

  function attackValue33000(skill){
    if(!skill)return null;
    if(Number.isFinite(Number(skill.authoredAttackPL)))return Number(skill.authoredAttackPL);
    if(Number.isFinite(Number(skill.authoredAttackPLPerTarget)))return Number(skill.authoredAttackPLPerTarget);
    if(Number.isFinite(Number(skill.attackPL)))return Number(skill.attackPL);
    return null;
  }

  function sentence33000(value){
    const text=String(value||"").trim();
    if(!text)return "";
    return /[.!?]$/.test(text)?text:`${text}.`;
  }

  function getBattleSkillYouthSummary33000(skill){
    if(!skill)return {
      title:"Learn the Skill before you use it",
      summary:"Move your mouse over a Skill to see what it does. Click the Skill when you are ready to use it.",
      details:[],kind:"TECHNIQUE",attackPL:null,tags:["HOVER TO LEARN","CLICK TO USE"]
    };
  
    const exact={
      academy_hinata_gentle_palm:{summary:"Deals 5 ATK to one enemy.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_hinata_twin_palm_guard:{summary:"Reduce the next direct hit against you by 30%.",details:["Works once."],tags:["DEFENSE","GUARD"]},
      academy_hinata_palm_counter:{summary:"Use a reactive palm counter when an enemy attack gives you an opening.",details:["No direct damage by itself."],tags:["COUNTER","CONTEXT REQUIRED"]},
      academy_hinata_academy_shuriken:{summary:"Deals 4 ATK to one enemy with a shuriken throw.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_hinata_gentle_step:{summary:"Move to a new position when a real route is available.",details:["Movement, not teleportation."],tags:["MOVEMENT","CONTEXT REQUIRED"]},
  
      academy_izuno_pouncing_palm:{summary:"Deals 5 ATK to one enemy with a fast palm strike.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_izuno_shuriken_pounce:{summary:"Deals 5 ATK to one enemy with a moving shuriken attack.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_izuno_catstep_feint:{summary:"Use quick footwork to set up a feint when the situation allows it.",details:["No direct damage."],tags:["SETUP"]},
      academy_izuno_wall_spring:{summary:"Spring off a nearby surface to move to a new position.",details:["Needs a real surface or route. Not teleportation."],tags:["MOVEMENT","CONTEXT REQUIRED"]},
      academy_izuno_clone_pounce:{summary:"Use a clone-assisted feint against one enemy.",details:["No direct damage and no automatic deception."],tags:["SETUP","ONE ENEMY"]},
  
      academy_mirai_twin_kunai:{summary:"Deals 5 ATK to one enemy with a twin-kunai attack.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_mirai_wire_trip:{summary:"Bind one enemy with wire so moves needing free movement are blocked.",details:["Control, not a full Stun."],tags:["CONTROL","ONE ENEMY"]},
      academy_mirai_false_footstep:{summary:"Use Genjutsu to confuse how your movement is read.",details:["It does not automatically fool the enemy."],tags:["SETUP","GENJUTSU"]},
      academy_mirai_guarding_blade:{summary:"Reduce the next direct hit against you by 25%.",details:["Works once."],tags:["DEFENSE","GUARD"]},
      academy_mirai_crossing_strike:{summary:"Deals 6 ATK to one enemy.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
  
      academy_kushina_red_whirlwind:{summary:"Deals 6 ATK to one enemy with a forceful spinning attack.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_kushina_beginner_binding_formula:{summary:"Use a sealing formula to bind one enemy.",details:["Control, not a full Stun."],tags:["CONTROL","ONE ENEMY"]},
      academy_kushina_iron_will_brace:{summary:"Reduce the next direct hit against you by 30%.",details:["Works once."],tags:["DEFENSE","GUARD"]},
      academy_kushina_headstrong_counter:{summary:"Deals 6 ATK to one enemy.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_kushina_seal_tag_toss:{summary:"Place a seal tag on one enemy for a compatible follow-up.",details:["No direct damage."],tags:["SETUP","ONE ENEMY"]},
  
      academy_kurenai_false_opening:{summary:"Create a false opening around one enemy.",details:["Mirage Kunai can exploit it. No direct damage."],tags:["SETUP","ONE ENEMY"]},
      academy_kurenai_feinting_kunai:{summary:"Deals 4 ATK, or 6 ATK after Petal Mirage.",details:["Using the opening consumes it. Stamina reduces damage."],tags:["DAMAGE","SETUP FOLLOW-UP"]},
      academy_kurenai_false_step_genjutsu:{summary:"Use Genjutsu to make your movement harder to read.",details:["It does not automatically fool the enemy."],tags:["SETUP","GENJUTSU"]},
      academy_kurenai_veiled_guard:{summary:"Reduce the next direct hit against you by 25%.",details:["Works once."],tags:["DEFENSE","GUARD"]},
      academy_kurenai_genjutsu_release:{summary:"Attempt to break a compatible Genjutsu effect on yourself.",details:["Works only when there is a valid effect to release."],tags:["CONTROL","CLEANSE"]},
  
      academy_iwabee_iron_staff_smash:{summary:"Deals 6 ATK to one enemy with a heavy staff strike.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_iwabee_staff_sweep:{summary:"Deals 4 ATK to up to 2 enemies with a staff sweep.",details:["Stamina reduces each hit."],tags:["DAMAGE","AREA"]},
      academy_iwabee_earth_style_rising_wall:{summary:"Reduce the next direct hit against you by 35%.",details:["Works once."],tags:["DEFENSE","GUARD"]},
      academy_iwabee_stone_snare:{summary:"Trap one enemy with stone to restrict them.",details:["Control, not a full Stun."],tags:["CONTROL","ONE ENEMY"]},
      academy_iwabee_grounded_stance:{summary:"Brace yourself against forced movement when there is something to resist.",details:["No direct damage."],tags:["DEFENSE","CONTEXT REQUIRED"]},
  
      academy_metal_lee_leaf_rising_kick:{summary:"Deals 6 ATK to one enemy with a rising kick.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_metal_lee_training_flurry:{summary:"Deals 5 ATK to one enemy with a rapid barrage.",details:["The barrage counts as one damage hit."],tags:["DAMAGE","ONE ENEMY"]},
      academy_metal_lee_pressure_rhythm:{summary:"Your next damaging Skill gains +2 ATK.",details:["The bonus is used by that attack."],tags:["SETUP"]},
      academy_metal_lee_guarded_footwork:{summary:"Reduce the next direct hit against you by 25%.",details:["Works once."],tags:["DEFENSE","GUARD"]},
      academy_metal_lee_conditioned_endurance:{summary:"Gain 4 temporary Battle PL for this Battle.",details:["Extra fighting capacity, not healing."],tags:["CAPACITY","TEMPORARY"]},
  
      academy_obito_fire_style_ember_burst:{summary:"Deals 5 ATK to one enemy with Fire Release.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_obito_headlong_rush:{summary:"Deals 6 ATK to one enemy with a headlong rush.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_obito_uchiha_shuriken_rush:{summary:"Deals 5 ATK to one enemy with a shuriken barrage.",details:["The barrage counts as one damage hit."],tags:["DAMAGE","ONE ENEMY"]},
      academy_obito_protective_intercept:{summary:"Protect one ally and reduce their next direct hit by 30%.",details:["Works once."],tags:["DEFENSE","ALLY"]},
      academy_obito_determined_stand:{summary:"Gain 3 temporary Battle PL for this Battle.",details:["Extra fighting capacity, not healing."],tags:["CAPACITY","TEMPORARY"]},
  
      academy_menma_chakra_knuckle:{summary:"Deals 6 ATK to one enemy with a chakra-powered punch.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_menma_crescent_kunai:{summary:"Deals 5 ATK to one enemy with a fast kunai strike.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_menma_guard_breaker:{summary:"Deals 7 ATK to one enemy and can pressure a compatible guard.",details:["It does not break every defence automatically."],tags:["DAMAGE","GUARD PRESSURE"]},
      academy_menma_shadow_clone_feint:{summary:"Create a shadow-clone feint for a later opening.",details:["No direct damage and no extra fighter."],tags:["SETUP"]},
      academy_menma_shadowstep:{summary:"Move to a new position when a real route is available.",details:["Movement, not teleportation."],tags:["MOVEMENT","CONTEXT REQUIRED"]},
  
      academy_kakashi_kunai_quickdraw:{summary:"Deals 5 ATK to one enemy with a fast kunai strike.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      academy_kakashi_clone_feint:{summary:"Use a clone feint to open the enemy up.",details:["Precision Strike can exploit it. No direct damage."],tags:["SETUP","ONE ENEMY"]},
      academy_kakashi_opening_exploit:{summary:"Deals 5 ATK, or 11 ATK after Clone Switch.",details:["Using the opening consumes it. Stamina reduces damage."],tags:["DAMAGE","SETUP FOLLOW-UP"]},
      academy_kakashi_wire_snare:{summary:"Bind one enemy with wire and restrict their movement.",details:["Control, not a full Stun."],tags:["CONTROL","ONE ENEMY"]},
      academy_kakashi_substitution_jutsu:{summary:"Reduce one direct hit against you by 50%.",details:["Can be used once per Battle."],tags:["DEFENSE","ONCE PER BATTLE"]},

      sj_anko_hidden_shadow_snake_hands:{summary:"Deals 20 ATK to one enemy with summoned snakes.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      sj_anko_snake_bind:{summary:"Bind one enemy so moves needing free movement are blocked.",details:["The bind lasts through one enemy action. Control, not a full Stun."],tags:["CONTROL","ONE ENEMY"]},
      sj_anko_fire_style_dragon_flame:{summary:"Deals 24 ATK to one enemy with Fire Release.",details:["Stamina reduces the damage."],tags:["DAMAGE","ONE ENEMY"]},
      sj_anko_serpent_evasion:{summary:"Avoid the next qualifying direct attack against Anko.",details:["Works once. No accuracy roll is needed."],tags:["DEFENSE","EVADE"]}
    };
    const fixed=exact[skill.id];
    if(fixed)return {
      title:skill.displayName||skill.id,
      summary:fixed.summary,
      details:fixed.details,
      kind:skillKind33000(skill),attackPL:attackValue33000(skill),tags:fixed.tags,
      exactPlayerFacingOverride:true,descriptionCoverage:"exact"
    };
  
    const kind=String(skill.resolutionKind||"");
    const attack=attackValue33000(skill);
    let summary="";
    let details=[];
    let tags=[skillKind33000(skill)];
    let descriptionCoverage="structured";
  
    if(kind==="direct_damage"){
      summary=attack!==null?`Deals ${attack} ATK to one enemy.`:"Deals damage to one enemy.";
      details=[skill.staminaMitigation===false?"This attack ignores normal Stamina reduction.":"Stamina reduces the damage."];
      tags=["DAMAGE","ONE ENEMY"];
    }else if(kind==="area_damage"){
      const targets=Math.max(1,Number(skill.maxTargets)||1);
      summary=attack!==null?`Deals ${attack} ATK to up to ${targets} ${targets===1?"enemy":"enemies"}.`:`Deals damage to up to ${targets} ${targets===1?"enemy":"enemies"}.`;
      details=[skill.staminaMitigation===false?"These hits ignore normal Stamina reduction.":"Stamina reduces each hit."];
      tags=["DAMAGE","AREA"];
    }else if(kind==="ratio_guard_state"&&skill.guard){
      const pct=Math.round((Number(skill.guard.preventionRatio)||0)*100);
      const allyTarget=String(skill.targetMode||skill.guard.targetMode||"").toLowerCase().includes("ally");
      summary=allyTarget
        ?`Protect one ally and reduce their next direct hit by ${pct}%.`
        :`Reduce the next direct hit against you by ${pct}%.`;
      details=[skill.guard.oneUse===false?"The guard lasts for this Skill's stated duration.":"Works once."];
      tags=allyTarget?["DEFENSE","ALLY"]:["DEFENSE","GUARD"];
    }else if(kind==="restore_underlying_battle_pl"&&skill.restorationProfile){
      const amount=Number(skill.restorationProfile.authoredAmount)||0;
      const selfTarget=String(skill.targetMode||skill.restorationProfile.targetMode||"").toLowerCase()==="self";
      summary=`Restore ${amount} Battle PL to ${selfTarget?"yourself":"one eligible ally"}.`;
      details=["This does not raise Base PL."];
      tags=selfTarget?["RECOVERY","SELF"]:["RECOVERY","ALLY"];
    }else if(kind==="movement"||kind==="reposition"||String(skill.actionClass||"").toLowerCase().includes("movement")){
      summary="Move to a new position when a real route is available.";
      details=["Movement, not teleportation."];
      tags=["MOVEMENT","CONTEXT REQUIRED"];
    }else if(kind==="temporary_battle_capacity"){
      const amount=Number(skill.temporaryBattlePL??skill.capacityProfile?.authoredAmount??skill.authoredAmount);
      if(Number.isFinite(amount)&&amount>0){
        summary=`Gain ${amount} temporary Battle PL for this Battle.`;
        details=["Extra fighting capacity, not healing."];
      }else{
        summary="Special Battle-capacity Skill.";
        details=["This Skill needs an exact player-facing description before final release."];
        descriptionCoverage="needs_exact_override";
      }
      tags=["CAPACITY","TEMPORARY"];
    }else if(kind==="dynamic_control"){
      const control=skill.dynamicControl||skill.controlProfile||skill.conditionProfile||{};
      const blocked=[...(control.blockedActionTraits||skill.blockedActionTraits||[])].map(x=>String(x));
      const semantic=String(control.semanticClass||"").toLowerCase();
      const maxTargets=Math.max(1,Number(control.maxTargets)||Number(skill.maxTargets)||1);
      const targetText=maxTargets===1?"one enemy":`up to ${maxTargets} enemies`;
      if(blocked.includes("movement_dependent")||blocked.includes("substantial_free_movement")){
        summary=`Bind ${targetText} so moves that need free movement are blocked.`;
        details=["Control, not a full Stun."];
        tags=["CONTROL","MOVEMENT"];
      }else if(semantic.includes("shadow_possession")){
        summary=`Catch ${targetText} with shadow control and restrict their movement.`;
        details=["This controls movement; it does not deal damage by itself."];
        tags=["CONTROL","MOVEMENT"];
      }else if(semantic.includes("gravity")){
        summary=`Pull ${targetText} with gravity and disrupt their position.`;
        details=["Control, not a full Stun."];
        tags=["CONTROL","POSITION"];
      }else if(semantic.includes("tenketsu")){
        summary=`Strike ${targetText}'s chakra points to interfere with their actions.`;
        details=["This is a control effect, not direct Battle PL damage."];
        tags=["CONTROL","CHAKRA"];
      }else if(["genjutsu","tsukuyomi","ocular","perception","mind","psychological"].some(word=>semantic.includes(word))){
        summary=`Use Genjutsu to restrict what ${targetText} can do.`;
        details=["Control, not automatic damage."];
        tags=["CONTROL","GENJUTSU"];
      }else if(["seal","binding","suppression","restraint","containment","bind","capture"].some(word=>semantic.includes(word))){
        summary=`Restrain ${targetText} with this technique.`;
        details=["Control, not a full Stun."];
        tags=["CONTROL"];
      }else{
        summary=`Restrict ${targetText} with this control technique.`;
        details=["The target keeps any actions the effect does not block."];
        tags=["CONTROL"];
      }
    }else if(kind==="condition_remove"&&skill.conditionRemoval){
      const condition=String(skill.conditionRemoval.conditionType||"condition").replaceAll("_"," ");
      summary=`Remove an eligible ${condition} condition.`;
      details=["This does not undo damage already taken."];
      tags=["CONTROL","CLEANSE"];
    }else if(kind==="transient_state"){
      const bonus=Number(skill.attackPLBonus??skill.authoredAttackPLBonus);
      const followUp=String(skill.followUpDisplayName||skill.followUpSkillName||"").trim();
      const state=skill.state&&typeof skill.state==="object"?skill.state:{};
      const idText=String(skill.id||"").toLowerCase();
      const action=String(skill.actionClass||"").toLowerCase();
      const traits=(skill.traits||[]).map(x=>String(x).toLowerCase());
      if(Number.isFinite(bonus)&&bonus!==0){
        summary=`Your next damaging Skill gains +${bonus} ATK.`;
        details=["The bonus is used by that attack."];
      }else if(followUp){
        summary=`Create an opening for ${followUp}.`;
        details=["No direct damage."];
      }else if(action.includes("defensive")||Number(state.remainingCharges)>0||traits.some(x=>x.includes("defensive")||x.includes("interposition")||x.includes("substitution"))){
        summary="Prepare a defensive response against the next qualifying attack.";
        details=[Number(state.remainingCharges)===1?"Works once.":"It triggers only when its defensive condition is met."];
      }else if(idText.includes("ink_screen")){
        summary="Create a temporary ink screen that changes what the enemy can see.";
        details=["It does not automatically blind the enemy or force a miss."];
      }else if(idText.includes("battlefield_mark")){
        summary="Mark the battlefield for a compatible follow-up.";
        details=["No direct damage."];
      }else if(idText.includes("shadow_route_trap")){
        summary="Set a shadow route trap for a compatible follow-up.";
        details=["No automatic capture."];
      }else if(idText.includes("checkmate_grid")){
        summary="Set up shadow routes across the battlefield for later control.";
        details=["No automatic capture."];
      }else if(idText.includes("chakra_focus")){
        summary="Focus your Chakra to prepare a stronger later technique.";
        details=["No direct damage."];
      }else if(["clone","feint","double_image","transformation"].some(word=>idText.includes(word))){
        summary="Create a deceptive opening for a later move.";
        details=["No direct damage and no automatic deception."];
      }else{
        summary="Set up a temporary advantage for a compatible later move.";
        details=["No direct damage unless the Skill says otherwise."];
      }
      tags=action.includes("defensive")?["DEFENSE","SETUP"]:["SETUP"];
    }else if(kind==="damage_with_persistent_state"){
      const state=skill.persistentState&&typeof skill.persistentState==="object"?skill.persistentState:{};
      const persistent=Number(state.persistentAttackPL);
      const repeats=Math.max(0,Number(state.durationActionOpportunities)||0);
      summary=attack!==null?`Deals ${attack} ATK to one enemy.`:"Deals damage to one enemy.";
      if(Number.isFinite(persistent)&&persistent>0&&repeats>0){
        details=[`Then the ongoing effect can deal ${persistent} ATK again up to ${repeats} times.`];
      }else{
        details=["It also leaves an ongoing damage effect."];
      }
      tags=["DAMAGE","ONGOING EFFECT"];
    }else if(kind==="branch_damage"){
      const modes=skill.modes&&typeof skill.modes==="object"
        ?Object.entries(skill.modes).map(([id,mode])=>({id,...(mode||{})}))
        :Array.isArray(skill.branches)?skill.branches:[];
      const readable=modes.map(mode=>{
        const rawName=String(mode.displayName||mode.name||mode.id||"").trim();
        const name=rawName?rawName.replaceAll("_"," ").replace(/\b\w/g,ch=>ch.toUpperCase()):"";
        const atkRaw=mode.authoredAttackPL??mode.authoredAttackPLPerTarget??mode.attackPL;
        const atk=Number(atkRaw);
        const targets=Math.max(1,Number(mode.maxTargets)||1);
        return name&&Number.isFinite(atk)?`${name}: ${atk} ATK to ${targets===1?"one enemy":`up to ${targets} enemies`}.`:null;
      }).filter(Boolean);
      if(readable.length===modes.length&&readable.length){
        summary="Choose how you want to use the attack.";
        details=readable.slice(0,3);
      }else{
        summary="Choose the attack mode before you use this Skill.";
        details=["The selected mode decides its damage and targets."];
      }
      tags=["DAMAGE","CHOOSE MODE"];
    }else if(kind==="categorical_evidence"){
      const categorical=skill.categorical&&typeof skill.categorical==="object"?skill.categorical:{};
      const boundary=String(categorical.informationBoundary||skill.informationBoundary||"").toLowerCase();
      const action=String(skill.actionClass||"").toLowerCase();
      const target=String(skill.targetMode||"").toLowerCase();
      const idText=String(skill.id||"").toLowerCase();
      const counter=Number(categorical.counterAttackPL);
      if(categorical.reactiveOnly===true&&Number.isFinite(counter)&&counter>0){
        summary=`Counter a qualifying attack for ${counter} ATK.`;
        details=["Only available as a reaction."];
        tags=["COUNTER","DAMAGE"];
      }else if(action.includes("movement")||boundary.includes("reposition")||boundary.includes("movement")){
        summary="Move to a new position when a real route is available.";
        details=["Movement, not teleportation."];
        tags=["MOVEMENT","CONTEXT REQUIRED"];
      }else if(action.includes("defensive")||boundary.includes("interposition")||boundary.includes("defensive")){
        summary="Use a defensive interception when a qualifying attack gives you the chance.";
        details=["This is not a percentage guard unless the Skill says so."];
        tags=["DEFENSE","CONTEXT REQUIRED"];
      }else if(action.includes("setup")||boundary.includes("setup")||boundary.includes("deception")||boundary.includes("targeting_interaction")){
        summary="Create a setup that can change how the enemy reads or targets the situation.";
        details=["No direct damage and no automatic deception."];
        tags=["SETUP","CONTEXT REQUIRED"];
      }else if(boundary.includes("message")||idText.includes("mind_transmission")){
        summary="Send a limited message to one ally.";
        details=["It shares information; it does not create trust or change relationships."];
        tags=["UTILITY","ALLY"];
      }else if(boundary.includes("signature")){
        summary="Track a known Chakra signature when you already know what to recognise.";
        details=[];
        tags=["UTILITY","SENSING"];
      }else if(boundary.includes("chakra")||boundary.includes("sensory")||boundary.includes("presence")){
        summary="Read the Chakra or presence you can actually detect right now.";
        details=["This does not reveal hidden identity automatically."];
        tags=["UTILITY","SENSING"];
      }else if(boundary.includes("sharingan")||boundary.includes("byakugan")||boundary.includes("visual")||boundary.includes("observation")){
        summary="Study what this technique can actually see right now.";
        details=["This does not automatically reveal hidden facts or copy a technique."];
        tags=["UTILITY","OBSERVATION"];
      }else if(boundary.includes("analysis")||boundary.includes("technique")){
        summary="Study the enemy's visible technique use.";
        details=["Understanding what you saw does not grant the technique."];
        tags=["UTILITY","ANALYSIS"];
      }else if(action.includes("information")||boundary.includes("information")||boundary.includes("evidence")||boundary.includes("perception")){
        summary="Learn only what this technique can actually detect in the current situation.";
        details=["It does not automatically reveal hidden facts."];
        tags=["UTILITY","CONTEXT"];
      }else if(target==="selected_ally"){
        summary="Use this support technique on one ally when its conditions are met.";
        details=[];
        tags=["UTILITY","ALLY"];
      }else{
        summary="Use this technique when its visible Battle condition is available.";
        details=["It changes the situation without direct damage."];
        tags=["UTILITY","CONTEXT"];
      }
    }else if(kind==="damage_then_sealing_context"){
      const atk=Number(skill.authoredAttackPL);
      summary=Number.isFinite(atk)?`Deals ${atk} ATK to one enemy.`:"Deals damage to one enemy.";
      details=["A separate sealing follow-up may become available if its conditions are met."];
      tags=["DAMAGE","SEALING FOLLOW-UP"];
    }else if(kind==="planetary_devastation_two_stage"){
      const stage2=skill.planetaryDevastation&&skill.planetaryDevastation.stage2||{};
      const atk=Number(stage2.authoredAttackPLPerTarget);
      const targets=Math.max(1,Number(stage2.maxTargets)||1);
      summary="Begin Planetary Devastation by forming the core.";
      details=[Number.isFinite(atk)?`The forced second stage deals ${atk} ATK to up to ${targets} enemies.`:"The second stage is forced on your next available turn."];
      tags=["TWO-STAGE","AREA"];
    }else{
      const action=String(skill.actionClass||"").toLowerCase();
      const target=String(skill.targetMode||"").toLowerCase();
      if(action.includes("defensive")){
        summary="Use this defensive Skill when its Battle condition is available.";
        details=[];
        tags=["DEFENSE","CONTEXT REQUIRED"];
      }else if(action.includes("control")){
        summary=target.includes("enem")?"Restrict the selected enemy with this Skill.":"Use this Skill to control the current situation.";
        details=["It does not deal direct damage unless the Skill says so."];
        tags=["CONTROL"];
      }else if(action.includes("setup")){
        summary="Set up a compatible later move.";
        details=["No direct damage."];
        tags=["SETUP"];
      }else{
        summary="Use this Skill when its visible Battle condition is available.";
        details=["Its normal effect is shown when the Skill is usable."];
        tags=["TECHNIQUE"];
      }
      descriptionCoverage="structured_fallback";
    }
  
    if(descriptionCoverage==="needs_exact_override"){
      try{
        const legacy=typeof priorSummary==="function"?String(priorSummary(skill)||"").trim():"";
        const banned=/\b(authored|resolver|predicate|stateKey|semanticClass|informationBoundary|categorical evidence|transient state|scalar|packet|action opportunity|committed occurrence|caller-defined|source-owned)\b/i;
        if(legacy&&!banned.test(legacy)&&!/authored Battle technique/i.test(legacy)){
          summary=legacy;
          details=[];
          descriptionCoverage="legacy_readable";
        }
      }catch(_error){}
    }
    if(descriptionCoverage==="needs_exact_override"){
      summary="Use this Skill when its visible Battle condition is available.";
      details=["Check its target and current availability before you commit."];
      descriptionCoverage="structured_fallback";
    }
    return {
      title:skill.displayName||skill.id,summary,details,kind:skillKind33000(skill),attackPL:attack,
      tags:[...new Set(tags)],exactPlayerFacingOverride:false,descriptionCoverage
    };
  }
  window.getBattleSkillYouthSummary33000=getBattleSkillYouthSummary33000;

  const priorSummary=typeof getBattleSkillPlainLanguageSummary==="function"?getBattleSkillPlainLanguageSummary:null;
  window.getBattleSkillPlainLanguageSummary=function getBattleSkillPlainLanguageSummary33000(skill){
    const info=getBattleSkillYouthSummary33000(skill);
    return [info.summary,...info.details].filter(Boolean).join(" ");
  };

  function getSkillFromCard33000(card){
    if(!card)return null;
    let skillId=card.dataset&&card.dataset.skillId||null;
    if(!skillId){
      const handler=String(card.getAttribute&&card.getAttribute("onclick")||"");
      const match=handler.match(/activateBattlePreparedSkillCard\(['\"]([^'\"]+)['\"]\)/);
      if(match)skillId=match[1];
    }
    const actor=getActiveBattleActor33000();
    if(!actor||!skillId||typeof getBattlePreparedSkillDefinition!=="function")return null;
    const skill=getBattlePreparedSkillDefinition(actor,skillId);
    return skill?{actor,skill,skillId}:null;
  }

  function renderInspector33000(skill,actor){
    const info=getBattleSkillYouthSummary33000(skill);
    let modes=[];
    try{modes=skill&&actor&&typeof getBattlePreparedSkillAvailableModes==="function"?getBattlePreparedSkillAvailableModes(skill,actor):[];}catch(_error){modes=[];}
    let selectedId=null;
    try{selectedId=syncBattleActionRegionState().selectedSkillId||null;}catch(_error){}
    const branchActive=skill&&selectedId===skill.id&&modes.length>0;
    const target=(()=>{try{const state=syncBattleActionRegionState();if(state.selectedTargetRef&&typeof getBattleParticipantByIdentity==="function")return getBattleParticipantByIdentity(state.selectedTargetRef.side,state.selectedTargetRef.participantId);return getActiveBattleEnemy33000();}catch(_error){return getActiveBattleEnemy33000();}})();
    const badges=[...(info.tags||[])];
    if(info.attackPL!==null&&!badges.some(x=>String(x).startsWith("ATK ")))badges.unshift(`ATK ${info.attackPL}`);
    const modeHtml=branchActive?`<div class="battle2-mode-block"><span>CHOOSE A MODE</span><div>${modes.map(mode=>`<button type="button" onclick="setSelectedBattleSkillMode('${esc(mode)}')">${esc(String(mode).replaceAll("_"," ").toUpperCase())}</button>`).join("")}</div></div>`:"";
    return `<div class="battle2-inspector-head"><span>SKILL GUIDE</span><b>HOVER TO LEARN · CLICK TO USE</b></div>
      <h2>${esc(info.title)}</h2>
      <div class="battle2-badges">${badges.map(tag=>`<span>${esc(tag)}</span>`).join("")}</div>
      <p class="battle2-summary">${esc(info.summary)}</p>
      <ul>${(info.details||[]).map(line=>`<li>${esc(line)}</li>`).join("")}</ul>
      <div class="battle2-target"><span>TARGET</span><strong>${esc(target&&target.name||"Current eligible target")}</strong></div>
      ${modeHtml}`;
  }

  function syncBattleSkillInspectorOverflow33000(panel){
    if(!panel)return false;
    const apply=()=>{
      const overflow=Number(panel.scrollHeight||0)>Number(panel.clientHeight||0)+2;
      panel.dataset.battle2Scrollable=overflow?"true":"false";
      if(overflow){
        panel.setAttribute("tabindex","0");
        panel.setAttribute("aria-label","Skill description. Scroll for more details.");
      }else{
        panel.removeAttribute("tabindex");
        panel.removeAttribute("aria-label");
      }
    };
    if(typeof requestAnimationFrame==="function")requestAnimationFrame(apply);else apply();
    return true;
  }
  let battleSkillPreviewClearTimer33000=null;
  function cancelBattleSkillPreviewClear33000(){
    if(battleSkillPreviewClearTimer33000!==null){
      clearTimeout(battleSkillPreviewClearTimer33000);
      battleSkillPreviewClearTimer33000=null;
    }
  }
  function battleSkillInspectorInteractionActive33000(){
    if(typeof document==="undefined")return false;
    const stage=document.querySelector(".alpha-code-battle-stage");
    if(!stage)return false;
    const deck=stage.querySelector(".battle-live-skill-deck");
    const panel=stage.querySelector(".battle-live-skill-details");
    const hovered=node=>{try{return !!(node&&node.matches(":hover"));}catch(_error){return false;}};
    const focused=node=>!!(node&&document.activeElement&&(node===document.activeElement||node.contains(document.activeElement)));
    return hovered(deck)||hovered(panel)||focused(deck)||focused(panel);
  }
  function scheduleBattleSkillPreviewClear33000(){
    cancelBattleSkillPreviewClear33000();
    battleSkillPreviewClearTimer33000=setTimeout(()=>{
      battleSkillPreviewClearTimer33000=null;
      if(battleSkillInspectorInteractionActive33000())return;
      clearBattleSkillPreview33000();
    },120);
  }

  function previewBattlePreparedSkill33000(skillId){
    cancelBattleSkillPreviewClear33000();
    const actor=getActiveBattleActor33000();
    if(!actor||!skillId||typeof getBattlePreparedSkillDefinition!=="function")return false;
    const skill=getBattlePreparedSkillDefinition(actor,skillId);
    const panel=typeof document!=="undefined"?document.querySelector(".alpha-code-battle-stage .battle-live-skill-details"):null;
    if(!skill||!panel)return false;
    // HOVER remains presentation-only even when a Skill is already selected.
    // Preserve the canonical selected Skill TARGET/MODE/USE/CANCEL surface,
    // temporarily show the hovered Skill guide, then restore the canonical DOM
    // when the pointer leaves the Skill deck. This fixes repeat-Skill states
    // without changing selection, target, mode, or commit semantics.
    try{
      const state=syncBattleActionRegionState();
      if(state&&state.selectedSkillId&&!Object.prototype.hasOwnProperty.call(panel.dataset,"battle2SelectedSkillRestore")){
        panel.dataset.battle2SelectedSkillRestore=panel.innerHTML;
      }
    }catch(_error){}
    panel.classList.add("battle2-inspector");
    panel.innerHTML=renderInspector33000(skill,actor);
    panel.dataset.previewSkillId=skill.id;
    panel.scrollTop=0;
    syncBattleSkillInspectorOverflow33000(panel);
    return true;
  }
  window.previewBattlePreparedSkill33000=previewBattlePreparedSkill33000;

  function clearBattleSkillPreview33000(){
    cancelBattleSkillPreviewClear33000();
    const panel=typeof document!=="undefined"?document.querySelector(".alpha-code-battle-stage .battle-live-skill-details"):null;
    if(!panel)return false;
    panel.classList.add("battle2-inspector");
    if(Object.prototype.hasOwnProperty.call(panel.dataset,"battle2SelectedSkillRestore")){
      panel.innerHTML=panel.dataset.battle2SelectedSkillRestore;
      delete panel.dataset.battle2SelectedSkillRestore;
      delete panel.dataset.previewSkillId;
      syncBattleSkillInspectorOverflow33000(panel);
      return true;
    }
    let selected=null,actor=getActiveBattleActor33000();
    try{const state=syncBattleActionRegionState();selected=actor&&state.selectedSkillId?getBattlePreparedSkillDefinition(actor,state.selectedSkillId):null;}catch(_error){}
    if(selected){
      delete panel.dataset.previewSkillId;
      return true;
    }
    panel.innerHTML=`<div class="battle2-inspector-empty"><span>SKILL GUIDE</span><h2>Choose your next move</h2><p>Move your mouse over a Skill to learn what it does. Click the Skill when you are ready to use it.</p><div><b>HOVER</b> Learn &nbsp; · &nbsp; <b>CLICK</b> Use</div></div>`;
    syncBattleSkillInspectorOverflow33000(panel);
    return true;
  }
  window.clearBattleSkillPreview33000=clearBattleSkillPreview33000;

  function labelForTransient33000(state){
    if(!state)return null;
    if(state.displayName)return String(state.displayName).toUpperCase();
    if(state.stateKey&&KNOWN_SETUP_LABELS[state.stateKey])return KNOWN_SETUP_LABELS[state.stateKey];
    return null;
  }

  function getVisibleBattleStatuses33000(){
    try{
      const runtime=typeof ensureBattleRuntimeState==="function"?ensureBattleRuntimeState():null;
      const states=runtime&&Array.isArray(runtime.transientStates)?runtime.transientStates:[];
      return states.map(state=>({state,label:labelForTransient33000(state)})).filter(row=>!!row.label);
    }catch(_error){return[];}
  }

  function latestBattleFeedText33000(stage){
    const visibleReceipt=battlePresentationQueueState33000&&battlePresentationQueueState33000.active&&battlePresentationQueueState33000.active.receipt||null;
    if(visibleReceipt)return `${visibleReceipt.actorName} — ${visibleReceipt.actionLabel}`;
    if(stage){
      const lines=[...stage.querySelectorAll(".battle-runtime-log-line")];
      if(lines.length){const latest=lines.find(node=>node.classList.contains("is-latest"))||lines[lines.length-1];if(latest&&latest.textContent.trim())return latest.textContent.trim();}
      const old=[...stage.querySelectorAll(".battle-live-log-entry")];
      if(old.length&&old[old.length-1].textContent.trim())return old[old.length-1].textContent.trim();
    }
    try{
      const log=currentBattle&&Array.isArray(currentBattle.battleLog)?currentBattle.battleLog:[];
      return log.length?String(log[log.length-1]):"Battle ready. Choose an action.";
    }catch(_error){return"Battle ready. Choose an action.";}
  }

  function toggleBattle2CombatLog33000(force){
    const stage=typeof document!=="undefined"?document.querySelector(".alpha-code-battle-stage"):null;
    if(!stage)return false;
    const open=typeof force==="boolean"?force:!stage.classList.contains("battle2-log-open");
    stage.classList.toggle("battle2-log-open",open);
    const button=stage.querySelector(".battle2-log-toggle");
    if(button){button.setAttribute("aria-expanded",open?"true":"false");button.innerHTML=open?"CLOSE LOG ×":"COMBAT LOG ▾";}
    return open;
  }
  window.toggleBattle2CombatLog33000=toggleBattle2CombatLog33000;

  function enhanceBattleSkillCards33000(stage){
    const cards=[...stage.querySelectorAll(".battle-live-skill-deck .battle-dev-skill-card:not(.is-empty)")];
    cards.forEach(card=>{
      const resolved=getSkillFromCard33000(card);if(!resolved)return;
      const {skill,skillId}=resolved;card.dataset.skillId=skillId;
      card.setAttribute("aria-description","Hover or focus to learn what this Skill does. Click to use it if legal.");
      card.onmouseenter=()=>previewBattlePreparedSkill33000(skillId);
      card.onfocus=()=>previewBattlePreparedSkill33000(skillId);
      const oldMeta=card.querySelector(".battle2-card-meta");if(oldMeta)oldMeta.remove();
      const info=getBattleSkillYouthSummary33000(skill);
      const meta=document.createElement("span");meta.className="battle2-card-meta";
      meta.innerHTML=`<b>${esc(info.kind)}</b>${info.attackPL!==null?`<em>ATK ${esc(info.attackPL)}</em>`:""}`;
      const small=card.querySelector("small");if(small)card.insertBefore(meta,small);else card.appendChild(meta);
    });
    const deck=stage.querySelector(".battle-live-skill-deck");
    const panel=stage.querySelector(".battle-live-skill-details");
    if(deck&&!deck.dataset.battle2LeaveBound){
      deck.dataset.battle2LeaveBound="true";
      deck.addEventListener("mouseenter",cancelBattleSkillPreviewClear33000);
      deck.addEventListener("mouseleave",cancelBattleSkillPreviewClear33000);
      deck.addEventListener("focusin",cancelBattleSkillPreviewClear33000);
      deck.addEventListener("focusout",cancelBattleSkillPreviewClear33000);
    }
    if(panel&&!panel.dataset.battle2InspectorHoverBound){
      panel.dataset.battle2InspectorHoverBound="true";
      panel.addEventListener("mouseenter",cancelBattleSkillPreviewClear33000);
      panel.addEventListener("mouseleave",cancelBattleSkillPreviewClear33000);
      panel.addEventListener("focusin",cancelBattleSkillPreviewClear33000);
      panel.addEventListener("focusout",cancelBattleSkillPreviewClear33000);
      syncBattleSkillInspectorOverflow33000(panel);
    }
  }

  function installBattleTicker33000(stage){
    let ticker=stage.querySelector(".battle2-live-ticker");
    if(!ticker){ticker=document.createElement("div");ticker.className="battle2-live-ticker";stage.appendChild(ticker);}
    const statuses=getVisibleBattleStatuses33000();
    ticker.innerHTML=`<div class="battle2-ticker-copy"><span>LAST ACTION</span><strong>${esc(latestBattleFeedText33000(stage))}</strong></div><button type="button" class="battle2-log-toggle" aria-expanded="false" onclick="toggleBattle2CombatLog33000()">COMBAT LOG ▾</button>${statuses.length?`<div class="battle2-status-chips">${statuses.map(row=>`<span title="Temporary Battle state">◈ ${esc(row.label)}</span>`).join("")}</div>`:""}`;
  }

  function installBattleInteractionHint33000(stage){
    let hint=stage.querySelector(".battle2-action-hint");
    if(!hint){hint=document.createElement("div");hint.className="battle2-action-hint";stage.appendChild(hint);}
    hint.innerHTML=`<span><b>HOVER</b> LEARN</span><i>·</i><span><b>CLICK</b> USE</span>`;
  }

  // --------------------------------------------------------------------------
  // FORMATION STAGE — current UI authority
  // Presentation-only composition over the existing Battle deployment/action APIs.
  // --------------------------------------------------------------------------
  let formationTrayMode33000=null;

  const PRIOR_OPEN_SKILLS_33000=typeof openBattleSkillsActionFamily==="function"?openBattleSkillsActionFamily:null;
  const PRIOR_OPEN_ITEMS_33000=typeof openBattleItemActionFamily==="function"?openBattleItemActionFamily:null;
  const PRIOR_OPEN_SUMMONS_33000=typeof openBattleSummonActionFamily==="function"?openBattleSummonActionFamily:null;
  const PRIOR_CLOSE_ITEMS_33000=typeof closeBattleItemActionFamily==="function"?closeBattleItemActionFamily:null;
  const PRIOR_CLOSE_SUMMONS_33000=typeof closeBattleSummonActionFamily==="function"?closeBattleSummonActionFamily:null;
  const PRIOR_REFRESH_ACTION_REGION_33000=typeof refreshBattleActionRegionPresentation==="function"?refreshBattleActionRegionPresentation:null;

  if(PRIOR_REFRESH_ACTION_REGION_33000){
    const wrappedRefreshBattleActionRegion33000=function(){
      const result=PRIOR_REFRESH_ACTION_REGION_33000.apply(this,arguments);
      try{refreshFormationPLProjection33000();}catch(_error){}
      return result;
    };
    globalThis.refreshBattleActionRegionPresentation=wrappedRefreshBattleActionRegion33000;
    try{refreshBattleActionRegionPresentation=wrappedRefreshBattleActionRegion33000;}catch(_error){}
  }

  function refreshFormationActionPresentation33000(){
    try{if(typeof refreshBattleActionRegionPresentation==="function")refreshBattleActionRegionPresentation();}catch(_error){}
  }
  function toggleFormationTray33000(mode,opener,args){
    if(formationTrayMode33000===mode){
      formationTrayMode33000=null;
      refreshFormationActionPresentation33000();
      return{success:true,presentationOnly:true,trayMode:"closed",semanticActionFamilyUnchanged:true};
    }
    formationTrayMode33000=mode;
    const result=opener?opener.apply(this,args||[]):{success:false,reason:"action_family_api_missing"};
    if(!(result&&result.success===true))formationTrayMode33000=null;
    return result;
  }
  if(PRIOR_OPEN_SKILLS_33000){
    globalThis.openBattleSkillsActionFamily=function formationSkills33000(){
      return toggleFormationTray33000.call(this,"skills",PRIOR_OPEN_SKILLS_33000,arguments);
    };
    try{openBattleSkillsActionFamily=globalThis.openBattleSkillsActionFamily;}catch(_error){}
  }
  if(PRIOR_OPEN_ITEMS_33000){
    globalThis.openBattleItemActionFamily=function formationItems33000(){
      return toggleFormationTray33000.call(this,"items",PRIOR_OPEN_ITEMS_33000,arguments);
    };
    try{openBattleItemActionFamily=globalThis.openBattleItemActionFamily;}catch(_error){}
  }
  if(PRIOR_OPEN_SUMMONS_33000){
    globalThis.openBattleSummonActionFamily=function formationSummons33000(){
      return toggleFormationTray33000.call(this,"summon",PRIOR_OPEN_SUMMONS_33000,arguments);
    };
    try{openBattleSummonActionFamily=globalThis.openBattleSummonActionFamily;}catch(_error){}
  }
  if(PRIOR_CLOSE_ITEMS_33000){
    globalThis.closeBattleItemActionFamily=function formationCloseItems33000(){
      formationTrayMode33000=null;
      return PRIOR_CLOSE_ITEMS_33000.apply(this,arguments);
    };
    try{closeBattleItemActionFamily=globalThis.closeBattleItemActionFamily;}catch(_error){}
  }
  if(PRIOR_CLOSE_SUMMONS_33000){
    globalThis.closeBattleSummonActionFamily=function formationCloseSummons33000(){
      formationTrayMode33000=null;
      return PRIOR_CLOSE_SUMMONS_33000.apply(this,arguments);
    };
    try{closeBattleSummonActionFamily=globalThis.closeBattleSummonActionFamily;}catch(_error){}
  }

  function deployedFormation33000(side){
    const out=[];
    if(typeof getBattleDeploymentParticipant!=="function")return out;
    for(let slot=1;slot<=6;slot+=1){
      let participant=null;
      try{participant=getBattleDeploymentParticipant(side,slot)||null;}catch(_error){participant=null;}
      if(participant)out.push({side,slot,participantId:String(participant.id||""),participant});
    }
    return out;
  }
  function formationMode33000(){
    const player=deployedFormation33000("player"),enemy=deployedFormation33000("enemy");
    const peak=Math.max(player.length,enemy.length);
    return peak<=1?"duel":peak>=4?"arc":"wedge";
  }
  function formationPortrait33000(side,participant){
    if(!participant)return null;
    try{
      const projection=side==="player"
        ?(typeof resolveUIPortraitProjection==="function"?resolveUIPortraitProjection(participant):null)
        :(typeof resolveBattleEnemyPortraitProjection==="function"?resolveBattleEnemyPortraitProjection(participant):null);
      return projection&&projection.path?String(projection.path):null;
    }catch(_error){return null;}
  }
  function formationNodeForRef33000(stage,ref){
    if(!stage||!ref||!ref.side||!ref.participantId)return null;
    const side=String(ref.side),participantId=String(ref.participantId);
    const active=side==="player"
      ?stage.querySelector(".battle-live-active-card-player")
      :stage.querySelector(".battle-live-active-card-enemy");
    if(active&&String(active.dataset.participantId||"")===participantId)return active;
    return [...stage.querySelectorAll('.battle-live-roster-'+side+' .battle-live-roster-slot[data-participant-id]')]
      .find(node=>String(node.dataset.participantId||"")===participantId)||null;
  }
  function selectedFormationTarget33000(){
    try{
      const state=typeof syncBattleActionRegionState==="function"?syncBattleActionRegionState():null;
      if(state&&state.selectedTargetRef&&state.selectedTargetRef.side&&state.selectedTargetRef.participantId){
        return{side:String(state.selectedTargetRef.side),participantId:String(state.selectedTargetRef.participantId),selected:true};
      }
    }catch(_error){}
    const enemy=getActiveBattleEnemy33000();
    return enemy?{side:"enemy",participantId:String(enemy.id||""),selected:false}:null;
  }
  function projectFormationActivePortrait33000(stage,side,row){
    const node=side==="player"?stage.querySelector(".battle-live-active-card-player"):stage.querySelector(".battle-live-active-card-enemy");
    if(!node||!row)return null;
    node.dataset.participantId=row.participantId;
    node.dataset.formationSide=side;
    node.dataset.formationSlot="1";
    node.dataset.formationRole="active";
    node.dataset.framelessBattlePortrait="true";
    node.classList.add("battle2-formation-participant","battle2-formation-active");
    const img=node.querySelector(".battle-live-active-card-image");
    const portrait=formationPortrait33000(side,row.participant);
    if(img&&portrait&&img.getAttribute("src")!==portrait){
      img.setAttribute("src",portrait);
      img.dataset.formationPortrait="true";
    }
    if(img)img.setAttribute("alt",String(row.participant.displayName||row.participant.name||row.participantId));
    const heading=node.querySelector(".battle-live-active-card-heading");
    if(heading)heading.textContent=side==="player"?"ACTIVE SHINOBI":"ACTIVE OPPOSITION";
    const nameplate=node.querySelector(".battle-live-active-nameplate");
    if(nameplate)nameplate.textContent=String(row.participant.displayName||row.participant.name||row.participantId);
    const pl=supportRemainingPL33000(side,row.participantId);
    const power=stage.querySelector(".battle-live-power-"+side);
    if(power&&pl){
      power.dataset.battlePlCurrent=String(pl.remaining);
      power.dataset.battlePlMaximum=String(pl.maximum);

      // The 32500 browser owner projects the active actor's PL as a radial
      // <span>. Never treat that ring as the legacy maximum-value <span>.
      // Update its nested core in place so the current PL stays inside the
      // circle and the conic fill remains tied to authoritative Battle PL.
      const ring=power.querySelector(".alpha-battle-pl-ring");
      const core=ring&&ring.querySelector(".alpha-battle-pl-core");
      if(ring&&core){
        const currentNode=core.querySelector("strong");
        const maximumNode=core.querySelector("small");
        const labelNode=core.querySelector("em");
        const percent=pl.maximum?Math.max(0,Math.min(100,pl.remaining/pl.maximum*100)):0;
        ring.style.setProperty("--battle-pl-fill",percent.toFixed(2)+"%");
        if(currentNode){
          currentNode.dataset.battlePlCurrentValue="true";
          currentNode.textContent=String(pl.remaining);
        }
        if(maximumNode)maximumNode.textContent="/ "+String(pl.maximum);
        if(labelNode)labelNode.textContent="BATTLE PL";
      }else{
        // Legacy non-radial fallback. Restrict lookup to direct children so a
        // future nested presentation shell cannot be mistaken for these nodes.
        let strong=[...power.children].find(node=>node.tagName==="STRONG")||null;
        let span=[...power.children].find(node=>node.tagName==="SPAN")||null;
        let bar=[...power.children].find(node=>node.tagName==="I")||null;
        if(!strong){
          strong=document.createElement("strong");
          strong.className="battle2-formation-pl-current";
          strong.dataset.battlePlCurrentValue="true";
          power.prepend(strong);
        }else{
          strong.dataset.battlePlCurrentValue="true";
        }
        if(!span){
          span=document.createElement("span");
          span.className="battle2-formation-pl-maximum";
          strong.insertAdjacentElement("afterend",span);
        }
        if(!bar){
          bar=document.createElement("i");
          bar.className="battle2-formation-pl-bar";
          power.appendChild(bar);
        }
        strong.textContent=String(pl.remaining);
        span.textContent="/ "+String(pl.maximum)+" BATTLE PL";
        bar.style.width=String(pl.maximum?Math.max(0,Math.min(100,pl.remaining/pl.maximum*100)):0)+"%";
      }
    }
    return node;
  }
  function finitePresentationPL33000(value){
    if(value===null||value===undefined||value==="")return null;
    const number=Number(value);
    return Number.isFinite(number)?number:null;
  }
  function presentationReceiptTargets33000(receipt,side,participantId){
    return !!(receipt&&receipt.targetRef&&
      String(receipt.targetRef.side||"")===String(side||"")&&
      String(receipt.targetRef.participantId||"")===String(participantId||""));
  }
  function presentationRemainingPL33000(side,participantId,canonical){
    if(!canonical||!orderedPlaybackEnabled33000())return canonical;
    try{syncBattlePresentationQueue33000();}catch(_error){}

    const active=battlePresentationQueueState33000.active&&battlePresentationQueueState33000.active.receipt||null;
    if(presentationReceiptTargets33000(active,side,participantId)){
      const after=finitePresentationPL33000(active.afterPL);
      if(after!==null){
        return{remaining:after,maximum:Number(canonical.maximum)||Math.max(0,after),presentationStaged:true,presentationPhase:"active_after",actionId:active.actionId};
      }
      const before=finitePresentationPL33000(active.beforePL);
      if(before!==null){
        return{remaining:before,maximum:Number(canonical.maximum)||Math.max(0,before),presentationStaged:true,presentationPhase:"active_before",actionId:active.actionId};
      }
    }

    const target=(battlePresentationQueueState33000.queue||[])
      .map(row=>row&&row.receipt||null)
      .filter(receipt=>presentationReceiptTargets33000(receipt,side,participantId)&&finitePresentationPL33000(receipt.beforePL)!==null)
      .sort((a,b)=>(Number(a.sequenceOrdinal)||0)-(Number(b.sequenceOrdinal)||0))[0]||null;
    if(!target)return canonical;
    const before=finitePresentationPL33000(target.beforePL);
    return{remaining:before,maximum:Number(canonical.maximum)||Math.max(0,before),presentationStaged:true,presentationPhase:"queued_before",actionId:target.actionId};
  }
  function supportRemainingPL33000(side,participantId){
    let canonical=null;
    try{
      if(typeof getBattleRemainingPLRecord==="function"){
        const record=getBattleRemainingPLRecord(side,participantId);
        if(record){
          const current=Number.isFinite(Number(record.current))?Number(record.current):Number(record.remaining);
          if(Number.isFinite(current))canonical={remaining:current,maximum:Number(record.maximum)||current};
        }
      }
      if(!canonical&&typeof getBattleRemainingPL==="function"){
        const remaining=Number(getBattleRemainingPL(side,participantId));
        if(Number.isFinite(remaining))canonical={remaining,maximum:remaining};
      }
    }catch(_error){}
    return presentationRemainingPL33000(side,participantId,canonical);
  }
  function refreshFormationPLProjection33000(stage=null){
    stage=liveBattleStage33000(stage);
    if(!stage||stage.dataset.formationStage!=="true")return{success:false,reason:"formation_stage_missing"};
    const player=deployedFormation33000("player"),enemy=deployedFormation33000("enemy");
    const playerActive=player.find(row=>row.slot===1)||player[0]||null;
    const enemyActive=enemy.find(row=>row.slot===1)||enemy[0]||null;
    if(playerActive)projectFormationActivePortrait33000(stage,"player",playerActive);
    if(enemyActive)projectFormationActivePortrait33000(stage,"enemy",enemyActive);
    return{
      success:true,
      playerId:playerActive&&playerActive.participantId||null,
      enemyId:enemyActive&&enemyActive.participantId||null,
      presentationOnly:true,
      semanticWrite:false
    };
  }
  globalThis.refreshFormationPLProjection33000=refreshFormationPLProjection33000;
  function ensureFormationSupportMarkup33000(node){
    if(!node)return null;
    let img=node.querySelector(".battle-live-roster-portrait");
    let copy=node.querySelector(".battle-live-roster-copy");
    if(!img){
      img=document.createElement("img");
      img.className="battle-live-roster-portrait";
      img.alt="";
      img.setAttribute("aria-hidden","true");
      node.appendChild(img);
    }
    if(!copy){
      copy=document.createElement("div");
      copy.className="battle-live-roster-copy";
      copy.innerHTML='<strong class="battle-live-roster-name"></strong><span class="battle-live-roster-power"></span>';
      node.appendChild(copy);
    }
    return{img,copy,name:copy.querySelector(".battle-live-roster-name"),power:copy.querySelector(".battle-live-roster-power")};
  }
  function projectFormationSupports33000(stage,side,rows){
    const roster=stage.querySelector(".battle-live-roster-"+side);
    if(!roster)return[];
    for(const row of rows){
      if(!row||row.slot===1)continue;
      if(!roster.querySelector('.battle-live-roster-slot[data-slot="'+row.slot+'"]')){
        const node=document.createElement("div");
        node.className="battle-live-roster-slot is-empty";
        node.dataset.slot=String(row.slot);
        roster.appendChild(node);
      }
    }
    const ids=new Map(rows.map(row=>[row.slot,row]));
    const nodes=[...roster.querySelectorAll(".battle-live-roster-slot")];
    for(const node of nodes){
      const slot=Number(node.dataset.slot)||0,row=ids.get(slot)||null;
      node.classList.remove("battle2-formation-participant","battle2-formation-support","battle2-formation-focus","battle2-formation-recessed","battle2-formation-bench","battle2-formation-reserve");
      delete node.dataset.participantId;delete node.dataset.formationSide;delete node.dataset.formationSlot;delete node.dataset.formationRole;
      if(slot===1||!row){
        node.dataset.formationHidden="true";
        continue;
      }
      delete node.dataset.formationHidden;
      node.classList.remove("is-empty");
      node.dataset.participantId=row.participantId;
      node.dataset.formationSide=side;
      node.dataset.formationSlot=String(slot);
      node.dataset.formationRole=slot<=4?"benched":"reserve";
      node.dataset.framelessBattlePortrait="true";
      node.classList.add("battle2-formation-participant","battle2-formation-support",slot<=4?"battle2-formation-bench":"battle2-formation-reserve");
      const markup=ensureFormationSupportMarkup33000(node);
      const portrait=formationPortrait33000(side,row.participant);
      if(markup&&markup.img&&portrait){
        markup.img.setAttribute("src",portrait);
        markup.img.dataset.formationPortrait="true";
      }
      if(markup&&markup.name)markup.name.textContent=String(row.participant.displayName||row.participant.name||row.participantId);
      const pl=supportRemainingPL33000(side,row.participantId);
      if(markup&&markup.power)markup.power.textContent=pl?String(pl.remaining)+" / "+String(pl.maximum)+" PL":"DEPLOYED";
    }
    return nodes;
  }
  function installFormationDock33000(stage){
    const row=stage&&stage.querySelector(".battle-live-action-family-row");if(!row)return false;
    const buttons=[...row.querySelectorAll("button")];
    for(const button of buttons){
      const handler=String(button.getAttribute("onclick")||"");
      if(handler.includes("openBattleSkillsActionFamily")){
        button.dataset.formationFamily="skills";button.textContent="SKILLS";
      }else if(handler.includes("openBattleItemActionFamily")){
        button.dataset.formationFamily="items";button.textContent="ITEMS";
      }else if(handler.includes("openBattleSummonActionFamily")){
        button.dataset.formationFamily="summons";button.textContent="SUMMONS";
      }
    }
    const withdraw=row.querySelector(".battle-live-withdraw-action");
    if(withdraw){
      withdraw.classList.remove("battle-live-action-family","battle-live-withdraw-action");
      withdraw.classList.add("battle2-formation-withdraw");
      withdraw.textContent="WITHDRAW";
      withdraw.setAttribute("aria-label","Withdraw active shinobi");
      stage.appendChild(withdraw);
    }
    const primary=[...row.querySelectorAll("button[data-formation-family]")];
    row.dataset.primaryFamilies=primary.map(b=>b.textContent.trim()).join("|");
    row.dataset.primaryCount=String(primary.length);
    stage.dataset.formationTray=formationTrayMode33000||"closed";
    for(const button of primary)button.classList.toggle("is-selected",stage.dataset.formationTray===button.dataset.formationFamily.replace("summons","summon"));
    return primary.length===3;
  }
  function storyCallerBattleEnvironment33000(){
    const battle=typeof currentBattle!=="undefined"?currentBattle:null;
    const rc=battle&&battle.returnContext&&typeof battle.returnContext==="object"?battle.returnContext:null;
    if(!rc||rc.type!=="story_scene")return"";

    const explicit=String(rc.presentationEnvironmentPath||rc.environmentPath||"").trim();
    if(explicit)return explicit;

    try{
      if(
        String(rc.sceneId||"")==="origin_academy_kakashi_anbu_retrieval"&&
        typeof globalThis.getAcademyKakashiV2Presentation36020==="function"
      ){
        const projection=globalThis.getAcademyKakashiV2Presentation36020(String(rc.sourceBeatId||""));
        const backdrop=String(projection&&projection.backdrop||"").trim();
        if(backdrop)return backdrop;
      }
    }catch(_error){}

    try{
      const definition=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(String(rc.sceneId||"")):null;
      const beat=definition&&definition.beatMap&&typeof definition.beatMap.get==="function"
        ?definition.beatMap.get(String(rc.sourceBeatId||""))
        :null;
      const authored=String(
        beat&&beat.battle&&(beat.battle.presentationEnvironmentPath||beat.battle.environmentPath||beat.battle.backdrop)||
        beat&&beat.presentationEnvironmentPath||
        beat&&beat.environmentPath||
        ""
      ).trim();
      if(authored)return authored;
    }catch(_error){}

    try{
      const runtime=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
      if(
        runtime&&String(runtime.sceneId||"")===String(rc.sceneId||"")&&
        typeof globalThis.getActiveStorySceneBoardProjection==="function"
      ){
        const projection=globalThis.getActiveStorySceneBoardProjection();
        const backdrop=String(projection&&projection.backdrop||"").trim();
        if(backdrop)return backdrop;
      }
    }catch(_error){}
    return"";
  }
  function sharedBattleEnvironmentPath33000(){
    const battle=typeof currentBattle!=="undefined"?currentBattle:null;
    if(!battle)return"";
    return String(
      battle.presentationEnvironmentPath||
      battle.environmentPath||
      storyCallerBattleEnvironment33000()||
      ""
    ).trim();
  }
  function applyBattleEnvironment33000(stage){
    if(!stage)return null;
    const encounterId=String(currentBattle&&currentBattle.encounterId||"");
    const configId=String(currentBattle&&currentBattle.battleConfigId||"");
    const menmaProof=encounterId==="origin_academy_menma_prologue:three_test_subjects"&&configId==="academy_menma_origin_three_test_subjects_with_anko";
    const environmentPath=sharedBattleEnvironmentPath33000()||(menmaProof?"Scene backdrops/forest_clearing_day.png":"");
    if(environmentPath){
      if(currentBattle){
        if(!String(currentBattle.environmentPath||"").trim())currentBattle.environmentPath=environmentPath;
        if(!String(currentBattle.presentationEnvironmentPath||"").trim())currentBattle.presentationEnvironmentPath=environmentPath;
      }
      stage.dataset.battleEnvironment=menmaProof?"forest_clearing_day":"authored";
      stage.dataset.battleEnvironmentPath=environmentPath;
      const cssPath=environmentPath.replace(/\\/g,"\\\\").replace(/"/g,'\\"');
      stage.style.setProperty("background-image",`linear-gradient(180deg,rgba(1,8,9,.20),rgba(1,8,9,.48)),url("${cssPath}")`,"important");
      stage.style.setProperty("background-size","cover","important");
      stage.style.setProperty("background-position","center","important");
      stage.style.setProperty("background-repeat","no-repeat","important");
    }else{
      delete stage.dataset.battleEnvironment;
      delete stage.dataset.battleEnvironmentPath;
      stage.style.removeProperty("background-image");
      stage.style.removeProperty("background-size");
      stage.style.removeProperty("background-position");
      stage.style.removeProperty("background-repeat");
    }
    // Historical proof/debug marker only. It no longer gates the shared Battle shell.
    if(menmaProof)stage.dataset.evolvedPlProof="menma_three_subjects";
    else delete stage.dataset.evolvedPlProof;
    return environmentPath?{environmentPath,semanticWrite:false,sharedBattleSystem:true,menmaProof}:null;
  }
  function installFormationStage33000(stage){
    if(!stage)return null;
    const player=deployedFormation33000("player"),enemy=deployedFormation33000("enemy"),mode=formationMode33000();
    stage.dataset.formationStage="true";
    stage.dataset.battleSystem="shinobi_chronicles_shared";
    stage.dataset.formationMode=mode;
    stage.dataset.playerFormationCount=String(player.length);
    stage.dataset.enemyFormationCount=String(enemy.length);
    applyBattleEnvironment33000(stage);
    const playerActiveRow=player.find(row=>row.slot===1)||player[0]||null;
    const enemyActiveRow=enemy.find(row=>row.slot===1)||enemy[0]||null;
    const playerActiveNode=projectFormationActivePortrait33000(stage,"player",playerActiveRow);
    const enemyActiveNode=projectFormationActivePortrait33000(stage,"enemy",enemyActiveRow);
    projectFormationSupports33000(stage,"player",player);
    projectFormationSupports33000(stage,"enemy",enemy);
    const status=stage.querySelector(".battle-live-status span");
    if(status){
      const playerName=playerActiveRow&&String(playerActiveRow.participant.displayName||playerActiveRow.participant.name||playerActiveRow.participantId)||"NO ACTIVE SHINOBI";
      const enemyName=enemyActiveRow&&String(enemyActiveRow.participant.displayName||enemyActiveRow.participant.name||enemyActiveRow.participantId)||"NO ACTIVE OPPOSITION";
      status.textContent=playerName+" VS "+enemyName;
    }

    // Scoped relay/yield motion for the evolved Menma proof only. Generic
    // Formation Stage and frozen Kakashi remain under the no-tween policy.
    const transition=currentBattle&&currentBattle.deployment&&currentBattle.deployment.lastTransition||null;
    const transitionId=transition&&String(transition.id||"")||"";
    if(stage.dataset.evolvedPlProof==="menma_three_subjects"&&transitionId&&stage.dataset.lastFormationTransitionId!==transitionId){
      stage.dataset.lastFormationTransitionId=transitionId;
      const animateNode=node=>{
        if(!node)return;
        node.classList.remove("battle2-formation-relay-in");
        void node.offsetWidth;
        node.classList.add("battle2-formation-relay-in");
        setTimeout(()=>{if(node&&node.isConnected)node.classList.remove("battle2-formation-relay-in");},560);
      };
      if(transition.side==="player")animateNode(playerActiveNode);
      if(transition.side==="enemy")animateNode(enemyActiveNode);
      if(transition.pairedEnemyRelayTransition)animateNode(enemyActiveNode);
    }
    for(const node of stage.querySelectorAll(".battle2-formation-participant")){
      node.classList.remove("battle2-formation-focus","battle2-formation-recessed","battle2-formation-selected-target");
    }
    const actorRef=player[0]?{side:"player",participantId:player[0].participantId}:null;
    const targetRef=selectedFormationTarget33000();
    const actorNode=formationNodeForRef33000(stage,actorRef),targetNode=formationNodeForRef33000(stage,targetRef);
    if(actorNode)actorNode.classList.add("battle2-formation-focus");
    if(targetNode){
      targetNode.classList.add("battle2-formation-focus");
      if(targetRef&&targetRef.selected)targetNode.classList.add("battle2-formation-selected-target");
    }
    for(const side of ["player","enemy"]){
      const active=side==="player"?stage.querySelector(".battle-live-active-card-player"):stage.querySelector(".battle-live-active-card-enemy");
      const focus=side==="player"?actorNode:targetNode;
      if(active&&focus&&active!==focus)active.classList.add("battle2-formation-recessed");
    }
    installFormationDock33000(stage);
    return{
      mode,
      playerCount:player.length,
      enemyCount:enemy.length,
      actorRef,
      targetRef,
      primaryFamilies:stage.querySelector(".battle-live-action-family-row")?.dataset.primaryFamilies||"",
      trayMode:stage.dataset.formationTray,
      semanticWrite:false
    };
  }
  window.installFormationStage33000=installFormationStage33000;

  const BATTLE_PRESENTATION_CLASSES_33000=Object.freeze(["PHYSICAL_STRIKE","HEAVY_STRIKE","PROJECTILE","CHAKRA_RANGED","AREA_ATTACK","GUARD","EVADE","SUBSTITUTION","HEAL","BUFF","DEBUFF","RESTRAINT","SUMMON","ENVIRONMENTAL","TRANSFORMATION","DEFEAT"]);
  const playedBattlePerformanceKeys33000=new Set();
  const BATTLE_PRESENTATION_QUEUE_VERSION_33000=2;
  const BATTLE_PRESENTATION_DEFAULT_MS_33000=1850;
  const BATTLE_PRESENTATION_REDUCED_MS_33000=420;
  const battlePresentationQueueState33000={
    battleId:null,queue:[],queuedKeys:new Set(),playedKeys:new Set(),active:null,timer:null,
    deferredTerminalOverlay:null,deferredCallerResume:null,terminalWatchdog:null,lastSequenceOrdinal:0,
    receiptSettlementInProgress:false
  };
  function orderedPlaybackEnabled33000(){
    // Canonical Shinobi Chronicles Battle presentation is global. Menma is the
    // benchmark encounter, not an enablement gate. Keep playback alive through
    // terminal resolution while a concrete Battle occurrence still owns the
    // current Battle state.
    return !!(currentBattle&&String(currentBattle.battleId||"").trim());
  }
  function presentationStorageKey33000(battleId){
    return "sc_battle_presentation_33000:"+String(battleId||"");
  }
  function persistPresentationQueueState33000(){
    if(typeof sessionStorage==="undefined"||!battlePresentationQueueState33000.battleId)return;
    try{
      sessionStorage.setItem(presentationStorageKey33000(battlePresentationQueueState33000.battleId),JSON.stringify({
        version:BATTLE_PRESENTATION_QUEUE_VERSION_33000,
        battleId:battlePresentationQueueState33000.battleId,
        playedKeys:[...battlePresentationQueueState33000.playedKeys],
        lastSequenceOrdinal:battlePresentationQueueState33000.lastSequenceOrdinal
      }));
    }catch(_error){}
  }
  function resetPresentationQueueState33000(battleId){
    if(battlePresentationQueueState33000.timer)clearTimeout(battlePresentationQueueState33000.timer);
    if(battlePresentationQueueState33000.terminalWatchdog)clearTimeout(battlePresentationQueueState33000.terminalWatchdog);
    battlePresentationQueueState33000.battleId=String(battleId||"")||null;
    battlePresentationQueueState33000.queue=[];
    battlePresentationQueueState33000.queuedKeys=new Set();
    battlePresentationQueueState33000.playedKeys=new Set();
    battlePresentationQueueState33000.active=null;
    battlePresentationQueueState33000.timer=null;
    battlePresentationQueueState33000.deferredTerminalOverlay=null;
    battlePresentationQueueState33000.deferredCallerResume=null;
    battlePresentationQueueState33000.terminalWatchdog=null;
    battlePresentationQueueState33000.lastSequenceOrdinal=0;
    battlePresentationQueueState33000.receiptSettlementInProgress=false;
    if(typeof sessionStorage!=="undefined"&&battlePresentationQueueState33000.battleId){
      try{
        const raw=sessionStorage.getItem(presentationStorageKey33000(battlePresentationQueueState33000.battleId));
        const saved=raw?JSON.parse(raw):null;
        if(saved&&saved.version===BATTLE_PRESENTATION_QUEUE_VERSION_33000&&saved.battleId===battlePresentationQueueState33000.battleId){
          battlePresentationQueueState33000.playedKeys=new Set(Array.isArray(saved.playedKeys)?saved.playedKeys:[]);
          battlePresentationQueueState33000.lastSequenceOrdinal=Math.max(0,Number(saved.lastSequenceOrdinal)||0);
        }
      }catch(_error){}
    }
  }
  function ensurePresentationQueueBattle33000(){
    const battleId=currentBattle&&currentBattle.battleId?String(currentBattle.battleId):null;
    if(battlePresentationQueueState33000.battleId!==battleId)resetPresentationQueueState33000(battleId);
    return battleId;
  }
  function opportunityIdForAction33000(actionId){
    try{
      const state=currentBattle&&currentBattle.menmaEvolvedPLBattle36900;
      const rows=state&&state.committedOpportunities&&typeof state.committedOpportunities==="object"?Object.values(state.committedOpportunities):[];
      const row=rows.find(value=>value&&String(value.actionId||"")===String(actionId||""));
      return row&&row.opportunityId||null;
    }catch(_error){return null;}
  }

  function battleEvidence33000(){
    try{
      const runtime=typeof ensureBattleRuntimeState==="function"?ensureBattleRuntimeState():currentBattle&&currentBattle.runtime;
      const rows=runtime&&Array.isArray(runtime.evidence)?runtime.evidence:[];
      const battleId=currentBattle&&currentBattle.battleId||null;
      return battleId?rows.filter(row=>row&&row.battleId===battleId):rows;
    }catch(_error){return[];}
  }
  function participant33000(ref){
    if(!ref||!ref.side||!ref.participantId)return null;
    try{return typeof getBattleParticipantByIdentity==="function"?getBattleParticipantByIdentity(ref.side,ref.participantId):null;}catch(_error){return null;}
  }
  function portrait33000(ref,participant){
    if(!ref||!participant)return"";
    try{
      const p=ref.side==="player"
        ?(typeof resolveUIPortraitProjection==="function"?resolveUIPortraitProjection(participant):null)
        :(typeof resolveBattleEnemyPortraitProjection==="function"?resolveBattleEnemyPortraitProjection(participant):null);
      return p&&p.path?String(p.path):"";
    }catch(_error){return"";}
  }
  function actionLabel33000(completion,group,actor){
    const eventType=String(completion&&completion.eventType||"");
    if(eventType==="menma_origin_scripted_anko_takedown_completed"&&completion&&completion.data&&completion.data.displayName)return String(completion.data.displayName);
    if(eventType==="menma_origin_enemy_opportunity_skipped")return"No Legal Action";
    if(eventType==="menma_origin_enemy_opportunity_failed_visible")return"Action Could Not Resolve";
    if(eventType==="menma_origin_anko_assist_skipped")return"Assist Skipped";
    if(eventType==="menma_origin_anko_assist_failed_visible")return"Assist Could Not Resolve";
    const skillId=completion&&completion.skillId||null,itemId=completion&&completion.itemId||null;
    if(itemId){
      try{const item=typeof getItemDefinition==="function"?getItemDefinition(itemId):null;if(item&&item.name)return item.name;}catch(_error){}
      return String(itemId).replaceAll("_"," ").toUpperCase();
    }
    if(skillId){
      try{
        if(completion.actorRef&&completion.actorRef.side==="player"&&actor&&typeof getBattlePreparedSkillDefinition==="function"){
          const skill=getBattlePreparedSkillDefinition(actor,skillId);if(skill&&skill.displayName)return skill.displayName;
        }
        if(completion.actorRef&&completion.actorRef.side==="enemy"&&actor&&typeof getEnemyAuthoredBattleActions==="function"){
          const action=(getEnemyAuthoredBattleActions(actor)||[]).find(row=>row&&((row.skillId||row.id)===skillId));if(action&&action.displayName)return action.displayName;
        }
      }catch(_error){}
      return String(skillId).replaceAll("_"," ").replace(/\b\w/g,ch=>ch.toUpperCase());
    }
    const attempted=(group||[]).find(row=>row.eventType==="action_attempted");
    return String(attempted&&attempted.data&&attempted.data.actionClass||"Committed Action").replaceAll("_"," ").replace(/\b\w/g,ch=>ch.toUpperCase());
  }
  function resultClass33000(completion,group){
    const eventType=String(completion&&completion.eventType||"");
    if(eventType.endsWith("_skipped"))return"SKIPPED";
    if(eventType.endsWith("_failed_visible"))return"FAILED";
    const skillId=String(completion&&completion.skillId||"").toLowerCase();
    const events=(group||[]).map(row=>String(row.eventType||"").toLowerCase());
    const damages=(group||[]).filter(row=>row.eventType==="damage_resolved");
    const explicitSubstitution=skillId.includes("substitution")||events.some(x=>x.includes("substitution"));
    if(explicitSubstitution)return"SUBSTITUTION";
    if(events.some(x=>x.includes("evade")||x.includes("evasion")))return"EVADE";
    if(events.some(x=>x.includes("miss")))return"MISS";
    if(damages.some(row=>Number(row.data&&row.data.remainingBattlePLAfter)<=0))return"WITHDRAWAL";
    const guarded=damages.some(row=>{
      const data=row.data||{};
      return data.guardingStepParticipated===true||data.enmaGuardParticipated===true||
        (Array.isArray(data.flatGuards)&&data.flatGuards.some(g=>g&&g.participated))||
        (Array.isArray(data.ratioGuards)&&data.ratioGuards.some(g=>g&&g.participated));
    });
    if(guarded)return damages.reduce((n,row)=>n+Math.max(0,Number(row.data&&row.data.finalDamage)||0),0)>0?"GUARD":"BLOCK";
    if(damages.reduce((n,row)=>n+Math.max(0,Number(row.data&&row.data.finalDamage)||0),0)>0)return"HIT";
    if(completion&&completion.data&&completion.data.resolved===true)return"EFFECT";
    return"RESOLVED";
  }
  function presentationClass33000(completion,group,result){
    const skillId=String(completion&&completion.skillId||"").toLowerCase();
    const attempted=(group||[]).find(row=>row.eventType==="action_attempted");
    const actionClass=String(attempted&&attempted.data&&attempted.data.actionClass||"").toLowerCase();
    const damage=(group||[]).find(row=>row.eventType==="damage_resolved");
    const discipline=String(damage&&damage.data&&damage.data.primaryDiscipline||"").toLowerCase();
    if(result==="SUBSTITUTION")return"SUBSTITUTION";
    if(result==="EVADE"||result==="MISS")return"EVADE";
    if(result==="GUARD"||result==="BLOCK")return"GUARD";
    if(result==="WITHDRAWAL"||result==="DEFEAT")return"DEFEAT";
    if(skillId.includes("summon")||actionClass.includes("summon"))return"SUMMON";
    if(skillId.includes("heal")||actionClass.includes("heal")||actionClass.includes("recovery"))return"HEAL";
    if(skillId.includes("restrain")||skillId.includes("bind")||actionClass.includes("control"))return"RESTRAINT";
    if(skillId.includes("projectile")||skillId.includes("shuriken")||skillId.includes("kunai")||skillId.includes("throwing"))return"PROJECTILE";
    if(skillId.includes("fire")||skillId.includes("chakra")||discipline==="ninjutsu")return"CHAKRA_RANGED";
    if(discipline==="taijutsu")return"PHYSICAL_STRIKE";
    if(actionClass.includes("buff")||actionClass.includes("enhancement"))return"BUFF";
    if(actionClass.includes("debuff"))return"DEBUFF";
    return"BATTLE_ACTION";
  }
  function projectBattlePerformanceCompletion33000(completion,evidence,sequenceOrdinal){
    if(!completion||!completion.actionId||!currentBattle||!currentBattle.battleId)return null;
    const group=evidence.filter(row=>row&&row.actionId===completion.actionId);
    const actorRef=completion.actorRef||group.find(row=>row.actorRef)?.actorRef||null;
    const targetRef=completion.targetRef||group.find(row=>row.targetRef)?.targetRef||null;
    const actor=participant33000(actorRef),target=participant33000(targetRef);
    const damages=group.filter(row=>row.eventType==="damage_resolved");
    const firstDamage=damages[0]||null,lastDamage=damages[damages.length-1]||null;
    const totalDamage=damages.reduce((sum,row)=>sum+Math.max(0,Number(row.data&&row.data.finalDamage)||0),0);
    const result=resultClass33000(completion,group);
    const relay=group.find(row=>row&&row.eventType==="battle_formation_relay_committed")||null;
    const actionRole=completion.eventType==="menma_origin_scripted_anko_takedown_completed"
      ?"AUTHORED BEAT"
      :completion.eventType==="menma_origin_anko_assist_completed"
        ?"AUTHORED ASSIST":"ACTIVE";
    const opportunityId=opportunityIdForAction33000(completion.actionId);
    const receipt={
      receiptVersion:BATTLE_PRESENTATION_QUEUE_VERSION_33000,
      battleId:String(currentBattle.battleId),
      opportunityId:opportunityId||null,
      sequenceOrdinal:Number(sequenceOrdinal)||0,
      actionId:String(completion.actionId),
      actorRef:actorRef?{side:String(actorRef.side),participantId:String(actorRef.participantId)}:null,
      targetRef:targetRef?{side:String(targetRef.side),participantId:String(targetRef.participantId)}:null,
      actorName:actor&&String(actor.displayName||actor.name)||actorRef&&actorRef.participantId||"ACTOR",
      targetName:target&&String(target.displayName||target.name)||targetRef&&targetRef.participantId||"TARGET",
      actionLabel:actionLabel33000(completion,group,actor),
      actionRole,
      result,
      presentationClass:presentationClass33000(completion,group,result),
      finalDamage:totalDamage,
      beforePL:firstDamage&&Number.isFinite(Number(firstDamage.data&&firstDamage.data.remainingBattlePLBefore))?Number(firstDamage.data.remainingBattlePLBefore):null,
      afterPL:lastDamage&&Number.isFinite(Number(lastDamage.data&&lastDamage.data.remainingBattlePLAfter))?Number(lastDamage.data.remainingBattlePLAfter):null,
      exactTarget:!!(targetRef&&targetRef.side&&targetRef.participantId),
      withdrawal:result==="WITHDRAWAL"||result==="DEFEAT"||!!relay,
      relayFrom:relay&&relay.data&&relay.data.relayFrom||null,
      relayTo:relay&&relay.data&&relay.data.relayTo||null,
      sourceEvidenceIds:group.map(row=>row.evidenceId).filter(Boolean),
      immutableCommittedFacts:true,
      semanticWrite:false
    };
    return Object.freeze(receipt);
  }
  const BATTLE_PRESENTATION_COMPLETION_TYPES_33000=new Set([
    "skill_action_completed",
    "enemy_authored_action_completed",
    "item_action_completed",
    "summon_skill_resolved_and_returned",
    "menma_origin_anko_assist_completed",
    "menma_origin_scripted_anko_takedown_completed",
    "menma_origin_phase_c_enemy_opportunity_failed_visible",
    "menma_origin_enemy_opportunity_skipped",
    "menma_origin_enemy_opportunity_failed_visible",
    "menma_origin_anko_assist_skipped",
    "menma_origin_anko_assist_failed_visible"
  ]);
  function collectBattlePerformanceProjections33000(){
    if(!currentBattle||!currentBattle.battleId)return[];
    const evidence=battleEvidence33000();
    const completions=evidence.filter(row=>row&&row.actionId&&row.committedOccurrence!==false&&BATTLE_PRESENTATION_COMPLETION_TYPES_33000.has(row.eventType));
    const seen=new Set(),out=[];
    for(const completion of completions){
      const key=String(currentBattle.battleId)+":"+String(completion.actionId);
      if(seen.has(key))continue;
      seen.add(key);
      const projection=projectBattlePerformanceCompletion33000(completion,evidence,out.length+1);
      if(projection)out.push(projection);
    }
    return out;
  }
  function resolveBattlePerformanceProjection33000(){
    const projections=collectBattlePerformanceProjections33000();
    return projections.length?projections[projections.length-1]:null;
  }
  window.collectBattlePerformanceProjections33000=collectBattlePerformanceProjections33000;
  window.resolveBattlePerformanceProjection33000=resolveBattlePerformanceProjection33000;

  function battlePerformanceMarkup33000(p){
    if(!p)return"";
    const relay=p.relayFrom?'<div class="battle2-performance-relay"><span>WITHDRAWAL</span><span>'+esc(p.relayFrom)+(p.relayTo?' → '+esc(p.relayTo)+' ACTIVE':' → FORMATION SETTLED')+'</span></div>':"";
    const target=p.targetName?'<span class="battle2-performance-target">TARGET · '+esc(p.targetName)+'</span>':"";
    return '<section class="battle2-performance-stage" data-action-id="'+esc(p.actionId)+'" data-performance-class="'+esc(p.presentationClass)+'" data-result="'+esc(p.result)+'" data-action-role="'+esc(p.actionRole||"ACTIVE")+'" aria-label="Committed Battle action playback">'
      +'<div class="battle2-performance-center"><small>'+esc(p.actorName)+'</small><strong>'+esc(p.actionLabel)+'</strong>'+target+relay+'</div></section>';
  }
  function battlePerformanceResultChip33000(p){
    if(typeof document==="undefined"||!p)return null;
    const chip=document.createElement("div");
    chip.className="battle2-performance-result-chip";
    chip.dataset.result=String(p.result||"RESOLVED");
    const delta=p.finalDamage>0?`${p.finalDamage} DAMAGE`:p.result==="SUBSTITUTION"?"NO DIRECT HIT":p.result==="SKIPPED"?"NO ACTION":p.result==="FAILED"?"NO EFFECT":"STATE CHANGE";
    const state=p.beforePL!==null&&p.afterPL!==null?`PL ${p.beforePL} → ${p.afterPL}`:(p.result==="SKIPPED"||p.result==="FAILED")?"OPPORTUNITY SETTLED":"AUTHORITATIVE STATE UPDATED";
    const result=document.createElement("b");result.textContent=String(p.result||"RESOLVED");
    const change=document.createElement("em");change.textContent=delta;
    const settled=document.createElement("span");settled.textContent=state;
    chip.append(result,change,settled);
    return chip;
  }
  function battlePerformanceRoleNode33000(stage,ref){
    if(!stage||!ref||!ref.side||!ref.participantId)return null;
    const side=String(ref.side),participantId=String(ref.participantId);
    let active=null;
    try{
      active=side==="player"
        ?(currentBattle&&currentBattle.activePlayer||getBattleDeploymentParticipant("player",1)||null)
        :(typeof getActiveBattleEnemy33000==="function"?getActiveBattleEnemy33000():getBattleDeploymentParticipant("enemy",1)||null);
    }catch(_error){active=null;}
    if(active&&String(active.id||"")===participantId){
      return side==="player"?stage.querySelector(".battle-live-active-card-player"):stage.querySelector(".battle-live-active-card-enemy");
    }
    for(let slot=1;slot<=6;slot+=1){
      let deployed=null;
      try{deployed=typeof getBattleDeploymentParticipant==="function"?getBattleDeploymentParticipant(side,slot):null;}catch(_error){deployed=null;}
      if(!deployed||String(deployed.id||"")!==participantId)continue;
      return stage.querySelector('.battle-live-roster-'+side+' [data-slot="'+slot+'"]');
    }
    return null;
  }
  function clearBattlePerformanceRoles33000(stage,actionId=null){
    if(!stage)return false;
    if(actionId&&stage.dataset.battle2PerformanceActionId&&stage.dataset.battle2PerformanceActionId!==String(actionId))return false;
    stage.classList.remove("battle2-performance-active");
    for(const node of stage.querySelectorAll(".battle2-performance-role-actor,.battle2-performance-role-target")){
      node.classList.remove("battle2-performance-role-actor","battle2-performance-role-target");
    }
    for(const node of stage.querySelectorAll(".battle2-performance-result-chip"))try{node.remove();}catch(_error){}
    delete stage.dataset.battle2PerformanceActionId;
    delete stage.dataset.battle2PerformanceClass;
    delete stage.dataset.battle2PerformanceResult;
    return true;
  }
  function applyBattlePerformanceRoles33000(stage,p){
    clearBattlePerformanceRoles33000(stage);
    if(!stage||!p)return{actorNode:null,targetNode:null};
    const actorNode=battlePerformanceRoleNode33000(stage,p.actorRef);
    const targetNode=battlePerformanceRoleNode33000(stage,p.targetRef);
    stage.classList.add("battle2-performance-active");
    stage.dataset.battle2PerformanceActionId=String(p.actionId||"");
    stage.dataset.battle2PerformanceClass=String(p.presentationClass||"BATTLE_ACTION");
    stage.dataset.battle2PerformanceResult=String(p.result||"RESOLVED");
    if(actorNode)actorNode.classList.add("battle2-performance-role-actor");
    if(targetNode){
      targetNode.classList.add("battle2-performance-role-target");
      const chip=battlePerformanceResultChip33000(p);
      if(chip)targetNode.appendChild(chip);
    }
    return{actorNode,targetNode,resultChip:targetNode&&targetNode.querySelector(".battle2-performance-result-chip")||null};
  }
  function liveBattleStage33000(fallback=null){
    if(typeof document!=="undefined"){
      const live=document.querySelector(".alpha-code-battle-stage");
      if(live)return live;
    }
    return fallback;
  }
  function bindActiveBattlePresentation33000(stage,active){
    stage=liveBattleStage33000(stage);
    if(!stage||!active||!active.receipt)return null;
    let host=stage.querySelector(".battle2-performance-host");
    if(!host){host=document.createElement("div");host.className="battle2-performance-host";stage.appendChild(host);}
    if(host.dataset.actionId!==active.receipt.actionId){
      host.dataset.actionId=active.receipt.actionId;
      host.innerHTML=battlePerformanceMarkup33000(active.receipt);
    }
    const lane=host.querySelector(".battle2-performance-stage");
    if(lane){lane.classList.add("is-playing");lane.classList.remove("is-settled");}
    setPresentationQueueBusy33000(stage,true);
    applyBattlePerformanceRoles33000(stage,active.receipt);
    try{refreshFormationPLProjection33000(stage);}catch(_error){}
    stage.dataset.presentationSequenceOrdinal=String(active.receipt.sequenceOrdinal||0);
    stage.dataset.presentationActionRole=String(active.receipt.actionRole||"ACTIVE");
    stage.dataset.presentationActorId=String(active.receipt.actorRef&&active.receipt.actorRef.participantId||"");
    stage.dataset.presentationTargetId=String(active.receipt.targetRef&&active.receipt.targetRef.participantId||"");
    stage.dataset.presentationDamage=String(Math.max(0,Number(active.receipt.finalDamage)||0));
    stage.dataset.presentationBeforePl=active.receipt.beforePL===null?"":String(active.receipt.beforePL);
    stage.dataset.presentationAfterPl=active.receipt.afterPL===null?"":String(active.receipt.afterPL);
    return active.receipt;
  }
  function presentationPlaybackDuration33000(){
    try{return matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches?BATTLE_PRESENTATION_REDUCED_MS_33000:BATTLE_PRESENTATION_DEFAULT_MS_33000;}catch(_error){return BATTLE_PRESENTATION_DEFAULT_MS_33000;}
  }
  function setPresentationQueueBusy33000(stage,busy){
    if(!stage)return;
    stage.dataset.presentationQueueBusy=busy?"true":"false";
    stage.setAttribute("aria-busy",busy?"true":"false");
  }
  function syncBattlePresentationQueue33000(){
    const battleId=ensurePresentationQueueBattle33000();
    if(!battleId||!orderedPlaybackEnabled33000())return[];
    const projections=collectBattlePerformanceProjections33000();
    for(const projection of projections){
      if(!projection||projection.battleId!==battleId)continue;
      const key=projection.battleId+":"+projection.actionId;
      if(battlePresentationQueueState33000.playedKeys.has(key)||battlePresentationQueueState33000.queuedKeys.has(key)||(battlePresentationQueueState33000.active&&battlePresentationQueueState33000.active.key===key))continue;
      battlePresentationQueueState33000.queue.push({key,receipt:projection});
      battlePresentationQueueState33000.queuedKeys.add(key);
      battlePresentationQueueState33000.lastSequenceOrdinal=Math.max(battlePresentationQueueState33000.lastSequenceOrdinal,projection.sequenceOrdinal||0);
    }
    persistPresentationQueueState33000();
    return battlePresentationQueueState33000.queue.map(row=>row.receipt);
  }
  function tutorialPresentationBlocking33000(){
    try{
      return typeof globalThis.isPLBattleTutorialPresentationBlocking38500==="function"&&
        globalThis.isPLBattleTutorialPresentationBlocking38500()===true;
    }catch(_error){return false;}
  }
  function notifyTutorialPresentationSettled33000(receipt){
    try{
      return typeof globalThis.onPLBattlePresentationSettled38500==="function"&&
        globalThis.onPLBattlePresentationSettled38500(receipt)===true;
    }catch(_error){return false;}
  }
  function resumeBattlePresentationAfterTutorial33000(){
    ensurePresentationQueueBattle33000();
    syncBattlePresentationQueue33000();
    const stage=liveBattleStage33000(null);
    if(!stage)return{success:false,reason:"battle_stage_missing"};
    if(tutorialPresentationBlocking33000())return{success:false,reason:"tutorial_prompt_active"};
    if(battlePresentationQueueState33000.active){
      setPresentationQueueBusy33000(stage,true);
      return{success:true,active:true};
    }
    if(battlePresentationQueueState33000.queue.length){
      return{success:true,resumed:true,receipt:playNextBattlePresentationReceipt33000(stage)};
    }
    setPresentationQueueBusy33000(stage,false);
    flushDeferredTerminalOverlay33000();
    flushDeferredBattleCallerResume33000();
    return{success:true,resumed:true,queueEmpty:true};
  }
  globalThis.resumeBattlePresentationAfterTutorial33000=resumeBattlePresentationAfterTutorial33000;

  function refreshCommittedFormationPresentation33000(stage,beforeTransitionId){
    const transition=currentBattle&&currentBattle.deployment&&currentBattle.deployment.lastTransition||null;
    const afterTransitionId=transition&&String(transition.id||"")||"";
    if(!afterTransitionId||afterTransitionId===String(beforeTransitionId||""))return liveBattleStage33000(stage);
    // Relay/yield semantics are already committed. Re-render only the Combat
    // presentation so the central cards, PL rings and action dock consume the
    // new Active participants before the next immutable receipt is shown.
    try{
      if(typeof refreshBattleActionRegionPresentation==="function")refreshBattleActionRegionPresentation();
    }catch(_error){}
    return liveBattleStage33000(stage);
  }
    function finishBattlePresentationReceipt33000(stage,key){
    if(!battlePresentationQueueState33000.active||battlePresentationQueueState33000.active.key!==key)return false;
    stage=liveBattleStage33000(stage);
    const active=battlePresentationQueueState33000.active;
    const lane=stage&&stage.querySelector('.battle2-performance-stage[data-action-id="'+CSS.escape(active.receipt.actionId)+'"]');
    if(lane){lane.classList.remove("is-playing");lane.classList.add("is-settled");}
    clearBattlePerformanceRoles33000(stage,active.receipt.actionId);
    battlePresentationQueueState33000.active=null;
    battlePresentationQueueState33000.timer=null;
    battlePresentationQueueState33000.receiptSettlementInProgress=true;
    const beforeTransitionId=currentBattle&&currentBattle.deployment&&currentBattle.deployment.lastTransition
      ?String(currentBattle.deployment.lastTransition.id||""):"";

    // #373 successor: zero-PL is already committed, but the formation relay /
    // terminal transition waits until this exact action is visibly settled.
    // Presentation does not choose an outcome; it only releases the already
    // committed authored continuation.
    try{
      if(typeof globalThis.advanceMenmaScriptedBattleAfterPresentation37300==="function"){
        globalThis.advanceMenmaScriptedBattleAfterPresentation37300(active.receipt);
      }
    }catch(_error){}

    stage=refreshCommittedFormationPresentation33000(stage,beforeTransitionId);
    try{installFormationStage33000(stage);}catch(_error){}
    // Later committed actions, relays and ordinary enemy/player responses are
    // now eligible for ordered playback. First-Battle tutorial prompts may pause
    // this presentation queue, but never alter the already-committed semantics.
    const tutorialPaused=notifyTutorialPresentationSettled33000(active.receipt)||tutorialPresentationBlocking33000();
    syncBattlePresentationQueue33000();
    persistPresentationQueueState33000();
    battlePresentationQueueState33000.receiptSettlementInProgress=false;
    if(battlePresentationQueueState33000.active){
      setPresentationQueueBusy33000(stage,true);
    }else if(battlePresentationQueueState33000.queue.length){
      if(tutorialPaused)setPresentationQueueBusy33000(stage,false);
      else playNextBattlePresentationReceipt33000(stage);
    }else{
      setPresentationQueueBusy33000(stage,false);
      if(!tutorialPaused){
        flushDeferredTerminalOverlay33000();
        flushDeferredBattleCallerResume33000();
      }
    }
    return true;
  }
  function playNextBattlePresentationReceipt33000(stage){
    stage=liveBattleStage33000(stage);
    if(!stage||battlePresentationQueueState33000.active||!orderedPlaybackEnabled33000())return null;
    const next=battlePresentationQueueState33000.queue.shift()||null;
    if(!next){setPresentationQueueBusy33000(stage,false);flushDeferredTerminalOverlay33000();flushDeferredBattleCallerResume33000();return null;}
    battlePresentationQueueState33000.queuedKeys.delete(next.key);
    if(next.receipt.battleId!==String(currentBattle&&currentBattle.battleId||"")){
      persistPresentationQueueState33000();
      return playNextBattlePresentationReceipt33000(stage);
    }
    battlePresentationQueueState33000.active=next;
    // Claim before playback begins so reload can never duplicate a committed receipt.
    battlePresentationQueueState33000.playedKeys.add(next.key);
    persistPresentationQueueState33000();
    setPresentationQueueBusy33000(stage,true);
    // Preserve the locked fast-Battle rule: a player-open Skills tray remains
    // open across committed Skill/autonomous playback; unrelated trays may
    // contract around the committed action.
    const preserveSkills=formationTrayMode33000==="skills"||stage.dataset.formationTray==="skills";
    if(!preserveSkills){
      formationTrayMode33000=null;
      stage.dataset.formationTray="closed";
    }
    bindActiveBattlePresentation33000(stage,next);
    battlePresentationQueueState33000.timer=setTimeout(()=>finishBattlePresentationReceipt33000(stage,next.key),presentationPlaybackDuration33000());
    return next.receipt;
  }
  function hardSettleBattlePresentationQueue33000(reason="presentation_hard_settle"){
    ensurePresentationQueueBattle33000();
    // Capture every semantic action that may have committed synchronously before
    // fail-soft settlement so none can reappear as an unplayed duplicate later.
    syncBattlePresentationQueue33000();
    const stage=typeof document!=="undefined"?document.querySelector(".alpha-code-battle-stage"):null;
    if(battlePresentationQueueState33000.timer)clearTimeout(battlePresentationQueueState33000.timer);
    battlePresentationQueueState33000.timer=null;
    for(const row of battlePresentationQueueState33000.queue)battlePresentationQueueState33000.playedKeys.add(row.key);
    if(battlePresentationQueueState33000.active)battlePresentationQueueState33000.playedKeys.add(battlePresentationQueueState33000.active.key);
    battlePresentationQueueState33000.queue=[];
    battlePresentationQueueState33000.queuedKeys.clear();
    battlePresentationQueueState33000.active=null;
    battlePresentationQueueState33000.receiptSettlementInProgress=false;
    if(stage){
      clearBattlePerformanceRoles33000(stage);
      setPresentationQueueBusy33000(stage,false);
      stage.dataset.presentationHardSettleReason=String(reason);
      try{installFormationStage33000(stage);}catch(_error){}
    }
    persistPresentationQueueState33000();
    flushDeferredTerminalOverlay33000();
    flushDeferredBattleCallerResume33000();
    return{success:true,reason,semanticReplay:false};
  }
  function pendingBattlePresentation33000(){
    ensurePresentationQueueBattle33000();
    syncBattlePresentationQueue33000();
    return !!(battlePresentationQueueState33000.receiptSettlementInProgress||battlePresentationQueueState33000.active||battlePresentationQueueState33000.queue.length);
  }
  function installBattlePerformance33000(stage){
    if(!stage)return null;
    if(orderedPlaybackEnabled33000()){
      syncBattlePresentationQueue33000();
      if(!battlePresentationQueueState33000.active&&battlePresentationQueueState33000.queue.length)return playNextBattlePresentationReceipt33000(stage);
      if(battlePresentationQueueState33000.active)return bindActiveBattlePresentation33000(stage,battlePresentationQueueState33000.active);
      let host=stage.querySelector(".battle2-performance-host");
      if(!host){host=document.createElement("div");host.className="battle2-performance-host";stage.appendChild(host);}
      setPresentationQueueBusy33000(stage,false);
      return null;
    }
    // Legacy shared presentation remains unchanged for Battles not yet migrated
    // to the ordered immutable playback queue.
    const p=resolveBattlePerformanceProjection33000();
    let host=stage.querySelector(".battle2-performance-host");
    if(!host){host=document.createElement("div");host.className="battle2-performance-host";stage.appendChild(host);}
    if(!p){host.replaceChildren();delete host.dataset.actionId;clearBattlePerformanceRoles33000(stage);return null;}
    const key=p.battleId+":"+p.actionId;
    const played=playedBattlePerformanceKeys33000.has(key);
    if(host.dataset.actionId!==p.actionId){host.dataset.actionId=p.actionId;host.innerHTML=battlePerformanceMarkup33000(p);}
    const lane=host.querySelector(".battle2-performance-stage");
    if(lane){
      lane.classList.toggle("is-playing",!played);lane.classList.toggle("is-settled",played);
      if(!played){
        playedBattlePerformanceKeys33000.add(key);applyBattlePerformanceRoles33000(stage,p);
        setTimeout(()=>{if(lane.isConnected&&host.dataset.actionId===p.actionId){lane.classList.remove("is-playing");lane.classList.add("is-settled");clearBattlePerformanceRoles33000(stage,p.actionId);notifyTutorialPresentationSettled33000(p);}},920);
      }else clearBattlePerformanceRoles33000(stage);
    }
    return p;
  }
  window.syncBattlePresentationQueue33000=syncBattlePresentationQueue33000;
  window.pendingBattlePresentation33000=pendingBattlePresentation33000;
  window.hardSettleBattlePresentationQueue33000=hardSettleBattlePresentationQueue33000;
  window.installBattlePerformance33000=installBattlePerformance33000;

  // A terminal outcome can request Victory/Defeat before the outer action
  // completion evidence is appended. Observe only already-committed completion
  // records, then wake the presentation queue on the next microtask. This is a
  // presentation consumer: it never resolves damage, consumes opportunities,
  // changes PL, or authors semantic evidence.
  const PRIOR_RECORD_BATTLE_EVIDENCE_33000=typeof recordBattleEvidence==="function"?recordBattleEvidence:null;
  if(PRIOR_RECORD_BATTLE_EVIDENCE_33000){
    const wrappedRecordBattleEvidence33000=function(definition){
      const result=PRIOR_RECORD_BATTLE_EVIDENCE_33000.apply(this,arguments);
      if(
        orderedPlaybackEnabled33000()&&
        definition&&definition.actionId&&definition.committedOccurrence!==false&&
        BATTLE_PRESENTATION_COMPLETION_TYPES_33000.has(definition.eventType)
      ){
        queueMicrotask(()=>{
          if(!orderedPlaybackEnabled33000())return;
          ensurePresentationQueueBattle33000();
          syncBattlePresentationQueue33000();
          const stage=typeof document!=="undefined"?document.querySelector(".alpha-code-battle-stage"):null;
          if(stage)installBattlePerformance33000(stage);
        });
      }
      return result;
    };
    globalThis.recordBattleEvidence=wrappedRecordBattleEvidence33000;
    try{recordBattleEvidence=wrappedRecordBattleEvidence33000;}catch(_error){}
  }

  const PRIOR_RESUME_BATTLE_CALLER_33000=typeof resumeBattleCallerAfterCompletion==="function"?resumeBattleCallerAfterCompletion:null;
  function rehydrateStoryCallerPresentation33000(resumed){
    const activeStory=typeof globalThis.getActiveStorySceneRuntime==="function"
      ?globalThis.getActiveStorySceneRuntime()
      :null;
    const callerConsumed=!!(currentBattle&&currentBattle.battleOver===true&&!currentBattle.returnContext);
    const confirmedStoryReturn=!!(
      resumed&&resumed.success===true&&(
        resumed.type==="story_scene_resumed"||
        (activeStory&&callerConsumed)
      )
    );
    if(!confirmedStoryReturn)return resumed;
    try{
      if(typeof globalThis.clearStoryPresentationHidden33900==="function")globalThis.clearStoryPresentationHidden33900();
      if(PRIOR_OPEN_OVERLAY_33000)PRIOR_OPEN_OVERLAY_33000.call(globalThis,"story_scene");
    }catch(_error){}
    return resumed;
  }
  function flushDeferredBattleCallerResume33000(){
    const deferred=battlePresentationQueueState33000.deferredCallerResume;
    if(!deferred||!PRIOR_RESUME_BATTLE_CALLER_33000)return false;
    if(pendingBattlePresentation33000())return false;
    if(!currentBattle||String(currentBattle.battleId||"")!==deferred.battleId){
      battlePresentationQueueState33000.deferredCallerResume=null;
      return false;
    }
    battlePresentationQueueState33000.deferredCallerResume=null;
    const resumed=PRIOR_RESUME_BATTLE_CALLER_33000.apply(globalThis,deferred.args);
    rehydrateStoryCallerPresentation33000(resumed);
    return true;
  }
  if(PRIOR_RESUME_BATTLE_CALLER_33000){
    const wrappedResumeBattleCaller33000=function(){
      if(orderedPlaybackEnabled33000()&&currentBattle&&currentBattle.battleOver===true){
        ensurePresentationQueueBattle33000();
        syncBattlePresentationQueue33000();
        if(pendingBattlePresentation33000()){
          battlePresentationQueueState33000.deferredCallerResume={args:[...arguments],battleId:String(currentBattle.battleId||"")};
          setTimeout(()=>{
            const stage=typeof document!=="undefined"?document.querySelector(".alpha-code-battle-stage"):null;
            if(stage){syncBattlePresentationQueue33000();installBattlePerformance33000(stage);}
            else hardSettleBattlePresentationQueue33000("caller_resume_stage_missing");
          },0);
          return{success:true,presentationDeferred:true,callerResumeDeferred:true,semanticBattleAlreadyCommitted:true};
        }
      }
      return rehydrateStoryCallerPresentation33000(PRIOR_RESUME_BATTLE_CALLER_33000.apply(this,arguments));
    };
    globalThis.resumeBattleCallerAfterCompletion=wrappedResumeBattleCaller33000;
    try{resumeBattleCallerAfterCompletion=wrappedResumeBattleCaller33000;}catch(_error){}
  }

  // Reward results are committed facts, not slot-machine counters. The shared
  // Battle System projects the exact earned amount immediately for every Origin
  // and future Battle that consumes this shell.
  function isSharedStaticRewardPresentation33000(rewards){
    return !!(currentBattle&&String(currentBattle.battleId||"").trim()&&rewards&&typeof rewards==="object");
  }
  const PRIOR_VICTORY_REVEAL_33000=typeof runVictoryRevealAnimations==="function"?runVictoryRevealAnimations:null;
  if(PRIOR_VICTORY_REVEAL_33000){
    const wrappedVictoryReveal33000=function(container,rewards){
      if(isSharedStaticRewardPresentation33000(rewards)){
        const ryoElement=container&&container.querySelector?container.querySelector(".victory-ryo-number"):null;
        const expElement=container&&container.querySelector?container.querySelector(".victory-exp-number"):null;
        const ryoGranted=Math.max(0,Number(rewards&&rewards.ryo)||0);
        const expGranted=Math.max(0,Number(rewards&&rewards.exp)||0);
        if(ryoElement){
          ryoElement.textContent=String(ryoGranted);
          ryoElement.dataset.rewardPresentation="static_earned_amount";
          ryoElement.dataset.rewardAmount=String(ryoGranted);
          ryoElement.dataset.rewardAnimated="false";
        }
        if(expElement){
          expElement.textContent=String(expGranted);
          expElement.dataset.rewardPresentation="static_earned_amount";
          expElement.dataset.rewardAmount=String(expGranted);
          expElement.dataset.rewardAnimated="false";
        }
        return{success:true,presentationOnly:true,rewardMode:"static_earned_amount",ryoGranted,expGranted,animated:false};
      }
      return PRIOR_VICTORY_REVEAL_33000.apply(this,arguments);
    };
    globalThis.runVictoryRevealAnimations=wrappedVictoryReveal33000;
    try{runVictoryRevealAnimations=wrappedVictoryReveal33000;}catch(_error){}
  }

  const PRIOR_OPEN_OVERLAY_33000=typeof openOverlay==="function"?openOverlay:null;
  function flushDeferredTerminalOverlay33000(){
    const deferred=battlePresentationQueueState33000.deferredTerminalOverlay;
    if(!deferred||!PRIOR_OPEN_OVERLAY_33000)return false;
    if(pendingBattlePresentation33000())return false;
    battlePresentationQueueState33000.deferredTerminalOverlay=null;
    if(battlePresentationQueueState33000.terminalWatchdog)clearTimeout(battlePresentationQueueState33000.terminalWatchdog);
    battlePresentationQueueState33000.terminalWatchdog=null;
    PRIOR_OPEN_OVERLAY_33000.apply(globalThis,deferred.args);
    return true;
  }
  if(PRIOR_OPEN_OVERLAY_33000){
    const wrappedOpenOverlay33000=function(type){
      const target=String(type||"");
      if(orderedPlaybackEnabled33000()&&(target==="victory"||target==="defeat")&&currentBattle&&currentBattle.battleOver===true){
        ensurePresentationQueueBattle33000();
        syncBattlePresentationQueue33000();

        // Defer only while an immutable committed Battle receipt is genuinely
        // still playing/settling. A later Victory re-render (for example after
        // the explicit reward claim) must not manufacture a fresh 12-second
        // dead period after the queue is already empty.
        if(!pendingBattlePresentation33000()){
          battlePresentationQueueState33000.deferredTerminalOverlay=null;
          if(battlePresentationQueueState33000.terminalWatchdog)clearTimeout(battlePresentationQueueState33000.terminalWatchdog);
          battlePresentationQueueState33000.terminalWatchdog=null;
          return PRIOR_OPEN_OVERLAY_33000.apply(this,arguments);
        }

        battlePresentationQueueState33000.deferredTerminalOverlay={type:target,args:[...arguments],battleId:String(currentBattle.battleId||"")};
        const stage=typeof document!=="undefined"?document.querySelector(".alpha-code-battle-stage"):null;
        if(stage){installBattlePerformance33000(stage);}
        if(!battlePresentationQueueState33000.terminalWatchdog){
          battlePresentationQueueState33000.terminalWatchdog=setTimeout(()=>hardSettleBattlePresentationQueue33000("terminal_presentation_watchdog"),12000);
        }
        return{success:true,presentationDeferred:true,overlay:target,semanticBattleAlreadyCommitted:true};
      }
      return PRIOR_OPEN_OVERLAY_33000.apply(this,arguments);
    };
    globalThis.openOverlay=wrappedOpenOverlay33000;try{openOverlay=wrappedOpenOverlay33000;}catch(_error){}
  }

  function suspendCallerStoryPresentation33000(){
    try{
      const battle=typeof currentBattle!=="undefined"?currentBattle:null;
      const rc=battle&&battle.returnContext||null;
      if(!battle||!rc||rc.type!=="story_scene")return{success:true,suspended:false};
      if(typeof globalThis.markStoryPresentationHidden33900!=="function")return{success:false,suspended:false,reason:"story_presentation_hide_hook_missing"};
      const hidden=globalThis.markStoryPresentationHidden33900("caller_owned_battle");
      return{success:hidden===true,suspended:hidden===true};
    }catch(error){
      return{success:false,suspended:false,reason:"story_presentation_suspend_exception",error:String(error&&error.message||error)};
    }
  }
  window.suspendCallerStoryPresentation33000=suspendCallerStoryPresentation33000;

  function enhanceBattle2DOM33000(container){
    if(typeof document==="undefined")return false;
    const stage=(container&&container.querySelector&&container.querySelector(".alpha-code-battle-stage"))||document.querySelector(".alpha-code-battle-stage");
    if(!stage)return false;
    stage.classList.add("battle2-modern");
    suspendCallerStoryPresentation33000();
    enhanceBattleSkillCards33000(stage);
    installBattleTicker33000(stage);
    installBattleInteractionHint33000(stage);
    installFormationStage33000(stage);
    installBattlePerformance33000(stage);
    clearBattleSkillPreview33000();
    return true;
  }
  window.enhanceBattle2DOM33000=enhanceBattle2DOM33000;

  const priorRenderCombatOverlay33000=renderCombatOverlay;
  const renderCombatOverlayModern33000=function renderCombatOverlayModern33000(container){
    const result=priorRenderCombatOverlay33000.apply(this,arguments);
    suspendCallerStoryPresentation33000();
    enhanceBattle2DOM33000(container);
    return result;
  };
  renderCombatOverlay=renderCombatOverlayModern33000;

  if(typeof document!=="undefined"&&!document.getElementById("alpha-battle-modern-33000-style")){
    const style=document.createElement("style");
    style.id="alpha-battle-modern-33000-style";
    style.textContent=`
      .alpha-code-battle-stage.battle2-modern{background:radial-gradient(circle at 50% 25%,rgba(41,103,119,.20),transparent 27%),radial-gradient(circle at 18% 36%,rgba(40,188,204,.08),transparent 24%),radial-gradient(circle at 82% 36%,rgba(218,77,55,.08),transparent 24%),linear-gradient(180deg,#07121a 0%,#03080d 58%,#05080c 100%)!important}
      .alpha-code-battle-stage.battle2-modern[data-battle-environment="forest_clearing_day"]{background-image:linear-gradient(180deg,rgba(1,8,9,.20),rgba(1,8,9,.48)),url("Scene backdrops/forest_clearing_day.png")!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card{border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card-image{object-fit:contain!important;object-position:center bottom!important;background:transparent!important;filter:drop-shadow(0 18px 18px rgba(0,0,0,.58))!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.battle2-formation-support{background:transparent!important;border:0!important;box-shadow:none!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.battle2-formation-reserve{opacity:.48!important;transform:scale(.84)!important}
      .battle2-modern[data-presentation-queue-busy="true"] .battle-live-action-family-row,
      .battle2-modern[data-presentation-queue-busy="true"] .battle-live-skill-deck,
      .battle2-modern[data-presentation-queue-busy="true"] .battle-live-pouch{pointer-events:none!important;opacity:.38!important}
      .battle2-performance-relay{display:flex;justify-content:center;gap:6px;margin-top:4px;font-size:clamp(6px,.45vw,8px);letter-spacing:.07em}.battle2-performance-relay span:first-child{color:#f0c568;font-weight:800}.battle2-performance-relay span{color:#d6e2e3}

      .alpha-code-battle-stage.battle2-modern::before{inset:1%!important;border-color:rgba(196,159,76,.16)!important;background:linear-gradient(90deg,rgba(52,217,231,.025),transparent 33%,transparent 67%,rgba(235,78,58,.025))!important}
      .battle2-modern .battle-code-header{left:3%!important;right:3%!important;top:1.5%!important;height:8%!important;border-bottom-color:rgba(199,163,77,.22)!important}
      .battle2-modern .battle-live-active-card{top:11.5%!important;width:27%!important;height:36%!important;border-radius:3px!important;box-shadow:0 20px 38px rgba(0,0,0,.48)!important}
      .battle2-modern .battle-live-active-card-player{left:17%!important}.battle2-modern .battle-live-active-card-enemy{left:56%!important}
      .battle2-modern .battle-live-active-card-heading{font-size:clamp(9px,.78vw,13px)!important;letter-spacing:.08em!important}.battle2-modern .battle-live-active-nameplate{font-size:clamp(13px,1.25vw,20px)!important;text-shadow:0 2px 5px #000!important}
      .battle2-modern .battle-code-vs{top:24%!important;opacity:.35!important;font-size:clamp(18px,2vw,34px)!important}
      .battle2-modern .battle-live-power{top:47.5%!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important}
      .battle2-modern .battle-live-power-player{left:17%!important}.battle2-modern .battle-live-power-enemy{left:56%!important}
      .battle2-modern .alpha-battle-pl-ring{filter:drop-shadow(0 10px 12px rgba(0,0,0,.35))}
      .battle2-modern .battle-live-roster-slot{opacity:.72!important;transition:opacity .16s ease,border-color .16s ease,transform .16s ease!important}.battle2-modern .battle-live-roster-slot:hover{opacity:1!important;transform:translateY(-1px)}
      .battle2-modern .battle-live-action-family-row{left:3.4%!important;top:60.5%!important;width:93.2%!important;height:5.5%!important;display:flex!important;justify-content:flex-start!important;gap:6px!important;padding-left:0!important;border-bottom-color:rgba(185,151,72,.18)!important}
      .battle2-modern .battle-live-action-family-row button{min-width:150px!important;max-width:200px!important;border-radius:2px!important;letter-spacing:.08em!important}
      .battle2-modern .battle-live-skill-deck,.battle2-modern .battle-live-pouch{left:3.4%!important;top:68%!important;width:59%!important;height:25%!important;gap:8px!important}
      .battle2-modern .battle-dev-skill-card{position:relative!important;padding:12px 10px 10px!important;border-radius:3px!important;background:linear-gradient(155deg,rgba(7,20,27,.96),rgba(4,10,15,.98))!important;border:1px solid rgba(85,120,133,.34)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.025)!important;text-align:left!important;transition:transform .13s ease,border-color .13s ease,box-shadow .13s ease,background .13s ease!important}
      .battle2-modern .battle-dev-skill-card.is-ready:hover,.battle2-modern .battle-dev-skill-card.is-ready:focus-visible{transform:translateY(-3px)!important;border-color:rgba(77,219,231,.78)!important;background:linear-gradient(155deg,rgba(9,35,43,.98),rgba(4,14,20,.98))!important;box-shadow:0 10px 28px rgba(0,0,0,.36),0 0 18px rgba(53,206,219,.10)!important;outline:none!important}
      .battle2-modern .battle-dev-skill-card.is-selected{border-color:rgba(230,190,88,.64)!important;box-shadow:inset 0 -2px 0 rgba(230,190,88,.58)!important}
      .battle2-modern .battle-dev-skill-card .battle-dev-skill-discipline{color:#50d8e3!important;font-size:clamp(7px,.54vw,9px)!important;letter-spacing:.1em!important}.battle2-modern .battle-dev-skill-card strong{font-size:clamp(10px,.78vw,13px)!important;line-height:1.18!important;margin-top:8px!important}.battle2-modern .battle-dev-skill-card .battle-dev-skill-type{opacity:.58!important;font-size:clamp(7px,.49vw,8px)!important}.battle2-modern .battle-dev-skill-card small{bottom:8px!important;color:#71848c!important}
      .battle2-card-meta{display:flex!important;gap:5px!important;flex-wrap:wrap!important;margin-top:9px!important}.battle2-card-meta b,.battle2-card-meta em{font-style:normal!important;border:1px solid rgba(255,255,255,.10)!important;background:rgba(255,255,255,.025)!important;padding:3px 5px!important;color:#a8b8bd!important;font-size:clamp(6px,.44vw,7px)!important;letter-spacing:.07em!important}.battle2-card-meta em{color:#e1bf68!important;border-color:rgba(205,166,70,.22)!important}
      .battle2-modern .battle-live-skill-details{left:64%!important;top:68%!important;width:32.6%!important;height:25%!important;padding:14px 16px!important;border:1px solid rgba(91,121,134,.28)!important;background:linear-gradient(155deg,rgba(5,14,20,.96),rgba(3,8,12,.98))!important;overflow-x:hidden!important;overflow-y:scroll!important;scrollbar-gutter:stable!important;overscroll-behavior:contain!important;scrollbar-width:thin!important;scrollbar-color:rgba(87,214,225,.72) rgba(10,26,34,.72)!important}.battle2-modern .battle-live-skill-details::-webkit-scrollbar{width:9px}.battle2-modern .battle-live-skill-details::-webkit-scrollbar-track{background:rgba(10,26,34,.72);border-left:1px solid rgba(255,255,255,.05)}.battle2-modern .battle-live-skill-details::-webkit-scrollbar-thumb{background:rgba(87,214,225,.66);border:2px solid rgba(10,26,34,.82);border-radius:999px}.battle2-modern .battle-live-skill-details[data-battle2-scrollable="true"]{box-shadow:inset 0 -14px 18px -18px rgba(93,223,232,.72)!important}.battle2-modern .battle-live-skill-details[data-battle2-scrollable="true"] .battle2-inspector-head::after{content:"SCROLL ↓";margin-left:auto;color:#72dce5;font-size:clamp(6px,.43vw,7px);letter-spacing:.09em;white-space:nowrap}.battle2-modern .battle-live-skill-details:focus-visible{outline:1px solid rgba(93,220,231,.72)!important;outline-offset:-2px!important}
      .battle2-inspector-head{display:flex;align-items:center;justify-content:space-between;gap:10px;color:#d8b65d;font-size:clamp(7px,.48vw,8px);font-weight:900;letter-spacing:.12em}.battle2-inspector-head b{color:#5dd9e3;font-size:inherit}.battle2-inspector h2{margin:9px 0 7px;color:#f0e2c1;font:900 clamp(16px,1.45vw,23px)/1.05 Georgia,serif}.battle2-badges{display:flex;flex-wrap:wrap;gap:5px}.battle2-badges span{padding:3px 6px;border:1px solid rgba(83,142,154,.28);background:rgba(30,89,100,.09);color:#75dbe2;font-size:clamp(6px,.45vw,8px);font-weight:800;letter-spacing:.08em}.battle2-summary{margin:10px 0 5px!important;color:#dce4e1!important;font-size:clamp(10px,.70vw,12px)!important;font-weight:700!important;line-height:1.42!important}.battle2-inspector ul{margin:5px 0 8px;padding-left:17px;color:#96a8ae;font-size:clamp(8px,.58vw,10px);line-height:1.48}.battle2-target{display:flex;justify-content:space-between;gap:12px;border-top:1px solid rgba(255,255,255,.07);padding-top:7px;color:#60757e;font-size:8px;letter-spacing:.09em}.battle2-target strong{color:#d4c49c}.battle2-mode-block{margin-top:9px;padding-top:8px;border-top:1px solid rgba(210,171,75,.16)}.battle2-mode-block>span{color:#e1bb58;font-size:8px;font-weight:900;letter-spacing:.1em}.battle2-mode-block>div{display:flex;gap:6px;margin-top:6px;flex-wrap:wrap}.battle2-mode-block button{min-height:29px;border:1px solid rgba(67,207,218,.4);background:rgba(13,53,61,.36);color:#79e0e7;font-size:8px;font-weight:800;cursor:pointer}.battle2-inspector-empty span{color:#d8b65d;font-size:8px;font-weight:900;letter-spacing:.13em}.battle2-inspector-empty h2{margin:10px 0;color:#f0e1bd;font:900 clamp(17px,1.4vw,23px)/1 Georgia,serif}.battle2-inspector-empty p{color:#a6b3b5;font-size:clamp(9px,.66vw,11px);line-height:1.5}.battle2-inspector-empty div{margin-top:12px;color:#607780;font-size:8px;letter-spacing:.08em}.battle2-inspector-empty b{color:#61dce5}
      .battle2-live-ticker{position:absolute;left:39%;top:49%;width:22%;min-height:8%;z-index:30;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center;padding:9px 11px;border:1px solid rgba(97,125,137,.25);background:linear-gradient(155deg,rgba(3,10,15,.95),rgba(5,15,20,.91));box-shadow:0 10px 28px rgba(0,0,0,.38)}.battle2-ticker-copy span{display:block;color:#d2ae52;font-size:clamp(6px,.45vw,8px);font-weight:900;letter-spacing:.12em}.battle2-ticker-copy strong{display:block;margin-top:4px;color:#c8d6d8;font-size:clamp(8px,.58vw,10px);line-height:1.35;font-weight:600}.battle2-log-toggle{border:1px solid rgba(75,205,217,.28);background:rgba(10,42,49,.32);color:#71dbe3;padding:6px 8px;font-size:7px;font-weight:900;letter-spacing:.07em;cursor:pointer}.battle2-status-chips{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:5px}.battle2-status-chips span{border:1px solid rgba(196,107,223,.32);background:rgba(88,31,108,.16);color:#dc94f0;padding:3px 6px;font-size:7px;font-weight:800;letter-spacing:.06em}
      .battle2-modern .battle-runtime-log{display:none!important;position:absolute!important;left:35%!important;top:13%!important;width:30%!important;height:43%!important;z-index:80!important;padding:16px!important;background:rgba(2,8,12,.985)!important;border:1px solid rgba(213,173,75,.42)!important;box-shadow:0 25px 70px rgba(0,0,0,.68)!important}.battle2-modern.battle2-log-open .battle-runtime-log{display:block!important}.battle2-modern.battle2-log-open .battle2-live-ticker{opacity:.20}.battle2-modern .battle-runtime-log-line{font-size:clamp(9px,.64vw,11px)!important;line-height:1.46!important;padding:7px 0!important}.battle2-modern .battle-runtime-panel-title{font-size:clamp(10px,.74vw,12px)!important;color:#e1bb5c!important}
      .battle2-action-hint{position:absolute;right:3.6%;top:61.3%;z-index:25;display:flex;gap:6px;align-items:center;color:#667a83;font-size:7px;letter-spacing:.08em}.battle2-action-hint b{color:#61dce5}.battle2-action-hint i{font-style:normal;color:#a98a45}
      .battle2-performance-host{position:absolute;left:43%;right:43%;top:2.1%;height:6.8%;z-index:36;pointer-events:none;overflow:visible}
      .battle2-performance-stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;isolation:isolate;transition:opacity .12s ease,transform .12s ease}
      .battle2-performance-center{width:100%;box-sizing:border-box;display:flex;min-height:34px;flex-direction:column;align-items:center;justify-content:center;padding:3px 7px;border-top:1px solid rgba(217,176,77,.30);border-bottom:1px solid rgba(217,176,77,.30);background:linear-gradient(90deg,transparent,rgba(2,8,12,.36) 18%,rgba(2,8,12,.42) 82%,transparent);text-align:center;text-shadow:0 2px 4px rgba(0,0,0,.9)}
      .battle2-performance-center small{color:#5fd9e2;font-size:5px;font-weight:900;letter-spacing:.07em;line-height:1.1}.battle2-performance-center strong{margin-top:2px;color:#f0e4ca;font:900 clamp(9px,.72vw,12px)/1.02 Georgia,serif}
      .battle2-modern.battle2-performance-active .battle-live-status{opacity:0!important}
      .battle2-performance-stage.is-playing .battle2-performance-center{animation:battle2ActionLabel33000 .30s ease both}
      .battle2-performance-stage.is-settled{opacity:0;transform:translateY(-4px)}
      .battle2-modern.battle2-performance-active .battle-live-active-card{transition:filter .14s ease,opacity .14s ease!important;will-change:transform,filter,opacity}
      .battle2-modern.battle2-performance-active .battle-live-active-card:not(.battle2-performance-role-actor):not(.battle2-performance-role-target){opacity:.48!important;filter:saturate(.55) brightness(.68)!important}
      .battle2-modern.battle2-performance-active .battle2-performance-role-actor{z-index:28!important;filter:saturate(1.08) brightness(1.08) drop-shadow(0 22px 34px rgba(0,0,0,.56))!important}
      .battle2-modern.battle2-performance-active .battle2-performance-role-target{z-index:27!important;filter:saturate(.92) brightness(.94) drop-shadow(0 20px 30px rgba(0,0,0,.52))!important}
      .battle2-modern .battle-live-active-card-player.battle2-performance-role-actor{--battle2-performance-strike-x:12%;--battle2-performance-impact-x:-7%;--battle2-performance-evade-x:-10%}
      .battle2-modern .battle-live-active-card-enemy.battle2-performance-role-actor{--battle2-performance-strike-x:-12%;--battle2-performance-impact-x:7%;--battle2-performance-evade-x:10%}
      .battle2-modern .battle-live-active-card-player.battle2-performance-role-target{--battle2-performance-impact-x:-7%;--battle2-performance-evade-x:-10%}
      .battle2-modern .battle-live-active-card-enemy.battle2-performance-role-target{--battle2-performance-impact-x:7%;--battle2-performance-evade-x:10%}
      .battle2-modern .battle-live-roster-player .battle2-performance-role-actor,.battle2-modern .battle-live-roster-player .battle2-performance-role-target{--battle2-performance-strike-x:12%;--battle2-performance-impact-x:-7%;--battle2-performance-evade-x:-10%}
      .battle2-modern .battle-live-roster-enemy .battle2-performance-role-actor,.battle2-modern .battle-live-roster-enemy .battle2-performance-role-target{--battle2-performance-strike-x:-12%;--battle2-performance-impact-x:7%;--battle2-performance-evade-x:10%}
      .battle2-modern .battle-live-roster-slot.battle2-performance-role-actor,.battle2-modern .battle-live-roster-slot.battle2-performance-role-target{overflow:visible!important;z-index:29!important;opacity:1!important;filter:saturate(1.03) brightness(1.04)!important}
      .battle2-modern .battle-live-roster-slot .battle2-performance-result-chip{top:-10%;min-width:92px;max-width:150%;right:-5%}
      .battle2-modern .battle-live-roster-player .battle-live-roster-slot .battle2-performance-result-chip{left:-5%;right:auto}
      .battle2-performance-result-chip{position:absolute;right:4%;top:5%;z-index:42;min-width:108px;max-width:48%;display:flex;flex-direction:column;align-items:flex-end;gap:2px;padding:6px 7px;border-right:2px solid rgba(224,183,78,.82);background:linear-gradient(90deg,transparent,rgba(3,9,13,.78));text-align:right;opacity:0;transform:translateY(-5px)}
      .battle2-performance-result-chip b{color:#e4b956;font-size:clamp(9px,.75vw,12px);letter-spacing:.12em}.battle2-performance-result-chip em{color:#d7e1df;font-style:normal;font-size:8px;font-weight:900}.battle2-performance-result-chip span{color:#8ea0a5;font-size:7px;font-weight:800;letter-spacing:.04em}
      .battle-live-active-card-player .battle2-performance-result-chip{left:4%;right:auto;align-items:flex-start;border-left:2px solid rgba(224,183,78,.82);border-right:0;background:linear-gradient(90deg,rgba(3,9,13,.78),transparent);text-align:left}
      .battle2-modern.battle2-performance-active .battle2-performance-result-chip{animation:battle2ResultReceipt33000 .36s .42s ease both}
      .battle2-modern.battle2-performance-active[data-battle2-performance-class="PHYSICAL_STRIKE"] .battle2-performance-role-actor,.battle2-modern.battle2-performance-active[data-battle2-performance-class="HEAVY_STRIKE"] .battle2-performance-role-actor{animation:battle2ActorStrike33000 .42s .10s cubic-bezier(.3,.75,.2,1) both}
      .battle2-modern.battle2-performance-active[data-battle2-performance-class="PROJECTILE"] .battle2-performance-role-actor,.battle2-modern.battle2-performance-active[data-battle2-performance-class="CHAKRA_RANGED"] .battle2-performance-role-actor{animation:battle2ActorCast33000 .42s .10s ease both}
      .battle2-modern.battle2-performance-active[data-battle2-performance-result="HIT"] .battle2-performance-role-target,.battle2-modern.battle2-performance-active[data-battle2-performance-result="GUARD"] .battle2-performance-role-target{animation:battle2TargetImpact33000 .38s .28s ease both}
      .battle2-modern.battle2-performance-active[data-battle2-performance-result="SUBSTITUTION"] .battle2-performance-role-target{animation:battle2Substitution33000 .48s .24s ease both}
      .battle2-modern.battle2-performance-active[data-battle2-performance-result="DEFEAT"] .battle2-performance-role-target{animation:battle2Defeat33000 .56s .28s ease both}
      .battle2-modern.battle2-performance-active[data-battle2-performance-result="EVADE"] .battle2-performance-role-target,.battle2-modern.battle2-performance-active[data-battle2-performance-result="MISS"] .battle2-performance-role-target{animation:battle2Evade33000 .38s .26s ease both}
      @keyframes battle2ActionLabel33000{0%{opacity:0;transform:translateY(-5px)}100%{opacity:1;transform:translateY(0)}}
      @keyframes battle2ResultReceipt33000{0%{opacity:0;transform:translateY(-5px)}100%{opacity:1;transform:translateY(0)}}
      @keyframes battle2ActorStrike33000{0%{transform:translate3d(0,0,0);filter:none}52%{transform:translate3d(var(--battle2-performance-strike-x,12%),0,0);filter:brightness(1.08)}100%{transform:translate3d(0,0,0);filter:none}}
      @keyframes battle2ActorCast33000{0%{transform:translate3d(0,0,0) scale(1);filter:none}48%{transform:translate3d(0,-1.4%,0) scale(1.025);filter:brightness(1.18)}100%{transform:translate3d(0,0,0) scale(1);filter:none}}
      @keyframes battle2TargetImpact33000{0%{transform:translate3d(0,0,0);filter:none}42%{transform:translate3d(var(--battle2-performance-impact-x,7%),0,0);filter:brightness(1.1)}100%{transform:translate3d(0,0,0);filter:none}}
      @keyframes battle2Substitution33000{0%{opacity:1;transform:translate3d(0,0,0)}42%{opacity:.16;filter:brightness(1.28);transform:translate3d(var(--battle2-performance-evade-x,10%),0,0)}100%{opacity:1;filter:none;transform:translate3d(0,0,0)}}
      @keyframes battle2Defeat33000{0%{opacity:1;transform:translate3d(0,0,0)}72%{opacity:.42;transform:translate3d(0,13%,0);filter:saturate(.4) brightness(.58)}100%{opacity:.68;transform:translate3d(0,9%,0);filter:saturate(.58) brightness(.68)}}
      @keyframes battle2Evade33000{0%{transform:translate3d(0,0,0)}50%{transform:translate3d(var(--battle2-performance-evade-x,10%),0,0)}100%{transform:translate3d(0,0,0)}}
      @media(prefers-reduced-motion:reduce){.battle2-modern.battle2-performance-active .battle2-performance-role-actor,.battle2-modern.battle2-performance-active .battle2-performance-role-target{animation:none!important}.battle2-modern.battle2-performance-active .battle2-performance-result-chip{animation:battle2ReducedReceipt33000 .16s ease both}.battle2-performance-stage.is-playing .battle2-performance-center{animation:battle2ReducedReceipt33000 .16s ease both}@keyframes battle2ReducedReceipt33000{from{opacity:.72}to{opacity:1}}}
      @media(max-width:1100px){.battle2-modern .battle-live-skill-deck,.battle2-modern .battle-live-pouch{width:61%!important}.battle2-modern .battle-live-skill-details{left:65.5%!important;width:31%!important}.battle2-live-ticker{left:37%!important;width:26%!important}.battle2-action-hint{display:none}}

      /* Formation Stage — environment + people dominate; controls stay subordinate. */
      .battle2-modern[data-formation-stage="true"]{background-size:cover!important;background-position:center!important}
      .battle2-modern[data-formation-stage="true"]::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse at 50% 40%,transparent 18%,rgba(1,6,10,.10) 60%,rgba(1,5,8,.38) 100%),linear-gradient(180deg,rgba(1,5,9,.04),rgba(1,5,9,.02) 55%,rgba(1,5,9,.52) 100%)}
      .battle2-modern[data-formation-stage="true"] .battle-live-location,.battle2-modern[data-formation-stage="true"] .battle-live-status,.battle2-modern[data-formation-stage="true"] .battle-live-active-card,.battle2-modern[data-formation-stage="true"] .battle-live-roster,.battle2-modern[data-formation-stage="true"] .battle-live-power,.battle2-modern[data-formation-stage="true"] .battle-live-action-family-row,.battle2-modern[data-formation-stage="true"] .battle-live-skill-deck,.battle2-modern[data-formation-stage="true"] .battle-live-skill-details,.battle2-modern[data-formation-stage="true"] .battle-live-pouch,.battle2-modern[data-formation-stage="true"] .battle-live-summon,.battle2-modern[data-formation-stage="true"] .battle2-live-ticker,.battle2-modern[data-formation-stage="true"] .battle2-performance-host,.battle2-modern[data-formation-stage="true"] .battle2-formation-withdraw{z-index:12!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-status{top:7.1%!important;width:22%!important;opacity:.78}
      .battle2-modern[data-formation-stage="true"] .battle-live-status strong{font-size:clamp(7px,.66vw,10px)!important}.battle2-modern[data-formation-stage="true"] .battle-live-status span{font-size:clamp(6px,.5vw,8px)!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card{border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important;transition:left .32s cubic-bezier(.2,.75,.25,1),top .32s cubic-bezier(.2,.75,.25,1),width .32s ease,height .32s ease,filter .18s ease,opacity .18s ease,transform .32s ease!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card::before,.battle2-modern[data-formation-stage="true"] .battle-live-active-card::after{display:none!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card-image{width:100%!important;height:100%!important;object-fit:contain!important;object-position:center bottom!important;filter:drop-shadow(0 24px 24px rgba(0,0,0,.62))!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card-heading{top:2%!important;left:6%!important;right:auto!important;padding:4px 7px!important;border-radius:999px!important;background:rgba(2,10,15,.70)!important;color:#78dfe7!important;font-size:clamp(6px,.46vw,8px)!important;letter-spacing:.11em!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card-enemy .battle-live-active-card-heading{color:#efb099!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-nameplate{left:8%!important;right:8%!important;bottom:1%!important;padding:6px 9px!important;border:1px solid rgba(205,168,76,.34)!important;border-radius:9px!important;background:rgba(2,8,12,.82)!important;font-size:clamp(9px,.78vw,13px)!important;text-align:center!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster{z-index:11!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-slot[data-formation-hidden="true"]{display:none!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.battle2-formation-support{display:block!important;width:12.5%!important;height:20%!important;left:auto!important;top:auto!important;border:0!important;border-radius:10px!important;background:linear-gradient(180deg,rgba(2,10,15,.12),rgba(2,8,12,.70))!important;overflow:visible!important;opacity:.66!important;filter:saturate(.72) brightness(.78);transition:left .32s ease,right .32s ease,top .32s ease,width .32s ease,height .32s ease,opacity .18s ease,filter .18s ease,transform .32s ease!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.battle2-formation-support .battle-live-queue-label{display:none!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.battle2-formation-support .battle-live-roster-portrait{left:0!important;top:0!important;width:100%!important;height:76%!important;object-fit:contain!important;object-position:center bottom!important;background:transparent!important;filter:drop-shadow(0 14px 15px rgba(0,0,0,.52))!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.battle2-formation-support .battle-live-roster-copy{left:3%!important;right:3%!important;top:auto!important;bottom:0!important;height:26%!important;padding:4px!important;border-radius:7px!important;background:rgba(2,8,12,.82)!important;text-align:center!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.battle2-formation-support .battle-live-roster-name{font-size:clamp(6px,.5vw,8px)!important}.battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.battle2-formation-support .battle-live-roster-power{margin-top:2px!important;font-size:clamp(5px,.42vw,7px)!important}
      .battle2-modern[data-formation-stage="true"] .battle2-formation-focus{opacity:1!important;filter:saturate(1.03) brightness(1.03) drop-shadow(0 22px 28px rgba(0,0,0,.42))!important}
      .battle2-modern[data-formation-stage="true"] .battle2-formation-recessed{opacity:.48!important;filter:saturate(.55) brightness(.64)!important;transform:scale(.88)!important}
      .battle2-modern[data-formation-stage="true"] .battle2-formation-selected-target{outline:1px solid rgba(96,221,230,.82)!important;outline-offset:4px!important;box-shadow:0 0 26px rgba(73,213,225,.18)!important}
      /* Shared repeat-Skill UX may reselect the current target after an action.
         Preserve target semantics without leaving a card-like cyan frame on the active opposition. */
      .battle2-modern[data-formation-stage="true"] .battle2-formation-selected-target{outline:none!important;outline-offset:0!important;box-shadow:none!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.is-skill-target,.battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.is-item-target{pointer-events:auto!important;cursor:pointer!important}

      /* Duel: two combatants own the battlefield. No fake support furniture. */
      .battle2-modern[data-formation-mode="duel"] .battle-live-active-card{top:9.5%!important;width:33.5%!important;height:56%!important}
      .battle2-modern[data-formation-mode="duel"] .battle-live-active-card-player{left:8.5%!important}.battle2-modern[data-formation-mode="duel"] .battle-live-active-card-enemy{left:58%!important}
      .battle2-modern[data-formation-mode="duel"] .battle-live-power{top:42.5%!important}.battle2-modern[data-formation-mode="duel"] .battle-live-power-player{left:41.5%!important}.battle2-modern[data-formation-mode="duel"] .battle-live-power-enemy{left:58.5%!important;right:auto!important}
      .battle2-modern[data-formation-mode="duel"] .battle-code-vs{top:28.5%!important;opacity:.55!important;font-size:clamp(22px,2.8vw,42px)!important;letter-spacing:.1em!important;filter:drop-shadow(0 8px 14px rgba(0,0,0,.55))}

      /* Squad wedge: support stays visibly behind/outward from the confrontation lane. */
      .battle2-modern[data-formation-mode="wedge"] .battle-live-active-card{top:13%!important;width:24%!important;height:45%!important}
      .battle2-modern[data-formation-mode="wedge"] .battle-live-active-card-player{left:24%!important}.battle2-modern[data-formation-mode="wedge"] .battle-live-active-card-enemy{left:52%!important}
      .battle2-modern[data-formation-mode="wedge"] .battle-live-roster-player [data-formation-slot="2"]{left:3%!important;top:16%!important}.battle2-modern[data-formation-mode="wedge"] .battle-live-roster-player [data-formation-slot="3"]{left:8%!important;top:32%!important}.battle2-modern[data-formation-mode="wedge"] .battle-live-roster-player [data-formation-slot="4"]{left:14%!important;top:45%!important}
      .battle2-modern[data-formation-mode="wedge"] .battle-live-roster-enemy [data-formation-slot="2"]{right:3%!important;top:16%!important}.battle2-modern[data-formation-mode="wedge"] .battle-live-roster-enemy [data-formation-slot="3"]{right:8%!important;top:32%!important}.battle2-modern[data-formation-mode="wedge"] .battle-live-roster-enemy [data-formation-slot="4"]{right:14%!important;top:45%!important}
      .battle2-modern[data-formation-mode="wedge"] .battle-live-power{top:53%!important}.battle2-modern[data-formation-mode="wedge"] .battle-live-power-player{left:37%!important}.battle2-modern[data-formation-mode="wedge"] .battle-live-power-enemy{left:63%!important;right:auto!important}

      /* Wide arc: crowded fallback keeps exact focus central without stacking everybody there. */
      .battle2-modern[data-formation-mode="arc"] .battle-live-active-card{top:14%!important;width:21%!important;height:42%!important}
      .battle2-modern[data-formation-mode="arc"] .battle-live-active-card-player{left:27%!important}.battle2-modern[data-formation-mode="arc"] .battle-live-active-card-enemy{left:52%!important}
      .battle2-modern[data-formation-mode="arc"] .battle-live-roster-player [data-formation-slot="2"]{left:2%!important;top:14%!important}.battle2-modern[data-formation-mode="arc"] .battle-live-roster-player [data-formation-slot="3"]{left:5%!important;top:34%!important}.battle2-modern[data-formation-mode="arc"] .battle-live-roster-player [data-formation-slot="4"]{left:13%!important;top:49%!important}
      .battle2-modern[data-formation-mode="arc"] .battle-live-roster-enemy [data-formation-slot="2"]{right:2%!important;top:14%!important}.battle2-modern[data-formation-mode="arc"] .battle-live-roster-enemy [data-formation-slot="3"]{right:5%!important;top:34%!important}.battle2-modern[data-formation-mode="arc"] .battle-live-roster-enemy [data-formation-slot="4"]{right:13%!important;top:49%!important}

      /* Any exact off-slot target can advance into confrontation focus without changing legality. */
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-player .battle2-formation-focus{left:24%!important;right:auto!important;top:13%!important;width:24%!important;height:45%!important;z-index:26!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-enemy .battle2-formation-focus{left:52%!important;right:auto!important;top:13%!important;width:24%!important;height:45%!important;z-index:26!important}

      /* Locked primary dock + bounded secondary tray. */
      .battle2-modern[data-formation-stage="true"] .battle-live-action-family-row{left:50%!important;right:auto!important;top:auto!important;bottom:1.8%!important;width:min(44%,620px)!important;height:5.7%!important;transform:translateX(-50%)!important;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:7px!important;padding:5px!important;border:1px solid rgba(204,168,78,.28)!important;border-radius:13px!important;background:rgba(3,10,15,.88)!important;backdrop-filter:blur(9px)!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-action-family-row button{min-width:0!important;max-width:none!important;height:100%!important;border-radius:9px!important;background:rgba(7,22,29,.88)!important;border:1px solid rgba(91,134,146,.30)!important;color:#cad7d9!important;font-size:clamp(7px,.56vw,9px)!important;font-weight:900!important;letter-spacing:.1em!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-action-family-row button.is-selected{border-color:rgba(88,216,226,.72)!important;color:#76dfe7!important;background:rgba(11,49,57,.92)!important;box-shadow:0 0 18px rgba(70,210,221,.10)!important}
      .battle2-modern[data-formation-stage="true"] .battle2-formation-withdraw{position:absolute;right:3%!important;top:3%!important;z-index:30!important;padding:5px 9px;border:1px solid rgba(197,158,71,.27);border-radius:8px;background:rgba(4,11,15,.66);color:#bba56e;font-size:7px;font-weight:900;letter-spacing:.09em;cursor:pointer}
      .battle2-modern[data-formation-stage="true"] .battle2-formation-withdraw:disabled{opacity:.28;cursor:not-allowed}
      .battle2-modern[data-formation-stage="true"][data-formation-tray="closed"] .battle-live-skill-deck,.battle2-modern[data-formation-stage="true"][data-formation-tray="closed"] .battle-live-skill-details,.battle2-modern[data-formation-stage="true"][data-formation-tray="closed"] .battle-live-pouch,.battle2-modern[data-formation-stage="true"][data-formation-tray="closed"] .battle-live-summon{display:none!important}
      .battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-skill-deck,.battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-pouch,.battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-summon{left:10%!important;top:auto!important;bottom:8.7%!important;width:61%!important;height:22%!important;padding:10px!important;border:1px solid rgba(91,132,144,.32)!important;border-radius:14px!important;background:linear-gradient(160deg,rgba(3,13,18,.96),rgba(2,8,12,.98))!important;box-shadow:0 20px 50px rgba(0,0,0,.46)!important;overflow:auto!important}
      .battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-skill-details{left:72%!important;top:auto!important;bottom:8.7%!important;width:18%!important;height:22%!important;border-radius:14px!important;padding:10px 11px!important}
      .battle2-modern[data-formation-stage="true"] .battle2-live-ticker{left:38%!important;top:8.4%!important;width:24%!important;min-height:5.5%!important;padding:6px 9px!important;background:rgba(3,10,15,.72)!important;border-color:rgba(97,125,137,.18)!important}
      .battle2-modern[data-formation-stage="true"] .battle2-action-hint{right:3%!important;top:auto!important;bottom:2.4%!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-host{top:2.1%!important}

      /* Golden stabilization — stable cards, clean identity hierarchy, one aligned confrontation lane. */
      .battle2-modern[data-formation-stage="true"] .battle-live-status{display:none!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card-player .battle-live-active-nameplate{display:none!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-player .battle-live-roster-name{display:none!important}
      /* Final Kakashi Golden / Formation Stage motion policy:
         participant cards and combat feedback never tween, lunge, recoil or fade. */
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card,
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.battle2-formation-support{
        transition:none!important;animation:none!important;will-change:auto!important
      }
      @keyframes menma373RelayPlayer{from{transform:translateX(-24%) scale(.72);opacity:.42}to{transform:translateX(0) scale(1);opacity:1}}
      @keyframes menma373RelayEnemy{from{transform:translateX(24%) scale(.72);opacity:.42}to{transform:translateX(0) scale(1);opacity:1}}
      .battle2-modern[data-evolved-pl-proof="menma_three_subjects"] .battle-live-active-card-player.battle2-formation-relay-in{
        animation:menma373RelayPlayer .52s cubic-bezier(.2,.75,.2,1) both!important
      }
      .battle2-modern[data-evolved-pl-proof="menma_three_subjects"] .battle-live-active-card-enemy.battle2-formation-relay-in{
        animation:menma373RelayEnemy .52s cubic-bezier(.2,.75,.2,1) both!important
      }
      .battle2-modern[data-formation-stage="true"] .battle2-formation-recessed{transform:none!important}
      .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-actor,
      .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-target,
      .battle2-modern[data-formation-stage="true"] .battle2-performance-stage.is-playing .battle2-performance-center,
      .battle2-modern[data-formation-stage="true"] .battle2-performance-result-chip{
        animation:none!important;transition:none!important;transform:none!important;will-change:auto!important
      }
      .battle2-modern[data-formation-stage="true"] .battle2-performance-stage{transition:none!important;transform:none!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-stage.is-settled{transform:none!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-host{left:43%!important;right:43%!important;top:2%!important;height:5%!important}
      .battle2-modern[data-formation-stage="true"][data-formation-mode="wedge"] .battle2-performance-host,
      .battle2-modern[data-formation-stage="true"][data-formation-mode="arc"] .battle2-performance-host{left:31%!important;right:31%!important;top:2%!important;height:5.5%!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-center{min-height:30px!important;padding:2px 8px!important;border:1px solid rgba(218,178,78,.34)!important;border-radius:7px!important;background:linear-gradient(90deg,rgba(2,8,12,.18),rgba(2,8,12,.88) 18%,rgba(2,8,12,.94) 82%,rgba(2,8,12,.18))!important;box-shadow:0 8px 18px rgba(0,0,0,.28)!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-center small{font-size:clamp(5px,.42vw,7px)!important;letter-spacing:.11em!important;color:#71dce5!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-center strong{margin-top:1px!important;font-size:clamp(10px,.80vw,13px)!important;line-height:.98!important;letter-spacing:.015em!important;color:#f3e7c9!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-target{display:block;margin-top:1px;color:#aabcc0;font-size:clamp(5px,.38vw,6px);font-weight:800;letter-spacing:.08em}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-result-chip{min-width:126px!important;padding:8px 9px!important;background:linear-gradient(90deg,transparent,rgba(3,9,13,.90))!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-result-chip b{font-size:clamp(10px,.82vw,14px)!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-result-chip em{font-size:clamp(9px,.70vw,12px)!important;color:#f0e4ca!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-result-chip span{font-size:clamp(7px,.55vw,9px)!important;color:#a8b9bc!important}

      /* Shared Battle action readability: animate rendered imagery only; never semantic state or layout ownership. */
      .battle2-modern[data-formation-stage="true"] .battle2-performance-stage.is-playing .battle2-performance-center{
        animation:battleShared385TechniqueBanner .30s cubic-bezier(.2,.75,.2,1) both!important
      }
      .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-result-chip{
        animation:battleShared385ResultReadout .38s .78s cubic-bezier(.2,.75,.2,1) both!important
      }
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card-player.battle2-performance-role-actor{--battleShared385-action-x:7%}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card-enemy.battle2-performance-role-actor{--battleShared385-action-x:-7%}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-player .battle2-performance-role-actor{--battleShared385-action-x:7%}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-enemy .battle2-performance-role-actor{--battleShared385-action-x:-7%}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card-player.battle2-performance-role-target{--battleShared385-impact-x:-3.5%}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card-enemy.battle2-performance-role-target{--battleShared385-impact-x:3.5%}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-player .battle2-performance-role-target{--battleShared385-impact-x:-3.5%}
      .battle2-modern[data-formation-stage="true"] .battle-live-roster-enemy .battle2-performance-role-target{--battleShared385-impact-x:3.5%}
      .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-actor .battle-live-active-card-image,
      .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-actor .battle-live-roster-portrait{
        animation:battleShared385ActorAction .72s .28s cubic-bezier(.2,.72,.2,1) both!important
      }
      .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-target .battle-live-active-card-image,
      .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-target .battle-live-roster-portrait{
        animation:battleShared385TargetResponse .46s .70s cubic-bezier(.2,.75,.2,1) both!important
      }
      @keyframes battleShared385TechniqueBanner{0%{opacity:0;transform:translateY(-8px) scale(.98)}100%{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes battleShared385ActorAction{0%,100%{transform:translateX(0) scale(1);filter:brightness(1)}48%{transform:translateX(var(--battleShared385-action-x,0)) scale(1.035);filter:brightness(1.12)}}
      @keyframes battleShared385TargetResponse{0%,100%{transform:translateX(0) scale(1);filter:brightness(1)}45%{transform:translateX(var(--battleShared385-impact-x,0)) scale(.975);filter:brightness(1.22)}}
      @keyframes battleShared385ResultReadout{0%{opacity:0;transform:translateY(-8px) scale(.96)}100%{opacity:1;transform:translateY(0) scale(1)}}
      @media(prefers-reduced-motion:reduce){
        .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-actor .battle-live-active-card-image,
        .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-actor .battle-live-roster-portrait,
        .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-target .battle-live-active-card-image,
        .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-target .battle-live-roster-portrait{
          animation:none!important
        }
      }

      .battle2-modern[data-formation-stage="true"] .battle2-live-ticker{left:35%!important;top:8.4%!important;width:30%!important;min-height:4.6%!important;padding:6px 10px!important}
      .battle2-modern[data-formation-stage="true"] .battle-live-active-card-heading{top:1%!important}
      .battle2-modern[data-formation-mode="duel"] .battle-live-active-card{top:12.5%!important;width:33.5%!important;height:53.5%!important}
      .battle2-modern[data-formation-mode="duel"] .battle-live-power,
      .battle2-modern[data-formation-mode="wedge"] .battle-live-power,
      .battle2-modern[data-formation-mode="arc"] .battle-live-power{top:43.5%!important}
      .battle2-modern[data-formation-mode="duel"] .battle-live-power-player,
      .battle2-modern[data-formation-mode="wedge"] .battle-live-power-player,
      .battle2-modern[data-formation-mode="arc"] .battle-live-power-player{left:43.5%!important;right:auto!important}
      .battle2-modern[data-formation-mode="duel"] .battle-live-power-enemy,
      .battle2-modern[data-formation-mode="wedge"] .battle-live-power-enemy,
      .battle2-modern[data-formation-mode="arc"] .battle-live-power-enemy{left:56.5%!important;right:auto!important}

      @media(max-width:1100px){
        .battle2-modern[data-formation-stage="true"] .battle-live-action-family-row{width:54%!important}
        .battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-skill-deck,.battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-pouch,.battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-summon{left:5%!important;width:67%!important}
        .battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-skill-details{left:73%!important;width:22%!important}
      }
    `;
    document.head.appendChild(style);
  }

  function installedBattleModernStyleText33000(){
    try{
      const node=typeof document!=="undefined"?document.getElementById("alpha-battle-modern-33000-style"):null;
      return node&&typeof node.textContent==="string"?node.textContent:"";
    }catch(_error){return"";}
  }
  function runAlphaBattleModern33000Diagnostics(){
    const source=enhanceBattle2DOM33000.toString();
    const summary=getBattleSkillYouthSummary33000.toString();
    const styleText=installedBattleModernStyleText33000();
    const checks={
      patchId:PATCH_ID==="alpha_battle_modern_33000_2026_09_23_formation_stage",
      formationUsesDeploymentTruth:String(deployedFormation33000).includes("getBattleDeploymentParticipant")&&String(deployedFormation33000).includes("slot<=6"),
      adaptiveFormationModes:String(formationMode33000).includes('"duel"')&&String(formationMode33000).includes('"wedge"')&&String(formationMode33000).includes('"arc"'),
      exactThreePrimaryFamilies:String(installFormationDock33000).includes('"SKILLS"')&&String(installFormationDock33000).includes('"ITEMS"')&&String(installFormationDock33000).includes('"SUMMONS"')&&String(installFormationDock33000).includes("primary.length===3"),
      withdrawPreservedOutsidePrimaryDock:String(installFormationDock33000).includes("battle2-formation-withdraw")&&typeof invokeBattleWithdrawAction==="function",
      contextualTargetFocus:String(selectedFormationTarget33000).includes("selectedTargetRef")&&String(formationNodeForRef33000).includes("participantId"),
      formationDoesNotWriteSemantics:String(installFormationStage33000).includes("semanticWrite:false"),
      hoverLearns:source.includes("enhanceBattleSkillCards33000")&&previewBattlePreparedSkill33000.toString().includes("battle-live-skill-details"),
      clickStillUsesExistingCommitPath:typeof activateBattlePreparedSkillCard==="function",
      youthReadingContract:YOUTH_READING_TARGET==="12-13"&&summary.includes("Deals 5 ATK to one enemy.")&&summary.includes("This Skill needs an exact player-facing description before final release.")&&summary.includes("descriptionCoverage"),
      resolverNotReplaced:!source.includes("resolveBattle")&&!source.includes("applyBattleDamage")&&!source.includes("commitBattle"),
      compactTicker:typeof toggleBattle2CombatLog33000==="function"&&latestBattleFeedText33000.toString().includes("battle-runtime-log-line"),
      fullLogStillAvailable:toggleBattle2CombatLog33000.toString().includes("battle2-log-open"),
      transientStateChips:getVisibleBattleStatuses33000.toString().includes("transientStates"),
      sharedPerformanceProjection:String(battleEvidence33000).includes("runtime.evidence"),
      exactTargetFromEvidence:String(projectBattlePerformanceCompletion33000).includes("targetRef")&&String(projectBattlePerformanceCompletion33000).includes("exactTarget"),
      resultGrammar:["HIT","MISS","EVADE","GUARD","BLOCK","SUBSTITUTION","WITHDRAWAL"].every(token=>String(resultClass33000).includes(token)),
      performanceClassVocabulary:BATTLE_PRESENTATION_CLASSES_33000.length===16,
      noResolverSemanticsInPerformance:!String(resolveBattlePerformanceProjection33000).includes("resolveBattle"+"DamagePacket")&&!String(installBattlePerformance33000).includes("recordBattle"+"Evidence"),
      battlePortraitProjection:String(portrait33000).includes("resolveUIPortraitProjection")&&String(portrait33000).includes("resolveBattleEnemyPortraitProjection"),
      performanceUsesCanonicalCombatants:String(battlePerformanceRoleNode33000).includes("battle-live-active-card-player")&&String(battlePerformanceRoleNode33000).includes("battle-live-active-card-enemy"),
      exactParticipantRoleLookup:String(battlePerformanceRoleNode33000).includes("participantId")&&String(battlePerformanceRoleNode33000).includes("getBattleDeploymentParticipant")&&String(battlePerformanceRoleNode33000).includes("data-slot"),
      performanceDoesNotDuplicatePortraits:!String(battlePerformanceMarkup33000).includes("<img"),
      resultFeedbackAttachedToExactTarget:String(applyBattlePerformanceRoles33000).includes("targetNode.appendChild(chip)")&&String(battlePerformanceResultChip33000).includes("AUTHORITATIVE STATE UPDATED"),
      damageReadoutSeparatesDamageFromBattlePL:String(battlePerformanceResultChip33000).includes("DAMAGE")&&String(battlePerformanceResultChip33000).includes("PL ${p.beforePL} → ${p.afterPL}")&&!String(battlePerformanceResultChip33000).includes("`-${p.finalDamage} PL`"),
      zeroBattlePLReadsWithdrawal:String(resultClass33000).includes('return"WITHDRAWAL"')&&String(projectBattlePerformanceCompletion33000).includes('result==="WITHDRAWAL"'),
      readableTechniqueBanner:String(battlePerformanceMarkup33000).includes("battle2-performance-target")&&styleText.includes("battleShared385TechniqueBanner")&&styleText.includes("font-size:clamp(10px,.80vw,13px)"),
      sharedBattleSystemMarker:String(installFormationStage33000).includes('battleSystem="shinobi_chronicles_shared"'),
      sharedAuthoredEnvironmentProjection:String(sharedBattleEnvironmentPath33000).includes("presentationEnvironmentPath")&&String(sharedBattleEnvironmentPath33000).includes("environmentPath")&&String(applyBattleEnvironment33000).includes('background-image')&&String(applyBattleEnvironment33000).includes("sharedBattleSystem:true"),
      menmaMarkerIsProofOnly:String(applyBattleEnvironment33000).includes("Historical proof/debug marker only")&&String(installFormationStage33000).includes("applyBattleEnvironment33000"),
      performanceSettleIsActionScoped:String(finishBattlePresentationReceipt33000).includes("active.key!==key")&&String(clearBattlePerformanceRoles33000).includes("battle2-performance-active"),
      orderedCommittedPlayback:String(syncBattlePresentationQueue33000).includes("collectBattlePerformanceProjections33000")&&String(playNextBattlePresentationReceipt33000).includes("playedKeys.add")&&String(projectBattlePerformanceCompletion33000).includes("immutableCommittedFacts:true")&&String(bindActiveBattlePresentation33000).includes("liveBattleStage33000"),
      orderedPlaybackGlobal:String(orderedPlaybackEnabled33000).includes("battleId")&&!String(orderedPlaybackEnabled33000).includes("academy_menma_origin_three_test_subjects_with_anko"),
      nullPLMetadataIsNotZero:String(finitePresentationPL33000).includes("value===null")&&String(finitePresentationPL33000).includes('value===""'),
      activeReceiptShowsCommittedAfterPL:String(presentationRemainingPL33000).includes("active_after")&&String(presentationRemainingPL33000).includes("active.afterPL"),
      partialActionRefreshRestoresRadialPL:!!PRIOR_REFRESH_ACTION_REGION_33000&&String(refreshBattleActionRegionPresentation).includes("refreshFormationPLProjection33000"),
      activeReceiptRefreshesRadialPL:String(bindActiveBattlePresentation33000).includes("refreshFormationPLProjection33000"),
      reloadDoesNotDuplicatePresentation:String(resetPresentationQueueState33000).includes("playedKeys")&&String(presentationStorageKey33000).includes("battleId"),
      terminalNavigationDeferred:!!PRIOR_OPEN_OVERLAY_33000&&!!PRIOR_RESUME_BATTLE_CALLER_33000&&String(flushDeferredTerminalOverlay33000).includes("pendingBattlePresentation33000")&&String(flushDeferredBattleCallerResume33000).includes("pendingBattlePresentation33000")&&String(finishBattlePresentationReceipt33000).includes("flushDeferredTerminalOverlay33000")&&String(finishBattlePresentationReceipt33000).includes("flushDeferredBattleCallerResume33000"),
      menmaEnvironmentBound:String(applyBattleEnvironment33000).includes("forest_clearing_day")&&styleText.includes('data-battle-environment="forest_clearing_day"'),
      supportEmptySlotsCanProject:String(projectFormationSupports33000).includes('classList.remove("is-empty")')&&String(projectFormationSupports33000).includes('document.createElement("div")')&&String(projectFormationSupports33000).includes("framelessBattlePortrait"),
      relayRefreshesCentralConfrontation:String(refreshCommittedFormationPresentation33000).includes("refreshBattleActionRegionPresentation")&&String(projectFormationActivePortrait33000).includes("battle-live-active-nameplate")&&String(projectFormationActivePortrait33000).includes("battle-live-power-")&&String(projectFormationActivePortrait33000).includes("battlePlCurrent")&&String(projectFormationActivePortrait33000).includes("document.createElement"),
      stableFormationMotion:styleText.includes("Final Kakashi Golden / Formation Stage motion policy")&&styleText.includes("transition:none!important;animation:none!important;will-change:auto!important")&&styleText.includes(".battle2-performance-result-chip"),
      playerCardNamesSuppressed:styleText.includes(".battle-live-active-card-player .battle-live-active-nameplate{display:none!important}")&&styleText.includes(".battle-live-roster-player .battle-live-roster-name{display:none!important}"),
      confrontationPLLaneAligned:styleText.includes('data-formation-mode="duel"] .battle-live-power-player')&&styleText.includes("left:43.5%!important")&&styleText.includes("left:56.5%!important"),
      radialPLCorePreserved:String(projectFormationActivePortrait33000).includes('querySelector(".alpha-battle-pl-ring")')&&String(projectFormationActivePortrait33000).includes('querySelector(".alpha-battle-pl-core")')&&String(projectFormationActivePortrait33000).includes("--battle-pl-fill")&&String(projectFormationActivePortrait33000).includes("power.children"),
      topHudStackSeparated:styleText.includes('data-formation-stage="true"] .battle2-performance-host{left:43%!important;right:43%!important;top:2%!important;height:5%!important}')&&styleText.includes('data-formation-mode="wedge"] .battle2-performance-host')&&styleText.includes('left:31%!important;right:31%!important;top:2%!important;height:5.5%!important')&&styleText.includes(".battle2-live-ticker{left:35%!important;top:8.4%!important;width:30%!important"),
      sharedActionMotion:styleText.includes('data-formation-stage="true"].battle2-performance-active .battle2-performance-role-actor')&&styleText.includes("battleShared385ActorAction")&&styleText.includes("battleShared385TargetResponse"),
      storyCallerPresentationSuspension:typeof suspendCallerStoryPresentation33000==="function"&&String(suspendCallerStoryPresentation33000).includes("caller_owned_battle")&&String(enhanceBattle2DOM33000).includes("suspendCallerStoryPresentation33000")&&String(renderCombatOverlayModern33000).includes("enhanceBattle2DOM33000"),
      branchModesRemainExplicit:renderInspector33000.toString().includes("setSelectedBattleSkillMode"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
  }
  window.SC_ALPHA_BATTLE_MODERN_PATCH_ID=PATCH_ID;
  window.SC_BATTLE_PRESENTATION_33000=Object.freeze({patchId:PATCH_ID,presentationCompletion:"issue_373_ordered_playback_v1",presentationClasses:BATTLE_PRESENTATION_CLASSES_33000,browserGoldenClaimed:false});
  window.runAlphaBattleModern33000Diagnostics=runAlphaBattleModern33000Diagnostics;
})();
