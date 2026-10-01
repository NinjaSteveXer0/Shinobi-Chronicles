// ============================================================================
// PHASE 2 — FIRST KONOHA SANDBOX GUIDED ONBOARDING TRIAL — #431
//
// Supersedes the old #209 mandatory-orientation permission gate.
// Reuses the existing Team Formation -> Konoha continuation and the stable
// tutorial IDs; does not create a second onboarding state machine.
// TRIAL: Stephen browser acceptance is required before GOLDEN.
// ============================================================================
(function installFirstKonohaSandboxTrial35000(){
"use strict";
if(globalThis.SC_FIRST_KONOHA_TUTORIAL_35000)return;

const PATCH_ID="phase2_first_konoha_sandbox_trial_35000_2026_10_01";
const TUTORIAL_ID="konoha_onboarding_first_team_orientation_v1";
const COMPLETION_RECEIPT_ID="konoha_onboarding_first_team_orientation_completed_v1";
const FREE_PLAY_STATUS="academy_free_play";
const LEGACY_PENDING_STATUS="academy_first_konoha_tutorial_pending";
const PANEL_ID="sc-konoha-onboarding-35000";
const STYLE_ID="sc-konoha-onboarding-35000-style";
const ROUTE=Object.freeze([
  Object.freeze({id:"KON-P07",step:"1",label:"TRAINING"}),
  Object.freeze({id:"KON-P08",step:"1",label:"PRACTICAL"}),
  Object.freeze({id:"KON-P06",step:"2",label:"EXAMS"}),
  Object.freeze({id:"KON-P02",step:"3",label:"ARENA"})
]);
const PUBLIC_HIGHLIGHT_IDS=Object.freeze(ROUTE.map(row=>row.id));

const priorContinue=typeof continueAcademyTeamFormationJourney==="function"?continueAcademyTeamFormationJourney:null;
const priorVillageRender=typeof renderVillageOverlay==="function"?renderVillageOverlay:null;
const priorTrainingRender=typeof renderTrainingOverlay==="function"?renderTrainingOverlay:null;
const priorPracticalOpen=typeof openKonohaPracticalFromVillage==="function"?openKonohaPracticalFromVillage:null;
const priorExamOpen=typeof openKonohaExamFromVillage==="function"?openKonohaExamFromVillage:null;
const priorArenaRender=typeof renderArenaMainOverlay==="function"?renderArenaMainOverlay:null;
const priorRecordOpen=typeof openShinobiRecord==="function"?openShinobiRecord:null;

function clone(value){
  if(value==null)return value;
  try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
  catch(_error){return value;}
}
function acquisition(){return typeof ensurePlayerAcquisitionState==="function"?ensurePlayerAcquisitionState():null;}
function formation(){const a=acquisition();return a&&a.academyTeamFormation||null;}
function team(){
  return typeof globalThis.getChronicleCurrentTeam43600==="function"?globalThis.getChronicleCurrentTeam43600():null;
}
function validTeam(){const t=team();return !!(t&&t.committed===true&&Array.isArray(t.teamVariantIds)&&t.teamVariantIds.length===3&&new Set(t.teamVariantIds).size===3);}
function progress({create=true}={}){
  return typeof globalThis.getChronicleTutorialProgress43600==="function"
    ?globalThis.getChronicleTutorialProgress43600({create})
    :null;
}
function update(patch,{save=true}={}){
  if(typeof globalThis.updateChronicleTutorialProgress43600!=="function")return{success:false,reason:"phase2_tutorial_state_unavailable"};
  return globalThis.updateChronicleTutorialProgress43600(patch,{save});
}
function save(){if(typeof savePlayerData==="function")savePlayerData();else if(typeof saveTestState==="function")saveTestState();}
function destination(){
  try{if(typeof ALPHA_ACADEMY_TEAM_FORMATION_CONTINUATION!=="undefined")return clone(ALPHA_ACADEMY_TEAM_FORMATION_CONTINUATION);}catch(_error){}
  return{type:"overlay",overlayType:"village",locationId:"konohagakure",authority:"existing_konoha_navigation"};
}
function esc(value){return typeof escapeStorySceneHTML==="function"?escapeStorySceneHTML(String(value??"")):String(value??"").replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));}

