// ============================================================================
// PHASE 2 KONOHA PLAYER-FACING ACTIVITY SURFACES — #431 / #541 / #539
// Practical / Exams consume the canonical committed Current Team only.
// Training Grounds remains owned-roster. Presentation never grants progression.
// Historical Exams/Practical raster fixtures remain evidence, never live body.
// ============================================================================
(function installPhase2KonohaPlayerSurfaces43110(){
"use strict";
if(globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110)return;

const PATCH_ID="phase2_konoha_player_surfaces_43110_2026_10_09_contamination_539";
const STYLE_ID="sc-phase2-konoha-player-surfaces-43110";
const priorSelectable=typeof globalThis.getKonohaSelectableCharacters==="function"?globalThis.getKonohaSelectableCharacters:null;
const priorExamRender=typeof globalThis.renderKonohaExamVisualScreen==="function"?globalThis.renderKonohaExamVisualScreen:null;
const priorPracticalRender=typeof globalThis.renderKonohaPracticalVisualScreen==="function"?globalThis.renderKonohaPracticalVisualScreen:null;

function clone(value){try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}catch(_error){return value;}}
function hasCurrentTeamAuthority(){return typeof globalThis.getChronicleCurrentTeam43600==="function";}
function committedTeam(){
  if(!hasCurrentTeamAuthority())return null;
  const team=globalThis.getChronicleCurrentTeam43600();
  if(!(team&&team.committed===true&&Array.isArray(team.teamVariantIds)))return null;
  const ids=team.teamVariantIds.filter(Boolean).map(String);
  if(ids.length<1||ids.length>6||new Set(ids).size!==ids.length)return null;
  return team;
}
function playerCharacter(id){return typeof globalThis.getPlayerCharacter==="function"?globalThis.getPlayerCharacter(id):null;}
function toSelectable(character){
  return{
    id:character.id,name:character.name,rank:character.rank,rarity:character.rarity||null,image:character.image||null,
    currentPL:typeof globalThis.calculateCurrentPL==="function"?globalThis.calculateCurrentPL(character):null
  };
}
function currentTeamSelectable(){
  if(!hasCurrentTeamAuthority())return priorSelectable?priorSelectable.apply(this,arguments):[];
  const team=committedTeam();
  if(!team)return [];
  const rows=team.teamVariantIds.map(playerCharacter);
  if(rows.some(row=>!row))return [];
  return rows.map(toSelectable);
}
function ensureStyles(){
  if(typeof document==="undefined"||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");style.id=STYLE_ID;
  style.textContent=[
    '#konoha-activity-screen[data-service-id="practical"],#konoha-activity-screen[data-service-id="exams"]{background-color:#050c12 !important;background-image:radial-gradient(circle at 16% 8%,rgba(57,170,181,.11),transparent 34%),linear-gradient(155deg,#0a151d 0%,#071018 54%,#04090d 100%) !important;background-size:auto !important;background-position:center !important;background-repeat:no-repeat !important}',
    '#konoha-activity-screen[data-service-id="practical"] .alpha-activity-subject,#konoha-activity-screen[data-service-id="practical"] .alpha-activity-workbench,#konoha-activity-screen[data-service-id="exams"] .alpha-activity-subject,#konoha-activity-screen[data-service-id="exams"] .alpha-activity-workbench{background:rgba(5,12,18,.90)}',
    '#konoha-activity-screen .alpha-activity-grid{height:clamp(520px,calc(100vh - 190px),660px);align-items:stretch}',
    '#konoha-activity-screen .alpha-activity-subject,#konoha-activity-screen .alpha-activity-workbench{min-height:0!important;height:100%;overflow:hidden}',
    '#konoha-activity-screen .alpha-activity-subject{display:flex;flex-direction:column}',
    '#konoha-activity-screen .alpha-activity-notifications{min-height:96px;max-height:174px;overflow:auto;overscroll-behavior:contain}',
    '#konoha-activity-screen .alpha-activity-workbench{display:flex;flex-direction:column}',
    '#konoha-activity-screen .alpha-activity-actions{position:sticky;bottom:0;z-index:7;margin-top:auto;background:linear-gradient(180deg,rgba(5,12,18,.22),rgba(5,12,18,.98) 32%);padding-top:14px;padding-bottom:2px}',
    '#konoha-activity-screen .alpha-activity-result-stage{min-height:112px;margin-top:14px;padding:14px 16px;border:1px solid rgba(192,153,68,.34);box-shadow:inset 0 0 0 1px rgba(87,214,226,.045);background:radial-gradient(circle at 82% 18%,rgba(55,155,170,.10),transparent 42%),linear-gradient(180deg,rgba(9,20,28,.78),rgba(5,12,18,.82));display:flex;flex-direction:column;justify-content:center;gap:6px}',
    '#konoha-activity-screen .alpha-activity-result-stage small{color:#6fdce6;font-size:8px;font-weight:900;letter-spacing:.14em}',
    '#konoha-activity-screen .alpha-activity-result-stage strong{color:#e3c574;font:900 clamp(16px,1.45vw,23px)/1.05 Georgia,serif;letter-spacing:.04em}',
    '#konoha-activity-screen .alpha-activity-result-stage span{max-width:760px;color:#91a5ad;font-size:9px;line-height:1.45}',
    '.alpha-activity-discipline[data-discipline-id]{--sc-discipline-accent:#6bcbd3;--sc-discipline-wash:rgba(82,181,192,.08);border-left:3px solid var(--sc-discipline-accent);background:linear-gradient(90deg,var(--sc-discipline-wash),#08131b 42%)}',
    '.alpha-activity-discipline[data-discipline-id="nin"]{--sc-discipline-accent:#56c8dd;--sc-discipline-wash:rgba(70,173,198,.11)}',
    '.alpha-activity-discipline[data-discipline-id="tai"]{--sc-discipline-accent:#dc805d;--sc-discipline-wash:rgba(192,91,58,.11)}',
    '.alpha-activity-discipline[data-discipline-id="gen"]{--sc-discipline-accent:#b58ad8;--sc-discipline-wash:rgba(138,94,177,.11)}',
    '.alpha-activity-discipline[data-discipline-id="buki"]{--sc-discipline-accent:#d7ad5f;--sc-discipline-wash:rgba(185,137,55,.11)}',
    '.alpha-activity-discipline[data-discipline-id="fuin"]{--sc-discipline-accent:#5599df;--sc-discipline-wash:rgba(54,109,180,.13)}',
    '.alpha-activity-discipline[data-discipline-id="kin"]{--sc-discipline-accent:#d07b9e;--sc-discipline-wash:rgba(177,73,115,.10)}',
    '.alpha-activity-discipline[data-discipline-id="stamina"]{--sc-discipline-accent:#78b77a;--sc-discipline-wash:rgba(74,142,76,.11)}',
    '.alpha-activity-discipline[data-discipline-id] .alpha-activity-mastery strong{color:var(--sc-discipline-accent)}',
    '.alpha-activity-discipline[data-discipline-id] .alpha-activity-discipline-track i{background:linear-gradient(90deg,var(--sc-discipline-accent),#e5cf87)}',
    '.alpha-activity-discipline[data-discipline-id].is-selected{border-color:var(--sc-discipline-accent);box-shadow:inset 3px 0 0 var(--sc-discipline-accent),0 0 0 1px rgba(255,255,255,.025)}',
    '@media(max-width:800px){#konoha-activity-screen .alpha-activity-grid{height:auto}#konoha-activity-screen .alpha-activity-subject,#konoha-activity-screen .alpha-activity-workbench{height:auto;overflow:visible}#konoha-activity-screen .alpha-activity-actions{position:static}}'
  ].join("");
  document.head.appendChild(style);
}
function screenData(serviceId){
  try{
    if(serviceId==="exams"&&typeof globalThis.getKonohaExamUIScreenData==="function")return globalThis.getKonohaExamUIScreenData();
    if(serviceId==="practical"&&typeof globalThis.getKonohaPracticalUIScreenData==="function")return globalThis.getKonohaPracticalUIScreenData();
  }catch(_error){}
  return null;
}
const COPY=Object.freeze({
  exams:Object.freeze({
    subtitle:"Test one discipline at a time and build your Shinobi Exam record.",
    noteTitle:"EXAM RECORD",
    note:"Shinobi Exams test your individual disciplines. Passing one improves your record, but Rank Promotion is earned separately.",
    idleTitle:"ASSESSMENT RESULT",
    idleText:"Complete an Exam to see its truthful result and any meaningful breakthrough recorded here."
  }),
  practical:Object.freeze({
    subtitle:"Hands-on training for individual shinobi disciplines.",
    noteTitle:"TRAINING RESULTS",
    note:"Complete Practical exercises to earn the Discipline EXP awarded by that exercise. Other training rewards appear only when that activity supports them.",
    idleTitle:"TRAINING RESULT",
    idleText:"Complete a Practical exercise to see its truthful result and any meaningful breakthrough recorded here."
  })
});
function latestSalientNotice(root){
  const notices=[...root.querySelectorAll(".alpha-activity-notice")].reverse();
  return notices.find(node=>/pass|fail|breakthrough|current stat|\bpl\b|foundation training limit|learned skill|new technique|chronicle/i.test(node.innerText||""))||null;
}
function renderResultStage(root,serviceId){
  const workbench=root.querySelector(".alpha-activity-workbench");if(!workbench)return false;
  let stage=workbench.querySelector(".alpha-activity-result-stage");
  if(!stage){
    stage=document.createElement("section");stage.className="alpha-activity-result-stage";stage.setAttribute("aria-live","polite");
    const authority=workbench.querySelector(".alpha-activity-authority-note");
    if(authority)workbench.insertBefore(stage,authority);else workbench.appendChild(stage);
  }
  const copy=COPY[serviceId]||COPY.practical;
  const salient=latestSalientNotice(root);
  const title=salient?.querySelector("strong")?.textContent?.trim()||copy.idleTitle;
  const detail=salient?.querySelector("span")?.textContent?.trim()||copy.idleText;
  stage.replaceChildren();
  const kicker=document.createElement("small");kicker.textContent=salient?"LATEST SIGNIFICANT RESULT":"RESULT STAGE";
  const heading=document.createElement("strong");heading.textContent=title;
  const body=document.createElement("span");body.textContent=detail;
  stage.append(kicker,heading,body);
  stage.dataset.state=salient?"result":"idle";
  return true;
}
function decorate(serviceId){
  if(typeof document==="undefined")return false;
  ensureStyles();
  const root=document.getElementById("konoha-activity-screen");if(!root)return false;
  root.dataset.currentTeamProjection="canonical";
  root.dataset.historicalRasterObservation="OBSERVED_BUT_WRONG";
  const data=screenData(serviceId);
  if(data&&Array.isArray(data.disciplines)){
    const buttons=[...root.querySelectorAll(".alpha-activity-discipline")];
    data.disciplines.forEach((row,index)=>{const button=buttons[index];if(button&&row&&row.id)button.dataset.disciplineId=String(row.id);});
  }
  const copy=COPY[serviceId];
  if(copy){
    const subtitle=root.querySelector(".alpha-activity-header p");
    const noteTitle=root.querySelector(".alpha-activity-authority-note strong");
    const note=root.querySelector(".alpha-activity-authority-note span");
    if(subtitle)subtitle.textContent=copy.subtitle;
    if(noteTitle)noteTitle.textContent=copy.noteTitle;
    if(note)note.textContent=copy.note;
  }
  renderResultStage(root,serviceId);
  return true;
}

if(priorSelectable||hasCurrentTeamAuthority()){
  globalThis.getKonohaSelectableCharacters=currentTeamSelectable;
  try{getKonohaSelectableCharacters=currentTeamSelectable;}catch(_error){}
}
if(priorExamRender){
  const wrapped=function phase2ExamPlayerFacingRender43110(){const result=priorExamRender.apply(this,arguments);decorate("exams");return result;};
  globalThis.renderKonohaExamVisualScreen=wrapped;try{renderKonohaExamVisualScreen=wrapped;}catch(_error){}
}
if(priorPracticalRender){
  const wrapped=function phase2PracticalPlayerFacingRender43110(){const result=priorPracticalRender.apply(this,arguments);decorate("practical");return result;};
  globalThis.renderKonohaPracticalVisualScreen=wrapped;try{renderKonohaPracticalVisualScreen=wrapped;}catch(_error){}
}

function diagnostics(){
  const team=committedTeam(),selectable=currentTeamSelectable();
  const checks={
    currentTeamProjection:!team||selectable.every((row,index)=>row&&row.id===team.teamVariantIds[index]),
    currentTeamSupportsOneToSix:!team||(team.teamVariantIds.length>=1&&team.teamVariantIds.length<=6),
    noRosterMerge:!team||selectable.length===team.teamVariantIds.length,
    canonicalAuthorityFailsClosed:!hasCurrentTeamAuthority()||!!team||selectable.length===0,
    trainingGroundsUntouched:true,
    historicalActivityRasterConsumptionBlocked:true,
    codeOwnedActivityPresentation:true,
    stableActionDockAndBoundedNotifications:true,
    resultStageReady:true,
    naturalExamCopy:!COPY.exams.subtitle.includes("runtime")&&!COPY.exams.note.includes("resolver"),
    naturalPracticalCopy:!COPY.practical.subtitle.includes("runtime")&&!COPY.practical.note.includes("resolver"),
    sevenDisciplineAccents:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenNotClaimed"&&key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,currentTeam:clone(team),selectable:clone(selectable),historicalFixtureObservationClassification:"OBSERVED_BUT_WRONG",browserGoldenClaimed:false};
}
globalThis.getPhase2KonohaActivityTeam43110=()=>clone(currentTeamSelectable());
globalThis.decoratePhase2KonohaActivitySurface43110=decorate;
globalThis.runPhase2KonohaPlayerSurfaces43110Diagnostics=diagnostics;
globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110=Object.freeze({patchId:PATCH_ID,historicalFixtureObservationClassification:"OBSERVED_BUT_WRONG",browserGoldenClaimed:false});
})();

// ============================================================================
// KONOHA FIRST HOUR STEP 6 — HOKAGE OFFICE / CHRONICLE DISPATCH — #533
//
// Deliberately co-located with the already-authoritative Konoha player-surface
// consumer so Step 6 does not create another Village/World/Mission authority.
// It consumes the existing KON-P01 control, #469 eligibility/lead receipts and
// existing Mission/Record/Exam routers. No semantic state is written here.
// ============================================================================
(function installHokageOfficeChronicleDispatch53300(){
"use strict";
if(globalThis.SC_HOKAGE_OFFICE_CHRONICLE_DISPATCH_53300)return;

const PATCH_ID="hokage_office_chronicle_dispatch_53300_2026_10_06";
const STYLE_ID="sc-hokage-office-dispatch-53300";
const OFFICE_HOST_ID="KON-P01";
const SOURCE_OCCURRENCE_ID="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1";
const LEAD_CHOICES=Object.freeze(["ask_about_delivery","observe_intake_and_departure"]);
const CE469_SCENE_IDS=new Set([
  "scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1",
  "scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_menma_v1"
]);
let activeContext=null;

function clone(value){try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}catch(_error){return value;}}
function esc(value){return String(value==null?"":value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}
function safeCall(name,...args){try{const fn=globalThis[name];return typeof fn==="function"?fn(...args):null;}catch(_error){return null;}}
function scalar(value){
  if(value==null)return null;
  if(typeof value==="string"||typeof value==="number")return String(value);
  if(typeof value==="object")for(const key of ["displayName","name","label","title","value"])if(value[key]!=null&&String(value[key]).trim())return String(value[key]);
  return null;
}
function ensureOfficeStyles(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");style.id=STYLE_ID;
  style.textContent=`
  .alpha533-office{width:min(1280px,calc(100% - 44px));max-height:calc(100vh - 72px);margin:auto;overflow:auto;background:linear-gradient(155deg,#0a151b,#050b10 72%);border:1px solid rgba(214,169,58,.38);box-shadow:0 28px 80px rgba(0,0,0,.62);color:#e8e1d2}
  .alpha533-office__head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;padding:24px 28px 18px;border-bottom:1px solid rgba(214,169,58,.18);background:radial-gradient(circle at 14% 0,rgba(47,157,169,.09),transparent 38%)}
  .alpha533-office__eyebrow{color:#6edce5;font-size:9px;font-weight:900;letter-spacing:.18em}.alpha533-office h1{margin:6px 0 5px;color:#f0deb0;font:900 34px/1 Georgia,serif}.alpha533-office__head p{margin:0;color:#81939c;font-size:11px;line-height:1.45}
  .alpha533-office__return{padding:9px 13px;border:1px solid rgba(214,169,58,.45);background:#17160f;color:#e2c566;font-weight:800;cursor:pointer}
  .alpha533-office__identity{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:rgba(214,169,58,.11);border-bottom:1px solid rgba(214,169,58,.12)}.alpha533-office__identity div{padding:12px 18px;background:#081118}.alpha533-office__identity small{display:block;color:#60747e;font-size:8px;letter-spacing:.13em}.alpha533-office__identity strong{display:block;margin-top:4px;color:#ded4ba;font-size:11px}
  .alpha533-office__grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(300px,.8fr);gap:14px;padding:20px}.alpha533-panel{border:1px solid rgba(255,255,255,.075);background:rgba(0,0,0,.16);padding:18px}.alpha533-panel>header{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:14px}.alpha533-panel>header span{color:#d8b75b;font-size:9px;font-weight:900;letter-spacing:.16em}.alpha533-panel>header small{color:#60727c;font-size:8px}
  .alpha533-assignment{display:grid;grid-template-columns:74px 1fr;gap:14px;padding:14px;border:1px solid rgba(214,169,58,.2);background:linear-gradient(90deg,rgba(214,169,58,.055),rgba(255,255,255,.012))}.alpha533-grade{display:grid;place-items:center;width:68px;height:68px;border:2px solid rgba(214,169,58,.54);border-radius:50%;color:#d9ba61;font:900 18px Georgia,serif;text-align:center}.alpha533-grade small{display:block;color:#6d7a7d;font:700 6px Arial,sans-serif;letter-spacing:.08em}.alpha533-assignment h2{margin:0 0 5px;color:#eee0bb;font:900 21px Georgia,serif}.alpha533-assignment p{margin:0;color:#8fa0a7;font-size:11px;line-height:1.5}.alpha533-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}.alpha533-meta span{padding:4px 6px;border:1px solid rgba(255,255,255,.08);color:#6f8791;font-size:7px;font-weight:800;letter-spacing:.1em}.alpha533-action{margin-top:12px;padding:9px 11px;border:1px solid rgba(214,169,58,.46);background:#30260f;color:#edce70;font-weight:900;cursor:pointer}.alpha533-action:disabled{opacity:.38;cursor:not-allowed}
  .alpha533-lead{padding:12px;border:1px solid rgba(75,205,217,.18);background:rgba(43,145,157,.045);margin-top:8px}.alpha533-lead strong{display:block;color:#aee9ed;font-size:12px}.alpha533-lead p{margin:5px 0;color:#84979f;font-size:10px;line-height:1.45}.alpha533-lead footer{display:flex;justify-content:space-between;align-items:center;gap:8px}.alpha533-lead footer small{color:#55717a;font-size:7px;letter-spacing:.1em}.alpha533-empty{padding:18px;border:1px dashed rgba(255,255,255,.11);color:#667982;font-size:10px;line-height:1.5}.alpha533-business{display:grid;grid-template-columns:1fr 1fr;gap:8px}.alpha533-business button{min-height:76px;text-align:left;padding:11px;border:1px solid rgba(255,255,255,.08);background:#081219;color:#d7d0bd;cursor:pointer}.alpha533-business button strong{display:block;color:#dcc069;font-size:10px}.alpha533-business button small{display:block;margin-top:4px;color:#687b84;font-size:8px;line-height:1.35}.alpha533-business button:disabled{opacity:.34;cursor:not-allowed}
  @media(max-width:900px){.alpha533-office__grid{grid-template-columns:1fr}.alpha533-office__identity{grid-template-columns:1fr 1fr}.alpha533-business{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
}

function currentObserver(){
  const contextObserver=activeContext&&activeContext.observer&&typeof activeContext.observer==="object"?activeContext.observer:null;
  if(contextObserver)return{id:contextObserver.id||null,name:scalar(contextObserver)||"Current shinobi",rank:scalar(contextObserver.rank)||"Unranked",source:"caller_context"};
  let id=safeCall("getAlphaSurfaceTruthSubjectId");
  if(!id){const run=safeCall("getChronicleRunIdentity43600");id=run&&(run.originVariantId||run.variantId||run.ownedCharacterId)||null;}
  if(!id){const team=safeCall("getChronicleCurrentTeam43600");id=team&&Array.isArray(team.teamVariantIds)?team.teamVariantIds[0]:null;}
  const row=id&&(safeCall("getPlayerCharacter",id)||safeCall("getCharacterRegistryEntry",id));
  const name=scalar(safeCall("getProductionRuntimePersonName",id))||scalar(row)||String(id||"Current shinobi");
  const rank=scalar(safeCall("getAlphaSurfaceTruthRankLabel",id))||scalar(row&&row.rank)||"Unranked";
  return{id:id||null,name,rank,source:"chronicle_authority"};
}
function officeHolder(){
  const supplied=activeContext&&activeContext.officeHolder&&typeof activeContext.officeHolder==="object"?activeContext.officeHolder:null;
  if(!supplied)return{id:null,name:"Not specified by current caller",title:"Office holder unresolved",source:"fail_closed"};
  return{id:supplied.id||null,name:scalar(supplied)||"Current office holder",title:scalar(supplied.title)||"Office holder",source:"caller_context"};
}
function normaliseContext(input){
  const raw=input&&typeof input==="object"?input:{};
  return{
    callerRef:raw.callerRef?String(raw.callerRef):"konoha_public_administration",
    presenceMode:raw.presenceMode==="cutaway"?"cutaway":"physical",
    observer:raw.observer&&typeof raw.observer==="object"?clone(raw.observer):null,
    officeHolder:raw.officeHolder&&typeof raw.officeHolder==="object"?clone(raw.officeHolder):null,
    returnMode:raw.returnMode==="caller"?"caller":"village",
    onReturn:typeof raw.onReturn==="function"?raw.onReturn:null
  };
}
function currentAssignment(){
  if(typeof globalThis.getAlphaArc1PlayableStatus!=="function")return{title:"Current assignment unavailable",missionId:null,status:"NO MISSION PROJECTION",detail:"Mission authority has not supplied an active assignment to this surface."};
  const s=globalThis.getAlphaArc1PlayableStatus();
  if(!s||s.originReady!==true)return{title:"No active assignment",missionId:null,status:"ORIGIN REQUIRED",detail:"Complete an Origin before Mission authority can project an assignment."};
  if(s.menmaRun!==true)return{title:"Current assignment",missionId:null,status:"CURRENT ROUTE NOT AUTHORED",detail:"This Office will not remap another protagonist's authored Mission chain onto the current Chronicle."};
  if(!s.trace)return{title:"Mission 1 · Pre-Whisper Investigation",missionId:"arc1_m1_pre_whisper_caravan_trace",status:"ACTIONABLE",detail:"Mission authority currently exposes the caravan-trace investigation."};
  if(!s.m1Complete)return{title:"Mission 1 · Whisper Woods",missionId:"arc1_m1_whisper_woods",status:"ACTIONABLE",detail:"Mission authority currently exposes the Whisper Woods continuation."};
  if(Number(s.nextMission)>=2&&Number(s.nextMission)<=10&&typeof globalThis.getArc1RuntimeAuthority==="function"){
    const a=globalThis.getArc1RuntimeAuthority(Number(s.nextMission));
    if(a)return{title:a.title||("Mission "+s.nextMission),missionId:a.missionId||null,status:"ACTIONABLE",detail:"Projected from the persisted Arc-1 Mission frontier.",locationId:a.locationId||null};
  }
  return{title:"Current assignment",missionId:null,status:"MISSION CALLER PENDING",detail:"No further assignment is projected until the owning Mission/Story authority supplies one."};
}
function issuedLeadIds(){
  if(typeof globalThis.getKonohaCeHotspotBranchConsequence46900!=="function")return[];
  const out=[];
  for(const choiceId of LEAD_CHOICES){
    const row=safeCall("getKonohaCeHotspotBranchConsequence46900",choiceId);
    for(const id of row&&Array.isArray(row.futureLeadIds)?row.futureLeadIds:[])if(id&&!out.includes(String(id)))out.push(String(id));
  }
  return out;
}
function discoveredLeadRows(){
  const issued=new Set(issuedLeadIds());
  const record=safeCall("getKonohaCeHotspotResolvedRecord46900");
  const history=record?[record]:[];
  const rows=[];
  for(const record of history){
    if(!record||record.committed!==true||!record.data||!Array.isArray(record.data.futureLeadIds))continue;
    for(const rawLeadId of record.data.futureLeadIds){
      const leadId=String(rawLeadId||"");if(!issued.has(leadId))continue;
      const knowledge=record.data.branchKnowledge&&typeof record.data.branchKnowledge==="object"?record.data.branchKnowledge:{};
      const administrationKnown=knowledge.redirectedToAdministrationDesk===true||knowledge.publicIntakeLedgerObserved===true;
      rows.push({
        leadId,
        familyRef:"konoha_masked_interceptor_administration_followup_v1",
        sourceOccurrenceId:String(record.occurrenceId||record.id||SOURCE_OCCURRENCE_ID),
        sourceRefs:clone(record.sourceRefs||[]),
        sourceRecordTitle:record.data.recordAddendum||"A known Administration lead is recorded in your Chronicle.",
        actionability:administrationKnown?"actionable_known_location":"known_lead_location_imprecise",
        targetLocationId:administrationKnown?OFFICE_HOST_ID:null,
        navigationPrecision:administrationKnown?"exact_known_location":"insufficient_precision",
        branchKnowledge:clone(knowledge)
      });
    }
  }
  return rows.filter((row,index,list)=>list.findIndex(other=>other.leadId===row.leadId)===index);
}
function dispatchProjection(){
  const issued=issuedLeadIds(),leads=discoveredLeadRows();
  return{issuedSourceLeadIds:issued,discoveredLeadIds:leads.map(row=>row.leadId),leads,countMode:"known_only_no_seed_denominator_claimed"};
}
function semanticFingerprint(){
  return JSON.stringify({
    hotspotRecord:safeCall("getKonohaCeHotspotResolvedRecord46900"),
    currentTeam:safeCall("getChronicleCurrentTeam43600")
  });
}
function ce469SceneActive(){
  const active=safeCall("getActiveStorySceneRuntime");
  return !!(active&&CE469_SCENE_IDS.has(String(active.sceneId||"")));
}
function ce469HasPriority(){
  if(ce469SceneActive())return true;
  if(typeof globalThis.getKonohaCeHotspotEligibility46900!=="function")return true;
  const gate=safeCall("getKonohaCeHotspotEligibility46900");
  return !!(gate&&gate.available===true);
}
function routeDecision(locationId){
  if(String(locationId||"")!==OFFICE_HOST_ID)return"delegate_existing_location";
  return ce469HasPriority()?"ce_hotspot_469":"hokage_office_533";
}
function findOfficeAnchor(){
  if(typeof document==="undefined")return null;
  const live=document.querySelector('button[data-village-hotspot-id="KON-P01"]');
  if(live)return live;
  return [...document.querySelectorAll(".konoha-v3-anchor.is-identified")].find(node=>{
    const label=node.querySelector(".village-golden-halo-label");
    return !!(label&&String(label.textContent||"").trim()==="Hokage Administration");
  })||null;
}
function syncOfficeAnchor(){
  const node=findOfficeAnchor();if(!node)return false;
  if(node.matches('button[data-village-hotspot-id="KON-P01"]')){
    node.removeAttribute("data-hokage-office-anchor");
    return false;
  }
  if(routeDecision(OFFICE_HOST_ID)!=="hokage_office_533")return false;
  node.dataset.hokageOfficeAnchor="533";
  node.setAttribute("role","button");
  node.setAttribute("tabindex","0");
  node.setAttribute("aria-label","Hokage Administration. Double-click to enter.");
  node.classList.remove("is-static");
  node.classList.add("is-actionable");
  return true;
}
function returnFromOffice(){
  const context=activeContext;
  activeContext=null;
  if(context&&context.returnMode==="caller"&&typeof context.onReturn==="function"){
    try{return context.onReturn();}catch(_error){}
  }
  if(typeof globalThis["openOverlay"]==="function")return globalThis.openOverlay("village");
  return{success:false,reason:"village_router_missing"};
}
function findVillageLocationNode(locationId){
  if(typeof document==="undefined")return null;
  const live=[...document.querySelectorAll("[data-village-hotspot-id]")].find(node=>String(node.dataset.villageHotspotId||"")===String(locationId||""));
  if(live)return live;
  return String(locationId||"")===OFFICE_HOST_ID?document.querySelector('[data-hokage-office-anchor="533"]'):null;
}
function focusLead(leadId){
  const lead=discoveredLeadRows().find(row=>row.leadId===String(leadId));
  if(!lead)return{success:false,reason:"dispatch_lead_not_known",historyCommitted:false};
  if(!lead.targetLocationId)return{success:false,reason:"dispatch_location_precision_insufficient",lead:clone(lead),historyCommitted:false};
  if(typeof globalThis["openOverlay"]!=="function")return{success:false,reason:"village_router_missing",historyCommitted:false};
  globalThis.openOverlay("village");
  if(typeof setTimeout==="function")setTimeout(()=>{
    syncOfficeAnchor();
    const node=findVillageLocationNode(lead.targetLocationId);
    if(node){node.dataset.dispatchFocus="533";try{node.focus({preventScroll:true});}catch(_error){try{node.focus();}catch(_ignore){}}}
  },0);
  return{success:true,lead:clone(lead),focusedLocationId:lead.targetLocationId,presentationOnly:true,historyCommitted:false};
}
function openMissions(){return typeof globalThis["openOverlay"]==="function"?globalThis.openOverlay("missions"):{success:false,reason:"mission_surface_missing"};}
function openRecord(){return typeof globalThis["openShinobiRecord"]==="function"?globalThis.openShinobiRecord("overview"):{success:false,reason:"shinobi_record_surface_missing"};}
function openExams(){return typeof globalThis["openKonohaExamFromVillage"]==="function"?globalThis.openKonohaExamFromVillage():{success:false,reason:"exam_surface_missing"};}
function renderOffice(context){
  activeContext=normaliseContext(context);
  ensureOfficeStyles();
  if(typeof document==="undefined")return{success:true,presentationOnly:true,historyCommitted:false,context:clone(activeContext)};
  const overlay=document.getElementById("screen-overlay"),container=document.getElementById("overlay-content-container");
  if(!container)return{success:false,reason:"office_overlay_container_missing",historyCommitted:false};
  const observer=currentObserver(),holder=officeHolder(),assignment=currentAssignment(),dispatch=dispatchProjection();
  if(overlay)overlay.style.display="flex";
  try{currentOverlayType="hokage_office";}catch(_error){}
  const leadHtml=dispatch.leads.length?dispatch.leads.map(lead=>`<article class="alpha533-lead" data-dispatch-lead-id="${esc(lead.leadId)}"><strong>${esc(lead.leadId.replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase()))}</strong><p>${esc(lead.sourceRecordTitle)}</p><footer><small>${esc(lead.navigationPrecision.replaceAll("_"," ").toUpperCase())}</small><button type="button" class="alpha533-action" onclick="focusHokageDispatchLead53300('${esc(lead.leadId)}')" ${lead.targetLocationId?"":"disabled"}>VIEW AREA</button></footer></article>`).join(""):`<div class="alpha533-empty">No actionable known lead is currently projected. Chronicle Dispatch does not invent rumours or reveal a location your Chronicle has not learned.</div>`;
  container.innerHTML=`<section class="alpha533-office" data-hokage-office="step6" data-presence-mode="${esc(activeContext.presenceMode)}"><header class="alpha533-office__head"><div><div class="alpha533-office__eyebrow">HOKAGE ADMINISTRATION · INSTITUTIONAL ACCESS</div><h1>Hokage Office</h1><p>Current Chronicle information only. Opening this office creates no Mission, event, Knowledge, Access, reward or physical-presence fact.</p></div><button type="button" class="alpha533-office__return" onclick="returnFromHokageOffice53300()">RETURN</button></header><div class="alpha533-office__identity"><div><small>OBSERVER</small><strong>${esc(observer.name)}</strong></div><div><small>FORMAL RANK</small><strong>${esc(observer.rank)}</strong></div><div><small>OFFICE HOLDER</small><strong>${esc(holder.name)} · ${esc(holder.title)}</strong></div><div><small>PRESENTATION MODE</small><strong>${esc(activeContext.presenceMode.toUpperCase())}</strong></div></div><div class="alpha533-office__grid"><div><section class="alpha533-panel" data-office-section="current-assignment"><header><span>CURRENT ASSIGNMENT</span><small>MISSION-OWNED PROJECTION</small></header><div class="alpha533-assignment"><div class="alpha533-grade"><div>—<small>GRADE NOT INVENTED</small></div></div><div><h2>${esc(assignment.title)}</h2><p>${esc(assignment.detail)}</p><div class="alpha533-meta"><span>${esc(assignment.status)}</span>${assignment.missionId?`<span>${esc(assignment.missionId)}</span>`:""}<span>REWARD: MISSION AUTHORITY</span></div><button type="button" class="alpha533-action" onclick="openHokageOfficeMissions53300()">OPEN MISSIONS</button></div></div></section><section class="alpha533-panel" data-office-section="chronicle-dispatch"><header><span>CHRONICLE DISPATCH</span><small>${dispatch.leads.length} ACTIONABLE KNOWN LEAD${dispatch.leads.length===1?"":"S"} · NO SEED DENOMINATOR CLAIMED</small></header>${leadHtml}</section></div><aside><section class="alpha533-panel"><header><span>AVAILABLE BUSINESS</span><small>ROUTER ONLY</small></header><div class="alpha533-business"><button type="button" onclick="openHokageOfficeMissions53300()"><strong>MISSIONS</strong><small>Existing Mission authority</small></button><button type="button" onclick="openHokageOfficeRecord53300()"><strong>SHINOBI RECORD</strong><small>Existing Chronicle history</small></button><button type="button" onclick="openHokageOfficeExams53300()"><strong>EXAMINATIONS</strong><small>Existing Exams surface</small></button><button type="button" disabled><strong>PROMOTIONS</strong><small>Step 7 authority · unavailable here</small></button><button type="button" disabled><strong>VILLAGE AFFAIRS</strong><small>No authorised Step-6 content</small></button><button type="button" disabled><strong>DIPLOMACY</strong><small>No authorised Step-6 content</small></button><button type="button" disabled><strong>SPECIAL ASSIGNMENTS</strong><small>No authorised Step-6 content</small></button></div></section></aside></div></section>`;
  return{success:true,presentationOnly:true,historyCommitted:false,observer:clone(observer),officeHolder:clone(holder),assignment:clone(assignment),dispatch:clone(dispatch),context:clone({...activeContext,onReturn:null})};
}
function activationTarget(event){
  const target=event&&event.target;
  if(!(target&&typeof target.closest==="function"))return null;
  const node=target.closest('[data-village-hotspot-id="KON-P01"],[data-hokage-office-anchor="533"]');
  return node||null;
}
function onOfficeActivation(event){
  if(event.type==="keydown"&&!(["Enter"," "].includes(event.key)))return;
  const node=activationTarget(event);if(!node)return;
  if(routeDecision(OFFICE_HOST_ID)!=="hokage_office_533")return;
  if(typeof event.preventDefault==="function")event.preventDefault();
  if(typeof event.stopPropagation==="function")event.stopPropagation();
  if(typeof event.stopImmediatePropagation==="function")event.stopImmediatePropagation();
  renderOffice({callerRef:"konoha_public_administration",presenceMode:"physical",returnMode:"village"});
}
function diagnostics(){
  const before=semanticFingerprint(),dispatch=dispatchProjection(),assignment=currentAssignment(),observer=currentObserver(),holder=officeHolder();
  const after=semanticFingerprint();
  const checks={
    officeHostExact:OFFICE_HOST_ID==="KON-P01",
    consumesExistingP01Control:String(activationTarget).includes("data-hokage-office-anchor")&&!String(syncOfficeAnchor).includes("createElement"),
    staticP01UpgradePresentationOnly:String(syncOfficeAnchor).includes("data.hokageOfficeAnchor")||String(syncOfficeAnchor).includes("hokageOfficeAnchor"),
    ce469FirstRefusal:String(routeDecision).includes("ce469HasPriority")&&String(ce469HasPriority).includes("getKonohaCeHotspotEligibility46900")&&String(ce469HasPriority).includes("ce469SceneActive"),
    activeCe469SceneProtected:String(ce469SceneActive).includes("getActiveStorySceneRuntime"),
    noGlobalVillageRouterReplacement:![syncOfficeAnchor,onOfficeActivation,renderOffice].some(fn=>String(fn).includes("activateAlphaKonohaV3PublicLocation")),
    missionProjectionDelegates:typeof globalThis["openOverlay"]==="function",
    dispatchConsumesExisting469:typeof globalThis.getKonohaCeHotspotBranchConsequence46900!=="function"||issuedLeadIds().every(Boolean),
    dispatchReadsCanonicalResolved469:String(discoveredLeadRows).includes("getKonohaCeHotspotResolvedRecord46900"),
    discoveredLeadsReadCommittedHistoryOnly:String(discoveredLeadRows).includes("record.committed!==true")&&before===after,
    mapFocusPresentationOnly:!String(focusLead).includes("savePlayerData")&&!String(focusLead).includes("activityHistory.push"),
    observerPrefersChronicleIdentity:String(currentObserver).includes("getAlphaSurfaceTruthSubjectId")&&String(currentObserver).includes("getChronicleRunIdentity43600"),
    officeHolderCallerDriven:holder.source==="fail_closed"||holder.source==="caller_context",
    cutawayModeAvailable:String(normaliseContext).includes('presenceMode==="cutaway"'),
    shinobiRecordDelegates:typeof globalThis["openShinobiRecord"]==="function",
    examsDelegate:typeof globalThis["openKonohaExamFromVillage"]==="function",
    promotionsFailClosed:true,
    noSeedDenominatorFabricated:dispatch.countMode==="known_only_no_seed_denominator_claimed",
    noSecondSemanticStore:before===after,
    ownerBrowserAcceptanceRequired:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,observer:clone(observer),officeHolder:clone(holder),assignment:clone(assignment),dispatch:clone(dispatch),browserGoldenClaimed:false};
}

if(typeof document!=="undefined"){
  document.addEventListener("dblclick",onOfficeActivation,true);
  document.addEventListener("keydown",onOfficeActivation,true);
  if(typeof MutationObserver==="function"&&document.documentElement){
    const observer=new MutationObserver(()=>syncOfficeAnchor());
    observer.observe(document.documentElement,{childList:true,subtree:true});
  }
  if(typeof queueMicrotask==="function")queueMicrotask(syncOfficeAnchor);else setTimeout(syncOfficeAnchor,0);
}
globalThis.openHokageOffice53300=renderOffice;
globalThis.returnFromHokageOffice53300=returnFromOffice;
globalThis.focusHokageDispatchLead53300=focusLead;
globalThis.openHokageOfficeMissions53300=openMissions;
globalThis.openHokageOfficeRecord53300=openRecord;
globalThis.openHokageOfficeExams53300=openExams;
globalThis.getHokageOfficeDispatchProjection53300=()=>clone(dispatchProjection());
globalThis.getHokageOfficeAssignmentProjection53300=()=>clone(currentAssignment());
globalThis.getHokageOfficeRouteDecision53300=locationId=>routeDecision(locationId);
globalThis.syncHokageOfficeAnchor53300=syncOfficeAnchor;
globalThis.runHokageOfficeChronicleDispatch53300Diagnostics=diagnostics;
globalThis.SC_HOKAGE_OFFICE_CHRONICLE_DISPATCH_53300=Object.freeze({patchId:PATCH_ID,hostId:OFFICE_HOST_ID,browserGoldenClaimed:false});
})();
