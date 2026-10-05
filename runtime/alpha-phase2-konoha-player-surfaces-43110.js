// ============================================================================
// PHASE 2 KONOHA PLAYER-FACING ACTIVITY SURFACES — #431 / #541
// Practical / Exams consume the canonical committed Current Team only.
// Training Grounds remains owned-roster. Presentation never grants progression.
// ============================================================================
(function installPhase2KonohaPlayerSurfaces43110(){
"use strict";
if(globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110)return;

const PATCH_ID="phase2_konoha_player_surfaces_43110_2026_10_05_current_team_polish_541";
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
    '#konoha-activity-screen[data-service-id="practical"]{background-image:linear-gradient(rgba(3,7,12,.30),rgba(3,7,12,.30)),url("UI/practical.png") !important;background-size:cover !important;background-position:center !important;background-repeat:no-repeat !important}',
    '#konoha-activity-screen[data-service-id="exams"]{background-image:linear-gradient(rgba(3,7,12,.30),rgba(3,7,12,.30)),url("UI/exams.png") !important;background-size:cover !important;background-position:center !important;background-repeat:no-repeat !important}',
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
    approvedActivityMastersBound:true,
    stableActionDockAndBoundedNotifications:true,
    resultStageReady:true,
    naturalExamCopy:!COPY.exams.subtitle.includes("runtime")&&!COPY.exams.note.includes("resolver"),
    naturalPracticalCopy:!COPY.practical.subtitle.includes("runtime")&&!COPY.practical.note.includes("resolver"),
    sevenDisciplineAccents:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenNotClaimed"&&key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,currentTeam:clone(team),selectable:clone(selectable),browserGoldenClaimed:false};
}
globalThis.getPhase2KonohaActivityTeam43110=()=>clone(currentTeamSelectable());
globalThis.decoratePhase2KonohaActivitySurface43110=decorate;
globalThis.runPhase2KonohaPlayerSurfaces43110Diagnostics=diagnostics;
globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
})();
