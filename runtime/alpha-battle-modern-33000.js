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
      academy_menma_chakra_knuckle:{
        summary:"Hit one enemy with a chakra-powered punch.",
        details:["Attack PL 6.","The enemy's Stamina can reduce the damage."],
        tags:["DAMAGE","ONE ENEMY"]
      },
      academy_menma_crescent_kunai:{
        summary:"Strike one enemy with a fast kunai attack.",
        details:["Attack PL 5.","This is a simple direct attack."],
        tags:["DAMAGE","ONE ENEMY"]
      },
      academy_menma_guard_breaker:{
        summary:"Hit one enemy with a heavy attack that can pressure an active guard.",
        details:["Attack PL 7.","It does not remove every kind of defence automatically."],
        tags:["DAMAGE","GUARD PRESSURE"]
      },
      academy_menma_shadow_clone_feint:{
        summary:"Trick the enemy with a shadow-clone feint.",
        details:["This does not deal damage by itself.","It creates a temporary setup state for the Skill's authored follow-up effect."],
        tags:["SETUP","NO DIRECT DAMAGE"]
      },
      academy_menma_shadowstep:{
        summary:"Move to a different position when a real movement route is available.",
        details:["This does not deal damage.","It is movement, not teleportation."],
        tags:["MOVEMENT","CONTEXT REQUIRED"]
      }
    };
    const fixed=exact[skill.id];
    if(fixed)return {
      title:skill.displayName||skill.id,
      summary:fixed.summary,
      details:fixed.details,
      kind:skillKind33000(skill),attackPL:attackValue33000(skill),tags:fixed.tags
    };

    const kind=String(skill.resolutionKind||"");
    const attack=attackValue33000(skill);
    let summary="Use this authored Battle technique.";
    let details=[];
    let tags=[skillKind33000(skill)];

    if(kind==="direct_damage"){
      summary="Hit one enemy with a direct attack.";
      details=[attack!==null?`Attack PL ${attack}.`:"Its Attack PL comes from the authored Skill.",skill.staminaMitigation===false?"This Skill ignores normal Stamina damage reduction.":"The target's Stamina can reduce the damage."];
      tags=["DAMAGE","ONE ENEMY"];
    }else if(kind==="area_damage"){
      const targets=Math.max(1,Number(skill.maxTargets)||1);
      summary=`Attack up to ${targets} active ${targets===1?"target":"targets"}.`;
      details=[attack!==null?`Attack PL ${attack} for each target.`:"Each target uses the Skill's authored Attack PL.","Each target is resolved separately by the Battle rules."];
      tags=["DAMAGE","AREA"];
    }else if(kind==="ratio_guard_state"&&skill.guard){
      const pct=Math.round((Number(skill.guard.preventionRatio)||0)*100);
      summary=`Get ready to block ${pct}% of the next qualifying direct hit.`;
      details=[skill.guard.oneUse===false?"The guard stays active for as long as its authored rule allows.":"It works once, then the guard ends.","It only blocks attacks that qualify for this guard."];
      tags=["DEFENSE","GUARD"];
    }else if(kind==="restore_underlying_battle_pl"&&skill.restorationProfile){
      const amount=Number(skill.restorationProfile.authoredAmount)||0;
      summary=`Restore ${amount} Battle PL to an eligible ally.`;
      details=["This helps during the current battle.","It does not permanently increase the ally's Stats or Base PL."];
      tags=["RECOVERY","ALLY"];
    }else if(kind==="dynamic_control"){
      summary="Use a control technique to limit the target in the way this Skill allows.";
      details=["The exact limit comes from this Skill's authored rule.","Control does not automatically mean a full stun."],tags=["CONTROL"];
    }else if(kind==="condition_remove"&&skill.conditionRemoval){
      const condition=String(skill.conditionRemoval.conditionType||"condition").replaceAll("_"," ");
      summary=`Remove an eligible ${condition} condition.`;
      details=["This changes the current Battle state only.","It does not erase history that already happened."],tags=["CONTROL","CLEANSE"];
    }else if(kind==="transient_state"){
      summary="Create a temporary setup state for a later Battle effect.";
      details=["This does not deal damage unless the Skill says it does.","The setup ends according to its authored Battle rule."],tags=["SETUP"];
    }else if(kind==="damage_with_persistent_state"){
      summary="Hit the target and also create the Skill's authored ongoing state.";
      details=[attack!==null?`Attack PL ${attack}.`:"The first hit uses the authored Attack PL.","Any later pressure happens only when the Skill's follow-up rule says it should."],tags=["DAMAGE","ONGOING EFFECT"];
    }else if(kind==="branch_damage"){
      summary="Choose a mode, then use the version of the attack you want.";
      details=["Different modes can change the target or Attack PL.","Choosing a mode is the only extra confirmation this Skill needs."],tags=["DAMAGE","CHOOSE MODE"];
    }else if(kind==="categorical_evidence"){
      summary="Use a context Skill that changes what can be learned or acted on in this Battle.";
      details=["It only gives the information or effect written into this Skill.","It does not reveal hidden facts automatically."],tags=["UTILITY","CONTEXT"];
    }else{
  /*
  Safe generic presentation fallback.

  Do not call any global or previously wrapped summary function here.
  33000 is presentation-only, so an unknown Skill kind can use generic
  explanatory copy without touching Battle resolution or availability.
  */
  summary="Use this authored Battle technique.";

  details=[
    "Availability, target and result still follow the normal Battle rules."
  ];

}

    return {title:skill.displayName||skill.id,summary,details,kind:skillKind33000(skill),attackPL:attack,tags:[...new Set(tags)]};
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

  function previewBattlePreparedSkill33000(skillId){
    const actor=getActiveBattleActor33000();
    if(!actor||!skillId||typeof getBattlePreparedSkillDefinition!=="function")return false;
    // The shared Battle renderer owns SELECT -> TARGET/MODE -> USE/CANCEL.
    // Once a Skill is selected, this presentation-only hover inspector must not
    // replace that canonical control surface or it deletes the commit buttons.
    try{
      const state=syncBattleActionRegionState();
      if(state&&state.selectedSkillId)return false;
    }catch(_error){}
    const skill=getBattlePreparedSkillDefinition(actor,skillId);
    const panel=typeof document!=="undefined"?document.querySelector(".alpha-code-battle-stage .battle-live-skill-details"):null;
    if(!skill||!panel)return false;
    panel.classList.add("battle2-inspector");
    panel.innerHTML=renderInspector33000(skill,actor);
    panel.dataset.previewSkillId=skill.id;
    return true;
  }
  window.previewBattlePreparedSkill33000=previewBattlePreparedSkill33000;

  function clearBattleSkillPreview33000(){
    const panel=typeof document!=="undefined"?document.querySelector(".alpha-code-battle-stage .battle-live-skill-details"):null;
    if(!panel)return false;
    let selected=null,actor=getActiveBattleActor33000();
    try{const state=syncBattleActionRegionState();selected=actor&&state.selectedSkillId?getBattlePreparedSkillDefinition(actor,state.selectedSkillId):null;}catch(_error){}
    panel.classList.add("battle2-inspector");
    if(selected){
      // Base Battle render has already rebuilt this panel with its authoritative
      // target/mode/USE/CANCEL controls. Preserve that DOM verbatim.
      delete panel.dataset.previewSkillId;
      return true;
    }
    panel.innerHTML=`<div class="battle2-inspector-empty"><span>SKILL GUIDE</span><h2>Choose your next move</h2><p>Move your mouse over a Skill to learn what it does. Click the Skill when you are ready to use it.</p><div><b>HOVER</b> Learn &nbsp; · &nbsp; <b>CLICK</b> Use</div></div>`;
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
    if(deck&&!deck.dataset.battle2LeaveBound){deck.dataset.battle2LeaveBound="true";deck.addEventListener("mouseleave",()=>clearBattleSkillPreview33000());}
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
  const MENMA_EVOLVED_CONFIG_33000="academy_menma_origin_three_test_subjects_with_anko";
  const MENMA_EVOLVED_ENCOUNTER_33000="origin_academy_menma_prologue:three_test_subjects";
  const MENMA_EVOLVED_BACKDROP_33000="Scene backdrops/forest_clearing_day.png";
  const MENMA_EVOLVED_OBJECTIVE_33000="Stop the Test Subjects.";

  function isEvolvedMenmaPresentation33000(){
    try{
      return !!currentBattle&&(
        currentBattle.presentationQueueEnabled===true||
        String(currentBattle.battleConfigId||"")===MENMA_EVOLVED_CONFIG_33000||
        String(currentBattle.encounterId||"")===MENMA_EVOLVED_ENCOUNTER_33000
      );
    }catch(_error){return false;}
  }

  const PRIOR_OPEN_SKILLS_33000=typeof openBattleSkillsActionFamily==="function"?openBattleSkillsActionFamily:null;
  const PRIOR_OPEN_ITEMS_33000=typeof openBattleItemActionFamily==="function"?openBattleItemActionFamily:null;
  const PRIOR_OPEN_SUMMONS_33000=typeof openBattleSummonActionFamily==="function"?openBattleSummonActionFamily:null;
  const PRIOR_CLOSE_ITEMS_33000=typeof closeBattleItemActionFamily==="function"?closeBattleItemActionFamily:null;
  const PRIOR_CLOSE_SUMMONS_33000=typeof closeBattleSummonActionFamily==="function"?closeBattleSummonActionFamily:null;

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
    for(let slot=1;slot<=4;slot+=1){
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
    const participant=row.participant||participant33000({side,participantId:row.participantId})||null;
    const participantId=String(row.participantId||participant&&participant.id||"");
    node.classList.remove("is-empty");
    node.dataset.participantId=participantId;
    node.dataset.formationSide=side;
    node.dataset.formationSlot="1";
    node.dataset.formationRole="active";
    node.dataset.presentationAssetKind="frameless_portrait";
    node.classList.add("battle2-formation-participant","battle2-formation-active");
    let img=node.querySelector(".battle-live-active-card-image");
    const portrait=String(row.portrait||formationPortrait33000(side,participant)||"");
    if(portrait){
      if(!img){
        const missing=node.querySelector(".battle-live-active-card-missing");
        if(missing)missing.remove();
        img=document.createElement("img");
        img.className="battle-live-active-card-image";
        img.draggable=false;
        node.insertBefore(img,node.querySelector(".battle-live-active-nameplate")||null);
      }
      if(img.getAttribute("src")!==portrait)img.setAttribute("src",portrait);
      img.dataset.formationPortrait="true";
      img.dataset.presentationAssetKind="frameless_portrait";
      img.alt=String(participant&&participant.name||row.name||participantId||"Battle portrait");
    }
    const heading=node.querySelector(".battle-live-active-card-heading");
    if(heading)heading.textContent=side==="player"?"ACTIVE SHINOBI":"ACTIVE OPPOSITION";
    const nameplate=node.querySelector(".battle-live-active-nameplate");
    if(nameplate)nameplate.textContent=String(participant&&participant.name||row.name||participantId||"");
    return node;
  }  function projectFormationSupports33000(stage,side,rows){
    const roster=stage.querySelector(".battle-live-roster-"+side);
    if(!roster)return[];
    const ids=new Map(rows.map(row=>[Number(row.slot),row]));
    const nodes=[...roster.querySelectorAll(".battle-live-roster-slot")];
    for(const node of nodes){
      const slot=Number(node.dataset.slot)||0,row=ids.get(slot)||null;
      node.classList.remove("battle2-formation-participant","battle2-formation-support","battle2-formation-focus","battle2-formation-recessed");
      delete node.dataset.participantId;delete node.dataset.formationSide;delete node.dataset.formationSlot;delete node.dataset.formationRole;delete node.dataset.presentationAssetKind;
      if(slot===1||slot>=5||!row){
        node.dataset.formationHidden="true";
        continue;
      }
      const participant=row.participant||participant33000({side,participantId:row.participantId})||null;
      const participantId=String(row.participantId||participant&&participant.id||"");
      delete node.dataset.formationHidden;
      node.classList.remove("is-empty");
      node.dataset.participantId=participantId;
      node.dataset.formationSide=side;
      node.dataset.formationSlot=String(slot);
      node.dataset.formationRole="benched";
      node.dataset.presentationAssetKind="frameless_portrait";
      node.classList.add("battle2-formation-participant","battle2-formation-support");

      const portrait=String(row.portrait||formationPortrait33000(side,participant)||"");
      let portraitNode=node.querySelector(".battle-live-roster-portrait");
      if(portrait){
        if(!portraitNode||portraitNode.tagName!=="IMG"){
          if(portraitNode)portraitNode.remove();
          portraitNode=document.createElement("img");
          portraitNode.className="battle-live-roster-portrait";
          portraitNode.draggable=false;
          const label=node.querySelector(".battle-live-queue-label");
          if(label&&label.nextSibling)node.insertBefore(portraitNode,label.nextSibling);else node.appendChild(portraitNode);
        }
        if(portraitNode.getAttribute("src")!==portrait)portraitNode.setAttribute("src",portrait);
        portraitNode.dataset.formationPortrait="true";
        portraitNode.dataset.presentationAssetKind="frameless_portrait";
        portraitNode.alt=String(participant&&participant.name||row.name||participantId||"Battle portrait");
      }

      let copy=node.querySelector(".battle-live-roster-copy");
      if(!copy){
        copy=document.createElement("div");copy.className="battle-live-roster-copy";
        const name=document.createElement("div");name.className="battle-live-roster-name";
        const power=document.createElement("div");power.className="battle-live-roster-power";
        copy.append(name,power);node.appendChild(copy);
      }
      const nameNode=copy.querySelector(".battle-live-roster-name");
      if(nameNode)nameNode.textContent=String(participant&&participant.name||row.name||participantId||"UNKNOWN");
      const powerNode=copy.querySelector(".battle-live-roster-power");
      if(powerNode){
        let current=row.remainingPL,max=row.maximumPL;
        try{
          if(current===undefined||current===null)current=getBattleRemainingPL(side,participantId);
          if(max===undefined||max===null)max=getBattleMaximumPL(side,participantId);
        }catch(_error){}
        powerNode.textContent="PL "+String(current??0);
        const span=document.createElement("span");span.textContent="/ "+String(max??0);
        powerNode.appendChild(span);
      }
    }
    return nodes;
  }  function installFormationDock33000(stage){
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
  function bindBattleEnvironment33000(stage){
    if(!stage)return null;
    let backdrop="";
    try{backdrop=String(currentBattle&&currentBattle.presentationEnvironmentBackdrop||"");}catch(_error){}
    if(!backdrop&&isEvolvedMenmaPresentation33000())backdrop=MENMA_EVOLVED_BACKDROP_33000;
    if(backdrop){
      stage.dataset.battleEnvironment=backdrop;
      stage.style.setProperty("background-image",'linear-gradient(180deg,rgba(3,10,15,.18),rgba(2,7,10,.48)),url("'+backdrop.replaceAll('"','%22')+'")',"important");
      stage.style.setProperty("background-size","cover","important");
      stage.style.setProperty("background-position","center","important");
    }else{
      delete stage.dataset.battleEnvironment;
      stage.style.removeProperty("background-image");
    }
    return backdrop||null;
  }
  window.bindBattleEnvironment33000=bindBattleEnvironment33000;

  function installBattleObjective33000(stage){
    if(!stage)return null;
    let label="";
    try{label=String(currentBattle&&currentBattle.presentationObjectiveLabel||"");}catch(_error){}
    if(!label&&isEvolvedMenmaPresentation33000())label=MENMA_EVOLVED_OBJECTIVE_33000;
    let node=stage.querySelector(".battle2-objective-label");
    if(!label){if(node)node.remove();return null;}
    if(!node){node=document.createElement("div");node.className="battle2-objective-label";stage.appendChild(node);}
    node.textContent=label;
    node.dataset.objectiveId=String(currentBattle&&currentBattle.objectiveId||"");
    return node;
  }
  window.installBattleObjective33000=installBattleObjective33000;

  function installFormationStage33000(stage){
    if(!stage)return null;
    const player=deployedFormation33000("player"),enemy=deployedFormation33000("enemy"),mode=formationMode33000();
    stage.dataset.formationStage="true";
    stage.dataset.formationMode=mode;
    stage.dataset.playerFormationCount=String(player.length);
    stage.dataset.enemyFormationCount=String(enemy.length);
    stage.dataset.evolvedBattlePresentation=isEvolvedMenmaPresentation33000()?"true":"false";
    bindBattleEnvironment33000(stage);
    installBattleObjective33000(stage);
    projectFormationActivePortrait33000(stage,"player",player.find(row=>row.slot===1)||player[0]||null);
    projectFormationActivePortrait33000(stage,"enemy",enemy.find(row=>row.slot===1)||enemy[0]||null);
    projectFormationSupports33000(stage,"player",player);
    projectFormationSupports33000(stage,"enemy",enemy);
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
      environment:stage.dataset.battleEnvironment||null,
      objective:stage.querySelector(".battle2-objective-label")?.textContent||null,
      primaryFamilies:stage.querySelector(".battle-live-action-family-row")?.dataset.primaryFamilies||"",
      trayMode:stage.dataset.formationTray,
      semanticWrite:false
    };
  }  function battleEvidence33000(){
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
    const skillId=completion&&completion.skillId||null,itemId=completion&&completion.itemId||null;
    if(itemId){
      try{const item=typeof getItemDefinition==="function"?getItemDefinition(itemId):null;if(item&&item.name)return item.name;}catch(_error){}
      return String(itemId).replaceAll("_"," ").toUpperCase();
    }
    if(skillId){
      if(actor&&actor.id==="sj_anko"){
        const ankoLabels={
          sj_anko_hidden_shadow_snake_hands:"Hidden Shadow Snake Hands",
          sj_anko_snake_bind:"Snake Bind",
          sj_anko_fire_style_dragon_flame:"Fire Style: Dragon Flame",
          sj_anko_serpent_evasion:"Serpent Evasion"
        };
        if(ankoLabels[skillId])return ankoLabels[skillId];
      }
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
    const skillId=String(completion&&completion.skillId||"").toLowerCase();
    const events=(group||[]).map(row=>String(row.eventType||"").toLowerCase());
    const damages=(group||[]).filter(row=>row.eventType==="damage_resolved");
    const explicitSubstitution=skillId.includes("substitution")||events.some(x=>x.includes("substitution"));
    if(explicitSubstitution)return"SUBSTITUTION";
    if(events.some(x=>x.includes("evade")||x.includes("evasion")))return"EVADE";
    if(events.some(x=>x.includes("miss")))return"MISS";
    if(damages.some(row=>Number(row.data&&row.data.remainingBattlePLAfter)<=0))return"DEFEAT";
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
    if(result==="DEFEAT")return"DEFEAT";
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
  const BATTLE_PRESENTATION_COMPLETION_TYPES_33000=new Set(["skill_action_completed","enemy_authored_action_completed","item_action_completed","summon_skill_resolved_and_returned","menma_origin_anko_assist_completed"]);

  function cloneBattlePresentationValue33000(value){
    try{return JSON.parse(JSON.stringify(value));}catch(_error){return value;}
  }

  function captureFormationSnapshot33000(){
    const snapshot={player:[],enemy:[]};
    for(const side of ["player","enemy"]){
      for(let slot=1;slot<=6;slot+=1){
        let participant=null;
        try{participant=typeof getBattleDeploymentParticipant==="function"?getBattleDeploymentParticipant(side,slot):null;}catch(_error){participant=null;}
        if(!participant)continue;
        let remainingPL=null,maximumPL=null;
        try{remainingPL=getBattleRemainingPL(side,participant.id);maximumPL=getBattleMaximumPL(side,participant.id);}catch(_error){}
        snapshot[side].push({
          side,slot,participantId:String(participant.id||""),
          name:String(participant.name||participant.id||""),
          portrait:formationPortrait33000(side,participant)||portrait33000({side,participantId:participant.id},participant)||"",
          remainingPL:Number.isFinite(Number(remainingPL))?Number(remainingPL):null,
          maximumPL:Number.isFinite(Number(maximumPL))?Number(maximumPL):null
        });
      }
    }
    return snapshot;
  }
  window.captureFormationSnapshot33000=captureFormationSnapshot33000;

  function ensureBattlePresentationQueueState33000(){
    if(!currentBattle||!currentBattle.battleId)return null;
    let state=currentBattle.presentation33000;
    if(!state||state.battleId!==currentBattle.battleId){
      state={
        battleId:currentBattle.battleId,
        nextSequenceOrdinal:1,
        queue:[],
        current:null,
        queuedKeys:[],
        playedKeys:[],
        exposedReceipts:[],
        staleRejectedKeys:[],
        initialized:false,
        lastFormationSnapshot:null,
        lastTransitionCounter:Number(currentBattle.deployment&&currentBattle.deployment.transitionCounter)||0,
        playbackToken:0,
        terminalExposed:false,
        terminalNavigationConsumed:false
      };
      currentBattle.presentation33000=state;
    }
    if(!Array.isArray(state.queue))state.queue=[];
    if(!Array.isArray(state.queuedKeys))state.queuedKeys=[];
    if(!Array.isArray(state.playedKeys))state.playedKeys=[];
    if(!Array.isArray(state.exposedReceipts))state.exposedReceipts=[];
    if(!Array.isArray(state.staleRejectedKeys))state.staleRejectedKeys=[];
    state.nextSequenceOrdinal=Math.max(1,Number(state.nextSequenceOrdinal)||1);
    state.lastTransitionCounter=Math.max(0,Number(state.lastTransitionCounter)||0);
    return state;
  }

  function initializeBattlePresentationQueue33000(){
    const state=ensureBattlePresentationQueueState33000();
    if(!state)return null;
    state.initialized=true;
    state.lastFormationSnapshot=captureFormationSnapshot33000();
    state.lastTransitionCounter=Number(currentBattle.deployment&&currentBattle.deployment.transitionCounter)||0;
    return cloneBattlePresentationValue33000(state);
  }
  window.initializeBattlePresentationQueue33000=initializeBattlePresentationQueue33000;

  function evolvedOpportunityId33000(actorRef){
    if(!actorRef||!currentBattle)return null;
    const state=currentBattle.menmaEvolvedPLBattle36900;
    if(!state)return null;
    const side=String(actorRef.side||"");
    const ordinal=side==="player"?Number(state.playerOpportunityOrdinal)||1:Number(state.enemyOpportunityOrdinal)||1;
    return currentBattle.battleId+":"+side+"_opportunity:"+String(ordinal);
  }

  function resolveBattlePerformanceProjectionForAction33000(actionId){
    if(!currentBattle||!currentBattle.battleId||!actionId)return null;
    const evidence=battleEvidence33000();
    const group=evidence.filter(row=>row&&row.actionId===actionId);
    const completion=[...group].reverse().find(row=>row&&BATTLE_PRESENTATION_COMPLETION_TYPES_33000.has(row.eventType));
    if(!completion)return null;
    const actorRef=completion.actorRef||group.find(row=>row.actorRef)?.actorRef||null;
    const targetRef=completion.targetRef||group.find(row=>row.targetRef)?.targetRef||null;
    const actor=participant33000(actorRef),target=participant33000(targetRef);
    const damages=group.filter(row=>row.eventType==="damage_resolved");
    const firstDamage=damages[0]||null,lastDamage=damages[damages.length-1]||null;
    const totalDamage=damages.reduce((sum,row)=>sum+Math.max(0,Number(row.data&&row.data.finalDamage)||0),0);
    const result=resultClass33000(completion,group);
    return{
      battleId:currentBattle.battleId,
      actionId:completion.actionId,
      actionOpportunityId:evolvedOpportunityId33000(actorRef),
      actorRef,targetRef,
      actorName:actor&&actor.name||actorRef&&actorRef.participantId||"ACTOR",
      targetName:target&&target.name||targetRef&&targetRef.participantId||"TARGET",
      actorPortrait:portrait33000(actorRef,actor),
      targetPortrait:portrait33000(targetRef,target),
      actionLabel:actionLabel33000(completion,group,actor),
      actionRole:actorRef&&actorRef.participantId==="sj_anko"?"authored_assist":"active",
      result,
      presentationClass:presentationClass33000(completion,group,result),
      finalDamage:totalDamage,
      beforePL:firstDamage&&Number.isFinite(Number(firstDamage.data&&firstDamage.data.remainingBattlePLBefore))?Number(firstDamage.data.remainingBattlePLBefore):null,
      afterPL:lastDamage&&Number.isFinite(Number(lastDamage.data&&lastDamage.data.remainingBattlePLAfter))?Number(lastDamage.data.remainingBattlePLAfter):null,
      withdrawal:!!(lastDamage&&Number(lastDamage.data&&lastDamage.data.remainingBattlePLAfter)<=0),
      exactTarget:!!(targetRef&&targetRef.side&&targetRef.participantId),
      sourceEvidenceIds:group.map(row=>row.evidenceId).filter(Boolean),
      semanticWrite:false
    };
  }
  window.resolveBattlePerformanceProjectionForAction33000=resolveBattlePerformanceProjectionForAction33000;

  function resolveBattlePerformanceProjection33000(){
    if(!currentBattle||!currentBattle.battleId)return null;
    const evidence=battleEvidence33000();
    const completion=[...evidence].reverse().find(row=>row&&row.actionId&&BATTLE_PRESENTATION_COMPLETION_TYPES_33000.has(row.eventType));
    return completion?resolveBattlePerformanceProjectionForAction33000(completion.actionId):null;
  }
  window.resolveBattlePerformanceProjection33000=resolveBattlePerformanceProjection33000;

  function enqueueBattlePresentationReceipt33000(actionId){
    if(!currentBattle||currentBattle.presentationQueueEnabled!==true||!actionId)return null;
    const state=ensureBattlePresentationQueueState33000();
    if(!state)return null;
    if(!state.initialized)initializeBattlePresentationQueue33000();
    const key=currentBattle.battleId+":"+String(actionId);
    if(state.queuedKeys.includes(key)||state.playedKeys.includes(key)||state.current&&state.current.key===key)return null;
    const projection=resolveBattlePerformanceProjectionForAction33000(actionId);
    if(!projection)return null;
    const transitionCounter=Number(currentBattle.deployment&&currentBattle.deployment.transitionCounter)||0;
    const transition=transitionCounter!==state.lastTransitionCounter?cloneBattlePresentationValue33000(currentBattle.deployment&&currentBattle.deployment.lastTransition||null):null;
    const beforeFormation=cloneBattlePresentationValue33000(state.lastFormationSnapshot||captureFormationSnapshot33000());
    const afterFormation=captureFormationSnapshot33000();
    const receipt=Object.freeze({
      ...projection,
      key,
      sequenceOrdinal:state.nextSequenceOrdinal++,
      formationBefore:beforeFormation,
      formationAfter:cloneBattlePresentationValue33000(afterFormation),
      formationTransition:transition,
      terminalAtCommit:currentBattle.battleOver===true,
      terminalResult:currentBattle.outcome&&currentBattle.outcome.type||null
    });
    state.queue.push(receipt);
    state.queuedKeys.push(key);
    state.lastFormationSnapshot=cloneBattlePresentationValue33000(afterFormation);
    state.lastTransitionCounter=transitionCounter;
    return receipt;
  }
  window.enqueueBattlePresentationReceipt33000=enqueueBattlePresentationReceipt33000;

  function projectFormationSnapshot33000(stage,snapshot){
    if(!stage||!snapshot)return null;
    const player=(snapshot.player||[]).map(row=>({...row,participant:participant33000({side:"player",participantId:row.participantId})||null}));
    const enemy=(snapshot.enemy||[]).map(row=>({...row,participant:participant33000({side:"enemy",participantId:row.participantId})||null}));
    const playerActive=player.find(row=>Number(row.slot)===1)||null,enemyActive=enemy.find(row=>Number(row.slot)===1)||null;
    if(playerActive)projectFormationActivePortrait33000(stage,"player",playerActive);
    if(enemyActive)projectFormationActivePortrait33000(stage,"enemy",enemyActive);
    projectFormationSupports33000(stage,"player",player);
    projectFormationSupports33000(stage,"enemy",enemy);
    stage.dataset.playerFormationCount=String(player.length);
    stage.dataset.enemyFormationCount=String(enemy.length);
    stage.dataset.formationMode=Math.max(player.length,enemy.length)<=1?"duel":Math.max(player.length,enemy.length)>=4?"arc":"wedge";
    return{playerCount:player.length,enemyCount:enemy.length};
  }
  window.projectFormationSnapshot33000=projectFormationSnapshot33000;

  function battlePerformanceMarkup33000(p){
    if(!p)return"";
    const role=p.actionRole==="authored_assist"?"ASSIST":"ACTIVE";
    const delta=p.finalDamage>0?"-"+p.finalDamage+" PL":p.result==="SUBSTITUTION"?"NO DIRECT HIT":"STATE CHANGE";
    const state=p.beforePL!==null&&p.afterPL!==null?p.beforePL+" → "+p.afterPL+" PL":"AUTHORITATIVE STATE UPDATED";
    return '<section class="battle2-performance-stage is-playing" data-action-id="'+esc(p.actionId)+'" data-performance-class="'+esc(p.presentationClass)+'" data-result="'+esc(p.result)+'" aria-label="Committed Battle action">'+
      '<div class="battle2-performance-center"><small>'+esc(role+" · "+p.actorName+" → "+p.targetName)+'</small><strong>'+esc(p.actionLabel)+'</strong><span>'+esc(p.result+" · "+delta+" · "+state)+'</span></div></section>';
  }

  function battlePerformanceResultChip33000(p){
    if(typeof document==="undefined"||!p)return null;
    const chip=document.createElement("div");
    chip.className="battle2-performance-result-chip";
    chip.dataset.result=String(p.result||"RESOLVED");
    const delta=p.finalDamage>0?'-'+p.finalDamage+' PL':p.result==="SUBSTITUTION"?"NO DIRECT HIT":"STATE CHANGE";
    const state=p.beforePL!==null&&p.afterPL!==null?p.beforePL+" → "+p.afterPL+" PL":"AUTHORITATIVE STATE UPDATED";
    const result=document.createElement("b");result.textContent=String(p.result||"RESOLVED");
    const change=document.createElement("em");change.textContent=delta;
    const settled=document.createElement("span");settled.textContent=state;
    chip.append(result,change,settled);
    return chip;
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
    stage.dataset.lastExposedActor=String(p.actorRef&&p.actorRef.participantId||"");
    stage.dataset.lastExposedTarget=String(p.targetRef&&p.targetRef.participantId||"");
    stage.dataset.lastExposedAction=String(p.actionLabel||"");
    if(actorNode)actorNode.classList.add("battle2-performance-role-actor");
    if(targetNode){
      targetNode.classList.add("battle2-performance-role-target");
      const chip=battlePerformanceResultChip33000(p);
      if(chip)targetNode.appendChild(chip);
    }
    return{actorNode,targetNode,resultChip:targetNode&&targetNode.querySelector(".battle2-performance-result-chip")||null};
  }

  function installRelayBanner33000(stage,p){
    let banner=stage.querySelector(".battle2-relay-banner");
    if(!p||!p.formationTransition){
      if(banner)banner.remove();
      return null;
    }
    const t=p.formationTransition;
    if(!banner){banner=document.createElement("div");banner.className="battle2-relay-banner";stage.appendChild(banner);}
    const replacement=String(t.replacementParticipantId||"").replaceAll("_"," ").replace(/\b\w/g,ch=>ch.toUpperCase());
    banner.textContent=replacement?"WITHDRAWAL · "+replacement+" TAKES ACTIVE":"WITHDRAWAL · FORMATION SETTLES";
    banner.dataset.transitionType=String(t.type||"withdrawal_queue_advance");
    banner.dataset.replacementParticipantId=String(t.replacementParticipantId||"");
    return banner;
  }

  function finishBattlePresentationReceipt33000(stage,receipt,token){
    const state=ensureBattlePresentationQueueState33000();
    if(!state||!receipt||state.playbackToken!==token||!state.current||state.current.key!==receipt.key)return false;
    projectFormationSnapshot33000(stage,receipt.formationAfter);
    clearBattlePerformanceRoles33000(stage,receipt.actionId);
    const relay=stage.querySelector(".battle2-relay-banner");if(relay)relay.remove();
    const host=stage.querySelector(".battle2-performance-host");
    const lane=host&&host.querySelector(".battle2-performance-stage");
    if(lane){lane.classList.remove("is-playing");lane.classList.add("is-settled");}
    if(!state.playedKeys.includes(receipt.key))state.playedKeys.push(receipt.key);
    state.exposedReceipts.push({...cloneBattlePresentationValue33000(receipt),exposureStarted:true,exposureFinished:true});
    state.current=null;
    stage.dataset.presentationBusy="false";
    if(state.queue.length>0){
      setTimeout(()=>startNextBattlePresentationReceipt33000(stage),90);
    }else{
      projectFormationSnapshot33000(stage,captureFormationSnapshot33000());
      maybeCompleteTerminalPresentation33000();
    }
    return true;
  }

  function startNextBattlePresentationReceipt33000(stage){
    const state=ensureBattlePresentationQueueState33000();
    if(!stage||!state)return null;
    if(state.current)return state.current;
    let receipt=null;
    while(state.queue.length>0&&!receipt){
      const candidate=state.queue.shift();
      if(!candidate)continue;
      if(candidate.battleId!==currentBattle.battleId){
        state.staleRejectedKeys.push(candidate.key);continue;
      }
      receipt=candidate;
    }
    if(!receipt){
      stage.dataset.presentationBusy="false";
      maybeCompleteTerminalPresentation33000();
      return null;
    }
    state.current=receipt;
    state.playbackToken=(Number(state.playbackToken)||0)+1;
    const token=state.playbackToken;
    stage.dataset.presentationBusy="true";
    stage.dataset.presentationSequence=String(receipt.sequenceOrdinal);
    projectFormationSnapshot33000(stage,receipt.formationBefore);
    let host=stage.querySelector(".battle2-performance-host");
    if(!host){host=document.createElement("div");host.className="battle2-performance-host";stage.appendChild(host);}
    host.dataset.actionId=String(receipt.actionId);
    host.innerHTML=battlePerformanceMarkup33000(receipt);
    applyBattlePerformanceRoles33000(stage,receipt);
    const reduced=typeof matchMedia==="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;
    const settleDelay=reduced?420:1450;
    const relayDelay=reduced?150:900;
    setTimeout(()=>{
      const live=ensureBattlePresentationQueueState33000();
      if(!live||live.playbackToken!==token||!live.current||live.current.key!==receipt.key)return;
      if(receipt.formationTransition){
        installRelayBanner33000(stage,receipt);
        projectFormationSnapshot33000(stage,receipt.formationAfter);
      }
    },relayDelay);
    setTimeout(()=>finishBattlePresentationReceipt33000(stage,receipt,token),settleDelay);
    return receipt;
  }
  window.startNextBattlePresentationReceipt33000=startNextBattlePresentationReceipt33000;

  function maybeCompleteTerminalPresentation33000(){
    const state=ensureBattlePresentationQueueState33000();
    if(!state||state.current||state.queue.length>0||!currentBattle)return false;
    const pending=String(currentBattle.presentationTerminalPending||"");
    if(!pending||state.terminalNavigationConsumed)return false;
    state.terminalExposed=true;
    state.terminalNavigationConsumed=true;
    currentBattle.presentationTerminalPending=null;
    if(pending==="victory"){
      try{openOverlay("victory");return true;}catch(_error){return false;}
    }
    if(pending==="defeat"){
      try{
        if(typeof resumeBattleCallerAfterCompletion==="function"){
          const result=resumeBattleCallerAfterCompletion("defeat");
          return !!(result&&result.success===true);
        }
      }catch(_error){}
    }
    return false;
  }
  window.maybeCompleteTerminalPresentation33000=maybeCompleteTerminalPresentation33000;

  function hardSettleBattlePresentation33000(reason="presentation_fail_soft"){
    const state=ensureBattlePresentationQueueState33000();
    if(!state)return{success:false,reason:"presentation_state_missing"};
    const receipts=[...(state.current?[state.current]:[]),...state.queue];
    for(const receipt of receipts){
      if(receipt&&receipt.key&&!state.playedKeys.includes(receipt.key))state.playedKeys.push(receipt.key);
      if(receipt)state.exposedReceipts.push({...cloneBattlePresentationValue33000(receipt),exposureStarted:true,exposureFinished:true,hardSettled:true,hardSettleReason:reason});
    }
    state.current=null;state.queue=[];state.playbackToken=(Number(state.playbackToken)||0)+1;
    const stage=typeof document!=="undefined"?document.querySelector(".alpha-code-battle-stage"):null;
    if(stage){
      stage.dataset.presentationBusy="false";
      projectFormationSnapshot33000(stage,captureFormationSnapshot33000());
      clearBattlePerformanceRoles33000(stage);
      const relay=stage.querySelector(".battle2-relay-banner");if(relay)relay.remove();
    }
    maybeCompleteTerminalPresentation33000();
    return{success:true,hardSettled:true,semanticWrite:false,reason};
  }
  window.hardSettleBattlePresentation33000=hardSettleBattlePresentation33000;

  function getBattlePresentationQueueState33000(){
    const state=ensureBattlePresentationQueueState33000();
    if(!state)return null;
    return cloneBattlePresentationValue33000({
      battleId:state.battleId,
      busy:!!state.current||state.queue.length>0,
      current:state.current,
      queue:state.queue,
      queuedKeys:state.queuedKeys,
      playedKeys:state.playedKeys,
      exposedReceipts:state.exposedReceipts,
      staleRejectedKeys:state.staleRejectedKeys,
      terminalExposed:state.terminalExposed,
      terminalNavigationConsumed:state.terminalNavigationConsumed
    });
  }
  window.getBattlePresentationQueueState33000=getBattlePresentationQueueState33000;

  const PRE_RECORD_PRESENTATION_33000=typeof recordBattleEvidence==="function"?recordBattleEvidence:null;
  if(PRE_RECORD_PRESENTATION_33000){
    const wrapped=function(definition){
      const record=PRE_RECORD_PRESENTATION_33000.apply(this,arguments);
      if(currentBattle&&currentBattle.presentationQueueEnabled===true&&definition&&definition.actionId&&definition.committedOccurrence===true&&BATTLE_PRESENTATION_COMPLETION_TYPES_33000.has(definition.eventType)){
        enqueueBattlePresentationReceipt33000(definition.actionId);
      }
      return record;
    };
    globalThis.recordBattleEvidence=wrapped;try{recordBattleEvidence=wrapped;}catch(_error){}
  }

  function installBattlePerformance33000(stage){
    if(!stage)return null;
    if(currentBattle&&currentBattle.presentationQueueEnabled===true){
      const state=ensureBattlePresentationQueueState33000();
      if(state&&!state.initialized)initializeBattlePresentationQueue33000();
      let host=stage.querySelector(".battle2-performance-host");
      if(!host){host=document.createElement("div");host.className="battle2-performance-host";stage.appendChild(host);}
      if(state&&state.current){
        projectFormationSnapshot33000(stage,state.current.formationBefore);
        host.dataset.actionId=String(state.current.actionId);
        host.innerHTML=battlePerformanceMarkup33000(state.current);
        applyBattlePerformanceRoles33000(stage,state.current);
        return state.current;
      }
      if(state&&state.queue.length>0)return startNextBattlePresentationReceipt33000(stage);
      host.replaceChildren();delete host.dataset.actionId;clearBattlePerformanceRoles33000(stage);
      stage.dataset.presentationBusy="false";
      maybeCompleteTerminalPresentation33000();
      return null;
    }

    const p=resolveBattlePerformanceProjection33000();
    let host=stage.querySelector(".battle2-performance-host");
    if(!host){host=document.createElement("div");host.className="battle2-performance-host";stage.appendChild(host);}
    if(!p){host.replaceChildren();delete host.dataset.actionId;clearBattlePerformanceRoles33000(stage);return null;}
    const key=p.battleId+":"+p.actionId;
    const played=playedBattlePerformanceKeys33000.has(key);
    if(host.dataset.actionId!==p.actionId){
      host.dataset.actionId=p.actionId;
      host.innerHTML=battlePerformanceMarkup33000(p);
      if(!played){
        const preserveSkills=formationTrayMode33000==="skills"||stage.dataset.formationTray==="skills";
        if(!preserveSkills){
          formationTrayMode33000=null;
          stage.dataset.formationTray="closed";
        }
      }
    }
    const lane=host.querySelector(".battle2-performance-stage");
    if(lane){
      lane.classList.toggle("is-playing",!played);
      lane.classList.toggle("is-settled",played);
      if(!played){
        playedBattlePerformanceKeys33000.add(key);
        applyBattlePerformanceRoles33000(stage,p);
        setTimeout(()=>{
          if(lane.isConnected&&host.dataset.actionId===p.actionId){
            lane.classList.remove("is-playing");lane.classList.add("is-settled");
            clearBattlePerformanceRoles33000(stage,p.actionId);
          }
        },920);
      }else clearBattlePerformanceRoles33000(stage);
    }
    return p;
  }
  window.installBattlePerformance33000=installBattlePerformance33000;

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
  renderCombatOverlay=function renderCombatOverlayModern33000(container){
    const result=priorRenderCombatOverlay33000.apply(this,arguments);
    suspendCallerStoryPresentation33000();
    enhanceBattle2DOM33000(container);
    return result;
  };

  if(typeof document!=="undefined"&&!document.getElementById("alpha-battle-modern-33000-style")){
    const style=document.createElement("style");
    style.id="alpha-battle-modern-33000-style";
    style.textContent=`
      .alpha-code-battle-stage.battle2-modern{background:radial-gradient(circle at 50% 25%,rgba(41,103,119,.20),transparent 27%),radial-gradient(circle at 18% 36%,rgba(40,188,204,.08),transparent 24%),radial-gradient(circle at 82% 36%,rgba(218,77,55,.08),transparent 24%),linear-gradient(180deg,#07121a 0%,#03080d 58%,#05080c 100%)!important}
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
      .battle2-modern .battle-live-skill-details{left:64%!important;top:68%!important;width:32.6%!important;height:25%!important;padding:14px 16px!important;border:1px solid rgba(91,121,134,.28)!important;background:linear-gradient(155deg,rgba(5,14,20,.96),rgba(3,8,12,.98))!important;overflow:auto!important}
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
      .battle2-modern[data-formation-stage="true"] .battle2-formation-recessed{transform:none!important}
      .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-actor,
      .battle2-modern[data-formation-stage="true"].battle2-performance-active .battle2-performance-role-target,
      .battle2-modern[data-formation-stage="true"] .battle2-performance-stage.is-playing .battle2-performance-center,
      .battle2-modern[data-formation-stage="true"] .battle2-performance-result-chip{
        animation:none!important;transition:none!important;transform:none!important;will-change:auto!important
      }
      .battle2-modern[data-formation-stage="true"] .battle2-performance-stage{transition:none!important;transform:none!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-stage.is-settled{transform:none!important}
      .battle2-modern[data-formation-stage="true"] .battle2-performance-host{left:43%!important;right:43%!important;top:1.5%!important;height:4.8%!important}
      .battle2-modern[data-formation-stage="true"] .battle2-live-ticker{left:35%!important;top:7.2%!important;width:30%!important;min-height:4.6%!important;padding:6px 10px!important}
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

      /* Issue #373 — Menma evolved PL Battle Golden candidate.
         Scoped exception: Kakashi's frozen no-motion Formation Stage remains unchanged. */
      .battle2-modern[data-evolved-battle-presentation="true"] .battle2-objective-label{position:absolute;left:50%;top:6.2%;transform:translateX(-50%);z-index:34;padding:6px 12px;border:1px solid rgba(218,179,79,.42);border-radius:999px;background:rgba(2,9,13,.82);color:#ead18a;font-size:clamp(8px,.62vw,10px);font-weight:900;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
      .battle2-modern[data-evolved-battle-presentation="true"][data-presentation-busy="true"] .battle-live-action-family-row{opacity:.22!important;pointer-events:none!important;filter:saturate(.45)!important}
      .battle2-modern[data-evolved-battle-presentation="true"] .battle2-performance-host{left:34%!important;right:34%!important;top:2%!important;height:5.6%!important}
      .battle2-modern[data-evolved-battle-presentation="true"] .battle2-performance-stage{opacity:1!important;transform:none!important}
      .battle2-modern[data-evolved-battle-presentation="true"] .battle2-performance-stage .battle2-performance-center{opacity:1!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:2px!important}
      .battle2-modern[data-evolved-battle-presentation="true"] .battle2-performance-stage .battle2-performance-center span{display:block!important;color:#e3d29d!important;font-size:clamp(7px,.52vw,9px)!important;font-weight:800!important;letter-spacing:.04em!important}
      .battle2-modern[data-evolved-battle-presentation="true"] .battle2-performance-result-chip{opacity:1!important;animation:none!important;transition:none!important;transform:none!important}
      .battle2-modern[data-evolved-battle-presentation="true"] .battle-live-active-card,
      .battle2-modern[data-evolved-battle-presentation="true"] .battle-live-roster-slot.battle2-formation-support{transition:left .36s cubic-bezier(.2,.75,.25,1),right .36s cubic-bezier(.2,.75,.25,1),top .36s cubic-bezier(.2,.75,.25,1),width .36s ease,height .36s ease,opacity .2s ease,filter .2s ease,transform .36s ease!important;will-change:transform,left,top,width,height!important}
      .battle2-modern[data-evolved-battle-presentation="true"].battle2-performance-active .battle2-performance-role-actor{filter:saturate(1.08) brightness(1.08) drop-shadow(0 26px 30px rgba(0,0,0,.52))!important;opacity:1!important}
      .battle2-modern[data-evolved-battle-presentation="true"].battle2-performance-active .battle2-performance-role-target{filter:saturate(.92) brightness(.94) drop-shadow(0 20px 28px rgba(0,0,0,.52))!important;opacity:1!important}
      .battle2-modern[data-evolved-battle-presentation="true"].battle2-performance-active .battle-live-roster-player .battle2-performance-role-actor{left:24%!important;right:auto!important;top:13%!important;width:24%!important;height:45%!important;z-index:35!important}
      .battle2-modern[data-evolved-battle-presentation="true"].battle2-performance-active .battle-live-roster-enemy .battle2-performance-role-actor{left:52%!important;right:auto!important;top:13%!important;width:24%!important;height:45%!important;z-index:35!important}
      .battle2-modern[data-evolved-battle-presentation="true"] .battle2-relay-banner{position:absolute;left:50%;top:13.2%;transform:translateX(-50%);z-index:45;padding:7px 12px;border:1px solid rgba(229,183,75,.54);border-radius:10px;background:rgba(3,9,13,.92);color:#f0cb73;font-size:clamp(8px,.6vw,10px);font-weight:900;letter-spacing:.08em;white-space:nowrap}
      .battle2-modern[data-evolved-battle-presentation="true"] .battle-live-active-card-image,
      .battle2-modern[data-evolved-battle-presentation="true"] .battle-live-roster-portrait{background:transparent!important;border:0!important;box-shadow:none!important}

      @media(max-width:1100px){
        .battle2-modern[data-formation-stage="true"] .battle-live-action-family-row{width:54%!important}
        .battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-skill-deck,.battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-pouch,.battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-summon{left:5%!important;width:67%!important}
        .battle2-modern[data-formation-stage="true"]:not([data-formation-tray="closed"]) .battle-live-skill-details{left:73%!important;width:22%!important}
      }
    `;
    document.head.appendChild(style);
  }

  function runAlphaBattleModern33000Diagnostics(){
    const source=enhanceBattle2DOM33000.toString();
    const summary=getBattleSkillYouthSummary33000.toString();
    const checks={
      patchId:PATCH_ID==="alpha_battle_modern_33000_2026_09_23_formation_stage",
      formationUsesDeploymentTruth:String(deployedFormation33000).includes("getBattleDeploymentParticipant")&&String(deployedFormation33000).includes("slot<=4"),
      adaptiveFormationModes:String(formationMode33000).includes('"duel"')&&String(formationMode33000).includes('"wedge"')&&String(formationMode33000).includes('"arc"'),
      exactThreePrimaryFamilies:String(installFormationDock33000).includes('"SKILLS"')&&String(installFormationDock33000).includes('"ITEMS"')&&String(installFormationDock33000).includes('"SUMMONS"')&&String(installFormationDock33000).includes("primary.length===3"),
      withdrawPreservedOutsidePrimaryDock:String(installFormationDock33000).includes("battle2-formation-withdraw")&&typeof invokeBattleWithdrawAction==="function",
      contextualTargetFocus:String(selectedFormationTarget33000).includes("selectedTargetRef")&&String(formationNodeForRef33000).includes("participantId"),
      formationDoesNotWriteSemantics:String(installFormationStage33000).includes("semanticWrite:false"),
      hoverLearns:source.includes("enhanceBattleSkillCards33000")&&previewBattlePreparedSkill33000.toString().includes("battle-live-skill-details"),
      clickStillUsesExistingCommitPath:typeof activateBattlePreparedSkillCard==="function",
      youthReadingContract:YOUTH_READING_TARGET==="12-13"&&summary.includes("Hit one enemy")&&summary.includes("This does not deal damage"),
      resolverNotReplaced:!source.includes("resolveBattle")&&!source.includes("applyBattleDamage")&&!source.includes("commitBattle"),
      compactTicker:typeof toggleBattle2CombatLog33000==="function"&&latestBattleFeedText33000.toString().includes("battle-runtime-log-line"),
      fullLogStillAvailable:toggleBattle2CombatLog33000.toString().includes("battle2-log-open"),
      transientStateChips:getVisibleBattleStatuses33000.toString().includes("transientStates"),
      sharedPerformanceProjection:String(battleEvidence33000).includes("runtime.evidence"),
      exactTargetFromEvidence:String(resolveBattlePerformanceProjection33000).includes("targetRef")&&String(resolveBattlePerformanceProjection33000).includes("exactTarget"),
      resultGrammar:["HIT","MISS","EVADE","GUARD","BLOCK","SUBSTITUTION","DEFEAT"].every(token=>String(resultClass33000).includes(token)),
      performanceClassVocabulary:BATTLE_PRESENTATION_CLASSES_33000.length===16,
      noResolverSemanticsInPerformance:!String(resolveBattlePerformanceProjection33000).includes("resolveBattle"+"DamagePacket")&&!String(installBattlePerformance33000).includes("recordBattle"+"Evidence"),
      battlePortraitProjection:String(portrait33000).includes("resolveUIPortraitProjection")&&String(portrait33000).includes("resolveBattleEnemyPortraitProjection"),
      performanceUsesCanonicalCombatants:String(battlePerformanceRoleNode33000).includes("battle-live-active-card-player")&&String(battlePerformanceRoleNode33000).includes("battle-live-active-card-enemy"),
      exactParticipantRoleLookup:String(battlePerformanceRoleNode33000).includes("participantId")&&String(battlePerformanceRoleNode33000).includes("getBattleDeploymentParticipant")&&String(battlePerformanceRoleNode33000).includes("data-slot"),
      performanceDoesNotDuplicatePortraits:!String(battlePerformanceMarkup33000).includes("actorPortrait")&&!String(battlePerformanceMarkup33000).includes("targetPortrait")&&!String(battlePerformanceMarkup33000).includes("<img"),
      resultFeedbackAttachedToExactTarget:String(applyBattlePerformanceRoles33000).includes("targetNode.appendChild(chip)")&&String(battlePerformanceResultChip33000).includes("AUTHORITATIVE STATE UPDATED"),
      performanceSettleIsActionScoped:String(installBattlePerformance33000).includes("host.dataset.actionId===p.actionId")&&String(clearBattlePerformanceRoles33000).includes("battle2-performance-active")&&String(installBattlePerformance33000).includes("920"),
      stableFormationMotion:installStyle.toString().includes("Final Kakashi Golden / Formation Stage motion policy")&&installStyle.toString().includes("transition:none!important;animation:none!important;will-change:auto!important")&&installStyle.toString().includes(".battle2-performance-result-chip"),
      playerCardNamesSuppressed:installStyle.toString().includes(".battle-live-active-card-player .battle-live-active-nameplate{display:none!important}")&&installStyle.toString().includes(".battle-live-roster-player .battle-live-roster-name{display:none!important}"),
      confrontationPLLaneAligned:installStyle.toString().includes('data-formation-mode="duel"] .battle-live-power-player')&&installStyle.toString().includes("left:43.5%!important")&&installStyle.toString().includes("left:56.5%!important"),
      topHudStackSeparated:installStyle.toString().includes(".battle2-performance-host{left:43%!important;right:43%!important;top:1.5%!important;height:4.8%!important}")&&installStyle.toString().includes(".battle2-live-ticker{left:35%!important;top:7.2%!important;width:30%!important"),
      storyCallerPresentationSuspension:String(suspendCallerStoryPresentation33000).includes("markStoryPresentationHidden33900")&&String(renderCombatOverlay).includes("suspendCallerStoryPresentation33000"),
      branchModesRemainExplicit:renderInspector33000.toString().includes("setSelectedBattleSkillMode"),
      evolvedQueueInSharedOwner:typeof enqueueBattlePresentationReceipt33000==="function"&&typeof getBattlePresentationQueueState33000==="function"&&String(enqueueBattlePresentationReceipt33000).includes("formationBefore"),
      evolvedQueueDoesNotResolveCombat:!String(enqueueBattlePresentationReceipt33000).includes("resolveBattleDamage")&&!String(startNextBattlePresentationReceipt33000).includes("beginBattleActionResolution"),
      evolvedSupportHydration:String(projectFormationSupports33000).includes('classList.remove("is-empty")')&&String(projectFormationSupports33000).includes("presentationAssetKind"),
      evolvedEnvironmentBinding:String(bindBattleEnvironment33000).includes("background-image")&&MENMA_EVOLVED_BACKDROP_33000==="Scene backdrops/forest_clearing_day.png",
      evolvedObjectiveBinding:MENMA_EVOLVED_OBJECTIVE_33000==="Stop the Test Subjects."&&String(installBattleObjective33000).includes("presentationObjectiveLabel"),
      evolvedTerminalPresentationGate:String(maybeCompleteTerminalPresentation33000).includes("presentationTerminalPending")&&String(hardSettleBattlePresentation33000).includes("semanticWrite:false"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
  }
  window.SC_ALPHA_BATTLE_MODERN_PATCH_ID=PATCH_ID;
  window.SC_BATTLE_PRESENTATION_33000=Object.freeze({patchId:PATCH_ID,presentationClasses:BATTLE_PRESENTATION_CLASSES_33000,browserGoldenClaimed:false});
  window.runAlphaBattleModern33000Diagnostics=runAlphaBattleModern33000Diagnostics;
})();
