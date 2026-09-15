// ============================================================================
// ACADEMY KAKASHI BATTLE INTERACTION HOTFIX — 34500
// Installed-browser evidence: 2026-09-15 Stephen Kakashi Origin replay.
//
// Fixes the Battle 2.0 presentation contract only:
//   HOVER / FOCUS = LEARN
//   CLICK = ACT
//
// The live Battle deck can currently be rendered by either generation:
// - alpha-browser-polish-32700: activateBattlePreparedSkillCard(...)
// - base/current renderer:      selectBattlePreparedSkill(...)
//
// 33000 only recognized the first form, so browser cards could lose hover
// projection and clicks could stop at selection without committing the legal
// action. This patch recognizes both forms and reuses the existing
// select -> confirm -> Battle resolver path. It does not resolve damage itself.
// ============================================================================
(function installAcademyKakashiBattleInteraction34500(){
  "use strict";
  if(globalThis.SC_ALPHA_KAKASHI_BATTLE_INTERACTION_34500)return;

  const PATCH_ID="alpha_kakashi_battle_interaction_hotfix_34500_2026_09_15";
  const KAKASHI="academy_kakashi";

  function activeKakashiBattle34500(){
    try{
      const dep=currentBattle&&currentBattle.kakashiOriginDeployment;
      if(!currentBattle||currentBattle.active!==true||currentBattle.battleOver===true||!dep)return false;
      return dep.controllerParticipantId===KAKASHI;
    }catch(_error){return false;}
  }

  function skillIdFromCard34500(card){
    if(!card)return null;
    const direct=card.dataset&&card.dataset.skillId;
    if(direct)return String(direct);
    const handler=String(card.getAttribute&&card.getAttribute("onclick")||"");
    const match=handler.match(/(?:activateBattlePreparedSkillCard|selectBattlePreparedSkill)\(['\"]([^'\"]+)['\"]\)/);
    return match?String(match[1]):null;
  }

  function preview34500(skillId){
    if(!skillId)return false;
    try{
      if(typeof previewBattlePreparedSkill33000==="function")return previewBattlePreparedSkill33000(skillId)!==false;
    }catch(_error){}
    return false;
  }

  function activate34500(skillId){
    if(!activeKakashiBattle34500())return{success:false,reason:"kakashi_origin_battle_not_active"};
    if(typeof selectBattlePreparedSkill!=="function"||typeof confirmSelectedBattleSkill!=="function"){
      return{success:false,reason:"battle_skill_commit_path_missing"};
    }
    const selected=selectBattlePreparedSkill(skillId);
    if(!(selected&&selected.success===true))return selected||{success:false,reason:"battle_skill_selection_failed"};
    if(selected.branchSelectionRequired===true){
      preview34500(skillId);
      return{...selected,awaitingExplicitMode:true,actionCommitted:false};
    }
    const committed=confirmSelectedBattleSkill();
    return committed&&typeof committed==="object"
      ? {...committed,alpha34500DirectClick:true,selectedSkillId:skillId}
      : {success:false,reason:"battle_skill_commit_failed",alpha34500DirectClick:true,selectedSkillId:skillId};
  }

  function bindCard34500(card){
    if(!card||card.disabled===true||card.classList&&card.classList.contains("is-empty"))return false;
    const skillId=skillIdFromCard34500(card);
    if(!skillId)return false;
    card.dataset.skillId=skillId;
    card.setAttribute("aria-description","Hover or focus to learn what this Skill does. Click to use it if legal.");
    card.onmouseenter=()=>preview34500(skillId);
    card.onfocus=()=>preview34500(skillId);
    card.removeAttribute("onclick");
    card.onclick=event=>{
      if(event&&typeof event.preventDefault==="function")event.preventDefault();
      if(event&&typeof event.stopPropagation==="function")event.stopPropagation();
      return activate34500(skillId);
    };
    card.dataset.alpha34500Bound="true";
    return true;
  }

  function hardenBattleDOM34500(root=null){
    if(typeof document==="undefined"||!activeKakashiBattle34500())return false;
    const stage=(root&&root.querySelector&&root.querySelector(".alpha-code-battle-stage"))||document.querySelector(".alpha-code-battle-stage");
    if(!stage)return false;
    const cards=[...stage.querySelectorAll(".battle-live-skill-deck .battle-dev-skill-card:not(.is-empty)")];
    let bound=0;
    cards.forEach(card=>{if(bindCard34500(card))bound+=1;});
    return bound>0;
  }

  const priorRefresh=typeof refreshBattleActionRegionPresentation==="function"?refreshBattleActionRegionPresentation:null;
  if(priorRefresh){
    refreshBattleActionRegionPresentation=function refreshBattleActionRegionPresentation34500(){
      const result=priorRefresh.apply(this,arguments);
      hardenBattleDOM34500();
      if(typeof requestAnimationFrame==="function")requestAnimationFrame(()=>hardenBattleDOM34500());
      return result;
    };
    globalThis.refreshBattleActionRegionPresentation=refreshBattleActionRegionPresentation;
  }

  const priorRender=typeof renderCombatOverlay==="function"?renderCombatOverlay:null;
  if(priorRender){
    renderCombatOverlay=function renderCombatOverlay34500(container){
      const result=priorRender.apply(this,arguments);
      hardenBattleDOM34500(container);
      if(typeof requestAnimationFrame==="function")requestAnimationFrame(()=>hardenBattleDOM34500(container));
      return result;
    };
    globalThis.renderCombatOverlay=renderCombatOverlay;
  }

  if(typeof document!=="undefined"){
    hardenBattleDOM34500();
    if(typeof requestAnimationFrame==="function")requestAnimationFrame(()=>hardenBattleDOM34500());
  }

  function runAcademyKakashiBattleInteraction34500Diagnostics(){
    const parser=skillIdFromCard34500.toString();
    const activation=activate34500.toString();
    const binding=bindCard34500.toString();
    const checks={
      patchId:PATCH_ID==="alpha_kakashi_battle_interaction_hotfix_34500_2026_09_15",
      acceptsPolishHandler:parser.includes("activateBattlePreparedSkillCard"),
      acceptsBaseHandler:parser.includes("selectBattlePreparedSkill"),
      hoverUsesModernInspector:binding.includes("onmouseenter")&&binding.includes("onfocus")&&preview34500.toString().includes("previewBattlePreparedSkill33000"),
      clickUsesExistingCommitPath:activation.includes("selectBattlePreparedSkill(skillId)")&&activation.includes("confirmSelectedBattleSkill()"),
      branchModeRemainsExplicit:activation.includes("branchSelectionRequired===true")&&activation.includes("awaitingExplicitMode:true"),
      noDirectDamageResolver:!activation.includes("resolveBattleDamagePacket")&&!activation.includes("applyBattleDamage")&&!activation.includes("recordBattleEvidence"),
      rerenderRebinds:!!priorRefresh&&refreshBattleActionRegionPresentation.toString().includes("hardenBattleDOM34500"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false,patchId:PATCH_ID};
  }

  globalThis.activateAcademyKakashiBattleSkill34500=activate34500;
  globalThis.hardenAcademyKakashiBattleDOM34500=hardenBattleDOM34500;
  globalThis.runAcademyKakashiBattleInteraction34500Diagnostics=runAcademyKakashiBattleInteraction34500Diagnostics;
  globalThis.SC_ALPHA_KAKASHI_BATTLE_INTERACTION_34500=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
})();
