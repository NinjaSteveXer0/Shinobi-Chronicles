// ============================================================================
// ISSUE #603 / #608 — PROMOTION ARENA UI / LIVE-TRUTH-SLOT PROJECTION — 60320
//
// Presentation-only adapter for the Field Readiness Assessment. The module
// consumes already-authorised public truth and delegates deliberate actions to
// injected Core callbacks. It never derives Promotion truth, mutates topology,
// awards rewards, persists state, or inspects hidden evidence.
// ============================================================================
(function installPromotionArenaUI60320(){
"use strict";
if(globalThis.SC_PROMOTION_ARENA_UI_60320)return;

const PATCH_ID="promotion_arena_ui_60320_2026_10_07";
const STYLE_ID="sc-promotion-arena-ui-60320-style";
const ARENA_ASSET="UI/arena_promotion.png";
const COMPONENT_ASSET="UI/ui_components.png";
const SLOT_COUNT=4;
const OUTCOMES=Object.freeze(["PASS","FAIL","ABORTED","WITHDRAWN"]);
const PHASES=Object.freeze(["IDLE","INSPECTION","COMMITTED","RESOLVED"]);
const controllers=new WeakMap();

function safeText(value,maxLength=180){
  if(typeof value!=="string"&&typeof value!=="number")return"";
  const text=String(value).replace(/[\u0000-\u001F\u007F]/g," ").replace(/\s+/g," ").trim();
  return text.slice(0,Math.max(0,maxLength));
}
function safeBoolean(value){return value===true;}
function normalizeOutcome(value){
  const exact=safeText(value,32).toUpperCase();
  return OUTCOMES.includes(exact)?exact:null;
}
function normalizePhase(value){
  const exact=safeText(value,32).toUpperCase();
  return PHASES.includes(exact)?exact:"IDLE";
}
function publicSlotLabel60320(raw,index,revealed){
  if(!revealed)return`Readiness Slot ${index+1}`;
  const label=safeText(raw&&raw.publicLabel,80)||safeText(raw&&raw.label,80);
  return label||`Readiness Slot ${index+1}`;
}
function normalizeReadinessSlot60320(raw,index){
  const source=raw&&typeof raw==="object"?raw:{};
  const revealed=source.revealed===true;
  // Critical non-leak rule: when hidden, satisfaction/domain/evidence are never
  // copied into the projection. Hidden+satisfied and hidden+unsatisfied therefore
  // have exactly the same public object, DOM text, attributes, and ARIA text.
  if(!revealed){
    return Object.freeze({
      index,
      revealed:false,
      publicLabel:`Readiness Slot ${index+1}`,
      state:"HIDDEN",
      stateLabel:"Hidden"
    });
  }
  const satisfied=source.satisfied===true;
  return Object.freeze({
    index,
    revealed:true,
    publicLabel:publicSlotLabel60320(source,index,true),
    state:satisfied?"CLEAR":"NOT_CLEAR",
    stateLabel:satisfied?"Clear":"Not clear"
  });
}
function normalizeRewardLines60320(value){
  if(!Array.isArray(value))return[];
  return value.slice(0,12).map(row=>{
    if(typeof row==="string"||typeof row==="number"){
      const label=safeText(row,140);
      return label?Object.freeze({label,value:""}):null;
    }
    if(!row||typeof row!=="object")return null;
    const label=safeText(row.publicLabel,100)||safeText(row.label,100)||safeText(row.name,100);
    const displayValue=safeText(row.publicValue,80)||safeText(row.value,80);
    return label?Object.freeze({label,value:displayValue}):null;
  }).filter(Boolean);
}
function normalizePublicLines60320(value,max=8){
  if(!Array.isArray(value))return[];
  return value.slice(0,max).map(row=>safeText(row,180)).filter(Boolean);
}
function normalizeAssessmentRecord60320(raw){
  if(!raw||typeof raw!=="object")return null;
  const outcome=normalizeOutcome(raw.outcome);
  const attemptNumber=Number.isInteger(raw.attemptNumber)&&raw.attemptNumber>0?raw.attemptNumber:null;
  const startedLabel=safeText(raw.startedLabel,80);
  const resolvedLabel=safeText(raw.resolvedLabel,80);
  const publicSummary=safeText(raw.publicSummary,220);
  const statusLabel=safeText(raw.statusLabel,80);
  if(!outcome&&!attemptNumber&&!startedLabel&&!resolvedLabel&&!publicSummary&&!statusLabel)return null;
  return Object.freeze({outcome,attemptNumber,startedLabel,resolvedLabel,publicSummary,statusLabel});
}
function normalizeReceipt60320(raw){
  if(!raw||typeof raw!=="object")return null;
  const causeLabel=safeText(raw.causeLabel,160);
  const provenanceLabel=safeText(raw.provenanceLabel,160);
  const title=safeText(raw.title,100)||"Chronicle Receipt";
  const rewardLines=normalizeRewardLines60320(raw.rewardLines||raw.rewards);
  const consequenceLines=normalizePublicLines60320(raw.consequenceLines||raw.consequences,8);
  if(!causeLabel&&!provenanceLabel&&!rewardLines.length&&!consequenceLines.length)return null;
  return Object.freeze({title,causeLabel,provenanceLabel,rewardLines,consequenceLines});
}
function normalizePromotionArenaTruth60320(raw){
  const source=raw&&typeof raw==="object"?raw:{};
  const inputSlots=Array.isArray(source.readinessSlots)?source.readinessSlots:[];
  const readinessSlots=[];
  for(let index=0;index<SLOT_COUNT;index+=1)readinessSlots.push(normalizeReadinessSlot60320(inputSlots[index],index));
  const record=normalizeAssessmentRecord60320(source.assessmentRecord);
  const explicitOutcome=normalizeOutcome(source.outcome);
  const outcome=explicitOutcome||(record&&record.outcome)||null;
  const phase=normalizePhase(source.phase);
  const currentRankLabel=safeText(source.currentRankLabel,80)||"Current Rank";
  const targetRankLabel=safeText(source.targetRankLabel,80)||"Promotion Target";
  const publicInstruction=safeText(source.publicInstruction,220);
  const attemptUnavailableReason=safeText(source.attemptUnavailableReason,180);
  const outcomeSummary=safeText(source.outcomeSummary,220);
  const revealedCount=readinessSlots.filter(slot=>slot.revealed).length;
  const clearRevealedCount=readinessSlots.filter(slot=>slot.revealed&&slot.state==="CLEAR").length;
  return Object.freeze({
    phase,
    currentRankLabel,
    targetRankLabel,
    publicInstruction,
    canInspect:source.canInspect!==false,
    canEnterAssessment:safeBoolean(source.canEnterAssessment),
    canWithdraw:safeBoolean(source.canWithdraw),
    canAbort:safeBoolean(source.canAbort),
    attemptUnavailableReason,
    readinessSlots:Object.freeze(readinessSlots),
    revealedCount,
    clearRevealedCount,
    assessmentRecord:record,
    outcome,
    outcomeSummary,
    receipt:normalizeReceipt60320(source.receipt)
  });
}

function ensureStyles60320(doc){
  if(!doc||!doc.head||doc.getElementById(STYLE_ID))return;
  const style=doc.createElement("style");
  style.id=STYLE_ID;
  style.textContent=`
.sc60320-stage{position:relative;isolation:isolate;width:100%;min-height:min(78vh,820px);box-sizing:border-box;overflow:auto;border-radius:18px;background-image:linear-gradient(180deg,rgba(5,8,12,.18),rgba(5,8,12,.82)),url("${ARENA_ASSET}");background-size:cover;background-position:center;box-shadow:0 20px 52px rgba(0,0,0,.36);color:#f7f4ec;font-family:inherit}
.sc60320-stage *{box-sizing:border-box}
.sc60320-stage__veil{position:relative;z-index:1;min-height:inherit;padding:clamp(18px,3vw,42px);display:grid;grid-template-columns:minmax(0,1.15fr) minmax(290px,.85fr);grid-template-areas:"header header" "readiness record" "actions outcome";gap:clamp(14px,2vw,24px);align-content:start}
.sc60320-header{grid-area:header;display:flex;align-items:flex-end;justify-content:space-between;gap:18px;padding:4px 4px 10px}
.sc60320-kicker{margin:0 0 5px;font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;font-weight:800;opacity:.82}
.sc60320-title{margin:0;font-size:clamp(1.55rem,3vw,2.7rem);line-height:1.05;text-shadow:0 2px 14px rgba(0,0,0,.7)}
.sc60320-rank{max-width:430px;text-align:right;font-weight:750;font-size:clamp(.9rem,1.6vw,1.05rem);line-height:1.35}
.sc60320-rank__arrow{padding:0 .45em;opacity:.7}
.sc60320-panel{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.18);border-radius:16px;background:rgba(8,12,18,.82);box-shadow:0 12px 30px rgba(0,0,0,.28);backdrop-filter:blur(8px)}
.sc60320-panel::before{content:"";position:absolute;inset:0;z-index:-1;background-image:url("${COMPONENT_ASSET}");background-size:cover;background-position:center;opacity:.08;filter:saturate(.65) contrast(1.08);pointer-events:none}
.sc60320-panel__body{padding:clamp(16px,2vw,24px)}
.sc60320-panel h3{margin:0 0 12px;font-size:1rem;letter-spacing:.08em;text-transform:uppercase}
.sc60320-readiness{grid-area:readiness}
.sc60320-record{grid-area:record}
.sc60320-actions{grid-area:actions}
.sc60320-outcome{grid-area:outcome}
.sc60320-summary{margin:0 0 14px;font-size:.92rem;opacity:.86}
.sc60320-slots{display:grid;gap:10px;list-style:none;margin:0;padding:0}
.sc60320-slot{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;min-height:58px;padding:12px 14px;border:1px solid rgba(255,255,255,.15);border-radius:12px;background-image:linear-gradient(90deg,rgba(5,8,12,.72),rgba(16,23,32,.58)),url("${COMPONENT_ASSET}");background-size:auto,640px auto;background-position:center,center}
.sc60320-slot__name{font-weight:750;line-height:1.25}
.sc60320-slot__state{display:inline-flex;align-items:center;justify-content:center;min-width:84px;padding:6px 9px;border:1px solid currentColor;border-radius:999px;font-size:.76rem;font-weight:850;letter-spacing:.06em;text-transform:uppercase}
.sc60320-slot[data-state="HIDDEN"] .sc60320-slot__state{opacity:.76}
.sc60320-slot[data-state="CLEAR"] .sc60320-slot__state{background:rgba(40,120,76,.28)}
.sc60320-slot[data-state="NOT_CLEAR"] .sc60320-slot__state{background:rgba(142,74,45,.26)}
.sc60320-record__grid{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px 12px;margin:0}
.sc60320-record__grid dt{font-weight:800;opacity:.72}
.sc60320-record__grid dd{margin:0;min-width:0;overflow-wrap:anywhere}
.sc60320-record__empty{margin:0;opacity:.75}
.sc60320-actions__copy{margin:0 0 14px;line-height:1.5}
.sc60320-action-row{display:flex;flex-wrap:wrap;gap:10px}
.sc60320-button{appearance:none;min-height:44px;padding:10px 16px;border:1px solid rgba(255,255,255,.32);border-radius:10px;background-image:linear-gradient(rgba(19,25,34,.78),rgba(7,10,15,.9)),url("${COMPONENT_ASSET}");background-size:auto,520px auto;background-position:center,center;color:inherit;font:inherit;font-weight:800;cursor:pointer;box-shadow:0 7px 18px rgba(0,0,0,.22)}
.sc60320-button:hover:not(:disabled),.sc60320-button:focus-visible:not(:disabled){border-color:rgba(255,255,255,.72);transform:translateY(-1px)}
.sc60320-button:focus-visible{outline:3px solid currentColor;outline-offset:3px}
.sc60320-button:disabled{cursor:not-allowed;opacity:.46}
.sc60320-button--primary{font-size:1.02rem;padding-inline:20px}
.sc60320-button--danger{border-style:dashed}
.sc60320-unavailable{margin:11px 0 0;font-size:.86rem;opacity:.78}
.sc60320-outcome-badge{display:inline-flex;align-items:center;min-height:38px;padding:7px 12px;border:1px solid currentColor;border-radius:999px;font-size:.88rem;font-weight:900;letter-spacing:.1em}
.sc60320-outcome-copy{margin:12px 0 0;line-height:1.5}
.sc60320-receipt{margin-top:18px;padding-top:16px;border-top:1px solid rgba(255,255,255,.16)}
.sc60320-receipt h4{margin:0 0 10px;font-size:.95rem;letter-spacing:.08em;text-transform:uppercase}
.sc60320-receipt__meta{display:grid;gap:7px;margin-bottom:11px;font-size:.88rem}
.sc60320-receipt__meta strong{display:inline-block;min-width:86px}
.sc60320-receipt__list{margin:8px 0 0;padding-left:20px}
.sc60320-receipt__list li{margin:4px 0}
.sc60320-live{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
@media (max-width:900px){.sc60320-stage__veil{grid-template-columns:1fr;grid-template-areas:"header" "readiness" "actions" "record" "outcome"}.sc60320-header{align-items:flex-start;flex-direction:column}.sc60320-rank{text-align:left}.sc60320-outcome{min-height:0}}
@media (max-width:560px){.sc60320-stage{border-radius:0;min-height:100%}.sc60320-stage__veil{padding:14px;gap:12px}.sc60320-slot{grid-template-columns:1fr;gap:8px}.sc60320-slot__state{justify-self:start}.sc60320-action-row{display:grid;grid-template-columns:1fr}.sc60320-button{width:100%}.sc60320-record__grid{grid-template-columns:1fr;gap:3px}.sc60320-record__grid dd{margin-bottom:7px}}
@media (prefers-reduced-motion:reduce){.sc60320-stage *{scroll-behavior:auto!important;transition:none!important;animation:none!important}.sc60320-button:hover:not(:disabled),.sc60320-button:focus-visible:not(:disabled){transform:none}}
`;
  doc.head.appendChild(style);
}

function element60320(doc,tag,className,text){
  const node=doc.createElement(tag);
  if(className)node.className=className;
  if(text!==undefined&&text!==null)node.textContent=String(text);
  return node;
}
function appendDefinition60320(doc,dl,label,value){
  const safe=safeText(value,220);
  if(!safe)return;
  dl.appendChild(element60320(doc,"dt",null,label));
  dl.appendChild(element60320(doc,"dd",null,safe));
}
function button60320(doc,label,action,className=""){
  const node=element60320(doc,"button",`sc60320-button ${className}`.trim(),label);
  node.type="button";
  node.dataset.action60320=action;
  return node;
}

function buildShell60320(doc){
  const root=element60320(doc,"section","sc60320-stage");
  root.dataset.scPromotionArenaUi="60320";
  root.setAttribute("aria-labelledby","sc60320-title");

  const veil=element60320(doc,"div","sc60320-stage__veil");
  const header=element60320(doc,"header","sc60320-header");
  const headingWrap=element60320(doc,"div");
  headingWrap.appendChild(element60320(doc,"p","sc60320-kicker","Official Promotion Assessment"));
  const title=element60320(doc,"h2","sc60320-title","Field Readiness Assessment");
  title.id="sc60320-title";
  headingWrap.appendChild(title);
  const rank=element60320(doc,"div","sc60320-rank");
  rank.setAttribute("aria-label","Current and target rank");
  header.append(headingWrap,rank);

  const readiness=element60320(doc,"section","sc60320-panel sc60320-readiness");
  readiness.setAttribute("aria-labelledby","sc60320-readiness-heading");
  const readinessBody=element60320(doc,"div","sc60320-panel__body");
  const readinessHeading=element60320(doc,"h3",null,"Readiness");
  readinessHeading.id="sc60320-readiness-heading";
  const summary=element60320(doc,"p","sc60320-summary");
  const slots=element60320(doc,"ol","sc60320-slots");
  readinessBody.append(readinessHeading,summary,slots);
  readiness.appendChild(readinessBody);

  const record=element60320(doc,"section","sc60320-panel sc60320-record");
  record.setAttribute("aria-labelledby","sc60320-record-heading");
  const recordBody=element60320(doc,"div","sc60320-panel__body");
  const recordHeading=element60320(doc,"h3",null,"Assessment Record");
  recordHeading.id="sc60320-record-heading";
  const recordContent=element60320(doc,"div","sc60320-record__content");
  recordBody.append(recordHeading,recordContent);
  record.appendChild(recordBody);

  const actions=element60320(doc,"section","sc60320-panel sc60320-actions");
  actions.setAttribute("aria-labelledby","sc60320-actions-heading");
  const actionsBody=element60320(doc,"div","sc60320-panel__body");
  const actionsHeading=element60320(doc,"h3",null,"Assessment Control");
  actionsHeading.id="sc60320-actions-heading";
  const actionsCopy=element60320(doc,"p","sc60320-actions__copy");
  const actionRow=element60320(doc,"div","sc60320-action-row");
  const inspect=button60320(doc,"Inspect Readiness","beginInspection");
  const enter=button60320(doc,"Enter Assessment","beginAssessment","sc60320-button--primary");
  const withdraw=button60320(doc,"Withdraw","withdrawAssessment");
  const abort=button60320(doc,"Abort Assessment","abortAssessment","sc60320-button--danger");
  actionRow.append(inspect,enter,withdraw,abort);
  const unavailable=element60320(doc,"p","sc60320-unavailable");
  actionsBody.append(actionsHeading,actionsCopy,actionRow,unavailable);
  actions.appendChild(actionsBody);

  const outcome=element60320(doc,"section","sc60320-panel sc60320-outcome");
  outcome.setAttribute("aria-labelledby","sc60320-outcome-heading");
  const outcomeBody=element60320(doc,"div","sc60320-panel__body");
  const outcomeHeading=element60320(doc,"h3",null,"Assessment Outcome");
  outcomeHeading.id="sc60320-outcome-heading";
  const outcomeContent=element60320(doc,"div","sc60320-outcome__content");
  const receipt=element60320(doc,"div","sc60320-receipt");
  outcomeBody.append(outcomeHeading,outcomeContent,receipt);
  outcome.appendChild(outcomeBody);

  const live=element60320(doc,"div","sc60320-live");
  live.setAttribute("role","status");
  live.setAttribute("aria-live","polite");
  live.setAttribute("aria-atomic","true");

  veil.append(header,readiness,record,actions,outcome,live);
  root.appendChild(veil);
  return{root,rank,summary,slots,recordContent,actionsCopy,inspect,enter,withdraw,abort,unavailable,outcome,outcomeContent,receipt,live};
}

function renderRank60320(nodes,truth){
  nodes.rank.replaceChildren();
  const doc=nodes.rank.ownerDocument;
  nodes.rank.append(
    element60320(doc,"span","sc60320-rank__current",truth.currentRankLabel),
    element60320(doc,"span","sc60320-rank__arrow","→"),
    element60320(doc,"span","sc60320-rank__target",truth.targetRankLabel)
  );
}
function renderSlots60320(nodes,truth){
  const doc=nodes.slots.ownerDocument;
  nodes.slots.replaceChildren();
  for(const slot of truth.readinessSlots){
    const li=element60320(doc,"li","sc60320-slot");
    li.dataset.state=slot.state;
    li.dataset.slotIndex=String(slot.index+1);
    li.setAttribute("aria-label",`${slot.publicLabel}: ${slot.stateLabel}`);
    li.append(
      element60320(doc,"span","sc60320-slot__name",slot.publicLabel),
      element60320(doc,"span","sc60320-slot__state",slot.stateLabel)
    );
    nodes.slots.appendChild(li);
  }
  nodes.summary.textContent=`Visible readiness: ${truth.revealedCount} of ${SLOT_COUNT} slots revealed; ${truth.clearRevealedCount} revealed slot${truth.clearRevealedCount===1?"":"s"} clear.`;
}
function renderRecord60320(nodes,truth){
  const doc=nodes.recordContent.ownerDocument;
  nodes.recordContent.replaceChildren();
  const record=truth.assessmentRecord;
  if(!record){
    nodes.recordContent.appendChild(element60320(doc,"p","sc60320-record__empty","No committed assessment is recorded in this view."));
    return;
  }
  const dl=element60320(doc,"dl","sc60320-record__grid");
  if(record.attemptNumber)appendDefinition60320(doc,dl,"Attempt",`#${record.attemptNumber}`);
  appendDefinition60320(doc,dl,"Status",record.statusLabel);
  appendDefinition60320(doc,dl,"Started",record.startedLabel);
  appendDefinition60320(doc,dl,"Resolved",record.resolvedLabel);
  appendDefinition60320(doc,dl,"Outcome",record.outcome);
  appendDefinition60320(doc,dl,"Record",record.publicSummary);
  nodes.recordContent.appendChild(dl);
}
function renderReceipt60320(nodes,truth){
  const doc=nodes.receipt.ownerDocument;
  nodes.receipt.replaceChildren();
  const receipt=truth.receipt;
  if(!receipt){nodes.receipt.hidden=true;return;}
  nodes.receipt.hidden=false;
  nodes.receipt.appendChild(element60320(doc,"h4",null,receipt.title));
  const meta=element60320(doc,"div","sc60320-receipt__meta");
  if(receipt.causeLabel){
    const row=element60320(doc,"div");
    row.append(element60320(doc,"strong",null,"Cause"),doc.createTextNode(` ${receipt.causeLabel}`));
    meta.appendChild(row);
  }
  if(receipt.provenanceLabel){
    const row=element60320(doc,"div");
    row.append(element60320(doc,"strong",null,"Provenance"),doc.createTextNode(` ${receipt.provenanceLabel}`));
    meta.appendChild(row);
  }
  if(meta.childNodes.length)nodes.receipt.appendChild(meta);
  if(receipt.rewardLines.length){
    nodes.receipt.appendChild(element60320(doc,"strong",null,"Rewards"));
    const list=element60320(doc,"ul","sc60320-receipt__list");
    for(const reward of receipt.rewardLines){
      list.appendChild(element60320(doc,"li",null,reward.value?`${reward.label}: ${reward.value}`:reward.label));
    }
    nodes.receipt.appendChild(list);
  }
  if(receipt.consequenceLines.length){
    nodes.receipt.appendChild(element60320(doc,"strong",null,"Recorded consequences"));
    const list=element60320(doc,"ul","sc60320-receipt__list");
    for(const line of receipt.consequenceLines)list.appendChild(element60320(doc,"li",null,line));
    nodes.receipt.appendChild(list);
  }
}
function renderOutcome60320(nodes,truth){
  const doc=nodes.outcomeContent.ownerDocument;
  nodes.outcomeContent.replaceChildren();
  if(!truth.outcome){
    nodes.outcomeContent.appendChild(element60320(doc,"p","sc60320-record__empty",truth.phase==="COMMITTED"?"Assessment in progress.":"No assessment outcome is recorded in this view."));
  }else{
    const badge=element60320(doc,"span","sc60320-outcome-badge",truth.outcome);
    badge.dataset.outcome=truth.outcome;
    nodes.outcomeContent.appendChild(badge);
    if(truth.outcomeSummary)nodes.outcomeContent.appendChild(element60320(doc,"p","sc60320-outcome-copy",truth.outcomeSummary));
  }
  renderReceipt60320(nodes,truth);
}
function renderActions60320(controller,truth){
  const {nodes,options}=controller;
  const actions=options.actions&&typeof options.actions==="object"?options.actions:{};
  const busy=controller.busy===true;
  nodes.inspect.disabled=busy||!truth.canInspect||typeof actions.beginInspection!=="function";
  nodes.enter.disabled=busy||!truth.canEnterAssessment||typeof actions.beginAssessment!=="function";
  nodes.withdraw.disabled=busy||!truth.canWithdraw||typeof actions.withdrawAssessment!=="function";
  nodes.abort.disabled=busy||!truth.canAbort||typeof actions.abortAssessment!=="function";
  nodes.withdraw.hidden=!truth.canWithdraw;
  nodes.abort.hidden=!truth.canAbort;
  nodes.actionsCopy.textContent=truth.publicInstruction||"Inspecting readiness is read-only. Enter Assessment is a deliberate attempt commit.";
  nodes.unavailable.textContent=!truth.canEnterAssessment&&truth.attemptUnavailableReason?truth.attemptUnavailableReason:"";
  nodes.unavailable.hidden=!nodes.unavailable.textContent;
  nodes.root.setAttribute("aria-busy",busy?"true":"false");
}
function render60320(controller,rawTruth,{announce=true}={}){
  const truth=normalizePromotionArenaTruth60320(rawTruth);
  controller.truth=truth;
  renderRank60320(controller.nodes,truth);
  renderSlots60320(controller.nodes,truth);
  renderRecord60320(controller.nodes,truth);
  renderActions60320(controller,truth);
  renderOutcome60320(controller.nodes,truth);
  if(announce){
    const outcomeText=truth.outcome?` Outcome ${truth.outcome}.`:"";
    controller.nodes.live.textContent=`Promotion assessment view updated. ${truth.revealedCount} of ${SLOT_COUNT} readiness slots revealed.${outcomeText}`;
  }
  return truth;
}

async function resolveTruth60320(controller){
  const getter=controller.options.getTruth;
  if(typeof getter!=="function")return controller.options.truth||{};
  try{
    const value=getter();
    return value&&typeof value.then==="function"?await value:value;
  }catch(_error){
    return{};
  }
}
async function refreshPromotionArenaUI60320(target,{announce=true}={}){
  const controller=target&&target.__sc60320Controller?target.__sc60320Controller:controllers.get(target)||target;
  if(!controller||!controller.nodes||!controller.nodes.root)return null;
  const raw=await resolveTruth60320(controller);
  return render60320(controller,raw,{announce});
}
async function invokeAction60320(controller,actionName){
  if(controller.busy)return;
  const actions=controller.options.actions&&typeof controller.options.actions==="object"?controller.options.actions:{};
  const action=actions[actionName];
  if(typeof action!=="function")return;
  controller.busy=true;
  renderActions60320(controller,controller.truth||normalizePromotionArenaTruth60320({}));
  controller.nodes.live.textContent=actionName==="beginAssessment"?"Committing assessment attempt.":"Updating assessment view.";
  try{
    const result=action();
    if(result&&typeof result.then==="function")await result;
  }catch(error){
    // Never expose thrown payloads: Core errors can carry hidden evaluation detail.
    if(typeof controller.options.onActionError==="function"){
      try{controller.options.onActionError({action:actionName,error});}catch(_callbackError){}
    }
    controller.nodes.live.textContent="The requested assessment action could not be completed.";
  }finally{
    controller.busy=false;
    await refreshPromotionArenaUI60320(controller,{announce:true});
  }
}
function wireActions60320(controller){
  const mapping=[
    [controller.nodes.inspect,"beginInspection"],
    [controller.nodes.enter,"beginAssessment"],
    [controller.nodes.withdraw,"withdrawAssessment"],
    [controller.nodes.abort,"abortAssessment"]
  ];
  for(const [node,action] of mapping){
    node.addEventListener("click",()=>{void invokeAction60320(controller,action);});
  }
}
function mountPromotionArenaUI60320(host,options={}){
  if(!host||typeof host.appendChild!=="function")throw new TypeError("Promotion UI host element is required");
  const doc=host.ownerDocument||globalThis.document;
  if(!doc||typeof doc.createElement!=="function")throw new Error("Promotion UI requires a DOM document");
  ensureStyles60320(doc);
  const previous=controllers.get(host);
  if(previous)unmountPromotionArenaUI60320(previous);
  const nodes=buildShell60320(doc);
  host.replaceChildren(nodes.root);
  const controller={host,nodes,options:options&&typeof options==="object"?options:{},truth:null,busy:false,destroyed:false};
  Object.defineProperty(controller,"__sc60320Controller",{value:controller,enumerable:false});
  controllers.set(host,controller);
  wireActions60320(controller);
  void refreshPromotionArenaUI60320(controller,{announce:false});
  return controller;
}
function unmountPromotionArenaUI60320(target){
  const controller=target&&target.__sc60320Controller?target.__sc60320Controller:controllers.get(target)||target;
  if(!controller||controller.destroyed)return false;
  controller.destroyed=true;
  if(controller.host&&controllers.get(controller.host)===controller)controllers.delete(controller.host);
  if(controller.nodes&&controller.nodes.root&&controller.nodes.root.parentNode)controller.nodes.root.parentNode.removeChild(controller.nodes.root);
  return true;
}

const api=Object.freeze({
  patchId:PATCH_ID,
  arenaAsset:ARENA_ASSET,
  componentAsset:COMPONENT_ASSET,
  readinessSlotCount:SLOT_COUNT,
  outcomes:OUTCOMES,
  normalizeTruth:normalizePromotionArenaTruth60320,
  mount:mountPromotionArenaUI60320,
  refresh:refreshPromotionArenaUI60320,
  unmount:unmountPromotionArenaUI60320,
  browserGoldenClaimed:false
});

globalThis.normalizePromotionArenaTruth60320=normalizePromotionArenaTruth60320;
globalThis.mountPromotionArenaUI60320=mountPromotionArenaUI60320;
globalThis.refreshPromotionArenaUI60320=refreshPromotionArenaUI60320;
globalThis.unmountPromotionArenaUI60320=unmountPromotionArenaUI60320;
globalThis.SC_PROMOTION_ARENA_UI_60320=api;
})();
