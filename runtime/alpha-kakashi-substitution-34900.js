// ============================================================================
// ISSUE #188 — ACADEMY KAKASHI SUBSTITUTION JUTSU SUPERSESSION — 34900
//
// Binding Combat authority:
// Documentation/Combat/SC_Combat_Academy_Kakashi_Analyze_Opponent_Replacement_Substitution_Jutsu_2026-09-16.md
// commit c08ecd2271a49eebbd28fc8dae2c737b6acc3037
//
// This layer replaces the unresolved/selectable Academy Kakashi fifth prepared
// slot without rewriting the legacy Analyze Opponent definition or historical
// committed actions. Damage math remains owned by the existing generic Battle
// ratio-guard / pre-Stamina resolver.
// ============================================================================
(function installAcademyKakashiSubstitution34900(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_SUBSTITUTION_34900)return;

const PATCH_ID="alpha_kakashi_substitution_34900_v2_2026_09_22";
const AUTHORITY_COMMIT="c08ecd2271a49eebbd28fc8dae2c737b6acc3037";
const KAKASHI="academy_kakashi";
const LEGACY_ID="academy_kakashi_prodigys_read";
const SKILL_ID="academy_kakashi_substitution_jutsu";
const GUARD_STATE_KEY="academy_kakashi_substitution_guard";

const GUARD=Object.freeze({
  stateKey:GUARD_STATE_KEY,
  preventionRatio:0.50,
  oneUse:true,
  sourceOwned:true,
  selfTargetOnly:true,
  requiresDirectAttackPLPacket:true,
  consumedByTargetParticipantOnly:true,
  staminaOrder:"pre_stamina"
});

const SKILL=Object.freeze({
  id:SKILL_ID,
  skillId:SKILL_ID,
  displayName:"Substitution Jutsu",
  name:"Substitution Jutsu",
  ownerRegistryId:KAKASHI,
  actionClass:"defense",
  type:"defense",
  primaryDiscipline:"Ninjutsu",
  targetMode:"self",
  resolutionKind:"ratio_guard_state",
  repeatUseRule:"no_repeat_same_battle",
  guard:GUARD,
  playerFacingCategory:"DEFENSE",
  description:"Cut the damage of the next direct attack against Kakashi by 50%.",
  dealsDirectDamage:false,
  grantsEvasion:false,
  grantsExtraAction:false,
  healsBattlePL:false
});

const SUMMARY=Object.freeze({
  title:"Substitution Jutsu",
  summary:"Cut the damage of the next direct attack against Kakashi by 50%.",
  details:Object.freeze([
    "Prepare a substitution to soften the next direct hit against Kakashi.",
    "The next direct attack against Kakashi is reduced by 50% before Stamina reduces the damage.",
    "Works once, then the defense ends.",
    "Can be used once per Battle.",
    "Deals no damage."
  ]),
  kind:"DEFENSE",
  attackPL:null,
  tags:Object.freeze(["DEFENSE","NEXT DIRECT HIT -50%","ONCE PER BATTLE"])
});

function battle34900(){
  try{return typeof currentBattle!=="undefined"?currentBattle:null;}catch(_error){return null;}
}
function actorId34900(actor){
  return String(actor&&(actor.id||actor.participantId||actor.registryId||actor.characterId||actor.ownerRegistryId)||"");
}
function isKakashiActor34900(actor){return actorId34900(actor)===KAKASHI;}
function activeActor34900(){
  const battle=battle34900();
  try{
    if(typeof getBattleDeploymentParticipant==="function"){
      const row=getBattleDeploymentParticipant("player",1);
      if(row)return row;
    }
  }catch(_error){}
  if(battle&&Array.isArray(battle.playerParticipants)){
    const row=battle.playerParticipants.find(item=>actorId34900(item)===KAKASHI);
    if(row)return row;
  }
  return battle&&battle.activePlayer||null;
}
function activeKakashiBattle34900(){
  const battle=battle34900();
  if(!battle||battle.battleOver===true)return false;
  const dep=battle.kakashiOriginDeployment;
  if(dep){
    const controller=String(dep.controllerParticipantId||dep.controllerId||"");
    if(controller)return controller===KAKASHI;
  }
  return isKakashiActor34900(activeActor34900());
}
function cloneSummary34900(){
  return{title:SUMMARY.title,summary:SUMMARY.summary,details:[...SUMMARY.details],kind:SUMMARY.kind,attackPL:null,tags:[...SUMMARY.tags]};
}
function esc34900(value){
  return String(value??"").replace(/[&<>\"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
}

// ---------------------------------------------------------------------------
// Prepared-skill projection. Legacy Analyze stays available to historical log
// interpretation; only the unresolved/selectable Kakashi palette is projected.
// ---------------------------------------------------------------------------
const priorDefinition=typeof globalThis.getBattlePreparedSkillDefinition==="function"?globalThis.getBattlePreparedSkillDefinition:null;
if(priorDefinition){
  globalThis.getBattlePreparedSkillDefinition=function getBattlePreparedSkillDefinition34900(actor,skillId){
    if(isKakashiActor34900(actor)&&String(skillId||"")===SKILL_ID)return SKILL;
    return priorDefinition.apply(this,arguments);
  };
}

const priorPalette=typeof globalThis.getBattleUISkillPalettePresentation==="function"?globalThis.getBattleUISkillPalettePresentation:null;
if(priorPalette){
  globalThis.getBattleUISkillPalettePresentation=function getBattleUISkillPalettePresentation34900(actor){
    const out=priorPalette.apply(this,arguments);
    if(!isKakashiActor34900(actor)||!out||!Array.isArray(out.skillIds))return out;
    const projected=[];
    for(const raw of out.skillIds){
      const id=String(raw||"")===LEGACY_ID?SKILL_ID:String(raw||"");
      if(id&&!projected.includes(id))projected.push(id);
    }
    return Object.assign({},out,{skillIds:projected});
  };
}

// ---------------------------------------------------------------------------
// 33000 youth-facing presentation extension. The generic 33000 ratio-guard
// fallback remains valid for every other Skill; Kakashi receives exact copy.
// ---------------------------------------------------------------------------
const priorYouthSummary=typeof globalThis.getBattleSkillYouthSummary33000==="function"?globalThis.getBattleSkillYouthSummary33000:null;
globalThis.getBattleSkillYouthSummary33000=function getBattleSkillYouthSummary33000Kakashi34900(skill){
  if(skill&&String(skill.id||skill.skillId||"")===SKILL_ID)return cloneSummary34900();
  return priorYouthSummary?priorYouthSummary.apply(this,arguments):null;
};

const priorPlainSummary=typeof globalThis.getBattleSkillPlainLanguageSummary==="function"?globalThis.getBattleSkillPlainLanguageSummary:null;
globalThis.getBattleSkillPlainLanguageSummary=function getBattleSkillPlainLanguageSummaryKakashi34900(skill){
  if(skill&&String(skill.id||skill.skillId||"")===SKILL_ID){
    const info=cloneSummary34900();
    return[info.summary,...info.details].join(" ");
  }
  return priorPlainSummary?priorPlainSummary.apply(this,arguments):"";
};

function renderExactGuide34900(){
  if(typeof document==="undefined"||!activeKakashiBattle34900())return false;
  const panel=document.querySelector&&document.querySelector(".alpha-code-battle-stage .battle-live-skill-details");
  if(!panel)return false;
  try{if(panel.classList)panel.classList.add("battle2-inspector");}catch(_error){}
  panel.innerHTML=`<div class="battle2-inspector-head"><span>SKILL GUIDE</span><b>HOVER TO LEARN · CLICK TO USE</b></div>
    <h2>${esc34900(SUMMARY.title)}</h2>
    <div class="battle2-badges">${SUMMARY.tags.map(tag=>`<span>${esc34900(tag)}</span>`).join("")}</div>
    <p class="battle2-summary">${esc34900(SUMMARY.summary)}</p>
    <ul>${SUMMARY.details.map(line=>`<li>${esc34900(line)}</li>`).join("")}</ul>
    <div class="battle2-target"><span>TARGET</span><strong>Kakashi</strong></div>`;
  if(panel.dataset)panel.dataset.previewSkillId=SKILL_ID;
  return true;
}

const priorPreview=typeof globalThis.previewBattlePreparedSkill33000==="function"?globalThis.previewBattlePreparedSkill33000:null;
globalThis.previewBattlePreparedSkill33000=function previewBattlePreparedSkill33000Kakashi34900(skillId){
  if(String(skillId||"")===SKILL_ID&&activeKakashiBattle34900())return renderExactGuide34900();
  return priorPreview?priorPreview.apply(this,arguments):false;
};

// ---------------------------------------------------------------------------
// Interaction ownership
// ---------------------------------------------------------------------------
// 34900 owns only the Substitution semantic/palette/guide projection. Rendered
// Battle-card interaction is owned by the later-loaded canonical 34500 layer.
// This prevents two document delegates / DOM observers from racing over the
// same fifth slot while preserving old external entry points as delegates.
const INTERACTION_OWNER_34900="runtime/alpha-kakashi-battle-interaction-hotfix-34500.js";
function activate34900(){
  const owner=globalThis.activateAcademyKakashiBattleSkill34500;
  return typeof owner==="function"?owner(SKILL_ID):{success:false,reason:"kakashi_battle_interaction_owner_not_loaded",owner:INTERACTION_OWNER_34900};
}
function hardenRenderedCards34900(root){
  const owner=globalThis.hardenAcademyKakashiBattleDOM34500;
  return typeof owner==="function"?owner(root):false;
}

function runAcademyKakashiSubstitution34900Diagnostics(){
  const actor=activeActor34900()||{id:KAKASHI};
  let projected=null,definition=null,legacy=null,summary=null;
  try{projected=typeof getBattleUISkillPalettePresentation==="function"?getBattleUISkillPalettePresentation(actor):null;}catch(_error){}
  try{definition=typeof getBattlePreparedSkillDefinition==="function"?getBattlePreparedSkillDefinition(actor,SKILL_ID):null;}catch(_error){}
  try{legacy=priorDefinition?priorDefinition(actor,LEGACY_ID):null;}catch(_error){}
  try{summary=getBattleSkillYouthSummary33000(definition||SKILL);}catch(_error){}
  const checks={
    patchId:PATCH_ID,
    authorityCommit:AUTHORITY_COMMIT,
    paletteProjectsNew:!!(projected&&Array.isArray(projected.skillIds)&&projected.skillIds.includes(SKILL_ID)&&!projected.skillIds.includes(LEGACY_ID)),
    exactDefinition:!!(definition&&definition.id===SKILL_ID&&definition.resolutionKind==="ratio_guard_state"&&definition.targetMode==="self"&&definition.repeatUseRule==="no_repeat_same_battle"),
    directPacketGuard:GUARD.preventionRatio===0.5&&GUARD.oneUse===true&&GUARD.requiresDirectAttackPLPacket===true&&GUARD.staminaOrder==="pre_stamina",
    legacyDefinitionPreserved:!!legacy,
    exactYouthCopy:!!(summary&&summary.summary===SUMMARY.summary&&summary.kind==="DEFENSE"&&summary.tags&&summary.tags.includes("NEXT DIRECT HIT -50%")),
    interactionDelegatedTo34500:INTERACTION_OWNER_34900.endsWith("34500.js")&&activate34900.toString().includes("activateAcademyKakashiBattleSkill34500")&&hardenRenderedCards34900.toString().includes("hardenAcademyKakashiBattleDOM34500")
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="patchId"&&key!=="authorityCommit"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.activateAcademyKakashiSubstitution34900=activate34900;
globalThis.hardenAcademyKakashiSubstitutionCards34900=hardenRenderedCards34900;
globalThis.runAcademyKakashiSubstitution34900Diagnostics=runAcademyKakashiSubstitution34900Diagnostics;
globalThis.SC_ALPHA_KAKASHI_SUBSTITUTION_34900=Object.freeze({
  patchId:PATCH_ID,
  authorityCommit:AUTHORITY_COMMIT,
  legacySkillId:LEGACY_ID,
  skillId:SKILL_ID,
  guardStateKey:GUARD_STATE_KEY,
  skill:SKILL,
  guard:GUARD,
  browserGoldenClaimed:false
});
})();
