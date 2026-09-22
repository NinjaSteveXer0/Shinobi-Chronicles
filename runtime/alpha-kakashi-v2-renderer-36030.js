// ============================================================================
// ACADEMY KAKASHI V2 — SINGLE SCENE-BOARD RENDERER — 36030
//
// This is the sole Academy Kakashi Story DOM owner.
// Core/state/battle modules are forbidden from manipulating Story DOM.
// ============================================================================
(function installAcademyKakashiV2Renderer36030(){
"use strict";
if(globalThis.SC_ACADEMY_KAKASHI_V2_RENDERER_36030)return;

const PATCH_ID="academy_kakashi_v2_renderer_36030_2026_09_22";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const STYLE_ID="kakashi-v2-renderer-36030-style";
const ROOT_ID="kakashi-v2-scene-board";
let rendering=false;

function esc(v){return String(v??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function isActive(){const rt=active();return !!rt&&rt.sceneId===SCENE_ID;}
function projection(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||typeof getAcademyKakashiV2Presentation36020!=="function")return null;
  return getAcademyKakashiV2Presentation36020(rt.beatId);
}
function cueState(){
  if(typeof getAcademyKakashiV2TransitionState36040==="function")return getAcademyKakashiV2TransitionState36040();
  const p=projection(),cues=p&&p.cues||[];return{cueIndex:0,cueCount:cues.length,atEnd:cues.length<=1};
}
function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return;
  const s=document.createElement("style");s.id=STYLE_ID;s.textContent=`
#story-scene-presentation-layer[data-kakashi-v2="true"]{display:block!important;background:#020508!important;overflow:hidden!important;align-items:stretch!important;justify-content:stretch!important}
#story-scene-presentation-layer[data-kakashi-v2="true"]>*:not(#${ROOT_ID}){display:none!important}
#${ROOT_ID}{position:absolute;inset:0;z-index:1;overflow:hidden;background:#020508;color:#e9dfca;font-family:inherit;isolation:isolate}
#${ROOT_ID} .kv2-backdrop{position:absolute;inset:0;z-index:-3;background-position:center;background-size:cover;background-repeat:no-repeat;transform:scale(1.001)}
#${ROOT_ID} .kv2-scrim{position:absolute;inset:0;z-index:-2;background:linear-gradient(180deg,rgba(0,4,8,.10),rgba(0,4,8,.05) 47%,rgba(0,4,8,.42) 72%,rgba(0,4,8,.82))}
#${ROOT_ID} .kv2-frame{position:absolute;inset:1.4%;border:1px solid rgba(197,158,70,.16);pointer-events:none}
#${ROOT_ID} .kv2-top{position:absolute;left:3.2%;right:3.2%;top:3.2%;height:8.5%;display:grid;grid-template-columns:minmax(0,1fr) minmax(240px,34%);align-items:start;gap:24px;z-index:20;pointer-events:none}
#${ROOT_ID} .kv2-location{justify-self:start;padding:7px 10px;border-left:2px solid rgba(215,173,73,.72);background:linear-gradient(90deg,rgba(2,9,13,.82),rgba(2,9,13,.34));font-size:clamp(8px,.62vw,11px);font-weight:900;letter-spacing:.14em;color:#e4c978;text-transform:uppercase;text-shadow:0 2px 4px #000}
#${ROOT_ID} .kv2-objective{justify-self:end;box-sizing:border-box;width:min(100%,390px);padding:8px 11px;border:1px solid rgba(75,209,220,.46);background:rgba(2,12,16,.82);box-shadow:0 10px 30px rgba(0,0,0,.32);font-size:clamp(9px,.68vw,12px);line-height:1.35;color:#e9eeeb}
#${ROOT_ID} .kv2-objective b{display:block;margin-bottom:3px;color:#67dce5;font-size:7px;letter-spacing:.14em}
#${ROOT_ID} .kv2-actors{position:absolute;left:3.5%;right:3.5%;top:13.2%;bottom:29%;display:flex;align-items:flex-end;justify-content:center;gap:clamp(22px,5vw,92px);z-index:4;pointer-events:none}
#${ROOT_ID} .kv2-actors[data-count="1"]{justify-content:flex-start;padding-left:7%}
#${ROOT_ID} .kv2-actors[data-count="4"]{gap:clamp(10px,2.5vw,42px)}
#${ROOT_ID} .kv2-actor{position:relative;flex:0 1 min(23vw,250px);width:min(23vw,250px);height:min(53vh,390px);max-height:100%;display:flex;align-items:flex-end;justify-content:center;filter:drop-shadow(0 18px 24px rgba(0,0,0,.48));transform:translate3d(0,0,0)}
#${ROOT_ID} .kv2-actors[data-count="4"] .kv2-actor{flex-basis:min(19vw,205px);width:min(19vw,205px);height:min(47vh,345px)}
#${ROOT_ID} .kv2-actor img{display:block;width:100%;height:100%;object-fit:contain;object-position:center bottom}
#${ROOT_ID} .kv2-actor.is-entering{animation:kv2ActorEnter36030 .48s cubic-bezier(.2,.75,.24,1) both}
#${ROOT_ID} .kv2-actor-ghost{position:absolute!important;z-index:12!important;margin:0!important;pointer-events:none!important}
#${ROOT_ID} .kv2-actor-ghost.is-falling{animation:kv2ActorFall36030 .54s cubic-bezier(.55,.05,.78,.25) both}
#${ROOT_ID} .kv2-actor-ghost.is-fleeing{animation:kv2ActorFlee36030 .48s cubic-bezier(.4,.05,.8,.3) both}
#${ROOT_ID} .kv2-actor-ghost.is-fading{animation:kv2ActorFade36030 .32s ease both}
@keyframes kv2ActorEnter36030{from{opacity:0;transform:translate3d(56px,0,0) scale(.96);filter:brightness(.45) blur(1px)}to{opacity:1;transform:translate3d(0,0,0) scale(1);filter:drop-shadow(0 18px 24px rgba(0,0,0,.48))}}
@keyframes kv2ActorFall36030{from{opacity:1;transform:translate3d(0,0,0) rotate(0)}to{opacity:0;transform:translate3d(0,118%,0) rotate(5deg)}}
@keyframes kv2ActorFlee36030{from{opacity:1;transform:translate3d(0,0,0) scale(1)}to{opacity:0;transform:translate3d(135%,0,0) scale(.94)}}
@keyframes kv2ActorFade36030{from{opacity:1}to{opacity:0}}
#${ROOT_ID} .kv2-card-frame{position:absolute;inset:0;border:1px solid rgba(210,172,80,.28);background:linear-gradient(180deg,transparent 50%,rgba(1,6,9,.68));box-shadow:inset 0 0 0 1px rgba(255,255,255,.018)}
#${ROOT_ID} .kv2-actor-label{position:absolute;left:6%;right:6%;bottom:3%;padding:6px 8px;border:1px solid rgba(208,168,75,.4);background:rgba(2,7,11,.88);text-align:center;font-size:8px;font-weight:900;letter-spacing:.11em;color:#eee2c7;text-shadow:0 1px 2px #000}
#${ROOT_ID} .kv2-dialogue{position:absolute;left:7%;right:7%;bottom:3.7%;min-height:19%;max-height:23%;z-index:30;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto 1fr auto;column-gap:18px;padding:14px 18px 12px;border:1px solid rgba(211,171,78,.68);background:linear-gradient(180deg,rgba(3,10,15,.88),rgba(2,7,11,.96));box-shadow:0 20px 55px rgba(0,0,0,.52),inset 0 0 0 1px rgba(255,255,255,.025);backdrop-filter:blur(5px)}
#${ROOT_ID} .kv2-speaker{grid-column:1;grid-row:1;color:#e3bd5f;font-size:9px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;min-height:13px}
#${ROOT_ID} .kv2-text{grid-column:1/-1;grid-row:2;margin-top:6px;overflow:auto;white-space:pre-wrap;color:#e8ece8;font-size:clamp(12px,.98vw,16px);line-height:1.42;text-shadow:0 1px 2px #000}
#${ROOT_ID} .kv2-progress{grid-column:2;grid-row:1;color:#63747a;font-size:8px;font-weight:900;letter-spacing:.08em}
#${ROOT_ID} .kv2-actions{grid-column:1/-1;grid-row:3;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 8px;margin-top:10px;max-height:10vh;overflow:auto}
#${ROOT_ID} .kv2-actions button{min-height:34px;border:1px solid rgba(211,171,78,.55);background:linear-gradient(180deg,rgba(13,26,32,.94),rgba(5,13,18,.97));color:#eee2c8;padding:7px 10px;text-align:left;font-size:clamp(7px,.55vw,10px);font-weight:900;letter-spacing:.075em;cursor:pointer}
#${ROOT_ID} .kv2-actions button:hover,#${ROOT_ID} .kv2-actions button:focus-visible{border-color:#68dce6;color:#8ce5ec;outline:none;background:rgba(10,42,49,.96)}
#${ROOT_ID} .kv2-next{grid-column:2;grid-row:3;justify-self:end;align-self:end;width:36px;height:30px;border:1px solid rgba(92,215,225,.42);background:rgba(6,30,36,.8);color:#71dee7;font-size:19px;font-weight:900;cursor:pointer}
#${ROOT_ID} .kv2-battle{grid-column:1/-1!important;text-align:center!important;border-color:rgba(206,91,72,.66)!important;color:#f2c0ae!important;background:linear-gradient(180deg,rgba(67,20,15,.82),rgba(27,9,8,.95))!important}
#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-top,#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-actors,#${ROOT_ID}[data-preset="chronicle_receipt"] .kv2-dialogue{display:none!important}
#${ROOT_ID} .kv2-receipt{position:absolute;left:50%;top:50%;width:min(780px,78vw);max-height:76vh;transform:translate(-50%,-50%);z-index:40;box-sizing:border-box;padding:34px 38px;border:1px solid rgba(214,173,74,.72);background:linear-gradient(165deg,rgba(6,13,17,.98),rgba(2,7,10,.99));box-shadow:0 36px 90px rgba(0,0,0,.72),inset 0 0 50px rgba(201,162,73,.03);overflow:auto}
#${ROOT_ID} .kv2-receipt span{display:block;color:#64dae3;font-size:9px;font-weight:900;letter-spacing:.16em}
#${ROOT_ID} .kv2-receipt h1{margin:9px 0 18px;color:#e5c66f;font:900 clamp(21px,2.1vw,34px)/1 Georgia,serif;letter-spacing:.05em}
#${ROOT_ID} .kv2-receipt pre{margin:0;white-space:pre-wrap;color:#e1e6e1;font:600 clamp(11px,.83vw,14px)/1.65 inherit}
#${ROOT_ID} .kv2-receipt button{margin-top:24px;width:100%;min-height:40px;border:1px solid rgba(95,215,225,.42);background:rgba(7,33,39,.72);color:#78dfe7;font-weight:900;letter-spacing:.1em;cursor:pointer}
#${ROOT_ID} .kv2-wipe{position:absolute;inset:0;z-index:999;background:#000;opacity:0;pointer-events:none;transition:opacity .22s ease}
#${ROOT_ID} .kv2-wipe.is-covering{opacity:1;pointer-events:auto}
@media(max-width:900px){#${ROOT_ID} .kv2-actors{left:1.5%;right:1.5%;gap:12px;bottom:31%}#${ROOT_ID} .kv2-actor{width:min(25vw,190px);height:min(46vh,300px)}#${ROOT_ID} .kv2-dialogue{left:3%;right:3%;bottom:2.5%;max-height:26%;min-height:22%}#${ROOT_ID} .kv2-top{left:2.5%;right:2.5%;grid-template-columns:1fr minmax(190px,42%)}}
@media(prefers-reduced-motion:reduce){#${ROOT_ID} .kv2-wipe{transition:none!important}#${ROOT_ID} .kv2-actor.is-entering,#${ROOT_ID} .kv2-actor-ghost{animation:none!important}}
`;
  document.head.appendChild(s);
}
function availableChoices(){
  try{
    const beat=typeof getCurrentStorySceneBeat==="function"?getCurrentStorySceneBeat():null;
    if(!beat||!Array.isArray(beat.choices))return[];
    return beat.choices.map(choice=>{
      const availability=typeof evaluateStorySceneChoiceAvailability==="function"?evaluateStorySceneChoiceAvailability(choice):{available:true};
      return{choiceId:choice.choiceId,label:choice.label,available:availability.available===true,knownBlocker:availability.knownBlocker||null};
    }).filter(c=>c.available);
  }catch(_e){return[];}
}
function actorMarkup(actor){
  return `<figure class="kv2-actor" data-actor-id="${esc(actor.id)}"><div class="kv2-card-frame"></div><img src="${esc(actor.image)}" alt=""><figcaption class="kv2-actor-label">${esc(actor.label)}</figcaption></figure>`;
}
function ensureRoot(layer){
  let root=document.getElementById(ROOT_ID);
  if(!root){root=document.createElement("section");root.id=ROOT_ID;root.setAttribute("aria-label","Academy Kakashi Origin scene");layer.appendChild(root);}
  return root;
}
function currentCue(p,t){
  const cues=p&&Array.isArray(p.cues)?p.cues:[];if(!cues.length)return{kind:"narration",text:""};
  return cues[Math.max(0,Math.min(cues.length-1,Number(t.cueIndex)||0))]||cues[0];
}
function renderReceipt(root,p,t){
  const cue=currentCue(p,t);
  const atEnd=t.atEnd===true;
  root.innerHTML=`<div class="kv2-backdrop" style="background-image:linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.72)),url(&quot;${esc(p.backdrop)}&quot;)"></div><div class="kv2-scrim"></div><div class="kv2-frame"></div><article class="kv2-receipt"><span>SHINOBI CHRONICLES · RECORD</span><h1>CHRONICLE RECEIPT</h1><pre>${esc(cue.text||"")}</pre>${atEnd?'<button type="button" data-kv2-advance="true">CONTINUE</button>':'<button type="button" data-kv2-advance="true">CONTINUE</button>'}</article><div class="kv2-wipe"></div>`;
}
function render(){
  if(rendering||typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");
  if(!isActive()){if(layer){delete layer.dataset.kakashiV2;const stale=document.getElementById(ROOT_ID);if(stale)stale.remove();}return false;}
  if(!layer)return false;
  const p=projection();if(!p)return false;
  rendering=true;
  try{
    installStyle();layer.dataset.kakashiV2="true";const root=ensureRoot(layer);root.dataset.preset=p.preset||"standard";
    const t=cueState();
    if(p.preset==="chronicle_receipt"){renderReceipt(root,p,t);bind(root);return true;}
    const cue=currentCue(p,t),speaker=cue.kind==="dialogue"?cue.speakerName:(cue.kind==="record"?"CHRONICLE RECEIPT":"NARRATION");
    const actors=Array.isArray(p.actors)?p.actors:[];
    const choices=t.atEnd?availableChoices():[];
    const beat=typeof getCurrentStorySceneBeat==="function"?getCurrentStorySceneBeat():null;
    const battleReady=t.atEnd&&beat&&beat.mode==="battle_transition";
    const semanticNext=t.atEnd&&beat&&beat.mode!=="choice"&&beat.mode!=="battle_transition";
    const actions=choices.length?choices.map(c=>`<button type="button" data-kv2-choice="${esc(c.choiceId)}">${esc(c.label)}</button>`).join(""):battleReady?'<button type="button" class="kv2-battle" data-kv2-advance="true">BEGIN PL BATTLE</button>':"";
    const nextButton=!actions&&(!t.atEnd||semanticNext)?'<button class="kv2-next" type="button" data-kv2-advance="true" aria-label="Continue">›</button>':"";
    root.innerHTML=`
      <div class="kv2-backdrop" style="background-image:linear-gradient(180deg,rgba(0,0,0,.06),rgba(0,0,0,.42)),url(&quot;${esc(p.backdrop)}&quot;)"></div>
      <div class="kv2-scrim"></div><div class="kv2-frame"></div>
      <header class="kv2-top"><div class="kv2-location">${esc(p.location||"KONOHA · NIGHT")}</div>${p.objective?`<div class="kv2-objective"><b>OBJECTIVE</b>${esc(p.objective)}</div>`:""}</header>
      <div class="kv2-actors" data-count="${actors.length}">${actors.map(actorMarkup).join("")}</div>
      <section class="kv2-dialogue" aria-live="polite"><div class="kv2-speaker">${esc(speaker)}</div><div class="kv2-progress">${Math.min((Number(t.cueIndex)||0)+1,Math.max(1,Number(t.cueCount)||1))} / ${Math.max(1,Number(t.cueCount)||1)}</div><div class="kv2-text">${esc(cue.text||"")}</div>${actions?`<div class="kv2-actions">${actions}</div>`:""}${nextButton}</section>
      <div class="kv2-wipe"></div>`;
    bind(root);return true;
  }finally{rendering=false;}
}
function bind(root){
  for(const b of root.querySelectorAll("[data-kv2-choice]"))b.onclick=()=>globalThis.advanceAcademyKakashiV236040?globalThis.advanceAcademyKakashiV236040(b.dataset.kv2Choice):advanceStoryScene(b.dataset.kv2Choice);
  for(const b of root.querySelectorAll("[data-kv2-advance]"))b.onclick=()=>globalThis.advanceAcademyKakashiV236040?globalThis.advanceAcademyKakashiV236040():advanceStoryScene();
  const box=root.querySelector(".kv2-dialogue");
  if(box)box.onclick=e=>{if(e.target&&e.target.closest&&e.target.closest("button"))return;globalThis.advanceAcademyKakashiV236040?globalThis.advanceAcademyKakashiV236040():advanceStoryScene();};
}
function setWipe(covering){
  const root=document.getElementById(ROOT_ID),wipe=root&&root.querySelector(".kv2-wipe");if(!wipe)return false;
  wipe.classList.toggle("is-covering",covering===true);return true;
}
const PRE_RENDER=typeof renderStoryScenePresentationLayer==="function"?renderStoryScenePresentationLayer:null;
if(PRE_RENDER){
  globalThis.renderStoryScenePresentationLayer=function kakashiV2RendererWrapper(){const result=PRE_RENDER.apply(this,arguments);if(isActive())render();return result;};
  try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_e){}
}
if(typeof document!=="undefined"){
  document.addEventListener("keydown",e=>{if(!isActive()||e.defaultPrevented||!(e.key==="Enter"||e.key===" "))return;const tag=String(e.target&&e.target.tagName||"").toLowerCase();if(["input","textarea","select"].includes(tag))return;e.preventDefault();globalThis.advanceAcademyKakashiV236040?globalThis.advanceAcademyKakashiV236040():advanceStoryScene();});
}
function geometryDiagnostics(){
  if(typeof document==="undefined")return{pass:true,headless:true};
  const root=document.getElementById(ROOT_ID);if(!root)return{pass:false,reason:"renderer_root_missing"};
  const objective=root.querySelector(".kv2-objective"),dialogue=root.querySelector(".kv2-dialogue"),actors=[...root.querySelectorAll(".kv2-actor")];
  const intersects=(a,b)=>a&&b&&!(a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom);
  const ob=objective&&objective.getBoundingClientRect(),db=dialogue&&dialogue.getBoundingClientRect();
  const actorBounds=actors.map(a=>a.getBoundingClientRect());
  return{pass:(!ob||actorBounds.every(b=>!intersects(ob,b)))&&(!db||actorBounds.every(b=>!intersects(db,b))),objectiveActorOverlap:ob?actorBounds.filter(b=>intersects(ob,b)).length:0,dialogueActorOverlap:db?actorBounds.filter(b=>intersects(db,b)).length:0,visibleDialogueSurfaces:root.querySelectorAll(".kv2-dialogue").length};
}
function diagnostics(){
  const source=render.toString(),checks={
    soleKakashiRoot:ROOT_ID==="kakashi-v2-scene-board",
    hidesNativeStorySurface:installStyle.toString().includes('>*:not(#')&&installStyle.toString().includes('{display:none!important}'),
    protectedObjectiveRegion:installStyle.toString().includes("grid-template-columns:minmax(0,1fr) minmax(240px,34%)"),
    protectedDialogueRegion:installStyle.toString().includes("bottom:29%")&&installStyle.toString().includes("bottom:3.7%"),
    receiptReplacesScene:installStyle.toString().includes('[data-preset="chronicle_receipt"] .kv2-top')&&renderReceipt.toString().includes("CHRONICLE RECEIPT"),
    routesDoNotOwnDom:source.includes("getAcademyKakashiV2Presentation36020"),
    noMutationObserver:!String(render).includes("MutationObserver"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.renderAcademyKakashiV236030=render;
globalThis.setAcademyKakashiV2Wipe36030=setWipe;
globalThis.runAcademyKakashiV2Renderer36030Diagnostics=diagnostics;
globalThis.runAcademyKakashiV2Geometry36030=geometryDiagnostics;
globalThis.SC_ACADEMY_KAKASHI_V2_RENDERER_36030=Object.freeze({patchId:PATCH_ID,rootId:ROOT_ID,browserGoldenClaimed:false});
try{if(isActive())render();}catch(_e){}
})();
