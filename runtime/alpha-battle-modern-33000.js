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

  const PATCH_ID="alpha_battle_modern_33000_2026_09_22_performance";
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
    if(selected){panel.innerHTML=renderInspector33000(selected,actor);return true;}
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

  const BATTLE_PRESENTATION_CLASSES_33000=Object.freeze(["PHYSICAL_STRIKE","HEAVY_STRIKE","PROJECTILE","CHAKRA_RANGED","AREA_ATTACK","GUARD","EVADE","SUBSTITUTION","HEAL","BUFF","DEBUFF","RESTRAINT","SUMMON","ENVIRONMENTAL","TRANSFORMATION","DEFEAT"]);
  const playedBattlePerformanceKeys33000=new Set();

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
  function resolveBattlePerformanceProjection33000(){
    if(!currentBattle||!currentBattle.battleId)return null;
    const evidence=battleEvidence33000();
    const completionTypes=new Set(["skill_action_completed","enemy_authored_action_completed","item_action_completed","summon_skill_resolved_and_returned"]);
    const completion=[...evidence].reverse().find(row=>row&&row.actionId&&completionTypes.has(row.eventType));
    if(!completion)return null;
    const group=evidence.filter(row=>row&&row.actionId===completion.actionId);
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
      actorRef,targetRef,
      actorName:actor&&actor.name||actorRef&&actorRef.participantId||"ACTOR",
      targetName:target&&target.name||targetRef&&targetRef.participantId||"TARGET",
      actorPortrait:portrait33000(actorRef,actor),
      targetPortrait:portrait33000(targetRef,target),
      actionLabel:actionLabel33000(completion,group,actor),
      result,
      presentationClass:presentationClass33000(completion,group,result),
      finalDamage:totalDamage,
      beforePL:firstDamage&&Number.isFinite(Number(firstDamage.data&&firstDamage.data.remainingBattlePLBefore))?Number(firstDamage.data.remainingBattlePLBefore):null,
      afterPL:lastDamage&&Number.isFinite(Number(lastDamage.data&&lastDamage.data.remainingBattlePLAfter))?Number(lastDamage.data.remainingBattlePLAfter):null,
      exactTarget:!!(targetRef&&targetRef.side&&targetRef.participantId),
      sourceEvidenceIds:group.map(row=>row.evidenceId).filter(Boolean),
      semanticWrite:false
    };
  }
  window.resolveBattlePerformanceProjection33000=resolveBattlePerformanceProjection33000;

  function battlePerformanceMarkup33000(p){
    if(!p)return"";
    const delta=p.finalDamage>0?\`-${p.finalDamage} PL\`:p.result==="SUBSTITUTION"?"NO DIRECT HIT":"STATE CHANGE";
    const state=p.beforePL!==null&&p.afterPL!==null?\`${p.beforePL} → ${p.afterPL} PL\`:"AUTHORITATIVE STATE UPDATED";
    const substitution=p.result==="SUBSTITUTION"&&p.targetPortrait
      ?\`<img class="battle2-performance-afterimage" src="${esc(p.targetPortrait)}" alt="" aria-hidden="true">\`:"";
    return \`<section class="battle2-performance-stage" data-action-id="${esc(p.actionId)}" data-performance-class="${esc(p.presentationClass)}" data-result="${esc(p.result)}" aria-label="Latest committed Battle action">
      <div class="battle2-performance-actor" data-performance-role="actor">${p.actorPortrait?\`<img src="${esc(p.actorPortrait)}" alt="">\`:""}<span>${esc(p.actorName)}</span></div>
      <div class="battle2-performance-center"><small>ACTION</small><strong>${esc(p.actionLabel)}</strong><b>${esc(p.result)}</b><em>${esc(delta)}</em><span>${esc(state)}</span></div>
      <div class="battle2-performance-target" data-performance-role="target">${p.targetPortrait?\`<img src="${esc(p.targetPortrait)}" alt="">\`:""}${substitution}<span>${esc(p.targetName)}</span></div>
    </section>\`;
  }
  function installBattlePerformance33000(stage){
    if(!stage)return null;
    const p=resolveBattlePerformanceProjection33000();
    let host=stage.querySelector(".battle2-performance-host");
    if(!host){host=document.createElement("div");host.className="battle2-performance-host";stage.appendChild(host);}
    if(!p){host.replaceChildren();delete host.dataset.actionId;return null;}
    const key=p.battleId+":"+p.actionId;
    if(host.dataset.actionId!==p.actionId){
      host.dataset.actionId=p.actionId;
      host.innerHTML=battlePerformanceMarkup33000(p);
    }
    const lane=host.querySelector(".battle2-performance-stage");
    if(lane){
      const played=playedBattlePerformanceKeys33000.has(key);
      lane.classList.toggle("is-playing",!played);
      lane.classList.toggle("is-settled",played);
      if(!played){
        playedBattlePerformanceKeys33000.add(key);
        setTimeout(()=>{if(lane.isConnected){lane.classList.remove("is-playing");lane.classList.add("is-settled");}},620);
      }
    }
    return p;
  }
  window.installBattlePerformance33000=installBattlePerformance33000;

  function enhanceBattle2DOM33000(container){
    if(typeof document==="undefined")return false;
    const stage=(container&&container.querySelector&&container.querySelector(".alpha-code-battle-stage"))||document.querySelector(".alpha-code-battle-stage");
    if(!stage)return false;
    stage.classList.add("battle2-modern");
    enhanceBattleSkillCards33000(stage);
    installBattleTicker33000(stage);
    installBattleInteractionHint33000(stage);
    installBattlePerformance33000(stage);
    clearBattleSkillPreview33000();
    return true;
  }
  window.enhanceBattle2DOM33000=enhanceBattle2DOM33000;

  const priorRenderCombatOverlay33000=renderCombatOverlay;
  renderCombatOverlay=function renderCombatOverlayModern33000(container){
    const result=priorRenderCombatOverlay33000.apply(this,arguments);
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
      .battle2-performance-host{position:absolute;left:3%;right:3%;top:9.5%;height:49%;z-index:22;pointer-events:none;overflow:hidden}
      .battle2-performance-stage{position:absolute;inset:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(210px,24%) minmax(0,1fr);align-items:center;gap:2%;isolation:isolate}
      .battle2-performance-actor,.battle2-performance-target{position:relative;height:94%;display:flex;align-items:flex-end;justify-content:center;filter:drop-shadow(0 22px 30px rgba(0,0,0,.52));transform:translate3d(0,0,0)}
      .battle2-performance-actor img,.battle2-performance-target>img:not(.battle2-performance-afterimage){max-width:76%;height:92%;object-fit:contain;object-position:center bottom}
      .battle2-performance-actor span,.battle2-performance-target span{position:absolute;bottom:2%;padding:5px 9px;border:1px solid rgba(214,174,77,.5);background:rgba(2,8,12,.84);color:#ece1c8;font-size:8px;font-weight:900;letter-spacing:.1em}
      .battle2-performance-center{align-self:center;display:flex;min-height:150px;flex-direction:column;align-items:center;justify-content:center;padding:12px;border-top:1px solid rgba(217,176,77,.22);border-bottom:1px solid rgba(217,176,77,.22);background:radial-gradient(circle,rgba(20,50,57,.52),rgba(2,8,12,.12) 70%);text-align:center}
      .battle2-performance-center small{color:#5fd9e2;font-size:7px;font-weight:900;letter-spacing:.16em}.battle2-performance-center strong{margin-top:7px;color:#f0e4ca;font:900 clamp(14px,1.25vw,20px)/1.08 Georgia,serif}
      .battle2-performance-center b{margin-top:9px;color:#e4b956;font-size:clamp(13px,1.15vw,19px);letter-spacing:.15em}.battle2-performance-center em{margin-top:5px;color:#d7e1df;font-style:normal;font-size:9px;font-weight:900}.battle2-performance-center span{margin-top:4px;color:#748991;font-size:8px;font-weight:800;letter-spacing:.05em}
      .battle2-performance-afterimage{position:absolute;left:23%;bottom:2%;height:86%;max-width:72%;object-fit:contain;opacity:.42;filter:grayscale(.35) brightness(1.35);transform:translateX(18%)}
      .battle2-performance-stage.is-playing[data-performance-class="PHYSICAL_STRIKE"] .battle2-performance-actor,.battle2-performance-stage.is-playing[data-performance-class="HEAVY_STRIKE"] .battle2-performance-actor{animation:battle2ActorStrike33000 .42s cubic-bezier(.3,.75,.2,1) both}
      .battle2-performance-stage.is-playing[data-performance-class="PROJECTILE"] .battle2-performance-actor,.battle2-performance-stage.is-playing[data-performance-class="CHAKRA_RANGED"] .battle2-performance-actor{animation:battle2ActorCast33000 .42s ease both}
      .battle2-performance-stage.is-playing[data-result="HIT"] .battle2-performance-target,.battle2-performance-stage.is-playing[data-result="GUARD"] .battle2-performance-target{animation:battle2TargetImpact33000 .38s ease both}
      .battle2-performance-stage.is-playing[data-result="SUBSTITUTION"] .battle2-performance-target{animation:battle2Substitution33000 .48s ease both}
      .battle2-performance-stage.is-playing[data-result="DEFEAT"] .battle2-performance-target{animation:battle2Defeat33000 .56s ease both}
      .battle2-performance-stage.is-playing[data-result="EVADE"] .battle2-performance-target,.battle2-performance-stage.is-playing[data-result="MISS"] .battle2-performance-target{animation:battle2Evade33000 .38s ease both}
      @keyframes battle2ActorStrike33000{0%{transform:translateX(0)}55%{transform:translateX(12%) scale(1.025)}100%{transform:translateX(5%)}}
      @keyframes battle2ActorCast33000{0%{transform:scale(1)}45%{transform:scale(1.04);filter:brightness(1.22)}100%{transform:scale(1)}}
      @keyframes battle2TargetImpact33000{0%{transform:translateX(0)}45%{transform:translateX(4.5%) rotate(1deg)}100%{transform:translateX(1%)}}
      @keyframes battle2Substitution33000{0%{opacity:1;transform:translateX(0)}48%{opacity:.25;transform:translateX(7%)}100%{opacity:1;transform:translateX(-2%)}}
      @keyframes battle2Defeat33000{from{opacity:1;transform:translateY(0)}to{opacity:.42;transform:translateY(13%);filter:saturate(.4) brightness(.6)}}
      @keyframes battle2Evade33000{0%{transform:translateX(0)}45%{transform:translateX(8%)}100%{transform:translateX(3%)}}
      @media(prefers-reduced-motion:reduce){.battle2-performance-stage.is-playing .battle2-performance-actor,.battle2-performance-stage.is-playing .battle2-performance-target{animation:none!important}.battle2-performance-stage.is-playing .battle2-performance-center{animation:battle2ReducedReceipt33000 .16s ease both}@keyframes battle2ReducedReceipt33000{from{opacity:.62}to{opacity:1}}}
      @media(max-width:1100px){.battle2-modern .battle-live-skill-deck,.battle2-modern .battle-live-pouch{width:61%!important}.battle2-modern .battle-live-skill-details{left:65.5%!important;width:31%!important}.battle2-live-ticker{left:37%!important;width:26%!important}.battle2-action-hint{display:none}}
    `;
    document.head.appendChild(style);
  }

  function runAlphaBattleModern33000Diagnostics(){
    const source=enhanceBattle2DOM33000.toString();
    const summary=getBattleSkillYouthSummary33000.toString();
    const checks={
      patchId:PATCH_ID==="alpha_battle_modern_33000_2026_09_12",
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
      performanceClassVocabulary:BATTLE_PRESENTATION_CLASSES_33000.length===17,
      noResolverSemanticsInPerformance:!String(resolveBattlePerformanceProjection33000).includes("resolveBattleDamagePacket")&&!String(installBattlePerformance33000).includes("recordBattleEvidence"),
      battlePortraitProjection:String(portrait33000).includes("resolveUIPortraitProjection")&&String(portrait33000).includes("resolveBattleEnemyPortraitProjection"),
      branchModesRemainExplicit:renderInspector33000.toString().includes("setSelectedBattleSkillMode"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
  }
  window.SC_ALPHA_BATTLE_MODERN_PATCH_ID=PATCH_ID;
  window.SC_BATTLE_PRESENTATION_33000=Object.freeze({patchId:PATCH_ID,presentationClasses:BATTLE_PRESENTATION_CLASSES_33000,browserGoldenClaimed:false});
  window.runAlphaBattleModern33000Diagnostics=runAlphaBattleModern33000Diagnostics;
})();
