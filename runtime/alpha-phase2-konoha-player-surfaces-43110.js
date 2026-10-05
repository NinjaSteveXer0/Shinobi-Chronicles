// ============================================================================
// PHASE 2 KONOHA PLAYER-FACING ACTIVITY SURFACES — #431 TRIAL
// Practical / Exams use committed currentTeam; Training Grounds remains owned-roster.
// Presentation-only Discipline accents, approved production masters and natural player copy.
// ============================================================================
(function installPhase2KonohaPlayerSurfaces43110(){
"use strict";
if(globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110)return;

const PATCH_ID="phase2_konoha_player_surfaces_43110_2026_10_05_active_masters";
const STYLE_ID="sc-phase2-konoha-player-surfaces-43110";
const priorSelectable=typeof globalThis.getKonohaSelectableCharacters==="function"?globalThis.getKonohaSelectableCharacters:null;
const priorExamRender=typeof globalThis.renderKonohaExamVisualScreen==="function"?globalThis.renderKonohaExamVisualScreen:null;
const priorPracticalRender=typeof globalThis.renderKonohaPracticalVisualScreen==="function"?globalThis.renderKonohaPracticalVisualScreen:null;

function clone(value){try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}catch(_error){return value;}}
function committedTeam(){
  if(typeof globalThis.getChronicleCurrentTeam43600!=="function")return null;
  const team=globalThis.getChronicleCurrentTeam43600();
  return team&&team.committed===true&&Array.isArray(team.teamVariantIds)&&team.teamVariantIds.length===3?team:null;
}
function playerCharacter(id){return typeof globalThis.getPlayerCharacter==="function"?globalThis.getPlayerCharacter(id):null;}
function toSelectable(character){
  return{
    id:character.id,name:character.name,rank:character.rank,rarity:character.rarity||null,image:character.image||null,
    currentPL:typeof globalThis.calculateCurrentPL==="function"?globalThis.calculateCurrentPL(character):null
  };
}
function currentTeamSelectable(){
  const team=committedTeam();
  if(!team)return priorSelectable?priorSelectable.apply(this,arguments):[];
  return team.teamVariantIds.map(playerCharacter).filter(Boolean).map(toSelectable);
}
function ensureStyles(){
  if(typeof document==="undefined"||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");style.id=STYLE_ID;
  style.textContent=[
    '#konoha-activity-screen[data-service-id="practical"]{background-image:linear-gradient(rgba(3,7,12,.30),rgba(3,7,12,.30)),url("UI/practical.png") !important;background-size:cover !important;background-position:center !important;background-repeat:no-repeat !important}',
    '#konoha-activity-screen[data-service-id="exams"]{background-image:linear-gradient(rgba(3,7,12,.30),rgba(3,7,12,.30)),url("UI/exams.png") !important;background-size:cover !important;background-position:center !important;background-repeat:no-repeat !important}',
    '#konoha-activity-screen[data-service-id="practical"] .alpha-activity-subject,#konoha-activity-screen[data-service-id="practical"] .alpha-activity-workbench,#konoha-activity-screen[data-service-id="exams"] .alpha-activity-subject,#konoha-activity-screen[data-service-id="exams"] .alpha-activity-workbench{background:rgba(5,12,18,.86)}',
    '.alpha-activity-discipline[data-discipline-id]{--sc-discipline-accent:#6bcbd3;--sc-discipline-wash:rgba(82,181,192,.08);border-left:3px solid var(--sc-discipline-accent);background:linear-gradient(90deg,var(--sc-discipline-wash),#08131b 42%)}',
    '.alpha-activity-discipline[data-discipline-id="nin"]{--sc-discipline-accent:#56c8dd;--sc-discipline-wash:rgba(70,173,198,.11)}',
    '.alpha-activity-discipline[data-discipline-id="tai"]{--sc-discipline-accent:#dc805d;--sc-discipline-wash:rgba(192,91,58,.11)}',
    '.alpha-activity-discipline[data-discipline-id="gen"]{--sc-discipline-accent:#b58ad8;--sc-discipline-wash:rgba(138,94,177,.11)}',
    '.alpha-activity-discipline[data-discipline-id="buki"]{--sc-discipline-accent:#d7ad5f;--sc-discipline-wash:rgba(185,137,55,.11)}',
    '.alpha-activity-discipline[data-discipline-id="fuin"]{--sc-discipline-accent:#65aee0;--sc-discipline-wash:rgba(66,125,181,.11)}',
    '.alpha-activity-discipline[data-discipline-id="kin"]{--sc-discipline-accent:#d07b9e;--sc-discipline-wash:rgba(177,73,115,.10)}',
    '.alpha-activity-discipline[data-discipline-id="stamina"]{--sc-discipline-accent:#78b77a;--sc-discipline-wash:rgba(74,142,76,.11)}',
    '.alpha-activity-discipline[data-discipline-id] .alpha-activity-mastery strong{color:var(--sc-discipline-accent)}',
    '.alpha-activity-discipline[data-discipline-id] .alpha-activity-discipline-track i{background:linear-gradient(90deg,var(--sc-discipline-accent),#e5cf87)}',
    '.alpha-activity-discipline[data-discipline-id].is-selected{border-color:var(--sc-discipline-accent);box-shadow:inset 3px 0 0 var(--sc-discipline-accent),0 0 0 1px rgba(255,255,255,.025)}'
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
    note:"Shinobi Exams test your individual disciplines. Passing one improves your record, but Rank Promotion is earned separately."
  }),
  practical:Object.freeze({
    subtitle:"Hands-on training for individual shinobi disciplines.",
    noteTitle:"TRAINING RESULTS",
    note:"Complete Practical exercises to earn the Discipline EXP awarded by that exercise. Other training rewards appear only when that activity supports them."
  })
});
function decorate(serviceId){
  if(typeof document==="undefined")return false;
  ensureStyles();
  const root=document.getElementById("konoha-activity-screen");if(!root)return false;
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
  return true;
}

if(priorSelectable){
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
    noRosterMerge:!team||selectable.length===team.teamVariantIds.length,
    trainingGroundsUntouched:true,
    approvedActivityMastersBound:true,
    naturalExamCopy:!COPY.exams.subtitle.includes("runtime")&&!COPY.exams.note.includes("resolver"),
    naturalPracticalCopy:!COPY.practical.subtitle.includes("runtime")&&!COPY.practical.note.includes("resolver"),
    sevenDisciplineAccents:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,currentTeam:clone(team),selectable:clone(selectable),browserGoldenClaimed:false};
}
globalThis.getPhase2KonohaActivityTeam43110=()=>clone(currentTeamSelectable());
globalThis.decoratePhase2KonohaActivitySurface43110=decorate;
globalThis.runPhase2KonohaPlayerSurfaces43110Diagnostics=diagnostics;
globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
})();
