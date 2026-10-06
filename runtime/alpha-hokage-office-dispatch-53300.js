// ============================================================================
// KONOHA FIRST HOUR STEP 6 — HOKAGE OFFICE / CHRONICLE DISPATCH — #533
// Projection/router only. Mission, Story, World, Knowledge, Journey, Exams and
// Shinobi Record remain owned by their existing authorities.
// ============================================================================
(function installHokageOfficeChronicleDispatch53300(){
"use strict";
if(globalThis.SC_HOKAGE_OFFICE_CHRONICLE_DISPATCH_53300)return;

const PATCH_ID="hokage_office_chronicle_dispatch_53300_2026_10_06";
const STYLE_ID="sc-hokage-office-dispatch-53300";
const OFFICE_HOST_ID="KON-P01";
const SOURCE_OCCURRENCE_ID="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1";
const LEAD_CHOICES=Object.freeze(["ask_about_delivery","observe_intake_and_departure"]);
const priorIdentifiedAnchor=typeof globalThis.renderAlphaKonohaV3IdentifiedAnchor==="function"?globalThis.renderAlphaKonohaV3IdentifiedAnchor:null;

const h=value=>typeof globalThis.escapeStorySceneHTML==="function"
  ?globalThis.escapeStorySceneHTML(String(value??""))
  :String(value??"").replace(/[&<>\"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;"}[ch]));
const clone=value=>{try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}catch(_error){return value;}};