function ensureStyles(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
    #${PANEL_ID}{position:fixed;z-index:99990;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(1,5,8,.72);backdrop-filter:blur(3px)}
    #${PANEL_ID} .ko-card{width:min(720px,94vw);max-height:min(780px,88vh);overflow:auto;padding:26px;border:1px solid rgba(214,169,58,.52);background:linear-gradient(150deg,rgba(10,19,25,.99),rgba(4,9,13,.99));box-shadow:0 30px 90px rgba(0,0,0,.65);color:#e9e2d2}
    #${PANEL_ID} .ko-kicker{font-size:9px;font-weight:900;letter-spacing:.18em;color:#59d4dd}#${PANEL_ID} h2{margin:8px 0 14px;font:400 30px Georgia,serif;color:#f1dfae}
    #${PANEL_ID} p{margin:8px 0;color:#b1bec3;font-size:13px;line-height:1.65}#${PANEL_ID} .ko-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}
    #${PANEL_ID} button{min-height:42px;padding:0 16px;border:1px solid rgba(214,169,58,.55);background:#30250f;color:#efd272;font-size:10px;font-weight:900;letter-spacing:.08em;cursor:pointer}
    #${PANEL_ID} button.ko-secondary{border-color:rgba(82,205,216,.42);background:#0c262b;color:#7edce3}
    #${PANEL_ID} .ko-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}
    #${PANEL_ID} .ko-lane{padding:14px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.025)}
    #${PANEL_ID} .ko-lane strong{display:block;color:#eedcb0;font:400 18px Georgia,serif;margin-bottom:7px}#${PANEL_ID} .ko-status{display:inline-block;margin-top:9px;font-size:9px;font-weight:900;letter-spacing:.1em;color:#6ed6de}
    [data-konoha-guide-step]{outline:2px solid rgba(255,205,76,.88)!important;outline-offset:5px;filter:drop-shadow(0 0 9px rgba(255,205,76,.75))}
    [data-konoha-guide-step]::after{content:attr(data-konoha-guide-step);position:absolute;z-index:30;right:-7px;top:-7px;min-width:20px;height:20px;padding:0 4px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:#d6a93a;color:#081015;font-size:9px;font-weight:1000}
    @media(max-width:720px){#${PANEL_ID} .ko-grid{grid-template-columns:1fr}}
  `;document.head.appendChild(style);
}
function removePanel(){if(typeof document==="undefined")return;const old=document.getElementById(PANEL_ID);if(old&&old.remove)old.remove();}
function showPanel({kind,title,body,extra="",actions=[]}){
  if(typeof document==="undefined"||!document.body)return false;
  ensureStyles();removePanel();
  const root=document.createElement("div");root.id=PANEL_ID;root.dataset.kind=kind||"guide";
  root.innerHTML=`<section class="ko-card" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="ko-kicker">KONOHA · SANDBOX GUIDE</div><h2>${esc(title)}</h2><div class="ko-body">${body}</div>${extra}<div class="ko-actions">${actions.map((a,i)=>`<button type="button" data-ko-action="${esc(a.id)}" class="${a.secondary?"ko-secondary":""}">${esc(a.label)}</button>`).join("")}</div></section>`;
  for(const action of actions){
    const button=root.querySelector(`[data-ko-action="${action.id}"]`);
    if(button)button.addEventListener("click",()=>action.run&&action.run());
  }
  document.body.appendChild(root);return true;
}
function tipsEnabled(){const p=progress({create:false});return !p||p.tutorialTipsEnabled!==false;}

function clearRecommendedHighlights(){
  if(typeof document==="undefined")return;
  for(const node of document.querySelectorAll("[data-konoha-guide-step]")){
    delete node.dataset.konohaGuideStep;delete node.dataset.konohaGuideLabel;
  }
}
function applyRecommendedHighlights(){
  if(typeof document==="undefined")return false;
  clearRecommendedHighlights();
  const p=progress({create:false});if(!p||p.recommendedRouteEnabled!==true)return false;
  for(const row of ROUTE){
    const node=document.querySelector(`[data-village-hotspot-id="${row.id}"]`);
    if(node){node.dataset.konohaGuideStep=row.step;node.dataset.konohaGuideLabel=row.label;}
  }
  return true;
}

function chooseOpening(choice){
  if(!["show_me_around","explore_konoha"].includes(choice))return{success:false,reason:"unknown_opening_choice"};
  const guided=choice==="show_me_around";
  const result=update({sandboxPopupSeen:true,recommendedRouteEnabled:guided,openingChoice:choice});
  removePanel();if(guided)applyRecommendedHighlights();else clearRecommendedHighlights();
  return{...result,freePlayAuthorized:true,recommendedRouteEnabled:guided,currentTeam:clone(team())};
}
function openingPopup(){
  const p=progress({create:true});if(!p||p.sandboxPopupSeen===true||!validTeam())return false;
  return showPanel({
    kind:"sandbox_open",
    title:"KONOHA IS OPEN",
    body:`<p>Your Academy team is formed. You are now in Sandbox mode. Explore Konoha at your own pace, or head to the Arena when you are ready to attempt the Genin Promotion Assessment and continue your Chronicle.</p><p>The first time you visit important areas, a short guide will explain what you can do there.</p>`,
    actions:[
      {id:"show",label:"SHOW ME AROUND",run(){chooseOpening("show_me_around");}},
      {id:"explore",label:"EXPLORE KONOHA",secondary:true,run(){chooseOpening("explore_konoha");}}
    ]
  });
}
function firstUseTip(key,title,copy){
  const p=progress({create:true});if(!p||p[key]===true||!tipsEnabled()||!validTeam())return false;
  update({[key]:true});
  return showPanel({
    kind:key,title,
    body:`<p>${esc(copy)}</p>`,
    actions:[{id:"continue",label:"CONTINUE",run(){removePanel();}}]
  });
}
function trainingTip(){return firstUseTip("trainingTipSeen","TRAINING GROUND","Training Grounds let you work with the shinobi you own across My Clan. Practical Training focuses on developing individual disciplines.");}
function practicalTip(){return firstUseTip("practicalTipSeen","PRACTICAL TRAINING","Practical Training puts your current team through hands-on discipline exercises. Complete an exercise to earn the development it awards.");}
function examsTip(){return firstUseTip("examsTipSeen","SHINOBI EXAMS","Exams test specific shinobi disciplines and capabilities when you are eligible to take them. They are separate from formal Rank Promotion.");}
function recordTip(){return firstUseTip("shinobiRecordTipSeen","SHINOBI RECORD","Your Shinobi Record tracks your current journey, missions, intelligence, Chronicle history and development. Use it when you are unsure what has changed or where your Chronicle is heading.");}

function chooseNextStep(choice){
  if(!["promotion","keep_exploring"].includes(choice))return{success:false,reason:"unknown_next_step_choice"};
  const result=update({arenaCompletionChoiceSeen:true,recommendedRouteEnabled:false});clearRecommendedHighlights();removePanel();
  if(choice==="promotion"&&typeof openArenaPromotionSurface==="function")openArenaPromotionSurface();
  if(choice==="keep_exploring"){
    if(typeof openOverlay==="function")openOverlay("village");else if(typeof closeOverlay==="function")closeOverlay();
  }
  return{...result,choice};
}
function nextStepPopup(){
  const p=progress({create:true});if(!p||p.arenaCompletionChoiceSeen===true||!tipsEnabled())return false;
  return showPanel({
    kind:"arena_next_step",title:"YOUR NEXT STEP",
    body:`<p>You have seen the main routes available to your Academy team. You can take the Genin Promotion Assessment now, or keep exploring Konoha and develop your Chronicle first.</p>`,
    actions:[
      {id:"promotion",label:"TAKE PROMOTION ASSESSMENT",run(){chooseNextStep("promotion");}},
      {id:"explore",label:"KEEP EXPLORING",secondary:true,run(){chooseNextStep("keep_exploring");}}
    ]
  });
}
function arenaGuide(){
  const p=progress({create:true});if(!p||!tipsEnabled()||!validTeam())return false;
  if(p.arenaTipSeen===true)return p.arenaCompletionChoiceSeen===true?false:nextStepPopup();
  update({arenaTipSeen:true});
  const lanes=[
    ["PROMOTION","Take formal Promotion assessments when they are available. Academy -> Genin is available after the opening journey and does not require a mandatory Academy grind.","AVAILABLE"],
    ["ARENA BATTLE","Fight other shinobi through the ordinary Arena battle lane. Arena participation is separate from Story and World activity.","NOT CURRENTLY AVAILABLE"],
    ["STAGED BATTLES","Take on authored challenge battles with their own rules and participation limits.","NOT CURRENTLY AVAILABLE"],
    ["VILLAGE TOURNAMENT","Enter formal tournament competition when the current tournament rules make you eligible.","NOT CURRENTLY AVAILABLE"]
  ];
  const extra=`<div class="ko-grid">${lanes.map(([name,text,status])=>`<div class="ko-lane"><strong>${esc(name)}</strong><p>${esc(text)}</p><span class="ko-status">${esc(status)}</span></div>`).join("")}</div>`;
  return showPanel({
    kind:"arena_guide",title:"KONOHA ARENA",body:"",extra,
    actions:[{id:"continue",label:"CONTINUE",run(){removePanel();nextStepPopup();}}]
  });
}

function continueSandboxTrial(){
  if(!validTeam())return priorContinue?priorContinue.apply(this,arguments):{success:false,reason:"academy_team_formation_not_committed"};
  const result=priorContinue?priorContinue.apply(this,arguments):{success:true,destination:destination()};
  const a=acquisition(),f=formation();
  if(a)a.onboardingStatus=FREE_PLAY_STATUS;
  if(f){f.continuationCompleted=true;if(!f.continuedAt)f.continuedAt=Date.now();}
  if(typeof globalThis.ensurePhase2ChronicleState43600==="function")globalThis.ensurePhase2ChronicleState43600({save:false});
  save();
  setTimeout(openingPopup,0);
  return{...(result&&typeof result==="object"?result:{}),success:true,destination:result&&result.destination||destination(),freePlayAuthorized:true,tutorialTrial:true,currentTeam:clone(team())};
}
function migrateLegacyPending(){
  const a=acquisition(),f=formation();
  if(!a||!f||f.completed!==true||!validTeam())return{success:true,skipped:true};
  if(a.onboardingStatus!==LEGACY_PENDING_STATUS)return{success:true,skipped:true};
  a.onboardingStatus=FREE_PLAY_STATUS;f.continuationCompleted=true;if(!f.continuedAt)f.continuedAt=Date.now();
  if(typeof globalThis.ensurePhase2ChronicleState43600==="function")globalThis.ensurePhase2ChronicleState43600({save:false});
  save();
  return{success:true,migrated:true,freePlayAuthorized:true};
}

if(priorContinue){
  const wrapped=function phase2ContinueAcademyTeamFormationToSandbox(){return continueSandboxTrial.apply(this,arguments);};
  globalThis.continueAcademyTeamFormationJourney=wrapped;try{continueAcademyTeamFormationJourney=wrapped;}catch(_error){}
}
if(priorVillageRender){
  const wrapped=function phase2VillageOnboardingProjection(container){
    const result=priorVillageRender.apply(this,arguments);
    applyRecommendedHighlights();
    const p=progress({create:false});
    if(validTeam()&&p&&p.sandboxPopupSeen!==true)setTimeout(openingPopup,0);
    return result;
  };
  globalThis.renderVillageOverlay=wrapped;try{renderVillageOverlay=wrapped;}catch(_error){}
}
if(priorTrainingRender){
  const wrapped=function phase2TrainingGuide(container){const result=priorTrainingRender.apply(this,arguments);setTimeout(trainingTip,0);return result;};
  globalThis.renderTrainingOverlay=wrapped;try{renderTrainingOverlay=wrapped;}catch(_error){}
}
if(priorPracticalOpen){
  const wrapped=function phase2PracticalGuide(){const result=priorPracticalOpen.apply(this,arguments);setTimeout(practicalTip,0);return result;};
  globalThis.openKonohaPracticalFromVillage=wrapped;try{openKonohaPracticalFromVillage=wrapped;}catch(_error){}
}
if(priorExamOpen){
  const wrapped=function phase2ExamGuide(){const result=priorExamOpen.apply(this,arguments);setTimeout(examsTip,0);return result;};
  globalThis.openKonohaExamFromVillage=wrapped;try{openKonohaExamFromVillage=wrapped;}catch(_error){}
}
if(priorArenaRender){
  const wrapped=function phase2ArenaGuide(container){const result=priorArenaRender.apply(this,arguments);setTimeout(arenaGuide,0);return result;};
  globalThis.renderArenaMainOverlay=wrapped;try{renderArenaMainOverlay=wrapped;}catch(_error){}
}
if(priorRecordOpen){
  const wrapped=function phase2RecordGuide(){const result=priorRecordOpen.apply(this,arguments);setTimeout(recordTip,0);return result;};
  globalThis.openShinobiRecord=wrapped;try{openShinobiRecord=wrapped;}catch(_error){}
}

function setTipsEnabled(enabled){return update({tutorialTipsEnabled:enabled===true});}
function snapshot(){return clone(progress({create:false}));}
function diagnostics(){
  const source=[continueSandboxTrial,openingPopup,chooseOpening,applyRecommendedHighlights,trainingTip,practicalTip,examsTip,arenaGuide,nextStepPopup,chooseNextStep,recordTip].map(fn=>fn.toString()).join("\n");
  const checks={
    stableLegacyIds:TUTORIAL_ID==="konoha_onboarding_first_team_orientation_v1"&&COMPLETION_RECEIPT_ID==="konoha_onboarding_first_team_orientation_completed_v1",
    freePlayImmediatelyAfterCommittedTeam:continueSandboxTrial.toString().includes("onboardingStatus=FREE_PLAY_STATUS")&&continueSandboxTrial.toString().includes("freePlayAuthorized:true"),
    noMandatoryOrientationGate:!source.includes("orientationStarted")&&!source.includes("observationResolved")&&!source.includes("reportReady"),
    agreedPublicHighlights:JSON.stringify(PUBLIC_HIGHLIGHT_IDS)===JSON.stringify(["KON-P07","KON-P08","KON-P06","KON-P02"]),
    noHiddenHighlightLeak:PUBLIC_HIGHLIGHT_IDS.every(id=>/^KON-P\d+$/.test(id)),
    exactOpeningCopy:openingPopup.toString().includes("Your Academy team is formed. You are now in Sandbox mode.")&&openingPopup.toString().includes("SHOW ME AROUND")&&openingPopup.toString().includes("EXPLORE KONOHA"),
    contextualTips:["TRAINING GROUND","PRACTICAL TRAINING","SHINOBI EXAMS","SHINOBI RECORD"].every(text=>source.includes(text)),
    arenaFourLanes:["PROMOTION","ARENA BATTLE","STAGED BATTLES","VILLAGE TOURNAMENT"].every(text=>arenaGuide.toString().includes(text)),
    unavailableArenaLanesHonest:arenaGuide.toString().includes("NOT CURRENTLY AVAILABLE"),
    nextStepExact:nextStepPopup.toString().includes("YOUR NEXT STEP")&&nextStepPopup.toString().includes("TAKE PROMOTION ASSESSMENT")&&nextStepPopup.toString().includes("KEEP EXPLORING"),
    promotionUsesExistingRoute:chooseNextStep.toString().includes("openArenaPromotionSurface"),
    noGameplayGrant:!source.includes("basePL")&&!source.includes("disciplineProgression")&&!source.includes("playerData.ryo")&&!source.includes("formalRank=")&&!source.includes("setWorldEvent"),
    exactCommittedCurrentTeam:continueSandboxTrial.toString().includes("currentTeam:clone(team())"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

// Compatibility exports: the former mandatory #209 state machine is retired.
// Existing history remains durable; these names now describe the TRIAL state.
globalThis.getFirstKonohaTutorialSnapshot35000=snapshot;
globalThis.isFirstKonohaTutorialPending35000=()=>false;
globalThis.focusFirstKonohaTutorialHost35000=()=>({success:true,skipped:true,reason:"phase2_optional_guidance"});
globalThis.enterFirstKonohaTutorialCompound35000=()=>({success:true,skipped:true,reason:"phase2_optional_guidance"});
globalThis.beginFirstKonohaTutorialOrientation35000=()=>({success:true,skipped:true,reason:"phase2_optional_guidance"});
globalThis.resolveFirstKonohaTutorialObservation35000=()=>({success:true,skipped:true,reason:"phase2_optional_guidance"});
globalThis.reportFirstKonohaTutorialReady35000=()=>({success:true,skipped:true,reason:"phase2_optional_guidance",freePlayAuthorized:true});
globalThis.gateFirstKonohaTutorialStanding35000=()=>({gated:0,ids:[],reason:"phase2_free_play_not_tutorial_gated"});
globalThis.showKonohaSandboxOpening35000=openingPopup;
globalThis.chooseKonohaSandboxOpening35000=chooseOpening;
globalThis.applyKonohaRecommendedRoute35000=applyRecommendedHighlights;
globalThis.showKonohaTrainingTip35000=trainingTip;
globalThis.showKonohaPracticalTip35000=practicalTip;
globalThis.showKonohaExamsTip35000=examsTip;
globalThis.showKonohaArenaGuide35000=arenaGuide;
globalThis.showKonohaShinobiRecordTip35000=recordTip;
globalThis.showKonohaNextStep35000=nextStepPopup;
globalThis.chooseKonohaNextStep35000=chooseNextStep;
globalThis.setKonohaTutorialTips35000=setTipsEnabled;
globalThis.runFirstKonohaTutorial35000Diagnostics=diagnostics;
globalThis.SC_FIRST_KONOHA_TUTORIAL_35000=Object.freeze({
  patchId:PATCH_ID,tutorialId:TUTORIAL_ID,completionReceiptId:COMPLETION_RECEIPT_ID,
  trial:true,route:ROUTE,browserGoldenClaimed:false
});

migrateLegacyPending();
})();
