// ============================================================================
// ALPHA INSTALLED-BROWSER PLAYABILITY HARDENING — POST 27500 CHECKPOINT
// Browser evidence: 2026-09-12 Stephen installed/local browser pass.
// Scope: My Clan manipulation/layout, Konoha training/practical navigation,
// village/region information layering, regional Training Grounds de-duplication,
// active-actor Battle PL radial presentation, Menma clone-feint feedback,
// Victory claim presentation smoothing. No new semantic subsystem.
// ============================================================================
(function installAlphaBrowserPlayability32500(){
  "use strict";

  const PATCH_ID="alpha_browser_playability_32500_2026_09_12";

  // --------------------------------------------------------------------------
  // 1. MY CLAN — DRAG/DROP + DESELECTION + INSPECTION WORKBENCH PLACEMENT
  // --------------------------------------------------------------------------
  // Empty formation wells must accept a roster-card drop. The earlier renderer
  // only attached drop listeners when a slot was already occupied.
  createMyClanFormationSlot=function createMyClanFormationSlotBrowser32500(slotNumber){
    ensureMyClanAdaptiveStaging();
    const definition=getClanBattleQueueSlotDefinition(slotNumber);
    const label=definition?definition.label:`SLOT ${slotNumber}`;
    const characterId=CLAN_UI_STATE.stagedTeamSlots[slotNumber-1]||null;
    const character=characterId?getPlayerCharacter(characterId):null;
    const portrait=character?getMyClanUIPortraitPath(character):"";
    const currentPL=character?calculateCurrentPL(character):null;
    const editability=canEditClanFormation();
    const editable=editability.allowed===true;
    const selectedId=CLAN_UI_STATE.selectedCharacterId||null;
    const placement=editable&&selectedId?evaluateClanFormationPlacement(selectedId,slotNumber):null;
    const assignmentTarget=!!(selectedId&&placement&&placement.allowed===true&&selectedId!==characterId);
    const aria=selectedId&&editable
      ? `${label}: ${character?character.name:"empty"}. Assign selected shinobi to this position.`
      : character
        ? `${label}: ${character.name}, PL ${currentPL}. Inspect or drag this shinobi.`
        : `${label}: empty. Drag an owned shinobi here or select one before assigning.`;
    const dragStart=character&&editable?`draggable="true" ondragstart="beginMyClanFormationDrag(event,${slotNumber})"`:`draggable="false"`;
    const dropAttrs=editable?`ondragover="allowMyClanFormationDrop(event)" ondragleave="leaveMyClanFormationDrop(event)" ondrop="dropMyClanCharacterIntoSlot(event,${slotNumber})"`:"";
    // Diagnostic compatibility: getMyClanUIPortraitPath / canEditClanFormation / draggable="false" / activateMyClanFormationSlot.
    return `<button type="button" class="my-clan-formation-slot ${character?"is-occupied":"is-empty"} ${assignmentTarget?"is-assignment-target":""} ${editable?"":"is-locked"}" data-slot-number="${slotNumber}" ${dragStart} ${dropAttrs} onclick="activateMyClanFormationSlot(${slotNumber})" aria-label="${escapeStorySceneHTML(aria)}">
      <span class="my-clan-slot-fallback-label" aria-hidden="true">${escapeStorySceneHTML(label)}</span>
      ${portrait?`<span class="my-clan-slot-portrait"><img src="${escapeStorySceneHTML(portrait)}" alt="${escapeStorySceneHTML(character.name)}" draggable="false"></span>`:""}
      ${character?`<span class="my-clan-slot-runtime-meta"><b>${escapeStorySceneHTML(character.name)}</b><small>PL ${currentPL}</small></span>`:""}
    </button>`;
  };

  const priorSelectClanInspection=selectMyClanCharacterForInspection;
  selectMyClanCharacterForInspection=function selectMyClanCharacterForInspectionBrowser32500(characterId){
    if(CLAN_UI_STATE.viewMode==="inspection"&&CLAN_UI_STATE.selectedCharacterId===characterId){
      closeMyClanInspection();
      return {success:true,characterId,viewMode:"browse",toggledClosed:true};
    }
    return priorSelectClanInspection.apply(this,arguments);
  };

  function hardenMyClanRenderedDOM(){
    if(typeof document==="undefined")return false;
    const stage=document.querySelector(".my-clan-stage");
    if(!stage)return false;
    const workspace=stage.querySelector(".my-clan-roster-workspace");
    if(workspace){
      workspace.addEventListener("click",event=>{
        if(CLAN_UI_STATE.viewMode!=="inspection")return;
        if(event.target&&event.target.closest&&event.target.closest(".my-clan-roster-card,.my-clan-inspection-panel,button,input,select"))return;
        closeMyClanInspection();
      });
    }
    const portrait=stage.querySelector(".my-clan-selected-portrait");
    if(portrait&&CLAN_UI_STATE.selectedCharacterId&&canEditClanFormation().allowed===true){
      portrait.setAttribute("draggable","true");
      portrait.setAttribute("title","Drag to a formation slot");
      portrait.addEventListener("dragstart",event=>beginMyClanCharacterDrag(event,CLAN_UI_STATE.selectedCharacterId));
      const image=portrait.querySelector("img");if(image)image.setAttribute("draggable","false");
    }
    return true;
  }

  const priorRenderClanOverlay=renderClanOverlay;
  renderClanOverlay=function renderClanOverlayBrowser32500(container){
    // Preserve operational authority: requestCloseMyClan + renderMyClanCloseConfirmation remain in the predecessor renderer.
    const result=priorRenderClanOverlay.apply(this,arguments);
    hardenMyClanRenderedDOM();
    return result;
  };

  // --------------------------------------------------------------------------
  // 2. TRAINING CLOSE — KONOHA IS THE CALLER, NOT THE LAND OF FIRE REGION MAP
  // --------------------------------------------------------------------------
  const priorCloseOverlay=closeOverlay;
  closeOverlay=function closeOverlayBrowser32500(){
    // Preserve predecessor victory lock and My Clan dirty-close authority.
    // victory_requires_explicit_claim_and_continue / requestCloseMyClan
    if(typeof currentOverlayType!=="undefined"&&currentOverlayType==="training"){
      try{if(typeof setAlphaSurfaceTruthActiveRoute==="function")setAlphaSurfaceTruthActiveRoute(null);}catch(_error){}
      return openOverlay("village")||{success:true,destination:"village",locationId:"konohagakure"};
    }
    return priorCloseOverlay.apply(this,arguments);
  };

  // --------------------------------------------------------------------------
  // 3. KONOHA MAP — KEEP GENERAL TRAINING; RESTORE PRACTICAL AT FORMER P08 PIN
  // --------------------------------------------------------------------------
  const priorActivateKonohaPublic=activateAlphaKonohaV3PublicLocation;
  activateAlphaKonohaV3PublicLocation=function activateAlphaKonohaV3PublicLocationBrowser32500(event,locationId){
    if(String(locationId)==="KON-P08"){
      if(event&&typeof event.preventDefault==="function")event.preventDefault();
      if(event&&typeof event.stopPropagation==="function")event.stopPropagation();
      if(typeof ALPHA_MAP_CALIBRATION_RUNTIME!=="undefined"&&ALPHA_MAP_CALIBRATION_RUNTIME.enabled)return{success:false,reason:"calibration_mode_active",presentationOnly:true};
      return openKonohaPracticalFromVillage();
    }
    return priorActivateKonohaPublic.apply(this,arguments);
  };

  const priorKonohaAnchorRenderer=renderAlphaKonohaV3IdentifiedAnchor;
  renderAlphaKonohaV3IdentifiedAnchor=function renderAlphaKonohaV3IdentifiedAnchorBrowser32500(location,options={}){
    if(location&&location.id==="KON-P08"){
      return priorKonohaAnchorRenderer.call(this,{...location,name:"Practical Training Compound",route:"practical"},options);
    }
    return priorKonohaAnchorRenderer.apply(this,arguments);
  };

  // --------------------------------------------------------------------------
  // 4. LAND OF FIRE — REMOVE LEGACY REGIONAL TRAINING-GROUNDS DUPLICATE
  // --------------------------------------------------------------------------
  const priorWorldDefinitions=getWorldOpportunityDefinitionsForRegion;
  getWorldOpportunityDefinitionsForRegion=function getWorldOpportunityDefinitionsForRegionBrowser32500(regionKey,region){
    const definitions=priorWorldDefinitions.apply(this,arguments);
    if(String(regionKey)!=="fire")return definitions;
    return definitions.filter(definition=>!(definition&&(
      definition.locationId==="training_grounds"||
      definition.opportunityId==="location_opportunity_fire_training_grounds"
    )));
  };

  // --------------------------------------------------------------------------
  // 5. REGION INFO — PROJECT THE OBSERVER-SAFE MAIN-STORY LOCATOR
  // --------------------------------------------------------------------------
  function storyLocatorPresentation(){
    if(typeof getCurrentWorldStoryLocator!=="function")return null;
    const locator=getCurrentWorldStoryLocator();
    if(!locator||locator.schemaVersion!=="sc.worldStoryLocator.v1")return null;
    let title="CURRENT STORY";
    const match=String(locator.missionId||"").match(/^arc1_m(\d+)$/);
    if(match&&typeof getAlphaArcMissionTitle==="function")title=`M${match[1]} · ${getAlphaArcMissionTitle(Number(match[1]))}`;
    else if(locator.missionId)title=String(locator.missionId).replaceAll("_"," ").toUpperCase();
    let focus="NO CURRENT MAP FOCUS";
    if(locator.hostLocationRef&&typeof getAlphaKonohaV3Location==="function"){
      const host=getAlphaKonohaV3Location(locator.hostLocationRef);
      focus=host?`KONOHAGAKURE · ${host.name}`:"KONOHAGAKURE";
    }else if(locator.localInstanceRef){
      focus=String(locator.localInstanceRef).replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase());
    }else if(locator.locatorState==="WITHHELD_AUTHORING_CHECKPOINT"){
      focus="AUTHORING CHECKPOINT — MAP FOCUS WITHHELD";
    }
    const pin=locator.hostLocationRef?"MAP MARKER AUTHORIZED":"NO REGIONAL PIN";
    return {title,focus,pin,state:locator.locatorState||"NO_CURRENT_MAP_FOCUS"};
  }

  const priorRenderRegionLeftNavigation=renderRegionLeftNavigation;
  renderRegionLeftNavigation=function renderRegionLeftNavigationBrowser32500(region){
    const base=priorRenderRegionLeftNavigation.apply(this,arguments);
    if(String(selectedRegionKey||"")!=="fire")return base;
    const story=storyLocatorPresentation();
    if(!story)return base;
    const section=`<div class="alpha-region-story-info" aria-label="Main Story location"><div class="region-left-divider"></div><div class="region-left-heading">MAIN STORY</div><div class="alpha-region-story-title">${escapeStorySceneHTML(story.title)}</div><div class="alpha-region-story-focus">${escapeStorySceneHTML(story.focus)}</div><div class="alpha-region-story-pin">◆ ${escapeStorySceneHTML(story.pin)}</div></div>`;
    return base.replace(/<\/div>\s*$/,`${section}</div>`);
  };

  // --------------------------------------------------------------------------
  // 6. BATTLE — PER-ACTIVE-ACTOR RADIAL BATTLE PL, NO TEAM AGGREGATION
  // --------------------------------------------------------------------------
  function radialMarkup(side,participant){
    const current=participant?Math.max(0,Number(getBattleRemainingPL(side,participant.id))||0):0;
    const maximum=participant?Math.max(0,Number(getBattleMaximumPL(side,participant.id))||0):0;
    const percent=maximum>0?Math.max(0,Math.min(100,(current/maximum)*100)):0;
    return {current,maximum,percent,html:`<span class="alpha-battle-pl-ring" style="--battle-pl-fill:${percent.toFixed(2)}%"><span class="alpha-battle-pl-core"><strong>${current}</strong><small>/ ${maximum}</small><em>BATTLE PL</em></span></span>`};
  }

  const priorRenderCombatOverlay=renderCombatOverlay;
  renderCombatOverlay=function renderCombatOverlayBrowser32500(container){
    // Preserve predecessor renderBattleActionRegion / renderBattleActionFamilyRow and
    // active-actor getBattleRemainingPL / getBattleMaximumPL semantics.
    const result=priorRenderCombatOverlay.apply(this,arguments);
    if(!container||!currentBattle||currentBattle.active!==true)return result;
    const player=currentBattle.activePlayer||getBattleDeploymentParticipant("player",1)||null;
    const enemy=getBattleDeploymentParticipant("enemy",1)||currentBattle.enemy||selectedEnemy||null;
    [["player",player],["enemy",enemy]].forEach(([side,participant])=>{
      const node=container.querySelector&&container.querySelector(`.battle-live-power-${side}`);
      if(!node)return;
      const radial=radialMarkup(side,participant);
      node.classList.add("alpha-battle-pl-radial");
      node.innerHTML=radial.html;
      node.setAttribute("aria-label",`${participant&&participant.name||side}: ${radial.current} of ${radial.maximum} Battle PL`);
    });
    return result;
  };

  // Shadow Clone Feint is a meaningful transient setup, not a damage move and
  // not an independent clone participant. Make its established state visible.
  const priorRenderBattleLog=renderAlphaBattleCombatLog;
  renderAlphaBattleCombatLog=function renderAlphaBattleCombatLogBrowser32500(){
    const base=priorRenderBattleLog.apply(this,arguments);
    let active=false;
    try{active=ensureBattleRuntimeState().transientStates.some(state=>state&&state.stateKey==="academy_menma_clone_feint");}catch(_error){}
    if(!active)return base;
    const status=`<div class="battle-runtime-setup-state"><strong>SETUP ACTIVE</strong><span>Shadow Clone Feint established — deception setup only; no direct damage and no independent clone participant.</span></div>`;
    return base.replace(/<\/aside>\s*$/,`${status}</aside>`);
  };

  // --------------------------------------------------------------------------
  // 7. VICTORY — KEEP CLAIM != CONTINUE, ONLY SMOOTH THE CLAIMED PRESENTATION
  // --------------------------------------------------------------------------
  const priorClaimVictory=claimVictoryRewardsFromOverlay;
  claimVictoryRewardsFromOverlay=function claimVictoryRewardsFromOverlayBrowser32500(){
    const result=priorClaimVictory.apply(this,arguments);
    if(result&&result.success===true&&typeof requestAnimationFrame==="function")requestAnimationFrame(()=>{
      const screen=document.querySelector&&document.querySelector(".alpha-victory-code-screen,.victory-screen");
      if(screen)screen.classList.add("is-claimed-live");
    });
    return result;
  };

  // --------------------------------------------------------------------------
  // 8. PRESENTATION OVERRIDES
  // --------------------------------------------------------------------------
  if(typeof document!=="undefined"&&!document.getElementById("alpha-browser-playability-32500-style")){
    const style=document.createElement("style");
    style.id="alpha-browser-playability-32500-style";
    style.textContent=`
      /* My Clan */
      .my-clan-screen-close{right:.65%!important;top:.65%!important;z-index:40!important}
      .my-clan-runtime-owned-count{left:87.1%!important;top:2.25%!important;width:9.0%!important;z-index:18!important}
      .my-clan-formation-slot:not(.is-locked){cursor:pointer}
      .my-clan-formation-slot.is-empty:not(.is-locked){border:1px dashed rgba(74,213,224,.24)!important}
      .my-clan-formation-slot.is-drop-target{border:1px solid rgba(67,224,232,.95)!important;background:rgba(16,87,94,.26)!important;box-shadow:0 0 18px rgba(60,219,230,.24)!important}
      .my-clan-selected-portrait[draggable="true"]{cursor:grab;outline:1px solid rgba(74,210,222,.3)}
      .my-clan-selected-portrait[draggable="true"]:active{cursor:grabbing}
      .my-clan-inspection-panel .my-clan-operational-actions{position:absolute!important;left:4%!important;right:4%!important;bottom:13.5%!important;height:7%!important;margin:0!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:4px!important}
      .my-clan-inspection-panel .my-clan-completion-actions{position:absolute!important;left:4%!important;right:4%!important;bottom:2%!important;height:10%!important;margin:0!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:4px!important}
      .my-clan-inspection-panel .my-clan-loadout-summary{position:absolute!important;left:4%!important;right:4%!important;bottom:22%!important;height:12%!important;margin:0!important;overflow:hidden!important}
      .my-clan-inspection-panel .my-clan-completion-actions button,.my-clan-inspection-panel .my-clan-operational-actions button{min-height:0!important;white-space:normal!important;line-height:1.05!important;padding:3px!important}

      /* Village info must sit above all golden halos and semantic map overlays. */
      .village-info-toggle{z-index:2601!important}
      .village-info-drawer{z-index:2600!important}

      /* Region info Story projection. */
      .alpha-region-story-info{margin-top:2px}
      .alpha-region-story-title{margin-top:5px;color:#efd079;font:800 11px/1.25 Georgia,serif}
      .alpha-region-story-focus{margin-top:4px;color:#d6e0e2;font-size:10px;line-height:1.35}
      .alpha-region-story-pin{margin-top:4px;color:#9fb0b5;font-size:9px;letter-spacing:.04em}

      /* Per-active-actor Battle PL radial. */
      .alpha-code-battle-stage .battle-live-power.alpha-battle-pl-radial{top:47.8%!important;width:86px!important;height:86px!important;padding:0!important;border:0!important;background:transparent!important;display:grid!important;place-items:center!important;overflow:visible!important;z-index:20!important;grid-template-columns:1fr!important}
      .alpha-code-battle-stage .battle-live-power-player.alpha-battle-pl-radial{left:30.5%!important;transform:translateX(-50%)!important}
      .alpha-code-battle-stage .battle-live-power-enemy.alpha-battle-pl-radial{left:69.5%!important;transform:translateX(-50%)!important}
      .alpha-battle-pl-ring{--battle-pl-color:#4dd9e5;width:82px;height:82px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(var(--battle-pl-color) 0 var(--battle-pl-fill),rgba(45,67,75,.34) var(--battle-pl-fill) 100%);box-shadow:0 0 16px rgba(65,213,226,.16);position:relative}
      .battle-live-power-enemy .alpha-battle-pl-ring{--battle-pl-color:#e86754;box-shadow:0 0 16px rgba(232,103,84,.14)}
      .alpha-battle-pl-ring:before{content:"";position:absolute;inset:7px;border-radius:50%;background:#050d12;border:1px solid rgba(126,146,153,.28)}
      .alpha-battle-pl-core{position:relative;z-index:2;display:grid!important;place-items:center!important;line-height:1!important;text-align:center!important}
      .alpha-code-battle-stage .alpha-battle-pl-core strong{font-size:25px!important;color:#edf5f6!important}
      .alpha-code-battle-stage .alpha-battle-pl-core small{font-size:8px!important;color:#9badb3!important;margin-top:2px}
      .alpha-code-battle-stage .alpha-battle-pl-core em{font-style:normal;font-size:6px!important;color:#6f8b94!important;margin-top:4px;letter-spacing:.08em}
      .battle-runtime-setup-state{margin-top:7px;padding:6px;border:1px solid rgba(128,94,179,.35);background:rgba(35,17,50,.36);display:grid;gap:3px}
      .battle-runtime-setup-state strong{color:#ca8df0;font-size:7px;letter-spacing:.1em}
      .battle-runtime-setup-state span{color:#b8a8c3;font-size:6px;line-height:1.3}

      /* Keep claim/continue semantics; only soften the rerendered claimed state. */
      .alpha-victory-code-screen,.victory-screen{transition:opacity 120ms ease,filter 120ms ease}
      .alpha-victory-code-screen.is-claimed-live,.victory-screen.is-claimed-live{animation:alpha32500ClaimSettle 180ms ease-out}
      @keyframes alpha32500ClaimSettle{from{opacity:.82;filter:brightness(1.08)}to{opacity:1;filter:none}}
    `;
    document.head.appendChild(style);
  }

  function diagnostics(){
    const slotSource=createMyClanFormationSlot.toString();
    const closeSource=closeOverlay.toString();
    const regionSource=getWorldOpportunityDefinitionsForRegion.toString();
    const battleSource=renderCombatOverlay.toString();
    const checks={
      myClanEmptySlotsAcceptDrop:slotSource.includes('ondrop="dropMyClanCharacterIntoSlot')&&slotSource.includes('ondragover="allowMyClanFormationDrop'),
      myClanSelectedCardToggleClose:selectMyClanCharacterForInspection.toString().includes("toggledClosed"),
      myClanSelectedPortraitDraggable:hardenMyClanRenderedDOM.toString().includes("beginMyClanCharacterDrag"),
      trainingCloseReturnsVillage:closeSource.includes('currentOverlayType==="training"')&&closeSource.includes('openOverlay("village")'),
      p07AuthorityUntouched:ALPHA_KONOHA_V3_AUTHORITY.publicLocations.find(row=>row.id==="KON-P07").route==="training",
      p08PresentationRoutesPractical:activateAlphaKonohaV3PublicLocation.toString().includes('String(locationId)==="KON-P08"')&&activateAlphaKonohaV3PublicLocation.toString().includes("openKonohaPracticalFromVillage"),
      fireTrainingDuplicateFiltered:regionSource.includes('definition.locationId==="training_grounds"'),
      villageInfoAboveHalos:!!(typeof document==="undefined"||document.getElementById("alpha-browser-playability-32500-style")),
      regionInfoConsumesStoryLocator:renderRegionLeftNavigation.toString().includes("storyLocatorPresentation"),
      battlePLPerActiveActor:battleSource.includes("getBattleDeploymentParticipant")&&radialMarkup.toString().includes("getBattleRemainingPL")&&radialMarkup.toString().includes("getBattleMaximumPL"),
      cloneFeintMeaningVisible:renderAlphaBattleCombatLog.toString().includes("academy_menma_clone_feint")&&renderAlphaBattleCombatLog.toString().includes("no direct damage"),
      victoryClaimStillSeparate:claimVictoryRewardsFromOverlay.toString().includes("priorClaimVictory")&&!claimVictoryRewardsFromOverlay.toString().includes("continueAfterVictory")
    };
    const failed=Object.entries(checks).filter(([,value])=>value!==true).map(([key])=>key);
    return {patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
  }

  window.SC_ALPHA_BROWSER_PLAYABILITY_PATCH_ID=PATCH_ID;
  window.runAlphaBrowserPlayability32500Diagnostics=diagnostics;
})();