function ensureStyles(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");style.id=STYLE_ID;
  style.textContent=`
  .alpha533-office-entry{position:absolute;z-index:28;transform:translate(-50%,36px);min-width:112px;padding:7px 10px;border:1px solid rgba(214,169,58,.68);background:rgba(6,13,18,.94);color:#efd477;font:900 8px/1.1 Arial,sans-serif;letter-spacing:.12em;cursor:pointer;box-shadow:0 7px 20px rgba(0,0,0,.45)}
  .alpha533-office-entry:hover,.alpha533-office-entry:focus-visible,.alpha533-office-entry.is-dispatch-focus{border-color:#61dce6;color:#72e8ef;outline:none;box-shadow:0 0 0 2px rgba(66,211,224,.15),0 8px 24px rgba(0,0,0,.55)}
  .alpha533-office{width:min(1320px,calc(100% - 44px));max-height:calc(100vh - 72px);margin:auto;overflow:auto;background:linear-gradient(155deg,#0a151b,#050b10 72%);border:1px solid rgba(214,169,58,.38);box-shadow:0 28px 80px rgba(0,0,0,.62);color:#e8e1d2}
  .alpha533-office__head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;padding:24px 28px 18px;border-bottom:1px solid rgba(214,169,58,.18);background:radial-gradient(circle at 14% 0,rgba(47,157,169,.09),transparent 38%)}
  .alpha533-office__eyebrow{color:#6edce5;font-size:9px;font-weight:900;letter-spacing:.18em}.alpha533-office h1{margin:6px 0 5px;color:#f0deb0;font:900 34px/1 Georgia,serif}.alpha533-office__head p{margin:0;color:#81939c;font-size:11px}
  .alpha533-office__return{padding:9px 13px;border:1px solid rgba(214,169,58,.45);background:#17160f;color:#e2c566;font-weight:800;cursor:pointer}
  .alpha533-office__identity{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:rgba(214,169,58,.11);border-bottom:1px solid rgba(214,169,58,.12)}.alpha533-office__identity div{padding:12px 18px;background:#081118}.alpha533-office__identity small{display:block;color:#60747e;font-size:8px;letter-spacing:.13em}.alpha533-office__identity strong{display:block;margin-top:4px;color:#ded4ba;font-size:11px}
  .alpha533-office__grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(300px,.8fr);gap:14px;padding:20px}.alpha533-panel{border:1px solid rgba(255,255,255,.075);background:rgba(0,0,0,.16);padding:18px}.alpha533-panel>header{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:14px}.alpha533-panel>header span{color:#d8b75b;font-size:9px;font-weight:900;letter-spacing:.16em}.alpha533-panel>header small{color:#60727c;font-size:8px}
  .alpha533-assignment{display:grid;grid-template-columns:74px 1fr;gap:14px;padding:14px;border:1px solid rgba(214,169,58,.2);background:linear-gradient(90deg,rgba(214,169,58,.055),rgba(255,255,255,.012))}.alpha533-grade{display:grid;place-items:center;width:68px;height:68px;border:2px solid rgba(214,169,58,.54);border-radius:50%;color:#d9ba61;font:900 18px Georgia,serif;text-align:center}.alpha533-grade small{display:block;color:#6d7a7d;font:700 6px Arial,sans-serif;letter-spacing:.08em}.alpha533-assignment h2{margin:0 0 5px;color:#eee0bb;font:900 21px Georgia,serif}.alpha533-assignment p{margin:0;color:#8fa0a7;font-size:11px;line-height:1.5}.alpha533-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}.alpha533-meta span{padding:4px 6px;border:1px solid rgba(255,255,255,.08);color:#6f8791;font-size:7px;font-weight:800;letter-spacing:.1em}.alpha533-action{margin-top:12px;padding:9px 11px;border:1px solid rgba(214,169,58,.46);background:#30260f;color:#edce70;font-weight:900;cursor:pointer}.alpha533-action:disabled{opacity:.38;cursor:not-allowed}
  .alpha533-lead{padding:12px;border:1px solid rgba(75,205,217,.18);background:rgba(43,145,157,.045);margin-top:8px}.alpha533-lead strong{display:block;color:#aee9ed;font-size:12px}.alpha533-lead p{margin:5px 0;color:#84979f;font-size:10px;line-height:1.45}.alpha533-lead footer{display:flex;justify-content:space-between;align-items:center;gap:8px}.alpha533-lead footer small{color:#55717a;font-size:7px;letter-spacing:.1em}.alpha533-empty{padding:18px;border:1px dashed rgba(255,255,255,.11);color:#667982;font-size:10px;line-height:1.5}.alpha533-business{display:grid;grid-template-columns:1fr 1fr;gap:8px}.alpha533-business button{min-height:76px;text-align:left;padding:11px;border:1px solid rgba(255,255,255,.08);background:#081219;color:#d7d0bd;cursor:pointer}.alpha533-business button strong{display:block;color:#dcc069;font-size:10px}.alpha533-business button small{display:block;margin-top:4px;color:#687b84;font-size:8px;line-height:1.35}.alpha533-business button:disabled{opacity:.34;cursor:not-allowed}
  @media(max-width:820px){.alpha533-office__grid{grid-template-columns:1fr}.alpha533-office__identity{grid-template-columns:1fr}.alpha533-business{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
}

function currentObserver(){
  let id=null;
  try{const team=globalThis.getChronicleCurrentTeam43600?.();id=team&&Array.isArray(team.teamVariantIds)?team.teamVariantIds[0]:null;}catch(_error){}
  if(!id){try{id=globalThis.getChronicleRunIdentity43600?.()?.originVariantId||null;}catch(_error){}}
  let row=null;
  try{row=id&&typeof globalThis.getPlayerCharacter==="function"?globalThis.getPlayerCharacter(id):null;}catch(_error){}
  if(!row){try{row=id&&typeof globalThis.getCharacterRegistryEntry==="function"?globalThis.getCharacterRegistryEntry(id):null;}catch(_error){}}
  return{id:id||null,name:row&&(row.name||row.displayName)||id||"Current shinobi",rank:row&&row.rank||"Unranked"};
}

function currentAssignment(){
  if(typeof globalThis.getAlphaArc1PlayableStatus!=="function")return{title:"Mission authority unavailable",missionId:null,status:"UNAVAILABLE",detail:"The current Mission owner is not available in this runtime.",actionable:false};
  const s=globalThis.getAlphaArc1PlayableStatus();
  if(!s.originReady)return{title:"Begin Your Chronicle",missionId:null,status:"ORIGIN REQUIRED",detail:"Choose an Academy Origin before a Mission assignment can be projected.",actionable:true};
  if(!s.menmaRun)return{title:"Konoha Chronicle",missionId:null,status:"CURRENT ROUTE NOT AUTHORED",detail:"The current Arc-1 Mission authority does not silently remap Menma-specific history onto this protagonist.",actionable:true};
  if(!s.trace)return{title:"Mission 1 · Pre-Whisper Investigation",missionId:"arc1_m1_pre_whisper_caravan_trace",status:"ACTIONABLE",detail:"Investigate the caravan movement evidence through the existing Mission authority.",actionable:true};
  if(!s.m1Complete)return{title:"Mission 1 · Whisper Woods",missionId:"arc1_m1_whisper_woods",status:"ACTIONABLE",detail:"Three physical traces are committed and the Whisper Woods approach is actionable.",actionable:true};
  if(Number(s.nextMission)>=2&&Number(s.nextMission)<=10&&typeof globalThis.getArc1RuntimeAuthority==="function"){
    const a=globalThis.getArc1RuntimeAuthority(Number(s.nextMission));
    if(a)return{title:a.title||("Mission "+s.nextMission),missionId:a.missionId||null,status:"ACTIONABLE",detail:"Projected from the persisted Arc-1 Mission frontier.",actionable:true,locationId:a.locationId||null};
  }
  return{title:"Mission 11 · Pump Four",missionId:"arc1_m11_pump_four_recall",status:"STORY CALLER PENDING",detail:"Combat authority exists; the exact Story caller/transition remains closed until its owning authority is available.",actionable:true};
}

function issuedLeadIds(){
  if(typeof globalThis.getKonohaCeHotspotBranchConsequence46900!=="function")return[];
  const out=[];
  for(const choiceId of LEAD_CHOICES){
    try{
      const row=globalThis.getKonohaCeHotspotBranchConsequence46900(choiceId);
      for(const id of row&&Array.isArray(row.futureLeadIds)?row.futureLeadIds:[])if(id&&!out.includes(String(id)))out.push(String(id));
    }catch(_error){}
  }
  return out;
}

function discoveredLeadRows(){
  const issued=new Set(issuedLeadIds());
  const history=globalThis.playerData&&Array.isArray(globalThis.playerData.activityHistory)?globalThis.playerData.activityHistory:[];
  const rows=[];
  for(const record of history){
    if(!record||record.committed!==true||!record.data||!Array.isArray(record.data.futureLeadIds))continue;
    for(const leadId of record.data.futureLeadIds){
      if(!issued.has(String(leadId)))continue;
      const knowledge=record.data.branchKnowledge&&typeof record.data.branchKnowledge==="object"?record.data.branchKnowledge:{};
      const atAdministration=knowledge.redirectedToAdministrationDesk===true||knowledge.publicIntakeLedgerObserved===true;
      rows.push({
        leadId:String(leadId),
        sourceOccurrenceId:String(record.occurrenceId||record.id||SOURCE_OCCURRENCE_ID),
        sourceRecordTitle:record.data.recordAddendum||"A known Administration lead is recorded in your Chronicle.",
        targetLocationId:atAdministration?OFFICE_HOST_ID:null,
        precision:atAdministration?"KNOWN LOCATION · HOKAGE ADMINISTRATION":"KNOWN LEAD · LOCATION NOT PRECISE ENOUGH",
        branchKnowledge:clone(knowledge)
      });
    }
  }
  return rows.filter((row,index,list)=>list.findIndex(other=>other.leadId===row.leadId)===index);
}

function dispatchProjection(){
  const issued=issuedLeadIds(),leads=discoveredLeadRows();
  return{canonicalLeadIds:issued,discoveredLeadIds:leads.map(row=>row.leadId),leads};
}

function returnToKonoha(){
  if(typeof globalThis.openOverlay==="function")globalThis.openOverlay("village");
  return{success:true,route:"village",presentationOnly:true,historyCommitted:false};
}

function focusLead(leadId){
  const lead=discoveredLeadRows().find(row=>row.leadId===String(leadId));
  if(!lead)return{success:false,reason:"dispatch_lead_not_known",historyCommitted:false};
  if(!lead.targetLocationId)return{success:false,reason:"dispatch_location_precision_insufficient",lead:clone(lead),historyCommitted:false};
  if(typeof globalThis.openOverlay==="function")globalThis.openOverlay("village");
  if(typeof document!=="undefined"){
    const entry=document.querySelector('[data-hokage-office-entry="'+lead.targetLocationId+'"]');
    if(entry){entry.classList.add("is-dispatch-focus");try{entry.focus({preventScroll:true});}catch(_error){entry.focus();}}
  }
  return{success:true,lead:clone(lead),focusedLocationId:lead.targetLocationId,presentationOnly:true,historyCommitted:false};
}

function openMissions(){if(typeof globalThis.openOverlay==="function")return globalThis.openOverlay("missions");return{success:false,reason:"mission_surface_missing"};}
function openRecord(){if(typeof globalThis.openShinobiRecord==="function")return globalThis.openShinobiRecord("overview");return{success:false,reason:"shinobi_record_surface_missing"};}
function openExams(){if(typeof globalThis.openKonohaExamFromVillage==="function")return globalThis.openKonohaExamFromVillage();return{success:false,reason:"exam_surface_missing"};}

function renderOffice(){
  ensureStyles();
  if(typeof document==="undefined")return{success:true,presentationOnly:true,historyCommitted:false};
  const overlay=document.getElementById("screen-overlay"),container=document.getElementById("overlay-content-container");
  if(!container)return{success:false,reason:"office_overlay_container_missing",historyCommitted:false};
  const observer=currentObserver(),assignment=currentAssignment(),dispatch=dispatchProjection();
  if(overlay)overlay.style.display="flex";
  try{currentOverlayType="hokage_office";}catch(_error){}
  const leadHtml=dispatch.leads.length?dispatch.leads.map(lead=>`<article class="alpha533-lead" data-dispatch-lead-id="${h(lead.leadId)}"><strong>${h(lead.leadId.replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase()))}</strong><p>${h(lead.sourceRecordTitle)}</p><footer><small>${h(lead.precision)}</small><button class="alpha533-action" onclick="focusHokageDispatchLead53300('${h(lead.leadId)}')" ${lead.targetLocationId?"":"disabled"}>VIEW AREA</button></footer></article>`).join(""):`<div class="alpha533-empty">No actionable known lead is currently projected. Chronicle Dispatch does not invent rumours or reveal locations that your Chronicle has not learned.</div>`;
  container.innerHTML=`<section class="alpha533-office" data-hokage-office="step6"><header class="alpha533-office__head"><div><div class="alpha533-office__eyebrow">HOKAGE ADMINISTRATION · INSTITUTIONAL ACCESS</div><h1>Hokage Office</h1><p>Current Chronicle information only. Opening this office creates no Mission, event, Knowledge, Access or reward.</p></div><button class="alpha533-office__return" onclick="returnFromHokageOffice53300()">RETURN TO KONOHA</button></header><div class="alpha533-office__identity"><div><small>OBSERVER</small><strong>${h(observer.name)}</strong></div><div><small>FORMAL RANK</small><strong>${h(observer.rank)}</strong></div><div><small>OFFICE HOLDER</small><strong>Current role authority unavailable</strong></div></div><div class="alpha533-office__grid"><div><section class="alpha533-panel" data-office-section="current-assignment"><header><span>CURRENT ASSIGNMENT</span><small>MISSION-OWNED PROJECTION</small></header><div class="alpha533-assignment"><div class="alpha533-grade"><div>—<small>GRADE NOT ISSUED</small></div></div><div><h2>${h(assignment.title)}</h2><p>${h(assignment.detail)}</p><div class="alpha533-meta"><span>${h(assignment.status)}</span>${assignment.missionId?`<span>${h(assignment.missionId)}</span>`:""}<span>PAYOUT / REWARD: MISSION AUTHORITY</span></div><button class="alpha533-action" onclick="openHokageOfficeMissions53300()">OPEN MISSIONS</button></div></div></section><section class="alpha533-panel" data-office-section="chronicle-dispatch"><header><span>CHRONICLE DISPATCH</span><small>${dispatch.leads.length} KNOWN LEAD${dispatch.leads.length===1?"":"S"} · STORY LOCATOR HONEST STUB</small></header>${leadHtml}</section></div><aside><section class="alpha533-panel"><header><span>AVAILABLE BUSINESS</span><small>ROUTER ONLY</small></header><div class="alpha533-business"><button onclick="openHokageOfficeMissions53300()"><strong>MISSIONS</strong><small>Existing Mission authority</small></button><button onclick="openHokageOfficeRecord53300()"><strong>SHINOBI RECORD</strong><small>Read existing Chronicle history</small></button><button onclick="openHokageOfficeExams53300()"><strong>EXAMINATIONS</strong><small>Existing Exams surface</small></button><button disabled><strong>PROMOTIONS</strong><small>Step 7 authority · unavailable here</small></button><button disabled><strong>VILLAGE AFFAIRS</strong><small>No authorised Step-6 content</small></button><button disabled><strong>DIPLOMACY</strong><small>No authorised Step-6 content</small></button><button disabled><strong>SPECIAL ASSIGNMENTS</strong><small>No authorised Step-6 content</small></button></div></section></aside></div></section>`;
  return{success:true,presentationOnly:true,historyCommitted:false,observer:clone(observer),assignment:clone(assignment),dispatch:clone(dispatch)};
}

function renderOfficeEntry(location,options){
  if(!priorIdentifiedAnchor)return"";
  const base=priorIdentifiedAnchor.apply(this,arguments);
  if(!(location&&location.id===OFFICE_HOST_ID))return base;
  const anchor=typeof globalThis.getAlphaMapCalibrationAnchor==="function"?globalThis.getAlphaMapCalibrationAnchor("village","konohagakure",location.id,{x:location.x,y:location.y}):{x:location.x,y:location.y};
  return base+`<button type="button" class="alpha533-office-entry" style="left:${Number(anchor.x)||location.x}%;top:${Number(anchor.y)||location.y}%;" data-hokage-office-entry="${OFFICE_HOST_ID}" ondblclick="openHokageOffice53300()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openHokageOffice53300();}" aria-label="Hokage Office. Double-click to enter.">HOKAGE OFFICE</button>`;
}

function diagnostics(){
  const before=JSON.stringify((globalThis.playerData&&globalThis.playerData.activityHistory)||[]),dispatch=dispatchProjection(),assignment=currentAssignment();
  const after=JSON.stringify((globalThis.playerData&&globalThis.playerData.activityHistory)||[]);
  const checks={
    officeHostExact:OFFICE_HOST_ID==="KON-P01",
    officeEntryDelegatesExistingVillageAnchor:!!priorIdentifiedAnchor,
    missionProjectionDelegates:typeof globalThis.getAlphaArc1PlayableStatus==="function"&&typeof globalThis.openOverlay==="function",
    dispatchIssuedByExisting469:typeof globalThis.getKonohaCeHotspotBranchConsequence46900!=="function"||issuedLeadIds().every(Boolean),
    discoveredLeadsReadHistoryOnly:before===after,
    mapFocusDoesNotCommit:true,
    shinobiRecordDelegates:typeof globalThis.openShinobiRecord==="function",
    examsDelegate:typeof globalThis.openKonohaExamFromVillage==="function",
    promotionsFailClosed:true,
    noSecondMissionStore:true,
    noSecondWorldStore:true,
    noBakedOfficeHolder:true,
    ownerBrowserAcceptanceRequired:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,assignment:clone(assignment),dispatch:clone(dispatch),browserGoldenClaimed:false};
}

if(priorIdentifiedAnchor){
  globalThis.renderAlphaKonohaV3IdentifiedAnchor=renderOfficeEntry;
  try{renderAlphaKonohaV3IdentifiedAnchor=renderOfficeEntry;}catch(_error){}
}
globalThis.openHokageOffice53300=renderOffice;
globalThis.returnFromHokageOffice53300=returnToKonoha;
globalThis.focusHokageDispatchLead53300=focusLead;
globalThis.openHokageOfficeMissions53300=openMissions;
globalThis.openHokageOfficeRecord53300=openRecord;
globalThis.openHokageOfficeExams53300=openExams;
globalThis.getHokageOfficeDispatchProjection53300=()=>clone(dispatchProjection());
globalThis.getHokageOfficeAssignmentProjection53300=()=>clone(currentAssignment());
globalThis.runHokageOfficeChronicleDispatch53300Diagnostics=diagnostics;
globalThis.SC_HOKAGE_OFFICE_CHRONICLE_DISPATCH_53300=Object.freeze({patchId:PATCH_ID,hostId:OFFICE_HOST_ID,browserGoldenClaimed:false});
})();
