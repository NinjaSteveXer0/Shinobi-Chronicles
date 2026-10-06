// ============================================================================
// ISSUE #557 — UNOBSTRUCTED VILLAGE / REGION MAP CANVASES
//
// Presentation-only correction over the approved #499 live HUD and existing
// Village / Region map renderers. It owns no Chronicle, World, discovery,
// currentTeam, Ryō, Journey or persistence state.
//
// Contract:
// - nothing persistent covers Village / Region map pixels or hotspot hit areas;
// - Identity / Journey / Ryō, Current Team, Player Tools and Chronicle Compass
//   live in measured outer reserves;
// - observer-safe #499 map context remains the contextual information surface;
// - legacy Region controls are moved outboard instead of covering the map;
// - no hidden-location truth is created or promoted by presentation.
// ============================================================================
(function installUnobstructedMapCanvas55700(){
"use strict";
if(globalThis.SC_MAP_CANVAS_UNOBSTRUCTED_55700)return;

const PATCH_ID="map_canvas_unobstructed_55700_2026_10_06";
const STYLE_ID="sc-map-canvas-unobstructed-55700-style";
const ROOT_ID="sc-phase2-live-hud-49900";
const MAPS=Object.freeze({region:".region-map-pane",village:".village-map-screen"});
const state={map:null,box:null,raf:0,timer:0};

function visible(node){
  if(!node||!node.isConnected)return false;
  const rect=node.getBoundingClientRect();
  if(!(rect.width>0&&rect.height>0))return false;
  const cs=getComputedStyle(node);
  return cs.display!=="none"&&cs.visibility!=="hidden"&&Number(cs.opacity||1)>0;
}
function rect(node){
  if(!node)return null;
  const r=node.getBoundingClientRect();
  return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};
}
function intersectionArea(a,b){
  if(!a||!b)return 0;
  return Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
}
function cleanupMap(map){
  if(!map)return;
  if(map.dataset.map557WidthOwned==="true")map.style.removeProperty("max-width");
  delete map.dataset.map557WidthOwned;
  ["--sc-map557-outboard-right","--sc-map557-gutter-control-width"].forEach(name=>map.style.removeProperty(name));
}
function cleanup(){
  cleanupMap(state.map);
  if(state.box)state.box.classList.remove("sc-map557-active");
  state.map=null;state.box=null;
  const root=document.getElementById(ROOT_ID);
  if(root){delete root.dataset.map557;delete root.dataset.map557RegionInfoOpen;}
}
function reserveForViewport(){
  const vw=Math.max(320,Number(innerWidth)||0);
  return Math.max(138,Math.min(196,Math.round(vw*.14)));
}
function mapBoundsContainer(map){
  return map&&map.closest(".overlay-content-box")||document.querySelector(".overlay-content-box")||document.querySelector(".game-container");
}
function constrainMap(map,box){
  const br=box.getBoundingClientRect();
  const reserve=reserveForViewport();
  const maxWidth=Math.max(520,Math.floor(br.width-(reserve*2)-20));
  map.style.setProperty("max-width",maxWidth+"px","important");
  map.dataset.map557WidthOwned="true";
  return{reserve,maxWidth};
}
function applyGeometry(root,map,box,surface){
  if(!root||!map||!box||!visible(map))return null;
  const rr=root.getBoundingClientRect(),mr=map.getBoundingClientRect();
  const left=Math.max(0,mr.left-rr.left),right=Math.max(0,rr.right-mr.right);
  const top=Math.max(0,mr.top-rr.top),bottom=Math.max(0,rr.bottom-mr.bottom);
  const available=Math.max(0,right-16);
  const controlWidth=Math.max(116,Math.min(176,available));
  const rightAnchor=Math.max(8,right-controlWidth-8);
  const outboardRight=-(right-10);

  root.style.setProperty("--sc-hud499-map-left",left.toFixed(2)+"px");
  root.style.setProperty("--sc-hud499-map-right",right.toFixed(2)+"px");
  root.style.setProperty("--sc-hud499-map-top",top.toFixed(2)+"px");
  root.style.setProperty("--sc-hud499-map-bottom",bottom.toFixed(2)+"px");
  root.style.setProperty("--sc-hud499-gutter-control-width",controlWidth.toFixed(2)+"px");
  root.style.setProperty("--sc-hud499-gutter-right-anchor",rightAnchor.toFixed(2)+"px");
  root.dataset.mapGutter="true";
  root.dataset.map557="true";

  map.style.setProperty("--sc-map557-outboard-right",outboardRight.toFixed(2)+"px");
  map.style.setProperty("--sc-map557-gutter-control-width",controlWidth.toFixed(2)+"px");
  box.classList.add("sc-map557-active");
  root.dataset.map557RegionInfoOpen=surface==="region"&&!!map.querySelector(".region-info-drawer.open")?"true":"false";
  return{surface,left,right,top,bottom,controlWidth,rightAnchor,outboardRight,map:rect(map)};
}
function sync(){
  if(typeof document==="undefined")return null;
  const root=document.getElementById(ROOT_ID);
  if(!root||root.hidden){cleanup();return null;}
  const surface=String(root.dataset.surface||"");
  const selector=MAPS[surface];
  if(!selector){cleanup();return null;}
  const map=document.querySelector(selector);
  const box=mapBoundsContainer(map);
  if(!map||!box){cleanup();return null;}
  if(state.map&&state.map!==map)cleanupMap(state.map);
  if(state.box&&state.box!==box)state.box.classList.remove("sc-map557-active");
  state.map=map;state.box=box;
  constrainMap(map,box);
  if(state.raf)cancelAnimationFrame(state.raf);
  state.raf=requestAnimationFrame(()=>{state.raf=0;applyGeometry(root,map,box,surface);});
  return{surface,selector,presentationOnly:true};
}
function schedule(){
  if(state.raf)cancelAnimationFrame(state.raf);
  state.raf=requestAnimationFrame(()=>{state.raf=0;sync();});
}

function diagnostics(){
  const root=document.getElementById(ROOT_ID);
  const surface=root&&String(root.dataset.surface||"");
  const map=surface&&MAPS[surface]?document.querySelector(MAPS[surface]):null;
  const mapRect=map&&visible(map)?rect(map):null;
  const hud={};
  if(root){
    for(const [key,selector] of Object.entries({state:".sc-hud499-state-cluster",team:".sc-hud499-team",tools:".sc-hud499-tools",context:".sc-hud499-context[data-active=\"true\"]",compass:".sc-hud499-map-nav"})){
      const node=root.querySelector(selector);hud[key]=node&&visible(node)?{rect:rect(node),intersection:intersectionArea(rect(node),mapRect)}:null;
    }
  }
  const regionControls={};
  if(surface==="region"&&map){
    for(const selector of [".region-world-close",".region-info-toggle",".region-info-drawer.open",".region-world-map-button"]){
      const node=map.querySelector(selector);regionControls[selector]=node&&visible(node)?{rect:rect(node),intersection:intersectionArea(rect(node),mapRect)}:null;
    }
  }
  const checks={
    presentationOnly:true,
    consumesExistingHud:!!globalThis.SC_PHASE2_LIVE_HUD_49900,
    villageRegionOnly:surface==="village"||surface==="region"||!mapRect,
    measuredOuterReserve:!mapRect||root?.dataset.map557==="true",
    hudClearOfMap:!mapRect||Object.values(hud).filter(Boolean).every(row=>row.intersection===0),
    regionControlsClearOfMap:surface!=="region"||Object.values(regionControls).filter(Boolean).every(row=>row.intersection===0),
    noPersistenceWrites:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,surface,map:mapRect,hud,regionControls,browserGoldenClaimed:false};
}

function installStyles(){
  if(document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
    /* #557: measured Village/Region map reserves are structural, not overlays. */
    .overlay-content-box.sc-map557-active .region-map-pane,
    .overlay-content-box.sc-map557-active .village-map-screen{flex-shrink:1!important}

    #${ROOT_ID}[data-map557="true"][data-surface="region"] .sc-hud499-state-cluster,
    #${ROOT_ID}[data-map557="true"][data-surface="village"] .sc-hud499-state-cluster{
      left:auto!important;right:var(--sc-hud499-gutter-right-anchor)!important;
      top:calc(var(--sc-hud499-map-top) + 8px)!important;width:var(--sc-hud499-gutter-control-width)!important;
      max-width:none!important;border-color:rgba(195,159,70,.34)!important
    }
    #${ROOT_ID}[data-map557="true"] .sc-hud499-state-main{gap:5px!important;padding:5px 6px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-identity{gap:5px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-identity-portrait,
    #${ROOT_ID}[data-map557="true"] .sc-hud499-silhouette.sc-hud499-identity-portrait{width:34px!important;height:34px!important;flex-basis:34px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-identity-copy{gap:2px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-identity-copy strong{font-size:11px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-identity-copy span{font-size:6px!important;letter-spacing:.04em!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-ryo{min-width:39px!important;padding-left:5px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-ryo strong{font-size:13px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-journey{min-height:31px!important;padding:4px 6px 5px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-journey strong{font-size:9px!important}
    #${ROOT_ID}[data-map557="true"] .sc-hud499-journey small{font-size:7px!important}

    #${ROOT_ID}[data-map557="true"][data-surface="region"] .sc-hud499-team,
    #${ROOT_ID}[data-map557="true"][data-surface="village"] .sc-hud499-team{
      left:calc(var(--sc-hud499-map-left) - 80px)!important;right:auto!important;
      top:calc(var(--sc-hud499-map-top) + 14px)!important;width:72px!important;max-width:72px!important
    }
    #${ROOT_ID}[data-map557="true"][data-surface="region"] .sc-hud499-tools,
    #${ROOT_ID}[data-map557="true"][data-surface="village"] .sc-hud499-tools{
      left:auto!important;right:var(--sc-hud499-gutter-right-anchor)!important;
      top:calc(var(--sc-hud499-map-top) + 92px)!important;width:var(--sc-hud499-gutter-control-width)!important
    }
    #${ROOT_ID}[data-map557="true"][data-surface="region"] .sc-hud499-context,
    #${ROOT_ID}[data-map557="true"][data-surface="village"] .sc-hud499-context{
      left:auto!important;right:var(--sc-hud499-gutter-right-anchor)!important;
      top:calc(var(--sc-hud499-map-top) + 136px)!important;width:var(--sc-hud499-gutter-control-width)!important;
      max-height:min(34vh,245px)!important
    }
    #${ROOT_ID}[data-map557="true"][data-surface="region"][data-map557-region-info-open="true"] .sc-hud499-context{
      opacity:0!important;visibility:hidden!important
    }
    #${ROOT_ID}[data-map557="true"][data-surface="region"] .sc-hud499-map-nav,
    #${ROOT_ID}[data-map557="true"][data-surface="village"] .sc-hud499-map-nav{
      left:auto!important;right:var(--sc-hud499-gutter-right-anchor)!important;
      bottom:max(var(--sc-hud499-safe-bottom),calc(var(--sc-hud499-map-bottom) + 10px))!important;
      width:var(--sc-hud499-gutter-control-width)!important;min-width:0!important;max-width:none!important
    }

    /* The #499 observer-safe context supersedes the old Region hover card. */
    .overlay-content-box.sc-map557-active .region-hotspot .hotspot-hover-card{display:none!important}

    /* Keep every persistent Region control outside the crisp map rectangle. */
    .overlay-content-box.sc-map557-active .region-map-pane .region-world-close,
    .overlay-content-box.sc-map557-active .region-map-pane .region-info-toggle,
    .overlay-content-box.sc-map557-active .region-map-pane .region-info-drawer,
    .overlay-content-box.sc-map557-active .region-map-pane .region-world-map-button{
      left:auto!important;width:var(--sc-map557-gutter-control-width)!important;max-width:var(--sc-map557-gutter-control-width)!important;
      right:var(--sc-map557-outboard-right)!important;box-sizing:border-box!important
    }
    .overlay-content-box.sc-map557-active .region-map-pane .region-world-close{
      top:2%!important;height:36px!important;min-width:0!important;border-radius:6px!important
    }
    .overlay-content-box.sc-map557-active .region-map-pane .region-info-toggle{top:44%!important;justify-content:flex-start!important}
    .overlay-content-box.sc-map557-active .region-map-pane .region-info-drawer{top:calc(44% + 38px)!important}
    .overlay-content-box.sc-map557-active .region-map-pane .region-info-drawer .region-left-overlay{max-height:min(31vh,260px)!important}
    .overlay-content-box.sc-map557-active .region-map-pane .region-world-map-button{bottom:2%!important;justify-content:flex-start!important}

    @media(max-width:900px){
      #${ROOT_ID}[data-map557="true"] .sc-hud499-state-main{grid-template-columns:minmax(0,1fr) auto!important}
      #${ROOT_ID}[data-map557="true"] .sc-hud499-team{width:64px!important;max-width:64px!important;left:calc(var(--sc-hud499-map-left) - 72px)!important}
      #${ROOT_ID}[data-map557="true"] .sc-hud499-team-member{width:50px!important;height:50px!important}
    }
  `;document.head.appendChild(style);
}

installStyles();
sync();
if(typeof window!=="undefined")window.addEventListener("resize",schedule,{passive:true});
if(typeof document!=="undefined"){
  const observer=new MutationObserver(()=>schedule());
  observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["class","style","hidden","data-surface"]});
  state.timer=setInterval(sync,300);
}

globalThis.refreshUnobstructedMapCanvas55700=sync;
globalThis.runUnobstructedMapCanvas55700Diagnostics=diagnostics;
globalThis.SC_MAP_CANVAS_UNOBSTRUCTED_55700=Object.freeze({patchId:PATCH_ID,presentationOnly:true,browserGoldenClaimed:false});
})();
