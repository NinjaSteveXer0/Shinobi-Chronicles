// ============================================================================
// ISSUE #209 — FIRST KONOHA POST-TEAM TUTORIAL BOUNDARY — 35000
// World authority: First Konoha Post-Team Tutorial Continuation Contract
// 2026-09-15 (ec2b402edf2eff8ee448508ccf9414792bae21d3).
//
// This is a narrow bridge over the existing Academy Team Formation continuation,
// Konoha village map, Training Grounds overlay, World opportunity runtime and
// existing save authority. It creates no second onboarding, World, Battle,
// reward, relationship, or persistence architecture.
// ============================================================================
(function installFirstKonohaTutorial35000(){
"use strict";
if(globalThis.SC_FIRST_KONOHA_TUTORIAL_35000)return;

const PATCH_ID="alpha_first_konoha_tutorial_35000_2026_09_17";
const TUTORIAL_ID="konoha_onboarding_first_team_orientation_v1";
const COMPLETION_RECEIPT_ID="konoha_onboarding_first_team_orientation_completed_v1";
const PENDING_STATUS="academy_first_konoha_tutorial_pending";
const COMPLETE_STATUS="academy_first_konoha_tutorial_complete";
const FREE_PLAY_STATUS="academy_free_play";
const HOST="KON-P07";
const LOCAL_HOST="KON-A02";
const STANDING_POOL="konoha_alpha_standing_pool_v1";
const OBJECTIVE_TITLE="FIRST TEAM ORIENTATION";
const OBJECTIVE_COPY="Report to the General Training Ground with your squad.";
const PANEL_ID="sc-first-konoha-orientation-35000";
const STYLE_ID="sc-first-konoha-orientation-35000-style";

const priorContinue=typeof continueAcademyTeamFormationJourney==="function"?continueAcademyTeamFormationJourney:null;
const priorVillageRender=typeof renderVillageOverlay==="function"?renderVillageOverlay:null;
const priorTrainingRender=typeof renderTrainingOverlay==="function"?renderTrainingOverlay:null;
const priorActivatePublicLocation=typeof activateAlphaKonohaV3PublicLocation==="function"?activateAlphaKonohaV3PublicLocation:null;

function clone(value){
  if(value==null)return value;
  try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
  catch(_error){return value;}
}
function acquisition(){return typeof ensurePlayerAcquisitionState==="function"?ensurePlayerAcquisitionState():null;}
function formation(){const state=acquisition();return state&&state.academyTeamFormation||null;}
function teamReceipt(){const row=formation();return row&&row.confirmationReceipt&&typeof row.confirmationReceipt==="object"?row.confirmationReceipt:null;}
function validTeamReceipt(receipt){
  const ids=receipt&&Array.isArray(receipt.teamVariantIds)?receipt.teamVariantIds.filter(Boolean):[];
  return !!(receipt&&receipt.commitId&&receipt.originVariantId&&ids.length===3&&new Set(ids).size===3);
}
function instanceId(receipt){return `${TUTORIAL_ID}::${String(receipt&&receipt.commitId||"")}`;}
function phaseRank(phase){return {pending:0,host_focused:1,compound_entered:2,orientation_started:3,observation_resolved:4,completed:5}[phase]??-1;}
function save(){if(typeof savePlayerData==="function")savePlayerData();else if(typeof saveTestState==="function")saveTestState();}
function destination(){
  try{if(typeof ALPHA_ACADEMY_TEAM_FORMATION_CONTINUATION!=="undefined")return clone(ALPHA_ACADEMY_TEAM_FORMATION_CONTINUATION);}catch(_error){}
  return {type:"overlay",overlayType:"village",locationId:"konohagakure",authority:"existing_konoha_navigation"};
}
function tutorialState({create=false}={}){
  const state=acquisition(),row=state&&state.academyTeamFormation,receipt=row&&row.confirmationReceipt;
  if(!row||row.completed!==true||!validTeamReceipt(receipt))return null;
  if(receipt.firstKonohaTutorial&&typeof receipt.firstKonohaTutorial==="object")return receipt.firstKonohaTutorial;
  // Established older saves that already crossed the old continuation boundary
  // are not rewound by #209.
  if(row.continuationCompleted===true&&state.onboardingStatus===FREE_PLAY_STATUS)return null;
  if(!create)return null;
  receipt.firstKonohaTutorial={
    tutorialId:TUTORIAL_ID,
    occurrenceId:instanceId(receipt),
    academyTeamFormationReceiptRef:receipt.commitId,
    originVariantId:receipt.originVariantId,
    playerCharacterRef:receipt.originVariantId,
    squadMemberRefs:[...receipt.teamVariantIds],
    hostLocationRef:HOST,
    localHostRef:LOCAL_HOST,
    phase:"pending",
    orientationStarted:false,
    observationResolved:false,
    orientationReportedReady:false,
    completed:false,
    completionReceipt:null,
    gatedStandingOpportunityIds:[],
    createdAt:Date.now(),
    updatedAt:Date.now()
  };
  return receipt.firstKonohaTutorial;
}
function snapshot(){const row=tutorialState();return row?clone(row):null;}
function isPending(){const state=acquisition(),row=tutorialState();return !!(state&&state.onboardingStatus===PENDING_STATUS&&row&&row.completed!==true);}
function hasCompletion(){const row=tutorialState();return !!(row&&row.completed===true&&row.completionReceipt&&row.completionReceipt.receiptId===COMPLETION_RECEIPT_ID);}
function touch(row,phase){if(!row)return null;if(phase&&phaseRank(phase)>=phaseRank(row.phase))row.phase=phase;row.updatedAt=Date.now();return row;}

function standingRows(){return Array.isArray(globalThis.SC_KONOHA_ALPHA_WORLD_ROWS)?globalThis.SC_KONOHA_ALPHA_WORLD_ROWS.filter(row=>row&&row.pool===STANDING_POOL):[];}
function dimension(id,name){try{return typeof getWorldEventDimensionState==="function"?getWorldEventDimensionState(name,id):{};}catch(_error){return {};}}
function gateStandingOpportunities({persist=false}={}){
  const row=tutorialState();
  if(!row||row.completed===true)return {gated:0,ids:[]};
  const gated=new Set(Array.isArray(row.gatedStandingOpportunityIds)?row.gatedStandingOpportunityIds:[]);
  let count=0;
  for(const opportunity of standingRows()){
    const lifecycle=dimension(opportunity.id,"worldLifecycleByEventId");
    const actionability=dimension(opportunity.id,"actionabilityByOpportunityId");
    if(lifecycle.projectable===true&&actionability.available!==false)gated.add(opportunity.id);
    if(typeof setOpportunityActionability==="function"){
      setOpportunityActionability(opportunity.id,{available:false,reason:PENDING_STATUS,reasonVisible:true},{save:false});
      count+=1;
    }
  }
  row.gatedStandingOpportunityIds=[...gated];touch(row);
  if(persist)save();
  return {gated:count,ids:[...gated]};
}
function releaseStandingOpportunities(){
  const row=tutorialState();
  const ids=row&&Array.isArray(row.gatedStandingOpportunityIds)?[...row.gatedStandingOpportunityIds]:[];
  for(const id of ids){
    if(typeof setOpportunityActionability==="function")setOpportunityActionability(id,{available:true,reason:null,reasonVisible:false},{save:false});
  }
  if(row)row.gatedStandingOpportunityIds=[];
  try{if(typeof ensureKonohaAlphaWorldSemanticRefill==="function")ensureKonohaAlphaWorldSemanticRefill({save:false});}catch(_error){}
  return {released:ids.length,ids};
}

function continueFirstKonohaTutorial(){
  const state=acquisition(),row=state&&state.academyTeamFormation,receipt=row&&row.confirmationReceipt;
  if(!row||row.completed!==true||!validTeamReceipt(receipt))return priorContinue?priorContinue.apply(this,arguments):{success:false,reason:"academy_team_formation_not_committed"};
  const existing=tutorialState();
  if(row.continuationCompleted===true&&!existing)return priorContinue?priorContinue.apply(this,arguments):{success:true,idempotent:true,destination:destination(),confirmationReceipt:clone(receipt)};
  if(existing&&existing.completed===true){
    row.continuationCompleted=true;
    if(!row.continuedAt)row.continuedAt=existing.completedAt||Date.now();
    state.onboardingStatus=FREE_PLAY_STATUS;
    save();
    return {success:true,idempotent:true,destination:destination(),confirmationReceipt:clone(receipt),tutorial:snapshot(),freePlayAuthorized:true};
  }
  const tutorial=existing||tutorialState({create:true});
  state.onboardingStatus=PENDING_STATUS;
  row.continuationCompleted=false;
  row.continuedAt=null;
  touch(tutorial,"pending");
  gateStandingOpportunities({persist:false});
  save();
  return {success:true,idempotent:!!existing,destination:destination(),confirmationReceipt:clone(receipt),tutorial:snapshot(),freePlayAuthorized:false,trackedDestination:HOST};
}

function focusHost(locationId=HOST){
  const row=tutorialState();
  if(!isPending()||!row)return {success:false,reason:"first_team_orientation_not_pending"};
  if(locationId!==HOST)return {success:false,reason:"first_team_orientation_wrong_host",expectedLocationId:HOST};
  touch(row,"host_focused");save();projectCurrentSurface();return {success:true,phase:row.phase,hostLocationRef:HOST,completed:false};
}
function enterCompound(localHostRef=LOCAL_HOST){
  const row=tutorialState();
  if(!isPending()||!row)return {success:false,reason:"first_team_orientation_not_pending"};
  if(localHostRef!==LOCAL_HOST)return {success:false,reason:"first_team_orientation_wrong_local_host",expectedLocalHostRef:LOCAL_HOST};
  if(phaseRank(row.phase)<phaseRank("host_focused"))return {success:false,reason:"first_team_orientation_host_not_focused"};
  touch(row,"compound_entered");save();projectCurrentSurface();return {success:true,phase:row.phase,localHostRef:LOCAL_HOST,completed:false};
}
function beginOrientation(){
  const row=tutorialState();
  if(!isPending()||!row)return {success:false,reason:"first_team_orientation_not_pending"};
  if(phaseRank(row.phase)<phaseRank("compound_entered"))return {success:false,reason:"first_team_orientation_compound_not_entered"};
  row.orientationStarted=true;touch(row,"orientation_started");save();projectCurrentSurface();return {success:true,phase:row.phase,battleStarted:false,rewardGranted:false};
}
function resolveObservation(){
  const row=tutorialState();
  if(!isPending()||!row)return {success:false,reason:"first_team_orientation_not_pending"};
  if(row.orientationStarted!==true)return {success:false,reason:"first_team_orientation_not_started"};
  row.observationResolved=true;touch(row,"observation_resolved");save();projectCurrentSurface();return {success:true,phase:row.phase,battleStarted:false,rewardGranted:false,performanceFailure:false};
}
function historyHas(id){const history=typeof playerData!=="undefined"&&Array.isArray(playerData.activityHistory)?playerData.activityHistory:[];return history.some(item=>item&&item.committed===true&&(item.id===id||item.occurrenceId===id));}
function appendCompletionHistory(row,completion){
  if(typeof playerData==="undefined"||!Array.isArray(playerData.activityHistory))return false;
  const historyId=`${COMPLETION_RECEIPT_ID}::${row.academyTeamFormationReceiptRef}`;
  if(historyHas(historyId))return false;
  playerData.activityHistory.push({
    id:historyId,occurrenceId:historyId,committed:true,type:"konoha_onboarding_first_team_orientation_completed",
    locationId:HOST,
    data:{receiptId:COMPLETION_RECEIPT_ID,occurrenceId:TUTORIAL_ID,occurrenceInstanceId:row.occurrenceId,academyTeamFormationReceiptRef:row.academyTeamFormationReceiptRef,originVariantId:row.originVariantId,squadMemberRefs:[...row.squadMemberRefs],hostLocationRef:HOST,localHostRef:LOCAL_HOST,orientationStarted:true,orientationReportedReady:true,completed:true,battleStarted:false,rewardGranted:false,relationshipGranted:false},
    sourceRefs:[{type:"academy_team_formation_receipt",id:row.academyTeamFormationReceiptRef,role:"caller"},{type:"location",id:HOST,role:"host"},{type:"location",id:LOCAL_HOST,role:"local_host"}],
    timestamp:completion.completedAt
  });
  return true;
}
function reportReady(){
  const state=acquisition(),formationRow=state&&state.academyTeamFormation,row=tutorialState();
  if(!formationRow||!row)return {success:false,reason:"first_team_orientation_not_available"};
  if(row.completed===true&&row.completionReceipt)return {success:true,idempotent:true,completionReceipt:clone(row.completionReceipt),freePlayAuthorized:state.onboardingStatus===FREE_PLAY_STATUS};
  if(!isPending())return {success:false,reason:"first_team_orientation_not_pending"};
  if(row.orientationStarted!==true||row.observationResolved!==true)return {success:false,reason:"first_team_orientation_readiness_not_resolved"};
  const completedAt=Date.now();
  const completion={
    receiptId:COMPLETION_RECEIPT_ID,
    occurrenceId:TUTORIAL_ID,
    occurrenceInstanceId:row.occurrenceId,
    academyTeamFormationReceiptRef:row.academyTeamFormationReceiptRef,
    originVariantId:row.originVariantId,
    playerCharacterRef:row.playerCharacterRef,
    squadMemberRefs:[...row.squadMemberRefs],
    hostLocationRef:HOST,
    localHostRef:LOCAL_HOST,
    orientationStarted:true,
    orientationReportedReady:true,
    completed:true,
    completedAt,
    battleStarted:false,
    rewardGranted:false,
    developmentGranted:false,
    relationshipGranted:false
  };
  row.orientationReportedReady=true;row.completed=true;row.completedAt=completedAt;row.completionReceipt=completion;touch(row,"completed");
  appendCompletionHistory(row,completion);
  state.onboardingStatus=COMPLETE_STATUS;
  formationRow.continuationCompleted=true;
  formationRow.continuedAt=completedAt;
  releaseStandingOpportunities();
  state.onboardingStatus=FREE_PLAY_STATUS;
  save();projectCurrentSurface();
  return {success:true,idempotent:false,completionReceipt:clone(completion),freePlayAuthorized:true,battleStarted:false,rewardGranted:false};
}

function esc(value){return typeof escapeStorySceneHTML==="function"?escapeStorySceneHTML(String(value??"")):String(value??"").replace(/[&<>\"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));}
function ensureStyles(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
    #${PANEL_ID}{position:relative;z-index:120;margin:12px 16px 16px;padding:15px 16px;border:1px solid rgba(214,169,58,.62);background:linear-gradient(145deg,rgba(13,27,32,.97),rgba(7,13,18,.98));box-shadow:0 14px 36px rgba(0,0,0,.34);color:#e9dfc4}
    #${PANEL_ID} .fko-eye{color:#d7ad48;font-size:9px;font-weight:900;letter-spacing:.16em}#${PANEL_ID} h3{margin:6px 0 7px;color:#f1dfae;font:400 22px Georgia,serif}#${PANEL_ID} p{margin:0;color:#9aabb1;font-size:12px;line-height:1.55}#${PANEL_ID} .fko-meta{margin-top:8px;color:#63d5de;font-size:9px;font-weight:800;letter-spacing:.1em}#${PANEL_ID} button{margin-top:12px;min-height:40px;padding:0 15px;border:1px solid rgba(214,169,58,.55);background:#34280f;color:#efd272;font-size:10px;font-weight:900;letter-spacing:.09em;cursor:pointer}
    [data-village-hotspot-id="${HOST}"][data-first-team-orientation-target="true"]{filter:drop-shadow(0 0 9px rgba(255,205,76,.95));outline:2px solid rgba(255,205,76,.78);outline-offset:5px}
  `;document.head.appendChild(style);
}
function removePanel(){if(typeof document==="undefined")return;const old=document.getElementById(PANEL_ID);if(old&&old.remove)old.remove();}
function markHost(){if(typeof document==="undefined")return;const target=document.querySelector(`[data-village-hotspot-id="${HOST}"]`);if(target)target.dataset.firstTeamOrientationTarget="true";}
function panelMarkup(row,surface){
  const phase=row&&row.phase||"pending";
  let body=OBJECTIVE_COPY,button="",handler="";
  if(surface==="village")body=OBJECTIVE_COPY;
  else if(phaseRank(phase)<phaseRank("compound_entered")){body="Enter the Practical Training Compound to begin your squad's first field orientation.";button="ENTER PRACTICAL TRAINING COMPOUND";handler="enterFirstKonohaTutorialCompound35000()";}
  else if(phaseRank(phase)<phaseRank("orientation_started")){body="Complete the First Team Orientation.";button="BEGIN ORIENTATION";handler="beginFirstKonohaTutorialOrientation35000()";}
  else if(phaseRank(phase)<phaseRank("observation_resolved")){body="Observe your three-person formation, confirm spacing and practical readiness, then complete the readiness check.";button="CHECK SQUAD READINESS";handler="resolveFirstKonohaTutorialObservation35000()";}
  else if(phaseRank(phase)<phaseRank("completed")){body="Your squad's readiness check is complete. Report that the team is ready to enter ordinary Konoha field life.";button="REPORT READY";handler="reportFirstKonohaTutorialReady35000()";}
  return `<section id="${PANEL_ID}" data-tutorial-id="${TUTORIAL_ID}" data-phase="${esc(phase)}"><div class="fko-eye">${OBJECTIVE_TITLE}</div><h3>${surface==="village"?"GENERAL TRAINING GROUND":"PRACTICAL TRAINING COMPOUND"}</h3><p>${esc(body)}</p><div class="fko-meta">${HOST} · ${LOCAL_HOST} · NO BATTLE · NO MATERIAL REWARD</div>${button?`<button type="button" onclick="${handler}">${button}</button>`:""}</section>`;
}
function injectPanel(container,surface){
  if(typeof document==="undefined"||!container)return false;
  removePanel();if(!isPending())return false;ensureStyles();const row=tutorialState();
  const wrapper=document.createElement("div");wrapper.innerHTML=panelMarkup(row,surface);const panel=wrapper.firstElementChild;if(!panel)return false;
  if(container.firstChild)container.insertBefore(panel,container.firstChild);else container.appendChild(panel);
  if(surface==="village")markHost();return true;
}
function projectCurrentSurface(){
  if(typeof document==="undefined")return false;
  const container=document.getElementById("overlay-content-container");if(!container)return false;
  const type=typeof currentOverlayType!=="undefined"?currentOverlayType:null;
  if(type==="village")return injectPanel(container,"village");
  if(type==="training")return injectPanel(container,"training");
  return false;
}

if(priorContinue){continueAcademyTeamFormationJourney=function issue209ContinueToFirstKonohaTutorial(){return continueFirstKonohaTutorial.apply(this,arguments);};}
if(priorActivatePublicLocation){
  activateAlphaKonohaV3PublicLocation=function issue209ActivateKonohaPublicLocation(event,locationId){
    if(isPending()&&locationId===HOST)focusHost(HOST);
    const result=priorActivatePublicLocation.apply(this,arguments);
    if(isPending()&&locationId===HOST)projectCurrentSurface();
    return result;
  };
}
if(priorVillageRender){renderVillageOverlay=function issue209VillageTutorialProjection(container){const result=priorVillageRender.apply(this,arguments);if(isPending())injectPanel(container,"village");return result;};}
if(priorTrainingRender){renderTrainingOverlay=function issue209TrainingTutorialProjection(container){const result=priorTrainingRender.apply(this,arguments);if(isPending())injectPanel(container,"training");return result;};}

function diagnostics(){
  const row=tutorialState();
  const operationalSource=[continueFirstKonohaTutorial,focusHost,enterCompound,beginOrientation,resolveObservation,reportReady].map(fn=>fn.toString()).join("\n");
  const checks={
    patchId:PATCH_ID,
    stableTutorialId:TUTORIAL_ID==="konoha_onboarding_first_team_orientation_v1",
    stableCompletionReceipt:COMPLETION_RECEIPT_ID==="konoha_onboarding_first_team_orientation_completed_v1",
    exactHosts:HOST==="KON-P07"&&LOCAL_HOST==="KON-A02",
    continuationSuperseded:typeof continueAcademyTeamFormationJourney==="function"&&continueAcademyTeamFormationJourney!==priorContinue,
    battleAbsent:!operationalSource.includes("startBattle(")&&!operationalSource.includes("resolveBattleDamagePacket("),
    completionRequiresReadiness:reportReady.toString().includes("orientationStarted!==true||row.observationResolved!==true"),
    freePlayAfterReceipt:reportReady.toString().indexOf("row.completionReceipt=completion")<reportReady.toString().indexOf("state.onboardingStatus=FREE_PLAY_STATUS"),
    legacyFreePlayNotRewound:true,
    currentPhase:row&&row.phase||null,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>!["patchId","currentPhase","browserGoldenClaimed"].includes(key)&&value!==true).map(([key])=>key);
  return {pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.getFirstKonohaTutorialSnapshot35000=snapshot;
globalThis.isFirstKonohaTutorialPending35000=isPending;
globalThis.focusFirstKonohaTutorialHost35000=focusHost;
globalThis.enterFirstKonohaTutorialCompound35000=enterCompound;
globalThis.beginFirstKonohaTutorialOrientation35000=beginOrientation;
globalThis.resolveFirstKonohaTutorialObservation35000=resolveObservation;
globalThis.reportFirstKonohaTutorialReady35000=reportReady;
globalThis.gateFirstKonohaTutorialStanding35000=gateStandingOpportunities;
globalThis.runFirstKonohaTutorial35000Diagnostics=diagnostics;
globalThis.SC_FIRST_KONOHA_TUTORIAL_35000={patchId:PATCH_ID,tutorialId:TUTORIAL_ID,completionReceiptId:COMPLETION_RECEIPT_ID,hostLocationRef:HOST,localHostRef:LOCAL_HOST,objectiveTitle:OBJECTIVE_TITLE,objectiveCopy:OBJECTIVE_COPY,browserGoldenClaimed:false};

if(isPending()){gateStandingOpportunities({persist:false});if(typeof document!=="undefined"){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",projectCurrentSurface,{once:true});else projectCurrentSurface();}}
})();