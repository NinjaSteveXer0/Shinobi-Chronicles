// ============================================================================
// ACADEMY KAKASHI BATTLE INTERACTION HOTFIX — 34500 v5
// Installed-browser evidence: 2026-09-16 Stephen Kakashi Origin replay.
//
// Contract:
//   HOVER / FOCUS = LEARN (presentation only; never selects/commits)
//   CLICK          = ACT   (reuse native Battle selection/confirmation)
//
// Browser evidence proved the rendered Kakashi deck could still fall through
// to a select-only card generation: the card became SELECTED while no Battle
// action resolved. Per-card rebinding alone is insufficient because the live
// deck can be inserted/replaced around deployment/render timing. v5 therefore
// uses one scoped document-capture delegate for the exact Kakashi Origin Battle
// surface. It resolves the rendered card to one of Kakashi's canonical five
// authored Skill IDs, suppresses competing select-only handlers, then invokes
// the existing select + confirm Battle authority exactly once.
//
// This file does NOT resolve damage, setup, control, targeting, conditions,
// Battle PL, rewards, custody, or Story outcomes. Native Battle authority does.
// Browser Golden remains unclaimed until Stephen validates the installed build.
// ============================================================================
(function installAcademyKakashiBattleInteraction34500(){
  "use strict";
  if(globalThis.SC_ALPHA_KAKASHI_BATTLE_INTERACTION_34500)return;

  const VERSION="34500-v6";
  const PATCH_ID="alpha_kakashi_battle_interaction_34500_v6_2026_09_22";
  const KAKASHI="academy_kakashi";
  const LEGACY_FIFTH_SKILL="academy_kakashi_prodigys_read";
  const SUBSTITUTION_SKILL="academy_kakashi_substitution_jutsu";
  const EXACT_KAKASHI_SKILLS=new Set([
    "academy_kakashi_kunai_quickdraw",
    "academy_kakashi_clone_feint",
    "academy_kakashi_opening_exploit",
    "academy_kakashi_wire_snare",
    SUBSTITUTION_SKILL
  ]);
  const CARD_SELECTOR=[
    ".battle-live-skill-card:not(.is-empty)",
    ".battle-dev-skill-card:not(.is-empty)",
    ".sc-battle-skill-card:not(.is-empty)",
    "[data-battle-skill-id]",
    "[data-skill-id]",
    "[onclick*='selectBattlePreparedSkill']",
    "[onclick*='activateBattlePreparedSkillCard']"
  ].join(",");
  const boundCards=new WeakSet();
  let hardenScheduled=false;
  let delegatedClickInstalled=false;
  let delegatedLearnInstalled=false;

  function battle34500(){
    try{return typeof currentBattle!=="undefined"?currentBattle:null;}catch(_error){return null;}
  }

  function activeKakashiBattle34500(){
    const battle=battle34500();
    if(!battle||battle.battleOver===true)return false;
    const dep=battle.kakashiOriginDeployment;
    if(!dep)return false;
    const controller=String(dep.controllerParticipantId||dep.controllerId||"");
    return controller===KAKASHI;
  }

  function activeActor34500(){
    const battle=battle34500();
    if(!battle)return null;
    if(typeof getBattleDeploymentParticipant==="function"){
      try{
        const participant=getBattleDeploymentParticipant("player",1);
        if(participant)return participant;
      }catch(_error){}
    }
    if(Array.isArray(battle.playerParticipants)){
      const kakashi=battle.playerParticipants.find(row=>row&&String(row.id||row.participantId||"")===KAKASHI);
      if(kakashi)return kakashi;
    }
    return battle.activePlayer||null;
  }

  function normalizeText34500(value){
    return String(value||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
  }

  function canonicalBattleSkills34500(actor){
    if(!actor||typeof getBattleUISkillPalettePresentation!=="function"||typeof getBattlePreparedSkillDefinition!=="function")return[];
    try{
      const palette=getBattleUISkillPalettePresentation(actor);
      const ids=palette&&Array.isArray(palette.skillIds)?palette.skillIds.filter(Boolean):[];
      if(!ids.length)return[];
      return ids.map(id=>{
        const definition=getBattlePreparedSkillDefinition(actor,String(id));
        if(definition&&typeof definition==="object")return Object.assign({id:String(id)},definition);
        return{id:String(id),name:String(id)};
      });
    }catch(_error){return[];}
  }

  function visibleBattleSkills34500(){
    const battle=battle34500();
    if(!battle)return[];
    const actor=activeActor34500();
    const canonical=canonicalBattleSkills34500(actor);
    if(canonical.length)return canonical;
    const pools=[
      actor&&actor.battlePreparedSkills,
      actor&&actor.preparedSkills,
      actor&&actor.skills,
      battle.battlePreparedSkills,
      battle.preparedSkills,
      battle.playerSkills,
      battle.skills
    ];
    for(const pool of pools){
      if(Array.isArray(pool)&&pool.length)return pool.filter(Boolean);
    }
    return[];
  }

  function cardLabel34500(card){
    if(!card)return"";
    const explicit=card.getAttribute&&(
      card.getAttribute("data-skill-name")
      ||card.getAttribute("aria-label")
      ||card.getAttribute("title")
    );
    if(explicit)return String(explicit).trim();
    const named=card.querySelector&&card.querySelector(".battle-live-skill-name,.battle-dev-skill-name,.skill-name,h3,h4,strong");
    return String(named&&named.textContent||card.textContent||"").trim();
  }

  function skillIdFromCard34500(card){
    if(!card)return null;

    const handler=String(
      card.getAttribute &&
      card.getAttribute("onclick") ||
      ""
    );

    const handlerMatch=handler.match(
      /(?:activateBattlePreparedSkillCard|selectBattlePreparedSkill)\(['"]([^'"]+)['"]\)/
    );

    if(handlerMatch){
      const id=String(handlerMatch[1]||"").trim();
      if(id)return id===LEGACY_FIFTH_SKILL?SUBSTITUTION_SKILL:id;
    }

    const dataset=card.dataset||{};
    const direct=String(
      dataset.skillId ||
      dataset.battleSkillId ||
      ""
    ).trim();

    if(direct)return direct===LEGACY_FIFTH_SKILL?SUBSTITUTION_SKILL:direct;

    if(card.querySelector){
      const child=card.querySelector(
        "[data-skill-id],[data-battle-skill-id]"
      );

      if(child&&child.dataset){
        const nested=String(
          child.dataset.skillId ||
          child.dataset.battleSkillId ||
          ""
        ).trim();

        if(nested)return nested===LEGACY_FIFTH_SKILL?SUBSTITUTION_SKILL:nested;
      }
    }

    const label=normalizeText34500(
      cardLabel34500(card)
    );

    if(label){
      const skill=visibleBattleSkills34500()
        .find(row=>{
          if(!row)return false;

          const names=[
            row.name,
            row.label,
            row.title,
            row.displayName,
            row.skillName
          ]
            .filter(Boolean)
            .map(normalizeText34500);

          return names.some(
            name=>
              name &&
              (
                label===name ||
                label.includes(name) ||
                name.includes(label)
              )
          );
        });

      const id=
        skill &&
        String(
          skill.id ||
          skill.skillId ||
          ""
        ).trim();

      if(id)return id;
    }

    return null;
  }

  function exactKakashiSkill34500(skillId){
    return EXACT_KAKASHI_SKILLS.has(String(skillId||""));
  }

  function renderGuide34500(skillId){
    if(
      !activeKakashiBattle34500() ||
      !exactKakashiSkill34500(skillId)
    ){
      return {
        success:false,
        reason:"kakashi_origin_battle_not_active"
      };
    }

    const id=String(skillId);

    if(
      typeof previewBattlePreparedSkill33000==="function"
    ){
      const out=
        previewBattlePreparedSkill33000(id);

      if(out!==false){
        return {
          success:true,
          mode:"modern_skill_inspector",
          skillId:id
        };
      }
    }

    const battle=battle34500();

    if(
      typeof renderTemporaryBattleSkillGuide==="function"
    ){
      if(battle){
        battle.skillGuideSkillId=id;
      }

      renderTemporaryBattleSkillGuide(id);

      return {
        success:true,
        mode:"native_skill_guide_fallback",
        skillId:id
      };
    }

    return {
      success:false,
      reason:"battle_skill_guide_unavailable"
    };
  }

  function rememberActivation34500(result,skillId,source){
    const battle=battle34500();
    if(battle){
      battle.kakashiOriginInteraction34500={
        skillId:String(skillId||""),source:String(source||"unknown"),
        success:!!(result&&result.success===true),reason:result&&result.reason||null,
        recordedAt:Date.now()
      };
    }
    return result;
  }

  function activate34500(skillId){
    if(
      !activeKakashiBattle34500() ||
      !exactKakashiSkill34500(skillId)
    ){
      return {
        success:false,
        reason:"kakashi_origin_battle_not_active"
      };
    }

    const id=String(skillId);

    if(
      typeof selectBattlePreparedSkill!=="function" ||
      typeof confirmSelectedBattleSkill!=="function"
    ){
      return rememberActivation34500(
        {
          success:false,
          reason:"battle_skill_commit_path_missing"
        },
        id,
        "select_confirm_missing"
      );
    }

    const battle=battle34500();

    const selected=
      selectBattlePreparedSkill(id);

    let actionState=null;

    try{
      actionState=
        typeof syncBattleActionRegionState==="function"
          ?syncBattleActionRegionState()
          :null;
    }catch(_error){
      actionState=null;
    }

    const selectionSucceeded=
      !!(
        selected &&
        selected.success===true
      ) ||
      String(
        actionState &&
        actionState.selectedSkillId ||
        ""
      )===id ||
      String(
        battle &&
        battle.selectedSkillId ||
        ""
      )===id;

    if(!selectionSucceeded){
      return rememberActivation34500(
        selected || {
          success:false,
          reason:"battle_skill_selection_failed"
        },
        id,
        "selection_failed"
      );
    }

    if(
      selected &&
      selected.branchSelectionRequired===true
    ){
      renderGuide34500(id);

      return rememberActivation34500(
        Object.assign(
          {},
          selected,
          {
            success:true,
            awaitingExplicitMode:true,
            actionCommitted:false
          }
        ),
        id,
        "explicit_mode_required"
      );
    }

    const committed=
      confirmSelectedBattleSkill();

    const normalized=
      committed &&
      typeof committed==="object"
        ?Object.assign(
            {},
            committed,
            {
              alpha34500DirectClick:true,
              selectedSkillId:id,
              nativeActivator:false,
              explicitSelectConfirm:true
            }
          )
        :{
            success:committed!==false,
            alpha34500DirectClick:true,
            selectedSkillId:id,
            nativeActivator:false,
            explicitSelectConfirm:true
          };

    return rememberActivation34500(
      normalized,
      id,
      "native_select_confirm"
    );
  }

  function cardIsPresentable34500(card){
    if(!card)return false;

    if(
      card.classList &&
      (
        card.classList.contains("is-empty") ||
        card.classList.contains("empty")
      )
    ){
      return false;
    }

    return true;
  }

  function authoritativeSkillAvailability34500(skillId){
    const actor=activeActor34500();

    if(
      !actor ||
      !skillId ||
      typeof getBattlePreparedSkillDefinition!=="function" ||
      typeof evaluateBattlePreparedSkillAvailability!=="function"
    ){
      return {
        known:false,
        available:false,
        reason:"battle_availability_api_missing"
      };
    }

    const skill=
      getBattlePreparedSkillDefinition(
        actor,
        String(skillId)
      );

    if(!skill){
      return {
        known:false,
        available:false,
        reason:"battle_skill_definition_missing"
      };
    }

    let target=null;

    try{
      if(typeof getBattlePreparedSkillDefaultTarget==="function"){
        const defaultTarget=
          getBattlePreparedSkillDefaultTarget(
            actor,
            skill
          );

        target=
          defaultTarget &&
          defaultTarget.participant
            ?defaultTarget.participant
            :null;
      }
    }catch(_error){
      target=null;
    }

    try{
      const result=
        evaluateBattlePreparedSkillAvailability(
          skill,
          actor,
          target
        ) || {};

      const available=
        result.available===true ||
        result.reason==="branch_selection_required";

      return {
        known:true,
        available,
        reason:result.reason||null,
        raw:result
      };
    }catch(error){
      return {
        known:false,
        available:false,
        reason:String(
          error&&error.message ||
          error ||
          "battle_availability_failed"
        )
      };
    }
  }

  function normalizeRenderedCard34500(
    card,
    skillId
  ){
    if(
      !cardIsPresentable34500(card) ||
      !exactKakashiSkill34500(skillId)
    ){
      return false;
    }

    card.dataset.skillId=String(skillId);

    const availability=
      authoritativeSkillAvailability34500(skillId);

    card.dataset.alpha34500AvailabilityKnown=
      availability.known?"true":"false";

    card.dataset.alpha34500AuthorityAvailable=
      availability.available?"true":"false";

    card.dataset.alpha34500AvailabilityReason=
      String(availability.reason||"");

    if(
      availability.known===true &&
      availability.available===true
    ){
      try{
        card.disabled=false;
        card.removeAttribute("disabled");
        card.setAttribute("aria-disabled","false");

        if(card.classList){
          card.classList.remove("is-disabled");
          card.classList.add("is-ready");
        }
      }catch(_error){}
    }

    return true;
  }

  function bindCard34500(card){
    if(!cardIsPresentable34500(card))return false;

    const skillId=
      skillIdFromCard34500(card);

    if(!exactKakashiSkill34500(skillId)){
      return false;
    }

    normalizeRenderedCard34500(
      card,
      skillId
    );

    try{
      card.onmouseenter=null;
      card.onfocus=null;
    }catch(_error){}

    if(boundCards.has(card)){
      return true;
    }

    boundCards.add(card);

    card.dataset.skillId=
      String(skillId);

    card.dataset.alpha34500Bound=
      "true";

    if(card.setAttribute){
      card.setAttribute(
        "role",
        "button"
      );

      card.setAttribute(
        "tabindex",
        card.getAttribute &&
        card.getAttribute("tabindex") ||
        "0"
      );

      card.setAttribute(
        "aria-description",
        "Hover or focus to learn what this Skill does. Click to use it if legal."
      );
    }

    if(card.addEventListener){
      card.addEventListener(
        "keydown",
        event=>{
          if(
            event &&
            (
              event.key==="Enter" ||
              event.key===" "
            )
          ){
            if(
              typeof event.preventDefault==="function"
            ){
              event.preventDefault();
            }

            if(
              typeof event.stopPropagation==="function"
            ){
              event.stopPropagation();
            }

            if(
              typeof event.stopImmediatePropagation==="function"
            ){
              event.stopImmediatePropagation();
            }

            activate34500(skillId);
          }
        },
        true
      );
    }

    return true;
  }

  function cardCandidates34500(root){
    if(
      !root ||
      !root.querySelectorAll
    ){
      return [];
    }

    return Array.from(
      root.querySelectorAll(
        CARD_SELECTOR
      )
    );
  }

  function stageRoot34500(root=null){
    if(
      root &&
      root.matches &&
      root.matches(
        ".alpha-code-battle-stage"
      )
    ){
      return root;
    }

    if(
      root &&
      root.querySelector
    ){
      const nested=
        root.querySelector(
          ".alpha-code-battle-stage"
        );

      if(nested)return nested;
    }

    if(typeof document==="undefined"){
      return null;
    }

    return (
      document.querySelector(
        ".alpha-code-battle-stage"
      ) ||
      document.getElementById(
        "battle-modal"
      ) ||
      document.getElementById(
        "combat-overlay"
      ) ||
      document.getElementById(
        "battle-live"
      ) ||
      null
    );
  }

  function hardenBattleDOM34500(root=null){
    if(
      typeof document==="undefined" ||
      !activeKakashiBattle34500()
    ){
      return false;
    }

    const stage=
      stageRoot34500(root);

    if(!stage)return false;

    try{
      stage.classList.add(
        "sc-kakashi-battle-input-34500"
      );
    }catch(_error){}

    const deck=
      stage.querySelector &&
      stage.querySelector(
        ".battle-live-skill-deck"
      );

    if(deck&&deck.classList)deck.classList.add("sc-kakashi-battle-deck-34500");

    let bound=0;

    cardCandidates34500(stage)
      .forEach(card=>{
        if(bindCard34500(card)){
          bound+=1;
        }
      });

    return bound>0;
  }

  function scheduleHarden34500(root=null){
    if(hardenScheduled)return;

    hardenScheduled=true;

    const run=()=>{
      hardenScheduled=false;

      try{
        hardenBattleDOM34500(root);
      }catch(_error){}
    };

    if(typeof queueMicrotask==="function")queueMicrotask(run);else run();
  }

  function resolveDelegatedCard34500(target){
    if(
      !target ||
      typeof target.closest!=="function"
    ){
      return null;
    }

    try{
      return target.closest(
        CARD_SELECTOR
      );
    }catch(_error){
      return null;
    }
  }

  function delegatedLearn34500(event){
    if(!activeKakashiBattle34500()){
      return null;
    }

    const card=
      resolveDelegatedCard34500(
        event&&event.target
      );

    if(!cardIsPresentable34500(card)){
      return null;
    }

    const stage=
      stageRoot34500();

    if(
      stage &&
      typeof stage.contains==="function" &&
      !stage.contains(card)
    ){
      return null;
    }

    if(
      event &&
      event.type==="pointerover" &&
      event.relatedTarget &&
      card.contains &&
      card.contains(event.relatedTarget)
    ){
      return null;
    }

    const skillId=
      skillIdFromCard34500(card);

    if(!exactKakashiSkill34500(skillId)){
      return null;
    }

    normalizeRenderedCard34500(
      card,
      skillId
    );

    return renderGuide34500(skillId);
  }

  function installDelegatedLearn34500(){
    if(
      delegatedLearnInstalled ||
      typeof document==="undefined" ||
      typeof document.addEventListener!=="function"
    ){
      return false;
    }

    document.addEventListener(
      "pointerover",
      delegatedLearn34500,
      true
    );

    document.addEventListener(
      "focusin",
      delegatedLearn34500,
      true
    );

    delegatedLearnInstalled=true;

    return true;
  }

  function delegatedClick34500(event){
    if(!activeKakashiBattle34500()){
      return null;
    }

    const card=
      resolveDelegatedCard34500(
        event&&event.target
      );

    if(!cardIsPresentable34500(card)){
      return null;
    }

    const stage=
      stageRoot34500();

    if(
      stage &&
      typeof stage.contains==="function" &&
      !stage.contains(card)
    ){
      return null;
    }

    const skillId=
      skillIdFromCard34500(card);

    if(!exactKakashiSkill34500(skillId)){
      return null;
    }

    normalizeRenderedCard34500(
      card,
      skillId
    );

    if(
      event &&
      typeof event.preventDefault==="function"
    ){
      event.preventDefault();
    }

    if(
      event &&
      typeof event.stopPropagation==="function"
    ){
      event.stopPropagation();
    }

    if(
      event &&
      typeof event.stopImmediatePropagation==="function"
    ){
      event.stopImmediatePropagation();
    }

    return activate34500(skillId);
  }

  function installDelegatedClick34500(){
    if(
      delegatedClickInstalled ||
      typeof document==="undefined" ||
      typeof document.addEventListener!=="function"
    ){
      return false;
    }

    document.addEventListener(
      "click",
      delegatedClick34500,
      true
    );

    delegatedClickInstalled=true;

    return true;
  }

  function wrapRender34500(name){
    const prior=globalThis[name];
    if(typeof prior!=="function"||prior.__scKakashiBattleInteraction34500)return false;
    const wrapped=function(){
      const result=prior.apply(this,arguments);
      scheduleHarden34500(arguments&&arguments[0]);
      return result;
    };
    wrapped.__scKakashiBattleInteraction34500=true;
    globalThis[name]=wrapped;
    return true;
  }

  function wrapKakashiLaunch34500(){
    const name="launchAcademyKakashiOriginPlBattle";
    const prior=globalThis[name];
    if(typeof prior!=="function"||prior.__scKakashiBattleInteraction34500)return false;
    const wrapped=function(){
      const result=prior.apply(this,arguments);
      if(result&&typeof result.then==="function"){
        return result.then(value=>{scheduleHarden34500();return value;});
      }
      scheduleHarden34500();
      return result;
    };
    wrapped.__scKakashiBattleInteraction34500=true;
    globalThis[name]=wrapped;
    return true;
  }

  wrapRender34500("renderCombatOverlay");
  wrapRender34500("refreshBattleActionRegionPresentation");
  wrapRender34500("refreshBattleLiveDOM33000");
  wrapRender34500("renderBattle");

  wrapKakashiLaunch34500();

  installDelegatedLearn34500();
  installDelegatedClick34500();

  scheduleHarden34500();

  function runAcademyKakashiBattleInteraction34500Diagnostics(){
    const parser=skillIdFromCard34500.toString();
    const activation=activate34500.toString();
    const delegate=delegatedClick34500.toString();
    const skillSource=visibleBattleSkills34500.toString();
    const launchWrapper=wrapKakashiLaunch34500.toString();
    const checks={
      patchId:PATCH_ID==="alpha_kakashi_battle_interaction_hotfix_34500_v5_2026_09_16",
      exactFiveSkills:EXACT_KAKASHI_SKILLS.size===5,
      exactKakashiScope:activeKakashiBattle34500.toString().includes("controllerParticipantId"),
      canonicalPaletteFirst:skillSource.includes("canonicalBattleSkills34500")&&canonicalBattleSkills34500.toString().includes("getBattleUISkillPalettePresentation")&&canonicalBattleSkills34500.toString().includes("getBattlePreparedSkillDefinition"),
      acceptsBothHandlerGenerations:parser.includes("activateBattlePreparedSkillCard")&&parser.includes("selectBattlePreparedSkill"),
      acceptsBothDatasetGenerations:parser.includes("battleSkillId")&&parser.includes("skillId"),
      listenerDrivenTitleFallback:parser.includes("visibleBattleSkills34500"),
      hoverIsPresentationOnly:renderGuide34500.toString().includes("renderTemporaryBattleSkillGuide")&&!renderGuide34500.toString().includes("selectBattlePreparedSkill("),
      clickUsesNativeBattleCommit:activation.includes("selectBattlePreparedSkill")&&activation.includes("confirmSelectedBattleSkill")&&!activation.includes("resolveBattleDamagePacket"),
      delegatedCaptureInstalled:delegatedClickInstalled===true||typeof document==="undefined",
      delegatedLearnInstalled:delegatedLearnInstalled===true||typeof document==="undefined",
      delegatedClickOwnsRenderedCard:delegate.includes("resolveDelegatedCard34500")&&delegate.includes("stopImmediatePropagation")&&delegate.includes("activate34500(skillId)"),
      postDeploymentLaunchHardening:launchWrapper.includes("launchAcademyKakashiOriginPlBattle")&&launchWrapper.includes("scheduleHarden34500"),
      observesLateDOM:typeof MutationObserver!=="undefined"?!!observer:true,
      broadBattleCardCoverage:CARD_SELECTOR.includes("battle-live-skill-card")&&CARD_SELECTOR.includes("battle-dev-skill-card"),
      noDirectDamageResolver:!activation.includes("resolveBattleDamagePacket")&&!activation.includes("applyBattleDamage")&&!activation.includes("recordBattleEvidence"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false,patchId:PATCH_ID,version:VERSION};
  }

  globalThis.activateAcademyKakashiBattleSkill34500=activate34500;
  globalThis.previewAcademyKakashiBattleSkill34500=renderGuide34500;
  globalThis.hardenAcademyKakashiBattleDOM34500=hardenBattleDOM34500;
  globalThis.handleAcademyKakashiBattleCardClick34500=delegatedClick34500;
  globalThis.runAcademyKakashiBattleInteraction34500Diagnostics=runAcademyKakashiBattleInteraction34500Diagnostics;
  globalThis.SC_ALPHA_KAKASHI_BATTLE_INTERACTION_34500=Object.freeze({version:VERSION,patchId:PATCH_ID,browserGoldenClaimed:false});
})();