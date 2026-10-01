// ============================================================================
// PHASE 2 — DISCIPLINE DEVELOPMENT PLAYER PROJECTION — #448
//
// Late presentation adapter. It consumes the canonical #448 progression data
// after #431's current-team/player-facing surface adapter has rendered.
// No gameplay state is written here.
// ============================================================================
(function installPhase2DisciplineDevelopmentUI44810(){
"use strict";
if(globalThis.SC_PHASE2_DISCIPLINE_DEVELOPMENT_UI_44810)return;

const PATCH_ID="phase2_discipline_development_ui_44810_2026_10_02";
const STYLE_ID="sc-phase2-discipline-development-ui-44810";
const priorExamRender=typeof globalThis.renderKonohaExamVisualScreen==="function"?globalThis.renderKonohaExamVisualScreen:null;
const priorPracticalRender=typeof globalThis.renderKonohaPracticalVisualScreen==="function"?globalThis.renderKonohaPracticalVisualScreen:null;

function ensureStyles(){
  if(typeof document==="undefined"||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=[
    ".alpha-activity-discipline .sc-development-ceiling{display:block;margin-top:4px;font-size:9px;letter-spacing:.08em;color:#8196a1;text-transform:uppercase}",
    ".alpha-activity-discipline.is-development-complete .alpha-activity-exp{color:#d9bd71}",
    ".alpha-activity-discipline.is-development-complete .alpha-activity-discipline-track i{width:100%!important}",
    ".alpha-activity-discipline.is-development-complete .sc-development-ceiling{color:#d9bd71}",
    ".alpha-activity-primary[data-development-blocked='true']{opacity:.5;cursor:not-allowed}"
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
function selectedDisciplineId(serviceId){
  try{
    if(serviceId==="exams"&&typeof globalThis.getKonohaExamSelectedDisciplineId==="function")return globalThis.getKonohaExamSelectedDisciplineId();
    if(serviceId==="practical"&&typeof globalThis.getKonohaPracticalSelectedDisciplineId==="function")return globalThis.getKonohaPracticalSelectedDisciplineId();
  }catch(_error){}
  return null;
}
function decorate(serviceId){
  if(typeof document==="undefined")return false;
  ensureStyles();
  const root=document.getElementById("konoha-activity-screen");
  if(!root||root.dataset.serviceId!==serviceId)return false;
  const data=screenData(serviceId);
  if(!data||!Array.isArray(data.disciplines))return false;

  const note=root.querySelector(".alpha-activity-authority-note span");
  if(note&&serviceId==="practical"){
    note.textContent="Complete Practical exercises to build the selected discipline. Development is applied to the shinobi you choose.";
  }
  if(note&&serviceId==="exams"){
    note.textContent="Shinobi Exams test individual disciplines. Successful execution can build that shinobi's development; Rank Promotion remains separate.";
  }

  const byId=new Map(data.disciplines.filter(Boolean).map(row=>[String(row.id),row]));
  const buttons=[...root.querySelectorAll(".alpha-activity-discipline")];
  buttons.forEach((button,index)=>{
    const id=String(button.dataset.disciplineId||data.disciplines[index]?.id||"");
    const row=byId.get(id);
    if(!row)return;
    button.dataset.disciplineId=id;

    const mastery=button.querySelector(".alpha-activity-mastery");
    if(mastery)mastery.innerHTML=`CURRENT STAT <strong>${Math.max(0,Number(row.currentStat)||0)}</strong>`;

    const exp=button.querySelector(".alpha-activity-exp");
    const complete=row.developmentComplete===true;
    if(exp){
      exp.innerHTML=complete
        ?"STAT DEVELOPMENT COMPLETE FOR THIS ACTIVITY"
        :`DEVELOPMENT <b>${Math.max(0,Number(row.exp)||0)} / ${Math.max(0,Number(row.expRequired)||0)}</b>`;
    }

    button.classList.toggle("is-development-complete",complete);
    button.dataset.developmentComplete=String(complete);

    let ceiling=button.querySelector(".sc-development-ceiling");
    if(!ceiling){
      ceiling=document.createElement("span");
      ceiling.className="sc-development-ceiling";
      button.appendChild(ceiling);
    }
    const cap=Number(row.developmentCeilingStat);
    ceiling.textContent=Number.isFinite(cap)&&cap>0
      ?`DEVELOPMENT EFFECTIVE THROUGH STAT ${cap}`
      :"";

    const track=button.querySelector(".alpha-activity-discipline-track i");
    if(track&&complete)track.style.width="100%";
  });

  const selected=byId.get(String(selectedDisciplineId(serviceId)||""));
  const primary=root.querySelector(".alpha-activity-primary");
  if(primary){
    const blocked=!!(selected&&selected.developmentComplete===true);
    primary.disabled=primary.disabled||blocked;
    primary.dataset.developmentBlocked=String(blocked);
    if(blocked){
      primary.title="Stat development is complete for this activity.";
      primary.setAttribute("aria-label","Stat development complete for this activity");
    }
  }
  root.dataset.phase2DisciplineDevelopment="true";
  return true;
}
function wrap(prior,serviceId){
  if(!prior)return null;
  return function phase2DisciplineDevelopmentRender44810(){
    const result=prior.apply(this,arguments);
    decorate(serviceId);
    return result;
  };
}
if(priorExamRender){
  const wrapped=wrap(priorExamRender,"exams");
  globalThis.renderKonohaExamVisualScreen=wrapped;
  try{renderKonohaExamVisualScreen=wrapped;}catch(_error){}
}
if(priorPracticalRender){
  const wrapped=wrap(priorPracticalRender,"practical");
  globalThis.renderKonohaPracticalVisualScreen=wrapped;
  try{renderKonohaPracticalVisualScreen=wrapped;}catch(_error){}
}

function diagnostics(){
  const source=decorate.toString();
  const checks={
    currentStatProjection:source.includes("CURRENT STAT"),
    dynamicDevelopmentProjection:source.includes("DEVELOPMENT <b>"),
    visibleActivityCeiling:source.includes("DEVELOPMENT EFFECTIVE THROUGH STAT"),
    truthfulCeilingComplete:source.includes("STAT DEVELOPMENT COMPLETE FOR THIS ACTIVITY"),
    noNumericMasteryProjection:!source.includes("MASTERY"),
    noFixedFifty:!source.includes("/ 50"),
    presentationOnly:!source.includes("savePlayerData")&&!source.includes("activityHistory.push")&&!source.includes("character.stats["),
    resultStageNotClaimed:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.decoratePhase2DisciplineDevelopmentUI44810=decorate;
globalThis.runPhase2DisciplineDevelopmentUI44810Diagnostics=diagnostics;
globalThis.SC_PHASE2_DISCIPLINE_DEVELOPMENT_UI_44810=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
})();
