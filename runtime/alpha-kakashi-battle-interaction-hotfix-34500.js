// ============================================================================
// ACADEMY KAKASHI BATTLE INTERACTION HOTFIX — 34500 v3
// Installed-browser evidence: 2026-09-15 Stephen Kakashi Origin replay.
//
// Contract:
//   HOVER / FOCUS = LEARN (presentation only; never selects/commits)
//   CLICK          = ACT   (reuse native Battle selection/confirmation)
//
// The live Battle deck may be inserted/replaced before Kakashi's exact
// deployment metadata is attached. This compatibility bridge therefore reads
// the canonical Battle five-skill palette first, observes DOM replacement, and
// hardens the deck again after the exact Kakashi launcher returns.
//
// This file does NOT resolve damage, setup, control, targeting, conditions,
// Battle PL, rewards, custody, or Story outcomes. Native Battle authority does.
// Browser Golden remains unclaimed until Stephen validates the installed build.
// ============================================================================
(function installAcademyKakashiBattleInteraction34500(){
  "use strict";
  if(globalThis.SC_ALPHA_KAKASHI_BATTLE_INTERACTION_34500)return;

  const VERSION="34500-v3";
  const PATCH_ID="alpha_kakashi_battle_interaction_hotfix_34500_v3_2026_09_15";
  const KAKASHI="academy_kakashi";
  const boundCards=new WeakSet();
  let observer=null;
  let hardenScheduled=false;

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

    // Canonical source: the exact same palette/definition pair used by the
    // production Battle deck renderer. Compatibility pools remain fallback
    // only for older Battle generations.
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
    const dataset=card.dataset||{};
    const direct=String(dataset.skillId||dataset.battleSkillId||"").trim();
    if(direct)return direct;

    if(card.querySelector){
      const child=card.querySelector("[data-skill-id],[data-battle-skill-id]");
      if(child&&child.dataset){
        const nested=String(child.dataset.skillId||child.dataset.battleSkillId||"").trim();
        if(nested)return nested;
      }
    }

    const handler=String(card.getAttribute&&card.getAttribute("onclick")||"");
    const match=handler.match(/(?:activateBattlePreparedSkillCard|selectBattlePreparedSkill)\(['\"]([^'\"]+)['\"]\)/);
    if(match)return String(match[1]||"").trim()||null;

    // Listener-driven cards can have no dataset/inline handler. Resolve the
    // visible card title against the active actor's canonical authored Skills.
    const label=normalizeText34500(cardLabel34500(card));
    if(label){
      const skill=visibleBattleSkills34500().find(row=>{
        if(!row)return false;
        const names=[row.name,row.label,row.title,row.displayName,row.skillName].filter(Boolean).map(normalizeText34500);
        return names.some(name=>name&&((label===name)||label.includes(name)||name.includes(label)));
      });
      const id=skill&&String(skill.id||skill.skillId||"").trim();
      if(id)return id;
    }
    return null;
  }

  function renderGuide34500(skillId){
    if(!activeKakashiBattle34500()||!skillId)return{success:false,reason:"kakashi_origin_battle_not_active"};
    const battle=battle34500();
    // Preferred presentation-only path used by Battle 2.0 itself.
    if(typeof renderTemporaryBattleSkillGuide==="function"){
      battle.skillGuideSkillId=String(skillId);
      renderTemporaryBattleSkillGuide(String(skillId));
      return{success:true,mode:"native_skill_guide",skillId:String(skillId)};
    }
    // 33000 inspector is also presentation-only. Never call select here.
    if(typeof previewBattlePreparedSkill33000==="function"){
      const out=previewBattlePreparedSkill33000(String(skillId));
      return out&&typeof out==="object"?out:{success:out!==false,mode:"modern_skill_inspector",skillId:String(skillId)};
    }
    return{success:false,reason:"battle_skill_guide_unavailable"};
  }

  function activate34500(skillId){
    if(!activeKakashiBattle34500()||!skillId)return{success:false,reason:"kakashi_origin_battle_not_active"};

    // If the native one-click bridge exists, prefer it. Otherwise use the
    // canonical select+confirm path; Skills requiring an authored mode/branch
    // remain waiting for explicit player selection.
    if(typeof activateBattlePreparedSkillCard==="function"){
      const out=activateBattlePreparedSkillCard(String(skillId));
      return out&&typeof out==="object"
        ?Object.assign({},out,{alpha34500DirectClick:true,selectedSkillId:String(skillId),nativeActivator:true})
        :{success:out!==false,alpha34500DirectClick:true,selectedSkillId:String(skillId),nativeActivator:true};
    }

    if(typeof selectBattlePreparedSkill!=="function"||typeof confirmSelectedBattleSkill!=="function"){
      return{success:false,reason:"battle_skill_commit_path_missing"};
    }
    const battle=battle34500();
    const selected=selectBattlePreparedSkill(String(skillId));
    const selectionSucceeded=(selected&&selected.success===true)||String(battle&&battle.selectedSkillId||"")===String(skillId);
    if(!selectionSucceeded)return selected||{success:false,reason:"battle_skill_selection_failed"};
    if(selected&&selected.branchSelectionRequired===true){
      renderGuide34500(String(skillId));
      return Object.assign({},selected,{success:true,awaitingExplicitMode:true,actionCommitted:false});
    }
    const committed=confirmSelectedBattleSkill();
    return committed&&typeof committed==="object"
      ?Object.assign({},committed,{alpha34500DirectClick:true,selectedSkillId:String(skillId),nativeActivator:false})
      :{success:committed!==false,alpha34500DirectClick:true,selectedSkillId:String(skillId),nativeActivator:false};
  }

  function cardIsUsable34500(card){
    if(!card||card.disabled===true)return false;
    if(card.classList&&(card.classList.contains("is-empty")||card.classList.contains("empty")))return false;
    return true;
  }

  function bindCard34500(card){
    if(!cardIsUsable34500(card)||boundCards.has(card))return false;
    const skillId=skillIdFromCard34500(card);
    if(!skillId)return false;

    boundCards.add(card);
    card.dataset.skillId=String(skillId);
    card.dataset.alpha34500Bound="true";
    if(card.setAttribute){
      card.setAttribute("role","button");
      card.setAttribute("tabindex",card.getAttribute&&card.getAttribute("tabindex")||"0");
      card.setAttribute("aria-description","Hover or focus to learn what this Skill does. Click to use it if legal.");
      card.removeAttribute&&card.removeAttribute("onclick");
    }

    const showGuide=()=>renderGuide34500(skillId);
    const act=(event)=>{
      if(event&&typeof event.preventDefault==="function")event.preventDefault();
      if(event&&typeof event.stopPropagation==="function")event.stopPropagation();
      if(event&&typeof event.stopImmediatePropagation==="function")event.stopImmediatePropagation();
      return activate34500(skillId);
    };

    if(card.addEventListener){
      card.addEventListener("mouseenter",showGuide);
      card.addEventListener("focus",showGuide);
      card.addEventListener("click",act,true);
      card.addEventListener("keydown",event=>{
        if(event&&(event.key==="Enter"||event.key===" "))act(event);
      },true);
      // Neutralize property/inline select-only generations. Capture listener is
      // the action authority for this scoped Battle surface.
      card.onclick=null;
    }else{
      card.onmouseenter=showGuide;
      card.onfocus=showGuide;
      card.onclick=act;
    }
    return true;
  }

  function cardCandidates34500(root){
    if(!root||!root.querySelectorAll)return[];
    return Array.from(root.querySelectorAll([
      ".battle-live-skill-deck .battle-live-skill-card:not(.is-empty)",
      ".battle-live-skill-deck .battle-dev-skill-card:not(.is-empty)",
      ".battle-live-skill-card:not(.is-empty)",
      ".battle-dev-skill-card:not(.is-empty)",
      ".sc-battle-skill-card:not(.is-empty)",
      "[data-battle-skill-id]",
      "[data-skill-id]",
      "[onclick*='selectBattlePreparedSkill']",
      "[onclick*='activateBattlePreparedSkillCard']"
    ].join(",")));
  }

  function stageRoot34500(root=null){
    if(root&&root.matches&&root.matches(".alpha-code-battle-stage"))return root;
    if(root&&root.querySelector){
      const nested=root.querySelector(".alpha-code-battle-stage");
      if(nested)return nested;
    }
    if(typeof document==="undefined")return null;
    return document.querySelector(".alpha-code-battle-stage")
      ||document.getElementById("battle-modal")
      ||document.getElementById("combat-overlay")
      ||document.getElementById("battle-live")
      ||null;
  }

  function hardenBattleDOM34500(root=null){
    if(typeof document==="undefined"||!activeKakashiBattle34500())return false;
    const stage=stageRoot34500(root);
    if(!stage)return false;
    let bound=0;
    cardCandidates34500(stage).forEach(card=>{if(bindCard34500(card))bound+=1;});
    return bound>0;
  }

  function scheduleHarden34500(root=null){
    if(hardenScheduled)return;
    hardenScheduled=true;
    const run=()=>{
      hardenScheduled=false;
      try{hardenBattleDOM34500(root);}catch(_error){}
    };
    if(typeof queueMicrotask==="function")queueMicrotask(run);
    else if(typeof setTimeout==="function")setTimeout(run,0);
    else run();
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
      // 34300 attaches currentBattle.kakashiOriginDeployment immediately before
      // returning. Harden only now so the scope predicate can see that fact.
      scheduleHarden34500();
      return result;
    };
    wrapped.__scKakashiBattleInteraction34500=true;
    globalThis[name]=wrapped;
    return true;
  }

  function installObserver34500(){
    if(typeof MutationObserver!=="function"||typeof document==="undefined")return false;
    const target=document.body||document.documentElement;
    if(!target)return false;
    observer=new MutationObserver(()=>{
      if(activeKakashiBattle34500())scheduleHarden34500();
    });
    observer.observe(target,{childList:true,subtree:true});
    return true;
  }

  wrapRender34500("renderCombatOverlay");
  wrapRender34500("refreshBattleActionRegionPresentation");
  wrapRender34500("refreshBattleLiveDOM33000");
  wrapRender34500("renderBattle");
  wrapKakashiLaunch34500();
  installObserver34500();
  scheduleHarden34500();

  function runAcademyKakashiBattleInteraction34500Diagnostics(){
    const parser=skillIdFromCard34500.toString();
    const activation=activate34500.toString();
    const binding=bindCard34500.toString();
    const skillSource=visibleBattleSkills34500.toString();
    const launchWrapper=wrapKakashiLaunch34500.toString();
    const checks={
      patchId:PATCH_ID==="alpha_kakashi_battle_interaction_hotfix_34500_v3_2026_09_15",
      exactKakashiScope:activeKakashiBattle34500.toString().includes("controllerParticipantId")&&activeKakashiBattle34500.toString().includes("academy_kakashi")===false,
      canonicalPaletteFirst:skillSource.includes("canonicalBattleSkills34500")&&canonicalBattleSkills34500.toString().includes("getBattleUISkillPalettePresentation")&&canonicalBattleSkills34500.toString().includes("getBattlePreparedSkillDefinition"),
      acceptsBothHandlerGenerations:parser.includes("activateBattlePreparedSkillCard")&&parser.includes("selectBattlePreparedSkill"),
      acceptsBothDatasetGenerations:parser.includes("battleSkillId")&&parser.includes("skillId"),
      listenerDrivenTitleFallback:parser.includes("visibleBattleSkills34500"),
      hoverIsPresentationOnly:renderGuide34500.toString().includes("renderTemporaryBattleSkillGuide")&&!renderGuide34500.toString().includes("selectBattlePreparedSkill("),
      clickPrefersNativeActivator:activation.includes("activateBattlePreparedSkillCard"),
      clickFallbackUsesNativeCommit:activation.includes("selectBattlePreparedSkill")&&activation.includes("confirmSelectedBattleSkill"),
      clickOwnsCapturePhase:binding.includes("stopImmediatePropagation")&&binding.includes("addEventListener(\"click\",act,true)"),
      postDeploymentLaunchHardening:launchWrapper.includes("launchAcademyKakashiOriginPlBattle")&&launchWrapper.includes("scheduleHarden34500"),
      observesLateDOM:typeof MutationObserver!=="undefined"?!!observer:true,
      broadBattleCardCoverage:cardCandidates34500.toString().includes("battle-live-skill-card")&&cardCandidates34500.toString().includes("battle-dev-skill-card"),
      noDirectDamageResolver:!activation.includes("resolveBattleDamagePacket")&&!activation.includes("applyBattleDamage")&&!activation.includes("recordBattleEvidence"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false,patchId:PATCH_ID,version:VERSION};
  }

  globalThis.activateAcademyKakashiBattleSkill34500=activate34500;
  globalThis.previewAcademyKakashiBattleSkill34500=renderGuide34500;
  globalThis.hardenAcademyKakashiBattleDOM34500=hardenBattleDOM34500;
  globalThis.runAcademyKakashiBattleInteraction34500Diagnostics=runAcademyKakashiBattleInteraction34500Diagnostics;
  globalThis.SC_ALPHA_KAKASHI_BATTLE_INTERACTION_34500=Object.freeze({version:VERSION,patchId:PATCH_ID,browserGoldenClaimed:false});
})();