// ============================================================================
// ISSUE #385 / #373 — FIRST LEGITIMATE PL BATTLE TUTORIAL — 38500
//
// Authority:
// Documentation/Coordination/Battle_Participant_Control_and_First_PL_Battle_Tutorial_Contract_2026-09-26.md
//
// Presentation/onboarding only:
// - never selects Skills or targets;
// - never commits actions;
// - never changes PL, withdrawal, relay, rewards, history or Battle phase;
// - persists tutorial acknowledgement state in the continuing player save.
// ============================================================================
(function installFirstPLBattleTutorial38500(){
"use strict";
if(globalThis.SC_PL_BATTLE_TUTORIAL_38500)return;

const PATCH_ID="first_pl_battle_tutorial_38500_2026_09_26";
const FAMILY_ID="pl_battle_tutorial_v1";
const VERSION=1;
const SAVE_FIELD="plBattleTutorialV1";
const BEAT_ORDER=Object.freeze([
  "active_shinobi",
  "guest_ally_control",
  "independent_ally_control",
  "skills_action_dock",
  "battle_pl",
  "withdrawal",
  "relay"
]);
const BEATS=Object.freeze({
  active_shinobi:Object.freeze({
    title:"ACTIVE SHINOBI",
    text:"The Active shinobi represents your side's normal action opportunity. Benched and Reserve shinobi wait until they enter the Active position.",
    focus:"active"
  }),
  guest_ally_control:Object.freeze({
    title:"GUEST ALLY",
    text:"A Guest Ally is a temporary Story ally under your control while Active. Controlling them does not add them to My Clan or grant ownership.",
    focus:"active"
  }),
  independent_ally_control:Object.freeze({
    title:"INDEPENDENT ALLY",
    text:"An Independent Ally is a temporary ally who acts automatically. They can fight beside you without becoming player-owned.",
    focus:"active"
  }),
  skills_action_dock:Object.freeze({
    title:"SKILLS",
    text:"SKILLS shows the current Active shinobi's legal prepared Battle actions. Choose the technique you want that shinobi to use.",
    focus:"skills"
  }),
  battle_pl:Object.freeze({
    title:"BATTLE PL",
    text:"Battle PL is this shinobi's current combat capacity for the Battle. Damage reduces it. Reaching 0 PL means withdrawal — not injury or death.",
    focus:"pl"
  }),
  withdrawal:Object.freeze({
    title:"WITHDRAWAL",
    text:"A shinobi at 0 Battle PL withdraws from the current Battle. Withdrawal does not by itself mean injury or death.",
    focus:"withdrawal"
  }),
  relay:Object.freeze({
    title:"RELAY",
    text:"When the Active position opens, the next eligible Benched or Reserve participant becomes Active. Normal Battle ordering continues.",
    focus:"relay"
  })
});

function clone(value){
  try{return JSON.parse(JSON.stringify(value));}catch(_error){return value;}
}
function normalizePending(rows){
  const seen=new Set();
  const out=[];
  for(const row of Array.isArray(rows)?rows:[]){
    if(!row||!BEATS[row.beatId]||seen.has(row.beatId))continue;
    seen.add(row.beatId);
    out.push({
      beatId:row.beatId,
      actionId:row.actionId?String(row.actionId):null,
      ready:row.ready===true
    });
  }
  return out;
}
function normalizeState(raw){
  const source=raw&&typeof raw==="object"?raw:{};
  const seen=[...new Set((Array.isArray(source.seenBeatIds)?source.seenBeatIds:[]).filter(id=>!!BEATS[id]))];
  const skipped=source.skipped===true;
  return {
    familyId:FAMILY_ID,
    version:VERSION,
    started:source.started===true,
    boundBattleId:source.boundBattleId?String(source.boundBattleId):null,
    skipped,
    seenBeatIds:seen,
    currentBeatId:!skipped&&BEATS[source.currentBeatId]?source.currentBeatId:null,
    currentActionId:!skipped&&source.currentActionId?String(source.currentActionId):null,
    pendingEvents:skipped?[]:normalizePending(source.pendingEvents)
  };
}
function readPersistedState(){
  try{
    if(typeof localStorage==="undefined"||typeof PLAYER_SAVE_KEY==="undefined")return null;
    const raw=localStorage.getItem(PLAYER_SAVE_KEY);
    const parsed=raw?JSON.parse(raw):null;
    return parsed&&parsed[SAVE_FIELD]||null;
  }catch(_error){return null;}
}
let state=normalizeState(readPersistedState());
function installStateOnPlayerData(){
  try{
    if(typeof playerData==="object"&&playerData){
      playerData[SAVE_FIELD]=normalizeState(state);
      return true;
    }
  }catch(_error){}
  return false;
}
function persist(){
  state=normalizeState(state);
  installStateOnPlayerData();
  try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
  return clone(state);
}
installStateOnPlayerData();

function activeBattle(){
  try{return typeof currentBattle==="object"&&currentBattle&&currentBattle.active===true&&currentBattle.battleOver!==true?currentBattle:null;}
  catch(_error){return null;}
}
function activePlayer(){
  try{return typeof getBattleDeploymentParticipant==="function"?getBattleDeploymentParticipant("player",1):null;}
  catch(_error){return null;}
}
function participantClass(actor){
  if(!actor)return null;
  const explicit=String(actor.participantClass||"").toLowerCase();
  if(explicit==="guest_ally"||explicit==="independent_ally")return explicit;
  if(String(actor.controlAuthority||"").toLowerCase()==="ai")return"independent_ally";
  return"owned";
}
function productionBattleIdentityLooksReal(b){
  if(!b)return false;
  // Explicit browser-QA fixtures are not production Battles and must never
  // consume the player's first-Battle tutorial claim. Real-player-path QA
  // (notably #373) deliberately does not set this flag and therefore exercises
  // the actual tutorial.
  if(globalThis.SC_DISABLE_FIRST_PL_BATTLE_TUTORIAL_QA===true)return false;
  const identity=[b.battleId,b.encounterId,b.battleConfigId,b.objectiveId].filter(Boolean).join("|").toLowerCase();
  return !/(diagnostic|preview|replay|qa_only|test_fixture)/.test(identity);
}
function renderedActionDockExists(){
  try{
    const row=document.querySelector(".alpha-code-battle-stage .battle-live-action-family-row");
    return !!(row&&row.querySelector("button"));
  }catch(_error){return false;}
}
function qualifyingFirstBattle(){
  const b=activeBattle(),actor=activePlayer();
  if(!b||!actor||!productionBattleIdentityLooksReal(b))return false;
  const cls=participantClass(actor);
  if(cls==="independent_ally"||String(actor.controlAuthority||"").toLowerCase()==="ai")return false;
  return renderedActionDockExists();
}
function beatSeen(id){return state.seenBeatIds.includes(id);}
function beatQueued(id){return state.pendingEvents.some(row=>row.beatId===id);}
function queueBeat(id,{actionId=null,ready=true}={}){
  if(state.skipped||!state.started||!BEATS[id]||beatSeen(id)||state.currentBeatId===id||beatQueued(id))return false;
  state.pendingEvents.push({beatId:id,actionId:actionId?String(actionId):null,ready:ready===true});
  persist();
  return true;
}
function bindFirstQualifyingBattle(){
  if(state.skipped||state.started)return false;
  const b=activeBattle();
  if(!b||!qualifyingFirstBattle())return false;
  state.started=true;
  state.boundBattleId=String(b.battleId||b.encounterId||"production_pl_battle");
  persist();
  queueBeat("active_shinobi",{ready:true});
  return true;
}
function relationshipBeatFor(actor){
  const cls=participantClass(actor);
  if(cls==="guest_ally")return"guest_ally_control";
  if(cls==="independent_ally")return"independent_ally_control";
  return null;
}
function clearFocus(){
  if(typeof document==="undefined")return;
  for(const node of document.querySelectorAll("[data-sc-pl-tutorial-focus]"))node.removeAttribute("data-sc-pl-tutorial-focus");
}
function applyFocus(kind){
  clearFocus();
  if(typeof document==="undefined")return;
  let selectors=[];
  if(kind==="active")selectors=[".battle-live-active-card-player"];
  else if(kind==="skills")selectors=[".battle-live-action-family-row button[data-formation-family='skills']", ".battle-live-skill-deck"];
  else if(kind==="pl")selectors=[".battle-live-power-player",".battle-live-power-enemy"];
  else if(kind==="withdrawal")selectors=[".battle-live-active-exit-echo",".battle2-performance-result-chip[data-result='WITHDRAWAL']"];
  else if(kind==="relay")selectors=[".battle-live-active-card-player",".battle-live-active-card-enemy",".battle-live-roster-player",".battle-live-roster-enemy"];
  for(const selector of selectors){
    for(const node of document.querySelectorAll(selector))node.setAttribute("data-sc-pl-tutorial-focus","true");
  }
}
function tutorialRoot(){return typeof document!=="undefined"?document.querySelector(".sc-pl-battle-tutorial-38500"):null;}
function isBlocking(){
  const root=tutorialRoot();
  return !!(root&&root.isConnected);
}
function nextReadyPendingIndex(){
  return state.pendingEvents.findIndex(row=>row.ready===true&&!beatSeen(row.beatId));
}
function makeTutorialDOM(beatId){
  if(typeof document==="undefined")return null;
  const beat=BEATS[beatId];if(!beat)return null;
  const root=document.createElement("aside");
  root.className="sc-pl-battle-tutorial-38500";
  root.dataset.tutorialFamily=FAMILY_ID;
  root.dataset.tutorialBeat=beatId;
  root.setAttribute("role","dialog");
  root.setAttribute("aria-modal","true");
  root.setAttribute("aria-label",beat.title+" Battle tutorial");
  const panel=document.createElement("div");
  panel.className="sc-pl-battle-tutorial-panel";
  const kicker=document.createElement("small");kicker.textContent="BATTLE TUTORIAL";
  const title=document.createElement("strong");title.textContent=beat.title;
  const body=document.createElement("p");body.textContent=beat.text;
  const actions=document.createElement("div");actions.className="sc-pl-battle-tutorial-actions";
  const next=document.createElement("button");next.type="button";next.textContent="CONTINUE";next.dataset.tutorialAction="continue";next.addEventListener("click",()=>globalThis.acknowledgePLBattleTutorialBeat38500());
  const skip=document.createElement("button");skip.type="button";skip.textContent="SKIP TUTORIAL";skip.dataset.tutorialAction="skip";skip.addEventListener("click",()=>globalThis.skipPLBattleTutorial38500());
  actions.append(next,skip);panel.append(kicker,title,body,actions);root.append(panel);
  return root;
}
function renderPrompt(){
  if(globalThis.SC_DISABLE_FIRST_PL_BATTLE_TUTORIAL_QA===true){
    const old=tutorialRoot();if(old)old.remove();
    clearFocus();
    return false;
  }
  if(state.skipped||!state.started)return false;
  const stage=typeof document!=="undefined"?document.querySelector(".alpha-code-battle-stage"):null;
  if(!stage)return false;
  let beatId=state.currentBeatId;
  if(!beatId){
    const index=nextReadyPendingIndex();
    if(index<0)return false;
    const row=state.pendingEvents.splice(index,1)[0];
    beatId=row.beatId;
    state.currentBeatId=beatId;
    state.currentActionId=row.actionId||null;
    persist();
  }
  const beat=BEATS[beatId];if(!beat)return false;
  const old=tutorialRoot();if(old)old.remove();
  applyFocus(beat.focus);
  const root=makeTutorialDOM(beatId);
  if(!root)return false;
  stage.appendChild(root);
  return true;
}
function resumePresentationQueue(){
  try{
    if(typeof globalThis.resumeBattlePresentationAfterTutorial33000==="function"){
      globalThis.resumeBattlePresentationAfterTutorial33000();
    }
  }catch(_error){}
}
function acknowledgeCurrent(){
  const id=state.currentBeatId;
  if(!id||!BEATS[id])return false;
  if(!state.seenBeatIds.includes(id))state.seenBeatIds.push(id);
  state.currentBeatId=null;state.currentActionId=null;
  persist();
  const root=tutorialRoot();if(root)root.remove();
  clearFocus();
  if(!renderPrompt())resumePresentationQueue();
  return true;
}
function skipTutorial(){
  state.skipped=true;
  state.currentBeatId=null;state.currentActionId=null;state.pendingEvents=[];
  persist();
  const root=tutorialRoot();if(root)root.remove();
  clearFocus();
  resumePresentationQueue();
  return true;
}
function markActionEventsReady(actionId){
  const id=actionId?String(actionId):null;
  if(!id)return false;
  let changed=false;
  for(const row of state.pendingEvents){
    if(row.actionId===id&&row.ready!==true){row.ready=true;changed=true;}
  }
  if(changed)persist();
  return changed;
}
function onPresentationSettled(receipt){
  if(state.skipped||!state.started)return false;
  const actionId=receipt&&receipt.actionId||null;
  markActionEventsReady(actionId);
  renderPrompt();
  return isBlocking();
}

const shownControlBadges=new Set();
function projectParticipantControlBadge(){
  if(typeof document==="undefined")return false;
  const b=activeBattle(),actor=activePlayer(),card=document.querySelector(".battle-live-active-card-player");
  if(!b||!actor||!card)return false;
  const cls=participantClass(actor);
  if(!["guest_ally","independent_ally"].includes(cls))return false;
  const key=String(b.battleId||"battle")+":"+String(actor.id||"participant")+":"+cls;
  if(shownControlBadges.has(key))return false;
  shownControlBadges.add(key);
  const badge=document.createElement("div");
  badge.className="sc-battle-control-badge-38500";
  badge.dataset.participantClass=cls;
  const label=document.createElement("strong");
  label.textContent=cls==="guest_ally"?"GUEST ALLY":"INDEPENDENT ALLY";
  const detail=document.createElement("span");
  detail.textContent=cls==="guest_ally"?"PLAYER CONTROLLED":"COMPUTER CONTROLLED";
  badge.append(label,detail);card.appendChild(badge);
  setTimeout(()=>{try{badge.classList.add("is-leaving");setTimeout(()=>badge.remove(),260);}catch(_error){}},2400);
  return true;
}
function afterBattleRender(){
  projectParticipantControlBadge();
  if(globalThis.SC_DISABLE_FIRST_PL_BATTLE_TUTORIAL_QA===true){
    const root=tutorialRoot();if(root)root.remove();
    clearFocus();
    return clone(state);
  }
  bindFirstQualifyingBattle();
  if(state.started&&!state.skipped){
    const relation=relationshipBeatFor(activePlayer());
    if(relation)queueBeat(relation,{ready:true});
    renderPrompt();
  }
  return clone(state);
}

const PRIOR_RENDER_COMBAT_38500=typeof renderCombatOverlay==="function"?renderCombatOverlay:null;
if(PRIOR_RENDER_COMBAT_38500){
  const wrapped=function(container){
    const result=PRIOR_RENDER_COMBAT_38500.apply(this,arguments);
    afterBattleRender();
    return result;
  };
  globalThis.renderCombatOverlay=wrapped;try{renderCombatOverlay=wrapped;}catch(_error){}
}

const PRIOR_OPEN_SKILLS_38500=typeof openBattleSkillsActionFamily==="function"?openBattleSkillsActionFamily:null;
if(PRIOR_OPEN_SKILLS_38500){
  const wrapped=function(){
    const result=PRIOR_OPEN_SKILLS_38500.apply(this,arguments);
    if(result&&result.success===true&&state.started&&!state.skipped){
      queueBeat("skills_action_dock",{ready:true});
      queueMicrotask(()=>renderPrompt());
    }
    return result;
  };
  globalThis.openBattleSkillsActionFamily=wrapped;try{openBattleSkillsActionFamily=wrapped;}catch(_error){}
}

let lastDamageActionId38500=null;
const PRIOR_RECORD_EVIDENCE_38500=typeof recordBattleEvidence==="function"?recordBattleEvidence:null;
if(PRIOR_RECORD_EVIDENCE_38500){
  const wrapped=function(definition){
    const result=PRIOR_RECORD_EVIDENCE_38500.apply(this,arguments);
    if(!state.started||state.skipped||!definition)return result;
    const type=String(definition.eventType||"");
    const actionId=definition.actionId?String(definition.actionId):null;
    if(type==="damage_resolved"||type==="direct_battle_pl_loss_resolved"){
      const data=definition.data||{};
      const before=Number(data.remainingBattlePLBefore);
      const after=Number(data.remainingBattlePLAfter);
      if(actionId)lastDamageActionId38500=actionId;
      if(Number.isFinite(before)&&Number.isFinite(after)&&after<before){
        queueBeat("battle_pl",{actionId,ready:false});
      }
    }
    if(type==="battle_participant_withdrawn"){
      const data=definition.data||{};
      const linkedActionId=actionId||lastDamageActionId38500;
      if(String(data.reason||"")==="zero_remaining_battle_pl"){
        queueBeat("withdrawal",{actionId:linkedActionId,ready:false});
        if(data.replacementParticipantId)queueBeat("relay",{actionId:linkedActionId,ready:false});
      }
    }
    return result;
  };
  globalThis.recordBattleEvidence=wrapped;try{recordBattleEvidence=wrapped;}catch(_error){}
}

globalThis.onPLBattlePresentationSettled38500=onPresentationSettled;
globalThis.isPLBattleTutorialPresentationBlocking38500=isBlocking;
globalThis.acknowledgePLBattleTutorialBeat38500=acknowledgeCurrent;
globalThis.skipPLBattleTutorial38500=skipTutorial;
globalThis.getPLBattleTutorialState38500=function(){return clone(state);};
globalThis.queuePLBattleTutorialBeat38500=function(beatId,options){return queueBeat(beatId,options||{});};

if(typeof document!=="undefined"&&!document.getElementById("sc-pl-battle-tutorial-38500-style")){
  const style=document.createElement("style");
  style.id="sc-pl-battle-tutorial-38500-style";
  style.textContent=`
    .sc-pl-battle-tutorial-38500{position:absolute;inset:0;z-index:80;display:flex;align-items:flex-end;justify-content:center;padding:0 20px 7.5%;background:rgba(1,5,8,.24);backdrop-filter:blur(1px);pointer-events:auto}
    .sc-pl-battle-tutorial-panel{width:min(650px,74%);padding:16px 18px 15px;border:1px solid rgba(218,178,78,.54);border-radius:14px;background:linear-gradient(160deg,rgba(3,13,18,.97),rgba(2,7,11,.98));box-shadow:0 22px 55px rgba(0,0,0,.58);text-align:left}
    .sc-pl-battle-tutorial-panel small{display:block;margin-bottom:4px;color:#75dce4;font-size:10px;font-weight:900;letter-spacing:.16em}
    .sc-pl-battle-tutorial-panel strong{display:block;color:#f1e5c7;font-size:18px;letter-spacing:.055em}
    .sc-pl-battle-tutorial-panel p{margin:8px 0 14px;color:#d5e0df;font-size:13px;line-height:1.5}
    .sc-pl-battle-tutorial-actions{display:flex;gap:9px;justify-content:flex-end}
    .sc-pl-battle-tutorial-actions button{padding:8px 13px;border:1px solid rgba(110,203,211,.34);border-radius:8px;background:rgba(8,31,38,.92);color:#e7f5f4;font:800 10px/1 inherit;letter-spacing:.08em;cursor:pointer}
    .sc-pl-battle-tutorial-actions button[data-tutorial-action="skip"]{border-color:rgba(151,161,164,.26);background:rgba(12,18,21,.88);color:#aebbbc}
    [data-sc-pl-tutorial-focus="true"]{filter:brightness(1.12) drop-shadow(0 0 14px rgba(96,218,226,.38))!important}
    .sc-battle-control-badge-38500{position:absolute;left:50%;bottom:-30px;z-index:28;transform:translateX(-50%);min-width:132px;padding:6px 11px;border:1px solid rgba(112,220,228,.42);border-radius:9px;background:rgba(2,10,14,.92);box-shadow:0 10px 24px rgba(0,0,0,.45);text-align:center;pointer-events:none;animation:sc385ControlBadgeIn .22s ease-out both}
    .sc-battle-control-badge-38500 strong{display:block;color:#f0e4c8;font-size:9px;letter-spacing:.12em}
    .sc-battle-control-badge-38500 span{display:block;margin-top:2px;color:#72dbe4;font-size:7px;font-weight:800;letter-spacing:.10em}
    .sc-battle-control-badge-38500.is-leaving{opacity:0;transform:translateX(-50%) translateY(4px);transition:opacity .24s ease,transform .24s ease}
    @keyframes sc385ControlBadgeIn{from{opacity:0;transform:translateX(-50%) translateY(6px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
    @media(max-width:900px){.sc-pl-battle-tutorial-panel{width:88%}.sc-pl-battle-tutorial-38500{padding-bottom:10%}}
  `;
  document.head.appendChild(style);
}

function diagnostics(){
  const stateSource=String(normalizeState)+String(readPersistedState)+String(persist);
  const eventSource=String(PRIOR_RECORD_EVIDENCE_38500&&recordBattleEvidence||"");
  const checks={
    familyId:FAMILY_ID==="pl_battle_tutorial_v1",
    exactBeatSet:BEAT_ORDER.join("|")==="active_shinobi|guest_ally_control|independent_ally_control|skills_action_dock|battle_pl|withdrawal|relay",
    playerSaveScoped:stateSource.includes("PLAYER_SAVE_KEY")&&stateSource.includes("plBattleTutorialV1"),
    firstBattleNotMenmaHardcoded:!String(bindFirstQualifyingBattle).includes("academy_menma")&&!String(qualifyingFirstBattle).includes("origin_academy_menma"),
    guestAndIndependentDistinct:BEATS.guest_ally_control.title==="GUEST ALLY"&&BEATS.independent_ally_control.title==="INDEPENDENT ALLY",
    skipPersists:String(skipTutorial).includes("state.skipped=true")&&String(skipTutorial).includes("persist()"),
    tutorialNeverCommitsBattleSemantics:![queueBeat,renderPrompt,acknowledgeCurrent,skipTutorial,onPresentationSettled].some(fn=>/setBattleRemainingPL|consumeBattleActionOpportunity|advanceBattleParticipantAtZeroPL|beginBattleActionResolution/.test(String(fn))),
    presentationSettleGate:typeof globalThis.resumeBattlePresentationAfterTutorial33000==="function"&&typeof globalThis.onPLBattlePresentationSettled38500==="function",
    battlePlFromCommittedEvidence:String(PRIOR_RECORD_EVIDENCE_38500||"").length>0,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.runFirstPLBattleTutorial38500Diagnostics=diagnostics;
globalThis.SC_PL_BATTLE_TUTORIAL_38500=Object.freeze({patchId:PATCH_ID,familyId:FAMILY_ID,beatIds:BEAT_ORDER,browserGoldenClaimed:false});
})();
