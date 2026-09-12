// ============================================================================
// ALPHA BROWSER POLISH — POST 32600
// Browser evidence: 2026-09-12 Stephen installed/local browser pass.
// Scope:
// - Skill-card click executes directly when normal authored availability allows;
// - explicit branch/mode Skills execute when the required mode is chosen;
// - Skill Details carries a readable effect summary and no USE SKILL button;
// - Battle PL numerals are optically centered inside the radial;
// - Combat Feed gets a small positioning refinement;
// - My Clan keeps drag/drop + inspection, but removes click-to-assign highlight.
// No Battle resolver, ownership, roster, or World semantic subsystem is replaced.
// ============================================================================
(function installAlphaBrowserPolish32700(){
  "use strict";

  const PATCH_ID="alpha_browser_polish_32700_2026_09_12";

  function activateBattlePreparedSkillCard(skillId){
    const selected=selectBattlePreparedSkill(skillId);
    if(!(selected&&selected.success===true))return selected;
    if(selected.branchSelectionRequired===true){
      return {...selected,awaitingExplicitMode:true,actionCommitted:false};
    }
    return confirmSelectedBattleSkill();
  }
  window.activateBattlePreparedSkillCard=activateBattlePreparedSkillCard;

  const priorSetSelectedBattleSkillMode=setSelectedBattleSkillMode;
  setSelectedBattleSkillMode=function setSelectedBattleSkillModeBrowser32700(mode){
    const result=priorSetSelectedBattleSkillMode.apply(this,arguments);
    if(!(result&&result.success===true))return result;
    const state=syncBattleActionRegionState();
    if(!(state&&state.selectedSkillId))return result;
    const committed=confirmSelectedBattleSkill();
    return {...result,autoCommitted:true,commitResult:committed};
  };

  function getBattleSkillPlainLanguageSummary(skill){
    if(!skill)return "Select a Skill to inspect its authored Battle effect.";
    const exact={
      academy_menma_chakra_knuckle:"Direct chakra-assisted strike. Attack PL 6. Stamina mitigation applies normally to the resulting Battle PL pressure.",
      academy_menma_crescent_kunai:"Direct kunai technique. Attack PL 5. Resolves as one authored damage packet against the current opponent.",
      academy_menma_guard_breaker:"Heavy direct strike. Attack PL 7. It can interact with a legitimately active authored guard condition; it does not automatically erase every defence.",
      academy_menma_shadow_clone_feint:"Creates a temporary deception/setup state against the current opponent. Deals no direct Battle PL damage and does not create a second Battle participant.",
      academy_menma_shadowstep:"Contextual reposition only. Requires a legitimate current route or movement context; it is not teleportation and deals no direct damage."
    };
    if(exact[skill.id])return exact[skill.id];
    const kind=String(skill.resolutionKind||"");
    if(kind==="direct_damage"&&Number.isFinite(Number(skill.authoredAttackPL))){
      return `Direct authored attack. Attack PL ${Number(skill.authoredAttackPL)}${skill.staminaMitigation===false?"; Stamina mitigation does not apply.":"; Stamina mitigation applies normally."}`;
    }
    if(kind==="area_damage"&&Number.isFinite(Number(skill.authoredAttackPLPerTarget))){
      return `Area attack against up to ${Number(skill.maxTargets)||1} active target${Number(skill.maxTargets)===1?"":"s"}. Attack PL ${Number(skill.authoredAttackPLPerTarget)} per target.`;
    }
    if(kind==="ratio_guard_state"&&skill.guard){
      const pct=Math.round((Number(skill.guard.preventionRatio)||0)*100);
      return `Defensive setup. Prevents ${pct}% of the next qualifying direct damage packet${skill.guard.oneUse===false?" while the authored guard remains active":" once"}.`;
    }
    if(kind==="restore_underlying_battle_pl"&&skill.restorationProfile){
      return `Restores ${Number(skill.restorationProfile.authoredAmount)||0} underlying Battle PL to the selected eligible ally. This is Battle recovery, not permanent Stat healing.`;
    }
    if(kind==="dynamic_control"&&skill.dynamicControl){
      const semantic=String(skill.dynamicControl.semanticClass||"authored control").replaceAll("_"," ");
      return `Control technique: ${semantic}. It applies only its authored control boundary and does not imply a universal stun.`;
    }
    if(kind==="categorical_evidence"&&skill.categorical){
      const boundary=String(skill.categorical.informationBoundary||"contextual authored effect").replaceAll("_"," ");
      return `Context technique. ${boundary}. Observer knowledge and additional effects are not granted automatically.`;
    }
    if(kind==="damage_with_persistent_state"&&skill.persistentState){
      return `Direct attack (Attack PL ${Number(skill.authoredAttackPL)||0}) that may establish its authored persistent state. Persistent pressure only occurs through the defined follow-up opportunities.`;
    }
    if(kind==="branch_damage"){
      return "Branch-authored attack. Choose one of the available modes below; that mode choice immediately commits the Skill using its authored target/Attack PL profile.";
    }
    if(kind==="condition_remove"&&skill.conditionRemoval){
      return `Removes the authored ${String(skill.conditionRemoval.conditionType||"condition").replaceAll("_"," ")} condition from an eligible target. It does not roll back committed history.`;
    }
    if(kind==="transient_state"){
      return "Creates the Skill's authored temporary Battle state. It does not imply direct damage unless the definition explicitly says so.";
    }
    return "Authored Battle technique. Its availability, target and effects remain governed by the current Battle resolver and specialist-defined Skill contract.";
  }
  window.getBattleSkillPlainLanguageSummary=getBattleSkillPlainLanguageSummary;

  renderBattleSelectedSkillDetails=function renderBattleSelectedSkillDetailsBrowser32700(actor,target){
    const state=syncBattleActionRegionState();
    if(state.mode!=="skills")return "";
    const skill=actor&&state.selectedSkillId?getBattlePreparedSkillDefinition(actor,state.selectedSkillId):null;
    if(!skill){
      return `<aside class="battle-live-skill-details" aria-label="Skill Details"><div class="battle-live-skill-details-title">SKILL DETAILS</div><div class="battle-live-skill-details-empty">Click a Skill card to execute it. Select a branch mode only when the Skill explicitly requires one.</div></aside>`;
    }
    const selectedTarget=state.selectedTargetRef?getBattleParticipantByIdentity(state.selectedTargetRef.side,state.selectedTargetRef.participantId):null;
    const branchModes=getBattlePreparedSkillAvailableModes(skill,actor);
    const selectedMode=state.selectedSkillOptions&&state.selectedSkillOptions.mode||null;
    const modeMarkup=branchModes.length>0
      ? `<div class="battle-live-skill-mode-prompt">CHOOSE MODE TO EXECUTE</div><div class="battle-live-skill-mode-list">${branchModes.map(mode=>`<button type="button" class="battle-live-skill-mode ${selectedMode===mode?"is-selected":""}" onclick="setSelectedBattleSkillMode('${mode}')">${String(mode).replaceAll("_"," ").toUpperCase()}</button>`).join("")}</div>`
      : `<div class="battle-live-skill-click-hint">CLICK THE SKILL CARD AGAIN TO USE IT AGAIN WHILE IT REMAINS LEGAL.</div>`;
    return `<aside class="battle-live-skill-details" aria-label="Skill Details">
      <div class="battle-live-skill-details-title">SKILL DETAILS</div>
      <strong class="battle-live-skill-details-name">${skill.displayName||getFactorySkillDisplayName(skill.id)}</strong>
      <span class="battle-live-skill-details-type">${getBattlePreparedSkillPresentationDescription(skill)}</span>
      <div class="battle-live-skill-summary">${escapeStorySceneHTML(getBattleSkillPlainLanguageSummary(skill))}</div>
      <span class="battle-live-skill-details-target">TARGET: ${selectedTarget?(selectedTarget.name||selectedTarget.id):"—"}</span>
      ${modeMarkup}
      <div class="battle-live-skill-details-actions"><button type="button" class="battle-live-cancel-skill" onclick="cancelSelectedBattleSkill()">CLEAR SELECTION</button></div>
    </aside>`;
  };

  renderTemporaryBattleSkillDeck=function renderTemporaryBattleSkillDeckBrowser32700(actor,target){
    const presentation=actor?getBattleUISkillPalettePresentation(actor):{skillIds:[],source:"none"};
    const skillIds=Array.isArray(presentation.skillIds)?presentation.skillIds:[];
    const state=syncBattleActionRegionState();
    const cards=[];
    for(let index=0;index<5;index+=1){
      const skillId=skillIds[index]||null;
      const skill=skillId?getBattlePreparedSkillDefinition(actor,skillId):null;
      if(!skill){cards.push(`<div class="battle-dev-skill-card is-empty"><span>${index===0&&skillIds.length===0?"NO AUTHORED SKILLS":"EMPTY"}</span></div>`);continue;}
      const skillDefaultTarget=getBattlePreparedSkillDefaultTarget(actor,skill);
      const availability=evaluateBattlePreparedSkillAvailability(skill,actor,skillDefaultTarget.participant);
      const selectable=availability.available===true||availability.reason==="branch_selection_required";
      const selected=state.selectedSkillId===skill.id;
      const conditionBlocked=isBattleSkillConditionBlocked(availability);
      const blockingCondition=conditionBlocked?getBattleSkillBlockingConditionPresentation(availability):null;
      const status=selected?"SELECTED":availability.available?"READY":availability.reason==="branch_selection_required"?"CHOOSE MODE":String(availability.reason||"UNAVAILABLE").replaceAll("_"," ").toUpperCase();
      const conditionSealMarkup=blockingCondition?`<span class="battle-skill-condition-seal" aria-hidden="true"><span class="battle-skill-condition-seal-symbol">◉</span><span class="battle-skill-condition-seal-headline">${blockingCondition.sealHeadline}</span><strong class="battle-skill-condition-seal-state">${blockingCondition.sealState}</strong></span>`:"";
      cards.push(`<button type="button" class="battle-dev-skill-card ${selectable?"is-ready":"is-disabled"} ${selected?"is-selected":""} ${conditionBlocked?"is-condition-blocked":""}" onclick="activateBattlePreparedSkillCard('${skill.id}')" ${selectable?"":"disabled"} ${blockingCondition?`data-blocking-condition-id="${blockingCondition.conditionId||""}"`:""} aria-pressed="${selected?"true":"false"}" title="${status}"><span class="battle-dev-skill-discipline">${skill.primaryDiscipline||"AUTHORED"}</span><strong>${skill.displayName||getFactorySkillDisplayName(skill.id)}</strong><span class="battle-dev-skill-type">${skill.actionClass||skill.type||"Technique"}</span><small>${status}</small>${conditionSealMarkup}</button>`);
    }
    return `<div class="battle-live-skill-deck" aria-label="Prepared Battle Skills" data-palette-source="${presentation.source||"unknown"}">${cards.join("")}</div>`;
  };

  function inspectMyClanFormationSlotNoAssign(slotNumber){
    ensureMyClanAdaptiveStaging();
    const characterId=CLAN_UI_STATE.stagedTeamSlots[Number(slotNumber)-1]||null;
    if(!characterId)return {success:true,reason:"empty_slot_drag_drop_only",assignmentCommitted:false};
    return selectMyClanCharacterForInspection(characterId);
  }
  window.inspectMyClanFormationSlotNoAssign=inspectMyClanFormationSlotNoAssign;

  createMyClanFormationSlot=function createMyClanFormationSlotBrowser32700(slotNumber){
    ensureMyClanAdaptiveStaging();
    const definition=getClanBattleQueueSlotDefinition(slotNumber);
    const label=definition?definition.label:`SLOT ${slotNumber}`;
    const characterId=CLAN_UI_STATE.stagedTeamSlots[slotNumber-1]||null;
    const character=characterId?getPlayerCharacter(characterId):null;
    const portrait=character?getMyClanUIPortraitPath(character):"";
    const currentPL=character?calculateCurrentPL(character):null;
    const editable=canEditClanFormation().allowed===true;
    const aria=character?`${label}: ${character.name}, PL ${currentPL}. Click to inspect or drag to move this shinobi.`:`${label}: empty. Drag an owned shinobi here.`;
    const dragStart=character&&editable?`draggable="true" ondragstart="beginMyClanFormationDrag(event,${slotNumber})"`:`draggable="false"`;
    const dropAttrs=editable?`ondragover="allowMyClanFormationDrop(event)" ondragleave="leaveMyClanFormationDrop(event)" ondrop="dropMyClanCharacterIntoSlot(event,${slotNumber})"`:"";
    return `<button type="button" class="my-clan-formation-slot ${character?"is-occupied":"is-empty"} ${editable?"":"is-locked"}" data-slot-number="${slotNumber}" ${dragStart} ${dropAttrs} onclick="inspectMyClanFormationSlotNoAssign(${slotNumber})" aria-label="${escapeStorySceneHTML(aria)}">
      <span class="my-clan-slot-fallback-label" aria-hidden="true">${escapeStorySceneHTML(label)}</span>
      ${portrait?`<span class="my-clan-slot-portrait"><img src="${escapeStorySceneHTML(portrait)}" alt="${escapeStorySceneHTML(character.name)}" draggable="false"></span>`:""}
      ${character?`<span class="my-clan-slot-runtime-meta"><b>${escapeStorySceneHTML(character.name)}</b><small>PL ${currentPL}</small></span>`:""}
    </button>`;
  };

  if(typeof document!=="undefined"&&!document.getElementById("alpha-browser-polish-32700-style")){
    const style=document.createElement("style");
    style.id="alpha-browser-polish-32700-style";
    style.textContent=`
      .alpha-code-battle-stage .alpha-battle-pl-core{transform:translateY(-1px)!important;grid-template-rows:auto auto auto!important;row-gap:0!important}
      .alpha-code-battle-stage .alpha-battle-pl-core strong{display:block!important;line-height:.88!important;margin:0!important;transform:translateY(1px)!important}
      .alpha-code-battle-stage .alpha-battle-pl-core small{display:block!important;line-height:1!important;margin-top:4px!important}
      .alpha-code-battle-stage .alpha-battle-pl-core em{display:block!important;line-height:1!important;margin-top:4px!important}
      .alpha-code-battle-stage .battle-runtime-log{left:43.05%!important;top:14.2%!important;width:13.9%!important;height:42.2%!important;padding:11px!important}
      .alpha-code-battle-stage .battle-live-skill-summary{display:block;margin-top:14px;padding:10px 11px;border:1px solid rgba(92,142,156,.24);background:rgba(7,18,24,.7);color:#cbd8dc;font-size:clamp(9px,.66vw,11px);line-height:1.48;max-width:95%}
      .alpha-code-battle-stage .battle-live-skill-click-hint,.alpha-code-battle-stage .battle-live-skill-mode-prompt{display:block;margin-top:14px;color:#6fdce6;font-size:clamp(7px,.52vw,9px);line-height:1.3;letter-spacing:.08em}
      .alpha-code-battle-stage .battle-live-skill-details-actions{justify-content:flex-end!important}
      .alpha-code-battle-stage .battle-live-cancel-skill{min-width:132px!important}
      .my-clan-formation-slot.is-assignment-target{border-color:rgba(74,213,224,.24)!important;background:transparent!important;box-shadow:none!important}
      .my-clan-formation-slot.is-assignment-target::after{content:none!important;display:none!important}
      .my-clan-roster-card.is-selected,.my-clan-roster-card[aria-pressed="true"]{filter:none!important;box-shadow:none!important;outline:none!important}
      .my-clan-formation-slot.is-empty:not(.is-locked){cursor:default!important}
      .my-clan-formation-slot.is-occupied:not(.is-locked){cursor:grab!important}
      .my-clan-formation-slot.is-occupied:not(.is-locked):active{cursor:grabbing!important}
    `;
    document.head.appendChild(style);
  }

  function diagnostics(){
    const deck=renderTemporaryBattleSkillDeck.toString();
    const details=renderBattleSelectedSkillDetails.toString();
    const clan=createMyClanFormationSlot.toString();
    const checks={
      cardClickExecutes:deck.includes("activateBattlePreparedSkillCard"),
      useSkillButtonRemoved:!details.includes("USE SKILL"),
      branchModeAutoCommits:setSelectedBattleSkillMode.toString().includes("autoCommitted:true"),
      menmaSummaries:["academy_menma_chakra_knuckle","academy_menma_crescent_kunai","academy_menma_guard_breaker","academy_menma_shadow_clone_feint","academy_menma_shadowstep"].every(id=>getBattleSkillPlainLanguageSummary({id}).length>20),
      battleResolverStillUsed:activateBattlePreparedSkillCard.toString().includes("confirmSelectedBattleSkill()"),
      noClickAssignment:clan.includes("inspectMyClanFormationSlotNoAssign")&&!clan.includes("is-assignment-target"),
      dragDropPreserved:clan.includes("beginMyClanFormationDrag")&&clan.includes("dropMyClanCharacterIntoSlot"),
      browserGoldenNotClaimed:true
    };
    const failed=Object.entries(checks).filter(([,v])=>v!==true).map(([k])=>k);
    return {patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
  }

  window.SC_ALPHA_BROWSER_POLISH_PATCH_ID=PATCH_ID;
  window.runAlphaBrowserPolish32700Diagnostics=diagnostics;
})();
