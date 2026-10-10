// ============================================================================
// ISSUE #603 / #608 — PROMOTION ARENA UI / LIVE-TRUTH-SLOT PROJECTION — 60320
//
// Presentation-only adapter for the Field Readiness Assessment. Runtime owners
// supply all facts/actions. This module never derives Promotion truth, mission
// outcomes, rewards, Rank results, or hidden readiness satisfaction.
// ============================================================================
(function installPromotionArenaUI60320(){
"use strict";
if(globalThis.SC_PROMOTION_ARENA_UI_60320)return;

const PATCH_ID="promotion_arena_ui_60320_2026_10_10_player_route";
const STYLE_ID="sc-promotion-arena-ui-60320-style";
// Retained as durable composition/reference lineage only. Do not use this
// baked master as the live full-screen mutable-truth background.
const ARENA_ASSET="UI/arena_promotion.png";
const COMPONENT_ASSET="UI/ui_components.png";
const SLOT_COUNT=4;
const OUTCOMES=Object.freeze(["PASS","FAIL","ABORTED","WITHDRAWN"]);
const PHASES=Object.freeze(["IDLE","INSPECTION","COMMITTED","RESOLVED"]);
const controllers=new WeakMap();

function safeText(value,maxLength=220){
  if(typeof value!=="string"&&typeof value!=="number")return"";
  return String(value).replace(/[\u0000-\u001F\u007F]/g," ").replace(/\s+/g," ").trim().slice(0,Math.max(0,maxLength));
}
function safeBoolean(value){return value===true;}
function normalizeOutcome(value){const exact=safeText(value,32).toUpperCase();return OUTCOMES.includes(exact)?exact:null;}
function normalizePhase(value){const exact=safeText(value,32).toUpperCase();return PHASES.includes(exact)?exact:"IDLE";}
function publicSlotLabel60320(raw,index,revealed){
  if(!revealed)return"??????";
  return safeText(raw&&raw.publicLabel,80)||safeText(raw&&raw.label,80)||`Readiness Slot ${index+1}`;
}
function normalizeReadinessSlot60320(raw,index){
  const source=raw&&typeof raw==="object"?raw:{};
  const revealed=source.revealed===true;
  if(!revealed){
    return Object.freeze({index,revealed:false,publicLabel:"??????",state:"HIDDEN",stateLabel:"Hidden"});
  }
  const satisfied=source.satisfied===true;
  return Object.freeze({
    index,revealed:true,publicLabel:publicSlotLabel60320(source,index,true),
    state:satisfied?"CLEAR":"NOT_CLEAR",stateLabel:satisfied?"Clear":"Not clear"
  });
}
function normalizeRewardLines60320(value){
  if(!Array.isArray(value))return[];
  return value.slice(0,12).map(row=>{
    if(typeof row==="string"||typeof row==="number"){const label=safeText(row,160);return label?Object.freeze({label,value:""}):null;}
    if(!row||typeof row!=="object")return null;
    const label=safeText(row.publicLabel,120)||safeText(row.label,120)||safeText(row.name,120);
    const displayValue=safeText(row.publicValue,100)||safeText(row.value,100);
    return label?Object.freeze({label,value:displayValue}):null;
  }).filter(Boolean);
}
function normalizePublicLines60320(value,max=8){return Array.isArray(value)?value.slice(0,max).map(row=>safeText(row,200)).filter(Boolean):[];}
function normalizeAssessmentRecord60320(raw){
  if(!raw||typeof raw!=="object")return null;
  const outcome=normalizeOutcome(raw.outcome),attemptNumber=Number.isInteger(raw.attemptNumber)&&raw.attemptNumber>0?raw.attemptNumber:null;
  const startedLabel=safeText(raw.startedLabel,80),resolvedLabel=safeText(raw.resolvedLabel,80),publicSummary=safeText(raw.publicSummary,240),statusLabel=safeText(raw.statusLabel,80);
  if(!outcome&&!attemptNumber&&!startedLabel&&!resolvedLabel&&!publicSummary&&!statusLabel)return null;
  return Object.freeze({outcome,attemptNumber,startedLabel,resolvedLabel,publicSummary,statusLabel});
}
function normalizeReceipt60320(raw){
  if(!raw||typeof raw!=="object")return null;
  const causeLabel=safeText(raw.causeLabel,180),provenanceLabel=safeText(raw.provenanceLabel,180),title=safeText(raw.title,100)||"Chronicle Receipt";
  const rewardLines=normalizeRewardLines60320(raw.rewardLines||raw.rewards),consequenceLines=normalizePublicLines60320(raw.consequenceLines||raw.consequences||raw.historyLines,8);
  if(!causeLabel&&!provenanceLabel&&!rewardLines.length&&!consequenceLines.length)return null;
  return Object.freeze({title,causeLabel,provenanceLabel,rewardLines,consequenceLines});
}
function normalizeMissionAction60320(raw,index){
  if(!raw||typeof raw!=="object")return null;
  const actionId=safeText(raw.actionId||raw.id,96),label=safeText(raw.label,120),detail=safeText(raw.detail,220),kind=safeText(raw.kind,24)||"standard";
  if(!actionId||!label)return null;
  return Object.freeze({actionId,label,detail,kind,disabled:raw.disabled===true});
}
function normalizeMission60320(raw){
  if(!raw||typeof raw!=="object")return null;
  const title=safeText(raw.title||raw.missionTitle,120),objective=safeText(raw.objective,260),currentTask=safeText(raw.currentTask,220),locationLabel=safeText(raw.locationLabel||raw.currentHostLabel,100),statusLabel=safeText(raw.statusLabel||raw.status,80);
  const actions=Array.isArray(raw.actions)?raw.actions.map(normalizeMissionAction60320).filter(Boolean).slice(0,8):[];
  if(!title&&!objective&&!currentTask&&!actions.length)return null;
  return Object.freeze({title,objective,currentTask,locationLabel,statusLabel,actions:Object.freeze(actions)});
}
function normalizePromotionArenaTruth60320(raw){
  const source=raw&&typeof raw==="object"?raw:{},inputSlots=Array.isArray(source.readinessSlots)?source.readinessSlots:[],readinessSlots=[];
  for(let index=0;index<SLOT_COUNT;index+=1)readinessSlots.push(normalizeReadinessSlot60320(inputSlots[index],index));
  const record=normalizeAssessmentRecord60320(source.assessmentRecord),explicitOutcome=normalizeOutcome(source.outcome),outcome=explicitOutcome||(record&&record.outcome)||null;
  const revealedCount=readinessSlots.filter(slot=>slot.revealed).length,clearRevealedCount=readinessSlots.filter(slot=>slot.revealed&&slot.state==="CLEAR").length;
  return Object.freeze({
    phase:normalizePhase(source.phase),currentRankLabel:safeText(source.currentRankLabel,80)||"Current Rank",targetRankLabel:safeText(source.targetRankLabel,80)||"Promotion Target",
    publicInstruction:safeText(source.publicInstruction,260),canInspect:source.canInspect!==false,canEnterAssessment:safeBoolean(source.canEnterAssessment),canWithdraw:safeBoolean(source.canWithdraw),canAbort:safeBoolean(source.canAbort),
    attemptUnavailableReason:safeText(source.attemptUnavailableReason,180),readinessSlots:Object.freeze(readinessSlots),revealedCount,clearRevealedCount,
    assessmentRecord:record,outcome,outcomeSummary:safeText(source.outcomeSummary,260),receipt:normalizeReceipt60320(source.receipt),mission:normalizeMission60320(source.mission)
  });
}

function ensureStyles60320(doc){
  if(!doc||!doc.head||doc.getElementById(STYLE_ID))return;
  const style=doc.createElement("style");style.id=STYLE_ID;
  style.textContent=`
.sc60320-stage{position:relative;isolation:isolate;width:100%;min-height:min(78vh,820px);box-sizing:border-box;overflow:auto;border-radius:18px;background:linear-gradient(145deg,#11171d,#080c10 58%,#15110b);box-shadow:0 20px 52px rgba(0,0,0,.36);color:#f7f4ec;font-family:inherit}
.sc60320-stage *{box-sizing:border-box}.sc60320-stage__veil{position:relative;z-index:1;min-height:inherit;padding:clamp(18px,3vw,38px);display:grid;grid-template-columns:minmax(0,1.05fr) minmax(300px,.95fr);grid-template-areas:"header header" "mission mission" "readiness record" "actions outcome";gap:clamp(14px,2vw,22px);align-content:start}
.sc60320-header{grid-area:header;display:flex;align-items:flex-start;justify-content:space-between;gap:18px;padding:4px 4px 8px;border-bottom:1px solid rgba(216,177,92,.25)}.sc60320-header__actions{display:flex;align-items:flex-start;gap:12px}.sc60320-kicker{margin:0 0 5px;font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;font-weight:800;color:#d7b65d}.sc60320-title{margin:0;font-size:clamp(1.55rem,3vw,2.7rem);line-height:1.05}.sc60320-rank{text-align:right;font-weight:750;font-size:.95rem;line-height:1.35}.sc60320-rank__arrow{padding:0 .45em;opacity:.7}.sc60320-close{appearance:none;width:42px;height:42px;border:1px solid rgba(216,177,92,.45);border-radius:50%;background:rgba(0,0,0,.2);color:#f1cf78;font-size:18px;cursor:pointer}
.sc60320-panel{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:16px;background:rgba(8,12,18,.88);box-shadow:0 12px 30px rgba(0,0,0,.28)}.sc60320-panel::before{content:"";position:absolute;inset:0;z-index:-1;background-image:url("${COMPONENT_ASSET}");background-size:cover;background-position:center;opacity:.055;filter:saturate(.65) contrast(1.08);pointer-events:none}.sc60320-panel__body{padding:clamp(16px,2vw,23px)}.sc60320-panel h3{margin:0 0 12px;font-size:1rem;letter-spacing:.08em;text-transform:uppercase;color:#e7c66b}
.sc60320-mission{grid-area:mission;border-color:rgba(82,208,220,.28);background:linear-gradient(135deg,rgba(8,18,24,.94),rgba(13,17,20,.9))}.sc60320-mission__head{display:flex;justify-content:space-between;gap:14px;align-items:flex-start}.sc60320-mission__title{margin:0!important;font-size:1.22rem!important;letter-spacing:.04em!important}.sc60320-mission__meta{font-size:.78rem;color:#7edce4;text-align:right}.sc60320-mission__objective{margin:8px 0 0;font-size:.95rem;line-height:1.5;color:#e4e1d8}.sc60320-mission__task{margin:14px 0;padding:12px 14px;border-left:3px solid #d8b65d;background:rgba(216,182,93,.07);line-height:1.45}.sc60320-mission__task strong{display:block;margin-bottom:4px;color:#d9ba69;font-size:.74rem;letter-spacing:.12em;text-transform:uppercase}.sc60320-mission-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:12px}.sc60320-mission-action{min-height:44px}.sc60320-mission-action small{display:block;font-weight:500;opacity:.72;margin-top:3px}
.sc60320-readiness{grid-area:readiness}.sc60320-record{grid-area:record}.sc60320-actions{grid-area:actions}.sc60320-outcome{grid-area:outcome}.sc60320-summary{margin:0 0 14px;font-size:.92rem;opacity:.86}.sc60320-slots{display:grid;gap:10px;list-style:none;margin:0;padding:0}.sc60320-slot{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;min-height:58px;padding:12px 14px;border:1px solid rgba(255,255,255,.15);border-radius:12px;background:rgba(0,0,0,.16)}.sc60320-slot__name{font-weight:750;line-height:1.25}.sc60320-slot__state{display:inline-flex;align-items:center;justify-content:center;min-width:84px;padding:6px 9px;border:1px solid currentColor;border-radius:999px;font-size:.76rem;font-weight:850;letter-spacing:.06em;text-transform:uppercase}.sc60320-slot[data-state="HIDDEN"]{color:#9da7ad}.sc60320-slot[data-state="CLEAR"] .sc60320-slot__state{background:rgba(40,120,76,.28)}.sc60320-slot[data-state="NOT_CLEAR"] .sc60320-slot__state{background:rgba(142,74,45,.26)}
.sc60320-record__grid{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px 12px;margin:0}.sc60320-record__grid dt{font-weight:800;opacity:.72}.sc60320-record__grid dd{margin:0;min-width:0;overflow-wrap:anywhere}.sc60320-record__empty{margin:0;opacity:.75}.sc60320-actions__copy{margin:0 0 14px;line-height:1.5}.sc60320-action-row{display:flex;flex-wrap:wrap;gap:10px}.sc60320-button{appearance:none;min-height:44px;padding:10px 16px;border:1px solid rgba(255,255,255,.3);border-radius:10px;background:linear-gradient(rgba(31,38,45,.86),rgba(12,16,20,.95));color:inherit;font:inherit;font-weight:800;cursor:pointer;box-shadow:0 7px 18px rgba(0,0,0,.22)}.sc60320-button:hover:not(:disabled),.sc60320-button:focus-visible:not(:disabled){border-color:#e5c66b;transform:translateY(-1px)}.sc60320-button:focus-visible,.sc60320-close:focus-visible{outline:3px solid #7edce4;outline-offset:3px}.sc60320-button:disabled{cursor:not-allowed;opacity:.46}.sc60320-button--primary{border-color:rgba(216,182,93,.62);color:#f4d882}.sc60320-button--danger{border-style:dashed}.sc60320-unavailable{margin:11px 0 0;font-size:.86rem;opacity:.78}.sc60320-outcome-badge{display:inline-flex;align-items:center;min-height:38px;padding:7px 12px;border:1px solid currentColor;border-radius:999px;font-size:.88rem;font-weight:900;letter-spacing:.1em}.sc60320-outcome-copy{margin:12px 0 0;line-height:1.5}.sc60320-receipt{margin-top:18px;padding-top:16px;border-top:1px solid rgba(255,255,255,.16)}.sc60320-receipt h4{margin:0 0 10px;font-size:.95rem;letter-spacing:.08em;text-transform:uppercase}.sc60320-receipt__meta{display:grid;gap:7px;margin-bottom:11px;font-size:.88rem}.sc60320-receipt__meta strong{display:inline-block;min-width:86px}.sc60320-receipt__list{margin:8px 0 0;padding-left:20px}.sc60320-receipt__list li{margin:4px 0}.sc60320-live{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
@media(max-width:900px){.sc60320-stage__veil{grid-template-columns:1fr;grid-template-areas:"header" "mission" "readiness" "actions" "record" "outcome"}.sc60320-header{flex-direction:column}.sc60320-header__actions{width:100%;justify-content:space-between}.sc60320-rank{text-align:left}.sc60320-mission__head{flex-direction:column}.sc60320-mission__meta{text-align:left}}
@media(max-width:560px){.sc60320-stage{border-radius:0;min-height:100%}.sc60320-stage__veil{padding:14px;gap:12px}.sc60320-slot{grid-template-columns:1fr;gap:8px}.sc60320-slot__state{justify-self:start}.sc60320-action-row,.sc60320-mission-actions{display:grid;grid-template-columns:1fr}.sc60320-button{width:100%}.sc60320-record__grid{grid-template-columns:1fr;gap:3px}}
@media(prefers-reduced-motion:reduce){.sc60320-stage *{scroll-behavior:auto!important;transition:none!important;animation:none!important}.sc60320-button:hover:not(:disabled){transform:none}}
`;
  doc.head.appendChild(style);
}
function el(doc,tag,className,text){const node=doc.createElement(tag);if(className)node.className=className;if(text!==undefined&&text!==null)node.textContent=String(text);return node;}
function def(doc,dl,label,value){const safe=safeText(value,240);if(!safe)return;dl.append(el(doc,"dt",null,label),el(doc,"dd",null,safe));}
function button60320(doc,label,action,className=""){const node=el(doc,"button",`sc60320-button ${className}`.trim(),label);node.type="button";node.dataset.action60320=action;return node;}
function buildShell60320(doc){
  const root=el(doc,"section","sc60320-stage");root.dataset.scPromotionArenaUi="60320";root.setAttribute("aria-labelledby","sc60320-title");
  const veil=el(doc,"div","sc60320-stage__veil"),header=el(doc,"header","sc60320-header"),heading=el(doc,"div");
  heading.append(el(doc,"p","sc60320-kicker","Official Promotion Assessment"),el(doc,"h2","sc60320-title","Field Readiness Assessment"));heading.lastChild.id="sc60320-title";
  const headerActions=el(doc,"div","sc60320-header__actions"),rank=el(doc,"div","sc60320-rank"),close=el(doc,"button","sc60320-close","✕");close.type="button";close.dataset.action60320="returnToKonoha";close.setAttribute("aria-label","Return to Konoha");headerActions.append(rank,close);header.append(heading,headerActions);
  const mission=el(doc,"section","sc60320-panel sc60320-mission"),missionBody=el(doc,"div","sc60320-panel__body"),missionHead=el(doc,"div","sc60320-mission__head"),missionTitle=el(doc,"h3","sc60320-mission__title","Field Assignment"),missionMeta=el(doc,"div","sc60320-mission__meta"),missionObjective=el(doc,"p","sc60320-mission__objective"),missionTask=el(doc,"div","sc60320-mission__task"),missionActions=el(doc,"div","sc60320-mission-actions");missionHead.append(missionTitle,missionMeta);missionBody.append(missionHead,missionObjective,missionTask,missionActions);mission.append(missionBody);
  const readiness=el(doc,"section","sc60320-panel sc60320-readiness"),readinessBody=el(doc,"div","sc60320-panel__body"),readinessHeading=el(doc,"h3",null,"Readiness"),summary=el(doc,"p","sc60320-summary"),slots=el(doc,"ol","sc60320-slots");readinessBody.append(readinessHeading,summary,slots);readiness.append(readinessBody);
  const record=el(doc,"section","sc60320-panel sc60320-record"),recordBody=el(doc,"div","sc60320-panel__body"),recordHeading=el(doc,"h3",null,"Assessment Record"),recordContent=el(doc,"div","sc60320-record__content");recordBody.append(recordHeading,recordContent);record.append(recordBody);
  const actions=el(doc,"section","sc60320-panel sc60320-actions"),actionsBody=el(doc,"div","sc60320-panel__body"),actionsHeading=el(doc,"h3",null,"Assessment Control"),actionsCopy=el(doc,"p","sc60320-actions__copy"),actionRow=el(doc,"div","sc60320-action-row");
  const inspect=button60320(doc,"Inspect Readiness","beginInspection"),enter=button60320(doc,"Enter Assessment","beginAssessment","sc60320-button--primary"),withdraw=button60320(doc,"Withdraw","withdrawAssessment"),abort=button60320(doc,"Abort Assessment","abortAssessment","sc60320-button--danger"),unavailable=el(doc,"p","sc60320-unavailable");actionRow.append(inspect,enter,withdraw,abort);actionsBody.append(actionsHeading,actionsCopy,actionRow,unavailable);actions.append(actionsBody);
  const outcome=el(doc,"section","sc60320-panel sc60320-outcome"),outcomeBody=el(doc,"div","sc60320-panel__body"),outcomeHeading=el(doc,"h3",null,"Assessment Outcome"),outcomeContent=el(doc,"div","sc60320-outcome__content"),receipt=el(doc,"div","sc60320-receipt");outcomeBody.append(outcomeHeading,outcomeContent,receipt);outcome.append(outcomeBody);
  const live=el(doc,"div","sc60320-live");live.setAttribute("role","status");live.setAttribute("aria-live","polite");live.setAttribute("aria-atomic","true");
  veil.append(header,mission,readiness,record,actions,outcome,live);root.append(veil);
  return{root,rank,close,mission,missionTitle,missionMeta,missionObjective,missionTask,missionActions,summary,slots,recordContent,actionsCopy,inspect,enter,withdraw,abort,unavailable,outcomeContent,receipt,live};
}
function renderRank60320(nodes,truth){const doc=nodes.rank.ownerDocument;nodes.rank.replaceChildren(el(doc,"span","sc60320-rank__current",truth.currentRankLabel),el(doc,"span","sc60320-rank__arrow","→"),el(doc,"span","sc60320-rank__target",truth.targetRankLabel));}
function renderSlots60320(nodes,truth){const doc=nodes.slots.ownerDocument;nodes.slots.replaceChildren();for(const slot of truth.readinessSlots){const li=el(doc,"li","sc60320-slot");li.dataset.state=slot.state;li.dataset.slotIndex=String(slot.index+1);li.setAttribute("aria-label",`${slot.publicLabel}: ${slot.stateLabel}`);li.append(el(doc,"span","sc60320-slot__name",slot.publicLabel),el(doc,"span","sc60320-slot__state",slot.stateLabel));nodes.slots.append(li);}nodes.summary.textContent=`Visible readiness: ${truth.revealedCount} of ${SLOT_COUNT} slots revealed.`;}
function renderRecord60320(nodes,truth){const doc=nodes.recordContent.ownerDocument;nodes.recordContent.replaceChildren();const record=truth.assessmentRecord;if(!record){nodes.recordContent.append(el(doc,"p","sc60320-record__empty","No committed assessment is recorded in this view."));return;}const dl=el(doc,"dl","sc60320-record__grid");if(record.attemptNumber)def(doc,dl,"Attempt",`#${record.attemptNumber}`);def(doc,dl,"Status",record.statusLabel);def(doc,dl,"Started",record.startedLabel);def(doc,dl,"Resolved",record.resolvedLabel);def(doc,dl,"Outcome",record.outcome);def(doc,dl,"Record",record.publicSummary);nodes.recordContent.append(dl);}
function renderMission60320(controller,truth){const {nodes}=controller,doc=nodes.mission.ownerDocument,mission=truth.mission;nodes.missionActions.replaceChildren();if(!mission){nodes.mission.hidden=true;return;}nodes.mission.hidden=false;nodes.missionTitle.textContent=mission.title||"Field Assignment";nodes.missionMeta.textContent=[mission.locationLabel,mission.statusLabel].filter(Boolean).join(" · ");nodes.missionObjective.textContent=mission.objective||"";nodes.missionObjective.hidden=!mission.objective;nodes.missionTask.replaceChildren(el(doc,"strong",null,"Current objective"),doc.createTextNode(mission.currentTask||"Follow the current field assignment."));for(const action of mission.actions){const btn=button60320(doc,action.label,"mission",action.kind==="primary"?"sc60320-button--primary sc60320-mission-action":"sc60320-mission-action");btn.dataset.missionAction60320=action.actionId;btn.disabled=action.disabled;if(action.detail)btn.title=action.detail;btn.addEventListener("click",()=>{void invokeAction60320(controller,"executeMissionAction",action.actionId);});nodes.missionActions.append(btn);}}
function renderReceipt60320(nodes,truth){const doc=nodes.receipt.ownerDocument;nodes.receipt.replaceChildren();const receipt=truth.receipt;if(!receipt){nodes.receipt.hidden=true;return;}nodes.receipt.hidden=false;nodes.receipt.append(el(doc,"h4",null,receipt.title));const meta=el(doc,"div","sc60320-receipt__meta");if(receipt.causeLabel){const row=el(doc,"div");row.append(el(doc,"strong",null,"Cause"),doc.createTextNode(` ${receipt.causeLabel}`));meta.append(row);}if(receipt.provenanceLabel){const row=el(doc,"div");row.append(el(doc,"strong",null,"Provenance"),doc.createTextNode(` ${receipt.provenanceLabel}`));meta.append(row);}if(meta.childNodes.length)nodes.receipt.append(meta);if(receipt.rewardLines.length){nodes.receipt.append(el(doc,"strong",null,"Rewards"));const list=el(doc,"ul","sc60320-receipt__list");for(const reward of receipt.rewardLines)list.append(el(doc,"li",null,reward.value?`${reward.label}: ${reward.value}`:reward.label));nodes.receipt.append(list);}if(receipt.consequenceLines.length){nodes.receipt.append(el(doc,"strong",null,"Recorded consequences"));const list=el(doc,"ul","sc60320-receipt__list");for(const line of receipt.consequenceLines)list.append(el(doc,"li",null,line));nodes.receipt.append(list);}}
function renderOutcome60320(nodes,truth){const doc=nodes.outcomeContent.ownerDocument;nodes.outcomeContent.replaceChildren();if(!truth.outcome)nodes.outcomeContent.append(el(doc,"p","sc60320-record__empty",truth.phase==="COMMITTED"?"Assessment in progress.":"No assessment outcome is recorded in this view."));else{const badge=el(doc,"span","sc60320-outcome-badge",truth.outcome);badge.dataset.outcome=truth.outcome;nodes.outcomeContent.append(badge);if(truth.outcomeSummary)nodes.outcomeContent.append(el(doc,"p","sc60320-outcome-copy",truth.outcomeSummary));}renderReceipt60320(nodes,truth);}
function renderActions60320(controller,truth){const {nodes,options}=controller,actions=options.actions&&typeof options.actions==="object"?options.actions:{},busy=controller.busy===true;nodes.inspect.disabled=busy||!truth.canInspect||typeof actions.beginInspection!=="function";nodes.enter.disabled=busy||!truth.canEnterAssessment||typeof actions.beginAssessment!=="function";nodes.withdraw.disabled=busy||!truth.canWithdraw||typeof actions.withdrawAssessment!=="function";nodes.abort.disabled=busy||!truth.canAbort||typeof actions.abortAssessment!=="function";nodes.withdraw.hidden=!truth.canWithdraw;nodes.abort.hidden=!truth.canAbort;nodes.inspect.hidden=truth.phase==="COMMITTED";nodes.enter.hidden=truth.phase==="COMMITTED";nodes.actionsCopy.textContent=truth.publicInstruction||"Inspecting readiness is read-only. Enter Assessment deliberately commits an attempt.";nodes.unavailable.textContent=!truth.canEnterAssessment&&truth.attemptUnavailableReason?truth.attemptUnavailableReason:"";nodes.unavailable.hidden=!nodes.unavailable.textContent;nodes.root.setAttribute("aria-busy",busy?"true":"false");}
function render60320(controller,rawTruth,{announce=true}={}){const truth=normalizePromotionArenaTruth60320(rawTruth);controller.truth=truth;renderRank60320(controller.nodes,truth);renderMission60320(controller,truth);renderSlots60320(controller.nodes,truth);renderRecord60320(controller.nodes,truth);renderActions60320(controller,truth);renderOutcome60320(controller.nodes,truth);if(announce)controller.nodes.live.textContent=`Promotion assessment view updated. ${truth.revealedCount} of ${SLOT_COUNT} readiness slots revealed.${truth.outcome?` Outcome ${truth.outcome}.`:""}`;return truth;}
async function resolveTruth60320(controller){const getter=controller.options.getTruth;if(typeof getter!=="function")return controller.options.truth||{};try{const value=getter();return value&&typeof value.then==="function"?await value:value;}catch(_error){return{};}}
async function refreshPromotionArenaUI60320(target,{announce=true}={}){const controller=target&&target.__sc60320Controller?target.__sc60320Controller:controllers.get(target)||target;if(!controller||!controller.nodes||!controller.nodes.root)return null;return render60320(controller,await resolveTruth60320(controller),{announce});}
async function invokeAction60320(controller,actionName,payload){if(controller.busy)return;const actions=controller.options.actions&&typeof controller.options.actions==="object"?controller.options.actions:{},action=actions[actionName];if(typeof action!=="function")return;controller.busy=true;renderActions60320(controller,controller.truth||normalizePromotionArenaTruth60320({}));controller.nodes.live.textContent=actionName==="beginAssessment"?"Committing assessment attempt.":"Updating assessment view.";try{const result=action(payload);if(result&&typeof result.then==="function")await result;if(result&&result.success===false)controller.nodes.live.textContent="That assessment action is not currently available.";}catch(error){if(typeof controller.options.onActionError==="function"){try{controller.options.onActionError({action:actionName,error});}catch(_){}}controller.nodes.live.textContent="The requested assessment action could not be completed.";}finally{controller.busy=false;await refreshPromotionArenaUI60320(controller,{announce:true});}}
function wireActions60320(controller){const mapping=[[controller.nodes.inspect,"beginInspection"],[controller.nodes.enter,"beginAssessment"],[controller.nodes.withdraw,"withdrawAssessment"],[controller.nodes.abort,"abortAssessment"],[controller.nodes.close,"returnToKonoha"]];for(const [node,action] of mapping)node.addEventListener("click",()=>{void invokeAction60320(controller,action);});}
function mountPromotionArenaUI60320(host,options={}){if(!host||typeof host.appendChild!=="function")throw new TypeError("Promotion UI host element is required");const doc=host.ownerDocument||globalThis.document;if(!doc||typeof doc.createElement!=="function")throw new Error("Promotion UI requires a DOM document");ensureStyles60320(doc);const previous=controllers.get(host);if(previous)unmountPromotionArenaUI60320(previous);const nodes=buildShell60320(doc);host.replaceChildren(nodes.root);const controller={host,nodes,options:options&&typeof options==="object"?options:{},truth:null,busy:false,destroyed:false};Object.defineProperty(controller,"__sc60320Controller",{value:controller,enumerable:false});controllers.set(host,controller);wireActions60320(controller);void refreshPromotionArenaUI60320(controller,{announce:false});return controller;}
function unmountPromotionArenaUI60320(target){const controller=target&&target.__sc60320Controller?target.__sc60320Controller:controllers.get(target)||target;if(!controller||controller.destroyed)return false;controller.destroyed=true;if(controller.host&&controllers.get(controller.host)===controller)controllers.delete(controller.host);if(controller.nodes&&controller.nodes.root&&controller.nodes.root.parentNode)controller.nodes.root.parentNode.removeChild(controller.nodes.root);return true;}
const api=Object.freeze({patchId:PATCH_ID,arenaAsset:ARENA_ASSET,componentAsset:COMPONENT_ASSET,readinessSlotCount:SLOT_COUNT,outcomes:OUTCOMES,normalizeTruth:normalizePromotionArenaTruth60320,mount:mountPromotionArenaUI60320,refresh:refreshPromotionArenaUI60320,unmount:unmountPromotionArenaUI60320,browserGoldenClaimed:false});
globalThis.normalizePromotionArenaTruth60320=normalizePromotionArenaTruth60320;globalThis.mountPromotionArenaUI60320=mountPromotionArenaUI60320;globalThis.refreshPromotionArenaUI60320=refreshPromotionArenaUI60320;globalThis.unmountPromotionArenaUI60320=unmountPromotionArenaUI60320;globalThis.SC_PROMOTION_ARENA_UI_60320=api;
})();
